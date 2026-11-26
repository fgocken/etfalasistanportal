import React, { useState, useId } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Baby,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
  RotateCcw,
  Syringe,
  Timer,
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
  MechanismOfActionBlock,
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

type CalcTab = 'adult_infusion' | 'obstetric_tocolysis' | 'pediatric_infusion';
type AdultPrepKey = 'pure_1000' | 'std_200' | 'low_100' | 'custom';
type PedPrepKey = 'ped_100' | 'ped_200' | 'ped_custom';

export const GlycerylTrinitrateProtocol: React.FC<Props> = ({ isDark }) => {
  // --- AKORDİYON STATE ---
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('adult_infusion');
  const [weightKg, setWeightKg] = useState<number>(70);

  // Tab 1: Erişkin İnfüzyon (Miyokard İskemisi / Akut Pulmoner Ödem / İntraop HT)
  const [adultPrep, setAdultPrep] = useState<AdultPrepKey>('std_200');
  const [adultCustomConc, setAdultCustomConc] = useState<number>(200);
  const [adultDoseMcgMin, setAdultDoseMcgMin] = useState<number>(20);

  // Tab 2: Akut Obstetrik Uterin Relaksasyon / Tokoliz
  const [obsBolusMcg, setObsBolusMcg] = useState<number>(50);
  const [obsPrepConc, setObsPrepConc] = useState<50 | 100>(50);

  // Tab 3: Pediatrik İnfüzyon
  const [pedWeightKg, setPedWeightKg] = useState<number>(18);
  const [pedDoseMcgKgMin, setPedDoseMcgKgMin] = useState<number>(1.0);
  const [pedPrep, setPedPrep] = useState<PedPrepKey>('ped_100');
  const [pedCustomConc, setPedCustomConc] = useState<number>(100);

  // Erişilebilirlik ID'leri
  const weightSliderId = useId();
  const adultPrepSelectId = useId();
  const adultDoseSliderId = useId();
  const pedWeightSliderId = useId();
  const pedDoseSliderId = useId();
  const pedPrepSelectId = useId();

  // --- TAB 1 HESAPLAMALARI (ERİŞKİN İNFÜZYON) ---
  const adultConcMcgMl: number = (() => {
    switch (adultPrep) {
      case 'pure_1000':
        return 1000;
      case 'std_200':
        return 200;
      case 'low_100':
        return 100;
      case 'custom':
        return adultCustomConc > 0 ? adultCustomConc : 200;
      default:
        return 200;
    }
  })();

  const adultHourlyMcg = adultDoseMcgMin * 60;
  const adultHourlyMg = adultHourlyMcg / 1000;
  const adultPumpRateMlHr = adultConcMcgMl > 0 ? adultHourlyMcg / adultConcMcgMl : 0;
  const adultMcgKgMin = weightKg > 0 ? adultDoseMcgMin / weightKg : 0;
  const adultDailyMg = adultHourlyMg * 24;
  const adultDailyAmpoules = adultDailyMg / 10; // Perlinganit 10 mg / 10 mL ampul

  const adultHemodynamicPhase: 'venous' | 'balanced' | 'scape_high' = (() => {
    if (adultDoseMcgMin < 50) return 'venous';
    if (adultDoseMcgMin <= 200) return 'balanced';
    return 'scape_high';
  })();

  const adultMetHbRisk = adultMcgKgMin >= 7;

  // --- TAB 2 HESAPLAMALARI (OBSTETRİK TOKOLİZ) ---
  const obsVolumeMl = obsPrepConc > 0 ? obsBolusMcg / obsPrepConc : 0;
  const obsMaxRepeats = obsBolusMcg > 0 ? Math.floor(500 / obsBolusMcg) : 5;

  // --- TAB 3 HESAPLAMALARI (PEDİATRİK İNFÜZYON) ---
  const pedConcMcgMl: number = (() => {
    switch (pedPrep) {
      case 'ped_100':
        return 100;
      case 'ped_200':
        return 200;
      case 'ped_custom':
        return pedCustomConc > 0 ? pedCustomConc : 100;
      default:
        return 100;
    }
  })();

  const pedDoseMcgMin = pedDoseMcgKgMin * pedWeightKg;
  const pedHourlyMcg = pedDoseMcgMin * 60;
  const pedHourlyMg = pedHourlyMcg / 1000;
  const pedPumpRateMlHr = pedConcMcgMl > 0 ? pedHourlyMcg / pedConcMcgMl : 0;
  const pedMetHbRisk = pedDoseMcgKgMin >= 7;
  const pedHighDoseWarn = pedDoseMcgKgMin > 5;

  const getOrderSummaryText = () => {
    if (activeTab === 'adult_infusion') {
      return [
        'GLİSEROL TRİNİTRAT (NİTROGLİSERİN · PERLINGANİT®) IV İNFÜZYON ORDER ÖZETİ',
        `Hasta Ağırlığı: ${weightKg} kg`,
        `Konsantrasyon: ${adultConcMcgMl} mcg/mL (Cam/Poliolefin şişe + PE/PP hat ZORUNLU!)`,
        `Hedef Doz: ${adultDoseMcgMin.toFixed(0)} mcg/dk (${adultMcgKgMin.toFixed(2)} mcg/kg/dk · ${adultHourlyMg.toFixed(2)} mg/saat)`,
        `Pompa Hızı: ${adultPumpRateMlHr.toFixed(1)} mL/saat`,
        `24 Saatlik Tüketim: ${adultDailyMg.toFixed(1)} mg/gün (~${Math.ceil(adultDailyAmpoules)} adet 10 mg ampul)`,
        'Güvenlik Kontrolü: Son 24–48 saatte PDE-5 inhibitörü yok · RV infarktı dışlandı · PE infüzyon hattı takılı.',
      ].join('\n');
    }
    if (activeTab === 'obstetric_tocolysis') {
      return [
        'GLİSEROL TRİNİTRAT (GTN) AKUT OBSTETRİK UTERİN RELAKSASYON (TOKOLİZ) ORDER ÖZETİ',
        `Push-Dose Konsantrasyon: ${obsPrepConc} mcg/mL (${obsPrepConc === 50 ? '1 mL Perlinganit [1 mg] + 19 mL SF' : '1 mL Perlinganit [1 mg] + 9 mL SF'})`,
        `IV Bolus Dozu: ${obsBolusMcg} mcg = ${obsVolumeMl.toFixed(2)} mL IV puşe`,
        `Tekrar & Tavan: Gerekirse 60–90 sn sonra tekrarlanabilir; kümülatif maks 500 mcg (en fazla ${obsMaxRepeats} doz)`,
        'Güvenlik: Fenilefrin/Efedrin hipotansiyon için hazır; ekstraksiyon sonrası uterotonik hazır tutulmalıdır.',
      ].join('\n');
    }
    return [
      'GLİSEROL TRİNİTRAT (GTN) PEDİATRİK IV İNFÜZYON ORDER ÖZETİ',
      `Pediatrik Ağırlık: ${pedWeightKg} kg`,
      `Konsantrasyon: ${pedConcMcgMl} mcg/mL (PE/PP set ZORUNLU!)`,
      `Hedef Doz: ${pedDoseMcgKgMin.toFixed(2)} mcg/kg/dk (${pedDoseMcgMin.toFixed(1)} mcg/dk · ${pedHourlyMg.toFixed(2)} mg/saat)`,
      `Pompa Hızı: ${pedPumpRateMlHr.toFixed(2)} mL/saat`,
      'Güvenlik: >5–7 mcg/kg/dk dozda bebeklerde/çocuklarda Methemoglobinemi riski — kan gazı MetHb izlemi!',
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
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik & Obstetrik' },
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
        tallManName="nitroGLYCERIN (GTN)"
        confusionRiskWith="nitroPRUSSIDE (SNP)"
        criticalAlerts={[
          'ISMP Tall-Man Etiketleme & Karışma Riski: nitroGLYCERIN (GTN) ile nitroPRUSSIDE (SNP) isim benzerliği nedeniyle sık karışır! GTN primer venodilatördür ve mcg/dk skalasında titre edilirken, SNP güçlü arteriyel vazodilatördür, mcg/kg/dk dozlanır ve siyanür toksisitesi taşır.',
          'PDE-5 İnhibitörü Mutlak Yasak: Sildenafil/Vardenafil (son 24 saat) veya Tadalafil (son 48 saat) ya da Riociguat kullanan hastaya GTN uygulanması cGMP birikimiyle ölümcül, vazopressöre dirençli refrakter hipotansiyona yol açar.',
          'Sağ Ventrikül (RV) İnfarktı Tuzağı: İnferior MI (DII, DIII, aVF ST↑) olan her hastada GTN öncesi mutlaka sağ derivasyon (V4R) çekilmelidir; preload bağımlı RV infarktında tek bir sublingual puf veya düşük doz IV GTN ani kardiyojenik şok yaratır.',
          'PVC Set Adsorpsiyonu (%40–80 Kayıp!): Standart PVC torba ve infüzyon setleri lipofilik GTN’yi yüksek oranda adsorbe ederek dozun yarıdan fazlasını tutar ve öngörülemez dalgalanma yaratır. Mutlaka CAM veya POLİOLEFİN şişe ve POLİETİLEN (PE) / POLİPROPİLEN infüzyon hattı kullanılmalıdır.',
          'Methemoglobinemi Uyarısı (>7 mcg/kg/dk): Uzamış yüksek doz infüzyonda (özellikle bebeklerde veya G6PD eksikliğinde) SpO₂ ~%85’e sabitlenir, oksijenle yükselmez ve kan çikolata kahverengidir.',
        ]}
        antidoteOrRescue="Hipotansiyonda infüzyonu derhal durdurun (t½ 1–4 dk olduğundan hızla geri döner), hastayı supin/Trendelenburg pozisyonuna alın, hızlı kristaloid bolusu (250–500 mL) ve gerekirse Fenilefrin (50–100 mcg IV) veya Noradrenalin uygulayın (PDE-5 etkileşimli dirençli şokta vazopressör + sıvı + gerekirse Vazopressin!). Methemoglobinemi (MetHb >%20–30 veya semptomatik) geliştiğinde antidot: Metilen Mavisi 1–2 mg/kg IV (5 dakikada yavaş infüzyon; 30–60 dk sonra gerekirse 1 mg/kg tekrar; G6PD eksikliğinde Metilen Mavisi hemoliz yapacağından yüksek doz IV Askorbik Asit tercih edilir)."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KİMLİK, KLİNİK ÖZET & DOZ-BAĞIMLI HEMODİNAMİK PROFİL             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
              <span className="font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/15">
                Organik Nitrat · NO Donörü Vazodilatör
              </span>
              <span aria-hidden="true">·</span>
              <span>Perlinganit® · Nitronal® · Nitrolingual® · Nitroderm®</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: C01DA02</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Gliserol Trinitrat (Nitrogliserin · Perlinganit®) Monografisi
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Hızlı
              etkili, kısa yarı ömürlü organik nitrat ve endojen <strong>Nitrik Oksit (NO) donörü</strong>. Doz-bağımlı
              olarak düşük dozlarda baskın <strong>venodilatasyon</strong> (↓preload, ↓LVEDP), yüksek dozlarda{' '}
              <strong>arteriyoler + epikardiyal koroner vazodilatasyon</strong> ve akut bolusta hızlı{' '}
              <strong>uterin düz kas relaksasyonu (tokoliz)</strong> sağlar.
            </p>
          </div>
        </div>

        {/* Doz-Bağımlı Hemodinamik Profil Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-sky-950/25 border-sky-900/50 text-sky-100' : 'bg-sky-50/70 border-sky-200 text-sky-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-sky-600 dark:text-sky-400">
              <Activity className="w-4 h-4 shrink-0" />
              <span>Düşük Doz (&lt;40–50 mcg/dk) · Venodilatasyon</span>
            </div>
            <p className="text-xs leading-relaxed">
              Sistemik kapasitans venlerinde belirgin gevşeme ile venöz göllenme yaratır → <strong>Preload↓</strong>,{' '}
              <strong>LVEDP↓</strong>, miyokardiyal duvar gerilimi (Laplace yasası) ve <strong>MVO₂↓</strong>.
              Subendokardiyal kan akımını artırır; miyokard iskemisi ve konjestif kalp yetmezliğinin temel mekanizmasıdır.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/25 border-indigo-900/50 text-indigo-100' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <HeartPulse className="w-4 h-4 shrink-0" />
              <span>Yüksek Doz (50–200+ mcg/dk) · Arteriyol &amp; Koroner</span>
            </div>
            <p className="text-xs leading-relaxed">
              Rezistans arteriyollerinde vazodilatasyonla <strong>SVR↓ (Afterload↓)</strong> ve sistolik/diyastolik KB
              düşüşü sağlar. Büyük epikardiyal koroner arterleri ve kollateralleri genişletir; Sodyum Nitroprussid’den
              farklı olarak <strong>koroner çalma (coronary steal) yapmaz</strong>.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/25 border-teal-900/50 text-teal-100' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <Baby className="w-4 h-4 shrink-0" />
              <span>Obstetrik IV Bolus (50–100 mcg) · Akut Tokoliz</span>
            </div>
            <p className="text-xs leading-relaxed">
              Miyometrial düz kas cGMP artışı ile <strong>30–60 saniyede</strong> hızlı, <strong>1–3 dakika</strong>{' '}
              süren geçici uterin gevşeme sağlar. Retansiyo plasenta, uterin inversiyon, ikiz/makat baş takılması ve zorlu
              sezaryen ekstraksiyonunda altın standart acil kurtarma bolusudur.
            </p>
          </div>
        </div>
      </section>

      {/* Kısa Etki Mekanizması Bloğu (#sec-etki) */}
      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="sec-etki"
        summary="Gliserol trinitrat (GTN), damar düz kas hücresinde mitokondriyal Aldehid Dehidrogenaz-2 (ALDH2) aracılı enzimatik denitrasyonla Nitrik Oksit (NO) serbestleştirir. NO, sitozolik çözünür Guanilat Siklazı (sGC) aktive ederek GTP → cGMP dönüşümünü hızlandırır; artan cGMP, Protein Kinaz G (PKG) üzerinden hücre içi serbest Ca²⁺ düzeyini düşürür ve Miyozin Hafif Zincir Fosfatazı (MLCP) aktive ederek güçlü düz kas gevşemesi oluşturur."
        pillars={[
          {
            title: 'ALDH2 Biyoaktivasyonu & Venöz Seçicilik',
            detail:
              'Venöz düz kas hücrelerindeki yüksek ALDH2 enzimatik aktivitesi nedeniyle düşük dozlarda (<40–50 mcg/dk) kapasitans venleri arteriyollerden çok daha duyarlıdır; preload ve LVEDP hızla düşer.',
          },
          {
            title: 'sGC → cGMP → PKG / MLCP Kaskadı',
            detail:
              'Artan cGMP, PKG-I’i aktive eder; SERCA2a pompasını hızlandırıp IP₃ reseptörlerini ve L-tipi Ca²⁺ kanallarını baskılar, BKCa kanallarını açarak membranı hiperpolarize eder ve aktin-miyozin çapraz köprülerini çözer.',
          },
          {
            title: 'Epikardiyal Koroner & Miyometrial Gevşeme',
            detail:
              'Rezistans arteriyollerinden ziyade iletken epikardiyal koronerleri genişleterek iskemik subendokardiyal akımı korur; obstetride miyometriumda cGMP artışıyla saniyeler içinde geçici tokoliz sağlar.',
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
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex flex-wrap items-center gap-2">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-sky-500/15 text-sky-700 dark:text-sky-300">
                  Onset: 1–2 dk · t½: 1–4 dk
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Yüksek hepatik ilk-geçiş yıkımı, lipofilik doku dağılımı (Vd ~3 L/kg), 1,2-/1,3-dinitrat metabolitleri ve PVC adsorpsiyon kinetiği.
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
                <span className="text-base font-bold font-mono text-sky-600 dark:text-sky-400 mt-1 block">
                  1 – 2 Dakika
                </span>
                <span className="text-[10px] text-slate-400">IV bolus 30–60 sn · SL 1–3 dk</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Zirve Etki (Peak)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  3 – 5 Dakika
                </span>
                <span className="text-[10px] text-slate-400">İnfüzyon kesilince 3–5 dk offset</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Eliminasyon Yarı Ömrü (t½)
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  1 – 4 Dakika
                </span>
                <span className="text-[10px] text-slate-400">Dinitrat metabolitleri: 30–60 dk</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Dağılım Hacmi (Vd) &amp; Bağlanma
                </span>
                <span className="text-base font-bold font-mono text-purple-600 dark:text-purple-400 mt-1 block">
                  ~3 L/kg · %60
                </span>
                <span className="text-[10px] text-slate-400">Yüksek lipofilisite · Plazma klirensi ~1 L/kg/dk</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-sky-500" />
                <span>ADME &amp; Ekstrahepatik Klirens Özellikleri:</span>
              </h4>
              <p>
                <strong>Emilim &amp; Dağılım:</strong> Oral biyoyararlanımı aşırı hepatik ilk-geçiş etkisi nedeniyle{' '}
                <strong>&lt;%1</strong>’dir; bu nedenle acil/perioperatif pratikte IV veya sublingual (biyoyararlanım
                ~%38–40) yolla uygulanır. Yüksek lipofilisitesi sayesinde hızla damar duvarına, eritrositlere ve düz kas
                dokularına dağılır.
              </p>
              <p>
                <strong>Metabolizma &amp; Eliminasyon:</strong> Hem hepatik <strong>glutatyon-organik nitrat redüktaz</strong>{' '}
                hem de vasküler duvar/eritrosit enzimleriyle saniyeler-dakikalar içinde <strong>1,2- ve 1,3-gliseril dinitrat</strong>{' '}
                (ana ilacın ~1/10 vazodilatör gücüne sahip, t½ ~30–60 dk) ve ardından inaktif gliseril mononitrat/gliserole
                parçalanır. Total plazma klirensi hepatik kan akımını aşar (~30–50 L/dk), yani ekstrahepatik (damar/kan)
                yıkım belirgindir; metabolitler glukuronidasyon sonrası böbreklerden atılır.
              </p>
              <div className="p-3 rounded-lg border bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200 font-medium">
                <strong>Klinik Çıkarım:</strong> Ultra-kısa yarı ömrü (1–4 dk) sayesinde mükemmel titre edilebilirlik sunar.
                Ancak lipofilik yapısı nedeniyle standart <strong>PVC torba ve hatlara %40–80 oranında adsorbe olur</strong>;
                aynı pompa hızı PVC setle verilirse gerçek hastaya ulaşan doz dramatik biçimde düşer ve PVC’den PE sete
                geçildiğinde ani hipotansiyon gelişebilir.
              </div>
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
          'PDE-5 İnhibitörü Kullanımı (Sildenafil veya Vardenafil son 24 saat; Tadalafil son 48 saat içinde) ve Çözünür Guanilat Siklaz Stimülatörleri (Riociguat): cGMP yıkımı engellendiğinden ölümcül, vazopressöre refrakter hipotansiyon!',
          'Sağ Ventrikül (RV) İnfarktı (İnferior MI + V4R ST↑): Preload bağımlı sağ ventrikülde venodilatasyon ani kalp debisi çöküşü ve kardiyojenik şok oluşturur.',
          'İleri Derece Aort Darlığı (AS), Hipertrofik Obstrüktif Kardiyomiyopati (HKMP/LVOT obstrüksiyonu), Kardiyak Tamponad ve Konstriktif Perikardit: Sabit çıkış yolu darlığı veya kısıtlı dolumda preload düşüşü kollapsa yol açar.',
          'KİBAS, Kafa Travması, İntrakraniyal Kanama ve İntrakraniyal Kitle: Serebral venodilatasyon intrakraniyal kan hacmini ve KİB’i (ICP) artırarak serebral perfüzyon basıncını (CPP) düşürür.',
          'Ciddi Hipotansiyon (SKB < 90 mmHg veya bazalden >30 mmHg düşüş), Düzeltilmemiş Hipovolemi ve Organik Nitrat Aşırı Duyarlılığı.',
        ]}
        relativeItems={[
          'Ağır Anemi (Hb < 7–8 g/dL): Hemoglobinin oksijen taşıma kapasitesi kısıtlıyken refleks taşikardi ve olası methemoglobinemi doku hipoksisini derinleştirir.',
          'Belirgin Bradikardi (<50/dk) veya Taşikardi (>100–110/dk) ile seyreden akut koroner sendrom: Baroreseptör refleks taşikardisi miyokard O₂ tüketimini artırabilir.',
          'Tek Akciğer Ventilasyonu (OLV) / ARDS / Şiddetli V/Q Uyumsuzluğu: Hipoksik pulmoner vazokonstriksiyonu (HPV) inhibe ederek intrapulmoner şantı artırır ve PaO₂’yi düşürebilir.',
          'G6PD Eksikliği ve Yenidoğan/Süt Çocuğu Dönemi: Yüksek dozda methemoglobinemi gelişirse standart antidot olan Metilen Mavisi hemoliz yapabileceğinden yakın izlem ve doz kısıtlaması gerekir.',
          'Dar Açılı Glokom (eski mutlak kontrendikasyon artık relatif kabul edilir; göz içi basıncında hafif artış yapabilir).',
        ]}
        clinicalNote="İnferior STEMI/NSTEMI hastasında GTN başlamadan önce mutlaka V4R sağ prekordiyal EKG kaydı alınmalı ve hastanın son 48 saatte erektil disfonksiyon veya pulmoner hipertansiyon ilacı (Sildenafil, Tadalafil, Vardenafil, Riociguat) kullanıp kullanmadığı sorgulanmalıdır."
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
            <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Klinik Endikasyonlar &amp; Doz Rejimleri
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Erişkin: 5–200 mcg/dk · SCAPE · Obstetrik Bolus</span>
        </div>

        {/* Endikasyon Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                Akut Koroner Sendrom &amp; Perioperatif Miyokard İskemisi
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/15 text-rose-600 dark:text-rose-300">
                ESC / AHA Sınıf I
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Başlangıç <strong>5–10 mcg/dk</strong> IV infüzyon; iskemik göğüs ağrısı, ST depresyonu veya hipertansiyon
              kontrolüne göre her 3–5 dakikada <strong>5–20 mcg/dk</strong> artırılır (tipik aralık <strong>10–100 mcg/dk</strong>,
              maks 200 mcg/dk). Koroner arter baypas cerrahisinde (CABG) iç meme arteri (LIMA) ve radyal arter greft
              spazmını önlemede ve intraoperatif iskemi kontrolünde ilk tercihtir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-sky-500" />
                Akut Kardiyojenik Pulmoner Ödem &amp; SCAPE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-500/15 text-sky-700 dark:text-sky-300">
                Yüksek Doz Protokol
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Standart akut pulmoner ödemde (SKB ≥ 110 mmHg) <strong>10–20 mcg/dk</strong> başlanıp hızla{' '}
              <strong>50–200 mcg/dk</strong>’ya çıkılır. <strong>SCAPE (Sempatik Çöküşlü Akut Pulmoner Ödem; SKB &gt;160–180 mmHg)</strong>{' '}
              kliniğinde NIV ile birlikte <strong>500–1000 mcg IV yükleme (1–2 dk’da)</strong> ardından{' '}
              <strong>100–400 mcg/dk</strong> yüksek doz infüzyon afterload’u kırarak entübasyon oranını dramatik azaltır;
              KB düşünce hızla aşağı titre edilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                Perioperatif Hipertansiyon &amp; Kontrollü Hipotansiyon
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300">
                Anestezi / KVC
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Kardiyak cerrahi, karotis veya vasküler cerrahide intraoperatif hipertansiyon ataklarında{' '}
              <strong>10–200 mcg/dk</strong> infüzyon veya ani entübasyon/sternotomi yanıtında <strong>50–100 mcg IV</strong>{' '}
              küçük boluslarla kontrol sağlar. Koroner arter hastalarında Sodyum Nitroprussid yerine koroner çalma
              riski olmadığı için tercih edilir.
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-teal-500" />
                Akut Obstetrik Uterin Relaksasyon (Acil Tokoliz)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/15 text-teal-700 dark:text-teal-300">
                50–100 mcg IV Bolus
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Retansiyo plasenta, akut uterin inversiyon, makat/ikiz doğumda baş takılması veya zorlu sezaryen fetal
              ekstraksiyonunda <strong>50–100 mcg IV bolus</strong> uygulanır; gerekirse 60–90 saniye sonra tekrarlanır
              (kümülatif maks <strong>500 mcg</strong>). 30–60 sn’de başlar, 1–3 dk sürer; genel anestezi/inhalasyon
              derinleştirmeye gerek kalmadan güvenli uterin gevşeme sağlar.
            </p>
          </div>
        </div>

        {/* Doz Kademeleri Şeridi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activeTab === 'adult_infusion' && adultHemodynamicPhase === 'venous'
                ? 'border-sky-500 bg-sky-500/10 ring-1 ring-sky-500/30'
                : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                1. Venodilatör Kademe
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                5 – 40 <span className="text-xs font-sans font-normal text-slate-500">mcg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Başlangıç 5–10 mcg/dk; 3–5 dk’da 5–10 mcg/dk artır. Baskın venodilatasyon (↓preload, ↓LVEDP, anti-iskemik).
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-sky-600 dark:text-sky-400 font-semibold">
              ✓ AKS · KVC Greft Spazmı · Hafif KKY
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activeTab === 'adult_infusion' && adultHemodynamicPhase === 'balanced'
                ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30'
                : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                2. Dengeli Arteriyel + Venöz
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                50 – 200 <span className="text-xs font-sans font-normal text-slate-500">mcg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Her 3–5 dk’da 10–20 mcg/dk artır. Arteriyoler rezistans (↓SVR) + epikardiyal koroner dilatasyon devreye girer.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
              ✓ Akut Pulmoner Ödem · İntraop HT
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activeTab === 'adult_infusion' && adultHemodynamicPhase === 'scape_high'
                ? 'border-amber-500 bg-amber-500/15 ring-2 ring-amber-500/40'
                : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                3. Yüksek Doz / SCAPE
              </span>
              <div className="text-lg font-bold font-mono text-amber-700 dark:text-amber-300 mt-1">
                200 – 400 <span className="text-xs font-sans font-normal text-slate-500">mcg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                SCAPE krizinde 500–1000 mcg IV yükleme sonrası kısa süreli yüksek infüzyon; KB &lt;140 mmHg’ya inince hızla azaltılır.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-amber-700 dark:text-amber-300 font-bold">
              ⚠ &gt;7 mcg/kg/dk’da MetHb İzlemi!
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              activeTab === 'pediatric_infusion'
                ? 'border-teal-500 bg-teal-500/10 ring-1 ring-teal-500/30'
                : isDark
                  ? 'bg-slate-800/40 border-slate-700'
                  : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                4. Pediatrik İnfüzyon
              </span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                0,25 – 5 <span className="text-xs font-sans font-normal text-slate-500">mcg/kg/dk</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Başlangıç 0,25–0,5 mcg/kg/dk; 3–5 dk’da 0,5–1 mcg/kg/dk titre et. Genellikle 1–3 mcg/kg/dk yeterlidir.
              </p>
            </div>
            <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[10px] text-teal-600 dark:text-teal-400 font-semibold">
              ✓ Pediatrik KVC · KKY · Postop HT
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. İNTERAKTİF ÇOK SEKMELİ DOZ & POMPA HIZI HESAPLAYICISI            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif Doz, Seyreltme &amp; Pompa Hızı Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Erişkin IV infüzyon (mcg/dk ↔ mcg/kg/dk), Akut Obstetrik Tokoliz Bolusu ve Pediatrik İnfüzyon.
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
                setAdultDoseMcgMin(20);
                setObsBolusMcg(50);
                setObsPrepConc(50);
                setPedWeightKg(18);
                setPedDoseMcgKgMin(1.0);
                setPedPrep('ped_100');
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

        {/* Endikasyon Sekmeleri */}
        <div
          className={`mt-4 grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 rounded-xl border ${
            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {[
            { id: 'adult_infusion' as CalcTab, label: '1. İskemi / Pulmoner Ödem / HT', sub: '5–200+ mcg/dk (SCAPE)' },
            { id: 'obstetric_tocolysis' as CalcTab, label: '2. Obstetrik Uterin Relaksasyon', sub: '50–100 mcg IV Bolus' },
            { id: 'pediatric_infusion' as CalcTab, label: '3. Pediatrik İnfüzyon', sub: '0,25–5 mcg/kg/dk' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 text-left transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-700 hover:bg-white hover:text-slate-950'
              }`}
            >
              <span className="block text-xs font-bold">{tab.label}</span>
              <span
                className={`block text-[10.5px] font-mono mt-0.5 ${
                  activeTab === tab.id ? 'text-sky-100' : 'text-slate-400'
                }`}
              >
                {tab.sub}
              </span>
            </button>
          ))}
        </div>

        {/* TAB 1: ERİŞKİN İNFÜZYON */}
        {activeTab === 'adult_infusion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-7 space-y-5">
              {/* Ağırlık */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={weightSliderId} className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-sky-500" />
                    <span>Hasta Ağırlığı (mcg/kg/dk &amp; MetHb güvenlik eşiği için):</span>
                  </label>
                  <span className="font-mono tabular-nums text-sm text-sky-600 dark:text-sky-400 font-bold">
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
                    className="w-full accent-sky-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center gap-1 shrink-0 flex-wrap">
                    {[50, 60, 70, 85, 100, 120].map((w) => (
                      <button
                        key={w}
                        type="button"
                        onClick={() => setWeightKg(w)}
                        className={`px-2 py-1 text-[11px] font-mono tabular-nums rounded border transition-colors cursor-pointer ${
                          weightKg === w
                            ? 'bg-sky-600 text-white border-sky-600 font-bold'
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
                drugName="Gliserol Trinitrat (GTN)"
                recommendedScalar="IBW"
                secondaryScalar={{ type: 'AdjBW', context: 'Ağırlık bazlı güvenlik kontrolü' }}
                rationale="GTN erişkinde ağırlıktan bağımsız mcg/dk skalasıyla hemodinamik yanıta göre titre edilir; obez hastalarda mcg/kg/dk güvenlik eşiği (>7 mcg/kg/dk MetHb riski) değerlendirilirken IBW/AdjBW referans alınır."
                currentWeightKg={weightKg}
                onApplyWeight={(w) => setWeightKg(Math.min(160, Math.max(40, w)))}
              />

              {/* Seyreltme Seçici */}
              <div>
                <label htmlFor={adultPrepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Çözelti Konsantrasyonu (CAM/Poliolefin Şişe + PE Hat):
                </label>
                <select
                  id={adultPrepSelectId}
                  value={adultPrep}
                  onChange={(e) => setAdultPrep(e.target.value as AdultPrepKey)}
                  className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-100 focus:border-sky-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-sky-600'
                  }`}
                >
                  <option value="std_200">
                    Standart Hastane Şişesi: 50 mg / 250 mL [200 mcg/mL] (5 Ampul Perlinganit + 200 mL D5W/SF)
                  </option>
                  <option value="pure_1000">
                    Saf Enjektör Pompası (Sıvı Kısıtlı / SCAPE): 50 mg / 50 mL [1000 mcg/mL] (5 Ampul Perlinganit veya 1 Nitronal Flakon)
                  </option>
                  <option value="low_100">
                    Düşük Konsantrasyon: 25 mg / 250 mL [100 mcg/mL] (2,5 Ampul + 225 mL D5W/SF)
                  </option>
                  <option value="custom">Özel Konsantrasyon (mcg/mL)</option>
                </select>

                {adultPrep === 'custom' && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-500">Konsantrasyon:</span>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      step="10"
                      value={adultCustomConc}
                      onChange={(e) => setAdultCustomConc(Math.max(10, Number(e.target.value)))}
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
                    Hedef İnfüzyon Hızı (5 – 400 mcg/dk · Standart 5–200):
                  </label>
                  <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400">
                    {adultDoseMcgMin} mcg/dk
                  </span>
                </div>
                <input
                  id={adultDoseSliderId}
                  type="range"
                  min="5"
                  max="400"
                  step="5"
                  value={adultDoseMcgMin}
                  onChange={(e) => setAdultDoseMcgMin(Number(e.target.value))}
                  className="w-full accent-sky-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[5, 10, 20, 40, 50, 100, 150, 200, 300, 400].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setAdultDoseMcgMin(d)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border transition-colors cursor-pointer ${
                        adultDoseMcgMin === d
                          ? 'bg-sky-600 text-white border-sky-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-xl border p-3 text-xs leading-relaxed ${
                  isDark ? 'bg-sky-950/25 border-sky-500/30 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-950'
                }`}
              >
                <strong className="block mb-0.5">SCAPE (Sempatik Çöküşlü Akut Pulmoner Ödem) Yüksek Doz Notu:</strong>
                Ağır solunum sıkıntısı + SKB ≥160–180 mmHg tablosunda NIV altında <strong>500–1000 mcg IV yükleme (1–2 dk’da)</strong>{' '}
                ardından <strong>100–400 mcg/dk</strong> yüksek doz infüzyon başlanır; dispne gerileyip SKB &lt;140 mmHg’ya
                indiğinde doz 5–10 dk içinde hızla azaltılır.
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
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400">
                    {adultConcMcgMl} mcg/mL
                  </span>
                </div>

                <div className="py-4 text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-sky-600 dark:text-sky-400 tracking-tight">
                    {adultPumpRateMlHr.toFixed(1)}{' '}
                    <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                      mL / saat
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    PE/PP hat üzerinden ayarlanacak pompa debisi
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Ağırlık Eşdeğeri</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {adultMcgKgMin.toFixed(2)} mcg/kg/dk
                    </span>
                    <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">({weightKg} kg için)</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Doz</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {adultHourlyMg.toFixed(2)} mg / saat
                    </span>
                    <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">({adultHourlyMcg.toFixed(0)} mcg/sa)</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Hemodinamik Faz</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400 text-xs block mt-0.5">
                      {adultHemodynamicPhase === 'venous'
                        ? 'Baskın Venodilatasyon'
                        : adultHemodynamicPhase === 'balanced'
                          ? 'Venöz + Arteriyoler'
                          : 'Yüksek Doz / SCAPE'}
                    </span>
                  </div>

                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">24 Saat Sarfiyat</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      ~{Math.ceil(adultDailyAmpoules)} Ampul
                    </span>
                    <span className="block text-[9.5px] text-slate-400 font-mono mt-0.5">({adultDailyMg.toFixed(0)} mg/gün · 10 mg amp)</span>
                  </div>
                </div>
              </div>

              {adultDoseMcgMin > 200 && (
                <div className="p-3 rounded-xl border bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Yüksek Doz / SCAPE Bölgesi (&gt;200 mcg/dk):</span>
                    Dakika dakika KB ve refleks taşikardi izlemi yapın; pulmoner ödem çözüldüğünde dozu hızla 50–100 mcg/dk
                    altına çekin.
                  </div>
                </div>
              )}

              {adultMetHbRisk && (
                <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/30 text-rose-900 dark:text-rose-200 text-xs flex items-start gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">METHEMOGLOBİNEMİ EŞİĞİ AŞILDI ({adultMcgKgMin.toFixed(2)} ≥ 7 mcg/kg/dk):</span>
                    SpO₂ ~%85’e sabitlenebilir ve kan gazında MetHb yükselebilir! Ko-oksimetri ile MetHb izleyin;
                    semptomatik/MetHb &gt;%20 ise <strong>Metilen Mavisi 1–2 mg/kg IV (5 dk’da)</strong> uygulayın.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AKUT OBSTETRİK UTERİN RELAKSASYON / TOKOLİZ */}
        {activeTab === 'obstetric_tocolysis' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-7 space-y-5">
              <div
                className={`rounded-xl border p-4 text-xs leading-relaxed ${
                  isDark ? 'bg-teal-950/25 border-teal-500/30 text-teal-200' : 'bg-teal-50 border-teal-200 text-teal-950'
                }`}
              >
                <strong className="block text-sm mb-1">Acil Obstetrik Endikasyonlar:</strong>
                Retansiyo plasenta (manuel halas), akut uterin inversiyon redüksiyonu, makat/ikiz doğumda servikal/uterin
                baş takılması, uterin tetani/Bandl halkası ve zorlu sezaryen ekstraksiyonu. <strong>30–60 sn’de</strong>{' '}
                hızlı gevşeme, <strong>1–3 dk</strong> içinde spontan tonus dönüşü!
              </div>

              {/* Seyreltme Protokolü Seçimi */}
              <div>
                <span className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Push-Dose Enjektör Hazırlama Seçimi:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setObsPrepConc(50)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      obsPrepConc === 50
                        ? 'border-teal-500 bg-teal-500/10 ring-2 ring-teal-500/30'
                        : isDark
                          ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400">50 mcg/mL (Önerilen · En Güvenli)</span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-300 mt-1">
                      1 mL Perlinganit (1 mg) + 19 mL SF = 20 mL → <strong>1 mL = 50 mcg</strong> · 2 mL = 100 mcg.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setObsPrepConc(100)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      obsPrepConc === 100
                        ? 'border-sky-500 bg-sky-500/10 ring-2 ring-sky-500/30'
                        : isDark
                          ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sky-600 dark:text-sky-400">100 mcg/mL (Pratik 10 mL)</span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 dark:text-slate-300 mt-1">
                      1 mL Perlinganit (1 mg) + 9 mL SF = 10 mL → <strong>0,5 mL = 50 mcg</strong> · 1 mL = 100 mcg.
                    </p>
                  </button>
                </div>
              </div>

              {/* Bolus Doz Seçimi */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <span>IV Bolus Dozu (Standart: 50–100 mcg; Maks kümülatif: 500 mcg):</span>
                  <span className="font-mono text-sm text-teal-600 dark:text-teal-400">{obsBolusMcg} mcg</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[50, 75, 100, 150, 200].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setObsBolusMcg(d)}
                      className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors cursor-pointer ${
                        obsBolusMcg === d
                          ? 'bg-teal-600 text-white border-teal-600'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {d} mcg
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
                    Enjektörden Verilecek Bolus
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-600 dark:text-teal-400">
                    {obsPrepConc} mcg/mL
                  </span>
                </div>

                <div className="py-4 text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-teal-600 dark:text-teal-400 tracking-tight">
                    {obsVolumeMl.toFixed(2)}{' '}
                    <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                      mL IV
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {obsBolusMcg} mcg yavaş IV puşe (5–10 sn’de)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs">
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Başlangıç / Süre</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">30–60 sn / 1–3 dk</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Tekrar &amp; Tavan</span>
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400 text-sm">
                      60–90 sn · Maks {obsMaxRepeats}×
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl border bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                <Timer className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Obstetrik Güvenlik:</span>
                  Maternal geçici hipotansiyon için <strong>Fenilefrin (50–100 mcg) veya Efedrin</strong> hazırda tutulmalı;
                  ekstraksiyon/plasenta ayrılması sonrası atoni kanamasına karşı <strong>Oksitosin</strong> hazır olmalıdır.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PEDİATRİK İNFÜZYON */}
        {activeTab === 'pediatric_infusion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  <label htmlFor={pedWeightSliderId}>Pediatrik Hasta Ağırlığı (3 – 50 kg):</label>
                  <span className="font-mono text-sm text-sky-600 dark:text-sky-400 font-bold">{pedWeightKg} kg</span>
                </div>
                <input
                  id={pedWeightSliderId}
                  type="range"
                  min="3"
                  max="50"
                  step="1"
                  value={pedWeightKg}
                  onChange={(e) => setPedWeightKg(Number(e.target.value))}
                  className="w-full accent-sky-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[5, 10, 15, 20, 30, 40].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setPedWeightKg(w)}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded border cursor-pointer ${
                        pedWeightKg === w
                          ? 'bg-sky-600 text-white border-sky-600 font-bold'
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
                  Pediatrik Seyreltme (PE Hat Zorunlu):
                </label>
                <select
                  id={pedPrepSelectId}
                  value={pedPrep}
                  onChange={(e) => setPedPrep(e.target.value as PedPrepKey)}
                  className={`w-full p-2.5 rounded-xl border text-xs sm:text-sm font-medium cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="ped_100">Pediatrik Standart: 5 mg / 50 mL veya 25 mg / 250 mL [100 mcg/mL]</option>
                  <option value="ped_200">Sıvı Kısıtlı Pediatrik KVC: 10 mg / 50 mL [200 mcg/mL]</option>
                  <option value="ped_custom">Özel Konsantrasyon (mcg/mL)</option>
                </select>

                {pedPrep === 'ped_custom' && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-slate-500">Konsantrasyon:</span>
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      step="10"
                      value={pedCustomConc}
                      onChange={(e) => setPedCustomConc(Math.max(10, Number(e.target.value)))}
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
                  <label htmlFor={pedDoseSliderId}>Pediatrik Doz (Standart 0,25 – 5 mcg/kg/dk):</label>
                  <span className="font-mono text-sm text-sky-600 dark:text-sky-400 font-bold">
                    {pedDoseMcgKgMin.toFixed(2)} mcg/kg/dk
                  </span>
                </div>
                <input
                  id={pedDoseSliderId}
                  type="range"
                  min="0.25"
                  max="10"
                  step="0.25"
                  value={pedDoseMcgKgMin}
                  onChange={(e) => setPedDoseMcgKgMin(Number(e.target.value))}
                  className="w-full accent-sky-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[0.25, 0.5, 1.0, 2.0, 3.0, 5.0, 7.0].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setPedDoseMcgKgMin(d)}
                      className={`px-2 py-0.5 text-[10.5px] font-mono rounded border cursor-pointer ${
                        Math.abs(pedDoseMcgKgMin - d) < 0.05
                          ? 'bg-sky-600 text-white border-sky-600 font-bold'
                          : isDark
                            ? 'bg-slate-800 border-slate-700 text-slate-300'
                            : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {d.toFixed(2)}
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
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/15 text-sky-600 dark:text-sky-400">
                    {pedConcMcgMl} mcg/mL
                  </span>
                </div>

                <div className="py-4 text-center">
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-sky-600 dark:text-sky-400 tracking-tight">
                    {pedPumpRateMlHr.toFixed(2)}{' '}
                    <span className="text-lg sm:text-xl font-sans font-bold text-slate-600 dark:text-slate-400">
                      mL / saat
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {pedWeightKg} kg · {pedDoseMcgKgMin.toFixed(2)} mcg/kg/dk
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
                    <span className="block text-[10px] text-slate-400 uppercase font-semibold">Saatlik Doz</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {pedHourlyMg.toFixed(2)} mg / sa
                    </span>
                  </div>
                </div>
              </div>

              {pedHighDoseWarn && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                    pedMetHbRisk
                      ? 'bg-rose-500/15 border-rose-500/30 text-rose-900 dark:text-rose-200'
                      : 'bg-amber-500/15 border-amber-500/30 text-amber-900 dark:text-amber-200'
                  }`}
                >
                  <AlertOctagon className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      {pedMetHbRisk
                        ? 'KRİTİK METHEMOGLOBİNEMİ RİSKİ (≥7 mcg/kg/dk)!'
                        : 'Pediatrik Yüksek Doz Uyarısı (>5 mcg/kg/dk):'}
                    </span>
                    Bebeklerde sitokrom b5 redüktaz aktivitesi düşük olduğundan methemoglobinemi daha hızlı gelişir. Kan
                    gazı MetHb düzeyi yakın izlenmeli; gerekirse alternatif vazodilatöre geçilmelidir.
                  </div>
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
        preparations={[
          {
            name: 'Perlinganit® 10 mg / 10 mL IV Ampul (TR Standart)',
            presentation: '10 mL berrak steril IV çözelti içeren cam ampul (kutu içi 10 ampul)',
            concentration: '1 mg/mL (1000 mcg/mL)',
            saltOrBaseNote:
              'Propilen glikol ve glukoz içerir; direkt bolus olarak ASLA sulandırmadan verilmez (1 mL = 1000 mcg!). 5 ampul (50 mL) direkt PE hatlı enjektör pompasına çekilerek 1000 mcg/mL konsantrasyonda infüze edilebilir.',
            alertLevel: 'high',
          },
          {
            name: 'Nitronal® 50 mg / 50 mL IV Flakon',
            presentation: '50 mL kullanıma hazır berrak steril IV infüzyon cam flakonu',
            concentration: '1 mg/mL (1000 mcg/mL)',
            saltOrBaseNote:
              'Cam şişe sunumu PVC adsorpsiyonunu önler; doğrudan 50 mL enjektör pompasına (1000 mcg/mL) veya 250 mL cam/poliolefin şişeye (200 mcg/mL) aktarılabilir.',
            alertLevel: 'standard',
          },
          {
            name: 'Nitrolingual® Pump Spray 0,4 mg / Puf Sublingual Sprey',
            presentation: 'Sublingual ölçülü doz sprey (~200 puf)',
            concentration: '400 mcg / Puf',
            saltOrBaseNote:
              'Akut anjina, IV yol açılana kadar akut pulmoner ödem köprüsü veya acil obstetrik tokoliz alternatifi (1–2 puf SL; 5 dk’da bir maks 3 puf). Çalkalanmaz!',
            alertLevel: 'standard',
          },
          {
            name: 'Push-Dose / Obstetrik Tokoliz Enjektörü (Yatak Başı Hazırlama)',
            presentation: '10 mL veya 20 mL enjektörde seyreltilmiş IV bolus çözeltisi',
            concentration: '50 mcg/mL veya 100 mcg/mL',
            saltOrBaseNote:
              '1 mL Perlinganit (1000 mcg) + 19 mL SF = 50 mcg/mL (1–2 mL = 50–100 mcg bolus — en düşük doz hatası riski).',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Saf Enjektör Pompası (1000 mcg/mL — Sıvı Kısıtlı / SCAPE): 5 ampul Perlinganit (50 mg / 50 mL) veya 1 flakon Nitronal 50 mg/50 mL — PE hat ile (0,6 mL/saat = 10 mcg/dk; 3 mL/saat = 50 mcg/dk).',
          'Standart Şişe İnfüzyonu (200 mcg/mL): 50 mg (5 ampul Perlinganit) + 200 mL D5W veya SF = 250 mL cam/poliolefin şişe (3 mL/saat = 10 mcg/dk; 15 mL/saat = 50 mcg/dk).',
          'Düşük Konsantrasyon / Pediatrik (100 mcg/mL): 25 mg (2,5 ampul) + 225 mL D5W/SF (= 250 mL) veya 5 mg (5 mL) + 45 mL D5W/SF (= 50 mL) → 6 mL/saat = 10 mcg/dk.',
          'Push-Dose / Obstetrik Tokoliz (50 mcg/mL): 1 mL Perlinganit (1 mg) + 19 mL SF → 1 mL = 50 mcg IV bolus.',
        ]}
        concentrationTrapWarning="Perlinganit® ampul 1000 mcg/mL (1 mg/mL) konsantrasyondadır! Obstetrik tokoliz veya intraop HT bolusu için 1 mL sulandırmadan puşe edilirse 1000 mcg (hedef dozun 10–20 katı!) verilerek ağır hipotansiyon/kollaps yaratılır. Ayrıca standart PVC torba/set kullanılırsa dozun %40–80’i plastiğe adsorbe olur; mutlaka CAM/POLİOLEFİN kap ve PE/PP hat kullanılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK (#sec-uyumluluk)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="peripheral-ok"
        accessSummary="Geniş periferik IV kateter veya santral venöz kateterden (ayrı lümen tercihli) uygulanabilir. KRİTİK HAT KURALI: Lipofilik GTN standart PVC torba ve PVC infüzyon setlerine %40–80 oranında adsorbe olur; mutlaka düşük adsorpsiyonlu Polietilen (PE) / Polipropilen (PP) hat ve cam veya poliolefin şişe kullanılmalıdır. Aynı lümenden başka bolus ilaç verilmemelidir (ölü boşluktan ani GTN bolusu derin hipotansiyon yapar)."
        phRange="3.0 – 6.5 (Taşıyıcıya göre hafif asidik)"
        osmolalityNote="Seyreltilmemiş Perlinganit® propilen glikol/glukoz içeriği nedeniyle hiperozmolardır; periferik damarda yanma/flebit yapabilir (yüksek dozda dilüe veya SVK tercih edilir)."
        compatibleDiluents={[
          '%5 Dekstroz (D5W) — Cam veya poliolefin şişede 48 saat stabil',
          '%0.9 Sodyum Klorür (SF) — Cam veya poliolefin şişede 48 saat stabil',
          'Seyreltilmemiş 1 mg/mL (50 mg/50 mL) — Polipropilen enjektör + PE hat ile 24–48 saat stabil',
        ]}
        stabilityNote="Cam/poliolefin kapta oda sıcaklığında 24–48 saat stabildir; yüksek ısı ve doğrudan güneş ışığından korunmalıdır. PVC setten PE sete geçiş yapılırken doz %50 azaltılıp yeniden titre edilmelidir."
        ySiteCompatible={[
          'Noradrenalin',
          'Epinefrin',
          'Dobutamin',
          'Dopamin',
          'Milrinon',
          'Amiodaron',
          'Furosemid',
          'Heparin (dikkat: aPTT etkileşimi)',
          'İnsülin',
          'Fentanil',
          'Midazolam',
          'Propofol',
          'Sodyum Nitroprussid',
        ]}
        ySiteIncompatible={[
          'Alteplaz (tPA)',
          'Hidralazin',
          'Fenitoin',
          'Levofloksasin',
          'Pantoprazol (değişken çökelti)',
          'Kan Ürünleri (aynı lümenden verme)',
        ]}
        extravasationProtocol="Vezikan değildir (vazodilatördür, doku nekrozu beklenmez); ancak konsantre/propilen glikol içeren solüsyonun ekstravazasyonu lokal irritasyon ve flebit yapabilir. Sızıntıda infüzyonu durdurup başka damar yoluna geçin; ölü boşluktan ani flush/bolus geçişini önlemek için GTN hattını asla hızlı yıkamayın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Primer doz azaltımı gerekmez; ancak dinitrat metabolitleri ve propilen glikol birikimi açısından uzamış yüksek dozda dikkat."
        renalDetails={[
          'Ana molekül GTN böbrekten bağımsız olarak hepatik ve vasküler/eritrositer redüktazlarla hızla yıkılır; akut kullanımda eGFR veya CRRT’ye göre başlangıç dozu değiştirilmez.',
          'Zayıf vazodilatör etkili 1,2- ve 1,3-dinitrat metabolitleri böbrekten atıldığından ileri KBY’de (eGFR < 30 mL/dk) uzamış infüzyonda etki süresi hafif uzayabilir.',
          'Yüksek doz saf Perlinganit® infüzyonunda taşıyıcı propilen glikol renal yetmezlikte birikerek ozmolar açık ve laktik asidoz yapabilir — uzamış yüksek dozda anyon/ozmolar açık izlenmelidir.',
        ]}
        hepaticSummary="Ağır karaciğer yetmezliğinde (Child-Pugh C) metabolizma yavaşlayabilir; düşük dozla başlayıp dikkatli titre edin."
        hepaticDetails={[
          'Hepatik glutatyon-organik nitrat redüktaz aktivitesi azalsa da ekstrahepatik (damar duvarı ve eritrosit) klirens kısmen kompanse eder.',
          'Sirozlu hastalarda bazal splanknik vazodilatasyon ve düşük SVR mevcut olduğundan standart dozlarda beklenenden derin hipotansiyon gelişebilir; 5 mcg/dk ile başlayıp yavaş titre edin.',
        ]}
        {...STANDALONE_ORGAN_PART1['glyceryl-trinitrate']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE DOZ YÖNETİMİ (#sec-geriatri-obezite)         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="5 mcg/dk Başlangıç · Yavaş Titrasyon"
        geriatricPoints={[
          '>65 yaş ve kırılgan (frailty) hastalarda baroreseptör refleks yanıtı körelmiş, ventriküler kompliyans azalmış (diyastolik disfonksiyon) ve gizli hipovolemi/ortostatik hipotansiyon sıktır.',
          'Düşük preload’a aşırı duyarlı olduklarından başlangıç dozu 5 mcg/dk olmalı ve sistolik KB bazal değerin >%15–20 altına ani düşürülmemelidir.',
          'Yaşlılarda gizli ileri aort darlığı sıktır; GTN öncesi fizik muayene/EKO ile ciddi AS ekarte edilmelidir.',
        ]}
        obesityWeightScalarBadge="Ağırlıksız mcg/dk (Güvenlik: IBW)"
        obesityPoints={[
          'Erişkin GTN infüzyonu ağırlık bazlı değil, doğrudan klinik hemodinamik yanıta göre mcg/dk cinsinden titre edilir; obez hastalarda yüksek kiloya bakarak yüksek başlangıç dozu seçilmemelidir.',
          'Yüksek lipofilisitesi (Vd ~3 L/kg) nedeniyle uzamış infüzyonda yağ dokusuna dağılım artabilir; infüzyon kesildiğinde hafif rezidüel etki uzaması görülebilir.',
          'Methemoglobinemi toksisite eşiği (>7 mcg/kg/dk) hesaplanırken TBW yerine IBW veya AdjBW kullanmak aşırı doz birikimine karşı koruyucudur.',
        ]}
        clinicalNote="İntraoperatif ve YBÜ titrasyonunda ana hedef mutlak doz değil, hedef MAP/SKB, ST segment normalizasyonu ve pulmoner konjesyonun gerilemesidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK, OBSTETRİK & LAKTASYON (#sec-gebelik)                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Obstetrik anestezide acil uterin relaksasyon (50–100 mcg IV) ve preeklampsi/pulmoner ödemde güvenli, yaygın kullanılan ajan."
        pregnancyDetails={[
          'Kısa süreli IV bolus (50–100 mcg) veya düşük-orta doz infüzyon fetüste belirgin teratojenite veya siyanür toksisitesi oluşturmaz (Sodyum Nitroprussid’e göre gebelikte belirgin üstündür).',
          'Maternal hipotansiyon (MAP düşüşü) uteroplasental perfüzyonu azaltarak fetal bradikardiye yol açabileceğinden maternal KB yakın izlenmeli ve gerekirse Fenilefrin/Efedrin ile desteklenmelidir.',
          'Akut tokoliz sonrası plasenta/fetüs çıkarıldığında miyometrial gevşeme 1–3 dk içinde geçer; ancak yüksek kümülatif dozlarda postpartum atoni kanamasına karşı uterotonik (Oksitosin) hazır tutulmalıdır.',
        ]}
        lactationSummary="Anne sütüne geçiş verisi sınırlıdır ancak t½ 1–4 dk ve oral biyoyararlanımı <%1 olduğundan bebekte sistemik etki beklenmez."
        lactationDetails={[
          'Oral yolla alınan nitratlar gastrointestinal sistem ve karaciğer ilk-geçişinde neredeyse tamamen yıkılır; anne sütüyle emilimi ihmal edilebilir düzeydedir.',
          'Akut perioperatif/obstetrik kullanım sonrası anne stabilize olduğunda emzirmeye ara verilmesi gerekmez; teorik nitrit/methemoglobinemi riski yalnızca çok yüksek/uzamış maternal dozlarda yenidoğanda izlenir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖNEMLİ OLUMSUZ ETKİLER (#sec-olumsuz)                           */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Hipotansiyon & Refleks Taşikardi',
            incidenceOrSeverity: 'Çok Sık',
            tone: 'rose',
            detail:
              'Aşırı venodilatasyon/preload kaybı ile ani SKB düşüşü, baroreseptör refleks taşikardi (MVO₂ artışı!) ve nadiren paradoksal vagal bradikardi (Bezold-Jarisch benzeri refleks).',
          },
          {
            title: 'Zonklayıcı Baş Ağrısı & KİB (ICP) Artışı',
            incidenceOrSeverity: '%20–50',
            tone: 'amber',
            detail:
              'Meningeal ve serebral venöz/arteriyel vazodilatasyona bağlı şiddetli pulsatil baş ağrısı; kafa içi patolojisi olanlarda serebral kan hacmi ve ICP artışı.',
          },
          {
            title: 'Nitrat Toleransı (Taşiflaksi)',
            incidenceOrSeverity: '24–48 Saat',
            tone: 'indigo',
            detail:
              'Sürekli yüksek doz infüzyonda 24–48 saat içinde sülfhidril (–SH) tükenmesi, ALDH2 oksidatif inaktivasyonu ve süperoksit üretimi ile hemodinamik etki kaybı.',
          },
          {
            title: 'Methemoglobinemi',
            incidenceOrSeverity: '>7 mcg/kg/dk',
            tone: 'rose',
            detail:
              'Yüksek/uzamış dozlarda (özellikle bebeklerde/G6PD eksikliğinde) Fe²⁺ → Fe³⁺ oksidasyonu; SpO₂ ~%85’e sabitlenir, çikolata kahverengi kan → Metilen Mavisi 1–2 mg/kg IV.',
          },
          {
            title: 'HPV İnhibisyonu & Hipoksemi',
            incidenceOrSeverity: 'Klinik Önemli',
            tone: 'amber',
            detail:
              'Hipoksik pulmoner vazokonstriksiyonu baskılayarak iyi ventile olmayan alveollerden şant akımını artırır; ARDS veya tek akciğer ventilasyonunda PaO₂ düşüşü yapabilir.',
          },
          {
            title: 'Heparin Direnci & Rebound Kanama',
            incidenceOrSeverity: 'Yüksek Doz IV',
            tone: 'indigo',
            detail:
              'Yüksek doz IV GTN, antitrombin III aktivitesini azaltarak UFH yanıtını (aPTT) köreltir; GTN kesildiğinde ani aPTT yükselmesi ve kanama riski doğar!',
          },
          {
            title: 'Propilen Glikol Toksisitesi',
            incidenceOrSeverity: 'Nadir / Uzamış',
            tone: 'teal',
            detail:
              'Yüksek doz saf Perlinganit® infüzyonlarında (özellikle böbrek/karaciğer yetmezliğinde) çözücü propilen glikole bağlı ozmolar açık artışı ve laktik asidoz.',
          },
          {
            title: 'Rebound Koroner Vazospazm',
            incidenceOrSeverity: 'Ani Kesimde',
            tone: 'amber',
            detail:
              'Uzun süreli yüksek doz IV infüzyonun aniden kesilmesi koroner vazospazmı veya hipertansiyonu tetikleyebilir; kademeli azaltılarak sonlandırılır.',
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
            title: 'PVC Setten PE Sete Geçiş Tuzağı (%40–80 Adsorpsiyon Farkı)',
            detail:
              'Hasta yanlışlıkla standart PVC set ile yüksek hızda (ör. 100 mcg/dk) titre edildiyse, düşük adsorpsiyonlu PE sete geçildiği anda hastaya ulaşan gerçek doz 2–3 katına fırlayarak ani şok yaratabilir; hat değişiminde dozu %50 düşürüp yeniden titre edin.',
          },
          {
            title: 'İnferior MI’da V4R Kuralı (RV İnfarktı Dışlamadan Verme!)',
            detail:
              'İnferior STEMI’lerin ~%30–40’ına sağ ventrikül tutulumu eşlik eder. Juguler venöz dolgunluk, temiz akciğerler ve hipotansiyon triadı veya V4R ST elevasyonu varsa GTN mutlak kontrendikedir; tedavi sıvı bolusu ve gerekirse inotroptur.',
          },
          {
            title: 'SCAPE Protokolü: Düşük Doz (5–10 mcg/dk) Yetmez!',
            detail:
              'Sempatik çöküşlü akut pulmoner ödemde (SKB >160–180 mmHg, aşırı sempatik vazokonstriksiyon) düşük doz GTN sadece venodilatasyon yapar; arteriyoler afterload’u kırmak için NIV ile birlikte 500–1000 mcg IV yükleme + 100–400 mcg/dk yüksek doz infüzyon gerekir.',
          },
          {
            title: 'Nitrat Toleransının Yönetimi (24–48 Saat Eşiği)',
            detail:
              '24–48 saat sürekli IV infüzyon sonrası aynı yanıt için artan doz ihtiyacı nitrat toleransını gösterir. Mümkünse 10–12 saatlik nitrat-serbest pencere bırakın, oral/topikal aralıklı rejime geçin veya Nikardipin/Klevidipin gibi farklı mekanizmalı vazodilatöre geçin.',
          },
          {
            title: 'GTN Kesilince aPTT Kontrolü (Heparin Rebound Tuzağı)',
            detail:
              'Unfraksiyone heparin (UFH) ile birlikte yüksek doz IV GTN alan AKS veya KVC hastalarında GTN infüzyonu kapatıldığında antitrombin etkinliği hızla geri döner ve aPTT tehlikeli biçimde yükselebilir; kesim sonrası 4–6 saat içinde aPTT mutlaka tekrarlanmalıdır.',
          },
          {
            title: 'SpO₂ ~%85 Sabitlenmesi = Ko-Oksimetri İste (MetHb)',
            detail:
              'Standart 2 dalga boylu pulse oksimetre methemoglobini eşit absorbe ettiği için ağır methemoglobinemi tablosunda SpO₂ ~%85’e kilitlenir ve %100 O₂ ile yükselmez; arteriyel kan gazında PaO₂ normal/yüksek ama kan çikolata kahverengidir.',
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
          title: 'Hücre Zarı & Moleküler Hedef (Lipofilik Diffüzyon → Mitokondriyal ALDH2 Biyoaktivasyonu → sGC Heme Bölgesi)',
          summary:
            'Klasik GPCR agonistlerinden farklı olarak Gliserol Trinitrat (GTN), hücre zarı reseptörüne bağlanmayan bir ön-ilaçtır (prodrug). Yüksek lipofilisitesi ile vasküler düz kas hücresi sarkolemmasından pasif diffüzyonla doğrudan sitozole ve mitokondriye geçer; burada enzimatik denitrasyonla Nitrik Oksit (NO) veya S-nitrozotiyol ara ürünlerine dönüşerek sitozolik çözünür Guanilat Siklazın (sGC) β1 alt birimindeki ferröz hem (Fe²⁺-porfirin) prostetik grubuna bağlanır (Miller’s / Stoelting’s / Goodman & Gilman).',
          points: [
            'Mitokondriyal Aldehid Dehidrogenaz-2 (ALDH2) — Klinik Doz Biyoaktivasyon Enzimi: Düşük/terapötik konsantrasyonlarda (<1 µM) GTN’nin 1,2-gliseril dinitrat + nitrit/NO’ya dönüşümünden primer sorumlu enzim mitokondriyal ALDH2’dir. Venöz düz kaslarda ALDH2 ekspresyon ve sülfhidril (–SH) rejenerasyon kapasitesi arteriyollere kıyasla çok daha yüksek olduğundan, GTN düşük dozlarda belirgin venoselektif profil sergiler.',
            'Çözünür Guanilat Siklaz (sGC — α1β1 Heterodimeri) Allosterik Aktivasyonu: Serbestleşen NO, sGC’nin β1 alt birimindeki 5-koordineli Fe²⁺-hem merkezine bağlanarak proksimal His105-Fe²⁺ bağını kırar; bu konformasyonel geçiş katalitik bölgenin Vmax hızını 100–200 kat artırarak GTP’yi 3′,5′-siklik GMP’ye (cGMP) çevirir.',
            'Yüksek Doz Alternatif Yolaklar (CYP450 / GST / Ksantin Oksidoreduktaz): Yüksek konsantrasyonlarda (>50–100 mcg/dk) ALDH2 doygunluğa ulaştığında sitokrom P450, glutatyon-S-transferaz (GST) ve ksantin oksidoreduktaz üzerinden arteriyoler düz kaslarda da NO salınımı artarak sistemik rezistans damarları genişler.',
            'Endotelden Bağımsız Vazodilatasyon: Asetilkolin veya bradikinin gibi endotelyal eNOS’a bağımlı değildir; ileri ateroskleroz veya diyabet nedeniyle endotel disfonksiyonu gelişmiş koroner segmentlerde dahi doğrudan vasküler düz kası gevşetebilir.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, cGMP / PKG-I Yolağı & İyon / Kontraktil Protein Dinamiği',
          summary:
            'Sitozolde hızla yükselen cGMP, primer efektörü olan cGMP-bağımlı Protein Kinaz I’i (PKG-Iα / Iβ) aktive ederek damar ve miyometrium düz kas hücresinde hem hücre içi [Ca²⁺]i düşüşünü hem de kontraktil aparatın Ca²⁺ duyarlılığının azaltılmasını eşzamanlı olarak yönetir:',
          points: [
            'Miyozin Hafif Zincir Fosfataz (MLCP) Aktivasyonu & Ca²⁺ Duyarsızlaşması: PKG-Iα, MLCP’nin MYPT1 (hedefleyici alt birim) ve RhoA/ROCK yolağını fosforilleyerek RhoA’yı inhibe eder ve MLCP’yi aktive tutar → MLC₂₀ hızla defosforile olur; hücre içi bazal Ca²⁺ mevcut olsa dahi aktin-miyozin çapraz köprüleri çözülür (gevşeme).',
            'Sarkoplazmik Retikulum (SR) Ca²⁺ Geri Alımı & Salınım Blokajı: PKG-I, fosfolambanı (PLN-Ser16) fosforilleyerek SERCA2a üzerindeki inhibisyonu kaldırır ve sitozolik Ca²⁺’nin SR lümenine hızla pompalanmasını sağlar; eşzamanlı olarak IRAG proteini üzerinden SR IP₃ reseptörlerini (IP₃R) kapatarak agonist kaynaklı Ca²⁺ salınımını durdurur.',
            'Sarkolemmal Hiperpolarizasyon & L-Tipi Ca²⁺ Kanal İnhibisyonu: PKG-I, büyük iletkenlikli Ca²⁺-aktive K⁺ kanallarını (BKCa / Maxi-K) fosforilleyerek açar; K⁺ efluksu membranı hiperpolarize eder ve voltaj kapılı L-tipi Ca²⁺ (Cav1.2) kanallarını kapatarak ekstraselüler Ca²⁺ girişini keser.',
            'PDE-5 Yıkım Freni & Ölümcül Sinerji Mekanizması: Hücre içi cGMP, normalde Fosfodiesteraz-5 (PDE-5) enzimi tarafından inaktif 5′-GMP’ye hidrolize edilerek sonlandırılır. Sildenafil/Vardenafil/Tadalafil varlığında PDE-5 bloke olduğundan GTN’nin tetiklediği cGMP patlaması yıkılamaz ve kontrolsüz, derin vazoplejik şok gelişir.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Venöz Kapasitans, Rezistans Arteriyoller & Koroner Yatak → Kardiyovasküler Fizyoloji',
            tissueTarget: 'Kapasitans Venleri · Epikardiyal Koroner · LV Duvar Gerilimi',
            accent: 'rose',
            points: [
              'Preload & Laplace Duvar Gerilimi Azalması: Düşük dozlarda splanknik ve periferik venöz kapasitansı artırarak LV diyastol sonu hacmini (LVEDV) ve basıncını (LVEDP) düşürür; Laplace yasasına (T = P×r / 2h) göre miyokardiyal duvar gerilimi ve MVO₂ keskin azalır.',
              'Subendokardiyal Perfüzyon & Koroner Çalma Yokluğu: LVEDP düşüşü diyastolik koroner perfüzyon gradientini (DBP − LVEDP) artırır; aynı zamanda büyük iletken epikardiyal koronerleri (>200 µm) ve kollateralleri genişletip küçük otoregülatuar direnç arteriyollerine (<100 µm) minimal etki ettiği için kanı iskemik alandan çalmaz (SNP’ye temel üstünlük!).',
              'Ventrikülo-Arteriyel Eşleşme (SCAPE): Yüksek dozlarda (100–400 mcg/dk) aortik elastans (Ea) ve arteriyoler SVR’yi düşürerek akut hipertansif pulmoner ödemde sol ventrikül ejeksiyonunu rahatlatır ve akciğer kapiller kama basıncını (PCWP) hızla indirir.',
            ],
          },
          {
            systemTitle: 'Pulmoner Vasküler Düz Kas & Alveolo-Kapiller Yatak → Solunum Fizyolojisi',
            tissueTarget: 'Pulmoner Arter/Ven · HPV · Bronş Düz Kası',
            accent: 'sky',
            points: [
              'Pulmoner Venöz & Arteriyel Basınç Düşüşü: Pulmoner vasküler yatakta hem pulmoner arter basıncını (PAP) hem pulmoner kapiller hidrostatik basıncı (PCWP) düşürerek hidrostatik pulmoner ödemi hızla çözer.',
              'Hipoksik Pulmoner Vazokonstriksiyon (HPV) İnhibisyonu: Alveoler hipoksiye yanıt olarak oluşan koruyucu arteriyoler kasılmayı cGMP yoluyla baskılar; atelektatik/konsolide akciğer bölgelerine perfüzyonu artırarak sağ-sol intrapulmoner şantı (Qs/Qt) yükseltir ve PaO₂’de düşüş oluşturabilir.',
              'Bronşiyal Düz Kas Gevşemesi: Hava yolu düz kasında da ılımlı cGMP aracılı bronkodilatasyon yapar ancak primer bronkodilatör olarak kullanılmaz.',
            ],
          },
          {
            systemTitle: 'Serebral Venöz Sinüsler, Pial Damarlar & KBB → Nöro-Fizyoloji',
            tissueTarget: 'Serebral Venüller · Pial Arterler · ICP/CPP',
            accent: 'indigo',
            points: [
              'Serebral Venodilatasyon & KİB (ICP) Yükselmesi: İntrakraniyal kapasitans venlerinin ve pial arterlerin genişlemesi serebral kan hacmini (CBV) artırır; intrakraniyal kompliyansı azalmış hastalarda (KİBAS, tümör, hemoraji) ICP’yi belirgin yükselterek herniasyon riski yaratır.',
              'Serebral Perfüzyon Basıncı (CPP = MAP − ICP): Eşzamanlı MAP düşüşü ve ICP artışı nedeniyle nöroşirürji/kafa travması hastalarında CPP’yi çift yönlü tehdit eder.',
              'Dural Damar Gevşemesi & Baş Ağrısı: Trigeminal perivasküler sinir liflerinin gerilmesi ve NO-aracılı CGRP salınımı şiddetli zonklayıcı baş ağrısına neden olur.',
            ],
          },
          {
            systemTitle: 'Miyometrium, Trombosit & Eritrosit Hemoglobini → Obstetrik & Hematoloji',
            tissueTarget: 'Miyometrium · Trombosit cGMP · Hemoglobin Fe²⁺',
            accent: 'teal',
            points: [
              'Akut Miyometrial Tokoliz: Uterin düz kas sarkolemmasında cGMP/PKG aktivasyonuyla oksitosin/PGF2α kaynaklı tetanik kasılmaları 30–60 saniyede çözer; kısa yarı ömrü nedeniyle 1–3 dakikada normal uterin tonus geri döner.',
              'Trombosit Agregasyon İnhibisyonu: Trombosit içi cGMP artışı GPIIb/IIIa aktivasyonunu ve agregasyonu hafifçe baskılar (AKS’de ek antitrombotik fayda; klinik kanama nadirdir).',
              'Eritrosit Hemoglobini & Methemoglobinemi: GTN denitrasyonundan oluşan inorganik nitrit (NO₂⁻), yüksek/uzamış dozlarda (>7 mcg/kg/dk) oksihemoglobindeki Fe²⁺’yi Fe³⁺’e (methemoglobin) oksitleyerek O₂ bağlanmasını engeller ve oksihemoglobin dissosiyasyon eğrisini sola kaydırır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Nitrat Toleransı (Taşiflaksi), Psödotolerans, Oksidatif Stres & Çapraz Tolerans',
          summary:
            'GTN’nin sürekli 24–48 saatlik infüzyonunda vasküler yanıtın hızla körelmesi ("nitrat toleransı") klinik olarak en önemli farmakodinamik sınırlamadır ve iki temel biyolojik eksende gelişir:',
          points: [
            'Gerçek Vasküler Tolerans (ALDH2 Oksidatif İnaktivasyonu & eNOS Uncoupling): Sürekli GTN maruziyeti mitokondride reaktif oksijen türleri (ROS / süperoksit O₂•⁻) üretimini artırır; bu oksidatif stres ALDH2’nin aktif bölgesindeki kritik tiyol (–SH) gruplarını oksitleyerek enzimi inaktive eder (GTN’den NO üretimi durur). Eşzamanlı olarak tetrahidrobiyopterin (BH4) oksidasyonu endotelyal eNOS’u "uncoupling"e sokarak NO yerine süperoksit üretmesine yol açar.',
            'Psödotolerans (Nörohormonal Karşı-Regülasyon): Sürekli vazodilatasyon baroreseptör aracılı sempatik aktivasyon (noradrenalin↑) ve renin-anjiyotensin-aldosteron sistemi (RAAS → anjiyotensin II↑, aldosteron↑, plazma hacim ekspansiyonu) uyararak vazodilatör etkiyi fizyolojik olarak nötralize eder.',
            'Önleme & Tersine Çevirme Stratejileri: En etkili klinik strateji günde 10–12 saatlik nitrat-serbest pencere bırakmak veya 24–48 saati aşan IV ihtiyaçta farklı mekanizmalı vazodilatöre (ör. Nikardipin, Klevidipin, ACEİ/ARB) geçmektir. ACE inhibitörleri, hidralazin (süperoksit süpürücü) ve N-asetilsistein (–SH donörü) teorik/kısmi koruma sağlayabilir.',
          ],
        }}
        clinicalPearls={[
          'Koroner Çalma Farkı (GTN vs SNP): Aktif miyokard iskemisi olan perioperatif hipertansiyon hastasında Sodyum Nitroprussid yerine Gliserol Trinitrat seçilmelidir; GTN iletken epikardiyal koronerleri ve kollateralleri genişletirken direnç arteriyollerinden kan çalmaz.',
          'PVC Adsorpsiyonu Doz Hatası: Standart PVC torba + setle başlanan infüzyonda ilk saatlerde dozun %40–80’i plastiğe tutunur; klinik etki alamayıp hızı yükselten ekip PE sete geçtiği anda hasta derin şoka girebilir — ilk dakikadan itibaren cam/poliolefin + PE hat kullanın.',
          'Obstetrik Anestezide 50 mcg Altın Kural: Retansiyo plasenta veya zorlu sezaryen ekstraksiyonunda genel anesteziye/yüksek sevoflurana geçmeden önce 50–100 mcg IV GTN bolusu (50 mcg/mL seyreltmeden 1–2 mL) 45 saniyede cerrahi gevşeme sağlar ve 2 dakikada tonusu geri döndürür.',
          'Heparin + GTN Çift Kontrolü: Yüksek doz IV GTN infüzyonu kapatıldığında heparin direnci saatler içinde kalkar; UFH alan hastada aPTT kontrol edilmeden aynı heparin hızına devam etmek majör kanama yaratabilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Gliserol Trinitrat (Nitrogliserin)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'PDE-5 İnhibitörleri (Sildenafil · Vardenafil [24 sa] · Tadalafil [48 sa])',
            mechanism: 'cGMP Yıkımının (PDE-5) Bloke Edilmesi → Kontrolsüz cGMP Birikimi',
            clinicalEffect: 'Şiddetli, uzamış, vazopressöre dirençli ölümcül hipotansiyon, miyokard infarktüsü ve kardiyak arrest.',
            management: 'MUTLAK KONTRENDİKE! Sildenafil/Vardenafil sonrası ≥24 saat, Tadalafil sonrası ≥48 saat boyunca GTN uygulanmaz.',
          },
          {
            severity: 'X',
            agent: 'Riociguat (Çözünür Guanilat Siklaz Stimülatörü)',
            mechanism: 'sGC Üzerinde Doğrudan Sinerjik cGMP Hiperaktivasyonu',
            clinicalEffect: 'Ani derin sistemik vazopleji ve refrakter hipotansif şok.',
            management: 'MUTLAK KONTRENDİKE! Birlikte kullanımı kesinlikle yasaktır.',
          },
          {
            severity: 'D',
            agent: 'Unfraksiyone Heparin (UFH)',
            mechanism: 'Yüksek Doz IV GTN’nin Antitrombin III Aktivitesini Azaltması',
            clinicalEffect: 'İnfüzyon sırasında heparin direnci (yetersiz aPTT); GTN kesildiğinde ani aPTT yükselmesi ve kanama riski.',
            management: 'GTN başlanırken, doz değiştirilirken ve özellikle kesildikten 4–6 saat sonra aPTT yakın izlenmeli ve heparin dozu ayarlanmalıdır.',
          },
          {
            severity: 'D',
            agent: 'Alteplaz (tPA) & Trombolitikler',
            mechanism: 'Hepatik Kan Akımı Artışıyla Alteplaz Klirensinin Hızlanması (+ Y-Site Uyumsuzluğu)',
            clinicalEffect: 'Alteplaz plazma konsantrasyonunda düşüş ve trombolitik etkinlikte azalma riski.',
            management: 'Mümkünse eşzamanlı yüksek doz IV GTN’den kaçının; zorunluysa ayrı damar yolundan en düşük etkin GTN dozunu kullanın.',
          },
          {
            severity: 'D',
            agent: 'Antihipertansifler, Volatil Anestezikler, Propofol & Nöraksiyel Blok',
            mechanism: 'Aditif Venodilatasyon ve Sempatik Tonus Azalması',
            clinicalEffect: 'Perioperatif dönemde belirgin hipotansiyon ve serebral/koroner hipoperfüzyon riski.',
            management: 'Düşük dozla başlayıp (5–10 mcg/dk) yakın KB/invaziv arter takibi altında titre edin; övolemiyi koruyun.',
          },
          {
            severity: 'C',
            agent: 'Methemoglobinemi Yapıcı Ajanlar (Prilokain · Benzokain · Dapson · Nitritler)',
            mechanism: 'Aditif Hemoglobin Fe²⁺ → Fe³⁺ Oksidasyonu',
            clinicalEffect: 'Özellikle yüksek doz GTN (>7 mcg/kg/dk) altında methemoglobinemi eşiği düşer.',
            management: 'Birlikte kullanımda ko-oksimetri ile MetHb düzeyi izlenmeli; Metilen Mavisi hazırda bulundurulmalıdır.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP.',
            title: "Miller's Anesthesia (10th Edition) — Vasodilators & Cardiovascular Pharmacology.",
            journal: 'Elsevier',
            year: 2024,
            note: 'GTN doz-bağımlı hemodinamik profili, PVC adsorpsiyonu, HPV inhibisyonu, obstetrik akut tokoliz ve methemoglobinemi yönetimi.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD.',
            title: "Stoelting's Pharmacology & Physiology in Anesthetic Practice (6th Edition) — Peripheral Vasodilators.",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'ALDH2 biyoaktivasyonu, cGMP/PKG moleküler kaskadı, nitrat toleransı, koroner çalma yokluğu ve farmakokinetik veriler.',
          },
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Scientific Document Group).',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes.',
            journal: 'Eur Heart J',
            year: 2023,
            note: 'Akut koroner sendromda IV nitrat endikasyonları, RV infarktı ve PDE-5 inhibitörü mutlak kontrendikasyonları.',
          },
          {
            authors: 'McDonagh TA, Metra M, Adamo M, et al. (ESC Task Force).',
            title: '2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure.',
            journal: 'Eur Heart J',
            year: 2021,
            note: 'Akut kardiyojenik pulmoner ödemde IV vazodilatör (GTN) kullanımı ve sistolik KB ≥110 mmHg güvenlik eşiği.',
          },
          {
            authors: 'Levy P, Compton S, Welch R, et al.',
            title: 'Treatment of severe decompensated heart failure with high-dose intravenous nitroglycerin: a feasibility and outcome analysis.',
            journal: 'Ann Emerg Med',
            year: 2007,
            note: 'SCAPE / ağır hipertansif pulmoner ödemde yüksek doz IV nitrogliserin bolus/infüzyon yaklaşımının entübasyon oranlarını azaltması.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/nitroglycerin.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
