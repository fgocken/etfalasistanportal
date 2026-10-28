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
  Copy,
  Check,
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
  FileText
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

type ActiveCalcTool = 'continuous_infusion' | 'rsi_bolus' | 'intranasal' | 'iv_pca' | 'transdermal_neuraxial';

export const FentanylProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKTİF HESAPLAYICI / REJİM SEÇİCİ ---
  const [activeCalcTool, setActiveCalcTool] = useState<ActiveCalcTool>('continuous_infusion');

  // --- GENEL HASTA VE DOZ STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [indication, setIndication] = useState<
    | 'acute_postop'
    | 'acute_nonop'
    | 'chronic_cancer'
    | 'icu_analgosedation'
    | 'light_procedural'
    | 'rsi_premed'
    | 'anesthesia_maint'
    | 'neuraxial'
    | 'custom'
  >('icu_analgosedation');

  // 1. Sürekli İnfüzyon Parametreleri
  const [prepType, setPrepType] = useState<'standard_10' | 'standard_20' | 'undiluted_50' | 'custom_prep'>('standard_10');
  const [customVialMcg, setCustomVialMcg] = useState<number>(500); // mcg
  const [customDiluentVolume, setCustomDiluentVolume] = useState<number>(50); // mL
  const [customConcInput, setCustomConcInput] = useState<number>(10); // mcg/mL
  const [doseUnit, setDoseUnit] = useState<'mcg_kg_hr' | 'mcg_hr' | 'mcg_kg_min'>('mcg_kg_hr');
  const [customDoseValue, setCustomDoseValue] = useState<number>(1.0); // girilen değer
  const [giveBolus, setGiveBolus] = useState<boolean>(false);
  const [bolusDoseMcgKg, setBolusDoseMcgKg] = useState<number>(1.0); // mcg/kg
  const [bolusDurationMin, setBolusDurationMin] = useState<number>(2); // dakika (en az 1-2 dk)
  const [infusionDurationHours, setInfusionDurationHours] = useState<number>(12); // saat

  // 2. RSI & IV Bolus Parametreleri
  const [rsiDoseMcgKg, setRsiDoseMcgKg] = useState<number>(2.0); // mcg/kg (1.5 - 3.0)
  const [rsiVialConc, setRsiVialConc] = useState<number>(50); // mcg/mL (standart ampul)

  // 3. İntranazal (IN) Parametreleri
  const [inDoseMcgKg, setInDoseMcgKg] = useState<number>(1.5); // mcg/kg (1.5 - 2.0)
  const [inConcentration, setInConcentration] = useState<number>(50); // mcg/mL saf ampul

  // 4. IV-PCA Parametreleri
  const [pcaBolusMcg, setPcaBolusMcg] = useState<number>(15); // mcg (10-20 mcg)
  const [pcaLockoutMin, setPcaLockoutMin] = useState<number>(6); // dakika (5-8 dk)
  const [pcaBasalMcgHr, setPcaBasalMcgHr] = useState<number>(0); // mcg/saat (opioid-naif hastada 0!)
  const [pcaMax4HrMcg, setPcaMax4HrMcg] = useState<number>(300); // mcg 4 saatlik limit

  // 5. Transdermal TTS & Nöroaksiyel Parametreleri
  const [oralMorphineDailyMg, setOralMorphineDailyMg] = useState<number>(60); // mg/gün

  // UI Durumları
  const [pkOpen, setPkOpen] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Benzersiz id'ler
  const weightInputId = useId();
  const indicationSelectId = useId();
  const prepSelectId = useId();
  const doseInputId = useId();
  const bolusCheckboxId = useId();
  const bolusDoseInputId = useId();
  const bolusDurationInputId = useId();
  const durationInputId = useId();
  const rsiDoseInputId = useId();
  const inDoseInputId = useId();
  const pcaBolusInputId = useId();
  const pcaLockoutInputId = useId();
  const pcaBasalInputId = useId();
  const morphineInputId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  let concentrationMcgMl = 10;
  if (prepType === 'standard_10') {
    concentrationMcgMl = 10; // 500 mcg / 50 mL
  } else if (prepType === 'standard_20') {
    concentrationMcgMl = 20; // 1000 mcg / 50 mL
  } else if (prepType === 'undiluted_50') {
    concentrationMcgMl = 50; // Saf ampul
  } else {
    concentrationMcgMl =
      customDiluentVolume > 0 && customVialMcg > 0
        ? customVialMcg / customDiluentVolume
        : customConcInput > 0
        ? customConcInput
        : 10;
  }

  // --- 8 AYRI KLİNİK ENDİKASYON PRESETLERİ ---
  const INDICATION_PRESETS = {
    acute_postop: {
      title: 'Akut Post-Operatif Ağrı',
      target: 'PACU ayılma ünitesinde veya serviste cerrahi sonrası orta-şiddetli ağrı kontrolü',
      route: 'IV Bolus Titrasyonu / IV-PCA',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 0.5,
      minDose: 0.3,
      maxDose: 1.0,
      bolusDefault: 0.5,
      note: '25-50 mcg aralıklı IV bolus veya IV-PCA (10-20 mcg/bolus, 6 dk lockout). Spontan solunum ve sedasyon skoru izlenir.'
    },
    acute_nonop: {
      title: 'Akut Non-Operatif Ağrı (Acil Servis / Travma)',
      target: 'Kırık, dislokasyon, yanık, politravma veya renal kolik ağrısında hızlı analjezi',
      route: 'IV Yavaş Bolus / İntranazal (IN)',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 0.5,
      minDose: 0.2,
      maxDose: 0.8,
      bolusDefault: 0.7,
      note: 'Damaryolu yoksa İntranazal (1.5-2 mcg/kg) hızlı uygulanabilir; damaryolu varsa 25-50 mcg yavaş IV titre edilir.'
    },
    chronic_cancer: {
      title: 'Kronik Ağrı & Kanser Ağrısı',
      target: 'Opioid-toleran onkoloji hastalarında sürekli bazal analjezi ve ani alevlenen ağrı yönetimi',
      route: 'Transdermal Flaster (TTS) & Oral Transmukozal (OTFC)',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 0.5,
      minDose: 0.2,
      maxDose: 1.5,
      bolusDefault: 0.5,
      note: 'YALNIZCA opioid-toleran olgularda 72 saatlik TTS flaster (12.5-100 mcg/sa). Alevlenen kanser ağrısında bukkal/sublingual pastil.'
    },
    icu_analgosedation: {
      title: 'Kritik Hastalarda Yoğun Bakımda Analjezi ve Sedasyon (ePAD)',
      target: 'Mekanik ventilatördeki kritik hastada konfor, adaptasyon ve analjezi (CPOT < 2, BPS < 5)',
      route: 'Sürekli IV İnfüzyon + Kurtarma Bolusları',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 1.0,
      minDose: 0.7,
      maxDose: 2.0,
      bolusDefault: 0.5,
      note: 'Önce analjezi (analgesia-first). Uzayan infüzyonda (>48 sa) yağda kümülasyon ve uyanma gecikmesi izlenmelidir.'
    },
    light_procedural: {
      title: 'Prosedüral Sedasyon ve Analjezi (PSA)',
      target: 'Kolonoskopi, bronkoskopi, kardiyoversiyon, redüksiyon veya girişimsel radyoloji',
      route: 'Aralıklı IV Bolus Titrasyonu',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 0.5,
      minDose: 0.3,
      maxDose: 0.8,
      bolusDefault: 0.5,
      note: 'Spontan solunumu koruyarak 25-50 mcg yavaş IV. Propofol veya midazolam ile sinerjiye dikkat, kapnografi şart.'
    },
    rsi_premed: {
      title: 'Hızlı Seri Entübasyonda (RSI) Premedikasyon',
      target: 'Laringoskopiye bağlı sempatik refleks taşikardi, hipertansiyon ve KİBAS fırlamasını baskılama',
      route: 'İndüksiyondan 3 Dk Önce Tek Doz IV Bolus',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 2.0,
      minDose: 1.5,
      maxDose: 3.0,
      bolusDefault: 2.0,
      note: 'İndüksiyon ajanı ve nöromüsküler blokerden 3 dakika önce 1.5 - 3.0 mcg/kg yavaş IV uygulanır (en az 1 dk).'
    },
    anesthesia_maint: {
      title: 'Genel Anestezi (İndüksiyon & İdame)',
      target: 'Dengeli anestezi veya TIVA protokolünde cerrahi stres yanıtını kesme',
      route: 'IV İndüksiyon Bolusu + Sürekli İnfüzyon / Ek Dozlar',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 2.0,
      minDose: 1.0,
      maxDose: 3.5,
      bolusDefault: 2.5,
      note: 'İndüksiyonda 2-5 mcg/kg IV; idame olarak 1-3.5 mcg/kg/saat infüzyon veya her 30-45 dakikada 25-50 mcg ek doz.'
    },
    neuraxial: {
      title: 'Nöroaksiyel Anestezi & Analjezi',
      target: 'Doğum eylemi epidural analjezisi, sezaryen ve ortopedik cerrahi spinal analjezisi',
      route: 'İntratekal (Spinal) / Epidural (PCEA)',
      unit: 'mcg_kg_hr' as const,
      defaultDose: 0.5,
      minDose: 0.2,
      maxDose: 1.0,
      bolusDefault: 0.3,
      note: 'İntratekal 10-25 mcg bupivakain ile; epidural 2 mcg/mL konsantrasyonda lokal anestezikle kombine PCEA.'
    },
    custom: {
      title: 'Özel / Titrasyon Rejimi',
      target: 'Klinisyenin belirlediği özel klinik protokol ve doğrudan doz girişi',
      route: 'Kullanıcı Tercihli',
      unit: doseUnit,
      defaultDose: customDoseValue,
      minDose: 0.1,
      maxDose: 10.0,
      bolusDefault: 1.0,
      note: 'Girdiğiniz değer doğrultusunda debi ve hesaplamalar anlık olarak oluşturulur.'
    }
  };

  const currentIndication = INDICATION_PRESETS[indication];

  const handleIndicationChange = (newInd: typeof indication) => {
    setIndication(newInd);
    if (newInd !== 'custom') {
      const preset = INDICATION_PRESETS[newInd];
      setDoseUnit(preset.unit);
      setCustomDoseValue(preset.defaultDose);
      setBolusDoseMcgKg(preset.bolusDefault);
    }
  };

  // --- İNFÜZYON HESAPLARI (mcg/kg/saat bazlı) ---
  let doseMcgKgHr = 1.0;
  if (doseUnit === 'mcg_kg_hr') {
    doseMcgKgHr = customDoseValue;
  } else if (doseUnit === 'mcg_hr') {
    doseMcgKgHr = weightKg > 0 ? customDoseValue / weightKg : 0;
  } else if (doseUnit === 'mcg_kg_min') {
    doseMcgKgHr = customDoseValue * 60;
  }

  const doseMcgHr = doseMcgKgHr * weightKg;
  const doseMcgKgMin = doseMcgKgHr / 60;
  const infusionRateMlHr = concentrationMcgMl > 0 ? doseMcgHr / concentrationMcgMl : 0;
  const microDropsPerMinute = infusionRateMlHr;

  // Yükleme Dozu Hesapları
  const totalBolusDoseMcg = giveBolus ? bolusDoseMcgKg * weightKg : 0;
  const totalBolusVolumeMl = concentrationMcgMl > 0 ? totalBolusDoseMcg / concentrationMcgMl : 0;
  const bolusPumpRateMlHr = bolusDurationMin > 0 ? (totalBolusVolumeMl / bolusDurationMin) * 60 : 0;

  // Tüketim Hesapları
  const consumption24HrMcg = doseMcgHr * 24 + (giveBolus ? totalBolusDoseMcg : 0);
  const consumption24HrMg = consumption24HrMcg / 1000;
  const vialsNeeded500mcg = consumption24HrMcg / 500;

  // Kümülasyon / CSHT
  let cshtEstimateMinutes = 30;
  let cshtWarningLevel: 'low' | 'moderate' | 'high' = 'low';
  let cshtWarningText = '';

  if (infusionDurationHours <= 2) {
    cshtEstimateMinutes = 30 + infusionDurationHours * 5;
    cshtWarningLevel = 'low';
    cshtWarningText = 'Kısa süreli infüzyon: Santral kompartmandan kas/yağ dokusuna redistribüsyon aktiftir. İnfüzyon kesilince uyanma 30-45 dakikada beklenir.';
  } else if (infusionDurationHours <= 8) {
    cshtEstimateMinutes = 60 + (infusionDurationHours - 2) * 20;
    cshtWarningLevel = 'moderate';
    cshtWarningText = 'Orta süreli infüzyon: Periferik doku depoları dolmaya başlamıştır. Bağlam duyarlı yarı ömür ~90-180 dakikaya çıkmıştır. Uyanmada belirgin gecikme olabilir.';
  } else {
    cshtEstimateMinutes = Math.min(360, 180 + (infusionDurationHours - 8) * 15);
    cshtWarningLevel = 'high';
    cshtWarningText = 'Uzamış infüzyon (>8-12 saat): Fentanil yüksek oranda yağ dokusunda kümüle olmuştur. Bağlam duyarlı yarı ömür 200-300+ dakikaya (4-6 saat) ulaşır. İnfüzyon kesildikten sonra ekstübasyon için saatlerce beklenmesi gerekebilir!';
  }

  // --- 2. RSI PREMEDİKASYON HESAPLARI ---
  const totalRsiDoseMcg = weightKg * rsiDoseMcgKg;
  const totalRsiVolumeMl = rsiVialConc > 0 ? totalRsiDoseMcg / rsiVialConc : 0;

  // --- 3. İNTRANAZAL (IN) HESAPLARI ---
  const totalInDoseMcg = weightKg * inDoseMcgKg;
  const totalInVolumeMl = inConcentration > 0 ? totalInDoseMcg / inConcentration : 0;
  const inVolumePerNostrilMl = totalInVolumeMl / 2;

  // --- 4. IV-PCA HESAPLARI ---
  const pcaBolusMcgKg = weightKg > 0 ? pcaBolusMcg / weightKg : 0;
  const maxPossibleBolusPerHour = Math.floor(60 / pcaLockoutMin);
  const maxDosePerHourWithBasal = maxPossibleBolusPerHour * pcaBolusMcg + pcaBasalMcgHr;

  // --- 5. TRANSDERMAL (TTS) ÇEVRİMİ ---
  let estimatedTtsMcgHr = 25;
  if (oralMorphineDailyMg < 45) {
    estimatedTtsMcgHr = 12.5;
  } else if (oralMorphineDailyMg <= 90) {
    estimatedTtsMcgHr = 25;
  } else if (oralMorphineDailyMg <= 150) {
    estimatedTtsMcgHr = 50;
  } else if (oralMorphineDailyMg <= 210) {
    estimatedTtsMcgHr = 75;
  } else {
    estimatedTtsMcgHr = 100;
  }

  const handleCopySummary = () => {
    let summaryText = `KLİNİK FENTANİL DOZ PROTOKOLÜ ÖZETİ\n─────────────────────────────────────────────\n• Hasta Ağırlığı: ${weightKg} kg\n• Seçilen Endikasyon: ${currentIndication.title}\n• Uygulama Yolu: ${currentIndication.route}\n`;

    if (activeCalcTool === 'continuous_infusion') {
      summaryText += `• Mod: SÜREKLİ IV İNFÜZYON\n• Çözelti: ${
        prepType === 'standard_10'
          ? '500 mcg / 50 mL SF (10 mcg/mL)'
          : prepType === 'standard_20'
          ? '1000 mcg / 50 mL SF (20 mcg/mL)'
          : prepType === 'undiluted_50'
          ? '50 mcg/mL (Saf)'
          : `${concentrationMcgMl.toFixed(1)} mcg/mL`
      }\n• İdame Dozu: ${doseMcgKgHr.toFixed(2)} mcg/kg/saat (${doseMcgHr.toFixed(1)} mcg/saat)\n• Pompa Hızı: ${infusionRateMlHr.toFixed(2)} mL/saat\n• Öngörülen Süre: ${infusionDurationHours} saat (~${Math.round(cshtEstimateMinutes)} dk CSHT)\n• 24 Sa Tüketim: ~${consumption24HrMg.toFixed(2)} mg (~${Math.ceil(vialsNeeded500mcg)} ampul 500 mcg)\n`;
    } else if (activeCalcTool === 'rsi_bolus') {
      summaryText += `• Mod: HIZLI SERİ ENTÜBASYON (RSI) PREMEDİKASYONU\n• Doz: ${rsiDoseMcgKg} mcg/kg\n• Toplam Bolus: ${totalRsiDoseMcg.toFixed(1)} mcg (${totalRsiVolumeMl.toFixed(2)} mL - 50 mcg/mL ampul)\n• Uygulama Zamanı: İndüksiyon ajanından 3 dakika önce, en az 1-2 dakikaya yayılarak yavaş IV puşe.\n`;
    } else if (activeCalcTool === 'intranasal') {
      summaryText += `• Mod: İNTRANAZAL (IN) ANALJEZİ (MAD İLE)\n• Doz: ${inDoseMcgKg} mcg/kg\n• Toplam Doz: ${totalInDoseMcg.toFixed(1)} mcg\n• Uygulama Hacmi: ${totalInVolumeMl.toFixed(2)} mL (Her burun deliğine: ${inVolumePerNostrilMl.toFixed(2)} mL)\n• Cihaz: Mukozal Atomizasyon Cihazı (MAD) ile 50 mcg/mL saf ampul.\n`;
    } else if (activeCalcTool === 'iv_pca') {
      summaryText += `• Mod: İNTRAVENÖZ HASTA KONTROLLÜ ANALJEZİ (IV-PCA)\n• Talep Edilen Bolus: ${pcaBolusMcg} mcg (${pcaBolusMcgKg.toFixed(2)} mcg/kg)\n• Kilitli Kalma Süresi: ${pcaLockoutMin} dakika\n• Bazal İnfüzyon: ${pcaBasalMcgHr} mcg/saat ${pcaBasalMcgHr === 0 ? '(Opioid-naif için güvenli: Yok)' : ''}\n• 4 Saatlik Limit: ${pcaMax4HrMcg} mcg\n`;
    } else {
      summaryText += `• Mod: TRANSDERMAL (TTS) & NÖROAKSİYEL REHBERİ\n• Günlük Oral Morfin Eşdeğeri: ${oralMorphineDailyMg} mg/gün\n• Önerilen Başlangıç TTS Flaster: ${estimatedTtsMcgHr} mcg/saat (72 saatte bir değişim)\n• Spinal Doz: 10 - 25 mcg intratekal / Epidural: 2 mcg/mL solüsyon\n`;
    }

    summaryText += `─────────────────────────────────────────────\nUYARI: Fentanil yüksek potensli bir opioiddir (morfinden 80-100 kat güçlü). Hızlı puşede göğüs rijiditesi riski vardır; yatak başında her zaman Nalokson hazır bulundurulmalıdır.`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    });
  };

  return (
    <div className="space-y-6">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 1: BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                Altın Standart İlaç Monografisi
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Yüksek Potensli Sentetik Opioid
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Kırmızı Reçete · ISMP High-Alert
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Fentanil Sitrat (Fentanyl / Sublimaze)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Yüksek
              potensli, lipofilik, sentetik <strong>μ-opioid (MOR) reseptör agonistidir</strong> (4-anilinopiperidin derivesi).
              Analjezik gücü morfine göre yaklaşık <strong>80 – 100 kat</strong> daha yüksektir. Yüksek lipid çözünürlüğü
              sayesinde kan-beyin bariyerini saniyeler içinde aşar.
            </p>
          </div>
        </div>

        {/* Etki Mekanizması Açıklaması */}
        <div
          className={`mt-4 p-4 rounded-xl border leading-relaxed text-xs sm:text-sm ${
            isDark
              ? 'bg-rose-950/20 border-rose-900/50 text-rose-200'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Zap className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold text-sm block">Etki Mekanizması &amp; Farmakodinamik Karakteristikleri:</span>
              <p>
                Santral sinir sistemi, spinal kord arka boynuzu ve periferal nosiseptörlerdeki <strong>μ₁ ve μ₂ opioid reseptörlerine</strong> yüksek
                afiniteyle selektif olarak bağlanır. Gi/Go kenetli protein sinyal yolağı aracılığıyla adenilat siklaz enzimini
                inhibe eder ve hücre içi cAMP düzeyini düşürür. Eş zamanlı olarak voltaj bağımlı kalsiyum (Ca²⁺) kanallarını kapatır
                ve içe doğrultucu potasyum (K⁺) kanallarını aktive ederek nöronal hiperpolarizasyona yol açar.
              </p>
              <p className="text-xs opacity-90">
                • <strong>Nosiseptif Transmisyon Blokajı:</strong> Primer afferent sinir uçlarından P maddesi, glutamat ve CGRP
                gibi ağrı iletici nörotransmitterlerin salınımını presinaptik düzeyde güçlü şekilde durdurur. Postsinaptik
                düzeyde ise spinotalamik traktus nöronlarının uyarılabilirliğini söndürür.
              </p>
              <p className="text-xs opacity-90">
                • <strong>Kardiyovasküler Stabilite &amp; Histamin Üstünlüğü:</strong> Morfinden en önemli klinik üstünlüğü,
                terapötik dozlarda <em>histamin deşarjına yol açmamasıdır</em>. Bu sayede astımlı, bronkospastik ve hemodinamik
                açıdan instabil kritik yoğun bakım hastalarında vazodilatasyon ve bronkospazm riski morfine göre çok daha düşüktür.
              </p>
              <p className="text-xs opacity-90">
                • <strong>Lipofilisite ve Redistribüsyon:</strong> Yağda çözünürlüğü morfinden ~1000 kat fazladır. Tek bir IV
                bolus verildiğinde etki 1-2 dakikada başlar ve 30-60 dakikada sonlanır; bu hızlı sonlanmanın sebebi eliminasyon
                değil, ilacın beyinden hızla kas ve yağ dokusuna dağılmasıdır (redistribüsyon). Tekrarlayan dozlarda veya uzamış
                infüzyonlarda ise bu dokular doyar ve belirgin kümülasyon meydana gelir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 2: FARMAKOKİNETİK (AÇILIR-KAPANIR AKORDİYON) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
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
                Onset, peak, redistribüsyon, Vd, hepatik CYP3A4 metabolizması ve bağlam duyarlı yarı ömür dinamikleri
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
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 2 Dakika (IV)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  İntranazal: 5-10 dk; Transmukozal: 5-15 dk; Transdermal (TTS): 12-24 saatte kararlı düzey.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pik Etki (Peak Analjezi)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">3 – 5 Dakika (IV)</span>
                <p className="text-[11px] text-slate-500 mt-1">Maksimum solunum depresyonu 5-15 dakikada belirginleşir.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Etki Süresi (Tek Doz IV)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">30 – 60 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Santral kompartmandan kas/yağ dokusuna hızlı redistribüsyon ile klinik etki sonlanır.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">4.0 – 6.0 L/kg (Çok Geniş)</span>
                <p className="text-[11px] text-slate-500 mt-1">Yüksek lipofilik yapısı nedeniyle periferik yağ dokularında birikir.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Protein Bağlanması
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">%80 – %85</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Esas olarak α₁-asit glikoprotein ve albümine bağlanır. Asidozda serbest fraksiyon artar.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Bağlam Duyarlı t½ (CSHT)
                </span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono">
                  Süreye Bağlı: 30 dk ➔ 300 dk!
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  2 saatlik infüzyonda ~35 dk iken, uzayan infüzyonlarda (&gt;8 sa) doku doymasıyla 4-5 saate fırlar.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Hepatik Biyotransformasyon ve Eliminasyon Yolağı:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Karaciğer Sitokrom P450 (CYP3A4):</strong> Fentanil esas olarak karaciğerde CYP3A4 izoenzimi tarafından
                oksidatif N-dealkilasyona uğratılarak <em>Norfentanil</em>e dönüştürülür. Norfentanil analjezik açıdan inaktiftir ve toksik metabolit değildir.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>CYP3A4 İnhibitörleri ile Etkileşim:</strong> Klaritromisin, azol antifungaller (flukonazol, vorikonazol),
                diltiazem veya ritonavir gibi güçlü CYP3A4 inhibitörleri fentanil klerensini dramatik düşürerek
                ağır ve ölümcül solunum depresyonuna yol açabilir.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Ekskresyon:</strong> Dozun yaklaşık %75'i idrarla (çoğunlukla inaktif metabolitler, &lt;%10 değişmemiş ilaç),
                yaklaşık %10-20'si ise safra ve feçes yoluyla atılır.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 3: KONTRENDİKASYONLAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">Kontrendikasyonlar</h2>
            <p className="text-xs text-slate-500">Mutlak ve rölatif kontrendikasyonlar, MAOI ve opioid-naif riskleri</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Mutlak Kontrendikasyonlar */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/40 text-rose-200' : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Mutlak Kontrendikasyonlar:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-xs">
              <li>
                <strong>Fentanile veya Bileşenlerine Aşırı Duyarlılık:</strong> Anafilaksi veya bilinen aşırı duyarlılık öyküsü.
              </li>
              <li>
                <strong>Resüsitasyon / Havayolu Ekipmanı Olmayan Ortamlarda Şiddetli Solunum Depresyonu:</strong> Havayolu kontrolü
                ve mekanik ventilasyon imkanı bulunmayan klinik alanlarda kullanımı kesinlikle kontrendikedir.
              </li>
              <li>
                <strong>Akut Paralitik İleus veya Mekanik GIS Obstrüksiyonu:</strong> Peristaltizmi durdurarak perforasyona yol açabilir.
              </li>
              <li>
                <strong>MAO İnhibitörleri ile Eşzamanlı veya Son 14 Gün İçinde Kullanım:</strong> Ölümcül <em>Serotonin Sendromu</em>,
                koma, hiperpireksi ve şiddetli otonomik instabilite riski.
              </li>
              <li>
                <strong>Opioid-Naif Hastalarda Transdermal (TTS) Flaster Kullanımı:</strong> TTS flasterleri KESİNLİKLE sadece
                kronik opioid toleran hastalar içindir; opioid-naif olguda ölümcül apneye yol açar.
              </li>
            </ul>
          </div>

          {/* Rölatif Kontrendikasyonlar & Önlemler */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/40 text-amber-200' : 'bg-amber-50/80 border-amber-200 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-2 text-amber-600 dark:text-amber-400">
              <Info className="w-4 h-4 shrink-0" />
              <span>Rölatif Kontrendikasyonlar &amp; Önlemler:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-xs">
              <li>
                <strong>Kafa Travması ve Artmış İntrakraniyal Basınç (KİBAS):</strong> Solunum depresyonuna bağlı CO₂ retansiyonu,
                serebral vazodilatasyon yaparak intrakraniyal basıncı hızla yükseltir.
              </li>
              <li>
                <strong>Ağır KOAH, Amfizem ve Kor Pulmonale:</strong> Solunum dürtüsünü baskılayarak akut hiperkapnik solunum durmasına yol açabilir.
              </li>
              <li>
                <strong>Şiddetli Bradikardi ve İleti Blokları:</strong> Santral vagal stimülasyon ile KTA'yı daha da düşürebilir (Atropin hazır tutulmalıdır).
              </li>
              <li>
                <strong>Ağır Karaciğer Yetmezliği (Child-Pugh C):</strong> CYP3A4 klerensi çöker, eliminasyon saatlerce uzar.
              </li>
              <li>
                <strong>Safra Yolu Cerrahisi ve Biliyer Kolik:</strong> Oddi sfinkterinde belirgin spazm yaratabilir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 4: ENDİKASYONLAR VE OFF-LABEL KULLANIMLAR (8 KLİNİK ALAN) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-teal-500/10 text-teal-500">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Endikasyonlar ve Klinik Kullanım Alanları (8 Temel Alan)
            </h2>
            <p className="text-xs text-slate-500">
              Akut postoperatif, akut non-operatif, kronik/kanser ağrısı, YBÜ, PSA, RSI, genel anestezi ve nöroaksiyel analjezi
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          {/* 1. Akut Post-operatif Ağrı */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[10px]">1</span>
              <span>Akut Post-Operatif Ağrı</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              PACU ayılma ünitesinde cerrahi sonrası orta-şiddetli ağrının hızlı titrasyonu (25-50 mcg aralıklı IV bolus)
              veya yataklı serviste Hasta Kontrollü Analjezi (IV-PCA: 10-20 mcg/talep).
            </p>
          </div>

          {/* 2. Akut Non-operatif Ağrı */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px]">2</span>
              <span>Akut Non-Operatif Ağrı</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Acil servis ve prehospital alanda politravma, kemik kırıkları, yanık yaralanmaları ve şiddetli renal kolikte
              hızlı analjezi. Damaryolu yoksa Mukozal Atomizer (IN: 1.5-2 mcg/kg) ile iğnesiz uygulanır.
            </p>
          </div>

          {/* 3. Kronik Ağrı & Kanser Ağrısı */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[10px]">3</span>
              <span>Kronik Ağrı &amp; Kanser Ağrısı</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              YALNIZCA opioid-toleran hastalarda 72 saatte bir değiştirilen Transdermal (TTS) flaster (12.5-100 mcg/saat) ile
              bazal kontrol; ani alevlenen kanser ağrısında (BTcP) oral transmukozal (OTFC) pastil/film kullanımı.
            </p>
          </div>

          {/* 4. Kritik Hastalarda YBÜ Analgosedasyonu */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-[10px]">4</span>
              <span>Kritik Hastalarda YBÜ Analjezi &amp; Sedasyon</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Mekanik ventilasyondaki kritik hastalarda ePAD kılavuzları doğrultusunda "önce analjezi" (analgesia-first)
              hedefiyle sürekli IV infüzyon (0.7-2 mcg/kg/saat) veya hedef tabanlı aralıklı bolus protokolü.
            </p>
          </div>

          {/* 5. Prosedürel Sedasyon ve Analjezi */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-[10px]">5</span>
              <span>Prosedüral Sedasyon ve Analjezi (PSA)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Günübirlik cerrahi, kolonoskopi, bronkoskopi, kardiyoversiyon, kırık redüksiyonu ve girişimsel radyolojide
              propofol veya midazolam ile sinerjistik kombinasyonda 0.5-1 mcg/kg IV bolus titrasyonu.
            </p>
          </div>

          {/* 6. Hızlı Seri Entübasyonda Premedikasyon */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-[10px]">6</span>
              <span>Hızlı Seri Entübasyonda Premedikasyon</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              RSI indüksiyonu öncesi laringoskopi ve trakeal entübasyona bağlı sempatik deşarjı, taşikardi fırlamasını,
              akut tansiyon yükselmesini ve KİBAS artışını önlemek için 1.5-3.0 mcg/kg IV premedikasyon.
            </p>
          </div>

          {/* 7. Genel Anestezi */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[10px]">7</span>
              <span>Genel Anestezi (İndüksiyon &amp; İdame)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Dengeli anestezi indüksiyonunda 2-5 mcg/kg IV bolus; idamesinde 1-3.5 mcg/kg/saat infüzyon veya her 30-45 dk
              25-50 mcg ek doz. Kardiyak cerrahide 20-50 mcg/kg yüksek doz opioid anestezisi.
            </p>
          </div>

          {/* 8. Nöroaksiyel Anestezi */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px]">8</span>
              <span>Nöroaksiyel Anestezi &amp; Analjezi</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Spinal/intratekal blokta bupivakaine eklenen 10-25 mcg fentanil ile derin viseral analjezi; epidural doğum
              analjezisinde lokal anestezikle kombine 2 mcg/mL derişimde PCEA infüzyonu.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 5: UYGULAMA YOLLARI, ERİŞKİN VE PEDİATRİK DOZ REJİMLERİ */}
      {/* (Sürekli İnfüzyon Dışı Tüm Yollar Detaylandırılmıştır) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10 text-indigo-500">
            <Syringe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Uygulama Yolları ve Kapsamlı Doz Rejimleri (İnfüzyon Dışı Dahil)
            </h2>
            <p className="text-xs text-slate-500">
              IV bolus, IV-PCA, sürekli infüzyon, intranazal, transdermal flaster, transmukozal ve nöroaksiyel kılavuzları
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          {/* Çok Yollu Uygulama Kılavuz Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {/* 1. IV Bolus */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
              <span className="font-bold text-rose-600 dark:text-rose-400 block text-xs uppercase tracking-wider">
                1. İntravenöz (IV) Bolus &amp; Titrasyon
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-xs list-disc list-inside">
                <li><strong>Akut Postop / PACU:</strong> 25 – 50 mcg IV (0.5 – 1 mcg/kg), her 5-10 dk titre edilir.</li>
                <li><strong>Prosedürel Sedasyon (PSA):</strong> 0.5 – 1.0 mcg/kg (25 – 50 mcg) yavaş IV.</li>
                <li><strong>RSI Premedikasyonu:</strong> 1.5 – 3.0 mcg/kg IV (entübasyondan 3 dk önce, en az 1-2 dk yavaş puşe).</li>
                <li><strong>Pediatrik IV Bolus:</strong> 1.0 – 2.0 mcg/kg yavaş IV (yenidoğanda 0.5-1 mcg/kg).</li>
              </ul>
            </div>

            {/* 2. IV-PCA */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-xs uppercase tracking-wider">
                2. İntravenöz Hasta Kontrollü Analjezi (IV-PCA)
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-xs list-disc list-inside">
                <li><strong>Talep (Bolus) Dozu:</strong> 10 – 20 mcg (0.2 – 0.4 mL [50 mcg/mL]).</li>
                <li><strong>Kilit Süresi (Lockout):</strong> 5 – 8 dakika.</li>
                <li><strong>Bazal İnfüzyon:</strong> 0 mcg/saat (Opioid-naif olguda BAZAL AÇILMAZ! Yalnızca opioid-toleran olguda 10-20 mcg/sa).</li>
                <li><strong>4 Saatlik Maksimum Sınır:</strong> 300 – 400 mcg.</li>
              </ul>
            </div>

            {/* 3. İntranazal (IN) */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
              <span className="font-bold text-teal-600 dark:text-teal-400 block text-xs uppercase tracking-wider">
                3. İntranazal (IN) Mukozal Atomizasyon (MAD)
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-xs list-disc list-inside">
                <li><strong>Pediatrik Acil Analjezi:</strong> 1.5 – 2.0 mcg/kg tek doz (yanık, kırık, damaryolu yokluğu).</li>
                <li><strong>Erişkin Acil Ağrı:</strong> 50 – 100 mcg tek doz (konsantre 50 mcg/mL ampul ile).</li>
                <li><strong>Hacim Sınırı:</strong> Her burun deliğine maksimum 1.0 mL (yutulmayı önlemek için dozu iki deliğe bölün).</li>
              </ul>
            </div>

            {/* 4. Transdermal TTS */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
              <span className="font-bold text-amber-600 dark:text-amber-400 block text-xs uppercase tracking-wider">
                4. Transdermal Flaster (TTS - Durogesic)
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-xs list-disc list-inside">
                <li><strong>Dozajlar:</strong> 12.5, 25, 50, 75, 100 mcg/saat salınımlı flasterler.</li>
                <li><strong>Değişim Periyodu:</strong> 72 saatte bir (3 günde bir) temiz, kılsız cilde yapıştırılır.</li>
                <li><strong>Önemli Kural:</strong> Yalnızca Opiyoid-Toleran kronik kanser ağrısında! Akut ağrıda KESİNLİKLE KONTRENDİKE.</li>
                <li><strong>Isı/Ateş Uyarısı:</strong> Sıcak banyo, sauna ve yüksek ateş salınımı 3-4 katına çıkarıp apne yapabilir.</li>
              </ul>
            </div>

            {/* 5. Transmukozal / Bukkal */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
              <span className="font-bold text-purple-600 dark:text-purple-400 block text-xs uppercase tracking-wider">
                5. Oral Transmukozal &amp; Bukkal (OTFC)
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-xs list-disc list-inside">
                <li><strong>Endikasyon:</strong> Ani Alevlenen Kanser Ağrısı (Breakthrough Pain - BTcP).</li>
                <li><strong>Dozajlar:</strong> 100, 200, 400, 600, 800 mcg bukkal pastil / film.</li>
                <li><strong>Uygulama:</strong> Yanak mukozasına temas ettirilerek 15 dakikada emdirilir; çiğnenmez, yutulmaz.</li>
              </ul>
            </div>

            {/* 6. Nöroaksiyel */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs uppercase tracking-wider">
                6. Nöroaksiyel (Spinal &amp; Epidural)
              </span>
              <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-xs list-disc list-inside">
                <li><strong>İntratekal (Spinal):</strong> 10 – 25 mcg (0.2 – 0.5 mL) bupivakaine eklenir. Viseral analjezi ve 4-6 sa konfor sağlar.</li>
                <li><strong>Epidural / PCEA:</strong> 2 mcg/mL konsantrasyonda bupivakain/levobupivakain içinde doğum ve postop analjezisi.</li>
                <li><strong>Geç Solunum Depresyonu:</strong> Morfine göre lipofilik olduğu için rostral yayılımı azdır; ancak 4-12 saat takip gerekir.</li>
              </ul>
            </div>
          </div>

          {/* Geriatrik ve Obezite Kılavuzu */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20">
              <span className="font-bold text-xs text-amber-700 dark:text-amber-300 block mb-1">
                Geriatrik Popülasyon (&gt;65 Yaş):
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Karaciğer klerensi %30-50 düşer, beyin hassasiyeti belirgin artar. Tüm bolus ve infüzyon dozları{' '}
                <strong>%50 oranında azaltılmalı</strong>, aralıklar uzatılmalıdır.
              </p>
            </div>
            <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20">
              <span className="font-bold text-xs text-indigo-700 dark:text-indigo-300 block mb-1">
                Obezite ve Kilo Hesabı:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Fentanil yüksek lipofilik olsa da klerens santral kompartmanla ilişkilidir. Aşırı doz ve kümülasyonu önlemek için{' '}
                <strong>İdeal Vücut Ağırlığı (IBW)</strong> veya <strong>Yağsız Vücut Ağırlığı (LBW)</strong> esas alınmalıdır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 6: ⚡ ÇOK YOLLU İNTERAKTİF DOZ & HESAPLAYICI MODÜLÜ */}
      {/* (Kullanıcı Kuralı: Yalnızca IV infüzyon değil, çoklu klinik yollar) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-7 rounded-2xl border transition-all ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border-rose-900/40'
            : 'bg-gradient-to-br from-white via-rose-50/40 to-slate-50 border-rose-200 shadow-md'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-500 text-white shadow-sm">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                  Çok Yollu İnteraktif Fentanil Doz &amp; İnfüzyon Hesaplayıcısı
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400">
                  Çoklu Uygulama Yolu
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sürekli IV infüzyon, RSI premedikasyonu, İntranazal acil analjezi, IV-PCA ve Transdermal/Nöroaksiyel hesaplayıcı
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer self-start sm:self-auto ${
                copiedSummary
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300 shadow-2xs'
              }`}
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Protokol Kopyalandı' : 'Klinik Özeti Kopyala'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setWeightKg(70);
                handleIndicationChange('icu_analgosedation');
                setPrepType('standard_10');
                setGiveBolus(false);
                setInfusionDurationHours(12);
                setRsiDoseMcgKg(2.0);
                setInDoseMcgKg(1.5);
                setPcaBolusMcg(15);
              }}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              title="Varsayılan Değerlere Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Çoklu Uygulama Yolu Sekmeleri */}
        <div className="pt-4 flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveCalcTool('continuous_infusion')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'continuous_infusion'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Syringe className="w-3.5 h-3.5" />
            <span>1. Sürekli IV İnfüzyon Pompası</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('rsi_bolus')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'rsi_bolus'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>2. RSI Premedikasyon &amp; IV Bolus</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('intranasal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'intranasal'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>3. İntranazal (IN) Acil &amp; Pediatri</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('iv_pca')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'iv_pca'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>4. Postop IV-PCA Parametreleri</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCalcTool('transdermal_neuraxial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCalcTool === 'transdermal_neuraxial'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5. Transdermal TTS &amp; Nöroaksiyel</span>
          </button>
        </div>

        {/* Ortak Parametre: Hasta Vücut Ağırlığı ve Klinik Endikasyon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <label htmlFor={weightInputId} className="block font-semibold text-slate-700 dark:text-slate-300">
              Hasta Vücut Ağırlığı (kg):
            </label>
            <div className="relative">
              <input
                id={weightInputId}
                type="number"
                min={3}
                max={250}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(1, parseFloat(e.target.value) || 0))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-slate-400">kg</span>
            </div>
            <p className="text-[11px] text-slate-500">Obez olgularda İdeal Vücut Ağırlığı (IBW) kullanınız.</p>
          </div>

          <div className="space-y-1.5">
            <label htmlFor={indicationSelectId} className="block font-semibold text-slate-700 dark:text-slate-300">
              Klinik Endikasyon (8 Seçenek):
            </label>
            <select
              id={indicationSelectId}
              value={indication}
              onChange={(e) => handleIndicationChange(e.target.value as typeof indication)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer ${
                isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <option value="acute_postop">1. Akut Post-Operatif Ağrı (PACU / Servis)</option>
              <option value="acute_nonop">2. Akut Non-Operatif Ağrı (Acil Servis / Travma)</option>
              <option value="chronic_cancer">3. Kronik Ağrı &amp; Kanser Ağrısı (TTS / OTFC)</option>
              <option value="icu_analgosedation">4. Kritik Hastalarda YBÜ Analgosedasyonu (ePAD)</option>
              <option value="light_procedural">5. Prosedüral Sedasyon ve Analjezi (PSA)</option>
              <option value="rsi_premed">6. Hızlı Seri Entübasyonda (RSI) Premedikasyon</option>
              <option value="anesthesia_maint">7. Genel Anestezi (İndüksiyon &amp; İdame)</option>
              <option value="neuraxial">8. Nöroaksiyel Anestezi (Spinal &amp; Epidural)</option>
              <option value="custom">Özel Rejim / Doğrudan Doz Girişi</option>
            </select>
            <p className="text-[11px] text-slate-500 truncate" title={currentIndication.note}>
              {currentIndication.note}
            </p>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* MODÜL 1: SÜREKLİ IV İNFÜZYON POMPASI VE KÜMÜLASYON SAYACI */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {activeCalcTool === 'continuous_infusion' && (
          <div className="mt-5 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label htmlFor={prepSelectId} className="block font-semibold text-slate-700 dark:text-slate-300">
                  Çözelti Hazırlama Modeli:
                </label>
                <select
                  id={prepSelectId}
                  value={prepType}
                  onChange={(e) => setPrepType(e.target.value as typeof prepType)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer ${
                    isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="standard_10">500 mcg (10 mL) + 40 mL SF ➔ 10 mcg/mL (Standart)</option>
                  <option value="standard_20">1000 mcg (20 mL) + 30 mL SF ➔ 20 mcg/mL (Konsantre)</option>
                  <option value="undiluted_50">Saf Flakon 50 mcg/mL (Seyreltilmemiş - Sıvı Kısıtlı)</option>
                  <option value="custom_prep">Özel Flakon ve Hacim Girişi...</option>
                </select>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
                  <Droplet className="w-3 h-3" />
                  <span>Etkin Konsantrasyon: {concentrationMcgMl.toFixed(1)} mcg/mL</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor={durationInputId} className="block font-semibold text-slate-700 dark:text-slate-300">
                  Öngörülen İnfüzyon Süresi:
                </label>
                <div className="relative">
                  <input
                    id={durationInputId}
                    type="number"
                    min={0.5}
                    max={168}
                    step={1}
                    value={infusionDurationHours}
                    onChange={(e) => setInfusionDurationHours(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 ${
                      isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs font-semibold text-slate-400">saat</span>
                </div>
                <p className="text-[11px] text-slate-500">Bağlam duyarlı t½ kümülasyonunu belirler.</p>
              </div>
            </div>

            {/* Doz Girişi ve Birim Seçimi */}
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-white/60 dark:bg-slate-900/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <label htmlFor={doseInputId} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-rose-500" />
                  <span>İdame İnfüzyon Dozu:</span>
                </label>
                <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      if (doseUnit !== 'mcg_kg_hr') {
                        setCustomDoseValue(Number(doseMcgKgHr.toFixed(2)));
                        setDoseUnit('mcg_kg_hr');
                      }
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      doseUnit === 'mcg_kg_hr' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    mcg/kg/saat
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (doseUnit !== 'mcg_hr') {
                        setCustomDoseValue(Number(doseMcgHr.toFixed(1)));
                        setDoseUnit('mcg_hr');
                      }
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      doseUnit === 'mcg_hr' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    mcg/saat
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (doseUnit !== 'mcg_kg_min') {
                        setCustomDoseValue(Number(doseMcgKgMin.toFixed(3)));
                        setDoseUnit('mcg_kg_min');
                      }
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      doseUnit === 'mcg_kg_min' ? 'bg-rose-500 text-white shadow-2xs' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    mcg/kg/dk
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                <div className="relative col-span-2">
                  <input
                    id={doseInputId}
                    type="number"
                    min={0.01}
                    max={50}
                    step={doseUnit === 'mcg_kg_min' ? 0.005 : doseUnit === 'mcg_hr' ? 5 : 0.1}
                    value={customDoseValue}
                    onChange={(e) => setCustomDoseValue(parseFloat(e.target.value) || 0)}
                    className={`w-full px-4 py-2.5 rounded-xl border text-base font-bold font-mono transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-4 top-3 text-xs font-bold text-slate-400">
                    {doseUnit === 'mcg_kg_hr' ? 'mcg/kg/saat' : doseUnit === 'mcg_hr' ? 'mcg/saat' : 'mcg/kg/dk'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-400 font-medium mr-1">Kısayol:</span>
                  {[0.5, 1.0, 1.5, 2.0, 3.0].map((quickDose) => (
                    <button
                      key={quickDose}
                      type="button"
                      onClick={() => {
                        setDoseUnit('mcg_kg_hr');
                        setCustomDoseValue(quickDose);
                      }}
                      className={`px-2 py-1 rounded-md text-xs font-semibold font-mono border transition-all cursor-pointer ${
                        doseUnit === 'mcg_kg_hr' && customDoseValue === quickDose
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}
                    >
                      {quickDose}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* İnfüzyon Sonuç Kartları */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-xl border bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1">
                  İnfüzyon Hızı
                </span>
                <div className="text-2xl font-extrabold font-mono text-rose-600 dark:text-rose-300">
                  {infusionRateMlHr.toFixed(2)} <span className="text-xs font-semibold">mL/sa</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{microDropsPerMinute.toFixed(1)} mikrodamla/dk</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
                  Saatlik Doz
                </span>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                  {doseMcgHr.toFixed(1)} <span className="text-xs font-semibold">mcg/sa</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{doseMcgKgHr.toFixed(2)} mcg/kg/saat</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  Tahmini CSHT
                </span>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                  ~{Math.round(cshtEstimateMinutes)} <span className="text-xs font-semibold">dk</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">{infusionDurationHours} sa sonra uyanma gecikmesi</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-1">
                  24 Sa Tüketim
                </span>
                <div className="text-2xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                  ~{consumption24HrMg.toFixed(2)} <span className="text-xs font-semibold">mg</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">~{Math.ceil(vialsNeeded500mcg)} ampul (500 mcg)</p>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* MODÜL 2: HIZLI SERİ ENTÜBASYON (RSI) PREMEDİKASYON & IV BOLUS */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {activeCalcTool === 'rsi_bolus' && (
          <div className="mt-5 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20">
              <span className="font-bold text-xs uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-1">
                RSI Premedikasyonunun Klinik Prensibi:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Hızlı seri entübasyonda laringoskopi uyarısı yoğun sempatik deşarja yol açarak intrakraniyal basınçta (KİBAS),
                intraoküler basınçta ve kardiyovasküler parametrelerde (KTA, OAB) tehlikeli fırlamalara neden olur.
                İndüksiyon ajanından <strong>3 dakika önce</strong> uygulanan fentanil, sempatik refleks arkını söndürür.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor={rsiDoseInputId} className="font-semibold text-xs text-slate-700 dark:text-slate-300 block">
                  RSI Bolus Dozu (mcg/kg):
                </label>
                <div className="relative">
                  <input
                    id={rsiDoseInputId}
                    type="number"
                    min={0.5}
                    max={5.0}
                    step={0.5}
                    value={rsiDoseMcgKg}
                    onChange={(e) => setRsiDoseMcgKg(Math.max(0.5, parseFloat(e.target.value) || 1.5))}
                    className="w-full px-3.5 py-2 rounded-xl border text-sm font-bold bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">mcg/kg</span>
                </div>
                <p className="text-[11px] text-slate-500">Standart RSI: 1.5 – 3.0 mcg/kg (KİBAS/KV riskte 3 mcg/kg)</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-xs text-slate-700 dark:text-slate-300 block">
                  Ampul Konsantrasyonu:
                </label>
                <select
                  value={rsiVialConc}
                  onChange={(e) => setRsiVialConc(parseFloat(e.target.value) || 50)}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs font-semibold bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                >
                  <option value={50}>50 mcg/mL (Saf Standart Ampul)</option>
                  <option value={10}>10 mcg/mL (500 mcg / 50 mL Seyreltilmiş)</option>
                  <option value={20}>20 mcg/mL (1000 mcg / 50 mL Seyreltilmiş)</option>
                </select>
                <p className="text-[11px] text-slate-500">Ampulden doğrudan veya seyreltilerek çekim</p>
              </div>

              <div className="p-3.5 rounded-xl border border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block uppercase tracking-wider">
                  Hesaplanan RSI Dozu:
                </span>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                  {totalRsiDoseMcg.toFixed(1)} <span className="text-xs font-semibold">mcg</span>
                </div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  Hacim: {totalRsiVolumeMl.toFixed(2)} mL
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 text-xs flex items-start gap-2 text-rose-900 dark:text-rose-200">
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong>Hızlı Enjeksiyondan Kaçınma:</strong> RSI premedikasyonunda bu doz kesinlikle hızlı şok puşe yapılmamalıdır.
                En az <strong>1 – 2 dakikaya yayılarak</strong> yavaşça enjekte edilmeli, indüksiyon ajanına (örn. propofol/etomidat)
                tam 3 dakika sonra geçilmelidir.
              </span>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* MODÜL 3: İNTRANAZAL (IN) MUKOZAL ATOMİZASYON DOZLAYICI */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {activeCalcTool === 'intranasal' && (
          <div className="mt-5 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl border border-teal-200 dark:border-teal-900/50 bg-teal-50/50 dark:bg-teal-950/20">
              <span className="font-bold text-xs uppercase tracking-wider text-teal-700 dark:text-teal-300 block mb-1">
                İntranazal (IN) Fentanil Analjezisinin Avantajı:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Damaryolu açılamayan veya ajite olan pediatrik ve erişkin hastalarda (travma, kırık, yanık, acil servis)
                Mukozal Atomizasyon Cihazı (MAD) ile nazal mukozadan uygulanır. Karaciğer ilk geçiş etkisinden kaçarak
                <strong> 5 – 10 dakikada IV'ye yakın hızda</strong> güçlü analjezi sağlar.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor={inDoseInputId} className="font-semibold text-xs text-slate-700 dark:text-slate-300 block">
                  İntranazal Doz (mcg/kg):
                </label>
                <div className="relative">
                  <input
                    id={inDoseInputId}
                    type="number"
                    min={0.5}
                    max={2.5}
                    step={0.1}
                    value={inDoseMcgKg}
                    onChange={(e) => setInDoseMcgKg(Math.max(0.5, parseFloat(e.target.value) || 1.5))}
                    className="w-full px-3.5 py-2 rounded-xl border text-sm font-bold bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">mcg/kg</span>
                </div>
                <p className="text-[11px] text-slate-500">Standart Doz: 1.5 – 2.0 mcg/kg (Maksimum tek doz: 100 mcg)</p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-xs text-slate-700 dark:text-slate-300 block">
                  Çözelti Konsantrasyonu:
                </label>
                <div className="px-3.5 py-2 rounded-xl border font-mono text-xs font-bold bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
                  50 mcg/mL (Saf Ampul - Seyreltilmez)
                </div>
                <p className="text-[11px] text-slate-500">Mukozal emilim için seyreltilmemiş konsantre ampul şarttır.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-teal-300 dark:border-teal-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block uppercase tracking-wider">
                  Hesaplanan IN Dozu:
                </span>
                <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                  {Math.min(100, totalInDoseMcg).toFixed(1)} <span className="text-xs font-semibold">mcg</span>
                </div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  Toplam Hacim: {Math.min(2.0, totalInVolumeMl).toFixed(2)} mL
                </div>
                <p className="text-[10px] text-slate-500">
                  Her burun deliğine: <strong>{Math.min(1.0, inVolumePerNostrilMl).toFixed(2)} mL</strong>
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/40 dark:bg-teal-950/20 text-xs">
              <span className="font-bold text-teal-800 dark:text-teal-200 block mb-0.5">Uygulama İpucu:</span>
              <p className="text-slate-600 dark:text-slate-300">
                1 mL'den fazla sıvı nazal mukozadan yutağa akarak yutulabilir ve etkisi gecikebilir. Bu nedenle toplam hacim
                1 mL'yi aştığında doz iki burun deliğine bölünerek (örneğin 0.7 mL sağ, 0.7 mL sol) uygulanmalıdır.
              </p>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* MODÜL 4: POSTOPERATİF IV-PCA PROTOKOLÜ */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {activeCalcTool === 'iv_pca' && (
          <div className="mt-5 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20">
              <span className="font-bold text-xs uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                Hasta Kontrollü Analjezi (IV-PCA) Güvenlik İlkeleri:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Hasta yataklı serviste kendi ağrı kontrolünü buton aracılığıyla sağlar. Opioid-naif hastalarda
                <strong> bazal sürekli infüzyon verilmemelidir</strong> (uyku sırasında ölümcül apne riski).
                Yalnızca hastanın talep ettiği bolus dozu ve güvenli kilit süresi programlanmalıdır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label htmlFor={pcaBolusInputId} className="font-semibold text-xs text-slate-700 dark:text-slate-300 block">
                  Talep (Bolus) Dozu (mcg):
                </label>
                <div className="relative">
                  <input
                    id={pcaBolusInputId}
                    type="number"
                    min={5}
                    max={50}
                    step={5}
                    value={pcaBolusMcg}
                    onChange={(e) => setPcaBolusMcg(parseFloat(e.target.value) || 10)}
                    className="w-full px-3.5 py-2 rounded-xl border text-sm font-bold bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">mcg</span>
                </div>
                <p className="text-[11px] text-slate-500">Standart: 10 – 20 mcg ({pcaBolusMcgKg.toFixed(2)} mcg/kg)</p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor={pcaLockoutInputId} className="font-semibold text-xs text-slate-700 dark:text-slate-300 block">
                  Kilit Süresi (Lockout dk):
                </label>
                <div className="relative">
                  <input
                    id={pcaLockoutInputId}
                    type="number"
                    min={5}
                    max={20}
                    step={1}
                    value={pcaLockoutMin}
                    onChange={(e) => setPcaLockoutMin(Math.max(5, parseInt(e.target.value, 10) || 6))}
                    className="w-full px-3.5 py-2 rounded-xl border text-sm font-bold bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">dakika</span>
                </div>
                <p className="text-[11px] text-slate-500">Fentanil için önerilen: 5 – 8 dakika</p>
              </div>

              <div className="space-y-1.5">
                <label htmlFor={pcaBasalInputId} className="font-semibold text-xs text-slate-700 dark:text-slate-300 block">
                  Bazal İnfüzyon (mcg/saat):
                </label>
                <div className="relative">
                  <input
                    id={pcaBasalInputId}
                    type="number"
                    min={0}
                    max={50}
                    step={5}
                    value={pcaBasalMcgHr}
                    onChange={(e) => setPcaBasalMcgHr(parseFloat(e.target.value) || 0)}
                    className="w-full px-3.5 py-2 rounded-xl border text-sm font-bold bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400">mcg/sa</span>
                </div>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                  {pcaBasalMcgHr === 0 ? '✓ 0 mcg/sa (Opioid-naif güvenli)' : '⚠ Yalnızca toleran hastada!'}
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-purple-300 dark:border-purple-800 bg-white dark:bg-slate-900 space-y-1">
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 block uppercase tracking-wider">
                  Maksimum Saatlik Kapasite:
                </span>
                <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-slate-100">
                  {maxDosePerHourWithBasal} <span className="text-xs font-semibold">mcg/saat</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  4 Sa Sınırı: <strong>{pcaMax4HrMcg} mcg</strong> (Saatte maks {maxPossibleBolusPerHour} bolus)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* MODÜL 5: TRANSDERMAL (TTS) & NÖROAKSİYEL REHBERİ */}
        {/* ───────────────────────────────────────────────────────────────── */}
        {activeCalcTool === 'transdermal_neuraxial' && (
          <div className="mt-5 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Transdermal Flaster Eşdeğerlik Hesaplayıcı */}
              <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300">
                    Oral Morfinden TTS Flastere Geçiş:
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    Yalnızca Toleran
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={morphineInputId} className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                    Mevcut Günlük Oral Morfin Tüketimi (mg/gün):
                  </label>
                  <input
                    id={morphineInputId}
                    type="number"
                    min={30}
                    max={600}
                    step={10}
                    value={oralMorphineDailyMg}
                    onChange={(e) => setOralMorphineDailyMg(parseFloat(e.target.value) || 60)}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-bold bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                </div>

                <div className="p-3 rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900">
                  <span className="text-[11px] font-semibold text-slate-500 block">Önerilen Başlangıç TTS Flasteri:</span>
                  <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                    {estimatedTtsMcgHr} mcg/saat (72 Saatte Bir Flaster Değişimi)
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    İlk flaster yapıştırıldıktan sonra kararlı plazma düzeyine 12-24 saatte ulaşılır; bu sürede geçiş analjezisi sürdürülmelidir.
                  </p>
                </div>
              </div>

              {/* Nöroaksiyel Doz Parametreleri */}
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                  Nöroaksiyel Doz Parametreleri Kılavuzu:
                </span>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">Spinal / İntratekal:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      <strong>10 – 25 mcg (0.2 – 0.5 mL)</strong> tek doz hiperbarik bupivakaine eklenir. Sezaryen ve alt ekstremite
                      cerrahisinde visceral ağrıyı keser ve 4-6 saat postop analjezi sağlar.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900">
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">Epidural / PCEA:</span>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                      Bupivakain %0.0625 - %0.125 içine <strong>2 mcg/mL fentanil</strong> katılır.
                      Bolus 5-10 mL (10-20 mcg), kilit 10-15 dk, bazal 4-8 mL/saat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 7: BÖBREK YETMEZLİĞİNDE DOZ REVİZYONU KILAVUZU */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 text-cyan-500">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Böbrek Yetmezliğinde Doz Revizyonu Kılavuzu
            </h2>
            <p className="text-xs text-slate-500">
              GFR kademeleri, Hemodiyaliz, Periton Diyalizi ve Sürekli Renal Replasman (CRRT) kuralları
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Fentanil esas olarak karaciğerde inaktif metaboliti olan norfentanile dönüştürülür ve metabolitler idrarla atılır.
              Morfin (M6G metaboliti) gibi böbrek yetmezliğinde aktif toksik metabolit birikimi yapmaz; bu nedenle böbrek
              yetmezliği olan kritik hastalarda morfine kıyasla <strong>daha güvenli bir tercihtir</strong>. Ancak şiddetli
              üremi hastalarında kan-beyin bariyeri geçirgenliği artar ve protein bağlanması düşebilir; bu nedenle doz titrasyonu
              gereklidir.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-700'}>
                  <th className="p-3 font-semibold text-xs">Böbrek Fonksiyon Düzeyi</th>
                  <th className="p-3 font-semibold text-xs">Önerilen Doz Yüzdesi</th>
                  <th className="p-3 font-semibold text-xs">Klinik Yönetim &amp; Titrasyon Kılavuzu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                <tr>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                    Normal / Hafif KBY (GFR &ge; 50 mL/dk)
                  </td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-mono font-bold">%100 Doz</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    Doz ayarlaması gerekmez; standart analjezi protokolü ve sedasyon skoru izlenir.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                    Orta Düzey KBY (GFR 10 – 50 mL/dk)
                  </td>
                  <td className="p-3 text-amber-600 dark:text-amber-400 font-mono font-bold">%75 Doz</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    Başlangıç dozu normal verilebilir, idame infüzyon hızı %25 azaltılarak klinik yanıta göre titre edilir.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                    Ağır KBY / Son Dönem (GFR &lt; 10 mL/dk)
                  </td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">%50 Doz</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    Doz %50 oranında azaltılmalı, aralıklar uzatılmalıdır. İnaktif norfentanil birikir ancak toksik değildir;
                    santral sedasyon derinliği sık değerlendirilmelidir.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                    Kronik Hemodiyaliz (Haftada 3 Gün)
                  </td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">%50 Doz (Diyalizden bağımsız)</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    <strong>Diyaliz ile klerensi yoktur:</strong> Yüksek lipid çözünürlüğü, geniş Vd (4 L/kg) ve yüksek protein
                    bağlanması (%85) sebebiyle hemodiyaliz ile kandan uzaklaştırılamaz. Diyaliz sonrası ek doza gerek yoktur.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">Periton Diyalizi (CAPD / APD)</td>
                  <td className="p-3 text-rose-600 dark:text-rose-400 font-mono font-bold">%50 Doz</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    Periton diyaliz membranı ile temizlenmez. Doz %50 azaltılarak titre edilir; ek doza ihtiyaç duyulmaz.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                    CRRT (CVVH / CVVHD / CVVHDF)
                  </td>
                  <td className="p-3 text-indigo-600 dark:text-indigo-400 font-mono font-bold">%75 – %100 Doz</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">
                    Filtre klerensi düşüktür; hastanın kritik katabolik durumu ve sedasyon derinliğine göre (%75-100) titre edilir.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 8: KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONU */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-500">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Karaciğer Yetmezliğinde Doz Revizyonu (Child-Pugh Sınıflaması)
            </h2>
            <p className="text-xs text-slate-500">
              CYP3A4 metabolizması bozulması, uzamış yarı ömür ve hepatik ensefalopati risk yönetimi
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Fentanil karaciğerde <strong>yüksek ekstraksiyon oranına</strong> sahip bir ilaçtır. Eliminasyonu doğrudan
              karaciğer kan akımına ve mikrozomal CYP3A4 enzim aktivitesine bağlıdır. Siroz ve karaciğer yetmezliğinde
              klerens belirgin düşer, biyoyararlanım artar ve eliminasyon yarı ömrü saatlerce uzar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Child-Pugh A */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100">Child-Pugh Sınıf A (Hafif)</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  %75 – %100 Doz
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Klerenste hafif azalma olabilir. Başlangıçta normal doz verilebilir, ancak tekrarlayan dozlar veya infüzyon
                sırasında sedasyon skoru yakından takip edilerek doz ihtiyaca göre titre edilir.
              </p>
            </div>

            {/* Child-Pugh B */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-slate-100">Child-Pugh Sınıf B (Orta)</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  %50 Doz Azaltımı
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Hepatik CYP3A4 kapasitesi ve karaciğer perfüzyonu belirgin azalmıştır. Başlangıç dozu ve infüzyon hızı %50
                oranında azaltılmalı, titrasyon aralıkları genişletilmelidir.
              </p>
            </div>

            {/* Child-Pugh C */}
            <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-900 dark:text-rose-100">Child-Pugh Sınıf C (Şiddetli)</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400">
                  %25 Doz / İnfüzyondan Kaçının
                </span>
              </div>
              <p className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed">
                <strong>Hepatik Ensefalopati Riski:</strong> Klerens çökmüştür. Sürekli infüzyondan kesinlikle kaçınılmalıdır.
                Yalnızca çok zorunlu durumlarda düşük aralıklı boluslar (%25 doz) tercih edilmeli veya Remifentanil seçilmelidir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 9: ÖNEMLİ OLUMSUZ ETKİLER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Önemli Olumsuz Etkiler (Adverse Effects)
            </h2>
            <p className="text-xs text-slate-500">
              Göğüs rijiditesi (Wooden Chest), solunum depresyonu, bradikardi, tolerans ve yoksunluk
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-950/20 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Göğüs Duvarı Rijiditesi (Wooden Chest)</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Hızlı IV bolus enjeksiyonu sonrası toraks ve abdominal kaslarda şiddetli spazm ve laringospazm meydana gelir;
              ventilasyon imkansız hale gelir.
              <strong> Tedavi:</strong> Nöromüsküler bloker (Süksinilkolin veya Rokuronyum) veya acil Nalokson IV.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <Wind className="w-4 h-4 text-cyan-500 shrink-0" />
              <span>Solunum Depresyonu ve Apne</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Beyin sapındaki solunum merkezinin CO₂ kemoreseptör hassasiyetini baskılar. Spontan soluyan hastalarda
              hipoventilasyon, hipoksemi ve apneye yol açar. Benzodiazepin veya propofol kombinasyonunda sinerjistik risk katlanır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
              <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Santral Vagal Bradikardi</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Medulladaki vagal çekirdeklerin doğrudan stimülasyonu ile sinüs bradikardisine yol açabilir.
              Histamin deşarjı yapmadığı için morfin kadar hipotansiyon yapmaz, ancak bradikardi belirginleşirse atropine hızla yanıt verir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              Konstipasyon, İleus &amp; Oddi Spazmı
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Enterik sistemdeki μ-reseptör aktivasyonu ile bağırsak peristaltizmini durdurur, paralitik ileusa neden olabilir.
              Oddi sfinkterinde spazm yaparak biliyer basıncı arttırır; postoperatif bulantı ve kusmayı (PONV) tetikler.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              Tolerans &amp; Fiziksel Çekilme
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              YBÜ'de &gt;5-7 gün süren sürekli infüzyonlarda reseptör duyarsızlaşması ve akut tolerans gelişir.
              İnfüzyon aniden kesildiğinde ajitasyon, terleme, taşikardi, hipertansiyon ve taşipne ile seyreden akut çekilme tablosu oluşur.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              Serotonin Sendromu Riski
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Zayıf bir serotonin geri alım inhibitörü (SRI) özelliği taşır. SSRI, SNRI veya linezolid
              kullanan hastalarda klonus, tremor, ajitasyon ve hipertermi tablosuna yol açabilir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 10: KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10 text-indigo-500">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar
            </h2>
            <p className="text-xs text-slate-500">
              Kümülasyon, hızlı bolustan sakınma, CYP3A4 etkileşimi, histamin avantajı ve nalokson protokolü
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              1. Kümülasyon (Akümülasyon) ve Weaning / Ekstübasyon Gecikmesi:
            </span>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Remifentanilin tersine fentanil doku esterazlarıyla parçalanmaz; karaciğerden metabolize edilir.
              Yoğun bakımda 48 saatten uzun süre fentanil infüzyonu alan mekanik ventilasyon hastalarında ilaç vücut yağ
              dokularında doymuş durumdadır. İnfüzyon kapatıldıktan sonra hastanın uyanması ve solunum dürtüsünün geri
              gelmesi <strong>4 ila 12 saat</strong> sürebilir. Bu nedenle weaning planlanan hastalarda infüzyon önceden kapatılmalı
              veya kısa etkili alternatiflere geçilmelidir.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              2. Hızlı IV Puşeden Kaçınma Kuralı:
            </span>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Fentanil bolus dozları asla hızlı IV puşe (şok bolus) şeklinde verilmemelidir. Hızlı verilen 100 mcg dahi
              erişkinde ciddi göğüs duvarı kas rijiditesine yol açarak maskeyle havalandırmayı imkansızlaştırabilir.
              Tüm IV bolus enjeksiyonlar <strong>en az 1 – 2 dakikaya yayılarak</strong> yavaşça uygulanmalıdır.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              3. Güçlü CYP3A4 İnhibitörleri ile Ölümcül Toksisite Riski:
            </span>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Hastanın kullandığı veya başlanan ilaçlar (Klaritromisin, Flukonazol, Vorikonazol, Diltiazem, Verapamil,
              Ritonavir, Greyfurt suyu) fentanilin hepatik metabolizmasını bloke eder. Bu kombinasyonlarda standart fentanil
              dozları bile plazma düzeyini 2-3 katına çıkararak uzamış koma ve ölümcül solunum arresti yaratabilir.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              4. Morfine Göre Histamin Avantajı:
            </span>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Morfin mast hücrelerinden histamin deşarjına yol açarak bronkokonstriksiyon ve sistemik vazodilatasyon (hipotansiyon)
              yaparken; fentanil klinik dozlarda <strong>histamin salınımına yol açmaz</strong>. Reaktif havayolu hastalığı (astım, KOAH)
              veya hemodinamik kararsızlığı olan septik/kardiyak hastalarda fentanil morfine kıyasla kardiyovasküler açıdan çok daha güvenlidir.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 space-y-1.5">
            <span className="font-bold text-rose-900 dark:text-rose-100 block text-xs">
              5. Yatak Başı Nalokson ve Havayolu Hazırlığı:
            </span>
            <p className="text-rose-800 dark:text-rose-200 text-xs leading-relaxed">
              Fentanil uygulanan her klinikte (ameliyathane, YBÜ, sedasyon odası) yatak başında mutlaka <strong>Nalokson ampul</strong>,
              balon-valf-maske (Ambu) ve entübasyon ekipmanı hazır bulunmalıdır. Opioid aşırı dozunda Nalokson 0.04 – 0.4 mg IV
              titre edilerek verilmeli; fentanilin etki süresi naloksondan (30-90 dk) daha uzun olabileceğinden hasta relaps
              solunum depresyonu açısından en az 2-4 saat yakından izlenmelidir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 11: IV UYGULAMA VE SULANDIRMA / HAZIRLAMA ŞEKİLLERİ */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-teal-500/10 text-teal-500">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              IV Uygulama ve Sulandırma / Hazırlama Şekilleri
            </h2>
            <p className="text-xs text-slate-500">
              Standart seyreltme konsantrasyonları, geçimli sıvılar, stabilite ve yıkama kuralları
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              1. Standart İnfüzyon Seyreltmesi (10 mcg/mL)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Hazırlanışı:</strong> 1 adet 500 mcg (10 mL) Fentanil ampul çekilir ve 40 mL %0.9 NaCl (SF) veya %5 Dekstroz
              eklenerek 50 mL'lik perfuzör enjektöründe tamamlanır.<br />
              • <strong>Son Konsantrasyon:</strong> 10 mcg/mL.<br />
              • Genel cerrahi ve standart yoğun bakım infüzyonları için en güvenli ve önerilen protokoldür.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              2. Konsantre İnfüzyon (20 – 50 mcg/mL)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>20 mcg/mL:</strong> 2 adet 500 mcg (20 mL) ampul + 30 mL SF ile 50 mL tamamlanır.<br />
              • <strong>50 mcg/mL (Seyreltilmemiş):</strong> Ampul doğrudan perfuzöre çekilerek titre edilir.<br />
              • Ciddi sıvı kısıtlaması olan (KY, ARDS, oligürik ABY) olgularda ve yüksek doz kardiyak anestezi protokollerinde tercih edilir.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              3. Geçimlilik, Stabilite &amp; Hat Yıkama
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Geçimli Mayiler:</strong> %0.9 NaCl (SF), %5 Dekstroz (D5W), Ringer Laktat ile tam geçimlidir.<br />
              • <strong>Geçimsizlik:</strong> Tiyopental ve metoheksital gibi alkali barbitüratlarla aynı hattan verilmemelidir (presipitasyon).<br />
              • <strong>Ölü Boşluk Yıkama Uyarısı:</strong> Fentanil giden damaryolu hattı hızla yıkanmamalıdır; lümendeki fentanilin
              aniden hastaya gitmesi ani apne ve göğüs rijiditesi yaratabilir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 12: İLAÇ GÜVENLİĞİ VE HIGH-ALERT UYARILARI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              İlaç Güvenliği ve High-Alert Uyarıları
            </h2>
            <p className="text-xs text-slate-500">
              ISMP High-Alert statüsü, kırmızı reçete mevzuatı, birim hatası önleme ve gebelik
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 space-y-1">
            <span className="font-bold text-rose-600 dark:text-rose-400 block">ISMP High-Alert Medication</span>
            <p className="text-slate-600 dark:text-slate-300">
              Uluslararası Güvenli İlaç Uygulamaları Enstitüsü (ISMP) tarafından hata yapıldığında hastada kalıcı hasar veya
              ölüm riski en yüksek olan ilaçlar sınıfında listelenmiştir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20 space-y-1">
            <span className="font-bold text-rose-600 dark:text-rose-400 block">Kırmızı Reçete &amp; Narkotik Takip</span>
            <p className="text-slate-600 dark:text-slate-300">
              T.C. Sağlık Bakanlığı Renkli Reçete Sistemi kapsamında Kırmızı Reçeteye tabidir. Çift kilitli narkotik dolabında
              saklanmalı, devir teslimleri ve zayi tutanakları çift hemşire/hekim imzası ile kayıt altına alınmalıdır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 space-y-1">
            <span className="font-bold text-amber-600 dark:text-amber-400 block">mg vs. mcg Birim Karışıklığı</span>
            <p className="text-slate-600 dark:text-slate-300">
              En ölümcül medikal hatalardan biri miligram (mg) ile mikrogram (mcg) birimlerinin karışmasıdır. 1 mg = 1000 mcg'dir.
              1 mg fentanil verilmesi (1000 mcg) ölümcül doz aşımıdır! Tüm istemler açıkça "mcg" veya "mikrogram" yazılmalıdır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-300 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block">Gebelik &amp; Laktasyon (Kat. C)</span>
            <p className="text-slate-600 dark:text-slate-300">
              Plasentayı hızla geçer. Doğum eyleminde yüksek doz verilirse yenidoğanda belirgin solunum depresyonu yapar
              (bebeğe nalokson hazır olmalıdır). Anne sütüne geçer; laktasyonda 24 saat ara verilmesi önerilir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 13: İLAÇ ETKİLEŞİMİ SORGULAMA DIŞ BAĞLANTILARI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10 text-indigo-500">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              İlaç Etkileşimi Sorgulama Dış Bağlantıları
            </h2>
            <p className="text-xs text-slate-500">
              Uluslararası bağımsız farmakoloji veritabanları üzerinden anlık etkileşim kontrolü
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <a
            href="https://www.drugs.com/drug-interactions/fentanyl.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-rose-500/50 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-rose-400 text-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500 group-hover:scale-110 transition-transform">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm block">Drugs.com Fentanyl Drug Interactions</span>
                <span className="text-[11px] text-slate-500">Kapsamlı CYP3A4 ve santral depresan etkileşim sorgulaması</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" />
          </a>

          <a
            href="https://reference.medscape.com/drug-interactionchecker"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:border-rose-500/50 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-rose-400 text-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm block">Medscape Multi-Drug Interaction Checker</span>
                <span className="text-[11px] text-slate-500">Çoklu ilaç kombinasyonları ve klinik farmakoloji kılavuzu</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>
      </section>
    </div>
  );
};
