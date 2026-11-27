import React, { useState, useId } from 'react';
import {
  Activity,
  HeartPulse,
  AlertTriangle,
  ShieldAlert,
  Info,
  RotateCcw,
  Syringe,
  Clock,
  ShieldCheck,
  Flame,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  BookOpen,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  CompatibilityAndLineBlock,
  ContraindicationsGridBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART1 } from '../../data/organImpairment/standaloneOrganPart1';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

export const DopamineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);

  // Çözelti Hazırlama Modu
  // bag_250_1amp: 1 Ampul (200 mg / 5 mL) + 245 mL = 250 mL -> 800 mcg/mL (0.8 mg/mL)
  // bag_500_1amp: 1 Ampul (200 mg / 5 mL) + 495 mL = 500 mL -> 400 mcg/mL (0.4 mg/mL)
  // bag_250_2amp: 2 Ampul (400 mg / 10 mL) + 240 mL = 250 mL -> 1600 mcg/mL (1.6 mg/mL)
  // syringe_50_1amp: 1 Ampul (200 mg / 5 mL) + 45 mL = 50 mL -> 4000 mcg/mL (4.0 mg/mL)
  // custom_conc: Özel Konsantrasyon (mcg/mL)
  const [prepType, setPrepType] = useState<
    'bag_250_1amp' | 'bag_500_1amp' | 'bag_250_2amp' | 'syringe_50_1amp' | 'custom_conc'
  >('bag_250_2amp');
  const [customConcInput, setCustomConcInput] = useState<number>(1600); // mcg/mL

  // Doz (mcg/kg/dk)
  const [doseMcgKgMin, setDoseMcgKgMin] = useState<number>(5.0);

  // Akordiyon State'i
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // Erişilebilirlik Kimlikleri
  const weightInputId = useId();
  const prepSelectId = useId();
  const doseSliderId = useId();
  const doseInputId = useId();
  const customConcInputId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'bag_250_1amp':
        return 800.0; // 200 mg / 250 mL
      case 'bag_500_1amp':
        return 400.0; // 200 mg / 500 mL
      case 'bag_250_2amp':
        return 1600.0; // 400 mg / 250 mL
      case 'syringe_50_1amp':
        return 4000.0; // 200 mg / 50 mL
      case 'custom_conc':
        return customConcInput > 0 ? customConcInput : 1600.0;
      default:
        return 1600.0;
    }
  })();

  // --- İNFÜZYON HESAPLAMALARI ---
  // Dakikalık doz (mcg/dk) = mcg/kg/dk * kg
  const doseMcgMin = doseMcgKgMin * weightKg;
  // Saatlik doz (mcg/saat) = mcg/dk * 60
  const hourlyDoseMcg = doseMcgMin * 60;
  // Saatlik doz (mg/saat) = mcg/saat / 1000
  const hourlyDoseMg = hourlyDoseMcg / 1000;
  // İnfüzyon hızı (mL/saat) = mcg/saat / (mcg/mL)
  const infusionRateMlHr = concentrationMcgMl > 0 ? hourlyDoseMcg / concentrationMcgMl : 0;
  // İnfüzyon hızı (mL/dk)
  const infusionRateMlMin = infusionRateMlHr / 60;
  // 24 saatlik tüketim
  const dailyTotalMg = hourlyDoseMg * 24;
  const dailyTotalMl = infusionRateMlHr * 24;
  // 24 saatlik ampul ihtiyacı (1 ampul = 200 mg)
  const dailyAmpoulesNeeded = dailyTotalMg / 200;

  // Aktif Reseptör & Hemodinamik Faz Göstergesi
  const activePhase: 'dopaminergic' | 'beta1' | 'alpha1' | 'exceeded' = (() => {
    if (doseMcgKgMin <= 3.0) return 'dopaminergic';
    if (doseMcgKgMin <= 10.0) return 'beta1';
    if (doseMcgKgMin <= 20.0) return 'alpha1';
    return 'exceeded';
  })();

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
          { id: 'sec-pkpd', label: 'Farmakokinetik' },
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
        sectionId="sec-guvenlik"
        defaultOpen={false}
        tallManName="DOPamin"
        confusionRiskWith={[
          'DOBUTamin (Dobutamin — LASA: en sık ölümcül karışan inotrop!)',
          'Noradrenalin (Norepinefrin)',
          'Adrenalin (Epinefrin)',
        ].join(' · ')}
        criticalAlerts={[
          'LASA (DOPamin vs DOBUTamin) & Kesinlikle Direkt IV Push/Bolus VERİLMEZ: DOPamin (200 mg/5 mL) ile DOBUTamin (250 mg/20 mL) ampulleri ve infüzyon torbaları en sık karışan yüksek riskli ilaç çiftidir! Ampul konsantre (40 mg/mL) olduğundan ASLA sulandırılmadan veya IV bolus/push olarak uygulanmaz; daima sulandırılarak akıllı infüzyon pompasıyla verilir.',
          'SOAP-II & Surviving Sepsis 2021 Uyarıları: Dopamin septik şokta ve kardiyojenik şokta ilk tercih vazopresör DEĞİLDİR! SOAP-II (NEJM 2010) çalışmasında Noradrenaline kıyasla 2 kat fazla aritmi (%24,1 vs %12,4; p<0,001) ve kardiyojenik şok alt grubunda anlamlı artmış 28 günlük mortalite (p=0,03) göstermiştir.',
          '"Böbrek Koruyucu / Renal Doz Dopamin" (1–3 mcg/kg/dk) Efsanesi: ANZICS RCT (Bellomo et al., Lancet 2000) ve KDIGO AKI kılavuzlarıyla düşük doz dopaminin akut böbrek hasarını (ABH) önlemediği, RRT ihtiyacını veya mortaliteyi azaltmadığı kanıtlanmıştır — diürez veya böbrek koruma amacıyla KULLANILMAZ (Sınıf III - Önerilmez).',
          'MAO İnhibitörü Etkileşimi (1/10 Doz Kuralı): Dopamin MAO enzimi ile metabolize olduğundan, son 14–21 gün içinde MAO inhibitörü (Moklobemid, Selegilin, Linezolid, IV Metilen Mavisi) alan hastalarda etkisi 6–10 kat şiddetlenir; zorunluysa başlangıç dozu normalin 1/10’una (%10’una; ör. 0,5 mcg/kg/dk) düşürülmelidir!',
        ]}
        antidoteOrRescue="Ekstravazasyon Antidotu: Fentolamin (5–10 mg / 10–15 mL SF lokal infiltrasyon) veya Terbutalin / Topikal %2 Nitrogliserin (12 saat içinde; soğuk/buz ASLA uygulanmaz!). Taşiaritmi / İskemi: İnfüzyonu azalt/durdur (yarı ömür t½ ~2 dk olduğundan etkisi 5–10 dk içinde sonlanır), dirençli taşiaritmide kısa etkili β-bloker (Esmolol) uygulanır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & YATAK BAŞI ETKİ MEKANİZMASI      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Endojen Katekolamin Prekürsörü · İnotrop / Kronotrop / Vazopresör
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                TR Ampul: 200 mg / 5 mL = 40 mg/mL
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Doz-Bağımlı Reseptör Spektrumu: D₁/D₂ → β₁ → α₁
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: C01CA04</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Dopamin Hidroklorür (Dopmin® / Dopadren® / Dopasel®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong>{' '}
              Noradrenalinin doğrudan metabolik öncüsü olan endojen katekolamin; doz-bağımlı olarak periferik{' '}
              <strong>D₁/D₂ dopaminerjik</strong>, miyokardiyal <strong>β₁-adrenerjik</strong> ve vasküler{' '}
              <strong>α₁-adrenerjik</strong> reseptörleri uyaran, aynı zamanda presinaptik sempatik sinir uçlarından{' '}
              <strong>endojen noradrenalin salınımı (%50 indirekt etki)</strong> tetikleyen mikst inotrop/kronotrop/vazopresör ajandır.
            </p>
          </div>

          <div className="shrink-0">
            <MonographCopyButton
              isDark={isDark}
              label="Monografi Özeti Kopyala"
              getText={() =>
                [
                  `DOPAMİN HİDROKLORÜR (200 mg / 5 mL Ampul = 40 mg/mL) KLİNİK ÖZETİ`,
                  `• Doz-Bağımlı Reseptör Spektrumu: 1–3 mcg/kg/dk (D1/D2) | 3–10 mcg/kg/dk (β1 İnotrop/Kronotrop) | 10–20 mcg/kg/dk (α1 Vazopresör)`,
                  `• Aktif Hesaplama (${weightKg} kg, ${concentrationMcgMl} mcg/mL): ${doseMcgKgMin.toFixed(1)} mcg/kg/dk = ${doseMcgMin.toFixed(0)} mcg/dk -> Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat`,
                  `• Kritik Uyarı (SOAP-II / SSC 2021): Septik ve kardiyojenik şokta 1. tercih vazopresör DEĞİLDİR (Noradrenaline kıyasla 2 kat aritmi [%24,1 vs %12,4] ve kardiyojenik şokta artmış mortalite!).`,
                  `• Renal Doz Efsanesi (ANZICS / KDIGO): 1–3 mcg/kg/dk "böbrek koruyucu dopamin" ABH önleme veya tedavisinde KULLANILMAZ (Sınıf III).`,
                ].join('\n')
              }
            />
          </div>
        </div>

        {/* Yatak Başı Klinik Etki Mekanizması & Doz-Bağımlı 3 Reseptör Spektrumu (#sec-etki) */}
        <div id="sec-etki" className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-200' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 shrink-0" />
                <span>D₁ / D₂ Dopaminerjik Faz</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15">1 – 3 mcg/kg/dk</span>
            </div>
            <p className="text-xs leading-relaxed">
              Renal, mezenterik ve koroner yatakta D₁ aracılı vazodilatasyon ve proksimal tübülde natriürez.{' '}
              <strong>Dikkat (ANZICS 2000 &amp; KDIGO):</strong> GFR, RRT ihtiyacı veya sağkalımı iyileştirmez;
              &quot;böbrek koruyucu doz&quot; olarak <strong>önerilmez (Sınıf III)</strong>.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 shrink-0" />
                <span>β₁-Adrenerjik İnotrop / Kronotrop</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15">3 – 10 mcg/kg/dk</span>
            </div>
            <p className="text-xs leading-relaxed">
              Doğrudan postsinaptik β₁ uyarımı + sempatik sinir uçlarından <strong>endojen noradrenalin salınımı</strong>.
              Sinoatriyal düğüm hızı (HR↑), miyokard kontraktilitesi (SV↑) ve Kardiyak Debi (CO↑) artar; atropine yanıtsız
              semptomatik bradikardide temel terapötik penceredir.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-rose-600 dark:text-rose-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 shrink-0" />
                <span>α₁-Adrenerjik Baskın Vazopresör</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-500/15">10 – 20 mcg/kg/dk</span>
            </div>
            <p className="text-xs leading-relaxed">
              Vasküler düz kasta α₁ reseptör uyarımı baskın hale geçer: Sistemik Vasküler Direnç (SVR↑), MAP↑ ve PCWP↑.
              Renal/mezenterik D₁ vazodilatasyonunu maskeler; belirgin sinüs taşikardisi, AF/VT aritmi ve splanknik iskemi
              riski taşır (&gt;20 mcg/kg/dk yerine Noradrenaline geçilir).
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK ÖZELLİKLER AKORDİYONU (#sec-pkpd, pkOpen=false)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`scroll-mt-20 rounded-2xl border transition-all overflow-hidden ${
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  t½: ~2 dk · %25 → Noradrenaline Dönüşüm
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hızlı başlangıç (2–5 dk), plazma/doku MAO ve COMT metabolizması, KBB geçişi ve nöroendokrin dağılım.
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Başlangıcı (Onset)
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  2 – 5 Dakika
                </span>
                <span className="text-[10px] text-slate-400">IV infüzyon başlangıcı sonrası</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Pik Etki (Peak)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  5 – 10 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Kararlı durum (Steady-state)</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Eliminasyon Yarı Ömrü (t½)
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  ~2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Etki süresi: &lt; 10 dakika</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Süresi (Duration)
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  &lt; 10 Dakika
                </span>
                <span className="text-[10px] text-slate-400">MAO-İ varlığında ~1 saate uzar!</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Metabolizma (MAO &amp; COMT + %25 Endojen Noradrenaline Dönüşüm):
                </strong>{' '}
                Verilen dopaminin yaklaşık <strong>%75&apos;i</strong> karaciğer, böbrek ve plazmada{' '}
                <strong>Monoamin Oksidaz (MAO)</strong> ve <strong>Katekol-O-Metiltransferaz (COMT)</strong> enzimleri ile
                hızla inaktif homovanilik asit (HVA) ve vanililmandelik asit (VMA) metabolitlerine yıkılır (%80&apos;i 24
                saatte idrarla atılır). Kalan <strong>yaklaşık %25&apos;i ise sempatik adrenerjik sinir uçlarına alınarak
                dopamin β-hidroksilaz ile endojen noradrenaline dönüştürülür!</strong>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Dağılım &amp; Kan-Beyin Bariyeri (KBB):
                </strong>{' '}
                Polar yapısı nedeniyle sağlam <strong>kan-beyin bariyerini (KBB) GEÇMEZ</strong>. Ancak KBB dışında kalan
                sirkumventriküler organları — özellikle <strong>hipotalamus/ön hipofiz median eminens</strong> ve{' '}
                <strong>area postrema (kemoreseptör tetik bölgesi - CTZ)</strong> — doğrudan etkileyerek D₂ reseptörleri
                üzerinden prolaktin/TSH baskılanması ve bulantı/kusma oluşturabilir.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KONTRENDİKASYONLAR — ENDİKASYONLARDAN ÖNCE (#sec-kontrendikasyon) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Feokromositoma: Presinaptik katekolamin salınımı ve doğrudan reseptör uyarımıyla ölümcül hipertansif kriz ve malign aritmi tetikler.',
          'Düzeltilmemiş taşiaritmiler (hızlı ventrikül yanıtlı Atriyal Fibrilasyon, Ventriküler Taşikardi) veya Ventriküler Fibrilasyon (VF).',
          'Dopamin hidroklorüre veya ampuldeki sodyum metabisülfit yardımcı maddesine bilinen aşırı duyarlılık.',
        ]}
        relativeTitle="Göreceli Kontrendikasyonlar & Kaçınılması Gereken Durumlar"
        relativeItems={[
          'Hipovolemi düzeltilmeden kullanım: Dopamin kan hacmi replasmanının yerini tutmaz; önce sıvı resüsitasyonu yapılmalıdır (aksi halde ağır renal/splanknik ve periferik organ iskemisi gelişir).',
          'Kardiyojenik şok: SOAP-II çalışmasında Noradrenaline kıyasla anlamlı olarak artmış 28 günlük mortalite (p=0,03) ve taşiaritmi nedeniyle rutin vazopresör olarak kaçınılmalıdır.',
          'Septik şokta rutin 1. basamak kullanım: SSC 2021 kılavuzuna göre yalnızca bradikardik ve taşiaritmi riski çok düşük seçilmiş hastalar dışında kullanılmaz (1. tercih Noradrenalin).',
          'MAO inhibitörü kullanımı (son 14–21 gün): Dopamin metabolizması bloke olduğundan standart dozlar hipertansif kriz yapar; zorunluysa doz normalin 1/10’una (%10) düşürülmelidir.',
          'Halojenli volatil anestezikler (Halotan, İzofluran, Sevofluran): Miyokardı ekzojen katekolaminlere duyarlılaştırarak ciddi ventriküler aritmi riski doğurur.',
          'Oklüziv periferik vasküler hastalık (Raynaud fenomeni, ileri ateroskleroz, tromboanjiitis obliterans, diyabetik mikroanjiyopati, soğuk ısırması): Parmak ucu iskemisi ve nekroz riski.',
        ]}
        clinicalNote="Şokta dopamin başlamadan önce mutlaka hipovolemi düzeltilmeli, hipoksi/hiperkapni/asidoz (pH < 7,15 katekolamin yanıtını düşürür ve aritmiyi artırır) eşzamanlı tedavi edilmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ENDİKASYONLAR & KLİNİK KANIT (#sec-endikasyon)                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-endikasyon"
        title="Endikasyonlar & Klinik Kanıt (ACC/AHA/HRS · SSC 2021 · SOAP-II · ANZICS)"
        icon={<BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        defaultOpen={false}
        containerClassName={isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}
        bodyClassName="p-5 sm:p-6"
      >

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          {/* 1. Semptomatik Bradikardi */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-amber-500 shrink-0" />
                <span>1. Semptomatik Bradikardi (Atropine Yanıtsız 2. Basamak)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                AHA/ACLS · Sınıf IIb
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Atropine (1 mg IV, maks 3 mg) yanıtsız semptomatik bradikardi veya sinoatriyal/AV iletim gecikmesinde geçici
              transkutanöz/transvenöz pacemaker hazırlığına köprü veya alternatif olarak{' '}
              <strong className="font-mono text-slate-900 dark:text-white">5–20 mcg/kg/dk</strong> IV infüzyon (özellikle
              hipotansiyonun eşlik ettiği bradikardide; başlangıç <strong>5 mcg/kg/dk</strong>, kalp hızı ve MAP yanıtına
              göre titre edilir).
            </p>
          </div>

          {/* 2. Seçilmiş Şok / Hipotansiyon */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500 shrink-0" />
                <span>2. Seçilmiş Şok / Hipotansiyon (Bradikardi Eşlik Eden)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                SSC 2021 · Seçilmiş Hasta
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Surviving Sepsis Campaign (SSC 2021) kılavuzuna göre septik şokta yalnızca{' '}
              <strong>relatif veya mutlak bradikardisi olan ve taşiaritmi riski çok düşük</strong> seçilmiş hastalarda
              Noradrenaline alternatif vazopresör olarak{' '}
              <strong className="font-mono text-slate-900 dark:text-white">5–15 mcg/kg/dk</strong> dozunda kullanılabilir.
              Genel septik şok popülasyonunda Noradrenalin 1. tercihtir.
            </p>
          </div>

          {/* 3. Post-Resüsitasyon (ROSC) / Düşük Kardiyak Debi */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                <span>3. Post-Resüsitasyon (ROSC) &amp; Kronotropik Destek</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                3–10 mcg/kg/dk
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Post-kardiyak arrest (ROSC) veya açık kalp cerrahisi sonrası miyokardiyal depresyon ve bradikardinin ön
              planda olduğu seçilmiş olgularda geçiş tedavisi olarak kullanılır. Saf inotropi gerektiğinde Dobutamin, saf
              vazopresör gerektiğinde Noradrenalin tercih edilir.
            </p>
          </div>
        </div>

        {/* Klinik Kanıt Kutusu: SOAP-II & ANZICS Renal Dopamin */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-100' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>SOAP-II Çalışması (De Backer et al., NEJM 2010, n=1679)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-800 dark:text-rose-200">
                PMID: 20200382
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Şok tedavisinde ilk basamak Dopamin (maks 20 mcg/kg/dk) ile Noradrenalin (maks 0,19 mcg/kg/dk)
              karşılaştırılmıştır: 28 günlük genel mortalite benzer (%52,5 vs %48,5; p=0,10) bulunmuş; ancak dopamin
              grubunda <strong>aritmi oranı 2 kat yüksek (%24,1 vs %12,4; p&lt;0,001 — özellikle AF)</strong> ve{' '}
              <strong>kardiyojenik şok alt grubunda 28 günlük mortalite anlamlı olarak daha yüksek (p=0,03)</strong>{' '}
              saptanmıştır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-100' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                <span>ANZICS Renal-Dose Dopamine Trial (Bellomo et al., Lancet 2000, n=328)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200">
                PMID: 11191541
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              SIRS ve erken renal disfonksiyonu olan 328 YBÜ hastasında sürekli{' '}
              <strong>2 mcg/kg/dk düşük doz (&quot;renal doz&quot;) dopamin</strong> ile plasebo karşılaştırılmıştır: Pik
              serum kreatinin düzeyi (245 vs 249 µmol/L; p=0,93), renal replasman tedavisi (RRT) ihtiyacı (%21 vs %25;
              p=0,55), YBÜ kalış süresi veya sağkalım üzerine <strong>hiçbir klinik faydası olmadığı</strong> kanıtlanmıştır
              (SSC 2021 &amp; KDIGO: Sınıf III / Önerilmez).
            </p>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. DOZAJ KADEMELERİ & RESEPTÖR TİTRASYON ALGORİTMASI (#sec-dozaj)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozaj"
        title="Dozaj Kademeleri & Doz-Bağımlı Reseptör Titrasyon Algoritması"
        icon={<Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badge={<span className="hidden md:inline text-xs font-mono text-slate-500">D₁/D₂ → β₁ → α₁ Spektrumu</span>}
        defaultOpen={false}
        containerClassName={isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}
        bodyClassName="p-5 sm:p-6"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: D1/D2 */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'dopaminergic'
                ? 'border-teal-500 bg-teal-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  D₁/D₂ Dopaminerjik
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  Sınıf III (Önerilmez)
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                1 – 3 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Tarihsel &quot;renal doz&quot;; proksimal tübüler natriürez yapar ancak GFR veya RRT ihtiyacını iyileştirmez
                (ANZICS 2000).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              ⚠ ABH koruma amacıyla kullanılmaz
            </div>
          </div>

          {/* Kademe 2: Beta-1 */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'beta1'
                ? 'border-amber-500 bg-amber-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  β₁ İnotrop / Kronotrop
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Bradikardi &amp; CO↑
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                3 – 10 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Atropine yanıtsız semptomatik bradikardi ve düşük kardiyak debide standart başlangıç (5 mcg/kg/dk) ve
                titrasyon penceresi.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              ✓ Direkt β₁ + %50 endojen NE salınımı
            </div>
          </div>

          {/* Kademe 3: Alfa-1 */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'alpha1'
                ? 'border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/40'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  α₁ Baskın Vazopresör
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  SVR↑ · MAP↑
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-rose-700 dark:text-rose-300 mt-1">
                10 – 20 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Sistemik ve venöz vazokonstriksiyon baskınlaşır; D₁ renal gevşeme kaybolur, PCWP ve taşiaritmi (%24,1)
                riski hızla artar.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-700 dark:text-rose-300 font-bold">
              ⚠ Yakın EKG &amp; İskemi Takibi Şart
            </div>
          </div>

          {/* Kademe 4: >20 Tavan */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'exceeded'
                ? 'border-rose-600 bg-rose-600/20 ring-2 ring-rose-600/50'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Tavan Eşiği Aşımı (!)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  Noradrenaline Geç
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
                &gt; 20 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Ek inotropik kazanç olmaksızın aşırı vazokonstriksiyon, splanknik/periferik iskemi ve malign aritmi üretir.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-600 dark:text-rose-400 font-bold">
              ⛔ Artırma — Noradrenaline Geç!
            </div>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF DOZ & İNFÜZYON HESAPLAYICISI (#sec-hesaplayici)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="İnteraktif Dopamin Doz & İnfüzyon Pompası Hesaplayıcısı"
        subtitle="TR 200 mg / 5 mL ampul sulandırma şemaları, obezite IBW/AdjBW ölçekleyici ve canlı reseptör faz göstergesi."
        icon={
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Syringe className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
        containerClassName={isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}
        bodyClassName="p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-end gap-2">
          <MonographCopyButton
            isDark={isDark}
            getText={() =>
              [
                `DOPAMİN İNFÜZYON POMPASI ÖZETİ`,
                `Hasta Ağırlığı: ${weightKg} kg`,
                `Çözelti Konsantrasyonu: ${concentrationMcgMl} mcg/mL (${(concentrationMcgMl / 1000).toFixed(1)} mg/mL)`,
                `Hedef Doz: ${doseMcgKgMin.toFixed(1)} mcg/kg/dk`,
                `Dakikalık / Saatlik Doz: ${doseMcgMin.toFixed(0)} mcg/dk (${hourlyDoseMg.toFixed(2)} mg/saat)`,
                `İnfüzyon Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat (${infusionRateMlMin.toFixed(3)} mL/dk)`,
                `24 Saatlik Tüketim: ${dailyTotalMg.toFixed(0)} mg/gün (~${dailyAmpoulesNeeded.toFixed(1)} adet 200 mg ampul)`,
              ].join('\n')
            }
          />
          <button
            type="button"
            onClick={() => {
              setWeightKg(70);
              setPrepType('bag_250_2amp');
              setCustomConcInput(1600);
              setDoseMcgKgMin(5.0);
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Sol Kolon: Parametre Girdileri (7 Kolon) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Hasta Ağırlığı */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                <label htmlFor={weightInputId} className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-500" />
                  <span>Hasta Vücut Ağırlığı:</span>
                </label>
                <span className="font-mono tabular-nums text-sm text-amber-600 dark:text-amber-400 font-bold">
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
                  className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex items-center gap-1 shrink-0 flex-wrap">
                  {[20, 40, 60, 70, 80, 100].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeightKg(w)}
                      className={`px-2 py-1 text-[11px] font-mono tabular-nums rounded border transition-colors cursor-pointer ${
                        weightKg === w
                          ? 'bg-amber-600 text-white border-amber-600 font-bold'
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
              drugName="Dopamin"
              recommendedScalar="IBW"
              secondaryScalar={{ type: 'AdjBW', context: 'Alternatif' }}
              rationale="Obezitede (BMI ≥ 30) yağ dokusu vaskülaritesi düşük olduğundan ve dopamin intravasküler kompartmanda dağıldığından, aşırı taşiaritmi ve α₁ vazokonstriksiyonu önlemek için başlangıç dozu İdeal Vücut Ağırlığı (IBW) üzerinden hesaplanmalı, ardından hemodinamik yanıta (MAP/HR) göre titre edilmelidir."
              currentWeightKg={weightKg}
              onApplyWeight={(w) => setWeightKg(Math.min(150, Math.max(5, w)))}
            />

            {/* 2. TR Preparat & Sulandırma Seçici */}
            <div>
              <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                TR Preparat &amp; Sulandırma Şeması (1 Ampul = 200 mg / 5 mL):
              </label>
              <select
                id={prepSelectId}
                value={prepType}
                onChange={(e) => setPrepType(e.target.value as any)}
                className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600'
                }`}
              >
                <option value="bag_250_1amp">
                  Standart Periferik / Santral Torba: 1 Ampul (200 mg / 5 mL) + 245 mL SF/%5 Dekstroz (250 mL) = 800 mcg/mL (0,8 mg/mL)
                </option>
                <option value="bag_500_1amp">
                  Düşük Konsantrasyonlu Torba: 1 Ampul (200 mg / 5 mL) + 495 mL SF/%5 Dekstroz (500 mL) = 400 mcg/mL (0,4 mg/mL)
                </option>
                <option value="bag_250_2amp">
                  Standart YBÜ Konsantre Torba: 2 Ampul (400 mg / 10 mL) + 240 mL SF/%5 Dekstroz (250 mL) = 1600 mcg/mL (1,6 mg/mL)
                </option>
                <option value="syringe_50_1amp">
                  Sıvı Kısıtlı YBÜ Enjektör Pompası (Santral Kateter Şart!): 1 Ampul (200 mg / 5 mL) + 45 mL SF/%5 Dekstroz (50 mL) = 4000 mcg/mL (4 mg/mL)
                </option>
                <option value="custom_conc">Özel Konsantrasyon (mcg/mL)</option>
              </select>

              {prepType === 'custom_conc' && (
                <div className="mt-2 flex items-center gap-2">
                  <label htmlFor={customConcInputId} className="text-xs text-slate-500 shrink-0">
                    Özel Konsantrasyon:
                  </label>
                  <input
                    id={customConcInputId}
                    type="number"
                    min="100"
                    max="10000"
                    step="50"
                    value={customConcInput}
                    onChange={(e) => setCustomConcInput(Math.max(1, Number(e.target.value)))}
                    className={`w-28 p-1.5 text-xs font-mono rounded-lg border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs text-slate-500 font-mono">mcg/mL</span>
                </div>
              )}

              <div className="mt-1.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span>
                  Seçili Konsantrasyon:{' '}
                  <strong className="text-slate-900 dark:text-white font-mono">
                    {concentrationMcgMl} mcg/mL ({(concentrationMcgMl / 1000).toFixed(2)} mg/mL)
                  </strong>
                </span>
                <span>1 Ampul = 200 mg / 5 mL (40 mg/mL)</span>
              </div>
            </div>

            {/* 3. Doz Slider & Hızlı Preset Butonları */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5">
                <label htmlFor={doseSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                  Hedef İnfüzyon Dozu (1 – 20 mcg/kg/dk):
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id={doseInputId}
                    type="number"
                    min="0.5"
                    max="30"
                    step="0.5"
                    value={doseMcgKgMin}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val) && val >= 0) {
                        setDoseMcgKgMin(Math.min(30, val));
                      }
                    }}
                    aria-label="Hedef doz mcg/kg/dk"
                    className={`w-16 px-2 py-0.5 text-right font-mono text-sm font-bold rounded border ${
                      isDark
                        ? 'bg-slate-800 border-slate-700 text-amber-400'
                        : 'bg-white border-slate-300 text-amber-700'
                    }`}
                  />
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">mcg/kg/dk</span>
                </div>
              </div>

              <input
                id={doseSliderId}
                type="range"
                min="1"
                max="20"
                step="0.5"
                value={Math.min(20, Math.max(1, doseMcgKgMin))}
                onChange={(e) => setDoseMcgKgMin(Number(e.target.value))}
                className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />

              {/* Hızlı Preset Butonları */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {[
                  {
                    dose: 2.0,
                    label: '2 mcg/kg/dk',
                    sub: 'D₁/D₂ — Tarihsel "Renal" Spektrum · ABH için önerilmez',
                  },
                  {
                    dose: 5.0,
                    label: '5 mcg/kg/dk',
                    sub: 'β₁ İnotrop / Kronotrop Başlangıç — Bradikardi / Düşük CO',
                  },
                  {
                    dose: 10.0,
                    label: '10 mcg/kg/dk',
                    sub: 'Mikst β₁ + α₁ Geçiş Fazı',
                  },
                  {
                    dose: 15.0,
                    label: '15 mcg/kg/dk',
                    sub: 'α₁ Baskın Vazopresör — >20 üzerine çıkma, Noradrenaline geç!',
                  },
                ].map((preset) => {
                  const active = Math.abs(doseMcgKgMin - preset.dose) < 0.1;
                  return (
                    <button
                      key={preset.dose}
                      type="button"
                      onClick={() => setDoseMcgKgMin(preset.dose)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-500 text-white'
                            : 'bg-amber-50 border-amber-500 text-slate-900 shadow-2xs'
                          : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                          {preset.label}
                        </span>
                        {active && (
                          <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                            Seçili
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                        {preset.sub}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Canlı Pompa Sonuçları & Reseptör Faz Göstergesi (5 Kolon) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  İnfüzyon Pompası Hızı
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  {concentrationMcgMl} mcg/mL
                </span>
              </div>

              {/* BÜYÜK POMPA DEBİSİ (mL/saat ve mL/dk) */}
              <div className="py-4 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono text-amber-600 dark:text-amber-400 tracking-tight">
                  {infusionRateMlHr.toFixed(1)}{' '}
                  <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                    mL / saat
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                  ({infusionRateMlMin.toFixed(3)} mL/dk · ~{Math.round(infusionRateMlMin * 60)} mikrodamla/dk)
                </div>
              </div>

              {/* DETAYLI PARAMETRE GRID'İ */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Dakikalık Doz</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {doseMcgMin.toFixed(0)} mcg / dk
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({doseMcgKgMin.toFixed(1)} mcg/kg/dk)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Doz</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {hourlyDoseMg.toFixed(2)} mg / saat
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({hourlyDoseMcg.toFixed(0)} mcg/saat)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Saatlik Tüketim</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    {dailyTotalMg.toFixed(0)} mg / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    ({dailyTotalMl.toFixed(0)} mL / 24 saat)
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Gereken Ampul (200 mg)</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                    ~{Math.ceil(dailyAmpoulesNeeded)} Ampul / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    (Net: {dailyAmpoulesNeeded.toFixed(1)} ampul)
                  </span>
                </div>
              </div>
            </div>

            {/* AKTİF RESEPTÖR & HEMODİNAMİK FAZ GÖSTERGESİ (Dinamik Kart) */}
            {activePhase === 'dopaminergic' && (
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-teal-950/30 border-teal-500/40 text-teal-100' : 'bg-teal-50 border-teal-300 text-teal-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-300 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 shrink-0" />
                    <span>Aktif Faz: D₁ / D₂ Dopaminerjik Faz (1–3 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-200">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  Splanknik ve renal vazodilatasyon, proksimal tübüler natriürez.{' '}
                  <strong>Dikkat: ANZICS RCT (Lancet 2000) ve KDIGO&apos;ya göre böbrek koruyucu değildir!</strong> Akut
                  böbrek hasarını (ABH) önlemek veya tedavi etmek amacıyla rutin kullanımı önerilmez (Sınıf III).
                </p>
              </div>
            )}

            {activePhase === 'beta1' && (
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-100' : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 shrink-0" />
                    <span>Aktif Faz: β₁-Adrenerjik Baskın Faz (3–10 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-200">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  Pozitif inotropi &amp; kronotropi; direkt miyokardiyal β₁ uyarımı + presinaptik sempatik uçlardan{' '}
                  <strong>endojen noradrenalin salınımı</strong> ile atım hacmi (SV), kalp hızı (HR) ve kardiyak debi (CO)
                  artışı. Atropine yanıtsız semptomatik bradikardide hedef başlangıç ve titrasyon bölgesidir.
                </p>
              </div>
            )}

            {activePhase === 'alpha1' && (
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-rose-950/30 border-rose-500/40 text-rose-100' : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 shrink-0" />
                    <span>Aktif Faz: α₁-Adrenerjik Baskın Faz (10–20 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-200">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  Sistemik arteriyoler ve venöz vazokonstriksiyon, SVR ve MAP artışı; D₁ renal vazodilatasyon tamamen
                  kaybolur. <strong>Taşiaritmi (AF/VT), miyokard oksijen tüketimi artışı ve splanknik iskemi riski yüksektir!</strong>{' '}
                  20 mcg/kg/dk üzerine çıkılmamalı, vazopresör ihtiyaç sürüyorsa <strong>Noradrenaline</strong> geçilmelidir.
                </p>
              </div>
            )}

            {activePhase === 'exceeded' && (
              <div
                className={`p-4 rounded-2xl border ring-2 ring-rose-500/50 ${
                  isDark ? 'bg-rose-950/60 border-rose-500 text-rose-100' : 'bg-rose-100 border-rose-500 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-200 flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 shrink-0" />
                    <span>Maksimum Eşik Aşımı Uyarısı (&gt;20 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  <strong>&gt;20 mcg/kg/dk üzerinde ağır vazokonstriksiyon, doku iskemisi ve malign taşiaritmi gelişir!</strong>{' '}
                  Dopamin dozu daha fazla artırılmamalı; derhal <strong>Noradrenalin (Norepinefrin)</strong> eklenmeli veya
                  Noradrenaline geçilmelidir.
                </p>
              </div>
            )}
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. TÜRKİYE PREPARAT & SULANDIRMA REHBERİ (#sec-tr-preparat)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Dopmin® / Dopadren® / Dopasel® / Dobetal® / Dopamine DBL-Fresenius® 200 mg / 5 mL Ampul',
            presentation: '5 mL berrak, renksiz veya hafif sarımtırak steril konsantre IV infüzyon çözeltisi içeren cam ampul',
            concentration: '40 mg/mL (= 40.000 mcg/mL)',
            saltOrBaseNote:
              'Her 5 mL ampul 200 mg Dopamin Hidroklorür (1 mL = 40 mg = 40.000 mcg) ve antioksidan koruyucu olarak Sodyum Metabisülfit içerir. ASLA sulandırılmadan doğrudan IV verilmez!',
            alertLevel: 'high',
          },
          {
            name: 'Sulandırılmış YBÜ / Acil Servis İnfüzyon Çözeltileri (%5 Dekstroz veya %0,9 NaCl)',
            presentation: '250–500 mL infüzyon torbası veya 50 mL enjektör pompası',
            concentration: '400 · 800 · 1600 · 4000 mcg/mL',
            saltOrBaseNote:
              'Sülfit duyarlılığı olan (özellikle ağır astımlı) hastalarda sodyum metabisülfit akut bronkospazm veya anafilaktoid reaksiyon tetikleyebilir. Çözeltide koyu sarı, pembe veya kahverengi renk değişimi (oksidasyon) varsa kesinlikle kullanılmamalıdır.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          '250 mL’de 1 Ampul (800 mcg/mL = 0,8 mg/mL): 1 Ampul (200 mg / 5 mL) + 245 mL SF veya %5 Dekstroz = 250 mL toplam — Standart Periferik / Santral Torba.',
          '500 mL’de 1 Ampul (400 mcg/mL = 0,4 mg/mL): 1 Ampul (200 mg / 5 mL) + 495 mL SF veya %5 Dekstroz = 500 mL toplam — Düşük Konsantrasyonlu Torba.',
          '250 mL’de 2 Ampul (1600 mcg/mL = 1,6 mg/mL): 2 Ampul (400 mg / 10 mL) + 240 mL SF veya %5 Dekstroz = 250 mL toplam — Standart YBÜ Konsantre Torba.',
          '50 mL Enjektörde 1 Ampul (4000 mcg/mL = 4 mg/mL): 1 Ampul (200 mg / 5 mL) + 45 mL SF veya %5 Dekstroz = 50 mL enjektör pompası — Sıvı Kısıtlı YBÜ (Santral Venöz Kateter Şart!).',
        ]}
        concentrationTrapWarning="DOPamin (200 mg / 5 mL = 40 mg/mL) ile DOBUTamin (250 mg / 20 mL = 12,5 mg/mL) ampulleri isim ve endikasyon benzerliği (LASA) nedeniyle sıklıkla karışır! Hazırlanan her torba ve enjektörün üzerine Tall-Man harflerle 'DOPamin — XXX mcg/mL' etiketi yapıştırılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. DAMAR YOLU, Y-SITE UYUMLULUK & EKSTRAVAZASYON (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="central-preferred"
        accessSummary="Tercihen Santral Venöz Kateter (SVK) üzerinden infüze edilir. Acil durumda SVK açılana kadar geniş proksimal periferik venden (antekübital fossa; el sırtı veya ayak bileği venlerinden kaçınılmalı!) yalnızca düşük konsantrasyonda (≤ 800–1600 mcg/mL) kısa süreli verilebilir ve giriş yeri saatlik kontrol edilmelidir. Yüksek konsantrasyonlu enjektör (4000 mcg/mL) mutlak SVK gerektirir."
        phRange="2,5 – 5,0 (Asidik Çözelti)"
        osmolalityNote="Alkali ortamlarda (pH > 6–7) katekolamin halkası hızla oksitlenerek pembe/kahverengi ürünlere parçalanır ve aktivitesini kaybeder."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          '%5 Dekstroz + %0,9 NaCl',
          'Ringer Laktat (RL)',
        ]}
        stabilityNote="Sulandırılmış çözelti oda sıcaklığında 24 saat stabildir. Işıktan korunmalı; pembe, koyu sarı veya kahverengi renk değişimi ya da çökelti görülürse derhal değiştirilmelidir."
        ySiteCompatible={[
          'SF (%0,9 NaCl)',
          '%5 Dekstroz',
          'Ringer Laktat',
          'Noradrenalin',
          'Dobutamin',
          'Adrenalin',
          'Midazolam',
          'Fentanil',
          'Heparin',
        ]}
        ySiteIncompatible={[
          'Sodyum Bikarbonat (%8,4 NaHCO₃) ve tüm alkali çözeltiler (katekolamini hızla oksitleyerek inaktive eder!)',
          'Furosemid',
          'İnsülin',
          'Amfoterisin B',
          'Fenitoin (IV)',
          'Tiopental',
        ]}
        extravasationProtocol="Ekstravazasyon Protokolü (α₁ vazokonstriksiyona bağlı doku nekrozunu önlemek için ilk 12 saat içinde): (1) İnfüzyonu derhal durdurun. (2) Kanülü çekmeden önce enjektörle kanülden 3–5 mL kan/sıvı aspire edin, ardından kanülü çıkarın. (3) Fentolamin 5–10 mg’ı 10–15 mL SF içinde sulandırarak ince iğneyle (25–27G) soluk/iskemik alana ve kenarlarına subkutan infiltre edin (12 saat içinde uygulandığında beyazlaşmayı ve vazospazmı dakikalar içinde tersine çevirir). (4) Fentolamin yoksa Terbutalin (1 mg / 10 mL SF SC infiltrasyon) veya Topikal %2 Nitrogliserin pomad + ekstremite elevasyonu ve kuru ılık kompres uygulayın (soğuk/buz kesinlikle uygulanmaz!)."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Plazma/doku MAO ve COMT ile hızla yıkılır; böbrek yetmezliğinde rutin başlangıç doz azaltımı gerekmez, klinik yanıta göre titre edilir."
        renalDetails={[
          'Dopaminin aktif molekülü plazma, böbrek ve karaciğerdeki MAO/COMT enzimleriyle dakikalar içinde inaktif HVA ve VMA metabolitlerine dönüştürülür; metabolitler idrarla atılır.',
          'Ağır böbrek yetmezliğinde veya diyaliz/CRRT altında doğrudan hemodinamik hedefe göre titre edilir.',
          'ANZICS ve KDIGO Uyarısı: Düşük doz (1–3 mcg/kg/dk) dopaminin oligürik ABH hastalarında böbrek fonksiyonunu koruduğu veya diyaliz ihtiyacını azalttığı görüşü tamamen çürütülmüştür.',
        ]}
        hepaticSummary="Karaciğer yetmezliğinde doku ve plazma MAO/COMT klirensi devam eder; başlangıç dozu klinik yanıta göre titre edilir."
        hepaticDetails={[
          'İleri evre sirozda (Child-Pugh C) splanknik dolaşım dinamikleri değiştiğinden yüksek doz (>10 mcg/kg/dk) dopamin portal basıncı ve mezenterik vazokonstriksiyonu etkileyebilir.',
          'Hepatorenal sendromda (HRS) dopamin etkisizdir; Terlipressin veya Noradrenalin + Albümin tercih edilmelidir.',
        ]}
        {...STANDALONE_ORGAN_PART1['dopamine']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="Düşük Başlangıç · Aritmi & İskemi İzlemi"
        geriatricPoints={[
          'Geriatrik hastalarda (>65 yaş) miyokardiyal β₁-reseptör yanıtı ve baroreseptör refleks kapasitesi azalmış; buna karşın altta yatan koroner arter hastalığı, atriyal fibrilasyon (AF) ve oklüziv periferik arter hastalığı sıklığı yüksektir.',
          'Düşük dozla (2–5 mcg/kg/dk) başlanmalı ve yavaş titre edilmelidir; yaşlı septik veya kardiyojenik şok hastalarında dopamin ile yeni başlangıçlı hızlı AF ve miyokardiyal iskemi riski gençlere göre belirgin daha fazladır.',
          'Periferik ekstremite perfüzyonu (kapiller dolum, parmak ucu sıcaklığı ve rengi) sık aralıklarla kontrol edilmelidir.',
        ]}
        obesityWeightScalarBadge="IBW (Başlangıç) → Yanıta Göre Titre Et"
        obesityPoints={[
          'Obezitede (BMI ≥ 30 kg/m²) yağ dokusunun vaskülaritesi düşük olduğundan ve dopamin hidrofilik yapısıyla intravasküler kompartmanda (Vd ~0,5 L/kg) dağıldığından, gerçek vücut ağırlığı (TBW) üzerinden doz hesaplanması aşırı yüksek başlangıç dozlarına, taşiaritmiye ve erken α₁ vazokonstriksiyona yol açar.',
          'Başlangıç dozu İdeal Vücut Ağırlığı (IBW) (veya alternatif olarak Düzeltilmiş Vücut Ağırlığı - AdjBW) üzerinden hesaplanmalı; yarı ömrü (~2 dk) çok kısa olduğundan ardından hedef hemodinamik yanıta (MAP ve kalp hızı) göre dakika dakika titre edilmelidir.',
          'Hesaplayıcı bölümündeki Obezite Doz Ölçekleyici ile boy/cinsiyete göre IBW tek tıkla uygulanabilir.',
        ]}
        clinicalNote="Hem geriatrik hem morbid obez hastalarda yüksek doz dopamin (>10 mcg/kg/dk) gereksinimi doğduğunda dozu artırmak yerine erken dönemde Noradrenaline geçilmesi taşiaritmi yükünü azaltır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GEBELİK & LAKTASYON (#sec-gebelik)                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="FDA Gebelik Kategorisi C · Yalnızca maternal hayati endikasyonda; yüksek dozda uterin arter vazokonstriksiyonu yapabilir."
        pregnancyDetails={[
          'Maternal şok veya dirençli semptomatik bradikardide anne hemodinamisini sağlamak fetal sağkalım için önceliklidir.',
          'Ancak yüksek dozlarda (>10 mcg/kg/dk) α₁-aracılı uterin damar vazokonstriksiyonu uteroplasental kan akımını azaltabilir; obstetrik spinal hipotansiyonda ve septik şokta ilk tercih Noradrenalin veya Fenilefrindir.',
        ]}
        lactationSummary="Yarı ömrü ~2 dakika ve oral biyoyararlanımı %0 olduğundan emzirme açısından sistemik bebek maruziyeti beklenmez."
        lactationDetails={[
          'Dopamin GI kanaldan emilmez ve hızla inaktive olur; ancak intravenöz dopamin infüzyonu ön hipofiz D₂ reseptörlerini uyararak maternal serum Prolaktin düzeyini baskılar ve süt üretimini geçici olarak azaltabilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. OLUMSUZ ETKİLER (#sec-olumsuz)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="sec-olumsuz"
        items={[
          {
            title: 'Taşiaritmiler (Sinüs Taşikardisi, AF, VT)',
            incidenceOrSeverity: '%24,1 (SOAP-II)',
            detail:
              'Noradrenaline göre 2 kat fazla aritmi (%24,1 vs %12,4); pozitif kronotropi, artmış AV iletim ve ektopik odak aktivasyonu.',
            tone: 'rose',
          },
          {
            title: 'Miyokard Oksijen Tüketimi (MVO₂) Artışı & İskemi',
            incidenceOrSeverity: 'Doz-Bağımlı',
            detail:
              'Taşikardi ve artmış kontraktilite koroner arter hastalığı veya kardiyojenik şokta subendokardiyal iskemiyi derinleştirir.',
            tone: 'amber',
          },
          {
            title: 'Ekstravazasyon Nekrozu & Periferik Gangren',
            incidenceOrSeverity: 'Vezikan (α₁)',
            detail:
              'Periferik sızıntıda lokal doku nekrozu (antidot: Fentolamin); yüksek doz uzun süreli infüzyonda parmak ucu iskemisi.',
            tone: 'rose',
          },
          {
            title: 'Hipofizer Süpresyon & Bulantı/Kusma',
            incidenceOrSeverity: 'D₂ Aracılı',
            detail:
              'KBB dışındaki ön hipofiz ve area postrema (CTZ) D₂ uyarımıyla Prolaktin/TSH/GH baskılanması ve uyanık hastada bulantı.',
            tone: 'indigo',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖZEL KLİNİK DURUMLAR & UYARILAR (#sec-ozel-durumlar)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: 'Sodyum Metabisülfit Alerjisi & Bronkospazm Riski',
            detail:
              'Türkiye’deki dopamin ampulleri antioksidan olarak sodyum metabisülfit içerir. Sülfit duyarlılığı olan (özellikle steroid bağımlı veya ağır astımlı) hastalarda akut bronkospazm ve anafilaktoid reaksiyon tetikleyebilir.',
          },
          {
            title: 'Hipofizer & İmmün Baskılanma (Prolaktin, TSH ve GH Süpresyonu)',
            detail:
              'Ön hipofiz kan-beyin bariyeri dışında yer aldığından, dopamin infüzyonu D₂ reseptörleri üzerinden Prolaktin, TSH ve Büyüme Hormonu (GH) sekresyonunu güçlü şekilde baskılar. Bu durum kritik hastalık ötiroid hasta sendromunu maskeler/derinleştirir ve prolaktin düşüşüyle T-lenfosit immün yanıtını zayıflatabilir.',
          },
          {
            title: 'Kesilme Protokolü (Weaning — Ani Kesilmez!)',
            detail:
              'Dopamin infüzyonu asla aniden kapatılmamalıdır! Yarı ömrü ~2 dk olduğundan ve uzamış infüzyonda endojen noradrenalin depoları boşalmış olabileceğinden, ani kesilmesi ağır rebound hipotansiyona yol açar. Övolemi doğrulandıktan sonra doz her 15–30 dakikada bir kademeli olarak (ör. 1–2 mcg/kg/dk adımlarla) azaltılarak kesilir.',
          },
          {
            title: 'Uzamış İnfüzyonda Taşiflaksi (Endojen Noradrenalin Depo Tükenmesi)',
            detail:
              'Dopaminin kardiyak inotropik etkisinin yaklaşık %50’si sempatik sinir uçlarından endojen noradrenalin salınımına bağlıdır. Kronik kalp yetmezliği veya >24–48 saat süren ağır şokta miyokardiyal noradrenalin depoları tükendiğinde dopamin yanıtı körelir (taşiflaksi); doğrudan etkili agonistlere (Noradrenalin / Dobutamin / Adrenalin) geçilmelidir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. DERİN FARMAKODİNAMİK ANALİZ (#sec-derin-pd, 4 Kademe)            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (GPCR Alt Tipleri: D₁/D₂ > β₁ > α₁ & Presinaptik NET Taşıyıcısı)',
          summary:
            'Dopamin (3,4-dihidroksifeniletilamin), hedef hücre zarlarında 7-transmembran (7-TM) G-proteini kenetli reseptör (GPCR) süper ailesinin üç farklı sınıfına konsantrasyon-bağımlı ardışık afiniteyle (D₁/D₂ [Ki ~0,5–2 µM] > β₁ [Ki ~5–10 µM] > α₁ [Ki >20 µM]) bağlanır ve aynı zamanda presinaptik sempatik nöron membranındaki Norepinefrin Taşıyıcısı (NET / Uptake-1) üzerinden hücre içine girerek veziküler noradrenalin ekzositozunu tetikler (Miller’s 10th Ed. / Stoelting’s 6th Ed.).',
          points: [
            'Vasküler & Renal Tübüler Hücre Zarı (D₁-Benzeri Reseptörler: D₁ ve D₅): Renal afferent/efferent arteriyol, mezenterik ve koroner vasküler düz kas hücrelerinin postsinaptik sarkolemmasında ve böbrek proksimal kıvrımlı tübül (PCT) hücrelerinin apikal/bazolateral zarında yer alan D₁ reseptörlerine düşük plazma konsantrasyonlarında (1–3 mcg/kg/dk) bağlanarak heterotrimerik Gαs/olf alt birimini aktive eder.',
            'Presinaptik Sempatik Sinir Ucu, Hipofiz & Glomus Hücre Zarı (D₂-Benzeri Reseptörler: D₂, D₃, D₄): Sempatik postgangliyonik akson varikozitelerinin presinaptik membranındaki D₂ otoreseptörlerine, ön hipofiz laktotrof/tirotrof hücre zarına, area postrema kemoreseptör tetik bölgesine (CTZ) ve karotid cisimcik Tip-I glomus hücre membranına bağlanarak pertussis toksinine duyarlı Gαi/o proteinini kenetler.',
            'Kardiyomiyosit Sarkolemması & Presinaptik Sempatik Terminaller (β₁-Adrenerjik Reseptör & VMAT2/NET): Orta dozlarda (3–10 mcg/kg/dk) SA/AV düğüm pacemaker hücreleri ile ventriküler kardiyomiyosit sarkolemmasındaki β₁ reseptörlerini (Gαs) doğrudan uyarır; eşzamanlı olarak presinaptik sempatik sinir ucu zarındaki NET taşıyıcısıyla akson sitozolüne taşınıp sinaptik veziküllerden (VMAT2) endojen noradrenalini sinaptik aralığa boşaltır (kardiyak inotropik yanıtın ~%50’si bu indirekt presinaptik salınıma bağlıdır).',
            'Vasküler Düz Kas Hücresi Sarkolemması (α₁A / α₁B / α₁D-Adrenerjik Reseptörler): Yüksek infüzyon hızlarında (>10–20 mcg/kg/dk) sistemik arteriyol, venül ve pulmoner damar düz kası sarkolemmasındaki postsinaptik α₁ reseptörlerine düşük afiniteli ancak yüksek kapasiteli bağlanarak Gαq/11 proteinini aktive eder ve periferik D₁ vazodilatasyonunu tamamen maskeler.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'Hücre zarındaki GPCR veya NET etkileşimi; hedef hücrenin tipine göre (kardiyomiyosit, vasküler düz kas, renal tübül epiteli, hipofiz hücresi) dört ayrı hücre içi biyokimyasal ve elektrofizyolojik kaskadı tetikler:',
          points: [
            'Kardiyomiyosit & SA Düğüm Hücresi İçi (β₁ → Gαs → AC↑ → cAMP↑ → PKA Kaskadı): Adenilat siklaz (AC Tip V/VI) aktivasyonuyla yükselen hücre içi cAMP, Protein Kinaz A’yı (PKA) aktive eder. PKA; (1) sarkolemmadaki L-tipi voltaj kapılı Ca²⁺ kanallarını (Cav1.2) fosforilleyerek Faz 2 platosunda hücre içine Ca²⁺ girişini artırır, (2) Sarkoplazmik Retikulum (SR) üzerindeki Riyanodin Reseptörlerini (RyR2) duyarlılaştırarak Ca²⁺-aracılı Ca²⁺ salınımını (CICR) büyütür ve Troponin-C’ye Ca²⁺ bağlanmasıyla aktin-miyozin çapraz köprü kuvvetini (pozitif inotropi) artırır, (3) SR zarındaki Fosfolamban’ı fosforilleyerek SERCA2a pompas üzerindeki inhibisyonu kaldırır ve diyastolik Ca²⁺ geri alımını hızlandırır (pozitif lusitropi), (4) SA düğümde cAMP doğrudan HCN4 (If "funny" akımı) kanallarına bağlanarak Faz 4 spontan diyastolik depolarizasyon eğimini dikleştirir (pozitif kronotropi).',
            'Renal Proksimal Tübül Epiteli & Vasküler Düz Kas Hücresi İçi (D₁ → Gαs → cAMP / PKA → DARPP-32 & MLCK İnhibisyonu): Vasküler düz kas hücresinde yükselen cAMP/PKA, Miyozin Hafif Zincir Kinazı (MLCK) fosforilleyerek Ca²⁺-Kalmodulin kompleksine afinitesini düşürür ve BKCa (büyük iletkenlikli Ca²⁺-bağımlı K⁺) kanallarını açarak membranı hiperpolarize eder → düz kas gevşemesi. Böbrek proksimal tübül hücresinde ise PKA ve PKC aracılı DARPP-32 fosforilasyonu; apikal fırçamsı kenardaki Na⁺/H⁺ Değiştirici-3 (NHE3) ile bazolateral zardaki Na⁺/K⁺-ATPaz pompasının endositozla hücre içine çekilip inhibe olmasını sağlar → transselüler Na⁺ geri emilimi durur (hücresel natriürez).',
            'Vasküler Düz Kas Hücresi İçi Yüksek Doz Kaskadı (α₁ → Gαq/11 → PLC-β → IP₃ / DAG → MLCK & Rho-Kinaz): Fosfolipaz C-β (PLC-β) membran PIP₂’sini parçalayarak İnozitol 1,4,5-Trisfosfat (IP₃) ve Diasilgliserol (DAG) üretir. IP₃, sarkoplazmik retikulum zarındaki IP₃R kanallarını açarak sitozolik [Ca²⁺]i konsantrasyonunu hızla yükseltir; Ca²⁺-Kalmodulin kompleksi MLCK’yı aktive ederek Miyozin Hafif Zincirini (MLC20) fosforiller. Eşzamanlı olarak DAG/PKC ve RhoA/Rho-Kinaz (ROCK) yolağı Miyozin Fosfatazı (MLCP) inhibe ederek Ca²⁺ duyarlılaşması ve tonik düz kas kontraksiyonu üretir.',
            'Nöroendokrin & Presinaptik Hücre İçi (D₂ → Gαi/o → AC↓ → cAMP↓, GIRK K⁺ Açılması & N-Tipi Ca²⁺ Kapanması): Gαi alt birimi adenilat siklazı inhibe ederken, serbestleşen Gβγ kompleksi içeri doğrultucu K⁺ kanallarını (GIRK) açarak hücreyi hiperpolarize eder ve voltaj kapılı N/P/Q-tipi Ca²⁺ kanallarını kapatır → vezikül füzyonu (SNARE) durur; ön hipofizde Prolaktin/TSH/GH ekzositozu ve karotid cisimcik glomus hücrelerinde hipoksik nörotransmitter deşarjı baskılanır.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Miyokard Dokusu, İleti Sistemi & Koroner Yatak → Kalp Fizyolojisi',
            tissueTarget: 'Kardiyomiyosit · SA/AV Düğüm · Purkinje Ağı',
            accent: 'rose',
            points: [
              'Kontraktilite & Kardiyak Debi (3–10 mcg/kg/dk): Ventrikül miyokardında dP/dt(max), atım hacmi (SV) ve Kardiyak İndeks (CI) artar; ancak hücre içi Ca²⁺ yüklenmesi ve taşikardi nedeniyle miyokard oksijen tüketimi (MVO₂) belirgin yükselir.',
              'İleti Sistemi & Aritmojenite (SOAP-II Mekanizması): SA düğümde Faz 4 eğiminin dikleşmesi, AV düğümde efektif refrakter periyodun kısalması ve Purkinje liflerinde gecikmiş ard-depolarizasyonlar (DAD) nedeniyle sinüs taşikardisi, hızlı ventrikül yanıtlı AF ve ventriküler taşiaritmi insidansı Noradrenalinin 2 katıdır (%24,1 vs %12,4).',
              'Koroner Perfüzyon Dengesi: Epikardiyal ve direnç koroner damarlarda D₁ vazodilatasyon oluşsa da, yüksek dozlarda taşikardiye bağlı diyastolik dolum süresinin kısalması ve α₁ aracılı LVEDP/duvar gerilimi artışı subendokardiyal koroner perfüzyon basıncını (CPP = DBP − LVEDP) bozabilir.',
            ],
          },
          {
            systemTitle: 'Arteriyoler & Venöz Vasküler Düz Kas Dokusu → Sistemik & Pulmoner Dolaşım',
            tissueTarget: 'Rezistans Arteriyoller · Venöz Kapasitans · Pulmoner Yatak',
            accent: 'amber',
            points: [
              'Bifazik Rezistans Arteriyol Yanıtı: Düşük dozda (1–3 mcg/kg/dk) renal/mezenterik D₁ gevşemesiyle SVR sabit kalır veya hafif düşer; >10 mcg/kg/dk üzerinde ise α₁ kasılması tüm vasküler yataklarda baskınlaşarak SVR ve MAP’ı hızla yükseltir.',
              'Venöz Kapasitans & Ventrikül Dolum Basınçları: Splanknik ve sistemik venöz düz kastaki α₁ reseptörleri arteriyollere göre daha düşük eşikte uyarılır; unstressed venöz hacmi stressed hacme çevirerek sağ kalbe venöz dönüşü, santral venöz basıncı (CVP) ve sol ventrikül diyastol sonu / pulmoner kapiller kama basıncını (PCWP) artırır (kardiyojenik pulmoner ödem riskini kötüleştirir).',
              'Pulmoner Vasküler Yatak: Pulmoner arter düz kasında β₂ gevşeticisi zayıf, α₁ kasıcı etkisi belirgin olduğundan özellikle >10 mcg/kg/dk dozlarda Pulmoner Vasküler Direnci (PVR) ve sağ ventrikül afterload’unu artırır.',
            ],
          },
          {
            systemTitle: 'Nefron Tübül Epiteli, Renal & Splanknik Mikrodolaşım → Böbrek & GİS',
            tissueTarget: 'Afferent/Efferent Arteriyol · Proksimal Tübül · Villus Mikrodolaşımı',
            accent: 'teal',
            points: [
              'Renal Korteks vs Medulla Paradoksu (1–3 mcg/kg/dk): Afferent ve efferent arteriyollerde D₁ vazodilatasyonla renal kortikal kan akımı ve proksimal tübülde NHE3/Na⁺-K⁺-ATPaz inhibisyonuyla natriürez/diürez artar; ancak Henle kulpu kalın çıkan koluna (mTAL) ulaşan yüksek Na⁺ yükü medüller Na⁺/K⁺-ATPaz iş yükünü ve O₂ tüketimini artırarak hipoksik dış medullayı iskemik hasara açık hale getirir (ANZICS çalışmasında ABH koruması sağlamamasının temel fizyolojik nedeni).',
              'Yüksek Doz Renal & Mezenterik Vazokonstriksiyon (>10 mcg/kg/dk): α₁ uyarımı renal ve mezenterik D₁ vazodilatasyonunu tamamen ezer; renal kan akımı, GFR ve idrar çıkışı düşer.',
              'Splanknik Mukoza & Villus Perfüzyonu: Yüksek doz α₁ vazokonstriksiyon bağırsak villus uçlarındaki ters-akım (counter-current) mikrodolaşımını bozarak mukozal asidoz, bariyer yıkımı ve bakteriyel translokasyon riskini artırır.',
            ],
          },
          {
            systemTitle: 'Karotid Cisimcik, Hipotalamo-Hipofizer & Sirkümventriküler Doku → Solunum, Endokrin & SSS',
            tissueTarget: 'Glomus Hücreleri · Ön Hipofiz · Area Postrema (CTZ)',
            accent: 'indigo',
            points: [
              'Karotid Cisimcik & Solunum Kontrolü (Glomus Tip-I Hücresi): Periferik kemoreseptör glomus hücrelerinde D₂ reseptör aktivasyonu, hipoksiye (PaO₂ düşüşüne) yanıt olarak gelişen afferent sinir deşarjını inhibe eder → spontan soluyan hastada hipoksik ventilatuar dürtüyü %40–60 oranında köreltir ve pulmoner vazodilatasyonla V/Q uyumsuzluğunu (şantı) artırabilir.',
              'Ön Hipofiz & İmmün Sistem (Median Eminens / Laktotrof & Tirotrof Dokusu): Kan-beyin bariyeri dışında kalan ön hipofizde D₂ uyarımı Prolaktin, TSH ve Büyüme Hormonu (GH) salınımını hızla baskılar; kritik hastalık "ötiroid hasta sendromunu" derinleştirir, katabolizmayı artırır ve prolaktin eksikliği üzerinden T-lenfosit/makrofaj aracılı hücresel bağışıklığı zayıflatır.',
              'Kan-Beyin Bariyeri & Area Postrema (SSS): Polar katekolamin yapısı ve endotelyal MAO/COMT bariyeri nedeniyle sağlam KBB’yi geçmez (doğrudan sedasyon/EEG etkisi yoktur); ancak KBB dışındaki Area Postrema (CTZ) D₂ reseptörlerini uyararak bulantı ve kusma oluşturur.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Nöronal Depo Tükenmesi (Taşiflaksi), Asidoz Direnci & Tavan Etkisi',
          summary:
            'Dopaminin inotropik etkisinin ~%50’sinin presinaptik veziküler noradrenalin salınımına dayanması, uzun süreli infüzyonlarda ve ileri kalp yetmezliğinde reseptör/nörotransmitter kinetiğini belirleyen en kritik faktördür.',
          points: [
            'Presinaptik Veziküler Noradrenalin Tükenmesi & Taşiflaksi: Uzamış şok (>24–48 saat) veya kronik dekompanse kalp yetmezliğinde miyokardiyal sempatik sinir terminallerindeki endojen noradrenalin vezikülleri boşalır; ayrıca β₁ reseptörlerinde GRK (G-proteini kenetli reseptör kinaz) fosforilasyonu ve β-arrestin aracılı internalizasyon (down-regülasyon) gelişir. Sonuçta dopaminin inotropik yanıtı hızla körelirken (taşiflaksi), doğrudan postsinaptik etkili Noradrenalin veya Dobutamin etkinliğini korur.',
            '20 mcg/kg/dk Farmakodinamik Tavan Eşiği: >20 mcg/kg/dk üzerinde β₁ reseptörleri doygunluğa ulaşır ve ek kardiyak debi kazancı sağlanamaz; buna karşılık α₁ vazokonstriksiyon ve hücre içi Ca²⁺ yüklenmesi katlanarak malign aritmi ve doku iskemisi üretir (bu eşikte doz artırılmaz, Noradrenaline geçilir).',
            'Metabolik Asidoz (pH < 7,15) & Hipoksi Etkisi: Ekstraselüler H⁺ iyon artışı GPCR ekstraselüler bağlanma oyuğunun konformasyonunu bozarak katekolamin-reseptör afinitesini düşürür, hücre içi Ca²⁺-Troponin-C bağlanmasını zayıflatır ve miyokardın fibrilasyon eşiğini azaltır.',
          ],
        }}
        clinicalPearls={[
          'Neden "Böbrek Koruyucu Doz" (1–3 mcg/kg/dk) Çürütüldü? Proksimal tübülde D₁ aracılı natriürez idrar hacmini artırsa da Henle kulpu kalın çıkan koluna (mTAL) binen Na⁺ yükü medüller O₂ tüketimini artırır; ayrıca hipovolemik/septik hastada taşiaritmi, hipoksik solunum dürtüsü baskılanması ve hipofizer hormon/immün süpresyon yaparak zarar verir (ANZICS Lancet 2000).',
          'Modern Klinikteki Tek Güçlü Nişi (Bradikardik Hipotansiyon): Atropine yanıtsız semptomatik bradikardi + hipotansiyon kombinasyonunda hem SA düğüm HCN4/β₁ kronotropisini hem de SV/MAP desteğini aynı anda sağladığı için transkutanöz/transvenöz pacemaker köprüsü olarak 5–20 mcg/kg/dk dozunda kullanılır (AHA/ACC/HRS 2018).',
          'Weaning (Kesilme) Hipotansiyonu Mekanizması: İnfüzyon aniden kapatıldığında dopaminin yarı ömrü ~2 dakika olduğundan ekzojen destek hızla biterken, boşalmış presinaptik noradrenalin depoları ve down-regüle reseptörler bazal vasküler tonusu sürdüremez → kademeli (her 15–30 dk’da 1–2 mcg/kg/dk) azaltılmalıdır.',
          'Ekstravazasyon Nekrozu & Fentolamin: Yüksek konsantrasyonlu dopamin (özellikle ≥1600–4000 mcg/mL) subkutan dokuya sızdığında lokal α₁→Gq→PLC→Ca²⁺ kaskadıyla şiddetli vaza vazorum spazmı ve koagülasyon nekrozu yapar; 12 saat içinde lokal Fentolamin (α-bloker) infiltrasyonu vazospazmı hücresel düzeyde çözer.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (#sec-kaynaklar)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Dopamin Hidroklorür"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'MAO İnhibitörleri (Moklobemid, Selegilin, Linezolid, Metilen Mavisi)',
            mechanism: 'Dopaminin Primer Yıkım Enzimi Olan MAO’nun İnhibisyonu',
            clinicalEffect:
              'Dopamin MAO ile yıkıldığından metabolizması bloke olur; pressör ve kronotropik etkisi 6–10 kat uzar (~1 saat) ve şiddetlenir, ölümcül hipertansif kriz ve malign aritmi gelişir.',
            management:
              'Alternatif ajan tercih edin; son 14–21 gün içinde MAO-İ alan hastada dopamin zorunluysa başlangıç dozunu normalin 1/10’una (%10; ör. 0,5 mcg/kg/dk) düşürün!',
          },
          {
            severity: 'X',
            agent: 'Sodyum Bikarbonat (%8,4 NaHCO₃) ve Alkali Çözeltiler',
            mechanism: 'Fizikokimyasal Alkali Oksidasyon / İnaktivasyon',
            clinicalEffect:
              'Y-site veya aynı torbada temas halinde dopamin alkali pH’da hızla oksitlenip (pembe/kahverengi renk) tamamen inaktive olur; ani hemodinamik çöküş.',
            management:
              'Kesinlikle aynı damar yolu lümeninden veya Y-site üzerinden vermeyin; ayrı venöz lümen kullanın.',
          },
          {
            severity: 'D',
            agent: 'Halojenli Volatil Anestezikler (Halotan, İzofluran, Sevofluran, Desfluran)',
            mechanism: 'Miyokardın Ekzojen Katekolaminlere Duyarlılaşması',
            clinicalEffect:
              'Ventriküler prematüre atımlar, ventriküler taşikardi (VT) ve ventriküler fibrilasyon (VF) riskini belirgin artırır.',
            management:
              'İntraoperatif sürekli EKG izlemi yapın; hipoksi ve hiperkapniyi önleyin, aritmi gelişirse dozu azaltın veya Noradrenalin/Fenilefrine geçin.',
          },
          {
            severity: 'D',
            agent: 'Fenitoin (IV)',
            mechanism: 'Sinerjik Miyokardiyal Depresyon & Otonomik Etkileşim',
            clinicalEffect:
              'Dopamin infüzyonu alan kritik hastalarda IV fenitoin uygulanması paradoksal ağır hipotansiyon, derin bradikardi ve kardiyak arrest tetikleyebilir.',
            management:
              'Dopamin alan hastada IV fenitoinden kaçının (alternatif antiepileptik: Levetirasetam veya Valproat); zorunluysa çok yavaş infüze edin ve arter basıncını yakın izleyin.',
          },
          {
            severity: 'C',
            agent: 'Trisiklik Antidepresanlar (TSA) & Kokain',
            mechanism: 'Presinaptik Katekolamin Geri Alımının (Uptake-1 / NET) İnhibisyonu',
            clinicalEffect:
              'Dopaminin indirekt nöronal etkisini değiştirirken dolaşımdaki noradrenalin yanıtını potansiyalize ederek hipertansiyon ve aritmi riskini artırır.',
            management:
              'Düşük dozla başlayın ve yakın EKG/invaziv arter basıncı monitörizasyonu altında titre edin.',
          },
          {
            severity: 'C',
            agent: 'Beta-Blokerler (Propranolol, Metoprolol)',
            mechanism: 'Kardiyak β₁-Adrenerjik Reseptör Antagonizması',
            clinicalEffect:
              'Dopaminin β₁ inotropik ve kronotropik etkisini antagonize ederek yüksek dozlarda karşılıksız (unopposed) α₁ vazokonstriksiyon ve SVR artışı bırakır.',
            management:
              'β-bloker toksisitesine bağlı bradikardide yüksek doz gerekebilir; eşzamanlı Glukagon ve pacemaker hazırlığı yapın.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.)',
            title: "Miller's Anesthesia, 10th Edition — Chapter: Autonomic Nervous System Physiology and Pharmacology / Vasopressors and Inotropes.",
            journal: 'Elsevier',
            year: 2025,
            note: 'Dopaminin doz-bağımlı D1/D2, β1 ve α1 reseptör farmakodinamisi, %50 indirekt noradrenalin salınımı ve perioperatif kullanımı.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD (Eds.)',
            title: "Stoelting's Pharmacology & Physiology in Anesthetic Practice, 6th Edition — Chapter: Sympathomimetics (Dopamine).",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'Dopamin farmakokinetiği (t½ ~2 dk, MAO/COMT yıkımı, %25 endojen NE dönüşümü), karotid cisimcik ve ön hipofiz D2 etkileri.',
          },
          {
            authors: 'De Backer D, Biston P, Devriendt J, et al. (SOAP II Investigators)',
            title: 'Comparison of dopamine and norepinephrine in the treatment of shock.',
            journal: 'N Engl J Med',
            year: 2010,
            pmid: '20200382',
            doi: '10.1056/NEJMoa0907118',
            note: 'n=1679 RCT: Dopamin grubunda 2 kat yüksek aritmi (%24,1 vs %12,4; p<0,001) ve kardiyojenik şok alt grubunda artmış 28 günlük mortalite (p=0,03).',
          },
          {
            authors: 'Bellomo R, Chapman M, Finfer S, Hickling K, Myburgh J (ANZICS Clinical Trials Group)',
            title: 'Low-dose dopamine in patients with early renal dysfunction: a placebo-controlled randomised trial.',
            journal: 'Lancet',
            year: 2000,
            pmid: '11191541',
            doi: '10.1016/s0140-6736(00)03495-4',
            note: 'n=328 RCT: 2 mcg/kg/dk düşük doz ("renal doz") dopaminin pik kreatinin, RRT ihtiyacı veya sağkalım üzerine hiçbir faydası olmadığını kanıtlayan temel çalışma.',
          },
          {
            authors: 'Evans L, Rhodes A, Alhazzani W, et al.',
            title: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021.',
            journal: 'Intensive Care Med',
            year: 2021,
            pmid: '34599691',
            doi: '10.1007/s00134-021-06506-y',
            note: 'Septik şokta Noradrenalinin 1. tercih olduğu, dopaminin yalnızca bradikardik/düşük aritmi riskli seçilmiş hastalarda alternatif olduğu ve renal doz dopaminin önerilmediği kılavuz.',
          },
          {
            authors: 'Kusumoto FM, Schoenfeld MH, Barrett C, et al.',
            title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay.',
            journal: 'Circulation',
            year: 2019,
            pmid: '30586772',
            doi: '10.1161/CIR.0000000000000628',
            note: 'Atropine yanıtsız semptomatik bradikardide 2. basamak farmakolojik tedavi olarak 5–20 mcg/kg/dk IV dopamin infüzyonu önerisi.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/dopamine.html"
        medscapeUrl="https://reference.medscape.com/drug/intropin-dopamine-342435"
      />
    </div>
  );
};
