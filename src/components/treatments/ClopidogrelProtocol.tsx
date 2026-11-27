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

type CalcTab = 'loading_calc' | 'periop_asra' | 'cyp_ppi_audit' | 'p2y12_compare';
type ClopIndication = 'acs_pci' | 'stemi_fibrinolysis' | 'minor_stroke_tia' | 'chronic_af_pci' | 'p2y12_switch';
type StentWindow = 'no_stent_or_6m' | 'des_1_6m' | 'fresh_stent_lt1m';
type SurgeryUrgency = 'elective' | 'urgent_bleed';
type PpiChoice = 'none' | 'pantoprazole' | 'rabeprazole' | 'lansoprazole' | 'omeprazole' | 'esomeprazole';

interface InteractionFactor {
  id: string;
  label: string;
  sublabel: string;
  severity: 'contraindicated' | 'high' | 'moderate';
}

const CYP_INTERACTIONS: InteractionFactor[] = [
  {
    id: 'cyp2c19_pm',
    label: 'Bilinen CYP2C19 Yavaş Metabolizör (*2/*2, *2/*3, *3/*3) veya Klopidogrel Altında Stent Trombozu',
    sublabel: 'FDA Kutu Uyarısı: Aktif tiyol metabolit oluşmaz → Prasugrel veya Tikagrelora GEÇ!',
    severity: 'contraindicated',
  },
  {
    id: 'repaglinide',
    label: 'Repaglinid (CYP2C8 Substratı Antidiyabetik) Eşzamanlı Kullanımı',
    sublabel: 'Klopidogrel açil-glukuronidi GÜÇLÜ CYP2C8 inhibitörüdür → Repaglinid AUC 4–5× ↑ (Şiddetli Hipoglisemi)!',
    severity: 'contraindicated',
  },
  {
    id: 'strong_cyp2c19_inh',
    label: 'Güçlü CYP2C19 İnhibitörleri (Flukonazol · Vorikonazol · Fluvoksamin · Fluoksetin · Tiklopidin)',
    sublabel: 'Klopidogrel biyoaktivasyonunu ciddi bloke eder → stent trombozu / inme riski!',
    severity: 'high',
  },
  {
    id: 'opioids_morphine',
    label: 'AKS’de IV Morfin / Fentanil Kullanımı (Oral Yükleme Sırasında)',
    sublabel: 'Gastrik boşalmayı yavaşlatarak 600 mg yüklemenin emilimini 1–2+ saat geciktirir (ezerek ver / IV seçenek düşün)!',
    severity: 'moderate',
  },
  {
    id: 'oac_triple',
    label: 'Oral Antikoagülan (Apiksaban · Rivaroksaban · Dabigatran · Edoksaban · Varfarin)',
    sublabel: 'AF + PCI’da Klopidogrel 1. tercih P2Y₁₂’dir; ancak Pantoprazol 40 mg/gün ZORUNLU ve triple süre en kısa tutulur!',
    severity: 'moderate',
  },
  {
    id: 'cyp2c19_inducer',
    label: 'Güçlü CYP2C19 İndükleyiciler (Rifampisin)',
    sublabel: 'Aktif metabolit üretimini aşırı artırır → majör kanama riski yükselir!',
    severity: 'moderate',
  },
];

export const ClopidogrelProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('loading_calc');

  // Tab 1: Endikasyon & Yükleme Dozu
  const [indication, setIndication] = useState<ClopIndication>('acs_pci');
  const [patientAge, setPatientAge] = useState<number>(68);
  const [adultWeightKg, setAdultWeightKg] = useState<number>(75);

  // Tab 2: Perioperatif, ASRA 2018 & Acil Kanama
  const [stentWindow, setStentWindow] = useState<StentWindow>('no_stent_or_6m');
  const [urgency, setUrgency] = useState<SurgeryUrgency>('elective');
  const [neuraxialPlanned, setNeuraxialPlanned] = useState<boolean>(true);
  const [hoursSinceLastDose, setHoursSinceLastDose] = useState<number>(12);

  // Tab 3: CYP2C19 & PPI Denetleyici
  const [ppiChoice, setPpiChoice] = useState<PpiChoice>('pantoprazole');
  const [selectedInteractions, setSelectedInteractions] = useState<string[]>([]);

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useMonographAccordion('clp-moa', false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavItems = [
    { id: 'clp-high-alert', label: 'Yüksek Uyarı' },
    { id: 'clp-moa', label: 'CYP2C19 & ADME' },
    { id: 'clp-contra', label: 'Kontrendikasyonlar' },
    { id: 'clp-indications', label: 'Endikasyonlar' },
    { id: 'clp-calc', label: 'Hesaplayıcı & ASRA' },
    { id: 'clp-tr', label: 'TR Formlar' },
    { id: 'clp-compat', label: 'Uygulama & NG' },
    { id: 'clp-organ', label: 'Organ Yetmezliği' },
    { id: 'clp-special', label: 'Geriatri & Obezite' },
    { id: 'clp-preg', label: 'Gebelik & Laktasyon' },
    { id: 'clp-adr', label: 'Yan Etkiler & TTP' },
    { id: 'clp-cautions', label: 'Klinik Dikkat' },
    { id: 'clp-pd', label: 'Derin Farmakodinami' },
    { id: 'clp-refs', label: 'Etkileşim & Kaynak' },
  ];

  // --- TAB 1 ENDİKASYON METADATASI ---
  const fibrinolysisOver75 = patientAge > 75;
  const indMeta: Record<
    ClopIndication,
    { label: string; loadText: string; maintText: string; guidance: string }
  > = {
    acs_pci: {
      label: 'AKS / Elektif PCI Yükleme (ESC 2023)',
      loadText: '600 mg Yükleme (8× 75 mg tb · Etki 2–4 sa)',
      maintText: '75 mg/gün + ASA 75–100 mg/gün + Pantoprazol 40 mg/gün',
      guidance:
        'ESC 2023: Yüksek kanama riski olmayan AKS hastalarında Prasugrel veya Tikagrelor 1. tercihtir; ancak yüksek kanama riski (HBR), eşzamanlı oral antikoagülan (AF) veya Prasugrel/Tikagrelor kontrendikasyonunda Klopidogrel 600 mg yükleme → 75 mg/gün standarttır.',
    },
    stemi_fibrinolysis: {
      label: 'STEMI Fibrinoliz (Tromboliz · COMMIT / CLARITY)',
      loadText: fibrinolysisOver75
        ? 'YAŞ >75 → YÜKLEME DOZU YOK! (Doğrudan 75 mg/gün!)'
        : 'YAŞ ≤75 → 300 mg Yükleme (4× 75 mg tb)',
      maintText: '75 mg/gün + ASA 75–100 mg/gün (En az 12 ay)',
      guidance:
        'KRİTİK YAŞ SINIRI: STEMI fibrinolizinde 75 yaş üstü hastalarda 300 mg yükleme dozu intrakraniyal kanama riskini artırdığından YÜKLEME YAPILMAZ — doğrudan 75 mg/gün ile başlanır! (Fibrinolizde Prasugrel/Tikagrelor ilk saatlerde verilmez; Klopidogrel standarttır!).',
    },
    minor_stroke_tia: {
      label: 'Minör İskemik İnme (NIHSS ≤3) / Yüksek Riskli TIA (ABCD² ≥4)',
      loadText: '300–600 mg Yükleme (İlk 24 sa · BT Kanama Yok & tPA Yok!)',
      maintText: '75 mg/gün + ASA 75–100 mg/gün × YALNIZCA 21 GÜN → Sonra Monoterapi!',
      guidance:
        'CHANCE (NEJM 2013) & POINT (NEJM 2018): İlk 21 gün kısa süreli DAPT erken tekrarlayan inme riskini belirgin azaltır; 21. günden sonra DAPT sürdürülmesi kanamayı artırıp ek yarar sağlamaz → tekli Klopidogrel 75 mg/gün (veya ASA) monoterapisine geçilir!',
    },
    chronic_af_pci: {
      label: 'Sekonder Koruma · PAH · AF + PCI (OAC ile Kombine)',
      loadText: 'Yükleme Gerekmez (Kararlı etki 3–7 günde)',
      maintText: '75 mg Günde 1 Kez (AF+PCI’da DOAC ile 1. tercih P2Y₁₂!)',
      guidance:
        'AUGUSTUS & ESC 2023: Atriyal fibrilasyon nedeniyle DOAC (Apiksaban/Rivaroksaban vb.) alan PCI hastalarında kanama riski nedeniyle Prasugrel/Tikagrelor yerine Klopidogrel 75 mg/gün seçilir; ayrıca semptomatik PAH’da (CAPRIE) Aspirine üstün monoterapidir.',
    },
    p2y12_switch: {
      label: 'P2Y₁₂ İlaç Değişimi (De-eskalasyon / Eskalasyon · ESC)',
      loadText: 'Tikagrelor → Klopidogrel: 24 sa sonra 600 mg Yükle! | Prasugrel → Klopidogrel: 24 sa sonra 75 mg!',
      maintText: 'Klopidogrel → Tikagrelor: Herhangi bir saatte 180 mg yükle!',
      guidance:
        'Tikagrelor geri dönüşlü ve kısa yarı ömürlü olduğu için Klopidogrele geçerken reseptör boşluğunu kapatmak adına son Tikagrelor dozundan ~24 saat sonra 600 mg Klopidogrel yüklemesi yapılır; Prasugrel zaten geri dönüşsüz olduğundan 24 sa sonra doğrudan 75 mg Klopidogrel ile devam edilir.',
    },
  };

  // --- TAB 2 PERİOPERATİF & ASRA 2018 KARAR MOTORU ---
  const plateletTransfusionEffective = hoursSinceLastDose >= 6;
  const getPeriopVerdict = () => {
    if (urgency === 'urgent_bleed') {
      return {
        tone: 'rose',
        headline: 'ACİL CERRAHİ / KANAMA — KLOPİDOGRELİ KES · TROMBOSİT TRANSFÜZYONU PLANLA!',
        detail: plateletTransfusionEffective
          ? `Son dozdan ${hoursSinceLastDose} saat geçmiş (≥6 sa): Dolaşımdaki aktif tiyol metaboliti (t½ ~30 dk) kandan temizlenmiştir → 2 ünite aferez trombosit transfüzyonu YENİ trombositlerle hemostazı ETKİN BİÇİMDE DÜZELTİR! (Yardımcı: TXA 1 g IV / Desmopressin 0,3 mcg/kg).`
          : `Son dozdan yalnızca ${hoursSinceLastDose} saat geçmiş (<6 sa): Kanda hâlâ serbest aktif metabolit bulunabileceğinden transfüze edilen trombositler kısmen bloke olabilir — mümkünse 4–6. saati bekleyin veya yüksek doz (2+ ünite) aferez trombosit + TXA planlayın!`,
      };
    }
    if (stentWindow === 'fresh_stent_lt1m') {
      return {
        tone: 'rose',
        headline: 'ELEKTİF CERRAHİYİ ERTELE! (<1 Ay Taze Stent — Katastrofik Stent Trombozu Riski!)',
        detail:
          'ESC 2022: Stent implantasyonundan sonraki ilk 1 ayda (AKS/kompleks DES’te ideal 3–6 ay) P2Y₁₂ kesilmesi çok yüksek ölümcül stent trombozu riski taşır! Elektif cerrahi ertelenmeli; ertelenemeyen acil olguda Kardiyoloji ile IV Kangrelor (veya tirofiban/eptifibatid) köprülemesi tartışılmalıdır.',
      };
    }
    if (stentWindow === 'des_1_6m') {
      return {
        tone: 'amber',
        headline: 'KARDİYOLOJİ ONAYIYLA 5 GÜN ÖNCE KES · ASPİRİNİ (75–100 mg) KESİNLİKLE SÜRDÜR!',
        detail:
          'ESC 2022: 1–6 ay arası DES’te zamana duyarlı cerrahi gerekiyorsa Klopidogrel preop 5 gün önce kesilir, Aspirin devam edilir ve postop 24–48 saatte (hemostaz sağlanır sağlanmaz) Klopidogrel yeniden başlanır (AKS öyküsünde tercihen 3–6 ayı tamamlayın).',
      };
    }
    return {
      tone: 'emerald',
      headline: 'PREOP 5 GÜN ÖNCE KES (ESC 2022) · ASPİRİNİ SÜRDÜR · POSTOP 24–48 SAATTE BAŞLA',
      detail:
        'Stent yoksa veya >6 ay geçmişse orta/yüksek kanama riskli elektif cerrahi ve KABG öncesi Klopidogrel 5 gün önce kesilir; sekonder KAH koruması için Aspirin 75–100 mg/gün sürdürülür.',
    };
  };
  const periopVerdict = getPeriopVerdict();

  // --- TAB 3 CYP2C19 & PPI DENETİMİ ---
  const ppiBad = ppiChoice === 'omeprazole' || ppiChoice === 'esomeprazole';
  const ppiCaution = ppiChoice === 'lansoprazole';
  const hasContraInt = selectedInteractions.some(
    (id) => CYP_INTERACTIONS.find((i) => i.id === id)?.severity === 'contraindicated'
  );
  const hasHighInt = selectedInteractions.some(
    (id) => CYP_INTERACTIONS.find((i) => i.id === id)?.severity === 'high'
  );

  const toggleInteraction = (id: string) => {
    setSelectedInteractions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'loading_calc') {
      const m = indMeta[indication];
      return `KLOPİDOGREL ORDER (${m.label}): Yükleme: ${m.loadText} | İdame: ${m.maintText}. DİKKAT: Omeprazol/Esomeprazol YASAK → GİS koruma için Pantoprazol 40 mg/gün!`;
    }
    if (activeTab === 'periop_asra') {
      const asraTxt = neuraxialPlanned
        ? 'ASRA 2018 / ESAIC 2022 NÖRAAKSİYEL: Klopidogrel son dozdan EN AZ 5–7 GÜN geçmeden spinal/epidural ponksiyon YAPILMAZ! Kateter aktif Klopidogrel altında çekilmez.'
        : '';
      return `PERİOPERATİF KLOPİDOGREL (ESC 2022): ${periopVerdict.headline} ${asraTxt}`;
    }
    if (activeTab === 'cyp_ppi_audit') {
      return `KLOPİDOGREL CYP2C19 & PPI DENETİMİ: Seçili PPI: ${ppiChoice.toUpperCase()} (${ppiBad ? 'UYGUNSUZ — PANTOPRAZOL 40 mg/gün İLE DEĞİŞTİR!' : 'UYGUN'}). ${hasContraInt ? 'MAJÖR KONTRENDİKE ETKİLEŞİM MEVCUT (CYP2C19 PM veya Repaglinid)!' : ''}`;
    }
    return `P2Y₁₂ ÖZETİ: Klopidogrel (Ön-ilaç/CYP2C19 · Cerrahi 5g / ASRA 5–7g · >6sa sonra trombosit transfüzyonu ETKİLİ · AF+OAC 1. tercih) | Tikagrelor (Aktif/Geri dönüşlü · Cerrahi 3–5g / ASRA 5–7g · Trombosit transfüzyonu etkisiz) | Prasugrel (Cerrahi 7g / ASRA 7–10g · İnme/TIA’da KONTRENDİKE).`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="clp-high-alert"
        defaultOpen={false}
        tallManName="KLOPIDOGREL (ÖN-İLAÇ · CYP2C19 · ASRA 5–7 GÜN KES · OMEPRAZOL YASAK!)"
        confusionRiskWith="Omeprazol/Esomeprazol (CYP2C19 Blokajı!) · STEMI Fibrinoliz >75y Yükleme Hatası · Repaglinid (CYP2C8 Hipoglisemi)"
        criticalAlerts={[
          'ASRA 2018 / ESAIC 2022 NÖRAAKSİYEL BLOK YASAĞI (5–7 GÜN KESME!): Aspirinden farklı olarak Klopidogrel alan hastada spinal/epidural ponksiyon veya derin sinir bloku KESİNLİKLE YAPILMAZ — en az 5–7 gün önceden kesilmiş olmalıdır! Epidural kateter aktif Klopidogrel altında çekilemez (spinal epidural hematom riski!).',
          'FDA KUTU UYARISI — CYP2C19 ÖN-İLAÇ AKTİVASYONU & OMEPRAZOL/ESOMEPRAZOL YASAĞI!: Klopidogrel etkisiz bir ön-ilaçtır; aktif tiyol metabolite dönüşmek için iki basamakta CYP2C19’a muhtaçtır! Omeprazol ve Esomeprazol CYP2C19’u bloke ederek stent trombozunu tetikler → GİS koruma için DAİMA Pantoprazol 40 mg/gün (veya Rabeprazol) seçin! CYP2C19 yavaş metabolizörlerde Prasugrel/Tikagrelora geçin!',
          'STEMI FİBRİNOLİZİNDE YAŞ >75 = YÜKLEME YOK · MİNÖR İNMEDE 21 GÜN KURALI: Trombolitik alan >75 yaş STEMI hastasına 300 mg yükleme YAPILMAZ (doğrudan 75 mg/gün)! Minör inme/yüksek riskli TIA’da (CHANCE/POINT) Klopidogrel + Aspirin yalnızca 21 gün verilir, sonra monoterapiye geçilir!',
          'ACİL KANAMADA TROMBOSİT TRANSFÜZYONU ETKİNDİR (>4–6 SAAT) & TTP UYARISI!: Aktif metabolit kandan ~4–6 saatte temizlendiği için son dozdan ≥6 saat sonra verilen 2 ünite aferez trombosit hemostazı düzeltir (Tikagrelordan farkı!). İlk 2 haftada anemi + şistosit + trombositopeni + bilinç/böbrek bozukluğu çıkarsa TTP düşün — ilacı kes, trombosit VERME, acil plazmaferez başlat!',
        ]}
        antidoteOrRescue="Spesifik kimyasal antidotu yoktur. (1) Hayatı tehdit eden cerrahi/GİS kanamada: Klopidogrelin dolaşımdaki aktif metabolit yarı ömrü çok kısadır (~30 dk — 4–6 saatte kandan silinir). Son dozdan ≥4–6 saat geçmişse 2 ünite aferez trombosit transfüzyonu (yeni bloke olmamış P2Y₁₂ reseptörleri!) hemostazı etkin biçimde geri kazandırır; Traneksamik asit (1 g IV) ve Desmopressin (0,3 mcg/kg) destek olarak eklenebilir. (2) Hemodiyaliz Klopidogreli temizlemez!"
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Antitrombotik · Geri Dönüşsüz P2Y₁₂ İnhibitörü (Tiyenopiridin Ön-İlaç)
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Plavix® · Pingel® · Karum® · Planor® 75 mg Tablet
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                ESC 2022/2023 · ASRA 2018 · CHANCE/POINT · AUGUSTUS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Klopidogrel{' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Plavix® · Pingel® · Karum® · Planor® · Atervix®)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Karaciğerde <strong>CYP2C19</strong> aracılığıyla iki basamakta aktif tiyol metabolite dönüşerek
              trombosit <strong>P2Y₁₂ ADP reseptörünü</strong> trombosit ömrü boyunca (<strong>7–10 gün</strong>)
              geri dönüşsüz bloke eden 2. kuşak tiyenopiridin antiplatelet ajandır. Yüksek kanama riskli AKS,{' '}
              <strong>STEMI fibrinolizi</strong>, <strong>AF + PCI (DOAC ile kombine 1. tercih P2Y₁₂)</strong>,{' '}
              <strong>minör iskemik inme/TIA (21 gün DAPT)</strong> ve <strong>periferik arter hastalığında</strong>{' '}
              temel tedavidir. Anestezi pratiğinde <strong>elektif cerrahiden 5 gün</strong>,{' '}
              <strong>spinal/epidural nöraksiyel bloktan 5–7 gün önce kesilmesi</strong> zorunludur.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: B01AC04 · Ön-İlaç (%15 CYP2C19) · Etki 7–10 Gün
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Yükleme &amp; İdame Dozu
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              300–600 → 75 mg/gün
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Fibrinoliz &gt;75y: Yükleme YOK (75 mg)!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Cerrahi &amp; ASRA 2018
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              Cerrahi 5g · Nöraksiyel 5–7g
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Taze stentte (&lt;1 ay) elektif cerrahiyi ERTELE!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              CYP2C19 &amp; Doğru PPI
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              Pantoprazol ✅ · Omeprazol ❌
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Repaglinid (CYP2C8) = Ağır Hipoglisemi!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Acil Kanama Tersine Çevirme
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              2 Ü Aferez Plt (&gt;4–6 sa)
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Aktif metabolit t½ ~30 dk · Diyalizlenmez
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & CYP2C19 ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="clp-moa"
          sectionTitle="Etki Mekanizması: İki Basamaklı CYP2C19 Biyoaktivasyonu & Geri Dönüşsüz P2Y₁₂ Blokajı"
          summary="Klopidogrel kendi başına farmakolojik olarak İNAKTİF bir ön-ilaçtır. Emilimin ardından %85’i karaciğer esterazlarıyla (CES1) inaktif karboksilik aside yıkılır; kalan %15’i başta CYP2C19 olmak üzere sitokrom P450 enzimleriyle 2 basamakta aktif tiyol metabolite çevrilerek trombosit P2Y₁₂ ADP reseptörünü ömür boyu (7–10 gün) kapatır."
          pillars={[
            {
              title: '1. İki Basamaklı CYP2C19 Aktivasyonu (%15 Aktif Yolak)',
              detail:
                'Önce 2-okso-klopidogrele, ardından aktif tiyol metabolite dönüşür. CYP2C19 bu iki basamağın HER İKİSİNDE de ana enzimdir — genetik CYP2C19*2/*3 mutasyonları veya Omeprazol/Esomeprazol bu kilidi bozarak etkisizliğe yol açar!',
            },
            {
              title: '2. P2Y₁₂ ADP Reseptöründe Kovalent Disülfid Köprüsü',
              detail:
                'Aktif tiyol metaboliti, trombosit yüzeyindeki P2Y₁₂ reseptörüne geri dönüşsüz bağlanarak ADP aracılı GPIIb/IIIa aktivasyonunu ve trombosit agregasyon amplifikasyonunu trombosit ömrü boyunca (7–10 gün) kalıcı durdurur.',
            },
            {
              title: '3. Aspirinle Sinerji (DAPT) & Kısa Aktif Metabolit Ömrü (~30 dk)',
              detail:
                'Aspirin TXA₂ yolunu, Klopidogrel ADP-P2Y₁₂ yolunu kapatarak güçlü sinerji sağlar. Aktif tiyol metabolitinin plazma ömrü yalnızca ~30 dk olduğundan son dozdan 4–6 saat sonra verilen taze trombosit transfüzyonu yeni reseptörlerle hemostazı geri getirir!',
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
                Detaylı Farmakokinetik (ADME): %85 CES1 Yıkımı, 600 mg vs 300 mg Yükleme Kinetiği & CYP2C8 İnhibisyonu
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
                  A — Absorpsiyon &amp; Yükleme Hızı (600 mg vs 300 mg)
                </div>
                Oral emilimi ≥%50’dir ve gıdalardan anlamlı etkilenmez. <strong>600 mg yükleme</strong> 2–4 saatte
                (ezilerek NG’den ~1–2 saatte!) maksimum inhibisyona ulaşırken, <strong>300 mg yükleme</strong> 6–8 saat,{' '}
                <strong>yüklemesiz 75 mg/gün</strong> ise 3–7 gün alır! AKS’de IV Morfin/Fentanil emilimi 1–2+ saat
                geciktirebilir.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — Protein Bağlanması &amp; Diyalizlenmezlik
                </div>
                Ana ilaç %98, inaktif karboksilik asit metaboliti %94 plazma proteinlerine bağlanır. Aktif tiyol
                metaboliti hızla trombositlere kovalent bağlandığından <strong>hemodiyaliz veya CRRT ile temizlenmez</strong>.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M — Hepatik Metabolizma (CES1 · CYP2C19 · CYP2C8 İnhibisyonu!)
                </div>
                %85’i CES1 ile inaktif karboksilik aside, bunun bir kısmı <strong>klopidogrel açil-β-D-glukuronidine</strong>{' '}
                dönüşür — bu metabolit <strong>GÜÇLÜ bir CYP2C8 inhibitörüdür</strong> (Repaglinid ile ölümcül hipoglisemi,
                Paklitaksel toksisitesi!). Yalnızca %15’i CYP2C19/3A4/1A2/2B6 ile aktif tiyol metabolite çevrilir.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  E — Eliminasyon &amp; Trombosit Yenilenmesi
                </div>
                Metabolitlerin ~%50’si idrarla, ~%46’sı feçesle atılır. Aktif metabolitin plazma t½’si ~30 dk olsa da
                hemostatik etki kemik iliğinden günde ~%10–15 yeni trombosit üretimiyle <strong>5 günde</strong> büyük
                ölçüde, <strong>7–10 günde</strong> tamamen normale döner.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="clp-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Aktif patolojik kanama (aktif peptik ülser kanaması, intrakraniyal kanama, retroperitoneal kanama vb.).',
          'Ağır karaciğer yetmezliği (Child-Pugh C — EMA ve Türkiye SmPC kontrendikasyonu: ağır koagülopati, varis kanaması & bozulmuş CYP biyoaktivasyonu!).',
          'Klopidogrel veya yardımcı maddelere aşırı duyarlılık, anafilaksi veya geçmiş Klopidogrel ilişkili TTP (Trombotik Trombositopenik Purpura) öyküsü.',
          'Akut iskemik inmede IV tromboliz (Alteplaz / Tenekteplaz) sonrası ilk 24 SAAT (intrakraniyal kanama riski!).',
          'Eşzamanlı Repaglinid (CYP2C8 güçlü inhibisyonu → şiddetli/uzamış hipoglisemi riski!).',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Yüksek Dikkat Durumları"
        relativeItems={[
          'Bilinen CYP2C19 yavaş metabolizör genotipi (*2/*2, *2/*3, *3/*3) veya Klopidogrel altında geçirilmiş stent trombozu → Prasugrel veya Tikagrelora geçin!',
          'Eşzamanlı Omeprazol veya Esomeprazol kullanımı (CYP2C19 inhibisyonu → derhal Pantoprazol 40 mg/gün ile değiştirin!).',
          'Planlanan elektif orta/yüksek kanama riskli cerrahi veya KABG (5 gün önce kes!) ve planlanan spinal/epidural blok (5–7 gün önce kes!).',
          'Diğer tiyenopiridinlerle (Tiklopidin, Prasugrel) geçmiş çapraz hematolojik/alerjik reaksiyon öyküsü.',
          'Gebelik ve emzirme (yeterli insan verisi yok — doğum/epidural öncesi 5–7 gün kesilmeli; emzirmede kaçınılır).',
        ]}
        clinicalNote="ASRA 2018 & ESAIC 2022 Kesin Kuralı: Klopidogrel, Aspirinden farklı olarak spinal/epidural ponksiyon, derin periferik blok ve epidural kateter çekilmesi için KESİNLİKLE 5–7 GÜN ÖNCE KESİLMELİDİR!"
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="clp-indications"
        title="Klinik Endikasyonlar & Kanıta Dayalı Doz Rejimleri (ESC 2023 · AHA/ASA · AUGUSTUS · CAPRIE)"
        subtitle="Yüksek kanama riskli AKS, STEMI fibrinolizi, AF + PCI ve 21 günlük kısa DAPT inme protokollerinin temel P2Y₁₂ ajanı"
        icon={<BookOpen className="w-5 h-5 text-teal-500 shrink-0" />}
        defaultOpen={false}
      >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  1. AKS / Elektif PCI &amp; STEMI Fibrinolizi (ESC 2023)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  600 / 300 → 75 mg
                </span>
              </div>
              <p className={mutedText}>
                <strong>Elektif PCI / HBR AKS:</strong> <strong>600 mg yükleme</strong> → <strong>75 mg/gün</strong>{' '}
                (+ ASA 75–100 mg/gün). <strong>STEMI Fibrinolizi:</strong> Yaş <strong>≤75</strong> ise{' '}
                <strong>300 mg yükleme</strong> → 75 mg/gün; yaş <strong>&gt;75</strong> ise{' '}
                <strong>YÜKLEME DOZU YOK</strong>, doğrudan 75 mg/gün!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  2. Minör İskemik İnme &amp; Yüksek Riskli TIA (CHANCE / POINT)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  21 Gün DAPT!
                </span>
              </div>
              <p className={mutedText}>
                NIHSS ≤3 minör inme veya ABCD² ≥4 yüksek riskli TIA’da (BT’de kanama yok, tPA verilmediyse) ilk 24
                saatte <strong>300–600 mg yükleme</strong>, ardından <strong>yalnızca 21 gün</strong> boyunca 75 mg/gün
                + ASA 75–100 mg/gün; 22. günden itibaren tekli antiplatelet monoterapisine dönülür!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  3. Atriyal Fibrilasyon + PCI (OAC İle Kombine · AUGUSTUS)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  1. Tercih P2Y₁₂
                </span>
              </div>
              <p className={mutedText}>
                DOAC (Apiksaban/Rivaroksaban/Dabigatran/Edoksaban) veya Varfarin kullanan PCI hastalarında Prasugrel ve
                Tikagrelor yüksek kanama nedeniyle kaçınılır — <strong>Klopidogrel 75 mg/gün</strong> seçilir (kısa 1–4
                hafta triple terapi → ardından DOAC + Klopidogrel dual terapi + Pantoprazol!).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. Periferik Arter Hastalığı (PAH) &amp; ASA İntoleransı (CAPRIE)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  75 mg/gün
                </span>
              </div>
              <p className={mutedText}>
                CAPRIE çalışmasına göre semptomatik periferik arter hastalığında (PAH) Klopidogrel 75 mg/gün monoterapisi
                Aspirine göre majör vasküler olayları daha etkin azaltır; ayrıca Aspirin alerjisi / AERD hastalarında
                sekonder CV korumanın 1. tercih alternatifidir.
              </p>
            </div>
          </div>
      </MonographAccordionSection>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="clp-calc"
        title="Klopidogrel Yükleme, ASRA 2018 Perioperatif & CYP2C19/PPI Karar Hesaplayıcısı"
        subtitle="ESC 2022/2023 yükleme/switch, ASRA 5–7g kesme & acil trombosit transfüzyonu, CYP2C19/PPI ve P2Y₁₂ kıyaslama"
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
              { id: 'loading_calc' as CalcTab, label: '1. Yükleme & Switch', icon: Syringe },
              { id: 'periop_asra' as CalcTab, label: '2. Perioperatif & ASRA', icon: Activity },
              { id: 'cyp_ppi_audit' as CalcTab, label: '3. CYP2C19 & PPI', icon: ShieldAlert },
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

          {/* TAB 1: YÜKLEME & SWITCH */}
          {activeTab === 'loading_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold">Klinik Senaryo Seçin</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Object.keys(indMeta) as ClopIndication[]).map((key) => (
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

                {indication === 'stemi_fibrinolysis' && (
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <label htmlFor={`${uniqueId}-age`} className="block text-xs font-bold mb-1">
                      Hasta Yaşı (STEMI Fibrinoliz Sınırı: 75 Yaş):{' '}
                      <span className={fibrinolysisOver75 ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'}>
                        {patientAge} yaş
                      </span>
                    </label>
                    <input
                      id={`${uniqueId}-age`}
                      type="range"
                      min={35}
                      max={95}
                      step={1}
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                )}
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {indMeta[indication].label}
                </div>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-[10px] font-bold uppercase opacity-70">Yükleme / Geçiş Protokolü</div>
                  <div className="text-base font-black text-rose-600 dark:text-rose-400 mt-0.5">
                    {indMeta[indication].loadText}
                  </div>
                </div>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-[10px] font-bold uppercase opacity-70">İdame Rejimi</div>
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

          {/* TAB 2: PERİOPERATİF, ASRA 2018 & ACİL KANAMA */}
          {activeTab === 'periop_asra' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">1. Koroner Stent / AKS Durumu</label>
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
                  <label className="block text-xs font-bold mb-1.5">2. Klinik Durum</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'elective' as SurgeryUrgency, label: 'Elektif Cerrahi / KABG' },
                      { id: 'urgent_bleed' as SurgeryUrgency, label: 'Acil Cerrahi / Majör Kanama' },
                    ].map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setUrgency(u.id)}
                        className={`p-2.5 rounded-xl border text-xs font-bold ${
                          urgency === u.id
                            ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {u.label}
                      </button>
                    ))}
                  </div>
                </div>

                {urgency === 'urgent_bleed' && (
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <label htmlFor={`${uniqueId}-lasthrs`} className="block text-xs font-bold mb-1">
                      Son Klopidogrel Dozundan Geçen Süre:{' '}
                      <span className={plateletTransfusionEffective ? 'text-emerald-500' : 'text-rose-500'}>
                        {hoursSinceLastDose} saat
                      </span>
                    </label>
                    <input
                      id={`${uniqueId}-lasthrs`}
                      type="range"
                      min={1}
                      max={48}
                      step={1}
                      value={hoursSinceLastDose}
                      onChange={(e) => setHoursSinceLastDose(Number(e.target.value))}
                      className="w-full accent-indigo-600"
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
                      • <strong>Ponksiyon Öncesi:</strong> Son Klopidogrel dozundan <strong>EN AZ 5–7 GÜN</strong>{' '}
                      geçmeden spinal/epidural blok veya derin pleksus bloku <strong>KESİNLİKLE YAPILMAZ!</strong>
                    </p>
                    <p>
                      • <strong>Kateter Çekilimi &amp; Yeniden Başlama:</strong> Epidural kateter aktif Klopidogrel
                      altında çekilmez! Kateter çekildikten sonra idame 75 mg hemen (veya ≥6 sa sonra),{' '}
                      <strong>300–600 mg yükleme dozu</strong> ise en az <strong>≥6 saat</strong> sonra başlanabilir.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: CYP2C19 & PPI DENETLEYİCİ */}
          {activeTab === 'cyp_ppi_audit' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">1. Eşlik Eden PPI Seçimi (DAPT Gastroproteksiyonu)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'pantoprazole' as PpiChoice, label: 'Pantoprazol ✅' },
                      { id: 'rabeprazole' as PpiChoice, label: 'Rabeprazol ✅' },
                      { id: 'lansoprazole' as PpiChoice, label: 'Lansoprazol ⚠️' },
                      { id: 'omeprazole' as PpiChoice, label: 'Omeprazol ❌' },
                      { id: 'esomeprazole' as PpiChoice, label: 'Esomeprazol ❌' },
                      { id: 'none' as PpiChoice, label: 'PPI Yok' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPpiChoice(p.id)}
                        className={`p-2 rounded-xl border text-xs font-bold ${
                          ppiChoice === p.id
                            ? p.id === 'omeprazole' || p.id === 'esomeprazole'
                              ? 'bg-rose-600 text-white border-rose-600'
                              : 'bg-teal-600 text-white border-teal-600'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                  <div className="text-xs font-bold">2. Diğer CYP2C19 / CYP2C8 Etkileşimleri:</div>
                  {CYP_INTERACTIONS.map((item) => {
                    const checked = selectedInteractions.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs ${
                          checked
                            ? item.severity === 'contraindicated'
                              ? 'bg-rose-500/15 border-rose-500'
                              : 'bg-amber-500/15 border-amber-500'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800'
                              : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleInteraction(item.id)}
                          className="mt-0.5 accent-rose-600"
                        />
                        <div>
                          <div className="font-bold">{item.label}</div>
                          <div className="text-[11px] opacity-80">{item.sublabel}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                {ppiBad ? (
                  <div className="p-4 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 text-xs space-y-1">
                    <div className="font-black text-sm flex items-center gap-1.5">
                      <ShieldAlert className="w-5 h-5 shrink-0" />
                      UYGUNSUZ PPI: OMEPRAZOL / ESOMEPRAZOLÜ HEMEN DEĞİŞTİR!
                    </div>
                    <p>
                      FDA &amp; EMA Uyarısı: Omeprazol ve Esomeprazol güçlü CYP2C19 inhibitörüdür; Klopidogrelin aktif
                      metabolitini ~%45 düşürerek stent trombozu riskini artırır! (Saatleri ayırmak işe yaramaz!) →
                      <strong> Pantoprazol 40 mg/gün</strong> ile değiştirin!
                    </p>
                  </div>
                ) : ppiCaution ? (
                  <div className="p-3.5 rounded-xl border bg-amber-500/15 border-amber-500/40 text-xs">
                    <strong>Lansoprazol (Orta Dikkat):</strong> Omeprazolden daha az etkileşse de DAPT’ta en güvenli
                    1. tercih daima <strong>Pantoprazol 40 mg/gün</strong> (veya Rabeprazol)’dür.
                  </div>
                ) : ppiChoice === 'none' ? (
                  <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs">
                    <strong>PPI Önerisi (ESC 2023 Sınıf I):</strong> DAPT (Klopidogrel + Aspirin) veya OAC ile kombine
                    kullanan tüm hastalarda üst GİS kanamasını önlemek için <strong>Pantoprazol 40 mg/gün</strong> ekleyin!
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl border bg-emerald-500/15 border-emerald-500/40 text-xs text-emerald-900 dark:text-emerald-100">
                    <strong>İdeal PPI Seçimi ({ppiChoice === 'pantoprazole' ? 'Pantoprazol' : 'Rabeprazol'}):</strong>{' '}
                    CYP2C19 inhibisyonu minimaldir — Klopidogrelin antiplatelet etkinliğini bozmadan üst GİS kanamasını %70–80 azaltır!
                  </div>
                )}

                {hasContraInt && (
                  <div className="p-3.5 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-xs text-rose-900 dark:text-rose-100 space-y-1">
                    <div className="font-black">MAJÖR KONTRENDİKE ETKİLEŞİM / CYP2C19 YETERSİZLİĞİ!</div>
                    <p>
                      CYP2C19 yavaş metabolizörde <strong>Prasugrel</strong> veya <strong>Tikagrelora</strong> geçin;
                      <strong> Repaglinid</strong> alıyorsa antidiyabetiği mutlaka değiştirin (ölümcül hipoglisemi)!
                    </p>
                  </div>
                )}

                {hasHighInt && !hasContraInt && (
                  <div className="p-3.5 rounded-xl border bg-amber-500/15 border-amber-500/40 text-xs">
                    <strong>Güçlü CYP2C19 İnhibitörü Uyarısı:</strong> Flukonazol/Vorikonazol/Fluvoksamin gibi ajanlar
                    Klopidogreli etkisizleştirir — antimikrobiyali değiştirin veya CYP2C19 bağımsız P2Y₁₂ (Tikagrelor/Prasugrel) değerlendirin!
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
                    <th className="p-2.5 font-black text-rose-600 dark:text-rose-400">Klopidogrel (Plavix®)</th>
                    <th className="p-2.5 font-black">Tikagrelor (Brilinta®)</th>
                    <th className="p-2.5 rounded-tr-xl font-black">Prasugrel (Effient®)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold">Yapı &amp; Aktivasyon</td>
                    <td className="p-2.5 font-semibold text-rose-600 dark:text-rose-400">Ön-ilaç (2 basamak CYP2C19!)</td>
                    <td className="p-2.5">Doğrudan aktif (CYP2C19 bağımsız)</td>
                    <td className="p-2.5">Ön-ilaç (1 basamak · CYP2C19 az etkiler)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Bağlanma</td>
                    <td className="p-2.5">Geri dönüşsüz (7–10 gün)</td>
                    <td className="p-2.5">Geri dönüşlü (~3–5 gün)</td>
                    <td className="p-2.5">Geri dönüşsüz (7–10 gün)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Yükleme / İdame</td>
                    <td className="p-2.5">300–600 mg → 75 mg q24sa</td>
                    <td className="p-2.5">180 mg → 90 mg q12sa (ASA ≤100 mg!)</td>
                    <td className="p-2.5">60 mg → 10 mg (≥75y/&lt;60kg: 5 mg) q24sa</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Cerrahi / ASRA Kesme</td>
                    <td className="p-2.5 font-bold">Cerrahi: 5g · ASRA: 5–7g</td>
                    <td className="p-2.5">Cerrahi: 3–5g · ASRA: 5–7g</td>
                    <td className="p-2.5">Cerrahi: 7g · ASRA: 7–10g</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Acil Plt Transfüzyonu</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">ETKİLİ (son dozdan &gt;4–6 sa sonra!)</td>
                    <td className="p-2.5 text-rose-600 dark:text-rose-400 font-semibold">ZAYIF/ETKİSİZ (dolaşan ilaç Plt’yi bağlar!)</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400">Etkili (son dozdan &gt;4–6 sa sonra)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Özel Klinik Rol / Yasak</td>
                    <td className="p-2.5">AF+DOAC · Fibrinoliz · Minör İnme · HBR 1. tercih</td>
                    <td className="p-2.5">Dispne &amp; ventriküler duraklama/bradikardi</td>
                    <td className="p-2.5 text-rose-600 dark:text-rose-400">Geçirilmiş İNME/TIA’da MUTLAK YASAK!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
      </MonographAccordionSection>

      {/* 8. TÜRKİYE PİYASA FORMLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="clp-tr"
        preparations={[
          {
            name: 'Plavix® / Pingel® / Karum® / Planor® / Atervix® / Baclan® / Klogel®',
            presentation: '75 mg film kaplı tablet (28 veya 90 tabletlik kutular)',
            concentration: '75 mg / tablet (TR’deki standart güç)',
            saltOrBaseNote:
              '600 mg yükleme = 8 adet 75 mg tablet; 300 mg yükleme = 4 adet 75 mg tablet; idame = günde 1 tablet (75 mg). Türkiye’de 300 mg tek tablet formu nadir olduğundan 75 mg tabletlerle yüklenir.',
            alertLevel: 'standard',
          },
          {
            name: 'Kombinasyon Tabletler (Klopidogrel 75 mg + ASA 75–100 mg)',
            presentation: 'Sabit doz kombinasyon (örn. DuoPlavin® / Co-Plavix® vb.)',
            concentration: '75 mg Klopidogrel + 75/100 mg ASA',
            saltOrBaseNote:
              'PREOPERATİF TUZAK: Cerrahi öncesi yalnızca Klopidogrel kesilip Aspirin sürdürülecekse sabit kombinasyon kesilip tekli Coraspin®/Ecopirin® 100 mg başlanmalıdır — hastanın yanlışlıkla ikisini birden bırakmasını veya sürdürmesini önleyin!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Entübe / Disfajik Hasta (NG / OG Sonda): 75 mg (veya yükleme 300–600 mg) tabletler ince ezilip 20–30 mL suyla süspanse edilerek NG/OG sondadan verilir ve suyla yıkanır — ezilmiş yükleme emilimi daha hızlıdır (~1–2 sa)!',
          'Parenteral (IV) Form Yoktur: Klopidogrel yalnızca oral/enteral uygulanır (IV P2Y₁₂ köprülemesi gerekiyorsa Kangrelor kullanılır — Türkiye’de sınırlı merkezde bulunur).',
        ]}
        concentrationTrapWarning={'OMEPRAZOL / ESOMEPRAZOL & SABİT KOMBİNASYON TUZAĞI: (1) Klopidogrel alan hastanın orderında Omeprazol veya Esomeprazol görürseniz HEMEN Pantoprazol 40 mg/gün ile değiştirin! (2) Cerrahi öncesi sabit Klopidogrel+ASA kombinasyonu kesilirken tekli Aspirin 100 mg eklemeyi UNUTMAYIN!'}
      />

      {/* 9. UYGULAMA YOLU & ENTERAL UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="clp-compat"
        accessRequirement="peripheral-ok"
        accessSummary="Oral veya enteral (NG/OG sonda) yoldan uygulanır; gıdalarla veya aç karnına alınabilir. Parenteral IV formu yoktur."
        phRange="Oral Film Tablet (Hidrojen Sülfat / Bisülfat Tuzu)"
        osmolalityNote="NG/OG sondadan verilirken tabletler ince öğütülüp 20–30 mL suyla karıştırılmalı ve uygulama sonrası sonda iyice yıkanmalıdır."
        compatibleDiluents={[
          'Oral / NG Sonda: 20–30 mL içme suyu (ezilerek hemen uygulanır)',
        ]}
        stabilityNote="Oda sıcaklığında (<25–30 °C) nemden koruyarak orijinal blisterinde saklayın; ezilen tablet hemen uygulanmalıdır."
        ySiteCompatible={[
          'Pantoprazol / Rabeprazol (CYP2C19 dostu PPI’lar)',
          'Aspirin 75–100 mg/gün (DAPT)',
        ]}
        ySiteIncompatible={[
          'Omeprazol & Esomeprazol (CYP2C19 inhibisyonu → saatleri ayırmak etkileşimi ÖNLEMEZ!)',
          'Repaglinid (CYP2C8 inhibisyonu → şiddetli hipoglisemi!)',
        ]}
        extravasationProtocol="Oral ajandır. Majör kanama durumunda son dozdan ≥4–6 saat geçmişse 2 ünite aferez trombosit transfüzyonu (+ TXA / endoskopik hemostaz) ile etki klinik olarak geri çevrilir."
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="clp-organ"
        renalSummary="Tüm KBY evrelerinde ve diyalizde (IHD/PD/CRRT) RUTİN DOZ AYARLAMASI GEREKMEZ (75 mg/gün); hemodiyalizle temizlenmez! Ancak ileri KBY’de üremik kanama riski artarken klopidogrel yanıtı bir miktar azalabilir."
        renalDetails={[
          'eGFR ≥30 mL/dk: Standart 75 mg/gün (+ DAPT’ta Pantoprazol 40 mg/gün).',
          'eGFR <30 / IHD / CRRT: 75 mg/gün devam (ek doz gerekmez); AV fistül/GİS kanaması yakından izlenir.',
        ]}
        hepaticSummary="Child-Pugh A–B’de 75 mg/gün uygulanabilir (varis kanaması dikkat!); Child-Pugh C ağır karaciğer yetmezliğinde EMA/TR SmPC’ye göre KONTRENDİKEDİR!"
        hepaticDetails={[
          'Child-Pugh A–B: CYP2C19 biyoaktivasyonu görece korunur, ancak portal hipertansiyon/varis kanaması açısından Pantoprazol ve endoskopik izlem önerilir.',
          'Child-Pugh C: Ağır koagülopati, varis kanaması ve yetersiz biyoaktivasyon nedeniyle KONTRENDİKEDİR!',
        ]}
        {...STANDALONE_ORGAN_PART2['clopidogrel']}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="clp-special"
        geriatricReductionBadge=">75 Yaş STEMI Fibrinoliz: YÜKLEME YOK (75 mg/gün) · HBR’de 1. Tercih!"
        geriatricPoints={[
          'POPular AGE Çalışması (Lancet 2020): ≥70 yaş NSTE-ACS hastalarında Klopidogrel, Tikagrelor/Prasugrele göre iskemik olayları artırmadan majör kanamayı anlamlı azaltmıştır — yaşlı / yüksek kanama riskli hastada Klopidogrel öne çıkar!',
          'STEMI Fibrinoliz >75 Yaş Kuralı: Trombolitik alan >75 yaş hastaya 300 mg yükleme YAPILMAZ, doğrudan 75 mg/gün başlanır (intrakraniyal kanama koruması!).',
          'Zorunlu PPI: >65–75 yaş DAPT alan her hastaya mutlaka Pantoprazol 40 mg/gün ekleyin!',
        ]}
        obesityWeightScalarBadge="Sabit 75 mg/gün · Morbid Obezitede Yanıt Azalması (HTPR) Dikkat"
        obesityPoints={[
          'Standart İdame Sabittir (75 mg/gün): Obezitede rutin olarak 150 mg/gün’e çıkılmaz (CURRENT-OASIS 7); ancak BMI ≥35–40 kg/m² hastalarda klopidogrel aktif metabolit düzeyi daha düşük olabileceğinden yüksek trombotik riskli PCI’da Prasugrel/Tikagrelor düşünülebilir.',
          'Düşük Vücut Ağırlığı (<60 kg): Prasugrelden farklı olarak Klopidogrel <60 kg erişkinlerde doz azaltımı gerektirmez (75 mg/gün), ancak kanama izlemi önemlidir.',
        ]}
        clinicalNote="Erişkin idame dozu sabit 75 mg/gün’dür; ağırlık bağlamı için:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Klopidogrel"
        recommendedScalar="IBW"
        secondaryScalar={{ type: 'TBW', context: 'Erişkin Sabit 75 mg/gün (BMI ≥35 HTPR İzlemi)' }}
        rationale="Klopidogrel tüm erişkinlerde sabit 75 mg/gün (yükleme 300–600 mg) kullanılır. Morbid obezitede aktif metabolit düzeyi hafif azalabilir; yüksek riskli AKS/stentte CYP2C19 bağımsız alternatif değerlendirilir."
        currentWeightKg={adultWeightKg}
        onApplyWeight={(w) => setAdultWeightKg(Math.max(40, Math.min(180, Math.round(w))))}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="clp-preg"
        pregnancySummary="İnsan gebelik verileri kısıtlıdır; hayvan çalışmalarında teratojenite görülmemiştir ancak kesin kardiyak/stent endikasyonu olmadıkça kaçınılmalıdır. Doğum ve epidural anestezi güvenliği için planlı doğumdan 5–7 GÜN ÖNCE kesilmelidir!"
        pregnancyDetails={[
          'Gebelikte Taze Stent: Hayatı tehdit eden zorunlu kardiyak endikasyonda (kardiyoloji + perinatoloji ortak kararıyla) kullanılabilir; ancak 36–37. haftada doğum/nöraksiyel blok planlaması için kesme veya IV köprüleme stratejisi önceden yapılmalıdır.',
        ]}
        lactationSummary="İnsan sütüne geçişi net bilinmemekle birlikte hayvan sütüne geçer ve yenidoğanda trombosit inhibisyonu/kanama riski taşır — emzirme döneminde KAÇINILMASI önerilir!"
        lactationDetails={[
          'Anne için Klopidogrel zorunluysa emzirmeye ara verilmesi veya multidisipliner yarar-zarar değerlendirmesi önerilir.',
        ]}
      />

      {/* 13. YAN ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="clp-adr"
        items={[
          {
            title: 'Majör & Minör Kanama (GİS, İntrakraniyal, Cerrahi, Epistaksis, Ekimoz)',
            incidenceOrSeverity: 'En Sık Majör Toksisite · DAPT/OAC ile Artar',
            detail:
              'Aspirin monoterapisine göre GİS kanaması biraz daha az olsa da DAPT veya OAC ile birleştiğinde majör kanama riski 2–4× artar → Pantoprazol 40 mg/gün şarttır!',
            tone: 'rose',
          },
          {
            title: 'Trombotik Trombositopenik Purpura (TTP) — İlk 2 Hafta!',
            incidenceOrSeverity: 'Çok Nadir · Ölümcül Acil!',
            detail:
              'Genellikle tedavi başlangıcından sonraki ilk 2 hafta içinde gelişir: mikroanjiyopatik hemolitik anemi (şistosit, LDH ↑, haptoglobin ↓), ağır trombositopeni, nörolojik bulgular, böbrek yetmezliği ve ateş! Klopidogreli DERHAL kes, TROMBOSİT TRANSFÜZYONU YAPMA, acil PLAZMAFEREZ (PEX) başlat!',
            tone: 'rose',
          },
          {
            title: 'Yüksek Tedavi Altı Trombosit Reaktivitesi (HTPR) & Stent Trombozu',
            incidenceOrSeverity: 'CYP2C19 Yavaş Metabolizör / Omeprazol · Kritik',
            detail:
              'Toplumda %2–5 (Asya’da %15–20) CYP2C19 zayıf aktivasyonu veya Omeprazol etkileşimi nedeniyle beklenen antiplatelet etki oluşmayıp ölümcül stent trombozu gelişebilir.',
            tone: 'rose',
          },
          {
            title: 'Ağır Hematolojik Reaksiyonlar (Agranülositoz · Aplastik Anemi · Edinilmiş Hemofili A)',
            incidenceOrSeverity: 'Çok Nadir · İdiyosenkratik',
            detail:
              'Çok nadiren ağır nötropeni, pansitopeni veya faktör VIII’e karşı otoantikor (edinilmiş hemofili A — izole uzamış aPTT + kanama!) bildirilmiştir.',
            tone: 'amber',
          },
          {
            title: 'Döküntü, Kaşıntı & Hipersensitivite (Nadiren SJS/TEN/DRESS · İnsülin Otoimmün Sendrom)',
            incidenceOrSeverity: 'Sık Hafif Döküntü · Nadiren Ağır',
            detail:
              'Hafif makülopapüler döküntü hastaların ~%4–6’sında görülür (ağır değilse kısa steroid/desensitizasyonla yönetilebilir; mukozal tutulum/SCAR varsa derhal kes!).',
            tone: 'amber',
          },
          {
            title: 'GİS Rahatsızlığı & Diyare',
            incidenceOrSeverity: 'Hafif–Orta · Sık',
            detail:
              'Dispepsi, karın ağrısı veya diyare (nadiren kolit); yemekle almak tolere edilebilirliği artırır.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="clp-cautions"
        items={[
          {
            title: 'Neden Acil Kanamada Klopidogrel Trombosit Transfüzyonuna Yanıt Verir, Tikagrelor Vermez?',
            detail:
              'Klopidogrelin aktif tiyol metabolitinin plazma yarı ömrü yalnızca ~30 dakikadır — son tabletten 4–6 saat sonra kanda serbest aktif ilaç kalmaz! Bu nedenle verilen 2 ünite taze aferez trombosit engellenmeden pıhtılaşmayı düzeltir. Oysa Tikagrelor aktif, geri dönüşlü ve uzun ömürlü (t½ 7–9 sa) olduğu için kanda dolaşmaya devam eder ve yeni verilen trombositleri de anında bloke eder!',
          },
          {
            title: 'AKS’de IV Morfin / Fentanil + Oral Klopidogrel Emilim Gecikmesi',
            detail:
              'Akut miyokard enfarktüsünde ağrı için verilen IV Morfin veya Fentanil mide boşalmasını durdurarak 600 mg oral Klopidogrelin emilimini ve antiplatelet başlangıcını 1–3 saat geciktirebilir. Zorunluysa tabletlerin ezilerek verilmesi veya yüksek riskli primer PCI’da IV Kangrelor/GPIIb-IIIa değerlendirilmesi akılda tutulmalıdır.',
          },
          {
            title: 'Trombosit Fonksiyon Testleri (VerifyNow PRU · Multiplate) ile Erken Cerrahi',
            detail:
              'Klopidogrelin 5 gün beklenmesi gereken acil/yarı-acil cerrahilerde (örn. 3. gün) hasta yanıtı çok değişken olduğundan VerifyNow P2Y₁₂ (PRU >208) veya Multiplate ADP testi ile rezidüel trombosit aktivitesi kanıtlanarak güvenli cerrahi penceresi öne çekilebilir.',
          },
          {
            title: 'Repaglinid + Klopidogrel = Ölümcül Hipoglisemi (CYP2C8 İnci Bilgisi!)',
            detail:
              'Klopidogrelin inaktif sanılan açil-β-D-glukuronid metaboliti güçlü bir CYP2C8 inhibitörüdür; Tip 2 DM hastasında Repaglinid düzeyini 4–5 kat artırarak ağır hipoglisemik koma yapar — kesinlikle kombine edilmez!',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="clp-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'CYP2C19 İki Basamaklı Aktivasyon & P2Y₁₂ Gi-Kenetli Reseptörde Kovalent Disülfid Blokajı',
          summary:
            'Klopidogrel, hepatik biyotransformasyon sonucu açığa çıkan reaktif tiyol grubuyla trombosit P2Y₁₂ reseptörünün ekstraselüler sistein kalıntılarıyla kalıcı disülfid bağı kurarak ADP kaynaklı trombosit amplifikasyonunu geri dönüşsüz sonlandırır:',
          points: [
            'Rekabetçi Hepatik Yol (CES1 vs CYP2C19): Emilen dozun %85’i CES1 ile inaktif karboksilik aside yönelir; yalnızca %15’lik fraksiyon CYP2C19 (1. basamakta ~%45, 2. basamakta ~%21 katkı!) üzerinden aktif tiyol metabolite ulaşır.',
            'Genetik Değişkenlik (CYP2C19*2 / *3): İşlev kaybı aleli taşıyanlarda aktif metabolit düzeyi %30–60 düşer ve yüksek tedavi altı trombosit reaktivitesi (HTPR) gelişir — buna karşın *17 ultra-hızlı metabolizörlerde kanama riski artar!',
            'Kovalent Ömür Boyu İnaktivasyon: Trombositler nükleussuz olduğundan yeni P2Y₁₂ reseptörü sentezleyemez; ilaç kesilse bile normal hemostaz yalnızca kemik iliğinin günde ~%10–15 yeni trombosit üretmesiyle (5–7 günde) sağlanır.',
          ],
        }}
        intracellularSignaling={{
          title: 'P2Y₁₂ – Gi – cAMP/VASP Kaskadı & GPIIb/IIIa Konformasyonel Kilitlenmesi',
          summary:
            'ADP’nin P2Y₁₂ reseptörüne bağlanmasının engellenmesi trombosit içi stabilizasyon sinyalini kökten kırar:',
          points: [
            'cAMP Yüksekliği & VASP Fosforilasyonu: Normalde ADP, Gi proteini üzerinden adenilat siklazı baskılayıp cAMP’yi düşürerek trombositi aktive eder. Klopidogrel bunu bloke edince cAMP yüksek kalır, PKA aktifleşir ve VASP fosforile olarak trombosit aktivasyonunu frenler.',
            'PI3K / GPIIb-IIIa Kapanışı: Fibrinojenin çapraz köprü kurduğu integrin GPIIb/IIIa’nın yüksek afiniteli konformasyona geçmesi engellenir; böylece trombüs büyümesi ve koroner stent içi pıhtılaşma durdurulur.',
            'Aktif Metabolit Temizliği (~30 dk): Kısa plazma ömrü sayesinde acil masif kanamada son dozdan 4–6 saat sonra verilen taze trombositler serbest kalıp pıhtı oluşturabilir!',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Koroner & Serebral Arterler (DAPT Koruması)',
            tissueTarget: 'Trombosit P2Y₁₂ Reseptörü · Koroner Stent Endoteli',
            accent: 'rose',
            points: [
              'Aspirin (TXA₂) ile birleştiğinde trombosit aktivasyonunun iki temel amplifikasyon yolunu kapatarak stent trombozunu ve erken inme nüksünü dramatik düşürür.',
              'AF + PCI hastalarında DOAC ile kombine edildiğinde Prasugrel/Tikagrelora kıyasla çok daha güvenli kanama profili sunar.',
            ],
          },
          {
            systemTitle: 'Karaciğer (CYP2C19 Aktivasyonu & CYP2C8 İnhibisyonu)',
            tissueTarget: 'Hepatik CES1 · CYP2C19 · CYP2C8',
            accent: 'amber',
            points: [
              'Omeprazol/Esomeprazol ve Flukonazol/Vorikonazol CYP2C19’u kapatarak ilacı etkisizleştirir.',
              'Açil-glukuronid metaboliti CYP2C8’i güçlü inhibe ederek Repaglinid ve Paklitaksel toksisitesi yaratır.',
            ],
          },
          {
            systemTitle: 'Nöraksiyel Kanal & Cerrahi Hemostaz',
            tissueTarget: 'Epidural Venöz Pleksus · Cerrahi Yatak',
            accent: 'indigo',
            points: [
              'Spinal/epidural blok öncesi 5–7 gün, elektif cerrahi/KABG öncesi 5 gün kesilmeden işlem yapılması ağır hematom riski doğurur.',
              'Acil ameliyatta son dozdan ≥4–6 saat sonra 2 ünite aferez trombosit hemostazı hızla iyileştirir.',
            ],
          },
          {
            systemTitle: 'Mikrovasküler Endotel & GİS Mukoza',
            tissueTarget: 'Gastrik Mukoza · Mikrovaskülatür (TTP)',
            accent: 'teal',
            points: [
              'Doğrudan COX-1 mukozal PG inhibisyonu yapmasa da var olan mikro-erozyonların pıhtılaşmasını engelleyerek GİS kanamasını tetikler (Pantoprazol koruyucudur!).',
              'Çok nadiren ilk 2 haftada ADAMTS13 ilişkili TTP gelişebilir (acil plazmaferez gerektirir).',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'DAPT Süresi, De-eskalasyon Stratejisi & Optimal PPI Seçimi',
          summary:
            'Modern kardiyoloji ve perioperatif tıpta Klopidogrelin en güçlü olduğu kanıta dayalı nişler:',
          points: [
            'Yüksek Kanama Riski (HBR) & Yaşlı AKS (POPular AGE 2020): ≥70 yaş NSTE-ACS’de Klopidogrel kanamayı belirgin azaltırken iskemik güvenliği korur.',
            'Kısa DAPT (Minör İnme / TIA): CHANCE ve POINT kanıtlarına göre yalnızca 21 gün DAPT → ardından monoterapi net klinik faydayı maksimize eder.',
            'Pantoprazol Kuralı: DAPT veya OAC + Klopidogrel kullanan tüm hastalarda CYP2C19 etkileşimsiz Pantoprazol 40 mg/gün standarttır.',
          ],
        }}
        clinicalPearls={[
          'Omeprazol / Esomeprazol = YASAK · Pantoprazol = 1. TERCİH: Saatleri ayırmak CYP2C19 inhibisyonunu engellemez — PPI’yı mutlaka Pantoprazol 40 mg/gün ile değiştir!',
          'ASRA 2018 (5–7 Gün) vs ESC Cerrahi (5 Gün): Aspirinin aksine Klopidogrel altında spinal/epidural blok ASLA yapılmaz — 5–7 gün kes!',
          'STEMI Fibrinoliz >75 Yaş = Yükleme Yok: 75 yaş üstü trombolitik hastasına 300 mg yükleme verme, doğrudan 75 mg/gün başla!',
          'Acil Kanamada >4–6 Saat Sonra Trombosit İşe Yarar: Tikagrelordan farklı olarak Klopidogrelin aktif metaboliti ~30 dk’da kaybolduğu için 2 ünite aferez trombosit kanamayı hızla kontrol eder!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="clp-refs"
        drugName="Klopidogrel"
        drugsComUrl="https://www.drugs.com/drug-interactions/clopidogrel.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Repaglinid (CYP2C8 Substratı)',
            mechanism: 'Klopidogrel Açil-β-D-Glukuronidinin Güçlü CYP2C8 İnhibisyonu',
            clinicalEffect:
              'Repaglinid plazma AUC’sinde 4–5 kat artış → şiddetli, uzamış ve hayatı tehdit eden HİPOGLİSEMİ!',
            management:
              'KESİNLİKLE birlikte kullanmayın — Repaglinidi başka bir antidiyabetikle değiştirin.',
          },
          {
            severity: 'D',
            agent: 'Omeprazol & Esomeprazol (Güçlü CYP2C19 İnhibitörleri)',
            mechanism: 'Klopidogrelin 2 Basamaklı CYP2C19 Biyoaktivasyonunun Blokajı (FDA / EMA Uyarısı!)',
            clinicalEffect:
              'Aktif tiyol metabolitinde ~%45 azalma → koroner stent trombozu ve tekrarlayan MI/inme riskinde artış.',
            management:
              'Birlikte KULLANMAYIN (doz saatlerini ayırmak işe yaramaz!) — derhal Pantoprazol 40 mg/gün veya Rabeprazole geçin.',
          },
          {
            severity: 'D',
            agent: 'Diğer Güçlü CYP2C19 İnhibitörleri (Flukonazol · Vorikonazol · Fluvoksamin · Fluoksetin)',
            mechanism: 'CYP2C19 İnhibisyonu → Aktif Metabolit Oluşumunun Azalması',
            clinicalEffect:
              'Antiplatelet etkinliğin belirgin kaybı ve trombotik olay riski.',
            management:
              'Alternatif antifungal/SSRI (örn. Sertralin/Sitalopram veya Ekinokandin) veya CYP2C19 bağımsız P2Y₁₂ (Tikagrelor/Prasugrel) değerlendirin.',
          },
          {
            severity: 'D',
            agent: 'Antikoagülanlar (Varfarin · DOAC · Heparin/LMWH), NSAİİ’ler & SSRI’lar',
            mechanism: 'Sinerjik Hemostaz İnhibisyonu & GİS Mukozal Hasar',
            clinicalEffect:
              'Majör üst/alt GİS ve intrakraniyal kanama riskinde 2–4 kat artış.',
            management:
              'AF+PCI’da Klopidogrel DOAC ile en güvenli P2Y₁₂’dir; mutlaka Pantoprazol 40 mg/gün ekleyin ve gereksiz NSAİİ’den kaçının.',
          },
          {
            severity: 'C',
            agent: 'IV Morfin / Fentanil (AKS’de Oral Yükleme Sırasında)',
            mechanism: 'Opioid Aracılı Gastrik Boşalma Gecikmesi',
            clinicalEffect:
              '600 mg yükleme dozunun emilimi ve trombosit inhibisyon başlangıcı 1–3 saat gecikir.',
            management:
              'Gerekirse tabletleri ezerek verin; primer PCI’da yüksek trombüs yükünde IV Kangrelor/GPIIb-IIIa alternatifi düşünün.',
          },
          {
            severity: 'C',
            agent: 'Paklitaksel · Cerivastatin / Dasabuvir (CYP2C8 Substratları) & Rifampisin (CYP2C19 İndükleyici)',
            mechanism: 'CYP2C8 İnhibisyonu (Paklitaksel nöropati/miyelosüpresyon ↑) · CYP2C19 İndüksiyonu (Rifampisin kanama ↑)',
            clinicalEffect:
              'Paklitaksel toksisitesinde artış; Rifampisinle aşırı aktif metabolit oluşumu ve kanama riski.',
            management:
              'Yakın toksisite/kanama izlemi veya alternatif ajan seçimi.',
          },
        ]}
        references={[
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Task Force)',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes',
            journal: 'European Heart Journal',
            year: 2023,
            note: 'AKS yükleme/idame, STEMI fibrinolizinde >75 yaş yüklemesiz 75 mg, AF+PCI, P2Y₁₂ geçiş (switching) ve Pantoprazol önerileri.',
          },
          {
            authors: 'Halvorsen S, Mehilli J, Cassese S, et al. (ESC Task Force)',
            title: '2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery',
            journal: 'European Heart Journal',
            year: 2022,
            note: 'Elektif cerrahi öncesi Klopidogrelin 5 gün kesilmesi, taze stent bekleme süreleri ve Aspirin omurgasının sürdürülmesi.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'Spinal/epidural ponksiyon ve derin blok öncesi Klopidogrelin 5–7 gün kesilmesi ve kateter çekim kuralları.',
          },
          {
            authors: 'Gimbel M, Qaderdan K, Willemsen L, et al. (POPular AGE Trial)',
            title: 'Clopidogrel versus ticagrelor or prasugrel in patients aged 70 years or older with non-ST-elevation acute coronary syndrome',
            journal: 'The Lancet',
            year: 2020,
            note: '≥70 yaş NSTE-ACS hastalarında Klopidogrelin kanamayı azaltıp iskemik etkinlikte non-inferior olduğunu gösteren RKÇ.',
          },
          {
            authors: 'Johnston SC, Easton JD, Farrant M, et al. (POINT Trial) & Wang Y, et al. (CHANCE Trial)',
            title: 'Clopidogrel and Aspirin in Acute Ischemic Stroke and High-Risk TIA',
            journal: 'New England Journal of Medicine',
            year: 2018,
            note: 'Minör iskemik inme (NIHSS ≤3) ve yüksek riskli TIA’da 21 günlük kısa süreli DAPT protokolünün kanıtı.',
          },
          {
            authors: 'Lopes RD, Heizer G, Aronson R, et al. (AUGUSTUS Trial)',
            title: 'Antithrombotic Therapy after Acute Coronary Syndrome or PCI in Atrial Fibrillation',
            journal: 'New England Journal of Medicine',
            year: 2019,
            note: 'AF + PCI hastalarında DOAC + Klopidogrel kombinasyonunun (Aspirinsiz dual terapi) kanamayı dramatik azalttığını gösteren landmark RKÇ.',
          },
          {
            authors: 'CAPRIE Steering Committee',
            title: 'A randomised, blinded, trial of clopidogrel versus aspirin in patients at risk of ischaemic events (CAPRIE)',
            journal: 'The Lancet',
            year: 1996,
            note: 'Özellikle periferik arter hastalığında (PAH) Klopidogrel 75 mg/gün monoterapisinin Aspirine üstünlüğünü gösteren landmark çalışma.',
          },
        ]}
      />

      {/* Alt Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          ESC 2022/2023 · ASRA 2018 · POPular AGE · CHANCE/POINT · AUGUSTUS ile Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Antitrombotik · P2Y₁₂ İnhibitörü
        </span>
      </div>
    </div>
  );
};
