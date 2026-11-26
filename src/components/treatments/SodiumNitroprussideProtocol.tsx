import React, { useState, useId } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
  RotateCcw,
  ShieldAlert,
  Sun,
  Syringe,
  Timer,
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
  MechanismOfActionBlock,
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

type SnpCalcTab = 'adult_crisis' | 'pediatric_crisis' | 'cyanide_rescue';
type AdultSnpPrep = 'std_200' | 'central_1000' | 'custom';
type PedSnpPrep = 'ped_200' | 'ped_100' | 'ped_1000' | 'ped_custom';

export const SodiumNitroprussideProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKORDİYON STATE ---
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<SnpCalcTab>('adult_crisis');
  const [weightKg, setWeightKg] = useState<number>(70);

  // Tab 1: Erişkin Hipertansif Kriz / Aort Klempi / Feo / Afterload Azaltma
  const [adultPrep, setAdultPrep] = useState<AdultSnpPrep>('std_200');
  const [adultCustomConc, setAdultCustomConc] = useState<number>(200);
  const [adultDoseMcgKgMin, setAdultDoseMcgKgMin] = useState<number>(0.5);
  const [adultDurationHr, setAdultDurationHr] = useState<number>(2);

  // Tab 2: Pediatrik Hipertansif Kriz / Kontrollü Hipotansiyon
  const [pedWeightKg, setPedWeightKg] = useState<number>(18);
  const [pedDoseMcgKgMin, setPedDoseMcgKgMin] = useState<number>(1.0);
  const [pedPrep, setPedPrep] = useState<PedSnpPrep>('ped_200');
  const [pedCustomConc, setPedCustomConc] = useState<number>(200);

  // Tab 3: Siyanür & Tiyosiyanat Toksisitesi Hesaplayıcı / Acil Kurtarma
  const [toxWeightKg, setToxWeightKg] = useState<number>(70);
  const [toxDoseMcgKgMin, setToxDoseMcgKgMin] = useState<number>(3.0);
  const [toxDurationHr, setToxDurationHr] = useState<number>(4.0);

  // Erişilebilirlik ID'leri
  const weightSliderId = useId();
  const adultPrepSelectId = useId();
  const adultDoseSliderId = useId();
  const adultDurSliderId = useId();
  const pedWeightSliderId = useId();
  const pedPrepSelectId = useId();
  const pedDoseSliderId = useId();
  const toxWeightSliderId = useId();
  const toxDoseSliderId = useId();
  const toxDurSliderId = useId();

  // --- TAB 1 HESAPLAMALARI (ERİŞKİN) ---
  const adultConcMcgMl: number = (() => {
    switch (adultPrep) {
      case 'std_200':
        return 200; // 50 mg / 250 mL D5W veya 60 mg / 300 mL D5W
      case 'central_1000':
        return 1000; // 50 mg / 50 mL D5W (Santral)
      case 'custom':
        return adultCustomConc > 0 ? adultCustomConc : 200;
      default:
        return 200;
    }
  })();

  const adultDoseMcgMin = adultDoseMcgKgMin * weightKg;
  const adultHourlyMcg = adultDoseMcgMin * 60;
  const adultHourlyMg = adultHourlyMcg / 1000;
  const adultPumpRateMlHr = adultConcMcgMl > 0 ? adultHourlyMcg / adultConcMcgMl : 0;
  const adultCumulativeMgKg = (adultDoseMcgKgMin * 60 * adultDurationHr) / 1000;
  const adultCumulativeTotalMg = adultCumulativeMgKg * weightKg;

  const adultRiskLevel: 'safe' | 'cyanide_warn' | 'ceiling_danger' = (() => {
    if (adultDoseMcgKgMin <= 2.0 && adultCumulativeMgKg < 0.5) return 'safe';
    if (adultDoseMcgKgMin > 5.0 || adultCumulativeMgKg >= 1.5) return 'ceiling_danger';
    return 'cyanide_warn';
  })();

  // --- TAB 2 HESAPLAMALARI (PEDİATRİK) ---
  const pedConcMcgMl: number = (() => {
    switch (pedPrep) {
      case 'ped_200':
        return 200;
      case 'ped_100':
        return 100;
      case 'ped_1000':
        return 1000;
      case 'ped_custom':
        return pedCustomConc > 0 ? pedCustomConc : 200;
      default:
        return 200;
    }
  })();

  const pedDoseMcgMin = pedDoseMcgKgMin * pedWeightKg;
  const pedHourlyMcg = pedDoseMcgMin * 60;
  const pedHourlyMg = pedHourlyMcg / 1000;
  const pedPumpRateMlHr = pedConcMcgMl > 0 ? pedHourlyMcg / pedConcMcgMl : 0;

  // --- TAB 3 HESAPLAMALARI (SİYANÜR & TİYOSİYANAT KURTARMA) ---
  const toxCumulativeMgKg = (toxDoseMcgKgMin * 60 * toxDurationHr) / 1000;
  const toxTotalSnpMg = toxCumulativeMgKg * toxWeightKg;
  // SNP MW = 297.95 g/mol, 5 CN- = 5 * 26.02 = 130.1 g/mol (~%43.7 ağırlıkça CN-)
  const toxEstimatedCyanideMgKg = toxCumulativeMgKg * 0.437;
  const toxSeverity: 'low' | 'moderate' | 'critical' = (() => {
    if (toxCumulativeMgKg >= 1.5 || toxDoseMcgKgMin >= 5.0) return 'critical';
    if (toxCumulativeMgKg >= 0.5 || toxDoseMcgKgMin > 2.0) return 'moderate';
    return 'low';
  })();

  // Antidot Dozları (toxWeightKg bazlı)
  const isPediatricTox = toxWeightKg < 40;
  const hydroxocobalaminMg = isPediatricTox ? Math.min(5000, Math.round(toxWeightKg * 70)) : 5000;
  const hydroxocobalaminG = hydroxocobalaminMg / 1000;
  const sodiumThiosulfateMg = isPediatricTox ? Math.min(12500, Math.round(toxWeightKg * 250)) : 12500;
  const sodiumThiosulfateG = sodiumThiosulfateMg / 1000;
  const sodiumThiosulfate25Ml = sodiumThiosulfateMg / 250; // %25 = 250 mg/mL

  const getOrderSummaryText = () => {
    if (activeTab === 'adult_crisis') {
      return [
        'SODYUM NİTROPRUSSİD (NİPRUSS® · SNP) IV İNFÜZYON ORDER ÖZETİ',
        `Hasta Ağırlığı: ${weightKg} kg`,
        `Çözelti: ${adultConcMcgMl} mcg/mL — YALNIZCA %5 DEKSTROZ (D5W) · IŞIKTAN KORUNMUŞ OPAK ENJEKTÖR/HAT!`,
        `Hedef Doz: ${adultDoseMcgKgMin.toFixed(1)} mcg/kg/dk (${adultDoseMcgMin.toFixed(1)} mcg/dk · ${adultHourlyMg.toFixed(2)} mg/saat)`,
        `Pompa Hızı: ${adultPumpRateMlHr.toFixed(1)} mL/saat`,
        `Tahmini Kümülatif Yük (${adultDurationHr} saat): ${adultCumulativeMgKg.toFixed(2)} mg/kg (${adultCumulativeTotalMg.toFixed(1)} mg)`,
        'ZORUNLU GÜVENLİK: İnvaziv arteriyel kateter (A-Line) takılı · Aort diseksiyonunda önce Esmolol (KTA <60) · >2 mcg/kg/dk’da laktat/SvO₂ izlemi · Maks tavan 10 mcg/kg/dk (≤10 dk).',
      ].join('\n');
    }
    if (activeTab === 'pediatric_crisis') {
      return [
        'SODYUM NİTROPRUSSİD (SNP) PEDİATRİK IV İNFÜZYON ORDER ÖZETİ',
        `Pediatrik Ağırlık: ${pedWeightKg} kg`,
        `Çözelti: ${pedConcMcgMl} mcg/mL D5W (Işıktan tam korunmuş amber/folyo hat!)`,
        `Hedef Doz: ${pedDoseMcgKgMin.toFixed(1)} mcg/kg/dk (${pedDoseMcgMin.toFixed(1)} mcg/dk · ${pedHourlyMg.toFixed(2)} mg/saat)`,
        `Pompa Hızı: ${pedPumpRateMlHr.toFixed(2)} mL/saat`,
        'Güvenlik: İnvaziv A-Line zorunlu · >2 mcg/kg/dk hızda siyanür toksisitesi (laktat/BE/SvO₂) yakın izlemi.',
      ].join('\n');
    }
    return [
      'SODYUM NİTROPRUSSİD (SNP) SİYANÜR TOKSİSİTESİ KURTARMA ÖZETİ',
      `Hasta Ağırlığı: ${toxWeightKg} kg`,
      `Maruziyet: ${toxDoseMcgKgMin.toFixed(1)} mcg/kg/dk × ${toxDurationHr} saat = ${toxCumulativeMgKg.toFixed(2)} mg/kg SNP (${toxTotalSnpMg.toFixed(1)} mg · ~${toxEstimatedCyanideMgKg.toFixed(2)} mg/kg CN⁻)`,
      'ACİL 1. ADIM: SNP infüzyonunu DERHAL KES + %100 FiO₂ uygula + hemodinamik destek.',
      `1. TERCİH ANTİDOT (Hidroksokobalamin · Cyanokit®): ${hydroxocobalaminG.toFixed(2)} g (${hydroxocobalaminMg} mg) IV 15 dakikada.`,
      `2. SEÇENEK / KOMBİNE (Sodyum Tiyosülfat %25): ${sodiumThiosulfateG.toFixed(2)} g (${sodiumThiosulfate25Ml.toFixed(1)} mL %25 çözelti) IV 10–20 dk’da (ayrı hattan).`,
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
          { id: 'sec-ozet', label: 'Özet & Kimlik' },
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-pkpd', label: 'PK / ADME' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-dozlar', label: 'Endikasyon & Dozlar' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı & Antidot' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Işık' },
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
      {/* 2. ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (KAPALI AKORDİYON)          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="nitroPRUSSIDE (SNP)"
        confusionRiskWith="nitroGLYCERIN (GTN)"
        criticalAlerts={[
          'ISMP Tall-Man & İsim Karışma Riski: nitroPRUSSIDE (SNP) ile nitroGLYCERIN (GTN) asla karıştırılmamalıdır! SNP ultra-hızlı (30–60 sn) dengeli arteriyel+venöz vazodilatördür, mcg/kg/dk dozlanır ve her molekülünde 5 siyanür iyonu taşır.',
          'İnvaziv Arteriyel Kateter (A-Line) ZORUNLU: Etki başlangıcı 30–60 sn, pik 1–2 dk olduğundan saniyeler içinde derin hipotansiyon ve organ iskemisi yaratabilir; manşon (NIBP) ölçümüyle ASLA titre edilmez!',
          'IŞIKTAN KESİNLİKLE KORUMA (FOTOLİZ = SİYANÜR): Yalnızca %5 Dekstroz (D5W) ile hazırlanır; enjektör/torba alüminyum folyo veya siyah kılıfla sarılmalı, amber/opak hat kullanılmalıdır. Açık kahverengi çözelti MAVİ, YEŞİL veya KOYU KIRMIZIYA dönerse fotolizle serbest siyanür oluşmuştur — DERHAL İMHA EDİN!',
          'SİYANÜR TOKSİSİTESİ EŞİĞİ (>2 mcg/kg/dk veya >0,5–1,5 mg/kg kümülatif): Kesin tavan 10 mcg/kg/dk (MAKSİMUM 10 DAKİKA!). Erken triad: Taşifilaksi (artan doz ihtiyacı) + açıklanamayan laktik asidoz + artmış SvO₂ (venöz hiperoksi / daralmış A-V O₂ farkı)!',
          'Aort Diseksiyonunda Tek Başına YASAK: Refleks taşikardi ve ↑dP/dt yırtığı ilerletir — ÖNCE Esmolol ile kalp hızı <60/dk kontrol edilmeden SNP başlanmaz!',
        ]}
        antidoteOrRescue="Siyanür toksisitesi şüphesinde (taşifilaksi + laktik asidoz + yüksek SvO₂): (1) SNP infüzyonunu DERHAL KESİN ve %100 FiO₂ verin. (2) 1. Tercih Antidot: Hidroksokobalamin (Cyanokit®) erişkin 5 g IV (pediatrik 70 mg/kg, maks 5 g) 15 dakikada (siyanürü bağlayıp zararsız B12 [siyanokobalamin] yaparak idrarla atar). (3) 2. Seçenek / Kombine Antidot: Sodyum Tiyosülfat %25 erişkin 12,5 g (50 mL) IV (pediatrik 250 mg/kg, maks 12,5 g) 10–20 dk’da (ayrı hattan, rodanaz sülfür donörü). Tiyosiyanat toksisitesinde (>10 mg/dL; deliryum/psikoz/nöbet, özellikle KBY) SNP kesilir ve HEMODİYALİZ yapılır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KİMLİK, KLİNİK ÖZET & HEMODİNAMİK PROFİL (#sec-ozet)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span className="font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/15">
                Ultra-Hızlı Direkt NO Donörü · Dengeli Vazodilatör
              </span>
              <span aria-hidden="true">·</span>
              <span>Nipruss® · Nitropress® · Sodium Nitroprusside (SNP)</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: C02DD01</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Sodyum Nitroprussid (Nitroprusid · Nipruss® · SNP) Monografisi
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> İnorganik
              demir-pentasiyanür-nitrozil kompleksi (<span className="font-mono">Na₂[Fe(CN)₅NO]·2H₂O</span>); enzimatik
              aktivasyona gereksinim duymadan doğrudan <strong>Nitrik Oksit (NO)</strong> salan, <strong>30–60 saniyede</strong>{' '}
              etkili, <strong>dengeli arteriyel + venöz</strong> yüksek riskli IV vazodilatördür.
            </p>
          </div>
        </div>

        {/* 3 Ana Klinik Karakteristik Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/25 border-rose-900/50 text-rose-100' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-rose-600 dark:text-rose-400">
              <Zap className="w-4 h-4 shrink-0" />
              <span>Ultra-Hızlı Dengeli Arteriyel + Venöz Etki</span>
            </div>
            <p className="text-xs leading-relaxed">
              Başlangıç <strong>30–60 sn</strong>, pik <strong>1–2 dk</strong>, offset <strong>1–3 dk</strong>. Hem
              rezistans arteriyollerini (<strong>SVR↓ / Afterload↓</strong>) hem kapasitans venlerini (<strong>Preload↓</strong>)
              eşit güçte genişletir; bu nedenle invaziv <strong>A-Line monitörizasyonu zorunludur</strong>.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/25 border-amber-900/50 text-amber-100' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>5 Siyanür İyonu &amp; Tiyosiyanat Yükü</span>
            </div>
            <p className="text-xs leading-relaxed">
              Her SNP molekülü yıkılırken <strong>1 NO + 5 CN⁻ (Siyanür)</strong> salar! Hepatik rodanaz enzimiyle
              tiyosiyanata çevrilip böbrekten atılır. <strong>&gt;2 mcg/kg/dk</strong> hızda veya KC yetmezliğinde siyanür;
              KBY’de tiyosiyanat (t½ 7–9 gün) hızla toksisite yapar.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/25 border-indigo-900/50 text-indigo-100' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <Sun className="w-4 h-4 shrink-0" />
              <span>Işık Hassasiyeti &amp; D5W Zorunluluğu</span>
            </div>
            <p className="text-xs leading-relaxed">
              Yalnızca <strong>%5 Dekstroz (D5W)</strong> ile hazırlanır (SF kullanılmaz!). Işık temasıyla fotoliz olup
              serbest siyanür açığa çıkarır → <strong>opak enjektör, folyo sargı ve amber hat</strong> şarttır; mavi/yeşil
              renk değişimi derhal imha nedenidir.
            </p>
          </div>
        </div>
      </section>

      {/* Kısa Etki Mekanizması Bloğu (#sec-etki) */}
      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="sec-etki"
        summary="Sodyum nitroprussid (SNP), eritrosit ve damar düz kas hücresindeki sülfhidril grupları ve oksihemoglobinle non-enzimatik redoks reaksiyonuna girerek doğrudan Nitrik Oksit (NO) serbestleştirir. Serbestleşen NO, çözünür guanilat siklazı (sGC) aktive edip cGMP → PKG-I yolağını uyarır; arteriyoler ve venöz düz kasta eşit güçte, saniyeler içinde başlayan güçlü vazodilatasyon oluşturur (ALDH2’ye bağımlı olmadığı için GTN’deki klasik nitrat toleransı gelişmez; doz ihtiyacı artarsa bu siyanür toksisitesini gösterir!)."
        pillars={[
          {
            title: 'Non-Enzimatik Direkt NO Salınımı',
            detail:
              'Nitrogliserinden farklı olarak mitokondriyal ALDH2 aktivasyonuna ihtiyaç duymaz; hem rezistans arteriyollerinde hem kapasitans venlerinde eşzamanlı ve eşit şiddette vazodilatasyon yaratır.',
          },
          {
            title: 'sGC → cGMP → MLCP Aktivasyonu',
            detail:
              'Artan cGMP, PKG üzerinden hücre içi serbest Ca²⁺ düzeyini düşürür (SERCA2a↑, IP₃R↓, L-tipi Ca²⁺↓, BKCa↑) ve MLCP aktivasyonu ile aktin-miyozin çapraz köprülerini hızla çözer.',
          },
          {
            title: 'Siyanür (CN⁻) → Rodanaz → Tiyosiyanat (SCN⁻)',
            detail:
              'Molekül başına salınan 5 siyanür iyonunun 1’i methemoglobine (siyanomethemoglobin) bağlanır, 4’ü dolaşıma geçerek karaciğerde rodanaz + tiyosülfat ile tiyosiyanata detoksifiye edilir ve böbrekten atılır.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) ÖZELLİKLERİ (KAPALI AKORDİYON)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen((prev) => !prev)}
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
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span>Farmakokinetik (ADME) &amp; Siyanür Kinetiği</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  Onset: 30–60 sn · Offset: 1–3 dk · SCN⁻ t½: 3–9 gün
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Eritrositer non-enzimatik yıkım, 5 CN⁻ salınımı, hepatik rodanaz hız kısıtlayıcı basamağı ve renal tiyosiyanat atılımı.
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
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  30 – 60 Saniye
                </span>
                <span className="text-[10px] text-slate-400">Anında SVR &amp; MAP düşüşü</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Zirve Etki (Peak)
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">A-Line olmadan titre edilemez!</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Sonlanması (Offset)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  1 – 3 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Ana ilaç t½ ~2 dakika</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Tiyosiyanat (SCN⁻) t½
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  3 Gün (KBY: 7–9 Gün)
                </span>
                <span className="text-[10px] text-slate-400">Primer renal eliminasyon</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-500" />
                <span>Siyanür Metabolizması &amp; Hız Kısıtlayıcı Basamak:</span>
              </h4>
              <p>
                <strong>1. Basamak (Eritrosit/Damar Yıkımı):</strong> SNP ekstraselüler sıvıya dağılır (Vd ~0,2 L/kg) ve
                eritrositlerde oksihemoglobinle elektron transferine girerek hızla <strong>methemoglobin + 1 NO + 5 CN⁻</strong>{' '}
                oluşturur. SNP ağırlıkça yaklaşık <strong>%44 siyanür</strong> içerir.
              </p>
              <p>
                <strong>2. Basamak (Hepatik Rodanaz Detoksifikasyonu):</strong> Serbest CN⁻, karaciğer ve böbrek
                mitokondrilerindeki <strong>rodanaz (tiyosülfat sülfürtransferaz)</strong> enzimiyle endojen tiyosülfat
                (S₂O₃²⁻) kullanarak <strong>Tiyosiyanata (SCN⁻)</strong> çevrilir. Bu reaksiyonda hız kısıtlayıcı faktör
                endojen <strong>tiyosülfat deposudur</strong>; &gt;2 mcg/kg/dk infüzyonda veya &gt;0,5–1,5 mg/kg kümülatif
                dozda tiyosülfat tükenir ve serbest CN⁻ hızla mitokondriyal <strong>sitokrom c oksidazı (Kompleks IV)</strong>{' '}
                bloke eder.
              </p>
              <p>
                <strong>3. Basamak (Renal Atılım):</strong> Oluşan tiyosiyanat (SCN⁻) tamamen böbrekten atılır (normal
                t½ ~3 gün). GFR düştüğünde t½ <strong>7–9 güne</strong> uzar ve nörotoksisite/hipotiroidi gelişir.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. MUTLAK VE RELATİF KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Kompansatuar Hipertansiyon (Aort Koarktasyonu ve Arteriyovenöz Şant): Basıncın ani düşürülmesi koarktasyon distali (renal/spinal) perfüzyonu çökertir.',
          'Leber Herediter Optik Nöropatisi (LHON), Tütün Ambliyopisi ve Konjenital Optik Atrofi: Siyanür detoksifikasyon ve mitokondriyal kompleks I defekti nedeniyle kalıcı körlük ve fulminan siyanür toksisitesi!',
          'KİBAS, Akut Kafa Travması, İntrakraniyal Kitle / Kanama: Güçlü serebral vazodilatasyon → ↑CBF / ↑CBV → ↑ICP (serebral herniasyon ve CPP çöküşü riski!).',
          'PDE-5 İnhibitörü (Sildenafil/Vardenafil 24 sa, Tadalafil 48 sa) veya Riociguat Kullanımı: Kontrolsüz cGMP birikimiyle ölümcül refrakter hipotansiyon.',
          'Ağır Vit-B12 Eksikliği, Şiddetli Hipotansiyon/Hipovolemi ve Akut Aort Diseksiyonunda Beta-Bloker (Esmolol) Olmadan Tek Başına Kullanım!',
        ]}
        relativeItems={[
          'Aktif Miyokard İskemisi / Ciddi Koroner Arter Hastalığı (KAH): Direnç arteriyollerini genişleterek "Koroner Çalma (Coronary Steal)" yoluyla daralmış damar bölgesindeki iskemiyi ağırlaştırabilir → GTN tercih edilir!',
          'Gebelik: Plasentadan serbestçe geçer ve fetal karaciğerde siyanür biriktirir; Labetalol/Nikardipin/Hidralazin başarısız olmadıkça KAÇINILIR!',
          'İleri Karaciğer Yetmezliği (Child-Pugh B/C): Hepatik rodanaz aktivitesi ve tiyosülfat deposu azaldığından çok düşük dozlarda dahi hızla siyanür toksisitesi gelişir.',
          'Böbrek Yetmezliği (eGFR < 30–60 mL/dk): Tiyosiyanat (SCN⁻) yarı ömrü 7–9 güne uzar; 24–48 saati aşan infüzyonlarda deliryum, psikoz ve nöbet riski doğar.',
          'Tek Akciğer Ventilasyonu / ARDS / Hipoksemi: HPV inhibisyonu ile intrapulmoner şantı artırıp PaO₂’yi düşürür.',
          'Hipotiroidi: Tiyosiyanat tiroid iyot alımını (NIS) inhibe ederek hipotiroidiyi kötüleştirebilir.',
        ]}
        clinicalNote="İnvaziv arteriyel kateter (A-Line) monitörizasyonu sağlanamayan ve ışıktan koruma ekipmanı (opak enjektör/folyo/amber hat) hazır olmayan bir ortamda SNP infüzyonu BAŞLANMAMALIDIR."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ (#sec-dozlar)              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozlar"
        className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-5 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Klinik Endikasyonlar &amp; Doz Rejimleri
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Güvenli: 0,3–2 mcg/kg/dk · Tavan: 10 mcg/kg/dk (≤10 dk)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" />
                Hipertansif Acil (Kriz) &amp; Aort Klempi / Feokromositoma
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/15 text-rose-600 dark:text-rose-300">
                0,3–2 mcg/kg/dk
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Başlangıç <strong>0,3 mcg/kg/dk</strong>; hedef MAP/SKB’ye göre her <strong>2–5 dakikada 0,5 mcg/kg/dk</strong>{' '}
              titre edilir. Aort çapraz klempi sırasında şiddetli afterload artışını anında düşürmede ve feokromositoma
              rezeksiyonunda ani katekolamin deşarjlarında saniyeler içinde etki eder (modern pratikte mümkünse Nikardipin
              veya Klevidipin daha güvenli alternatiflerdir).
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-amber-500" />
                Akut Kardiyojenik Şok / Ağır Mitral-Aort Yetersizliği (Afterload↓)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300">
                Dengeli Yük Azaltma
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Akut ciddi mitral/aort yetersizliği veya akut dekompanse sistolik kalp yetmezliğinde (yeterli SKB eşliğinde)
              <strong>0,3–2 mcg/kg/dk</strong> dozda sol ventrikül afterload’unu (SVR) düşürerek ileri atım hacmini (CO)
              ve regürjitan fraksiyonu dramatik düzeltir; düşük debide Dobutamin/Milrinon ile kombine edilebilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Akut Aort Diseksiyonu (YALNIZCA Esmolol Sonrası!)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-700 dark:text-rose-300">
                2. Basamak · KTA &lt;60 Şart
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>ASLA tek başına verilmez!</strong> Önce IV <strong>Esmolol</strong> (veya Labetalol) ile kalp hızı{' '}
              <strong>&lt;60/dk</strong> kontrol altına alındıktan sonra sistolik KB hâlâ &gt;120 mmHg ise eklenir; aksi
              halde baroreseptör refleks taşikardisi ve sol ventrikül dP/dt artışı diseksiyon flebini yırtar.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500" />
                Pediatrik Hipertansif Kriz &amp; Kontrollü Hipotansiyon
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                0,3–3 mcg/kg/dk
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Pediatrik KVC sonrası (aort koarktasyonu onarımı sonrası paradoksal HT dahil) veya seçilmiş ortopedi/skolyoz
              cerrahisinde kontrollü hipotansiyonda <strong>0,3–3 mcg/kg/dk</strong> (kısa süreli maks 4–5 mcg/kg/dk).
              &gt;2 mcg/kg/dk’da laktat ve kan gazı yakın izlenir.
            </p>
          </div>
        </div>

        {/* Güvenlik Kademeleri Şeridi */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div
            className={`p-4 rounded-xl border ${
              activeTab === 'adult_crisis' && adultRiskLevel === 'safe'
                ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/30'
                : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
              1. Güvenli Terapötik Aralık
            </span>
            <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
              0,3 – 2,0 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Endojen rodanaz + tiyosülfat kapasitesi normal KC/böbrekte CN⁻ yükünü genellikle tolere eder.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              activeTab === 'adult_crisis' && adultRiskLevel === 'cyanide_warn'
                ? 'border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/40'
                : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
              2. Siyanür Risk Bölgesi (!)
            </span>
            <div className="text-lg font-bold font-mono text-amber-700 dark:text-amber-300 mt-1">
              2,0 – 5,0 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              Kümülatif &gt;0,5 mg/kg sınırına hızla ulaşılır! Saatlik arteriyel laktat, BE ve SvO₂ izleyin; alternatif
              ajan veya 1:10 Sodyum Tiyosülfat ko-infüzyonu düşünün.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              activeTab === 'adult_crisis' && adultRiskLevel === 'ceiling_danger'
                ? 'border-rose-500 bg-rose-500/15 ring-2 ring-rose-500/40'
                : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
              3. Kesin Tavan (MAKS 10 DAKİKA!)
            </span>
            <div className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">
              &gt;5,0 – 10,0 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
              10 mcg/kg/dk hızında <strong>10 dakikada KB kontrol edilemezse SNP DERHAL KESİLMELİDİR!</strong> Bu hızda
              dakikalar içinde fatal siyanür zehirlenmesi gelişir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. İNTERAKTİF ÇOK SEKMELİ DOZ, POMPA & SİYANÜR KURTARMA HESAPLAYICI */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif SNP Pompa, Kümülatif Yük &amp; Siyanür Antidot Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Erişkin kriz infüzyonu, Pediatrik infüzyon ve Siyanür/Tiyosiyanat Toksisitesi Acil Kurtarma Sekmesi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MonographCopyButton isDark={isDark} getText={getOrderSummaryText} label="Order Kopyala" />
            <button
              type="button"
              onClick={() => {
                setWeightKg(70);
                setAdultPrep('std_200');
                setAdultDoseMcgKgMin(0.5);
                setAdultDurationHr(2);
                setPedWeightKg(18);
                setPedDoseMcgKgMin(1.0);
                setPedPrep('ped_200');
                setToxWeightKg(70);
                setToxDoseMcgKgMin(3.0);
                setToxDurationHr(4.0);
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

        {/* Sekmeler */}
        <div
          className={`mt-4 grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 rounded-xl border ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {[
            { id: 'adult_crisis' as SnpCalcTab, label: '1. Hipertansif Kriz / KVC / Feo', sub: '0,3–2 mcg/kg/dk (Tavan 10)' },
            { id: 'pediatric_crisis' as SnpCalcTab, label: '2. Pediatrik Kriz / Hipotansiyon', sub: '0,3–3 mcg/kg/dk' },
            { id: 'cyanide_rescue' as SnpCalcTab, label: '3. Siyanür Toksisitesi & Antidot', sub: 'Kümülatif mg/kg + Cyanokit®' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 text-left transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-700 hover:bg-white hover:text-slate-950'
              }`}
            >
              <span className="block text-xs font-bold">{tab.label}</span>
              <span
                className={`block text-[10.5px] font-mono mt-0.5 ${
                  activeTab === tab.id ? 'text-rose-100' : 'text-slate-400'
                }`}
              >
                {tab.sub}
              </span>
            </button>
          ))}
        </div>

        {/* TAB 1: ERİŞKİN HİPERTANSİF KRİZ */}
        {activeTab === 'adult_crisis' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-7 space-y-5">
              {/* Ağırlık */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={weightSliderId} className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-500" />
                    <span>Hasta Vücut Ağırlığı (Dosing Weight):</span>
                  </label>
                  <span className="font-mono tabular-nums text-sm text-rose-600 dark:text-rose-400 font-bold">
                    {weightKg} kg
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                  <input
                    id={weightSliderId}
                    type="range"
                    min="40"
                    max="160"
                    step="1"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center gap-1 shrink-0 flex-wrap">
                    {[50, 60, 70, 85, 100, 120].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWeightKg(w)}
                        className={`px-2 py-1 text-[11px] font-mono tabular-nums rounded border cursor-pointer ${
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
                drugName="Sodyum Nitroprussid (SNP)"
                recommendedScalar="IBW"
                secondaryScalar={{ type: 'AdjBW', context: 'Siyanür toksisitesi tavanı için' }}
                rationale="SNP ekstraselüler kompartmana dağılır (Vd ~0,2 L/kg); morbid obezitede gerçek kilo (TBW) ile hesaplama siyanür yükünü tehlikeli düzeyde artırır. IBW veya AdjBW kullanılmalıdır."
                currentWeightKg={weightKg}
                onApplyWeight={(w) => setWeightKg(Math.min(160, Math.max(40, w)))}
              />

              {/* Dilüsyon */}
              <div>
                <label htmlFor={adultPrepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Çözelti Konsantrasyonu (YALNIZCA %5 Dekstroz [D5W] · Opak/Folyo):
                </label>
                <select
                  id={adultPrepSelectId}
                  value={adultPrep}
                  onChange={(e) => setAdultPrep(e.target.value as AdultSnpPrep)}
                  className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="std_200">
                    Standart Torba/Şişe: 50 mg / 250 mL D5W (veya Nipruss 60 mg / 300 mL D5W) [200 mcg/mL]
                  </option>
                  <option value="central_1000">
                    Konsantre Santral Enjektör: 50 mg / 50 mL D5W (veya 60 mg / 60 mL) [1000 mcg/mL — Sadece SVK!]
                  </option>
                  <option value="custom">Özel Konsantrasyon (mcg/mL)</option>
                </select>

                {adultPrep === 'custom' && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-500">Konsantrasyon:</span>
                    <input
                      type="number"
                      min="50"
                      max="1000"
                      step="10"
                      value={adultCustomConc}
                      onChange={(e) => setAdultCustomConc(Math.max(50, Number(e.target.value)))}
                      className={`w-28 p-1.5 text-xs font-mono rounded-lg border ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs text-slate-500 font-mono">mcg/mL</span>
                  </div>
                )}
              </div>

              {/* Doz Slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <label htmlFor={adultDoseSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                    İnfüzyon Hızı (Güvenli: 0,3–2,0 · Kesin Tavan: 10 mcg/kg/dk):
                  </label>
                  <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
                    {adultDoseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <input
                  id={adultDoseSliderId}
                  type="range"
                  min="0.3"
                  max="10.0"
                  step="0.1"
                  value={adultDoseMcgKgMin}
                  onChange={(e) => setAdultDoseMcgKgMin(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[0.3, 0.5, 1.0, 1.5, 2.0, 3.0, 5.0, 8.0, 10.0].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setAdultDoseMcgKgMin(d)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border cursor-pointer ${
                        Math.abs(adultDoseMcgKgMin - d) < 0.05
                          ? 'bg-rose-600 text-white border-rose-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {d.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Süre Slider (Kümülatif yük tahmini için) */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                  <label htmlFor={adultDurSliderId} className="font-bold text-slate-700 dark:text-slate-300">
                    Planlanan / Geçen İnfüzyon Süresi (Kümülatif mg/kg Takibi):
                  </label>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {adultDurationHr} saat
                  </span>
                </div>
                <input
                  id={adultDurSliderId}
                  type="range"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={adultDurationHr}
                  onChange={(e) => setAdultDurationHr(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Sağ Sonuç Kartı */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                    Pompa İnfüzyon Hızı
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    {adultConcMcgMl} mcg/mL D5W
                  </span>
                </div>

                <div className="py-4 text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-rose-600 dark:text-rose-400 tracking-tight">
                    {adultPumpRateMlHr.toFixed(1)}{' '}
                    <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                      mL / saat
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Opak/amber hat · İnvaziv A-Line eşliğinde
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Dakikalık Doz</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {adultDoseMcgMin.toFixed(1)} mcg / dk
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Doz</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {adultHourlyMg.toFixed(2)} mg / sa
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border col-span-2 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                      Tahmini Kümülatif Doz ({adultDurationHr} saat)
                    </span>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <span
                        className={`font-mono font-extrabold text-base ${
                          adultCumulativeMgKg >= 1.5
                            ? 'text-rose-500'
                            : adultCumulativeMgKg >= 0.5
                              ? 'text-amber-500'
                              : 'text-emerald-500'
                        }`}
                      >
                        {adultCumulativeMgKg.toFixed(2)} mg/kg
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        (Toplam {adultCumulativeTotalMg.toFixed(1)} mg SNP)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {adultDoseMcgKgMin > 2.0 && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                    adultDoseMcgKgMin >= 5.0
                      ? 'bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-200'
                      : 'bg-amber-500/15 border-amber-500/40 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      {adultDoseMcgKgMin >= 10.0
                        ? 'KESİN TAVAN (10 mcg/kg/dk — MAKSİMUM 10 DAKİKA!)'
                        : 'SİYANÜR TOKSİSİTESİ RİSKİ (>2 mcg/kg/dk)!'}
                    </span>
                    {adultDoseMcgKgMin >= 10.0
                      ? '10 dakika içinde hedef KB sağlanamazsa SNP derhal kesilmelidir! Hızlı siyanür zehirlenmesi riski son derece yüksektir.'
                      : '2 mcg/kg/dk üzerinde hepatik rodanaz kapasitesi aşılabilir; saatlik arteriyel laktat, baz açığı ve SvO₂ izleyin veya Siyanür Kurtarma sekmesine geçin.'}
                  </div>
                </div>
              )}

              {adultCumulativeMgKg >= 0.5 && (
                <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      Kümülatif Doz Eşiği ({adultCumulativeMgKg.toFixed(2)} mg/kg ≥ 0,5 mg/kg):
                    </span>
                    0,5–1,5 mg/kg kümülatif yükte laktik asidoz ve taşifilaksi riski belirgin artar. Alternatif ajana
                    (Nikardipin/Klevidipin/Esmolol) geçmeyi değerlendirin.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PEDİATRİK HİPERTANSİF KRİZ */}
        {activeTab === 'pediatric_crisis' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={pedWeightSliderId}>Pediatrik Ağırlık (3 – 50 kg):</label>
                  <span className="font-mono text-sm text-rose-600 dark:text-rose-400 font-bold">{pedWeightKg} kg</span>
                </div>
                <input
                  id={pedWeightSliderId}
                  type="range"
                  min="3"
                  max="50"
                  step="1"
                  value={pedWeightKg}
                  onChange={(e) => setPedWeightKg(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[5, 10, 15, 20, 30, 40].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setPedWeightKg(w)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded border cursor-pointer ${
                        pedWeightKg === w
                          ? 'bg-rose-600 text-white border-rose-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor={pedPrepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pediatrik Seyreltme (YALNIZCA D5W · Işıktan Tam Korunmuş):
                </label>
                <select
                  id={pedPrepSelectId}
                  value={pedPrep}
                  onChange={(e) => setPedPrep(e.target.value as PedSnpPrep)}
                  className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="ped_200">Pediatrik Standart: 10 mg / 50 mL D5W [200 mcg/mL]</option>
                  <option value="ped_100">Küçük İnfant (&lt;10 kg): 5 mg / 50 mL D5W [100 mcg/mL]</option>
                  <option value="ped_1000">Sıvı Kısıtlı Büyük Çocuk (SVK): 50 mg / 50 mL D5W [1000 mcg/mL]</option>
                  <option value="ped_custom">Özel Konsantrasyon (mcg/mL)</option>
                </select>
                {pedPrep === 'ped_custom' && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-500">Konsantrasyon:</span>
                    <input
                      type="number"
                      min="25"
                      max="1000"
                      step="25"
                      value={pedCustomConc}
                      onChange={(e) => setPedCustomConc(Math.max(25, Number(e.target.value)))}
                      className={`w-28 p-1.5 text-xs font-mono rounded-lg border ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs text-slate-500 font-mono">mcg/mL</span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={pedDoseSliderId}>Pediatrik Doz (0,3–3 mcg/kg/dk · Kısa Tavan 4–5):</label>
                  <span className="font-mono text-sm text-rose-600 dark:text-rose-400 font-bold">
                    {pedDoseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <input
                  id={pedDoseSliderId}
                  type="range"
                  min="0.3"
                  max="5.0"
                  step="0.1"
                  value={pedDoseMcgKgMin}
                  onChange={(e) => setPedDoseMcgKgMin(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[0.3, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 5.0].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPedDoseMcgKgMin(d)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border cursor-pointer ${
                        Math.abs(pedDoseMcgKgMin - d) < 0.05
                          ? 'bg-rose-600 text-white border-rose-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {d.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-3">
              <div
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                    Pediatrik Pompa Hızı
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400">
                    {pedConcMcgMl} mcg/mL D5W
                  </span>
                </div>

                <div className="py-4 text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-rose-600 dark:text-rose-400 tracking-tight">
                    {pedPumpRateMlHr.toFixed(2)}{' '}
                    <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                      mL / saat
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {pedWeightKg} kg · {pedDoseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Dakikalık Doz</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {pedDoseMcgMin.toFixed(1)} mcg / dk
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Yük</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {pedHourlyMg.toFixed(2)} mg / sa
                    </span>
                  </div>
                </div>
              </div>

              {pedDoseMcgKgMin > 2.0 && (
                <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Pediatrik Siyanür Uyarısı (&gt;2 mcg/kg/dk):</span>
                    Çocuklarda &gt;2 mcg/kg/dk dozda laktik asidoz hızla gelişebilir; 4–5 mcg/kg/dk yalnızca çok kısa
                    süreli kurtarma içindir. Hidroksokobalamin (70 mg/kg) hazırda bulundurulmalıdır.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SİYANÜR & TİYOSİYANAT TOKSİSİTESİ HESAPLAYICI / ACİL KURTARMA */}
        {activeTab === 'cyanide_rescue' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-6 space-y-5">
              {/* Hasta Ağırlığı */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={toxWeightSliderId}>Hasta Ağırlığı (Antidot Dozu İçin):</label>
                  <span className="font-mono text-sm text-rose-600 dark:text-rose-400 font-bold">
                    {toxWeightKg} kg {isPediatricTox ? '· Pediatrik' : '· Erişkin'}
                  </span>
                </div>
                <input
                  id={toxWeightSliderId}
                  type="range"
                  min="5"
                  max="140"
                  step="1"
                  value={toxWeightKg}
                  onChange={(e) => setToxWeightKg(Number(e.target.value))}
                  className="w-full accent-rose-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {[10, 20, 35, 60, 70, 90].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setToxWeightKg(w)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border cursor-pointer ${
                        toxWeightKg === w
                          ? 'bg-rose-600 text-white border-rose-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
              </div>

              {/* Ortalama İnfüzyon Dozu */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={toxDoseSliderId}>Ortalama SNP İnfüzyon Hızı (mcg/kg/dk):</label>
                  <span className="font-mono text-sm text-amber-600 dark:text-amber-400 font-bold">
                    {toxDoseMcgKgMin.toFixed(1)} mcg/kg/dk
                  </span>
                </div>
                <input
                  id={toxDoseSliderId}
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.1"
                  value={toxDoseMcgKgMin}
                  onChange={(e) => setToxDoseMcgKgMin(Number(e.target.value))}
                  className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* İnfüzyon Süresi */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={toxDurSliderId}>İnfüzyon Süresi (Saat):</label>
                  <span className="font-mono text-sm text-indigo-600 dark:text-indigo-400 font-bold">
                    {toxDurationHr} saat
                  </span>
                </div>
                <input
                  id={toxDurSliderId}
                  type="range"
                  min="0.25"
                  max="48"
                  step="0.25"
                  value={toxDurationHr}
                  onChange={(e) => setToxDurationHr(Number(e.target.value))}
                  className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[0.5, 1, 2, 4, 8, 12, 24, 48].map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setToxDurationHr(h)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border cursor-pointer ${
                        toxDurationHr === h
                          ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {h} sa
                    </button>
                  ))}
                </div>
              </div>

              {/* Erken Siyanür Toksisitesi Triadı */}
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'bg-rose-950/25 border-rose-500/40' : 'bg-rose-50 border-rose-200'
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 shrink-0" />
                  <span>Erken Siyanür Toksisitesi Klinik Triadı</span>
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  <li>
                    <strong>1. Taşifilaksi (En Erken Bulgu!):</strong> Aynı kan basıncını tutmak için giderek artan SNP
                    doz ihtiyacı.
                  </li>
                  <li>
                    <strong>2. Açıklanamayan Laktik Asidoz:</strong> Yüksek anyon açıklı metabolik asidoz, hızla düşen
                    pH ve artan baz açığı (BE).
                  </li>
                  <li>
                    <strong>3. Artmış SvO₂ (Venöz Hiperoksi):</strong> Sitokrom c oksidaz bloke olduğundan hücre O₂
                    kullanamaz → parlak kırmızı venöz kan ve daralmış A-V O₂ farkı!
                  </li>
                </ul>
              </div>
            </div>

            {/* Sağ Kolon: Kümülatif Yük & Canlı Antidot Dozları */}
            <div className="lg:col-span-6 space-y-3">
              <div
                className={`p-4 rounded-2xl border ${
                  toxSeverity === 'critical'
                    ? isDark
                      ? 'bg-rose-950/40 border-rose-500/60'
                      : 'bg-rose-50 border-rose-300'
                    : toxSeverity === 'moderate'
                      ? isDark
                        ? 'bg-amber-950/30 border-amber-500/50'
                        : 'bg-amber-50 border-amber-300'
                      : isDark
                        ? 'bg-emerald-950/25 border-emerald-500/40'
                        : 'bg-emerald-50 border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                    Kümülatif SNP &amp; Siyanür Yükü
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded font-mono text-[10.5px] font-bold ${
                      toxSeverity === 'critical'
                        ? 'bg-rose-600 text-white'
                        : toxSeverity === 'moderate'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {toxSeverity === 'critical'
                      ? 'KRİTİK TOKSİSİTE RİSKİ'
                      : toxSeverity === 'moderate'
                        ? 'YÜKSEK RİSK (>0,5 mg/kg / >2 mcg/kg/dk)'
                        : 'DÜŞÜK RİSK ARALIĞI'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Kümülatif SNP</span>
                    <span className="font-mono font-extrabold text-base text-slate-900 dark:text-white">
                      {toxCumulativeMgKg.toFixed(2)} mg/kg
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Toplam SNP</span>
                    <span className="font-mono font-extrabold text-base text-slate-900 dark:text-white">
                      {toxTotalSnpMg.toFixed(1)} mg
                    </span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Tahmini CN⁻ (~%44)</span>
                    <span className="font-mono font-extrabold text-base text-rose-600 dark:text-rose-400">
                      {toxEstimatedCyanideMgKg.toFixed(2)} mg/kg
                    </span>
                  </div>
                </div>
              </div>

              {/* Acil Antidot Protokolü Kartı */}
              <div
                className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Acil Siyanür Kurtarma Dozları ({toxWeightKg} kg)</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-xs font-semibold text-rose-900 dark:text-rose-200">
                  0. ADIM: SNP infüzyonunu DERHAL KESİN + %100 FiO₂ (Yüksek Akım / Mekanik Ventilasyon) + Agresif Hemodinamik Destek!
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/70 border-teal-500/40' : 'bg-teal-50/70 border-teal-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-300">
                      1. Tercih: Hidroksokobalamin (Cyanokit®)
                    </span>
                    <span className="font-mono text-sm font-extrabold text-teal-700 dark:text-teal-300">
                      {hydroxocobalaminG.toFixed(2)} g IV
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {isPediatricTox
                      ? `Pediatrik 70 mg/kg (${hydroxocobalaminMg} mg, maks 5 g) 15 dakikada IV infüzyon.`
                      : 'Erişkin 5 g IV (15 dakikada infüzyon; ağır şok/asidoz sürerse 1 kez 5 g tekrarlanabilir).'}
                    {' '}Methemoglobinemi yapmaz, hipotansiyonu derinleştirmez; geçici kırmızı idrar/cilt rengi ve
                    kolorimetrik lab interferansı oluşturur.
                  </p>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/70 border-indigo-500/40' : 'bg-indigo-50/70 border-indigo-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                      2. Seçenek / Kombine: Sodyum Tiyosülfat %25
                    </span>
                    <span className="font-mono text-sm font-extrabold text-indigo-700 dark:text-indigo-300">
                      {sodiumThiosulfateG.toFixed(2)} g ({sodiumThiosulfate25Ml.toFixed(1)} mL)
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {isPediatricTox
                      ? `Pediatrik 250 mg/kg (${sodiumThiosulfateMg} mg, maks 12,5 g / 50 mL) 10–20 dk’da ayrı lümenden IV.`
                      : 'Erişkin 12,5 g (50 mL %25 çözelti) 10–20 dakikada ayrı hattan IV (Hidroksokobalamin ile aynı lümenden verilmez!).'}
                  </p>
                </div>

                {toxDurationHr >= 24 && (
                  <div className="p-2.5 rounded-xl border bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                    <Timer className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>≥24 Saat İnfüzyon — Tiyosiyanat Birikimi:</strong> Serum tiyosiyanat düzeyi izlenmeli
                      (&gt;10 mg/dL toksik → deliryum, psikoz, tinnitus, nöbet). Tedavide SNP kesilir ve{' '}
                      <strong>Hemodiyaliz</strong> uygulanır.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. TÜRKİYE / KLİNİK PREPARAT & KONSANTRASYON REHBERİ                */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Nipruss® 60 mg Liyofilize Toz + Çözücü Ampul (TR / Avrupa Pratiği)',
            presentation: '60 mg kırmızımsı-kahverengi kuru toz ampul + özel çözücü ampul (ışıktan korumalı kutu)',
            concentration: '60 mg / Ampul',
            saltOrBaseNote:
              'Kuru toz yalnızca kendi çözücüsü veya %5 Dekstroz (D5W) ile çözülür ve YALNIZCA D5W içinde seyreltilir (SF/RL ile hazırlanmaz!). 60 mg / 300 mL D5W = 200 mcg/mL.',
            alertLevel: 'high',
          },
          {
            name: 'Sodyum Nitroprussid 50 mg / 2 mL Flakon (Uluslararası / İthal Standart)',
            presentation: '50 mg liyofilize flakon veya 2 mL konsantre çözelti (25 mg/mL)',
            concentration: '50 mg / Flakon',
            saltOrBaseNote:
              '50 mg / 250 mL D5W = 200 mcg/mL (standart) veya 50 mg / 50 mL D5W = 1000 mcg/mL (sıvı kısıtlı santral enjektör). ASLA seyreltilmeden direkt puşe edilmez!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Standart Torba/Şişe (200 mcg/mL): 50 mg flakon + 250 mL %5 Dekstroz (D5W) — VEYA Nipruss® 60 mg + 300 mL D5W (opak/folyo sarılı!).',
          'Konsantre Santral Enjektör Pompası (1000 mcg/mL — Sıvı Kısıtlı): 50 mg + 50 mL D5W — YALNIZCA ayrı lümen Santral Venöz Kateter + opak enjektör + amber hat!',
          'Pediatrik Standart (100–200 mcg/mL): 5 mg / 50 mL D5W (100 mcg/mL) veya 10 mg / 50 mL D5W (200 mcg/mL).',
          'Profilaktik Tiyosülfat Ko-İnfüzyonu (Yüksek Doz Zorunluysa): Her 1 mg SNP için 10 mg Sodyum Tiyosülfat (1:10 oran) eklenmesi rodanaz kofaktörünü destekleyebilir.',
        ]}
        concentrationTrapWarning="Nipruss® (60 mg) ile uluslararası 50 mg flakon arasında %20 kütle farkı vardır — 60 mg ampul 250 mL’ye katılırsa 200 değil 240 mcg/mL olur! Ayrıca çözelti normalde çok açık saman sarısı/kahverengimsidir; ışık temasıyla MAVİ, YEŞİL veya KOYU KIRMIZIYA dönerse fotoliz ile serbest SİYANÜR oluşmuştur — DERHAL İMHA EDİN!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, IŞIK KORUMA, pH & Y-SITE UYUMLULUK (#sec-uyumluluk)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="central-preferred"
        accessSummary="Ayrı ve adanmış bir lümenden (tercihen Santral Venöz Kateter; acilde geniş proksimal periferik ven geçici) tek başına uygulanmalıdır. Aynı lümenden asla başka bolus ilaç verilmez (hat ölü boşluğundaki 1–2 mL konsantre SNP’nin itilmesi ani kardiyovasküler kollaps yaratır!). Tüm torba/enjektör alüminyum folyo/siyah kılıf ile sarılmalı ve amber/opak infüzyon hattı kullanılmalıdır."
        phRange="3.5 – 6.0 (Asidik · Fotolize Aşırı Duyarlı)"
        osmolalityNote="D5W içinde izotonik/hafif hiperozmolar; asıl fizikokimyasal tehlike pH değil, ışıkla demir-siyanür bağının kopup Prusya mavisi + serbest HCN/CN⁻ oluşturmasıdır."
        compatibleDiluents={[
          '%5 Dekstroz (D5W) — TEK ÖNERİLEN STANDART TAŞIYICI SIVI!',
          'DİKKAT: %0.9 NaCl (SF), Ringer Laktat veya koruyucu içeren solüsyonlarla SULANDIRILMAZ!',
        ]}
        stabilityNote="Işıktan tam korunduğunda D5W içinde oda sıcaklığında en fazla 24 saat stabildir (bazı üreticiler 4–12 saatte yenileme önerir). Çözeltide mavi, yeşil, koyu kırmızı renk değişimi veya bulanıklık görülürse DERHAL ATILMALIDIR."
        ySiteCompatible={[
          'Noradrenalin (ayrı lümen tercihli)',
          'Dobutamin',
          'Dopamin',
          'Nitrogliserin',
          'Esmolol',
          'Fentanil',
          'Midazolam',
          'Heparin',
          'İnsülin',
          'Furosemid (konsantrasyon bağımlı — ayrı lümen önerilir)',
        ]}
        ySiteIncompatible={[
          'Amiodaron',
          'Atrakuryum / Sisatrakuryum',
          'Levofloksasin',
          'Haloperidol',
          'Fenitoin',
          'Sodyum Bikarbonat (alkali pH bozunmayı hızlandırır)',
          'Kan Ürünleri & Lipit Emülsiyonları',
        ]}
        extravasationProtocol="Periferik ekstravazasyonda doku irritasyonu/inflamasyon gelişebilir; vazodilatör olduğu için iskemik nekroz nadir olsa da infüzyon hemen durdurulmalı, kanül çıkarılmadan aspire edilmeli ve santral/yeni geniş damar yoluna geçilmelidir. Ölü boşluk güvenliği için SNP kapatıldığında hat asla hızlı flush yapılmamalı, şırınga ile geri aspire edilmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="TİYOSİYANAT (SCN⁻) TOKSİSİTESİ RİSKİ! Normal t½ 3 gün iken KBY’de 7–9 güne uzar."
        renalDetails={[
          'SNP’nin ana toksik olmayan son ürünü olan Tiyosiyanat (SCN⁻) neredeyse tamamen glomerüler filtrasyonla böbrekten atılır.',
          'eGFR < 30–60 mL/dk veya oligürik AKI hastalarında 24–48 saati aşan infüzyonlarda tiyosiyanat birikir: deliryum, psikoz, halüsinasyon, tinnitus, hiperrefleksi, nöbet, hipotiroidi ve koma gelişir.',
          'Böbrek yetmezliğinde SNP infüzyonu mümkünse <24 saat ve <2 mcg/kg/dk ile sınırlandırılmalı; toksisite gelişirse (>10 mg/dL) Tiyosiyanat HEMODİYALİZ ile etkin biçimde temizlenir.',
        ]}
        hepaticSummary="SİYANÜR (CN⁻) TOKSİSİTESİ RİSKİ! Rodanaz enzimi ve tiyosülfat deposu azalır → hızlı laktik asidoz."
        hepaticDetails={[
          'Serbest siyanürün tiyosiyanata çevrildiği rodanaz enziminin ana merkezi karaciğerdir.',
          'Child-Pugh B/C siroz, akut karaciğer yetmezliği veya malnütrisyonlu (tiyosülfat depoları düşük) hastalarda düşük dozlarda (<2 mcg/kg/dk) dahi hızla siyanür birikip açıklanamayan laktik asidoz oluşturabilir.',
          'Ağır hepatik yetmezlikte SNP yerine mümkünse Nikardipin, Klevidipin veya Esmolol tercih edilmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE DOZ YÖNETİMİ (#sec-geriatri-obezite)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="0,2–0,3 mcg/kg/dk Başlangıç · Yavaş Titrasyon"
        geriatricPoints={[
          '>65 yaş hastalarda yaşa bağlı GFR düşüşü (tiyosiyanat birikimi) ve azalmış serebral/koroner otoregülasyon rezervi nedeniyle SNP’nin hipotansif etkisine duyarlılık belirgin artmıştır.',
          'Ani MAP düşüşleri (>%20–25) sessiz karotis veya koroner darlığı olan yaşlılarda akut iskemik inme, koroner çalma veya akut böbrek hasarı tetikleyebilir.',
          'Mümkün olan en düşük dozla (0,2–0,3 mcg/kg/dk) başlayıp invaziv A-Line eşliğinde yavaş titre edin ve en kısa sürede oral/alternatif IV antihipertansife geçin.',
        ]}
        obesityWeightScalarBadge="IBW (Tercih) veya AdjBW"
        obesityPoints={[
          'SNP hidrofilik bir inorganik kompleks olup dağılım hacmi (Vd ~0,2 L/kg) primer olarak ekstraselüler sıvı ile sınırlıdır; adipoz dokuya dağılmaz.',
          'Morbid obezitede (BMI ≥ 30–40 kg/m²) TBW (gerçek kilo) kullanılması hem aşırı hipotansiyona hem de gereksiz yüksek siyanür maruziyetine yol açar; doz ve tavan hesaplamaları IBW veya AdjBW üzerinden yapılmalıdır.',
          'Yukarıdaki hesaplayıcıdaki Obezite Doz Ölçekleyici ile IBW/AdjBW tek tıkla uygulanabilir.',
        ]}
        clinicalNote="Hem geriatrik hem obez hastalarda 24 saati aşan sürekli SNP infüzyonundan kaçınılmalı; hedeflenen akut kontrol sağlandığında alternatif ajana geçilmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK, OBSTETRİK & LAKTASYON (#sec-gebelik)                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Diğer antihipertansifler (Labetalol, Nikardipin, Hidralazin) başarısız olmadıkça GEBELİKTE KAÇINILIR! Fetal siyanür birikimi riski."
        pregnancyDetails={[
          'Sodyum nitroprussid ve serbest siyanür plasentayı kolayca geçer; fetal karaciğerde rodanaz aktivitesi olgunlaşmadığı için fetal siyanür birikimi, metabolik asidoz ve fetal ölüm bildirilmiştir (hayvan ve insan verileri).',
          'Ağır preeklampsi/eklampsi veya gebelik hipertansif krizinde 1. tercihler IV Labetalol, IV Hidralazin, oral Nifedipin veya IV Nikardipindir.',
          'Hayatı tehdit eden, tüm ajanlara refrakter maternal krizde son çare olarak kullanılmak zorundaysa en düşük dozda (<2 mcg/kg/dk), en kısa sürede (mümkünse <4 saat, acil doğum öncesi) ve sürekli fetal kalp hızı izlemiyle uygulanır.',
        ]}
        lactationSummary="Tiyosiyanat anne sütüne geçer ve yenidoğanda tiroid supresyonu/toksisite riski taşır — infüzyon sırasında emzirme önerilmez."
        lactationDetails={[
          'Ana molekülün yarı ömrü 2 dakika olsa da aktif/toksik metaboliti olan tiyosiyanatın yarı ömrü 3 gündür ve anne sütüne geçebilir.',
          'Kısa süreli acil SNP kullanımı sonrası emzirme kararı tiyosiyanat yükü ve infantın gestasyonel yaşına göre değerlendirilmeli; uzun süreli infüzyon sonrası emzirmeye ara verilmesi önerilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖNEMLİ OLUMSUZ ETKİLER (#sec-olumsuz)                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Siyanür Toksisitesi (Sitokrom c Oksidaz Blokajı)',
            incidenceOrSeverity: 'ÖLÜMCÜL · >2 mcg/kg/dk',
            tone: 'rose',
            detail:
              'Taşifilaksi, açıklanamayan yüksek anyon açıklı laktik asidoz, artmış SvO₂ (venöz hiperoksi), konfüzyon, nöbet ve kardiyak arrest → Hidroksokobalamin 5 g IV!',
          },
          {
            title: 'Tiyosiyanat (SCN⁻) Toksisitesi',
            incidenceOrSeverity: 'KBY / >24–48 sa',
            tone: 'amber',
            detail:
              'Serum SCN⁻ >10 mg/dL: deliryum, psikoz, tinnitus, kas spazmları, hiperrefleksi, nöbet ve hipotiroidi (iyot blokajı). Tedavi: SNP kes + Hemodiyaliz.',
          },
          {
            title: 'Derin Hipotansiyon & Refleks Taşikardi',
            incidenceOrSeverity: 'Çok Sık',
            tone: 'rose',
            detail:
              '30–60 sn’de keskin MAP çöküşü ve baroreseptör refleks taşikardisi (↑MVO₂, aort diseksiyonunda ↑dP/dt tehlikesi!).',
          },
          {
            title: 'Koroner Çalma (Coronary Steal)',
            incidenceOrSeverity: 'İskemik KAH’ta Kritik',
            tone: 'rose',
            detail:
              'Küçük koroner direnç arteriyollerini genişleterek maksimal dilate iskemik bölgeden sağlıklı miyokarda kan çalar ve subendokardiyal iskemiyi kötüleştirir.',
          },
          {
            title: 'KİB (ICP) Artışı & Serebral Herniasyon',
            incidenceOrSeverity: 'Nöroşirürji Riski',
            tone: 'indigo',
            detail:
              'Serebral arteriyoler ve venöz vazodilatasyonla CBF/CBV’yi artırır; intrakraniyal kompliyansı bozuk hastalarda ICP’yi tehlikeli biçimde yükseltir.',
          },
          {
            title: 'HPV İnhibisyonu & Hipoksemi',
            incidenceOrSeverity: 'Sık (V/Q Bozulması)',
            tone: 'amber',
            detail:
              'Hipoksik pulmoner vazokonstriksiyonu baskılayarak intrapulmoner şantı artırır ve arteriyel PaO₂’yi düşürür.',
          },
          {
            title: 'Rebound Hipertansiyon',
            incidenceOrSeverity: 'Ani Kesimde',
            tone: 'indigo',
            detail:
              'İnfüzyon sırasında artan renin-anjiyotensin ve katekolamin tonusu nedeniyle SNP aniden kapatıldığında bazalin üzerinde rebound hipertansiyon gelişebilir.',
          },
          {
            title: 'Trombosit Disfonksiyonu & Methemoglobinemi',
            incidenceOrSeverity: 'Nadir / Yüksek Doz',
            tone: 'teal',
            detail:
              'Yüksek cGMP trombosit agregasyonunu inhibe ederek kanama zamanını uzatır; çok yüksek dozlarda nadiren klinik methemoglobinemi gelişebilir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL DURUMLAR                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Taşifilaksi = Siyanür Toksisitesinin İlk Alarm Zili!',
            detail:
              'GTN’den farklı olarak SNP’de klasik ALDH2 nitrat toleransı görülmez. Aynı kan basıncını korumak için SNP dozunu sürekli artırmak zorunda kalıyorsanız (taşifilaksi), dozu daha da yükseltmek yerine DERHAL arteriyel laktat, baz açığı ve SvO₂ bakıp siyanür toksisitesini dışlayın!',
          },
          {
            title: 'Aort Diseksiyonunda Sıralama Hatası Ölümcüldür (Önce Esmolol!)',
            detail:
              'Akut Tip A/B aort diseksiyonunda beta-bloker vermeden SNP başlanması refleks taşikardi ve sol ventrikül ejeksiyon hızı (dP/dt) artışıyla diseksiyonu rüptüre götürür. Önce Esmolol ile KTA <60/dk sağlanır, SNP ancak gerekirse 2. ajan olarak eklenir.',
          },
          {
            title: 'Koroner Arter Hastasında SNP Yerine GTN veya Nikardipin',
            detail:
              'Sabit epikardiyal koroner darlığı olan hastada darlık distalindeki arteriyoller zaten maksimal dilate durumdadır; SNP sağlıklı komşu bölgenin direnç arteriyollerini genişletip kanı iskemik alandan çalar (coronary steal). İskemik kalpte GTN üstündür.',
          },
          {
            title: 'Renk Değişimi Kontrolü (Fotoliz = Serbest Siyanür)',
            detail:
              'Taze hazırlanmış SNP açık kahverengi/saman sarısıdır. Hat veya enjektör ışık aldığında mavi (Prusya mavisi), yeşil veya koyu kırmızıya döner — bu renk değişimi solüsyonun serbest siyanüre parçalandığını gösterir; derhal yenisiyle değiştirin.',
          },
          {
            title: 'Parlak Kırmızı Venöz Kan & Yüksek SvO₂ Tuzağı',
            detail:
              'Siyanür zehirlenmesinde doku hücreleri oksijeni kullanamadığı (histotoksik hipoksi) için santral/mikst venöz O₂ satürasyonu (SvO₂) paradoksal olarak yükselir (>%80–85) ve venöz kan arteriyel kan gibi parlak kırmızı görünür — bunu "iyi perfüzyon" sanmayın!',
          },
          {
            title: 'Kademeli Sonlandırma (Rebound HT Önlemi)',
            detail:
              'Uzamış SNP infüzyonu kapatılırken plazma renin ve katekolamin düzeyleri yüksek olduğundan aniden kesilirse şiddetli rebound hipertansiyon gelişebilir; 15–30 dk içinde kademeli azaltılarak veya uzun etkili antihipertansif köprüsüyle kesilmelidir.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. DERİN FARMAKODİNAMİK ANALİZ (4 KADEMELİ KAPALI AKORDİYON)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Non-Enzimatik Direkt NO Salınımı → sGC Heme Aktivasyonu vs Mitokondriyal Sitokrom c Oksidaz)',
          summary:
            'Sodyum Nitroprussid (Na₂[Fe(CN)₅NO]·2H₂O), GTN gibi mitokondriyal ALDH2 aktivasyonuna bağımlı olmayan, doğrudan redoks etkileşimiyle Nitrik Oksit (NO) serbestleştiren bir demir-nitrozil kompleksidir. Bu moleküler özellik SNP’ye tüm damar yataklarında (hem rezistans arteriyolleri hem kapasitans venleri) eşit güçte ve ultra-hızlı (30–60 sn) etki kazandırırken, eşzamanlı salınan 5 siyanür (CN⁻) iyonu mitokondriyal elektron transport zincirindeki Sitokrom c Oksidaz (Kompleks IV) için yüksek afiniteli bir zehir oluşturur (Miller’s / Stoelting’s / Goodman & Gilman).',
          points: [
            'Eritrosit & Vasküler Düz Kas Redoks Yıkımı: SNP molekülü eritrosit sarkolemmasını geçip oksihemoglobin (Hb-Fe²⁺-O₂) veya vasküler düz kas zarındaki tiyol (–SH) gruplarından 1 elektron alarak kararsız nitroprussid radikaline indirgenir; saniyeler içinde 1 mol NO, 5 mol CN⁻ ve methemoglobin (Hb-Fe³⁺) oluşur.',
            'Çözünür Guanilat Siklaz (sGC — α1β1) Direkt Aktivasyonu: Oluşan NO lipofilik gaz olarak vasküler düz kas sitozolüne diffüze olur ve sGC’nin β1 alt birimindeki Fe²⁺-hem merkezine bağlanarak katalitik aktiviteyi >100 kat artırır (GTP → cGMP).',
            'Arteriyol ve Venülde Eşit Duyarlılık (ALDH2 Bağımsızlığı): Organik nitratlardan farklı olarak venöz ALDH2 yoğunluğuna bağımlı olmadığından küçük rezistans arteriyolleri ile büyük kapasitans venleri eşit konsantrasyonda gevşer (dengeli preload + afterload düşüşü).',
            'Toksik Moleküler Hedef — Mitokondriyal Sitokrom c Oksidaz (Kompleks IV): Serbestleşen CN⁻ iyonu mitokondri iç zarındaki Sitokrom c Oksidazın (aa₃) ferrik hem demirine (Fe³⁺) yüksek afiniteyle geri dönüşümsüz/sıkı bağlanarak elektronların O₂’ye aktarımını bloke eder → aerobik ATP sentezi durur (histotoksik hipoksi).',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı (cGMP / PKG-I Vazodilatasyon vs Mitokondriyal Oksidatif Fosforilasyon Blokajı)',
          summary:
            'SNP, vasküler düz kas hücresinde fizyolojik cGMP/PKG-I gevşeme kaskadını maksimal hızla ateşlerken, toksik dozlarda tüm organ hücrelerinin mitokondrilerinde oksidatif fosforilasyonu kilitler:',
          points: [
            'cGMP → PKG-I → MLCP Aktivasyonu & Kontraktil Gevşeme: Hızla yükselen cGMP, PKG-I’i aktive eder; MYPT1/RhoA inhibisyonu ile Miyozin Hafif Zincir Fosfatazı (MLCP) aktive ederek MLC₂₀’yi defosforile eder ve arteriyoler düz kas tonusunu saniyeler içinde çözer.',
            'Hücre İçi [Ca²⁺]i Düşüşü & Hiperpolarizasyon: PKG-I, SERCA2a pompasını hızlandırır (fosfolamban fosforilasyonu), SR IP₃R kanallarını ve sarkolemmal L-tipi Ca²⁺ kanallarını inhibe eder, BKCa (Maxi-K) K⁺ kanallarını açarak membranı hiperpolarize eder.',
            'Siyanür Kaynaklı Hücresel Metabolik Kriz (Anaerobik Kayma): Kompleks IV bloke olduğunda NADH/NAD⁺ oranı hızla yükselir, Krebs döngüsü durur ve hücre ATP üretebilmek için zorunlu anaerobik glikolize geçer → pirüvat hızla laktata dönüşür (şiddetli yüksek anyon açıklı laktik asidoz). Oksijen kapillerden hücreye geçse de tüketilemediği için venöz kandaki O₂ satürasyonu (SvO₂) patolojik olarak yükselir.',
            'Rodanaz & Antidot Biyokimyası: Normalde mitokondriyal rodanaz enzimi tiyosülfattan (S₂O₃²⁻) bir kükürt atomunu CN⁻’ye aktararak az toksik Tiyosiyanat (SCN⁻) oluşturur. Hidroksokobalamin (B12a) ise Kobalt (Co³⁺) merkezine CN⁻’yi doğrudan bağlayarak hidroksil grubunu yerinden eder ve böbrekten atılan zararsız Siyanokobalamin (Vitamin B12) oluşturur.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Rezistans Arteriyol, Kapasitans Ven & Koroner Mikrodolaşım → Kardiyovasküler Fizyoloji',
            tissueTarget: 'Arteriyol (SVR↓) · Venül (Preload↓) · Koroner Çalma',
            accent: 'rose',
            points: [
              'Dengeli Preload & Afterload Düşüşü: Hem SVR hem CVP/PCWP eşzamanlı düşer. Normal kalpte venöz dönüş azalmasına bağlı atım hacmi sabit kalır veya hafif düşer (baroreseptör refleks taşikardi eşlik eder); ancak sistolik kalp yetmezliği veya ciddi mitral/aort yetersizliğinde afterload düşüşü ileri kardiyak debiyi (CO) belirgin artırır.',
              'Koroner Çalma (Coronary Steal) Fenomeni: Sabit koroner stenoz distalindeki direnç arteriyolleri metabolik otoregülasyonla zaten maksimal dilate haldedir. SNP’nin küçük direnç arteriyollerini (<100 µm) güçlü genişletmesi sağlıklı komşu damarlarda direnci düşürüp diyastolik basıncı (DBP) azaltarak kollateral akımı iskemik bölgeden çalar.',
              'Aort Duvar Stresi (dP/dt): Tek başına verildiğinde düşen MAP’a yanıt olarak gelişen sempatik refleks, kalp hızını ve sol ventrikül ejeksiyon ivmesini (dP/dt) artırarak aort diseksiyonunda intimal yırtığı büyütür.',
            ],
          },
          {
            systemTitle: 'Serebral Direnç Damarları & İntrakraniyal Kompartman → Nöro-Fizyoloji',
            tissueTarget: 'Pial Arteriyoller · CBF / CBV · ICP',
            accent: 'indigo',
            points: [
              'Güçlü Serebral Vazodilatasyon & Otoregülasyon Bozulması: Direkt arteriyoler dilatasyon serebral vasküler direnci düşürerek CBF ve serebral kan hacmini (CBV) artırır; kafa içi yer kaplayan lezyon, ödem veya travma varlığında ICP’yi keskin yükseltir.',
              'Serebral Perfüzyon Basıncı (CPP = MAP − ICP) Çöküşü: Eşzamanlı MAP düşüşü ve ICP yükselmesi serebral iskemiyi derinleştirir — nöroanestezide kafa içi basınç yüksekse SNP yerine Nikardipin/Klevidipin/Esmolol tercih edilir.',
              'Tiyosiyanat Nörotoksisitesi: Böbrek yetmezliğinde biriken SCN⁻ kan-beyin bariyerini geçerek SSS eksitabilitesini bozar (deliryum, psikoz, tinnitus, hiperrefleksi ve jeneralize nöbetler).',
            ],
          },
          {
            systemTitle: 'Pulmoner Arteriyoller, Alveoler Şant & Böbrek → Solunum & Renal Fizyoloji',
            tissueTarget: 'Pulmoner Arter (HPV↓) · RAAS · Glomerüler SCN⁻ Atılımı',
            accent: 'sky',
            points: [
              'Pulmoner Vazodilatasyon & HPV İnhibisyonu: Pulmoner vasküler direnci (PVR) ve pulmoner arter basıncını (PAP) düşürür; ancak hipoksik pulmoner vazokonstriksiyonu (HPV) belirgin inhibe ederek intrapulmoner sağ-sol şantı (Qs/Qt) artırır ve PaO₂’yi düşürür.',
              'RAAS Aktivasyonu & Rebound Hipertansiyon: Renal perfüzyon basıncının düşmesi jukstaglomerüler aparattan yoğun renin salınımını tetikler; bu yüksek anjiyotensin II + sempatik tonus, SNP aniden kapatıldığında şiddetli rebound hipertansiyona yol açar.',
              'Renal Tiyosiyanat Klirensi: Tiyosiyanatın eliminasyonu tamamen GFR’ye bağımlıdır; KBY’de yarı ömrü 3 günden 7–9 güne çıkar.',
            ],
          },
          {
            systemTitle: 'Trombosit, Tiroid Folikülü & Fetoplasental Ünite → Hematoloji, Endokrin & Obstetrik',
            tissueTarget: 'Trombosit cGMP · Tiroid NIS · Plasental Geçiş',
            accent: 'amber',
            points: [
              'Trombosit Agregasyon İnhibisyonu: Trombosit içi cGMP yükselmesi adezyon ve agregasyonu baskılar; yüksek dozlarda kanama zamanı uzayabilir (cerrahi hemostazda dikkat!).',
              'Tiroid İyot Alım İnhibisyonu: Tiyosiyanat (SCN⁻), tiroid folikül hücresindeki sodyum-iyot simporterini (NIS) kompetitif inhibe ederek uzamış infüzyonlarda hipotiroidiye katkıda bulunur.',
              'Plasental Geçiş & Fetal Siyanür Hassasiyeti: Küçük inorganik yapısı plasentadan serbestçe geçer; fetal karaciğerde olgunlaşmamış rodanaz sistemi nedeniyle fetüste siyanür birikimi anneden önce gelişebilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Tavan Doz Kinetiği (10 mcg/kg/dk ≤10 dk), Siyanür Eşiği & Taşifilaksi Farkı',
          summary:
            'SNP, organik nitratlardan farklı olarak klasik enzimatik ALDH2 toleransı geliştirmez; ancak toksik metabolit birikimi açısından tüm IV vazodilatörler içinde en dar güvenlik penceresine sahiptir:',
          points: [
            'Rodanaz & Tiyosülfat Doygunluk Eşiği (>2 mcg/kg/dk): Sağlıklı erişkinde endojen tiyosülfat rezervi saatlik ~1–2 mcg/kg/dk SNP’den çıkan siyanürü detoksifiye edebilir. 2 mcg/kg/dk aşıldığında veya kümülatif doz >0,5–1,5 mg/kg olduğunda serbest CN⁻ plazmada hızla yükselir.',
            '10 mcg/kg/dk — 10 Dakika Kuralı (FDA Black Box): Maksimum 10 mcg/kg/dk hızı kesinlikle 10 dakikadan uzun sürdürülmemelidir; 10 dakikada KB yanıtı alınamıyorsa infüzyon derhal sonlandırılmalıdır.',
            'Taşifilaksi = Siyanür Alarmı: İnfüzyon sırasında artan doz ihtiyacı (taşifilaksi), yükselen metabolik asidoz ve artan katekolamin/RAAS aktivasyonunun oluşturduğu fizyolojik direnci yansıtır ve siyanür zehirlenmesinin en erken yatak başı işaretidir.',
            'Sinerjik Kombinasyon (Esmolol / Tiyosülfat): Beta-bloker (Esmolol) ile kombine edildiğinde refleks taşikardi, renin salınımı ve SNP doz ihtiyacı %30–50 azalır (siyanür yükü düşer). Zorunlu yüksek dozlarda 1:10 oranında Sodyum Tiyosülfat eklenmesi rodanaz kofaktörünü yeniler.',
          ],
        }}
        clinicalPearls={[
          'Siyanür Triadı (Taşifilaksi + Laktik Asidoz + Yüksek SvO₂): SNP altında laktat yükseliyor ve santral venöz kan parlak kırmızı (SvO₂ >%80) geliyorsa hipovolemi değil siyanür zehirlenmesi vardır — infüzyonu kapatın, %100 O₂ verin ve Hidroksokobalamin 5 g IV (Cyanokit®) başlayın.',
          'Hidroksokobalamin (Cyanokit®) Neden 1. Tercihtir?: Eski nitrit bazlı siyanür kitleri (Amil/Sodyum Nitrit) methemoglobinemi ve ağır hipotansiyon yaparak zaten SNP almış hastayı öldürebilir; Hidroksokobalamin methemoglobin oluşturmaz ve kan basıncını destekler!',
          'D5W + Folyo + A-Line Üçlüsü Olmadan ASLA: SNP asla SF ile sulandırılmaz, ışıksız bırakılmaz ve manşon (NIBP) ile titre edilmez. Mavi/yeşil renk = serbest siyanür → derhal imha!',
          'Modern Alternatifler (Nikardipin / Klevidipin): Günümüzde çoğu hipertansif acil, nöroşirürji ve KVC vakasında siyanür toksisitesi ve koroner çalma riski olmayan Nikardipin veya Klevidipin tercih edilir; SNP yalnızca saniyeler içinde ultra-hızlı/reversibl dengeli vazodilatasyon gereken seçilmiş vakalarda ve kısa süreli kullanılmalıdır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Sodyum Nitroprussid (SNP)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'PDE-5 İnhibitörleri (Sildenafil · Vardenafil [24 sa] · Tadalafil [48 sa]) & Riociguat',
            mechanism: 'sGC / cGMP Yolağında Kontrolsüz Sinerjik Birikim',
            clinicalEffect: 'Ani, şiddetli, vazopressöre dirençli ölümcül hipotansif şok ve organ iskemisi.',
            management: 'MUTLAK KONTRENDİKE! Son 24–48 saatte PDE-5 inhibitörü veya Riociguat alan hastada SNP uygulanmaz.',
          },
          {
            severity: 'D',
            agent: 'Volatil Anestezikler (Sevofluran · Desfluran · İzofluran) & Propofol',
            mechanism: 'Aditif Arteriyoler Vazodilatasyon + Baroreseptör Refleks Baskılanması',
            clinicalEffect: 'Beklenenden çok daha derin hipotansiyon ve organ hipoperfüzyonu; kontrollü hipotansiyonda sinerjik KB düşüşü.',
            management: 'İnvaziv A-Line eşliğinde 0,2–0,3 mcg/kg/dk ile başlayın; volatil MAC’ını ve sıvı durumunu titre edin.',
          },
          {
            severity: 'D',
            agent: 'Beta-Blokerler (Esmolol · Labetalol) & Kalsiyum Kanal Blokerleri',
            mechanism: 'Refleks Taşikardi Blokajı & Aditif Hipotansif Etki',
            clinicalEffect: 'Aort diseksiyonunda hayat kurtarıcı sinerji (KTA↓, dP/dt↓, SNP dozu %30–50↓), ancak aşırı hipotansiyon riski artar.',
            management: 'Aort diseksiyonunda Esmolol ÖNCE başlanır; birlikte kullanımda SNP başlangıç dozu düşük tutulur.',
          },
          {
            severity: 'D',
            agent: 'Siyanokobalamin / Hidroksokobalamin ile Aynı Lümen (Sodyum Tiyosülfat)',
            mechanism: 'Fizikokimyasal İnaktivasyon / Hat Uyumsuzluğu',
            clinicalEffect: 'Acil siyanür kurtarmasında Hidroksokobalamin ve Sodyum Tiyosülfat aynı Y-porttan verilirse kimyasal etkileşimle etkinlik düşer.',
            management: 'İki antidot birlikte uygulanacaksa mutlaka ayrı IV hatlardan veya ardışık (hat SF ile yıkanarak) verilmelidir.',
          },
          {
            severity: 'C',
            agent: 'Antitrombotik / Antiagregan Ajanlar (Aspirin · Klopidogrel · Heparin)',
            mechanism: 'SNP Kaynaklı Trombosit cGMP Artışı ile Aditif Agregasyon İnhibisyonu',
            clinicalEffect: 'Yüksek doz veya uzamış SNP infüzyonunda kanama zamanında hafif-orta uzama ve cerrahi sızıntı artışı.',
            management: 'Yüksek doz perioperatif kullanımda cerrahi hemostaz ve kanama miktarı yakından izlenmelidir.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP.',
            title: "Miller's Anesthesia (10th Edition) — Vasodilators & Perioperative Hypertension Management.",
            journal: 'Elsevier',
            year: 2024,
            note: 'SNP ultra-hızlı farmakokinetiği, siyanür/tiyosiyanat metabolizması, koroner çalma, KİBAS riski ve Hidroksokobalamin antidot protokolü.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD.',
            title: "Stoelting's Pharmacology & Physiology in Anesthetic Practice (6th Edition) — Peripheral Vasodilators.",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'Non-enzimatik NO salınımı, rodanaz hız kısıtlayıcı basamağı, HPV inhibisyonu ve tiyosiyanat renal eliminasyon kinetiği.',
          },
          {
            authors: 'Whelton PK, Carey RM, Aronow WS, et al. (ACC/AHA Task Force).',
            title: '2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults.',
            journal: 'Hypertension',
            year: 2018,
            note: 'Hipertansif acillerde SNP doz aralığı (0,3–2 mcg/kg/dk; maks 10 mcg/kg/dk ≤10 dk), A-Line zorunluluğu ve aort diseksiyonunda beta-bloker önceliği.',
          },
          {
            authors: 'Friederich JA, Butterworth JF.',
            title: 'Sodium nitroprusside: twenty years and counting.',
            journal: 'Anesth Analg',
            year: 1995,
            note: 'Klasik anesteziyoloji derlemesi: SNP’nin 5 CN⁻ stokiyometrisi, fotoliz/ışık koruması, taşifilaksi-siyanür ilişkisi ve klinik güvenlik sınırları.',
          },
          {
            authors: 'Hottinger DG, Beebe DS, Kozhimannil T, Prielipp RC, Belani KG.',
            title: 'Sodium nitroprusside in 2014: A clinical concepts review.',
            journal: 'J Anaesthesiol Clin Pharmacol',
            year: 2014,
            note: 'Perioperatif SNP kullanımı, siyanür toksisitesinin erken tanısı (laktat, SvO₂), Hidroksokobalamin ve Sodyum Tiyosülfat kurtarma dozları.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/nitroprusside.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
