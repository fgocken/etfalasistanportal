import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Zap,
  PhoneCall,
  Sparkles,
  BookOpen,
  Info,
  Layers,
  HeartCrack,
  Dna,
  Syringe,
  Thermometer,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Wind
} from 'lucide-react';
import { EmergencyProtocol } from '../../data/emergenciesData';

interface EmergencyProtocolDetailViewProps {
  protocol: EmergencyProtocol;
  isDark: boolean;
  onBack: () => void;
}

export const EmergencyProtocolDetailView: React.FC<EmergencyProtocolDetailViewProps> = ({
  protocol,
  isDark,
  onBack
}) => {
  // Quick Weight Calculator (e.g. 70 kg default)
  const [patientWeight, setPatientWeight] = useState<string>('70');
  const weightNum = parseFloat(patientWeight) || 0;

  // MH Dantrolene calculations
  const initialDoseMg = Math.round(weightNum * 2.5);
  const dantriumVials = Math.ceil(initialDoseMg / 20);
  const ryanodexVials = Math.ceil(initialDoseMg / 250);

  // Bronchospasm calculations
  const mgSulfateGrams = weightNum > 0 ? Math.min(2.5, +(weightNum * 0.045).toFixed(1)) : 2.0;
  const ketamineMg = Math.round(weightNum * 0.75);
  const methylpredMg = Math.round(weightNum * 1.5);
  const adrenalinBolus = weightNum < 40 ? Math.max(5, Math.round(weightNum * 0.5)) : 20;

  // Laryngospasm calculations
  const propofolLaryngoMg = Math.round(weightNum * 0.75);
  const succinylcholineIvBreakMg = +(weightNum * 0.25).toFixed(1);
  const succinylcholineImMg = Math.round(weightNum * 3.5);
  const atropineLaryngoMg = +(Math.min(0.5, Math.max(0.1, weightNum * 0.015))).toFixed(2);
  const rocuroniumLaryngoMg = Math.round(weightNum * 0.45);

  // CICO calculations
  const sugammadexMg = Math.round(weightNum * 16);
  const sugammadexVials200 = Math.ceil(sugammadexMg / 200);
  const sugammadexVials500 = Math.ceil(sugammadexMg / 500);
  const atropineCicoMg = +(Math.min(1.0, Math.max(0.2, weightNum * 0.02))).toFixed(2);

  // Airway Obstruction calculations
  const dexamethasoneMg = +(Math.min(16, Math.max(4, weightNum * 0.2))).toFixed(1);
  const nebulizedAdrenalinMg = weightNum < 20 ? 2 : 5;
  const magillSize = weightNum < 15 ? 'İnfant' : weightNum < 35 ? 'Pediatrik' : 'Erişkin (25 cm)';
  const yankauerType = weightNum < 20 ? 'Ch 10-12 Esnek' : 'Ch 14-18 Rijit Yankauer';

  // Aspiration calculations
  const ettSizeReco = weightNum < 55 ? 'ID 7.0 mm (Kaflı)' : weightNum < 80 ? 'ID 7.5 mm (Kaflı)' : 'ID 8.0 mm (Kaflı)';
  const suctionCatheterSize = weightNum < 55 ? 'Ch 12' : 'Ch 14';
  const ngsSize = weightNum < 55 ? 'Ch 14-16' : 'Ch 16-18';
  const salbutamolPuffs = '8-10 puf MDI';
  const peepReco = '6-10 cmH2O';

  // Pulmonary Embolism (PE / PTE) calculations
  const alteplaseArrestBolusMg = 50;
  const alteplaseInfusionMg = weightNum < 65 ? +(weightNum * 0.6).toFixed(1) : 100;
  const tenecteplaseMg = weightNum < 60 ? 30 : weightNum < 70 ? 35 : weightNum < 80 ? 40 : weightNum < 90 ? 45 : 50;
  const tenecteplaseUnits = tenecteplaseMg * 200;
  const ufhBolusUnits = Math.min(10000, Math.round(weightNum * 80));
  const ufhInfusionUnits = Math.min(2000, Math.round(weightNum * 18));
  const lmwhDoseMg = Math.round(weightNum * 1.0);
  const noradMinMcg = +(weightNum * 0.05).toFixed(1);
  const noradMaxMcg = +(weightNum * 1.0).toFixed(1);

  // Venous Air Embolism (VAE / PAE) calculations
  const vaeLethalVolMin = Math.round(weightNum * 3);
  const vaeLethalVolMax = Math.round(weightNum * 5);
  const vaeRvotAirLockBolus = Math.round(weightNum * 1.5);
  const cvcRightIjvDepthMin = weightNum < 55 ? 12 : 13;
  const cvcRightIjvDepthMax = weightNum < 55 ? 14 : 15;
  const vaeNoradMin = +(weightNum * 0.05).toFixed(1);
  const vaeNoradMax = +(weightNum * 0.3).toFixed(1);

  // LAST (Lokal Anestezik Sistemik Toksisitesi) calculations
  const lastLipidBolusMl = Math.round(weightNum * 1.5);
  const lastLipidInfusionMlMin = +(weightNum * 0.25).toFixed(1);
  const lastLipidInfusionMlHour = Math.round(weightNum * 0.25 * 60);
  const lastLipidHighInfusionMlMin = +(weightNum * 0.5).toFixed(1);
  const lastLipidHighInfusionMlHour = Math.round(weightNum * 0.5 * 60);
  const lastLipidMaxDoseMl = Math.round(weightNum * 12);
  const lastAdrenalinMaxMcg = Math.min(50, Math.round(weightNum * 1.0));
  const lastBupiMaxPlainMg = Math.min(175, Math.round(weightNum * 2.0));
  const lastLidoPlainMg = Math.min(300, Math.round(weightNum * 4.5));
  const lastLidoEpiMg = Math.min(500, Math.round(weightNum * 7.0));

  // Anaphylaxis (Şiddetli Anafilaktik Şok) calculations
  const anaphylaxisAdrenalinGrade3BolusMcg = Math.min(200, Math.max(50, Math.round(weightNum * 1.5)));
  const anaphylaxisAdrenalinInfusionMinMcg = +(weightNum * 0.05).toFixed(1);
  const anaphylaxisAdrenalinInfusionMaxMcg = +(weightNum * 0.5).toFixed(1);
  const anaphylaxisAdrenalinImDoseMg = weightNum < 25 ? 0.15 : weightNum < 40 ? 0.3 : 0.5;
  const anaphylaxisFluidBolusMinMl = Math.round(weightNum * 20);
  const anaphylaxisFluidBolusMaxMl = Math.round(weightNum * 30);
  const anaphylaxisNoradMin = +(weightNum * 0.05).toFixed(1);
  const anaphylaxisNoradMax = +(weightNum * 0.5).toFixed(1);
  const anaphylaxisSugammadexMg = Math.round(weightNum * 16);
  const anaphylaxisSugammadexVials200 = Math.ceil(anaphylaxisSugammadexMg / 200);
  const anaphylaxisMethylprednisoloneMg = Math.round(weightNum * 1.5);

  // Perioperative Cardiac Arrest & ACLS calculations (handles both adult & pediatric weights)
  const isPediatricWeight = weightNum > 0 && weightNum < 40;
  const aclsEpiDoseText = isPediatricWeight
    ? `${+(weightNum * 0.01).toFixed(2)} mg (10 mcg/kg)`
    : '1 mg IV/IO (3-5 dk)';
  const aclsAmiodarone1Text = isPediatricWeight
    ? `${Math.min(300, Math.round(weightNum * 5))} mg (5 mg/kg)`
    : '300 mg (2. doz 150 mg)';
  const aclsLidocaineMin = Math.round(weightNum * 1.0);
  const aclsLidocaineMax = Math.round(weightNum * 1.5);
  const aclsDefibText = isPediatricWeight
    ? `${Math.round(weightNum * 2)} → ${Math.round(weightNum * 4)} J (2-4 J/kg)`
    : '200 J Bifazik (360 J Mono)';
  const aclsFluidBolusMl = Math.round(weightNum * 20);

  // Optional ECG lightbox modal state
  const [selectedEcgItem, setSelectedEcgItem] = useState<{
    rhythmName: string;
    badge: string;
    shockable: boolean;
    imagePath: string;
    caption: string;
    ecgFeatures: string;
    sourceLicense: string;
  } | null>(null);

  // Accordion Sections Open State (sec2 to sec10; default open for immediate clinical speed)
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>({
    sec2: true,  // 2) Giriş
    sec3: true,  // 3) Tanı
    sec4: true,  // 4) Akut Kriz Yönetimi
    sec5: true,  // 5) Patofizyoloji
    sec6: true,  // 6) Klinik Özellikler & Prezentasyon
    sec7: true,  // 7) Koruyucu Tedbirler & Hazırlık
    sec8: true,  // 8) Postoperatif Takip & Prognoz
    sec9: true,  // 9) High-Yield Bilgiler
    sec10: true  // 10) Kullanılan Kaynaklar & İleri Okuma
  });

  const toggleSection = (key: string) => {
    setSectionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setSectionOpen({
      sec2: true,
      sec3: true,
      sec4: true,
      sec5: true,
      sec6: true,
      sec7: true,
      sec8: true,
      sec9: true,
      sec10: true
    });
  };

  const collapseAll = () => {
    setSectionOpen({
      sec2: false,
      sec3: false,
      sec4: false,
      sec5: false,
      sec6: false,
      sec7: false,
      sec8: false,
      sec9: false,
      sec10: false
    });
  };

  const isAllExpanded = Object.values(sectionOpen).every(Boolean);

  // Scroll to section with automatic expand if collapsed
  const scrollToSection = (id: string) => {
    setSectionOpen(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="space-y-6">
      {/* 1) Top Header & Emergency Bar */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-r from-red-950/70 via-slate-900 to-red-950/50 border-red-500/40 shadow-lg shadow-red-950/20' 
          : 'bg-gradient-to-r from-red-50 via-white to-rose-50 border-red-300 shadow-xs'
      }`}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300 shadow-2xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-red-500" />
              <span>Acil Senaryo Listesine Dön</span>
            </button>

            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full font-bold bg-red-500/20 text-red-600 dark:text-red-300 border border-red-500/40 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              {protocol.severityBadge}
            </span>
          </div>

          <div>
            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              {protocol.title}
            </h1>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 mt-1">
              {protocol.subTitle}
            </p>
          </div>

          {/* Key Critical Callout Strip */}
          <div className={`p-4 rounded-xl border flex items-start gap-3 ${
            isDark ? 'bg-red-950/40 border-red-500/50 text-red-200' : 'bg-red-100/70 border-red-300 text-red-950'
          }`}>
            <AlertOctagon className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed font-semibold">
              <strong className="font-bold underline decoration-red-500">Öncelikli Eylem: </strong>
              {protocol.keyCallout}
            </div>
          </div>

          {/* Quick Interactive Drug Dose Calculator based on protocol */}
          {protocol.id === 'bronchospasm' ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Acil Bronkodilatör & Hava Yolu İlaç Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                      KİLOYA GÖRE
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek MDI, Magnezyum, Adrenalin ve Ketamin dozlarını hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="Salbutamol MDI adaptörle ETT içine 8-10 puf">
                    Ventolin: <strong>8-10 puf MDI</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-bold" title="Magnezyum Sülfat 40-50 mg/kg (maks 2.5 g)">
                    MgSO4: <strong>{mgSulfateGrams} g IV</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 font-bold" title="Adrenalin IV Titrasyon Bolus (10-50 mcg, ağırda 50-100 mcg)">
                    Adrenalin: <strong>{adrenalinBolus} mcg IV</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="Ketamin 0.75 mg/kg IV bronkodilatör bolus">
                    Ketamin: <strong>{ketamineMg} mg</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold" title="Metilprednizolon 1.5 mg/kg IV">
                    Prednol: <strong>{methylpredMg} mg</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : protocol.id === 'laryngospasm' ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Acil Laringospazm İlaç & Kırıcı Doz Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">
                      KİLOYA GÖRE
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek sub-paralitik kırıcı doz ve atropin miktarlarını anında hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="Sıkı maske ile CPAP">
                    CPAP: <strong>10-20 cmH2O</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="Propofol 0.75 mg/kg IV refleks kırıcı">
                    Propofol: <strong>{propofolLaryngoMg} mg IV</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 font-bold" title="Sub-paralitik kırıcı Süksinilkolin 0.25 mg/kg IV">
                    Süksinilkolin IV: <strong>{succinylcholineIvBreakMg} mg</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="Damar yolu yoksa IM Süksinilkolin 3.5 mg/kg">
                    Süksinilkolin IM: <strong>{succinylcholineImMg} mg</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold" title="Atropin 0.015 mg/kg IV (pediatrik bradikardi önleyici)">
                    Atropin IV: <strong>{atropineLaryngoMg} mg</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'airway-crisis' || protocol.id === 'cico' || protocol.quickCalculatorType === 'cico') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Acil CICO & Krikotiroidotomi / Sugammadeks Doz Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">
                      16 mg/kg & eFONA
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Kilo girerek acil Sugammadeks kurtarma dozu ve krikotiroidotomi tüp/buji/neşter donanımını anında hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold" title="Sugammadeks 16 mg/kg acil IV bolus">
                    Sugammadeks: <strong>{sugammadexMg} mg IV</strong>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]" title="200 mg / 2 mL flakon ihtiyacı">
                    200mg Flk: <strong className="text-amber-400">~{sugammadexVials200}</strong>
                  </div>
                  <div className="px-2 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]" title="500 mg / 5 mL flakon ihtiyacı">
                    500mg Flk: <strong className="text-emerald-400">~{sugammadexVials500}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-bold" title="Altın standart eFONA boyutu">
                    Tüp: <strong>ETT ID 6.0 mm</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="15 Fr Coudé uçlu buji">
                    Buji: <strong>15 Fr Coudé</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold" title="Derin hipokside bradikardi için 0.02 mg/kg">
                    Atropin: <strong>{atropineCicoMg} mg IV</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'airway-obstruction' || protocol.quickCalculatorType === 'airway-obstruction') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Akut Hava Yolu Obstrüksiyonu İlaç & Ekipman Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">
                      ÖDEM & EKSTRAKSİYON
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek Deksametazon, inhale Adrenalin, Magill ve aspiratör boyutlarını anında hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="Larenks ödemi için Deksametazon 0.2 mg/kg IV (maks 16 mg)">
                    Deksametazon: <strong>{dexamethasoneMg} mg IV</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold" title="Subglottik ödem için İnhale L-Adrenalin (SF ile nebül)">
                    Nebül Adrenalin: <strong>{nebulizedAdrenalinMg} mg</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="Yabancı cisim için uygun Magill forsepsi boyutu">
                    Magill: <strong>{magillSize}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="Pıhtı ve sekresyon için aspiratör tipi">
                    Aspiratör: <strong>{yankauerType}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-bold" title="Helyum-Oksijen karışımı gaz oranı">
                    Heliox: <strong>80:20</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'aspiration' || protocol.quickCalculatorType === 'aspiration') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Pulmoner Aspirasyon & Mendelson Acil Ekipman ve Ventilasyon Parametreleri</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                      RSI & PEEP
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosuna göre uygun kaflı ETT, aspirasyon kateteri, NGS ve solunum parametreleri:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-bold" title="Kaflı tüp boyutu">
                    ETT: <strong>{ettSizeReco}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="Trakeal aspirasyon kateteri boyutu">
                    Aspiratör: <strong>{suctionCatheterSize}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="Nazogastrik / Orogastrik sonda boyutu">
                    NGS: <strong>{ngsSize}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 font-bold" title="Atelektazi ve şant önleyici PEEP">
                    PEEP: <strong>{peepReco}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold" title="Bronkospazm kurtarma dozu">
                    Salbutamol: <strong>{salbutamolPuffs}</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'pe' || protocol.quickCalculatorType === 'pe') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Acil Masif PE Doz & Sıvı / Trombolitik Doz Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 font-bold">
                      ESC 2019 · TROMBOLİZ & RV
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek acil arrest/infüzyon trombolitik, heparin bolus/infüzyon ve Noradrenalin dozlarını anında hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 font-bold" title="Kardiyak arrest veya peri-arrest çökmüş hastada acil IV bolus">
                    Alteplase Arrest: <strong>{alteplaseArrestBolusMg} mg IV (15 dk)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold" title="Standart masif PE 2 saatlik IV infüzyon">
                    Alteplase İnfüzyon: <strong>{alteplaseInfusionMg} mg</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="Tenecteplase tek IV bolus puşe dozu">
                    Tenecteplase: <strong>{tenecteplaseMg} mg ({tenecteplaseUnits} IU)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="UFH 80 IU/kg IV bolus + 18 IU/kg/st infüzyon">
                    Heparin (UFH): <strong>{ufhBolusUnits} IU + {ufhInfusionUnits} IU/st</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold" title="Stabil olgularda Enoksaparin 1 mg/kg SC (12 saatte bir)">
                    Enoksaparin: <strong>{lmwhDoseMg} mg SC</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="Noradrenalin 0.05-1.0 mcg/kg/dk (Sağ koroner perfüzyon hedef MAP ≥ 65)">
                    Noradrenalin: <strong>{noradMinMcg}-{noradMaxMcg} mcg/dk</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 font-bold" title="Aşırı sıvı RV septal shift yaparak sol ventrikülü çökertebilir">
                    Sıvı: <strong className="text-red-400">Maks 250-500 mL!</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'vae' || protocol.quickCalculatorType === 'vae') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 shrink-0">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>İntraoperatif Hava Embolisi Hacim Eşiği & CVC Derinlik Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold">
                      3-5 mL/kg FATAL EŞİK · CVC SVC-RA
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek ölümcül hava hacim eşiği, kavoatriyal CVC aspirasyon derinliği ve Noradrenalin dozunu anında hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 font-bold" title="Hızlı 3-5 mL/kg hava bolusu akut kardiyovasküler çökme ve asistoli ile ölümcüldür">
                    Fatal Eşik: <strong className="text-red-400">{vaeLethalVolMin}-{vaeLethalVolMax} mL hava</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-bold" title="Sağ ventrikül çıkış yolunu (RVOT) anında kilitleyen kritik hava bolusu">
                    RVOT Air-Lock: <strong>~{vaeRvotAirLockBolus} mL</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="Sağ internal jügüler venden kavoatriyal bileşkeye (SVC-RA junction) yaklaşık derinlik">
                    CVC Derinlik (Sağ IJV): <strong>{cvcRightIjvDepthMin}-{cvcRightIjvDepthMax} cm</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="Noradrenalin 0.05-0.3 mcg/kg/dk IV perfüzyon dozu">
                    Noradrenalin: <strong>{vaeNoradMin}-{vaeNoradMax} mcg/dk</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="PFO varlığında veya şüphesinde PEEP kesinlikle sıfırlanmalıdır">
                    PEEP: <strong className="text-rose-400">0 cmH2O (PFO Yasağı!)</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'last' || protocol.quickCalculatorType === 'last') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>ASRA 2020 LAST %20 Lipid Emülsiyon Kurtarma Doz Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold">
                      1.5 mL/kg BOLUS · 0.25 mL/kg/dk
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek acil %20 İntralipid bolus hacmi, infüzyon hızları, modifiye düşük doz adrenalin ve güvenli LA limitlerini anında hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="%20 Lipid 1.5 mL/kg IV bolus (2-3 dakikada verilir)">
                    Lipid Bolus: <strong>{lastLipidBolusMl} mL IV (2-3 dk)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 font-bold" title="%20 Lipid 0.25 mL/kg/dk standart infüzyon hızı">
                    İnfüzyon: <strong>{lastLipidInfusionMlMin} mL/dk ({lastLipidInfusionMlHour} mL/st)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="%20 Lipid 0.5 mL/kg/dk persistan instabilite yüksek infüzyon hızı">
                    Yüksek İnfüzyon: <strong>{lastLipidHighInfusionMlMin} mL/dk ({lastLipidHighInfusionMlHour} mL/st)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="İlk 30-60 dakikada maksimum kümülatif lipid dozu (12 mL/kg)">
                    Maks Lipid: <strong>{lastLipidMaxDoseMl} mL</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 font-bold" title="Standart 1 mg adrenalin KESİNLİKLE YASAKTIR! ≤1 mcg/kg boluslar titre edilmelidir">
                    Adrenalin: <strong className="text-red-400">≤ {lastAdrenalinMaxMcg} mcg (1 mg YASAK!)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold" title="Bupivakain maksimum güvenli tek doz (2 mg/kg, maks 175 mg)">
                    Bupivakain Maks: <strong>{lastBupiMaxPlainMg} mg</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]" title="Lidokain düz 4.5 mg/kg, adrenalinli 7.0 mg/kg">
                    Lidokain Maks: <strong>{lastLidoPlainMg} mg ({lastLidoEpiMg} mg +Epi)</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'anaphylaxis' || protocol.quickCalculatorType === 'anaphylaxis') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                  <Syringe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>İntraoperatif Anafilaktik Şok Adrenalin & Volüm Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold">
                      ERKEN ADRENALİN · 20-30 mL/kg SIVI
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek acil Adrenalin IV/IM dozları, masif kristaloid sıvı hacmi, Noradrenalin ve Sugammadeks kurtarma dozlarını hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 font-bold" title="Grade III ağır şokta IV Adrenalin titre puşe (1:10.000 veya 1:100.000)">
                    Adrenalin Şok: <strong>{anaphylaxisAdrenalinGrade3BolusMcg} mcg IV (titre)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 font-bold" title="Adrenalin 0.05-0.5 mcg/kg/dk sürekli IV infüzyon">
                    Adrenalin İnfüzyon: <strong>{anaphylaxisAdrenalinInfusionMinMcg}-{anaphylaxisAdrenalinInfusionMaxMcg} mcg/dk</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="Damaryolu yoksa uyluk dış yan (Vastus lateralis) IM Adrenalin">
                    Adrenalin IM: <strong>{anaphylaxisAdrenalinImDoseMg} mg IM</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="20-30 mL/kg hızlı dengeli kristaloid (basınçlı torbayla ilk 15-30 dk)">
                    Kristaloid Sıvı: <strong>{anaphylaxisFluidBolusMinMl}-{anaphylaxisFluidBolusMaxMl} mL</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 font-bold" title="Jelatin ve nişasta bazlı kolloidler anafilaktoid degranülasyon yapar">
                    Kolloid: <strong className="text-red-400">KESİNLİKLE YASAK!</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="Adrenaline dirençli vazoplejide Noradrenalin 0.05-0.5 mcg/kg/dk">
                    Noradrenalin: <strong>{anaphylaxisNoradMin}-{anaphylaxisNoradMax} mcg/dk</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold" title="Rokuronyum anafilaksisinde 16 mg/kg şelasyon kurtarma dozu">
                    Sugammadeks: <strong>{anaphylaxisSugammadexMg} mg (~{anaphylaxisSugammadexVials200} flk)</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]" title="Bifazik reaksiyonu önlemek için Metilprednizolon 1-2 mg/kg IV">
                    Prednol: <strong>{anaphylaxisMethylprednisoloneMg} mg IV</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'acls' || protocol.quickCalculatorType === 'acls') ? (
            <div className={`p-4 rounded-xl border flex flex-col xl:flex-row xl:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 shrink-0">
                  <HeartCrack className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Perioperatif ACLS Doz &amp; Defibrilasyon Hesaplayıcısı</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 font-bold">
                      {isPediatricWeight ? 'PEDİATRİK (<40 kg) MODU' : 'ERİŞKİN AHA/ERC MODU'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Kilo girerek Adrenalin, Amiodaron, Lidokain, Bifazik Defibrilasyon enerjisi ve 20 mL/kg hipovolemi bolusunu görüntüleyin:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-semibold text-slate-500">Kilo:</label>
                  <div className="relative w-18">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-1.5 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                  <div className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-300 font-bold" title="Şoklanamaz ritimde İLK ANDA, şoklanabilirde 2. şok sonrası (LAST hariç!)">
                    Adrenalin: <strong>{aclsEpiDoseText}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold" title="VF/pVT 1. şok enerjisi">
                    Defibrilasyon: <strong>{aclsDefibText}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-700 dark:text-purple-300 font-bold" title="3. şok sonrası refrakter VF/pVTde">
                    Amiodaron: <strong>{aclsAmiodarone1Text}</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold" title="Amiodaron yoksa 1-1.5 mg/kg IV">
                    Lidokain: <strong>{aclsLidocaineMin}-{aclsLidocaineMax} mg IV</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold" title="Hipovolemik/hemorajik PEAda hızlı 20 mL/kg kristaloid">
                    Sıvı (20 mL/kg): <strong>{aclsFluidBolusMl} mL</strong>
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]" title="Entübe hastada asenkron sabit solutma hızı">
                    Ventilasyon: <strong className="text-cyan-400">10/dk (Hiperventile Etme!)</strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (protocol.id === 'mh' || protocol.quickCalculatorType === 'dantrolene') ? (
            <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20">
                  <Syringe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Acil Dantrolen Başlangıç Dozu Hesaplayıcısı (2.5 mg/kg)
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hastanın kilosunu girerek anlık doz ve flakon adedini hesaplayın:
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-500">Hasta Kilosu:</label>
                  <div className="relative w-20">
                    <input
                      type="number"
                      min="1"
                      max="250"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(e.target.value)}
                      className={`w-full px-2.5 py-1 text-xs font-mono font-bold rounded-lg border text-center ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-2 top-1 text-[10px] text-slate-400 font-mono">kg</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 font-bold">
                    {initialDoseMg} mg IV
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]" title="Klasik 20 mg flakon">
                    Dantrium: <strong className="text-amber-400">{dantriumVials}</strong> flk
                  </div>
                  <div className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]" title="Yeni 250 mg flakon">
                    Ryanodex: <strong className="text-emerald-400">{ryanodexVials}</strong> flk
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Quick Navigation Anchor Bar & Global Expand/Collapse Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-red-500/20 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => scrollToSection('sec2')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              2) Giriş
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec3')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              3) Tanı
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec4')}
              className="px-3 py-1 rounded-lg border whitespace-nowrap font-bold bg-red-600 text-white border-red-500 transition-all cursor-pointer shadow-xs"
            >
              4) Akut Kriz Yönetimi
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec5')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              5) Patofizyoloji
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec6')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              6) Klinik Özellikler
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec7')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              7) Koruyucu Tedbirler
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec8')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              8) Postop & Prognoz
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec9')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              9) High-Yield Bilgiler
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec10')}
              className={`px-3 py-1 rounded-lg border whitespace-nowrap font-medium transition-all cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              10) Kaynaklar
            </button>
          </div>

          {/* Expand All / Collapse All Toggle Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={isAllExpanded ? collapseAll : expandAll}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-300 shadow-2xs'
              }`}
              title={isAllExpanded ? 'Tüm bölümleri daralt' : 'Tüm bölümleri genişlet'}
            >
              <ChevronsUpDown className="w-3.5 h-3.5 text-red-500" />
              <span>{isAllExpanded ? 'Tümünü Daralt' : 'Tümünü Genişlet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2) Giriş (Accordion Section) */}
      <section id="sec2" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec2')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2) Giriş
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec2 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec2 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec2 && (
          <div className="p-5 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                <strong className="text-slate-900 dark:text-white font-bold">Tanım: </strong>
                {protocol.introduction.definition}
              </p>
              <p>
                <strong className="text-slate-900 dark:text-white font-bold">Epidemiyoloji: </strong>
                {protocol.introduction.epidemiology}
              </p>
            </div>

            {/* Triggers vs Safe Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Triggers */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/70 border-rose-300'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">
                  <XCircle className="w-4 h-4" />
                  <span>TETİKLEYİCİ KLİNİK DURUMLAR</span>
                </div>
                <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  {protocol.introduction.triggers.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold shrink-0">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safe Agents */}
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-300'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>GÜVENLİ VE TERCİH EDİLEN STRATEJİLER</span>
                </div>
                <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  {protocol.introduction.safeAgents.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Mortalite İstatistikleri:</span>
                <span className="text-slate-600 dark:text-slate-400">{protocol.introduction.mortalityStats}</span>
              </div>
              <div className={`p-3 rounded-xl border ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Klinik Aciliyet:</span>
                <span className="text-slate-600 dark:text-slate-400">{protocol.introduction.clinicalUrgency}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3) Tanı (Accordion Section) */}
      <section id="sec3" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec3')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3) Tanı
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec3 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec3 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec3 && (
          <div className="p-5 sm:p-6 pt-0 space-y-5 border-t border-slate-100 dark:border-slate-800/80">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {protocol.diagnosis.overview}
            </p>

            {/* Clinical Diagnostic Criteria List */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Yatak Başı Klinik Tanı Kriterleri:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {protocol.diagnosis.clinicalCriteria.map((crit, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                      idx === 0 
                        ? isDark ? 'bg-red-950/30 border-red-500/40 text-red-200' : 'bg-red-50 border-red-300 text-red-950 font-bold'
                        : isDark ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span className="font-mono font-bold text-red-500 shrink-0 mt-0.5">#{idx + 1}</span>
                    <span className="leading-relaxed">{crit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clinical Grading Scale Table */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {protocol.diagnosis.gradingScaleTitle || 'Larach Klinik Derecelendirme Skalası (CGS)'}
                </span>
                <span className="text-[11px] text-slate-400">
                  {protocol.diagnosis.gradingScaleSource || 'Larach et al. Anesthesiology'}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}>
                    <tr>
                      <th className="p-3">Süreç / Kategori</th>
                      <th className="p-3">Puanlama</th>
                      <th className="p-3">Klinik Kriter Detayı</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                    {protocol.diagnosis.larachScale.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')}>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{row.category}</td>
                        <td className="p-3 font-mono font-bold text-red-600 dark:text-red-400">{row.points}</td>
                        <td className="p-3 leading-relaxed">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                * {protocol.diagnosis.larachInterpretation}
              </div>

              {/* Gerçek Onaylı Public Domain EKG Ritim Örnekleri (ACLS vb.) */}
              {protocol.diagnosis.rhythmEcgGallery && protocol.diagnosis.rhythmEcgGallery.length > 0 && (
                <div className={`mt-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Onaylı Klinik EKG Şeritleri (Derivasyon II) — Görsel Tanı Atlası
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}>
                      Telifsiz · Public Domain (Wikimedia Commons)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {protocol.diagnosis.rhythmEcgGallery.map((ecg, idx) => (
                      <div
                        key={idx}
                        className={`rounded-xl border p-3.5 flex flex-col gap-2.5 transition-all ${
                          ecg.shockable
                            ? isDark
                              ? 'bg-red-950/20 border-red-500/35 hover:border-red-500/60'
                              : 'bg-red-50/50 border-red-200 hover:border-red-300'
                            : isDark
                              ? 'bg-slate-800/45 border-slate-700 hover:border-amber-500/50'
                              : 'bg-slate-50/90 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className={`text-xs font-extrabold ${
                            isDark ? 'text-white' : 'text-slate-900'
                          }`}>
                            {ecg.rhythmName}
                          </span>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            ecg.shockable
                              ? 'bg-red-500/15 text-red-600 dark:text-red-300 border border-red-500/30'
                              : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          }`}>
                            {ecg.badge}
                          </span>
                        </div>

                        {/* Gerçek EKG Şeridi Frame (Her temada yüksek kontrast için beyaz EKG kağıdı zemini) */}
                        <button
                          type="button"
                          onClick={() => setSelectedEcgItem(ecg)}
                          className="group relative w-full rounded-lg bg-white border border-slate-300 dark:border-slate-700 p-2 overflow-hidden text-left cursor-zoom-in shadow-2xs"
                          title="Büyütmek için tıklayın"
                        >
                          <img
                            src={ecg.imagePath}
                            alt={`${ecg.rhythmName} Gerçek EKG Şeridi`}
                            referrerPolicy="no-referrer"
                            className="w-full h-24 sm:h-28 object-contain mx-auto transition-transform duration-200 group-hover:scale-[1.02]"
                          />
                          <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900/75 text-white opacity-80 group-hover:opacity-100">
                            Büyüt
                          </span>
                        </button>

                        <div className="space-y-1 text-[11px] leading-relaxed">
                          <div className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                            <strong className="font-semibold">EKG Bulgusu: </strong>
                            {ecg.ecgFeatures}
                          </div>
                          <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                            {ecg.caption}
                          </div>
                          <div className="pt-1 text-[10px] font-mono text-slate-400 dark:text-slate-500">
                            Kaynak: {ecg.sourceLicense}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Differential Diagnosis Table */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Ayırıcı Tanı (Taklit Eden Durumlar & Dışlama Kriterleri):
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {protocol.diagnosis.differentialDiagnosis.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border space-y-1 text-xs ${
                      isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{item.condition}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.differentiatingFactors}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 4) Akut Kriz Yönetimi (Accordion Section) */}
      <section id="sec4" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-gradient-to-b from-red-950/20 to-slate-900 border-red-500/40' : 'bg-white border-red-300 shadow-md'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec4')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-red-950/30' : 'hover:bg-red-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500 text-white shadow-xs">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  4) Akut Kriz Yönetimi
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-400 font-bold">
                  HAYATİ ALGORİTMA
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-red-500/30 text-red-400' : 'border-red-200 text-red-600'
            }`}>
              {sectionOpen.sec4 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec4 ? (
              <ChevronUp className="w-5 h-5 text-red-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-red-500" />
            )}
          </div>
        </button>

        {sectionOpen.sec4 && (
          <div className="p-5 sm:p-6 pt-0 space-y-6 border-t border-red-500/20">
            {/* 7 Core Emergency Action Steps */}
            <div className="space-y-3 pt-2">
              {protocol.crisisManagement.coreAlgorithm.map((step) => (
                <div
                  key={step.stepNumber}
                  className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
                    step.priority === 'CRITICAL'
                      ? isDark ? 'bg-red-950/30 border-red-500/50 text-white' : 'bg-red-50/80 border-red-300 text-slate-900'
                      : isDark ? 'bg-slate-800/50 border-slate-700 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-mono font-black ${
                        step.priority === 'CRITICAL' ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-200'
                      }`}>
                        {step.stepNumber}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black tracking-tight">
                        {step.title}
                      </h3>
                    </div>

                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                      step.priority === 'CRITICAL'
                        ? 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    }`}>
                      {step.priority === 'CRITICAL' ? 'HAYATİ ÖNCELİK' : 'YÜKSEK ÖNCELİK'}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 pl-8">
                    {step.action}
                  </p>

                  {step.criticalNote && (
                    <div className="pl-8 pt-1 text-[11px] font-semibold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{step.criticalNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Dantrolene Protocol & Formulation Comparison (Only for MH) */}
            {protocol.crisisManagement.dantroleneProtocol && (
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-300'
              }`}>
                <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Syringe className="w-4 h-4 text-red-500" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Dantrolen Sodyum Detaylı Protokolü & Formülasyon Farkları
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Başlangıç Dozu</div>
                    <div className="text-sm font-bold text-red-600 dark:text-red-400 font-mono mt-0.5">
                      {protocol.crisisManagement.dantroleneProtocol.initialDose}
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="text-slate-400 text-[10px] uppercase font-mono">Maksimum Doz</div>
                    <div className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">
                      {protocol.crisisManagement.dantroleneProtocol.maxDose}
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="text-slate-400 text-[10px] uppercase font-mono">İdame Tedavisi</div>
                    <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                      {protocol.crisisManagement.dantroleneProtocol.maintenanceDose}
                    </div>
                  </div>
                </div>

                {/* Dantrium vs Ryanodex Table */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {protocol.crisisManagement.dantroleneProtocol.formulations.map((form, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border space-y-2 text-xs ${
                        idx === 1 
                          ? isDark ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-emerald-50/70 border-emerald-300'
                          : isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">{form.name}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          idx === 1 ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}>
                          {idx === 1 ? 'YENİ NESİL (1 FLAKON)' : 'KLASİK FORMÜLASYON'}
                        </span>
                      </div>
                      <div className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                        <div><strong>Flakon İçeriği: </strong>{form.vialContent}</div>
                        <div><strong>Sulandırma: </strong>{form.reconstitution}</div>
                        <div><strong>Çözücü: </strong><strong className="text-red-500">{form.diluent}</strong></div>
                        <div><strong>Hazırlama Süresi: </strong>{form.timeToPrepare}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span><strong>Sulandırma Kuralı: </strong>{protocol.crisisManagement.dantroleneProtocol.preparationWarning}</span>
                </div>
              </div>
            )}

            {/* Bronchospasm Specialized Protocols (Ventilator Optimization + Stepwise Pharmacotherapy) */}
            {protocol.crisisManagement.bronchospasmProtocols && (
              <div className="space-y-4">
                {/* 1. Ventilator Optimization & Auto-PEEP Maneuver */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-300'
                }`}>
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <Wind className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {protocol.crisisManagement.bronchospasmProtocols.ventilatorOptimization.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {protocol.crisisManagement.bronchospasmProtocols.ventilatorOptimization.settings.map((s, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border space-y-1 text-xs ${
                          isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="font-bold text-amber-600 dark:text-amber-400">
                          {s.parameter}
                        </div>
                        <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                          {s.recommendation}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {s.rationale}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Auto-PEEP Apnea Maneuver Alert Card */}
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-amber-950/20 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                  }`}>
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed space-y-1">
                      <strong className="font-bold text-amber-600 dark:text-amber-400 block">
                        Hayati Kurtarma Manevrası: Oto-PEEP Apneik Toraks Dekompresyonu
                      </strong>
                      <p className="text-[11px]">
                        {protocol.crisisManagement.bronchospasmProtocols.ventilatorOptimization.autoPeepReleaseManeuver}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Stepwise Pharmacotherapy Table */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-amber-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Basamaklı Akut Farmakoterapi Protokolü
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                      BTS & ASA
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <tr>
                          <th className="p-3">Basamak / Ajan</th>
                          <th className="p-3">Dozaj</th>
                          <th className="p-3">Yol</th>
                          <th className="p-3">Klinik Not & İnci</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                        {protocol.crisisManagement.bronchospasmProtocols.stepwisePharmacotherapy.map((drug, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')}>
                            <td className="p-3">
                              <span className="text-[10px] font-mono text-amber-500 block">{drug.step}</span>
                              <span className="font-bold text-slate-900 dark:text-white">{drug.drug}</span>
                            </td>
                            <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">{drug.dosage}</td>
                            <td className="p-3 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{drug.route}</td>
                            <td className="p-3 text-[11px] leading-relaxed">{drug.clinicalPearls}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Refractory Rescue Plan */}
                <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isDark ? 'bg-red-950/20 border-red-500/40' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4" />
                    <span>Dirençli / Refrakter "Sessiz Akciğer" Kurtarma Adımları:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {protocol.crisisManagement.bronchospasmProtocols.refractoryRescuePlan.map((rStep, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold shrink-0">▸</span>
                        <span>{rStep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Laryngospasm Specific Protocols (Larson Maneuver, Stepwise Pharmacotherapy & NPPE Management) */}
            {protocol.crisisManagement.laryngospasmProtocols && (
              <div className="space-y-4 pt-2">
                {/* 1. Larson Notch Maneuver */}
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50/80 border-rose-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-rose-500 shrink-0" />
                    <h4 className="font-bold text-sm text-rose-700 dark:text-rose-300">
                      {protocol.crisisManagement.laryngospasmProtocols.larsonManeuver.title}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-rose-100'
                    }`}>
                      <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">
                        Uygulama Tekniği (Larson's Notch):
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {protocol.crisisManagement.laryngospasmProtocols.larsonManeuver.technique}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl border ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-rose-100'
                    }`}>
                      <span className="font-bold text-sky-600 dark:text-sky-400 block mb-1">
                        Fizyolojik Refleks Mekanizması:
                      </span>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {protocol.crisisManagement.laryngospasmProtocols.larsonManeuver.physiologicalMechanism}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Stepwise Pharmacotherapy Table */}
                <div className={`p-4 sm:p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-rose-500" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        Laringospazm Basamaklı Farmakoterapi Protokolü
                      </span>
                    </div>
                    <span className="text-[10px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
                      CPAP ➔ Propofol ➔ Süksinilkolin IV/IM
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className={`text-[11px] uppercase tracking-wider font-semibold border-b ${
                        isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <tr>
                          <th className="p-3">Basamak</th>
                          <th className="p-3">Ajan</th>
                          <th className="p-3">Kriz Dozu</th>
                          <th className="p-3">Yol</th>
                          <th className="p-3">Kritik Klinik İpuçları</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {protocol.crisisManagement.laryngospasmProtocols.stepwisePharmacotherapy.map((drug, dIdx) => (
                          <tr key={dIdx} className={dIdx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-800/20' : 'bg-slate-50/50')}>
                            <td className="p-3 font-semibold text-rose-600 dark:text-rose-400 whitespace-nowrap">{drug.step}</td>
                            <td className="p-3 font-bold text-slate-900 dark:text-white whitespace-nowrap">{drug.drug}</td>
                            <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{drug.dosage}</td>
                            <td className="p-3 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">{drug.route}</td>
                            <td className="p-3 text-[11px] leading-relaxed">{drug.clinicalPearls}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. NPPE Management Plan */}
                <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isDark ? 'bg-amber-950/20 border-amber-500/40' : 'bg-amber-50 border-amber-200'
                }`}>
                  <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Negatif Basınçlı Pulmoner Ödem (NPPE) Erken Tanı & Yönetim İlkeleri:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {protocol.crisisManagement.laryngospasmProtocols.nppeManagement.map((nStep, nIdx) => (
                      <li key={nIdx} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold shrink-0">▸</span>
                        <span>{nStep}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* CICO Specific Protocols (Scalpel-Bougie-Tube eFONA, Needle vs Scalpel Comparison & Sugammadex Protocol) */}
            {protocol.crisisManagement.cicoProtocols && (
              <div className="space-y-4">
                {/* 1. Scalpel-Bougie-Tube eFONA Algorithm */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-5 h-5 text-rose-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.cicoProtocols.scalpelBougieTubeTechnique.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/30">
                      DAS 2015 PLAN D (ALTIN STANDART)
                    </span>
                  </div>

                  {/* Laryngeal Handshake Box */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-indigo-950/20 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
                  }`}>
                    <div className="font-bold text-xs flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                      <Activity className="w-4 h-4 shrink-0" />
                      <span>Kritik Anatomik Doğrulama: "Laryngeal Handshake" Tekniği</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {protocol.crisisManagement.cicoProtocols.scalpelBougieTubeTechnique.laryngealHandshake}
                    </p>
                  </div>

                  {/* Step Cards */}
                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      5 Adımda Neşter-Buji-Tüp Krikotiroidotomi Uygulama Protokolü:
                    </span>
                    <div className="grid grid-cols-1 gap-2.5">
                      {protocol.crisisManagement.cicoProtocols.scalpelBougieTubeTechnique.techniqueSteps.map((st, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                            isDark ? 'bg-slate-800/40 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        >
                          <span className="w-6 h-6 rounded-lg bg-rose-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="text-xs leading-relaxed">{st}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Obese Patient Modification */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50/80 border-amber-200 text-amber-950'
                  }`}>
                    <div className="font-bold text-xs flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Obezite & Palpe Edilemeyen Boyunda 8-10 cm Vertikal Modifikasyon:</span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                      {protocol.crisisManagement.cicoProtocols.scalpelBougieTubeTechnique.obesePatientModification}
                    </p>
                  </div>
                </div>

                {/* 2. Needle/Cannula vs Scalpel-Bougie-Tube Comparison Table */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        İğne / Kanül Krikotiroidotomi vs Neşter-Buji-Tüp Karşılaştırma Matriksi
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                      NAP4 Kanıt Düzeyi
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <tr>
                          <th className="p-3">Kritik Parametre</th>
                          <th className="p-3 text-emerald-600 dark:text-emerald-400">Neşter-Buji-Tüp (SBT)</th>
                          <th className="p-3 text-rose-600 dark:text-rose-400">İğne / Dar Lümenli Kanül</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                        {protocol.crisisManagement.cicoProtocols.needleVsScalpelComparison.map((row, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')}>
                            <td className="p-3 font-semibold text-slate-900 dark:text-white">{row.feature}</td>
                            <td className="p-3 font-medium text-emerald-700 dark:text-emerald-300">{row.scalpelBougieTube}</td>
                            <td className="p-3 font-medium text-rose-700 dark:text-rose-300">{row.cannulaCricothyrotomy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. Sugammadex Rescue Protocol Callout */}
                <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isDark ? 'bg-purple-950/20 border-purple-500/40' : 'bg-purple-50 border-purple-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1.5 text-xs">
                      <Syringe className="w-4 h-4" />
                      <span>Roküronyum / Veküronyum Acil Blok Geri Döndürme: Sugammadeks Protokolü</span>
                    </div>
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                      {protocol.crisisManagement.cicoProtocols.sugammadexProtocol.dose}
                    </span>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                    <strong>Endikasyon: </strong>{protocol.crisisManagement.cicoProtocols.sugammadexProtocol.indication}
                  </div>
                  <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 font-semibold text-[11px] flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>{protocol.crisisManagement.cicoProtocols.sugammadexProtocol.pearls}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Airway Obstruction Specific Protocols (Neck Hematoma Evacuation, Foreign Body Extraction & ETT Occlusion) */}
            {protocol.crisisManagement.airwayObstructionProtocols && (
              <div className="space-y-4">
                {/* 1. Neck Hematoma Bedside Evacuation (BAETS / SCOOP) */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-red-950/20 border-red-500/40' : 'bg-red-50/70 border-red-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-red-200 dark:border-red-900/40">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 text-red-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.airwayObstructionProtocols.neckHematomaEvacuation.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 font-bold border border-red-500/30">
                      YATAK BAŞI ACİL DEKOMPRESYON
                    </span>
                  </div>

                  {/* Urgency Alert Note */}
                  <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                    isDark ? 'bg-red-900/30 border-red-500/40 text-red-200' : 'bg-red-100/80 border-red-300 text-red-900'
                  }`}>
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                    <span className="font-semibold leading-relaxed">
                      {protocol.crisisManagement.airwayObstructionProtocols.neckHematomaEvacuation.urgencyNote}
                    </span>
                  </div>

                  {/* Evacuation Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {protocol.crisisManagement.airwayObstructionProtocols.neckHematomaEvacuation.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                          isDark ? 'bg-slate-800/70 border-slate-700/80 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-red-500 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="text-xs leading-relaxed">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Foreign Body Removal Protocol */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-amber-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.airwayObstructionProtocols.foreignBodyRemoval.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                      DİREKT GÖRÜŞ & MAGILL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {protocol.crisisManagement.airwayObstructionProtocols.foreignBodyRemoval.techniquePearls.map((tp, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2 ${
                          isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="text-amber-500 font-bold shrink-0">▸</span>
                        <span>{tp}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`p-3 rounded-xl border flex items-start gap-2 text-xs font-semibold ${
                    isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}>
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>{protocol.crisisManagement.airwayObstructionProtocols.foreignBodyRemoval.pitfalls}</span>
                  </div>
                </div>

                {/* 3. ETT Occlusion / High Peak Pressure Algorithm */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-sky-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.airwayObstructionProtocols.ettOcclusionAlgorithm.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold">
                      HIZLI DEĞİŞİM & TEST
                    </span>
                  </div>

                  <div className="space-y-2">
                    {protocol.crisisManagement.airwayObstructionProtocols.ettOcclusionAlgorithm.actionSequence.map((act, aIdx) => (
                      <div
                        key={aIdx}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                          isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className="font-mono font-bold text-sky-500 shrink-0">Basamak {aIdx + 1}:</span>
                        <span className="leading-relaxed">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Aspiration Specific Protocols (Chemical vs Particulate, Antibiotic Policy & Gastric USG) */}
            {protocol.crisisManagement.aspirationProtocols && (
              <div className="space-y-4">
                {/* 1. Chemical vs Particulate Aspiration Matrix */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Kimyasal Asit (Mendelson) vs Katı Partikül Aspirasyonu Matriksi
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold">
                      KLİNİK AYRIM
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {protocol.crisisManagement.aspirationProtocols.chemicalVsParticulate.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border flex flex-col justify-between text-xs space-y-2 ${
                          isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-amber-600 dark:text-amber-400 mb-1.5 text-xs">{item.type}</div>
                          <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                            {item.characteristics}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                          {item.managementKey}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Antibiotic and Steroid Policy Box */}
                <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isDark ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50/80 border-rose-200'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 text-xs">
                      <ShieldAlert className="w-4 h-4 text-rose-500" />
                      <span>{protocol.crisisManagement.aspirationProtocols.antibioticAndSteroidPolicy.title}</span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-bold">
                      KANIT DÜZEYİ 1A
                    </span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium text-xs">
                    {protocol.crisisManagement.aspirationProtocols.antibioticAndSteroidPolicy.recommendation}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                    {protocol.crisisManagement.aspirationProtocols.antibioticAndSteroidPolicy.evidenceRationale}
                  </p>
                </div>

                {/* 3. Gastric USG Assessment (Perlas Classification) */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-teal-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Gastrik Ultrasonografi ile Antrum Değerlendirmesi (Perlas Sınıflaması)
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold">
                      POCUS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {protocol.crisisManagement.aspirationProtocols.gastricUsgAssessment.map((g, gIdx) => (
                      <div
                        key={gIdx}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                          gIdx === 2
                            ? isDark ? 'bg-red-950/20 border-red-500/40 text-red-200' : 'bg-red-50 border-red-200 text-red-900'
                            : isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className={`font-bold text-xs mb-1 ${
                            gIdx === 2 ? 'text-red-500 font-black' : gIdx === 1 ? 'text-amber-500' : 'text-teal-500'
                          }`}>
                            {g.grade}
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            {g.description}
                          </p>
                        </div>
                        <div className={`pt-2 border-t font-semibold text-[11px] ${
                          gIdx === 2 
                            ? 'border-red-500/30 text-red-600 dark:text-red-400' 
                            : 'border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400'
                        }`}>
                          {g.riskLevel}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Pulmoner Embolizm (PE / PTE) Özel Kriz Protokolleri */}
            {protocol.crisisManagement.peProtocols && (
              <div className="space-y-4">
                {/* 1. Hemodinamik Resüsitasyon ve RV Desteği */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <HeartCrack className="w-4 h-4 text-rose-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.peProtocols.hemodynamicRvSupport.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                      RV DEKOMPANSASYON
                    </span>
                  </div>

                  {/* Sıvı Kısıtlaması Kritik Uyarısı */}
                  <div className={`p-4 rounded-xl border space-y-1.5 text-xs ${
                    isDark ? 'bg-red-950/30 border-red-500/50 text-red-200' : 'bg-red-50 border-red-300 text-red-900 shadow-2xs'
                  }`}>
                    <div className="flex items-center gap-2 font-black text-red-600 dark:text-red-400 text-xs">
                      <AlertOctagon className="w-4 h-4 text-red-500 shrink-0" />
                      <span>AŞIRI SIVI İNFÜZYONU KESİNLİKLE YASAKTIR! (Septal Shift & Sol Ventrikül Çöküşü)</span>
                    </div>
                    <p className="text-[11px] leading-relaxed font-medium">
                      {protocol.crisisManagement.peProtocols.hemodynamicRvSupport.fluidCaution}
                    </p>
                  </div>

                  {/* Vazoaktif ve İnotrop Tablosu */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Hedefe Yönelik Vazoaktif, İnotrop ve Pulmoner Vazodilatatör Stratejisi:</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      {protocol.crisisManagement.peProtocols.hemodynamicRvSupport.vasopressorsAndInotropes.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                            idx === 0 
                              ? isDark ? 'bg-red-950/20 border-red-500/40 text-red-100' : 'bg-red-50/70 border-red-200' 
                              : isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-bold text-slate-900 dark:text-white text-xs">{item.agent}</span>
                              {idx === 0 && (
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-300 font-bold">
                                  1. TERCİH
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[11px] text-teal-600 dark:text-teal-400 font-bold mb-1">
                              {item.dosage}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
                              Endikasyon: {item.indication}
                            </div>
                          </div>
                          <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                            {item.mechanismPearl}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ventilatör Ayarları Matriksi */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Wind className="w-3.5 h-3.5 text-sky-500" />
                      <span>Sağ Ventrikül Dostu Ventilatör Optimizasyonu (Aşırı PEEP Yasağı):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                      {protocol.crisisManagement.peProtocols.hemodynamicRvSupport.ventilatorSettings.map((v, vIdx) => (
                        <div
                          key={vIdx}
                          className={`p-3 rounded-xl border space-y-1 ${
                            isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="font-semibold text-slate-600 dark:text-slate-400 text-[11px]">{v.parameter}</div>
                          <div className="font-mono font-bold text-sky-600 dark:text-sky-400 text-xs">{v.target}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                            {v.caution}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Trombolitik Tedavi Protokolü & Cerrahi/Kateter Alternatifleri */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-red-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.peProtocols.thrombolyticRegimens.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 font-bold">
                      ZAMANA DUYARLI TROMBOLİZ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {protocol.crisisManagement.peProtocols.thrombolyticRegimens.regimens.map((reg, rIdx) => (
                      <div
                        key={rIdx}
                        className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 text-xs ${
                          isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="font-bold text-slate-900 dark:text-white text-xs flex items-center justify-between">
                            <span>{reg.agent}</span>
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-600 dark:text-red-300 font-bold">
                              {rIdx === 0 ? 'rt-PA' : 'TNK-tPA'}
                            </span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-800 dark:text-teal-200 text-[11px]">
                            <strong>Standart Masif PE: </strong>{reg.standardDose}
                          </div>
                          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-800 dark:text-red-200 text-[11px] font-bold">
                            <strong>Kardiyak Arrest / Peri-Arrest: </strong>{reg.cardiacArrestDose}
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400">
                          <strong>Kontrendikasyonlar & Uyarı: </strong>{reg.contraindications}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cerrahi & Girişimsel Kurtarma Seçenekleri */}
                  <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                    isDark ? 'bg-indigo-950/20 border-indigo-500/40 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}>
                    <div className="font-bold text-indigo-700 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-indigo-500" />
                      <span>Cerrahi Embolektomi, Kateter Trombektomi (EKOS) ve VA-ECMO Kurtarma Stratejileri:</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] leading-relaxed">
                      {protocol.crisisManagement.peProtocols.thrombolyticRegimens.surgicalAndCatheterOptions.map((opt, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-1.5">
                          <span className="text-indigo-500 font-bold">▸</span>
                          <span>{opt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3. Antikoagülasyon Yönetimi */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-teal-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.peProtocols.anticoagulationProtocol.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold">
                      UFH & DMAH
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* UFH */}
                    <div className={`p-4 rounded-xl border space-y-2 ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="font-bold text-teal-600 dark:text-teal-400 text-xs flex items-center justify-between">
                        <span>Anfraksiyone Heparin (UFH) - Akut İlk Tercih</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 font-bold">Geri Döndürülebilir</span>
                      </div>
                      <div className="text-[11px] space-y-1 text-slate-700 dark:text-slate-300">
                        <div><strong>Bolus: </strong>{protocol.crisisManagement.peProtocols.anticoagulationProtocol.ufhProtocol.bolus}</div>
                        <div><strong>İnfüzyon: </strong>{protocol.crisisManagement.peProtocols.anticoagulationProtocol.ufhProtocol.infusion}</div>
                        <div><strong>Hedef aPTT: </strong>{protocol.crisisManagement.peProtocols.anticoagulationProtocol.ufhProtocol.targetAptt}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/30 text-[10px] text-teal-800 dark:text-teal-200 font-semibold">
                        <strong>Antidot: </strong>{protocol.crisisManagement.peProtocols.anticoagulationProtocol.ufhProtocol.reversal}
                      </div>
                    </div>

                    {/* LMWH */}
                    <div className={`p-4 rounded-xl border space-y-2 ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-xs flex items-center justify-between">
                        <span>{protocol.crisisManagement.peProtocols.anticoagulationProtocol.lmwhProtocol.agent}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-bold">Stabil Olgular</span>
                      </div>
                      <div className="text-[11px] space-y-1 text-slate-700 dark:text-slate-300">
                        <div><strong>Doz: </strong>{protocol.crisisManagement.peProtocols.anticoagulationProtocol.lmwhProtocol.dose}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-800 dark:text-amber-200">
                        <strong>Perioperatif Uyarı: </strong>{protocol.crisisManagement.peProtocols.anticoagulationProtocol.lmwhProtocol.caution}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. ESC 2019 Risk Tabakalaması */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.peProtocols.riskStratification.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      ESC 2019 / ERS
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <tr>
                          <th className="p-3">Risk Sınıfı</th>
                          <th className="p-3">Hemodinamik Tablo</th>
                          <th className="p-3">RV Disfonksiyonu</th>
                          <th className="p-3">Biyomarkerlar</th>
                          <th className="p-3">Temel Eylem Planı</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                        {protocol.crisisManagement.peProtocols.riskStratification.categories.map((c, idx) => (
                          <tr key={idx} className={
                            idx === 0 
                              ? isDark ? 'bg-red-950/30' : 'bg-red-50/70 font-semibold' 
                              : idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')
                          }>
                            <td className={`p-3 font-bold ${
                              idx === 0 ? 'text-red-600 dark:text-red-400' : idx === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {c.riskClass}
                            </td>
                            <td className="p-3 text-[11px]">{c.clinicalFeatures}</td>
                            <td className="p-3 font-mono text-[11px]">{c.rvDysfunction}</td>
                            <td className="p-3 font-mono text-[11px]">{c.biomarkers}</td>
                            <td className={`p-3 text-[11px] font-bold ${
                              idx === 0 ? 'text-red-600 dark:text-red-300' : 'text-teal-600 dark:text-teal-400'
                            }`}>
                              {c.primaryAction}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Venöz ve Paradoksal Hava Embolisi (VAE / PAE) Özel Kriz Protokolleri */}
            {protocol.crisisManagement.vaeProtocols && (
              <div className="space-y-4">
                {/* 1. Durant Manevrası ve Hasta Pozisyonlandırma */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-cyan-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.vaeProtocols.durantManeuverAndPositioning.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                      SOL LATERAL + TRENDELENBURG
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Teknik */}
                    <div className={`p-4 rounded-xl border space-y-1.5 ${
                      isDark ? 'bg-cyan-950/20 border-cyan-500/40 text-cyan-100' : 'bg-cyan-50 border-cyan-200 text-cyan-950'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 text-cyan-600 dark:text-cyan-300">
                        <Activity className="w-4 h-4" />
                        <span>Uygulama Tekniği & Acil Masa Pozisyonu:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {protocol.crisisManagement.vaeProtocols.durantManeuverAndPositioning.technique}
                      </p>
                    </div>

                    {/* Fizyolojik Mekanizma */}
                    <div className={`p-4 rounded-xl border space-y-1.5 ${
                      isDark ? 'bg-slate-800/40 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                        <Layers className="w-4 h-4 text-cyan-500" />
                        <span>Fizyolojik Air-Lock Kırma Mekanizması:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {protocol.crisisManagement.vaeProtocols.durantManeuverAndPositioning.physiologicalMechanism}
                      </p>
                    </div>
                  </div>

                  {/* Cerrahi Saha Koordinasyonu */}
                  <div className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                    isDark ? 'bg-amber-950/20 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}>
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs space-y-0.5">
                      <span className="font-bold block text-amber-600 dark:text-amber-400">
                        Cerrahi Ekip ile Anlık Koordinasyon & Oturur Pozisyon Terki:
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {protocol.crisisManagement.vaeProtocols.durantManeuverAndPositioning.surgicalSiteCoordination}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. CVC ve Hava Aspirasyonu Protokolü */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-sky-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.vaeProtocols.cvcAspirationProtocol.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold">
                      KAVOATRİYAL ASPİRASYON
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Kateter Tipi & İdeal Derinlik:
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {protocol.crisisManagement.vaeProtocols.cvcAspirationProtocol.catheterTypeAndDepth}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                      isDark ? 'bg-sky-950/20 border-sky-500/40 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-900'
                    }`}>
                      <span className="font-bold text-sky-700 dark:text-sky-300 block">
                        Negatif Basınç Aspirasyon Tekniği:
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {protocol.crisisManagement.vaeProtocols.cvcAspirationProtocol.aspirationTechnique}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                      isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Başarı Oranı & Anestezist İpuçları:
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {protocol.crisisManagement.vaeProtocols.cvcAspirationProtocol.successRateAndPearls}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. PFO & Paradoksal Arteriyel Emboli (PAE) ve Kesin PEEP Yasağı */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-red-950/20 border-red-500/40' : 'bg-red-50/70 border-red-300 shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-red-500/30">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-red-500" />
                      <h3 className="text-sm font-bold text-red-700 dark:text-red-300">
                        {protocol.crisisManagement.vaeProtocols.pfoParadoxicalEmbolism.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300 font-bold">
                      TOPLUMUN %25-30'U PFO TAŞIR
                    </span>
                  </div>

                  {/* PEEP Yasağı Kesin Banner */}
                  <div className="p-3.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-start gap-2.5 shadow-xs">
                    <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="block uppercase tracking-wider text-[11px]">Hayati Uyarı: PEEP Uygulanması Kesinlikle Yasaktır!</span>
                      <p className="text-[11px] font-normal leading-relaxed opacity-95 mt-0.5">
                        {protocol.crisisManagement.vaeProtocols.pfoParadoxicalEmbolism.peepWarning}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Şant Açılma Mekanizması (RAP &gt; LAP):
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {protocol.crisisManagement.vaeProtocols.pfoParadoxicalEmbolism.riskMechanism}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                    }`}>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Paradoksal İskemi Yönetimi & Kurtarma:
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {protocol.crisisManagement.vaeProtocols.pfoParadoxicalEmbolism.managementKey}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Hiperbarik Oksijen Tedavisi (HBOT) Protokolü */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.vaeProtocols.hyperbaricOxygenGuideline.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      BOYLE & HENRY YASASI · 2.8-3.0 ATA
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      HBOT Kesin Endikasyonları:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {protocol.crisisManagement.vaeProtocols.hyperbaricOxygenGuideline.indications.map((ind, iIdx) => (
                        <div
                          key={iIdx}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 ${
                            isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                          <span className="text-[11px] leading-relaxed">{ind}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-purple-950/20 border-purple-500/40 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
                    }`}>
                      <span className="font-bold block text-purple-700 dark:text-purple-300">
                        Zaman Penceresi ve Etkinlik:
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-700 dark:text-slate-300">
                        {protocol.crisisManagement.vaeProtocols.hyperbaricOxygenGuideline.timeWindow}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-slate-800/40 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Transfer ve İrtifa Kısıtlaması (&lt;300 m):
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {protocol.crisisManagement.vaeProtocols.hyperbaricOxygenGuideline.transportAndStabilization}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Monitörizasyon Yöntemi Hassasiyet Hiyerarşisi */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-cyan-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        İntraoperatif VAE Monitör Hassasiyet Hiyerarşisi (En Duyarlıdan En Kaba Yönteme)
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                      KLİNİK DUYARLILIK REHBERİ
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <tr>
                          <th className="p-3">Monitörizasyon Yöntemi</th>
                          <th className="p-3">Minimum Hava Saptama Eşiği</th>
                          <th className="p-3">Klinik Değerlendirme & Yorum</th>
                          <th className="p-3">Avantaj / Kısıtlılık</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                        {protocol.crisisManagement.vaeProtocols.monitoringSensitivityHierarchy.map((m, idx) => (
                          <tr key={idx} className={
                            idx === 0 
                              ? isDark ? 'bg-cyan-950/30' : 'bg-cyan-50/70 font-semibold' 
                              : idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')
                          }>
                            <td className={`p-3 font-bold ${
                              idx === 0 ? 'text-cyan-600 dark:text-cyan-400' : idx === 1 ? 'text-sky-600 dark:text-sky-400' : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {m.modality}
                            </td>
                            <td className="p-3 font-mono text-[11px] text-teal-600 dark:text-teal-400 font-bold">{m.threshold}</td>
                            <td className="p-3 text-[11px]">{m.clinicalUtility}</td>
                            <td className="p-3 text-[11px] text-slate-500 dark:text-slate-400">{m.characteristics}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* LAST (Lokal Anestezik Sistemik Toksisitesi) Özel Kriz Protokolleri */}
            {protocol.crisisManagement.lastProtocols && (
              <div className="space-y-4">
                {/* 1. %20 Lipid Emülsiyon Kurtarma Protokolü */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-purple-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.lastProtocols.lipidRescueProtocol.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      ASRA 2020 · 1.5 mL/kg BOLUS
                    </span>
                  </div>

                  {/* 4'lü Doz Parametre Kartları */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-purple-950/20 border-purple-500/40 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
                    }`}>
                      <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80">1. Başlangıç Bolus Dozu:</span>
                      <div className="font-bold text-xs">{protocol.crisisManagement.lastProtocols.lipidRescueProtocol.bolusDose}</div>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-indigo-950/20 border-indigo-500/40 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                    }`}>
                      <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80">2. Sürekli İnfüzyon Hızı:</span>
                      <div className="font-bold text-xs">{protocol.crisisManagement.lastProtocols.lipidRescueProtocol.infusionDose}</div>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-slate-800/40 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <span className="text-[10px] uppercase font-bold tracking-wider block text-slate-400">3. Tekrar Bolus Kuralı:</span>
                      <div className="text-[11px] leading-relaxed">{protocol.crisisManagement.lastProtocols.lipidRescueProtocol.repeatBolusRule}</div>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-amber-950/20 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}>
                      <span className="text-[10px] uppercase font-bold tracking-wider block opacity-80">4. Maksimum Kümülatif Limit:</span>
                      <div className="font-bold text-xs">{protocol.crisisManagement.lastProtocols.lipidRescueProtocol.maxCumulativeDose}</div>
                    </div>
                  </div>

                  {/* Lipid Sink & Metabolik Mekanizma Kutusu */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    isDark ? 'bg-slate-800/30 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    <div className="font-bold text-xs flex items-center gap-2 text-slate-900 dark:text-white">
                      <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
                      <span>Lipid Sink (Çökelti) & Mitokondriyal Enerji Kurtarma Mekanizması:</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {protocol.crisisManagement.lastProtocols.lipidRescueProtocol.lipidSinkMechanism}
                    </p>
                  </div>
                </div>

                {/* 2. Modifiye ACLS & Kesin Kontrendikasyonlar */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-red-950/20 border-red-500/40' : 'bg-red-50/70 border-red-300 shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-red-500/30">
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="w-4 h-4 text-red-500" />
                      <h3 className="text-sm font-bold text-red-700 dark:text-red-300">
                        {protocol.crisisManagement.lastProtocols.aclsModifications.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300 font-bold">
                      DÜŞÜK DOZ ADRENALİN · STANDART ACLS DEĞİŞİR
                    </span>
                  </div>

                  {/* Epinefrin Düşük Doz Uyarısı */}
                  <div className="p-3.5 rounded-xl bg-red-600 text-white text-xs font-bold flex items-start gap-2.5 shadow-xs">
                    <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <span className="block uppercase tracking-wider text-[11px]">Hayati Kural: Standart 1 mg Epinefrinden Kaçının!</span>
                      <p className="text-[11px] font-normal leading-relaxed opacity-95 mt-0.5">
                        {protocol.crisisManagement.lastProtocols.aclsModifications.epinephrineAdjustment}
                      </p>
                    </div>
                  </div>

                  {/* Kesin Yasaklı İlaçlar Listesi */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-red-800 dark:text-red-200 block">
                      LAST Resüsitasyonunda Kesinlikle Kontrendike Ajanlar:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                      {protocol.crisisManagement.lastProtocols.aclsModifications.prohibitedDrugs.map((item, pIdx) => (
                        <div
                          key={pIdx}
                          className={`p-3 rounded-xl border flex items-start gap-2 ${
                            isDark ? 'bg-slate-900/60 border-red-500/30 text-red-200' : 'bg-white border-red-200 text-red-900'
                          }`}
                        >
                          <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-relaxed font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Antiaritmik ve ECMO Bilgi Kutuları */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-slate-900/60 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Aritmi Yönetimi (Amiodaron Tercihi):
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {protocol.crisisManagement.lastProtocols.aclsModifications.antiarrhythmicStrategy}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-slate-900/60 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
                    }`}>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        Erken VA-ECMO / CPB Kriteri:
                      </span>
                      <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                        {protocol.crisisManagement.lastProtocols.aclsModifications.ecmoCriteria}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Lokal Anestezik Güvenli Maksimum Dozlar & Toksisite Tablosu */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-purple-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Lokal Anestezik Güvenli Maksimum Dozlar & Kardiyotoksisite Riski Matriksi
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      KLİNİK DOZ LİMİTLERİ
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <tr>
                          <th className="p-3">Lokal Anestezik</th>
                          <th className="p-3">Düz Maksimum Doz</th>
                          <th className="p-3">+Epinefrinli Maks Doz</th>
                          <th className="p-3">Etki Süresi</th>
                          <th className="p-3">Kardiyotoksisite Riski (CC/CNS)</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                        {protocol.crisisManagement.lastProtocols.safeDosageLimits.map((row, idx) => (
                          <tr key={idx} className={
                            idx === 0 
                              ? isDark ? 'bg-rose-950/30' : 'bg-rose-50/70 font-semibold' 
                              : idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')
                          }>
                            <td className={`p-3 font-bold ${
                              idx === 0 ? 'text-rose-600 dark:text-rose-400' : idx === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {row.agent}
                            </td>
                            <td className="p-3 font-mono text-[11px] text-teal-600 dark:text-teal-400 font-bold">{row.plainMaxDose}</td>
                            <td className="p-3 font-mono text-[11px] text-sky-600 dark:text-sky-400 font-bold">{row.epinephrineMaxDose}</td>
                            <td className="p-3 text-[11px]">{row.durationOfAction}</td>
                            <td className={`p-3 text-[11px] font-bold ${
                              idx === 0 ? 'text-red-600 dark:text-red-400' : idx === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-600 dark:text-slate-400'
                            }`}>
                              {row.cardiotoxicityRisk}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Toksisite Progresyon Basamakları */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Klinik Toksisite Progresyon Basamakları (Plazma Düzeyi & Semptom Eşleşmesi)
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold">
                      MSS & KVS EVRELERİ
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <tr>
                          <th className="p-3">Toksisite Evresi</th>
                          <th className="p-3">Plazma LA Düzeyi</th>
                          <th className="p-3">MSS Belirtileri</th>
                          <th className="p-3">Kardiyovasküler Belirtiler</th>
                          <th className="p-3">Acil Klinik Eylem</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                        {protocol.crisisManagement.lastProtocols.toxicityProgressionStages.map((stg, idx) => (
                          <tr key={idx} className={
                            idx === 3 
                              ? isDark ? 'bg-red-950/30' : 'bg-red-50/70 font-semibold' 
                              : idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')
                          }>
                            <td className={`p-3 font-bold ${
                              idx === 3 ? 'text-red-600 dark:text-red-400' : idx === 2 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {stg.stage}
                            </td>
                            <td className="p-3 font-mono text-[11px] text-teal-600 dark:text-teal-400 font-bold">{stg.plasmaLevel}</td>
                            <td className="p-3 text-[11px]">{stg.cnsSymptoms}</td>
                            <td className="p-3 text-[11px] font-medium">{stg.cvsSymptoms}</td>
                            <td className={`p-3 text-[11px] font-bold ${
                              idx >= 2 ? 'text-red-600 dark:text-red-300' : 'text-teal-600 dark:text-teal-400'
                            }`}>
                              {stg.actionRequired}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* İntraoperatif Anafilaksiye Özel Protokol Kartları */}
            {protocol.crisisManagement.anaphylaxisProtocols && (
              <div className="space-y-6 pt-2">
                {/* 1. Klinik Evreye Göre Epinefrin (Adrenalin) Titrasyon Protokolü */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50/70 border-rose-300 shadow-2xs'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-rose-500/30">
                    <div className="flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-rose-500 shrink-0" />
                      <h3 className="text-sm font-bold text-rose-800 dark:text-rose-200">
                        {protocol.crisisManagement.anaphylaxisProtocols.epinephrineTitrationByGrade.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold self-start sm:self-auto">
                      {protocol.crisisManagement.anaphylaxisProtocols.epinephrineTitrationByGrade.guidelineSource}
                    </span>
                  </div>

                  {/* 4 Evre Kart Gridi */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {protocol.crisisManagement.anaphylaxisProtocols.epinephrineTitrationByGrade.grades.map((grd, gIdx) => (
                      <div
                        key={gIdx}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                          gIdx === 3
                            ? isDark ? 'bg-red-950/40 border-red-500/50 text-red-200' : 'bg-red-100/80 border-red-400 text-red-950 font-medium'
                            : gIdx === 2
                              ? isDark ? 'bg-rose-950/30 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-950'
                              : gIdx === 1
                                ? isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                                : isDark ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-xs">{grd.grade}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-semibold">{grd.severity}</span>
                          </div>
                          <p className="text-[11px] leading-snug mt-1.5 opacity-90">
                            {grd.clinicalPresentation}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-1.5 text-[11px]">
                          <div>
                            <span className="text-[10px] uppercase font-bold opacity-75 block">IV Bolus Dozu:</span>
                            <div className="font-bold text-xs font-mono">{grd.epinephrineBolus}</div>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold opacity-75 block">İnfüzyon:</span>
                            <div className="font-mono text-[11px]">{grd.infusionRate}</div>
                          </div>
                          <div className="text-[10px] opacity-85 italic pt-1">
                            {grd.clinicalAlert}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* IM Alternatif ve Pediatrik Çağrı Çubuğu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-900 dark:text-purple-200 space-y-1">
                      <span className="font-bold block flex items-center gap-1.5">
                        <Syringe className="w-3.5 h-3.5 text-purple-500" />
                        Damaryolu Yoksa: Uyluk Dış Yan (Vastus Lateralis) IM Adrenalin
                      </span>
                      <p className="text-[11px] leading-relaxed opacity-95">
                        {protocol.crisisManagement.anaphylaxisProtocols.epinephrineTitrationByGrade.imAlternative}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-900 dark:text-sky-200 space-y-1">
                      <span className="font-bold block flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-sky-500" />
                        Pediatrik Hastalarda Adrenalin Dozlaması
                      </span>
                      <p className="text-[11px] leading-relaxed opacity-95">
                        {protocol.crisisManagement.anaphylaxisProtocols.epinephrineTitrationByGrade.pediatricDosing}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Masif Kristaloid Volüm & Vazopleji Kontrolü */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.anaphylaxisProtocols.fluidAndVasopressorResuscitation.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold">
                      20-30 mL/kg KRİSTALOİD · KOLLOİD KESİNLİKLE YASAK
                    </span>
                  </div>

                  {/* Sıvı Yüklemesi & Kolloid Yasağı Kırmızı Alarm */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-900 dark:text-sky-200 space-y-1">
                      <span className="font-bold block">Masif Kristaloid Sıvı Hacmi ve Basınçlı Torba Hedefi:</span>
                      <p className="text-[11px] leading-relaxed">
                        {protocol.crisisManagement.anaphylaxisProtocols.fluidAndVasopressorResuscitation.crystalloidVolume}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-red-600 text-white space-y-1 shadow-xs">
                      <div className="font-bold flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Hayati Kontrendikasyon: Kolloid Sıvı Yasağı!</span>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-95">
                        {protocol.crisisManagement.anaphylaxisProtocols.fluidAndVasopressorResuscitation.colloidProhibitionWarning}
                      </p>
                    </div>
                  </div>

                  {/* İkinci Basamak Vazopressörler Tablosu */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Adrenaline Dirençli Vazoplejide İkinci Basamak Ajanlar (Noradrenalin, Vazopressin, Metilen Mavisi, Glukagon):
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      {protocol.crisisManagement.anaphylaxisProtocols.fluidAndVasopressorResuscitation.secondaryVasopressors.map((vp, vIdx) => (
                        <div
                          key={vIdx}
                          className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white block">{vp.agent}</span>
                            <div className="font-mono text-[11px] text-teal-600 dark:text-teal-400 font-bold mt-0.5">{vp.dosage}</div>
                          </div>
                          <div className="text-[10px] space-y-1 pt-1 border-t border-slate-200 dark:border-slate-800">
                            <div><strong className="opacity-75">Endikasyon:</strong> {vp.indication}</div>
                            <div className="text-slate-500 dark:text-slate-400">{vp.mechanism}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Empty Heart Kutusu */}
                  <div className={`p-3.5 rounded-xl border text-[11px] ${
                    isDark ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}>
                    <strong>Boş Kalp ("Empty Heart") Mekanizması:</strong> {protocol.crisisManagement.anaphylaxisProtocols.fluidAndVasopressorResuscitation.refractoryVasoplegia}
                  </div>
                </div>

                {/* 3. Ring & Messmer Perioperatif Anafilaksi Derecelendirme Skalası Tablosu */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-rose-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Ring & Messmer Perioperatif Anafilaksi Klinik Derecelendirme Skalası
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
                      EVRELEME & AKSİYON
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                        isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}>
                        <tr>
                          <th className="p-3">Evre (Grade)</th>
                          <th className="p-3">Kütanöz Belirtiler</th>
                          <th className="p-3">Respiratuar Belirtiler</th>
                          <th className="p-3">Kardiyovasküler Belirtiler</th>
                          <th className="p-3">Acil Klinik Eylem</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                        {protocol.crisisManagement.anaphylaxisProtocols.ringAndMessmerScale.map((rm, idx) => (
                          <tr key={idx} className={
                            idx === 3
                              ? isDark ? 'bg-red-950/40 font-semibold' : 'bg-red-100/80 font-semibold'
                              : idx === 2
                                ? isDark ? 'bg-rose-950/30' : 'bg-rose-50/70 font-semibold'
                                : idx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')
                          }>
                            <td className={`p-3 font-bold font-mono ${
                              idx === 3 ? 'text-red-600 dark:text-red-400' : idx === 2 ? 'text-rose-600 dark:text-rose-400' : idx === 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'
                            }`}>
                              {rm.grade}
                            </td>
                            <td className="p-3 text-[11px]">{rm.cutaneousSigns}</td>
                            <td className="p-3 text-[11px]">{rm.respiratorySigns}</td>
                            <td className="p-3 text-[11px] font-medium">{rm.cardiovascularSigns}</td>
                            <td className={`p-3 text-[11px] font-bold ${
                              idx >= 2 ? 'text-rose-600 dark:text-rose-300' : 'text-teal-600 dark:text-teal-400'
                            }`}>
                              {rm.immediateAction}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Serum Triptaz Tanı Protokolü & İmmünolojik Araştırma (NAP6) */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {protocol.crisisManagement.anaphylaxisProtocols.tryptaseAndInvestigationProtocol.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold self-start sm:self-auto">
                      NAP6 STANDARTLARI · TRİPTAZ KİNETİĞİ
                    </span>
                  </div>

                  {/* Örnek Zamanlaması ve Formül Kartları */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-900 dark:text-purple-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-500" />
                        <span>1. Örnek: Pik Triptaz</span>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-95">
                        {protocol.crisisManagement.anaphylaxisProtocols.tryptaseAndInvestigationProtocol.firstSampleTiming}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-900 dark:text-indigo-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>2. Örnek: Bazal Triptaz</span>
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-95">
                        {protocol.crisisManagement.anaphylaxisProtocols.tryptaseAndInvestigationProtocol.secondSampleTiming}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-900 dark:text-teal-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />
                        <span>Pozitiflik Doğrulama Formülü</span>
                      </div>
                      <p className="text-[11px] leading-relaxed font-mono font-bold text-teal-700 dark:text-teal-300">
                        {protocol.crisisManagement.anaphylaxisProtocols.tryptaseAndInvestigationProtocol.diagnosticFormula}
                      </p>
                    </div>
                  </div>

                  {/* Sorumlu Ajanlar Tablosu */}
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Perioperatif Anafilakside En Sık Sorumlu Ajanlar & Epidemiyolojik Risk Dağılımı:
                    </span>
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left text-xs">
                        <thead className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                          isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                        }`}>
                          <tr>
                            <th className="p-3">Ajan Kategorisi</th>
                            <th className="p-3">İnsidans Oranı</th>
                            <th className="p-3">Sık Tetikleyiciler</th>
                            <th className="p-3">Klinik & İmmünolojik Risk Özellikleri</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                          {protocol.crisisManagement.anaphylaxisProtocols.tryptaseAndInvestigationProtocol.culpritAgentsBreakdown.map((ca, cIdx) => (
                            <tr key={cIdx} className={
                              cIdx === 0
                                ? isDark ? 'bg-rose-950/20' : 'bg-rose-50/70 font-semibold'
                                : cIdx % 2 === 0 ? (isDark ? 'bg-slate-900/40' : 'bg-white') : (isDark ? 'bg-slate-900/90' : 'bg-slate-50/70')
                            }>
                              <td className="p-3 font-bold text-slate-900 dark:text-white">{ca.category}</td>
                              <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">{ca.prevalence}</td>
                              <td className="p-3 font-semibold">{ca.commonDrugs}</td>
                              <td className="p-3 text-[11px] text-slate-600 dark:text-slate-400">{ca.riskNotes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sugammadeks Şelasyon Kurtarma & Alerji Sevk Çubuğu */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    }`}>
                      <span className="font-bold block flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300">
                        <Sparkles className="w-4 h-4" />
                        Rokuronyum Anafilaksisinde Sugammadeks 16 mg/kg Kurtarma Rolü
                      </span>
                      <p className="text-[11px] leading-relaxed opacity-95">
                        {protocol.crisisManagement.anaphylaxisProtocols.tryptaseAndInvestigationProtocol.sugammadexRescueInRocuronium}
                      </p>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-1 ${
                      isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <span className="font-bold block flex items-center gap-1.5 text-slate-900 dark:text-white">
                        <BookOpen className="w-4 h-4 text-sky-500" />
                        Postoperatif 4-6. Hafta Alerji-İmmünoloji Sevki
                      </span>
                      <p className="text-[11px] leading-relaxed opacity-95">
                        {protocol.crisisManagement.anaphylaxisProtocols.tryptaseAndInvestigationProtocol.allergyClinicReferral}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Perioperatif Kardiyak Arrest & ACLS Özel Protokol Kartları */}
            {protocol.crisisManagement.aclsProtocols && (
              <div className="space-y-6 pt-2">
                {/* 1. Yüksek Kaliteli KPR Fizyolojik Hedefleri */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-red-950/20 border-red-500/40' : 'bg-red-50/70 border-red-300 shadow-2xs'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-red-500/30">
                    <div className="flex items-center gap-2">
                      <HeartCrack className="w-4 h-4 text-red-500 shrink-0" />
                      <h3 className="text-sm font-bold text-red-800 dark:text-red-200">
                        Yüksek Kaliteli KPR &amp; Ameliyathane Fizyolojik Hedefleri
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300 font-bold self-start sm:self-auto">
                      EtCO2 &amp; ARTER REHBERLİĞİ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    {protocol.crisisManagement.aclsProtocols.cprQualityTargets.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border space-y-1.5 ${
                          isDark ? 'bg-slate-900/70 border-slate-800 text-slate-200' : 'bg-white border-red-200 text-slate-800'
                        }`}
                      >
                        <div className="text-[10px] font-mono uppercase tracking-wider text-red-600 dark:text-red-400 font-bold">
                          {item.metric}
                        </div>
                        <div className="text-xs font-mono font-extrabold text-slate-900 dark:text-white">
                          {item.target}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.clinicalNote}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Şoklanabilir (VF/pVT) vs Şoklanamaz (Asistoli/PEA) İkili Algoritma */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                  {protocol.crisisManagement.aclsProtocols.rhythmAlgorithms.map((alg, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl border space-y-3 ${
                        idx === 0
                          ? isDark ? 'bg-amber-950/15 border-amber-500/40' : 'bg-amber-50/70 border-amber-300 shadow-2xs'
                          : isDark ? 'bg-rose-950/15 border-rose-500/40' : 'bg-rose-50/70 border-rose-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-black/10 dark:border-white/10">
                        <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                          <Zap className={`w-4 h-4 ${idx === 0 ? 'text-amber-500' : 'text-rose-500'}`} />
                          {alg.pathway}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          idx === 0
                            ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                            : 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                        }`}>
                          {alg.badge}
                        </span>
                      </div>

                      <div className="space-y-2 text-[11px] leading-relaxed">
                        <div>
                          <strong className="text-slate-900 dark:text-white">İlk Adım: </strong>
                          <span className="text-slate-700 dark:text-slate-300">{alg.initialAction}</span>
                        </div>
                        <div>
                          <strong className="text-slate-900 dark:text-white">Defibrilasyon: </strong>
                          <span className="text-slate-700 dark:text-slate-300 font-mono">{alg.defibrillationDose}</span>
                        </div>
                        <div>
                          <strong className="text-slate-900 dark:text-white">Adrenalin Zamanlaması: </strong>
                          <span className="text-slate-700 dark:text-slate-300">{alg.epinephrineTiming}</span>
                        </div>
                        <div>
                          <strong className="text-slate-900 dark:text-white">Antiaritmikler: </strong>
                          <span className="text-slate-700 dark:text-slate-300">{alg.antiarrhythmics}</span>
                        </div>
                        <div className={`p-2.5 rounded-lg border mt-2 ${
                          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-white/90 border-slate-200 text-slate-700'
                        }`}>
                          <strong>Kritik Uyarı: </strong>{alg.criticalAlerts}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Perioperatif 5H & 5T + Anesteziye Özgü Geri Döndürülebilir Nedenler Tablosu */}
                <div className={`rounded-2xl border overflow-hidden ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-red-500" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Perioperatif Geri Döndürülebilir Nedenler (5H &amp; 5T + Anesteziye Özgü Nedenler)
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">PEA &amp; Dirençli Arrestte Hızla Tara</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs min-w-[760px]">
                      <thead>
                        <tr className={`border-b text-[11px] uppercase font-bold ${
                          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}>
                          <th className="py-2.5 px-3.5 w-[16%]">Kategori</th>
                          <th className="py-2.5 px-3.5 w-[24%]">Neden</th>
                          <th className="py-2.5 px-3.5 w-[28%]">İntraoperatif İpuçları</th>
                          <th className="py-2.5 px-3.5 w-[32%]">Acil Geri Çevirme / Tedavi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {protocol.crisisManagement.aclsProtocols.perioperativeHAndTs.map((ht, idx) => (
                          <tr key={idx} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/70'}>
                            <td className="py-3 px-3.5 align-top font-mono text-[10px] font-bold">
                              <span className={`px-2 py-0.5 rounded ${
                                ht.category.startsWith('5H')
                                  ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400'
                                  : ht.category.startsWith('5T')
                                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                              }`}>
                                {ht.category}
                              </span>
                            </td>
                            <td className="py-3 px-3.5 align-top font-bold text-slate-900 dark:text-white">
                              {ht.cause}
                            </td>
                            <td className="py-3 px-3.5 align-top text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                              {ht.intraopClues}
                            </td>
                            <td className="py-3 px-3.5 align-top text-[11px] text-emerald-700 dark:text-emerald-300 font-medium leading-relaxed">
                              {ht.immediateReversal}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Ameliyathane İçi Özel ACLS Modifikasyonları */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {protocol.crisisManagement.aclsProtocols.operatingRoomModifications.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="font-bold text-cyan-600 dark:text-cyan-400 block mb-1">Anestezikler &amp; Ventilasyon Ayarı</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {protocol.crisisManagement.aclsProtocols.operatingRoomModifications.anestheticAndVentilation}
                      </p>
                    </div>
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Prone (Yüzüstü) Pozisyonda Ters KPR</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        {protocol.crisisManagement.aclsProtocols.operatingRoomModifications.proneAndPositioningCpr}
                      </p>
                    </div>
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'}`}>
                      <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">Gebelik Arresti (4-5 Dakika Kuralı)</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        {protocol.crisisManagement.aclsProtocols.operatingRoomModifications.maternalCardiacArrest}
                      </p>
                    </div>
                    <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-purple-950/20 border-purple-500/30' : 'bg-purple-50/70 border-purple-200'}`}>
                      <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">ECPR (VA-ECMO) Aktivasyon Kriterleri</span>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        {protocol.crisisManagement.aclsProtocols.operatingRoomModifications.ecprCriteria}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. ROSC Sonrası Hedefler */}
                <div className={`p-5 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-emerald-950/15 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200 shadow-2xs'
                }`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                      ROSC (Spontan Dolaşımın Dönüşü) Sonrası Hedef Parametreler
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
                    {protocol.crisisManagement.aclsProtocols.roscPostArrestTargets.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border ${
                          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-emerald-200'
                        }`}
                      >
                        <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {item.parameter}
                        </div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white mt-0.5">
                          {item.target}
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                          {item.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Cooling, Hyperkalemia and Arrhythmia Sub-Protocols (Only when available) */}
            {protocol.crisisManagement.coolingProtocol && protocol.crisisManagement.hyperkalemiaProtocol && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Active Cooling */}
                <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400">
                    <Thermometer className="w-4 h-4" />
                    <span>Aktif Soğutma Protokolü</span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    <strong>Hedef: </strong>{protocol.crisisManagement.coolingProtocol.targetTemp}
                  </p>
                  <ul className="space-y-1 list-disc list-inside text-[11px] text-slate-700 dark:text-slate-300">
                    {protocol.crisisManagement.coolingProtocol.methods.map((m, mIdx) => (
                      <li key={mIdx}>{m}</li>
                    ))}
                  </ul>
                  <div className="pt-1 text-[11px] font-semibold text-rose-500">
                    * Durdurma Eşiği: {protocol.crisisManagement.coolingProtocol.stopThreshold}
                  </div>
                </div>

                {/* Hyperkalemia & Arrhythmia Warning */}
                <div className={`p-4 rounded-xl border space-y-2 text-xs ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400">
                    <HeartCrack className="w-4 h-4" />
                    <span>Hiperkalemi & Aritmi Yönetimi</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                    {protocol.crisisManagement.hyperkalemiaProtocol.map((hk, hkIdx) => (
                      <li key={hkIdx} className="flex items-start gap-1.5">
                        <span className="text-red-500">▸</span>
                        <span>{hk}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/50 text-[10px] text-red-200 font-bold leading-relaxed">
                    {protocol.crisisManagement.arrhythmiaWarning}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 5) Patofizyoloji (Accordion Section) */}
      <section id="sec5" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec5')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <Dna className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                5) Patofizyoloji
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec5 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec5 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec5 && (
          <div className="p-5 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800/80">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
              {protocol.pathophysiology.molecularBasis}
            </p>

            {/* Genetic Mutations Tags (Only if present) */}
            {protocol.pathophysiology.geneticMutations && protocol.pathophysiology.geneticMutations.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-bold text-slate-400">Sorumlu Genler:</span>
                {protocol.pathophysiology.geneticMutations.map((gen, idx) => (
                  <span
                    key={idx}
                    className={`text-xs font-mono px-2.5 py-1 rounded-lg border font-semibold ${
                      idx === 0 
                        ? 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {gen}
                  </span>
                ))}
              </div>
            )}

            {/* Dynamic Pathophysiology Steps / Vicious Cycle / Natural Cascade */}
            {protocol.pathophysiology.cascadeSteps && protocol.pathophysiology.cascadeSteps.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-purple-500" />
                    <span>{protocol.pathophysiology.stepsTitle || 'Patofizyolojik Mekanizma & Kilit Süreçler'}:</span>
                  </div>
                  {protocol.pathophysiology.flowType && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border self-start sm:self-auto ${
                      protocol.pathophysiology.flowType === 'vicious-cycle'
                        ? 'bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400'
                        : protocol.pathophysiology.flowType === 'biphasic'
                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                        : protocol.pathophysiology.flowType === 'cellular-systemic'
                        ? 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400'
                        : 'bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400'
                    }`}>
                      {protocol.pathophysiology.flowType === 'vicious-cycle' 
                        ? '🔄 KISIR DÖNGÜ (FEEDBACK LOOP)'
                        : protocol.pathophysiology.flowType === 'biphasic'
                        ? '⚡ BİFAZİK MEKANİZMA'
                        : protocol.pathophysiology.flowType === 'cellular-systemic'
                        ? '🔬 HÜCRESEL & SİSTEMİK EKSEN'
                        : '🧬 DOĞAL PATOLOJİK KASKAT'}
                    </span>
                  )}
                </div>

                {/* Vicious Cycle Banner (if present) */}
                {protocol.pathophysiology.cycleWarning && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{protocol.pathophysiology.cycleWarning}</span>
                  </div>
                )}

                <div className={`grid grid-cols-1 ${
                  protocol.pathophysiology.cascadeSteps.length === 2
                    ? 'md:grid-cols-2'
                    : protocol.pathophysiology.cascadeSteps.length === 3 
                    ? 'md:grid-cols-3' 
                    : protocol.pathophysiology.cascadeSteps.length === 4 
                    ? 'md:grid-cols-2 lg:grid-cols-4' 
                    : 'md:grid-cols-3 lg:grid-cols-5'
                } gap-2.5`}>
                  {protocol.pathophysiology.cascadeSteps.map((step, idx, arr) => {
                    const stepBadge = step.badge || (
                      protocol.pathophysiology.flowType === 'vicious-cycle' 
                        ? `DÖNGÜ ${idx + 1}` 
                        : protocol.pathophysiology.flowType === 'biphasic'
                        ? `FAZ ${idx + 1}`
                        : protocol.pathophysiology.flowType === 'cellular-systemic'
                        ? `EKSEN ${idx + 1}`
                        : `AŞAMA ${idx + 1}`
                    );

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between text-xs space-y-2.5 relative ${
                          protocol.pathophysiology.flowType === 'vicious-cycle'
                            ? isDark ? 'bg-red-950/20 border-red-500/30' : 'bg-red-50/60 border-red-200'
                            : isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-600 dark:text-purple-300">
                              {stepBadge}
                            </span>
                            {protocol.pathophysiology.flowType === 'vicious-cycle' && (
                              <span className="text-[10px] font-mono opacity-60">
                                {idx === arr.length - 1 ? '↺ Başa Döner' : '↓'}
                              </span>
                            )}
                          </div>
                          <div className="font-bold text-slate-900 dark:text-white leading-tight">{step.phase}</div>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                          {step.mechanism}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              isDark ? 'bg-purple-950/20 border-purple-500/30 text-purple-300' : 'bg-purple-50/70 border-purple-200 text-purple-950'
            }`}>
              <strong>Patofizyolojik Özet: </strong>{protocol.pathophysiology.summaryText}
            </div>
          </div>
        )}
      </section>

      {/* 6) Klinik Özellikler & Prezentasyon (Accordion Section) */}
      <section id="sec6" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec6')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                6) Klinik Özellikler & Prezentasyon
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec6 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec6 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec6 && (
          <div className="p-5 sm:p-6 pt-0 space-y-5 border-t border-slate-100 dark:border-slate-800/80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Early Signs */}
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isDark ? 'bg-red-950/20 border-red-500/30' : 'bg-red-50/70 border-red-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-red-600 dark:text-red-400">1. ERKEN BULGULAR</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-500 font-bold">HAYATİ</span>
                </div>
                <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  {protocol.presentation.earlySigns.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-red-500 font-bold">▸</span>
                      <span className={idx === 0 ? 'font-bold' : ''}>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Progressing Signs */}
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/70 border-amber-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-600 dark:text-amber-400">2. İLERLEYEN BULGULAR</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 font-bold">RİJİDİTE</span>
                </div>
                <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  {protocol.presentation.progressingSigns.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-500 font-bold">▸</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Late Signs */}
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isDark ? 'bg-purple-950/20 border-purple-500/30' : 'bg-purple-50/70 border-purple-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-purple-600 dark:text-purple-400">3. GEÇ BULGULAR</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-500 font-bold">HİPERTERMİ</span>
                </div>
                <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  {protocol.presentation.lateSigns.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-purple-500 font-bold">▸</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Masseter Spasm Callout (For MH) */}
            {protocol.presentation.masseterSpasmManagement && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <AlertOctagon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong className="text-slate-900 dark:text-white font-bold">Süksinilkolin Sonrası Masseter Kas Spazmı (MMR / Trismus) Yönetimi: </strong>
                  {protocol.presentation.masseterSpasmManagement}
                </div>
              </div>
            )}

            {/* Special Alert Callout (e.g. Silent Chest in Bronchospasm) */}
            {protocol.presentation.specialAlertTitle && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                isDark ? 'bg-amber-950/20 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
              }`}>
                <AlertOctagon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed space-y-1">
                  <strong className="text-slate-900 dark:text-white font-bold block text-sm">
                    {protocol.presentation.specialAlertTitle}
                  </strong>
                  <p className="text-[11px] leading-relaxed">
                    {protocol.presentation.specialAlertContent}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 7) Koruyucu Tedbirler & Hazırlık (Accordion Section) */}
      <section id="sec7" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec7')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-500">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                7) Koruyucu Tedbirler & Hazırlık
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec7 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec7 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec7 && (
          <div className="p-5 sm:p-6 pt-0 space-y-5 border-t border-slate-100 dark:border-slate-800/80">
            {/* Preop Risk Assessment */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                Preoperatif Risk Değerlendirmesi:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {protocol.preventionAndPreparedness.preopRiskAssessment.map((risk, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {risk}
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Machine Protocol Steps */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDark ? 'bg-teal-950/20 border-teal-500/30' : 'bg-teal-50/70 border-teal-200'
            }`}>
              <div className="text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500" />
                <span>{protocol.preventionAndPreparedness.anesthesiaMachinePreparation.title}</span>
              </div>

              <div className="space-y-2 text-xs">
                {protocol.preventionAndPreparedness.anesthesiaMachinePreparation.steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <span className="font-mono font-bold text-teal-500 shrink-0">Adım {idx + 1}:</span>
                    <span className="leading-relaxed">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Checklist */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>
                  {protocol.preventionAndPreparedness.cartTitle || (
                    protocol.id === 'mh'
                      ? 'Malign Hipertermi Acil Arabası (MH Cart) Asgari Donanım Listesi:'
                      : protocol.id === 'pe'
                      ? 'Acil Pulmoner Emboli (PE) Resüsitasyon Kiti & Ekipman Listesi:'
                      : protocol.id === 'vae'
                      ? 'Acil Hava Embolisi (VAE) Kiti & Ekipman Kontrol Listesi:'
                      : protocol.id === 'last'
                      ? 'LAST Acil Lipid Kiti & Donanım Listesi:'
                      : protocol.id === 'anaphylaxis'
                      ? 'İntraoperatif Anafilaksi Acil Kiti & İlaç Listesi:'
                      : protocol.id === 'bronchospasm'
                      ? 'Acil Bronkospazm & Havayolu Kiti Asgari Donanım Listesi:'
                      : protocol.id === 'laryngospasm'
                      ? 'Acil Laringospazm & Havayolu Kiti Asgari Donanım Listesi:'
                      : (protocol.id === 'airway-crisis' || protocol.id === 'cico')
                      ? 'Acil Krikotiroidotomi & CICO Kiti Asgari Donanım Listesi:'
                      : protocol.id === 'airway-obstruction'
                      ? 'Acil Hava Yolu Obstrüksiyonu & Boyun Hematomu Kiti Donanım Listesi:'
                      : protocol.id === 'aspiration'
                      ? 'Pulmoner Aspirasyon & RSI Acil Donanım Listesi:'
                      : `${protocol.title} Acil Ekipman & Donanım Listesi:`
                  )}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {protocol.preventionAndPreparedness.cartChecklist.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                      isDark ? 'bg-slate-800/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 8) Postoperatif Takip & Prognoz (Accordion Section) */}
      <section id="sec8" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec8')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                8) Postoperatif Takip & Prognoz
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec8 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec8 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec8 && (
          <div className="p-5 sm:p-6 pt-0 space-y-5 border-t border-slate-100 dark:border-slate-800/80">
            {/* Recurrence and ICU Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              {protocol.postopManagement.recurrenceRate && (
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'bg-red-950/20 border-red-500/30 text-red-200' : 'bg-red-50 border-red-300 text-red-950'
                }`}>
                  <div className="font-bold text-xs mb-1 flex items-center gap-1.5 text-red-500">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{protocol.postopManagement.recurrenceRiskBadge || 'NÜKS (REKÜRRENS) RİSKİ:'}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {protocol.postopManagement.recurrenceRate}
                  </p>
                </div>
              )}

              <div className={`p-4 rounded-xl border ${
                protocol.postopManagement.recurrenceRate ? '' : 'sm:col-span-2'
              } ${
                isDark ? 'bg-slate-800/50 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}>
                <div className="font-bold text-xs mb-1 text-slate-900 dark:text-white">
                  Yoğun Bakım İzlem Süresi:
                </div>
                <p className="text-[11px] leading-relaxed">
                  {protocol.postopManagement.icuMonitoringDuration}
                </p>
              </div>
            </div>

            {/* Monitoring & Complications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold text-slate-900 dark:text-white block">YBÜ Monitorizasyon Parametreleri:</span>
                <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-400 text-[11px]">
                  {protocol.postopManagement.monitoringParameters.map((param, idx) => (
                    <li key={idx}>{param}</li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold text-slate-900 dark:text-white block">Beklenen Komplikasyonlar:</span>
                <ul className="space-y-1 list-disc list-inside text-rose-600 dark:text-rose-400 text-[11px]">
                  {protocol.postopManagement.expectedComplications.map((comp, idx) => (
                    <li key={idx}>{comp}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Definitive Testing: Only if present */}
            {protocol.postopManagement.definitiveDiagnosticTesting && protocol.postopManagement.definitiveDiagnosticTesting.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {protocol.id === 'mh' ? 'Kesin Tanı Testleri ve Genetik Danışmanlık:' : 'Postoperatif İleri Tanı ve Değerlendirme:'}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {protocol.postopManagement.definitiveDiagnosticTesting.map((test, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border space-y-1 ${
                        isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-indigo-600 dark:text-indigo-400">
                        {test.testName}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        {test.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Family Screening & Prognosis */}
            <div className={`p-3.5 rounded-xl text-xs leading-relaxed space-y-2 ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 border border-slate-200 text-slate-700'
            }`}>
              {(protocol.postopManagement.geneticCounseling || protocol.postopManagement.familyScreening) && (
                <div className="space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">Aile Taraması ve Genetik Danışmanlık:</div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    {protocol.postopManagement.geneticCounseling || protocol.postopManagement.familyScreening}
                  </p>
                </div>
              )}
              {protocol.postopManagement.prognosisSummary && (
                <div className={`text-[11px] ${(protocol.postopManagement.geneticCounseling || protocol.postopManagement.familyScreening) ? 'pt-2 border-t border-slate-700/60 dark:border-slate-700' : ''}`}>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Prognoz Özeti: </span>
                  <span className="text-slate-600 dark:text-slate-300">{protocol.postopManagement.prognosisSummary}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* 9) High-Yield Bilgiler (Accordion Section) */}
      <section id="sec9" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec9')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                9) High-Yield Bilgiler
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec9 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec9 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec9 && (
          <div className="p-5 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {protocol.highYieldPearls.map((pearl, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col justify-between space-y-2.5 transition-all ${
                    pearl.category === 'Tuzak'
                      ? isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'
                      : pearl.category === 'Kritik Doz'
                        ? isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
                        : isDark ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50/70 border-indigo-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                        pearl.category === 'Tuzak'
                          ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/30'
                          : pearl.category === 'Kritik Doz'
                            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
                      }`}>
                        {pearl.category}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                      {pearl.title}
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pearl.takeaway}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 10) Kullanılan Kaynaklar & İleri Okuma (Accordion Section) */}
      <section id="sec10" className={`rounded-2xl border transition-all scroll-mt-20 overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => toggleSection('sec10')}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer select-none ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-500/10 text-slate-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                10) Kullanılan Kaynaklar & İleri Okuma
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${
              isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}>
              {sectionOpen.sec10 ? 'Açık' : 'Kapalı'}
            </span>
            {sectionOpen.sec10 ? (
              <ChevronUp className="w-5 h-5 text-slate-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>

        {sectionOpen.sec10 && (
          <div className="p-5 sm:p-6 pt-0 space-y-3 border-t border-slate-100 dark:border-slate-800/80">
            <div className="space-y-2.5 pt-2">
              {protocol.references.map((ref, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{ref.authors}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {ref.year}
                    </span>
                  </div>
                  <div className="italic text-slate-700 dark:text-slate-300">
                    "{ref.title}"
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {ref.journal}
                  </div>
                  <div className="text-[11px] text-indigo-600 dark:text-indigo-400 pt-1 font-medium">
                    → {ref.relevance}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* EKG Büyütme Modalı (Lightbox) */}
      {selectedEcgItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4"
          onClick={() => setSelectedEcgItem(null)}
        >
          <div
            className={`w-full max-w-3xl rounded-2xl border p-5 space-y-4 shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm sm:text-base font-extrabold">{selectedEcgItem.rhythmName}</span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  selectedEcgItem.shockable
                    ? 'bg-red-500/15 text-red-600 dark:text-red-300 border border-red-500/30'
                    : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                }`}>
                  {selectedEcgItem.badge}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEcgItem(null)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Kapat
              </button>
            </div>

            <div className="rounded-xl bg-white border border-slate-300 p-3 sm:p-4">
              <img
                src={selectedEcgItem.imagePath}
                alt={`${selectedEcgItem.rhythmName} Büyütülmüş EKG`}
                referrerPolicy="no-referrer"
                className="w-full max-h-64 object-contain mx-auto"
              />
            </div>

            <div className="space-y-1.5 text-xs leading-relaxed">
              <p>
                <strong>EKG Bulgusu: </strong>
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{selectedEcgItem.ecgFeatures}</span>
              </p>
              <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>{selectedEcgItem.caption}</p>
              <p className="text-[11px] font-mono text-slate-400 pt-1">
                Kaynak: {selectedEcgItem.sourceLicense}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
