import React, { useState, useId } from 'react';
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
  Info,
  Layers,
  RotateCcw,
  Scale,
  ShieldCheck,
  Syringe,
  Wind,
  Zap,
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

interface Props {
  isDark: boolean;
}

type CalcScenario =
  | 'bronchospasm_anaphylaxis'
  | 'post_extubation'
  | 'ards_meduri'
  | 'pulse_therapy'
  | 'steroid_converter';

type BronchoMode =
  | 'adult_moderate'
  | 'adult_severe'
  | 'pediatric_asthma'
  | 'anaphylaxis_adjuvant';

type ExtubationMode = 'francois_2007' | 'single_dose_40';
type PulseDosePreset = 250 | 500 | 1000;
type PulseDurationMin = 30 | 60;

export const MethylprednisoloneProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [scenario, setScenario] = useState<CalcScenario>('bronchospasm_anaphylaxis');

  // 1. Bronkospazm / Astım / KOAH & Anafilaksi Adjuvanı
  const [bronchoWeightKg, setBronchoWeightKg] = useState<number>(70);
  const [bronchoMode, setBronchoMode] = useState<BronchoMode>('adult_moderate');

  // 2. Post-Ekstübasyon Laringeal Ödem / Stridor
  const [extubationMode, setExtubationMode] = useState<ExtubationMode>('francois_2007');

  // 3. Orta-Ağır ARDS (Meduri 2007 Sürekli İnfüzyon)
  const [ardsWeightKg, setArdsWeightKg] = useState<number>(70);

  // 4. Yüksek Doz Pulse Tedavi
  const [pulseIsPediatric, setPulseIsPediatric] = useState<boolean>(false);
  const [pulsePresetMg, setPulsePresetMg] = useState<PulseDosePreset>(500);
  const [pulsePedWeightKg, setPulsePedWeightKg] = useState<number>(25);
  const [pulsePedMgPerKg, setPulsePedMgPerKg] = useState<number>(20);
  const [pulseDurationMin, setPulseDurationMin] = useState<PulseDurationMin>(60);

  // 5. Steroid Eşdeğerlik Dönüştürücü
  const [converterMpMg, setConverterMpMg] = useState<number>(40);

  // Akordiyon State'i
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik Kimlikleri
  const bronchoWeightSliderId = useId();
  const bronchoWeightInputId = useId();
  const ardsWeightSliderId = useId();
  const ardsWeightInputId = useId();
  const pulsePedWeightSliderId = useId();
  const pulsePedWeightInputId = useId();
  const converterInputId = useId();

  // --- HESAPLAMALAR ---
  // 1. Bronkospazm / Astım / KOAH & Anafilaksi Adjuvanı
  const bronchoCalc = (() => {
    if (bronchoMode === 'adult_moderate') {
      return {
        label: 'Yetişkin Astım / KOAH Alevlenmesi (Standart)',
        loadingMg: 40,
        maintenanceText: '40 mg IV q6–8h (veya günlük 40–80 mg)',
        ampouleText: '1 × Prednol-L® 40 mg ampul (veya 2 × 20 mg)',
        note: 'GOLD/GINA kılavuzlarında çoğu akut KOAH/astım alevlenmesinde 40 mg/gün IV/PO (5–7 gün) etkilidir; ağır yoğun bakım bronkospazmında q6–8h bölünebilir.',
      };
    }
    if (bronchoMode === 'adult_severe') {
      return {
        label: 'Ağır Status Astmatikus / Perioperatif Bronkospazm',
        loadingMg: 125,
        maintenanceText: '40–80 mg IV q6–8h (ilk yükleme 80–125 mg IV)',
        ampouleText: '3 × Prednol-L® 40 mg (120 mg) veya 1 × Solu-Medrol® 125 mg',
        note: 'Etkisi 4–6 saatte başlar; inhale β₂-agonist, ipratropium, IV magnezyum ve gerekirse adrenalin tedavisinin yerini ASLA almaz.',
      };
    }
    if (bronchoMode === 'pediatric_asthma') {
      const loadMin = Math.min(Math.round(bronchoWeightKg * 1), 60);
      const loadMax = Math.min(Math.round(bronchoWeightKg * 2), 60);
      const maintMin = Math.min(Math.round(bronchoWeightKg * 0.5), 30);
      const maintMax = Math.min(Math.round(bronchoWeightKg * 1), 60);
      const amps20 = Math.ceil(loadMax / 20);
      const amps40 = Math.ceil(loadMax / 40);
      return {
        label: `Pediatrik Akut Astım (${bronchoWeightKg} kg)`,
        loadingMg: loadMax,
        loadingRange: `${loadMin}–${loadMax} mg`,
        maintenanceText: `${maintMin}–${maintMax} mg IV q6h (0,5–1 mg/kg q6h)`,
        ampouleText: `${amps40} × Prednol-L® 40 mg (veya ${amps20} × 20 mg) ampulden çekilir`,
        note: 'Pediatrik yükleme 1–2 mg/kg IV (maksimum 60 mg/doz), ardından 0,5–1 mg/kg IV q6h (maks 60 mg/doz).',
      };
    }
    // anaphylaxis_adjuvant
    const anaphMin = Math.min(Math.round(bronchoWeightKg * 1), 125);
    const anaphMax = Math.min(Math.round(bronchoWeightKg * 2), 125);
    const amps40 = Math.ceil(anaphMax / 40);
    return {
      label: `Anafilaksi Adjuvanı (${bronchoWeightKg} kg)`,
      loadingMg: anaphMax,
      loadingRange: `${anaphMin}–${anaphMax} mg`,
      maintenanceText: 'Tek doz IV (gerekirse q6h 1–2 gün; bifazik reaksiyon profilaksisi)',
      ampouleText: `${amps40} × Prednol-L® 40 mg (veya ${Math.ceil(anaphMax / 20)} × 20 mg)`,
      note: 'BİRİNCİL TEDAVİ DEĞİLDİR! Önce mutlaka IM/IV Adrenalin, sıvı resüsitasyonu ve hava yolu güvenliği sağlanmalıdır.',
    };
  })();

  // 3. Meduri ARDS Sürekli İnfüzyon Hesaplamaları
  // Standart pompa konsantrasyonu: 250 mg Prednol-L / 50 mL SF = 5 mg/mL
  const ARDS_PUMP_CONC_MG_ML = 5.0;
  const ardsLoadingMg = ardsWeightKg * 1.0; // 1 mg/kg IV 30 dk bolus
  const ardsDailyDay1to14Mg = ardsWeightKg * 1.0; // 1 mg/kg/gün
  const ardsHourlyDay1to14Mg = ardsDailyDay1to14Mg / 24;
  const ardsHourlyDay1to14Ml = ardsHourlyDay1to14Mg / ARDS_PUMP_CONC_MG_ML;
  const ardsDailyDay15to21Mg = ardsWeightKg * 0.5; // 0,5 mg/kg/gün
  const ardsHourlyDay15to21Mg = ardsDailyDay15to21Mg / 24;
  const ardsHourlyDay15to21Ml = ardsHourlyDay15to21Mg / ARDS_PUMP_CONC_MG_ML;

  // 4. Yüksek Doz Pulse Tedavi Hesaplamaları
  const pulseDoseMg = pulseIsPediatric
    ? Math.min(Math.round(pulsePedWeightKg * pulsePedMgPerKg), 1000)
    : pulsePresetMg;
  const pulseDilutionMl = pulseDoseMg <= 250 ? 100 : 250;
  const effectivePulseDurationMin = pulseDoseMg >= 500 && pulseDurationMin < 60 ? 60 : pulseDurationMin;
  const pulseRateMlHr = (pulseDilutionMl / effectivePulseDurationMin) * 60;
  const pulseAmp250Count = Math.ceil(pulseDoseMg / 250);

  // 5. Kortikosteroid Eşdeğerlik Dönüştürücü
  // 4 mg Metilprednizolon = 20 mg Hidrokortizon = 5 mg Prednizolon = 0,75 mg Deksametazon
  const eqHydrocortisoneMg = converterMpMg * 5;
  const eqPrednisoloneMg = converterMpMg * 1.25;
  const eqDexamethasoneMg = converterMpMg * 0.1875;

  // Canlı Kopyalama Özeti
  const buildCopySummary = (): string => {
    const activeCalcLine = (() => {
      if (scenario === 'bronchospasm_anaphylaxis') {
        const doseStr = bronchoCalc.loadingRange ? bronchoCalc.loadingRange : `${bronchoCalc.loadingMg} mg`;
        return `• Aktif Hesaplama (${bronchoCalc.label}): Yükleme ${doseStr} IV | İdame: ${bronchoCalc.maintenanceText} (${bronchoCalc.ampouleText})`;
      }
      if (scenario === 'post_extubation') {
        return extubationMode === 'francois_2007'
          ? `• Aktif Rejim (Post-Ekstübasyon Stridor — François Lancet 2007): Ekstübasyondan 12 sa önce başlayarak 20 mg IV q4h × 4 doz (-12h, -8h, -4h, 0h = 80 mg toplam; 4 × Prednol-L® 20 mg)`
          : `• Aktif Rejim (Post-Ekstübasyon Stridor — Tek Doz 4 sa Önce): Ekstübasyondan 4 saat önce 40 mg IV tek doz (1 × Prednol-L® 40 mg)`;
      }
      if (scenario === 'ards_meduri') {
        return `• Aktif Hesaplama (Erken Ağır ARDS — Meduri Protokolü, IBW/AdjBW ${ardsWeightKg} kg): ${ardsLoadingMg.toFixed(
          0
        )} mg IV yükleme (30 dk) → 1.–14. gün ${ardsDailyDay1to14Mg.toFixed(0)} mg/gün (${ardsHourlyDay1to14Mg.toFixed(
          2
        )} mg/sa = ${ardsHourlyDay1to14Ml.toFixed(2)} mL/sa [250 mg / 50 mL SF = 5 mg/mL]) → 15.–21. gün ${ardsDailyDay15to21Mg.toFixed(
          1
        )} mg/gün (${ardsHourlyDay15to21Ml.toFixed(2)} mL/sa) + kademeli azaltma`;
      }
      if (scenario === 'pulse_therapy') {
        return `• Aktif Hesaplama (Yüksek Doz IV Pulse): ${pulseDoseMg} mg IV / ${pulseDilutionMl} mL SF veya D5W içinde ${effectivePulseDurationMin} dk infüzyon (${pulseRateMlHr.toFixed(
          0
        )} mL/sa · ${pulseAmp250Count} × Prednol-L® 250 mg) — Sürekli EKG, K⁺ ve glisemi takibi ZORUNLU!`;
      }
      return `• Steroid Eşdeğerliği (${converterMpMg} mg Metilprednizolon): Hidrokortizon ${eqHydrocortisoneMg.toFixed(
        0
      )} mg | Prednizolon ${eqPrednisoloneMg.toFixed(1)} mg | Deksametazon ${eqDexamethasoneMg.toFixed(2)} mg`;
    })();

    return [
      `METİLPREDNİZOLON SODYUM SÜKSİNAT (TR: Prednol-L® 20/40/250 mg · Precort-Liyo® · Solu-Medrol®) KLİNİK ÖZETİ`,
      `• Farmakolojik Profil: 5× Glukokortikoid · 0,5× (Minimal) Mineralokortikoid · Orta Etkili (Biyolojik Etki: 12–36 saat) · Yüksek Akciğer Penetrasyonu`,
      activeCalcLine,
      `• Eşdeğerlik Kuralı: 4 mg Metilprednizolon = 20 mg Hidrokortizon = 5 mg Prednizolon = 0,75 mg Deksametazon`,
      `• Kritik Güvenlik: ≥250 mg pulse dozlar ASLA <30 dk hızlı puşe edilmez (aritmi/kardiyak arrest riski — ≥30–60 dk infüzyon + EKG)! Akut TBH'de (MRC CRASH) KESİNLİKLE KONTRENDİKEDİR!`,
    ].join('\n');
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HIZLI BÖLÜM NAVİGASYON BARI (v5.0)                               */}
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
      {/* 2. ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (VARSAYILAN KAPALI)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="sec-guvenlik"
        defaultOpen={false}
        tallManName="METHYLPREDNISOLONE"
        confusionRiskWith="Prednizolon (4× GK / 0,8 MK) · Deksametazon (25–30× GK / 0 MK!) · Hidrokortizon (1× GK / 1:1 MK) · Medroksiprogesteron (LASA!)"
        criticalAlerts={[
          'Pulse Doz Kardiyak Arrest Riski: ≥250–1000 mg IV pulse dozların <30 dakika içinde hızlı verilmesi ölümcül ventriküler aritmi, ciddi sinüs bradikardisi ve ani kardiyak arreste yol açar — mutlaka 100–250 mL SF/D5W içinde ≥30–60 dakika infüzyon ve sürekli EKG/K⁺ monitörizasyonu gerekir.',
          'TBH’de Kesin Kontrendikasyon (MRC CRASH, Lancet 2004): Travmatik beyin hasarında 48 saatlik yüksek doz metilprednizolon infüzyonu 14 günlük mortaliteyi anlamlı artırdığı (%21,1 vs %17,9; RR 1,18; p=0,0001) için kesinlikle uygulanmaz.',
          'Anestezide & YBÜ’de Akut Bronkospazm / Anafilaksi: Genomik anti-inflamatuar etkisi 4–6 saatte pik yapar; anafilakside ve status astmatikusta Adrenalin ve inhale β₂-agonistlerin yerini ASLA almaz, yalnızca geç faz/bifazik reaksiyonu önleyici adjuvandır.',
          'Akut Spinal Kord Yaralanması (NASCIS) Uyarısı: Güncel CNS/AANS kılavuzları artmış pnömoni, sepsis ve GİS kanaması riski nedeniyle yüksek doz (30 mg/kg bolus + 5,4 mg/kg/sa infüzyon) protokolünü rutin önermez (yalnızca seçilmiş <8 saat vakalarda nöroşirürji konsültasyonu ile tartışılabilir).',
        ]}
        antidoteOrRescue="Pulse İnfüzyon Sırasında Bradikardi / Aritmi: İnfüzyonu derhal durdurun, sürekli EKG ve serum K⁺/Mg²⁺ kontrolü yapın; semptomatik bradikardide Atropin 0,5–1 mg IV veya transkütan pacing hazırlayın. Akut Hiperglisemi: IV insülin protokolü (hedef 140–180 mg/dL). Anafilaksi / Şiddetli Bronkospazm: Birincil kurtarıcı daima Adrenalin (IM/IV) ve inhale β₂-agonisttir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. BAŞLIK, FARMAKOLOJİK KATEGORİ & YATAK BAŞI ETKİ MEKANİZMASI      */}
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
                Orta Etkili Sentetik Glukokortikoid (5× GK · 0,5× MK)
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                TR Liyofilize Ampul: 20 / 40 / 250 mg — Prednol-L® / Precort-Liyo®
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Biyolojik Etki: 12 – 36 Saat
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: H02AB04</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Metilprednizolon Sodyum Süksinat (Prednol-L® / Precort-Liyo® / Solu-Medrol®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong>{' '}
              C6-α-metil modifikasyonu sayesinde kortizole göre <strong>5 kat daha güçlü</strong> anti-inflamatuar
              aktivite ve <strong>minimal (0,5×) mineralokortikoid</strong> etki gösteren orta etkili sentetik
              glukokortikoiddir. Üstün <strong>akciğer/bronkoalveoler doku penetrasyonu</strong> nedeniyle
              ameliyathanede ve YBÜ&apos;de akut astım/KOAH alevlenmesi, perioperatif bronkospazm, post-ekstübasyon
              laringeal ödem profilaksisi (François protokolü), erken orta-ağır ARDS (Meduri sürekli infüzyonu),
              anafilaksi adjuvanı ve immünsüpresif pulse tedavide temel ajandır.
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
                <Wind className="w-4 h-4 shrink-0" />
                <span>Üstün Akciğer &amp; Hava Yolu Penetrasyonu</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15 shrink-0">Bronkospazm · ARDS</span>
            </div>
            <p className="text-xs leading-relaxed">
              Bronkoalveoler sıvı ve akciğer parankiminde plazmaya kıyasla yüksek doku konsantrasyonuna ulaşır;{' '}
              <strong>β₂-adrenerjik reseptörleri up-regüle</strong> ederek bronkodilatör yanıtı güçlendirir ve
              laringeal/alveoler ödemi baskılar.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Dengeli Orta Etkili Profil (5× GK · 0,5× MK)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15 shrink-0">12–36 Saat Etki</span>
            </div>
            <p className="text-xs leading-relaxed">
              Hidrokortizona göre çok daha az sıvı/sodyum tutulumu yaparken, Deksametazon&apos;a kıyasla daha kısa
              doku yarı ömrü (<strong>12–36 saat</strong>) sayesinde <strong>HPA aksı baskılanması</strong> ve
              kademeli azaltma yönetimi daha esnektir.
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
                <span>Çift Fazlı Etki: Genomik &amp; Pulse Non-Genomik</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/15 shrink-0">&gt;250 mg Hızlı Membran</span>
            </div>
            <p className="text-xs leading-relaxed">
              Standart dozlarda (20–125 mg) <strong>GR-α genomik</strong> etki <strong>4–6 saatte</strong> pik yapar;
              <strong> ≥250–1000 mg pulse</strong> dozlarda ek olarak dakikalar içinde başlayan{' '}
              <strong>non-genomik membran stabilizasyonu</strong> (cPLA₂/eNOS) devreye girer.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) ÖZELLİKLERİ AKORDİYONU (#sec-pkpd)         */}
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
                  Plazma t½: 2,4–3,5 sa · Biyolojik Etki: 12–36 sa · CYP3A4
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Sodyum süksinat ester ön-ilaç hidrolizi, yüksek akciğer/BAL dağılımı (Vd 41–61,5 L), %77 albümin bağlanması ve CYP3A4 hepatik klirensi.
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
                  Etki Başlangıcı (Pik)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  1 – 2 sa (4–6 sa)
                </span>
                <span className="text-[10px] text-slate-400">Anafilakside Adrenalin yerine geçmez</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma t½ &amp; Klirens
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  2,4 – 3,5 Saat
                </span>
                <span className="text-[10px] text-slate-400">CL: 15–16 L/sa · Vd: 41–61,5 L</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Biyolojik Etki Süresi
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  12 – 36 Saat
                </span>
                <span className="text-[10px] text-slate-400">Orta etkili · 5× GK / 0,5× MK</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Plazma Protein Bağlanması
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  ~%77
                </span>
                <span className="text-[10px] text-slate-400">Başlıca Albümin · Lineer PK</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Ester Ön-İlaç Hidrolizi &amp; Üstün Akciğer/BAL Dağılımı (Prednol-L® KÜB):
                </strong>{' '}
                IV uygulanan <strong>metilprednizolon sodyum süksinat</strong> suda çözünür bir ester ön-ilaçtır ve
                plazma esterazlarıyla dakikalar içinde aktif serbest metilprednizolona hidrolize olur. Dağılım hacmi{' '}
                <strong>41–61,5 L</strong> (~0,7–1,2 L/kg) olup, plazmada yaklaşık <strong>%77</strong> oranında
                başlıca <strong>albümine</strong> bağlanır (transkortin/CBG&apos;ye bağlanma minimal olduğundan geniş
                doz aralığında doğrusal farmakokinetik sergiler). Prednizolona kıyasla <strong>akciğer parankimi ve
                bronkoalveoler lavaj (BAL) sıvısına</strong> çok daha yüksek oranda penetre olur.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Hepatik CYP3A4 Metabolizması, Potens &amp; Eliminasyon:
                </strong>{' '}
                Karaciğerde primer olarak <strong>CYP3A4</strong> enzimi ve 11β-HSD/20-ketoredüktaz yolaklarıyla
                inaktif <strong>20β-hidroksimetilprednizon</strong> ve 20α-hidroksi metabolitlerine dönüştürülür;
                total vücut klirensi <strong>15–16 L/saat</strong>, plazma yarı ömrü <strong>2,4–3,5 saat</strong>tir
                (metabolitler glukuronid/sülfat konjugatları halinde ağırlıklı olarak idrarla atılır, &lt;%10 değişmeden
                atılır). Kortizole kıyasla <strong>5× glukokortikoid</strong> ve <strong>0,5× (minimal) mineralokortikoid</strong>{' '}
                potense sahiptir; doku biyolojik etkisi <strong>12–36 saat</strong> (orta etkili) sürer.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. KONTRENDİKASYONLAR — ENDİKASYONLARDAN ÖNCE (#sec-kontrendikasyon)*/}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Akut Travmatik Beyin Hasarı (TBH — MRC CRASH Trial, Lancet 2004): 48 saatlik yüksek doz metilprednizolon infüzyonu 14 günlük mortaliteyi anlamlı artırdığı (%21,1 vs %17,9; RR 1,18) için TBH’de KESİNLİKLE kontrendikedir.',
          'Sistemik kontrolsüz fungal enfeksiyonlar (invaziv kandidiyazis, aspergilloz, mukormikoz — yaşamı tehdit eden acil durumlar hariç).',
          'İnek sütü proteinine veya laktoza bilinen aşırı duyarlılık (40 mg liyofilize flakon/ampuller laktoz monohidrat yardımcı maddesi içerebilir — akut astım/alerji hastasında ciddi anafilaksi ve paradoksal bronkospazm tetikleyebilir!).',
          'İmmünsüpresif yüksek doz sistemik tedavi sırasında canlı veya canlı-atenüe aşı uygulaması.',
          'İntratekal uygulama (ciddi araknoidit/menenjit/nörotoksisite riski) ve ≥250 mg yüksek doz pulse uygulamanın <30 dakika içinde hızlı IV puşesi (kardiyak arrest riski).',
        ]}
        relativeTitle="Göreceli Kontrendikasyonlar & Dikkat Edilecek Durumlar"
        relativeItems={[
          'Akut Spinal Kord Yaralanması (NASCIS): Güncel CNS/AANS kılavuzları artmış pnömoni, sepsis ve GİS kanama riski nedeniyle 30 mg/kg yüksek doz rejimi rutin önermez.',
          'Kontrolsüz diyabet / ağır hiperglisemi, aktif peptik ülser veya yakın dönem üst GİS kanama (çok günlük tedavide PPI profilaksisi ve 4–6 saatlik glisemi takibi zorunludur).',
          'Ağır konjestif kalp yetmezliği, kontrolsüz hipertansiyon, hipokalemi veya yapısal kalp hastalığı (0,5× mineralokortikoid sıvı yükü ve pulse dozda ventriküler aritmi/bradikardi riski).',
          'YBÜ’de uzun süreli non-depolarizan NMB infüzyonu alan hastalar (kritik hastalık miyopatisi — ICUAW riskinde belirgin sinerji!).',
          'Latent tüberküloz, oküler herpes simpleks, yakın dönem intestinal anastomoz veya ağır psikiyatrik bozukluk öyküsü.',
        ]}
        clinicalNote="Akut astım veya anafilaksi hastasına 40 mg Metilprednizolon (laktoz içeren formülasyon) verdikten sonra bronkospazm veya ürtiker paradoksal olarak kötüleşirse inek sütü proteini/laktoz alerjisinden şüphelenin ve laktozsuz (20/125/250 mg veya Deksametazon) forma geçin!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. ENDİKASYONLAR & KLİNİK KANIT (#sec-endikasyon)                    */}
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
            Endikasyonlar &amp; Klinik Kanıt (François 2007 · Meduri 2007 · SCCM 2024)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Akut Astım & KOAH Alevlenmesi / Perioperatif Bronkospazm */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-500 shrink-0" />
                <span>1. Akut Astım &amp; KOAH Alevlenmesi / Perioperatif Bronkospazm</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                40–125 mg IV · GINA/GOLD
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Yetişkin orta-ağır alevlenmede{' '}
              <strong className="font-mono text-slate-900 dark:text-white">40–80 mg IV</strong> (ağır status
              astmatikusta <strong className="font-mono">80–125 mg IV</strong> yükleme, ardından{' '}
              <strong className="font-mono">40–60 mg q6–8h</strong>); pediatrik{' '}
              <strong className="font-mono text-slate-900 dark:text-white">1–2 mg/kg</strong> (maks{' '}
              <strong className="font-mono">60 mg</strong>). Akciğer dokusuna yüksek geçişiyle bronşiyal inflamasyonu
              geriletir ve β₂-reseptör duyarlılığını geri kazandırır.
            </p>
          </div>

          {/* 2. Post-Ekstübasyon Laringeal Ödem / Stridor Profilaksisi */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>2. Post-Ekstübasyon Laringeal Ödem / Stridor Profilaksisi</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                François Lancet 2007
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>François Protokolü (Altın Standart):</strong> Planlı ekstübasyondan{' '}
              <strong>12 saat önce</strong> başlayarak{' '}
              <strong className="font-mono text-slate-900 dark:text-white">20 mg IV q4h × 4 doz</strong> (toplam{' '}
              <strong className="font-mono">80 mg</strong>: -12h, -8h, -4h, 0h). <strong>Alternatif (Cheng):</strong>{' '}
              Ekstübasyondan <strong>4 saat önce</strong> tek doz{' '}
              <strong className="font-mono text-slate-900 dark:text-white">40 mg IV</strong> (cuff-leak testi negatif
              yüksek riskli hastalarda).
            </p>
          </div>

          {/* 3. Orta-Ağır ARDS & Ağır Toplum Kökenli Pnömoni */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                <span>3. Orta-Ağır ARDS &amp; Ağır Toplum Kökenli Pnömoni (CAP)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                Meduri 2007 · SCCM 2024
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Erken Ağır ARDS (Meduri):</strong>{' '}
              <strong className="font-mono text-slate-900 dark:text-white">1 mg/kg IV</strong> yükleme (30 dk) →{' '}
              <strong className="font-mono text-slate-900 dark:text-white">1 mg/kg/gün</strong> sürekli IV infüzyon ×
              14 gün → 15–21. gün <strong className="font-mono">0,5 mg/kg/gün</strong> + kademeli azaltma.{' '}
              <strong>SCCM 2024</strong> ağır CAP ve ARDS&apos;de kortikosteroid kullanımını (Metilprednizolon veya
              Hidrokortizon/Deksametazon) önermektedir.
            </p>
          </div>

          {/* 4. Anafilaksi Adjuvanı & İmmünsüpresif Pulse Tedavi */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
                <span>4. Anafilaksi Adjuvanı &amp; İmmünsüpresif Pulse Tedavi</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                250–1000 mg ≥30–60 dk
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Anafilaksi Adjuvanı:</strong> Adrenalin sonrasında{' '}
              <strong className="font-mono text-slate-900 dark:text-white">1–2 mg/kg</strong> (maks{' '}
              <strong className="font-mono">125 mg IV</strong>). <strong>İmmünsüpresif Pulse</strong> (MS atağı,
              ANCA-vaskülit, lupus nefriti, akut solid organ rejeksiyonu):{' '}
              <strong className="font-mono text-slate-900 dark:text-white">250–1000 mg/gün IV × 3–5 gün</strong>,
              mutlaka <strong>≥30–60 dk infüzyon</strong> ve EKG monitörizasyonu ile!
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
                <span>François (Lancet 2007, n=761) &amp; Meduri ARDS (Chest 2007, n=91)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-800 dark:text-teal-200 shrink-0">
                PMID: 17398307 · 17426195
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>François</strong> çalışmasında ekstübasyondan 12 saat önce başlanan 20 mg q4h × 4 doz (80 mg)
              Metilprednizolon, post-ekstübasyon laringeal ödemi <strong>%22&apos;den %3&apos;e (p&lt;0,0001)</strong> ve
              ödem kaynaklı re-entübasyonu <strong>%54&apos;ten %8&apos;e</strong> düşürdü. <strong>Meduri</strong>{' '}
              çalışmasında erken ağır ARDS&apos;de 1 mg/kg/gün sürekli infüzyon, 7. günde akciğer hasarı skorunu
              iyileştirdi ve mekanik ventilasyon süresini kısalttı.
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
                <span>SCCM 2024 Focused Update &amp; MRC CRASH (Lancet 2004, n=10.008)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-800 dark:text-rose-200 shrink-0">
                PMID: 38240492 · 15474134
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              <strong>SCCM 2024</strong> kılavuzu ağır bakteriyel CAP için güçlü, ARDS için koşullu sistemik steroid
              önerisi sunar. Buna karşılık <strong>MRC CRASH</strong> (n=10.008), akut TBH&apos;de 48 saatlik yüksek doz
              metilprednizolon infüzyonunun 14 günlük mortaliteyi artırdığını (<strong>%21,1 vs %17,9; RR 1,18</strong>)
              kanıtlayarak TBH&apos;de steroidi kesin kontrendike kılmıştır.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. DOZAJ KADEMELERİ & KLİNİK SENARYO REJİMLERİ (#sec-dozaj)          */}
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
          <span className="text-xs font-mono text-slate-500">TR Prednol-L®: 20 mg · 40 mg · 250 mg</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: Bronkospazm / Astım / KOAH */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'bronchospasm_anaphylaxis'
                ? 'border-teal-500 bg-teal-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  Bronkospazm / Astım / KOAH
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  GINA / GOLD
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                40 – 125 <span className="text-xs font-sans font-normal text-slate-500">mg IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Standart alevlenme <strong>40 mg IV q6–8h</strong>; ağır status astmatikus veya perioperatif
                bronkospazm <strong>80–125 mg IV</strong> yükleme. Anafilakside 1–2 mg/kg (maks 125 mg) adjuvan.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-medium">
              ✓ Pediatrik: 1–2 mg/kg (maks 60 mg) → 0,5–1 mg/kg q6h
            </div>
          </div>

          {/* Kademe 2: Post-Ekstübasyon Stridor */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'post_extubation'
                ? 'border-indigo-500 bg-indigo-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Post-Ekstübasyon Stridor
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  François 2007
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                20 mg <span className="text-xs font-sans font-normal text-slate-500">q4h × 4 (80 mg)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Ekstübasyondan <strong>12 saat önce</strong> başlayarak -12h, -8h, -4h, 0h&apos;da 20 mg IV (4 ×
                Prednol-L® 20 mg). Alternatif: 4 saat önce tek doz <strong>40 mg IV</strong>.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
              ✓ Cuff-leak &lt;110 mL veya &lt;%10–24 riskli hastalarda
            </div>
          </div>

          {/* Kademe 3: ARDS Meduri İnfüzyon */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'ards_meduri'
                ? 'border-amber-500 bg-amber-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  ARDS Meduri İnfüzyon
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  Meduri / SCCM
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                1 mg/kg <span className="text-xs font-sans font-normal text-slate-500">→ 1 mg/kg/gün</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                <strong>Yükleme:</strong> 1 mg/kg IV (30 dk). <strong>1–14. Gün:</strong> 1 mg/kg/gün sürekli infüzyon
                (250 mg / 50 mL SF = 5 mg/mL). <strong>15–21. Gün:</strong> 0,5 mg/kg/gün → kademeli azaltma.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
              ⚠ Ani kesilmez (rebound ARDS riski!) · IBW/AdjBW kullanın
            </div>
          </div>

          {/* Kademe 4: Yüksek Doz Pulse */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              scenario === 'pulse_therapy'
                ? 'border-rose-500 bg-rose-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Yüksek Doz Pulse
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  ≥30–60 dk EKG!
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                250 – 1000 <span className="text-xs font-sans font-normal text-slate-500">mg/gün IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                MS atağı, vaskülit, akut organ rejeksiyonu için <strong>3–5 gün</strong>. Mutlaka{' '}
                <strong>100–250 mL SF/D5W</strong> içinde <strong>≥30–60 dk</strong> infüzyonla verilir.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-rose-600 dark:text-rose-400 font-medium">
              ⚠ &lt;30 dk hızlı puşe = ölümcül bradikardi / kardiyak arrest!
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. İNTERAKTİF 5 SEKMELİ KLİNİK DOZ, İNFÜZYON & DÖNÜŞTÜRÜCÜ          */}
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
                İnteraktif Klinik Doz, ARDS İnfüzyon, Pulse &amp; Steroid Eşdeğerlik Hesaplayıcı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                TR Prednol-L® / Precort-Liyo® 20 mg · 40 mg · 250 mg liyofilize ampuller ve 5 mg/mL pompa şeması
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setScenario('bronchospasm_anaphylaxis');
              setBronchoWeightKg(70);
              setBronchoMode('adult_moderate');
              setExtubationMode('francois_2007');
              setArdsWeightKg(70);
              setPulseIsPediatric(false);
              setPulsePresetMg(500);
              setPulsePedWeightKg(25);
              setPulsePedMgPerKg(20);
              setPulseDurationMin(60);
              setConverterMpMg(40);
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
            { id: 'bronchospasm_anaphylaxis', label: '1. Bronkospazm & Anafilaksi' },
            { id: 'post_extubation', label: '2. Post-Ekstübasyon Stridor' },
            { id: 'ards_meduri', label: '3. ARDS (Meduri İnfüzyon)' },
            { id: 'pulse_therapy', label: '4. Yüksek Doz Pulse' },
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

        {/* SEKME 1: BRONKOSPAZM / ASTIM / KOAH & ANAFİLAKSİ */}
        {scenario === 'bronchospasm_anaphylaxis' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor={bronchoWeightSliderId}
                      className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400"
                    >
                      Hasta Ağırlığı (10 – 140 kg)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={bronchoWeightInputId}
                        type="number"
                        min={10}
                        max={140}
                        value={bronchoWeightKg}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (!Number.isNaN(val)) setBronchoWeightKg(Math.max(10, Math.min(140, val)));
                        }}
                        className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={bronchoWeightSliderId}
                    type="range"
                    min={10}
                    max={140}
                    step={1}
                    value={bronchoWeightKg}
                    onChange={(e) => setBronchoWeightKg(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                    <span>10 kg (Pediatrik)</span>
                    <span>40 kg</span>
                    <span>70 kg (Standart)</span>
                    <span>140 kg</span>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Klinik Senaryo Seçimi
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'adult_moderate', title: 'Yetişkin Astım / KOAH', sub: '40 mg IV q6–8h' },
                      { id: 'adult_severe', title: 'Ağır Status Astmatikus', sub: '80–125 mg IV yükleme' },
                      { id: 'pediatric_asthma', title: 'Pediatrik Astım', sub: '1–2 mg/kg (maks 60 mg)' },
                      { id: 'anaphylaxis_adjuvant', title: 'Anafilaksi Adjuvanı', sub: '1–2 mg/kg (maks 125 mg)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBronchoMode(opt.id as BronchoMode)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          bronchoMode === opt.id
                            ? 'border-teal-500 bg-teal-500/15 text-teal-800 dark:text-teal-200'
                            : isDark
                            ? 'border-slate-700 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.title}</div>
                        <div className="text-[11px] font-mono opacity-80 mt-0.5">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border flex flex-col justify-between ${
                  isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Başlangıç / Yükleme IV Doz
                    </span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {bronchoCalc.loadingRange ? bronchoCalc.loadingRange : `${bronchoCalc.loadingMg} mg`}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      Yavaş IV (≥5–10 dk, 50 mL SF içinde)
                    </span>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      TR Prednol-L® Ampul Karşılığı
                    </span>
                    <div className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1.5 leading-snug">
                      {bronchoCalc.ampouleText}
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      İdame: {bronchoCalc.maintenanceText}
                    </span>
                  </div>
                </div>

                <div
                  className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                    isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-teal-100 text-slate-700'
                  }`}
                >
                  <strong>Klinik Not:</strong> {bronchoCalc.note}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 2: POST-EKSTÜBASYON LARİNGEAL ÖDEM / STRİDOR */}
        {scenario === 'post_extubation' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setExtubationMode('francois_2007')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  extubationMode === 'francois_2007'
                    ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                François 2007 Protokolü (20 mg q4h × 4 = 80 mg)
              </button>
              <button
                type="button"
                onClick={() => setExtubationMode('single_dose_40')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  extubationMode === 'single_dose_40'
                    ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                    : isDark
                    ? 'border-slate-700 bg-slate-800 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                Tek Doz 4 Saat Önce (Cheng — 40 mg IV)
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {extubationMode === 'francois_2007' ? (
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'}`}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    François Protokolü (Lancet 2007 — Çoklu Doz)
                  </span>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                    20 mg IV q4h × 4 Doz
                  </div>
                  <div className="text-xs font-mono text-indigo-700 dark:text-indigo-300 mt-1">
                    Toplam 80 mg · 4 × Prednol-L® 20 mg ampul
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-1.5 text-center font-mono text-[11px]">
                    {[
                      { t: '-12. saat', d: '20 mg' },
                      { t: '-8. saat', d: '20 mg' },
                      { t: '-4. saat', d: '20 mg' },
                      { t: '0. saat (Ekst.)', d: '20 mg' },
                    ].map((step) => (
                      <div
                        key={step.t}
                        className={`p-2 rounded-lg border ${
                          isDark ? 'bg-slate-900/80 border-slate-800 text-slate-200' : 'bg-white border-indigo-200 text-slate-800'
                        }`}
                      >
                        <div className="text-[10px] text-slate-500">{step.t}</div>
                        <div className="font-bold text-indigo-600 dark:text-indigo-400">{step.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'}`}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Alternatif Tek Doz Rejimi (Ekstübasyondan 4 Saat Önce)
                  </span>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                    40 mg IV Tek Doz
                  </div>
                  <div className="text-xs font-mono text-indigo-700 dark:text-indigo-300 mt-1">
                    Toplam 40 mg · 1 × Prednol-L® 40 mg ampul (4 saat önce)
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                    Ekstübasyonun 12 saat ertelenemediği durumlarda ekstübasyondan en az <strong>4 saat önce</strong>{' '}
                    40 mg IV uygulanır; ancak çok yüksek riskli hastalarda 12 saatlik çoklu doz protokolü daha güçlü
                    ödem gerilemesi sağlar.
                  </p>
                </div>
              )}

              <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Cuff-Leak Testi Kriterleri &amp; Hiperglisemi Uyarısı
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>
                    <strong>Pozitif Risk / Negatif Cuff-Leak:</strong> Kaf indirildiğinde inspiratuar–ekspiratuar tidal
                    hacim farkı <strong>&lt;110 mL</strong> veya tidal hacmin <strong>&lt;%10–24&apos;ü</strong> ise
                    steroid profilaksisi endikedir.
                  </li>
                  <li>
                    <strong>Yüksek Risk Faktörleri:</strong> &gt;6 gün entübasyon, zor/travmatik entübasyon, kadın
                    cinsiyet, geniş ETT (&gt;8,0 mm), baş-boyun cerrahisi.
                  </li>
                  <li>
                    <strong>Hiperglisemi &amp; Deliryum İzlemi:</strong> 80 mg toplam doz diyabetik/YBÜ hastalarında
                    belirgin glisemi artışı yapabilir; 4–6 saatlik kan şekeri takibi (hedef 140–180 mg/dL) uygulayın.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 3: ARDS (MEDURİ 2007 SÜREKLİ İNFÜZYON) */}
        {scenario === 'ards_meduri' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={ardsWeightSliderId}
                    className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400"
                  >
                    İdeal / Düzeltilmiş Ağırlık (IBW / AdjBW)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={ardsWeightInputId}
                      type="number"
                      min={40}
                      max={130}
                      value={ardsWeightKg}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!Number.isNaN(val)) setArdsWeightKg(Math.max(40, Math.min(130, val)));
                      }}
                      className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">kg</span>
                  </div>
                </div>
                <input
                  id={ardsWeightSliderId}
                  type="range"
                  min={40}
                  max={130}
                  step={1}
                  value={ardsWeightKg}
                  onChange={(e) => setArdsWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  <strong>Standart Pompa Hazırlığı (5 mg/mL):</strong> 1 × Prednol-L® <strong>250 mg</strong> ampul
                  sulandırılıp <strong>50 mL SF</strong>&apos;ye tamamlanır (<strong>5 mg/mL</strong>). Obez hastalarda
                  doz hesabında gerçek ağırlık (TBW) yerine <strong>IBW / AdjBW</strong> kullanılır.
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  <strong>SCCM 2024 Koşullu Öneri:</strong> Orta-ağır ARDS&apos;de (PaO₂/FiO₂ &lt;200) erken dönemde
                  (&lt;14 gün) başlanır; 21. günden sonra 0,25 mg/kg/gün → 0,125 mg/kg/gün şeklinde kademeli azaltılır
                  (ani kesilmede rebound ARDS gelişir!).
                </p>
              </div>

              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-amber-950/20 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Yükleme (30 dk)</span>
                    <div className="text-xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
                      {ardsLoadingMg.toFixed(0)} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">1 mg/kg IV bolus</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-teal-600 dark:text-teal-400">1.–14. Gün (1 mg/kg/g)</span>
                    <div className="text-xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {ardsHourlyDay1to14Ml.toFixed(2)} mL/sa
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {ardsHourlyDay1to14Mg.toFixed(2)} mg/sa ({ardsDailyDay1to14Mg.toFixed(0)} mg/gün)
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">15.–21. Gün (0,5 mg/kg/g)</span>
                    <div className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                      {ardsHourlyDay15to21Ml.toFixed(2)} mL/sa
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {ardsHourlyDay15to21Mg.toFixed(2)} mg/sa ({ardsDailyDay15to21Mg.toFixed(1)} mg/gün)
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-amber-100 text-slate-700'}`}>
                  <strong>Enfeksiyon Sürveyansı &amp; NMB Uyarısı:</strong> Meduri protokolü sırasında ateş baskılanabilir;
                  yeni infiltrasyon/CRP artışı yakından izlenmeli, eşzamanlı non-depolarizan NMB infüzyonu mümkün olan
                  en kısa sürede sonlandırılmalıdır (ICUAW riski!).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 4: YÜKSEK DOZ PULSE TEDAVİ */}
        {scenario === 'pulse_therapy' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl border space-y-4 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setPulseIsPediatric(false)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                      !pulseIsPediatric
                        ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Yetişkin Pulse (250 / 500 / 1000 mg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPulseIsPediatric(true)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                      pulseIsPediatric
                        ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                        : isDark
                        ? 'border-slate-700 bg-slate-900 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Pediatrik Pulse (10–30 mg/kg · Maks 1000 mg)
                  </button>
                </div>

                {!pulseIsPediatric ? (
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Günlük IV Pulse Dozu (3–5 Gün)
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {([250, 500, 1000] as PulseDosePreset[]).map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setPulsePresetMg(preset);
                            if (preset >= 500) setPulseDurationMin(60);
                          }}
                          className={`py-2.5 rounded-xl border font-mono text-sm font-bold cursor-pointer ${
                            pulsePresetMg === preset
                              ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                              : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {preset} mg
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label htmlFor={pulsePedWeightSliderId} className="text-xs font-bold uppercase text-rose-600 dark:text-rose-400">
                        Pediatrik Ağırlık ({pulsePedMgPerKg} mg/kg)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          id={pulsePedWeightInputId}
                          type="number"
                          min={5}
                          max={60}
                          value={pulsePedWeightKg}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (!Number.isNaN(val)) setPulsePedWeightKg(Math.max(5, Math.min(60, val)));
                          }}
                          className={`w-16 px-2 py-1 rounded-lg border font-mono text-sm font-bold text-right ${
                            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <span className="text-xs font-mono text-slate-500">kg</span>
                      </div>
                    </div>
                    <input
                      id={pulsePedWeightSliderId}
                      type="range"
                      min={5}
                      max={60}
                      step={1}
                      value={pulsePedWeightKg}
                      onChange={(e) => setPulsePedWeightKg(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                    <div className="flex gap-2">
                      {[10, 20, 30].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setPulsePedMgPerKg(d)}
                          className={`px-3 py-1 rounded-lg border font-mono text-xs font-bold cursor-pointer ${
                            pulsePedMgPerKg === d
                              ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                              : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          {d} mg/kg
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Minimum İnfüzyon Süresi (≥500 mg için ≥60 dk Zorunlu)
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {([30, 60] as PulseDurationMin[]).map((dur) => {
                      const disabled = pulseDoseMg >= 500 && dur < 60;
                      return (
                        <button
                          key={dur}
                          type="button"
                          disabled={disabled}
                          onClick={() => setPulseDurationMin(dur)}
                          className={`py-2 rounded-xl border font-mono text-xs font-bold transition-all ${
                            disabled
                              ? 'opacity-40 cursor-not-allowed border-slate-700 text-slate-500'
                              : effectivePulseDurationMin === dur
                              ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 cursor-pointer'
                              : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300 cursor-pointer'
                              : 'border-slate-200 bg-white text-slate-700 cursor-pointer'
                          }`}
                        >
                          {dur} Dakika İnfüzyon
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'}`}>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-rose-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Pulse Doz</span>
                    <div className="text-xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                      {pulseDoseMg} mg
                    </div>
                    <span className="text-[10.5px] font-mono text-slate-500">{pulseAmp250Count} × 250 mg amp</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-rose-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Zorunlu Dilüsyon</span>
                    <div className="text-xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {pulseDilutionMl} mL
                    </div>
                    <span className="text-[10.5px] font-mono text-slate-500">SF veya %5 Dekstroz</span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-rose-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Pompa Hızı</span>
                    <div className="text-xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                      {pulseRateMlHr.toFixed(0)} mL/sa
                    </div>
                    <span className="text-[10.5px] font-mono text-slate-500">{effectivePulseDurationMin} dk süreyle</span>
                  </div>
                </div>

                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-rose-100 text-slate-700'}`}>
                  <strong className="text-rose-600 dark:text-rose-400">Pulse Güvenlik Kontrol Listesi:</strong>
                  <ul className="mt-1 space-y-1 list-disc pl-4">
                    <li>Sürekli <strong>EKG monitörizasyonu</strong> ve 15 dk&apos;da bir TA/nabız ölçümü (bradikardi/aritmi!).</li>
                    <li>İnfüzyon öncesi <strong>serum K⁺ &gt;4,0 mEq/L</strong> ve Mg²⁺ normal düzeyde olmalıdır.</li>
                    <li><strong>Kan şekeri</strong> (4–6 saatte bir) ve <strong>IV/PO PPI</strong> stres ülser profilaksisi ekleyin.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 5: KORTİKOSTEROİD EŞDEĞERLİK DÖNÜŞTÜRÜCÜ */}
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
                  <span>Referans Metilprednizolon Dozu (mg)</span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Glukokortikoid anti-inflamatuar potens eşdeğerliği (4 mg Metilprednizolon = 20 mg Hidrokortizon)
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[20, 40, 80, 125, 250].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setConverterMpMg(preset)}
                    className={`px-2.5 py-1 rounded-lg border font-mono text-xs font-bold cursor-pointer transition-colors ${
                      converterMpMg === preset
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
                    min={1}
                    max={1000}
                    step={4}
                    value={converterMpMg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val)) setConverterMpMg(Math.max(0, Math.min(1000, val)));
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
                  Metilprednizolon (Baz)
                </span>
                <div className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1 tabular-nums">
                  {converterMpMg.toFixed(0)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 5×</div>
                  <div className="font-bold text-teal-600 dark:text-teal-400">MK Potens: 0,5 (Minimal)</div>
                  <div>Biyolojik t½: 12–36 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Hidrokortizon (×5)
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
                  Prednizolon (×1,25)
                </span>
                <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                  {eqPrednisoloneMg.toFixed(1)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 4×</div>
                  <div>MK Potens: 0,8</div>
                  <div>Biyolojik t½: 12–36 saat</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Deksametazon (×0,1875)
                </span>
                <div className="text-2xl font-black font-mono text-rose-600 dark:text-rose-400 mt-1 tabular-nums">
                  {eqDexamethasoneMg.toFixed(2)} mg
                </div>
                <div className="mt-2 space-y-0.5 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>GK Potens: 25–30×</div>
                  <div className="font-bold text-rose-600 dark:text-rose-400">MK Potens: 0 (YOK!)</div>
                  <div>Biyolojik t½: 36–72 saat</div>
                </div>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <strong>Klinik Hatırlatma:</strong> 1 adet <strong>Prednol-L® 40 mg</strong> ampul anti-inflamatuar güç
              açısından <strong>200 mg Hidrokortizon</strong>, <strong>50 mg Prednizolon</strong> veya{' '}
              <strong>7,5 mg Deksametazon</strong>a (~1 ampul Dekort® 8 mg) eşdeğerdir; ancak mineralokortikoid etkisi
              (0,5×) Hidrokortizondan düşük olduğundan refrakter septik şokta ilk tercih Hidrokortizondur.
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. TÜRKİYE PREPARAT & SULANDIRMA REHBERİ (#sec-tr-preparat)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Prednol-L® 20 mg · 40 mg · 250 mg Liyofilize Ampul (Mustafa Nevzat)',
            presentation: 'Liyofilize toz ampul + çözücü ampul (20 mg/2 mL, 40 mg/2 mL, 250 mg/4 mL)',
            concentration: 'Sulandırıldığında: 10 · 20 · 62,5 mg/mL',
            saltOrBaseNote:
              'Türkiye hastanelerinde en yaygın IV/IM metilprednizolon sodyum süksinat formudur. 40 mg liyofilize formlar laktoz monohidrat yardımcı maddesi içerebilir — inek sütü proteini alerjisinde KULLANILMAZ!',
            alertLevel: 'high',
          },
          {
            name: 'Precort-Liyo® 20 mg · 40 mg · 250 mg Liyofilize Ampul (Koçak)',
            presentation: 'Liyofilize toz ampul + enjeksiyonluk su çözücü ampul (IV/IM)',
            concentration: '20 mg · 40 mg · 250 mg liyofilize',
            saltOrBaseNote:
              'Prednol-L® ile aynı etken madde ve doz güçlerindedir; sulandırıldıktan sonra berrak çözelti kontrol edilmeli ve partikül varsa kullanılmamalıdır.',
            alertLevel: 'standard',
          },
          {
            name: 'Cortipol® 20 mg · 40 mg · 250 mg Liyofilize Ampul',
            presentation: 'Liyofilize toz + çözücü ampul (IV/IM uygulama)',
            concentration: '20 mg · 40 mg · 250 mg liyofilize',
            saltOrBaseNote:
              'Klinik eşdeğer metilprednizolon sodyum süksinat preparatıdır; 250 mg formu özellikle ARDS pompa infüzyonu ve pulse tedavilerde pratiktir.',
            alertLevel: 'standard',
          },
          {
            name: 'Solu-Medrol® 40 mg · 125 mg · 500 mg · 1000 mg Flakon / Act-O-Vial (Pfizer)',
            presentation: 'Çift bölmeli Act-O-Vial (40/125 mg) veya liyofilize flakon (500/1000 mg)',
            concentration: '40 · 125 · 500 · 1000 mg flakon',
            saltOrBaseNote:
              '40 mg Act-O-Vial laktoz içerirken 125/500/1000 mg formlar laktozsuzdur. Bazı çoklu doz çözücülerde benzil alkol bulunabileceğinden yenidoğanlarda yalnızca benzil alkolsüz çözücü (SF/enjeksiyonluk su) kullanılmalıdır!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Standart IV Doz (20–125 mg): Kendi çözücüsüyle sulandırıldıktan sonra 50–100 mL %0,9 NaCl (SF) veya %5 Dekstroz içine alınarak 10–15 dakikada yavaş IV infüzyonla verilir.',
          'ARDS Sürekli İnfüzyon Pompası (Meduri): 250 mg (1 × Prednol-L® 250 mg) sulandırılıp toplam 50 mL SF’ye tamamlanır → 5 mg/mL standart pompa konsantrasyonu (oda sıcaklığında 24 saat stabil).',
          'Yüksek Doz IV Pulse (250–1000 mg): 250 mg en az 100 mL SF/D5W içinde ≥30 dk; 500–1000 mg en az 250 mL SF/D5W içinde ≥60 dk sürekli EKG monitörizasyonu altında infüze edilir.',
        ]}
        concentrationTrapWarning="20 mg / 40 mg / 250 mg Ampul Karışma & Laktoz Tuzağı: Aynı kutu tasarımına sahip 40 mg ile 250 mg liyofilize ampuller arasında 6,25 kat doz farkı vardır! Ayrıca 40 mg formlar laktoz içerdiğinden süt proteini alerjili hastalarda anafilaksi yapabilir; yenidoğanlarda ise benzil alkollü çözücülerden (gasping sendromu) kesinlikle kaçınılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="Standart dozlar (20–125 mg) periferik venöz kateterden güvenle uygulanabilir. Yüksek doz pulse (≥500–1000 mg) ve çok günlük ARDS sürekli infüzyonlarında geniş çaplı periferik ven veya ayrı bir santral venöz lümen tercih edilmelidir."
        phRange="7,0 – 8,0 (Hafif Alkali Sodyum Süksinat Çözeltisi)"
        osmolalityNote="Seyreltilmiş çözeltiler izoozmolara yakındır; ancak alkali pH (7–8) nedeniyle asidik ilaçlarla (kalsiyum, florokinolon, NMB, diltiazem vb.) Y-site temasında hızla çökelme (presipitasyon) gelişir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          '%5 Dekstroz + %0,9 NaCl (veya %0,45 NaCl)',
        ]}
        stabilityNote="Sulandırılmış liyofilize çözeltiler ve SF/D5W içindeki 5 mg/mL pompa dilüsyonları oda sıcaklığında 24 saat (2–8 °C’de 48 saate kadar, ancak mikrobiyolojik açıdan 24 saat içinde tüketilmeli) stabildir."
        ySiteCompatible={[
          'SF (%0,9 NaCl)',
          '%5 Dekstroz (D5W)',
          'Noradrenalin',
          'Fentanil',
          'Heparin',
          'Regüler İnsülin',
          'Potasyum Klorür (seyreltik)',
        ]}
        ySiteIncompatible={[
          'Kalsiyum Glukonat (çökelme!)',
          'Siprofloksasin (kristalizasyon!)',
          'Diltiazem (bulanıklık/çökelti!)',
          'Doksorubisin',
          'Glikopirolat',
          'Ondansetron (yüksek konsantrasyon)',
          'Paklitaksel',
          'Propofol (emülsiyon bozulması!)',
          'Roküronyum / Veküronyum (çökelme — ayrı hat veya SF flush!)',
        ]}
        extravasationProtocol="Metilprednizolon vezikan değildir ve doku nekrozu beklenmez; ancak alkali pH nedeniyle lokal irritasyon/ağrı yapabilir. İnfüzyonu durdurup kanülü çıkarın, ekstremiteyi eleve edin ve soğuk kompres uygulayın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        sectionTitle="Böbrek, Karaciğer & Kardiyak Disfonksiyonda Doz Yönetimi"
        renalSummary="Hepatik CYP3A4 ile metabolize olur; böbrek yetmezliğinde (ABH / KBH / HD / CRRT) rutin doz azaltımı gerekmez. Hemodiyalizle minimal atılır (ek doz gerekmez)."
        renalDetails={[
          'Değişmeden renal atılım <%10’dur; GFR <30 mL/dk, hemodiyaliz veya CRRT hastalarında başlangıç ve idame dozları değiştirilmez ve diyaliz sonrası ek replasman gerekmez.',
          '0,5× mineralokortikoid aktivitesi Hidrokortizondan düşük olsa da, oligürik ABH/KBH ve kalp yetmezliği (KKY) hastalarında çok günlük veya pulse dozlarda sıvı-Na⁺ retansiyonu, hipertansiyon ve ödeme yol açabilir.',
          'Kardiyak Disfonksiyon / KKY / HT Uyarısı: Yüksek doz pulse (≥250–1000 mg) infüzyonunda hem volüm yükü hem de akut bradikardi/ventriküler aritmi riski arttığından ≥60 dk infüzyon, K⁺ >4,0 mEq/L hedefi ve sürekli EKG zorunludur.',
        ]}
        hepaticSummary="Ağır karaciğer yetmezliğinde (Child-Pugh C) CYP3A4 klirensi azalabilir ve hipoalbüminemi serbest aktif fraksiyonu artırır; acil tek doz değişmez, çok günlük tedavide dikkatli izlem gerekir."
        hepaticDetails={[
          'Metilprednizolon sodyum süksinat esterazlarla plazmada hızla aktive olduğundan (prednizonun aksine hepatik 11β-HSD1 aktivasyonuna ihtiyaç duymaz!) karaciğer yetmezliğinde biyolojik olarak tam aktiftir.',
          'Bununla birlikte ağır sirozda CYP3A4 aracılı metabolizma yavaşlar ve düşük albümin serbest ilaç fraksiyonunu artırır; çok günlük YBÜ tedavilerinde (ARDS, bronkospazm) hiperglisemi, spontan bakteriyel peritonit (SBP) ve GİS kanama açısından yakın izlem yapılmalıdır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="En Düşük Etkili Doz · Deliryum, GİS & Osteoporoz Riski"
        geriatricPoints={[
          'Yaşlı ve kırılgan (>65 yaş) hastalarda çok günlük veya pulse Metilprednizolon tedavisi akut deliryum, ajitasyon, uykusuzluk, hipertansif atak ve üst GİS kanama riskini belirgin artırır — mutlaka PPI profilaksisi ekleyin.',
          'Uzamış tedavilerde hızlanmış osteoporotik kırık, proksimal steroid miyopatisi (düşme/ekstübasyon başarısızlığı) ve atipik/ateşsiz sepsis maskelenmesi nedeniyle tedavi süresi mümkün olan en kısa düzeyde tutulmalıdır.',
        ]}
        obesityWeightScalarBadge="ARDS & Pulse Dozda IBW / AdjBW Kullanın (TBW Değil!)"
        obesityPoints={[
          'Obez hastalarda (BMI ≥30–40 kg/m²) kilo bazlı ARDS (Meduri 1 mg/kg) ve pediatrik/erişkin yüksek doz rejimlerde gerçek vücut ağırlığı (TBW) yerine İdeal Vücut Ağırlığı (IBW) veya Düzeltilmiş Vücut Ağırlığı (AdjBW) kullanılmalıdır.',
          'TBW üzerinden aşırı dozlama, obezlerde zaten yüksek olan insülin direncini şiddetlendirerek ağır hiperglisemi, enfeksiyon ve YBÜ-edinilmiş kas güçsüzlüğü (ICUAW) riskini dramatik biçimde artırır.',
        ]}
        clinicalNote="Hem geriatrik hem obez YBÜ hastalarında 4–6 saatlik kan şekeri izlemi (hedef 140–180 mg/dL), günlük CAM-ICU deliryum taraması ve erken mobilizasyon/fizyoterapi rutin olmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. GEBELİK & LAKTASYON (#sec-gebelik)                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Plasental 11β-HSD2 enzimi tarafından kısmen inaktive edildiği için Deksametazon’a kıyasla fetüse çok daha az (~%10) geçer; bu nedenle maternal endikasyonlarda (astım, anafilaksi, otoimmün alevlenme, maternal ARDS) tercih edilen steroiddir."
        pregnancyDetails={[
          'Deksametazondan Temel Farkı (11β-HSD2 Koruması): Florlanmamış yapısı sayesinde plasental 11β-hidroksisteroid dehidrogenaz tip 2 (11β-HSD2) tarafından büyük ölçüde inaktif metabolitine dönüştürülür; fetal HPA aksı baskılanması ve fetal büyüme kısıtlılığı riski Deksametazon/Betametazona göre belirgin düşüktür.',
          'Maternal Endikasyon Tercihi: Gebede yalnızca anneyi tedavi etmek hedeflendiğinde (akut astım atağı, anafilaksi adjuvanı, MS/vaskülit atağı, maternal ARDS) Metilprednizolon veya Prednizolon seçilir. Buna karşılık fetal akciğer matürasyonu (24–34 hf) hedefleniyorsa plasentayı geçen Deksametazon/Betametazon kullanılmalıdır.',
          'Birinci Trimester & Gestasyonel Diyabet: Kısa süreli acil kullanımda fayda/zarar oranı anne lehinedir; ancak çok günlük tedavide gestasyonel hiperglisemi ve erken membran rüptürü açısından yakın obstetrik takip gerekir.',
        ]}
        lactationSummary="Düşük/standart dozlarda (≤40–80 mg/gün) anne sütüne geçiş minimaldir ve emzirme ile uyumludur; yüksek doz IV pulse (250–1000 mg) sonrasında 4 saat emzirmeye ara verilmesi önerilir."
        lactationDetails={[
          'Standart 20–80 mg/gün dozlarda bebeğin anne sütüyle aldığı göreceli doz (RID) çok düşüktür (<%1–2); emzirmeyi kesmeye gerek yoktur.',
          'Yüksek doz IV pulse (250–1000 mg/gün) uygulandığında anne sütündeki pik konsantrasyon infüzyon sonrası ilk 1–2 saatte görülür; infüzyon bitiminden sonra 4 saat bekleyip (veya bu süredeki sütü sağıp atarak) emzirmeye devam etmek infant maruziyetini neredeyse sıfıra indirir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. OLUMSUZ ETKİLER (#sec-olumsuz)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="sec-olumsuz"
        items={[
          {
            title: 'Hiperglisemi & İnsülin Direnci',
            incidenceOrSeverity: 'Çok Sık · Doz Bağımlı',
            detail:
              'Hepatik glukoneogenez artışı ve periferik GLUT4 inhibisyonuyla kan şekerini hızla yükseltir; ARDS infüzyonu ve pulse tedavilerde IV insülin titrasyonu (hedef 140–180 mg/dL) gerektirir.',
            tone: 'amber',
          },
          {
            title: 'YBÜ-Edinilmiş Kas Güçsüzlüğü (ICUAW)',
            incidenceOrSeverity: 'Yüksek Risk · NMB Sinerjisi!',
            detail:
              'Kas protein yıkımını (ubikitin-proteazom) artırır; özellikle non-depolarizan NMB infüzyonu ile birlikte kullanıldığında ağır kritik hastalık miyopatisi ve uzamış mekanik ventilasyona yol açar.',
            tone: 'rose',
          },
          {
            title: 'Pulse Bradikardi, Aritmi & Kardiyak Arrest',
            incidenceOrSeverity: '≥250–1000 mg Hızlı İnfüzyon',
            detail:
              'Yüksek dozların <30 dk içinde verilmesi miyokardiyal iyon akılarını bozarak ciddi sinüs bradikardisi, AV blok, ventriküler aritmi ve ani kardiyak arreste neden olabilir.',
            tone: 'rose',
          },
          {
            title: 'Deliryum, Akut Psikoz & Uykusuzluk',
            incidenceOrSeverity: 'Sık · Geriatri & Pulse',
            detail:
              'Hipokampal GR-α aşırı uyarımıyla öfori, ajitasyon, uykusuzluk, YBÜ deliryumu ve yüksek dozlarda akut steroid psikozu gelişebilir.',
            tone: 'indigo',
          },
          {
            title: 'GİS Ülser & Üst GİS Kanama',
            incidenceOrSeverity: 'Özellikle NSAİİ / Antikoagülan ile',
            detail:
              'Gastrik mukozal prostasiklin sentezini azaltır; YBÜ hastalarında ve çok günlük rejimlerde stres ülser profilaksisi (IV/PO PPI) ihmal edilmemelidir.',
            tone: 'amber',
          },
          {
            title: 'Lökositoz (Demarginasyon) & Süperenfeksiyon',
            incidenceOrSeverity: 'Çok Sık · İlk 6–24 Saat',
            detail:
              'Nötrofil demarginasyonuyla sola kaymasız belirgin lökositoz (15–25 × 10³/µL) oluşturur; ateş yanıtını baskılayarak fırsatçı/nozokomiyal enfeksiyonları maskeleyebilir.',
            tone: 'indigo',
          },
          {
            title: 'Hipokalemi, Sıvı Retansiyonu & Hipertansiyon',
            incidenceOrSeverity: '0,5× MK · Yüksek / Pulse Doz',
            detail:
              'Deksametazondan farklı olarak 0,5× mineralokortikoid etkisi yüksek dozlarda renal K⁺ kaybı, hipokalemi (aritmi tetikleyicisi!), ödem ve kan basıncı artışına yol açar.',
            tone: 'amber',
          },
          {
            title: 'HPA Aksı Supresyonu & Rebound İnflamasyon',
            incidenceOrSeverity: '>7–14 Gün Kullanım',
            detail:
              'Uzamış ARDS veya immünsüpresif tedavinin aniden kesilmesi sekonder adrenal kriz, hipotansiyon ve şiddetli rebound ARDS/bronkospazm tetikler.',
            tone: 'rose',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. ÖZEL KLİNİK DURUMLAR (#sec-ozel-durumlar)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: 'MRC CRASH (Travmatik Beyin Hasarında Yasak!)',
            detail:
              'MRC CRASH Trial (Roberts et al., Lancet 2004, n=10.008), akut TBH hastalarında 48 saatlik yüksek doz metilprednizolon infüzyonunun (2 g yükleme + 0,4 g/sa) 14 günlük mortaliteyi anlamlı artırdığını (%21,1 vs %17,9; RR 1,18; p=0,0001) kanıtlamıştır. Akut TBH’de Metilprednizolon kesinlikle uygulanmaz.',
          },
          {
            title: 'Akut Spinal Kord Yaralanması (NASCIS Tartışması & CNS/AANS)',
            detail:
              'Tarihsel NASCIS II/III protokolleri (30 mg/kg IV bolus + 5,4 mg/kg/sa infüzyon × 23–47 sa) minimal nörolojik faydaya karşılık pnömoni, sepsis ve GİS kanama riskini belirgin artırdığı için güncel CNS/AANS kılavuzları yüksek doz metilprednizolonu rutin önermez (seçilmiş izole servikal/torakal <8 sa vakalarda yalnızca nöroşirürji konsültasyonu ile tartışılabilir).',
          },
          {
            title: 'NMB + Steroid = Kritik Hastalık Miyopatisi (ICUAW)',
            detail:
              'YBÜ’de özellikle ARDS (Meduri infüzyonu) veya ağır status astmatikus nedeniyle yüksek doz Metilprednizolon alan hastalara >24–48 saat non-depolarizan NMB (Roküronyum/Veküronyum/Sisatraküryum) infüzyonu eklenmesi, kaslarda kalın miyozin filaman kaybıyla ağır kuadriparezi (ICUAW) ve uzamış ventilatör bağımlılığı yaratır. NMB süresini en aza indirin ve TOF takibi yapın.',
          },
          {
            title: 'Süt Proteini / Laktoz Alerjisi Uyarısı (40 mg Formülasyonlar)',
            detail:
              '40 mg metilprednizolon sodyum süksinat liyofilize flakon/ampulleri yardımcı madde olarak inek sütü kaynaklı laktoz monohidrat içerebilir. İnek sütü proteini alerjisi olan astım veya anafilaksi hastasında 40 mg formun uygulanması paradoksal ağır bronkospazm veya anafilaktik şok tetikleyebilir — bu hastalarda laktozsuz formlar (125/250 mg veya Deksametazon) tercih edilmelidir.',
          },
          {
            title: 'Ani Kesilme / HPA Supresyonu & Rebound ARDS',
            detail:
              'Meduri ARDS protokolü gibi >7–14 gün süren sistemik Metilprednizolon rejimleri aniden kesildiğinde 24–72 saat içinde ateş, hipoksemi ve pulmoner inflamasyonda dramatik alevlenme (rebound ARDS) ve sekonder adrenal yetmezlik gelişebilir; protokol gereği 15–28. günler arasında kademeli azaltma (taper) zorunludur.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. DERİN FARMAKODİNAMİK ANALİZ (#sec-derin-pd, 4 Kademe)            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı Difüzyonu, C6-α-Metil Yapısı, GR-α Seçiciliği & Pulse Non-Genomik Membran Hedefleri',
          summary:
            'Metilprednizolon sodyum süksinat plazmada esterazlarla serbest lipofilik metilprednizolona dönüşerek hücre zarından pasif difüzyonla geçer; düşük-orta dozlarda sitoplazmik GR-α’yı, >250 mg pulse dozlarda ise ek olarak membran hedeflerini aktive eder (Miller’s 10th Ed. / Stoelting’s 6th Ed.):',
          points: [
            'C6-α-Metil Modifikasyonu (5× GR-α Afinitesi · 0,5× Minimal MR): Prednizolon halkasına 6α-metil grubunun eklenmesi sitoplazmik Glukokortikoid Reseptörü (GR-α / NR3C1) bağlanma afinitesini kortizole göre 5 kat artırırken Mineralokortikoid Reseptörü (MR / NR3C2) aktivasyonunu 0,5× düzeyine indirir.',
            'Üstün Akciğer & Alveoler Makrofaj Doku Dağılımı: Yüksek lipofilisite ve minimal CBG (transkortin) bağlanması sayesinde akciğer parankimi ve bronkoalveoler lavaj (BAL) sıvısında Prednizolon’a kıyasla çok daha yüksek serbest doku konsantrasyonuna ulaşır.',
            'Pulse Dozlarda (>250 mg) Non-Genomik Membran GR (mGR) & Lipid Çift Katman Etkisi: ≥250–1000 mg IV pulse dozlarda sitoplazmik GR-α reseptörleri %100 doygunluğa ulaştıktan sonra ilaç doğrudan hücre zarına (lipid çift katmana) interkale olur ve membran bağlı GR (mGR) üzerinden dakikalar içinde non-genomik etki başlatır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Genomik GR-α Transrepresyonu / Transaktivasyonu vs Hızlı Non-Genomik cPLA₂ & eNOS Sinyal Kaskadı',
          summary:
            'Metilprednizolon, doz aralığına bağlı olarak klasik geç başlangıçlı (4–6 saat) genomik transkripsiyon programını ve yüksek pulse dozlarda dakikalar içinde gelişen non-genomik sinyal yolaklarını paralel yürütür:',
          points: [
            'Klasik Genomik Transrepresyon (NF-κB / AP-1 & HDAC2): HSP90 şaperon kompleksinden ayrılıp çekirdeğe giren GR-α monomerleri NF-κB (p65) ve AP-1 transkripsiyon faktörlerine kenetlenir ve Histon Deasetilaz-2 (HDAC2) aracılığıyla TNF-α, IL-1β, IL-6, IL-8, COX-2, iNOS ve adezyon moleküllerinin (ICAM-1/VCAM-1) transkripsiyonunu baskılar.',
            'Klasik Genomik Transaktivasyon (+GRE: Annexin-A1, IκBα & β₂-AR): DNA üzerindeki +GRE elemanlarına bağlanan GR-α homodimerleri Annexin-A1 (Lipokortin-1 → PLA₂ blokajı), IκBα (NF-κB inhibitörü), MKP-1 (MAPK fosfataz) ve bronşiyal düz kasta β₂-adrenerjik reseptör (ADRB2) sentezini indükler.',
            'Pulse Doz Non-Genomik Hızlı Membran & cPLA₂ İnhibisyonu (>250 mg): HSP90 kompleksinden ayrılan Src kinaz ve membran etkileşimleri aracılığıyla sitozolik Fosfolipaz A₂ (cPLA₂) aktivitesini transkripsiyon beklemeden dakikalar içinde bloke eder, araşidonik asit/eikozanoid fırtınasını ve T-hücre Ca²⁺/Na⁺ akılarını hızla baskılar.',
            'Non-Genomik PI3K / Akt → eNOS Aktivasyonu: Yüksek pulse dozlarda vasküler endotelde membran GR üzerinden PI3K/Akt yolağını uyararak endotelyal Nitrik Oksit Sentaz (eNOS) fosforilasyonunu artırır; akut mikrovasküler lökosit adezyonunu ve endotelyal hiperpermeabiliteyi hızla azaltır.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Bronşiyal Düz Kas, Alveoler Makrofaj & Laringeal Submukoza → Solunum & ARDS Fizyolojisi',
            tissueTarget: 'Alveoler Makrofaj · β₂-AR · Subglottik Mukoza',
            accent: 'teal',
            points: [
              'Üstün Pulmoner Penetrasyon & ARDS Kontrolü: Yüksek akciğer/BAL konsantrasyonu sayesinde alveoler makrofaj kaynaklı sitokin fırtınasını ve nötrofilik alveoler-kapiller sızıntıyı baskılar; fibroproliferatif fazı frenler (Meduri protokolü).',
              'β₂-Reseptör Up-Regülasyonu & Laringeal Ödem Gerilemesi: Bronşiyal düz kasta β₂-AR ekspresyonunu artırarak kronik β₂-agonist taşiflaksisini geri çevirir; subglottik kapiller permeabiliteyi azaltarak post-ekstübasyon stridoru önler (François 2007).',
            ],
          },
          {
            systemTitle: 'Miyokard İletim Sistemi, Vasküler Endotel & Renal Tübül → Kardiyovasküler & Elektrolit Fizyolojisi',
            tissueTarget: 'SA/AV Düğüm · Miyokard İyon Kanalları · Renal 11β-HSD2/MR',
            accent: 'rose',
            points: [
              'Pulse Doz Hızlı İnfüzyon Kardiyotoksisitesi: ≥250–1000 mg dozların <30 dk verilmesi miyokard hücre membranında ani Ca²⁺/K⁺ akı değişiklikleri ve vagal tonus artışıyla ciddi sinüs bradikardisi, AV blok, ventriküler aritmi ve kardiyak arreste yol açar.',
              'Minimal 11β-HSD2-Korumalı MR Aktivasyonu (0,5×): Böbrek toplayıcı kanalında 11β-HSD2 kısmi koruma sağlasa da yüksek/pulse dozlarda MR/ENaC uyarımıyla hipokalemi, Na⁺/su retansiyonu ve hipertansiyon gelişebilir.',
            ],
          },
          {
            systemTitle: 'İskelet Kası Miyofibrilleri & Nöromüsküler Kavşak → Nöromüsküler & ICUAW Fizyolojisi',
            tissueTarget: 'Ubikitin-Proteazom (MuRF1/Atrogin-1) · Kalın Miyozin Filamanı',
            accent: 'amber',
            points: [
              'Katabolik Kas Proteolizi: İskelet kasında GR-α aracılı FOXO/MuRF1 ve Atrogin-1 genlerinin indüksiyonu miyofibriler protein yıkımını hızlandırır ve IGF-1/mTOR anabolik yolağını baskılar.',
              'NMB ile Sinerjistik Kritik Hastalık Miyopatisi (ICUAW): Non-depolarizan NMB’lerin oluşturduğu fonksiyonel denervasyon, kas liflerinde GR ekspresyonunu katlayarak artırır; eşzamanlı Metilprednizolon selektif kalın miyozin filaman kaybına ve ağır kuadripareziye yol açar.',
            ],
          },
          {
            systemTitle: 'Hepatosit, İmmün Sistem & Hipotalamo-Hipofizer Aks → Metabolik, İmmün & Endokrin Fizyoloji',
            tissueTarget: 'PEPCK/G6Paz · Nötrofil Demarginasyonu · HPA Aksı (12–36 sa)',
            accent: 'indigo',
            points: [
              'Glisemik & İmmün Modülasyon: Hepatik glukoneogenez artışı ve kas GLUT4 inhibisyonuyla hiperglisemi yapar; damar duvarından nötrofil demarginasyonu (psödo-lökositoz) ve lenfosit/eozinofil yeniden dağılımı/apoptozu oluşturur.',
              'Orta Süreli HPA Supresyonu & Plasental Kısmi İnaktivasyon: 12–36 saatlik biyolojik etki süresiyle Deksametazon’a göre daha yönetilebilir HPA baskısı oluşturur ve plasental 11β-HSD2 tarafından kısmen inaktive edilerek fetüsü görece korur.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Genomik (≤100 mg) vs Non-Genomik (>250 mg) Doz Fazları, β₂-Agonist Sinerjisi & Rebound Dinamiği',
          summary:
            'Metilprednizolon’un farmakodinamik yanıtı doz yükseldikçe niteliksel olarak değişir ve eşzamanlı bronkodilatör veya NMB ajanlarıyla belirgin etkileşimler gösterir:',
          points: [
            'Doz-Yanıt Eşiği (Genomik Doygunluk vs Non-Genomik Aktivasyon): ~100 mg/gün eşdeğerinde sitoplazmik GR-α reseptörleri neredeyse tamamen (%90–100) doyar. ≥250–1000 mg pulse dozlarda ek anti-inflamatuar kazanç, genomik etki artışından değil non-genomik membran/cPLA₂ ve eNOS yolaklarının devreye girmesinden kaynaklanır.',
            'İnhale β₂-Agonistlerle Karşılıklı Sinerji: Metilprednizolon β₂-AR gen transkripsiyonunu artırıp taşiflaksiyi geri çevirirken, β₂-agonistler de GR-α nükleer translokasyonunu kolaylaştırır — ancak bu sinerji 4–6 saat gerektirdiğinden akut bronkospazmda ilk müdahale daima bronkodilatör/adrenalindir.',
            'Meduri ARDS Taper Zorunluluğu (GR-α Down-Regülasyonu): Uzun süreli (>14 gün) yüksek doz infüzyon sonrası ani kesilme, baskılanmış endojen kortizol + yeniden alevlenen NF-κB aktivasyonu nedeniyle şiddetli rebound ARDS tetikler; kademeli azaltma şarttır.',
          ],
        }}
        clinicalPearls={[
          'Neden ≥250 mg Pulse Dozlar Asla <30 Dakikada Puşe Edilmez? Hızlı yüksek doruk plazma düzeyi miyokard membranında ani iyon akısı bozulmasına yol açarak bradikardi, AV blok ve ani kardiyak arrest tetikler; 250 mg için ≥30 dk, 500–1000 mg için ≥60 dk infüzyon ve sürekli EKG hayat kurtarır.',
          'Anafilaksi & Status Astmatikusta Zamanlama Tuzağı: Metilprednizolon’un genomik etkisi 4–6 saatte pik yaptığından akut hava yolu obstrüksiyonunu veya şoku anında çözmez; Adrenalin ve β₂-agonistleri geciktirmeden adjuvan olarak eklenmelidir.',
          'ARDS’de Meduri İnfüzyonu vs Deksametazon (DEXA-ARDS): Meduri protokolü (1 mg/kg/gün sürekli infüzyon) yüksek akciğer penetrasyonu ve sabit plazma düzeyi sağlar ancak >14 gün taper gerektirir; Deksametazon (20→10 mg/gün × 10 gün) ise tek doz uygulama kolaylığı sunar.',
          '40 mg Flakondaki Gizli Laktoz Tuzağı: İnek sütü proteini alerjili bir astım hastasına 40 mg laktozlu Metilprednizolon verilmesi semptomları paradoksal olarak ağırlaştırabilir; şüphede laktozsuz 125/250 mg forma veya Deksametazon’a geçin.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 17. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (#sec-kaynaklar)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Metilprednizolon Sodyum Süksinat"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Canlı / Canlı-Atenüe Aşılar (MMR, Suçiçeği, BCG, Sarı Humma)',
            mechanism: 'Güçlü Hücresel ve Humoral İmmünsüpresyon',
            clinicalEffect:
              'Yüksek doz veya çok günlük Metilprednizolon tedavisi sırasında canlı aşı uygulanması kontrolsüz viral/bakteriyel replikasyon ve disemine enfeksiyona yol açabilir.',
            management:
              'İmmünsüpresif Metilprednizolon rejimleri sırasında canlı aşılardan kesinlikle kaçının; aşılamayı steroid kesildikten en az 4 hafta sonraya erteleyin.',
          },
          {
            severity: 'D',
            agent: 'NSAİİ’ler (İbuprofen, Diklofenak, Ketorolak) & Antikoagülanlar (Varfarin, Heparin, DOAK)',
            mechanism: 'Gastrik Mukozal Prostasiklin İnhibisyonu + Aditif Hemorajik Risk',
            clinicalEffect:
              'Peptik ülser, gastrik erozyon ve ciddi üst GİS kanama riski belirgin artar; Varfarin kullananlarda INR artışı ve kanama eğilimi görülebilir.',
            management:
              'Eşzamanlı kullanımda mutlaka IV/PO PPI profilaksisi ekleyin, gereksiz NSAİİ’den kaçının ve Varfarin alan hastalarda INR’yi yakından izleyin.',
          },
          {
            severity: 'D',
            agent: 'CYP3A4 İnhibitörleri (Klaritromisin, Ketokonazol, Ritonavir) & İndükleyicileri (Rifampisin, Fenitoin, Karbamazepin)',
            mechanism: 'Hepatik CYP3A4 Aracılı Metilprednizolon Klirensinin İnhibisyonu veya Hızlanması',
            clinicalEffect:
              'Güçlü CYP3A4 inhibitörleri plazma düzeyini artırarak ağır hiperglisemi, Cushingoid toksisite ve HPA supresyonu yaparken; indükleyiciler klirensi hızlandırıp astım/ARDS/rejeksiyon tedavisinde etki kaybına yol açar.',
            management:
              'Çok günlük tedavide güçlü CYP3A4 inhibitörü varsa Metilprednizolon dozunu azaltın; güçlü indükleyici varsa klinik yanıtı izleyip gerekirse dozu artırın.',
          },
          {
            severity: 'D',
            agent: 'Non-Depolarizan Nöromüsküler Blokerler (Roküronyum, Veküronyum, Sisatraküryum)',
            mechanism: 'Kas Proteolizinde Sinerjistik Artış (Kritik Hastalık Miyopatisi — ICUAW) + Y-Site Çökelmesi',
            clinicalEffect:
              'YBÜ’de >24–48 saat NMB infüzyonu ile yüksek doz Metilprednizolon birlikte verildiğinde ağır kuadriparezi ve uzamış mekanik ventilasyon riski katlanır; aynı IV hatta fiziksel çökelti oluşabilir.',
            management:
              'NMB infüzyon süresini en kısa düzeyde tutun, TOF monitörizasyonu uygulayın, erken fizyoterapi planlayın ve daima ayrı IV hattan/SF flush ile verin.',
          },
          {
            severity: 'D',
            agent: 'Loop / Tiyazid Diüretikler (Furosemid, Hidroklorotiyazid) & Digoksin',
            mechanism: 'Aditif Renal Potasyum Atılımı (0,5× MK) → Hipokalemiye Bağlı Digoksin Toksisitesi',
            clinicalEffect:
              'Özellikle yüksek doz/pulse Metilprednizolon + diüretik kombinasyonu ciddi hipokalemiye ve Digoksin alan hastalarda ölümcül ventriküler aritmilere yol açabilir.',
            management:
              'Pulse öncesi ve çok günlük tedavide serum K⁺ ve Mg²⁺ düzeylerini yakından izleyin (K⁺ >4,0 mEq/L hedefleyin) ve EKG takibi yapın.',
          },
          {
            severity: 'C',
            agent: 'Fluorokinolonlar (Siprofloksasin, Levofloksasin, Moksifloksasin)',
            mechanism: 'Tenosit Matriks Metalloproteinaz (MMP) Aktivasyonu & Kollajen Yıkımı',
            clinicalEffect:
              'Özellikle >60 yaş geriatrik hastalarda Aşil tendiniti ve akut tendon rüptürü riski belirgin artar (ayrıca Siprofloksasin Y-site uyumsuzdur!).',
            management:
              'Mümkünse alternatif antibiyotik seçin; eşzamanlı kullanım zorunluysa tendon ağrısı/şişliği açısından izleyin ve asla aynı Y-site hattından vermeyin.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.)',
            title: "Miller's Anesthesia, 10th Edition — Corticosteroids in Perioperative & Critical Care Practice.",
            journal: 'Elsevier',
            year: 2025,
            note: 'Perioperatif bronkospazm, anafilaksi adjuvanı, hava yolu ödemi, ARDS ve yoğun bakım kortikosteroid farmakolojisi.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD (Eds.)',
            title: "Stoelting's Pharmacology and Physiology in Anesthetic Practice, 6th Edition — Adrenocortical Steroids.",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'Metilprednizolonun 5× glukokortikoid / 0,5× mineralokortikoid potens profili, genomik/non-genomik mekanizmaları, CYP3A4 metabolizması ve HPA aksı fizyolojisi.',
          },
          {
            authors: 'Chaudhuri D, Nei AM, Rochwerg B, et al.',
            title: '2024 Focused Update: Guidelines on Use of Corticosteroids in Sepsis, Acute Respiratory Distress Syndrome, and Community-Acquired Pneumonia.',
            journal: 'Crit Care Med',
            year: 2024,
            pmid: '38240492',
            doi: '10.1097/CCM.0000000000006172',
            note: 'SCCM 2024 kılavuzu: Ağır toplum kökenli pnömonide güçlü, orta-ağır ARDS’de koşullu sistemik kortikosteroid önerileri (52(5):e219–e233).',
          },
          {
            authors: 'François B, Bellissant E, Gissot V, et al.',
            title: '12-h pretreatment with methylprednisolone versus placebo for prevention of postextubation laryngeal oedema: a randomised double-blind trial.',
            journal: 'Lancet',
            year: 2007,
            pmid: '17398307',
            doi: '10.1016/S0140-6736(07)60526-1',
            note: 'n=761 RKÇ: Ekstübasyondan 12 saat önce başlanan 20 mg IV q4h × 4 doz (80 mg) Metilprednizolon laringeal ödemi %22’den %3’e düşürmüştür (369(9567):1083–1089).',
          },
          {
            authors: 'Meduri GU, Golden E, Freire AX, et al.',
            title: 'Methylprednisolone infusion in early severe ARDS: results of a randomized controlled trial.',
            journal: 'Chest',
            year: 2007,
            pmid: '17426195',
            doi: '10.1378/chest.06-2100',
            note: 'Erken ağır ARDS’de 1 mg/kg yükleme → 1 mg/kg/gün sürekli IV infüzyon + kademeli azaltma protokolü ile akciğer hasarı skorunda iyileşme ve ventilasyon süresinde kısalma (131(4):954–963).',
          },
          {
            authors: 'Roberts I, Yates D, Sandercock P, et al. (MRC CRASH Trial Collaborators)',
            title: 'Effect of intravenous corticosteroids on death within 14 days in 10008 adults with clinically significant head injury.',
            journal: 'Lancet',
            year: 2004,
            pmid: '15474134',
            doi: '10.1016/S0140-6736(04)17188-2',
            note: 'n=10.008 RKÇ: Akut TBH’de 48 saatlik yüksek doz metilprednizolon infüzyonunun 14 günlük mortaliteyi artırdığı (%21,1 vs %17,9; RR 1,18) kanıtlanmıştır (364(9442):1321–1328).',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/methylprednisolone.html"
        medscapeUrl="https://reference.medscape.com/drug/medrol-solumedrol-methylprednisolone-342746"
      />
    </div>
  );
};
