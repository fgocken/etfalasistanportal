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
      {/* =========================================================================
          BÖLÜM 1: ÜST BAŞLIK VE HIZLI İLAÇ KİMLİK ÖZETİ
          ========================================================================= */}
      <div
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
                NMDA reseptör antagonisti, fenilpiperazin türevi disosiyatif anestezi ve analjezik ajan.
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-500/10 text-indigo-500">
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
                Onset, peak, redistribüsyon, Vd, hepatik CYP2B6/3A4 metabolizması ve aktif norketamin eliminasyonu
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
                  IM: 3–5 dk; İntranazal: 5–10 dk; Oral: 15–30 dk.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pik Etki (Peak)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 2 Dakika (IV)</span>
                <p className="text-[11px] text-slate-500 mt-1">IM: 5–15 dk; Oral: 30–45 dk.</p>
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
                  2 – 3 Saat
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Karaciğerde yüksek hepatik klerens (12–17 mL/kg/dk).
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
                • <strong>Norketamin Potensi:</strong> Norketamin, ana ketamin molekülünün yaklaşık 1/3 ila 1/5'i kadar analjezik aktiviteye sahiptir. YBÜ'de uzamış infüzyonlarda veya oral kullanımda norketamin birikir ve analjezik etkinin uzamasına katkıda bulunur.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Ekskresyon:</strong> Hidroksilasyon ve glukuronid konjugasyonu sonrasında metabolitlerin %90'ı böbrekler yoluyla idrarla atılır; &lt;%4 değişmemiş ana ilaç olarak atılır.
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
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Klinik Endikasyonlar &amp; Uygulama Yolları
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
              5. Dozaj Tablosu &amp; Uygulama Yolları Kılavuzu
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
                  6. İnteraktif Akıllı Doz &amp; Protokol Hesaplayıcısı
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

      {/* =========================================================================
          BÖLÜM 7: HAZIRLAMA, SEYRELTME VE KETOFOL KILAVUZU
          ========================================================================= */}
      <section
        id="sec-hazirlama"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              7. Hazırlama, Seyreltici Uyumluluğu &amp; Ketofol Karışımı
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ticari ampul formları, infüzyon çözeltisi stabilitesi ve Ketofol fizikokimyasal özellikleri
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Ticari Formlar &amp; Saklama</span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>• <strong>Ketalar %5 Flakon:</strong> 50 mg/mL, 10 mL flakon = 500 mg Ketamin HCl.</li>
              <li>• <strong>Ketanest / Esketamin:</strong> S(+) enantiomeri (2 kat daha potent).</li>
              <li>• <strong>Spravato:</strong> 28 mg İntranazal Esketamin cihazı (Depresyon).</li>
              <li>• Oda sıcaklığında (15–25°C), ışıktan korunarak saklanır. Dondurulmamalıdır.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
              Ketofol Fizikokimyasal Stabilitesi
            </span>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Propofol (lipid emülsiyonu) ile Ketamin HCl aynı enjektörde karıştırıldığında emülsiyon stabilitesi <strong>en az 3–4 saat</strong> korunur.
              Lipid partikül çapı bozulmaz, faz ayrışması veya presipitasyon meydana gelmez. Karışım hazırlandıktan sonra aseptik koşullarda aynı gün içinde tüketilmelidir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="font-bold text-slate-900 dark:text-white block">Seyreltici &amp; Geçimsizlik</span>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>• %0.9 NaCl ve %5 Dekstroz ile tam geçimlidir.</li>
              <li>• <strong>Barbitüratlar ile KESİNLİKLE GEÇİMSİZDİR:</strong> Tiyopental ile aynı damar yolundan verilirse anında presipitasyon (çökelme) oluşur; lümen tıkanır!</li>
              <li>• Diazepam ile de presipite olabilir; ayrı lümenden verilmelidir.</li>
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
              9. Uyanma Reaksiyonları &amp; "Emergence" Deliryumu Yönetimi
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
              10. Gebelik ve Laktasyon Kılavuzu
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
          BÖLÜM 11: ÖZEL POPÜLASYONLAR VE DOZ AYARLARI
          ========================================================================= */}
      <section
        id="sec-populasyon"
        className={`p-6 rounded-2xl border space-y-6 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
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
            <span className="font-bold text-slate-900 dark:text-white block">Pediatrik Hastalar</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Çocuklarda uyanma deliryumu insidansı çok düşüktür (%3).
              Metabolizma yetişkinlere göre daha hızlıdır; IM sedasyon için <strong>3.0 – 5.0 mg/kg</strong>, IV sedasyon için 1.0 – 2.0 mg/kg gerekir. Sekresyon artışına bağlı hava yolu obstrüksiyonu riski daha yüksektir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Geriatri (Yaşlı Hastalar)</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yaşlılarda deliryum, disfori ve postoperatif konfüzyon riski belirgin şekilde yüksektir.
              Kardiyovasküler semptomlar (taşikardi, hipertansiyon) daha belirgindir. Başlangıç dozları <strong>%30 – 50 oranında azaltılmalıdır</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Karaciğer Yetmezliği</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ketamin karaciğerde CYP3A4 ve CYP2B6 enzimleri ile <strong>Norketamin</strong> aktif metabolitine dönüştürülür.
              Siroz ve ağır hepatik yetmezlikte klerens düşer, etki süresi uzar; tekrarlayan bolus ve infüzyon dozları azaltılmalıdır.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Böbrek Yetmezliği</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ketamin metabolitleri (Norketamin glukuronidleri) böbrek yoluyla atılır.
              Diyaliz hastalarında veya KBY'de tek dozluk uygulamada doz ayarlaması gerekmez; ancak uzun süreli YBÜ infüzyonunda metabolit birikimine bağlı sedasyon uzayabilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Gebelik &amp; Laktasyon</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              FDA Kategori B / C. Plasentayı hızla geçer. Yüksek dozlarda fetal solunum depresyonuna ve uterus tonusunda artışa yol açabilir.
              Acil sezaryen indüksiyonunda hemodinamik şok veya şiddetli astım varlığında tercih edilebilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-white block">Obez Hastalar</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ketamin yüksek derecede lipofiliktir. Doz aşımı ve uzamış uyanmadan kaçınmak için indüksiyon ve infüzyon hesaplamaları <strong>İdeal Vücut Ağırlığı (İVA)</strong> üzerinden yapılmalıdır.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 12: FARMAKOKİNETİK VE DİNAMİK SİMÜLATÖR
          ========================================================================= */}
      <section
        id="sec-farmakokinetik"
        className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                12. Farmakokinetik &amp; Norketamin Metabolizma Profili
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Yüksek lipid çözünürlüğü, t½α 1–2 dk hızlı yeniden dağılım ve aktif metabolit Norketamin
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPkOpen(!pkOpen)}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
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
                  2.5 – 3.5 L/kg
                </span>
                <span className="text-[10px] text-slate-500">Mükemmel santral penetrasyon</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Yeniden Dağılım (t½α)</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-500">Uyanma yeniden dağılımla olur</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Eliminasyon (t½β)</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
                  2.0 – 3.0 Saat
                </span>
                <span className="text-[10px] text-slate-500">Hepatik klerens: 12-17 mL/kg/dk</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Protein Bağlanması</span>
                <span className="text-sm font-black font-mono text-slate-900 dark:text-white mt-0.5 block">
                  %12 – %15
                </span>
                <span className="text-[10px] text-slate-500">Çok düşük (serbest fraksiyon yüksek)</span>
              </div>
            </div>

            {/* Norketamin Metabolizma Şeması */}
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-2">
              <span className="font-bold text-indigo-700 dark:text-indigo-300 block">
                Aktif Metabolit: Norketamin (Dönüşüm Yolağı):
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Ketamin karaciğerde sitokrom P450 (özellikle CYP3A4 ve CYP2B6) enzimleri aracılığıyla N-demetilasyona uğrayarak <strong>Norketamin</strong>'e dönüşür.
                Norketamin, ana molekülün yaklaşık <strong>1/3 ila 1/5'i oranında analjezik ve anestezik etkinliğe</strong> sahiptir.
                Yarılanma ömrü daha uzundur (yaklaşık 12 saat). Sürekli infüzyon veya tekrarlayan dozlarda birikerek kümülatif analjezik etkiye katkıda bulunur.
              </p>
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
          <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              13. Kanıta Dayalı Kaynakça &amp; Klinik Kılavuzlar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ACEP, ASRA/AAPM, SCCM PADIS ve uluslararası anestezi kılavuzları
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                ACEP Clinical Policy: Procedural Sedation &amp; Analgesia:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Green SM, et al. Clinical Practice Guideline for Emergency Department Ketamine Dissociative Sedation in Adults. Ann Emerg Med. 2011;57(5):449-461.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                ASRA / AAPM Guidelines on Ketamine for Pain:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Schug SA, et al. Consensus Guidelines on the Use of Intravenous Ketamine Infusions for Acute Pain Management. Reg Anesth Pain Med. 2018;43(5):456-466.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                SCCM PADIS Clinical Practice Guidelines:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Devlin JW, et al. Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU. Crit Care Med. 2018;46(9):e825-e873.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">
                Ketofol Clinical Trials &amp; Meta-Analysis:
              </span>
              <p className="text-slate-500 dark:text-slate-400">
                Ghadami Yazdi A, et al. Comparison of Ketamine-Propofol (Ketofol) with Propofol Alone for Procedural Sedation: A Systematic Review and Meta-Analysis. J Clin Anesth. 2021;72:110287.
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          </div>
        </div>
      </section>
    </div>
  );
};
