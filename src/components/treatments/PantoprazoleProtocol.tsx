import React, { useId, useState } from 'react';
import {
  Activity,
  Baby,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplets,
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
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

type CalcTab = 'ugib' | 'icu_sup' | 'periop_peds';
type UgibRegimen = 'continuous' | 'intermittent';
type InfusionConcMode = 'conc_0_8' | 'conc_0_4';
type PeriopPedsMode = 'periop_adult' | 'pediatric';

const VIAL_MG = 40;
const RECONSTITUTED_MG_ML = 4.0; // 40 mg / 10 mL SF
const MINI_BAG_MG_ML = 0.4; // 40 mg / 100 mL SF veya D5W

interface SupRiskFactor {
  id: string;
  label: string;
  sublabel: string;
  major: boolean;
}

const SUP_RISK_FACTORS: SupRiskFactor[] = [
  {
    id: 'mv_48h',
    label: 'İnvaziv Mekanik Ventilasyon (>48 saat)',
    sublabel: 'REVISE (NEJM 2024) & SUP-ICU birincil yüksek risk grubu',
    major: true,
  },
  {
    id: 'coagulopathy',
    label: 'Koagülopati (Plt <50.000/µL, INR >1,5 veya aPTT >2×)',
    sublabel: 'Klinik anlamlı GİS kanaması için en güçlü bağımsız risk faktörü',
    major: true,
  },
  {
    id: 'shock',
    label: 'Şok / Sürekli Vazopresör Gereksinimi',
    sublabel: 'Splanknik hipoperfüzyon ve mukozal iskemi riski',
    major: true,
  },
  {
    id: 'aki_rrt',
    label: 'Akut Böbrek Hasarı (ABH) / RRT',
    sublabel: 'Üremik trombosit disfonksiyonu ve SUP-ICU risk faktörü',
    major: false,
  },
  {
    id: 'cirrhosis',
    label: 'Kronik Karaciğer Hastalığı / Siroz',
    sublabel: 'Portal hipertansiyon + koagülopati eşliği',
    major: false,
  },
  {
    id: 'gi_history',
    label: 'Son 1 Yılda GİS Ülser/Kanama veya Yüksek Doz Steroid / Antikoagülan',
    sublabel: 'Tekrar kanama ve eroziv gastrit riski yüksek',
    major: false,
  },
];

export const PantoprazoleProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('ugib');
  const [adultWeightKg, setAdultWeightKg] = useState<number>(75);

  // Tab 1: Akut Non-Varisiyel Üst GİS Kanaması
  const [ugibRegimen, setUgibRegimen] = useState<UgibRegimen>('continuous');
  const [infusionConcMode, setInfusionConcMode] = useState<InfusionConcMode>('conc_0_8');
  const [ugibDurationHours, setUgibDurationHours] = useState<number>(72);
  const [intermittentWithBolus, setIntermittentWithBolus] = useState<boolean>(false);

  // Tab 2: YBÜ Stres Ülseri Profilaksisi (REVISE / SUP-ICU)
  const [selectedSupRisks, setSelectedSupRisks] = useState<string[]>(['mv_48h']);
  const [supRiskResolved, setSupRiskResolved] = useState<boolean>(false);
  const [supRoute, setSupRoute] = useState<'iv_push' | 'iv_infusion'>('iv_push');

  // Tab 3: Perioperatif Aspirasyon Profilaksisi & Pediatrik Dozaj
  const [periopPedsMode, setPeriopPedsMode] = useState<PeriopPedsMode>('periop_adult');
  const [periopHighRiskFactors, setPeriopHighRiskFactors] = useState<string[]>(['obesity', 'gerd']);
  const [pedWeightKg, setPedWeightKg] = useState<number>(20);
  const [pedDoseMgKg, setPedDoseMgKg] = useState<number>(1.0);
  const [pedFreq, setPedFreq] = useState<'q24h' | 'q12h'>('q24h');

  // Akordiyon State (Varsayılan Kapalı)
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik ID'leri
  const adultWeightSliderId = useId();
  const adultWeightInputId = useId();
  const ugibDurationSliderId = useId();
  const pedWeightSliderId = useId();
  const pedWeightInputId = useId();
  const pedDoseSliderId = useId();

  // --- HESAPLAMALAR ---
  // Tab 1: Akut Üst GİS Kanaması (ACG 2021 / ESGE 2021 / Sachar 2014)
  const concMgMl = infusionConcMode === 'conc_0_8' ? 0.8 : 0.4;
  const bagVolumeMl = infusionConcMode === 'conc_0_8' ? 100 : 200;
  const infusionRateMlHr = 8 / concMgMl; // 10 mL/sa (0,8 mg/mL) veya 20 mL/sa (0,4 mg/mL)
  const hoursPerBag = 80 / 8; // 10 saat / 80 mg torba

  const continuousBolusMg = 80;
  const continuousInfusionTotalMg = 8 * ugibDurationHours;
  const continuousTotalMg = continuousBolusMg + continuousInfusionTotalMg;
  const continuousNetVials = Math.ceil(continuousTotalMg / VIAL_MG);
  const continuousInfusionBags = Math.ceil(continuousInfusionTotalMg / 80);
  const continuousPracticalVials = 2 + continuousInfusionBags * 2; // 2 bolus + her 80 mg torba için 2 flakon

  const intermittentIntervals = Math.max(1, Math.floor(ugibDurationHours / 12));
  const intermittentTotalMg = intermittentWithBolus
    ? 80 + Math.max(0, intermittentIntervals - 1) * 40
    : intermittentIntervals * 40;
  const intermittentVials = Math.ceil(intermittentTotalMg / VIAL_MG);

  // Tab 2: YBÜ Stres Ülseri Profilaksisi
  const hasSupIndication = selectedSupRisks.length > 0 && !supRiskResolved;
  const toggleSupRisk = (id: string) => {
    setSelectedSupRisks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Tab 3: Perioperatif & Pediatrik
  const togglePeriopRisk = (id: string) => {
    setPeriopHighRiskFactors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const pedRawMg = Number((pedWeightKg * pedDoseMgKg).toFixed(1));
  const pedCappedMg = Math.min(VIAL_MG, pedRawMg);
  const pedCapHit = pedRawMg > VIAL_MG;
  const pedReconstitutedMl = pedCappedMg / RECONSTITUTED_MG_ML; // 4 mg/mL
  const pedMiniBagMl = pedCappedMg / MINI_BAG_MG_ML; // 0,4 mg/mL
  const pedDailyMg = pedFreq === 'q12h' ? pedCappedMg * 2 : pedCappedMg;

  // Yapılandırılmış Türkçe Klinik Order Özeti
  const buildCopySummary = (): string => {
    const activeOrder = (() => {
      if (activeTab === 'ugib') {
        if (ugibRegimen === 'continuous') {
          return [
            `• Aktif Order (Akut Non-Varisiyel Üst GİS Kanaması — Sürekli İnfüzyon · ${ugibDurationHours} saat):`,
            `  1) Yükleme: Pantoprazol 80 mg (2 flakon) IV 15–30 dk infüzyon (veya 20 mL SF içinde yavaş IV ≥2–5 dk).`,
            `  2) İdame İnfüzyon: 8 mg/sa × ${ugibDurationHours} saat — Hazırlık: 80 mg (2 flakon) / ${bagVolumeMl} mL %0,9 NaCl (${concMgMl
              .toFixed(1)
              .replace('.', ',')} mg/mL) → Pompa Hızı: ${infusionRateMlHr.toFixed(0)} mL/sa (1 torba = ${hoursPerBag} saat).`,
            `  3) Toplam İhtiyaç (${ugibDurationHours} sa): ${continuousTotalMg} mg net (min ${continuousNetVials} flakon; tam 80 mg’lık ${continuousInfusionBags} torba + 2 bolus flakon = ${continuousPracticalVials} flakon).`,
          ].join('\n');
        }
        return [
          `• Aktif Order (Akut Non-Varisiyel Üst GİS Kanaması — Yüksek Doz Aralıklı · Sachar JAMA Intern Med 2014 · ${ugibDurationHours} saat):`,
          intermittentWithBolus
            ? `  Pantoprazol 80 mg (2 flakon) ilk IV bolus → ardından 40 mg IV q12sa (toplam ${intermittentIntervals} doz / ${intermittentTotalMg} mg = ${intermittentVials} flakon).`
            : `  Pantoprazol 40 mg (1 flakon) IV q12sa × ${ugibDurationHours} saat (toplam ${intermittentIntervals} doz / ${intermittentTotalMg} mg = ${intermittentVials} flakon).`,
          `  Uygulama: 10 mL %0,9 NaCl ile ≥2 dk yavaş IV veya 100 mL SF içinde 15 dk infüzyon.`,
        ].join('\n');
      }

      if (activeTab === 'icu_sup') {
        if (supRiskResolved) {
          return `• Aktif Klinik Karar (YBÜ SUP — Deprescribing): Risk faktörleri gerilediği ve tam enteral beslenme oturduğu için Pantoprazol KESİLMELİDİR! Gereksiz kronik PPI kullanımı C. difficile, pnömoni ve hipomagnezemi riskini artırır.`;
        }
        if (!hasSupIndication) {
          return `• Aktif Klinik Karar (YBÜ SUP — Düşük Risk): Yüksek kanama risk faktörü seçilmediği için rutin stres ülseri profilaksisi ÖNERİLMEZ.`;
        }
        const routeDesc =
          supRoute === 'iv_push'
            ? '10 mL %0,9 NaCl ile sulandırıp ≥2 dk yavaş IV'
            : '100 mL %0,9 NaCl veya D5W içinde 15 dk IV infüzyon';
        return `• Aktif Order (YBÜ Stres Ülseri Profilaksisi · REVISE NEJM 2024 / SUP-ICU NEJM 2018): Pantoprazol 40 mg (1 flakon) IV q24sa (${routeDesc}). Seçili risk faktörü sayısı: ${selectedSupRisks.length}. Risk geçince / tam enteral beslenme oturunca KES!`;
      }

      if (periopPedsMode === 'periop_adult') {
        return `• Aktif Order (Perioperatif Aspirasyon Profilaksisi & GÖRH · Erişkin ${adultWeightKg} kg): Pantoprazol 40 mg (1 flakon) IV anestezi indüksiyonundan 30–60 dk önce (10 mL SF ile ≥2 dk yavaş IV veya 100 mL SF’de 15 dk infüzyon). DİKKAT: Mide pH’sını >2,5 yükseltir ancak mide boşalmasını HIZLANDIRMAZ!`;
      }

      return `• Aktif Order (Pediatrik IV · ${pedWeightKg} kg · ${pedDoseMgKg
        .toFixed(1)
        .replace('.', ',')} mg/kg/doz · ${pedFreq === 'q12h' ? 'q12sa' : 'q24sa'}): Pantoprazol ${pedCappedMg
        .toFixed(1)
        .replace('.', ',')} mg IV (${pedReconstitutedMl
        .toFixed(1)
        .replace('.', ',')} mL [4 mg/mL stok] ≥2 dk yavaş IV VEYA ${pedMiniBagMl
        .toFixed(1)
        .replace('.', ',')} mL [0,4 mg/mL dilüsyon] 15 dk infüzyon). Günlük toplam: ${pedDailyMg
        .toFixed(1)
        .replace('.', ',')} mg/gün (tek doz tavan 40 mg).`;
    })();

    return [
      `PANTOPRAZOL SODYUM (Pantpas® · Pulcet® · Panto® · Pantactive® 40 mg IV Flakon) KLİNİK ORDER ÖZETİ`,
      `• ATC: A02BC02 · Geri Dönüşümsüz Proton Pompası İnhibitörü (H⁺/K⁺-ATPaz) · En Düşük CYP2C19 İnhibisyonu`,
      activeOrder,
      `• KRİTİK GÜVENLİK: Alkali çözelti (pH 9–10,5)! Midazolam, Noradrenalin, Dobutamin, Vankomisin ile Y-site UYUMSUZ (çökelme!) — ayrı lümen veya öncesi/sonrası bol SF flush zorunlu! Rilpivirin ile KONTRENDİKE.`,
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
        tallManName="PANTOprazole"
        confusionRiskWith="PARoxetine · PRIMidone"
        criticalAlerts={[
          'Y-SITE ALKALİ pH (9–10,5) ÇÖKELME TUZAĞI: Sulandırılmış Pantoprazol yüksek alkali çözeltidir! Midazolam, Noradrenalin (Norepinefrin), Dobutamin, Vankomisin, Amiodaron veya diğer asidik infüzyonlarla aynı Y-bağlantısından verildiğinde anında bulanıklık, kristal çökelti ve kateter tıkanması/mikroemboli oluşturur. Ayrı lümen kullanın veya uygulama öncesi ve sonrası hattı bol %0,9 NaCl ile yıkayın!',
          'AKUT ÜST GİS KANAMASI BOLUS + İNFÜZYON HIZ HATASI: Yükleme 80 mg IV (2 flakon) ardından 8 mg/sa × 72 saat sürekli infüzyon (veya yüksek doz aralıklı 40 mg IV q12sa) uygulanır. Pompa programlamasında 8 mg/sa yerine 80 mg/sa girilmemesi ve konsantrasyonun (0,8 mg/mL → 10 mL/sa vs 0,4 mg/mL → 20 mL/sa) çift kontrol edilmesi zorunludur.',
          'KRONİK KULLANIMDA HİPOMAGNEZEMİ, C. DIFFICILE & YÜKSEK DOZ MTX UYARISI: >3 ay kullanımda dirençli hipomagnezemi (tetani, sekonder hipokalsemi/hipokalemi, Torsades de Pointes), YBÜ’de gereksiz uzatılan tedavide Clostridioides difficile enfeksiyonu (CDAD) ve yüksek doz Metotreksat ile eş zamanlı kullanımda ağır MTX toksisitesi gelişebilir.',
          'RİLPİVİRİN İLE MUTLAK KONTRENDİKASYON & AKILCI DEPRESCRIBING: Rilpivirin emilimini dramatik bozarak HIV virolojik başarısızlığına yol açar (X-düzeyi). YBÜ stres ülseri profilaksisi risk faktörleri gerileyince / tam enteral beslenme oturunca MUTLAKA kesilmelidir!',
        ]}
        antidoteOrRescue="Spesifik antidotu yoktur. Akut doz aşımı (240 mg IV’ye kadar) genellikle hafif semptomlarla iyi tolere edilir; destekleyici ve semptomatik tedavi uygulanır. Pantoprazol plazma proteinlerine ~%98 oranında bağlandığı için hemodiyaliz veya CRRT ile anlamlı düzeyde uzaklaştırılamaz. Kronik kullanıma bağlı şiddetli hipomagnezemide IV/PO MgSO₄ replasmanı tek başına yeterli olmaz — PPI’nin kesilmesi veya H₂ blokerine geçilmesi şarttır."
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
              <span
                className={`font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                }`}
              >
                Proton Pompası İnhibitörü (PPI) · Sübstitüe Benzimidazol
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                Alkali pH 9–10,5 · Y-Site Dikkat · En Düşük CYP2C19 İnhibisyonu
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
              >
                Pantpas® · Pulcet® · Panto® · Pantactive® 40 mg IV Flakon
              </span>
              <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ATC: A02BC02</span>
            </div>

            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Pantoprazol Sodyum (Pantpas® · Pulcet® · Panto® · Pantactive®) Monografisi
            </h1>

            <p className={`text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Klinik Kimlik &amp; Rol:</strong>{' '}
              Gastrik pariyetal hücrelerin apikal zarındaki <strong>H⁺/K⁺-ATPaz (proton pompası)</strong> enzimini geri
              dönüşümsüz kovalent bağla inhibe ederek hem bazal hem de uyarılmış mide asit sekresyonunu güçlü biçimde
              baskılayan parenteral ve oral proton pompası inhibitörüdür. Yoğun bakım ve ameliyathane pratiğinde{' '}
              <strong>akut non-varisiyel üst GİS kanaması</strong> (ACG 2021 / ESGE 2021),{' '}
              <strong>yüksek riskli kritik hastalarda stres ülseri profilaksisi</strong> (SUP-ICU 2018 &amp; REVISE
              2024) ve <strong>yüksek riskli perioperatif aspirasyon profilaksisinde</strong> standart ajandır.
              Omeprazol ve esomeprazole kıyasla <strong>en düşük CYP2C19 inhibisyon potansiyeline</strong> sahip olması
              nedeniyle <strong>klopidogrel (DAPT) kullanan hastalarda 1. tercih PPI</strong> konumundadır.
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
        summary="Pantoprazol, zayıf bazik bir ön-ilaçtır (prodrug). Sistemik dolaşımdan gastrik pariyetal hücrelerin aşırı asidik sekretuar kanaliküllerine (pH <1–2) pasif diffüzyonla geçer; burada protonlanarak iyon tuzağına (ion trapping) yakalanır, aktif siklik sülfenamide dönüşür ve asit salgısının son ortak basamağı olan H⁺/K⁺-ATPaz pompasını kovalent disülfid bağıyla geri dönüşümsüz olarak inaktive eder."
        pillars={[
          {
            title: '1. Asit-Aktive Hedefli Ön-İlaç (İyon Tuzağı)',
            detail:
              'Nötral plazma pH’sında (7,4) inaktiftir; yalnızca aktif asit salgılayan pariyetal kanaliküllerde (pH <2) protonlanarak >1.000 kat birikir ve aktif siklik sülfenamid ara ürününe dönüşür.',
          },
          {
            title: '2. Geri Dönüşümsüz Kovalent H⁺/K⁺-ATPaz Blokajı',
            detail:
              'Enzimin α-alt birimindeki Cys813 ve pantoprazole özgü derin yerleşimli Cys822 kalıntılarıyla kovalent disülfid (S–S) bağı kurar. Asit sekresyonu ancak yeni pompa senteziyle (~24–48 saat) geri döner.',
          },
          {
            title: '3. Minimal CYP2C19 İnhibisyonu & Lineer Kinetik',
            detail:
              'Hepatik O-demetilasyonun ardından doğrudan Faz II sülfasyonla inaktive olur; omeprazol/esomeprazolden farklı olarak CYP2C19 oto-inhibisyonu yapmaz ve klopidogrel aktivasyonunu klinik olarak bozmaz.',
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
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-600'
              }`}
            >
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2
                className={`text-base sm:text-lg font-bold flex flex-wrap items-center gap-2 ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span
                  className={`text-xs font-normal px-2 py-0.5 rounded font-mono ${
                    isDark ? 'bg-teal-500/15 text-teal-300' : 'bg-teal-50 text-teal-700'
                  }`}
                >
                  IV Onset: 15–30 dk · Plazma t½: ~1 sa · PD Süre: ≥24 sa · Minimal CYP2C19 İnhibisyonu
                </span>
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Kısa plazma yarı ömrü / uzun farmakodinamik etki ayrışması, %98 protein bağlanması, lineer PK ve Faz II sülfasyon avantajı.
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
          <div
            className={`p-5 sm:p-6 pt-0 border-t space-y-4 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Etki Başlangıcı &amp; Süre
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                  15–30 dk (IV)
                </span>
                <span className="text-[10px] text-slate-400">Pik 1–2 sa · Asit supresyonu ≥24 sa</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Dağılım &amp; Biyoyararlanım
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  ~%98 Albumin · Vd 11–24 L
                </span>
                <span className="text-[10px] text-slate-400">Oral biyoyararlanım ~%77 (IV = %100)</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Metabolizma (CYP Avantajı!)
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  CYP2C19 → Faz II Sülfasyon
                </span>
                <span className="text-[10px] text-slate-400">Minimal CYP2C19 inhibisyonu (vs Omeprazol)</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Plazma t½ &amp; Atılım
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                  ~1,0 saat (PM: 3,5–10 sa)
                </span>
                <span className="text-[10px] text-slate-400">%71–80 idrar, %18 feçes (inaktif)</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• PK / PD Ayrışması (Kısa t½ vs Uzun Etki):</strong>{' '}
                Plazma eliminasyon yarı ömrü yalnızca <strong>~1 saat</strong> olmasına karşın (CYP2C19 yavaş metabolize
                edicilerde [PM] 3,5–10 saate uzar), pariyetal H⁺/K⁺-ATPaz pompasına geri dönüşümsüz kovalent bağlanma
                nedeniyle tek bir IV doz <strong>≥24 saat</strong> boyunca asit salgısını baskılar. Tam bazal asit
                iyileşmesi yeni pompa sentezine (de novo turnover t½ ~50 saat) bağlıdır.
              </div>
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• Minimal CYP2C19 İnhibisyonu &amp; Lineer Farmakokinetik:</strong>{' '}
                Pantoprazol karaciğerde CYP2C19 ile O-demetilasyona uğradıktan sonra hızla sitozolik sülfotransferaz ile{' '}
                <strong>Faz II sülfasyona</strong> (inaktif metabolit) geçer; CYP3A4 ikincil yoldur. Omeprazol ve
                esomeprazolün aksine CYP2C19 üzerinde belirgin mekanizma-bazlı oto-inhibisyon yapmaz; bu sayede 10–80 mg
                aralığında <strong>öngörülebilir lineer kinetik</strong> sergiler ve klopidogrel, diazepam, fenitoin gibi
                CYP2C19 substratlarıyla ilaç etkileşimi riski en düşüktür.
              </div>
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• Eliminasyon &amp; Diyaliz Edilememe:</strong>{' '}
                Değişmemiş pantoprazol idrarla neredeyse hiç atılmaz; metabolitlerinin <strong>%71–80&apos;i idrarla</strong>,
                ~%18&apos;i safra/feçesle atılır. Çok yüksek plazma protein bağlanması (~%98) nedeniyle hemodiyaliz veya
                CRRT ile klirensi ihmal edilebilir düzeydedir.
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
          'Rilpivirin İçeren Antiretroviral Rejimler (X-Düzeyi Mutlak Kontrendikasyon): İntragastrik pH artışı rilpivirinin çözünürlüğünü ve oral emilimini dramatik biçimde düşürerek HIV virolojik başarısızlığına ve direnç gelişimine yol açar!',
          'Pantoprazol, Diğer Sübstitüe Benzimidazol PPI’ler (Omeprazol, Esomeprazol, Lansoprazol, Rabeprazol) veya Formülasyon Yardımcı Maddelerine Karşı Bilinen Aşırı Duyarlılık (Anafilaksi, Anjiyoödem, SJS/TEN, DRESS veya PPI ilişkili Akut İnterstisyel Nefrit öyküsü).',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Dikkat Edilecek Durumlar"
        relativeItems={[
          'Endikasyonsuz Kronik Kullanım (>8 Hafta · AGS Beers 2023): Gereksiz uzun süreli PPI kullanımı C. difficile enfeksiyonu, kırık, hipomagnezemi, B12 eksikliği ve pnömoni riskini anlamlı artırır.',
          'Ağır veya Dirençli Hipomagnezemi (ve Sekonder Hipokalsemi / Hipokalemi): Mevcut hipomagnezemisi veya digoksin/diüretik kullanımı olanlarda aritmi ve tetani riskini tetikler; yakın Mg²⁺ izlemi gerekir.',
          'Yüksek Doz Metotreksat (MTX) Kemoterapisi: Renal BCRP/OAT3 inhibisyonu ile MTX eliminasyonunu geciktirerek şiddetli hematolojik/mukozal toksisiteye neden olur — yüksek doz MTX sırasında geçici kesilmelidir.',
          'Aktif veya Tekrarlayan Clostridioides difficile İlişkili İshal (CDAD) & Ağır Karaciğer Yetmezliği (Child-Pugh C): CDAD’da kesin zorunluluk yoksa PPI kesilmeli; Child-Pugh C’de idame doz azaltılmalıdır.',
          'Alarm Semptomları (Disfaji, Kilo Kaybı, Tekrarlayan Kusma, Anemi): Semptomatik rahatlama gastrik malignite tanısını maskeleyebilir — endoskopik dışlama yapılmalıdır.',
        ]}
        clinicalNote="Akut üst GİS kanamasında veya perioperatif tek doz aspirasyon profilaksisinde kısa süreli IV Pantoprazol güvenlidir; risklerin büyük çoğunluğu >8 hafta süren gereksiz kronik kullanımda ve Y-site uyumsuzluklarında ortaya çıkar."
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
            <BookOpen className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
            <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Klinik Endikasyonlar &amp; Doz Rejimleri (ACG 2021 · ESGE 2021 · REVISE 2024 · SUP-ICU 2018)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">1 Flakon = 40 mg IV · pH 9–10,5</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* A. Akut Non-Varisiyel Üst GİS Kanaması */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Droplets className="w-4 h-4 text-rose-500 shrink-0" />
                <span>A. Akut Non-Varisiyel Üst GİS Kanaması (ACG 2021 / ESGE 2021)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-800'
                }`}
              >
                80 mg + 8 mg/sa × 72 sa
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Yüksek riskli ülser kanamalarında (endoskopik hemostaz sonrası) hedef intragastrik pH &gt;6 tutarak pıhtıyı
              korumaktır: <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>80 mg IV bolus</strong>{' '}
              → <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>8 mg/sa × 72 saat sürekli infüzyon</strong>{' '}
              <strong>VEYA</strong> yüksek doz aralıklı{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>40 mg IV q12sa × 72 saat</strong>{' '}
              (Sachar et al. <em>JAMA Intern Med 2014</em> meta-analizinde tekrar kanama açısından sürekli infüzyona
              non-inferior!). 72 saat sonrası oral PPI’ye (40 mg PO 1–2×1) geçilir.
            </p>
          </div>

          {/* B. YBÜ Stres Ülseri Profilaksisi */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Activity className="w-4 h-4 text-teal-500 shrink-0" />
                <span>B. YBÜ Stres Ülseri Profilaksisi (SUP-ICU 2018 &amp; REVISE 2024)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-800'
                }`}
              >
                40 mg IV q24sa
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Yüksek riskli kritik hastalarda (<strong>mekanik ventilasyon &gt;48 sa, koagülopati, şok/vazopresör, ABH/RRT</strong>){' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>40 mg IV q24sa</strong>{' '}
              uygulanır. REVISE (<em>NEJM 2024</em>) ve SUP-ICU (<em>NEJM 2018</em>) verilerine göre{' '}
              <strong>klinik anlamlı GİS kanamasını anlamlı biçimde azaltır, 90 günlük mortaliteye nötrdür</strong>.
              Kritik kural: <strong>Risk faktörleri gerilediğinde ve tam enteral beslenme oturduğunda KESİLMELİDİR!</strong>
            </p>
          </div>

          {/* C. Perioperatif Aspirasyon Profilaksisi & GÖRH */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Syringe className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>C. Perioperatif Aspirasyon Profilaksisi &amp; GÖRH</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                40 mg IV (30–60 dk Önce)
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Yüksek aspirasyon riski taşıyan seçilmiş hastalarda (<strong>morbid obezite, gebelik/sezaryen, acil cerrahi,
              hiatal herni, ağır semptomatik GÖRH</strong>) anestezi indüksiyonundan <strong>30–60 dk önce</strong>{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>40 mg IV</strong> uygulanır.
              Gastrik pH&apos;yı <strong>&gt;2,5</strong> üzerine çıkarır; ancak{' '}
              <strong className={isDark ? 'text-amber-300' : 'text-amber-800'}>mide boşalmasını hızlandırmaz</strong>{' '}
              (prokinetik değildir; RSI veya acil tok hastada sodyum sitrat yerine tek başına geçmez!).
            </p>
          </div>

          {/* D. Pediatrik IV Dozaj */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Baby className="w-4 h-4 text-amber-500 shrink-0" />
                <span>D. Pediatrik IV Dozaj (GÖRH / Stres Ülseri / GİS Kanama)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                }`}
              >
                0,5–1 mg/kg · Maks 40 mg
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Çocuklarda IV uygulama:{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>0,5–1 mg/kg/doz</strong>{' '}
              <strong>q12–24sa</strong> (<strong>maksimum tek doz 40 mg</strong>). 10 mL SF dilüsyon (4 mg/mL) ile
              ≥2 dk yavaş IV veya 0,4 mg/mL dilüsyonla 15 dk infüzyon olarak verilir. (Not: Bebek ve küçük çocuklarda
              IV kullanım pediatrik gastroenteroloji/YBÜ off-label konsensüs dozlarına dayanır.)
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. ETKİLEŞİMLİ 3 SEKMELİ DOZ & İNFÜZYON HESAPLAYICI (#sec-hesaplayici) */}
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
              <Layers className={`w-5 h-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
              <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                Etkileşimli Pantoprazol Doz, İnfüzyon &amp; SUP Karar Hesaplayıcı
              </h2>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Flakon: <span className="font-mono font-semibold">40 mg liyofilize + 10 mL SF (4 mg/mL)</span> · İnfüzyon:{' '}
              <span className="font-mono font-semibold">0,8 mg/mL (10 mL/sa)</span> veya{' '}
              <span className="font-mono font-semibold">0,4 mg/mL (20 mL/sa)</span>
            </p>
          </div>
          <MonographCopyButton
            isDark={isDark}
            label="Order Özeti Kopyala"
            getText={buildCopySummary}
          />
        </div>

        {/* 3 Sekme Seçici */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(
            [
              {
                id: 'ugib',
                label: '1. Akut Üst GİS Kanaması',
                badge: '80 mg + 8 mg/sa vs 40 mg q12sa',
              },
              {
                id: 'icu_sup',
                label: '2. YBÜ Stres Ülseri Profilaksisi',
                badge: 'REVISE 2024 / SUP-ICU · 40 mg q24sa',
              },
              {
                id: 'periop_peds',
                label: '3. Perioperatif & Pediatrik Doz',
                badge: '40 mg IV · Ped 0,5–1 mg/kg',
              },
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
                <span
                  className={`block text-[10px] font-mono uppercase tracking-wider font-bold ${
                    isDark ? 'text-teal-400' : 'text-teal-700'
                  }`}
                >
                  {tab.badge}
                </span>
                <span className="block text-xs sm:text-sm font-bold mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Ortak Erişkin Ağırlık & Obezite Doz Skaler Yardımcısı */}
        <div className="space-y-3">
          {!(activeTab === 'periop_peds' && periopPedsMode === 'pediatric') && (
            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label
                  htmlFor={adultWeightSliderId}
                  className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                >
                  Erişkin Hasta Ağırlığı (kg) — Erişkinde sabit 40 mg / 80 mg rejim uygulanır; obezlerde TBW artışı gerekmez
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={adultWeightInputId}
                    type="number"
                    min={35}
                    max={200}
                    value={adultWeightKg}
                    onChange={(e) => setAdultWeightKg(Math.min(200, Math.max(35, Number(e.target.value) || 75)))}
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
                id={adultWeightSliderId}
                type="range"
                min={35}
                max={200}
                step={1}
                value={adultWeightKg}
                onChange={(e) => setAdultWeightKg(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
            </div>
          )}

          <ObesityDosingScaler
            isDark={isDark}
            drugName="Pantoprazol"
            recommendedScalar="IBW"
            secondaryScalar={{ type: 'LBW', context: 'Pediatrik Obezite (Maks 40 mg)' }}
            rationale="Pantoprazol küçük dağılım hacmine (~0,15–0,3 L/kg) ve yüksek albumin bağlanmasına (~%98) sahiptir. Erişkin obezlerde standart sabit 40 mg (veya akut kanamada 80 mg bolus + 8 mg/sa) doz yeterlidir; TBW ile artırılmaz. Pediatrik obez çocuklarda kg bazlı doz (0,5–1 mg/kg) IBW/LBW üzerinden hesaplanmalı ve asla 40 mg/doz tavanını aşmamalıdır."
            currentWeightKg={activeTab === 'periop_peds' && periopPedsMode === 'pediatric' ? pedWeightKg : adultWeightKg}
            onApplyWeight={(w) => {
              if (activeTab === 'periop_peds' && periopPedsMode === 'pediatric') {
                setPedWeightKg(Math.min(60, Math.max(3, Math.round(w))));
              } else {
                setAdultWeightKg(Math.min(200, Math.max(35, Math.round(w))));
              }
            }}
          />
        </div>

        {/* ── TAB 1: AKUT ÜST GİS KANAMASI ── */}
        {activeTab === 'ugib' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <span className={`block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Tedavi Protokolü Seçimi (ACG 2021 / ESGE 2021)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUgibRegimen('continuous')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    ugibRegimen === 'continuous'
                      ? isDark
                        ? 'border-rose-500 bg-rose-950/35 text-white'
                        : 'border-rose-500 bg-rose-50 text-rose-950'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">Sürekli İnfüzyon (Klasik)</div>
                  <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    80 mg IV bolus → 8 mg/sa × {ugibDurationHours} sa
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setUgibRegimen('intermittent')}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    ugibRegimen === 'intermittent'
                      ? isDark
                        ? 'border-teal-500 bg-teal-950/35 text-white'
                        : 'border-teal-500 bg-teal-50 text-teal-950'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">Yüksek Doz Aralıklı (Sachar 2014)</div>
                  <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    40 mg IV q12sa × {ugibDurationHours} sa (Non-inferior)
                  </div>
                </button>
              </div>

              {ugibRegimen === 'continuous' ? (
                <div className="space-y-2">
                  <span className={`block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    İnfüzyon Torbası Konsantrasyonu (80 mg = 2 Flakon / Torba)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInfusionConcMode('conc_0_8')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        infusionConcMode === 'conc_0_8'
                          ? isDark
                            ? 'border-indigo-500 bg-indigo-950/35 text-white'
                            : 'border-indigo-500 bg-indigo-50 text-indigo-950'
                          : isDark
                            ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono">80 mg / 100 mL (0,8 mg/mL)</div>
                      <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Pompa: <strong>10 mL/sa</strong> · Sıvı kısıtlı hastalarda tercih
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setInfusionConcMode('conc_0_4')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        infusionConcMode === 'conc_0_4'
                          ? isDark
                            ? 'border-indigo-500 bg-indigo-950/35 text-white'
                            : 'border-indigo-500 bg-indigo-50 text-indigo-950'
                          : isDark
                            ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono">80 mg / 200 mL (0,4 mg/mL)</div>
                      <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Pompa: <strong>20 mL/sa</strong> · Periferik damar dostu dilüsyon
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIntermittentWithBolus((v) => !v)}
                  className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer ${
                    intermittentWithBolus
                      ? isDark
                        ? 'border-amber-500 bg-amber-950/30 text-amber-200'
                        : 'border-amber-400 bg-amber-50 text-amber-900'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <span>Başlangıç 80 mg IV Yükleme Bolusu Ekle (ESGE opsiyonu)</span>
                  <span className="font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                    {intermittentWithBolus ? '80 mg + q12sa 40 mg' : 'Saf 40 mg q12sa'}
                  </span>
                </button>
              )}

              {/* Süre Slider */}
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor={ugibDurationSliderId} className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    IV Tedavi Süresi (Standart: 72 saat)
                  </label>
                  <span className={`font-mono font-bold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                    {ugibDurationHours} saat ({(ugibDurationHours / 24).toFixed(1).replace('.', ',')} gün)
                  </span>
                </div>
                <input
                  id={ugibDurationSliderId}
                  type="range"
                  min={24}
                  max={72}
                  step={12}
                  value={ugibDurationHours}
                  onChange={(e) => setUgibDurationHours(Number(e.target.value))}
                  className="w-full accent-teal-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>24 sa</span>
                  <span>48 sa</span>
                  <span className={isDark ? 'text-teal-400 font-bold' : 'text-teal-700 font-bold'}>72 sa (Standart)</span>
                </div>
              </div>
            </div>

            {/* Sağ Çıktılar */}
            <div className="space-y-3">
              {ugibRegimen === 'continuous' ? (
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-rose-950/20 border-rose-900/50' : 'bg-rose-50/70 border-rose-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-rose-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Yükleme + Pompa Hızı</span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                      {infusionRateMlHr.toFixed(0)} mL/sa
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      = 8 mg/sa ({concMgMl.toFixed(1).replace('.', ',')} mg/mL)
                    </span>
                    <span className={`text-[10px] font-semibold block mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Önce: 80 mg (2 flakon) IV bolus
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-rose-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {ugibDurationHours} Saat Toplam Flakon
                    </span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {continuousPracticalVials} flakon
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Net: {continuousTotalMg} mg (min {continuousNetVials} flakon)
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      2 bolus + {continuousInfusionBags} torba × 80 mg (her torba {hoursPerBag} sa)
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border col-span-2 text-xs leading-relaxed ${
                      isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-rose-100 text-slate-700'
                    }`}
                  >
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>Hazırlama &amp; Hat Güvenliği:</strong>{' '}
                    Her 10 saatte bir <strong>2 flakon (80 mg)</strong> 10&apos;ar mL SF ile çözülüp{' '}
                    <strong>{bagVolumeMl} mL SF/D5W</strong> torbasına eklenir →{' '}
                    <strong>{infusionRateMlHr.toFixed(0)} mL/sa</strong> hızla <strong>ayrı IV lümenden</strong>{' '}
                    infüze edilir (pH 9–10,5 nedeniyle Noradrenalin/Midazolam/Vankomisin ile aynı hattan VERİLMEZ!).
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Aralıklı İdame Rejimi</span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                      40 mg q12sa
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      {intermittentWithBolus ? 'İlk doz 80 mg IV bolus + q12sa 40 mg' : '1 flakon IV 12 saatte bir'}
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      10 mL SF ≥2 dk veya 100 mL SF 15 dk
                    </span>
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">
                      {ugibDurationHours} Saat Toplam Flakon
                    </span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {intermittentVials} flakon
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Toplam: {intermittentTotalMg} mg ({intermittentIntervals} doz)
                    </span>
                    <span className={`text-[10px] block mt-0.5 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      Sürekli infüzyona göre ~{Math.max(0, continuousPracticalVials - intermittentVials)} flakon tasarruf!
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border col-span-2 text-xs leading-relaxed ${
                      isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-teal-100 text-slate-700'
                    }`}
                  >
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>Kanıt Notu (Sachar JAMA Intern Med 2014 &amp; ACG 2021):</strong>{' '}
                    Yüksek riskli kanayan ülserlerde yüksek doz aralıklı PPI rejimi (40 mg IV q12sa), 7 günlük tekrar
                    kanama, cerrahi gereksinim ve mortalite açısından sürekli infüzyona <strong>non-inferior</strong>{' '}
                    bulunmuştur; üstelik sürekli ayrı IV lümen işgali ve pompa hatası riskini azaltır.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 2: YBÜ STRES ÜLSERİ PROFİLAKSİSİ (REVISE / SUP-ICU) ── */}
        {activeTab === 'icu_sup' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2.5">
              <span className={`block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                REVISE (NEJM 2024) / SUP-ICU (NEJM 2018) Risk Kontrol Listesi
              </span>

              <div className="space-y-2">
                {SUP_RISK_FACTORS.map((rf) => {
                  const checked = selectedSupRisks.includes(rf.id);
                  return (
                    <button
                      key={rf.id}
                      type="button"
                      onClick={() => toggleSupRisk(rf.id)}
                      className={`w-full p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                        checked
                          ? isDark
                            ? 'border-teal-500 bg-teal-950/30 text-white'
                            : 'border-teal-500 bg-teal-50 text-teal-950'
                          : isDark
                            ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          checked ? 'text-teal-500' : isDark ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      />
                      <div>
                        <div className="text-xs font-bold leading-snug">{rf.label}</div>
                        <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{rf.sublabel}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setSupRiskResolved((v) => !v)}
                className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer ${
                  supRiskResolved
                    ? isDark
                      ? 'border-amber-500 bg-amber-950/35 text-amber-200'
                      : 'border-amber-400 bg-amber-50 text-amber-900'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                      : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <span>Ekstübe / Risk Faktörü Geriledi &amp; Tam Enteral Beslenme Oturdu</span>
                <span className="font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                  {supRiskResolved ? 'KESME ZAMANI!' : 'Hayır'}
                </span>
              </button>
            </div>

            {/* Sağ Karar Çıktısı */}
            <div className="space-y-3">
              {supRiskResolved ? (
                <div
                  className={`p-4 rounded-xl border-2 space-y-2.5 ${
                    isDark
                      ? 'border-amber-500 bg-amber-950/35 text-amber-100'
                      : 'border-amber-400 bg-amber-50 text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-black text-sm">
                    <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
                    <span>DEPRESCRIBING UYARISI: STRES ÜLSERİ PROFİLAKSİSİNİ KESİN!</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Mekanik ventilasyon sonlanıp koagülopati/şok gerilediğinde ve tam enteral beslenme sağlandığında
                    stres ülseri profilaksisi sürdürülmemelidir. YBÜ’den servise veya taburculuğa gereksiz PPI aktarımı{' '}
                    <strong>C. difficile enfeksiyonu, pnömoni ve hipomagnezemi</strong> yükünü artırır.
                  </p>
                </div>
              ) : hasSupIndication ? (
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                      <span className="text-[10px] font-bold uppercase text-slate-500">YBÜ SUP Order</span>
                      <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                        40 mg IV
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">Günde 1 kez (q24sa)</span>
                    </div>

                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                      <span className="text-[10px] font-bold uppercase text-slate-500">Seçili Risk Sayısı</span>
                      <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                        {selectedSupRisks.length} faktör
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">1 flakon / gün · Günlük değerlendir</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSupRoute('iv_push')}
                      className={`p-2 rounded-lg border text-xs font-bold cursor-pointer ${
                        supRoute === 'iv_push'
                          ? isDark
                            ? 'border-teal-500 bg-teal-900/40 text-teal-200'
                            : 'border-teal-500 bg-white text-teal-800'
                          : isDark
                            ? 'border-slate-800 bg-slate-900/50 text-slate-400'
                            : 'border-slate-200 bg-white/60 text-slate-600'
                      }`}
                    >
                      10 mL SF ≥2 dk Yavaş IV
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupRoute('iv_infusion')}
                      className={`p-2 rounded-lg border text-xs font-bold cursor-pointer ${
                        supRoute === 'iv_infusion'
                          ? isDark
                            ? 'border-teal-500 bg-teal-900/40 text-teal-200'
                            : 'border-teal-500 bg-white text-teal-800'
                          : isDark
                            ? 'border-slate-800 bg-slate-900/50 text-slate-400'
                            : 'border-slate-200 bg-white/60 text-slate-600'
                      }`}
                    >
                      100 mL SF 15 dk İnfüzyon
                    </button>
                  </div>

                  <div
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-teal-100 text-slate-700'
                    }`}
                  >
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>REVISE (NEJM 2024) &amp; SUP-ICU (NEJM 2018):</strong>{' '}
                    İnvaziv mekanik ventilasyondaki kritik hastalarda <strong>Pantoprazol 40 mg IV q24sa</strong> klinik
                    anlamlı üst GİS kanamasını plaseboya göre anlamlı biçimde azaltır (~%1 vs %3,5; REVISE 2024), 90 günlük
                    mortalite üzerine nötrdür ve pnömoni/C. diff oranlarında anlamlı artış göstermemiştir. Yine de her sabah
                    vizitinde devam gerekliliği sorgulanmalıdır.
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl border space-y-2 text-xs sm:text-sm ${
                    isDark ? 'border-slate-700 bg-slate-950/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Rutin Stres Ülseri Profilaksisi Endikasyonu Yok
                  </div>
                  <p className="leading-relaxed">
                    Yüksek riskli kanama faktörü bulunmayan düşük riskli hastalarda rutin IV Pantoprazol başlanması
                    önerilmez. Erken enteral beslenme tek başına en fizyolojik mukozal koruyucudur.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: PERİOPERATİF ASPİRASYON PROFİLAKSİSİ & PEDİATRİK DOZ ── */}
        {activeTab === 'periop_peds' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPeriopPedsMode('periop_adult')}
                className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer ${
                  periopPedsMode === 'periop_adult'
                    ? isDark
                      ? 'border-indigo-500 bg-indigo-950/40 text-white'
                      : 'border-indigo-500 bg-indigo-50 text-indigo-950'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                      : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                Erişkin Perioperatif Aspirasyon Profilaksisi
              </button>
              <button
                type="button"
                onClick={() => setPeriopPedsMode('pediatric')}
                className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold cursor-pointer ${
                  periopPedsMode === 'pediatric'
                    ? isDark
                      ? 'border-amber-500 bg-amber-950/40 text-white'
                      : 'border-amber-500 bg-amber-50 text-amber-950'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                      : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                Pediatrik Ağırlık Bazlı Doz (0,5–1 mg/kg · Maks 40 mg)
              </button>
            </div>

            {periopPedsMode === 'periop_adult' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className={`block text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    Perioperatif Yüksek Aspirasyon Riski Faktörleri (ASA / ESAIC)
                  </span>
                  {(
                    [
                      { id: 'obesity', label: 'Morbid Obezite (BMI ≥35–40 kg/m²)' },
                      { id: 'gerd', label: 'Şiddetli GÖRH / Hiatal Herni / Dispepsi' },
                      { id: 'pregnancy', label: 'Gebelik / Sezaryen (≥2. Trimester)' },
                      { id: 'emergency', label: 'Acil Cerrahi / Gecikmiş Mide Boşalması (DM, GLP-1 agonisti)' },
                    ] as const
                  ).map((item) => {
                    const active = periopHighRiskFactors.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => togglePeriopRisk(item.id)}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 cursor-pointer ${
                          active
                            ? isDark
                              ? 'border-indigo-500 bg-indigo-950/35 text-white'
                              : 'border-indigo-500 bg-indigo-50 text-indigo-950'
                            : isDark
                              ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            active ? 'text-indigo-500' : isDark ? 'text-slate-600' : 'text-slate-300'
                          }`}
                        />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                      <span className="text-[10px] font-bold uppercase text-slate-500">Perioperatif Doz</span>
                      <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                        40 mg IV
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">1 flakon + 10 mL SF ≥2 dk</span>
                    </div>

                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                      <span className="text-[10px] font-bold uppercase text-slate-500">Zamanlama</span>
                      <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                        30–60 dk
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 block">İndüksiyondan önce</span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'
                    }`}
                  >
                    <strong>Kritik Anestezi Notu:</strong> Pantoprazol mide sıvısının pH&apos;sını <strong>&gt;2,5</strong>{' '}
                    üzerine çıkararak kimyasal pnömoni şiddetini azaltır; ancak <strong>mide boşalmasını hızlandırmaz</strong>{' '}
                    ve halihazırda midede bulunan asidi anında nötralize etmez! Acil/tok hastalarda{' '}
                    <strong>Hızlı Ardışık İndüksiyon (RSI)</strong>, gerekirse 0,3 M Sodyum Sitrat (30 mL PO — anında pH
                    nötralizasyonu) ve gastrik ultrason değerlendirmesinin yerini tutmaz.
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <label htmlFor={pedWeightSliderId} className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                        Pediatrik Ağırlık (kg — Obez çocukta IBW/LBW)
                      </label>
                      <div className="flex items-center gap-1.5">
                        <input
                          id={pedWeightInputId}
                          type="number"
                          min={3}
                          max={60}
                          value={pedWeightKg}
                          onChange={(e) => setPedWeightKg(Math.min(60, Math.max(3, Number(e.target.value) || 20)))}
                          className={`w-16 px-2 py-1 rounded-lg border font-mono font-bold text-xs text-right ${
                            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                        <span className="text-xs font-mono text-slate-500">kg</span>
                      </div>
                    </div>
                    <input
                      id={pedWeightSliderId}
                      type="range"
                      min={3}
                      max={60}
                      step={1}
                      value={pedWeightKg}
                      onChange={(e) => setPedWeightKg(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <label htmlFor={pedDoseSliderId} className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                        Hedef Doz (0,5 – 1,0 mg/kg/doz · Maks 40 mg)
                      </label>
                      <span className={`font-mono font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                        {pedDoseMgKg.toFixed(1).replace('.', ',')} mg/kg
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

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPedFreq('q24h')}
                      className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                        pedFreq === 'q24h'
                          ? isDark
                            ? 'border-teal-500 bg-teal-950/35 text-teal-200'
                            : 'border-teal-500 bg-teal-50 text-teal-800'
                          : isDark
                            ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      q24sa (GÖRH / SUP)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPedFreq('q12h')}
                      className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                        pedFreq === 'q12h'
                          ? isDark
                            ? 'border-rose-500 bg-rose-950/35 text-rose-200'
                            : 'border-rose-500 bg-rose-50 text-rose-800'
                          : isDark
                            ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      q12sa (Ağır GİS Kanama)
                    </button>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-amber-950/15 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Tek Pediatrik Doz</span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                      {pedCappedMg.toFixed(1).replace('.', ',')} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Günlük: {pedDailyMg.toFixed(1).replace('.', ',')} mg/gün ({pedFreq === 'q12h' ? '2×1' : '1×1'})
                    </span>
                    {pedCapHit && (
                      <span className={`text-[10px] font-bold block mt-0.5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                        40 mg/doz erişkin tavanına sınırlandı!
                      </span>
                    )}
                  </div>

                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Çekilecek Hacim</span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {pedReconstitutedMl.toFixed(1).replace('.', ',')} mL
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Stok (4 mg/mL = 40 mg/10 mL)
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      0,4 mg/mL dilüsyonda: {pedMiniBagMl.toFixed(1).replace('.', ',')} mL (15 dk)
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl border col-span-2 text-xs leading-relaxed ${
                      isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-amber-100 text-slate-700'
                    }`}
                  >
                    <strong>Pediatrik Uygulama:</strong> 1 flakon (40 mg) + 10 mL %0,9 NaCl = <strong>4 mg/mL</strong>.
                    Hesaplanan <strong>{pedReconstitutedMl.toFixed(1).replace('.', ',')} mL</strong> en az 2 dakikada yavaş
                    IV veya 0,4 mg/mL konsantrasyona sulandırılarak 15 dakikada infüze edilir. Öncesi/sonrası SF flush
                    uygulayın.
                  </div>
                </div>
              </div>
            )}
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
            name: 'Pantpas® / Pulcet® / Panto® / Pantactive® 40 mg IV Liyofilize Flakon',
            presentation: '40 mg liyofilize toz içeren cam flakon + 10 mL %0,9 NaCl çözücü ampul (IV kullanım)',
            concentration: '1 Flakon = 40 mg → 10 mL SF ile 4 mg/mL',
            saltOrBaseNote:
              '45,1 mg pantoprazol sodyum seskihidrat = 40 mg serbest pantoprazol bazına eşdeğerdir. Sulandırıldığında pH 9–10,5 arası berrak, renksiz-açık sarımsı alkali çözelti oluşur. IM uygulanmaz!',
            alertLevel: 'high',
          },
          {
            name: 'Pantpas® / Pulcet® / Panto® 40 mg & 20 mg Enterik Kaplı Tablet (PO)',
            presentation: 'Gastro-rezistan (enterik kaplı) oral tabletler (14 / 28 tablet kutu)',
            concentration: '20 mg veya 40 mg / tablet',
            saltOrBaseNote:
              'Mide asidinde hızla inaktive olur! Tabletler ASLA ezilmemeli, çiğnenmemeli veya kırılmamalıdır; yemekten 30–60 dk önce bütün olarak suyla yutulmalıdır. Nazogastrik tüpten ezilerek VERİLMEZ!',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Direkt Yavaş IV Enjeksiyon (4 mg/mL): 1 flakon (40 mg) + 10 mL %0,9 NaCl → en az 2 dakikada yavaş IV (akut 80 mg yüklemede 2 flakon / 20 mL SF → en az 2–5 dk veya 100 mL SF içinde 15 dk).',
          'Kısa İntermitan IV İnfüzyon (0,4 mg/mL): 1 flakon (40 mg) önce 10 mL SF ile çözülüp 100 mL %0,9 NaCl veya %5 Dekstroz içine aktarılır → 15 dakikada IV infüzyon.',
          'Akut Üst GİS Kanaması Sürekli İnfüzyon — Standart (0,8 mg/mL): 2 flakon (80 mg) + 100 mL %0,9 NaCl veya %5 Dekstroz → 10 mL/sa (= 8 mg/sa; 1 torba = 10 saat).',
          'Akut Üst GİS Kanaması Sürekli İnfüzyon — Seyreltik (0,4 mg/mL): 2 flakon (80 mg) + 200 mL %0,9 NaCl veya %5 Dekstroz → 20 mL/sa (= 8 mg/sa; periferik damar dostu).',
          '1,2 Mikron Filtre & Partikül Kontrol Notu: Güncel EDTA içeren flakonlarda rutin in-line filtre zorunluluğu kalkmış olmakla birlikte, EDTA’sız eski/farklı ticari formülasyonlarda veya çoklu hat/şüpheli partikül durumlarında 1,2 mikron in-line filtre kullanılması önerilir. Bulanık, renk değiştirmiş veya partiküllü çözeltiler ASLA uygulanmamalıdır!',
        ]}
        concentrationTrapWarning="pH 9–10,5 Çökelti ve Enterik Tablet Tuzağı: Sulandırılmış Pantoprazol yüksek alkali olduğu için asidik ilaçlarla temas ettiğinde gözle görülür beyaz çökelti oluşturur. Ayrıca YBÜ’de oral enterik tabletin ezilerek NG/OG tüpten verilmesi ilacın mide asidinde tamamen bozulmasına ve tüpün tıkanmasına yol açar — enteral yol gerekiyorsa IV form veya sodyum bikarbonatlı/granül alternatifler tercih edilmelidir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="central-preferred"
        accessSummary="Periferik geniş ven veya santral venöz kateterden uygulanabilir. Ancak sulandırılmış çözeltinin yüksek alkali yapısı (pH 9–10,5) ve çok sayıda kritik YBÜ ilacıyla anında fiziksel çökelti oluşturması nedeniyle, sürekli infüzyonda (8 mg/sa) MÜSTAKİL (AYRI) LÜMEN kullanılması; aralıklı dozlarda ise uygulama öncesi ve sonrası hattın 10–20 mL %0,9 NaCl ile yıkanması zorunludur."
        phRange="9,0 – 10,5 (Güçlü Alkali Çözelti!)"
        osmolalityNote="40 mg / 10 mL %0,9 NaCl çözeltisi yaklaşık izotonik-hafif hipertoniktir (~310–350 mOsm/kg), ancak yüksek alkali pH nedeniyle küçük kırılgan periferik venlerde kimyasal flebit ve ekstravazasyonda doku irritasyonu yapabilir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF — Birincil Tercih)',
          '%5 Dekstroz (D5W — 0,4–0,8 mg/mL dilüsyonlar)',
          'Ringer Laktat (RL — bazı KÜB’lerde sınırlı; öncelikle SF veya D5W tercih edin)',
        ]}
        stabilityNote="10 mL SF ile sulandırılmış flakon oda sıcaklığında kimyasal olarak 12 saate kadar (bazı KÜB’lerde 2–6 sa) stabil olsa da koruyucu içermez; mikrobiyolojik güvenlik açısından derhal veya en geç 12 saat içinde tüketilmeli, 24 saati aşan sürekli infüzyon torbaları yenilenmelidir. Işıktan aşırı maruziyetten koruyun."
        ySiteCompatible={[
          '%0,9 NaCl (SF)',
          '%5 Dekstroz (D5W)',
          'Potasyum Klorür (standart seyreltik)',
          'Sefazolin / Ampisilin (yine de ayrı SF flush önerilir)',
        ]}
        ySiteIncompatible={[
          'Midazolam (anında yoğun çökelti!)',
          'Noradrenalin / Norepinefrin (alkali degradasyon & çökelti!)',
          'Dobutamin / Dopamin / Adrenalin (katekolamin inaktivasyonu!)',
          'Vankomisin (bulanıklık & çökelti!)',
          'Esomeprazol / Asidik Çözeltiler',
          'Amiodaron · Haloperidol · Kalsiyum Glukonat',
          'Propofol · TPN / Lipid Emülsiyonları · Kan Ürünleri',
        ]}
        extravasationProtocol="Yüksek alkali pH (9–10,5) nedeniyle ekstravazasyonda lokal ağrı, eritem, ödem ve kimyasal flebit gelişebilir. Ekstravazasyon fark edildiğinde infüzyonu hemen durdurun, kateteri çıkarmadan hafif aspirasyon deneyin, ekstremiteyi eleve edin ve soğuk kompres uygulayın. Büyük hacimli alkali doku hasarı varsa cerrahi/plastik değerlendirme isteyin."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Böbrek yetmezliğinde (eGFR <30 mL/dk), hemodiyalizde ve CRRT’de doz ayarlaması GEREKMEZ; %98 protein bağlanması nedeniyle diyalizle anlamlı atılmaz."
        renalDetails={[
          'Hafif–Ağır KBY (eGFR <15–60 mL/dk): Ana ilaç tamamen karaciğerde metabolize olur; idrarla yalnızca inaktif metabolitler atıldığından standart 40 mg IV/PO doz güvenle kullanılır.',
          'Hemodiyaliz & CRRT (CVVH / CVVHDF): Çok yüksek albumin bağlanması (~%98) nedeniyle ekstrakorporeal klirens ihmal edilebilir düzeydedir; diyaliz sonrası ek doz gerekmez.',
          'Nefrotoksisite İzlemi: Açıklanamayan yeni gelişen kreatinin yüksekliği, eozinofili veya steril piyüride nadir PPI ilişkili Akut İnterstisyel Nefrit (AIN) akılda tutulmalıdır.',
        ]}
        hepaticSummary="Hafif–orta sirozda (Child-Pugh A–B) standart doz uygulanır; ağır karaciğer yetmezliğinde (Child-Pugh C) kronik/idame doz 20–40 mg/gün veya gün aşırı 40 mg ile sınırlandırılmalıdır."
        hepaticDetails={[
          'Child-Pugh C Ağır Siroz: Hepatik klirens belirgin azalır; plazma t½ 7–9 saate uzar ve AUC 5–7 kat artar. İdame tedavide 20 mg/gün veya 40 mg gün aşırı (maks 20–40 mg/gün) önerilir ve transaminazlar (ALT/AST) izlenir.',
          'Akut Üst GİS Kanaması İstisnası: Sirotik hastada akut kanamada kısa süreli (72 sa) standart IV protokol uygulanabilir; ancak varis kanaması şüphesinde asıl hayat kurtarıcı tedavi Vazoaktif ajan (Oktreotid/Terlipressin) + Antibiyotik profilaksisi (Seftriakson) + Acil Endoskopik Bant Ligasyonudur!',
          'Sirozda Kronik PPI Riski: Endikasyonsuz kronik PPI kullanımı sirotik hastalarda Spontan Bakteriyel Peritonit (SBP) ve hepatik ensefalopati riskini artırabilir — yalnızca net endikasyonda sürdürün.',
        ]}
        {...STANDALONE_ORGAN_PART2['pantoprazole']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="AGS Beers 2023: >8 Hafta Endikasyonsuz KAÇININ!"
        geriatricPoints={[
          'AGS Beers 2023 Güçlü Uyarı (>8 Hafta Kuralı): Yüksek riskli bir endikasyon (Barrett özofagusu, eroziv özofajit, kronik NSAİİ/antiplatelet gastroproteksiyonu veya patolojik hipersekretuar durum) bulunmadıkça >65 yaş hastalarda >8 hafta PPI kullanımından KAÇINILMALIDIR.',
          'Yaşlıda Kümülatif Risk Profili: Uzun süreli PPI kullanımı yaşlılarda Clostridioides difficile enfeksiyonu, toplum/hastane kökenli pnömoni, osteoporoz ve kalça/vertebra kırığı, hipomagnezemi, Vitamin B12 eksikliği ve polifarmasi yükünü belirgin artırır.',
          'Akut Dozaj & Taburculuk Yönetimi: Akut üst GİS kanaması veya yüksek riskli YBÜ SUP için yaşlıda standart 40 mg / 80 mg doz kullanılır (yaşa bağlı akut azaltma gerekmez); ancak taburculuk reçetesinde endikasyon mutlaka gözden geçirilerek kesilmelidir.',
        ]}
        obesityWeightScalarBadge="Erişkinde Sabit 40 mg / 80 mg · TBW Artışı Yok"
        obesityPoints={[
          'Sabit Erişkin Dozajı: Dağılım hacmi düşük (~0,15–0,3 L/kg) olduğundan morbid obez (BMI ≥40 kg/m²) erişkinlerde TBW’ye göre doz artırılması gerekmez; standart 40 mg IV veya akut kanamada 80 mg bolus + 8 mg/sa yeterlidir.',
          'Perioperatif Aspirasyon Riski: Morbid obezite yüksek intragastrik basınç ve GÖRH sıklığı nedeniyle aspirasyon riskini artırır; anestezi indüksiyonundan 30–60 dk önce 40 mg IV Pantoprazol sık tercih edilen profilaktik bileşendir.',
          'Pediatrik Obezite: Ağırlık bazlı pediatrik hesaplamada (0,5–1 mg/kg) IBW/LBW kullanılmalı ve tek doz asla 40 mg erişkin tavanını aşmamalıdır.',
        ]}
        clinicalNote="Yaşlı hastaların önemli bir bölümü hastane veya YBÜ yatışı sırasında başlanan stres ülseri profilaksisiyle taburcu edilip yıllarca gereksiz PPI kullanmaktadır — her taburculukta ‘PPI Durdurma / Azaltma’ kontrolü yapılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK & LAKTASYON (#sec-gebelik)                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Büyük epidemiyolojik kohortlarda majör konjenital malformasyon artışı gösterilmemiştir; klinik olarak endike olduğunda (ağır GÖRH, peptik ülser/GİS kanaması, yüksek riskli obstetrik aspirasyon profilaksisi) gebelikte kullanılabilir."
        pregnancyDetails={[
          'Teratojenite Verisi: Danimarka ulusal kayıtları dahil geniş popülasyon çalışmalarında 1. trimester PPI (pantoprazol dahil) maruziyeti ile majör doğum defektleri arasında anlamlı ilişki saptanmamıştır (eski FDA Kategori B; güncel PLLR verileriyle uyumlu).',
          'Obstetrik Anestezi & Sezaryen: Gebelikte alt özofagus sfinkter tonusu azaldığından yüksek aspirasyon riski vardır. Elektif/acil sezaryen öncesi yüksek riskli gebelerde 40 mg IV (indüksiyondan 30–60 dk önce) mide pH’sını güvenli düzeye çıkarır; acil operasyonda anında etki için 0,3 M Sodyum Sitrat ile kombine edilir.',
        ]}
        lactationSummary="Anne sütüne çok düşük miktarda geçer (Relatif İnfant Dozu <%0,2) ve sütteki eser miktar bebeğin mide asidinde hızla parçalanır; emzirme döneminde kullanımı genellikle GÜVENLİ kabul edilir."
        lactationDetails={[
          'LactMed & Farmakokinetik Veri: 40 mg oral/IV doz sonrası anne sütünde yalnızca ilk 2–4 saatte çok düşük düzeylerde saptanır ve 6–8 saatte ölçülemez düzeye iner; emzirilen bebekte bildirilen klinik yan etki beklenmez.',
          'Pratik Öneri: Emziren annede emzirmeye ara verilmesi gerekmez; klinik endikasyon sürdüğü sürece en düşük etkin dozda kullanılabilir.',
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
            title: 'Hipomagnezemi → Dirençli Hipokalsemi & Hipokalemi',
            incidenceOrSeverity: 'Kronik >3 Ay · Kritik',
            detail:
              'İntestinal TRPM6/TRPM7 aracılı aktif Mg²⁺ emilimini bozar. Sekonder PTH baskılanmasıyla hipokalsemi, hipokalemi, tetani, nöbet ve QT uzaması/Torsades gelişebilir; PPI kesilmeden Mg replasmanı sıklıkla yetersiz kalır.',
            tone: 'rose',
          },
          {
            title: 'Clostridioides difficile İlişkili İshal (CDAD) & Enterik Enfeksiyon',
            incidenceOrSeverity: 'YBÜ & Antibiyotik + PPI',
            detail:
              'Gastrik asit bariyerinin uzun süre kalkması C. difficile spor/vejetatif kolonizasyonunu ve Salmonella/Campylobacter gastroenteriti riskini artırır. İshal gelişen hastada PPI gerekliliği derhal sorgulanmalıdır.',
            tone: 'rose',
          },
          {
            title: 'Akut İnterstisyel Nefrit (AIN) & KBY Riski',
            incidenceOrSeverity: 'İdiyosenkratik · Nadir',
            detail:
              'İmmün-aracılı tübülointerstisyel nefrit tedavi başlangıcından günler–aylar sonra ateş, döküntü, eozinofili veya izole kreatinin artışıyla ortaya çıkabilir; şüphede PPI derhal kesilmelidir.',
            tone: 'amber',
          },
          {
            title: 'Vitamin B12 & Demir Malabsorpsiyonu',
            incidenceOrSeverity: 'Uzun Süreli (>2–3 Yıl)',
            detail:
              'Hipoklorhidri gıdalardaki protein-bağlı Vitamin B12’nin ayrışmasını ve hem-dışı ferrik (Fe³⁺) demirin ferröz (Fe²⁺) forma indirgenmesini azaltarak megaloblastik veya demir eksikliği anemisine yol açabilir.',
            tone: 'indigo',
          },
          {
            title: 'Osteoporoz & Kemik Kırığı (Kalça / Vertebra / El Bileği)',
            incidenceOrSeverity: 'Kronik Yüksek Doz',
            detail:
              'Uzun süreli (>1 yıl) yüksek doz PPI kullanımı kalsiyum karbonat çözünürlüğü azalması ve hipergastrinemi/paratiroid ekseni üzerinden özellikle yaşlılarda kırık riskini artırır.',
            tone: 'amber',
          },
          {
            title: 'Rebound Asit Hipersekresyonu (RAHS)',
            incidenceOrSeverity: 'Ani Kesilme · >8 Hafta',
            detail:
              'Uzun süreli tedavinin aniden kesilmesi, kompansatuar hipergastrinemi ve ECL hücre hiperplazisine bağlı 2–4 hafta süren şiddetli dispepsi ve reflü alevlenmesine yol açar.',
            tone: 'teal',
          },
          {
            title: 'Kutanöz/Sistemik Lupus (CLE/SLE) & Ağır Cilt Reaksiyonları',
            incidenceOrSeverity: 'Nadir · İmmün Aracılı',
            detail:
              'Subakut kutanöz lupus eritematozus (anti-Ro/SSA pozitif), çok nadiren SJS, TEN, DRESS veya AGEP gelişebilir; açıklanamayan yaygın döküntü/mukoza tutulumunda ilaç kalıcı kesilir.',
            tone: 'rose',
          },
          {
            title: 'Akut IV Yan Etkiler (Flebit, Baş Ağrısı, İshal, ALT/AST ↑)',
            incidenceOrSeverity: '%1–5 · Hafif–Orta',
            detail:
              'Yüksek alkali pH’ya bağlı enjeksiyon yerinde tromboflebit/ağrı, baş ağrısı, bulantı, ishal, karın ağrısı ve nadir geri dönüşlü karaciğer enzim yükselmesi görülebilir.',
            tone: 'indigo',
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
            title: 'Klopidogrel + Pantoprazol (En Düşük CYP2C19 İnhibisyonu → 1. Tercih!)',
            detail:
              'Klopidogrelin aktif antiplatelet metabolitine dönüşümü CYP2C19 gerektirir. Omeprazol ve esomeprazol güçlü CYP2C19 inhibisyonu ile klopidogrel etkinliğini azaltabilir (FDA/EMA uyarısı). Pantoprazol en düşük CYP2C19 inhibisyonuna sahip olduğundan ikili antiplatelet tedavi (DAPT) alan koroner stent/AKS hastalarında gastroproteksiyon için 1. tercih PPI’dır!',
          },
          {
            title: 'Yüksek Doz Metotreksat (MTX) Toksisitesi (Renal BCRP / OAT3 Blokajı)',
            detail:
              'Onkoloji/hematoloji protokollerindeki yüksek doz Metotreksat (≥500 mg/m²) ile eş zamanlı Pantoprazol kullanımı, renal proksimal tübüler BCRP/OAT3 inhibisyonu nedeniyle MTX ve 7-OH-MTX atılımını geciktirerek ölümcül pansitopeni, mukozit ve ABH’ye yol açabilir. Yüksek doz MTX infüzyonu süresince PPI geçici kesilmeli (H₂ bloker düşünülmeli) ve serum MTX düzeyleri sıkı izlenmelidir.',
          },
          {
            title: 'Kronik Kullanımda Rutin Serum Magnezyum (Mg²⁺) İzlemi',
            detail:
              '>3 ay (özellikle >1 yıl) PPI alan veya birlikte digoksin, loop/tiyazid diüretik kullanan hastalarda tedavi öncesi ve periyodik serum Mg²⁺ düzeyi kontrol edilmelidir. Açıklanamayan hipokalsemi, hipokalemi, kas krampları veya QTc uzaması varlığında mutlaka Mg²⁺ bakın!',
          },
          {
            title: 'Yanlış Pozitif İdrar THC Taraması & Yalancı Kromogranin A (CgA) Yüksekliği',
            detail:
              'Pantoprazol idrar immünoassay uyuşturucu taramalarında yanlış pozitif tetrahidrokannabinol (THC / esrar) sonucuna neden olabilir; pozitif sonuç mutlaka GC-MS/LC-MS doğrulama yöntemiyle kontrol edilmelidir. Ayrıca kompansatuar hipergastrinemi nedeniyle nöroendokrin tümör belirteci Kromogranin A (CgA) yalancı yükselir (testten ≥14 gün önce kesilmelidir) ve H. pylori üre nefes/gaita antijen testlerinde yanlış negatiflik oluşur.',
          },
          {
            title: 'Rebound Asit Hipersekresyonu & Kademeli Kesme (Tapering)',
            detail:
              '>8 hafta PPI kullanan hastalarda ani kesilme sonrası 2–4 hafta süren şiddetli rebound reflü hastayı tekrar ilaca döndürür. Deprescribing sürecinde dozu 2–4 hafta boyunca yarıya indirmek (40 → 20 mg veya gün aşırı) ve gerektiğinde kısa süreli antasit/H₂ bloker köprüsü uygulamak başarıyı belirgin artırır.',
          },
          {
            title: 'Akut GİS Kanamasında Endoskopi & Varis Kanaması Ayrımı',
            detail:
              'Üst GİS kanamasında erken IV Pantoprazol başlanması acil endoskopiyi (≤24 saat) ASLA geciktirmemelidir. Sirotik / varis kanaması şüphesinde Pantoprazol tek başına yeterli değildir; derhal vazoaktif tedavi (Oktreotid/Terlipressin) ve profilaktik antibiyotik (Seftriakson) başlanmalıdır.',
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
          title: 'Asidik Kanalikül İyon Tuzağı & H⁺/K⁺-ATPaz (Cys813 / Cys822) Kovalent Disülfid İnhibisyonu',
          summary:
            'Pantoprazolün yüksek hedef seçiciliği ve uzun etki süresi, biyofiziksel pKa profili ile P-tipi proton pompasındaki benzersiz kovalent bağlanma bölgesine dayanır:',
          points: [
            'Biyofiziksel İyon Tuzağı (pKa1 ≈ 3,9): Nötral kan pH’sında (7,4) lipofilik ve yüksüz olan pantoprazol, gastrik pariyetal hücrelerin apikal sekretuar kanalikülüne (pH ~0,8–1,0) geçtiğinde piridin azotundan protonlanır, membran geçirgenliğini yitirir ve kanalikül lümeninde plazmaya kıyasla >1.000 kat yoğunlaşır.',
            'Siklik Sülfenamid Dönüşümü & Derin Cys822 Bağlanması: İkinci protonasyonla asit-katalizli yeniden düzenlenmeye uğrayarak elektrofilik siklik sülfenamide dönüşür. Tüm PPI’ler H⁺/K⁺-ATPaz α-alt biriminin transmembran TM5/TM6 bölgesindeki Cys813 kalıntısına bağlanırken, pantoprazol ek olarak membran içine gömülü Cys822 kalıntısına da kovalent disülfid (S–S) bağı oluşturur.',
            'Glutatyon İndirgemesine Direnç: Cys822 bölgesi hücre içi indirgeyici ajanlara (glutatyon) karşı sterik olarak daha korunaklı olduğundan, pantoprazolün oluşturduğu kovalent blokaj diğer bazı PPI’lere göre kimyasal geri dönüşüme daha dirençlidir; asit salgısının geri dönüşü fiilen yeni pompa sentezine (de novo turnover) bağımlıdır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Pariyetal Tubulovezikül Füzyonu, Son Ortak Yol Blokajı & Gastrin–ECL Geri Besleme Döngüsü',
          summary:
            'Pariyetal hücre içi üç ayrı fizyolojik uyarı yolağı apikal H⁺/K⁺-ATPaz translokasyonunda birleşir; bu son ortak noktanın kilitlenmesi güçlü nöroendokrin geri besleme oluşturur:',
          points: [
            'Üçlü Reseptör Yakınsaması (M3 / CCK-B / H2 → H⁺/K⁺-ATPaz): Vagal asetilkolin (M3 → Gq/Ca²⁺), antral gastrin (CCK-B → Gq/Ca²⁺) ve ECL hücre histamini (H2 → Gs/cAMP/PKA), sitoplazmik tubuloveziküllerde depolanan H⁺/K⁺-ATPaz pompalarının apikal kanalikül zarına füzyonunu tetikler. Pantoprazol bu son ortak pompayı kilitleyerek (H₂ blokerlerinden farklı olarak) hem bazal hem yemek/stres uyarımlı asidi >%90–98 baskılar.',
            'H⁺/K⁺ Değişim Stokiometrisi & Cl⁻ (CFTR/CLC-2) Eşleşmesi: Aktif pompa her ATP hidrolizi başına 1 H⁺ iyonunu lümene pompalarken 1 K⁺ iyonunu hücre içine alır; K⁺ kanalları (KCNQ1) ve apikal Cl⁻ kanallarıyla eşleşerek HCl oluşur. Pantoprazol ATPaz döngüsünü E2-P konformasyonunda durdurarak net HCl sekresyonunu keser.',
            'Antral Somatostatin ↓ → Hipergastrinemi & ECL Hiperplazisi: İntragastrik pH’nın sürekli >4 kalması antral D-hücrelerinden somatostatin salınımını azaltır; freni kalkan G-hücreleri yüksek miktarda gastrin salgılar. Kronik hipergastrinemi enterokromaffin-benzeri (ECL) hücrelerde trofik proliferasyona, Kromogranin A (CgA) artışına ve ilaç aniden kesildiğinde rebound asit hipersekresyonuna zemin hazırlar.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Gastrik Mukoza, Pepsin İnaktivasyonu & Pıhtı Stabilitesi → Hemostaz Fizyolojisi',
            tissueTarget: 'Ülser Tabanı · Trombosit Agregasyonu · Pepsin/Fibrin',
            accent: 'rose',
            points: [
              'Asidik ortamda (pH <4) pepsinojen aktif pepsine dönüşerek yeni oluşan fibrin pıhtısını hızla eritir ve trombosit agregasyonunu inhibe eder.',
              'İntragastrik pH >6 düzeyinde pepsin geri dönüşümsüz inaktive olur ve trombosit/koagülasyon kaskadı optimum çalışır — akut non-varisiyel üst GİS kanamasında 72 saatlik yüksek doz IV Pantoprazolün fizyolojik temelidir.',
            ],
          },
          {
            systemTitle: 'Gastrik Sıvı pH’sı vs Pilor Motilitesi → Perioperatif Aspirasyon Fizyolojisi',
            tissueTarget: 'Alveoler-Kapiller Bariyer · Mide Sıvısı pH & Volüm',
            accent: 'teal',
            points: [
              'Akciğer hasarı (Mendelson kimyasal pnömonisi) esas olarak aspire edilen sıvının pH <2,5 asiditesi ve >0,4 mL/kg hacmiyle ilişkilidir. İndüksiyondan 30–60 dk önce 40 mg IV Pantoprazol yeni asit üretimini keserek pH’yı >2,5 üzerine taşır.',
              'Düz kas veya vagal motilite üzerine prokinetik etkisi yoktur; bu nedenle dolu midede gastrik boşalmayı hızlandırmaz ve RSI ihtiyacını ortadan kaldırmaz.',
            ],
          },
          {
            systemTitle: 'İntestinal Epitel (TRPM6/7) & Mikrobiyota → Elektrolit, Kemik & Enfeksiyon Fizyolojisi',
            tissueTarget: 'Kolon/İleum TRPM6/7 · Gastrik Asit Bariyeri',
            accent: 'amber',
            points: [
              'Lümen pH yükselmesi intestinal epiteldeki TRPM6/TRPM7 magnezyum kanallarının Mg²⁺ taşıma verimini düşürerek renal kayıp olmaksızın derin hipomagnezemiye (ve PTH baskılanmasıyla dirençli hipokalsemiye) yol açar.',
              'Mide asidinin antimikrobiyal bariyer fonksiyonunun kalkması C. difficile, enterik bakteriler ve mikroaspirasyonla ilişkili alt solunum yolu kolonizasyonunu kolaylaştırır.',
            ],
          },
          {
            systemTitle: 'Hepatik CYP2C19/Sülfasyon & Renal Tübüler Taşıyıcılar → Farmakokinetik Etkileşim Fizyolojisi',
            tissueTarget: 'Hepatosit CYP2C19 / SULT · Proksimal Tübül BCRP / OAT3',
            accent: 'indigo',
            points: [
              'Karaciğerde O-demetilasyon sonrası hızlı Faz II sülfasyon yolağı sayesinde CYP2C19 inhibisyonu minimaldir (klopidogrel biyoaktivasyonu korunur).',
              'Renal proksimal tübülde BCRP (ABCG2) ve OAT3 taşıyıcılarını inhibe ederek yüksek doz Metotreksatın tübüler sekresyonunu bloke edebilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Aktif Pompa İşgal Kinetiği, H₂ Bloker Zamanlaması & Tavan Etkisi',
          summary:
            'Pantoprazol yalnızca aktif olarak asit salgılayan apikal pompaları bloke edebildiği için doz zamanlaması ve kombine asit supresyon stratejileri farmakodinamik açıdan kritiktir:',
          points: [
            'İlk Doz vs Kararlı Durum Tavanı: Tek bir oral veya standart IV 40 mg doz o an aktif olan pompaların yaklaşık %70’ini inhibe eder; yeni sentezlenen/uyanan pompalar nedeniyle oral tedavide maksimum asit supresyonu 3–5 günde platoya ulaşır. Akut üst GİS kanamasında 80 mg bolus + 8 mg/sa sürekli infüzyon ise devreye giren yeni pompaları anlık yakalayarak ilk saatlerden itibaren pH >6 sağlar.',
            'H₂ Reseptör Antagonistleriyle Eş Zamanlı Uygulama Paradoksu: H₂ blokerleri pariyetal pompaları dinlenme (tubulovezikül) fazında tutarak teorik olarak PPI’nin asit-aktivasyonunu kısmen azaltabilir; bu nedenle rutin kombinasyon önerilmez, yalnızca seçilmiş nokturnal asit kaçağında gece yatarken ayrı zamanlı H₂ bloker değerlendirilir.',
            'Klinik Etkinlik Tavanı: Standart 40 mg/gün üzerinde (ör. 40 mg q12sa veya 8 mg/sa) doz artışı yalnızca yüksek riskli akut üst GİS kanaması veya Zollinger-Ellison sendromunda ek fayda sağlar; rutin YBÜ SUP’ta 40 mg q24sa üzerine çıkılması kanamayı ek azaltmazken yan etki ve maliyeti artırır.',
          ],
        }}
        clinicalPearls={[
          'Neden Klopidogrel Alan Hastada Pantoprazol 1. Tercihtir? Omeprazol ve esomeprazol CYP2C19’un güçlü mekanizma-bazlı inhibitörleridir ve klopidogrelin aktif tiyol metabolitine dönüşümünü azaltır. Pantoprazol Faz II sülfasyon ağırlıklı metabolizması sayesinde CYP2C19’u neredeyse inhibe etmez — DAPT altında en güvenli PPI’dır!',
          'Akut Üst GİS Kanamasında Sürekli İnfüzyon vs 40 mg q12sa: Sachar ve ark. (JAMA Intern Med 2014) meta-analizi, yüksek doz aralıklı 40 mg IV q12sa rejiminin sürekli 8 mg/sa infüzyona non-inferior olduğunu göstermiştir; özellikle sınırlı IV lümeni olan hastalarda hem Y-site çökelti riskini hem de flakon maliyetini belirgin düşürür.',
          'Acil Tok Hastada Perioperatif Aspirasyon Tuzağı: Ameliyat odasında entübasyondan 5 dakika önce yapılan IV Pantoprazol midede halihazırda birikmiş asidi NÖTRALİZE ETMEZ ve mideyi BOŞALTMAZ! Etki için ≥30–60 dk gerekir; acil anlık pH yükseltmesi yalnızca non-partiküllü oral 0,3 M Sodyum Sitrat ile sağlanır.',
          'Dirençli Hipokalsemi / Hipokalemi Vakasında Gizli Suçlu: YBÜ veya serviste IV kalsiyum ve potasyum replasmanına yanıt vermeyen hastalarda mutlaka serum Mg²⁺ düzeyine ve ilaç listesinde kronik Pantoprazol olup olmadığına bakın — PPI kesilmeden hipomagnezemi kalıcı düzelmez!',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ ETKİLEŞİMLER & KAYNAKÇA (#sec-kaynaklar)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Pantoprazol"
        drugsComUrl="https://www.drugs.com/drug-interactions/pantoprazole.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Rilpivirin (ve Asit-Bağımlı HIV Proteaz İnhibitörleri: Atazanavir, Nelfinavir)',
            mechanism: 'İntragastrik pH Artışına Bağlı Ciddi Oral Emilim ve Çözünürlük Azalması',
            clinicalEffect:
              'Rilpivirin plazma konsantrasyonlarında dramatik düşüş, HIV viral yükünde artış, virolojik başarısızlık ve antiretroviral çapraz direnç gelişimi.',
            management:
              'Rilpivirin içeren rejimlerle Pantoprazol kesinlikle KONTRENDİKEDİR (birlikte kullanılmaz; gerekirse zaman aralıklı H₂ bloker veya antasit rejimleri enfeksiyon konsültasyonu ile planlanır).',
          },
          {
            severity: 'D',
            agent: 'Yüksek Doz Metotreksat (MTX ≥500 mg/m²)',
            mechanism: 'Renal Proksimal Tübüler BCRP (ABCG2) & OAT3 Taşıyıcı İnhibisyonu',
            clinicalEffect:
              'Metotreksat ve 7-hidroksimetotreksat serum düzeylerinde uzamış yükseklik → ağır miyelosupresyon, mukozit, hepatotoksisite ve akut böbrek hasarı.',
            management:
              'Yüksek doz MTX kürleri sırasında Pantoprazol geçici olarak kesilmeli (gerekirse H₂ blokere geçilmeli) ve MTX düzeyleri/lökovorin kurtarması yakından izlenmelidir.',
          },
          {
            severity: 'D',
            agent: 'Gastrik pH-Bağımlı Emilimli Ajanlar (Ketokonazol, İtrakonazol, Posakonazol Süsp., Erlotinib, Dasatinib, Mikofenolat Mofetil)',
            mechanism: 'Gastrik pH >4 Artışına Bağlı Çözünürlük ve Oral Biyoyararlanım Düşüşü',
            clinicalEffect:
              'Antifungal, tirozin kinaz inhibitörü veya transplant immünsüpresif (MMF) etkinliğinde belirgin azalma ve tedavi başarısızlığı / rejeksiyon riski.',
            management:
              'Birlikte kullanımdan kaçının; zorunluysa asitten bağımsız formülasyonlara (ör. posakonazol gecikmeli salımlı tablet, mikofenolik asit sodyum) geçin veya H₂ bloker zamanlaması yapın.',
          },
          {
            severity: 'D',
            agent: 'Digoksin & Loop / Tiyazid Diüretikler (Kronik Kullanımda)',
            mechanism: 'PPI İlişkili Hipomagnezemi + Diüretik Elektrolit Kaybı → Miyokardiyal Digoksin Duyarlılığı ↑',
            clinicalEffect:
              'Hipomagnezemi ve sekonder hipokalemi varlığında normal serum digoksin düzeylerinde bile ventriküler aritmi ve digoksin toksisitesi gelişebilir.',
            management:
              'Kronik kombine kullanımda periyodik serum Mg²⁺, K⁺, Ca²⁺ ve digoksin/EKG izlemi yapın; endikasyon yoksa PPI’yi kesin.',
          },
          {
            severity: 'C',
            agent: 'Varfarin (K Vitamini Antagonistleri)',
            mechanism: 'Nadir Olası Hepatik Metabolizma / Barsak Florası Değişikliği',
            clinicalEffect:
              'Pazarlama sonrası nadir olgularda INR ve protrombin zamanında artış ve kanama bildirilmiştir.',
            management:
              'Pantoprazol başlandığında veya kesildiğinde ilk 1–2 hafta içinde INR kontrolü yapılması önerilir.',
          },
          {
            severity: 'C',
            agent: 'Klopidogrel (Minimal Etkileşim — 1. Tercih PPI Avantajı!)',
            mechanism: 'En Düşük CYP2C19 İnhibisyon Potansiyeli (Faz II Sülfasyon Ağırlıklı Metabolizma)',
            clinicalEffect:
              'Omeprazol ve esomeprazolün aksine klopidogrelin aktif metabolitine dönüşümünü klinik olarak anlamlı düzeyde azaltmaz; antiplatelet etkinlik korunur.',
            management:
              'İkili antiplatelet tedavi (DAPT) altında GİS kanama profilaksisi gerektiğinde Pantoprazol güvenle 1. tercih PPI olarak kullanılabilir.',
          },
        ]}
        references={[
          {
            authors: 'Cook D, Deane A, Lauzier F, et al. (REVISE Investigators)',
            title: 'Stress Ulcer Prophylaxis during Invasive Mechanical Ventilation',
            journal: 'New England Journal of Medicine',
            year: 2024,
            note: '4.821 invaziv mekanik ventilasyon hastasında Pantoprazol 40 mg IV q24sa’nın klinik anlamlı üst GİS kanamasını anlamlı biçimde azalttığını, 90 günlük mortaliteye nötr olduğunu ve C. diff/pnömoni artışı yapmadığını gösteren landmark randomize kontrollü çalışma.',
          },
          {
            authors: 'Krag M, Marker S, Perner A, et al. (SUP-ICU Trial Group)',
            title: 'Pantoprazole in Patients at Risk for Gastrointestinal Bleeding in the ICU',
            journal: 'New England Journal of Medicine',
            year: 2018,
            note: '3.298 kritik yoğun bakım hastasında Pantoprazol 40 mg IV profilaksisinin 90 günlük mortaliteyi değiştirmediğini ancak klinik anlamlı GİS kanaması insidansını azalttığını ortaya koyan çok merkezli RKÇ.',
          },
          {
            authors: 'Gralnek IM, Stanley AJ, Morris AJ, et al.',
            title: 'Endoscopic diagnosis and management of nonvariceal upper gastrointestinal hemorrhage (NVUGIH): European Society of Gastrointestinal Endoscopy (ESGE) Guideline – Update 2021',
            journal: 'Endoscopy',
            year: 2021,
            note: 'Akut non-varisiyel üst GİS kanamasında yüksek doz IV PPI (80 mg bolus → 8 mg/sa × 72 saat veya yüksek doz aralıklı q12sa) protokollerini belirleyen güncel Avrupa kılavuzu.',
          },
          {
            authors: 'Laine L, Barkun AN, Saltzman JR, Martel M, Leontiadis GI',
            title: 'ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding',
            journal: 'American Journal of Gastroenterology',
            year: 2021,
            note: 'Yüksek riskli kanayan ülserlerde endoskopik hemostaz sonrası 72 saatlik yüksek doz sürekli veya aralıklı IV PPI tedavisini güçlü öneri olarak tanımlayan Amerikan Gastroenteroloji Koleji kılavuzu.',
          },
          {
            authors: 'Sachar H, Vaidya K, Laine L',
            title: 'Intermittent vs Continuous Proton Pump Inhibitor Therapy for High-Risk Bleeding Ulcers: A Systematic Review and Meta-analysis',
            journal: 'JAMA Internal Medicine',
            year: 2014,
            note: 'Yüksek riskli kanayan ülserlerde aralıklı yüksek doz PPI rejiminin (ör. 40 mg IV q12sa) tekrar kanama, cerrahi ve mortalite açısından sürekli infüzyona (80 mg + 8 mg/sa) non-inferior olduğunu kanıtlayan sistematik derleme ve meta-analiz.',
          },
          {
            authors: 'American Geriatrics Society 2023 Beers Criteria® Update Expert Panel',
            title: 'American Geriatrics Society 2023 updated AGS Beers Criteria® for potentially inappropriate medication use in older adults',
            journal: 'Journal of the American Geriatrics Society',
            year: 2023,
            note: 'Yaşlı (>65 yaş) hastalarda yüksek riskli endikasyon yoksa >8 hafta PPI kullanımından C. difficile enfeksiyonu, pnömoni, kemik kırığı ve hipomagnezemi riskleri nedeniyle kaçınılmasını öneren güncel geriatri kılavuzu.',
          },
        ]}
      />
    </div>
  );
};
