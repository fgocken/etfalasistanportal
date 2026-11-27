import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Calculator,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  GitCompare,
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

interface FondaparinuxProtocolProps {
  isDark: boolean;
}

type CalcTab = 'dosing' | 'neuraxial' | 'bleeding' | 'compare';
type IndicationKey = 'vte_prophylaxis' | 'vte_treatment' | 'nste_acs' | 'svt_calisto' | 'hit_ash';
type RenalBand = 'normal' | 'moderate_30_49' | 'severe_lt30';
type NeuraxialRegimen = 'prophylactic' | 'therapeutic';

export const FondaparinuxProtocol: React.FC<FondaparinuxProtocolProps> = ({ isDark }) => {
  const [admeOpen, setAdmeOpen] = useMonographAccordion('fonda-pk', false);
  const [activeTab, setActiveTab] = useState<CalcTab>('dosing');

  // Tab 1: Doz & Enjektör Hesaplayıcı
  const [weightKg, setWeightKg] = useState<number>(75);
  const [indication, setIndication] = useState<IndicationKey>('vte_prophylaxis');
  const [renalBand, setRenalBand] = useState<RenalBand>('normal');
  const [pciPlanned, setPciPlanned] = useState<boolean>(false);

  // Tab 2: Nöraksiyel Zamanlayıcı
  const [neuraxialRegimen, setNeuraxialRegimen] = useState<NeuraxialRegimen>('prophylactic');
  const [hoursSinceLastDose, setHoursSinceLastDose] = useState<number>(24);

  const quickNavItems = [
    { id: 'fonda-high-alert', label: 'High-Alert' },
    { id: 'fonda-summary', label: 'Özet' },
    { id: 'fonda-moa', label: 'Etki Mekanizması' },
    { id: 'fonda-pk', label: 'ADME' },
    { id: 'fonda-contra', label: 'Kontrendikasyon' },
    { id: 'fonda-indications', label: 'Endikasyon & Doz' },
    { id: 'fonda-calc', label: 'Hesaplayıcı' },
    { id: 'fonda-tr', label: 'TR Preparat' },
    { id: 'fonda-line', label: 'Uygulama' },
    { id: 'fonda-organ', label: 'Böbrek / KC' },
    { id: 'fonda-geriatrics', label: 'Geriatri / Obezite' },
    { id: 'fonda-preg', label: 'Gebelik' },
    { id: 'fonda-adverse', label: 'Yan Etkiler' },
    { id: 'fonda-cautions', label: 'Özel Durumlar' },
    { id: 'fonda-deep-pd', label: 'Derin PD' },
    { id: 'fonda-refs', label: 'Etkileşim & Kaynak' },
  ];

  // Tab 1 Hesaplaması
  const doseCalc = useMemo(() => {
    const w = Math.max(25, Math.min(220, weightKg || 75));
    const isRenalBlocked = renalBand === 'severe_lt30';
    const isUnder50Kg = w < 50;

    if (isRenalBlocked) {
      return {
        blocked: true,
        doseLabel: 'MUTLAK KONTRENDİKE (CrCl <30 mL/dk)',
        syringeText: 'Fondaparinuks VERMEYİN → Standart Heparin (UFH) seçin!',
        scheduleText: 'UYGULAMAYIN',
        warningText:
          'Fondaparinuks %100’e yakın böbrekten değişmeden atılır (t½ 17–21 sa) ve CrCl <30 mL/dk’da FATAL birikime yol açar. Hemodiyaliz yalnızca ~%20 temizler, Protamin %0 etkisizdir → UFH tercih edin!',
        pciUfhText: null as string | null,
      };
    }

    if (indication === 'vte_prophylaxis') {
      if (isUnder50Kg) {
        return {
          blocked: true,
          doseLabel: 'KONTRENDİKE (Cerrahi Profilaksi · <50 kg)',
          syringeText: 'FDA: <50 kg cerrahi VTE profilaksisinde KULLANMAYIN (Ağır Kanama Riski)!',
          scheduleText: 'Alternatif: Enoksaparin 20 mg SC veya UFH 5.000 IU SC',
          warningText:
            '<50 kg hastalarda Fondaparinuks klirensi ~%30 düşer ve majör cerrahi kanama riski anlamlı artar (FDA kontrendikasyon). İlk doz postop ≥6–8 saat kuralı unutulmamalıdır.',
          pciUfhText: null,
        };
      }
      return {
        blocked: false,
        doseLabel: renalBand === 'moderate_30_49' ? '2,5 mg SC q24sa (ÇOK DİKKAT · EMA: 1,5 mg varsa)' : '2,5 mg SC q24sa',
        syringeText: '1 × Arixtra® 2,5 mg / 0,5 mL Hazır Enjektör (Mavi piston)',
        scheduleText: 'Post-op hemostaz sonrası EN ERKEN 6–8. saatte başla (ASLA pre-op değil!), ardından q24sa',
        warningText:
          renalBand === 'moderate_30_49'
            ? 'CrCl 30–49 mL/dk’da klirens ~%40 düşer! EMA KÜB 1,5 mg/gün seçeneği tanır; TR’de 1,5 mg yoksa 2,5 mg verirken yakın Cr/Hb izlemi yapın veya alternatif düşünün.'
            : 'KRİTİK ZAMANLAMA: İlk doz cerrahi kapanış ve hemostazdan <6 saat önce verilirse majör cerrahi kanama belirgin artar! Ortopedide (kalça kırığı) 28–35 güne uzatılır.',
        pciUfhText: null,
      };
    }

    if (indication === 'nste_acs') {
      const ufhStd = Math.round(w * 75);
      const ufhLow = Math.round(w * 70);
      const ufhHigh = Math.round(w * 85);
      return {
        blocked: false,
        doseLabel: '2,5 mg SC q24sa (OASIS-5 / ESC 2023 Sınıf I)',
        syringeText: '1 × Arixtra® 2,5 mg / 0,5 mL Hazır Enjektör',
        scheduleText: 'Günde 1 kez SC (Taburculuğa veya PKG’ye kadar, maks 8 gün)',
        warningText:
          renalBand === 'moderate_30_49'
            ? 'CrCl 30–49 mL/dk’da kanama riski artar; böbrek fonksiyonunu günlük izleyin. STEMI Primer PKG’de KONTRENDİKEDİR (OASIS-6)!'
            : 'OASIS-5 (NEJM 2006): NSTE-AKS’de Enoksaparine göre majör kanamayı %48 azalttı ve 30 günlük mortaliteyi düşürdü. Ancak STEMI Primer PKG’de YASAKTIR!',
        pciUfhText: pciPlanned
          ? `PKG ZORUNLU EK BOLUS (ESC 2023 Sınıf I): Rehber kateter trombozunu önlemek için PKG sırasında TEK TAM DOZ IV Standart Heparin (UFH) bolusu 70–85 IU/kg → ${ufhLow.toLocaleString('tr-TR')}–${ufhHigh.toLocaleString('tr-TR')} IU (hedef ~${ufhStd.toLocaleString('tr-TR')} IU; GPIIb/IIIa varsa 50–60 IU/kg) VERİN!`
          : 'Hasta PKG’ye (anjiyo/stent) alınacaksa kateter trombozunu önlemek için işlem anında tam doz IV UFH (70–85 IU/kg) eklenmesi ZORUNLUDUR!',
      };
    }

    if (indication === 'svt_calisto') {
      return {
        blocked: false,
        doseLabel: '2,5 mg SC q24sa × 45 Gün (CALISTO)',
        syringeText: '1 × Arixtra® 2,5 mg / 0,5 mL Hazır Enjektör',
        scheduleText: 'Günde 1 kez SC · Toplam 45 gün süreyle',
        warningText:
          'CALISTO (NEJM 2010): Alt ekstremite ≥5 cm yüzeyel ven trombozunda (safenofemoral bileşkeye >3 cm mesafede) DVT/PE progresyonunu %85 azalttı! Bileşkeye ≤3 cm ise tam terapötik DVT dozu gerekir.',
        pciUfhText: null,
      };
    }

    // VTE Tedavisi (DVT / PE) veya HIT (ASH 2018 Off-Label) — Kilo Basamaklı!
    let txDoseMg = 7.5;
    let syringe = '1 × Arixtra® 7,5 mg / 0,6 mL Hazır Enjektör (Mor/Eflatun piston)';
    if (w < 50) {
      txDoseMg = 5;
      syringe = '5 mg / 0,4 mL Hazır Enjektör (TR’de 5 mg yoksa 2 × 2,5 mg eşdeğeri değerlendirilir; kesin doğrulama yapın!)';
    } else if (w > 100) {
      txDoseMg = 10;
      syringe = '10 mg / 0,8 mL Hazır Enjektör (TR’de 10 mg yoksa 7,5 mg + 2,5 mg kombinasyonu yalnızca eczane/hematoloji onayıyla)';
    }

    const isHit = indication === 'hit_ash';
    return {
      blocked: false,
      doseLabel: `${txDoseMg.toString().replace('.', ',')} mg SC q24sa (${isHit ? 'HIT · ASH 2018' : 'Akut DVT / PE'})`,
      syringeText: syringe,
      scheduleText: isHit
        ? 'Günde 1 kez SC (Trombosit ≥150.000/µL olana kadar + VKA/DOAC geçişi · CrCl ≥30 şart!)'
        : 'Günde 1 kez SC (En az 5 gün ve Warfarin INR ≥2,0 arka arkaya 2 gün olana dek)',
      warningText:
        renalBand === 'moderate_30_49'
          ? 'UYARI (CrCl 30–49 mL/dk): Terapötik 5–10 mg dozlarda 17–21 saatlik yarı ömürle belirgin birikim/kanama riski oluşur! Dalgalı böbrekte UFH veya Argatroban (HIT’te) çok daha güvenlidir.'
          : isHit
            ? 'ASH 2018 HIT Kılavuzu: Fondaparinuks anti-PF4/heparin antikorlarıyla çapraz reaksiyon VERMEZ! Stabil, kanaması olmayan ve CrCl ≥30 mL/dk HIT hastalarında yaygın non-heparin seçenektir (kritik/instabil veya ABH’li HIT’te IV Argatroban/Bivalirudin seçin).'
            : 'Matisse-DVT & Matisse-PE: Kilo basamaklı (<50 kg: 5 mg · 50–100 kg: 7,5 mg · >100 kg: 10 mg) günde TEK doz, UFH/Enoksaparin ile eşdeğer etkinlik!',
      pciUfhText: null,
    };
  }, [weightKg, indication, renalBand, pciPlanned]);

  // Tab 2 Nöraksiyel Hesaplaması
  const neuraxialCalc = useMemo(() => {
    const minWait = neuraxialRegimen === 'prophylactic' ? 36 : 72;
    const idealWait = neuraxialRegimen === 'prophylactic' ? 42 : 96;
    const isSafe = hoursSinceLastDose >= minWait;
    const isOptimal = hoursSinceLastDose >= idealWait;
    const remainingMin = Math.max(0, minWait - hoursSinceLastDose);
    return {
      minWait,
      idealWait,
      isSafe,
      isOptimal,
      remainingMin,
    };
  }, [neuraxialRegimen, hoursSinceLastDose]);

  const buildSummaryText = () => {
    const indNames: Record<IndicationKey, string> = {
      vte_prophylaxis: 'VTE Cerrahi/Medikal Profilaksi',
      vte_treatment: 'Akut DVT / Pulmoner Emboli Tedavisi',
      nste_acs: 'NSTE-AKS (OASIS-5 / ESC 2023)',
      svt_calisto: 'Yüzeyel Ven Trombozu (CALISTO · 45 gün)',
      hit_ash: 'HIT Antikoagülasyonu (ASH 2018 · Off-Label)',
    };
    return [
      `FONDAPARİNUKS (Arixtra®) KLİNİK DOZ ÖZETİ`,
      `Hasta: ${weightKg} kg | Endikasyon: ${indNames[indication]} | Renal: ${
        renalBand === 'normal' ? 'CrCl ≥50' : renalBand === 'moderate_30_49' ? 'CrCl 30–49' : 'CrCl <30'
      }`,
      `Öneri: ${doseCalc.doseLabel}`,
      `Enjektör: ${doseCalc.syringeText}`,
      `Zamanlama: ${doseCalc.scheduleText}`,
      doseCalc.pciUfhText ? `PKG Uyarısı: ${doseCalc.pciUfhText}` : '',
      `Nöraksiyel Kural (ESAIC 2022 / ASRA 2018): Profilaksi 36–42 sa · Terapötik 72–96 sa (3–4 gün) ara · Kalıcı epidural kateter ÖNERİLMEZ!`,
      `Kanama Uyarısı: PROTAMİN %0 ETKİSİZ! Masif kanamada rFVIIa (90 mcg/kg) veya aPCC (FEIBA) + TXA düşün.`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      {/* 1. HIZLI NAVİGASYON + TÜMÜNÜ AÇ / KAPAT */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. ISMP HIGH-ALERT GÜVENLİK BLOĞU (VARSAYILAN KAPALI) */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="fonda-high-alert"
        tallManName="FONDAPARINUX (Arixtra®)"
        confusionRiskWith="Enoksaparin (Clexane® / Oksapar®) · Heparin"
        criticalAlerts={[
          'PROTAMİN SÜLFAT %0 ETKİSİZDİR! UFH (%100) ve Enoksaparin (~%60) aksine Fondaparinuks’un spesifik antidotu YOKTUR — 17–21 saatlik çok uzun yarı ömrü nedeniyle doz aşımı veya renal birikimde kanama kontrolü son derece güçtür!',
          'CrCl <30 mL/dk’da MUTLAK KONTRENDİKE: %100’e yakın değişmeden böbrekten atılır ve hemodiyalizle yalnızca ~%20 temizlenir → ağır KBY/ABH hastasında ASLA uygulamayın (UFH seçin)!',
          'CERRAHİ PROFİLAKSİDE <50 kg & <6 SAAT YASAĞI: Vücut ağırlığı <50 kg olan cerrahi hastalarda profilaktik kullanım FDA tarafından kontrendikedir; ilk postop doz hemostaz sonrası EN ERKEN 6–8. saatte yapılmalıdır (ASLA pre-op değil!).',
          'PKG (ANJİYO/STENT) KATETER TROMBOZU TUZAĞI: OASIS-5/6’da tek başına Fondaparinuks ile PKG sırasında rehber kateter trombozu görülmüştür! NSTE-AKS’de PKG’ye giderken TEK TAM DOZ IV UFH (70–85 IU/kg) eklemek ZORUNLUDUR; STEMI Primer PKG’de KONTRENDİKEDİR!',
          'NÖRAKSİYEL BLOK & EPİDURAL KATETER: Tüm parenteral antikoagülanlar arasında EN UZUN bekleme süresine sahiptir (Profilaksi: 36–42 saat · Terapötik: 3–4 gün / 72–96 saat). ASRA 2018: Fondaparinuks altında kalıcı epidural kateter YERLEŞTİRMEYİN!',
        ]}
        antidoteOrRescue="SPESİFİK ANTİDOT YOKTUR! Protamin Sülfat Fondaparinuksu KESİNLİKLE geri çevirmez (%0 etki)! Yaşamı tehdit eden kanamada: (1) İlacı hemen kesin, mekanik/cerrahi hemostaz + eritrosit/plazma resüsitasyonu + Traneksamik Asit (TXA 1 g IV); (2) Hemostatik kurtarma olarak Rekombinant Faktör VIIa (rFVIIa · NovoSeven® 90 mcg/kg IV — tromboz riski tartılarak) veya aPCC (FEIBA 25–50 IU/kg) düşünün (Andeksanet alfa off-label olup TR rutin stokta yoktur; Hemodiyaliz yalnızca ~%20 klirens sağlar)."
      />

      {/* 3. KİMLİK & HIZLI ÖZET KARTI (DAİMA AÇIK) */}
      <section
        id="fonda-summary"
        className={`rounded-2xl border p-5 sm:p-6 scroll-mt-20 ${
          isDark
            ? 'border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/25'
            : 'border-cyan-200 bg-gradient-to-br from-white via-white to-cyan-50/50'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-lg border px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase ${
                  isDark
                    ? 'border-cyan-500/40 bg-cyan-950/60 text-cyan-300'
                    : 'border-cyan-300 bg-cyan-100 text-cyan-800'
                }`}
              >
                Antitrombotik · Selektif İndirekt Faktör Xa İnhibitörü (Sentetik Pentasakkarit)
              </span>
              <span
                className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-semibold ${
                  isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-700'
                }`}
              >
                ATC: B01AX05
              </span>
              <span
                className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] font-bold ${
                  isDark
                    ? 'border-rose-500/40 bg-rose-950/50 text-rose-300'
                    : 'border-rose-200 bg-rose-50 text-rose-700'
                }`}
              >
                Protamin %0 · CrCl &lt;30 YASAK
              </span>
            </div>
            <h2 className={`mt-2 text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fondaparinuks Sodyum{' '}
              <span className={`font-semibold text-base sm:text-lg ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                (Arixtra®)
              </span>
            </h2>
            <p className={`mt-1.5 max-w-4xl text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Heparinin aktif antitrombin-bağlanma bölgesinin tamamen <strong>sentetik pentasakkarit</strong> analoğudur
              (1.728 Da). Antitrombin-III’e seçici bağlanarak yalnızca <strong>Faktör Xa’yı inhibe eder</strong> (anti-IIa
              etkisi <strong>SIFIRDIR</strong>). <strong>17–21 saatlik ultra-uzun yarı ömrü</strong> sayesinde günde tek doz
              (<code className="font-mono">q24sa</code>) SC verilir; anti-PF4 çapraz reaksiyonu yapmadığından{' '}
              <strong>HIT hastalarında (CrCl ≥30)</strong> altın alternatif oluşturur, ancak %100 renal atılım ve spesifik
              antidot yokluğu nedeniyle böbrek yetmezliği ile nöraksiyel anestezide azami dikkat gerektirir.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            {
              label: 'Yarı Ömür & Doz Aralığı',
              value: '17–21 saat · q24sa',
              sub: '100% SC biyoyararlanım · Pik 2 sa',
              tone: isDark ? 'border-cyan-500/30 bg-cyan-950/30 text-cyan-200' : 'border-cyan-200 bg-cyan-50 text-cyan-900',
            },
            {
              label: 'Renal Kırmızı Çizgi',
              value: 'CrCl <30 YASAK',
              sub: '%100 değişmeden renal atılım',
              tone: isDark ? 'border-rose-500/30 bg-rose-950/30 text-rose-200' : 'border-rose-200 bg-rose-50 text-rose-900',
            },
            {
              label: 'Nöraksiyel (ESAIC/ASRA)',
              value: '36–42 sa / 3–4 gün',
              sub: 'Kalıcı epidural kateter YASAK!',
              tone: isDark ? 'border-amber-500/30 bg-amber-950/30 text-amber-200' : 'border-amber-200 bg-amber-50 text-amber-900',
            },
            {
              label: 'HIT & Antidot Profili',
              value: 'HIT Güvenli · Antidot YOK',
              sub: 'Protamin %0 · rFVIIa / aPCC kurtarma',
              tone: isDark ? 'border-emerald-500/30 bg-emerald-950/30 text-emerald-200' : 'border-emerald-200 bg-emerald-50 text-emerald-900',
            },
          ].map((kpi) => (
            <div key={kpi.label} className={`rounded-xl border p-3 ${kpi.tone}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{kpi.label}</p>
              <p className="mt-0.5 font-mono text-xs sm:text-sm font-black">{kpi.value}</p>
              <p className="mt-0.5 text-[11px] opacity-85">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. ETKİ MEKANİZMASI (AKORDİYON) */}
      <MechanismOfActionBlock
        isDark={isDark}
        sectionId="fonda-moa"
        summary="Fondaparinuks, heparinin antitrombin-III (AT-III) bağlanan kritik 5 şekerli dizisinin tamamen sentetik kopyasıdır. AT-III’e tersinir bağlanarak konformasyonel aktivasyon yaratır ve Faktör Xa nötralizasyonunu ~300 kat hızlandırır; ancak zinciri 18 sakkaritten çok kısa (5 sakkarit) olduğu için AT-III ile Trombin (Faktör IIa) arasında köprü kuramaz — yani saf anti-Xa etkili, anti-IIa aktivitesi SIFIR olan bir ajandır."
        pillars={[
          {
            title: '1. Saf Anti-Xa · Sıfır Anti-IIa',
            detail:
              'Trombini (FIIa) doğrudan inhibe etmez; ancak üst basamaktaki FXa’yı selektif bloke ederek protrombinaz kompleksini susturur ve yeni trombin üretimini (thrombin burst) etkili biçimde durdurur.',
          },
          {
            title: '2. Katalitik AT-III Döngüsü',
            detail:
              'FXa–AT-III kovalent kompleksi oluştuktan sonra Fondaparinuks serbest kalarak başka bir AT-III molekülüne bağlanıp tekrar tekrar katalitik etki gösterir (bu nedenle düşük mg dozlarda 24 saat etkili kalır).',
          },
          {
            title: '3. Sıfır PF4 Çapraz Reaksiyonu',
            detail:
              'Hayvansal kaynaklı değildir ve kısa negatif yük zinciri Platelet Faktör 4 (PF4) ile immünojenik makromoleküler kompleks oluşturmaz → HIT geliştirme riski neredeyse sıfırdır ve stabil HIT tedavisinde kullanılır.',
          },
        ]}
      />

      {/* 5. FARMAKOKİNETİK (ADME) AKORDİYONU */}
      <section
        id="fonda-pk"
        className={`overflow-hidden rounded-2xl border transition-all scroll-mt-20 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => setAdmeOpen((prev) => !prev)}
          aria-expanded={admeOpen}
          className={`flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left transition-colors ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50/90'
          }`}
        >
          <div className="flex items-center gap-3">
            <Clock className={`h-5 w-5 shrink-0 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />
            <div>
              <h3 className={`text-sm sm:text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Farmakokinetik (ADME) &amp; Laboratuvar İzlem Özellikleri
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                SC %100 biyoyararlanım · Tmax 2 sa · t½ 17–21 sa · %100 değişmeden renal eliminasyon
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`hidden sm:inline-flex rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {admeOpen ? 'Gizle' : 'Aç'}
            </span>
            {admeOpen ? (
              <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            ) : (
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            )}
          </div>
        </button>

        {admeOpen && (
          <div className={`border-t p-5 sm:p-6 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: 'Emilim (Absorption)',
                  value: 'SC %100 · Tmax ~2 saat',
                  detail:
                    'Subkütan uygulamada hızla ve tam (%100) emilir; 25 dk içinde pik düzeyin yarısına ulaşır. IV uygulama gerekmez (yalnızca özel STEMI ilk dozunda IV veri vardır, rutin SC verilir).',
                },
                {
                  title: 'Dağılım (Distribution)',
                  value: 'Vd 7–11 L · AT-III’e ≥%94 Bağlı',
                  detail:
                    'Plazma kompartımanında sınırlı dağılır; yüksek özgüllükle neredeyse tamamen plazma AT-III’e bağlanır. Diğer plazma proteinlerine bağlanmadığı için protein yer değiştirme etkileşimi yapmaz.',
                },
                {
                  title: 'Metabolizma (Metabolism)',
                  value: 'Hepatik Metabolizma YOK!',
                  detail:
                    'CYP450 enzimleri tarafından metabolize edilmez ve CYP inhibisyonu/indüksiyonu yapmaz — bu nedenle farmakokinetik ilaç-ilaç etkileşimi neredeyse sıfırdır.',
                },
                {
                  title: 'Eliminasyon (Excretion)',
                  value: 't½ 17–21 sa · %100 Renal!',
                  detail:
                    'Değişmeden böbreklerden atılır! Yaşlılarda (>75 yaş) t½ ~21 saate, CrCl 30–49’da ~29 saate, CrCl <30’da >40–72 saate çıkar! Rutin PT/aPTT güvenilmezdir; gerekirse Fondaparinuks-kalibreli Anti-Xa bakılır.',
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`rounded-xl border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <p className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {card.title}
                  </p>
                  <p className={`mt-1 font-mono text-sm font-bold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                    {card.value}
                  </p>
                  <p className={`mt-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {card.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 6. MUTLAK VE RELATİF KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="fonda-contra"
        absoluteItems={[
          'Ağır böbrek yetmezliği (CrCl <30 mL/dk), ESRD, Hemodiyaliz (IHD), Periton Diyalizi veya CRRT — FDA/EMA MUTLAK KONTRENDİKE!',
          'Aktif klinik olarak anlamlı majör kanama (intrakraniyal, GİS, retroperitoneal, cerrahi alan kanaması).',
          'Akut bakteriyel endokardit (septik embolik hemorajik transformasyon riski).',
          'Vücut ağırlığı <50 kg olan hastalarda cerrahi VTE profilaksisi (ortopedik / abdominal cerrahi — FDA kontrendikasyon!).',
          'Fondaparinuks ile ilişkili anti-trombosit antikorlara bağlı trombositopeni (aşırı nadir) veya etken maddeye ağır aşırı duyarlılık.',
          'STEMI Primer PKG (anjiyo/stent) sırasında tek antikoagülan olarak kullanım (OASIS-6: kateter trombozu — ESC Sınıf III ZARAR!).',
        ]}
        relativeItems={[
          'Orta böbrek yetmezliği (CrCl 30–49 mL/dk) — klirens ~%40 düşer, majör kanama riski artar; dalgalı ABH’de UFH tercih edin.',
          'İleri yaş (>75 yaş) ve düşük vücut ağırlığı (<50 kg terapötik kullanım dahil) — birikim ve gizli renal yetmezlik riski.',
          'Ağır karaciğer yetmezliği (Child-Pugh C) — koagülasyon faktör eksikliği + antidot yokluğu nedeniyle EMA KÜB önermez.',
          'Nöraksiyel anestezi / kalıcı epidural kateter gereksinimi — kalıcı kateter altında KULLANMAYIN (ASRA 2018 / ESAIC 2022)!',
          'Yakın tarihli beyin, spinal veya göz cerrahisi, kontrolsüz ağır hipertansiyon (>180/110 mmHg), aktif peptik ülser veya eşzamanlı DAPT/NSAİİ/trombolitik kullanımı.',
        ]}
        clinicalNote="Heparinle İndüklenen Trombositopeni (HIT) öyküsü veya akut stabil HIT bir KONTRENDİKASYON DEĞİLDİR — aksine Fondaparinuks (CrCl ≥30 mL/dk ise) ASH 2018 tarafından desteklenen başlıca non-heparin antikoagülan alternatifidir!"
      />

      {/* 7. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ (AKORDİYON) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="fonda-indications"
        eyebrow="FDA / EMA / ESC 2023 / ASH 2018 / CALISTO · Günde Tek Doz (q24sa)"
        title="Klinik Endikasyonlar ve Doz Rejimleri"
        subtitle="VTE Profilaksi 2,5 mg (≥6–8 sa postop) · DVT/PE Kilo Basamaklı 5/7,5/10 mg · NSTE-AKS 2,5 mg · SVT 45 gün"
        icon={<Syringe className={`h-5 w-5 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`} />}
        badge={
          <span
            className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${
              isDark ? 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-700'
            }`}
          >
            5 Endikasyon
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {[
            {
              title: '1. Ortopedik & Abdominal Cerrahi VTE Profilaksisi',
              badge: '2,5 mg SC q24sa · ≥6–8 sa Postop!',
              tone: 'emerald',
              lines: [
                'Doz: 2,5 mg (0,5 mL) SC günde 1 kez (≥50 kg ve CrCl ≥50 mL/dk).',
                'KRİTİK BAŞLAMA ZAMANI: Cerrahi kapanış ve hemostaz sağlandıktan EN ERKEN 6–8 saat sonra ilk doz verilir (ASLA pre-op verilmez; <6 sa başlanması majör kanamayı artırır!).',
                'Süre: Kalça/diz protezi ve abdominal cerrahide en az 5–9 gün; kalça kırığı cerrahisinde 28–35 güne uzatılır (PENTHIFRA-Plus).',
              ],
            },
            {
              title: '2. Akut DVT ve Pulmoner Emboli (PE) Tedavisi',
              badge: 'Kilo Basamaklı: 5 / 7,5 / 10 mg q24sa',
              tone: 'cyan',
              lines: [
                '<50 kg: 5 mg SC q24sa · 50–100 kg: 7,5 mg SC q24sa · >100 kg: 10 mg SC q24sa.',
                'Matisse-DVT & Matisse-PE: En az 5 gün ve eşzamanlı başlanan Warfarin ile INR ≥2,0 arka arkaya 2 gün olana dek devam edilir.',
                'Hemodinamik instabil masif PE (tromboliz adayı) hastasında uzun yarı ömür ve antidot yokluğu nedeniyle UFH tercih edilmelidir!',
              ],
            },
            {
              title: '3. NSTE-AKS (Unstabil Anjina / NSTEMI — OASIS-5)',
              badge: '2,5 mg SC q24sa · ESC 2023 Sınıf I',
              tone: 'indigo',
              lines: [
                'Doz: 2,5 mg SC günde 1 kez (hemen kateterizasyona gitmeyecek NSTE-AKS hastalarında en iyi etkinlik/kanama profiline sahip parenteral ajan!).',
                'ZORUNLU PKG KURALI (ESC 2023 Sınıf I): Hasta PKG’ye alınırsa rehber kateter trombozunu önlemek için işlem anında TEK TAM DOZ IV UFH bolusu (70–85 IU/kg; GPIIb/IIIa varsa 50–60 IU/kg) verilir!',
                'STEMI Primer PKG’de (OASIS-6): KONTRENDİKEDİR (Sınıf III)!',
              ],
            },
            {
              title: '4. Yüzeyel Ven Trombozu — SVT (CALISTO)',
              badge: '2,5 mg SC q24sa × 45 Gün',
              tone: 'teal',
              lines: [
                'Endikasyon: Alt ekstremitede ≥5 cm uzunluğunda, safenofemoral bileşkeye >3 cm uzaklıktaki izole akut yüzeyel ven trombozu (DVT dışlandıktan sonra).',
                'CALISTO (NEJM 2010): 45 günlük 2,5 mg SC q24sa rejimi semptomatik DVT/PE ve trombüs uzamasını %85 azalttı (kanama artışı plaseboyla benzer!).',
                'Safenofemoral/safenopopliteal bileşkeye ≤3 cm yakın trombüslerde DVT gibi tam terapötik antikoagülasyon gerekir.',
              ],
            },
            {
              title: '5. Heparinle İndüklenen Trombositopeni — HIT (Off-Label)',
              badge: 'ASH 2018 · Kilo Basamaklı (CrCl ≥30)',
              tone: 'amber',
              lines: [
                'Mekanizma Avantajı: Sentetik pentasakkarit anti-PF4/heparin antikorlarıyla çapraz reaksiyon VERMEZ.',
                'Doz (ASH 2018): Akut trombozlu veya izole HIT’te stabil, kanaması olmayan ve CrCl ≥30 mL/dk hastalarda kilo basamaklı terapötik doz (<50 kg: 5 mg · 50–100 kg: 7,5 mg · >100 kg: 10 mg SC q24sa).',
                'UYARI: Kritik YBÜ hastası, ABH/CrCl <30 veya acil cerrahi/girişim adayı HIT’te kısa ömürlü IV Argatroban veya Bivalirudin tercih edin!',
              ],
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border p-4 ${
                isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.title}</h4>
                <span
                  className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-bold ${
                    isDark ? 'border-cyan-500/30 bg-cyan-950/50 text-cyan-300' : 'border-cyan-200 bg-cyan-50 text-cyan-800'
                  }`}
                >
                  {card.badge}
                </span>
              </div>
              <ul className={`mt-2.5 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {card.lines.map((ln, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isDark ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
                    <span>{ln}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </MonographAccordionSection>

      {/* 8. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI (AKORDİYON) */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="fonda-calc"
        title="Etkileşimli Fondaparinuks Klinik Hesaplayıcı (4 Sekmeli)"
        subtitle="Doz & Enjektör + PKG UFH · ASRA/ESAIC Nöraksiyel · Kanama Kurtarma · UFH vs DMAH vs Fondaparinuks"
        icon={
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isDark ? 'bg-cyan-500/15 text-cyan-300' : 'bg-cyan-100 text-cyan-700'
            }`}
          >
            <Calculator className="h-5 w-5" />
          </div>
        }
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                { id: 'dosing', label: '1. Doz & PKG UFH', icon: Syringe },
                { id: 'neuraxial', label: '2. Nöraksiyel (36–96 sa)', icon: ShieldAlert },
                { id: 'bleeding', label: '3. Kanama (Protamin %0!)', icon: AlertOctagon },
                { id: 'compare', label: '4. UFH vs DMAH vs Fonda', icon: GitCompare },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-colors ${
                    active
                      ? 'border-cyan-600 bg-cyan-600 text-white shadow-xs'
                      : isDark
                        ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
          <MonographCopyButton isDark={isDark} getText={buildSummaryText} label="Order Kopyala" />
        </div>

        {/* TAB 1: DOZ & ENJEKTÖR + PKG UFH */}
        {activeTab === 'dosing' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hasta Ağırlığı (kg)
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    min={30}
                    max={200}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value) || 75)}
                    className={`w-24 rounded-lg border px-2.5 py-1.5 font-mono text-sm font-black ${
                      isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                    }`}
                  />
                  <div className="flex flex-wrap gap-1">
                    {[45, 70, 90, 115].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setWeightKg(preset)}
                        className={`cursor-pointer rounded-md border px-2 py-1 font-mono text-[11px] font-bold ${
                          weightKg === preset
                            ? 'border-cyan-500 bg-cyan-600 text-white'
                            : isDark
                              ? 'border-slate-700 bg-slate-900 text-slate-300'
                              : 'border-slate-200 bg-white text-slate-700'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Klinik Endikasyon
                </label>
                <select
                  value={indication}
                  onChange={(e) => setIndication(e.target.value as IndicationKey)}
                  className={`mt-2 w-full rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                    isDark ? 'border-slate-700 bg-slate-900 text-white' : 'border-slate-300 bg-white text-slate-900'
                  }`}
                >
                  <option value="vte_prophylaxis">Cerrahi / Medikal VTE Profilaksisi</option>
                  <option value="vte_treatment">Akut DVT / Pulmoner Emboli (Tedavi)</option>
                  <option value="nste_acs">NSTE-AKS (OASIS-5 / ESC 2023)</option>
                  <option value="svt_calisto">Yüzeyel Ven Trombozu (CALISTO · 45g)</option>
                  <option value="hit_ash">HIT Antikoagülasyonu (ASH 2018 · Off-Label)</option>
                </select>
                {indication === 'nste_acs' && (
                  <label className="mt-2 flex cursor-pointer items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-300">
                    <input
                      type="checkbox"
                      checked={pciPlanned}
                      onChange={(e) => setPciPlanned(e.target.checked)}
                      className="rounded border-slate-400"
                    />
                    <span>Hasta PKG’ye (Anjiyo/Stent) alınacak</span>
                  </label>
                )}
              </div>

              <div
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Böbrek Fonksiyonu (CrCl)
                </span>
                <div className="mt-2 grid grid-cols-3 gap-1">
                  {(
                    [
                      { id: 'normal', label: '≥50' },
                      { id: 'moderate_30_49', label: '30–49' },
                      { id: 'severe_lt30', label: '<30' },
                    ] as const
                  ).map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRenalBand(r.id)}
                      className={`cursor-pointer rounded-lg border py-1.5 font-mono text-xs font-bold ${
                        renalBand === r.id
                          ? r.id === 'severe_lt30'
                            ? 'border-rose-600 bg-rose-600 text-white'
                            : r.id === 'moderate_30_49'
                              ? 'border-amber-500 bg-amber-500 text-slate-950'
                              : 'border-emerald-600 bg-emerald-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 ${
                doseCalc.blocked
                  ? isDark
                    ? 'border-rose-500/50 bg-rose-950/30'
                    : 'border-rose-300 bg-rose-50'
                  : renalBand === 'moderate_30_49'
                    ? isDark
                      ? 'border-amber-500/40 bg-amber-950/20'
                      : 'border-amber-300 bg-amber-50'
                    : isDark
                      ? 'border-cyan-500/40 bg-cyan-950/25'
                      : 'border-cyan-200 bg-cyan-50/60'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">Hesaplanan Klinik Order</p>
                <span
                  className={`rounded-lg border px-2.5 py-0.5 font-mono text-xs font-black ${
                    doseCalc.blocked
                      ? 'border-rose-500/50 bg-rose-600 text-white'
                      : isDark
                        ? 'border-cyan-500/40 bg-cyan-950 text-cyan-200'
                        : 'border-cyan-300 bg-white text-cyan-900'
                  }`}
                >
                  {doseCalc.doseLabel}
                </span>
              </div>
              <p className={`mt-2 text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {doseCalc.syringeText}
              </p>
              <p className={`mt-1 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Zamanlama / Rejim:</strong> {doseCalc.scheduleText}
              </p>
              <p className={`mt-2 text-xs leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                <strong>Klinik Not:</strong> {doseCalc.warningText}
              </p>
              {doseCalc.pciUfhText && (
                <div
                  className={`mt-3 rounded-lg border p-3 text-xs font-semibold ${
                    isDark
                      ? 'border-amber-500/40 bg-amber-950/40 text-amber-200'
                      : 'border-amber-300 bg-amber-100/80 text-amber-950'
                  }`}
                >
                  {doseCalc.pciUfhText}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: ASRA 2018 / ESAIC 2022 NÖRAKSİYEL ZAMANLAYICI */}
        {activeTab === 'neuraxial' && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hastanın Fondaparinuks Rejimi
                </span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(
                    [
                      { id: 'prophylactic', label: 'Profilaktik (2,5 mg q24sa)' },
                      { id: 'therapeutic', label: 'Terapötik (5 / 7,5 / 10 mg)' },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNeuraxialRegimen(opt.id)}
                      className={`cursor-pointer rounded-lg border px-2.5 py-2 text-xs font-bold ${
                        neuraxialRegimen === opt.id
                          ? 'border-cyan-600 bg-cyan-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-900 text-slate-300'
                            : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span>Son Dozdan Beri Geçen Süre</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-300">{hoursSinceLastDose} saat</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={120}
                  step={2}
                  value={hoursSinceLastDose}
                  onChange={(e) => setHoursSinceLastDose(Number(e.target.value))}
                  className="mt-3 w-full accent-cyan-600"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-500">
                  <span>0 sa</span>
                  <span>36 sa</span>
                  <span>42 sa</span>
                  <span>72 sa</span>
                  <span>96 sa</span>
                  <span>120 sa</span>
                </div>
              </div>
            </div>

            <div
              className={`rounded-xl border p-4 ${
                neuraxialCalc.isOptimal
                  ? isDark
                    ? 'border-emerald-500/40 bg-emerald-950/25 text-emerald-200'
                    : 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : neuraxialCalc.isSafe
                    ? isDark
                      ? 'border-amber-500/40 bg-amber-950/25 text-amber-200'
                      : 'border-amber-300 bg-amber-50 text-amber-900'
                    : isDark
                      ? 'border-rose-500/50 bg-rose-950/30 text-rose-200'
                      : 'border-rose-300 bg-rose-50 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-black">
                {neuraxialCalc.isSafe ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                )}
                <span>
                  {neuraxialCalc.isOptimal
                    ? `GÜVENLİ ARALIKTA (≥${neuraxialCalc.idealWait} saat geçti · Normal böbrek fonksiyonu şartıyla)`
                    : neuraxialCalc.isSafe
                      ? `SINIRDA UYGUN (${neuraxialCalc.minWait}–${neuraxialCalc.idealWait} sa · Böbrek normal & tek girişim)`
                      : `NÖRAKSİYEL GİRİŞİM KONTRENDİKE! En az ${neuraxialCalc.remainingMin} saat daha bekleyin (Min ${neuraxialCalc.minWait}–${neuraxialCalc.idealWait} sa)`}
                </span>
              </div>
              <ul className="mt-2.5 space-y-1 text-xs leading-relaxed">
                <li>
                  • <strong>ESAIC/ESRA 2022:</strong> Profilaksi (2,5 mg) için <strong>36–42 saat</strong>; Terapötik (5–10 mg)
                  için <strong>72–96 saat (3–4 gün)</strong> bekleme önerilir (t½ 17–21 sa · böbrek bozuksa daha uzun!).
                </li>
                <li>
                  • <strong>ASRA 2018 Kateter Yasağı:</strong> Fondaparinuks başlanacaksa <strong>kalıcı epidural kateter</strong>{' '}
                  bırakılmamalıdır! Yalnızca atravmatik tek-doz (single-shot) spinal veya kateter çekildikten{' '}
                  <strong>≥6–12 saat sonra</strong> (ve cerrahiden ≥6–8 saat sonra) başlanması önerilir.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 3: KANAMA & ANTİDOT (PROTAMİN %0!) */}
        {activeTab === 'bleeding' && (
          <div className="mt-4 space-y-3">
            <div
              className={`rounded-xl border p-4 ${
                isDark ? 'border-rose-500/40 bg-rose-950/25' : 'border-rose-200 bg-rose-50'
              }`}
            >
              <p className={`text-sm font-black ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
                KRİTİK GERÇEK: Protamin Sülfat Fondaparinuksu %0 Nötralize Eder — KESİNLİKLE Protamin Vermeyin!
              </p>
              <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-rose-100/90' : 'text-rose-800'}`}>
                Protamin bazik protein yapısıyla uzun sülfatlı heparin zincirlerine elektrostatik bağlanır. Fondaparinuks yalnızca 5
                sakkarit uzunluğunda olduğu için Protamin ile kompleks oluşturmaz. Protamin vermek kanamayı durdurmadığı gibi
                hipotansiyon, pulmoner vazokonstriksiyon ve anafilaksiye yol açar!
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              {[
                {
                  step: '1. Basamak · Acil Stabilizasyon',
                  items: [
                    'Fondaparinuksu derhal kesin; son doz saatini ve CrCl değerini kontrol edin (t½ 17–21 sa!).',
                    'Mekanik kompresyon, endoskopik / girişimsel radyoloji / cerrahi hemostaz.',
                    'Eritrosit süspansiyonu, TDP/fibrinojen (masif transfüzyon protokolü), normotermi & iCa²⁺ >1,1 mmol/L.',
                    'Traneksamik Asit (TXA): 1 g IV 10 dk’da yükleme (antifibrinolitik destek).',
                  ],
                },
                {
                  step: '2. Basamak · Hemostatik Kurtarma',
                  items: [
                    'Rekombinant Faktör VIIa (rFVIIa · NovoSeven®): 90 mcg/kg IV bolus — ex-vivo/in-vivo trombin üretimini hızla restore eden en çok kanıta sahip kurtarma ajanıdır (arteriyel/venöz tromboz riski!).',
                    'Alternatif: Aktive Protrombin Kompleks Konsantresi (aPCC · FEIBA 25–50 IU/kg IV) — rFVIIa bulunamıyorsa düşünülebilir.',
                    '4-Faktör PCC (inaktif) etkinliği Fondaparinuks’ta aPCC/rFVIIa’ya göre daha zayıf ve tutarsızdır.',
                  ],
                },
                {
                  step: '3. Basamak · Diyaliz & Andeksanet',
                  items: [
                    'Hemodiyaliz: Klirensi yalnızca ~%20 artırır; acil tam geri çevirme yöntemi DEĞİLDİR (ancak CrCl <30 ile ağır birikimde ek önlem olarak tartışılabilir).',
                    'Andeksanet Alfa: Rekombinant modifiye FXa tuzağı teorik olarak bağlasa da Fondaparinuks için rutin onaysızdır ve TR hastane stoklarında bulunmaz.',
                  ],
                },
              ].map((col) => (
                <div
                  key={col.step}
                  className={`rounded-xl border p-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50/70'
                  }`}
                >
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>
                    {col.step}
                  </h4>
                  <ul className={`mt-2 space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {col.items.map((it, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: UFH vs ENOKSAPARİN vs FONDAPARİNUKS */}
        {activeTab === 'compare' && (
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                  <th className="p-3 font-bold">Özellik</th>
                  <th className="p-3 font-bold">Standart Heparin (UFH)</th>
                  <th className="p-3 font-bold">Enoksaparin (DMAH)</th>
                  <th className="p-3 font-bold text-cyan-600 dark:text-cyan-300">Fondaparinuks (Arixtra®)</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                {[
                  ['Hedef (Anti-Xa : Anti-IIa)', '1 : 1 (FXa + FIIa)', '~3,8 : 1 (FXa baskın)', 'SAF Anti-Xa (Anti-IIa = 0!)'],
                  ['Yarı Ömür (t½)', '30–90 dk (doza bağımlı)', '4,5–7 saat (SC)', '17–21 saat (günde TEK doz!)'],
                  ['Eliminasyon', 'RES + Endotel (Renal bağımsız)', 'Ağırlıklı Renal', '%100’e yakın değişmeden Renal!'],
                  ['CrCl <30 mL/dk', 'GÜVENLİ (1. Tercih!)', 'Doz Azalt (20 mg / q24sa) veya UFH', 'MUTLAK KONTRENDİKE!'],
                  ['Protamin Reversiyonu', '%100 Tam Geri Çevirme', 'Kısmi (~%60)', '%0 ETKİSİZ (Antidot YOK · rFVIIa)'],
                  ['HIT Riski / Kullanımı', 'En Yüksek (%1–5) · YASAK', 'Düşük (%0,2–0,8) · YASAK', 'Sıfıra Yakın · Stabil HIT’te Kullanılır!'],
                  ['Nöraksiyel Bekleme (Tedavi)', 'IV 4–6 sa (aPTT normal)', '24 saat', '72–96 saat (3–4 gün) · Kateter YASAK!'],
                  ['PKG (Anjiyo/Stent)', '1. Tercih (ACT hedefli)', 'Kullanılabilir (0,5–0,75 mg/kg IV)', 'Tek başına YASAK! (+ IV UFH 70–85 IU/kg)'],
                ].map(([feat, ufh, lmwh, fonda]) => (
                  <tr key={feat} className={isDark ? 'odd:bg-slate-950/40' : 'odd:bg-slate-50/50'}>
                    <td className={`p-3 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{feat}</td>
                    <td className="p-3">{ufh}</td>
                    <td className="p-3">{lmwh}</td>
                    <td className={`p-3 font-semibold ${isDark ? 'text-cyan-200' : 'text-cyan-900'}`}>{fonda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </MonographAccordionSection>

      {/* 9. TÜRKİYE PREPARATLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="fonda-tr"
        preparations={[
          {
            name: 'Arixtra® 2,5 mg / 0,5 mL Enjeksiyonluk Çözelti',
            presentation: 'Kullanıma hazır tek dozluk otomatik güvenlik sistemli SC cam enjektör (Mavi piston)',
            concentration: '2,5 mg / 0,5 mL (5 mg/mL)',
            saltOrBaseNote: 'VTE profilaksisi (ortopedi/abdominal/medikal), NSTE-AKS (OASIS-5) ve Yüzeyel Ven Trombozu (CALISTO) standardı.',
            alertLevel: 'standard',
          },
          {
            name: 'Arixtra® 7,5 mg / 0,6 mL Enjeksiyonluk Çözelti',
            presentation: 'Kullanıma hazır tek dozluk otomatik güvenlik sistemli SC cam enjektör (Mor/Eflatun piston)',
            concentration: '7,5 mg / 0,6 mL (12,5 mg/mL)',
            saltOrBaseNote: '50–100 kg erişkinlerde Akut DVT / Pulmoner Emboli ve stabil HIT tedavisi için günde tek doz terapötik form.',
            alertLevel: 'high',
          },
          {
            name: 'Arixtra® 5 mg / 0,4 mL & 10 mg / 0,8 mL (Özel Kilo Formları)',
            presentation: '<50 kg (5 mg · turuncu) ve >100 kg (10 mg · kırmızı/koyu) terapötik hazır enjektörler',
            concentration: '12,5 mg/mL',
            saltOrBaseNote: 'Türkiye hastane stoklarında her zaman bulunmayabilir; <50 kg veya >100 kg terapötik hastada stok yoksa UFH/Enoksaparin tercih edilmelidir.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Hazır SC enjektördeki hava kabarcığı BOŞALTILMAZ (doz kaybını önlemek için tam hacim verilir).',
          'Derin subkütan (SC) olarak anterolateral veya posterolateral abdominal duvara 90° açıyla enjekte edilir; ASLA intramüsküler (IM) uygulanmaz!',
          'Enjeksiyon bölgesi her gün sağ/sol olarak değiştirilir ve enjeksiyon sonrası ovulmaz (hematom riski).',
        ]}
        concentrationTrapWarning="Arixtra® 2,5 mg/0,5 mL (5 mg/mL) ile 7,5 mg/0,6 mL (12,5 mg/mL) enjektör hacimleri neredeyse aynıdır (0,5 mL vs 0,6 mL) ancak 7,5 mg formunun dozu 3 KATTIR! Profilaksi hastasına yanlışlıkla 7,5 mg uygulanması geri çevrilemez majör kanamaya yol açar — piston rengini ve mg etiketini çift kontrol edin!"
      />

      {/* 10. UYGULAMA YOLU & UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="fonda-line"
        accessRequirement="peripheral-ok"
        accessSummary="Rutin klinik uygulamada yalnızca DERİN SUBKÜTAN (SC) yolla uygulanır (IM kontrendikedir!). Nadir IV ilk doz uygulamalarında (ör. fibrinolitik alan STEMI çalışması OASIS-6) doğrudan mevcut IV hattan 1–2 dk bolus veya 25–50 mL %0,9 NaCl mini-torba ile 1–2 dk infüzyon verilebilir; enjeksiyon sonrası hat %0,9 NaCl ile yıkanır."
        phRange="5,0 – 8,0 (izotonik NaCl tamponlu berrak çözelti)"
        osmolalityNote="İzotonik sodyum klorür çözeltisi (~290 mOsm/kg); prezervatif içermez."
        compatibleDiluents={['Hazır SC enjektör sulandırılmaz', '%0,9 NaCl (yalnızca özel IV kullanımda)']}
        ySiteCompatible={['%0,9 NaCl (hat yıkama)']}
        ySiteIncompatible={['Başka hiçbir ilaçla aynı enjektörde/hatta karıştırılmamalıdır!']}
        stabilityNote="Oda sıcaklığında (<25 °C) saklanır; dondurulmaz. Hazır enjektör tek kullanımlıktır."
        extravasationProtocol="SC uygulamada yüzeyel dermişe enjeksiyon lokal ekimoz/hematom yapabilir; derin abdominal SC dokuya 90° açıyla uygulayın ve bölgeye masaj yapmayın."
      />

      {/* 11. BÖBREK & KARACİĞER YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="fonda-organ"
        renalSummary="CrCl <30 mL/dk, IHD, PD ve CRRT’de MUTLAK KONTRENDİKE! %100’e yakın değişmeden renal elimine olur."
        renalDetails={[
          'CrCl ≥50 mL/dk: %100 standart günde tek doz (q24sa).',
          'CrCl 30–49 mL/dk: Klirens ~%40 düşer, yarı ömür ~29 saate çıkar — çok dikkatli kullanım; mümkünse alternatif (UFH / Enoksaparin) düşünün.',
          'CrCl <30 mL/dk & Diyaliz: MUTLAK KONTRENDİKE! Hemodiyaliz yalnızca ~%20 temizler, Protamin %0 etkisizdir → UFH seçin.',
        ]}
        hepaticSummary="Child-Pugh A: %100 Standart · Child-Pugh B: Dikkat · Child-Pugh C: KAÇININ (Kanama & Antidot Yokluğu)."
        hepaticDetails={[
          'Hepatik CYP metabolizması yoktur; ancak Child-Pugh B–C’de faktör sentezi/AT-III düşüklüğü ve özofagus varisleri kanama riskini katlar.',
          'EMA KÜB: Ağır hepatik yetmezlikte (Child-Pugh C) artmış kanama riski nedeniyle kullanılmaması önerilir.',
        ]}
        renalMatrix={STANDALONE_ORGAN_PART2.fondaparinux.renalMatrix}
        hepaticMatrix={STANDALONE_ORGAN_PART2.fondaparinux.hepaticMatrix}
        dualOrganNote={STANDALONE_ORGAN_PART2.fondaparinux.dualOrganNote}
      />

      {/* 12. GERİATRİ & OBEZİTE */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="fonda-geriatrics"
        geriatricReductionBadge=">75 Yaş · CrCl Mutlaka Hesapla!"
        geriatricPoints={[
          'Yaşlı (>75 yaş) hastalarda renal klirens ~%25 azalır ve t½ ~21 saate uzar — serum kreatinini normal görünse bile Cockcroft-Gault CrCl mutlaka hesaplanmalıdır!',
          'CrCl <30 mL/dk saptanırsa kesinlikle başlamayın; 30–49 mL/dk aralığında düşme/kanama riski yüksek kırılgan geriatrik hastalarda UFH veya doz azaltılmış DMAH değerlendirin.',
          '<50 kg kaşektik/kırılgan yaşlı hastalarda cerrahi VTE profilaksisi FDA tarafından KONTRENDİKEDİR.',
        ]}
        obesityWeightScalarBadge="VTE Tedavi: >100 kg → 10 mg q24sa"
        obesityPoints={[
          'Akut DVT/PE tedavisinde ağırlık >100 kg olduğunda doz 7,5 mg’dan 10 mg SC q24sa’ya yükseltilir (Matisse alt grup analizi).',
          'Morbid obezitede (BMI ≥40 kg/m² veya >120 kg) cerrahi VTE profilaksisinde standart 2,5 mg yetersiz Anti-Xa düzeyleri bırakabilir (bazı kılavuzlar 5 mg tartışsa da kanıt sınırlıdır → BMI ≥40’ta Enoksaparin 40 mg q12sa daha güçlü kanıta sahiptir).',
          'Dağılım hacmi plazma kompartımanıyla sınırlı (7–11 L) olduğundan adipoz dokuya belirgin dağılmaz.',
        ]}
        clinicalNote=">75 yaş + <50 kg + sınırda böbrek fonksiyonu (CrCl 30–50) üçlüsü Fondaparinuks ile majör retroperitoneal/GİS kanamanın en tehlikeli kombinasyonudur!"
      />

      {/* 13. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="fonda-preg"
        pregnancySummary="Gebelikte 1. Tercih DEĞİLDİR (DMAH 1. Tercih!) — Yalnızca HIT veya ağır DMAH alerjisinde düşünülür."
        pregnancyDetails={[
          'Düşük molekül ağırlığı (1.728 Da) nedeniyle plasentadan minimal geçiş (~%10 kordon kanı anti-Xa düzeyi) gösterilmiştir — Enoksaparin/UFH gibi %0 plasental geçişli değildir.',
          'ACCP / ASH / RCOG: Gebelikte VTE profilaksisi ve tedavisinde 1. seçenek DMAH (Enoksaparin); Fondaparinuks yalnızca gebede HIT veya şiddetli heparin aşırı duyarlılığı geliştiğinde 2. basamak olarak kullanılır.',
          'Doğum / epidural analjezi planı: 17–21 saatlik yarı ömrü nedeniyle doğumdan en az 36–42 saat (terapötikte 72–96 saat) önce kesilmesi gerekir — bu da plansız doğumda ciddi nöraksiyel blok engeli yaratır!',
        ]}
        lactationSummary="Anne sütüne geçiş çok düşüktür ve oral biyoyararlanımı SIFIRA yakın olduğundan emzirme genellikle uyumlu kabul edilir (LactMed)."
        lactationDetails={[
          'Polianyonik pentasakkarit yapısı bebeğin GİS’inden emilmez; yine de klinik veri DMAH/UFH kadar geniş olmadığından rutin postpartum dönemde Enoksaparin tercih edilir.',
        ]}
      />

      {/* 14. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="fonda-adverse"
        items={[
          {
            title: 'Majör & Minör Kanama',
            incidenceOrSeverity: 'Profilaksi %1–3 · Tedavi %1–2',
            detail:
              'GİS, retroperitoneal, cerrahi yara hematomu ve intrakraniyal kanama. Postop <6 saatte başlanması, CrCl <50 ve <50 kg riski belirgin artırır. Protaminle geri çevrilemez!',
            tone: 'rose',
          },
          {
            title: 'Spinal / Epidural Hematom',
            incidenceOrSeverity: 'FDA Kara Kutu Uyarısı',
            detail:
              'Kalıcı epidural kateter veya yetersiz bekleme süresi (<36–42 sa profilaksi / <72–96 sa tedavi) sonrası kalıcı paraplejiye yol açabilen nöroşirürjikal acil!',
            tone: 'rose',
          },
          {
            title: 'PKG Rehber Kateter Trombozu',
            incidenceOrSeverity: 'OASIS-5/6 (%0,9 vs %0,4)',
            detail:
              'Tek başına Fondaparinuks ile PKG yapıldığında kateter içinde kontakt aktivasyon kaynaklı pıhtı gelişir! PKG sırasında IV UFH (70–85 IU/kg) eklenmesiyle tamamen önlenir.',
            tone: 'amber',
          },
          {
            title: 'Anemi, Ekimoz & Transaminaz Artışı',
            incidenceOrSeverity: '%1–5 (Genellikle hafif)',
            detail:
              'Enjeksiyon yeri hematomu, hafif AST/ALT yükselmesi (ilacı kesince geri döner) ve nadir döküntü/trombositopeni (immün HIT son derece nadirdir).',
            tone: 'indigo',
          },
        ]}
      />

      {/* 15. ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="fonda-cautions"
        items={[
          {
            title: 'PKG (Anjiyoplasti / Stent) Mutlak Kuralı',
            detail:
              'NSTE-AKS nedeniyle Fondaparinuks 2,5 mg alan hasta koroner anjiyografi/PKG’ye alındığında rehber kateter trombozunu önlemek için işlem anında TEK TAM DOZ IV UFH bolusu (70–85 IU/kg; GPIIb/IIIa varsa 50–60 IU/kg) zorunludur (ESC 2023 Sınıf I).',
          },
          {
            title: 'Postoperatif 6–8 Saat Altın Kuralı',
            detail:
              'Ortopedik veya abdominal cerrahide ilk 2,5 mg doz ASLA preoperatif veya kapanıştan <6 saat içinde verilmemelidir; hemostaz doğrulandıktan 6–8 saat sonra uygulanır.',
          },
          {
            title: 'Laboratuvar İzlemi (PT / aPTT Güvenilmez!)',
            detail:
              'Rutin koagülasyon testleri (PT/INR, aPTT, ACT) Fondaparinuks etkisini yansıtmaz! İzlem zorunluysa (ekstrem kilo, sınırda böbrek, gebelik) Fondaparinuks-kalibreli kromojenik Anti-Xa düzeyi (enjeksiyondan 3 saat sonra pik) istenir; DMAH kalibrasyonuyla karıştırılmamalıdır!',
          },
          {
            title: 'HIT’te Ne Zaman Fondaparinuks, Ne Zaman Argatroban?',
            detail:
              'Stabil, kanama riski düşük, yakın cerrahi/girişim planlanmayan ve CrCl ≥30 mL/dk olan HIT hastalarında Fondaparinuks SC q24sa pratik ve etkilidir (ASH 2018). YBÜ’deki instabil, ABH’li veya girişim adayı HIT’te kısa ömürlü IV Argatroban/Bivalirudin seçin!',
          },
          {
            title: 'Büyük Cerrahi Öncesi Kesme Süresi',
            detail:
              'Yüksek kanama riskli elektif cerrahilerde (nöroşirürji, kardiyak, üroloji, geniş ortopedi) normal böbrekte son dozdan en az 36–48 saat (terapötikte 72–96 saat / 3–4 gün) önce kesilmelidir.',
          },
          {
            title: 'Mekanik Kalp Kapağı',
            detail:
              'Mekanik protez kalp kapaklarında köprüleme veya kronik antikoagülasyon için onaylı DEĞİLDİR (kapak trombozu ve kateter trombozu verileri nedeniyle UFH / Enoksaparin / Warfarin kullanın).',
          },
        ]}
      />

      {/* 16. 4 KADEMELİ DERİN FARMAKODİNAMİK ANALİZ (AKORDİYON) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="fonda-deep-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef: Sentetik Pentasakkarit–AT-III Allosterik Aktivasyonu',
          summary:
            'Fondaparinuks (MW 1.728 Da), heparinin yüksek afiniteli 5-sakkarit (GlcNS6S–GlcA–GlcNS3S6S–IdoA2S–GlcNS6S) çekirdek dizisinin tamamen sentetik sodyum tuzudur; plazma Antitrombin-III’ün (AT-III) heparin-bağlama oluğuna yüksek afiniteyle (Kd ≈ 36 nM) seçici bağlanır.',
          points: [
            'Bağlanma, AT-III’ün reaktif merkez halkasını (RCL · reactive center loop) dışa doğru açan allosterik konformasyonel değişiklik oluşturur ve AT-III’ün Faktör Xa’yı (FXa) inhibe etme hızını ~300 kat artırır.',
            'Trombin (Faktör IIa) inhibisyonu için hem AT-III’e hem trombine aynı anda köprü kuracak en az 18 sakkaritlik (~5.400 Da) zincir gerekir; 5 sakkaritlik Fondaparinuks bu köprüyü ASLA kuramaz → anti-IIa aktivitesi SIFIRDIR.',
            'Katalitik Yeniden Kullanım: FXa–AT-III kovalent kompleksi oluştuğunda AT-III’ün pentasakkarite afinitesi düşer, Fondaparinuks serbest kalır ve yeni bir AT-III molekülünü aktive etmek üzere döngüye geri döner.',
          ],
        }}
        intracellularSignaling={{
          title: 'Koagülasyon Kaskadı & Trombin Üretim (Thrombin Generation) Kinetiği',
          summary:
            'Aktive trombosit ve endotel fosfolipid yüzeyinde birleşen Protrombinaz Kompleksinin (FXa + FVa + Ca²⁺) katalitik alt birimi olan FXa’yı selektif susturarak amplifikasyon fazındaki trombin patlamasını (thrombin burst) baskılar.',
          points: [
            '1 molekül FXa, protrombinaz kompleksi üzerinden >1.000 molekül trombin (FIIa) üretebilir — bu nedenle FXa’nın üst basamakta seçici inhibisyonu, fibrinojen → fibrin dönüşümünü ve trombin-aracılı trombosit aktivasyonunu güçlü biçimde azaltır.',
            'Ancak kontakt yolak (Faktör XIIa → XIa → IXa) ve pıhtıya bağlı (clot-bound) FXa üzerindeki inhibisyon UFH’ye kıyasla zayıftır; bu biyokimyasal fark, yapay kateter yüzeyindeki (PKG rehber kateteri) kontakt-aktivasyon trombozunun moleküler nedenidir!',
            'PF4 (Platelet Faktör 4) Etkileşimsizliği: PF4 tetramerlerinin yüksek molekül ağırlıklı immün kompleks oluşturması için ≥10–12 sakkaritlik negatif yüklü zincir gerekir; 5 sakkaritlik Fondaparinuks PF4 ile immün kompleks kurmaz → HIT tetiklemez.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Vasküler Endotel & Venöz Tromboz Yatağı',
            tissueTarget: 'Protrombinaz (FXa/FVa)',
            accent: 'sky',
            points: [
              'Düşük akımlı venöz valf ceplerinde (DVT/SVT) doku faktörü–FVIIa–FXa eksenini susturarak fibrin ağı büyümesini 24 saat boyunca kesintisiz engeller.',
              'Endotelyal heparan sülfat veya plazma proteinlerine (vWF, vitronektin, histidin-zengin glikoprotein) non-spesifik bağlanmadığı için biyoyararlanımı %100 ve doz-yanıt ilişkisi son derece öngörülebilirdir.',
            ],
          },
          {
            systemTitle: 'Koroner Arter & Girişimsel Kateter Yüzeyi',
            tissueTarget: 'FXa vs FXIIa Kontakt Yolak',
            accent: 'rose',
            points: [
              'NSTE-AKS’de (OASIS-5) plak rüptürü sonrası doku faktörü kaynaklı FXa artışını Enoksaparin kadar etkili baskılarken majör kanamayı yarıya indirir.',
              'Buna karşın PKG sırasında plastik/metal rehber kateter yüzeyinde FXII aktivasyonu doğrudan FIIa üretir — anti-IIa aktivitesi sıfır olan Fondaparinuks bunu durduramaz; işlem anında tek bolus IV UFH şarttır!',
            ],
          },
          {
            systemTitle: 'Renal Glomerül & Eliminasyon Yatağı',
            tissueTarget: 'Glomerüler Filtrasyon (GFR)',
            accent: 'amber',
            points: [
              'Küçük, hidrofilik, yüksek negatif yüklü pentasakkarit yapısı hepatik uptake ve CYP metabolizmasından tamamen kaçar; tek çıkış kapısı glomerüler filtrasyondur.',
              'GFR <30 mL/dk’ya indiğinde tek eliminasyon yolu kapanır ve AT-III’e bağlı havuz günlerce dolaşımda kalarak kontrolsüz hemorajiye yol açar.',
            ],
          },
          {
            systemTitle: 'Trombosit & İmmün Hematoloji',
            tissueTarget: 'PF4 / FcγRIIA Ekseni',
            accent: 'teal',
            points: [
              'Trombosit agregasyonunu, kanama zamanını veya fibrinolizi doğrudan bozmaz.',
              'Anti-PF4/heparin IgG antikorları Fondaparinuks-PF4 kompleksini tanımadığı için FcγRIIA-aracılı trombosit aktivasyonu tetiklenmez → stabil HIT tedavisinde güvenle kullanılır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Doygunluk Kinetiği, Protamin Direnci & Antikoagülan Sinerji',
          summary:
            'Fondaparinuks’un plazma yarı ömrü plazma AT-III’e yüksek afiniteli bağlanmasına bağlıdır; serbest kalan fraksiyon böbrekten hızla süzülür, AT-III’e bağlı havuz ise 17–21 saatlik uzun etkiyi oluşturur.',
          points: [
            'Protamin Direncinin Biyofiziği: Arjininden zengin katyonik Protamin molekülleri yalnızca uzun anyonik polimerlere (UFH >18 sakkarit, kısmen DMAH) kararlı bağlanır; 5 sakkaritlik Fondaparinuks ile nötralizan kompleks kuramaz (%0 reversiyon).',
            'rFVIIa (NovoSeven®) Bypass Mekanizması: Yüksek doz rFVIIa, aktive trombosit yüzeyinde AT-III/Fondaparinuks blokajını aşarak doğrudan trombosit-bağımlı FX aktivasyonu ve trombin patlaması (thrombin burst) oluşturur.',
            'Farmakodinamik Kanama Sinerjisi: Aspirin, P2Y12 inhibitörleri (Klopidogrel/Prasugrel/Tikagrelor), NSAİİ’ler, SSRI’lar ve trombolitiklerle birleştiğinde GİS ve intrakraniyal kanama riski aditif/sinerjistik artar.',
          ],
        }}
        clinicalPearls={[
          'NSTE-AKS hastası Arixtra® 2,5 mg alırken acil/erken PKG’ye girerse anjiyo masasında IV UFH (70–85 IU/kg) eklenmesini ASLA unutmayın — rehber kateter trombozu önlenebilir bir felakettir!',
          'CrCl <30 mL/dk veya <50 kg (cerrahi profilaksi) hastasında Arixtra® orderını anında durdurun; böbrek fonksiyonu bozuk hastada tek güvenli parenteral antikoagülan UFH’dir.',
          'Fondaparinuks alan hastada epidural kateter bırakmayın ve spinal blok öncesi profilakside 36–42 saat, tedavide 3–4 gün (72–96 sa) kuralına sıkı uyun.',
          'Aktif kanamada zaman kaybetmeden Protamin VERMEYİN — etki %0’dır; doğrudan hemostaz + TXA + gerektiğinde rFVIIa (90 mcg/kg) / aPCC protokolünü aktive edin!',
        ]}
      />

      {/* 17. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="fonda-refs"
        drugName="Fondaparinuks Sodyum (Arixtra®)"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Diğer Sistemik Antikoagülanlar (UFH, DMAH, DOAC, Trombolitikler) — PKG UFH Bolusu HARİÇ',
            mechanism: 'Çift/çoklu koagülasyon kaskadı blokajı (farmakodinamik sinerji)',
            clinicalEffect: 'Geri çevrilemez majör GİS, retroperitoneal ve intrakraniyal kanama riskinde katlanarak artış.',
            management:
              'Eşzamanlı vermeyin! Yalnızca NSTE-AKS’de PKG sırasındaki tek IV UFH bolusu (70–85 IU/kg) ve DVT/PE’de Warfarin köprülemesi istisnadır.',
          },
          {
            severity: 'X',
            agent: 'Nöraksiyel Kateter + Eşzamanlı Antiplatelet / NSAİİ',
            mechanism: '17–21 saatlik uzun yarı ömür + trombosit fonksiyon inhibisyonu',
            clinicalEffect: 'Spinal/epidural hematom ve kalıcı nörolojik defisit (parapleji) riski.',
            management:
              'Kalıcı epidural kateter altında Fondaparinuks kullanmayın (ASRA 2018); tek-doz blok öncesi 36–42 sa (tedavide 72–96 sa) bekleyin.',
          },
          {
            severity: 'D',
            agent: 'Antiplatelet Ajanlar (Aspirin, Klopidogrel, Prasugrel, Tikagrelor, GPIIb/IIIa)',
            mechanism: 'Primer hemostaz + sekonder koagülasyon (FXa) eşzamanlı inhibisyonu',
            clinicalEffect: 'Majör GİS ve girişim yeri kanaması riskinde belirgin artış (özellikle yaşlı ve düşük kiloda).',
            management:
              'NSTE-AKS (DAPT + Arixtra 2,5 mg) dışında zorunlu olmadıkça kombine etmeyin; kombine kullanımda mutlaka PPI (Pantoprazol) ekleyin ve Hb/hematokrit izleyin.',
          },
          {
            severity: 'D',
            agent: 'Sistemik NSAİİ’ler (İbuprofen, Diklofenak, Ketorolak, Tenoksikam)',
            mechanism: 'Trombosit COX-1 blokajı + gastrik mukozal erozyon + renal GFR düşüşü (Fondaparinuks birikimi!)',
            clinicalEffect: 'Hem GİS kanaması hem de NSAİİ-kaynaklı ABH nedeniyle Fondaparinuks klirensinin çökmesi!',
            management:
              'Özellikle yaşlı ve postop ortopedi hastalarında NSAİİ yerine Parasetamol tercih edin; zorunluysa kreatinin ve kanamayı çok yakından izleyin.',
          },
          {
            severity: 'C',
            agent: 'SSRI / SNRI Antidepresanlar (Sertralin, Essitalopram, Venlafaksin)',
            mechanism: 'Trombosit serotonin depolarının tükenmesi → hafif antiplatelet etki',
            clinicalEffect: 'Üst GİS kanama ve cilt ekimozu riskinde orta düzey artış.',
            management: 'Özellikle ek GİS riski varsa PPI koruması ve klinik kanama izlemi önerilir.',
          },
        ]}
        references={[
          {
            authors: 'Yusuf S, Mehta SR, Chrolavicius S, et al. (OASIS-5 Investigators)',
            title: 'Comparison of fondaparinux and enoxaparin in acute coronary syndromes',
            journal: 'N Engl J Med',
            year: 2006,
            doi: '10.1056/NEJMoa055443',
            note: '20.078 NSTE-AKS hastasında 2,5 mg Fondaparinuks, Enoksaparine göre majör kanamayı %48 azalttı ve 30 günlük mortaliteyi düşürdü; PKG’de kateter trombozu riskini ortaya koydu.',
          },
          {
            authors: 'Yusuf S, Mehta SR, Chrolavicius S, et al. (OASIS-6 Trial Group)',
            title: 'Effects of fondaparinux on mortality and reinfarction in patients with acute ST-segment elevation myocardial infarction',
            journal: 'JAMA',
            year: 2006,
            doi: '10.1001/jama.295.13.joc60038',
            note: 'STEMI Primer PKG kolunda rehber kateter trombozu artışı nedeniyle Primer PKG’de tek başına kullanımın kontrendike olduğunu gösterdi.',
          },
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Scientific Document Group)',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes',
            journal: 'Eur Heart J',
            year: 2023,
            doi: '10.1093/eurheartj/ehad191',
            note: 'NSTE-AKS’de Fondaparinuks 2,5 mg q24sa Sınıf I öneri; PKG sırasında tek tam doz IV UFH (70–85 IU/kg) zorunlu Sınıf I; STEMI Primer PKG’de Sınıf III (önerilmez).',
          },
          {
            authors: 'Decousus H, Prandoni P, Mismetti P, et al. (CALISTO Study Group)',
            title: 'Fondaparinux for the treatment of superficial-vein thrombosis in the legs',
            journal: 'N Engl J Med',
            year: 2010,
            doi: '10.1056/NEJMoa0912072',
            note: '≥5 cm alt ekstremite yüzeyel ven trombozunda 45 gün boyunca 2,5 mg SC q24sa ile DVT/PE progresyonunda %85 azalma.',
          },
          {
            authors: 'Büller HR, Davidson BL, Decousus H, et al. (Matisse Investigators)',
            title: 'Subcutaneous fondaparinux versus intravenous unfractionated heparin in the initial treatment of pulmonary embolism',
            journal: 'N Engl J Med',
            year: 2003,
            doi: '10.1056/NEJMoa035451',
            note: 'Kilo basamaklı (5 / 7,5 / 10 mg SC q24sa) Fondaparinuksun akut PE’de IV UFH ile eşdeğer etkinlik ve güvenliğini kanıtlayan temel çalışma.',
          },
          {
            authors: 'Cuker A, Arepally GM, Chong BH, et al.',
            title: 'American Society of Hematology 2018 guidelines for management of venous thromboembolism: heparin-induced thrombocytopenia',
            journal: 'Blood Adv',
            year: 2018,
            doi: '10.1182/bloodadvances.2018024489',
            note: 'Stabil, CrCl ≥30 mL/dk HIT hastalarında Fondaparinuks’un kanıta dayalı non-heparin antikoagülan seçeneği olarak konumu.',
          },
          {
            authors: 'Kietaibl S, Ferrandis R, Godier A, et al.',
            title: 'Regional anaesthesia in patients on antithrombotic drugs: Joint ESAIC/ESRA guidelines',
            journal: 'Eur J Anaesthesiol',
            year: 2022,
            doi: '10.1097/EJA.0000000000001600',
            note: 'Fondaparinuks için nöraksiyel blok öncesi 36–42 saat (profilaksi) ve 72–96 saat (terapötik) bekleme kılavuzu.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Reg Anesth Pain Med',
            year: 2018,
            doi: '10.1097/AAP.0000000000000763',
            note: 'Fondaparinuks altında kalıcı epidural kateter yerleştirilmemesi ve kateter çekiminden ≥6 saat sonra başlanması önerisi.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/fondaparinux.html"
        medscapeUrl="https://reference.medscape.com/drug/arixtra-fondaparinux-342173"
      />
    </div>
  );
};
