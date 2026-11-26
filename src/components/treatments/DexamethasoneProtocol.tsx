import React, { useState, useId } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  Info,
  Layers,
  RotateCcw,
  Scale,
  ShieldCheck,
  Syringe,
  Wind,
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

interface Props {
  isDark: boolean;
}

type CalcScenario =
  | 'ponv_analgesia'
  | 'airway_croup'
  | 'neuro_meningitis'
  | 'ards_covid'
  | 'steroid_converter';
type PonvRegimen = 'standard_4mg' | 'multimodal_8mg';
type AirwayMode = 'adult_stridor' | 'pediatric_croup';
type NeuroMode = 'tumor_edema' | 'bacterial_meningitis';
type RespMode = 'covid_recovery' | 'ards_dexa';

export const DexamethasoneProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [scenario, setScenario] = useState<CalcScenario>('ponv_analgesia');

  // 1. PONV & PNB Adjuvan State'leri
  const [weightKg, setWeightKg] = useState<number>(70);
  const [ponvRegimen, setPonvRegimen] = useState<PonvRegimen>('standard_4mg');

  // 2. Post-Ekstübasyon Stridor / Pediatrik Krup State'leri
  const [airwayMode, setAirwayMode] = useState<AirwayMode>('adult_stridor');
  const [croupWeightKg, setCroupWeightKg] = useState<number>(15);

  // 3. Vazojenik Beyin Ödemi & Bakteriyel Menenjit State'leri
  const [neuroMode, setNeuroMode] = useState<NeuroMode>('tumor_edema');
  const [meningitisWeightKg, setMeningitisWeightKg] = useState<number>(70);

  // 4. COVID-19 (RECOVERY) & ARDS (DEXA-ARDS) State'leri
  const [respMode, setRespMode] = useState<RespMode>('covid_recovery');

  // 5. Kortikosteroid Eşdeğerlik Dönüştürücü State'i
  const [converterDexMg, setConverterDexMg] = useState<number>(8);

  // Akordiyon State'i
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik Kimlikleri
  const ponvWeightSliderId = useId();
  const ponvWeightInputId = useId();
  const croupWeightSliderId = useId();
  const croupWeightInputId = useId();
  const meningitisWeightSliderId = useId();
  const meningitisWeightInputId = useId();
  const converterInputId = useId();

  // --- HESAPLAMALAR (TR Ampul: 8 mg / 2 mL = 4 mg/mL) ---
  const AMP_CONC_MG_ML = 4.0; // 8 mg / 2 mL = 4 mg/mL

  // 1. PONV & PNB Adjuvanı
  const isPediatricPonv = weightKg < 40;
  const ponvAdultDoseMg = ponvRegimen === 'standard_4mg' ? 4 : 8;
  const ponvPedDoseMg = Math.min(Number((weightKg * 0.15).toFixed(2)), ponvRegimen === 'standard_4mg' ? 4 : 8);
  const ponvFinalDoseMg = isPediatricPonv ? ponvPedDoseMg : ponvAdultDoseMg;
  const ponvVolumeMl = ponvFinalDoseMg / AMP_CONC_MG_ML;
  const ponvDosePerKg = weightKg > 0 ? ponvFinalDoseMg / weightKg : 0;

  // 2. Pediatrik Krup (0,6 mg/kg, maks 16 mg)
  const croupDoseMg = Math.min(Number((croupWeightKg * 0.6).toFixed(1)), 16);
  const croupVolumeMl = croupDoseMg / AMP_CONC_MG_ML;

  // 3. Bakteriyel Menenjit (0,15 mg/kg q6h, maks 10 mg q6h × 4 gün)
  const meningitisSingleDoseMg = Math.min(Number((meningitisWeightKg * 0.15).toFixed(1)), 10);
  const meningitisSingleMl = meningitisSingleDoseMg / AMP_CONC_MG_ML;
  const meningitisDailyMg = meningitisSingleDoseMg * 4;

  // 5. Kortikosteroid Eşdeğerlik Dönüştürücü
  // 0,75 mg Deksametazon = 20 mg Hidrokortizon = 5 mg Prednizolon = 4 mg Metilprednizolon
  const eqHydrocortisoneMg = converterDexMg * (20 / 0.75); // ×26.67
  const eqPrednisoloneMg = converterDexMg * (5 / 0.75); // ×6.67
  const eqMethylpredMg = converterDexMg * (4 / 0.75); // ×5.33

  // Kopyalanacak Canlı Özet Metni
  const buildCopySummary = (): string => {
    const activeCalcLine = (() => {
      if (scenario === 'ponv_analgesia') {
        return isPediatricPonv
          ? `• Aktif Hesaplama (Pediatrik PONV/Analjezi, ${weightKg} kg): 0,15 mg/kg = ${ponvFinalDoseMg.toFixed(
              2
            )} mg IV (${ponvVolumeMl.toFixed(2)} mL [8 mg/2 mL ampulden]) — İndüksiyondan hemen sonra yavaş IV`
          : `• Aktif Hesaplama (Yetişkin ${
              ponvRegimen === 'standard_4mg' ? 'Standart PONV' : 'PONV + Multimodal Analjezi / PNB Adjuvanı'
            }, ${weightKg} kg): ${ponvFinalDoseMg} mg IV (${ponvVolumeMl.toFixed(1)} mL [4 mg/mL]) (${ponvDosePerKg.toFixed(
              2
            )} mg/kg) — İndüksiyon sonrası`;
      }
      if (scenario === 'airway_croup') {
        return airwayMode === 'adult_stridor'
          ? `• Aktif Rejim (YBÜ Post-Ekstübasyon Stridor): Ekstübasyondan 4–12 saat önce başlayarak 4–5 mg IV q6h (1,0–1,25 mL) veya 8 mg IV q12h (2,0 mL), toplam 2–4 doz`
          : `• Aktif Hesaplama (Pediatrik Krup, ${croupWeightKg} kg): 0,6 mg/kg = ${croupDoseMg.toFixed(
              1
            )} mg tek doz IV/IM/PO (${croupVolumeMl.toFixed(2)} mL [4 mg/mL], maks 16 mg)`;
      }
      if (scenario === 'neuro_meningitis') {
        return neuroMode === 'tumor_edema'
          ? `• Aktif Rejim (Vazojenik Beyin Tümörü Ödemi): 10 mg IV yükleme (2,5 mL), ardından 4 mg IV q6h (1,0 mL) — DİKKAT: Travmatik Beyin Hasarında (TBH) KONTRENDİKEDİR (CRASH)!`
          : `• Aktif Hesaplama (Bakteriyel Menenjit, ${meningitisWeightKg} kg): 0,15 mg/kg = ${meningitisSingleDoseMg.toFixed(
              1
            )} mg IV q6h (${meningitisSingleMl.toFixed(2)} mL, günlük ${meningitisDailyMg.toFixed(
              1
            )} mg) × 4 gün — İlk antibiyotik dozundan 15–20 dk önce!`;
      }
      if (scenario === 'ards_covid') {
        return respMode === 'covid_recovery'
          ? `• Aktif Rejim (Ağır COVID-19 Pnömonisi, RECOVERY): 6 mg/gün IV/PO (1,5 mL = 0,75 ampul) × 10 gün (Yalnızca O₂ veya MV gerektiren hastalarda!)`
          : `• Aktif Rejim (Orta-Ağır ARDS, DEXA-ARDS): 1.–5. gün 20 mg/gün IV (5,0 mL = 2,5 ampul), 6.–10. gün 10 mg/gün IV (2,5 mL = 1,25 ampul)`;
      }
      return `• Steroid Eşdeğerliği (${converterDexMg} mg Deksametazon): Hidrokortizon ${eqHydrocortisoneMg.toFixed(
        0
      )} mg | Prednizolon ${eqPrednisoloneMg.toFixed(1)} mg | Metilprednizolon ${eqMethylpredMg.toFixed(1)} mg (MK: 0)`;
    })();

    return [
      `DEKSAMETAZON SODYUM FOSFAT (TR Ampul: 8 mg / 2 mL = 4 mg/mL — Dekort® / Onadron®) KLİNİK ÖZETİ`,
      `• Farmakolojik Profil: 25–30× Ultra-Potent Saf Glukokortikoid · Mineralokortikoid = 0 · Biyolojik Etki: 36–72 saat`,
      activeCalcLine,
      `• Eşdeğerlik Kuralı: 0,75 mg Deksametazon = 4 mg Metilprednizolon = 5 mg Prednizolon = 20 mg Hidrokortizon`,
      `• Kritik Güvenlik: Uyanık hastada hızlı IV puşe şiddetli perineal yanma yapar (indüksiyonda veya 50–100 mL SF ile 10–15 dk infüzyonla verin). TBH'de (CRASH) ve tanısız hematolojik malignitede (TLS riski) kullanılmaz!`,
    ].join('\n');
  };

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
        tallManName="DEXAMETHASONE"
        confusionRiskWith="Deksmedetomidin (Precedex — LASA!) · Hidrokortizon (25–30× daha zayıf, 1:1 mineralokortikoid) · Metilprednizolon (Prednol — 5× daha zayıf)"
        criticalAlerts={[
          '25–30× Ultra-Potent Saf Glukokortikoid & 0 Mineralokortikoid: 0,75 mg Deksametazon = 4 mg Metilprednizolon = 20 mg Hidrokortizon! Mineralokortikoid aktivitesi SIFIR (0) olduğundan primer adrenal kriz (Addison) veya refrakter septik şok tedavisinde Hidrokortizon yerine kullanılmaz (sadece tanısal ACTH stimülasyon testi öncesi kortizol ölçümünü bozmamak için geçici olarak tercih edilebilir).',
          'Uyanık Hastada Hızlı IV Puşe → Şiddetli Perineal/Genital Yanma: Deksametazon sodyum fosfat (fosfat esteri) uyanık hastada hızlı IV verildiğinde 30–60 sn içinde çok şiddetli perineal/anogenital yanma ve kaşıntı yapar! PONV için daima anestezi indüksiyonundan hemen sonra veya uyanık hastada 50–100 mL SF içinde 10–15 dk infüzyonla verilmelidir.',
          'Pediatrik / Onkolojik Tümör Lizis Sendromu (TLS) Tuzağı: Tanısı kesinleşmemiş mediastinal kitle, lösemi veya lenfoma şüphesi olan hastada ampirik tek doz deksametazon bile ani tümör lizis sendromu (hiperkalemi, hiperfosfatemi, ABH) tetikleyebilir!',
          'Perinöral Kullanım (Off-Label) & Koruyucusuz Çözelti Kuralı: Periferik sinir bloğu (PNB) adjuvanı olarak perinöral verilecekse yalnızca koruyucusuz (preservative-free) ampul kullanılmalıdır; kaldı ki 4–8 mg IV sistemik Deksametazon perinöral uygulamaya neredeyse eşdeğer blok uzaması (+6–8 saat) sağladığından pratikte IV yol daha güvenlidir!',
        ]}
        antidoteOrRescue="Akut Perineal Yanma/Kaşıntı (uyanık hastada hızlı IV puşe): Enjeksiyonu yavaşlatın/durdurun (1–2 dk içinde kendiliğinden geçer; önlemek için daima indüksiyon sonrası veya 5–10 dk sulandırılmış yavaş infüzyonla verin!). Akut Hiperglisemi: IV insülin protokolü (hedef 140–180 mg/dL). Tümör Lizis Sendromu (hematolojik malignite): Hidrasyon + Rasburikaz/Allopurinol."
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
              <span className="font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Ultra-Potent Sentetik Glukokortikoid (25–30× · Mineralokortikoid = 0)
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                TR Ampul: 8 mg / 2 mL (4 mg/mL) — Dekort® / Onadron®
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Biyolojik Etki: 36 – 72 Saat (Uzun Etkili)
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: H02AB02</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Deksametazon Sodyum Fosfat (Dekort® / Onadron® / Deksamet®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong>{' '}
              C9-flor ve C16-α-metil modifikasyonu sayesinde kortizole göre <strong>25–30 kat daha potent</strong>{' '}
              anti-inflamatuar aktivite gösteren, <strong>mineralokortikoid etkisi sıfır (0)</strong> olan uzun etkili
              sentetik glukokortikoiddir. Ameliyathanede PONV profilaksisi, multimodal analjezi ve periferik sinir bloğu
              adjuvanı olarak; YBÜ&apos;de ise vazojenik beyin ödemi, bakteriyel menenjit, post-ekstübasyon hava yolu
              ödemi, ağır COVID-19 (RECOVERY) ve orta-ağır ARDS (DEXA-ARDS) yönetiminde temel ajandır.
            </p>
          </div>

          <div className="shrink-0">
            <MonographCopyButton
              isDark={isDark}
              label="Monografi Özeti Kopyala"
              getText={buildCopySummary}
            />
          </div>
        </div>

        {/* Yatak Başı Klinik Etki Mekanizması (#sec-etki) — 3 Konsantre Kart */}
        <div id="sec-etki" className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-200' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>PONV Profilaksisi &amp; Multimodal Analjezi</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15 shrink-0">4–8 mg IV İndüksiyonda</span>
            </div>
            <p className="text-xs leading-relaxed">
              Gan 2020 kılavuzu <strong>1A önerisi</strong>; 4 mg IV PONV riskini %25–30 azaltır,{' '}
              <strong>0,1–0,2 mg/kg (8 mg)</strong> postoperatif ağrı, opioid tüketimi ve PNB süresini (+6–8 saat)
              anlamlı uzatır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <Brain className="w-4 h-4 shrink-0" />
                <span>Saf Anti-Ödem Etki (0 Mineralokortikoid)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15 shrink-0">Beyin &amp; Hava Yolu Ödemi</span>
            </div>
            <p className="text-xs leading-relaxed">
              Sodyum/su tutulumu yapmadığı için <strong>vazojenik beyin tümörü ödeminde</strong>, post-ekstübasyon
              laringeal ödem/stridorda ve akut bakteriyel menenjitte altın standart steroiddir.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Uzun Biyolojik Etki (36–72 Saat)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/15 shrink-0">Tek Doz Konfor · Uzun HPA Baskısı</span>
            </div>
            <p className="text-xs leading-relaxed">
              Plazma t½ <strong>3–4,5 saat</strong> olmasına rağmen yüksek GR-α afinitesi sayesinde doku biyolojik
              etkisi <strong>36–72 saat</strong> sürer; ağır COVID-19 (<strong>6 mg × 10 gün</strong>) ve ARDS&apos;de
              (<strong>20 → 10 mg</strong>) günde tek doz yeterlidir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK (ADME) ÖZELLİKLERİ AKORDİYONU (#sec-pkpd)         */}
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  Plazma t½: 3–4,5 sa · Biyolojik Etki: 36–72 sa · CYP3A4
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Onset 1–2 saat (indüksiyonda uygulama gerekçesi), yalnızca albümin bağlanması (CBG&apos;ye bağlanmaz), CYP3A4 metabolizması ve 11β-HSD2 direnci.
              </p>
            </div>
          </div>
          {pkOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Başlangıcı (Onset)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  1 – 2 Saat
                </span>
                <span className="text-[10px] text-slate-400">PONV için indüksiyonda verilir!</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma Yarı Ömrü (t½)
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  3 – 4,5 Saat
                </span>
                <span className="text-[10px] text-slate-400">Esteraz hidrolizi &lt;10 dk</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Biyolojik Etki Süresi
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  36 – 72 Saat
                </span>
                <span className="text-[10px] text-slate-400">Uzun etkili · Tek doz konfor</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma Protein Bağlanması
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  ~%77
                </span>
                <span className="text-[10px] text-slate-400">Yalnızca Albümin (CBG = 0!)</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Protein Bağlanması (CBG&apos;ye Bağlanmama Özelliği) &amp; Erken İndüksiyon Gerekçesi:
                </strong>{' '}
                Endojen kortizolün aksine Deksametazon, <strong>CBG (Transkortin)&apos;e BAĞLANMAZ</strong>; plazmada
                yaklaşık <strong>%77</strong> oranında yalnızca <strong>albümine</strong> bağlanır. Bu sayede geniş
                doz aralığında doğrusal (lineer) farmakokinetik sergiler ve yüksek serbest fraksiyonla dokulara hızlı
                geçer. Deksametazon sodyum fosfat ön-ilacı IV uygulama sonrası fosfatazlarla dakikalar içinde aktif
                deksametazona dönüşse de, antiemetik ve anti-inflamatuar etkisinin genomik bileşeni{' '}
                <strong>1–2 saatte</strong> ortaya çıktığı için PONV profilaksisinde operasyon sonunda değil{' '}
                <strong>anestezi indüksiyonundan hemen sonra</strong> verilmesi zorunludur.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Metabolizma (CYP3A4) &amp; Plasental 11β-HSD2 Direnci:
                </strong>{' '}
                Karaciğerde primer olarak <strong>CYP3A4</strong> enzimiyle <strong>6β-hidroksilasyon</strong> ve
                ardından <strong>glukuronidasyon/sülfatasyon</strong> ile inaktif metabolitlere dönüştürülerek büyük
                oranda idrarla atılır (güçlü CYP3A4 indükleyicileri klirensi belirgin hızlandırır!). C9-flor ve
                C16-metil grupları sayesinde plasental <strong>11β-HSD2</strong> enzimi tarafından inaktive edilemez;
                dolayısıyla <strong>plasentayı aktif olarak geçer</strong> (fetal akciğer matürasyonunda avantaj,
                maternal adrenal krizde ise dezavantajdır).
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
          'Sistemik kontrolsüz fungal enfeksiyonlar (invaziv kandidiyazis, aspergilloz, mukormikoz vb. — yaşamı tehdit eden acil durumlar hariç).',
          'Deksametazon veya ampul bileşenlerine (sülfit, metil/propilparaben veya benzil alkol içeren koruyuculu formlar) bilinen aşırı duyarlılık.',
          'Canlı veya canlı-atenüe aşı uygulaması (immünsüpresif sistemik steroid rejimleri sırasında disemine enfeksiyon riski).',
          'Serebral malarya (mortaliteyi artırdığı ve koma süresini uzattığı kanıtlanmıştır).',
        ]}
        relativeTitle="Göreceli Kontrendikasyonlar & Dikkat Edilecek Durumlar"
        relativeItems={[
          'Travmatik Beyin Hasarı (TBH): TBH’de yüksek doz steroid KONTRENDİKEDİR (CRASH Trial: 14 günlük mortalitede anlamlı artış!). Deksametazon yalnızca tümör/metastaz kaynaklı vazojenik beyin ödeminde kullanılır.',
          'Tanısız hematolojik malignite / mediastinal kitle şüphesi: Ampirik tek doz deksametazon bile ani Tümör Lizis Sendromu (TLS: hiperkalemi, hiperfosfatemi, ABH) tetikleyebilir ve biyopsi tanısını maskeleyebilir!',
          'Kontrolsüz ağır diyabet / hiperglisemi: Tek doz 8 mg IV bile postoperatif kan şekerini 30–50 mg/dL artırabilir; insüline bağımlı/kötü kontrollü diyabette yakın glisemi izlemi ve gerekirse 4 mg doz veya alternatif antiemetik seçilmelidir.',
          'Aktif peptik ülser veya yakın dönem üst GİS kanama: Stres ülser profilaksisi (IV/PO PPI) eşzamanlı uygulanmalıdır.',
          'Primer adrenal kriz (Addison) & Refrakter septik şok: Mineralokortikoid aktivitesi SIFIR (0) olduğundan intravasküler Na⁺/volüm desteği sağlamaz; bu tablolarda Hidrokortizon tercih edilmelidir.',
        ]}
        clinicalNote="Travmatik Beyin Hasarı (TBH) ile beyin tümörü kaynaklı vazojenik ödem mutlaka ayırt edilmelidir: Deksametazon tümör ödeminde altın standartken, akut TBH'de mortaliteyi artırdığı için (CRASH) kesinlikle kullanılmaz!"
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
          <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Endikasyonlar &amp; Klinik Kanıt (Gan 2020 · RECOVERY · DEXA-ARDS)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. PONV Profilaksisi & Multimodal Analjezi / PNB Adjuvanı */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                <span>1. PONV Profilaksisi &amp; Multimodal Analjezi / PNB Adjuvanı</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                Gan 2020 · Kanıt 1A
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yetişkin <strong className="font-mono text-slate-900 dark:text-white">4–8 mg IV</strong> (anestezi
              indüksiyonundan hemen sonra); Pediatrik{' '}
              <strong className="font-mono text-slate-900 dark:text-white">0,15 mg/kg IV</strong> (maks{' '}
              <strong className="font-mono">4–8 mg</strong>).{' '}
              <strong className="font-mono">0,1–0,2 mg/kg (8 mg)</strong> ek olarak postoperatif ağrıyı ve opioid
              tüketimini azaltır, periferik sinir bloğu (PNB) süresini{' '}
              <strong className="font-mono">6–8 saat</strong> uzatır.
            </p>
          </div>

          {/* 2. Vazojenik Beyin Ödemi & Bakteriyel Menenjit */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-amber-500 shrink-0" />
                <span>2. Vazojenik Beyin Ödemi &amp; Bakteriyel Menenjit</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                10 mg IV Yükleme / q6h
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Kranial Tümör / Metastaz Ödemi:</strong>{' '}
              <strong className="font-mono text-slate-900 dark:text-white">10 mg IV</strong> yükleme, ardından{' '}
              <strong className="font-mono text-slate-900 dark:text-white">4 mg IV q6h</strong> (dikkat: TBH&apos;de
              KULLANILMAZ!). <strong>Akut Bakteriyel Menenjit (Pnömokok):</strong> İlk antibiyotik dozundan{' '}
              <strong>15–20 dk önce</strong> veya eşzamanlı{' '}
              <strong className="font-mono text-slate-900 dark:text-white">0,15 mg/kg</strong> (yetişkin{' '}
              <strong className="font-mono">10 mg</strong>) <strong className="font-mono">IV q6h × 4 gün</strong>.
            </p>
          </div>

          {/* 3. Post-Ekstübasyon Hava Yolu Ödemi / Stridor & Pediatrik Krup */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>3. Post-Ekstübasyon Stridor &amp; Pediatrik Krup</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                4–5 mg q6h · Krup 0,6 mg/kg
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Kaçak testi (<em>cuff-leak</em>) negatif yüksek riskli YBÜ hastasında ekstübasyondan{' '}
              <strong>4–12 saat önce</strong> başlayarak{' '}
              <strong className="font-mono text-slate-900 dark:text-white">4–5 mg IV q6h</strong> (veya{' '}
              <strong className="font-mono">8 mg q12h</strong>, toplam 2–4 doz). <strong>Pediatrik Krup:</strong>{' '}
              <strong className="font-mono text-slate-900 dark:text-white">0,6 mg/kg</strong> (maks{' '}
              <strong className="font-mono">16 mg</strong>) tek doz IV/IM/PO.
            </p>
          </div>

          {/* 4. Ağır COVID-19 Pnömonisi & Orta-Ağır ARDS */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500 shrink-0" />
                <span>4. Ağır COVID-19 (RECOVERY) &amp; Orta-Ağır ARDS (DEXA-ARDS)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                6 mg · 20→10 mg/gün
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Oksijen veya mekanik ventilasyon gerektiren COVID-19:{' '}
              <strong className="font-mono text-slate-900 dark:text-white">6 mg/gün IV/PO × 10 gün</strong> (oksijen
              gerektirmeyen hastada ZARARLI olabilir!). Orta-ağır ARDS (<strong className="font-mono">PaO₂/FiO₂ &lt; 200</strong>):{' '}
              <strong className="font-mono text-slate-900 dark:text-white">20 mg/gün IV × 5 gün</strong> →{' '}
              <strong className="font-mono text-slate-900 dark:text-white">10 mg/gün IV × 5 gün</strong>.
            </p>
          </div>
        </div>

        {/* Klinik Kanıt Kutuları */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-100' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                <span>Fourth Consensus PONV Guidelines (Gan et al., Anesth Analg 2020)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-800 dark:text-teal-200 shrink-0">
                PMID: 32467512
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>4–8 mg IV Deksametazon</strong> indüksiyonda verildiğinde 24 saatlik PONV&apos;u güçlü şekilde
              önler (Kanıt 1A) ve <strong>5-HT₃ antagonistleriyle (Ondansetron)</strong> aditif sinerji oluşturur.
              8 mg (0,1–0,2 mg/kg) dozu ayrıca postoperatif ağrı skorlarını, opioid tüketimini ve PACU kalış süresini
              anlamlı olarak azaltır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-100' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-bold text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>RECOVERY (NEJM 2021, n=6425) &amp; DEXA-ARDS (Lancet Respir Med 2020)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-800 dark:text-rose-200 shrink-0">
                PMID: 32678530 · 32043986
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>RECOVERY</strong>&apos;de mekanik ventilasyondaki COVID-19 hastalarında 6 mg/gün Deksametazon 28
              günlük mortaliteyi <strong>%36 azalttı (RR 0,64)</strong>. <strong>DEXA-ARDS</strong> (n=277)&apos;de ise
              20 mg → 10 mg protokolü ventilatörsüz gün sayısını <strong>+4,8 gün</strong> artırdı ve 60 günlük
              mortaliteyi düşürdü (<strong>%21 vs %36; p=0,0047</strong>).
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. DOZAJ KADEMELERİ & KLİNİK SENARYO REJİMLERİ (#sec-dozaj)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozaj"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Dozaj Kademeleri &amp; Klinik Senaryo Rejimleri
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">TR Ampul: 8 mg / 2 mL (4 mg/mL)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: PONV & PNB Adjuvan */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'ponv_analgesia'
                ? 'border-teal-500 bg-teal-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  PONV &amp; PNB Adjuvan
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  Gan 2020
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                4 – 8 <span className="text-xs font-sans font-normal text-slate-500">mg IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>4 mg (1 mL)</strong> standart PONV profilaksisi; <strong>8 mg (2 mL)</strong> multimodal
                analjezi &amp; PNB blok uzaması (+6–8 sa). İndüksiyondan hemen sonra yavaş IV.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              ✓ Pediatrik: 0,15 mg/kg IV (maks 4–8 mg)
            </div>
          </div>

          {/* Kademe 2: COVID-19 & Post-Ekstübasyon Ödem */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'airway_croup' || (scenario === 'ards_covid' && respMode === 'covid_recovery')
                ? 'border-indigo-500 bg-indigo-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  COVID-19 &amp; Hava Yolu Ödemi
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  RECOVERY / YBÜ
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                6 mg/gün <span className="text-xs font-sans font-normal text-slate-500">· 4–8 mg</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>COVID-19 (O₂/MV):</strong> 6 mg/gün (1,5 mL) × 10 gün. <strong>Post-Ekstübasyon:</strong>{' '}
                4–5 mg q6h (veya 8 mg q12h), ekstübasyondan 4–12 saat önce başlayarak.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
              ✓ Pediatrik Krup: 0,6 mg/kg tek doz (maks 16 mg)
            </div>
          </div>

          {/* Kademe 3: Beyin Tümörü Ödemi & Menenjit */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'neuro_meningitis'
                ? 'border-amber-500 bg-amber-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Beyin Ödemi &amp; Menenjit
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Nöro-YBÜ
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                10 mg <span className="text-xs font-sans font-normal text-slate-500">+ 4 mg q6h</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>Tümör Ödemi:</strong> 10 mg (2,5 mL) yükleme + 4 mg (1 mL) q6h. <strong>Menenjit:</strong>{' '}
                0,15 mg/kg (yetişkin 10 mg) IV q6h × 4 gün (antibiyotikten 15–20 dk önce).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              ⚠ Travmatik Beyin Hasarında (TBH) YASAK!
            </div>
          </div>

          {/* Kademe 4: DEXA-ARDS */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'ards_covid' && respMode === 'ards_dexa'
                ? 'border-rose-500 bg-rose-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Orta-Ağır ARDS
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  DEXA-ARDS
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                20 → 10 <span className="text-xs font-sans font-normal text-slate-500">mg/gün IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>1–5. Gün:</strong> 20 mg/gün IV (5 mL = 2,5 ampul). <strong>6–10. Gün:</strong> 10 mg/gün IV
                (2,5 mL = 1,25 ampul). PaO₂/FiO₂ &lt; 200 persistan orta-ağır ARDS&apos;de.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-600 dark:text-rose-400 font-medium">
              ✓ Ventilatörsüz gün +4,8 · 60-gün mortalite ↓
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF KLİNİK DOZ, TR AMPUL & PEDİATRİK HESAPLAYICI           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif Klinik Doz, TR Ampul (8 mg / 2 mL) &amp; Pediatrik Hesaplayıcı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                TR Standart Ampul Konsantrasyonu: 8 mg / 2 mL = 4 mg/mL (1 mL = 4 mg · 2 mL = 8 mg)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setScenario('ponv_analgesia');
              setWeightKg(70);
              setPonvRegimen('standard_4mg');
              setAirwayMode('adult_stridor');
              setCroupWeightKg(15);
              setNeuroMode('tumor_edema');
              setMeningitisWeightKg(70);
              setRespMode('covid_recovery');
              setConverterDexMg(8);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Sıfırla</span>
          </button>
        </div>

        {/* 5 Klinik Senaryo Sekmesi */}
        <div className="flex flex-wrap gap-2 mb-5">
          {[
            { id: 'ponv_analgesia', label: '1. PONV & PNB Adjuvanı' },
            { id: 'airway_croup', label: '2. Stridor & Pediatrik Krup' },
            { id: 'neuro_meningitis', label: '3. Beyin Ödemi & Menenjit' },
            { id: 'ards_covid', label: '4. COVID-19 & DEXA-ARDS' },
            { id: 'steroid_converter', label: '5. Steroid Eşdeğerlik' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setScenario(tab.id as CalcScenario)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                scenario === tab.id
                  ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300 shadow-xs'
                  : isDark
                  ? 'border-slate-700 bg-slate-800/60 text-slate-300 hover:bg-slate-800'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SENARYO 1: PONV & MULTİMODAL ANALJEZİ / PNB ADJUVANI */}
        {scenario === 'ponv_analgesia' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Sol: Ağırlık & Rejim Seçimi */}
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={ponvWeightSliderId}
                      className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400"
                    >
                      Hasta Ağırlığı (Yetişkin &amp; Pediatrik)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={ponvWeightInputId}
                        type="number"
                        min={5}
                        max={140}
                        value={weightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!Number.isNaN(val)) setWeightKg(Math.max(5, Math.min(140, val)));
                        }}
                        className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={ponvWeightSliderId}
                    type="range"
                    min={5}
                    max={140}
                    step={1}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>5 kg (Pediatrik)</span>
                    <span>&lt;40 kg: 0,15 mg/kg</span>
                    <span>70 kg</span>
                    <span>140 kg</span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Klinik Hedef / Doz Seçimi
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPonvRegimen('standard_4mg')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        ponvRegimen === 'standard_4mg'
                          ? 'border-teal-500 bg-teal-500/15 text-teal-800 dark:text-teal-200'
                          : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">Standart PONV (4 mg)</div>
                      <div className="text-[11px] font-mono opacity-80 mt-0.5">Yetişkin 4 mg · Ped 0,15 mg/kg (maks 4)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPonvRegimen('multimodal_8mg')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        ponvRegimen === 'multimodal_8mg'
                          ? 'border-indigo-500 bg-indigo-500/15 text-indigo-800 dark:text-indigo-200'
                          : isDark
                          ? 'border-slate-700 bg-slate-900 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">PONV + Analjezi / PNB (8 mg)</div>
                      <div className="text-[11px] font-mono opacity-80 mt-0.5">Yetişkin 8 mg · Ped 0,15 mg/kg (maks 8)</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sağ: Sonuç Kartı */}
              <div
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                }`}
              >
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Uygulanacak IV Doz
                    </span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {isPediatricPonv ? ponvFinalDoseMg.toFixed(2) : ponvFinalDoseMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      ({ponvDosePerKg.toFixed(2)} mg/kg · {isPediatricPonv ? 'Pediatrik' : 'Yetişkin'})
                    </span>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      TR Ampulden Çekilecek (4 mg/mL)
                    </span>
                    <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                      {ponvVolumeMl.toFixed(2)} mL
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      8 mg / 2 mL ampulün %{(ponvVolumeMl / 2 * 100).toFixed(0)}&apos;i
                    </span>
                  </div>
                </div>

                <div
                  className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                    isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-teal-100 text-slate-700'
                  }`}
                >
                  <strong>Uygulama Zamanlaması &amp; Güvenlik:</strong> Genel anestezi{' '}
                  <strong>indüksiyonundan hemen sonra</strong> yavaş IV bolus olarak verin (uyanık hastada hızlı puşe
                  şiddetli perineal yanma yapar!). PNB adjuvanı olarak <strong>4–8 mg IV</strong> sistemik uygulama,
                  perinöral uygulamayla neredeyse eşdeğer (+6–8 saat) blok uzaması sağlar ve sinir hasarı/koruyucu
                  toksisitesi riski taşımaz.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SENARYO 2: POST-EKSTÜBASYON STRİDOR & PEDİATRİK KRUP */}
        {scenario === 'airway_croup' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setAirwayMode('adult_stridor')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  airwayMode === 'adult_stridor'
                    ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Yetişkin YBÜ Post-Ekstübasyon Stridor
              </button>
              <button
                type="button"
                onClick={() => setAirwayMode('pediatric_croup')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  airwayMode === 'pediatric_croup'
                    ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Pediatrik Krup (0,6 mg/kg · Maks 16 mg)
              </button>
            </div>

            {airwayMode === 'adult_stridor' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'}`}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Standart YBÜ Çoklu Doz Rejimi (ATS/CHEST)
                  </span>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                    4 – 5 mg IV q6h
                  </div>
                  <div className="text-xs font-mono text-indigo-700 dark:text-indigo-300 mt-1">
                    TR Ampulden: 1,0 – 1,25 mL (4 mg/mL) × 2–4 doz
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    Planlı ekstübasyondan <strong>en az 4–12 saat önce</strong> başlanmalıdır (tek doz ekstübasyondan
                    hemen önce verildiğinde ödemi geriletmek için yetersiz kalabilir). Alternatif: <strong>8 mg (2 mL) IV q12h</strong>.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Kimlere Uygulanmalı? (Cuff-Leak Testi)
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 mt-2 space-y-1.5 list-disc pl-4">
                    <li>Uzamış entübasyon (&gt;6 gün), travmatik/zor entübasyon veya geniş endotrakeal tüp.</li>
                    <li><strong>Negatif Cuff-Leak Testi:</strong> Kaf indirildiğinde kaçak hacmi &lt;110 mL veya tidal hacmin &lt;%10–15&apos;i.</li>
                    <li>Uyanık YBÜ hastasında perineal yanmayı önlemek için 50 mL SF içinde 10–15 dk yavaş infüzyonla verin.</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <label htmlFor={croupWeightSliderId} className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Pediatrik Ağırlık (Krup — 0,6 mg/kg)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={croupWeightInputId}
                        type="number"
                        min={3}
                        max={50}
                        value={croupWeightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!Number.isNaN(val)) setCroupWeightKg(Math.max(3, Math.min(50, val)));
                        }}
                        className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={croupWeightSliderId}
                    type="range"
                    min={3}
                    max={50}
                    step={1}
                    value={croupWeightKg}
                    onChange={(e) => setCroupWeightKg(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Tek doz IV / IM / PO uygulanır; 36–72 saatlik uzun biyolojik ömrü sayesinde genelde tekrar doz
                    gerektirmez (maksimum tek doz: <strong>16 mg</strong>).
                  </p>
                </div>

                <div className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'}`}>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Hesaplanan Krup Dozu</span>
                    <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                      {croupDoseMg.toFixed(1)} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">0,6 mg/kg · Tek Doz</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">TR Ampul Hacmi (4 mg/mL)</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {croupVolumeMl.toFixed(2)} mL
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">8 mg / 2 mL ampulden</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SENARYO 3: VAZOJENİK BEYİN ÖDEMİ & BAKTERİYEL MENENJİT */}
        {scenario === 'neuro_meningitis' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setNeuroMode('tumor_edema')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  neuroMode === 'tumor_edema'
                    ? 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Vazojenik Beyin Tümörü Ödemi
              </button>
              <button
                type="button"
                onClick={() => setNeuroMode('bacterial_meningitis')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  neuroMode === 'bacterial_meningitis'
                    ? 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Akut Bakteriyel Menenjit (0,15 mg/kg q6h)
              </button>
            </div>

            {neuroMode === 'tumor_edema' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    Kranial Tümör / Metastaz Vazojenik Ödemi
                  </span>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                      <span className="text-[10px] font-bold uppercase text-slate-500">IV Yükleme Dozu</span>
                      <div className="text-xl font-black font-mono text-amber-600 dark:text-amber-400 mt-0.5">10 mg IV</div>
                      <span className="text-[11px] font-mono text-slate-500">2,5 mL (1,25 ampul)</span>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                      <span className="text-[10px] font-bold uppercase text-slate-500">İdame Dozu</span>
                      <div className="text-xl font-black font-mono text-teal-600 dark:text-teal-400 mt-0.5">4 mg q6h</div>
                      <span className="text-[11px] font-mono text-slate-500">1,0 mL q6h (16 mg/gün)</span>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/25 border-rose-800/60 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'}`}>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-rose-600 dark:text-rose-400 mb-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>KRİTİK UYARI: Travmatik Beyin Hasarında (TBH) KONTRENDİKEDİR!</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    <strong>CRASH Trial (Lancet 2004, n=10.008)</strong> yüksek doz kortikosteroidin akut TBH&apos;de
                    14 günlük mortaliteyi anlamlı artırdığını (<strong>%21,1 vs %17,9; p=0,0001</strong>) kanıtlamıştır.
                    TBH sitotoksik ödeminde Deksametazon KULLANILMAZ; yalnızca kitle/tümör vazojenik ödeminde endikedir.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <label htmlFor={meningitisWeightSliderId} className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Hasta Ağırlığı (Menenjit — 0,15 mg/kg q6h)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={meningitisWeightInputId}
                        type="number"
                        min={5}
                        max={120}
                        value={meningitisWeightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!Number.isNaN(val)) setMeningitisWeightKg(Math.max(5, Math.min(120, val)));
                        }}
                        className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={meningitisWeightSliderId}
                    type="range"
                    min={5}
                    max={120}
                    step={1}
                    value={meningitisWeightKg}
                    onChange={(e) => setMeningitisWeightKg(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    İlk IV antibiyotik dozundan <strong>15–20 dakika önce</strong> (veya en geç eşzamanlı) başlanır ve
                    <strong> 4 gün</strong> sürdürülür (maksimum tek doz: <strong>10 mg q6h</strong>).
                  </p>
                </div>

                <div className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Tek Doz (q6h)</span>
                    <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
                      {meningitisSingleDoseMg.toFixed(1)} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {meningitisSingleMl.toFixed(2)} mL (4 mg/mL)
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Günlük Toplam (4 Gün)</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {meningitisDailyMg.toFixed(1)} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {(meningitisDailyMg / 8).toFixed(1)} ampul / gün
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SENARYO 4: AĞIR COVID-19 (RECOVERY) & ORTA-AĞIR ARDS (DEXA-ARDS) */}
        {scenario === 'ards_covid' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setRespMode('covid_recovery')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  respMode === 'covid_recovery'
                    ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Ağır COVID-19 (RECOVERY · 6 mg/gün)
              </button>
              <button
                type="button"
                onClick={() => setRespMode('ards_dexa')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  respMode === 'ards_dexa'
                    ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Orta-Ağır ARDS (DEXA-ARDS · 20 → 10 mg)
              </button>
            </div>

            {respMode === 'covid_recovery' ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">Günlük Doz (1–10. Gün)</span>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">6 mg / gün</div>
                  <div className="text-xs font-mono text-rose-700 dark:text-rose-300 mt-1">1,5 mL IV (0,75 ampul) q24h</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500">10 Günlük Toplam</span>
                  <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1">60 mg</div>
                  <div className="text-xs font-mono text-slate-500 mt-1">Toplam 10 ampul (artık kısım atılır)</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Kritik Seçim Kriteri</span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    Yalnızca <strong>O₂ desteği veya mekanik ventilasyon</strong> gerektiren hastalarda başlanır;
                    oksijen ihtiyacı olmayanlarda mortalite artış eğilimi (RR 1,19) nedeniyle KULLANILMAZ.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400">Faz 1 (1. – 5. Gün)</span>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">20 mg / gün</div>
                  <div className="text-xs font-mono text-rose-700 dark:text-rose-300 mt-1">5,0 mL IV (2,5 ampul) q24h</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-amber-600 dark:text-amber-400">Faz 2 (6. – 10. Gün)</span>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">10 mg / gün</div>
                  <div className="text-xs font-mono text-amber-700 dark:text-amber-300 mt-1">2,5 mL IV (1,25 ampul) q24h</div>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">10 Günlük Protokol Özeti</span>
                  <div className="text-lg font-black font-mono text-teal-600 dark:text-teal-400 mt-1">150 mg Toplam</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    İlk 5 gün günde 3 ampul (2,5 kullan), son 5 gün günde 2 ampul (1,25 kullan). Hasta 10. günden önce
                    ekstübe edilirse tedavi sonlandırılır.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SENARYO 5: KORTİKOSTEROİD EŞDEĞERLİK DÖNÜŞTÜRÜCÜ */}
        {scenario === 'steroid_converter' && (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <label
                  htmlFor={converterInputId}
                  className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5"
                >
                  <Scale className="w-4 h-4" />
                  <span>Referans Deksametazon Dozu (mg)</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Glukokortikoid anti-inflamatuar potens eşdeğerliği (0,75 mg Deksametazon = 20 mg Hidrokortizon)
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[4, 6, 8, 10, 20].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setConverterDexMg(preset)}
                    className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold cursor-pointer transition-colors ${
                      converterDexMg === preset
                        ? 'border-teal-500 bg-teal-500/20 text-teal-700 dark:text-teal-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    {preset} mg
                  </button>
                ))}
                <div className="flex items-center gap-1.5">
                  <input
                    id={converterInputId}
                    type="number"
                    min={0.5}
                    max={100}
                    step={0.5}
                    value={converterDexMg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val)) setConverterDexMg(Math.max(0, Math.min(100, val)));
                    }}
                    className={`w-20 px-2.5 py-1.5 rounded-lg border font-mono text-sm font-bold text-right ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs font-mono text-slate-500">mg</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-teal-950/25 border-teal-800/60' : 'bg-teal-50/70 border-teal-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  Deksametazon (Baz)
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {converterDexMg.toFixed(1)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 25–30×</div>
                  <div className="font-bold text-rose-600 dark:text-rose-400">MK Potens: 0 (YOK!)</div>
                  <div>Biyolojik t½: 36–72 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Hidrokortizon (×26,7)
                </span>
                <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
                  {eqHydrocortisoneMg.toFixed(0)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 1×</div>
                  <div className="font-bold text-amber-600 dark:text-amber-400">MK Potens: 1,0 (1:1)</div>
                  <div>Biyolojik t½: 8–12 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Metilprednizolon (×5,33)
                </span>
                <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                  {eqMethylpredMg.toFixed(1)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 5×</div>
                  <div>MK Potens: 0,5</div>
                  <div>Biyolojik t½: 12–36 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Prednizolon (×6,67)
                </span>
                <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                  {eqPrednisoloneMg.toFixed(1)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 4×</div>
                  <div>MK Potens: 0,8</div>
                  <div>Biyolojik t½: 12–36 saat</div>
                </div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <strong>Klinik Hatırlatma:</strong> 1 tam TR ampul (<strong>8 mg Deksametazon</strong>) anti-inflamatuar
              güç açısından yaklaşık <strong>213 mg Hidrokortizon</strong> veya <strong>42,7 mg Metilprednizolon</strong>a
              eşdeğerdir; ancak mineralokortikoid aktivitesi <strong>sıfır (0)</strong> olduğundan adrenal kriz veya
              refrakter septik şokta Hidrokortizonun yerini tutmaz!
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. TÜRKİYE PREPARAT & SULANDIRMA REHBERİ (#sec-tr-preparat)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Dekort® / Onadron® / Deksamet® / Gadexon® 8 mg / 2 mL IM/IV Ampul',
            presentation: '2 mL berrak çözelti içeren cam ampul (Deksametazon Sodyum Fosfat)',
            concentration: '4 mg/mL (1 mL = 4 mg · 2 mL = 8 mg)',
            saltOrBaseNote:
              'Türkiye’de en yaygın standart ampul 8 mg / 2 mL (4 mg/mL) formundadır. Bazı jenerikler koruyucu olarak metil/propilparaben veya sülfit içerebilir — perinöral (off-label) kullanım planlanıyorsa prospektüsten koruyucusuz (preservative-free) olduğu mutlaka doğrulanmalı veya daha güvenli olan sistemik IV yol tercih edilmelidir.',
            alertLevel: 'high',
          },
          {
            name: 'Oral Tabletler (Dekort® 0,5 mg / 0,75 mg · Kordexa® 4 mg / 8 mg)',
            presentation: 'Oral tablet (YBÜ’de COVID-19 6 mg/gün veya tümör ödemi idamesi için enteral geçiş)',
            concentration: 'Oral biyoyararlanım: %75–85 (IV ile yaklaşık 1:1)',
            saltOrBaseNote:
              'Oral biyoyararlanımı yüksek olduğundan, oral alımı açılan COVID-19 (RECOVERY 6 mg/gün) veya tümör ödemi hastalarında IV’den PO’ya 1:1 doz oranıyla güvenle geçilebilir.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart Hacim Kuralı (4 mg/mL): 1,0 mL = 4 mg (PONV) · 1,5 mL = 6 mg (COVID-19) · 2,0 mL = 8 mg (1 tam ampul — Multimodal Analjezi / PNB Adjuvanı) · 2,5 mL = 10 mg (Beyin Ödemi Yükleme / Menenjit).',
          'Genel Anestezi İndüksiyonu (PONV / PNB): İndüksiyondan hemen sonra (hasta uyuduğunda) 4–8 mg (1–2 mL) yavaş IV bolus uygulanabilir.',
          'Uyanık Hastada IV Uygulama (Perineal Yanmayı Önlemek İçin): 4–20 mg dozu 50–100 mL %0,9 NaCl (SF) veya %5 Dekstroz içinde 10–15 dakikada yavaş IV infüzyonla verin!',
        ]}
        concentrationTrapWarning="LASA & Potens Tuzağı: Deksametazon (Dekort® 8 mg/2 mL) hem isim benzerliğiyle Deksmedetomidin (Precedex®) ile hem de steroid sınıfı içinde Hidrokortizon (100 mg) / Metilprednizolon (40–250 mg) ile karıştırılabilir. 8 mg Deksametazon ≈ 213 mg Hidrokortizon gücündedir!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="Periferik venöz kateterden güvenle uygulanabilir. Hafif alkali pH (7,0–8,5) nedeniyle venöz irritasyon düşüktür; ancak uyanık hastada hızlı IV puşe şiddetli perineal yanma yaptığından 50–100 mL SF içinde 10–15 dk infüzyon veya genel anestezi indüksiyonundan hemen sonra yavaş IV bolus tercih edilmelidir."
        phRange="7,0 – 8,5 (Hafif Alkali Sodyum Fosfat Çözeltisi)"
        osmolalityNote="İzoozmolara yakındır; flebit riski düşüktür. Ancak yüksek fosfat ester konsantrasyonu nedeniyle uyanık hastada hızlı puşede (<60 sn) perineal/genital yanma-kaşıntı sendromu gelişir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          'Ringer Laktat (RL)',
        ]}
        stabilityNote="SF veya %5 Dekstroz içinde sulandırılmış çözeltiler oda sıcaklığında 24 saat fizikokimyasal olarak stabildir; ışıktan korunmalı ve bulanıklık/partikül varsa kullanılmamalıdır."
        ySiteCompatible={[
          'SF (%0,9 NaCl)',
          '%5 Dekstroz',
          'Ringer Laktat (RL)',
          'Ondansetron',
          'Propofol (ayrı bolus tercih edilir)',
          'Fentanil',
          'Remifentanil',
          'Roküronyum',
          'Noradrenalin',
        ]}
        ySiteIncompatible={[
          'Midazolam (hızlı bulanıklık ve çökelti!)',
          'Vankomisin (beyaz presipitasyon!)',
          'Siprofloksasin (kristalizasyon / çökelti!)',
          'Daunorubisin / Doksorubisin',
          'Klorpromazin',
          'Glikopirolat (bazı konsantrasyonlarda uyumsuz — hattı SF ile yıkayın)',
        ]}
        extravasationProtocol="Ekstravazasyon Yönetimi: Deksametazon vezikan değildir ve doku nekrozu beklenmez. İnfüzyonu durdurup kanülü çıkarın, ekstremiteyi eleve edin ve lokal soğuk/ılık kompres uygulayın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Karaciğerde CYP3A4 ile metabolize olur; böbrek yetmezliğinde (ABH / KBH / HD / CRRT) rutin doz azaltımı gerekmez. 0 mineralokortikoid etkisi sayesinde sıvı/Na⁺ yükü yapmaz."
        renalDetails={[
          'Aktif Deksametazonun renal klirensi düşüktür (<%10 değişmeden atılır); GFR < 30 mL/dk, hemodiyaliz veya CRRT hastalarında başlangıç ve idame dozları değiştirilmez.',
          'Mineralokortikoid aktivitesi sıfır (0) olduğundan oligürik ABH veya son dönem KBH hastalarında Hidrokortizonun aksine belirgin sodyum-su retansiyonu ve hipernatremi tetiklemez.',
          'Hemodiyaliz sonrası ek replasman dozu gerekmez.',
        ]}
        hepaticSummary="Ağır karaciğer yetmezliğinde (Child-Pugh C) CYP3A4 metabolizması yavaşlar ve yarı ömrü uzar; tek doz PONV değişmez, ancak çok günlük tedavide en düşük etkili doz seçilmelidir."
        hepaticDetails={[
          'Siroz ve ağır hepatik disfonksiyonda CYP3A4 aracılı 6β-hidroksilasyon azaldığından plazma yarı ömrü 1,5–2 kat uzayabilir; hipoalbüminemi de serbest aktif fraksiyonu (yaklaşık %23’ten yukarı) artırır.',
          'Perioperatif tek doz (4–8 mg IV) PONV profilaksisinde doz azaltımı gerekmez; ancak çok günlük YBÜ tedavilerinde (COVID-19, ARDS, tümör ödemi) hiperglisemi, enfeksiyon (SBP) ve GİS kanama açısından yakın izlem yapılmalıdır.',
        ]}
        {...STANDALONE_ORGAN_PART1['dexamethasone']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="Tek Doz 4 mg Tercih · Deliryum & Glisemi İzlemi"
        geriatricPoints={[
          'Geriatrik hastalarda (>65 yaş) PONV profilaksisi için 4 mg IV genelde yeterlidir; 8 mg veya çok günlük rejimler yaşlılarda postoperatif deliryum, ajitasyon, uykusuzluk ve belirgin hiperglisemi riskini artırır.',
          'Uzamış tedavilerde (>5–7 gün) osteoporotik kırık, proksimal kas güçsüzlüğü (miyopati), cilt incelmesi ve GİS kanama riski yüksektir; mutlaka PPI profilaksisi ve en kısa tedavi süresi hedeflenmelidir.',
        ]}
        obesityWeightScalarBadge="Sabit Erişkin Dozu (4–8 mg · 6 mg · 20 mg) · TBW İle Artırılmaz"
        obesityPoints={[
          'Obez yetişkinlerde (BMI ≥ 30–40 kg/m²) PONV (4–8 mg), COVID-19 (6 mg/gün) ve ARDS (20 → 10 mg/gün) dozları sabit erişkin dozlarıdır; gerçek vücut ağırlığına (TBW) göre artırılmaz.',
          'Obez hastalarda bazal insülin direnci yüksek olduğundan, tek doz 8 mg IV bile belirgin postoperatif hiperglisemiye yol açabilir; diyabetik obezlerde 4 mg IV seçilmeli ve kan şekeri yakından izlenmelidir.',
        ]}
        clinicalNote="Hem geriatrik hem obez hastalarda çok günlük Deksametazon tedavisi altında 4–6 saatlik kan şekeri takibi (hedef 140–180 mg/dL) ve deliryum taraması (CAM-ICU) rutin olmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GEBELİK & LAKTASYON (#sec-gebelik)                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Plasental 11β-HSD2 enzimine DİRENÇLİDİR ve plasentayı aktif geçer! Preterm doğumda (24–34 hf) fetal akciğer matürasyonu için kullanılır; maternal adrenal krizde ise fetüsü korumak için Hidrokortizon seçilir."
        pregnancyDetails={[
          'Hidrokortizondan Temel Farkı (11β-HSD2 Direnci): Deksametazonun C9-flor ve C16-metil yapısı, plasental 11β-hidroksisteroid dehidrogenaz tip 2 (11β-HSD2) enzimi tarafından inaktive edilmesini engeller. Bu nedenle maternal dolaşımdan fetal dolaşıma aktif formda yüksek oranda geçer.',
          'Obstetrik Endikasyon — Fetal Akciğer Matürasyonu (24–34 Gebelik Haftası): Preterm doğum tehdidinde neonatal RDS, intraventriküler kanama ve nekrotizan enterokoliti azaltmak için 6 mg IM q12h × 4 doz (toplam 24 mg) uygulanır.',
          'Maternal Tedavi Uyarısı: Gebede yalnızca anneyi tedavi etmek gerektiğinde (maternal adrenal kriz, septik şok, astım) fetal HPA aksı baskılanması ve büyüme kısıtlılığını önlemek için 11β-HSD2 ile inaktive olan Hidrokortizon veya Prednizolon tercih edilmelidir. Sezaryen PONV profilaksisinde tek doz 4 mg IV (tercihen kord klemplendikten sonra) güvenle kullanılır.',
        ]}
        lactationSummary="Tek doz perioperatif (4–8 mg IV) kullanım emzirme ile uyumludur; ancak yüksek doz çok günlük tedavilerde anne sütüne geçiş ve süt üretiminde geçici azalma izlenebilir."
        lactationDetails={[
          'Cerrahi veya sezaryen sonrası tek doz 4–8 mg IV Deksametazon uygulaması için emzirmeyi kesmeye gerek yoktur.',
          'Çok günlük yüksek doz (ör. 16–20 mg/gün) tedavilerde alternatif olarak anne sütüne minimal geçen Prednizolon/Hidrokortizon değerlendirilebilir veya bebek olası irritabilite açısından izlenir.',
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
            title: 'Hiperglisemi & İnsülin Direnci',
            incidenceOrSeverity: 'Çok Sık · Tek Dozda Bile +30–50 mg/dL',
            detail:
              'Hepatik glukoneogenez artışı ve periferik GLUT4 inhibisyonu ile tek doz 8 mg IV bile 24 saat boyunca kan şekerini anlamlı yükseltir; diyabetik ve YBÜ hastalarında IV insülin titrasyonu gerektirir.',
            tone: 'amber',
          },
          {
            title: 'Uyanık Hastada Akut Perineal / Genital Yanma & Kaşıntı',
            incidenceOrSeverity: 'Hızlı IV Puşeye Özgü (%25–50)',
            detail:
              'Fosfat esterine bağlı olarak uyanık hastada hızlı IV puşeden 30–60 sn sonra çok şiddetli ancak 1–2 dk içinde kendiliğinden geçen anogenital yanma-batma hissi oluşur; daima indüksiyondan sonra veya 10–15 dk infüzyonla verin.',
            tone: 'rose',
          },
          {
            title: 'Uykusuzluk, Ajitasyon & YBÜ Deliryumu',
            incidenceOrSeverity: 'Doz & Süre Bağımlı · Geriatri',
            detail:
              'Hipokampus ve prefrontal kortekste yüksek GR-α uyarımıyla uyku mimarisini bozar; akşam geç saatlerde verilen dozlarda uykusuzluk, öfori/anksiyete ve yaşlı hastalarda deliryum riskini artırır.',
            tone: 'indigo',
          },
          {
            title: 'Uzun Süreli HPA Aksı Baskılanması, Enfeksiyon & Yara İyileşmesi',
            incidenceOrSeverity: '36–72 Saat Biyolojik Etki',
            detail:
              'Tek doz 8 mg bile endojen sabah kortizolünü 48–72 saat baskılar. Çok günlük kullanımda süperenfeksiyon, psödo-lökositoz, GİS kanama ve uzun dönemde miyopati/adrenal atrofi gelişebilir (ancak tek doz 8 mg cerrahi alan enfeksiyonunu artırmaz — PADDI Trial).',
            tone: 'rose',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖZEL KLİNİK DURUMLAR (#sec-ozel-durumlar)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: 'Tek Doz 4–8 mg Deksametazon: Postop Kan Şekeri ve Cerrahi Alan Enfeksiyonu (PADDI Trial)',
            detail:
              'PADDI Trial (Corcoran et al., NEJM 2021, n=8725), elektif non-kardiyak cerrahide indüksiyonda verilen 8 mg IV Deksametazonun 30 günlük cerrahi alan enfeksiyonu (SSI) riskini ARTIRMADIĞINI (%8,1 vs %9,1; non-inferior) kanıtlamıştır. Diyabetik olmayanlarda kan şekeri artışı hafif-orta düzeydedir; insüline bağımlı kontrolsüz diyabette ise ilk 24 saat yakın glisemi takibi (gerekirse 4 mg doz) önerilir.',
          },
          {
            title: 'Travmatik Beyin Hasarında (TBH) Neden Kontrendike? (CRASH Trial)',
            detail:
              'Kranial tümörlerdeki kan-beyin bariyeri yıkımına bağlı vazojenik ödem Deksametazona dramatik yanıt verirken, akut TBH’deki ödem büyük ölçüde sitotoksiktir. CRASH çalışması (n=10.008) TBH’de yüksek doz kortikosteroidin 14 günlük mortaliteyi anlamlı artırdığını (RR 1,18; p=0,0001) göstermiş ve TBH’de steroid kullanımını kesin olarak sonlandırmıştır.',
          },
          {
            title: 'Periferik Sinir Bloğu (PNB) Adjuvanı: Sistemik IV vs Perinöral Uygulama',
            detail:
              'Meta-analizler, 4–8 mg IV sistemik Deksametazonun uzun etkili lokal anesteziklerle (Bupivakain/Ropivakain) yapılan periferik sinir bloklarını +6–8 saat uzattığını ve perinöral (off-label) uygulamayla klinik olarak neredeyse eşdeğer olduğunu göstermektedir. Perinöral yol koruyucusuz (preservative-free) ampul gerektirir ve nörotoksisite/kristalizasyon riski taşır; bu nedenle güncel pratikte IV yol hem güvenli hem etkilidir.',
          },
          {
            title: 'CYP3A4 İlaç Etkileşimleri & Tanısal ACTH Testi İstisnası',
            detail:
              'Güçlü CYP3A4 indükleyicileri (Fenitoin, Rifampisin, Karbamazepin) Deksametazon klirensini belirgin hızlandırarak beyin ödemi veya menenjit tedavisinde etkinliği azaltabilir. Diğer yandan Deksametazon standart serum kortizol immünoassay’leriyle çapraz reaksiyon VERMEZ; bu nedenle tanısız adrenal yetmezlik şüphesinde acil tedavi gerekirken aynı anda kosintropin (ACTH) stimülasyon testi yapılacaksa test bitene kadar geçici olarak 4 mg IV Deksametazon kullanılabilir (ardından Hidrokortizona geçilir).',
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
          title: 'Hücre Zarı Pasif Difüzyonu, C9-Flor / C16-Metil Yapısı & Saf GR-α Seçiciliği',
          summary:
            'Deksametazon, lipofilik steroid halkasıyla hücre zarından pasif difüzyonla geçer; sentetik C9-flor ve C16-α-metil modifikasyonları reseptör ve enzim profilini endojen kortizolden köklü biçimde ayırır (Miller’s 10th Ed. / Stoelting’s 6th Ed.):',
          points: [
            'Ultra-Yüksek GR-α (NR3C1) Afinitesi (25–30× Kortizol): C9 pozisyonundaki flor atomu ve C16-α metil grubu, sitoplazmik Glukokortikoid Reseptörünün (GR-α) ligand bağlanma cebiyle (LBD) kurulan hidrofobik/hidrojen bağlarını stabilize ederek kortizole kıyasla ~25–30 kat daha güçlü ve uzun süreli reseptör işgali sağlar.',
            'Mineralokortikoid Reseptöründen (MR) Sterik Dışlanma (MK = 0): C16-α metil grubu, Mineralokortikoid Reseptörünün (NR3C2) dar bağlanma cebine sterik engel oluşturur; bu nedenle Deksametazonun mineralokortikoid aktivitesi neredeyse SIFIRDIR (0) ve renal ENaC üzerinden sodyum/su tutulumu yapmaz.',
            'CBG (Transkortin) ve 11β-HSD2 Enzimlerine Direnç: Florlanmış ve metillenmiş yapı hem plazmada CBG bağlanmasını (yalnızca ~%77 albümine bağlanır) hem de renal/plasental 11β-HSD2 enzimatik inaktivasyonunu önler; bu sayede dokularda ve fetüste aktif formda kalır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Nükleer Translokasyon, Uzun Süreli GRE Transaktivasyonu, NF-κB / AP-1 Transrepresyonu & Antiemetik/Analjezik Yolaklar',
          summary:
            'Ligand bağlanmasıyla HSP90/HSP70 şaperon kompleksinden ayrılan GR-α homodimeri importin-α/β ile çekirdeğe geçer ve 36–72 saat süren dört paralel moleküler programı yürütür:',
          points: [
            'Annexin-A1 (Lipokortin-1) Transaktivasyonu (+GRE): DNA üzerindeki +GRE bölgelerine bağlanarak Annexin-A1 sentezini indükler; Annexin-A1, Fosfolipaz A₂ (PLA₂) enzimini bloke ederek araşidonik asit salınımını ve hem COX (prostaglandinler: PGE₂, PGF₂α) hem LOX (lökotrienler: LTB₄) yolaklarını en üst basamaktan keser.',
            'NF-κB / AP-1 Transrepresyonu & HDAC2 Aracılı Sitokin Susturulması: GR-α monomerleri NF-κB (p65) ve AP-1 transkripsiyon faktörlerine kenetlenip (tethering) Histon Deasetilaz-2 (HDAC2) enzimini kromatine çağırarak TNF-α, IL-1β, IL-6, COX-2, iNOS ve VEGF (vasküler endotelyal büyüme faktörü) gen ekspresyonunu güçlü biçimde baskılar.',
            'Perinöral / Analjezik Mekanizma (C-Lifleri & Potasyum Kanalları): Nosiseptif miyelinsiz C-liflerinde voltaj kapılı potasyum kanalı (Kv) ekspresyonunu ve aktivitesini artırarak membran hiperpolarizasyonu sağlar, ektopik nöronal deşarjları ve lokal inflamatuar sinir ödemini baskılayarak PNB süresini 6–8 saat uzatır.',
            'Antiemetik (PONV) Mekanizma (NTS & Area Postrema): Beyin sapındaki Nucleus Tractus Solitarius (NTS) ve Area Postrema’da (kemoreseptör tetik bölge) santral prostaglandin (PGF₂α) sentezini ve serotonin (5-HT) salınımını inhibe eder; kan-beyin bariyeri geçirgenliğini azaltarak emetojenik mediyatör geçişini sınırlar ve endojen endorfin salınımını artırır.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Kan-Beyin Bariyeri Endoteli, NTS & Periferik Sinir C-Lifleri → SSS, Beyin Ödemi & PONV Fizyolojisi',
            tissueTarget: 'KBB Sıkı Bağlantıları (Claudin-5/VEGF) · NTS · Nosiseptif C-Lifleri',
            accent: 'amber',
            points: [
              'Vazojenik Beyin Ödemi Gerilemesi: Kranial tümör çevresinde aşırı salınan VEGF’yi hızla baskılar ve endotelyal sıkı bağlantı proteinlerini (Claudin-5, Occludin, ZO-1) up-regüle ederek bozulmuş kan-beyin bariyeri (KBB) geçirgenliğini ve intrakranial basıncı saatler içinde düşürür.',
              'Santral Antiemetik & Periferik Sinir Bloğu Uzaması: NTS’de 5-HT/prostaglandin baskılanmasıyla 24 saatlik PONV’u azaltırken, periferik sinir C-liflerindeki anti-inflamatuar ve Kv kanal etkisiyle lokal anestezik blok süresini +6–8 saat uzatır.',
            ],
          },
          {
            systemTitle: 'Alveoler Epitel, Laringeal Submukoza & Pulmoner Mikrodolaşım → Solunum & ARDS Fizyolojisi',
            tissueTarget: 'Alveoler Makrofaj · Tip-II Pnömosit · Subglottik Laringeal Mukoza',
            accent: 'teal',
            points: [
              'ARDS & Ağır COVID-19 Sitokin Fırtınası Baskılanması: Alveoler makrofajlarda NF-κB aracılı IL-6/TNF-α kaskadını ve nötrofilik alveoler-kapiller membran hasarını azaltarak ventilatörsüz günleri ve sağkalımı artırır (RECOVERY & DEXA-ARDS).',
              'Laringeal Ödem & Fetal Surfaktan Sentezi: Subglottik mukozada kapiller permeabiliteyi azaltarak post-ekstübasyon stridoru ve pediatrik krupu geriletir; fetal Tip-II pnömositlerde surfaktan proteinlerinin (SP-A/B/C) sentezini uyararak preterm akciğer matürasyonunu hızlandırır.',
            ],
          },
          {
            systemTitle: 'Hepatosit, İskelet Kası & Pankreas Adacık Dokusu → Metabolik & Glisemik Fizyoloji',
            tissueTarget: 'Karaciğer (PEPCK/G6Paz) · İskelet Kası (GLUT4) · Renal Tübül (MK=0)',
            accent: 'rose',
            points: [
              'Glisemik Yanıt & İnsülin Direnci: Hepatik PEPCK ve Glukoz-6-Fosfataz (G6Paz) enzimlerini indükleyip iskelet kasında GLUT4 translokasyonunu inhibe ederek tek doz 8 mg’da bile 24–48 saat süren hafif-orta hiperglisemi oluşturur.',
              'Sıfır Mineralokortikoid Avantajı: Renal toplayıcı kanalda MR/ENaC aktivasyonu yapmadığı için Hidrokortizonun aksine belirgin sodyum tutulumu, ödem, hipernatremi veya hipokalemi oluşturmaz.',
            ],
          },
          {
            systemTitle: 'Hipotalamo-Hipofizer Aks, İmmün Sistem & Plasenta → Endokrin, İmmün & Obstetrik Fizyoloji',
            tissueTarget: 'Ön Hipofiz (ACTH) · Lökositler · Plasental Trofoblast (11β-HSD2 Direnci)',
            accent: 'indigo',
            points: [
              'Uzun Süreli HPA Aksı Negatif Geri Bildirimi: Yüksek GR-α afinitesi ve 36–72 saatlik biyolojik ömrü nedeniyle ön hipofizden ACTH ve hipotalamustan CRH salınımını çok güçlü baskılar; tek doz 8 mg IV bile endojen sabah kortizolünü 48–72 saat düşük tutar.',
              'Aktif Plasental Geçiş & Lökosit Demarginasyonu: Plasental 11β-HSD2’ye dirençli olduğundan fetüse aktif geçiş yapar; periferik kanda nötrofil demarginasyonu (psödo-lökositoz) ve lenfosit/eozinofil apoptozu (hematolojik malignitede TLS riski!) oluşturur.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'PONV Tavan Dozu (4 mg vs 8 mg), 5-HT₃ Sinerjisi & HPA Baskılanma Dinamiği',
          summary:
            'Deksametazonun antiemetik, analjezik ve anti-inflamatuar etkileri farklı doz eşiklerine sahiptir ve diğer ajanlarla öngörülebilir sinerjiler oluşturur:',
          points: [
            '4 mg vs 8 mg Doz-Yanıt Ayrımı (Tavan Etkisi): PONV profilaksisi açısından 4 mg IV doz-yanıt eğrisinin platosuna ulaşır (8 mg’ın ek antiemetik üstünlüğü minimaldir). Buna karşılık postoperatif analjezi, opioid tasarrufu ve periferik sinir bloğu uzaması (+6–8 saat) için 0,1–0,2 mg/kg (yetişkin 8 mg IV) üst eşiği gereklidir.',
            'Ondansetron (5-HT₃ Antagonisti) ile Aditif Sinerji: Deksametazon (indüksiyonda 4–8 mg IV) + Ondansetron (cerrahi sonunda 4 mg IV) kombinasyonu farklı santral/periferik yolakları hedefleyerek PONV riskini her bir ajanın tek başına sağladığının ötesinde (~%45–50 rölatif risk azalması) düşürür.',
            'Uzamış Kullanımda (>5–7 Gün) HPA Baskısı & Taper Gereksinimi: 36–72 saatlik uzun doku ömrü nedeniyle 5–7 günden uzun süren yüksek doz tedavilerde (ör. beyin tümörü ödemi) HPA aksı derin baskılanır ve ani kesilmede adrenal yetmezlik veya rebound ödem gelişebilir; kademeli azaltma (taper) şarttır.',
          ],
        }}
        clinicalPearls={[
          'Neden PONV İçin Cerrahi Sonunda Değil İndüksiyonda Verilir? Deksametazonun antiemetik etkisi genomik transkripsiyon gerektirdiğinden 1–2 saatte başlar; ayrıca hasta uyanıkken verilirse şiddetli perineal yanma yapar. Bu iki nedenle daima indüksiyondan hemen sonra uygulanır.',
          'Uyanık Hastada Perineal Yanma Tuzağı: Acil serviste, serviste veya YBÜ’de uyanık hastaya Deksametazon asla doğrudan hızlı IV puşe edilmemelidir; 50–100 mL SF içinde 10–15 dakikalık infüzyon bu yan etkiyi neredeyse tamamen ortadan kaldırır.',
          'Tanısız Mediastinal Kitle / Lösemi Şüphesinde Steroid Yasağı: Pediatrik veya erişkin hastada hava yolu basısı yapan tanısız mediastinal kitlede ampirik Deksametazon verilmesi hem ani Tümör Lizis Sendromunu (TLS) tetikler hem de lenfoblastları hızla parçalayarak kesin doku tanısını imkânsız hale getirebilir.',
          'Sistemik 4–8 mg IV = Perinöral Deksametazon: Periferik sinir bloğu süresini uzatmak için koruyuculu ampulü perinöral (off-label) enjekte etmek yerine indüksiyon/blok sırasında 4–8 mg IV vermek neredeyse aynı +6–8 saatlik uzamayı nörotoksisite riski olmadan sağlar.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (#sec-kaynaklar)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Deksametazon Sodyum Fosfat"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Canlı / Canlı-Atenüe Aşılar (MMR, Suçiçeği, BCG, Sarı Humma)',
            mechanism: 'Güçlü Hücresel ve Humoral İmmünsüpresyon',
            clinicalEffect:
              'İmmünsüpresif çok günlük Deksametazon rejimleri sırasında canlı aşı uygulanması kontrolsüz viral/bakteriyel replikasyon ve disemine enfeksiyona yol açabilir.',
            management:
              'Yüksek doz sistemik Deksametazon tedavisi sırasında canlı aşılardan kaçının; aşılamayı steroid kesildikten en az 4 hafta sonraya erteleyin.',
          },
          {
            severity: 'X',
            agent: 'Midazolam, Vankomisin, Siprofloksasin (Aynı IV Hat / Y-Site)',
            mechanism: 'Fizikokimyasal pH & Çözünürlük Uyumsuzluğu (Presipitasyon)',
            clinicalEffect:
              'Aynı lümen veya Y-site hattından eşzamanlı gönderildiğinde anında bulanıklık, kristalizasyon ve kateter tıkanması/embolizasyon riski oluşur.',
            management:
              'Asla aynı enjektörde karıştırmayın veya aynı Y-site hattından eşzamanlı vermeyin; uygulama öncesi ve sonrası hattı %0,9 NaCl ile iyice yıkayın.',
          },
          {
            severity: 'D',
            agent: 'NSAİİ’ler (İbuprofen, Diklofenak, Ketorolak) & Antikoagülanlar (Varfarin, Heparin, DOAK)',
            mechanism: 'Gastrik Mukozal Prostasiklin İnhibisyonu + Aditif Hemorajik Risk',
            clinicalEffect:
              'Peptik ülser, gastrik erozyon ve ciddi üst GİS kanama riski belirgin artar; Varfarin kullananlarda INR dalgalanması (genellikle artış) görülebilir.',
            management:
              'Çok günlük eşzamanlı kullanımda mutlaka IV/PO PPI profilaksisi ekleyin ve Varfarin alan hastalarda INR’yi yakından izleyin.',
          },
          {
            severity: 'D',
            agent: 'Güçlü CYP3A4 İndükleyicileri (Fenitoin, Rifampisin, Karbamazepin, Fenobarbital)',
            mechanism: 'Hepatik CYP3A4 Aracılı 6β-Hidroksilasyonun Hızlanması',
            clinicalEffect:
              'Deksametazon klirensini %50’ye kadar artırarak plazma düzeyini ve klinik etkinliğini (beyin ödemi, menenjit, ARDS) ciddi biçimde düşürür.',
            management:
              'Klinik yanıtı yakından takip edin; Fenitoin veya Rifampisin alan hastalarda Deksametazon doz artışı gerekebilir (ve Fenitoin düzeyini de izleyin).',
          },
          {
            severity: 'D',
            agent: 'Güçlü CYP3A4 İnhibitörleri (Klaritromisin, Ketokonazol, İtrakonazol, Ritonavir)',
            mechanism: 'Hepatik CYP3A4 Metabolizmasının İnhibisyonu',
            clinicalEffect:
              'Deksametazon plazma konsantrasyonunu ve yarı ömrünü belirgin artırarak Cushingoid toksisite, ağır hiperglisemi ve derin HPA aksı baskılanmasına yol açar.',
            management:
              'Çok günlük eşzamanlı kullanımda Deksametazon dozunu azaltın veya alternatif antibiyotik/antifungal seçin; glisemi ve toksisiteyi yakından izleyin.',
          },
          {
            severity: 'C',
            agent: 'Non-Depolarizan Nöromüsküler Blokerler (Roküronyum, Veküronyum, Sisatraküryum)',
            mechanism: 'Kas Proteolizinde Sinerjistik Artış (Kritik Hastalık Miyopatisi — ICUAW)',
            clinicalEffect:
              'YBÜ’de >24–48 saat NMB infüzyonu ile çok günlük yüksek doz Deksametazon (ör. DEXA-ARDS) birlikte kullanıldığında ağır kuadriparezi ve uzamış mekanik ventilasyon riski artar.',
            management:
              'NMB infüzyon süresini en kısa düzeyde tutun, TOF monitörizasyonu uygulayın ve erken fizyoterapi planlayın.',
          },
          {
            severity: 'C',
            agent: 'İnsülin & Oral Antidiyabetikler (Metformin, Sülfonilüreler, SGLT2i)',
            mechanism: 'Hepatik Glukoneogenez Artışı & Periferik İnsülin Direnci',
            clinicalEffect:
              'Antidiyabetiklerin kan şekerini düşürücü etkisini antagonize ederek 24–72 saat süren hiperglisemiye yol açar; steroid kesildiğinde ise ani hipoglisemi riski oluşur.',
            management:
              'Perioperatif ve YBÜ hastalarında kan şekerini 4–6 saatte bir izleyin (hedef 140–180 mg/dL) ve steroid sonlandığında insülin dozunu hızla azaltın.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.)',
            title: "Miller's Anesthesia, 10th Edition — PONV Prophylaxis, Regional Anesthesia Adjuvants & Corticosteroids.",
            journal: 'Elsevier',
            year: 2025,
            note: 'Perioperatif PONV profilaksisi, multimodal analjezi, periferik sinir bloğu IV/perinöral adjuvan kullanımı ve sentetik kortikosteroid farmakolojisi.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD (Eds.)',
            title: "Stoelting's Pharmacology & Physiology in Anesthetic Practice, 6th Edition — Synthetic Glucocorticoids (Dexamethasone).",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'Deksametazonun C9-flor/C16-metil yapı-aktivite ilişkisi, 25–30× GR-α seçiciliği, 0 mineralokortikoid etki, CBG’ye bağlanmaması ve plasental 11β-HSD2 direnci.',
          },
          {
            authors: 'Gan TJ, Belani KG, Bergese S, et al.',
            title: 'Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting.',
            journal: 'Anesth Analg',
            year: 2020,
            pmid: '32467512',
            doi: '10.1213/ANE.0000000000004833',
            note: 'Yetişkinlerde 4–8 mg IV (indüksiyonda) ve pediatrik hastalarda 0,15 mg/kg IV Deksametazon için Kanıt 1A PONV profilaksisi ve Ondansetron kombinasyon önerisi.',
          },
          {
            authors: 'RECOVERY Collaborative Group (Horby P, Lim WS, Emberson JR, et al.)',
            title: 'Dexamethasone in Hospitalized Patients with Covid-19.',
            journal: 'N Engl J Med',
            year: 2021,
            pmid: '32678530',
            note: 'n=6425 RCT: Mekanik ventilasyondaki ağır COVID-19 hastalarında 6 mg/gün × 10 gün Deksametazon 28 günlük mortaliteyi %36 azaltmıştır (RR 0,64); O₂ gerektirmeyenlerde yarar göstermemiştir.',
          },
          {
            authors: 'Villar J, Ferrando C, Martínez D, et al. (DEXA-ARDS Network)',
            title: 'Dexamethasone treatment for the acute respiratory distress syndrome: a multicentre, randomised controlled trial.',
            journal: 'Lancet Respir Med',
            year: 2020,
            pmid: '32043986',
            doi: '10.1016/S2213-2600(19)30417-5',
            note: 'n=277 RCT: Orta-ağır ARDS’de (PaO₂/FiO₂ < 200) 20 mg/gün × 5 gün → 10 mg/gün × 5 gün IV Deksametazon ventilatörsüz günleri +4,8 gün artırmış ve 60 günlük mortaliteyi düşürmüştür (%21 vs %36; p=0,0047).',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/dexamethasone.html"
        medscapeUrl="https://reference.medscape.com/drug/decadron-dexamethasone-intensol-dexamethasone-342741"
      />
    </div>
  );
};
