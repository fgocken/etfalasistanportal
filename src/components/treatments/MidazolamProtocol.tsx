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
  Wine
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
  explanation = 'mg/saat = mg/kg/saat × Vücut Ağırlığı (kg)',
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
            ? 'px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30'
            : 'font-semibold underline decoration-dotted decoration-purple-500 underline-offset-4 hover:text-purple-600 dark:hover:text-purple-400'
        }`}
      >
        {doseText}
      </span>
      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all font-semibold">
        çevir
      </span>

      {/* Popover Hover Balonu */}
      {isOpen && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 rounded-xl text-left shadow-2xl border z-50 pointer-events-none transition-all duration-150 bg-slate-900 border-purple-500/60 text-slate-100 dark:bg-slate-950 dark:border-purple-400 shadow-purple-950/60 animate-in fade-in zoom-in-95"
        >
          <span className="block text-[9.5px] font-bold uppercase tracking-wider text-purple-400">
            Doz Karşılığı:
          </span>
          <span className="block text-xs font-black font-mono text-white mt-0.5">
            {equivText}
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

type ActiveCalcTool = 
  | 'continuous_infusion' 
  | 'seizure_rescue' 
  | 'procedural_sedation' 
  | 'agitation_intox_withdrawal' 
  | 'cumulation_risk' 
  | 'flumazenil_antidote';

export const MidazolamProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKTİF HESAPLAYICI MODÜL SEÇİCİ ---
  const [activeCalcTool, setActiveCalcTool] = useState<ActiveCalcTool>('continuous_infusion');

  // --- GENEL HASTA VE DOZ STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [patientProfile, setPatientProfile] = useState<'healthy_adult' | 'elderly_frail' | 'pediatric' | 'morbid_obese'>('healthy_adult');

  // 1. Sürekli İnfüzyon Parametreleri (Yalnızca mg/saat veya mg/kg/saat)
  const [prepType, setPrepType] = useState<'standard_1' | 'concentrated_2' | 'undiluted_5' | 'custom'>('standard_1');
  const [customConcMgMl, setCustomConcMgMl] = useState<number>(1.0);
  const [infusionIndication, setInfusionIndication] = useState<
    | 'icu_light_sedation'
    | 'icu_deep_sedation'
    | 'refractory_status'
    | 'refractory_dt_withdrawal'
    | 'sympathomimetic_infusion'
    | 'palliative_agitation'
    | 'custom'
  >('icu_light_sedation');
  const [infusionUnit, setInfusionUnit] = useState<'mg_hr' | 'mg_kg_hr'>('mg_hr');
  const [targetDoseMgHr, setTargetDoseMgHr] = useState<number>(3.0); // mg/saat
  const [targetDoseMgKgHr, setTargetDoseMgKgHr] = useState<number>(0.04); // mg/kg/saat
  const [infusionDurationHours, setInfusionDurationHours] = useState<number>(24);

  // 2. Akut Nöbet / Status Parametreleri
  const [seizureRoute, setSeizureRoute] = useState<'im' | 'intranasal' | 'buccal' | 'iv_bolus'>('im');

  // 3. Prosedürel Sedasyon Parametreleri
  const [psaGoal, setPsaGoal] = useState<'light_procedural' | 'premed_adult' | 'premed_pediatric_oral' | 'premed_pediatric_in'>('light_procedural');

  // 4. Akut Ciddi Ajitasyon, İntoksikasyon & Madde Çekilmesi Parametreleri
  const [specialScenario, setSpecialScenario] = useState<
    | 'acute_severe_agitation'
    | 'sympathomimetic_toxicity'
    | 'alcohol_withdrawal_dt'
    | 'chloroquine_toxicity'
  >('acute_severe_agitation');
  const [agitationRoute, setAgitationRoute] = useState<'iv' | 'im'>('iv');
  const [ciwaSeverity, setCiwaSeverity] = useState<'mild_moderate' | 'severe_dt'>('severe_dt');

  // 5. Kümülasyon & 1-OH Metabolit Riski Parametreleri
  const [cumEgfr, setCumEgfr] = useState<number>(65); // mL/dk
  const [cumDurationDays, setCumDurationDays] = useState<number>(3); // gün
  const [hasHepaticImpairment, setHasHepaticImpairment] = useState<boolean>(false);
  const [isCoAdministeredCyp3a4Inhibitor, setIsCoAdministeredCyp3a4Inhibitor] = useState<boolean>(false);

  // 6. Flumazenil Parametreleri
  const [flumazenilInitialDoseMg, setFlumazenilInitialDoseMg] = useState<number>(0.2); // mg

  // UI Durumları
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Benzersiz ID'ler
  const weightInputId = useId();
  const profileSelectId = useId();
  const prepSelectId = useId();
  const indicationSelectId = useId();
  const doseInputId = useId();
  const durationInputId = useId();
  const seizureRouteId = useId();
  const psaGoalId = useId();
  const specialScenarioId = useId();
  const cumEgfrId = useId();
  const cumDurationId = useId();

  // Konsantrasyon (mg/mL)
  let concentrationMgMl = 1.0;
  if (prepType === 'standard_1') {
    concentrationMgMl = 1.0; // 50 mg / 50 mL SF
  } else if (prepType === 'concentrated_2') {
    concentrationMgMl = 2.0; // 100 mg / 50 mL SF
  } else if (prepType === 'undiluted_5') {
    concentrationMgMl = 5.0; // Saf 5 mg/mL ampul
  } else {
    concentrationMgMl = customConcMgMl > 0 ? customConcMgMl : 1.0;
  }

  // --- DÖNÜŞÜMLER: SADECE mg/saat ve mg/kg/saat ---
  // mg/saat = mg/kg/saat * weightKg
  // mg/kg/saat = mg/saat / weightKg
  const calculatedDoseMgHr = infusionUnit === 'mg_hr'
    ? targetDoseMgHr
    : targetDoseMgKgHr * weightKg;

  const calculatedDoseMgKgHr = infusionUnit === 'mg_kg_hr'
    ? targetDoseMgKgHr
    : targetDoseMgHr / (weightKg > 0 ? weightKg : 70);

  // Sürekli İnfüzyon Hızı (mL/saat)
  const infusionRateMlHr = calculatedDoseMgHr / concentrationMgMl;
  const dropsPerMin = infusionRateMlHr * (20 / 60);

  // 24 Saatlik Toplam İlaç Dozu (mg)
  const dailyTotalDoseMg = calculatedDoseMgHr * 24;

  // Akut Nöbet Dozlama Motoru
  const calculateSeizureDose = () => {
    switch (seizureRoute) {
      case 'im':
        if (weightKg >= 40) return { mg: 10, ml: 10 / 5, notes: '5 mg/mL konsantre ampulden 2.0 mL anterolateral uyluğa (Vastus lateralis) IM enjekte edilir.' };
        const pedImMg = Math.min(10, weightKg * 0.2);
        return { mg: pedImMg, ml: pedImMg / 5, notes: `0.2 mg/kg üzerinden hesaplandı (5 mg/mL ampulden ${(pedImMg / 5).toFixed(2)} mL).` };
      case 'intranasal':
        const inMg = Math.min(10, weightKg * 0.2);
        const inMl = inMg / 5;
        return { mg: inMg, ml: inMl, notes: `5 mg/mL ampul kullanılır. MAD (Mukozal Atomizer) ile her iki burun deliğine eşit paylaştırılır (Her buruna ${(inMl / 2).toFixed(2)} mL).` };
      case 'buccal':
        const bucMg = Math.min(10, weightKg * 0.25);
        return { mg: bucMg, ml: bucMg / 5, notes: `Yanak mukozası ile alt diş eti arasına yavaşça verilir. Yutulması gerekmez, mukozadan emilir.` };
      case 'iv_bolus':
        const ivMg = Math.min(10, weightKg * 0.15);
        return { mg: ivMg, ml: ivMg / 1.0, notes: `1 mg/mL solüsyondan ${ivMg.toFixed(1)} mL 2 dakikada yavaşça titre edilerek uygulanır.` };
    }
  };
  const seizureResult = calculateSeizureDose();

  // Kümülasyon Skoru Hesabı
  let cumScore = 0;
  if (cumDurationDays >= 3) cumScore += 2;
  if (cumDurationDays >= 5) cumScore += 2;
  if (cumEgfr < 50) cumScore += 2;
  if (cumEgfr < 30) cumScore += 3;
  if (hasHepaticImpairment) cumScore += 2;
  if (isCoAdministeredCyp3a4Inhibitor) cumScore += 2;
  if (patientProfile === 'elderly_frail') cumScore += 1;

  // İnfüzyon Endikasyon Presetleri (Sadece mg/saat ve mg/kg/saat)
  const INFUSION_PRESETS = {
    icu_light_sedation: {
      title: 'YBÜ Hafif / Kooperatif Sedasyon',
      target: 'Mekanik ventilasyonlu hastada konfor ve senkronizasyon (RASS -1 ila -2)',
      defaultMgHr: 3.0,
      defaultMgKgHr: 0.04,
      rangeMgHrText: '1.0 – 5.0 mg/saat',
      rangeMgKgHrText: '0.02 – 0.08 mg/kg/saat',
      note: 'Daima en düşük etkin doz hedeflenir. PADIS kılavuzlarına göre non-benzodiazepinler önceliklidir; ajitasyon ve dirençli durumlarda midazolam eklenir.'
    },
    icu_deep_sedation: {
      title: 'YBÜ Derin Sedasyon & Nöromüsküler Blokaj',
      target: 'Ağır ARDS, prone pozisyonu veya refrakter KİBAS olgularında derin hipnoz (RASS -4 / -5)',
      defaultMgHr: 7.0,
      defaultMgKgHr: 0.10,
      rangeMgHrText: '4.0 – 15.0 mg/saat',
      rangeMgKgHrText: '0.06 – 0.20 mg/kg/saat',
      note: 'Nöromüsküler bloker infüzyonu alan hastalarda intraoperatif farkındalığı (awareness) önlemek için derin sedasyon sürdürülmelidir.'
    },
    refractory_status: {
      title: 'Refrakter Status Epileptikus İdamesi',
      target: 'Sürekli EEG monitörizasyonunda epileptiform deşarjların ve nöbet aktivitesinin baskılanması',
      defaultMgHr: 15.0,
      defaultMgKgHr: 0.20,
      rangeMgHrText: '3.5 – 70.0 mg/saat',
      rangeMgKgHrText: '0.05 – 1.00 mg/kg/saat (Maks 2.0)',
      note: '0.2 mg/kg IV yükleme ardından infüzyon titre edilir. Yüksek dozlarda hipotansiyon riski nedeniyle vazopresör desteği hazır bulundurulmalıdır.'
    },
    refractory_dt_withdrawal: {
      title: 'Refrakter Deliryum Tremens & Alkol Yoksunluğu',
      target: 'Yüksek doz boluslara dirençli şiddetli otonomik fırtına ve halüsinasyonların yatıştırılması',
      defaultMgHr: 6.0,
      defaultMgKgHr: 0.08,
      rangeMgHrText: '2.5 – 18.0 mg/saat',
      rangeMgKgHrText: '0.04 – 0.25 mg/kg/saat',
      note: 'CIWA-Ar skoru eşliğinde titre edilir. Entübasyon hazırlığı yapılmalı; eşzamanlı parenteral Tiamin (B1 vitamini) verilmelidir.'
    },
    sympathomimetic_infusion: {
      title: 'Sempatomimetik İntoksikasyon Kriz İnfüzyonu',
      target: 'Kokain, metamfetamin veya bonzai intoksikasyonunda refrakter ajitasyon, hipertansiyon ve taşikardi kontrolü',
      defaultMgHr: 5.0,
      defaultMgKgHr: 0.07,
      rangeMgHrText: '2.0 – 10.0 mg/saat',
      rangeMgKgHrText: '0.03 – 0.15 mg/kg/saat',
      note: 'Beta blokerler karşılanmamış alfa vazokonstriksiyonu riski nedeniyle KONTRENDİKEDİR! Sempatik fırtınayı kırmak için midazolam ilk tercihtir.'
    },
    palliative_agitation: {
      title: 'Palyatif Sedasyon & Terminal Ajitasyon',
      target: 'Yaşam sonu dönemde refrakter dispne ve kontrol edilemeyen ıstırabın hafifletilmesi',
      defaultMgHr: 1.5,
      defaultMgKgHr: 0.02,
      rangeMgHrText: '0.5 – 3.0 mg/saat',
      rangeMgKgHrText: '0.01 – 0.05 mg/kg/saat',
      note: 'IV veya Subkutan (SC) sürekli infüzyonla titre edilir. Spontan solunum ve konfor dengelenir.'
    },
    custom: {
      title: 'Özel Titrasyon Rejimi',
      target: 'Klinisyenin belirlediği özel hedef doza göre hesaplama',
      defaultMgHr: targetDoseMgHr,
      defaultMgKgHr: targetDoseMgKgHr,
      rangeMgHrText: 'Özel Ayar',
      rangeMgKgHrText: 'Özel Ayar',
      note: 'Hedeflenen klinik sedasyon derinliği (RASS) ve hasta toleransına göre titre edilir.'
    }
  };

  const handleIndicationChange = (ind: typeof infusionIndication) => {
    setInfusionIndication(ind);
    if (ind !== 'custom') {
      const preset = INFUSION_PRESETS[ind];
      setTargetDoseMgHr(preset.defaultMgHr);
      setTargetDoseMgKgHr(preset.defaultMgKgHr);
    }
  };

  const handleMgHrChange = (val: number) => {
    setTargetDoseMgHr(val);
    setTargetDoseMgKgHr(Number((val / (weightKg > 0 ? weightKg : 70)).toFixed(3)));
  };

  const handleMgKgHrChange = (val: number) => {
    setTargetDoseMgKgHr(val);
    setTargetDoseMgHr(Number((val * weightKg).toFixed(1)));
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
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  Kısa-Orta Etkili Benzodiazepin
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                  GABA-A Allosterik Modülatörü · Yeşil Reçete
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: N05CD08
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  DORMICUM · MIDAZOLAM DEMO · SEDAMID · ZOLAMID
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
                Midazolam (DORMICUM, MIDAZOLAM DEMO, SEDAMID, ZOLAMID)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Kısa etkili suda çözünür imidazobenzodiazepin; sedasyon, anterograd amnezi, akut nöbet, akut ciddi ajitasyon, toksikolojik intoksikasyonlar (kokain/amfetamin) ve alkol yoksunluğu (deliryum tremens) yönetimi.
              </p>
            </div>
          </div>
        </div>

        {/* Etki Mekanizması & Farmakolojik Kategori Detay Kutusu */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-purple-50/50 border-purple-100'}`}>
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-semibold text-xs sm:text-sm mb-1.5">
              <Zap className="w-4 h-4" />
              <span>GABA-A Klorür Kanal Açılma Sıklığı</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              GABA-A reseptör kompleksinin benzodiazepin bağlanma bölgesine allosterik olarak bağlanır. GABA'nın reseptöre afinitesini artırarak klorür kanalının <strong>açılma sıklığını (frekansını)</strong> artırır (propofol açık kalma süresini uzatırken BZD'ler açılma frekansını artırır!). Nöron hiperpolarize olur ve santral eksitasyon baskılanır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-indigo-50/50 border-indigo-100'}`}>
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-semibold text-xs sm:text-sm mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>pH-Bağımlı İmidazol Halkası Açılması</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ampul içinde pH &lt; 4 iken imidazol halkası açık ve molekül <strong>tamamen suda çözünür</strong> yapıdadır (enjeksiyon flebiti ve ağrı yapmaz, propilen glikol taşıyıcı gerektirmez!). Fizyolojik kan pH'ında (7.4) halka kendiliğinden kapanarak <strong>yüksek oranda lipofilik</strong> hale gelir ve kan-beyin bariyerini saniyeler içinde aşar.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-rose-50/50 border-rose-100'}`}>
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-semibold text-xs sm:text-sm mb-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Analjezik Etkisi Yoktur · Antidot: Flumazenil</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Midazolam güçlü bir sedatif, hipnotik, amnezik ve antikonvülzandır; ancak <strong>hiçbir nosiseptif analjezik etkisi yoktur</strong>. Ağrılı cerrahi veya girişimsel işlemlerde mutlaka analjeziklerle kombine edilmelidir. Doz aşımı ve derin solunum depresyonunda spesifik kompetitif antagonisti <strong>Flumazenil (Anexate)</strong>'dir.
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
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  Midazolam Farmakokinetiği (PK/PD) & Aktif Metabolit Dinamikleri
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pkOpen ? 'Gizle' : 'Detayları Gör'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Başlangıç, pik süreleri, CYP3A4 metabolizması, 1-OH aktif metabolit kümülasyonu ve bağlam duyarlı yarılanma ömrü
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
                <span className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-400">1.5 – 3 dakika</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">IV (IN/Bukkal: 3-5 dk; IM: 10 dk)</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Pik Etki (Peak Effect)</span>
                <span className="text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400">3 – 5 dakika</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">IV pik (IM: 30 dk; Oral: 45 dk)</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Tek Bolus Etki Süresi</span>
                <span className="text-base sm:text-lg font-bold text-teal-600 dark:text-teal-400">1 – 2 saat</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Hızlı doku redistribüsyonu</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Eliminasyon t½</span>
                <span className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400">1.5 – 2.5 saat</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">YBÜ'de 6-12 saate kadar uzar!</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/30 border-slate-700/50' : 'bg-purple-50/30 border-purple-100'} space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed`}>
              <h4 className="font-bold text-purple-800 dark:text-purple-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-purple-500" />
                <span>CYP3A4 Biyotranformasyonu & Aktif 1-Hidroksimidazolam Metaboliti Uyarısı</span>
              </h4>
              <p>
                <strong>Metabolizma ve Hepatik Klerens:</strong> Midazolam karaciğerde ve ince bağırsak mukozasında <strong>CYP3A4 ve CYP3A5</strong> izoenzimleri tarafından hızla metabolize edilir. İlk geçiş eliminasyonu yüksektir (oral biyoyararlanım %30–40).
              </p>
              <p>
                <strong>Aktif Metabolit Kümülasyonu:</strong> Midazolamın ana metaboliti olan <strong>1-hidroksimidazolam (1-OH-midazolam)</strong>, ana molekülün yaklaşık %50'si kadar sedatif güce sahiptir. Bu metabolit hızla glukuronidlenerek <strong>1-OH-midazolam glukuronide</strong> dönüşür ve <strong>böbrekler yoluyla atılır</strong>.
              </p>
              <p>
                <strong>Böbrek Yetmezliğinde Kritik Tuzak:</strong> Böbrek fonksiyonları bozulmuş hastalarda ve uzun süren YBÜ infüzyonlarında (&gt;48 saat) bu aktif metabolit vücutta birikir. İnfüzyon kapatılsa dahi hasta günlerce uyanamayabilir (uzamış sedasyon ve koma tablosu).
              </p>
              <p>
                <strong>Bağlam Duyarlı Yarılanma Ömrü (CSHT):</strong> Midazolam yüksek oranda lipofilik olduğu için infüzyon süresi uzadıkça periferik yağ kompartmanları doyar. 2 saatlik infüzyonda CSHT 30 dakika iken, 24 saatlik infüzyonda CSHT saatlere, günlerce süren infüzyonda ise günlere uzar.
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
              <span>Benzodiazepin Aşırı Duyarlılığı & Akut Dar Açılı Glokom</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Benzodiazepin sınıfı ilaçlara bilinen anafilaktik/alerjik duyarlılığı olanlarda ve tedavi edilmemiş <strong>akut dar açılı glokomda</strong> kontrendikedir (intraoküler basınç dinamiklerini olumsuz etkileyebilir; ancak kontrollü açık açılı glokomda kullanılabilir).
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2 mb-1.5">
              <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Ağır Dekompanse Solunum Yetmezliği (Havayolu Güvencesiz)</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Entübe olmayan, spontan soluyan ağır KOAH alevlenmesi, tip-2 hiperkapnik solunum yetmezliği veya şiddetli uyku apnesi olan hastalarda havayolu kontrolü ve ventilatör desteği hazır olmadan uygulanması kesin kontrendikedir (ani apne ve solunum arresti!).
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Miyastenia Gravis</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Midazolam santral kas gevşetici etkiye sahiptir. Miyastenia Gravis hastalarında kas güçsüzlüğünü derinleştirerek akut solunum yetmezliğine, yutma reflekslerinin kaybına ve aspirasyona neden olabileceğinden kaçınılmalıdır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Şiddetli Karaciğer Yetmezliği & Hepatik Ensefalopati</span>
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Child-Pugh Sınıf C siroz ve portosistemik şantı olan hastalarda klerens dramatik olarak çöker ve serbest fraksiyon katlanır; derin hepatik ensefalopati ve komayı tetikleyebilir.
            </p>
          </div>
        </div>
      </div>

      {/* 4. ENDİKASYONLARI VE OFF-LABEL KULLANIMLARI (GENİŞLETİLMİŞ 10 KLİNİK ALAN) */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-purple-600 dark:text-purple-400">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Endikasyonlar ve Klinik Kullanım Alanları</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
              <Syringe className="w-4 h-4 text-purple-500" />
              <span>1. Cerrahi Premedikasyon</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Ameliyat öncesi anksiyolitik, sedasyon ve cerrahiye dair anterograd amnezi sağlanması (erişkin ve pediyatrik).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>2. Prosedürel Sedasyon (MAC)</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Endoskopi, kolonoskopi, bronkoskopi, kardiyoversiyon, girişimsel radyoloji ve günübirlik cerrahide orta sedasyon.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
              <HeartPulse className="w-4 h-4 text-purple-500" />
              <span>3. YBÜ Mekanik Ventilasyon</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Yoğun bakımda mekanik ventilatördeki hastalarda derin sedasyon, senkronizasyon, ARDS veya nöromüsküler blokaj uyumu.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
              <Zap className="w-4 h-4 text-purple-500" />
              <span>4. Status & Akut Nöbet</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Akut uzamış konvülsif nöbetlerde ve status epileptikusta 1. basamak antikonvülzan (IM, İntranazal, Bukkal ve IV).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 dark:text-rose-300 mb-1">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>5. Akut Ciddi Ajitasyon</span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
              Acil servis ve YBÜ'de kendine ve çevreye zarar verme riski taşıyan şiddetli psikomotor ajitasyon ve deliryum kontrolü.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300 mb-1">
              <Skull className="w-4 h-4 text-amber-500" />
              <span>6. Toksikolojik İntoksikasyon</span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
              Kokain, metamfetamin, bonzai veya sempatomimetik aşırı dozuna bağlı adrenerjik fırtına, hipertansiyon ve taşikardide 1. basamak.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-1">
              <Wine className="w-4 h-4 text-indigo-500" />
              <span>7. Madde Çekilmesi & DT</span>
            </div>
            <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
              Alkol yoksunluk sendromu ve Deliryum Tremens'te (DT) otonomik hiperaktiviteyi, nöbeti ve ajitasyonu kontrol altına alma.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
              <Wind className="w-4 h-4 text-purple-500" />
              <span>8. RSI Ko-indüksiyonu</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Hızlı Seri Entübasyonda indüksiyon ajanı veya diğer hipnotiklerin dozunu düşürmek için ko-indüksiyon desteği.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
              <Activity className="w-4 h-4 text-purple-500" />
              <span>9. Klorokin İntoksikasyonu</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Pasteur Enstitüsü klorokin toksisite protokolü; kardiyak arrest ve ölümcül aritmileri önleyici spesifik yüksek doz tedavi.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">
              <ShieldCheck className="w-4 h-4 text-purple-500" />
              <span>10. Palyatif / Terminal Sedasyon</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              Yaşam sonu dönemdeki terminal kanser ve yoğun bakım hastalarında refrakter dispne ve anksiyetenin yatıştırılması.
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
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] text-slate-500 font-semibold italic">
              (İnfüzyonlar literatür standardı gereği mg/saat ve mg/kg/saat cinsindedir)
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-semibold">
              IV · IM · İntranazal · Bukkal · Oral
            </span>
          </div>
        </div>

        {/* KLİNİK UYGULAMA YOLLARI */}
        <div className="mb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Klinik Uygulama Yolları
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* 1. IV */}
            <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20">
              <span className="font-bold text-xs text-rose-600 dark:text-rose-400 block mb-1">
                1. İntravenöz (IV)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Akut status, YBÜ sedasyonu ve MAC için standart yol. Onset: 1-2 dk, pik: 3-5 dk. Yavaşça (en az 2 dakikada) titre edilmelidir.
              </p>
            </div>

            {/* 2. IM */}
            <div className="p-3.5 rounded-xl border border-cyan-200 dark:border-cyan-900/40 bg-cyan-50/40 dark:bg-cyan-950/20">
              <span className="font-bold text-xs text-cyan-600 dark:text-cyan-400 block mb-1">
                2. İntramüsküler (IM)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Damaryolu olmayan akut ajitasyon veya status epileptikusta deltoid veya uyluğa. Onset: 5-10 dk, biyoyararlanım &gt;%90.
              </p>
            </div>

            {/* 3. IN */}
            <div className="p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20">
              <span className="font-bold text-xs text-purple-600 dark:text-purple-400 block mb-1">
                3. İntranazal (IN - MAD)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Mukozal atomizasyon cihazı ile 5 mg/mL konsantre form kullanılır. Pediatrik nöbet ve girişimlerde kribriform plaktan hızla emilir (onset: 3-5 dk).
              </p>
            </div>

            {/* 4. Bukkal */}
            <div className="p-3.5 rounded-xl border border-sky-200 dark:border-sky-900/40 bg-sky-50/40 dark:bg-sky-950/20">
              <span className="font-bold text-xs text-sky-600 dark:text-sky-400 block mb-1">
                4. Bukkal / Sublingual
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Ağız içi mukozaya (diş eti-yanak arasına) damlatılır. Acil nöbet sonlandırmada damaryolsuz çocuk ve erişkinlerde pratik ve etkilidir.
              </p>
            </div>

            {/* 5. Oral */}
            <div className="p-3.5 rounded-xl border border-orange-200 dark:border-orange-900/40 bg-orange-50/40 dark:bg-orange-950/20">
              <span className="font-bold text-xs text-orange-600 dark:text-orange-400 block mb-1">
                5. Oral (PO) / Enteral
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Pediatrik premedikasyonda şurup veya vişne/elma suyu ile karıştırılarak (0.25–0.5 mg/kg). Biyoyararlanım: %30–40. Onset: 15–30 dk.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Akut Bolus ve İşlem Tablosu */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              1. Akut Bolus, Nöbet, Ajitasyon ve Toksikolojik Dozlama Protokolü
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                  <tr>
                    <th className="py-2 pr-4 font-semibold">Klinik Durum / Hedef</th>
                    <th className="py-2 pr-4 font-semibold">Erişkin Dozu</th>
                    <th className="py-2 pr-4 font-semibold">Uygulama Yolu</th>
                    <th className="py-2 font-semibold">Özel Klinik Uyarılar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Prosedürel Sedasyon (MAC)</td>
                    <td className="py-2.5 pr-4 font-bold text-purple-600 dark:text-purple-400">0.5 – 2.0 mg IV (Başlangıç)</td>
                    <td className="py-2.5 pr-4">Yavaş IV</td>
                    <td className="py-2.5">2 dakikada yavaşça verilir; gerekirse 2-3 dk'da bir 0.5-1 mg titre edilir (Maks 5 mg).</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Akut Ciddi Ajitasyon / Deliryum</td>
                    <td className="py-2.5 pr-4 font-bold text-rose-600 dark:text-rose-400">2.5 – 5.0 mg IV / 5.0 – 10 mg IM</td>
                    <td className="py-2.5 pr-4">IV veya IM</td>
                    <td className="py-2.5">Hasta ve personel güvenliği için acil zapturapt. 10-15 dk'da yanıt yoksa tekrarlanabilir. Yaşlıda 1-2 mg.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Sempatomimetik İntoksikasyon (Kokain/Bonzai)</td>
                    <td className="py-2.5 pr-4 font-bold text-amber-600 dark:text-amber-400">2.5 – 5.0 mg IV bolus</td>
                    <td className="py-2.5 pr-4">IV Titrasyon</td>
                    <td className="py-2.5">Adrenerjik fırtınada 1. basamak. Beta bloker KONTRENDİKE! Her 5-10 dk titre edilir.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Alkol Yoksunluğu & Deliryum Tremens</td>
                    <td className="py-2.5 pr-4 font-bold text-indigo-600 dark:text-indigo-400">2.5 – 10.0 mg IV bolus</td>
                    <td className="py-2.5 pr-4">IV Bolus</td>
                    <td className="py-2.5">CIWA-Ar skoru eşliğinde sedasyon hedeflenir. Eşzamanlı Tiamin (B1 vitamini) zorunludur.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Akut Nöbet (Hastane Öncesi)</td>
                    <td className="py-2.5 pr-4 font-bold text-rose-600 dark:text-rose-400">10 mg IM (&gt;40 kg) veya 0.2 mg/kg IN</td>
                    <td className="py-2.5 pr-4">IM veya IN MAD</td>
                    <td className="py-2.5">Damar yolu yoksa uyluğa IM veya buruna MAD ile verilir. 5-10 dk sonra 1 kez tekrarlanabilir.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Klorokin Toksisitesi (Pasteur Protokolü)</td>
                    <td className="py-2.5 pr-4 font-bold text-teal-600 dark:text-teal-400">0.1 mg/kg IV yükleme</td>
                    <td className="py-2.5 pr-4">IV İnfüzyon</td>
                    <td className="py-2.5">15 dakikada yüklenir, ardından 0.4 mg/kg/saat veya 10-20 mg/saat infüzyona geçilir.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-semibold text-slate-900 dark:text-slate-100">Flumazenil (Antidot Reversali)</td>
                    <td className="py-2.5 pr-4 font-bold text-emerald-600 dark:text-emerald-400">0.2 mg IV (Başlangıç)</td>
                    <td className="py-2.5 pr-4">Yavaş IV</td>
                    <td className="py-2.5">30 saniyede verilir; yanıt yoksa 60 saniyede bir 0.1 mg eklenir (Maks 1.0 mg). Min 2 saat takip şart!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sürekli İnfüzyon Rejimleri (SADECE mg/saat ve mg/kg/saat) */}
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              2. Sürekli İnfüzyon Rejimleri (Literatür Standardı: mg/saat & mg/kg/saat)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-purple-700 dark:text-purple-300 block mb-1">YBÜ Sedasyon İdamesi</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  • Sabit Hız: <DoseHover doseText="1.0 – 5.0 mg/saat" equivText="0.015 – 0.07 mg/kg/saat (70 kg)" /><br />
                  • Kilo Başı Doz: <DoseHover doseText="0.02 – 0.08 mg/kg/saat" equivText="1.4 – 5.6 mg/saat (70 kg)" /><br />
                  • Güvenlik Tavanı: <DoseHover doseText="Maks ≤ 0.20 mg/kg/saat" equivText="Maks ≤ 14 mg/saat (70 kg)" /><br />
                  • Günlük sedasyon tatili (SAT) uygulanmalıdır.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">Refrakter Status Epileptikus</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  • Yükleme: <strong>0.2 mg/kg</strong> IV bolus<br />
                  • İdame Hızı: <DoseHover doseText="3.5 – 70.0 mg/saat" equivText="0.05 – 1.00 mg/kg/saat (70 kg)" /><br />
                  • Refrakter Zirve: <DoseHover doseText="Maks 2.00 mg/kg/saat" equivText="Maks 140 mg/saat (70 kg)" /><br />
                  • Sürekli EEG ve invaziv arter basıncı takibi.
                </p>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'}`}>
                <span className="font-bold text-indigo-700 dark:text-indigo-300 block mb-1">Refrakter Deliryum Tremens & Toksisite</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  • DT İnfüzyon Hızı: <DoseHover doseText="2.5 – 18.0 mg/saat" equivText="0.04 – 0.25 mg/kg/saat (70 kg)" /><br />
                  • Sempatomimetik Kriz: <DoseHover doseText="2.0 – 10.0 mg/saat" equivText="0.03 – 0.15 mg/kg/saat (70 kg)" /><br />
                  • Klorokin İnfüzyonu: <DoseHover doseText="10.0 – 25.0 mg/saat" equivText="0.15 – 0.40 mg/kg/saat (70 kg)" /><br />
                  • Otonomik fırtına dinene kadar titre edilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. İNTERAKTİF DOZ HESAPLAYICISI VE İNFÜZYON POMPASI (DOZ REJİMLERİNDEN HEMEN SONRA) */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900 border-purple-500/40 text-slate-100 shadow-xl'
            : 'bg-white border-purple-500/50 text-slate-900 shadow-lg'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Midazolam Çok Yollu Doz Hesaplayıcısı & İnfüzyon Pompası
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-700 dark:text-purple-300 font-mono">
                  mg/saat & mg/kg/saat
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sürekli infüzyon perfüzörü, akut nöbet, ciddi ajitasyon, intoksikasyonlar, alkol yoksunluğu ve flumazenil antidot takibi
              </p>
            </div>
          </div>
        </div>

        {/* Hesaplayıcı Araç Sekmeleri */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => setActiveCalcTool('continuous_infusion')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'continuous_infusion'
                ? isDark ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-600 text-white shadow-md'
                : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>1. Sürekli İnfüzyon Pompası (mg/saat ↔ mg/kg/saat)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('agitation_intox_withdrawal')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'agitation_intox_withdrawal'
                ? isDark ? 'bg-rose-600 text-white shadow-md' : 'bg-rose-600 text-white shadow-md'
                : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>2. Akut Ciddi Ajitasyon, İntoksikasyon & Madde Çekilmesi</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('seizure_rescue')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'seizure_rescue'
                ? isDark ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-600 text-white shadow-md'
                : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>3. Akut Nöbet & Status (IM / IN / Bukkal / IV)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('procedural_sedation')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'procedural_sedation'
                ? isDark ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-600 text-white shadow-md'
                : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. Prosedürel Sedasyon (MAC) & Premedikasyon</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('cumulation_risk')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'cumulation_risk'
                ? isDark ? 'bg-amber-600 text-white shadow-md' : 'bg-amber-600 text-white shadow-md'
                : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>5. Kümülasyon & 1-OH Metabolit Riski</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('flumazenil_antidote')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'flumazenil_antidote'
                ? isDark ? 'bg-emerald-600 text-white shadow-md' : 'bg-emerald-600 text-white shadow-md'
                : isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>6. Flumazenil Antidotu & Re-sedasyon Monitörü</span>
          </button>
        </div>

        {/* Ortak Hasta Parametreleri Barı */}
        <div className={`mt-4 p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div>
              <label htmlFor={weightInputId} className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Hasta Vücut Ağırlığı (kg):
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={weightInputId}
                  type="number"
                  min={3}
                  max={250}
                  step={1}
                  value={weightKg}
                  onChange={(e) => {
                    const newW = Math.max(1, Number(e.target.value));
                    setWeightKg(newW);
                    if (infusionUnit === 'mg_hr') {
                      setTargetDoseMgKgHr(Number((targetDoseMgHr / newW).toFixed(3)));
                    } else {
                      setTargetDoseMgHr(Number((targetDoseMgKgHr * newW).toFixed(1)));
                    }
                  }}
                  className={`w-full px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                    isDark ? 'bg-slate-900 border-slate-700 text-purple-400' : 'bg-white border-slate-300 text-purple-700'
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
                <option value="healthy_adult">Sağlıklı Erişkin (18–60 yaş)</option>
                <option value="elderly_frail">Geriatrik / Kırılgan (&gt;65 yaş / ASA III-IV)</option>
                <option value="pediatric">Pediatrik Hasta</option>
                <option value="morbid_obese">Morbid Obezite (Geniş Vd)</option>
              </select>
            </div>

            <div>
              <label htmlFor={prepSelectId} className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                İnfüzyon Çözelti Derişimi:
              </label>
              <select
                id={prepSelectId}
                value={prepType}
                onChange={(e) => setPrepType(e.target.value as any)}
                className={`w-full px-3 py-1.5 rounded-lg border font-bold text-xs ${
                  isDark ? 'bg-slate-900 border-slate-700 text-purple-400' : 'bg-white border-slate-300 text-purple-700'
                }`}
              >
                <option value="standard_1">Standart: 1.0 mg/mL (50 mg / 50 mL SF)</option>
                <option value="concentrated_2">Konsantre: 2.0 mg/mL (100 mg / 50 mL SF)</option>
                <option value="undiluted_5">Saf Ampul: 5.0 mg/mL (Seyreltilmemiş)</option>
              </select>
            </div>
          </div>
        </div>

        {/* SEKME 1: SÜREKLİ IV İNFÜZYON POMPASI (SADECE mg/saat & mg/kg/saat) */}
        {activeCalcTool === 'continuous_infusion' && (
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
                    value={infusionIndication}
                    onChange={(e) => handleIndicationChange(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-lg border font-semibold text-xs ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="icu_light_sedation">YBÜ Hafif / Kooperatif Sedasyon (1–5 mg/saat · 0.02–0.08 mg/kg/saat)</option>
                    <option value="icu_deep_sedation">YBÜ Derin Sedasyon & ARDS (4–15 mg/saat · 0.06–0.20 mg/kg/saat)</option>
                    <option value="refractory_status">Refrakter Status Epileptikus (3.5–70 mg/saat · 0.05–1.00 mg/kg/saat)</option>
                    <option value="refractory_dt_withdrawal">Refrakter Deliryum Tremens & Alkol Yoksunluğu (2.5–18 mg/saat)</option>
                    <option value="sympathomimetic_infusion">Sempatomimetik İntoksikasyon Kriz İnfüzyonu (2–10 mg/saat)</option>
                    <option value="palliative_agitation">Palyatif & Terminal Sedasyon (0.5–3 mg/saat)</option>
                    <option value="custom">Özel Titrasyon Rejimi</option>
                  </select>

                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                    <span className="font-semibold">Önerilen Hedef Aralık:</span>
                    <DoseHover
                      doseText={INFUSION_PRESETS[infusionIndication].rangeMgHrText}
                      equivText={`${INFUSION_PRESETS[infusionIndication].rangeMgKgHrText} (${weightKg} kg için)`}
                      badge
                    />
                  </div>
                </div>

                {/* Doz Birimi ve İnput (SADECE mg/saat ve mg/kg/saat) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor={doseInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Hedef İnfüzyon Dozu:
                    </label>
                    <div className="flex items-center gap-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setInfusionUnit('mg_hr')}
                        className={`px-2.5 py-1 rounded cursor-pointer font-bold ${
                          infusionUnit === 'mg_hr'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        mg / saat (Sabit Debi)
                      </button>
                      <button
                        type="button"
                        onClick={() => setInfusionUnit('mg_kg_hr')}
                        className={`px-2.5 py-1 rounded cursor-pointer font-bold ${
                          infusionUnit === 'mg_kg_hr'
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        mg / kg / saat (Ağırlığa Göre)
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      id={doseInputId}
                      type="number"
                      min={0.01}
                      max={150}
                      step={infusionUnit === 'mg_hr' ? 0.5 : 0.01}
                      value={infusionUnit === 'mg_hr' ? targetDoseMgHr : targetDoseMgKgHr}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (infusionUnit === 'mg_hr') {
                          handleMgHrChange(val);
                        } else {
                          handleMgKgHrChange(val);
                        }
                      }}
                      className={`w-full px-3 py-2 rounded-lg border font-mono font-bold text-base ${
                        isDark ? 'bg-slate-900 border-slate-700 text-purple-400' : 'bg-white border-slate-300 text-purple-700'
                      }`}
                    />
                    <div className="shrink-0 font-bold font-mono text-xs text-slate-600 dark:text-slate-300">
                      {infusionUnit === 'mg_hr' ? 'mg / saat' : 'mg / kg / sa'}
                    </div>
                  </div>

                  {/* Canlı Dönüşüm Barı */}
                  <div className="mt-2 p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-700 dark:text-slate-300 font-sans font-medium">
                      Eşdeğer Doz ({weightKg} kg için):
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-purple-700 dark:text-purple-300">
                        {calculatedDoseMgHr.toFixed(1)} mg/saat
                      </span>
                      <span>=</span>
                      <span className="font-bold text-indigo-700 dark:text-indigo-300">
                        {calculatedDoseMgKgHr.toFixed(3)} mg/kg/saat
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-2.5 rounded-lg border text-[11px] ${
                  isDark ? 'bg-slate-900/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  <span className="font-bold text-purple-600 dark:text-purple-400">Protokol Notu: </span>
                  {INFUSION_PRESETS[infusionIndication].note}
                </div>
              </div>

              {/* Sağ: Pompa Hızı ve Kümülasyon Çıktı Kartları */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border text-center ${
                  isDark ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50 border-purple-200'
                }`}>
                  <span className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider block">
                    İnfüzyon Pompası Hızı (Perfüzör Debisi)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-purple-600 dark:text-purple-400 my-1">
                    {infusionRateMlHr.toFixed(1)} <span className="text-lg font-bold">mL / saat</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 font-mono flex items-center justify-center gap-2 flex-wrap">
                    <span>Saatlik Doz: <strong>{calculatedDoseMgHr.toFixed(1)} mg / saat</strong></span>
                    <span>·</span>
                    <span>({calculatedDoseMgKgHr.toFixed(3)} mg/kg/saat)</span>
                    <span>·</span>
                    <span>~{dropsPerMin.toFixed(0)} gtt/dk</span>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">24 Saatlik Toplam İlaç Dozu:</span>
                    <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm">
                      {dailyTotalDoseMg.toFixed(1)} mg / gün
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Literatürde infüzyon dozu stabil klinik sedasyon için saatlik mg olarak ayarlanır. &gt;48 saat süren infüzyonlarda kümülasyon artar; her sabah mutlaka <strong>SAT (Sedasyon Tatili)</strong> uygulanmalıdır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 2: AKUT CİDDİ AJİTASYON, İNTOKSİKASYONLAR & MADDE ÇEKİLMESİ (ÖZEL KLİNİK MODÜL) */}
        {activeCalcTool === 'agitation_intox_withdrawal' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <label htmlFor={specialScenarioId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Özel Acil Endikasyon Senaryosu:
                  </label>
                  <select
                    id={specialScenarioId}
                    value={specialScenario}
                    onChange={(e) => setSpecialScenario(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-lg border font-bold text-xs ${
                      isDark ? 'bg-slate-900 border-slate-700 text-rose-400' : 'bg-white border-slate-300 text-rose-700'
                    }`}
                  >
                    <option value="acute_severe_agitation">1. Akut Ciddi Ajitasyon & Şiddetli Psikomotor Eksitasyon</option>
                    <option value="sympathomimetic_toxicity">2. Toksikolojik Acil: Sempatomimetik İntoksikasyon (Kokain, Bonzai, Metamfetamin)</option>
                    <option value="alcohol_withdrawal_dt">3. Madde Çekilmesi: Alkol Yoksunluğu & Deliryum Tremens (DT)</option>
                    <option value="chloroquine_toxicity">4. Toksikolojik Acil: Klorokin / Hidroksiklorokin Ağır Toksisitesi</option>
                  </select>
                </div>

                {specialScenario === 'acute_severe_agitation' && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Uygulama Yolu:</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setAgitationRoute('iv')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          agitationRoute === 'iv' ? 'bg-rose-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        İntravenöz (IV) Titrasyon
                      </button>
                      <button
                        type="button"
                        onClick={() => setAgitationRoute('im')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          agitationRoute === 'im' ? 'bg-rose-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        İntramusküler (IM) Acil Zapturapt
                      </button>
                    </div>
                  </div>
                )}

                {specialScenario === 'alcohol_withdrawal_dt' && (
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Yoksunluk Şiddeti (CIWA-Ar):</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCiwaSeverity('mild_moderate')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          ciwaSeverity === 'mild_moderate' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Orta-Şiddetli Yoksunluk (CIWA-Ar 15–20)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCiwaSeverity('severe_dt')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                          ciwaSeverity === 'severe_dt' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        Refrakter Deliryum Tremens (CIWA-Ar &gt; 20)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sağ: Klinik Protokol Çıktısı */}
              <div className="space-y-3">
                {specialScenario === 'acute_severe_agitation' && (
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'
                  }`}>
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block">
                      Akut Ajitasyon Doz Rejimi
                    </span>
                    <div className="text-3xl font-black font-mono text-rose-600 dark:text-rose-400 my-1">
                      {agitationRoute === 'iv' 
                        ? (patientProfile === 'elderly_frail' ? '1.0 – 2.0 mg IV' : '2.5 – 5.0 mg IV')
                        : (patientProfile === 'elderly_frail' ? '2.5 – 5.0 mg IM' : '5.0 – 10.0 mg IM')}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {agitationRoute === 'iv' 
                        ? '2 dakikada yavaş IV verilir. 5–10 dakika beklenir; sakinleşme sağlanamazsa 2.5 mg tekrar titre edilir.'
                        : 'Damar yolu olmayan ajite hastada 5 mg/mL konsantre formdan uyluğa (IM) enjekte edilir. 10–15 dakikada belirgin sedasyon sağlar.'}
                    </p>
                  </div>
                )}

                {specialScenario === 'sympathomimetic_toxicity' && (
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1 text-amber-800 dark:text-amber-300">
                      <Skull className="w-4 h-4 text-amber-500" />
                      <span>Sempatomimetik Toksidrom Yönetimi (Kokain / Metamfetamin / Bonzai)</span>
                    </div>
                    <div className="text-2xl font-black font-mono text-amber-700 dark:text-amber-400 my-1">
                      2.5 – 5.0 mg IV Bolus (Her 5–10 dk)
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <strong>Hayati Kural:</strong> Kokain ve metamfetamin taşikardisinde <strong>BETA BLOKERLER KESİNLİKLE KONTRENDİKEDİR!</strong> (Karşılanmamış alfa reseptör stimülasyonu ölümcül koroner vazospazma ve hipertansif krize yol açar).
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                      Tedavide tek başına midazolam sempatik deşarjı kırar, kan basıncını ve nabzı düşürür, rabdomiyoliz ve hipertermiyi engeller. Dirençli olguda <strong>2 – 10 mg/saat sürekli infüzyona</strong> geçilir.
                    </p>
                  </div>
                )}

                {specialScenario === 'alcohol_withdrawal_dt' && (
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1 text-indigo-800 dark:text-indigo-300">
                      <Wine className="w-4 h-4 text-indigo-500" />
                      <span>Alkol Yoksunluğu & Deliryum Tremens (DT) Protokolü</span>
                    </div>
                    <div className="text-2xl font-black font-mono text-indigo-700 dark:text-indigo-400 my-1">
                      {ciwaSeverity === 'mild_moderate' ? '2.5 – 5.0 mg IV (15 dk arayla)' : '5 – 10 mg IV Bolus + 3 – 15 mg/saat İnfüzyon'}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Deliryum tremens mortalitesi %15'e ulaşabilen bir acildir. CIWA-Ar skoru &gt; 15 ise semptom odaklı agresif midazolam titrasyonu uygulanır.
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                      <strong>Zorunlu Kombinasyon:</strong> Wernicke-Korsakoff ensefalopatisini önlemek için glukozlu mayilerden önce mutlaka <strong>100 – 500 mg Tiamin (B1 Vitamini) IV</strong> uygulanmalıdır.
                    </p>
                  </div>
                )}

                {specialScenario === 'chloroquine_toxicity' && (
                  <div className={`p-4 rounded-xl border ${
                    isDark ? 'bg-teal-500/10 border-teal-500/30 text-teal-200' : 'bg-teal-50 border-teal-200 text-teal-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold text-xs mb-1 text-teal-800 dark:text-teal-300">
                      <ShieldCheck className="w-4 h-4 text-teal-500" />
                      <span>Klorokin / Hidroksiklorokin Kardiyotoksisite Protokolü</span>
                    </div>
                    <div className="text-2xl font-black font-mono text-teal-700 dark:text-teal-400 my-1">
                      0.1 mg/kg Yükleme + 10 – 20 mg/saat İnfüzyon
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Pasteur Enstitüsü ve Fransız yoğun bakım kılavuzlarında kanıtlanmış protokoldür. Erken mekanik ventilasyon, epinefrin infüzyonu ve yüksek doz midazolam eşzamanlı başlandığında kardiyak ileti bloklarını ve ölümcül ventriküler aritmileri dramatik olarak azaltır.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEKME 3: AKUT NÖBET & STATUS EPİLEPTİKUS KURTARMA */}
        {activeCalcTool === 'seizure_rescue' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <label htmlFor={seizureRouteId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Uygulama Yolu (Acil Kurtarma):
                  </label>
                  <select
                    id={seizureRouteId}
                    value={seizureRoute}
                    onChange={(e) => setSeizureRoute(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-lg border font-bold text-xs ${
                      isDark ? 'bg-slate-900 border-slate-700 text-purple-400' : 'bg-white border-slate-300 text-purple-700'
                    }`}
                  >
                    <option value="im">İntramusküler (IM) — Hastane Öncesi Altın Standart</option>
                    <option value="intranasal">İntranazal (IN) — MAD Atomizör ile İğnesiz</option>
                    <option value="buccal">Bukkal — Yanak İçi Mukozal Emilim</option>
                    <option value="iv_bolus">İntravenöz (IV) — Damar Yolu Varsa Yavaş Titrasyon</option>
                  </select>
                </div>

                <div className={`p-3 rounded-lg border text-xs ${
                  isDark ? 'bg-slate-900/80 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Uygulama Tekniği:</span>
                  <p>{seizureResult.notes}</p>
                </div>
              </div>

              {/* Sağ: Hesaplanan Nöbet Dozu */}
              <div className="space-y-3">
                <div className={`p-4 rounded-xl border text-center ${
                  isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'
                }`}>
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block">
                    Uygulanacak Tek Kurtarma Dozu
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-rose-600 dark:text-rose-400 my-1">
                    {seizureResult.mg.toFixed(1)} <span className="text-lg font-bold">mg</span>
                  </div>
                  <div className="text-sm font-bold font-mono text-slate-700 dark:text-slate-300">
                    Gereken Çözelti Hacmi: <span className="text-rose-600 dark:text-rose-400">{seizureResult.ml.toFixed(1)} mL</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {seizureRoute === 'iv_bolus' ? '1 mg/mL solüsyondan verilir' : '5 mg/mL konsantre ampul kullanılır'}
                  </span>
                </div>

                <div className={`p-3 rounded-lg border text-xs ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">Tekrarlama Kuralı:</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-snug">
                    Nöbet 5–10 dakika içinde durmazsa aynı doz <strong>yalnızca 1 kez daha</strong> tekrarlanabilir. Hala nöbet sürüyorsa 2. basamak antiepileptiklere (Levetirasetam, Fenitoin/Fosfenitoin, Valproat) geçilmelidir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 4: PROSEDÜREL SEDASYON & PREMEDİKASYON */}
        {activeCalcTool === 'procedural_sedation' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div>
                  <label htmlFor={psaGoalId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    İşlem / Premedikasyon Amacı:
                  </label>
                  <select
                    id={psaGoalId}
                    value={psaGoal}
                    onChange={(e) => setPsaGoal(e.target.value as any)}
                    className={`w-full px-3 py-2 rounded-lg border font-semibold text-xs ${
                      isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-300 text-slate-800'
                    }`}
                  >
                    <option value="light_procedural">Erişkin Prosedürel Sedasyon (Endoskopi / Kolonoskopi)</option>
                    <option value="premed_adult">Erişkin Cerrahi Premedikasyon (IV / IM)</option>
                    <option value="premed_pediatric_oral">Pediyatrik Oral Premedikasyon Şurubu (0.5 mg/kg)</option>
                    <option value="premed_pediatric_in">Pediyatrik İntranazal Premedikasyon (0.2 mg/kg)</option>
                  </select>
                </div>

                <div className={`p-3 rounded-lg border text-xs ${
                  isDark ? 'bg-slate-900/60 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">Klinik Titrasyon Kuralı:</span>
                  {psaGoal === 'light_procedural' && (
                    <p>Başlangıçta 0.5–1.0 mg IV yavaşça (2 dakikada) verilir. 2–3 dakika beklenir; konuşma yavaşlayıp ptozis başlayana kadar her 2 dakikada bir 0.5–1.0 mg eklenir. Yaşlıda maks 2.0–3.0 mg, gençte maks 5.0 mg.</p>
                  )}
                  {psaGoal === 'premed_adult' && (
                    <p>Ameliyathaneye girmeden 10-15 dk önce 1.0–2.0 mg IV verilir. Yaşlı ve kırılgan hastalarda 0.5 mg ile başlanmalı ve hasta tek başına bırakılmamalıdır.</p>
                  )}
                  {psaGoal === 'premed_pediatric_oral' && (
                    <p>0.5 mg/kg oral şurup (maks 20 mg), tadı acı olduğu için meyve suyu/elma püresi ile karıştırılabilir. 20-30 dakika içinde ebeveynden kolayca ayrılmayı sağlar.</p>
                  )}
                  {psaGoal === 'premed_pediatric_in' && (
                    <p>0.2 mg/kg intranazal (maks 10 mg) 5 mg/mL konsantre formdan verilir. 10-15 dakikada hızlı amnezi ve anksiyoliz sağlar.</p>
                  )}
                </div>
              </div>

              {/* Çıktı */}
              <div className={`p-4 rounded-xl border text-center flex flex-col justify-center ${
                isDark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
              }`}>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                  Önerilen Başlangıç / Hedef Dozu
                </span>
                <div className="text-3xl font-black font-mono text-indigo-600 dark:text-indigo-400 my-1">
                  {psaGoal === 'light_procedural' && (patientProfile === 'elderly_frail' ? '0.5 – 1.0 mg' : '1.0 – 2.0 mg')}
                  {psaGoal === 'premed_adult' && (patientProfile === 'elderly_frail' ? '0.5 – 1.0 mg' : '1.5 – 2.5 mg')}
                  {psaGoal === 'premed_pediatric_oral' && `${Math.min(20, Number((weightKg * 0.5).toFixed(1)))} mg Oral`}
                  {psaGoal === 'premed_pediatric_in' && `${Math.min(10, Number((weightKg * 0.2).toFixed(1)))} mg IN`}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {psaGoal.includes('pediatric') ? `Ağırlığa (${weightKg} kg) göre sınırlandırılmış güvenli doz` : 'Yaş ve kırılganlık durumuna göre titre edilir'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 5: KÜMÜLASYON & 1-OH METABOLİT RİSKİ */}
        {activeCalcTool === 'cumulation_risk' && (
          <div className="mt-4 space-y-4">
            <div className={`p-4 rounded-xl border ${
              cumScore >= 5
                ? isDark ? 'bg-rose-500/15 border-rose-500/40' : 'bg-rose-50 border-rose-300'
                : cumScore >= 3
                ? isDark ? 'bg-amber-500/15 border-amber-500/40' : 'bg-amber-50 border-amber-300'
                : isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Midazolam Kümülasyonu & Uzamış Sedasyon Risk Monitörü
                  </h4>
                </div>
                <span className={`text-xs font-black uppercase px-2.5 py-1 rounded-md font-mono ${
                  cumScore >= 5
                    ? 'bg-rose-500 text-white'
                    : cumScore >= 3
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-emerald-500 text-white'
                }`}>
                  {cumScore >= 5 ? 'YÜKSEK BİRİKİM RİSKİ' : cumScore >= 3 ? 'ORTA BİRİKİM RİSKİ' : 'DÜŞÜK RİSK'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={cumEgfrId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Hasta eGFR Düzeyi (mL/dk):
                  </label>
                  <input
                    id={cumEgfrId}
                    type="number"
                    min={5}
                    max={150}
                    step={1}
                    value={cumEgfr}
                    onChange={(e) => setCumEgfr(Number(e.target.value))}
                    className={`w-full px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                      cumEgfr < 30 ? 'border-rose-500 text-rose-600 bg-rose-500/10' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    Aktif 1-OH-midazolam glukuronid böbreklerden atılamaz (eGFR &lt; 30'da birikir!).
                  </span>
                </div>

                <div>
                  <label htmlFor={cumDurationId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Sürekli İnfüzyon Süresi (Gün):
                  </label>
                  <input
                    id={cumDurationId}
                    type="number"
                    min={1}
                    max={30}
                    step={1}
                    value={cumDurationDays}
                    onChange={(e) => setCumDurationDays(Number(e.target.value))}
                    className={`w-full px-3 py-1.5 rounded-lg border font-mono font-bold text-sm ${
                      cumDurationDays >= 3 ? 'border-amber-500 text-amber-600 bg-amber-500/10' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  />
                  <span className="text-[11px] text-slate-500 block mt-1">
                    &gt; 48-72 saat sonra CSHT (bağlam duyarlı yarı ömür) katlanarak uzar.
                  </span>
                </div>
              </div>

              {/* Risk Faktörleri */}
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasHepaticImpairment}
                    onChange={(e) => setHasHepaticImpairment(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Karaciğer Fonksiyon Bozukluğu / Siroz (CYP3A4 klerensi düşük)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCoAdministeredCyp3a4Inhibitor}
                    onChange={(e) => setIsCoAdministeredCyp3a4Inhibitor(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span>Eşzamanlı Güçlü CYP3A4 İnhibitörü (Klaritromisin, Flukonazol vb.)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 6: FLUMAZENİL ANTİDOTU & RE-SEDASYON MONİTÖRÜ */}
        {activeCalcTool === 'flumazenil_antidote' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Flumazenil (Anexate) Titrasyon Protokolü</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Benzodiazepinlerin GABA-A reseptöründeki bağlanma bölgesini kompetitif olarak bloke eder. Bilinç kaybını ve solunum depresyonunu saniyeler içinde geri çevirir.
                </p>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Adım 1 (Başlangıç):</span>
                    <span>0.2 mg IV 15-30 saniyede yavaşça verilir.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Adım 2 (Titrasyon):</span>
                    <span>60 saniye içinde istenen bilinç düzeyine ulaşılmazsa her 60 saniyede bir 0.1 mg eklenir (Maksimum kümülatif doz: 1.0 mg; yoğun bakımda nadiren 2.0 mg).</span>
                  </div>
                </div>
              </div>

              {/* Sağ: Re-sedasyon Tuzağı Uyarısı */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-rose-500/15 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
              } space-y-2.5`}>
                <div className="flex items-center gap-2 font-bold text-xs text-rose-800 dark:text-rose-300">
                  <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>HAYATİ UYARI: Re-Sedasyon ve Solunum Arresti Tuzağı</span>
                </div>
                <p className="text-xs leading-relaxed">
                  Flumazenilin eliminasyon yarılanma ömrü son derece kısadır (<strong>40 – 80 dakika</strong>). Midazolamın yarı ömrü ise <strong>1.5 – 3 saat</strong> (yağda birikmişse saatlercedir).
                </p>
                <p className="text-xs leading-relaxed font-semibold">
                  Flumazenil reseptörden ayrıldığında dokulardan salınan midazolam reseptörü yeniden işgal eder! Hasta uyandıktan 40-60 dakika sonra ANİDEN TEKRAR KOMA VE SOLUNUM ARRESTİNE GİREBİLİR!
                </p>
                <div className="p-2 rounded-lg bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold text-center">
                  Flumazenil verilen hasta EN AZ 2 SAAT yakın monitörizasyonda tutulmalıdır!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 7. BÖBREK YETMEZLİĞİNDE DOZ REVİZYONU */}
      <div
        className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4 text-cyan-600 dark:text-cyan-400">
          <Droplet className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Böbrek Yetmezliğinde Doz Revizyonları (Renal Profil & Metabolit Riski)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">GFR Düzeylerine Göre</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • <strong>GFR &gt; 50 mL/dk:</strong> Standart doz kullanılır.<br />
              • <strong>GFR 10–50 mL/dk:</strong> Başlangıç dozu aynı; ancak idame infüzyon dozu <strong>%25–50 azaltılır</strong>.<br />
              • <strong>GFR &lt; 10 mL/dk:</strong> İdame infüzyon %50 azaltılır, mümkünse aralıklı bolus tercih edilir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Haftada 3 Gün Hemodiyaliz (HD)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • <strong>Doz ayarı:</strong> İnfüzyon dozu %50 azaltılır.<br />
              • Midazolam (%97 protein bağlı) ve aktif metaboliti <strong>hemodiyalizle temizlenemez</strong>.<br />
              • Diyaliz sonrası ek doza gerek yoktur.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Periton Diyalizi (PD)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • <strong>Doz ayarı:</strong> %50 doz kısıtlaması.<br />
              • Peritoneal klerensi ihmal edilebilir.<br />
              • Aktif glukuronid metaboliti birikeceği için derin sedasyon ve uzamış uyanma yakından izlenir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">Sürekli Renal Replasman (CRRT)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-snug">
              • CVVH / CVVHD filtrelerinden çok düşük oranda geçer.<br />
              • Sürekli infüzyonda <strong>RASS hedefli mikro-titrasyon</strong> yapılmalı, gereksiz infüzyon uzatılmamalıdır.
            </p>
          </div>
        </div>
      </div>

      {/* 8. KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONU */}
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
              • <strong>Doz %20–25 azaltılabilir</strong> veya standart doz yavaş titre edilir.<br />
              • Hepatik kan akımındaki hafif düşüş eliminasyonu minimal geciktirir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1 text-sm">
              Child-Pugh Sınıf B (Orta: 7–9 Puan)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Doz %50 azaltılmalıdır.</strong><br />
              • Yarı ömrü 2-3 katına çıkar. Hipoalbüminemi nedeniyle serbest (aktif) midazolam fraksiyonu belirgin artar.<br />
              • Titrasyon aralıkları en az 5-10 dakikaya uzatılmalıdır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1 text-sm">
              Child-Pugh Sınıf C (Şiddetli: 10–15 Puan)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Mümkünse KESİNLİKLE KAÇINILMALIDIR.</strong><br />
              • Klerens dramatik çöker; hepatik ensefalopatiyi presipite eder veya maskeler.<br />
              • Mutlak zorunluluk varsa başlangıç dozu <strong>%70–75 azaltılmalı</strong> (0.25-0.5 mg fraksiyonlar halinde) verilmelidir.
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
              • <strong>Kategori:</strong> FDA Kategori D (TGA Kategori C).<br />
              • <strong>1. Trimester Riski:</strong> Erken gebelikte BZD maruziyeti yarık dudak/damak ve konjenital malformasyon riskinde hafif artışla ilişkilendirilmiştir; 1. trimesterde elektif girişimlerde kesinlikle kaçınılmalıdır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              2. Plasental Geçiş, Doğum &amp; "Floppy Infant"
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Yüksek Plasental Geçiş:</strong> Plasentayı saniyeler içinde geçer (fetal/maternal oranı ~0.8).<br />
              • <strong>Neonatal Hipotoni Sendromu:</strong> Doğumdan hemen önce (&lt;2-4 saat) yüksek doz uygulandığında yenidoğanda solunum depresyonu, hipotoni ("gevşek bebek / floppy infant"), hipotermi ve emme güçlüğü gelişebilir.<br />
              • <strong>Sezaryen Yönetimi:</strong> Bebek doğurtulana kadar midazolam verilmemeli; doğum sonrası anksiyete ve amnezi için anneye 1-2 mg IV titre edilebilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              3. Laktasyon, Anne Sütü &amp; Emzirme Güvenliği
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Süte Minimum Geçiş:</strong> Anne sütüne geçen miktar ihmal edilebilir düzeydedir (relatif infant dozu RID &lt; %1).<br />
              • <strong>Emzirmeye Dönüş:</strong> Tek bir cerrahi/sedasyon dozu sonrasında anne tamamen uyanıp kendine geldiğinde (genellikle 4 saat sonra) doğrudan emzirebilir.<br />
              • <strong>"Pump &amp; Dump" Gerekmez:</strong> Tek doz sonrasında sütün sağılıp dökülmesine gerek yoktur; tekrarlayan dozlarda bebek sedasyon ve emme güçlüğü açısından izlenmelidir.
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
          <h2 className="text-base sm:text-lg font-bold">Midazolama Özel Önemli Olumsuz Etkiler (Adverse Effects)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              1. Solunum Depresyonu & Sinerjistik Apne
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Dozla ilişkili hipoventilasyon ve apne yapar. Özellikle <strong>opioidlerle birlikte verildiğinde</strong> solunum depresyonu riski 4 katına çıkar.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              2. Paradoksal Eksitasyon (%1–2)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Özellikle çocuklarda ve yaşlılarda sedasyon yerine ajitasyon, öfke patlaması, hiperaktivite ve disinhibisyon gelişebilir. Ek BZD verilmemelidir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              3. Uzamış Sedasyon ve Kümülasyon
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              YBÜ'de 48 saatten uzun süren infüzyonlarda yağda birikim ve böbrek fonksiyonları bozuksa 1-OH aktif metabolit birikimi nedeniyle uyanma günlerce gecikebilir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              4. Hipotansiyon & Vazodilatasyon
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sistemik vasküler direnci düşürür. Hipovolemik, kardiyak rezervi kısıtlı veya sepsisli hastalarda ani hipotansiyon ve hemodinamik bozulma yapabilir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
              5. Yoksunluk & Deliryum Riski
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Uzun süreli YBÜ infüzyonundan sonra aniden kesilirse şiddetli yoksunluk (taşikardi, terleme, konvülsiyon) ve yoğun bakım deliryumunu presipite eder.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">
              6. Belirgin Anterograd Amnezi
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              İlacın verilmesinden itibaren hastalar olayları hafızaya kaydedemez. Cerrahi ve girişimsel konfor için avantajken, işlem sonrası hasta bilgilendirmesi yazılı yapılmalıdır.
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
        <div className="flex items-center gap-2.5 mb-4 text-purple-600 dark:text-purple-400">
          <Info className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">Klinisyenin İlaca ve Belirli Klinik Durumlara Göre Dikkat Etmesi Gerekenler</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <Skull className="w-4 h-4 text-amber-500" />
              <span>Sempatomimetik Krizde Beta Bloker Yasağı</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Kokain, amfetamin veya bonzai intoksikasyonuna bağlı hipertansiyon ve taşikardide <strong>asla tek başına beta bloker (örn. propranolol, metoprolol, esmolol) verilmemelidir</strong>. Beta blokaj periferik damarlardaki vazodilatatör beta-2 reseptörleri bloke ederek alfa-1 aracılı şiddetli vazokonstriksiyonu maskesiz bırakır (unopposed alpha stimulation) ve ölümcül miyokard enfarktüsü veya serebral kanamaya yol açabilir. <strong>İlk tercih agresif Midazolam titrasyonudur.</strong>
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
              <Wine className="w-4 h-4 text-indigo-500" />
              <span>Alkol Yoksunluğunda Wernicke Profilaksisi</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ağır alkol yoksunluğu ve deliryum tremens tedavisinde midazolam agresif şekilde titre edilirken, geri dönüşümsüz beyin hasarını (Wernicke-Korsakoff Sendromu) önlemek amacıyla <strong>herhangi bir dekstrozlu/glukozlu sıvı verilmeden önce mutlaka 100–500 mg parenteral Tiamin (B1 Vitamini)</strong> uygulanmalıdır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-purple-500" />
              <span>Flumazenilin Kısa Yarı Ömrü & Re-sedasyon Tehdidi</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Flumazenilin etki süresi 40–80 dakikadır. Midazolam ise vücuttan çok daha geç atılır. Flumazenil ile uyandırılan hasta 1 saat sonra midazolamın tekrar reseptörlere bağlanmasıyla <strong>aniden derin komaya ve apneye dönebilir</strong>. Hasta en az 2 saat boyunca taburcu edilmemeli ve izlenmelidir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'} space-y-2`}>
            <h4 className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>Opioid + Midazolam Eşzamanlı Kullanımı (Black Box Warning)</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Opioidlerle benzodiazepinlerin birlikte kullanımında solunum arresti riski 4 katına çıkar. İki ilaç birlikte verileceği zaman her ikisinin de başlangıç dozu <strong>%50 oranında düşürülmeli</strong> ve sürekli kapnografi/pulse oksimetre izlenmelidir.
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
        <div className="flex items-center gap-2.5 mb-4 text-purple-600 dark:text-purple-400">
          <Layers className="w-5 h-5" />
          <h2 className="text-base sm:text-lg font-bold">IV Uygulama, Sulandırma ve Hazırlama Kuralları</h2>
        </div>

        <div className="space-y-3 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
              Ticari Formülasyonlar (Ampul Çeşitleri)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>5 mg / 5 mL (1 mg/mL):</strong> IV titrasyon ve premedikasyon için en güvenli formdur.<br />
              • <strong>15 mg / 3 mL (5 mg/mL):</strong> Konsantre form. İnfüzyon hazırlama ve IM/İntranazal uygulamalarda hacim kısıtlaması için kullanılır.<br />
              • <strong>50 mg / 10 mL (5 mg/mL):</strong> YBÜ perfüzör infüzyonları için yüksek doz flakon.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
              Geçimli Çözeltiler ve İnfüzyon Hazırlama
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Geçimli Sıvılar:</strong> %0.9 NaCl (SF), %5 Dekstroz (D5W), %10 Dekstroz ve Ringer Laktat ile tam uyumludur.<br />
              • <strong>Standart İnfüzyon Çözeltisi:</strong> 50 mg (10 mL 5 mg/mL ampul) çekilerek 50 mL'lik enjektöre SF ile tamamlanır $\rightarrow$ <strong>1.0 mg/mL</strong> derişim elde edilir.<br />
              • Hazırlanan infüzyon çözeltisi oda sıcaklığında 24 saat, buzdolabında (2–8°C) 48 saat kimyasal stabilitesini korur.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              Fizikokimyasal Geçimsizlik (Alkalen Çözeltilerle Asla Karıştırmayın!)
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Midazolam asidik pH'ta stabildir. <strong>Sodyum bikarbonat, tiyopental, metoheksital, deksametazon sodyum fosfat ve furosemid</strong> gibi alkali sıvılarla karıştırıldığında derhal beyaz çökelti (presipitasyon) oluşur ve kateter tıkanır! Aynı lümenden verilmemelidir.
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
          <h2 className="text-base sm:text-lg font-bold">İlaç Güvenliği İlişkili Durumlar (ISMP High-Alert & Kontrole Tabi Reçete)</h2>
        </div>

        <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-500/10 border-rose-500/30 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'} space-y-2.5 text-xs`}>
          <div className="flex items-center gap-2 font-bold text-sm text-rose-800 dark:text-rose-300">
            <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
            <span>ISMP High-Alert & Konsantrasyon Karışıklığı Uyarısı</span>
          </div>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            1. <strong>Konsantrasyon Karışıklığı (1 mg/mL vs 5 mg/mL):</strong> En sık yapılan medikal hata 1 mg/mL ampul yerine 5 mg/mL ampulün çekilmesidir (hastaya 5 kat aşırı doz verilir!). Şırıngalar mutlaka renkli ve miligram cinsinden etiketlenmelidir.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            2. <strong>Yeşil Reçete / Kontrole Tabi Madde:</strong> Bağımlılık ve kötüye kullanım potansiyeli nedeniyle ulusal ve uluslararası mevzuata göre kilitli dolaplarda saklanmalı ve her kullanım kayıt altına alınmalıdır.
          </p>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">
            3. <strong>Oksijen & Resüsitasyon Hazırlığı:</strong> Midazolam uygulanan her odada balon-valf-maske (Ambu), aspiratör, yüksek akımlı oksijen ve <strong>Flumazenil ampul</strong> kullanıma hazır bulunmalıdır.
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
          <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
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
            href="https://www.drugs.com/drug-interactions/midazolam.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-purple-500/50'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Pill className="w-4 h-4 text-purple-500" />
              <div>
                <span className="text-xs font-bold block group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Drugs.com Midazolam Etkileşim Kontrolü
                </span>
                <span className="text-[11px] text-slate-500">
                  CYP3A4 inhibitör/indükleyicileri, opioidler ve sedatif etkileşimleri
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-500 shrink-0" />
          </a>

          <a
            href="https://reference.medscape.com/drug/versed-midazolam-342907"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all group cursor-pointer ${
              isDark
                ? 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-purple-500/50'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-purple-500/50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-purple-500" />
              <div>
                <span className="text-xs font-bold block group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Medscape Midazolam (Versed) Monografisi
                </span>
                <span className="text-[11px] text-slate-500">
                  Klinik referans dozları, yan etkiler, gebelik ve böbrek uyarıları
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-purple-500 shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
};
