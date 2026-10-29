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

export const FentanylProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HASTA VE İNFÜZYON STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);

  // Çözelti Hazırlama Parametreleri
  const [prepType, setPrepType] = useState<'standard_10' | 'standard_20' | 'undiluted_50' | 'custom_prep'>('standard_10');
  const [customVialMcg, setCustomVialMcg] = useState<number>(500); // mcg
  const [customDiluentVolume, setCustomDiluentVolume] = useState<number>(50); // mL

  // Doz Girişi Parametreleri (mcg/kg/saat, mcg/saat veya mcg/kg/dk)
  const [doseUnit, setDoseUnit] = useState<'mcg_kg_hr' | 'mcg_hr' | 'mcg_kg_min'>('mcg_kg_hr');
  const [customDoseValue, setCustomDoseValue] = useState<number>(1.0); // girilen değer

  // İsteğe Bağlı Yükleme Bolus Parametreleri
  const [giveBolus, setGiveBolus] = useState<boolean>(false);
  const [bolusDoseMcgKg, setBolusDoseMcgKg] = useState<number>(1.0); // mcg/kg
  const [bolusDurationMin, setBolusDurationMin] = useState<number>(2); // dakika (en az 1-2 dk yavaş)
  const [infusionDurationHours, setInfusionDurationHours] = useState<number>(12); // saat

  // UI Durumları
  const [pkOpen, setPkOpen] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Benzersiz id'ler
  const weightInputId = useId();
  const prepSelectId = useId();
  const doseInputId = useId();
  const bolusCheckboxId = useId();
  const bolusDoseInputId = useId();
  const bolusDurationInputId = useId();
  const durationInputId = useId();
  const customVialInputId = useId();
  const customVolumeInputId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  let concentrationMcgMl = 10;
  if (prepType === 'standard_10') {
    concentrationMcgMl = 10; // 500 mcg (10 mL) + 40 mL SF = 10 mcg/mL
  } else if (prepType === 'standard_20') {
    concentrationMcgMl = 20; // 1000 mcg (20 mL) + 30 mL SF = 20 mcg/mL
  } else if (prepType === 'undiluted_50') {
    concentrationMcgMl = 50; // Saf ampul 50 mcg/mL
  } else {
    concentrationMcgMl =
      customDiluentVolume > 0 && customVialMcg > 0
        ? customVialMcg / customDiluentVolume
        : 10;
  }

  // --- EŞZAMANLI BİRİM DÖNÜŞÜMLERİ VE İNFÜZYON HESAPLARI ---
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
  const bolusEquivalentRateMcgKgHr = bolusDurationMin > 0 ? (bolusDoseMcgKg / (bolusDurationMin / 60)) : 0;

  // Tüketim Hesapları
  const consumption24HrMcg = doseMcgHr * 24 + (giveBolus ? totalBolusDoseMcg : 0);
  const consumption24HrMg = consumption24HrMcg / 1000;
  const vialsNeeded500mcg = consumption24HrMcg / 500;

  // Kümülasyon / CSHT (Bağlam Duyarlı Yarı Ömür)
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

  const handleCopySummary = () => {
    let summaryText = `KLİNİK FENTANİL İNFÜZYON DOZ PROTOKOLÜ ÖZETİ\n─────────────────────────────────────────────\n• Hasta Ağırlığı: ${weightKg} kg\n• Çözelti Hazırlama: ${
      prepType === 'standard_10'
        ? '500 mcg / 50 mL SF (10 mcg/mL)'
        : prepType === 'standard_20'
        ? '1000 mcg / 50 mL SF (20 mcg/mL)'
        : prepType === 'undiluted_50'
        ? '50 mcg/mL (Saf Ampul)'
        : `${concentrationMcgMl.toFixed(1)} mcg/mL (${customVialMcg} mcg / ${customDiluentVolume} mL)`
    }\n• İdame Dozu: ${doseMcgKgHr.toFixed(2)} mcg/kg/saat | ${doseMcgHr.toFixed(1)} mcg/saat | ${doseMcgKgMin.toFixed(3)} mcg/kg/dk\n• Pompa Akış Hızı: ${infusionRateMlHr.toFixed(2)} mL/saat (~${microDropsPerMinute.toFixed(1)} damla/dk)\n`;

    if (giveBolus) {
      summaryText += `• Yükleme Bolusu: ${bolusDoseMcgKg} mcg/kg (${totalBolusDoseMcg.toFixed(1)} mcg / ${totalBolusVolumeMl.toFixed(2)} mL) ${bolusDurationMin} dakikada (Pompa Hızı: ${bolusPumpRateMlHr.toFixed(1)} mL/saat | Eşdeğer: ${bolusEquivalentRateMcgKgHr.toFixed(1)} mcg/kg/saat)\n`;
    }

    summaryText += `• Öngörülen İnfüzyon Süresi: ${infusionDurationHours} saat (Tahmini CSHT: ~${Math.round(cshtEstimateMinutes)} dk)\n• 24 Saatlik Toplam Tüketim: ~${consumption24HrMg.toFixed(2)} mg (~${Math.ceil(vialsNeeded500mcg)} ampul [500 mcg/10 mL])\n─────────────────────────────────────────────\nUYARI: Fentanil yüksek potensli bir opioiddir (morfinden 80-100 kat güçlü). Hızlı puşede toraks rijiditesi (wooden chest) riski vardır. Yatak başında her zaman Nalokson hazır bulundurulmalıdır.`;

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
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Yüksek Potensli Sentetik Opioid
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Kırmızı Reçete · ISMP High-Alert
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                Talinat · Fentanyl Janssen · Durogesic
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Fentanil Sitrat (Talinat, Fentanyl Janssen, Fentanyl Hameln, Durogesic)
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
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 4: ENDİKASYONLAR VE OFF-LABEL KULLANIMLAR                     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <CheckCircle2 className="w-5 h-5 text-teal-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Endikasyonlar ve Off-Label Kullanımlar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Ruhsatlı Endikasyonlar */}
          <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/5 space-y-2">
            <span className="font-bold text-teal-700 dark:text-teal-300 text-sm block">
              FDA / EMA / TİTCK Onaylı Ruhsatlı Endikasyonlar
            </span>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                <strong>1. Genel Anestezi İndüksiyonu ve İdamesi:</strong> Majör cerrahi ve dengeli inhalasyon anestezisinde analjezik omurga olarak (erişkin ve pediatrik hastalarda).
              </p>
              <p>
                <strong>2. Kritik Yoğun Bakım Hastalarında Analgosedasyon:</strong> Mekanik ventilasyon uygulanan yoğun bakım hastalarında "önce analjezi" (analgesia-first) yaklaşımıyla sürekli IV infüzyon veya hedef tabanlı aralıklı bolus.
              </p>
              <p>
                <strong>3. Nöroaksiyel Analjezi (Spinal ve Epidural):</strong> Doğum eylemi analjezisi, sezaryen ve postoperatif cerrahi ağrıda lokal anesteziklerle kombine derin viseral analjezi.
              </p>
              <p>
                <strong>4. Prosedürel Sedasyon ve Analjezi (PSA):</strong> Günübirlik cerrahi, kolonoskopi, bronkoskopi, kardiyoversiyon, kırık redüksiyonu ve girişimsel radyolojide sedoanaljezi.
              </p>
              <p>
                <strong>5. Kronik Şiddetli Kanser Ağrısı:</strong> Yalnızca opioid toleran hastalarda transdermal flaster (TTS) veya oral transmukozal formülasyonlarla sürekli bazal ve alevlenen ağrı kontrolü.
              </p>
            </div>
          </div>

          {/* Off-Label Kullanımlar */}
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-2">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm block">
              Off-Label / Kanıta Dayalı Klinik Kullanım Alanları
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
              <li>
                <strong>Hızlı Seri Entübasyonda (RSI) Premedikasyon:</strong> Laringoskopi ve entübasyonun tetiklediği sempatik refleks taşikardi, hipertansiyon ve KİBAS fırlamasını baskılamak amacıyla indüksiyondan 3 dakika önce 1.5–3.0 mcg/kg yavaş IV bolus.
              </li>
              <li>
                <strong>İntranazal (IN) Acil Ağrı Kontrolü:</strong> Damar yolu bulunmayan veya ajite travma, yanık ve kırık olgularında (özellikle pediatrik acillerde) Mukozal Atomizasyon Cihazı (MAD) ile hızlı ve etkili non-invaziv analjezi (1.5–2.0 mcg/kg).
              </li>
              <li>
                <strong>Postoperatif Hasta Kontrollü Analjezi (IV-PCA):</strong> Cerrahi sonrası akut orta-şiddetli ağrıda hastanın talep ettiği aralıklı bolus titrasyonu (10–20 mcg/talep, kilit süresi 5–8 dk; opioid-naif olguda bazal açılmaz).
              </li>
              <li>
                <strong>Kardiyak Cerrahi Yüksek Doz Opioid Tekniği:</strong> Koroner arter bypass ve kapak replasmanı cerrahisinde hemodinamik miyokardiyal stabilite için 20–50 mcg/kg yüksek doz tekniği.
              </li>
              <li>
                <strong>Postoperatif Titreme (Shivering) Tedavisi:</strong> Ayılma ünitesinde 25–50 mcg IV yavaş bolus ile titremenin hızlıca sonlandırılması.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 5: UYGULAMA YOLLARI VE DOZ REJİMLERİ (ERİŞKİN & PEDİATRİK)   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Syringe className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Uygulama Yolları ve Doz Rejimleri (Erişkin &amp; Pediatrik)
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Erişkin Doz Rejimleri */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Erişkin Doz Rejimleri</span>
              </span>

              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Genel Anestezi İndüksiyonu:
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    2.0 – 5.0 mcg/kg IV Yavaş Bolus
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Göğüs rijiditesini önlemek için en az 1 – 2 dakikaya yayılarak yavaşça enjekte edilir.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Genel Anestezi İdamesi:
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    1.0 – 3.5 mcg/kg/saat (veya her 30-45 dk 25 – 50 mcg IV ek doz)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Cerrahi stres yanıtına ve hemodinamiye göre titre edilir.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Yoğun Bakım Analgosedasyonu (Sürekli İnfüzyon):
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    0.7 – 2.0 mcg/kg/saat (25 – 150 mcg/saat)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    CPOT / BPS ağrı skorlarına göre titre edilir; uzayan infüzyonlarda (&gt;48 saat) yağ dokusunda kümülasyona dikkat edilmelidir.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Hızlı Seri Entübasyonda (RSI) Premedikasyon:
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    1.5 – 3.0 mcg/kg IV (entübasyondan 3 dk önce)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Laringoskopi sempatik deşarjını ve KİBAS yükselmesini baskılar.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    PACU / Postoperatif Akut Ağrı Bolus Titrasyonu:
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    25 – 50 mcg IV (0.5 – 1.0 mcg/kg), her 5 – 10 dakikada bir
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Spontan solunum hızı ve sedasyon derinliği izlenerek titre edilir.
                  </p>
                </div>
              </div>
            </div>

            {/* Pediatrik Doz Rejimleri */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Pediatrik Doz Rejimleri (Kanıta Dayalı)</span>
              </span>

              <div className="space-y-2 text-slate-700 dark:text-slate-300">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Pediatrik Genel Anestezi İdamesi:
                  </span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                    1.0 – 3.0 mcg/kg/saat IV sürekli infüzyon
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    İnhalasyon anestezikleri ile kombine idame dozu.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Pediatrik YBÜ Sürekli İnfüzyon:
                  </span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                    1.0 – 3.0 mcg/kg/saat IV
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Mekanik ventilasyon altındaki entübe çocuklarda sürekli analgosedasyon.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    İntranazal (IN) Acil Analjezi (MAD İle):
                  </span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                    1.5 – 2.0 mcg/kg tek doz (Maksimum: 100 mcg)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Damaryolu bulunmayan pediatrik kırık ve yanık olgularında saf 50 mcg/mL ampul ile burun deliklerine paylaştırılarak uygulanır.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Pediatrik IV Bolus &amp; Girişimsel Sedasyon:
                  </span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                    1.0 – 2.0 mcg/kg yavaş IV (Yenidoğanda 0.5 – 1.0 mcg/kg)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Yenidoğan ve infantlarda bradikardi riski nedeniyle atropin hazır bulundurulmalıdır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Geriatrik ve Obezite Kılavuzları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20">
              <span className="font-bold text-xs text-amber-700 dark:text-amber-300 block mb-1">
                Geriatrik Popülasyon (&gt;65 Yaş):
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Karaciğer klerensi %30-50 düşer, santral sinir sistemi duyarlılığı belirgin artar. Tüm bolus ve idame infüzyon dozları{' '}
                <strong>%50 oranında azaltılmalı</strong>, titrasyon aralıkları uzatılmalıdır.
              </p>
            </div>
            <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/40 dark:bg-indigo-950/20">
              <span className="font-bold text-xs text-indigo-700 dark:text-indigo-300 block mb-1">
                Obezite ve Kilo Hesabı:
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Fentanil yüksek lipofilik olsa da klerens santral kompartman hacmi ile ilişkilidir. Aşırı doz ve kümülasyonu önlemek için{' '}
                <strong>İdeal Vücut Ağırlığı (IBW)</strong> veya <strong>Yağsız Vücut Ağırlığı (LBW)</strong> esas alınmalıdır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 6: ⚡ FENTANİL İNFÜZYON POMPASI & DOZ HESAPLAYICISI */}
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
                  Fentanil İnfüzyon Pompası &amp; Doz Hesaplayıcısı
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400">
                  IV İnfüzyon &amp; Birim Dönüştürücü
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sürekli IV infüzyon hızı (mL/saat), eşzamanlı birim dönüşümleri (mcg/kg/saat, mcg/saat, mcg/kg/dk) ve isteğe bağlı yükleme bolus hesabı
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
                setPrepType('standard_10');
                setDoseUnit('mcg_kg_hr');
                setCustomDoseValue(1.0);
                setGiveBolus(false);
                setBolusDoseMcgKg(1.0);
                setBolusDurationMin(10);
                setInfusionDurationHours(12);
              }}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
              title="Varsayılan Değerlere Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* İNFÜZYON VE HESAPLAMA GİRİŞLERİ */}
        <div className="pt-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Hasta Ağırlığı */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={weightInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Hasta Vücut Ağırlığı (kg)
                </label>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                  {weightKg} kg
                </span>
              </div>
              <input
                id={weightInputId}
                type="number"
                min="3"
                max="250"
                step="1"
                value={weightKg}
                onChange={(e) => setWeightKg(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="flex gap-1.5 mt-2">
                {[50, 60, 70, 80, 90, 100].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setWeightKg(w)}
                    className={`flex-1 py-1 text-[11px] font-semibold rounded border transition-colors ${
                      weightKg === w
                        ? 'bg-rose-500 text-white border-rose-500'
                        : isDark
                        ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Çözelti / Konsantrasyon Seçimi */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={prepSelectId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  İnfüzyon Çözeltisi &amp; Seyreltme
                </label>
                <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                  {concentrationMcgMl.toFixed(1)} mcg/mL
                </span>
              </div>
              <select
                id={prepSelectId}
                value={prepType}
                onChange={(e) => setPrepType(e.target.value as typeof prepType)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="standard_10">500 mcg (10 mL) + 40 mL SF = 50 mL (10 mcg/mL - Standart YBÜ)</option>
                <option value="standard_20">1000 mcg (20 mL) + 30 mL SF = 50 mL (20 mcg/mL - Konsantre)</option>
                <option value="undiluted_50">Saf Ampul (50 mcg/mL - Konsantre / Akut)</option>
                <option value="custom_prep">Özel Seyreltme (Serbest Belirle)</option>
              </select>

              {prepType === 'custom_prep' && (
                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <label htmlFor={customVialInputId} className="text-[10px] text-slate-500">
                      Toplam Doz (mcg)
                    </label>
                    <input
                      id={customVialInputId}
                      type="number"
                      value={customVialMcg}
                      onChange={(e) => setCustomVialMcg(parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor={customVolumeInputId} className="text-[10px] text-slate-500">
                      Toplam Hacim (mL)
                    </label>
                    <input
                      id={customVolumeInputId}
                      type="number"
                      value={customDiluentVolume}
                      onChange={(e) => setCustomDiluentVolume(parseFloat(e.target.value) || 1)}
                      className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Doz Birimi ve Doz Miktarı */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={doseInputId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  İstenen İdame Dozu
                </label>
                <div className="flex rounded-lg p-0.5 bg-slate-200 dark:bg-slate-800 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => {
                      setDoseUnit('mcg_kg_hr');
                      setCustomDoseValue(1.0);
                    }}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      doseUnit === 'mcg_kg_hr'
                        ? 'bg-rose-500 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/kg/sa
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDoseUnit('mcg_hr');
                      setCustomDoseValue(Math.round(weightKg * 1.0));
                    }}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      doseUnit === 'mcg_hr'
                        ? 'bg-rose-500 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/sa
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDoseUnit('mcg_kg_min');
                      setCustomDoseValue(0.02);
                    }}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      doseUnit === 'mcg_kg_min'
                        ? 'bg-rose-500 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/kg/dk
                  </button>
                </div>
              </div>

              <input
                id={doseInputId}
                type="number"
                min="0.01"
                max="5000"
                step={doseUnit === 'mcg_kg_min' ? '0.005' : '0.1'}
                value={customDoseValue}
                onChange={(e) => setCustomDoseValue(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />

              {/* Hızlı Doz Kısayolları */}
              <div className="flex gap-1.5 mt-2">
                {(doseUnit === 'mcg_kg_hr'
                  ? [0.5, 0.7, 1.0, 1.5, 2.0, 3.0]
                  : doseUnit === 'mcg_hr'
                  ? [30, 50, 70, 100, 150, 200]
                  : [0.01, 0.02, 0.03, 0.05, 0.08, 0.1]
                ).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setCustomDoseValue(val)}
                    className={`flex-1 py-1 text-[11px] font-semibold rounded border transition-colors ${
                      customDoseValue === val
                        ? 'bg-rose-500 text-white border-rose-500'
                        : isDark
                        ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EŞZAMANLI BİRİM DÖNÜŞÜMLERİ & POMPA AKIŞ HIZI GÖSTERGE KARTLARI */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Eşzamanlı Birim Dönüşümleri &amp; İnfüzyon Hızı
              </span>
              <span className="text-[11px] text-slate-400">Tüm birimler senkronize çevrilir</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* mcg/kg/saat */}
              <div
                className={`p-4 rounded-xl border relative overflow-hidden transition-all ${
                  doseUnit === 'mcg_kg_hr'
                    ? 'border-rose-500 bg-rose-500/10 ring-1 ring-rose-500/30'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>mcg / kg / saat</span>
                  {doseUnit === 'mcg_kg_hr' && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-medium">Seçili</span>
                  )}
                </div>
                <div className="mt-1 text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
                  {doseMcgKgHr.toFixed(2)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Standart YBÜ birimi
                </div>
              </div>

              {/* mcg/saat */}
              <div
                className={`p-4 rounded-xl border relative overflow-hidden transition-all ${
                  doseUnit === 'mcg_hr'
                    ? 'border-rose-500 bg-rose-500/10 ring-1 ring-rose-500/30'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>mcg / saat</span>
                  {doseUnit === 'mcg_hr' && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-medium">Seçili</span>
                  )}
                </div>
                <div className="mt-1 text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
                  {doseMcgHr.toFixed(1)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Toplam saatlik miktar
                </div>
              </div>

              {/* mcg/kg/dk */}
              <div
                className={`p-4 rounded-xl border relative overflow-hidden transition-all ${
                  doseUnit === 'mcg_kg_min'
                    ? 'border-rose-500 bg-rose-500/10 ring-1 ring-rose-500/30'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>mcg / kg / dk</span>
                  {doseUnit === 'mcg_kg_min' && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500 text-white font-medium">Seçili</span>
                  )}
                </div>
                <div className="mt-1 text-2xl font-black font-mono text-rose-600 dark:text-rose-400">
                  {doseMcgKgMin.toFixed(3)}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Anestezi / OR hızı
                </div>
              </div>

              {/* Pompa Akış Hızı mL/saat */}
              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 relative overflow-hidden">
                <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                  <span>Pompa Akış Hızı</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-600 text-white font-medium">İnfüzyon</span>
                </div>
                <div className="mt-1 text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  {infusionRateMlHr.toFixed(2)}{' '}
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">mL/saat</span>
                </div>
                <div className="text-[11px] text-emerald-800 dark:text-emerald-300 mt-0.5 font-medium">
                  ~{microDropsPerMinute.toFixed(1)} mikro-damla/dk
                </div>
              </div>
            </div>
          </div>

          {/* YÜKLEME BOLUSU & KÜMÜLASYON / TÜKETİM BİLGİSİ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Yükleme Bolus Ayarları & Hız Karşılığı */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <label htmlFor={bolusCheckboxId} className="flex items-center gap-2 cursor-pointer">
                  <input
                    id={bolusCheckboxId}
                    type="checkbox"
                    checked={giveBolus}
                    onChange={(e) => setGiveBolus(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Yükleme Dozu (Bolus) Uygula
                  </span>
                </label>
                {giveBolus && (
                  <span className="text-[11px] px-2 py-0.5 rounded font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    Aktif
                  </span>
                )}
              </div>

              {giveBolus ? (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={bolusDoseInputId} className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                        Bolus Dozu (mcg/kg)
                      </label>
                      <input
                        id={bolusDoseInputId}
                        type="number"
                        min="0.2"
                        max="5.0"
                        step="0.1"
                        value={bolusDoseMcgKg}
                        onChange={(e) => setBolusDoseMcgKg(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full mt-1 px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-transparent font-semibold"
                      />
                    </div>
                    <div>
                      <label htmlFor={bolusDurationInputId} className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                        Bolus Süresi (dakika)
                      </label>
                      <input
                        id={bolusDurationInputId}
                        type="number"
                        min="1"
                        max="60"
                        step="1"
                        value={bolusDurationMin}
                        onChange={(e) => setBolusDurationMin(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full mt-1 px-2.5 py-1.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-transparent font-semibold"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs space-y-1.5">
                    <div className="flex justify-between items-center text-amber-900 dark:text-amber-300 font-bold">
                      <span>Bolus Pompa Akış Hızı ({bolusDurationMin} dk):</span>
                      <span className="font-mono text-sm">{bolusPumpRateMlHr.toFixed(1)} mL/saat</span>
                    </div>
                    <div className="flex justify-between items-center text-amber-800 dark:text-amber-400">
                      <span>Bolus Esnasındaki Eşdeğer Hız:</span>
                      <span className="font-mono font-bold">{bolusEquivalentRateMcgKgHr.toFixed(1)} mcg/kg/saat</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-[11px] pt-1 border-t border-amber-500/20">
                      <span>Toplam Verilecek Bolus:</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        {totalBolusDoseMcg.toFixed(1)} mcg ({totalBolusVolumeMl.toFixed(2)} mL)
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic">
                    Kronometre tutarak {bolusDurationMin} dakika sonunda pompayı idame hızına ({infusionRateMlHr.toFixed(2)} mL/saat) düşebilirsiniz.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic py-2">
                  Yükleme bolusu kapalı. Doğrudan idame infüzyon hızıyla ({infusionRateMlHr.toFixed(2)} mL/saat) başlanacaktır.
                </p>
              )}
            </div>

            {/* Kümülasyon (CSHT) ve 24 Saatlik İhtiyaç */}
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Bağlam Duyarlı Yarı Ömür (CSHT) &amp; Tüketim
                </span>
                <div className="flex items-center gap-1.5">
                  <label htmlFor={durationInputId} className="text-[11px] text-slate-500">
                    Süre:
                  </label>
                  <input
                    id={durationInputId}
                    type="number"
                    min="1"
                    max="168"
                    value={infusionDurationHours}
                    onChange={(e) => setInfusionDurationHours(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 px-1.5 py-0.5 text-xs rounded border border-slate-300 dark:border-slate-700 bg-transparent font-semibold font-mono text-center"
                  />
                  <span className="text-[11px] text-slate-500">saat</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Tahmini CSHT:</span>
                    <span
                      className={`font-mono font-bold ${
                        cshtWarningLevel === 'high'
                          ? 'text-rose-600 dark:text-rose-400'
                          : cshtWarningLevel === 'moderate'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      ~{Math.round(cshtEstimateMinutes)} dakika
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{cshtWarningText}</p>
                </div>

                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 font-mono text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-sans">24 Saatlik Fentanil İhtiyacı:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    {consumption24HrMg.toFixed(2)} mg (~{Math.ceil(vialsNeeded500mcg)} ampul [500 mcg/10 mL])
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
