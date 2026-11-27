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
import {
  CompatibilityAndLineBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

interface DoseHoverProps {
  mgText: string;
  mcgText: string;
  explanation?: string;
  className?: string;
  badge?: boolean;
  color?: 'teal' | 'rose';
}

export const DoseHover: React.FC<DoseHoverProps> = ({
  mgText,
  mcgText,
  explanation = '1 mg/kg/saat = 16.67 mcg/kg/dk',
  className = '',
  badge = false,
  color = 'rose'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isRose = color === 'rose';

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
            ? isRose
              ? 'px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/30'
              : 'px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold border border-teal-500/30'
            : isRose
            ? 'font-bold underline decoration-dotted decoration-rose-500 underline-offset-4 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300'
            : 'font-semibold underline decoration-dotted decoration-teal-500 underline-offset-4 hover:text-teal-600 dark:hover:text-teal-400'
        }`}
      >
        {mgText}
      </span>
      <span
        className={`text-[10px] font-mono px-1 py-0.2 rounded font-semibold transition-all ${
          isRose
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-500 group-hover:text-white'
            : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 group-hover:bg-teal-500 group-hover:text-white'
        }`}
      >
        mcg?
      </span>

      {/* Popover Hover Balonu */}
      {isOpen && (
        <span
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 rounded-xl text-left shadow-2xl border z-50 pointer-events-none transition-all duration-150 bg-slate-900 ${
            isRose ? 'border-rose-500/60 shadow-rose-950/60' : 'border-teal-500/60 shadow-teal-950/60'
          } text-slate-100 dark:bg-slate-950 animate-in fade-in zoom-in-95`}
        >
          <span className={`block text-[9.5px] font-bold uppercase tracking-wider ${isRose ? 'text-rose-400' : 'text-teal-400'}`}>
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

type ActiveCalcTool = 'continuous_tiva' | 'pris_monitor';

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

  // 2. PRIS (Propofol İnfüzyon Sendromu) Parametreleri
  const [prisInfusionRate, setPrisInfusionRate] = useState<number>(3.5); // mg/kg/saat
  const [prisDurationHours, setPrisDurationHours] = useState<number>(36); // saat
  const [hasLacticAcidosis, setHasLacticAcidosis] = useState<boolean>(false);
  const [hasHypertriglyceridemia, setHasHypertriglyceridemia] = useState<boolean>(false);
  const [hasRhabdomyolysis, setHasRhabdomyolysis] = useState<boolean>(false);
  const [hasBrugadaPattern, setHasBrugadaPattern] = useState<boolean>(false);

  // UI Durumları
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // Benzersiz ID'ler
  const weightInputId = useId();
  const profileSelectId = useId();
  const emulsionSelectId = useId();
  const indicationSelectId = useId();
  const doseInputId = useId();
  const durationInputId = useId();
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
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0) */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet & Etki' },
          { id: 'sec-pkpd', label: 'PK / PD' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-endikasyon', label: 'Endikasyonlar' },
          { id: 'sec-dozlar', label: 'Dozaj' },
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

      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON · v4.0) */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="PROPOFOL (%1 [10 mg/mL] vs %2 [20 mg/mL] DİKKAT!)"
        confusionRiskWith="Propofol %2 (20 mg/mL) ↔ Propofol %1 (10 mg/mL) · İntralipid %20"
        antidoteOrRescue="Spesifik Antidot YOK — PRIS Acil Yönetim & Destek: Propofolün farmakolojik antidotu yoktur; kısa etki süresine güvenilerek solunum/hemodinami desteklenir. PRIS şüphesinde (açıklanamayan laktik asidoz, rabdomiyoliz, Brugada benzeri EKG, hiperkalemi) infüzyonu DERHAL kesin, alternatif sedasyona geçin, agresif hemodinamik destek ve gerekirse CRRT/ECMO planlayın."
        criticalAlerts={[
          'Yetkili Uygulayıcı & Havayolu Hazırlığı Zorunluluğu: Yalnızca anesteziyoloji, yoğun bakım veya ileri havayolu yönetiminde sertifikalı hekimler tarafından; entübasyon seti, aspiratör, O₂ ve resüsitasyon ilaçları hazırda bulundurularak uygulanmalıdır.',
          'Aseptik 6/12 Saat Kuralı: Antimikrobiyal koruyucu içermeyen lipid emülsiyonudur; enjektöre çekilen veya seyreltilen propofol ≤ 6 saatte, orijinal flakon ve infüzyon hattı ≤ 12 saatte değiştirilir (bakteriyel kontaminasyon ve sepsis riski).',
          'PRIS Tavanı & Pediatrik YBÜ Yasağı: Erişkin YBÜ sedasyonunda > 4 mg/kg/saat ve > 48 saat infüzyondan kaçının; 16 yaş altında uzun süreli YBÜ sedasyonu KESİNLİKLE kontrendikedir.',
          '%1 vs %2 Karışma Riski & Kan Ürünleri: Propofol %1 (10 mg/mL) ile %2 (20 mg/mL) flakonları karıştırılmamalı (%2 yalnızca TIVA/YBÜ pompası için etiketlenmeli); aynı hattan kan/plazma ürünleri asla verilmemelidir.',
        ]}
      />

      {/* 1. ÜST BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI (EN YUKARIDA) */}
      <div
        id="sec-ozet"
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
        id="sec-pkpd"
        className={`rounded-2xl border transition-all scroll-mt-20 ${
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
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        title="Kontrendikasyonlar ve Kesin Kaçınılması Gereken Durumlar"
        icon={<ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        defaultOpen={false}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2 mb-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Propofole Bilinen Anafilaksi (Yumurta/Soya Miti Düzeltmesi)</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Yalnızca <strong>propofolün kendisine</strong> veya emülsiyon bileşenlerine karşı doğrulanmış anafilaksi
              öyküsü mutlak kontrendikasyondur. <strong>AAAAI, AAGBI ve Miller&apos;s Anesthesia</strong> kılavuzlarına göre
              gıda tipi <strong>yumurta veya soya alerjisi propofol için kontrendikasyon DEĞİLDİR</strong> (emülsiyon
              rafine soya yağı ve arıtılmış yumurta fosfatidi içerir; alerjen protein içermez).
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
      </MonographAccordionSection>

      {/* 4. ENDİKASYONLARI VE OFF-LABEL KULLANIMLARI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-endikasyon"
        title="Endikasyonlar ve Klinik Kullanım Alanları"
        icon={<Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* 5. UYGULAMA YOLLARI VE ERİŞKİN / PEDİATRİK DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozlar"
        title="Uygulama Yolları, Erişkin ve Pediatrik Doz Rejimleri"
        subtitle="(Dozların üzerine gelerek mcg/kg/dk karşılığını görebilirsiniz)"
        icon={<Stethoscope className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        defaultOpen={false}
      >

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
          {/* 1. Genel Anestezi & RSI İndüksiyon Dozları */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center justify-between">
              <span>1. Genel Anestezi &amp; RSI İndüksiyon Dozları (IV Bolus)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                IV Yol: Kırmızı Doz Göstergesi
              </span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Hasta Popülasyonu / Endikasyon</th>
                    <th className="py-2 pr-4 font-semibold">İndüksiyon Dozu (IV Bolus)</th>
                    <th className="py-2 pr-4 font-semibold">Uygulama Şekli</th>
                    <th className="py-2 font-semibold">Özel Klinik Uyarılar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Sağlıklı Erişkin (&lt;55 yaş, ASA I-II)</td>
                    <td className="py-2.5 pr-4 font-bold font-mono text-rose-600 dark:text-rose-400">1.5 – 2.5 mg/kg IV</td>
                    <td className="py-2.5 pr-4">Her 10 saniyede bir 20–40 mg titre edilerek</td>
                    <td className="py-2.5">Kirpik refleksi kaybolana ve hipnoz sağlanana kadar titre edilir</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Yaşlı / Kırılgan / ASA III-IV</td>
                    <td className="py-2.5 pr-4 font-bold font-mono text-rose-600 dark:text-rose-400">0.5 – 1.5 mg/kg IV</td>
                    <td className="py-2.5 pr-4">Çok yavaş (10 sn'de 10-20 mg), fraksiyone</td>
                    <td className="py-2.5">Şiddetli hipotansiyon ve bradikardi riski; doz %50'ye kadar azaltılır</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Hızlı Seri Entübasyon (RSI) / Acil Hava Yolu</td>
                    <td className="py-2.5 pr-4 font-bold font-mono text-rose-600 dark:text-rose-400">1.5 – 2.0 mg/kg IV</td>
                    <td className="py-2.5 pr-4">Hızlı IV bolus veya 10 mg fraksiyonlar</td>
                    <td className="py-2.5 font-medium text-slate-800 dark:text-slate-200">
                      Hemodinamik instabilite/şok halinde <strong>%50 azaltılmış doz (0.75–1.0 mg/kg)</strong> ya da hasta bilinç kaybı yaşayana kadar <strong>10 mg'lık dozlar ile</strong> titre edilir.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Morbid Obezite (BMI &gt; 35 kg/m²)</td>
                    <td className="py-2.5 pr-4 font-bold font-mono text-rose-600 dark:text-rose-400">1.5 – 2.0 mg/kg (LBW!) IV</td>
                    <td className="py-2.5 pr-4">Yağsız Vücut Ağırlığına (LBW) göre hesaplanır</td>
                    <td className="py-2.5">TBW üzerinden dozlama derin hipotansiyon ve kardiyak kollaps yapar!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 2. Pediatrik Doz Rejimleri */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center justify-between">
              <span>2. Pediatrik Doz Rejimleri (İndüksiyon, TIVA ve Sedasyon)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                Pediatri Kılavuzu
              </span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  Pediatrik İndüksiyon (1 ay – 3 yaş)
                </span>
                <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mb-1">
                  2.5 – 4.0 mg/kg IV
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Geniş santral dağılım hacmi (Vd) nedeniyle kg başına erişkinden daha yüksek doz gerekir. Yavaşça (20-30 sn) titre edilir.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  Pediatrik İndüksiyon (&gt;3 yaş – 16 yaş)
                </span>
                <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mb-1">
                  2.5 – 3.5 mg/kg IV
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Okul çağı çocuklarında 2.5–3.5 mg/kg IV bolus. İndüksiyonda laringeal refleksler körelene kadar titre edilir.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  Pediatrik Anestezi İdamesi (TIVA)
                </span>
                <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mb-1">
                  <DoseHover mgText="7.5 – 15 mg/kg/saat" mcgText="125 – 250 mcg/kg/dk" color="rose" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Hızlı metabolik klirens nedeniyle erişkinden yüksek infüzyon hızı gerekir; cerrahi uyaran ve BIS/entropiye göre titre edilir.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  Pediatrik Prosedürel Sedasyon (MAC)
                </span>
                <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mb-1">
                  1.0 – 2.0 mg/kg IV bolus
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  MRI/tanısal işlemlerde başlangıç bolusu ardından <DoseHover mgText="1.0 – 3.0 mg/kg/saat" mcgText="16.7 – 50.0 mcg/kg/dk" color="rose" /> veya ihtiyaçta 0.5 mg/kg ek bolus.
                </p>
              </div>
            </div>

            {/* Pediatrik YBÜ Sedasyonu Mutlak Kontrendikasyon Uyarısı */}
            <div className="mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-800 dark:text-rose-300 flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <div>
                <strong>Pediatrik YBÜ Sürekli Sedasyonu Uyarısı: </strong>
                16 yaşından küçük çocuklarda yoğun bakımda uzamış mekanik ventilasyon sedasyonu için kullanımı <strong>fatal PRIS (Propofol İnfüzyon Sendromu), ağır metabolik asidoz ve kardiyak kollaps riski nedeniyle MUTLAK KONTRENDİKEDİR!</strong>
              </div>
            </div>
          </div>

          {/* 3. Erişkin Sürekli İnfüzyon, Yoğun Bakım ve Prosedürel Rejimler */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              3. Erişkin Sürekli İnfüzyon, Yoğun Bakım ve Prosedürel Rejimler
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Genel Anestezi İdamesi (TIVA)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  • <DoseHover mgText="4 – 12 mg/kg/saat" mcgText="67 – 200 mcg/kg/dk" color="rose" /><br />
                  • TCI Hedef Ce: <strong>3.0 – 5.0 mcg/mL</strong><br />
                  • Cerrahi gevşeme ve analjezi için remifentanil infüzyonu eklenir.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">YBÜ Sedasyonu (Mekanik Ventilasyon)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  • Başlangıç: <DoseHover mgText="0.3 – 0.5 mg/kg/saat" mcgText="5.0 – 8.3 mcg/kg/dk" color="rose" /><br />
                  • İdame: <DoseHover mgText="0.3 – 3.0 mg/kg/saat" mcgText="5.0 – 50.0 mcg/kg/dk" color="rose" /><br />
                  • PRIS Güvenlik Tavanı: Maks ≤ <DoseHover mgText="4.0 mg/kg/saat" mcgText="66.7 mcg/kg/dk" color="rose" />, &lt;48 saat!
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Prosedürel Sedasyon (PSA / MAC)</span>
                <p className="text-slate-600 dark:text-slate-300">
                  • Başlangıç bolus: <span className="font-bold font-mono text-rose-600 dark:text-rose-400">0.5 – 1.0 mg/kg IV</span> (1-5 dakikada)<br />
                  • İdame bolus: <span className="font-bold font-mono text-rose-600 dark:text-rose-400">10 – 20 mg IV</span> ihtiyaç duyuldukça<br />
                  • İnfüzyon alternatifi: <DoseHover mgText="1.5 – 4.5 mg/kg/saat" mcgText="25.0 – 75.0 mcg/kg/dk" color="rose" />
                </p>
              </div>
            </div>
          </div>

          {/* 4. Refrakter Status Epileptikus Dozaj Rejimi */}
          <div className={`p-4 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20`}>
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <h4 className="text-xs sm:text-sm font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-rose-600" />
                <span>4. Refrakter Status Epileptikus Dozaj Rejimi (3. Basamak Nörolojik Acil)</span>
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-600 text-white font-bold">
                EEG Burst-Supresyon Hedefli
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-3">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  1. Yükleme Bolusu
                </span>
                <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mb-1">
                  1.0 – 2.0 mg/kg IV
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  5 dakika içinde yavaşça uygulanır. Nöbet durdurulamazsa 5 dakika sonra 1.0 mg/kg ek bolus tekrarlanabilir.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  2. İdame Sürekli İnfüzyon
                </span>
                <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mb-1">
                  <DoseHover mgText="2.0 – 8.0 mg/kg/saat" mcgText="33.3 – 133.3 mcg/kg/dk" color="rose" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Başlangıç 2.0 mg/kg/saat. Dirençli fokal veya jeneralize nöbetlerde kısa süreli maksimum <DoseHover mgText="10.0 mg/kg/saat" mcgText="166.7 mcg/kg/dk" color="rose" /> seviyesine çıkılabilir.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                  3. Nöromonitörizasyon Hedefi
                </span>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                  cEEG Burst-Supresyon
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Sürekli EEG'de saatte 3–5 burst veya en az %50–70 supresyon oranı hedeflenir. Nöbet kontrolü sağlandıktan sonra 24-48 saat sürdürülür.
                </p>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-rose-300 dark:border-rose-800 text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-rose-700 dark:text-rose-300 block">Kritik PRIS &amp; Süre Sınırı Uyarısı:</span>
              <p>
                Status epileptikusta yüksek doz (&gt;4.0–5.0 mg/kg/saat) ve &gt;48 saat süren propofol infüzyonları <strong>ölümcül PRIS (Propofol İnfüzyon Sendromu), metabolik asidoz ve refrakter ventriküler aritmi</strong> riskini katlayarak artırır! Sık aralıklarla arteriyel kan gazı, laktat, kreatin kinaz (CK) ve serum trigliserit takibi zorunludur. Tedavi 48 saati aşacaksa ketamin veya diğer antiepileptik/anestezik rejimlere geçiş planlanmalıdır.
              </p>
            </div>
          </div>
        </div>
      </MonographAccordionSection>

      {/* 6. İNTERAKTİF İNFÜZYON POMPASI VE ÇOK YOLLU HESAPLAYICISI (DOZ REJİMLERİNDEN HEMEN SONRA) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="Propofol İnteraktif İnfüzyon Pompası & Doz Hesaplayıcı"
        icon={
          <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
            <Zap className="w-6 h-6" />
          </div>
        }
        containerClassName={
          isDark
            ? 'bg-slate-900 border-teal-500/40 text-slate-100 shadow-xl'
            : 'bg-white border-teal-500/50 text-slate-900 shadow-lg'
        }
        defaultOpen={false}
      >
        <div className="flex items-center justify-end gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
          <MonographCopyButton
            isDark={isDark}
            getText={() =>
              [
                `PROPOFOL İNFÜZYON ÖZETİ`,
                `Hesaplama Ağırlığı: ${effectiveWeightKg} kg`,
                `Formülasyon: ${emulsionType === 'propofol_1' ? '%1 (10 mg/mL)' : '%2 (20 mg/mL)'}`,
                `Hedef Doz: ${calculatedDoseMgKgHr.toFixed(2)} mg/kg/saat (${calculatedDoseMcgKgMin.toFixed(1)} mcg/kg/dk)`,
                `Saatlik İlaç: ${hourlyDoseMg.toFixed(1)} mg/saat`,
                `Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat (~${dropsPerMin.toFixed(0)} gtt/dk)`,
                `24 Saatlik Lipid/Kalori Yükü: ${dailyVolumeMl.toFixed(0)} mL/gün · ${dailyCaloriesKcal.toFixed(0)} kcal · ${dailyFatGrams.toFixed(1)} g yağ`,
              ].join('\n')
            }
          />
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
            <span>1. Sürekli İnfüzyon / TIVA &amp; Lipid Kalorisi</span>
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
            <span>2. PRIS Risk &amp; Güvenlik Monitörü</span>
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

            <div className="sm:col-span-2 lg:col-span-4">
              <ObesityDosingScaler
                isDark={isDark}
                drugName="Propofol"
                recommendedScalar="LBW"
                secondaryScalar={{ type: 'AdjBW', context: 'TIVA İdame' }}
                rationale="SOBA / Miller's Anesthesia: Obez hastalarda propofol indüksiyon bolusu Yağsız Vücut Ağırlığına (LBW) göre verilir (TBW ile bolus derin hipotansiyon yapar); TIVA idame infüzyonu ise AdjBW/TBW üzerinden titre edilir."
                currentWeightKg={weightKg}
                onApplyWeight={(w) => setWeightKg(Math.max(10, Math.min(250, w)))}
              />
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

        {/* SEKME 2: PRIS (PROPOFOL İNFÜZYON SENDROMU) RİSK & GÜVENLİK MONİTÖRÜ */}
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
      </MonographAccordionSection>

      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0) */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Propofol %1 — 200 mg / 20 mL Ampul (Diprivan / Propofol-Lipuro / Fresenius / Predapol)',
            presentation: 'IV enjeksiyon/infüzyon için süt beyazı izotonik yağ içinde su (LCT veya MCT/LCT) emülsiyonu; 20 mL cam ampul',
            concentration: '10 mg/mL (%1)',
            saltOrBaseNote: '1 mL = 10 mg propofol + 0.1 g yağ (1.1 kcal/mL). MCT/LCT (Lipuro) formları sulu fazdaki serbest propofolü azaltarak enjeksiyon ağrısını belirgin düşürür.',
            alertLevel: 'standard',
          },
          {
            name: 'Propofol %1 — 500 mg / 50 mL & 1000 mg / 100 mL Flakon',
            presentation: 'TIVA ve YBÜ sürekli infüzyonları için 50 mL ve 100 mL cam flakon veya önceden doldurulmuş TCI şırıngası',
            concentration: '10 mg/mL (%1)',
            saltOrBaseNote: 'Antimikrobiyal koruyucu içermez (veya sadece bakteriostatik EDTA/sülfit içerir — bakterisidal değildir). Enjektöre çekildiğinde ≤6 saat, orijinal flakon ≤12 saat.',
            alertLevel: 'standard',
          },
          {
            name: 'Propofol %2 — 1000 mg / 50 mL Flakon (Yüksek Konsantrasyon · DİKKAT!)',
            presentation: 'Sıvı kısıtlaması olan erişkin YBÜ veya yüksek doz TIVA hastalarında lipid/sıvı yükünü yarıya indirmek için 50 mL cam flakon',
            concentration: '20 mg/mL (%2)',
            saltOrBaseNote: '%1 forma göre 2 KAT KONSANTREDİR (aynı hacimde 2 kat propofol, ancak aynı 1.1 kcal/mL lipid yoğunluğu → mg başına yarı lipid yükü!). 16 yaş altında ve bolus indüksiyonda önerilmez.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Standart Uygulama: Propofol kural olarak seyreltilmeden doğrudan orijinal %1 (10 mg/mL) veya %2 (20 mg/mL) flakon/şırıngasından uygulanır.',
          'Zorunlu Seyreltme (Yalnızca %5 Dekstroz): Seyreltme gerekiyorsa YALNIZCA %5 Dekstroz (D5W) ile ve nihai konsantrasyon ≥ 2 mg/mL olacak şekilde (en fazla 1 kısım %1 propofol + 4 kısım D5W) hazırlanır; ≤ 6 saatte tüketilir.',
          'Asla %0.9 NaCl (SF) ile Torbada Seyreltmeyin: Elektrolitler yağ emülsiyonunun zeta potansiyelini bozarak yağ damlacıklarının birleşmesine (coalescence) ve yağ embolisine yol açabilir.',
          'Filtre Kuralı: Standart 0.22 µm bakteri filtreleri lipid emülsiyonunu tıkar; filtre kullanılacaksa por çapı ≥ 1.2 µm (tercihen 5 µm) lipid-uyumlu filtre kullanılmalıdır.',
        ]}
        concentrationTrapWarning="Propofol %1 (10 mg/mL) ile Propofol %2 (20 mg/mL) flakonları dış görünüm olarak ikisi de süt beyazıdır ve 2 KAT DOZ HATASI riski taşır! Ayrıca Intralipid %20 torbalarıyla karıştırılmamalı, her şırınga/pompa mutlaka konsantrasyonu (%1 veya %2) belirtilerek etiketlenmelidir."
      />

      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0) */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="central-preferred"
        accessSummary="Geniş periferik ven (tercihen antekübital fossa — el sırtı küçük venlerde %70 enjeksiyon ağrısı) veya santral venöz kateter (SVK) ayrı lümeninden uygulanır. Lipid emülsiyonu nedeniyle sürekli YBÜ infüzyonlarında ayrı, özel bir lümen tercih edilir; kan/plazma ürünleri ile aynı hattan ASLA verilmez."
        phRange="7.0 – 8.5 (Nötr-Hafif Alkali Lipid Emülsiyonu)"
        osmolalityNote="~300 mOsm/kg (izotonik). Enjeksiyon ağrısının nedeni ozmolalite değil, sulu fazdaki serbest propofolün vasküler endotel kallikrein-kinin sistemini uyarmasıdır (lidokain 20–40 mg ön uygulama ağrıyı azaltır)."
        compatibleDiluents={[
          'Seyreltilmeden doğrudan uygulama (Tercih edilen)',
          '%5 Dekstroz (D5W) — yalnızca ≥ 2 mg/mL konsantrasyonda, ≤ 6 saat stabil',
          'Y-site taşıyıcı olarak %0.9 NaCl, D5W veya Ringer Laktat (torbada ön karıştırma yapılmaz)',
        ]}
        stabilityNote="Antimikrobiyal koruyucu içermez (bakteri/Candida üreme vasatı!). Orijinal flakon ve infüzyon seti en geç 12 saatte, enjektöre çekilen veya D5W ile seyreltilen propofol en geç 6 saatte değiştirilmelidir."
        ySiteCompatible={[
          'Remifentanil',
          'Fentanil',
          'Deksmedetomidin',
          'Midazolam (kısa Y-site)',
          'Ketamin',
          'Lidokain',
          'Norepinefrin',
          'Epinefrin',
          'Süksinilkolin',
        ]}
        ySiteIncompatible={[
          'Kan / Eritrosit / TDP / Trombosit',
          'Atrakuryum / Mivakuryum',
          'Kalsiyum Klorür / Glukonat',
          'Siprofloksasin',
          'Amikasin / Gentamisin / Tobramisin',
          'Diazepam',
          'Amfoterisin B',
          'Metoklopramid',
          'Fenitoin',
        ]}
        extravasationProtocol="İzotonik ve nötr pH’lı olduğundan doku nekrozu nadirdir; ancak nadir lokal irritasyon, flebit veya yumuşak doku hasarı bildirilmiştir. Ekstravazasyonda infüzyonu durdurun, kateterden aspire edin, ekstremiteyi eleve edin ve soğuk kompres uygulayın. Set değişimi sırasında ölü boşlukta kalan lipid/ilaç kalıntısını hızlı yıkamayın."
      />

      {/* 7. BÖBREK YETMEZLİĞİNDE DOZ REVİZYONLARI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-organ"
        title="Böbrek Yetmezliğinde Doz Revizyonları (Renal Profil)"
        icon={<Droplet className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* 8. KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONLARI */}
      <MonographAccordionSection
        isDark={isDark}
        title="Karaciğer Yetmezliğinde Doz Revizyonları (Child-Turcotte-Pugh Skoru)"
        icon={<Activity className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0) */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="%30–50 Başlangıç Doz Azaltımı"
        geriatricPoints={[
          'Yaşlı (>65 yaş) ve kırılgan (frail) hastalarda santral dağılım hacmi (V1) ve klerens azalırken beyin GABA-A duyarlılığı artar (Schnider PK/PD modeli); indüksiyon dozu 1.0–1.5 mg/kg (bazı çok kırılgan/ASA IV olgularda 0.5–1.0 mg/kg) düzeyine düşürülmelidir.',
          'İndüksiyon bolusu hızlı puşe yerine 10 saniyede bir 10–20 mg fraksiyonel titrasyonla verilmelidir; baroreseptör refleksi körelttiği için derin hipotansiyona kompanzatuvar taşikardi eşlik etmez (bradikardi ile kollaps riski).',
          'İdame TIVA/YBÜ infüzyon hızları genç erişkinlere göre %20–40 daha düşük başlatılmalı ve BIS/RASS eşliğinde titre edilmelidir.',
        ]}
        obesityWeightScalarBadge="İndüksiyon: LBW · İdame: AdjBW / TBW"
        obesityPoints={[
          'SOBA ve Miller’s Anesthesia kılavuzları: Obez hastalarda (BMI ≥ 30–40 kg/m²) indüksiyon bolusu KESİNLİKLE yağsız vücut kütlesi (LBW) üzerinden hesaplanır; TBW ile indüksiyon derin hipotansiyon ve kardiyak kollaps yapar.',
          'İdame infüzyonunda yüksek lipofilisite ve artan kardiyak debi nedeniyle periferik dağılım ve klerens artar; bu nedenle idame hızı AdjBW (Düzeltilmiş Vücut Ağırlığı) veya TCI Eleveld / Schnider (LBW) modeliyle titre edilir.',
          'Obez hastalarda obstrüktif uyku apnesi (OSA) sık olduğundan prosedürel sedasyonda (MAC) sürekli kapnografi ve havayolu hazırlığı zorunludur.',
        ]}
        clinicalNote="Yukarıdaki etkileşimli hesaplayıcı içindeki Obezite Doz Ölçekleyici ile hastanın LBW/AdjBW değeri tek tıkla hesaplamaya aktarılabilir."
      />

      {/* 9. GEBELİK VE LAKTASYON KILAVUZU */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-gebelik"
        title="Gebelik ve Laktasyon Kılavuzu"
        icon={<HeartPulse className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* 10. O İLACA ÖZEL ÖNEMLİ OLUMSUZ ETKİLER */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-olumsuz"
        title="Propofole Özel Önemli Olumsuz Etkiler (Adverse Effects)"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        defaultOpen={false}
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
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
              Sistemik vasküler direnci (SVR) belirgin düşürür, venodilatasyon yapar ve miyokardiyal kontraktiliteyi baskılar. Baroreseptör refleksini körelttiği için hipotansiyona çoğu zaman kompanzatuvar taşikardi eşlik etmez!
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'}`}>
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1 flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span>3. Bradikardi, Asistoli & Aritmiler</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Vagal Hiperaktivite &amp; Asistoli Riski:</strong> SA ve AV nod iletimini yavaşlatır; sempatik tonusu baskılarken santral vagal tonusu artırır. Barorefleks duyarlılığı köreldiği için hipotansiyona derin bradikardi eşlik edebilir. Özellikle opioidler (remifentanil, fentanil) veya roküronyum ile indüksiyonda ani asistoli ve kardiyak arrest gelişebilir. Antikolinerjik (atropin/glikopirolat) hazır tutulmalıdır.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'}`}>
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>4. Brugada Paterni & Fatal Ventriküler Aritmiler</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>PRIS Zemininde Malign Aritmi:</strong> Yüksek doz veya uzamış infüzyonda kardiyak sodyum/kalsiyum kanallarını bloke ederek EKG'de V1-V3 derivasyonlarında "coved-type" Brugada tipi ST elevasyonuna neden olur. Bunu geniş QRS, polimorfik VT, VF ve resüsitasyona dirençli kardiyak arrest takip edebilir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              5. Solunum Depresyonu ve Apne (%50-80)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              İndüksiyon dozunun ardından hastaların büyük çoğunluğunda 30–60 saniye süren apne gelişir. Karbondioksit duyarlılığını baskılar. Havayolu kontrolü daima hazır olmalıdır.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              6. PRIS (Propofol İnfüzyon Sendromu)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yüksek doz (<DoseHover mgText="> 4.0 mg/kg/saat" mcgText="> 66.7 mcg/kg/dk" color="rose" />) ve uzun süre (&gt;48 saat) kullanımda mitokondriyal yağ asidi oksidasyonunu bloke eder; refrakter laktik asidoz, hiperkalemi, rabdomiyoliz, hepatomegali ve kardiyak arreste yol açar.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              7. Hipertrigliseridemi & Pankreatit
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Taşıyıcı emülsiyon yoğun soya yağı içerir. Uzayan infüzyonlarda serum trigliseriti &gt;400 mg/dL olduğunda akut pankreatit riski nedeniyle ilaç derhal kesilmelidir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-teal-600 dark:text-teal-400 block mb-1">
              8. Yeşil / Kahverengi İdrar (Benign)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Karaciğerde oluşan inaktif fenol türevi kinol metabolitlerinin idrarla atılması sonucu idrar rengi yeşile veya kahverengiye dönebilir. Tamamen iyi huyludur, nefrotoksisite göstermez.
            </p>
          </div>
        </div>
      </MonographAccordionSection>

      {/* 11. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR (v4.0) */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Aseptik 6 / 12 Saat Flakon ve Hat Değişim Kuralı',
            detail:
              'Antimikrobiyal koruyucu içermeyen lipid emülsiyonu oda sıcaklığında S. aureus ve Candida albicans için ideal üreme vasatıdır. Enjektöre çekilen veya D5W ile seyreltilen propofol ≤ 6 saatte, orijinal flakon ve infüzyon hattı en geç 12 saatte atılıp yenilenmelidir.',
          },
          {
            title: 'Serebral Perfüzyon Basıncı (CPP = MAP − ICP) Dengesi',
            detail:
              'Propofol CMRO₂ ve ICP’yi etkin biçimde düşürür; ancak sistemik MAP’ı daha fazla düşürürse net serebral perfüzyon basıncı (CPP) tehlikeli biçimde azalır. Travmatik beyin hasarında MAP > 65–70 mmHg tutulacak şekilde eşzamanlı norepinefrin titre edilmelidir.',
          },
          {
            title: '1.1 kcal/mL Lipid Kalori Yükü & Nütrisyon Entegrasyonu',
            detail:
              'Günde 500 mL %1 propofol alan bir YBÜ hastası 550 kcal (50 g saf yağ) ek enerji alır. Enteral/TPN beslenme planından eşdeğer lipid/kalori düşülmeli, uzamış infüzyonda 48–72 saatte bir serum trigliserit (>400 mg/dL → kes) izlenmelidir.',
          },
          {
            title: 'Yumurta / Soya Alerjisi Miti & Yeşil İdrar',
            detail:
              'Gıda tipi yumurta veya soya alerjisi propofol için kontrendikasyon DEĞİLDİR (AAAAI/AAGBI). Uzamış infüzyonda görülen yeşil/kahverengi idrar inaktif fenol-kinol metabolitlerine bağlı tamamen benign bir bulgudur; böbrek hasarı göstermez.',
          },
        ]}
      />

      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (GABA-A β₂/β₃ Transmembran Bağlanma Oyuğu [TM2–TM3 M286/N265], Direkt Kanal Açılımı & HCN1/Glisin Modülasyonu)',
          summary:
            'Propofol (2,6-diizopropilfenol), yüksek lipofilik yapısı (logP ~3,8) sayesinde tek bir kol-beyin dolaşım süresinde (30–45 sn) kan-beyin bariyerini geçer ve nöronal postsinaptik zara yerleşir. Pentamerik ligand-kapılı iyon kanalı süper ailesinden GABA-A reseptörlerinin β₂ ve β₃ alt birimlerinin transmembran (TM2–TM3) hidrofobik oyuğuna (özellikle β₃-N265 ve β₂-M286 amino asit rezidülerine) bağlanarak hem pozitif allosterik modülasyon hem de yüksek konsantrasyonlarda direkt kanal açılımı (agonizm) üretir (Miller’s 10th Ed. / Stoelting’s 6th Ed. / Goodman & Gilman 14th Ed.).',
          points: [
            'Postsinaptik GABA-A β₂ / β₃ Transmembran Kaviteleri (TM2–TM3 M286 / N265 Rezidüleri): Benzodiazepinlerin bağlandığı ekstraselüler α/γ₂ arayüzünden tamamen farklı olarak, lipid çift tabaka içindeki β⁺/α⁻ transmembran alt birim arayüzüne bağlanır; β₃-N265 mutasyonu propofolün immobilizasyon/genel anestezik etkisini, β₂-N265 mutasyonu ise sedatif etkisini ortadan kaldırır.',
            'Pozitif Allosterik Modülasyon vs Yüksek Konsantrasyonda Direkt Gating (Agonizm): Düşük-orta klinik konsantrasyonlarda (Ce 1–3 mcg/mL) endojen GABA’nın reseptörden ayrışma hızını (koff) yavaşlatarak kanalın açık kalma süresini uzatır; yüksek indüksiyon/status epileptikus konsantrasyonlarında (Ce > 4–6 mcg/mL) ise ortamda endojen GABA olmasa dahi Cl⁻ kanal porunu doğrudan açar (bu sayede benzodiazepinlerin aksine fizyolojik tavan etkisi yoktur ve izoelektrik EEG üretebilir).',
            'Talamokortikal HCN1 Kanalları, Spinal Glisin & Kortikal NMDA Reseptörleri: Piramidal ve talamokortikal pacemaker nöron membranındaki Hiperpolarizasyonla Aktive Siklik Nükleotid-Kapılı (HCN1) katyon kanallarını inhibe ederek (Ih akımını keserek) kortikal uyarılabilirliği baskılar; spinal arka boynuz ve beyin sapındaki inhibitör Glisin reseptörlerini (GlyR α₁) potansiyalize eder ve NMDA glutamat reseptörlerini zayıfça inhibe eder.',
            'Vasküler Düz Kas, Kardiyomiyosit & Area Postrema Membran Hedefleri: Damar düz kası ve kardiyomiyosit sarkolemmasında L-tipi voltaj kapılı Ca²⁺ kanallarını (Cav1.2) doğrudan inhibe eder; kemoreseptör tetik bölgesi (CTZ / Area Postrema) membranında 5-HT₃ ve D₂ reseptör sinyalini baskılayarak intrinsik antiemetik etki gösterir. Nosiseptif ağrı yolaklarında analjezik reseptör hedefi YOKTUR.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'Membran reseptör ve kanal etkileşimleri; santral nöronlarda Cl⁻ akımı kaynaklı elektrofizyolojik şant inhibisyonu, vasküler/miyokardiyal hücrelerde sitozolik Ca²⁺ düşüşü ve yüksek doz uzamış maruziyette (PRIS) mitokondriyal yağ asidi oksidasyonu ile elektron transport zinciri blokajını tetikler:',
          points: [
            'Nöron İçi Cl⁻ Akımı (ICl), Membran Hiperpolarizasyonu & Şant İnhibisyonu: GABA-A kanal porunun açık kalma süresinin (mean open time) 3–5 kat uzamasıyla hücre içine masif Cl⁻ iyon akışı (ICl) gerçekleşir. Postsinaptik membran potansiyeli dinlenim değerinden (−65 mV) klorür denge potansiyeline (−70 ila −75 mV) hiperpolarize olur; membran direnci (Rm) düşerek eksitatör postsinaptik potansiyellerin (EPSP) aksiyon potansiyeli eşiğine ulaşmasını engelleyen "elektriksel şant inhibisyonu" gelişir.',
            'Vasküler Düz Kas & Endotel Hücresi İçi ([Ca²⁺]i Düşüşü & eNOS/NO-PGI₂ Salınımı): Vasküler düz kas hücresinde sarkolemmal L-tipi Ca²⁺ (Cav1.2) kanallarının blokajı ve sarkoplazmik retikulumdan IP₃-aracılı Ca²⁺ salınımının baskılanmasıyla sitozolik [Ca²⁺]i düşer, MLCK aktivitesi azalır. Eşzamanlı olarak vasküler endotelde endotelyal Nitrik Oksit Sentaz (eNOS) uyarımıyla NO ve prostasiklin (PGI₂) salınımı artarak düz kas içinde Guanilat Siklaz → cGMP → PKG kaskadını aktive eder (çift mekanizmalı vazodilatasyon).',
            'Kardiyomiyosit İçi Ca²⁺ Dinamiği & PRIS’te Sodyum/Kalsiyum Kanal Blokajı: Kardiyomiyositlerde transsarkolemmal L-tipi Ca²⁺ akımını (ICa,L), SR Ca²⁺ yükünü ve miofibriler Ca²⁺ duyarlılığını doz-bağımlı azaltır; toksik/PRIS konsantrasyonlarında ise kardiyak Nav1.5 hızlı Na⁺ kanallarını ve Cav1.2’yi bloke ederek sağ ventrikül çıkış yolunda (RVOT) transmural repolarizasyon dispersiyonu ve V1–V3’te "coved-type" Brugada EKG paterni üretir.',
            'Mitokondriyal Biyoenerjetik Toksisite Kaskadı (PRIS Mekanizması — CPT-1 & Kompleks I/II/IV İnhibisyonu): Yüksek doz (>4 mg/kg/saat) ve uzun süreli (>48 saat) infüzyonda serbest propofol ve lipid yükü; dış mitokondri zarındaki Karnitin Palmitoiltransferaz-1 (CPT-1) enzimini inhibe ederek uzun zincirli serbest yağ asitlerinin (FFA) mitokondri matriksine girişini (β-oksidasyonu) durdurur, aynı zamanda iç mitokondri zarında Koenzim Q’yu (Ubikinon) bozarak Elektron Transport Zinciri Kompleks I, II ve IV’ü bloke eder → sitozolde toksik açilkarnitin/FFA birikimi, oksidatif fosforilasyonun çöküşü, ağır ATP tükenmesi, anaerobik laktik asidoz ve iskelet/kalp kasında lizozomal/sarkolemmal yıkım (rabdomiyoliz) meydana gelir.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Talamokortikal Ağ, Serebral Vasküler Yatak & Area Postrema → SSS & EEG Fizyolojisi',
            tissueTarget: 'Piramidal Korteks · Talamus · Serebral Arteriyol · CTZ',
            accent: 'indigo',
            points: [
              'Talamokortikal Senkronizasyon & EEG/BIS Spektrumu: Kortikal GABAerjik internöronların ve talamik retiküler çekirdeğin (TRN) potansiyalizasyonuyla düşük dozda paradoksal β (13–25 Hz) aktivasyonu, cerrahi anestezi dozunda (BIS 40–60) karakteristik frontal α (8–12 Hz) ve yavaş δ (0,5–4 Hz) faz-genlik koheransı, yüksek dozda (status epileptikus) ise burst-supresyon ve tam izoelektrik kortikal sessizlik oluşur.',
              'Serebral Metabolizma-Akım Eşleşmesi (CMRO₂-CBF Coupling) & ICP: Nöronal sinaptik aktivitenin durmasıyla Serebral Oksijen Tüketimi (CMRO₂) %30–40 düşer; metabolik otoregülasyon korunduğu için paralel serebral vazokonstriksiyon gelişerek Serebral Kan Akımı (CBF) ve Kafa İçi Basıncı (ICP) azalır (ancak sistemik MAP düşüşü aşırı olursa Serebral Perfüzyon Basıncı [CPP = MAP − ICP] bozulabilir).',
              'Antikonvülzan & İntrinsik Antiemetik Doku Etkisi: Hipokampal ve neokortikal odaklarda GABA-A/glisin aracılı hiperpolarizasyon refrakter status epileptikusu durdururken, subhipnotik plazma düzeyleri (10–20 mg bolus veya TIVA) Area Postrema (CTZ) ve nucleus tractus solitarius’ta 5-HT₃/D₂ deşarjını baskılayarak güçlü postoperatif bulantı-kusma (PONV) koruması sağlar.',
            ],
          },
          {
            systemTitle: 'Damar Düz Kası, Baroreseptör Arkı & Miyokard Dokusu → Kardiyovasküler Fizyoloji',
            tissueTarget: 'Arteriyol / Venül Düz Kası · Karotid Sinüs · SA/AV Düğüm',
            accent: 'rose',
            points: [
              'Arteriyoler Vazodilatasyon (SVR ↓) & Venöz Kapasitans Artışı (Preload ↓): Rostral ventrolateral medullada (RVLM) santral sempatik vazomotor çıkışın baskılanması ve vasküler düz kasta Cav1.2/NO aracılı gevşeme sonucu hem arteriyoler direnç (SVR %20–35 ↓) hem de splanknik/sistemik venöz dönüş (preload ve LVEDP ↓) düşer; indüksiyon sonrası MAP %25–40 azalabilir.',
              'Baroreseptör Refleks Sıfırlanması (Resetting) & Santral Vagotoni: Karotid sinüs ve aortik ark baroreseptör refleks arkını santral nucleus tractus solitarius düzeyinde köreltir; bu nedenle derin hipotansiyona kompanzatuvar refleks taşikardi EŞLİK ETMEZ. Aksine vagal tonus baskınlığı (özellikle remifentanil/fentanil veya roküronyum ile) SA/AV düğümü yavaşlatarak derin sinüs bradikardisi, kavşak ritmi ve asistoli tetikleyebilir.',
              'Miyokard Kontraktilitesi & Oksijen Dengesi: Sarkolemmal Ca²⁺ girişinin azalmasıyla doz-bağımlı direkt negatif inotropi oluşturur (sağlıklı gençte hafif, hipovolemik/yaşlı veya EF <%35 kalp yetmezliğinde belirgin); öte yandan afterload, preload ve kalp hızı azaldığı için koroner perfüzyon basıncı korunduğu sürece miyokard O₂ tüketimini (MVO₂) düşürür.',
            ],
          },
          {
            systemTitle: 'Medüller Solunum Merkezi, Faringeal Kaslar & Bronş Düz Kası → Solunum Fizyolojisi',
            tissueTarget: 'Pre-Bötzinger Kompleksi · Genioglossus · Bronş Düz Kası',
            accent: 'teal',
            points: [
              'Pre-Bötzinger Solunum Merkezi & CO₂/Hipoksi Yanıtı: Medüller solunum ritim jeneratöründeki GABAerjik inhibisyonla tidal volüm ve solunum frekansı düşer, PaCO₂–ventilasyon yanıt eğrisi sağa kayar ve eğimi azalır; ayrıca karotid cisimcik Tip-I glomus hücrelerini baskılayarak hipoksik ventilatuar dürtüyü köreltir. İndüksiyon bolusunun ardından %50–80 hastada 30–90 sn santral apne gelişir.',
              'Faringeal/Laringeal Refleks Baskılanması & Üst Havayolu Kollapsı: Hipoglossal ve vagal motor çekirdeklerin inhibisyonuyla genioglossus tonusu azalır (sedasyonda dil kökü obstrüksiyonu); buna karşılık laringeal ve faringeal koruyucu refleksleri tiyopental, etomidat ve ketaminden çok daha güçlü baskıladığı için kas gevşetici olmadan Laringeal Maske (LMA) yerleştirilmesinde altın standarttır.',
              'Bronş Düz Kası & Pulmoner Vasküler Yatak: Vagal bronkokonstriktör refleksleri ve bronş düz kası hücre içi Ca²⁺ artışını baskılayarak hafif-orta bronkodilatasyon sağlar (astım/KOAH indüksiyonunda güvenli) ve volatil anesteziklerin aksine Hipoksik Pulmoner Vazokonstriksiyon (HPV) refleksini belirgin bozmaz.',
            ],
          },
          {
            systemTitle: 'Çizgili Kas Mitokondrisi, Hepato-Renal & Endokrin Doku → Sistemik & Metabolik Organlar',
            tissueTarget: 'İskelet/Kalp Kası Mitokondrisi · Hepatosit · Adrenal Korteks',
            accent: 'amber',
            points: [
              'İskelet & Kalp Kası Mitokondrisi (PRIS Organ Hasarı): CPT-1 ve ETC Kompleks I/II/IV blokajıyla ATP üretimi duran çizgili kas ve miyokard dokusunda sarkolemma bütünlüğü bozulur → masif rabdomiyoliz (CK > 10.000 U/L, miyoglobinürik ABH), hücre dışına K⁺ sızıntısı (refrakter hiperkalemi), hepatik yağlanma ve katekolamine dirençli biventriküler miyokardiyal çöküş gelişir.',
              'Hepatik & Ekstrahepatik (Pulmoner/Renal) Biyotransformasyon Dokusu: Sistemik klirensi (1,5–2,2 L/dk) hepatik kan akımını (~1,5 L/dk) aşar; karaciğerde CYP2B6/UGT1A9 ile 4-hidroksipropofol ve glukuronid/sülfat konjugatlarına yıkılırken %30–40 oranında böbrek ve akciğer dokusunda ekstrahepatik glukuronidasyona uğrar (bu nedenle siroz ve KBY’de tek doz kinetiği korunur; fenol-kinol metabolitleri idrarı benign yeşile boyar).',
              'Adrenal Korteks, İskelet Kası RyR1 & Lipid Metabolizması: Etomidatın aksine adrenal kortekste 11β-hidroksilazı inhibe etmez (kortizol sentezi korunur) ve iskelet kası Riyanodin Reseptörü-1’i (RyR1) tetiklemez (Malign Hipertermi hastalarında kesin güvenli TIVA ajanıdır); ancak %10 soya yağı emülsiyonu (1,1 kcal/mL) hepatik/plazma lipoprotein lipaz kapasitesini aşarsa hipertrigliseridemi (>400 mg/dL) ve akut pankreatit yapabilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Tavan Etkisi Yokluğu (Direkt Gating), Opioid Sinerjisi & CSHT Dinamiği',
          summary:
            'Propofolün GABA-A β₂/β₃ alt biriminde hem allosterik modülatör hem de yüksek dozda direkt kanal açıcı (agonist) olarak davranması, benzodiazepinlerden farklı olarak farmakodinamik bir tavan etkisinin (ceiling effect) bulunmamasına ve doz artışıyla derin koma/izoelektrik EEG’ye kesintisiz ilerlemesine yol açar.',
          points: [
            'Fizyolojik Tavan Etkisi Yokluğu (Midazolam GABA Tavanı vs Propofol Direkt Gating): Midazolam yalnızca endojen GABA varlığında Cl⁻ kanal açılma frekansını artırabildiğinden sinaptik GABA doygunluğa ulaştığında tavan etkisine girer; propofol ise yüksek konsantrasyonlarda β₂/β₃ alt birimini doğrudan açarak (direct gating) GABA’dan bağımsız Cl⁻ akımı üretir → doz yükseldikçe burst-supresyon, izoelektrik EEG, apne ve kardiyovasküler kollaps sınır olmaksızın derinleşir.',
            'Propofol–Opioid Supra-Aditif (İzobologram) Sinerjisi: Remifentanil veya fentanil (µ-opioid → Gαi/o → spinal/supraspinal glutamat ve P maddesi baskılanması) ile propofol (kortikal/talamik GABA-A β₂/β₃ hiperpolarizasyonu) kombine edildiğinde, cerrahi uyarana hareketsizlik ve bilinç kaybı için gereken propofol EC₅₀ konsantrasyonu %35–55 düşer; ancak apne ve santral vagotonik bradikardi/hipotansiyon da aynı oranda sinerjik derinleşir.',
            'Bağlam Duyarlı Yarı Ömür (CSHT) & Derin Yağ Kompartmanı (V₃) Kinetiği: Çok yüksek metabolik klirensi (~2 L/dk) ve yavaş derin yağ kompartmanı (V₃) geri dönüşü sayesinde 8 saatlik TIVA sonunda bile CSHT < 40 dakika kalır; ancak >48–72 saatlik YBÜ infüzyonlarında derin yağ dokusu doygunluğa ulaştığından (veya obezde TBW ile dozlandığında) eliminasyon yavaş V₃ boşalmasına bağımlı hale gelir ve uyanma uzar.',
            'Spesifik Farmakolojik Antagonist Yokluğu: Flumazenil yalnızca ekstraselüler α/γ₂ benzodiazepin cebini bloke eder; propofolün bağlandığı transmembran β₂/β₃ kavitesini geri çeviren klinik bir antidot yoktur (geri dönüş tamamen hızlı redistribüsyon [t½α 2–4 dk] ve yüksek hepatik/ekstrahepatik klirense dayanır).',
          ],
        }}
        clinicalPearls={[
          'PRIS (Propofol İnfüzyon Sendromu) Kaskadı & Erken Uyarı Triadı: >4 mg/kg/saat (>67 mcg/kg/dk) ve >48 saat infüzyonda (özellikle TBI + yüksek doz katekolamin + kortikosteroid alanlarda) CPT-1 ve Kompleks I/II/IV blokajıyla gelişen açıklanamayan yüksek anyon açıklı laktik asidoz, CK yükselişi (>5.000–10.000 U/L) ve V1–V3’te Brugada benzeri coved ST elevasyonu PRIS’in habercisidir; infüzyon saniyeler içinde kesilip CRRT/VA-ECMO değerlendirilmelidir.',
          'Neden Hipotansiyona Taşikardi Eşlik Etmez? Propofol hem periferik vazodilatasyon (SVR ↓, preload ↓) yapar hem de santral baroreseptör refleksini sıfırlar; bu nedenle MAP 50 mmHg’ya düşse bile kalp hızı artmaz, hatta remifentanil eşliğinde derin bradikardi/asistoli gelişebilir (profilaktik efedrin/atropin veya norepinefrin puşesi hazır tutulmalıdır).',
          'Enjeksiyon Ağrısının Biyofiziksel Mekanizması & Önlenmesi: Ağrıyı lipid damlacıkları değil, emülsiyonun sulu fazında serbest kalan fenol halkalı propofol monomerlerinin venöz endoteldeki TRPA1/TRPV1 nosiseptörlerini ve kallikrein-kinin/bradikinini uyarması yapar; geniş antekübital ven + turnike (30–60 sn venöz oklüzyon) altında 0,5 mg/kg (20–40 mg) %1 Lidokain ön uygulaması ağrıyı %70’ten <%10’a indirir.',
          '1,1 kcal/mL Lipid Yükü & TPN/Enteral Kalori Düşümü: %1 Propofol (10 mg/mL) ve %2 Propofol (20 mg/mL) aynı taşıyıcıyı (%10 soya yağı = 0,1 g yağ/mL = 1,1 kcal/mL) içerir; %2 formülasyon kullanmak aynı ilaç dozunda hastaya verilen günlük lipid ve sıvı hacmini YARI YARIYA (%50) azaltır.',
        ]}
      />

      {/* 14. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Propofol"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Kan / Eritrosit / TDP Transfüzyonu (Aynı IV Hat) & Pediatrik (<16 Yaş) Uzun Süreli YBÜ Sedasyonu',
            mechanism: 'Fizikokimyasal Emülsiyon İnstabilitesi / Mitokondriyal PRIS Toksisitesi',
            clinicalEffect: 'Aynı hatta kan ürünleri lipid agregasyonu ve hemoliz/tıkanma yapar; <16 yaş YBÜ sedasyonunda fatal PRIS riski.',
            management: 'Kan ürünlerinden tamamen ayrı lümen kullanın; <16 yaşta uzun süreli YBÜ sedasyonunda propofol kullanmayın.',
          },
          {
            severity: 'D',
            agent: 'Opioidler (Remifentanil, Fentanil, Morfin) · Midazolam',
            mechanism: 'Güçlü Farmakodinamik Sinerji (SSS, Solunum & Vagal Tonus)',
            clinicalEffect: 'Derin apne, hipotansiyon, barorefleks kaybına bağlı ağır bradikardi ve asistoli riski.',
            management: 'Propofol indüksiyon ve idame dozlarını %25–50 azaltarak titre edin; atropin ve vazopresör hazır bulundurun.',
          },
          {
            severity: 'D',
            agent: 'Yüksek Doz Katekolaminler (Norepinefrin/Epinefrin) & Sistemik Kortikosteroidler (Uzamış YBÜ)',
            mechanism: 'Artmış Lipoliz + Mitokondriyal β-Oksidasyon Bloku (PRIS Tetiklemesi)',
            clinicalEffect: 'PRIS (laktik asidoz, rabdomiyoliz, Brugada paterni, kardiyak kollaps) gelişim riskinde belirgin artış.',
            management: 'Propofol hızını ≤ 4 mg/kg/saat ve süreyi mümkünse < 48 saat tutun; günlük laktat, CK, trigliserit ve EKG izleyin.',
          },
          {
            severity: 'D',
            agent: 'Antihipertansifler · ACEi / ARB · Beta-Blokerler · Kalsiyum Kanal Blokerleri',
            mechanism: 'Aditif Vazodilatasyon + Negatif İnotropi / Kronotropi',
            clinicalEffect: 'İndüksiyon sonrası dirençli hipotansiyon ve bradikardi.',
            management: 'İndüksiyonu 10–20 mg fraksiyonlarla yavaş titre edin; vazopresör (efedrin/fenilefrin/norepinefrin) hazır tutun.',
          },
          {
            severity: 'C',
            agent: 'Valproik Asit · Rifampisin · Güçlü CYP2B6 / UGT1A9 Modülatörleri',
            mechanism: 'Hepatik Glukuronidasyon ve Oksidasyon Modülasyonu',
            clinicalEffect: 'Valproat propofol klirensini azaltarak etkiyi ve hipotansiyonu artırabilir; rifampisin gereksinimi hafif değiştirebilir.',
            management: 'Klinik yanıta ve BIS/RASS skoruna göre yavaş doz titrasyonu yapın.',
          },
        ]}
        references={[
          {
            authors: 'Schnider TW, Minto CF, Gambus PL, et al.',
            title: 'The Influence of Method of Administration and Covariates on the Pharmacokinetics of Propofol in Adult Volunteers.',
            journal: 'Anesthesiology',
            year: 1998,
            pmid: '9605675',
            doi: '10.1097/00000542-199805000-00006',
            note: 'Yaş, boy ve LBW kovaryatlarını içeren TCI Schnider farmakokinetik modeli.',
          },
          {
            authors: 'Kam PC, Cardone D',
            title: 'Propofol infusion syndrome.',
            journal: 'Anaesthesia',
            year: 2007,
            pmid: '17567345',
            doi: '10.1111/j.1365-2044.2007.05055.x',
            note: 'PRIS patofizyolojisi, 4 mg/kg/saat üzerindeki tavan riski ve mitokondriyal toksisite derlemesi.',
          },
          {
            authors: 'Devlin JW, Skrobik Y, Gélinas C, et al. (SCCM PADIS)',
            title: 'Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU.',
            journal: 'Crit Care Med',
            year: 2018,
            pmid: '30113379',
            doi: '10.1097/CCM.0000000000003299',
            note: 'Mekanik ventilasyonlu erişkinlerde benzodiazepin yerine propofol veya deksmedetomidin önerisi.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/propofol.html"
        medscapeUrl="https://reference.medscape.com/drug/diprivan-propofol-343100"
      />
    </div>
  );
};
