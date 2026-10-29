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
  AlertOctagon
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

interface DoseHoverProps {
  mgText: string;
  mcgText: string;
  explanation?: string;
  className?: string;
  badge?: boolean;
}

export const DoseHover: React.FC<DoseHoverProps> = ({
  mgText,
  mcgText,
  explanation = '1 mg/kg/saat = 16.67 mcg/kg/dk',
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
      title={`${mgText} = ${mcgText} (${explanation})`}
    >
      <span
        className={`transition-colors font-mono ${
          badge
            ? 'px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30'
            : 'font-semibold underline decoration-dotted decoration-teal-500 underline-offset-4 hover:text-teal-600 dark:hover:text-teal-400'
        }`}
      >
        {mgText}
      </span>
      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-all font-semibold">
        mcg?
      </span>

      {/* Popover Hover Balonu */}
      {isOpen && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 rounded-xl text-left shadow-2xl border z-50 pointer-events-none transition-all duration-150 bg-slate-900 border-teal-500/60 text-slate-100 dark:bg-slate-950 dark:border-teal-400 shadow-teal-950/60 animate-in fade-in zoom-in-95"
        >
          <span className="block text-[9.5px] font-bold uppercase tracking-wider text-teal-400">
            Doz Karşılığı (mcg/kg/dk):
          </span>
          <span className="block text-xs font-black font-mono text-white mt-0.5">
            {mcgText}
          </span>
          <span className="block text-[9px] text-slate-400 mt-0.5 font-sans">
            Formül: {explanation}
          </span>
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-950" />
        </span>
      )}
    </span>
  );
};

type ActiveCalcTool = 'continuous_tiva' | 'induction_rsi' | 'procedural_sedation' | 'pris_monitor' | 'ponv_rescue';

export const PropofolProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKTİF HESAPLAYICI MODÜL SEÇİCİ ---
  const [activeCalcTool, setActiveCalcTool] = useState<ActiveCalcTool>('continuous_tiva');

  // --- GENEL HASTA VE DOZ STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [patientProfile, setPatientProfile] = useState<'healthy_adult' | 'elderly_frail' | 'pediatric' | 'morbid_obese'>('healthy_adult');
  const [obeseWeightBasis, setObeseWeightBasis] = useState<'tbw' | 'lbw'>('lbw'); // Obezitede TBW vs LBW

  // 1. Sürekli İnfüzyon & TIVA Parametreleri
  const [emulsionType, setEmulsionType] = useState<'propofol_1' | 'propofol_2'>('propofol_1'); // %1 (10 mg/mL) vs %2 (20 mg/mL)
  const [indication, setIndication] = useState<
    | 'tiva_maintenance'
    | 'icu_sedation'
    | 'procedural_maint'
    | 'status_epilepticus'
    | 'custom'
  >('icu_sedation');
  const [infusionUnit, setInfusionUnit] = useState<'mg_kg_hr' | 'mcg_kg_min'>('mg_kg_hr');
  const [targetDoseMgKgHr, setTargetDoseMgKgHr] = useState<number>(2.0); // mg/kg/saat
  const [targetDoseMcgKgMin, setTargetDoseMcgKgMin] = useState<number>(33.3); // mcg/kg/dk
  const [plannedDurationHours, setPlannedDurationHours] = useState<number>(24); // saat (lipid hesabı ve PRIS takibi için)

  // 2. Anestezi İndüksiyon & RSI Parametreleri
  const [inductionDoseMgKg, setInductionDoseMgKg] = useState<number>(2.0); // mg/kg
  const [applyLidocainePretreatment, setApplyLidocainePretreatment] = useState<boolean>(true);

  // 3. Prosedürel Sedasyon (PSA / MAC) Parametreleri
  const [psaProcedureType, setPsaProcedureType] = useState<'endoscopy' | 'cardioversion' | 'interventional_rad'>('endoscopy');
  const [psaInitialDoseMgKg, setPsaInitialDoseMgKg] = useState<number>(0.75); // mg/kg
  const [psaRescueBolusMg, setPsaRescueBolusMg] = useState<number>(20); // mg

  // 4. PRIS (Propofol İnfüzyon Sendromu) Parametreleri
  const [prisInfusionRate, setPrisInfusionRate] = useState<number>(3.5); // mg/kg/saat
  const [prisDurationHours, setPrisDurationHours] = useState<number>(36); // saat
  const [hasLacticAcidosis, setHasLacticAcidosis] = useState<boolean>(false);
  const [hasHypertriglyceridemia, setHasHypertriglyceridemia] = useState<boolean>(false);
  const [hasRhabdomyolysis, setHasRhabdomyolysis] = useState<boolean>(false);
  const [hasBrugadaPattern, setHasBrugadaPattern] = useState<boolean>(false);

  // 5. PONV Kurtarma Parametreleri
  const [ponvBolusMg, setPonvBolusMg] = useState<number>(15); // mg

  // UI Durumları
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Benzersiz ID'ler
  const weightInputId = useId();
  const profileSelectId = useId();
  const emulsionSelectId = useId();
  const indicationSelectId = useId();
  const doseInputId = useId();
  const durationInputId = useId();
  const inductionDoseInputId = useId();
  const psaInitialInputId = useId();
  const prisRateInputId = useId();
  const prisDurationInputId = useId();

  // Konsantrasyon (mg/mL)
  const concentrationMgMl = emulsionType === 'propofol_1' ? 10 : 20;

  // Efektif Ağırlık (Obez hastada indüksiyonda LBW vs TBW seçimi)
  const effectiveWeightKg = weightKg;

  // --- DÖNÜŞÜM & HESAPLAMALAR ---
  // 1 mg/kg/saat = 1000 / 60 ≈ 16.6667 mcg/kg/dk
  // 1 mcg/kg/dk = 60 / 1000 = 0.06 mg/kg/saat
  const calculatedDoseMgKgHr = infusionUnit === 'mg_kg_hr' 
    ? targetDoseMgKgHr 
    : targetDoseMcgKgMin * 0.06;

  const calculatedDoseMcgKgMin = infusionUnit === 'mcg_kg_min'
    ? targetDoseMcgKgMin
    : targetDoseMgKgHr * (1000 / 60);

  // Sürekli İnfüzyon Hızı (mL/saat)
  // Debi (mL/saat) = [Doz (mg/kg/saat) * Ağırlık (kg)] / Konsantrasyon (mg/mL)
  const hourlyDoseMg = calculatedDoseMgKgHr * effectiveWeightKg;
  const infusionRateMlHr = hourlyDoseMg / concentrationMgMl;
  const dropsPerMin = infusionRateMlHr * (20 / 60); // Standart 20 damla/mL infüzyon seti

  // 24 Saatlik Sıvı ve Lipid Kalori Yükü
  // 1 mL propofol emülsiyonu = 1.1 kcal enerji sağlar (0.1 g yağ / mL)
  const dailyVolumeMl = infusionRateMlHr * 24;
  const dailyCaloriesKcal = dailyVolumeMl * 1.1;
  const dailyFatGrams = dailyVolumeMl * 0.1;

  // İndüksiyon Bolus Hesabı
  const inductionMg = inductionDoseMgKg * effectiveWeightKg;
  const inductionMl = inductionMg / concentrationMgMl;

  // Lidokain Enjeksiyon Ağrısı Koruma Dozu (0.5 mg/kg veya sabit 20-40 mg)
  const lidocaineDoseMg = Math.min(40, Math.max(20, Math.round(effectiveWeightKg * 0.5)));
  const lidocaineMl2Percent = lidocaineDoseMg / 20; // %2 Lidokain (20 mg/mL)

  // PRIS Risk Hesabı
  const prisRateRisk = prisInfusionRate >= 5.0 ? 'critical' : prisInfusionRate >= 4.0 ? 'high' : prisInfusionRate >= 3.0 ? 'moderate' : 'low';
  const prisDurationRisk = prisDurationHours >= 48 ? 'high' : prisDurationHours >= 24 ? 'moderate' : 'low';
  const warningCount = (hasLacticAcidosis ? 1 : 0) + (hasHypertriglyceridemia ? 1 : 0) + (hasRhabdomyolysis ? 1 : 0) + (hasBrugadaPattern ? 1 : 0);

  // Endikasyon Presetleri
  const INDICATION_PRESETS = {
    icu_sedation: {
      title: 'Yoğun Bakım Ünitesi (YBÜ) Sedasyonu',
      target: 'Mekanik ventilasyonlu hastalarda hafif-orta kooperatif sedasyon (RASS -1 ila -2)',
      route: 'Sürekli IV İnfüzyon (Mikro-pompa)',
      defaultMgKgHr: 1.5,
      minMgKgHr: 0.3,
      maxMgKgHr: 4.0,
      note: 'Daima en düşük etkin doz hedeflenir. PRIS riski nedeniyle >4 mg/kg/saat ve >48 saat kesintisiz infüzyondan kaçınılmalıdır. Günlük SAT (sedasyon tatili) uygulanmalıdır.'
    },
    tiva_maintenance: {
      title: 'Genel Anestezi İdamesi (TIVA)',
      target: 'Cerrahi operasyon süresince hipnoz ve bilinç kaybının sürdürülmesi (BIS/Entropi hedefli: 40-60)',
      route: 'Sürekli IV İnfüzyon / TCI (Marsh/Schnider)',
      defaultMgKgHr: 6.0,
      minMgKgHr: 4.0,
      maxMgKgHr: 10.0,
      note: 'Opioid (remifentanil/fentanil) infüzyonu ile kombine edilir. Cerrahi uyaran düzeyine göre 4-10 mg/kg/saat (67-167 mcg/kg/dk) arasında titre edilir.'
    },
    procedural_maint: {
      title: 'Prosedürel Sedasyon İdamesi (MAC)',
      target: 'Endoskopi, ERCP, bronkoskopi veya girişimsel işlemlerde konfor ve hareketsizlik sağlama',
      route: 'Hafif Sürekli İnfüzyon / Aralıklı Kurtarma Bolusu',
      defaultMgKgHr: 2.5,
      minMgKgHr: 1.5,
      maxMgKgHr: 4.5,
      note: 'Hastanın spontan solunumu ve havayolu refleksleri korunacak şekilde titre edilir. Sürekli kapnografi ve pulse oksimetre zorunludur.'
    },
    status_epilepticus: {
      title: 'Refrakter Status Epileptikus Kontrolü',
      target: '3. Basamak antiepileptik tedavi; sürekli EEG monitörizasyonunda burst-supresyon paterni sağlama',
      route: 'Yükleme Bolusu + Yüksek Doz İnfüzyon',
      defaultMgKgHr: 4.0,
      minMgKgHr: 2.0,
      maxMgKgHr: 8.0,
      note: 'Yüksek doz ve uzayan infüzyon nedeniyle PRIS, kardiyak kollaps ve rabdomiyoliz riski fırlar! Sıkı laktat, CK, trigliserit ve kan gazı takibi hayati önem taşır.'
    },
    custom: {
      title: 'Özel / Titre Edilen Doz Rejimi',
      target: 'Klinisyenin belirlediği özel hedef doza göre hesaplama',
      route: 'IV İnfüzyon / Titrasyon',
      defaultMgKgHr: targetDoseMgKgHr,
      minMgKgHr: 0.1,
      maxMgKgHr: 12.0,
      note: 'Belirlenen doz protokolü ve klinik endikasyon gereklerine göre yakın takip sürdürülmelidir.'
    }
  };

  const handleIndicationChange = (ind: typeof indication) => {
    setIndication(ind);
    if (ind !== 'custom') {
      const preset = INDICATION_PRESETS[ind];
      setTargetDoseMgKgHr(preset.defaultMgKgHr);
      setTargetDoseMcgKgMin(Number((preset.defaultMgKgHr * (1000 / 60)).toFixed(1)));
    }
  };

  const handleMgKgHrChange = (val: number) => {
    setTargetDoseMgKgHr(val);
    setTargetDoseMcgKgMin(Number((val * (1000 / 60)).toFixed(1)));
  };

  const handleMcgKgMinChange = (val: number) => {
    setTargetDoseMcgKgMin(val);
    setTargetDoseMgKgHr(Number((val * 0.06).toFixed(2)));
  };

  return (
    <div className="space-y-6">
      {/* 1. ÜST BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI (EN YUKARIDA) */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
            : 'bg-white border-slate-200 text-slate-900 shadow-md'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
              <Syringe className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  GABA-A Allosterik Modülatörü
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                  Sedatif / Genel Anestezik · High-Alert
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                  ATC: N01AX10
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  PROPOFOL FRESENIUS · DIPRIVAN · PROPOFOL-LIPURO · PREDAPOL
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
                Propofol (PROPOFOL FRESENIUS, DIPRIVAN, PROPOFOL-LIPURO, PREDAPOL)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Kısa etkili intravenöz hipnotik ajan; anestezi indüksiyonu ve idamesi (TIVA), mekanik ventilatörlü yoğun bakım sedasyonu, prosedürel sedasyon ve PRIS / lipid kalori yönetimi.
              </p>
            </div>
          </div>
        </div>

        {/* Etki Mekanizması & Farmakolojik Kategori Detay Kutusu */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-teal-50/50 border-teal-100'}`}>
            <div className="flex items-center gap-2 text-teal-700 dark:text-teal-300 font-semibold text-xs sm:text-sm mb-1.5">
              <Brain className="w-4 h-4" />
              <span>GABA-A Reseptör Allosterik Modülasyonu</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              GABA-A reseptör kompleksinin β-alt birimine doğrudan bağlanarak inhibitör nörotransmiter GABA'nın afinitesini artırır. Klorür kanalının açık kalma süresini uzatır, nöronal hiperpolarizasyona yol açarak doza bağımlı derin hipnoz, amnezi ve anksiyoliz meydana getirir. Yüksek dozlarda doğrudan GABA agonizmi de yapabilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-cyan-50/50 border-cyan-100'}`}>
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 font-semibold text-xs sm:text-sm mb-1.5">
              <Activity className="w-4 h-4" />
              <span>Serebral Metabolizma & NMDA İnhibisyonu</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Beyin oksijen metabolizma hızını (CMRO₂) ve serebral kan akımını (CBF) eşzamanlı düşürerek kafa içi basıncı (KİBAS) etkin bir şekilde azaltır. Kortikal NMDA reseptörlerini zayıfça inhibe eder ve epileptiform deşarjları baskılar (refrakter status epileptikusta etkilidir).
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-amber-50/50 border-amber-100'}`}>
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-semibold text-xs sm:text-sm mb-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>İntrinsik Analjezik Etkisi Yoktur!</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Propofol saf bir sedatif-hipnotiktir; <strong>hiçbir nosiseptif analjezik etkisi yoktur</strong>. Ağrılı cerrahi uyaranlara karşı otonomik deşarjı ve taşikardiyi engellemek için mutlaka opioidler (remifentanil, fentanil), rejyonal bloklar veya analjeziklerle kombine edilmelidir.
            </p>
          </div>
        </div>
      </div>

      {/* 2. FARMAKOKİNETİK PROFİLİ (AKORDİYON: TIKLAYINCA AÇILIR) */}
      <div
        className={`rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen(!pkOpen)}
          className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer transition-colors hover:bg-slate-500/5 rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  Propofol Farmakokinetiği (PK/PD) & Dağılım Modelleri
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pkOpen ? 'Gizle' : 'Detayları Gör'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Başlangıç süresi, pik etki, dağılım hacmi, karaciğer dışı klerens, CSHT (bağlam duyarlı t½) ve TCI modelleri
              </p>
            </div>
          </div>
          <div className="text-slate-400">
            {pkOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {pkOpen && (
          <div className="p-4 sm:p-5 pt-0 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Etki Başlangıcı (Onset)</span>
                <span className="text-base sm:text-lg font-bold text-teal-600 dark:text-teal-400">30 – 45 saniye</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Kol-beyin dolaşım süresi</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Pik Etki (Peak Effect)</span>
                <span className="text-base sm:text-lg font-bold text-cyan-600 dark:text-cyan-400">1 – 2 dakika</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Maksimum santral depresyon</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Tek Bolus Etki Süresi</span>
                <span className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">4 – 8 dakika</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Hızlı doku redistribüsyonu</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Bağlam Duyarlı t½ (CSHT)</span>
                <span className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">&lt; 40 dakika</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">8 saate kadar süren infüzyonda</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/30 border-slate-700/50' : 'bg-teal-50/30 border-teal-100'} space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed`}>
              <h4 className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-teal-500" />
                <span>Üç Kompartmanlı Farmakokinetik Model & Ekstrahepatik Eliminasyon</span>
              </h4>
              <p>
                <strong>Dağılım Hacmi (Vd):</strong> Yüksek oranda lipofilik yapısı nedeniyle kararlı durum dağılım hacmi geniştir (2 – 10 L/kg). Merkezi kompartmandan kas ve yağ dokusuna çok hızlı yeniden dağılım (redistribüsyon) gösterir; tek bolus sonrası hastanın hızla uyanması eliminasyondan değil bu hızlı redistribüsyondan kaynaklanır.
              </p>
              <p>
                <strong>Plazma Protein Bağlanması:</strong> %97 – %99 oranında yüksek oranda albumin ve eritrositlere bağlanır. Ağır hipoalbüminemili hastalarda (karaciğer yetmezliği, nefrotik sendrom, ağır malnütrisyon) serbest (farmakolojik aktif) propofol fraksiyonu belirgin derecede artar ve hipotansiyon/apne riski katlanır.
              </p>
              <p>
                <strong>Ekstrahepatik Metabolizma:</strong> Propofolün klerensi (1.5 – 2.2 L/dk), karaciğerin normal hepatik kan akımını (1.2 – 1.5 L/dk) aşmaktadır. Bu durum propofolün akciğerlerde ilk geçiş tutulumu ve metabolizması ile böbreklerdeki ekstrahepatik glukuronidasyonuna işaret eder. Karaciğerde CYP2B6/CYP2C9 ve UGT1A9 enzimleri aracılığıyla inaktif glukuronid ve sülfat türevlerine dönüştürülür.
              </p>
              <p>
                <strong>Hedef Kontrollü İnfüzyon (TCI):</strong> Anestezi pratiğinde Marsh modeli (sadece ağırlık kullanır) ve Schnider modeli (yaş, boy, ağırlık ve cinsiyet ile yağsız vücut kitlesi hesaplar) yaygın olarak kullanılır. TCI hedef etki bölgesi konsantrasyonu (Ce) cerrahi anestezi için genellikle 3.0 – 5.0 mcg/mL, sedasyon için 1.0 – 2.0 mcg/mL arasındadır.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. KONTRENDİKASYONLARI */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-rose-600 dark:text-rose-400">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Kontrendikasyonlar ve Kesin Kaçınılması Gereken Durumlar</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2 mb-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Soya ve Yumurta Lesitini Anafilaksi Öyküsü</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Propofol veya taşıyıcı lipid emülsiyonundaki bileşenlere (soya fasulyesi yağı, arıtılmış yumurta fosfatidi/lesitini, gliserol) bilinen anafilaktik aşırı duyarlılığı olan hastalarda kesinlikle kontrendikedir. (Klinik Not: Saf yumurta akı alerjisi [ovalbumin] genellikle lesitin ile çapraz reaksiyon vermez, ancak anafilaksi öyküsü varsa dikkatli olunmalıdır).
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2 mb-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Pediatrik Yoğun Bakımda (&lt;16 Yaş) Uzun Süreli Sedasyon</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              16 yaş altındaki pediyatrik yoğun bakım hastalarında uzun süreli (&gt;24-48 saat) sedasyon amaçlı propofol infüzyonu <strong>kesinlikle kontrendikedir</strong>. Çocuklarda ölümcül Propofol İnfüzyon Sendromu (PRIS) gelişme insidansı çok daha yüksektir ve ölüm oranları %80'i aşmaktadır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Ağır Dekompanse Şok ve Derin Hipovolemi</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Düzeltilmemiş derin hipovolemi, hemorajik şok veya şiddetli kardiyojenik şok tablosunda belirgin miyokardiyal depresyon ve vazodilatasyon yaparak ani kardiyak arrest ve refrakter kollapsa yol açabilir. Volüm resüsitasyonu ve inotrop/vazopresör desteği sağlanmadan indüksiyon uygulanmamalıdır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Mitokondriyal Sitopatiler & Yağ Asidi Oksidasyon Defekti</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Mitokondriyal elektron transport zinciri bozukluğu veya karnitin palmitoiltransferaz (CPT) eksikliği gibi yağ asidi oksidasyon defekti olan hastalarda propofol mitokondriyal toksisiteyi ve ölümcül PRIS patolojisini tetikleyebileceğinden kaçınılmalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* 4. ENDİKASYONLARI VE OFF-LABEL KULLANIMLARI */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-teal-600 dark:text-teal-400">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Endikasyonlar ve Klinik Kullanım Alanları</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <Syringe className="w-4 h-4 text-teal-500" />
              <span>1. Anestezi İndüksiyonu</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Erişkin ve pediatrik genel anestezi indüksiyonunda altın standart hipnotik ajan. Hızlı, sarsıntısız ve eksitasyonsuz bilinç kaybı sağlar.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <Activity className="w-4 h-4 text-teal-500" />
              <span>2. TIVA (Anestezi İdamesi)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Total İntravenöz Anestezi idamesi. Uyanma kalitesi mükemmeldir, PONV insidansını belirgin derecede düşürür ve malign hipertermi riski taşımaz.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <HeartPulse className="w-4 h-4 text-teal-500" />
              <span>3. YBÜ Sedasyonu</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Mekanik ventilasyonlu yoğun bakım hastalarında hafif/kooperatif sedasyon veya nörolojik değerlendirme için hızlı uyanabilen sedasyon protokolü.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <Layers className="w-4 h-4 text-teal-500" />
              <span>4. Prosedürel Sedasyon (MAC)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Endoskopi, kolonoskopi, ERCP, bronkoskopi, kardiyoversiyon ve girişimsel radyolojide hızlı derlenme sağlayan monitörize anestezi.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <Wind className="w-4 h-4 text-teal-500" />
              <span>5. Hızlı Seri Entübasyon (RSI)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Hemodinamik olarak stabil acil ve yoğun bakım hastalarında laringoskopi koşullarını hızla oluşturan indüksiyon ajanı.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <Zap className="w-4 h-4 text-teal-500" />
              <span>6. Refrakter Status Epileptikus</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Benzodiazepin ve standart antiepileptiklere yanıtsız refrakter status epileptikusta EEG burst-supresyon hedefiyle 3. basamak idame infüzyon: <DoseHover mgText="2.0 – 8.0 mg/kg/saat" mcgText="33.3 – 133.3 mcg/kg/dk" /> (Off-label).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <Flame className="w-4 h-4 text-teal-500" />
              <span>7. Refrakter PONV Tedavisi</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              PACU ve cerrahi sonrasında standart antiemetiklere yanıtsız bulantı ve kusmada 10-20 mg subhipnotik mikro-doz bolus uygulaması (Off-label).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 mb-1">
              <Brain className="w-4 h-4 text-teal-500" />
              <span>8. KİBAS & Nöroanestezi</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Kraniyotomi ve travmatik beyin hasarında CMRO₂ ve intrakraniyal basıncı düşürme; serebral otoregülasyonu ve CO₂ duyarlılığını korur.
            </p>
          </div>
        </div>
      </div>

      {/* 5. UYGULAMA YOLLARI VE ERİŞKİN / PEDİATRİK DOZ REJİMLERİ */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400">
            <Stethoscope className="w-5 h-5" />
            <h2 className="text-base sm:text-lg font-bold">Uygulama Yolları, Erişkin ve Pediatrik Doz Rejimleri</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 font-semibold italic">
              (Dozların üzerine gelerek mcg/kg/dk karşılığını görebilirsiniz)
            </span>
          </div>
        </div>

        {/* KLİNİK UYGULAMA YOLLARI */}
        <div className="mb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Klinik Uygulama Yolları
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 1. IV */}
            <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20">
              <span className="font-bold text-xs text-rose-600 dark:text-rose-400 block mb-1">
                1. İntravenöz (IV) Bolus &amp; İnfüzyon
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Tek standart uygulama yoludur. Onset: 30-45 sn, pik: 1-2 dk, etki süresi: 4-8 dk. İndüksiyon, TIVA ve YBÜ sürekli infüzyonu için geniş damaryolundan (tercihen antekübital) uygulanmalıdır.
              </p>
            </div>

            {/* 2. TCI */}
            <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20">
              <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-1">
                2. Hedef Kontrollü İnfüzyon (TCI)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Farmakokinetik modellere (Marsh ve Schnider) dayalı hedef plazma/etki bölgesi konsantrasyonu (Ce). Genel anestezide 3.0–5.0 mcg/mL, prosedürel sedasyonda 1.0–2.0 mcg/mL Ce hedeflenir.
              </p>
            </div>

            {/* 3. Oral */}
            <div className="p-3.5 rounded-xl border border-orange-200 dark:border-orange-900/40 bg-orange-50/40 dark:bg-orange-950/20">
              <span className="font-bold text-xs text-orange-600 dark:text-orange-400 block mb-1">
                3. Oral / Enteral Yol
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="text-orange-700 dark:text-orange-300">KONTRENDİKE &amp; ETKİSİZDİR (Biyoyararlanım %0):</strong> Masif hepatik ilk geçiş metabolizması ve GIS yıkımı nedeniyle emilmez. Yalnızca intravenöz formda kullanılabilir.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              1. Genel Anestezi İndüksiyon Dozları
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Hasta Popülasyonu</th>
                    <th className="py-2 pr-4 font-semibold">İndüksiyon Dozu (IV Bolus)</th>
                    <th className="py-2 pr-4 font-semibold">Uygulama Şekli</th>
                    <th className="py-2 font-semibold">Özel Klinik Uyarılar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Sağlıklı Erişkin (&lt;55 yaş, ASA I-II)</td>
                    <td className="py-2.5 pr-4 font-bold text-teal-600 dark:text-teal-400">1.5 – 2.5 mg/kg</td>
                    <td className="py-2.5 pr-4">Her 10 saniyede bir 20–40 mg titre edilerek</td>
                    <td className="py-2.5">Kirpik refleksi kaybolana kadar titre edilir</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Yaşlı / Kırılgan / ASA III-IV</td>
                    <td className="py-2.5 pr-4 font-bold text-amber-600 dark:text-amber-400">0.8 – 1.5 mg/kg</td>
                    <td className="py-2.5 pr-4">Çok yavaş (10 sn'de 10-20 mg), fraksiyone</td>
                    <td className="py-2.5">Şiddetli hipotansiyon riski; doz %50'ye kadar azaltılır</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Pediatrik (&gt;3 yaş)</td>
                    <td className="py-2.5 pr-4 font-bold text-cyan-600 dark:text-cyan-400">2.5 – 3.5 mg/kg</td>
                    <td className="py-2.5 pr-4">Yavaş IV bolus (20-30 saniyede)</td>
                    <td className="py-2.5">Büyük Vd ve hızlı klerens nedeniyle kg başı doz daha yüksektir</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Morbid Obezite (BMI &gt; 35 kg/m²)</td>
                    <td className="py-2.5 pr-4 font-bold text-indigo-600 dark:text-indigo-400">1.5 – 2.0 mg/kg (LBW!)</td>
                    <td className="py-2.5 pr-4">Yağsız Vücut Ağırlığına (LBW) göre hesaplanır</td>
                    <td className="py-2.5">TBW üzerinden dozlama derin hipotansiyon ve kollaps yapar!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              2. Sürekli İnfüzyon, Yoğun Bakım ve Prosedürel Rejimler
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-teal-700 dark:text-teal-300 block mb-1">Genel Anestezi İdamesi (TIVA)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  • <DoseHover mgText="4 – 12 mg/kg/saat" mcgText="67 – 200 mcg/kg/dk" /><br />
                  • TCI Hedef Ce: <strong>3.0 – 5.0 mcg/mL</strong><br />
                  • Cerrahi gevşeme ve analjezi için remifentanil infüzyonu eklenir.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">YBÜ Sedasyonu (Mekanik Ventilasyon)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  • Başlangıç: <DoseHover mgText="0.3 – 0.5 mg/kg/saat" mcgText="5.0 – 8.3 mcg/kg/dk" /><br />
                  • İdame: <DoseHover mgText="0.3 – 3.0 mg/kg/saat" mcgText="5.0 – 50.0 mcg/kg/dk" /><br />
                  • PRIS Güvenlik Tavanı: Maks ≤ <DoseHover mgText="4.0 mg/kg/saat" mcgText="66.7 mcg/kg/dk" />, &lt;48 saat!
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-cyan-700 dark:text-cyan-300 block mb-1">Prosedürel Sedasyon (PSA / MAC)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  • Başlangıç bolus: <strong>0.5 – 1.0 mg/kg</strong> (1-5 dakikada)<br />
                  • İdame bolus: <strong>10 – 20 mg</strong> ihtiyaç duyuldukça<br />
                  • İnfüzyon alternatifi: <DoseHover mgText="1.5 – 4.5 mg/kg/saat" mcgText="25.0 – 75.0 mcg/kg/dk" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. İNTERAKTİF İNFÜZYON POMPASI VE ÇOK YOLLU HESAPLAYICISI (DOZ REJİMLERİNDEN HEMEN SONRA) */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900 border-teal-500/40 text-slate-100 shadow-xl'
            : 'bg-white border-teal-500/50 text-slate-900 shadow-lg'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Propofol İnteraktif İnfüzyon Pompası & Çok Yollu Hesaplayıcı
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-700 dark:text-teal-300 font-mono">
                  Canlı Simülasyon
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                TIVA infüzyon pompası, indüksiyon ve RSI dozlayıcısı, prosedürel sedasyon titratörü ve 24 saatlik lipid kalori/PRIS risk monitörü
              </p>
            </div>
          </div>
        </div>

        {/* Hesaplayıcı Araç Sekmeleri */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActiveCalcTool('continuous_tiva')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'continuous_tiva'
                ? isDark
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'bg-teal-600 text-white shadow-md'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>1. Sürekli İnfüzyon / TIVA & Lipid Kalorisi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('induction_rsi')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'induction_rsi'
                ? isDark
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'bg-teal-600 text-white shadow-md'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>2. Anestezi İndüksiyon & RSI Dozlayıcısı</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('procedural_sedation')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'procedural_sedation'
                ? isDark
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'bg-teal-600 text-white shadow-md'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>3. Prosedürel Sedasyon (PSA / MAC)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('pris_monitor')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'pris_monitor'
                ? isDark
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-rose-600 text-white shadow-md'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>4. PRIS Risk & Güvenlik Monitörü</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('ponv_rescue')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'ponv_rescue'
                ? isDark
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'bg-teal-600 text-white shadow-md'
                : isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>5. PONV Subhipnotik Kurtarma</span>
          </button>
        </div>

        {/* Ortak Hasta & İlaç Parametreleri Barı */}
        <div className={`mt-4 p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div>
              <label htmlFor={weightInputId} className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Hasta Vücut Ağırlığı (kg):
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={weightInputId}
                  type="number"
                  min={10}
                  max={250}
                  step={1}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                  className={`w-full px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                    isDark ? 'bg-slate-900 border-slate-700 text-teal-400' : 'bg-white border-slate-300 text-teal-700'
                  }`}
                />
                <span className="font-mono text-slate-500">kg</span>
              </div>
            </div>

            <div>
              <label htmlFor={profileSelectId} className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Hasta Klinik Profili:
              </label>
              <select
                id={profileSelectId}
                value={patientProfile}
                onChange={(e) => setPatientProfile(e.target.value as any)}
                className={`w-full px-3 py-1.5 rounded-lg border font-semibold text-xs ${
                  isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                }`}
              >
                <option value="healthy_adult">Sağlıklı Genç Erişkin (ASA I-II)</option>
                <option value="elderly_frail">Geriatrik / Kırılgan (ASA III-IV, &gt;65 yaş)</option>
                <option value="pediatric">Pediatrik Hasta (&gt;3 yaş)</option>
                <option value="morbid_obese">Morbid Obezite (BMI &gt; 35 kg/m²)</option>
              </select>
            </div>

            <div>
              <label htmlFor={emulsionSelectId} className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Propofol Emülsiyon Konsantrasyonu:
              </label>
              <select
                id={emulsionSelectId}
                value={emulsionType}
                onChange={(e) => setEmulsionType(e.target.value as any)}
                className={`w-full px-3 py-1.5 rounded-lg border font-bold text-xs ${
                  isDark ? 'bg-slate-900 border-slate-700 text-teal-400' : 'bg-white border-slate-300 text-teal-700'
                }`}
              >
                <option value="propofol_1">%1 Propofol (10 mg/mL - Diprivan 1%)</option>
                <option value="propofol_2">%2 Propofol (20 mg/mL - Diprivan 2%)</option>
              </select>
            </div>

            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Çözelti & Enerji Değeri:
              </span>
              <div className={`p-1.5 rounded-lg border text-center font-mono font-bold ${
                isDark ? 'bg-slate-900/80 border-slate-700 text-cyan-300' : 'bg-white border-slate-200 text-cyan-800'
              }`}>
                {concentrationMgMl} mg/mL · 1.1 kcal/mL lipid
              </div>
            </div>
          </div>
        </div>

        {/* SEKME 1: SÜREKLİ İNFÜZYON / TIVA POMPASI & 24 SAATLİK LİPİD HESABI */}
        {activeCalcTool === 'continuous_tiva' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sol: Endikasyon ve Doz Girişi */}
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <label htmlFor={indicationSelectId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Klinik İnfüzyon Endikasyonu:
                  </label>
                  <select
                    id={indicationSelectId}
                    value={indication}
                    onChange={(e) => handleIndicationChange(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-lg border font-semibold text-xs ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="icu_sedation">Yoğun Bakım Ünitesi Sedasyonu (0.3 - 4.0 mg/kg/sa)</option>
                    <option value="tiva_maintenance">Genel Anestezi İdamesi / TIVA (4.0 - 10.0 mg/kg/sa)</option>
                    <option value="procedural_maint">Prosedürel Sedasyon İdamesi / MAC (1.5 - 4.5 mg/kg/sa)</option>
                    <option value="status_epilepticus">Refrakter Status Epileptikus İdamesi (2.0 - 8.0 mg/kg/sa)</option>
                    <option value="custom">Özel Titrasyon Rejimi</option>
                  </select>

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="font-semibold">Önerilen Hedef Aralık:</span>
                    {indication === 'icu_sedation' && (
                      <DoseHover mgText="0.3 – 3.0 mg/kg/saat" mcgText="5.0 – 50.0 mcg/kg/dk" badge />
                    )}
                    {indication === 'tiva_maintenance' && (
                      <DoseHover mgText="4.0 – 10.0 mg/kg/saat" mcgText="66.7 – 166.7 mcg/kg/dk" badge />
                    )}
                    {indication === 'procedural_maint' && (
                      <DoseHover mgText="1.5 – 4.5 mg/kg/saat" mcgText="25.0 – 75.0 mcg/kg/dk" badge />
                    )}
                    {indication === 'status_epilepticus' && (
                      <DoseHover mgText="2.0 – 8.0 mg/kg/saat" mcgText="33.3 – 133.3 mcg/kg/dk" badge />
                    )}
                    {indication === 'custom' && (
                      <DoseHover mgText={`${targetDoseMgKgHr.toFixed(2)} mg/kg/saat`} mcgText={`${calculatedDoseMcgKgMin.toFixed(1)} mcg/kg/dk`} badge />
                    )}
                  </div>
                </div>

                {/* Doz Birimi ve İnput */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor={doseInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Hedef İnfüzyon Dozu:
                    </label>
                    <div className="flex items-center gap-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setInfusionUnit('mg_kg_hr')}
                        className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                          infusionUnit === 'mg_kg_hr'
                            ? 'bg-teal-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        mg/kg/saat
                      </button>
                      <button
                        type="button"
                        onClick={() => setInfusionUnit('mcg_kg_min')}
                        className={`px-2 py-0.5 rounded cursor-pointer font-bold ${
                          infusionUnit === 'mcg_kg_min'
                            ? 'bg-teal-500 text-white'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        mcg/kg/dk
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      id={doseInputId}
                      type="number"
                      min={0.1}
                      max={15}
                      step={infusionUnit === 'mg_kg_hr' ? 0.1 : 5}
                      value={infusionUnit === 'mg_kg_hr' ? targetDoseMgKgHr : targetDoseMcgKgMin}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (infusionUnit === 'mg_kg_hr') {
                          handleMgKgHrChange(val);
                        } else {
                          handleMcgKgMinChange(val);
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-lg border font-mono font-bold text-base ${
                        isDark ? 'bg-slate-900 border-slate-700 text-teal-400' : 'bg-white border-slate-300 text-teal-700'
                      }`}
                    />
                    <div className="shrink-0">
                      {infusionUnit === 'mg_kg_hr' ? (
                        <DoseHover
                          mgText={`${targetDoseMgKgHr.toFixed(1)} mg/kg/sa`}
                          mcgText={`${calculatedDoseMcgKgMin.toFixed(1)} mcg/kg/dk`}
                          badge
                        />
                      ) : (
                        <span className="text-xs font-semibold font-mono text-slate-500 whitespace-nowrap">
                          mcg/kg/dk
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Çift Yönlü Karşılık Bilgisi ve Canlı Hover Barı */}
                  <div className="mt-2 p-2 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-sans font-medium">
                      mcg/kg/dk Karşılığı (Üzerine gelin):
                    </span>
                    <DoseHover
                      mgText={`${calculatedDoseMgKgHr.toFixed(2)} mg/kg/saat`}
                      mcgText={`${calculatedDoseMcgKgMin.toFixed(1)} mcg/kg/dk`}
                      badge
                    />
                  </div>
                </div>

                {/* Planlanan İnfüzyon Süresi (Lipid ve PRIS için) */}
                <div>
                  <label htmlFor={durationInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Tahmini / Planlanan İnfüzyon Süresi:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id={durationInputId}
                      type="number"
                      min={1}
                      max={168}
                      step={1}
                      value={plannedDurationHours}
                      onChange={(e) => setPlannedDurationHours(Math.max(1, Number(e.target.value)))}
                      className={`w-28 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                        isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                      }`}
                    />
                    <span className="text-xs text-slate-500">saat kesintisiz infüzyon</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-lg border text-[11px] ${
                  isDark ? 'bg-slate-900/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  <span className="font-bold text-teal-600 dark:text-teal-400">Protokol Notu: </span>
                  {INDICATION_PRESETS[indication].note}
                </div>
              </div>

              {/* Sağ: Pompa Hızı ve 24 Saatlik Lipid/Kalori Sonuç Kartları */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border text-center ${
                  isDark ? 'bg-teal-500/10 border-teal-500/30' : 'bg-teal-50 border-teal-200'
                }`}>
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block">
                    İnfüzyon Pompası Hızı (Perfüzör Debisi)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-teal-600 dark:text-teal-400 my-1">
                    {infusionRateMlHr.toFixed(1)} <span className="text-lg font-bold">mL / saat</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono flex items-center justify-center gap-1.5 flex-wrap">
                    <span>Saatlik İlaç: <strong>{hourlyDoseMg.toFixed(1)} mg / saat</strong></span>
                    <span>·</span>
                    <span>Doz: <DoseHover mgText={`${calculatedDoseMgKgHr.toFixed(2)} mg/kg/sa`} mcgText={`${calculatedDoseMcgKgMin.toFixed(1)} mcg/kg/dk`} /></span>
                    <span>·</span>
                    <span>~{dropsPerMin.toFixed(0)} gtt/dk</span>
                  </div>
                </div>

                {/* 24 Saatlik Lipid Kalori Yükü Uyarısı (Çok Önemli Klinik Özellik) */}
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-xs mb-1.5 text-amber-800 dark:text-amber-300">
                    <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>24 Saatlik Ekstra Lipid Kalori Yükü (1.1 kcal / mL)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 my-2 text-center">
                    <div className="p-2 rounded-lg bg-black/5 dark:bg-black/20">
                      <span className="text-[10px] text-slate-500 block">Günlük Hacim</span>
                      <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                        {dailyVolumeMl.toFixed(0)} mL/gün
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/5 dark:bg-black/20">
                      <span className="text-[10px] text-slate-500 block">Ek Kalori</span>
                      <span className="text-sm font-bold font-mono text-amber-700 dark:text-amber-300">
                        {dailyCaloriesKcal.toFixed(0)} kcal
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/5 dark:bg-black/20">
                      <span className="text-[10px] text-slate-500 block">Saf Lipid Yükü</span>
                      <span className="text-sm font-bold font-mono text-amber-700 dark:text-amber-300">
                        {dailyFatGrams.toFixed(1)} g yağ
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                    <strong>Klinik Beslenme Uyarısı:</strong> Yoğun bakımda enteral beslenen veya TPN (total parenteral nütrisyon) alan hastalarda bu miktar kadar lipid infüzyonu veya kalori miktarı düşülmelidir. Aksi takdirde hipertrigliseridemi, karaciğer yağlanması ve akut pankreatit riski tetiklenir!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 2: ANESTEZİ İNDÜKSİYON & RSI DOZLAYICISI */}
        {activeCalcTool === 'induction_rsi' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Syringe className="w-4 h-4 text-teal-500" />
                  <span>İndüksiyon Parametreleri ve Titrasyon</span>
                </h4>

                {patientProfile === 'morbid_obese' && (
                  <div className={`p-2.5 rounded-lg border text-xs ${
                    isDark ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}>
                    <span className="font-bold">Obezite Dozlama Prensibi: </span>
                    İndüksiyon dozu yağsız vücut ağırlığına (LBW / İdeal Kilo) göre verilmelidir. Toplam vücut ağırlığı (TBW) üzerinden verilirse aşırı doz ve şiddetli hipotansiyon gelişir!
                  </div>
                )}

                <div>
                  <label htmlFor={inductionDoseInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Hedef İndüksiyon Dozu (mg/kg):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      id={inductionDoseInputId}
                      type="number"
                      min={0.5}
                      max={4.0}
                      step={0.1}
                      value={inductionDoseMgKg}
                      onChange={(e) => setInductionDoseMgKg(Number(e.target.value))}
                      className={`w-full px-3 py-2 rounded-lg border font-mono font-bold text-base ${
                        isDark ? 'bg-slate-900 border-slate-700 text-teal-400' : 'bg-white border-slate-300 text-teal-700'
                      }`}
                    />
                    <span className="text-xs font-mono font-semibold text-slate-500">mg/kg</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setInductionDoseMgKg(patientProfile === 'elderly_frail' ? 1.0 : 2.0)}
                      className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-[11px] font-semibold cursor-pointer"
                    >
                      Standart {patientProfile === 'elderly_frail' ? '1.0' : '2.0'} mg/kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setInductionDoseMgKg(2.5)}
                      className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-[11px] font-semibold cursor-pointer"
                    >
                      Genç / Pediatrik 2.5 mg/kg
                    </button>
                    <button
                      type="button"
                      onClick={() => setInductionDoseMgKg(1.2)}
                      className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-[11px] font-semibold cursor-pointer"
                    >
                      Kırılgan / Kalp Hastası 1.2 mg/kg
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={applyLidocainePretreatment}
                      onChange={(e) => setApplyLidocainePretreatment(e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Enjeksiyon Ağrısı Profilaksisi için Lidokain Ön Dozlaması
                    </span>
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 pl-5">
                    Propofol uygulamasından 30–60 saniye önce antekübital venden turnike ile venöz oklüzyon altında uygulanır.
                  </p>
                </div>
              </div>

              {/* Sağ: İndüksiyon Çıktısı */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border text-center ${
                  isDark ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200'
                }`}>
                  <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider block">
                    Toplam İndüksiyon Bolusu
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-600 dark:text-cyan-400 my-1">
                    {inductionMg.toFixed(0)} <span className="text-lg font-bold">mg</span>
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-700 dark:text-slate-300">
                    Çözelti Karşılığı: <span className="text-cyan-600 dark:text-cyan-400">{inductionMl.toFixed(1)} mL</span> ({emulsionType === 'propofol_1' ? '%1' : '%2'} çözelti)
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Her 10 saniyede bir 20–40 mg (2–4 mL) yavaşça titre edilerek verilir.
                  </p>
                </div>

                {applyLidocainePretreatment && (
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1 text-emerald-800 dark:text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Lidokain Ön Tedavi Protokolü (Ağrısız İndüksiyon)</span>
                    </div>
                    <div className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-300">
                      {lidocaineDoseMg} mg IV (%2 Lidokain ampulden {lidocaineMl2Percent.toFixed(1)} mL)
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                      Ön kola turnike sıkılır, lidokain verilir, 30–60 saniye venöz oklüzyonda tutulduktan sonra turnike açılır ve hemen propofol enjekte edilir. Ağrı hissini %80 oranında engeller.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEKME 3: PROSEDÜREL SEDASYON (PSA / MAC) */}
        {activeCalcTool === 'procedural_sedation' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Girişim / İşlem Türü:
                  </label>
                  <select
                    value={psaProcedureType}
                    onChange={(e) => {
                      const val = e.target.value as any;
                      setPsaProcedureType(val);
                      if (val === 'endoscopy') {
                        setPsaInitialDoseMgKg(0.75);
                        setPsaRescueBolusMg(20);
                      } else if (val === 'cardioversion') {
                        setPsaInitialDoseMgKg(1.0);
                        setPsaRescueBolusMg(20);
                      } else {
                        setPsaInitialDoseMgKg(0.5);
                        setPsaRescueBolusMg(15);
                      }
                    }}
                    className={`w-full px-3 py-2 rounded-lg border font-semibold text-xs ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="endoscopy">Gastrointestinal Endoskopi / Kolonoskopi</option>
                    <option value="cardioversion">Senkronize Kardiyoversiyon (Kısa derin sedasyon)</option>
                    <option value="interventional_rad">Girişimsel Radyoloji / Bronkoskopi / Biyopsi</option>
                  </select>
                </div>

                <div>
                  <label htmlFor={psaInitialInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Başlangıç Bolus Dozu (mg/kg):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id={psaInitialInputId}
                      type="number"
                      min={0.3}
                      max={1.5}
                      step={0.1}
                      value={psaInitialDoseMgKg}
                      onChange={(e) => setPsaInitialDoseMgKg(Number(e.target.value))}
                      className={`w-full px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                        isDark ? 'bg-slate-900 border-slate-700 text-teal-400' : 'bg-white border-slate-300 text-teal-700'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">mg/kg</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">1–3 dakikada yavaşça uygulanır.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Gerektiğinde Aralıklı Kurtarma Bolusu:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={10}
                      max={50}
                      step={5}
                      value={psaRescueBolusMg}
                      onChange={(e) => setPsaRescueBolusMg(Number(e.target.value))}
                      className={`w-32 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                        isDark ? 'bg-slate-900 border-slate-700 text-teal-400' : 'bg-white border-slate-300 text-teal-700'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">mg her 3–5 dakikada</span>
                  </div>
                </div>
              </div>

              {/* Çıktı */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border text-center ${
                  isDark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
                }`}>
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                    PSA Başlangıç Bolusu
                  </span>
                  <div className="text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400 my-1">
                    {(psaInitialDoseMgKg * weightKg).toFixed(0)} mg
                  </div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Hacim: <strong>{((psaInitialDoseMgKg * weightKg) / concentrationMgMl).toFixed(1)} mL</strong> ({concentrationMgMl} mg/mL)
                  </div>
                </div>

                <div className={`p-4 rounded-xl border text-center ${
                  isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    İdame Kurtarma Bolusu
                  </span>
                  <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 my-1">
                    {psaRescueBolusMg} mg ({(psaRescueBolusMg / concentrationMgMl).toFixed(1)} mL)
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastada ajitasyon veya yüz buruşturma olduğunda 3–5 dk aralıklarla verilir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 4: PRIS (PROPOFOL İNFÜZYON SENDROMU) RİSK & GÜVENLİK MONİTÖRÜ */}
        {activeCalcTool === 'pris_monitor' && (
          <div className="mt-4 space-y-4">
            <div className={`p-4 rounded-xl border ${
              warningCount >= 2 || prisRateRisk === 'critical'
                ? isDark ? 'bg-rose-500/15 border-rose-500/40' : 'bg-rose-50 border-rose-300'
                : prisRateRisk === 'high' || prisDurationRisk === 'high'
                ? isDark ? 'bg-amber-500/15 border-amber-500/40' : 'bg-amber-50 border-amber-300'
                : isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    PRIS (Propofol İnfüzyon Sendromu) Dinamik Risk Skoru
                  </h4>
                </div>
                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-md font-mono ${
                  warningCount >= 2 || prisRateRisk === 'critical'
                    ? 'bg-rose-500 text-white'
                    : prisRateRisk === 'high' || prisDurationRisk === 'high'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-emerald-500 text-white'
                }`}>
                  {warningCount >= 2 || prisRateRisk === 'critical'
                    ? 'KRİTİK RİSK - DERHAL KES!'
                    : prisRateRisk === 'high' || prisDurationRisk === 'high'
                    ? 'YÜKSEK RİSK - DİKKAT'
                    : 'DÜŞÜK / KONTROLLÜ RİSK'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor={prisRateInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Uygulanan İnfüzyon Hızı:
                    </label>
                    <DoseHover
                      mgText={`${prisInfusionRate.toFixed(1)} mg/kg/saat`}
                      mcgText={`${(prisInfusionRate * 16.6667).toFixed(1)} mcg/kg/dk`}
                      badge
                    />
                  </div>
                  <input
                    id={prisRateInputId}
                    type="number"
                    min={0.5}
                    max={12}
                    step={0.1}
                    value={prisInfusionRate}
                    onChange={(e) => setPrisInfusionRate(Number(e.target.value))}
                    className={`w-full px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                      prisInfusionRate >= 5.0
                        ? 'border-rose-500 text-rose-600 bg-rose-500/10'
                        : prisInfusionRate >= 4.0
                        ? 'border-amber-500 text-amber-600 bg-amber-500/10'
                        : 'border-slate-300 dark:border-slate-700 text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-900'
                    }`}
                  />
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                    <span>PRIS Kritik Eşik:</span>
                    <DoseHover mgText="> 4.0 – 5.0 mg/kg/saat" mcgText="> 66.7 – 83.3 mcg/kg/dk" />
                  </div>
                </div>

                <div>
                  <label htmlFor={prisDurationInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Toplam Kesintisiz İnfüzyon Süresi:
                  </label>
                  <input
                    id={prisDurationInputId}
                    type="number"
                    min={1}
                    max={168}
                    step={1}
                    value={prisDurationHours}
                    onChange={(e) => setPrisDurationHours(Number(e.target.value))}
                    className={`w-full px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                      prisDurationHours >= 48
                        ? 'border-rose-500 text-rose-600 bg-rose-500/10'
                        : 'border-slate-300 dark:border-slate-700 text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-900'
                    }`}
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Kritik Süre Eşiği: <strong>&gt; 48 saat kesintisiz infüzyon</strong>
                  </span>
                </div>
              </div>

              {/* PRIS Erken Uyarı Kriterleri Kontrol Listesi */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  PRIS Kardinal Bulguları ve Laboratuvar Alarmları (İşaretleyin):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasLacticAcidosis}
                      onChange={(e) => setHasLacticAcidosis(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>Refrakter Laktik Asidoz (Anyon Açığı Yüksek)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasHypertriglyceridemia}
                      onChange={(e) => setHasHypertriglyceridemia(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>Şiddetli Hipertrigliseridemi (&gt;400 mg/dL)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasRhabdomyolysis}
                      onChange={(e) => setHasRhabdomyolysis(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>Rabdomiyoliz & Serum CK Artışı (&gt;1000 U/L)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBrugadaPattern}
                      onChange={(e) => setHasBrugadaPattern(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <span>EKG: Brugada Benzeri ST Yükselmesi / Aritmi</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 5: PONV SUBHİPNOTİK KURTARMA DOZLAYICISI */}
        {activeCalcTool === 'ponv_rescue' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs sm:text-sm">
                  <Flame className="w-4 h-4" />
                  <span>Subhipnotik Anti-Emetik Titrasyon</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Postoperatif derlenme ünitesinde (PACU) veya kemoterapi ilişkili refrakter bulantı ve kusmada propofolün subhipnotik mikro-dozları (10–20 mg IV) dopaminerjik ve serotoninerjik kemoreseptör tetikleme zonunu (CTZ) inhibe eder.
                </p>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Subhipnotik Bolus Dozu (mg):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={5}
                      max={30}
                      step={5}
                      value={ponvBolusMg}
                      onChange={(e) => setPonvBolusMg(Number(e.target.value))}
                      className={`w-32 px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                        isDark ? 'bg-slate-900 border-slate-700 text-teal-400' : 'bg-white border-slate-300 text-teal-700'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">mg IV</span>
                  </div>
                </div>
              </div>

              {/* Çıktı */}
              <div className={`p-4 rounded-xl border text-center flex flex-col justify-center ${
                isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
              }`}>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                  Uygulanacak Subhipnotik Hacim
                </span>
                <div className="text-3xl font-black font-mono text-emerald-600 dark:text-emerald-400 my-1">
                  {(ponvBolusMg / concentrationMgMl).toFixed(1)} mL
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {ponvBolusMg} mg ({emulsionType === 'propofol_1' ? '%1' : '%2'} çözelti)
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  Sedasyon yapmadan birkaç dakikada bulantıyı keser. İhtiyaç halinde 15-20 dk sonra tekrarlanabilir.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. BÖBREK YETMEZLİĞİNDE DOZ REVİZYONLARI */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-cyan-600 dark:text-cyan-400">
          <Droplet className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Böbrek Yetmezliğinde Doz Revizyonları (Renal Profil)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">GFR Düzeylerine Göre</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • <strong>GFR &gt; 50 mL/dk:</strong> Doz ayarı gerekmez (%100 standart doz).<br />
              • <strong>GFR 10–50 mL/dk:</strong> Doz ayarı gerekmez.<br />
              • <strong>GFR &lt; 10 mL/dk:</strong> Doz ayarı gerekmez; ancak üremik hipoalbüminemi varsa indüksiyon bolusu yavaşça titre edilmelidir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Haftada 3 Gün Hemodiyaliz (HD)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • <strong>Doz ayarı gerekmez.</strong><br />
              • Diyaliz sonrası ek doza ihtiyaç yoktur.<br />
              • Propofol yüksek oranda proteine (%98) bağlıdır ve geniş dağılım hacmine sahiptir; <strong>hemodiyalizle klerensi sağlanamaz</strong>.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Periton Diyalizi (PD)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • <strong>Doz ayarı gerekmez.</strong><br />
              • Peritoneal membrandan eliminasyon ihmal edilebilir düzeydedir.<br />
              • Standart doz titrasyonu ile güvenle kullanılabilir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Sürekli Renal Replasman (CRRT)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • <strong>Doz ayarı gerekmez (CVVH / CVVHD / CVVHDF).</strong><br />
              • Filtre membranlarından süzülmez.<br />
              • Kritik hastalarda serum laktat, CK ve trigliserid düzeyleri sıkı takip edilmelidir.
            </p>
          </div>
        </div>
      </div>

      {/* 8. KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONLARI */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-amber-600 dark:text-amber-400">
          <Activity className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Karaciğer Yetmezliğinde Doz Revizyonları (Child-Turcotte-Pugh Skoru)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1 text-sm">
              Child-Pugh Sınıf A (Hafif: 5–6 Puan)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Doz Revizyonu Gerekmez.</strong><br />
              • Ekstrahepatik klerens (akciğer ve böbrek) aktif olduğu için standart dozlar güvenle tolere edilir.<br />
              • Standart hemodinamik monitörizasyon yeterlidir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1 text-sm">
              Child-Pugh Sınıf B (Orta: 7–9 Puan)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>İndüksiyon dozu %20–30 azaltılmalı ve yavaş titre edilmelidir.</strong><br />
              • Karaciğer kan akımındaki azalma klerensi hafif geciktirebilir.<br />
              • İdame infüzyonda aşırı derin sedasyondan kaçınmak için doz titrasyon adımları uzatılmalıdır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1 text-sm">
              Child-Pugh Sınıf C (Şiddetli: 10–15 Puan)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Doz %25–50 azaltılmalı; çok yavaş fraksiyone edilmelidir.</strong><br />
              • Ağır hipoalbüminemi nedeniyle serbest propofol oranı 2-3 katına çıkar; derin hipotansiyon ve apne riski çok yüksektir.<br />
              • Hepatik ensefalopatiyi maskeleyebileceği için yakın nörolojik değerlendirme zorunludur.
            </p>
          </div>
        </div>
      </div>

      {/* 9. GEBELİK VE LAKTASYON KILAVUZU */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-pink-600 dark:text-pink-400">
          <HeartPulse className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Gebelik ve Laktasyon Kılavuzu</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              1. FDA / TGA Gebelik Sınıfı &amp; Teratojenite
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Kategori:</strong> FDA Kategori B (Avustralya TGA Kategori C).<br />
              • <strong>Teratojenite:</strong> İnsanlarda direkt konjenital malformasyon bildirilmemiştir; 1. trimesterde elektif girişimlerde genel anesteziden kaçınılmalıdır.<br />
              • <strong>Uterin Tonus:</strong> Terapötik dozlarda miyometriyal kontraktiliteyi ve oksitosin yanıtını baskılamaz; postpartum atoni riskini artırmaz.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              2. Plasental Geçiş &amp; Sezaryen Anestezisi
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Hızlı Plasental Geçiş:</strong> Lipofilik yapısı sebebiyle saniyeler içinde plasentayı geçer (fetal/maternal oranı ~0.7).<br />
              • <strong>Genel Anestezi ile Sezaryen:</strong> Rejyonelin kontrendike olduğu acil sezaryenlerde hızlı seri indüksiyon (2.0–2.5 mg/kg IV) için birinci tercihtir.<br />
              • <strong>Neonatal Apgar:</strong> İndüksiyon-doğum aralığı makul tutulduğunda bebek hızla yeniden dağılım gösterir; Apgar skorları genellikle korunur.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              3. Laktasyon, Anne Sütü &amp; Emzirme Güvenliği
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Süte Minimum Geçiş:</strong> Anne sütüne geçen propofol miktarı son derece düşüktür (relatif infant dozu RID &lt; %0.5).<br />
              • <strong>Emzirmeye Hemen Dönüş:</strong> Cerrahi sonrasında anne anesteziden uyanıp bebeği tutabilecek kadar ayıldığında doğrudan emzirebilir.<br />
              • <strong>"Pump &amp; Dump" Gerekmez:</strong> Sütün sağılıp dökülmesine veya 24 saat beklenmesine gerek yoktur (ASA ve AAGBI önerisi).
            </p>
          </div>
        </div>
      </div>

      {/* 10. O İLACA ÖZEL ÖNEMLİ OLUMSUZ ETKİLER */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Propofole Özel Önemli Olumsuz Etkiler (Adverse Effects)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              1. Enjeksiyon Bölgesinde Şiddetli Ağrı (%70)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sulu fazdaki serbest propofol vasküler endotel ve kallikrein-kinin sistemini aktive eder. Küçük el sırtı venlerinde ağrı şiddetlidir. Lidokain ön enjeksiyonu ve geniş antekübital ven tercihi ile önlenir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              2. Kardiyovasküler Depresyon & Hipotansiyon
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sistemik vasküler direnci (SVR) belirgin düşürür, venodilatasyon yapar ve miyokardiyal kontraktiliteyi baskılar. Baroreseptör refleksini körelttiği için hipotansiyona çoğu zaman taşikardi eşlik etmez!
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              3. Solunum Depresyonu ve Apne (%50-80)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              İndüksiyon dozunun ardından hastaların büyük çoğunluğunda 30–60 saniye süren apne gelişir. Karbondioksit duyarlılığını baskılar. Havayolu kontrolü daima hazır olmalıdır.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              4. PRIS (Propofol İnfüzyon Sendromu)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yüksek doz (<DoseHover mgText="> 4.0 mg/kg/saat" mcgText="> 66.7 mcg/kg/dk" />) ve uzun süre (&gt;48 saat) kullanımda mitokondriyal yağ asidi oksidasyonunu bloke eder; refrakter laktik asidoz, hiperkalemi, rabdomiyoliz, hepatomegali ve kardiyak arreste yol açar.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              5. Hipertrigliseridemi & Pankreatit
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Taşıyıcı emülsiyon yoğun soya yağı içerir. Uzayan infüzyonlarda serum trigliseriti &gt;400 mg/dL olduğunda akut pankreatit riski nedeniyle ilaç derhal kesilmelidir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-teal-600 dark:text-teal-400 block mb-1">
              6. Yeşil / Kahverengi İdrar (Benign)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Karaciğerde oluşan inaktif fenol türevi kinol metabolitlerinin idrarla atılması sonucu idrar rengi yeşile veya kahverengiye dönebilir. Tamamen iyi huyludur, nefrotoksisite göstermez.
            </p>
          </div>
        </div>
      </div>

      {/* 10. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL DURUMLAR */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-teal-600 dark:text-teal-400">
          <Info className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Klinisyenin İlaca ve Belirli Klinik Durumlara Göre Dikkat Etmesi Gerekenler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-500" />
              <span>12 Saatlik Flakon ve Hat Değişim Kuralı (Asepsi Zorunluluğu)</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Propofol formülasyonu antimikrobiyal koruyucu içermez ve oda sıcaklığında mikroorganizmalar (özellikle Staphylococcus aureus ve Candida albicans) için mükemmel bir üreme vasatıdır. <strong>Flakon açıldıktan sonra infüzyon hattı ve kalan ilaç en geç 12 saat içinde atılmalı ve yenilenmelidir.</strong>
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-teal-500" />
              <span>Serebral Perfüzyon Basıncı (CPP = MAP - ICP) Dengesi</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Propofol kafa içi basıncı (ICP) düşürür; ancak sistemik arteryel basıncı (MAP) daha fazla düşürürse net serebral perfüzyon basıncı (CPP) tehlikeli şekilde düşebilir! Beyin hasarlı kritik hastalarda MAP &gt; 65–70 mmHg tutulacak şekilde eşzamanlı norepinefrin titre edilmelidir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-teal-500" />
              <span>1.1 kcal / mL Kalori Yükü ve Nütrisyon Entegrasyonu</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Günde 500 mL propofol alan bir hasta 550 kcal saf yağ enerjisi alır. Klinik diyetisyen veya yoğun bakım hekimi enteral/parenteral beslenme planında lipid yükünü bu miktar kadar kısmalıdır; aksi halde aşırı kalori yükü karaciğer steatozuna neden olur.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-teal-500" />
              <span>Yaşlı Hastalarda Refleks Taşikardisiz Ağır Hipotansiyon</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yaşlı ve hipovolemik hastalarda indüksiyon bolusları 10 saniyede bir 10–20 mg gibi fraksiyonel adımlarla verilmelidir. Hipotansiyon geliştiğinde kompansatris refleks taşikardi köreldiği için bradikardi ile birlikte akut kardiyovasküler kollaps gelişebilir.
            </p>
          </div>
        </div>
      </div>

      {/* 11. IV UYGULAMA VE SULANDIRMA / HAZIRLAMA ŞEKİLLERİ */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-teal-600 dark:text-teal-400">
          <Layers className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">IV Uygulama, Sulandırma ve Hazırlama Kuralları</h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
              Hazır Formülasyonlar (%1 vs %2)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>%1 Propofol (10 mg/mL):</strong> 20 mL ampul (200 mg), 50 mL flakon (500 mg) ve 100 mL flakon (1000 mg). Genel cerrahi indüksiyonu ve sedasyon için standart formdur.<br />
              • <strong>%2 Propofol (20 mg/mL):</strong> 50 mL flakon (1000 mg). Yoğun bakımda sıvı kısıtlaması olan veya yüksek doz TIVA alan hastalarda sıvı ve lipid yükünü yarı yarıya azaltmak için tercih edilir. (16 yaş altı çocuklarda önerilmez).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
              Seyreltme Kuralları (Yalnızca %5 Dekstroz!)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • Propofol kural olarak seyreltilmeden doğrudan orijinal flakon/şırıngasından verilir.<br />
              • Eğer seyreltme gerekiyorsa <strong>yalnızca %5 Dekstroz (D5W)</strong> çözeltisi ile yapılabilir. Minimum konsantrasyon <strong>2 mg/mL</strong> olmalıdır (1 kısım %1 propofol + 4 kısım %5 Dekstroz).<br />
              • <strong>Önemli Uyarı:</strong> Asla %0.9 NaCl (SF) ile torbada seyreltilerek uzun süre bekletilmemelidir; elektrolitler emülsiyon stabilitesini bozarak lipid küreciklerinin birleşmesine (coalescence) neden olur.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
              Filtre Zorunluluğu (≥ 1.2 µm Lipid Filtresi)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Standart IV setlerdeki 0.22 mikron filtreler lipid emülsiyonunu süzer ve infüzyonu tıkar. Propofol infüzyonunda filtre kullanılacaksa <strong>en az 1.2 mikron por çapına sahip lipid-uyumlu filtreler</strong> kullanılmalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* 12. İLAÇ GÜVENLİĞİ VE HIGH-ALERT UYARILARI */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-rose-600 dark:text-rose-400">
          <ShieldAlert className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">İlaç Güvenliği İlişkili Durumlar (ISMP High-Alert)</h2>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'} space-y-2.5 text-xs`}>
          <div className="flex items-center gap-2 font-bold text-sm text-rose-800 dark:text-rose-300">
            <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
            <span>ISMP High-Alert İlaç Sınıflandırması & Havayolu Güvenliği</span>
          </div>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            1. <strong>Yetkili Uygulayıcı Zorunluluğu:</strong> Propofol yalnızca anesteziyoloji veya yoğun bakım uzmanları ile ileri havayolu yönetimi konusunda eğitimli ve sertifikalı hekimler tarafından uygulanmalıdır.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            2. <strong>Acil Ekipman Hazırlığı:</strong> Uygulama yapılan her ortamda (ameliyathane, YBÜ, endoskopi ünitesi) endotrakeal entübasyon seti, laringoskop, aspiratör, yüksek akımlı oksijen kaynağı ve resüsitasyon ilaçları hazır bulundurulmalıdır.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            3. <strong>Karışım Uyarısı:</strong> Propofol emülsiyonu asla aynı hat üzerinden kan veya plazma ürünleriyle verilmemelidir. Eşzamanlı IV infüzyonlarda fizikokimyasal geçimsizlik nedeniyle ayrı lümen kullanılmalıdır.
          </p>
        </div>
      </div>

      {/* 13. İLAÇ ETKİLEŞİMİ SORGULAMAK İÇİN DIŞ BAĞLANTILAR */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400">
            <ExternalLink className="w-5 h-5" />
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
              İlaç Etkileşimleri ve Dış Kaynak Sorgulama
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Resmi farmakope ve klinik etkileşim veri tabanları
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href="https://www.drugs.com/drug-interactions/propofol.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-teal-500/50'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-teal-500/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Pill className="w-4 h-4 text-teal-500" />
              <div>
                <span className="text-xs font-bold block group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  Drugs.com Propofol Etkileşim Kontrolü
                </span>
                <span className="text-[11px] text-slate-500">
                  Opioidler, sedatifler, antiaritmikler ve CYP etkileşimleri
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-500 shrink-0" />
          </a>

          <a
            href="https://reference.medscape.com/drug/diprivan-propofol-343100"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-teal-500/50'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-teal-500/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-teal-500" />
              <div>
                <span className="text-xs font-bold block group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  Medscape Propofol (Diprivan) Monografisi
                </span>
                <span className="text-[11px] text-slate-500">
                  Klinik referans dozları, yan etkiler ve gebelik kategorisi
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-teal-500 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
