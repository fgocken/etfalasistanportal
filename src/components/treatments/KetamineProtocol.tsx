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
import {
  AdverseEffectsBlock,
  CompatibilityAndLineBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

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
  explanation = 'Doz Açıklaması',
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
            ? 'px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/30'
            : 'font-semibold underline decoration-dotted decoration-indigo-500 underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400'
        }`}
      >
        {doseText}
      </span>
      <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-semibold">
        detay
      </span>

      {/* Popover Hover Balonu */}
      {isOpen && (
        <span
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 rounded-xl text-left shadow-2xl border z-50 pointer-events-none transition-all duration-150 bg-slate-900 border-indigo-500/60 text-slate-100 dark:bg-slate-950 dark:border-indigo-400 shadow-indigo-950/60 animate-in fade-in zoom-in-95"
        >
          <span className="block text-[9.5px] font-bold uppercase tracking-wider text-indigo-400">
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
  | 'rsi_and_procedural' 
  | 'ketofol_mix' 
  | 'subdissociative_pain_and_infusion' 
  | 'acute_agitation_and_asthma';

export const KetamineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKTİF HESAPLAYICI MODÜL SEÇİCİ ---
  const [activeCalcTool, setActiveCalcTool] = useState<ActiveCalcTool>('rsi_and_procedural');

  // --- GENEL HASTA VE DOZ STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [patientProfile, setPatientProfile] = useState<'healthy_adult' | 'hemodynamic_shock' | 'pediatric' | 'elderly_frail'>('healthy_adult');

  // 1. RSI & Prosedürel Sedasyon Parametreleri
  const [rsiIndication, setRsiIndication] = useState<'rsi_shock' | 'rsi_bronchospasm' | 'procedural_iv' | 'procedural_im'>('rsi_shock');
  const [proceduralIvDoseMgKg, setProceduralIvDoseMgKg] = useState<number>(1.0); // 0.5 - 1.5 mg/kg
  const [proceduralImDoseMgKg, setProceduralImDoseMgKg] = useState<number>(4.0); // 3 - 5 mg/kg

  // 2. Ketofol Parametreleri
  const [ketofolRatio, setKetofolRatio] = useState<'1_to_1' | '1_to_2' | '1_to_4'>('1_to_1');
  const [ketofolSyringeVolumeMl, setKetofolSyringeVolumeMl] = useState<number>(20); // 10 veya 20 mL
  const [ketofolTargetDoseMl, setKetofolTargetDoseMl] = useState<number>(3); // bolus mL

  // 3. Sub-dissosiyatif Ağrı & İnfüzyon Parametreleri
  const [painPhase, setPainPhase] = useState<'acute_bolus' | 'continuous_infusion'>('acute_bolus');
  const [subdissociativeBolusMgKg, setSubdissociativeBolusMgKg] = useState<number>(0.25); // 0.1 - 0.3 mg/kg
  const [infusionRateMgKgHr, setInfusionRateMgKgHr] = useState<number>(0.2); // 0.1 - 0.5 mg/kg/saat
  const [infusionBagPrep, setInfusionBagPrep] = useState<'500ml_500mg' | '100ml_200mg' | 'pure_50mg_ml'>('500ml_500mg'); // 1 mg/mL, 2 mg/mL veya saf 50 mg/mL

  // 4. Akut Ajitasyon & Astım Parametreleri
  const [agitationRoute, setAgitationRoute] = useState<'im_emergency' | 'iv_emergency' | 'status_asthmaticus'>('im_emergency');

  // UI Durumları
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Benzersiz ID'ler
  const weightInputId = useId();
  const profileSelectId = useId();
  const rsiIndicationId = useId();
  const procIvId = useId();
  const procImId = useId();
  const ketofolRatioId = useId();
  const ketofolSyrId = useId();
  const subBolusId = useId();
  const infRateId = useId();
  const infBagId = useId();

  // --- MATEMATİKSEL VE KLİNİK HESAPLAMALAR ---

  // Ketalar Konsantrasyonu: 50 mg/mL flakon
  const KETALAR_CONC_MG_ML = 50.0;

  // A. RSI & Prosedürel Dozlar
  // RSI Standart: 1.5 - 2.0 mg/kg IV (Şokta katekolamin deplesyonu varsa 1.0 - 1.5 mg/kg)
  let rsiTargetMgKg = 2.0;
  if (patientProfile === 'hemodynamic_shock' || patientProfile === 'elderly_frail') {
    rsiTargetMgKg = 1.2;
  }
  const rsiTotalMg = Math.round(weightKg * rsiTargetMgKg * 10) / 10;
  const rsiTotalMl_50mgml = Math.round((rsiTotalMg / KETALAR_CONC_MG_ML) * 10) / 10;

  // Prosedürel Sedasyon IV (0.5 - 1.5 mg/kg)
  const procIvTotalMg = Math.round(weightKg * proceduralIvDoseMgKg * 10) / 10;
  const procIvTotalMl_50mgml = Math.round((procIvTotalMg / KETALAR_CONC_MG_ML) * 10) / 10;

  // Prosedürel Sedasyon IM (3.0 - 5.0 mg/kg)
  const procImTotalMg = Math.round(weightKg * proceduralImDoseMgKg * 10) / 10;
  const procImTotalMl_50mgml = Math.round((procImTotalMg / KETALAR_CONC_MG_ML) * 10) / 10;

  // B. Ketofol Karışımı Hesapları
  // Propofol %1 = 10 mg/mL
  // Ketalar = 50 mg/mL (Sulandırılarak veya doğrudan 10 mg/mL'ye çekilerek)
  // 1:1 Ketofol Karışımı: 10 mg/mL Ketamin + 10 mg/mL Propofol
  // Örneğin 20 mL enjektör için: 10 mL Propofol %1 (100 mg) + 2 mL Ketalar %5 (100 mg) + 8 mL SF = 20 mL karışım (5 mg/mL Ketamin + 5 mg/mL Propofol)
  let ketofolKetaminMgPerMl = 5.0;
  let ketofolPropofolMgPerMl = 5.0;
  let ketofolPrepDescription = '';

  if (ketofolRatio === '1_to_1') {
    // 20 mL'lik enjektörde: 100 mg Ketamin (2 mL Ketalar 50mg/mL) + 100 mg Propofol (10 mL Propofol %1) + 8 mL %0.9 NaCl
    // Toplam 20 mL -> Her 1 mL'de 5 mg Ketamin + 5 mg Propofol
    ketofolKetaminMgPerMl = 5.0;
    ketofolPropofolMgPerMl = 5.0;
    ketofolPrepDescription = '20 mL Enjektör: 2 mL Ketalar (100 mg) + 10 mL Propofol %1 (100 mg) + 8 mL SF (Her 1 mL = 5 mg Ketamin + 5 mg Propofol)';
  } else if (ketofolRatio === '1_to_2') {
    // 1:2 Oranı: 1 mg Ketamin : 2 mg Propofol
    // 20 mL Enjektör: 1 mL Ketalar (50 mg) + 10 mL Propofol %1 (100 mg) + 9 mL SF
    // Her 1 mL = 2.5 mg Ketamin + 5 mg Propofol
    ketofolKetaminMgPerMl = 2.5;
    ketofolPropofolMgPerMl = 5.0;
    ketofolPrepDescription = '20 mL Enjektör: 1 mL Ketalar (50 mg) + 10 mL Propofol %1 (100 mg) + 9 mL SF (Her 1 mL = 2.5 mg Ketamin + 5 mg Propofol)';
  } else {
    // 1:4 Oranı: 1 mg Ketamin : 4 mg Propofol
    // 20 mL Enjektör: 0.5 mL Ketalar (25 mg) + 10 mL Propofol %1 (100 mg) + 9.5 mL SF
    // Her 1 mL = 1.25 mg Ketamin + 5 mg Propofol
    ketofolKetaminMgPerMl = 1.25;
    ketofolPropofolMgPerMl = 5.0;
    ketofolPrepDescription = '20 mL Enjektör: 0.5 mL Ketalar (25 mg) + 10 mL Propofol %1 (100 mg) + 9.5 mL SF (Her 1 mL = 1.25 mg Ketamin + 5 mg Propofol)';
  }

  const ketofolDeliveredKetaminMg = Math.round(ketofolTargetDoseMl * ketofolKetaminMgPerMl * 10) / 10;
  const ketofolDeliveredPropofolMg = Math.round(ketofolTargetDoseMl * ketofolPropofolMgPerMl * 10) / 10;

  // C. Sub-dissosiyatif Akut Ağrı & YBÜ İnfüzyon Hesapları
  // Akut Ağrı Bolusu: 0.15 - 0.3 mg/kg IV (15 dakikada infüzyon veya yavaş puşe)
  const subdissociativeTotalMg = Math.round(weightKg * subdissociativeBolusMgKg * 10) / 10;
  const subdissociativeTotalMl_50mgml = Math.round((subdissociativeTotalMg / KETALAR_CONC_MG_ML) * 100) / 100;

  // İnfüzyon: 0.1 - 0.5 mg/kg/saat
  const infusionHourlyMg = Math.round(weightKg * infusionRateMgKgHr * 10) / 10;
  let infusionConcMgMl = 1.0; // 500 mL SF + 500 mg
  if (infusionBagPrep === '100ml_200mg') infusionConcMgMl = 2.0;
  if (infusionBagPrep === 'pure_50mg_ml') infusionConcMgMl = 50.0;

  const infusionPumpRateMlHr = Math.round((infusionHourlyMg / infusionConcMgMl) * 10) / 10;
  const infusion24HrMg = Math.round(infusionHourlyMg * 24);

  // D. Akut Ajitasyon & Astım Acil Dozları
  // Şiddetli Eksitasyon IM: 4.0 - 5.0 mg/kg IM (Maks: 500 mg)
  const agitationImTotalMg = Math.min(Math.round(weightKg * 4.5), 500);
  const agitationImTotalMl = Math.round((agitationImTotalMg / KETALAR_CONC_MG_ML) * 10) / 10;

  // Şiddetli Eksitasyon IV: 1.0 - 2.0 mg/kg IV
  const agitationIvTotalMg = Math.round(weightKg * 1.5 * 10) / 10;
  const agitationIvTotalMl = Math.round((agitationIvTotalMg / KETALAR_CONC_MG_ML) * 10) / 10;

  // Status Asthmaticus Bolus + İnfüzyon
  const asthmaBolusMg = Math.round(weightKg * 1.5 * 10) / 10;
  const asthmaInfusionMgHr = Math.round(weightKg * 1.5 * 10) / 10;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0) */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet & Etki' },
          { id: 'sec-pkpd', label: 'PK / PD' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-endikasyon', label: 'Endikasyonlar' },
          { id: 'sec-dozaj', label: 'Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik' },
          { id: 'sec-emergence', label: 'Emergence' },
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
        tallManName="KETAMINE (50 mg/mL Konsantre Flakon — 10 mg/mL SULANDIR!)"
        confusionRiskWith="Ketalar 50 mg/mL (500 mg/10 mL) ↔ 10 mg/mL Sulandırılmış Enjektör · Esketamin (2× Potent)"
        antidoteOrRescue="Spesifik Antidot YOK — Hava Yolu & Psikomimetik Yönetim: Aşırı dozda destekleyici ventilasyon ve hemodinamik izlem esastır. Şiddetli uyanma ajitasyonu/halüsinasyonda Midazolam 1–2 mg IV (veya propofol küçük bolus); laringospazmda çene itme, CPAP, gerekirse propofol/süksinilkolin uygulanır."
        criticalAlerts={[
          '50 mg/mL Konsantre Flakon Tuzağı: Türkiye’deki 500 mg/10 mL (50 mg/mL) Ketalar flakon direkt subanestezik puşe için 5 kat aşırı konsantredir; 10 mg/mL’ye (2 mL = 100 mg + 8 mL SF) sulandırıp etiketleyin.',
          'Subanestezik vs İndüksiyon Doz Karışıklığı: Analjezi dozu (0,15–0,3 mg/kg bolus · 0,1–0,2 mg/kg/saat) ile disosiyatif/RSI indüksiyon dozu (1–2 mg/kg IV) kesinlikle karıştırılmamalıdır.',
          'Katekolamin Tükenmiş Ağır Şok Paradoksu: Endojen katekolamin deposu tükenmiş kronik septik/kardiyojenik şokta ketaminin direkt miyokardiyal depresan etkisi baskın çıkabilir; dozu %50 azaltın (0,5–1,2 mg/kg) ve vazopresör hazır bulundurun.',
          'Barbitürat / Diazepam Çökelmesi: Tiyopental veya diazepam ile aynı lümenden verilmesi ani presipitasyon yapar; ayrı hat kullanın.',
        ]}
      />

      {/* =========================================================================
          BÖLÜM 1: ÜST BAŞLIK VE HIZLI İLAÇ KİMLİK ÖZETİ
          ========================================================================= */}
      <div
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-indigo-500/30 shadow-xl shadow-indigo-950/20 text-slate-100'
            : 'bg-white border-indigo-200 shadow-lg shadow-indigo-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0 shadow-inner">
              <Brain className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/40 font-mono">
                  NMDA Antagonisti · Disosiyatif Anestezik
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: N01AX03
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                  KETALAR · KETANEST · SPRAVATO
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Ketamin (KETALAR, KETANEST, SPRAVATO)
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Non-kompetitif NMDA reseptör antagonisti, fensiklidin (arilsikloheksilamin) türevi disosiyatif anestezi ve analjezik ajan.
                Talamokortikal ve limbik sistem disosiasyonu yaratarak hasta uyanık görünürken derin analjezi ve amnezi sağlar;
                faringeal-laringeal refleksleri ve spontan solunumu korur, sempatik deşarj ile bronkodilatasyon ve hemodinamik stabilite sağlar.
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
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mt-0.5">
              NMDA Antagonisti
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Disosiyatif Anestezik</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              RSI İndüksiyon Dozu
            </span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block mt-0.5 font-mono">
              1.5 – 2.0 mg/kg IV
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Şokta: 1.0–1.2 mg/kg</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Sub-dissosiyatif Ağrı
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5 font-mono">
              0.1 – 0.3 mg/kg IV
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Opioid koruyucu analjezi</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Acil Sedasyon (IM)
            </span>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block mt-0.5 font-mono">
              4.0 – 5.0 mg/kg IM
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Damar yolu yoksa 3-5 dk</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Solunum &amp; Hava Yolu
            </span>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block mt-0.5 font-mono">
              Spontan Solunum Korunur
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Bronkodilatör etki (+)</span>
          </div>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              Uyanma Deliryumu
            </span>
            <span className="text-xs font-black text-rose-700 dark:text-rose-300 block mt-0.5 font-mono">
              Midazolam 1–2 mg
            </span>
            <span className="text-[10px] text-rose-500 dark:text-rose-400 block mt-0.5">Profilaktik profil</span>
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
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Farmakodinamik ve Disosiyatif Etki Mekanizması
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              NMDA reseptör blokajı, talamokortikal disosiasyon, santral sensitizasyon inhibisyonu ve sempatik deşarj
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Disosiyatif Anestezi Modeli</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Ketamin, limbik sistemi (özellikle hipokampus) deprese ederken retiküler aktive edici sistemi seçici uyararak <strong>elektrofizyolojik disosiasyon</strong> oluşturur.
              Hasta uyanık gibi görünür (gözler açık, kornea ve öksürük refleksleri aktif, hafif nistagmus), ancak duyusal uyaranları serebral kortekse iletemez; derin bir analjezi, kataleptik durum ve yoğun amnezi içerisindedir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>NMDA Reseptör Blokajı &amp; Antiallodini</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Medulla spinalis arka boynuzunda glutamatın <strong>NMDA (N-metil-D-aspartat) reseptörlerine</strong> bağlanmasını non-kompetitif olarak bloke eder.
              Bu sayede "wind-up" fenomenini, santral sensitizasyonu, opioid toleransını ve hiperaljeziyi kırar. Sub-dissosiyatif düşük dozlarda bile güçlü opioid koruyucu analjeziktir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4" />
              <span>İndirekt Sempatomimetik &amp; Bronkodilatör</span>
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Santral sempatik deşarjı artırır ve nöronal katekolamin geri alımını (re-uptake) bloke eder.
              Kalp hızını, kan basıncını ve kardiyak debiyi artırır (şok indüksiyonunda avantaj). Bronş düz kaslarını direkt gevşeterek güçlü <strong>bronkodilatasyon</strong> sağlar.
            </p>
          </div>
        </div>

        {/* Katekolamin Tükenmiş Şok Paradoksu Kutusu */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">
              Hayati Klinik Paradoks: "Katekolamin Deplesyonlu Ağır Şokta Direkt Miyokard Depresyonu":
            </span>
            <p className="leading-relaxed">
              Ketamin in-vitro ortamda aslında direkt bir <strong>negatif inotropik miyokard depresanıdır</strong>; normal hastalarda santral sempatik katekolamin salınımı bu etkiyi fazlasıyla örter ve tansiyonu yükseltir.
              Ancak günlerdir YBÜ'de yatan, ağır septik şokta veya end-stage travmada endojen katekolamin depoları tamamen tükenmiş hastalarda sempatik rezerv kalmadığı için, ketamin verildiğinde gizli negatif inotropik etkisi açığa çıkar ve ani derin hipotansiyona yol açabilir.
              Bu hasta grubunda RSI indüksiyon dozu mutlaka <strong>1.0 – 1.2 mg/kg'a düşürülmeli</strong> veya titre edilerek verilmelidir!
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 3: FARMAKOKİNETİK PROFİLİ (TEK KAYNAK AKORDİYON · v4.0)
          ========================================================================= */}
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
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  Farmakokinetik &amp; Norketamin Metabolizma Profili (PK / PD)
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pkOpen ? 'Gizle' : 'Tıkla & Göster'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Onset, peak, t½α hızlı redistribüsyon, Vd, hepatik CYP2B6/3A4 metabolizması ve aktif Norketamin eliminasyonu
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
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">30 – 60 Saniye (IV)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  IM: 3–5 dk; İntranazal: 5–10 dk; Oral: 15–30 dk (oral biyoyararlanım ~%16–20).
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pik Etki &amp; Redistribüsyon (t½α)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 2 Dakika (IV)</span>
                <p className="text-[11px] text-slate-500 mt-1">Hızlı yeniden dağılım t½α ~10–15 dk (IM pik: 5–15 dk).</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Klinik Etki Süresi
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">10 – 15 Dakika (Tek IV Bolus)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Hızlı redistribüsyon ile sonlanır. IM: 30–60 dk; Oral: 2–4 saat.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">2.5 – 3.5 L/kg</span>
                <p className="text-[11px] text-slate-500 mt-1">Yüksek lipid çözünürlüğü ile beyne saniyeler içinde geçer.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Protein Bağlanması
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">%12 – %35 (Düşük)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Düşük bağlanma oranı sayesinde hipoalbüminemiden belirgin etkilenmez.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Eliminasyon Yarı Ömrü (t½β)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">
                  2.0 – 3.0 Saat
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Yüksek hepatik klerens (12–17 mL/kg/dk; hepatik kan akımına bağımlı).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Hepatik Biyotransformasyon &amp; Aktif Norketamin Metaboliti:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>CYP2B6 ve CYP3A4 N-Demetilasyonu:</strong> Ketamin karaciğerde mikrozomal enzimlerle aktif metaboliti olan <strong>Norketamin</strong>e dönüştürülür.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Norketamin Potensi &amp; Uzun Yarı Ömrü (~12 saat):</strong> Norketamin, ana ketamin molekülünün yaklaşık 1/3 ila 1/5&apos;i kadar analjezik aktiviteye sahiptir ve yarı ömrü belirgin uzundur (~12 saat). YBÜ&apos;de uzamış infüzyonlarda veya oral kullanımda norketamin birikerek analjezik ve sedatif etkinin uzamasına katkıda bulunur.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Ekskresyon:</strong> Hidroksilasyon ve glukuronid konjugasyonu sonrasında metabolitlerin %90&apos;ı böbrekler yoluyla idrarla atılır; &lt;%4 değişmemiş ana ilaç olarak atılır.
              </p>
            </div>
          </div>
        )}
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
              Kontrendikasyonlar &amp; Yüksek Risk Durumları
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kontrendike klinik tablolar, koroner iskemi, açık göz yaralanmaları ve psikotik durumlar
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
                <span><strong>Kontrolsüz Şiddetli Hipertansiyon &amp; Aort Diseksiyonu:</strong> Sempatik deşarj ile kan basıncını ve duvar stresini artırarak diseksiyon rüptürünü tetikleyebilir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Akut Koroner Sendrom / Ağır Koroner Arter Hastalığı:</strong> Miyokardiyal oksijen tüketimini (MVO₂) ve kalp hızını artırarak infarktüs alanını genişletebilir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Aktif Şizofreni &amp; Akut Psikoz:</strong> Halüsinasyonları ve psikotik atakları alevlendirebilir.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Feokromositoma:</strong> Katekolamin salınımını tetikleyerek ölümcül hipertansif krize yol açabilir.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
            <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Relatif Kontrendikasyonlar &amp; Güncel Kanıtlar</span>
            </span>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Kafa İçi Basınç (KİB) Miti vs Gerçek:</strong> Tarihsel olarak KİB artırdığı düşünülse de, modern kanıtlar (normokapnik mekanik ventilasyon altında) ketaminin serebral perfüzyon basıncını (SPB) koruduğunu ve KİB'i artırmadığını göstermiştir; travmatik beyin hasarında güvenle kullanılır.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Açık Göz Yaralanması:</strong> Göz içi basıncını (GİB) hafif artırabilir ve blefarospazma yol açabilir; dikkatle kullanılmalıdır.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span><strong>Endojen Katekolamin Tükenmiş Ağır Şok:</strong> Negatif inotropik etki açığa çıkabilir; düşük dozda ve vazopressör desteği altında verilmelidir.</span>
              </li>
            </ul>
          </div>
        </div>
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
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Klinik Endikasyonlar &amp; Uygulama Yolları
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              RSI indüksiyonu, prosedürel dissosiasyon, Ketofol, akut ağrı, refrakter astım ve ajitasyon
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Endikasyon 1: RSI Hemodinamik Şok & Travma İndüksiyonu */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                <span>1. RSI Şok &amp; Travma İndüksiyonu</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                1.5 – 2.0 mg/kg IV
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Hemorajik şok, travma resüsitasyonu ve hemodinamik instabilitede birinci tercih indüksiyon ajanı. Sempatik uyarım ile kardiyovasküler kollapsı önler.
            </p>
          </div>

          {/* Endikasyon 2: Status Asthmaticus & Ağır Bronkospazm */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-500" />
                <span>2. Ağır Bronkospazm / Astım RSI</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 font-bold">
                1.5 – 2.0 mg/kg Bolus
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Dirençli astım krizinde hava yolu direncini dramatik olarak düşürür; solunum yolu indüksiyonunda bronkodilatör etkisiyle altın standarttır.
            </p>
          </div>

          {/* Endikasyon 3: Prosedürel Sedasyon (Dissosiyatif Sedasyon) */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500" />
                <span>3. Prosedürel Sedasyon (PSA)</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold">
                0.5 – 1.0 mg/kg IV / 3–4 IM
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Kırık/çıkık redüksiyonu, abse drenajı, yanık pansumanı, acil dikiş. Spontan solunum ve koruyucu hava yolu refleksleri bozulmadan konforlu girişim sağlar.
            </p>
          </div>

          {/* Endikasyon 4: "Ketofol" Kombinasyon Protokolü */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>4. Ketofol (Ketamin + Propofol)</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 font-bold">
                1:1 veya 1:4 Oranı
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Propofolün neden olduğu hipotansiyon ve apne riskini nötralize eder; propofol de ketaminin neden olduğu halüsinasyon ve uyanma deliryumunu önler.
            </p>
          </div>

          {/* Endikasyon 5: Sub-dissosiyatif Akut Şiddetli Ağrı & Opioid Sparing */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>5. Sub-dissosiyatif Akut Ağrı</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                0.15 – 0.3 mg/kg IV
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Bilinç kaybı yaratmadan (psikotropik eşiğin altında) renal kolik, kırık ağrısı, orak hücre krizi ve postoperatif refrakter ağrıda opioid tüketimini azaltır.
            </p>
          </div>

          {/* Endikasyon 6: Perioperatif & Yoğun Bakım Sürekli İnfüzyonu */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-blue-500" />
                <span>6. Perioperatif &amp; YBÜ İnfüzyon</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-bold">
                0.1 – 0.5 mg/kg/saat
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tolerans gelişmiş kronik opioid kullanıcılarında ve büyük omurga/batın cerrahisinde hiperaljeziyi önler; sürekli düşük doz analjezi sağlar.
            </p>
          </div>

          {/* Endikasyon 7: Akut Ciddi Ajitasyon / Excited Delirium (IM Acil) */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>7. Akut Ciddi Ajitasyon (Excited Delirium)</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200 font-bold">
                4 – 5 mg/kg IM
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Hastane öncesinde veya acil serviste kendine ve personele zarar verme riski taşıyan, damar yolu açılamayan şiddetli ajite hastalarda <strong>3–5 dakikada</strong> güvenli sedasyon.
            </p>
          </div>

          {/* Endikasyon 8: Süper Refrakter Status Epilepticus (SRSE) */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-rose-500" />
                <span>8. Refrakter Status Epilepticus</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold">
                1.5–3 Bolus + 1–5 mg/kg/sa
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              GABA reseptörlerinin tükendiği uzamış nöbetlerde NMDA reseptör up-regülasyonunu kırarak nörotoksisiteyi durdurur; nöbet sonlandırmada etkindir.
            </p>
          </div>

          {/* Endikasyon 9: Tedaviye Dirençli Depresyon / İntihar Krizi */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-cyan-500" />
                <span>9. Depresyon &amp; İntihar Krizi Acil</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-bold">
                0.5 mg/kg (40 dk IV)
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Sinaptogenez ve BDNF salınımını tetikleyerek saatler içinde akut intihar düşüncesini ve tedaviye dirençli unipolar/bipolar depresyonu geriletir.
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
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Dozaj Tablosu &amp; Uygulama Yolları Kılavuzu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              IV, IM, İntranazal ve sürekli infüzyon protokolleri; etki başlangıç ve etki süreleri
            </p>
          </div>
        </div>

        {/* Tablo: Dozaj Tablosu */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Klinik Endikasyon</th>
                <th className="p-3">Uygulama Yolu</th>
                <th className="p-3">Önerilen Doz</th>
                <th className="p-3">Başlangıç / Süre</th>
                <th className="p-3">Klinik Hedef &amp; Yönetim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">RSI İndüksiyon (Şok / Travma / Astım)</td>
                <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">IV Bolus</td>
                <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                  <DoseHover doseText="1.5 – 2.0 mg/kg" equivText="70 kg için 105 – 140 mg (2.1 – 2.8 mL Ketalar %5)" explanation="Şokta 1.0–1.2 mg/kg'a titre edilebilir" />
                </td>
                <td className="p-3 font-mono">30 – 60 sn / 10 – 15 dk</td>
                <td className="p-3">Kas gevşetici öncesi dissosiyasyon sağlar. Spontan solunumu en az deprese eden indüksiyon ajanıdır.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Prosedürel Sedasyon (IV)</td>
                <td className="p-3 font-mono text-purple-600 dark:text-purple-400">IV Yavaş</td>
                <td className="p-3 font-mono font-bold text-purple-600 dark:text-purple-400">
                  <DoseHover doseText="0.5 – 1.0 mg/kg" equivText="70 kg için 35 – 70 mg (1–2 dakikada yavaş)" explanation="Gereğinde 0.5 mg/kg ek doz" />
                </td>
                <td className="p-3 font-mono">1 – 2 dk / 15 – 30 dk</td>
                <td className="p-3">Kısa ağrılı acil cerrahi girişimler. Hızlı puşede geçici apne olabileceğinden 60 saniyede yavaş verilmelidir.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Prosedürel Sedasyon (IM)</td>
                <td className="p-3 font-mono text-blue-600 dark:text-blue-400">IM Derin</td>
                <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">
                  <DoseHover doseText="3.0 – 5.0 mg/kg" equivText="70 kg için 210 – 350 mg (4.2 – 7.0 mL Ketalar %5)" explanation="Pediatride ve koopere olmayan hastada" />
                </td>
                <td className="p-3 font-mono">3 – 5 dk / 30 – 60 dk</td>
                <td className="p-3">Damar yolu bulunmayan çocuklarda veya ajite yetişkinlerde deltoid ya da vastus lateralis kasına uygulanır.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Sub-dissosiyatif Akut Ağrı (Analjezi)</td>
                <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">IV Kısa İnfüzyon</td>
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  <DoseHover doseText="0.15 – 0.3 mg/kg" equivText="70 kg için 10 – 20 mg (100 mL SF içinde 15 dk)" explanation="Disosiyatif eşiğin altında ağrı kontrolü" />
                </td>
                <td className="p-3 font-mono">5 dk / 60 – 120 dk</td>
                <td className="p-3">Disfori ve nistagmus yapmadan derin analjezi. Doğrudan IV puşe yerine 15 dakikalık minitorbada verilmesi deliryumu önler.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Perioperatif &amp; YBÜ İdame İnfüzyon</td>
                <td className="p-3 font-mono text-teal-600 dark:text-teal-400">Sürekli IV Pompa</td>
                <td className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400">
                  <DoseHover doseText="0.1 – 0.5 mg/kg/sa" equivText="70 kg için 7 – 35 mg/saat (1 mg/mL solüsyondan 7 – 35 mL/sa)" explanation="Hiperaljezi ve toleransı önleme" />
                </td>
                <td className="p-3 font-mono">Sürekli</td>
                <td className="p-3">Multimodal analjezi parçası olarak postoperatif 24–48 saat sürdürülür. Opioid tüketimini %40 azaltır.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Akut Ciddi Ajitasyon / Excited Delirium</td>
                <td className="p-3 font-mono text-rose-600 dark:text-rose-400">IM Acil</td>
                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">
                  <DoseHover doseText="4.0 – 5.0 mg/kg IM" equivText="70 kg için 300 – 350 mg IM (Maks: 500 mg)" explanation="Acil kimyasal kısıtlama" />
                </td>
                <td className="p-3 font-mono">3 – 5 dk / 30 – 60 dk</td>
                <td className="p-3">Hipertermi ve rabdomiyoliz riskini hızla kırar. Hastayı güvenli sedasyona sokup monitörizasyon ve damar yolu sağlar.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Status Asthmaticus İdame İnfüzyon</td>
                <td className="p-3 font-mono text-cyan-600 dark:text-cyan-400">Sürekli IV Pompa</td>
                <td className="p-3 font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  <DoseHover doseText="1.0 – 2.0 mg/kg/sa" equivText="70 kg için 70 – 140 mg/saat infüzyon" explanation="1-2 mg/kg yükleme sonrası" />
                </td>
                <td className="p-3 font-mono">Sürekli</td>
                <td className="p-3">Entübe astım hastalarında plato basıncını ve tepe inspiratuar basıncı düşürür; gaz hapsini (auto-PEEP) azaltır.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Pediatrik Premedikasyon &amp; Sedasyon (Oral)</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">Oral (PO)</td>
                <td className="p-3 font-mono font-bold text-orange-600 dark:text-orange-400">
                  <DoseHover doseText="3.0 – 5.0 mg/kg Oral" equivText="Tatlandırıcı şurup / meyve suyu ile" explanation="Biyoyararlanım %16-20 (ilk geçiş)" />
                </td>
                <td className="p-3 font-mono">15 – 30 dk / 1 – 2 saat</td>
                <td className="p-3">Damaryolu olmayan çocuklarda girişim öncesi anksiyoliz ve ayrılık anksiyetesi kontrolü.</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Kronik Nöropatik Ağrı / Allodini (Oral)</td>
                <td className="p-3 font-mono text-orange-600 dark:text-orange-400">Oral (PO)</td>
                <td className="p-3 font-mono font-bold text-orange-600 dark:text-orange-400">
                  <DoseHover doseText="0.5 – 1.0 mg/kg" equivText="Günde 3–4 kez oral solüsyon" explanation="Norketamin birikimiyle sürekli analjezi" />
                </td>
                <td className="p-3 font-mono">30 dk / 3 – 4 saat</td>
                <td className="p-3">Opioid toleranslı kanser ve dirençli CRPS ağrılarında santral sensitizasyonu söndürme.</td>
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
            ? 'bg-slate-900/95 border-indigo-500/40 shadow-2xl shadow-indigo-950/30'
            : 'bg-white border-indigo-300 shadow-xl shadow-indigo-500/10'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  İnteraktif Akıllı Doz &amp; Protokol Hesaplayıcısı
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-mono">
                  Ketofol Dahil 4 Araç
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                RSI şok indüksiyonu, Ketofol karışım oranı, sub-dissosiyatif ağrı infüzyonu ve acil IM sedasyon
              </p>
            </div>
          </div>
          <MonographCopyButton
            isDark={isDark}
            getText={() =>
              [
                `KETAMİN DOZ & İNFÜZYON ÖZETİ`,
                `Hesaplama Ağırlığı: ${weightKg} kg (${patientProfile})`,
                `RSI İndüksiyon (${rsiTargetMgKg} mg/kg): ${rsiTotalMg} mg IV (${rsiTotalMl_50mgml} mL Ketalar 50 mg/mL)`,
                `Sub-dissosiyatif Ağrı Bolusu (${subdissociativeBolusMgKg} mg/kg): ${subdissociativeTotalMg} mg IV`,
                `Analjezik İnfüzyon (${infusionRateMgKgHr} mg/kg/saat): ${infusionHourlyMg} mg/saat → ${infusionPumpRateMlHr} mL/saat (${infusionConcMgMl} mg/mL)`,
                `Ketofol (${ketofolRatio.replace('_to_', ':')}): ${ketofolPrepDescription}`,
              ].join('\n')
            }
          />
        </div>

        {/* Araç Seçim Sekmeleri */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCalcTool('rsi_and_procedural')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'rsi_and_procedural'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>1. RSI &amp; Prosedürel Sedasyon (IV/IM)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('ketofol_mix')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'ketofol_mix'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>2. Ketofol (Ketamin + Propofol) Karışımı</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('subdissociative_pain_and_infusion')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'subdissociative_pain_and_infusion'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>3. Sub-dissosiyatif Ağrı &amp; YBÜ İnfüzyon</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('acute_agitation_and_asthma')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTool === 'acute_agitation_and_asthma'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>4. Akut Şiddetli Ajitasyon &amp; Astım</span>
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
                className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">kg</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Dozlar bu ağırlık üzerinden anlık türetilmektedir.
            </span>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <ObesityDosingScaler
              isDark={isDark}
              drugName="Ketamin"
              recommendedScalar="LBW"
              secondaryScalar={{ type: 'IBW', context: 'Subanestezik Analjezi' }}
              rationale="SOBA / Miller's Anesthesia: Obez hastalarda ketamin indüksiyonu ve subanestezik analjezi infüzyonu aşırı psikomimetik yan etki ve uzamış derlenmeyi önlemek için LBW/IBW üzerinden hesaplanmalıdır."
              currentWeightKg={weightKg}
              onApplyWeight={(w) => setWeightKg(Math.max(3, Math.min(200, w)))}
            />
          </div>

          <div>
            <label htmlFor={profileSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Klinik Profil &amp; Hemodinamik Durum
            </label>
            <select
              id={profileSelectId}
              value={patientProfile}
              onChange={(e) => setPatientProfile(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            >
              <option value="healthy_adult">Standart Sağlıklı Erişkin (Normal Sempatik Yanıt)</option>
              <option value="hemodynamic_shock">Ağır Şok / Katekolamin Tükenmiş (Doz Azaltılmalı!)</option>
              <option value="pediatric">Pediatrik Hasta (Sıkı Kilo Bazlı + Sekresyon Takibi)</option>
              <option value="elderly_frail">Geriatrik / Kırılgan Hasta (Deliryum Riski Yüksek)</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Şok profilinde negatif inotropik risk nedeniyle RSI dozu 1.2 mg/kg'a çekilir.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                Standart Flakon Formu
              </span>
              <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                Ketalar 50 mg/mL (10 mL = 500 mg)
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 block">Konsantrasyon</span>
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                %5 (50 mg/mL)
              </span>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            MODÜL 1: RSI & PROSEDÜREL SEDASYON HESAPLAYICISI
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'rsi_and_procedural' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={rsiIndicationId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Klinik Senaryo &amp; Amaç
                </label>
                <select
                  id={rsiIndicationId}
                  value={rsiIndication}
                  onChange={(e) => setRsiIndication(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="rsi_shock">RSI İndüksiyon (Şok / Travma / Hipovolemi)</option>
                  <option value="rsi_bronchospasm">RSI İndüksiyon (Ağır Bronkospazm / Astım Kriz)</option>
                  <option value="procedural_iv">Prosedürel Sedasyon (IV Yol Açık)</option>
                  <option value="procedural_im">Prosedürel Sedasyon (IM Yol / Damar Yolu Yok)</option>
                </select>
              </div>

              {(rsiIndication === 'rsi_shock' || rsiIndication === 'rsi_bronchospasm' || rsiIndication === 'procedural_iv') && (
                <div>
                  <label htmlFor={procIvId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hedef IV Doz (mg/kg)
                  </label>
                  <input
                    id={procIvId}
                    type="number"
                    min={0.5}
                    max={2.5}
                    step={0.1}
                    value={rsiIndication === 'procedural_iv' ? proceduralIvDoseMgKg : rsiTargetMgKg}
                    onChange={(e) => {
                      const val = Number(e.target.value) || 1.0;
                      if (rsiIndication === 'procedural_iv') setProceduralIvDoseMgKg(val);
                    }}
                    disabled={rsiIndication !== 'procedural_iv'}
                    className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {rsiIndication === 'procedural_iv' ? 'Kılavuz aralığı: 0.5 – 1.0 mg/kg IV' : `Profil kaynaklı otomatik katsayı: ${rsiTargetMgKg} mg/kg`}
                  </span>
                </div>
              )}

              {rsiIndication === 'procedural_im' && (
                <div>
                  <label htmlFor={procImId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Hedef IM Doz (mg/kg)
                  </label>
                  <input
                    id={procImId}
                    type="number"
                    min={2.0}
                    max={6.0}
                    step={0.5}
                    value={proceduralImDoseMgKg}
                    onChange={(e) => setProceduralImDoseMgKg(Number(e.target.value) || 4.0)}
                    className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Kılavuz aralığı: 3.0 – 5.0 mg/kg IM (Derin kas içine).
                  </span>
                </div>
              )}
            </div>

            {/* Sonuç Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Toplam Hesaplanan Doz (mg)
                </span>
                <div className="text-3xl font-black font-mono text-indigo-700 dark:text-indigo-300">
                  {rsiIndication === 'procedural_im' ? procImTotalMg : rsiIndication === 'procedural_iv' ? procIvTotalMg : rsiTotalMg} mg
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                  Hasta ağırlığı: {weightKg} kg için net hesaplanan doz miktarıdır.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/15 border border-blue-500/40 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Çekilecek Ketalar Hacmi (%5 Ampul)
                </span>
                <div className="text-3xl font-black font-mono text-blue-700 dark:text-blue-300">
                  {rsiIndication === 'procedural_im' ? procImTotalMl_50mgml : rsiIndication === 'procedural_iv' ? procIvTotalMl_50mgml : rsiTotalMl_50mgml} mL
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-mono">
                  Ketalar flakonundan (50 mg/mL) enjektöre çekilecek net hacim.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Uygulama Hızı &amp; Apne Uyarısı
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  60 Saniyede Yavaş IV Veriniz
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Ketamin çok hızlı IV puşe edildiğinde geçici santral apne ve göğüs duvarı rijiditesi görülebilir; yavaş infüzyon şarttır.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODÜL 2: KETOFOL (KETAMİN + PROPOFOL) KARIŞIMI
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'ketofol_mix' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-purple-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-purple-700 dark:text-purple-300 block text-sm">
                  Ketofol Sinerjisi &amp; Karşılıklı Yan Etki Eliminasyonu
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Propofolün vazodilatatör hipotansiyon ve solunum depresyonu etkisi, ketaminin sempatomimetik kardiyak stimülasyonu ile dengelenir.
                  Aynı zamanda propofol, ketaminin neden olduğu canlı rüya ve uyanma deliryumunu tamamen baskılar.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={ketofolRatioId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ketofol Karışım Oranı (Ketamin : Propofol)
                </label>
                <select
                  id={ketofolRatioId}
                  value={ketofolRatio}
                  onChange={(e) => setKetofolRatio(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="1_to_1">1:1 Oranı (1 mg Ketamin : 1 mg Propofol - Dengeli)</option>
                  <option value="1_to_2">1:2 Oranı (1 mg Ketamin : 2 mg Propofol)</option>
                  <option value="1_to_4">1:4 Oranı (1 mg Ketamin : 4 mg Propofol - Derin Sedasyon)</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  1:1 oranı acil girişimsel sedasyonda en yaygın kullanılan altın standarttır.
                </span>
              </div>

              <div>
                <label htmlFor={ketofolSyrId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enjektör Hacmi
                </label>
                <select
                  id={ketofolSyrId}
                  value={ketofolSyringeVolumeMl}
                  onChange={(e) => setKetofolSyringeVolumeMl(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value={20}>20 mL Enjektör (Standart)</option>
                  <option value={10}>10 mL Enjektör (Kısa Vaka)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enjekte Edilecek Bolus Hacmi (mL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={ketofolTargetDoseMl}
                    onChange={(e) => setKetofolTargetDoseMl(Number(e.target.value))}
                    className="flex-1 accent-indigo-600"
                  />
                  <span className="font-mono font-black text-sm text-indigo-600 dark:text-indigo-400 w-16 text-right">
                    {ketofolTargetDoseMl} mL
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  İhtiyaca göre her 3–5 dakikada 1–3 mL titre edilir.
                </span>
              </div>
            </div>

            {/* Ketofol Hazırlama ve Doz Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2 md:col-span-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block">
                  Enjektör Hazırlama Formülü ({ketofolSyringeVolumeMl} mL Enjektör)
                </span>
                <p className="text-xs font-mono font-bold text-slate-900 dark:text-white leading-relaxed">
                  {ketofolPrepDescription}
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                  Karışım fiziksel ve kimyasal olarak oda sıcaklığında <strong>en az 3–4 saat</strong> stabildir. Çökelme görülmez.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/40 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {ketofolTargetDoseMl} mL Bolus ile Verilen İlaç
                </span>
                <div className="text-xl font-black font-mono text-indigo-800 dark:text-indigo-200">
                  {ketofolDeliveredKetaminMg} mg Ketamin
                </div>
                <div className="text-xl font-black font-mono text-purple-800 dark:text-purple-200">
                  + {ketofolDeliveredPropofolMg} mg Propofol
                </div>
                <p className="text-[10.5px] text-slate-500 mt-1">
                  Düşük doz kombinasyonu sayesinde hemodinamik çöküş veya apne oluşmaz.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODÜL 3: SUB-DİSSOSİYATİF AĞRI & İNFÜZYON HESAPLAYICISI
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'subdissociative_pain_and_infusion' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor={subBolusId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Akut Ağrı Yükleme Bolusu (mg/kg)
                </label>
                <input
                  id={subBolusId}
                  type="number"
                  min={0.1}
                  max={0.35}
                  step={0.05}
                  value={subdissociativeBolusMgKg}
                  onChange={(e) => setSubdissociativeBolusMgKg(Number(e.target.value) || 0.25)}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Kılavuz önerisi: 0.15 – 0.3 mg/kg (100 mL SF içinde 15 dakikada).
                </span>
              </div>

              <div>
                <label htmlFor={infRateId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  İdame İnfüzyon Dozu (mg/kg/saat)
                </label>
                <input
                  id={infRateId}
                  type="number"
                  min={0.05}
                  max={0.8}
                  step={0.05}
                  value={infusionRateMgKgHr}
                  onChange={(e) => setInfusionRateMgKgHr(Number(e.target.value) || 0.2)}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Kılavuz aralığı: 0.1 – 0.5 mg/kg/saat (Postop/YBÜ).
                </span>
              </div>

              <div>
                <label htmlFor={infBagId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  İnfüzyon Torbası Hazırlığı
                </label>
                <select
                  id={infBagId}
                  value={infusionBagPrep}
                  onChange={(e) => setInfusionBagPrep(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                >
                  <option value="500ml_500mg">500 mL SF + 500 mg (1.0 mg/mL - Standart Torba)</option>
                  <option value="100ml_200mg">100 mL SF + 200 mg (2.0 mg/mL - Konsantre)</option>
                  <option value="pure_50mg_ml">Saf Ketalar %5 (50.0 mg/mL - Perfüzör Şırıngası)</option>
                </select>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Pompa hızı seçilen konsantrasyona göre anında güncellenir.
                </span>
              </div>
            </div>

            {/* Sonuç Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Akut Ağrı Yükleme Bolusu
                </span>
                <div className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300">
                  {subdissociativeTotalMg} mg
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">
                  Ketalar flakondan <strong>{subdissociativeTotalMl_50mgml} mL</strong> çekilip 100 mL SF içinde 15 dakikada damlatılır (Hızlı puşe disfori yapabilir).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/15 border border-indigo-500/40 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  İnfüzyon Pompası Hızı
                </span>
                <div className="text-3xl font-black font-mono text-indigo-700 dark:text-indigo-300">
                  {infusionPumpRateMlHr} mL/saat
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight font-mono">
                  {infusionHourlyMg} mg/saat akış sağlar ({infusionConcMgMl} mg/mL konsantrasyon).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  24 Saatlik Kümülatif Doz
                </span>
                <div className="text-2xl font-black font-mono text-slate-800 dark:text-slate-200">
                  {infusion24HrMg} mg
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Tolerans gelişimini engeller; opioid ihtiyacını belirgin düzeyde düşürür.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODÜL 4: AKUT ŞİDDETLİ AJİTASYON & ASTIM ACİL MÜDAHALE
            ------------------------------------------------------------------- */}
        {activeCalcTool === 'acute_agitation_and_asthma' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Acil Klinik Durum
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={() => setAgitationRoute('im_emergency')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      agitationRoute === 'im_emergency'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    Excited Delirium (IM Acil Sedasyon)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgitationRoute('iv_emergency')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      agitationRoute === 'iv_emergency'
                        ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    Şiddetli Ajitasyon (IV Yol Açık)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAgitationRoute('status_asthmaticus')}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      agitationRoute === 'status_asthmaticus'
                        ? 'bg-teal-600 text-white border-teal-500 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    Status Asthmaticus İnf.
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Güvenlik ve Başarı Zamanı:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  {agitationRoute === 'im_emergency' && 'IM enjeksiyondan 3–5 dakika sonra dissosiyatif sedasyon başlar. Solunum korunur. Maksimum doz 500 mg tavanı geçmemelidir.'}
                  {agitationRoute === 'iv_emergency' && 'IV yavaş bolus (1–2 dk) ile 60 saniyede etki. Taşikardi ve kan basıncı artışı görülebilir.'}
                  {agitationRoute === 'status_asthmaticus' && 'Bronş düz kaslarını gevşetir, dinamik hiperinflasyonu ve tepe basınçları azaltır.'}
                </p>
              </div>
            </div>

            {/* Sonuç Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {agitationRoute === 'im_emergency' ? 'IM Acil Doz (4.5 mg/kg)' : agitationRoute === 'iv_emergency' ? 'IV Acil Doz (1.5 mg/kg)' : 'Astım Bolusu (1.5 mg/kg)'}
                </span>
                <div className="text-3xl font-black font-mono text-rose-700 dark:text-rose-300">
                  {agitationRoute === 'im_emergency' ? agitationImTotalMg : agitationRoute === 'iv_emergency' ? agitationIvTotalMg : asthmaBolusMg} mg
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Ketalar flakondan çekilecek hacim:{' '}
                  <strong>
                    {agitationRoute === 'im_emergency' ? agitationImTotalMl : agitationRoute === 'iv_emergency' ? agitationIvTotalMl : (asthmaBolusMg / 50).toFixed(1)} mL
                  </strong>{' '}
                  ({agitationRoute === 'im_emergency' ? 'Derin IM vastus lateralis' : 'Yavaş IV puşe'}).
                </p>
              </div>

              {agitationRoute === 'status_asthmaticus' ? (
                <div className="p-4 rounded-xl bg-teal-500/15 border border-teal-500/40 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    Astım İdame İnfüzyon Hızı
                  </span>
                  <div className="text-3xl font-black font-mono text-teal-700 dark:text-teal-300">
                    {asthmaInfusionMgHr} mg/saat
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    1.5 mg/kg/saat sürekli infüzyon. 1 mg/mL solüsyondan <strong>{asthmaInfusionMgHr} mL/saat</strong> pompa hızı.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Post-Sedasyon Güvenlik Takibi
                  </span>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    EtCO₂ &amp; SpO₂ Monitörizasyonu
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Hasta sedasyona girer girmez oksijen desteği, kardiyak ritim ve kapnografi takibi başlatılmalıdır.
                  </p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Uyanma Evresi İçin Hazırlık
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Midazolam 1 – 2 mg IV Hazır Tutun
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Uyanma deliryumu veya nistagmuslu ajitasyon nüksederse düşük doz benzodiazepin enjekte edilir.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0) */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Ketamin 500 mg / 10 mL Flakon (Ketalar %5 — Türkiye Standart Formu)',
            presentation: 'IV/IM enjeksiyon ve infüzyon için berrak, renksiz çoklu doz cam flakon (10 mL)',
            concentration: '50 mg/mL (KONSANTRE!)',
            saltOrBaseNote: '50 mg ketamin baza eşdeğer 57.67 mg ketamin HCl + benzethonium klorür koruyucu içerir. Subanestezik analjezi için doğrudan puşe EDİLMEMELİ; mutlaka 10 mg/mL’ye sulandırılmalıdır.',
            alertLevel: 'high',
          },
          {
            name: 'Esketamin (Ketanest S — S(+)-Ketamin) & Spravato 28 mg İntranazal',
            presentation: 'S(+) enantiomer IV form (bazı merkezlerde) ve tedaviye dirençli depresyonda 28 mg intranazal sprey cihazı (Spravato)',
            concentration: 'Rasemik Ketaminden 2× Potent',
            saltOrBaseNote: 'Esketamin (S-izomer) rasemik ketaminden ~2 kat daha güçlüdür; yanlışlıkla rasemik ketamin dozunda uygulanırsa 2 kat aşırı doz oluşur.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'IV Bolus / Subanestezik Analjezi Standardı (10 mg/mL): 2 mL Ketalar (100 mg) + 8 mL %0.9 NaCl → toplam 10 mL (1 mL = 10 mg; yatak başı doz hatasını önler).',
          'YBÜ / Akut Ağrı Sürekli İnfüzyonu (1 mg/mL veya 2 mg/mL): 500 mg (10 mL) + 490 mL SF/D5W → 1 mg/mL; sıvı kısıtlı hastada 200 mg (4 mL) + 96 mL SF → 2 mg/mL.',
          'Ketofol 1:1 (20 mL Enjektör): 2 mL Ketalar (100 mg) + 10 mL Propofol %1 (100 mg) + 8 mL SF → her 1 mL = 5 mg Ketamin + 5 mg Propofol.',
          'Acil IM Sedasyon / Excited Delirium: 50 mg/mL saf flakon sulandırılmadan derin IM (vastus lateralis) enjekte edilir (küçük hacim avantajı; maks 500 mg).',
        ]}
        concentrationTrapWarning="Türkiye’deki tek yaygın IV/IM form olan Ketalar 500 mg/10 mL (50 mg/mL) flakon son derece konsantredir! 0.1–0.3 mg/kg sub-dissosiyatif analjezide sulandırılmadan çekilirse 5 kat aşırı doz ve ani disosiasyon/apne riski doğar. Daima 10 mg/mL’ye sulandırıp etiketleyin."
      />

      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0) */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="peripheral-ok"
        accessSummary="Periferik veya santral IV hattan güvenle uygulanır; ayrıca damar yolu olmayan acillerde derin IM, intranazal (MAD) ve oral yollarla etkilidir. Hızlı IV bolus (< 30 sn) geçici apne ve belirgin taşikardi/hipertansiyon yaptığından en az 60 saniyede yavaş verilmelidir."
        phRange="3.5 – 5.5 (Asidik)"
        osmolalityNote="50 mg/mL konsantre form ~300 mOsm/kg (izotonik), 1–10 mg/mL SF/D5W dilüsyonları izotoniktir. Oda sıcaklığında (15–25 °C) ışıktan korunarak saklanır, dondurulmaz."
        compatibleDiluents={[
          '%0.9 Sodyum Klorür (İzotonik SF) — 24 saat stabil',
          '%5 Dekstroz (D5W) — 24 saat stabil',
          'Propofol %1 (Ketofol enjektör karışımı) — en az 3–4 saat fizikokimyasal olarak stabil',
        ]}
        stabilityNote="Hazırlanan 1–2 mg/mL SF/D5W infüzyonları oda sıcaklığında 24 saat stabildir. Ketofol karışımında lipid partikül çapı ≥ 3–4 saat korunur, aynı gün içinde aseptik tüketilmelidir."
        ySiteCompatible={[
          'Propofol (Ketofol)',
          'Midazolam',
          'Fentanil',
          'Remifentanil',
          'Morfin',
          'Deksmedetomidin',
          'Lidokain',
          'Norepinefrin',
          'Epinefrin',
          'Roküronyum',
        ]}
        ySiteIncompatible={[
          'Tiyopental / Barbitüratlar (anında çökelme!)',
          'Diazepam (presipitasyon!)',
          'Sodyum Bikarbonat',
          'Furosemid',
          'Fenitoin',
        ]}
        extravasationProtocol="İzotonik ve non-vezikandır; ekstravazasyonda doku nekrozu beklenmez. İnfüzyonu durdurun, kateterden aspire edin ve lokal soğuk/ılık kompres uygulayın. Tiyopental veya diazepam ile aynı lümenden verilmesi derhal beyaz çökelme ve kateter tıkanması yapar."
      />

      {/* BÖBREK & KARACİĞER YETMEZLİĞİNDE DOZ YÖNETİMİ (v4.0) */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Tek dozda ayar gerekmez; uzamış YBÜ infüzyonunda aktif Norketamin metabolit birikimi izlenmelidir."
        renalDetails={[
          'Ketaminin <%4’ü böbreklerden değişmeden atılır; KBY, hemodiyaliz (HD), periton diyalizi ve CRRT’de tek bolus RSI/prosedürel sedasyon dozu değişmez.',
          'Aktif metabolit Norketamin ve glukuronid konjugatlarının %90’ı idrarla atılır; eGFR < 30 mL/dk hastalarda uzun süreli (>24–48 saat) YBÜ infüzyonunda sedasyon ve psikomimetik etki uzayabilir — infüzyon hızını %25–30 azaltın.',
        ]}
        hepaticSummary="Child-Pugh B/C sirozda hepatik CYP2B6/3A4 klerensi belirgin düşer; tekrarlayan bolus ve infüzyon dozları azaltılmalıdır."
        hepaticDetails={[
          'Child-Pugh A: Tek doz indüksiyonda ayar gerekmez; infüzyonda standart klinik titrasyon.',
          'Child-Pugh B / C: Hepatik kan akımına bağımlı yüksek ekstraksiyonlu ilaçtır; sirozda yarı ömür uzar ve uyanma gecikir — idame infüzyonu %25–50 azaltın, tekrarlayan bolus aralıklarını uzatın.',
        ]}
        {...STANDALONE_ORGAN_PART2['ketamine']}
      />

      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0) */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="%30–50 Başlangıç Doz Azaltımı"
        geriatricPoints={[
          'Yaşlı (>65 yaş) ve kırılgan hastalarda uyanma deliryumu, disfori, postoperatif konfüzyon ve sempatik kardiyovasküler yük (taşikardi, hipertansiyon, miyokard O₂ tüketimi artışı) belirgin daha yüksektir.',
          'Hem RSI/prosedürel sedasyon hem de sub-dissosiyatif analjezi başlangıç dozları %30–50 azaltılmalı (örn. analjezi için 0.1–0.15 mg/kg 15 dk infüzyon) ve koroner rezervi sınırlı yaşlılarda yakın EKG/tansiyon izlenmelidir.',
          'Uyanma deliryumu profilaksisi için düşük doz benzodiazepin (0.5–1 mg midazolam) veya Ketofol kombinasyonu değerlendirilebilir.',
        ]}
        obesityWeightScalarBadge="LBW (Tercih) veya IBW"
        obesityPoints={[
          'SOBA ve Miller’s Anesthesia kılavuzları: Ketamin yüksek lipofilik olduğundan morbid obez hastalarda (BMI ≥ 30–40 kg/m²) TBW ile dozlama aşırı psikomimetik yan etkilere, hipertansiyona ve uzamış derlenmeye yol açar.',
          'İndüksiyon bolusu için Yağsız Vücut Kütlesi (LBW) veya İdeal Vücut Ağırlığı (IBW), subanestezik analjezi infüzyonu için IBW/LBW kullanılmalıdır.',
          'Spontan solunum dürtüsünü koruduğu için OSA’lı obezlerde opioid-sparing analjezi avantajı sunar; ancak artmış faringeal sekresyon ve laringospazma karşı aspiratör hazır olmalıdır.',
        ]}
        clinicalNote="Yukarıdaki etkileşimli hesaplayıcı içindeki Obezite Doz Ölçekleyici ile hastanın LBW/IBW değeri tek tıkla hesaplamaya aktarılabilir."
      />

      {/* =========================================================================
          BÖLÜM 10: GEBELİK VE LAKTASYON KILAVUZU
          ========================================================================= */}
      <section
        id="sec-gebelik"
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
              Gebelik ve Laktasyon Kılavuzu
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              FDA / TGA gebelik kategorisi, uterin tonus, plasental geçiş ve emzirme güvenliği
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block text-xs">
              1. FDA / TGA Gebelik Sınıfı &amp; Uterin Etkiler
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Kategori:</strong> FDA Kategori B (uzamış kullanımda veya terme yakın yüksek dozlarda Kategori D).<br />
              • <strong>Uterin Tonus ve Kontraktilite:</strong> Düşük analjezik dozlarda (0.2–0.5 mg/kg) uterin tonusu bozmaz ve uterin kan akımını korur. Ancak yüksek indüksiyon dozlarında (&gt;2 mg/kg) uterin bazal tonusunu tetikleyerek fetal distres riski oluşturabilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block text-xs">
              2. Plasental Geçiş &amp; Doğum Eylemi / Sezaryen
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Hızlı Plasental Geçiş:</strong> Lipofilik yapısıyla saniyeler içinde plasentayı geçer (fetal/maternal oranı ~0.8–1.0).<br />
              • <strong>Maternal Şokta Sezaryen İndüksiyonu:</strong> Maternal kanama, dekompanse hipovolemi veya şiddetli astımı olan gebelerde acil genel anestezi indüksiyonunda (1.0 mg/kg IV) sempatik destek sağlayarak hayat kurtarıcı bir alternatiftir.<br />
              • <strong>Fetal İzlem:</strong> Yüksek dozlarda neonatal solunum depresyonu ve hipertonisite yapabilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              3. Laktasyon, Anne Sütü &amp; Emzirme Güvenliği
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Süte Minimum Geçiş:</strong> Anne sütüne geçen ketamin ve norketamin miktarı düşüktür (relatif infant dozu RID &lt; %2).<br />
              • <strong>Emzirmeye Dönüş:</strong> Anne işlem veya anesteziden tamamen uyanıp koopere olduğunda bebeği güvenle emzirebilir.<br />
              • <strong>"Pump &amp; Dump" Gerekmez:</strong> Tek doz uygulamalarda sütün sağılıp dökülmesine gerek yoktur.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 9: UYANMA REAKSİYONLARI VE "EMERGENCE" DELİRYUMU YÖNETİMİ
          ========================================================================= */}
      <section
        id="sec-emergence"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Uyanma Reaksiyonları &amp; "Emergence" Deliryumu Yönetimi
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Canlı rüyalar, halüsinasyonlar, disfori patofizyolojisi ve kanıta dayalı önleme protokolleri
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-purple-700 dark:text-purple-300 block">Klinik Görünüm &amp; Risk Oranı</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yetişkinlerin yaklaşık <strong>%10 – 20'sinde</strong> uyanma evresinde canlı rüyalar, yüzen vücut hissi (out-of-body), illüzyonlar, öfori veya korkutucu halüsinasyonlar görülür.
              Çocuklarda bu oran belirgin şekilde düşüktür (%3 – 5).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
              Profilaktik Benzodiazepin &amp; Çevre Kontrolü
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              İşlem öncesinde veya esnasında uygulanan <strong>1 – 2 mg IV Midazolam</strong>, uyanma deliryumu insidansını %70'in üzerinde azaltır.
              Hastanın loş, sessiz, minimal işitsel ve dokunsal uyaran içeren bir ortamda derlenmeye bırakılması reaksiyonları dramatik azaltır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 space-y-2">
            <span className="font-bold text-teal-700 dark:text-teal-300 block">Hipersalivasyon &amp; Laringospazm</span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Ketamin bronşiyal ve tükürük salgılarını artırır. Pediatrik girişimlerde veya hava yolu manevralarında aşırı sekresyona bağlı laringospazmı önlemek için profilaktik <strong>Atropin (0.01 mg/kg)</strong> veya <strong>Glikopirolat</strong> düşünülebilir.
            </p>
          </div>
        </div>
      </section>

      {/* ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS) */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Emergence Reaksiyonları & Halüsinasyonlar',
            incidenceOrSeverity: '%10–20 (Erişkin)',
            detail:
              'Canlı rüyalar, beden dışı deneyim, disfori, korkutucu halüsinasyonlar ve ajitasyon görülür; profilaktik 1–2 mg IV Midazolam veya Propofol (Ketofol) ile > %70 önlenir.',
            tone: 'indigo',
          },
          {
            title: 'Sempatik Stimülasyon (Taşikardi & HT)',
            incidenceOrSeverity: 'Sık (Doza Bağımlı)',
            detail:
              'Santral sempatik çıkış ve nöronal katekolamin geri alım inhibisyonu ile kalp hızı, kan basıncı ve miyokard O₂ tüketimi (MVO₂) artar; ciddi KAH/aort diseksiyonunda zararlı olabilir.',
            tone: 'amber',
          },
          {
            title: 'Hipersalivasyon & Laringospazm',
            incidenceOrSeverity: '%5–10 (Pediatri)',
            detail:
              'Tükürük ve trakeobronşiyal sekresyonları artırır; pediatrik prosedürel sedasyonda faringeal sekresyon birikimi refleks laringospazma (%0.3–1) zemin hazırlayabilir.',
            tone: 'amber',
          },
          {
            title: 'Bulantı, Kusma & Nistagmus',
            incidenceOrSeverity: '%5–15',
            detail:
              'Derlenme döneminde bulantı/kusma sıkça görülür; horizontal/rotatuar nistagmus, diplopi ve geçici kas tonusu artışı (tonik-klonik olmayan miyoklonus) normal disosiyatif bulgudur.',
            tone: 'teal',
          },
          {
            title: 'Hızlı IV Bolusta Geçici Apne',
            incidenceOrSeverity: 'Hızlı Enjeksiyon',
            detail:
              'Solunum dürtüsünü genellikle korusa da yüksek dozun (< 30 sn) çok hızlı IV puşesi 1–2 dakikalık geçici santral apneye neden olabilir; 60 saniyede yavaş verilmelidir.',
            tone: 'rose',
          },
          {
            title: 'Ketamin Üropatisi & Kolanjiopati',
            incidenceOrSeverity: 'Kronik / Yüksek Doz',
            detail:
              'Uzamış yüksek doz kullanımda veya kötüye kullanımda ürotelyal toksisiteye bağlı hemorajik/ülseratif sistit, dizüri, hidronefroz ve safra yolu dilatasyonu/kolestaz gelişebilir.',
            tone: 'rose',
          },
        ]}
      />

      {/* KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Katekolamin Rezervi Tükenmiş Kronik Şok (Paradoks Hipotansiyon!)',
            detail:
              'Ketamin doğrudan inotropik değildir; miyokardı hafifçe deprese eder, ancak sağlam sempatik sistem üzerinden tansiyonu yükseltir. Uzun süreli septik/kardiyojenik şokta adrenal/sempatik rezervi tükenmiş hastalarda paradoksal ağır hipotansiyon ve bradikardi yapabilir — indüksiyon dozu 0.5–1.0 mg/kg’a düşürülmeli ve vazopressör hazır olmalıdır.',
          },
          {
            title: 'Koroner Arter Hastalığı, Aort Diseksiyonu & Kontrolsüz Hipertansiyon',
            detail:
              'Sempatik deşarja bağlı taşikardi ve artmış MVO₂ miyokard iskemisini veya aort duvar stresini tetikleyebilir; bu hastalarda opioid ile küntleştirilmeli veya alternatif indüksiyon ajanları seçilmelidir.',
          },
          {
            title: 'KİBAS ve Göz İçi Basıncı (GİB) Güncel Kanıtları',
            detail:
              'Klasik textbook uyarısının aksine, normokapni korunduğunda ve kontrollü ventilasyon altında Ketamin kafa içi basıncını (KİB) kritik yükseltmez; travmatik beyin hasarı + şok birlikteliğinde serebral perfüzyon basıncını (CPP) koruması nedeniyle güvenle kullanılmaktadır.',
          },
          {
            title: 'Aktif Psikoz, Şizofreni & Bipolar Mani',
            detail:
              'NMDA antagonizması psikotomimetik semptomları ve halüsinasyonları ağırlaştırabileceğinden aktif psikozlu olgularda mümkünse kaçınılmalıdır.',
          },
          {
            title: 'Hava Yolu Refleksleri & Aspirasyon Yanılgısı',
            detail:
              'Faringeal/laringeal koruyucu refleksler kısmen korunsa da tam aspirasyon koruması sağlamaz! Tam tok mide/RSI endikasyonunda yine hızlı seri entübasyon ve NMB (roküronyum/süksinilkolin) uygulanmalıdır.',
          },
          {
            title: 'Barbitürat ve Diazepam ile İV Geçimsizlik',
            detail:
              'Aynı damar yolundan Tiyopental veya Diazepam ile karıştırıldığında fizikokimyasal çökelme (presipitasyon) olur ve kateteri tıkar; ayrı lümen veya yıkama şarttır.',
          },
        ]}
      />

      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Heterotetramerik NMDA [GluN1/GluN2A–D] Kanal Por İçi Fensiklidin [PCP] Bölgesi, HCN1 Kanalları & NET/σ₁ Etkileşimi)',
          summary:
            'Ketamin, kiral bir arilsikloheksilamin türevidir (S(+)-ketamin [Esketamin] enantiyomeri, NMDA kanal poruna R(−)-ketamine kıyasla 3–4 kat daha yüksek afinite [Ki ~0,3–0,5 µM vs ~1,2 µM] gösterir). Propofol ve benzodiazepinlerin aksine GABA-A reseptörüne bağlanmaz; santral nöron zarlarındaki heterotetramerik NMDA (GluN1 / GluN2A–D) iyonotropik glutamat reseptörlerinin transmembran poru içindeki Fensiklidin (PCP) bağlanma bölgesine açık-kanal blokeri (uncompetitive open-channel pore blocker) olarak yerleşir ve eşzamanlı olarak kortikal HCN1 kanalları ile presinaptik monoamin taşıyıcılarını modüle eder (Miller’s 10th Ed. / Stoelting’s 6th Ed. / Goodman & Gilman 14th Ed.).',
          points: [
            'NMDA (GluN1/GluN2A–D) Transmembran Kanal Por İçi Fensiklidin (PCP) Bağlanma Bölgesi: Reseptörün M2 por-oluşturucu ilmeğindeki asparajin halkası (N-site; fizyolojik Mg²⁺ bloğu bölgesi) yakınındaki derin hidrofobik PCP cebine bağlanır. Bağlanabilmesi için önce glutamat ve ko-agonist glisinin (veya D-serinin) ekstraselüler bölgeye bağlanarak kanal kapısını açması ve zarın kısmen depolarize olarak Mg²⁺ tıkaçını uzaklaştırması gerekir ("use-dependent / open-channel trapping block").',
            'GABAerjik İnhibitör İnternöronlar vs Spinal Arka Boynuz WDR Nöron Seçiciliği: Düşük-orta (subanestezik) konsantrasyonlarda yüksek ateşleme hızına sahip tonik aktif kortikal/limbik GABAerjik inhibitör internöronlar üzerindeki GluN2C/2D-içeren NMDA reseptörlerini öncelikli bloke eder (kortikal piramidal nöronların disinhibisyonu); spinal kord arka boynuzunda (Lamina I–II ve V) ise geniş dinamik aralıklı (Wide-Dynamic-Range / WDR) projeksiyon nöronlarının postsinaptik NMDA kanallarını kapatır.',
            'Talamokortikal HCN1 Pacemaker Kanalları & Sigma-1 (σ₁) / Opioid / Kolinerjik Membran Hedefleri: Kortikal ve talamik piramidal nöron zarındaki Hiperpolarizasyonla Aktive Siklik Nükleotid-Kapılı 1 (HCN1) katyon kanallarını inhibe ederek hipnotik ve talamokortikal disosiyatif kopukluğa doğrudan katkıda bulunur; endoplazmik retikulum/plazma zarı σ₁ şaperon reseptörlerini, µ/κ-opioid reseptörlerini ve santral/bronşiyal muskarinik (M₁–M₃) / nikotinik asetilkolin reseptörlerini modüle eder.',
            'Presinaptik Sempatik Sinir Ucu NET Taşıyıcısı & Bronş/Vasküler L-Tipi Ca²⁺ Kanalları: Sempatik sinir terminallerinde Norepinefrin Taşıyıcısını (NET / Uptake-1) inhibe ederek sinaptik katekolamin konsantrasyonunu yükseltir; bronş düz kası ve kardiyomiyosit sarkolemmasında ise L-tipi voltaj kapılı Ca²⁺ (Cav1.2) kanallarını doğrudan inhibe eder.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'NMDA porunun ve HCN1 kanallarının kapanması; spinal arka boynuzda Ca²⁺-CaMKII-nNOS-NO "wind-up" kaskadını durdururken, prefrontal kortekste AMPA-BDNF-mTOR sinaptogenez yolağını ateşler ve kardiyomiyositlerde sempatik deşarjla maskelenen hücresel Ca²⁺ baskılanması üretir:',
          points: [
            'Spinal Arka Boynuz WDR Nöronu İçi (Ca²⁺/Na⁺ Akışının Durması → CaMKII, PKC & nNOS/NO-cGMP Wind-Up Kaskadı İnhibisyonu): NMDA kanal porunun tıkanmasıyla postsinaptik nörona Ca²⁺ ve Na⁺ girişi kesilir. Sitozolik [Ca²⁺]i yükselişinin durması; (1) Kalsiyum/Kalmodulin-Bağımlı Protein Kinaz II (CaMKII) ve Protein Kinaz C (PKC) aktivasyonunu, (2) nöronal Nitrik Oksit Sentaz (nNOS) → NO → solübl Guanilat Siklaz → cGMP retrograd sinyal kaskadını ve (3) µ-opioid reseptörlerinin PKC-aracılı fosforilasyon/desensitizasyonunu bloke eder → "wind-up" fenomeni, santral sensitizasyon, allodini ve opioid kaynaklı hiperaljezi (OIH) hücresel düzeyde kırılır.',
            'Prefrontal Korteks & Hipokampus İçi (GABAerjik İnternöron Bloku → Glutamat/AMPA Akışı → BDNF–TrkB–mTORC1 Kaskadı): Tonik GABAerjik internöronlardaki NMDA blokajı piramidal glutamaterjik nöronları serbest bırakır (disinhibisyon); presinaptik uçtan salınan glutamat postsinaptik AMPA reseptörlerini uyarır. AMPA aracılı depolarizasyon voltaj-kapılı Ca²⁺ kanallarını açarak Beyin Kaynaklı Nörotrofik Faktör (BDNF) ekzositozunu, TrkB reseptör otofosforilasyonunu ve PI3K–Akt–mTORC1 (mammalian target of rapamycin) ile eEF2 (ökaryotik elongasyon faktörü-2) kinaz inhibisyonunu tetikler → hızlı dendritik diken (spine) protein sentezi ve antidepresan/nöroplastik sinaptogenez gerçekleşir (aktif metabolit (2R,6R)-hidroksinorketamin [HNK] de AMPA üzerinden bu yolağı destekler).',
            'Talamokortikal Piramidal Nöron İçi (HCN1 / Ih Akımı Blokajı & Elektriksel Disosiyasyon): HCN1 kanallarının kapanmasıyla hiperpolarizasyonla aktive olan içeri yönlü Na⁺/K⁺ pacemaker akımı (Ih) kesilir, dendritik membran giriş direnci değişir ve talamus ile neokorteks faz-kilitlemesi koparılırken limbik (hipokampal/amigdalar) ağlarda yüksek frekanslı γ (30–80 Hz) ve θ osilasyonları ortaya çıkar.',
            'Kardiyomiyosit vs Bronş Düz Kas Hücresi İçi Ca²⁺ Dinamiği: İzole kardiyomiyosit içinde sarkolemmal L-tipi Ca²⁺ akımını (ICa,L) ve sarkoplazmik retikulum Ca²⁺ salınımını doğrudan baskılar (intrinsik negatif inotropi); ancak sağlam hastada santral sempatik deşarj ve NET blokajıyla yükselen noradrenalin kardiyomiyosit β₁ → Gαs → cAMP → PKA kaskadını uyararak bu depresyonu fazlasıyla örter. Bronş düz kas hücresinde ise hem L-tipi Ca²⁺ girişi/muskarinik Gαq-IP₃ kaskadı doğrudan bloke edilir hem de dolaşımdaki katekolaminler β₂ → Gαs → cAMP → PKA → MLCK inhibisyonu yaparak çift mekanizmalı gevşeme üretir.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Talamokortikal-Limbik Ağ, Spinal Arka Boynuz & Serebral Yatak → SSS, Ağrı & EEG',
            tissueTarget: 'Talamus–Korteks · Limbik Sistem · Lamina I–V WDR · Serebral Damar',
            accent: 'indigo',
            points: [
              'Talamokortikal-Limbik Disosiyasyon & EEG/BIS Paradoksu: Talamustan somatosensoryel kortekse giden duyusal girdi kesilirken limbik sistem ve retiküler aktive edici sistem (RAS) açık kalır → hasta gözleri açık, horizontal/rotatuar nistagmuslu ve kataleptik görünürken ağrıyı algılamaz ve hatırlamaz. Kortikal yüksek frekanslı gama (30–80 Hz) ve teta dalgalarını artırdığı için BIS / Entropi monitörünü YAPAY OLARAK YÜKSEK (60–80) gösterir (BIS derinlik takibinde güvenilmezdir!).',
              'Spinal/Supraspinal Multimodal Analjezi & Anti-Hiperaljezi: Propofol, etomidat ve midazolamdan farklı olarak tek başına güçlü somatik analjezi sağlayan TEK IV indüksiyon ajanıdır; spinal arka boynuz WDR nöronlarında NMDA wind-up blokajıyla yanık, travma, nöropatik ağrı ve kronik opioid toleransında/OIH’de ağrı iletimini keser.',
              'Serebral Hemodinami (CBF, CMRO₂, ICP & CPP): Tarihsel "KİBAS kontrendikasyonu" çürütülmüştür; normokapnik mekanik ventilasyon altında ICP’yi kritik yükseltmez, aksine sistemik MAP’ı düşürmediği için Travmatik Beyin Hasarı (TBI) + hemorajik/septik şok birlikteliğinde Serebral Perfüzyon Basıncını (CPP = MAP − ICP) propofolden daha güvenle korur.',
            ],
          },
          {
            systemTitle: 'Sempatik Sinir Uçları, Miyokard Dokusu & Pulmoner Damar → Kardiyovasküler Fizyoloji',
            tissueTarget: 'Santral Otonom Çekirdekler · NET · Kardiyomiyosit · Pulmoner Arter',
            accent: 'rose',
            points: [
              'İndirekt Sempatomimetik Yanıt (Sağlam Sempatik Rezerv): Santral otonomik sempatik deşarj artışı ve periferik nöronal NET (Uptake-1) geri alım blokajıyla plazma noradrenalin/adrenalin düzeyi yükselir → enjeksiyondan 2–5 dk sonra Kalp Hızı (%15–30 ↑), MAP, Kardiyak İndeks (CI) ve SVR artar; akut hemorajik şok, travma ve perikardiyal tamponad RSI indüksiyonunda hayat kurtarıcıdır.',
              'Katekolamin Deplesyonlu Şok Paradoksu (Maskelenmiş Negatif İnotropinin Açığa Çıkışı): Ketamin miyokard dokusunda intrinsik olarak direkt negatif inotroptur (Cav1.2 ve SR Ca²⁺ depresyonu). Uzun süreli septik şok, ileri kardiyojenik şok veya yoğun bakımda günlerdir yüksek doz vazopresör alan hastalarda presinaptik katekolamin vezikülleri boşalmış ve β₁ reseptörleri down-regüle olduğundan sempatik kompansasyon çalışmaz → ketaminin direkt miyokard depresan etkisi maskesiz kalarak ani derin hipotansiyon ve kardiyak arrest yapabilir (doz 0,5–1,2 mg/kg’a düşürülmelidir!).',
              'Miyokard Oksijen Tüketimi (MVO₂) & Pulmoner Vasküler Direnç (PVR): Taşikardi, artmış kontraktilite ve afterload nedeniyle miyokard O₂ tüketimini (MVO₂) ve pulmoner arter basıncını (PVR) artırır; bu nedenle akut koroner sendrom, ciddi koroner arter hastalığı, aort diseksiyonu ve ağır sağ kalp yetmezliği/pulmoner hipertansiyonda dikkatli olunmalı veya kaçınılmalıdır.',
            ],
          },
          {
            systemTitle: 'Bronş Düz Kası, Medüller Solunum Merkezi & Üst Havayolu → Solunum Fizyolojisi',
            tissueTarget: 'Trakeobronşiyal Düz Kas · Pre-Bötzinger · Faringeal/Tükürük Bezleri',
            accent: 'teal',
            points: [
              'Güçlü Bronkodilatasyon (Status Asthmaticus Altın Standardı): Hem dolaşımdaki katekolaminlerin bronşiyal β₂ reseptörlerini uyarması hem de bronş düz kasında L-tipi Ca²⁺ girişi ve vagal M₃ muskarinik bronkokonstriksiyonun direkt blokajıyla havayolu direncini hızla düşürür; refrakter status asthmaticus RSI indüksiyonu ve mekanik ventilasyon sedasyonunda 1. tercihtir.',
              'Medüller Solunum Merkezi & CO₂ Yanıtının Korunumu: Propofol, opioidler ve midazolamın aksine medüller pre-Bötzinger solunum merkezinin hiperkapnik (PaCO₂) ventilatuar yanıtını ve fonksiyonel rezidüel kapasiteyi (FRC / interkostal kas tonusunu) terapötik dozlarda korur; ancak yüksek dozun çok hızlı IV puşesi (<30 sn) geçici (1–2 dk) santral apne yapabilir.',
              'Üst Havayolu Tonusu, Hipersalivasyon & Laringospazm: Genioglossus ve faringeal dilatatör kas tonusunu büyük ölçüde korusa da tam aspirasyon güvenliği sağlamaz. Kolinerjik/otonomik uyarımla tükürük ve trakeobronşiyal mukus sekresyonunu artırır; faringeal sekresyonların vokal kordları uyarması özellikle çocuklarda refleks laringospazm (%0,3–1) tetikleyebilir (gerekirse glikopirolat/atropin).',
            ],
          },
          {
            systemTitle: 'Hepatik CYP2B6/3A4, Ürotelyum, Safra Yolları & İskelet Kası → Sistemik Organlar',
            tissueTarget: 'Hepatosit CYP2B6/3A4 · Mesane Ürotelyumu · Safra Kanalı · Çizgili Kas',
            accent: 'amber',
            points: [
              'Hepatik Biyotransformasyon & Aktif Norketamin / HNK Metabolitleri: Yüksek hepatik ekstraksiyon oranıyla (~0,9; karaciğer kan akımına bağımlı) CYP2B6 ve CYP3A4 tarafından N-demetilasyonla aktif Norketamine (ana ilacın ~%20–30’u kadar analjezik/hipnotik güçte) ve ardından hidroksinorketamin (HNK) ile glukuronid konjugatlarına dönüştürülerek idrarla (%90) atılır; ileri sirozda ve eGFR < 30 mL/dk’da >24–48 saat infüzyonda norketamin birikerek uyanmayı uzatır.',
              'Ürotelyum & Safra Yolu Epiteli (Ketamin Üropatisi & Kolanjiopati): Yüksek doz uzamış YBÜ infüzyonlarında veya kronik suistimalde idrarla atılan ketamin/norketamin metabolitleri mesane ürotelyumunda doğrudan sitotoksisite, mikrovasküler hasar ve mast hücre infiltrasyonu yaparak steril hemorajik/ülseratif sistit ve hidronefroza; safra yollarında ise Oddi sfinkteri NMDA/düz kas etkisiyle biliyer dilatasyon ve kolestatik KC enzim artışına (ketamin kolanjiopatisi) yol açabilir.',
              'İskelet Kası Tonusu, Göz & Nöroendokrin/İmmün Sistem: Subkortikal ekstrapiramidal aktivasyonla çizgili kas tonusunu artırır (katalepsi, tonik-klonik olmayan rastgele miyoklonik sıçramalar, nistagmus ve hafif göz içi basıncı artışı). Adrenal korteks kortizol sentezini baskılamaz, Malign Hipertermi tetiklemez ve TLR4/NF-κB inhibisyonuyla proinflamatuar sitokinleri (IL-6, TNF-α) azaltır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Açık-Kanal Trapping Bloku, Katekolamin Tükenmesi, Ketofol & Opioid-Sparing Sinerji',
          summary:
            'Ketaminin farmakodinamik profili; NMDA porundaki voltaj/kullanım-bağımlı "trapping" kinetiği, sub-dissosiyatif dozlardan tam disosiyatif anesteziye geçiş eşiği ve GABAerjik ajanlarla (Propofol/Midazolam) kurduğu tamamlayıcı denge üzerine kuruludur.',
          points: [
            'Açık-Kanal "Trapping" Kinetiği & Sub-Dissosiyatif vs Tam Disosiyatif Eşik: Düşük plazma konsantrasyonlarında (0,1–0,3 mg/kg; plazma ~100–200 ng/mL) yalnızca patolojik yüksek frekansla ateşleyen spinal arka boynuz nosiseptif NMDA kanalları ve tonik kortikal GABAerjik internöronlar bloke olur (bilinç korunurken saf anti-hiperaljezi/analjezi); plazma düzeyi >1.000–2.000 ng/mL’yi (1–2 mg/kg IV veya 4–5 mg/kg IM) aştığında ise talamokortikal NMDA ve HCN1 kanalları doygunluğa ulaşarak "tavan" niteliğinde tam disosiyatif anestezi başlar (bu eşiğin üzerinde ek doz derinliği artırmaz, yalnızca uyanma süresini uzatır!).',
            'Katekolamin Deplesyonunda Hemodinamik Tersine Dönüş (Unmasking Kinetics): Sağlam hastada sempatik NET blokajı ve santral sempatik çıkış, ketaminin kardiyomiyosit Cav1.2 üzerindeki direkt negatif inotropik etkisini maskeler; ancak presinaptik noradrenalin vezikülleri tükenmiş uzamış şokta bu maske kalkar ve doz-bağımlı miyokardiyal depresyon açığa çıkar.',
            'Ketofol (Ketamin + Propofol) Karşılıklı Farmakodinamik Nötralizasyon Sinerjisi: Propofol (GABA-A β₂/β₃ hiperpolarizasyonu) ketaminin kortikal GABAerjik internöron disinhibisyonuna bağlı psikotomimetik "emergence" halüsinasyonlarını, taşikardisini, hipertansiyonunu ve bulantısını baskılarken; ketamin (NMDA blokajı + sempatik tonus) propofolün SVR düşüşünü, hipotansiyonunu, apnesini ve analjezi eksikliğini dengeler.',
            'Opioid Toleransı & Opioid Kaynaklı Hiperaljezi (OIH) Geri Döndürme Sinerjisi: Yüksek doz remifentanil veya kronik opioid maruziyetinde C-liflerinden salınan glutamat spinal NMDA reseptörlerini aktive ederek PKC/NO üzerinden µ-opioid reseptörlerini duyarsızlaştırır (OIH/tolerans); düşük doz ketamin infüzyonu (0,1–0,3 mg/kg/saat) bu kısır döngüyü kırarak opioid duyarlılığını restore eder ve opioid tüketimini %30–50 düşürür.',
          ],
        }}
        clinicalPearls={[
          'BIS Monitörü Tuzağı (Yüksek BIS = Yüzeyel Anestezi Değildir!): Genel anestezi veya TIVA sırasında hastaya 0,5 mg/kg ketamin eklendiğinde kortikal 30–80 Hz gama aktivitesi arttığı için BIS değeri 45’ten 70–75’e fırlayabilir; bunu "hasta uyanıyor" sanarak propofol veya sevofluran dozunu artırmak ağır hipotansiyona yol açar.',
          'Sub-Dissosiyatif Analjezi Bolusunu Neden 15 Dakikada İnfüze Etmeliyiz? 0,2–0,3 mg/kg (15–20 mg) akut ağrı dozu 30 saniyede IV puşe yapılırsa beyin pik konsantrasyonu disosiyatif eşiği aşarak hastada korkutucu gerçeklik algısı kaybı, baş dönmesi ve nistagmus yapar; aynı doz 100 mL SF içinde 15 dakikada verildiğinde analjezik etkinlik birebir korunurken psikomimetik yan etki %80 azalır.',
          'Disosiyatif Eşik Tavanı (1,5–2 mg/kg IV / 4–5 mg/kg IM): Ketamin bir kez tam disosiyasyon eşiğine ulaştığında (1,5–2 mg/kg IV) daha yüksek doz (örn. 3–4 mg/kg IV) vermek "daha derin" sedasyon sağlamaz; yalnızca ilaç redistribüsyonunu ve uyanma süresini uzatır.',
          'Emergence Reaksiyonu (Uyanma Deliryumu) Patofizyolojisi & Tedavisi: Beyinden ketamin temizlenirken işitsel ve görsel talamokortikal çekirdekler farklı hızlarda normale döndüğünden erişkinlerin %10–20’sinde canlı halüsinasyon ve ajitasyon gelişir; sessiz/loş derlenme ortamı ve GABAerjik internöron tonusunu yerine koyan 1–2 mg IV Midazolam (veya küçük doz Propofol) tabloyu dakikalar içinde çözer.',
        ]}
      />

      {/* =========================================================================
          BÖLÜM 13: ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA
          ========================================================================= */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Ketamin"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Tiyopental / Barbitüratlar · Diazepam (Aynı IV Hat / Enjektör)',
            mechanism: 'Fizikokimyasal Asit–Baz Presipitasyonu',
            clinicalEffect: 'Anında beyaz çökelme, partikül embolisi riski ve IV kateter tıkanması.',
            management: 'Asla aynı enjektörde veya aynı Y-site lümende karıştırmayın; ayrı hat kullanın veya hattı SF ile yıkayın.',
          },
          {
            severity: 'D',
            agent: 'Sempatomimetikler (Epinefrin, Norepinefrin, Kokain, Amfetamin) · MAOİ · Tiroid Hormonları',
            mechanism: 'Sinerjik Katekolamin Geri Alım İnhibisyonu & Adrenerjik Aktivasyon',
            clinicalEffect: 'Şiddetli hipertansif kriz, malign taşiaritmi ve miyokard iskemisi riski.',
            management: 'Kontrolsüz hipertansiyon, hipertiroidi veya MAOİ kullananlarda alternatif ajan seçin; zorunluysa düşük doz + yakın EKG/kan basıncı takibi.',
          },
          {
            severity: 'D',
            agent: 'Teofilin / Aminofilin (Status Asthmaticus Kombinasyonu)',
            mechanism: 'Aditif Kortikal Eksitasyon & Nöbet Eşiği Düşüşü',
            clinicalEffect: 'Ekstansör rijidite ve jeneralize nöbet (konvülsiyon) eşiğinde belirgin düşüş.',
            management: 'Teofilin alan astım hastasında ketamin kullanılacaksa yakın nörolojik izlem ve yatak başı benzodiazepin hazır bulundurun.',
          },
          {
            severity: 'D',
            agent: 'Opioidler · Benzodiazepinler (Midazolam) · Propofol · İnhalasyon Anestezikleri',
            mechanism: 'Farmakodinamik Etkileşim (Analjezi Sinerjisi vs Solunum Depresyonu)',
            clinicalEffect: 'Opioid/anestezik gereksiniminde %30–50 azalma; yüksek doz kombinasyonda solunum depresyonu ve uzamış derlenme (volatil ajanlarla sempatik yanıt körelir → hipotansiyon açığa çıkabilir).',
            management: 'Ketofol ve multimodal analjezide dozları titre ederek azaltın; sürekli kapnografi ve SpO₂ izleyin.',
          },
          {
            severity: 'C',
            agent: 'Güçlü CYP2B6 / CYP3A4 İnhibitörleri (Klaritromisin, Flukonazol, Ritonavir) & İndükleyiciler (Rifampisin)',
            mechanism: 'Hepatik N-Demetilasyon (Norketamin Oluşumu) Modülasyonu',
            clinicalEffect: 'İnhibitörler ketamin/norketamin düzeyini ve sedasyon süresini artırabilir; rifampisin oral/IV etkinliği azaltır.',
            management: 'Uzamış infüzyonlarda klinik yanıta göre doz aralığını veya hızını titre edin.',
          },
        ]}
        references={[
          {
            authors: 'Green SM, Roback MG, Kennedy RM, Krauss B',
            title: 'Clinical practice guideline for emergency department ketamine dissociative sedation: 2011 update.',
            journal: 'Ann Emerg Med',
            year: 2011,
            pmid: '21256625',
            doi: '10.1016/j.annemergmed.2010.11.030',
            note: 'ACEP erişkin ve pediatrik dissosiyatif sedasyon klinik uygulama kılavuzu.',
          },
          {
            authors: 'Schwenk ES, Viscusi ER, Buvanendran A, Schug SA, et al.',
            title: 'Consensus Guidelines on the Use of Intravenous Ketamine Infusions for Acute Pain Management From the ASRA, AAPM, and ASA.',
            journal: 'Reg Anesth Pain Med',
            year: 2018,
            pmid: '29870457',
            doi: '10.1097/AAP.0000000000000806',
            note: 'Akut ağrı ve opioid koruyucu analjezide sub-dissosiyatif ketamin infüzyon kılavuzu.',
          },
          {
            authors: 'Devlin JW, Skrobik Y, Gélinas C, et al. (SCCM PADIS)',
            title: 'Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU.',
            journal: 'Crit Care Med',
            year: 2018,
            pmid: '30113379',
            doi: '10.1097/CCM.0000000000003299',
            note: 'Yoğun bakımda opioid koruyucu analjezik ve adjuvan sedasyon stratejisi.',
          },
          {
            authors: 'Jalili M, Bahreini M, Doosti-Irani A, et al.',
            title: 'Ketamine-propofol combination (ketofol) vs propofol for procedural sedation and analgesia: systematic review and meta-analysis.',
            journal: 'Am J Emerg Med',
            year: 2016,
            pmid: '26809929',
            doi: '10.1016/j.ajem.2015.12.074',
            note: 'Prosedürel sedasyonda ketofol vs propofol solunum ve hemodinami meta-analizi.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/ketamine.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
