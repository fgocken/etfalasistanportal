import React, { useState, useId } from 'react';
import {
  Activity,
  HeartPulse,
  AlertTriangle,
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
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART1 } from '../../data/organImpairment/standaloneOrganPart1';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

export const DobutamineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);

  // Çözelti Hazırlama Modu (1 Flakon/Ampul = 250 mg / 20 mL = 12,5 mg/mL)
  // bag_250_1vial: 1 Flakon (250 mg / 20 mL) + 230 mL = 250 mL -> 1000 mcg/mL (1 mg/mL)
  // bag_500_1vial: 1 Flakon (250 mg / 20 mL) + 480 mL = 500 mL -> 500 mcg/mL (0.5 mg/mL)
  // bag_250_2vial: 2 Flakon (500 mg / 40 mL) + 210 mL = 250 mL -> 2000 mcg/mL (2 mg/mL)
  // syringe_50_1vial: 1 Flakon (250 mg / 20 mL) + 30 mL = 50 mL -> 5000 mcg/mL (5 mg/mL)
  // custom_conc: Özel Konsantrasyon (mcg/mL)
  const [prepType, setPrepType] = useState<
    'bag_250_1vial' | 'bag_500_1vial' | 'bag_250_2vial' | 'syringe_50_1vial' | 'custom_conc'
  >('bag_250_1vial');
  const [customConcInput, setCustomConcInput] = useState<number>(1000); // mcg/mL

  // Doz (mcg/kg/dk)
  const [doseMcgKgMin, setDoseMcgKgMin] = useState<number>(5.0);

  // Akordiyon State'i
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik Kimlikleri
  const weightInputId = useId();
  const prepSelectId = useId();
  const doseSliderId = useId();
  const doseInputId = useId();
  const customConcInputId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'bag_250_1vial':
        return 1000.0; // 250 mg / 250 mL
      case 'bag_500_1vial':
        return 500.0; // 250 mg / 500 mL
      case 'bag_250_2vial':
        return 2000.0; // 500 mg / 250 mL
      case 'syringe_50_1vial':
        return 5000.0; // 250 mg / 50 mL
      case 'custom_conc':
        return customConcInput > 0 ? customConcInput : 1000.0;
      default:
        return 1000.0;
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
  // 24 saatlik flakon ihtiyacı (1 flakon = 250 mg)
  const dailyVialsNeeded = dailyTotalMg / 250;

  // Aktif Hemodinamik Faz Göstergesi
  const activePhase: 'low' | 'optimal' | 'high' | 'stress_echo' = (() => {
    if (doseMcgKgMin < 5.0) return 'low';
    if (doseMcgKgMin <= 10.0) return 'optimal';
    if (doseMcgKgMin <= 20.0) return 'high';
    return 'stress_echo';
  })();

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v5.0)                                   */}
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
        tallManName="DOBUTamin"
        confusionRiskWith="DOPamin (Dopamin — LASA: en sık ölümcül karışan inotrop!) · Noradrenalin · Milrinon"
        criticalAlerts={[
          'LASA (DOBUTamin vs DOPamin) & Asla Direkt IV Push/Bolus VERİLMEZ: DOBUTamin (250 mg / 20 mL = 12,5 mg/mL) ile DOPamin (200 mg / 5 mL = 40 mg/mL) flakon/ampulleri ve infüzyon torbaları en sık karışan yüksek riskli ilaç çiftidir! TR flakon/ampul konsantre olduğundan ASLA sulandırılmadan veya direkt IV push/bolus olarak uygulanmaz; daima sulandırılarak akıllı infüzyon pompasıyla verilir.',
          'İnodilatör Paradoksu (MAP Düşüşü Riski!): Dobutamin bir vazopresör DEĞİLDİR — β₁ inotropiye ek olarak vasküler β₂ vazodilatasyon yaptığı için sistemik vasküler direnci (SVR) düşürür! Derin hipotansiyonlu (SBP < 80–90 mmHg veya MAP < 65 mmHg) septik/kardiyojenik şokta tek başına başlanırsa kan basıncını daha da çökertir; mutlaka Noradrenalin ile birlikte (MAP ≥ 65 mmHg sağlandıktan sonra) kullanılmalıdır (SSC 2021 / ESC 2021).',
          'Dinamik Sol Ventrikül Çıkış Yolu Obstrüksiyonu (LVOTO / İdiyopatik Hipertrofik Subaortik Stenoz - IHSS / Takotsubo): Kontraktilite artışı ve afterload (SVR) düşüşü LVOT gradyentini ve sistolik anterior hareketi (SAM) artırarak çıkış yolunu kapatır ve paradoksal ağır refrakter şok yapar — Mutlak Kontrendikedir!',
          'Atriyal Fibrilasyon (AF) Hızlı Ventrikül Yanıtı & Sülfit Alerjisi: Dobutamin AV düğüm iletimini (β₁) belirgin hızlandırır; hız kontrolü sağlanmamış AF/Flutter hastasında tehlikeli hızlı ventrikül yanıtı ve VT tetikler (öncesinde digoksin veya amiodaron ile AV düğüm hız kontrolü gerekir). Ayrıca flakon/ampuller sodyum metabisülfit içerir (ağır astımlılarda bronkospazm/anafilaktoid reaksiyon riski).',
        ]}
        antidoteOrRescue="Taşiaritmi / Miyokard İskemisi / Hipotansiyon: İnfüzyonu azaltın veya durdurun (t½ ~2 dakika olduğundan etkisi 5–10 dk içinde sonlanır); dirençli taşiaritmide kısa etkili β₁-bloker (Esmolol 500 mcg/kg bolus). Vazodilatasyona bağlı hipotansiyonda (β₂ etkisi) hipovolemiyi dışlayın ve Noradrenalin ile kombine edin. Ekstravazasyonda: İnfüzyonu durdurup aspire edin, Fentolamin 5–10 mg / 10–15 mL SF SC infiltre edin."
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
                Sentetik Katekolamin · İnodilatör (β₁ &gt;&gt; β₂ &gt; α₁)
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                TR Flakon/Ampul: 250 mg / 20 mL = 12,5 mg/mL
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Standart Doz: 2 – 20 mcg/kg/dk (Stres Eko: 5–40)
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: C01CA07</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Dobutamin Hidroklorür (Dobutasel® / Dobuthaver® / Konsantre Dobutamin®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong>{' '}
              Sentetik, doğrudan etkili rasemik sempatomimetik katekolamin; iki enantiyomerin vasküler{' '}
              <strong>α₁-agonizma ve α₁-antagonizmasının</strong> birbirini dengelemesi sonucunda klinik olarak güçlü{' '}
              <strong>β₁-adrenerjik pozitif inotropi</strong> ve hafif{' '}
              <strong>β₂-adrenerjik arteriyoler vazodilatasyon (inodilatör etki)</strong> üreten, ventrikül dolum
              basınçlarını (PCWP) ve sistemik vasküler direnci (SVR) düşürerek kardiyak debiyi (CO) artıran birincil
              parenteral inotropik ajandır.
            </p>
          </div>

          <div className="shrink-0">
            <MonographCopyButton
              isDark={isDark}
              label="Monografi Özeti Kopyala"
              getText={() =>
                [
                  `DOBUTAMİN HİDROKLORÜR (250 mg / 20 mL Flakon/Ampul = 12,5 mg/mL) KLİNİK ÖZETİ`,
                  `• Reseptör Profili: Rasemik İnodilatör (β1 >> β2 > α1 [nötralize]) -> CO↑, SV↑, PCWP↓, SVR↓`,
                  `• Aktif Hesaplama (${weightKg} kg, ${concentrationMcgMl} mcg/mL): ${doseMcgKgMin.toFixed(1)} mcg/kg/dk = ${doseMcgMin.toFixed(0)} mcg/dk -> Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat`,
                  `• Kritik Uyarı (İnodilatör Paradoksu): Vazopresör DEĞİLDİR! Hipotansif şokta (MAP < 65 veya SBP < 85–90 mmHg) tek başına başlanırsa β2 vazodilatasyonla kan basıncını düşürür; Noradrenalin ile kombine edilmelidir.`,
                  `• Mutlak Kontrendikasyon: İdiyopatik Hipertrofik Subaortik Stenoz (IHSS / HOCM) ve dinamik LVOT obstrüksiyonu (Takotsubo LVOTO).`,
                ].join('\n')
              }
            />
          </div>
        </div>

        {/* Yatak Başı Klinik Etki Mekanizması & Rasemik İnodilatör Profil (#sec-etki) */}
        <div id="sec-etki" className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-200' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <span className="flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 shrink-0" />
                <span>Güçlü β₁ Pozitif İnotropi</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15">β₁ : β₂ ≈ 3 : 1</span>
            </div>
            <p className="text-xs leading-relaxed">
              Miyokardiyal β₁ reseptörlerini doğrudan uyararak atım hacmini (SV↑) ve Kardiyak Debiyi (CO↑) artırır;
              dopamine kıyasla eşit inotropik dozda daha az sinüs taşikardisi yapar ve etkisi endojen noradrenalin
              depolarına bağımlı değildir.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 shrink-0" />
                <span>β₂ Vazodilatasyon (İnodilatör)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15">PCWP↓ · SVR↓</span>
            </div>
            <p className="text-xs leading-relaxed">
              Periferik β₂ uyarımı ve artan CO&apos;ya sekonder baroreseptör sempatik deşarj azalmasıyla afterload (SVR↓)
              ve sol ventrikül dolum basıncını (LVEDP/PCWP↓) düşürür. <strong>Dikkat:</strong> Hipovolemik veya
              vazoplejik hastada MAP&apos;ı düşürebilir!
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 shrink-0" />
                <span>Rasemik (±) α₁ Nötralizasyonu</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/15">(-) α₁+ vs (+) α₁−</span>
            </div>
            <p className="text-xs leading-relaxed">
              Klinik preparat 50:50 rasemik karışımdır: <strong>(−)-izomerin</strong> vasküler α₁ vazokonstriktör etkisi,{' '}
              <strong>(+)-izomerin</strong> güçlü α₁ antagonist ve β₁/β₂ agonist etkisiyle dengelenir; böylece net
              vazokonstriksiyon oluşmaz.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK ÖZELLİKLER AKORDİYONU (#sec-pkpd, pkOpen=false)    */}
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  t½: ~2 dk · COMT Metabolizması (MAO’dan Bağımsız)
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                1–2 dakikada hızlı başlangıç, ~10 dakikada kararlı durum, COMT ve glukuronidasyon ile hızlı hepatik/doku klirensi.
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
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">IV infüzyon başlangıcı sonrası</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Pik Etki (Peak)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  ~10 Dakika
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
                <span className="text-[10px] text-slate-400">Vd: ~0,2 L/kg (ECF kompartmanı)</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Süresi (Duration)
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  &lt; 10 Dakika
                </span>
                <span className="text-[10px] text-slate-400">İnfüzyon kesildikten hemen sonra</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Metabolizma (COMT &amp; Glukuronid Konjugasyonu — MAO İle Yıkılmaz!):
                </strong>{' '}
                Karaciğer ve periferik dokularda <strong>Katekol-O-Metiltransferaz (COMT)</strong> enzimi ile hızla
                farmakolojik olarak inaktif <strong>3-O-metildobutamine</strong> metillenir ve glukuronid
                konjugasyonuyla idrar (~%67) ve safra/feçes (~%33) yoluyla atılır.{' '}
                <strong>
                  Önemli Klinik Fark: Dopaminin aksine Monoamin Oksidaz (MAO) enzimi substratı DEĞİLDİR ve presinaptik
                  endojen noradrenalin salınımına bağımlı değildir (doğrudan postsinaptik reseptör agonistidir!).
                </strong>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Dağılım, Klirens &amp; Milrinona Göre Farmakokinetik Üstünlüğü:
                </strong>{' '}
                Dağılım hacmi (Vd ~0,2 L/kg) ekstraselüler sıvı kompartmanıyla sınırlıdır ve sağlam kan-beyin bariyerini
                geçmez. Plazma klirensi (~2,4 L/dk/m²) kardiyak debi ile doğrusal ilişkilidir. Yarı ömrünün{' '}
                <strong>~2 dakika</strong> olması (Milrinon t½ ~2,3 saat ve renal atılımlı!), akut böbrek yetmezliği olan
                kardiyojenik şok hastalarında birikmeme ve hipotansiyon/aritmi geliştiğinde dakikalar içinde geri
                döndürülebilme avantajı sağlar (DOREMI 2021).
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
          'İdiyopatik Hipertrofik Subaortik Stenoz (IHSS / Obstrüktif Hipertrofik Kardiyomiyopati - HOCM): Pozitif inotropi ve β₂ vazodilatasyonla azalan sol ventrikül hacmi dinamik çıkış yolu gradyentini kapatarak kardiyovasküler kollaps yapar.',
          'Dinamik Sol Ventrikül Çıkış Yolu Obstrüksiyonu (LVOTO): Bazal hiperkontraktilitenin eşlik ettiği Takotsubo kardiyomiyopatisi (%15–25 olguda LVOTO vardır!) veya mitral kapak sistolik anterior hareketi (SAM).',
          'Feokromositoma: Aşırı katekolamin duyarlılığı nedeniyle ölümcül hipertansif kriz ve malign ventriküler aritmi riski.',
          'Dobutamin hidroklorüre veya flakon/ampuldeki sodyum metabisülfit yardımcı maddesine bilinen aşırı duyarlılık.',
          'Düzeltilmemiş hemodinamik olarak instabil ventriküler taşiaritmiler (VT) veya Ventriküler Fibrilasyon (VF).',
        ]}
        relativeTitle="Göreceli Kontrendikasyonlar & Kaçınılması Gereken Durumlar"
        relativeItems={[
          'Düzeltilmemiş ağır hipovolemi: İnotrop başlamadan önce mutlaka yeterli intravasküler volüm replasmanı sağlanmalıdır; hipovolemik hastada dobutaminin β₂ vazodilatasyonu ağır hipotansiyon ve refleks taşikardi tetikler.',
          'Vazopresörsüz derin hipotansiyon (SBP < 80–90 mmHg veya MAP < 65 mmHg): Dobutamin SVR’yi düşürdüğünden tek başına başlanmamalı; önce veya eşzamanlı Noradrenalin ile perfüzyon basıncı desteklenmelidir.',
          'Hızlı ventrikül yanıtlı Atriyal Fibrilasyon veya Atriyal Flutter: AV düğüm iletimini (β₁) kolaylaştırarak tehlikeli ventriküler hızlara yol açar; öncesinde Digoksin veya Amiodaron ile hız kontrolü sağlanmalıdır.',
          'Akut ST yükselmeli miyokard enfarktüsü / aktif koroner iskemi: Kontraktilite ve kalp hızı artışıyla miyokard oksijen tüketimini (MVO₂) yükselterek enfarkt alanını genişletebilir.',
          'Kronik yüksek doz β-bloker kullanımı (özellikle Karvedilol): Kompetitif β₁ reseptör blokajı nedeniyle dobutaminin inotropik yanıtı körelir; bu hastalarda PDE3 inhibitörü (Milrinon) veya Ca²⁺ duyarlılaştırıcı (Levosimendan) tercih edilmelidir (ESC 2021).',
          'Ağır sabit Aort Stenozu veya Ciddi Pulmoner Hipertansiyon: Sabit kapak darlığında SVR düşüşü koroner perfüzyon basıncını bozabilir.',
        ]}
        clinicalNote="Kardiyojenik şokta dobutamin başlamadan önce yatak başı ekokardiyografi (POCUS) ile dinamik LVOT obstrüksiyonu (LVOTO / SAM) ve hipovolemi mutlaka dışlanmalıdır!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ENDİKASYONLAR & KLİNİK KANIT (#sec-endikasyon)                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-endikasyon"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Endikasyonlar &amp; Klinik Kanıt (ESC 2021 · SSC 2021 · DOREMI · CATS)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Kardiyojenik Şok & Akut Dekompanse Kalp Yetmezliği */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-amber-500 shrink-0" />
                <span>1. Kardiyojenik Şok &amp; Akut Dekompanse Kalp Yetmezliği (Düşük Debi)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                ESC 2021 · Sınıf IIb
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sol veya sağ ventrikül sistolik disfonksiyonuna bağlı düşük kardiyak debi (
              <strong className="font-mono">CI &lt; 2,2 L/dk/m²</strong>), yüksek dolum basıncı (PCWP &gt; 18 mmHg) ve
              organ hipoperfüzyonunda (&quot;soğuk ve ıslak&quot; profil){' '}
              <strong className="font-mono text-slate-900 dark:text-white">2–20 mcg/kg/dk</strong> IV infüzyon olarak
              başlanır. Hipotansiyon (SBP &lt; 90 mmHg) eşlik ediyorsa mutlaka <strong>Noradrenalin</strong> ile kombine
              edilir.
            </p>
          </div>

          {/* 2. Septik Şokta Miyokardiyal Disfonksiyon */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500 shrink-0" />
                <span>2. Septik Şokta Miyokardiyal Disfonksiyon (Septik Kardiyomiyopati)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                SSC 2021 · Öneri
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yeterli sıvı resüsitasyonu ve Noradrenalin ile <strong className="font-mono">MAP ≥ 65 mmHg</strong>{' '}
              sağlanmasına rağmen devam eden organ hipoperfüzyonu, düşük kardiyak debi, yüksek dolum basınçları,{' '}
              <strong className="font-mono">ScvO₂ &lt; %70</strong> veya persistan hiperlaktatemi varlığında{' '}
              <strong>Noradrenaline ek olarak</strong>{' '}
              <strong className="font-mono text-slate-900 dark:text-white">2,5–15 mcg/kg/dk</strong> (veya tek başına
              Adrenalin) uygulanır.
            </p>
          </div>

          {/* 3. Kardiyak Cerrahi Sonrası Düşük Debi Sendromu (LCOS) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                <span>3. Kardiyak Cerrahi Sonrası Düşük Debi (LCOS) &amp; KPB Weaning</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                2–10 mcg/kg/dk
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Kardiyopulmoner bypasstan (KPB) ayrılma sırasında iskemik-reperfüzyon hasarına bağlı miyokardiyal stunning
              ve düşük kalp debisi sendromunda (LCOS) PVR ve SVR&apos;yi artırmadan atım hacmini yükseltmek amacıyla{' '}
              <strong className="font-mono text-slate-900 dark:text-white">2–10 mcg/kg/dk</strong> dozunda kullanılır.
            </p>
          </div>

          {/* 4. Farmakolojik Dobutamin Stres Ekokardiyografisi (DSE) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>4. Farmakolojik Dobutamin Stres Ekokardiyografisi (DSE)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                5 → 40 mcg/kg/dk
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Egzersiz yapamayan hastalarda koroner arter hastalığı iskemisi, düşük akımlı düşük gradyentli aort stenozu
              kontraktil rezervi ve miyokard canlılığı (viability: 5–10 mcg/kg/dk) değerlendirmesinde{' '}
              <strong className="font-mono text-slate-900 dark:text-white">5 → 10 → 20 → 30 → 40 mcg/kg/dk</strong>{' '}
              (3&apos;er dakikalık basamaklarla; hedef kalp hızına ulaşılamazsa Atropin 0,25–0,5 mg IV eklenir).
            </p>
          </div>
        </div>

        {/* Klinik Kanıt Kutuları: DOREMI & CATS */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-100' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                <span>DOREMI Trial (Mathew et al., NEJM 2021, n=192)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200">
                PMID: 34347952
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              SCAI Evre B–E kardiyojenik şok hastalarında <strong>Milrinon vs Dobutamin</strong> çift-kör randomize
              karşılaştırılmıştır: Birincil bileşik sonlanım (%49 vs %54; RR 0,90; p=0,47), hastane içi mortalite (%37 vs
              %43), resüsite kardiyak arrest, RRT ihtiyacı veya taşiaritmi açısından{' '}
              <strong>iki ajan arasında anlamlı fark saptanmamıştır</strong>. Dobutamin kısa yarı ömrü (~2 dk vs 2,3
              saat) sayesinde hızlı titrasyon ve akut böbrek hasarında (ABH) birikmeme avantajına sahiptir.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-100' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>CATS Trial (Annane et al., Lancet 2007, n=330) &amp; SSC 2021</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-800 dark:text-teal-200">
                PMID: 17720019
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Septik şokta <strong>Noradrenalin + Dobutamin</strong> kombinasyonu ile tek başına{' '}
              <strong>Adrenalin</strong> karşılaştırılmış; 28 günlük mortalite (%34 vs %40; p=0,31) ve ciddi aritmi oranı
              benzer bulunurken, Noradrenalin + Dobutamin kolunda erken dönemde laktat yüksekliği ve metabolik asidoz
              daha az görülmüştür. <strong>SSC 2021</strong>, yeterli volüm ve MAP ≥ 65 mmHg&apos;ya rağmen miyokardiyal
              disfonksiyonla giden persistan hipoperfüzyonda Noradrenaline Dobutamin eklenmesini önerir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. DOZAJ KADEMELERİ & TİTRASYON ALGORİTMASI (#sec-dozaj)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozaj"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Dozaj Kademeleri &amp; Hemodinamik Titrasyon Algoritması
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">β₁ İnotropi + β₂ Vazodilatasyon Spektrumu</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: 2–5 mcg/kg/dk */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'low'
                ? 'border-teal-500 bg-teal-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  Düşük Doz Başlangıç
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  Hafif İnotropi &amp; Viabilite
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                2 – 5 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Kardiyojenik/septik şokta güvenli başlangıç dozu (2,5 mcg/kg/dk); minimal taşikardi ile SV artışı ve
                ekokardiyografide hiberne miyokard canlılık (viability) yanıtı.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              ✓ 10–15 dk arayla klinik yanıta göre titre et
            </div>
          </div>

          {/* Kademe 2: 5–10 mcg/kg/dk */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'optimal'
                ? 'border-amber-500 bg-amber-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Standart Terapötik İnodilatör
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  CO↑ · PCWP↓ · SVR↓
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                5 – 10 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Optimal inodilatör pencere; kontraktilite ve atım hacmi belirgin artarken PCWP ve SVR düşer, kalp hızı
                artışı genellikle ılımlıdır (&lt;10–15 atım/dk).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              ✓ YBÜ hedef idame aralığı (ScvO₂ ≥ %70, Laktat↓)
            </div>
          </div>

          {/* Kademe 3: 10–20 mcg/kg/dk */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'high'
                ? 'border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/40'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Yüksek Doz İnotrop
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  Taşiaritmi &amp; MVO₂↑
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-rose-700 dark:text-rose-300 mt-1">
                10 – 20 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Maksimum terapötik şok dozu; sinüs taşikardisi (&gt;30 atım/dk artış), hızlı AF, ventriküler ektopi ve
                miyokardiyal oksijen tüketimi (MVO₂) hızla yükselir.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-700 dark:text-rose-300 font-bold">
              ⚠ Yakın EKG, K⁺ (&gt;4,0 mEq/L) &amp; İskemi Takibi
            </div>
          </div>

          {/* Kademe 4: 5–40 Stres Eko & >20 Tavan */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activePhase === 'stress_echo'
                ? 'border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-500/50'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Stres Eko / &gt;20 Tavan Eşiği
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  DSE: Maks 40
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                5 → 40 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                &gt;20 mcg/kg/dk dozlar rutin olarak yalnızca <strong>Dobutamin Stres Ekokardiyografisinde (DSE)</strong>{' '}
                kullanılır; şok tedavisinde &gt;20 üzerinde aritmi/iskemi riski çok yüksektir.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
              ⛔ Şokta &gt;20 aşma — MCS / Ek İnotrop Düşün!
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF DOZ & İNFÜZYON HESAPLAYICISI (#sec-hesaplayici)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif Dobutamin Doz &amp; İnfüzyon Pompası Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                TR 250 mg / 20 mL flakon/ampul sulandırma şemaları, obezite IBW/AdjBW ölçekleyici ve canlı hemodinamik faz göstergesi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MonographCopyButton
              isDark={isDark}
              getText={() =>
                [
                  `DOBUTAMİN İNFÜZYON POMPASI ÖZETİ`,
                  `Hasta Ağırlığı: ${weightKg} kg`,
                  `Çözelti Konsantrasyonu: ${concentrationMcgMl} mcg/mL (${(concentrationMcgMl / 1000).toFixed(1)} mg/mL)`,
                  `Hedef Doz: ${doseMcgKgMin.toFixed(1)} mcg/kg/dk`,
                  `Dakikalık / Saatlik Doz: ${doseMcgMin.toFixed(0)} mcg/dk (${hourlyDoseMg.toFixed(2)} mg/saat)`,
                  `İnfüzyon Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat (${infusionRateMlMin.toFixed(3)} mL/dk)`,
                  `24 Saatlik Tüketim: ${dailyTotalMg.toFixed(0)} mg/gün (~${dailyVialsNeeded.toFixed(1)} adet 250 mg flakon)`,
                ].join('\n')
              }
            />
            <button
              type="button"
              onClick={() => {
                setWeightKg(70);
                setPrepType('bag_250_1vial');
                setCustomConcInput(1000);
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
              drugName="Dobutamin"
              recommendedScalar="IBW"
              secondaryScalar={{ type: 'AdjBW', context: 'Alternatif' }}
              rationale="Obezitede (BMI ≥ 30) dobutaminin dağılım hacmi (Vd ~0,2 L/kg) ekstraselüler sıvı ve yağsız dokuyla sınırlı olduğundan, gerçek vücut ağırlığı (TBW) üzerinden doz hesaplanması aşırı taşiaritmi, MVO₂ artışı ve hipotansiyona yol açar. Başlangıç dozu İdeal Vücut Ağırlığı (IBW) üzerinden hesaplanmalı, ardından hemodinamik yanıta (CO, ScvO₂, HR) göre titre edilmelidir."
              currentWeightKg={weightKg}
              onApplyWeight={(w) => setWeightKg(Math.min(150, Math.max(5, w)))}
            />

            {/* 2. TR Preparat & Sulandırma Seçici */}
            <div>
              <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                TR Preparat &amp; Sulandırma Şeması (1 Flakon/Ampul = 250 mg / 20 mL):
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
                <option value="bag_250_1vial">
                  Standart YBÜ &amp; Acil Torba: 1 Flakon (250 mg / 20 mL) + 230 mL SF/%5 Dekstroz (250 mL) = 1000 mcg/mL (1 mg/mL)
                </option>
                <option value="bag_500_1vial">
                  Düşük Konsantrasyonlu Torba: 1 Flakon (250 mg / 20 mL) + 480 mL SF/%5 Dekstroz (500 mL) = 500 mcg/mL (0,5 mg/mL)
                </option>
                <option value="bag_250_2vial">
                  Konsantre YBÜ Torbası: 2 Flakon (500 mg / 40 mL) + 210 mL SF/%5 Dekstroz (250 mL) = 2000 mcg/mL (2 mg/mL)
                </option>
                <option value="syringe_50_1vial">
                  Sıvı Kısıtlı YBÜ Enjektör Pompası (Santral Kateter Önerilir!): 1 Flakon (250 mg / 20 mL) + 30 mL SF/%5 Dekstroz (50 mL) = 5000 mcg/mL (5 mg/mL)
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
                <span>1 Flakon/Ampul = 250 mg / 20 mL (12,5 mg/mL)</span>
              </div>
            </div>

            {/* 3. Doz Slider & Hızlı Preset Butonları */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1.5">
                <label htmlFor={doseSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                  Hedef İnfüzyon Dozu (1 – 20 mcg/kg/dk · DSE: 40):
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id={doseInputId}
                    type="number"
                    min="0.5"
                    max="40"
                    step="0.5"
                    value={doseMcgKgMin}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val) && val >= 0) {
                        setDoseMcgKgMin(Math.min(40, val));
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
                    dose: 2.5,
                    label: '2,5 mcg/kg/dk',
                    sub: 'Düşük Doz Başlangıç — Kardiyojenik / Septik Şok Güvenli Başlangıç',
                  },
                  {
                    dose: 5.0,
                    label: '5,0 mcg/kg/dk',
                    sub: 'Standart İnodilatör Doz — CO↑, PCWP↓, SVR↓ (Optimal Pencere)',
                  },
                  {
                    dose: 10.0,
                    label: '10,0 mcg/kg/dk',
                    sub: 'Orta-Yüksek Terapötik Doz — Güçlü İnotropi & Lusitropi',
                  },
                  {
                    dose: 15.0,
                    label: '15,0 mcg/kg/dk',
                    sub: 'Yüksek Doz — Taşiaritmi, AF Hızlanması & MVO₂ Artışı İzlemi!',
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

          {/* Sağ Kolon: Canlı Pompa Sonuçları & Hemodinamik Faz Göstergesi (5 Kolon) */}
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
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Gereken Flakon (250 mg)</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                    ~{Math.ceil(dailyVialsNeeded)} Flakon / gün
                  </span>
                  <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">
                    (Net: {dailyVialsNeeded.toFixed(1)} flakon)
                  </span>
                </div>
              </div>
            </div>

            {/* AKTİF HEMODİNAMİK FAZ GÖSTERGESİ (Dinamik Kart) */}
            {activePhase === 'low' && (
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-teal-950/30 border-teal-500/40 text-teal-100' : 'bg-teal-50 border-teal-300 text-teal-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-300 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 shrink-0" />
                    <span>Aktif Faz: Hafif İnotropi &amp; Başlangıç (&lt;5 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-200">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  Kardiyomiyosit β₁ reseptörlerinin erken uyarımıyla kalp hızında minimal değişiklikle atım hacmi (SV)
                  artışı başlar. <strong>Hipotansiyon veya hipovolemi varsa β₂ vazodilatasyon MAP düşüşü yapabilir;</strong>{' '}
                  SBP &lt; 90 mmHg ise Noradrenalin ile birlikte uygulayın.
                </p>
              </div>
            )}

            {activePhase === 'optimal' && (
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-100' : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 shrink-0" />
                    <span>Aktif Faz: Optimal İnodilatör Pencere (5–10 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-200">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  <strong>Kardiyak debi (CO↑) ve atım hacmi (SV↑) artarken</strong>, vasküler β₂ gevşeme ve baroreseptör
                  refleksle <strong>PCWP↓ (sol ventrikül önyükü) ve SVR↓ (ardyükü) düşer</strong>. Kardiyojenik şok,
                  septik kardiyomiyopati ve KPB weaning&apos;de en dengeli inotropi/MVO₂ penceresidir.
                </p>
              </div>
            )}

            {activePhase === 'high' && (
              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-rose-950/30 border-rose-500/40 text-rose-100' : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 shrink-0" />
                    <span>Aktif Faz: Yüksek Doz İnotropi (10–20 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-200">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed">
                  <strong>Belirgin taşikardi, AV iletim hızlanması (AF&apos;de hızlı ventrikül yanıtı), ventriküler
                  aritmi, hipokalemi ve MVO₂ artışı riski!</strong> Koroner iskemisi olan hastalarda dikkatle izlenmeli;
                  20 mcg/kg/dk üzerinde şok yanıtı yoksa mekanik dolaşım desteği (VA-ECMO / Impella) veya ikinci ajan
                  değerlendirilmelidir.
                </p>
              </div>
            )}

            {activePhase === 'stress_echo' && (
              <div
                className={`p-4 rounded-2xl border ring-2 ring-indigo-500/50 ${
                  isDark ? 'bg-indigo-950/60 border-indigo-500 text-indigo-100' : 'bg-indigo-100 border-indigo-500 text-indigo-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-200 flex items-center gap-1.5">
                    <AlertOctagon className="w-4 h-4 shrink-0" />
                    <span>Stres Eko (DSE) / Şok Maksimum Eşik Aşımı (&gt;20 mcg/kg/dk)</span>
                  </span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">
                    {doseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  <strong>&gt;20 mcg/kg/dk (20–40 mcg/kg/dk) doz aralığı yalnızca Dobutamin Stres Ekokardiyografisi
                  (DSE) protokolü içindir!</strong> YBÜ şok tedavisinde 20 mcg/kg/dk üzerine çıkılması ek CO kazancı
                  sağlamadan ağır miyokard iskemisi ve malign taşiaritmi üretir.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. TÜRKİYE PREPARAT & SULANDIRMA REHBERİ (#sec-tr-preparat)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Dobutasel® / Dobuthaver® / Konsantre Dobutamin® / Dobutamine DBL® 250 mg / 20 mL Flakon & Ampul',
            presentation: '20 mL berrak, renksiz veya çok açık sarı steril konsantre IV infüzyon çözeltisi içeren flakon/ampul',
            concentration: '12,5 mg/mL (= 12.500 mcg/mL)',
            saltOrBaseNote:
              'Her 20 mL flakon/ampul 250 mg baz dobutamine eşdeğer 280,2 mg Dobutamin Hidroklorür (1 mL = 12,5 mg = 12.500 mcg) ve antioksidan koruyucu olarak Sodyum Metabisülfit içerir. ASLA sulandırılmadan doğrudan IV verilmez!',
            alertLevel: 'high',
          },
          {
            name: 'Sulandırılmış YBÜ / Acil Servis İnfüzyon Çözeltileri (%5 Dekstroz veya %0,9 NaCl) — Pembe Renk Değişimi Notu',
            presentation: '250–500 mL infüzyon torbası veya 50 mL enjektör pompası',
            concentration: '500 · 1000 · 2000 · 5000 mcg/mL',
            saltOrBaseNote:
              'Pembe Renk Değişimi Notu: Sulandırılmış dobutamin çözeltisi zamanla hafif PEMBE renk alabilir; bu durum ilacın çok hafif oksidasyonuna bağlıdır ancak 24 saat içinde önemli bir potens kaybı YOKTUR (kullanılabilir). Buna karşın koyu kahverengi renk değişimi veya çökelti varsa kesinlikle kullanılmaz!',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          '250 mL’de 1 Flakon (1000 mcg/mL = 1 mg/mL): 1 Flakon (250 mg / 20 mL) + 230 mL SF veya %5 Dekstroz = 250 mL toplam — Standart YBÜ & Acil Servis Torbası.',
          '500 mL’de 1 Flakon (500 mcg/mL = 0,5 mg/mL): 1 Flakon (250 mg / 20 mL) + 480 mL SF veya %5 Dekstroz = 500 mL toplam — Düşük Konsantrasyonlu Torba.',
          '250 mL’de 2 Flakon (2000 mcg/mL = 2 mg/mL): 2 Flakon (500 mg / 40 mL) + 210 mL SF veya %5 Dekstroz = 250 mL toplam — Konsantre YBÜ Torbası.',
          '50 mL Enjektörde 1 Flakon (5000 mcg/mL = 5 mg/mL): 1 Flakon (250 mg / 20 mL) + 30 mL SF veya %5 Dekstroz = 50 mL enjektör pompası — Sıvı Kısıtlı YBÜ (Santral Venöz Kateter Önerilir; maksimum önerilen konsantrasyon 5000 mcg/mL’dir).',
        ]}
        concentrationTrapWarning="DOBUTamin (250 mg / 20 mL = 12,5 mg/mL) ile DOPamin (200 mg / 5 mL = 40 mg/mL) flakon ve ampulleri isim/endikasyon benzerliği (LASA) nedeniyle sıklıkla karışır! Hazırlanan her torba ve enjektörün üzerine Tall-Man harflerle 'DOBUTamin — XXXX mcg/mL' etiketi yapıştırılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. DAMAR YOLU, Y-SITE UYUMLULUK & EKSTRAVAZASYON (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="central-preferred"
        accessSummary="Tercihen Santral Venöz Kateter (SVK) üzerinden infüze edilir. Dobutaminin α₁ vazokonstriktör etkisi nötralize olduğundan periferik ekstravazasyon riski Noradrenalin ve Dopamine göre daha düşüktür; geniş lümenli proksimal periferik venden ≤ 1000–2000 mcg/mL konsantrasyonda güvenle başlanabilir. Ancak yüksek konsantrasyonlu (5000 mcg/mL) enjektör pompası veya uzun süreli infüzyonlarda SVK tercih edilmelidir."
        phRange="2,5 – 5,5 (Asidik Çözelti)"
        osmolalityNote="Alkali çözeltilerle (pH > 7,0; özellikle %8,4 Sodyum Bikarbonat) temas ettiğinde katekolamin yapısı hızla parçalanır ve inaktive olur."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          '%5 Dekstroz + %0,9 NaCl',
          'Ringer Laktat (RL)',
        ]}
        stabilityNote="Sulandırılmış çözelti oda sıcaklığında 24 saat içinde kullanılmalıdır. 24 saat içinde oluşan hafif pembe renk değişimi çok hafif oksidasyonu gösterir ve potens kaybına yol açmaz; ancak koyu kahverengi renk veya presipitasyon varsa atılmalıdır."
        ySiteCompatible={[
          'SF (%0,9 NaCl)',
          '%5 Dekstroz',
          'Ringer Laktat',
          'Noradrenalin',
          'Dopamin',
          'Adrenalin',
          'Amiodaron',
          'Midazolam',
          'Fentanil',
          'Milrinon',
        ]}
        ySiteIncompatible={[
          'Sodyum Bikarbonat (%8,4 NaHCO₃) ve tüm alkali çözeltiler (kimyasal inaktivasyon!)',
          'Furosemid (anında bulanıklık ve beyaz çökelti oluşturur!)',
          'Heparin (bazı konsantrasyonlarda ve %5 Dekstroz içinde fiziksel uyumsuzluk / çökelti — ayrı lümen tercih edin!)',
          'Fenitoin (IV)',
          'Asiklovir',
          'Alteplaz (tPA)',
          'Seftriakson / Sefazolin',
        ]}
        extravasationProtocol="Ekstravazasyon Protokolü: Dobutamin saf vazokonstriktör olmasa da yüksek konsantrasyonda (5000 mcg/mL) ve asidik pH (2,5–5,5) nedeniyle lokal doku irritasyonu ve(-)-izomer α₁ aracılı vazospazm/nekroz yapabilir. (1) İnfüzyonu derhal durdurun. (2) Kanülü çekmeden önce 3–5 mL kan/sıvı aspire edin ve kanülü çıkarın. (3) Ekstremiteyi eleve edin ve kuru ılık kompres uygulayın. (4) Ciltte solukluk, soğukluk veya iskemi bulgusu varsa 12 saat içinde Fentolamin 5–10 mg / 10–15 mL SF içinde iskemik alana subkutan infiltre edin."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Karaciğer ve dokularda COMT ile hızla yıkılır (t½ ~2 dk); böbrek yetmezliğinde birikmez ve başlangıç doz ayarı gerekmez (Milrinona göre kritik avantaj!)."
        renalDetails={[
          'Dobutaminin ana molekülü COMT ve glukuronidasyonla dakikalar içinde inaktif 3-O-metildobutamine dönüştürülür; böbrek yetmezliğinde aktif ilaç birikimi olmaz.',
          'DOREMI (NEJM 2021) Klinik İpucu: Milrinon (%80–85 renal atılımlı, t½ ~2,3 saat) akut böbrek hasarında (ABH) birikerek uzamış derin hipotansiyon yapabilirken, Dobutamin (t½ ~2 dk) ağır ABH veya CRRT/diyaliz hastalarında çok daha hızlı ve güvenli titre edilir.',
          'Dobutamin doğrudan renal D₁ reseptörlerini uyarmaz; ancak kardiyak debiyi (CO) artırıp venöz konjesyonu (CVP/PCWP) düşürerek kardiyorenal sendromda renal perfüzyonu ve diürezi ikincil olarak iyileştirir.',
        ]}
        hepaticSummary="Karaciğer ve yaygın ekstrahepatik doku COMT kapasitesi yüksek olduğundan rutin doz azaltımı gerekmez; hemodinamik yanıta göre titre edilir."
        hepaticDetails={[
          'İleri evre karaciğer yetmezliğinde (Child-Pugh C) glukuronid konjugasyonu hafif yavaşlayabilir; düşük dozla (2,5 mcg/kg/dk) başlanarak hedef kardiyak debi ve ScvO₂ yanıtına göre titre edilir.',
          'İskemik hepatopatide ("şok karaciğeri") kardiyak debiyi artırıp hepatik venöz konjesyonu azaltarak transaminaz ve laktat klirensini destekler.',
        ]}
        {...STANDALONE_ORGAN_PART1['dobutamine']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="Düşük Başlangıç (2–2,5 mcg/kg/dk) · AF & İskemi İzlemi"
        geriatricPoints={[
          'Geriatrik hastalarda (>65 yaş) senil miyokardiyal β₁-reseptör down-regülasyonu nedeniyle inotropik yanıt hafif azalmış olabilir; buna karşılık gizli koroner arter hastalığı ve paroksismal/kronik Atriyal Fibrilasyon prevalansı çok yüksektir.',
          'Yaşlılarda 2–2,5 mcg/kg/dk gibi düşük dozla başlanmalı ve 10–15 dakikada bir yavaş titre edilmelidir; >10 mcg/kg/dk üzerinde miyokard iskemisi, hızlı AF ve ventriküler ektopi riski belirgin artar.',
          'Yaşlı kadınlarda stres kardiyomiyopatisi (Takotsubo) sıklığı yüksek olduğundan, dobutamin öncesi dinamik LVOT obstrüksiyonu ekokardiyografi ile mutlaka dışlanmalıdır.',
        ]}
        obesityWeightScalarBadge="IBW (Başlangıç) → Yanıta Göre Titre Et"
        obesityPoints={[
          'Obezitede (BMI ≥ 30 kg/m²) dobutamin hidrofilik bir katekolamin olarak yağ dokusuna geçmez ve ekstraselüler sıvı kompartmanında (Vd ~0,2 L/kg) dağılır; gerçek vücut ağırlığı (TBW) kullanımı %40–100 aşırı dozlamaya, taşikardiye ve β₂ vazodilatasyon kaynaklı hipotansiyona neden olur.',
          'Başlangıç dozu İdeal Vücut Ağırlığı (IBW) (veya Düzeltilmiş Vücut Ağırlığı - AdjBW) üzerinden hesaplanmalı; yarı ömrü (~2 dk) çok kısa olduğundan 10 dakika içinde hemodinamik hedefe göre titre edilmelidir.',
          'Hesaplayıcı bölümündeki Obezite Doz Ölçekleyici ile boy ve cinsiyete göre IBW tek tıkla uygulanabilir.',
        ]}
        clinicalNote="Hem geriatrik hem obez hastalarda β₂ aracılı potasyum hücre içi şifti nedeniyle serum K⁺ düzeyi > 4,0–4,5 mEq/L ve Mg²⁺ > 2,0 mg/dL tutulmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GEBELİK & LAKTASYON (#sec-gebelik)                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="FDA Gebelik Kategorisi B · Peripartum kardiyomiyopati veya maternal septik/kardiyojenik şokta ilk tercih inotroptur."
        pregnancyDetails={[
          'Hayvan çalışmalarında fetal zarar gösterilmemiştir (Kategori B). Peripartum kardiyomiyopati (PPCM) veya gebelikte gelişen kardiyojenik/septik şokta maternal kardiyak debiyi sağlamak için güvenle kullanılır.',
          'Önemli Klinik Avantaj: Ağır peripartum kardiyomiyopatide Levosimendan veya bromokriptin tartışmalarına karşın, Dobutamin kısa yarı ömrü (~2 dk) ve uteroplasental vazokonstriksiyon yapmaması (α₁ etkisi nötralize olduğundan) nedeniyle akut dekompansasyonda standart inotroptur.',
        ]}
        lactationSummary="Yarı ömrü ~2 dakika ve oral biyoyararlanımı %0 olduğundan emzirme döneminde bebekte sistemik maruziyet beklenmez."
        lactationDetails={[
          'Anne sütüne geçişi ihmal edilebilir düzeydedir ve bebek GİS kanalından emilmez; maternal hemodinamik stabilizasyon sağlandıktan sonra emzirmeye engel oluşturmaz.',
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
            title: 'Sinüs Taşikardisi, Hızlı AF & Ventriküler Aritmiler',
            incidenceOrSeverity: '%10–30 · Doz-Bağımlı',
            detail:
              'SA düğüm kronotropisi ve AV düğüm iletim hızlanması (kontrolsüz AF’de tehlikeli ventrikül yanıtı); >10–15 mcg/kg/dk dozlarda PVC/VT riski (Dopamine göre eşit inotropik dozda daha az aritmojeniktir).',
            tone: 'rose',
          },
          {
            title: 'Vazodilatasyona Bağlı Hipotansiyon (İnodilatör Çöküş)',
            incidenceOrSeverity: 'β₂ Aracılı · Hipovolemi',
            detail:
              'Vasküler β₂ reseptör uyarımıyla SVR düşüşü; özellikle hipovolemik veya vazopresörsüz septik/kardiyojenik şok hastasında MAP düşüşü yapar (Noradrenalin ile kombine edilmelidir).',
            tone: 'amber',
          },
          {
            title: 'Miyokard Oksijen Tüketimi (MVO₂) Artışı & İskemi',
            incidenceOrSeverity: 'KAH / AKS Hastaları',
            detail:
              'Kontraktilite ve kalp hızı artışı miyokardın O₂ ihtiyacını yükseltir; kritik koroner darlığı olanlarda anjina, ST depresyonu ve enfarkt alanı genişlemesi yapabilir.',
            tone: 'rose',
          },
          {
            title: 'Hipokalemi & Eozinofilik Miyokardit / Hipersensitivite',
            incidenceOrSeverity: 'β₂ K⁺ Şifti · Uzamış İnfüzyon',
            detail:
              'β₂ → Na⁺/K⁺-ATPaz uyarımıyla ekstraselüler K⁺ hücre içine kayar (aritmiyi tetikler!). Uzamış infüzyonlarda (>3–7 gün) nadir ama özgül eozinofilik miyokardit ve periferik eozinofili görülebilir.',
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
            title: 'Rasemik Karışım İkiliği: (-) İzomer (α₁ Agonist) vs (+) İzomer (α₁ Antagonist + Güçlü β₁/β₂ Agonist)',
            detail:
              'Klinikteki dobutamin 50:50 rasemik bir karışımdır: (-)-enantiyomer güçlü bir α₁-adrenerjik agonist (vazokonstriktör) ve zayıf β agonist iken; (+)-enantiyomer güçlü bir β₁/β₂ agonist ve aynı zamanda güçlü bir kompetitif α₁-antagonistidir! İki izomerin vasküler α₁ etkileri birbirini nötralize eder ve net sonuç olarak saf β₁ inotropi + hafif β₂ vazodilatasyon (SVR↓) ortaya çıkar.',
          },
          {
            title: '>72 Saat Uzamış İnfüzyonda β₁ Reseptör Down-Regülasyonu & Farmakolojik Tolerans',
            detail:
              '48–72 saati aşan kesintisiz dobutamin infüzyonlarında miyokardiyal β₁ reseptörlerinin GRK2 ile fosforilasyonu ve β-arrestin aracılı internalizasyonu (down-regülasyon) nedeniyle hemodinamik yanıt %30–50 oranında azalır (taşiflaksi). Uzamış inotrop desteği gereken hastalarda kademeli weaning veya β-reseptör sonrası (post-reseptör) etkili ajanlara (Levosimendan / Milrinon) geçiş planlanmalıdır.',
          },
          {
            title: 'Kronik β-Bloker Alan Hastada Yanıtsızlık & Levosimendan / Milrinon Seçimi (ESC 2021)',
            detail:
              'Kronik kalp yetmezliği nedeniyle tam doz β-bloker (özellikle non-selektif ve α₁ bloke edici Karvedilol) kullanan hastalarda dobutaminin β₁ bağlanma bölgesi kompetitif olarak işgal edilmiştir; yüksek doz dobutamin (15–20 mcg/kg/dk) gerekebilir veya yanıt alınamaz. ESC 2021 kılavuzu, β-bloker altındaki kardiyojenik şokta β₁ reseptörünü bypass eden Levosimendan veya Milrinon tercih edilmesini önerir.',
          },
          {
            title: 'Dinamik LVOT Obstrüksiyonu (LVOTO) & Takotsubo Kardiyomiyopatisi Tuzağı',
            detail:
              'Takotsubo (stres) kardiyomiyopatisi veya bazal septal hipertrofisi olan hastalarda apikal akineziye karşın bazal segmentler hiperkinetiktir. Bu hastalara şok tablosunda Dobutamin verilirse bazal kontraktilite artışı ve SVR düşüşü sol ventrikül çıkış yolunu (LVOT) tamamen kapatarak ölümcül hipotansiyona yol açar! Tedavi inotropu kesmek, sıvı vermek ve vazokonstriktör (Fenilefrin/Noradrenalin) veya kısa etkili β-bloker (Esmolol) uygulamaktır.',
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
          title: 'Hücre Zarı & Moleküler Hedef (Rasemik Enantiyomer Biyofiziği: (-)-İzomer α₁ Agonist vs (+)-İzomer α₁ Antagonist + β₁/β₂ Agonist)',
          summary:
            'Dobutamin, dopamin molekülünün amino grubuna hacimli bir aromatik arilalkil (4-hidroksifenil-bütan-2-il) yan zinciri eklenmesiyle sentezlenmiş bir rasemattır (50:50 R(+) ve S(-) enantiyomer karışımı). Bu kiral asimetri, hedef hücre zarındaki 7-transmembran (7-TM) GPCR alt tipleri üzerinde benzersiz bir "kendi kendini nötralize eden α₁, saf β₁/β₂" farmakodinamik profil oluşturur (Miller’s 10th Ed. / Stoelting’s 6th Ed.):',
          points: [
            'S(-)-Dobutamin Enantiyomeri (Vasküler Sarkolemma α₁-Agonisti): (-)-izomer vasküler düz kas hücresi zarındaki postsinaptik α₁-adrenerjik reseptörlere yüksek afiniteyle tam agonist olarak bağlanır (tek başına verilseydi Noradrenalin benzeri güçlü vazokonstriksiyon ve SVR artışı yapardı); β₁ ve β₂ reseptörlerine afinitesi ise zayıftır.',
            'R(+)-Dobutamin Enantiyomeri (Güçlü β₁/β₂ Agonisti + Kompetitif α₁-Antagonisti!): (+)-izomer kardiyomiyosit sarkolemmasındaki β₁ reseptörlerine (-)-izomerden ~10 kat daha yüksek afiniteyle ve vasküler β₂ reseptörlerine güçlü agonist olarak bağlanır; aynı zamanda vasküler α₁ reseptörlerinin ortosterik bağlanma cebini kompetitif antagonist olarak bloke ederek (-)-izomerin α₁ vazokonstriktör etkisini hücresel düzeyde iptal eder.',
            'Net Makroskopik Reseptör Seçiciliği (β₁ : β₂ ≈ 3 : 1, Net α₁ ≈ 0, D₁/D₂ = 0): İki enantiyomerin süperpozisyonu sonucunda kardiyomiyosit zarında baskın β₁ agonizma ve periferik arteriyol zarında net β₂ vazodilatasyon ortaya çıkar. Yapısındaki büyük arilalkil grubu nedeniyle renal/mezenterik D₁ veya hipofizer D₂ dopamin reseptörlerine HİÇ bağlanmaz.',
            'Presinaptik Sempatik Sinir Ucu (Doğrudan Postsinaptik Etkili — NET/VMAT2 Bağımsız!): Dopaminin aksine dobutamin, presinaptik sempatik nöron zarındaki Norepinefrin Taşıyıcısı (NET / Uptake-1) üzerinden veziküler endojen noradrenalin salınımı YAPMAZ; tamamen doğrudan postsinaptik reseptör agonistidir (bu sayede noradrenalin depoları tükenmiş kronik kalp yetmezliğinde bile ilk 24–48 saatte inotropik etkinliği korunur).',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & İyon / Kontraktil Protein Dinamiği',
          summary:
            'Kardiyomiyosit ve vasküler düz kas hücrelerinde dobutaminin enantiyomerleri iki paralel hücre içi sinyal kaskadını harekete geçirir:',
          points: [
            'Ventriküler Kardiyomiyosit İçi (β₁ → Gαs → AC Tip V/VI↑ → cAMP↑ → PKA → Ca²⁺ Döngüsü): β₁ reseptörünün Gαs alt birimi membran adenilat siklazını (AC V/VI) aktive ederek ATP’den cAMP sentezini hızlandırır ve Protein Kinaz A’yı (PKA) aktifler. PKA; (1) T-tübül sarkolemmasındaki L-tipi voltaj kapılı Ca²⁺ kanallarını (Cav1.2) fosforilleyerek Faz 2 platosunda içeri Ca²⁺ akımını (ICa,L) büyütür, (2) Sarkoplazmik Retikulum (SR) zarındaki Riyanodin Reseptörlerini (RyR2) fosforilleyerek Ca²⁺-aracılı Ca²⁺ salınımını (CICR) ve sistolik [Ca²⁺]i pikini yükseltir → Troponin-C doygunluğu ve aktin-miyozin çapraz köprü hızı/kuvveti artar (güçlü pozitif inotropi).',
            'Kardiyomiyosit Diyastolik Gevşemesi (Fosfolamban & Troponin-I Fosforilasyonu → Pozitif Lusitropi): PKA, SR zarındaki SERCA2a pompasını frenleyen Fosfolamban (PLB) proteinini Ser16 noktasından fosforilleyerek inhibisyonu kaldırır; sitozolik Ca²⁺ diyastolde hızla SR içine geri pompalanır ve aynı anda Troponin-I fosforilasyonu Ca²⁺’un Troponin-C’den ayrılmasını hızlandırır → ventrikül diyastolik kompliyansı artar ve LVEDP/PCWP düşer.',
            'SA ve AV Düğüm Pacemaker Hücresi İçi (cAMP → HCN4 If Akımı & Cav1.2/Cav1.3 → Pozitif Kronotropi & Dromotropi): Yükselen cAMP doğrudan HCN4 ("funny" akımı) kanallarına bağlanarak Faz 4 diyastolik depolarizasyonu hızlandırır; AV düğüm hücrelerinde ise Faz 0 Ca²⁺ akımını büyüterek atriyoventriküler iletim hızını artırır ve efektif refrakter periyodu kısaltır (AF hastalarında hızlı ventrikül yanıtının hücresel mekanizması).',
            'Vasküler Düz Kas Hücresi İçi (β₂ → Gαs → cAMP/PKA → MLCK İnhibisyonu vs Enantiyomerik α₁/Gαq Dengesi): Vasküler düz kasta (+)-izomerin uyardığı β₂ → Gαs → cAMP → PKA yolağı Miyozin Hafif Zincir Kinazı (MLCK) fosforilleyip inaktive ederek ve plazma zarı Ca²⁺-ATPaz/BKCa kanallarını aktive ederek düz kas gevşemesi üretir; (-)-izomerin başlattığı α₁ → Gαq/11 → PLC-β → IP₃/Ca²⁺ kasıcı sinyali ise (+)-izomerin α₁ blokajıyla sönümlendiğinden net hücre içi yanıt arteriyoler gevşemedir (SVR↓).',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Ventrikül Miyokardı, İleti Sistemi & Koroner Yatak → Kalp Fizyolojisi',
            tissueTarget: 'Sol/Sağ Ventrikül · SA/AV Düğüm · Koroner Mikrodolaşım',
            accent: 'rose',
            points: [
              'Frank-Starling Eğrisinin Sola/Yukarı Kayması (Pozitif İnotropi): Sol ve sağ ventrikül kontraktilitesini (dP/dtmax), ejeksiyon fraksiyonunu, atım hacmini (SV) ve Kardiyak İndeksi (CI) belirgin artırırken sol ventrikül diyastol sonu basıncını (LVEDP / PCWP) düşürür.',
              'İnotropi / Kronotropi Oranı ve AV İletim: Dopamin veya İzoproterenole kıyasla eşit inotropik dozda (2–10 mcg/kg/dk) SA düğüm üzerinde daha az taşikardi üretir (baroreseptör refleks aracılı vagal tonus artışının katkısıyla); ancak >10 mcg/kg/dk üzerinde taşikardi ve AV düğüm dromotropisi belirginleşir.',
              'Koroner Kan Akımı vs Miyokard Oksijen Tüketimi (MVO₂) Dengesi: Kardiyak debi artışı, β₂ koroner vazodilatasyon ve LVEDP düşüşü diyastolik koroner perfüzyonu desteklese de; yüksek dozlarda kontraktilite ve taşikardiye bağlı MVO₂ artışı stenotik koroner yatakta (KAH) arz-talep dengesini bozarak subendokardiyal iskemi ve duvar hareket kusuru yaratır (DSE testinin temel prensibi).',
            ],
          },
          {
            systemTitle: 'Arteriyoler & Venöz Vasküler Düz Kas Dokusu → Sistemik & Pulmoner Dolaşım (İnodilatör Profil)',
            tissueTarget: 'Sistemik Rezistans Arteriyoller · Pulmoner Yatak · Venöz Kapasitans',
            accent: 'amber',
            points: [
              'Sistemik Vasküler Direnç (SVR) ve Ardyük (Afterload) Düşüşü: Vasküler β₂ gevşemesi ve artan atım hacminin karotid/aortik baroreseptörleri uyararak refleks sempatik vazokonstriktör tonusu azaltmasıyla SVR %10–25 oranında düşer; bu durum sol ventrikül ejeksiyonunu kolaylaştırır.',
              'İnodilatör Kan Basıncı (MAP) Paradoksu: MAP = CO × SVR olduğundan; kardiyak rezervi olan hastada CO artışı SVR düşüşünü aşarak kan basıncını korur veya hafif yükseltir. Ancak hipovolemik, vazoplejik (septik şok) veya ağır miyokard hasarlı hastada SVR düşüşü baskın gelerek derin hipotansiyon oluşturur.',
              'Pulmoner Vasküler Direnç (PVR) & Sağ Ventrikül: Dopamin ve Noradrenalinin aksine yüksek dozda pulmoner α₁ vazokonstriksiyon yapmaz; PVR’yi hafif düşürerek ve RV kontraktilitesini artırarak sağ ventrikül yetmezliğinde ventriculo-arterial eşleşmeyi iyileştirir.',
            ],
          },
          {
            systemTitle: 'Renal, Splanknik & Hepatik Mikrodolaşım → Organ Perfüzyonu',
            tissueTarget: 'Renal Kortikal/Medüller Akım · Hepatosplanknik Yatak',
            accent: 'teal',
            points: [
              'Hemodinamik Aracılı İkincil Renal Perfüzyon Artışı: Dobutamin renal damarlarda D₁ dopamin reseptörlerini uyarmaz; ancak düşük debili kalp yetmezliğinde (Kardiyorenal Sendrom Tip 1) ileri yönlü kardiyak debiyi (CO↑) artırıp renal venöz konjesyonu (CVP↓) azaltarak renal perfüzyon basıncını (RPP = MAP − CVP), GFR’yi ve diürezi iyileştirir.',
              'Hepatosplanknik Mikrodolaşım & Laktat Klirensi: Septik ve kardiyojenik şokta yüksek doz Dopamin/Adrenalinin aksine splanknik α₁ vazokonstriksiyon yapmaz; mezenterik ve hepatik arter kan akımını koruyarak mukozal oksijenasyonu ve karaciğerin laktat klirensini artırır (CATS çalışması).',
            ],
          },
          {
            systemTitle: 'İskelet Kası Sarkolemması, Metabolik & İmmün Doku → Elektrolit (K⁺) & Eozinofilik Yanıt',
            tissueTarget: 'İskelet Kası Na⁺/K⁺-ATPaz · Trombosit · Miyokard İnterstisyumu',
            accent: 'indigo',
            points: [
              'İskelet Kası Sarkolemması & Hipokalemi: İskelet kası zarındaki β₂ → Gαs → cAMP → PKA kaskadı Na⁺/K⁺-ATPaz pompasını uyararak ekstraselüler K⁺ iyonunu hücre içine kaydırır; gelişen akut hipokalemi kardiyomiyosit Faz 3 repolarizasyonunu bozarak ventriküler aritmi eşiğini düşürür.',
              'Trombosit Agregasyon İnhibisyonu & Eozinofilik Miyokardit: Yüksek konsantrasyonlarda trombosit cAMP artışı üzerinden kollajen/ADP aracılı agregasyonu hafif inhibe eder; uzamış infüzyonlarda (>3–7 gün) ise ilaca veya sülfit koruyucusuna karşı Tip-IV/Tip-I aşırı duyarlılıkla periferik eozinofili ve biyopsi ile kanıtlanmış eozinofilik miyokardit gelişebilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, GRK2 / β-Arrestin Aracılı β₁ Down-Regülasyonu (Tolerans) & β-Bloker Etkileşimi',
          summary:
            'Dobutaminin doğrudan postsinaptik β₁ agonizması erken dönemde güçlü yanıt üretse de, reseptör desensitizasyonu ve kompetitif antagonizma uzun süreli yönetimi belirler:',
          points: [
            '48–72 Saatte GRK2 (β-ARK1) & β-Arrestin Aracılı Desensitizasyon / Taşiflaksi: Kesintisiz dobutamin maruziyetinde G-proteini kenetli reseptör kinaz-2 (GRK2), aktif β₁ reseptörünün sitoplazmik C-terminalini fosforiller; buraya bağlanan β-arrestin proteinleri reseptörü Gαs’tan ayırır (uncoupling) ve klatrin kaplı veziküllerle hücre içine çekerek lizozomal yıkıma uğratır (down-regülasyon). 72 saat sonunda hemodinamik yanıt %30–50 körelir.',
            'Kronik β-Bloker Varlığında Farklı Yanıt (Metoprolol vs Karvedilol): Selektif β₁-bloker (Metoprolol/Bisoprolol) kullanan hastada yüksek doz dobutamin (15–20 mcg/kg/dk) kompetitif blokajı kısmen aşabilirken; non-selektif β₁/β₂ + α₁ bloker olan Karvedilol varlığında dobutaminin inotropik yanıtı neredeyse tamamen bloke olur ve yüksek dozlarda (-)-izomer üzerinden paradoksal pressör yanıt görülebilir.',
            'Post-Reseptör Sinerji & Geçiş Stratejisi (Milrinon / Levosimendan): β₁ reseptörü down-regüle olduğunda veya β-bloker ile bloke edildiğinde, cAMP yıkımını önleyen PDE3 inhibitörleri (Milrinon) veya doğrudan Troponin-C Ca²⁺ duyarlılaştırıcıları (Levosimendan) sinyal yolağını reseptörün alt kademesinden (distalden) çalıştırarak inotropiyi yeniden sağlar.',
          ],
        }}
        clinicalPearls={[
          'Neden Hipotansif Şokta Tek Başına Dobutamin Başlanmaz? Dobutaminin (+)-izomeri α₁ reseptörlerini bloke edip β₂ reseptörlerini uyardığı için SVR düşer. MAP < 65 mmHg olan hastada tek başına dobutamin başlanması koroner perfüzyon basıncını çökertir; önce Noradrenalin ile MAP ≥ 65 mmHg sağlanmalı, ardından Dobutamin eklenmelidir (SSC 2021 / ESC 2021).',
          'DOREMI Çalışması (NEJM 2021) Pratik Çıkarımı: Kardiyojenik şokta Milrinon ile Dobutamin arasında mortalite farkı yoktur; ancak akut böbrek hasarı (ABH) eşlik eden veya hipotansiyona meyilli hastada Dobutamin (~2 dk yarı ömür, hepatik/doku COMT klirensi) Milrinona (~2,3 saat yarı ömür, renal klirens) göre çok daha güvenli titre edilir.',
          'Kontrolsüz Atriyal Fibrilasyon Uyarısı: Dobutamin AV düğümde cAMP/PKA aracılı iletimi hızlandırarak AF hastasında ventrikül hızını aniden 160–200/dk üzerine çıkarabilir; AF’li şok hastasında dobutamin öncesi veya eşzamanlı IV Amiodaron/Digoksin ile AV düğüm kontrolü şarttır.',
          'Yatak Başı Eko (POCUS) ile LVOTO Kontrolü: Dobutamin başlandıktan sonra kan basıncı paradoksal olarak düşüyor ve taşikardi derinleşiyorsa dozu artırmak yerine derhal ekokardiyografi ile dinamik LVOT obstrüksiyonu (SAM / Takotsubo LVOTO) ve gizli hipovolemi kontrol edilmelidir!',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (#sec-kaynaklar)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Dobutamin Hidroklorür"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Sodyum Bikarbonat (%8,4 NaHCO₃) ve Furosemid (Y-Site / Aynı Lümen)',
            mechanism: 'Alkali Kimyasal Oksidasyon / Fizikokimyasal Presipitasyon',
            clinicalEffect:
              'Sodyum bikarbonat ve alkali çözeltiler dobutamini hızla inaktive eder; Furosemid ile aynı lümende temas ettiğinde ise anında bulanıklık ve beyaz çökelti oluşur.',
            management:
              'Kesinlikle aynı IV hat veya Y-site üzerinden uygulamayın; ayrı venöz kateter lümeni kullanın.',
          },
          {
            severity: 'D',
            agent: 'Non-Selektif Beta-Blokerler (Karvedilol, Propranolol, Nadolol)',
            mechanism: 'β₁ ve β₂ Reseptörlerinin Kompetitif Antagonizması',
            clinicalEffect:
              'Dobutaminin β₁ inotropik ve β₂ vazodilatör etkilerini bloke eder; yüksek dozlarda (-)-izomerin α₁ etkisi baskın kalarak SVR artışı ve hipertansiyona yol açabilir.',
            management:
              'Kronik tam doz Karvedilol/β-bloker kullanan kardiyojenik şok hastasında inotrop olarak β-reseptörden bağımsız Levosimendan veya Milrinon tercih edin (ESC 2021).',
          },
          {
            severity: 'D',
            agent: 'Halojenli Volatil Anestezikler (Sevofluran, İzofluran, Desfluran, Halotan)',
            mechanism: 'Miyokardın Katekolaminlere Aritmojenik Duyarlılaşması',
            clinicalEffect:
              'Ventriküler ektopi, ventriküler taşikardi (VT) ve fibrilasyon eşiğini düşürür.',
            management:
              'İntraoperatif sürekli EKG izlemi yapın; normokapni ve normoksiyi koruyun, en düşük etkili dobutamin dozunu kullanın.',
          },
          {
            severity: 'D',
            agent: 'COMT İnhibitörleri (Entakapon, Tolkapon)',
            mechanism: 'Dobutaminin Primer Yıkım Enzimi Olan COMT’un İnhibisyonu',
            clinicalEffect:
              'Dobutamin MAO ile değil COMT ile yıkıldığından, COMT inhibitörü alan Parkinson hastalarında dobutaminin metabolizması yavaşlar; taşiaritmi ve hemodinamik yanıt şiddetlenir.',
            management:
              'Düşük dozla (1–2 mcg/kg/dk) başlayın ve yakın EKG/arter basıncı monitörizasyonu altında yavaş titre edin.',
          },
          {
            severity: 'C',
            agent: 'Atriyal Fibrilasyon & AV Düğüm İletimini Etkileyen Durumlar (Digoksin Gereksinimi)',
            mechanism: 'AV Düğümde β₁ Aracılı Dromotropik Hızlanma',
            clinicalEffect:
              'Atriyal fibrilasyon/flutter hastalarında AV düğüm refrakter periyodunu kısaltarak tehlikeli hızlı ventrikül yanıtı oluşturur.',
            management:
              'AF hastasında dobutamin başlamadan önce Digoksin veya Amiodaron ile yeterli AV düğüm hız kontrolü sağlayın.',
          },
          {
            severity: 'C',
            agent: 'Diüretikler (Furosemid, Tiyazidler) & İnsülin',
            mechanism: 'Aditif İntraselüler Potasyum Şifti (β₂) ve Renal K⁺ Kaybı',
            clinicalEffect:
              'Dobutaminin β₂ aracılı hücre içi K⁺ kaydırma etkisi, kıvrım diüretikleri veya insülinle birleştiğinde akut hipokalemi ve buna bağlı ventriküler taşiaritmi riskini artırır.',
            management:
              'Kan gazı ve serum K⁺ düzeyini sık aralıklarla izleyin; hedef serum K⁺ > 4,0–4,5 mEq/L tutacak şekilde replasman yapın.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.)',
            title: "Miller's Anesthesia, 10th Edition — Chapter: Autonomic Nervous System Physiology and Pharmacology / Vasopressors and Inotropes (Dobutamine).",
            journal: 'Elsevier',
            year: 2025,
            note: 'Dobutaminin rasemik enantiyomer farmakodinamisi, β1/β2/α1 reseptör dengesi, MVO2 etkileri ve perioperatif LCOS/şok yönetimi.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD (Eds.)',
            title: "Stoelting's Pharmacology & Physiology in Anesthetic Practice, 6th Edition — Chapter: Sympathomimetics (Dobutamine enantiomers).",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: '(-)- ve (+)-dobutamin izomerlerinin zıt α1 etkileri, COMT metabolizması (t½ ~2 dk) ve >72 saatte gelişen β1 down-regülasyonu.',
          },
          {
            authors: 'Mathew R, Di Santo P, Jung RG, et al. (DOREMI Investigators)',
            title: 'Milrinone as Compared with Dobutamine in the Treatment of Cardiogenic Shock.',
            journal: 'N Engl J Med',
            year: 2021,
            pmid: '34347952',
            doi: '10.1056/NEJMoa2026845',
            note: 'n=192 çift-kör RCT: Kardiyojenik şokta Milrinon vs Dobutamin arasında birincil bileşik sonlanım (%49 vs %54; p=0,47) ve hastane içi mortalite (%37 vs %43) açısından fark saptanmamıştır.',
          },
          {
            authors: 'Annane D, Vignon P, Renault A, et al. (CATS Study Group)',
            title: 'Norepinephrine plus dobutamine versus epinephrine alone for management of septic shock: a randomised trial.',
            journal: 'Lancet',
            year: 2007,
            pmid: '17720019',
            doi: '10.1016/S0140-6736(07)61344-0',
            note: 'n=330 RCT: Septik şokta Noradrenalin + Dobutamin ile tek başına Adrenalin arasında 28 günlük mortalite (%34 vs %40; p=0,31) benzer bulunmuştur.',
          },
          {
            authors: 'McDonagh TA, Metra M, Adamo M, et al. (ESC Scientific Document Group)',
            title: '2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure.',
            journal: 'Eur Heart J',
            year: 2021,
            pmid: '34447992',
            doi: '10.1093/eurheartj/ehab368',
            note: 'Akut kalp yetmezliği ve kardiyojenik şokta düşük kardiyak debi ve organ hipoperfüzyonunda Dobutamin (2–20 mcg/kg/dk, Sınıf IIb) ve hipotansiyonda Noradrenalin kombinasyonu önerisi.',
          },
          {
            authors: 'Evans L, Rhodes A, Alhazzani W, et al.',
            title: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021.',
            journal: 'Intensive Care Med',
            year: 2021,
            pmid: '34599691',
            doi: '10.1007/s00134-021-06506-y',
            note: 'Septik şokta yeterli volüm ve MAP ≥ 65 mmHg sağlanmasına rağmen miyokardiyal disfonksiyon ve persistan hipoperfüzyon varlığında Noradrenaline Dobutamin eklenmesi önerisi.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/dobutamine.html"
        medscapeUrl="https://reference.medscape.com/drug/dobutamine-342434"
      />
    </div>
  );
};
