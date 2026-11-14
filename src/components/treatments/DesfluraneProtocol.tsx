import React, { useState, useId } from 'react';
import {
  Wind,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Info,
  Clock,
  Stethoscope,
  Flame,
  Zap,
  Gauge,
  Brain,
  HeartPulse,
  Droplet,
  ChevronDown,
  ChevronUp,
  Leaf,
  Thermometer,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  ContraindicationsGridBlock,
  DrugReferencesAndInteractionsBlock,
  HighAlertSafetyBlock,
  MechanismOfActionBlock,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
} from './shared/DrugMonographBlocks';

interface Props {
  isDark: boolean;
}

type ActiveCalcTab = 'mac_titration' | 'consumption';

/**
 * Mapleson (1996) yaşa bağlı MAC denklemi + pediatrik değerler (Taylor & Lerman, Anesthesiology 1991)
 */
function calculateAgeAdjustedDesMac(ageYears: number, isPregnant: boolean): number {
  let baseMac: number;
  if (ageYears < 0.083) {
    // Yenidoğan (<1 ay)
    baseMac = 9.2;
  } else if (ageYears < 1.0) {
    // 6–12 ay (MAC pik ~%9.9–10.0)
    baseMac = 9.9;
  } else if (ageYears < 3.0) {
    baseMac = 8.7;
  } else {
    baseMac = 6.0 * Math.pow(10, -0.00269 * (ageYears - 40));
  }
  if (isPregnant) {
    baseMac *= 0.72;
  }
  return baseMac;
}

export const DesfluraneProtocol: React.FC<Props> = ({ isDark }) => {
  const [activeCalcTab, setActiveCalcTab] = useState<ActiveCalcTab>('mac_titration');

  // 1. MAC & EtDes Hesaplayıcı State'leri
  const [ageYears, setAgeYears] = useState<number>(40);
  const [n2oPercent, setN2oPercent] = useState<number>(0);
  const [opioidSparing, setOpioidSparing] = useState<'none' | 'fentanyl_mod' | 'remifentanil_low' | 'remifentanil_high'>('fentanyl_mod');
  const [tempCelsius, setTempCelsius] = useState<number>(36.5);
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [targetMacMultiple, setTargetMacMultiple] = useState<number>(1.0);

  // 2. Sıvı Tüketimi & Çevresel Karbon Ayak İzi (GWP100 = 2540)
  const [fgfLpm, setFgfLpm] = useState<number>(0.8);
  const [dialPercent, setDialPercent] = useState<number>(5.0);
  const [caseHours, setCaseHours] = useState<number>(2.0);

  const [pkOpen, setPkOpen] = useState<boolean>(true);

  const ageInputId = useId();
  const n2oSelectId = useId();
  const opioidSelectId = useId();
  const tempInputId = useId();
  const macTargetId = useId();
  const fgfInputId = useId();
  const dialInputId = useId();
  const hoursInputId = useId();

  // --- HESAPLAMALAR ---
  const ageMac = calculateAgeAdjustedDesMac(ageYears, isPregnant);
  const tempFactor = Math.max(0.5, 1 + (tempCelsius - 37.0) * 0.05);
  const tempAdjustedMac = ageMac * tempFactor;

  const n2oMacContribution = n2oPercent / 104;
  const opioidMultiplier =
    opioidSparing === 'none'
      ? 1.0
      : opioidSparing === 'fentanyl_mod'
        ? 0.75
        : opioidSparing === 'remifentanil_low'
          ? 0.65
          : 0.50;

  const requiredDesMacFraction = Math.max(0.2, targetMacMultiple * opioidMultiplier - n2oMacContribution);
  const targetEtDesPercent = Math.max(1.0, tempAdjustedMac * requiredDesMacFraction);
  const macAwakePercent = tempAdjustedMac * 0.34;
  const isSympatheticSpikeRisk = targetEtDesPercent >= 6.0;

  // Sıvı Desfluran (d = 1.465 g/mL, MW = 168.04 g/mol): 1 mL sıvı ≈ 209.7 mL buhar (20°C)
  const liquidMlPerHour = (fgfLpm * dialPercent * 600) / 209.7;
  const totalLiquidMl = liquidMlPerHour * caseHours;
  const totalGrams = totalLiquidMl * 1.465;
  // Desfluran GWP100 ≈ 2540 (çok yüksek sera gazı potansiyeli!)
  const co2eKg = (totalGrams / 1000) * 2540;
  // Araç sürüş eşdeğeri (~0.17 kg CO2/km ortalama binek araç)
  const equivalentCarKm = co2eKg / 0.17;

  const getReportText = () => {
    return [
      'DESFLURAN KLİNİK MONOGRAFİ RAPORU',
      `Hasta Yaşı: ${ageYears} yıl${isPregnant ? ' (Gebe)' : ''} | Vücut Isısı: ${tempCelsius.toFixed(1)} °C`,
      `1.0 MAC (Yaş+Isı Düzeltmeli): %${tempAdjustedMac.toFixed(2)} EtDes`,
      `Hedeflenen Anestezi Derinliği: ${targetMacMultiple.toFixed(2)} MAC | N₂O: %${n2oPercent} | Opioid: ${opioidSparing}`,
      `Önerilen End-Tidal Desfluran (EtDes): %${targetEtDesPercent.toFixed(2)}${isSympatheticSpikeRisk ? ' (UYARI: ≥%6 Sempatik Stimülasyon & Hava Yolu İrritasyon Riski!)' : ''}`,
      `MAC-Awake (~0.34 MAC): %${macAwakePercent.toFixed(2)}`,
      `Sıvı Tüketimi (${fgfLpm} L/dk FGF @ %${dialPercent}): ${liquidMlPerHour.toFixed(1)} mL/saat (${caseHours} saatte ${totalLiquidMl.toFixed(0)} mL = ${co2eKg.toFixed(0)} kg CO₂e ≈ ${equivalentCarKm.toFixed(0)} km araç sürüşü)`,
    ].join('\n');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-sky-500/30 shadow-xl shadow-sky-950/20 text-slate-100'
            : 'bg-white border-sky-200 shadow-lg shadow-sky-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
              <Wind className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-500/40 font-mono">
                  Volatil İnhalasyon Anesteziği · Mavi Kod
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: N01AB07
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                  SUPRANE · TEC 6 / D-VAPOR ZORUNLU
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Desfluran (desFLURANE)
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Tüm halojenli volatiller içinde <strong>en düşük kan/gaz çözünürlüğüne (0.42–0.45)</strong> ve yağ
                çözünürlüğüne sahip genel anestezik; uzun vakalarda ve morbid obezlerde çok hızlı uyanma sağlar.
                Ancak <strong>22.8 °C kaynama noktası</strong> nedeniyle ısıtmalı/basınçlı TEC-6 vaporizatör gerektirir,
                <strong>keskin kokuludur</strong> (inhalasyon indüksiyonunda kontrendike!) ve <strong>≥1 MAC hızlı artışta sempatik deşarj</strong> yapar.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Hızlı Parametre Kartı */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              MAC (40 Yaş · O₂)
            </span>
            <span className="text-sm font-black text-sky-600 dark:text-sky-400 block mt-0.5 font-mono tabular-nums">
              %6.0
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">N₂O %60 ile: ~%2.8</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Kan / Gaz Katsayısı
            </span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 block mt-0.5 font-mono tabular-nums">
              0.42 – 0.45
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">En hızlı uyanma profili</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Buhar Basıncı · Kaynama
            </span>
            <span className="text-sm font-black text-amber-600 dark:text-amber-400 block mt-0.5 font-mono tabular-nums">
              669 mmHg · 22.8°C
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">39°C / ~2 atm ısıtmalı TEC-6</span>
          </div>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              Hava Yolu İrritasyonu
            </span>
            <span className="text-sm font-black text-rose-700 dark:text-rose-300 block mt-0.5">
              YÜKSEK (&gt;%6)!
            </span>
            <span className="text-[10px] text-rose-500 dark:text-rose-400 block mt-0.5">İndüksiyonda YASAK</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Metabolizma &amp; CO Riski
            </span>
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 block mt-0.5 font-mono tabular-nums">
              %0.02 · En Yüksek CO
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Kuru absorbanda COHb!</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              Sera Gazı (GWP₁₀₀)
            </span>
            <span className="text-sm font-black text-amber-700 dark:text-amber-300 block mt-0.5 font-mono tabular-nums">
              2540 × CO₂
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400 block mt-0.5">Minimal akım şarttır</span>
          </div>
        </div>
      </section>

      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-hesaplayici', label: 'MAC & Karbon Ayak İzi' },
          { id: 'sec-pkpd', label: 'Fizikokimya & Sempatik Yanıt' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyonlar' },
          { id: 'sec-dozlar', label: 'Endikasyonlar & Klinik Kullanım' },
          { id: 'sec-uyumluluk', label: 'TEC-6 Vaporizatör & CO Toksisitesi' },
          { id: 'sec-organ', label: 'Böbrek / Karaciğer' },
          { id: 'sec-gebelik', label: 'Gebelik & Laktasyon' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Klinik Durumlar' },
          { id: 'sec-guvenlik', label: 'ISMP & MH Güvenliği' },
          { id: 'sec-kaynaklar', label: 'Kaynakça & Etkileşim' },
        ]}
      />

      {/* ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        sectionTitle="Etki Mekanizması & Moleküler Farmakodinamik"
        summary="Desfluran, izoflurandaki klor atomunun flor ile yer değiştirmesi sonucu (CHF₂–O–CHF–CF₃) elde edilmiş tam florlu halojenli metil etil eter genel anesteziğidir. Beyin ve omurilikteki iyonotropik reseptörler üzerinde inhibitör iletimi artırıp eksitatör iletimi baskılayarak genel anestezi sağlar; çok düşük kan/gaz katsayısı (0.42–0.45) sayesinde alveol-beyin dengesini diğer tüm volatillerden hızlı kurar."
        pillars={[
          {
            title: 'GABAₐ, Glisin & K₂P Kanal Modülasyonu',
            detail:
              'GABAₐ reseptörlerinde Cl⁻ akımını güçlendirerek kortikal hipnoz ve amnezi yaratır; spinal kordda Glisin reseptörleri ve iki-porlu potasyum (TREK-1/TASK) kanalları üzerinden motor nöron uyarılabilirliğini baskılar (MAC / immobilite).',
          },
          {
            title: 'Eksitatör Sinaptik İnhibisyon',
            detail:
              'Santral nikotinik ACh reseptörlerini (nAChR), NMDA glutamat reseptörlerini ve 5-HT₃ kanallarını baskılar; non-depolarizan kas gevşeticilerin etkisini belirgin biçimde potansiyalize eder.',
          },
          {
            title: 'TRPA1 / İrritan Reseptör & Sempatik Refleks',
            detail:
              'Keskin kokulu yapısı üst/alt hava yolu nosiseptif TRPA1 ve irritan C-lif reseptörlerini doğrudan uyarır; > 1 MAC (%6) hızlı artışlarda hem refleks laringospazmı hem de santral sempatik deşarjı (adrenalin/noradrenalin artışı) tetikler.',
          },
        ]}
      />

      {/* 2. İNTERAKTİF MAC & KARBON AYAK İZİ HESAPLAYICISI */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border space-y-5 ${
          isDark ? 'bg-slate-900/95 border-sky-500/30 shadow-xl' : 'bg-white border-sky-200 shadow-lg'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                İnteraktif Yaş-Düzeltmeli MAC &amp; Karbon Ayak İzi Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                EtDes hedefleme, sempatik pik/laringospazm eşiği uyarısı (≥%6) ve düşük akımla CO₂e tasarruf analizi
              </p>
            </div>
          </div>

          <MonographCopyButton isDark={isDark} getText={getReportText} />
        </div>

        <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCalcTab('mac_titration')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTab === 'mac_titration'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1. Yaş &amp; Opioid Düzeltmeli EtDes (MAC)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCalcTab('consumption')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTab === 'consumption'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>2. Şişe Tüketimi &amp; Sera Gazı (GWP₁₀₀ = 2540)</span>
          </button>
        </div>

        {activeCalcTab === 'mac_titration' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor={ageInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hasta Yaşı (Yıl)
                </label>
                <input
                  id={ageInputId}
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={ageYears}
                  onChange={(e) => setAgeYears(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label htmlFor={n2oSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Eş Zamanlı N₂O (%)
                </label>
                <select
                  id={n2oSelectId}
                  value={n2oPercent}
                  onChange={(e) => setN2oPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                >
                  <option value={0}>%0 N₂O (O₂ / Hava)</option>
                  <option value={50}>%50 N₂O (+0.48 MAC)</option>
                  <option value={60}>%60 N₂O (+0.58 MAC)</option>
                  <option value={70}>%70 N₂O (+0.67 MAC)</option>
                </select>
              </div>

              <div>
                <label htmlFor={opioidSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Opioid MAC-Sparing
                </label>
                <select
                  id={opioidSelectId}
                  value={opioidSparing}
                  onChange={(e) => setOpioidSparing(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                >
                  <option value="none">Opioid Yok (Saf Volatil)</option>
                  <option value="fentanyl_mod">Standart Fentanil (~%25↓)</option>
                  <option value="remifentanil_low">Düşük Remifentanil (~%35↓)</option>
                  <option value="remifentanil_high">Yüksek Remifentanil (~%50↓)</option>
                </select>
              </div>

              <div>
                <label htmlFor={tempInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Vücut Isısı (°C)
                </label>
                <input
                  id={tempInputId}
                  type="number"
                  min={28}
                  max={40}
                  step={0.5}
                  value={tempCelsius}
                  onChange={(e) => setTempCelsius(Math.max(28, Math.min(40, Number(e.target.value) || 36.5)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label htmlFor={macTargetId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hedef Toplam MAC
                </label>
                <select
                  id={macTargetId}
                  value={targetMacMultiple}
                  onChange={(e) => setTargetMacMultiple(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                >
                  <option value={0.7}>0.7 MAC (Hafif / Yaşlı)</option>
                  <option value={1.0}>1.0 MAC (Standart İdame)</option>
                  <option value={1.2}>1.2 MAC (Cerrahi İmmobilite)</option>
                  <option value={1.5}>1.5 MAC (Yüksek Uyaran)</option>
                </select>
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isPregnant}
                onChange={(e) => setIsPregnant(e.target.checked)}
                className="rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
              <span>Gebe Hasta (Terme yakın MAC ~%28–30 azalır)</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border ${isSympatheticSpikeRisk ? 'bg-rose-500/15 border-rose-500/40' : 'bg-sky-500/15 border-sky-500/30'}`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSympatheticSpikeRisk ? 'text-rose-700 dark:text-rose-300' : 'text-sky-700 dark:text-sky-300'}`}>
                  Hedeflenen EtDes (Monitör)
                </span>
                <span className={`text-3xl font-black font-mono tabular-nums mt-1 block ${isSympatheticSpikeRisk ? 'text-rose-700 dark:text-rose-300' : 'text-sky-700 dark:text-sky-300'}`}>
                  %{targetEtDesPercent.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 block">
                  {isSympatheticSpikeRisk
                    ? 'Dikkat: ≥%6! Kademeli (%1–2) artır ve opioid ile sempatik yanıtı körelt.'
                    : 'Sempatik hiperaktivite eşiğinin (%6) altında güvenli aralık.'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 block">
                  Yaş + Isı Düzeltmeli 1.0 MAC
                </span>
                <span className="text-2xl font-black font-mono tabular-nums text-teal-700 dark:text-teal-300 mt-1 block">
                  %{tempAdjustedMac.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  %100 O₂ içinde tek ajan MAC değeri
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  MAC-Awake (~0.34 MAC)
                </span>
                <span className="text-2xl font-black font-mono tabular-nums text-slate-800 dark:text-slate-100 mt-1 block">
                  %{macAwakePercent.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Düşük kan/gaz nedeniyle dakikalar içinde bu düzeye iner
                </span>
              </div>
            </div>
          </div>
        )}

        {activeCalcTab === 'consumption' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={fgfInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Taze Gaz Akımı — FGF (L/dk)
                </label>
                <input
                  id={fgfInputId}
                  type="number"
                  min={0.3}
                  max={10}
                  step={0.1}
                  value={fgfLpm}
                  onChange={(e) => setFgfLpm(Math.max(0.3, Math.min(10, Number(e.target.value) || 0.8)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Desfluranda 0.5–1.0 L/dk düşük akım esastır</span>
              </div>

              <div>
                <label htmlFor={dialInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Vaporizatör Kadran Ayarı (%)
                </label>
                <input
                  id={dialInputId}
                  type="number"
                  min={1}
                  max={18}
                  step={0.5}
                  value={dialPercent}
                  onChange={(e) => setDialPercent(Math.max(1, Math.min(18, Number(e.target.value) || 5.0)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label htmlFor={hoursInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ameliyat Süresi (Saat)
                </label>
                <input
                  id={hoursInputId}
                  type="number"
                  min={0.5}
                  max={16}
                  step={0.5}
                  value={caseHours}
                  onChange={(e) => setCaseHours(Math.max(0.5, Math.min(16, Number(e.target.value) || 2.0)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-sky-500/15 border border-sky-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-300 block">
                  Saatlik Sıvı Tüketimi
                </span>
                <span className="text-3xl font-black font-mono tabular-nums text-sky-700 dark:text-sky-300 mt-1 block">
                  {liquidMlPerHour.toFixed(1)} mL/saat
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 block">
                  1 mL sıvı Desfluran = 209.7 mL buhar (20°C)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 block">
                  Toplam Tüketim ({caseHours} sa)
                </span>
                <span className="text-3xl font-black font-mono tabular-nums text-teal-700 dark:text-teal-300 mt-1 block">
                  {totalLiquidMl.toFixed(0)} mL
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 block">
                  240 mL Suprane şişesinin %{(Math.min(100, (totalLiquidMl / 240) * 100)).toFixed(0)}'i
                </span>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 block">
                  Sera Gazı Yükü (GWP₁₀₀ = 2540)
                </span>
                <span className="text-3xl font-black font-mono tabular-nums text-rose-700 dark:text-rose-300 mt-1 block">
                  {co2eKg.toFixed(0)} kg CO₂e
                </span>
                <span className="text-[11px] text-rose-700 dark:text-rose-300 mt-1 block">
                  ≈ {equivalentCarKm.toFixed(0)} km araç sürüşüne eşdeğer karbon ayak izi!
                </span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 3. FİZİKOKİMYA, PK/PD VE SİSTEMİK ETKİLER (AKORDİYON) */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen(!pkOpen)}
          className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-500/5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Farmakokinetik, Fizikokimya &amp; Sempatik Hiperaktivite Fizyolojisi
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                En hızlı FA/FI oranı, sıfıra yakın metabolizma (%0.02), sempatik taşikardi ve bronş irritasyonu
              </p>
            </div>
          </div>
          {pkOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="p-5 pt-0 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase">
                  <tr>
                    <th className="py-2 pr-4">Parametre</th>
                    <th className="py-2 pr-4">Değer (Miller / Barash)</th>
                    <th className="py-2">Klinik Yorum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Kan / Gaz Partisyon Katsayısı</td>
                    <td className="py-2 pr-4 font-bold text-emerald-600 dark:text-emerald-400">0.42 – 0.45</td>
                    <td className="py-2 font-sans">Tüm halojenliler içinde en düşük → saniyeler/dakikalar içinde denge &amp; en hızlı uyanma</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Yağ / Gaz · Beyin / Kan</td>
                    <td className="py-2 pr-4 font-bold">18.7 – 27 · 1.3</td>
                    <td className="py-2 font-sans">Morbid obezitede ve 6–8 saatlik vakalarda yağda birikim minimal</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Kaynama Noktası · Buhar Basıncı</td>
                    <td className="py-2 pr-4 font-bold text-amber-600 dark:text-amber-400">22.8°C · 669 mmHg</td>
                    <td className="py-2 font-sans">Oda sıcaklığında kaynar! Isıtmalı &amp; basınçlı TEC-6/D-Vapor şarttır</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Metabolizma &amp; Compound A</td>
                    <td className="py-2 pr-4 font-bold">%0.02 · Compound A Yok</td>
                    <td className="py-2 font-sans">Trifloroasetik asit (TFA) ve F⁻ oluşumu pratik olarak sıfırdır</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-rose-50/60 border-rose-200'}`}>
                <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 mb-1">
                  <Wind className="w-4 h-4" />
                  <span>Solunum &amp; Hava Yolu</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Keskin (pungent) kokulu ve şiddetli hava yolu irritanıdır!</strong> &gt; 1 MAC (%6) ve ani artışlar öksürük, nefes tutma, <strong>laringospazm</strong> ve <strong>bronkospazmı</strong> tetikler. İntraoperatif bronkospazm gelişirse Desfluran derhal kapatılıp Sevofluran veya Propofole geçilmelidir.
                </p>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-amber-50/60 border-amber-200'}`}>
                <span className="font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                  <HeartPulse className="w-4 h-4" />
                  <span>Kardiyovasküler &amp; Sempatik Pik</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  SVR'yi doza bağımlı düşürür (MAP↓). Ancak konsantrasyon <strong>&gt; 1 MAC (%6) üzerine hızla çıkarılırsa</strong> trakeal/pulmoner reseptör uyarısıyla geçici <strong>sempatik hiperaktivite (KTA↑↑, OAB↑↑, plazma adrenalin↑)</strong> oluşur. Önlemek için %1–2 kademeli artırın veya opioid/esmolol ekleyin.
                </p>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-indigo-50/60 border-indigo-200'}`}>
                <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
                  <Brain className="w-4 h-4" />
                  <span>Serebral &amp; Kas Gevşetici Potansiyalizasyon</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  CMRO₂ düşürür ancak İzofluran/Sevoflurana göre beyin damarlarında biraz daha fazla vazodilatasyon yapar (KİB artışı riski yüksek olgularda &lt; 0.8–1.0 MAC veya TIVA tercih edilir). Non-depolarizan NMB'lerin etkisini belirgin potansiyalize eder.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE) */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Malign Hipertermi (MH) bilinen veya şüphelenilen genetik yatkınlık (RYR1/CACNA1S mutasyonu, aile öyküsü).',
          'İnhalasyon (maske) indüksiyonu (pediatri ve erişkinlerde yüksek laringospazm/bronkospazm/apne insidansı nedeniyle kontrendikedir).',
          'Önceki halojenli anesteziklere bağlı immün hepatit veya ciddi aşırı duyarlılık öyküsü.',
        ]}
        relativeItems={[
          'Astım, KOAH alevlenmesi, aktif bronkospazm veya üst solunum yolu enfeksiyonu olan reaktif hava yolu (bronkospazmı tetikleyebilir!).',
          'Ciddi koroner arter hastalığı, kontrolsüz hipertansiyon, kritik aort stenozu veya intrakraniyal anevrizma (hızlı artışta oluşan sempatik taşikardi/hipertansiyon krizi nedeniyle).',
          'Ağır KİBAS / intrakraniyal kitle (serebral vazodilatasyon ile KİB artırabilir).',
        ]}
        clinicalNote="İntraoperatif bronkospazm veya yüksek Ppeak gelişen bir hastada Desfluran konsantrasyonunu artırarak anesteziyi derinleştirmeye çalışmak bronkospazmı daha da şiddetlendirir — derhal Propofol veya Sevoflurana geçin."
      />

      {/* 4. ENDİKASYONLAR & KLİNİK DOZAJ */}
      <section
        id="sec-dozlar"
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Stethoscope className="w-5 h-5 text-sky-600 dark:text-sky-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Klinik Endikasyonlar, Doz Titrasyonu ve LMA / ETT Ayrımı
          </h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold">
              <tr>
                <th className="p-3">Klinik Senaryo</th>
                <th className="p-3">Hedeflenen EtDes / Kadran</th>
                <th className="p-3">Titrasyon Hızı &amp; FGF</th>
                <th className="p-3">Klinik Strateji</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Morbid Obezite (Bariatrik Cerrahi)</td>
                <td className="p-3 font-mono font-bold text-sky-600 dark:text-sky-400">0.7 – 1.0 MAC (%4.0 – %6.0)</td>
                <td className="p-3 font-mono">0.5 – 1.0 L/dk · Kademeli artış</td>
                <td className="p-3">Yağ/gaz katsayısı 18.7 olduğu için ekstübasyon ve hava yolu reflekslerinin dönüşü Propofol/İzoflurana göre belirgin hızlıdır.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Uzun Süreli Cerrahi İdamesi (ETT ile)</td>
                <td className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400">%3.5 – %5.5 (+ Opioid)</td>
                <td className="p-3 font-mono">0.5 – 0.8 L/dk (Minimal Akım)</td>
                <td className="p-3">Yalnızca IV indüksiyon ve entübasyon tamamlandıktan sonra başlanmalıdır; doku birikimi minimaldir.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">LMA / Supraglottik Hava Yolu ile Kullanım</td>
                <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">&lt; %5.0 – %6.0 (Opioid ile)</td>
                <td className="p-3 font-mono">Yavaş %1'lik basamaklarla artır</td>
                <td className="p-3">Spontan solunumda &gt;%6 irritasyonla öksürük/laringospazm riskini artırır; LMA'da Sevofluran genelde daha sorunsuzdur.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Maske / İnhalasyon İndüksiyonu</td>
                <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">KONTRENDİKE</td>
                <td className="p-3 font-mono">—</td>
                <td className="p-3">Özellikle çocuklarda %50'ye varan laringospazm, öksürük ve desatürasyon riski nedeniyle asla kullanılmaz!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. TEC-6 VAPORİZATÖR & KARBONMONOKSİT (CO) RİSKİ */}
      <section
        id="sec-uyumluluk"
        className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Thermometer className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            TEC-6 / D-Vapor Teknolojisi, Kurumuş Absorban &amp; Karbonmonoksit (CO) Tehlikesi
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-sky-50/50 border-sky-200'}`}>
            <span className="font-bold text-sky-700 dark:text-sky-300 block mb-1">
              1. Isıtmalı &amp; Basınçlı Vaporizatör Zorunluluğu
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Desfluran 22.8 °C'de kaynar; buhar basıncı 20 °C'de 669 mmHg'dir (1 atm'ye çok yakın). Bu nedenle hazneyi <strong>39 °C'ye ısıtıp ~1500 mmHg (2 atm) basınç altında</strong> regüle ederek elektronik olarak enjekte eden TEC-6 / D-Vapor kullanır. <strong>Elektrik kesilirse 10–15 sn içinde kapanır!</strong>
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-rose-50/50 border-rose-200'}`}>
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">
              2. Kurumuş Absorban = Masif Karbonmonoksit (CO) Üretimi!
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Desfluran, CHF₂ grubunun tamamen kurumuş kuvvetli baz içeren soda lime/Baralyme ile reaksiyonu sonucu <strong>tüm anestezikler içinde en yüksek miktarda CO</strong> üretir (Desfluran &gt; Enfluran &gt; İzofluran &gt;&gt; Sevofluran). İlk vaka, hafta sonu unutulmuş açık O₂ akımı sonrası yüksek COHb gelişebilir!
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-amber-50/50 border-amber-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">
              3. Yüksek Rakım (İrtifa) Etkisi
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              Standart variable-bypass vaporizatörler (Sevofluran) yüksek rakımda kısmi basıncı korurken, TEC-6 kadranı <strong>yüzde (%) hacim fraksiyonu</strong> verir. Yüksek rakımda (düşük barometrik basınçta) aynı parsiyel basıncı (MAC) korumak için kadran % ayarı yukarı çekilmelidir.
            </p>
          </div>
        </div>
      </section>

      {/* 7. BÖBREK & KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Böbrek yetmezliğinde %0.02 metabolizma ve Compound A oluşumu olmadığı için güvenle kullanılır."
        renalDetails={[
          'İnorganik florür (F⁻) düzeyi yükselmez; düşük akımla (0.5 L/dk) dahi Compound A üretmez.',
          'Son dönem KBY ve diyaliz hastalarında hızlı uyanma avantajıyla ideal idame volatilidir.',
        ]}
        hepaticSummary="Karaciğerde pratik olarak metabolize olmaz (%0.02); hepatik kan akımını korur."
        hepaticDetails={[
          'TFA hapten oluşumu diğer tüm halojenlilerden en düşüktür; volatil ilişkili hepatit riski teorik düzeydedir.',
          'Siroz ve karaciğer transplantasyonunda hızlı nörolojik derlenme sağlayarak postoperatif ensefalopati ayrımını kolaylaştırır.',
        ]}
      />

      {/* 8. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Gebelikte MAC %28–30 azalır; diğer halojenliler gibi > 1 MAC'ta uterin relaksasyon yapar."
        pregnancyDetails={[
          'Yüksek dozda (> 1.0 MAC) uterin kontraktiliteyi baskılayıp postpartum kanamayı artırabileceğinden sezaryende 0.5–0.75 MAC ile sınırlanır.',
          'Hızlı kan/gaz atılımı nedeniyle acil obstetrik cerrahi sonrası anne hızlı uyanır.',
        ]}
        lactationSummary="Akciğerlerden hızla atıldığı için emzirmeye hemen dönülebilir ('pump & dump' gerekmez)."
        lactationDetails={[
          'Sistemik metabolit ve süte geçiş ihmal edilebilir düzeydedir.',
          'Anne uyanıp klinik olarak stabil olduğunda emzirme güvenle sürdürülür.',
        ]}
      />

      {/* ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS) */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Şiddetli Hava Yolu İrritasyonu & Laringospazm',
            incidenceOrSeverity: '%30–50 (İndüksiyonda)',
            detail:
              'Keskin kokusu öksürük, nefes tutma, hipersalivasyon, laringospazm ve bronkospazmı tetikler. Spontan soluyan hastalarda > %6 (1 MAC) düzeyinde hava yolu reaktivitesi dramatik artar.',
            tone: 'rose',
          },
          {
            title: 'Akut Sempatik Hiperaktivite & Taşikardi',
            incidenceOrSeverity: '> 1 MAC Hızlı Artışta',
            detail:
              'Konsantrasyon %6 üzerine hızla çıkarıldığında plazma adrenalin/noradrenalin ~2–3 kat yükselir; ciddi taşikardi, hipertansiyon ve KAH hastalarında miyokardiyal iskemi tetiklenebilir.',
            tone: 'rose',
          },
          {
            title: 'Masif Karbonmonoksit (CO) Zehirlenmesi',
            incidenceOrSeverity: 'Kuru Absorbanda Maks',
            detail:
              'Tamamen kurumuş soda lime/Baralyme ile tüm volatiller içinde en fazla CO üretir. Standart SpO₂ %98–100 yalancı normal görünürken ağır COHb gelişebilir.',
            tone: 'amber',
          },
          {
            title: 'Doza Bağımlı Hipotansiyon & SVR Düşüşü',
            incidenceOrSeverity: 'Sık (Doza Bağımlı)',
            detail:
              'Arteryel vazodilatasyonla SVR ve MAP düşer; yavaş artışta kalp hızı refleks olarak artabilir veya stabil kalır, derin hipovolemide ağır hipotansiyon yapar.',
            tone: 'amber',
          },
          {
            title: 'Solunum Depresyonu & Hiperkapni',
            incidenceOrSeverity: 'Doza Bağımlı',
            detail:
              'Tidal volümü düşürür, solunum sayısını artırır ancak dakika ventilasyonu azalır; PaCO₂ yükselir ve hipoksik solunum yanıtını baskılar.',
            tone: 'indigo',
          },
          {
            title: 'KİB Artışı Potansiyeli',
            incidenceOrSeverity: '> 0.8–1.0 MAC',
            detail:
              'Serebral vazodilatasyon yaparak intrakraniyal basıncı (KİB) artırabilir; İzofluran/Sevoflurana göre serebral damar direncini daha fazla düşürebilir.',
            tone: 'indigo',
          },
          {
            title: 'Malign Hipertermi (MH)',
            incidenceOrSeverity: 'Nadir / Fatal',
            detail:
              'Tüm halojenli volatil eterler gibi yatkın hastalarda (RYR1/CACNA1S) fulminan hipermetabolik MH krizini tetikler; derhal kapatılıp Dantrolen başlanmalıdır.',
            tone: 'rose',
          },
          {
            title: 'Postoperatif Bulantı-Kusma (PONV)',
            incidenceOrSeverity: '%20–30',
            detail:
              'Diğer volatil ajanlarla benzer oranda PONV riski taşır; çok hızlı uyanma nedeniyle erken postoperatif ağrı da eşzamanlı hızla ortaya çıkar (multimodal analjezi gerekir).',
            tone: 'teal',
          },
        ]}
      />

      {/* KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'İnhalasyon İndüksiyonu Kesin Kontrendikedir',
            detail:
              'Desfluranla asla maske indüksiyonu yapılmamalıdır. Daima IV indüksiyon ve trakeal entübasyon sonrasında idame ajanı olarak başlanmalı; LMA ile kullanılacaksa opioid eşliğinde ve < %6 düzeyinde yavaş titre edilmelidir.',
          },
          {
            title: 'Sempatik Pikten Korunma (Kademeli Titrasyon)',
            detail:
              'Cerrahi uyaran öncesi anesteziyi derinleştirirken kadranı bir anda %10–12’ye açmayın; %1–2’lik basamaklarla artırın veya IV Fentanil / Remifentanil / Propofol / Esmolol ile sempatik yanıtı köreltin.',
          },
          {
            title: 'İntraoperatif Bronkospazm Tuzağı',
            detail:
              'Wheezing veya Ppeak artışı gelişen hastada Desfluran konsantrasyonunu yükseltmek irritasyonu artırarak spazmı kötüleştirir! Derhal Desfluranı kapatıp Sevofluran veya IV Propofole geçin.',
          },
          {
            title: 'TEC-6 / D-Vapor Elektrik Kesintisi & İrtifa Etkisi',
            detail:
              'Isıtmalı elektronik vaporizatör elektrik kesilirse 10–15 saniye içinde gaz akışını keser (farkındalık riski!). Yüksek rakımda (düşük barometrik basınçta) aynı parsiyel basıncı (MAC) korumak için kadran % değeri yukarı ayarlanmalıdır.',
          },
          {
            title: 'Sabah İlk Vaka & Kuru Absorban CO Riski',
            detail:
              'Hafta sonu boyunca O₂ akışı açık unutulmuş kurumuş absorbanda Desfluran yüksek CO oluşturur. Açıklanamayan metabolik asidoz veya pembemsi ciltte CO-oksimetri ile COHb bakılmalı ve absorban derhal yenilenmelidir.',
          },
          {
            title: 'Çok Hızlı Uyanma & Erken Postoperatif Ağrı Yönetimi',
            detail:
              'Desfluran kesildikten dakikalar içinde elimine olur; uzun etkili analjezik (morfin/parasetamol/blok) eklenmeden uyandırılırsa ekstübasyonda şiddetli ağrı, ajitasyon ve hipertansiyon gelişebilir. Çevreyi korumak için mutlaka ≤ 0.5–1.0 L/dk düşük akım kullanılmalıdır.',
          },
        ]}
      />

      {/* 9. ISMP GÜVENLİK & MH KURTARMA */}
      <HighAlertSafetyBlock
        isDark={isDark}
        tallManName="desFLURANE"
        confusionRiskWith="sevoFLURANE / isoFLURANE"
        criticalAlerts={[
          'Sadece Mavi kodlu Desfluran şişesi ve elektrikle ısıtmalı TEC-6 / D-Vapor dolum portuna bağlanır; standart vaporizatöre ASLA doldurulmaz (oda sıcaklığında kaynayıp ölümcül aşırı doz ve patlama/basınç hasarı yapar!).',
          'CO zehirlenmesi şüphesinde standart puls oksimetre SpO₂\'yi %98–100 yalancı normal gösterir; mutlaka CO-oksimetreli AKG alın ve absorbanı derhal değiştirin.',
          'Malign Hipertermi şüphesinde vaporizatörü derhal kapat/çıkar, %100 O₂ 10–15 L/dk yıka, aktif kömür filtresi tak ve Dantrolen 2.5 mg/kg IV başlat.',
        ]}
        antidoteOrRescue="Aşırı dozda vaporizatörü kapatıp %100 O₂ yüksek akımla hızlı yıkama yapın (düşük kan/gaz katsayısı nedeniyle dakikalar içinde elimine olur). Sempatik taşikardi/hipertansiyon krizinde Esmolol veya Fentanil/Remifentanil ile küntleştirin."
      />

      {/* 10. KAYNAKÇA & ETKİLEŞİMLER */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Desfluran"
        references={[
          {
            authors: 'Ebert TJ, Muzi M',
            title: 'Sympathetic hyperactivity during desflurane anesthesia in healthy volunteers. A comparison with isoflurane.',
            journal: 'Anesthesiology',
            year: 1993,
            pmid: '8363068',
            note: 'Desfluranın >1 MAC hızlı artışlarında tetiklediği sempatik hiperaktivite (~2.5× SNA artışı), taşikardi ve hipertansiyon mekanizması.',
          },
          {
            authors: 'Taylor RH, Lerman J',
            title: 'Minimum alveolar concentration of desflurane and hemodynamic responses in neonates, infants, and children.',
            journal: 'Anesthesiology',
            year: 1991,
            note: 'Pediatrik yaş gruplarında Desfluran MAC değerleri (yenidoğan %9.16, 6–12 ay pik %9.92) ve hava yolu irritasyon riski.',
          },
          {
            authors: 'Fang ZX, Eger EI 2nd, Laster MJ, Chortkoff BS, Kandel L, Ionescu P',
            title: 'Carbon monoxide production from degradation of desflurane, enflurane, isoflurane, halothane, and sevoflurane by soda lime and Baralyme.',
            journal: 'Anesth Analg',
            year: 1995,
            pmid: '7762850',
            doi: '10.1097/00000539-199506000-00021',
            note: 'Kurumuş CO₂ absorbanı ile en yüksek karbonmonoksit üretiminin Desfluran ile gerçekleştiğini gösteren klasik çalışma.',
          },
          {
            authors: 'Gropper MA, Eriksson LI, Fleisher LA, et al.',
            title: "Miller's Anesthesia (Inhaled Anesthetics, TEC-6 Vaporizer & Environmental Impact). 9th–10th ed.",
            journal: 'Elsevier',
            year: 2024,
            note: 'Desfluran fizikokimyası, morbid obezitede hızlı derlenme ve sera gazı (GWP₁₀₀) yönetimi.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/desflurane.html"
        medscapeUrl="https://reference.medscape.com/drug/suprane-desflurane-343091"
      />
    </div>
  );
};

export default DesfluraneProtocol;
