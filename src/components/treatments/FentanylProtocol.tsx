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
  FileText
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

export const FentanylProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HASTA VE İNFÜZYON STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);

  // Çözelti Hazırlama Parametreleri
  const [prepType, setPrepType] = useState<
    'standard_10' | 'standard_20' | 'pediatric_2' | 'undiluted_50' | 'custom_prep'
  >('standard_10');
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
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

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
  // Türkiye'de ticari formlar: 500 mcg / 10 mL ve 100 mcg / 2 mL (her ikisi de 50 mcg/mL)
  let concentrationMcgMl = 10;
  if (prepType === 'standard_10') {
    concentrationMcgMl = 10; // 1 ampul 500 mcg (10 mL) + 40 mL SF = 50 mL'de 10 mcg/mL
  } else if (prepType === 'standard_20') {
    concentrationMcgMl = 20; // 2 ampul 500 mcg (20 mL) + 30 mL SF = 50 mL'de 20 mcg/mL
  } else if (prepType === 'pediatric_2') {
    concentrationMcgMl = 2; // 1 ampul 100 mcg (2 mL) + 48 mL SF = 50 mL'de 2 mcg/mL
  } else if (prepType === 'undiluted_50') {
    concentrationMcgMl = 50; // Saf ampul 50 mcg/mL (500 mcg/10 mL veya 100 mcg/2 mL)
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

  // Tüketim Hesapları (Türkiye ampulleri: 500 mcg / 10 mL ve 100 mcg / 2 mL)
  const consumption24HrMcg = doseMcgHr * 24 + (giveBolus ? totalBolusDoseMcg : 0);
  const consumption24HrMg = consumption24HrMcg / 1000;
  const vialsNeeded500mcg = consumption24HrMcg / 500;
  const vialsNeeded100mcg = consumption24HrMcg / 100;

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

  return (
    <div className="space-y-6">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0)                                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
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
          { id: 'sec-gebelik', label: 'Gebelik & Laktasyon' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="FENTANYL (50 mcg/mL · Ultra-Potent Opioid)"
        confusionRiskWith="REMİFENTANİL · SUFENTANİL · ALFENTANİL · MORFİN"
        antidoteOrRescue="Nalokson HCl (PACU Mikro-Titrasyon: 20–40 mcg IV): Solunum depresyonunda önce hava yolu/BVM ventilasyon; PACU’da 20–40 mcg IV q2–3 dk titre edin (tam ampul puşe edilmez!). Göğüs duvarı rijiditesi BVM ventilasyonunu engelliyorsa kısa etkili NMB (süksinilkolin/roküronyum) veya Nalokson uygulayın. Fentanil süresi naloksondan uzun olduğundan en az 2–4 saat renarkotizasyon takibi zorunludur."
        criticalAlerts={[
          'Kırmızı Reçete & Bağımsız Çift Kontrol: T.C. Sağlık Bakanlığı Renkli Reçete Sistemi kapsamında çift kilitli narkotik dolapta saklanır; devir-teslim ve zayi tutanakları çift imzayla kayıt altına alınır.',
          'mg vs. mcg (1000 Kat) Birim Hatası: 1 mg = 1000 mcg’dir; 1 mg fentanil verilmesi ölümcül doz aşımıdır! Tüm istem ve pompa etiketleri açıkça "mcg" (mikrogram) yazılmalıdır.',
          'Hızlı Yüksek Doz Bolus (> 3–5 mcg/kg veya < 1–2 dk): Akut göğüs duvarı ve vokal kord rijiditesine ("tahta göğüs") yol açarak maske ventilasyonunu imkânsızlaştırabilir.',
          'Uzamış İnfüzyonda Yükselen CSHT & Ölü Boşluk Kazası: > 4–8 saat infüzyonda CSHT 200–300+ dk’ya uzar; fentanil hattı asla hızlı yıkanmaz. MAOİ/Linezolid/SSRI ile Serotonin Sendromu ve opioid-naif olguda TTS flaster yasağı unutulmamalıdır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 1: BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
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
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 font-mono">
                ATC: N01AH01 / N02AB03
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                TALINAT · FENTAVER · FENTANYL-PF · FENTANEST · DUROGESIC · ABSTRAL
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Fentanil Sitrat (TALINAT, FENTAVER, FENTANYL-PF, FENTANEST, DUROGESIC, ABSTRAL)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Yüksek
              potensli, lipofilik, sentetik <strong>μ-opioid (MOR) reseptör agonistidir</strong> (4-anilinopiperidin derivesi).
              ATC kodları: <strong>N01AH01</strong> (Genel anestezikler / opioid anestezikler) ve <strong>N02AB03</strong> (Analjezikler / fenilpiperidin türevleri).
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
        id="sec-pkpd"
        className={`rounded-2xl border transition-all overflow-hidden scroll-mt-20 ${
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
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        title="Kontrendikasyonlar"
        icon={
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500">
            <AlertTriangle className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 4: ENDİKASYONLAR VE OFF-LABEL KULLANIMLAR                     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-endikasyon"
        title="Endikasyonlar ve Off-Label Kullanımlar"
        icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 5: UYGULAMA YOLLARI VE DOZ REJİMLERİ (ERİŞKİN & PEDİATRİK)   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozlar"
        title="Uygulama Yolları ve Doz Rejimleri (Erişkin & Pediatrik)"
        icon={<Syringe className="w-5 h-5 text-indigo-500" />}
        defaultOpen={false}
      >

        {/* 8 TEMEL UYGULAMA YOLU */}
        <div className="mb-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Klinik Uygulama Yolları
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* 1. IV */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="font-bold text-xs text-rose-600 dark:text-rose-400 block mb-1">
                1. İntravenöz (IV) Bolus &amp; İnfüzyon
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Anestezi indüksiyonu/idamesi ve YBÜ infüzyonu için temel yoldur. Onset: 1-2 dk, pik: 3-5 dk. Hızlı puşeler toraks rijiditesi yapabileceğinden <strong>en az 1-2 dakikada</strong> yavaşça uygulanmalıdır.
              </p>
            </div>

            {/* 2. IV-PCA */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 block mb-1">
                2. Hasta Kontrollü Analjezi (IV-PCA)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Postoperatif akut ağrıda hastanın talep ettiği aralıklı bolus titrasyonu (10–20 mcg/talep, kilit 5–10 dk). <em>Opioid-naif olgularda bazal infüzyon kesinlikle açılmaz!</em>
              </p>
            </div>

            {/* 3. IM */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="font-bold text-xs text-cyan-600 dark:text-cyan-400 block mb-1">
                3. İntramüsküler (IM)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Damaryolu gecikmesi olan akut ciddi ağrılı veya preoperatif premedikasyon gereken olgularda (50–100 mcg IM). Onset: 7–15 dk, etki süresi: 1–2 saat.
              </p>
            </div>

            {/* 4. SUBQ */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="font-bold text-xs text-teal-600 dark:text-teal-400 block mb-1">
                4. Subkutan (SUBQ / SC)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Palyatif bakım ve onkoloji hastalarında sürekli veya aralıklı subkutan infüzyon. Vasküler erişimi tükenmiş olgularda stabil emilim sağlar.
              </p>
            </div>

            {/* 5. Transdermal Patch */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="font-bold text-xs text-amber-600 dark:text-amber-400 block mb-1">
                5. Transdermal Flaster (TTS - Patch)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>YALNIZCA KRONİK OPİOİD TOLERAN</strong> kanser ve persistan ağrıda (72 saatte bir flaster). Kararlı duruma 12–24 saatte ulaşır. <em>Akut/postop ağrıda KESİNLİKLE KONTRENDİKEDİR!</em>
              </p>
            </div>

            {/* 6. Intranasal */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="font-bold text-xs text-purple-600 dark:text-purple-400 block mb-1">
                6. İntranazal (IN - MAD İle)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Mukozal Atomizasyon Cihazı (MAD) ile hızlı non-invaziv analjezi. Damaryolu bulunmayan akut travma, yanık ve kırıklarda saf 50 mcg/mL ampulle uygulanır.
              </p>
            </div>

            {/* 7. Epidural */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
              <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 block mb-1">
                7. Epidural (Kurumsal Protokol)
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Doğum eylemi ve torasik/abdominal postoperatif analjezide lokal anesteziklerle kombine. <strong>ZORUNLU KURAL: Mutlaka koruyucu içermeyen (PF) solüsyon kullanılmalıdır!</strong>
              </p>
            </div>

            {/* 8. İntratekal */}
            <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20">
              <span className="font-bold text-xs text-rose-700 dark:text-rose-300 block mb-1">
                8. İntratekal (Spinal)
              </span>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                Spinal anesteziye adjuvan derin viseral analjezi. Tek başına 15–25 mcg, lokal anestezikle kombine 10–15 mcg. <strong>MUTLAKA Koruyucu İçermeyen (PF) Ampul (FENTANYL-PF) kullanılmalıdır!</strong>
              </p>
            </div>

            {/* 9. Oral / Transmukozal */}
            <div className="p-3.5 rounded-xl border border-orange-300 dark:border-orange-900/50 bg-orange-50/40 dark:bg-orange-950/20">
              <span className="font-bold text-xs text-orange-700 dark:text-orange-300 block mb-1">
                9. Oral / Transmukozal (Dilaltı / Bukkal - ABSTRAL)
              </span>
              <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>YALNIZCA KRONİK OPİOİD TOLERAN</strong> kanser ağrısında alevlenen (breakthrough) ataklarda dilaltı (ABSTRAL) veya bukkal pastil. Biyoyararlanım: ~%50 (mukozal emilim + hepatik first-pass). Onset: 10-15 dk. <em>Opioid-naif olguda kontrendikedir!</em>
              </p>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* NALOKSON REVERSAL & AKUT OPİOİD TOKSİSİTESİ YÖNETİMİ UYARISI      */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div
          className={`mb-6 p-4 rounded-xl border ${
            isDark
              ? 'bg-rose-950/25 border-rose-800/60 text-rose-200'
              : 'bg-rose-50 border-rose-300 text-rose-950 shadow-xs'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500 text-white shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-rose-800 dark:text-rose-200">
                  Nalokson Reversal ve Akut Opioid Solunum Depresyonu / Toksisite Yönetimi
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-rose-500 text-white">
                  Acil Antidot
                </span>
              </div>
              <p className="text-xs leading-relaxed">
                • <strong>Spontan Soluyan Hastada Aşırı Sedasyon &amp; Solunum Depresyonu:</strong> <strong>0.04 – 0.1 mg IV</strong> (40 – 100 mcg) yavaş titrasyonla 2-3 dakikada bir tekrarlanır. Amaç tüm analjeziyi silmeden yeterli spontan solunumu ve havayolu refleksini kazanmaktır (yüksek ani doz akut sempatik fırtınaya, şiddetli cerrahi ağrı krizine ve non-kardiyojenik akciğer ödemine yol açabilir).
              </p>
              <p className="text-xs leading-relaxed">
                • <strong>Ağır Apne, Solunum Durması veya Kardiyak Arrest:</strong> <strong>0.4 – 2.0 mg IV</strong> (veya IM/IO) hızlı puşe uygulanır. 2-3 dakikada bir yanıt alınıncaya dek tekrarlanır (maksimum 10 mg&apos;a kadar).
              </p>
              <p className="text-xs leading-relaxed font-semibold text-rose-900 dark:text-rose-100">
                ⚠️ <strong>Kritik Re-Narkotizasyon Uyarısı:</strong> Naloksonun eliminasyon yarı ömrü kısadır (t½ ~30-90 dk); fentanilin etkisi ve doku redistribüsyonu ise çok daha uzun sürer (t½ ~2-4 saat, uzamış infüzyonda doku kümülasyonu ile daha da uzar). Nalokson etkisi bittiğinde hasta tekrar apne ve komaya girebilir! Hasta <strong>en az 2 – 4 saat yakın monitörizasyonda tutulmalı</strong>, gerekirse sürekli nalokson IV infüzyonu (saatte uyanmayı sağlayan başlangıç dozunun 2/3&apos;ü) başlanmalıdır.
              </p>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* DOZ REJİMLERİ: ERİŞKİN & PEDİATRİK                               */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Erişkin Doz Rejimleri */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Erişkin Doz Rejimleri</span>
              </span>

              <div className="space-y-2.5 text-slate-700 dark:text-slate-300">
                {/* a) Akut Ağrı IV-PCA */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Akut Ağrı IV-PCA (Hasta Kontrollü Analjezi):
                  </span>
                  <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold space-y-0.5 mt-0.5">
                    <div>Talep Bolusu: 10 – 20 mcg IV | Kilit Süresi (Lockout): 5 – 10 dakika</div>
                    <div>Konsantrasyon: 10 – 20 mcg/mL | 4 Saatlik Limit: 200 – 300 mcg</div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    <strong>Güvenlik Kuralı:</strong> Opioid-naif hastalarda bazal infüzyon KESİNLİKLE açılmamalıdır (apne ve mortalite riski). Yalnızca seçilmiş opioid-toleran olgularda düşük bazal hız düşünülebilir.
                  </p>
                </div>

                {/* b) PACU Akut Postoperatif Ağrı */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    PACU / Akut Postoperatif Ağrı Titrasyonu:
                  </span>
                  <div className="space-y-1 mt-1 font-mono text-xs">
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>IM Dozu:</strong> <span className="font-bold text-cyan-600 dark:text-cyan-400">50 – 100 mcg IM</span> (damaryolu sorunu veya stabil derlenmede; onset 10-15 dk)
                    </div>
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>Orta Şiddette Ağrı (IV):</strong> <span className="font-bold text-rose-600 dark:text-rose-400">25 – 50 mcg IV (0.5 – 1.0 mcg/kg)</span> yavaş puşe, her 5-10 dk titre edilir
                    </div>
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>Ciddi Şiddette Ağrı (IV):</strong> <span className="font-bold text-rose-600 dark:text-rose-400">50 – 100 mcg IV (1.0 – 2.0 mcg/kg)</span> yavaş puşe (≥1-2 dk), yakın solunum takibi ile
                    </div>
                  </div>
                </div>

                {/* c) Akut Non-Operatif Ciddi Ağrı */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Akut Non-Operatif Ciddi Ağrı (Acil / Travma / Yanık):
                  </span>
                  <div className="space-y-1 mt-1 font-mono text-xs">
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>IV Dozu:</strong> <span className="font-bold text-rose-600 dark:text-rose-400">25 – 50 mcg IV (0.5 – 1.0 mcg/kg)</span> yavaş puşe, her 5-10 dk yanıta göre titre edilir
                    </div>
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>IM Dozu:</strong> <span className="font-bold text-cyan-600 dark:text-cyan-400">50 – 100 mcg IM</span> (damaryolu açılamayan veya geciken olgularda)
                    </div>
                  </div>
                </div>

                {/* d) Kronik Ağrı - Transdermal Patch */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Kronik Ağrı &amp; Kanser Ağrısı (Transdermal Patch - TTS):
                  </span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    25 – 100 mcg/saat flaster (Her 72 saatte bir flaster değişimi)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                    <strong>KESİNLİKLE SADECE OPİOİD TOLERAN HASTALARDA:</strong> Günde en az 60 mg oral morfin eşdeğerini en az 1 haftadır alan hastalar içindir. Opioid-naif olguda ölümcül apneye yol açar. Kararlı düzeye 12–24 saatte ulaşır. Flaster üzerine sıcak kompres/ısıtıcı uygulanmaz (letal hızlı salınım riski).
                  </p>
                </div>

                {/* e) Yoğun Bakım Analgosedasyonu */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Yoğun Bakım Analgosedasyonu (Sürekli İnfüzyon):
                  </span>
                  <div className="space-y-0.5 mt-0.5 font-mono text-xs">
                    <div className="text-rose-600 dark:text-rose-400 font-bold">
                      Yükleme Dozu: 0.5 – 1.5 mcg/kg IV Yavaş Bolus (≥ 2-3 dakikada)
                    </div>
                    <div className="text-rose-600 dark:text-rose-400 font-bold">
                      İdame İnfüzyonu: 0.5 – 2.0 mcg/kg/saat (25 – 150 mcg/saat)
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Hemodinamik instabilite veya şokta yükleme dozu 0.25-0.5 mcg/kg&apos;a düşürülür. Uzayan infüzyonlarda (&gt;48 saat) yağ dokusunda kümülasyona ve ekstübasyon gecikmesine dikkat edilmelidir.
                  </p>
                </div>

                {/* f) Prosedürel Sedasyon ve Analjezi */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Prosedürel Sedasyon ve Analjezi (PSA):
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    0.5 – 1.0 mcg/kg IV (25 – 50 mcg) yavaş puşe (1-2 dk)
                  </span>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 space-y-0.5">
                    <p>
                      • <strong>Sedatif Kombinasyonu Uyarısı:</strong> Propofol veya Midazolam ile kombine edildiğinde sinerjistik apne riski nedeniyle fentanil ve sedatif ajan dozu <strong>%30 – 50 oranında azaltılmalıdır</strong>.
                    </p>
                    <p>
                      • <strong>Total Doz Uyarısı:</strong> Entübe olmayan spontan soluyan hastada işlem boyu kümülatif doz <strong>2 – 3 mcg/kg veya 150 – 200 mcg tavanını aşmamalıdır</strong>.
                    </p>
                  </div>
                </div>

                {/* g) Genel Anestezi İndüksiyonu */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Genel Anestezi İndüksiyonu:
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    25 ile 100 mcg IV (ya da 0.5 – 1.0 mcg/kg)
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Hemodinamik instabiliteyi ve göğüs duvarı rijiditesini önlemek için en az 30 – 60 saniyede yavaşça enjekte edilir.
                  </p>
                </div>

                {/* h) Genel Anestezi İdamesi */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Genel Anestezi İdamesi:
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    Her 30-45 dk 25 – 50 mcg IV ek doz
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Cerrahi uyarana, kan basıncı ve nabız yanıtına göre titre edilir.
                  </p>
                </div>

                {/* i) Nöroaksiyel Analjezi */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Nöroaksiyel Analjezi (Epidural &amp; İntratekal):
                  </span>
                  <div className="space-y-1 mt-1 font-mono text-xs">
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>Epidural:</strong> <span className="font-bold text-emerald-600 dark:text-emerald-400">Kurumsal protokollere göre</span> (genellikle 1-2 mcg/mL derişimde lokal anestezikle kombine)
                    </div>
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>İntratekal (Spinal):</strong>
                      <div className="pl-3 space-y-0.5 mt-0.5">
                        <div>- Tek Başına: <span className="font-bold text-rose-700 dark:text-rose-300">15 – 25 mcg</span></div>
                        <div>- Lokal Anestezik ile Kombine: <span className="font-bold text-rose-700 dark:text-rose-300">10 – 15 mcg</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 p-2 rounded bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-800 dark:text-rose-200 font-semibold leading-relaxed">
                    🛡️ <strong>KORUYUCU İÇERMEYEN (PF) SOLÜSYON ŞARTI:</strong> Nöroaksiyel (epidural ve intratekal) uygulamalarda MUTLAKA koruyucu madde içermeyen formülasyon (örn. FENTANYL-PF veya koruyucusuz ampul) kullanılmalıdır. Benzil alkol veya paraben gibi koruyucular nörotoksiktir ve kalıcı araknoidite yol açar!
                  </div>
                </div>
              </div>
            </div>

            {/* Pediatrik Doz Rejimleri */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2.5">
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Pediatrik Doz Rejimleri</span>
              </span>

              <div className="space-y-2.5 text-slate-700 dark:text-slate-300">
                {/* a) Pediatrik IV-PCA */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Pediatrik IV-PCA (Hasta Kontrollü Analjezi):
                  </span>
                  <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold space-y-0.5 mt-0.5">
                    <div>Talep Bolusu: 0.25 – 0.5 mcg/kg IV</div>
                    <div>Kilit Süresi (Lockout): 5 – 10 dakika</div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                    Pediatrik olguda solunum depresyonu riskini en aza indirmek için bazal infüzyon rutin olarak uygulanmaz.
                  </p>
                </div>

                {/* b) RSI Öncesi Premedikasyon */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Hızlı Seri Entübasyon (RSI) Premedikasyonu:
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    1.0 – 2.0 mcg/kg IV Yavaş Puşe
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    Laringoskopi ve entübasyonun tetiklediği sempatik hipertansiyon, taşikardi ve KİBAS fırlamasını baskılamak için entübasyondan 2–3 dakika önce verilir.
                  </p>
                </div>

                {/* e) Pediatrik Genel Anestezi */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="font-semibold block text-slate-900 dark:text-slate-100">
                    Pediatrik Genel Anestezi (İndüksiyon &amp; İdame):
                  </span>
                  <div className="space-y-1 mt-1 font-mono text-xs">
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>İndüksiyon:</strong> <span className="font-bold text-rose-600 dark:text-rose-400">1.0 – 2.0 mcg/kg IV yavaş puşe</span>
                    </div>
                    <div className="text-slate-700 dark:text-slate-200">
                      • <strong>İdame:</strong> <span className="font-bold text-rose-600 dark:text-rose-400">1.0 – 2.0 mcg/kg/saat IV sürekli infüzyon</span> (veya gereğinde 0.5 – 1.0 mcg/kg IV PRN ek boluslar)
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                    İnhalasyonel ajanlarla (sevofluran) dengeli anestezide cerrahi uyarana göre titre edilir.
                  </p>
                </div>

                {/* Yenidoğan ve İnfant Uyarısı */}
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300">
                  <span className="font-bold text-xs block mb-0.5">
                    Yenidoğan ve Küçük İnfantlar (&lt; 1 Yaş) İçin Dikkat:
                  </span>
                  <p className="text-[11px] leading-relaxed">
                    Opioid kaynaklı vagal bradikardiye çok duyarlıdırlar; kalp debileri atım hacmine değil hızına bağımlıdır. Doz <strong>0.5 – 1.0 mcg/kg</strong> ile sınırlandırılmalı ve <strong>Atropin (0.02 mg/kg)</strong> hazır bulundurulmalıdır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 6: ⚡ FENTANİL İNFÜZYON POMPASI & DOZ HESAPLAYICISI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="Fentanil İnfüzyon Pompası & Doz Hesaplayıcısı"
        subtitle="Sürekli IV infüzyon hızı (mL/saat), eşzamanlı birim dönüşümleri (mcg/kg/saat, mcg/saat, mcg/kg/dk) ve isteğe bağlı yükleme bolus hesabı"
        icon={
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-rose-500 text-white shadow-sm">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
        }
        badge={
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full font-bold bg-rose-500/20 text-rose-600 dark:text-rose-400">
            IV İnfüzyon &amp; Birim Dönüştürücü
          </span>
        }
        containerClassName={
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-rose-950/20 to-slate-900 border-rose-900/40'
            : 'bg-gradient-to-br from-white via-rose-50/40 to-slate-50 border-rose-200 shadow-md'
        }
        defaultOpen={false}
      >
        <div className="flex items-center justify-end gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <MonographCopyButton
            isDark={isDark}
            getText={() =>
              [
                'FENTANİL İNFÜZYON ÖZETİ',
                `Hesaplama Ağırlığı (LBW/IBW): ${weightKg} kg`,
                `Çözelti Konsantrasyonu: ${concentrationMcgMl.toFixed(1)} mcg/mL`,
                `İdame Dozu: ${doseMcgKgHr.toFixed(2)} mcg/kg/saat (${doseMcgHr.toFixed(1)} mcg/saat | ${doseMcgKgMin.toFixed(3)} mcg/kg/dk)`,
                `Pompa Akış Hızı: ${infusionRateMlHr.toFixed(2)} mL/saat`,
                giveBolus
                  ? `Yükleme Bolus: ${bolusDoseMcgKg} mcg/kg (${totalBolusDoseMcg.toFixed(1)} mcg / ${totalBolusVolumeMl.toFixed(2)} mL, ${bolusDurationMin} dk)`
                  : 'Yükleme Bolus: Devre dışı',
                `Tahmini CSHT (${infusionDurationHours} sa): ~${Math.round(cshtEstimateMinutes)} dk`,
                `24 Saatlik Tüketim: ${consumption24HrMg.toFixed(2)} mg (~${Math.ceil(vialsNeeded500mcg)} adet 500 mcg/10 mL ampul)`,
              ].join('\n')
            }
          />
          <button
            type="button"
            onClick={() => {
              setWeightKg(70);
              setPrepType('standard_10');
              setDoseUnit('mcg_kg_hr');
              setCustomDoseValue(1.0);
              setGiveBolus(false);
              setBolusDoseMcgKg(1.0);
              setBolusDurationMin(2);
              setInfusionDurationHours(12);
            }}
            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-colors"
            title="Varsayılan Değerlere Sıfırla"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
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
              <div className="mt-2.5">
                <ObesityDosingScaler
                  isDark={isDark}
                  drugName="Fentanil"
                  recommendedScalar="LBW"
                  rationale="SOBA / Miller's Anesthesia: Fentanil yüksek lipofilik yapısıyla obezitede yağ dokusunda birikerek uzamış solunum depresyonu yapar; başlangıç ve idame dozları Yağsız Vücut Ağırlığına (LBW) göre titre edilmelidir."
                  currentWeightKg={weightKg}
                  onApplyWeight={(w) => setWeightKg(Math.max(3, Math.min(250, w)))}
                />
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
                <option value="standard_10">1 ampul (500 mcg / 10 mL) + 40 mL SF = 50 mL (10 mcg/mL - Standart YBÜ)</option>
                <option value="standard_20">2 ampul (500 mcg / 10 mL x2) + 30 mL SF = 50 mL (20 mcg/mL - Konsantre)</option>
                <option value="pediatric_2">1 ampul (100 mcg / 2 mL) + 48 mL SF = 50 mL (2 mcg/mL - Pediatrik / Düşük Doz)</option>
                <option value="undiluted_50">Saf Ampul (50 mcg/mL - 500 mcg/10 mL veya 100 mcg/2 mL)</option>
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

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 font-mono text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-sans">24 Saatlik Fentanil İhtiyacı:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-right">
                    {consumption24HrMg.toFixed(2)} mg (~{Math.ceil(vialsNeeded500mcg)} ampul [500 mcg/10 mL] veya ~{Math.ceil(vialsNeeded100mcg)} ampul [100 mcg/2 mL])
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0)                     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Fentanil Sitrat 100 mcg / 2 mL Ampul (Talinat · Fentaver · Fentanest · Fentanyl-PF)',
            presentation: '2 mL berrak enjeksiyonluk çözelti içeren cam ampul (IV / IM / nöroaksiyel için koruyucusuz PF form)',
            concentration: '50 mcg/mL (0,05 mg/mL)',
            saltOrBaseNote: '50 mcg fentanil baza eşdeğer 78,5 mcg fentanil sitrat/mL içerir. Nöroaksiyel (spinal/epidural) uygulamada MUTLAKA koruyucusuz (PF) ampul doğrulanmalıdır.',
            alertLevel: 'standard',
          },
          {
            name: 'Fentanil Sitrat 500 mcg / 10 mL Ampul / Flakon (Talinat · Fentaver)',
            presentation: '10 mL berrak enjeksiyonluk çözelti (ameliyathane & YBÜ infüzyon hazırlığı için; TR’de 1000 mcg/20 mL formu ruhsatlı değildir)',
            concentration: '50 mcg/mL (0,05 mg/mL)',
            saltOrBaseNote: 'Tek ampulde 500 mcg (0,5 mg) bulunur; erişkin opioid-naif hastada yanlışlıkla tek puşede verilmesi fatal apne ve göğüs duvarı rijiditesi yapar!',
            alertLevel: 'high',
          },
          {
            name: 'Transdermal Flaster (Durogesic TTS: 12 · 25 · 50 · 75 · 100 mcg/saat)',
            presentation: '72 saatlik sürekli salım sağlayan transdermal matriks flaster',
            concentration: '12 – 100 mcg/saat',
            saltOrBaseNote: 'YALNIZCA kronik opioid-toleran hastalarda (≥ 60 mg/gün oral morfin eşdeğeri ≥ 1 hafta) kullanılır; akut/postop ağrıda KESİNLİKLE KONTRENDİKEDİR.',
            alertLevel: 'high',
          },
          {
            name: 'Dilaltı Tablet (Abstral 100 · 200 · 400 mcg)',
            presentation: 'Kronik kanser ağrısı alevlenmeleri (breakthrough pain) için transmukozal sublingual tablet',
            concentration: '100 – 400 mcg/tablet',
            saltOrBaseNote: 'Opioid-naif olguda kesinlikle kontrendikedir; diğer transmukozal formlarla 1:1 mcg dönüştürülmez.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Standart Erişkin YBÜ / PCA (10 mcg/mL): 1 ampul 500 mcg (10 mL) + 40 mL %0,9 NaCl = 50 mL perfüzör enjektörü.',
          'Konsantre / Sıvı Kısıtlamalı YBÜ (20 mcg/mL): 2 ampul 500 mcg (20 mL) + 30 mL %0,9 NaCl = 50 mL perfüzör enjektörü.',
          'Pediatrik / Düşük Doz Titrasyon (2 mcg/mL): 1 ampul 100 mcg (2 mL) + 48 mL %0,9 NaCl = 50 mL perfüzör enjektörü.',
          'Saf Konsantre (50 mcg/mL): Seyreltilmeden 500 mcg/10 mL veya 100 mcg/2 mL ampuller (yalnızca ciddi sıvı kısıtlamalı ARDS/KY veya intranazal MAD uygulamasında).',
        ]}
        concentrationTrapWarning="Her iki Türkiye ampulü de 50 mcg/mL konsantrasyondadır ancak toplam içerik 5 kat farklıdır (2 mL = 100 mcg vs 10 mL = 500 mcg). Tüm istemler daima 'mcg' (asla 'mg' değil) olarak yazılmalı, enjektör etiketine nihai konsantrasyon (10, 20 veya 50 mcg/mL) açıkça işlenmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="peripheral-ok"
        accessSummary="Periferik veya santral IV hattan uygulanabilir; ancak sürekli YBÜ infüzyonunda ölü boşluk (dead-space) kazasını önlemek için ayrı, düşük ölü boşluklu ve çek-valfli lümen tercih edilir. Fentanil giden hat asla hızlı sıvı bolusu ile yıkanmamalıdır."
        phRange="4.0 – 7.5 (Hafif Asidik)"
        osmolalityNote="İzotonik seyreltmede doku vezikanı değildir; yüksek lipofilisitesi nedeniyle PVC torba/setlere minimal adsorpsiyon gösterebilir ancak klinik olarak ihmal edilebilir düzeydedir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (İzotonik SF) — 24–48 saat stabil',
          '%5 Dekstroz (D5W) — 24–48 saat stabil',
          'Ringer Laktat — 24 saat stabil',
        ]}
        stabilityNote="SF veya D5W içinde hazırlanan 2–50 mcg/mL çözeltiler oda sıcaklığında (20–25 °C) en az 24–48 saat kimyasal olarak stabildir; ışıktan korunması önerilir."
        ySiteCompatible={[
          'Propofol',
          'Midazolam',
          'Deksmedetomidin',
          'Norepinefrin',
          'Epinefrin',
          'Dopamin',
          'Dobutamin',
          'Ketamin',
          'Roküronyum',
          'Cisatrakuryum',
          'Lidokain',
          'Heparin',
        ]}
        ySiteIncompatible={[
          'Tiyopental (alkali presipitasyon)',
          'Metoheksital (alkali presipitasyon)',
          'Fenitoin (çökelme)',
          'Azitromisin',
          'Sodyum Bikarbonat (yüksek konsantrasyonda çökelme riski)',
        ]}
        extravasationProtocol="Ekstravazasyon dokuda vezikan nekroz yapmaz; ancak asıl hayati tehlike 'ölü boşluk (dead-space) yıkaması'dır. Fentanil infüzyonu verilen hat hızlı SF bolusuyla yıkanırsa lümende bekleyen ilaç tek seferde giderek ani apne ve göğüs duvarı rijiditesine yol açabilir — infüzyon bitiminde uzatma hattını ayırın veya aspire ederek temizleyin."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 7: BÖBREK YETMEZLİĞİNDE DOZ REVİZYONU KILAVUZU */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-organ"
        title="Böbrek Yetmezliğinde Doz Revizyonu Kılavuzu"
        subtitle="GFR kademeleri, Hemodiyaliz, Periton Diyalizi ve Sürekli Renal Replasman (CRRT) kuralları"
        icon={
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500/10 text-cyan-500">
            <Activity className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 8: KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONU */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        title="Karaciğer Yetmezliğinde Doz Revizyonu (Child-Pugh Sınıflaması)"
        subtitle="CYP3A4 metabolizması bozulması, uzamış yarı ömür ve hepatik ensefalopati risk yönetimi"
        icon={
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-500">
            <Activity className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >

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
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="%50 Başlangıç Doz Azaltımı"
        geriatricPoints={[
          '>65 yaş ve kırılgan (frailty) hastalarda hepatik kan akımı ve CYP3A4 klirensi %30–50 azalırken santral μ-opioid duyarlılığı (EC50) belirgin artar; terminasyon yarı ömrü belirgin uzar.',
          'Tüm başlangıç IV bolusları (ör. 0,5–1 mcg/kg veya 25–50 mcg) ve sürekli infüzyon hızları en az %50 azaltılmalı, titrasyon aralıkları uzatılmalıdır.',
          'Yaşlılarda uzun süreli infüzyon ve postoperatif PCA’da uzamış sedasyon, deliryum ve geç solunum depresyonu riski yüksek olduğundan sık RASS/solunum takibi gerekir.',
        ]}
        obesityWeightScalarBadge="LBW (Tercih) · Uzun İnfüzyonda Kümülasyon!"
        obesityPoints={[
          'SOBA ve Miller’s Anesthesia kılavuzlarına göre fentanilin santral dağılımı ve erken pik konsantrasyonu Yağsız Vücut Ağırlığı (LBW) ile koreledir; indüksiyon/bolus ve başlangıç infüzyonları LBW (veya IBW) üzerinden hesaplanmalıdır.',
          'Yüksek lipofilisitesi nedeniyle obez hastalarda tekrarlayan boluslar veya > 2–4 saatlik infüzyonlar geniş adipoz dokuda hızla birikerek bağlam duyarlı yarı ömrü (CSHT) 4–6+ saate çıkarır.',
          'TBW ile dozlama postoperatif uzamış apne, üst hava yolu obstrüksiyonu (OSA) ve ekstübasyon gecikmesine yol açar; uzun vakalarda remifentanil veya multimodal opioid-sparing rejimler tercih edilmelidir.',
        ]}
        clinicalNote="Yukarıdaki etkileşimli hesaplayıcı içindeki Obezite Doz Ölçekleyici (SOBA / Miller's) kullanılarak hastanın LBW değeri tek tıkla pompa hesabına aktarılabilir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 9: GEBELİK VE LAKTASYON KILAVUZU                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-gebelik"
        title="Gebelik ve Laktasyon Kılavuzu"
        subtitle="FDA / TGA gebelik kategorisi, plasental geçiş, neonatal solunum depresyonu ve emzirme yönetimi"
        icon={
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-pink-500/10 text-pink-500">
            <HeartPulse className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              1. FDA / TGA Gebelik Sınıfı &amp; Teratojenite
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Kategori:</strong> FDA Kategori C (Uzamış kullanımda veya terme yakın yüksek dozlarda Kategori D).<br />
              • <strong>Teratojenite:</strong> İnsanlarda direkt majör konjenital malformasyon riski saptanmamıştır; ancak gebelikte kronik kullanım fetal büyüme geriliği, erken doğum ve neonatal yoksunluk sendromu (NOWS) riski taşır.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              2. Plasental Geçiş &amp; Doğum Eylemi (L&amp;D)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Hızlı Plasental Geçiş:</strong> Yüksek lipofilisitesi nedeniyle saniyeler içinde plasentayı geçer (fetal/maternal oranı ~0.8-1.0).<br />
              • <strong>Nöroaksiyel Kullanım (Güvenli):</strong> Doğum eyleminde epidural veya kombine spinal-epidural (CSE) ile 10-25 mcg fentanil lokal anesteziklerle kombine edildiğinde maternal-fetal hemodinamik stabilite mükemmeldir.<br />
              • <strong>Sistemik IV Risk:</strong> Doğumdan hemen önce (&lt;2 saat) yüksek doz sistemik IV fentanil uygulanırsa yenidoğanda solunum depresyonu (düşük Apgar) ve toraks rijiditesi gelişebilir. Doğumhanede neonatal <strong>Nalokson</strong> hazır olmalıdır.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block text-xs">
              3. Laktasyon, Anne Sütü &amp; Emzirme Güvenliği
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              • <strong>Süte Geçiş Düşüktür:</strong> Relatif infant dozu (RID) &lt;%3 düzeyindedir (klinik güvenlilik eşiği olan %10&apos;un çok altındadır).<br />
              • <strong>Emzirmeye Dönüş:</strong> Cerrahi veya doğum sonrası tek bir anestezi indüksiyon/bolus dozunun ardından anne tamamen uyanıp koopere olduğunda doğrudan emzirmeye başlayabilir; sütü sağıp dökme (&quot;pump &amp; dump&quot;) rutini önerilmez.<br />
              • <strong>Tekrarlayan Doz Uyarısı:</strong> YBÜ&apos;de veya postop IV-PCA&apos;de tekrarlayan yüksek dozlarda bebeğin aşırı sedasyon, emme güçlüğü ve apne açısından izlenmesi gerekir.
            </p>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* BÖLÜM 10: ÖNEMLİ OLUMSUZ ETKİLER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-olumsuz"
        title="Önemli Olumsuz Etkiler (Adverse Effects)"
        subtitle="Göğüs rijiditesi (Wooden Chest), solunum depresyonu, bradikardi, tolerans ve yoksunluk"
        icon={
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-500/10 text-rose-500">
            <Flame className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >

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
              YBÜ&apos;de &gt;5-7 gün süren sürekli infüzyonlarda reseptör duyarsızlaşması ve akut tolerans gelişir.
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
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR (v4.0)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Kümülasyon & Weaning / Ekstübasyon Gecikmesi (Yükselen CSHT)',
            detail:
              'Remifentanilin tersine fentanil hepatik CYP3A4 ile metabolize edilir ve geniş adipoz dokuya dağılır. YBÜ’de > 48 saat infüzyon alan hastalarda uyanma ve spontan solunumun dönüşü 4–12 saat sürebilir; weaning öncesi erken azaltım veya kısa etkili alternatife geçiş planlanmalıdır.',
          },
          {
            title: 'Hızlı IV Puşeden Kaçınma Kuralı (≥ 1–2 Dakika)',
            detail:
              'Hızlı verilen 100 mcg dahi erişkinde ciddi göğüs duvarı ve vokal kord rijiditesine ("tahta göğüs") yol açarak maske ventilasyonunu imkânsızlaştırabilir. Tüm IV boluslar en az 1–2 dakikaya yayılarak yavaşça uygulanmalıdır.',
          },
          {
            title: 'Güçlü CYP3A4 İnhibitörleri ile Ölümcül Toksisite',
            detail:
              'Klaritromisin, flukonazol, vorikonazol, diltiazem, verapamil ve ritonavir gibi güçlü CYP3A4 inhibitörleri fentanil klirensini bloke ederek standart dozlarda dahi 2–3 kat plazma yükselmesine ve fatal apneye yol açabilir.',
          },
          {
            title: 'Morfine Göre Histamin Avantajı (Astım / Hemodinamik İnstabilite)',
            detail:
              'Klinik dozlarda mast hücresi histamin deşarjına yol açmaz; reaktif hava yolu hastalığı (astım, KOAH) veya hemodinamik açıdan instabil septik/kardiyak olgularda morfine kıyasla çok daha güvenlidir.',
          },
          {
            title: 'Yatak Başı Nalokson & Renarkotizasyon Gözlemi',
            detail:
              'Fentanil uygulanan her alanda Nalokson (40 mcg/mL sulandırılmış), BVM ve entübasyon ekipmanı hazır bulundurulmalıdır. Fentanilin etki süresi naloksondan (30–60 dk) uzun olduğundan reversal sonrası en az 2–4 saat monitörlü izlem şarttır.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (7-TM μ-Opioid Reseptörü [MOR / OPRM1], Lipofilik Membran Partisyonu & SERT Etkileşimi)',
          summary:
            'Fentanil (N-fenil-N-[1-(2-feniletil)piperidin-4-il]propanamid), presinaptik ve postsinaptik nöron membranındaki 7-transmembran (7-TM) G-proteini kenetli μ-opioid reseptörünün (MOR / OPRM1) ortosterik bağlanma cebine çok yüksek afiniteyle (Ki ≈ 0,39–1,35 nM; morfine göre 80–100 kat klinik potens) bağlanan yüksek lipofilik sentetik tam agonisttir. Oktanol/su partisyon katsayısı ~813 (morfinin ~1,4’üne kıyasla ~600–1000 kat yüksek) ve pKa değeri 8,43’tür; fizyolojik pH’ta (7,4) ~%8,5 non-iyonize fraksiyonu bulunsa da aşırı lipid çözünürlüğü sayesinde nöronal fosfolipid çift katmanını ve kan-beyin bariyerini hızla geçer (t½ke0 ≈ 4,7–6,6 dk) (Miller’s 10th Ed. / Stoelting’s 6th Ed.).',
          points: [
            'Presinaptik & Postsinaptik Nöron Membranı MOR (OPRM1) Bağlanma Cebi: Spinal kord arka boynuz lamina I/II (substantia gelatinosa), primer afferent C/Aδ terminalleri, periaquaduktal gri cevher (PAG), rostral ventromedüller (RVM) çekirdekler ve pre-Bötzinger solunum kompleksindeki 7-TM MOR reseptörlerinin transmembran heliks cebine (Asp147 tuz köprüsü) bağlanarak heterotrimerik Gαi/o proteinlerini aktive eder.',
            'Yüksek Lipofilik Membran Difüzyonu & Akciğer İlk-Geçiş Sekestrasyonu: IV enjeksiyon sonrası lipofilik fentanil moleküllerinin ~%75’i pulmoner kapiller endotel zarında ilk geçişte geçici olarak tutulur (pulmoner first-pass uptake) ve ardından sistemik dolaşıma salınarak beyin, kalp ve geniş periferik kas/adipoz doku membranlarına (Vdss ≈ 3–5 L/kg) dağılır.',
            'Presinaptik Serotonin Taşıyıcısı (SERT / 5-HTT) & 5-HT1A Etkileşimi: Fenilpiperidin (4-anilinopiperidin) kimyasal iskeleti nedeniyle morfin/hidromorfon gibi fenantren opioidlerden farklı olarak nöronal membrandaki Serotonin Geri Alım Taşıyıcısına (SERT) zayıf-orta afiniteyle bağlanır ve 5-HT1A otoreseptör etkileşimi gösterir → MAOİ, Linezolid veya SSRI/SNRI varlığında sinaptik 5-HT konsantrasyonunu artırarak Serotonin Sendromu tetikleyebilir.',
            'Sıfır Mast Hücresi MRGPRX2 Aktivasyonu (Histamin Salınımı Yokluğu): Morfin ve meperidinin aksine kutanöz ve vasküler mast hücresi membranındaki MRGPRX2 (Mas-ilişkili GPCR) reseptörlerini uyarmaz; bu sayede plazma histamin deşarjına, IgE-bağımsız anaflaktoid vazodilatasyona veya bronkokonstriksiyona yol açmaz.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'MOR’un Gαi/o ve Gβγ alt birimlerini ayrıştırmasıyla başlayan hücre içi sinyal iletimi; nosiseptif nöronlarda eksitatör nörotransmitter ekzositozunu ve aksiyon potansiyeli ateşlemesini üç ana elektrokimyasal mekanizmayla susturur:',
          points: [
            'Gαi/o → Adenilat Siklaz (AC) İnhibisyonu → cAMP↓ → PKA↓ & HCN Blokajı: Aktif Gαi alt birimi membrana bağlı Adenilat Siklaz enzimini inhibe ederek hücre içi cAMP düzeyini düşürür. Azalan Protein Kinaz A (PKA) aktivitesi; voltaj kapılı Na⁺ (Nav1.7/1.8) ve TRPV1 kanallarının fosforilasyonunu azaltır, ayrıca hiperpolarizasyonla aktive olan siklik nükleotid kapılı (HCN) pacemaker kanallarının açılmasını baskılar.',
            'Presinaptik Gβγ → N/P/Q-Tipi Ca²⁺ (Cav2.2) Kanal Kapanması & SNARE Vezikül Blokajı: Serbestleşen Gβγ alt birimi, spinal arka boynuz lamina I/II’deki C ve Aδ nosiseptör akson uçlarında voltaj kapılı N-tipi (Cav2.2) kalsiyum kanallarına doğrudan bağlanarak depolarizasyon kaynaklı Ca²⁺ girişini bloke eder. Sitozolik Ca²⁺ yükselmeyince sinaptotagmin-SNARE kompleksi aktive olamaz ve sinaptik aralığa Glutamat, P Maddesi (Substance P) ile CGRP vezikül ekzositozu durur.',
            'Postsinaptik Gβγ → GIRK (Kir3.1/3.2) Kanal Açılması → K⁺ Efluksu & Hiperpolarizasyon: Postsinaptik spinotalamik traktus projeksiyon nöronlarında, locus coeruleus’ta ve pre-Bötzinger solunum nöronlarında Gβγ kompleksi içeri doğrultucu GIRK (Kir3) potasyum kanallarını açar. Hücre dışına K⁺ akışı membran potansiyelini hiperpolarize ederek nöronun uyarılma eşiğini yükseltir.',
            'GRK2/3 Fosforilasyonu, β-Arrestin-2 & Kronik cAMP Süperaktivasyonu: Uzamış YBÜ infüzyonlarında (>48–72 saat) G-proteini kenetli reseptör kinazlar (GRK2/3) MOR’un C-terminalini fosforiller ve β-arrestin-2 bağlanmasıyla reseptör klatrin kaplı veziküllerle hücre içine (endositoz) çekilir. Hücre buna kompansatuar olarak Adenilat Siklaz ve PKA sentezini yukarı regüle eder (infüzyon aniden kesildiğinde veya Nalokson verildiğinde "cAMP overshoot" ile akut yoksunluk ve sempatik fırtına patlak verir).',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Spinal Arka Boynuz, Beyin Sapı & Serebral Vasküler Yatak → SSS & Analjezi',
            tissueTarget: 'Lamina I/II · PAG–RVM · Locus Coeruleus · Edinger-Westphal',
            accent: 'indigo',
            points: [
              'Spinal & Supraspinal Analjezi + Nöroaksiyel Segmental Etki: Arka boynuz lamina I/II’de asendan ağrı iletimini keserken PAG–RVM GABAerjik internöronlarını inhibe ederek desendan inhibitör yolağı çalıştırır. Epidural/intratekal (koruyucusuz PF form!) uygulandığında yüksek lipofilisitesiyle BOS’tan hızla spinal kord substantia gelatinosa’ya geçer; morfine göre çok daha hızlı (5–10 dk) segmental analjezi sağlar ve rostral BOS yayılımı az olduğundan geç (>12 sa) solunum depresyonu riski düşüktür.',
              'Analgosedasyon vs Kortikal Hipnoz Ayrımı: Locus coeruleus ve ARAS üzerindeki MOR inhibisyonuyla sedasyon ve endotrakeal tüp toleransı sağlar; ancak GABA-A klorür kanallarını açmadığından tek başına yüksek dozlarda dahi güvenilir amnezi ve genel anestezi hipnozu OLUŞTURMAZ.',
              'Serebral Hemodinami (CBF / ICP) & Miyozis: Normokapnik ventilasyon altında serebral metabolik hızı (CMRO₂), serebral kan akımını (CBF) ve kafa içi basıncını (ICP) hafif düşürür; Edinger-Westphal çekirdeği uyarımıyla pinpoint miyozis yapar.',
            ],
          },
          {
            systemTitle: 'Pre-Bötzinger Solunum Merkezi, Karotid Cisimcik & Striatal Ağ → Solunum & Toraks',
            tissueTarget: 'Pre-Bötzinger · Kemoreseptörler · Torakoabdominal & Laringeal Kaslar',
            accent: 'rose',
            points: [
              'Medüller Solunum Depresyonu & CO₂ Eğrisi Sağa Kayması: Pre-Bötzinger kompleksi ve pontin pnömotaksik merkezdeki MOR aktivasyonuyla PaCO₂–dakika ventilasyon yanıt eğrisi sağa kayar ve eğimi düşer; apneik PaCO₂ eşiği yükselir ve karotid cisimcik hipoksik ventilatuar dürtüsü körelir (IV bolustan 5–15 dk sonra pik yapar, analjeziden daha uzun sürer!).',
              'Toraks & Vokal Kord Rijiditesi ("Tahta Göğüs / Wooden Chest"): Hızlı IV bolus (>3–5 mcg/kg veya <1–2 dk puşe) striatal/bazal gangliyon ve nükleus raphe magnus devreleri üzerinden göğüs duvarı, diyafram ve özellikle laringeal adduktör kaslarda (glottik kapanma!) şiddetli santral rijidite yaratarak maske (BVM) ventilasyonunu imkânsızlaştırır.',
              'Hava Yolu Refleks Bloku & Bronkomotor Güvenlik: Trakeobronşiyal irritan reseptörleri ve öksürük refleks arkını güçlü biçimde baskılar; histamin salınımı yapmadığından astım ve KOAH hastalarında bronkospazm tetiklemez.',
            ],
          },
          {
            systemTitle: 'Medüller Vagal Çekirdek, Sempatik Sinir Sistemi & Miyokard → Kardiyovasküler Sistem',
            tissueTarget: 'Nükleus Ambiguus · RVLM · Kardiyomiyosit · Kapasitans Damarlar',
            accent: 'amber',
            points: [
              'Hemodinamik Stabilite & Sıfır Miyokardiyal Depresyon: Terapötik ve yüksek anestezik dozlarda dahi kardiyomiyosit kontraktilitesini (dP/dt), baroreseptör refleksini veya koroner otoregülasyonu doğrudan bozmaz; mast hücresi histamin deşarjı yapmadığından vazoplejik hipotansiyon oluşturmaz (kardiyak cerrahi ve şok indüksiyonunda morfine temel üstünlüğü).',
              'Santral Vagotonik Bradikardi: Medüller nükleus ambiguus uyarımıyla SA düğüm hızını ve AV düğüm iletimini yavaşlatarak doz-bağımlı sinüs bradikardisi yapar (atropine hızla yanıt verir).',
              'Sempatik Stres Yanıtı Blokajı & Hipovolemik Maskenin Kalkması: Laringoskopi ve cerrahi insizyona bağlı hipotalamo-hipofizer ve sempatoadrenal katekolamin deşarjını köreltir; ancak kanamalı/hipovolemik veya yüksek sempatik tonusa bağımlı hastada merkezi sempatik tonusu düşürerek gizli hipovolemik hipotansiyonu açığa çıkarabilir.',
            ],
          },
          {
            systemTitle: 'Adipoz/Kas Depoları, Hepatik CYP3A4, Enterik Pleksus & Safra Yolu → Metabolik & GİS',
            tissueTarget: 'Adipoz & İskelet Kası · Hepatik CYP3A4 · Miyenterik Pleksus & Oddi',
            accent: 'teal',
            points: [
              'Üç-Kompartmanlı Redistribüsyon & Yükselen CSHT: Tek IV bolusun 30–60 dakikada bitmesi yıkımdan değil, beyinden inaktif kas ve yağ dokusuna redistribüsyondan kaynaklanır. Sürekli infüzyonda (>4–8 saat) bu derin periferik depolar (Vd ~4 L/kg) doyduğunda ilaç yağdan plazmaya geri döner ve CSHT 30 dakikadan 200–300+ dakikaya fırlar!',
              'Hepatik CYP3A4 Biyotransformasyonu (İnaktif Norfentanil): Karaciğerde yüksek ekstraksiyon oranıyla (%70–80) CYP3A4 üzerinden oksidatif N-dealkilasyonla inaktif norfentanile yıkılır; aktif/toksik metaboliti olmadığı için ağır böbrek yetmezliğinde (morfinin M6G birikiminin aksine) çok daha güvenlidir.',
              'Enterik Miyenterik Pleksus, Oddi Spazmı & Mesane Sfinkteri: Enterik nöronlarda ACh salınımını baskılayarak gastrik boşalmayı yavaşlatır, postoperatif ileus/konstipasyon, Oddi sfinkter spazmı (biliyer kolik basıncı artışı) ve detrusor inhibisyonuyla üriner retansiyon oluşturur.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Yükselen CSHT, İkinci Pik Fenomeni, Hipnotik Sinerjisi & Tavan Etkisi',
          summary:
            'Fentanilin klinik farmakodinamisini yönetmek; hipnotiklerle olan güçlü supra-aditif sinerjisini kullanırken, yüksek lipofilisitesinin yarattığı zaman-bağımlı doku birikimini (CSHT) ve solunum depresyonu riskini öngörmeye dayanır.',
          points: [
            'Volatil Anestezik MAC Azaltımı & Tavan Etkisi (Ceiling Effect): Plazma fentanil düzeyi 1–3 ng/mL aralığında sevofluran, desfluran ve izofluran MAC değerini %50–65 oranında düşürür; ancak >10–30 ng/mL üzerindeki çok yüksek dozlarda dahi MOR doygunluğu nedeniyle MAC azaltımı ~%70–80’de plato çizer (tavan etkisi) — tek başına tam anestezi ve amnezi sağlamaz.',
            'Propofol / Midazolam Supra-Aditif Sinerjisi (Ko-İndüksiyon & PSA): GABA-A pozitif allosterik modülatörleri (propofol, midazolam) ile MOR agonisti fentanil birlikte verildiğinde hipnotik EC50 gereksinimi %40–60 düşer; ancak spontan soluyan hastada (endoskopi/PSA) medüller CO₂ duyarsızlığı ile faringeal kas kollapsı birleşerek apne riskini 4–8 kat artırır.',
            'İkinci Pik (Secondary Peak / Enterohepatik & Kas Sekestrasyonu) ve Renarkotizasyon: Yüksek doz intraoperatif fentanil sonrası PACU’da hasta ısındığında ve hareket ettiğinde, iskelet kası, akciğer ve asidik gastrik sıvıda (iyon tuzağı) sekestre olan fentanil sistemik dolaşıma yeniden katılarak ("second peak") ameliyattan 1–3 saat sonra gecikmiş solunum arresti yapabilir; ayrıca Naloksonun yarı ömrü (30–60 dk) fentanilin terminal yarı ömründen (3,5–8 saat) çok kısa olduğu için erken renarkotizasyon gelişir.',
          ],
        }}
        clinicalPearls={[
          'Remifentanil vs Fentanil CSHT Uçurumu: 8 saatlik bir ameliyat veya YBÜ sedasyonu sonunda Remifentanil kapatıldığında plazma düzeyi 3–4 dakikada yarıya inerken, Fentanil kapatıldığında yağ dokusu depolarından geri salınım nedeniyle plazma düzeyinin yarıya inmesi (CSHT) 240–300 dakika (4–5 saat!) sürer.',
          'Böbrek Yetmezliğinde Morfine Göre Moleküler Üstünlük: Morfin karaciğerde çok güçlü aktif bir μ-agonisti olan Morfin-6-Glukuronid (M6G) ve nörotoksik M3G’ye dönüşüp böbrek yetmezliğinde birikerek günler süren narkoz yaparken; Fentanil CYP3A4 ile tamamen İNAKTİF norfentanile yıkıldığından eGFR <30 mL/dk hastada tercih edilen opioiddir.',
          'Transdermal Flaster (Durogesic TTS) & Isı/Subkutan Depo Tuzağı: TTS flaster takıldıktan sonra cilt altında bir lipofilik depo oluşması ve sistemik etkinin başlaması 12–24 saat sürer, flaster çıkarıldıktan sonra da cilt altı depodan emilim 17–24 saat devam eder! Yüksek ateş (>39°C) veya flaster üzerine sıcak battaniye temas etmesi kutanöz perfüzyonu artırarak salımı 2–3 katına çıkarır ve ölümcül apne yapar.',
          'CYP3A4 İnhibitörleri ve Serotonerjik İlaç Etkileşimi: Klaritromisin, vorikonazol/flukonazol, diltiazem veya ritonavir alan hastada fentanil hepatik klirensi bloke olarak beklenen sürenin 2–3 katı solunum depresyonu yapar; Linezolid, metilen mavisi veya MAOİ kullanan hastada ise fenilpiperidin SERT blokajı nedeniyle Serotonin Sendromu tetikler.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (v4.0)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Fentanil"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'MAO İnhibitörleri (Son 14 Gün) · Linezolid · Metilen Mavisi',
            mechanism: 'Serotonerjik Aşırı Aktivasyon (Fenilpiperidin SRI Etkisi + MAO İnhibisyonu)',
            clinicalEffect: 'Hayatı tehdit eden Serotonin Sendromu (hiperpireksi, klonus, rijidite, otonomik fırtına, koma).',
            management: 'MAOİ ile eşzamanlı veya son 14 gün içinde kontrendikedir; linezolid/metilen mavisi zorunluysa morfin/hidromorfon gibi non-fenilpiperidin opioid seçin.',
          },
          {
            severity: 'D',
            agent: 'Güçlü CYP3A4 İnhibitörleri (Klaritromisin · Vorikonazol · Flukonazol · Ritonavir · Diltiazem)',
            mechanism: 'Hepatik CYP3A4 N-Dealkilasyon İnhibisyonu',
            clinicalEffect: 'Fentanil klirensi dramatik düşer; plazma düzeyi 2–3 kat artarak uzamış koma ve fatal solunum depresyonu gelişir.',
            management: 'İnfüzyon/bolus dozlarını %50 azaltın, yakın kapnografi/sedasyon takibi yapın veya CYP3A4 bağımsız remifentanile geçin.',
          },
          {
            severity: 'D',
            agent: 'Benzodiyazepinler (Midazolam/Diazepam) · Propofol · Alkol · Gabapentinoidler',
            mechanism: 'Güçlü Farmakodinamik (PD) SSS & Solunum Merkezi Sinerjisi',
            clinicalEffect: 'Derin sedasyon, üst hava yolu obstrüksiyonu, ağır hipoventilasyon, apne ve hipotansiyon riskinde katlanma.',
            management: 'PSA/MAC’ta dozları titre ederek azaltın, sürekli kapnografi (EtCO₂) + SpO₂ izlemi yapın ve yatak başında BVM + Nalokson bulundurun.',
          },
          {
            severity: 'D',
            agent: 'SSRI / SNRI Antidepresanlar (Sertralin · Fluoksetin · Venlafaksin · Duloksetin)',
            mechanism: 'Aditif Santral Serotonerjik Aktivite',
            clinicalEffect: 'Özellikle yüksek doz veya uzamış YBÜ infüzyonunda nöromüsküler hiperaktivite (klonus, tremor), ajitasyon ve hipertermi.',
            management: 'Kullanım kontrendike değildir ancak Hunter serotonin toksisitesi bulguları açısından yakın izlem gerekir.',
          },
          {
            severity: 'C',
            agent: 'Beta-Blokerler · Deksmedetomidin · Kalsiyum Kanal Blokerleri',
            mechanism: 'Aditif Santral Vagotoni + Sempatolitik Etki',
            clinicalEffect: 'Belirgin sinüs bradikardisi ve hipotansiyon (özellikle hızlı indüksiyon boluslarında).',
            management: 'Bolusları ≥ 1–2 dk’da yavaş uygulayın; atropin ve vazopresörü hazır bulundurun.',
          },
        ]}
        references={[
          {
            authors: 'Peng PW, Sandler AN',
            title: 'A review of the use of fentanyl analgesia in the management of acute pain in adults.',
            journal: 'Anesthesiology',
            year: 1999,
            pmid: '9952166',
            doi: '10.1097/00000542-199902000-00034',
            note: 'Erişkinde akut ağrı ve perioperatif analjezide fentanil farmakokinetiği ve klinik kullanımı.',
          },
          {
            authors: 'Devlin JW, Skrobik Y, Gélinas C, et al. (SCCM PADIS)',
            title: 'Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU.',
            journal: 'Crit Care Med',
            year: 2018,
            pmid: '30113379',
            doi: '10.1097/CCM.0000000000003299',
            note: 'Yoğun bakımda analjezi-öncelikli sedasyon ve fentanil infüzyon kümülasyon yönetimi.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/fentanyl.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
