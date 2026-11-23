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
  Zap
} from 'lucide-react';
import {
  CompatibilityAndLineBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographCopyButton,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

export const RemifentanilProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  
  // Çözelti Hazırlama Modu (Türkiye'de Sadece 5 mg Flakon Mevcuttur)
  const [prepType, setPrepType] = useState<'vial_5mg_100' | 'vial_5mg_250' | 'vial_5mg_50' | 'custom_prep'>('vial_5mg_100');
  const [customDiluentVolume, setCustomDiluentVolume] = useState<number>(100); // mL (5 mg flakon + x mL)
  
  // Yükleme Dozu (Bolus) - Opsiyonel
  const [enableBolus, setEnableBolus] = useState<boolean>(false);
  const [bolusDoseMcgKg, setBolusDoseMcgKg] = useState<number>(0.5); // 0.2 - 2.0 mcg/kg
  const [bolusDurationSec, setBolusDurationSec] = useState<number>(60); // 30 - 180 sn
  
  // İdame Dozu (mcg/kg/dakika)
  const [maintenanceDoseMcgKgMin, setMaintenanceDoseMcgKgMin] = useState<number>(0.15); // mcg/kg/dakika
  
  // Akordiyon State: Farmakokinetik (Varsayılan KAPALI)
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Benzersiz erişilebilirlik kimlikleri (ARIA)
  const weightInputId = useId();
  const prepSelectId = useId();
  const bolusToggleId = useId();
  const bolusDoseInputId = useId();
  const bolusDurationInputId = useId();
  const customVolInputId = useId();
  const maintDoseRangeId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) (Türkiye: 5 mg = 5000 mcg Flakon) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'vial_5mg_100':
        // 5 mg (5000 mcg) / 100 mL = 50 mcg/mL (Standart)
        return 50.0;
      case 'vial_5mg_250':
        // 5 mg (5000 mcg) / 250 mL = 20 mcg/mL (Seyreltik)
        return 20.0;
      case 'vial_5mg_50':
        // 5 mg (5000 mcg) / 50 mL = 100 mcg/mL (Konsantre / YBÜ)
        return 100.0;
      case 'custom_prep':
        if (customDiluentVolume > 0) {
          return 5000 / customDiluentVolume;
        }
        return 50.0;
      default:
        return 50.0;
    }
  })();

  // --- İDAME HESAPLAMALARI (mcg/kg/dk temel alınır) ---
  const activeDoseMcgKgMin = maintenanceDoseMcgKgMin;
  const activeDoseMcgKgHr = maintenanceDoseMcgKgMin * 60;
  // Dakikalık doz (mcg/dk) = Doz (mcg/kg/dk) * Ağırlık (kg)
  const minuteDoseMcg = activeDoseMcgKgMin * weightKg;
  // Saatlik doz (mcg/saat) = Dakikalık doz * 60
  const hourlyDoseMcg = minuteDoseMcg * 60;
  // İnfüzyon debisi (mL/saat) = Saatlik doz (mcg/saat) / Konsantrasyon (mcg/mL)
  const infusionRateMlHr = concentrationMcgMl > 0 ? hourlyDoseMcg / concentrationMcgMl : 0;
  // 4 saatlik cerrahi ve 24 saatlik YBÜ tüketimi (5 mg flakon cinsinden)
  const surgery4HrTotalMg = (hourlyDoseMcg * 4) / 1000;
  const dailyTotalMg = (hourlyDoseMcg * 24) / 1000;
  const dailyTotalMl = infusionRateMlHr * 24;
  const vialsNeeded5mg = dailyTotalMg / 5;

  // --- YÜKLEME (BOLUS) HESAPLAMALARI ---
  const totalBolusDoseMcg = enableBolus ? bolusDoseMcgKg * weightKg : 0;
  const totalBolusVolumeMl = concentrationMcgMl > 0 && enableBolus ? totalBolusDoseMcg / concentrationMcgMl : 0;
  // Bolus süresi (saniye cinsinden) saatlik debiye çevrilir: mL / (sec / 3600)
  const bolusPumpRateMlHr =
    enableBolus && bolusDurationSec > 0 ? (totalBolusVolumeMl / bolusDurationSec) * 3600 : 0;
  // Tahmini mcg/kg/dk hız karşılığı (kronometre tutup bolus süresince bu hız uygulanabilir)
  const bolusRateMcgKgMin =
    enableBolus && bolusDurationSec > 0 ? (bolusDoseMcgKg * 60) / bolusDurationSec : 0;

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span>Ultra-Kısa Etkili Sentetik μ-Opioid Analjezik</span>
              <span aria-hidden="true">·</span>
              <span>Ultiva / Remifentanil</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: N01AH06</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Remifentanil Hidroklorür (Ultiva)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Ester bağı
              içeren, ultra-kısa etkili, saf ve selektif sentetik <strong>μ-opioid</strong> reseptör agonistidir (fentanil
              türevi 4-anilinopiperidin derivesi). Morfine göre yaklaşık 100-200 kat, fentanile benzer güçtedir.
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
              <span className="font-bold text-sm block">Etki Mekanizması &amp; Eşsiz Esteraz Hidrolizi:</span>
              <p>
                Santral sinir sistemi ve arka boynuzdaki <strong>μ₁ ve μ₂ opioid reseptörlerine</strong> yüksek
                afiniteyle bağlanır. İnhibitör G-proteini (Gi/Go) aracılığıyla adenilat siklazı inhibe eder, voltaj bağımlı
                kalsiyum kanallarını kapatır ve potasyum kanallarını açarak presinaptik nöronda hiperpolarizasyon yaratır;
                P maddesi ve glutamat gibi nosiseptif nörotransmitterlerin salınımını güçlü biçimde bloke eder.
              </p>
              <p className="text-xs opacity-90">
                • <strong>Organ Bağımsız Eliminasyon:</strong> Remifentanil molekülündeki metil ester bağı, kanda ve dokularda
                bulunan <em>non-spesifik esterazlar</em> tarafından hızla hidrolize edilir. Plazma psödokolinesterazından veya
                karaciğer/böbrek fonksiyonlarından tamamen bağımsızdır.
              </p>
              <p className="text-xs opacity-90">
                • <strong>Sabit Bağlam Duyarlı Yarı Ömür (Context-Sensitive Half-Time: 3–4 dk):</strong> İnfüzyon ister
                30 dakika, ister 48 saat sürsün; vücutta birikmez (akümülasyon yapmaz). İnfüzyon kapatıldığında plazma
                düzeyi 3–4 dakikada yarıya iner, hasta 5–10 dakikada tamamen uyanır ve spontan solunumu geri döner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK BÖLÜMÜ (AÇILIP KAPANABİLİR AKORDİYON)             */}
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
          aria-expanded={pkOpen}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Farmakokinetik Özellikler (PK / PD)
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pkOpen ? 'Gizle' : 'Tıkla & Göster'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Başlangıç süresi, pik etki, dağılım hacmi, protein bağlama, esteraz metabolizması ve bağlam duyarlı yarı ömür
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
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 1.5 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">Hızlı kan-beyin bariyeri dengelenmesi (t½ke0 ~1 dk).</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pik Etki (Peak)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1.5 – 3 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">Bolus veya infüzyon hızı artışından hemen sonra pik analjezi.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Etki Süresi &amp; Kesilme
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">5 – 10 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">İnfüzyon kesildikten 5-10 dk sonra analjezik etki tamamen sonlanır.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">~300 – 400 mL/kg (Küçük)</span>
                <p className="text-[11px] text-slate-500 mt-1">Santral kompartman hacmi oldukça düşüktür (~100 mL/kg).</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Plazma Protein Bağlanması
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">%70 (Orta Düzey)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Esas olarak α₁-asit glikoproteine bağlanır.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Bağlam Duyarlı Yarı Ömür
                </span>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">3 – 4 Dakika (SABİT)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Süre uzadıkça uzamaz! Fentanil veya sufentanilden en temel farkıdır.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Biyotransformasyon ve Atılım Yolağı:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Non-Spesifik Doku ve Kan Esterazları:</strong> Kırmızı kan hücreleri (eritrositler) ve interstisyel
                dokulardaki non-spesifik esterazlar remifentanilin propanoik asit metil esterini hızla parçalar. Karaciğerdeki
                sitokrom P450 enzimleri veya plazma psödokolinesterazı (bütirilkolinesteraz) bu metabolizmada rol oynamaz.
                Dolayısıyla kolinesteraz eksikliği olan veya karaciğer yetmezliği olan hastalarda etki süresi UZAMAZ.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>İnaktif Metabolit (Remifentanil Asit - GI90291):</strong> Parçalanma ürünü olan karboksilik asit
                türevi metabolit, ana moleküle göre <strong>4600 kat daha zayıf</strong> bir reseptör afinitesine sahiptir.
                Metabolitin %95'i idrarla böbreklerden atılır. Şiddetli böbrek yetmezliğinde bu metabolit birikse dahi klinik
                olarak anlamlı bir opioid etkisi yaratmaz.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KONTRENDİKASYONLAR                                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Kontrendikasyonlar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mutlak Kontrendikasyonlar */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm text-rose-600 dark:text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Mutlak Kontrendikasyonlar</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
              <li>
                <strong>Epidural veya İntratekal Uygulama KESİNLİKLE KONTRENDİKEDİR:</strong> Flakon formülasyonu yardımcı
                madde olarak <em>glisin</em> içerir. Glisin nöraksiyel yolla verildiğinde nörotoksiktir ve kalıcı paraplejiye
                yol açabilir. SADECE İNTRAVENÖZ (IV) VERİLEBİLİR!
              </li>
              <li>
                <strong>Aşırı Duyarlılık:</strong> Remifentanil, fentanil analogları veya formülasyondaki maddelere karşı bilinen aşırı duyarlılık.
              </li>
              <li>
                <strong>Tek Başına İndüksiyon Ajanı Olarak Kullanım:</strong> Hipnotik değildir, bilinç kaybı sağlamaz; tek başına indüksiyon amacıyla kullanılmaz.
              </li>
            </ul>
          </div>

          {/* Rölatif Kontrendikasyonlar & Yüksek Risk */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm text-amber-600 dark:text-amber-400 mb-2">
              <Info className="w-4 h-4" />
              <span>Rölatif Kontrendikasyonlar / Yüksek Risk</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
              <li>
                <strong>Hızlı Postoperatif Ağrı Riski:</strong> İnfüzyon kapatılmadan önce uzun etkili analjezi planlanmamışsa
                hasta 5-10 dakikada şiddetli ağrı krizi (rebound ağrı) yaşar.
              </li>
              <li>
                <strong>Spontan Solunumlu Havayolu Güvencesiz Hastalar:</strong> Çok güçlü medüller solunum depresanıdır; entübe
                olmayan hastada mutlaka sürekli kapnografi ve anestezi uzmanı gözetimi gerekir.
              </li>
              <li>
                <strong>Ciddi Bradikardi &amp; İletim Bozuklukları:</strong> Vagal tonusu artırarak sinüs bradikardisi ve asistoliye yol açabilir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ENDİKASYONLAR VE OFF-LABEL KULLANIMLAR                          */}
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
                <strong>1. Genel Anestezi İndüksiyonu ve İdamesi:</strong> TIVA (Total İntravenöz Anestezi) veya dengeli
                inhalasyon anestezisinde analjezik omurga olarak (erişkin ve 3 ay üzeri çocuklarda).
              </p>
              <p>
                <strong>2. Kardiyak Cerrahi Anestezisi:</strong> Koroner bypass ve kapak cerrahisinde endotrakeal entübasyon,
                sternotomi ve kardiyopulmoner bypass stres yanıtını baskılamak için.
              </p>
              <p>
                <strong>3. Yoğun Bakım Analgosedasyonu:</strong> 18 yaş ve üzeri mekanik ventilasyondaki kritik hastalarda
                analjezi ve sedasyon idamesi.
              </p>
              <p>
                <strong>4. İzlenen Anestezi Bakımı (MAC):</strong> Girişimsel işlemler esnasında analjezi idamesi.
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
                <strong>Uyanık Kraniyotomi &amp; Nöromonitörizasyon:</strong> Hızlı açılıp kapanabilen analjezi sayesinde
                kortikal haritalama sırasında hastanın tam kooperatif olmasını sağlar.
              </li>
              <li>
                <strong>Zor Havayolu ve Uyanık Fiberoptik Entübasyon:</strong> Glottik refleksleri ve öksürüğü mükemmel baskılar,
                işlem biter bitmez solunum hızla geri döner.
              </li>
              <li>
                <strong>Doğum Analjezisi (Remifentanil PCA):</strong> Epidural anestezi kontrendike olan (trombositopeni, omurga deformitesi)
                gebe kadınlarda hasta kontrollü IV analjezi (fetusta hızla metabolize olur).
              </li>
              <li>
                <strong>Elektrokonvülsif Terapi (EKT):</strong> Nöbet süresini kısaltmadan hemodinamik fırtınayı baskılamak için.
              </li>
              <li>
                <strong>Postoperatif Titreme (Shivering):</strong> Düşük doz bolusla titremeyi dakikalar içinde sonlandırır.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. UYGULAMA YOLLARI, ERİŞKİN VE PEDİATRİK DOZ REJİMLERİ            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Syringe className="w-5 h-5 text-cyan-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Uygulama Yolları ve Doz Rejimleri (Erişkin &amp; Pediatrik)
          </h2>
        </div>

        {/* Uygulama Yolları Uyarısı */}
        <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-500/10 text-rose-900 dark:text-rose-200 text-xs sm:text-sm mb-3.5 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong>Uygulama Yolu Kuralı:</strong> SADECE İNTRAVENÖZ (IV) infüzyon veya kontrollü yavaş bolus olarak
            uygulanır. Formülasyonundaki nörotoksik glisin nedeniyle <strong>epidural veya intratekal verilmesi KESİNLİKLE YASAKTIR</strong>.
          </div>
        </div>

        {/* Yaşlılar İçin Doz Azaltma Uyarısı */}
        <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-500/10 text-amber-950 dark:text-amber-200 text-xs sm:text-sm mb-5 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Geriatrik (Yaşlı) Hasta Doz Uyarısı:</strong> Yaşlı hastalarda santral kompartman hacmi belirgin azalmış ve farmakodinamik duyarlılık 2 katına kadar artmıştır. Bu nedenle remifentanil başlangıç indüksiyon ve idame infüzyon dozları <strong>en az %50 oranında azaltılmalı</strong>, infüzyon titrasyonları çok yavaş yapılmalı ve hemodinami sıkı takip edilmelidir.
          </div>
        </div>

        {/* Erişkin vs Pediatrik Tablosu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Erişkin Dozları */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Erişkin Doz Rejimleri</span>
            </span>
            <div className="space-y-2.5 text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Genel Anestezi İndüksiyon:
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  0.5 – 1.0 mcg/kg/dk
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  Eğer entübasyon 8 dk içinde gerçekleşecekse <strong>0.5 – 1.0 mcg/kg IV Yavaş Bolus (≥ 30-60 saniye)</strong> uygulanabilir.
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Toraks rijiditesi ve bradikardiyi önlemek amacıyla bolus asla 30 saniyeden hızlı verilmemelidir.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Genel Anestezi İdamesi:
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  0.05 – 2 mcg/kg/dk
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  Her 2-5 dk'da bir titre edilir; eğer <strong>1 mcg/kg/dk dozu aşılıyorsa</strong> eşlik eden anestezik infüzyonu hızı artırılması önerilir.
                </p>
                <div className="mt-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-700/60 text-[11px] space-y-1">
                  <div>
                    • <strong>Koroner bypass cerrahisi genel anestezisi idamesi:</strong> <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">1 mcg/kg/dk</span>
                  </div>
                  <div>
                    • <strong>TİVA'da (Propofol ile):</strong> <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">0.2 – 0.5 mcg/kg/dk</span> arasında.
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  PACU'da Post-Operatif Derlenme:
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  Sürekli IV infüzyon 0.1 mcg/kg/dk (0.025 – 0.2 mcg/kg/dk arasında)
                </span>
                <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium mt-1">
                  * 0.2 mcg/kg/dk üzeri dozlar belirgin solunum depresyonu ile ilişkilidir.
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  PACU'da yakın solunum sayısı ve SpO₂ monitörizasyonu ile titre edilmelidir.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Koroner Bypass Cerrahisi:
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  1 mcg/kg/dk (0.05 ile 1 mcg/kg/dk arasında)
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Sternotomi, aort kanülasyonu ve bypass stres yanıtını güçlü şekilde bloke eder.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Spontan Soluyan Hastada Sedoanaljezi (MAC):
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  0.025 – 0.2 mcg/kg/dakika
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  <strong>İşlem öncesinden oksijen desteği verilmesi önerilir.</strong> Lokal anestezi veya blok sonrası her 5 dk'da bir titre edilerek <strong>0.05 mcg/kg/dk olarak doz düşülmesi gerekir</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Yoğun Bakımda Mekanik Ventilasyon altındaki hastalarda ağrı ve sedasyon:
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  0.05 – 0.25 mcg/kg/dakika (3 – 15 mcg/kg/saat)
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Hızlı nörolojik değerlendirme ve weaning sağlar; organ yetmezliğinden bağımsız metabolize olur.
                </p>
              </div>
            </div>
          </div>

          {/* Pediatrik Dozları */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Pediatrik Doz Rejimleri</span>
            </span>
            <div className="space-y-2.5 text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Pediatrik Anestezi İdamesi (3 ay ve üzeri):
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  0.25 mcg/kg/dk (0.05 – 1.3 mcg/kg/dk) aralığında
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  İnhalasyon anesteziği ile (MAC 0.4 – 1.5) birlikte ve <strong>Atropin hazırda bulundurularak</strong> uygulanmalıdır.
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Pediatrik olgularda esteraz klirensi yüksektir; titrasyon adımları dikkatle izlenmelidir.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
                <span className="font-bold text-amber-900 dark:text-amber-200 block text-xs">
                  Pediatride Bolus Doz Uyarısı:
                </span>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                  Pediatrik hastalarda hızlı IV bolus <strong>KESİNLİKLE ÖNERİLMEZ</strong>. Ağır göğüs kafesi rijiditesi (wooden chest / ventilasyon kaybı) ve derin vagal bradikardiye yol açabilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF İNFÜZYON VE DOZ HESAPLAYICISI                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-7 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900 border-rose-500/30 ring-1 ring-rose-500/20'
            : 'bg-white border-rose-300 shadow-md ring-1 ring-rose-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Remifentanil İnfüzyon Pompası &amp; Doz Hesaplayıcısı
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Türkiye formu (5 mg flakon), mcg/kg/dk idame hesabı ve tahmini bolus infüzyon hızı (kronometreli geçiş)
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MonographCopyButton
              isDark={isDark}
              getText={() =>
                [
                  `REMİFENTANİL İNFÜZYON ÖZETİ`,
                  `Hesaplama Ağırlığı (IBW/LBM): ${weightKg} kg`,
                  `Çözelti Konsantrasyonu: ${concentrationMcgMl.toFixed(1)} mcg/mL`,
                  `İdame Dozu: ${activeDoseMcgKgMin.toFixed(3)} mcg/kg/dk (${minuteDoseMcg.toFixed(1)} mcg/dk)`,
                  `Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat`,
                  enableBolus
                    ? `Yükleme Bolus: ${bolusDoseMcgKg} mcg/kg (${totalBolusDoseMcg.toFixed(1)} mcg / ${totalBolusVolumeMl.toFixed(1)} mL, ${bolusDurationSec} sn)`
                    : `Yükleme Bolus: Devre dışı`,
                  `24 Saatlik Tüketim: ${dailyTotalMg.toFixed(1)} mg (~${vialsNeeded5mg.toFixed(1)} adet 5 mg flakon)`,
                ].join('\n')
              }
            />
            <button
              type="button"
              onClick={() => {
                setWeightKg(70);
                setPrepType('vial_5mg_100');
                setEnableBolus(false);
                setBolusDoseMcgKg(0.5);
                setBolusDurationSec(60);
                setMaintenanceDoseMcgKgMin(0.15);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Varsayılana Sıfırla</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sol Kolon: Parametre Girişleri (7 Kolon) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Hasta Ağırlığı & Çözelti Hazırlama (Sadece 5 mg Flakon) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={weightInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Hasta Ağırlığı (kg) <span className="text-[10px] text-slate-400 font-normal">(Obezde IBW/LBM)</span>
                </label>
                <div className="relative">
                  <input
                    id={weightInputId}
                    type="number"
                    min={2}
                    max={250}
                    step={1}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold font-mono tabular-nums transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 pointer-events-none font-medium">
                    kg
                  </span>
                </div>
                <div className="mt-2">
                  <ObesityDosingScaler
                    isDark={isDark}
                    drugName="Remifentanil"
                    recommendedScalar="LBW"
                    secondaryScalar={{ type: 'IBW', context: 'İdeal Kilo' }}
                    rationale="Minto PK/PD modeli & SOBA: Obez hastalarda remifentanil KESİNLİKLE gerçek kiloya (TBW) göre verilmez; TBW ile dozlama derin hipotansiyon, bradikardi ve rijidite yapar. LBW veya IBW kullanılmalıdır."
                    currentWeightKg={weightKg}
                    onApplyWeight={(w) => setWeightKg(Math.max(2, Math.min(250, w)))}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setWeightKg(20);
                      setMaintenanceDoseMcgKgMin(0.15);
                    }}
                    className={`px-2 py-0.5 rounded-md border text-[10.5px] font-semibold transition-colors cursor-pointer ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Pediatrik (20 kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWeightKg(70);
                      setMaintenanceDoseMcgKgMin(0.15);
                    }}
                    className={`px-2 py-0.5 rounded-md border text-[10.5px] font-semibold transition-colors cursor-pointer ${
                      isDark
                        ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:text-white'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Erişkin IBW (70 kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setWeightKg(70);
                      setMaintenanceDoseMcgKgMin(0.075);
                    }}
                    className={`px-2 py-0.5 rounded-md border text-[10.5px] font-semibold transition-colors cursor-pointer ${
                      isDark
                        ? 'border-amber-500/30 bg-amber-950/30 text-amber-300 hover:bg-amber-900/40'
                        : 'border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100'
                    }`}
                  >
                    Yaşlı ≥65 (%50 ↓)
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Çözelti Hazırlama (Türkiye: 5 mg Flakon)
                </label>
                <select
                  id={prepSelectId}
                  value={prepType}
                  onChange={(e) => setPrepType(e.target.value as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="vial_5mg_100">Standart: 5 mg Flakon / 100 mL SF (50 mcg/mL)</option>
                  <option value="vial_5mg_250">Seyreltik: 5 mg Flakon / 250 mL SF (20 mcg/mL)</option>
                  <option value="vial_5mg_50">Konsantre: 5 mg Flakon / 50 mL SF (100 mcg/mL)</option>
                  <option value="custom_prep">Özel Seyreltme: 5 mg Flakon + İstenen mL</option>
                </select>
              </div>
            </div>

            {/* Özel Seyreltme Detayı */}
            {prepType === 'custom_prep' && (
              <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-rose-900 dark:text-rose-200">
                  5 mg Flakonun Seyreltildiği SF Hacmi (mL):
                </span>
                <div className="w-36 flex items-center gap-2">
                  <input
                    id={customVolInputId}
                    type="number"
                    min={20}
                    max={500}
                    step={10}
                    value={customDiluentVolume}
                    onChange={(e) => setCustomDiluentVolume(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                  />
                  <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">mL</span>
                </div>
              </div>
            )}

            {/* 2. Yükleme Dozu (Bolus) Anahtarı */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                enableBolus
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-800'
                    : 'bg-rose-50 border-rose-300'
                  : isDark
                  ? 'bg-slate-800/40 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor={bolusToggleId} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 cursor-pointer">
                    <span>Yükleme Bolusu Uygula (Opsiyonel / İndüksiyon)</span>
                    {enableBolus && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                        Aktif
                      </span>
                    )}
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Rijidite ve bradikardiyi önlemek için bolus mutlaka en az 30–60 saniyede yavaş verilmelidir.
                  </p>
                </div>

                <input
                  id={bolusToggleId}
                  type="checkbox"
                  checked={enableBolus}
                  onChange={(e) => setEnableBolus(e.target.checked)}
                  className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
                />
              </div>

              {enableBolus && (
                <div className="mt-3 pt-3 border-t border-rose-200 dark:border-rose-900/50 grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={bolusDoseInputId} className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Bolus Dozu (mcg/kg):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={bolusDoseInputId}
                        type="number"
                        min={0.1}
                        max={2.0}
                        step={0.1}
                        value={bolusDoseMcgKg}
                        onChange={(e) => setBolusDoseMcgKg(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                      />
                      <span className="text-xs text-slate-400">mcg/kg</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={bolusDurationInputId} className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      İnfüzyon Süresi (Saniye):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={bolusDurationInputId}
                        type="number"
                        min={30}
                        max={180}
                        step={10}
                        value={bolusDurationSec}
                        onChange={(e) => setBolusDurationSec(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                      />
                      <span className="text-xs text-slate-400">saniye</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. İdame Dozu Ayarı (mcg/kg/dk) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={maintDoseRangeId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  İdame İnfüzyon Dozu (mcg/kg/dakika):
                </label>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-lg font-black text-rose-600 dark:text-rose-400">
                    {maintenanceDoseMcgKgMin.toFixed(3)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">mcg/kg/dk</span>
                </div>
              </div>

              <input
                id={maintDoseRangeId}
                type="range"
                min={0.025}
                max={2.0}
                step={0.025}
                value={maintenanceDoseMcgKgMin}
                onChange={(e) => setMaintenanceDoseMcgKgMin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />

              <div className="flex items-center justify-between gap-1.5 pt-1">
                <div className="flex items-center gap-1 flex-wrap">
                  {[0.05, 0.1, 0.15, 0.25, 0.5, 1.0].map((dose) => (
                    <button
                      key={dose}
                      type="button"
                      onClick={() => setMaintenanceDoseMcgKgMin(dose)}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-medium border transition-colors cursor-pointer ${
                        maintenanceDoseMcgKgMin === dose
                          ? 'bg-rose-600 text-white border-rose-600'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {dose}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setMaintenanceDoseMcgKgMin((prev) =>
                        Math.max(0.025, Number((prev - 0.025).toFixed(3)))
                      )
                    }
                    className="px-2 py-1 rounded border text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMaintenanceDoseMcgKgMin((prev) =>
                        Math.min(2.0, Number((prev + 0.025).toFixed(3)))
                      )
                    }
                    className="px-2 py-1 rounded border text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Hesaplanan Pompa Hızı ve Klinik Çıktılar (5 Kolon) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Ana İnfüzyon Hızı Kartı */}
            <div
              className={`p-5 rounded-2xl border text-center relative overflow-hidden transition-all ${
                isDark
                  ? 'bg-rose-950/30 border-rose-500/40 text-rose-100'
                  : 'bg-rose-50/90 border-rose-300 text-rose-950 shadow-xs'
              }`}
            >
              <span className="text-xs uppercase tracking-wider font-bold text-rose-700 dark:text-rose-300 block mb-1">
                İnfüzyon Pompası Hızı (İdame)
              </span>

              <div className="flex items-baseline justify-center gap-2 my-2">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-rose-600 dark:text-rose-400">
                  {infusionRateMlHr.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-slate-600 dark:text-slate-300">mL/saat</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-white/60 dark:bg-slate-900/60 border border-rose-500/20 text-slate-700 dark:text-slate-300">
                <span>{weightKg} kg</span>
                <span>·</span>
                <span>{activeDoseMcgKgMin.toFixed(3)} mcg/kg/dk</span>
                <span>·</span>
                <span>{concentrationMcgMl.toFixed(1)} mcg/mL</span>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-500/20 grid grid-cols-2 gap-2 text-left text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Dakikalık Doz:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {minuteDoseMcg.toFixed(1)} mcg/dk
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Saatlik Toplam:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {hourlyDoseMcg.toFixed(1)} mcg/saat
                  </span>
                </div>
              </div>
            </div>

            {/* Yükleme Dozu Çıktısı (Açıksa) */}
            {enableBolus && (
              <div
                className={`p-4 rounded-xl border text-xs ${
                  isDark
                    ? 'bg-rose-950/30 border-rose-800 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm text-rose-700 dark:text-rose-300 mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Yükleme Bolus Ayarı ({bolusDurationSec} sn)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Toplam Bolus:</span>
                    <span className="font-mono font-bold text-base">
                      {totalBolusVolumeMl.toFixed(2)} mL ({totalBolusDoseMcg.toFixed(0)} mcg)
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Bolus Pompa Debisi:</span>
                    <span className="font-mono font-bold text-base text-rose-600 dark:text-rose-400">
                      {bolusPumpRateMlHr.toFixed(1)} mL/saat
                    </span>
                  </div>
                </div>

                {/* Tahmini mcg/kg/dk Hız Karşılığı (Kronometre Tutup Geçiş İçin) */}
                <div className="mt-3 pt-2.5 border-t border-rose-200 dark:border-rose-900/50 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-rose-800 dark:text-rose-300">
                    Tahmini Bolus Hız Karşılığı:
                  </span>
                  <span className="font-mono font-black text-sm text-rose-600 dark:text-rose-400">
                    {bolusRateMcgKgMin.toFixed(2)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-[10px] opacity-80 mt-1">
                  * Klinisyen {bolusRateMcgKgMin.toFixed(2)} mcg/kg/dk hızında kronometre tutarak {bolusDurationSec} saniye bolus uygulayıp ardından idame hıza ({maintenanceDoseMcgKgMin.toFixed(2)} mcg/kg/dk) geçebilir.
                </p>
              </div>
            )}

            {/* Akut Ağrı Fırtınası Uyarısı (Altın Standart Klinik Kural) */}
            <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-500/10 text-xs space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Geçiş Analjezisi Güvenlik Kuralı:</span>
              </span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                Remifentanil infüzyonu kapatıldığında analjezik etki <strong>5–10 dakika içinde tamamen sıfırlanır</strong>.
                Ameliyat bitmeden veya ekstübasyondan <strong>30–45 dakika önce</strong> uzun etkili analjezik (morfin,
                tramadol, parasetamol) uygulanmalıdır.
              </p>
            </div>

            {/* Tüketim & Flakon Hesabı (5 mg Flakon) */}
            <div
              className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">4 Sa Cerrahi Tüketimi</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    ~{surgery4HrTotalMg.toFixed(2)} mg
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">24 Sa YBÜ (5 mg Flakon)</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    ~{dailyTotalMg.toFixed(2)} mg (~{Math.ceil(dailyTotalMg / 5) || 1} flk 5mg)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v3.0)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Remifentanil 5 mg Flakon (Ultiva / Jenerikler)',
            presentation: 'IV infüzyon için liyofilize toz içeren cam flakon (Türkiye ameliyathane & YBÜ pratiğinde en yaygın form)',
            concentration: '5 mg (5000 mcg) / flakon',
            saltOrBaseNote: '5 mg remifentanil baza eşdeğer remifentanil hidroklorür + 15 mg GLİSİN taşıyıcı içerir (nöroaksiyel uygulama kesinlikle kontrendikedir).',
            alertLevel: 'high',
          },
          {
            name: 'Remifentanil 2 mg Flakon (Bazı Hastane İhaleleri)',
            presentation: 'IV infüzyon için liyofilize toz içeren cam flakon',
            concentration: '2 mg (2000 mcg) / flakon',
            saltOrBaseNote: '2 mg remifentanil baza eşdeğer + glisin taşıyıcı içerir. 5 mg flakonla karıştırıldığında 2.5 kat konsantrasyon hatası oluşur.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart Erişkin (50 mcg/mL): 1 adet 5 mg flakon → 100 mL %0.9 NaCl veya %5 Dekstroz içine (ameliyathane & genel YBÜ standardı).',
          'Konsantre / Sıvı Kısıtlamalı YBÜ (100 mcg/mL): 1 adet 5 mg flakon → 50 mL enjektör pompası içine.',
          'Pediatrik / Seyreltik Titrasyon (20 mcg/mL): 1 adet 5 mg flakon → 250 mL %0.9 NaCl veya 2 mg flakon → 100 mL içine.',
        ]}
        concentrationTrapWarning="Hastane eczanesinden 2 mg ve 5 mg flakonlar aynı anda bulunabilir. Sulandırma öncesi flakon üzerindeki mg değeri çift kontrol edilmeli; enjektör/torba etiketine nihai konsantrasyon (mcg/mL) mutlaka yazılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v3.0)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="central-preferred"
        accessSummary="Periferik veya santral IV hattan uygulanabilir; ancak ultra-kısa etki ve ölü boşluk (dead-space) riski nedeniyle tek yönlü çek-valf içeren ayrı, düşük ölü boşluklu bir lümen veya doğrudan katetere yakın port tercih edilir. Hızlı sıvı bolusu verilen ana hattan puşe edilmez."
        phRange="2.5 – 3.5 (Asidik · Glisin tamponlu)"
        osmolalityNote="Standart 20–100 mcg/mL dilüsyonlar izotoniktir; doku vezikanı değildir ancak asidik pH nedeniyle alkali ilaçlarla çökelir."
        compatibleDiluents={[
          '%0.9 Sodyum Klorür (İzotonik SF) — 24 saat stabil',
          '%5 Dekstroz (D5W) — 24 saat stabil',
          'Enjeksiyonluk Steril Su (sulandırma için) — 24 saat stabil',
          'Ringer Laktat: Sadece 4 saat stabil (tercih edilmez)',
        ]}
        stabilityNote="Oda sıcaklığında (25 °C) SF veya D5W içinde 24 saat kimyasal olarak stabildir; Ringer Laktat içinde pH yüksekliği nedeniyle 4 saat sonra ester hidrolizi hızlanır."
        ySiteCompatible={[
          'Propofol',
          'Midazolam',
          'Deksmedetomidin',
          'Norepinefrin',
          'Epinefrin',
          'Fentanil',
          'Roküronyum',
          'Cisatrakuryum',
          'Ketamin',
          'Lidokain',
        ]}
        ySiteIncompatible={[
          'Kan / Eritrosit Süspansiyonu (esteraz yıkımı!)',
          'Taze Donmuş Plazma (TDP)',
          'Sodyum Bikarbonat (alkali hidroliz)',
          'Amfoterisin B',
          'Klorpromazin',
        ]}
        extravasationProtocol="Ekstravazasyon dokuda vezikan nekroz yapmaz; ancak asıl hayati tehlike 'ölü boşluk (dead-space) kazası'dır. İnfüzyon durdurulduğunda hat asla yıkama/flush edilmemeli; kateter uzatma hattı ayrılıp aspire edilerek veya tamamen çıkarılarak temizlenmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. BÖBREK YETMEZLİĞİNDE DOZ REVİZYONU                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Droplet className="w-5 h-5 text-teal-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Böbrek Yetmezliğinde Doz Revizyonu Kılavuzu
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="py-2.5 pr-4">Böbrek Fonksiyon Düzeyi / Tedavi</th>
                <th className="py-2.5 px-4">Doz Revizyonu Gerekir mi?</th>
                <th className="py-2.5 pl-4">Klinik Açıklama &amp; Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR ≥ 50 mL/dk (Normal / Hafif)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Standart doz titrasyonu uygulanır.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR 30–49 mL/dk (Evre 3)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Remifentanil klirensi ve uyanma süresi değişmez.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR 15–29 mL/dk (Evre 4)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  İnaktif remifentanil asit metaboliti birikebilir; ancak analjezik/sedatif gücü ana ilaca göre 4600 kat daha düşüktür.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR &lt; 15 mL/dk (Evre 5 / Diyaliz Dışı)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Aktif ilacın parçalanması doku esterazları ile sağlandığından etki süresi uzamaz.
                </td>
              </tr>
              <tr className="bg-slate-50/60 dark:bg-slate-800/30">
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  Haftada 3 Gün Hemodiyaliz (HD)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Diyaliz sonrası ek doza gerek yoktur. Diyaliz hastalarında güvenle kullanılabilir.
                </td>
              </tr>
              <tr className="bg-slate-50/60 dark:bg-slate-800/30">
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  Periton Diyalizi (PD)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Doz ayarlaması gerekmez.
                </td>
              </tr>
              <tr className="bg-slate-50/60 dark:bg-slate-800/30">
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  Sürekli Renal Replasman (CRRT / CVVH)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  CRRT filtresiyle temizlenmesine ihtiyaç duyulmaz; esteraz hidrolizi yeterlidir.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONU                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Activity className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Karaciğer Yetmezliğinde Doz Revizyonu (Child-Turcotte-Pugh Sınıflaması)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
          Remifentanil karaciğer metabolizmasına bağımlı <strong>DEĞİLDİR</strong>. Karaciğer sirozu, fulminan hepatit
          veya anhepatik fazda (karaciğer transplantasyonu esnasında) dahi klirensi ve eliminasyon yarı ömrü değişmez.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          {/* Class A */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Child-Pugh Class A (Hafif)
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
              Doz Revizyonu Gerekmez
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Standart protokol uygulanır. Doku esterazları ilacı normal hızda temizler.
            </p>
          </div>

          {/* Class B */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Child-Pugh Class B (Orta)
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
              Doz Revizyonu Gerekmez
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Eritrosit ve doku esteraz klirensi etkilenmez; bağlam-duyarlı yarı ömür sabittir.
            </p>
          </div>

          {/* Class C */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
            <span className="font-bold text-sm text-amber-950 dark:text-amber-200">
              Child-Pugh Class C (Şiddetli)
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-300 block">
              Doz Revizyonu Gerekmez (Yakın Takip)
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              Klirens değişmez; ancak şiddetli karaciğer yetmezliğinde santral sinir sistemi opioid duyarlılığı artmış
              olabileceğinden titrasyon adımları dikkatle izlenmelidir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v3.0)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="%50 Başlangıç Doz Azaltımı"
        geriatricPoints={[
          'Minto PK/PD modeline göre >65 yaş hastalarda santral dağılım hacmi (V1) ~%25, klirens ~%33 azalır ve santral μ-opioid duyarlılığı (EC50) ~%50 artar.',
          'Hem indüksiyon bolusu hem de başlangıç infüzyon hızı yarıya (%50) düşürülmeli (ör. 0.05–0.1 mcg/kg/dk ile başla), klinik yanıta göre yavaş titre edilmelidir.',
          'Kırılgan (frailty) ve hipovolemik yaşlı hastalarda hızlı bolustan tamamen kaçınılmalı; ciddi bradikardi ve hipotansiyon riskine karşı atropin/vazopresör hazır bulundurulmalıdır.',
        ]}
        obesityWeightScalarBadge="LBW (Tercih) veya IBW"
        obesityPoints={[
          'Remifentanilin dağılım hacmi ve klirensi toplam vücut ağırlığı (TBW) yerine yağsız vücut kütlesi (LBW) ile koreledir (Egan / Minto / SOBA kılavuzu).',
          'BMI ≥ 30–40 kg/m² hastalarda tüm bolus ve infüzyon hesaplamaları LBW (Janmahasatian) veya IBW üzerinden yapılmalıdır.',
          'TBW ile dozlama aşırı yüksek plazma zirvesine, ağır vagotonik bradikardiye, hipotansiyona ve göğüs duvarı rijiditesine yol açar.',
        ]}
        clinicalNote="Yukarıdaki etkileşimli hesaplayıcı içindeki Obezite Doz Ölçekleyici (SOBA / Miller's) kullanılarak hastanın LBW/IBW değeri tek tıkla hesaplamaya aktarılabilir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. GEBELİK VE LAKTASYON KILAVUZU                                     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="FDA Gebelik Kategorisi C · Plasentayı hızla geçer ancak fetal doku esterazları tarafından süratle yıkılır."
        pregnancyDetails={[
          'Doğum analjezisinde epidural blok kontrendike olduğunda hasta kontrollü analjezi (PCA) ile güvenle kullanılabilir; sürekli fetal kalp hızı ve maternal SpO₂ izlenmelidir.',
          'Sezaryen genel anestezi indüksiyonunda maternal hipertansif yanıtı azaltmak için kullanılabilir; doğumda neonatal resüsitasyon ve Nalokson hazır bulundurulmalıdır.',
        ]}
        lactationSummary="Plazma yarı ömrü ~3–4 dakika ve kontekst-duyarlı yarı ömrü sabit olduğundan süte kalıcı geçiş minimaldir."
        lactationDetails={[
          'Tek başına veya kısa cerrahi sonrası anne anesteziden tamamen ayıldığında emzirme güvenlidir.',
          'Uzun süreli YBÜ infüzyonu sonrası bebeğin uyanıklık ve solunum durumu klinik olarak gözlemlenmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <HeartPulse className="w-5 h-5 text-rose-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Önemli Olumsuz Etkiler (Adverse Effects)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-1">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Toraks Rijiditesi (Wooden Chest)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Hızlı IV bolus (&lt; 30 sn) veya yüksek doz infüzyonda göğüs duvarı kaslarında şiddetli rijidite gelişir;
              maskeyle havalandırma imkansızlaşır. (Tedavi: Nöromüsküler bloker veya nalokson).
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-1">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Bradikardi &amp; Hipotansiyon</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Santral vagal stimülasyon ile belirgin sinüs bradikardisi ve vazodilatatör hipotansiyon gelişir. Atropin veya
              glikopirolat ile hızla yanıt alınır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-500/5 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">Opioid İlişkili Hiperaljezi (OIH)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Yüksek doz remifentanil (&gt; 0.25 mcg/kg/dk) sonrası NMDA reseptör aktivasyonu ile postoperatif ağrı eşiği
              düşer, akut aşırı ağrı hassasiyeti oluşabilir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Akut Ağrı Fırtınası</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              İnfüzyon kapatıldığında analjezi 5-10 dakikada biter. Önceden analjezik verilmemişse hasta uyanırken şiddetli
              cerrahi ağrı krizine girer.
            </p>
          </div>

          {/* Serotonin Sendromu */}
          <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900/50 bg-rose-500/10 space-y-1">
            <span className="font-bold text-rose-800 dark:text-rose-300 block">Serotonin Sendromu Riski</span>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              MAO inhibitörleri, SSRI, SNRI, trisiklik antidepresanlar veya linezolid ile eşzamanlı kullanımda santral 5-HT birikimi ile fatal olabilen <strong>Serotonin Sendromu</strong> (mental değişiklik, klonus, ajitasyon, hipertermi, terleme, otonomik labilite) tetiklenebilir.
            </p>
          </div>

          {/* Özofageal Disfonksiyon */}
          <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-900/50 bg-amber-500/10 space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300 block">Özofageal Disfonksiyon &amp; Regürjitasyon</span>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              Alt özofagus sfinkter (LES) tonusunda belirgin gevşeme ve özofagus primer peristaltizminde dismotilite oluşturur. Subklinik <strong>reflü, aspirasyon ve laringospazm</strong> riskini artırır; özellikle sedoanaljezi (MAC) alan spontan soluyan olgularda dikkat edilmelidir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL DURUMLAR                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Stethoscope className="w-5 h-5 text-teal-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar
          </h2>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Postoperatif Analjezi Geçiş Planlaması:</strong> Cerrahi
              sona ermeden 30-45 dakika önce uzun etkili bir analjezik (morfin, tramadol, parasetamol, NSAİİ veya rejyonel blok)
              uygulanmalıdır. Remifentanil kapatıldığında geride hiç analjezik etkisi kalmaz!
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Geriatrik / Yaşlı Hastalar:</strong> 65 yaş üzeri
              hastalarda farmakodinamik duyarlılık 2 kat artar, santral kompartman hacmi küçülür. Başlangıç dozu ve infüzyon
              hızları <strong>%50 oranında azaltılmalıdır</strong>.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Obez Hastalarda Dozlama:</strong> Remifentanil lipofilik
              olmasına karşın aşırı yağ dokusuna belirgin dağılmaz. Doz mutlaka <strong>İdeal Vücut Ağırlığı (IBW)</strong> veya
              yağsız vücut kütlesi (Lean Body Mass) üzerinden hesaplanmalıdır; total ağırlıkla dozlama ölümcül aşırı doza yol açar.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Hızlı Bolustan Kesinlikle Kaçınma:</strong> İndüksiyon bolusları
              asla 30 saniyeden kısa sürede enjekte edilmemelidir. Anestezi uzmanı hazırda atropin ve kas gevşetici bulundurmalıdır.
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. IV UYGULAMA VE SULANDIRMA / HAZIRLAMA ŞEKİLLERİ                */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Pill className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            IV Uygulama ve Sulandırma / Hazırlama Şekilleri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              Piyasa Formları ve Seyreltme Protokolü
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400">
              <li>
                <strong>Türkiye Piyasa Formu:</strong> Türkiye'de sadece <strong>5 mg beyaz liyofilize toz içeren flakon (Ultiva 5 mg)</strong> ruhsatlıdır (1 mg ve 2 mg flakonlar Türkiye piyasasında yer almamaktadır).
              </li>
              <li>
                <strong>Standart Çözelti (50 mcg/mL):</strong> 5 mg flakon önce 5 mL SF ile sulandırılır, ardından 95 mL %0.9 NaCl (veya %5 Dekstroz) ile <strong>100 mL'ye tamamlanır</strong>.
              </li>
              <li>
                <strong>Seyreltik Çözelti (20 mcg/mL):</strong> 5 mg flakon sulandırılıp 250 mL %0.9 NaCl torbasına eklenir (5000 mcg / 250 mL).
              </li>
              <li>
                <strong>Konsantre Çözelti (100 mcg/mL):</strong> 5 mg flakon 50 mL enjektörde SF ile 50 mL'ye tamamlanır (YBÜ / Santral Yol).
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-2">
            <span className="font-bold text-rose-700 dark:text-rose-300 block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Hayati Sulandırma &amp; Uygulama Kuralları</span>
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
              <li>
                <strong>Sulandırılmadan KESİNLİKLE enjekte edilmez!</strong> Daima infüzyon pompası ile kontrollü uygulanmalıdır.
              </li>
              <li>
                <strong>Kan Ürünleri ile Karıştırılmaz:</strong> Kan/plazma ile aynı damar yolundan verilmemelidir (kan esterazları ilacı infüzyon hattında parçalar).
              </li>
              <li>
                <strong>İnfüzyon Hattının Yıkanması (Flushing) Riski:</strong> İnfüzyon kapatıldıktan sonra damar yolu hızlıca
                yıkanırsa hatta kalan remifentanil bolus halinde giderek ani apne ve bradikardiye neden olabilir. Hat kapatılmalı
                veya dikkatle aspire edilmelidir.
              </li>
              <li>
                Geçimlilik: %0.9 NaCl, %5 Dekstroz, Ringer Laktat ile 24 saat oda sıcaklığında stabildir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. İLAÇ GÜVENLİĞİ VE YÜKSEK RİSKLİ İLAÇ (HIGH-ALERT) DURUMLARI     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            İlaç Güvenliği ve Yüksek Riskli İlaç (ISMP High-Alert) Uyarıları
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-1">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Kırmızı Reçete &amp; Narkotik</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Uluslararası kontrole tabi narkotik analjeziktir. Yanlış programlama dakikalar içinde fatal solunum arrestine
              yol açar. Bağımsız çift kontrol zorunludur.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Nörotoksisite (Glisin)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Glisin taşıyıcısı içerdiğinden intratekal/epidural verildiğinde geri dönüşsüz spinal hasara yol açar.
              Nöraksiyel enjektörlerle asla temas etmemelidir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Hızlı Kesilme &amp; Hiperaljezi</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Analjezi infüzyon kapandıktan 5–10 dakika içinde biter. Uzun cerrahi sonrası köprü analjezik
              (parasetamol, NSAİİ, tramadol/morfin) verilmezse akut opioid kaynaklı hiperaljezi gelişir.
            </p>
          </div>
        </div>
      </section>

      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Bağlama Duyarlı Yarı Ömür (CSHT ~3–4 dk — İnfüzyon Süresinden Bağımsız)',
            detail:
              'Non-spesifik plazma ve doku esterazlarıyla hızla yıkıldığı için remifentanilin bağlama duyarlı yarı ömrü (CSHT) 1 saatlik veya 10 saatlik infüzyon sonunda değişmez (~3–4 dakika). Organ yetmezliğinden (böbrek/karaciğer) etkilenmez; ancak analjezi de dakikalar içinde biter.',
          },
          {
            title: 'Akut Opioid Kaynaklı Hiperaljezi (OIH) & Köprü Analjezi Zorunluluğu',
            detail:
              'Özellikle > 0,2–0,3 mcg/kg/dk yüksek doz ve uzun infüzyon sonrası NMDA reseptör aktivasyonu ile postoperatif hiperaljezi gelişebilir. İnfüzyon kapatılmadan 20–30 dk önce mutlaka köprü analjezik (morfin/fentanil/parasetamol/NSAİİ veya düşük doz ketamin) uygulanmalıdır.',
          },
          {
            title: 'İntratekal / Epidural Uygulama KESİNLİKLE KONTRENDİKEDİR (Glisin Taşıyıcı)',
            detail:
              'Ticari remifentanil flakonları taşıyıcı olarak nörotoksik glisin içerir; spinal veya epidural yoldan asla uygulanmaz.',
          },
        ]}
      />

      <HighAlertSafetyBlock
        isDark={isDark}
        tallManName="remiFENTANIL (Ultra-Potent Opioid · Ayrı Hat + Çek-Valf!)"
        confusionRiskWith="FENTANİL · SUFENTANİL · ALFENTANİL"
        antidoteOrRescue="Nalokson HCl + Acil Pozitif Basınçlı Ventilasyon: İnfüzyonu derhal durdurun ve hattaki ölü boşluğu (dead-space) yıkamayın! Apne/göğüs duvarı rijiditesinde %100 O₂ ile BVM ventilasyonu; rijidite ventilasyonu engelliyorsa kısa etkili NMB (süksinilkolin/roküronyum) veya Nalokson 40–80 mcg IV titre edin."
        criticalAlerts={[
          'Ölü Boşluk (Dead-Space) Kazası: Remifentanil hattı asla hızlı sıvı bolusu verilen ana hattan puşe edilmez; hasta uyandıktan sonra hatta kalan kalıntı tek seferde giderek ani apne/rijidite yapabilir.',
          'Obez hastalarda (VKİ ≥ 30) daima LBW veya IBW ile dozlanır; TBW ile dozlama ağır bradikardi ve hipotansiyon riskidir.',
          'İnfüzyon bitiminde hat tamamen çıkarılmalı veya izole şekilde temizlenmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v3.0) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        defaultOpen={false}
        receptorMechanism={{
          title: 'Selektif μ-Opioid (μ₁ / μ₂) Reseptör Sinyal İletimi & KBB Kinetiği',
          summary:
            'Remifentanil saf, yüksek afiniteli ve selektif bir μ-opioid reseptör agonistidir (κ ve δ afinitesi ihmal edilebilir düzeydedir). Düşük pKa (~7.07) sayesinde fizyolojik pH’ta yüksek non-iyonize fraksiyona sahiptir ve kan-beyin bariyerini 1–1.5 dakikada hızla dengeler (t½ke0 ≈ 1.0–1.6 dk).',
          points: [
            'Gi/Go İnhibitör G-Proteini Aktivasyonu: Adenilat siklazı inhibe ederek hücre içi cAMP’yi düşürür.',
            'Presinaptik İnhibisyon: Voltaj-kapılı N-tipi Ca²⁺ kanallarını kapatarak spinal arka boynuzda P maddesi ve glutamat salınımını bloke eder.',
            'Postsinaptik Hiperpolarizasyon: GIRK (G-protein-coupled inwardly rectifying K⁺) kanallarını açarak K⁺ efluksuna ve nöronal hiperpolarizasyona yol açar.',
            'Reseptör Alt Tipi Ayrımı: μ₁ supraspinal analjeziden; μ₂ solunum depresyonu, santral vagotonik bradikardi, göğüs duvarı rijiditesi ve GİS motilite azalmasından sorumludur.',
          ],
        }}
        organEffects={{
          cns: [
            'Doğrudan Hipnotik Değildir (GABA-A ve Amnezi Yoktur): Propofol veya benzodiazepinler gibi doğrudan kortikal GABAerjik inhibisyon yapmaz; tek başına yüksek dozlarda bile güvenilir bilinç kaybı ve amnezi sağlamaz.',
            'Sedasyon Mekanizması — 1 (Supraspinal Uyanıklık Baskılanması): Beyin sapındaki locus coeruleus (noradrenerjik uyanıklık merkezi), asendan retiküler aktive edici sistem (ARAS) ve talamokortikal yollardaki μ-reseptör inhibisyonu ile santral uyarılma tonusunu düşürerek hafif–orta somnolans oluşturur.',
            'Sedasyon Mekanizması — 2 (Analjezi-Temelli Sekonder Sedasyon / Analgosedasyon): Entübe YBÜ hastasında endotrakeal tüp, aspirasyon ve ağrı kaynaklı sürekli afferent nosiseptif girdiyi keserek kortikal uyarımı azaltır (SCCM PADIS "analgesia-first" prensibi).',
            'Serebral Hemodinami & EEG: Normokapni korunduğunda CBF ve CMRO₂’yi hafif azaltır, ICP’yi yükseltmez (hiperkapni gelişirse CBF/ICP artar). Yüksek dozlarda EEG’de delta aktivitesine kayma yapsa da BIS skorunu güvenilir biçimde düşürmez.',
          ],
          cvs: [
            'Santral Vagotonik Bradikardi: Direkt miyokard kontraktilite depresyonu minimaldir; ancak santral vagal çekirdek uyarımı ve sempatik tonusun baskılanmasıyla belirgin bradikardi (özellikle hızlı bolus sonrası veya β-bloker/deksmedetomidin ile) ve doza bağımlı hipotansiyon gelişir.',
            'Histamin Salınımı Yoktur: Morfinin aksine mast hücresi degranülasyonu yapmaz; entübasyon ve cerrahi insizyona bağlı katekolamin stres yanıtını çok güçlü biçimde köreltir.',
          ],
          respiratory: [
            'Medüller Solunum Merkezi (μ₂): CO₂ yanıt eğrisini sağa kaydırır, eğimini düşürür, apneik eşiği yükseltir ve hipoksik ventilatuvar yanıtı baskılar.',
            'Göğüs Duvarı & Laringeal Rijidite ("Tahta Göğüs"): Hızlı bolus (>1 mcg/kg veya <30–60 sn) sonrası santral striatal dopaminerjik/GABAerjik yolaklar üzerinden kas rijiditesi gelişerek maske ventilasyonunu imkânsızlaştırabilir.',
          ],
          other: [
            'Cerrahi stres hormonlarını (kortizol, epinefrin) güçlü baskılar',
            'PONV riskini artırır',
            'Gastrik boşalmayı geciktirir',
            'Yüksek doz/uzun infüzyonda spinal NMDA fosforilasyonu ile akut tolerans & OIH tetikler',
          ],
        }}
        synergyAndCeiling={{
          summary:
            'Remifentanil tek başına tam genel anestezi oluşturamaz; gerçek gücü hipnotiklerle kurduğu güçlü farmakodinamik sinerjiden gelir.',
          points: [
            'İnhalasyon MAC Azaltımı & Tavan Etkisi (Ceiling Effect): Sevofluran/desfluran/izofluran MAC değerini ~%50–70 azaltır; ancak tavan etkisi nedeniyle doz ne kadar artırılırsa artırılsın MAC %100’e düşmez (tek başına anestezi sağlamaz).',
            'Propofol–Remifentanil Sinerjisi (TİVA): Ağrılı uyarana hareket ve hemodinamik yanıtın baskılanmasında güçlü izobologram sinerjisi gösterir; propofol hedef konsantrasyonunu (Ce) belirgin düşürerek hızlı uyanma sağlar.',
            'Nalokson Antagonizması: Saf kompetitif μ-antagonistidir; ancak remifentanilin CSHT’si 3–4 dk olduğundan çoğu vakada infüzyonu durdurup ventilasyon desteği vermek naloksonun yaratacağı ani ağrı/hipertansiyon fırtınasından daha güvenlidir.',
          ],
        }}
        clinicalPearls={[
          'İntraoperatif Farkındalık (Awareness) & BIS Tuzağı: Hasta yüksek doz remifentanil ile hareketsiz ve hemodinamik olarak sakin görünürken kortikal olarak uyanık kalabilir. TİVA’da yeterli hipnotik (propofol) veya inhalasyon ajanı + gerektiğinde işlenmiş EEG (BIS/PSI) zorunludur.',
          'YBÜ’de Sedasyon Uğruna Doz Tırmandırma Hatası: Yetersiz sedasyonda remifentanili tek başına artırmak bilinç kaybı sağlamadan apne, rijidite, bradikardi ve OIH yapar; ek hipnotik/sedatif (propofol, deksmedetomidin veya midazolam) kombine edilmelidir.',
          'Akut Opioid Kaynaklı Hiperaljezi (OIH) Önleme: >0.2–0.3 mcg/kg/dk hızlarda postoperatif ağrı ve opioid ihtiyacı artar; kademeli azaltma, erken köprü analjezi ve/veya düşük doz ketamin/magnezyum koruyucudur.',
          'Kan Ürünleriyle Aynı Hattan Verme: Eritrositlerdeki non-spesifik esterazlar remifentanili daha infüzyon hattındayken parçalayarak ilacı etkisizleştirir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Remifentanil"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'İntratekal / Epidural Uygulama (Glisin İçeriği) & Aynı Hattan Kan Ürünleri',
            mechanism: 'Glisin Nörotoksisitesi / Eritrosit Esteraz Hidrolizi',
            clinicalEffect: 'Nöroaksiyel yolda motor disfonksiyon/nörotoksisite; kan ürünleriyle aynı hatta ilacın hızla inaktivasyonu.',
            management: 'Nöroaksiyel uygulama kesinlikle yasaktır; kan/TDP transfüzyonundan tamamen ayrı IV hat kullanın.',
          },
          {
            severity: 'D',
            agent: 'Propofol · Midazolam · İnhalasyon Anestezikleri',
            mechanism: 'Güçlü Farmakodinamik (PD) Sinerji (SSS & KVS)',
            clinicalEffect: 'Derin solunum depresyonu, apne, hipotansiyon ve MAC/propofol EC50’sinde %50–70 düşüş.',
            management: 'Hipnotik ve inhalasyon dozlarını titre ederek azaltın; ancak farkındalık (awareness) önlemi için hipnotiği tamamen kesmeyin.',
          },
          {
            severity: 'D',
            agent: 'Beta-Blokerler (Esmolol/Metoprolol) · Deksmedetomidin · Kalsiyum Kanal Blokerleri',
            mechanism: 'Aditif Santral Vagotoni + Sempatik Baskılanma',
            clinicalEffect: 'Ciddi sinüs bradikardisi, AV blok, asistol ve dirençli hipotansiyon riski.',
            management: 'Hızlı remifentanil bolusundan kaçının; atropin ve vazopresörü yatak başında hazır bulundurun.',
          },
          {
            severity: 'D',
            agent: 'Serotonerjik Ajanlar (SSRI, SNRI, Linezolid, Metilen Mavisi, MAOİ)',
            mechanism: 'Serotonerjik Aşırı Aktivasyon (Fenilpiperidin Opioidi)',
            clinicalEffect: 'Nadir ancak potansiyel serotonin sendromu (ajitasyon, klonus, hipertermi, otonomik instabilite).',
            management: 'MAOİ/Linezolid alan hastalarda yakın nöromüsküler ve ısı takibi yapın; şüphede ilacı kesin.',
          },
          {
            severity: 'C',
            agent: 'Nöromüsküler Blokerler (Roküronyum / Süksinilkolin)',
            mechanism: 'Opioid Kaynaklı Göğüs Duvarı Rijiditesi Maskelenmesi / Yönetimi',
            clinicalEffect: 'NMB varlığında opioid rijiditesi görülmez; NMB yokken rijidite gelişirse ventilasyon zorlaşır.',
            management: 'İndüksiyonda remifentanil bolusunu yavaş (>60 sn) uygulayın; ventilasyonu engelleyen rijiditede kısa etkili NMB uygulayın.',
          },
        ]}
        references={[
          {
            authors: 'Minto CF, Schnider TW, Egan TD, et al.',
            title: 'Influence of age and gender on the pharmacokinetics and pharmacodynamics of remifentanil. I. Model development.',
            journal: 'Anesthesiology',
            year: 1997,
            pmid: '9009935',
            doi: '10.1097/00000542-199701000-00004',
            note: 'Yaşlılarda %50 doz azaltımı ve obezlerde LBM/IBW esaslı dozlama dayanağı olan Minto PK/PD modeli.',
          },
          {
            authors: 'Glass PS, Gan TJ, Howell S',
            title: 'A review of the pharmacokinetics and pharmacodynamics of remifentanil.',
            journal: 'Anesth Analg',
            year: 1999,
            pmid: '10511072',
            doi: '10.1097/00000539-199910001-00003',
            note: 'Doku/plazma esteraz hidrolizi, sabit 3–4 dakikalık bağlam-duyarlı yarı ömür ve MAC/hipnotik sinerji farmakodinamiği.',
          },
          {
            authors: 'Devlin JW, Skrobik Y, Gélinas C, et al. (SCCM PADIS)',
            title: 'Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU.',
            journal: 'Crit Care Med',
            year: 2018,
            pmid: '30113379',
            doi: '10.1097/CCM.0000000000003299',
            note: 'Yoğun bakımda analgesia-first (analgosedasyon) stratejisi ve organ yetmezliğinde remifentanil kullanımı.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/remifentanil-index.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
