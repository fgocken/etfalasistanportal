import React, { useState, useId } from 'react';
import {
  Activity,
  HeartPulse,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
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
  Layers,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Timer,
  Eye,
  RefreshCw,
  Shield,
  BookOpen
} from 'lucide-react';
import {
  CompatibilityAndLineBlock,
  ContraindicationsGridBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

export const NorepinephrineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);

  // Çözelti Hazırlama Modu
  // vial_50: 4 mg / 50 mL = 80 mcg/mL (Standart YBÜ & Acil)
  // vial_50_double: 8 mg / 50 mL = 160 mcg/mL (Sıvı Kısıtlı YBÜ)
  // vial_50_quad: 16 mg / 50 mL = 320 mcg/mL (Aşırı Sıvı Kısıtlı / ARDS)
  // bag_250: 4 mg / 250 mL = 16 mcg/mL (Torba İnfüzyonu)
  // bag_500: 8 mg / 500 mL = 16 mcg/mL (Büyük Torba)
  // custom_conc: Kullanıcı tanımlı konsantrasyon
  const [prepType, setPrepType] = useState<
    'vial_50' | 'vial_50_double' | 'vial_50_quad' | 'bag_250' | 'bag_500' | 'custom_conc'
  >('vial_50');
  const [customConcInput, setCustomConcInput] = useState<number>(80); // mcg/mL

  // Doz Girdi Modu: 'weight_based' (mcg/kg/dk) veya 'absolute' (mcg/dk)
  const [doseMode, setDoseMode] = useState<'weight_based' | 'absolute'>('weight_based');
  const [doseMcgKgMin, setDoseMcgKgMin] = useState<number>(0.10); // mcg/kg/dk
  const [doseMcgMin, setDoseMcgMin] = useState<number>(7.0); // mcg/dk

  // Akordiyon State'leri
  const [pkOpen, setPkOpen] = useState<boolean>(false);
  const [pushDoseOpen, setPushDoseOpen] = useState<boolean>(true);

  // Push-Dose Simülasyonu
  const [pushDosePrep, setPushDosePrep] = useState<'10mcg' | '16mcg'>('10mcg');
  const [pushDoseBolusMcg, setPushDoseBolusMcg] = useState<number>(10); // 10 veya 20 mcg

  // Erişilebilirlik Kimlikleri
  const weightInputId = useId();
  const prepSelectId = useId();
  const doseSliderId = useId();
  const customConcInputId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'vial_50':
        return 80.0; // 4 mg / 50 mL
      case 'vial_50_double':
        return 160.0; // 8 mg / 50 mL
      case 'vial_50_quad':
        return 320.0; // 16 mg / 50 mL
      case 'bag_250':
        return 16.0; // 4 mg / 250 mL
      case 'bag_500':
        return 16.0; // 8 mg / 500 mL
      case 'custom_conc':
        return customConcInput > 0 ? customConcInput : 80.0;
      default:
        return 80.0;
    }
  })();

  // Doz moduna göre senkronize değerler
  const activeDoseMcgKgMin = doseMode === 'weight_based' 
    ? doseMcgKgMin 
    : (weightKg > 0 ? doseMcgMin / weightKg : 0);

  const activeDoseMcgMin = doseMode === 'weight_based'
    ? doseMcgKgMin * weightKg
    : doseMcgMin;

  // --- İNFÜZYON HESAPLAMALARI ---
  // Saatlik doz (mcg/saat) = mcg/dk * 60
  const hourlyDoseMcg = activeDoseMcgMin * 60;
  // İnfüzyon debisi (mL/saat) = mcg/saat / (mcg/mL)
  const infusionRateMlHr = concentrationMcgMl > 0 ? hourlyDoseMcg / concentrationMcgMl : 0;
  // 24 saatlik toplam tüketim
  const dailyTotalMcg = hourlyDoseMcg * 24;
  const dailyTotalMg = dailyTotalMcg / 1000;
  const dailyTotalMl = infusionRateMlHr * 24;
  // 24 saatlik ampul ihtiyacı (1 ampul = 4 mg)
  const dailyAmpoulesNeeded = dailyTotalMg / 4;

  // Klinik Doz Bölgesi Belirleme
  const doseTier: 'low' | 'moderate' | 'high_vasopressin' | 'refractory' = (() => {
    if (activeDoseMcgKgMin < 0.05) return 'low';
    if (activeDoseMcgKgMin <= 0.25) return 'moderate';
    if (activeDoseMcgKgMin <= 0.50) return 'high_vasopressin';
    return 'refractory';
  })();

  // Push-dose ml hesabı
  const pushDoseConcVal = pushDosePrep === '10mcg' ? 10 : 16;
  const pushDoseVolumeMl = pushDoseConcVal > 0 ? pushDoseBolusMcg / pushDoseConcVal : 1;

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
          { id: 'sec-dozaj', label: 'Dozaj' },
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
        tallManName="NORepinephrine"
        confusionRiskWith="EPINEPHrine · EPHEDRINE"
        criticalAlerts={[
          'ISMP Tall-Man Etiketleme & Çift Kontrol: NORepinephrine (Noradrenalin) ile EPINEPHrine (Adrenalin) enjektörleri asla aynı sepette tutulmamalı; pompa programlamasında (80 / 160 / 320 mcg/mL) bağımsız çift kontrol yapılmalıdır.',
          '2:1 Baz/Bitartrat Tuzağı (ESICM 2023/2024): TR 4 mL ampul 8 mg noradrenalin bitartrat (= 4 mg noradrenalin BAZ) içerir. Tüm uluslararası doz eşikleri (SSC 2021 vazopresin eşiği 0.25–0.50 mcg/kg/dk) 4 mg BAZ üzerinden hesaplanır.',
          'Torba/Enjektör Değişiminde Çift Pompa (Smart Switchover): Yarı ömrü 1–2 dk olduğundan 2–3 dakikalık kesinti ani derin hipotansiyona ve arreste yol açabilir; yedek enjektör daima önceden hazırlanmalıdır.',
          'Alkali İnaktivasyon & Ekstravazasyon: Sodyum Bikarbonat (%8.4 NaHCO₃) ile aynı lümenden asla verilmez; periferik sızıntı doku nekrozu yapar (12 saat içinde Fentolamin SC infiltrasyon).',
        ]}
        antidoteOrRescue="Ekstravazasyonda infüzyonu derhal durdurun, kanülden aspire edin ve 12 saat içinde 5–10 mg Fentolamin (10–15 mL SF) SC çember şeklinde infiltre edin (Fentolamin yoksa Terbutalin 1 mg/10 mL SF lokal infiltrasyon veya topikal %2 Nitrogliserin + ılık kompres; BUZ/SOĞUK ASLA UYGULANMAZ!). Sistemik doz aşımında infüzyonu kapatmak 2–5 dk içinde etkiyi sonlandırır."
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
              <span className="font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15">
                Vazoaktif / Vazopressör Ajan
              </span>
              <span aria-hidden="true">·</span>
              <span>Steradin · Cardenor · Levophed · Noradrenalin</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: C01CA03</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Noradrenalin (Norepinefrin) Bitartrat Monografisi
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Endojen
              katekolamin; çok güçlü periferik <strong>α₁-adrenerjik</strong> reseptör agonisti, ılımlı miyokardiyal{' '}
              <strong>β₁-adrenerjik</strong> agonisti ve eser/ihmal edilebilir <strong>β₂</strong> etkisi olan altın
              standart birinci tercih vazopressördür.
            </p>
          </div>
        </div>

        {/* Reseptör Profili & Nöro-Hemodinamik Temel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-rose-600 dark:text-rose-400">
              <Zap className="w-4 h-4 shrink-0" />
              <span>Alfa-1 (α₁) Çok Güçlü (+++++)</span>
            </div>
            <p className="text-xs leading-relaxed">
              Arteriyoler ve venöz güçlü vazokonstriksiyon. Sistemik Vasküler Direnç (SVR) belirgin artar, Ortalama
              Arteryel Basınç (MAP) yükselir. Kapasitans venlerini daraltarak <em>unstressed</em> kan hacmini{' '}
              <em>stressed</em> hacme aktarır; venöz dönüşü ve sağ ventrikül ön-yükünü (preload) artırır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <HeartPulse className="w-4 h-4 shrink-0" />
              <span>Beta-1 (β₁) Ilımlı (++)</span>
            </div>
            <p className="text-xs leading-relaxed">
              Doğrudan pozitif inotropik ve ılımlı kronotropik etki. Düşük dozlarda kardiyak debiyi (CO) korur veya artırır;
              ancak yüksek dozlarda veya normovolemide SVR artışına ikincil baroreseptör uyarımı refleks bradikardi yaratabilir
              ve sol ventrikül afterload'u artarak CO düşebilir.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700/60 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Beta-2 (β₂) Eser / Minimal (0 / +)</span>
            </div>
            <p className="text-xs leading-relaxed">
              Adrenaline kıyasla belirgin bronkodilatasyon, periferik iskelet kası vazodilatasyonu veya belirgin laktat
              artışı (glikojenoliz) oluşturmaz. Bu nedenle septik şokta hemodinamik yanıtı öngörülebilir ve metabolik
              olarak daha temiz bir profildir.
            </p>
          </div>
        </div>

        {/* Etki Mekanizması & Moleküler Sinyal Yolağı */}
        <div
          id="sec-etki"
          className={`mt-4 p-4 rounded-xl border leading-relaxed text-xs sm:text-sm ${
            isDark
              ? 'bg-rose-950/20 border-rose-900/50 text-rose-100'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Activity className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-sm block">Etki Mekanizması &amp; Moleküler Sinyal Yolakları:</span>
              <p>
                Damar düz kasındaki postsinaptik <strong>α₁-adrenoseptörlere (Gq proteini kenetli)</strong> yüksek afiniteli
                bağlanarak fosfolipaz C aktivasyonu üzerinden IP₃/DAG üretir; sarkoplazmik retikulumdan Ca²⁺ salınımı ile
                güçlü arteriyoler ve venöz kasılma oluşturur (SVR↑, venöz dönüş/preload↑). Kalpte{' '}
                <strong>β₁-reseptörlerini (Gs → cAMP↑ → PKA → L-tipi Ca²⁺ akımı↑)</strong> uyararak kontraktiliteyi destekler;
                periferik <strong>β₂-etkisi minimal</strong> olduğundan vazodilatasyon veya β₂-aracılı Tip-B laktat artışı yapmaz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK ÖZELLİKLER (PK/PD AKORDİYON)                      */}
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
          aria-expanded={pkOpen}
          className={`w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Farmakokinetik &amp; Farmakodinamik (PK/PD) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  t½: 1–2 dk (Ultra-kısa)
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Organ yetmezliğinden bağımsız klirens, uptake-1 nöronal geri alım ve MAO/COMT doku metabolizması.
              </p>
            </div>
          </div>
          {pkOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Başlangıcı (Onset)
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Anında arteryel vazokonstriksiyon</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Zirve Etki (Peak)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  2 – 5 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Kararlı plazma konsantrasyonu</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Eliminasyon Yarı Ömrü
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">İnfüzyon kesilince hızlı sonlanma</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-base font-bold font-mono text-purple-600 dark:text-purple-400 mt-1 block">
                  0.1 – 0.2 L/kg
                </span>
                <span className="text-[10px] text-slate-400">Primer intravasküler dağılım</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
              isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-500" />
                <span>Metabolizma &amp; Organ Fonksiyonundan Bağımsız Eliminasyon:</span>
              </h4>
              <p>
                Norepinefrin plazmadan primer olarak sempatik sinir uçlarındaki presinaptik <strong>Uptake-1 (nöronal geri alım)</strong> mekanizması
                ile temizlenir. Dokularda ve karaciğerde <strong>COMT (Katekol-O-metiltransferaz)</strong> ve <strong>MAO (Monoamin oksidaz)</strong> enzimleri
                tarafından hızla inaktif metabolitlere (Normetanefrin, VMA - vanililmandelik asit) dönüştürülür ve idrarla atılır.
              </p>
              <div className="p-3 rounded-lg border bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200 font-medium">
                <strong>Klinik Çıkarım:</strong> Klirens karaciğer veya böbrek fonksiyonuna bağımlı değildir. Ağır hepatik veya renal
                yetmezlikte doz düşürülmez; hedef MAP değerine (≥ 65 mmHg) ulaşılana kadar titre edilir. Ancak infüzyon kesildiğinde
                dakikalar içinde etkisi bittiğinden sürekli infüzyon kesintiye uğratılmamalıdır (serum torbası değişimi hızlı yapılmalıdır).
              </div>
            </div>
          </div>
        )}
      </section>

      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Düzeltilmemiş ağır hipovolemi (sıvı resüsitasyonu yapılmadan tek başına başlanması splanknik/renal iskemiyi derinleştirir).',
          'Mezenterik veya periferik vasküler tromboz (yalnızca hayat kurtarıcı acil perfüzyon gerekliliğinde istisna).',
          'Ciddi hipoksi ve hiperkapniyle birlikte halotan/siklopropan anestezisi altında malign ventriküler aritmi riski.',
        ]}
        relativeItems={[
          'MAO inhibitörleri veya trisiklik antidepresan (TCA) kullanımı: Presör etki 2–10 kat artabilir; düşük dozla başlanmalıdır.',
          'Non-selektif beta-bloker kullanımı: Karşılanmamış alfa-1 vazokonstriksiyon nedeniyle şiddetli hipertansif yanıt gelişebilir.',
          'Şiddetli asidemi (pH < 7.15): Katekolamin reseptör duyarlılığı düşer; asit-baz ve ventilasyon optimize edilmelidir.',
        ]}
        clinicalNote="Hayati şok ve derin hipotansiyon acillerinde mutlak kontrendikasyon yoktur; sıvı resüsitasyonu ile eşzamanlı ve titre edilerek başlanmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. ENDİKASYONLAR & KLİNİK KANIT DÜZEYLERİ                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-endikasyon"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Endikasyonlar &amp; Kılavuz Kanıt Düzeyleri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Septik Şok */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Septik Şok (1. Tercih Vazopressör)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400">
                SSC 2021: Kanıt 1A
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Surviving Sepsis Campaign (SSC 2021) uluslararası kılavuzunda <strong>ilk tercih vazopressör</strong> olarak
              önerilir. Hedef MAP ≥ 65 mmHg. Sıvı resüsitasyonu (30 mL/kg kristaloid) tamamlanırken veya devam ederken
              perfüzyon basıncı düşüklüğünde gecikmeden başlanmalıdır (erken başlama aşırı sıvı yüklenmesini ve mortaliteyi azaltır).
            </p>
          </div>

          {/* Vazodilatatuar / Dağılımsal Şok */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Vazodilatatuar / Anafilaktik / Nörojenik Şok
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300">
                Kılavuz Sınıf 1
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Anafilakside Adrenalin boluslarına refrakter vazoplejide sürekli infüzyon olarak; spinal kord hasarında
              (nörojenik şok) sempatik tonus kaybını telafi etmek için <strong>hedef MAP ≥ 85–90 mmHg</strong> düzeyine
              ulaşmakta güvenle kullanılır.
            </p>
          </div>

          {/* Kardiyojenik Şok */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-indigo-500" />
                Kardiyojenik Şok (Dobutamin ile Kombine)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                ESICM / ACC 2A
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Şiddetli hipotansiyonda (Sistolik &lt; 80 mmHg veya MAP &lt; 60 mmHg) koroner perfüzyon ve aort kökü basıncını
              sağlamak için Dopamin yerine <strong>Noradrenalin tercih edilir</strong> (daha düşük aritmi insidansı).
              Afterload artışına bağlı debi düşüşünü engellemek için inotrop ajanla (Dobutamin/Milrinon) kombine edilir.
            </p>
          </div>

          {/* Perioperatif Vazopleji & Post-Arrest */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Perioperatif Vazopleji &amp; Post-ROSC
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                AHA / ERC 2025
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Kronik ACEI/ARB kullanan hastalarda genel anestezi indüksiyonu sonrası dirençli vazoplejide ve Kardiyopulmoner
              Baypas (KPB) çıkışı vazoplejik sendromda primer ajandır. Post-kardiyak arrest (ROSC) sonrası hedef MAP ≥ 65–70 mmHg
              sağlayarak serebral hipoperfüzyondan korur.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. DOZAJ REJİMLERİ & TİTRASYON BASAMAKLARI                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozaj"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Dozaj Kademeleri &amp; Titrasyon Algoritması
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Hedef MAP ≥ 65 mmHg</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: Düşük Doz */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
            doseTier === 'low'
              ? 'border-emerald-500 bg-emerald-500/10'
              : isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                  Düşük Doz (Başlangıç)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                  1 – 4 mcg/dk
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                0.01 – 0.05 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Hafif vazopleji, genel anestezi indüksiyonu sonrası geçici hipotansiyon, weaning dönemi.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              ✓ CO genellikle korunur / artar
            </div>
          </div>

          {/* Kademe 2: Terapötik Doz */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
            doseTier === 'moderate'
              ? 'border-teal-500 bg-teal-500/10'
              : isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  Standart İdame (Terapötik)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  4 – 18 mcg/dk
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                0.05 – 0.25 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Klasik septik şok tablosu, dağılımsal şok idamesi. MAP hedefine göre 2–5 dakikada bir titre edilir.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              ✓ Standart perfüzyon aralığı
            </div>
          </div>

          {/* Kademe 3: Yüksek Doz (Vazopressin Eşiği) */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
            doseTier === 'high_vasopressin'
              ? 'border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/40'
              : isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Vazopressin Eşiği (!)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200">
                  18 – 35 mcg/dk
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-amber-700 dark:text-amber-300 mt-1">
                0.25 – 0.50 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>SSC Kılavuz Kuralı:</strong> Noradrenalin dozu &gt;0.25 mcg/kg/dk'ya ulaştığında mutlaka{' '}
                <strong>Vazopressin (0.03 U/dk)</strong> eklenmeli ve <strong>Hidrokortizon</strong> başlanmalıdır!
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-700 dark:text-amber-300 font-bold">
              ⚠ 2. Ajan (Vazopressin) + Steroid Şart
            </div>
          </div>

          {/* Kademe 4: Refrakter / Ultra-Yüksek Doz */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between ${
            doseTier === 'refractory'
              ? 'border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/40'
              : isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Refrakter / Şiddetli Şok
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  &gt; 35 mcg/dk
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
                &gt; 0.50 – 1.0+ <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Ağır mikrosirkülasyon çöküşü, periferik ekstremite iskemisi, laktat artışı, splanknik hipoperfüzyon riski.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-600 dark:text-rose-400 font-bold">
              ⛔ Ekstremite &amp; Barsak İskemisi Riski!
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. İNTERAKTİF İNFÜZYON POMPASI & DOZ HESAPLAYICISI                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif İnfüzyon Pompası &amp; Doz Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Erişkin/pediatrik ağırlık (5–150 kg), 4 mg/4 mL ampul ve 50 mL enjektör / torba parametreleri.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MonographCopyButton
              isDark={isDark}
              getText={() =>
                [
                  `NORADRENALİN (NOREPİNEFRİN) İNFÜZYON ÖZETİ`,
                  `Hasta Ağırlığı: ${weightKg} kg`,
                  `Çözelti Konsantrasyonu: ${concentrationMcgMl} mcg/mL`,
                  `Hedef Doz: ${activeDoseMcgKgMin.toFixed(2)} mcg/kg/dk (${activeDoseMcgMin.toFixed(1)} mcg/dk)`,
                  `Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat`,
                  `24 Saatlik Tüketim: ${dailyTotalMg.toFixed(1)} mg/gün (~${dailyAmpoulesNeeded.toFixed(1)} adet 4 mg ampul)`,
                ].join('\n')
              }
            />
            <button
              type="button"
              onClick={() => {
                setWeightKg(70);
                setPrepType('vial_50');
                setDoseMode('weight_based');
                setDoseMcgKgMin(0.10);
                setDoseMcgMin(7.0);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Sol Kolon: Parametre Girdileri (7 Kolon) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Hasta Ağırlığı */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <label htmlFor={weightInputId} className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-rose-500" />
                  <span>Hasta Vücut Ağırlığı:</span>
                </label>
                <span className="font-mono tabular-nums text-sm text-rose-600 dark:text-rose-400 font-bold">
                  {weightKg} kg {weightKg < 40 ? '· Pediatrik' : ''}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                <input
                  id={weightInputId}
                  type="range"
                  min="5"
                  max="150"
                  step="1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex items-center gap-1 shrink-0 flex-wrap">
                  {[15, 30, 50, 70, 85, 100].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeightKg(w)}
                      className={`px-2 py-1 text-[11px] font-mono tabular-nums rounded border transition-colors cursor-pointer ${
                        weightKg === w
                          ? 'bg-rose-600 text-white border-rose-600 font-bold'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <ObesityDosingScaler
              isDark={isDark}
              drugName="Noradrenalin"
              recommendedScalar="AdjBW"
              secondaryScalar={{ type: 'IBW', context: 'Morbid Obez' }}
              rationale="Morbid obez hastalarda gerçek kilo (TBW) yerine IBW veya AdjBW kullanılması gereksiz yüksek vazopresör doz maruziyetini önler (SOBA / ESICM)."
              currentWeightKg={weightKg}
              onApplyWeight={(w) => setWeightKg(Math.min(150, Math.max(5, w)))}
            />

            {/* Türkiye Preparatı: 8 mg Bitartrat = 4 mg Baz Açıklaması */}
            <div
              className={`rounded-xl border p-3 text-xs leading-relaxed ${
                isDark
                  ? 'bg-amber-950/25 border-amber-500/40 text-amber-200'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <strong className="block text-amber-700 dark:text-amber-300 mb-0.5">
                Türkiye Preparatı Notu — 8 mg Bitartrat = 4 mg Baz (2:1 Oranı · ESICM 2023/2024)
              </strong>
              Türkiye&apos;deki standart 4 mL ampuller (<em>Steradin / Noradrenalin</em>) etiket olarak{' '}
              <strong>8 mg noradrenalin bitartrat</strong> içerir; bu miktar tam olarak{' '}
              <strong>4 mg noradrenalin baz</strong> eşdeğeridir. Klinik pratikte herkes ve uluslararası kılavuzlar
              (ESICM 2023/2024 konsensüsü &amp; SSC 2021 vazopresin eşiği 0,25–0,50 mcg/kg/dk) hesaplamayı{' '}
              <strong>4 mg baz</strong> üzerinden yapar — aşağıdaki hesaplayıcı <strong>4 mg baz</strong> cinsindendir
              (bitartrat cinsinden ifade edilen protokoller bu değerin 2 katıdır).
            </div>

            {/* 2. Çözelti Hazırlama / Seyreltme Şeması */}
            <div>
              <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Seyreltme / Hazırlama Modu:
              </label>
              <select
                id={prepSelectId}
                value={prepType}
                onChange={(e) => setPrepType(e.target.value as any)}
                className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-rose-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-rose-600'
                }`}
              >
                <option value="vial_50">
                  Standart YBÜ &amp; Periferik Acil: 4 mg / 50 mL [80 mcg/mL] (1 Ampul + 46 mL SF veya %5 Dextroz)
                </option>
                <option value="vial_50_double">
                  Çift Konsantrasyon (Sıvı Kısıtlı YBÜ): 8 mg / 50 mL [160 mcg/mL] (2 Ampul + 42 mL)
                </option>
                <option value="vial_50_quad">
                  4 Kat Konsantrasyon (Aşırı Sıvı Kısıtlı / ARDS / KY): 16 mg / 50 mL [320 mcg/mL] (4 Ampul + 34 mL)
                </option>
                <option value="bag_250">
                  Standart Torba İnfüzyonu: 4 mg / 250 mL [16 mcg/mL] (1 Ampul + 246 mL)
                </option>
                <option value="bag_500">
                  Büyük Torba İnfüzyonu: 8 mg / 500 mL [16 mcg/mL] (2 Ampul + 492 mL)
                </option>
                <option value="custom_conc">Özel Konsantrasyon (Kullanıcı Tanımlı mcg/mL)</option>
              </select>

              {prepType === 'custom_conc' && (
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={customConcInputId} className="text-xs text-slate-500 shrink-0">
                    Konsantrasyon:
                  </label>
                  <input
                    id={customConcInputId}
                    type="number"
                    min="1"
                    max="1000"
                    step="1"
                    value={customConcInput}
                    onChange={(e) => setCustomConcInput(Math.max(1, Number(e.target.value)))}
                    className={`w-28 p-1.5 text-xs font-mono rounded-lg border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs text-slate-500 font-mono">mcg/mL</span>
                </div>
              )}

              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>
                  Etkin Konsantrasyon:{' '}
                  <strong className="text-slate-900 dark:text-white font-mono">{concentrationMcgMl} mcg/mL</strong>
                </span>
                <span>1 mg = 1000 mcg · 1 Ampul = 4 mg / 4 mL</span>
              </div>
            </div>

            {/* 3. Doz Seçimi & Birim Geçişi */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Hedef Doz Belirleme:
                </span>
                {/* Doz Modu Seçimi */}
                <div className={`inline-flex p-0.5 rounded-lg border text-[11px] font-semibold ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => {
                      setDoseMode('weight_based');
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      doseMode === 'weight_based'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/kg/dk (Ağırlık Bazlı)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDoseMode('absolute');
                      setDoseMcgMin(activeDoseMcgMin);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      doseMode === 'absolute'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/dk (YBÜ Skalası)
                  </button>
                </div>
              </div>

              {/* Slider & Değer */}
              {doseMode === 'weight_based' ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Doz Aralığı (0.01 – 1.00 mcg/kg/dk):</span>
                    <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
                      {doseMcgKgMin.toFixed(2)} mcg/kg/dk
                    </span>
                  </div>
                  <input
                    id={doseSliderId}
                    type="range"
                    min="0.01"
                    max="1.00"
                    step="0.01"
                    value={doseMcgKgMin}
                    onChange={(e) => setDoseMcgKgMin(Number(e.target.value))}
                    className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  {/* Hızlı Doz Butonları */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[0.02, 0.05, 0.10, 0.15, 0.20, 0.25, 0.35, 0.50, 0.75, 1.00].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDoseMcgKgMin(d)}
                        className={`px-2 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                          Math.abs(doseMcgKgMin - d) < 0.005
                            ? 'bg-rose-600 text-white border-rose-600 font-bold'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {d.toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Doz Aralığı (1 – 60 mcg/dk):</span>
                    <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
                      {doseMcgMin.toFixed(1)} mcg/dk
                    </span>
                  </div>
                  <input
                    id={doseSliderId}
                    type="range"
                    min="1"
                    max="60"
                    step="0.5"
                    value={doseMcgMin}
                    onChange={(e) => setDoseMcgMin(Number(e.target.value))}
                    className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  {/* Hızlı Butonlar */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[2, 4, 8, 12, 16, 20, 25, 30, 40].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDoseMcgMin(val)}
                        className={`px-2 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                          Math.abs(doseMcgMin - val) < 0.1
                            ? 'bg-rose-600 text-white border-rose-600 font-bold'
                            : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {val} mcg/dk
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sağ Kolon: Pompa ve Doz Sonuç Kartı (5 Kolon) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  İnfüzyon Pompası Hızı
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  {concentrationMcgMl} mcg/mL
                </span>
              </div>

              {/* BÜYÜK POMPA DEBİSİ */}
              <div className="py-4 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-rose-600 dark:text-rose-400 tracking-tight">
                  {infusionRateMlHr.toFixed(1)}{' '}
                  <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                    mL / saat
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enjektör veya infüzyon pompasına girilecek hız
                </div>
              </div>

              {/* DETAYLI PARAMETRE GRID'İ */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Dakikalık Doz</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {activeDoseMcgMin.toFixed(1)} mcg / dk
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({activeDoseMcgKgMin.toFixed(2)} mcg/kg/dk)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Tüketim</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {hourlyDoseMcg.toFixed(0)} mcg / sa
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({(hourlyDoseMcg / 1000).toFixed(2)} mg/saat)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Saatlik Sarfiyat</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {dailyTotalMg.toFixed(1)} mg / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({dailyTotalMl.toFixed(0)} mL / 24 saat)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Gereken Ampul (4 mg)</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 text-sm">
                    ~{Math.ceil(dailyAmpoulesNeeded)} Ampul / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    (Net: {dailyAmpoulesNeeded.toFixed(2)} ampul)
                  </span>
                </div>
              </div>
            </div>

            {/* DİNAMİK KLİNİK UYARI BANTI */}
            <div className="mt-3">
              {activeDoseMcgKgMin > 0.25 && (
                <div className="p-3 rounded-xl border bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Surviving Sepsis Kılavuz Eşiği (&gt; 0.25 mcg/kg/dk):</span>
                    Noradrenalin dozu 0.25 mcg/kg/dk üzerine çıktığında tek başına dozu artırmak yerine{' '}
                    <strong>Vazopressin 0.03 U/dk (sabit infüzyon)</strong> eklenmesi ve <strong>IV Hidrokortizon (200 mg/gün)</strong>{' '}
                    başlanması güçlü kanıtla önerilir.
                  </div>
                </div>
              )}
              {activeDoseMcgKgMin > 0.50 && (
                <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2 mt-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Yüksek Doz Periferik İskemi Uyarısı (&gt; 0.50 mcg/kg/dk):</span>
                    Ekstremite parmak uçları, burun ve kulaklarda siyanotik solukluk/nekroz takibi yapılmalıdır.
                    Kardiyak debi (CO) ve SvO₂ düşebilir; inotrop ihtiyacı değerlendirilmelidir.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF PUSH-DOSE NORADRENALİN (AKUT BOLUS KÖPRÜSÜ)           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setPushDoseOpen(!pushDoseOpen)}
          aria-expanded={pushDoseOpen}
          className={`w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Push-Dose Noradrenalin (Akut İntraoperatif Bolus Protokolü)</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  10 – 20 mcg IV Bolus
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Pompa ve santral yol hazırlanırken veya indüksiyon/spinal vazodilatasyonunda 1–3 dakikalık acil köprü.
              </p>
            </div>
          </div>
          {pushDoseOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {pushDoseOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {/* Hazırlama Metodu A: 10 mcg/mL */}
              <div
                onClick={() => setPushDosePrep('10mcg')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  pushDosePrep === '10mcg'
                    ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500/30'
                    : isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/70' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wide text-amber-600 dark:text-amber-400">
                    Protokol A: 10 mcg / mL Çözelti (En Kolay)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    10 mcg / mL
                  </span>
                </div>
                <ol className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                  <li>
                    Hazırlanmış standart infüzyon torbasından/enjektöründen (80 mcg/mL) <strong>1 mL</strong> çekin (80 mcg).
                  </li>
                  <li>
                    Üzerine <strong>7 mL SF</strong> ilave edin (Toplam: 8 mL'de 80 mcg = <strong>10 mcg/mL</strong>).
                  </li>
                  <li>
                    <em>Alternatif (Ampulden):</em> 4 mg/4 mL ampulden 1 mL (1 mg = 1000 mcg) çekip 100 mL SF torbasına katın (10 mcg/mL).
                  </li>
                  <li>
                    <strong>Uygulama:</strong> 1 – 2 mL IV puşe = <strong>10 – 20 mcg</strong> bolus.
                  </li>
                </ol>
              </div>

              {/* Hazırlama Metodu B: 16 mcg/mL (Torbadan Doğrudan) */}
              <div
                onClick={() => setPushDosePrep('16mcg')}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  pushDosePrep === '16mcg'
                    ? 'border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30'
                    : isDark ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800/70' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs uppercase tracking-wide text-rose-600 dark:text-rose-400">
                    Protokol B: 16 mcg / mL (Standart Torbadan)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300">
                    16 mcg / mL
                  </span>
                </div>
                <ol className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                  <li>
                    Standart 4 mg / 250 mL torbadan doğrudan enjektöre 10 mL çekin.
                  </li>
                  <li>
                    Çözelti konsantrasyonu tam olarak <strong>16 mcg/mL</strong>'dir (ek seyreltme gerektirmez).
                  </li>
                  <li>
                    <strong>Uygulama:</strong> 1 mL IV puşe = <strong>16 mcg</strong> bolus.
                  </li>
                  <li>
                    0.5 mL = 8 mcg · 1.5 mL = 24 mcg bolus dozu sağlar.
                  </li>
                </ol>
              </div>
            </div>

            {/* İnteraktif Push-Dose Simülatörü */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-amber-500" />
                  <span>Seçili Push-Dose Bolus Dozu:</span>
                </span>
                <div className="flex items-center gap-2">
                  {[8, 10, 16, 20].map((bolus) => (
                    <button
                      key={bolus}
                      type="button"
                      onClick={() => setPushDoseBolusMcg(bolus)}
                      className={`px-3 py-1 text-xs font-mono rounded-lg border transition-colors cursor-pointer ${
                        pushDoseBolusMcg === bolus
                          ? 'bg-amber-600 text-white border-amber-600 font-bold'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {bolus} mcg
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-right sm:border-l sm:pl-6 border-slate-200 dark:border-slate-700">
                <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 block">
                  Enjektörden Verilecek Hacim
                </span>
                <span className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
                  {pushDoseVolumeMl.toFixed(1)} mL IV
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  (Konsantrasyon: {pushDoseConcVal} mcg/mL · Etki: 1–2 dk)
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg border bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200 text-xs">
              <strong>Kritik Güvenlik İlkesi:</strong> Push-dose noradrenalin sürekli infüzyonun yerini alamaz. Sadece
              acil kriz anlarında (indüksiyon hipotansiyonu, spinal blok seviyesi yükselmesi, resüsitasyon köprüsü)
              1–3 dakikalık geçici destek içindir. Hipotansiyon devam ediyorsa gecikmeden sürekli pompa infüzyonuna geçilmelidir.
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Noradrenalin / Steradin / Cardenor 4 mg/4 mL Ampul (TR Standart)',
            presentation: '4 mL berrak steril IV konsantre çözelti içeren cam ampul (ışıktan korunmuş kutuda)',
            concentration: '1 mg/mL BAZ (= 2 mg/mL Bitartrat)',
            saltOrBaseNote:
              'ESICM 2023/2024 & 2:1 Tuz/Baz Oranı: Her 4 mL ampul 8 mg noradrenalin bitartrat içerir; bu tam olarak 4 mg noradrenalin BAZ eşdeğeridir. Türkiye klinik pratiği ve uluslararası kılavuzlar (SSC 2021 vazopresin eşiği 0.25–0.50 mcg/kg/dk) hesaplamayı 4 mg BAZ üzerinden yapar.',
            alertLevel: 'high',
          },
          {
            name: 'Hazır Seyreltilmiş / Yüksek Konsantrasyonlu YBÜ Enjektörleri (Hazırlama)',
            presentation: '50 mL enjektör pompası veya 250–500 mL torba infüzyonu (asla sulandırmadan verilmez)',
            concentration: '80 · 160 · 320 mcg/mL (Enjektör) · 16 mcg/mL (Torba)',
            saltOrBaseNote:
              'Tek ampul (4 mg baz) + 46 mL D5W/SF = 80 mcg/mL; sıvı kısıtlı ARDS/KY hastalarında 8 mg/50 mL (160 mcg/mL) veya 16 mg/50 mL (320 mcg/mL) konsantre enjektör hazırlanır.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart YBÜ Enjektörü (80 mcg/mL): 1 ampul (4 mg baz / 4 mL) + 46 mL %5 Dekstroz (D5W) veya %0.9 NaCl = 50 mL.',
          'Çift Konsantrasyon / Sıvı Kısıtlı (160 mcg/mL): 2 ampul (8 mg baz / 8 mL) + 42 mL D5W veya SF = 50 mL (yalnızca SVK!).',
          '4× Konsantrasyon / Aşırı Sıvı Kısıtlı (320 mcg/mL): 4 ampul (16 mg baz / 16 mL) + 34 mL D5W veya SF = 50 mL (yalnızca SVK!).',
          'Standart Torba / Geçici Periferik İnfüzyon (16 mcg/mL): 1 ampul (4 mg baz) + 246 mL D5W/SF (= 250 mL) veya 2 ampul (8 mg baz) + 492 mL (= 500 mL).',
          'Push-Dose Köprü (10 mcg/mL): 80 mcg/mL enjektörden 1 mL + 7 mL SF (veya 1 mL ampul [1 mg] / 100 mL SF) → 1–2 mL = 10–20 mcg IV.',
        ]}
        concentrationTrapWarning="Etikette '8 mg bitartrat' yazan 4 mL ampulün aktif baz eşdeğeri 4 mg'dır! Bitartrat üzerinden hesaplanan Avrupa protokolleri ile baz üzerinden hesaplanan protokoller arasında tam 2 kat doz farkı vardır. Enjektör etiketine daima 'NORepinephrine — XX mcg/mL (BAZ)' yazılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="central-preferred"
        accessSummary="Uzun süreli ve yüksek konsantrasyonlu (≥80–320 mcg/mL) infüzyonlarda ayrı lümenden Santral Venöz Kateter (SVK) esastır. Ancak septik şokta SVK beklenirken tedavi GECİKTİRİLMEZ: antekübital fossa veya proksimal önkol geniş venlerinden (≥20G/18G; el sırtı/bilek/ayak KESİNLİKLE YASAK!) düşük konsantrasyon (16–80 mcg/mL) en fazla 24–48 saat geçici başlanabilir; infüzyon yeri her 1–2 saatte palpe ve inspekte edilmelidir."
        phRange="3.0 – 4.5 (Asidik · Oksidasyona Duyarlı)"
        osmolalityNote="Vezikan/vazokonstriktör ajan: Periferik doku sızıntısında pH'tan çok lokal α₁-aracılı kapiller vazospazm nedeniyle iskemik cilt nekrozu gelişir."
        compatibleDiluents={[
          '%5 Dekstroz (D5W) — Altın standart (dekstroz katekolamin oksidasyonunu önler)',
          '%5 Dekstroz + %0.9 NaCl (D5NS) — 24 saat stabil',
          '%0.9 Sodyum Klorür (SF) — Acil/pratikte güvenli, ≤24 saat içinde yenilenmelidir',
        ]}
        stabilityNote="Işıktan korunmalıdır (opak hat/enjektör kılıfı önerilir). Çözelti pembe, sarı veya kahverengiye dönerse ya da partikül içeriyorsa OKSİTLENMİŞTİR — derhal imha edilmelidir. İnfüzyon torbası/enjektörü en geç 24 saatte bir yenilenir."
        ySiteCompatible={[
          'Dobutamin',
          'Vazopressin',
          'Epinefrin',
          'Milrinon',
          'Fentanil',
          'Remifentanil',
          'Midazolam',
          'Propofol',
          'Deksmedetomidin',
          'Heparin',
          'Potasyum Klorür',
          'Magnezyum Sülfat',
        ]}
        ySiteIncompatible={[
          'Sodyum Bikarbonat (%8.4 NaHCO₃ — saniyeler içinde alkali inaktivasyon!)',
          'Furosemid',
          'Aminofilin',
          'Tiyopental',
          'İnsülin (aynı hatta değişken stabilite/doz salınımı)',
          'Pantoprazol / Alkali çözeltiler',
          'Kan Ürünleri (aynı lümenden verme)',
        ]}
        extravasationProtocol="Ekstravazasyon geliştiğinde 12 SAAT İÇİNDE müdahale edin: (1) İnfüzyonu derhal durdurun, kanülü çekmeden enjektörle dokudaki/hattaki ilacı aspire edin. (2) Antidot: 5–10 mg Fentolamin'i 10–15 mL SF içinde seyreltip 25–27G ince iğneyle soluk/soğuk iskemik alan çevresine çember şeklinde çoklu SC enjekte edin (hiperemi sağlanana dek). (3) Fentolamin yoksa: Terbutalin 1 mg / 10 mL SF lokal SC infiltrasyon veya topikal %2 Nitrogliserin pomad uygulayın. (4) Ekstremiteyi eleve edin ve kuru ILIK kompres uygulayın — SOĞUK / BUZ ASLA KULLANMAYIN!"
      />

      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Organ-bağımsız klirens: Böbrek yetmezliğinde veya CRRT'de başlangıç dozu azaltılmaz."
        renalDetails={[
          'Norepinefrin nöronal Uptake-1 ve doku COMT/MAO enzimleriyle dakikalar içinde inaktive edilir.',
          'eGFR < 30 mL/dk veya CRRT/HD altında ek doz ayarlaması gerekmez; hedef MAP ≥ 65 mmHg düzeyine göre titre edilir.',
          'Hipovolemi düzeltilmeden yüksek doz verilmesi renal vazokonstriksiyonu artırabilir; septik şokta ise renal perfüzyon basıncını korur.',
        ]}
        hepaticSummary="Child-Pugh A / B / C yetmezliğinde rutin doz kısıtlaması gerekmez; doku COMT/MAO yolu korunur."
        hepaticDetails={[
          'Karaciğer yetmezliğinde splenik ve portal vazokonstriksiyon nedeniyle mezenterik perfüzyon ve laktat trendi yakından izlenmelidir.',
          'Sirotik vazodilatasyon ve hepatorenal sendrom (HRS) tip-1 tedavisinde terlipresine güçlü alternatif vazopressördür.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="Düşük Başlangıç · Yavaş Titrasyon"
        geriatricPoints={[
          '>65 yaş ve kırılgan (frailty) hastalarda baroreseptör refleks duyarlılığı ve β₁-adrenerjik rezerv azalmış, arteriyel sertlik artmıştır; ani yüksek dozlar sol ventrikül afterloadunu keskin artırarak kardiyak debiyi düşürebilir.',
          'Kronik hipertansiyonu olan yaşlı septik şok hastalarında organ perfüzyonu (özellikle renal/serebral otoregülasyon) yakından izlenmeli, ancak rutin olarak MAP > 75–85 mmHg zorlamak aritmi ve iskemi riskini artırır (SEPSISPAM / 65 Trial).',
          'Periferik arter hastalığı ve diyabetik mikrovaskülopatisi sık olduğundan ekstremite uçları, kapiller dolum ve splanknik perfüzyon (laktat) daha sık kontrol edilmelidir.',
        ]}
        obesityWeightScalarBadge="AdjBW (Tercih) veya IBW"
        obesityPoints={[
          'Noradrenalin hidrofilik bir katekolamin olup dağılım hacmi (Vd ~0.1–0.2 L/kg) primer olarak intravasküler kompartmanla sınırlıdır; adipoz dokuya dağılmaz (SOBA / Miller’s / ESICM).',
          'BMI ≥ 30–40 kg/m² morbid obez hastalarda toplam vücut ağırlığı (TBW) yerine Düzeltilmiş Vücut Ağırlığı (AdjBW) veya İdeal Vücut Ağırlığı (IBW) kullanılması (ya da ağırlıksız mcg/dk skalasına geçilmesi) gereksiz aşırı vazopresör doz maruziyetini önler.',
          'Klinik titrasyon daima invaziv arteriyel basınç hedefine (MAP ≥ 65 mmHg) göre yapılır; yukarıdaki hesaplayıcıdaki Obezite Doz Ölçekleyici ile AdjBW/IBW tek tıkla uygulanabilir.',
        ]}
        clinicalNote="Morbid obezitede ağırlık bazlı mcg/kg/dk eşikleri (ör. SSC 0.25 mcg/kg/dk vazopresin eşiği) TBW ile hesaplanırsa yapay olarak düşük görünür; AdjBW/IBW veya mutlak mcg/dk (ör. >15–20 mcg/dk) ile birlikte değerlendirilmelidir."
      />

      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="FDA Gebelik Kategorisi C · SOAP 2023 konsensusunda obstetrik spinal hipotansiyonda güvenli seçenek."
        pregnancyDetails={[
          'Plasentayı yüksek konsantrasyonda geçmez (COMT/MAO plasental bariyer), ancak yüksek sistemik dozlar uterin arter vazokonstriksiyonu yapabilir.',
          'Sezaryen spinal hipotansiyonunda düşük doz noradrenalin (5–10 mcg bolus veya 0.02–0.05 mcg/kg/dk) fenilefrine göre maternal kalp hızını daha iyi korur ve fetal asidoz yaratmaz.',
          'Maternal şok/sepsiste anne hayatı ve uteroplasental perfüzyon için hedef MAP ≥ 65 mmHg sağlanması esastır.',
        ]}
        lactationSummary="Yarı ömrü 1–2 dakika, oral biyoyararlanımı ~0% olduğundan emzirmeye engel oluşturmaz."
        lactationDetails={[
          'Anne sütüne geçip geçmediği sınırlı veriye sahip olsa da gastrointestinal sistemde MAO/COMT ile tamamen yıkıldığı için infant tarafından emilmez.',
          'Anne hemodinamik olarak stabilize olup şok kliniği çözüldüğünde emzirmeye ara verilmesi ("pump & dump") gerekmez.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-olumsuz"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Önemli Olumsuz Etkiler (Adverse Effects)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Aşırı Afterload &amp; CO Düşüşü</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Sol ventrikül art-yükünü belirgin artırır. Kalp yetmezliği veya kardiyomiyopatisi olan hastalarda kardiyak indeksi düşürebilir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Refleks Bradikardi</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              MAP yükselmesi karotis sinüs baroreseptörlerini uyararak vagal tonusu artırır ve refleks bradikardi yaratabilir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Periferik / Parmak Ucu İskemisi</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Yüksek dozda veya mikrovasküler hastalığı olanlarda simetrik periferik kangren, el ve ayak parmak nekrozu riski.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">Splanknik / Renal Vazokonstriksiyon</span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Hipovolemisi düzeltilmemiş hastada mezenterik ve renal perfüzyonu bozar; ancak septik şokta renal perfüzyon basıncını artırarak GFR'yi yükseltir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/70 border-rose-200'}`}>
            <span className="font-bold text-rose-700 dark:text-rose-300 block mb-1">Ekstravazasyon &amp; Doku Nekrozu</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Periferik damardan doku içine sızarsa lokal α₁ vazokonstriksiyon ile cilt ve yumuşak doku nekrozu yapar (antidotu: Fentolamin 5–10 mg lokal infiltrasyon).
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/40' : 'bg-amber-50/70 border-amber-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-300 block mb-1">Ventriküler Aritmiler &amp; MVO₂ Artışı</span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yüksek dozlarda miyokard oksijen tüketimini artırır; hipoksi, asidoz veya halojenli anestezik varlığında ventriküler ektopi/taşiaritmi tetikleyebilir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR (v4.0)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Boş Tanka Musluk Sıkılmaz (Hipovolemi Tuzağı vs Erken Başlama)',
            detail:
              'Ciddi hipovolemi düzeltilmeden yüksek doz noradrenalin splanknik, renal ve dijital iskemiyi derinleştirir. Ancak septik şokta sıvı yüklemesinin bitmesi beklenmez; kristaloid akarken eşzamanlı erken başlanır.',
          },
          {
            title: 'Manşon (NIBP) Yanılsaması & İnvaziv Arter Kateteri (A-Line)',
            detail:
              'Yüksek doz noradrenalin alan şok hastasında şiddetli periferik vazokonstriksiyon nedeniyle koldan manşon ölçümü gerçek arter basıncını 20–30 mmHg düşük gösterebilir; invaziv A-Line altın standarttır.',
          },
          {
            title: 'Torba / Enjektör Değişiminde Smart Switchover Zorunluluğu',
            detail:
              'Yarı ömrü 1–2 dakikadır; biten enjektörün 3–4 dakika geç değiştirilmesi ani kardiyovasküler kollapsa yol açar. Çift pompa (smart switchover) veya yedek hazır enjektör kullanılmalıdır.',
          },
          {
            title: 'Laktat Artışı Adrenalin Gibi Yalancı (Tip-B) Değildir',
            detail:
              'Adrenalinden farklı olarak noradrenalinde β₂-aracılı aerobik glikoliz artışı minimaldir. Noradrenalin altında laktat yükseliyorsa bu aşırı vazokonstriksiyona bağlı gerçek doku hipoperfüzyonunu veya kötüleşen şoku gösterir.',
          },
          {
            title: 'Sağ Kalp Yetmezliği & Pulmoner Hipertansiyonda RV Perfüzyonu',
            detail:
              'Sağ ventrikül iskemi döngüsünü kırmak için MAP yükseltilerek sağ koroner perfüzyon korunmalıdır; noradrenalinin SVR artışı PVR artışından fazladır (PVR/SVR oranını lehte tutar).',
          },
          {
            title: 'Kademeli Weaning & Vazopressin Kesilme Sıralaması',
            detail:
              'Övolemi doğrulandıktan sonra (SVV/PPV <%13) her 15–30 dk’da %10–25 azaltılır; asla aniden kesilmez. Vazopressin ile kombineyken önce noradrenalin güvenli düşük düzeye (≤0.05 mcg/kg/dk) indirilir, ardından vazopressin kesilir; kesim sonrası 2–4 saat rebound hipotansiyon izlenir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        defaultOpen={false}
        receptorMechanism={{
          title: 'Adrenoseptör Seçiciliği (α₁ >> β₁ > β₂) & Hücre İçi Sinyal İletimi',
          summary:
            'Noradrenalin sempatik postgangliyonik sinir uçlarının primer nörotransmitteridir. Vasküler düz kastaki α₁-adrenoseptörlere en yüksek afiniteyle bağlanır, kardiyak β₁-reseptörlerini ılımlı uyarır ve vasküler/bronşiyal β₂-reseptörlere etkisi ihmal edilebilir düzeydedir (Miller’s / Stoelting’s / Barash).',
          points: [
            'α₁-Reseptör (Gq/11 → Fosfolipaz C → IP₃ / DAG → Ca²⁺↑): Arteriyoler rezistans damarları ve splanknik/kutanöz kapasitans venlerinde güçlü kasılma sağlayarak hem SVR’yi hem venöz dönüşü artırır.',
            'α₂-Reseptör (Gi → cAMP↓): Postsinaptik vasküler α₂b vazokonstriksiyona katkı verir; presinaptik α₂a ise negatif geri bildirimle endojen NE salınımını düzenler.',
            'β₁-Reseptör (Gs → Adenilat Siklaz → cAMP↑ → PKA → L-tipi Ca²⁺ akımı & Fosfolamban fosforilasyonu): Miyokard kontraktilitesini (inotropi) ve lusitropiyi destekler; ancak in vivo baroreseptör refleksi kronotropik artışı çoğunlukla dengeler.',
            'Minimal β₂ Aktivitesi: Adrenalinin aksine iskelet kası vazodilatasyonu, bronkodilatasyon, β₂-aracılı hipokalemi veya Tip-B laktik asidoz oluşturmaz.',
          ],
        }}
        organEffects={{
          cns: [
            'Polar katekolamin yapısı nedeniyle kan-beyin bariyerini (KBB) anlamlı düzeyde geçmez; doğrudan sedasyon, hipnoz veya EEG/BIS değişikliği oluşturmaz.',
            'Serebral Hemodinami: Serebral otoregülasyon sınırları (MAP ~60–150 mmHg) korunduğu sürece doğrudan serebral vazokonstriksiyon yapmaz; şokta MAP’ı yükselterek serebral perfüzyon basıncını (CPP = MAP − ICP) restore eder.',
          ],
          cvs: [
            'Stressed Venöz Hacim & Preload Rekrütmanı: Venöz kapasitans yataklarını (özellikle splanknik venleri) daraltarak "unstressed" kan hacmini "stressed" hacme çevirir; ortalama sistemik dolum basıncını (Pmsf) ve venöz dönüşü artırarak sıvı yükü olmadan kardiyak debiye destek olur (Hamzaoui / ESICM).',
            'Baroreseptör Refleks Bradikardi: Güçlü α₁-aracılı MAP yükselmesi karotis sinüs ve arkus aorta baroreseptörlerini uyararak vagal tonusu artırır; bu refleks β₁ kronotropisini maskeleyerek kalp hızını sabit tutar veya hafif düşürür.',
            'Koroner Perfüzyon & Ventriküler Coupling: Aort diyastolik basıncını yükselterek sol ve sağ koroner arter perfüzyonunu artırır; ancak yüksek dozlarda aşırı afterload (Ea↑) ventrikülo-arteriyel eşleşmeyi bozarak zayıf sol ventrikülde stroke volümü düşürebilir.',
          ],
          respiratory: [
            'Pulmoner damar yatağında hafif α₁ vazokonstriksiyon (PVR↑) yapabilir; ancak sistemik SVR artışı PVR artışından belirgin yüksek olduğundan sağ ventrikül koroner perfüzyon gradientini korur.',
            'β₂ etkisi minimal olduğundan akut bronkospazm veya anafilaktik hava yolu obstrüksiyonunda bronkodilatasyon sağlamaz (bu durumda 1. tercih Adrenalindir).',
          ],
          other: [
            'Renal: Hipovolemide GFR’yi düşürürken, vazoplejik/septik şokta efferent arteriyolü afferentten daha fazla daraltarak glomerüler filtrasyon basıncını ve idrar çıkışını artırır.',
            'Splanknik & Mikrosirkülasyon: Yüksek dozlarda (>0.5 mcg/kg/dk) mezenterik/mukozal kan akımı ve periferik kapiller perfüzyon bozulabilir.',
            'Metabolik: Adrenaline kıyasla laktat, glukoz ve potasyum üzerine bozucu etkisi çok daha sınırlıdır.',
          ],
        }}
        synergyAndCeiling={{
          summary:
            'Noradrenalinin mutlak bir farmakolojik tavan dozu tanımlanmasa da, artan dozlarda adrenerjik reseptör duyarsızlaşması ve mikrosirkülatuar toksisite nedeniyle çoklu mekanizmalı (katekolamin-koruyucu) vazopresör stratejisi esastır (SSC 2021 / ESICM).',
          points: [
            'Şiddetli Asidozda (pH < 7.15) Katekolamin Direnci & Reseptör Downregülasyonu: Asidemi ve uzamış yüksek doz katekolamin maruziyeti β/α reseptör fosforilasyonu (GRK/β-arrestin) ve internalizasyonuna yol açarak pressör yanıtı köreltir; eşzamanlı asit-baz/ventilasyon optimizasyonu şarttır.',
            'Vazopressin (V1a) & Hidrokortizon Sinerjisi: Noradrenalin >0.25–0.50 mcg/kg/dk düzeyine çıktığında eklenen Vazopressin (0.03 U/dk) katekolaminden bağımsız V1a reseptörleriyle etki eder ve asidozdan daha az etkilenir; IV Hidrokortizon (200 mg/gün) ise adrenerjik reseptör ekspresyonunu yeniden artırarak (upregülasyon) şoktan çıkışı hızlandırır.',
            'Non-Selektif β-Bloker Etkileşimi: β₁/β₂ blokajı altında noradrenalinin α₁ vazokonstriksiyonu karşılanmamış (unopposed) kalarak şiddetli hipertansiyon ve derin refleks bradikardi/kalp yetmezliği oluşturabilir.',
          ],
        }}
        clinicalPearls={[
          'Septik şokta erken noradrenalin (sıvı resüsitasyonuyla eşzamanlı) yalnızca SVR’yi değil, venöz kapasitansı azaltarak preload’u da artırır ve pozitif sıvı dengesi/akciğer ödemi riskini azaltır.',
          '2:1 Baz/Bitartrat Hatasını Önleyin: Yurtdışı literatürde bazı Avrupa merkezleri dozu bitartrat (2×), ABD ve SSC 2021 kılavuzu ise baz (1×) cinsinden verir — Türkiye’de 1 ampul = 4 mg baz (8 mg bitartrat) standardı esas alınmalıdır.',
          'İskemi & Laktat Yorumu: Noradrenalin altında yükselen laktat "masum Tip-B" değildir; aşırı vazokonstriksiyon, düzeltilmemiş hipovolemi, düşük kardiyak debi veya mezenterik iskemiyi dışlayın.',
          'Vazoplejik şokta (KPB çıkışı, ACEI/ARB) yüksek doz noradrenaline rağmen direnç sürüyorsa Vazopressin, Hidrokortizon ve seçilmiş olgularda Metilen Mavisi / Hidroksokobalamin değerlendirilmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Noradrenalin (Norepinefrin)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Sodyum Bikarbonat (%8.4 NaHCO₃) & Alkali IV Çözeltiler (Aynı Lümen)',
            mechanism: 'Fizikokimyasal Alkali Oksidasyon / İnaktivasyon',
            clinicalEffect: 'Yüksek pH noradrenalini saniyeler içinde oksitleyerek inaktive eder; ani vazopresör kaybı ve derin şok gelişir.',
            management: 'Asla aynı Y-port veya lümenden vermeyin; ayrı damar yolu kullanın veya uygulama öncesi/sonrası hattı SF ile yıkayın.',
          },
          {
            severity: 'D',
            agent: 'MAO İnhibitörleri (Linezolid · Metilen Mavisi · Fenelzin) & TCA',
            mechanism: 'MAO İnhibisyonu & Nöronal Uptake-1 (NET) Blokajı',
            clinicalEffect: 'Noradrenalinin pressör etkisi 2–10 kat potansiyalize olur; şiddetli hipertansif kriz, intraserebral kanama ve aritmi riski.',
            management: 'Başlangıç dozunu %80–90 azaltın (ör. 0.01 mcg/kg/dk), invaziv arter monitörizasyonu altında ultra-yavaş titre edin.',
          },
          {
            severity: 'D',
            agent: 'Non-Selektif Beta-Blokerler (Propranolol · Karvedilol · Timolol)',
            mechanism: 'Karşılanmamış (Unopposed) α₁-Vazokonstriksiyon',
            clinicalEffect: 'Aşırı SVR yükselmesi, şiddetli hipertansiyon, derin refleks bradikardi ve kalp yetmezliği dekompansasyonu.',
            management: 'Düşük dozla başlayıp kan basıncı ve kalp hızını yakın izleyin; kardiyak debi düşerse inodilatör/glukagon değerlendirin.',
          },
          {
            severity: 'D',
            agent: 'Halojenli Uçucu Anestezikler (Halotan >> İzofluran > Sevofluran/Desfluran)',
            mechanism: 'Miyokardiyal Katekolamin Duyarlılaşması',
            clinicalEffect: 'Özellikle hipoksi ve hiperkapni eşlik ettiğinde ventriküler ektopi, VT ve VF riski artar.',
            management: 'Sürekli EKG monitörizasyonu yapın; oksijenasyon, normokapni ve elektrolitleri (K⁺, Mg²⁺) optimize edin.',
          },
          {
            severity: 'C',
            agent: 'Ergot Alkaloidleri (Metilergonovin) & Oksitosin (Obstetrik)',
            mechanism: 'Aditif Periferik & Serebral Vazokonstriksiyon',
            clinicalEffect: 'Postpartum dönemde şiddetli hipertansiyon ve serebral vazospazm/inme riski.',
            management: 'Obstetride ergot alkaloidi uygulanacaksa noradrenalin dozunu en düşük düzeyde tutun ve kan basıncını dakika dakika izleyin.',
          },
        ]}
        references={[
          {
            authors: 'Evans L, Rhodes A, Alhazzani W, et al.',
            title: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021.',
            journal: 'Crit Care Med',
            year: 2021,
            pmid: '34605781',
            doi: '10.1097/CCM.0000000000005337',
            note: 'Septik şokta 1. tercih vazopressör, MAP ≥ 65 mmHg, >0.25 mcg/kg/dk dozunda Vazopressin eklenmesi.',
          },
          {
            authors: 'De Backer D, Biston P, Devriendt J, et al. (SOAP II Investigators)',
            title: 'Comparison of Dopamine and Norepinephrine in the Treatment of Shock.',
            journal: 'N Engl J Med',
            year: 2010,
            pmid: '20200382',
            doi: '10.1056/NEJMoa0907118',
            note: 'Dopamine göre belirgin daha düşük aritmi insidansı ve kardiyojenik şok alt grubunda sağkalım üstünlüğü.',
          },
          {
            authors: 'Cecconi M, De Backer D, Antonelli M, et al.',
            title: 'Consensus on circulatory shock and hemodynamic monitoring. Task force of ESICM.',
            journal: 'Intensive Care Med',
            year: 2014,
            pmid: '25392034',
            doi: '10.1007/s00134-014-3525-z',
            note: 'Dolaşım şokunda erken vazopressör ve dinamik sıvı yanıtlılığı hedefleri.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/norepinephrine.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
