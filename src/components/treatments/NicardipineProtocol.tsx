import React, { useId, useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Baby,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplets,
  HeartPulse,
  RotateCcw,
  ShieldAlert,
  Syringe,
  Timer,
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

interface Props {
  isDark: boolean;
}

type NicardipineTabId = 'crisis_neuro' | 'micro_bolus' | 'obstetric' | 'pediatric';
type NicardipinePrepId = 'periph_01' | 'central_02' | 'central_05';

interface TabMeta {
  id: NicardipineTabId;
  shortLabel: string;
  title: string;
  target: string;
  badgeText: string;
  protocolNote: string;
}

const TAB_META: Record<NicardipineTabId, TabMeta> = {
  crisis_neuro: {
    id: 'crisis_neuro',
    shortLabel: 'HT Acil / Nöro & İKH',
    title: 'Hipertansif Acil, İntraoperatif HT, Nöroşirürji & Akut İKH (ATACH-2 / AHA-ASA)',
    target: 'İKH: SKB 130–140 mmHg · İskemik İnme (tPA): <185/110 → <180/105 mmHg',
    badgeText: '5 → 15 mg/sa · İdame 3 mg/sa',
    protocolNote:
      '5 mg/saat ile başlayın; hedef KB’ye ulaşana kadar her 5–15 dakikada bir 2,5 mg/saat artırın (maks 15 mg/saat). Hedefe ulaşıldığında birikimi önlemek için 3 mg/saat idameye düşülüp titre edilir. ATACH-2 gereği İKH’da SKB <130 mmHg agresif düşüşten kaçının.',
  },
  micro_bolus: {
    id: 'micro_bolus',
    shortLabel: 'İntraop Mikro-Bolus',
    title: 'Hızlı İntraoperatif Mikro-Bolus Titrasyonu (100 – 500 mcg IV)',
    target: 'Laringoskopi / Kraniyotomi / Aort Klempleme Ani KB Sıçraması',
    badgeText: '100–500 mcg (1–5 mL · 100 mcg/mL)',
    protocolNote:
      '100 mcg/mL (0,1 mg/mL) standart seyreltilmiş enjektörden 1–5 mL (0,1–0,5 mg) yavaş IV puşe edilir. Etki 1–2 dk’da başlar, 2–5 dk’da pik yapar; gerekirse 3–5 dk’da bir tekrarlanır veya 3–5 mg/saat infüzyonla sürdürülür.',
  },
  obstetric: {
    id: 'obstetric',
    shortLabel: 'Preeklampsi / Eklampsi',
    title: 'Obstetrik Şiddetli Preeklampsi & Eklampsi Hipertansif Krizi (ACOG / SFAR)',
    target: 'Hedef KB: 140–150 / 90–100 mmHg (<160/110 mmHg)',
    badgeText: '5 → 15 mg/sa · MgSO₄ Sinerji!',
    protocolNote:
      '5 mg/saat ile başlayın; her 5–15 dakikada bir 2,5 mg/saat artırarak maks 15 mg/saat’e çıkın, hedefe ulaşınca 3 mg/saat idameye inin. Uteroplasental kan akımını korur; ANCAK MgSO₄ ile derin sinerjik hipotansiyon ve nöromüsküler blok potansiyalizasyonu yaratır!',
  },
  pediatric: {
    id: 'pediatric',
    shortLabel: 'Pediatrik HT Krizi',
    title: 'Pediatrik Hipertansif Acil & Postoperatif Hipertansiyon (Ağırlık Bazlı)',
    target: 'İlk 6–8 saatte KB düşüşü <%25 (Serebral/Renal Otoregülasyon Koruması)',
    badgeText: '0,5–3 mcg/kg/dk (maks 5)',
    protocolNote:
      '0,5 mcg/kg/dk ile başlayın; 15–30 dakikada bir 0,5 mcg/kg/dk basamaklarla 0,5–3 mcg/kg/dk aralığına titre edin (maks 5 mcg/kg/dk; erişkin tavanı 15 mg/saat aşılmaz!). Küçük çocuklarda sıvı yükü için SVK’dan 0,2–0,5 mg/mL tercih edilir.',
  },
};

export const NicardipineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKORDİYON STATE ---
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // --- HESAPLAYICI STATE ---
  const [activeTab, setActiveTab] = useState<NicardipineTabId>('crisis_neuro');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [prepId, setPrepId] = useState<NicardipinePrepId>('periph_01');
  const [adultRateMgHr, setAdultRateMgHr] = useState<number>(5.0); // 1 – 15 mg/sa
  const [microBolusMcg, setMicroBolusMcg] = useState<number>(200); // 100 – 500 mcg
  const [pedsMcgKgMin, setPedsMcgKgMin] = useState<number>(1.0); // 0.5 – 5.0 mcg/kg/dk

  const weightSliderId = useId();
  const prepSelectId = useId();
  const doseSliderId = useId();

  const tabMeta = TAB_META[activeTab];

  const handleSelectTab = (tab: NicardipineTabId) => {
    setActiveTab(tab);
    if (tab === 'pediatric') {
      if (weightKg > 45) setWeightKg(20);
      setPedsMcgKgMin(1.0);
    } else {
      if (weightKg < 35) setWeightKg(75);
      if (tab === 'crisis_neuro' || tab === 'obstetric') {
        setAdultRateMgHr(5.0);
      }
      if (tab === 'micro_bolus') {
        setMicroBolusMcg(200);
      }
    }
  };

  const concMgMl = prepId === 'central_05' ? 0.5 : prepId === 'central_02' ? 0.2 : 0.1;
  const concLabel =
    prepId === 'central_05'
      ? '0,5 mg/mL (500 mcg/mL · YALNIZCA SVK — 25 mg / 50 mL)'
      : prepId === 'central_02'
        ? '0,2 mg/mL (200 mcg/mL · SVK Tercihli — 20 mg / 100 mL veya 10 mg / 50 mL)'
        : '0,1 mg/mL (100 mcg/mL · Periferik Standart — 25 mg / 250 mL veya 20 mg / 200 mL)';

  const calc = useMemo(() => {
    const isMicroBolus = activeTab === 'micro_bolus';
    const isPediatric = activeTab === 'pediatric';

    let hourlyMg = adultRateMgHr;
    if (isPediatric) {
      hourlyMg = (pedsMcgKgMin * weightKg * 60) / 1000;
    } else if (isMicroBolus) {
      // Mikro-bolus sekmesinde opsiyonel köprü idame hızı 3 mg/saat referans alınır
      hourlyMg = 3.0;
    }

    const cappedAdultExceed = isPediatric && hourlyMg > 15;
    const effectiveHourlyMg = cappedAdultExceed ? 15 : hourlyMg;

    const doseMcgMin = (effectiveHourlyMg * 1000) / 60;
    const doseMcgKgMin = weightKg > 0 ? doseMcgMin / weightKg : 0;
    const pumpRateMlHr = concMgMl > 0 ? effectiveHourlyMg / concMgMl : 0;

    const dailyMg = effectiveHourlyMg * 24;
    const dailyMl = pumpRateMlHr * 24;
    const dailyAmpoules10Mg = dailyMg / 10;
    const dailyAmpoules25Mg = dailyMg / 25;

    // Mikro-bolus (100 mcg/mL seyreltilmiş enjektör)
    const bolusMg = microBolusMcg / 1000;
    const bolusMlAt100McgMl = microBolusMcg / 100; // 100 mcg/mL → 1–5 mL
    const bolusMcgKg = weightKg > 0 ? microBolusMcg / weightKg : 0;

    return {
      isMicroBolus,
      isPediatric,
      rawHourlyMg: hourlyMg,
      effectiveHourlyMg,
      cappedAdultExceed,
      doseMcgMin,
      doseMcgKgMin,
      pumpRateMlHr,
      dailyMg,
      dailyMl,
      dailyAmpoules10Mg,
      dailyAmpoules25Mg,
      bolusMg,
      bolusMlAt100McgMl,
      bolusMcgKg,
    };
  }, [activeTab, adultRateMgHr, pedsMcgKgMin, weightKg, concMgMl, microBolusMcg]);

  const handleReset = () => {
    setActiveTab('crisis_neuro');
    setWeightKg(75);
    setPrepId('periph_01');
    setAdultRateMgHr(5.0);
    setMicroBolusMcg(200);
    setPedsMcgKgMin(1.0);
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
          { id: 'sec-ozet', label: 'Kimlik & Özet' },
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

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (VARSAYILAN KAPALI)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="niCARdipine"
        confusionRiskWith="niFEDipine · niMODipine"
        criticalAlerts={[
          'İleri Aort Darlığında MUTLAK KONTRENDİKE: Sabit sol ventrikül çıkış yolu (LVOT) darlığında ani SVR düşüşü diyastolik koroner perfüzyon basıncını çökertir; kardiyak debi artamadığından refrakter kardiyojenik şok ve ani ölüm gelişir!',
          'Ringer Laktat & Sodyum Bikarbonat (%8,4 NaHCO₃) GEÇİMSİZLİĞİ: Nikardipin bu iki sıvı ile kimyasal olarak GEÇİMSİZDİR — hızla bulanıklık ve ÇÖKELTİ oluşturur! Yalnızca %0,9 NaCl (SF) veya %5 Dekstroz (D5W) ile seyreltilir ve aynı hattan asla NaHCO₃/LR verilmez.',
          'Periferik Venöz Flebit & 12 Saatlik Damar Yolu Rotasyonu + Sıvı Yükü Tuzağı: Periferik yoldan YALNIZCA 0,1 mg/mL konsantrasyonda uygulanabilir ve FDA/KÜB gereği periferik infüzyon bölgesi HER 12 SAATTE BİR değiştirilmelidir. 0,1 mg/mL ile 15 mg/saat hızında 150 mL/saat (= 3.600 mL/gün!) sıvı yükü oluşur — uzun süreli/nöro-YBÜ infüzyonlarında SVK üzerinden 0,2–0,5 mg/mL tercih edilmelidir.',
          'CYP3A4 İnhibisyonu & Karaciğer Yetmezliği (Child-Pugh B/C): Primer olarak hepatik CYP3A4 ile metabolize edilir; ağır karaciğer yetmezliğinde klirens %50+ düşer, yarı ömür ve kesim sonrası hipotansiyon süresi dramatik uzar.',
        ]}
        antidoteOrRescue="1) İnfüzyonu DERHAL DURDURUN (etki kesimden sonra 30–60 dk içinde belirgin azalır; ancak hepatik yetmezlikte uzayabilir). 2) Hastayı Trendelenburg pozisyonuna alın ve izotonik kristaloid yüklemesi yapın. 3) Spesifik fizyolojik antagonizma için IV Kalsiyum Klorür (%10, 1 g [10 mL] SVK’dan yavaş) veya IV Kalsiyum Glukonat (%10, 3 g [30 mL] periferik/santral yavaş) uygulayın. 4) Dirençli vazoplejide Noradrenalin veya Fenilefrin vazopressör infüzyonu başlatın (refleks taşikardi eşlik ediyorsa saf α₁ agonist Fenilefrin veya Noradrenalin tercih edilir)."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KİMLİK, KLİNİK ÖZET HEADER & KISA ETKİ MEKANİZMASI               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
              <span className="font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/15">
                2. Kuşak Dihidropiridin IV Kalsiyum Kanal Blokeri
              </span>
              <span aria-hidden="true">·</span>
              <span>Cardene® · Loxen® · Nikardipin HCl</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: C08CA04</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Nikardipin Hidroklorür (IV) Monografisi
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Yüksek{' '}
              <strong>vasküler düz kas selektivitesine</strong> sahip, 2. kuşak dihidropiridin L-tipi voltaj kapılı
              kalsiyum kanalı (Cav1.2) blokeri. Siyanür toksisitesi ve intrakraniyal basınç (ICP) artışı riski
              taşımadan öngörülebilir arteriyoler vazodilatasyon sağladığı için{' '}
              <strong>nörovasküler acillerde (İKH, akut iskemik inme, SAK), perioperatif hipertansiyonda</strong> ve{' '}
              <strong>şiddetli preeklampside</strong> altın standart IV antihipertansiftir.
            </p>
          </div>
        </div>

        {/* Hızlı Klinik Süper Güç Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/25 border-teal-900/50 text-teal-200' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <Brain className="w-4 h-4 shrink-0" />
              <span>Serebral &amp; Koroner Perfüzyon Koruması</span>
            </div>
            <p className="text-xs leading-relaxed">
              Sodyum nitroprussidin aksine venöz dilatasyon/serebral kan hacmi artışı ve ICP sıçraması yapmaz; koroner
              ve serebral arteriyoler vazodilatasyon ile otoregülasyonu ve doku perfüzyonunu korur (ATACH-2 / AHA-ASA 1.
              tercih).
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-cyan-950/25 border-cyan-900/50 text-cyan-200' : 'bg-cyan-50/70 border-cyan-200 text-cyan-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-cyan-600 dark:text-cyan-400">
              <HeartPulse className="w-4 h-4 shrink-0" />
              <span>Yüksek Vasküler Selektivite (AV İleti Korunur)</span>
            </div>
            <p className="text-xs leading-relaxed">
              Arteriyoler düz kasa afinitesi miyokarda göre belirgin yüksektir; verapamil/diltiazem gibi SA/AV düğüm
              bloğu veya belirgin negatif inotropi oluşturmaz (ancak hafif baroreseptör refleks taşikardi yapabilir).
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/25 border-rose-900/50 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-rose-600 dark:text-rose-400">
              <Droplets className="w-4 h-4 shrink-0" />
              <span>Yalnızca SF/D5W · 12 Saat Rotasyon</span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>Ringer Laktat ve %8,4 NaHCO₃ ile çökelir!</strong> Periferik 0,1 mg/mL damar yolu{' '}
              <strong>her 12 saatte bir</strong> değiştirilmelidir; yüksek dozda (150 mL/sa) sıvı yükü nedeniyle SVK’dan
              0,2–0,5 mg/mL önerilir.
            </p>
          </div>
        </div>
      </section>

      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="sec-etki"
        summary="Nikardipin, arteriyoler vasküler düz kas hücre zarındaki voltaj kapılı L-tipi kalsiyum kanallarının (Cav1.2 α₁C alt birimi) dihidropiridin bağlanma bölgesine yüksek seçicilikle bağlanarak hücre içine Ca²⁺ akışını inhibe eder. Sitozolik Ca²⁺ azalması kalmodulin–MLCK aktivasyonunu düşürerek sistemik, koroner ve serebral arteriyollerde güçlü gevşeme (SVR↓) oluşturur; venöz kapasitans, SA/AV düğüm iletisi ve miyokardiyal kontraktilite üzerindeki etkisi minimaldir."
        pillars={[
          {
            title: 'Seçici Arteriyoler Vazodilatasyon (SVR↓, Afterload↓)',
            detail:
              'Rezistans arteriyollerinde düz kas gevşemesi yaparak sistemik vasküler direnci ve sol ventrikül art-yükünü (afterload) doz-bağımlı, öngörülebilir biçimde azaltır; venöz dönüşü (preload) minimal etkiler.',
          },
          {
            title: 'Kardiyak İleti & Kontraktilitenin Korunması',
            detail:
              'Vasküler Cav1.2 izoformuna (depolarize membran potansiyelinde) kardiyak Cav1.2’den çok daha yüksek afinite gösterir; PR aralığını uzatmaz, AV blok yapmaz ve afterload düşüşüyle atım hacmini (SV) korur/artırır.',
          },
          {
            title: 'Serebral & Koroner Vazospazm Önlenmesi',
            detail:
              'Koroner arteriyolleri dilate ederek miyokardiyal O₂ sunumunu artırır; serebral vasküler yatakta ICP’yi yükseltmeden ve serebral çalma (steal) yaratmadan kan basıncını pürüzsüz kontrol eder.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) AKORDİYON (VARSAYILAN KAPALI)              */}
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
                  Onset: 1–5 dk · Offset: 30–60 dk · CYP3A4
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hızlı başlangıç, 15 dk kararlı yanıt, hepatik CYP3A4 (ve CYP2C8/2D6) metabolizması ve çok fazlı yarı ömür.
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
                  1 – 5 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Hızlı arteriyoler gevşeme</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Kararlı Etki / Pik
                </span>
                <span className="text-base font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1 block">
                  ~15 dk (Maks ~45 dk)
                </span>
                <span className="text-[10px] text-slate-400">Etkinin %50’si ilk 15–45 dk’da</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Klinik Offset / t½
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  30 – 60 Dakika
                </span>
                <span className="text-[10px] text-slate-400">t½α: 2,7 dk · t½β: 44,8 dk · t½γ: ~14 sa</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Protein Bağlanma / Vd
                </span>
                <span className="text-base font-bold font-mono text-purple-600 dark:text-purple-400 mt-1 block">
                  &gt;%95 · ~8,3 L/kg
                </span>
                <span className="text-[10px] text-slate-400">Lipofilik · Hepatik CYP3A4</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-500" />
                <span>Üç Kompartmanlı Farmakokinetik, CYP3A4 &amp; Hedef Sonrası 3 mg/saat Kuralı:</span>
              </h4>
              <p>
                Nikardipin lipofilik ve plazma proteinlerine &gt;%95 bağlı bir ajandır. Primer olarak karaciğerde{' '}
                <strong>CYP3A4</strong> (ve minör olarak CYP2C8, CYP2D6) tarafından yoğun biçimde inaktif piridin
                metabolitlerine oksitlenir; metabolitlerin ~%60’ı idrarla, ~%35’i safra/feçesle atılır (idrarla
                değişmeden atılan ana ilaç &lt;%1).
              </p>
              <p>
                İnfüzyon kesildiğinde kan basıncındaki düşüşün %50’si <strong>30–60 dakika</strong> içinde geri döner
                (dağılım fazı t½β ≈ 45 dk); ancak 24 saatten uzun yüksek dozlu infüzyonlarda lipofilik derin doku
                kompartmanından geri salınım (terminal t½γ ≈ 14 saat) nedeniyle kalıcı hafif vazodilatasyon birkaç saat
                sürebilir (bağlama duyarlı yarı ömür / context-sensitive half-time artışı).
              </p>
              <div className="p-3 rounded-lg border bg-teal-500/10 border-teal-500/30 text-teal-900 dark:text-teal-200 font-medium">
                <strong>Klinik Çıkarım:</strong> Yüksek hızda (10–15 mg/saat) hedef kan basıncına ulaşıldığında hız
                düşürülmeden devam edilirse birikim nedeniyle gecikmiş derin hipotansiyon gelişir. Bu nedenle hedef KB
                sağlandığı anda infüzyonun <strong>3 mg/saat</strong> idameye indirilip tekrar titre edilmesi esastır!
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'İleri (kritik) Aort Darlığı: Sabit sol ventrikül çıkış yolu (LVOT) obstrüksiyonunda SVR’nin düşürülmesi kardiyak debiyi artıramaz, diyastolik aort basıncını ve koroner perfüzyonu çökertir → miyokardiyal iskemi ve kardiyovasküler kollaps!',
          'Nikardipine veya diğer dihidropiridin kalsiyum kanal blokerlerine bilinen ciddi aşırı duyarlılık.',
          'Akut kardiyojenik şok veya ağır düzeltilmemiş hipovolemi / derin hipotansiyon.',
        ]}
        relativeItems={[
          'Akut Aort Diseksiyonu (Tek Başına YASAK!): Vazodilatasyonun tetiklediği refleks taşikardi sol ventrikül dP/dt makaslama stresini artırır — yalnızca Esmolol/Labetalol ile β-blokaj (KH <60/dk) sağlandıktan SONRA 2. basamak olarak eklenebilir.',
          'Ağır Karaciğer Yetmezliği (Child-Pugh B/C) & Portal Hipertansiyon: CYP3A4 klirensi %50+ azalır, hipotansif etki uzar; portal venöz basınç/şant etkilenebilir — düşük hız ve uzun titrasyon aralığı (≥15 dk) gerekir.',
          'Akut Miyokard İnfarktüsü / Kararsız Anjina: Refleks taşikardi MVO₂’yi artırabilir; beta-bloker ile kombinasyon veya yakın KH takibi gerektirir.',
          'Ağır Sistolik Kalp Yetmezliği (EF <%30) veya Hipertrofik Obstrüktif Kardiyomiyopati (HOKM — afterload düşüşü dinamik LVOT gradientini ağırlaştırır!).',
          'Feokromositoma: Tek başına kısmen etkili olsa da α-blokaj ve volüm restorasyonu eşliğinde dikkatle kullanılır.',
        ]}
        clinicalNote="İleri aort darlığı ve HOKM’de (dinamik LVOT obstrüksiyonu) arteriyoler vazodilatatörlerin tamamı hemodinamik çöküş tetikler; bu hastalarda hipertansiyon veya taşikardi yönetiminde öncelikle övolemi ve kardiyoselektif beta-bloker (Esmolol) veya vazopressör desteği esas alınır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozlar"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Klinik Endikasyonlar &amp; Kanıta Dayalı Doz Rejimleri
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Erişkin Standart: 5 → 15 mg/sa · İdame: 3 mg/sa</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Nöroşirürji, İKH, Akut İnme */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-teal-500 shrink-0" />
                Akut İKH · İskemik İnme · SAK &amp; Nöroşirürji
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                AHA/ASA 2022 · ATACH-2
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>5 mg/saat</strong> başlanır; her <strong>5–15 dk’da 2,5 mg/saat</strong> artırılır (maks{' '}
              <strong>15 mg/saat</strong>), hedef KB’ye ulaşınca <strong>3 mg/saat</strong> idameye inilir. Akut İKH’da
              hedef SKB <strong>130–140 mmHg</strong> (SKB &lt;130 mmHg’den kaçın — renal hasar artışı!); tPA öncesi
              iskemik inmede &lt;185/110 mmHg, sonrası &lt;180/105 mmHg.
            </p>
          </div>

          {/* 2. Hipertansif Acil & İntraoperatif HT */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-cyan-500 shrink-0" />
                Hipertansif Acil &amp; Perioperatif Mikro-Bolus
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 shrink-0">
                ESC / ACC Sınıf I
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>İnfüzyon:</strong> 5 mg/saat → maks 15 mg/saat (ilk 1 saatte MAP düşüşü &lt;%20–25).{' '}
              <strong>İntraoperatif Mikro-Bolus:</strong> Ani laringoskopi, kraniyotomi veya kardiyak/vasküler cerrahi
              hipertansiyonunda <strong>100–500 mcg (0,1–0,5 mg) IV</strong> (100 mcg/mL seyreltmeden 1–5 mL) yavaş puşe.
            </p>
          </div>

          {/* 3. Obstetrik Şiddetli Preeklampsi / Eklampsi */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-pink-500 shrink-0" />
                Şiddetli Preeklampsi &amp; Eklampsi (ACOG / SFAR)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-pink-500/20 text-pink-700 dark:text-pink-300 shrink-0">
                Obstetrik YBÜ
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Labetalol ve Hidralazine dirençli şiddetli preeklampside veya Avrupa/SFAR protokollerinde 1. basamak IV
              seçenek: <strong>5 mg/saat</strong> başla, 5–15 dk’da 2,5 mg/saat artır (maks 15 mg/saat), hedef{' '}
              <strong>140–150 / 90–100 mmHg</strong>. <strong>MgSO₄</strong> ile eşzamanlı kullanımda hipotansiyon ve
              kas gevşetici potansiyalizasyonu yakından izlenir!
            </p>
          </div>

          {/* 4. Pediatrik Hipertansif Kriz & Aort Diseksiyonu 2. Basamak */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                Pediatrik HT Krizi &amp; Aort Diseksiyonu (2. Basamak)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                Pediatri / Aort 2. Sıra
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Pediatrik:</strong> <strong>0,5–3 mcg/kg/dk</strong> (maks <strong>5 mcg/kg/dk</strong>; erişkin
              tavanı 15 mg/sa aşılmaz). <strong>Akut Aort Diseksiyonu:</strong> ÖNCE Esmolol ile KH &lt;60/dk sağlandıktan
              sonra SKB hâlâ &gt;120 mmHg ise 5–15 mg/saat Nikardipin eklenir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. İNTERAKTİF ÇOK SEKMELİ DOZ, POMPA HIZI & SIVI YÜKÜ HESAPLAYICISI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif Nikardipin İnfüzyon, Mikro-Bolus &amp; Sıvı Yükü Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                0,1 mg/mL (periferik 50–150 mL/sa) vs 0,2 / 0,5 mg/mL (santral) pompa hızı ve 24 saatlik sıvı yükü uyarısı.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MonographCopyButton
              isDark={isDark}
              label="Klinik Order Kopyala"
              getText={() =>
                calc.isMicroBolus
                  ? [
                      `NİKARDİPİN HCl (IV) İNTRAOPERATİF MİKRO-BOLUS ÖZETİ`,
                      `Endikasyon: ${tabMeta.title}`,
                      `Hasta Ağırlığı: ${weightKg} kg`,
                      `Seyreltme: 100 mcg/mL (0,1 mg/mL — 1 mg + 9 mL SF veya D5W; LR/NaHCO₃ YASAK!)`,
                      `Seçili Mikro-Bolus Dozu: ${microBolusMcg} mcg (${calc.bolusMg.toFixed(2)} mg · ${calc.bolusMcgKg.toFixed(1)} mcg/kg)`,
                      `Uygulanacak Hacim: ${calc.bolusMlAt100McgMl.toFixed(1)} mL yavaş IV puşe (Etki: 1–2 dk, Pik: 2–5 dk)`,
                      `Gerekirse Köprü İdame İnfüzyon (3 mg/saat @ ${concMgMl} mg/mL): ${calc.pumpRateMlHr.toFixed(1)} mL/saat`,
                    ].join('\n')
                  : [
                      `NİKARDİPİN HCl (IV) İNFÜZYON ORDER ÖZETİ`,
                      `Endikasyon: ${tabMeta.title}`,
                      `Hasta Ağırlığı: ${weightKg} kg`,
                      `Hemodinamik Hedef: ${tabMeta.target}`,
                      `Hedef İnfüzyon Dozu: ${calc.effectiveHourlyMg.toFixed(2)} mg/saat (${calc.doseMcgKgMin.toFixed(2)} mcg/kg/dk)`,
                      `Çözelti Konsantrasyonu: ${concLabel}`,
                      `İnfüzyon Pompası Hızı: ${calc.pumpRateMlHr.toFixed(1)} mL/saat`,
                      `24 Saatlik Sarfiyat: ${calc.dailyMg.toFixed(1)} mg/gün · Toplam Sıvı Yükü: ${calc.dailyMl.toFixed(0)} mL / 24 saat`,
                      `Taşıyıcı / Güvenlik: YALNIZCA SF veya D5W (Ringer Laktat ve %8,4 NaHCO₃ ile ÇÖKELTİ!). Periferik 0,1 mg/mL damar yolu her 12 saatte değiştirilir.`,
                    ].join('\n')
              }
            />
            <button
              type="button"
              onClick={handleReset}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* 4 Endikasyon Sekmesi */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {(['crisis_neuro', 'micro_bolus', 'obstetric', 'pediatric'] as NicardipineTabId[]).map((tabId) => {
            const meta = TAB_META[tabId];
            const isActive = activeTab === tabId;
            return (
              <button
                key={tabId}
                type="button"
                onClick={() => handleSelectTab(tabId)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? isDark
                      ? 'bg-teal-600/20 border-teal-500 text-white ring-1 ring-teal-500/40'
                      : 'bg-teal-50 border-teal-500 text-teal-950 ring-1 ring-teal-500/30'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="block text-xs font-bold leading-tight">{meta.shortLabel}</span>
                <span className="block text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                  {meta.badgeText}
                </span>
              </button>
            );
          })}
        </div>

        {/* Aktif Sekme Protokol Notu */}
        <div
          className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed ${
            activeTab === 'obstetric'
              ? isDark
                ? 'bg-pink-950/25 border-pink-500/40 text-pink-200'
                : 'bg-pink-50 border-pink-200 text-pink-950'
              : isDark
                ? 'bg-teal-950/20 border-teal-900/50 text-teal-200'
                : 'bg-teal-50/60 border-teal-200 text-teal-950'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
            <strong className="text-xs sm:text-sm">{tabMeta.title}</strong>
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
              {tabMeta.target}
            </span>
          </div>
          <p>{tabMeta.protocolNote}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
          {/* Sol Kolon (7): Parametre Girdileri */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Hasta Ağırlığı */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <label htmlFor={weightSliderId} className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-teal-500" />
                  <span>
                    Hasta Ağırlığı {activeTab === 'pediatric' ? '(Pediatrik Doz Hesabı)' : '(mcg/kg/dk Referansı İçin)'}:
                  </span>
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={3}
                    max={150}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.min(150, Math.max(3, Number(e.target.value) || 3)))}
                    aria-label="Hasta ağırlığı kg"
                    className={`w-16 px-2 py-0.5 rounded-lg border font-mono text-xs font-bold text-right ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-teal-300'
                        : 'bg-white border-slate-300 text-teal-700'
                    }`}
                  />
                  <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                    kg {weightKg < 35 ? '· Pediatrik' : ''}
                  </span>
                </div>
              </div>
              <input
                id={weightSliderId}
                type="range"
                min={3}
                max={150}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-teal-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[5, 12, 20, 40, 60, 75, 90, 110].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeightKg(w)}
                    className={`px-2 py-0.5 text-[11px] font-mono tabular-nums rounded border transition-colors cursor-pointer ${
                      weightKg === w
                        ? 'bg-teal-600 text-white border-teal-600 font-bold'
                        : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {w} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Obezite Doz Skaler Yardımcısı */}
            <ObesityDosingScaler
              isDark={isDark}
              drugName="Nikardipin"
              recommendedScalar="IBW"
              secondaryScalar={{ type: 'AdjBW', context: 'Pediatrik/Ağırlık Bazlı' }}
              rationale="Erişkinlerde IV nikardipin kilodan bağımsız sabit mg/saat (5–15 mg/saat) olarak KB yanıtına göre titre edilir. Lipofilik olduğu için obezitede dağılım hacmi (Vd) artar ve uzun infüzyon sonrası offset uzayabilir; ağırlık bazlı pediatrik/ergen veya mikro-bolus referansında TBW yerine IBW/AdjBW kullanmak aşırı doz birikimini önler."
              currentWeightKg={weightKg}
              onApplyWeight={(w) => setWeightKg(Math.min(150, Math.max(3, w)))}
            />

            {/* 2. Seyreltme / Konsantrasyon Seçici */}
            <div>
              <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                İnfüzyon Seyreltmesi &amp; Konsantrasyonu (YALNIZCA SF veya %5 Dekstroz!):
              </label>
              <select
                id={prepSelectId}
                value={prepId}
                onChange={(e) => setPrepId(e.target.value as NicardipinePrepId)}
                className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-teal-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-teal-600'
                }`}
              >
                <option value="periph_01">
                  0,1 mg/mL (100 mcg/mL) — Standart Periferik (25 mg / 250 mL veya 20 mg / 200 mL SF/D5W · 12 sa rotasyon!)
                </option>
                <option value="central_02">
                  0,2 mg/mL (200 mcg/mL) — Sıvı Kısıtlı SVK Tercihli (20 mg / 100 mL veya 10 mg / 50 mL enjektör)
                </option>
                <option value="central_05">
                  0,5 mg/mL (500 mcg/mL) — Yüksek Konsantrasyon Nöro-YBÜ (YALNIZCA SVK! 25 mg / 50 mL enjektör)
                </option>
              </select>
              <p className="mt-1.5 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                ⚠ Ringer Laktat (LR) ve %8,4 Sodyum Bikarbonat ile ÇÖKELTİ oluşturur — yalnızca %0,9 NaCl (SF) veya %5
                Dekstroz (D5W) kullanın!
              </p>
            </div>

            {/* 3. Sekmeye Özel Doz Ayarı */}
            {activeTab === 'micro_bolus' ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <label htmlFor={doseSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                    İntraoperatif Mikro-Bolus Dozu (100 – 500 mcg IV):
                  </label>
                  <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
                    {microBolusMcg} mcg ({(microBolusMcg / 1000).toFixed(2)} mg)
                  </span>
                </div>
                <input
                  id={doseSliderId}
                  type="range"
                  min={100}
                  max={500}
                  step={50}
                  value={microBolusMcg}
                  onChange={(e) => setMicroBolusMcg(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[100, 200, 250, 300, 400, 500].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setMicroBolusMcg(val)}
                      className={`px-2.5 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                        microBolusMcg === val
                          ? 'bg-teal-600 text-white border-teal-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {val} mcg ({(val / 100).toFixed(1)} mL)
                    </button>
                  ))}
                </div>
              </div>
            ) : activeTab === 'pediatric' ? (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <label htmlFor={doseSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                    Pediatrik İnfüzyon Hızı (0,5 – 5,0 mcg/kg/dk):
                  </label>
                  <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
                    {pedsMcgKgMin.toFixed(2)} mcg/kg/dk
                  </span>
                </div>
                <input
                  id={doseSliderId}
                  type="range"
                  min={0.5}
                  max={5.0}
                  step={0.25}
                  value={pedsMcgKgMin}
                  onChange={(e) => setPedsMcgKgMin(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setPedsMcgKgMin(val)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                        Math.abs(pedsMcgKgMin - val) < 0.05
                          ? 'bg-teal-600 text-white border-teal-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {val.toFixed(1)} mcg/kg/dk
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <label htmlFor={doseSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                    Erişkin İnfüzyon Hızı (Başlangıç 5 · İdame 3 · Maks 15 mg/saat):
                  </label>
                  <span className="font-mono text-sm font-bold text-teal-600 dark:text-teal-400">
                    {adultRateMgHr.toFixed(1)} mg / saat
                  </span>
                </div>
                <input
                  id={doseSliderId}
                  type="range"
                  min={1.0}
                  max={15.0}
                  step={0.5}
                  value={adultRateMgHr}
                  onChange={(e) => setAdultRateMgHr(Number(e.target.value))}
                  className="w-full accent-teal-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[
                    { v: 3.0, lbl: '3 mg/sa (İdame)' },
                    { v: 5.0, lbl: '5 mg/sa (Başlangıç)' },
                    { v: 7.5, lbl: '7,5 mg/sa' },
                    { v: 10.0, lbl: '10 mg/sa' },
                    { v: 12.5, lbl: '12,5 mg/sa' },
                    { v: 15.0, lbl: '15 mg/sa (Maks)' },
                  ].map((opt) => (
                    <button
                      key={opt.v}
                      type="button"
                      onClick={() => setAdultRateMgHr(opt.v)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                        Math.abs(adultRateMgHr - opt.v) < 0.1
                          ? 'bg-teal-600 text-white border-teal-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {opt.lbl}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon (5): Canlı Çıktı Kartı & Dinamik Güvenlik Uyarıları */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  {calc.isMicroBolus ? 'Mikro-Bolus Enjeksiyon Hacmi' : 'İnfüzyon Pompası Hızı'}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    concMgMl > 0.1 && !calc.isMicroBolus
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'bg-teal-500/15 text-teal-600 dark:text-teal-400'
                  }`}
                >
                  {calc.isMicroBolus ? '100 mcg/mL (0,1 mg/mL)' : `${concMgMl} mg/mL`}
                </span>
              </div>

              {calc.isMicroBolus ? (
                <div className="py-4 text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-teal-600 dark:text-teal-400 tracking-tight">
                    {calc.bolusMlAt100McgMl.toFixed(1)}{' '}
                    <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                      mL IV
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {microBolusMcg} mcg ({calc.bolusMg.toFixed(2)} mg) · {calc.bolusMcgKg.toFixed(1)} mcg/kg · Yavaş puşe
                  </div>
                  <div
                    className={`mt-3 p-2.5 rounded-xl border text-left text-[11px] ${
                      isDark ? 'bg-slate-900/70 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <strong>100 mcg/mL Bolus Hazırlama:</strong> 10 mg/10 mL ampulden <strong>1 mL (1 mg)</strong> çekip{' '}
                    <strong>9 mL SF</strong> ile 10 mL’ye tamamlayın → her <strong>1 mL = 100 mcg</strong>. Etki 1–2 dk,
                    pik 2–5 dk; gerekirse 3–5 dk’da bir tekrarlayın.
                  </div>
                </div>
              ) : (
                <div className="py-4 text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-teal-600 dark:text-teal-400 tracking-tight">
                    {calc.pumpRateMlHr.toFixed(1)}{' '}
                    <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                      mL / saat
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {calc.effectiveHourlyMg.toFixed(2)} mg/saat ({calc.doseMcgKgMin.toFixed(2)} mcg/kg/dk) · {concMgMl}{' '}
                    mg/mL
                  </div>
                </div>
              )}

              {/* Parametre Grid */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                    {calc.isMicroBolus ? 'Köprü İdame (3 mg/sa)' : 'Saatlik Doz'}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {calc.isMicroBolus
                      ? `${calc.pumpRateMlHr.toFixed(1)} mL/saat`
                      : `${calc.effectiveHourlyMg.toFixed(2)} mg / sa`}
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({calc.doseMcgMin.toFixed(0)} mcg/dk)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Ağırlık Eşdeğeri</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {calc.doseMcgKgMin.toFixed(2)} mcg/kg/dk
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">({weightKg} kg bazında)</span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Saatlik Sıvı Yükü</span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      calc.dailyMl >= 1500
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {calc.dailyMl.toFixed(0)} mL / 24 sa
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({(calc.dailyMl / 1000).toFixed(2)} L / gün)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Sa İlaç / Ampul</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400 text-sm">
                    {calc.dailyMg.toFixed(0)} mg / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ~{Math.ceil(calc.dailyAmpoules25Mg)}×25 mg · {Math.ceil(calc.dailyAmpoules10Mg)}×10 mg
                  </span>
                </div>
              </div>
            </div>

            {/* Dinamik Güvenlik Uyarıları */}
            <div className="space-y-2">
              {calc.cappedAdultExceed && (
                <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Erişkin Tavan Dozu Aşıldı (15 mg/saat Sınırı!):</span>
                    Hesaplanan hız ({calc.rawHourlyMg.toFixed(1)} mg/saat) erişkin maksimum tavanı olan{' '}
                    <strong>15 mg/saat</strong>’i aştığı için 15 mg/saat ile sınırlandırıldı.
                  </div>
                </div>
              )}

              {!calc.isMicroBolus && calc.dailyMl >= 1500 && (
                <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                  <Droplets className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      Yüksek 24 Saatlik Sıvı Yükü Uyarısı ({calc.dailyMl.toFixed(0)} mL/gün!):
                    </span>
                    0,1 mg/mL konsantrasyonla {calc.effectiveHourlyMg.toFixed(1)} mg/saat infüzyon günde{' '}
                    <strong>{(calc.dailyMl / 1000).toFixed(2)} litre</strong> taşıyıcı sıvı yükler (beyin ödemi,
                    hiponatremi veya KKY’yi ağırlaştırabilir!). Uzun infüzyonda santral yoldan{' '}
                    <strong>0,2–0,5 mg/mL</strong> seçin.
                  </div>
                </div>
              )}

              {concMgMl === 0.1 && !calc.isMicroBolus && (
                <div className="p-3 rounded-xl border bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                  <Timer className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Periferik Damar Yolu 12 Saatlik Rotasyon Zorunluluğu:</span>
                    FDA/KÜB gereği 0,1 mg/mL periferik infüzyonda tromboflebiti önlemek için infüzyon yeri{' '}
                    <strong>her 12 saatte bir</strong> başka bir geniş vene taşınmalıdır.
                  </div>
                </div>
              )}

              {concMgMl > 0.1 && !calc.isMicroBolus && (
                <div className="p-3 rounded-xl border bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      {concMgMl} mg/mL — Santral Venöz Kateter (SVK) Gerektirir!
                    </span>
                    0,1 mg/mL üzerindeki konsantrasyonlar periferik venöz flebit ve ekstravazasyon riski nedeniyle
                    yalnızca santral kateterden uygulanmalıdır.
                  </div>
                </div>
              )}

              {activeTab === 'obstetric' && (
                <div className="p-3 rounded-xl border bg-pink-500/15 border-pink-500/40 text-pink-900 dark:text-pink-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Obstetrik MgSO₄ Sinerji Uyarısı:</span>
                    Eşzamanlı Magnezyum Sülfat infüzyonu derin hipotansiyon, kas güçsüzlüğü ve sezaryen genel
                    anestezisinde non-depolarizan nöromüsküler bloker (roküronyum/vekuronyum) etkisinde belirgin uzama
                    yapar — TOF monitörizasyonu ve Sugammadeks hazır bulundurulmalıdır!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. TÜRKİYE & KLİNİK PREPARAT / KONSANTRASYON REHBERİ                */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Loxen® / Cardene® 10 mg / 10 mL IV Ampul (İthal / Hastane Erişimi)',
            presentation: '10 mL sarımsı-berrak IV konsantre çözelti içeren cam ampul (ışığa duyarlı)',
            concentration: '1 mg/mL (Seyreltme Zorunlu!)',
            saltOrBaseNote:
              'Türkiye’de ruhsatlı ticari erişim dönemsel olarak TEB yurt dışı ilaç / hastane ihale (Loxen® 10 mg/10 mL veya Cardene® 25 mg/10 mL) kanalıyla sağlanır. ASLA seyreltilmeden direkt periferik puşelenmez.',
            alertLevel: 'standard',
          },
          {
            name: 'Cardene® IV 25 mg / 10 mL Konsantre Ampul / Flakon',
            presentation: '10 mL konsantre IV çözelti içeren ampul/flakon',
            concentration: '2,5 mg/mL (2,5× Daha Konsantre!)',
            saltOrBaseNote:
              '10 mg/10 mL ampul ile aynı 10 mL hacimde 2,5 kat daha fazla etken madde içerir! 1 ampul (25 mg / 10 mL) + 240 mL SF veya D5W = 250 mL → tam 0,1 mg/mL standart periferik çözelti verir.',
            alertLevel: 'high',
          },
          {
            name: 'Cardene® IV Premiks Torbalar (20 mg/200 mL & 40 mg/200 mL — Uluslararası)',
            presentation: '200 mL kullanıma hazır izotonik SF/D5W premiks torbalar',
            concentration: '0,1 mg/mL (Periferik) · 0,2 mg/mL (SVK)',
            saltOrBaseNote:
              'Premiks torbalar sulandırma ve geçimsiz sıvı (LR/NaHCO₃) hatasını önler; 0,2 mg/mL premiks torba yüksek sıvı kısıtlaması gereken YBÜ hastalarında SVK’dan uygulanır.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart Periferik İnfüzyon (0,1 mg/mL = 100 mcg/mL): 20 mg (2×10 mg ampul) + 180 mL SF/D5W (= 200 mL) VEYA 25 mg (1×25 mg ampul) + 240 mL SF/D5W (= 250 mL).',
          'Sıvı Kısıtlı SVK Enjektörü (0,2 mg/mL = 200 mcg/mL): 10 mg (10 mL) + 40 mL SF/D5W (= 50 mL enjektör) VEYA 20 mg + 80 mL SF/D5W (= 100 mL).',
          'Yüksek Konsantrasyon Nöro-YBÜ SVK Enjektörü (0,5 mg/mL = 500 mcg/mL): 25 mg (10 mL [2,5 mg/mL]) + 40 mL SF/D5W (= 50 mL enjektör; YALNIZCA SVK!).',
          'İntraoperatif Mikro-Bolus Enjektörü (100 mcg/mL = 0,1 mg/mL): 10 mg/10 mL ampulden 1 mL (1 mg) + 9 mL SF (= 10 mL) → 1–5 mL = 100–500 mcg IV.',
        ]}
        concentrationTrapWarning="10 mg/10 mL (1 mg/mL — Loxen®) ile 25 mg/10 mL (2,5 mg/mL — Cardene®) ampulleri aynı 10 mL görünüme sahip olup 2,5 kat konsantrasyon farkı taşır! Ayrıca sulandırma sırasında yanlışlıkla Ringer Laktat torbası seçilmesi dakikalar içinde kimyasal çökelmeye ve ilaç kaybına yol açar."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE, Y-SITE & EKSTRAVAZASYON               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="central-preferred"
        accessSummary="Periferik geniş venden (≥18–20G proksimal önkol/antekübital) YALNIZCA 0,1 mg/mL konsantrasyonda verilebilir ve periferik infüzyon bölgesi FDA/KÜB gereği HER 12 SAATTE BİR flebit riskine karşı değiştirilmelidir. >12 saat sürecek infüzyonlarda, yüksek hızlarda (10–15 mg/sa → 100–150 mL/sa sıvı yükü!) ve 0,2–0,5 mg/mL sıvı kısıtlı konsantrasyonlarda Santral Venöz Kateter (SVK) şiddetle tercih edilir / zorunludur."
        phRange="3,5 – 4,5 (Asidik · Tamponlanmış)"
        osmolalityNote="Asidik pH ve lokal vasküler irritasyon nedeniyle özellikle küçük periferik venlerde 12 saati aşan infüzyonlarda yüksek oranda kimyasal flebit ve tromboflebit geliştirir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF) — Altın standart',
          '%5 Dekstroz (D5W) — Altın standart',
          '%5 Dekstroz + %0,45 NaCl veya %5 Dekstroz + %0,9 NaCl (D5NS)',
          '%0,45 Sodyum Klorür',
        ]}
        stabilityNote="Işıktan korunmalıdır (ampuller kutusunda saklanır). SF veya D5W içinde hazırlanan çözeltiler oda sıcaklığında (20–25 °C) 24 saat stabildir. Çözelti normalde hafif açık sarı renklidir; bulanıklık veya partikül görülürse derhal imha edilir."
        ySiteCompatible={[
          'Esmolol',
          'Labetalol',
          'Fentanil',
          'Remifentanil',
          'Midazolam',
          'Morfin',
          'Dobutamin',
          'Noradrenalin',
          'Potasyum Klorür',
          'Magnezyum Sülfat',
          'Nitrogliserin',
        ]}
        ySiteIncompatible={[
          'Ringer Laktat (LR — KİMYASAL GEÇİMSİZLİK / ÇÖKELTİ!)',
          'Sodyum Bikarbonat (%8,4 NaHCO₃ — ANINDA ÇÖKELTİ!)',
          'Furosemid (çökelti!)',
          'Heparin (yüksek konsantrasyonda bulanıklık/uyumsuz)',
          'Tiyopental',
          'Sefepim / Ampisilin-Sulbaktam / Seftazidim',
          'Mannitol (yüksek konsantrasyonda değişken — ayrı lümen önerilir)',
        ]}
        extravasationProtocol="Periferik infüzyon yerinde kızarıklık, sertlik, ağrı veya ekstravazasyon geliştiğinde infüzyonu hemen durdurun, kanülden aspire edin, farklı proksimal bir damar yoluna (veya SVK’ya) geçin; etkilenen ekstremiteyi eleve edip lokal semptomatik bakım (ılık/soğuk kompres) uygulayın. Vazopressör olmadığından Fentolamin gerekmez, ancak kimyasal flebit takibi yapılır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Ana klirens hepatiktir (%99+); ancak orta-ileri böbrek yetmezliğinde (eGFR <30 mL/dk) plazma düzeyleri ~%30–50 artabilir — düşük hızla başlanıp yavaş titre edilir."
        renalDetails={[
          'Değişmemiş nikardipinin <1%’i böbrekle atılır; diyaliz veya CRRT ile anlamlı düzeyde uzaklaştırılmaz (yüksek protein bağlanması >%95 ve geniş Vd).',
          'Böbrek yetmezliğinde sistemik klirenste sekonder azalma ve daha yüksek pik plazma düzeyleri gözlendiğinden standart 5 mg/saat yerine 2,5–5 mg/saat ile başlanıp 15 dk aralıklarla dikkatli titre edilmesi önerilir.',
          'Oligürik/anürik ABH veya SDBY hastalarında 0,1 mg/mL ile yüksek sıvı yükünden kaçınmak için santral yoldan 0,2–0,5 mg/mL konsantrasyon seçilmelidir.',
        ]}
        hepaticSummary="Child-Pugh B / C karaciğer yetmezliğinde CYP3A4 klirensi %50+ DÜŞER — etki süresi ve offset belirgin uzar!"
        hepaticDetails={[
          'Nikardipin primer olarak hepatik CYP3A4 ile elimine edilir; ağır sirozda yarı ömür 2–4 kat uzayabilir ve infüzyon kesildikten sonra hipotansiyon saatlerce devam edebilir.',
          'Child-Pugh B/C’de başlangıç hızı azaltılmalı (örn. 2,5 mg/saat), titrasyon aralıkları en az 15–30 dakikaya uzatılmalı ve hedefe yaklaşırken erkenden 1–3 mg/saat’e inilmelidir.',
          'Siroz ve portal hipertansiyonda hepatik venöz basınç gradienti (HVPG) artabileceğinden özofagus varisi kanama riski olanlarda yakın izlem gerekir.',
        ]}
        {...STANDALONE_ORGAN_PART2['nicardipine']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE DOZ YÖNETİMİ                                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="Yavaş Titrasyon (15 dk) · Aort Darlığı Dışla!"
        geriatricPoints={[
          '>65 yaş hastalarda kalsifik aort stenozu prevalansı yüksektir — nikardipin başlamadan önce mutlaka fizik muayene/EKO ile ileri aort darlığı dışlanmalıdır.',
          'Hepatik kan akımı ve CYP3A4 kapasitesindeki yaşa bağlı azalma ile bozulmuş baroreseptör refleks nedeniyle ani derin hipotansiyon ve serebral hipoperfüzyon riski yüksektir; 2,5–5 mg/saat ile başlayıp 15 dk aralıklarla yavaş titre edilmelidir.',
          'Yaşlılarda izole sistolik hipertansiyon sık olduğundan diyastolik kan basıncını (DBP) <60 mmHg altına düşürmemek koroner perfüzyon için kritiktir.',
        ]}
        obesityWeightScalarBadge="Sabit mg/saat (Erişkin) · IBW/AdjBW (Ağırlık Bazlı)"
        obesityPoints={[
          'Erişkin hipertansif acillerde doz vücut ağırlığından bağımsız 5 → maks 15 mg/saat şeklinde KB yanıtına göre titre edilir.',
          'Nikardipin yüksek lipofilisitesi nedeniyle obez hastalarda adipoz dokuya geniş ölçüde dağılır (Vd artar); >24 saatlik yüksek doz infüzyonlarda kesim sonrası derin kompartmandan geri salınım (offset) normal kilolulara göre daha uzun sürebilir.',
          'Pediatrik/ergen obez hastalarda veya ağırlık bazlı mikro-bolus referansında TBW yerine IBW veya AdjBW kullanılmalıdır.',
        ]}
        clinicalNote="İntrakraniyal kanama (ATACH-2) ve nöro-YBÜ hastalarında aşırı sıvı yükü ve hiponatremi beyin ödemini kötüleştirdiğinden, obez veya yaşlı hastalarda 0,1 mg/mL yerine erken dönemde santral 0,2–0,5 mg/mL geçişi planlanmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK, OBSTETRİK & LAKTASYON                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="FDA Gebelik Kategorisi C · ACOG & SFAR kılavuzlarında şiddetli preeklampsi/eklampsi IV antihipertansif tedavi protokollerinde güçlü seçenek."
        pregnancyDetails={[
          'Uterin arter direncini düşürerek uteroplasental kan akımını korur ve fetal kalp hızında (FKH) beta-blokerler gibi bradikardi yapmaz; plasental geçişi sınırlıdır (fetal/maternal oran ~0,1).',
          'KRİTİK OBSTETRİK UYARI: Eklampsi profilaksisi için eşzamanlı verilen IV Magnezyum Sülfat (MgSO₄) ile güçlü sinerji gösterir — ani maternal hipotansiyon, pulmoner ödem riski ve sezaryen anestezisinde nöromüsküler bloker (roküronyum/vekuronyum) etkisinde ciddi uzama gelişebilir!',
          'Düz kas gevşetici etkisiyle yüksek dozlarda hafif tokolitik (uterus atonisi) etki oluşturabileceğinden sezaryen sonrası postpartum uterin tonus ve oksitosin yanıtı yakından izlenmelidir.',
        ]}
        lactationSummary="Anne sütüne çok düşük miktarda geçer (Relatif İnfant Dozu <%1); emzirme ile genel olarak uyumludur."
        lactationDetails={[
          'Yüksek maternal plazma protein bağlanması (>%95) ve düşük oral infant biyoyararlanımı nedeniyle emzirilen bebekte klinik hipotansiyon beklenmez.',
          'Postpartum şiddetli preeklampsi yönetiminde anne stabil olduğunda emzirme sürdürülebilir; prematüre yenidoğanlarda standart klinik gözlem önerilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖNEMLİ OLUMSUZ ETKİLER                                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Hipotansiyon & Aşırı KB Düşüşü',
            incidenceOrSeverity: '%5 – %15',
            tone: 'rose',
            detail:
              'Özellikle hedefe ulaşıldıktan sonra 3 mg/saat idameye düşülmezse veya karaciğer yetmezliği/hipovolemi varsa birikime bağlı gecikmiş derin hipotansiyon.',
          },
          {
            title: 'Refleks Taşikardi',
            incidenceOrSeverity: '%4 – %12',
            tone: 'amber',
            detail:
              'Arteriyoler SVR düşüşüne ikincil baroreseptör uyarımıyla KH artışı; koroner arter hastalığı ve aort diseksiyonunda miyokard iskemisini/dP/dt’yi artırabilir.',
          },
          {
            title: 'Periferik Venöz Flebit & Tromboflebit',
            incidenceOrSeverity: '%5 – %14 (>12 sa)',
            tone: 'amber',
            detail:
              'Periferik infüzyon 12 saati aşarsa veya >0,1 mg/mL verilirse ciddi lokal inflamasyon/flebit; 12 saatlik damar yolu rotasyonu veya SVK zorunludur.',
          },
          {
            title: 'Baş Ağrısı & Yüzde Kızarma (Flushing)',
            incidenceOrSeverity: '%10 – %15',
            tone: 'teal',
            detail:
              'Serebral ve kutanöz arteriyoler vazodilatasyona bağlı zonklayıcı baş ağrısı, sıcaklık hissi ve flushing (en sık non-kritik yan etki).',
          },
          {
            title: 'Sıvı Yükü & Dilüsyonel Hiponatremi',
            incidenceOrSeverity: '0,1 mg/mL Yüksek Hız',
            tone: 'rose',
            detail:
              '10–15 mg/saat hızında 0,1 mg/mL ile günde 2,4–3,6 L taşıyıcı sıvı infüzyonu; D5W kullanılırsa beyin ödemi ve hiponatremi, SF kullanılırsa hiperkloremik asidoz/pulmoner ödem.',
          },
          {
            title: 'Hipoksemi (HPV İnhibisyonu)',
            incidenceOrSeverity: 'ARDS / KOAH',
            tone: 'indigo',
            detail:
              'Pulmoner arteriyollerde hipoksik pulmoner vazokonstriksiyonu (HPV) kısmen körelterek V/Q uyumsuzluğu ve PaO₂’de hafif düşüş yaratabilir.',
          },
          {
            title: 'Bulantı, Kusma & Periferik Ödem',
            incidenceOrSeverity: '%2 – %6',
            tone: 'teal',
            detail:
              'Prekapiller arteriyoler dilatasyonun kapiller hidrostatik basıncı artırmasıyla alt ekstremite ödemi ve GİS intoleransı.',
          },
          {
            title: 'İskemik Anjina Paradoksu',
            incidenceOrSeverity: 'KAH / Aort Darlığı',
            tone: 'rose',
            detail:
              'Diyastolik koroner perfüzyon basıncının aşırı düşmesi ve refleks taşikardi kombinasyonu ciddi KAH veya aort darlığında miyokardiyal iskemiyi tetikleyebilir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'ATACH-2 Kuralı: Akut İntraserebral Kanamada (İKH) SKB <130 mmHg Tuzağı',
            detail:
              'ATACH-2 randomize çalışmasında nikardipin ile SKB’nin 110–139 mmHg (aşırı agresif) aralığına indirilmesi, 140–179 mmHg grubuna kıyasla nörolojik iyileşme sağlamamış, aksine akut böbrek hasarı (ABH) insidansını anlamlı artırmıştır. AHA/ASA 2022 hedefi: pürüzsüz SKB 130–140 mmHg, ani >60–70 mmHg dalgalanmalardan kaçınma.',
          },
          {
            title: 'Hedef KB’ye Ulaşınca 3 mg/saat’e Düşme (Overshoot Önleme) Kuralı',
            detail:
              'Nikardipinin pik etkisi 15–45 dk içinde kümülatif artar. 12,5–15 mg/saat hızında hedef KB yakalandığında pompa o hızda bırakılırsa 20–30 dk sonra derin hipotansiyon gelişir — hedefe ulaşılır ulaşılmaz 3 mg/saat’e indirilip yeniden ince titre edilmelidir.',
          },
          {
            title: 'Sodyum Nitroprussid & Nitrogliserine Üstünlüğü (Nöro-Anestezi)',
            detail:
              'Nitroprussid siyanür/tiyosiyanat toksisitesi, koroner çalma ve venöz dilatasyonla ICP artışı yapar; Nitrogliserin ise ağırlıklı venodilatatördür ve hızla taşiflaksi geliştirir. Nikardipin taşiflaksi yapmaz, ICP’yi artırmaz ve siyanür riski sıfırdır.',
          },
          {
            title: 'Akut Aort Diseksiyonunda Mutlaka Esmolol’den SONRA Eklenir',
            detail:
              'Tek başına nikardipin baroreseptör refleks taşikardiyle dP/dt makaslama stresini artırır. Önce Esmolol (veya Labetalol) ile KH <60/dk sağlanır; SKB >120 mmHg kalırsa ikinci ajan olarak Nikardipin başlanır.',
          },
          {
            title: 'Kardiyak Cerrahi & Radial Arter Greft Spazmı Önlenmesi',
            detail:
              'Koroner baypas (CABG) sonrası perioperatif hipertansiyonda ve radial arter / IMA greft vazospazmının önlenmesinde yüksek koroner/arteriyel vazodilatatör seçiciliği nedeniyle ideal ajandır.',
          },
          {
            title: 'Oral Antihipertansife Geçiş (Weaning Protokolü)',
            detail:
              'Oral nikardipin veya amlodipin/nifedipin/ARB verildikten sonra ilk oral dozdan 1 saat sonra IV nikardipin infüzyonu kapatılabilir (uzun etkili oral ajanlarda ilk doz sonrası 1–2 saat içinde kademeli azaltarak kesilir).',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. DERİN FARMAKODİNAMİK ANALİZ (4 KADEMELİ AKORDİYON, KAPALI)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Vasküler L-Tipi Cav1.2 Dihidropiridin Bağlanma Cebi & Voltaj Bağımlı Selektivite)',
          summary:
            'Nikardipin, 1,4-dihidropiridin (DHP) sınıfından yüksek lipofilik bir voltaj kapılı L-tipi Ca²⁺ kanalı (Cav1.2; CACNA1C) allosterik modülatörüdür. Kanalın por oluşturan α₁C alt biriminin transmembran IIIS5, IIIS6 ve IVS6 segmentlerinin oluşturduğu hidrofobik DHP cebine bağlanarak kanalın inaktif (kapalı) konformasyonunu stabilize eder; verapamil (fenilalkilamin) ve diltiazemden (benzotiyazepin) farklı bir bağlanma bölgesine ve dramatik biçimde daha yüksek vasküler selektiviteye sahiptir (Miller’s / Stoelting’s / Goodman & Gilman).',
          points: [
            'Voltaj-Bağımlı Modüle Reseptör Teorisi (Vasküler vs Kardiyak Selektivite Nedeni): Vasküler düz kas hücrelerinin istirahat membran potansiyeli kardiyomiyositlere göre çok daha depolarizedir (−40 ila −55 mV vs −85 ila −90 mV). Dihidropiridinler inaktif (depolarize) durumdaki Cav1.2 kanallarına dinlenme durumundaki kanallara göre >100–1.000 kat daha yüksek afiniteyle bağlanır → bu biyofiziksel özellik nikardipinin arteriyolleri miyokard ve SA/AV düğümden çok önce güçlüce gevşetmesini açıklar.',
            'Alternatif Ekzon İzoformu (Cav1.2b vs Cav1.2a): Arteriyoler düz kas hücrelerinde baskın olan Cav1.2b (ekzon 8b) izoformu, kardiyak Cav1.2a (ekzon 8a) izoformuna kıyasla dihidropiridin bağlanmasına yapısal olarak çok daha duyarlıdır.',
            'Doku Kullanım-Bağımlılığının (Use-Dependence) Yokluğu: Verapamil/diltiazemin aksine yüksek ateşleme frekansındaki SA/AV düğüm kanallarının toparlanmasını (recovery from inactivation) belirgin geciktirmez — bu nedenle klinik dozlarda AV iletim bloğu oluşturmaz.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Düz Kas Gevşeme Dinamiği',
          summary:
            'Arteriyoler düz kas sarkolemmasında Cav1.2 kanallarının kapatılması, eksitasyon-kontraksiyon eşleşmesinin ana tetikleyicisi olan ekstraselüler Ca²⁺ girişini keserek kasılma aparatını moleküler düzeyde gevşetir:',
          points: [
            'Sitozolik [Ca²⁺]i Düşüşü & Ca²⁺–Kalmodulin–MLCK Ekseni: Ekstraselüler Ca²⁺ akışı durduğunda sarkoplazmik retikulumun (SR) Ca²⁺-ATPaz (SERCA) ve sarkolemmal PMCA/NCX pompaları sitozolik serbest [Ca²⁺]i düzeyini bazale çeker. 4 Ca²⁺:1 Kalmodulin kompleksi dağılır → Miyozin Hafif Zincir Kinazı (MLCK) inaktive olur.',
            'MLCP Baskınlığı & Çapraz Köprü Ayrılması: MLCK aktivitesi düştüğünde yapısal olarak aktif olan Miyozin Hafif Zincir Fosfataz (MLCP) baskın hale gelir, düzenleyici miyozin hafif zincirini (MLC₂₀-Ser19) defosforile eder → aktin-miyozin çapraz köprüleri çözülür ve arteriyoler lümen genişler.',
            'Nitrik Oksit (NO) & Endotelyal Koruma (Ek Mekanizma): Nikardipin vasküler endotelde oksidatif stresi azaltarak eNOS aracılı bazal nitrik oksit (NO → çözünür guanilat siklaz → cGMP → PKG → MLCP aktivasyonu) biyoyararlanımını destekler ve mikrovasküler akımı iyileştirir.',
            'Kardiyomiyositlerde Korunan CICR: Miyokardda istirahat membran potansiyeli negatif (−90 mV) olduğundan ve nikardipinin kardiyak Cav1.2a afinitesi düşük kaldığından, Faz 2 ICa,L girişi ve SR RyR2 Ca²⁺ salınımı (CICR) büyük ölçüde korunur; ayrıca düşen SVR (afterload↓) ve hafif refleks sempatik tonus olası hafif doğrudan negatif inotropiyi tamamen telafi eder.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Sistemik Rezistans Arteriyoller & Ventrikülo-Arteriyel Eşleşme → Kardiyovasküler Sistem',
            tissueTarget: 'Arteriyoler Düz Kas · Sol Ventrikül Afterload · Baroreseptör Ark',
            accent: 'teal',
            points: [
              'Saf Arteriyoler Vazodilatasyon (SVR↓↓, Venöz Preload ≈ Sabit): Kapasitans venüllerinde L-tipi kanal bağımlılığı arteriyollere göre düşük olduğundan venöz göllenme yapmaz; bu sayede preload’u çökertmeden arteriyel basıncı düşürür.',
              'Atım Hacmi (SV) & Kardiyak Debi (CO) Korunması: Sol ventrikül art-yükünü (Ea↓) düşürdüğü için sağlıklı ve orta dereceli hipertansif kalpte ejeksiyon fraksiyonu ve kardiyak debi artar veya korunur.',
              'Baroreseptör Refleks Taşikardi Eşiği: Kan basıncının ani düşüşü karotis sinüs baroreseptör boşalımını azaltarak hafif refleks sempatik artış (+5–15 atım/dk) doğurabilir; ancak 1. kuşak kısa etkili nifedipine göre bu yanıt çok daha yumuşaktır.',
            ],
          },
          {
            systemTitle: 'Serebral Pial Arteriyoller & Kan-Beyin Bariyeri → Nörovasküler Fizyoloji',
            tissueTarget: 'Serebral Rezistans Arteriyolleri · Serebral Otoregülasyon · ICP',
            accent: 'sky',
            points: [
              'İntrakraniyal Basınç (ICP) Koruması: Sodyum nitroprussidin aksine serebral venöz kapasitansı genişletmediğinden intrakraniyal kan hacmini (CBV) ve ICP’yi anlamlı artırmaz — kraniyotomi, İKH ve travmatik beyin hasarında güvenli antihipertansiftir.',
              'Serebral Kan Akımı (CBF) & Vazospazm: Subaraknoid kanamada (SAK) nimodipine benzer şekilde serebral pial düz kas Ca²⁺ girişini bloke ederek serebral kan akımını destekler ve nörovasküler yatakta perfüzyonu korur.',
              'Düşük KB Dalgalanması (Blood Pressure Variability ↓): Akut İKH’da sistolik basınç dalgalanması hematom büyümesi ve kötü prognozla ilişkilidir; nikardipin sürekli infüzyonu bolus labetalole göre çok daha düşük KB varyabilitesi sağlar.',
            ],
          },
          {
            systemTitle: 'Koroner Epikardiyal/Mikrovasküler Yatak & Pulmoner Dolaşım → Kalp & Akciğer',
            tissueTarget: 'Koroner Arteriyoller · Radial Greft · Pulmoner Arteriyol (HPV)',
            accent: 'indigo',
            points: [
              'Koroner Arteriyoler Dilatasyon & Çalma (Steal) Yokluğu: Hem epikardiyal hem rezistans koroner damarları gevşeterek koroner kan akımını artırır; miyokard duvar gerilimini (afterload↓) azalttığı için MVO₂’yi düşürür (refleks taşikardi engellendiği sürece).',
              'Hipoksik Pulmoner Vazokonstriksiyon (HPV) Etkisi: Pulmoner arteriyol düz kasındaki L-tipi Ca²⁺ kanallarını da gevşettiğinden PVR’yi düşürür; ancak tek akciğer ventilasyonu (OLV) veya ağır ARDS’de HPV’yi körelterek şant fraksiyonunu hafifçe artırabilir.',
              'Arteriyel Greft Spazmı: CABG’de radial arter ve internal mamarian arter (IMA) spazmını önlemede ve çözmede oldukça etkilidir.',
            ],
          },
          {
            systemTitle: 'Uteroplasental Yatak, Renal Arteriyoller & Nöromüsküler Kavşak → Obstetrik & Organlar',
            tissueTarget: 'Uterin Arter · Afferent Renal Arteriyol · Presinaptik NMJ',
            accent: 'amber',
            points: [
              'Uteroplasental Perfüzyon & Miyometriyal Etki: Preeklampside vazospastik uterin ve spiral arteriyolleri gevşeterek plasental perfüzyonu korur; yüksek konsantrasyonlarda miyometriyal Cav1.2 inhibisyonuyla hafif tokolitik etki gösterir.',
              'Renal Hemodinami & Natriürez: Afferent arteriyoler vazodilatasyonla renal kan akımını ve GFR’yi korur, hafif tübüler natriürez oluşturur (ancak aşırı sistemik hipotansiyon [ATACH-2 SKB <130] renal perfüzyonu bozar).',
              'Nöromüsküler Kavşak (NMJ) & MgSO₄ Potansiyalizasyonu: Ca²⁺ kanal blokajı ve yüksek Mg²⁺ (presinaptik P/Q-tipi Ca²⁺ antagonizması → ACh salınımı↓) birleştiğinde non-depolarizan kas gevşeticilerin etki süresi ve derinliği belirgin artar.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Taşiflaksi Yokluğu, Sinerjiler & Tavan Dozu (15 mg/saat)',
          summary:
            'Nitrogliserinden farklı olarak nikardipin sülfidril tükenmesine uğramaz ve uzun süreli infüzyonlarda taşiflaksi geliştirmez; ancak 15 mg/saat üzerindeki dozlar ek antihipertansif kazanç yerine derin doku birikimi, uzamış offset ve sıvı yükü toksisitesi doğurur.',
          points: [
            'Esmolol / Labetalol + Nikardipin Fizyolojik Sinerjisi: Nikardipin arteriyoler direnci (SVR) düşürürken Esmolol baroreseptör refleks taşikardiyi ve dP/dt’yi bloke eder — şiddetli perioperatif HT ve akut aort diseksiyonunda altın standart kombinasyondur.',
            'CYP3A4 & P-gp İnhibitörleriyle Farmakokinetik Amplifikasyon: Nikardipin hem CYP3A4 substratı hem de potent CYP3A4/CYP2C19 inhibitörüdür; eşzamanlı siklosporin/takrolimus düzeylerini 2–3 kat yükseltebilir, azol antifungaller/amiodaron ise nikardipin klirensini belirgin yavaşlatır.',
            'Dantrolen + Kalsiyum Kanal Blokeri Uyarısı: Verapamil ile dantrolen kombinasyonu ölümcül hiperkalemi ve kardiyovasküler kollaps yaratır; dihidropiridinlerde (nikardipin) bu risk çok daha düşük bildirilse de malign hipertermi krizinde dantrolen uygulanırken tüm IV Ca²⁺ kanal blokerlerinden kaçınılması güvenli yaklaşımdır.',
          ],
        }}
        clinicalPearls={[
          '3 mg/saat Kuralını Asla Unutmayın: 10–15 mg/saat hızında hedef KB yakalandığı an infüzyon 3 mg/saat idameye çekilmezse, lipofilik doku kompartmanı dolmaya devam eder ve 20–40 dk sonra dirençli hipotansiyon patlak verir.',
          '0,1 mg/mL Sıvı Yükü Tuzağı: 15 mg/saat hızında 0,1 mg/mL infüzyon tam 150 mL/saat (= 3,6 L/gün!) sıvı verir! İKH veya KKY hastasında bunu fark etmezseniz hastayı iatrojenik beyin/akciğer ödemine sokarsınız — uzun infüzyonda santral 0,2–0,5 mg/mL’ye geçin.',
          'İki Geçimsiz Sıvı: Ringer Laktat ve %8,4 Sodyum Bikarbonat! Ameliyathanede hastanın ana idame sıvısı LR ise nikardipini aynı Y-porttan bağlamayın; ayrı hattan SF veya D5W ile verin.',
          'Preeklampsi + Sezaryen + MgSO₄ + Nikardipin: Bu dörtlüde genel anestezi gerekiyorsa roküronyum başlangıç dozunu düşürün, zorunlu TOF monitörizasyonu yapın ve ekstübasyon öncesi Sugammadeks hazır bulundurun.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Nikardipin Hidroklorür (IV)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Ringer Laktat (LR) & Sodyum Bikarbonat (%8,4 NaHCO₃) — Aynı IV Lümen / Y-Site',
            mechanism: 'pH Bağımlı Fizikokimyasal Çözünürlük Kaybı & Çökelti',
            clinicalEffect: 'İnfüzyon setinde veya torbada hızla bulanıklık ve partikül/çökelti oluşumu; ilaç kaybı ve mikroemboli riski.',
            management: 'Asla LR veya NaHCO₃ ile seyreltmeyin ve aynı hattan vermeyin; yalnızca %0,9 NaCl (SF) veya %5 Dekstroz (D5W) kullanın.',
          },
          {
            severity: 'X',
            agent: 'Dantrolen IV (Malign Hipertermi Krizinde)',
            mechanism: 'Kalsiyum Kanal Blokerleri + Dantrolen Sinerjik Miyokardiyal Depresyon / Hiperkalemi Riski',
            clinicalEffect: 'Özellikle verapamille ölümcül hiperkalemi ve kardiyak arrest tanımlanmıştır; dihidropiridinlerde risk daha düşük olsa da MH krizinde güvenli değildir.',
            management: 'Malign hipertermi şüphesinde veya dantrolen tedavisi sırasında IV nikardipini derhal durdurun.',
          },
          {
            severity: 'D',
            agent: 'Magnezyum Sülfat (MgSO₄) & Non-Depolarizan Nöromüsküler Blokerler (Roküronyum/Vekuronyum)',
            mechanism: 'Sinerjik Vasküler Ca²⁺ Antagonizması & Presinaptik NMJ ACh Salınım Baskılanması',
            clinicalEffect: 'Obstetrik preeklampside ani derin maternal hipotansiyon, kas güçsüzlüğü ve uzamış rezidüel nöromüsküler blok.',
            management: 'Yakın arteriyel KB, DTR ve solunum takibi yapın; genel anestezide NMB dozunu azaltın, TOF izlemi ve Sugammadeks hazır bulundurun.',
          },
          {
            severity: 'D',
            agent: 'Kalsinörin İnhibitörleri (Siklosporin · Takrolimus · Sirolimus)',
            mechanism: 'Nikardipinin Güçlü Hepatik/İntestinal CYP3A4 & P-gp İnhibisyonu',
            clinicalEffect: 'Transplant hastalarında takrolimus/siklosporin kan düzeylerinde 2–3 kat yükselme → akut nefrotoksisite ve nörotoksisite!',
            management: 'Eşzamanlı kullanımda günlük kalsinörin inhibitörü çukur (trough) düzeyi ve kreatinin izleyin; doz azaltımına hazırlıklı olun.',
          },
          {
            severity: 'D',
            agent: 'Güçlü CYP3A4 İnhibitörleri (Vorikonazol · Flukonazol · Klaritromisin · Ritonavir · Amiodaron)',
            mechanism: 'Nikardipin Hepatik CYP3A4 Metabolizmasının İnhibisyonu',
            clinicalEffect: 'Nikardipin klirensi yavaşlar, plazma düzeyleri yükselir ve kesim sonrası hipotansiyon süresi belirgin uzar.',
            management: 'Düşük hızla (2,5–5 mg/saat) başlayın, titrasyon aralıklarını ≥15 dk tutun ve hedefe ulaşınca hızla 1–3 mg/saat’e inin.',
          },
          {
            severity: 'C',
            agent: 'Beta-Blokerler (Esmolol · Labetalol) · Volatil Anestezikler · Fentanil / Propofol',
            mechanism: 'Aditif Periferik Vazodilatasyon & Sempatik Refleks Baskılanması',
            clinicalEffect: 'Güçlü ve öngörülebilir KB kontrolü sağlar ancak hipovolemide derin hipotansiyon potansiyalize olur.',
            management: 'İnvaziv arteriyel basınç (A-Line) altında kademeli titre edin; övolemiyi koruyun.',
          },
        ]}
        references={[
          {
            authors: 'Qureshi AI, Palesch YY, Barsan WG, et al. (ATACH-2 Trial Investigators)',
            title: 'Intensive Blood-Pressure Lowering in Patients with Acute Cerebral Hemorrhage.',
            journal: 'N Engl J Med',
            year: 2016,
            note: 'Akut İKH’da IV nikardipin ile SKB 110–139 mmHg (aşırı agresif) vs 140–179 mmHg karşılaştırması: agresif düşüş nörolojik fayda sağlamayıp renal yan etkileri artırmıştır.',
          },
          {
            authors: 'Greenberg SM, Ziai WC, Cordonnier C, et al.',
            title: '2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage: A Guideline From the AHA/ASA.',
            journal: 'Stroke',
            year: 2022,
            note: 'Akut İKH’da pürüzsüz SKB 130–140 mmHg hedefi, aşırı KB dalgalanmasından kaçınma ve titre edilebilir IV nikardipinin birinci basamak rolü.',
          },
          {
            authors: 'Peacock WF, Varon J, Baumann BM, et al. (CLUE Trial Investigators)',
            title: 'CLUE: A Comparative Effectiveness Trial of IV Nicardipine Versus Labetalol Use in the Emergency Department.',
            journal: 'Crit Care',
            year: 2011,
            note: 'Akut hipertansif krizde IV nikardipinin ilk 30 dakika içinde hedef SKB aralığına ulaşmada IV labetalole üstünlüğü (%91,7 vs %82,5).',
          },
          {
            authors: 'American College of Obstetricians and Gynecologists (ACOG).',
            title: 'Gestational Hypertension and Preeclampsia: ACOG Practice Bulletin, Number 222.',
            journal: 'Obstet Gynecol',
            year: 2020,
            note: 'Şiddetli preeklampsi/eklampside akut hipertansif kriz hedefleri (<160/110 mmHg), IV antihipertansif algoritmaları ve MgSO₄ etkileşim güvenliği.',
          },
          {
            authors: 'Chiesi USA / FDA / ANSM (Loxen® SmPC).',
            title: 'Cardene® IV / Loxen® (Nicardipine Hydrochloride Injection) — Official Prescribing Information & SmPC.',
            journal: 'FDA / ANSM',
            year: 2023,
            note: '5–15 mg/saat titrasyon, hedef sonrası 3 mg/saat idame, 0,1 mg/mL periferik 12 saatlik damar yolu rotasyonu ve Ringer Laktat / NaHCO₃ geçimsizlik uyarıları.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/nicardipine.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
