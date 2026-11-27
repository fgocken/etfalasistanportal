import React, { useId, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Baby,
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

type CalcTab = 'adult_iv' | 'pediatric' | 'agranulocytosis' | 'safety_audit';
type AdultIndication = 'periop_pain' | 'colic_spasm' | 'refractory_fever' | 'severe_acute';
type AdultRoute = 'iv_infusion' | 'iv_slow_bolus' | 'po_oral';

interface SafetyFactor {
  id: string;
  label: string;
  sublabel: string;
  severity: 'contraindicated' | 'high' | 'moderate';
}

const SAFETY_FACTORS: SafetyFactor[] = [
  {
    id: 'prior_agran_bm',
    label: 'Geçmiş Metamizol Agranülositozu / Kemik İliği Baskılanması / Nötropeni',
    sublabel: 'ÖMÜR BOYU MUTLAK KONTRENDİKE (ölümcül tekrarlayan nötropenik sepsis)!',
    severity: 'contraindicated',
  },
  {
    id: 'preg_3rd',
    label: 'Gebelik 3. Trimester (≥28–30. Hafta) veya Emzirme (Tekrarlayan Kullanım)',
    sublabel: 'Fetal duktus arteriozus kapanması & renal hasar (EMA 2018 MUTLAK KONTRENDİKE)!',
    severity: 'contraindicated',
  },
  {
    id: 'aerd_pyrazolone',
    label: 'Pirazolon / NSAİİ İle Tetiklenen Astım (AERD), Ürtiker veya Anafilaksi',
    sublabel: 'Şiddetli bronkospazm / anafilaktik şok — MUTLAK KONTRENDİKE!',
    severity: 'contraindicated',
  },
  {
    id: 'g6pd_porphyria',
    label: 'Konjenital G6PD Eksikliği veya Akut İntermittan Hepatik Porfiri',
    sublabel: 'Akut hemolitik kriz / porfiri atağı tetikler — KONTRENDİKE!',
    severity: 'contraindicated',
  },
  {
    id: 'hypotension_shock',
    label: 'Sistolik KB <100 mmHg, Hipovolemi, Sepsis veya Hemodinamik İnstabilite',
    sublabel: 'Parenteral IV metamizol ani vazodilatatör şok / kollaps tetikler — IV’den kaçın!',
    severity: 'high',
  },
  {
    id: 'mtx_chemo',
    label: 'Eşzamanlı Metotreksat (Özellikle Yaşlı / Yüksek Doz) veya Kemoterapi',
    sublabel: 'Aditif hematotoksisite (pansitopeni / agranülositoz) — kombinasyondan kaçın!',
    severity: 'high',
  },
  {
    id: 'aspirin_low',
    label: 'Kardiyoprotektif Düşük Doz Aspirin (81–100 mg/gün)',
    sublabel: '4-MAA COX-1 yarışması → Aspirin antiagregan etkisini BOZAR! (Aspirin’den ≥30 dk SONRA ver)',
    severity: 'high',
  },
  {
    id: 'cyp_substrates',
    label: 'Siklosporin, Takrolimus, Bupropion, Valproat, Metadon, Efavirenz, Sertralin',
    sublabel: 'Çok günlük metamizol CYP2B6 & CYP3A4 İNDÜKLER → ilaç düzeyleri belirgin DÜŞER (EMA)!',
    severity: 'moderate',
  },
  {
    id: 'chlorpromazine',
    label: 'Klorpromazin (Fenotiyazin) Eşzamanlı Kullanımı',
    sublabel: 'Şiddetli HİPOTERMİ riski (santral termoregülasyon etkileşimi)!',
    severity: 'moderate',
  },
  {
    id: 'renal_hepatic',
    label: 'Orta/Ağır KBY (eGFR <50) veya Karaciğer Yetmezliği (Child-Pugh B–C)',
    sublabel: '4-MAA yarı ömrü 2–3× uzar → tekrarlayan yüksek dozlardan kaçın (≤1–2 g/gün)!',
    severity: 'moderate',
  },
];

interface AgranSymptom {
  id: string;
  label: string;
  sublabel: string;
  category: 'agran' | 'dili' | 'scar';
}

const AGRAN_SYMPTOMS: AgranSymptom[] = [
  {
    id: 'fever_chills',
    label: 'Açıklanamayan Yeni Ateş, Üşüme veya Titreme',
    sublabel: 'Antipiretik etki nedeniyle ateş ilk başta maskelenebilir — düşmeyen/yeni ateş kırmızı bayraktır!',
    category: 'agran',
  },
  {
    id: 'sore_throat',
    label: 'Boğaz Ağrısı, Yutma Güçlüğü (Odinofaji) veya Tonsillit/Farenjit',
    sublabel: 'Klasik metamizol agranülositozunun en sık başvuru semptomlarından biridir.',
    category: 'agran',
  },
  {
    id: 'mucosal_ulcers',
    label: 'Oral, Nazal, Faringeal, Genital veya Anal Ağrılı Mukozal Ülser / Stomatit',
    sublabel: 'Nötropenik mukozit bulgusu — derhal metamizolü kes ve acil hemogram al!',
    category: 'agran',
  },
  {
    id: 'jaundice_dili',
    label: 'Sarılık, Koyu İdrar, Sağ Üst Kadran Ağrısı, Kaşıntı veya Açıklanamayan Halsizlik',
    sublabel: 'EMA 2020 DILI (İlaca Bağlı Karaciğer Hasarı) kırmızı bayrağı — acil AST/ALT/Bil!',
    category: 'dili',
  },
  {
    id: 'scar_rash',
    label: 'Yaygın Hedef Plaklar, Ağrılı Deri Döküntüsü, Bül veya Mukozal Soyulma',
    sublabel: 'SJS / TEN / DRESS (Ağır Kutanöz İlaç Reaksiyonu) — derhal ve kalıcı olarak kes!',
    category: 'scar',
  },
];

export const MetamizoleProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('adult_iv');

  // Tab 1: Erişkin IV / PO & İnfüzyon Güvenliği
  const [adultInd, setAdultInd] = useState<AdultIndication>('periop_pain');
  const [adultRoute, setAdultRoute] = useState<AdultRoute>('iv_infusion');
  const [adultSingleMg, setAdultSingleMg] = useState<number>(1000);
  const [adultIntervalH, setAdultIntervalH] = useState<number>(6);
  const [diluentMl, setDiluentMl] = useState<number>(100);
  const [infusionMin, setInfusionMin] = useState<number>(20);
  const [adultWeightKg, setAdultWeightKg] = useState<number>(75);

  // Tab 2: Pediatrik Doz (≥3 ay / ≥5 kg · IV ≥1 yaş / ≥9 kg)
  const [pedAgeMonths, setPedAgeMonths] = useState<number>(48);
  const [pedWeightKg, setPedWeightKg] = useState<number>(16);
  const [pedDoseMgKg, setPedDoseMgKg] = useState<number>(10);

  // Tab 3: Agranülositoz & DILI Triyaj
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [hasAncResult, setHasAncResult] = useState<boolean>(false);
  const [ancValue, setAncValue] = useState<number>(1800);

  // Tab 4: Güvenlik & Etkileşim Denetleyici
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useMonographAccordion('mtm-moa', false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavSections = [
    { id: 'mtm-high-alert', label: 'Yüksek Uyarı' },
    { id: 'mtm-moa', label: 'Mekanizma & ADME' },
    { id: 'mtm-contra', label: 'Kontrendikasyonlar' },
    { id: 'mtm-indications', label: 'Endikasyonlar' },
    { id: 'mtm-calc', label: 'Hesaplayıcı' },
    { id: 'mtm-tr', label: 'TR Formlar' },
    { id: 'mtm-compat', label: 'Uyumluluk' },
    { id: 'mtm-organ', label: 'Organ Yetmezliği' },
    { id: 'mtm-special', label: 'Geriatri & Obezite' },
    { id: 'mtm-preg', label: 'Gebelik & Laktasyon' },
    { id: 'mtm-adr', label: 'Yan Etkiler' },
    { id: 'mtm-cautions', label: 'Klinik Dikkat' },
    { id: 'mtm-pd', label: 'Derin Farmakodinami' },
    { id: 'mtm-refs', label: 'Etkileşim & Kaynak' },
  ];

  // --- HESAPLAMALAR ---
  // Tab 1: Erişkin
  const ampouleVolMl = Number((adultSingleMg / 500).toFixed(2)); // Novalgin 1 g / 2 mL = 500 mg/mL
  const dosesPerDay = Math.floor(24 / adultIntervalH);
  const dailyTotalMg = adultSingleMg * dosesPerDay;
  const exceedsDailyMax4000 = dailyTotalMg > 4000;
  const totalBagMl = diluentMl + ampouleVolMl;
  const infRateMlHr = Number(((totalBagMl / Math.max(15, infusionMin)) * 60).toFixed(0));
  const slowBolusMinMinutes = Number((adultSingleMg / 500).toFixed(1)); // Maks 500 mg/dk = 1 mL/dk
  const poTabletsCount = Number((adultSingleMg / 500).toFixed(1));
  const poDropsCount = Math.round(adultSingleMg / 25); // 500 mg/mL · 20 damla/mL → 25 mg/damla

  const adultIndMeta: Record<
    AdultIndication,
    { label: string; guidance: string; recSingle: number; recInterval: number }
  > = {
    periop_pain: {
      label: 'Perioperatif Multimodal Analjezi',
      guidance:
        'PROSPECT / DGAI multimodal strateji: Opioid-tasarruflu temel analjezik (Parasetamol ile kombine edilebilir; GİS/böbrek profili klasik NSAİİ’den daha güvenli). Cerrahi bitiminden ~20–30 dk önce 1 g IV yavaş infüzyon (15–30 dk) standarttır.',
      recSingle: 1000,
      recInterval: 6,
    },
    colic_spasm: {
      label: 'Renal / Biliyer Kolik & Visseral Spazm',
      guidance:
        'Klasik NSAİİ ve parasetamolden ayıran güçlü spazmolitik etki! Akut renal/biliyer kolikte 1000 mg IV yavaş infüzyon (15–30 dk, 50–100 mL SF içinde) üreter/safra yolu düz kas spazmını çözer; supin KB izlemi şarttır.',
      recSingle: 1000,
      recInterval: 6,
    },
    refractory_fever: {
      label: 'Dirençli Yüksek Ateş (Diğerlerine Yanıtsız)',
      guidance:
        'EMA endikasyon kuralı: Sadece Parasetamol/İbuprofen veya fiziksel soğutmaya yanıt vermeyen yüksek ateşte! Ateşli/dehidrate/septik hastada ani vazodilatatör hipotansiyon riski ÇOK YÜKSEKTİR — 500 mg ile başlamayı ve ≥20–30 dk yavaş infüzyonu tercih edin.',
      recSingle: 500,
      recInterval: 6,
    },
    severe_acute: {
      label: 'Şiddetli Akut / Kanser Ağrısı (Opioid Ek)',
      guidance:
        'WHO basamak sisteminde opioidlere güçlü non-opioid adjuvan (500–1000 mg q6–8sa, maks 4000 mg/gün). Uzun süreli kullanımda hastaya agranülositoz uyarı semptomları (ateş, boğaz ağrısı, mukozal ülser) mutlaka yazılı/sözlü anlatılmalıdır!',
      recSingle: 1000,
      recInterval: 6,
    },
  };

  // Tab 2: Pediatrik (EMA 2018: ≥3 ay ve ≥5 kg; IV ≥1 yaş ve ≥9 kg)
  const pedContraindicatedAll = pedAgeMonths < 3 || pedWeightKg < 5;
  const pedIvContraindicated = pedAgeMonths < 12 || pedWeightKg < 9;
  const pedRawSingleMg = Math.round(pedWeightKg * pedDoseMgKg);
  const pedSingleMg = Math.min(1000, pedRawSingleMg);
  const pedDailyMaxMg = Math.min(4000, pedSingleMg * 4);
  const pedDropsCount = Math.round(pedSingleMg / 25); // 500 mg/mL = 25 mg/damla
  const pedDropsMl = Number((pedSingleMg / 500).toFixed(2));
  const pedSyrupMl = Number((pedSingleMg / 50).toFixed(1)); // 250 mg / 5 mL = 50 mg/mL
  const pedIvAmpouleMl = Number((pedSingleMg / 500).toFixed(2)); // 500 mg/mL ampul
  const pedIvBagMl = pedWeightKg < 20 ? 25 : 50;
  const pedIvRateMlHr = Math.round(((pedIvBagMl + pedIvAmpouleMl) / 20) * 60); // 20 dk infüzyon

  // Tab 3: Agranülositoz / DILI / SCAR Triyaj
  const hasAgranSymptom = selectedSymptoms.some((id) =>
    AGRAN_SYMPTOMS.find((s) => s.id === id && s.category === 'agran')
  );
  const hasDiliSymptom = selectedSymptoms.includes('jaundice_dili');
  const hasScarSymptom = selectedSymptoms.includes('scar_rash');
  const severeAgranAnc = hasAncResult && ancValue < 500;
  const moderateNeutropeniaAnc = hasAncResult && ancValue >= 500 && ancValue < 1500;
  const anyTriageRedFlag =
    hasAgranSymptom || hasDiliSymptom || hasScarSymptom || severeAgranAnc || moderateNeutropeniaAnc;

  // Tab 4: Güvenlik Denetleyici
  const hasContraindicated = selectedRisks.some(
    (id) => SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'contraindicated'
  );
  const hasHighRisk = selectedRisks.some(
    (id) => SAFETY_FACTORS.find((f) => f.id === id)?.severity === 'high'
  );
  const hasAspirinConflict = selectedRisks.includes('aspirin_low');
  const hasCypInduction = selectedRisks.includes('cyp_substrates');
  const hasHypotensionRisk = selectedRisks.includes('hypotension_shock');
  const hasMtxRisk = selectedRisks.includes('mtx_chemo');
  const hasChlorpromazineRisk = selectedRisks.includes('chlorpromazine');

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleRisk = (id: string) => {
    setSelectedRisks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'adult_iv') {
      if (adultRoute === 'iv_infusion') {
        return `METAMİZOL SODYUM IV İNFÜZYON ORDER (${adultIndMeta[adultInd].label}): ${adultSingleMg} mg (${ampouleVolMl} mL [500 mg/mL ampul]) + ${diluentMl} mL %0,9 NaCl / %5 Dekstroz içinde → ${infusionMin} dk yavaş IV infüzyon (~${infRateMlHr} mL/sa), q${adultIntervalH}sa (Toplam ${dailyTotalMg} mg/gün; EMA tavan 4000 mg/gün). SUPİN POZİSYONDA KB İZLEMİ! Hızlı IV puşe YAPMA!`;
      }
      if (adultRoute === 'iv_slow_bolus') {
        return `METAMİZOL SODYUM YAVAŞ IV ENJEKSİYON: ${adultSingleMg} mg (${ampouleVolMl} mL) — HIZ ≤500 mg/dk (≤1 mL/dk; minimum ${slowBolusMinMinutes} dakika boyunca!), supin pozisyon & yakın KB/NB izlemiyle (tercihen 50–100 mL SF içinde 15–30 dk infüzyon önerilir!). q${adultIntervalH}sa (Günlük ${dailyTotalMg} mg).`;
      }
      return `METAMİZOL SODYUM PO ORDER: ${adultSingleMg} mg (${poTabletsCount} adet 500 mg tablet veya ${poDropsCount} damla [500 mg/mL]), q${adultIntervalH}sa (Günlük ${dailyTotalMg} mg, maks 4000 mg/gün). Düşük doz Aspirin alıyorsa Aspirin'den ≥30 dk SONRA verin!`;
    }
    if (activeTab === 'pediatric') {
      if (pedContraindicatedAll) {
        return `METAMİZOL PEDİATRİK UYARI: ${pedAgeMonths} ay / ${pedWeightKg} kg → <3 ay veya <5 kg bebeklerde KONTRENDİKEDİR! Parasetamol tercih edin.`;
      }
      if (pedIvContraindicated) {
        return `METAMİZOL PEDİATRİK PO (${pedAgeMonths} ay / ${pedWeightKg} kg · ${pedDoseMgKg} mg/kg): ${pedSingleMg} mg PO q6–8sa (Maks 4 doz = ${pedDailyMaxMg} mg/gün). Damla (500 mg/mL = 25 mg/damla): ${pedDropsCount} damla (${pedDropsMl} mL) | Şurup (250 mg/5 mL): ${pedSyrupMl} mL. DİKKAT: <1 yaş (<9 kg) IV UYGULAMA KONTRENDİKEDİR!`;
      }
      return `METAMİZOL PEDİATRİK (${pedAgeMonths} ay / ${pedWeightKg} kg · ${pedDoseMgKg} mg/kg): ${pedSingleMg} mg q6–8sa (Maks 4 doz = ${pedDailyMaxMg} mg/gün). PO Damla (25 mg/damla): ${pedDropsCount} damla | Şurup (50 mg/mL): ${pedSyrupMl} mL | IV: 500 mg/mL ampulden ${pedIvAmpouleMl} mL çekilip ${pedIvBagMl} mL SF içinde ≥20 dk yavaş infüzyon (~${pedIvRateMlHr} mL/sa), KB izlemiyle!`;
    }
    if (activeTab === 'agranulocytosis') {
      return anyTriageRedFlag
        ? `ACİL METAMİZOL TOKSİSİTE EYLEMİ: Metamizol DERHAL KESİLDİ! Acil tam kan sayımı (ANC), AST/ALT/Bil istendi. ${severeAgranAnc ? 'ANC <500/µL (Ağır Agranülositoz) → Febril nötropeni protokolü, geniş spektrumlu IV antibiyotik, hematoloji konsültasyonu ve G-CSF (Filgrastim) değerlendirmesi! ÖMÜR BOYU METAMİZOL ALERJİ KARTI.' : 'Sonuç çıkana kadar tekrar doz VERME!'}`
        : `METAMİZOL GÜVENLİK İZLEMİ: Aktif agranülositoz/DILI/SCAR bulgusu yok. Hastaya açıklanamayan ateş, boğaz ağrısı veya ağız/mukozal ülser gelişirse ilacı hemen kesip acil hemogram yaptırması (EMA PRAC 2024) hatırlatıldı.`;
    }
    return hasContraindicated
      ? `METAMİZOL GÜVENLİK DENETİMİ: MUTLAK KONTRENDİKASYON MEVCUT — Metamizol KULLANMA! (Alternatif: Parasetamol / rejyonel blok / opioid)`
      : `METAMİZOL GÜVENLİK DENETİMİ: Seçili risk sayısı ${selectedRisks.length}. ${hasHypotensionRisk ? 'Hipotansiyon riski → IV bolustan kaçın! ' : ''}${hasAspirinConflict ? "Aspirin'den ≥30 dk SONRA uygula! " : ''}${hasCypInduction ? 'CYP2B6/3A4 indüksiyonu (siklosporin/takrolimus/bupropion/valproat düzeyini izle)! ' : ''}Yavaş IV infüzyon (≥15–30 dk) + agranülositoz eğitimi.`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavSections} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="mtm-high-alert"
        defaultOpen={false}
        tallManName="METAMIZOL / DIPIRON (IV ≥15–30 dk · HIZLI PUŞE YASAK!)"
        confusionRiskWith="Novalgin® 1 g/2 mL vs 2,5 g/5 mL (500 mg/mL) Ampul · Oral Damla (25 mg/damla!)"
        criticalAlerts={[
          'HIZLI IV PUŞE = ŞİDDETLİ HİPOTANSİYON / ŞOK TUZAĞI: Novalgin® ampul (1 g / 2 mL = 500 mg/mL) ASLA hızlı IV puşe yapılmaz! Direkt IV hız kesinlikle ≤500 mg/dk (≤1 mL/dk) olmalıdır; en güvenli yöntem 1 g’ı 50–100 mL %0,9 NaCl/%5 Dekstroz içinde 15–30 dk yavaş infüze etmektir. Hasta supin pozisyonda ve KB/NB monitörize olmalıdır — özellikle hipovolemik, ateşli, septik veya SKB <100 mmHg hastada ani vazodilatatör şok gelişebilir!',
          'EMA PRAC 2024 AGRANÜLOSİTOZ UYARISI — DOZDAN & SÜREDEN BAĞIMSIZ: Ölümcül olabilen agranülositoz (ANC <500/µL) tedavinin HERHANGİ BİR ANINDA (tek doz sonrası, haftalar sonra veya ilaç kesildikten kısa süre sonra!) ve daha önce sorunsuz kullananlarda bile gelişebilir. Rutin asemptomatik tam kan taraması koruyucu değildir; açıklanamayan ateş, boğaz ağrısı veya oral/genital ağrılı ülser çıkarsa ilacı DERHAL kesip acil hemogram (ANC) alın!',
          'GEBELİK 3. TRİMESTER, <3 AY (<5 kg) & <1 YAŞTA IV KONTRENDİKE: EMA 2018 harmonizasyonu: 3. trimesterde fetal duktus arteriozus kapanması & oligohidramnioz nedeniyle MUTLAK KONTRENDİKE! <3 ay veya <5 kg bebeklerde tüm yollar yasak; 3–11 ay (<9 kg) bebeklerde IV uygulama ağır şok riski nedeniyle KONTRENDİKEDİR (sadece PO damla/şurup)!',
          'DÜŞÜK DOZ ASPİRİN COX-1 YARIŞMASI & CYP2B6 / CYP3A4 İNDÜKSİYONU: Aktif metabolit 4-MAA, trombosit COX-1’i geri dönüşlü kapatarak düşük doz Aspirin’in antiagregan etkisini BOZAR — Metamizolü mutlaka Aspirin’den ≥30 dk SONRA verin! Ayrıca çok günlük kullanımda CYP2B6/CYP3A4 indüksiyonu ile Siklosporin, Takrolimus, Bupropion, Valproat ve Metadon düzeylerini düşürür!',
        ]}
        antidoteOrRescue="Spesifik kimyasal antidotu yoktur. (1) Anafilaksi / Şiddetli Hipotansiyonda: İnfüzyonu DERHAL durdur, hasta Trendelenburg/supin, izotonik sıvı bolusu, anafilakside IM/IV Adrenalin + oksijen + H1/H2 blokör + steroid; (2) Agranülositozda (ANC <500/µL): İlacı derhal kes, acil geniş spektrumlu antipsödomonal IV antibiyotik + Hematoloji + G-CSF (Filgrastim); (3) Masif oral aşırı dozda: İlk 1–2 saatte aktif kömür; 4-MAA orta protein bağlı (~%58) olduğundan ağır toksisitede hemodiyalizle uzaklaştırılabilir!"
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Pirazolon Non-Opioid Analjezik · Antipiretik · Spazmolitik
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Novalgin® / Andolor® 1 g / 2 mL IV · 500 mg Tb · 500 mg/mL Damla
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                EMA 2018 & PRAC 2024 Uyumlu
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Metamizol Sodyum / Dipiron{' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Novalgin® · Andolor® · Adepiron® · Devaljin®)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Türkiye ve Avrupa (Almanya/Avusturya/İspanya) perioperatif pratiğinde opioid-tasarruflu multimodal
              analjezinin, renal/biliyer kolik spazmolizinin ve dirençli yüksek ateşin en güçlü non-opioid
              temel taşlarından biridir. Klasik NSAİİ’lere kıyasla{' '}
              <strong>GİS ülser/kanama ve perioperatif akut böbrek hasarı riski belirgin düşüktür</strong>;
              ancak <strong>hızlı IV hipotansiyon/anafilaktoid şok</strong>, nadir fakat ölümcül{' '}
              <strong>agranülositoz (EMA PRAC 2024)</strong> ve <strong>ilaca bağlı karaciğer hasarı (DILI)</strong>{' '}
              nedeniyle sıkı uygulama protokolü ve hasta eğitimi gerektirir.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: N02BB02 · Ön-İlaç → 4-MAA · Maks 4 g/gün
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              Erişkin IV / PO Standart
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              500–1000 mg q6–8sa
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              EMA Tavan: 4000 mg/gün (IV ≥15–30 dk!)
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              Pediatri (≥3 Ay / ≥5 kg)
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              8–16 mg/kg q6–8sa
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              &lt;1 yaş IV YASAK · Damla: 25 mg/damla!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Ayırt Edici Klinik Avantaj
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              Spazmolitik + Düşük GİS
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Renal/biliyer kolik & visseral ağrı 1. seçim
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Kritik Güvenlik Çizgisi
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              Agranülositoz · DILI · KB
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Ateş/boğaz ağrısı/ülser → DERHAL KES & CBC!
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="mtm-moa"
          sectionTitle="Etki Mekanizması: 4-MAA Ön-İlaç Hidrolizi, Endokannabinoid CB1 & Spazmoliz"
          summary="Metamizol biyolojik olarak inaktif bir ön-ilaçtır; ağızdan veya IV verildikten dakikalar içinde non-enzimatik hidrolizle aktif 4-metilaminoantipirine (4-MAA) dönüşür. Santral ve periferik COX peroksidaz inhibisyonu, FAAH aracılı CB1 reseptör aktivasyonu, TRPA1 blokajı ve düz kas spazmolizi ile çoklu yoldan güçlü analjezi ve antipirezi sağlar."
          pillars={[
            {
              title: '1. Santral COX Peroksidaz İnhibisyonu & Hipotalamik Antipirezi',
              detail:
                '4-MAA ve 4-AA kan-beyin bariyerini hızla geçerek spinal ve hipotalamik PGE₂ sentezini baskılar (IV başlangıç 5–15 dk, pik 30–60 dk; PO 30–60 dk). Periferik enflamasyon dokusunda birikmediği için belirgin antiinflamatuar etkisi yoktur ve gastrik mukozayı klasik NSAİİ’ler kadar tahriş etmez.',
            },
            {
              title: '2. Endokannabinoid CB1 Aktivasyonu, TRPA1 Blokajı & İnen İnhibisyon',
              detail:
                'Beyinde FAAH enzimiyle oluşan araşidonoil-4-MAA/4-AA konjugatları CB1 reseptörlerini aktive eder; ayrıca nosiseptif TRPA1 iyon kanallarını inhibe ederek ve PAG–RVM inen serotonerjik/opioiderjik yolakları güçlendirerek güçlü santral analjezi yaratır.',
            },
            {
              title: '3. Düz Kas Spazmolizi (Renal / Biliyer Kolik & Visseral Ağrı Avantajı)',
              detail:
                'Düz kas hücrelerinde hücre içi Ca²⁺ mobilizasyonunu baskılayıp ATP-duyarlı K⁺ (K_ATP) kanallarını aktive ederek üreter, safra yolları ve mesane/GİS düz kaslarında belirgin spazmolitik gevşeme sağlar (Parasetamolden ayıran temel fark!).',
            },
          ]}
        />

        {/* Genişletilebilir ADME & Metabolizma Detayları */}
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
                Detaylı Farmakokinetik (ADME): 4-MAA / 4-AA Metabolit Kaskadı, NAT2 Polimorfizmi & Diyalizlenebilirlik
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
                  A — Absorpsiyon & Ön-İlaç Hidrolizi
                </div>
                Oral alımda mide suyunda hızla non-enzimatik hidrolizle <strong>4-metilaminoantipirine (4-MAA)</strong>{' '}
                dönüşür; 4-MAA’nın oral biyoyararlanımı <strong>~%85</strong>’tir (IM ile benzer; IV’de plazmada dakikalar
                içinde 4-MAA’ya hidrolize olur). Gıdalar pik konsantrasyonu hafif geciktirse de toplam emilimi (AUC)
                klinik olarak anlamlı azaltmaz.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — Dağılım & Protein Bağlanması (Diyalizlenebilir!)
                </div>
                Klasik NSAİİ’lerden (ibuprofen %99) farklı olarak plazma protein bağlanması orta düzeydedir:{' '}
                <strong>4-MAA ~%58</strong>, <strong>4-AA ~%48</strong>, 4-FAA ~%18, 4-AAA ~%14. Bu sayede BOS’a
                iyi geçer, plasentayı ve anne sütünü kolayca aşar ve <strong>hemodiyalizle temizlenebilir</strong>.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M — Hepatik Metabolizma (CYP2B6/2C19/3A4 & NAT2)
                </div>
                4-MAA karaciğerde demetilasyonla ikinci aktif metabolit <strong>4-aminoantipirine (4-AA)</strong>{' '}
                veya oksidasyonla inaktif <strong>4-formilaminoantipirine (4-FAA)</strong> çevrilir. 4-AA ise polimorfik{' '}
                <strong>N-asetiltransferaz 2 (NAT2)</strong> ile inaktif <strong>4-asetilaminoantipirine (4-AAA)</strong>{' '}
                dönüşür. Çok günlük metamizol <strong>CYP2B6 ve CYP3A4’ü indükler</strong>!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  E — Eliminasyon & Rubazonik Asit (Kırmızı İdrar)
                </div>
                Dozun <strong>~%90’ı metabolitler halinde idrarla</strong>, ~%10’u feçesle atılır. Yaşlılarda ve
                sirozda 4-MAA yarı ömrü 2–3 kat uzar (sirozda ~10 saat!). Yüksek dozlarda zararsız metabolit olan{' '}
                <strong>rubazonik asit</strong> asidik idrarı kırmızıya boyayabilir — hematüri sanılmamalıdır!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!) */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="mtm-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Metamizol, diğer pirazolon/pirazolidinler (fenazon, propifenazon, fenilbutazon) veya yardımcı maddelere aşırı duyarlılık öyküsü.',
          'Geçmişte metamizol veya başka bir pirazolon ile gelişmiş AGRANÜLOSİTOZ öyküsü (Ömür boyu kesin yasak!).',
          'Bozulmuş kemik iliği fonksiyonu (örn. sitostatik kemoterapi sonrası) veya hematopoetik sistem hastalıkları / mevcut nötropeni.',
          'Analjezik astım sendromu (AERD / Samter) veya NSAİİ/parasetamol/salisilatlarla bronkospazm, ürtiker, anjiyoödem öyküsü.',
          'Gebeliğin 3. trimesteri (≥28–30. hafta — fetal duktus arteriozus kapanması & oligohidramnioz; EMA 2018).',
          'Konjenital G6PD eksikliği (hemolitik anemi riski) veya Akut İntermittan Hepatik Porfiri (porfiri atağı riski).',
          '<3 ay veya <5 kg bebeklerde TÜM uygulama yolları; <1 yaş (<9 kg) bebeklerde IV uygulama (EMA 2018).',
          'Parenteral (IV/IM) form: Mevcut hipotansiyon (SKB <100 mmHg) veya instabil dolaşım (şok/ağır hipovolemi — stabilizasyon öncesi).',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Dikkat Edilecek Durumlar"
        relativeItems={[
          'Önceden metamizol ile açıklanamayan karaciğer hasarı (DILI) öyküsü → yeniden maruziyet hızla ağır hepatit tetikler, KAÇININ!',
          'Gebelik 1. ve 2. trimester (veriler kısıtlı; sadece alternatifsiz ve kesin yarar-zarar dengesinde) ve emzirme (tek doz sonrası 48 sa süt atılmalı; tekrarlı kullanım yasak).',
          'Bronşiyal astım (özellikle nazal polip/kronik rinosinüzit eşlik ediyorsa), kronik ürtiker veya alkol intoleransı (anafilaktoid şok riski artar).',
          'Orta/ağır böbrek yetmezliği (eGFR <50) veya Child-Pugh B–C karaciğer yetmezliği (tekrarlayan yüksek dozlardan kaçının).',
          'Düşük doz kardiyoprotektif Aspirin kullanan AKS / koroner stent hastaları (Aspirin’den ≥30 dk sonra verilmezse antiplatelet etki bloke olur).',
          'Eşzamanlı Metotreksat kullanımı (özellikle yaşlılarda aditif hematotoksisite riski) veya Klorpromazin (ciddi hipotermi).',
        ]}
        clinicalNote="Nöraksiyel Blok / ASRA Notu: Klinik dozlarda tek başına metamizol kanama zamanını anlamlı uzatmaz; spinal/epidural blok yerleşimi veya kateter çekilmesi için ek kontrendikasyon oluşturmaz (ancak koagülopatide IM enjeksiyondan kaçının!)."
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="mtm-indications"
        title="Klinik Endikasyonlar & Kanıta Dayalı Doz Rejimleri (EMA 2018 / PROSPECT / DGAI)"
        subtitle="EMA endikasyon ilkesi: Şiddetli akut/kronik ağrı, kolik ağrısı ve diğer tedavilere yanıt vermeyen yüksek ateş"
        icon={<BookOpen className="w-5 h-5 text-teal-500 shrink-0" />}
        defaultOpen={false}
      >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  1. Perioperatif Multimodal Analjezi (ERAS / PROSPECT)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  1 g IV q6–8sa
                </span>
              </div>
              <p className={mutedText}>
                Cerrahi bitiminden ~20–30 dk önce <strong>1000 mg IV</strong> (50–100 mL SF/%5D içinde 15–30 dk yavaş
                infüzyon), postop <strong>500–1000 mg IV/PO q6–8sa</strong> (maks <strong>4000 mg/gün</strong>).
                Parasetamol ile sinerjik kombine edilebilir; opioid tüketimini ve PONV’yi belirgin azaltır (Cochrane
                NNT ~2,3–2,4!). Klasik NSAİİ kontrendike olan peptik ülser veya sınırda renal riskli birçok olguda
                değerli alternatiftir.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  2. Renal / Biliyer Kolik & Visseral Spazm (Spazmolitik)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  1 g Yavaş IV
                </span>
              </div>
              <p className={mutedText}>
                Düz kas spazmolitik etkisi nedeniyle akut <strong>üreter taş koliği</strong>, <strong>biliyer kolik</strong>{' '}
                ve postoperatif mesane/abdominal kramp ağrılarında parasetamolden üstün, klasik NSAİİ’ler kadar etkili ve
                obstrüktif nefropatide böbreğe daha dost bir seçenektir. <strong>1000 mg IV</strong> 15–30 dk yavaş
                infüzyonla verilir; 30 dk sonra yanıt yetersizse ek 500–1000 mg yerine multimodal opioid/alfa-bloker eklenir.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  3. Dirençli Yüksek Ateş (Diğer Önlemlere Yanıtsız)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  500–1000 mg
                </span>
              </div>
              <p className={mutedText}>
                EMA onaylı kullanım: Parasetamol, NSAİİ veya fiziksel soğutma ile düşmeyen yüksek ateşte{' '}
                <strong>500 mg</strong> (çoğunlukla yeterlidir!) veya <strong>1000 mg PO/yavaş IV</strong>.{' '}
                <strong>YBÜ / Septik Hasta Uyarısı:</strong> Ateşli ve vazoplejik hastada hızlı IV uygulama şiddetli
                hipotansiyon ve ani terleme/taşikardi tetikler — daima <strong>500 mg ile başla</strong> ve ≥20–30 dk
                infüze et!
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. Pediatri (≥3 Ay / ≥5 kg) & Kanser / Palyatif Ağrı
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  8–16 mg/kg
                </span>
              </div>
              <p className={mutedText}>
                <strong>Pediatri (EMA 2018):</strong> <strong>8–16 mg/kg/doz</strong> (q6–8sa, maks 4 doz/gün).{' '}
                <strong>&lt;3 ay (&lt;5 kg) YASAK; 3–11 ay (&lt;9 kg) sadece PO damla/şurup (IV YASAK!).</strong>{' '}
                <strong>Palyatif / Kanser Ağrısı:</strong> WHO Basamak 1–3’te opioidlerle kombine{' '}
                <strong>500–1000 mg q6sa</strong> (maks 4 g/gün); kronik kullanımda hastaya/yakınına agranülositoz
                belirti eğitimi (ateş, boğaz ağrısı, aft) zorunludur!
              </p>
            </div>
          </div>
      </MonographAccordionSection>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="mtm-calc"
        title="Metamizol Akıllı Doz, İnfüzyon & Agranülositoz Triyaj Hesaplayıcısı"
        subtitle="TR Novalgin® 1 g / 2 mL (500 mg/mL) ampul, 25 mg/damla oral damla ve EMA PRAC 2024 güvenlik kuralları"
        icon={
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <Syringe className="w-5 h-5" />
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

          {/* Sekme Seçici */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
            {[
              { id: 'adult_iv' as CalcTab, label: '1. Erişkin IV / PO', icon: Syringe },
              { id: 'pediatric' as CalcTab, label: '2. Pediatri (≥3 Ay)', icon: Baby },
              { id: 'agranulocytosis' as CalcTab, label: '3. Agranülositoz Triyaj', icon: ShieldAlert },
              { id: 'safety_audit' as CalcTab, label: '4. Güvenlik & Etkileşim', icon: HeartPulse },
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

          {/* TAB 1: ERİŞKİN IV / PO */}
          {activeTab === 'adult_iv' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold mb-1.5">Klinik Senaryo</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(adultIndMeta) as AdultIndication[]).map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setAdultInd(key);
                            setAdultSingleMg(adultIndMeta[key].recSingle);
                            setAdultIntervalH(adultIndMeta[key].recInterval);
                          }}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                            adultInd === key
                              ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                              : isDark
                                ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {adultIndMeta[key].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5">Uygulama Yolu</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'iv_infusion' as AdultRoute, label: 'IV İnfüzyon (Önerilen)' },
                        { id: 'iv_slow_bolus' as AdultRoute, label: 'Yavaş IV (≤1 mL/dk)' },
                        { id: 'po_oral' as AdultRoute, label: 'PO (Tb / Damla)' },
                      ].map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setAdultRoute(r.id)}
                          className={`px-2.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                            adultRoute === r.id
                              ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                              : isDark
                                ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold mb-1.5">Tek Doz (mg)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[500, 1000].map((mg) => (
                          <button
                            key={mg}
                            type="button"
                            onClick={() => setAdultSingleMg(mg)}
                            className={`py-2 rounded-xl border text-xs font-black ${
                              adultSingleMg === mg
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : isDark
                                  ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                  : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            {mg} mg
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-1.5">Doz Aralığı</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[6, 8, 12].map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setAdultIntervalH(h)}
                            className={`py-2 rounded-xl border text-xs font-black ${
                              adultIntervalH === h
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : isDark
                                  ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                  : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            q{h}sa
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {adultRoute === 'iv_infusion' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={`${uniqueId}-bag`} className="block text-xs font-bold mb-1.5">
                          Dilüsyon Torbası (SF / %5D)
                        </label>
                        <div id={`${uniqueId}-bag`} className="grid grid-cols-2 gap-2">
                          {[50, 100].map((ml) => (
                            <button
                              key={ml}
                              type="button"
                              onClick={() => setDiluentMl(ml)}
                              className={`py-2 rounded-xl border text-xs font-bold ${
                                diluentMl === ml
                                  ? 'bg-teal-600 text-white border-teal-600'
                                  : isDark
                                    ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                    : 'bg-slate-50 border-slate-200 text-slate-700'
                              }`}
                            >
                              {ml} mL
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label htmlFor={`${uniqueId}-infmin`} className="block text-xs font-bold mb-1.5">
                          İnfüzyon Süresi: <span className="text-teal-600 dark:text-teal-400">{infusionMin} dk</span>
                        </label>
                        <input
                          id={`${uniqueId}-infmin`}
                          type="range"
                          min={15}
                          max={30}
                          step={5}
                          value={infusionMin}
                          onChange={(e) => setInfusionMin(Number(e.target.value))}
                          className="w-full accent-teal-600"
                        />
                        <div className="flex justify-between text-[10px] opacity-70">
                          <span>15 dk (Min)</span>
                          <span>20 dk</span>
                          <span>30 dk (Septik/Yaşlı)</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Çıktı Kartı */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      Hesaplanan Erişkin Order
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        exceedsDailyMax4000
                          ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                          : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      Günlük: {dailyTotalMg} mg / 4000 mg
                    </span>
                  </div>

                  {adultRoute === 'iv_infusion' && (
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className="text-[10px] font-bold uppercase opacity-70">TR Ampul (500 mg/mL)</div>
                        <div className="text-lg font-black text-rose-600 dark:text-rose-400">
                          {ampouleVolMl} mL ({adultSingleMg} mg)
                        </div>
                        <div className="text-[11px] opacity-75">
                          {adultSingleMg === 1000 ? '1 tam Novalgin® 1 g/2 mL ampul' : '½ Novalgin® ampul (1 mL)'}
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className="text-[10px] font-bold uppercase opacity-70">Pompa / İnfüzyon Hızı</div>
                        <div className="text-lg font-black text-teal-600 dark:text-teal-400">
                          ~{infRateMlHr} mL/sa
                        </div>
                        <div className="text-[11px] opacity-75">
                          {diluentMl} mL SF/%5D içinde {infusionMin} dk’da
                        </div>
                      </div>
                    </div>
                  )}

                  {adultRoute === 'iv_slow_bolus' && (
                    <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/30 space-y-1.5 text-xs">
                      <div className="font-black text-amber-800 dark:text-amber-200 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        Yavaş IV Enjeksiyon Kuralı (≤500 mg/dk = ≤1 mL/dk)
                      </div>
                      <p>
                        <strong>{adultSingleMg} mg ({ampouleVolMl} mL)</strong> en az{' '}
                        <strong>{slowBolusMinMinutes} dakika</strong> boyunca, hasta <strong>supin pozisyonda</strong>{' '}
                        ve KB/NB monitörize iken uygulanmalıdır. Hızlı puşe ani vazodilatatör kollaps tetikler — mümkünse{' '}
                        <strong>50–100 mL SF içinde 15–30 dk infüzyonu</strong> tercih edin!
                      </p>
                    </div>
                  )}

                  {adultRoute === 'po_oral' && (
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className="text-[10px] font-bold uppercase opacity-70">Tablet (500 mg)</div>
                        <div className="text-lg font-black text-teal-600 dark:text-teal-400">
                          {poTabletsCount} tablet
                        </div>
                        <div className="text-[11px] opacity-75">Bol su ile q{adultIntervalH}sa</div>
                      </div>
                      <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                        <div className="text-[10px] font-bold uppercase opacity-70">Oral Damla (500 mg/mL)</div>
                        <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                          {poDropsCount} damla ({ampouleVolMl} mL)
                        </div>
                        <div className="text-[11px] opacity-75">1 damla = 25 mg · 20 damla = 1 mL</div>
                      </div>
                    </div>
                  )}

                  <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">Klinik Rehber Notu:</div>
                    <p className={mutedText}>{adultIndMeta[adultInd].guidance}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PEDİATRİK DOZ */}
          {activeTab === 'pediatric' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${uniqueId}-pedage`} className="block text-xs font-bold mb-1">
                        Yaş (Ay): <span className="text-rose-600 dark:text-rose-400">{pedAgeMonths} ay ({(pedAgeMonths / 12).toFixed(1)} yaş)</span>
                      </label>
                      <input
                        id={`${uniqueId}-pedage`}
                        type="number"
                        min={0}
                        max={180}
                        value={pedAgeMonths}
                        onChange={(e) => setPedAgeMonths(Math.max(0, Math.min(180, Number(e.target.value) || 0)))}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                          isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label htmlFor={`${uniqueId}-pedwt`} className="block text-xs font-bold mb-1">
                        Ağırlık (kg): <span className="text-teal-600 dark:text-teal-400">{pedWeightKg} kg</span>
                      </label>
                      <input
                        id={`${uniqueId}-pedwt`}
                        type="number"
                        min={2}
                        max={75}
                        step={0.5}
                        value={pedWeightKg}
                        onChange={(e) => setPedWeightKg(Math.max(2, Math.min(75, Number(e.target.value) || 2)))}
                        className={`w-full px-3 py-2 rounded-xl border text-sm font-bold ${
                          isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${uniqueId}-pedmgkg`} className="block text-xs font-bold mb-1">
                      Hedef Doz (EMA 8–16 mg/kg):{' '}
                      <span className="text-indigo-600 dark:text-indigo-400">{pedDoseMgKg} mg/kg</span>
                    </label>
                    <input
                      id={`${uniqueId}-pedmgkg`}
                      type="range"
                      min={8}
                      max={16}
                      step={1}
                      value={pedDoseMgKg}
                      onChange={(e) => setPedDoseMgKg(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <div className="flex justify-between text-[10px] opacity-70">
                      <span>8 mg/kg (Ateş / Düşük)</span>
                      <span>10–12 mg/kg (Rutin)</span>
                      <span>15–16 mg/kg (Şiddetli Ağrı)</span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border text-xs ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <strong>EMA 2018 Pediatrik Yaş / Ağırlık Sınırları:</strong>
                    <ul className="list-disc pl-4 mt-1 space-y-0.5 opacity-85">
                      <li><strong>&lt;3 ay veya &lt;5 kg:</strong> TÜM formlar KONTRENDİKE (Parasetamol kullanın).</li>
                      <li><strong>3–11 ay (5–8 kg):</strong> IV uygulama KONTRENDİKE! Yalnızca oral damla/şurup (veya kesin endikasyonda derin IM).</li>
                      <li><strong>≥1 yaş (≥9 kg):</strong> PO veya 500 mg/mL ampulden hassas enjektörle çekilip dilüe edilerek ≥15–30 dk yavaş IV infüzyon.</li>
                    </ul>
                  </div>
                </div>

                {/* Pediatri Sonuç */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  {pedContraindicatedAll ? (
                    <div className="p-4 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200 space-y-2">
                      <div className="flex items-center gap-2 font-black text-sm">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        KONTRENDİKE (&lt;3 Ay veya &lt;5 kg)!
                      </div>
                      <p className="text-xs leading-relaxed">
                        3 aydan küçük veya 5 kg altındaki bebeklerde renal metabolit klirensi immatür olduğu ve yeterli
                        güvenlik verisi bulunmadığı için <strong>Metamizol KESİNLİKLE UYGULANMAZ</strong>. İlk seçenek
                        olarak yaşa uygun <strong>Parasetamol</strong> dozunu kullanın.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                          Tek Doz (q6–8sa · Maks 4×/gün)
                        </span>
                        <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                          {pedSingleMg} mg{' '}
                          <span className="text-xs font-semibold opacity-75">
                            (Günlük maks {pedDailyMaxMg} mg)
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <div className="text-[10px] font-bold uppercase opacity-70">TR Damla (500 mg/mL)</div>
                          <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                            {pedDropsCount} damla
                          </div>
                          <div className="text-[11px] opacity-75">
                            ({pedDropsMl} mL · 1 damla = 25 mg!)
                          </div>
                        </div>
                        <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                          <div className="text-[10px] font-bold uppercase opacity-70">TR Şurup (250 mg/5 mL)</div>
                          <div className="text-lg font-black text-teal-600 dark:text-teal-400">
                            {pedSyrupMl} mL
                          </div>
                          <div className="text-[11px] opacity-75">50 mg/mL · 1 ölçek = 5 mL</div>
                        </div>
                      </div>

                      {pedIvContraindicated ? (
                        <div className="p-3 rounded-xl border bg-rose-500/15 border-rose-500/40 text-xs text-rose-800 dark:text-rose-200">
                          <strong>IV YOL KONTRENDİKE (&lt;1 Yaş veya &lt;9 kg):</strong> Ağır hipotansiyon/şok riski
                          nedeniyle bu yaş grubunda IV metamizol uygulanmaz — yalnızca PO damla/şurup kullanın!
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs space-y-1">
                          <div className="font-black text-amber-800 dark:text-amber-200">
                            Pediatrik IV Hazırlama (500 mg/mL Konsantre Ampul — 10× Hata Koruması!):
                          </div>
                          <p>
                            Novalgin® ampulden tüberkülin/1 mL enjektörle tam{' '}
                            <strong>{pedIvAmpouleMl} mL ({pedSingleMg} mg)</strong> çekip{' '}
                            <strong>{pedIvBagMl} mL %0,9 NaCl</strong> içine dilüe edin →{' '}
                            <strong>≥20 dk (~{pedIvRateMlHr} mL/sa)</strong> yavaş infüzyon + KB izlemi!
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AGRANÜLOSİTOZ & DILI TRİYAJ */}
          {activeTab === 'agranulocytosis' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold mb-1">
                    Hastada Aşağıdaki EMA PRAC 2024 Uyarı Bulgularından Herhangi Biri Var mı?
                  </div>
                  {AGRAN_SYMPTOMS.map((sym) => {
                    const checked = selectedSymptoms.includes(sym.id);
                    return (
                      <label
                        key={sym.id}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-xs ${
                          checked
                            ? 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 hover:bg-slate-900'
                              : 'bg-slate-50 border-slate-200 hover:bg-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSymptom(sym.id)}
                          className="mt-0.5 accent-rose-600"
                        />
                        <div>
                          <div className="font-bold">{sym.label}</div>
                          <div className="text-[11px] opacity-80">{sym.sublabel}</div>
                        </div>
                      </label>
                    );
                  })}

                  <div className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasAncResult}
                        onChange={(e) => setHasAncResult(e.target.checked)}
                        className="accent-indigo-600"
                      />
                      Güncel Tam Kan Sayımı (ANC / Mutlak Nötrofil Sayısı) Mevcut
                    </label>
                    {hasAncResult && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span>ANC Değeri:</span>
                          <span
                            className={
                              ancValue < 500
                                ? 'text-rose-600 dark:text-rose-400'
                                : ancValue < 1500
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-emerald-600 dark:text-emerald-400'
                            }
                          >
                            {ancValue} /µL ({(ancValue / 1000).toFixed(2)} ×10⁹/L)
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={4000}
                          step={50}
                          value={ancValue}
                          onChange={(e) => setAncValue(Number(e.target.value))}
                          className="w-full accent-rose-600"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Triyaj Çıktısı */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  {anyTriageRedFlag ? (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100">
                        <div className="flex items-center gap-2 font-black text-sm">
                          <ShieldAlert className="w-5 h-5 shrink-0" />
                          ACİL EYLEM: METAMİZOLÜ DERHAL KES!
                        </div>
                        <p className="text-xs mt-1 leading-relaxed">
                          Laboratuvar sonucunu BEKLEMEDEN metamizolü hemen durdurun! Agranülositoz saatler içinde
                          ölümcül nötropenik sepsise ilerleyebilir.
                        </p>
                      </div>

                      <div className="space-y-2 text-xs leading-relaxed">
                        {(hasAgranSymptom || severeAgranAnc || moderateNeutropeniaAnc) && (
                          <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className="font-black text-rose-600 dark:text-rose-400 mb-1">
                              Agranülositoz Yönetimi (ANC {hasAncResult ? `${ancValue} /µL` : 'Acil İstenmeli'}):
                            </div>
                            <ul className="list-disc pl-4 space-y-1">
                              <li>Acil <strong>Tam Kan Sayımı + Periferik Yayma (ANC)</strong>, CRP, prokalsitonin ve 2 set kan kültürü alın.</li>
                              {severeAgranAnc ? (
                                <>
                                  <li className="font-bold text-rose-600 dark:text-rose-400">
                                    ANC &lt;500/µL (Ağır Agranülositoz): İzolasyon + 1 saat içinde geniş spektrumlu antipsödomonal IV antibiyotik (Piperasilin-Tazobaktam / Sefepim / Meropenem)!
                                  </li>
                                  <li>Acil Hematoloji konsültasyonu ve <strong>G-CSF (Filgrastim 5 mcg/kg/gün SC)</strong> ile nötrofil toparlanmasını hızlandırmayı değerlendirin.</li>
                                </>
                              ) : (
                                <li>ANC &lt;1500/µL çıkarsa hematoloji izlemi başlatın; ateş eşlik ediyorsa febril nötropeni protokolünü geciktirmeyin.</li>
                              )}
                              <li>Kesinleşen agranülositozda hastaya <strong>ÖMÜR BOYU METAMİZOL / PİRAZOLON ALERJİ KARTI</strong> verin!</li>
                            </ul>
                          </div>
                        )}

                        {hasDiliSymptom && (
                          <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className="font-black text-amber-600 dark:text-amber-400 mb-1">
                              EMA 2020 DILI (İlaca Bağlı Karaciğer Hasarı) Şüphesi:
                            </div>
                            <p>
                              Acil <strong>AST, ALT, ALP, GGT, Total/Direkt Bilirubin ve INR</strong> çalışın.
                              Metamizole bağlı DILI immün aracılıdır; yeniden başlanırsa çok daha hızlı ve ağır
                              karaciğer yetmezliği gelişir — bir daha ASLA vermeyin!
                            </p>
                          </div>
                        )}

                        {hasScarSymptom && (
                          <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                            <div className="font-black text-rose-600 dark:text-rose-400 mb-1">
                              SCAR (SJS / TEN / DRESS) Şüphesi:
                            </div>
                            <p>
                              Metamizolü kalıcı olarak kesin, acil Dermatoloji / Yanık-YBÜ konsültasyonu ve sıvı/mukozal
                              destek başlatın; bir daha pirazolon türevi uygulanamaz!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 space-y-2 text-xs">
                      <div className="font-black text-emerald-700 dark:text-emerald-300 text-sm">
                        Aktif Agranülositoz / DILI / SCAR Kırmızı Bayrağı Yok
                      </div>
                      <p className="leading-relaxed">
                        <strong>EMA PRAC 2024 Kuralı:</strong> Asemptomatik kısa süreli hastada rutin profilaktik tam
                        kan taraması önerilmez (ani başlangıçlı olduğu için öngöremez). Bunun yerine{' '}
                        <strong>her taburcu edilen veya çok gün kullanan hastaya</strong> şu 3 uyarıyı mutlaka verin:
                        <em> “Açıklanamayan ateş/titreme, boğaz ağrısı veya ağız/genital bölgede ağrılı yara çıkarsa ilacı hemen kes ve aynı gün kan sayımı yaptır!”</em>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GÜVENLİK & ETKİLEŞİM DENETLEYİCİ */}
          {activeTab === 'safety_audit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {SAFETY_FACTORS.map((factor) => {
                    const checked = selectedRisks.includes(factor.id);
                    const toneBorder =
                      factor.severity === 'contraindicated'
                        ? checked
                          ? 'bg-rose-500/15 border-rose-500'
                          : ''
                        : factor.severity === 'high'
                          ? checked
                            ? 'bg-amber-500/15 border-amber-500'
                            : ''
                          : checked
                            ? 'bg-indigo-500/15 border-indigo-500'
                            : '';
                    return (
                      <label
                        key={factor.id}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                          checked
                            ? toneBorder
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

                {/* Denetim Kararı */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  {hasContraindicated ? (
                    <div className="p-4 rounded-xl border-2 bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100 space-y-1.5">
                      <div className="font-black text-sm flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        MUTLAK KONTRENDİKASYON — METAMİZOL KULLANMA!
                      </div>
                      <p className="text-xs leading-relaxed">
                        Seçili faktörlerden en az biri kesin kontrendikasyondur. Alternatif olarak{' '}
                        <strong>Parasetamol</strong>, <strong>rejyonel sinir bloku</strong> veya titre edilmiş{' '}
                        <strong>opioid</strong> seçin.
                      </p>
                    </div>
                  ) : hasHighRisk ? (
                    <div className="p-4 rounded-xl border-2 bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100 space-y-1.5">
                      <div className="font-black text-sm flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        YÜKSEK RİSK — ÖZEL ÖNLEM VEYA ALTERNATİF GEREKLİ!
                      </div>
                      <p className="text-xs leading-relaxed">
                        Aşağıdaki spesifik güvenlik kurallarını uygulamadan metamizol vermeyin:
                      </p>
                    </div>
                  ) : selectedRisks.length > 0 ? (
                    <div className="p-4 rounded-xl border bg-indigo-500/15 border-indigo-500/40 text-xs space-y-1">
                      <div className="font-black text-sm text-indigo-700 dark:text-indigo-300">
                        ORTA RİSK — DOZ / DÜZEY İZLEMİYLE UYGULANABİLİR
                      </div>
                      <p>Aşağıdaki etkileşim ve doz sınırlarına uyarak kısa süreli kullanabilirsiniz.</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs space-y-1">
                      <div className="font-black text-sm text-emerald-700 dark:text-emerald-300">
                        Standart Güvenlik Profili Uygun
                      </div>
                      <p>
                        IV kullanımda 50–100 mL SF içinde <strong>15–30 dk yavaş infüzyon</strong>, supin KB izlemi ve
                        agranülositoz hasta eğitimi ile güvenle uygulanabilir.
                      </p>
                    </div>
                  )}

                  {/* Özel Etkileşim Kartları */}
                  <div className="space-y-2 text-xs">
                    {hasHypotensionRisk && (
                      <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
                        <strong>Hipotansiyon / Şok Koruması:</strong> Önce volüm ve vazopresör stabilizasyonu sağlayın;
                        IV puşe kesinlikle yapmayın, gerekiyorsa 500 mg’ı ≥30 dk infüze edin veya Parasetamol tercih edin.
                      </div>
                    )}
                    {hasAspirinConflict && (
                      <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
                        <strong>Aspirin Zamanlama Kuralı (Polzin / EMA):</strong> Hızlı salınımlı düşük doz Aspirin
                        içildikten <strong>en az 30 dakika SONRA</strong> Metamizol verin! Enterik kaplı Aspirin’de
                        etkileşim öngörülemez olduğundan AKS/taze koroner stent hastasında mümkünse Parasetamol seçin.
                      </div>
                    )}
                    {hasMtxRisk && (
                      <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
                        <strong>Metotreksat Etkileşimi:</strong> Aditif kemik iliği baskılanması ve ağır nötropeni riski
                        nedeniyle özellikle yaşlılarda ve yüksek doz MTX protokollerinde eşzamanlı kullanımdan KAÇININ!
                      </div>
                    )}
                    {hasCypInduction && (
                      <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
                        <strong>CYP2B6 / CYP3A4 İndüksiyonu (EMA SmPC):</strong> Çok günlük metamizol Siklosporin,
                        Takrolimus, Bupropion, Valproat, Metadon ve Efavirenz kan düzeylerini anlamlı düşürür (greft
                        rejeksiyonu / nöbet / yoksunluk riski!). Terapötik ilaç düzeyi (TDM) izleyin!
                      </div>
                    )}
                    {hasChlorpromazineRisk && (
                      <div className="p-3 rounded-xl border bg-sky-500/10 border-sky-500/30">
                        <strong>Klorpromazin Etkileşimi:</strong> Eşzamanlı kullanımda ciddi santral{' '}
                        <strong>hipotermi</strong> gelişebilir — vücut sıcaklığını yakından izleyin!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
      </MonographAccordionSection>

      {/* 8. TÜRKİYE PİYASA FORMLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="mtm-tr"
        preparations={[
          {
            name: 'Novalgin® / Andolor® / Adepiron® / Devaljin® Ampul (IV / Derin IM)',
            presentation: '1000 mg / 2 mL cam ampul · Ayrıca 2,5 g / 5 mL büyük ampul',
            concentration: '500 mg/mL (Yüksek Konsantrasyon — Hızlı IV Puşe YASAK!)',
            saltOrBaseNote:
              'Ameliyathane ve acil servisteki standart ampul! Tercihen 1000 mg (2 mL) 50–100 mL %0,9 NaCl veya %5 Dekstroz içinde 15–30 dk yavaş IV infüze edilir. 2,5 g / 5 mL büyük ampul varsa 1 g için yalnızca 2 mL çekilir!',
            alertLevel: 'high',
          },
          {
            name: 'Novalgin® / Adepiron® / Devaljin® Tablet',
            presentation: '500 mg film / çentikli oral tablet',
            concentration: '500 mg / tablet',
            saltOrBaseNote:
              'Erişkin PO: 1–2 tablet (500–1000 mg) q6–8sa; maks 8 tablet/gün (4000 mg). Oral biyoyararlanımı ~%85 (4-MAA pik 1–2 sa) olduğundan oral alabilen hastada IV’ye eşdeğer etkinlik sağlar.',
            alertLevel: 'standard',
          },
          {
            name: 'Novalgin® / Andolor® Oral Damla (Pediatri & Disfaji)',
            presentation: '500 mg/mL konsantre oral damla şişesi',
            concentration: '500 mg/mL (20 damla = 1 mL → 1 damla = 25 mg!)',
            saltOrBaseNote:
              'Yüksek konsantrasyon tuzağı! Çocuklarda damla sayısı mutlaka kilo bazlı hesaplanmalıdır (örn. 15 kg çocukta 10 mg/kg = 150 mg = 6 damla!). Şişe tam dik tutularak damlatılır.',
            alertLevel: 'high',
          },
          {
            name: 'Novalgin® Pediatrik Şurup',
            presentation: '250 mg / 5 mL oral süspansiyon (100 mL şişe)',
            concentration: '50 mg/mL (1 ölçek = 5 mL = 250 mg)',
            saltOrBaseNote:
              'Damla formuna göre doz ölçüm hatası daha düşüktür (150 mg = 3 mL). <3 ay (<5 kg) bebeklerde TÜM formlar KONTRENDİKEDİR!',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Erişkin 1000 mg IV (Önerilen): 2 mL (1000 mg) ampul + 50–100 mL %0,9 NaCl veya %5 Dekstroz → 15–30 dk yavaş IV infüzyon (~200–400 mL/sa), hasta supin ve KB izlemli!',
          'Erişkin 500 mg IV (Ateş / Yaşlı / Kırılgan): 1 mL (500 mg) ampul + 50–100 mL SF/D5W → ≥20–30 dk yavaş IV infüzyon.',
          'Pediatrik IV (≥1 Yaş & ≥9 kg): 500 mg/mL ampulden tüberkülin enjektörle hesaplanan 8–16 mg/kg (mL = mg/500) çekilip 25–50 mL SF içinde ≥20 dk yavaş infüze edilir (<1 yaşta IV YASAK!).',
        ]}
        concentrationTrapWarning="500 mg/mL AMPUL & 25 mg/DAMLA ÇİFT TUZAĞI: (1) 1 g/2 mL ampulün hızlı IV puşesi ani vazodilatatör şok/hipotansiyon tetikler — daima 50–100 mL SF içinde 15–30 dk infüze edin! (2) 2,5 g/5 mL ampulle 1 g/2 mL ampulü karıştırmayın! (3) Oral damlada 1 mL = 500 mg (20 damla) olduğundan çocukta mL yerine damla sayısı (25 mg/damla) ile çift kontrol yapın!"
      />

      {/* 9. DAMAR YOLU & UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="mtm-compat"
        accessRequirement="peripheral-ok"
        accessSummary="50–100 mL %0,9 NaCl veya %5 Dekstroz ile seyreltilip 15–30 dk yavaş infüze edildiğinde periferik venöz hattan güvenle uygulanır. Ayrı/temiz infüzyon hattı tercih edilir; başka ilaçlarla aynı enjektörde karıştırılmaz. Sadece IV olanaksızsa derin intragluteal IM (ASLA subkütan veya intra-arteriyel!)."
        phRange="6,0 – 7,5 (Nötrale Yakın · Işığa Duyarlı)"
        osmolalityNote="Konsantre 500 mg/mL ampul yüksek ozmolariteli ve venöz irritandır; 50–100 mL SF/%5D içinde seyreltildiğinde periferik vende iyi tolere edilir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF — 50 veya 100 mL · 1. tercih)',
          '%5 Dekstroz (D5W — 50 veya 100 mL)',
          'Ringer Laktat (RL — kısa süreli infüzyon için uygun)',
        ]}
        stabilityNote="Metamizol sulu çözeltide zamanla 4-MAA’ya hidrolize olur ve ışık/oksijenle sarımsı renk değişimi gösterebilir; seyreltildikten sonra hemen (en geç birkaç saat içinde) infüze edilmelidir. Ampulleri ışıktan koruyarak <25 °C’de saklayın."
        ySiteCompatible={[
          '%0,9 NaCl · %5 Dekstroz · Ringer Laktat',
          'Kısa süreli ayrı hat önerilir — diğer ilaçlarla aynı enjektörde KARIŞTIRMAYIN!',
        ]}
        ySiteIncompatible={[
          'Aynı enjektörde/torbada diğer analjezikler, antibiyotikler veya sedatiflerle karıştırma (çökelme/pH uyumsuzluğu!)',
          'Klorpromazin (aynı hatta fiziksel uyumsuzluk + sistemik şiddetli hipotermi!)',
          'Yüksek konsantrasyonlu asidik/alkali YBÜ infüzyonları (uygulama öncesi/sonrası SF ile yıkayın veya ayrı lümen kullanın)',
        ]}
        extravasationProtocol="Konsantre 500 mg/mL formun paravenöz/subkütan kaçışı veya hatalı yüzeyel IM enjeksiyon şiddetli ağrı, steril apse ve doku nekrozuna yol açabilir. Ekstravazasyonda infüzyonu hemen durdurun, kateteri çıkarın, ekstremiteyi eleve edin ve soğuk kompres uygulayın."
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="mtm-organ"
        renalSummary="Klasik NSAİİ’lere göre perioperatif böbrek profili çok daha güvenlidir; ancak metabolitlerin ~%90’ı renal atıldığından eGFR <50 mL/dk’da tekrarlayan yüksek dozlardan KAÇININ (≤1–2 g/gün). Aktif 4-MAA/4-AA hemodiyalizle temizlenebilir!"
        renalDetails={[
          'eGFR ≥60 mL/dk: Standart doz (500–1000 mg q6–8sa, maks 4 g/gün) güvenle kullanılır; hidrasyonu koruyun.',
          'eGFR 30–59 mL/dk: Tek/kısa süreli perioperatif doz %100; tekrarlı kullanımda ≤2 g/gün (q8–12sa) ile sınırlayın.',
          'eGFR <30 / ABH / IHD / CRRT: Tekrarlayan yüksek dozlardan kaçının; IHD’de 4-MAA (~%58 protein bağlı) diyalizle kısmen temizlenir (post-HD kısa süreli 500–1000 mg düşünülebilir), CRRT’de hipotansiyonu yakından izleyin.',
        ]}
        hepaticSummary="Child-Pugh B–C sirozda aktif 4-MAA yarı ömrü ~3 kat (≥10 saate) uzar ve EMA 2020 uyarılı immün aracılı DILI (karaciğer hasarı) riski taşır — tekrarlayan yüksek dozlardan KAÇININ!"
        hepaticDetails={[
          'Child-Pugh A: Kısa süreli tek/birkaç doz %100; tekrarlayan kullanımda ≤2–3 g/gün ile sınırlayın ve DILI belirtilerini izleyin.',
          'Child-Pugh B–C: Tekrarlayan dozlardan kaçının (Child-C’de rutin kullanmayın — DILI + splanik vazodilatatör hipotansiyon riski!).',
        ]}
        {...STANDALONE_ORGAN_PART2['metamizole']}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="mtm-special"
        geriatricReductionBadge="Yaş >65–75: 500 mg Başla · ≥20–30 dk IV · ≤2–3 g/gün"
        geriatricPoints={[
          'Uzamış 4-MAA Yarı Ömrü & Hipotansiyon: Yaşlılarda renal/hepatik klirens azaldığından aktif 4-MAA birikir ve IV uygulamaya bağlı ortostatik/vazodilatatör hipotansiyon riski yüksektir — 500 mg ile başlayın ve ≥20–30 dk yavaş infüze edin.',
          'Polifarmasi Tuzağı: Yaşlılarda düşük doz Aspirin (COX-1 yarışması → ≥30 dk sonra ver!) ve düşük doz Metotreksat (ağır nötropeni/pansitopeni!) birlikteliği mutlaka sorgulanmalıdır.',
          'GİS/Renal Avantaj vs Agranülositoz Eğitimi: Klasik NSAİİ’lerin yüksek GİS/ABH riski nedeniyle yaşlıda kısa süreli perioperatif metamizol sık tercih edilir; ancak taburculukta ateş/boğaz ağrısı/ülser uyarısı şarttır!',
        ]}
        obesityWeightScalarBadge="Erişkinde Sabit 500–1000 mg · Maks 4000 mg/gün"
        obesityPoints={[
          'Sabit Erişkin Tavanı: Aktif metabolit 4-MAA görece hidrofiliktir (Vd ~0,5–0,8 L/kg). Morbid obez erişkinlerde kilo bazlı sınırsız doz artırımı YAPILMAZ — 1000 mg/doz ve 4000 mg/gün EMA tavanı aşılmamalıdır.',
          'Pediatrik Obezite: Obez çocuk/adolesanlarda 8–16 mg/kg hesabı yapılırken gerçek ağırlıkla 1000 mg erişkin tek doz tavanı aşılmamalıdır.',
        ]}
        clinicalNote="Pediatrik obezitede 8–16 mg/kg dozunun 1000 mg tavanını aşmaması ve erişkin ağırlık değerlendirmesi için:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Metamizol Sodyum"
        recommendedScalar="IBW"
        secondaryScalar={{ type: 'AdjBW', context: 'Pediatrik Obezite (Maks 1000 mg/doz)' }}
        rationale="Erişkinlerde obezitede kilo bazlı doz artırılmaz (tavan 1000 mg/doz, 4000 mg/gün). Pediatrik/adolesan obez çocuklarda 8–16 mg/kg hesabı yapılırken gerçek ağırlıkla 1000 mg tek dozu aşmayın; ideal/düzeltilmiş ağırlık tavan kontrolü kullanın."
        currentWeightKg={activeTab === 'pediatric' ? pedWeightKg : adultWeightKg}
        onApplyWeight={(w) => {
          setAdultWeightKg(Math.max(40, Math.min(180, Math.round(w))));
          if (w <= 70) setPedWeightKg(Math.max(5, Math.round(w)));
        }}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="mtm-preg"
        pregnancySummary="EMA 2018 Harmonizasyonu: 1. ve 2. trimesterde KAÇININ (ilk tercih Parasetamol); 3. trimesterde (≥28–30. hafta) fetal duktus arteriozus erken kapanması ve oligohidramnioz nedeniyle MUTLAK KONTRENDİKEDİR!"
        pregnancyDetails={[
          '1. ve 2. Trimester: İnsan verileri kısıtlıdır; yalnızca başka tedavi seçeneği yoksa ve sıkı yarar-zarar değerlendirmesiyle tek/kısa süreli düşünülür (gebelikte 1. basamak analjezik/antipiretik daima Parasetamoldür).',
          '3. Trimester (≥28–30. Hafta): Prostaglandin sentezi inhibisyonuyla fetal duktus arteriozus erken kapanması, fetal renal yetmezlik/oligohidramnioz ve doğum eylemi uzaması riski nedeniyle KESİNLİKLE KONTRENDİKEDİR.',
        ]}
        lactationSummary="EMA 2018: Aktif 4-MAA ve 4-AA anne sütüne anlamlı miktarda geçer! Emzirme döneminde TEKRARLAYAN kullanım KONTRENDİKEDİR; tek bir zorunlu doz verildiyse 48 SAAT boyunca anne sütü sağılıp ATILMALIDIR!"
        lactationDetails={[
          'Postpartum / Sezaryen Analjezisi: Emziren annede Parasetamol + İbuprofen tamamen güvenli olduğundan metamizole rutin gerek yoktur; metamizol verilmişse 48 saat emzirmeye ara verilmelidir (süt sağılıp atılır).',
        ]}
      />

      {/* 13. YAN ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="mtm-adr"
        items={[
          {
            title: 'AGRANÜLOSİTOZ (ANC <500/µL) & Pansitopeni / Aplastik Anemi',
            incidenceOrSeverity: 'Nadir · Ölümcül · EMA PRAC 2024',
            detail:
              'İmmün aracılı, dozdan ve tedavi süresinden BAĞIMSIZ gelişir — tek bir dozdan sonra, haftalar sonra veya ilaç kesildikten kısa süre sonra dahi ortaya çıkabilir! Açıklanamayan ateş, boğaz ağrısı veya oral/genital ülser gelişirse DERHAL kesip acil hemogram (ANC) alın!',
            tone: 'rose',
          },
          {
            title: 'Şiddetli Hipotansiyon, Anafilaktik / Anafilaktoid Şok & Kounis Sendromu',
            incidenceOrSeverity: 'Hızlı IV Puşe / Ateş / Sepsis · Kritik',
            detail:
              'Hızlı IV enjeksiyon doza bağlı ani vazodilatatör şok tetikler! Ayrıca IgE veya non-IgE aracılı bronkospazm, anjiyoödem, kardiyovasküler kollaps ve alerjik koroner vazospazm (Kounis sendromu) gelişebilir — daima ≥15–30 dk yavaş IV infüze edin!',
            tone: 'rose',
          },
          {
            title: 'İlaca Bağlı Karaciğer Hasarı (DILI — EMA 2020 Uyarısı)',
            incidenceOrSeverity: 'Nadir · İmmün Aracılı · Kritik',
            detail:
              'Başlangıçtan günler-aylar sonra gelişebilen hepatoselüler veya mikst hepatit (sarılık, koyu idrar, AST/ALT yüksekliği, nadiren akut karaciğer yetmezliği). Yeniden maruziyette çok daha hızlı ve ağır tekrarlar — bir daha ASLA verilmez!',
            tone: 'rose',
          },
          {
            title: 'Ağır Kutanöz İlaç Reaksiyonları (SCAR: SJS · TEN · DRESS)',
            incidenceOrSeverity: 'Çok Nadir · Hayatı Tehdit Eden',
            detail:
              'Yaygın ağrılı döküntü, hedef plaklar, bül veya mukozal soyulma görülürse metamizol derhal ve ömür boyu kalıcı olarak kesilir.',
            tone: 'amber',
          },
          {
            title: 'Akut Böbrek Hasarı / Akut İnterstisyel Nefrit & G6PD Hemolizi',
            incidenceOrSeverity: 'Nadir · Hipovolemi / KBY / G6PD',
            detail:
              'Klasik NSAİİ’lere göre çok daha nadir olsa da volüm kaybı veya KBY’de yüksek dozlarda geçici ABH/oligüri; G6PD eksikliğinde hemolitik anemi gelişebilir.',
            tone: 'amber',
          },
          {
            title: 'Zararsız Kırmızımsı İdrar (Rubazonik Asit Metaboliti)',
            incidenceOrSeverity: 'Benign · Yüksek Doz / Asidik İdrar',
            detail:
              'Asidik idrarda pembe-kırmızı renk değişimi yapabilir; dipstick/mikroskopi ile hematüri ve miyoglobinüri dışlandıktan sonra hastaya zararsız olduğu anlatılır.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="mtm-cautions"
        items={[
          {
            title: 'Ülkeler Arası Regülasyon Farkı (TR/Avrupa vs ABD/İngiltere)',
            detail:
              'Metamizol ABD (FDA), İngiltere ve İsveç’te agranülositoz riski nedeniyle yasaklanmıştır; buna karşın Türkiye, Almanya (DGAI), Avusturya, İspanya, Polonya ve Latin Amerika’da perioperatif analjezinin temel ilacıdır. Uluslararası (ASA/ABD) kılavuzlarda geçmemesinin nedeni etkisizliği değil ruhsatsızlığıdır — ancak Avrupa (EMA PRAC 2024) güvenlik önlemlerine harfiyen uyulmalıdır!',
          },
          {
            title: 'Kounis Sendromu (Alerjik Miyokard İskemisi / Vazospazm)',
            detail:
              'İV metamizol sonrası gelişen ani göğüs ağrısı, ST elevasyonu/depresyonu ve derin hipotansiyon sadece basit vazodilatasyon değil, mast hücre degranülasyonuna bağlı koroner vazospazm (Kounis Sendromu) olabilir — 12 derivasyonlu EKG ve anafilaksi/AKS eşzamanlı yaklaşımı gerekir!',
          },
          {
            title: 'Parasetamol ve NSAİİ ile Kombinasyon Mantığı',
            detail:
              'Metamizol + Parasetamol kombinasyonu perioperatif multimodal analjezide sık ve etkili kullanılır (ancak ikisi de ateşli/septik hastada KB düşürebilir — art arda/aralıklı verin!). Metamizol + klasik NSAİİ (İbuprofen/Diklofenak) rutin kombine edilmez (COX inhibisyon örtüşmesi ve yan etki artışı).',
          },
          {
            title: 'Kırmızı İdrar (Rubazonik Asit) vs Hematüri / Rabdomiyoliz',
            detail:
              'Yüksek doz metamizol alan hastalarda idrar torbasında pembe-kırmızı renk görülebilir. Önce idrar dipstick/mikroskopi ile eritrosit ve miyoglobinüriyi dışlayın; negatifse zararsız rubazonik asit metabolitine bağlıdır ve ilaç kesilince kaybolur.',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="mtm-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: '4-MAA Ön-İlaç Hidrolizi, Santral COX Peroksidaz Blokajı & CB1 / TRPA1 Aktivasyonu',
          summary:
            'Metamizol klasik asidik NSAİİ’lerden yapısal olarak farklıdır (non-asidik pirazolon). Periferik enflamasyon dokusunda birikmediği için belirgin antiinflamatuar etkisi yoktur; ancak çoklu santral ve düz kas mekanizmalarıyla benzersiz bir analjezik/spazmolitik profil sunar:',
          points: [
            'Hızlı Ön-İlaç Aktivasyonu: Oral veya IV uygulama sonrası dakikalar içinde non-enzimatik hidrolizle aktif 4-metilaminoantipirine (4-MAA) dönüşür; 4-MAA ve hepatik demetilasyon ürünü 4-AA kan-beyin bariyerini kolayca aşar.',
            'Endokannabinoid & TRPA1 Yolağı: Beyinde FAAH enzimiyle oluşan araşidonoil-4-MAA/4-AA konjugatları CB1 reseptörlerini aktive eder; eşzamanlı TRPA1 kanal antagonizması ve inen PAG–RVM serotonerjik/opioiderjik ağrı inhibisyonu güçlü santral analjezi sağlar.',
            'Aspirin COX-1 Yarışması: 4-MAA, trombosit COX-1 aktif bölgesini geri dönüşlü işgal ederek düşük doz Aspirin’in geri dönüşsüz Ser529 asetilasyonunu bloke edebilir (Polzin et al., JACC 2013) — Aspirin’den ≥30 dk sonra verilmelidir!',
          ],
        }}
        intracellularSignaling={{
          title: 'Düz Kas Spazmolizi, Vazodilatatör Hipotansiyon & İmmün Aracılı Agranülositoz',
          summary:
            'Metamizolün klinik avantajlarını ve en kritik iki yan etkisini yöneten hücresel yolaklar:',
          points: [
            'Spazmolitik Sinyal (Ca²⁺ ↓ & K_ATP ↑): Düz kas hücrelerinde inositol trifosfat (IP₃) aracılı hücre içi Ca²⁺ salınımını azaltır ve ATP-duyarlı potasyum kanallarını aktive ederek üreter, safra yolu ve mesane düz kasını gevşetir.',
            'Hızlı IV Vazodilatasyon: Aynı K_ATP / vasküler düz kas gevşetici etki ve mast hücre histamin salınımı, 500 mg/mL konsantre ampul hızlı puşelendiğinde ani SVR düşüşü ve ağır hipotansiyon/kollaps doğurur.',
            'İdiyosenkratik Agranülositoz & DILI: 4-MAA/4-AA metabolitlerinin miyeloperoksidazla reaktif ara ürünlere dönüşerek nötrofil/öncü hücrelere bağlanması (hapten mekanizması + HLA yatkınlığı) anti-nötrofil antikor aracılı ani granülosit yıkımını tetikler.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Santral Sinir Sistemi & Ağrı / Termoregülasyon',
            tissueTarget: 'Spinal Dorsal Boynuz · PAG–RVM · Hipotalamus',
            accent: 'indigo',
            points: [
              'Sedasyon veya solunum depresyonu YAPMADAN güçlü visseral ve somatik analjezi (postop Cochrane NNT ~2,3–2,4) sağlar.',
              'Preoptik hipotalamik PGE₂ baskılanmasıyla dirençli yüksek ateşte en güçlü antipiretiklerden biridir.',
            ],
          },
          {
            systemTitle: 'Kardiyovasküler Sistem & Hemodinami',
            tissueTarget: 'Sistemik Arteriyoller · Mast Hücreleri · Koronerler',
            accent: 'rose',
            points: [
              'Hızlı IV enjeksiyon SVR’yi aniden düşürerek şiddetli hipotansiyon tetikler; 15–30 dk yavaş infüzyon riski dramatik azaltır.',
              'Nadiren alerjik koroner vazospazm (Kounis sendromu) gelişebilir — IV sonrası göğüs ağrısı + hipotansiyonda 12-derivasyon EKG şarttır.',
            ],
          },
          {
            systemTitle: 'Düz Kaslar & Gastrointestinal Mukoza',
            tissueTarget: 'Üreter · Safra Yolları · Mesane · Mide Mukozası',
            accent: 'teal',
            points: [
              'Renal ve biliyer kolikte düz kas spazmolizi ile parasetamolden açıkça üstündür.',
              'Non-asidik yapısı ve periferik mukozal PG’leri minimal etkilemesi nedeniyle GİS ülser/kanama riski klasik NSAİİ’lerden belirgin düşüktür.',
            ],
          },
          {
            systemTitle: 'Hematopoetik Sistem & Karaciğer (CYP İndüksiyonu)',
            tissueTarget: 'Kemik İliği Granülosit Serisi · Trombosit COX-1 · CYP2B6/3A4',
            accent: 'amber',
            points: [
              'Klinik dozlarda kanama zamanını anlamlı uzatmaz (ASRA nöraksiyel blok kontrendikasyonu değildir), ancak düşük doz Aspirin’i bloke eder.',
              'Çok günlük kullanımda hepatik CYP2B6/CYP3A4 indüksiyonu ile Siklosporin, Takrolimus, Bupropion ve Valproat düzeylerini düşürür.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Multimodal Analjezi Sinerjisi & EMA 4000 mg/gün Tavanı',
          summary:
            'Perioperatif multimodal analjezide (DGAI / PROSPECT) Metamizol, Parasetamol ve rejyonal bloklarla tamamlayıcı çalışır:',
          points: [
            'Metamizol + Parasetamol: Farklı santral/periferik yolaklarla opioid tüketimini %30–40’a kadar azaltır; ateşli/septik hastada ikisini aynı dakikada değil aralıklı ve yavaş IV infüze edin (aditif hipotansiyon koruması!).',
            'Klasik NSAİİ ile Kombine Etmeyin: Metamizol + İbuprofen/Diklofenak rutin birlikte verilmez — ek analjezik kazanım sınırlıyken renal/aspirin/alerjik yan etki riski artar.',
            'EMA 2018 Tavan Kuralı: Erişkinde standart maks 4000 mg/gün (4× 1000 mg) ve pediatride 8–16 mg/kg × maks 4 doz/gün aşılmamalıdır.',
          ],
        }}
        clinicalPearls={[
          'Hızlı IV Puşe ASLA Yapma: 1 g/2 mL ampulü daima 50–100 mL SF/%5D içinde 15–30 dk yavaş infüze et, hastayı supin tut ve KB izle!',
          'EMA PRAC 2024 Altın Cümlesi: Rutin kan tahlili agranülositozu yakalamaz — hastaya "ateş, boğaz ağrısı veya ağız yarası çıkarsa ilacı hemen kes ve aynı gün kan sayımı yaptır" eğitimini ver!',
          'Aspirin Alan Koroner Hastada Zamanlama: Metamizolü hızlı salınımlı düşük doz Aspirin’den ≥30 dk SONRA ver; aksi halde Aspirin etkisiz kalır!',
          'Emziren Anne & 3. Trimester Kuralı: 3. trimesterde MUTLAK YASAK; emziren anneye tek doz verilmişse 48 saat süt sağılıp atılır (emzirende Parasetamol/İbuprofen çok daha güvenlidir)!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="mtm-refs"
        drugName="Metamizol Sodyum (Dipiron)"
        drugsComUrl="https://www.drugs.com/international/metamizole.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Klozapin & Yüksek Doz Miyelosüpresif Kemoterapötikler',
            mechanism: 'Aditif / Sinerjik İmmün ve Toksik Kemik İliği Baskılanması',
            clinicalEffect:
              'Ölümcül agranülositoz, ağır nötropenik sepsis ve pansitopeni riskinde dramatik artış.',
            management:
              'KESİNLİKLE birlikte kullanmayın — Klozapin veya miyelosüpresif kemoterapi alanlarda Metamizol yerine Parasetamol seçin.',
          },
          {
            severity: 'D',
            agent: 'Düşük Doz Aspirin (81–100 mg/gün — Kardiyoprotektif)',
            mechanism: '4-MAA ile Trombosit COX-1 Aktif Bölgesinde (Ser529) Geri Dönüşlü Yarışma',
            clinicalEffect:
              'Aspirinin geri dönüşsüz antiplatelet korumasının iptali (AKS / koroner stent trombozu riski!).',
            management:
              'Metamizolü mutlaka hızlı salınımlı Aspirin’den ≥30 dakika SONRA uygulayın; AKS/taze stent hastasında mümkünse Parasetamol tercih edin.',
          },
          {
            severity: 'D',
            agent: 'Metotreksat (MTX — Özellikle Yaşlılar & Yüksek Doz)',
            mechanism: 'Aditif Hematotoksisite & Renal Klirens Etkileşimi',
            clinicalEffect:
              'Şiddetli nötropeni, trombositopeni ve pansitopeni riskinde belirgin artış.',
            management:
              'Eşzamanlı kullanımdan KAÇININ; zorunluysa yakın tam kan sayımı izlemi yapın.',
          },
          {
            severity: 'D',
            agent: 'Siklosporin · Takrolimus · Bupropion · Valproat · Metadon · Efavirenz · Sertralin',
            mechanism: 'Çok Günlük Metamizol ile Hepatik CYP2B6 ve CYP3A4 Enzim İndüksiyonu (EMA SmPC!)',
            clinicalEffect:
              'Substrat plazma konsantrasyonlarında %30–50’ye varan düşüş → organ rejeksiyonu, epileptik nöbet, opioid yoksunluğu veya depresyon relapsı!',
            management:
              'Transplant immünsüpresifleri (Siklosporin/Takrolimus), Valproat ve Metadon kullananlarda ilaç düzeylerini/klinik yanıtı yakından izleyin veya Parasetamol seçin.',
          },
          {
            severity: 'C',
            agent: 'Klorpromazin (Fenotiyazin Antipsikotikler)',
            mechanism: 'Hipotalamik Termoregülasyon Üzerinde Sinerjik Baskılanma',
            clinicalEffect:
              'Şiddetli sistemik HİPOTERMİ gelişimi.',
            management:
              'Birlikte kullanımdan kaçının; zorunluysa kor vücut sıcaklığını sürekli takip edin.',
          },
        ]}
        references={[
          {
            authors: 'European Medicines Agency (EMA) — PRAC',
            title: 'EMA recommends measures to minimise serious outcomes of known side effect with painkiller metamizole (agranulocytosis)',
            journal: 'EMA Safety Review / Referral',
            year: 2024,
            note: 'Agranülositoz semptom eğitimi, rutin asemptomatik CBC taramasının koruyucu olmadığı ve belirti anında derhal kesilip acil hemogram alınması kılavuzu.',
          },
          {
            authors: 'European Medicines Agency (EMA) — CHMP',
            title: 'EMA recommends aligning doses of metamizole medicines and their use during pregnancy and breastfeeding (Article 31 Referral)',
            journal: 'EMA Harmonised SmPC',
            year: 2018,
            note: 'Erişkin 4000 mg/gün tavanı, pediatrik 8–16 mg/kg (≥3 ay / IV ≥1 yaş), 3. trimester kontrendikasyonu ve tek doz sonrası 48 sa laktasyon arası.',
          },
          {
            authors: 'European Medicines Agency (EMA) — DHPC',
            title: 'Metamizole: risk of drug-induced liver injury (DILI)',
            journal: 'Direct Healthcare Professional Communication',
            year: 2020,
            note: 'İmmün aracılı hepatoselüler/mikst DILI uyarısı ve yeniden maruziyet yasağı.',
          },
          {
            authors: 'Stamer UM, Gundert-Remy U, Biermann E, Erlenwein J, Meissner W, Wirz S, Stammschulte T',
            title: 'Metamizole: Considerations for Perioperative Use — Recommendations of an Expert Panel (DGAI / BDA / AkdÄ)',
            journal: 'Der Anaesthesist / Eur J Anaesthesiol',
            year: 2019,
            note: 'Perioperatif multimodal analjezi, yavaş IV infüzyon ve hasta bilgilendirme konsensüsü.',
          },
          {
            authors: 'Hearn L, Derry S, Moore RA',
            title: 'Single dose dipyrone (metamizole) for acute postoperative pain in adults',
            journal: 'Cochrane Database of Systematic Reviews',
            year: 2016,
            note: 'Postoperatif akut ağrıda 500–1000 mg metamizolün güçlü analjezik etkinliği (NNT ~2,3–2,4).',
          },
          {
            authors: 'Polzin A, Zeus T, Schrör K, Kelm M, Hohlfeld T',
            title: 'Dipyrone (metamizole) can nullify the antiplatelet effect of aspirin in patients with coronary artery disease',
            journal: 'Journal of the American College of Cardiology (JACC)',
            year: 2013,
            note: '4-MAA ile düşük doz Aspirin arasındaki COX-1 yarışmasının klinik kanıtı ve zamanlama kuralı.',
          },
          {
            authors: 'Kötter T, da Costa BR, Fässler M, Blozik E, Linde K, Jüni P, Reichenbach S, Scherer M',
            title: 'Metamizole-associated adverse events: a systematic review and meta-analysis',
            journal: 'PLoS ONE',
            year: 2015,
            note: 'Kısa süreli hastane kullanımında GİS/renal güvenlik profilinin klasik NSAİİ’lerle karşılaştırmalı analizi.',
          },
        ]}
      />

      {/* Alt Zaman & Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          EMA 2018 · EMA DILI 2020 · EMA PRAC 2024 · DGAI / PROSPECT Kılavuzlarıyla Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Analjezik · Antipiretik · Spazmolitik
        </span>
      </div>
    </div>
  );
};
