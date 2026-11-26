import React, { useId, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  HeartPulse,
  Layers,
  Syringe,
  Zap,
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

type CalcTab = 'trauma_pph' | 'noncardiac_ortho' | 'cardiac_cpb' | 'renal_adjust';
type TraumaSubtype = 'trauma_crash2' | 'tbi_crash3' | 'pph_woman';
type CardiacRegimen = 'low_mod' | 'atacas_50' | 'bart_high';
type RenalTier = 'normal' | 'mild_mod' | 'severe' | 'esrd';

const CARDIAC_REGIMENS: Record<
  CardiacRegimen,
  {
    label: string;
    shortLabel: string;
    loadMgKg: number;
    maintMgKgHr: number;
    primeMgKg: number;
    seizureRiskLabel: string;
    note: string;
  }
> = {
  low_mod: {
    label: 'Düşük-Orta Doz (Önerilen · Düşük Nöbet Riski)',
    shortLabel: 'Düşük-Orta Doz',
    loadMgKg: 10,
    maintMgKgHr: 1,
    primeMgKg: 1,
    seizureRiskLabel: 'Düşük (<%0,5)',
    note: 'Primer CABG ve düşük-orta kanama riskli vakalarda etkin antifibrinoliz sağlarken postoperatif nöbet riskini minimal tutar.',
  },
  atacas_50: {
    label: 'ATACAS Tek Bolus (50 mg/kg · NEJM 2017)',
    shortLabel: 'ATACAS 50 mg/kg',
    loadMgKg: 50,
    maintMgKgHr: 0,
    primeMgKg: 0,
    seizureRiskLabel: 'Orta (%0,7 vs %0,1 plasebo)',
    note: 'ATACAS çalışmasında 50 mg/kg (başlangıçta 100 mg/kg iken nöbet nedeniyle 50 mg/kg’a indirilmiştir) 30 dakikada yavaş IV infüzyonla uygulanmıştır; böbrek yetmezliği ve açık kalp kapak cerrahisinde dikkat!',
  },
  bart_high: {
    label: 'Yüksek Doz BART (30 mg/kg + 16 mg/kg/sa + 2 mg/kg Prime)',
    shortLabel: 'Yüksek Doz BART',
    loadMgKg: 30,
    maintMgKgHr: 16,
    primeMgKg: 2,
    seizureRiskLabel: 'Yüksek (Doz-Bağımlı >%2–4!)',
    note: 'Yalnızca yüksek kanama riskli kompleks aort/redo/kapak cerrahisinde tartışılır; kümülatif doz >50–100 mg/kg olduğunda GABA-A/glisin antagonizmasıyla nöbet insidansı belirgin artar!',
  },
};

export const TranexamicAcidProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('trauma_pph');
  const [weightKg, setWeightKg] = useState<number>(75);

  // Tab 1: Travma & PPH (CRASH-2 / CRASH-3 / WOMAN)
  const [traumaSubtype, setTraumaSubtype] = useState<TraumaSubtype>('trauma_crash2');
  const [hoursSinceEvent, setHoursSinceEvent] = useState<number>(1.5);
  const [isPedTrauma, setIsPedTrauma] = useState<boolean>(false);

  // Tab 2: Non-Kardiyak Majör Cerrahi / Ortopedi (POISE-3 & Pediatrik)
  const [nonCardiacMode, setNonCardiacMode] = useState<'adult_poise3' | 'pediatric_major'>('adult_poise3');
  const [pedLoadMgKg, setPedLoadMgKg] = useState<number>(15);
  const [pedMaintMgKgHr, setPedMaintMgKgHr] = useState<number>(5);
  const [pedInfConcMgMl, setPedInfConcMgMl] = useState<10 | 20>(10);

  // Tab 3: Kardiyak Cerrahi / CPB
  const [cardiacRegimen, setCardiacRegimen] = useState<CardiacRegimen>('low_mod');
  const [cpbHours, setCpbHours] = useState<number>(3);
  const [cardiacConcMgMl, setCardiacConcMgMl] = useState<20 | 50>(20);

  // Tab 4: Renal Doz Ayarlama
  const [serumCr, setSerumCr] = useState<number>(1.8);

  // Akordiyon State
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik ID'leri
  const weightSliderId = useId();
  const weightInputId = useId();
  const hoursSliderId = useId();
  const pedLoadSliderId = useId();
  const pedMaintSliderId = useId();
  const cpbHoursSliderId = useId();
  const crSliderId = useId();

  // --- HESAPLAMALAR ---
  // Tab 1: Travma / PPH
  const traumaOver3h = hoursSinceEvent > 3.0;
  const traumaWithin1h = hoursSinceEvent <= 1.0;
  const traumaLoadMg = isPedTrauma ? Math.min(1000, Math.round(weightKg * 15)) : 1000;
  const traumaLoadMlStock = traumaLoadMg / 100; // 100 mg/mL stok
  const traumaLoadAmp500 = Math.ceil(traumaLoadMg / 500);
  const traumaLoadAmp250 = Math.ceil(traumaLoadMg / 250);
  const traumaMaintMgHr = isPedTrauma ? Math.min(125, Number((weightKg * 2).toFixed(1))) : 125;
  const traumaMaintTotal8hMg = Math.round(traumaMaintMgHr * 8);
  const traumaMaintRateMlHrIn100 = (traumaMaintMgHr / (traumaMaintTotal8hMg || 1)) * 100; // 100 mL SF içinde 8 saat = 12,5 mL/sa

  // Tab 2: Non-Kardiyak / Ortopedi
  const adultPoiseLoadMg = 1000;
  const adultPoiseClosureMg = 1000;
  const pedLoadRawMg = Math.round(weightKg * pedLoadMgKg);
  const pedLoadCappedMg = Math.min(2000, pedLoadRawMg);
  const pedLoadCapHit = pedLoadRawMg > 2000;
  const pedLoad1gNote = pedLoadCappedMg > 1000;
  const pedMaintMgHr = Math.min(500, Number((weightKg * pedMaintMgKgHr).toFixed(1)));
  const pedMaintMlHr = pedMaintMgHr / pedInfConcMgMl;
  const pedLoadAmp500 = Math.ceil(pedLoadCappedMg / 500);

  // Tab 3: Kardiyak / CPB
  const activeCardiac = CARDIAC_REGIMENS[cardiacRegimen];
  const cardiacLoadMg = Math.round(weightKg * activeCardiac.loadMgKg);
  const cardiacMaintMgHr = Math.round(weightKg * activeCardiac.maintMgKgHr);
  const cardiacMaintTotalMg = Math.round(cardiacMaintMgHr * cpbHours);
  const cardiacPrimeMg = Math.round(weightKg * activeCardiac.primeMgKg);
  const cardiacCumulativeMg = cardiacLoadMg + cardiacMaintTotalMg + cardiacPrimeMg;
  const cardiacCumulativeMgKg = weightKg > 0 ? cardiacCumulativeMg / weightKg : 0;
  const cardiacMaintMlHr = cardiacMaintMgHr / cardiacConcMgMl;
  const cardiacTotalAmp500 = Math.ceil(cardiacCumulativeMg / 500);
  const cardiacSeizureAlertLevel: 'low' | 'moderate' | 'high' =
    cardiacCumulativeMgKg >= 80 ? 'high' : cardiacCumulativeMgKg >= 50 ? 'moderate' : 'low';

  // Tab 4: Renal Ayarlama (FDA / KÜB Kreatinin Eşikleri)
  const renalTier: RenalTier =
    serumCr <= 1.36 ? 'normal' : serumCr <= 2.83 ? 'mild_mod' : serumCr <= 5.66 ? 'severe' : 'esrd';

  const renalRec = (() => {
    if (renalTier === 'normal') {
      const mg = Math.min(1000, Math.round(weightKg * 10));
      return {
        tierLabel: 'Normal / Hafif (Cr ≤ 1,36 mg/dL · eGFR > 50 mL/dk)',
        doseText: `10–15 mg/kg IV (veya 1 g) q8sa`,
        calcMg: mg,
        interval: 'Her 8 saatte bir (q8sa)',
        infusionMod: 'Standart infüzyon hızı (%100)',
        tone: 'emerald' as const,
        note: 'Standart doz rejimleri güvenle uygulanabilir; yine de maksimum hız ≤ 100 mg/dk kuralına uyun.',
      };
    }
    if (renalTier === 'mild_mod') {
      const mg = Math.min(1000, Math.round(weightKg * 10));
      return {
        tierLabel: 'Hafif-Orta Böbrek Yetmezliği (Cr 1,36–2,83 mg/dL · eGFR 20–50)',
        doseText: `10 mg/kg IV q12sa`,
        calcMg: mg,
        interval: 'Her 12 saatte bir (q12sa)',
        infusionMod: 'İdame infüzyon hızını %50 azalt',
        tone: 'amber' as const,
        note: 'İlacın %95’i değişmeden renal atılır; standart q8sa tekrarları plazma/BOS birikimine ve nöbete yol açar.',
      };
    }
    if (renalTier === 'severe') {
      const mg = Math.min(1000, Math.round(weightKg * 10));
      return {
        tierLabel: 'Ağır Böbrek Yetmezliği (Cr 2,83–5,66 mg/dL · eGFR 10–20)',
        doseText: `10 mg/kg IV q24sa`,
        calcMg: mg,
        interval: 'Her 24 saatte bir (q24sa)',
        infusionMod: 'İdame infüzyon hızını %75 azalt veya tek bolusla sınırla',
        tone: 'amber' as const,
        note: 'Eliminasyon yarı ömrü belirgin uzar; özellikle kardiyak cerrahide kümülatif yüksek dozlardan kesinlikle kaçının.',
      };
    }
    const mg = Math.min(500, Math.round(weightKg * 5));
    return {
      tierLabel: 'Son Dönem KBY / Diyaliz (Cr > 5,66 mg/dL · eGFR < 10)',
      doseText: `5 mg/kg IV q24sa (veya 10 mg/kg q48sa)`,
      calcMg: mg,
      interval: 'Her 24 saatte bir (5 mg/kg) veya 48 saatte bir (10 mg/kg)',
      infusionMod: 'Sürekli infüzyondan kaçının · Nöbet izlemi zorunlu!',
      tone: 'rose' as const,
      note: 'Maksimum birikim ve GABA-A antagonizmasına bağlı postoperatif miyoklonus/jeneralize nöbet riski! Diyalizle kısmen uzaklaştırılır.',
    };
  })();

  // Yapılandırılmış Türkçe Klinik Order Özeti
  const buildCopySummary = (): string => {
    const activeOrder = (() => {
      if (activeTab === 'trauma_pph') {
        const subTitle =
          traumaSubtype === 'trauma_crash2'
            ? 'Travma (CRASH-2)'
            : traumaSubtype === 'tbi_crash3'
              ? 'TBH (CRASH-3)'
              : 'Postpartum Hemoraji (WOMAN)';
        const timingWarn = traumaOver3h
          ? ` [UYARI: Olaydan ${hoursSinceEvent.toFixed(1)} saat geçmiş (>3 saat) — kanama mortalitesi ARTABİLİR, rutin başlatma ÖNERİLMEZ!]`
          : ` [Olaydan ${hoursSinceEvent.toFixed(1)} saat — İLK 3 SAAT PENCERESİNDE UYGUN]`;
        return `• Aktif Order (${subTitle}${isPedTrauma ? ` · Pediatrik ${weightKg} kg` : ' · Erişkin'}): Yükleme ${traumaLoadMg} mg (${traumaLoadMlStock.toFixed(
          1
        )} mL = ${traumaLoadAmp500} × 500 mg ampul) 100 mL SF içinde 10 dk’da IV (≤100 mg/dk) → İdame ${traumaMaintTotal8hMg} mg / 8 saat (${traumaMaintMgHr} mg/saat = ${traumaMaintRateMlHrIn100.toFixed(
          1
        )} mL/saat [100 mL SF içinde]).${timingWarn}`;
      }
      if (activeTab === 'noncardiac_ortho') {
        if (nonCardiacMode === 'adult_poise3') {
          return `• Aktif Order (Non-Kardiyak Majör Cerrahi / Ortopedi — POISE-3 NEJM 2022): İnsizyon öncesi 1000 mg (2 × 500 mg ampul, 100 mL SF içinde 10–15 dk’da) + Kapanışta 1000 mg IV (Toplam 2 g).`;
        }
        return `• Aktif Order (Pediatrik Majör Cerrahi, ${weightKg} kg): Yükleme ${pedLoadMgKg} mg/kg = ${pedLoadCappedMg} mg (${pedLoadAmp500} × 500 mg ampul, 15 dk’da IV) → İdame ${pedMaintMgKgHr} mg/kg/sa = ${pedMaintMgHr} mg/saat (${pedMaintMlHr.toFixed(
          1
        )} mL/saat [${pedInfConcMgMl} mg/mL SF]).`;
      }
      if (activeTab === 'cardiac_cpb') {
        return `• Aktif Order (Kardiyak Cerrahi / CPB — ${activeCardiac.shortLabel}, ${weightKg} kg, ${cpbHours} sa CPB): Yükleme ${cardiacLoadMg} mg (30 dk’da) + Prime ${cardiacPrimeMg} mg + İdame ${cardiacMaintMgHr} mg/saat (${cardiacMaintMlHr.toFixed(
          1
        )} mL/saat [${cardiacConcMgMl} mg/mL]). Toplam Kümülatif: ${cardiacCumulativeMg} mg (${cardiacCumulativeMgKg.toFixed(
          1
        )} mg/kg · ${cardiacTotalAmp500} × 500 mg ampul).${
          cardiacCumulativeMgKg >= 50 ? ' [NÖBET UYARISI: ≥50 mg/kg doz-bağımlı postop nöbet riski!]' : ''
        }`;
      }
      return `• Aktif Order (Renal Doz Ayarlama — Cr ${serumCr.toFixed(2)} mg/dL, ${weightKg} kg): ${renalRec.doseText} → Hesaplanan Tek Doz ${renalRec.calcMg} mg (${(
        renalRec.calcMg / 100
      ).toFixed(1)} mL = ${Math.ceil(renalRec.calcMg / 500)} × 500 mg ampul), aralık: ${renalRec.interval}. ${renalRec.infusionMod}.`;
    })();

    return [
      `TRANEKSAMİK ASİT (Transamine® / Herajit® / Tranex® 250 mg/2,5 mL & 500 mg/5 mL Ampul · 100 mg/mL) KLİNİK ORDER ÖZETİ`,
      `• ATC: B02AA02 · Sentetik Lizin Analoğu Antifibrinolitik (Plazminojen Lizin Bağlanma Bölgesi Blokeri)`,
      activeOrder,
      `• KRİTİK GÜVENLİK: ASLA İNTRATEKAL VERME (Bupivakain/Ağır Markain ampul LASA — >%50 mortalite!). Maksimum IV hız ≤ 100 mg/dk (hızlı puşe hipotansiyon!). KAN ÜRÜNLERİ (ES/TDP/Trombosit) ve penisilinlerle aynı hattan ASLA verilmez.`,
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
        tallManName="tranexamic ACID"
        confusionRiskWith="bupivacaine (Marcaine® Heavy — İntratekal Ölümcül LASA!) · aminocaproic acid"
        criticalAlerts={[
          'ÖLÜMCÜL NEVER-EVENT — KAZARA İNTRATEKAL ENJEKSİYON (WHO 2022 & ISMP Uyarısı): Şeffaf 5 mL cam ampul benzerliği nedeniyle spinal anestezi sırasında Ağır Bupivakain (Marcaine® Heavy) yerine yanlışlıkla Traneksamik Asit enjekte edilmesi >%50 mortaliteye yol açar! Dakikalar içinde dayanılmaz sırt/bacak ağrısı, refrakter miyoklonus, status epileptikus, polimorfik VT/VF ve kardiyak arrest gelişir. Ameliyathanede TXA ampullerini ASLA spinal/rejyonal anestezi arabasında veya lokal anesteziklerin yanında saklamayın; yalnızca IV hazır torba (1 g / 100 mL SF) veya barkod çift kontrolü kullanın!',
          'TRAVMA & PPH’DE 3 SAAT PENCERESİ KURALI (CRASH-2 / CRASH-3 / WOMAN): Kanama/travma başlangıcından İLK 3 SAAT içinde (en ideal ≤1 saat) verildiğinde mortaliteyi anlamlı azaltır. Olaydan >3 SAAT SONRA başlanması kanama kaynaklı mortaliteyi ARTIRABİLİR (RR 1,44) — geç dönemde rutin başlatmayın!',
          'KARDİYAK CERRAHİDE DOZ-BAĞIMLI POSTOP NÖBET (GABA-A & Glisin Antagonizması): Özellikle kümülatif >50–100 mg/kg yüksek dozlarda, açık kalp/kapak cerrahisinde, yaşlılarda ve böbrek yetmezliğinde (Cr >1,36 mg/dL) kan-beyin bariyerini geçerek postoperatif konvülsiyon ve miyoklonus tetikler.',
          'HIZLI IV PUŞE & KAN ÜRÜNÜ HAT YASAĞI: Maksimum infüzyon hızı ≤100 mg/dk (1 g en az 10 dakikada) olmalıdır; hızlı puşe hipotansiyon yapar. Eritrosit süspansiyonu, TDP, trombosit ve penisilinlerle aynı IV hattan ASLA verilmez!',
        ]}
        antidoteOrRescue="Spesifik Farmakolojik Antidot YOKTUR. KAZARA İNTRATEKAL ENJEKSİYON ACİL KURTARMA: 1) İşlemi derhal durdurun, intratekal iğne/kateter yerindeyse veya acil lomber ponksiyonla DERHAL BOS DRENAJI / İZOTONİK SF İLE BOS LAVAJI (10–20 mL aralıklarla değişim) yapın; 2) Agresif nöbet & miyoklonus kontrolü (Propofol / Midazolam / Tiyopental + Magnezyum sülfat IV); 3) Erken endotrakeal entübasyon, sempatik fırtına & VT/VF için sürekli EKG/defibrilatör hazırlığı ve YBÜ hemodinamik desteği; 4) Yüksek doz IV toksisite / nöbette benzodiazepin veya propofol ile nöbet kontrolü + ağır renal birikimde hemodiyaliz değerlendirilebilir."
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
                Sentetik Lizin Analoğu · Antifibrinolitik
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                YALNIZCA IV / ORAL / TOPİKAL · İntratekal ÖLÜMCÜL!
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Transamine® · Herajit® · Tranex® (100 mg/mL)
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: B02AA02</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Traneksamik Asit (Transamine® / Herajit® / Tranex®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Klinik Kimlik &amp; Rol:</strong>{' '}
              Plazminojenin fibrine bağlanmasını geri dönüşümlü olarak bloke ederek pıhtı yıkımını (fibrinolizi)
              durduran sentetik lizin analoğudur. Yeni pıhtı oluşturmaz; mevcut fibrin pıhtısını stabilize eder.
              <strong> Akut kanamalı travma (CRASH-2)</strong>,{' '}
              <strong>hafif-orta travmatik beyin hasarı (CRASH-3)</strong>,{' '}
              <strong>postpartum hemoraji (WOMAN)</strong>, <strong>non-kardiyak majör/ortopedik cerrahi (POISE-3)</strong>{' '}
              ve <strong>kardiyak cerrahi / CPB (ATACAS)</strong> kanama yönetiminde kanıta dayalı temel
              antifibrinolitiktir.
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
        summary="Traneksamik asit (TXA), lizin aminoasidinin sentetik bir analoğudur (trans-4-aminometilsiklohekzan karboksilik asit). Plazminojen ve plazmin üzerindeki yüksek afiniteli lizin bağlanma bölgelerini (kringle alanları) yarışmalı ve geri dönüşümlü olarak işgal eder; böylece plazminojenin fibrin yüzeyine tutunmasını ve tPA aracılı plazmine dönüşümünü engelleyerek pıhtı lizisini bloke eder."
        pillars={[
          {
            title: '1. Plazminojen Kringle Blokajı (Fibrin Stabilizasyonu)',
            detail:
              'Plazminojen üzerindeki lizin ceplerini kapatarak fibrin ağına bağlanmayı engeller. Oluşmuş pıhtının parçalanmasını (hiperfibrinoliz) %80–90 oranında durdurur; trombin oluşumunu doğrudan artırmaz.',
          },
          {
            title: '2. Anti-İnflamatuar & Kompleman Modülasyonu',
            detail:
              'Plazmin yalnızca fibrini yıkmakla kalmaz; kompleman kaskadını (C3a/C5a) ve monosit/endotel aktivasyonunu da tetikler. TXA, CPB ve travma sonrası plazmin aracılı inflamatuar yanıtı kısmen hafifletir.',
          },
          {
            title: '3. Hedef Dışı SSS Etkisi: GABA-A & Glisin Antagonizması',
            detail:
              'Yapısal olarak GABA ve glisine benzer! Yüksek sistemik/renal birikim dozlarında (>50–100 mg/kg) veya kazara intratekal uygulamada inhibitör GABA-A ve glisin reseptörlerini bloke ederek nöbet/miyoklonus yapar.',
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
                  Onset: 5–15 dk · t½: ~2–3 sa · %95 Renal Değişmeden Atılım
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Plazma protein bağlanması %3 (minimal), minimal hepatik metabolizma (&lt;%5), yüksek sinovyal/doku penetrasyonu ve eGFR-bağımlı klirens.
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
                  IV Pik &amp; Oral Biyoyararlanım
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  5–15 dk · PO %30–50
                </span>
                <span className="text-[10px] text-slate-400">Terapötik plazma: 10–15 mcg/mL</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Dağılım Hacmi (Vd) &amp; Protein
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  9–12 L · %3 Bağlanma
                </span>
                <span className="text-[10px] text-slate-400">Hidrofilik · Doku etkisi ~17 sa</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Metabolizma &amp; Atılım
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  %95 Renal (Glomerüler)
                </span>
                <span className="text-[10px] text-slate-400">Hepatik metabolizma &lt;%5</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Eliminasyon t½ (IV)
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  2 – 3 saat (KBY’de ↑↑)
                </span>
                <span className="text-[10px] text-slate-400">BOS geçişi ~%10 · Gecikmiş pik!</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">• Emilim &amp; Terapötik Hedef Düzey:</strong>{' '}
                IV uygulama sonrası antifibrinolitik etki dakikalar içinde başlar; fibrinolizi %80 inhibe etmek için{' '}
                <strong>10–15 mcg/mL</strong> plazma konsantrasyonu yeterlidir (1 g IV yükleme bu düzeyi hızla aşar ve
                ~3 saat korur). Oral biyoyararlanımı <strong>%30–50</strong> olup gıdalardan etkilenmez (pik 3 saat).
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">• Dağılım &amp; BOS Gecikmeli Pik Kinetiği:</strong>{' '}
                Hidrofilik moleküldür; plazma proteinlerine yalnızca <strong>~%3</strong> (ağırlıklı plazminojen)
                bağlanır. Eklem sıvısı, sinovyal membran, plasenta ve dokulara mükemmel geçer; doku düzeyindeki
                antifibrinolitik etki plazma düzeyinden uzun (<strong>~17 saat</strong>) sürer. BOS konsantrasyonu
                plazmanın ~%10&apos;udur; ancak BOS&apos;ta pik düzey plazmadan <strong>saatler sonra</strong> ulaşır
                ve bu durum postoperatif erken derlenme (YBÜ) döneminde görülen TXA nöbetlerinin zamanlamasını açıklar.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">• %95 Glomerüler Filtrasyonla Değişmeden Atılım:</strong>{' '}
                Karaciğerde %5&apos;ten azı metabolize edilir. IV dozun <strong>%90–95&apos;i 24 saat içinde</strong>{' '}
                değişmeden idrarla atılır. Bu nedenle serum kreatinin &gt;1,36 mg/dL (eGFR &lt;50 mL/dk) durumunda
                klirens doğrusal olarak düşer ve doz/aralık ayarlaması zorunludur.
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
          'Aktif Arteriyel veya Venöz Tromboembolik Hastalık: Akut DVT, pulmoner emboli (PE), akut iskemik inme, akut koroner sendrom / stent trombozu veya retinal arter/ven oklüzyonu.',
          'Subaraknoid Kanama (SAK): Anevrizmal SAK’ta tekrar kanamayı azaltsa da serebral vazospazm, gecikmiş serebral iskemi ve hidrosefali riskini artırdığı için (ULTRA çalışması dahil) rutin kontrendikedir.',
          'Aktif Üst Üriner Sistem / Renal Parankimal Hematüri: Üreter lümeninde erimeyen sert fibrin pıhtıları oluşturarak akut üreteral obstrüksiyon, hidronefroz ve postrenal akut böbrek hasarına yol açar.',
          'Kazanılmış Renkli Görme Bozukluğu (Akromatopsi / Retinal Vasküler Patoloji): Görsel toksisite takibini imkânsız kılar ve retinal tromboz riskini maskeler.',
          'Aktif Tüketim Koagülopatisi / Yaygın Damar İçi Pıhtılaşma (DİK — Heparinize Edilmeden): Baskın pıhtılaşma fazındaki DİK’te mikrovasküler tromboz ve çoklu organ yetmezliğini ağırlaştırır (yalnızca baskın hiperfibrinoliz kanıtlandığında uzman gözetiminde).',
          'Traneksamik aside aşırı duyarlılık veya İNTRATEKAL / EPİDURAL / NÖRAKSİYEL UYGULAMA (KESİN ÖLÜMCÜL!).',
        ]}
        relativeTitle="Relatif Kontrendikasyonlar & Yüksek Riskli Durumlar"
        relativeItems={[
          'Travma veya Postpartum Hemorajide Olaydan >3 Saat Geçmiş Olması (CRASH-2 / WOMAN): Geç dönemde başlatılması kanamaya bağlı mortaliteyi artırabilir.',
          'Ağır Böbrek Yetmezliği (eGFR < 30 mL/dk veya Cr > 2,83 mg/dL) ve Epilepsi / Nöbet Öyküsü: Doz azaltılmazsa santral birikimle jeneralize tonik-klonik nöbet ve miyoklonus gelişir.',
          'Yüksek Tromboemboli Riski & Östrojen/Kombine Oral Kontraseptif (KOK) veya Protrombin Kompleks Konsantresi (PCC) Kullanımı: Protrombotik sinerji nedeniyle fayda-zarar değerlendirmesi şarttır.',
          'Ağır Gastrointestinal Kanama (HALT-IT, Lancet 2020): Akut üst/alt GİS kanamasında mortaliteyi azaltmamış, buna karşın venöz tromboemboli ve nöbet riskini artırmıştır — rutin önerilmez!',
        ]}
        clinicalNote="Traneksamik Asit asla yeni bir trombüs oluşturmak için değil, kanıtlanmış veya yüksek olasılıklı hiperfibrinoliz ve majör cerrahi/travma kanamalarında pıhtı stabilizasyonu için kullanılmalıdır. HALT-IT çalışması sonrası GİS kanamalarında rutin TXA kullanımı terk edilmiştir."
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
              Klinik Endikasyonlar &amp; Kanıta Dayalı Doz Rejimleri
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Maks IV Hız ≤ 100 mg/dk · 1 g ≥ 10 dk</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Travma & TBH (CRASH-2 / CRASH-3) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-500 shrink-0" />
                <span>1. Akut Travma &amp; TBH (CRASH-2 / CRASH-3)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-700 dark:text-rose-300 shrink-0">
                İLK 3 SAAT!
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="font-mono text-slate-900 dark:text-white">1 g IV (10 dk&apos;da)</strong> → takiben{' '}
              <strong className="font-mono text-slate-900 dark:text-white">1 g IV / 8 saat infüzyon</strong> (125 mg/sa).
              CRASH-2 (n=20.211): İlk 1 saatte kanama mortalitesini %32, 1–3 saatte %21 azaltır;{' '}
              <strong className="text-rose-600 dark:text-rose-400">&gt;3 saatte mortaliteyi artırabilir!</strong>{' '}
              CRASH-3: Hafif-orta TBH&apos;de (GKS 9–15 veya reaktif pupil) ilk 3 saatte kafa travması ilişkili ölümü azaltır.
            </p>
          </div>

          {/* 2. Postpartum Hemoraji (WOMAN Trial) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-pink-500 shrink-0" />
                <span>2. Postpartum Hemoraji — PPH (WOMAN, Lancet 2017)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-pink-500/20 text-pink-700 dark:text-pink-300 shrink-0">
                1 g IV · Tekrar 1 g
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Doğum sonrası kanama tanısı konar konmaz (tercihen ilk 3 saat içinde){' '}
              <strong className="font-mono text-slate-900 dark:text-white">1 g IV 10 dakikada</strong> (100 mg/dk).
              Kanama 30 dk sonra sürerse veya 24 saat içinde tekrarlarsa{' '}
              <strong className="font-mono text-slate-900 dark:text-white">2. doz 1 g IV</strong> uygulanır. WOMAN
              çalışması (n=20.060): Tromboemboli artışı olmaksızın kanama kaynaklı maternal ölümü %31 azaltmıştır.
            </p>
          </div>

          {/* 3. Non-Kardiyak Majör Cerrahi & Ortopedi (POISE-3) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Syringe className="w-4 h-4 text-teal-500 shrink-0" />
                <span>3. Non-Kardiyak Majör Cerrahi &amp; Ortopedi (POISE-3)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                1 g + 1 g IV
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              POISE-3 (NEJM 2022, n=9.535): Cerrahi başlangıcında{' '}
              <strong className="font-mono text-slate-900 dark:text-white">1 g IV</strong> + kapanışta{' '}
              <strong className="font-mono text-slate-900 dark:text-white">1 g IV</strong> rejimi majör kanamayı %24
              azaltmıştır (eklem artroplastisi TKA/THA, omurga, majör jinekolojik/ürolojik/hepatik cerrahi). Pediatrik
              majör cerrahide: <strong className="font-mono">10–30 mg/kg yükleme (15 dk) → 5–10 mg/kg/sa</strong>.
            </p>
          </div>

          {/* 4. Kardiyak Cerrahi / CPB (ATACAS / BART) */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>4. Kardiyak Cerrahi / CPB (ATACAS · BART)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                Nöbet Sınırı &lt;50 mg/kg!
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Düşük-orta doz:</strong> <strong className="font-mono">10 mg/kg yükleme + 1 mg/kg/sa + 1 mg/kg prime</strong>.{' '}
              <strong>ATACAS (NEJM 2017):</strong> <strong className="font-mono">50 mg/kg</strong> tek yavaş infüzyon
              (30 dk). <strong>BART yüksek doz:</strong> <strong className="font-mono">30 mg/kg + 16 mg/kg/sa + 2 mg/kg prime</strong>{' '}
              — kümülatif &gt;50–100 mg/kg&apos;da doz-bağımlı postoperatif nöbet riski belirgin yükselir!
            </p>
          </div>
        </div>

        {/* Özet Klinik Rejim Tablosu */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-700'}>
              <tr>
                <th className="px-3.5 py-2.5 font-bold">Endikasyon</th>
                <th className="px-3.5 py-2.5 font-bold">Yükleme Dozu</th>
                <th className="px-3.5 py-2.5 font-bold">İdame / Tekrar</th>
                <th className="px-3.5 py-2.5 font-bold">Kritik Klinik Not</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              <tr>
                <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-white">Travma / TBH (Erişkin)</td>
                <td className="px-3.5 py-2.5 font-mono">1 g IV (10 dk&apos;da)</td>
                <td className="px-3.5 py-2.5 font-mono">1 g / 8 sa (125 mg/sa)</td>
                <td className="px-3.5 py-2.5">İlk 3 saat içinde başla (&gt;3 sa önerilmez)</td>
              </tr>
              <tr>
                <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-white">Postpartum Hemoraji (PPH)</td>
                <td className="px-3.5 py-2.5 font-mono">1 g IV (10 dk&apos;da)</td>
                <td className="px-3.5 py-2.5 font-mono">Kanama sürerse +1 g IV (30 dk sonra)</td>
                <td className="px-3.5 py-2.5">Doğumdan ≤3 saat içinde · Uterotoniklere ek</td>
              </tr>
              <tr>
                <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-white">Non-Kardiyak / Ortopedi</td>
                <td className="px-3.5 py-2.5 font-mono">1 g IV insizyon öncesi</td>
                <td className="px-3.5 py-2.5 font-mono">1 g IV kapanışta (veya 10–15 mg/kg)</td>
                <td className="px-3.5 py-2.5">POISE-3 rejimi · Topikal 1–3 g opsiyon</td>
              </tr>
              <tr>
                <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-white">Pediatrik Majör Cerrahi</td>
                <td className="px-3.5 py-2.5 font-mono">10–30 mg/kg (15 dk&apos;da)</td>
                <td className="px-3.5 py-2.5 font-mono">5–10 mg/kg/sa</td>
                <td className="px-3.5 py-2.5">Maks yükleme 1–2 g · Kraniyosinostoz / skolyoz</td>
              </tr>
              <tr>
                <td className="px-3.5 py-2.5 font-semibold text-slate-900 dark:text-white">Kardiyak Cerrahi (CPB)</td>
                <td className="px-3.5 py-2.5 font-mono">10–30 mg/kg (30 dk&apos;da)</td>
                <td className="px-3.5 py-2.5 font-mono">1–16 mg/kg/sa + 1–2 mg/kg prime</td>
                <td className="px-3.5 py-2.5">&gt;50–100 mg/kg kümülatif = NÖBET RİSKİ ↑</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. ETKİLEŞİMLİ DOZ, SEYRELTME & RENAL HESAPLAYICI (#sec-hesaplayici) */}
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
                Etkileşimli Traneksamik Asit Doz, İnfüzyon &amp; Renal Hesaplayıcı
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Stok konsantrasyon: <span className="font-mono font-semibold">100 mg/mL</span> (500 mg/5 mL veya 250 mg/2,5 mL ampul) · Maksimum IV hız ≤ 100 mg/dk
            </p>
          </div>
          <MonographCopyButton
            isDark={isDark}
            label="Order Özeti Kopyala"
            getText={buildCopySummary}
          />
        </div>

        {/* Çoklu Sekme Barı */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {(
            [
              { id: 'trauma_pph', label: '1. Travma & PPH (≤3 sa)', badge: 'CRASH / WOMAN' },
              { id: 'noncardiac_ortho', label: '2. Non-Kardiyak / Ortopedi', badge: 'POISE-3 / Ped' },
              { id: 'cardiac_cpb', label: '3. Kardiyak / CPB', badge: 'ATACAS / BART' },
              { id: 'renal_adjust', label: '4. Renal Doz Ayarlama', badge: '%95 Renal' },
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

        {/* Ortak Ağırlık Girişi + Obezite Skaler Yardımcısı */}
        <div className="space-y-3">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label htmlFor={weightSliderId} className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Hasta Dozaj Ağırlığı (kg) — Hidrofilik ilaç: Obezlerde IBW / LBW önerilir
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={weightInputId}
                  type="number"
                  min={5}
                  max={180}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.min(180, Math.max(5, Number(e.target.value) || 5)))}
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
              min={5}
              max={180}
              step={1}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full accent-teal-500 cursor-pointer"
            />
          </div>

          <ObesityDosingScaler
            isDark={isDark}
            drugName="Traneksamik Asit"
            recommendedScalar="IBW"
            secondaryScalar={{ type: 'LBW', context: 'Kardiyak/CPB' }}
            rationale="Traneksamik asit suda çözünen (hidrofilik, Vd 9–12 L) bir moleküldür ve yağ dokusuna minimal dağılır. Sabit erişkin 1 g rejimleri (CRASH-2 / WOMAN / POISE-3) çoğu hastada güvenlidir; ancak kg-bazlı kardiyak veya cerrahi rejimlerde morbid obezlerde gerçek ağırlık (TBW) kullanmak aşırı doz ve postoperatif nöbet riskini artırır — IBW veya LBW kullanın."
            currentWeightKg={weightKg}
            onApplyWeight={(w) => setWeightKg(Math.min(180, Math.max(5, Math.round(w))))}
          />
        </div>

        {/* TAB 1: TRAVMA & PPH */}
        {activeTab === 'trauma_pph' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'trauma_crash2', label: 'Travma (CRASH-2)' },
                    { id: 'tbi_crash3', label: 'TBH (CRASH-3)' },
                    { id: 'pph_woman', label: 'PPH (WOMAN)' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setTraumaSubtype(item.id);
                      if (item.id === 'pph_woman') setIsPedTrauma(false);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                      traumaSubtype === item.id
                        ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                        : isDark
                          ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {traumaSubtype !== 'pph_woman' && (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPedTrauma(false)}
                    className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                      !isPedTrauma
                        ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                        : isDark
                          ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Erişkin Sabit (1 g → 1 g/8sa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPedTrauma(true)}
                    className={`p-2 rounded-xl border text-xs font-bold cursor-pointer ${
                      isPedTrauma
                        ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                        : isDark
                          ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                          : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    Pediatrik (15 mg/kg → 2 mg/kg/sa)
                  </button>
                </div>
              )}

              {/* Olaydan Beri Geçen Süre (3 Saat Penceresi) */}
              <div
                className={`p-4 rounded-xl border ${
                  traumaOver3h
                    ? isDark
                      ? 'border-rose-500/60 bg-rose-950/30'
                      : 'border-rose-300 bg-rose-50'
                    : isDark
                      ? 'border-slate-800 bg-slate-950/60'
                      : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label htmlFor={hoursSliderId} className="font-bold text-slate-700 dark:text-slate-200">
                    Travma / Doğum Sonrası Geçen Süre
                  </label>
                  <span
                    className={`font-mono font-bold px-2 py-0.5 rounded ${
                      traumaOver3h
                        ? 'bg-rose-600 text-white'
                        : traumaWithin1h
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                    }`}
                  >
                    {hoursSinceEvent.toFixed(1)} saat
                  </span>
                </div>
                <input
                  id={hoursSliderId}
                  type="range"
                  min={0.5}
                  max={6.0}
                  step={0.5}
                  value={hoursSinceEvent}
                  onChange={(e) => setHoursSinceEvent(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>0,5 sa (Altın Saat)</span>
                  <span>3,0 sa (Kesin Sınır)</span>
                  <span>6,0 sa</span>
                </div>
              </div>

              {traumaOver3h ? (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs leading-relaxed ${
                    isDark
                      ? 'border-rose-500/60 bg-rose-950/40 text-rose-200'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
                  }`}
                >
                  <AlertOctagon className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-sm text-rose-600 dark:text-rose-300">
                      KRİTİK ZAMAN UYARISI: &gt;3 SAAT GEÇTİ!
                    </strong>
                    CRASH-2 ve WOMAN verilerine göre olaydan <strong>&gt;3 saat sonra</strong> Traneksamik Asit
                    başlatılması kanama kaynaklı mortaliteyi <strong>ARTIRABİLİR (RR 1,44)</strong>. Viscoelastik test
                    (ROTEM/TEG) ile kanıtlanmış aktif hiperfibrinoliz yoksa rutin TXA başlanması{' '}
                    <strong>ÖNERİLMEZ!</strong>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark
                      ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                      : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                  }`}
                >
                  <strong>
                    {traumaWithin1h
                      ? 'Optimal Pencere (≤1 Saat): Maksimal sağkalım kazancı!'
                      : 'Uygun Pencere (1–3 Saat): Anlamlı mortalite azalması.'}
                  </strong>{' '}
                  Her 15 dakikalık gecikme sağkalım yararını ~%10 azaltır; tanı anında geciktirmeden başlatın.
                </div>
              )}
            </div>

            {/* Sağ Çıktılar */}
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                  isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                }`}
              >
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Yükleme Dozu (10 dk&apos;da IV)</span>
                  <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                    {traumaLoadMg} mg
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    {traumaLoadMlStock.toFixed(1)} mL stok (100 mg/mL)
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {traumaLoadAmp500} × 500 mg veya {traumaLoadAmp250} × 250 mg ampul
                  </span>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    {traumaSubtype === 'pph_woman' ? '2. Doz Kuralı (WOMAN)' : '8 Saatlik İdame İnfüzyonu'}
                  </span>
                  <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                    {traumaSubtype === 'pph_woman' ? '+1000 mg' : `${traumaMaintMgHr} mg/sa`}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    {traumaSubtype === 'pph_woman'
                      ? '30 dk sonra kanama sürerse'
                      : `Toplam ${traumaMaintTotal8hMg} mg / 8 sa`}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {traumaSubtype === 'pph_woman'
                      ? 'veya 24 sa içinde tekrarlarsa'
                      : `100 mL SF’de: ${traumaMaintRateMlHrIn100.toFixed(1)} mL/sa`}
                  </span>
                </div>

                <div className={`p-3 rounded-xl border col-span-2 text-xs leading-relaxed ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-teal-100 text-slate-700'}`}>
                  <strong>Hazırlama &amp; Hız Güvenliği:</strong> Yükleme dozunu ({traumaLoadMg} mg) <strong>100 mL %0,9 NaCl</strong>{' '}
                  içine ekleyip <strong>10 dakikada</strong> (600 mL/sa · ≤100 mg/dk) infüze edin. Hızlı bolus
                  hipotansiyon oluşturabilir!{' '}
                  {traumaSubtype !== 'pph_woman' && (
                    <>
                      Takiben <strong>{traumaMaintTotal8hMg} mg</strong> ({Math.ceil(traumaMaintTotal8hMg / 500)} × 500 mg
                      ampul) 100 mL SF içinde <strong>8 saatte ({traumaMaintRateMlHrIn100.toFixed(1)} mL/sa)</strong> verin.
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NON-KARDİYAK MAJÖR CERRAHİ & ORTOPEDİ */}
        {activeTab === 'noncardiac_ortho' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNonCardiacMode('adult_poise3')}
                  className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                    nonCardiacMode === 'adult_poise3'
                      ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Erişkin (POISE-3 · 1 g + 1 g)
                </button>
                <button
                  type="button"
                  onClick={() => setNonCardiacMode('pediatric_major')}
                  className={`p-2.5 rounded-xl border text-xs font-bold cursor-pointer ${
                    nonCardiacMode === 'pediatric_major'
                      ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                      : isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                        : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Pediatrik Majör Cerrahi (kg-Bazlı)
                </button>
              </div>

              {nonCardiacMode === 'adult_poise3' ? (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <p>
                    <strong className="text-slate-900 dark:text-white">POISE-3 Protokolü (NEJM 2022):</strong> Majör
                    non-kardiyak cerrahi geçiren erişkinlerde cerrahi insizyon öncesi{' '}
                    <strong className="font-mono">1 g IV</strong> (10–15 dk&apos;da) ve cerrahi kapanışta{' '}
                    <strong className="font-mono">1 g IV</strong> olmak üzere toplam <strong>2 g</strong> uygulanır.
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Total Diz/Kalça Artroplastisi (TKA/THA):</strong>{' '}
                    Turnike şişirilmeden/insizyondan 10–15 dk önce <strong>1 g IV</strong> (veya 10–15 mg/kg) + turnike
                    açılmadan/kapanışta <strong>1 g IV</strong>; alternatif veya ek olarak 1–3 g intra-artiküler topikal
                    uygulama (yüksek VTE riskli hastada topikal tercih edilebilir).
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor={pedLoadSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                        Pediatrik Yükleme (10–30 mg/kg · 15 dk&apos;da)
                      </label>
                      <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                        {pedLoadMgKg} mg/kg
                      </span>
                    </div>
                    <input
                      id={pedLoadSliderId}
                      type="range"
                      min={10}
                      max={30}
                      step={5}
                      value={pedLoadMgKg}
                      onChange={(e) => setPedLoadMgKg(Number(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor={pedMaintSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                        İdame İnfüzyonu (5–10 mg/kg/saat)
                      </label>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {pedMaintMgKgHr} mg/kg/sa
                      </span>
                    </div>
                    <input
                      id={pedMaintSliderId}
                      type="range"
                      min={5}
                      max={10}
                      step={1}
                      value={pedMaintMgKgHr}
                      onChange={(e) => setPedMaintMgKgHr(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {([10, 20] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPedInfConcMgMl(c)}
                        className={`p-2 rounded-xl border text-xs font-mono font-bold cursor-pointer ${
                          pedInfConcMgMl === c
                            ? 'border-indigo-500 bg-indigo-500/15 text-indigo-700 dark:text-indigo-300'
                            : isDark
                              ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        Pompa: {c} mg/mL ({c === 10 ? '500 mg/50 mL' : '1 g/50 mL'})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sağ Çıktılar */}
            <div className="space-y-3">
              {nonCardiacMode === 'adult_poise3' ? (
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-teal-950/20 border-teal-900/50' : 'bg-teal-50/70 border-teal-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">1. Doz (İnsizyon Öncesi)</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1">
                      {adultPoiseLoadMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">2 × 500 mg ampul · 100 mL SF · 10–15 dk</span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-teal-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">2. Doz (Kapanışta)</span>
                    <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                      {adultPoiseClosureMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">2 × 500 mg ampul · Toplam 2 g</span>
                  </div>
                  <div className={`p-3 rounded-xl border col-span-2 text-xs ${isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-teal-100 text-slate-700'}`}>
                    <strong>Ağırlık Kontrolü ({weightKg} kg):</strong> 1000 mg dozu bu hasta için{' '}
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                      {(1000 / weightKg).toFixed(1)} mg/kg
                    </span>
                    &apos;a karşılık gelir. Çok düşük kilolu erişkinlerde (&lt;50 kg) 15 mg/kg ({Math.round(weightKg * 15)} mg)
                    tercih edilebilir.
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                    isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'
                  }`}
                >
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Pediatrik Yükleme (15 dk)</span>
                    <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                      {pedLoadCappedMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {(pedLoadCappedMg / 100).toFixed(1)} mL stok ({pedLoadAmp500} × 500 mg amp)
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-indigo-100'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">İdame Pompa Hızı</span>
                    <div className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400 mt-1 tabular-nums">
                      {pedMaintMlHr.toFixed(1)} mL/sa
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {pedMaintMgHr} mg/sa ({pedInfConcMgMl} mg/mL)
                    </span>
                  </div>
                  {(pedLoadCapHit || pedLoad1gNote) && (
                    <div className={`p-3 rounded-xl border col-span-2 text-xs ${isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                      <strong>Güvenlik Tavanı Uyarısı:</strong>{' '}
                      {pedLoadCapHit
                        ? `Hesaplanan ${pedLoadRawMg} mg yükleme 2000 mg üst tavanına sınırlandırıldı!`
                        : `Yükleme >1000 mg; birçok pediatrik merkez kraniyosinostoz/skolyoz dışında maksimum yüklemeyi 1000–2000 mg ile sınırlar ve ≥15–30 dk’da uygular.`}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: KARDİYAK CERRAHİ / CPB */}
        {activeTab === 'cardiac_cpb' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="space-y-2">
                {(['low_mod', 'atacas_50', 'bart_high'] as CardiacRegimen[]).map((reg) => {
                  const spec = CARDIAC_REGIMENS[reg];
                  const selected = cardiacRegimen === reg;
                  return (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setCardiacRegimen(reg)}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? reg === 'bart_high'
                            ? 'border-rose-500 bg-rose-500/15'
                            : 'border-amber-500 bg-amber-500/15'
                          : isDark
                            ? 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{spec.label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/10 dark:bg-white/10">
                          Nöbet: {spec.seizureRiskLabel}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">{spec.note}</p>
                    </button>
                  );
                })}
              </div>

              {cardiacRegimen !== 'atacas_50' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <label htmlFor={cpbHoursSliderId} className="font-bold text-slate-600 dark:text-slate-300">
                        Tahmini Cerrahi / CPB Süresi
                      </label>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{cpbHours} saat</span>
                    </div>
                    <input
                      id={cpbHoursSliderId}
                      type="range"
                      min={1}
                      max={6}
                      step={0.5}
                      value={cpbHours}
                      onChange={(e) => setCpbHours(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 self-end">
                    {([20, 50] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCardiacConcMgMl(c)}
                        className={`py-2 rounded-xl border text-xs font-mono font-bold cursor-pointer ${
                          cardiacConcMgMl === c
                            ? 'border-teal-500 bg-teal-500/15 text-teal-700 dark:text-teal-300'
                            : isDark
                              ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {c} mg/mL
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sağ Çıktılar */}
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border grid grid-cols-2 gap-3 ${
                  isDark ? 'bg-amber-950/15 border-amber-900/50' : 'bg-amber-50/70 border-amber-200'
                }`}
              >
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500">Yükleme (30 dk&apos;da IV)</span>
                  <div className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400 mt-1 tabular-nums">
                    {cardiacLoadMg} mg
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {(cardiacLoadMg / 100).toFixed(1)} mL stok ({activeCardiac.loadMgKg} mg/kg)
                  </span>
                </div>

                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500">İdame &amp; CPB Prime</span>
                  <div className="text-2xl font-black font-mono text-teal-600 dark:text-teal-400 mt-1 tabular-nums">
                    {activeCardiac.maintMgKgHr > 0 ? `${cardiacMaintMlHr.toFixed(1)} mL/sa` : 'Tek Bolus'}
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {activeCardiac.maintMgKgHr > 0
                      ? `${cardiacMaintMgHr} mg/sa · Prime: ${cardiacPrimeMg} mg`
                      : 'İdame & Prime yok (ATACAS)'}
                  </span>
                </div>

                <div className={`p-3 rounded-xl border col-span-2 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-amber-100'}`}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Tahmini Kümülatif Toplam Doz ({cpbHours} sa):
                    </span>
                    <span className="font-mono text-sm font-black text-slate-900 dark:text-white tabular-nums">
                      {cardiacCumulativeMg} mg ({cardiacCumulativeMgKg.toFixed(1)} mg/kg · {cardiacTotalAmp500} × 500 mg amp)
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  cardiacSeizureAlertLevel === 'high'
                    ? isDark
                      ? 'border-rose-500/60 bg-rose-950/35 text-rose-200'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
                    : cardiacSeizureAlertLevel === 'moderate'
                      ? isDark
                        ? 'border-amber-500/50 bg-amber-950/25 text-amber-200'
                        : 'border-amber-300 bg-amber-50 text-amber-900'
                      : isDark
                        ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200'
                        : 'border-emerald-200 bg-emerald-50 text-emerald-900'
                }`}
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <strong>
                      {cardiacSeizureAlertLevel === 'high'
                        ? 'YÜKSEK POSTOP NÖBET RİSKİ (≥80–100 mg/kg KÜMÜLATİF)!'
                        : cardiacSeizureAlertLevel === 'moderate'
                          ? 'ORTA-YÜKSEK POSTOP NÖBET UYARISI (≥50 mg/kg KÜMÜLATİF)'
                          : 'Düşük Nöbet Riski Profili (<50 mg/kg)'}
                    </strong>{' '}
                    Yüksek doz TXA beyin omurilik sıvısına geçerek <strong>GABA-A ve glisin reseptörlerini</strong>{' '}
                    bloke eder; özellikle açık kalp/kapak cerrahisi, yaş &gt;70 ve Cr &gt;1,36 mg/dL varlığında erken
                    YBÜ döneminde miyoklonus ve jeneralize nöbet tetikler. Gerekmedikçe kümülatif dozu ≤50 mg/kg altında
                    tutun.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RENAL DOZ AYARLAMA */}
        {activeTab === 'renal_adjust' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <label htmlFor={crSliderId} className="font-bold text-slate-700 dark:text-slate-200">
                    Serum Kreatinin (mg/dL)
                  </label>
                  <span className="font-mono text-sm font-black text-sky-600 dark:text-sky-400">
                    {serumCr.toFixed(2)} mg/dL ({Math.round(serumCr * 88.4)} µmol/L)
                  </span>
                </div>
                <input
                  id={crSliderId}
                  type="range"
                  min={0.6}
                  max={8.0}
                  step={0.1}
                  value={serumCr}
                  onChange={(e) => setSerumCr(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>0,6</span>
                  <span>1,36</span>
                  <span>2,83</span>
                  <span>5,66</span>
                  <span>8,0</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Cr ≤ 1,36 (Normal)', val: 1.0 },
                  { label: 'Cr 1,36–2,83 (eGFR 20–50)', val: 2.0 },
                  { label: 'Cr 2,83–5,66 (eGFR 10–20)', val: 3.8 },
                  { label: 'Cr > 5,66 (ESRD / HD)', val: 6.5 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSerumCr(preset.val)}
                    className={`p-2 rounded-xl border font-semibold cursor-pointer ${
                      isDark
                        ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-sky-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-sky-500'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  renalRec.tone === 'rose'
                    ? isDark
                      ? 'border-rose-500/50 bg-rose-950/25'
                      : 'border-rose-300 bg-rose-50'
                    : renalRec.tone === 'amber'
                      ? isDark
                        ? 'border-amber-500/40 bg-amber-950/20'
                        : 'border-amber-200 bg-amber-50/70'
                      : isDark
                        ? 'border-emerald-500/40 bg-emerald-950/20'
                        : 'border-emerald-200 bg-emerald-50/70'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  {renalRec.tierLabel}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Hesaplanan IV Doz ({weightKg} kg)</span>
                    <div className="text-2xl font-black font-mono text-sky-600 dark:text-sky-400 mt-1 tabular-nums">
                      {renalRec.calcMg} mg
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">
                      {(renalRec.calcMg / 100).toFixed(1)} mL stok ({Math.ceil(renalRec.calcMg / 500)} × 500 mg amp)
                    </span>
                  </div>
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <span className="text-[10px] font-bold uppercase text-slate-500">Dozlama Aralığı</span>
                    <div className="text-sm font-black text-slate-900 dark:text-white mt-1.5">
                      {renalRec.interval}
                    </div>
                    <span className="text-[11px] text-slate-500 block mt-1">{renalRec.infusionMod}</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                  <strong>Renal Klinik Not:</strong> {renalRec.note}
                </p>
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
            name: 'Transamine® / Herajit® / Tranex® 500 mg / 5 mL IV Ampul',
            presentation: 'Berrak, renksiz enjeksiyonluk çözelti içeren 5 mL cam ampul (kutu: genellikle 10 ampul)',
            concentration: '100 mg/mL (%10) — 1 Ampul = 500 mg',
            saltOrBaseNote:
              '1 g standart yükleme dozu = 2 adet 500 mg/5 mL ampul (10 mL). YALNIZCA İNTRAVENÖZ kullanım içindir; spinal/epidural tepsiye ASLA alınmaz!',
            alertLevel: 'high',
          },
          {
            name: 'Transamine® / Herajit® / Tranex® 250 mg / 2,5 mL IV Ampul',
            presentation: 'Berrak, renksiz enjeksiyonluk çözelti içeren 2,5 mL cam ampul',
            concentration: '100 mg/mL (%10) — 1 Ampul = 250 mg',
            saltOrBaseNote:
              'Aynı 100 mg/mL konsantrasyondadır; 1 g doz için 4 ampul (10 mL) gerekir. 250 mg vs 500 mg ampul karışmasına dikkat edin.',
            alertLevel: 'high',
          },
          {
            name: 'Transamine® / Tranex® 250 mg & 500 mg Film Tablet (Oral)',
            presentation: 'Oral film kaplı tablet / kapsül',
            concentration: '250 mg veya 500 mg / tablet',
            saltOrBaseNote:
              'Menoraji, mukozal kanama, herediter anjiyoödem veya dental çekim sonrası ağız gargarası/oral tedavi için kullanılır (tipik erişkin oral: 1000–1500 mg 8 saatte bir).',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart Erişkin 1 g Yükleme (Travma / PPH / POISE-3): 2 × 500 mg ampul (10 mL) + 100 mL %0,9 NaCl (veya %5 Dekstroz) → 10 dakikada IV infüzyon (100 mg/dk · 600 mL/sa).',
          '8 Saatlik Travma İdame İnfüzyonu (CRASH-2): 2 × 500 mg ampul (1000 mg) + 100 mL %0,9 NaCl → 12,5 mL/saat (125 mg/saat) 8 saat boyunca.',
          'Pediatrik / Kardiyak Pompa İnfüzyonu: 500 mg (5 mL) + 45 mL SF = 50 mL (10 mg/mL) veya 1000 mg (10 mL) + 40 mL SF = 50 mL (20 mg/mL).',
        ]}
        concentrationTrapWarning="WHO 2022 & ISMP Kritik LASA Uyarısı: 5 mL şeffaf Traneksamik Asit ampulleri ile 4 mL şeffaf Ağır Bupivakain (Marcaine® Heavy %0,5) ampulleri fiziksel olarak neredeyse ayırt edilemez! Kazara intratekal enjeksiyon >%50 ölümcüldür. TXA’yı mutlaka ayrı renkli kutuda, lokal anesteziklerden fiziksel olarak uzak alanda saklayın ve ameliyathanede önceden 100 mL SF içine hazırlanmış etiketli infüzyon torbası şeklinde kullanın."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="Periferik veya santral venöz yoldan güvenle uygulanabilir. Maksimum infüzyon hızı ≤100 mg/dk (≤1 mL/dk stok) olmalıdır; 100 mL SF içinde 10–15 dakikada infüzyon hipotansiyon ve venöz irritasyonu önler. KAN ÜRÜNLERİ (Eritrosit süspansiyonu, TDP, Trombosit) ile AYNI HATTAN ASLA VERİLMEZ!"
        phRange="6,5 – 8,0 (Fizyolojik pH’a Yakın)"
        osmolalityNote="Seyreltilmemiş 100 mg/mL ampul hiperozmolar (~700–750 mOsm/kg) olup 50–100 mL izotonik sıvıda seyreltildiğinde periferik ven için mükemmel tolere edilir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          'Ringer Laktat (RL) / Dengeli Elektrolit Çözeltileri',
          '%20 Fruktoz / Dekstran 40',
        ]}
        stabilityNote="Seyreltilmiş çözeltiler oda sıcaklığında tercihen hemen (en geç 24 saat içinde) kullanılmalıdır; koruyucu içermez."
        ySiteCompatible={[
          '%0,9 NaCl (SF)',
          '%5 Dekstroz',
          'Ringer Laktat',
          'Heparin (ayrı doğrulama ile)',
          'Oksitosin (ayrı flush tercih edilir)',
        ]}
        ySiteIncompatible={[
          'KAN ÜRÜNLERİ (Eritrosit Süspansiyonu, TDP, Trombosit, Tam Kan — KESİNLİKLE AYRI HAT!)',
          'Penisilin Grubu Antibiyotikler (Benzilpenisilin, Ampisilin vb.)',
          'Ürokinaz / Alteplaz (farmakolojik antagonizma)',
          'Yüksek doz Diazepam / Dipiridamol',
        ]}
        extravasationProtocol="pH 6,5–8,0 olduğundan vezikan değildir; ancak hiperozmolar stok çözelti ekstravaze olursa infüzyonu durdurun, ekstremiteyi eleve edin ve soğuk/ılık konfor kompresi uygulayın. Kazara intratekal/epidural enjeksiyon şüphesinde DERHAL BOS drenajı/lavajı ve nöbet/havayolu protokolünü başlatın!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="KRİTİK RENAL AYARLAMA ZORUNLU! İlacın %95’i değişmeden glomerüler filtrasyonla atılır; serum kreatinin >1,36 mg/dL (eGFR <50 mL/dk) durumunda idame dozu ve sıklığı mutlaka azaltılmalıdır."
        renalDetails={[
          'Cr 1,36–2,83 mg/dL (eGFR 20–50 mL/dk): 10 mg/kg IV q12sa (veya kardiyak/sürekli infüzyon idame hızını %50 azaltın).',
          'Cr 2,83–5,66 mg/dL (eGFR 10–20 mL/dk): 10 mg/kg IV q24sa (sürekli infüzyon hızını %75 azaltın veya tek yükleme dozuyla sınırlayın).',
          'Cr > 5,66 mg/dL (eGFR <10 mL/dk / Hemodiyaliz): 5 mg/kg IV q24sa veya 10 mg/kg IV q48sa. Akut travma/PPH’de ilk 1 g hayat kurtarıcı yükleme dozu genellikle tam verilir, ancak 8 saatlik idame infüzyonu kısıtlanır veya iptal edilir.',
          'Nöbet & Pıhtı Uyarısı: KBY’de plazma ve BOS birikimi nöbet eşiğini dramatik düşürür; üst üriner sistem hematürisinde üreter pıhtı obstrüksiyonu riski nedeniyle kontrendikedir.',
        ]}
        hepaticSummary="Karaciğerde <%5 metabolize olur; izole karaciğer yetmezliğinde (Child-Pugh A/B/C) farmakokinetik doz ayarlaması gerekmez!"
        hepaticDetails={[
          'Karaciğer Transplantasyonu & Siroz: Hiperfibrinolizin sık görüldüğü karaciğer nakli ve majör hepatektomilerde standart veya ROTEM/TEG güdümlü TXA rejimleri güvenle kullanılabilir.',
          'Kombine Hepatorenal Sendrom: Sirozlu hastada eşlik eden böbrek disfonksiyonu varsa (Cr düşük kas kütlesi nedeniyle gerçek GFR’yi maskeleyebilir!) renal klirense göre dikkatli doz ayarlaması yapılmalıdır.',
        ]}
        {...STANDALONE_ORGAN_PART2['tranexamic-acid']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="eGFR’ye Göre Doz Azalt · Nöbet & VTE İzlemi"
        geriatricPoints={[
          'Gizli Böbrek Fonksiyon Kaybı: >70 yaş hastalarda normal görünen serum kreatinin değerine rağmen gerçek eGFR <50 mL/dk olabilir; özellikle kardiyak cerrahide ve tekrarlayan dozlarda eGFR (CKD-EPI) üzerinden doz azaltımı yapılmalıdır.',
          'Artmış Postoperatif Nöbet & Tromboz Duyarlılığı: İleri yaş, açık kalp cerrahisi sonrası TXA ilişkili nöbet için bağımsız risk faktörüdür; düşük-orta doz protokoller (<50 mg/kg kümülatif) tercih edilmelidir.',
        ]}
        obesityWeightScalarBadge="Sabit 1 g (Travma/POISE-3) · kg-Bazlıda IBW / LBW"
        obesityPoints={[
          'Hidrofilik Dağılım (Vd 9–12 L): Traneksamik asit yağ dokusuna çok az dağılır. Travma, PPH ve POISE-3 non-kardiyak cerrahide standart 1 g sabit dozlar obezlerde de genellikle yeterlidir.',
          'Kardiyak & kg-Bazlı Protokollerde Skaler: Morbid obezlerde (BMI ≥35–40 kg/m²) TBW üzerinden 30–50 mg/kg hesaplanması toksik plazma/BOS düzeylerine ve nöbetlere yol açar; IBW veya LBW kullanın ve tek yüklemeyi pratikte çoğu vakada 2–3 g tavanı ile denetleyin.',
        ]}
        clinicalNote="Yaşlı, obez ve böbrek fonksiyonu sınırda bir kardiyak cerrahi hastasında yüksek doz BART rejimi yerine düşük-orta doz (10 mg/kg + 1 mg/kg/sa) seçmek postoperatif nöbet riskini dramatik biçimde azaltır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. GEBELİK & LAKTASYON (#sec-gebelik)                              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Plasentayı geçer (kord kanı ≈ maternal düzey); ancak teratojenite kanıtı yoktur ve Postpartum Hemorajide (WOMAN) hayat kurtarıcı 1. basamak adjuvandır."
        pregnancyDetails={[
          'Postpartum Hemoraji (WOMAN Trial & WHO): Vajinal doğum veya sezaryen sonrası kanamada ilk 3 saat içinde 1 g IV (10 dk’da; sürerse +1 g) maternal kanama mortalitesini %31 azaltır ve tromboemboliyi artırmaz.',
          'Sezaryen Profilaksisi (TRAAP2 / MFMU): Yüksek kanama riskli sezaryenlerde (plasenta previa/akreata spektrumu) fayda-zarar gözetilerek kord klemplendikten sonra (veya insizyon öncesi) 1 g IV uygulanabilir; rutin düşük riskli sezaryenlerde endikasyon bireyselleştirilir.',
          'Antepartum Kullanım: Gebelik fizyolojik olarak hiperkoagülabl olduğundan antepartum dönemde yalnızca belirgin kanama endikasyonunda ve tromboz riski tartılarak kullanılmalıdır.',
        ]}
        lactationSummary="Anne sütüne çok düşük oranda (~%1 maternal plazma konsantrasyonu) geçer; emzirme ile tamamen uyumludur!"
        lactationDetails={[
          'Klinik Güvenlik: Anne sütündeki TXA miktarı yenidoğan için farmakolojik olarak ihmal edilebilir düzeydedir (LactMed / WHO uyumlu); PPH sonrası TXA alan anneler emzirmeye ara vermeden devam edebilir.',
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
            title: 'Doz-Bağımlı Konvülsiyon & Miyoklonus',
            incidenceOrSeverity: 'Kardiyak >50–100 mg/kg · %0,7–4',
            detail:
              'BOS’a geçerek inhibitör GABA-A ve glisin reseptörlerini antagonize eder. Özellikle açık kalp/kapak cerrahisi, yaşlılık, yüksek kümülatif doz ve böbrek yetmezliğinde postop ilk 24 saatte nöbet tetikler.',
            tone: 'rose',
          },
          {
            title: 'Hızlı IV Enjeksiyona Bağlı Hipotansiyon',
            incidenceOrSeverity: '>100 mg/dk Hızlı Puşe',
            detail:
              '1 g dozun 10 dakikadan hızlı (>100 mg/dk) puşe edilmesi geçici fakat belirgin sistemik hipotansiyon, baş dönmesi ve bulantı oluşturabilir. Daima yavaş infüzyonla uygulanmalıdır.',
            tone: 'amber',
          },
          {
            title: 'Tromboembolik Olaylar (DVT / PE / Arteriyel)',
            incidenceOrSeverity: 'HALT-IT’te ↑ · Travma/PPH’de Nötr',
            detail:
              'Büyük RCT’lerde (CRASH-2, WOMAN, POISE-3) uygun endikasyonda VTE artışı saptanmamışsa da aktif tromboz, GİS kanaması (HALT-IT) veya PCC/östrojen kombinasyonunda risk artar.',
            tone: 'indigo',
          },
          {
            title: 'Görsel Bozukluklar & GİS Şikayetleri',
            incidenceOrSeverity: 'Nadir / Geri Dönüşümlü',
            detail:
              'Bulantı, kusma, diyare görülebilir. Nadiren renkli görme bozukluğu (kromotopsi) veya retinal vasküler oklüzyon bildirilmiştir; görsel semptom gelişirse ilaç derhal kesilmelidir.',
            tone: 'teal',
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
            title: 'Kazara İntratekal Enjeksiyon — Ameliyathane Sistem Bariyeri',
            detail:
              'WHO (2022) ve ISMP uyarılarına göre dünya genelinde en ölümcül anestezi LASA kazalarından biridir. TXA ampulleri kesinlikle rejyonal anestezi masasına konmamalı, yalnızca 100 mL SF hazır mini-torba formunda ameliyathanede bulundurulmalıdır.',
          },
          {
            title: 'Fibrinolitik Kapatma (Fibrinolysis Shutdown) & >3 Saat Paradoksu',
            detail:
              'Majör travmadan saatler sonra bazı hastalarda fizyolojik fibrinoliz baskılanır ("fibrinolysis shutdown"). 3 saatten geç TXA verilmesi pıhtı dengesini bozarak mortaliteyi artırabilir; geç dönemde yalnızca ROTEM (EXTEM/APTEM) veya TEG (LY30 >%3) ile hiperfibrinoliz doğrulanırsa uygulanmalıdır.',
          },
          {
            title: 'GİS Kanamasında HALT-IT Sonucu (Lancet 2020)',
            detail:
              '12.009 hastayı içeren HALT-IT çalışmasında yüksek doz (1 g + 3 g/24 sa) TXA akut gastrointestinal kanamada 5 günlük kanama mortalitesini azaltmamış, VTE (RR 1,85) ve nöbet (RR 1,73) riskini artırmıştır — GİS kanamasında rutin kullanmayın.',
          },
          {
            title: 'Topikal / İnhale / Lokal Hemostaz Kullanımları',
            detail:
              'Epistaksiste 500 mg TXA emdirilmiş tampon, dental kanamalarda %5 TXA gargara, hemoptizide nebülize 500 mg TXA (q8sa) ve eklem artroplastisinde 1–3 g intra-artiküler uygulama sistemik emilimi minimal tutarak etkin lokal hemostaz sağlar.',
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
          title: 'Plazminojen Kringle Lizin Cepleri & Hedef Dışı GABA-A / Glisin Reseptör Antagonizması',
          summary:
            'Traneksamik asit hem hemostaz kaskadında hem de (yüksek santral konsantrasyonlarda) nöronal inhibitör iyon kanallarında spesifik moleküler bağlanma gösterir:',
          points: [
            'Plazminojen Kringle-1 (Yüksek Afiniteli, Kd ~1,1 µM) & Kringle-4 Bağlanması: Plazminojen, 5 adet kringle alanından özellikle K1 ve K4’teki lizin bağlanma cepleriyle fibrin üzerindeki C-terminal lizin kalıntılarına tutunur. TXA bu ceplere yarışmalı olarak bağlanıp konformasyonel değişim yaratarak plazminojen–fibrin–tPA üçlü kompleksinin oluşumunu engeller.',
            'Yüksek Konsantrasyonda Direkt Plazmin İnhibisyonu: Çok yüksek lokal/topikal konsantrasyonlarda oluşmuş plazminin fibrin üzerindeki proteolitik aktivitesini de kısmen baskılar.',
            'Hedef Dışı SSS Bağlanması (GABA-A & Glisin Reseptörü): TXA, yapısal olarak GABA ve glisine benzeyen bir zwitteriyonik aminoasit analoğudur; kompetitif GABA-A (IC50 ~1–7 mM) ve özellikle spinal/beyin sapı glisin reseptör (IC50 ~1 mM) antagonizması yaparak Cl⁻ akımını keser!',
          ],
        }}
        intracellularSignaling={{
          title: 'Fibrin Ağı Koruması, Plazmin-Kompleman Ekseni & Nöronal Cl⁻ Hiper-Eksitabilite Kaskadı',
          summary:
            'Moleküler bağlanmanın ötesinde hemostatik matriks, inflamatuar hücreler ve nöronal membranlarda üç temel biyokimyasal süreç devreye girer:',
          points: [
            'Fibrin Polimer Stabilitesi & D-Dimer Baskılanması: tPA, fibrin yüzeyine bağlı olmayan serbest plazminojeni çok zayıf aktive eder. TXA plazminojeni fibrinden ayırdığı için plazmin üretimi ve çapraz bağlı fibrin yıkım ürünleri (D-dimer / FDP) keskin biçimde düşer; pıhtı mekanik direncini korur.',
            'Plazmin Aracılı İnflamasyon & Trombosit Koruması: Serbest plazmin, trombosit yüzeyindeki GPIb ve GPIIb/IIIa reseptörlerini proteolize uğratarak trombosit disfonksiyonuna yol açar ve C3/C5 kompleman ile PAR-1 (protease-activated receptor-1) aktivasyonu yapar. TXA, CPB sırasında trombosit yüzey reseptör bütünlüğünü dolaylı olarak korur.',
            'Nöronal İnhibisyon Kaybı (Disinhibisyon): BOS’ta yüksek konsantrasyona ulaşan TXA, postsinaptik GABA-A ve glisin kapılı Cl⁻ kanallarının açılmasını bloke eder; inhibitör postsinaptik potansiyeller (IPSP) çöker, eksitatör glutamaterjik ağ kontrolsüz ateşlenerek miyoklonus ve refrakter status epileptikusu tetikler.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Endotel, Fibrin Pıhtısı & Trombositler → Hemostaz & Mikrovasküler Bütünlük',
            tissueTarget: 'Fibrin Matriksi · Plazminojen · Trombosit GPIb',
            accent: 'rose',
            points: [
              'Travma, postpartum uterus yatağı ve CPB’de artan endotelyal tPA salınımının tetiklediği hiperfibrinolizi hızla söndürerek cerrahi ve travmatik kan kaybını %25–35 azaltır.',
              'Trombin jenerasyonunu doğrudan artırmaz; fizyolojik koagülasyon kaskadının ürettiği pıhtının erken yıkılmasını önler.',
            ],
          },
          {
            systemTitle: 'Serebral Korteks & Spinal Kord → SSS Eksitabilite & Nöbet Dinamiği',
            tissueTarget: 'Kortikal GABA-A · Spinal Glisin Reseptörleri · BOS',
            accent: 'indigo',
            points: [
              'Normal kan-beyin bariyerinde BOS/plazma oranı ~%10’dur; ancak CPB inflamasyonu, açık kalp hava mikroembolisi veya yaşlanma KBB geçirgenliğini artırarak santral toksisite eşiğini düşürür.',
              'Kazara intratekal enjeksiyonda doğrudan spinal glisin reseptör blokajı saniyeler-dakikalar içinde şiddetli bel/bacak ağrısı, alt ekstremite miyoklonusu, sempatik fırtına ve polimorfik VT/VF oluşturur.',
            ],
          },
          {
            systemTitle: 'Böbrek Glomerülü & Üriner Toplayıcı Sistem → Klirens & Üreteral Pıhtı Riski',
            tissueTarget: 'Glomerüler Filtrasyon · Üreter Lümeni',
            accent: 'sky',
            points: [
              'İdrarda çok yüksek konsantrasyonlara ulaşır (%95 değişmeden atılım); bu nedenle mesane/prostat/böbrek kaynaklı hematüride ürokinaz aracılı fizyolojik pıhtı erimesini engelleyip üreter tıkanıklığı yapabilir.',
              'GFR azaldığında doğrusal klirens kaybı plazma ve BOS yarı ömrünü saatlerden günlere uzatır.',
            ],
          },
          {
            systemTitle: 'Kardiyovasküler Sistem & İmmün Yanıt → Hemodinami & İnflamasyon',
            tissueTarget: 'Periferik Vasküler Tonus · Kompleman / Monosit',
            accent: 'teal',
            points: [
              'Yavaş infüzyonda hemodinamik açıdan nötrdür; yalnızca >100 mg/dk hızlı boluslarda geçici vazodilatasyon/hipotansiyon oluşturabilir.',
              'CPB sonrası plazmin kaynaklı sitokin ve kompleman aktivasyonunu azaltarak vazoplejiyi kısmen hafifletebilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Fibrinoliz İnhibisyon Tavanı (10–15 mcg/mL), Doz-Nöbet Eğrisi & Sinerji',
          summary:
            'Traneksamik asitte antifibrinolitik etkinlik düşük-orta plazma düzeylerinde platoya ulaşırken, nörotoksisite dozla dik biçimde artar:',
          points: [
            'Hemostatik Tavan Etkisi (~10–15 mcg/mL): Plazmada 10–15 mcg/mL konsantrasyon hiperfibrinolizin ~%80’ini, 100 mcg/mL ise neredeyse %100’ünü bloke eder. 50–100 mg/kg üzerindeki kümülatif kardiyak dozlar ek kanama azalması sağlamadan yalnızca nöbet riskini katlar!',
            'Protrombotik Sinerji: Protrombin Kompleks Konsantresi (PCC), aktive faktör VII (rFVIIa), Faktör IX kompleksleri veya östrojen içeren preparatlarla birlikte kullanıldığında tromboembolik risk aditif/sinerjistik olarak yükselir.',
            'Genel Anestezikler & Gecikmiş Nöbet Maskelemesi: İntraoperatif propofol ve volatil anestezikler (GABA-A agonistleri) TXA’nın nöbet etkisini ameliyat sırasında maskeler; nöbetler tipik olarak YBÜ’de sedasyon kesilip ekstübasyon yaklaştığında (postop 2–12. saatlerde) ortaya çıkar!',
          ],
        }}
        clinicalPearls={[
          'Neden TXA Nöbetleri Genellikle YBÜ’de Sedasyon Azaltılırken Başlar? Hem BOS pikinin plazmadan saatler sonra gelmesi hem de ameliyathanedeki propofol/sevofluranın GABA-A üzerinden nöbeti geçici olarak maskelemesi nedeniyle TXA nöbetleri en sık postop 2–12. saatlerde görülür!',
          'İntratekal TXA Şüphesinde İlk 60 Saniye: Spinal enjeksiyondan hemen sonra hastada şiddetli sırt/kalça/bacak ağrısı ve miyoklonik sıçramalar başlarsa asla "lokal anestezik irritasyonu" deyip beklemeyin; hemen ampulü kontrol edin ve doğrulandığı anda BOS drenajı/lavajı + propofol + erken entübasyon başlatın!',
          'ROTEM / TEG Rehberliğinde Akılcı Kullanım: EXTEM’de ML >%15 ve APTEM’de düzelme görülmesi hiperfibrinolizin objektif kanıtıdır; özellikle >3 saat geçmiş travma veya karaciğer naklinde gereksiz/zararlı TXA kullanımını önler.',
          'İdrar Rengine Dikkat: Makroskopik üst üriner sistem hematürisi olan hastada TXA başlamadan önce kanama kaynağını (renal parankim vs mesane) sorgulayın; renal kaynaklı hematüride üreteral pıhtı tıkanıklığı gelişebilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. ŞİDDET DERECELİ ETKİLEŞİMLER & KAYNAKÇA (#sec-kaynaklar)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Traneksamik Asit"
        drugsComUrl="https://www.drugs.com/drug-interactions/tranexamic-acid.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Aktive Protrombin Kompleks Konsantresi (aPCC / FEIBA) & Faktör IX Kompleks Konsantreleri',
            mechanism: 'Eşzamanlı Pıhtı Oluşumu (Trombin ↑) + Fibrinoliz Blokajı → Yüksek Tromboz Sinerjisi',
            clinicalEffect:
              'Ağır venöz ve arteriyel tromboemboli, miyokard enfarktüsü, pulmoner emboli ve DİK riskini dramatik biçimde artırır.',
            management:
              'aPCC (FEIBA) ile eşzamanlı kullanımdan kaçının (en az 6–12 saat ara verin); zorunlu hallerde yalnızca hematoloji konsültasyonu ile yakın tromboz izlemi altında değerlendirin.',
          },
          {
            severity: 'X',
            agent: 'Trombolitikler (Alteplaz / tPA, Tenekteplaz, Streptokinaz) & Aynı Hattan Kan Ürünleri',
            mechanism: 'Doğrudan Farmakolojik Antagonizma (Plazminojen Blokajı) / Fizikokimyasal Hat Uyumsuzluğu',
            clinicalEffect:
              'Trombolitik ajanların pıhtı eritici etkisini tamamen ortadan kaldırır; kan ürünleriyle aynı hattan verildiğinde pıhtılaşma/uyumsuzluk riski doğurur.',
            management:
              'Trombolitiklerle yalnızca hayatı tehdit eden trombolitik kanama kurtarmasında uygulanır; kan ürünleri (ES, TDP, Trombosit) ve penisilinler için daima ayrı IV lümen kullanın.',
          },
          {
            severity: 'D',
            agent: 'Östrojen İçeren Kombine Hormonal Kontraseptifler & Hormon Replasman Tedavisi',
            mechanism: 'Koagülasyon Faktör Artışı + Antifibrinolitik Etki (Protrombotik Sinerji)',
            clinicalEffect:
              'Derin ven trombozu, pulmoner emboli, iskemik inme ve miyokard enfarktüsü riskini anlamlı biçimde artırır.',
            management:
              'Elektif/kronik oral kullanımda (ör. menoraji) östrojen içeren kombine kontraseptiflerle birlikte önerilmez; acil majör kanamada fayda-zarar gözetilerek kısa süreli kullanılır.',
          },
          {
            severity: 'D',
            agent: 'All-Trans Retinoik Asit (ATRA / Tretinoin — Akut Promiyelositik Lösemi)',
            mechanism: 'APL’de İntravasküler Koagülasyon Aktivasyonu + Fibrinoliz İnhibisyonu',
            clinicalEffect:
              'ATRA tedavisi alan akut promiyelositik lösemi hastalarında fatal yaygın mikrovasküler tromboz olguları bildirilmiştir.',
            management:
              'ATRA ile kombine kullanımdan kaçının; kanama yönetiminde trombosit/fibrinojen replasmanını önceliklendirin.',
          },
          {
            severity: 'C',
            agent: 'Nöbet Eşiğini Düşüren İlaçlar (Karbapenemler, Yüksek Doz Penisilin, Sefepim, Tramadol)',
            mechanism: 'Sinerjistik GABA-A Reseptör Antagonizması (Özellikle Böbrek Yetmezliğinde)',
            clinicalEffect:
              'Yüksek doz kardiyak TXA veya renal yetmezlik varlığında postoperatif jeneralize nöbet ve miyoklonus riskini ek olarak artırır.',
            management:
              'KBY ve kardiyak cerrahi hastalarında TXA dozunu sınırlayın, eşzamanlı yüksek doz sefepim/imipenem birikiminden kaçının.',
          },
        ]}
        references={[
          {
            authors: 'CRASH-2 Trial Collaborators (Shakur H, Roberts I, Bautista R, et al.)',
            title: 'Effects of tranexamic acid on death, vascular occlusive events, and blood transfusion in trauma patients with significant haemorrhage (CRASH-2): a randomised, placebo-controlled trial',
            journal: 'The Lancet',
            year: 2010,
            note: 'n=20.211; ilk 3 saatte 1 g yükleme + 1 g/8 sa infüzyon tüm nedenlere bağlı ve kanama mortalitesini anlamlı azaltırken >3 saat sonrası mortalite artışı göstermiştir.',
          },
          {
            authors: 'WOMAN Trial Collaborators',
            title: 'Effect of early tranexamic acid administration on mortality, hysterectomy, and other morbidities in women with post-partum haemorrhage (WOMAN): an international, randomised, double-blind, placebo-controlled trial',
            journal: 'The Lancet',
            year: 2017,
            note: 'n=20.060; doğumdan ilk 3 saat içinde 1 g IV (+ sürerse 2. doz 1 g) kanama kaynaklı maternal ölümü %31 azaltmış, tromboemboliyi artırmamıştır.',
          },
          {
            authors: 'CRASH-3 Trial Collaborators',
            title: 'Effects of tranexamic acid on death, disability, vascular occlusive events and other morbidities in patients with acute traumatic brain injury (CRASH-3): a randomised, placebo-controlled trial',
            journal: 'The Lancet',
            year: 2019,
            note: 'İlk 3 saat içinde uygulanan TXA, hafif-orta şiddette TBH hastalarında kafa travması ilişkili mortaliteyi anlamlı biçimde azaltmıştır.',
          },
          {
            authors: 'Devereaux PJ, Marcucci M, Painter TW, et al. (POISE-3 Investigators)',
            title: 'Tranexamic Acid in Patients Undergoing Noncardiac Surgery (POISE-3)',
            journal: 'New England Journal of Medicine',
            year: 2022,
            note: 'n=9.535; insizyon öncesi 1 g + kapanışta 1 g IV rejimi majör/hayatı tehdit eden kanamayı anlamlı azaltmış ve kardiyovasküler güvenlik sınırına yakın profil göstermiştir.',
          },
          {
            authors: 'Myles PS, Smith JA, Forbes A, et al. (ATACAS Investigators)',
            title: 'Tranexamic Acid in Patients Undergoing Coronary-Artery Surgery (ATACAS)',
            journal: 'New England Journal of Medicine',
            year: 2017,
            note: 'n=4.631; kardiyak cerrahide kanama ve reoperasyonu azaltırken doz-bağımlı postoperatif nöbet riskini (%0,7 vs %0,1) ortaya koymuştur.',
          },
          {
            authors: 'HALT-IT Trial Collaborators',
            title: 'Effects of a high-dose 24-h infusion of tranexamic acid on death and thromboembolic events in patients with acute gastrointestinal bleeding (HALT-IT)',
            journal: 'The Lancet',
            year: 2020,
            note: 'Akut GİS kanamasında mortalite faydası göstermemiş, VTE ve nöbet riskini artırmıştır — GİS kanamasında rutin TXA kullanılmaması için temel kanıttır.',
          },
          {
            authors: 'World Health Organization (WHO) & ISMP',
            title: 'Risk of medication errors with tranexamic acid injection resulting in inadvertent intrathecal injection (Medical Product Alert)',
            journal: 'WHO / ISMP Safety Alert',
            year: 2022,
            note: 'Bupivakain/lokal anestezik ampulleriyle LASA karışmasına bağlı ölümcül intratekal TXA enjeksiyonları için küresel güvenlik uyarısı ve depolama önlemleri.',
          },
        ]}
      />
    </div>
  );
};
