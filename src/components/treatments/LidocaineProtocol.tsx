import React, { useState, useId } from 'react';
import {
  Brain,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Activity,
  HeartPulse,
  Syringe,
  Pill,
  Droplet,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Flame,
  Zap,
  Wind,
  Layers,
  FileText,
  AlertOctagon,
  Timer,
  Eye,
  RefreshCw,
  Skull,
  Shield,
  BookOpen
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

interface DoseHoverProps {
  doseText: string;
  equivText: string;
  explanation?: string;
  className?: string;
  badge?: boolean;
}

export const DoseHover: React.FC<DoseHoverProps> = ({
  doseText,
  equivText,
  explanation = 'Birim Dönüşümü',
  className = '',
  badge = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span
      className={`relative inline-flex items-center gap-1 group cursor-help select-none ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      title={`${doseText} = ${equivText} (${explanation})`}
    >
      <span
        className={`transition-colors font-mono ${
          badge
            ? 'px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold border border-blue-500/30'
            : 'font-semibold underline decoration-dotted decoration-blue-500 underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        {doseText}
      </span>
      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all font-semibold">
        detay
      </span>

      {/* Popover Hover Balonu */}
      {isOpen && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 rounded-xl text-left shadow-2xl border z-50 pointer-events-none transition-all duration-150 bg-slate-900 border-blue-500/60 text-slate-100 dark:bg-slate-950 dark:border-blue-400 shadow-blue-950/60 animate-in fade-in zoom-in-95"
        >
          <span className="block text-[9.5px] font-bold uppercase tracking-wider text-blue-400">
            Doz Karşılığı:
          </span>
          <span className="block text-xs font-black font-mono text-white mt-0.5">
            {equivText}
          </span>
          <span className="block text-[9px] text-slate-400 mt-0.5 font-sans">
            Açıklama: {explanation}
          </span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-950" />
        </span>
      )}
    </span>
  );
};

type ActiveCalcTool = 
  | 'local_infiltration' 
  | 'acls_arrhythmia' 
  | 'systemic_infusion' 
  | 'last_intralipid_rescue';

export const LidocaineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKTİF HESAPLAYICI MODÜL SEÇİCİ ---
  const [activeCalcTool, setActiveCalcTool] = useState<ActiveCalcTool>('local_infiltration');

  // --- GENEL HASTA VE DOZ STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [patientProfile, setPatientProfile] = useState<'healthy_adult' | 'elderly_frail' | 'pediatric' | 'hepatic_impairment'>('healthy_adult');

  // 1. Lokal İnfiltrasyon & Güvenli Doz Parametreleri
  const [solutionType, setSolutionType] = useState<'plain' | 'with_epinephrine'>('plain');
  const [concentrationPercent, setConcentrationPercent] = useState<0.5 | 1 | 2>(1); // %0.5, %1, %2
  const [plannedVolumeMl, setPlannedVolumeMl] = useState<number>(15);
  const [sprayPuffCount, setSprayPuffCount] = useState<number>(4);

  // 2. ACLS & Ventriküler Aritmi / RSI Parametreleri
  const [cardiacScenario, setCardiacScenario] = useState<
    | 'arrest_vf_pvt'
    | 'pulsed_stable_vt'
    | 'rsi_premedication'
  >('arrest_vf_pvt');
  const [arrestDoseRound, setArrestDoseRound] = useState<'initial' | 'repeat'>('initial');
  const [vtInfusionMgMin, setVtInfusionMgMin] = useState<number>(2.0); // 1-4 mg/dk

  // 3. Sistemik Perioperatif IV Analjezi Parametreleri
  const [ivAnalgesiaPhase, setIvAnalgesiaPhase] = useState<'bolus_loading' | 'continuous_maintenance'>('continuous_maintenance');
  const [ivLoadingMgKg, setIvLoadingMgKg] = useState<number>(1.5); // mg/kg
  const [ivMaintMgKgHr, setIvMaintMgKgHr] = useState<number>(1.5); // 1.0 - 2.0 mg/kg/saat
  const [ivBagPrep, setIvBagPrep] = useState<'500ml_1000mg' | '500ml_2000mg' | 'pure_2_percent'>('500ml_1000mg'); // 2 mg/mL veya 4 mg/mL

  // 4. LAST (%20 İntralipid Acil Kurtarma) Parametreleri
  const [lastRefractoryArrests, setLastRefractoryArrests] = useState<number>(1); // 1, 2 veya 3 bolus
  const [lastInfusionSpeed, setLastInfusionSpeed] = useState<'standard' | 'double_escalated'>('standard');

  // UI Durumları
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Benzersiz ID'ler
  const weightInputId = useId();
  const profileSelectId = useId();
  const solutionSelectId = useId();
  const concSelectId = useId();
  const plannedVolId = useId();
  const sprayPuffId = useId();
  const cardiacScenarioId = useId();
  const vtInfusionId = useId();
  const ivLoadingId = useId();
  const ivMaintId = useId();
  const ivBagId = useId();

  // --- MATEMATİKSEL VE KLİNİK HESAPLAMALAR ---

  // A. Lokal İnfiltrasyon Güvenli Doz Hesapları
  // Saf lidokain: 4.5 mg/kg (Maksimum tavan: 300 mg)
  // Adrenalinli (1:200.000): 7.0 mg/kg (Maksimum tavan: 500 mg)
  // Pediatrik veya Karaciğer yetmezliğinde limitler %30-50 azaltılır
  const maxMgPerKg = solutionType === 'with_epinephrine' ? 7.0 : 4.5;
  const absoluteMaxCeilingMg = solutionType === 'with_epinephrine' ? 500 : 300;
  
  let profileFactor = 1.0;
  if (patientProfile === 'elderly_frail') profileFactor = 0.8;
  if (patientProfile === 'hepatic_impairment') profileFactor = 0.6;
  if (patientProfile === 'pediatric') profileFactor = 0.85;

  const calculatedMaxDoseMg = Math.min(
    weightKg * maxMgPerKg * profileFactor,
    absoluteMaxCeilingMg * profileFactor
  );

  // Konsantrasyona göre mg/mL
  const mgPerMl = concentrationPercent * 10; // %0.5 = 5 mg/mL, %1 = 10 mg/mL, %2 = 20 mg/mL
  const maxVolumeMl = calculatedMaxDoseMg / mgPerMl;

  // Planlanan hacmin tükettiği mg ve güvenlik yüzdesi
  const plannedDoseMg = plannedVolumeMl * mgPerMl;
  const plannedDosePercent = Math.min(Math.round((plannedDoseMg / calculatedMaxDoseMg) * 100), 200);

  // Sprey hesabı: 1 puf = 10 mg
  const sprayMg = sprayPuffCount * 10;
  const maxSprayPuffs = Math.floor(calculatedMaxDoseMg / 10);

  // Tamponlama hesabı (Enjeksiyon ağrısını önlemek için):
  // 9 mL Lidokain (%1 veya %2) + 1 mL %8.4 Sodyum Bikarbonat
  const bufferLidoMl = Math.round(plannedVolumeMl * 0.9 * 10) / 10;
  const bufferBicarbMl = Math.round(plannedVolumeMl * 0.1 * 10) / 10;

  // B. ACLS & Kardiyovasküler Aritmi Hesapları
  // Arrest VF/pVT İlk Doz: 1.0 - 1.5 mg/kg IV/IO (Maks: 100 mg)
  // Arrest VF/pVT Ek Doz: 0.5 - 0.75 mg/kg IV/IO (Maks: 50 mg)
  // Kümülatif Maksimum Arrest Dozu: 3.0 mg/kg
  const arrestInitialMg = Math.min(weightKg * 1.5, 100);
  const arrestRepeatMg = Math.min(weightKg * 0.75, 50);
  const arrestMaxCumulativeMg = weightKg * 3.0;

  // Aritmal %2 (20 mg/mL) üzerinden gereken mL hacmi
  const arrestInitialMl_2pct = arrestInitialMg / 20;
  const arrestRepeatMl_2pct = arrestRepeatMg / 20;

  // RSI KİB/Bronkospazm Premedikasyonu (1.5 mg/kg IV bolus, maks 100 mg)
  const rsiPremedMg = Math.min(weightKg * 1.5, 100);
  const rsiPremedMl_2pct = rsiPremedMg / 20;

  // Nabızlı VT İdame İnfüzyon Pompa Hızı (1-4 mg/dk)
  // %2 Aritmal (20 mg/mL) 50 mL enjektörde veya 1000 mg / 500 mL SF (2 mg/mL)
  const vtMgHr = vtInfusionMgMin * 60; // mg/saat
  const vtPumpMlHr_2mgml = vtMgHr / 2.0; // 2 mg/mL solüsyonda mL/saat
  const vtPumpMlHr_pure20mgml = vtMgHr / 20.0; // Saf %2 enjektörde mL/saat

  // C. Perioperatif Sistemik IV İnfüzyon Hesapları
  // Yükleme: 1.0 - 1.5 mg/kg IV bolus (10-15 dakikada)
  const ivLoadTotalMg = Math.round(weightKg * ivLoadingMgKg * 10) / 10;
  const ivLoadMl_2pct = Math.round((ivLoadTotalMg / 20) * 10) / 10;

  // İdame: 1.0 - 2.0 mg/kg/saat (ideal kiloya göre önerilir)
  const ivMaintTotalMgHr = Math.round(weightKg * ivMaintMgKgHr * 10) / 10;
  let ivBagConcMgMl = 2.0; // 1000 mg / 500 mL
  if (ivBagPrep === '500ml_2000mg') ivBagConcMgMl = 4.0;
  if (ivBagPrep === 'pure_2_percent') ivBagConcMgMl = 20.0;

  const ivPumpRateMlHr = Math.round((ivMaintTotalMgHr / ivBagConcMgMl) * 10) / 10;
  const iv24HourCumulativeMg = Math.round(ivLoadTotalMg + ivMaintTotalMgHr * 24);

  // D. ASRA LAST & %20 İntralipid Acil Kurtarma Hesapları
  // Bolus: 1.5 mL/kg IV (1 dakikada puşe)
  // İnfüzyon: 0.25 mL/kg/dk (15 mL/kg/saat)
  // Kardiyovasküler instabilite devam ederse: Bolus 1-2 kez tekrarlanabilir, infüzyon 0.5 mL/kg/dk (30 mL/kg/saat)
  // Maksimum Güvenli Toplam Doz: 12 mL/kg (ilk 30-60 dakikada)
  const intralipidBolusMl = Math.round(weightKg * 1.5);
  const intralipidInfusionRateMlHr = Math.round(
    weightKg * (lastInfusionSpeed === 'standard' ? 15.0 : 30.0)
  );
  const intralipidInfusionRateMlMin = Math.round(
    weightKg * (lastInfusionSpeed === 'standard' ? 0.25 : 0.5) * 10
  ) / 10;
  const intralipidMaxCeilingMl = Math.round(weightKg * 12.0);

  // Kümülatif verilen İntralipid tahmini
  const totalBolusesMl = intralipidBolusMl * lastRefractoryArrests;
  const remainingSafetyBudgetMl = Math.max(0, intralipidMaxCeilingMl - totalBolusesMl);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* =========================================================================
          BÖLÜM 1: ÜST BAŞLIK VE HIZLI İLAÇ KİMLİK ÖZETİ
          ========================================================================= */}
      <div
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-blue-500/30 shadow-xl shadow-blue-950/20 text-slate-100'
            : 'bg-white border-blue-200 shadow-lg shadow-blue-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <Zap className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/40 font-mono">
                  Amid Tipi Lokal Anestezik · Sınıf Ib Antiaritmik
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: C01BB01 / N01BB02
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  ARITMAL · JETMONAL · JETOKAİN · VEMCAINE · ANESTOL
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Lidokain (ARITMAL, JETMONAL, JETOKAİN, VEMCAINE, ANESTOL)
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Amid yapılı prototip lokal anestezik ve Vaughan Williams Sınıf Ib antiaritmik ajan.
                Voltaj kapılı hızlı sodyum kanallarının (Nav1.5) faz 0 blokajıyla etki gösterir;
                lokal infiltrasyon, rejyonel sinir blokları, RSI KİB premedikasyonu, postop opioid koruyucu sistemik IV analjezi ve refrakter VF/VT ACLS resüsitasyonunda kullanılır.
              </p>
            </div>
          </div>
        </div>

        {/* Hızlı Parametre Kartları */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Molekül / Sınıf
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
              Amid / Sınıf Ib
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Na⁺ Kanal Blokeri</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Maks Doz (Saf)
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-0.5 font-mono">
              4.5 mg/kg
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Maksimum: 300 mg</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Maks Doz (+Adrenalin)
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5 font-mono">
              7.0 mg/kg
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Maksimum: 500 mg</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Etki Başlama / Süre
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-0.5 font-mono">
              2 – 5 dk / 1 – 2 sa
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Adrenalinle 2–4 sa</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              pKa &amp; Protein Bağlanma
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-0.5 font-mono">
              pKa: 7.9 · %65
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">AAG &amp; Albümin</span>
          </div>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              Spesifik Antidot
            </span>
            <span className="text-xs font-black text-rose-700 dark:text-rose-300 block mt-0.5 font-mono">
              %20 İntralipid
            </span>
            <span className="text-[10px] text-rose-500 dark:text-rose-400 block mt-0.5">1.5 mL/kg IV bolus</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BÖLÜM 2: FARMAKODİNAMİK VE ETKİ MEKANİZMASI
          ========================================================================= */}
      <section
        id="sec-etki"
        className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Farmakodinamik ve Moleküler Etki Mekanizması
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Nav1.5 voltaj kapılı sodyum kanal blokajı, faz 0 inhibisyonu, antiaritmik ve sistemik anti-enflamatuar etki
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>Nöronal Membran Blokajı (Lokal)</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Lidokain, sinir membranını geçerek hücre içi yüzeyden voltaj bağımlı <strong>Nav1.5 sodyum kanallarına</strong> bağlanır.
              İnaktive kanalları stabilize ederek Na⁺ girişini ve aksiyon potansiyeli yayılımını durdurur. İletim blokaj sırası:
              <strong> C lifleri (ağrı/sıcaklık) &gt; B lifleri (preganglionik sempatik) &gt; Aδ (keskin ağrı) &gt; Aβ &gt; Aα (motor)</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4" />
              <span>Sınıf Ib Antiaritmik Etki (Miyokard)</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Ventriküler miyositlerde faz 0 hızlı depolarizasyonu ve Purkinje liflerinin iletimini hafif derecede baskılar.
              İskemik dokuda ve hızlı kalp hızlarında (kullanım bağımlı blokaj / use-dependent) afinitesi kat kat artar.
              Etkin refrakter periyodu (ERP) ve aksiyon potansiyeli süresini (APD) kısaltır; mikro-reentry odaklarını kırar.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Anti-enflamatuar &amp; Opioid Sparing</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Sistemik IV infüzyon dozlarında (1–2 mg/kg/saat), nötrofil adezyonunu, pro-inflamatuar sitokin (IL-6, TNF-α) salınımını ve primer nosiseptör sensitizasyonunu engeller.
              Postoperatif ileus süresini kısaltır, bağırsak motilitesini korur ve postoperatif opioid tüketimini %30–40 oranında azaltır.
            </p>
          </div>
        </div>

        {/* pKa ve pH Kimyasal Denge Kutusu */}
        <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">
              pKa 7.9 ve "Enfeksiyon/Abse İçi Yetersiz Blok" Paradoksu:
            </span>
            <p className="leading-relaxed">
              Lidokain zayıf bir bazdır (pKa: 7.9). Fizyolojik doku pH'sında (7.4), molekülün yaklaşık %25'i lipofilik (yüksüz / non-iyonize) formdadır ve lipid sinir kılıfını kolayca delip geçer.
              Ancak enfekte ve asidotik dokularda (pH 5.5 – 6.0), molekülün neredeyse tamamı (%98+) katyonik (iyonize) forma dönüşerek membran lipidlerini geçemez; bu nedenle lokal anestezi yetersiz kalır.
              Bu sorunu aşmak için solüsyonun %8.4 NaHCO3 ile tamponlanması esastır.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 3: FARMAKOKİNETİK PROFİLİ
          ========================================================================= */}
      <section
        className={`rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen(!pkOpen)}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  Farmakokinetik Profili
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pkOpen ? 'Gizle' : 'Genişletmek için tıklayın'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Onset, peak, doku difüzyonu, protein bağlanması (AAG), hepatik CYP1A2/3A4 metabolizması ve aktif MEGX
              </p>
            </div>
          </div>
          <div className="text-slate-400">
            {pkOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Etki Başlangıcı (Onset)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 2 Dakika (Lokal) / 45-90 sn (IV)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Topikal mukozal: 2–5 dk; Epidural: 5–15 dk; Sinir bloğu: 5–10 dk.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pik Etki (Peak)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 3 Dakika (IV)</span>
                <p className="text-[11px] text-slate-500 mt-1">Lokal infiltrasyonda tam anestezi 5 dakikada yerleşir.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Etki Süresi
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">30 – 60 Dakika (Saf) / 2–4 Saat (+Adrenalin)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Damarsal absorbsiyon hızı bölgenin vaskülaritesine bağlıdır (interkostal &gt; kaudal &gt; epidural &gt; brakial &gt; cilt altı).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1.3 – 1.5 L/kg</span>
                <p className="text-[11px] text-slate-500 mt-1">Hızla vasküler organlara (beyin, kalp, akciğer) ve ardından kas/yağa dağılır.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Protein Bağlanması
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">%60 – %80</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Esas olarak α₁-asit glikoproteine (AAG) ve sekonder albümine bağlanır. Asidozda serbest fraksiyon katlanır.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Eliminasyon Yarı Ömrü (t½β)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                  1.5 – 2.0 Saat
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Karaciğer sirozunda veya kalp yetmezliğinde yarı ömür 4–10 saate kadar uzayabilir.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Hepatik Biyotransformasyon &amp; Toksik MEGX Metaboliti:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Hepatik CYP1A2 ve CYP3A4 Dealkilasyonu:</strong> Lidokain karaciğerde mikrozomal enzimler tarafından <em>monoetilglisinksilidid (MEGX)</em> ve ardından <em>glisinksilidid (GX)</em>'e dönüştürülür.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>MEGX Toksisitesi:</strong> MEGX, lidokainin yaklaşık %80'i kadar antiaritmik ve konvülzan potansiyele sahiptir. Böbrek yetmezliğinde veya 24 saatten uzun süren sistemik IV infüzyonlarda MEGX birikerek santral sinir sistemi toksisitesini (sedasyon, nöbet) presipite eder.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Ekskresyon:</strong> Dozun %90'ından fazlası karaciğerde metabolize edildikten sonra metabolitler halinde idrarla atılır; &lt;%10 değişmemiş ilaç olarak böbreklerden atılır.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          BÖLÜM 4: KLİNİK ENDİKASYONLAR VE UYGULAMA YOLLARI
          ========================================================================= */}
      <section
        id="sec-endikasyon"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Klinik Endikasyonlar &amp; Uygulama Yolları
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Lokal, rejyonel, sistemik IV, kardiyak resüsitasyon ve hava yolu endotrakeal anestezisi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Endikasyon 1: Lokal İnfiltrasyon */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-blue-500" />
                <span>1. Lokal İnfiltrasyon &amp; Cerrahi</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                %0.5 – %2
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Kesi, sütürasyon, biyopsi, dren ve kateter giriş yerleri anestezisi.
              Saf lidokainde maksimum <strong>4.5 mg/kg (≤300 mg)</strong>; adrenalinli formda (1:200.000) <strong>7 mg/kg (≤500 mg)</strong>.
            </p>
          </div>

          {/* Endikasyon 2: Periferik Sinir Blokları */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-sky-500" />
                <span>2. Periferik Sinir &amp; Pleksus Blokları</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-bold">
                %1 – %1.5
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Brakiyal pleksus (aksiller, interskalen, infraklaviküler), femoral, siyatik ve gövde blokları (TAP, ESP).
              Hızlı başlangıç (5–10 dk) ve orta süreli analjezi (1.5–3 saat) sağlar.
            </p>
          </div>

          {/* Endikasyon 3: IVRA (Bier Bloku) */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-indigo-500" />
                <span>3. IVRA (Bier Bloku)</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
                Saf %0.5 (3 mg/kg)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Önkol ve el cerrahisinde çift turnike altında 3 mg/kg (ortalama 30–40 mL) <strong>koruyucusuz saf %0.5 lidokain</strong>.
              Toksisiteyi önlemek için turnike süresi <strong>en az 20–25 dakika</strong> tutulmalıdır.
            </p>
          </div>

          {/* Endikasyon 4: Hava Yolu ve Topikal Anestezi */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-500" />
                <span>4. Topikal &amp; Uyanık Hava Yolu</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold">
                %10 Sprey · %2-4 Nebül
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Awake fiberoptik entübasyon, bronkoskopi ve endoskopide mukoza anestezisi.
              %10 spreyde her 1 puf <strong>10 mg</strong> lidokain içerir; mukozadan emilim hızlı olduğu için puf sayısı kaydedilmelidir.
            </p>
          </div>

          {/* Endikasyon 5: RSI Premedikasyonu (KİB / Bronkospazm) */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-purple-500" />
                <span>5. RSI Premedikasyonu (KİB)</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold">
                1.5 mg/kg IV Bolus
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Laringoskopi ve entübasyona bağlı kafa içi basınç (KİB) artışını ve trakeal reaktiviteye bağlı bronkospazmı küntleştirmek amacıyla indüksiyondan <strong>2–3 dakika önce</strong> 1.5 mg/kg IV uygulanır.
            </p>
          </div>

          {/* Endikasyon 6: Perioperatif Sistemik IV İnfüzyon (Opioid Koruyucu) */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>6. Perioperatif IV Analjezi (Opioid Sparing)</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                1.0 – 2.0 mg/kg/sa
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Major abdominal, kolorektal ve torasik cerrahide multimodal analjezi parçası.
              İndüksiyonda 1–1.5 mg/kg IV yükleme, ardından 1.0–2.0 mg/kg/saat sürekli infüzyon. İleusu azaltır ve derlenmeyi hızlandırır.
            </p>
          </div>

          {/* Endikasyon 7: ACLS Kardiyak Arrest (Refrakter VF / Nabızsız VT) */}
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>7. ACLS: Refrakter VF / Nabızsız VT</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-800 dark:text-rose-200 font-bold">
                1.0 – 1.5 mg/kg IV/IO
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              AHA &amp; ERC Resüsitasyon Kılavuzlarında Amiodaron alternatifi (veya amiodaron yoksa birinci seçenek):
              İlk doz 1.0–1.5 mg/kg; devamında refrakter şoklarda 0.5–0.75 mg/kg ek boluslar (maks kümülatif: 3 mg/kg).
            </p>
          </div>

          {/* Endikasyon 8: Nabızlı Stabil Ventriküler Taşikardi */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>8. Nabızlı Stabil VT &amp; Ventriküler Ektopi</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold">
                1 – 4 mg/dk İnfüzyon
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Hemodinamik stabil geniş QRS taşikardide 1–1.5 mg/kg yavaş IV bolus (2–3 dk), ardından nüksleri önlemek için 1–4 mg/dk (20–50 mcg/kg/dk) sürekli idame infüzyon.
            </p>
          </div>

          {/* Endikasyon 9: Pediatrik Resüsitasyon ve Bloklar */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <span>9. Pediatrik Acil &amp; Lokal Anestezi</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold">
                1 mg/kg Arrest · ≤3-4 mg/kg Lokal
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Pediatrik defibrilasyona dirençli VF/pVT arrestinde 1 mg/kg IV/IO bolus.
              Lokal infiltrasyonda saf lidokain için 3 mg/kg, adrenalinli formda maksimum 5 mg/kg tavan sınır gözetilir.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 5: KAPSAMLI DOZAJ TABLOLARI VE PROTOKOL KILAVUZU
          ========================================================================= */}
      <section
        id="sec-dozaj"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              5. Dozaj Tablosu &amp; Klinik Uygulama Kılavuzu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Endikasyonlara göre güvenli tavan dozları, infüzyon hızları ve solüsyon konsantrasyonları
            </p>
          </div>
        </div>

        {/* Tablo: Temel Klinik Dozlar */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Klinik Endikasyon</th>
                <th className="p-3">Konsantrasyon</th>
                <th className="p-3">Önerilen Doz</th>
                <th className="p-3">Maksimum Güvenli Doz</th>
                <th className="p-3">Klinik Hedef &amp; Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Lokal İnfiltrasyon (Saf)</td>
                <td className="p-3 font-mono">%0.5 – %1</td>
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                  <DoseHover doseText="4.5 mg/kg" equivText="70 kg için ≤ 300 mg (30 mL %1)" explanation="Saf form tavanı 300 mg" />
                </td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400 font-bold">300 mg</td>
                <td className="p-3">Sütürasyon, küçük insizyonlar. Enjeksiyon yanmasını önlemek için 9:1 bikarbonatla tamponlanabilir.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Lokal İnfiltrasyon (+Epinefrin 1:200k)</td>
                <td className="p-3 font-mono">%1 – %2</td>
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <DoseHover doseText="7.0 mg/kg" equivText="70 kg için ≤ 500 mg (50 mL %1)" explanation="Adrenalinli form tavanı 500 mg" />
                </td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">500 mg</td>
                <td className="p-3">Vazokonstriksiyon ile sistemik emilimi geciktirir, etki süresini 2–4 saate uzatır ve cerrahi kanamayı azaltır.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">IVRA (Bier Bloku)</td>
                <td className="p-3 font-mono">Saf %0.5</td>
                <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  <DoseHover doseText="3.0 mg/kg" equivText="70 kg için 210 mg = 42 mL %0.5" explanation="Kesinlikle koruyucusuz ve saf olmalıdır" />
                </td>
                <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400 font-bold">250 mg</td>
                <td className="p-3">Çift kafı turnike gerektirir. LAST riskini önlemek için turnike en az 20–25 dk açılmamalıdır.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">RSI KİB Premedikasyonu</td>
                <td className="p-3 font-mono">%2 Ampul (IV)</td>
                <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">
                  <DoseHover doseText="1.5 mg/kg IV" equivText="70 kg için 100 mg = 5 mL %2" explanation="İndüksiyondan 2-3 dk önce puşe" />
                </td>
                <td className="p-3 font-mono text-purple-600 dark:text-purple-400 font-bold">100 mg</td>
                <td className="p-3">Laringoskopiye bağlı KİB artışı, taşikardi ve bronkospazm refleksini küntleştirir.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Perioperatif IV İnfüzyon (Opioid Sparing)</td>
                <td className="p-3 font-mono">2 mg/mL (SF içi)</td>
                <td className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                  <DoseHover doseText="1.0 – 2.0 mg/kg/sa" equivText="70 kg için 70 – 140 mg/saat (35 – 70 mL/sa)" explanation="1.5 mg/kg IV yükleme sonrası" />
                </td>
                <td className="p-3 font-mono text-teal-600 dark:text-teal-400 font-bold">≤ 200 mg/sa</td>
                <td className="p-3">Kolorektal ve batın cerrahisinde ileusu önler. Cerrahi bitiminde veya PACU'da 24. saate kadar sürdürülebilir.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">ACLS Kardiyak Arrest (VF/pVT)</td>
                <td className="p-3 font-mono">%2 Ampul (IV/IO)</td>
                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">
                  <DoseHover doseText="1.0 – 1.5 mg/kg IV" equivText="İlk doz: 70–100 mg (3.5–5 mL %2). Ek doz: 0.5–0.75 mg/kg" explanation="Amiodaron alternatifi" />
                </td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400 font-bold">3.0 mg/kg (Toplam)</td>
                <td className="p-3">3. şok sonrası refrakter VF/pVT'de uygulanır. Kümülatif maksimum doz 3 mg/kg'dır (örn. 70 kg için 210 mg).</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Nabızlı Stabil VT İdame</td>
                <td className="p-3 font-mono">2 mg/mL veya Saf %2</td>
                <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                  <DoseHover doseText="1 – 4 mg/dk" equivText="60 – 240 mg/saat (2 mg/mL'den 30 – 120 mL/saat)" explanation="20 - 50 mcg/kg/dk karşılığı" />
                </td>
                <td className="p-3 font-mono text-amber-600 dark:text-amber-400 font-bold">4 mg/dk</td>
                <td className="p-3">1–1.5 mg/kg IV yükleme bolusu sonrasında ventriküler ektopi nüksünü önlemek için infüze edilir.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Oral / Mukozal Analjezi (Mukozit / Farenjit)</td>
                <td className="p-3 font-mono">%2 Visköz Oral Solüsyon</td>
                <td className="p-3 font-mono font-bold text-sky-600 dark:text-sky-400">
                  <DoseHover doseText="5 – 15 mL gargara / yutma" equivText="100 – 300 mg lidokain (her 3–4 saatte bir, max 8 doz/gün)" explanation="Yutulacaksa aspirasyon ve faringeal duyu kaybı riski gözetilmelidir" />
                </td>
                <td className="p-3 font-mono text-sky-600 dark:text-sky-400 font-bold">2.4 g / gün</td>
                <td className="p-3">Ağız ve boğaz ağrısı, radyasyon mukoziti. Uygulamadan sonra en az 60 dk yeme/içme yasaktır (faringeal hissizlik ve aspirasyon riski).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 6: İNTERAKTİF HESAPLAYICI VE AKILLI KLİNİK ARAÇLAR
          ========================================================================= */}
      <section
        id="sec-hesaplayici"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark
            ? 'bg-slate-900/95 border-blue-500/40 shadow-2xl shadow-blue-950/30'
            : 'bg-white border-blue-300 shadow-xl shadow-blue-500/10'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  6. İnteraktif Doz &amp; Toksisite Hesaplayıcısı
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-mono">
                  4 Özel Klinik Araç
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Lokal güvenli hacim, ACLS resüsitasyonu, perioperatif infüzyon pompası ve ASRA LAST İntralipid acil kurtarma
              </p>
            </div>
          </div>
        </div>

        {/* Araç Seçim Sekmeleri */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCalcTool('local_infiltration')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'local_infiltration'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Syringe className="w-4 h-4" />
            <span>1. Lokal İnfiltrasyon &amp; Güvenli Doz</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('acls_arrhythmia')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'acls_arrhythmia'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HeartPulse className="w-4 h-4" />
            <span>2. ACLS / Aritmi &amp; RSI Premedikasyon</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('systemic_infusion')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'systemic_infusion'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Perioperatif IV İnfüzyon (Opioid Sparing)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('last_intralipid_rescue')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'last_intralipid_rescue'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>4. LAST (%20 İntralipid Kurtarma)</span>
          </button>
        </div>

        {/* Ortak Hasta Parametreleri Çubuğu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
          <div>
            <label htmlFor={weightInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Hasta Vücut Ağırlığı (kg)
            </label>
            <div className="relative">
              <input
                id={weightInputId}
                type="number"
                min={3}
                max={200}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(3, Math.min(200, Number(e.target.value) || 70)))}
                className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">kg</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Doz hesaplamaları bu ağırlık üzerinden dinamik türetilir.
            </span>
          </div>

          <div>
            <label htmlFor={profileSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Klinik Risk &amp; Hasta Profili
            </label>
            <select
              id={profileSelectId}
              value={patientProfile}
              onChange={(e) => setPatientProfile(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="healthy_adult">Standart Sağlıklı Erişkin (1.0x)</option>
              <option value="elderly_frail">Geriatrik / Kırılgan Hasta (%20 Doz Azaltımı)</option>
              <option value="hepatic_impairment">Karaciğer Yetmezliği (Klerens Düşük, %40 Azaltım)</option>
              <option value="pediatric">Pediatrik Hasta (Sıkı Kilo Bazlı)</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Hepatik yetmezlikte ve yaşlılarda klerens azaldığı için tavan sınır daraltılır.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                Hesaplanan Tavan Güvenlik Sınırı
              </span>
              <span className="text-base font-black font-mono text-slate-900 dark:text-white">
                {calculatedMaxDoseMg.toFixed(1)} mg
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 block">Katsayı</span>
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                {(profileFactor * maxMgPerKg).toFixed(1)} mg/kg
              </span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            MODÜL 1: LOKAL İNFİLTRASYON & GÜVENLİ DOZ HESAPLAYICISI
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'local_infiltration' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={solutionSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Solüsyon Tipi (Vazokonstriktör)
                </label>
                <select
                  id={solutionSelectId}
                  value={solutionType}
                  onChange={(e) => setSolutionType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="plain">Saf Lidokain (4.5 mg/kg; Maks: 300 mg)</option>
                  <option value="with_epinephrine">Adrenalinli 1:200.000 (7.0 mg/kg; Maks: 500 mg)</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Adrenalin emilimi yavaşlatarak izin verilen güvenli dozu artırır.
                </span>
              </div>

              <div>
                <label htmlFor={concSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Solüsyon Konsantrasyonu
                </label>
                <select
                  id={concSelectId}
                  value={concentrationPercent}
                  onChange={(e) => setConcentrationPercent(Number(e.target.value) as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 font-mono"
                >
                  <option value={0.5}>%0.5 Lidokain (5 mg/mL) - Geniş alan infiltrasyonu</option>
                  <option value={1}>%1.0 Lidokain (10 mg/mL) - Standart cerrahi kesi/sütür</option>
                  <option value={2}>%2.0 Lidokain (20 mg/mL) - Bloklar / Küçük odak</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  %0.5 konsantrasyon daha geniş alana güvenli dağılım sağlar.
                </span>
              </div>

              <div>
                <label htmlFor={plannedVolId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enjekte Edilmesi Planlanan Hacim (mL)
                </label>
                <input
                  id={plannedVolId}
                  type="number"
                  min={1}
                  max={200}
                  step={1}
                  value={plannedVolumeMl}
                  onChange={(e) => setPlannedVolumeMl(Math.max(1, Number(e.target.value) || 10))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Uygulanacak lokal hacmi girerek toksisite eşiğini anlık test edin.
                </span>
              </div>
            </div>

            {/* Sonuç Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Maksimum Güvenli Hacim (Enjektör Sınırı)
                </span>
                <div className="text-2xl font-black font-mono text-blue-700 dark:text-blue-300">
                  {maxVolumeMl.toFixed(1)} mL
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                  Seçilen %{concentrationPercent} ({mgPerMl} mg/mL) solüsyondan hastaya güvenle verilebilecek en fazla hacimdir.
                </p>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-1 ${
                  plannedDosePercent > 100
                    ? 'bg-rose-500/15 border-rose-500/50 text-rose-900 dark:text-rose-100'
                    : plannedDosePercent > 80
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-900 dark:text-amber-100'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Planlanan Doz Güvenlik Göstergesi
                  </span>
                  <span className="text-xs font-mono font-bold">
                    %{plannedDosePercent}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono">
                  {plannedDoseMg} mg
                </div>
                <p className="text-[11px] leading-tight">
                  {plannedDosePercent > 100
                    ? 'DİKKAT! Maksimum güvenli dozu aşıyorsunuz! LAST (toksisite) riski yüksektir!'
                    : plannedDosePercent > 80
                    ? 'Uyarı: Maksimum sınıra çok yakınsınız. Daha fazla ekleme yapmayınız.'
                    : 'Güvenli aralıktasınız (Toksik eşiğin oldukça altındadır).'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Ağrısız Tamponlama Oranı (9:1)
                </span>
                <div className="text-base font-black font-mono text-indigo-700 dark:text-indigo-300">
                  {bufferLidoMl} mL Lidokain + {bufferBicarbMl} mL %8.4 NaHCO₃
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                  Planlanan {plannedVolumeMl} mL için 9:1 oranında bikarbonat eklenmesi asit yanmasını ortadan kaldırır ve etki başlangıcını hızlandırır.
                </p>
              </div>
            </div>

            {/* %10 Sprey Hesaplayıcı Eki */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-blue-500" />
                  <span>%10 Lidokain Topikal Sprey (Vemcaine) Güvenlik Kontrolü</span>
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Her 1 puf = tam 10 mg lidokain içerir. Mukozal emilim damar içi enjeksiyona yakın hızdadır.
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div>
                  <label htmlFor={sprayPuffId} className="block text-[10px] font-bold text-slate-500 uppercase">
                    Sıkılan Puf Sayısı
                  </label>
                  <input
                    id={sprayPuffId}
                    type="number"
                    min={1}
                    max={50}
                    value={sprayPuffCount}
                    onChange={(e) => setSprayPuffCount(Math.max(0, Number(e.target.value) || 0))}
                    className="w-20 px-2 py-1 rounded text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">Tüketilen Doz</span>
                  <span className="text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
                    {sprayMg} mg <span className="text-[10px] text-slate-400 font-sans font-normal">(Maks: {maxSprayPuffs} puf)</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODÜL 2: ACLS / ARİTMİ & RSI PREMEDİKASYON HESAPLAYICISI
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'acls_arrhythmia' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={cardiacScenarioId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Kardiyak Senaryo &amp; Endikasyon
                </label>
                <select
                  id={cardiacScenarioId}
                  value={cardiacScenario}
                  onChange={(e) => setCardiacScenario(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="arrest_vf_pvt">ACLS Kardiyak Arrest (Refrakter VF / Nabızsız VT)</option>
                  <option value="pulsed_stable_vt">Hemodinamik Stabil Nabızlı VT (İdame İnfüzyon Dahil)</option>
                  <option value="rsi_premedication">RSI KİB / Bronkospazm Premedikasyonu (Pre-intubation)</option>
                </select>
              </div>

              {cardiacScenario === 'arrest_vf_pvt' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Arrest Uygulama Turu (Doz Kademesi)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setArrestDoseRound('initial')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        arrestDoseRound === 'initial'
                          ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      1. Doz: 1.0 – 1.5 mg/kg IV/IO
                    </button>
                    <button
                      type="button"
                      onClick={() => setArrestDoseRound('repeat')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        arrestDoseRound === 'repeat'
                          ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      Ek Doz: 0.5 – 0.75 mg/kg
                    </button>
                  </div>
                </div>
              )}

              {cardiacScenario === 'pulsed_stable_vt' && (
                <div>
                  <label htmlFor={vtInfusionId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hedef İdame İnfüzyon Hızı (mg/dakika)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id={vtInfusionId}
                      type="range"
                      min={1}
                      max={4}
                      step={0.5}
                      value={vtInfusionMgMin}
                      onChange={(e) => setVtInfusionMgMin(Number(e.target.value))}
                      className="flex-1 accent-blue-600"
                    />
                    <span className="font-mono font-black text-sm text-blue-600 dark:text-blue-400 w-16 text-right">
                      {vtInfusionMgMin} mg/dk
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Literatür aralığı: 1 – 4 mg/dk (20 – 50 mcg/kg/dk karşılığı).
                  </span>
                </div>
              )}
            </div>

            {/* Senaryo Sonuç Detayları */}
            {cardiacScenario === 'arrest_vf_pvt' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    {arrestDoseRound === 'initial' ? '1. Arrest Dozu (1.5 mg/kg)' : 'Ek Refrakter Doz (0.75 mg/kg)'}
                  </span>
                  <div className="text-2xl font-black font-mono text-rose-700 dark:text-rose-300">
                    {arrestDoseRound === 'initial' ? arrestInitialMg.toFixed(1) : arrestRepeatMg.toFixed(1)} mg
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Aritmal %2 (20 mg/mL) ampulden çekilecek net hacim:{' '}
                    <strong>
                      {arrestDoseRound === 'initial' ? arrestInitialMl_2pct.toFixed(1) : arrestRepeatMl_2pct.toFixed(1)} mL
                    </strong>{' '}
                    IV/IO hızlı puşe + 20 mL SF yıkama.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Kümülatif Maksimum Arrest Sınırı
                  </span>
                  <div className="text-2xl font-black font-mono text-blue-700 dark:text-blue-300">
                    {arrestMaxCumulativeMg.toFixed(1)} mg
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    3 mg/kg tavan sınır. Toplamda <strong>{(arrestMaxCumulativeMg / 20).toFixed(1)} mL</strong> %2 Aritmal'i aşmayınız.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Uygulama Zamanı &amp; Şok Protokolü
                  </span>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    3. ve 5. Başarısız Şoktan Sonra
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Amiodaron yokluğunda veya amiodarona dirençli refrakter VF/pVT'de ilk tercihtir.
                  </p>
                </div>
              </div>
            )}

            {cardiacScenario === 'pulsed_stable_vt' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Başlangıç Yükleme Bolusu
                  </span>
                  <div className="text-2xl font-black font-mono text-amber-700 dark:text-amber-300">
                    {arrestInitialMg.toFixed(1)} mg
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    {arrestInitialMl_2pct.toFixed(1)} mL %2 Aritmal 2–3 dakikada yavaşça IV enjekte edilir.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    İdame İnfüzyon Pompa Hızı (2 mg/mL SF)
                  </span>
                  <div className="text-2xl font-black font-mono text-blue-700 dark:text-blue-300">
                    {vtPumpMlHr_2mgml.toFixed(1)} mL/saat
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    500 mL %0.9 NaCl içine 1000 mg (10 ampul %10 veya 50 mL %2) eklenerek hazırlanan solüsyonda saatlik infüzyon debisi.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Saf %2 Enjektör Pompa Hızı (20 mg/mL)
                  </span>
                  <div className="text-2xl font-black font-mono text-indigo-700 dark:text-indigo-300">
                    {vtPumpMlHr_pure20mgml.toFixed(1)} mL/saat
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Seyreltilmeden 50 mL'lik perfüzör enjektörüne çekilen %2 ampul için perfüzör hızı.
                  </p>
                </div>
              </div>
            )}

            {cardiacScenario === 'rsi_premedication' && (
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    RSI KİB &amp; Bronkospazm Premedikasyon Dozu
                  </span>
                  <div className="text-3xl font-black font-mono text-purple-700 dark:text-purple-300">
                    {rsiPremedMg.toFixed(1)} mg{' '}
                    <span className="text-sm font-sans font-bold text-slate-600 dark:text-slate-300">
                      ({rsiPremedMl_2pct.toFixed(1)} mL %2 Aritmal)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Kafa travması, anevrizma kanaması veya ağır astım/KOAH hastalarında entübasyon öncesinde uygulanır.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-purple-500/20 text-xs space-y-1 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-purple-600 dark:text-purple-400 block">Kritik Zamanlama Kuralı:</span>
                  <p>
                    Lidokainin laringeal refleksleri ve santral sempatik çıkışı küntleştirebilmesi için indüksiyon ajanından (örneğin Propofol/Ketamin) tam <strong>2 ila 3 dakika önce</strong> IV bolus olarak verilmesi şarttır. Hemen önce verilirse etkisi yetişmez.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODÜL 3: PERİOPERATİF SİSTEMİK IV İNFÜZYON (OPİOİD KORUYUCU)
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'systemic_infusion' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={ivLoadingId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Yükleme Bolusu (mg/kg)
                </label>
                <input
                  id={ivLoadingId}
                  type="number"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={ivLoadingMgKg}
                  onChange={(e) => setIvLoadingMgKg(Number(e.target.value) || 1.5)}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  İndüksiyonda 10–15 dakikada infüze edilir (Standart: 1.5 mg/kg).
                </span>
              </div>

              <div>
                <label htmlFor={ivMaintId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  İdame İnfüzyon Dozu (mg/kg/saat)
                </label>
                <input
                  id={ivMaintId}
                  type="number"
                  min={0.8}
                  max={2.5}
                  step={0.1}
                  value={ivMaintMgKgHr}
                  onChange={(e) => setIvMaintMgKgHr(Number(e.target.value) || 1.5)}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Kılavuz önerisi: 1.0 – 2.0 mg/kg/saat (ideal kiloya göre hesaplanır).
                </span>
              </div>

              <div>
                <label htmlFor={ivBagId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  İnfüzyon Çözeltisi Hazırlığı
                </label>
                <select
                  id={ivBagId}
                  value={ivBagPrep}
                  onChange={(e) => setIvBagPrep(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                >
                  <option value="500ml_1000mg">500 mL SF + 1000 mg (2.0 mg/mL - Standart Torba)</option>
                  <option value="500ml_2000mg">500 mL SF + 2000 mg (4.0 mg/mL - Konsantre Torba)</option>
                  <option value="pure_2_percent">50 mL Saf %2 Aritmal (20.0 mg/mL - Perfüzör Şırıngası)</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Pompa hızı seçilen konsantrasyona göre anında güncellenir.
                </span>
              </div>
            </div>

            {/* Sonuç Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  İndüksiyon Yükleme Bolusu
                </span>
                <div className="text-2xl font-black font-mono text-teal-700 dark:text-teal-300">
                  {ivLoadTotalMg} mg
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                  %2 Aritmal'den <strong>{ivLoadMl_2pct} mL</strong> çekilerek 100 mL SF içinde 10-15 dakikada yavaşça infüze edilir (Ani IV puşeden kaçının).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/15 border border-blue-500/40 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  İdame İnfüzyon Pompası Hızı
                </span>
                <div className="text-3xl font-black font-mono text-blue-700 dark:text-blue-300">
                  {ivPumpRateMlHr} mL/saat
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-mono">
                  {ivMaintTotalMgHr} mg/saat akış sağlar ({ivBagConcMgMl} mg/mL konsantrasyon).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  24 Saatlik Kümülatif Doz
                </span>
                <div className="text-2xl font-black font-mono text-slate-800 dark:text-slate-200">
                  {iv24HourCumulativeMg} mg
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  İnfüzyon genellikle cerrahi bitiminde veya PACU'da (maksimum 24–48 saat) sonlandırılır.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODÜL 4: ASRA LAST (%20 İNTRALİPİD ACİL KURTARMA PROTOKOLÜ)
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'last_intralipid_rescue' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-rose-700 dark:text-rose-300 block text-sm">
                  ASRA (American Society of Regional Anesthesia) LAST Kurtarma Algoritması
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Lokal anestezik sistemik toksisitesi geliştiğinde (bilinç kaybı, inatçı nöbetler, ventriküler aritmiler, kardiyak arrest) derhal hava yolu güvenliği sağlanmalı ve <strong>%20 Lipid Emülsiyonu (İntralipid)</strong> başlanmalıdır.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Uygulanan / Planlanan Bolus Sayısı
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setLastRefractoryArrests(num)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        lastRefractoryArrests === num
                          ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {num === 1 ? '1. Bolus (İlk)' : `${num}. Bolus (Refrakter)`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  İnfüzyon Hızı Kademesi
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLastInfusionSpeed('standard')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      lastInfusionSpeed === 'standard'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    Standart: 0.25 mL/kg/dk (15 mL/kg/sa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLastInfusionSpeed('double_escalated')}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      lastInfusionSpeed === 'double_escalated'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    İnatçı Hipotansiyon: 0.5 mL/kg/dk
                  </button>
                </div>
              </div>
            </div>

            {/* İntralipid Sonuç Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                  1. İntralipid Bolusu (1.5 mL/kg)
                </span>
                <div className="text-3xl font-black font-mono text-rose-800 dark:text-rose-200">
                  {intralipidBolusMl} mL
                </div>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-tight">
                  1 dakikada IV hızlı puşe. 70 kg için ortalama 100 mL torba puşelenir.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                  Sürekli İnfüzyon Hızı
                </span>
                <div className="text-3xl font-black font-mono text-rose-800 dark:text-rose-200">
                  {intralipidInfusionRateMlHr} mL/sa
                </div>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-tight font-mono">
                  = {intralipidInfusionRateMlMin} mL/dakika
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Toplam Bolus Hacmi ({lastRefractoryArrests}x)
                </span>
                <div className="text-2xl font-black font-mono text-slate-800 dark:text-slate-200">
                  {totalBolusesMl} mL
                </div>
                <p className="text-[10.5px] text-slate-500 leading-tight">
                  Sirkülasyon düzelene kadar en fazla 2 kez daha bolus tekrarlanabilir.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Tavan Sınır (12 mL/kg)
                </span>
                <div className="text-2xl font-black font-mono text-amber-800 dark:text-amber-300">
                  {intralipidMaxCeilingMl} mL
                </div>
                <p className="text-[10.5px] text-slate-600 dark:text-slate-300 leading-tight">
                  Kalan Güvenlik Payı: <strong>{remainingSafetyBudgetMl} mL</strong>
                </p>
              </div>
            </div>

            {/* ASRA LAST Kritik Resüsitasyon Kuralları */}
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-rose-500/40 text-xs space-y-2">
              <span className="font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wide">
                <AlertOctagon className="w-4 h-4" />
                <span>LAST Resüsitasyonunda Kesinlikle Kaçınılması Gereken İlaçlar:</span>
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300 list-disc list-inside">
                <li>
                  <strong>Vazopressin KULLANMAYIN:</strong> Miyokardiyal hasarı artırır ve akciğer ödemini tetikler.
                </li>
                <li>
                  <strong>Kalsiyum Kanal Blokerleri ve Beta-Blokerler KONTRENDİKE:</strong> Miyokard depresyonunu derinleştirir.
                </li>
                <li>
                  <strong>Yüksek Doz Adrenalin VERMEYİN:</strong> Standart 1 mg arrest dozu yerine <strong>küçük dozlar (&lt;1 mcg/kg bolus)</strong> tercih edilmelidir; aritmileri şiddetlendirir ve lipid etkinliğini bozar.
                </li>
                <li>
                  <strong>Lokal Anestezik ve Diğer Antiaritmikleri KESİN:</strong> Propafenon, prokainamid gibi diğer sodyum kanal blokerleri asla eklenmemelidir.
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          BÖLÜM 7: HAZIRLAMA, SEYRELTME VE STABİLİTE (TAMPONLAMA)
          ========================================================================= */}
      <section
        id="sec-tamponlama"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              7. Hazırlama, Seyreltme &amp; Tamponlama Tekniği
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ticari ampul formları, tamponlama kimyası ve infüzyon çözeltisi stabilitesi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Türkiye Piyasa Formları</span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>• <strong>Aritmal %2:</strong> 100 mg / 5 mL ampul (20 mg/mL)</li>
              <li>• <strong>Aritmal %10:</strong> 500 mg / 5 mL ampul (100 mg/mL - Yalnızca IV infüzyon seyreltmesi için!)</li>
              <li>• <strong>Jetokain Ampul:</strong> 40 mg Lidokain + 0.025 mg Epinefrin (2 mL)</li>
              <li>• <strong>Vemcaine %10 Sprey:</strong> 50 mL şişe (1 puf = 10 mg)</li>
              <li>• <strong>Anestol Pomad %5:</strong> 30 g tüp (topikal deri)</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-2">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">
              Tamponlama Protokolü (Alkalinizasyon)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Lidokain hidroklorür solüsyonunun pH'sı 5.0–6.5'tir (adrenalinli formlarda koruyucu sodyum metabisülfit nedeniyle pH 3.5–4.5'e kadar düşer).
              Enjeksiyon yanmasını önlemek ve etkiyi 2 dakikanın altına indirmek için:
            </p>
            <div className="p-2 rounded bg-white/60 dark:bg-slate-900/60 font-mono font-bold text-blue-800 dark:text-blue-200 text-center">
              9 mL %1 Lidokain + 1 mL %8.4 NaHCO₃
            </div>
            <p className="text-[10px] text-slate-500">
              Dikkat: 10:1 oranından fazla bikarbonat eklenirse lidokain bazı çöker ve solüsyon bulanıklaşır (bulanık solüsyon kesinlikle enjekte edilmez).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Seyreltici Uyumluluğu &amp; Saklama</span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>• %0.9 NaCl ve %5 Dekstroz ile tam geçimlidir.</li>
              <li>• Oda sıcaklığında (20–25°C) ışıktan korunarak saklanır.</li>
              <li>• Adrenalinli solüsyonlar ısı ve ışıktan korunmalıdır; dondurulmamalıdır.</li>
              <li>• %20 İntralipid acil arabasında oda sıcaklığında hazır bekletilmelidir.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 8: KONTRENDİKASYONLAR VE YÜKSEK RİSK DURUMLARI
          ========================================================================= */}
      <section
        id="sec-kontrendikasyon"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              8. Kontrendikasyonlar &amp; Yüksek Risk Durumları
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kardiyovasküler ileti defektleri, anatomik uç organlar ve genetik bozukluklar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
            <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 uppercase tracking-wide">
              <Skull className="w-4 h-4 text-rose-600" />
              <span>Mutlak Kontrendikasyonlar</span>
            </span>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Ağır AV Bloklar (2. veya 3. Derece AV Blok):</strong> Kalp pili (pacemaker) olmayan tam bloklu hastalarda SA ve AV nodal kaçış ritmini baskılayarak asistoliye yol açabilir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Bifasiküler &amp; Trifasiküler Bloklar:</strong> İntraventriküler iletinin durması riski.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Amid Tipi Lokal Anestezik Alerjisi:</strong> Çok nadirdir (genellikle metilparaben koruyucuya bağlıdır), gerçek alerjide mutlak kontrendikedir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Akut Porfiria:</strong> Porfirin sentezini indükleyerek ölümcül nöro-visseral atakları tetikleyebilir.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Relatif Kontrendikasyonlar &amp; Özel Uyarılar</span>
            </span>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Uç Organlarda Epinefrinli Form Yasağı:</strong> Parmaklar, ayak parmakları, penis ucu, burun ucu ve kulak memesi gibi terminal kan dolaşımına sahip organlara asla adrenalinli form enjekte edilmez (iskemik gangren riski).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Ağır Karaciğer Yetmezliği:</strong> Klerens %60–70 azalır; tekrarlayan veya infüzyon dozlarında doz %50 oranında düşürülmelidir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Ciddi Kalp Yetmezliği &amp; Düşük Debi:</strong> Hepatik perfüzyon düştüğü için lidokain klerensi azalır ve toksisite riski katlanır.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Methemoglobinemi Riski:</strong> Lidokain metaboliti o-toluidin türevi değildir fakat çok yüksek dozlarda enzim yetersizliği olanlarda methemoglobinemiye zemin hazırlayabilir.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 9: TOKSİSİTE (LAST - LOKAL ANESTEZİK SİSTEMİK TOKSİSİTESİ)
          ========================================================================= */}
      <section
        id="sec-last"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              9. LAST (Lokal Anestezik Sistemik Toksisitesi) Aşamaları
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Plazma konsantrasyonuna bağlı progresif MSS eksitasyonu ve kardiyovasküler kollaps kademeleri
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-mono">
              1 – 5 mcg/mL
            </span>
            <span className="font-bold text-slate-900 dark:text-white block">Terapötik Aralık</span>
            <p className="text-slate-500">
              Antiaritmik ve sistemik analjezik etki. Toksisite semptomu görülmez; hafif sedasyon ve analjezi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1.5">
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block font-mono">
              5 – 10 mcg/mL
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300 block">Erken MSS Uyarısı</span>
            <p className="text-slate-600 dark:text-slate-300">
              Dilde ve dudakta uyuşma, <strong>ağızda metalik tat</strong>, kulak çınlaması (tinnitus), baş dönmesi, geveleyerek konuşma, nistagmus, anksiyete.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block font-mono">
              10 – 15 mcg/mL
            </span>
            <span className="font-bold text-amber-800 dark:text-amber-200 block">MSS Eksitasyonu &amp; Depresyon</span>
            <p className="text-slate-600 dark:text-slate-300">
              Kortikal inhibitör yolların felci: <strong>Jeneralize tonik-klonik nöbetler</strong>, bilinç kaybı, stupor, koma ve solunum durması (apne).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 space-y-1.5">
            <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block font-mono">
              &gt; 15 – 25 mcg/mL
            </span>
            <span className="font-bold text-rose-800 dark:text-rose-200 block">Kardiyovasküler Kollaps</span>
            <p className="text-slate-700 dark:text-slate-200">
              Miyokard depresyonu, PR ve QRS genişlemesi, refrakter hipotansiyon, şiddetli bradikardi, VT/VF ve asistoli.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 10: KRİTİK KLİNİK İPUÇLARI VE "PEARL"LER
          ========================================================================= */}
      {/* =========================================================================
          BÖLÜM 10: GEBELİK VE LAKTASYON KILAVUZU
          ========================================================================= */}
      <section
        id="sec-pregnancy"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-pink-500/15 text-pink-600 dark:text-pink-400">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              10. Gebelik ve Laktasyon Kılavuzu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Obstetrik anestezi, plasental transfer, fetal iyon tuzağı ve emzirme güvenliği
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>FDA Gebelik Kategorisi B</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Hayvan çalışmalarında teratojenite veya fetal zarar gösterilmemiştir. İnsanlarda lokal infiltrasyon, periferik blok ve epidural/spinal obstetrik uygulamalarda uzun yıllara dayanan güvenlik profiline sahiptir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Fetal İyon Tuzağı (Ion Trapping)</span>
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Lidokain zayıf bazik bir moleküldür (pKa 7.9) ve plasentayı hızla geçer. Fetal asidoz durumunda (ör. fetal distres, asfiksi), fötus tarafında molekül iyonize forma döner ve maternal dolaşıma geri dönemez (iyon tuzağı). Fetal asidozda yüksek maternal dozlardan kaçınılmalıdır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Syringe className="w-4 h-4" />
              <span>Obstetrik &amp; Sezaryen Anestezisi</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Epidural doğum analjezisinde veya acil sezaryen cerrahi bloğu genişletmesinde (%2 Lidokain + Adrenalin + Bikarbonat) hızlı başlangıç için güvenle kullanılır. Paraservikal blokta ise fetal bradikardi riski nedeniyle tercih edilmemelidir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <Droplet className="w-4 h-4" />
              <span>Laktasyon &amp; Emzirme Güvenliği</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Anne sütüne geçiş düşüktür (Süt/Plazma oranı ~0.4; Relatif İnfant Dozu [RID] &lt; %1.5). Maternal lokal veya kısa süreli sistemik uygulamadan sonra sütü sağmaya ("pump and dump") gerek yoktur; anne bebeği güvenle emzirebilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>Neonatal Toksisite İzlemi</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yüksek maternal dozlarda veya acil doğum öncesi boluslarda yenidoğanda geçici hipotoni, apne ve bradikardi görülebilir. Doğumda Apgar skoru ve yenidoğan vital parametreleri yakından izlenmelidir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4" />
              <span>Sistemik IV İnfüzyonda Önlem</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Opioid koruyucu sürekli IV lidokain infüzyonu gebelikte yeterli güvenlik kanıtı bulunmadığından rutin obstetrik analjezide önerilmez. Rejyonel nöroaksiyel teknikler her zaman birinci basamaktır.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 11: ÖZEL POPÜLASYONLAR VE DOZ AYARLARI
          ========================================================================= */}
      <section
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              11. Özel Popülasyonlar &amp; Doz Modifikasyonları
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pediatri, geriatri, karaciğer yetmezliği, gebelik ve böbrek fonksiyonları
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Karaciğer Yetmezliği</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Lidokain %90 oranında hepatik CYP1A2 ve CYP3A4 enzimleri ile elimine edilir.
              Siroz ve karaciğer yetmezliğinde yarı ömür 1.5 saatten 5 saate uzar; klerens %60 azalır. Sürekli infüzyon dozu <strong>%40–50 azaltılmalıdır</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Geriatri (Yaşlı Hastalar)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Azalmış hepatik kan akımı ve düşük kardiyak debi nedeniyle klerens düşer. MSS toksisite eşiği daha düşüktür.
              İnfüzyon ve maksimum lokal dozlar <strong>%20–25 oranında azaltılmalıdır</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Gebelik &amp; Laktasyon</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              FDA Kategori B. Plasentayı kolayca geçer. Fetal asidoz durumunda "iyon tuzağı" (ion trapping) gelişerek fetal dolaşımda lidokain birikebilir.
              Laktasyonda anne sütüne çok düşük oranlarda geçer, emzirmeye genellikle engel değildir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Pediatrik Kullanım</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Lokal infiltrasyonda saf form için <strong>3 mg/kg</strong>, adrenalinli form için maksimum <strong>4–5 mg/kg</strong> aşılmamalıdır.
              ACLS arrestinde 1 mg/kg IV/IO uygulanır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Böbrek Yetmezliği</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Lidokainin kendisi karaciğerde metabolize olsa da aktif metabolitleri (MEGX ve GX) böbrekle atılır.
              Ağır KBY olgularında uzun süreli infüzyonda bu metabolitler birikerek santral toksisiteye (ajitasyon, nöbet) katkıda bulunabilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Obez Hastalar</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Lidokain orta derecede lipofiliktir. Toksisiteden kaçınmak için maksimum lokal ve sürekli IV infüzyon dozları <strong>İdeal Vücut Ağırlığı (İVA)</strong> üzerinden hesaplanmalıdır.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 12: FARMAKOKİNETİK VE DİNAMİK İNTERAKTİF SİMÜLATÖR
          ========================================================================= */}
      <section
        className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                12. Farmakokinetik &amp; Doku pH İnteraktif Simülatörü
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                pKa 7.9 kimyası: Doku pH'sının non-iyonize lipofilik fraksiyon ve etki hızına etkisi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPkOpen(!pkOpen)}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            <span>{pkOpen ? 'Simülatörü Gizle' : 'Simülatörü Genişlet'}</span>
            {pkOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {pkOpen && (
          <div className="space-y-4 pt-2 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Dağılım Hacmi (Vd)</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
                  1.1 – 1.5 L/kg
                </span>
                <span className="text-[10px] text-slate-500">Geniş doku penetrasyonu</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Yarılanma Ömrü (t½)</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
                  1.5 – 2.0 Saat
                </span>
                <span className="text-[10px] text-slate-500">Sirozda 4–5 saate uzar</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Klirens &amp; Ekstraksiyon</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
                  10 – 12 mL/kg/dk
                </span>
                <span className="text-[10px] text-slate-500">Hepatik ekstraksiyon oranı: 0.7</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Plazma Protein Bağlanması</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
                  %65
                </span>
                <span className="text-[10px] text-slate-500">Alfa-1 asit glikoprotein (AAG)</span>
              </div>
            </div>

            {/* pH Henderson-Hasselbalch Tablosu */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2">
              <span className="font-bold text-blue-700 dark:text-blue-300 block">
                Doku pH'sına Göre Aktif Non-İyonize (Membrandan Geçebilen) Baz Fraksiyonu:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <span className="block text-[10px] text-rose-500 font-bold uppercase">Enfeksiyon / Abse İçi (pH 6.0)</span>
                  <span className="text-lg font-black text-rose-600 block mt-1">%1.2 Non-İyonize</span>
                  <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Membranı geçemez; blok yetersiz!</span>
                </div>

                <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <span className="block text-[10px] text-blue-500 font-bold uppercase">Fizyolojik Doku (pH 7.4)</span>
                  <span className="text-lg font-black text-blue-600 block mt-1">%24.0 Non-İyonize</span>
                  <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Standart başlangıç süresi (2-5 dk)</span>
                </div>

                <div className="p-3 rounded-lg bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                  <span className="block text-[10px] text-emerald-500 font-bold uppercase">Tamponlanmış Çözelti (pH 7.8)</span>
                  <span className="text-lg font-black text-emerald-600 block mt-1">%44.3 Non-İyonize</span>
                  <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Ultra hızlı başlangıç (&lt;60 sn); ağrısız!</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          BÖLÜM 13: KANITA DAYALI KAYNAKÇA VE KILAVUZLAR
          ========================================================================= */}
      <section
        id="sec-kaynaklar"
        className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              13. Kanıta Dayalı Kaynakça &amp; Klinik Kılavuzlar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ASRA, AHA, ERC, ASA ve Cochrane uluslararası referansları
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                ASRA LAST Checklist 2020:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Neal JM, et al. The ASRA Checklist for Managing Local Anesthetic Systemic Toxicity: 2020 Version. Reg Anesth Pain Med. 2021;46(1):81-86.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                AHA ACLS Guidelines 2020 &amp; Update:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Panchal AR, et al. 2020 American Heart Association Guidelines for CPR and Emergency Cardiovascular Care: Adult Basic and Advanced Life Support. Circulation. 2020;142:S366–S468.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Cochrane Review: Perioperative Systemic Lidocaine:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Weibel S, et al. Continuous intravenous perioperative lidocaine infusion for postoperative pain and recovery in adults. Cochrane Database Syst Rev. 2018;6(6):CD009642.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                ERC Resuscitation Guidelines:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Soar J, et al. European Resuscitation Council Guidelines 2021: Adult advanced life support. Resuscitation. 2021;161:115-151.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>
        </div>
      </section>
    </div>
  );
};
