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
  FlaskConical,
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

type CalcTab = 'acidosis' | 'toxicology' | 'hyperk_la' | 'pediatric';
type ToxScenario = 'tca_na_blocker' | 'salicylate_urine_alk' | 'toxic_alcohol';
type HyperkLaMode = 'hyperkalemia' | 'la_buffering';
type LaAgent = 'lidocaine_mepi' | 'bupivacaine_ropi';

// Türkiye standart %8,4 Sodyum Bikarbonat ampulü: 10 mL = 840 mg NaHCO3 = 10 mEq (10 mmol) Na+ ve HCO3-
const AMPULE_MEQ = 10; // 1 mL = 1 mEq = 1 mmol = 84 mg NaHCO3
const ISOTONIC_BAG_MEQ = 150; // 150 mEq (15 ampul 10 mL) + 850 mL D5W = 1000 mL (~150 mEq/L)

export const SodiumBicarbonateProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('acidosis');

  // Tab 1: Metabolik Asidoz / Bikarbonat Açığı & BICAR-ICU
  const [acidWeightKg, setAcidWeightKg] = useState<number>(70);
  const [currentHco3, setCurrentHco3] = useState<number>(10);
  const [targetHco3, setTargetHco3] = useState<number>(16);
  const [vdFactor, setVdFactor] = useState<number>(0.5);

  // Tab 2: Toksikoloji & İdrar Alkalinizasyonu
  const [toxScenario, setToxScenario] = useState<ToxScenario>('tca_na_blocker');
  const [toxWeightKg, setToxWeightKg] = useState<number>(75);
  const [toxBolusMeqKg, setToxBolusMeqKg] = useState<number>(1.5);

  // Tab 3: Hiperkalemi + Asidoz & Lokal Anestezik Tamponlama
  const [hyperkLaMode, setHyperkLaMode] = useState<HyperkLaMode>('hyperkalemia');
  const [hyperkDoseMeq, setHyperkDoseMeq] = useState<number>(50);
  const [laAgent, setLaAgent] = useState<LaAgent>('lidocaine_mepi');
  const [laVolumeMl, setLaVolumeMl] = useState<number>(20);

  // Tab 4: Pediatrik & Yenidoğan (%4,2 Yarı-Molar Güvenlik Modu)
  const [pedWeightKg, setPedWeightKg] = useState<number>(12);
  const [pedDoseMeqKg, setPedDoseMeqKg] = useState<number>(1.0);
  const [pedForceHalfMolar, setPedForceHalfMolar] = useState<boolean>(true);

  // Akordiyon State (Varsayılan Kapalı)
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik ID'leri
  const acidWeightSliderId = useId();
  const acidWeightInputId = useId();
  const currentHco3SliderId = useId();
  const targetHco3SliderId = useId();
  const toxWeightSliderId = useId();
  const toxWeightInputId = useId();
  const toxBolusSliderId = useId();
  const laVolumeSliderId = useId();
  const pedWeightSliderId = useId();
  const pedWeightInputId = useId();
  const pedDoseSliderId = useId();

  // --- HESAPLAMALAR ---
  // Tab 1: Bikarbonat Açığı (HCO3 Deficit)
  const hco3Diff = Math.max(0, targetHco3 - currentHco3);
  const totalDeficitMeq = Math.round(vdFactor * acidWeightKg * hco3Diff);
  const initialHalfMeq = Math.round(totalDeficitMeq * 0.5);
  const initialHalfAmpules10 = Number((initialHalfMeq / AMPULE_MEQ).toFixed(1));
  const totalAmpules10 = Number((totalDeficitMeq / AMPULE_MEQ).toFixed(1));
  const initialSodiumGrams = Number(((initialHalfMeq * 23) / 1000).toFixed(2));
  const initialCo2Liters = Number(((initialHalfMeq * 22.4) / 1000).toFixed(2)); // 1 mmol HCO3- -> ~22.4 mL CO2 (STP)
  const isOverTarget = targetHco3 > 20;

  // Tab 2: Toksikoloji & İdrar Alkalinizasyonu
  const toxBolusMeqRaw = Math.round(toxWeightKg * toxBolusMeqKg);
  const toxBolusMeq = Math.min(150, Math.max(25, toxBolusMeqRaw));
  const toxBolusAmpules10 = Number((toxBolusMeq / AMPULE_MEQ).toFixed(1));
  const toxInfusionMinMlHr = Math.round(toxWeightKg * 2); // ~2 mL/kg/sa (150 mEq/L izotonik)
  const toxInfusionMaxMlHr = Math.min(300, Math.round(toxWeightKg * 3)); // ~3 mL/kg/sa
  const toxInfusionMeqHrMin = Number(((toxInfusionMinMlHr * ISOTONIC_BAG_MEQ) / 1000).toFixed(1));
  const toxInfusionMeqHrMax = Number(((toxInfusionMaxMlHr * ISOTONIC_BAG_MEQ) / 1000).toFixed(1));

  // Tab 3: Hiperkalemi & Lokal Anestezik Tamponlama
  const hyperkAmpules10 = Number((hyperkDoseMeq / AMPULE_MEQ).toFixed(1));
  const laBicarbMl =
    laAgent === 'lidocaine_mepi'
      ? Number((laVolumeMl / 10).toFixed(1)) // 1:10 oranı (1 mL %8,4 / 10 mL Lidokain-Mepivakain)
      : Number((laVolumeMl * 0.01).toFixed(2)); // Bupivakain/Ropivakain: ≤0,1 mL / 10 mL (çökelti sınırı!)

  // Tab 4: Pediatrik & Yenidoğan
  const isNeonateOrInfant = pedWeightKg <= 5;
  const useHalfMolar = isNeonateOrInfant || pedForceHalfMolar;
  const pedRawMeq = Number((pedWeightKg * pedDoseMeqKg).toFixed(1));
  const pedCappedMeq = Math.min(50, pedRawMeq); // Tek acil bolus erişkin üst sınırı ~50 mEq
  const pedCapHit = pedRawMeq > 50;
  const pedVolume84Ml = pedCappedMeq; // 1 mEq/mL
  const pedVolume42Ml = Number((pedCappedMeq * 2).toFixed(1)); // 0,5 mEq/mL (%4,2 = 1:1 sulandırılmış)

  // Yapılandırılmış Türkçe Klinik Order Özeti
  const buildCopySummary = (): string => {
    const activeOrder = (() => {
      if (activeTab === 'acidosis') {
        return [
          `• Aktif Order (Metabolik Asidoz / Bikarbonat Açığı · ${acidWeightKg} kg · Mevcut HCO₃⁻: ${currentHco3} → Hedef: ${targetHco3} mEq/L · Vd: ${vdFactor
            .toFixed(1)
            .replace('.', ',')} L/kg):`,
          `  1) Toplam Hesaplanan Açık: ${totalDeficitMeq} mEq (${totalAmpules10
            .toString()
            .replace('.', ',')} × 10 mL %8,4 ampul).`,
          `  2) İLK 4–8 SAAT (%50 Düzeltme): ${initialHalfMeq} mEq (${initialHalfAmpules10
            .toString()
            .replace('.', ',')} × 10 mL %8,4 ampul) — İzotonik hazırlık: 150 mEq (15 ampul) + 850 mL D5W (150 mEq/L) üzerinden yavaş IV infüzyon!`,
          `  3) BICAR-ICU (Lancet 2018 · pH ≤7,20 + AKIN 2–3 ABH): %4,2 çözelti 125–250 mL / 30 dk (hedef arter pH ≥7,30; 24 saatte maks 1000 mL %4,2 = 500 mEq).`,
          `  4) Metabolik Yük: İlk %50 doz = +${initialSodiumGrams
            .toString()
            .replace('.', ',')} g Na⁺ ve ~${initialCo2Liters
            .toString()
            .replace('.', ',')} L CO₂ üretimi → etkin dakika ventilasyonu + 2–4 sa AKG/K⁺/iCa²⁺ kontrolü ZORUNLU!`,
        ].join('\n');
      }

      if (activeTab === 'toxicology') {
        const scenarioLabel =
          toxScenario === 'tca_na_blocker'
            ? 'TCA / Sodyum Kanal Blokeri Toksisitesi (QRS >100 ms)'
            : toxScenario === 'salicylate_urine_alk'
              ? 'Salisilat / Fenobarbital / Yüksek Doz MTX İdrar Alkalinizasyonu'
              : 'Toksik Alkol (Metanol / Etilen Glikol · pH <7,30)';
        const targetText =
          toxScenario === 'tca_na_blocker'
            ? 'Hedef: QRS <100 ms & arter pH 7,45–7,55 (pH >7,55 AŞMA!)'
            : toxScenario === 'salicylate_urine_alk'
              ? 'Hedef: İdrar pH 7,5–8,0 (arter pH ≤7,55) + K⁺ 4,0–4,5 mEq/L (hipokalemi = paradoksal asidüri!)'
              : 'Hedef: Arter pH >7,30–7,35 (Fomepizol/Etanol + Acil Hemodiyaliz eşliğinde!)';
        return [
          `• Aktif Order (${scenarioLabel} · ${toxWeightKg} kg · ${toxBolusMeqKg
            .toFixed(1)
            .replace('.', ',')} mEq/kg):`,
          `  1) IV Bolus: ${toxBolusMeq} mEq (${toxBolusAmpules10
            .toString()
            .replace('.', ',')} × 10 mL %8,4 ampul) — 1–2 dk yavaş IV puşe (QRS daralana / klinik yanıt alınana dek tekrarlanabilir).`,
          `  2) İzotonik Sürekli İnfüzyon: 150 mEq (15 × 10 mL %8,4 ampul) + 850 mL %5 Dekstroz (D5W) = 1000 mL (~150 mEq/L) → Hız: ${toxInfusionMinMlHr}–${toxInfusionMaxMlHr} mL/sa (${toxInfusionMeqHrMin
            .toString()
            .replace('.', ',')}–${toxInfusionMeqHrMax
            .toString()
            .replace('.', ',')} mEq/sa). SF (%0,9 NaCl) İÇİNE EKLEME!`,
          `  3) ${targetText}`,
        ].join('\n');
      }

      if (activeTab === 'hyperk_la') {
        if (hyperkLaMode === 'hyperkalemia') {
          return [
            `• Aktif Order (Ağır Hiperkalemi + Eşlik Eden Metabolik Asidoz):`,
            `  Sodyum Bikarbonat %8,4: ${hyperkDoseMeq} mEq (${hyperkAmpules10
              .toString()
              .replace('.', ',')} × 10 mL ampul) 5–10 dk yavaş IV (veya 150 mEq / 850 mL D5W infüzyon).`,
            `  UYARI: Tek başına 1. basamak değildir (önce IV Kalsiyum → İnsülin+Dekstroz → Salbutamol)! Kalsiyum ile AYNI HATTAN ASLA VERME (CaCO₃ çökeltisi!).`,
          ].join('\n');
        }
        return [
          `• Aktif Order (Lokal Anestezik Tamponlama · ${
            laAgent === 'lidocaine_mepi' ? 'Lidokain / Mepivakain' : 'Bupivakain / Ropivakain — YÜKSEK ÇÖKELTİ RİSKİ!'
          } · ${laVolumeMl} mL):`,
          laAgent === 'lidocaine_mepi'
            ? `  ${laVolumeMl} mL Lidokain/Mepivakain + ${laBicarbMl
                .toString()
                .replace('.', ',')} mL %8,4 Sodyum Bikarbonat (1:10 oranı) — enjeksiyon ağrısını azaltır, blok başlangıcını hızlandırır (taze hazırla, hemen kullan!).`
            : `  UYARI: Bupivakain/Ropivakain alkali ortamda hızla beyaz serbest baz çökeltisi yapar! En fazla ${laBicarbMl
                .toString()
                .replace('.', ',')} mL (0,1 mL / 10 mL) — rutin tamponlama ÖNERİLMEZ!`,
        ].join('\n');
      }

      return [
        `• Aktif Order (Pediatrik${isNeonateOrInfant ? ' / YENİDOĞAN' : ''} · ${pedWeightKg} kg · ${pedDoseMeqKg
          .toFixed(1)
          .replace('.', ',')} mEq/kg):`,
        `  Hesaplanan Doz: ${pedCappedMeq.toString().replace('.', ',')} mEq IV (tavan 50 mEq).`,
        useHalfMolar
          ? `  ZORUNLU %4,2 (Yarı-Molar = 0,5 mEq/mL) HAZIRLIK: ${pedVolume84Ml
              .toString()
              .replace('.', ',')} mL %8,4 NaHCO₃ + ${pedVolume84Ml
              .toString()
              .replace('.', ',')} mL Steril Enjeksiyonluk Su (1:1) = ${pedVolume42Ml
              .toString()
              .replace('.', ',')} mL %4,2 çözelti → ≥20–30 dk yavaş IV (İVH & hiperozmolarite önlemi!).`
          : `  %8,4 (1 mEq/mL) hacim: ${pedVolume84Ml
              .toString()
              .replace('.', ',')} mL (tercihen yine 1:1 seyreltilip santral/geniş venden ≥10–15 dk yavaş IV verin!).`,
      ].join('\n');
    })();

    return [
      `SODYUM BİKARBONAT %8,4 (NaHCO₃ · 1 mEq/mL = 1 mmol/mL = 84 mg/mL · 10 mL Ampul = 10 mEq) KLİNİK ORDER ÖZETİ`,
      `• ATC: B05XA02 · Sistemik Alkalinizan · Hiperozmolar (~2.000 mOsm/L) · pH 7,0–8,5`,
      activeOrder,
      `• KRİTİK GÜVENLİK: (1) Kalsiyum tuzlarıyla (CaCl₂/Ca Glukonat) ANINDA CaCO₃ çökeltisi, katekolaminlerle (Adrenalin/Noradrenalin/Dopamin/Dobutamin) İNAKTİVASYON → ayrı lümen! (2) Sürekli izotonik infüzyon SF ile DEĞİL D5W/Steril Su ile (150 mEq + 850 mL D5W) hazırlanır! (3) Etkin ventilasyon şarttır (hipoventilasyonda CO₂ artışı + paradoksal hücre içi asidoz)!`,
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
          { id: 'sec-pkpd', label: 'Fizyoloji & PK' },
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
        tallManName="SODIUM BICARBONATE %8,4 (1 mEq/mL)"
        confusionRiskWith="Sodyum Klorür (%3 / %20 NaCl) · Potasyum Klorür (%7,5 KCl) · Kalsiyum Glukonat"
        criticalAlerts={[
          'EKSTREM HİPEROZMOLARİTE (~2.000 mOsm/L) & EKSTRAVAZASYON NEKROZU: %8,4 Sodyum Bikarbonat %3 hipertonik salinin neredeyse 2 katı ozmolaritededir! Küçük periferik venden hızlı veya tekrarlayan seyreltilmemiş bolus ekstravaze olursa ağır kimyasal selülit, doku ülserasyonu ve cilt nekrozu yapar. Sürekli infüzyon mutlaka izotonik seyreltmeyle (150 mEq + 850 mL D5W) veya santral hattan uygulanmalıdır!',
          'KALSİYUM ÇÖKELTİSİ (CaCO₃) & KATEKOLAMİN İNAKTİVASYONU: Kalsiyum Klorür / Kalsiyum Glukonat ile aynı hattan verildiğinde saniyeler içinde beyaz Kalsiyum Karbonat çökeltisi oluşur! Adrenalin, Noradrenalin, Dopamin ve Dobutamin alkali ortamda kimyasal olarak inaktive olur — daima ayrı lümen veya öncesi/sonrası bol SF yıkama şarttır!',
          'İZOTONİK İNFÜZYONDA %0,9 NaCl (SF) TUZAĞI: 150 mEq %8,4 NaHCO₃ çözeltisi ASLA 850 mL %0,9 NaCl içine eklenmez — toplam Na⁺ ~300 mEq/L (~600 mOsm/L) olup ağır HİPERNATREMİ ve pulmoner ödeme yol açar! İzotonik bikarbonat infüzyonu daima %5 Dekstroz (D5W) veya Steril Enjeksiyonluk Su ile (150 mEq + 850 mL D5W) hazırlanır!',
          'VENTİLASYON ŞARTI & PARADOKSAL HÜCRE İÇİ ASİDOZ: Her 1 mEq HCO₃⁻ tamponlamada ~22,4 mL CO₂ üretir (HCO₃⁻ + H⁺ ↔ H₂CO₃ ↔ CO₂ + H₂O). Yetersiz dakika ventilasyonu olan veya hipoventile hastada üretilen CO₂ atılamaz, hızla hücre ve BOS zarından geçerek PARADOKSAL HÜCRE İÇİ & BOS ASİDOZUNU derinleştirir!',
          'YENİDOĞAN & PREMATÜREDE %8,4 YASAK → %4,2 (1:1 SEYRELTME) ZORUNLU: Hiperozmolar %8,4 hızlı puşe yenidoğan/prematürelerde ani serum ozmolarite sıçraması ile ölümcül İNTRAVENTRİKÜLER HEMORAJİ (İVH) yapar — mutlaka 1:1 steril su ile %4,2’ye (0,5 mEq/mL) seyreltilip ≥20–30 dk yavaş verilmelidir!',
        ]}
        antidoteOrRescue="Spesifik kimyasal antidotu yoktur. Aşırı doz / iyatrojenik metabolik alkaloz, hipernatremi, hipokalemi ve iyonize hipokalsemide: (1) İnfüzyonu derhal kesin; (2) Hipokalemiyi IV KCl ile düzeltin (alkalozda K⁺ hızla hücre içine girer!); (3) Tetani/laringospazm/QT uzaması gelişirse AYRI HATTAN %10 Kalsiyum Glukonat 10–20 mL IV verin; (4) Ağır volüm/Na⁺ yüklenmesinde loop diüretik (Furosemid) veya oligürik/anürik hastada acil hemodiyaliz/CRRT uygulayın; (5) Ekstravazasyonda hattı kapatın, hafif aspirasyon deneyin, ekstremiteyi eleve edin, sıcak/soğuk lokal protokol ve şiddetli doku hasarında plastik cerrahi değerlendirmesi isteyin (bazı merkezlerde lokal hyaluronidaz kullanılır)."
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
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                    : 'bg-cyan-50 text-cyan-800 border-cyan-200'
                }`}
              >
                Sistemik Alkalinizan · Elektrolit &amp; Toksikoloji Antidotu
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                %8,4 = 1 mEq/mL (1 mmol/mL) · ~2.000 mOsm/L · pH 7,0–8,5
              </span>
              <span
                className={`font-mono px-2.5 py-0.5 rounded-md border ${
                  isDark
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                TR: 10 mL Ampul (10 mEq = 840 mg) · 50 / 100 mL Flakon
              </span>
              <span className={`font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>ATC: B05XA02</span>
            </div>

            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Sodyum Bikarbonat %8,4 (NaHCO₃ · Molar Solüsyon · 1 mEq/mL) Monografisi
            </h1>

            <p className={`text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Klinik Kimlik &amp; Rol:</strong>{' '}
              Ekstraselüler sıvının fizyolojik ana tamponu olan bikarbonat iyonunu (<strong>HCO₃⁻</strong>) doğrudan
              sağlayan, <strong>1 mL = 1 mEq = 1 mmol = 84 mg NaHCO₃</strong> konsantrasyonunda hiperozmolar (~2.000
              mOsm/L) parenteral çözeltidir. Klinik tıpta; <strong>trisiklik antidepresan (TCA) ve voltaj-kapılı
              sodyum kanal blokeri zehirlenmelerinde</strong> hayat kurtarıcı 1. basamak antidot,{' '}
              <strong>salisilat / fenobarbital / yüksek doz metotreksat toksisitesinde</strong> idrar alkalinizasyon
              ajanı, <strong>ağır normal anyon açıklı metabolik asidozda (NAGMA / RTA / ağır diyare)</strong>,{' '}
              <strong>ABH eşlik eden ağır YBÜ asidemisinde</strong> (<em>BICAR-ICU, Lancet 2018</em>; pH ≤7,20 + AKIN
              2–3), <strong>asidoz eşlik eden ağır hiperkalemide</strong> adjuvan ve{' '}
              <strong>lokal anestezik tamponlamasında</strong> (Lidokain 1:10) kullanılır. Buna karşın rutin kardiyak
              arrestte (AHA 2020), pH ≥7,0 DKA&apos;da (ADA 2024), ABH&apos;siz hafif-orta laktik asidozda ve rutin
              kontrast nefropatisi profilaksisinde (<em>PRESERVE, NEJM 2018</em>) kanıtlanmış yararı yoktur.
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
        sectionTitle="Etki Mekanizması & Çoklu Fizyolojik Hedefler (Yatak Başı Özet)"
        summary="Sodyum Bikarbonat yalnızca bir 'pH yükseltici' değildir — dört ayrı biyokimyasal ve elektrofizyolojik mekanizma üzerinden etki gösterir: (1) Henderson-Hasselbalch tamponlaması, (2) yüksek Na⁺ yükü + alkalinizasyonla kardiyak Na⁺ kanalı kurtarması, (3) renal tübüler iyon tuzağı ile zayıf asit toksinlerin atılımı ve (4) transselüler K⁺ kayması."
        pillars={[
          {
            title: '1. Ekstraselüler Tamponlama (H⁺ + HCO₃⁻ ↔ H₂CO₃ ↔ CO₂ + H₂O)',
            detail:
              'Serbest H⁺ iyonlarını bağlayarak plazma pH’sını yükseltir; oluşan karbonik asit (H₂CO₃) karbonik anhidrazla CO₂ ve suya ayrılır. Tamponlamanın tamamlanması için oluşan CO₂’nin akciğerlerden atılması ŞARTTIR!',
          },
          {
            title: '2. Kardiyak Na⁺ Kanalı Kurtarması (TCA / LAST / Klas IA–IC)',
            detail:
              'Hem yüksek ekstraselüler Na⁺ gradyenti (voltaj-kapılı Nav1.5 kanallarındaki yarışmalı blokajı aşar) hem de serum alkalinizasyonu (ilacın α₁-asit glikoproteine bağlanmasını artırır ve aktif iyonize fraksiyonu azaltır) ile geniş QRS’yi daraltır.',
          },
          {
            title: '3. İdrar Alkalinizasyonu & İyon Tuzağı (Salisilat / MTX / Fenobarbital)',
            detail:
              'İdrar pH’sını 7,5–8,0’a çıkararak zayıf asit yapılı toksinlerin iyonize (polar) formda kalmasını sağlar; tübüler geri emilimi bloke ederek renal klirensi kat kat artırır (salisilatta 10–20 kat!).',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. FİZYOLOJİ & FARMAKOKİNETİK (ADME) AKORDİYONU (#sec-pkpd)         */}
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
                isDark ? 'bg-cyan-500/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
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
                <span>Fizyolojik Dağılım &amp; Farmakokinetik Özellikleri</span>
                <span
                  className={`text-xs font-normal px-2 py-0.5 rounded font-mono ${
                    isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-50 text-cyan-700'
                  }`}
                >
                  IV Onset: Saniyeler · Vd: ~0,4–0,5 L/kg · 1 mEq → ~22,4 mL CO₂ · Atılım: Akciğer + Böbrek
                </span>
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Bikarbonat dağılım alanı (asidemi derinleştikçe artan Vd), CO₂ üretim stokiometrisi, iyonize kalsiyum düşüşü ve renal eliminasyon.
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
                  Etki Başlangıcı
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>
                  Anında (IV)
                </span>
                <span className="text-[10px] text-slate-400">Pik 15–30 dk · İdrar pH: 15–60 dk</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Görünür Dağılım (Vd)
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                  0,4 – 0,5 L/kg
                </span>
                <span className="text-[10px] text-slate-400">Ağır asidemide (&lt;10 mEq/L) 0,6–0,8!</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  CO₂ &amp; Sodyum Yükü
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                  1 mEq = 23 mg Na⁺
                </span>
                <span className="text-[10px] text-slate-400">+ ~22,4 mL CO₂ / mEq HCO₃⁻</span>
              </div>

              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className={`block text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Eliminasyon
                </span>
                <span className={`text-base font-bold font-mono mt-1 block ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                  Akciğer (CO₂) + Böbrek
                </span>
                <span className="text-[10px] text-slate-400">Hepatik metabolizma YOK</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• Dinamik Bikarbonat Alanı (Vd):</strong>{' '}
                Normalde bikarbonat toplam vücut suyunun yaklaşık yarısına (<strong>0,4–0,5 L/kg</strong>) dağılır.
                Ancak şiddetli metabolik asidozda (serum HCO₃⁻ &lt;10 mEq/L) kemik ve hücre içi non-bikarbonat
                tamponların devreye girmesiyle görünür Vd <strong>0,6–0,8 L/kg&apos;a</strong> kadar genişleyebilir.
                Bu nedenle tüm hesaplanan açık asla tek seferde verilmez; önce <strong>%50&apos;si</strong> uygulanıp
                arteriyel kan gazı (AKG) ile yeniden titre edilir.
              </div>
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• CO₂ Yükü ve Ventilasyon Bağımlılığı:</strong>{' '}
                Verilen <strong>50 mEq</strong> NaHCO₃, serbest H⁺ ile birleştiğinde yaklaşık{' '}
                <strong>1,12 litre CO₂</strong> üretir. Normal ventile edilen hastada bu CO₂ 5–15 dk içinde ekshale
                edilir; ancak mekanik ventilasyonun sabit tutulduğu veya solunum depresyonu olan hastada PaCO₂ hızla
                yükselir ve CO₂ lipid membranlardan serbestçe geçerek <strong>miyokard ve beyin hücre içi pH&apos;sını
                daha da düşürür!</strong>
              </div>
              <div>
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>• Serum Elektrolit Kaymaları:</strong>{' '}
                Arteriyel pH&apos;daki her <strong>+0,10</strong> birimlik artış, serum <strong>K⁺ düzeyini ~0,4–0,6
                mEq/L</strong> düşürür (hücre içine kayma) ve <strong>iyonize kalsiyumu (iCa²⁺) ~0,05–0,10 mmol/L</strong>{' '}
                azaltır (albumin üzerindeki negatif yük artışı → Ca²⁺ bağlanması artar).
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
          'Mevcut Metabolik veya Solunumsal Alkaloz (pH >7,45–7,55): Ek bikarbonat hayatı tehdit eden şiddetli alkalemi, serebral/koroner vazokonstriksiyon, refrakter aritmi, nöbet ve solunum depresyonu yaratır.',
          'Düzeltilmemiş Ağır Hipokalsemi (İyonize Ca²⁺ Düşüklüğü + Tetani / Uzamış QTc): Alkalinizasyon albuminin Ca²⁺ bağlamasını artırarak serbest iCa²⁺’yi daha da düşürür — akut tetani, laringospazm, nöbet ve miyokard depresyonunu patlatır!',
          'Hipokloremik Alkaloz (Şiddetli Kusma, Sürekli Nazogastrik Aspirasyon veya Ağır Loop/Tiyazid Diüretik Kaybı): Bu tablonun tedavisi bikarbonat değil %0,9 NaCl + KCl replasmanıdır.',
          'İzole Solunumsal Asidoz (Hipoventilasyon / Hiperkapni) ve Yetersiz Ventilasyon: CO₂ atılamayan hastada bikarbonat PaCO₂’yi daha da yükseltip paradoksal hücre içi / BOS asidozunu ağırlaştırır — tedavi ventilasyonu artırmaktır!',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Dikkat Edilecek Durumlar"
        relativeItems={[
          'Ağır Hipernatremi (Na⁺ >150–155 mEq/L) veya Hiperozmolarite: Her 100 mEq NaHCO₃ 100 mEq (2,3 g) Na⁺ yükler (~650 mL SF’lik sodyum!).',
          'Dekompansasyonlu Kalp Yetmezliği, Akut Pulmoner Ödem, Oligüri/Anüri & Ağır Siroz/Asit (Child-Pugh C): Yüksek Na⁺/su yükü akciğer ödemini ve asiti hızla ağırlaştırır; sirozda alkaloz hepatik ensefalopatiyi tetikler.',
          'Düzeltilmemiş Hipokalemi (K⁺ <3,0–3,5 mEq/L): Alkalinizasyon K⁺’yı hızla hücre içine çekerek ventriküler aritmi/TdP yaratır; ayrıca idrar alkalinizasyonunda hipokalemi paradoksal asidüriye neden olur.',
          'Diyabetik Ketoasidozda pH ≥7,0 (ADA 2024) ve Rutin Kardiyak Arrest (AHA 2020): Klinik yararı gösterilmemiştir; pediatrik DKA’da serebral ödem riskini artırır.',
          'Yenidoğan & Prematürelerde Seyreltilmemiş %8,4 Bolus: Mutlaka %4,2 (1:1 seyreltme) ve yavaş infüzyon uygulanmalıdır (İVH riski!).',
        ]}
        clinicalNote="Akut TCA/Na⁺ kanal blokeri zehirlenmesi (QRS >100 ms) veya pH <7,0 yaşamı tehdit eden asidemi gibi acillerde relatif kontrendikasyonlar sıkı AKG, K⁺, iCa²⁺ ve dakika ventilasyonu kontrolü altında yönetilerek tedavi uygulanır."
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
            <BookOpen className={`w-5 h-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              Klinik Endikasyonlar &amp; Doz Rejimleri (BICAR-ICU · SSC 2021 · Toksikoloji · ADA 2024 · AHA 2020)
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">1 Ampul (10 mL %8,4) = 10 mEq = 840 mg</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* A. TCA & Sodyum Kanal Blokeri Zehirlenmesi */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                <span>A. TCA &amp; Na⁺ Kanal Blokeri Toksisitesi (1. Basamak Antidot!)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-100 text-rose-800'
                }`}
              >
                1–2 mEq/kg IV Bolus
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Amitriptilin/TCA, Klas IA–IC antiaritmik (flekainid, propafenon, prokainamid), kokain, difenhidramin,
              karbamazepin ve ağır lokal anestezik toksisitesinde <strong>QRS &gt;100 ms</strong>, terminal R dalgası
              (aVR &gt;3 mm), VT veya dirençli hipotansiyonda:{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>1–2 mEq/kg IV hızlı bolus</strong>{' '}
              (1–2 dk) → QRS daralana dek her 3–5 dk tekrarla → ardından{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>150 mEq / 850 mL D5W</strong>{' '}
              (150–250 mL/sa). <strong>Hedef:</strong> QRS &lt;100 ms ve arter pH <strong>7,45–7,55</strong> (pH
              &gt;7,55 aşma!).
            </p>
          </div>

          {/* B. İdrar Alkalinizasyonu (Salisilat / MTX / Fenobarbital) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <FlaskConical className="w-4 h-4 text-purple-500 shrink-0" />
                <span>B. İdrar Alkalinizasyonu (Salisilat · Fenobarbital · Yüksek Doz MTX)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-800'
                }`}
              >
                İdrar pH 7,5–8,0
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Aspirin/salisilat, fenobarbital, yüksek doz metotreksat (MTX kurtarma), klorpropamid ve 2,4-D herbisit
              zehirlenmesinde:{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>1–2 mEq/kg IV bolus</strong>{' '}
              →{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>150 mEq + 850 mL D5W</strong>{' '}
              (2–3 mL/kg/sa; ~150–250 mL/sa) ile <strong>idrar pH 7,5–8,0</strong> (arter pH ≤7,55) hedeflenir.{' '}
              <strong>ALTIN KURAL:</strong> Eş zamanlı <strong>K⁺ 4,0–4,5 mEq/L</strong> tutulmazsa (torbaya 20–40 mEq
              KCl eklenir) böbrek K⁺ tutmak için H⁺ atar (<em>paradoksal asidüri</em>) ve idrar alkalileşmez!
            </p>
          </div>

          {/* C. Ağır Metabolik Asidoz (BICAR-ICU ABH & NAGMA / RTA / Diyare) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Activity className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>C. Ağır Metabolik Asidoz (BICAR-ICU ABH &amp; NAGMA / RTA / Diyare)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-cyan-500/20 text-cyan-300' : 'bg-cyan-100 text-cyan-800'
                }`}
              >
                pH ≤7,20 + ABH
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>1) Normal Anyon Açıklı Asidoz (NAGMA — ağır diyare, RTA Tip 1/2, pankreatik/ileal fistül,
              hiperkloremik asidoz):</strong> Gerçek HCO₃⁻ kaybı vardır → hesaplanan açığın <strong>%50&apos;si 4–8
              saatte</strong> (hedef HCO₃⁻ 15–18 mEq/L, pH &gt;7,20–7,30).{' '}
              <strong>2) YBÜ Ağır Asidemi + AKIN 2–3 ABH (BICAR-ICU, Lancet 2018 &amp; SSC 2021):</strong> pH ≤7,20,
              PaCO₂ ≤45 ve AKIN 2–3 ABH varlığında <strong>%4,2 125–250 mL / 30 dk</strong> (maks 1000 mL/24 sa, hedef
              pH ≥7,30) 28 günlük mortaliteyi ve RRT ihtiyacını azaltmıştır. (KBY kronik asidozda oral NaHCO₃ tablet
              500–1000 mg 2–3×1 kullanılır; KDIGO 2024.)
            </p>
          </div>

          {/* D. Ağır Hiperkalemi + Metabolik Asidoz */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Droplets className="w-4 h-4 text-amber-500 shrink-0" />
                <span>D. Ağır Hiperkalemi (Eşlik Eden Metabolik Asidozda Adjuvan)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                }`}
              >
                50 mEq IV (5–10 dk)
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Asidozu olmayan (normal HCO₃⁻) hastada tek başına K⁺ düşürücü etkisi zayıf ve yavaştır —{' '}
              <strong>1. basamak DEĞİLDİR</strong> (önce IV Kalsiyum → İnsülin+Dekstroz → Salbutamol!). Ancak{' '}
              <strong>metabolik asidoz (HCO₃⁻ &lt;20–22 mEq/L)</strong> eşlik ediyorsa{' '}
              <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>50 mEq IV</strong> (5 ampul
              10 mL %8,4; 5–10 dk yavaş IV) veya izotonik infüzyon (150 mEq/L) K⁺&apos;nın hücre içine kaymasını ve
              renal atılımını destekler. <strong>Kalsiyumla AYNI HATTAN ASLA VERME!</strong>
            </p>
          </div>

          {/* E. Toksik Alkoller & Ağır DKA (pH <6,9–7,0) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <AlertTriangle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>E. Toksik Alkoller (Metanol/Etilen Glikol) &amp; Ağır DKA (pH &lt;6,9–7,0)</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                Seçili Endikasyon
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>Metanol / Etilen Glikol:</strong> pH &lt;7,30 ise <strong>1–2 mEq/kg IV bolus</strong> + izotonik
              infüzyon (hedef pH &gt;7,30–7,35) formik asidin retinaya/SSS&apos;ye geçişini azaltır (Fomepizol + HD
              yanında).{' '}
              <strong>DKA (ADA 2024):</strong> pH ≥7,0 ise <strong>VERİLMEZ</strong>! Yalnızca erişkinde{' '}
              <strong>pH &lt;6,9–7,0</strong> yaşamı tehdit eden asidemide <strong>100 mEq / 400 mL steril su + 20 mEq
              KCl</strong> (2 saatte) düşünülebilir (çocuk DKA&apos;da serebral ödem riski nedeniyle neredeyse hiç
              verilmez!).
            </p>
          </div>

          {/* F. Lokal Anestezik Tamponlama, Crush/Rabdomiyoliz & Kullanılmaması Gereken Yerler */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Syringe className="w-4 h-4 text-teal-500 shrink-0" />
                <span>F. LA Tamponlama · Rabdomiyoliz · AHA Arrest / PRESERVE Sınırları</span>
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  isDark ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-800'
                }`}
              >
                Anestezi &amp; Kanıt
              </span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <strong>Lokal Anestezik Tamponlama:</strong> Lidokain/Mepivakain&apos;e{' '}
              <strong>1:10</strong> oranında (1 mL %8,4 / 10 mL LA) eklenmesi enjeksiyon ağrısını azaltır ve epidural
              top-up başlangıcını hızlandırır (Bupivakain/Ropivakain&apos;de çökelti yapar!).{' '}
              <strong>Crush/Rabdomiyoliz:</strong> Ana tedavi agresif izotonik sıvıdır; bikarbonat yalnızca asidoz veya
              seçili miyoglobinüride (idrar pH &gt;6,5). <strong>Rutin KPR (AHA 2020):</strong> Önerilmez (yalnızca
              hiperkalemi, TCA veya önceden ağır asidoz). <strong>Kontrast Nefropatisi (PRESERVE, NEJM 2018):</strong>{' '}
              %0,9 NaCl&apos;ye üstün değildir!
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. İNTERAKTİF 4 SEKMELİ KLİNİK DOZ HESAPLAYICI (#sec-hesaplayici)   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-5 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-cyan-500/15 text-cyan-400' : 'bg-cyan-50 text-cyan-600'
              }`}
            >
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`text-base sm:text-lg font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                İnteraktif Sodyum Bikarbonat %8,4 Klinik Doz &amp; Hazırlama Hesaplayıcısı
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                TR standart 10 mL %8,4 ampul (10 mEq = 1 mEq/mL), izotonik D5W torba (150 mEq/L) ve yenidoğan %4,2 (0,5 mEq/mL) hesabı
              </p>
            </div>
          </div>

          <MonographCopyButton isDark={isDark} label="Hesaplanan Order’ı Kopyala" getText={buildCopySummary} />
        </div>

        {/* 4 Sekmeli Navigasyon */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            { id: 'acidosis' as CalcTab, label: 'Asidoz & BICAR-ICU', sub: 'HCO₃⁻ Açığı + CO₂/Na⁺' },
            { id: 'toxicology' as CalcTab, label: 'Toksikoloji / Alkalinizasyon', sub: 'TCA · Salisilat · Metanol' },
            { id: 'hyperk_la' as CalcTab, label: 'Hiperkalemi & LA Tampon', sub: '50 mEq · Lidokain 1:10' },
            { id: 'pediatric' as CalcTab, label: 'Pediatri & Yenidoğan', sub: '%4,2 Yarı-Molar Güvenlik' },
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
                      ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-200 shadow-xs'
                      : 'bg-cyan-50 border-cyan-400 text-cyan-900 shadow-xs'
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

        {/* SEKME 1: METABOLİK ASİDOZ & BICAR-ICU */}
        {activeTab === 'acidosis' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Girdiler */}
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={acidWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Hasta Ağırlığı (Obezitede IBW / AdjBW!)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={acidWeightInputId}
                        type="number"
                        min={30}
                        max={180}
                        value={acidWeightKg}
                        onChange={(e) => setAcidWeightKg(Math.max(30, Math.min(180, Number(e.target.value) || 70)))}
                        className={`w-16 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                          isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={acidWeightSliderId}
                    type="range"
                    min={30}
                    max={150}
                    value={acidWeightKg}
                    onChange={(e) => setAcidWeightKg(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor={currentHco3SliderId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Mevcut HCO₃⁻
                      </label>
                      <span className="text-xs font-mono font-bold text-rose-500">{currentHco3} mEq/L</span>
                    </div>
                    <input
                      id={currentHco3SliderId}
                      type="range"
                      min={2}
                      max={20}
                      step={1}
                      value={currentHco3}
                      onChange={(e) => setCurrentHco3(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor={targetHco3SliderId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Hedef HCO₃⁻
                      </label>
                      <span className="text-xs font-mono font-bold text-cyan-500">{targetHco3} mEq/L</span>
                    </div>
                    <input
                      id={targetHco3SliderId}
                      type="range"
                      min={12}
                      max={24}
                      step={1}
                      value={targetHco3}
                      onChange={(e) => setTargetHco3(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
                    Dağılım Hacmi Faktörü (Bikarbonat Alanı — Vd):
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: 0.3, label: '0,3 L/kg', desc: 'Konservatif / Volüm Kısıtlı' },
                      { val: 0.4, label: '0,4 L/kg', desc: 'Orta Asidoz / Yaşlı' },
                      { val: 0.5, label: '0,5 L/kg', desc: 'Standart (Klasik Formül)' },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => setVdFactor(opt.val)}
                        className={`p-2 rounded-lg border text-center cursor-pointer transition-all ${
                          vdFactor === opt.val
                            ? isDark
                              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200'
                              : 'bg-cyan-50 border-cyan-400 text-cyan-900'
                            : isDark
                              ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="text-xs font-mono font-bold">{opt.label}</div>
                        <div className="text-[10px] opacity-80">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {isOverTarget && (
                  <div
                    className={`p-2.5 rounded-lg border text-xs ${
                      isDark
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-amber-50 border-amber-300 text-amber-900'
                    }`}
                  >
                    <strong>Aşırı Düzeltme Uyarısı:</strong> Akut metabolik asidozda ilk hedefin{' '}
                    <strong>15–18 mEq/L</strong> (pH &gt;7,20–7,30) tutulması önerilir; &gt;20 mEq/L hedeflemek
                    rebound metabolik alkaloz ve hipokalemi riskini belirgin artırır!
                  </div>
                )}
              </div>

              {/* Çıktılar */}
              <div className="grid grid-cols-2 gap-3 content-start">
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-50/70 border-cyan-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">İlk 4–8 Saatte (%50 Düzeltme)</span>
                  <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                    {initialHalfMeq} mEq
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    ≈ {initialHalfAmpules10.toString().replace('.', ',')} × 10 mL %8,4 ampul
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Toplam açık: {totalDeficitMeq} mEq ({totalAmpules10.toString().replace('.', ',')} amp)
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">Metabolik Yük (İlk %50)</span>
                  <div className={`text-xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                    +{initialSodiumGrams.toString().replace('.', ',')} g Na⁺
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    ~{initialCo2Liters.toString().replace('.', ',')} L CO₂ üretimi!
                  </span>
                  <span className="text-[10px] text-rose-500 font-semibold block">
                    Ventilasyon &amp; AKG / K⁺ / iCa²⁺ izle!
                  </span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed space-y-1.5 ${
                    isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                      İzotonik İnfüzyon Hazırlama (SF İLE DEĞİL!):
                    </strong>{' '}
                    <strong>150 mEq</strong> (15 adet 10 mL %8,4 ampul = 150 mL) +{' '}
                    <strong>850 mL %5 Dekstroz (D5W)</strong> = 1000 mL (<strong>150 mEq/L</strong>). İlk %50 açık (
                    <strong>{initialHalfMeq} mEq</strong> ≈{' '}
                    <strong>{Math.round((initialHalfMeq / ISOTONIC_BAG_MEQ) * 1000)} mL</strong> bu izotonik çözeltiden)
                    4–8 saatte infüze edilir; 2–4 saatte bir AKG, K⁺, iCa²⁺ ve Na⁺ tekrarlanır.
                  </div>
                  <div className={isDark ? 'text-cyan-300' : 'text-cyan-800'}>
                    <strong>BICAR-ICU (Lancet 2018 · AKIN 2–3 ABH + pH ≤7,20):</strong> 125–250 mL %4,2 (62,5–125 mEq)
                    30 dk infüzyon → hedef arter pH ≥7,30 (24 saatte maks 1000 mL %4,2 = 500 mEq).
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 2: TOKSİKOLOJİ & İDRAR ALKALİNİZASYONU */}
        {activeTab === 'toxicology' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: 'tca_na_blocker' as ToxScenario,
                  title: 'TCA / Na⁺ Kanal Blokeri',
                  desc: 'QRS >100 ms · VT · Hipotansiyon',
                },
                {
                  id: 'salicylate_urine_alk' as ToxScenario,
                  title: 'Salisilat / MTX / Fenobarbital',
                  desc: 'İdrar Alkalinizasyonu (İdrar pH 7,5–8,0)',
                },
                {
                  id: 'toxic_alcohol' as ToxScenario,
                  title: 'Metanol / Etilen Glikol',
                  desc: 'pH <7,30 · Fomepizol + HD Yanında',
                },
              ].map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setToxScenario(sc.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    toxScenario === sc.id
                      ? isDark
                        ? 'bg-rose-500/15 border-rose-500/50 text-rose-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900'
                      : isDark
                        ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{sc.title}</div>
                  <div className="text-[10px] opacity-80 mt-0.5">{sc.desc}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-4 ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor={toxWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Hasta Kilosu
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={toxWeightInputId}
                        type="number"
                        min={30}
                        max={160}
                        value={toxWeightKg}
                        onChange={(e) => setToxWeightKg(Math.max(30, Math.min(160, Number(e.target.value) || 75)))}
                        className={`w-16 px-2 py-1 text-right font-mono text-xs font-bold rounded-lg border ${
                          isDark ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <span className="text-xs font-mono text-slate-500">kg</span>
                    </div>
                  </div>
                  <input
                    id={toxWeightSliderId}
                    type="range"
                    min={30}
                    max={140}
                    value={toxWeightKg}
                    onChange={(e) => setToxWeightKg(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor={toxBolusSliderId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Başlangıç Bolus Dozu (1–2 mEq/kg)
                    </label>
                    <span className="text-xs font-mono font-bold text-rose-500">
                      {toxBolusMeqKg.toFixed(1).replace('.', ',')} mEq/kg
                    </span>
                  </div>
                  <input
                    id={toxBolusSliderId}
                    type="range"
                    min={1.0}
                    max={2.0}
                    step={0.5}
                    value={toxBolusMeqKg}
                    onChange={(e) => setToxBolusMeqKg(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 content-start">
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-rose-500/10 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">1. IV Yükleme Bolusu</span>
                  <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                    {toxBolusMeq} mEq
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    {toxBolusAmpules10.toString().replace('.', ',')} × 10 mL %8,4 ampul
                  </span>
                  <span className="text-[10px] text-slate-500 block">1–2 dk IV puşe (tavan 150 mEq)</span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    isDark ? 'bg-purple-500/10 border-purple-500/30' : 'bg-purple-50/70 border-purple-200'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-slate-500">2. İzotonik İnfüzyon Hızı</span>
                  <div className={`text-xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>
                    {toxInfusionMinMlHr}–{toxInfusionMaxMlHr} mL/sa
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block mt-0.5">
                    ({toxInfusionMeqHrMin.toString().replace('.', ',')}–{toxInfusionMeqHrMax.toString().replace('.', ',')} mEq/sa)
                  </span>
                  <span className="text-[10px] text-slate-500 block">150 mEq + 850 mL D5W</span>
                </div>

                <div
                  className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed ${
                    isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {toxScenario === 'tca_na_blocker' && (
                    <>
                      <strong>TCA / Na⁺ Kanal Blokeri Hedefi:</strong> Bolusu takiben EKG&apos;de QRS daralmasını
                      izleyin; QRS &gt;100 ms sürüyorsa 3–5 dk sonra ek 1 mEq/kg bolus tekrarlayın. Arter pH{' '}
                      <strong>7,45–7,55</strong> aralığında tutulmalı (<strong>pH &gt;7,55 AŞMA!</strong>). Refraktersa
                      %3 NaCl veya %20 Lipid Emülsiyonu değerlendirin.
                    </>
                  )}
                  {toxScenario === 'salicylate_urine_alk' && (
                    <>
                      <strong>Salisilat / MTX İdrar Alkalinizasyon Hedefi:</strong> İdrar pH{' '}
                      <strong>7,5–8,0</strong> (arter pH ≤7,55). <strong>KRİTİK:</strong> Normokalemi sağlanmadan idrar
                      alkalileşmez (<em>paradoksal asidüri</em>) — her 1 L izotonik torbaya{' '}
                      <strong>20–40 mEq KCl</strong> ekleyin (anürik hastada KCl EKLEME, acil hemodiyalize al!).
                    </>
                  )}
                  {toxScenario === 'toxic_alcohol' && (
                    <>
                      <strong>Metanol / Etilen Glikol Hedefi:</strong> pH &lt;7,30&apos;da 1–2 mEq/kg bolus + izotonik
                      infüzyonla arter pH <strong>&gt;7,30–7,35</strong> tutulur. Alkol dehidrogenaz blokajı (Fomepizol
                      / Etanol) ve hemodiyaliz asıl definitif tedavidir!
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEKME 3: HİPERKALEMİ + ASİDOZ & LOKAL ANESTEZİK TAMPONLAMA */}
        {activeTab === 'hyperk_la' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHyperkLaMode('hyperkalemia')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  hyperkLaMode === 'hyperkalemia'
                    ? isDark
                      ? 'bg-amber-500/15 border-amber-500/50 text-amber-200'
                      : 'bg-amber-50 border-amber-400 text-amber-900'
                    : isDark
                      ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Ağır Hiperkalemi + Metabolik Asidoz</div>
                <div className="text-[10px] opacity-80">Adjuvan K⁺ hücre içi kayması (50 mEq IV)</div>
              </button>
              <button
                type="button"
                onClick={() => setHyperkLaMode('la_buffering')}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  hyperkLaMode === 'la_buffering'
                    ? isDark
                      ? 'bg-teal-500/15 border-teal-500/50 text-teal-200'
                      : 'bg-teal-50 border-teal-400 text-teal-900'
                    : isDark
                      ? 'bg-slate-800/40 border-slate-700 text-slate-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="text-xs font-bold">Lokal Anestezik Tamponlama (Rejyonal)</div>
                <div className="text-[10px] opacity-80">Lidokain 1:10 vs Bupivakain Çökelti Uyarısı</div>
              </button>
            </div>

            {hyperkLaMode === 'hyperkalemia' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border space-y-3 ${
                    isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="block text-xs font-bold text-slate-600 dark:text-slate-300">
                    Hiperkalemi + Asidoz Doz Seçimi:
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[50, 100, 150].map((dose) => (
                      <button
                        key={dose}
                        type="button"
                        onClick={() => setHyperkDoseMeq(dose)}
                        className={`p-2.5 rounded-lg border text-center cursor-pointer transition-all ${
                          hyperkDoseMeq === dose
                            ? isDark
                              ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                              : 'bg-amber-50 border-amber-400 text-amber-900'
                            : isDark
                              ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                              : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <div className="text-sm font-mono font-bold">{dose} mEq</div>
                        <div className="text-[10px] opacity-80">
                          {dose === 50 ? '5 amp · Yavaş IV' : dose === 100 ? '10 amp · İnf.' : '15 amp · 1 L D5W'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold uppercase text-slate-500">Hazırlanacak Miktar</span>
                    <span className={`text-2xl font-black font-mono ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                      {hyperkDoseMeq} mEq ({hyperkAmpules10} ampul)
                    </span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {hyperkDoseMeq === 50
                      ? '50 mEq (5 × 10 mL %8,4 ampul) 5–10 dakikada yavaş IV (tercihen 50–100 mL D5W içinde).'
                      : hyperkDoseMeq === 100
                        ? '100 mEq (10 ampul) + 400–500 mL D5W içinde 1–2 saatte IV infüzyon.'
                        : '150 mEq (15 ampul) + 850 mL D5W = 1000 mL izotonik infüzyon (100–250 mL/sa; 2–4 sa K⁺/AKG izle).'}
                  </p>
                  <p className={`text-[11px] font-semibold ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                    KIRMIZI ÇİZGİ: Önce IV Kalsiyum (AYRI HATTAN!) → İnsülin+Dekstroz → Salbutamol. Kalsiyumla aynı
                    lümenden ASLA verme (CaCO₃ çökeltisi)!
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-4 rounded-xl border space-y-4 ${
                    isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setLaAgent('lidocaine_mepi')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                        laAgent === 'lidocaine_mepi'
                          ? isDark
                            ? 'bg-teal-500/20 border-teal-500/50 text-teal-200'
                            : 'bg-teal-50 border-teal-400 text-teal-900'
                          : isDark
                            ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                            : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">Lidokain / Mepivakain</div>
                      <div className="text-[10px] opacity-80">Güvenli · 1:10 oranı</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setLaAgent('bupivacaine_ropi')}
                      className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                        laAgent === 'bupivacaine_ropi'
                          ? isDark
                            ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                            : 'bg-rose-50 border-rose-400 text-rose-900'
                          : isDark
                            ? 'bg-slate-900/60 border-slate-700 text-slate-400'
                            : 'bg-white border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="text-xs font-bold">Bupivakain / Ropivakain</div>
                      <div className="text-[10px] opacity-80">Yüksek Çökelti Riski!</div>
                    </button>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label htmlFor={laVolumeSliderId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                        Lokal Anestezik Hacmi
                      </label>
                      <span className="text-xs font-mono font-bold text-teal-500">{laVolumeMl} mL</span>
                    </div>
                    <input
                      id={laVolumeSliderId}
                      type="range"
                      min={5}
                      max={40}
                      step={5}
                      value={laVolumeMl}
                      onChange={(e) => setLaVolumeMl(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    laAgent === 'lidocaine_mepi'
                      ? isDark
                        ? 'bg-teal-500/10 border-teal-500/30'
                        : 'bg-teal-50/70 border-teal-200'
                      : isDark
                        ? 'bg-rose-500/15 border-rose-500/40'
                        : 'bg-rose-50 border-rose-300'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold uppercase text-slate-500">Eklenecek %8,4 NaHCO₃</span>
                    <span
                      className={`text-2xl font-black font-mono ${
                        laAgent === 'lidocaine_mepi'
                          ? isDark
                            ? 'text-teal-300'
                            : 'text-teal-700'
                          : isDark
                            ? 'text-rose-300'
                            : 'text-rose-700'
                      }`}
                    >
                      {laBicarbMl.toString().replace('.', ',')} mL
                    </span>
                  </div>
                  {laAgent === 'lidocaine_mepi' ? (
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <strong>{laVolumeMl} mL Lidokain/Mepivakain</strong> +{' '}
                      <strong>{laBicarbMl.toString().replace('.', ',')} mL %8,4 NaHCO₃</strong> (1:10 oranı). Non-iyonize
                      baz oranını artırarak infiltrasyon yanmasını belirgin azaltır ve acil sezaryen epidural top-up
                      başlangıcını 3–5 dk hızlandırır. İşlemden hemen önce taze hazırlayın!
                    </p>
                  ) : (
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
                      <strong>ÇÖKELTİ ALARMI:</strong> Bupivakain ve Ropivakain pH &gt;6,8–7,0 üzerinde hızla beyaz
                      serbest baz kristalleri şeklinde <strong>ÇÖKER</strong>! En fazla 0,1 mL / 10 mL (bu hacimde maks{' '}
                      {laBicarbMl.toString().replace('.', ',')} mL) tolere edilebilir — klinik pratikte rutin tamponlama{' '}
                      <strong>ÖNERİLMEZ!</strong>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* SEKME 4: PEDİATRİK & YENİDOĞAN (%4,2 YARI-MOLAR GÜVENLİK MODU) */}
        {activeTab === 'pediatric' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={pedWeightInputId} className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <Baby className="w-4 h-4 text-amber-500" />
                    <span>Pediatrik / Yenidoğan Kilosu</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      id={pedWeightInputId}
                      type="number"
                      min={1}
                      max={40}
                      step={0.5}
                      value={pedWeightKg}
                      onChange={(e) => setPedWeightKg(Math.max(1, Math.min(40, Number(e.target.value) || 10)))}
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
                  min={1}
                  max={40}
                  step={0.5}
                  value={pedWeightKg}
                  onChange={(e) => setPedWeightKg(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                {isNeonateOrInfant && (
                  <div
                    className={`mt-2 p-2 rounded-lg border text-[11px] font-bold ${
                      isDark
                        ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
                        : 'bg-rose-50 border-rose-300 text-rose-800'
                    }`}
                  >
                    YENİDOĞAN / SÜT ÇOCUĞU (≤5 kg) MODU OTOMATİK AKTİF: %8,4 direkt bolus İVH riski nedeniyle YASAK —
                    1:1 seyreltilmiş %4,2 (0,5 mEq/mL) ZORUNLU!
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={pedDoseSliderId} className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    Hedef Doz (1–2 mEq/kg)
                  </label>
                  <span className="text-xs font-mono font-bold text-amber-500">
                    {pedDoseMeqKg.toFixed(1).replace('.', ',')} mEq/kg
                  </span>
                </div>
                <input
                  id={pedDoseSliderId}
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.5}
                  value={pedDoseMeqKg}
                  onChange={(e) => setPedDoseMeqKg(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {!isNeonateOrInfant && (
                <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={pedForceHalfMolar}
                    onChange={(e) => setPedForceHalfMolar(e.target.checked)}
                    className="accent-amber-500"
                  />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Büyük çocukta da periferik damar güvenliği için 1:1 (%4,2) seyreltme kullan (Önerilen)
                  </span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 content-start">
              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-slate-500">Hesaplanan Doz</span>
                <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-amber-300' : 'text-amber-700'}`}>
                  {pedCappedMeq.toString().replace('.', ',')} mEq
                </div>
                <span className="text-[11px] font-mono text-slate-500 block">
                  {pedVolume84Ml.toString().replace('.', ',')} mL %8,4 stoktan çek
                </span>
                {pedCapHit && (
                  <span className="text-[10px] font-bold text-rose-500 block mt-0.5">
                    Tek acil bolus 50 mEq tavanına sınırlandı!
                  </span>
                )}
              </div>

              <div
                className={`p-3.5 rounded-xl border ${
                  isDark ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-indigo-50/70 border-indigo-200'
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-slate-500">
                  {useHalfMolar ? 'Hazırlanacak %4,2 Hacmi' : '%8,4 Hacim (Santral!)'}
                </span>
                <div className={`text-2xl font-black font-mono mt-1 tabular-nums ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                  {(useHalfMolar ? pedVolume42Ml : pedVolume84Ml).toString().replace('.', ',')} mL
                </div>
                <span className="text-[11px] font-mono text-slate-500 block">
                  {useHalfMolar ? '0,5 mEq/mL (%4,2)' : '1,0 mEq/mL (%8,4)'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {isNeonateOrInfant ? '≥20–30 dk yavaş IV!' : '≥10–15 dk yavaş IV'}
                </span>
              </div>

              <div
                className={`p-3.5 rounded-xl border col-span-2 text-xs leading-relaxed ${
                  isDark ? 'bg-slate-800/60 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <strong>Pratik Hazırlık:</strong> Enjektöre{' '}
                <strong>{pedVolume84Ml.toString().replace('.', ',')} mL %8,4 Sodyum Bikarbonat</strong> çekip üzerine{' '}
                <strong>{pedVolume84Ml.toString().replace('.', ',')} mL Steril Enjeksiyonluk Su</strong> (1:1) ekleyin →
                toplam <strong>{pedVolume42Ml.toString().replace('.', ',')} mL %4,2 (0,5 mEq/mL)</strong> çözelti elde
                edilir. Yenidoğanda dakikada ≤1 mEq/kg (tercihen ≥20–30 dk) hızda verin; pediatrik DKA&apos;da serebral
                ödem riski nedeniyle rutin kullanmayın!
              </div>
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
            name: 'Sodyum Bikarbonat %8,4 Molar Ampul (10 mL — Osel® / Galen® / Adeka® / Polifarma®)',
            presentation: '10 mL şeffaf cam ampul (Türkiye ameliyathane ve YBÜ acil arabalarında en yaygın form)',
            concentration: '1 mL = 1 mEq = 1 mmol = 84 mg NaHCO₃ → 1 Ampul (10 mL) = 10 mEq (840 mg)',
            saltOrBaseNote:
              'Her 10 mL ampul 10 mEq (230 mg) Na⁺ ve 10 mEq HCO₃⁻ içerir. Ozmolarite ~2.000 mOsm/L (ekstrem hiperozmolar!). pH 7,0–8,5. Direkt hızlı periferik puşeden kaçının (ekstravazasyonda doku nekrozu!).',
            alertLevel: 'high',
          },
          {
            name: 'Sodyum Bikarbonat %8,4 IV Flakon / Şişe (50 mL & 100 mL)',
            presentation: '50 mL (= 50 mEq = 4,2 g) veya 100 mL (= 100 mEq = 8,4 g) cam flakon (hastane eczanesi / YBÜ stoğu)',
            concentration: '1 mEq/mL (%8,4 Molar · ~2.000 mOsm/L)',
            saltOrBaseNote:
              'Yüksek doz sürekli infüzyon torbaları (150 mEq / 850 mL D5W) ve acil 50 mEq boluslarda pratik kullanım sağlar. Cam flakonlarda kristal/bulanıklık kontrolü yapın!',
            alertLevel: 'high',
          },
          {
            name: 'Yenidoğan / Pediatrik %4,2 (Yarı-Molar) Yatak Başı Dilüsyonu',
            presentation: 'TR’de hazır %4,2 ampul çoğu merkezde bulunmaz → %8,4 ampulden 1:1 steril su ile yatak başında hazırlanır',
            concentration: '0,5 mEq/mL (42 mg/mL · ~1.000 mOsm/L)',
            saltOrBaseNote:
              'Örnek: 10 mL %8,4 + 10 mL Steril Enjeksiyonluk Su = 20 mL %4,2 çözelti (10 mEq). Yenidoğan/prematürelerde intraventriküler hemoraji (İVH) önlemi için zorunludur.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart İzotonik Sürekli İnfüzyon ("150 mEq / D5W Kuralı"): 15 adet 10 mL %8,4 ampul (150 mEq = 150 mL) + 850 mL %5 Dekstroz (D5W) [veya Steril Enjeksiyonluk Su] = 1000 mL (~150 mEq/L Na⁺ ve HCO₃⁻; steril su ile ~300 mOsm/L, D5W ile ~550 mOsm/L — periferik ven dostu!).',
          '500 mL Pratik İzotonik Torba: 75 mEq (7,5 ampul = 75 mL %8,4) + 425 mL %5 Dekstroz (D5W) = 500 mL (~150 mEq/L).',
          'Acil TCA / Na⁺ Kanal Blokeri Bolusu: 1–2 mEq/kg (erişkinde tipik 50–100 mEq = 5–10 ampul 10 mL %8,4) geniş/santral venden 1–2 dk yavaş IV puşe (periferik yolda ekstravazasyon takibi!).',
          'BICAR-ICU (ABH + pH ≤7,20) %4,2 Protokolü: 125–250 mL %4,2 (= 62,5–125 mEq → 6–12,5 ampul %8,4 + eşit hacim steril su) 30 dk’da IV infüzyon.',
          'Lokal Anestezik Tamponlama (Lidokain / Mepivakain): 10 mL Lidokain + 1 mL %8,4 NaHCO₃ (1:10) — Bupivakain/Ropivakain’e eklenirse ÇÖKER!',
        ]}
        concentrationTrapWarning="KRİTİK HAZIRLAMA HATASI (%0,9 NaCl İÇİNE EKLEME!): 150 mEq %8,4 Sodyum Bikarbonat’ı 850–1000 mL %0,9 NaCl (SF) içine eklemek toplam sodyumu ~300 mEq/L (~600 mOsm/L) düzeyine fırlatır ve ağır hipernatremiye + pulmoner ödeme yol açar! İzotonik bikarbonat infüzyonu MUTLAKA %5 Dekstroz (D5W) veya Steril Enjeksiyonluk Su ile hazırlanır!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="central-preferred"
        accessSummary="Seyreltilmemiş %8,4 (1 mEq/mL) çözelti ~2.000 mOsm/L ozmolaritesiyle ağır vezikandır — tekrarlayan boluslarda SANTRAL VENÖZ KATETER tercih edilmelidir! Acil hayat kurtarıcı tek bolus (TCA/hiperkalemi) geniş proksimal periferik venden sürekli geri akım/ekstravazasyon kontrolüyle verilebilir. Sürekli infüzyon mutlaka izotonik seyreltmeyle (150 mEq + 850 mL D5W) ve AYRI LÜMENDEN uygulanmalıdır."
        phRange="7,0 – 8,5 (Alkali · CO₂ Kaçağına Duyarlı)"
        osmolalityNote="Seyreltilmemiş %8,4 = ~2.000 mOsm/L (ekstrem hiperozmolar — %3 NaCl = 1.026 mOsm/L!). %4,2 = ~1.000 mOsm/L. İzotonik 150 mEq / 850 mL steril su = ~300 mOsm/L (D5W ile ~550 mOsm/L, periferik ven için güvenli)."
        compatibleDiluents={[
          '%5 Dekstroz (D5W — İzotonik 150 mEq/L infüzyon için 1. tercih!)',
          'Steril Enjeksiyonluk Su (1:1 %4,2 yenidoğan seyreltmesi veya ~300 mOsm/L izotonik infüzyon)',
          '%0,45 NaCl (hipotonik taşıyıcı: 75 mEq + 925 mL %0,45 NaCl ≈ 150 mEq/L Na⁺)',
          'DİKKAT: %0,9 NaCl (SF) içine 150 mEq eklenirse ~300 mEq/L hipertonik çözelti olur — SÜREKLİ İNFÜZYONDA SF KULLANMA!',
        ]}
        stabilityNote="Hazırlanan D5W/Steril Su bikarbonat torbaları oda sıcaklığında 24 saat stabildir; plastik torba içinde zamanla CO₂ difüzyonu ile pH hafif yükselebilir. Açılan ampul/flakonlar koruyucu içermediğinden tek kullanımlıktır. Bulanık veya çökeltili çözeltileri kesinlikle atın."
        ySiteCompatible={[
          '%5 Dekstroz (D5W)',
          '%0,9 NaCl (yalnızca kısa flush için)',
          'Potasyum Klorür (izotonik torbada 20–40 mEq/L — idrar alkalinizasyonunda standart!)',
          'Furosemid · Heparin · Hidrokortizon · Pantoprazol (ayrı lümen yine de idealdir)',
        ]}
        ySiteIncompatible={[
          'Kalsiyum Klorür & Kalsiyum Glukonat (ANINDA beyaz CaCO₃ çökeltisi!)',
          'Adrenalin · Noradrenalin · Dopamin · Dobutamin (alkali inaktivasyon!)',
          'Amiodaron · Midazolam · Morfin · Fentanil · Meperidin (çökelti!)',
          'Magnezyum Sülfat (yüksek konsantrasyonda çökelti!) · Vankomisin',
          'Sisatrakuryum · Rokuronyum · İnsülin · Bupivakain / Ropivakain',
          'Ringer Laktat (Ca²⁺ içeriği nedeniyle CaCO₃ çökeltisi!) · TPN / Kan Ürünleri',
        ]}
        extravasationProtocol="%8,4 Sodyum Bikarbonat ~2.000 mOsm/L ozmolaritesi ve alkali pH’sı nedeniyle güçlü bir vezikandır — ekstravazasyonda şiddetli ağrı, ödem, kimyasal selülit ve tam kat doku nekrozu yapabilir! Şüphede: (1) İnfüzyonu DERHAL durdurun; (2) Kateteri çıkarmadan hafifçe 3–5 mL aspire etmeye çalışın; (3) Ekstremiteyi kalp seviyesinin üzerine eleve edin ve bölgeyi işaretleyin; (4) Kurum protokolüne göre soğuk/ılık kompres ve yaygın hiperozmolar ekstravazasyonda lokal hyaluronidaz + plastik cerrahi değerlendirmesi isteyin."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="eGFR <30 / AKIN 2–3 ABH + pH ≤7,20 varlığında (BICAR-ICU) faydalıdır; ancak oligürik/anürik hastada yüksek Na⁺/volüm yükü hızla pulmoner ödem yapar ve anüride idrar alkalinizasyonu işe yaramaz (acil HD şart!). IHD/CRRT sıvıları zaten bikarbonat içerir."
        renalDetails={[
          'Normal & Orta KBY (eGFR ≥30 mL/dk): Fazla HCO₃⁻ ve Na⁺ idrarla atılır; salisilat/MTX idrar alkalinizasyonu tam etkilidir (K⁺ takviyesi şart).',
          'AKIN 2–3 ABH & Oligo-Anüri (eGFR <30): BICAR-ICU’da pH ≤7,20 ABH alt grubunda mortalite ve RRT azalmıştır; ancak anürik hastada 100–150 mEq Na⁺ yükü akut akciğer ödemi ve hipernatremi riski doğurur — RRT hazırlığı yapın!',
          'IHD & CRRT: Diyalizat/replasman zaten 22–38 mEq/L HCO₃⁻ içerir (sitratlı CRRT’de karaciğer sitratı 1:3 HCO₃⁻’ye çevirir → sitrat alkalozu!). Post-HD ek doz verilmez.',
        ]}
        hepaticSummary="Karaciğerde metabolize olmaz; ancak dekompanse sirozda (Child-Pugh B–C) yüksek sodyum yükü asit/ödemi alevlendirir ve metabolik alkaloz NH₄⁺ → NH₃ geçişini artırarak HEPATİK ENSEFALOPATİYİ tetikler!"
        hepaticDetails={[
          'Child-Pugh A: Akut endikasyonlarda standart doz uygulanır.',
          'Child-Pugh B–C (Portal HT / Asit): 150 mEq izotonik torba 3,45 g Na⁺ içerir → refrakter asit ve pulmoner ödem riski! Alkaloz + hipokalemi amonyak toksisitesini hızla artırarak hepatik ensefalopatiyi tetikler.',
          'Sitratlı CRRT + Karaciğer Yetmezliği: Karaciğer sitratı bikarbonata çeviremezse (Total Ca / iCa >2,5 + artan anyon açıklı asidoz) sitrat birikimi gelişir — antikoagülasyonu durdurun/değiştirin.',
        ]}
        {...STANDALONE_ORGAN_PART2['sodium-bicarbonate']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="Düşük Volüm/Na⁺ Toleransı · Yavaş Titrasyon"
        geriatricPoints={[
          'Kardiyopulmoner Rezerv & KKY Riski: Yaşlılarda diyastolik disfonksiyon, gizli kalp yetmezliği ve azalmış renal sodyum atılımı nedeniyle 100–150 mEq NaHCO₃ yükü hızla akut pulmoner ödem ve hipertansif krize yol açabilir.',
          'Ventilatuvar Yanıt Kısıtlılığı: KOAH veya solunum kası güçsüzlüğü olan yaşlıda bikarbonatın ürettiği CO₂ yükü yeterince atılamazsa akut hiperkapnik ensefalopati ve paradoksal asidoz gelişebilir.',
          'Pratik Öneri: Yaşlıda Vd faktörünü konservatif (0,3–0,4 L/kg) seçin, küçük titre dozlar verin ve her 2 saatte AKG + K⁺ + iCa²⁺ + akciğer oskültasyonu/POCUS kontrolü yapın.',
        ]}
        obesityWeightScalarBadge="IBW / AdjBW Kullan! (TBW Aşırı Doz Yapar)"
        obesityPoints={[
          'Su Kompartmanı Dağılımı: Bikarbonat yağ dokusuna değil ekstraselüler sıvıya/toplam vücut suyuna dağılır. 130–150 kg morbid obez hastada TBW ile bikarbonat açığı veya bolus hesaplamak ciddi aşırı doza, hipernatremiye ve şiddetli alkaloza yol açar!',
          'Doz Skaleri: Bikarbonat açığı ve toksikoloji boluslarında İdeal Vücut Ağırlığı (IBW) veya Düzeltilmiş Vücut Ağırlığı (AdjBW = IBW + 0,4 × [TBW − IBW]) kullanın; tek acil bolusta genelde 100–150 mEq tavanını aşmayın.',
          'Obezite Hipoventilasyonu (OHS) Tuzağı: Bazal hiperkapnisi olan obez hastada dakika ventilasyonunu artırmadan bikarbonat vermek PaCO₂’yi tehlikeli biçimde yükseltir!',
        ]}
        clinicalNote="Morbid obezitede doğru IBW / AdjBW hesabı için aşağıdaki ölçekleyiciyi kullanarak bikarbonat açığınızı aşırı Na⁺ yükü vermeden planlayabilirsiniz:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Sodyum Bikarbonat %8,4 (NaHCO₃)"
        recommendedScalar="IBW"
        secondaryScalar={{ type: 'AdjBW', context: 'İzotonik İnfüzyon (2–3 mL/kg/sa)' }}
        rationale="Bikarbonat yağ dokusuna değil ekstraselüler su kompartmanına dağılır; acil bolus (1–2 mEq/kg) ve HCO₃⁻ açığı hesabında IBW/AdjBW kullanmak aşırı Na⁺ yükü, hipernatremi ve rebound alkalozu önler."
        currentWeightKg={activeTab === 'toxicology' ? toxWeightKg : acidWeightKg}
        onApplyWeight={(w) => {
          setAcidWeightKg(Math.max(30, Math.min(180, Math.round(w))));
          setToxWeightKg(Math.max(30, Math.min(160, Math.round(w))));
        }}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK & LAKTASYON (#sec-gebelik)                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Bikarbonat endojen fizyolojik bir tampondur ve teratojenik değildir; hayatı tehdit eden maternal endikasyonlarda (TCA/salisilat zehirlenmesi, ağır asidemi, hiperkalemi) gebelikte güvenle kullanılır — ancak maternal alkalemi ve aşırı Na⁺ yükünden kaçınılmalıdır!"
        pregnancyDetails={[
          'Gebelik Fizyolojisi (Bazal Kompanse Respiratuvar Alkaloz): Sağlıklı gebede progesteron aracılı hiperventilasyon nedeniyle bazal PaCO₂ 28–32 mmHg ve serum HCO₃⁻ 18–22 mEq/L’dir! Bu fizyolojik düşük HCO₃⁻’yi patolojik metabolik asidoz sanıp gereksiz bikarbonat VERMEYİN!',
          'Uteroplasental Perfüzyon & Bohr Etkisi: Aşırı maternal alkalemi (arter pH >7,50–7,55) hem uterin arter vazokonstriksiyonu hem de maternal Hb-O₂ eğrisinin sola kayması ile fetüse O₂ sunumunu azaltır. Preeklampside yüksek Na⁺ yükü pulmoner ödemi tetikleyebilir.',
          'Obstetrik Rejyonal Anestezi: Acil sezaryen epidural top-up için Lidokain (%2) içine 1:10 oranında %8,4 NaHCO₃ eklenmesi blok başlangıcını belirgin hızlandırır ve fetal açıdan güvenlidir.',
        ]}
        lactationSummary="Bikarbonat anne sütünde doğal olarak bulunan fizyolojik bir iyondur; maternal akut IV kullanım emzirilen bebekte zararlı bir etki oluşturmaz ve emzirmeye ara verilmesi gerekmez."
        lactationDetails={[
          'Fizyolojik Güvenlik: Kısa süreli parenteral kullanım anne sütünün pH’sını veya elektrolit dengesini bebek için klinik olarak anlamlı düzeyde değiştirmez.',
          'Altta Yatan Zehirlenme Uyarısı: Emzirme kararı bikarbonata göre değil, altta yatan toksik ajana (ör. salisilat, TCA, metanol) göre verilmelidir.',
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
            title: 'Paradoksal Hücre İçi & BOS Asidozu (CO₂ Difüzyon Paradoksu)',
            incidenceOrSeverity: 'Hipoventilasyon · Kritik',
            detail:
              'Tamponlama sonucu oluşan CO₂ (1 mEq → 22,4 mL CO₂) hücre ve kan-beyin bariyerini serbestçe geçerken polar HCO₃⁻ geçemez. Dakika ventilasyonu artırılmazsa miyokard kontraktilitesi düşer ve intrakraniyal/BOS asidozu derinleşir!',
            tone: 'rose',
          },
          {
            title: 'Akut Hipokalemi & Ventriküler Aritmiler',
            incidenceOrSeverity: 'Sık · Doz Bağımlı',
            detail:
              'Arter pH’sındaki her +0,10 artış serum K⁺’yı ~0,4–0,6 mEq/L düşürerek hücre içine çeker; özellikle DKA, salisilat zehirlenmesi ve diüretik kullanan hastalarda ani hipokalemik VT/Torsades tetikleyebilir.',
            tone: 'rose',
          },
          {
            title: 'İyonize Hipokalsemi (↓iCa²⁺) → Tetani & Miyokard Depresyonu',
            incidenceOrSeverity: 'Sık · Kritik',
            detail:
              'pH yükselmesi albuminin Ca²⁺ bağlama afinitesini artırır; total kalsiyum normal görünse bile serbest iyonize Ca²⁺ düşer → hipotansiyon, kontraktilite kaybı, QTc uzaması, karpopedal spazm ve laringospazm!',
            tone: 'rose',
          },
          {
            title: 'Hipernatremi, Hiperozmolarite & Yenidoğanda İVH',
            incidenceOrSeverity: '%8,4 = ~2.000 mOsm/L',
            detail:
              'Her 100 mEq NaHCO₃ 100 mEq (2,3 g) Na⁺ yükler. Hızlı hiperozmolar puşe serum ozmolaritesini aniden yükselterek prematüre/yenidoğanlarda intraventriküler hemoraji (İVH) ve erişkinde osmotik beyin hasarı oluşturabilir.',
            tone: 'amber',
          },
          {
            title: 'Volüm Yüklenmesi, Akut Pulmoner Ödem & Hipertansiyon',
            incidenceOrSeverity: 'KKY / Oligüri / Siroz',
            detail:
              'Yüksek sodyum yükü ekstraselüler sıvıyı hızla genişletir; KKY, oligürik/anürik ABH ve Child-Pugh C sirozda akut akciğer ödemi ve refrakter asit alevlenmesi gelişir.',
            tone: 'amber',
          },
          {
            title: 'Oksihemoglobin Eğrisinde Sola Kayma (Bohr Etkisi)',
            incidenceOrSeverity: 'Alkalemi · pH >7,50',
            detail:
              'pH artışı hemoglobinin oksijene afinitesini artırır (P50 düşer), periferik dokulara O₂ salınımını zorlaştırır ve kritik şok/anemide doku hipoksisini ve laktat üretimini (PFK aktivasyonuyla!) artırabilir.',
            tone: 'indigo',
          },
          {
            title: 'Ekstravazasyon Doku Nekrozu & Kimyasal Tromboflebit',
            incidenceOrSeverity: 'Vezikan · Periferik Hat',
            detail:
              'Seyreltilmemiş %8,4 çözeltinin damar dışına kaçması şiddetli lokal ağrı, ülserasyon, cilt nekrozu ve kompartman sendromuna kadar ilerleyebilen ağır kimyasal doku hasarı yaratır.',
            tone: 'rose',
          },
          {
            title: 'Rebound (Aşırı) Metabolik Alkaloz & Nöbet / Serebral Vazokonstriksiyon',
            incidenceOrSeverity: 'Aşırı Düzeltme',
            detail:
              'Organik asitler (laktat, ketonlar) altta yatan şok/DKA düzelince karaciğerde kendiliğinden bikarbonata metabolize olur! Önceden yüksek doz eksojen bikarbonat verildiyse iyileşme fazında ağır rebound alkaloz (pH >7,55) gelişir.',
            tone: 'amber',
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
            title: 'Mekanik Ventilasyon & Dakika Ventilasyonu Kuralı (EtCO₂ Takibi!)',
            detail:
              'Entübe hastada 50–100 mEq %8,4 Sodyum Bikarbonat verildikten saniyeler içinde EtCO₂ 5–15 mmHg yükselebilir. Bu bir Malign Hipertermi işareti değildir; tamponlamayla üretilen CO₂’dir — ventilatör hızını/dakika ventilasyonunu geçici artırarak fazla CO₂’yi atın ve 15–30 dk sonra AKG kontrol edin!',
          },
          {
            title: 'İdrar Alkalinizasyonunda "Paradoksal Asidüri" Tuzağı (Önce K⁺!)',
            detail:
              'Salisilat veya yüksek doz Metotreksat zehirlenmesinde bol bikarbonat vermenize rağmen idrar pH’sı hâlâ 5,5–6,0 kalıyorsa ilk bakacağınız değer serum POTASYUMDUR! Hipokalemide distal tübül K⁺’yı koruyabilmek için idrara H⁺ salgılar (paradoksal asidüri) — K⁺ 4,0–4,5 mEq/L olmadan idrar alkalileşmez!',
          },
          {
            title: 'Laktik Asidozda Bikarbonat Paradoksu: Laktatı Neden Artırabilir?',
            detail:
              'Septik şok veya doku hipoperfüzyonuna bağlı laktik asidozda (ABH yoksa ve pH >7,15–7,20) eksojen bikarbonat: (1) Hücre içi pH’yı düşürüp (CO₂ difüzyonu) miyokard debisini bozabilir, (2) Fosfofruktokinaz (PFK) enzimini aktive ederek glikolizi ve LAKTAT ÜRETİMİNİ ARTIRABİLİR, (3) iCa²⁺ düşüşüyle vazopresör yanıtını azaltabilir! Asıl tedavi perfüzyonu/sepsisi düzeltmektir.',
          },
          {
            title: 'Ağır Hiperkalemide Sıralama & Ayrı Hat Kuralı',
            detail:
              'EKG değişikliği olan hiperkalemide (sivri T, geniş QRS) 1. ilaç daima IV Kalsiyum Glukonat/Klorürdür (membran stabilizasyonu); ardından İnsülin+Dekstroz ve inhale Salbutamol gelir. Sodyum Bikarbonat yalnızca eşlik eden metabolik asidozda adjuvan eklenir ve Kalsiyumla ASLA aynı lümenden verilmez (anında CaCO₃ çökeltisi!).',
          },
          {
            title: 'Acil Sezaryen Epidural Top-Up & Bupivakain Çökelti Kuralı',
            detail:
              'Acil sezaryen için epidural kateterden %2 Lidokain (+ Adrenalin + Fentanil) top-up yapılırken 1:10 oranında %8,4 NaHCO₃ eklenmesi cerrahi anesteziye ulaşma süresini belirgin kısaltır. Ancak aynı oran %0,5 Bupivakain veya Ropivakain içine eklenirse solüsyon saniyeler içinde süt gibi bulanıklaşıp çöker — ASLA uygulamayın!',
          },
          {
            title: 'Rutin Kardiyak Arrest (AHA 2020) & Kontrast Nefropatisi (PRESERVE 2018)',
            detail:
              'AHA 2020 ACLS kılavuzu rutin kardiyak arrestte Sodyum Bikarbonatı önermez (Class III: No Benefit; koroner perfüzyon basıncını düşürür, katekolaminleri inaktive eder) — yalnızca hiperkalemi, TCA/Na⁺ kanal blokeri veya önceden bilinen ağır asidozda verilir. PRESERVE (NEJM 2018; n=5.177) çalışmasında da kontrast nefropatisi önlemede izotonik NaHCO₃, %0,9 NaCl’ye üstün bulunmamıştır.',
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
          title: 'Henderson-Hasselbalch Tampon Kimyası, CO₂ Membran Geçirgenliği & Nav1.5 Kanal Kurtarması',
          summary:
            'Sodyum Bikarbonat klasik bir reseptör ligandı değildir; doğrudan ekstraselüler asit-baz dengesi, transmembran iyon gradyentleri ve iyonizasyon dengesi üzerinden saniyeler içinde hücresel elektrofizyolojiyi dönüştürür:',
          points: [
            'Açık Tampon Sistemi (pKa = 6,1): pH = 6,1 + log([HCO₃⁻] / [0,03 × PaCO₂]). Sistemin yüksek tamponlama kapasitesi "açık" olmasına, yani reaksiyon sonucu oluşan CO₂’nin alveoler ventilasyonla sürekli uzaklaştırılmasına bağlıdır. Kapalı sistemde (hipoventilasyon / yetersiz KPR) PaCO₂ birikerek tamponu kilitler.',
            'CO₂ vs HCO₃⁻ Membran Asimetrisi: Yüksüz ve lipofilik CO₂ molekülü hücre zarlarını ve kan-beyin bariyerini milisaniyeler içinde geçerken, yüklü HCO₃⁻ iyonu çok yavaş taşınır. Bu nedenle hızlı bolus sonrası plazma pH’sı yükselirken hücre içi ve BOS pH’sı geçici olarak DÜŞER (paradoksal asidoz).',
            'Voltaj-Kapılı Na⁺ Kanalı (Nav1.5) Kurtarması: TCA, kokain ve Klas IA/IC ajanlar kardiyak hızlı Na⁺ kanallarının açık/inaktif durumuna bağlanarak faz 0 depolarizasyonunu yavaşlatır (geniş QRS, Brugada benzeri patern, VT/VF). Eksojen %8,4 NaHCO₃ hem yüksek Na⁺ konsantrasyonu ile yarışmalı olarak kanalı yeniden açar hem de pH artışı ile zayıf baz olan toksinin proteine bağlanmasını artırıp aktif katyonik formunu azaltır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Transselüler İyon Değiştiriciler (NHE1 / NBC / Na⁺-K⁺-ATPaz) & İyon Tuzağı Kinetiği',
          summary:
            'Alkalinizasyon yalnızca plazma protonlarını azaltmakla kalmaz; hücre zarı ve nefron tübülündeki iyon taşıyıcıları üzerinden potasyum, kalsiyum ve zayıf asit toksinlerin akışını yeniden yönlendirir:',
          points: [
            'K⁺’nın Hücre İçine Kayması: Ekstraselüler HCO₃⁻ artışı ve pH yükselmesi, hücre zarındaki Na⁺/H⁺ değiştiricisini (NHE1) ve Na⁺/HCO₃⁻ kotransporterini (NBC) uyararak hücre içi Na⁺’yı artırır; bu da Na⁺/K⁺-ATPaz pompasını hızlandırıp K⁺’yı hücre içine taşır (etki asidemik hastada belirgin, normal pH’lı hastada minimaldir).',
            'Albumin Histidin Grupları & İyonize Ca²⁺ Düşüşü: pH yükseldiğinde serum albuminindeki histidin imidazol halkaları proton (H⁺) bırakarak daha negatif yüklü hale gelir; artan negatif bağlanma bölgeleri serbest iyonize Ca²⁺’yi hızla bağlar (her +0,1 pH artışında iCa²⁺ ~%5–8 düşer).',
            'Renal Tübüler İyon Tuzağı (Henderson-Hasselbalch): Salisilik asit (pKa ≈ 3,0) veya fenobarbital (pKa ≈ 7,2) gibi zayıf asitler, asidik idrarda non-iyonize (lipofilik) formda kalıp distal tübülden kana geri emilir. İdrar pH’sı 5,0 → 8,0’a çıkarıldığında iyonize (suda çözünür) fraksiyon logaritmik artar ve geri emilim engellenir (salisilat klirensi 10–20 kat artar!).',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Kardiyovasküler Sistem & Miyokard Elektrofizyolojisi',
            tissueTarget: 'Nav1.5 Kanalları · Katekolamin Reseptör Duyarlılığı · iCa²⁺',
            accent: 'rose',
            points: [
              'Ağır asidemi (pH <7,10–7,15) vasküler α₁/β₁ reseptörlerinin katekolaminlere yanıtını köreltir; kontrollü düzeltme vazopresör duyarlılığını geri kazandırabilir.',
              'Buna karşın aşırı hızlı bolus → paradoksal miyokard içi CO₂ asidozu + iyonize hipokalsemi ile miyokard kontraktilitesini paradoksal olarak ÇÖKERTEBİLİR!',
            ],
          },
          {
            systemTitle: 'Solunum Sistemi & Oksihemoglobin Dissosiyasyon Eğrisi',
            tissueTarget: 'Alveoler CO₂ Eliminasyonu · Hemoglobin Bohr Etkisi',
            accent: 'sky',
            points: [
              'Her 1 mEq HCO₃⁻ tamponlamada ~22,4 mL CO₂ açığa çıkar; mekanik ventilatördeki hastada EtCO₂ artışı izlenip dakika ventilasyonu buna paralel ayarlanmalıdır.',
              'Alkalemi (pH >7,50) Hb-O₂ eğrisini sola kaydırarak periferik doku oksijen sunumunu azaltır ve hipoksik solunum dürtüsünü baskılar.',
            ],
          },
          {
            systemTitle: 'Böbrek, Nefron Tübülü & Potasyum Etkileşimi',
            tissueTarget: 'Proksimal Tübül HCO₃⁻ Eşiği · Distal H⁺-ATPaz & K⁺',
            accent: 'amber',
            points: [
              'Sağlıklı böbrekte serum HCO₃⁻ ~26–28 mEq/L eşiğini aştığında fazla bikarbonat hızla idrarla atılır (bikarbonatüri).',
              'Ancak hipokalemi veya hipokloremi/volüm açığı varsa böbrek bikarbonatı atamaz ve H⁺ salgılamaya devam eder (idrar alkalinizasyonunda başarısızlık / paradoksal asidüri!).',
            ],
          },
          {
            systemTitle: 'Santral Sinir Sistemi & Rejyonal Sinir Bloğu Fizyolojisi',
            tissueTarget: 'Kan-Beyin Bariyeri · Serebral Kan Akımı · Periferik Sinir Aksonu',
            accent: 'indigo',
            points: [
              'Sistemik alkalemi serebral vazokonstriksiyon yaparak serebral kan akımını azaltır ve nöbet eşiğini düşürür; yenidoğanda hiperozmolar %8,4 bolus germinal matriks kanaması (İVH) tetikler.',
              'Lokal anestezik (zayıf baz, pKa ~7,8) tamponlandığında non-iyonize baz fraksiyonu artar → akson zarından geçiş hızlanır (Lidokain 1:10); ancak Bupivakainin sudaki serbest baz çözünürlüğü çok düşük olduğundan hemen çöker.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Klinik Etki Sınırları, Hedef pH Tavanı & Rebound Alkaloz Mekanizması',
          summary:
            'Sodyum Bikarbonat tedavisinde "normal pH 7,40’a veya HCO₃⁻ 24 mEq/L’ye tam düzeltme" hedeflemek en sık yapılan iyatrojenik hatadır:',
          points: [
            'Metabolik Asidozda Güvenli Hedef Tavanı: Akut metabolik asidozda hedef pH 7,25–7,30 ve HCO₃⁻ 15–18 mEq/L’dir. Özellikle organik asidozlarda (laktik asidoz, DKA) altta yatan neden düzeldiğinde birikmiş laktat/keton anyonları karaciğerde endojen HCO₃⁻’ye dönüşeceği için aşırı eksojen bikarbonat ağır rebound metabolik alkaloz yaratır.',
            'Toksikolojide Kesin Üst Sınır (pH ≤7,55): TCA veya salisilat tedavisinde arter pH’sı 7,55’in üzerine çıktığında serebral/koroner vazokonstriksiyon, hipokalsemik tetani, nöbet ve malign aritmi riski katlanarak artar — bu eşikte infüzyon azaltılır/durdurulur.',
            'BICAR-ICU (Lancet 2018) Hasta Seçimi: Genel YBÜ asidoz popülasyonunda rutin bikarbonat sağkalımı artırmazken, pH ≤7,20 + orta-ağır ABH (AKIN 2–3) alt grubunda (renal bikarbonat rejenerasyonu kaybolduğu için) 28 günlük mortaliteyi %63’ten %46’ya indirmiştir.',
          ],
        }}
        clinicalPearls={[
          '150 mEq + 850 mL D5W (ASLA %0,9 NaCl Değil!): Ameliyathane ve YBÜ’de izotonik bikarbonat infüzyonu hazırlarken 15 adet 10 mL %8,4 ampulü daima 850 mL %5 Dekstroz veya Steril Su içine ekleyin — SF içine eklerseniz 300 mEq/L hipernatremik çözelti elde edersiniz!',
          'TCA Zehirlenmesinde Bikarbonatın Asıl Gücü: QRS >100 ms’yi daraltan mekanizma yalnızca pH artışı değildir; yüksek sodyum (Na⁺) yükü doğrudan voltaj-kapılı Nav1.5 kanallarındaki yarışmalı blokajı kırar — bu yüzden refrakter vakada %3 NaCl dahi kurtarma olarak etkilidir.',
          'Hiperkalemi Acilinde İki Hat Şartı: Kalsiyum Glukonat ile Sodyum Bikarbonat aynı damar yolundan ardışık yıkamasız verilirse hat içinde anında beyaz tebeşir (CaCO₃) çökeltisi oluşur ve damar yolu tıkanır!',
          'Entübe Hastada Bolus Sonrası Ani EtCO₂ Yükselişi: 50–100 mEq %8,4 NaHCO₃ puşesinden hemen sonra kapnografide görülen ani +5–15 mmHg EtCO₂ artışı beklenen kimyasal CO₂ çıkışıdır (HCO₃⁻ + H⁺ → CO₂) — dakika ventilasyonunu geçici artırarak CO₂’yi atın!',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ ETKİLEŞİMLER & KAYNAKÇA (#sec-kaynaklar)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Sodyum Bikarbonat %8,4"
        drugsComUrl="https://www.drugs.com/drug-interactions/sodium-bicarbonate.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'IV Kalsiyum Tuzları (CaCl₂ · Ca Glukonat) & Ringer Laktat (Aynı Hat / Y-Site)',
            mechanism: 'Doğrudan Kimyasal Çökelme (Ca²⁺ + CO₃²⁻ → Çözünmez Kalsiyum Karbonat [CaCO₃])',
            clinicalEffect:
              'Kateter içinde saniyeler içinde yoğun beyaz partikül/kristal çökeltisi, damar yolu tıkanması, pulmoner/sistemik mikroemboli ve her iki ilacın etkinliğinin kaybı.',
            management:
              'Aynı lümenden veya Y-bağlantısından KESİNLİKLE birlikte uygulamayın; ayrı venöz hat kullanın veya zorunlu ardışık uygulamada araya bol %0,9 NaCl yıkaması (≥20 mL) koyun.',
          },
          {
            severity: 'X',
            agent: 'Katekolaminler (Adrenalin · Noradrenalin · Dopamin · Dobutamin — Aynı Hat)',
            mechanism: 'Alkali pH’da Katekol Halkasının Hızlı Oksidatif Bozunması',
            clinicalEffect:
              'Hayat kurtarıcı vazopresör ve inotropların infüzyon hattında kimyasal inaktivasyonu ve ani hemodinamik çöküş.',
            management:
              'Vazopresör infüzyon hattından ASLA Sodyum Bikarbonat vermeyin; daima ayrı santral/periferik lümen kullanın.',
          },
          {
            severity: 'D',
            agent: 'Zayıf Bazik İlaçlar (Amfetaminler · Kinidin · Flekainid · Efedrin · Memantin · Metadon)',
            mechanism: 'İdrar Alkalinizasyonuna Bağlı Renal Tübüler Geri Emilim Artışı (Ters İyon Tuzağı)',
            clinicalEffect:
              'İdrar pH’sının yükselmesi zayıf bazları non-iyonize forma geçirerek renal atılımını belirgin azaltır → uzamış etki ve sistemik toksisite (aritmi, SSS eksitasyonu).',
            management:
              'Sürekli bikarbonat infüzyonu veya idrar alkalinizasyonu altında bu ajanların toksisite bulgularını (QTc, QRS, EKG, nöroloji) yakından izleyin ve doz azaltımı değerlendirin.',
          },
          {
            severity: 'D',
            agent: 'Lityum · Salisilatlar · Fenobarbital · Yüksek Doz Metotreksat · Klorpropamid',
            mechanism: 'İdrar Alkalinizasyonu & Sodyum Yüküne Bağlı Renal Klirens Artışı',
            clinicalEffect:
              'Zehirlenme tedavisinde terapötik olarak yararlanılan bu mekanizma, kronik tedavi alan hastalarda (özellikle lityum ve antiepileptik fenobarbital) serum düzeylerinin subterapötik düzeye düşmesine yol açar.',
            management:
              'Kronik lityum veya fenobarbital kullanan hastalarda yoğun IV bikarbonat sonrası serum ilaç düzeylerini kontrol edin.',
          },
          {
            severity: 'C',
            agent: 'Loop / Tiyazid Diüretikler, Sistemik Kortikosteroidler & İnsülin / β₂-Agonistler',
            mechanism: 'Sinerjistik Hipokalemi & Metabolik Alkaloz Potansiyalizasyonu',
            clinicalEffect:
              'Serum potasyumunda ağır düşüş (K⁺ <2,5–3,0 mEq/L), QTc uzaması, Torsades de Pointes ve hipokloremik alkalozun derinleşmesi.',
            management:
              'Seri K⁺ ve Mg²⁺ izlemi (2–4 saatte bir) yapın ve K⁺ <4,0 mEq/L ise proaktif KCl replasmanı uygulayın (anüri yoksa).',
          },
          {
            severity: 'C',
            agent: 'Bupivakain / Ropivakain (Lokal Anestezik Karışımı)',
            mechanism: 'pH >6,8–7,0 Üzerinde Serbest Baz Presipitasyonu',
            clinicalEffect:
              'Enjektör içinde anında beyaz bulanıklık ve kristal çökeltisi; nöroaksiyel/periferik blokta partikül enjeksiyon riski ve etkinlik kaybı.',
            management:
              'Bupivakain ve Ropivakain’i rutin olarak %8,4 NaHCO₃ ile tamponlamayın; tamponlama için yalnızca Lidokain veya Mepivakain (1:10) kullanın.',
          },
        ]}
        references={[
          {
            authors: 'Jaber S, Paugam C, Futier E, et al. (BICAR-ICU Study Group)',
            title: 'Sodium bicarbonate therapy for patients with severe metabolic acidaemia in the intensive care unit (BICAR-ICU): a multicentre, open-label, randomised controlled, phase 3 trial',
            journal: 'The Lancet',
            year: 2018,
            note: 'pH ≤7,20 ağır YBÜ asidemisinde AKIN 2–3 ABH alt grubunda 28 günlük mortalite ve RRT azalmasını gösteren dönüm noktası RKÇ.',
          },
          {
            authors: 'Evans L, Rhodes A, Alhazzani W, et al.',
            title: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021',
            journal: 'Intensive Care Medicine',
            year: 2021,
            note: 'Septik şokta pH ≥7,15 ise rutin bikarbonat önerilmemesi; pH ≤7,20 + AKIN 2–3 ABH varlığında önerilmesi.',
          },
          {
            authors: 'Weisbord SD, Gallagher M, Jneid H, et al. (PRESERVE Trial Group)',
            title: 'Outcomes after Angiography with Sodium Bicarbonate and Acetylcysteine',
            journal: 'New England Journal of Medicine',
            year: 2018,
            note: '5.177 hastada izotonik sodyum bikarbonatın kontrast nefropatisini önlemede %0,9 NaCl’ye üstün olmadığını kanıtlayan çalışma.',
          },
          {
            authors: 'Panchal AR, Bartos JA, Cabañas JG, et al.',
            title: 'Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
            journal: 'Circulation',
            year: 2020,
            note: 'Rutin kardiyak arrestte Sodyum Bikarbonat önerilmemesi (yalnızca hiperkalemi, TCA/Na⁺ kanal blokeri veya önceden ağır asidoz).',
          },
          {
            authors: 'Bruccoleri RE, Burns MM',
            title: 'A Literature Review of the Use of Sodium Bicarbonate for the Treatment of QRS Widening',
            journal: 'Journal of Medical Toxicology',
            year: 2016,
            note: 'TCA ve voltaj-kapılı Na⁺ kanal blokeri toksisitesinde 1–2 mEq/kg bolus + arter pH 7,45–7,55 hedefi.',
          },
          {
            authors: 'Proudfoot AT, Krenzelok EP, Vale JA',
            title: 'Position Paper on Urine Alkalinization',
            journal: 'Journal of Toxicology: Clinical Toxicology',
            year: 2004,
            note: 'Salisilat, fenobarbital ve zayıf asit zehirlenmelerinde idrar pH 7,5–8,0 hedefi ve normokalemi (paradoksal asidüri önlemi) kılavuzu.',
          },
          {
            authors: 'Umpierrez GE, Davis GM, ElSayed NA, et al.',
            title: 'Hyperglycemic Crises in Adults With Diabetes: A Consensus Report (ADA / EASD / JBDS / AACE / DTS)',
            journal: 'Diabetes Care',
            year: 2024,
            note: 'Diyabetik ketoasidozda pH ≥7,0 için rutin bikarbonat verilmemesi, yalnızca pH <6,9–7,0’da sınırlı kullanım önerisi.',
          },
          {
            authors: 'Kraut JA, Madias NE; & KDIGO 2024 CKD Work Group',
            title: 'Lactic Acidosis (NEJM 2014) & KDIGO 2024 Clinical Practice Guideline for Chronic Kidney Disease',
            journal: 'New England Journal of Medicine / Kidney International',
            year: 2024,
            note: 'Laktik asidozda CO₂/iCa²⁺/PFK fizyopatolojisi ve kronik böbrek hastalığında metabolik asidoz yönetimi.',
          },
        ]}
      />
    </div>
  );
};
