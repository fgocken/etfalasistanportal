import React, { useId, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Baby,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Droplets,
  Flame,
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

type CalcTab = 'adult' | 'pediatric' | 'cumulative' | 'nac_overdose';
type PedAgeGroup = 'preterm' | 'term_neonate' | 'infant' | 'child';
type NacRegimen = 'two_bag_snap' | 'three_bag_prescott';

const IV_CONC_MG_ML = 10; // Türkiye standart IV şişe: 1000 mg / 100 mL = 10 mg/mL

interface AdultRiskFlag {
  id: string;
  label: string;
  sublabel: string;
  contraindicated?: boolean;
}

const ADULT_RISK_FLAGS: AdultRiskFlag[] = [
  {
    id: 'severe_liver',
    label: 'Ağır / Aktif Karaciğer Yetmezliği (Child-Pugh C · Akut Hepatit)',
    sublabel: 'FDA / EMA & TR KÜB: İV Parasetamol KONTRENDİKE!',
    contraindicated: true,
  },
  {
    id: 'mild_mod_liver',
    label: 'Hafif–Orta Karaciğer Hastalığı (Child-Pugh A–B)',
    sublabel: 'Günlük tavan ≤2000 mg/gün (alkol kesin yasak)',
  },
  {
    id: 'chronic_alcohol',
    label: 'Kronik Alkol Kullanımı / Alkolik Karaciğer Riski',
    sublabel: 'CYP2E1 indüksiyonu + glutatyon tükenmesi → maks ≤2000 mg/gün',
  },
  {
    id: 'malnutrition',
    label: 'Malnütrisyon / Uzamış Açlık / Kaşeksi / Dehidratasyon',
    sublabel: 'Düşük hepatik glutatyon rezervi → maks ≤2000 mg/gün + 5-oksoprolin riski',
  },
  {
    id: 'cyp2e1_inducer',
    label: 'CYP2E1 / Enzim İndükleyici (İzoniazid, Rifampisin, Karbamazepin, Fenitoin)',
    sublabel: 'NAPQI üretim artışı → günlük tavan ≤2000–3000 mg/gün',
  },
  {
    id: 'severe_ckd',
    label: 'Ağır Böbrek Yetmezliği (eGFR <30 mL/dk)',
    sublabel: 'Doz aralığını q6sa → q8sa uzat (maks 2–3 g/gün)',
  },
];

export const ParacetamolProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('adult');

  // Tab 1: Erişkin IV / Oral Dozaj & Risk Tavanı
  const [adultWeightKg, setAdultWeightKg] = useState<number>(72);
  const [adultRiskIds, setAdultRiskIds] = useState<string[]>([]);

  // Tab 2: Pediatrik & Yenidoğan (10× Hata Korumalı!)
  const [pedAgeGroup, setPedAgeGroup] = useState<PedAgeGroup>('child');
  const [pedWeightKg, setPedWeightKg] = useState<number>(16);

  // Tab 3: Kümülatif 24 Saatlik Günlük Doz Denetleyici
  const [cumIvMg, setCumIvMg] = useState<number>(2000);
  const [cumOralParolMg, setCumOralParolMg] = useState<number>(1000);
  const [cumComboMg, setCumComboMg] = useState<number>(650);
  const [cumMaxAllowedMg, setCumMaxAllowedMg] = useState<number>(4000);

  // Tab 4: Akut Doz Aşımı & N-Asetilsistein (NAC) Antidot Hesaplayıcı
  const [nacWeightKg, setNacWeightKg] = useState<number>(70);
  const [nacRegimen, setNacRegimen] = useState<NacRegimen>('two_bag_snap');

  // Akordiyon State (Varsayılan Kapalı)
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // Erişilebilirlik ID'leri
  const adultWeightSliderId = useId();
  const adultWeightInputId = useId();
  const pedWeightSliderId = useId();
  const pedWeightInputId = useId();
  const nacWeightSliderId = useId();
  const nacWeightInputId = useId();

  // --- HESAPLAMALAR ---
  // Tab 1: Erişkin
  const toggleAdultRisk = (id: string) => {
    setAdultRiskIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };
  const hasSevereLiver = adultRiskIds.includes('severe_liver');
  const hasHepatotoxRisk = adultRiskIds.some((id) =>
    ['mild_mod_liver', 'chronic_alcohol', 'malnutrition', 'cyp2e1_inducer'].includes(id)
  );
  const hasSevereCkd = adultRiskIds.includes('severe_ckd');
  const isLowWeightAdult = adultWeightKg < 50;

  const adultSingleDoseMg = isLowWeightAdult ? Math.round(adultWeightKg * 15) : 1000;
  const adultSingleDoseMl = Number((adultSingleDoseMg / IV_CONC_MG_ML).toFixed(1));
  const adultPumpRateMlHr = Math.round(adultSingleDoseMl * 4); // 15 dakikada infüzyon = mL × 4 mL/sa
  const adultDailyCapMg = hasSevereLiver
    ? 0
    : hasHepatotoxRisk
      ? Math.min(2000, isLowWeightAdult ? Math.round(adultWeightKg * 60) : 2000)
      : isLowWeightAdult
        ? Math.min(3000, Math.round(adultWeightKg * 60))
        : hasSevereCkd
          ? 3000
          : 4000;
  const adultIntervalHours = hasSevereCkd || hasHepatotoxRisk ? 8 : 6;
  const adultMaxDosesPerDay = adultDailyCapMg > 0 ? Math.floor(adultDailyCapMg / Math.max(1, adultSingleDoseMg)) : 0;

  // Tab 2: Pediatrik & Yenidoğan
  const pedConfig = (() => {
    switch (pedAgeGroup) {
      case 'preterm':
        return {
          label: 'Prematüre Yenidoğan (28–32 hf)',
          mgPerKg: 7.5,
          intervalHr: 8,
          maxDailyMgKg: 22.5,
          minW: 1,
          maxW: 4,
          note: 'Glukuronidasyon immatür (sülfasyon ağırlıklı); 7,5 mg/kg IV q8sa, maks 20–22,5 mg/kg/gün!',
        };
      case 'term_neonate':
        return {
          label: 'Term Yenidoğan (0–28 gün / >32–37 hf)',
          mgPerKg: 7.5,
          intervalHr: 6,
          maxDailyMgKg: 30,
          minW: 2,
          maxW: 6,
          note: 'Term yenidoğanda 7,5–10 mg/kg IV q6sa, maks 30 mg/kg/gün (bazı kılavuzlarda q6–8sa; >30 mg/kg/gün aşma!).',
        };
      case 'infant':
        return {
          label: 'Süt Çocuğu (1 ay – <2 yaş)',
          mgPerKg: 10,
          intervalHr: 6,
          maxDailyMgKg: 40,
          minW: 3,
          maxW: 15,
          note: '1 ay–<2 yaş IV: 7,5–10 mg/kg q6sa (maks 30–40 mg/kg/gün; 1 yaş üstü seçili olgularda 15 mg/kg’a çıkılabilir).',
        };
      default:
        return {
          label: 'Çocuk (≥2 yaş · <50 kg)',
          mgPerKg: 15,
          intervalHr: 6,
          maxDailyMgKg: 60,
          minW: 10,
          maxW: 50,
          note: '≥2 yaş IV: 15 mg/kg q6sa (maks 60 mg/kg/gün, tek doz tavan 1000 mg, günlük tavan 3000 mg [<50 kg] / 4000 mg [≥50 kg]).',
        };
    }
  })();

  const pedSingleMg = Math.min(1000, Math.round(pedWeightKg * pedConfig.mgPerKg));
  const pedSingleMl = Number((pedSingleMg / IV_CONC_MG_ML).toFixed(1));
  const pedPumpRateMlHr = Math.round(pedSingleMl * 4); // 15 dk infüzyon
  const pedDailyMaxMg = Math.min(pedWeightKg >= 50 ? 4000 : 3000, Math.round(pedWeightKg * pedConfig.maxDailyMgKg));
  const pedOral120Ml = Number(((pedSingleMg / 120) * 5).toFixed(1)); // 120 mg / 5 mL süspansiyon
  const pedOral250Ml = Number(((pedSingleMg / 250) * 5).toFixed(1)); // 250 mg / 5 mL süspansiyon

  // Tab 3: Kümülatif 24 Saat Denetleyici
  const cumTotalMg = cumIvMg + cumOralParolMg + cumComboMg;
  const cumRemainingMg = cumMaxAllowedMg - cumTotalMg;
  const cumOverLimit = cumRemainingMg < 0;

  // Tab 4: NAC Antidot Hesaplayıcı (obezitede tavan 100–110 kg kuralı)
  const nacEffectiveKg = Math.min(100, nacWeightKg);
  const nacCapped = nacWeightKg > 100;
  // 2-Bag (SNAP / Wong & Graudins Modifiye): 200 mg/kg 4 sa (500 mL D5W) -> 100 mg/kg 16 sa (1000 mL D5W)
  const nac2Bag1Mg = Math.round(nacEffectiveKg * 200);
  const nac2Bag2Mg = Math.round(nacEffectiveKg * 100);
  // 3-Bag (Klasik Prescott 21 sa): 150 mg/kg 1 sa (200 mL) -> 50 mg/kg 4 sa (500 mL) -> 100 mg/kg 16 sa (1000 mL)
  const nac3Bag1Mg = Math.round(nacEffectiveKg * 150);
  const nac3Bag2Mg = Math.round(nacEffectiveKg * 50);
  const nac3Bag3Mg = Math.round(nacEffectiveKg * 100);
  const nacTotalMg = nacEffectiveKg * 300;
  const nacAmpules300 = Math.ceil(nacTotalMg / 300); // TR'de Asist® / Mucomyst® 300 mg / 3 mL IV ampul!

  // Yapılandırılmış Türkçe Klinik Order Özeti
  const buildCopySummary = (): string => {
    const activeOrder = (() => {
      if (activeTab === 'adult') {
        if (hasSevereLiver) {
          return `• Aktif Klinik Karar (Erişkin ${adultWeightKg} kg · Ağır/Aktif KC Yetmezliği): İV PARASETAMOL KONTRENDİKEDİR! Alternatif multimodal analjezi (opioid titrasyonu, rejyonal blok) planlayın.`;
        }
        return [
          `• Aktif Order (Erişkin IV Parasetamol · ${adultWeightKg} kg${isLowWeightAdult ? ' [<50 kg!]' : ''}):`,
          `  Tek Doz: ${adultSingleDoseMg} mg (${adultSingleDoseMl.toString().replace('.', ',')} mL [10 mg/mL Parol®/Perfalgan®]) 15 dk IV infüzyon (Pompa: ${adultPumpRateMlHr} mL/sa) · Aralık: q${adultIntervalHours}sa.`,
          `  Günlük Tavan: Maks ${adultDailyCapMg} mg/gün (en fazla ${adultMaxDosesPerDay} doz/gün; tüm oral/kombinasyon kaynaklar DAHİL!).`,
        ].join('\n');
      }

      if (activeTab === 'pediatric') {
        return [
          `• Aktif Order (Pediatrik IV · ${pedConfig.label} · ${pedWeightKg} kg · ${pedConfig.mgPerKg
            .toString()
            .replace('.', ',')} mg/kg):`,
          `  Tek Doz: ${pedSingleMg} mg = ${pedSingleMl.toString().replace('.', ',')} mL (10 mg/mL IV şişeden AYRI ENJEKTÖRE çek!) → 15 dk IV infüzyon (Pompa: ${pedPumpRateMlHr} mL/sa) · Aralık: q${pedConfig.intervalHr}sa.`,
          `  Günlük Tavan: Maks ${pedDailyMaxMg} mg/gün (${pedConfig.maxDailyMgKg.toString().replace('.', ',')} mg/kg/gün). Oral süsp. eşdeğeri: ${pedOral120Ml
            .toString()
            .replace('.', ',')} mL (120 mg/5 mL) veya ${pedOral250Ml.toString().replace('.', ',')} mL (250 mg/5 mL).`,
          `  10× DOZ HATASI UYARISI: ${pedSingleMg} mg = ${pedSingleMl.toString().replace('.', ',')} mL (ASLA ${pedSingleMg} mL değil!).`,
        ].join('\n');
      }

      if (activeTab === 'cumulative') {
        return `• Kümülatif 24 Saatlik Parasetamol Denetimi: IV (${cumIvMg} mg) + Oral (${cumOralParolMg} mg) + Kombinasyon (${cumComboMg} mg) = TOPLAM ${cumTotalMg} mg / Tavan ${cumMaxAllowedMg} mg → ${
          cumOverLimit
            ? `TAVAN ${Math.abs(cumRemainingMg)} mg AŞILDI! Ek doz VERME; ALT/AST/INR & 4. sa parasetamol düzeyi kontrol et!`
            : `Kalan güvenli pay: ${cumRemainingMg} mg.`
        }`;
      }

      if (nacRegimen === 'two_bag_snap') {
        return [
          `• Aktif Antidot Order (N-Asetilsistein [NAC] · 2-Torbalı Modifiye / SNAP 20 Saatlik Rejim · ${nacWeightKg} kg${
            nacCapped ? ' [100 kg tavanı!]' : ''
          }):`,
          `  1. Torba (4 saat): ${nac2Bag1Mg} mg (200 mg/kg) / 500 mL D5W → 125 mL/sa.`,
          `  2. Torba (16 saat): ${nac2Bag2Mg} mg (100 mg/kg) / 1000 mL D5W → 62,5 mL/sa.`,
          `  Toplam NAC: ${nacTotalMg} mg (TR Asist® 300 mg/3 mL ampul ≈ ${nacAmpules300} ampul). Bitişte ALT/AST/INR ve parasetamol düzeyi sıfırlanmadıysa 2. torbayı uzat!`,
        ].join('\n');
      }

      return [
        `• Aktif Antidot Order (N-Asetilsistein [NAC] · Klasik 3-Torbalı 21 Saatlik Prescott Rejimi · ${nacWeightKg} kg${
          nacCapped ? ' [100 kg tavanı!]' : ''
        }):`,
        `  1. Torba (1 saat): ${nac3Bag1Mg} mg (150 mg/kg) / 200 mL D5W → 200 mL/sa.`,
        `  2. Torba (4 saat): ${nac3Bag2Mg} mg (50 mg/kg) / 500 mL D5W → 125 mL/sa.`,
        `  3. Torba (16 saat): ${nac3Bag3Mg} mg (100 mg/kg) / 1000 mL D5W → 62,5 mL/sa.`,
        `  Toplam NAC: ${nacTotalMg} mg (TR Asist® 300 mg/3 mL ampul ≈ ${nacAmpules300} ampul).`,
      ].join('\n');
    })();

    return [
      `PARASETAMOL / ASETAMİNOFEN (Parol® · Perfalgan® · Partemol® 10 mg/mL 100 mL IV Flakon) KLİNİK ORDER ÖZETİ`,
      `• ATC: N02BE01 · Santral Analjezik & Antipiretik · Multimodal ERAS Temel Taşı · Antidot: N-Asetilsistein (NAC)`,
      activeOrder,
      `• KRİTİK GÜVENLİK: (1) ≥15 dk IV infüzyon (hızlı infüzyonda/YBÜ’de MAP düşüşü — hipotansiyon riski!). (2) <50 kg erişkinde 1000 mg sabit doz VERME (15 mg/kg, maks 60 mg/kg/gün). (3) Çocukta 100 mL şişeden AYRI ENJEKTÖRE çek (10× mg/mL hatası ölümcüldür!). (4) Tüm gizli kombinasyon preparatlarını günlük tavana dahil et!`,
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
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı & NAC' },
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
        tallManName="PARACETAMOL (ACETAMINOPHEN · 10 mg/mL IV)"
        confusionRiskWith="10× Pediatrik mg/mL Karışıklığı · Gizli Kombinasyonlar (Tylol Hot® / Zaldiar® / Geralgine-K®)"
        criticalAlerts={[
          'PEDİATRİK 10× DOZ HATASI (mg vs mL FELAKETİ!): Türkiye’deki IV Parasetamol şişeleri 1000 mg / 100 mL (= 10 mg/mL) formundadır! 10 kg bir bebeğe 150 mg (= 15 mL) yerine yanlışlıkla 100 mL şişenin tamamını takmak veya 150 mL vermek ölümcül fulminan karaciğer yetmezliği yapar! Çocukta (<50 kg) hesaplanan mL mutlaka 100 mL şişeden AYRI bir enjektöre/küçük torbaya çekilerek uygulanmalıdır!',
          'GİZLİ KÜMÜLATİF DOZ & <50 kg ERİŞKİN TUZAĞI: Erişkinde <50 kg (kaşektik, yaşlı kadın) hastaya standart 1000 mg q6sa (4 g/gün) vermek hepatotoksiktir → 15 mg/kg q6sa (maks 60 mg/kg/gün)! Ayrıca hastanın aynı gün aldığı oral Parol®, Zaldiar® (tramadol+parasetamol), Geralgine-K® veya soğuk algınlığı tozları günlük tavanın içine MUTLAKA eklenmelidir!',
          'KRİTİK HASTADA (YBÜ / SEPSİS) İV PARASETAMOL HİPOTANSİYONU: İV Parasetamol infüzyonu sırasında ve ilk 30–60 dk’da özellikle septik/hipovolemik/kardiyak hastalarda MAP’ta 10–15 mmHg düşüş sık görülür (%10–50 YBÜ insidansı; Kv7 vazodilatasyon + mannitol taşıyıcısı). Mutlaka ≥15 dakikada infüze edin ve vazopresör altındaki hastada KB’yi yakın izleyin!',
          'YÜKSEK HEPATOTOKSİSİTE RİSKİNDE TAVAN ≤2 g/GÜN & AĞIR KC YETMEZLİĞİNDE KONTRENDİKE: Kronik alkolizm, malnütrisyon/uzamış açlık, Child-Pugh A–B veya CYP2E1 indükleyici kullanımında günlük tavan ≤2000 mg/gün’dür; Child-Pugh C / akut karaciğer yetmezliğinde İV Parasetamol KONTRENDİKEDİR!',
        ]}
        antidoteOrRescue="SPESİFİK ANTİDOT: N-ASETİLSİSTEİN (NAC — TR: Asist® 300 mg / 3 mL IV ampul). Toksik NAPQI metabolitini nötralize etmek için hepatik glutatyon depolarını yeniler; alımdan sonraki ilk 8 saat içinde başlandığında hepatotoksisiteyi neredeyse %100 önler! 2-Torbalı güncel SNAP/Modifiye rejim (200 mg/kg 4 sa → 100 mg/kg 16 sa; daha az anafilaktoid reaksiyon) veya Klasik 3-Torbalı 21 saatlik Prescott rejimi (150 mg/kg 1 sa → 50 mg/kg 4 sa → 100 mg/kg 16 sa) uygulanır. Alımdan sonraki 4 saatte aktif kömür (1 g/kg PO) emilimi azaltır; masif zehirlenmede (EXTRIP 2014: >900–1000 mg/L + laktik asidoz/koma) acil hemodiyaliz endikedir."
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
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}
              >
                Non-Opioid Analjezik &amp; Antipiretik · Para-Aminofenol Türevi
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                ERAS Multimodal Temel Taşı · Trombosit/Böbrek Dostu · ≥15 dk IV
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
              >
                Parol® · Perfalgan® · Partemol® 10 mg/mL (1000 mg / 100 mL)
              </span>
              <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ATC: N02BE01</span>
            </div>

            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Parasetamol / Asetaminofen (Parol® · Perfalgan® · Partemol®) Monografisi
            </h1>

            <p className={`text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Klinik Kimlik &amp; Rol:</strong>{' '}
              Santral sinir sisteminde prostaglandin sentezinin <strong>peroksidaz (POX) bölgesini</strong> inhibe eden,
              inen serotonerjik ağrı inhibitör yolakları ve <strong>AM404 / endokannabinoid CB₁–TRPV1</strong> eksenini
              aktive ederek güçlü <strong>analjezik ve antipiretik</strong> etki gösteren non-opioid temel ajandır.
              NSAİİ&apos;lerin aksine periferik antiinflamatuvar etkisi zayıftır; buna karşın{' '}
              <strong>trombosit agregasyonunu bozmaz, GİS mukozasını ülsere etmez ve renal perfüzyonu düşürmez</strong>.
              Bu nedenle hem genel tıpta/pediatride/gebelikte 1. basamak ağrı ve ateş kesici, hem de ameliyathanede{' '}
              <strong>ERAS multimodal analjezi protokollerinin</strong> (opioid ihtiyacını %20–30 azaltan) vazgeçilmez
              temel taşıdır. En kritik riski <strong>NAPQI aracılı doz-bağımlı hepatotoksisite</strong> (spesifik
              antidot: <strong>N-Asetilsistein</strong>) ve kritik YBÜ hastalarında <strong>IV infüzyona bağlı geçici
              hipotansiyondur</strong>.
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
        sectionTitle="Etki Mekanizması & Santral Analjezik/Antipiretik Yolları (Yatak Başı Özet)"
        summary="Parasetamol klasik NSAİİ’ler gibi periferik siklooksijenaz (COX) aktif bölgesini yarışmalı bloke etmez; düşük peroksit ortamına sahip santral sinir sisteminde POX bölgesini indirger ve aktif metaboliti AM404 üzerinden endokannabinoid/serotonerjik analjezik sistemleri harekete geçirir."
        pillars={[
          {
            title: '1. Santral COX Peroksidaz (POX) İnhibisyonu → Antipiretik Etki',
            detail:
              'Hipotalamik preoptik termoregülasyon merkezinde prostaglandin E₂ (PGE₂) sentezini POX bölgesini indirgeyerek bloke eder; yüksek peroksitli periferik inflamasyon alanlarında etkisiz olduğundan GİS/trombosit/böbrek yan etkileri minimaldir.',
          },
          {
            title: '2. AM404 Metaboliti → TRPV1 & CB₁ Endokannabinoid Analjezi',
            detail:
              'Beyinde deasetilasyonla p-aminofenole, ardından FAAH enzimiyle araşidonik asit konjugatı AM404’e dönüşür; AM404, TRPV1 ve CB₁ reseptörleri üzerinden santral ağrı iletimini baskılar.',
          },
          {
            title: '3. İnen Serotonerjik (5-HT) Ağrı İnhibisyon Yolağı',
            detail:
              'Beyin sapından medulla spinalis arka boynuzuna inen serotonerjik inhibitör yolakları güçlendirir — bu mekanizma opioidlerle sinerjik analjezi sağlar ve postop opioid tüketimini %20–30 düşürür.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FARMAKOKİNETİK (ADME) AKORDİYONU (#sec-pkpd, VARSAYILAN KAPALI)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`scroll-mt-20 rounded-2xl border transition-all overflow-hidden ${
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
                isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
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
                <span>Farmakokinetik (ADME) &amp; NAPQI Metabolizma Yolları</span>
                <span
                  className={`text-xs font-normal px-2 py-0.5 rounded font-mono ${
                    isDark ? 'bg-emerald-500/15 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  IV Onset: 5–10 dk · Pik: 15–60 dk · t½: 2–3 sa · %90 Faz II (Glukuronid/Sülfat)
                </span>
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                IV vs Oral pik BOS geçişi, CYP2E1 → NAPQI → Glutatyon (GSH) detoksifikasyonu ve yenidoğan/siroz kinetiği.
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
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  5–10 dk (IV)
                </span>
                <span className="text-[10px] text-slate-400">Pik analjezi ~1 sa · Süre 4–6 sa</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Dağılım &amp; Protein Bağlama
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  Vd ~0,9 L/kg · %10–25
                </span>
                <span className="text-[10px] text-slate-400">Hızlı BOS geçişi · Diyalizlenir!</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Hepatik Metabolizma
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  %90 Faz II · %5–10 CYP2E1
                </span>
                <span className="text-[10px] text-slate-400">UGT1A1/1A6 (%55) + SULT (%35)</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Eliminasyon t½ &amp; Atılım
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                  2–3 sa (Siroz: 4–6 sa)
                </span>
                <span className="text-[10px] text-slate-400">&gt;%85–90 idrar (konjugat); &lt;%5 değişmez</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• İV vs Oral / Rektal Farmakokinetik Farkı:</strong>{' '}
                Oral parasetamolün biyoyararlanımı ~%70–90 olup ilk geçiş metabolizmasına uğrar; ancak postoperatif
                ileus, opioid kaynaklı mide boşalma gecikmesi ve bulantı-kusmada oral emilim öngörülemez. İV 1000 mg
                (15 dk infüzyon), oral doza kıyasla <strong>~%70 daha yüksek tepe plazma (Cmax) ve daha hızlı BOS
                konsantrasyonu</strong> oluşturur; rektal biyoyararlanım ise yavaş ve değişkendir (%30–80).
              </div>
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• NAPQI &amp; Glutatyon (GSH) Eşiği:</strong>{' '}
                Terapötik dozlarda parasetamolün ~%55&apos;i glukuronidasyon (UGT), ~%35&apos;i sülfasyon (yenidoğanda
                sülfasyon baskındır!) ile inaktif konjugatlara dönüşüp idrarla atılır. Yalnızca <strong>%5–10&apos;u
                CYP2E1</strong> ile toksik elektrofilik <strong>N-asetil-p-benzokinonimin (NAPQI)</strong> ara ürününe
                okside olur ve hepatik <strong>glutatyon (GSH)</strong> ile hızla zararsız merkaptürik asite çevrilir.
                Aşırı dozda veya GSH depoları &gt;%70 tükendiğinde (açlık, alkolizm, siroz) serbest NAPQI hepatosit
                proteinlerine kovalent bağlanarak <strong>sentrilobüler (Zon 3) hepatik nekroz</strong> başlatır!
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
          'Ağır Hepatoselüler Yetmezlik (Child-Pugh C), Akut Karaciğer Yetmezliği veya Aktif İlerleyici Karaciğer Hastalığı (FDA / EMA & TR KÜB: İV Parasetamol kesin kontrendikedir!).',
          'Parasetamol (Asetaminofen), Propasetamol veya Yardımcı Maddelere (Mannitol, Sistein HCl) Karşı Bilinen Ciddi Aşırı Duyarlılık (Anafilaksi, Anjiyoödem, SJS/TEN, AGEP öyküsü).',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Doz Kısıtlaması Gerektiren Durumlar"
        relativeItems={[
          'Kronik Alkolizm, Malnütrisyon, Uzamış Açlık (>24–48 sa), Kaşeksi veya Dehidratasyon: Hepatik glutatyon rezervleri düşük olduğundan günlük toplam doz ≤2000 mg/gün ile sınırlandırılmalıdır.',
          'Hafif–Orta Karaciğer Hastalığı (Child-Pugh A–B): Günlük toplam doz ≤2000 mg/gün (kısa süreli Child A maks 2–3 g/gün) ve ALT/AST/INR izlemi şarttır.',
          'Düşük Kilolu Erişkin (<50 kg): 1000 mg sabit doz VERİLMEZ — 15 mg/kg/doz, günlük tavan 60 mg/kg/gün (en fazla 3000 mg/gün)!',
          'Ağır Böbrek Yetmezliği (eGFR <30 mL/dk): Doz aralığını en az 8 saate (q8sa) uzatın; malnütrisyon/sepsis/Flukloksasilin eşliğinde 5-oksoprolin (piroglutamik asit) HAGMA riski!',
          'Hemodinamik İnstabilite / Septik Şok / Hipovolemi: İV Parasetamol infüzyonuna bağlı geçici hipotansiyon (MAP −10–15 mmHg) riski yüksektir — ≥15 dk yavaş infüze edin ve KB’yi izleyin.',
          'Ağır G6PD Eksikliği: Yüksek/toksik dozlarda nadir hemolitik anemi bildirilmiştir; standart terapötik dozlarda genellikle güvenlidir ancak ağır eksiklikte dikkatli izlenir.',
        ]}
        clinicalNote="Parasetamol, NSAİİ’lerin aksine peptik ülser, aktif cerrahi kanama, trombositopeni, astım, kalp yetmezliği, böbrek yetmezliği (eGFR ≥30) ve gebelikte kontrendike DEĞİLDİR — bu klinik durumlarda 1. tercih non-opioid analjezik/antipiretiktir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ (#sec-dozlar)               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozlar"
        title="Klinik Endikasyonlar & Doz Rejimleri (Genel Tıp · ERAS / PROSPECT · HEAT · Pediatri · PDA)"
        subtitle="TR IV Flakon: 1000 mg / 100 mL (10 mg/mL)"
        icon={<BookOpen className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />}
        defaultOpen={false}
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* A. Hafif-Orta Ağrı & Ateş (Genel Klinik 1. Basamak) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                <span>A. Hafif–Orta Ağrı &amp; Ateş (Genel Tıp &amp; Pediatri 1. Basamak)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-orange-500/20 text-orange-300' : 'bg-orange-100 text-orange-800'
                }`}
              >
                1000 mg q6sa · ≤4 g
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Baş ağrısı, kas-iskelet/osteoartrit ağrısı, dental/prosedürel ağrı ve enfeksiyöz ateşte 1. basamak
              analjezik &amp; antipiretiktir. Özellikle <strong>NSAİİ kontrendikasyonu olanlarda</strong> (gebelik,
              peptik ülser/GİS kanaması, KBY, antikoagülan kullanımı, aspirin-duyarlı astım, KKY) ve viral ateşli
              çocukta <strong>Reye sendromu</strong> önlemi için birincil tercihtir. Erişkin ≥50 kg:{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>500–1000 mg PO/IV q6sa</strong>{' '}
              (maks <strong>4 g/gün</strong>); &lt;50 kg: <strong>15 mg/kg q6sa</strong> (maks 60 mg/kg/gün).
            </p>
          </div>

          {/* B. Perioperatif Multimodal Analjezi & ERAS */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Syringe className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>B. Perioperatif Multimodal Analjezi &amp; ERAS (Opioid-Sparing)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                1000 mg IV (15 dk)
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              ASA / PROSPECT / ERAS kılavuzlarında multimodal analjezinin temel direğidir: Ameliyat sonundan{' '}
              <strong>15–30 dk önce</strong> (veya indüksiyon sonrası){' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>1000 mg IV (15 dk)</strong> →
              postop düzenli <strong>q6sa</strong> (oral alım başlayınca PO&apos;ya geç!). Postop opioid tüketimini{' '}
              <strong>%20–30</strong>, PONV ve sedasyonu anlamlı azaltır; cerrahi hemostazı ve kemik/anastomoz
              iyileşmesini BOZMAZ!
            </p>
          </div>

          {/* C. YBÜ Ateş Kontrolü & Nöro-Kritik Normotermi (HEAT 2015) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Activity className="w-4 h-4 text-sky-500 shrink-0" />
                <span>C. YBÜ Ateş Yönetimi &amp; Nöro-Kritik Normotermi (HEAT, NEJM 2015)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-sky-500/20 text-sky-300' : 'bg-sky-100 text-sky-800'
                }`}
              >
                1000 mg IV q6sa
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>HEAT Çalışması (Young et al., NEJM 2015):</strong> Enfeksiyöz ateşi olan genel YBÜ hastalarında
              rutin 1 g IV q6sa parasetamol, 28 günlük YBÜ-dışı gün sayısını ve mortaliteyi değiştirmemiştir. Buna karşın{' '}
              <strong>akut beyin hasarı (TBH, SAK, İKH, post-arrest TTM)</strong>, <strong>ağır kardiyak/solunumsal
              rezerv kısıtlılığı</strong> ve <strong>semptomatik &gt;39°C ateş</strong> durumlarında normotermi için 1.
              tercih antipiretiktir (YBÜ&apos;de infüzyon hipotansiyonuna dikkat!).
            </p>
          </div>

          {/* D. Pediatrik, Yenidoğan & Prematüre PDA Kapanması */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Baby className="w-4 h-4 text-amber-500 shrink-0" />
                <span>D. Pediatri, Yenidoğan &amp; Prematüre PDA Farmakolojik Kapanması</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                }`}
              >
                7,5–15 mg/kg IV
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>≥2 yaş (&lt;50 kg):</strong> 15 mg/kg IV q6sa (maks 60 mg/kg/gün).{' '}
              <strong>Süt çocuğu (&lt;2 yaş):</strong> 7,5–10 mg/kg IV q6sa (maks 30–40 mg/kg/gün).{' '}
              <strong>Term yenidoğan:</strong> 7,5 mg/kg IV q6sa (maks 30 mg/kg/gün);{' '}
              <strong>prematüre (&lt;32 hf):</strong> 7,5 mg/kg q8sa (maks 20–22,5 mg/kg/gün).{' '}
              <strong>PDA Kapanması (NSAİİ kontrendike ise):</strong> 15 mg/kg IV/PO q6sa × 3–7 gün (EKO + KCFT
              izlemiyle).
            </p>
          </div>
        </div>
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. İNTERAKTİF 4 SEKMELİ DOZ & NAC HESAPLAYICI (#sec-hesaplayici)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="İnteraktif Parasetamol Doz, Kümülatif Tavan & NAC Antidot Hesaplayıcısı"
        subtitle="TR 10 mg/mL (1000 mg / 100 mL) IV infüzyon pompası, pediatrik 10× hata koruması, 24 saatlik toplam denetim & NAC"
        icon={
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            <Droplets className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
        bodyClassName="p-5 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-end gap-2">
          <MonographCopyButton isDark={isDark} label="Hesaplanan Order’ı Kopyala" getText={buildCopySummary} />
        </div>

        {/* 4 Sekmeli Navigasyon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { id: 'adult' as CalcTab, label: 'Erişkin IV / Risk Tavanı', sub: '≥50 vs <50 kg · KC/Alkol' },
            { id: 'pediatric' as CalcTab, label: 'Pediatri & Yenidoğan', sub: '10× mg/mL Hata Koruması' },
            { id: 'cumulative' as CalcTab, label: '24 Saat Kümülatif Denetim', sub: 'IV + Oral + Kombinasyon' },
            { id: 'nac_overdose' as CalcTab, label: 'Doz Aşımı & NAC Antidot', sub: '2-Torba SNAP · 3-Torba' },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-200 shadow-xs'
                      : 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                    : isDark
                      ? 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="text-xs font-bold leading-snug">{tab.label}</div>
                <div className={`text-[10px] mt-0.5 ${active ? 'opacity-90' : 'text-slate-500'}`}>{tab.sub}</div>
              </button>
            );
          })}
        </div>

        {/* SEKME 1: ERİŞKİN IV / RİSK TAVANI */}
        {activeTab === 'adult' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={adultWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Erişkin Hasta Kilosu (&lt;50 kg ise 15 mg/kg!)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={adultWeightInputId}
                      type="number"
                      min={30}
                      max={180}
                      value={adultWeightKg}
                      onChange={(e) => setAdultWeightKg(Math.max(30, Math.min(180, Number(e.target.value) || 70)))}
                      className={`w-16 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                        isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">kg</span>
                  </div>
                </div>
                <input
                  id={adultWeightSliderId}
                  type="range"
                  min={30}
                  max={150}
                  value={adultWeightKg}
                  onChange={(e) => setAdultWeightKg(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <span className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                  Hepatotoksisite / Organ Risk Faktörlerini İşaretleyin:
                </span>
                {ADULT_RISK_FLAGS.map((rf) => {
                  const checked = adultRiskIds.includes(rf.id);
                  return (
                    <label
                      key={rf.id}
                      className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                        checked
                          ? rf.contraindicated
                            ? isDark
                              ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                              : 'bg-rose-50 border-rose-400 text-rose-900'
                            : isDark
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                              : 'bg-amber-50 border-amber-300 text-amber-900'
                          : isDark
                            ? 'bg-slate-900/50 border-slate-700 text-slate-300'
                            : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAdultRisk(rf.id)}
                        className="mt-0.5 accent-amber-500"
                      />
                      <div>
                        <div className="font-semibold leading-tight">{rf.label}</div>
                        <div className="text-[10px] opacity-80">{rf.sublabel}</div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 content-start">
              {hasSevereLiver ? (
                <div
                  className={`p-4 rounded-xl border col-span-2 space-y-2 ${
                    isDark ? 'bg-rose-500/15 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>İV PARASETAMOL KONTRENDİKE (Child-Pugh C / Akut KC Yetmezliği)!</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Ağır hepatoselüler yetmezlikte veya aktif ilerleyici karaciğer hastalığında İV Parasetamol
                    kullanılmaz! Ağrı için titre düşük doz kısa etkili opioid (Fentanil/Remifentanil) ve mümkünse
                    rejyonal sinir bloğu planlayın.
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className={`p-3.5 rounded-xl border ${
                      isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-500">Tek IV Doz (q{adultIntervalHours}sa)</span>
                    <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      {adultSingleDoseMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      {adultSingleDoseMl.toString().replace('.', ',')} mL (10 mg/mL şişe)
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      15 dk pompa: {adultPumpRateMlHr} mL/sa
                    </span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border ${
                      hasHepatotoxRisk || isLowWeightAdult
                        ? isDark
                          ? 'bg-amber-500/15 border-amber-500/40'
                          : 'bg-amber-50 border-amber-300'
                        : isDark
                          ? 'bg-indigo-500/10 border-indigo-500/30'
                          : 'bg-indigo-50/70 border-indigo-200'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase text-slate-500">24 Saatlik Maksimum Tavan</span>
                    <div
                      className={`text-2xl font-black font-mono mt-1 tabular-nums ${
                        hasHepatotoxRisk || isLowWeightAdult
                          ? isDark
                            ? 'text-amber-300'
                            : 'text-amber-800'
                          : isDark
                            ? 'text-indigo-300'
                            : 'text-indigo-700'
                      }`}
                    >
                      {adultDailyCapMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                      En fazla {adultMaxDosesPerDay} doz / 24 sa
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Tüm oral/kombinasyonlar dahil!
                    </span>
                  </div>

                  <div
                    className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed space-y-1.5 ${
                      isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <strong>Uygulama:</strong> {adultSingleDoseMl.toString().replace('.', ',')} mL Parol® / Perfalgan®
                      (10 mg/mL) en az <strong>15 dakikada IV infüzyon</strong> ({adultPumpRateMlHr} mL/sa).{' '}
                      {isLowWeightAdult && (
                        <span className="text-amber-500 font-bold">
                          &lt;50 kg erişkinde 100 mL şişenin tamamı TAKILMAZ — hesaplanan{' '}
                          {adultSingleDoseMl.toString().replace('.', ',')} mL çekilerek verilir!
                        </span>
                      )}
                    </div>
                    <div className={isDark ? 'text-amber-300' : 'text-amber-800'}>
                      <strong>YBÜ / Anestezi Notu:</strong> Hemodinamik olarak kırılgan / septik şok hastasında infüzyon
                      sırasında 15–60 dk içinde MAP −10–15 mmHg düşüş gelişebilir — hızlı puşe YAPMA!
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* SEKME 2: PEDİATRİK & YENİDOĞAN (10× HATA KORUMALI!) */}
        {activeTab === 'pediatric' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {[
                { id: 'preterm' as PedAgeGroup, title: 'Prematüre <32 hf', sub: '7,5 mg/kg q8sa' },
                { id: 'term_neonate' as PedAgeGroup, title: 'Term Yenidoğan', sub: '7,5 mg/kg q6sa' },
                { id: 'infant' as PedAgeGroup, title: 'Süt Çocuğu (1a–2y)', sub: '10 mg/kg q6sa' },
                { id: 'child' as PedAgeGroup, title: 'Çocuk ≥2y (<50 kg)', sub: '15 mg/kg q6sa' },
              ].map((ag) => (
                <button
                  key={ag.id}
                  type="button"
                  onClick={() => {
                    setPedAgeGroup(ag.id);
                    if (ag.id === 'preterm') setPedWeightKg(1.8);
                    else if (ag.id === 'term_neonate') setPedWeightKg(3.2);
                    else if (ag.id === 'infant') setPedWeightKg(8);
                    else setPedWeightKg(18);
                  }}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    pedAgeGroup === ag.id
                      ? isDark
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                        : 'bg-amber-50 border-amber-400 text-amber-900'
                      : isDark
                        ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{ag.title}</div>
                  <div className="text-[10px] opacity-80 font-mono">{ag.sub}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <label htmlFor={pedWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Hasta Kilosu ({pedConfig.label})
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={pedWeightInputId}
                      type="number"
                      min={pedConfig.minW}
                      max={pedConfig.maxW}
                      step={0.5}
                      value={pedWeightKg}
                      onChange={(e) =>
                        setPedWeightKg(Math.max(pedConfig.minW, Math.min(pedConfig.maxW, Number(e.target.value) || pedConfig.minW)))
                      }
                      className={`w-16 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                        isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                    <span className="text-xs font-mono text-slate-500">kg</span>
                  </div>
                </div>
                <input
                  id={pedWeightSliderId}
                  type="range"
                  min={pedConfig.minW}
                  max={pedConfig.maxW}
                  step={0.5}
                  value={pedWeightKg}
                  onChange={(e) => setPedWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {pedConfig.note}
                </p>
                <div
                  className={`p-2.5 rounded-lg border text-xs font-bold flex items-start gap-2 ${
                    isDark ? 'bg-rose-500/15 border-rose-500/40 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    10× HATA ALARMI: {pedSingleMg} mg = <strong>{pedSingleMl.toString().replace('.', ',')} mL</strong>{' '}
                    (10 mg/mL şişeden AYRI ENJEKTÖRE çek — ASLA 100 mL şişeyi doğrudan takma!).
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 content-start">
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Tek Doz (q{pedConfig.intervalHr}sa)
                  </span>
                  <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    {pedSingleMg} mg
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    Maks/gün: {pedDailyMaxMg} mg
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">Çekilecek IV Hacim (10 mg/mL)</span>
                  <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                    {pedSingleMl.toString().replace('.', ',')} mL
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    15 dk pompa: {pedPumpRateMlHr} mL/sa
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed ${
                    isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <strong>Oral Süspansiyon Eşdeğeri ({pedSingleMg} mg):</strong>{' '}
                  <strong>120 mg/5 mL</strong> şuruptan{' '}
                  <strong className="font-mono">{pedOral120Ml.toString().replace('.', ',')} mL</strong> ·{' '}
                  <strong>250 mg/5 mL</strong> (6+ yaş) şuruptan{' '}
                  <strong className="font-mono">{pedOral250Ml.toString().replace('.', ',')} mL</strong>.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 3: 24 SAATLİK KÜMÜLATİF DOZ DENETLEYİCİ */}
        {activeTab === 'cumulative' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Hastaya Özgü 24 Saatlik Tavan:</span>
                <div className="flex gap-1.5">
                  {[2000, 3000, 4000].map((cap) => (
                    <button
                      key={cap}
                      type="button"
                      onClick={() => setCumMaxAllowedMg(cap)}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold cursor-pointer ${
                        cumMaxAllowedMg === cap
                          ? isDark
                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                            : 'bg-emerald-50 border-emerald-400 text-emerald-900'
                          : isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-400'
                            : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      {cap / 1000} g
                    </button>
                  ))}
                </div>
              </div>

              {[
                { label: 'İV Parol® / Perfalgan® (Son 24 sa, mg)', val: cumIvMg, set: setCumIvMg },
                { label: 'Oral Parol® / Minoset® Tablet (Son 24 sa, mg)', val: cumOralParolMg, set: setCumOralParolMg },
                { label: 'Kombinasyonlar (Zaldiar® 325 · Tylol® 500 · Geralgine-K® 500)', val: cumComboMg, set: setCumComboMg },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300">{row.label}</span>
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    step={250}
                    value={row.val}
                    onChange={(e) => row.set(Math.max(0, Number(e.target.value) || 0))}
                    className={`w-24 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                      isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                cumOverLimit
                  ? isDark
                    ? 'bg-rose-500/15 border-rose-500/50 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                  : isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase opacity-80">Son 24 Saat Kümülatif Toplam</span>
                <span className="text-3xl font-black font-mono tabular-nums">
                  {cumTotalMg} mg
                </span>
              </div>

              <div className="text-xs leading-relaxed">
                {cumOverLimit ? (
                  <>
                    <strong>TAVAN {Math.abs(cumRemainingMg)} mg AŞILDI!</strong> Ek parasetamol{' '}
                    <strong>KESİNLİKLE VERMEYİN</strong>; 4. saat serum parasetamol düzeyi + ALT / AST / INR gönderin ve
                    tekrarlayan aşırı alım kriterleri varsa <strong>N-Asetilsistein (NAC)</strong> başlatın!
                  </>
                ) : (
                  <>
                    Seçili <strong>{cumMaxAllowedMg} mg/gün</strong> tavanı içinde{' '}
                    <strong className="font-mono">{cumRemainingMg} mg</strong> güvenli pay kalmıştır.
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SEKME 4: AKUT DOZ AŞIMI & N-ASETİLSİSTEİN (NAC) HESAPLAYICI */}
        {activeTab === 'nac_overdose' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNacRegimen('two_bag_snap')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                      nacRegimen === 'two_bag_snap'
                        ? isDark
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-400 text-emerald-900'
                        : isDark
                          ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold">2-Torbalı SNAP / Modifiye (Önerilen)</div>
                    <div className="text-[10px] opacity-80">200 mg/kg (4 sa) → 100 mg/kg (16 sa)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNacRegimen('three_bag_prescott')}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                      nacRegimen === 'three_bag_prescott'
                        ? isDark
                          ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-200'
                          : 'bg-indigo-50 border-indigo-400 text-indigo-900'
                        : isDark
                          ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                          : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="text-xs font-bold">3-Torbalı Klasik (Prescott 21 sa)</div>
                    <div className="text-[10px] opacity-80">150 (1s) → 50 (4s) → 100 (16s)</div>
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={nacWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Hasta Kilosu (NAC tavanı: 100 kg)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={nacWeightInputId}
                        type="number"
                        min={10}
                        max={160}
                        value={nacWeightKg}
                        onChange={(e) => setNacWeightKg(Math.max(10, Math.min(160, Number(e.target.value) || 70)))}
                        className={`w-16 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                          isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={nacWeightSliderId}
                    type="range"
                    min={10}
                    max={140}
                    value={nacWeightKg}
                    onChange={(e) => setNacWeightKg(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  {nacCapped && (
                    <span className="text-[10px] text-amber-500 font-bold block mt-1">
                      NAC hesaplaması kılavuz gereği 100 kg üst sınırına tavanlandı!
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-2.5 text-xs ${
                  isDark ? 'bg-rose-500/10 border-rose-500/30 text-slate-200' : 'bg-rose-50/70 border-rose-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold">
                  <span>N-Asetilsistein (NAC) IV Doz Planı</span>
                  <span className="font-mono text-rose-500">
                    Toplam {nacTotalMg} mg (≈{nacAmpules300} × 300 mg Asist®)
                  </span>
                </div>
                {nacRegimen === 'two_bag_snap' ? (
                  <ul className="space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>1. Torba (4 saat):</strong>{' '}
                      <strong className="font-mono">{nac2Bag1Mg} mg</strong> (200 mg/kg) / 500 mL D5W →{' '}
                      <strong>125 mL/sa</strong> (klasik 1 saatlik puşeye göre anafilaktoid reaksiyonu %70+ azaltır!).
                    </li>
                    <li>
                      <strong>2. Torba (16 saat):</strong>{' '}
                      <strong className="font-mono">{nac2Bag2Mg} mg</strong> (100 mg/kg) / 1000 mL D5W →{' '}
                      <strong>62,5 mL/sa</strong>.
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-1.5 list-disc pl-4 leading-relaxed">
                    <li>
                      <strong>1. Torba (1 saat):</strong>{' '}
                      <strong className="font-mono">{nac3Bag1Mg} mg</strong> (150 mg/kg) / 200 mL D5W →{' '}
                      <strong>200 mL/sa</strong>.
                    </li>
                    <li>
                      <strong>2. Torba (4 saat):</strong>{' '}
                      <strong className="font-mono">{nac3Bag2Mg} mg</strong> (50 mg/kg) / 500 mL D5W →{' '}
                      <strong>125 mL/sa</strong>.
                    </li>
                    <li>
                      <strong>3. Torba (16 saat):</strong>{' '}
                      <strong className="font-mono">{nac3Bag3Mg} mg</strong> (100 mg/kg) / 1000 mL D5W →{' '}
                      <strong>62,5 mL/sa</strong>.
                    </li>
                  </ul>
                )}
                <p className={`text-[11px] pt-1 border-t ${isDark ? 'border-rose-500/20 text-slate-300' : 'border-rose-200 text-slate-700'}`}>
                  <strong>Rumack-Matthew Tedavi Eşiği:</strong> Tek akut alımda 4. saat parasetamol düzeyi{' '}
                  <strong>&gt;150 mcg/mL (mg/L)</strong> [İngiltere/TR bazı merkezlerde &gt;100 mcg/mL]. İnfüzyon bitiminde
                  ALT/AST yükselmeye devam ediyorsa, INR &gt;1,3 ise veya parasetamol saptanabilirse 2. torbayı uzatın!
                </p>
              </div>
            </div>
          </div>
        )}
      </MonographAccordionSection>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (#sec-tr-preparat)      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Parol® / Perfalgan® / Partemol® / Paracerol® 10 mg/mL IV İnfüzyon Flakonu (100 mL)',
            presentation: '100 mL kullanıma hazır cam flakon veya plastik şişe (TR ameliyathane/YBÜ standart formu)',
            concentration: '10 mg/mL → 100 mL Şişe = 1000 mg (1 g) Parasetamol',
            saltOrBaseNote:
              'Kullanıma hazır izotonik (~300 mOsm/kg, pH ~5,5) çözeltidir; yardımcı madde olarak Mannitol içerir. Her şişe ≥15 dakikada IV infüze edilir; seyreltme gerektirmez!',
            alertLevel: 'high',
          },
          {
            name: 'Parol® / Minoset® / Vermidon® 500 mg Tablet & Pediatrik Süspansiyonlar (PO)',
            presentation: '500 mg tablet (20/30’lu), 120 mg/5 mL (1–6 yaş) & 250 mg/5 mL (6+ yaş) şurup/süspansiyon, 120/250 mg supozituvar',
            concentration: '500 mg tablet · 24 mg/mL veya 50 mg/mL süspansiyon',
            saltOrBaseNote:
              'Oral alım mümkün ve GİS emilimi normal olduğunda IV forma eşdeğer analjezi/antipiretik etki sağlar ve hipotansiyon riski yoktur — erken oral geçiş önerilir.',
            alertLevel: 'standard',
          },
          {
            name: 'Gizli Parasetamol İçeren TR Kombinasyon Preparatları (Kümülatif Tavan Uyarısı!)',
            presentation: 'Zaldiar®/Pardol® (325 mg), Geralgine-K® (500 mg), Tylol Hot® / A-Ferin® / Katarin® / Theraflu® (325–650 mg)',
            concentration: '325 – 650 mg Parasetamol / doz',
            saltOrBaseNote:
              'Kasıtsız aşırı dozun en sık nedeni hastanın aynı gün birden fazla kombinasyon ilacı almasıdır; order öncesi tüm kombinasyonları sorgulayın!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Erişkin ≥50 kg Standart IV Uygulama: 100 mL (1000 mg) kullanıma hazır şişe doğrudan 15 dakikada (400 mL/sa) IV infüzyon — hızlı puşe YAPILMAZ!',
          'Erişkin <50 kg & Pediatrik IV Güvenlik Hazırlığı: 100 mL (10 mg/mL) şişeden hesaplanan mL (ör. 15 kg çocuk = 225 mg = 22,5 mL) AYRI bir enjektöre veya küçük boş torbaya çekilerek 15 dakikada infüze edilir (gerekirse %0,9 NaCl veya %5 Dekstroz ile 1:10’a kadar seyreltilebilir).',
          'Açılan Şişe Tek Kullanımlıktır: Koruyucu içermez ve oksidasyona duyarlıdır — pediatrik doz çekildikten sonra 100 mL şişede kalan kısım ATILMALIDIR!',
        ]}
        concentrationTrapWarning="10× PEDİATRİK DOZ HATASI: 10 mg/mL konsantrasyon nedeniyle mg ile mL arasındaki 10 katlık fark (150 mg = 15 mL) dünyada çocuklarda en sık bildirilen iyatrojenik IV parasetamol zehirlenmesi nedenidir! Asla 100 mL şişeyi tam haliyle çocuğa takıp '15 mL gidince kapatırım' demeyin — daima ayrı enjektöre çekin!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="İzotonik (~290–310 mOsm/kg) ve nötrale yakın pH’sı (~5,5) sayesinde periferik venöz hattan güvenle 15 dakikada infüze edilir. Ancak bazı kritik ilaçlarla fiziksel uyumsuzluk gösterebildiğinden ve açıldığında hızla oksitlendiğinden ayrı infüzyon olarak verilmesi önerilir."
        phRange="5,0 – 6,5 (İzotonik · Periferik Ven Dostu)"
        osmolalityNote="Kullanıma hazır 10 mg/mL şişe ~290–310 mOsm/kg izotoniktir (mannitol ile izotonisite sağlanır); lokal flebit/ekstravazasyon riski düşüktür."
        compatibleDiluents={[
          'Kullanıma hazır (ek seyreltme gerektirmez)',
          '%0,9 Sodyum Klorür (SF — pediatrik küçük hacim seyreltmesi, 1 saat içinde kullan!)',
          '%5 Dekstroz (D5W — pediatrik seyreltme, 1 saat içinde kullan!)',
        ]}
        stabilityNote="Oda sıcaklığında (≤25–30°C) saklayın, BUZDOLABINA KOYMAYIN veya DONDURMAYIN (kristallenir!). Hava temasıyla pembe-kahverengiye oksitlenir; şişe açıldıktan/delindikten sonra derhal (en geç 1–6 saat içinde) kullanılmalı ve artan kısım imha edilmelidir."
        ySiteCompatible={[
          '%0,9 NaCl (SF) · %5 Dekstroz (D5W) · Ringer Laktat',
          'Fentanil · Morfin · Ondansetron · Deksametazon · Ketamin',
          'Sefazolin · Piperasilin-Tazobaktam · Meropenem',
        ]}
        ySiteIncompatible={[
          'Diazepam · Klorpromazin (anında çökelti!)',
          'Fenitoin · Sodyum Bikarbonat (alkali oksidasyon/uyumsuzluk)',
          'Acyclovir (Asiklovir) · Amfoterisin B · TPN / Lipid · Kan Ürünleri',
        ]}
        extravasationProtocol="İzotonik ve vezikan olmayan bir çözeltidir; ekstravazasyonda genellikle hafif lokal ödem/ağrı görülür. İnfüzyonu durdurun, kateteri çıkarın, ekstremiteyi eleve edin ve lokal soğuk/ılık kompres uygulayın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="KBY’de NSAİİ’lerin aksine nefrotoksik DEĞİLDİR (1. tercih analjezik!). eGFR <30 mL/dk’da doz aralığını q8sa’ya uzatın; IHD ile ~%40–50 diyalizlenir (masif zehirlenmede acil HD hayat kurtarıcıdır!)."
        renalDetails={[
          'eGFR ≥30 mL/dk: Tam standart doz (NSAİİ’lerin aksine ABH, hiperkalemi ve GİS kanaması yapmaz).',
          'eGFR <30 mL/dk: Glukuronid/sülfat konjugatları biriktiğinden aralığı q8sa’ya uzatın (maks 2–3 g/gün).',
          'IHD & CRRT: Orta düzeyde diyalize olur (~%40–50); masif doz aşımında (EXTRIP 2014: >900–1000 mg/L + laktik asidoz/koma) acil IHD endikedir!',
        ]}
        hepaticSummary="Child-Pugh A–B’de günlük tavan ≤2 g/gün (kısa süreli Child A 2–3 g/gün); Child-Pugh C / akut karaciğer yetmezliğinde İV Parasetamol KONTRENDİKEDİR!"
        hepaticDetails={[
          'Child-Pugh A (Kompanse Siroz): Kısa süreli maks 2–3 g/gün (kronik ≤2 g/gün); NSAİİ’lerden çok daha güvenlidir (GİS kanaması ve HRS tetiklemez!).',
          'Child-Pugh B: Maks ≤2 g/gün (500–650 mg q6–8sa veya 1 g q12sa); aktif alkol kesin yasak.',
          'Child-Pugh C / Akut KC Yetmezliği: KONTRENDİKE — tükenmiş glutatyon nedeniyle düşük dozlarda bile fulminan NAPQI nekrozu!',
        ]}
        {...STANDALONE_ORGAN_PART2['paracetamol']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="AGS Beers 2023 Dostu · <50 kg / Kırılgan: ≤2–3 g/gün"
        geriatricPoints={[
          'Yaşlıda En Güvenli 1. Basamak Analjezik: NSAİİ’ler (GİS kanama, ABH, KKY) ve opioidlerden (deliryum, düşme, kabızlık) farklı olarak Parasetamol yaşlıda en iyi tolere edilen temel analjeziktir.',
          'Kırılgan / <50 kg / Malnütrisyonlu Yaşlı Tuzağı: Kas kütlesi ve hepatik glutatyon rezervi düşük (<50 kg) yaşlılarda standart 4 g/gün hepatotoksik olabilir → 15 mg/kg/doz (maks 2–3 g/gün) ile sınırlayın!',
          'Varfarin Etkileşimi: >2 g/gün 3–4 günden uzun düzenli Parasetamol kullanımı yaşlılarda INR’yi belirgin yükseltebilir (K vitamini siklusu inhibisyonu) — INR kontrolü şarttır.',
        ]}
        obesityWeightScalarBadge="Sabit 1000 mg · Maks 4 g/gün (TBW Artışı YOK!)"
        obesityPoints={[
          'Erişkin Tavanı Değişmez: 130–160 kg morbid obez erişkinde dahi tek doz 1000 mg ve günlük toplam tavan 4000 mg ASLA aşılmaz (obezitede CYP2E1 aktivitesi ve non-alkolik yağlı karaciğer hastalığı [MASLD] artmış olabilir!).',
          'Pediatrik Obezite: Ağırlık bazlı (15 mg/kg) pediatrik hesaplamada IBW/AdjBW dikkate alınmalı ve tek doz 1000 mg, günlük doz 4000 mg tavanını aşmamalıdır.',
          'NAC Antidot Tavanı: Akut doz aşımında N-Asetilsistein dozu 100 kg (bazı protokollerde 110 kg) tavan ağırlığına göre hesaplanır.',
        ]}
        clinicalNote="Obezitede parasetamol tavanı 4 g/gün sabit kalmakla birlikte pediatrik veya sınır ağırlıklı olgularda doğru IBW/AdjBW hesabı için aşağıdaki ölçekleyiciyi kullanabilirsiniz:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Parasetamol (Asetaminofen)"
        recommendedScalar="IBW"
        secondaryScalar={{ type: 'AdjBW', context: 'Pediatrik Obezite / NAC (Maks 100 kg)' }}
        rationale="Erişkin ≥50 kg’da sabit 1000 mg q6sa (maks 4 g/gün) kullanılır ve obezitede TBW’ye göre doz ARTIRILMAZ (MASLD + CYP2E1 artışı nedeniyle hepatotoksisite riski!)."
        currentWeightKg={activeTab === 'nac_overdose' ? nacWeightKg : adultWeightKg}
        onApplyWeight={(w) => {
          setAdultWeightKg(Math.max(30, Math.min(180, Math.round(w))));
          setNacWeightKg(Math.max(10, Math.min(160, Math.round(w))));
        }}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK & LAKTASYON (#sec-gebelik)                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Gebeliğin tüm trimesterlerinde ağrı ve ateş tedavisinde 1. BASAMAK analjezik/antipiretiktir (ACOG / SMFM / EMA). NSAİİ’lerin aksine 3. trimesterde duktus arteriozus erken kapanmasına veya oligohidramnioza yol açmaz; yine de en düşük etkin doz ve en kısa süre kuralı geçerlidir."
        pregnancyDetails={[
          'Maternal Ateşin Teratojenitesi: Özellikle 1. trimesterde tedavi edilmeyen yüksek maternal ateş nöral tüp defekti ve düşük riskini artırır — Parasetamol güvenle ateşi kontrol eder.',
          'Nörogelişimsel Tartışmalar (Ahlqvist et al., JAMA 2024): 2,48 milyon çocukluk kardeş-kontrollü İsveç kohortunda gebelikte parasetamol kullanımı ile otizm, DEHB veya zihinsel yetersizlik arasında nedensel ilişki OLMADIĞI gösterilmiştir. Endike olduğunda en düşük etkin dozda ve kısa süreli kullanılmalıdır.',
          'Gebelikte Aşırı Doz: Parasetamol plasentayı geçer; maternal zehirlenmede N-Asetilsistein (NAC) plasentadan geçerek fetüsü de korur ve gebelikte güvenle/gecikmeden başlanır!',
        ]}
        lactationSummary="Anne sütüne çok düşük oranda geçer (Relatif İnfant Dozu <%1–2; bebeğe verilen terapötik dozun çok altındadır) — emzirme döneminde EN GÜVENLİ (1. tercih) analjezik ve antipiretiktir."
        lactationDetails={[
          'LactMed & AAP Uyumu: Anne sütündeki pik düzey 1–2 saatte oluşur ancak emzirilen bebekte klinik yan etki beklenmez; emzirmeye ara verilmesi kesinlikle gerekmez.',
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
            title: 'Doz-Bağımlı Hepatotoksisite & Fulminan Karaciğer Yetmezliği (NAPQI)',
            incidenceOrSeverity: 'En Kritik · Antidot: NAC',
            detail:
              'Tek seferde >7,5–10 g (çocukta >150–200 mg/kg) veya riskli hastada >2–4 g/gün tekrarlayan alımla sentrilobüler (Zon 3) hepatik nekroz, koagülopati (INR ↑), ensefalopati, laktik asidoz ve ölüm gelişebilir.',
            tone: 'rose',
          },
          {
            title: 'İV İnfüzyona Bağlı Geçici Hipotansiyon (YBÜ / Sepsis / Kardiyak)',
            incidenceOrSeverity: '%10–50 YBÜ · MAP −10–15 mmHg',
            detail:
              'İV Parasetamol infüzyonundan 15–60 dk sonra vasküler Kv7 (KCNQ) kanal açılması ve mannitol taşıyıcısına bağlı SVR düşüşü ile belirgin hipotansiyon gelişebilir; vazopresör ihtiyacını geçici artırır!',
            tone: 'rose',
          },
          {
            title: '5-Oksoprolin (Piroglutamik Asit) Yüksek Anyon Açıklı Asidoz (HAGMA)',
            incidenceOrSeverity: 'Nadir · Malnütrisyon + ABH + Flukloksasilin',
            detail:
              'Kronik/terapötik parasetamol kullanımında glutatyon tükenmesi γ-glutamil döngüsünü kilitleyerek yüksek anyon açıklı, normal laktatlı ağır metabolik asidoz yapar — parasetamolu kes + NAC ver!',
            tone: 'amber',
          },
          {
            title: 'Ciddi Kutanöz Reaksiyonlar (SJS · TEN · AGEP) & Anafilaksi',
            incidenceOrSeverity: 'Çok Nadir · FDA Kutu Uyarısı',
            detail:
              'Nadir de olsa Stevens-Johnson sendromu, toksik epidermal nekroliz ve akut jeneralize ekzantematöz püstüloz gelişebilir; yeni başlayan döküntü/mukoza lezyonunda ilaç kalıcı kesilir.',
            tone: 'rose',
          },
          {
            title: 'Varfarin Kullananlarda INR Yükselmesi & Kanama Riski',
            incidenceOrSeverity: '>2 g/gün × ≥3–4 Gün',
            detail:
              'NAPQI metaboliti karaciğerde K vitamini epoksit redüktaz/karboksilazı inhibe ederek varfarin etkisini belirgin güçlendirir — 3 günden uzun düzenli kullanımda INR takibi gerekir.',
            tone: 'amber',
          },
          {
            title: 'Nadir Hematolojik Etkiler & Hafif Transaminaz Yükselmesi',
            incidenceOrSeverity: 'Nadir · Geri Dönüşlü',
            detail:
              '4 g/gün çok günlük kullanımda sağlıklı bireylerde dahi geçici hafif ALT artışı görülebilir; çok nadiren trombositopeni, agranülositoz veya methemoglobinemi (aşırı dozda) bildirilmiştir.',
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
            title: 'İV Parasetamol Hipotansiyonu: Septik Şokta Nasıl Yönetilir?',
            detail:
              'Chiam ve ark. (Anaesthesia 2015) ile çok sayıda YBÜ gözlemsel çalışmasında, özellikle vazopresör altındaki veya düşük SVR’li hastalarda 1 g IV Parasetamol sonrası 15–60 dk içinde MAP’ta 10–15 mmHg düşüş saptanmıştır. Kritik şoktaki hastada infüzyonu 15–30 dakikaya yayın, gerekirse enteral/oral parasetamolü tercih edin (oral formda hipotansiyon çok daha nadirdir!).',
          },
          {
            title: '5-Oksoprolin (Piroglutamik Asit) Asidozu — Ne Zaman Şüphelen?',
            detail:
              'YBÜ veya serviste normal laktat, normal keton ve böbrek yetmezliği ile açıklanamayan ağır Yüksek Anyon Açıklı Metabolik Asidoz (HAGMA) varsa hastanın profiline bakın: yaşlı/malnütrisyonlu kadın + sepsis + böbrek yetmezliği + günlerdir düzenli Parasetamol (± Flukloksasilin)! Tedavi: Parasetamolu hemen kes, bikarbonatla pH destekle ve glutatyonu yenilemek için IV N-Asetilsistein (NAC) ver.',
          },
          {
            title: 'Akut Doz Aşımının 4 Klinik Evresi & "Sessiz Evre 1" Tuzağı',
            detail:
              'Evre 1 (0–24 sa): Genellikle asemptomatik veya hafif bulantı/kusma (ALT/AST NORMALDİR — hastayı taburcu etme, 4. saat parasetamol düzeyi bak!). Evre 2 (24–72 sa): Sağ üst kadran ağrısı, ALT/AST ve INR yükselmesi. Evre 3 (72–96 sa): Pik hepatik nekroz (ALT >1000–10.000), ensefalopati, koagülopati, ABH, hipoglisemi, laktik asidoz (King’s College nakil kriterleri!). Evre 4 (>4 gün): İyileşme veya nakil/ölüm.',
          },
          {
            title: 'Masif Zehirlenmede Acil Hemodiyaliz Kriterleri (EXTRIP 2014)',
            detail:
              'N-Asetilsistein her hastada 1. basamak antidottur; ancak ekstrakorporal temizlik (EXTRIP 2014) şu durumlarda güçlü önerilir: (1) NAC erişimi yoksa serum parasetamol >1000 mg/L; (2) Mental durum değişikliği + metabolik asidoz + yüksek laktat ve düzey >700 mg/L (NAC yok) veya >900 mg/L (NAC altında dahi!). Hemodiyaliz sırasında NAC klirensi arttığından NAC infüzyon hızı 2 katına çıkarılır.',
          },
          {
            title: 'Cerrahi Hemostaz, Kemik İyileşmesi & Astım Güvenliği',
            detail:
              'NSAİİ’lerin aksine Parasetamol COX-1 trombosit tromboksan A₂ sentezini bloke etmez — kraniyotomi, spinal cerrahi, tonsillektomi, kalp cerrahisi ve trombositopenik hastalarda kanama riskini artırmadan güvenle kullanılır!',
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
          title: 'COX Peroksidaz (POX) Bölgesi İndirgenmesi, AM404 Biyosentezi & Serotonerjik İnhibisyon',
          summary:
            'Parasetamolün neden güçlü santral analjezik/antipiretik etki gösterirken periferik antiinflamatuvar ve antiplatelet etki göstermediği, redoks biyokimyası ve santral AM404 dönüşümüyle açıklanır:',
          points: [
            'Peroksit-Bağımlı POX Seçiciliği: Prostaglandin H₂ sentaz (COX-1/COX-2) iki aktif bölge taşır: siklooksijenaz ve peroksidaz (POX). Parasetamol POX bölgesindeki okside ferriprotoporfirin radikalini indirgeyerek araşidonik asidin PGG₂’ye dönüşümünü durdurur. Periferik inflamasyon ve aktif trombositlerde hidroperoksit düzeyi çok yüksek olduğu için parasetamol bu indirgemeyi sürdüremez (antiinflamatuvar/antiplatelet etki yok); oysa düşük peroksitli beyin ve hipotalamusta güçlü blokaj sağlar!',
            'AM404 (N-Arakidonoilfenolamin) Oluşumu: SSS’de parasetamol p-aminofenole deasetile olur ve yağ asidi amid hidrolaz (FAAH) enzimi aracılığıyla araşidonik asitle konjuge edilerek AM404’e dönüşür. AM404, vanilloid TRPV1 kanallarını aktive eder ve anandamid geri alımını inhibe ederek endokannabinoid CB₁ sinyallemesini güçlendirir.',
            'İnen Serotonerjik (5-HT) Ağrı Kontrolü: Beyin sapı rafe çekirdeklerinden medulla spinalise inen serotonerjik inhibitör yolakları uyarır (teorik olarak bazı 5-HT₃ antagonistleriyle [tropisetron/granisetron] deneysel etkileşim tanımlanmışsa da klinik perioperatif ondansetron + parasetamol kombinasyonu pratikte etkindir).',
          ],
        }}
        intracellularSignaling={{
          title: 'CYP2E1 → NAPQI → Mitokondriyal Oksidatif Stres & Glutatyon (GSH) / NAC Kurtarma Biyokimyası',
          summary:
            'Parasetamol hepatotoksisitesi doğrudan ana molekülden değil, faz I oksidatif metaboliti NAPQI’nin glutatyon tükenmesi sonrası mitokondriyal proteinleri hedef almasından doğar:',
          points: [
            'Faz II Doygunluğu & NAPQI Birikimi: UGT (glukuronidasyon) ve SULT (sülfasyon) yolları doyduğunda daha fazla parasetamol CYP2E1’e (ve CYP3A4/1A2) yönelir ve yüksek reaktif NAPQI üretilir.',
            'Mitokondriyal Geçirgenlik Geçişi (MPT) & Zon 3 Nekrozu: Hepatik glutatyon depoları >%70 tükendiğinde NAPQI mitokondriyal proteinlerdeki sistein tiyol gruplarına kovalent bağlanır, peroksinitrit/ROS patlaması, JNK aktivasyonu, ATP tükenmesi ve sentrilobüler (Zon 3 — en yüksek CYP2E1 yoğunluğu!) hepatosit nekrozu başlar.',
            'N-Asetilsistein (NAC) Çoklu Koruması: NAC, hücre içi sistein prekürsörü olarak glutatyon sentezini hızla yeniler, doğrudan NAPQI’yi konjuge eder ve geç başvurularda dahi mitokondriyal enerji metabolizmasını ve hepatik mikrosirkülasyonu destekler.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Hipotalamus & Beyin Sapı → Antipiretik & Analjezik Fizyoloji',
            tissueTarget: 'Preoptik Hipotalamus PGE₂ · TRPV1 / CB₁ · Rafe Çekirdekleri',
            accent: 'teal',
            points: [
              'Pirojenik sitokinlerin (IL-1β, IL-6, TNF-α) hipotalamusta tetiklediği PGE₂ artışını kırarak ateş ayar noktasını (set-point) normale indirir.',
              'Normal vücut sıcaklığında hipotermi yapmaz; yalnızca yükselmiş ateş ayar noktasını düşürür.',
            ],
          },
          {
            systemTitle: 'Vasküler Düz Kas (Kv7 / KCNQ Kanalları) → İV İnfüzyon Hipotansiyonu',
            tissueTarget: 'Arteriyoler Düz Kas · SVR · Mannitol Taşıyıcısı',
            accent: 'rose',
            points: [
              'Hem parasetamol metabolitlerinin vasküler Kv7 potasyum kanallarını açması hem de IV formülasyondaki mannitolün geçici vazodilatatör/ozmotik etkisi sistemik vasküler direnci (SVR) düşürür.',
              'Özellikle septik şok ve düşük kardiyak rezervli YBÜ hastalarında 15–60 dk süren MAP düşüşü yaratır.',
            ],
          },
          {
            systemTitle: 'Karaciğer (Zon 3 Hepatositler) & γ-Glutamil Döngüsü',
            tissueTarget: 'UGT1A1/1A6 · CYP2E1 · Glutatyon & 5-Oksoprolin',
            accent: 'amber',
            points: [
              'Kronik alkolizm ve izoniazid/rifampisin CYP2E1’i indüklerken açlık/malnütrisyon glutatyonu tüketir — iki faktör birleştiğinde terapötik dozlarda dahi ağır hepatotoksisite gelişebilir.',
              'Kronik GSH eksikliğinde γ-glutamil döngüsünde 5-oksoprolin (piroglutamik asit) birikerek HAGMA oluşturur.',
            ],
          },
          {
            systemTitle: 'Trombositler, GİS Mukozası, Böbrek & Duktus Arteriozus',
            tissueTarget: 'Hemostaz Korunması · Renal Prostaglandinler · Prematüre PDA',
            accent: 'sky',
            points: [
              'Periferik COX-1’i inhibe etmediğinden trombosit agregasyonu, mide mukozal kan akımı ve renal afferent arteriyol otoregülasyonu korunur.',
              'Prematüre yenidoğanda POX inhibisyonu ile duktus arteriozustaki PGE₂’yi azaltarak NSAİİ kontrendike olgularda PDA kapanmasını sağlayabilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Multimodal Analjezik Sinerji (Parasetamol + NSAİİ / Opioid) & Tavan Etkisi',
          summary:
            'Parasetamol tek başına hafif–orta ağrıda etkindir; orta–şiddetli cerrahi ağrıda ise gerçek gücünü multimodal kombinasyonlarda (sinerjik analjezi) gösterir:',
          points: [
            'Analjezik Tavan (1000 mg/doz): Tek dozda 1000 mg üzerine çıkılması ek analjezik fayda SAĞLAMAZ, yalnızca hepatotoksisite riskini artırır.',
            'Parasetamol + NSAİİ Sinerjisi (Cochrane / Ong et al.): Farklı mekanizmalar (santral POX/AM404 + periferik COX inhibisyonu) nedeniyle birlikte kullanıldığında tek başına her iki ajandan da üstün analjezi ve daha yüksek opioid tasarrufu sağlar.',
            'Düzenli (Around-the-Clock) vs Gerektikçe (PRN) Uygulama: Postoperatif ilk 24–48 saatte ağrı yerleşmeden düzenli q6sa (ERAS standardı) uygulanması, yalnızca ağrı çıktığında (PRN) verilmesine kıyasla ağrı skorlarını ve kurtarma opioid tüketimini belirgin azaltır.',
          ],
        }}
        clinicalPearls={[
          'Neden Ameliyat Bitiminden 15–30 dk Önce? İV Parasetamolün pik BOS ve analjezik etkisine ulaşması 30–60 dakika sürer; uyanma odasında ağrı patlamadan önce cilt kapama aşamasında 15 dk infüzyonun tamamlanması ideal zamanlamadır!',
          'Erişkin <50 kg Kuralını Unutma: 42 kg kırılgan bir geriatrik veya onkolojik hastaya otomasyonla "Parol 4×1 g" order etmek 95 mg/kg/gün ile iyatrojenik hepatotoksisiteye yol açar → 15 mg/kg (630 mg = 63 mL), maks 60 mg/kg/gün!',
          '2-Torbalı (SNAP) NAC Rejimi Avantajı: Geleneksel 3-torbalı 21 saatlik Prescott rejiminde ilk 1 saatte 150 mg/kg hızlı yükleme sık non-IgE anafilaktoid reaksiyon (flushing, bronkospazm, hipotansiyon) yapar; 2-torbalı rejimde (200 mg/kg 4 saatte → 100 mg/kg 16 saatte) aynı hepatoproteksiyonla anafilaktoid reaksiyonlar %70’ten fazla azalır!',
          'Oral Alabiliyorsa İV Israr Etme: GİS emilimi normal ve kusması olmayan hastada oral 1000 mg parasetamol hem maliyeti 10+ kat düşürür hem de YBÜ’deki IV infüzyon hipotansiyonunu tamamen ortadan kaldırır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ ETKİLEŞİMLER & KAYNAKÇA (#sec-kaynaklar)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Parasetamol (Asetaminofen)"
        drugsComUrl="https://www.drugs.com/drug-interactions/acetaminophen.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Diğer Parasetamol İçeren Kombinasyonlar (Zaldiar® · Geralgine-K® · Tylol Hot® · A-Ferin® · Theraflu®)',
            mechanism: 'Kümülatif Doz Aşımı → Faz II Doygunluğu & Masif NAPQI Hepatotoksisitesi',
            clinicalEffect:
              'Fark edilmeyen eş zamanlı alımla >4 g/gün (riskli hastada >2 g/gün) aşımı sonucu akut karaciğer yetmezliği ve ölüm.',
            management:
              'Her order öncesi hastanın son 24 saatte aldığı TÜM reçeteli/reçetesiz kombinasyon preparatlarını toplayarak günlük tavanı kesinlikle koruyun.',
          },
          {
            severity: 'D',
            agent: 'Kronik Alkol · İzoniazid (INH) · Rifampisin · Karbamazepin · Fenitoin · Fenobarbital',
            mechanism: 'Hepatik CYP2E1 Enzim İndüksiyonu (+ Alkolde Glutatyon Tükenmesi)',
            clinicalEffect:
              'Toksik NAPQI ara ürünü oluşumu belirgin artar; sınırda/terapötik dozlarda dahi ciddi karaciğer hasarı gelişebilir.',
            management:
              'Günlük toplam Parasetamol dozunu ≤2000 mg/gün ile sınırlandırın, aktif alkol alımından kesinlikle kaçının ve ALT/AST/INR izleyin.',
          },
          {
            severity: 'D',
            agent: 'Flukloksasilin (Eş Zamanlı Kullanım)',
            mechanism: '5-Oksoprolinaz İnhibisyonu + Glutatyon Tükenmesi (γ-Glutamil Döngüsü Bloğu)',
            clinicalEffect:
              'Özellikle yaşlı, malnütrisyonlu, septik veya böbrek yetmezlikli hastalarda ağır 5-oksoprolin (piroglutamik asit) Yüksek Anyon Açıklı Metabolik Asidozu (HAGMA).',
            management:
              'Uzun süreli eş zamanlı kullanımdan kaçının; açıklanamayan HAGMA gelişirse her iki ilacı derhal kesin ve NAC değerlendirin.',
          },
          {
            severity: 'D',
            agent: 'Varfarin (ve Diğer K Vitamini Antagonistleri)',
            mechanism: 'NAPQI Aracılı K Vitamini Epoksit Redüktaz / Karboksilaz İnhibisyonu',
            clinicalEffect:
              '>2 g/gün ve ≥3–4 gün düzenli Parasetamol kullanımında INR’de anlamlı yükselme ve kanama riski artışı.',
            management:
              'Tek/kısa süreli dozlarda güvenlidir; ancak ≥3 gün düzenli ≥2 g/gün kullanılacaksa 3–5 gün içinde INR kontrolü yapıp gerekirse Varfarin dozunu ayarlayın.',
          },
          {
            severity: 'C',
            agent: 'Busulfan (Yüksek Doz Kemoterapi Hazırlık Rejimleri)',
            mechanism: 'Hepatik Glutatyon Depolarının Tüketilmesi & Busulfan Klirens Azalması',
            clinicalEffect:
              'Busulfan plazma düzeyinde artış ve hepatik sinüzoidal obstrüksiyon sendromu (VOD) riski.',
            management:
              'Yüksek doz Busulfan uygulamasından 72 saat önce ve infüzyon süresince Parasetamol kullanımından kaçının.',
          },
          {
            severity: 'C',
            agent: 'Lamotrijin & Zidovudin',
            mechanism: 'UGT Glukuronidasyon Etkileşimi',
            clinicalEffect:
              'Kronik düzenli Parasetamol lamotrijin glukuronidasyonunu hafif artırarak serum lamotrijin düzeyini düşürebilir.',
            management:
              'Kronik yüksek doz kullanım gerekirse nöbet kontrolü/lamotrijin düzeyi izlenir; kısa süreli perioperatif kullanımda klinik önemi düşüktür.',
          },
        ]}
        references={[
          {
            authors: 'Young P, Saxena M, Bellomo R, et al. (HEAT Investigators)',
            title: 'Acetaminophen for Fever in Critically Ill Patients with Suspected Infection',
            journal: 'New England Journal of Medicine',
            year: 2015,
            note: '700 YBÜ hastasında enfeksiyöz ateşte 1 g IV q6sa parasetamolün 28 günlük YBÜ-dışı gün sayısı ve mortaliteye etkisiz olduğunu gösteren landmark RKÇ.',
          },
          {
            authors: 'Chiam E, Weinberg L, Bellomo R',
            title: 'Paracetamol: a review with specific focus on the haemodynamic effects of intravenous administration',
            journal: 'Heart, Lung and Vessels / Anaesthesia',
            year: 2015,
            note: 'İV Parasetamol infüzyonunun kritik hastalarda mannitol taşıyıcısı ve Kv7 aracılı vazodilatasyonla MAP’ta 10–15 mmHg düşüşe yol açabileceğini gösteren derleme ve fizyolojik çalışma.',
          },
          {
            authors: 'Bateman DN, Dear JW, Thanacoody HKR, et al. (SNAP Trial)',
            title: 'Reduction of adverse effects from intravenous acetylcysteine treatment for paracetamol poisoning: a randomised controlled trial',
            journal: 'The Lancet',
            year: 2014,
            note: '2-torbalı modifiye (SNAP) NAC rejiminin klasik 3-torbalı 21 saatlik rejime kıyasla anafilaktoid reaksiyonları ve kusmayı dramatik azalttığını gösteren RKÇ.',
          },
          {
            authors: 'Gosselin S, Juurlink DN, Kielstein JT, et al. (EXTRIP Workgroup)',
            title: 'Extracorporeal treatment for acetaminophen poisoning: recommendations from the EXTRIP workgroup',
            journal: 'Clinical Toxicology',
            year: 2014,
            note: 'Masif parasetamol zehirlenmesinde (>900–1000 mg/L + laktik asidoz/ensefalopati) acil hemodiyaliz endikasyonlarını belirleyen uluslararası konsensüs.',
          },
          {
            authors: 'Ahlqvist VH, Sjöqvist H, Dalman C, et al.',
            title: 'Acetaminophen Use During Pregnancy and Children’s Risk of Autism, ADHD, and Intellectual Disability',
            journal: 'JAMA',
            year: 2024,
            note: '2,48 milyon çocukluk kardeş-kontrollü kohortta gebelikte parasetamol kullanımı ile otizm/DEHB arasında nedensel ilişki olmadığını gösteren çalışma.',
          },
          {
            authors: 'Chou R, Gordon DB, de Leon-Casasola OA, et al. (APS / ASRA / ASA)',
            title: 'Management of Postoperative Pain: A Clinical Practice Guideline',
            journal: 'The Journal of Pain',
            year: 2016,
            note: 'Multimodal perioperatif analjezide düzenli parasetamol kullanımının opioid-tasarruflu temel taş olarak güçlü önerisi.',
          },
          {
            authors: 'Rumack BH, Matthew H',
            title: 'Acetaminophen poisoning and toxicity',
            journal: 'Pediatrics',
            year: 1975,
            note: 'Akut tek alım parasetamol doz aşımında 4. saat plazma düzeyine göre NAC tedavi eşiğini tanımlayan klasik Rumack-Matthew nomogramı.',
          },
        ]}
      />
    </div>
  );
};
