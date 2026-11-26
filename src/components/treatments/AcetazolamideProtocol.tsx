import React, { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  HeartPulse,
  Mountain,
  Pill,
  ShieldAlert,
  Stethoscope,
  Wind,
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
import { STANDALONE_ORGAN_PART1 } from '../../data/organImpairment/standaloneOrganPart1';

interface Props {
  isDark: boolean;
}

type AcetazolamideIndication =
  | 'icu_alkalosis'
  | 'advor_hf'
  | 'iih_csf'
  | 'acute_glaucoma'
  | 'ams_altitude';

type RouteMode = 'po_ng' | 'iv';

export const AcetazolamideProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [indication, setIndication] = useState<AcetazolamideIndication>('icu_alkalosis');
  const [isPediatric, setIsPediatric] = useState<boolean>(false);
  const [weightKg, setWeightKg] = useState<number>(75);
  const [crCl, setCrCl] = useState<number>(75);
  const [baselineHco3, setBaselineHco3] = useState<number>(34);
  const [baselineK, setBaselineK] = useState<number>(3.9);
  const [hasCirrhosis, setHasCirrhosis] = useState<boolean>(false);
  const [route, setRoute] = useState<RouteMode>('po_ng');
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  const weightId = useId();
  const crClId = useId();
  const hco3Id = useId();
  const kId = useId();

  // --- DOZ & GÜVENLİK HESAPLAMALARI ---
  const isRenalContraindicated = crCl < 10;
  const isRenalRestricted = crCl >= 10 && crCl <= 50;
  const isAcidotic = baselineHco3 < 22;
  const isHypokalemic = baselineK < 3.5;
  const isSevereHypokalemic = baselineK < 3.0;

  const hasAbsoluteBlock = isRenalContraindicated || hasCirrhosis || isSevereHypokalemic || isAcidotic;

  const getCalculatedPlan = () => {
    if (isPediatric) {
      if (indication === 'icu_alkalosis' || indication === 'advor_hf') {
        const singleDoseMg = Math.min(250, Math.round(weightKg * 5));
        const freq = isRenalRestricted ? '24 saatte bir (CrCl 10–50)' : '12–24 saatte bir';
        return {
          title: 'Pediatrik Metabolik Alkaloz / Diürez',
          singleDoseMg,
          doseDisplay: `${singleDoseMg} mg (${(singleDoseMg / 250).toFixed(2)} tb · 5 mg/kg/doz)`,
          interval: freq,
          duration: '1–3 gün (bikarbonat ve K⁺ takibiyle)',
          maxDaily: 'Maks 250 mg/doz · 1.000 mg/gün',
          prepNote:
            route === 'iv'
              ? `${(singleDoseMg / 100).toFixed(2)} mL (100 mg/mL sulandırılmış çözelti) yavaş IV puşe veya 15–30 dk infüzyon. (TR Notu: IV form Türkiye’de ruhsatlı/rutin mevcut değildir; NG/oral Diazomid 250 mg tb kullanın.)`
              : `Diazomid 250 mg tb'den ${singleDoseMg} mg eşdeğeri (oral süspansiyon veya NG/OG ile 10–15 mL su içinde).`,
        };
      }
      if (indication === 'iih_csf') {
        const dailyLow = Math.min(1000, Math.round(weightKg * 15));
        const dailyHigh = Math.min(1000, Math.round(weightKg * 25));
        const perDose = Math.round(dailyLow / (isRenalRestricted ? 2 : 3));
        return {
          title: 'Pediatrik KİB / İİH / Geçici BOS Azaltımı',
          singleDoseMg: perDose,
          doseDisplay: `${perDose} mg/doz (Günlük ${dailyLow}–${dailyHigh} mg)`,
          interval: isRenalRestricted ? '12 saatte bir (CrCl 10–50)' : '8 saatte bir (3 bölünmüş doz)',
          duration: 'Klinik/göz dibi ve AKG yanıtına göre titre edilir',
          maxDaily: '15–25 mg/kg/gün (Maks 1.000 mg/gün)',
          prepNote:
            route === 'iv'
              ? `${(perDose / 100).toFixed(2)} mL (100 mg/mL çözelti) 15–30 dk IV infüzyon. (TR Notu: IV form TR’de rutin bulunmaz.)`
              : `250 mg tabletten eczane/yatak başı bölünmüş süspansiyon (${perDose} mg/doz).`,
        };
      }
      if (indication === 'acute_glaucoma') {
        const singleDoseMg = Math.min(250, Math.round(weightKg * 5));
        return {
          title: 'Pediatrik Akut Glokom (GİB Acili)',
          singleDoseMg,
          doseDisplay: `${singleDoseMg} mg (5–10 mg/kg/doz)`,
          interval: isRenalRestricted ? '12 saatte bir (CrCl 10–50)' : '6–8 saatte bir',
          duration: 'Göz içi basınç kontrolüne kadar (genellikle 24–48 sa)',
          maxDaily: 'Maks 30 mg/kg/gün veya 1.000 mg/gün',
          prepNote:
            route === 'iv'
              ? `${(singleDoseMg / 100).toFixed(2)} mL (100 mg/mL çözelti) yavaş IV. (TR Notu: IV form TR’de rutin bulunmaz.)`
              : `Oral/NG ile ${singleDoseMg} mg.`,
        };
      }
      const singleDoseMg = Math.min(125, Math.round(weightKg * 2.5));
      return {
        title: 'Pediatrik Yüksek İrtifa (AMS) Profilaksisi',
        singleDoseMg,
        doseDisplay: `${singleDoseMg} mg (2,5 mg/kg/doz)`,
        interval: '12 saatte bir',
        duration: 'Tırmanıştan 24 saat önce başla, hedef irtifada 48 saat sürdür',
        maxDaily: 'Maks 125 mg × 2/gün',
        prepNote: 'Oral uygulanır; tırmanış sırasında yeterli hidrasyon sağlanmalıdır.',
      };
    }

    // ERİŞKİN DOZLARI
    if (indication === 'icu_alkalosis') {
      const singleDoseMg = isRenalRestricted ? 250 : 500;
      return {
        title: 'YBÜ Dirençli Metabolik Alkaloz (Mazur / DIABOLO)',
        singleDoseMg,
        doseDisplay: isRenalRestricted
          ? '250 mg (1 tablet veya 2,5 mL IV)'
          : '500 mg tek doz (2 tablet) veya 250 mg × 2/gün',
        interval: isRenalRestricted ? '12–24 saatte bir (CrCl 10–50)' : 'Günde 1 kez 500 mg (veya 12 sa arayla 250 mg)',
        duration: '1–3 gün (HCO₃⁻ 26–28 mmol/L hedefine inince kesilir)',
        maxDaily: '500–1.000 mg/gün (2–3 gün sonra diüretik tolerans gelişir)',
        prepNote:
          route === 'iv'
            ? `${singleDoseMg} mg (${(singleDoseMg / 100).toFixed(1)} mL, 100 mg/mL WFI çözeltisi) 50 mL SF içinde 15–30 dk IV infüzyon veya yavaş puşe. (TR Notu: IV form Türkiye’de ruhsatlı/rutin mevcut değildir; >%90 biyoyararlanımlı Diazomid 250 mg tb NG/PO uygulanır.)`
            : `Diazomid 250 mg tb × ${singleDoseMg / 250} adet PO veya ezilerek 15 mL suyla NG/OG tüpten (tüp öncesi/sonrası 20 mL suyla yıka).`,
      };
    }

    if (indication === 'advor_hf') {
      const singleDoseMg = isRenalRestricted ? 250 : 500;
      return {
        title: 'Akut Dekompanse Kalp Yetmezliği + Volüm Yükü (ADVOR)',
        singleDoseMg,
        doseDisplay: isRenalRestricted
          ? '250 mg (CrCl 10–50 uyarlaması) · Standart ADVOR: 500 mg'
          : '500 mg 1×1 (Loop diüretiğe ek)',
        interval: 'Günde 1 kez (1×1)',
        duration: '3 gün boyunca (veya tam dekonjesyon sağlanana dek)',
        maxDaily: '500 mg/gün (IV furosemid / loop diüretik ile kombine)',
        prepNote:
          route === 'iv'
            ? `ADVOR orijinal IV protokolü: 500 mg IV (5 mL WFI ile sulandırılıp yavaş IV bolus veya 50 mL SF içinde 15 dk infüzyon). TR Klinik Notu: IV form Türkiye’de ruhsatlı/rutin mevcut değildir — pratikte yüksek biyoyararlanımlı (>%90) 2 × 250 mg Diazomid tablet PO/NG uygulanır.`
            : `Türkiye klinik pratiği: IV form TR’de bulunmadığından 500 mg (2 × 250 mg Diazomid tb) PO/NG yüksek biyoyararlanımla (>%90) ADVOR adaptasyonu olarak kullanılır.`,
      };
    }

    if (indication === 'iih_csf') {
      const singleDoseMg = isRenalRestricted ? 250 : 500;
      return {
        title: 'İİH / KİB Yüksekliği & BOS Kaçağı Azaltımı (NORDIC)',
        singleDoseMg,
        doseDisplay: isRenalRestricted ? '250 mg × 2/gün (CrCl 10–50)' : '500 mg × 2/gün (Başlangıç 1.000 mg/gün)',
        interval: '12 saatte bir',
        duration: 'Klinik/oftalmolojik yanıta göre haftalık +250 mg titre (BOS kaçağında 5–14 gün)',
        maxDaily: 'NORDIC protokolünde tolere edildikçe maks 4.000 mg/gün (CrCl > 50)',
        prepNote:
          route === 'iv'
            ? `${singleDoseMg} mg IV (15–30 dk infüzyon) — yurt dışı/özel ithal form mevcutsa. (TR’de rutin olarak yalnızca oral Diazomid 250 mg tb bulunur.)`
            : `Diazomid 250 mg tb × ${singleDoseMg / 250} adet sabah-akşam yemekle (GİS toleransını artırır).`,
      };
    }

    if (indication === 'acute_glaucoma') {
      const singleDoseMg = isRenalRestricted ? 250 : 500;
      return {
        title: 'Akut Açı Kapanması Glokomu (GİB Acili)',
        singleDoseMg,
        doseDisplay: `${singleDoseMg} mg yükleme, ardından 250 mg`,
        interval: isRenalRestricted ? '12 saatte bir (CrCl 10–50)' : 'Yükleme sonrası 4–6 saatte bir 250 mg',
        duration: 'Lazer iridotomi / kesin göz içi basınç kontrolüne kadar',
        maxDaily: 'Maks 1.000 mg/24 saat',
        prepNote:
          route === 'iv'
            ? `Uluslararası acil protokol: ${singleDoseMg} mg yavaş IV puşe (etki 2 dk'da başlar, 15 dk'da pik). TR Notu: IV form TR’de rutin mevcut olmadığından bulantı/kusma kontrolüyle oral Diazomid 250 mg tb + IV Mannitol uygulanır.`
            : `Bulantı/kusma yoksa Diazomid 250 mg tb × ${singleDoseMg / 250} adet oral yükleme (etki 1 sa, pik 2–4 sa).`,
      };
    }

    // ams_altitude
    return {
      title: 'Akut Dağ Hastalığı (AMS) Profilaksi & Tedavi',
      singleDoseMg: 125,
      doseDisplay: 'Profilaksi: 125 mg (½ tb) · Tedavi: 250 mg (1 tb)',
      interval: '12 saatte bir',
      duration: 'Tırmanıştan 24 sa önce başla; hedef irtifada 48 sa (veya inişe kadar) sürdür',
      maxDaily: 'Profilaksi 250 mg/gün · Tedavi 500 mg/gün',
      prepNote: 'Diazomid 250 mg çentikli tabletin yarısı (125 mg) sabah-akşam oral alınır.',
    };
  };

  const plan = getCalculatedPlan();

  const getReportText = () => {
    const warnings: string[] = [];
    if (hasCirrhosis) warnings.push('MUTLAK KONTRENDİKASYON: Siroz / hepatik ensefalopati riski!');
    if (isRenalContraindicated) warnings.push('MUTLAK KONTRENDİKASYON: CrCl < 10 mL/dk (anüri/ileri böbrek yetmezliği)!');
    if (isAcidotic) warnings.push(`MUTLAK UYARI: Bazal HCO₃⁻ ${baselineHco3} mmol/L (<22) — metabolik asidozu ağırlaştırır!`);
    if (isSevereHypokalemic) warnings.push(`MUTLAK UYARI: K⁺ ${baselineK} mEq/L (<3,0) — önce KCl replasmanı yap!`);
    else if (isHypokalemic) warnings.push(`DİKKAT: K⁺ ${baselineK} mEq/L (3,0–3,4) — asetazolamid kaliürez yapar, eş zamanlı K⁺ replase et.`);
    if (isRenalRestricted) warnings.push(`RENAL AYARLAMA: CrCl ${crCl} mL/dk (10–50) — doz aralığı en az 12 saat olmalı.`);

    return [
      'ASETAZOLAMİD (acetaZOLAMIDE) YATAK BAŞI DOZ RAPORU',
      `Senaryo: ${plan.title} (${isPediatric ? 'Pediatrik' : 'Erişkin'}, ${weightKg} kg)`,
      `Böbrek / Elektrolit: CrCl ${crCl} mL/dk | Bazal HCO₃⁻ ${baselineHco3} mmol/L | K⁺ ${baselineK} mEq/L | Siroz: ${hasCirrhosis ? 'EVET' : 'Hayır'}`,
      `Uygulama Yolu: ${route === 'iv' ? 'IV (Uluslararası 500 mg liyofilize flakon — TR’de rutin mevcut değil!)' : 'Oral / NG-OG (Diazomid 250 mg tablet — TR tek ruhsatlı form)'}`,
      hasAbsoluteBlock
        ? 'KARAR: MUTLAK KONTRENDİKASYON NEDENİYLE UYGULAMA ÖNERİLMEZ!'
        : `Önerilen Doz: ${plan.doseDisplay} | Aralık: ${plan.interval}`,
      !hasAbsoluteBlock ? `Süre: ${plan.duration} | Üst Sınır: ${plan.maxDaily}` : '',
      !hasAbsoluteBlock ? `Hazırlama: ${plan.prepNote}` : '',
      warnings.length ? `Güvenlik Uyarıları:\n- ${warnings.join('\n- ')}` : 'Güvenlik Taraması: Mutlak kontrendikasyon saptanmadı; 12–24 saat sonra AKG ve elektrolit (Na⁺, K⁺, Cl⁻, HCO₃⁻) kontrolü önerilir.',
    ]
      .filter(Boolean)
      .join('\n');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0) */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet' },
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-pkpd', label: 'PK / PD' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-dozlar', label: 'Endikasyon & Dozaj' },
          { id: 'sec-hesaplayici', label: 'Doz Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Uygulama & Uyumluluk' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON · v4.0) */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        sectionTitle="İlaç Güvenliği, Tall-Man Lettering & Doz Aşımı Yönetimi"
        tallManName="acetaZOLAMIDE"
        confusionRiskWith="acetoHEXAMIDE · acetaminophen"
        criticalAlerts={[
          'Siroz / hepatik ensefalopati riski ve ileri böbrek yetmezliği (CrCl < 10 mL/dk) uygulanmadan önce mutlaka dışlanmalıdır.',
          'Doğrudan asetazolamid anafilaksisi veya ağır SCAR (SJS/TEN/DRESS) öyküsü mutlak engeldir (ancak TMP-SMX gibi antibiyotik sülfonamid döküntüsü gerçek çapraz kontrendikasyon değildir — Strom NEJM 2003).',
          'Türkiye’de rutin olarak yalnızca oral Diazomid 250 mg tablet mevcuttur; özel ithal/yurt dışı IV 500 mg flakon yüksek alkali pH (~9,2) taşır — asla IM enjekte edilmez ve vazopressör/midazolam lümeninden verilmez.',
          'Uygulama öncesi ve 12–24 saat sonrasında mutlaka serum K⁺, Na⁺, Cl⁻ ve AKG (pH, HCO₃⁻, PaCO₂) izlenmeli; topiramat, zonisamid veya yüksek doz salisilat ile eş zamanlı kullanımdan kaçınılmalıdır.',
        ]}
        antidoteOrRescue="Spesifik antidot yoktur. Doz aşımında derin hiperkloremik metabolik asidoz, hipokalemi, somnolans ve konfüzyon gelişir. İlaç kesilir; seri AKG ve elektrolit takibiyle IV KCl replasmanı ve pH < 7,15 ağır asidemide IV Sodyum Bikarbonat desteği sağlanır. İleri böbrek yetmezliğindeki ciddi zehirlenmede hemodiyaliz klirensi hızlandırır."
      />

      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-teal-500/30 shadow-xl shadow-teal-950/20 text-slate-100'
            : 'bg-white border-teal-200 shadow-lg shadow-teal-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30 flex items-center justify-center shrink-0">
              <Pill className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/40 font-mono">
                  Karbonik Anhidraz İnhibitörü · Diüretik
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-500/30">
                  ATC: S01EC01
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  TR: YALNIZCA DİAZOMİD 250 mg TB (IV FORM TR’DE YOK)
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Asetazolamid (acetaZOLAMIDE)
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Proksimal renal tübülde karbonik anhidrazı geri dönüşümlü inhibe ederek bikarbonatüri ve hiperkloremik asidoz oluşturan non-bakteriyostatik sülfonamid; yoğun bakımda dirençli metabolik alkalozun düzeltilmesi, akut dekompanse kalp yetmezliğinde (ADVOR) sequential nefron blokajı, kafa içi basınç / BOS üretimi azaltımı (İİH, BOS rinoresi) ve akut glokom tedavisi için kanıta dayalı klinik monografi.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 shrink-0 lg:w-80">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                YBÜ Alkaloz
              </div>
              <div className="text-sm font-bold font-mono text-teal-600 dark:text-teal-400 mt-0.5 tabular-nums">
                250–500 mg / gün
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">1–3 gün kısa kür</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                ADVOR (KY)
              </div>
              <div className="text-sm font-bold font-mono text-sky-600 dark:text-sky-400 mt-0.5 tabular-nums">
                500 mg 1×1
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">Loop’a ek · TR’de PO/NG</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                KİB / BOS / Glokom
              </div>
              <div className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-0.5 tabular-nums">
                250–500 mg × 2
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">BOS &amp; aköz hümör ↓%50</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Eliminasyon
              </div>
              <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mt-0.5 tabular-nums">
                %100 Renal
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">CrCl &lt;10 &amp; Siroz: YASAK</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        summary="Asetazolamid, sitoplazmik (CA-II) ve membran-bağlı (CA-IV) karbonik anhidraz izoenzimlerinin güçlü, geri dönüşümlü ve non-kompetitif inhibitörüdür. H₂O + CO₂ ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ reaksiyonunu yavaşlatarak böbrek proksimal tübülünde bikarbonat geri emilimini, koroid pleksusta BOS sekresyonunu ve göz siliyer cisminde aköz hümör üretimini baskılar."
        pillars={[
          {
            title: '1. Proksimal Tübül (Bikarbonatüri & Natriürez)',
            detail:
              'Lümendeki H₂CO₃ dehidratasyonunu ve hücre içi H⁺ üretimini inhibe ederek apikal Na⁺/H⁺ değiştiriciyi (NHE3) durdurur. Filtre edilen HCO₃⁻ (ve Na⁺, K⁺, H₂O) geri emilemez; idrar pH’sı >7,5’e yükselir, plazmada hiperkloremik (normal AG’li) metabolik asidoz gelişir.',
          },
          {
            title: '2. Koroid Pleksus & Siliyer Cisim (BOS / GİB ↓)',
            detail:
              'Koroid pleksusta Na⁺/HCO₃⁻ taşınımını baskılayarak BOS üretim hızını yaklaşık %40–50 oranında azaltır (İİH, BOS rinoresi ve geçici şant köprülemesi). Siliyer epitelde aköz hümör yapımını ~%50 düşürerek göz içi basıncını hızla indirir.',
          },
          {
            title: '3. Santral Kemoreseptör & Solunum Uyarımı',
            detail:
              'Oluşturduğu hafif hiperkloremik metabolik asidoz BOS pH’sını düşürerek medüller kemoreseptörleri uyarır, dakika ventilasyonunu artırır (yüksek irtifa aklimatizasyonu, santral uyku apnesi). Ancak yüksek dozda eritrosit CA inhibisyonu doku CO₂ klirensini yavaşlatabilir.',
          },
        ]}
      />

      {/* 3. FARMAKOKİNETİK & FARMAKODİNAMİK PROFİLİ */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Clock className={`h-5 w-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
            <div>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Farmakokinetik ve Farmakodinamik (PK/PD) Profili
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Yüksek oral biyoyararlanım · Hepatik metabolizma yok · %100 renal sekresyon · 48–72 saatte kendini sınırlayan diürez
              </p>
            </div>
          </div>
          {pkOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                  <th className="py-2.5 pr-4 font-semibold">Parametre</th>
                  <th className="py-2.5 pr-4 font-semibold">Değer (Erişkin)</th>
                  <th className="py-2.5 font-semibold">Klinik Yorum</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-mono tabular-nums ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Oral Biyoyararlanım</td>
                  <td className="py-2.5 pr-4 text-teal-600 dark:text-teal-400 font-bold">&gt; %90 (Hızlı)</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">GİS emilimi mükemmeldir; fonksiyonel bağırsakta PO/NG uygulama IV’ye yakın plazma düzeyi sağlar.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Başlangıcı / Pik</td>
                  <td className="py-2.5 pr-4">IV: 2 dk / 15 dk · PO: 1 sa / 1–4 sa</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">GİB acilinde IV en hızlıdır; YBÜ metabolik alkalozunda HCO₃⁻ düşüşü 12–24 saatte belirginleşir.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Süresi</td>
                  <td className="py-2.5 pr-4">IV: 4–5 sa · PO: 8–12 sa</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Tek doz 500 mg IV’nin bikarbonat düşürücü etkisi 48–72 saate kadar sürebilir (Mazur RCT).</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Protein Bağlanması &amp; Vd</td>
                  <td className="py-2.5 pr-4">%90–95 · Vd ~0,2–0,3 L/kg</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Plazma albüminine ve eritrosit içi karbonik anhidraza yüksek afiniteyle bağlanır.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Eliminasyon Yarı Ömrü (t½)</td>
                  <td className="py-2.5 pr-4">2,5 – 6 saat (Bifazik)</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Yaşlılarda ve eGFR &lt;50 mL/dk hastalarında klirens azalır; birikim ve ağır asidoz riski doğar.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Metabolizma &amp; Atılım</td>
                  <td className="py-2.5 pr-4 text-rose-600 dark:text-rose-400 font-bold">Hepatik Yok · %100 Renal</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">24 saat içinde proksimal tübüler organik anyon sekresyonu ve pasif geri emilimle değişmeden atılır.</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Diüretik Tolerans</td>
                  <td className="py-2.5 pr-4">48 – 72 saat</td>
                  <td className="py-2.5 font-sans text-xs text-slate-600 dark:text-slate-300">Plazma HCO₃⁻ düştükçe filtre edilen bikarbonat azalır ve diüretik etki kendini sınırlar; kısa kürler (1–3 gün) tercih edilir.</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 4. MUTLAK VE RELATİF KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE!) */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Siroz veya belirgin karaciğer yetmezliği / hepatik ensefalopati riski (idrar alkalinizasyonu renal NH₃ geri emilimini artırarak hiperamonyemik komayı tetikler!).',
          'İleri böbrek yetmezliği veya anüri (CrCl < 10 mL/dk — %100 renal atılım nedeniyle ilaç birikir, derin hiperkloremik asidoz ve SSS toksisitesi gelişir).',
          'Belirgin hiponatremi (Na⁺ < 130 mEq/L) veya düzeltilmemiş hipokalemi (K⁺ < 3,0 mEq/L).',
          'Hiperkloremik (normal anyon açıklı) metabolik asidoz veya pH < 7,30 asidemi.',
          'Adrenokortikal yetmezlik (Addison hastalığı — elektrolit dengesizliği ve şok riskini artırır).',
          'Doğrudan asetazolamide anafilaksi veya geçmişte ağır SCAR (Stevens-Johnson sendromu, TEN, DRESS, aplastik anemi) öyküsü (Not: antibiyotik sülfonamid [TMP-SMX] döküntüsü gerçek çapraz kontrendikasyon değildir — Strom NEJM 2003).',
          'Kronik non-konjestif açı kapanması glokomunda uzun süreli kullanım (organik açı kapanmasını maskeler).',
        ]}
        relativeItems={[
          'İleri KOAH / hiperkapnik solunum yetmezliği: Yüksek doz eritrosit CA inhibisyonu CO₂ taşınımını bozabilir; DIABOLO çalışması mekanik ventilasyon süresini kısaltmadığını göstermiştir.',
          'Orta böbrek yetmezliği (CrCl 10–50 mL/dk): Doz aralığı en az 12 saat olmalı ve seri AKG izlenmelidir.',
          'Kalsiyum fosfat nefrolitiyazis öyküsü (alkali idrar ve hipositratüri taş oluşumunu kolaylaştırır).',
          'Yüksek doz salisilat tedavisi alan hastalar (sistemik asidemi salisilatın beyne geçişini ve toksisitesini dramatik artırır!).',
          'Kontrolsüz diyabet (glukoz regülasyon dalgalanması) ve gut / hiperürisemi.',
        ]}
        clinicalNote="Yoğun bakımda metabolik alkalozun ilk tedavisi asetazolamid değil, varsa hipovolemi ve K⁺/Cl⁻ açığının izotonik NaCl + KCl ile düzeltilmesidir. Asetazolamid özellikle volüm yüklü, klora dirençli veya agresif loop diüretik sonrası gelişen alkalozda (pH > 7,48 ve HCO₃⁻ > 30 mmol/L) seçilmiş hastalarda kısa kür olarak kullanılır."
      />

      {/* 5. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ */}
      <section
        id="sec-dozlar"
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Stethoscope className={`h-5 w-5 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
          <div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Klinik Endikasyonlar ve Kanıta Dayalı Doz Rejimleri
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Yoğun bakım, kardiyoloji (ADVOR), nöroşirürji/nöroloji (NORDIC), oftalmoloji ve pediatri protokolleri
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: ICU Metabolic Alkalosis */}
          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-teal-500/30' : 'bg-teal-50/40 border-teal-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-teal-700 dark:text-teal-300">
                <Wind className="w-4 h-4 shrink-0" />
                <span>1. YBÜ Metabolik Alkaloz (Post-Diüretik / Weaning)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 font-bold">
                Mazur · DIABOLO
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              250–500 mg PO/NG veya IV × 1–2/gün (1–3 gün)
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              pH &gt; 7,48 ve HCO₃⁻ &gt; 30 mmol/L olan, volüm/K⁺/Cl⁻ replasmanına rağmen süren alkalozda tercih edilir. Mazur RCT’si tek doz 500 mg IV’nin 4×250 mg IV kadar etkin HCO₃⁻ düşüşü (~4–6 mmol/L) sağladığını göstermiştir.
            </p>
          </div>

          {/* Card 2: ADVOR Acute Heart Failure */}
          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-sky-500/30' : 'bg-sky-50/40 border-sky-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-sky-700 dark:text-sky-300">
                <HeartPulse className="w-4 h-4 shrink-0" />
                <span>2. Akut Dekompanse Kalp Yetmezliği (ADVOR)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-700 dark:text-sky-300 font-bold">
                NEJM 2022
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              500 mg IV 1×1 (3 gün) + Standart IV Loop Diüretik
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Proksimal tübülde Na⁺ geri emilimini kırarak loop diüretik direncini aşar. ADVOR çalışmasında 3 günde tam dekonjesyon oranını %30,5’ten %42,2’ye yükseltti (özellikle bazal HCO₃⁻ ≥ 27 mmol/L alt grubunda).
            </p>
          </div>

          {/* Card 3: IIH & CSF Leak */}
          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-indigo-500/30' : 'bg-indigo-50/40 border-indigo-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-indigo-700 dark:text-indigo-300">
                <Brain className="w-4 h-4 shrink-0" />
                <span>3. İİH, KİB Yüksekliği &amp; BOS Kaçağı (Rinore)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold">
                NORDIC 2014
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              500 mg PO × 2/gün başlangıç (Maks 4 g/gün titre)
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Koroid pleksus BOS üretimini %40–50 azaltır. Postoperatif/travmatik BOS rinoresi ve geçici şant disfonksiyonu köprülemesinde 250–500 mg × 2–3/gün kullanılır.
            </p>
          </div>

          {/* Card 4: Acute Glaucoma & AMS */}
          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-950/60 border-amber-500/30' : 'bg-amber-50/40 border-amber-200'}`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-700 dark:text-amber-300">
                <Eye className="w-4 h-4 shrink-0" />
                <span>4. Akut Glokom (GİB Acili) &amp; Yüksek İrtifa</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 font-bold">
                GİB / AMS
              </span>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 dark:text-white">
              Glokom: 500 mg IV/PO yükleme → 250 mg q4–6h (Maks 1 g/gün)
            </p>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Akut açı kapanması glokomunda hızlı GİB düşüşü sağlar. Akut Dağ Hastalığı (AMS) profilaksisinde 125 mg PO × 2/gün (tırmanıştan 24 sa önce), tedavide 250 mg PO × 2/gün uygulanır.
            </p>
          </div>
        </div>

        {/* Pediatric dosing strip */}
        <div className={`rounded-xl border p-3.5 text-xs leading-relaxed ${isDark ? 'bg-slate-950/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
          <strong className={isDark ? 'text-white' : 'text-slate-900'}>Pediatrik Doz Özeti: </strong>
          Metabolik alkaloz / diürez: <span className="font-mono font-semibold">5 mg/kg/doz</span> (maks 250 mg) 12–24 sa arayla · İİH / glokom: <span className="font-mono font-semibold">8–30 mg/kg/gün</span> (3–4 bölünmüş dozda, maks 1.000 mg/gün) · Geçici hidrosefali/BOS azaltımı: <span className="font-mono font-semibold">20–50 mg/kg/gün</span> (yakın AKG ve K⁺ izlemiyle).
        </div>
      </section>

      {/* 6. ETKİLEŞİMLİ YATAK BAŞI DOZ & GÜVENLİK HESAPLAYICISI */}
      <section
        id="sec-hesaplayici"
        className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${
          isDark ? 'border-teal-500/35 bg-slate-900/90' : 'border-teal-200 bg-white shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Activity className="h-5 w-5 text-teal-500" />
            <div>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Yatak Başı Doz, Renal Uyarlama ve Güvenlik Hesaplayıcısı
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Endikasyon, eGFR/CrCl, bazal HCO₃⁻, K⁺ ve siroz durumuna göre otomatik doz ve kontrendikasyon kontrolü
              </p>
            </div>
          </div>

          <MonographCopyButton isDark={isDark} getText={getReportText} label="Doz Raporunu Kopyala" />
        </div>

        {/* Indication Selector */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'icu_alkalosis', label: 'YBÜ Metabolik Alkaloz', icon: Wind },
            { id: 'advor_hf', label: 'ADVOR Kalp Yetmezliği', icon: HeartPulse },
            { id: 'iih_csf', label: 'KİB / İİH / BOS Kaçağı', icon: Brain },
            { id: 'acute_glaucoma', label: 'Akut Glokom', icon: Eye },
            { id: 'ams_altitude', label: 'Yüksek İrtifa (AMS)', icon: Mountain },
          ].map((item) => {
            const Icon = item.icon;
            const active = indication === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setIndication(item.id as AcetazolamideIndication);
                  if (item.id === 'advor_hf') setRoute('iv');
                  if (item.id === 'ams_altitude') setRoute('po_ng');
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                      : 'bg-teal-50 border-teal-500 text-teal-900'
                    : isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Inputs */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Adult/Peds + Route toggles */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className={`p-1 rounded-lg border flex ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <button
                  type="button"
                  onClick={() => {
                    setIsPediatric(false);
                    if (weightKg < 40) setWeightKg(75);
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                    !isPediatric
                      ? isDark ? 'bg-teal-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Erişkin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPediatric(true);
                    if (weightKg > 45) setWeightKg(20);
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                    isPediatric
                      ? isDark ? 'bg-teal-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  Pediatrik
                </button>
              </div>

              <div className={`p-1 rounded-lg border flex ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <button
                  type="button"
                  onClick={() => setRoute('po_ng')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                    route === 'po_ng'
                      ? isDark ? 'bg-sky-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  PO / NG (TB)
                </button>
                <button
                  type="button"
                  onClick={() => setRoute('iv')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-md cursor-pointer transition-colors ${
                    route === 'iv'
                      ? isDark ? 'bg-sky-600 text-white' : 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500'
                  }`}
                >
                  IV Flakon
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={weightId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ağırlık (kg)
                </label>
                <input
                  id={weightId}
                  type="number"
                  min={2}
                  max={220}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(2, Number(e.target.value) || 0))}
                  className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label htmlFor={crClId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  CrCl / eGFR (mL/dk)
                </label>
                <input
                  id={crClId}
                  type="number"
                  min={0}
                  max={160}
                  value={crCl}
                  onChange={(e) => setCrCl(Math.max(0, Number(e.target.value) || 0))}
                  className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                    isRenalContraindicated
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                      : isDark
                        ? 'bg-slate-950 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label htmlFor={hco3Id} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bazal HCO₃⁻ (mmol/L)
                </label>
                <input
                  id={hco3Id}
                  type="number"
                  min={5}
                  max={55}
                  step={0.5}
                  value={baselineHco3}
                  onChange={(e) => setBaselineHco3(Math.max(5, Number(e.target.value) || 0))}
                  className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                    isAcidotic
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                      : isDark
                        ? 'bg-slate-950 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label htmlFor={kId} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Serum K⁺ (mEq/L)
                </label>
                <input
                  id={kId}
                  type="number"
                  min={1.5}
                  max={8.0}
                  step={0.1}
                  value={baselineK}
                  onChange={(e) => setBaselineK(Math.max(1.5, Number(e.target.value) || 0))}
                  className={`w-full px-3 py-2 text-sm font-mono tabular-nums rounded-lg border ${
                    isSevereHypokalemic
                      ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-300'
                      : isHypokalemic
                        ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300'
                        : isDark
                          ? 'bg-slate-950 border-slate-700 text-white'
                          : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <label
              className={`flex items-center justify-between gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                hasCirrhosis
                  ? isDark
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                  : isDark
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-xs font-semibold">
                Siroz / Şiddetli Karaciğer Yetmezliği Mevcut
              </span>
              <input
                type="checkbox"
                checked={hasCirrhosis}
                onChange={(e) => setHasCirrhosis(e.target.checked)}
                className="w-4 h-4 accent-rose-600 cursor-pointer"
              />
            </label>
          </div>

          {/* Right Live Output */}
          <div className="lg:col-span-7 space-y-3">
            {hasAbsoluteBlock ? (
              <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-rose-950/40 border-rose-500/50 text-rose-100' : 'bg-rose-50 border-rose-300 text-rose-950'}`}>
                <div className="flex items-center gap-2 font-bold text-sm text-rose-600 dark:text-rose-300">
                  <ShieldAlert className="w-5 h-5 shrink-0" />
                  <span>UYGULAMA DURDURULDU — MUTLAK KONTRENDİKASYON / GÜVENLİK ENGELİ</span>
                </div>
                <ul className="space-y-1.5 text-xs leading-relaxed list-disc pl-5">
                  {hasCirrhosis && (
                    <li>
                      <strong>Siroz / Hepatik Ensefalopati:</strong> İdrar alkalinizasyonu NH₃ geri emilimini artırarak hiperamonyemik komayı tetikler; asetazolamid kullanılmamalıdır.
                    </li>
                  )}
                  {isRenalContraindicated && (
                    <li>
                      <strong>İleri Böbrek Yetmezliği (CrCl {crCl} mL/dk &lt; 10):</strong> İlaç %100 böbrekten değişmeden atılır; birikim ve ağır hiperkloremik metabolik asidoz riski nedeniyle kontrendikedir.
                    </li>
                  )}
                  {isAcidotic && (
                    <li>
                      <strong>Metabolik Asidoz (HCO₃⁻ {baselineHco3} mmol/L &lt; 22):</strong> Bikarbonatüri mevcut asidemiyi kritik düzeyde derinleştirir.
                    </li>
                  )}
                  {isSevereHypokalemic && (
                    <li>
                      <strong>Ciddi Hipokalemi (K⁺ {baselineK} mEq/L &lt; 3,0):</strong> Asetazolamid distal nefronda K⁺ kaybını artırır; önce IV KCl ile K⁺ ≥ 3,5 mEq/L hedefine yükseltilmelidir.
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/75 border-teal-500/35' : 'bg-teal-50/50 border-teal-200'}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    {plan.title}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mutlak Engel Yok</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">Önerilen Doz</div>
                    <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5 tabular-nums">
                      {plan.doseDisplay}
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">Doz Aralığı</div>
                    <div className="text-sm font-bold font-mono text-teal-700 dark:text-teal-300 mt-0.5">
                      {plan.interval}
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs space-y-1.5 leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <div>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>Hazırlama &amp; Uygulama: </strong>
                    {plan.prepNote}
                  </div>
                  <div>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>Süre &amp; Tavan: </strong>
                    {plan.duration} · <span className="font-mono">{plan.maxDaily}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Renal / Hypokalemia Caution Banners */}
            {(isRenalRestricted || (isHypokalemic && !isSevereHypokalemic)) && !hasAbsoluteBlock && (
              <div className={`rounded-xl border p-3.5 space-y-1.5 text-xs ${isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Aktif Doz / Elektrolit Uyarısı</span>
                </div>
                {isRenalRestricted && (
                  <p>
                    <strong>Renal Ayarlama (CrCl {crCl} mL/dk):</strong> Doz aralığı en az 12 saat olmalı (q6h / q8h verilmez); ilaç birikimi ve hiperkloremik asidoz açısından 12–24 saatte AKG takip edilmelidir.
                  </p>
                )}
                {isHypokalemic && !isSevereHypokalemic && (
                  <p>
                    <strong>Sınırda Hipokalemi (K⁺ {baselineK} mEq/L):</strong> Asetazolamid belirgin kaliürez yapar; eş zamanlı KCl replasmanı planlayın ve 6–12 saat içinde serum K⁺ kontrol edin.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0) */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Diazomid 250 mg Çentikli Tablet (Türkiye’deki Tek Ruhsatlı / Rutin Form!)',
            presentation: 'Oral kullanım için 250 mg çentikli tablet — Türkiye piyasasında ruhsatlı ve hastanelerde rutin olarak bulunan YALNIZCA oral tablet formudur',
            concentration: '250 mg / tablet',
            saltOrBaseNote: 'Oral biyoyararlanımı > %90 (mükemmel GİS emilimi)! Entübe/YBÜ hastalarında tablet ezilip 10–20 mL suyla süspanse edilerek NG/OG tüpten etkin biçimde uygulanabilir (tüp öncesi/sonrası 20 mL suyla yıkanır).',
            alertLevel: 'high',
          },
          {
            name: 'IV 500 mg Liyofilize Flakon (Türkiye’de Ruhsatlı / Rutin Mevcut DEĞİL!)',
            presentation: 'Uluslararası literatürde (ADVOR, Mazur, acil glokom) geçen 500 mg sodyum tuzu liyofilize flakon formu Türkiye’de ruhsatlı değildir ve rutin hastane stoklarında bulunmaz',
            concentration: 'TR’de Rutin Yok (Yurt Dışı: 100 mg/mL WFI)',
            saltOrBaseNote: 'Önemli TR Klinik Notu: IV form yalnızca özel yurt dışı ilaç temini (TEB/TİTCK) ile sınırlı olgularda bulunur. Pratikte fonksiyonel GİS/NG yolu olan hastalarda oral/NG Diazomid 250 mg tb (500 mg = 2 tablet) >%90 biyoyararlanımla IV’ye yakın plazma düzeyi sağlar.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Türkiye Standart Oral / NG-OG Uygulama: Diazomid 250 mg tablet (125 mg = ½ tb, 250 mg = 1 tb, 500 mg = 2 tb). NG/OG için ince toz haline getirilip 15–20 mL su ile süspanse edilir.',
          'Uluslararası / Özel İthal IV Hazırlama (500 mg Flakon Mevcutsa): En az 5 mL steril enjeksiyonluk su (WFI) ile sulandırılır (100 mg/mL, pH ~9,2). Yavaş IV puşe (100–500 mg/dk, 1–5 dk) veya 50–100 mL %0,9 NaCl / %5 Dekstroz içinde 15–30 dk infüzyon olarak uygulanır.',
        ]}
        concentrationTrapWarning="Türkiye’de IV Asetazolamid (Diamox IV) rutin olarak mevcut değildir; order yazarken '500 mg IV' istemi hastane eczanesinde karşılanamaz! Fonksiyonel GİS’i olan hastalarda 2 × 250 mg Diazomid tb (PO/NG) planlayın; özel ithal IV form kullanılıyorsa ASLA intramüsküler (IM) enjekte etmeyin (alkali pH ~9,2 şiddetli ağrı ve doku nekrozu yapar)."
      />

      {/* UYGULAMA YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0) */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionTitle="Uygulama Yolu, pH/Ozmolalite, Y-Site Uyumluluk & Ekstravazasyon"
        accessRequirement="peripheral-ok"
        accessSummary="Türkiye klinik pratiğinde standart uygulama yolu ORAL veya NG/OG tüptür (Diazomid 250 mg tablet, >%90 biyoyararlanım). Yurt dışı/özel ithal 500 mg IV flakon mevcutsa periferik veya santral IV hattan uygulanabilir; ancak yüksek alkali pH (~9,2) nedeniyle katekolaminler ve asidik ilaçlardan ayrı lümenden verilmeli ve ASLA intramüsküler (IM) uygulanmamalıdır."
        phRange="IV Çözelti: ~9,2 (Kuvvetli Alkali)"
        osmolalityNote="100 mg/mL WFI sulandırılmış IV çözelti izotonik–hafif hiperozmolar ve yüksek alkalidir; IM enjeksiyon şiddetli ağrı ve steril apse/nekroz yapar."
        compatibleDiluents={[
          'Oral / NG-OG (TR Standart): 10–20 mL içme suyu veya steril su (enteral tüp öncesi/sonrası 20 mL suyla yıkama)',
          'IV İlk Sulandırma (İthal Flakon): En az 5 mL Steril Enjeksiyonluk Su (WFI) → 100 mg/mL',
          'IV İnfüzyon Taşıyıcıları: %0,9 NaCl (SF) veya %5 Dekstroz (50–100 mL içinde 15–30 dk)',
        ]}
        stabilityNote="Diazomid 250 mg tablet 15–25 °C oda sıcaklığında nemden korunarak saklanır. Koruyucu içermeyen sulandırılmış IV çözelti oda sıcaklığında 12 saat, buzdolabında (2–8 °C) 24 saat stabildir."
        ySiteCompatible={[
          '%0,9 NaCl (SF)',
          '%5 Dekstroz',
          'Potasyum Klorür (KCl)',
          'Sodyum Bikarbonat',
          'Heparin',
          'Sefazolin / Piperasilin-Tazobaktam',
        ]}
        ySiteIncompatible={[
          'Noradrenalin (Alkali İnaktivasyon!)',
          'Adrenalin (Epinefrin)',
          'Dopamin / Dobutamin',
          'Midazolam',
          'Diltiazem',
          'Multivitamin / Asidik TPN',
          'İntramüsküler (IM) Enjeksiyon YASAK',
        ]}
        extravasationProtocol="IV formun (pH ~9,2) ekstravazasyonunda yüksek alkalinite nedeniyle lokal doku irritasyonu ve nekroz gelişebilir: infüzyonu derhal durdurun, kateterden aspire etmeye çalışın, ekstremiteyi eleve edin ve soğuk kompres uygulayın. IM uygulama kesinlikle kontrendikedir."
      />

      {/* 8. BÖBREK & KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Ana atılım yolu (%100 değişmeden böbrekten). CrCl < 10 mL/dk: KONTRENDİKE."
        renalDetails={[
          'CrCl > 50 mL/dk: Standart doz aralığı (q6h–q24h, endikasyona göre).',
          'CrCl 10–50 mL/dk: Doz aralığı en az 12 saat (≥ q12h) olmalıdır; ilaç birikimi ile uzamış hiperkloremik asidoz ve nörotoksisite gelişebilir.',
          'CrCl < 10 mL/dk veya anüri: Kullanımı kontrendikedir (etkisiz diürez + ağır toksisite riski).',
          'Hemodiyaliz / CRRT: Orta düzeyde (~%20–30) diyalize olur; diyaliz hastalarında rutin kullanılmaz.',
        ]}
        hepaticSummary="Karaciğerde metabolize olmaz, ANCAK siroz ve ağır karaciğer yetmezliğinde KONTRENDİKEDİR."
        hepaticDetails={[
          'Child-Pugh B/C veya portal hipertansiyon/siroz: İdrar alkalinizasyonu tübülde amonyum (NH₄⁺) iyonunu lipofilik amonyağa (NH₃) dönüştürür ve sistemik geri emilimi artırır.',
          'Hızlı hiperamonyemi ve hepatik ensefalopati / koma presipitasyonu nedeniyle sirotik asitte asla diüretik olarak tercih edilmez (spironolakton + furosemid seçilir).',
        ]}
        {...STANDALONE_ORGAN_PART1['acetazolamide']}
      />

      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0) */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="CrCl’ye Göre Aralık Uzat · Ağır Asidoz Riski"
        geriatricPoints={[
          'Asetazolamid %100 böbrekten değişmeden atıldığından >65 yaş hastalarda fizyolojik GFR düşüşü ilaç birikimine, derin hiperkloremik metabolik asidoza (pH < 7,25), somnolans, konfüzyon ve düşmelere yol açabilir.',
          'Yaşlılarda mutlaka Cockcroft-Gault CrCl hesaplanmalı; CrCl 10–50 mL/dk aralığında doz aralığı ≥ 12 saat olmalı ve 250 mg/doz ile başlanmalıdır.',
          'Elektrolit kaybı (K⁺, Na⁺) ve dehidratasyon yaşlılarda deliryum ve ortostatik hipotansiyonu hızla tetikler; 12–24 saat içinde AKG ve elektrolit kontrolü şarttır.',
        ]}
        obesityWeightScalarBadge="Sabit Erişkin Dozu · İİH’de Yüksek Doz Toleransı"
        obesityPoints={[
          'Erişkinlerde obeziteye göre mg/kg artışı yapılmaz; sabit endikasyon dozları (250–500 mg/doz) uygulanır.',
          'İdiyopatik İntrakraniyal Hipertansiyon (İİH) ağırlıklı olarak obez genç erişkinlerde görülür: NORDIC IIHTT çalışmasında (JAMA 2014) 500 mg × 2/gün başlanıp tolere edildikçe 4.000 mg/gün’e kadar çıkılmasının kilo kaybıyla sinerjik olarak görme alanını iyileştirdiği gösterilmiştir.',
          'Yüksek doz kronik İİH tedavisinde hipokalemi, metabolik asidoz ve kalsiyum fosfat böbrek taşı açısından periyodik izlem ve hidrasyon gerekir.',
        ]}
        clinicalNote="Yaşlı hastalarda gizli böbrek yetmezliği (normal görünen serum kreatinin + düşük kas kütlesi) asetazolamid toksisitesinin en sık nedenidir."
      />

      {/* 9. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="1. trimesterde organogenez döneminde kaçınılır; görmeyi tehdit eden İİH’de 20. haftadan sonra risk–yarar ile değerlendirilir."
        pregnancyDetails={[
          'Hayvan çalışmalarında yüksek dozlarda ekstremite (postaksiyel ektrodaktili) malformasyonları bildirilmiştir (eski FDA Kategori C).',
          'İnsan kohort verilerinde özellikle 2. ve 3. trimesterde İİH için kullanımında majör teratojenite artışı saptanmamıştır; ancak zorunlu değilse 1. trimesterde ertelenir.',
          'Doğuma yakın kullanımda yenidoğanda geçici metabolik asidoz, hipokalsemi ve hipomagnezemi açısından pediatri bilgilendirilmelidir.',
        ]}
        lactationSummary="Anne sütüne çok düşük düzeyde geçer (< %1 göreceli bebek dozu); genellikle emzirme ile uyumludur."
        lactationDetails={[
          'Süt/plazma oranı ~0,25–0,30 olup emzirilen bebekte anlamlı sistemik karbonik anhidraz inhibisyonu beklenmez (AAP ve LactMed uyumlu).',
          'Yüksek maternal dozlarda (>1 g/gün) yenidoğanda beslenme, idrar çıkışı ve elektrolit takibi önerilir.',
        ]}
      />

      {/* 10. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Hiperkloremik Metabolik Asidoz',
            incidenceOrSeverity: 'Beklenen Etki',
            detail: 'Normal anyon açıklı (NAGMA) asidoz oluşturur. CrCl < 50 mL/dk veya yaşlılarda derinleşip pH < 7,25’e inebilir.',
            tone: 'amber',
          },
          {
            title: 'Hipokalemi & Hiponatremi',
            incidenceOrSeverity: 'Sık',
            detail: 'Distal nefrona yüksek Na⁺ ve HCO₃⁻ ulaşması aldosteron aracılı K⁺ sekresyonunu hızlandırır; aritmi riski doğar.',
            tone: 'rose',
          },
          {
            title: 'Parestezi & Disguzi',
            incidenceOrSeverity: 'Çok Sık',
            detail: 'Parmak uçları ve perioral uyuşma/karıncalanma ile karbonatlı içeceklerin metalik/tatsız algılanması (zararsız ancak sık bırakma nedeni).',
            tone: 'indigo',
          },
          {
            title: 'Sülfonamid Aşırı Duyarlılığı',
            incidenceOrSeverity: 'Nadir / Ağır',
            detail: 'Stevens-Johnson sendromu (SJS), TEN, fulminan hepatik nekroz, agranülositoz ve aplastik anemi gelişebilir; döküntüde derhal kesilir.',
            tone: 'rose',
          },
          {
            title: 'Nefrolitiyazis (Kalsiyum Fosfat)',
            incidenceOrSeverity: 'Kronik Kullanım',
            detail: 'Alkali idrar ve şiddetli hipositratüri nedeniyle kalsiyum fosfat taşları oluşur; uzun süreli İİH tedavisinde bol hidrasyon şarttır.',
            tone: 'amber',
          },
          {
            title: 'Hepatik Ensefalopati',
            incidenceOrSeverity: 'Sirozda Kritik',
            detail: 'Alkali idrarda amonyak (NH₃) geri emiliminin artmasıyla sirotik hastada saatler içinde bilinç bulanıklığı ve koma gelişebilir.',
            tone: 'rose',
          },
          {
            title: 'Hiperkapni Kötüleşmesi (KOAH)',
            incidenceOrSeverity: 'Solunum Riski',
            detail: 'Yüksek dozda eritrosit karbonik anhidraz inhibisyonu doku-akciğer CO₂ transferini yavaşlatıp solunum kas yorgunluğunda PaCO₂’yi yükseltebilir.',
            tone: 'amber',
          },
          {
            title: 'Geçici Miyopi & Koroidal Efüzyon',
            incidenceOrSeverity: 'Nadir (Oküler)',
            detail: 'İdiyosenkratik sülfonamid yanıtı olarak siliyer cisim ödemi ve sekonder açı kapanması gelişebilir; görme bulanıklığında ilaç kesilir.',
            tone: 'teal',
          },
        ]}
      />

      {/* 11. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Salisilat Zehirlenmesinde ASLA Kullanılmaz',
            detail:
              'Asetazolamid idrarı alkalize etse de sistemik asidemi yaratır; asidemik kanda salisilat non-iyonize forma geçerek kan-beyin bariyerini hızla aşar ve ölümcül SSS toksisitesi yapar. İdrar alkalinizasyonu yalnızca IV NaHCO₃ ile yapılır.',
          },
          {
            title: 'Metabolik Alkalozda İlk Basamak Değildir',
            detail:
              'Kusma/NG drenaj veya hipovolemik kontraksiyon alkalozunda (idrar Cl⁻ < 20 mEq/L) primer tedavi %0,9 NaCl + KCl’dir. Asetazolamid sıvı yüklenmesinin tolere edilemediği veya loop diüretiğe bağlı alkalozda devreye girer.',
          },
          {
            title: 'KOAH & DIABOLO Çalışması Perspektifi',
            detail:
              'DIABOLO RCT’sinde (JAMA 2016) invaziv mekanik ventilasyondaki KOAH hastalarında asetazolamid serum HCO₃⁻ düzeyini düşürmüş ancak ventilasyon süresini anlamlı kısaltmamıştır; rutin değil seçilmiş ağır alkalozda (pH > 7,50) uygulanmalıdır.',
          },
          {
            title: 'ADVOR Sequential Nefron Blokajı',
            detail:
              'Akut dekompanse kalp yetmezliğinde yüksek doz loop diüretik proksimal Na⁺ emilimini artırarak direnç yaratır; 500 mg asetazolamid (TR’de oral/NG 2×250 mg Diazomid tb) 3 gün eklendiğinde natriürez ve tam dekonjesyon anlamlı artar.',
          },
          {
            title: 'Nöroanestezi & Ventriküler Şant Preop Hazırlığı',
            detail:
              'Kronik asetazolamid kullanan İİH veya hidrosefali hastaları ameliyathaneye normal AG’li metabolik asidoz ve hipokalemiyle gelir; preoperatif AKG ve K⁺ kontrol edilmeden indüksiyon yapılmamalıdır.',
          },
          {
            title: 'Lityum, Metotreksat & Antikonvülzan Etkileşimleri',
            detail:
              'Asetazolamid lityum klirensini artırarak düzeyini düşürür; yüksek doz metotreksat klirensini değiştirebilir; topiramat veya zonisamid (diğer CA inhibitörleri) ile birlikte kullanıldığında ağır metabolik asidoz ve böbrek taşı riski katlanır.',
          },
          {
            title: 'Sülfonamid Çapraz Reaksiyon Miti (Strom NEJM 2003 · AAAAI)',
            detail:
              'Asetazolamid non-antibiyotik bir sülfonamiddir; TMP-SMX gibi antibiyotik sülfonamid alerjisi asetazolamid için gerçek çapraz kontrendikasyon oluşturmaz (ağır SJS/TEN/DRESS veya doğrudan asetazolamid anafilaksisi hariç).',
          },
        ]}
      />

      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Apikal/Bazolateral Membran CA-IV & Sitozolik CA-II Çinko [Zn²⁺] Aktif Bölge İnhibisyonu)',
          summary:
            'Asetazolamid (N-(5-sülfamoil-1,3,4-tiyadiazol-2-il)asetamid), serbest –SO₂NH₂ (sülfonamid) ucuyla Karbonik Anhidraz (CA) metalloenzimlerinin katalitik oyuğundaki prostetik Çinko iyonuna (Zn²⁺) dördüncü koordinasyon bağıyla non-kompetitif ve yüksek afiniteyle (Ki ~10 nM) bağlanarak su/hidroksil iyonunun Zn²⁺ merkezine erişimini bloke eder (Goodman & Gilman / Miller’s 10th Ed.):',
          points: [
            'Böbrek Proksimal Kıvrımlı Tübül (PCT) Apikal Fırçamsı Kenar & Bazolateral Zarı (Membran-Bağlı CA-IV): Proksimal tübül (S1–S2) epitel hücrelerinin lüminal fırçamsı kenarına glikozilfosfatidilinozitol (GPI) çapasıyla bağlı ekstraselüler Karbonik Anhidraz Tip IV (CA-IV) ve bazolateral membranla ilişkili CA-IV/CA-XII izoenzimlerini doğrudan inhibe eder.',
            'Proksimal Tübül Epiteli Sitoplazması (Sitozolik CA-II): Proksimal tübül hücrelerinin sitozolünde çok yüksek konsantrasyonda bulunan çözünür Karbonik Anhidraz Tip II (CA-II) izoenzimini inhibe eder (anlamlı fizyolojik diürez için enzimin >%99’unun bloke edilmesi şarttır).',
            'Koroid Pleksus Ependimal Epiteli & Göz Siliyer Cisim Non-Pigmente Epiteli (CA-II / CA-IV / CA-XII): Beyin ventriküllerindeki koroid pleksus epitel hücreleri ile göz siliyer cismi (corpus ciliare) non-pigmente epitel hücrelerindeki sitozolik CA-II ve membran CA-IV/XII izoenzimlerini bloke eder.',
            'Eritrosit Sitozolü (CA-I & CA-II) ve Periferik/Santral Kemoreseptör Hücreleri: Eritrosit içindeki CA-I ve yüksek hızlı CA-II’ye yüksek afiniteyle bağlanarak CO₂ hidratasyon/dehidratasyonunu (Hamburger fenomeni) yavaşlatır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'CA-IV ve CA-II’nin >%99 oranında inhibisyonu, H₂O + CO₂ ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ tersinir reaksiyon hızını ~10.000 kat düşürerek dört hedef hücre tipinde transselüler iyon taşınımını kilitler:',
          points: [
            'Proksimal Tübül Hücresi İçi H⁺ Tükenmesi → Apikal NHE3 & Bazolateral NBCe1 Durması: Sitozolik CA-II bloke olduğunda hücre içinde H₂O + CO₂’den H⁺ ve HCO₃⁻ üretilemez. Hücre içi H⁺ substratı tükendiği anda apikal zardaki Na⁺/H⁺ Değiştirici-3 (NHE3 / SLC9A3) ve H⁺-ATPaz durur; eşzamanlı olarak lüminal CA-IV bloke olduğu için glomerülden filtre edilen HCO₃⁻ lümende H₂CO₃ → CO₂ + H₂O’ya dönüştürülüp hücre içine geri alınamaz ve bazolateral elektrojenik Na⁺/3HCO₃⁻ kotransporterı (NBCe1 / SLC4A4) üzerinden kana HCO₃⁻ çıkışı kesilir.',
            'Distal Nefron (Toplayıcı Kanal Esas Hücresi) İçi Lümen-Negatif Potansiyel & Aldosteron-Aracılı Kaliürez: Proksimal tübülden geri emilemeyen HCO₃⁻ (%25–30), Na⁺ ve su Henle kulpunu geçip kortikal toplayıcı kanala ulaştığında; HCO₃⁻ toplayıcı kanalda "emilemeyen anyon (non-reabsorbable anion)" gibi davranır. Esas (Principal) hücrelerde ENaC üzerinden Na⁺ geri emilirken lümende kalan HCO₃⁻ güçlü bir lümen-negatif (-50 mV) elektriksel potansiyel yaratarak apikal ROMK/BK kanallarından idrara masif K⁺ sekresyonunu (kaliürez) çeker.',
            'Koroid Pleksus & Siliyer Cisim Epitel Hücresi İçi Sekresyon Blokajı: Koroid pleksus ependim hücresinde ve siliyer cisim non-pigmente epitelinde hücre içi HCO₃⁻ ve H⁺ oluşumu durduğunda, bazolateral Na⁺/H⁺ ve Cl⁻/HCO₃⁻ değiştiricileri ile apikal Na⁺/K⁺-ATPaz ve HCO₃⁻ çıkış kanalları arasındaki ozmotik eşleşme bozulur → ventrikül boşluğuna BOS ve arka kamaraya aköz hümör sekresyonu %40–50 oranında düşer.',
            'Eritrosit İçi Hamburger (Cl⁻/HCO₃⁻) Kayması & Medüller Kemoreseptör Hücre İçi pH Düşüşü: Sistemik plazma HCO₃⁻ düşüşü (hiperkloremik metabolik asidoz) kan-beyin bariyerini yavaşça geçerek interstisyel BOS pH’sını düşürür ve medüller santral kemoreseptör nöronlarında TASK-1/ASIC kanalları üzerinden solunum dürtüsünü uyarır. Yüksek dozlarda ise eritrosit içi CA-II blokajı AE1 (Band-3 Cl⁻/HCO₃⁻ değiştirici) hızını kısıtlayarak periferik dokularda PCO₂ birikimine ve serebral arteriyol düz kasında hücre içi H⁺/NO aracılı vazodilatasyona yol açar.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Proksimal Kıvrımlı Tübül, Makula Densa & Toplayıcı Kanal → Böbrek & Diürez Fizyolojisi',
            tissueTarget: 'Proksimal Tübül (S1–S2) · Makula Densa · Kortikal Toplayıcı Kanal',
            accent: 'teal',
            points: [
              'Bikarbonatüri, İdrar Alkalinizasyonu & Fraksiyonel Na⁺ Atılımı: Normalde proksimal tübülde %85’i geri emilen filtre edilmiş HCO₃⁻’ın %25–30’u idrarla atılır; idrar pH’sı 30 dakika içinde ≥7,5–8,0’a yükselir, fraksiyonel Na⁺ atılımı (FENa) %3–5 artar. Ancak kaçan NaCl’ün büyük kısmı Henle kulpu (NKCC2) tarafından yakalandığı için tek başına zayıf bir diüretiktir.',
              'Tübüloglomerüler Geri Bildirim (TGF) Aktivasyonu & GFR Azalması: Proksimalden kaçan yüksek Na⁺ ve Cl⁻ yükü makula densaya çarptığında TGF refleksini uyararak afferent arteriyol vazokonstriksiyonu yapar ve glomerüler filtrasyon hızını (GFR) %10–20 düşürür.',
              'Hipositratüri & Kalsiyum Fosfat Nefrolitiyazisi: Sistemik metabolik asidoz proksimal tübül hücrelerinde sitrat geri emilimini ve mitokondriyal sitrat kullanımını artırarak idrar sitratını (doğal taş inhibitörü) sıfırlar; alkali idrar (pH >7,5) + hipositratüri + kalsiürez birleştiğinde çözünmeyen Kalsiyum Fosfat (apatit/bruşit) taşları çöker.',
            ],
          },
          {
            systemTitle: 'Ekstraselüler Tampon Sistemi & Hepatik-Renal Amonyak Ekseni → Asit-Baz & Elektrolit Fizyolojisi',
            tissueTarget: 'Plazma HCO₃⁻/Cl⁻ Dengesi (SID) · Distal K⁺ Kanalı · Renal NH₃/NH₄⁺',
            accent: 'amber',
            points: [
              'Hiperkloremik Normal Anyon Açıklı Metabolik Asidoz (NAGMA / Proksimal Tip-2 RTA): İdrarla NaHCO₃ kaybedildikçe ekstraselüler hacim korunmak üzere böbrek Cl⁻ geri emilimini artırır → plazma [HCO₃⁻] düşerken [Cl⁻] bire bir yükselir (Anyon Açığı = [Na⁺] − ([Cl⁻] + [HCO₃⁻]) normal kalır; Stewart modelinde Güçlü İyon Farkı [SID] daralır).',
              'Belirgin Kaliürez & Hipokalemi: Tüm diüretikler içinde filtre edilen Na⁺ başına en yüksek oranda K⁺ kaybettiren ajanlardan biridir (lümen-negatif HCO₃⁻ çekimi + aldosteron); özellikle loop diüretikle kombine edildiğinde (ADVOR) hızlı hipokalemi gelişir.',
              'İdrar Alkalinizasyonuyla Renal Amonyak (NH₃) Tuzaklanmasının Kaybı (Sirozda Komaya Gidiş!): Asidik idrarda suda çözünen NH₄⁺ iyonu olarak hapsedilip atılan amonyak, asetazolamidin oluşturduğu alkali idrarda (pH >7,5) lipofilik serbest NH₃ gazına dönüşür (NH₄⁺ ⇌ NH₃ + H⁺) ve tübül duvarından peritübüler kana geri emilir → sirotik hastada sistemik hiperamonyemi ve hepatik ensefalopatiyi tetikler (MUTLAK KONTRENDİKE!).',
            ],
          },
          {
            systemTitle: 'Venöz Konjesyon, Medüller Solunum Merkezi & Eritrosit Dokusu → Kardiyopulmoner Fizyoloji',
            tissueTarget: 'Proksimal+Henle Nefron · Medüller Kemoreseptör · Eritrosit (CA-II)',
            accent: 'rose',
            points: [
              'ADVOR Sequential Nefron Blokajı & Dekonjesyon (Kardiyovasküler): Kronik kalp yetmezliğinde nörohormonal (RAAS/sempatik) aktivasyon proksimal tübül Na⁺ geri emilimini %60’tan %75–80’e çıkararak Henle kulpuna (furosemid hedefine) Na⁺ ulaşmasını engeller. Asetazolamid (500 mg 1×1) bu proksimal barajı yıkarak furosemidin natriüretik etkinliğini ve 3 günde tam dekonjesyonu %30,5’ten %42,2’ye yükseltir (Mullens NEJM 2022).',
              'Santral Kemoreseptör Uyarımı, Yüksek İrtifa (AMS) & Weaning: Oluşturduğu hafif metabolik asidoz (HCO₃⁻↓, H⁺↑) medüller santral kemoreseptörleri uyararak tidal volüm ve dakika ventilasyonunu artırır → yüksek irtifada hipoksiye bağlı solunumsal alkaloz frenini kırarak gece periyodik solunumunu (Cheyne-Stokes) önler ve aklimatizasyonu hızlandırır; YBÜ’de ise post-diüretik metabolik alkalozun solunum dürtüsü üzerindeki baskısını kaldırır.',
              'İleri KOAH / Solunum Kas Yorgunluğunda Eritrosit CA-II Tuzağı (DIABOLO): Dakika ventilasyonunu artırma rezervi olmayan ağır hiperkapnik KOAH hastasında yüksek doz asetazolamid, eritrosit CA-II’sini bloke ederek doku-alveol CO₂ transferini bozar ve PaCO₂ yükselmesiyle asidemiyi derinleştirebilir.',
            ],
          },
          {
            systemTitle: 'Koroid Pleksus, Siliyer Cisim & Serebral Mikrodolaşım → Göz & Nöro-Oftalmolojik Fizyoloji',
            tissueTarget: 'Koroid Pleksus Ependimi · Siliyer Epitel · Serebral Arteriyol',
            accent: 'indigo',
            points: [
              'Siliyer Cisim & Akut Glokomda Göz İçi Basıncı (GİB) Düşüşü: Siliyer cisim non-pigmente epitelinde CA-II/IV/XII inhibisyonuyla arka kamaraya HCO₃⁻ ve Na⁺ sekresyonunu durdurarak aköz hümör yapım hızını %40–60 azaltır; akut açı kapanması glokomunda kornea ödemini çözmek ve optik sinir iskemisini önlemek için GİB’i hızla indirir.',
              'Koroid Pleksus, İİH (NORDIC) & BOS Rinoresi: Beyin ventriküllerinde koroid pleksus BOS üretimini %40–50 oranında azaltarak İdiyopatik İntrakraniyal Hipertansiyonda (İİH; NORDIC JAMA 2014, maks 4 g/gün) papilödemi geriletir ve kafa tabanı kırığı/endoskopik hipofiz cerrahisi sonrası BOS kaçağı (rinore/otore) debisini düşürür.',
              'Serebral Vazodilatasyon & Periferik Duyusal Sinir Etkisi (Parestezi / Disguzi): Doğrudan sedatif veya genel anestezik EEG etkisi yoktur; ancak yüksek doz IV bolusta (1000 mg) beyin kapiller PCO₂ artışıyla serebral kan akımını (CBF) %30–50 artırır (Diamox serebrovasküler rezerv testi; akut KİBAS krizinde ise bu geçici CBF artışı nedeniyle dikkat!). Dil ve kutanöz duyusal sinir uçlarındaki CA inhibisyonu ise tipik el-ayak/ağız çevresi parestezisi ve gazlı içeceklerde metalik tat (disguzi) oluşturur.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: '>%99 Enzim Doygunluk Kuralı, HCO₃⁻ < 15–18 mEq/L Kendini Sınırlayan Tavan Etkisi & ADVOR Sinerjisi',
          summary:
            'Asetazolamidin enzim kinetiği ve nefron fizyolojisi iki benzersiz farmakodinamik kural tarafından yönetilir: "tam doygunluk eşiği" ve "48–72 saatte kendini sınırlayan (self-limiting) bikarbonat tavanı":',
          points: [
            '>%99.5 Karbonik Anhidraz İnhibisyon Eşiği ("Fractional Inhibition" Kuralı): Proksimal tübül ve koroid pleksusta CA-II enzimi fizyolojik ihtiyacın ~1000 katı kapasitede bulunur; enzimin %90’ı bloke edilse bile kalan %10’luk aktif enzim HCO₃⁻ geri emilimini tam hızda sürdürür. Klinik diürez ve BOS/GİB azalması ancak enzim aktivitesinin >%99–99.5’i inhibe edildiğinde (~5 mg/kg veya 250–500 mg dozda) başlar; 500 mg IV/PO üzerinde ise renal CA tamamen doyduğu için tek dozu 1000 mg’a çıkarmak ek natriürez sağlamaz (Mazur RCT: tek doz 500 mg = 4×250 mg).',
            'HCO₃⁻ < 15–18 mEq/L Kendini Sınırlayan (Self-Limiting) Diüretik Frenleme (48–72 Saat): Asetazolamid kullanımıyla 2–3 gün içinde plazma [HCO₃⁻] düzeyi 15–18 mEq/L’nin altına indiğinde; (1) glomerülden filtre edilen toplam HCO₃⁻ yükü azalır ve CA-bağımsız mekanizmalarla (kalan NHE3 ve pasif H₂CO₃ difüzyonu) tamamen geri emilebilir hale gelir, (2) gelişen hücre içi asidoz glutaminaz ve CA-bağımsız H⁺ sekresyonunu uyarır → bikarbonatüri ve diüretik etki 48–72 saatte kendiliğinden durur (bu nedenle ADVOR ve YBÜ alkalozunda 1–3 günlük kısa kürler uygulanır).',
            'Loop Diüretiklerle (Furosemid) Karşılıklı Tamamlayıcı Sinerji: Furosemid hipokloremik metabolik alkaloz ve proksimal Na⁺ emilim artışı yaparken, Asetazolamid hiperkloremik metabolik asidoz ve proksimal Na⁺/HCO₃⁻ blokajı yapar → ikisi birleştiğinde hem diüretik direnci kırılır (ADVOR) hem de asit-baz dengesi nötralize olur (ancak K⁺ kaybı aditif olarak artar!).',
          ],
        }}
        clinicalPearls={[
          'Salisilat Zehirlenmesinde Neden KESİNLİKLE Kontrendikedir? Salisilat (aspirin, pKa = 3.0) zehirlenmesinde amaç idrarı alkalize ederek renal atılımı artırmak VE kan pH’sını hafif alkali tutarak salisilatın beyne geçişini önlemektir. Asetazolamid idrarı alkalize eder ANCAK kanda metabolik asidoz (pH↓) yapar; kan pH’sı 7,40’tan 7,20’ye düştüğünde non-iyonize (lipofilik) salisilat fraksiyonu ikiye katlanarak kan-beyin bariyerini sel gibi aşar ve ölümcül beyin ödemi/nöbet yapar! (Yalnızca IV NaHCO₃ kullanılır).',
          'Türkiye Klinik Pratiği (Diazomid 250 mg TB ile ADVOR & YBÜ Alkaloz Uygulaması): Uluslararası ADVOR (NEJM 2022) ve Mazur çalışmalarında 500 mg IV flakon kullanılmış olsa da, Türkiye’de IV form rutin mevcut değildir. Asetazolamidin oral biyoyararlanımı >%90 olduğundan, ileus/malabsorpsiyon olmayan YBÜ ve KKY hastalarında 2 × 250 mg Diazomid tablet (PO veya ezilerek NG/OG tüpten) klinik olarak eşdeğer bikarbonatüri ve dekonjesyon sağlar.',
          'Klor-Duyarlı vs Klor-Dirençli Metabolik Alkaloz Ayrımı: NG drenaj, kusma veya geçmiş diüretik kullanımına bağlı hipovolemik metabolik alkalozda (spot idrar Cl⁻ < 20 mEq/L) asetazolamid vermek hipovolemiyi ve K⁺ kaybını ağırlaştırır (tedavisi %0,9 NaCl + KCl’dir). Asetazolamid yalnızca övolemik/hipervolemik hastada (kalp yetmezliği, devam eden loop diüretik ihtiyacı, pH > 7,48 ve HCO₃⁻ > 30 mmol/L) endikedir.',
          'Topiramat / Zonisamid ile Gizli Çift Karbonik Anhidraz Blokajı: Migren veya epilepsi için Topiramat ya da Zonisamid kullanan bir hastaya İİH, glokom veya alkaloz için Asetazolamid eklenmesi şiddetli NAGMA asidozu, hiperamonyemik ensefalopati ve bilateral kalsiyum fosfat böbrek taşı riskini katlar.',
        ]}
      />

      {/* 13. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Asetazolamid"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Yüksek Doz Salisilatlar (Aspirin > 2–3 g/gün / Salisilat Zehirlenmesi)',
            mechanism: 'Sistemik Asidemi → Non-İyonize Salisilatın KBB Geçişinde Artış + Renal Tübüler Yarışma',
            clinicalEffect: 'Şiddetli SSS toksisitesi (deliryum, nöbet, koma), derin metabolik asidoz ve ölüm.',
            management: 'Eş zamanlı kullanımdan kesinlikle kaçının; salisilat zehirlenmesinde idrar alkalinizasyonu için yalnızca IV NaHCO₃ kullanın.',
          },
          {
            severity: 'D',
            agent: 'Diğer Karbonik Anhidraz İnhibitörleri (Topiramat, Zonisamid)',
            mechanism: 'Aditif Sistemik & Renal Karbonik Anhidraz İnhibisyonu',
            clinicalEffect: 'Ağır hiperkloremik metabolik asidoz, hipositratüri ve yüksek kalsiyum fosfat nefrolitiyazis riski.',
            management: 'Kombinasyondan kaçının; zorunluysa yakın AKG, elektrolit ve renal taş izlemi yapın.',
          },
          {
            severity: 'D',
            agent: 'Loop & Tiyazid Diüretikler (Furosemid, Hidroklorotiyazid) · Kortikosteroidler',
            mechanism: 'Sinerjik Distal Na⁺/HCO₃⁻ Sunumu ile Masif Kaliürez',
            clinicalEffect: 'ADVOR’da istenen güçlü dekonjesyon yanında hızlı ve derin hipokalemi (aritmi/digoksin toksisitesi).',
            management: 'Kombinasyonda günlük (YBÜ’de 6–12 saatlik) serum K⁺ ve Mg²⁺ takibi + proaktif replasman uygulayın.',
          },
          {
            severity: 'D',
            agent: 'Lityum · Yüksek Doz Metotreksat · Fenitoin / Karbamazepin',
            mechanism: 'Renal Proksimal Na⁺/Li⁺ Atılım Artışı; İdrar Alkalinizasyonu & CYP/Protein Etkileşimi',
            clinicalEffect: 'Lityum düzeyi düşer (tedavi başarısızlığı); fenitoin/karbamazepin osteomalazisi ağırlaşır; metotreksat klirensi değişebilir.',
            management: 'Terapötik ilaç düzeylerini (TDM) izleyin ve ilgili klinikle doz ayarı yapın.',
          },
          {
            severity: 'C',
            agent: 'Amfetaminler · Kinidin · Metenamin (Alkali İdrar Etkileşimi)',
            mechanism: 'Alkali İdrarda (pH > 7,5) Zayıf Baz İlaçların Pasif Geri Emilim Artışı',
            clinicalEffect: 'Kinidin/amfetamin toksisitesi artabilir; metenaminin antibakteriyel etkinliği kaybolur.',
            management: 'Eş zamanlı kullanımda toksisite bulgularını izleyin; metenamin ile birlikte kullanmayın.',
          },
        ]}
        references={[
          {
            authors: 'Mullens W, Dauw J, Martens P, Verbrugge FH, Nijst P, Meekers E, et al. (ADVOR Study Group)',
            title: 'Acetazolamide in Acute Decompensated Heart Failure with Volume Overload',
            journal: 'New England Journal of Medicine',
            year: 2022,
            pmid: '36027559',
            doi: '10.1056/NEJMoa2203094',
            note: '500 mg IV asetazolamid + loop diüretik kombinasyonunun 3 günde tam dekonjesyonu anlamlı artırdığını gösteren çok merkezli RKÇ (n=519).',
          },
          {
            authors: 'Faisy C, Meziani F, Planquette B, Clavel M, Gacouin A, Bornstain C, et al. (DIABOLO Trial)',
            title: 'Effect of Acetazolamide vs Placebo on Duration of Invasive Mechanical Ventilation Among Patients With Chronic Obstructive Pulmonary Disease: A Randomized Clinical Trial',
            journal: 'JAMA',
            year: 2016,
            pmid: '26836730',
            doi: '10.1001/jama.2016.0019',
            note: 'Mekanik ventilasyondaki KOAH + metabolik alkaloz hastalarında asetazolamidin HCO₃⁻’ü düşürdüğünü ancak ventilasyon süresini kısaltmadığını gösteren RKÇ.',
          },
          {
            authors: 'Mazur JE, Devlin JW, Peters MJ, Jankowski MA, Iannuzzi MC, Zarowitz BJ',
            title: 'Single versus multiple doses of acetazolamide for metabolic alkalosis in critically ill medical patients: a randomized, double-blind trial',
            journal: 'Critical Care Medicine',
            year: 1999,
            pmid: '10446816',
            doi: '10.1097/00003246-199907000-00004',
            note: 'Yoğun bakım hastalarında tek doz 500 mg IV asetazolamidin 4×250 mg IV rejimi kadar etkin olduğunu ve etkisinin 72 saate kadar sürdüğünü gösteren RKÇ.',
          },
          {
            authors: 'Wall M, McDermott MP, Kieburtz KD, Corbett JJ, Feldon SE, Friedman DI, et al. (NORDIC IIHTT)',
            title: 'Effect of Acetazolamide on Visual Function in Patients With Idiopathic Intracranial Hypertension and Mild Visual Loss: The Idiopathic Intracranial Hypertension Treatment Trial',
            journal: 'JAMA',
            year: 2014,
            pmid: '24737367',
            doi: '10.1001/jama.2014.3312',
            note: 'İdiyopatik intrakraniyel hipertansiyonda (İİH) asetazolamidin görme alanı ve papilödemi anlamlı iyileştirdiğini gösteren temel çalışma.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/acetazolamide.html"
        medscapeUrl="https://reference.medscape.com/drug/diamox-acetazolamide-342809"
      />
    </div>
  );
};

export default AcetazolamideProtocol;
