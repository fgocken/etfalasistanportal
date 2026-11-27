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

type CalcTab = 'indications_calc' | 'periop_asra' | 'salicylate_tox' | 'safety_audit';
type AsaIndication =
  | 'acs_load'
  | 'secondary_prev'
  | 'acute_stroke'
  | 'preeclampsia'
  | 'pericarditis'
  | 'kawasaki';
type PeriopReason = 'primary_prev' | 'secondary_cad' | 'recent_stent' | 'cabg';
type SurgeryBleedRisk = 'low_mod' | 'high_general' | 'closed_space';

interface SafetyFactor {
  id: string;
  label: string;
  sublabel: string;
  severity: 'contraindicated' | 'high' | 'moderate';
}

const SAFETY_FACTORS: SafetyFactor[] = [
  {
    id: 'reye_ped',
    label: '<16–18 Yaş Çocuk / Ergen Viral Enfeksiyon (Grip / Suçiçeği) Ateşi',
    sublabel: 'REYE SENDROMU (Akut hepatik ensefalopati & yağlı karaciğer) — MUTLAK KONTRENDİKE!',
    severity: 'contraindicated',
  },
  {
    id: 'active_bleed',
    label: 'Aktif GİS Kanaması, Aktif Peptik Ülser, İntrakraniyal Kanama veya Ağır Trombositopeni',
    sublabel: '7–10 gün süren geri dönüşsüz trombosit blokajı → ölümcül kanama!',
    severity: 'contraindicated',
  },
  {
    id: 'aerd_samter',
    label: 'Aspirin / NSAİİ Alevlenmeli Solunum Yolu Hastalığı (AERD / Samter Triadı) veya Anafilaksi',
    sublabel: 'Astım + nazal polip + Aspirin intoleransı → ani şiddetli bronkospazm! (Desensitizasyon hariç YASAK)',
    severity: 'contraindicated',
  },
  {
    id: 'preg_high_3rd',
    label: 'Gebelik ≥20–30. Haftada YÜKSEK DOZ (>300–500 mg/gün) ASA',
    sublabel: 'Fetal duktus arteriozus erken kapanması, oligohidramnioz & kanama! (Not: 81–150 mg preeklampsi GÜVENLİDİR!)',
    severity: 'contraindicated',
  },
  {
    id: 'nsaid_cox1_clash',
    label: 'Eşzamanlı İbuprofen veya Metamizol Kullanımı (Düşük Doz ASA Alan KAH Hastası)',
    sublabel: 'COX-1 Ser529 yarışması → Aspirinin antiplatelet etkisini İPTAL EDER! (ASA’dan ≥30–60 dk SONRA ver)',
    severity: 'high',
  },
  {
    id: 'anticoag_dapt_ppi',
    label: 'Antikoagülan (Varfarin/DOAC/LMWH), P2Y12 (Klopidogrel/Tikagrelor/Prasugrel), SSRI veya Steroid',
    sublabel: 'Üst GİS kanama riski 3–6× artar → Pantoprazol 40 mg/gün gastroproteksiyonu ZORUNLU!',
    severity: 'high',
  },
  {
    id: 'high_dose_mtx',
    label: 'Yüksek / Orta Doz Metotreksat (MTX ≥15 mg/hafta)',
    sublabel: 'Salisilat MTX renal tübüler sekresyonunu bloke eder → ağır pansitopeni!',
    severity: 'high',
  },
  {
    id: 'tpa_window',
    label: 'Akut İskemik İnmede IV Tromboliz (Alteplaz / Tenekteplaz) Uygulandı (<24 Saat)',
    sublabel: 'İntrakraniyal kanama riski → Kontrol BT + 24 SAAT dolmadan Aspirin BAŞLAMA!',
    severity: 'contraindicated',
  },
  {
    id: 'ckd_cirrhosis',
    label: 'eGFR <30 mL/dk / ABH veya Child-Pugh B–C Siroz',
    sublabel: 'Yüksek doz ASA YASAK! Düşük doz (81–100 mg) yalnızca kesin KAH/stent endikasyonunda + PPI.',
    severity: 'moderate',
  },
];

export const AcetylsalicylicAcidProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('indications_calc');

  // Tab 1: Endikasyon & Doz (ve Kawasaki pediatrik ağırlık)
  const [indication, setIndication] = useState<AsaIndication>('acs_load');
  const [kawasakiWeightKg, setKawasakiWeightKg] = useState<number>(15);
  const [adultWeightKg, setAdultWeightKg] = useState<number>(75);

  // Tab 2: Perioperatif & ASRA 2018
  const [periopReason, setPeriopReason] = useState<PeriopReason>('secondary_cad');
  const [bleedRisk, setBleedRisk] = useState<SurgeryBleedRisk>('low_mod');
  const [neuraxialPlanned, setNeuraxialPlanned] = useState<boolean>(true);
  const [comboAntithrombotic, setComboAntithrombotic] = useState<boolean>(false);

  // Tab 3: Salisilat Toksisitesi & EXTRIP
  const [toxWeightKg, setToxWeightKg] = useState<number>(70);
  const [ingestedGrams, setIngestedGrams] = useState<number>(15);
  const [hasSalicylateLevel, setHasSalicylateLevel] = useState<boolean>(false);
  const [salicylateMgDl, setSalicylateMgDl] = useState<number>(65);
  const [arterialPh, setArterialPh] = useState<number>(7.38);
  const [toxCns, setToxCns] = useState<boolean>(false);
  const [toxPulm, setToxPulm] = useState<boolean>(false);
  const [toxRenal, setToxRenal] = useState<boolean>(false);

  // Tab 4: Güvenlik & Etkileşim
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useMonographAccordion('asa-moa', false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavItems = [
    { id: 'asa-high-alert', label: 'Yüksek Uyarı' },
    { id: 'asa-moa', label: 'Etki & Doz-Yanıt' },
    { id: 'asa-contra', label: 'Kontrendikasyonlar' },
    { id: 'asa-indications', label: 'Endikasyonlar' },
    { id: 'asa-calc', label: 'Hesaplayıcı & ASRA' },
    { id: 'asa-tr', label: 'TR Formlar' },
    { id: 'asa-compat', label: 'Uygulama Yolu' },
    { id: 'asa-organ', label: 'Organ Yetmezliği' },
    { id: 'asa-special', label: 'Geriatri & Obezite' },
    { id: 'asa-preg', label: 'Gebelik & Preeklampsi' },
    { id: 'asa-adr', label: 'Yan Etkiler & Reye' },
    { id: 'asa-cautions', label: 'Klinik Dikkat' },
    { id: 'asa-pd', label: 'Derin Farmakodinami' },
    { id: 'asa-refs', label: 'Etkileşim & Kaynak' },
  ];

  // --- TAB 1 ENDİKASYON METADATASI ---
  const kawasakiAcuteDailyMg = Math.round(kawasakiWeightKg * 40); // 30–50 mg/kg/gün (orta-yüksek Avrupa/AHA güncel)
  const kawasakiAcuteSingleMg = Math.round(kawasakiAcuteDailyMg / 4);
  const kawasakiMaintMg = Math.round(kawasakiWeightKg * 4); // 3–5 mg/kg/gün

  const indicationMeta: Record<
    AsaIndication,
    {
      label: string;
      doseHeadline: string;
      trFormNote: string;
      guidance: string;
    }
  > = {
    acs_load: {
      label: 'Akut Koroner Sendrom (STEMI / NSTEMI / UA · ESC 2023)',
      doseHeadline: '150–300 mg YÜKLEME (ÇİĞNENEREK!) → 75–100 mg/gün',
      trFormNote:
        'ENTERİK KAPLI TABLETİ BÜTÜN YUTMA! Aspirin® 500 mg (enterik kaplı olmayan) yarım tablet (250 mg) veya 3×100 mg Coraspin®/Ecopirin® iyice ÇİĞNENİP/ezilip yutulur → 15–30 dk içinde tam TXA₂ blokajı!',
      guidance:
        'ESC 2023 AKS Kılavuzu (Sınıf I, A): Kontrendikasyon yoksa ilk tıbbi temasta derhal 150–300 mg non-enterik çiğnenmiş ASA yüklenir; ardından ömür boyu 75–100 mg/gün (TR’de 100 mg/gün) + P2Y12 inhibitörü (DAPT). Türkiye’de IV ASA (Aspegic®) rutin bulunmadığından çiğneme/NG yolu esastır.',
    },
    secondary_prev: {
      label: 'Sekonder CV Koruma (KAH · Stent · CABG · İnme/TIA · PAH)',
      doseHeadline: '75–100 mg Günde 1 Kez (TR Standart: 100 mg/gün)',
      trFormNote:
        'Coraspin® 100 mg, Ecopirin® 81/100 mg veya Aspirin® Protect 100 mg (enterik kaplı, günde 1 kez).',
      guidance:
        '75–100 mg/gün, portal dolaşımda trombosit COX-1’i tam bloke ederken yüksek dozlara (>150–300 mg) kıyasla daha az GİS kanaması yapar (ADAPTABLE 2021: 81 mg = 325 mg etkinlik!). Primer korumada (bilinen ASCVD yoksa) artık rutin ÖNERİLMEZ (ASPREE / ARRIVE / ASCEND!).',
    },
    acute_stroke: {
      label: 'Akut İskemik İnme (AHA/ASA Kılavuzu)',
      doseHeadline: '160–300 mg (İlk 24–48 sa) → 75–100 mg/gün',
      trFormNote:
        'Disfaji varsa NG sondadan ezilmiş 160–300 mg veya rektal suppozituvar (yutma testi geçmeden ağızdan verme!).',
      guidance:
        'KRİTİK KURAL: Önce BT ile intrakraniyal kanama kesinlikle dışlanır! Hastaya IV tromboliz (Alteplaz/Tenekteplaz) verildiyse ilk 24 SAAT Aspirin BAŞLANMAZ (24. saat kontrol BT’de kanama yoksa başlanır!).',
    },
    preeclampsia: {
      label: 'Gebelik Preeklampsi Profilaksisi (ASPRE / ACOG / FIGO)',
      doseHeadline: '100–150 mg GECE Günde 1 Kez (12–16. hf → 36. hf)',
      trFormNote:
        'TR’de Ecopirin® 150 mg (ASPRE dozu!) veya Coraspin®/Ecopirin® 100 mg — yatmadan önce alınır.',
      guidance:
        'ASPRE (NEJM 2017) & ACOG/FIGO: Yüksek riskli gebelerde (önceki preeklampsi, kronik HT, DM, çoğul gebelik, SLE/APS, KBY) 12–16. gebelik haftasından 36. haftaya kadar düşük doz ASA preterm preeklampsiyi >%60 azaltır! Fetal duktusu kapatmaz (bu risk yüksek analjezik dozlardadır).',
    },
    pericarditis: {
      label: 'Akut Perikardit / Post-MI Dressler (ESC 2015)',
      doseHeadline: '750–1000 mg q8sa (2,25–3 g/gün) + Kolşisin + PPI',
      trFormNote:
        'Aspirin® 500 mg (1,5–2 tablet q8sa, tok karnına) + Pantoprazol 40 mg/gün ZORUNLU! CRP normale inince 1–2 haftada 250–500 mg azaltarak kes.',
      guidance:
        'Post-MI perikardit (Dressler) veya eşlik eden koroner arter hastalığı varsa İbuprofen yerine yüksek doz ASA 1. tercihtir (hem antiinflamatuar hem koroner antiplatelet koruma sağlar).',
    },
    kawasaki: {
      label: 'Kawasaki Hastalığı (Pediatrik İstisna · Çocuk Kardiyoloji)',
      doseHeadline: `Akut: ~${kawasakiAcuteSingleMg} mg q6sa (${kawasakiAcuteDailyMg} mg/gün) → İdame: ${kawasakiMaintMg} mg/gün`,
      trFormNote:
        'Akut ateşli faz: 30–50 mg/kg/gün (4’e bölünmüş) + IVIG 2 g/kg; 48–72 sa ateşsiz kalınca antiplatelet idameye (3–5 mg/kg/gün tek doz × 6–8 hf) geçilir.',
      guidance:
        'Pediatride Reye sendromu nedeniyle ASA yasak olmakla birlikte Kawasaki hastalığı nadir ve zorunlu pediatrik istisnadır. Uzun süre ASA alan çocuğa yıllık grip aşısı yapılmalı; influenza/suçiçeği temasında derhal çocuk kardiyoloğuna başvurulmalıdır!',
    },
  };

  // --- TAB 2 PERİOPERATİF & ASRA 2018 KARAR MOTORU ---
  const getPeriopDecision = () => {
    if (periopReason === 'cabg') {
      return {
        tone: 'emerald',
        headline: 'DEVAM ET (KABG Boyunca 81–100 mg/gün Sürdürülür!)',
        detail:
          'Diğer tüm NSAİİ’lerden farklı olarak düşük doz Aspirin, KABG (Koroner Bypass) cerrahisi boyunca DEVAM EDİLİR (ESC / STS Sınıf I) — perioperatif MI ve safen ven greft tıkanmasını azaltır!',
      };
    }
    if (periopReason === 'recent_stent') {
      if (bleedRisk === 'closed_space') {
        return {
          tone: 'rose',
          headline: 'ACİL KARDİYOLOJİ + CERRAH KONSEYİ (Stent Trombozu vs İntrakraniyal Kanama!)',
          detail:
            'Taze koroner stentte ASA’nın kesilmesi ölümcül stent trombozu yapar; ancak kapalı alan (intrakraniyal/intramedüller/arka göz) cerrahisinde kanama da katastrofiktir. Elektif cerrahi mutlaka ertelenmeli; acilse multidisipliner konsey kararı gerekir!',
        };
      }
      return {
        tone: 'emerald',
        headline: 'KESİNLİKLE DEVAM ET (ESC 2022 · Stent Koruması!)',
        detail:
          'PCI / koroner stent öyküsü olan hastada düşük doz ASA (75–100 mg/gün) perioperatif dönemde KESİLMEMELİDİR (P2Y12 inhibitörü cerrahiye göre kesilse dahi Aspirin omurgası sürdürülür!).',
      };
    }
    if (periopReason === 'primary_prev') {
      return {
        tone: 'amber',
        headline: 'CERRAHİDEN 7 GÜN ÖNCE KES (POISE-2 Trial · NEJM 2014)',
        detail:
          'Bilinen koroner/serebrovasküler/periferik arter hastalığı olmayan (primer koruma) hastalarda perioperatif ASA iskemik olayları azaltmazken majör cerrahi kanamayı anlamlı artırır (POISE-2) → preop 7 gün önce kesilir.',
      };
    }
    // secondary_cad
    if (bleedRisk === 'closed_space') {
      return {
        tone: 'amber',
        headline: '7 GÜN ÖNCE KESMEYİ DEĞERLENDİR (Cerrah + Kardiyoloji Mutabakatı)',
        detail:
          'ESC 2022: İntrakraniyal nöroşirürji, intramedüller omurga ve arka kamara retinal göz cerrahisinde kanama riski iskemik riski aşabilir → stabil sekonder KAH’da 5–7 gün önce kesilip hemostaz sağlanır sağlanmaz (24–48 sa) tekrar başlanır.',
      };
    }
    return {
      tone: 'emerald',
      headline: 'DEVAM ET (75–100 mg/gün Perioperatif Sürdürülür · ESC 2022)',
      detail:
        'Bilinen KAH, geçirilmiş MI, iskemik inme veya PAH (sekonder koruma) hastalarında düşük/orta ve çoğu yüksek riskli non-kardiyak cerrahide düşük doz ASA’ya devam edilmesi önerilir.',
    };
  };
  const periopDecision = getPeriopDecision();

  // --- TAB 3 SALİSİLAT TOKSİSİTESİ & EXTRIP ---
  const ingestedMgKg = Math.round((ingestedGrams * 1000) / Math.max(10, toxWeightKg));
  const bicarbBolusMeqLow = Math.round(toxWeightKg * 1);
  const bicarbBolusMeqHigh = Math.round(toxWeightKg * 2);
  const extripIndicated =
    toxCns ||
    toxPulm ||
    arterialPh <= 7.2 ||
    (hasSalicylateLevel && (salicylateMgDl > 100 || (toxRenal && salicylateMgDl > 90)));

  const toxTier =
    ingestedMgKg >= 500
      ? { label: 'POTANSİYEL LETAL (>500 mg/kg)', tone: 'rose' }
      : ingestedMgKg >= 300
        ? { label: 'AĞIR TOKSİSİTE (300–500 mg/kg)', tone: 'rose' }
        : ingestedMgKg >= 150
          ? { label: 'ORTA TOKSİSİTE (150–300 mg/kg)', tone: 'amber' }
          : { label: 'HAFİF / İZLEM (<150 mg/kg)', tone: 'emerald' };

  // --- TAB 4 GÜVENLİK DENETİMİ ---
  const hasContraindicated = selectedRisks.some(
    (id) => SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'contraindicated'
  );
  const hasHighRisk = selectedRisks.some(
    (id) => SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'high'
  );
  const hasCox1Clash = selectedRisks.includes('nsaid_cox1_clash');
  const needsPpi =
    selectedRisks.includes('anticoag_dapt_ppi') || selectedRisks.includes('ckd_cirrhosis');

  const toggleRisk = (id: string) => {
    setSelectedRisks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'indications_calc') {
      const m = indicationMeta[indication];
      return `ASETİLSALİSİLİK ASİT (ASPİRİN) ORDER — ${m.label}: ${m.doseHeadline}. ${m.trFormNote}`;
    }
    if (activeTab === 'periop_asra') {
      const neuraxialTxt = neuraxialPlanned
        ? comboAntithrombotic
          ? 'NÖRAAKSİYEL (ASRA 2018): Kombine antikoagülan/P2Y12 mevcut → diğer antitrombotiğin kesme süresine UYULMALIDIR!'
          : 'NÖRAAKSİYEL (ASRA 2018): İzole düşük doz ASA (75–100 mg) spinal/epidural blok için KONTRENDİKASYON DEĞİLDİR (kesme gerekmez!).'
        : '';
      return `PERİOPERATİF ASPİRİN KARARI (ESC 2022): ${periopDecision.headline} ${neuraxialTxt}`;
    }
    if (activeTab === 'salicylate_tox') {
      return `SALİSİLAT TOKSİSİTESİ (${toxWeightKg} kg · ${ingestedGrams} g = ${ingestedMgKg} mg/kg · ${toxTier.label}): IV NaHCO₃ %8,4 ${bicarbBolusMeqLow}–${bicarbBolusMeqHigh} mEq bolus → idrar pH 7,5–8,0 & K⁺ ≥4,0 mEq/L hedefi! ${extripIndicated ? 'EXTRIP ACİL HEMODİYALİZ ENDİKASYONU MEVCUT!' : 'Seri 2 saatte bir salisilat düzeyi & ABG takibi.'} UYARI: Gereksiz entübasyondan KAÇIN (PaCO₂ artışı ölümcül SSS asidozu yapar)!`;
    }
    return hasContraindicated
      ? `ASPİRİN GÜVENLİK DENETİMİ: MUTLAK KONTRENDİKASYON MEVCUT — Kullanma!`
      : `ASPİRİN GÜVENLİK DENETİMİ: ${hasCox1Clash ? "İbuprofen/Metamizolü ASA'dan ≥30–60 dk SONRA ver! " : ''}${needsPpi ? 'Pantoprazol 40 mg/gün gastroproteksiyonu ZORUNLU! ' : ''}Kanama bulgularını izle.`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="asa-high-alert"
        defaultOpen={false}
        tallManName="ASETILSALISILIK ASIT / ASPIRIN (GERİ DÖNÜŞSÜZ COX-1 · 7–10 GÜN!)"
        confusionRiskWith="Enterik Kaplı (Coraspin®/Ecopirin®) AKS’de Bütün Yutma Hatası · <18y Reye Sendromu · Salisilat Entübasyon Tuzağı"
        criticalAlerts={[
          'AKS YÜKLEMESİNDE (150–300 mg) ENTERİK KAPLI TABLETİ BÜTÜN YUTMA — ÇİĞNE!: Enterik kaplı Coraspin®/Ecopirin® bütün yutulursa pik antiplatelet etki 3–4+ saat gecikir! STEMI/NSTEMI’de non-enterik Aspirin® 500 mg (½ tb = 250 mg) veya 150–300 mg iyice ÇİĞNENEREK/ezilerek verilmeli (15–30 dk etki!). Akut inmede tPA sonrası 24 SAAT geçmeden ASA BAŞLANMAZ!',
          'REYE SENDROMU (<16–18 YAŞ VİRAL ATEŞTE MUTLAK YASAK!): Çocuk ve ergenlerde viral enfeksiyon (influenza, suçiçeği vb.) ateşinde Aspirin kullanımı ölümcül akut hepatik ensefalopati ve yağlı karaciğer (Reye Sendromu) tetikler — çocukta tek nadir istisna pediatrik kardiyoloji takibindeki Kawasaki hastalığıdır!',
          'SALİSİLAT ZEHİRLENMESİNDE ENTÜBASYON TUZAĞI (ÖLÜMCÜL SSS ASİDOZU!): Salisilat toksisitesinde hasta derin takipneyle (respiratuar alkaloz) salisilatın beyne geçmesini önler. Entübasyon sırasındaki kısa bir apne/PaCO₂ artışı bile kan pH’sını düşürüp iyonize olmayan salisilik asidi BEYNE BOŞALTARAK ani kardiyak arrest yapar! Tedavi: IV NaHCO₃ alkalinizasyonu (idrar pH 7,5–8,0) + EXTRIP Acil Hemodiyaliz!',
          'İBUPROFEN & METAMİZOL COX-1 YARIŞMASI · STENTTE KESME YASAĞI: Düşük doz ASA’nın koroner korumasını İbuprofen ve Metamizol bloke eder (ASA’dan ≥30–60 dk SONRA verin!). Taze koroner stentli hastada ASA’nın perioperatif kesilmesi ölümcül stent trombozu yapar; izole düşük doz ASA spinal/epidural blok için (ASRA 2018) KONTRENDİKASYON DEĞİLDİR!',
        ]}
        antidoteOrRescue="Salisilat zehirlenmesinde spesifik kimyasal antidot yoktur — hayat kurtaran 3 temel adım: (1) İlk saatlerde aktif kömür (tekrarlı doz düşünülebilir); (2) IV Sodyum Bikarbonat (%8,4) 1–2 mEq/kg bolus ardından infüzyon ile İDRAR pH 7,5–8,0 ve serum pH 7,45–7,55 hedeflenmesi (iyon tuzağı ile renal atılım 10–20× artar; hipokalemiyi mutlaka düzelt — K⁺ ≥4,0 mEq/L!); (3) EXTRIP kriterlerinde (düzey >100 mg/dL, bilinç değişikliği, pulmoner ödem, pH ≤7,20) ACİL İNTERMİTTAN HEMODİYALİZ! Kanama komplikasyonunda: Trombosit transfüzyonu (taze non-asetillenmiş trombositler)!"
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Antitrombotik (Antiplatelet) · Analjezik · Antipiretik · Antiinflamatuar
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Coraspin® · Ecopirin® 81–300 mg · Aspirin® 500 mg
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                ESC 2022/2023 · ASRA 2018 · ASPRE · EXTRIP
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Asetilsalisilik Asit / Aspirin{' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Coraspin® · Ecopirin® · Aspirin® Protect)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Trombosit COX-1 enzimini (<code>Ser529</code>) kovalent ve <strong>geri dönüşsüz asetilleyerek</strong>{' '}
              trombositin tüm ömrü boyunca (<strong>7–10 gün</strong>) Tromboksan A₂ sentezini durduran temel{' '}
              <strong>antitrombotik (antiplatelet)</strong> ajandır. Doz bağımlı spektrumuyla{' '}
              <strong>75–100 mg/gün</strong> sekonder kardiyovasküler koruma ve preeklampsi profilaksisinde (100–150 mg),{' '}
              <strong>150–300 mg çiğnenerek</strong> AKS/akut inmede, <strong>2,25–3 g/gün</strong> ise post-MI/akut
              perikarditte kullanılır. Perioperatif dönemde <strong>ASRA 2018’e göre izole düşük doz ASA nöraksiyel blok
              kontrendikasyonu değildir</strong> ve <strong>KABG dahil</strong> sekonder korumada çoğu cerrahide sürdürülür.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: B01AC06 / N02BA01 · ASA t½ 15–20 dk · Etki 7–10 Gün
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              AKS / İskemik İnme Yükleme
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              150–300 mg (ÇİĞNE!)
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              İdame: 75–100 mg/gün · tPA sonrası 24sa bekle!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Perioperatif &amp; ASRA 2018
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              Nöraksiyel &amp; CABG: DEVAM
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Primer koruma (POISE-2): 7 gün önce KES
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Obstetrik &amp; Perikardit
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              100–150 mg Preeklampsi
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              12–36 hf gece · Perikardit: 750–1000 mg q8sa
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Toksikoloji &amp; Kırmızı Çizgi
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              Reye (&lt;18y) · NaHCO₃ / HD
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Salisilat zehirlenmesinde entübasyondan KAÇIN!
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & DOZ-BAĞIMLI ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="asa-moa"
          sectionTitle="Etki Mekanizması: Geri Dönüşsüz COX-1 Ser529 Asetilasyonu & Doz-Bağımlı Spektrum"
          summary="Tüm diğer NSAİİ’ler COX enzimini geri dönüşlü inhibe ederken, Asetilsalisilik asit COX-1’in Ser529 (ve COX-2’nin Ser516) kalıntısına kovalent asetil grubu transfer ederek enzimi KALICI olarak inaktive eder. Çekirdeksiz trombositler yeni COX-1 sentezleyemediği için antiplatelet etki trombosit ömrü (7–10 gün) boyunca sürer!"
          pillars={[
            {
              title: '1. Düşük Doz (75–100 mg/gün) → Portal Trombosit COX-1 Blokajı (Antitrombotik)',
              detail:
                'Mide-bağırsaktan emilen ASA, karaciğerde salisilik aside hidrolize olmadan önce portal dolaşımda trombosit COX-1’ini geri dönüşsüz asetiller ve TXA₂ üretimini >%95 durdurur; sistemik endotelyal PGI₂ görece korunur.',
            },
            {
              title: '2. Orta Doz (500–1000 mg q4–6sa) → Analjezik & Antipiretik Etki',
              detail:
                'Periferik ve hipotalamik PGE₂ sentezini baskılayarak ağrı ve ateşi düşürür (günümüzde rutin ateş/ağrıda GİS ve kanama riski nedeniyle Parasetamol/İbuprofen tercih edilir).',
            },
            {
              title: '3. Yüksek Doz (2,25–4 g/gün) → Antiinflamatuar (Perikardit / Kawasaki)',
              detail:
                'Hem COX-2 asetilasyonu (aspirin-tetikli lipoksinler aracılığıyla pro-rezolüsyon etki!) hem de NF-κB inhibisyonu ile güçlü antiinflamatuar etki sağlar — ancak salisilat klirensi doygunluğa (0. derece kinetik) yaklaşır!',
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
                Detaylı Farmakokinetik (ADME): Enterik vs Çiğneme, Sıfırıncı Derece Salisilat Kinetiği & İdrar pH Tuzağı
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
                  A — Absorpsiyon (Çiğneme vs Enterik Kaplı Farkı!)
                </div>
                Çiğnenmiş/hızlı salınımlı ASA <strong>15–30 dk</strong> içinde pik yapar ve trombositleri hızla
                bloke eder. Enterik kaplı tabletler ince bağırsakta çözündüğünden pik <strong>3–4 saate</strong> uzar
                ve özellikle obez/diyabetik hastalarda “psödo-aspirin direnci”ne yol açabilir — bu yüzden AKS’de ASLA
                bütün enterik tablet yutulmaz!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — Protein Bağlanması & Diyalizlenebilirlik
                </div>
                Salisilat düşük terapötik düzeylerde albumine %80–90 bağlanırken, <strong>toksik düzeylerde albumin
                doygunluğa ulaşır ve bağlanma %50’nin altına düşer</strong> → yüksek serbest fraksiyon beyne geçer,
                aynı zamanda <strong>hemodiyalizle çok etkin temizlenebilir</strong>!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M — Michaelis-Menten (Sıfırıncı Derece) Doygunluk!
                </div>
                ASA plazma esterazlarıyla <strong>15–20 dk</strong>’da salisilik aside döner. Salisilat karaciğerde
                glisinle (salisilürik asit) ve glukuronik asitle konjuge olur. <strong>Yüksek dozlarda bu enzimler
                doyar</strong> → t½ 2–3 saatten <strong>15–30+ saate</strong> fırlar!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  E — İdrar pH Bağımlı İyon Tuzağı (Alkalinizasyon!)
                </div>
                Salisilik asit zayıf bir asittir (<code>pKa ~3,0</code>). Asidik idrarda (pH &lt;6) tübüllerden geri
                emilir; IV Sodyum Bikarbonat ile idrar <strong>pH 7,5–8,0</strong> yapıldığında iyonize forma kilitlenip
                renal klirens <strong>10–20 kat</strong> artar!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="asa-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Salisilatlara veya NSAİİ’lere aşırı duyarlılık, anafilaksi veya Aspirin Alevlenmeli Solunum Yolu Hastalığı — AERD / Samter Triadı (astım + nazal polip + şiddetli bronkospazm; yalnızca özel kardiyoloji/alerji desensitizasyonu hariç).',
          '<16–18 yaş çocuk ve ergenlerde viral ateşli hastalıklar (influenza, suçiçeği vb.): REYE SENDROMU (akut hepatik ensefalopati) nedeniyle MUTLAK KONTRENDİKE! (Tek nadir istisna: Kawasaki hastalığı).',
          'Aktif gastrointestinal kanama, aktif peptik ülser, aktif intrakraniyal kanama veya ağır hemorajik diyatez (hemofili, ağır trombositopeni).',
          'Akut iskemik inmede IV tromboliz (Alteplaz / Tenekteplaz) uygulandıktan sonraki ilk 24 SAAT (intrakraniyal kanama riski!).',
          'Gebeliğin 3. trimesteri (≥28–30. hafta) için YÜKSEK DOZ (>300–500 mg/gün) ASA (fetal duktus kapanması & kanama — düşük doz 81–150 mg preeklampsi profilaksisi KONTRENDİKE DEĞİLDİR!).',
          'Yüksek doz ASA (>1 g/gün) için: Ağır KBY (eGFR <30), ABH, Child-Pugh B–C siroz, NYHA III–IV KKY ve eşzamanlı ≥15 mg/hafta Metotreksat!',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Yüksek Dikkat Durumları"
        relativeItems={[
          'Primer CV koruma (bilinen KAH/inme/PAH yok): Güncel ESC/AHA kılavuzlarına göre net yarar yerine kanama riski baskındır (ASPREE/ARRIVE/ASCEND) — rutin başlama ve cerrahiden 7 gün önce kes (POISE-2)!',
          'DAPT (ASA + P2Y12) veya ASA + Antikoagülan (Varfarin/DOAC) kombinasyonu: GİS kanama riski 3–6× artar → Pantoprazol 40 mg/gün gastroproteksiyonu ZORUNLUDUR!',
          'Eşzamanlı İbuprofen veya Metamizol kullanımı: COX-1 yarışmasıyla düşük doz ASA’yı bloke eder (ASA’dan ≥30–60 dk sonra verilmezse stent trombozu riski!).',
          'Kapalı alan yüksek kanama riskli cerrahiler (intrakraniyal nöroşirürji, intramedüller omurga, arka kamara retinal cerrahi): Kardiyoloji + cerrah ortak kararıyla preop 5–7 gün ara değerlendirilir.',
          'G6PD eksikliği (yüksek dozlarda hemoliz riski; düşük 81–100 mg genelde tolere edilir) ve gut hastalığı (düşük doz ASA ürik asit atılımını hafif azaltabilir).',
        ]}
        clinicalNote="ASRA 2018 & ESAIC 2022 Nöraksiyel Kılavuzu: Tek başına düşük doz Aspirin (75–100 mg/gün) spinal/epidural blok yerleşimi veya kateter çekilmesi için KESME SÜRESİ GEREKTİRMEZ! Ancak eşzamanlı P2Y12 inhibitörü, LMWH veya DOAC varsa o ilacın kesme kuralı geçerlidir."
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="asa-indications"
        title="Klinik Endikasyonlar & Kanıta Dayalı Doz Rejimleri (ESC · AHA · ACOG · ASPRE)"
        subtitle="Aynı molekül — doza bağlı tamamen farklı farmakolojik hedefler (81 mg vs 300 mg çiğneme vs 3 g/gün)"
        icon={<BookOpen className="w-5 h-5 text-teal-500 shrink-0" />}
        defaultOpen={false}
      >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  1. AKS (STEMI / NSTEMI / UA) &amp; Sekonder CV Koruma
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  150–300 → 100 mg
                </span>
              </div>
              <p className={mutedText}>
                <strong>AKS Yükleme (ESC 2023):</strong> İlk temasta <strong>150–300 mg çiğnenmiş non-enterik ASA</strong>{' '}
                (enterik tableti bütün yutma!). <strong>İdame / Sekonder Koruma:</strong> <strong>75–100 mg/gün</strong>{' '}
                (TR’de 100 mg/gün). KABG cerrahisi boyunca <strong>kesilmeden sürdürülür</strong> (safen ven greft
                açıklığını korur!).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  2. Akut İskemik İnme &amp; TIA (AHA / ASA)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  160–300 mg · tPA 24sa!
                </span>
              </div>
              <p className={mutedText}>
                Beyin BT’de kanama dışlandıktan sonra ilk 24–48 saatte <strong>160–300 mg PO/NG</strong> yükleme,
                ardından <strong>75–100 mg/gün</strong> (minör inme/yüksek riskli TIA’da kısa süreli DAPT).{' '}
                <strong>IV tromboliz (tPA) verildiyse 24 saat boyunca ASA KESİNLİKLE verilmez!</strong>
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  3. Gebelik Preeklampsi Profilaksisi (ASPRE / ACOG)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  100–150 mg Gece
                </span>
              </div>
              <p className={mutedText}>
                Yüksek riskli gebelerde <strong>12–16. haftadan 36. haftaya</strong> kadar gece{' '}
                <strong>100–150 mg/gün</strong> (ASPRE çalışması: 150 mg/gece) preterm preeklampsiyi &gt;%60 azaltır.
                Spiral arter remodelingini destekler; bu düşük dozda fetal duktus kapanması veya oligohidramnioz yapmaz!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. Akut Perikardit (Post-MI) &amp; Kawasaki (Pediatrik İstisna)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  750–1000 mg q8sa
                </span>
              </div>
              <p className={mutedText}>
                <strong>Post-MI / Akut Perikardit (ESC 2015):</strong> <strong>750–1000 mg q8sa</strong> + Kolşisin +
                Pantoprazol (CRP normale dönünce azaltarak kes). <strong>Kawasaki:</strong> Akut faz 30–50 mg/kg/gün
                (q6sa) + IVIG → ateşsiz 48–72 sa sonra 3–5 mg/kg/gün antiplatelet idame.
              </p>
            </div>
          </div>
      </MonographAccordionSection>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="asa-calc"
        title="Aspirin Doz, Perioperatif / ASRA 2018 & Salisilat Toksikoloji Hesaplayıcısı"
        subtitle="AKS çiğneme yüklemesi, ESC 2022 / ASRA 2018 nöraksiyel karar motoru, EXTRIP diyaliz & NaHCO₃ alkalinizasyonu"
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
              { id: 'indications_calc' as CalcTab, label: '1. Endikasyon & Doz', icon: Syringe },
              { id: 'periop_asra' as CalcTab, label: '2. Perioperatif & ASRA', icon: Activity },
              { id: 'salicylate_tox' as CalcTab, label: '3. Salisilat Toksisitesi', icon: AlertTriangle },
              { id: 'safety_audit' as CalcTab, label: '4. Güvenlik & Etkileşim', icon: ShieldAlert },
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

          {/* TAB 1: ENDİKASYON & DOZ */}
          {activeTab === 'indications_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="block text-xs font-bold">Klinik Endikasyon Seçin</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Object.keys(indicationMeta) as AsaIndication[]).map((key) => (
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
                      {indicationMeta[key].label}
                    </button>
                  ))}
                </div>

                {indication === 'kawasaki' && (
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <label htmlFor={`${uniqueId}-kawa-wt`} className="block text-xs font-bold mb-1">
                      Çocuk Ağırlığı (Kawasaki):{' '}
                      <span className="text-indigo-600 dark:text-indigo-400">{kawasakiWeightKg} kg</span>
                    </label>
                    <input
                      id={`${uniqueId}-kawa-wt`}
                      type="range"
                      min={5}
                      max={45}
                      step={1}
                      value={kawasakiWeightKg}
                      onChange={(e) => setKawasakiWeightKg(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                )}
              </div>

              {/* Çıktı */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {indicationMeta[indication].label}
                </div>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-[10px] font-bold uppercase opacity-70">Standart Doz Protokolü</div>
                  <div className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-400 mt-0.5">
                    {indicationMeta[indication].doseHeadline}
                  </div>
                </div>
                <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs leading-relaxed">
                  <div className="font-black text-amber-800 dark:text-amber-200 mb-1">
                    TR Preparat &amp; Uygulama Kuralı:
                  </div>
                  <p>{indicationMeta[indication].trFormNote}</p>
                </div>
                <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">Kılavuz Notu:</div>
                  <p className={mutedText}>{indicationMeta[indication].guidance}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERİOPERATİF & ASRA 2018 KARAR MOTORU */}
          {activeTab === 'periop_asra' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">1. Hastanın Aspirin Kullanım Endikasyonu</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'primary_prev' as PeriopReason, label: 'Primer Koruma (ASCVD Yok)' },
                      { id: 'secondary_cad' as PeriopReason, label: 'Sekonder Koruma (KAH / İnme / PAH)' },
                      { id: 'recent_stent' as PeriopReason, label: 'Koroner Stent / Yakın PCI' },
                      { id: 'cabg' as PeriopReason, label: 'Koroner Bypass (KABG)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPeriopReason(opt.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold ${
                          periopReason === opt.id
                            ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">2. Cerrahi Kanama Riski</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'low_mod' as SurgeryBleedRisk, label: 'Düşük / Orta Risk' },
                      { id: 'high_general' as SurgeryBleedRisk, label: 'Yüksek (Genel/Ortopedi)' },
                      { id: 'closed_space' as SurgeryBleedRisk, label: 'Kapalı Alan (Beyin/Omurilik/Retina)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setBleedRisk(opt.id)}
                        className={`p-2 rounded-xl border text-xs font-bold ${
                          bleedRisk === opt.id
                            ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <input
                      type="checkbox"
                      checked={neuraxialPlanned}
                      onChange={(e) => setNeuraxialPlanned(e.target.checked)}
                      className="accent-teal-600"
                    />
                    <span className="font-bold">Spinal / Epidural Nöraksiyel Blok veya Derin Pleksus Bloku Planlanıyor</span>
                  </label>
                  <label className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <input
                      type="checkbox"
                      checked={comboAntithrombotic}
                      onChange={(e) => setComboAntithrombotic(e.target.checked)}
                      className="accent-rose-600"
                    />
                    <span className="font-bold">Eşzamanlı Başka Antitrombotik Var (Klopidogrel/Tikagrelor, LMWH, DOAC, Varfarin)</span>
                  </label>
                </div>
              </div>

              {/* Karar Çıktısı */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div
                  className={`p-4 rounded-xl border-2 space-y-1.5 ${
                    periopDecision.tone === 'emerald'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                      : periopDecision.tone === 'amber'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100'
                        : 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                  }`}
                >
                  <div className="text-xs font-black uppercase opacity-80">ESC 2022 / POISE-2 Cerrahi Kararı</div>
                  <div className="text-sm font-black">{periopDecision.headline}</div>
                  <p className="text-xs leading-relaxed">{periopDecision.detail}</p>
                </div>

                {neuraxialPlanned && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      comboAntithrombotic
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-900 dark:text-rose-100'
                        : 'bg-teal-500/15 border-teal-500/40 text-teal-900 dark:text-teal-100'
                    }`}
                  >
                    <div className="font-black mb-1">ASRA 2018 / ESAIC 2022 Nöraksiyel Blok Kararı:</div>
                    {comboAntithrombotic ? (
                      <p>
                        <strong>DİKKAT — KOMBİNE ANTİTROMBOTİK!</strong> Tek başına ASA sorun olmasa da eşzamanlı
                        P2Y12 inhibitörü (Klopidogrel 5–7g, Tikagrelor 5–7g, Prasugrel 7–10g), LMWH (12–24sa) veya DOAC
                        (48–72sa) varlığında spinal/epidural hematom riski YÜKSEKTİR — diğer ilacın ASRA kesme süresi
                        tamamlanmadan ponksiyon YAPMA!
                      </p>
                    ) : (
                      <p>
                        <strong>GÜVENLİ — KESME GEREKMEZ!</strong> İzole düşük doz Aspirin (75–100 mg/gün) spinal/epidural
                        ponksiyon, kateter yerleştirme veya çekilme için kontrendikasyon değildir. (Yüksek doz &gt;1 g/gün
                        kullanımda dikkatli olun).
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SALİSİLAT TOKSİSİTESİ & EXTRIP DİYALİZ */}
          {activeTab === 'salicylate_tox' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${uniqueId}-toxwt`} className="block text-xs font-bold mb-1">
                      Hasta Ağırlığı (kg)
                    </label>
                    <input
                      id={`${uniqueId}-toxwt`}
                      type="number"
                      min={10}
                      max={160}
                      value={toxWeightKg}
                      onChange={(e) => setToxWeightKg(Math.max(10, Math.min(160, Number(e.target.value) || 70)))}
                      className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uniqueId}-toxgr`} className="block text-xs font-bold mb-1">
                      Alınan Tahmini Doz (gram)
                    </label>
                    <input
                      id={`${uniqueId}-toxgr`}
                      type="number"
                      min={1}
                      max={100}
                      step={0.5}
                      value={ingestedGrams}
                      onChange={(e) => setIngestedGrams(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                      className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                        isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${uniqueId}-ph`} className="block text-xs font-bold mb-1">
                      Arteriyel pH: <span className={arterialPh <= 7.2 ? 'text-rose-500' : 'text-teal-500'}>{arterialPh.toFixed(2)}</span>
                    </label>
                    <input
                      id={`${uniqueId}-ph`}
                      type="range"
                      min={6.9}
                      max={7.6}
                      step={0.02}
                      value={arterialPh}
                      onChange={(e) => setArterialPh(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold mb-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasSalicylateLevel}
                        onChange={(e) => setHasSalicylateLevel(e.target.checked)}
                        className="accent-indigo-600"
                      />
                      Serum Salisilat (mg/dL): {hasSalicylateLevel ? salicylateMgDl : 'Yok'}
                    </label>
                    {hasSalicylateLevel && (
                      <input
                        type="range"
                        min={20}
                        max={140}
                        step={5}
                        value={salicylateMgDl}
                        onChange={(e) => setSalicylateMgDl(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="font-bold">EXTRIP Klinik Kriterleri:</div>
                  {[
                    { checked: toxCns, set: setToxCns, label: 'Bilinç Değişikliği / Ajitasyon / Deliryum / Koma / Nöbet' },
                    { checked: toxPulm, set: setToxPulm, label: 'Yeni O₂ İhtiyacı / Non-Kardiyojenik Pulmoner Ödem' },
                    { checked: toxRenal, set: setToxRenal, label: 'Böbrek Yetmezliği (eGFR <45 mL/dk · HD eşiği >90 mg/dL!)' },
                  ].map((item, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer ${
                        item.checked
                          ? 'bg-rose-500/15 border-rose-500'
                          : isDark
                            ? 'bg-slate-950/50 border-slate-800'
                            : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => item.set(e.target.checked)}
                        className="accent-rose-600"
                      />
                      <span className="font-semibold">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Toksikoloji Çıktısı */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase">Tahmini Alım: {ingestedMgKg} mg/kg</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                      toxTier.tone === 'rose'
                        ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                        : toxTier.tone === 'amber'
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                    }`}
                  >
                    {toxTier.label}
                  </span>
                </div>

                {extripIndicated ? (
                  <div className="p-3.5 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 text-xs space-y-1">
                    <div className="font-black text-sm flex items-center gap-1.5">
                      <ShieldAlert className="w-5 h-5 shrink-0" />
                      EXTRIP: ACİL İNTERMİTTAN HEMODİYALİZ ENDİKASYONU!
                    </div>
                    <p>
                      Nefroloji / Diyaliz ekibini DERHAL çağırın (yüksek akımlı İntermittan HD, CRRT’den çok daha etkindir!).
                      Diyaliz kurulana kadar IV Sodyum Bikarbonat alkalinizasyonunu hemen başlatın!
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs">
                    <strong>Seri İzlem Şart:</strong> Enterik kaplı tabletlerde emilim 12–24 saate kadar gecikip
                    beklenmedik pik yapabilir! 2 saatte bir serum salisilat, ABG, glukoz (nöroglikopeni!) ve K⁺ izleyin.
                  </div>
                )}

                <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="font-black text-teal-600 dark:text-teal-400">
                    IV Sodyum Bikarbonat (%8,4 · 1 mEq/mL) Alkalinizasyonu:
                  </div>
                  <p>
                    • <strong>Bolus:</strong> <strong>{bicarbBolusMeqLow}–{bicarbBolusMeqHigh} mEq</strong> (1–2 mEq/kg = {bicarbBolusMeqLow}–{bicarbBolusMeqHigh} mL) IV.
                  </p>
                  <p>
                    • <strong>İnfüzyon:</strong> 150 mEq NaHCO₃ + 850 mL %5 Dekstroz (+ 20–40 mEq KCl) → 150–250 mL/sa.
                    Hedef: <strong>İdrar pH 7,5–8,0</strong>, <strong>Serum pH 7,45–7,55</strong>, <strong>K⁺ ≥4,0 mEq/L</strong>!
                  </p>
                </div>

                <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30 text-xs">
                  <strong className="text-rose-700 dark:text-rose-300">ENTÜBASYON TUZAĞI:</strong> Solunum yorgunluğu/koma
                  olmadıkça entübe ETME! Entübasyon zorunluysa öncesi/sırasında IV NaHCO₃ ver ve hastanın yüksek dakika
                  ventilasyonunu (<code>PaCO₂</code> düşüklüğünü) ventilatörde aynen koru!
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GÜVENLİK & ETKİLEŞİM DENETLEYİCİ */}
          {activeTab === 'safety_audit' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                {SAFETY_FACTORS.map((factor) => {
                  const checked = selectedRisks.includes(factor.id);
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
                        onChange={() => toggleRisk(factor.id)}
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
                {hasContraindicated ? (
                  <div className="p-4 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 space-y-1.5">
                    <div className="font-black text-sm flex items-center gap-2">
                      <ShieldAlert className="w-5 h-5 shrink-0" />
                      MUTLAK KONTRENDİKASYON — ASPİRİN UYGULAMA!
                    </div>
                    <p className="text-xs leading-relaxed">
                      Seçili faktör kesin kontrendikasyondur (Reye, aktif kanama, AERD, tPA &lt;24 sa veya 3. trimester
                      yüksek doz). Uygun endikasyona göre Parasetamol veya kardiyoloji alternatifi (Klopidogrel vb.)
                      değerlendirin.
                    </p>
                  </div>
                ) : hasHighRisk ? (
                  <div className="p-4 rounded-xl border-2 bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100 space-y-1.5">
                    <div className="font-black text-sm flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 shrink-0" />
                      YÜKSEK RİSK — ÖZEL ZAMANLAMA / PPI GEREKLİ!
                    </div>
                    <p className="text-xs leading-relaxed">
                      Aşağıdaki spesifik kuralları uygulayarak güvenle yönetebilirsiniz:
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs space-y-1">
                    <div className="font-black text-sm text-emerald-700 dark:text-emerald-300">
                      Standart Kullanım Uygun
                    </div>
                    <p>
                      Sekonder CV korumada 75–100 mg/gün, AKS yüklemesinde 150–300 mg çiğnenerek güvenle uygulanabilir.
                    </p>
                  </div>
                )}

                {hasCox1Clash && (
                  <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs">
                    <strong>COX-1 Zamanlama Kuralı:</strong> İbuprofen veya Metamizol, hızlı salınımlı Aspirin
                    alındıktan <strong>en az 30–60 dakika SONRA</strong> verilmelidir! Enterik kaplı ASA ile düzenli
                    İbuprofen/Metamizol kullanmaktan kaçının (Parasetamol güvenlidir!).
                  </div>
                )}

                {needsPpi && !hasContraindicated && (
                  <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30 text-xs">
                    <strong>PPI Gastroproteksiyonu ZORUNLU:</strong> DAPT (ASA + P2Y12) veya antikoagülan birlikteliğinde
                    Klopidogrel (CYP2C19) ile etkileşmeyen <strong>Pantoprazol 40 mg/gün</strong> ekleyin!
                  </div>
                )}
              </div>
            </div>
          )}
      </MonographAccordionSection>

      {/* 8. TÜRKİYE PİYASA FORMLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="asa-tr"
        preparations={[
          {
            name: 'Coraspin® 100 mg & 300 mg · Aspirin® Protect 100 mg (Enterik Kaplı)',
            presentation: 'Enterik kaplı (mide dirençli) film tablet',
            concentration: '100 mg · 300 mg / tablet',
            saltOrBaseNote:
              'Kronik sekonder koruma için bütün yutulur. DİKKAT: AKS yüklemesinde (STEMI/NSTEMI) bütün yutulursa emilim 3–4+ saat gecikir — acilde mutlaka ÇİĞNENEREK veya non-enterik formla verilmelidir!',
            alertLevel: 'high',
          },
          {
            name: 'Ecopirin® 81 mg · 100 mg · 150 mg · 300 mg (Enterik Kaplı)',
            presentation: 'Geniş doz aralıklı enterik kaplı tabletler',
            concentration: '81 / 100 / 150 / 300 mg',
            saltOrBaseNote:
              'Ecopirin® 150 mg, ASPRE çalışmasındaki gebelik preeklampsi profilaksisi (150 mg/gece) için Türkiye’deki en pratik formdur!',
            alertLevel: 'standard',
          },
          {
            name: 'Aspirin® 500 mg (Enterik Kaplı OLMAYAN Standart Tablet)',
            presentation: 'Çentikli hızlı salınımlı 500 mg oral tablet',
            concentration: '500 mg / tablet (½ tablet = 250 mg!)',
            saltOrBaseNote:
              'Acil serviste AKS yüklemesi için ½ tablet (250 mg) çiğnenerek hızlı emilim (15–30 dk) sağlar; ayrıca akut perikarditte (750–1000 mg q8sa) kullanılır.',
            alertLevel: 'standard',
          },
          {
            name: 'IV Lizin Asetilsalisilat (Aspegic® vb.) — TÜRKİYE STOK NOTU',
            presentation: 'Türkiye hastanelerinde ve acil arabalarında RUTİN BULUNMAZ!',
            concentration: 'TR’de standart: Oral Çiğneme / NG Sonda / Rektal',
            saltOrBaseNote:
              'Avrupa ESC kılavuzlarında 75–250 mg IV seçenek geçse de Türkiye pratiğinde entübe/disfajik AKS veya inme hastasında ezilmiş ASA’nın NG/OG sondadan (veya rektal suppozituvarla) verilmesi standarttır.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'AKS Acil Yükleme (TR Pratiği): 150–300 mg (½ adet Aspirin® 500 mg veya 3 adet 100 mg tablet iyice çiğnenip/ezilip az su ile verilir → 15–30 dk etki!).',
          'Entübe / Disfajik Hasta (NG/OG): 150–300 mg non-enterik (veya ince ezilmiş) tablet 20–30 mL su içinde süspanse edilip NG/OG sondadan verilir ve su ile yıkanır.',
        ]}
        concentrationTrapWarning={'ENTERİK KAPLI AKS YÜKLEME TUZAĞI: STEMI/NSTEMI hastasına enterik kaplı Coraspin® 300 mg bütün olarak yutturulursa trombosit inhibisyonu saatlerce gecikir! Akut koroner sendromda mutlaka ÇİĞNETİN veya ezerek verin!'}
      />

      {/* 9. UYGULAMA YOLU & FORMÜLASYON UYUMLULUĞU */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="asa-compat"
        accessRequirement="peripheral-ok"
        accessSummary="Türkiye’de standart uygulama yolu ORAL’dır (AKS’de çiğneme/ezme; kronik korumada enterik kaplı bütün yutma; disfajide NG/OG sonda). IV Lizin Asetilsalisilat (Aspegic®) Türkiye’de rutin mevcut değildir."
        phRange="pKa ~3,0 (Zayıf Organik Asit — Mide Asidinde Non-İyonize)"
        osmolalityNote="Oral enterik kaplı formlar pH >5,5 ince bağırsakta çözünür; ezilip NG sondadan verilirken sondayı tıkamamak için iyice öğütülüp 20–30 mL suyla yıkanmalıdır."
        compatibleDiluents={[
          'Oral / NG Sonda: 20–30 mL içme suyu (ezilerek hemen uygulanır)',
          'Rektal Suppozituvar (yutma/NG olanaksızsa 300 mg rektal)',
        ]}
        stabilityNote="Aspirin nem ve sıcaklıkla hızla hidrolize olup asetik asit (sirke kokusu!) ve salisilik aside parçalanır — belirgin sirke kokusu olan veya nemlenmiş tabletler etkinliğini kaybetmiştir ve kullanılmamalıdır!"
        ySiteCompatible={[
          'NG / Oral: Su ile ayrı uygulama ve yıkama',
        ]}
        ySiteIncompatible={[
          'İbuprofen & Metamizol (aynı anda oral alım COX-1 Ser529 yarışmasıyla ASA’yı bloke eder — ≥30–60 dk ara bırakın!)',
          'Yüksek doz antiasitler (idrar pH’sını artırarak yüksek doz salisilat düzeylerini düşürebilir)',
        ]}
        extravasationProtocol="Oral uygulama ajanıdır. Ciddi GİS irritasyonu veya kanama şüphesinde ilaç durdurulur, IV Pantoprazol (80 mg bolus → 8 mg/sa veya 40 mg q12sa) ve endoskopik değerlendirme planlanır."
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="asa-organ"
        renalSummary="Düşük doz (81–100 mg/gün) sekonder CV korumada tüm KBY evrelerinde ve IHD’de genelde SÜRDÜRÜLÜR; ancak yüksek analjezik/antiinflamatuar dozlar eGFR <30 / ABH’de KONTRENDİKEDİR! Salisilat HEMODİYALİZLE ETKİN TEMİZLENİR (EXTRIP)!"
        renalDetails={[
          'eGFR 30–59: 81–100 mg/gün KAH koruması devam; yüksek doz analjezik/perikardit kullanımından kaçının.',
          'eGFR <30 / ABH / IHD / CRRT: Yüksek doz ASA yasak! Sekonder stent/AKS koruması için 81–100 mg + PPI değerlendirilir; ağır salisilat toksisitesinde yüksek akımlı İntermittan Hemodiyaliz hayat kurtarıcıdır.',
        ]}
        hepaticSummary="Child-Pugh B–C sirozda yüksek doz ASA kesinlikle KONTRENDİKEDİR (HRS, masif varis kanaması, salisilat hepatotoksisitesi); düşük doz (81–100 mg) dahi yalnızca zorunlu stent/AKS’de yakın kanama izlemi ve PPI ile düşünülür."
        hepaticDetails={[
          'Child-Pugh A: Sekonder KAH/stent varsa 81–100 mg/gün + PPI sürdürülebilir; yüksek dozdan kaçının.',
          'Child-Pugh B–C: Portal hipertansiyon/varis kanaması ve ağır trombositopeni nedeniyle yüksek doz yasak, düşük doz çok yüksek risklidir.',
        ]}
        {...STANDALONE_ORGAN_PART2['aspirin']}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="asa-special"
        geriatricReductionBadge="AGS Beers 2023: >60–70 Yaşta Primer Koruma BAŞLAMA! (ASPREE)"
        geriatricPoints={[
          'ASPREE Çalışması (NEJM 2018) & AGS Beers 2023: Bilinen kardiyovasküler hastalığı olmayan ≥70 yaş sağlıklı yaşlılarda primer koruma için Aspirin başlanması sağkalım yararı sağlamazken majör GİS/intrakraniyal kanamayı anlamlı artırır — primer korumada BAŞLAMAYIN!',
          'Sekonder Korumada 75–100 mg + PPI: KAH/stent/inme öyküsü olan yaşlıda 81–100 mg/gün sürdürülür, ancak >65–75 yaş GİS kanama riski nedeniyle Pantoprazol 40 mg/gün eklenmesi kuvvetle önerilir.',
          'Gizli Kronik Salisilatizm: Yaşlılarda yüksek doz veya tekrarlayan reçetesiz salisilat alımı ateş, takipne, deliryum ve non-kardiyojenik pulmoner ödemle "sepsis" taklidi yapabilir!',
        ]}
        obesityWeightScalarBadge="81–100 mg Standart · Enterik Kaplıda Psödo-Direnç Dikkat!"
        obesityPoints={[
          'Obezitede Standart Doz: Güncel ESC/AHA kılavuzları obezitede de 75–100 mg/gün önerir; ancak >100–120 kg hastalarda enterik kaplı tabletlerin emilimi azalabildiğinden (psödo-direnç) acil yüklemede çiğnenmiş non-enterik form özellikle önemlidir.',
          'Aşırı Doz Hesabı: Salisilat toksisitesinde mg/kg tahmini yapılırken gerçek ağırlık (TBW) kullanılır; ancak klinik tablo ve seri serum salisilat düzeyleri her zaman esastır.',
        ]}
        clinicalNote="Toksisite değerlendirmesi ve erişkin ağırlık bağlamı için:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Asetilsalisilik Asit (Aspirin)"
        recommendedScalar="TBW"
        secondaryScalar={{ type: 'IBW', context: 'Erişkin Antiplatelet Sabit 81–100 mg/gün' }}
        rationale="Erişkin antiplatelet doz sabittir (75–100 mg/gün; AKS yükleme 150–300 mg). Salisilat aşırı dozunda mg/kg risk hesabı ve IV NaHCO₃ 1–2 mEq/kg bolusu için ağırlık değerlendirilir."
        currentWeightKg={activeTab === 'salicylate_tox' ? toxWeightKg : adultWeightKg}
        onApplyWeight={(w) => {
          setAdultWeightKg(Math.max(40, Math.min(180, Math.round(w))));
          setToxWeightKg(Math.max(20, Math.min(160, Math.round(w))));
        }}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="asa-preg"
        pregnancySummary="DOZ AYRIMI HAYATİDİR! Düşük doz (81–150 mg/gece, 12–36 hf) yüksek riskli gebelerde preeklampsi profilaksisi için GÜVENLİ ve ÖNERİLİR (ASPRE / ACOG)! Yüksek analjezik/antiinflamatuar dozlar (>300–500 mg/gün) ise ≥20–30. haftada MUTLAK KONTRENDİKEDİR!"
        pregnancyDetails={[
          'Düşük Doz (81–150 mg/gün): ASPRE (NEJM 2017) & ACOG/FIGO — preterm preeklampsiyi >%60 azaltır; fetal duktus arteriozus kapanmasına veya oligohidramnioza yol açmaz; 36. haftada (bazı merkezlerde doğuma kadar) kesilir.',
          'Yüksek Doz (>300–500 mg/gün): ≥20. haftada fetal renal hasar/oligohidramnioz, ≥30. haftada fetal duktus erken kapanması, uzamış doğum ve maternal/neonatal intrakraniyal kanama nedeniyle KESİNLİKLE YASAKTIR!',
        ]}
        lactationSummary="Düşük doz (75–100 mg/gün) anne sütüne çok az geçer ve kardiyak endikasyonda dikkatli izlemle (bebekte morarma/kanama) genelde kabul edilir; ancak analjezik/yüksek dozlar Reye sendromu & metabolik asidoz riskiyle EMZİRMEDE KONTRENDİKEDİR!"
        lactationDetails={[
          'Emziren Annede Analjezi/Ateş: Asla yüksek doz Aspirin kullanmayın — emzirmede tamamen güvenli olan Parasetamol veya İbuprofen seçin!',
        ]}
      />

      {/* 13. YAN ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="asa-adr"
        items={[
          {
            title: 'Üst & Alt GİS Erozyon, Peptik Ülser ve Majör Kanama',
            incidenceOrSeverity: 'En Sık Majör Toksisite · Doz Bağımlı',
            detail:
              'Hem topikal mukozal hasar hem sistemik COX-1 PGE₂ blokajı + geri dönüşsüz trombosit inhibisyonu nedeniyle düşük dozda dahi (75–100 mg) GİS kanama riski ~2 kat artar; DAPT/antikoagülan/yaş >65’te Pantoprazol ZORUNLUDUR!',
            tone: 'rose',
          },
          {
            title: 'Reye Sendromu (<16–18 Yaş Çocuk / Ergenlerde Viral Ateş)',
            incidenceOrSeverity: 'Nadir · Yüksek Mortalite · Mutlak Yasak',
            detail:
              'Mitokondriyal beta-oksidasyon bozukluğu üzerinden hızla gelişen akut non-inflamatuar ensefalopati (kusma, konfüzyon, koma, beyin ödemi) ve mikroveziküler yağlı karaciğer.',
            tone: 'rose',
          },
          {
            title: 'Akut / Kronik Salisilat Toksisitesi (HAGMA + Respiratuar Alkaloz + Pulmoner Ödem)',
            incidenceOrSeverity: 'Aşırı Doz (>150–300 mg/kg) · Hayatı Tehdit Eden',
            detail:
              'Tinnitus/sağırlık, takipne, kusma, terleme, mikst respiratuar alkaloz + yüksek anyon açıklı metabolik asidoz, nöroglikopeni, non-kardiyojenik pulmoner ödem, nöbet ve koma — tedavisi IV NaHCO₃ + EXTRIP HD!',
            tone: 'rose',
          },
          {
            title: 'İntrakraniyal / Cerrahi Kanama & Uzamış Hemostaz (7–10 Gün)',
            incidenceOrSeverity: 'Geri Dönüşsüz Trombosit Blokajı',
            detail:
              'Yeni trombosit üretimi günlük ~%10–15 olduğundan hemostatik etki kesildikten sonra 5–7+ gün sürer; acil masif kanamada taze trombosit süspansiyonu etkiyi hızla tersine çevirir.',
            tone: 'amber',
          },
          {
            title: 'Aspirin Alevlenmeli Solunum Yolu Hastalığı (AERD / Samter Triadı)',
            incidenceOrSeverity: 'Astım + Nazal Polip · Kritik',
            detail:
              'COX-1 blokajı → 5-lipoksijenaz / sisteinil lökotrien fırtınası → dakikalar içinde şiddetli bronkospazm, rinit ve anafilaktoid tablo.',
            tone: 'amber',
          },
          {
            title: 'Tinnitus / Ototoksisite & Hiperürisemi (Düşük Dozda)',
            incidenceOrSeverity: 'Yüksek Dozda Geri Dönüşlü Tinnitus',
            detail:
              'Yüksek doz antiinflamatuar tedavide kulak çınlaması (tinnitus) ve işitme azalması salisilat toksisitesinin erken klinik uyarısıdır; düşük doz ASA ise ürik asit sekresyonunu hafif azaltabilir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="asa-cautions"
        items={[
          {
            title: 'İntrakraniyal Kanama veya Acil Cerrahide Aspirin Etkisini Tersine Çevirme',
            detail:
              'PATCH çalışması (Lancet 2016) spontan (cerrahi dışı) intrakraniyal kanamada rutin trombosit transfüzyonunun faydasız/zararlı olduğunu göstermiştir! Ancak ACİL nöroşirürji/hayatı tehdit eden masif cerrahi kanamada (son 1–2 saatte ASA alınmadıysa) 1 ünite aferez trombosit (+ desmopressin 0,3 mcg/kg düşünülebilir) yeni asetillenmemiş trombositlerle hemostazı hızla düzeltir.',
          },
          {
            title: 'DAPT (ASA + Klopidogrel) Hastasında Doğru PPI Seçimi: Pantoprazol!',
            detail:
              'Omeprazol ve Esomeprazol, CYP2C19’u inhibe ederek Klopidogrelin aktif metabolite dönüşümünü azaltabilir. DAPT kullanan hastada GİS kanamasını önlemek için mutlaka CYP2C19 etkileşimi minimal olan Pantoprazol 40 mg/gün seçin!',
          },
          {
            title: 'Salisilat Toksisitesinde Nöroglikopeni (Normal Kan Şekerinde Beyin Hipoglisemisi!)',
            detail:
              'Salisilatlar oksidatif fosforilasyonu bozarak beyin glukoz tüketimini aşırı artırır; serum glukozu normal görünse bile BOS glukozu düşük (nöroglikopeni) olabilir — bilinç değişikliği olan salisilat zehirlenmesinde ampirik IV Dekstroz uygulanır!',
          },
          {
            title: 'Düşük Doz (81–100 mg) vs 325 mg — ADAPTABLE Çalışması (NEJM 2021)',
            detail:
              '15.076 KAH hastasında yapılan ADAPTABLE çalışmasında günlük 81 mg ile 325 mg Aspirin arasında ölüm/MI/inme açısından hiçbir fark saptanmamıştır — 75–100 mg/gün optimal etkinlik ve en düşük GİS kanama dengesini sunar!',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="asa-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'COX-1 Ser529 Geri Dönüşsüz Asetilasyonu & Aspirin-Tetikli Lipoksinler (ATL)',
          summary:
            'Asetilsalisilik asit, hidrofobik COX kanalına girip aktif bölgedeki Ser529 (COX-1) ve Ser516 (COX-2) aminoasitlerini kovalent asetilleyerek tüm diğer NSAİİ’lerden ayrılan eşsiz bir etki profili sergiler:',
          points: [
            'Trombosit Ömrü Boyu Blokaj (7–10 Gün): Çekirdeksiz trombositler yeni COX-1 proteini üretemediği için tek bir 75–100 mg doz trombositin ömrü boyu TXA₂ sentezini kapatır; kemik iliğinden günde ~%10–15 yeni trombosit salınımıyla ~3–5 günde hemostatik eşik, ~7–10 günde tam agregasyon geri döner.',
            'Portal Presistemik Seçicilik: Düşük doz ASA portal vende trombositleri asetilledikten sonra karaciğer ilk geçişinde salisilik aside hidrolize olur; böylece sistemik damar endotelinin vazodilatatör/antitrombotik PGI₂ sentezi görece korunur.',
            'COX-2 Ser516 Modifikasyonu → 15-epi-Lipoksin A₄: Asetillenmiş COX-2 tamamen susmaz; bunun yerine proinflamatuar PG yerine inflamasyonu çözen (pro-resolving) 15-epi-lipoksinler üretir!',
          ],
        }}
        intracellularSignaling={{
          title: 'Salisilat Toksisitesinin Mitokondriyal Biyokimyası & İyon Tuzağı Fizyolojisi',
          summary:
            'Yüksek doz salisilat zehirlenmesinde hayati tehlike oluşturan iki temel fizyopatolojik mekanizma:',
          points: [
            'Oksidatif Fosforilasyon Eşleşmesinin Bozulması (Uncoupling): Mitokondri iç zarında proton gradiyentini bozarak ATP üretimini düşürür, enerjiyi ısıya çevirir (hipertermi/terleme), anaerobik glikolizi (laktik asidoz) ve yağ asidi oksidasyonunu (ketoasidoz) patlatarak ağır HAGMA doğurur.',
            'pH-Bağımlı Kan-Beyin & Böbrek İyon Tuzağı: Henderson-Hasselbalch denklemine göre kan pH’sı 7,40’tan 7,20’ye düştüğünde lipidde çözünen non-iyonize salisilik asit (HA) fraksiyonu ~2 kat artarak hızla SSS’ye girer ve nöron içinde iyonize olup hapsolur! Bu yüzden asidemi (veya entübasyon sırasında PaCO₂ artışı!) ani serebral ölüm tetikler.',
            'Alkali İdrar Tuzağı: Tam tersine idrar pH’sı 5,5’ten 7,8’e çıkarıldığında renal tübülde non-iyonize geri emilim durur ve salisilat hızla idrarla atılır.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Trombositler & Kardiyovasküler Endotel',
            tissueTarget: 'Trombosit COX-1 (Ser529) · Koroner & Serebral Arterler',
            accent: 'rose',
            points: [
              'AKS’de çiğnenerek yükleme (150–300 mg) mortaliteyi ~%23 azaltan (ISIS-2 landmark çalışması!) temel hayat kurtarıcı tedavidir.',
              'KABG cerrahisinde perioperatif devam ettirilmesi greft tıkanmasını ve MI’yı azaltır.',
            ],
          },
          {
            systemTitle: 'Gastrointestinal Mukoza',
            tissueTarget: 'Mide / Duodenum Epitel Bariyeri (COX-1 PGE₂)',
            accent: 'amber',
            points: [
              'Düşük doz enterik kaplı formlar topikal erozyonu azaltsa da sistemik COX-1 blokajı nedeniyle GİS kanama riskini tamamen sıfırlamaz.',
              'DAPT/antikoagülan ve yaş >65’te Pantoprazol 40 mg/gün üst GİS kanamasını %70–80 düşürür.',
            ],
          },
          {
            systemTitle: 'Solunum Merkezi, SSS & Asit-Baz Dengesi (Toksisite)',
            tissueTarget: 'Medüller Kemoreseptörler · Mitokondri · Kan-Beyin Bariyeri',
            accent: 'indigo',
            points: [
              'Erken dönemde direkt medüller uyarıyla derin takipne (respiratuar alkaloz), ardından HAGMA ile klasik mikst asit-baz tablosu oluşturur.',
              'Toksik hastada entübasyon/hipoventilasyon asidemiyi derinleştirerek ölümcül SSS salisilat yüklenmesine yol açar!',
            ],
          },
          {
            systemTitle: 'Plasental Spiral Arterler & Fetal Duktus (Doz Bağımlı!)',
            tissueTarget: 'Uteroplasental TXA₂/PGI₂ Dengesi · Fetal Duktus Arteriozus',
            accent: 'teal',
            points: [
              'Düşük doz (100–150 mg/gece, 12–36 hf) plasental TXA₂/PGI₂ oranını düzelterek preterm preeklampsiyi önler.',
              'Yüksek doz (>300–500 mg/gün) 3. trimesterde fetal duktusu erken kapatır ve kesinlikle kontrendikedir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'DAPT Sinerjisi, Preeklampsi Koruması & Optimal 75–100 mg Dozu',
          summary:
            'Kardiyovasküler tıpta Aspirin tek başına veya P2Y12 inhibitörleriyle (Klopidogrel, Tikagrelor, Prasugrel) dual antiplatelet sinerjinin temel omurgasıdır:',
          points: [
            'TXA₂ (ASA) + P2Y12 ADP Reseptörü (DAPT): Trombosit aktivasyonunun iki ana amplifikasyon yolağını eşzamanlı kapatarak koroner stent trombozunu önler.',
            '75–100 mg = Optimal Doz (ADAPTABLE 2021): 325 mg’a çıkmanın ekstra koroner koruması yoktur; yalnızca GİS kanamasını artırır (ayrıca Tikagrelor ile >100 mg ASA kullanımı etkinliği azaltır — FDA kutu uyarısı!).',
            'Analjezik/Antipiretik Rolü: Günümüz modern anestezi ve dahiliye pratiğinde rutin ağrı/ateş için Aspirin yerine Parasetamol, İbuprofen veya Metamizol tercih edilir.',
          ],
        }}
        clinicalPearls={[
          'AKS’de Çiğnet, Enterik Bütün Yutturma: 150–300 mg çiğnenmiş ASA 15–30 dk’da etki eder; bütün yutulan enterik tablet 3–4+ saat gecikir!',
          'Tikagrelor + ASA >100 mg YASAK: PLATO çalışmasına göre Tikagrelor ile birlikte Aspirin idame dozu MUTLAKA ≤100 mg/gün (75–100 mg) olmalıdır!',
          'İzole Düşük Doz ASA ≠ Nöraksiyel Kontrendikasyon: ASRA 2018 ve ESAIC 2022’ye göre tek başına 75–100 mg ASA alan hastada spinal/epidural blok güvenle yapılır!',
          'Salisilat Zehirlenmesinde Entübe Etme — Alkalinize Et & Diyalizle: İdrar pH 7,5–8,0 + K⁺ ≥4,0 + EXTRIP hemodiyaliz hayat kurtarır!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="asa-refs"
        drugName="Asetilsalisilik Asit (Aspirin)"
        drugsComUrl="https://www.drugs.com/drug-interactions/aspirin.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'D',
            agent: 'İbuprofen & Metamizol (Düşük Doz ASA Alan KAH / Stent Hastasında)',
            mechanism: 'Trombosit COX-1 Ser529 Bölgesinde Geri Dönüşlü Sterik Yarışma',
            clinicalEffect:
              'Aspirinin geri dönüşsüz antiplatelet korumasının iptali (MI / koroner stent trombozu riski!).',
            management:
              'İbuprofen veya Metamizolü hızlı salınımlı Aspirinden ≥30–60 dk SONRA uygulayın; kronik enterik ASA ile düzenli İbuprofen/Metamizol yerine Parasetamol seçin.',
          },
          {
            severity: 'D',
            agent: 'Tikagrelor (Brilinta®) ile >100 mg/gün Aspirin',
            mechanism: 'Yüksek Doz ASA’nın Endotelyal PGI₂ İnhibisyonu (PLATO Alt Grup Etkileşimi — FDA Kutu Uyarısı)',
            clinicalEffect:
              'Tikagrelorun kardiyovasküler koruyucu etkinliğinde anlamlı azalma!',
            management:
              'Tikagrelor kullanan hastalarda Aspirin idame dozu KESİNLİKLE 75–100 mg/gün (≤100 mg) olmalıdır!',
          },
          {
            severity: 'D',
            agent: 'Antikoagülanlar (Varfarin · Apiksaban · Rivaroksaban · Dabigatran · Heparin/LMWH) & P2Y12',
            mechanism: 'Sinerjik Hemostaz İnhibisyonu + Gastrik Mukozal Hasar',
            clinicalEffect:
              'Majör üst/alt GİS kanaması ve intrakraniyal kanama riskinde 3–6 kat artış.',
            management:
              'Yalnızca kesin endikasyonda kombine edin; mutlaka Pantoprazol 40 mg/gün (Klopidogrel dostu!) ekleyin ve Hb/INR izleyin.',
          },
          {
            severity: 'D',
            agent: 'Metotreksat (Özellikle ≥15 mg/hafta veya Yüksek Doz Onkolojik MTX)',
            mechanism: 'Salisilatın Renal Tübüler MTX Sekresyonunu ve Albumin Bağlanmasını Bloke Etmesi',
            clinicalEffect:
              'Ağır ve ölümcül pansitopeni, mukozit ve akut böbrek hasarı.',
            management:
              'Yüksek doz ASA ile MTX’i birlikte KULLANMAYIN; düşük doz 81–100 mg + haftalık düşük doz MTX’de yakın CBC takibi yapın.',
          },
          {
            severity: 'C',
            agent: 'SSRI / SNRI Antidepresanlar, Sistemik Kortikosteroidler & Alkol',
            mechanism: 'Trombosit Serotonin Azalması + Aditif GİS Mukozal Hasar',
            clinicalEffect:
              'Üst GİS ülser kanaması riskinde belirgin artış.',
            management:
              'Eşzamanlı kullanımda Pantoprazol 40 mg/gün gastroproteksiyonu ekleyin.',
          },
          {
            severity: 'C',
            agent: 'Asetazolamid (Yüksek Doz Salisilat ile)',
            mechanism: 'Karbonik Anhidraz İnhibisyonu → Metabolik Asidemi & Asetazolamid Atılımında Azalma',
            clinicalEffect:
              'Asidemi salisilatın SSS’ye geçişini artırır → ciddi SSS salisilat toksisitesi (konfüzyon, koma)!',
            management:
              'Yüksek doz salisilat ile Asetazolamid kombinasyonundan kaçının.',
          },
        ]}
        references={[
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Task Force)',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes',
            journal: 'European Heart Journal',
            year: 2023,
            note: 'AKS’de 150–300 mg çiğnenmiş ASA yüklemesi, 75–100 mg/gün idame ve DAPT/PPI yönetim kılavuzu.',
          },
          {
            authors: 'Halvorsen S, Mehilli J, Cassese S, et al. (ESC Task Force)',
            title: '2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery',
            journal: 'European Heart Journal',
            year: 2022,
            note: 'Perioperatif dönemde sekonder KAH/stent hastalarında ASA’nın sürdürülmesi ve kapalı alan cerrahilerinde bireyselleştirilmesi.',
          },
          {
            authors: 'Devereaux PJ, Mrkobrada M, Sessler DI, et al. (POISE-2 Investigators)',
            title: 'Aspirin in Patients Undergoing Noncardiac Surgery',
            journal: 'New England Journal of Medicine',
            year: 2014,
            note: 'Primer koruma / stentsiz non-kardiyak cerrahide perioperatif ASA’nın mortalite/MI’yı azaltmayıp majör kanamayı artırdığını gösteren landmark RKÇ.',
          },
          {
            authors: 'Rolnik DL, Wright D, Poon LC, et al. (ASPRE Trial)',
            title: 'Aspirin versus Placebo in Pregnancies at High Risk for Preterm Preeclampsia',
            journal: 'New England Journal of Medicine',
            year: 2017,
            note: 'Yüksek riskli gebelerde 150 mg/gece ASA’nın (11–14. hf → 36. hf) preterm preeklampsiyi >%60 azalttığını kanıtlayan RKÇ.',
          },
          {
            authors: 'Juurlink DN, Gosselin S, Kielstein JT, et al. (EXTRIP Workgroup)',
            title: 'Extracorporeal Treatment for Salicylate Poisoning: Systematic Review and Recommendations From the EXTRIP Workgroup',
            journal: 'Annals of Emergency Medicine',
            year: 2015,
            note: 'Salisilat zehirlenmesinde acil hemodiyaliz (EXTRIP) eşikleri (>100 mg/dL, bilinç değişikliği, pulmoner ödem, pH ≤7,20).',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'İzole düşük doz Aspirinin spinal/epidural blok için kesme süresi gerektirmediğini belirten kılavuz.',
          },
          {
            authors: 'Jones WS, Mulder H, Wruck LM, et al. (ADAPTABLE Trial)',
            title: 'Comparative Effectiveness of Aspirin Dosing in Cardiovascular Disease',
            journal: 'New England Journal of Medicine',
            year: 2021,
            note: '15.076 KAH hastasında 81 mg/gün ile 325 mg/gün Aspirin arasında kardiyovasküler etkinlik farkı olmadığını gösteren çalışma.',
          },
          {
            authors: 'McNeil JJ, Wolfe R, Woods RL, et al. (ASPREE Investigators)',
            title: 'Effect of Aspirin on Cardiovascular Events and Bleeding in the Healthy Elderly',
            journal: 'New England Journal of Medicine',
            year: 2018,
            note: 'Sağlıklı yaşlılarda (≥70 yaş) primer koruma Aspirinin sağkalım faydası olmadan majör kanamayı artırdığını gösteren landmark çalışma.',
          },
        ]}
      />

      {/* Alt Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          ESC 2022/2023 · POISE-2 · ASRA 2018 · ASPRE · EXTRIP · ADAPTABLE ile Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Antitrombotik · Analjezik · Antipiretik
        </span>
      </div>
    </div>
  );
};
