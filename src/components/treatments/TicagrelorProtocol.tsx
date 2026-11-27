import React, { useId, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
  Scale,
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
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

type CalcTab = 'dosing_calc' | 'periop_asra' | 'cyp_adenosine_audit' | 'p2y12_compare';
type TicaIndication =
  | 'acs_first12m'
  | 'pegasus_gt12m'
  | 'twilight_mono'
  | 'thales_stroke'
  | 'p2y12_switch';
type StentWindow = 'no_stent_or_6m' | 'des_1_6m' | 'fresh_stent_lt1m';
type SurgeryMode = 'elective_noncardiac' | 'elective_cabg' | 'urgent_bleed';

interface SafetyFactor {
  id: string;
  label: string;
  sublabel: string;
  severity: 'contraindicated' | 'high' | 'moderate';
}

const TICA_SAFETY_FACTORS: SafetyFactor[] = [
  {
    id: 'prior_ich',
    label: 'Geçirilmiş İntrakraniyal Kanama (İKK) Öyküsü',
    sublabel: 'MUTLAK KONTRENDİKE! (Not: Geçmiş İSKEMİK inme/TIA Prasugrelden farklı olarak kontrendike değildir!)',
    severity: 'contraindicated',
  },
  {
    id: 'active_bleed_childc',
    label: 'Aktif Patolojik Kanama veya Ağır Karaciğer Yetmezliği (Child-Pugh C)',
    sublabel: 'CYP3A4 klirens çöküşü + ağır koagülopati/varis kanaması — MUTLAK KONTRENDİKE!',
    severity: 'contraindicated',
  },
  {
    id: 'strong_cyp3a4_inh',
    label: 'Güçlü CYP3A4 İnhibitörü (Klaritromisin · Vorikonazol · Ketokonazol · İtrakonazol · Ritonavir/Paxlovid)',
    sublabel: 'Tikagrelor AUC’sini 5–7× artırır (ölümcül kanama!) — MUTLAK KONTRENDİKE!',
    severity: 'contraindicated',
  },
  {
    id: 'asa_over_100',
    label: 'Eşzamanlı >100 mg/gün Aspirin (örn. 150–300 mg/gün idame)',
    sublabel: 'FDA KUTU UYARISI (PLATO): Tikagrelor etkinliği belirgin DÜŞER — ASA KESİNLİKLE 75–100 mg/gün olmalı!',
    severity: 'high',
  },
  {
    id: 'strong_cyp3a4_ind',
    label: 'Güçlü CYP3A4 İndükleyici (Rifampisin · Fenitoin · Karbamazepin · Fenobarbital)',
    sublabel: 'Tikagrelor düzeyini %80+ düşürür → STENT TROMBOZU riski — kombinasyondan KAÇIN!',
    severity: 'high',
  },
  {
    id: 'simvastatin_40',
    label: 'Simvastatin veya Lovastatin >40 mg/gün',
    sublabel: 'CYP3A4 inhibisyonu ile statin düzeyi 2–3× ↑ → RABDOMİYOLİZ riski! (Atorvastatin/Rosuvastatin seç)',
    severity: 'high',
  },
  {
    id: 'brady_avblock',
    label: 'Hasta Sinüs Sendromu, 2.–3. Derece AV Blok (Pilsiz) veya Senkop Öyküsü',
    sublabel: 'ENT-1 adenozin artışı ventriküler duraklama (≥3 sn) & bradikardiyi ağırlaştırır!',
    severity: 'high',
  },
  {
    id: 'af_oac',
    label: 'Atriyal Fibrilasyon Nedeniyle DOAC / Varfarin Kullanımı',
    sublabel: 'Yüksek majör kanama riski → AF + PCI’da Tikagrelor yerine KLOPİDOGREL 75 mg/gün seçin!',
    severity: 'high',
  },
  {
    id: 'dyspnea_adenosine',
    label: 'Tikagrelor Başladıktan Sonra Nefes Darlığı (SpO₂ Normal · Akciğer Temiz)',
    sublabel: 'Adenozin ilişkili benign dispne (~%14–15) — önce KKY/PE/iskemi dışla; tolere edilemezse Prasugrel/Klopidogrele geç!',
    severity: 'moderate',
  },
  {
    id: 'digoxin_gout',
    label: 'Digoksin (P-gp Substratı) veya Sık Gut Atağı / Hiperürisemi',
    sublabel: 'P-gp inhibisyonuyla Digoksin düzeyi ~%30–75 artar (düzey izle!); adenozin ürik asidi yükseltir!',
    severity: 'moderate',
  },
];

export const TicagrelorProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('dosing_calc');

  // Tab 1: Endikasyon, Doz & Aspirin Kilidi
  const [indication, setIndication] = useState<TicaIndication>('acs_first12m');
  const [asaDoseMg, setAsaDoseMg] = useState<number>(100);
  const [adultWeightKg, setAdultWeightKg] = useState<number>(75);

  // Tab 2: Perioperatif (3–5g), ASRA (5–7g) & Acil Kanama
  const [stentWindow, setStentWindow] = useState<StentWindow>('no_stent_or_6m');
  const [surgeryMode, setSurgeryMode] = useState<SurgeryMode>('elective_noncardiac');
  const [neuraxialPlanned, setNeuraxialPlanned] = useState<boolean>(true);
  const [hoursSinceLastDose, setHoursSinceLastDose] = useState<number>(10);

  // Tab 3: CYP3A4, Adenozin & Güvenlik
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useMonographAccordion('tca-moa', false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavItems = [
    { id: 'tca-high-alert', label: 'Yüksek Uyarı' },
    { id: 'tca-moa', label: 'Etki & Adenozin' },
    { id: 'tca-contra', label: 'Kontrendikasyonlar' },
    { id: 'tca-indications', label: 'Endikasyonlar' },
    { id: 'tca-calc', label: 'Hesaplayıcı & ASRA' },
    { id: 'tca-tr', label: 'TR Formlar' },
    { id: 'tca-compat', label: 'Uygulama & NG' },
    { id: 'tca-organ', label: 'Organ Yetmezliği' },
    { id: 'tca-special', label: 'Geriatri & Obezite' },
    { id: 'tca-preg', label: 'Gebelik & Laktasyon' },
    { id: 'tca-adr', label: 'Dispne & Bradikardi' },
    { id: 'tca-cautions', label: 'Klinik Dikkat' },
    { id: 'tca-pd', label: 'Derin Farmakodinami' },
    { id: 'tca-refs', label: 'CYP3A4 & Kaynak' },
  ];

  // --- TAB 1 ENDİKASYON METADATASI ---
  const asaTooHigh = indication !== 'twilight_mono' && asaDoseMg > 100;

  const indMeta: Record<
    TicaIndication,
    { label: string; loadText: string; maintText: string; guidance: string }
  > = {
    acs_first12m: {
      label: 'AKS İlk 12 Ay (PCI veya Medikal Yönetim · PLATO)',
      loadText: '180 mg Tek Yükleme (2× 90 mg tb · Etki 30–60 dk)',
      maintText: '90 mg GÜNDE 2 KEZ (q12sa) + ASA 75–100 mg/gün (ASLA >100 mg!)',
      guidance:
        'PLATO (NEJM 2009): Hem invazif (PCI) hem de medikal yönetilen AKS’de Klopidogrele göre kardiyovasküler ve tüm nedenlere bağlı mortaliteyi anlamlı azaltmıştır! Prasugrelden farklı olarak geçmiş iskemik inme/TIA’da ve konservatif AKS’de kullanılabilir.',
    },
    pegasus_gt12m: {
      label: 'MI Sonrası >12 Ay Uzatılmış Koruma (PEGASUS-TIMI 54)',
      loadText: 'Yükleme Gerekmez (90 mg’dan 60 mg’a geçiş)',
      maintText: '60 mg GÜNDE 2 KEZ (q12sa) + ASA 75–100 mg/gün + PPI',
      guidance:
        'PEGASUS-TIMI 54 (NEJM 2015) & THEMIS-PCI: MI geçireli >1 yıl olmuş yüksek iskemik riskli (diyabet, çok damar KAH, tekrarlayan MI, KBY) ve düşük kanama riskli hastalarda 60 mg 2×1 ile 3 yıla kadar uzatılmış koruma sağlar (90 mg 2×1’e göre daha az kanama ve dispne!).',
    },
    twilight_mono: {
      label: '3 Ay DAPT Sonrası Tikagrelor Monoterapisi (TWILIGHT)',
      loadText: 'İlk 3 Ay DAPT (ASA + 90 mg q12sa) Tamamlandıktan Sonra',
      maintText: 'ASPİRİNİ KES → Tek Başına Tikagrelor 90 mg q12sa!',
      guidance:
        'TWILIGHT (NEJM 2019) & ESC 2023: Yüksek riskli PCI sonrası ilk 3 ayı olaysız tamamlayan hastalarda Aspirinin kesilip tekli Tikagrelor 90 mg 2×1 ile devam edilmesi klinik kanamayı ~%44 azaltırken ölüm/MI/inme riskini artırmaz!',
    },
    thales_stroke: {
      label: 'Akut Minör-Orta İskemik İnme (NIHSS ≤5) / Yüksek Riskli TIA (THALES)',
      loadText: '180 mg Yükleme (İlk 24 sa · BT Kanama Yok & tPA Yok!)',
      maintText: '90 mg q12sa + ASA 75–100 mg/gün × 30 GÜN → Sonra Monoterapi',
      guidance:
        'THALES (NEJM 2020) & CHANCE-2: Özellikle CYP2C19 yavaş metabolizörlerde Klopidogrele üstün olan 30 günlük kısa DAPT rejimidir; geçmiş İKK varsa kesinlikle kontrendikedir!',
    },
    p2y12_switch: {
      label: 'P2Y₁₂ Geçiş Protokolleri (Klopidogrel / Prasugrel ↔ Tikagrelor)',
      loadText: 'Klopidogrel → Tikagrelor: Herhangi bir saatte 180 mg Yükle!',
      maintText: 'Tikagrelor → Klopidogrel: Son dozdan 24 sa sonra 600 mg Yükle! | Tikagrelor → Prasugrel: 24 sa sonra 60 mg!',
      guidance:
        'KRİTİK KURAL: Tikagrelor geri dönüşlü olduğu için Klopidogrel veya Prasugrele geçerken reseptör boşluğunu kapatmak adına son Tikagrelor dozundan ~24 saat sonra YÜKLEME DOZU (600 mg Klopidogrel / 60 mg Prasugrel) yapılır!',
    },
  };

  // --- TAB 2 PERİOPERATİF & ASRA 2018 KARAR MOTORU ---
  const getPeriopVerdict = () => {
    if (surgeryMode === 'urgent_bleed') {
      return {
        tone: 'rose' as const,
        headline: 'ACİL CERRAHİ / KANAMA — TROMBOSİT TRANSFÜZYONU İLK 24 SAATTE ETKİSİZDİR!',
        detail:
          hoursSinceLastDose < 24
            ? `Son dozdan yalnızca ${hoursSinceLastDose} saat geçmiş (<24 sa): Tikagrelor ve aktif metaboliti (t½ 7–10 sa) kanda serbest dolaşarak yeni transfüze edilen trombositleri de ANINDA BLOKE EDER! Tedavi: TXA 1 g IV, lokal/cerrahi hemostaz, acil KPB/KABG’de CytoSorb® hemoadsorpsiyon (varsa), eritrosit/fibrinojen desteği (Bentracimab Türkiye’de rutin stokta yoktur; hemodiyaliz >%99,7 protein bağlı olduğu için İŞE YARAMAZ!).`
            : `Son dozdan ${hoursSinceLastDose} saat geçmiş (≥24 sa): Serbest plazma Tikagrelor düzeyi belirgin düşmüştür; ancak hâlâ rezidüel inhibisyon sürebileceğinden TXA 1 g IV + gerekirse yüksek doz trombosit transfüzyonu ve lokal hemostaz kombine edilir.`,
      };
    }
    if (stentWindow === 'fresh_stent_lt1m') {
      return {
        tone: 'rose' as const,
        headline: 'ELEKTİF CERRAHİYİ ERTELE! (<1 Ay Taze Stent — Katastrofik Stent Trombozu!)',
        detail:
          'ESC 2022: Stent implantasyonundan sonraki ilk 1 ayda (AKS/kompleks DES’te ideal 3–6 ay) P2Y₁₂ kesilmesi ölümcül stent trombozu yapar! Ertelenemeyen hayati cerrahide Kardiyoloji ile IV Kangrelor köprülemesi planlanır.',
      };
    }
    if (surgeryMode === 'elective_cabg') {
      return {
        tone: 'amber' as const,
        headline: 'KABG ÖNCESİ 3–5 GÜN ÖNCE KES (ESC 2022: Minimum 3 Gün · FDA: 5 Gün) · ASPİRİNİ SÜRDÜR!',
        detail:
          'Tikagrelor geri dönüşlü olduğundan trombosit toparlanması Prasugrelden (7g) hızlıdır: ESC 2022 / EACTS kılavuzuna göre elektif KABG öncesi en az 3 gün (ideal 3–5 gün) kesilir; Aspirin 75–100 mg/gün sürdürülür!',
      };
    }
    return {
      tone: stentWindow === 'des_1_6m' ? ('amber' as const) : ('emerald' as const),
      headline:
        stentWindow === 'des_1_6m'
          ? 'KARDİYOLOJİ ONAYIYLA 3–5 GÜN ÖNCE KES · ASPİRİNİ (75–100 mg) SÜRDÜR!'
          : 'PREOP 3–5 GÜN ÖNCE KES (ESC 2022) · ASPİRİNİ SÜRDÜR · POSTOP 24–48 SAATTE BAŞLA!',
      detail:
        'Geri dönüşlü bağlanma sayesinde oral P2Y₁₂’ler içinde en hızlı cerrahi temizlenmeye sahiptir (3–5 gün; yüksek kanama riskli cerrahilerde 5 gün tercih edilir).',
    };
  };
  const periopVerdict = getPeriopVerdict();

  // --- TAB 3 GÜVENLİK DENETİMİ ---
  const hasContra = selectedFactors.some(
    (id) => TICA_SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'contraindicated'
  );
  const hasHigh = selectedFactors.some(
    (id) => TICA_SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'high'
  );

  const toggleFactor = (id: string) => {
    setSelectedFactors((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'dosing_calc') {
      const m = indMeta[indication];
      return `TİKAGRELOR ORDER (${m.label}): Yükleme: ${m.loadText} | İdame: ${m.maintText}. ${asaTooHigh ? 'UYARI: ASPİRİN >100 mg/gün YASAK — 75–100 mg/gün’e İNDİR!' : 'Pantoprazol 40 mg/gün (GİS koruma) ekle.'}`;
    }
    if (activeTab === 'periop_asra') {
      const asraTxt = neuraxialPlanned
        ? 'ASRA 2018 / ESAIC 2022 NÖRAAKSİYEL: Tikagrelor son dozdan EN AZ 5–7 GÜN (ESAIC: ≥5 gün) geçmeden spinal/epidural ponksiyon YAPILMAZ! Kateter çekiminden ≥6 saat sonra yeniden başlanır.'
        : '';
      return `PERİOPERATİF TİKAGRELOR (ESC 2022): ${periopVerdict.headline} ${asraTxt}`;
    }
    if (activeTab === 'cyp_adenosine_audit') {
      return hasContra
        ? `TİKAGRELOR GÜVENLİK DENETİMİ: MUTLAK KONTRENDİKASYON MEVCUT (İKK / Child-Pugh C / Güçlü CYP3A4 İnhibitörü) — KULLANMA!`
        : `TİKAGRELOR GÜVENLİK DENETİMİ: Seçili risk sayısı ${selectedFactors.length}. ASA ≤100 mg/gün kuralına uy, CYP3A4 inhibitör/indükleyici ve Simvastatin >40 mg’dan kaçın, dispne/bradikardi izle.`;
    }
    return `P2Y₁₂ KIYASLAMA: Tikagrelor (Aktif/Geri dönüşlü · Cerrahi 3–5g / ASRA 5–7g · Acil Plt transfüzyonu ETKİSİZ · ASA ≤100 mg · Dispne/bradikardi · CYP3A4) vs Prasugrel (Cerrahi 7g / ASRA 7–10g · İnme/TIA YASAK) vs Klopidogrel (Cerrahi 5g / ASRA 5–7g · CYP2C19/Omeprazol).`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="tca-high-alert"
        defaultOpen={false}
        tallManName="TIKAGRELOR (GERİ DÖNÜŞLÜ P2Y₁₂ · ASA ≤100 mg · ACİL PLT ETKİSİZ!)"
        confusionRiskWith="Aspirin >100 mg/gün (FDA Kutu!) · Güçlü CYP3A4 İnhibitörü (Klaritromisin/Paxlovid) · 90 mg vs 60 mg Tablet"
        criticalAlerts={[
          'ACİL KANAMADA TROMBOSİT TRANSFÜZYONU ETKİSİZDİR (İLK 24 SAAT)!: Klopidogrel ve Prasugrelden farklı olarak Tikagrelor geri dönüşlüdür ve aktif formu (t½ 7–10 sa) kanda serbest dolaşır — transfüze edilen taze trombositleri ANINDA BLOKE EDER! Acil KPB/KABG’de CytoSorb® hemoadsorpsiyon, TXA 1 g IV ve lokal hemostaz esastır; diyalizle (>%99,7 protein bağlı) TEMİZLENMEZ!',
          'FDA KUTU UYARISI — EŞZAMANLI ASPİRİN İDAMESİ KESİNLİKLE ≤100 mg/GÜN (75–100 mg) OLMALIDIR!: PLATO çalışmasında >100 mg/gün Aspirin (örn. 150–300 mg) ile Tikagrelorun kardiyovasküler koruyucu etkinliği belirgin düşmüştür — Türkiye’de 150/300 mg yerine MUTLAKA 81–100 mg ASA verin!',
          'GÜÇLÜ CYP3A4 İNHİBİTÖRLERİ & GEÇMİŞ İNTRAKRANİYAL KANAMA (İKK) MUTLAK KONTRENDİKE!: Klaritromisin, Vorikonazol, Ketokonazol, Ritonavir/Paxlovid Tikagrelor düzeyini 5–7× fırlatır (fatal kanama)! Rifampisin/Fenitoin/Karbamazepin ise %80+ düşürüp stent trombozu yapar! Simvastatin/Lovastatin >40 mg rabdomiyoliz riskiyle yasaktır!',
          'ASRA 2018 NÖRAAKSİYEL (5–7 GÜN) · ESC CERRAHİ (3–5 GÜN) & ADENOZİN DİSPNESİ/BRADİKARDİ!: Spinal/epidural blok öncesi 5–7 gün (ESAIC ≥5 gün), elektif cerrahi/KABG öncesi 3–5 gün kesilir! ENT-1 adenozin artışı ~%14–15 hastada benign dispne (SpO₂ normal!) ve erken ventriküler duraklama/bradikardi yapabilir!',
        ]}
        antidoteOrRescue="Standart trombosit transfüzyonu ilk 24 saatte serbest dolaşan Tikagrelor nedeniyle ETKİSİZDİR! Hayatı tehdit eden kanamada: (1) Tikagreloru kes + agresif lokal/endoskopik/cerrahi hemostaz; (2) Traneksamik asit (TXA 1 g IV); (3) Acil kardiyak cerrahi / KPB’de CytoSorb® hemoadsorpsiyon filtresi Tikagreloru kandan fiziksel olarak temizler (ESC 2022/EACTS); (4) Spesifik monoklonal Fab antidotu Bentracimab (REVERSE-IT) henüz Türkiye’de rutin stokta değildir; (5) Hemodiyaliz (>%99,7 protein bağlı) İŞE YARAMAZ!"
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Antitrombotik · Doğrudan Etkili Geri Dönüşlü P2Y₁₂ İnhibitörü (Non-Tiyenopiridin)
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Brilinta® · Brilique® · Tikagrel® · Tikalor® 90 mg &amp; 60 mg
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                PLATO · PEGASUS · TWILIGHT · THALES · ESC 3–5g
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Tikagrelor{' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Brilinta® · Brilique® · Tikagrel® · Tikalor® · Tikarda®)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Hepatik biyoaktivasyon gerektirmeden (<strong>CYP2C19 ve PPI’dan bağımsız!</strong>) trombosit{' '}
              <strong>P2Y₁₂</strong> reseptörünü <strong>geri dönüşlü</strong> olarak bloke eden siklopentiltriazolopirimidin
              sınıfı güçlü antiplatelet ajandır. <strong>PLATO</strong> çalışmasında hem PCI hem de medikal yönetilen
              AKS’de Klopidogrele göre mortaliteyi azaltmış; <strong>PEGASUS (60 mg 2×1)</strong>,{' '}
              <strong>TWILIGHT (monoterapi)</strong> ve <strong>THALES (30 gün inme)</strong> ile geniş kanıt
              kazanmıştır. Anestezi ve YBÜ’de en kritik üç özelliği: <strong>cerrahi öncesi 3–5 gün / ASRA 5–7 gün
              kesme</strong>, <strong>acil kanamada trombosit transfüzyonunun etkisizliği</strong> ve{' '}
              <strong>Aspirin ≤100 mg/gün kuralıdır</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: B01AC24 · Günde 2× (q12sa) · CYP3A4 · t½ 7–10 sa
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              AKS &amp; &gt;12 Ay Dozu
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              180 → 90 mg q12sa
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              &gt;12 ay PEGASUS: 60 mg q12sa · ASA ≤100 mg!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Cerrahi &amp; ASRA 2018
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              Cerrahi 3–5g · ASRA 5–7g
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Acil kanamada Plt ETKİSİZ (CytoSorb® / TXA!)
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              CYP3A4 &amp; İKK Kırmızı Çizgi
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              İKK · CYP3A4 İnh. YASAK
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Simvastatin &gt;40 mg &amp; Child-Pugh C YASAK
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              ENT-1 Adenozin İmzası
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              Dispne (~%14) · Bradikardi
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              SpO₂ normal · Hiperürisemi/gut · CYP2C19 yok
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & ADENOZİN / CYP3A4 ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="tca-moa"
          sectionTitle="Etki Mekanizması: Doğrudan Geri Dönüşlü P2Y₁₂ Allosterik Blokajı & ENT-1 Adenozin Artışı"
          summary="Tiyenopiridinlerden (Klopidogrel/Prasugrel) tamamen farklı kimyasal yapıya sahiptir. Ön-ilaç değildir — emilir emilmez aktif olarak P2Y₁₂ reseptörünün allosterik bölgesine geri dönüşlü bağlanır (30–60 dk içinde %80–90 inhibisyon) ve ayrıca ENT-1 taşıyıcısını bloke ederek yerel adenozin düzeylerini artırır."
          pillars={[
            {
              title: '1. Doğrudan Aktif & Geri Dönüşlü P2Y₁₂ Blokajı (CYP2C19 & PPI Bağımsız)',
              detail:
                'Karaciğer aktivasyonu beklemeksizin doğrudan etki eder; CYP3A4 ile oluşan ana metaboliti AR-C124910XX de eşdeğer aktiftir. Geri dönüşlü olduğu için ilaç kesilince trombosit fonksiyonu 3–5 günde toparlanır (Prasugrelden hızlı!) ancak günde 2 kez (q12sa) alınması şarttır!',
            },
            {
              title: '2. ENT-1 Adenozin Geri Alım İnhibisyonu → Dispne, Bradikardi & Koroner Akım',
              detail:
                'Eritrosit ve endoteldeki ENT-1 nükleozid taşıyıcısını bloke ederek ekstraselüler adenozini artırır. Bu mekanizma koroner mikrovasküler vazodilatasyona katkı sağlarken aynı zamanda tipik Tikagrelor dispnesi (%14–15), sinoatriyal duraklamalar ve hiperürisemi/gut ataklarının nedenidir!',
            },
            {
              title: '3. Geri Dönüşlü Serbest İlaç = Acil Trombosit Transfüzyonu Neden Etkisiz?',
              detail:
                'Ana ilaç (t½ ~7–8 sa) ve aktif metabolit (t½ ~8–10 sa) 24+ saat kanda aktif dolaştığı için acil kanamada verilen yeni trombositlerin P2Y₁₂ reseptörlerini de anında bağlayıp devre dışı bırakır!',
            },
          ]}
        />

        {/* Genişletilebilir ADME Akordeonu */}
        <div className={`rounded-2xl border overflow-hidden scroll-mt-20 ${basePanel}`}>
          <button
            type="button"
            onClick={() => setShowAdmeDetails((v) => !v)}
            aria-expanded={showAdmeDetails}
            className={`w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800/70' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-teal-500 shrink-0" />
              <span className="text-sm font-bold">
                Detaylı Farmakokinetik (ADME): CYP3A4 / P-gp, &gt;%99,7 Protein Bağlama &amp; CytoSorb® Hemoadsorpsiyon
              </span>
            </div>
            {showAdmeDetails ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </button>

          {showAdmeDetails && (
            <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">
                  A — Hızlı Emilim (Pik ~1,5 sa · Ezilerek Daha Hızlı!)
                </div>
                Oral biyoyararlanımı ~%36’dır; <strong>180 mg yükleme</strong> sonrası 30 dk’da belirgin, 2 saatte ~%88
                trombosit inhibisyonu sağlar. MOJITO çalışmasına göre STEMI’de <strong>ezilip suyla içilen</strong>{' '}
                (veya NG’den verilen) Tikagrelor bütün yutmaya göre ~1 saat daha hızlı etki eder; IV Morfin emilimi geciktirebilir.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — &gt;%99,7 Protein Bağlanması (Diyalizlenmez!)
                </div>
                Hem Tikagrelor hem aktif metaboliti AR-C124910XX plazma proteinlerine <strong>&gt;%99,7</strong>{' '}
                bağlanır — bu nedenle <strong>hemodiyaliz veya CRRT ile temizlenemez</strong>! Ancak polimerik sorbent
                kolonu (<strong>CytoSorb®</strong>) KPB devresinde molekülü kandan fiziksel olarak adsorbe edebilir.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M — Hepatik CYP3A4 Metabolizması &amp; P-gp İnhibisyonu
                </div>
                Başlıca <strong>CYP3A4</strong> ile aktif AR-C124910XX’e dönüşür (kandaki etkinin ~%30–40’ı). Ayrıca
                kendisi hafif CYP3A4 ve <strong>P-gp inhibitörüdür</strong> (Simvastatin &gt;40 mg yasak; Digoksin
                düzeyi %30–75 artar!).
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  E — Biliyer/Fekal Atılım (t½ 7–10 sa · Renal &lt;%1!)
                </div>
                Dozun ~%58’i safra/feçesle atılır; değişmeden idrarla atılım <strong>&lt;%1</strong>’dir (KBY’de doz
                ayarı gerekmez!). Doz atlandığında geri dönüşlü etki hızla düştüğünden <strong>günde 2 kez (q12sa)
                uyumu</strong> stent trombozunu önlemek için kritiktir!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="tca-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'GEÇİRİLMİŞ İNTRAKRANİYAL KANAMA (İKK) ÖYKÜSÜ — FDA / EMA SmPC! (Not: Geçmiş İSKEMİK inme veya TIA Prasugrelden farklı olarak mutlak kontrendike değildir!).',
          'Aktif patolojik kanama (aktif peptik ülser kanaması, intrakraniyal kanama, retroperitoneal kanama vb.).',
          'Ağır karaciğer yetmezliği (Child-Pugh C — CYP3A4 klirens çöküşü & ağır koagülopati/varis kanaması!).',
          'Güçlü CYP3A4 inhibitörleri ile eşzamanlı kullanım: Ketokonazol, İtrakonazol, Vorikonazol, Klaritromisin, Ritonavir/Paxlovid (EMA SmPC mutlak kontrendikasyon!).',
          'Tikagrelor veya yardımcı maddelere aşırı duyarlılık / anafilaksi.',
        ]}
        relativeTitle="Kesin Kaçınılması Gereken Durumlar & Relatif Kontrendikasyonlar"
        relativeItems={[
          'Eşzamanlı >100 mg/gün Aspirin idamesi — FDA Kutu Uyarısı (PLATO: etkinlik kaybı → ASA mutlaka 75–100 mg/gün!).',
          'Güçlü CYP3A4 indükleyiciler (Rifampisin, Fenitoin, Karbamazepin, Fenobarbital) → stent trombozu riski!',
          'Simvastatin veya Lovastatin >40 mg/gün (rabdomiyoliz riski — Atorvastatin/Rosuvastatin tercih edin!).',
          'Hasta sinüs sendromu, 2.–3. derece AV blok (kalıcı pil yoksa) veya bradikardiye bağlı senkop öyküsü.',
          'Atriyal fibrilasyon + Oral Antikoagülan (DOAC/Varfarin) kombinasyonu → aşırı kanama riski (Klopidogrel seçin!) ve STEMI akut fibrinoliz başlangıcı.',
          'Orta karaciğer yetmezliği (Child-Pugh B — dikkat/kaçın) ve şiddetli KOAH/astım (dispne tanısını zorlaştırır).',
        ]}
        clinicalNote="ASRA 2018 & ESAIC 2022 Nöraksiyel Kuralı: Tikagrelor, spinal/epidural ponksiyon ve derin periferik blok öncesi EN AZ 5–7 GÜN (ESAIC: ≥5 gün) önceden kesilmelidir; elektif cerrahi/KABG öncesi ise ESC 2022’ye göre 3–5 gün kesme yeterlidir!"
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="tca-indications"
        title="Klinik Endikasyonlar & Kanıta Dayalı Doz Rejimleri (PLATO · PEGASUS · TWILIGHT · THALES)"
        subtitle="Hem PCI hem konservatif AKS’de mortalite yararı, >12 ay 60 mg 2×1 ve 3. ay sonrası Aspirinsiz monoterapi"
        icon={<BookOpen className="w-5 h-5 text-teal-500 shrink-0" />}
        defaultOpen={false}
      >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  1. Akut Koroner Sendrom — İlk 12 Ay (PLATO · ESC 2023)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  180 → 90 mg q12sa
                </span>
              </div>
              <p className={mutedText}>
                <strong>180 mg yükleme</strong> → <strong>90 mg günde 2 kez (q12sa)</strong> + <strong>ASA 75–100 mg/gün</strong>.
                Prasugrelden farklı olarak <strong>medikal (PCI dışı) yönetilen AKS’de</strong>,{' '}
                <strong>≥75 yaş / &lt;60 kg hastalarda</strong> ve <strong>geçmiş iskemik inme/TIA öyküsünde</strong>{' '}
                kullanılabilir! (STEMI’de primer PCI ve NSTE-ACS’de güçlü 1. basamak).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  2. MI Sonrası &gt;12 Ay Uzatılmış Koruma (PEGASUS-TIMI 54)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  60 mg q12sa
                </span>
              </div>
              <p className={mutedText}>
                12 aylık 90 mg 2×1 tedavisini olaysız tamamlayan yüksek iskemik riskli (diyabet, çok damar KAH,
                tekrarlayan MI, KBY) ve düşük kanama riskli hastalarda <strong>60 mg günde 2 kez</strong> + ASA
                75–100 mg/gün ile 36 aya kadar devam edilir (daha düşük kanama ve dispne!).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  3. Kısa DAPT Sonrası Tikagrelor Monoterapisi (TWILIGHT)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  3. Aydan Sonra ASA Kes
                </span>
              </div>
              <p className={mutedText}>
                Yüksek riskli PCI sonrası ilk 3 ay DAPT ardından Aspirini kesip tek başına{' '}
                <strong>Tikagrelor 90 mg q12sa</strong> devam etmek majör/klinik kanamayı %44 azaltırken iskemik
                korumayı tam sürdürür (ESC 2023 Sınıf IIa).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. Akut Minör-Orta İskemik İnme / Yüksek Riskli TIA (THALES)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  30 Gün DAPT
                </span>
              </div>
              <p className={mutedText}>
                NIHSS ≤5 non-kardiyoembolik inme veya yüksek riskli TIA’da (tPA verilmediyse, İKK yoksa) ilk 24 saatte{' '}
                <strong>180 mg yükleme</strong> → <strong>90 mg q12sa + ASA 75–100 mg × 30 gün</strong>; özellikle
                CYP2C19 yavaş metabolizörlerde Klopidogrelden üstündür (CHANCE-2).
              </p>
            </div>
          </div>
      </MonographAccordionSection>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="tca-calc"
        title="Tikagrelor Doz, Perioperatif (3–5g) / Acil Kanama & CYP3A4 Karar Hesaplayıcısı"
        subtitle="ASA ≤100 mg kilidi, ESC 3–5g / ASRA 5–7g kesme, trombosit transfüzyonu etkisizliği & CYP3A4/adenozin denetimi"
        icon={
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >
        <div className="flex items-center justify-end mb-4">
          <MonographCopyButton
            isDark={isDark}
            getText={buildOrderText}
            label="Order Kopyala"
          />
        </div>

          {/* Sekmeler */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
            {[
              { id: 'dosing_calc' as CalcTab, label: '1. Doz & ASA Kilidi', icon: Syringe },
              { id: 'periop_asra' as CalcTab, label: '2. Perioperatif & ASRA', icon: Activity },
              { id: 'cyp_adenosine_audit' as CalcTab, label: '3. CYP3A4 & Adenozin', icon: ShieldAlert },
              { id: 'p2y12_compare' as CalcTab, label: '4. P2Y₁₂ Kıyaslama', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    active
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: DOZ & ASA KİLİDİ */}
          {activeTab === 'dosing_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold">1. Klinik Senaryo</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Object.keys(indMeta) as TicaIndication[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setIndication(key)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                        indication === key
                          ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                          : isDark
                            ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {indMeta[key].label}
                    </button>
                  ))}
                </div>

                {indication !== 'twilight_mono' && (
                  <div>
                    <label className="block text-xs font-bold mb-1.5">
                      2. Eşlik Eden Günlük Aspirin İdame Dozu (FDA ≤100 mg Kilidi!):
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[81, 100, 150, 300].map((mg) => (
                        <button
                          key={mg}
                          type="button"
                          onClick={() => setAsaDoseMg(mg)}
                          className={`py-2 rounded-xl border text-xs font-black ${
                            asaDoseMg === mg
                              ? mg > 100
                                ? 'bg-rose-600 text-white border-rose-600'
                                : 'bg-emerald-600 text-white border-emerald-600'
                              : isDark
                                ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {mg} mg {mg > 100 ? '❌' : '✅'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                {asaTooHigh && (
                  <div className="p-3.5 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 text-xs space-y-1">
                    <div className="font-black flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      FDA KUTU UYARISI: {asaDoseMg} mg/gün ASPİRİN TİKAGRELORU ZAYIFLATIR!
                    </div>
                    <p>
                      Aspirin idame dozunu derhal <strong>75–100 mg/gün</strong>’e (Coraspin®/Ecopirin® 100 mg) düşürün!
                    </p>
                  </div>
                )}

                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-[10px] font-bold uppercase opacity-70">Yükleme / Geçiş</div>
                  <div className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 mt-0.5">
                    {indMeta[indication].loadText}
                  </div>
                </div>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-[10px] font-bold uppercase opacity-70">İdame Rejimi (Günde 2× Uyumu Kritik!)</div>
                  <div className="text-sm font-black text-teal-600 dark:text-teal-400 mt-0.5">
                    {indMeta[indication].maintText}
                  </div>
                </div>
                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">Kılavuz Notu:</div>
                  <p className={mutedText}>{indMeta[indication].guidance}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERİOPERATİF (3–5g), ASRA (5–7g) & ACİL KANAMA */}
          {activeTab === 'periop_asra' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">1. Stent Zamanlaması</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'no_stent_or_6m' as StentWindow, label: 'Stent Yok / >6 Ay' },
                      { id: 'des_1_6m' as StentWindow, label: '1–6 Ay DES' },
                      { id: 'fresh_stent_lt1m' as StentWindow, label: '<1 Ay Taze Stent!' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStentWindow(s.id)}
                        className={`p-2 rounded-xl border text-xs font-bold ${
                          stentWindow === s.id
                            ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">2. Cerrahi / Klinik Durum</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'elective_noncardiac' as SurgeryMode, label: 'Elektif Cerrahi' },
                      { id: 'elective_cabg' as SurgeryMode, label: 'Elektif KABG' },
                      { id: 'urgent_bleed' as SurgeryMode, label: 'Acil / Majör Kanama' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSurgeryMode(m.id)}
                        className={`p-2 rounded-xl border text-xs font-bold ${
                          surgeryMode === m.id
                            ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {surgeryMode === 'urgent_bleed' && (
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <label htmlFor={`${uniqueId}-tcahrs`} className="block text-xs font-bold mb-1">
                      Son Tikagrelor Dozundan Geçen Süre:{' '}
                      <span className={hoursSinceLastDose < 24 ? 'text-rose-500' : 'text-amber-500'}>
                        {hoursSinceLastDose} saat {hoursSinceLastDose < 24 ? '(Plt ETKİSİZ!)' : ''}
                      </span>
                    </label>
                    <input
                      id={`${uniqueId}-tcahrs`}
                      type="range"
                      min={1}
                      max={48}
                      step={1}
                      value={hoursSinceLastDose}
                      onChange={(e) => setHoursSinceLastDose(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                )}

                <label className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <input
                    type="checkbox"
                    checked={neuraxialPlanned}
                    onChange={(e) => setNeuraxialPlanned(e.target.checked)}
                    className="accent-rose-600"
                  />
                  <span className="font-bold">Spinal / Epidural Nöraksiyel Blok veya Derin Pleksus Bloku Planlanıyor</span>
                </label>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div
                  className={`p-4 rounded-xl border-2 space-y-1.5 ${
                    periopVerdict.tone === 'emerald'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                      : periopVerdict.tone === 'amber'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100'
                        : 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                  }`}
                >
                  <div className="text-xs font-black uppercase opacity-80">ESC 2022 Cerrahi / Kanama Kararı</div>
                  <div className="text-sm font-black">{periopVerdict.headline}</div>
                  <p className="text-xs leading-relaxed">{periopVerdict.detail}</p>
                </div>

                {neuraxialPlanned && (
                  <div className="p-3.5 rounded-xl border bg-rose-500/15 border-rose-500/40 text-xs leading-relaxed text-rose-900 dark:text-rose-100 space-y-1">
                    <div className="font-black">ASRA 2018 / ESAIC 2022 Nöraksiyel Blok Kuralı:</div>
                    <p>
                      • <strong>Ponksiyon Öncesi:</strong> Son Tikagrelor dozundan <strong>EN AZ 5–7 GÜN</strong>{' '}
                      (ESAIC 2022: ≥5 gün) geçmeden spinal/epidural ponksiyon veya derin sinir bloku{' '}
                      <strong>KESİNLİKLE YAPILMAZ!</strong>
                    </p>
                    <p>
                      • <strong>Kateter Çekilimi &amp; Yeniden Başlama:</strong> Aktif Tikagrelor altında kateter
                      çekilmez! Kateter çekildikten sonra hızlı başlangıçlı olduğu için yeniden başlamadan önce en az{' '}
                      <strong>≥6 saat</strong> beklenmelidir.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CYP3A4, ADENOZİN & GÜVENLİK */}
          {activeTab === 'cyp_adenosine_audit' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {TICA_SAFETY_FACTORS.map((factor) => {
                  const checked = selectedFactors.includes(factor.id);
                  const toneClass =
                    factor.severity === 'contraindicated'
                      ? 'bg-rose-500/15 border-rose-500'
                      : factor.severity === 'high'
                        ? 'bg-amber-500/15 border-amber-500'
                        : 'bg-indigo-500/15 border-indigo-500';
                  return (
                    <label
                      key={factor.id}
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        checked
                          ? toneClass
                          : isDark
                            ? 'bg-slate-950/50 border-slate-800 hover:bg-slate-900'
                            : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFactor(factor.id)}
                        className="mt-0.5 accent-rose-600"
                      />
                      <div>
                        <div className="font-bold">{factor.label}</div>
                        <div className="text-[11px] opacity-80">{factor.sublabel}</div>
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                {hasContra ? (
                  <div className="p-4 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 space-y-1.5">
                    <div className="font-black text-sm flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 shrink-0" />
                      MUTLAK KONTRENDİKASYON — TİKAGRELOR KULLANMA!
                    </div>
                    <p className="text-xs leading-relaxed">
                      Geçmiş İKK, Child-Pugh C veya güçlü CYP3A4 inhibitörü (Klaritromisin / Vorikonazol / Paxlovid)
                      mevcut — alternatif P2Y₁₂ (Klopidogrel) veya etkileşmeyen antimikrobiyal/antiviral seçin!
                    </p>
                  </div>
                ) : hasHigh ? (
                  <div className="p-4 rounded-xl border-2 bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100 space-y-1.5">
                    <div className="font-black text-sm flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      YÜKSEK RİSK — DÜZELTME VEYA ALTERNATİF GEREKLİ!
                    </div>
                    <p className="text-xs leading-relaxed">
                      Seçili faktörü mutlaka düzeltin (ASA ≤100 mg, Atorvastatin/Rosuvastatin’e geçiş, AF+OAC’de
                      Klopidogrele geçiş veya CYP3A4 indükleyici değişimi!).
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs space-y-1">
                    <div className="font-black text-sm text-emerald-700 dark:text-emerald-300">
                      Standart Güvenlik Profili Uygun
                    </div>
                    <p>
                      90 mg q12sa (veya &gt;12 ay 60 mg q12sa) + ASA 75–100 mg/gün + Pantoprazol 40 mg/gün ile
                      güvenle uygulanabilir.
                    </p>
                  </div>
                )}

                {selectedFactors.includes('dyspnea_adenosine') && (
                  <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30 text-xs">
                    <strong>Tikagrelor Dispnesi Yönetimi:</strong> Önce KKY, pulmoner emboli ve tekrarlayan iskemiyi
                    dışlayın (EKG, BNP, SpO₂, akciğer muayenesi). Hepsi normalse hastaya bunun adenozin ilişkili
                    zararsız bir etki olduğunu ve genelde 1–2 haftada hafiflediğini anlatın; yaşam kalitesini bozuyorsa
                    24 saat sonra Prasugrel (60 mg → 10 mg) veya Klopidogrele (600 mg → 75 mg) geçin!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: P2Y12 KIYASLAMA */}
          {activeTab === 'p2y12_compare' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                    <th className="p-2.5 rounded-tl-xl font-black">Özellik</th>
                    <th className="p-2.5 font-black text-rose-600 dark:text-rose-400">Tikagrelor (Brilinta®)</th>
                    <th className="p-2.5 font-black">Prasugrel (Effient®)</th>
                    <th className="p-2.5 rounded-tr-xl font-black">Klopidogrel (Plavix®)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold">Bağlanma &amp; Aktivasyon</td>
                    <td className="p-2.5 font-bold text-teal-600 dark:text-teal-400">Doğrudan aktif · GERİ DÖNÜŞLÜ</td>
                    <td className="p-2.5">1-basamak CYP3A4/2B6 · Geri dönüşsüz</td>
                    <td className="p-2.5">2-basamak CYP2C19 · Geri dönüşsüz</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Cerrahi / ASRA Kesme</td>
                    <td className="p-2.5 font-bold text-teal-600 dark:text-teal-400">Cerrahi 3–5g · ASRA 5–7g</td>
                    <td className="p-2.5 font-bold text-rose-600 dark:text-rose-400">Cerrahi 7g · ASRA 7–10g</td>
                    <td className="p-2.5">Cerrahi 5g · ASRA 5–7g</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Acil Plt Transfüzyonu</td>
                    <td className="p-2.5 font-black text-rose-600 dark:text-rose-400">ETKİSİZ (&lt;24 sa · CytoSorb®!)</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">ETKİLİ (&gt;4–6 sa)</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">ETKİLİ (&gt;4–6 sa)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Doz &amp; ASA Kuralı</td>
                    <td className="p-2.5">90 / 60 mg q12sa · <strong>ASA ≤100 mg!</strong></td>
                    <td className="p-2.5">10 / 5 mg q24sa</td>
                    <td className="p-2.5">75 mg q24sa (Omeprazol ❌)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">İnme / Medikal AKS</td>
                    <td className="p-2.5">İskemik inme &amp; medikal AKS ✅ (İKK ❌)</td>
                    <td className="p-2.5 text-rose-600 dark:text-rose-400">İnme/TIA ❌ · Sadece PCI!</td>
                    <td className="p-2.5">Minör inme · Fibrinoliz · AF+DOAC ✅</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Özel Yan Etki</td>
                    <td className="p-2.5">Dispne (~%14) · Bradikardi · Gut</td>
                    <td className="p-2.5">Yüksek KABG kanaması · &lt;60kg/≥75y</td>
                    <td className="p-2.5">CYP2C19 direnci · TTP · Repaglinid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
      </MonographAccordionSection>

      {/* 8. TÜRKİYE PİYASA FORMLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="tca-tr"
        preparations={[
          {
            name: 'Brilinta® / Brilique® / Tikagrel® / Tikalor® / Tikarda® 90 mg Film Tablet',
            presentation: '90 mg film kaplı tablet (56 tabletlik aylık kutu — günde 2×!)',
            concentration: '90 mg / tablet (Yükleme: 2× 90 mg = 180 mg · İdame: 90 mg q12sa)',
            saltOrBaseNote:
              'AKS ilk 12 ay, TWILIGHT monoterapi ve THALES (30 gün inme) standart gücüdür. Geri dönüşlü olduğu için sabah-akşam düzenli (q12sa) alınması zorunludur!',
            alertLevel: 'standard',
          },
          {
            name: 'Brilinta® / Tikagrel® 60 mg Film Tablet (Uzatılmış Koruma Formu)',
            presentation: '60 mg film kaplı tablet (56 tabletlik kutu)',
            concentration: '60 mg / tablet (PEGASUS-TIMI 54: MI sonrası >12 ay · 60 mg q12sa)',
            saltOrBaseNote:
              'Akut AKS yüklemesi (180 mg) ve ilk 12 ay için 90 mg kullanılır; >12 ay uzatılmış sekonder korumada 60 mg 2×1 tercih edilir — iki gücü karıştırmayın!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Entübe / Disfajik Hasta (NG / OG Sonda · MOJITO Protokolü): 90 mg veya 180 mg (2× 90 mg) tabletler ince toz haline ezilip yarım bardak / 20–30 mL suyla karıştırılarak hemen içirilir veya NG/OG sondadan verilip su ile yıkanır — emilimi bütün tabletten ~1 saat daha hızlıdır!',
          'Parenteral (IV) Form Yoktur: Yalnızca oral/enteral uygulanır.',
        ]}
        concentrationTrapWarning={'ASA >100 mg/gün & GÜÇLÜ CYP3A4 İNHİBİTÖRÜ TUZAĞI: (1) Tikagrelor alan hastada Aspirin 150/300 mg görürseniz HEMEN 81–100 mg’a indirin! (2) Hastaya pnömoni/H. pylori için Klaritromisin veya COVID için Paxlovid (Ritonavir) yazılması Tikagreloru 5–7× yükselterek fatal kanama yapar!'}
      />

      {/* 9. UYGULAMA YOLU & ENTERAL UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="tca-compat"
        accessRequirement="peripheral-ok"
        accessSummary="Oral veya ezilerek NG/OG sondadan günde 2 kez (q12sa) uygulanır; yemekle veya aç karnına alınabilir. Parenteral IV formu yoktur."
        phRange="Oral Film Tablet (Ezilebilir / NG Uyumlu)"
        osmolalityNote="Ezilip suyla karıştırılarak NG sondadan verildiğinde (SmPC onaylı!) hızlı ve tam emilim sağlar; ardından sondayı 20–30 mL suyla yıkayın."
        compatibleDiluents={[
          'Oral / NG Sonda: 20–30 mL içme suyu (ezilerek hemen uygulanır)',
        ]}
        stabilityNote="Oda sıcaklığında (<30 °C) saklayın; ezilen süspansiyon hemen uygulanmalıdır."
        ySiteCompatible={[
          'Pantoprazol / Tüm PPI’lar (CYP2C19 etkileşimi YOKTUR — GİS koruma için Pantoprazol 40 mg/gün önerilir)',
          'Aspirin 75–100 mg/gün (KESİNLİKLE ≤100 mg!)',
        ]}
        ySiteIncompatible={[
          'Güçlü CYP3A4 İnhibitörleri (Klaritromisin, Vorikonazol, Ketokonazol, Ritonavir/Paxlovid — MUTLAK YASAK!)',
          'Simvastatin / Lovastatin >40 mg/gün · Oral Antikoagülanlar (AF+PCI’da Klopidogrel seç!)',
        ]}
        extravasationProtocol="Oral ajandır. Hayatı tehdit eden kanamada standart trombosit transfüzyonu ilk 24 saatte ETKİSİZDİR — TXA 1 g IV, lokal/cerrahi hemostaz ve acil KPB/KABG’de CytoSorb® hemoadsorpsiyon uygulayın!"
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="tca-organ"
        renalSummary="Tüm KBY evrelerinde (<%1 renal atılım) DOZ AYARI GEREKMEZ (PLATO’da orta KBY’de mortalite avantajı!). >%99,7 protein bağlı olduğundan IHD/CRRT ile DİYALİZLENMEZ; ileri KBY/diyalizde üremik kanama riskine dikkat!"
        renalDetails={[
          'eGFR ≥30 mL/dk: Standart 90 mg (veya 60 mg) q12sa + Pantoprazol 40 mg/gün.',
          'eGFR <30 / IHD / CRRT: PK açısından doz değişmez ama diyaliz verisi kısıtlı ve kanama riski yüksektir (diyaliz temizlemez!).',
        ]}
        hepaticSummary="Child-Pugh A’da standart doz; Child-Pugh B’de CYP3A4 klirens azalması nedeniyle kaçının/dikkatli olun; Child-Pugh C ağır karaciğer yetmezliğinde MUTLAK KONTRENDİKEDİR!"
        hepaticDetails={[
          'Child-Pugh A: %100 standart doz.',
          'Child-Pugh B–C: Hepatik CYP3A4 eliminasyonu çöker → Child-Pugh C’de kesinlikle yasaktır!',
        ]}
        {...STANDALONE_ORGAN_PART2['ticagrelor']}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="tca-special"
        geriatricReductionBadge="Yaş ≥75 Doz Azaltımı Yok (Ama POPular AGE’de Kanama Yüksek!)"
        geriatricPoints={[
          'Prasugrelden Farkı: Yaş ≥75 veya kilo <60 kg için resmi doz azaltımı yoktur (90 mg q12sa); ancak POPular AGE çalışmasında ≥70 yaş NSTE-ACS’de Tikagrelor Klopidogrele göre daha fazla kanama ve dispne nedeniyle ilaç bırakmaya yol açmıştır!',
          'Yaşlıda Bradikardi & Senkop Dikkat: İleti sistemi yaşlanmış hastalarda beta-bloker + Tikagrelor kombinasyonu semptomatik sinüs duraklamalarını artırabilir; mutlaka Pantoprazol 40 mg/gün ekleyin!',
        ]}
        obesityWeightScalarBadge="Sabit 90 mg / 60 mg q12sa · Obezitede Güçlü Etkinlik"
        obesityPoints={[
          'Kilo Bağımsız Sabit Doz: <60 kg’da doz düşürülmez, morbid obezitede (BMI ≥35–40) doz artırılmaz; doğrudan aktif olduğu için obezlerde Klopidogrele göre çok daha tutarlı P2Y₁₂ blokajı sağlar.',
        ]}
        clinicalNote="Tikagrelor tüm erişkin ağırlıklarında sabit 90 mg (veya >12 ay 60 mg) q12sa uygulanır:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Tikagrelor"
        recommendedScalar="IBW"
        secondaryScalar={{ type: 'TBW', context: 'Erişkin Sabit 90 mg / 60 mg q12sa (Kilo Ayarı Yok)' }}
        rationale="Tikagrelor <60 kg’da veya morbid obezitede doz ayarı gerektirmez; sabit 90 mg q12sa (veya >12 ay 60 mg q12sa) uygulanır."
        currentWeightKg={adultWeightKg}
        onApplyWeight={(w) => setAdultWeightKg(Math.max(40, Math.min(180, Math.round(w))))}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="tca-preg"
        pregnancySummary="İnsan gebelik verisi kısıtlıdır; hayvan çalışmalarında yüksek dozlarda üreme toksisitesi görüldüğünden gebelikte önerilmez (zorunlu nadir olgularda doğum/epidural öncesi en az 5–7 gün kesilmelidir!)."
        pregnancyDetails={[
          'Gebelikte nadir AKS/stent durumunda daha geniş klinik deneyime sahip Klopidogrel tercih edilir.',
        ]}
        lactationSummary="Hayvan sütüne geçer ve yenidoğanda kanama riski taşır — emzirme döneminde KAÇINILMASI önerilir!"
        lactationDetails={[
          'Anne için Tikagrelor zorunluysa emzirmenin kesilmesi veya alternatif strateji değerlendirilir.',
        ]}
      />

      {/* 13. YAN ETKİLER (ADENOZİN İMZASI!) */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="tca-adr"
        items={[
          {
            title: 'Majör & Minör Kanama (GİS, İntrakraniyal, Cerrahi — Plt Transfüzyonuna Dirençli!)',
            incidenceOrSeverity: 'En Önemli Risk · Acil Reversalı Zor!',
            detail:
              'PLATO’da non-KABG majör kanama Klopidogrelden yüksektir ve acil kanamada standart trombosit transfüzyonu ilk 24 saatte etkisizdir — tüm DAPT hastalarına Pantoprazol 40 mg/gün ekleyin!',
            tone: 'rose',
          },
          {
            title: 'Adenozin İlişkili Dispne (~%14–15 Hasta — PLATO)',
            incidenceOrSeverity: 'Çok Sık · Benign ama İlaç Bırakma Nedeni!',
            detail:
              'Genellikle ilk günlerde başlayan hafif-orta efor/istirahat nefes darlığı; SpO₂, akciğer muayenesi, BNP ve solunum fonksiyonları NORMALDİR! KKY/PE dışlandıktan sonra tolere edilemezse Prasugrel veya Klopidogrele geçilir.',
            tone: 'amber',
          },
          {
            title: 'Ventriküler Duraklamalar (≥3 sn), Sinüs Bradikardisi & AV Blok',
            incidenceOrSeverity: 'Erken Dönem · Özellikle Noktürnal',
            detail:
              'ENT-1 adenozin artışı sinoatriyal ve AV düğümü baskılar — hasta sinüs sendromu veya pilsiz 2.–3. derece AV blokta kaçının!',
            tone: 'amber',
          },
          {
            title: 'Hiperürisemi, Gut Atağı & Hafif Geçici Kreatinin Artışı',
            incidenceOrSeverity: 'Sık · Geri Dönüşlü',
            detail:
              'Adenozin metabolizması ürik asidi artırarak gut alevlenmesi yapabilir; serum kreatininde hafif geri dönüşlü artış (~%7–10) görülebilir.',
            tone: 'indigo',
          },
          {
            title: 'Santral Uyku Apnesi / Cheyne-Stokes Solunumu & Nadir TTP',
            incidenceOrSeverity: 'Nadir · Olgu Bildirimleri',
            detail:
              'Adenozin aracılı kemoreseptör duyarlılaşmasıyla nadiren Cheyne-Stokes solunumu ve çok nadiren TTP bildirilmiştir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="tca-cautions"
        items={[
          {
            title: 'Neden Acil KABG’de CytoSorb® Hemoadsorpsiyon? (ESC 2022 / EACTS)',
            detail:
              'Tikagrelor kullanan hasta son 24–48 saat içinde acil açık kalp cerrahisine (KABG / aort diseksiyonu) alınırsa trombosit transfüzyonu etkisizdir. Kardiyopulmoner bypass (KPB) devresine entegre edilen CytoSorb® polimerik adsorpsiyon kolonu, Tikagreloru dakikalar içinde kandan fiziksel olarak temizleyerek perioperatif kanama ve transfüzyon ihtiyacını belirgin azaltır!',
          },
          {
            title: 'Günde 2 Kez (q12sa) Doz Atlama Tehlikesi!',
            detail:
              'Geri dönüşlü bağlanma nedeniyle 2–3 ardışık dozun atlanması trombosit inhibisyonunu hızla çökerterek taze stentte akut stent trombozuna yol açabilir — ilaç uyumu zayıf hastalarda günde tek doz Prasugrel veya Klopidogrel daha güvenlidir.',
          },
          {
            title: 'Paxlovid (Nirmatrelvir/Ritonavir) & Klaritromisin — Sessiz Ölümcül Etkileşim!',
            detail:
              'Poliklinikte pnömoni/sinüzit için Klaritromisin veya COVID-19 için Paxlovid reçete edilmesi, Tikagrelor düzeyini 5–7 kat yükselterek spontan intrakraniyal veya masif GİS kanaması tetikler — mutlaka Azitromisin gibi CYP3A4 etkileşimsiz alternatif seçin!',
          },
          {
            title: 'Tikagrelor → Klopidogrel Geçişinde Yükleme Şarttır!',
            detail:
              'Dispne, maliyet veya AF+DOAC gelişimi nedeniyle Tikagrelordan Klopidogrele geçerken doğrudan 75 mg/gün başlamak 3–5 günlük korumasız açık pencere (stent trombozu!) bırakır — son Tikagrelordan ~24 saat sonra 600 mg Klopidogrel yüklemesi yapılmalıdır!',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="tca-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Allosterik Geri Dönüşlü P2Y₁₂ Antagonizmi & ENT-1 Adenozin İkili Mekanizması',
          summary:
            'Tikagrelor, ADP analogu (ATP türevi siklopentiltriazolopirimidin) yapısıyla P2Y₁₂ reseptörünü ADP’nin bağlandığı bölgeden farklı bir allosterik cepten geri dönüşlü kilitler ve aynı anda adenozin taşınmasını inhibe eder:',
          points: [
            'Biyoaktivasyonsuz Hızlı Etki (30–60 dk): Doğrudan aktif molekül olduğundan CYP2C19 genetik varyasyonlarından ve PPI’lardan tamamen bağımsızdır; 180 mg yükleme sonrası 2 saatte ~%88 trombosit blokajı sağlar.',
            'Geri Dönüşlü Kinetik: Plazma konsantrasyonu düştükçe reseptörden ayrılır — bu sayede kesildikten sonra trombosit fonksiyonu 3–5 günde geri döner (ESC cerrahi 3–5g), ancak serbest dolaşan ilaç ilk 24 saatte transfüze trombositleri de bloke eder!',
            'ENT-1 Blokajı (Adenozin Artışı): Yerel adenozin artışı A2A reseptörleriyle koroner vazodilatasyon ve antiinflamatuar etki yaratırken, A1 reseptörleriyle SA/AV düğüm baskılanması (bradikardi/duraklama) ve vagal C-lif uyarımıyla dispne oluşturur.',
          ],
        }}
        intracellularSignaling={{
          title: 'cAMP/VASP Kilitlenmesi, ASA >100 mg Paradoksu & CYP3A4/P-gp Etkileri',
          summary:
            'Tikagrelorun klinik kurallarını doğrudan belirleyen moleküler etkileşimler:',
          points: [
            'PLATO ASA >100 mg Paradoksu: Yüksek doz Aspirin (>100 mg/gün) endotelyal COX-2/PGI₂ sentezini baskılayarak Tikagrelorun güçlü P2Y₁₂ + adenozin kaynaklı vasküler koruyucu dengesini bozar — bu nedenle ASA kesinlikle 75–100 mg/gün ile sınırlandırılır!',
            'CYP3A4 Bağımlı Eliminasyon: Güçlü CYP3A4 inhibitörleri hem ana ilacın yıkımını durdurarak toksik kanama yaratır; indükleyiciler ise ilacı hızla yok ederek stent trombozu doğurur.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Koroner & Serebral Dolaşım',
            tissueTarget: 'Trombosit P2Y₁₂ (Allosterik) · Koroner Mikrovaskülatür',
            accent: 'teal',
            points: [
              'PLATO’da hem PCI hem medikal AKS’de mortaliteyi azaltmıştır; THALES/CHANCE-2’de minör iskemik inmede etkindir.',
              'Geçmiş İKK’da MUTLAK KONTRENDİKE; geçmiş iskemik inme/TIA’da kullanılabilir.',
            ],
          },
          {
            systemTitle: 'Solunum & Kardiyak İleti Sistemi (Adenozin Etkisi)',
            tissueTarget: 'Vagal C-Lifleri · SA / AV Düğüm (Adenozin A1)',
            accent: 'amber',
            points: [
              '~%14–15 hastada normal SpO₂ ile seyreden benign dispne oluşturur (KKY/PE dışlanmalıdır!).',
              'İlk haftada noktürnal ≥3 sn ventriküler duraklamalar yapabilir — pilsiz ileri AV blok/SSS’de kaçının.',
            ],
          },
          {
            systemTitle: 'Acil Cerrahi / KPB Hemostazı & Nöraksiyel Kanal',
            tissueTarget: 'Serbest Plazma İlacı · Epidural Venöz Pleksus',
            accent: 'rose',
            points: [
              'Elektif cerrahi/KABG öncesi 3–5 gün, ASRA nöraksiyel blok öncesi 5–7 gün kesilir.',
              'Acil kanamada ilk 24 saatte trombosit transfüzyonu ETKİSİZDİR — TXA + KPB’de CytoSorb® hemoadsorpsiyon!',
            ],
          },
          {
            systemTitle: 'Karaciğer (CYP3A4) & Pürin Metabolizması',
            tissueTarget: 'Hepatik CYP3A4 / P-gp · Ürik Asit',
            accent: 'indigo',
            points: [
              'Child-Pugh C’de MUTLAK YASAK; Simvastatin/Lovastatin >40 mg yasak; Digoksin düzeyi izlenir.',
              'Adenozin yıkımıyla serum ürik asit yükselir ve gut atağı tetiklenebilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'PLATO → PEGASUS (60 mg) & TWILIGHT (Monoterapi) Evrimi',
          summary:
            'Tikagrelor, modern kardiyolojide hastanın kanama ve iskemik riskine göre esnek doz/süre modülasyonuna olanak tanır:',
          points: [
            'İlk 12 Ay (90 mg q12sa + ASA ≤100 mg) → >12 Ay Yüksek İskemik Risk (PEGASUS 60 mg q12sa + ASA ≤100 mg).',
            'Yüksek Kanama Riskli PCI (TWILIGHT): 3. ayda Aspirini kesip tek başına Tikagrelor 90 mg q12sa devam etmek kanamayı %44 düşürür!',
            'AF + DOAC Gelişirse: Tikagreloru kesip 24 saat sonra 600 mg yükleme → 75 mg/gün Klopidogrele geçin!',
          ],
        }}
        clinicalPearls={[
          'Acil Kanamada Trombosit Boşa Gider: Tikagrelor alan hasta kanıyorsa ilk 24 saatte trombosit transfüzyonu etkisizdir — TXA 1 g IV, cerrahi hemostaz ve acil KPB’de CytoSorb® düşün!',
          'Aspirin ≤100 mg Altın Kuralı: Tikagrelorla birlikte 150/300 mg Aspirin yazılması etkinliği iptal eder — daima 81–100 mg/gün!',
          'Klaritromisin & Paxlovid = Kırmızı Alarm: Güçlü CYP3A4 inhibitörleriyle kesinlikle kombine etme (fatal kanama)!',
          'Dispne ≠ Akciğer Ödemi: SpO₂ ve BNP normalse Tikagrelor dispnesini tanı — tolere edilemezse 24 sa sonra Prasugrel/Klopidogrele yükleyerek geç!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="tca-refs"
        drugName="Tikagrelor"
        drugsComUrl="https://www.drugs.com/drug-interactions/ticagrelor.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Güçlü CYP3A4 İnhibitörleri (Klaritromisin · Vorikonazol · Ketokonazol · İtrakonazol · Ritonavir / Paxlovid)',
            mechanism: 'Tikagrelorun Ana Eliminasyon Yolağı Olan CYP3A4’ün Tam Blokajı',
            clinicalEffect:
              'Tikagrelor plazma AUC’sinde 5–7 kat artış → ölümcül intrakraniyal / GİS kanaması!',
            management:
              'MUTLAK KONTRENDİKE — Azitromisin veya CYP3A4 etkileşimsiz alternatif seçin!',
          },
          {
            severity: 'X',
            agent: 'Oral Antikoagülanlar (DOAC / Varfarin — Triple Terapi) & Simvastatin / Lovastatin >40 mg',
            mechanism: 'Aşırı Hemostaz İnhibisyonu (OAC) · CYP3A4 İnhibisyonu (Simvastatin/Lovastatin AUC 2–3× ↑)',
            clinicalEffect:
              'OAC ile hayatı tehdit eden kanama; Simvastatin/Lovastatin >40 mg ile miyopati/RABDOMİYOLİZ!',
            management:
              'AF+PCI’da Klopidogrele geçin; statin olarak Atorvastatin veya Rosuvastatin tercih edin.',
          },
          {
            severity: 'D',
            agent: 'Aspirin >100 mg/gün (örn. 150–325 mg/gün İdame)',
            mechanism: 'Yüksek Doz ASA’nın Endotelyal PGI₂ İnhibisyonu (PLATO — FDA Kutu Uyarısı!)',
            clinicalEffect:
              'Tikagrelorun kardiyovasküler koruyucu etkinliğinde belirgin kayıp!',
            management:
              'Eşzamanlı Aspirin idame dozu KESİNLİKLE 75–100 mg/gün olmalıdır!',
          },
          {
            severity: 'D',
            agent: 'Güçlü CYP3A4 İndükleyiciler (Rifampisin · Fenitoin · Karbamazepin · Fenobarbital · Sarı Kantaron)',
            mechanism: 'CYP3A4 İndüksiyonu ile Tikagrelor Klirensinin Aşırı Hızlanması',
            clinicalEffect:
              'Tikagrelor AUC’sinde >%80 düşüş → antiplatelet etki kaybı & STENT TROMBOZU!',
            management:
              'Birlikte KULLANMAYIN — alternatif antiepileptik (Levetirasetam) veya P2Y₁₂ stratejisi seçin.',
          },
          {
            severity: 'C',
            agent: 'Digoksin & Siklosporin (P-gp Substratları) · Beta-Bloker / Verapamil / Diltiazem',
            mechanism: 'P-gp İnhibisyonu (Digoksin Cmax %75 ↑) · Aditif SA/AV Düğüm Baskılanması (Adenozin)',
            clinicalEffect:
              'Digoksin toksisitesi (aritmi/bulantı) ve semptomatik sinüs bradikardisi / AV blok.',
            management:
              'Digoksin düzeylerini ve EKG/kalp hızını yakından izleyin; PPI’larla (Omeprazol dahil) etkileşimi YOKTUR!',
          },
          {
            severity: 'C',
            agent: 'IV Morfin / Fentanil (AKS Yüklemesi Sırasında)',
            mechanism: 'Opioid Aracılı Gastrik Boşalma Gecikmesi',
            clinicalEffect:
              '180 mg Tikagrelor yüklemesinin pik etki süresi 1–2+ saat gecikebilir.',
            management:
              'Primer PCI’da tabletlerin ezilerek verilmesi (MOJITO protokolü) emilimi hızlandırır.',
          },
        ]}
        references={[
          {
            authors: 'Wallentin L, Becker RC, Budaj A, et al. (PLATO Investigators)',
            title: 'Ticagrelor versus Clopidogrel in Patients with Acute Coronary Syndromes',
            journal: 'New England Journal of Medicine',
            year: 2009,
            note: '18.624 AKS hastasında Tikagrelorun Klopidogrele kıyasla kardiyovasküler ve tüm nedenlere bağlı mortaliteyi azalttığını gösteren landmark RKÇ.',
          },
          {
            authors: 'Bonaca MP, Bhatt DL, Cohen M, et al. (PEGASUS-TIMI 54 Steering Committee)',
            title: 'Long-Term Use of Ticagrelor in Patients with Prior Myocardial Infarction',
            journal: 'New England Journal of Medicine',
            year: 2015,
            note: 'MI sonrası >12 ayda 60 mg q12sa Tikagrelor + düşük doz ASA’nın uzatılmış korumasını kanıtlayan landmark RKÇ.',
          },
          {
            authors: 'Mehran R, Baber U, Sharma SK, et al. (TWILIGHT Investigators)',
            title: 'Ticagrelor with or without Aspirin in High-Risk Patients after PCI',
            journal: 'New England Journal of Medicine',
            year: 2019,
            note: '3 ay DAPT sonrası Aspirini kesip tekli Tikagrelor 90 mg q12sa devam etmenin kanamayı %44 azalttığını kanıtlayan RKÇ.',
          },
          {
            authors: 'Johnston SC, Amarenco P, Denison H, et al. (THALES Investigators)',
            title: 'Ticagrelor and Aspirin or Aspirin Alone in Acute Ischemic Stroke or TIA',
            journal: 'New England Journal of Medicine',
            year: 2020,
            note: 'Minör-orta akut iskemik inme (NIHSS ≤5) ve yüksek riskli TIA’da 30 günlük Tikagrelor + ASA protokolü.',
          },
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Task Force)',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes',
            journal: 'European Heart Journal',
            year: 2023,
            note: 'AKS’de Tikagrelor 180→90 mg, 3. ay monoterapi, P2Y₁₂ geçiş ve ASA ≤100 mg kılavuzu.',
          },
          {
            authors: 'Halvorsen S, Mehilli J, Cassese S, et al. (ESC Task Force)',
            title: '2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery',
            journal: 'European Heart Journal',
            year: 2022,
            note: 'Elektif non-kardiyak cerrahi ve KABG öncesi Tikagrelorun 3–5 gün kesilmesi ve acil KPB’de hemoadsorpsiyon önerisi.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'Spinal/epidural ponksiyon ve derin blok öncesi Tikagrelorun 5–7 gün kesilmesi kuralı.',
          },
          {
            authors: 'Bhatt DL, Pollack CV, Mazer CD, et al. (REVERSE-IT Investigators)',
            title: 'Bentracimab for Ticagrelor Reversal in Patients Undergoing Urgent Surgery',
            journal: 'NEJM Evidence',
            year: 2022,
            note: 'Trombosit transfüzyonuna dirençli Tikagrelor etkisinin spesifik Fab antidotu Bentracimab ile hızla tersine çevrilmesi kanıtı.',
          },
        ]}
      />

      {/* Alt Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          PLATO · PEGASUS · TWILIGHT · THALES · ESC 2022/2023 · ASRA 2018 ile Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Antitrombotik · Geri Dönüşlü P2Y₁₂
        </span>
      </div>
    </div>
  );
};
