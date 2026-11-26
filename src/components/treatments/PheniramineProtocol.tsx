import React, { useId, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  Baby,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  HeartPulse,
  Layers,
  ShieldAlert,
  Syringe,
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

type CalcTab = 'adult_allergy' | 'pediatric' | 'perioperative_pruritus';
type AdultRouteMode = 'iv_diluted_10ml' | 'iv_mini_50ml' | 'im_deep';
type PeriOpScenario = 'contrast_transfusion' | 'neuraxial_opioid' | 'vancomycin_infusion';

const AMP_MG = 45.5;
const STOCK_MG_ML = 22.75; // 45,5 mg / 2 mL
const DILUTED_10ML_MG_ML = 4.55; // 45,5 mg / 10 mL (1 ampul + 8 mL SF)
const SYRUP_MG_ML = 3.0; // Avil® Şurup 15 mg / 5 mL

export const PheniramineProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('adult_allergy');
  const [weightKg, setWeightKg] = useState<number>(70);

  // Tab 1: Erişkin Akut Ürtiker / Pruritus / Anafilaksi Adjuvanı
  const [adultRoute, setAdultRoute] = useState<AdultRouteMode>('iv_diluted_10ml');
  const [isGeriatric, setIsGeriatric] = useState<boolean>(false);
  const [adultDailyFreq, setAdultDailyFreq] = useState<1 | 2>(1);

  // Tab 2: Pediatrik Dozaj
  const [pedAgeYears, setPedAgeYears] = useState<number>(6);
  const [pedWeightKg, setPedWeightKg] = useState<number>(22);
  const [pedDoseMgKg, setPedDoseMgKg] = useState<number>(0.5);

  // Tab 3: Perioperatif Kaşıntı / Kontrast & Transfüzyon
  const [periOpScenario, setPeriOpScenario] = useState<PeriOpScenario>('contrast_transfusion');

  // Akordiyon State
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik ID'leri
  const weightSliderId = useId();
  const weightInputId = useId();
  const pedAgeSliderId = useId();
  const pedAgeInputId = useId();
  const pedWeightSliderId = useId();
  const pedDoseSliderId = useId();

  // --- HESAPLAMALAR ---
  // Tab 1: Erişkin
  const adultSingleMg = isGeriatric ? 22.75 : AMP_MG;
  const adultSingleStockMl = adultSingleMg / STOCK_MG_ML;
  const adultSingleDilutedMl = adultSingleMg / DILUTED_10ML_MG_ML;
  const adultDailyTotalMg = adultSingleMg * adultDailyFreq;
  const adultDailyCapExceeded = adultDailyTotalMg > 91.0;

  // Tab 2: Pediatrik
  const isPedContraindicated = pedAgeYears < 2;
  const pedRawMg = Number((pedWeightKg * pedDoseMgKg).toFixed(1));
  const pedCappedMg = Math.min(AMP_MG, pedRawMg);
  const pedCapHit = pedRawMg > AMP_MG;
  const pedStockMl = pedCappedMg / STOCK_MG_ML;
  const pedDiluted10Ml = pedCappedMg / DILUTED_10ML_MG_ML;
  const pedSyrupMl = pedCappedMg / SYRUP_MG_ML;

  const pedKubReference = (() => {
    if (pedAgeYears < 2) return 'KONTRENDİKE (<2 yaş bebek ve yenidoğanlarda kullanılmaz!)';
    if (pedAgeYears <= 5) return 'Avil® KÜB (2–5 yaş): 0,25–0,5 mL (5,7–11,4 mg) yavaş IV/IM';
    if (pedAgeYears <= 12) return 'Avil® KÜB (6–12 yaş): 0,5–1,0 mL (11,4–22,75 mg) yavaş IV/IM';
    return 'Avil® KÜB (>12 yaş / Adölesan): 1,0–2,0 mL (22,75–45,5 mg) yavaş IV/IM';
  })();

  // Yapılandırılmış Türkçe Klinik Order Özeti
  const buildCopySummary = (): string => {
    const activeOrder = (() => {
      if (activeTab === 'adult_allergy') {
        const routeText =
          adultRoute === 'iv_diluted_10ml'
            ? `8 mL SF ile 10 mL’ye tamamlayarak (${DILUTED_10ML_MG_ML} mg/mL → ${adultSingleDilutedMl.toFixed(1)} mL) en az 2 dakikada YAVAŞ IV`
            : adultRoute === 'iv_mini_50ml'
              ? `50–100 mL SF içinde 5–10 dakikada mini-infüzyon IV`
              : `Derin IM (${adultSingleStockMl.toFixed(1)} mL seyreltmesiz)`;
        return `• Aktif Order (Erişkin Akut Ürtiker / Anafilaksi Adjuvanı${isGeriatric ? ' · GERİATRİK >65 YAŞ DOZ AZALTILMIŞ' : ''}): ${adultSingleMg.toFixed(
          2
        )} mg (${adultSingleStockMl.toFixed(1)} mL = ${isGeriatric ? '0,5' : '1'} ampul Avil®) · Yol: ${routeText}. Günlük plan: ${adultDailyFreq}×/gün = ${adultDailyTotalMg.toFixed(
          1
        )} mg/gün (Erişkin maks 91 mg/gün = 2 ampul). [ANAFİLAKSİDE ÖNCE IM/IV ADRENALİN!]`;
      }
      if (activeTab === 'pediatric') {
        if (isPedContraindicated) {
          return `• AKTİF UYARI (Pediatrik · Yaş ${pedAgeYears} yıl): FENİRAMİN <2 YAŞ BEBEK VE YENİDOĞANLARDA KONTRENDİKEDİR! Paradoksal SSS eksitasyonu, konvülsiyon ve apne riski nedeniyle UYGULANMAZ.`;
        }
        return `• Aktif Order (Pediatrik · ${pedAgeYears} yaş, ${pedWeightKg} kg, ${pedDoseMgKg.toFixed(
          2
        )} mg/kg): ${pedCappedMg.toFixed(1)} mg IV/IM (= ${pedStockMl.toFixed(2)} mL stok; 1 ampul + 8 mL SF = 10 mL [4,55 mg/mL] dilüsyondan ${pedDiluted10Ml.toFixed(
          1
        )} mL ≥2 dk’da yavaş IV). ${pedKubReference}.`;
      }
      if (periOpScenario === 'neuraxial_opioid') {
        return `• Aktif Klinik Karar (Nöraksiyel Opioid / Morfin Kaşıntısı): Feniramin (Avil®) ÖNERİLMEZ! Nöraksiyel opioid kaşıntısı histamin değil µ-opioid reseptör aracılıdır; 1. seçenek Ondansetron 4–8 mg IV, düşük doz Nalokson (40–100 mcg IV veya 0,25–1 mcg/kg/sa) veya Nalbufin 2,5–5 mg IV’dir.`;
      }
      if (periOpScenario === 'vancomycin_infusion') {
        return `• Aktif Order (Vankomisin İnfüzyon Reaksiyonu): Vankomisin infüzyonunu durdur → Avil® 45,5 mg (1 ampul + 8 mL SF = 10 mL) ≥2 dk’da yavaş IV (+ gerekirse H2 bloker) → düzelince vankomisini ≥2 saate yayarak yeniden başlat.`;
      }
      return `• Aktif Order (Kontrast / Hafif Alerjik Transfüzyon Ürtikeri): Transfüzyonu/kontrastı durdur, anafilaksi bulgularını (hipotansiyon/bronkospazm) dışla → Avil® 45,5 mg (1 ampul + 8 mL SF = 10 mL’ye tamamlayıp ≥2 dk’da yavaş IV).`;
    })();

    return [
      `FENİRAMİN HİDROJEN MALEAT (Avil® 45,5 mg / 2 mL Ampul · 22,75 mg/mL) KLİNİK ORDER ÖZETİ`,
      `• ATC: R06AB05 · 1. Kuşak Alkilamin Sedatif H1-Antihistaminik (Güçlü Santral M1 Antikolinerjik)`,
      activeOrder,
      `• KRİTİK GÜVENLİK: ANAFİLAKSİDE 1. BASAMAK DEĞİLDİR (Tek hayat kurtarıcı ADRENALİN)! HIZLI IV PUŞE YASAĞI (≥1–2 dk yavaş IV). <2 yaş bebeklerde KONTRENDİKE. Geriatride (AGS Beers 2023) yüksek deliryum/üriner retansiyon riski!`,
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
          { id: 'sec-ozet', label: 'Özet' },
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-pkpd', label: 'Farmakokinetik' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-dozlar', label: 'Endikasyon & Dozaj' },
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
      {/* 2. ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (VARSAYILAN KAPALI)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="sec-guvenlik"
        defaultOpen={false}
        tallManName="PHENiramine"
        confusionRiskWith="PHENylephrine · chlorPHENiramine · DIPHENhydramine"
        criticalAlerts={[
          'ANAFİLAKSİDE ASLA 1. BASAMAK DEĞİLDİR (WAO 2020 / EAACI 2021 / RCUK 2021): Anafilakside tek 1. basamak hayat kurtarıcı ADRENALİN’dir (0,5 mg IM uyluk anterolateral veya titre IV). Feniramin şoku, hipotansiyonu, bronkospazmı veya laringeal ödemi DÜZELTMEZ! Yalnızca havayolu ve hemodinami güvenceye alındıktan sonra ürtiker/kaşıntı için 2.–3. basamak adjuvandır; Adrenalini saniye dahi GECİKTİRMEMELİDİR!',
          'HIZLI IV PUŞE YASAĞI: Avil® 45,5 mg (2 mL) ampul en az 1–2 dakikada yavaş IV (tercihen + 8 mL %0,9 NaCl ile 10 mL’ye tamamlanarak = 4,55 mg/mL) veya derin IM uygulanmalıdır. Hızlı IV puşe geçici hipotansiyon, baş dönmesi, santral eksitasyon, konvülsiyon veya kardiyak aritmi/QT uzaması tetikleyebilir!',
          'PEDİATRİK YAŞ SINIRI (<1–2 YAŞ KONTRENDİKE): Yenidoğanlarda, prematürelerde ve <1–2 yaş bebeklerde paradoksal SSS eksitasyonu, konvülsiyon, apne ve solunum depresyonu riski nedeniyle KONTRENDİKEDİR.',
          'GERİATRİ & AGS BEERS 2023 YÜKSEK RİSKLİ ANTİKOLİNERJİK: Yaşlı (>65 yaş) hastalarda güçlü santral M1 blokajıyla postoperatif deliryum, akut üriner retansiyon (BPH), dar açılı glokom krizi, ileus ve düşme riskini belirgin artırır — perioperatif dönemde mümkünse 2. kuşak non-sedatif ajanlara yönelin.',
        ]}
        antidoteOrRescue="Aşırı Doz / Antikolinerjik Toksidrom (Deliryum, halüsinasyon, midriyazis, sıcak/kuru cilt, taşikardi, hipertermi, idrar retansiyonu, nöbet, QRS/QT genişlemesi): 1) Spesifik rutin antidot yoktur; havayolu, IV sıvı ve sürekli EKG monitörizasyonu esastır. 2) Ajitasyon ve konvülsiyonlarda ilk seçenek IV Benzodiazepin (Midazolam / Diazepam). 3) QRS >100 ms (Na⁺ kanal blokajı) varsa IV Sodyum Bikarbonat (1–2 mEq/kg bolus). 4) Yaşamı tehdit eden saf santral antikolinerjik deliryumda (yalnızca EKG’de QRS <100 ms ve PR/QT normal şartıyla, toksikoloji eşliğinde) yavaş IV Fizostigmin (0,5–2 mg, 5 dk’da; atropin hazırda!) değerlendirilebilir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KİMLİK, KLİNİK ÖZET (#sec-ozet) & ETKİ MEKANİZMASI (#sec-etki)   */}
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
                1. Kuşak Alkilamin · Sedatif H1-Antihistaminik
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Anafilakside 1. Basamak DEĞİL · Hızlı Puşe YASAK
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Avil® 45,5 mg / 2 mL Ampul (22,75 mg/mL)
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: R06AB05</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Feniramin Hidrojen Maleat (Avil®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Klinik Kimlik &amp; Rol:</strong>{' '}
              Türkiye ameliyathane, acil servis ve yoğun bakım pratiğinde en sık bulunan parenteral 1. kuşak alkilamin
              türevi H₁-reseptör ters agonistidir. Akut ürtiker, anjiyoödem, alerjik rinit/konjonktivit, hafif-orta
              alerjik transfüzyon veya kontrast madde reaksiyonları ve vankomisin infüzyon reaksiyonunun semptomatik
              tedavisinde kullanılır. <strong>Anafilakside asla 1. basamak değildir</strong> (yalnızca Adrenalin sonrası
              cilt bulguları için adjuvan); yüksek kan-beyin bariyeri geçişi ve güçlü santral muskarinik (M₁) blokajı
              nedeniyle <strong>sedasyon, antikolinerjik deliryum</strong> ve &lt;2 yaşta paradoksal toksisite riski taşır.
            </p>
          </div>

          <div className="shrink-0">
            <MonographCopyButton
              isDark={isDark}
              label="Klinik Order Kopyala"
              getText={buildCopySummary}
            />
          </div>
        </div>
      </section>

      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="sec-etki"
        sectionTitle="Etki Mekanizması & Moleküler Farmakodinamik (Yatak Başı Özet)"
        summary="Feniramin, periferik ve santral histamin H₁ reseptörlerini (Gq-bağlı GPCR) inaktif konformasyonda stabilize eden yarışmalı bir ters agonisttir (inverse agonist). Ek olarak yüksek lipofilisitesi sayesinde kan-beyin bariyerini kolayca aşarak santral H₁ ve muskarinik M₁ asetilkolin reseptörlerini bloke eder."
        pillars={[
          {
            title: '1. Periferik H₁ Ters Agonizması (Ürtiker & Ödem ↓)',
            detail:
              'Vasküler endotel ve duyusal sinir uçlarındaki H₁ reseptörlerini bloke ederek histamin aracılı kapiller geçirgenlik artışını, kızarıklığı (flare), ödemi (wheal) ve histaminerjik kaşıntıyı azaltır.',
          },
          {
            title: '2. Santral H₁ Blokajı (Sedasyon & Kognitif Yavaşlama)',
            detail:
              'P-glikoprotein dışa atım substratı olmadığından beyne hızla geçer; tuberomammiller çekirdekten kaynaklanan uyanıklık histaminerjik yolaklarını baskılayarak belirgin uyku hali ve psikomotor yavaşlama oluşturur.',
          },
          {
            title: '3. Güçlü Antikolinerjik (M₁–M₃) & Zayıf Na⁺/hERG Etkisi',
            detail:
              'Santral ve periferik muskarinik blokajla ağız kuruluğu, idrar retansiyonu, midriyazis, taşikardi ve yaşlılarda postoperatif deliryuma yol açar; aşırı dozda nöbet ve kardiyak iletim gecikmesi (QRS/QT ↑) yapar.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) AKORDİYONU (#sec-pkpd, VARSAYILAN KAPALI)  */}
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
                  IV Onset: 5–15 dk · Etki Süresi: 6–12 sa · Terminal t½: ~16–19 sa
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Yüksek KBB geçişi, hepatik N-demetilasyon (CYP2D6), uzun terminal yarı ömür ve idrarla değişmeden + metabolit atılımı.
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
                  Etki Başlangıcı (IV / IM / PO)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  5–15 dk · 15–30 dk · 1–2 sa
                </span>
                <span className="text-[10px] text-slate-400">Klinik etki süresi: 6–12 saat</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Dağılım &amp; KBB Geçişi
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  Lipofilik · Yüksek KBB
                </span>
                <span className="text-[10px] text-slate-400">Vd ~2–3 L/kg · Güçlü santral geçiş</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Metabolizma
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  Hepatik (N-demetilasyon)
                </span>
                <span className="text-[10px] text-slate-400">CYP2D6 substratı &amp; zayıf inhibitörü</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Terminal t½ &amp; Atılım
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  ~16–19 saat (IV)
                </span>
                <span className="text-[10px] text-slate-400">%70–80 renal (değişmeden + metabolit)</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">• Emilim &amp; Parenteral Zamanlama:</strong>{' '}
                Yavaş IV uygulama sonrası antihistaminik etki <strong>5–15 dakikada</strong> başlar; derin IM uygulamada
                pik etki 15–30 dakikada, oral uygulamada ise 1–2,5 saatte oluşur. Klinik semptom kontrolü tipik olarak{' '}
                <strong>6–12 saat</strong> sürer.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">• Dağılım &amp; Santral Sedasyon Süresi:</strong>{' '}
                Yüksek yağda çözünürlüğü nedeniyle santral sinir sistemine hızla geçer. Terminal eliminasyon yarı ömrü
                (<strong>~16–19 saat</strong>) klinik kaşıntı baskılanma süresinden uzun olduğu için, özellikle akşam
                veya tekrarlayan dozlarda ertesi güne sarkan rezidüel sedasyon, kognitif bozulma ve sürüş performansı
                kaybı ("hangover" etkisi) oluşturur!
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">• Hepatik Metabolizma &amp; Renal Eliminasyon:</strong>{' '}
                Karaciğerde N-demetilasyonla N-desmetilfeniramin ve didesmetilfeniramin metabolitlerine dönüştürülür;
                dozun yaklaşık <strong>%70–80&apos;i</strong> hem değişmemiş ilaç hem de metabolitler halinde idrarla
                atılır (asidik idrarda atılım hızlanır).
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. KONTRENDİKASYONLAR — ENDİKASYONLARDAN ÖNCE (#sec-kontrendikasyon) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Yenidoğanlar, Prematüreler ve <1–2 Yaş Bebekler (KESİN KONTRENDİKASYON): Paradoksal santral sinir sistemi eksitasyonu, konvülsiyon, apne, solunum depresyonu ve ani ölüm riski nedeniyle kullanılmaz!',
          'Dar Açılı (Akut Açı Kapanması) Glokom: Antikolinerjik midriyazis ile iridokorneal açıyı tıkayarak göz içi basıncını akut yükseltir ve kalıcı görme kaybına yol açar.',
          'Semptomatik Prostat Hipertrofisi (BPH) / Mesane Boynu Obstrüksiyonu (Rezidüel İdrarlı): Detrüsör gevşemesi ve sfinkter tonusu artışıyla akut ağrılı idrar retansiyonu tetikler.',
          'Monoamin Oksidaz (MAO) İnhibitörü Kullanımı (Son 14 Gün İçinde): Ağır antikolinerjik kriz, hipertansif/serotonerjik etkileşim ve derin SSS toksisitesi riski.',
          'Feniramin veya diğer alkilamin türevi antihistaminiklere (klorfeniramin, deksbromfeniramin) karşı bilinen aşırı duyarlılık.',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Yüksek Riskli Durumlar"
        relativeItems={[
          'Geriatrik Hastalar (>65 Yaş · AGS Beers 2023 "Kaçının"): Güçlü santral antikolinerjik yük nedeniyle postoperatif deliryum, ajitasyon, düşme ve bilişsel gerileme riski çok yüksektir.',
          'Ağır Astım Atağı / KOAH & Koyu Bronş Sekresyonu: Antikolinerjik etkiyle bronşiyal sekresyonları kurutup mukus tıkacı oluşturabilir.',
          'Epilepsi / Nöbet Eşiği Düşük Hastalar & Uzamış QT Sendromu: Özellikle hızlı IV uygulama veya yüksek dozlarda nöbet eşiğini düşürebilir ve kardiyak iletimi bozabilir.',
          'Piloroduodenal Obstrüksiyon, Paralitik İleus, Miyastenia Gravis, Gebelik (özellikle 1. ve 3. trimester) & Emzirme.',
        ]}
        clinicalNote="Anafilakside tek başına Feniramin verilip Adrenalinin geciktirilmesi tıbbi malpraktis düzeyinde kritik bir hatadır! Önce Adrenalin + O2 + IV kristaloid, ancak stabilizasyon sonrası cilt bulguları için Feniramin değerlendirilir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ (#sec-dozlar)               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozlar"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Klinik Endikasyonlar &amp; Doz Rejimleri (WAO 2020 · EAACI 2021 · Avil® KÜB)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">1 Ampul = 45,5 mg / 2 mL · Yavaş IV (≥1–2 dk)</span>
        </div>

        {/* Anafilaksi Kırmızı Banner */}
        <div
          className={`mb-4 p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
            isDark
              ? 'border-rose-500/50 bg-rose-950/30 text-rose-100'
              : 'border-rose-300 bg-rose-50 text-rose-950'
          }`}
        >
          <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-rose-700 dark:text-rose-300">
              ALTIN KURAL — ANAFİLAKSİDE 1. BASAMAK TEDAVİ ADRENALİN&apos;DİR!
            </strong>{' '}
            WAO (2020), EAACI (2021) ve RCUK (2021) kılavuzlarına göre H₁ antihistaminikler (Avil®) anafilaktik şoku,
            hipotansiyonu, bronkospazmı veya üst havayolu ödemini <strong>GERİ ÇEVİRMEZ</strong>. Yalnızca Adrenalin
            ve hemodinamik/havayolu resüsitasyonu sonrası devam eden ürtiker/kaşıntı için 2.–3. basamak adjuvandır.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Akut Ürtiker / Anjiyoödem / Anafilaksi Adjuvanı */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-teal-500 shrink-0" />
                <span>1. Erişkin Akut Ürtiker / Pruritus / Anafilaksi Adjuvanı</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                45,5 mg (1 Ampul)
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="font-mono text-slate-900 dark:text-white">45,5 mg (2 mL = 1 ampul)</strong> tercihen{' '}
              <strong>10 mL %0,9 NaCl ile seyreltilerek</strong> en az <strong>1–2 dakikada yavaş IV</strong> (veya
              derin IM). Gerekirse 8–12 saat sonra 1 ampul daha tekrarlanabilir;{' '}
              <strong>günlük maksimum 91 mg (2 ampul)</strong>.
            </p>
          </div>

          {/* 2. Kontrast Madde, Transfüzyon & Vankomisin Reaksiyonu */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>2. Kontrast, Hafif Transfüzyon &amp; Vankomisin Reaksiyonu</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                45,5 mg Yavaş IV
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Histamin salınımına bağlı izole ürtiker/flushing (vankomisin infüzyon reaksiyonu, hafif alerjik transfüzyon
              veya iyotlu kontrast ürtikeri) tedavisinde <strong className="font-mono">45,5 mg yavaş IV</strong>{' '}
              etkilidir. <strong>Tuzak:</strong> Nöraksiyel morfin kaşıntısı histamin değil µ-opioid aracılıdır;
              ondansetron/nalokson daha etkilidir!
            </p>
          </div>

          {/* 3. Pediatrik Dozaj (≥2 Yaş) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-amber-500 shrink-0" />
                <span>3. Pediatrik Dozaj (Sadece ≥2 Yaş!)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                0,5–1 mg/kg · &lt;2 Yaş YASAK
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>≥2 yaş:</strong> <strong className="font-mono">0,5–1 mg/kg/doz</strong> (maks tek doz 45,5 mg)
              yavaş IV (10 mL SF dilüsyonla hassas ölçüm) veya IM. Avil® KÜB yaş referansı: 2–5 yaş 0,25–0,5 mL; 6–12
              yaş 0,5–1,0 mL. <strong className="text-rose-600 dark:text-rose-400">&lt;1–2 yaşta KONTRENDİKE!</strong>
            </p>
          </div>

          {/* 4. Oral İdame & Ayaktan Tedavi */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-sky-500 shrink-0" />
                <span>4. Oral Formlar &amp; 2. Kuşak Alternatiflere Geçiş</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-500/20 text-sky-700 dark:text-sky-300 shrink-0">
                22,7 mg Tb · 15 mg/5 mL
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Erişkin oral: <strong>22,7 mg tablet</strong> günde 2–3 kez (tercihen akşam). Ancak ayaktan/subakut
              ürtikerde güncel kılavuzlar (EAACI/GA²LEN) sedasyon ve antikolinerjik yük nedeniyle 1. kuşak feniramin
              yerine <strong>2. kuşak non-sedatif H₁ blokerleri</strong> (setirizin, loratadin, feksofenadin, bilastin)
              önceliklendirir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. ETKİLEŞİMLİ DOZ, SEYRELTME & GÜVENLİK HESAPLAYICI (#sec-hesaplayici) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-5 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Etkileşimli Feniramin (Avil®) Doz, Seyreltme &amp; Klinik Karar Hesaplayıcı
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Avil® Ampul: <span className="font-mono font-semibold">45,5 mg / 2 mL (22,75 mg/mL)</span> · 10 mL SF dilüsyon ={' '}
              <span className="font-mono font-semibold">4,55 mg/mL</span> · Yavaş IV ≥1–2 dk
            </p>
          </div>
          <MonographCopyButton
            isDark={isDark}
            label="Order Özeti Kopyala"
            getText={buildCopySummary}
          />
        </div>

        {/* Çoklu Sekme Barı */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(
            [
              { id: 'adult_allergy', label: '1. Erişkin Ürtiker / Anafilaksi Adjuvanı', badge: '45,5 mg · Maks 91 mg/gün' },
              { id: 'pediatric', label: '2. Pediatrik Dozaj (≥2 Yaş)', badge: '0,5–1 mg/kg · <2 Yaş YASAK' },
              { id: 'perioperative_pruritus', label: '3. Perioperatif Kaşıntı / Kontrast', badge: 'Opioid vs Histamin Ayrımı' },
            ] as const
          ).map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? isDark
                      ? 'border-teal-500 bg-teal-950/40 text-white'
                      : 'border-teal-500 bg-teal-50 text-teal-950 shadow-xs'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="block text-[10px] font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
                  {tab.badge}
                </span>
                <span className="block text-xs sm:text-sm font-bold mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Ortak Erişkin Ağırlık & Obezite Skaler Bloğu */}
        <div className="space-y-3">
          {activeTab !== 'pediatric' && (
            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label htmlFor={weightSliderId} className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Hasta Ağırlığı (kg) — Erişkinde standart sabit ampul dozu (45,5 mg) kullanılır; obezlerde ek doz artışı YAPILMAZ
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={weightInputId}
                    type="number"
                    min={35}
                    max={180}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.min(180, Math.max(35, Number(e.target.value) || 70)))}
                    className={`w-20 px-2.5 py-1 rounded-lg border font-mono font-bold text-sm text-right ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs font-mono font-semibold text-slate-500">kg</span>
                </div>
              </div>
              <input
                id={weightSliderId}
                type="range"
                min={35}
                max={180}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>
          )}

          <ObesityDosingScaler
            isDark={isDark}
            drugName="Feniramin (Avil®)"
            recommendedScalar="IBW"
            secondaryScalar={{ type: 'LBW', context: 'Ağır Obezite / OSA' }}
            rationale="Feniramin lipofilik bir 1. kuşak antihistaminiktir; ancak obez hastalarda (özellikle obstrüktif uyku apnesi [OSA] varsa) yüksek doz verilmesi solunum depresyonunu, üst havayolu obstrüksiyonunu ve uzamış sedasyonu ağırlaştırır. Erişkinde sabit 45,5 mg (1 ampul) tavanı ASLA aşılmamalı, pediatrik/kg-bazlı hesaplamada IBW/LBW kullanılmalıdır."
            currentWeightKg={activeTab === 'pediatric' ? pedWeightKg : weightKg}
            onApplyWeight={(w) => {
              if (activeTab === 'pediatric') {
                setPedWeightKg(Math.min(80, Math.max(8, Math.round(w))));
              } else {
                setWeightKg(Math.min(180, Math.max(35, Math.round(w))));
              }
            }}
          />
        </div>

        {/* TAB 1: ERİŞKİN AKUT ÜRTİKER / ANAFİLAKSİ ADJUVANI */}
        {activeTab === 'adult_allergy' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="space-y-2">
                <span className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                  Uygulama Yolu &amp; Seyreltme Seçimi (Hızlı IV Puşe Yasaktır!)
                </span>
                {(
                  [
                    {
                      id: 'iv_diluted_10ml',
                      title: '10 mL SF ile Seyreltilmiş Yavaş IV (Önerilen)',
                      desc: '1 ampul (2 mL) + 8 mL %0,9 NaCl = 10 mL (4,55 mg/mL) → en az 2 dakikada yavaş IV',
                    },
                    {
                      id: 'iv_mini_50ml',
                      title: '50–100 mL SF Mini-İnfüzyon (5–10 dk)',
                      desc: 'Yaşlı, hipotansif eğilimli veya konfor odaklı vakalarda en düşük hipotansiyon/irritasyon riski',
                    },
                    {
                      id: 'im_deep',
                      title: 'Derin İntramüsküler (IM — Seyreltmesiz)',
                      desc: 'Damar yolu yoksa 2 mL (45,5 mg) derin gluteal/vastus lateralis IM (etki 15–30 dk)',
                    },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAdultRoute(opt.id)}
                    className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      adultRoute === opt.id
                        ? 'border-teal-500 bg-teal-500/15'
                        : isDark
                          ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{opt.title}</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAdultDailyFreq(1)}
                  className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                    adultDailyFreq === 1
                      ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Tek Doz (1×/gün)
                </button>
                <button
                  type="button"
                  onClick={() => setAdultDailyFreq(2)}
                  className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                    adultDailyFreq === 2
                      ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Tekrarlı q8–12sa (Maks 2×/gün)
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsGeriatric((v) => !v)}
                className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer ${
                  isGeriatric
                    ? 'border-amber-500 bg-amber-500/15 text-amber-800 dark:text-amber-200'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                      : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <span>Geriatrik / Kırılgan Hasta Modu (&gt;65 Yaş · AGS Beers 2023)</span>
                <span className="font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                  {isGeriatric ? 'AKTİF (%50 Doz)' : 'Kapalı'}
                </span>
              </button>
            </div>

            {/* Sağ Çıktılar */}
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                  isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                }`}
              >
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Tek Uygulama Dozu</span>
                  <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                    {adultSingleMg.toFixed(2)} mg
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    {adultSingleStockMl.toFixed(1)} mL stok ({isGeriatric ? '0,5' : '1'} ampul Avil®)
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    ≈ {(adultSingleMg / weightKg).toFixed(2)} mg/kg ({weightKg} kg)
                  </span>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Günlük Toplam / Tavan</span>
                  <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                    {adultDailyTotalMg.toFixed(1)} mg
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    Erişkin Maks: 91 mg/gün (2 ampul)
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {adultDailyCapExceeded ? 'Tavan aşıldı!' : 'Güvenli günlük sınır içinde'}
                  </span>
                </div>

                <div className={`p-3 rounded-xl border col-span-2 text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-teal-100 text-slate-700'}`}>
                  <strong>Yatak Başı Uygulama Talimatı:</strong>{' '}
                  {adultRoute === 'iv_diluted_10ml'
                    ? `1 ampul Avil® (2 mL = 45,5 mg) + 8 mL %0,9 NaCl = 10 mL (4,55 mg/mL) hazırlayın. Bu çözeltiden ${adultSingleDilutedMl.toFixed(
                        1
                      )} mL’yi en az 2 dakikada yavaş IV uygulayın (maks hız ≤22,75 mg/dk).`
                    : adultRoute === 'iv_mini_50ml'
                      ? `${adultSingleStockMl.toFixed(1)} mL Avil® (${adultSingleMg.toFixed(
                          2
                        )} mg) 50–100 mL %0,9 NaCl içine ekleyip 5–10 dakikada IV infüze edin.`
                      : `${adultSingleStockMl.toFixed(1)} mL (${adultSingleMg.toFixed(
                          2
                        )} mg) seyreltmeden derin IM (gluteal/vastus lateralis) uygulayın.`}
                </div>
              </div>

              {isGeriatric && (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark
                      ? 'border-amber-500/50 bg-amber-950/30 text-amber-200'
                      : 'border-amber-300 bg-amber-50 text-amber-900'
                  }`}
                >
                  <strong>AGS Beers 2023 Geriatri Uyarısı:</strong> &gt;65 yaş hastalarda 1. kuşak antihistaminikler
                  yüksek deliryum, akut idrar retansiyonu ve düşme riski nedeniyle <strong>kaçınılması gereken</strong>{' '}
                  ilaçlardır. Kesin zorunluysa yarım ampul (22,75 mg) yavaş infüzyon tercih edilmeli veya 2. kuşak
                  non-sedatif oral ajanlara (setirizin/loratadin) geçilmelidir.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PEDİATRİK DOZAJ */}
        {activeTab === 'pediatric' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Yaş Girişi */}
              <div
                className={`p-4 rounded-xl border ${
                  isPedContraindicated
                    ? isDark
                      ? 'border-rose-500/70 bg-rose-950/35'
                      : 'border-rose-400 bg-rose-50'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60'
                      : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label htmlFor={pedAgeSliderId} className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Çocuk Yaşı (Yıl) — &lt;2 Yaş KESİN KONTRENDİKE!
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={pedAgeInputId}
                      type="number"
                      min={0.5}
                      max={17}
                      step={0.5}
                      value={pedAgeYears}
                      onChange={(e) => setPedAgeYears(Math.min(17, Math.max(0.5, Number(e.target.value) || 0.5)))}
                      className={`w-16 px-2 py-1 rounded-lg border font-mono font-bold text-xs text-right ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">yaş</span>
                  </div>
                </div>
                <input
                  id={pedAgeSliderId}
                  type="range"
                  min={0.5}
                  max={17}
                  step={0.5}
                  value={pedAgeYears}
                  onChange={(e) => setPedAgeYears(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span className="text-rose-500 font-bold">0,5–1,5 yaş (YASAK)</span>
                  <span>2 yaş (Alt Sınır)</span>
                  <span>12 yaş</span>
                  <span>17 yaş</span>
                </div>
              </div>

              {/* Pediatrik Ağırlık & mg/kg */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor={pedWeightSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                      Çocuk Ağırlığı (kg)
                    </label>
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{pedWeightKg} kg</span>
                  </div>
                  <input
                    id={pedWeightSliderId}
                    type="range"
                    min={5}
                    max={70}
                    step={1}
                    value={pedWeightKg}
                    onChange={(e) => setPedWeightKg(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <label htmlFor={pedDoseSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                      Hedef Doz (0,5 – 1,0 mg/kg/doz · Maks 45,5 mg)
                    </label>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {pedDoseMgKg.toFixed(2)} mg/kg
                    </span>
                  </div>
                  <input
                    id={pedDoseSliderId}
                    type="range"
                    min={0.5}
                    max={1.0}
                    step={0.1}
                    value={pedDoseMgKg}
                    onChange={(e) => setPedDoseMgKg(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Sağ Çıktılar (Yaş <2 KIRMIZI KONTRENDİKASYON KİLİDİ!) */}
            <div className="space-y-3">
              {isPedContraindicated ? (
                <div
                  className={`p-5 rounded-xl border-2 space-y-2.5 ${
                    isDark
                      ? 'border-rose-500 bg-rose-950/50 text-rose-100'
                      : 'border-rose-500 bg-rose-50 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-300 font-black text-sm sm:text-base">
                    <AlertOctagon className="w-6 h-6 shrink-0" />
                    <span>KESİN KONTRENDİKASYON: YAŞ &lt; 2 YIL ({pedAgeYears} YAŞ)!</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Feniramin (Avil®) yenidoğanlarda ve <strong>&lt;1–2 yaş bebeklerde KONTRENDİKEDİR!</strong> Bu yaş
                    grubunda 1. kuşak sedatif antihistaminikler <strong>paradoksal SSS eksitasyonu, konvülsiyon, apne,
                    solunum depresyonu ve ölümcül toksisite</strong> riski taşır.
                  </p>
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-200">
                    → Anafilakside 1. basamak: IM Adrenalin (0,01 mg/kg = 0,01 mL/kg 1:1000). Hafif ürtikerde çocuk
                    alerji/pediatri rehberine göre yaşa onaylı 2. kuşak oral antihistaminik (ör. ≥6 ay setirizin)
                    değerlendirilir.
                  </p>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-amber-950/15 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Hesaplanan Pediatrik Doz</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {pedCappedMg.toFixed(1)} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Stok (22,75 mg/mL): {pedStockMl.toFixed(2)} mL
                    </span>
                    {pedCapHit && (
                      <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                        45,5 mg erişkin tavanına sınırlandı!
                      </span>
                    )}
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Güvenli 10 mL SF Dilüsyonu</span>
                    <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                      {pedDiluted10Ml.toFixed(1)} mL
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      (1 amp + 8 mL SF = 4,55 mg/mL)
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Oral Şurup (15 mg/5 mL): {pedSyrupMl.toFixed(1)} mL
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border col-span-2 text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-amber-100 text-slate-700'}`}>
                    <strong>{pedKubReference}</strong>. Küçük hacimli direkt ampul çekiminde 10 kat doz hatasını
                    önlemek için 1 ampul (2 mL) + 8 mL SF ile <strong>4,55 mg/mL</strong> hazırlayıp{' '}
                    <strong>{pedDiluted10Ml.toFixed(1)} mL</strong>&apos;yi en az <strong>2 dakikada yavaş IV</strong>{' '}
                    uygulayın.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: PERİOPERATİF KAŞINTI / KONTRAST & TRANSFÜZYON REAKSİYONU */}
        {activeTab === 'perioperative_pruritus' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              {(
                [
                  {
                    id: 'contrast_transfusion',
                    title: 'Kontrast Madde veya Hafif Alerjik Transfüzyon Ürtikeri',
                    badge: 'Histamin Aracılı · Avil® Uygun',
                  },
                  {
                    id: 'neuraxial_opioid',
                    title: 'Nöraksiyel Opioid (Spinal / Epidural Morfin) Kaşıntısı',
                    badge: 'µ-Opioid Aracılı · Avil® ETKİSİZ!',
                  },
                  {
                    id: 'vancomycin_infusion',
                    title: 'Vankomisin İnfüzyon Reaksiyonu (Mast Hücre Degranülasyonu)',
                    badge: 'Hız Bağımlı Histamin · Avil® Uygun',
                  },
                ] as const
              ).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setPeriOpScenario(sc.id)}
                  className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    periOpScenario === sc.id
                      ? sc.id === 'neuraxial_opioid'
                        ? 'border-rose-500 bg-rose-500/15'
                        : 'border-teal-500 bg-teal-500/15'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{sc.title}</span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        sc.id === 'neuraxial_opioid'
                          ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                          : 'bg-teal-500/20 text-teal-700 dark:text-teal-300'
                      }`}
                    >
                      {sc.badge}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div>
              {periOpScenario === 'neuraxial_opioid' && (
                <div
                  className={`p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm leading-relaxed ${
                    isDark
                      ? 'border-rose-500/50 bg-rose-950/30 text-rose-100'
                      : 'border-rose-300 bg-rose-50 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <span>KLİNİK TUZAK: Nöraksiyel Morfin Kaşıntısında Avil® 1. Seçenek DEĞİLDİR!</span>
                  </div>
                  <p>
                    Spinal veya epidural morfin/fentanil sonrası gelişen yüz/burun/gövde kaşıntısı periferik histamin
                    salınımından değil, medulla spinalis arka boynuz ve trigeminal çekirdekteki{' '}
                    <strong>santral µ-opioid reseptör</strong> aktivasyonundan kaynaklanır.
                  </p>
                  <p>
                    Feniramin (Avil®) bu mekanizmayı düzeltmez; yalnızca hastayı sedatize ederek kaşıntı algısını
                    maskeler ve opioidlerle birlikte <strong>solunum depresyonunu / deliryumu artırır!</strong>
                  </p>
                  <div className={`p-3 rounded-lg border font-medium ${isDark ? 'bg-slate-900/70 border-slate-700 text-teal-300' : 'bg-white border-rose-200 text-teal-800'}`}>
                    <strong>Kanıta Dayalı Doğru Tedavi:</strong> 1) Ondansetron 4–8 mg IV (5-HT₃ antagonisti), 2) Düşük
                    doz Nalokson (40–100 mcg IV bolus veya 0,25–1 mcg/kg/sa infüzyon — analjeziyi bozmadan!), 3) Nalbufin
                    2,5–5 mg IV (κ-agonist / µ-antagonist).
                  </div>
                </div>
              )}

              {periOpScenario === 'contrast_transfusion' && (
                <div
                  className={`p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm leading-relaxed ${
                    isDark
                      ? 'border-teal-500/40 bg-teal-950/20 text-slate-200'
                      : 'border-teal-200 bg-teal-50/70 text-slate-800'
                  }`}
                >
                  <div className="font-bold text-teal-700 dark:text-teal-300">
                    Hafif Alerjik Transfüzyon / Kontrast Ürtikeri Yönetimi
                  </div>
                  <p>
                    <strong>1. Adım:</strong> İnfüzyonu/transfüzyonu durdurun; ateş, rigor, hipotansiyon, wheezing veya
                    havayolu ödemini dışlayın (bunlar varsa derhal <strong>Adrenalin + Hemolitik/TRALI/Anafilaksi protokolü!</strong>).
                  </p>
                  <p>
                    <strong>2. Adım (İzole Ürtiker / Kaşıntı):</strong>{' '}
                    <strong className="font-mono">Avil® 45,5 mg (1 ampul = 2 mL)</strong> + 8 mL SF (10 mL, 4,55 mg/mL)
                    → en az <strong>2 dakikada yavaş IV</strong>. Semptomlar 30 dk içinde tamamen düzelirse ve vital
                    bulgular normalse transfüzyon hekim kararıyla yavaşça sürdürülebilir.
                  </p>
                </div>
              )}

              {periOpScenario === 'vancomycin_infusion' && (
                <div
                  className={`p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm leading-relaxed ${
                    isDark
                      ? 'border-indigo-500/40 bg-indigo-950/20 text-slate-200'
                      : 'border-indigo-200 bg-indigo-50/70 text-slate-800'
                  }`}
                >
                  <div className="font-bold text-indigo-700 dark:text-indigo-300">
                    Vankomisin İnfüzyon Reaksiyonu (IgE-Bağımsız Mast Hücre Degranülasyonu)
                  </div>
                  <p>
                    <strong>1. Adım:</strong> Vankomisin infüzyonunu derhal duraklatın (gerçek IgE anafilaksisi değil,
                    hız-bağımlı MRGPRX2 aracılı histamin salınımıdır).
                  </p>
                  <p>
                    <strong>2. Adım:</strong> <strong className="font-mono">Avil® 45,5 mg (1 ampul)</strong> 10 mL SF ile
                    ≥2 dk&apos;da yavaş IV (ağır flushing/hipotansiyonda IV sıvı + H₂ bloker [Famotidin 20 mg IV]
                    ekleyin). Kızarıklık ve kaşıntı gerileyince vankomisini daha seyreltik ve{' '}
                    <strong>≥2 saate (≤10 mg/dk)</strong> yayarak yeniden başlatın.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (#sec-tr-preparat)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Avil® 45,5 mg / 2 mL IV / IM Enjeksiyonluk Çözelti (Ampul)',
            presentation: 'Berrak, renksiz 2 mL cam ampul (kutu: 5 ampul) — Türkiye’de en yaygın parenteral H1 antihistaminik',
            concentration: '22,75 mg/mL — 1 Ampul = 45,5 mg',
            saltOrBaseNote:
              '45,5 mg feniramin hidrojen maleat tuzu içerir (≈ 30,6 mg serbest feniramin bazına eşdeğer). En az 1–2 dakikada yavaş IV (tercihen 10 mL SF ile seyrelterek) veya derin IM uygulanır.',
            alertLevel: 'high',
          },
          {
            name: 'Avil® 22,7 mg Tablet (Oral)',
            presentation: 'Oral tablet (kutu: 20 tablet)',
            concentration: '22,7 mg / tablet (yarım ampul eşdeğeri)',
            saltOrBaseNote:
              'Erişkinlerde günde 2–3 kez 1 tablet (sedasyon nedeniyle araç/makine kullanımı yasaklanır; gündüz kullanımında 2. kuşak ajanlar tercih edilir).',
            alertLevel: 'standard',
          },
          {
            name: 'Avil® 15 mg / 5 mL Şurup (Oral)',
            presentation: '100 mL cam şişe oral şurup',
            concentration: '3 mg/mL (1 ölçek = 5 mL = 15 mg)',
            saltOrBaseNote:
              '<2 yaş bebeklerde KONTRENDİKE! Pediatrik oral kullanımda kaşık/enjektör ölçümü çift kontrol edilmelidir.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Önerilen Erişkin & Pediatrik Yavaş IV Dilüsyonu (4,55 mg/mL): 1 ampul Avil® (2 mL = 45,5 mg) + 8 mL %0,9 NaCl = 10 mL toplam hacim → Erişkin tam doz 10 mL’yi ≥2 dakikada yavaş IV; pediatride (≥2 yaş) hesaplanan mL hassas olarak çekilir.',
          'Mini-İnfüzyon (Yaşlı / Hassas Hemodinami): 1 ampul (veya yaşlıda 0,5 ampul = 22,75 mg) + 50–100 mL %0,9 NaCl → 5–10 dakikada IV infüzyon.',
          'Derin IM Uygulama: Seyreltilmeden 2 mL (45,5 mg) derin gluteal veya vastus lateralis kasına uygulanır (subkutan enjeksiyon lokal irritasyon nedeniyle önerilmez).',
        ]}
        concentrationTrapWarning="Ses & İsim Benzerliği (LASA) + Hızlı Puşe Tuzağı: 'PHENiramine' ile vazopresör 'PHENylephrine' (fenilefrin) karışması ciddi hipertansif krize yol açar! Ayrıca Avil® ampul 2 mL küçük hacimde olduğu için tek saniyede hızlı IV puşe edilmeye çok müsaittir — hızlı puşe geçici hipotansiyon, baş dönmesi, santral eksitasyon ve nöbet tetikler; daima 10 mL SF ile seyreltip ≥2 dakikada uygulayın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="Periferik veya santral venöz yoldan yavaş IV (≥1–2 dk, tercihen 10 mL SF ile seyreltilerek) veya derin IM uygulanabilir. Subkutan veya intra-arteriyel enjeksiyon YAPILMAZ! Aynı enjektörde başka ilaçlarla karıştırılmamalı, uygulama öncesi ve sonrası hat SF ile yıkanmalıdır."
        phRange="4,5 – 5,5 (Hafif Asidik Maleat Tuzu Çözeltisi)"
        osmolalityNote="Seyreltilmemiş 2 mL ampul hafif asidik pH nedeniyle küçük el sırtı venlerinde yanma yapabilir; 10 mL %0,9 NaCl ile seyreltme venöz irritasyonu ve hızlı puşe riskini ortadan kaldırır."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF — Birincil Tercih)',
          '%5 Dekstroz (D5W)',
          'Ringer Laktat (RL)',
        ]}
        stabilityNote="Koruyucu içermez; 10 mL SF ile seyreltildikten sonra hemen tek seferde uygulanmalıdır. Işıktan korunmalıdır."
        ySiteCompatible={[
          '%0,9 NaCl (SF)',
          '%5 Dekstroz',
          'Ringer Laktat',
          'Metilprednizolon / Deksametazon (ayrı SF flush önerilir)',
        ]}
        ySiteIncompatible={[
          'Tiyopental Sodyum / Fenobarbital (yüksek alkali — anında çökelti!)',
          'Sodyum Bikarbonat (alkali pH uyumsuzluğu)',
          'Furosemid / Fenitoin (çökelme riski — ayrı flush şart!)',
          'Kan Ürünleri & Lipit Emülsiyonları (aynı hattan verilmez)',
        ]}
        extravasationProtocol="Vezikan değildir; ancak asidik pH nedeniyle ekstravazasyonda lokal yanma ve eritem gelişebilir. Ekstravazasyon halinde enjeksiyonu durdurun, ekstremiteyi eleve edin ve soğuk kompres uygulayın. İntra-arteriyel enjeksiyondan kesinlikle kaçının."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Ağır böbrek yetmezliğinde (eGFR <30 mL/dk) ana ilaç ve metabolitlerin %70–80 renal atılımı yavaşlar; tekrarlayan dozlarda sedasyon ve antikolinerjik toksisite birikimi nedeniyle doz aralığı uzatılmalı veya doz %50 azaltılmalıdır."
        renalDetails={[
          'Hafif-Orta KBY (eGFR 30–60 mL/dk): Tek acil doz (45,5 mg) genellikle tolere edilir; tekrar dozlardan kaçının veya aralığı 12–24 saate çıkarın.',
          'Ağır KBY / Diyaliz (eGFR <15–30 mL/dk): Tek dozda bile 22,75 mg (yarım ampul) tercih edilmeli, tekrarlayan dozlarda konfüzyon/deliryum açısından yakın izlem yapılmalıdır.',
          'Üriner Retansiyon Riski: KBY’li yaşlı erkeklerde BPH ile birleştiğinde akut postrenal obstrüksiyonu tetikleyebilir.',
        ]}
        hepaticSummary="Karaciğerde N-demetilasyonla metabolize olur; Child-Pugh B/C sirozda terminal yarı ömür belirgin uzar ve hepatik ensefalopatiyi ağırlaştırabilir — mümkünse KAÇININ!"
        hepaticDetails={[
          'Child-Pugh B/C Siroz: Hepatik klirens düşüşüne bağlı olarak santral sedasyon ve antikolinerjik deliryum çok uzar; hepatik ensefalopatiyi maskeleyebilir veya presipite edebilir.',
          'Doz Stratejisi: İleri karaciğer yetmezliğinde zorunlu hallerde yarım ampul (22,75 mg) tek dozla sınırlayın ve tekrarlamayın.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="AGS Beers 2023: KAÇININ! (Zorunluysa 22,75 mg)"
        geriatricPoints={[
          'AGS Beers 2023 Güçlü Kaçınma Önerisi: 1. kuşak antihistaminikler en yüksek antikolinerjik bilişsel yük (ACB skoru = 3) grubundadır. >65 yaş hastalarda tek bir Avil® ampulü bile akut postoperatif deliryum, halüsinasyon, düşme ve uzamış PACU/hastane yatışına neden olabilir.',
          'Periferik Antikolinerjik Komplikasyonlar: Yaşlı erkeklerde akut ağrılı idrar retansiyonu (sonda gereksinimi), kabızlık/ileus, taşikardi ve dar açılı glokom krizi tetikler.',
          'Alternatif Strateji: Akut parenteral gereksinim yoksa 2. kuşak non-sedatif oral antihistaminikler (setirizin, loratadin, bilastin) seçilmelidir; parenteral zorunluysa yarım ampul (22,75 mg) yavaş infüzyonla uygulanır.',
        ]}
        obesityWeightScalarBadge="Erişkinde Sabit Maks 45,5 mg · OSA’da Dikkat!"
        obesityPoints={[
          'Tavan Kuralı (TBW ile Artırılmaz): Morbid obezitede erişkin dozu kesinlikle 45,5 mg (1 ampul) üzerine çıkarılmaz; lipofilik depolanma nedeniyle etki ve sedasyon süresi zaten uzar.',
          'Obstrüktif Uyku Apnesi (OSA) & Opioid Etkileşimi: Obez ve OSA’lı perioperatif hastalarda opioidlerle birlikte feniramin verilmesi üst havayolu kollapsını, hipoventilasyonu ve postoperatif desatürasyonu belirgin artırır.',
        ]}
        clinicalNote="PACU’da yaşlı veya OSA’lı bir hastada opioid kaşıntısı için rutin Avil® yapmak hem kaşıntıyı çözmez hem de deliryum + solunum depresyonu ekler!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK & LAKTASYON (#sec-gebelik)                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Plasentayı geçer; özellikle 1. trimester ve doğuma yakın (3. trimester) dönemde rutin önerilmez — yalnızca belirgin anne yararı potansiyel riskten fazlaysa kısa süreli kullanılır."
        pregnancyDetails={[
          '1. Trimester & Organogenez: İnsan verileri sınırlı olmakla birlikte büyük teratoloji kohortlarında belirgin majör konjenital malformasyon artışı gösterilmemiştir; yine de KÜB uyarınca 1. trimesterde zorunlu olmadıkça kaçınılır.',
          '3. Trimester & Peripartum Uyarı: Doğuma yakın yüksek/tekrarlayan dozlarda yenidoğanda sedasyon, irritabilite, solunum depresyonu veya prematüre bebeklerde antikolinerjik yan etkiler görülebilir. Anafilakside gebede de 1. seçenek daima ADRENALİN’dir.',
        ]}
        lactationSummary="Anne sütüne geçer; yenidoğan ve özellikle prematüre bebeklerde sedasyon, paradoksal eksitasyon ve antikolinerjik süt azalması riski nedeniyle emzirme döneminde KAÇINILMALIDIR."
        lactationDetails={[
          'Emziren Annede Alternatif: Antihistaminik gerekiyorsa anne sütüne geçişi minimal ve non-sedatif olan 2. kuşak oral ajanlar (loratadin veya setirizin) tercih edilir.',
          'Tek Acil Parenteral Doz Sonrası: Yenidoğan özellikle ilk 1–2 ayda veya prematüreyse sedasyon/beslenme azalması açısından yakından izlenmeli, tekrarlayan dozlarda emzirmeye geçici ara değerlendirilmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖNEMLİ OLUMSUZ ETKİLER (#sec-olumsuz)                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="sec-olumsuz"
        items={[
          {
            title: 'Santral Sedasyon, Kognitif Bozulma & Postop Deliryum',
            incidenceOrSeverity: 'Çok Sık · Yaşlıda Yüksek Risk',
            detail:
              'Güçlü santral H1 ve M1 blokajıyla uyku hali, refleks yavaşlaması, baş dönmesi, çift görme ve yaşlılarda akut konfüzyon/deliryum yapar. Uzun t½ (~16–19 sa) nedeniyle ertesi güne sarkan sedasyon görülür.',
            tone: 'indigo',
          },
          {
            title: 'Antikolinerjik Yan Etkiler (İdrar Retansiyonu / Glokom)',
            incidenceOrSeverity: 'Sık · ACB Skoru 3',
            detail:
              'Ağız/boğaz kuruluğu, bulanık görme (midriyazis/siklopileji), sinüs taşikardisi, konstipasyon/ileus, BPH’li hastalarda akut üriner retansiyon ve dar açılı glokom atağı.',
            tone: 'amber',
          },
          {
            title: 'Paradoksal SSS Eksitasyonu, Halüsinasyon & Konvülsiyon',
            incidenceOrSeverity: 'Çocuk (<2 Yaş) & Doz Aşımı!',
            detail:
              'Özellikle küçük çocuklarda, yaşlılarda veya aşırı dozda uyku hali yerine ajitasyon, tremor, görsel halüsinasyonlar, hipertermi ve jeneralize tonik-klonik nöbet gelişebilir.',
            tone: 'rose',
          },
          {
            title: 'Hızlı IV Puşe Hipotansiyonu & Kardiyak Aritmi (QT/QRS)',
            incidenceOrSeverity: 'Hızlı IV / Yüksek Doz',
            detail:
              'Seyreltilmeden hızlı IV puşede geçici hipotansiyon ve çarpıntı; ciddi doz aşımında kardiyak Na⁺/K⁺ (hERG) kanal blokajıyla QRS genişlemesi, QTc uzaması ve ventriküler aritmi riski.',
            tone: 'rose',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. ÖZEL KLİNİK DURUMLAR (#sec-ozel-durumlar)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: 'Anafilakside "Önce Avil + Dekort" Efsanesi — Ölümcül Hata!',
            detail:
              'Türkiye acil ve ameliyathane pratiğinde en sık yapılan yanlışlardan biri anafilaksi şüphesinde önce Avil® + steroid yapıp Adrenalini bekletmektir. WAO 2020 & EAACI 2021 kılavuzları nettir: Anafilakside geciken Adrenalin mortalitenin 1 numaralı nedenidir; Feniramin şoku veya havayolu ödemini tedavi etmez!',
          },
          {
            title: 'Nöraksiyel Opioid (Spinal/Epidural Morfin) Kaşıntısı Farkı',
            detail:
              'Spinal/epidural morfin kaşıntısı histamin aracılı değildir (µ-reseptör kaynaklıdır). Bu hastalara Avil® vermek kaşıntıyı durdurmaz; yalnızca sedasyon ve opioid solunum depresyonu riskini artırır. Ondansetron 4–8 mg IV veya düşük doz Nalokson (40–100 mcg IV) seçin.',
          },
          {
            title: 'Antikolinerjik Toksidrom & Fizostigmin Güvenlik Şartı',
            detail:
              'Feniramin doz aşımında tipik antikolinerjik toksidrom ("deli gibi ajite, pancar gibi kırmızı, kemik gibi kuru, kör gibi midriyatik, ateşli") ve nöbet görülür. Benzodiazepinler 1. basamaktır; Fizostigmin yalnızca saf antikolinerjik deliryumda ve EKG’de QRS <100 ms doğrulandıktan sonra (Na⁺ kanal blokajı/TCA şüphesi yoksa) düşünülebilir.',
          },
          {
            title: 'Günübirlik Cerrahi & Araç/Makine Kullanım Yasağı',
            detail:
              'Terminal yarı ömrü ~16–19 saat olduğundan, günübirlik cerrahi veya acil serviste IV/IM Avil® alan hastalar uyku hissetmeseler dahi en az 24 saat boyunca araç kullanmamalı, alkol veya ek sedatif almamalıdır.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. DERİN FARMAKODİNAMİK ANALİZ (#sec-derin-pd, 4 Kademeli)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'H1-Reseptör Ters Agonizması, Muskarinik M1–M3 Antagonizması & Kardiyak/Nöronal İyon Kanalları',
          summary:
            'Feniramin, klasik "antagonist" tanımının ötesinde konstitütif aktif H₁ reseptörlerinde ters agonist olarak etki eder ve geniş bir off-target reseptör profiline sahiptir:',
          points: [
            'H1-Reseptör (Gq/11-Bağlı GPCR) Ters Agonizması: H1 reseptörü ligand yokluğunda bile bazal (konstitütif) aktivite gösterir. Feniramin, reseptörü inaktif (R) konformasyonda kilitleyerek hem histamin bağlanmasını yarışmalı engeller hem de bazal NF-κB/inflamatuar sinyalini düşürür.',
            'Güçlü Santral ve Periferik Muskarinik (M1–M3) Reseptör Blokajı: Asetilkolin bağlanma bölgesini kompetitif olarak bloke eder; özellikle kortikal/hipokampal M1 blokajı bellek bozukluğu ve postoperatif deliryumun ana mekanizmasıdır.',
            'Yüksek Dozda Off-Target İyon Kanal Etkileri: Toksik konsantrasyonlarda kardiyak hızlı Na⁺ kanallarını (Nav1.5 → QRS genişlemesi) ve hERG K⁺ kanallarını (IKr → QTc uzaması) bloke edebilir; santral GABAerjik/kolinerjik dengesizlik ile nöbet eşiğini düşürür.',
          ],
        }}
        intracellularSignaling={{
          title: 'Gq → PLCβ → IP3 / DAG / Ca²⁺ Kaskad İnhibisyonu & Endotelyal Bariyer Koruması',
          summary:
            'H1 reseptörünün inaktif durumda tutulması endotel, düz kas ve sinir uçlarında hücre içi kalsiyum ve inflamasyon sinyallerini doğrudan baskılar:',
          points: [
            'IP3 / Ca²⁺ & PKC Baskılanması: Histaminin H1 reseptörüne bağlanması Gq proteini üzerinden fosfolipaz C-β (PLCβ) aktivasyonuna, IP3 aracılı endoplazmik retikulumdan Ca²⁺ boşalmasına ve protein kinaz C (PKC) uyarımına yol açar. Feniramin bu kaskadı keserek endotel hücre içi Ca²⁺ pikini engeller.',
            'Endotelyal Aktin-Miyozin Kontraksiyonu & eNOS / NO Sinyali: Hücre içi Ca²⁺ artışının önlenmesiyle endotel hücreleri arasındaki sıkı bağlantıların (VE-kadherin) ayrılması durur; plazma sızıntısı (ürtiker/ödem) ve eNOS kaynaklı lokal vazodilatasyon azalır.',
            'NF-κB Transkripsiyon Modülasyonu: Bazal H1 sinyalinin ters agonizma ile düşürülmesi, endotelde adezyon molekülleri (ICAM-1, VCAM-1) ve pro-inflamatuar sitokin ekspresyonunu kısmen sınırlar.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Dermal Mikrovaskülatür & Duyusal C-Lifleri → Cilt & Alerjik Yanıt Fizyolojisi',
            tissueTarget: 'Postkapiller Venül Endoteli · C-Lifi Pruriseptör',
            accent: 'teal',
            points: [
              'Lewis’in üçlü yanıtını (kızarıklık, kabarıklık, nörojenik flare) ve histamin aracılı kaşıntıyı hızla baskılar.',
              'Anafilakside salınan lökotrienler (LTC4/D4), PAF, prostaglandinler ve triptaz üzerine ETKİSİZDİR — bu nedenle şok ve bronkospazmda Adrenalinin yerini asla tutamaz!',
            ],
          },
          {
            systemTitle: 'Tuberomammiller Çekirdek, Korteks & Hipokampus → SSS, Uyku & Deliryum Fizyolojisi',
            tissueTarget: 'Santral H1 Reseptörleri · Kortikal M1 Kolinerjik Ağ',
            accent: 'indigo',
            points: [
              'KBB’yi hızla geçip santral H1 reseptörlerinin >%70’ini işgal ederek uyanıklık döngüsünü baskılar (REM uykusu bozulması, ertesi gün kognitif yavaşlama).',
              'Yaşlılarda azalmış kolinerjik rezerv üzerine binen M1 blokajı akut hiperaktif veya hipoaktif postoperatif deliryumu doğrudan tetikler.',
            ],
          },
          {
            systemTitle: 'Mesane Detrüsörü, İris Sfinkteri & GİS Düz Kası → Periferik Antikolinerjik Fizyoloji',
            tissueTarget: 'M3 Düz Kas Reseptörleri · Tükrük & Bronş Bezleri',
            accent: 'amber',
            points: [
              'M3 blokajı ile detrüsör kasılmasını azaltır (BPH’de akut üriner retansiyon), pupilla sfinkterini gevşetir (dar açılı glokom krizi) ve GİS peristaltizmini yavaşlatır.',
              'Solunum yolu mukus bezlerini kurutarak astım/KOAH hastalarında visköz sekresyon ve mukus tıkacı riski doğurur.',
            ],
          },
          {
            systemTitle: 'Miyokard İletim Sistemi & Vasküler Tonus → Kardiyovasküler Fizyoloji',
            tissueTarget: 'SA Düğüm M2 · Kardiyak Nav1.5 / hERG · α1-Reseptör',
            accent: 'rose',
            points: [
              'Kardiyak M2 vagolitik etkiyle hafif sinüs taşikardisi yapabilir; hızlı IV puşede ise geçici vazodilatasyon/hipotansiyon oluşturur.',
              'Yüksek toksik dozlarda Nav1.5 (QRS genişlemesi) ve hERG K⁺ kanal blokajıyla (QTc uzaması / Torsades riski) aritmojenik hale gelir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'H1 İşgal Tavanı, Antikolinerjik Kümülatif Yük & Sedatif Sinerji',
          summary:
            '1. kuşak antihistaminiklerde doz artırımı ek antialerjik kazançtan çok santral sedasyon ve antikolinerjik toksisiteyi büyütür:',
          points: [
            'Etkinlik Tavanı vs Toksisite Penceresi: Tek 45,5 mg erişkin dozu periferik H1 reseptörlerinde yüksek blokaj sağlar; 91 mg/gün üzerine çıkmak ürtikeri ek olarak düzeltmezken santral deliryum, nöbet ve kardiyotoksisite riskini dik biçimde artırır.',
            'Opioid, Benzodiazepin, Propofol & Alkol Sinerjisi: Tüm SSS depresanlarıyla güçlü aditif/supra-aditif sedasyon ve solunum depresyonu sinerjisi oluşturur; perioperatif analjezi altında hipoventilasyon ve geç uyanma riski yükselir.',
            'Kümülatif Antikolinerjik Yük (ACB): Atropin, skopolamin, amitriptilin, olanzapin veya oksibutinin kullanan hastalarda feniramin eklenmesi antikolinerjik eşiği aşarak deliryum ve idrar retansiyonunu tetikler.',
          ],
        }}
        clinicalPearls={[
          'Neden 2. Kuşak Antihistaminikler Sedasyon Yapmazken Feniramin Yapar? Setirizin, feksofenadin ve bilastin daha hidrofiliktir ve kan-beyin bariyerindeki P-glikoprotein (P-gp) pompasıyla beyinden aktif olarak dışarı atılır. Feniramin ise P-gp substratı olmadığından beyinde birikir ve H1 + M1 blokajı yapar!',
          'Çocukta Paradoksal Ajitasyon Tuzağı: Küçük bir çocukta Avil® sonrası aşırı huzursuzluk, çığlık, tremor veya nöbet geliştiğinde bunu "alerji kötüleşiyor" sanıp 2. doz YAPMAYIN — bu tipik 1. kuşak antihistaminik paradoksal SSS toksisitesidir!',
          'H1 + H2 Kombinasyonu: Dirençli akut ürtikerde veya vankomisin infüzyon reaksiyonunda 1. kuşak H1 dozunu artırmak yerine, tedaviye bir H2 blokeri (ör. Famotidin 20 mg IV) eklemek vasküler H2 reseptörlerini de bloke ederek daha güvenli ve etkin yanıt sağlar.',
          'Anafilaksi Sonrası Taburculukta Ne Yazmalı? Acilde veya ameliyathanede Adrenalin sonrası semptomatik Avil® uygulanmış olsa bile, taburculuk reçetesinde sedatif feniramin yerine 2. kuşak non-sedatif oral antihistaminik + Adrenalin oto-enjektör eğitimi verilmelidir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ ETKİLEŞİMLER & KAYNAKÇA (#sec-kaynaklar)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Feniramin (Avil®)"
        drugsComUrl="https://www.drugs.com/drug-interactions/pheniramine.html"
        medscapeUrl="https://go.drugbank.com/drugs/DB01620"
        medscapeLabel="DrugBank Monograph (DB01620)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Monoamin Oksidaz (MAO) İnhibitörleri (Linezolid, Metilen Mavisi, Selejilin, Moklobemid)',
            mechanism: 'Antikolinerjik Etkinin Şiddetli Potansiyalizasyonu & Monoamin / SSS Toksisitesi',
            clinicalEffect:
              'Ağır antikolinerjik kriz, deliryum, hiperpireksi, hipertansif/otonomik instabilite ve nöbet riskini ciddi biçimde artırır.',
            management:
              'MAO inhibitörü kullanan veya son 14 gün içinde bırakmış hastalarda Feniramin kesinlikle KONTRENDİKEDİR.',
          },
          {
            severity: 'D',
            agent: 'Opioidler, Benzodiazepinler, Volatil/IV Anestezikler, Alkol & Diğer SSS Depresanları',
            mechanism: 'Santral H1 Blokajı + GABA/Opioid Depresyonu Sinerjisi',
            clinicalEffect:
              'Derin ve uzamış sedasyon, solunum depresyonu, üst havayolu obstrüksiyonu (özellikle OSA’da) ve PACU’da derlenme gecikmesi.',
            management:
              'Perioperatif opioid alan hastalarda (özellikle nöraksiyel morfin kaşıntısında) rutin Feniraminden kaçının; zorunluysa düşük doz ve pulse oksimetri/kapnografi izlemi uygulayın.',
          },
          {
            severity: 'D',
            agent: 'Diğer Antikolinerjikler (Atropin, Skopolamin, TSA’lar, Olanzapin, Oksibutinin, İpratropium)',
            mechanism: 'Aditif Santral ve Periferik Muskarinik (M1–M3) Reseptör Blokajı',
            clinicalEffect:
              'Akut antikolinerjik toksidrom, postoperatif deliryum, halüsinasyon, akut idrar retansiyonu, paralitik ileus ve taşikardi.',
            management:
              'Antikolinerjik yükü yüksek ve >65 yaş hastalarda kombine kullanımdan kaçının; 2. kuşak non-sedatif antihistaminik tercih edin.',
          },
          {
            severity: 'D',
            agent: 'QT Uzatan İlaçlar (Amiodaron, Haloperidol, Ondansetron Yüksek Doz, Makrolidler, Florokinolonlar)',
            mechanism: 'Yüksek Dozda Aditif Kardiyak hERG K⁺ Kanal (IKr) İnhibisyonu',
            clinicalEffect:
              'Özellikle doz aşımı, hipokalemi veya hızlı IV uygulamada QTc uzaması ve Torsades de Pointes riski artabilir.',
            management:
              'Uzun QT sendromu veya kombine QT uzatan ilaç varlığında hızlı IV puşeden kaçının, elektrolitleri (K⁺/Mg²⁺) düzeltin ve EKG izleyin.',
          },
          {
            severity: 'C',
            agent: 'CYP2D6 Substratları (Kodein, Tramadol, Metoprolol, Venlafaksin, Tamoksifen)',
            mechanism: 'Alkilamin Antihistaminiklerin Zayıf-Orta CYP2D6 İnhibisyonu',
            clinicalEffect:
              'Tekrarlayan/kronik kullanımda ön-ilaçların (kodein/tramadol) aktivasyonunu hafifçe azaltabilir veya diğer CYP2D6 substratlarının düzeyini artırabilir.',
            management:
              'Tek acil dozda klinik önemi sınırlıdır; kronik birlikte kullanımda analjezik/kardiyak yanıtı izleyin.',
          },
        ]}
        references={[
          {
            authors: 'Cardona V, Ansotegui IJ, Ebisawa M, et al. (World Allergy Organization)',
            title: 'World Allergy Organization Anaphylaxis Guidance 2020',
            journal: 'World Allergy Organization Journal',
            year: 2020,
            note: 'Anafilakside tek 1. basamak tedavinin IM Adrenalin olduğunu, H1 antihistaminiklerin yalnızca cilt semptomları için 2.–3. basamak adjuvan olup Adrenalini asla geciktirmemesi gerektiğini vurgular.',
          },
          {
            authors: 'Muraro A, Worm M, Alviani C, et al. (EAACI Food Allergy and Anaphylaxis Guidelines Group)',
            title: 'EAACI guidelines: Anaphylaxis (2021 update)',
            journal: 'Allergy',
            year: 2022,
            note: 'Anafilaksi acil yönetiminde antihistaminiklerin şok veya solunum bulgularını düzeltmediğini ve kanıt düzeyinin yalnızca kutanöz rahatlama ile sınırlı olduğunu belirtir.',
          },
          {
            authors: 'Resuscitation Council UK (RCUK)',
            title: 'Emergency treatment of anaphylaxis: Guidelines for healthcare providers',
            journal: 'Resuscitation Council UK',
            year: 2021,
            note: 'Anafilakside rutin akut H1 antihistaminik ve steroid önceliğini kaldırarak erken IM/IV Adrenalin ve sıvı resüsitasyonunu merkezileştiren güncel kılavuz.',
          },
          {
            authors: 'American Geriatrics Society 2023 Beers Criteria Update Expert Panel',
            title: 'American Geriatrics Society 2023 updated AGS Beers Criteria for potentially inappropriate medication use in older adults',
            journal: 'Journal of the American Geriatrics Society',
            year: 2023,
            note: '1. kuşak yüksek antikolinerjik antihistaminiklerin >65 yaş erişkinlerde deliryum, kognitif yıkım ve idrar retansiyonu nedeniyle güçlü kaçınma listesinde yer aldığını belirtir.',
          },
          {
            authors: 'Zuberbier T, Abdul Latiff AH, Abuzakouk M, et al. (EAACI / GA²LEN / EuroGuiDerm / APAAACI)',
            title: 'The international EAACI/GA²LEN/EuroGuiDerm/APAAACI guideline for the definition, classification, diagnosis, and management of urticaria',
            journal: 'Allergy',
            year: 2022,
            note: 'Ürtiker yönetiminde 1. kuşak sedatif antihistaminiklerin güvenlik profili (sedasyon, antikolinerjik etki, ertesi gün performans kaybı) nedeniyle rutin kullanılmayıp 2. kuşak ajanların tercih edilmesini önerir.',
          },
          {
            authors: 'Kumar K, Singh SI',
            title: 'Neuraxial opioid-induced pruritus: An update',
            journal: 'Journal of Anaesthesiology Clinical Pharmacology',
            year: 2013,
            note: 'Nöraksiyel opioid kaşıntısının histamin değil santral µ-opioid reseptör aracılı olduğunu; ondansetron, düşük doz nalokson ve nalbufinin antihistaminiklerden üstün olduğunu gösterir.',
          },
          {
            authors: 'TİTCK / Sanofi — Avil® 45,5 mg / 2 mL Enjeksiyonluk Çözelti Kısa Ürün Bilgisi (KÜB)',
            title: 'Feniramin Hidrojen Maleat Ampul, Tablet ve Şurup Kısa Ürün Bilgisi',
            journal: 'Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK)',
            year: 2024,
            note: 'Türkiye’deki resmi ampul konsantrasyonu (45,5 mg/2 mL = 22,75 mg/mL), yavaş IV uygulama hızı, erişkin günlük maksimum 91 mg (2 ampul) sınırı ve yaş-bazlı pediatrik/kontrendikasyon uyarıları.',
          },
        ]}
      />
    </div>
  );
};
