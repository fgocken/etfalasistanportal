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
  MonographQuickNav,
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
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0)                                   */}
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
          { id: 'sec-gebelik', label: 'Gebelik' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="remiFENTANIL"
        confusionRiskWith="FENTANİL · SUFENTANİL · ALFENTANİL"
        antidoteOrRescue="Nalokson HCl + Acil Pozitif Basınçlı Ventilasyon: İnfüzyonu derhal durdurun ve hattaki ölü boşluğu (dead-space) yıkamayın! Apne/göğüs duvarı rijiditesinde %100 O₂ ile BVM ventilasyonu; rijidite ventilasyonu engelliyorsa kısa etkili NMB (süksinilkolin/roküronyum) veya Nalokson 40–80 mcg IV titre edin."
        criticalAlerts={[
          'Kırmızı Reçete & Bağımsız Çift Kontrol: Uluslararası kontrole tabi ultra-potent narkotik analjeziktir; yanlış pompa programlaması dakikalar içinde fatal solunum arrestine yol açar.',
          'Ölü Boşluk (Dead-Space) Kazası: Remifentanil hattı asla hızlı sıvı bolusu verilen ana hattan puşe edilmez; hasta uyandıktan sonra hatta kalan kalıntı tek seferde giderek ani apne/rijidite yapabilir.',
          'Nöroaksiyel Kontrendikasyon (Glisin): Ticari flakonlar nörotoksik glisin içerir; intratekal veya epidural yoldan asla uygulanmaz ve nöroaksiyel enjektörlerle temas ettirilmez.',
          'Obez hastalarda (VKİ ≥ 30) daima LBW veya IBW ile dozlanır; TBW ile dozlama ağır bradikardi ve hipotansiyon riskidir. İnfüzyon bitiminde hat tamamen çıkarılmalı veya izole temizlenmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
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
        id="sec-pkpd"
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
        id="sec-kontrendikasyon"
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
        id="sec-endikasyon"
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
        id="sec-dozlar"
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
        id="sec-hesaplayici"
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
      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Remifentanil 5 mg Flakon (Ultiva / Ruhsatlı Tek Türkiye Formu)',
            presentation: 'IV infüzyon için beyaz liyofilize toz içeren cam flakon (Türkiye piyasasında 1 mg ve 2 mg flakonlar ruhsatlı değildir; yalnızca 5 mg flakon bulunur)',
            concentration: '5 mg (5000 mcg) / flakon',
            saltOrBaseNote: '5 mg remifentanil baza eşdeğer remifentanil hidroklorür + 15 mg GLİSİN taşıyıcı içerir (nöroaksiyel uygulama kesinlikle kontrendikedir).',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'İlk Sulandırma (Reconstitution): 5 mg liyofilize toz flakon önce 5 mL %0.9 NaCl veya Enjeksiyonluk Su ile tamamen çözülür (1 mg/mL stok elde edilir).',
          'Standart Erişkin (50 mcg/mL): Sulandırılmış 5 mg flakon (5 mL) + 95 mL %0.9 NaCl veya %5 Dekstroz → toplam 100 mL (ameliyathane & genel YBÜ standardı).',
          'Konsantre / Sıvı Kısıtlamalı YBÜ (100 mcg/mL): Sulandırılmış 5 mg flakon → 50 mL enjektör pompası içinde SF ile 50 mL’ye tamamlanır.',
          'Pediatrik / Seyreltik Titrasyon (20 mcg/mL): Sulandırılmış 5 mg flakon → 250 mL %0.9 NaCl torbasına eklenir (5000 mcg / 250 mL).',
        ]}
        concentrationTrapWarning="Sulandırılmadan KESİNLİKLE enjekte edilmez; daima infüzyon pompası ile kontrollü uygulanmalıdır. Enjektör veya torba etiketine hazırlanan nihai konsantrasyon (20, 50 veya 100 mcg/mL) mutlaka açıkça yazılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0)  */}
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
        id="sec-organ"
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
        id="sec-olumsuz"
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
              'Özellikle > 0,2–0,3 mcg/kg/dk yüksek doz ve uzun infüzyon sonrası NMDA reseptör aktivasyonu ile postoperatif hiperaljezi gelişebilir. İnfüzyon kapatılmadan 30–45 dk önce mutlaka uzun etkili köprü analjezik (morfin/fentanil/parasetamol/NSAİİ, rejyonel blok veya düşük doz ketamin) uygulanmalıdır.',
          },
          {
            title: 'Hızlı Bolustan Kesinlikle Kaçınma (> 30–60 sn İnfüzyon Kuralı)',
            detail:
              'İndüksiyon bolusları asla 30 saniyeden kısa sürede enjekte edilmemelidir (tercihen ≥ 60 sn). Göğüs duvarı rijiditesi ve ani vagotonik bradikardiye karşı yatak başında atropin ve kısa etkili NMB hazır bulundurulmalıdır.',
          },
          {
            title: 'İntratekal / Epidural Uygulama KESİNLİKLE KONTRENDİKEDİR (Glisin Taşıyıcı)',
            detail:
              'Ticari remifentanil flakonları taşıyıcı olarak nörotoksik glisin içerir; spinal veya epidural yoldan asla uygulanmaz.',
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
          title: 'Hücre Zarı & Moleküler Hedef (7-TM μ-Opioid Reseptörü [MOR / OPRM1], Esteraz Biyofiziği & NMDA/5-HT Etkileşimi)',
          summary:
            'Remifentanil (metil 4-(metoksikarbonil)-4-[(1-oksopropil)fenilamino]-1-piperidinpropanoat), presinaptik ve postsinaptik nöron membranındaki 7-transmembran (7-TM) G-proteini kenetli μ-opioid reseptörünün (MOR / OPRM1) ortosterik bağlanma cebine yüksek afinite ve seçicilikle (Ki ≈ 1,2–2,6 nM; κ ve δ reseptör afinitesi >1000 kat daha düşük) bağlanan saf tam agonisttir. Düşük pKa (~7,07) değeri sayesinde fizyolojik pH’ta (7,4) ~%68 oranında non-iyonize (yüksüz) baz formunda bulunur ve kan-beyin bariyerini 1–1,5 dakikada dengeler (t½ke0 ≈ 1,1–1,6 dk) (Miller’s 10th Ed. / Stoelting’s 6th Ed.).',
          points: [
            'Nöronal Membran MOR (OPRM1) Ortosterik Bağlanma Cebi & Gαi/o Kenetlenmesi: Primer afferent C ve Aδ nosiseptörlerinin presinaptik terminalleri, spinal kord arka boynuz lamina I/II (substantia gelatinosa) projeksiyon nöronları, periaquaduktal gri cevher (PAG), rostral ventromedüller (RVM) çekirdekler ve pre-Bötzinger solunum merkezi nöron zarındaki MOR reseptörlerinin TM3/TM6/TM7 heliks cebine bağlanarak pertussis toksinine duyarlı heterotrimerik Gαi/o proteinlerinin GDP→GTP değişimini tetikler.',
            'Eritrosit & Doku Non-Spesifik Karboksilesteraz (CES) Biyofiziği: Piperidin halkasına bağlı propanoik asit metil ester yan zinciri, dolaşımdaki eritrosit membran/sitozol esterazları ve yaygın doku karboksilesterazları tarafından enzimatik hidrolizle karboksilik asit metabolitine (GI-90291; MOR afinitesi ~1/4600) parçalanır. Bu yıkım plazma bütirilkolinesterazından (psödokolinesteraz) ve hepatik CYP enzimlerinden tamamen bağımsızdır.',
            'Postsinaptik NMDA (NR1/NR2B) Reseptör Çapraz-Konuşması (Cross-Talk): Yüksek doz veya uzamış MOR uyarımı, arka boynuz postsinaptik membranında μ-opioid reseptörü ile aynı lipid salında (lipid raft) komşu olan glutamaterjik NMDA (özellikle NR2B alt birimi) kanallarının tirozin/serin fosforilasyonu üzerinden Mg²⁺ blokajını kaldırarak paradoksal reseptör hipereksitabilitesine zemin hazırlar.',
            'Ticari Formülasyon Glisin Taşıyıcısı & Serotonerjik (SERT) Etkileşim: Liyofilize flakondaki 15 mg glisin tamponu spinal kord inhibitör glisin reseptörleri (GlyR) üzerinde doğrudan nörotoksik/motor paralitik etki gösterdiğinden nöroaksiyel membranlara teması mutlak kontrendikedir. Fenilpiperidin halkası zayıf presinaptik 5-HT geri alım (SERT) etkileşimi göstererek MAOİ/SSRI varlığında sinaptik serotonin birikimine katkıda bulunabilir.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'MOR aktivasyonu ile heterotrimerik Gi/o proteininin Gαi ve Gβγ alt birimlerine ayrışması; presinaptik akson terminalinde vezikül ekzositozunu durduran, postsinaptik dendritte ise membranı hiperpolarize eden iki yönlü bir hücre içi elektrokimyasal kaskad başlatır:',
          points: [
            'Gαi/o → Adenilat Siklaz (AC) İnhibisyonu → cAMP↓ → PKA↓ Kaskadı: Aktif Gαi alt birimi membrana bağlı Adenilat Siklaz (Tip I/V/VI) enzimini doğrudan inhibe eder. Hücre içi siklik AMP (cAMP) konsantrasyonunun düşmesiyle Protein Kinaz A (PKA) aktivitesi baskılanır; nosiseptörlerde voltaj kapılı Na⁺ kanallarının (Nav1.7/1.8), TRPV1 katyon kanallarının ve CREB transkripsiyon faktörünün fosforilasyonu azalır.',
            'Presinaptik Gβγ → N/P/Q-Tipi Ca²⁺ (Cav2.2) Kanal Blokajı & SNARE Ekzositoz Durması: Serbestleşen Gβγ dimerleri, spinal arka boynuz lamina I/II’deki primer afferent C ve Aδ terminallerinin presinaptik zarında yer alan voltaj kapılı N-tipi (Cav2.2) ve P/Q-tipi (Cav2.1) kalsiyum kanallarına doğrudan bağlanarak kanalın açılma olasılığını düşürür. Akson ucuna Ca²⁺ girişi kesilince sinaptotagmin-SNARE vezikül füzyon kompleksi tetiklenemez; Glutamat, P Maddesi (Substance P) ve CGRP içeren sinaptik veziküllerin ekzositozu bloke edilir.',
            'Postsinaptik Gβγ → GIRK (Kir3.1/3.2) Kanal Aktivasyonu → K⁺ Efluksu & Hiperpolarizasyon: Postsinaptik spinotalamik projeksiyon nöronlarında ve beyin sapı çekirdeklerinde Gβγ alt birimi, G-proteini kenetli içeri doğrultucu potasyum kanallarına (GIRK / Kir3) doğrudan bağlanarak kanalı açar. Hücre dışına hızlı K⁺ çıkışı (efluksu) dinlenim membran potansiyelini −70 mV’un altına (hiperpolarizasyon) çekerek eksitatör postsinaptik potansiyellerin (EPSP) aksiyon potansiyeli eşiğine ulaşmasını engeller.',
            'PKC-γ Aktivasyonu, β-Arrestin-2 & NMDA Hücre İçi Ca²⁺/NO Kaskadı (Akut OIH Mekanizması): Sürekli yüksek doz (>0,25–0,3 mcg/kg/dk) MOR uyarımı G-proteini kenetli reseptör kinazları (GRK2/3) ve β-arrestin-2’yi devreye sokarken, hücre içi Protein Kinaz C-gamma (PKC-γ) ve Src tirozin kinaz aracılığıyla NMDA (NR2B) reseptörlerini fosforiller → postsinaptik sitozole Ca²⁺ akışı, Kalmodulin/CaMKII ve nöronal Nitrik Oksit Sentaz (nNOS → NO) üretimi artarak akut tolerans ve opioid ilişkili hiperaljezi (OIH) gelişir.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Spinal Arka Boynuz, Beyin Sapı & Talamokortikal Ağ → SSS & Analjezi',
            tissueTarget: 'Lamina I/II · PAG–RVM · Locus Coeruleus',
            accent: 'indigo',
            points: [
              'Asendan Nosiseptif Kapı Kapanması & Desendan İnhibisyon: Spinal arka boynuz lamina I/II’de Aδ/C-lifi→spinotalamik sinaps iletimi kesilirken; periaquaduktal gri cevher (PAG) ve RVM’deki tonik GABAerjik internöronların MOR aracılı inhibisyonu (disinhibisyon), medullaspinal serotonerjik/noradrenerjik desendan ağrı baskılayıcı yolu aktive eder.',
              'Sedasyon vs Hipnoz/Amnezi Ayrımı (Locus Coeruleus): Locus coeruleus noradrenerjik nöronlarının GIRK aracılı hiperpolarizasyonu ve afferent ağrı girdisinin kesilmesiyle analgosedasyon (SCCM PADIS "analgesia-first") sağlar; ancak kortikal GABA-A reseptörlerini etkilemediğinden tek başına güvenilir hipnoz veya amnezi OLUŞTURMAZ.',
              'Serebral Hemodinami & Edinger-Westphal Miyozisi: Normokapni korunduğunda serebral kan akımı (CBF), CMRO₂ ve kafa içi basıncını (ICP) hafif düşürür ve otoregülasyonu korur; okulomotor sinir Edinger-Westphal parasempatik çekirdeğindeki GABAerjik inhibisyonu kaldırarak toplu iğne başı (pinpoint) miyozis yapar.',
            ],
          },
          {
            systemTitle: 'Pre-Bötzinger Kompleksi, Kemoreseptörler & Striatal Motor Ağ → Solunum & Toraks',
            tissueTarget: 'Pre-Bötzinger · Karotid Cisimcik · Nükleus Ambiguus',
            accent: 'rose',
            points: [
              'Pre-Bötzinger Solunum Pacemaker İnhibisyonu: Medüller pre-Bötzinger kompleksindeki inspiratuar ritim üreten nöronlarda GIRK açılması ve cAMP düşüşüyle solunum frekansı yavaşlar (tidal hacim başlangıçta korunur, ardından düşer); PaCO₂–ventilasyon yanıt eğrisi sağa ve aşağı kayar, apneik eşik yükselir.',
              'Üst Hava Yolu Refleks Süpresyonu & Antitüssif Etki: Nükleus traktus solitarius (NTS) ve laringeal/trakeal mekanoreseptör arkını güçlü biçimde baskılayarak endotrakeal tüp toleransı, laringoskopi/bronkoskopi sırasında öksürük ve öğürme refleksi kontrolü sağlar.',
              'Toraks & Laringeal Rijidite ("Tahta Göğüs / Wooden Chest"): Hızlı IV bolus (>1 mcg/kg veya <30–60 sn) bazal gangliyon/striatal ve pontin nükleus raphe magnus dopaminerjik-GABAerjik devrelerini akut etkileyerek torakoabdominal kaslarda ve özellikle vokal kordlarda (glottik kapanma!) santral spastisite yaratarak BVM ventilasyonunu imkânsızlaştırır.',
            ],
          },
          {
            systemTitle: 'Medüller Vagal Çekirdek, Sempatik Merkez & Miyokard → Kardiyovasküler Sistem',
            tissueTarget: 'Nükleus Ambiguus · RVLM · SA/AV Düğüm',
            accent: 'amber',
            points: [
              'Santral Vagotoni & Sempatolizis: Medüller nükleus ambiguus/dorsal motor vagal çekirdeğin disinhibisyonu ve rostral ventrolateral medulla (RVLM) sempatik çıkışının baskılanmasıyla SA düğüm hızı ve AV iletim yavaşlar → belirgin sinüs bradikardisi ve sistemik vasküler direnç (SVR) düşüşü.',
              'Sıfır Histamin Deşarjı & Korunmuş Miyokard Kontraktilitesi: Morfin ve meperidinin aksine kutanöz/vasküler mast hücrelerinden histamin salınımı YAPMAZ ve kardiyomiyosit L-tipi Ca²⁺ akımını doğrudan deprese etmez; cerrahi insizyon ve entübasyona bağlı katekolamin/kortizol fırtınasını doz-bağımlı bloke eder.',
              'Ön-Yük Bağımlılığı & Hipovolemik/Ortostatik Hipotansiyon: Venöz kapasitans artışıyla venöz dönüş azalır; hipovolemik hastada veya β-bloker/kalsiyum kanal blokeri/deksmedetomidin eşzamanlı kullanımında derin bradikardi ve asistoliye ilerleyebilir (Atropin/Glikopirolat ile hızla geri döner).',
            ],
          },
          {
            systemTitle: 'Eritrosit/Doku Esterazları, Enterik Pleksus & Biliyer Düz Kas → Metabolik & GİS',
            tissueTarget: 'Eritrosit Esterazları · Miyenterik Pleksus · LES & Oddi',
            accent: 'teal',
            points: [
              'Eritrosit & Doku Esteraz Klirensi (~40–50 mL/kg/dk): Karaciğer kan akımını aşan ekstrahepatik klirensi sayesinde an체patik fazda (karaciğer nakli), ağır sirozda ve anürik böbrek yetmezliğinde dahi sabit 3–4 dakikalık CSHT değişmez; kan ürünleriyle aynı hattan verilirse hat içinde eritrosit esterazlarıyla parçalanır.',
              'Alt Özofagus Sfinkteri (LES) & Enterik Miyenterik Pleksus: Miyenterik (Auerbach) pleksusta asetilkolin salınımını inhibe ederek gastrik boşalmayı yavaşlatır, LES tonusunu düşürür ve primer özofagus peristaltizmini bozar (spontan soluyan MAC sedasyonunda subklinik regürjitasyon riski!).',
              'Oddi Sfinkteri & Area Postrema (CTZ / PONV): Biliyer düz kas ve Oddi sfinkter tonusunu artırabilir; area postrema kemoreseptör tetik bölgesi (CTZ) ve vestibüler çekirdek uyarımıyla postoperatif bulantı-kusma (PONV) tetikler (ancak ultra-kısa yarı ömrü nedeniyle etkisi infüzyon sonrası hızla azalır).',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Akut Tolerans / Hiperaljezi (OIH), Hipnotik Sinerjisi & Tavan Etkisi',
          summary:
            'Remifentanil tek başına tam genel anestezi oluşturamaz; klinik mükemmelliği propofol ve volatil anesteziklerle kurduğu supra-aditif (sinerjistik) etkileşimden ve sabit 3–4 dakikalık bağlam-duyarlı yarı ömründen (CSHT) kaynaklanır.',
          points: [
            'Volatil Anestezik MAC Azaltımı & Tavan Etkisi (Ceiling Effect): Sevofluran, desfluran ve izofluranın MAC (ve özellikle MAC-BAR) değerini plazma konsantrasyonu 1–4 ng/mL aralığında eksponansiyel olarak %50–70 oranında düşürür; ancak >8–10 ng/mL üzerinde MOR doygunluğu nedeniyle belirgin bir tavan etkisine (ceiling effect) ulaşır — doz ne kadar artırılırsa artırılsın MAC %100 sıfırlanmaz ve tek başına bilinç kaybı/amnezi garanti etmez.',
            'Propofol–Remifentanil TİVA İzobologram Sinerjisi (Minto–Schnider): Propofol (GABA-A kortikal hipnoz/amnezi) ile remifentanil (MOR spinal/supraspinal anti-nosisepsiyon) güçlü supra-aditif sinerji gösterir: laringoskopi ve cerrahi insizyona hareket/otonomik yanıt için gereken propofol hedef konsantrasyonunu (Ce) %40–60 düşürerek uzun cerrahiler sonunda dahi 5–10 dakikada ekstübasyon sağlar.',
            'Akut Reseptör Desensitizasyonu & Opioid-İlişkili Hiperaljezi (OIH): >0,25–0,30 mcg/kg/dk yüksek hızlarda ≥2–3 saat infüzyon; GRK/β-arrestin-2 aracılı hızlı MOR internalizasyonu (akut taşiflaksi) ve PKC-γ/Src aracılı spinal NMDA (NR2B) reseptör aktivasyonu tetikler. İnfüzyon aniden kapatıldığında esterazlarla MOR agonizması 5 dakikada sıfırlanırken, fosforile NMDA kanalları açık kalarak postoperatif "akut ağrı fırtınası" ve hiperaljezi üretir (önlem: düşük doz Ketamin 0,15–0,3 mg/kg/saat, Magnezyum, kademeli weaning ve 30–45 dk önce uzun etkili köprü analjezi).',
          ],
        }}
        clinicalPearls={[
          'İntraoperatif Farkındalık (Awareness) & BIS Tuzağı: Yüksek doz remifentanil alan hasta hareketsiz, bradikardik ve normotansif görünürken kortikal olarak tamamen uyanık olabilir ve BIS skoru düşmeyebilir! TİVA’da propofol infüzyon hattının ayrılmadığından emin olunmalı ve mutlaka hipnotik ajan + işlenmiş EEG (BIS/PSI) kullanılmalıdır.',
          'Ölü Boşluk (Dead-Space) Solunum Arresti: Ameliyat sonunda hasta uyandırılıp servise/PACU’ya gönderilirken IV uzatma hattında kalan 1–2 mL remifentanil (50–100 mcg!) antibiyotik veya SF yıkamasıyla (flush) hastaya puşe edilirse 45 saniye içinde tahta göğüs rijiditesi ve solunum arresti gelişir — infüzyon bitiminde uzatma hattı mutlaka çıkarılmalı veya enjektörle geri aspire edilmelidir.',
          'Akut Ağrı Fırtınası & 30–45 Dakika Köprü Kuralı: Sabit 3–4 dk CSHT nedeniyle pompa kapatıldıktan 5–10 dk sonra plazmada hiç analjezik kalmaz. Majör cerrahide cilt kapatılmadan 30–45 dk önce IV Morfin (0,1–0,15 mg/kg), Fentanil, Parasetamol + NSAİİ veya rejyonel blok uygulanmamışsa hasta ekstübasyonda şiddetli ağrı, ajitasyon, hipertansiyon ve taşikardi krizine girer.',
          'Kan Transfüzyonu Hattı İnaktivasyonu: Eritrosit süspansiyonu veya Taze Donmuş Plazma (TDP) ile aynı Y-site lümeninden yavaş hızda verildiğinde, kan ürünlerindeki non-spesifik esterazlar remifentanili daha hastaya ulaşmadan set içinde hidrolize ederek etkisizleştirir.',
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
