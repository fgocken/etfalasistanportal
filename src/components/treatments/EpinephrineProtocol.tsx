import React, { useState, useId } from 'react';
import {
  Activity,
  HeartPulse,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  Syringe,
  Droplet,
  Clock,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Flame,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Timer,
  BookOpen,
  Wind,
  Copy,
  Check
} from 'lucide-react';
import {
  ContraindicationsGridBlock,
  DrugReferencesAndInteractionsBlock,
  HighAlertSafetyBlock,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
} from './shared/DrugMonographBlocks';

interface Props {
  isDark: boolean;
}

type EpinephrinePrepType =
  | 'vial_50_std'
  | 'vial_50_low'
  | 'vial_50_dec'
  | 'bag_250'
  | 'bag_100_peri'
  | 'custom_conc';

type EmergencyScenarioId = 'acls' | 'anaphylaxis' | 'last' | 'push_dose' | 'nebulized';

export const EpinephrineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [prepType, setPrepType] = useState<EpinephrinePrepType>('vial_50_std');
  const [customConcInput, setCustomConcInput] = useState<number>(80);

  // Doz Modu: mcg/kg/dk veya mcg/dk
  const [doseMode, setDoseMode] = useState<'weight_based' | 'absolute'>('weight_based');
  const [doseMcgKgMin, setDoseMcgKgMin] = useState<number>(0.05);
  const [doseMcgMin, setDoseMcgMin] = useState<number>(3.5);

  // Acil Senaryo / Bolus & İnhalasyon Modülü
  const [activeScenario, setActiveScenario] = useState<EmergencyScenarioId>('anaphylaxis');
  const [pushDoseBolusMcg, setPushDoseBolusMcg] = useState<number>(10);
  const [anaphylaxisRoute, setAnaphylaxisRoute] = useState<'im' | 'iv'>('iv');

  // Akordiyon State'leri
  const [pkOpen, setPkOpen] = useState<boolean>(false);
  const [extravasationOpen, setExtravasationOpen] = useState<boolean>(true);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Erişilebilirlik ID'leri
  const weightInputId = useId();
  const prepSelectId = useId();
  const doseSliderId = useId();
  const customConcInputId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'vial_50_std':
        return 80.0; // 4 mg / 50 mL
      case 'vial_50_low':
        return 40.0; // 2 mg / 50 mL
      case 'vial_50_dec':
        return 100.0; // 5 mg / 50 mL
      case 'bag_250':
        return 16.0; // 4 mg / 250 mL
      case 'bag_100_peri':
        return 10.0; // 1 mg / 100 mL
      case 'custom_conc':
        return customConcInput > 0 ? customConcInput : 80.0;
      default:
        return 80.0;
    }
  })();

  // Senkronize Doz Değerleri
  const activeDoseMcgKgMin =
    doseMode === 'weight_based'
      ? doseMcgKgMin
      : weightKg > 0
      ? doseMcgMin / weightKg
      : 0;

  const activeDoseMcgMin =
    doseMode === 'weight_based' ? doseMcgKgMin * weightKg : doseMcgMin;

  // İnfüzyon Çıktıları
  const hourlyDoseMcg = activeDoseMcgMin * 60;
  const infusionRateMlHr = concentrationMcgMl > 0 ? hourlyDoseMcg / concentrationMcgMl : 0;
  const dailyTotalMcg = hourlyDoseMcg * 24;
  const dailyTotalMg = dailyTotalMcg / 1000;
  const dailyTotalMl = infusionRateMlHr * 24;
  const dailyAmpoules1Mg = dailyTotalMg; // 1 ampul = 1 mg/mL

  // Reseptör Hakimiyeti & Doz Kademesi
  const receptorZone: 'beta_dominant' | 'mixed_inopressor' | 'alpha_vasopressor' = (() => {
    if (activeDoseMcgKgMin < 0.05) return 'beta_dominant';
    if (activeDoseMcgKgMin <= 0.15) return 'mixed_inopressor';
    return 'alpha_vasopressor';
  })();

  const receptorLabel =
    receptorZone === 'beta_dominant'
      ? '● Beta-2 / Beta-1 Baskın (İnotrop & Bronkodilatör)'
      : receptorZone === 'mixed_inopressor'
      ? '▲ Dengeli Beta-1 + Alfa-1 (İnopressör Bölge)'
      : '✖ Alfa-1 Baskın (Güçlü Vazokonstriksiyon & Aritmi Riski)';

  // Ağırlık Bazlı Acil Hesaplamalar (Erişkin & Pediatrik güvenli tavanlar)
  const isPediatricWeight = weightKg < 40;
  const aclsPedsDoseMg = Math.min(1.0, Number((weightKg * 0.01).toFixed(2)));
  const aclsPedsVol1to10k = Number((aclsPedsDoseMg * 10).toFixed(1)); // 0.1 mg/mL (1:10.000)

  const anaphImDoseMg = isPediatricWeight
    ? Math.min(0.5, Number((weightKg * 0.01).toFixed(2)))
    : 0.5;
  const anaphImVol1to1k = Number(anaphImDoseMg.toFixed(2)); // 1 mg/mL (1:1.000)

  const lastMaxBolusMcg = Math.min(100, Math.round(weightKg * 1.0)); // ≤ 1 mcg/kg
  const lastBolusVol10McgMl = Number((lastMaxBolusMcg / 10).toFixed(1));

  const pushDoseVol10McgMl = Number((pushDoseBolusMcg / 10).toFixed(1));
  const nebulizedLepiMl = Math.min(5.0, Number((weightKg * 0.5).toFixed(1))); // 0.5 mL/kg 1:1000 maks 5 mL

  // Pano Özeti Kopyalama
  const handleCopySummary = async () => {
    const lines = [
      `ADRENALİN (EPİNEFRİN) KLİNİK DOZ ÖZETİ`,
      `Hasta Ağırlığı: ${weightKg} kg`,
      `İnfüzyon Çözeltisi: ${concentrationMcgMl} mcg/mL`,
      `Hedef İnfüzyon Dozu: ${activeDoseMcgKgMin.toFixed(3)} mcg/kg/dk (${activeDoseMcgMin.toFixed(1)} mcg/dk)`,
      `Pompa Debisi: ${infusionRateMlHr.toFixed(1)} mL/saat`,
      `24 Saatlik Tüketim: ${dailyTotalMg.toFixed(1)} mg/gün (~${Math.ceil(dailyAmpoules1Mg)} adet 1 mg ampul)`,
      `Reseptör Profili: ${receptorLabel}`,
      `---`,
      `Acil Referanslar (${weightKg} kg):`,
      `- Anafilaksi IM (1:1.000): ${anaphImDoseMg.toFixed(2)} mg (${anaphImVol1to1k} mL IM)`,
      `- LAST Modifiye ACLS (≤1 mcg/kg): Maks ${lastMaxBolusMcg} mcg IV (${lastBolusVol10McgMl} mL [10 mcg/mL])`,
      `- Push-Dose Köprü (10 mcg/mL): ${pushDoseBolusMcg} mcg = ${pushDoseVol10McgMl} mL IV`
    ].join('\n');

    try {
      await navigator.clipboard.writeText(lines);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & BİFAZİK RESEPTÖR PROFİLİ         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="font-semibold text-amber-700 dark:text-amber-400">
                Endojen Katekolamin · İnopressör
              </span>
              <span aria-hidden="true">·</span>
              <span>Adrenalin Biofarma · Galen · Osel</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">ATC: C01CA24</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
              Adrenalin (Epinefrin) Klinik Monografisi &amp; Doz Hesaplayıcısı
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kimlik:</strong> Hem{' '}
              <strong>α (α₁, α₂)</strong> hem de <strong>β (β₁, β₂)</strong> adrenerjik reseptörleri doza bağımlı
              uyaran güçlü endojen katekolamin. Kardiyak arrest (ACLS/PALS) ve anafilaktik şokta{' '}
              <strong>birinci basamak yaşam kurtarıcı</strong>; post-KPB düşük debi, refrakter bradikardi ve septik
              şokta ise güçlü <strong>inopressör</strong> ajandır.
            </p>
          </div>
        </div>

        {/* Doz-Bağımlı Bifazik Reseptör Profili */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-sm text-cyan-700 dark:text-cyan-400 flex items-center gap-1.5">
                <Wind className="w-4 h-4 shrink-0" />
                <span>Düşük Doz: β₂ &amp; β₁ Baskın</span>
              </span>
              <span className="font-mono tabular-nums text-xs font-semibold text-cyan-700 dark:text-cyan-400">
                0.01–0.05 mcg/kg/dk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              İskelet kası arteriyollerinde <strong>β₂ vazodilatasyon</strong> (SVR ve diyastolik basınç düşebilir),
              güçlü <strong>bronkodilatasyon</strong>, belirgin <strong>β₁ inotropi/kronotropi</strong> ve hepatik
              glikojenoliz/glikoliz artışı (Tip-B laktat artışı).
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-sm text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 shrink-0" />
                <span>Orta Doz: Dengeli β₁ + α₁</span>
              </span>
              <span className="font-mono tabular-nums text-xs font-semibold text-amber-700 dark:text-amber-400">
                0.05–0.15 mcg/kg/dk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>β₁ kontraktilite ve kalp hızı</strong> artışı ile birlikte belirginleşen{' '}
              <strong>α₁ vazokonstriksiyon</strong> dengelenir. Kardiyak debi (CO), sistolik basınç ve MAP yükselir;
              kardiyojenik şok ve KPB çıkışında klasik inopressör aralıktır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/60 border-slate-700/80 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-sm text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 shrink-0" />
                <span>Yüksek Doz &amp; Bolus: α₁ Baskın</span>
              </span>
              <span className="font-mono tabular-nums text-xs font-semibold text-rose-700 dark:text-rose-400">
                &gt; 0.15 mcg/kg/dk
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Yaygın <strong>α₁ arteriyoler ve venöz vazokonstriksiyon</strong> ile SVR keskin yükselir. KPR'de aort
              diyastolik basıncını artırarak <strong>koroner perfüzyon basıncını (CPP)</strong> sağlar; infüzyonda
              splanknik/renal iskemi ve taşiaritmi riskini artırır.
            </p>
          </div>
        </div>
      </section>

      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-ozet', label: 'Bifazik Etki' },
          { id: 'sec-hesaplayici', label: 'İnfüzyon Pompası' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyonlar' },
          { id: 'sec-organ', label: 'Böbrek / Karaciğer' },
          { id: 'sec-gebelik', label: 'Gebelik & Laktasyon' },
          { id: 'sec-guvenlik', label: 'ISMP High-Alert' },
          { id: 'sec-kaynaklar', label: 'Kaynakça & Etkileşim' },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. TÜRKİYE AMPUL FORMLARI & 10 KAT DOZ HATASI GÜVENLİK UYARISI       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-100' : 'bg-rose-50/70 border-rose-200 text-rose-950'
        }`}
      >
        <div className="flex items-start gap-3">
          <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-3 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-sm sm:text-base font-bold text-rose-700 dark:text-rose-300">
                Kritik İlaç Güvenliği: 1:1.000 vs 1:10.000 Karışıklığı &amp; Türkiye Ampul Formları
              </h2>
              <span className="text-xs font-mono font-semibold text-rose-700 dark:text-rose-300">
                Yüksek Riskli İlaç (ISMP)
              </span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-rose-900 dark:text-rose-200">
              Adrenalin kaynaklı iyatrojenik mortalitenin en sık nedeni <strong>1:1.000 (1 mg/mL)</strong> konsantre
              ampulün, seyreltilmeden <strong>1:10.000 (0.1 mg/mL)</strong> veya Push-Dose yerine doğrudan IV puşe
              edilmesidir (10 kat – 100 kat aşırı doz → ventriküler fibrilasyon, akut pulmoner ödem, intrakraniyal
              kanama).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/70 border-rose-900/40' : 'bg-white border-rose-200'}`}>
                <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">TR Standart Ampuller</span>
                <span className="block font-mono tabular-nums font-bold text-slate-900 dark:text-white mt-0.5">
                  0.25 · 0.5 · 1.0 mg / 1 mL
                </span>
                <span className="block text-[11px] text-rose-700 dark:text-rose-300 mt-1">
                  Üçü de 1 mL hacimdedir; etiket mg değerini mutlaka okuyun!
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/70 border-rose-900/40' : 'bg-white border-rose-200'}`}>
                <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">1:1.000 (1 mg/mL)</span>
                <span className="block font-mono tabular-nums font-bold text-slate-900 dark:text-white mt-0.5">
                  1.000 mcg / mL
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  Erişkin ACLS (1 mg IV), Anafilaksi IM (0.5 mL), Nebülizasyon.
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/70 border-rose-900/40' : 'bg-white border-rose-200'}`}>
                <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">1:10.000 (0.1 mg/mL)</span>
                <span className="block font-mono tabular-nums font-bold text-slate-900 dark:text-white mt-0.5">
                  100 mcg / mL
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  1 mg (1 mL) + 9 mL SF. Pediatrik PALS &amp; IV anafilaksi titrasyon stoğu.
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/70 border-rose-900/40' : 'bg-white border-rose-200'}`}>
                <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">Push-Dose (1:100.000)</span>
                <span className="block font-mono tabular-nums font-bold text-slate-900 dark:text-white mt-0.5">
                  10 mcg / mL
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                  1 mg / 100 mL SF. Ameliyathane IV anafilaksi &amp; hipotansiyon bolusu.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. İNTERAKTİF İNFÜZYON POMPASI & DOZ HESAPLAYICISI                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif İnfüzyon Pompası &amp; Doz Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Erişkin ve pediatrik ağırlık aralığı (5–150 kg), standart 50 mL enjektör ve torba seyreltme şemaları.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleCopySummary}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                copiedSummary
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Kopyalandı' : 'Rapor Kopyala'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setWeightKg(70);
                setPrepType('vial_50_std');
                setDoseMode('weight_based');
                setDoseMcgKgMin(0.05);
                setDoseMcgMin(3.5);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
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
                <span className="font-mono tabular-nums text-sm text-amber-700 dark:text-amber-400 font-bold">
                  {weightKg} kg {isPediatricWeight ? '(Pediatrik)' : ''}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
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
                <div className="flex items-center gap-1.5 shrink-0">
                  {[15, 30, 50, 70, 90].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeightKg(w)}
                      className={`px-2.5 py-1.5 min-h-[36px] text-xs font-mono tabular-nums rounded-lg border transition-colors cursor-pointer ${
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

            {/* 2. Çözelti Hazırlama Şeması */}
            <div>
              <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Seyreltme / Hazırlama Modu (1 mg/1 mL Standart Ampul Bazlı):
              </label>
              <select
                id={prepSelectId}
                value={prepType}
                onChange={(e) => setPrepType(e.target.value as EpinephrinePrepType)}
                className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-amber-500'
                    : 'bg-white border-slate-300 text-slate-900 focus:border-amber-600'
                }`}
              >
                <option value="vial_50_std">
                  Standart YBÜ Enjektörü: 4 mg / 50 mL [80 mcg/mL] (4 Ampul [4 mL] + 46 mL D5W / SF)
                </option>
                <option value="vial_50_low">
                  Düşük Doz Titrasyon: 2 mg / 50 mL [40 mcg/mL] (2 Ampul [2 mL] + 48 mL D5W / SF)
                </option>
                <option value="vial_50_dec">
                  Ondalık Enjektör: 5 mg / 50 mL [100 mcg/mL] (5 Ampul [5 mL] + 45 mL D5W / SF)
                </option>
                <option value="bag_250">
                  Anafilaksi / Torba İnfüzyonu: 4 mg / 250 mL [16 mcg/mL] (4 Ampul + 246 mL SF)
                </option>
                <option value="bag_100_peri">
                  Periferik Kısa Süreli / Düşük Doz: 1 mg / 100 mL [10 mcg/mL] (1 Ampul + 99 mL SF)
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
                    className={`w-28 p-1.5 text-xs font-mono tabular-nums rounded-lg border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs text-slate-500 font-mono">mcg/mL</span>
                </div>
              )}

              <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                <span>
                  Etkin Konsantrasyon:{' '}
                  <strong className="text-slate-900 dark:text-white font-mono tabular-nums">
                    {concentrationMcgMl} mcg/mL
                  </strong>
                </span>
                <span className="font-mono">1 mg = 1000 mcg · Işıktan koruyun</span>
              </div>
            </div>

            {/* 3. Hedef Doz & Birim Modu */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Hedef İnfüzyon Dozu:
                </span>
                <div
                  className={`inline-flex p-0.5 rounded-lg border text-xs font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setDoseMode('weight_based')}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      doseMode === 'weight_based'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/kg/dk (Standart)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDoseMode('absolute');
                      setDoseMcgMin(Number(activeDoseMcgMin.toFixed(1)));
                    }}
                    className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      doseMode === 'absolute'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    mcg/dk (Sabit Skala)
                  </button>
                </div>
              </div>

              {doseMode === 'weight_based' ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                    <span>Doz Aralığı (0.01 – 0.50 mcg/kg/dk):</span>
                    <span className="font-mono tabular-nums text-sm font-bold text-amber-700 dark:text-amber-400">
                      {doseMcgKgMin.toFixed(2)} mcg/kg/dk
                    </span>
                  </div>
                  <input
                    id={doseSliderId}
                    type="range"
                    min="0.01"
                    max="0.50"
                    step="0.01"
                    value={doseMcgKgMin}
                    onChange={(e) => setDoseMcgKgMin(Number(e.target.value))}
                    className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[0.01, 0.02, 0.03, 0.05, 0.08, 0.10, 0.15, 0.20, 0.30, 0.50].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDoseMcgKgMin(d)}
                        className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-lg border transition-colors cursor-pointer ${
                          Math.abs(doseMcgKgMin - d) < 0.004
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
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
                    <span>Doz Aralığı (0.5 – 30.0 mcg/dk):</span>
                    <span className="font-mono tabular-nums text-sm font-bold text-amber-700 dark:text-amber-400">
                      {doseMcgMin.toFixed(1)} mcg/dk
                    </span>
                  </div>
                  <input
                    id={doseSliderId}
                    type="range"
                    min="0.5"
                    max="30"
                    step="0.5"
                    value={doseMcgMin}
                    onChange={(e) => setDoseMcgMin(Number(e.target.value))}
                    className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[1, 2, 3.5, 5, 7, 10, 15, 20].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setDoseMcgMin(val)}
                        className={`px-2.5 py-1 text-xs font-mono tabular-nums rounded-lg border transition-colors cursor-pointer ${
                          Math.abs(doseMcgMin - val) < 0.1
                            ? 'bg-amber-600 text-white border-amber-600 font-bold'
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

          {/* Sağ Kolon: Kalibre Pompa Çıktı Paneli (5 Kolon) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div
              className={`p-5 rounded-2xl border transition-all ${
                isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                  İnfüzyon Pompası Debisi
                </span>
                <span className="text-xs font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400">
                  {concentrationMcgMl} mcg/mL
                </span>
              </div>

              {/* BÜYÜK POMPA DEBİSİ */}
              <div className="py-4 text-center">
                <div className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums text-amber-600 dark:text-amber-400 tracking-tight">
                  {infusionRateMlHr.toFixed(1)}
                  <span className="text-sm uppercase font-mono text-slate-500 dark:text-slate-400 ml-2">
                    mL / saat
                  </span>
                </div>
                <div className={`text-xs font-medium mt-2 ${
                  receptorZone === 'beta_dominant'
                    ? 'text-cyan-700 dark:text-cyan-400'
                    : receptorZone === 'mixed_inopressor'
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-rose-700 dark:text-rose-400'
                }`}>
                  {receptorLabel}
                </div>
              </div>

              {/* DETAYLI PARAMETRE GRID'İ */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Dakikalık Doz</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {activeDoseMcgMin.toFixed(1)} mcg/dk
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    {activeDoseMcgKgMin.toFixed(3)} mcg/kg/dk
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Tüketim</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {hourlyDoseMcg.toFixed(0)} mcg/sa
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    {(hourlyDoseMcg / 1000).toFixed(2)} mg/saat
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Saatlik Sarfiyat</span>
                  <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white text-sm">
                    {dailyTotalMg.toFixed(1)} mg/gün
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    {dailyTotalMl.toFixed(0)} mL / 24 saat
                  </span>
                </div>

                <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Gereken 1 mg Ampul</span>
                  <span className="font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400 text-sm">
                    ~{Math.ceil(dailyAmpoules1Mg)} Ampul/gün
                  </span>
                  <span className="block text-[10px] text-slate-400 font-mono tabular-nums mt-0.5">
                    Net: {dailyAmpoules1Mg.toFixed(2)} ampul
                  </span>
                </div>
              </div>
            </div>

            {activeDoseMcgKgMin > 0.15 && (
              <div className="mt-3 p-3 rounded-xl border bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Yüksek Doz Uyarısı (&gt; 0.15 mcg/kg/dk):</span>
                  Taşiaritmi, miyokard iskemisi ve Tip-B hiperlaktatemi hızlanır. Vazopleji baskınsa Noradrenalin veya
                  Vazopressin ile kombine edilmesi önerilir.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ACİL BOLUS, PUSH-DOSE, ANAFİLAKSİ, LAST & NEBÜLİZASYON MODÜLÜ    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Timer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Acil Endikasyonlara Göre Bolus, Push-Dose &amp; İnhalasyon Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Seçili hasta ağırlığına (<span className="font-mono tabular-nums font-bold">{weightKg} kg</span>) göre
                anında hesaplanan klinik dozlar.
              </p>
            </div>
          </div>
        </div>

        {/* Senaryo Sekmeleri */}
        <div
          className={`flex flex-wrap gap-1.5 p-1.5 rounded-xl border mt-4 ${
            isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {[
            { id: 'anaphylaxis', label: 'Anafilaksi (IM / IV)' },
            { id: 'acls', label: 'Kardiyak Arrest (ACLS / PALS)' },
            { id: 'last', label: 'LAST Kurtarma (Modifiye)' },
            { id: 'push_dose', label: 'Push-Dose Köprü (IV)' },
            { id: 'nebulized', label: 'Stridor / Krup (Nebül)' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveScenario(tab.id as EmergencyScenarioId)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeScenario === tab.id
                  ? isDark
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Senaryo İçeriği */}
        <div className="mt-5">
          {activeScenario === 'anaphylaxis' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  Kılavuzlar: <strong>NAP6 (BJA 2018)</strong> · <strong>Garvey et al. 2019</strong> ·{' '}
                  <strong>WAO 2020</strong>
                </div>
                <div
                  className={`inline-flex p-0.5 rounded-lg border text-xs font-semibold ${
                    isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setAnaphylaxisRoute('iv')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      anaphylaxisRoute === 'iv'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Ameliyathane / Damar Yolu + Monitör (IV)
                  </button>
                  <button
                    type="button"
                    onClick={() => setAnaphylaxisRoute('im')}
                    className={`px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                      anaphylaxisRoute === 'im'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Damar Yolu Yok / İlk Basamak (IM)
                  </button>
                </div>
              </div>

              {anaphylaxisRoute === 'iv' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                      Evre II – III (Hipotansiyon / Bronkospazm)
                    </span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white block mt-1">
                      20 – 50 mcg IV
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      <strong>10 mcg/mL</strong> (1:100.000) çözeltisinden <strong>2 – 5 mL</strong> yavaş IV bolus
                      (veya 1:10.000'den 0.2–0.5 mL). Her 1–2 dakikada yanıta göre tekrarlanır.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">
                      Evre III – IV (Ağır Şok / Kollaps)
                    </span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 block mt-1">
                      100 – 200 mcg IV
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      <strong>1:10.000 (100 mcg/mL)</strong> çözeltiden <strong>1 – 2 mL</strong> IV titrasyon. Nabız
                      alınamıyorsa (Evre IV) hemen KPR + <strong>1 mg IV</strong> ACLS protokolüne geçilir.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 block">
                      Refrakter Anafilakside İnfüzyon
                    </span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-teal-700 dark:text-teal-400 block mt-1">
                      0.05 – 0.1 mcg/kg/dk
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      2–3 IV bolusa rağmen hipotansiyon sürüyorsa hızlı sıvı (20–30 mL/kg SF) eşliğinde infüzyona geçin;
                      β-bloker alan hastada yanıtsızlıkta <strong>Glukagon 1–5 mg IV</strong> ekleyin.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">
                      {weightKg} kg İçin Hesaplanan İntramüsküler Doz
                    </span>
                    <div className="text-2xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 mt-1">
                      {anaphImDoseMg.toFixed(2)} mg IM
                      <span className="text-xs font-mono text-slate-500 ml-2">
                        ({anaphImVol1to1k} mL [1:1.000])
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      <strong>Uygulama Yeri:</strong> Orta-dış uyluk (<strong>M. vastus lateralis</strong>) derin IM.
                      Subkutan veya deltoid enjeksiyona göre plazma pikine 4 kat daha hızlı ulaşır. Yanıt yetersizse
                      5–15 dakikada bir tekrarlanır.
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                      Eş Zamanlı Kritik Ek Önlemler
                    </span>
                    <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside mt-1.5 leading-relaxed">
                      <li>Şüpheli tetikleyiciyi (antibiyotik, roküronyum, lateks, klorheksidin) derhal durdurun.</li>
                      <li><strong>Trendelenburg / sırtüstü bacak elevasyonu</strong> yapın (ani ayağa kaldırmayın).</li>
                      <li>Antihistaminikler ve kortikosteroidler <strong>ikincildir</strong>; asla adrenalini geciktirmeyin.</li>
                      <li>Seri <strong>Serum Triptaz</strong>: 1. saat, 2–4. saat ve &gt;24. saat bazal örnek alın.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeScenario === 'acls' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-400 block">
                  Erişkin Arrest (AHA ACLS / ERC ALS)
                </span>
                <span className="text-2xl font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 block mt-1">
                  1 mg IV / IO
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  Her <strong>3 – 5 dakikada</strong> bir (1 mL 1:1.000 veya 10 mL 1:10.000) + 20 mL SF flush ve kol
                  elevasyonu. <strong>Şoklanamaz ritimde (PEA/Asistoli)</strong> en kısa sürede;{' '}
                  <strong>VF/pVT'de</strong> 2. defibrilasyon sonrası başlanır.
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 block">
                  Pediatrik Arrest Hesabı ({weightKg} kg — PALS)
                </span>
                <span className="text-2xl font-bold font-mono tabular-nums text-cyan-700 dark:text-cyan-400 block mt-1">
                  {aclsPedsDoseMg.toFixed(2)} mg IV/IO
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 block">
                  = {aclsPedsVol1to10k} mL [1:10.000 çözeltiden]
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  <strong>0.01 mg/kg (10 mcg/kg)</strong> her 3–5 dakikada bir (tek doz tavanı 1 mg). Endotrakeal
                  (IV/IO yoksa): <strong>0.1 mg/kg</strong> (1:1.000'den 0.1 mL/kg).
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                  Kanıt &amp; Perioperatif Not (PARAMEDIC2)
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  PARAMEDIC2 RKÇ (NEJM 2018) adrenalinin ROSC ve 30 günlük sağkalımı artırdığını göstermiştir.
                  Ameliyathanede <strong>invaziv arter diyastolik basıncını &gt; 25–30 mmHg</strong> ve{' '}
                  <strong>EtCO₂ &gt; 10–20 mmHg</strong> tutacak KPR kalitesi esastır; geri döndürülebilir 5H/5T
                  nedenlerini eş zamanlı düzeltin.
                </p>
              </div>
            </div>
          )}

          {activeScenario === 'last' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/25 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'}`}>
                <span className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 block">
                  ASRA 2020 LAST Modifiye ACLS ({weightKg} kg İçin Tavan)
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-rose-700 dark:text-rose-300 mt-1">
                  ≤ {lastMaxBolusMcg} mcg IV
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 ml-2">
                    ({lastBolusVol10McgMl} mL [10 mcg/mL])
                  </span>
                </div>
                <p className="text-rose-900 dark:text-rose-200 mt-2 leading-relaxed">
                  <strong>HAYAT KURTARAN KURAL:</strong> Bupivakain/ropivakain/lidokain toksisitesine bağlı arrestte
                  standart <strong>1 mg Adrenalin VERİLMEZ!</strong> Yüksek doz adrenalin şiddetli pulmoner ödem,
                  refrakter VF tetikler ve <strong>%20 İntralipid</strong> resüsitasyonunun etkinliğini bozar.
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-teal-700 dark:text-teal-400 block">
                  Eş Zamanlı %20 İntralipid Kurtarma Dozu ({weightKg} kg)
                </span>
                <ul className="space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside mt-2 leading-relaxed font-mono tabular-nums">
                  <li>
                    <strong>Bolus (1 dk IV):</strong> {Math.min(100, Math.round(weightKg * 1.5))} mL %20 İntralipid
                    <span className="font-sans"> (1.5 mL/kg; ≥70 kg için 100 mL)</span>
                  </li>
                  <li>
                    <strong>İnfüzyon:</strong> {Math.round(weightKg * 15)} mL/saat
                    <span className="font-sans"> (0.25 mL/kg/dk; ≥70 kg için 1000 mL/saat hızında)</span>
                  </li>
                </ul>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                  Vazopressin, kalsiyum kanal blokerleri, β-blokerler ve lokal anesteziklerden (lidokain dahil) kaçının!
                </p>
              </div>
            </div>
          )}

          {activeScenario === 'push_dose' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-amber-700 dark:text-amber-400 block mb-2">
                    10 mcg/mL Push-Dose Hazırlama (Standart Ameliyathane Metodu)
                  </span>
                  <ol className="space-y-1.5 text-slate-600 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                    <li>
                      <strong>Yöntem 1 (100 mL Torba):</strong> 100 mL %0.9 SF torbasına <strong>1 mg (1 mL)</strong>{' '}
                      Adrenalin ekleyin → <strong>10 mcg/mL</strong>. Bu torbadan 10 mL enjektöre çekin ve etiketleyin.
                    </li>
                    <li>
                      <strong>Yöntem 2 (Çift Seyreltme):</strong> 1 mL Adrenalin (1 mg) + 9 mL SF = 100 mcg/mL (1:10.000);
                      bundan <strong>1 mL</strong> alıp <strong>9 mL SF</strong> içine çekin → <strong>10 mcg/mL</strong>.
                    </li>
                  </ol>
                </div>

                <div className={`p-4 rounded-xl border flex flex-col justify-between ${isDark ? 'bg-slate-800/70 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-2">
                      Hedef Bolus Dozunu Seçin (10 mcg/mL Enjektörden):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[5, 10, 15, 20].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setPushDoseBolusMcg(val)}
                          className={`px-3 py-1.5 text-xs font-mono tabular-nums rounded-lg border cursor-pointer transition-colors ${
                            pushDoseBolusMcg === val
                              ? 'bg-amber-600 text-white border-amber-600 font-bold'
                              : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300'
                              : 'bg-white border-slate-300 text-slate-700'
                          }`}
                        >
                          {val} mcg
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-baseline justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">Enjektörden Verilecek Hacim:</span>
                    <span className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                      {pushDoseVol10McgMl.toFixed(1)} mL IV
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Klinik İpucu:</strong> Push-dose Epinefrin özellikle <strong>hipotansiyon + bradikardi</strong>{' '}
                birlikteliğinde (ör. yüksek spinal blok, vagal refleks) hem kalp hızını hem basıncı aynı anda toplar; taşikardik
                hipotansiyonda ise Push-dose Noradrenalin veya Fenilefrin tercih edilir.
              </p>
            </div>
          )}

          {activeScenario === 'nebulized' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-cyan-700 dark:text-cyan-400 block">
                  Post-Ekstübasyon Stridor / Krup / Laringeal Ödem ({weightKg} kg)
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-cyan-700 dark:text-cyan-400 mt-1">
                  {nebulizedLepiMl.toFixed(1)} mg ({nebulizedLepiMl.toFixed(1)} mL)
                </div>
                <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Rasemik epinefrin yoksa standart <strong>L-Epinefrin (1:1.000 = 1 mg/mL)</strong>{' '}
                  <strong>0.5 mL/kg</strong> (maksimum <strong>5 mL = 5 mg</strong>) dozunda SF ile toplam 5 mL'ye
                  tamamlanarak 6–8 L/dk O₂ ile nebülize edilir.
                </p>
              </div>
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 block">
                  Rebound Ödem &amp; Gözlem Kuralı
                </span>
                <p className="text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Lokal α₁ vazokonstriksiyonu ile 10–30 dakikada mukozal ödemi azaltır; ancak etkisi 2 saat içinde geçip{' '}
                  <strong>rebound stridor</strong> gelişebilir. Mutlaka sistemik <strong>Deksametazon (0.15–0.6 mg/kg IV)</strong>{' '}
                  eklenmeli ve hasta en az <strong>2–4 saat</strong> derlenme/gözlemde tutulmalıdır.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. LOKAL ANESTEZİK KATKISI & TEST DOZU REHBERİ                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Rejyonel Anestezi: Lokal Anestezik Katkısı &amp; Epidural Test Dozu
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-mono tabular-nums font-bold text-teal-700 dark:text-teal-400 text-sm block">
              1:200.000 = 5 mcg/mL
            </span>
            <span className="block font-semibold text-slate-900 dark:text-white mt-1">
              Sinir Blokları &amp; Epidural Test Dozu
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              <strong>Hazırlama:</strong> 20 mL LA içine <strong>0.1 mL (100 mcg)</strong> 1:1.000 Adrenalin. Sistemik
              emilimi yavaşlatır, blok süresini uzatır ve maksimum güvenli LA dozunu artırır. Epidural test dozu (3 mL ={' '}
              <strong>15 mcg Adrenalin</strong>): İntravasküler yerleşimde 60 sn içinde KTA ≥ +10 atım/dk veya SKB ≥
              +15 mmHg artış yapar.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-mono tabular-nums font-bold text-amber-700 dark:text-amber-400 text-sm block">
              1:100.000 = 10 mcg/mL
            </span>
            <span className="block font-semibold text-slate-900 dark:text-white mt-1">
              Lokal İnfiltrasyon &amp; Hemostaz (Jetokain)
            </span>
            <p className="text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
              KBB, plastik cerrahi ve dental infiltrasyonda cerrahi kanamayı azaltmak için kullanılır. Sağlıklı
              erişkinde maksimum total adrenalin sınırı <strong>200 mcg</strong> (20 mL 1:100.000); ciddi koroner
              arter hastalığı veya kontrolsüz hipertansiyonda <strong>≤ 40 mcg</strong> (≤ 4 mL) önerilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/70 border-rose-200'}`}>
            <span className="font-mono tabular-nums font-bold text-rose-700 dark:text-rose-400 text-sm block">
              End-Arteriyel &amp; Beta-Bloker Uyarısı
            </span>
            <span className="block font-semibold text-rose-800 dark:text-rose-300 mt-1">
              Kullanılmaması Gereken Durumlar
            </span>
            <p className="text-rose-900 dark:text-rose-200 mt-1.5 leading-relaxed">
              Penis bloğu, periferik vasküler hastalıklı parmak/ayak ucu, kulak kepçesi ve burun ucu infiltrasyonlarında
              iskemik nekroz riski nedeniyle adrenalin katkısından kaçınılmalıdır. Ayrıca non-selektif β-bloker (ör.
              propranolol) alanlarda yüksek doz emilim hipertansif krize yol açabilir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. FARMAKOKİNETİK & METABOLİZMA (AKORDİYON)                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
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
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span>Farmakokinetik &amp; Farmakodinamik (PK/PD) Özellikleri</span>
                <span className="text-xs font-mono tabular-nums text-amber-700 dark:text-amber-400">
                  t½: 1–2 dk · COMT / MAO
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                IV, IM ve endotrakeal emilim kinetiği; plazma yarı ömrü ve metabolik yan etkilerin fizyolojisi.
              </p>
            </div>
          </div>
          {pkOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  IV Etki Başlangıcı
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1 block">
                  &lt; 1 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Zirve etki: 1–2 dk</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  IM Etki Başlangıcı
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 mt-1 block">
                  3 – 5 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Uyluk IM zirve: ~8 dk</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma Yarı Ömrü
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 mt-1 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Etki süresi: 5–10 dk</span>
              </div>
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Metabolizma
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  COMT + MAO
                </span>
                <span className="text-[10px] text-slate-400">Metanefrin · VMA (İdrar)</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
              isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <p>
                Oral yoldan gastrointestinal mukoza ve karaciğerdeki yoğun MAO/COMT enzimleri nedeniyle tamamen inaktive
                edilir; parenteral veya inhaler uygulanır. Karaciğer, böbrek ve dolaşımdaki dokularda COMT ve MAO ile
                inaktif <strong>metanefrin</strong> ve <strong>vanililmandelik asite (VMA)</strong> metabolize edilir.
                Endojen klirens organ yetmezliğinden bağımsızdır; yanıt hemodinamik hedeflere göre titre edilir.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. ÇÖZELTİ HAZIRLAMA, UYUMLULUK & PERİFERİK DAMAR GÜVENLİĞİ         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Droplet className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Çözelti Stabilitesi, Kimyasal Geçimsizlik &amp; Ekstravazasyon Yönetimi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-5">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Taşıyıcı Sıvı: D5W veya %0.9 SF</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>%5 Dextroz (D5W)</strong>, D5W + %0.9 SF veya acilde <strong>%0.9 NaCl (SF)</strong> içinde
              hazırlanır. Sürekli infüzyonda 24 saatte bir yenilenmelidir. Işık ve hava temasıyla hızla oksitlenip{' '}
              <strong>pembe / kahverengi adrenokroma</strong> dönüşür; renklenmiş çözelti derhal imha edilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'}`}>
            <h4 className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Alkali Geçimsizlik: NaHCO₃ Yasağı</span>
            </h4>
            <p className="text-rose-900 dark:text-rose-200 leading-relaxed">
              <strong>%8.4 Sodyum Bikarbonat (NaHCO₃)</strong>, aminofilin, furosemid ve tiyopental ile{' '}
              <strong>ASLA aynı Y-port/lümenden</strong> verilmez! Alkali pH adrenalini saniyeler içinde inaktive eder.
              KPR sırasında bikarbonat verilecekse öncesinde ve sonrasında hat SF ile yıkanmalıdır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Damar Yolu Tercihi</span>
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Uzun süreli sürekli infüzyonda <strong>Santral Venöz Kateter (SVK)</strong> esastır. Acilde SVK
              beklenirken antekübital veya önkol geniş periferik venlerinden (≥ 20G) düşük konsantrasyon (10–16 mcg/mL)
              geçici olarak başlanabilir.
            </p>
          </div>
        </div>

        {/* Ekstravazasyon Akordiyonu */}
        <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
          <button
            type="button"
            onClick={() => setExtravasationOpen(!extravasationOpen)}
            aria-expanded={extravasationOpen}
            className={`w-full p-4 flex items-center justify-between text-left cursor-pointer transition-colors ${
              isDark ? 'bg-slate-800/60 hover:bg-slate-800' : 'bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-300">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>Ekstravazasyon Geliştiğinde Acil Fentolamin Kurtarma Protokolü (12 Saat İçinde)</span>
            </div>
            {extravasationOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {extravasationOpen && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs border-t border-slate-200 dark:border-slate-700">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">1. Durdur &amp; Aspire Et</span>
                İnfüzyonu hemen kapatın; kanülü çekmeden önce enjektörle kanül içindeki/dokudaki ilacı aspire edin.
              </div>
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">2. Antidot: Fentolamin</span>
                <strong>5 – 10 mg Fentolamin</strong>, 10–15 mL SF içinde seyreltilir (veya yoksa topikal %2 Nitrogliserin).
              </div>
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">3. Subkutan İnfiltrasyon</span>
                25–27G ince iğne ile soluk/soğuk alan çevresine çoklu noktadan SC enjekte edin (hiperemi sağlanana dek).
              </div>
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="font-bold block text-rose-600 dark:text-rose-400 mb-1">4. Elevasyon &amp; Sıcaklık</span>
                Ekstremiteyi eleve edin, kuru ılık kompres uygulayın. <strong>SOĞUK / BUZ ASLA KULLANMAYIN!</strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. YAN ETKİLER, METABOLİK ETKİLER & İLAÇ ETKİLEŞİMLERİ              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <HeartPulse className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Kardiyovasküler, Metabolik Yan Etkiler &amp; İlaç Etkileşimleri
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs mb-5">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Tip-B Laktat Artışı (Yalancı Hipoperfüzyon)
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              β₂ stimülasyonu ile kas/karaciğerde aerobik glikoliz hızlanır ve laktat 2–5 mmol/L yükselebilir. Bu durum
              her zaman doku hipoksisi değildir; ScvO₂, kapiller dolum ve idrar çıkışı ile birlikte yorumlanmalıdır.
            </p>
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Hipokalemi &amp; Hiperglisemi
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              β₂ aracılı Na⁺/K⁺-ATPaz aktivasyonu potasyumu hızla hücre içine kaydırarak <strong>hipokalemi</strong> ve
              aritmi eşiğini düşürür. Glikojenoliz ve insülin baskılanması nedeniyle kan şekeri yükselir.
            </p>
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Taşiaritmi &amp; Miyokard İskemisi
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Sinüs taşikardisi, ventriküler ektopi, AF, VT/VF tetikleyebilir. Kalp hızı ve kontraktilite artışı
              miyokardiyal oksijen ihtiyacını (MVO₂) belirgin yükselterek KAH hastalarında iskemiyi provoke edebilir.
            </p>
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">
              Asidozda Katekolamin Direnci
            </span>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Şiddetli asidemide (pH &lt; 7.15) adrenerjik reseptör afinitesi düşer; yüksek doz adrenaline rağmen
              hemodinamik yanıt alınamaz (ventilasyon ve asit-baz düzeltilmesi gerekir).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs leading-relaxed">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              Non-Selektif Beta-Blokerler (Propranolol)
            </span>
            β₁ ve β₂ reseptörleri bloke olduğu için adrenalinin α₁ vazokonstriktör etkisi <em>karşılanmamış</em>{' '}
            kalır → şiddetli hipertansif kriz ve refleks bradikardi! Anafilakside adrenalin direnci gelişirse{' '}
            <strong>Glukagon 1–5 mg IV</strong> verilir.
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              Halojenli İnhalasyon Anestezikleri
            </span>
            Miyokardı katekolamin kaynaklı ventriküler aritmilere duyarlı hale getirir (Halotan &gt; İzofluran &gt;
            Sevofluran/Desfluran). KBB infiltrasyonlarında total doz sınırına mutlaka uyulmalıdır.
          </div>
          <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
            <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
              MAOI / TCA / Kokain Toksisitesi
            </span>
            Nöronal geri alım veya yıkım bloke olduğundan katekolamin etkisi katlanarak artar; şiddetli hipertansiyon
            ve malign aritmi gelişebilir.
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. KLİNİK KARŞILAŞTIRMA & ANESTEZİST İNCİLERİ                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Kritik Klinik İnciler &amp; Adrenalin vs Noradrenalin Seçimi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1.5">
              1. Septik Şokta Neden 1. Basamak Noradrenalin, 2. Basamak Adrenalin?
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              CATS RKÇ (Annane et al., Lancet 2007) mortalitede benzer sonuç verse de adrenalin kolunda{' '}
              <strong>geçici laktik asidoz, taşiaritmi ve insülin direnci</strong> belirgin yüksek bulunmuştur. SSC
              2021 kılavuzu septik şokta özellikle <strong>düşük kardiyak debinin eşlik ettiği</strong> durumlarda
              adrenalini 2. veya 3. basamak ek ajan (veya dobutamin + noradrenalin alternatifi) olarak önerir.
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1.5">
              2. Anafilakside Tek Mutlak Birinci Tercih: Adrenalin
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Noradrenalin sadece α₁ ile vazokonstriksiyon yapar; oysa anafilakside mast hücre/bazofil medyatör
              salınımını (β₂ ile cAMP artırarak) durduran, bronkospazmı ve laringeal ödemi çözen tek ajan{' '}
              <strong>Adrenalindir</strong>. Gecikmiş adrenalin anafilaksi ölümlerinin bir numaralı nedenidir.
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1.5">
              3. Kardiyak Cerrahi &amp; Post-KPB Düşük Debi Sendromu
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Kardiyopulmoner baypas (KPB) çıkışında düşük doz adrenalin (<strong>0.02–0.08 mcg/kg/dk</strong>),
              hem sağ/sol ventrikül kontraktilitesini artırır hem de hafif vazotonus sağlar. Aşırı taşikardi gelişirse
              Milrinon + Noradrenalin kombinasyonuna geçilir.
            </p>
          </div>
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <span className="font-bold text-amber-700 dark:text-amber-400 block mb-1.5">
              4. İnfüzyon Sırasında Elektrolit &amp; Asit-Baz Takibi
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Sürekli infüzyon başlanan hastalarda kan gazında <strong>K⁺ düşüşü</strong> (hipokalemi) ve{' '}
              <strong>glukoz yüksekliği</strong> sık görülür; K⁺ takibi yapılmadan β-agonist yüklemesi aritmi
              eşiklerini tehlikeli biçimde düşürür.
            </p>
          </div>
        </div>
      </section>

      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Hayati tehlike oluşturan ANAFİLAKSİ ve KARDİYAK ARRESTTE hiçbir mutlak kontrendikasyon YOKTUR.',
          'Parmağa, buruna, kulak kepçesine veya penise yapılan lokal anestezik enjeksiyonlarında adrenalinli solüsyonlar doku nekrozu riski nedeniyle kullanılmamalıdır (elektif dijital blok).',
        ]}
        relativeItems={[
          'Ciddi koroner arter hastalığı, hipertrofik obstrüktif kardiyomiyopati (HOCM) ve feokromositoma krizi.',
          'Non-selektif beta-bloker (ör. Propranolol) veya kokain/MAOI entoksikasyonu: Karşılanmamış α₁ vazokonstriksiyon hipertansif krizi tetikleyebilir.',
          'Dar açılı glokom ve kontrolsüz tirotoksikoz (sempatomimetik aşırı duyarlılık).',
        ]}
        clinicalNote="Anafilakside beta-bloker kullanan hastada adrenalin yanıtı yetersiz kalırsa 1–5 mg IV Glukagon eklenmelidir. LAST arrestinde standart 1 mg IV yerine ≤ 1 mcg/kg modifiye doz uygulanır."
      />

      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Organ-bağımsız klirens: Böbrek yetmezliğinde veya diyaliz hastalarında doz azaltımı gerekmez."
        renalDetails={[
          'Epinefrin COMT ve MAO enzimleriyle dokularda hızla inaktif metanefrin ve VMA metabolitlerine yıkılır.',
          'İnfüzyon sırasında hipokalemi (β₂ ile hücre içine K⁺ kayması) böbrek yetmezliği olan hastada aritmi eşiğini hızla değiştirebilir; kan gazında K⁺ izlenmelidir.',
        ]}
        hepaticSummary="Karaciğer yetmezliğinde (Child-Pugh A/B/C) başlangıç doz revizyonu gerekmez; metabolizma ekstrahepatik COMT/MAO ile sürer."
        hepaticDetails={[
          'Karaciğer hastalığında β₂ aracılı glikojenoliz ve laktat klirensi yavaşladığından Tip-B laktat artışı daha belirgin ve uzun sürebilir.',
          'Hedef MAP ve kardiyak debi yanıtına göre klinik titre edilir.',
        ]}
      />

      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="FDA Gebelik Kategorisi C · Gebelikte anafilaksi ve kardiyak arrestte İLK VE MUTLAK TERCİH adrenalin verilmesidir."
        pregnancyDetails={[
          'Maternal hipotansiyon ve hipoksi fetüste anında fatal bradikardi yapar; gebede anafilakside 0.5 mg IM adrenalin geciktirilmemelidir.',
          'Yüksek doz sürekli infüzyon uterin arter α₁ vazokonstriksiyonu ile plasental akımı azaltabileceğinden maternal stabilize olur olmaz en düşük etkin doza titre edilmelidir.',
        ]}
        lactationSummary="Plazma yarı ömrü 1–2 dakika, oral biyoyararlanımı ~0% olduğu için emzirmeye güvenle devam edilebilir."
        lactationDetails={[
          'Oral alımda GI mukozada hızla yıkıldığı için anne sütüyle infantta sistemik etki oluşturmaz.',
          'Anne acil müdahale sonrası stabil hale geldiğinde sütün dökülmesi ("pump & dump") gerekmez.',
        ]}
      />

      <HighAlertSafetyBlock
        isDark={isDark}
        tallManName="EPINEPHrine"
        confusionRiskWith="NORepinephrine / Ephedrine"
        criticalAlerts={[
          '1:1.000 (1 mg/mL) ampuller Türkiye kliniklerinde 0.25 mg, 0.5 mg ve 1 mg olmak üzere hep 1 mL hacmindedir — puşe öncesi etiket mutlaka okunmalıdır.',
          '1:1.000 konsantre ampulün doğrudan IV puşesi anafilakside fatal aritmi ve pulmoner ödem yapar; IV kullanım için 1:10.000 (100 mcg/mL) veya Push-Dose (10 mcg/mL) olarak seyreltilmelidir.',
          'Alkali çözeltilerle (NaHCO₃) aynı lümenden verilmez; oksidasyonla pembe/kahverengi adrenokroma dönen çözeltiler imha edilir.',
        ]}
        antidoteOrRescue="Ekstravazasyonda 12 saat içinde 5–10 mg Fentolamin SC infiltrasyon (veya %2 Nitrogliserin). Sistemik hipertansif kriz/taşiaritmi için kısa etkili α-bloker (Fentolamin) veya esmolol/labetalol titre edilir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. KANITA DAYALI KAYNAKÇA                                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Adrenalin (Epinefrin)"
        references={[
          {
            authors: 'Panchal AR, Bartos JA, Cabañas JG, et al.',
            title: '2020 AHA Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care: Adult Basic and Advanced Life Support.',
            journal: 'Circulation',
            year: 2020,
            pmid: '33081529',
            doi: '10.1161/CIR.0000000000000916',
            note: 'ACLS arrestte 3–5 dakikada bir 1 mg IV/IO epinefrin protokolü.',
          },
          {
            authors: 'Perkins GD, Ji C, Deakin CD, et al. (PARAMEDIC2)',
            title: 'A Randomized Trial of Epinephrine in Out-of-Hospital Cardiac Arrest.',
            journal: 'N Engl J Med',
            year: 2018,
            pmid: '30021076',
            doi: '10.1056/NEJMoa1806842',
            note: '8.014 hastada ROSC ve 30 günlük sağkalım üzerine epinefrin RKÇ verileri.',
          },
          {
            authors: 'Harper NJN, Cook TM, Garcez T, et al. (NAP6)',
            title: 'Anaesthesia, surgery, and life-threatening allergic reactions: perioperative anaphylaxis in NAP6.',
            journal: 'Br J Anaesth',
            year: 2018,
            pmid: '29935569',
            doi: '10.1016/j.bja.2018.04.015',
            note: 'Perioperatif anafilakside erken IV/IM adrenalin ve sıvı resüsitasyonu standartları.',
          },
          {
            authors: 'Annane D, Vignon P, Renault A, et al. (CATS Study Group)',
            title: 'Norepinephrine plus dobutamine versus epinephrine alone for management of septic shock: a randomised trial.',
            journal: 'Lancet',
            year: 2007,
            pmid: '17720019',
            doi: '10.1016/S0140-6736(07)61344-0',
            note: 'Septik şokta adrenalin kolunda görülen geçici Tip-B laktat artışı ve mortalite karşılaştırması.',
          },
          {
            authors: 'Neal JM, Neal EJ, Weinberg GL (ASRA LAST 2020)',
            title: 'American Society of Regional Anesthesia and Pain Medicine Local Anesthetic Systemic Toxicity checklist: 2020 version.',
            journal: 'Reg Anesth Pain Med',
            year: 2021,
            pmid: '33148630',
            doi: '10.1136/rapm-2020-101986',
            note: 'LAST resüsitasyonunda modifiye düşük doz (≤ 1 mcg/kg) epinefrin kuralı.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/epinephrine.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};

export default EpinephrineProtocol;
