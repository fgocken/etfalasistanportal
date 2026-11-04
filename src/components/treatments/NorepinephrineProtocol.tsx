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
  const [extravasationOpen, setExtravasationOpen] = useState<boolean>(true);

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
              <span className="font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15">
                Vazoaktif / Vazopressör Ajan
              </span>
              <span aria-hidden="true">·</span>
              <span>Levophed · Sterinor · Noradrenalin</span>
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
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK ÖZELLİKLER (PK/PD AKORDİYON)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
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

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. ENDİKASYONLAR & KLİNİK KANIT DÜZEYLERİ                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
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
                Türkiye 4 mg/4 mL ampul formülasyonu, standart 50 mL enjektör veya torba infüzyon parametreleri.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setWeightKg(70);
              setPrepType('vial_50');
              setDoseMode('weight_based');
              setDoseMcgKgMin(0.10);
              setDoseMcgMin(7.0);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla (70 kg / 0.10 mcg)</span>
          </button>
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
                <span className="font-mono text-sm text-rose-600 dark:text-rose-400 font-bold">
                  {weightKg} kg
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id={weightInputId}
                  type="range"
                  min="30"
                  max="150"
                  step="1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex items-center gap-1 shrink-0">
                  {[50, 70, 85, 100].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeightKg(w)}
                      className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
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
      {/* 7. ÇÖZELTİ HAZIRLAMA & UYUMLULUK REHBERİ                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Droplet className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Çözelti Hazırlama, Seyreltme &amp; Kimyasal Uyumluluk
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          {/* 1. Taşıyıcı Sıvı Tercihi */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Taşıyıcı Sıvı: %5 Dextroz (D5W) Altın Standart</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Katekolaminler oksidasyona karşı oldukça hassastır. Dekstroz molekülü norepinefrinin oksidatif yıkımını engeller
              ve stabiliteyi artırır. Bu nedenle <strong>%5 Dextroz (D5W)</strong> veya <strong>D5W + %0.9 SF</strong> tercih edilir.
              Saf Serum Fizyolojik (%0.9 NaCl) acil durumlarda kullanılabilir ancak 24 saatten uzun saklanmamalıdır.
            </p>
          </div>

          {/* 2. Işık Koruması & Oksidasyon Uyarısı */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Işık Koruması &amp; Renk Değişimi</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Ampuller ışıktan korunarak oda sıcaklığında saklanmalıdır. İnfüzyon hattında opak koruyucu kılıf önerilir.
              Solüsyon pembe, sarı veya kahverengiye dönerse veya partikül içeriyorsa <strong>OKSİT OLMUŞTUR</strong>;
              biyolojik etkinliğini kaybetmiştir, <strong>KESİNLİKLE KULLANILMAMALIDIR!</strong>
            </p>
          </div>

          {/* 3. Kritik Geçimsizlik: Bikarbonat */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'
          }`}>
            <h4 className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Kritik Geçimsizlik: Alkali Solüsyonlar</span>
            </h4>
            <p className="text-rose-900 dark:text-rose-200 leading-relaxed text-xs">
              <strong>Sodyum Bikarbonat (%8.4 NaHCO₃)</strong> ve alkali çözeltilerle ASLA aynı damar yolundan verilmemelidir!
              Alkali pH katekolaminleri saniyeler içinde kimyasal olarak inaktive eder. Ayrıca furosemid, aminofilin ve
              tiyopental ile aynı lümenden geçimsizdir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. PERİFERİK DAMAR YOLU GÜVENLİK KURALLARI & EKSTRAVAZASYON YÖNETİMİ */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setExtravasationOpen(!extravasationOpen)}
          aria-expanded={extravasationOpen}
          className={`w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Periferik Damar Yolu Güvenliği &amp; Ekstravazasyon (Fentolamin) Yönetimi</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  Antidot: Fentolamin 5–10 mg
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Yoğun bakımcı ve anestezistin en titiz güvenlik alanı: Erken periferik başlama ve lokal doku nekrozu acil kurtarma protokolü.
              </p>
            </div>
          </div>
          {extravasationOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {extravasationOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
            {/* Periferik Kullanım Şartları */}
            <div className={`p-4 rounded-xl border leading-relaxed text-xs sm:text-sm ${
              isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>"Santral Hat Beklenirken Tedavi Geciktirilmez" — Periferik Güvenlik İlkeleri:</span>
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Damar Yeri:</strong> Yalnızca <strong>antekübital fossa veya önkol geniş venleri</strong> (≥ 20G veya 18G kanül).
                  El sırtı (dorsum manus), el bileği veya ayak/bacak venleri KESİNLİKLE KULLANILMAMALIDIR!
                </li>
                <li>
                  <strong>Süre Sınırı:</strong> Periferik infüzyon bir geçiş stratejisidir. Maksimum <strong>24–48 saat</strong> içinde
                  santral venöz kateterizasyon (SVK) sağlanmalıdır.
                </li>
                <li>
                  <strong>Monitörizasyon:</strong> İnfüzyon bölgesi her 1–2 saatte bir ödem, solukluk, soğukluk ve geri kan akımı açısından
                  fiziki olarak palpe ve inspekte edilmelidir.
                </li>
              </ul>
            </div>

            {/* Fentolamin Ekstravazasyon Protokolü */}
            <div className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-200' : 'bg-rose-50/80 border-rose-200 text-rose-950'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-rose-700 dark:text-rose-300">
                <AlertOctagon className="w-5 h-5 text-rose-600" />
                <span>EKSTRAVAZASYON GELİŞTİĞİNDE ACİL KURTARMA PROTOKOLÜ (12 SAAT İÇİNDE UYGULANMALI):</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs mt-3">
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">1. İnfüzyonu Durdur</span>
                  İnfüzyon derhal kesilir. Kateter hemen çekilmez; enjektör takılarak ekstravaze olmuş noradrenalin aspire edilir.
                </div>
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">2. Fentolamin Hazırla</span>
                  <strong>Fentolamin (Regitine / Alfa-bloker) 5 – 10 mg</strong>, 10–15 mL Serum Fizyolojik içinde seyreltilir.
                </div>
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">3. Subkutan İnfiltrasyon</span>
                  İnce iğne (25–27G) ile iskemi/solukluk alanına çember şeklinde çoklu noktadan subkutan enjekte edilir (doku hiperemisi hedeflenir).
                </div>
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">4. Alternatif &amp; Bakım</span>
                  Fentolamin yoksa <strong>Topikal %2 Nitrogliserin pomad</strong> sürülür. Kol eleve edilir, ılık kompres konur (SOĞUK/BUZ ASLA UYGULANMAZ!).
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. KARDİYOVASKÜLER & ORGAN YAN ETKİLERİ                             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Kardiyovasküler &amp; Organik Yan Etkiler
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
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
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. İLAÇ ETKİLEŞİMLERİ & KONTRENDİKASYONLAR                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Kritik İlaç Etkileşimleri &amp; Önlemler
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              MAO İnhibitörleri &amp; Trisiklikler (TCA)
            </span>
            Katekolamin yıkımını ve geri alımını bloke ederler. Noradrenalin etkisi <strong>2–10 kat potansiyalize</strong> olur.
            Şiddetli hipertansif kriz riski vardır; doz %80–90 oranında düşürülerek çok dikkatli titre edilmelidir.
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              Beta-Bloker Kullanan Hastalar
            </span>
            Beta-1 ve beta-2 reseptörleri bloke olduğunda noradrenalinin alfa-1 etkisi <em>karşılanmamış (unopposed)</em> kalır.
            Aşırı SVR artışı, şiddetli hipertansiyon ve derin bradikardi gelişebilir.
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              Halojenli Uçucu Anestezikler (Sevofluran / İzofluran)
            </span>
            Uçucu anestezikler miyokardı katekolaminlerin aritmojenik etkilerine duyarlı hale getirir.
            Yüksek doz katekolamin uygulamalarında ventriküler taşiaritmi riski artar; EKG ritmi yakından izlenmelidir.
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. ÖZEL HASTA POPÜLASYONLARI & GEBELİK                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Özel Hasta Popülasyonları &amp; Obstetrik Anestezi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 text-xs">
              Gebelik &amp; Sezaryen Spinal Hipotansiyonu (SOAP 2023)
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Güncel obstetrik anestezi kılavuzlarında (SOAP) spinal anestezi sonrası hipotansiyonda <strong>düşük doz Noradrenalin</strong>{' '}
              (ör. 5–10 mcg bolus veya 0.02–0.05 mcg/kg/dk infüzyon) Fenilefrin ve Efedrin'e güçlü alternatif olarak kabul edilmektedir.
              Efedrine kıyasla daha az fetal asidoz riski yaratır ve maternal kalp hızını korur.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 text-xs">
              Sağ Kalp Yetmezliği &amp; Pulmoner Hipertansiyon
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Sağ ventrikül (RV) iskemi döngüsünü kırmak için Ortalama Arteryel Basınç yükseltilerek <strong>sağ koroner perfüzyon</strong> korunmalıdır.
              Noradrenalinin SVR artırıcı etkisi PVR (pulmoner direnç) artırıcı etkisinden fazladır; PVR/SVR oranını lehte tutar.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1.5 text-xs">
              Obezite &amp; Doz Hesaplama Kriteri
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              Morbid obez hastalarda gerçek ağırlık üzerinden hesaplama aşırı doza yol açabilir. Doz başlangıcında{' '}
              <strong>İdeal Vücut Ağırlığı (IBW)</strong> veya <strong>Düzeltilmiş Ağırlık (AdjBW)</strong> baz alınmalı,
              titrasyon daima invaziv arteryel tansiyon hedefine (MAP ≥ 65 mmHg) göre yapılmalıdır.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. İNFÜZYONDAN ÇIKIŞ / WEANING PROTOKOLÜ                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3">
          <RefreshCw className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            İnfüzyondan Çıkış / Weaning Algoritması
          </h2>
        </div>

        <div className={`p-4 rounded-xl border leading-relaxed text-xs sm:text-sm ${
          isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <ol className="space-y-2 list-decimal list-inside">
            <li>
              <strong>Övolemi Doğrulaması:</strong> Weaning öncesi hastanın intravasküler volümünün yeterli olduğu doğrulanmalıdır
              (dinamik parametreler: Vena Kava kolapsibilitesi, SVV/PPV &lt; %13 veya pasif bacak kaldırma testi negatif).
            </li>
            <li>
              <strong>Kademeli Azaltım:</strong> Noradrenalin aniden kesilmez. Her 15–30 dakikada bir infüzyon hızı %10–25 oranında basamaklı
              olarak azaltılır (MAP ≥ 65 mmHg korunarak).
            </li>
            <li>
              <strong>Kombine Vazopressör Varlığında Sıralama:</strong> Vazopressin ile birlikte veriliyorsa, kılavuzlar genellikle
              önce Noradrenalinin düşük/güvenli seviyeye (≤ 0.05 mcg/kg/dk) inilmesini, ardından Vazopressinin kademeli kesilmesini önerir.
            </li>
            <li>
              <strong>Rebound Hipotansiyon Takibi:</strong> İnfüzyon tamamen sonlandırıldıktan sonra ilk 2–4 saat boyunca hemodinami
              ve idrar çıkışı yakından izlenmelidir.
            </li>
          </ol>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. KRİTİK KLİNİK İNCİLER & SIK YAPILAN TUZAKLAR                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Kritik Klinik İnciler &amp; Yoğun Bakımcı / Anestezist Tuzakları
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* İnci 1 */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1.5">
              1. Boş Tanka Musluk Sıkılmaz (Hipovolemi Tuzağı):
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Ciddi hipovolemisi olan bir hastada yeterli sıvı resüsitasyonu yapılmadan yüksek doz noradrenalin başlanması
              splanknik yatakta, böbreklerde ve parmak uçlarında felaket düzeyde iskemiye yol açar. Ancak septik şokta sıvı yüklemesi
              tamamlanana kadar tansiyonun 40 mmHg'de kalması beklenmez; sıvı infüzyonu akarken vazopressör eşzamanlı başlanır!
            </p>
          </div>

          {/* İnci 2 */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1.5">
              2. Manşon (NIBP) Yanılsaması &amp; İnvaziv Arter Kateteri:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Yüksek doz noradrenalin alan şoktaki hastada periferik şiddetli vazokonstriksiyon nedeniyle koldan manşonla
              ölçülen non-invaziv tansiyon arteryel basıncı olduğundan 20–30 mmHg daha düşük gösterebilir. Noradrenalin infüzyonuna
              başlanan her yoğun bakım ve yüksek riskli cerrahi hastasında <strong>İnvaziv Arteryel Kateter (A-Line)</strong> altın standarttır.
            </p>
          </div>

          {/* İnci 3 */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1.5">
              3. Torba / Enjektör Değişiminde Ani Hipotansiyon:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Noradrenalinin yarı ömrü 1–2 dakikadır. Biten bir enjektörün veya serumun değiştirilmesi 3–4 dakika gecikirse
              hasta dakikalar içinde derin şoka ve kardiyak arreste girebilir. Çift pompa (smart switchover) veya yedek enjektörün
              önceden hazır tutulması hayati önem taşır.
            </p>
          </div>

          {/* İnci 4 */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1.5">
              4. Laktat Artışı Adrenalin Gibi Yalancı Değildir:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
              Adrenalin uygulamasında beta-2 reseptör stimülasyonu ile karaciğer ve kasta aerobik glikoliz artar ve tip-B laktat yükselir.
              Ancak noradrenalinde beta-2 etkisi yoktur; noradrenalin altındaki bir hastada laktat yükseliyorsa bu aşırı vazokonstriksiyona
              bağlı doku hipoperfüzyonunu veya kötüleşen şoku gösterir!
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. GÜNCEL KILAVUZ REFERANSLARI & DOĞRULAMA                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all text-xs ${
          isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Kanıta Dayalı Kaynakça &amp; Kılavuz Standartları
            </span>
          </div>
          <span className="font-mono text-[10px]">Güncelleme: 2025/2026 Konsensus</span>
        </div>

        <ul className="space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            <strong>Surviving Sepsis Campaign (SSC 2021 / 2025):</strong> International Guidelines for Management of Sepsis and Septic Shock.
            Crit Care Med 2021; 49:e1063–e1143. (Noradrenalin 1. tercih vazopressör, MAP ≥ 65 mmHg, erken periferik başlama, &gt;0.25 mcg/kg/dk'da Vazopressin eklenmesi).
          </li>
          <li>
            <strong>ESICM Consensus on Circulatory Shock (Cecconi et al.):</strong> Consensus on circulatory shock and hemodynamic monitoring.
            Intensive Care Med 2014; 40:1795–1815.
          </li>
          <li>
            <strong>SOAP Consensus Statement (2023):</strong> Society for Obstetric Anesthesia and Perinatology Consensus Statement on the Management
            of Hypotension During Spinal Anesthesia for Cesarean Delivery.
          </li>
          <li>
            <strong>MDCalc Norepinephrine Dosing &amp; Extravasation Phentolamine Protocol:</strong> Standard titration parameters and IV extravasation antidote guidelines.
          </li>
        </ul>
      </section>
    </div>
  );
};
