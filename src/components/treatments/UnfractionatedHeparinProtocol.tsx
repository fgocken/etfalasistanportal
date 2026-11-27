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

type CalcTab = 'dosing_calc' | 'protamine_calc' | 'hit_4t' | 'asra_resistance';
type UfhIndication = 'vte_raschke' | 'acs_nstemi' | 'primary_pci' | 'cpb_cardiac' | 'vascular_clamp' | 'sc_prophylaxis';
type InfBagConc = '100_iu_ml' | '500_iu_ml';
type ProtamineMode = 'iv_bolus' | 'iv_infusion' | 'cpb_reversal';
type BolusElapsed = 'lt30' | '30_60' | '60_120' | 'gt120';
type AsraRegimen = 'sc_proph' | 'sc_high' | 'iv_therapeutic' | 'intraop_vascular';

export const UnfractionatedHeparinProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('dosing_calc');

  // Tab 1: Doz & İnfüzyon
  const [weightKg, setWeightKg] = useState<number>(75);
  const [indication, setIndication] = useState<UfhIndication>('vte_raschke');
  const [bagConc, setBagConc] = useState<InfBagConc>('100_iu_ml');

  // Tab 2: Protamin Sülfat Antidot
  const [protMode, setProtMode] = useState<ProtamineMode>('iv_bolus');
  const [bolusIu, setBolusIu] = useState<number>(5000);
  const [elapsedBucket, setElapsedBucket] = useState<BolusElapsed>('lt30');
  const [infusionRateIuHr, setInfusionRateIuHr] = useState<number>(1200);
  const [cpbTotalIu, setCpbTotalIu] = useState<number>(25000);

  // Tab 3: HIT 4T Skoru (0–8)
  const [tPlt, setTPlt] = useState<number>(0);
  const [tTiming, setTTiming] = useState<number>(0);
  const [tThrombosis, setTThrombosis] = useState<number>(0);
  const [tOther, setTOther] = useState<number>(0);

  // Tab 4: ASRA 2018 & Heparin Direnci
  const [asraRegimen, setAsraRegimen] = useState<AsraRegimen>('iv_therapeutic');

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useMonographAccordion('ufh-moa', false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavItems = [
    { id: 'ufh-high-alert', label: 'Yüksek Uyarı' },
    { id: 'ufh-moa', label: 'AT-III & ADME' },
    { id: 'ufh-contra', label: 'Kontrendikasyonlar' },
    { id: 'ufh-indications', label: 'Endikasyonlar' },
    { id: 'ufh-calc', label: 'Hesaplayıcı · Protamin · 4T' },
    { id: 'ufh-tr', label: 'TR Formlar' },
    { id: 'ufh-compat', label: 'Dilüsyon & Y-Site' },
    { id: 'ufh-organ', label: 'Organ Yetmezliği' },
    { id: 'ufh-special', label: 'Geriatri & Obezite' },
    { id: 'ufh-preg', label: 'Gebelik & Laktasyon' },
    { id: 'ufh-adr', label: 'HIT & Yan Etkiler' },
    { id: 'ufh-cautions', label: 'Klinik Dikkat' },
    { id: 'ufh-pd', label: 'Derin Farmakodinami' },
    { id: 'ufh-refs', label: 'Etkileşim & Kaynak' },
  ];

  // --- TAB 1 HESAPLAMALARI ---
  const concIuPerMl = bagConc === '100_iu_ml' ? 100 : 500;

  const getDosingResult = () => {
    if (indication === 'vte_raschke') {
      const bolus = Math.round((weightKg * 80) / 100) * 100;
      const infIuHr = Math.round((weightKg * 18) / 50) * 50;
      return {
        title: 'DVT / Pulmoner Emboli (Raschke Ağırlık Nomogramı)',
        bolusIu: bolus,
        bolusVialMl: Number((bolus / 5000).toFixed(2)),
        infIuHr,
        infRateMlHr: Number((infIuHr / concIuPerMl).toFixed(1)),
        target: 'aPTT 1,5–2,5× (~60–85 sn) veya Anti-Xa 0,3–0,7 IU/mL (6 saatte bir kontrol!)',
        note: 'Obezitede (BMI ≥40) gerçek ağırlık kullanılır ancak bazı merkezler ilk bolusu 10.000 IU ve başlangıç infüzyonunu 2.000–2.500 IU/sa ile sınırlandırıp 6. saatte anti-Xa ile titre eder.',
      };
    }
    if (indication === 'acs_nstemi') {
      const bolus = Math.min(4000, Math.round((weightKg * 60) / 100) * 100);
      const infIuHr = Math.min(1000, Math.round((weightKg * 12) / 50) * 50);
      return {
        title: 'AKS (NSTE-ACS / Fibrinoliz · ESC / AHA Tavanlı)',
        bolusIu: bolus,
        bolusVialMl: Number((bolus / 5000).toFixed(2)),
        infIuHr,
        infRateMlHr: Number((infIuHr / concIuPerMl).toFixed(1)),
        target: 'aPTT 1,5–2,0× (~50–70 sn) · Bolus maks 4.000 IU · İnf. maks 1.000 IU/sa!',
        note: 'ESC 2023: Başarılı primer PCI sonrası ek endikasyon (LV trombüsü, mekanik kapak, IABP) yoksa rutin post-PCI UFH infüzyonuna devam edilmez!',
      };
    }
    if (indication === 'primary_pci') {
      const low = Math.round((weightKg * 70) / 100) * 100;
      const high = Math.round((weightKg * 100) / 100) * 100;
      return {
        title: 'Primer / Elektif PCI (GPIIb/IIIa Yoksa · ESC 2023)',
        bolusIu: low,
        bolusRange: `${low.toLocaleString('tr-TR')}–${high.toLocaleString('tr-TR')} IU`,
        bolusVialMl: Number((low / 5000).toFixed(2)),
        bolusVialRange: `${(low / 5000).toFixed(2)}–${(high / 5000).toFixed(2)} mL`,
        infIuHr: 0,
        infRateMlHr: 0,
        target: 'Hedef ACT: 250–300 sn (GPIIb/IIIa varsa 50–70 IU/kg → ACT 200–250 sn!)',
        note: 'Kateter laboratuvarında ACT rehberliğinde ek boluslarla sürdürülür.',
      };
    }
    if (indication === 'cpb_cardiac') {
      const low = Math.round((weightKg * 300) / 500) * 500;
      const high = Math.round((weightKg * 400) / 500) * 500;
      return {
        title: 'Kardiyopulmoner Bypass (KPB / Açık Kalp Cerrahisi)',
        bolusIu: low,
        bolusRange: `${low.toLocaleString('tr-TR')}–${high.toLocaleString('tr-TR')} IU`,
        bolusVialMl: Number((low / 5000).toFixed(2)),
        bolusVialRange: `${(low / 5000).toFixed(1)}–${(high / 5000).toFixed(1)} mL`,
        infIuHr: 0,
        infRateMlHr: 0,
        target: 'Hedef ACT ≥ 400–480 sn (Kanülasyon öncesi mutlaka doğrula!)',
        note: 'Santral kateterden kan dönüşü teyit edilerek verilir! >500–600 IU/kg ile hedef ACT’ye ulaşılamıyorsa HEPARİN DİRENCİ (AT-III / 2–4 Ü TDP) düşün!',
      };
    }
    if (indication === 'vascular_clamp') {
      const low = Math.round((weightKg * 50) / 100) * 100;
      const high = Math.round((weightKg * 100) / 100) * 100;
      return {
        title: 'Vasküler Cerrahi (Aort / Karotis / Periferik Klemp)',
        bolusIu: Math.min(5000, high),
        bolusRange: `${low.toLocaleString('tr-TR')}–${high.toLocaleString('tr-TR')} IU (Rutin 5.000 IU)`,
        bolusVialMl: Number((Math.min(5000, high) / 5000).toFixed(2)),
        bolusVialRange: `${(low / 5000).toFixed(2)}–${(high / 5000).toFixed(2)} mL`,
        infIuHr: 0,
        infRateMlHr: 0,
        target: 'Hedef ACT: 200–250 sn (Klempten 3–5 dk önce IV · Gerekirse q1–2sa 1.000–2.500 IU)',
        note: 'Nöraksiyel blok yapıldıysa IV heparini ponksiyondan EN AZ ≥1 SAAT SONRA verin (ASRA 2018)!',
      };
    }
    return {
      title: 'VTE Profilaksisi SC (Özellikle eGFR <30 / ABH / Diyaliz)',
      bolusIu: 5000,
      bolusRange: '5.000 IU SC q8sa veya q12sa',
      bolusVialMl: 1.0,
      bolusVialRange: '1,0 mL (5.000 IU/mL flakondan) SC',
      infIuHr: 0,
      infRateMlHr: 0,
      target: 'Rutin aPTT takibi gerekmez · 2–3 günde bir Trombosit (HIT izlemi!)',
      note: 'Yüksek VTE riski / obez / travma: q8sa; yaşlı / <50 kg / düşük risk: q12sa. ASLA intramüsküler (IM) uygulama — masif hematom yapar!',
    };
  };
  const doseRes = getDosingResult();

  // --- TAB 2 PROTAMİN HESAPLAMALARI ---
  const getProtamineResult = () => {
    if (protMode === 'iv_bolus') {
      const mult =
        elapsedBucket === 'lt30'
          ? 1.0
          : elapsedBucket === '30_60'
            ? 0.65
            : elapsedBucket === '60_120'
              ? 0.45
              : 0.3;
      const rawMg = Math.round((bolusIu / 100) * mult);
      const cappedMg = Math.min(50, Math.max(5, rawMg));
      return {
        mg: cappedMg,
        rawMg,
        capped: rawMg > 50,
        ml: Number((cappedMg / 10).toFixed(1)), // TR 50 mg / 5 mL = 10 mg/mL
        minMinutes: Math.max(10, Math.ceil(cappedMg / 5)),
        rationale: `Bolus (${bolusIu.toLocaleString('tr-TR')} IU) × ${mult} mg/100 IU zaman katsayısı = ${rawMg} mg${rawMg > 50 ? ' → tek doz tavanı 50 mg!' : ''}.`,
      };
    }
    if (protMode === 'iv_infusion') {
      // Son ~2–2.5 saatte verilen heparin aktif kabul edilir
      const activeIu = Math.round(infusionRateIuHr * 2.25);
      const rawMg = Math.round(activeIu / 100);
      const cappedMg = Math.min(50, Math.max(5, rawMg));
      return {
        mg: cappedMg,
        rawMg,
        capped: rawMg > 50,
        ml: Number((cappedMg / 10).toFixed(1)),
        minMinutes: Math.max(10, Math.ceil(cappedMg / 5)),
        rationale: `İnfüzyonu DERHAL durdur! Son ~2–2,5 saatte verilen aktif yük ≈ ${activeIu.toLocaleString('tr-TR')} IU → ${rawMg} mg Protamin${rawMg > 50 ? ' (tek doz tavanı 50 mg!)' : ''}.`,
      };
    }
    // CPB reversal (0.8–1.0 mg per 100 IU)
    const lowMg = Math.round((cpbTotalIu / 100) * 0.8);
    const highMg = Math.round((cpbTotalIu / 100) * 1.0);
    return {
      mg: highMg,
      rangeMg: `${lowMg}–${highMg} mg`,
      rawMg: highMg,
      capped: false,
      ml: Number((highMg / 10).toFixed(1)),
      rangeMl: `${(lowMg / 10).toFixed(1)}–${(highMg / 10).toFixed(1)} mL`,
      minMinutes: Math.max(10, Math.ceil(highMg / 20)), // KPB'de 10–15 dk yavaş kontrollü infüzyon
      rationale: `KPB sonrası 0,8–1,0 mg / 100 IU (veya Hepcon HMS titrasyonu) → 10–15 dk yavaş IV verip 5 dk sonra ACT’nin bazale döndüğünü doğrula! (1–4 sa sonra "heparin rebound" için ek 25–50 mg gerekebilir).`,
    };
  };
  const protRes = getProtamineResult();

  // --- TAB 3 HIT 4T SKORU ---
  const fourTTotal = tPlt + tTiming + tThrombosis + tOther;
  const fourTVdict =
    fourTTotal >= 6
      ? {
          tone: 'rose' as const,
          label: `YÜKSEK OLASILIK (${fourTTotal}/8 · ~%64 HIT)`,
          action:
            'TÜM HEPARİNİ (SC, IV, flushes, heparinli kateterler!) DERHAL KES! Anti-PF4/Heparin ELISA sonucunu BEKLEMEDEN terapötik non-heparin antikoagülan (Bivalirudin / Argatroban / Fondaparinuks) BAŞLA! DMAH (Enoksaparin), erken Varfarin (Plt <150.000) ve profilaktik trombosit transfüzyonu KESİNLİKLE YASAK!',
        }
      : fourTTotal >= 4
        ? {
            tone: 'amber' as const,
            label: `ORTA OLASILIK (${fourTTotal}/8 · ~%14 HIT)`,
            action:
              'TÜM HEPARİNİ DERHAL KES, Anti-PF4/Heparin ELISA (+ gerekirse SRA) gönder ve non-heparin alternatif antikoagülasyona geç! Laboratuvar negatifse (~%99 NPV) yeniden değerlendir.',
          }
        : {
            tone: 'emerald' as const,
            label: `DÜŞÜK OLASILIK (${fourTTotal}/8 · <%5 HIT)`,
            action:
              'HIT olasılığı çok düşüktür (%99 negatif prediktif değer!). Diğer trombositopeni nedenlerini (sepsis, dilüsyon, KPB, ilaçlar) araştır; rutin Anti-PF4 testi gerekmez.',
          };

  // --- TAB 4 ASRA 2018 ---
  const asraMeta: Record<
    AsraRegimen,
    { label: string; preHold: string; labCheck: string; postResume: string; catheterNote: string }
  > = {
    sc_proph: {
      label: 'Profilaktik SC UFH (5.000 IU q8–12sa · ≤15.000 IU/gün)',
      preHold: 'Son SC dozdan EN AZ 4–6 SAAT sonra (veya normal aPTT doğrulanarak)',
      labCheck: '>4 gün kullanım varsa Trombosit (HIT taraması!) kontrol et',
      postResume: 'Ponksiyon / kateter çekiminden ≥1 SAAT sonra',
      catheterNote: 'Kateter çekimi son SC dozdan ≥4–6 saat sonra yapılır; çekimden ≥1 saat sonra yeni doz verilir.',
    },
    sc_high: {
      label: 'Yüksek Doz SC UFH (>20.000 IU/gün veya >7.500–10.000 IU BID)',
      preHold: 'Son SC dozdan EN AZ 12–24 SAAT sonra',
      labCheck: 'Normal aPTT MUTLAKA belgelenmelidir (+ >4 günde Trombosit)',
      postResume: 'Ponksiyon / kateter çekiminden ≥1 SAAT sonra',
      catheterNote: 'Yüksek doz SC UFH altında kateter çekilmeden önce 12–24 sa beklenip normal aPTT teyit edilmelidir!',
    },
    iv_therapeutic: {
      label: 'Terapötik IV UFH İnfüzyonu (DVT / PE / AKS)',
      preHold: 'İnfüzyon durdurulduktan EN AZ 4–6 SAAT sonra',
      labCheck: 'Normal aPTT (bazal değere dönüş) KESİNLİKLE doğrulanmalıdır!',
      postResume: 'Ponksiyon / kateter çekiminden ≥1 SAAT sonra',
      catheterNote: 'Kateter çekilmeden önce IV UFH 4–6 sa durdurulup normal aPTT doğrulanır; çekimden ≥1 sa sonra yeniden başlanır.',
    },
    intraop_vascular: {
      label: 'Nöraksiyel Blok Sonrası İntraoperatif IV Heparin (Vasküler Cerrahi)',
      preHold: 'İntraop IV Heparin, nöraksiyel ponksiyondan EN AZ ≥1 SAAT SONRA verilir!',
      labCheck: 'Kanlı ponksiyon ("bloody tap") gelişirse cerrahla olguyu 24 sa erteleme vs yakın nörolojik izlem bireyselleştirilir!',
      postResume: 'Postop epidural kateter çekimi: Son IV heparinden ≥4–6 sa + normal aPTT (veya Protamin sonrası normal ACT/aPTT)!',
      catheterNote: 'Postop motor blok/sırt ağrısı gelişirse acil Spinal Epidural Hematom MRG (ilk 8 saatte dekompresyon kritik!).',
    },
  };

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'dosing_calc') {
      return `STANDART HEPARİN (UFH) ORDER (${doseRes.title} · ${weightKg} kg): Bolus: ${doseRes.bolusRange || `${doseRes.bolusIu.toLocaleString('tr-TR')} IU`} (${doseRes.bolusVialRange || `${doseRes.bolusVialMl} mL`}, 5.000 IU/mL flakon). ${doseRes.infIuHr > 0 ? `İnfüzyon: ${doseRes.infIuHr.toLocaleString('tr-TR')} IU/sa (${bagConc === '100_iu_ml' ? '25.000 IU / 250 mL = 100 IU/mL' : '25.000 IU / 50 mL = 500 IU/mL'} → ${doseRes.infRateMlHr} mL/sa). ` : ''}Hedef: ${doseRes.target}.`;
    }
    if (activeTab === 'protamine_calc') {
      return `PROTAMİN SÜLFAT ANTİDOT ORDER: ${protRes.rangeMg || `${protRes.mg} mg`} (${protRes.rangeMl || `${protRes.ml} mL`} [10 mg/mL ampul]) YAVAŞ IV (≤5 mg/dk · en az ${protRes.minMinutes} dk’da!). ${protRes.rationale} Hızlı IV YAPMA (pulmoner vazokonstriksiyon/anafilaksi riski!) — 5–15 dk sonra ACT/aPTT kontrol et!`;
    }
    if (activeTab === 'hit_4t') {
      return `HIT 4T SKORU = ${fourTTotal}/8 (${fourTVdict.label}): ${fourTVdict.action}`;
    }
    const a = asraMeta[asraRegimen];
    return `ASRA 2018 UFH NÖRAAKSİYEL (${a.label}): Öncesi: ${a.preHold} | Lab: ${a.labCheck} | Sonrası: ${a.postResume}.`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="ufh-high-alert"
        defaultOpen={false}
        tallManName="STANDART HEPARIN / UFH (ISMP HIGH-ALERT · 25.000 IU / 5 mL = 5.000 IU/mL!)"
        confusionRiskWith="5.000 IU/mL Konsantre Flakon vs 100 IU/mL Yıkama · 'U' Kısaltma Hatası (ASLA 'U' Yazma → 'IU' Yaz!)"
        criticalAlerts={[
          'ISMP YÜKSEK RİSKLİ İLAÇ — 5.000 IU/mL FLAKON & 10×/100× DOZ HATASI!: Türkiye’deki Nevparin®/Vasparin® flakonları 25.000 IU / 5 mL (5.000 IU/mL) yüksek konsantrasyondadır! ASLA doğrudan yıkama (flush) olarak kullanma ve "U" kısaltmasını YAZMA (5000U → 50000 okunabilir; her zaman "IU" veya "Ünite" yaz)! İnfüzyonda standart 25.000 IU / 250 mL (100 IU/mL) hazırla ve akıllı pompa kullan!',
          'HIT (HEPARİN İLİŞKİLİ TROMBOSİTOPENİ TİP II — 5–10. GÜN!): Trombosit >%50 düşerse (4T ≥4) TÜM heparini (kateter yıkamaları dahil!) DERHAL kes ve non-heparin antikoagülan başla! HIT’te DMAH (Enoksaparin) YASAK, trombosit <150.000 iken Varfarin YASAK (venöz ekstremite gangreni!), profilaktik trombosit transfüzyonu YASAK!',
          'PROTAMİN SÜLFAT HIZLI IV PUŞE FELAKETİ!: 1 mg Protamin ≈ 100 IU aktif heparini nötralize eder (non-KPB tek maks 50 mg); ancak MUTLAKA YAVAŞ IV (≤5 mg/dk · ≥10–15 dk) verilmelidir! Hızlı puşe ani hipotansiyon (Tip I), anafilaksi (Tip II) ve katastrofik pulmoner hipertansiyon / sağ kalp yetmezliği (Tip III) tetikler!',
          'ASRA 2018 NÖRAAKSİYEL BLOK KURALLARI: Terapötik IV UFH ponksiyon ve epidural kateter çekiminden 4–6 saat önce kesilip NORMAL aPTT doğrulanmalıdır! İntraoperatif IV heparin (vasküler cerrahi) nöraksiyel bloktan en az ≥1 SAAT sonra verilebilir; profilaktik SC 5.000 IU için 4–6 saat bekle!',
        ]}
        antidoteOrRescue="SPESİFİK %100 ANTİDOT: Protamin Sülfat (TR: 50 mg / 5 mL = 10 mg/mL ampul)! 1 mg Protamin ≈ 100 IU aktif UFH’yi anında nötralize eder (bolustan <30 dk: 1 mg/100 IU; 30–60 dk: 0,5–0,75 mg/100 IU; 60–120 dk: 0,375–0,5 mg/100 IU; sürekli IV infüzyonda son 2–2,5 saatin yükü; non-KPB maks tek doz 50 mg!). DAİMA ≤5 mg/dk (≥10–15 dk) yavaş IV uygula, 5–15 dk sonra aPTT/ACT kontrol et ve KPB sonrası 1–4 saatte gelişebilen 'heparin rebound'u izle!"
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Antitrombotik · Parenteral Antikoagülan (İndirekt FIIa &amp; FXa İnhibitörü)
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Nevparin® · Vasparin® · Koparin® 25.000 IU / 5 mL
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                KBY/ABH 1. Tercih · %100 Protamin Reversal · KPB / ECMO / Vasküler
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Standart Heparin / UFH{' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Nevparin® · Vasparin® · Koparin® · Poliparin®)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Antitrombin-III’e (AT-III) bağlanarak hem <strong>Trombin (FIIa)</strong> hem <strong>Faktör Xa</strong>{' '}
              inhibisyonunu ~1.000 kat hızlandıran temel parenteral antikoagülandır. <strong>Kısa yarı ömrü (~60 dk)</strong>,{' '}
              <strong>ağır böbrek yetmezliğinde (eGFR &lt;30 / ABH / diyaliz) birikmemesi</strong>,{' '}
              <strong>Protamin Sülfat ile %100 geri çevrilebilmesi</strong> ve <strong>ACT/aPTT/Anti-Xa ile anlık
              titre edilebilmesi</strong> sayesinde kardiyopulmoner bypass (KPB), vasküler cerrahi, ECMO, hemodiyaliz,
              yüksek kanama riskli YBÜ hastaları ve gebelikte vazgeçilmez standarttır.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: B01AB01 · Anti-Xa:IIa = 1:1 · t½ 60–90 dk (KPB: 120–150 dk)
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              VTE / AKS Nomogramları
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              VTE: 80 / 18 · AKS: 60 / 12
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              AKS tavan: 4.000 IU / 1.000 IU/sa · SC: 5.000 q8–12sa
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              KPB &amp; Vasküler Cerrahi
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              KPB: 300–400 IU/kg
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              ACT ≥480 sn · Vasküler: 50–100 IU/kg (~5.000 IU)
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              %100 Antidot: Protamin
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              1 mg / 100 IU UFH
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Yavaş IV ≤5 mg/dk (≥10–15 dk) · Non-KPB maks 50 mg
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              ASRA 2018 · HIT · KBY
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              4–6 sa + Normal aPTT
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              eGFR &lt;30 1. seçim · HIT (4T ≥4) → KES!
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & AT-III / ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="ufh-moa"
          sectionTitle="Etki Mekanizması: Antitrombin-III Aktivasyonu, 1:1 Anti-Xa / Anti-IIa & Heparin Direnci"
          summary="Standart heparin heterojen uzun zincirli (3.000–30.000 Da) negatif yüklü bir glikozaminoglikandır. Özgül pentasakkarit dizisiyle Antitrombin-III’e (AT-III) bağlanıp AT-III’ün pıhtılaşma faktörlerini (FIIa, FXa, FIXa, FXIa, FXIIa) inaktive etme hızını ~1.000 kat artırır. Yeni pıhtı büyümesini durdurur (var olan pıhtıyı eritmez!)."
          pillars={[
            {
              title: '1. Üçlü Köprü (≥18 Sakkarit) → 1:1 Anti-Xa : Anti-IIa (Trombin) Aktivitesi',
              detail:
                'Düşük molekül ağırlıklı heparinler (DMAH) kısa zincirli olduğundan ağırlıklı FXa’yı inhibe ederken, UFH’nin uzun zincirleri hem AT-III’ü hem Trombini (FIIa) aynı anda bağlayarak güçlü 1:1 anti-IIa/anti-Xa etki yaratır ve aPTT / ACT ile izlenebilir!',
            },
            {
              title: '2. AT-III Bağımlılığı → Heparin Direnci (KPB / YBÜ / Sepsis / Nefrotik Sendrom)',
              detail:
                'UFH tek başına antikoagülan değildir — etkisini AT-III üzerinden gösterir! AT-III eksikliğinde (<%60) veya aşırı yüksek FVIII/fibrinojende 500 IU/kg’a rağmen ACT ≥480 sn olmaz → AT-III konsantresi veya 2–4 ünite TDP (FFP) verilir!',
            },
            {
              title: '3. Güçlü Negatif Yük → Protaminle Elektrostatik %100 Nötralizasyon',
              detail:
                'Kuvvetli katyonik (pozitif yüklü) Protamin Sülfat, anyonik (negatif yüklü) UFH ile hızla stabil inaktif iyonik kompleks oluşturarak antikoagülan etkiyi dakikalar içinde tamamen tersine çevirir!',
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
                Detaylı Farmakokinetik (ADME): Doz-Bağımlı Bifazik Klirens, SC Biyoyararlanım &amp; KBY Avantajı
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
                  A — IV Anında Etki · SC %30 Biyoyararlanım (IM YASAK!)
                </div>
                IV uygulamada antikoagülan etki <strong>anında (&lt;1 dk)</strong> başlar. Subkütan (SC) uygulamada
                etki 20–60 dk’da başlar (pik 2–4 sa, biyoyararlanım düşük dozlarda ~%30). Oral emilmez;{' '}
                <strong>IM enjeksiyon masif hematom riski nedeniyle kesinlikle yapılmaz!</strong>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — İntravasküler Dağılım · Plasentayı &amp; Anne Sütünü GEÇMEZ!
                </div>
                Büyük ve yüksek negatif yüklü molekülü nedeniyle büyük ölçüde intravasküler alanda kalır (Vd ~0,06–0,07
                L/kg), <strong>plasentayı GEÇMEZ</strong> ve <strong>anne sütüne GEÇMEZ</strong> — gebelik ve
                emzirmenin en güvenli parenteral antikoagülanlarından biridir!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M &amp; E — Bifazik Doz-Bağımlı Yarı Ömür (30 → 150 dk!)
                </div>
                Düşük-orta dozlarda endotel/makrofajlarca hızlı (doyurulabilir) depolimerizasyonla temizlenir (25 IU/kg
                → t½ ~30 dk; 100 IU/kg → t½ ~60 dk). Çok yüksek KPB dozlarında (400 IU/kg) bu yolak doyar ve daha yavaş
                renal klirens devreye girer (t½ ~120–150 dk!).
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  Heparin Rebound (KPB Sonrası 1–4. Saat Kanama!)
                </div>
                Protaminin yarı ömrü (~5–7 dk!) heparinden çok daha kısadır. KPB sonrası doku/endotele bağlanan heparinin
                yeniden dolaşıma salınmasıyla 1–4 saat sonra ACT/aPTT tekrar uzayabilir → düşük doz ek Protamin (25–50 mg)
                gerekir!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="ufh-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Geçmiş veya mevcut İmmün Aracılı Heparin İlişkili Trombositopeni (HIT Tip II) öyküsü (yakın dönemde tüm heparin ve yıkamalar MUTLAK YASAK!).',
          'Aktif kontrolsüz majör kanama (intrakraniyal kanama, aktif masif GİS/retroperitoneal kanama, akut aort diseksiyonu — yalnızca hayatı tehdit eden KPB/DİK istisnaları hariç).',
          'Ağır trombositopeni (genellikle <50.000/µL — bireysel yarar/zarar hariç) veya tam terapötik dozda laboratuvar izlemi (aPTT/Anti-Xa/ACT) yapılamaması.',
          'Aktif spinal/epidural ponksiyon veya epidural kateter çekilmesi esnasında terapötik antikoagülasyon (ASRA 4–6 sa + normal aPTT şart!).',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Yüksek Dikkat Durumları"
        relativeItems={[
          'Yakın geçirilmiş (<14 gün) intrakraniyal/spinal/göz cerrahisi, hemorajik inme veya şiddetli kontrolsüz hipertansiyon (>180–200/110 mmHg).',
          'Aktif peptik ülser, özofagus varisleri, enfektif endokardit (mikotik anevrizma/hemorajik dönüşüm riski) veya ağır karaciğer yetmezliği (bazal aPTT uzunsa Anti-Xa ile izle!).',
          'Eşzamanlı DAPT / trombolitik / NSAİİ kullanımı (kanama riski katlanır).',
          'Kronik (>1 ay) yüksek doz kullanımda osteoporoz ve hipoaldosteronizme bağlı HİPERKALEMİ (KBY/DM/ACEİ hastalarında K⁺ izle!).',
        ]}
        clinicalNote="ASRA 2018 & ESAIC 2022 Altın Kuralı: Terapötik IV UFH ponksiyon ve kateter çekiminden 4–6 saat önce durdurulup NORMAL aPTT teyit edilmelidir; profilaktik SC 5.000 IU (≤15.000 IU/gün) için 4–6 saat bekleme yeterlidir; ponksiyon sonrası IV heparin en erken ≥1 SAAT sonra verilir!"
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="ufh-indications"
        title="Klinik Endikasyonlar & Kanıta Dayalı Doz Protokolleri (CHEST · ESC · EACTS · KDIGO)"
        subtitle="Anestezi, kalp-damar cerrahisi, yoğun bakım, acil ve diyalizde standart IV/SC rejimler"
        icon={<BookOpen className="w-5 h-5 text-teal-500 shrink-0" />}
        defaultOpen={false}
      >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  1. DVT / Masif Pulmoner Emboli (Raschke Nomogramı)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  80 IU/kg → 18 IU/kg/sa
                </span>
              </div>
              <p className={mutedText}>
                Özellikle <strong>eGFR &lt;30 mL/dk</strong>, tromboliz/trombektomi adayı masif PE veya yüksek kanama
                riskli YBÜ hastasında 1. tercih: <strong>80 IU/kg IV bolus</strong> →{' '}
                <strong>18 IU/kg/sa IV infüzyon</strong>; 6 saatte bir aPTT (1,5–2,5×) veya Anti-Xa (0,3–0,7 IU/mL) ile
                titre edilir.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  2. AKS (NSTE-ACS / STEMI) &amp; Primer PCI (ESC 2023)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  60 / 12 (Tavanlı) · PCI 70–100
                </span>
              </div>
              <p className={mutedText}>
                <strong>NSTE-ACS / Fibrinoliz:</strong> <strong>60 IU/kg</strong> (maks <strong>4.000 IU</strong>) IV
                bolus → <strong>12 IU/kg/sa</strong> (maks <strong>1.000 IU/sa</strong>).{' '}
                <strong>Primer PCI:</strong> <strong>70–100 IU/kg</strong> IV (GPIIb/IIIa varsa 50–70 IU/kg), hedef ACT
                250–300 sn.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  3. Kardiyopulmoner Bypass (KPB), ECMO &amp; Vasküler Cerrahi
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  KPB 300–400 IU/kg
                </span>
              </div>
              <p className={mutedText}>
                <strong>KPB:</strong> <strong>300–400 IU/kg</strong> santral IV → <strong>ACT ≥400–480 sn</strong>;
                çıkışta Protamin 0,8–1,0 mg/100 IU! <strong>Vasküler Klemp:</strong> <strong>50–100 IU/kg</strong>{' '}
                (~5.000 IU) IV → ACT 200–250 sn. <strong>ECMO:</strong> 50–100 IU/kg kanülasyon → 10–20 IU/kg/sa (hedef
                ACT 180–200 sn veya Anti-Xa 0,3–0,5).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. VTE Profilaksisi SC &amp; Hemodiyaliz Devresi
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  5.000 IU SC q8–12sa
                </span>
              </div>
              <p className={mutedText}>
                <strong>Profilaksi (eGFR &lt;30 / ABH 1. tercih):</strong> <strong>5.000 IU SC q8–12sa</strong> (yüksek
                risk/obezde q8sa). <strong>IHD Devresi:</strong> 25–50 IU/kg (1.000–3.000 IU) başlangıç → 500–1.500
                IU/sa (diyaliz bitiminden 30–60 dk önce durdur).
              </p>
            </div>
          </div>
      </MonographAccordionSection>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="ufh-calc"
        title="UFH Doz/Pompa, Protamin Antidot, HIT 4T Skoru & ASRA 2018 Hesaplayıcısı"
        subtitle="TR 25.000 IU / 5 mL (5.000 IU/mL) flakon hacmi, zaman bazlı Protamin, 4T skoru ve nöraksiyel rehber"
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

          {/* Sekmeler */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
            {[
              { id: 'dosing_calc' as CalcTab, label: '1. Doz & Pompa', icon: Syringe },
              { id: 'protamine_calc' as CalcTab, label: '2. Protamin Antidot', icon: HeartPulse },
              { id: 'hit_4t' as CalcTab, label: '3. HIT 4T Skoru', icon: ShieldAlert },
              { id: 'asra_resistance' as CalcTab, label: '4. ASRA & Direnç', icon: Activity },
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

          {/* TAB 1: DOZ & İNFÜZYON POMPASI */}
          {activeTab === 'dosing_calc' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label htmlFor={`${uniqueId}-ufhwt`} className="block text-xs font-bold mb-1">
                      Hasta Ağırlığı (TBW): <span className="text-teal-600 dark:text-teal-400">{weightKg} kg</span>
                    </label>
                    <input
                      id={`${uniqueId}-ufhwt`}
                      type="range"
                      min={40}
                      max={160}
                      step={1}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1.5">Klinik Endikasyon</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'vte_raschke' as UfhIndication, label: 'VTE / DVT-PE (80 / 18)' },
                        { id: 'acs_nstemi' as UfhIndication, label: 'AKS / NSTE-ACS (60 / 12)' },
                        { id: 'primary_pci' as UfhIndication, label: 'Primer PCI (70–100 IU/kg)' },
                        { id: 'cpb_cardiac' as UfhIndication, label: 'KPB / Açık Kalp (300–400)' },
                        { id: 'vascular_clamp' as UfhIndication, label: 'Vasküler Klemp (50–100)' },
                        { id: 'sc_prophylaxis' as UfhIndication, label: 'VTE Profilaksi SC (5.000)' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setIndication(opt.id)}
                          className={`p-2 rounded-xl border text-left text-xs font-bold ${
                            indication === opt.id
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

                  {(indication === 'vte_raschke' || indication === 'acs_nstemi') && (
                    <div>
                      <label className="block text-xs font-bold mb-1.5">İnfüzyon Dilüsyonu (TR 25.000 IU / 5 mL)</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setBagConc('100_iu_ml')}
                          className={`p-2 rounded-xl border text-xs font-bold ${
                            bagConc === '100_iu_ml'
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : isDark
                                ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          25.000 IU / 250 mL (100 IU/mL · Önerilen!)
                        </button>
                        <button
                          type="button"
                          onClick={() => setBagConc('500_iu_ml')}
                          className={`p-2 rounded-xl border text-xs font-bold ${
                            bagConc === '500_iu_ml'
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : isDark
                                ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          25.000 IU / 50 mL (500 IU/mL · Perfüzör)
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Çıktı */}
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    {doseRes.title}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="text-[10px] font-bold uppercase opacity-70">Yükleme / Tek Doz</div>
                      <div className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">
                        {doseRes.bolusRange || `${doseRes.bolusIu.toLocaleString('tr-TR')} IU`}
                      </div>
                      <div className="text-[11px] opacity-75">
                        5.000 IU/mL flakon: <strong>{doseRes.bolusVialRange || `${doseRes.bolusVialMl} mL`}</strong>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="text-[10px] font-bold uppercase opacity-70">İdame İnfüzyon</div>
                      <div className="text-base sm:text-lg font-black text-teal-600 dark:text-teal-400">
                        {doseRes.infIuHr > 0 ? `${doseRes.infIuHr.toLocaleString('tr-TR')} IU/sa` : 'Rutin İnf. Yok'}
                      </div>
                      <div className="text-[11px] opacity-75">
                        {doseRes.infIuHr > 0
                          ? `Pompa: ${doseRes.infRateMlHr} mL/sa (${concIuPerMl} IU/mL)`
                          : 'ACT / Klinik rehberli bolus'}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30 text-xs">
                    <strong>İzlem Hedefi:</strong> {doseRes.target}
                  </div>
                  <div className={`p-3 rounded-xl border text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <p className={mutedText}>{doseRes.note}</p>
                  </div>
                </div>
              </div>

              {/* Raschke aPTT Titrasyon Mini Tablosu */}
              {indication === 'vte_raschke' && (
                <div className={`p-3.5 rounded-xl border text-xs overflow-x-auto ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="font-black mb-2 text-teal-600 dark:text-teal-400">
                    Klasik Raschke VTE aPTT Titrasyon Rehberi (6 Saatte Bir Kontrol · Kurum aPTT Referansına Göre Uyarla!):
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-300 dark:border-slate-700">
                        <th className="py-1.5 pr-3">aPTT (veya Kontrol Oranı)</th>
                        <th className="py-1.5 pr-3">Ek Bolus / Ara</th>
                        <th className="py-1.5">İnfüzyon Hızı Değişikliği</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      <tr>
                        <td className="py-1.5 pr-3 font-bold">&lt;35 sn (&lt;1,2×)</td>
                        <td className="py-1.5 pr-3">80 IU/kg yeniden bolus ({Math.round((weightKg * 80) / 100) * 100} IU)</td>
                        <td className="py-1.5">+4 IU/kg/sa artır (+{Math.round(weightKg * 4)} IU/sa)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-3 font-bold">35–45 sn (1,2–1,5×)</td>
                        <td className="py-1.5 pr-3">40 IU/kg yeniden bolus ({Math.round((weightKg * 40) / 100) * 100} IU)</td>
                        <td className="py-1.5">+2 IU/kg/sa artır (+{Math.round(weightKg * 2)} IU/sa)</td>
                      </tr>
                      <tr className="bg-emerald-500/10">
                        <td className="py-1.5 pr-3 font-black text-emerald-700 dark:text-emerald-300">46–70 / 60–85 sn (1,5–2,5×)</td>
                        <td className="py-1.5 pr-3 font-bold">DEĞİŞİKLİK YOK (Terapötik!)</td>
                        <td className="py-1.5 font-bold">Aynı hızda devam (2 ardışık terapötik sonrası q24sa)</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 pr-3 font-bold">71–90 sn (2,5–3,0×)</td>
                        <td className="py-1.5 pr-3">Bolus yok</td>
                        <td className="py-1.5">−2 IU/kg/sa azalt (−{Math.round(weightKg * 2)} IU/sa)</td>
                      </tr>
                      <tr className="bg-rose-500/10">
                        <td className="py-1.5 pr-3 font-black text-rose-700 dark:text-rose-300">&gt;90 sn (&gt;3,0×)</td>
                        <td className="py-1.5 pr-3 font-bold">İnfüzyonu 1 SAAT DURDUR!</td>
                        <td className="py-1.5 font-bold">−3 IU/kg/sa azalt (−{Math.round(weightKg * 3)} IU/sa · Kanama kontrolü!)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROTAMİN SÜLFAT ANTİDOT HESAPLAYICISI */}
          {activeTab === 'protamine_calc' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Heparin Uygulama Tipi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'iv_bolus' as ProtamineMode, label: 'IV Bolus Sonrası' },
                      { id: 'iv_infusion' as ProtamineMode, label: 'Sürekli IV İnfüzyon' },
                      { id: 'cpb_reversal' as ProtamineMode, label: 'KPB Çıkışı (Açık Kalp)' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setProtMode(m.id)}
                        className={`p-2 rounded-xl border text-xs font-bold ${
                          protMode === m.id
                            ? 'bg-rose-600 text-white border-rose-600'
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

                {protMode === 'iv_bolus' && (
                  <>
                    <div>
                      <label htmlFor={`${uniqueId}-boliu`} className="block text-xs font-bold mb-1">
                        Verilen IV Bolus (IU): <span className="text-rose-600 dark:text-rose-400">{bolusIu.toLocaleString('tr-TR')} IU</span>
                      </label>
                      <input
                        id={`${uniqueId}-boliu`}
                        type="range"
                        min={1000}
                        max={10000}
                        step={500}
                        value={bolusIu}
                        onChange={(e) => setBolusIu(Number(e.target.value))}
                        className="w-full accent-rose-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1.5">Bolustan Beri Geçen Süre (t½ ~60 dk)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'lt30' as BolusElapsed, label: '<30 dk (1,0 mg/100 IU)' },
                          { id: '30_60' as BolusElapsed, label: '30–60 dk (0,5–0,75 mg)' },
                          { id: '60_120' as BolusElapsed, label: '60–120 dk (0,375–0,5 mg)' },
                          { id: 'gt120' as BolusElapsed, label: '>120 dk (0,25–0,375 mg)' },
                        ].map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setElapsedBucket(b.id)}
                            className={`p-2 rounded-xl border text-xs font-bold ${
                              elapsedBucket === b.id
                                ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                                : isDark
                                  ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                  : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {protMode === 'iv_infusion' && (
                  <div>
                    <label htmlFor={`${uniqueId}-infiu`} className="block text-xs font-bold mb-1">
                      Devam Eden İnfüzyon Hızı (IU/sa):{' '}
                      <span className="text-rose-600 dark:text-rose-400">{infusionRateIuHr.toLocaleString('tr-TR')} IU/sa</span>
                    </label>
                    <input
                      id={`${uniqueId}-infiu`}
                      type="range"
                      min={400}
                      max={3000}
                      step={100}
                      value={infusionRateIuHr}
                      onChange={(e) => setInfusionRateIuHr(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                )}

                {protMode === 'cpb_reversal' && (
                  <div>
                    <label htmlFor={`${uniqueId}-cpbiu`} className="block text-xs font-bold mb-1">
                      KPB Başlangıç / Hesaplanan Aktif Heparin (IU):{' '}
                      <span className="text-rose-600 dark:text-rose-400">{cpbTotalIu.toLocaleString('tr-TR')} IU</span>
                    </label>
                    <input
                      id={`${uniqueId}-cpbiu`}
                      type="range"
                      min={10000}
                      max={50000}
                      step={1000}
                      value={cpbTotalIu}
                      onChange={(e) => setCpbTotalIu(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                )}
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70">Protamin Sülfat Dozu</div>
                    <div className="text-lg font-black text-rose-600 dark:text-rose-400">
                      {protRes.rangeMg || `${protRes.mg} mg`}
                    </div>
                    <div className="text-[11px] opacity-75">
                      TR Ampul (50 mg/5 mL): <strong>{protRes.rangeMl || `${protRes.ml} mL`}</strong>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-bold uppercase opacity-70">Min. Yavaş IV Süre</div>
                    <div className="text-lg font-black text-teal-600 dark:text-teal-400">
                      ≥{protRes.minMinutes} dakika
                    </div>
                    <div className="text-[11px] opacity-75">Non-KPB hız sınırı ≤5 mg/dk!</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30 text-xs">
                  <strong>Hesap Gerekçesi:</strong> {protRes.rationale}
                </div>

                <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30 text-xs space-y-1">
                  <div className="font-black text-rose-700 dark:text-rose-300">
                    Protamin Güvenlik Uyarıları (Tip I · II · III &amp; Aşırı Doz):
                  </div>
                  <p>
                    Hızlı puşe hipotansiyon (Tip I), anafilaksi (Tip II — NPH insülin, balık alerjisi, vazektomi!) ve
                    ani pulmoner vazokonstriksiyon/sağ kalp yetmezliği (Tip III) yapar! <strong>Aşırı Protamin kendi
                    başına antikoagülandır</strong> — 5–15 dk sonra ACT/aPTT kontrolüyle yetinin!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HIT 4T SKORU */}
          {activeTab === 'hit_4t' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3 text-xs">
                {[
                  {
                    title: '1. Trombositopeni (Thrombocytopenia)',
                    val: tPlt,
                    set: setTPlt,
                    opts: [
                      { s: 2, t: '2p: >%50 düşüş VE nadir ≥20.000/µL' },
                      { s: 1, t: '1p: %30–50 düşüş veya nadir 10–19.000' },
                      { s: 0, t: '0p: <%30 düşüş veya nadir <10.000' },
                    ],
                  },
                  {
                    title: '2. Zamanlama (Timing)',
                    val: tTiming,
                    set: setTTiming,
                    opts: [
                      { s: 2, t: '2p: 5–10. gün düşüş VEYA ≤1 gün (son 30g heparin!)' },
                      { s: 1, t: '1p: >10. gün veya ≤1 gün (30–100g önce heparin)' },
                      { s: 0, t: '0p: ≤4 gün (yakın heparin öyküsü yok)' },
                    ],
                  },
                  {
                    title: '3. Tromboz / Sekel (Thrombosis)',
                    val: tThrombosis,
                    set: setTThrombosis,
                    opts: [
                      { s: 2, t: '2p: Yeni tromboz, cilt nekrozu veya IV bolus reaksiyonu' },
                      { s: 1, t: '1p: Progresif/rekürren tromboz veya şüpheli tromboz' },
                      { s: 0, t: '0p: Yok' },
                    ],
                  },
                  {
                    title: '4. Diğer Trombositopeni Nedenleri (oTher)',
                    val: tOther,
                    set: setTOther,
                    opts: [
                      { s: 2, t: '2p: Başka açık neden YOK' },
                      { s: 1, t: '1p: Olası başka neden var (sepsis/ilaç)' },
                      { s: 0, t: '0p: Kesin başka neden var' },
                    ],
                  },
                ].map((row, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="font-bold">{row.title}</div>
                    <div className="grid grid-cols-1 gap-1">
                      {row.opts.map((o) => (
                        <button
                          key={o.s}
                          type="button"
                          onClick={() => row.set(o.s)}
                          className={`px-3 py-1.5 rounded-lg border text-left font-semibold ${
                            row.val === o.s
                              ? 'bg-rose-600 text-white border-rose-600'
                              : isDark
                                ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          {o.t}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div
                  className={`p-4 rounded-xl border-2 space-y-1.5 ${
                    fourTVdict.tone === 'emerald'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                      : fourTVdict.tone === 'amber'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100'
                        : 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                  }`}
                >
                  <div className="text-sm font-black">4T Skoru: {fourTVdict.label}</div>
                  <p className="text-xs leading-relaxed">{fourTVdict.action}</p>
                </div>

                <div className={`p-3 rounded-xl border text-xs space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="font-black text-rose-600 dark:text-rose-400">HIT’te 3 ÖLÜMCÜL YASAK:</div>
                  <ul className="list-disc pl-4 space-y-0.5 opacity-90">
                    <li><strong>DMAH (Enoksaparin) VERME!</strong> (%80–90 çapraz reaksiyon!)</li>
                    <li><strong>Plt &lt;150.000/µL iken Varfarin BAŞLAMA!</strong> (Protein C düşüşü → venöz ekstremite gangreni; zaten alıyorsa K vitamini ver!)</li>
                    <li><strong>Profilaktik Trombosit Transfüzyonu YAPMA!</strong> (Trombozu alevlendirir!)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ASRA 2018 & HEPARİN DİRENCİ */}
          {activeTab === 'asra_resistance' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <div className="text-xs font-bold">ASRA 2018 / ESAIC 2022 Nöraksiyel Rejim Seçin:</div>
                {(Object.keys(asraMeta) as AsraRegimen[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setAsraRegimen(key)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold ${
                      asraRegimen === key
                        ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {asraMeta[key].label}
                  </button>
                ))}

                <div className="p-3.5 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs space-y-1">
                  <div className="font-black text-amber-800 dark:text-amber-200">
                    Heparin Direnci Yönetimi (KPB &gt;500 IU/kg veya YBÜ &gt;35.000 IU/gün):
                  </div>
                  <p>
                    1) Önce IV hattın açıklığını ve dozun gerçekten damara gittiğini doğrula;{' '}
                    2) Anti-Xa ölç (yüksek FVIII/fibrinojen yalancı kısa aPTT yapabilir!);{' '}
                    3) Gerçek AT-III eksikliğinde <strong>AT-III konsantresi (500–1.000 IU)</strong> veya{' '}
                    <strong>2–4 ünite TDP (FFP)</strong> uygula; yanıt yoksa <strong>Bivalirudin/Argatroban</strong>!
                  </p>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2.5 text-xs ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-black text-sm text-rose-600 dark:text-rose-400">
                  {asraMeta[asraRegimen].label}
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>Ponksiyon Öncesi Bekleme:</strong> {asraMeta[asraRegimen].preHold}
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>Laboratuvar Kontrolü:</strong> {asraMeta[asraRegimen].labCheck}
                </div>
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>Yeniden Başlama:</strong> {asraMeta[asraRegimen].postResume}
                </div>
                <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
                  <strong>Epidural Kateter Notu:</strong> {asraMeta[asraRegimen].catheterNote}
                </div>
              </div>
            </div>
          )}
      </MonographAccordionSection>

      {/* 8. TÜRKİYE PİYASA FORMLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="ufh-tr"
        preparations={[
          {
            name: 'Nevparin® / Vasparin® / Koparin® / Poliparin® 25.000 IU / 5 mL Flakon',
            presentation: '5 mL çoklu doz cam flakon (Heparin Sodyum)',
            concentration: '5.000 IU/mL (25.000 IU / 5 mL — YÜKSEK KONSANTRASYON!)',
            saltOrBaseNote:
              'Türkiye ameliyathane ve YBÜ’lerindeki standart flakon! 1 mL = 5.000 IU; 0,5 mL = 2.500 IU! ASLA doğrudan arter/kateter yıkama (flush) olarak kullanma!',
            alertLevel: 'high',
          },
          {
            name: 'Protamin Sülfat Antidot (Promin® / Protamin® 50 mg / 5 mL Ampul)',
            presentation: '5 mL ampul = 50 mg (5.000 Anti-Heparin IU)',
            concentration: '10 mg/mL (1 mL = 10 mg → 1.000 IU UFH nötralize eder)',
            saltOrBaseNote:
              'Heparin bulunan her ameliyathane ve YBÜ acil arabasında hazır bulunmalıdır — DAİMA ≤5 mg/dk yavaş IV uygulanır!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Standart YBÜ İnfüzyon Torbası (100 IU/mL — Önerilen): 5 mL (25.000 IU) flakon + 245 mL %0,9 NaCl (veya %5 Dekstroz) = 250 mL (100 IU/mL) → 1.000 IU/sa = 10 mL/sa!',
          'Sıvı Kısıtlamalı Perfüzör (500 IU/mL — Yüksek Uyarı!): 5 mL (25.000 IU) flakon + 45 mL %0,9 NaCl = 50 mL (500 IU/mL) → 1.000 IU/sa = 2 mL/sa (mutlaka kırmızı yüksek uyarı etiketi yapıştır!).',
          'Arter Basınç Transdüser Yıkaması: Güncel anestezi/YBÜ pratiğinde heparinli yıkama yerine düz %0,9 NaCl önerilir (HIT maruziyetini önlemek için!).',
        ]}
        concentrationTrapWarning={'5.000 IU/mL FLAKON & "U" KISALTMA TUZAĞI: (1) 5.000 IU/mL flakondan yanlışlıkla yıkama yapmak ölümcül intrakraniyal/cerrahi kanamaya yol açar! (2) Orderlarda ASLA "5000 U" yazma — daima "5.000 IU" veya "5.000 Ünite" yaz ve infüzyonları mutlaka çift hemşire/hekim kontrolüyle başlat!'}
      />

      {/* 9. DAMAR YOLU & UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="ufh-compat"
        accessRequirement="peripheral-ok"
        accessSummary="IV sürekli infüzyon veya IV bolus (periferik veya santral — KPB 300–400 IU/kg mutlaka kan dönüşü doğrulanmış santral hattan!) ve SC (karın ön duvarı, derin yağ dokusu) uygulanır. IM enjeksiyon KESİNLİKLE YASAKTIR!"
        phRange="5,0 – 7,5 (Güçlü Anyonik — Katyonik İlaçlarla Çökelir!)"
        osmolalityNote="Standart 100 IU/mL SF/%5D infüzyonu izotoniktir; torba hazırlandıktan sonra yoğunluk tabakalaşmasını (pooling) önlemek için mutlaka birkaç kez ters-düz edilip iyice karıştırılmalıdır!"
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF — 1. tercih)',
          '%5 Dekstroz (D5W)',
          'Ringer Laktat (RL)',
        ]}
        stabilityNote="Hazırlanan 100 IU/mL SF/%5D infüzyon çözeltisi oda sıcaklığında 24 saat stabildir; çoklu doz 5 mL flakonlar (benzil alkol koruyuculu olanlar) açıldıktan sonra kurum enfeksiyon kontrol süresine uyulmalı, yenidoğanda koruyucusuz form tercih edilmelidir."
        ySiteCompatible={[
          '%0,9 NaCl · %5 Dekstroz · Ringer Laktat · Potasyum Klorür · İnsülin · Noradrenalin · Adrenalin · Fentanil · Midazolam',
        ]}
        ySiteIncompatible={[
          'Amiodaron · Dobutamin · Haloperidol · Vankomisin · Gentamisin · Tobramisin · Siprofloksasin · Alteplaz · Diazepam (ANYONİK-KATYONİK ÇÖKELME — AYRI LÜMEN!)',
          'Protamin Sülfat (aynı hatta anında inaktivasyon!)',
        ]}
        extravasationProtocol="İzotonik dilüsyonun ekstravazasyonu doku nekrozu yapmaz ancak lokal ekimoz/hematom gelişir. İnfüzyonu durdurup yeni damar yolu açın ve bölgeye nazik basınç/soğuk uygulayın (SC enjeksiyon sonrası bölgeye masaj YAPMAYIN!)."
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="ufh-organ"
        renalSummary="Ağır böbrek yetmezliği (eGFR <30), ABH, Hemodiyaliz (IHD) ve CRRT’de 1. TERCİH parenteral antikoagülandır! Terapötik dozlarda birikmez, doz ayarı gerektirmez ve Protaminle %100 geri çevrilebilir (hemodiyalizle temizlenmez!)."
        renalDetails={[
          'eGFR <30 / ABH / IHD / CRRT: Profilakside 5.000 IU SC q8–12sa; tedavide standart IV nomogram (aPTT/Anti-Xa kontrollü!).',
          'Not: Üremik trombosit disfonksiyonu nedeniyle kanama riski yine de yüksektir — 6 saatte bir aPTT/Anti-Xa izleyin.',
        ]}
        hepaticSummary="Child-Pugh B–C sirozda iki zıt tuzak vardır: bazal aPTT uzaması (aPTT heparini olduğundan yüksek gösterir → Anti-Xa 0,3–0,7 kullan!) VE AT-III sentez azalması (heparin direnci!). Aktif varis kanamasında kontrendikedir."
        hepaticDetails={[
          'Child-Pugh A: Standart doz.',
          'Child-Pugh B–C: Aktif varis kanaması yoksa ve kesin tromboz varsa bolussuz/düşük başlangıç hızıyla Anti-Xa hedefli titre edin!',
        ]}
        {...STANDALONE_ORGAN_PART2['heparin']}
      />

      {/* 11. GERİATRİ & OBEZİTE DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="ufh-special"
        geriatricReductionBadge=">65–75 Yaş (Özellikle Kadınlar): Artmış Kanama → Yakın aPTT / Anti-Xa!"
        geriatricPoints={[
          'Yaşlılarda (özellikle >70 yaş kadınlarda) aynı IU/kg infüzyonla daha yüksek aPTT ve majör kanama oranları görülür — AKS’de 60/12 (4.000/1.000 tavan) nomogramına sadık kalın ve 6. saat aPTT’yi asla atlamayın!',
          'Hiperkalemi Riski: Yaşlı, diyabetik veya ACEİ/ARB alan hastalarda >3–5 gün UFH aldosteron baskılanmasıyla serum K⁺’yı yükseltebilir!',
        ]}
        obesityWeightScalarBadge="VTE’de TBW (Yüksek Dozda Anti-Xa!) · KPB’de Lean/AdjBW Tartışmalı"
        obesityPoints={[
          'VTE Nomogramı (BMI ≥40): CHEST / klinik çalışmalar gerçek ağırlıkla (TBW) başlanmasını (bazı kurumlarda bolus 10.000 IU / infüzyon 2.000–2.500 IU/sa başlangıç tavanıyla) ve 6. saatte Anti-Xa (0,3–0,7) ile titrasyonu önerir.',
          'Morbid Obez VTE Profilaksisi: BMI ≥40 kg/m² hastalarda standart 5.000 IU q12sa yetersiz kalabilir → 5.000 IU SC q8sa (veya 7.500 IU q8sa) tercih edilir!',
        ]}
        clinicalNote="Morbid obezitede (BMI ≥40) doz değerlendirmesi ve TBW/AdjBW karşılaştırması için:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Standart Heparin (UFH)"
        recommendedScalar="TBW"
        secondaryScalar={{ type: 'AdjBW', context: 'Morbid Obezite (BMI ≥40) İlk Bolus/İnf. Tavan & KPB' }}
        rationale="VTE tedavisinde ağırlık bazlı (TBW) nomogram kullanılır; BMI ≥40’ta aşırı aPTT sıçramalarını önlemek için ilk infüzyonun 6. saatte Anti-Xa ile titrasyonu ve KPB’de ideal/düzeltilmiş ağırlık kontrolü önerilir."
        currentWeightKg={weightKg}
        onApplyWeight={(w) => setWeightKg(Math.max(40, Math.min(160, Math.round(w))))}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="ufh-preg"
        pregnancySummary="Büyük molekül ağırlığı nedeniyle PLASENTAYI GEÇMEZ! Teratojenik değildir ve fetüste antikoagülasyon yapmaz — özellikle 36. gebelik haftasından sonra (doğum/epidural planlaması için DMAH’tan UFH’ye geçiş!) ve gebelikte mekanik kalp kapağı/masif PE’de temel güvenli antikoagülandır!"
        pregnancyDetails={[
          'Doğum & Epidural Avantajı: 36. haftada DMAH’tan (Enoksaparin) kısa yarı ömürlü UFH’ye geçilmesi, doğum başladığında 4–6 saat içinde (+ normal aPTT) güvenli epidural analjezi ve gerekirse Protaminle anında geri çevirme olanağı sunar!',
          'Uzun Süreli Gebelik Uyarısı: Gebelik boyunca uzun süre UFH kullanımı maternal osteoporoz ve HIT riskini DMAH’tan daha fazla artırır (bu yüzden ilk 36 haftada genelde DMAH, 36. haftadan doğuma kadar UFH tercih edilir!).',
        ]}
        lactationSummary="Yüksek molekül ağırlığı nedeniyle ANNE SÜTÜNE GEÇMEZ (geçse bile bebeğin midesinde parçalanır) — emzirme döneminde TAMAMEN GÜVENLİDİR!"
        lactationDetails={[
          'Postpartum antikoagülasyon gereken emziren annelerde emzirmeye hiçbir ara vermeden güvenle uygulanır.',
        ]}
      />

      {/* 13. YAN ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="ufh-adr"
        items={[
          {
            title: 'Majör & Minör Kanama (GİS, Retroperitoneal, İntrakraniyal, Cerrahi)',
            incidenceOrSeverity: 'En Sık Majör Risk (%1–5) · Protaminle %100 Geri Döner!',
            detail:
              'aPTT >3× veya ileri yaş/böbrek yetmezliği/eşzamanlı antiplatelet ile artar; majör kanamada infüzyonu durdurup zaman bazlı Protamin Sülfat uygula!',
            tone: 'rose',
          },
          {
            title: 'HIT Tip II (İmmün Aracılı Heparin İlişkili Trombositopeni · Anti-PF4)',
            incidenceOrSeverity: 'UFH’de ~%1–3 (DMAH’tan 10× Sık!) · Ölümcül Tromboz!',
            detail:
              '5–10. günde (veya yakın maruziyette <24 sa!) Plt >%50 düşüş + venöz/arteriyel tromboz! 4T ≥4 ise TÜM heparini kes, non-heparin antikoagülan başla; DMAH/erken Varfarin/Plt YASAK!',
            tone: 'rose',
          },
          {
            title: 'Hiperkalemi (Hipoaldosteronizm)',
            incidenceOrSeverity: 'Sık Gözden Kaçar · >3–5 Gün Kullanım',
            detail:
              'Adrenal zona glomerulozada aldosteron sentezini doğrudan baskılayarak özellikle KBY, diyabet ve ACEİ/ARB alan hastalarda serum K⁺’yı yükseltir!',
            tone: 'amber',
          },
          {
            title: 'Heparin İlişkili Osteoporoz & Vertebral Kırık',
            incidenceOrSeverity: 'Uzun Süreli (>1–3 Ay) Yüksek Doz Kullanım',
            detail:
              'Osteoblast inhibisyonu ve osteoklast aktivasyonuyla kemik mineral yoğunluğunu azaltır (uzun süreli gebelikte DMAH tercih nedenidir).',
            tone: 'amber',
          },
          {
            title: 'HIT Tip I (Benign Erken Trombositopeni) & Hafif Transaminaz Artışı',
            incidenceOrSeverity: 'Sık (%10–20) · Benign / Kendiliğinden Düzelir',
            detail:
              'İlk 1–4 günde Plt >100.000/µL kalacak şekilde hafif düşüş (tromboz yapmaz, tedavi kesilmeden düzelir) ve asemptomatik geçici ALT/AST yükselmesi.',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="ufh-cautions"
        items={[
          {
            title: 'aPTT vs Anti-Xa İzlemi: Ne Zaman aPTT Sizi Yanıltır?',
            detail:
              'Lupus antikoagülanı, Faktör XII eksikliği veya sirozda bazal aPTT zaten uzundur (aPTT aşırı antikoagülasyon sanılır!). Tam tersine sepsis, COVID-19, malignite veya gebelikte yüksek Faktör VIII ve fibrinojen aPTT’yi yalancı kısa gösterir (“psödo-heparin direnci” → gereksiz doz artırımıyla kanama!). Bu durumlarda mutlaka Anti-Xa (0,3–0,7 IU/mL) ile izleyin!',
          },
          {
            title: 'KPB Çıkışı Protamin Reaksiyonları (Tip I, II, III) Yönetimi',
            detail:
              'Tip I (hızlı infüzyon histamin hipotansiyonu) → yavaşlat + sıvı/vazopresör; Tip II (anafilaksi — NPH insülin/balık/vazektomi!) → Adrenalin + steroid + KPB’ye dönüş hazırlığı; Tip III (TXA₂ aracılı katastrofik pulmoner hipertansiyon & RV yetmezliği!) → Protamini DERHAL durdur, %100 O₂, inhale NO/milrinon/noradrenalin ve gerekirse tekrar heparinizasyonla KPB’ye dön!',
          },
          {
            title: 'Heparinli Kateter Yıkamalarından (Flush) Kaçınma',
            detail:
              'Arteriyel/santral hat yıkamalarında kullanılan çok düşük doz heparin bile HIT Tip II antikorlarını tetikleyebilir veya mevcut HIT’i alevlendirebilir — rutin arter transdüserlerinde yalnızca düz %0,9 NaCl kullanın!',
          },
          {
            title: 'HIT Şüphesinde Trombosit Takibi Ne Sıklıkla Yapılmalı?',
            detail:
              'Postoperatif ve YBÜ hastalarında (yüksek HIT riski) UFH başlangıcından 4. günden 14. güne kadar (veya kesilene kadar) 2–3 günde bir trombosit sayımı izlenmelidir.',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="ufh-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'AT-III Pentasakkarit Konformasyonel Katalizi & 18+ Sakkaritlik Trombin Köprüsü',
          summary:
            'Heparin kendi başına serin proteazları inhibe etmez; plazmadaki doğal antikoagülan Antitrombin-III’ün (AT-III) katalitik hızlandırıcısıdır:',
          points: [
            '1.000 Kat Hızlanma: Özgül yüksek afiniteli pentasakkarit dizisi (ticari UFH zincirlerinin ~1/3’ünde bulunur) AT-III’ün reaktif merkez halkasını açığa çıkararak FXa’yı anında inaktive eder.',
            'Trombin (FIIa) İçin Şablon (Template) Mekanizması: FIIa’yı inhibe edebilmek için heparin zincirinin ≥18 sakkarit uzunluğunda (~5.400 Da) olup hem AT-III’e hem trombine eşzamanlı köprü kurması gerekir — DMAH’ların çoğu <18 sakkarit olduğu için esasen FXa’yı, UFH ise 1:1 oranında hem FXa hem FIIa’yı bloke eder!',
            'Katalitik Döngü: AT-III–FIIa kompleksi oluştuktan sonra heparin kompleksten ayrılır ve yeni bir AT-III molekülünü aktive etmek üzere tekrar kullanılır.',
          ],
        }}
        intracellularSignaling={{
          title: 'HIT Tip II İmmünopatogenezi (PF4–Heparin IgG Kompleksi) & Endotelyal Bağlanma',
          summary:
            'UFH’nin yüksek molekül ağırlığı ve yüksek negatif yük yoğunluğu iki benzersiz klinik fenomeni açıklar:',
          points: [
            'PF4–Heparin Kompleksi (HIT Tip II): Trombosit alfa-granüllerinden salınan katyonik Platelet Faktör 4 (PF4), uzun zincirli anyonik UFH ile bağlanınca neo-epitoplar açığa çıkar. Gelişen IgG antikorları trombosit FcγRIIa reseptörlerine bağlanarak masif trombosit aktivasyonu, mikropartikül salınımı ve trombin fırtınası (venöz + arteriyel tromboz!) tetikler.',
            'Yüksek Plazma Proteini Bağlanması → Değişken Yanıt: UFH akut faz proteinlerine (vWF, FVIII, PF4, fibrinojen, vitronektin) ve endotele non-spesifik bağlandığından hastalar arası yanıt çok değişkendir — bu nedenle terapötik kullanımda mutlaka laboratuvar titrasyonu gerekir!',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Koagülasyon Kaskadı & KPB / ECMO Devresi',
            tissueTarget: 'AT-III · Faktör IIa (Trombin) · Faktör Xa · Devre Yüzeyi',
            accent: 'teal',
            points: [
              'Yabancı yüzey temas aktivasyonunu (FXIIa/FXIa/FIIa) güçlü baskıladığı için KPB ve ECMO’nun rakipsiz standart antikoagülanıdır.',
              'Protamin ile dakikalar içinde %100 nötralize edilebilir.',
            ],
          },
          {
            systemTitle: 'Trombositler & Vasküler Endotel (HIT Tip II)',
            tissueTarget: 'PF4 · Trombosit FcγRIIa · Endotel Hücreleri',
            accent: 'rose',
            points: [
              'UFH’de HIT insidansı (~%1–3) DMAH’tan ~10 kat daha yüksektir (özellikle ortopedik/kardiyak cerrahi sonrası!).',
              '4T skoru ≥4 olduğunda tüm heparinler kesilip non-heparin antikoagülasyona geçilir.',
            ],
          },
          {
            systemTitle: 'Adrenal Korteks & Kemik Metabolizması',
            tissueTarget: 'Zona Glomeruloza (Aldosteron ↓) · Osteoblast / Osteoklast',
            accent: 'amber',
            points: [
              'Aldosteron sentezini baskılayarak KBY/DM/ACEİ hastalarında hiperkalemi oluşturabilir.',
              'Uzun süreli (>1–3 ay) tedavide osteoporoz ve spontan vertebral kırık riski taşır.',
            ],
          },
          {
            systemTitle: 'Böbrek, Plasenta & Nöraksiyel Kanal',
            tissueTarget: 'Retiküloendotelyal Sistem · Epidural Pleksus',
            accent: 'indigo',
            points: [
              'Ağır KBY/ABH’de birikmez; plasentayı ve anne sütünü geçmez.',
              'ASRA 2018’e göre 4–6 saat bekleme + normal aPTT ile nöraksiyel blok güvenle yönetilebilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'UFH vs DMAH (Enoksaparin) Klinik Seçim Prensibi',
          summary:
            'Klinikte hangi hastada UFH, hangi hastada DMAH seçileceğini belirleyen 4 temel kriter:',
          points: [
            'UFH Seç: eGFR <30 mL/dk / ABH / Diyaliz, yüksek kanama riski (hızlı %100 Protamin reversali!), yakın cerrahi/girişim planı, KPB/ECMO/vasküler cerrahi, 36. gebelik haftası sonrası doğuma hazırlık.',
            'DMAH (Enoksaparin) Seç: eGFR ≥30 mL/dk stabil VTE/profilaksi, ayaktan/servis kullanım kolaylığı, daha düşük HIT ve osteoporoz riski.',
          ],
        }}
        clinicalPearls={[
          'ASLA "U" Yazma — "IU" Yaz · 5.000 IU/mL Flakonu Flush Yapma: ISMP’nin en sık ölümcül ilaç hatasıdır!',
          'Protamini Yavaş Ver (≤5 mg/dk · ≥10–15 dk): Hızlı Protamin KPB çıkışında sağ kalp yetmezliği / pulmoner hipertansiyon (Tip III) patlatır!',
          '4T ≥4 = HIT Acili: DMAH verme, Plt <150.000’de Varfarin başlama, profilaktik trombosit verme — tüm heparin/flushları kes!',
          'KPB’de ACT ≥480 Olmuyor Mu? Heparin Direncinde AT-III / 2–4 Ü TDP (FFP) düşün!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="ufh-refs"
        drugName="Standart Heparin (UFH)"
        drugsComUrl="https://www.drugs.com/drug-interactions/heparin.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'D',
            agent: 'Diğer Antikoagülanlar, Trombolitikler (Alteplaz/Tenekteplaz), Antiplateletler (DAPT) & NSAİİ’ler',
            mechanism: 'Sinerjik Hemostaz / Pıhtılaşma & Trombosit İnhibisyonu',
            clinicalEffect:
              'Majör GİS, retroperitoneal, cerrahi ve intrakraniyal kanama riskinde dramatik artış.',
            management:
              'AKS/tromboliz gibi zorunlu kombinasyonlarda tavanlı dozlara (60 IU/kg maks 4.000 / 12 IU/kg/sa maks 1.000) uyun, Pantoprazol ekleyin ve yakın aPTT/Hb izleyin.',
          },
          {
            severity: 'D',
            agent: 'Potasyum Tutucu Diüretikler (Spironolakton), ACEİ / ARB & Potasyum Takviyeleri',
            mechanism: 'Heparin Kaynaklı Hipoaldosteronizm ile Aditif Potasyum Tutulumu',
            clinicalEffect:
              'Özellikle KBY ve diyabetik hastalarda klinik HİPERKALEMİ (aritmi riski!).',
            management:
              '>3–5 gün UFH alan riskli hastalarda serum K⁺ düzeyini düzenli izleyin.',
          },
          {
            severity: 'C',
            agent: 'IV Nitrogliserin (Yüksek Doz) & Sepsis/Yüksek FVIII',
            mechanism: 'Yüksek Doz IV Nitrogliserinle Bildirilen Geçici Heparin Direnci / Etki Azalması (Klinik Kanıt Değişken)',
            clinicalEffect:
              'Yüksek doz GTN kesildiğinde aPTT’de ani rebound yükselme ve kanama riski.',
            management:
              'IV Nitrogliserin başlandığında veya kesildiğinde aPTT/Anti-Xa kontrolü yapın.',
          },
          {
            severity: 'C',
            agent: 'Protamin Sülfat (Antidot — Fizikokimyasal Antagonizma)',
            mechanism: 'Katyonik Protamin ile Anyonik Heparinin İyonik Nötralizasyonu',
            clinicalEffect:
              'Antikoagülan etkinin anında ortadan kalkması; aşırı Protaminin kendisi antikoagülan etki yapar.',
            management:
              'Yalnızca tersine çevirme amacıyla, ayrı hattan ve ≤5 mg/dk yavaş IV uygulayın.',
          },
        ]}
        references={[
          {
            authors: 'Raschke RA, Reilly BM, Guidry JR, Fontana JR, Srinivas S',
            title: 'The weight-based heparin dosing nomogram compared with a "standard care" nomogram: a randomized controlled trial',
            journal: 'Annals of Internal Medicine',
            year: 1993,
            note: 'VTE tedavisinde 80 IU/kg bolus ve 18 IU/kg/sa ağırlık bazlı UFH nomogramını altın standart haline getiren landmark çalışma.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'Profilaktik SC (4–6 sa), yüksek doz SC (12–24 sa + aPTT), terapötik IV (4–6 sa + normal aPTT) ve intraop vasküler heparin (≥1 sa) nöraksiyel kuralları.',
          },
          {
            authors: 'Cuker A, Arepally GM, Chong BH, et al. (ASH Guidelines)',
            title: 'American Society of Hematology 2018 guidelines for management of venous thromboembolism: heparin-induced thrombocytopenia',
            journal: 'Blood Advances',
            year: 2018,
            note: 'HIT tanısında 4T skorlama algoritması, tüm heparinlerin kesilmesi, non-heparin antikoagülasyon ve erken Varfarin/trombosit yasağı.',
          },
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Task Force)',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes',
            journal: 'European Heart Journal',
            year: 2023,
            note: 'Primer PCI (70–100 IU/kg) ve NSTE-ACS (60 IU/kg maks 4.000 · 12 IU/kg/sa maks 1.000) UFH protokolleri.',
          },
          {
            authors: 'Shore-Lesserson L, Baker RA, Ferraris VA, et al. (STS / SCA / AmSECT)',
            title: 'Clinical Practice Guidelines — Anticoagulation During Cardiopulmonary Bypass',
            journal: 'Anesthesia & Analgesia / Annals of Thoracic Surgery',
            year: 2018,
            note: 'KPB’de 300–400 IU/kg UFH, hedef ACT ≥480 sn, heparin direncinde AT-III/TDP kullanımı ve Protamin titrasyon kılavuzu.',
          },
          {
            authors: 'Garcia DA, Baglin TP, Weitz JI, Samama MM (ACCP / CHEST)',
            title: 'Parenteral Anticoagulants: Antithrombotic Therapy and Prevention of Thrombosis, 9th ed',
            journal: 'CHEST',
            year: 2012,
            note: 'UFH farmakokinetiği, KBY’de güvenliği, aPTT vs Anti-Xa izlemi, zaman bazlı Protamin nötralizasyonu ve gebelik yönetimi.',
          },
        ]}
      />

      {/* Alt Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          ISMP High-Alert · Raschke · ASH HIT · ASRA 2018 · STS/SCA KPB · ESC 2023 ile Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Antitrombotik · Standart Heparin (UFH)
        </span>
      </div>
    </div>
  );
};
