import React, { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Gauge,
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
import { STANDALONE_ORGAN_PART1 } from '../../data/organImpairment/standaloneOrganPart1';

interface Props {
  isDark: boolean;
}

type CalcTab = 'intraop' | 'obstetric' | 'dilution_compare';
type PatientGroup = 'adult' | 'pediatric';
type DilutionMode = 5 | 10 | 1;

export const EphedrineProtocol: React.FC<Props> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<CalcTab>('intraop');
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // 1. İntraoperatif Bolus & Taşiflaksi Takip State
  const [patientGroup, setPatientGroup] = useState<PatientGroup>('adult');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [currentMap, setCurrentMap] = useState<number>(56);
  const [currentHr, setCurrentHr] = useState<number>(58);
  const [cumulativeMg, setCumulativeMg] = useState<number>(10);
  const [dilutionMgMl, setDilutionMgMl] = useState<DilutionMode>(5);
  const [hasMaoi, setHasMaoi] = useState<boolean>(false);
  const [hasHocmOrAs, setHasHocmOrAs] = useState<boolean>(false);

  // 2. Obstetrik (Sezaryen Spinal Hipotansiyon) Karar Destek State
  const [obsBaselineSbp, setObsBaselineSbp] = useState<number>(120);
  const [obsCurrentSbp, setObsCurrentSbp] = useState<number>(92);
  const [obsHr, setObsHr] = useState<number>(64);
  const [obsCumulativeEphedrine, setObsCumulativeEphedrine] = useState<number>(5);
  const [obsFetalDistress, setObsFetalDistress] = useState<boolean>(false);

  const wtId = useId();
  const mapId = useId();
  const hrId = useId();
  const cumId = useId();
  const obsBaseId = useId();
  const obsCurrId = useId();
  const obsHrId = useId();
  const obsCumId = useId();

  // --- 1. İNTRAOPERATİF BOLUS HESAPLAMALARI ---
  const isTachyphylaxisRisk = patientGroup === 'adult' && cumulativeMg >= 30 && cumulativeMg < 50;
  const isMaxCeilingReached = patientGroup === 'adult' && cumulativeMg >= 50;
  const isTachycardic = currentHr >= 100;

  const getIntraopRecommendation = () => {
    if (patientGroup === 'pediatric') {
      const pedWt = Math.min(weightKg, 50);
      const lowMg = Math.min(5, Number((pedWt * 0.1).toFixed(2)));
      const highMg = Math.min(10, Number((pedWt * 0.2).toFixed(2)));
      const suggestedMg = currentMap < 50 ? highMg : lowMg;
      const volMl = suggestedMg / dilutionMgMl;
      return {
        doseMg: suggestedMg,
        rangeText: `${lowMg.toFixed(1)} – ${highMg.toFixed(1)} mg IV bolus (0,1 – 0,2 mg/kg · Tek doz maks 5–10 mg)`,
        volText: `${volMl.toFixed(2)} mL (${dilutionMgMl} mg/mL enjektörden)`,
        note: 'Pediatride hassas dozaj için 1 mg/mL sulandırma (5 mg/mL’den 2 mL + 8 mL SF) önerilir; önce hipovolemi ve anestezik derinliğini kontrol edin.',
      };
    }

    // Erişkin
    const suggestedMg = currentMap < 55 ? 10 : 5;
    const remainingMg = Math.max(0, 50 - cumulativeMg);
    const volMl = suggestedMg / dilutionMgMl;
    return {
      doseMg: suggestedMg,
      rangeText: `5 – 10 mg IV bolus (Önerilen: ${suggestedMg} mg IV · 3–5 dk’da bir tekrar · Kalan tavan: ${remainingMg} mg)`,
      volText: `${volMl.toFixed(1)} mL (${dilutionMgMl} mg/mL enjektörden · 50 mg/1 mL TR ampul sulandırılmış!)`,
      note: isTachycardic
        ? 'Bazal KTA ≥ 100/dk! Efedrin taşikardiyi artırıp miyokard O₂ tüketimini yükseltir → saf α₁ (Fenilefrin 50–100 mcg) veya Noradrenalin tercih edin.'
        : 'KTA düşük/normal iken anestezi ilişkili hipotansiyonda (özellikle nöroaksiyel blok + bradikardi) Efedrin venöz dönüşü ve kalp debisini dengeli biçimde destekler.',
    };
  };

  const intraopRec = getIntraopRecommendation();

  // --- 2. OBSTETRİK KARAR DESTEK HESAPLAMALARI ---
  const obsSbpPct = obsBaselineSbp > 0 ? Math.round((obsCurrentSbp / obsBaselineSbp) * 100) : 100;
  const obsNeedsVasopressor = obsSbpPct < 90 || obsCurrentSbp < 100;
  const obsPreferEphedrine = obsNeedsVasopressor && obsHr < 68 && !obsFetalDistress && obsCumulativeEphedrine < 20;

  const getObsVerdict = () => {
    if (!obsNeedsVasopressor) {
      return {
        tone: 'emerald' as const,
        headline: 'SKB Hedef Aralıkta (≥ %90 Bazal) — Ek Bolus Gerekmiyor',
        detail:
          'Kinsella 2018 Uluslararası Konsensüsü: Sezaryende spinal sonrası SKB’yi bazalin ≥ %90’ında tutmak maternal bulantı-kusmayı ve fetal asidozu en aza indirir. Sol uterin tilt ve profilaktik infüzyonu sürdürün.',
      };
    }
    if (obsFetalDistress) {
      return {
        tone: 'rose' as const,
        headline: 'Fetal Distres / Asidoz Şüphesi — 1. Tercih FENİLEFRİN veya NORADRENALİN!',
        detail:
          'Efedrin plasentayı hızla geçip fetal β-adrenerjik metabolizmayı uyararak umblikal arter pH’sını düşürür ve laktatı artırır (Ngan Kee 2009). Fetal distres varlığında Fenilefrin (50–100 mcg IV) veya Noradrenalin (4–8 mcg IV) tercih edin; bradikardi gelişirse Atropin/Glikopirolat ekleyin.',
      };
    }
    if (obsPreferEphedrine) {
      return {
        tone: 'teal' as const,
        headline: 'Hipotansiyon + Düşük KTA (< 68/dk) — Efedrin 5 – 10 mg IV Uygun',
        detail: `Maternal KTA ${obsHr}/dk ve SKB bazalin %${obsSbpPct}’i düzeyinde. Efedrin 5–10 mg IV (5 mg/mL enjektörden 1–2 mL) hem SKB’yi hem kalp hızını düzeltir. Kümülatif dozu mümkünse 15–20 mg altında tutun; yanıt yetersizse Noradrenalin/Fenilefrin infüzyonuna geçin.`,
      };
    }
    return {
      tone: 'amber' as const,
      headline:
        obsCumulativeEphedrine >= 20
          ? 'Kümülatif Efedrin ≥ 20 mg — Fetal Asidemi Riski! Fenilefrin / Noradrenalin’e Geçin'
          : 'Maternal KTA Normal/Yüksek (≥ 68/dk) — 1. Tercih FENİLEFRİN veya NORADRENALİN',
      detail:
        'Kinsella 2018 Konsensüsü: Normal veya yüksek maternal kalp hızında 1. basamak vazopresör Fenilefrin (50–100 mcg IV bolus veya 25–50 mcg/dk infüzyon) ya da düşük doz Noradrenalin (4–8 mcg IV bolus / 0,05 mcg/kg/dk infüzyon) olmalıdır. Efedrin yalnızca belirgin bradikardi eklendiğinde kurtarıcı olarak kullanılmalıdır.',
    };
  };

  const obsVerdict = getObsVerdict();

  const getReportText = () => {
    if (activeTab === 'intraop') {
      const alerts: string[] = [];
      if (hasMaoi) {
        alerts.push('MUTLAK KONTRENDİKASYON: Son 14 günde MAOI / Linezolid / Metilen Mavisi → EFEDRİN VERME! Ölümcül hipertansif kriz riski. Direkt düşük doz Fenilefrin/Noradrenalin titre et!');
      }
      if (hasHocmOrAs) {
        alerts.push('KRİTİK UYARI: HOCM / Ciddi Aort Stenozu → β₁ inotropi/taşikardi çıkış yolu obstrüksiyonunu ve iskemiyi ağırlaştırır; saf α₁ Fenilefrin kullan!');
      }
      if (isMaxCeilingReached) {
        alerts.push('TAVAN DOZ (≥ 50 mg) & TAŞİFLAKSİ: Endojen NE depoları tükenmiştir; ek efedrin etkisizdir → direkt vazopresöre (Noradrenalin / Fenilefrin) geçin!');
      } else if (isTachyphylaxisRisk) {
        alerts.push('TAŞİFLAKSİ UYARISI (30–49 mg): Kümülatif doz yükseliyor; yanıt azalıyorsa direkt vazopresör hazırlayın.');
      }

      return [
        'EFEDRİN HİDROKLORÜR — İNTRAOPERATİF VAZOPRESÖR RAPORU',
        `Hasta: ${patientGroup === 'adult' ? 'Erişkin' : 'Pediatrik'} (${weightKg} kg) | OAB: ${currentMap} mmHg | KTA: ${currentHr}/dk | Kümülatif Efedrin: ${cumulativeMg} mg`,
        `Önerilen Bolus: ${intraopRec.rangeText}`,
        `Hazırlama (${dilutionMgMl} mg/mL): ${intraopRec.volText} (TR 50 mg/1 mL ampul ASLA sulandırmadan verilmez!)`,
        `Klinik Not: ${intraopRec.note}`,
        alerts.length ? `Güvenlik Uyarıları:\n- ${alerts.join('\n- ')}` : 'Güvenlik Taraması: Kontrendikasyon bayrağı işaretlenmedi.',
      ].join('\n');
    }

    if (activeTab === 'obstetric') {
      return [
        'OBSTETRİK SPİNAL HİPOTANSİYON — VAZOPRESÖR KARAR RAPORU (Kinsella 2018)',
        `Bazal SKB: ${obsBaselineSbp} mmHg → Mevcut SKB: ${obsCurrentSbp} mmHg (%${obsSbpPct}) | Maternal KTA: ${obsHr}/dk | Kümülatif Efedrin: ${obsCumulativeEphedrine} mg | Fetal Distres: ${obsFetalDistress ? 'VAR' : 'Yok'}`,
        `Karar: ${obsVerdict.headline}`,
        `Açıklama: ${obsVerdict.detail}`,
      ].join('\n');
    }

    return [
      'EFEDRİN HİDROKLORÜR (TR 50 mg / 1 mL) — STANDART SULANDIRMA REÇETESİ',
      'Erişkin Standart (5 mg/mL): 1 ampul (50 mg/1 mL) + 9 mL %0,9 NaCl = 10 mL enjektör → 1 mL = 5 mg, 2 mL = 10 mg (ISO Mor Etiket).',
      'Pediatrik Hassas (1 mg/mL): Yukarıdaki 5 mg/mL enjektörden 2 mL (10 mg) + 8 mL %0,9 NaCl = 10 mL → 1 mL = 1 mg.',
      'KRİTİK: 50 mg/1 mL ampulü ASLA sulandırmadan vermeyin; kümülatif 50 mg üstünde taşiflaksi gelişir → direkt vazopresöre (Noradrenalin / Fenilefrin) geçin.',
    ].join('\n');
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
          { id: 'sec-dozlar', label: 'Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik & Obstetrik' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON) */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="EPHEDRINE (50 mg/1 mL → 5 mg/mL SULANDIR!)"
        confusionRiskWith="EPINEPHrine (ADRENALİN) · PHENYLEPHRINE"
        criticalAlerts={[
          'ÖLÜMCÜL SES BENZERLİĞİ (LASA): "Efedrin" ve "Epinefrin" ameliyathanede en sık karıştırılan ilaç çiftidir! Sözlü istemde "E-FED-RİN (5 mg/mL)" şeklinde konsantrasyonla birlikte sesli doğrulama yapın.',
          'Türkiye’deki 50 mg / 1 mL (%5) ampul ASLA sulandırılmadan uygulanmaz — her zaman 9 mL %0,9 NaCl ile 10 mL’ye (5 mg/mL) tamamlayın ve ISO mor (lavanta) vazopresör etiketi yapıştırın.',
          'Pik etki 2–5 dakikada oturduğu için 1. dakikada yanıt görmeden üst üste 10–20 mg puşe etmeyin (doz istifleme / rebound hipertansiyon tuzağı).',
          'Kümülatif 50 mg tavanına ulaşıldığında ek efedrin yapmayın (NE depoları tükenir → taşiflaksi) — Noradrenalin veya Fenilefrin’e geçin.',
        ]}
        antidoteOrRescue="Aşırı doz veya yanlışlıkla sulandırılmamış uygulamaya bağlı şiddetli hipertansiyon / taşiaritmide kısa etkili titre edilebilir IV ajanlar kullanılır: taşikardi baskınsa Esmolol (0,5 mg/kg IV bolus → 50–200 mcg/kg/dk), şiddetli hipertansiyonda Nikardipin (5 mg/saat başla) veya Nitrogliserin / Fentolamin (1–5 mg IV). MAOI/Linezolid etkileşimli hipertansif krizde tek başına β-bloker vermeyin (karşılanmamış α-vazokonstrüksiyon riski → önce α-bloker/vazodilatör!)."
      />

      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-purple-500/30 shadow-xl shadow-purple-950/20 text-slate-100'
            : 'bg-white border-purple-200 shadow-lg shadow-purple-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <Gauge className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/40 font-mono">
                  Sempatomimetik · Karma Direkt + İndirekt α₁ / β₁ / β₂ Agonist
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: C01CA26
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                  TR Ampul: 50 mg / 1 mL (SULANDIR!)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Efedrin Hidroklorür (EPHEDRINE) Monografisi
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Non-katekolamin, karma etkili sempatomimetik vazopresör. <strong>Genel ve nöroaksiyel anesteziye bağlı hipotansiyonda</strong>{' '}
                (özellikle düşük/normal kalp hızı eşlik ederken) venöz dönüşü, kalp hızını ve kardiyak debiyi dengeli biçimde artırır.{' '}
                <strong>Taşiflaksi (NE depo tükenmesi)</strong>, <strong>MAOI hipertansif krizi</strong> ve{' '}
                <strong>obstetrik fetal asidemi</strong> sınırları mutlaka gözetilmelidir.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 shrink-0 font-mono tabular-nums">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">IV Etki / Süre</div>
              <div className="text-sm font-extrabold text-purple-600 dark:text-purple-400">1–2 dk / 10–20 dk</div>
              <div className="text-[10px] text-slate-500">Pik: 2 – 5 dk</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Standart Sulandırma</div>
              <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">5 mg / mL</div>
              <div className="text-[10px] text-slate-500">50 mg + 9 mL SF (10 mL)</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Erişkin Bolus</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">5 – 10 mg IV</div>
              <div className="text-[10px] text-slate-500">Maks kümülatif: 50 mg</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Kritik Sınır</div>
              <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400">TAŞİFLAKSİ &amp; MAOI</div>
              <div className="text-[10px] text-slate-500">NE depoları tükenir!</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        summary="Efedrin, katekol halkası içermeyen (non-katekolamin) karma etkili bir sempatomimetiktir. Hem presinaptik sempatik sinir uçlarından endojen noradrenalin salımını tetikler (indirekt etki — baskın bileşen), hem de postsinaptik α₁, β₁ ve β₂ reseptörlerini doğrudan uyarır."
        pillars={[
          {
            title: 'İndirekt Etki (Endojen Noradrenalin Salımı)',
            detail:
              'Presinaptik veziküllerden noradrenalin (NE) salımını artırarak pressör etkinin büyük bölümünü oluşturur. Bu mekanizma nedeniyle kısa aralıklarla tekrarlayan dozlarda NE depoları boşalır ve hızla TAŞİFLAKSİ (yanıt kaybı) gelişir.',
          },
          {
            title: 'Kardiyovasküler β₁ + α₁ Dengesi',
            detail:
              'β₁ uyarısı ile kalp hızı (kronotropi) ve miyokard kontraktilitesi (inotropi) artar; α₁ uyarısı ile belirgin venokonstrüksiyon (preload/venöz dönüş artışı) ve hafif-orta arteriyoler vazokonstrüksiyon (SVR artışı) oluşur. Saf α₁ agonistlerin aksine kardiyak debiyi korur veya artırır.',
          },
          {
            title: 'MAO/COMT Direnci, KBB & Plasenta Geçişi',
            detail:
              'Katekol halkası olmadığı için MAO ve COMT enzimleriyle hızlı yıkılmaz → etki süresi adrenalin/noradrenaline göre uzundur (10–20 dk). Lipofilik yapısıyla kan-beyin bariyerini (hafif uyanıklık/MAC artışı) ve plasentayı serbestçe geçer.',
          },
        ]}
      />

      {/* 3. FARMAKOKİNETİK / FARMAKODİNAMİK (PK/PD) */}
      <section
        id="sec-pkpd"
        className={`scroll-mt-20 rounded-2xl border p-5 sm:p-6 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Clock className={`h-5 w-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Farmakokinetik &amp; Farmakodinamik (PK/PD) Profili
            </h3>
          </div>
          {pkOpen ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono tabular-nums">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                  <th className="py-2.5 pr-4 font-sans font-bold">Parametre</th>
                  <th className="py-2.5 pr-4 font-sans font-bold">Değer</th>
                  <th className="py-2.5 font-sans font-bold">Klinik Karşılığı</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Başlangıcı &amp; Pik (IV / IM)</td>
                  <td className="py-2.5 pr-4 text-purple-600 dark:text-purple-400 font-bold">IV: 1–2 dk (pik 2–5 dk) · IM: 10–20 dk</td>
                  <td className="py-2.5 font-sans text-xs">
                    Fenilefrin/Noradrenalin’e göre (20–45 sn) daha yavaş başlar; ani şiddetli hipotansiyonda ek doz için 2–3 dk bekleyin (doz istifleme/rebound hipertansiyon riski!).
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Pressör Etki Süresi</td>
                  <td className="py-2.5 pr-4 font-bold">IV: 10 – 20 dk · IM: 30 – 60 dk</td>
                  <td className="py-2.5 font-sans text-xs">
                    Aralıklı IV bolus kullanımına uygundur; ancak uzun süren hipotansiyonda tekrarlayan boluslar taşiflaksi yaptığı için sürekli direkt vazopresör infüzyonu üstündür.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Eliminasyon Yarı Ömrü (t½)</td>
                  <td className="py-2.5 pr-4 font-bold">3 – 6 saat (İdrar pH bağımlı!)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Asidik idrarda (pH ~5) t½ ~3 saate kısalır; alkali idrarda (pH ~6,3–8, ör. Asetazolamid / NaHCO₃) t½ 6 saatin üzerine uzar!
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Metabolizma &amp; Atılım</td>
                  <td className="py-2.5 pr-4 font-bold">%60 – 75 Renal (değişmeden)</td>
                  <td className="py-2.5 font-sans text-xs">
                    MAO/COMT ile yıkılmaz; minimal hepatik N-demetilasyon (norefedrin) ve deaminasyon. İleri böbrek yetmezliğinde birikim riski artar.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Plasental Transfer (UV/MA Oranı)</td>
                  <td className="py-2.5 pr-4 text-rose-600 dark:text-rose-400 font-bold">Yüksek (~1,13 · Serbest geçiş)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Ngan Kee (2009): Fenilefrinin aksine plasentayı hızla geçer ve fetüste metabolik β-uyarım ile laktat artışı / umblikal arter pH düşüşü yapar.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Kümülatif Tavan / Taşiflaksi Eşiği</td>
                  <td className="py-2.5 pr-4 text-amber-600 dark:text-amber-400 font-bold">30 – 50 mg IV (Erişkin)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Toplam 30 mg sonrası pressör yanıt belirgin azalır, 50 mg üzerine çıkmak yerine Noradrenalin veya Fenilefrin’e geçilmelidir.
                  </td>
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
          'Son 14 gün içinde MAO inhibitörü kullanımı (tranilsipromin, fenelzin, selejilin, moklobemid ve antibiyotik LİNEZOLİD veya METİLEN MAVİSİ dahil!): Presinaptik birikmiş katekolaminlerin ani boşalmasıyla ölümcül hipertansif kriz ve intraserebral kanama!',
          'Tanılı veya şüpheli feokromositoma, şiddetli kontrolsüz hipertansiyon, dar açılı glokom ve efedrine bilinen aşırı duyarlılık.',
          'Dinamik sol ventrikül çıkış yolu obstrüksiyonu (HOCM / SAM) ve ciddi semptomatik aort stenozu: β₁ inotropi ve taşikardi obstrüksiyonu ile subendokardiyal iskemiyi dramatik biçimde kötüleştirir (saf α₁ Fenilefrin tercih edin!).',
        ]}
        relativeItems={[
          'Bazal taşikardi (KTA > 100–110/dk), koroner arter hastalığı / akut koroner sendrom ve kontrolsüz taşiaritmi (AF/SVT/VT): Kalp hızı ve miyokard O₂ talebini artırır.',
          'Obstetrik sezaryen spinal hipotansiyonunda maternal KTA normal/yüksek iken veya fetal distres varken 1. basamak kullanım (Kinsella 2018: Fenilefrin/Noradrenalin üstündür).',
          'Hipertiroidizm/tirotoksikoz, trisiklik antidepresan (TSA) veya kokain kullanımı: Abartılı hipertansif yanıt ve ventriküler aritmi riski.',
          'Düzeltilmemiş ciddi hipovolemi / aktif masif kanama ve oksitosin/metilergonovin (ergot alkaloidi) eş zamanlı kullanımı (şiddetli postpartum hipertansif kriz riski!).',
        ]}
        clinicalNote="Linezolid alan yoğun bakım veya ortopedi/enfeksiyon hastasında indirekt sempatomimetik (Efedrin) kullanmak klasik bir hipertansif kriz tuzağıdır — bu hastalarda mutlaka düşük doz direkt vazopresör (Fenilefrin veya Noradrenalin) titre edin!"
      />

      {/* 5. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozlar"
        title="Klinik Endikasyonlar ve Kanıta Dayalı Doz Rejimleri"
        icon={<Syringe className={`h-5 w-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />}
        defaultOpen={false}
        bodyClassName="p-5 sm:p-6 space-y-4"
      >

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                <th className="py-2.5 pr-4 font-bold">Klinik Endikasyon</th>
                <th className="py-2.5 pr-4 font-bold">Önerilen Doz &amp; Yol</th>
                <th className="py-2.5 font-bold">Klinik Uygulama İncileri</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-purple-600 dark:text-purple-400 min-w-[190px]">
                  Genel / Nöroaksiyel Anestezi Hipotansiyonu (Erişkin)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums min-w-[190px]">
                  5 – 10 mg IV bolus<br />
                  <span className="text-[11px] font-normal text-slate-500">3–5 dk’da bir tekrar · Maks 50 mg</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>POQI-3 (Sessler 2019):</strong> OAB &lt; 65 mmHg (veya bazalin &lt; %80’i) organ hasarı (AKI/MINS) riskini artırır.
                  Efedrin, özellikle <strong>düşük-normal KTA</strong> eşlik eden geçici indüksiyon/spinal hipotansiyonunda idealdir.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-rose-600 dark:text-rose-400">
                  Spinal Anestezi + Bradikardi (Bezold-Jarisch)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  5 – 10 mg IV bolus<br />
                  <span className="text-[11px] font-normal text-slate-500">Gerekirse Atropin / düşük doz Adrenalin</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Sempatik blokajla venöz dönüş ve KTA birlikte düştüğünde hem α₁ venokonstrüksiyon hem β₁ kronotropi sağlar.
                  Şiddetli bradikardi (&lt; 40/dk) ve derin hipotansiyonda vakit kaybetmeden Adrenalin (10–50 mcg IV) ekleyin.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-amber-600 dark:text-amber-400">
                  Obstetrik Sezaryen Spinal Hipotansiyonu (Kinsella 2018)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  5 – 10 mg IV (Seçilmiş olgu)<br />
                  <span className="text-[11px] font-normal text-slate-500">Yalnızca KTA düşükse · Toplam &lt; 15–20 mg</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>Kinsella 2018 &amp; Lee 2002:</strong> 1. tercih Fenilefrin (veya Noradrenalin)’dir. Efedrin yalnızca bazal bradikardi veya
                  Fenilefrin sonrası refleks bradikardi varlığında eklenir; yüksek dozda fetal metabolik asidemi yapar.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-sky-600 dark:text-sky-400">
                  Pediatrik İntraoperatif Hipotansiyon
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,1 – 0,2 mg/kg IV bolus<br />
                  <span className="text-[11px] font-normal text-slate-500">Tek doz maks 5–10 mg (1 mg/mL dilüsyon)</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Çocukta hipotansiyonun en sık nedenleri derin anestezi ve hipovolemidir; önce sıvı bolusu ve MAC/infüzyon kontrolü yapılmalıdır.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-teal-600 dark:text-teal-400">
                  IM Uygulama (Seçilmiş / Uzamış Hafif Destek)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  25 – 50 mg IM<br />
                  <span className="text-[11px] font-normal text-slate-500">Başlangıç 10–20 dk · Süre 30–60 dk</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Emilimi ve süresi öngörülemez olduğundan (özellikle periferik vazokonstrüksiyon ve obstetride rebound hipertansiyon riski) modern anestezide rutin önerilmez; IV titrasyon standarttır.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </MonographAccordionSection>

      {/* 6. ETKİLEŞİMLİ DOZ, TAŞİFLAKSİ & OBSTETRİK KARAR HESAPLAYICISI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="Etkileşimli Efedrin Bolus, Taşiflaksi & Obstetrik Karar Hesaplayıcısı"
        subtitle="TR 50 mg/1 mL ampul sulandırma hacmi, kümülatif 50 mg tavan takibi ve sezaryen vazopresör seçimi"
        icon={<Activity className={`h-5 w-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />}
        defaultOpen={false}
        containerClassName={isDark ? 'border-purple-500/30 bg-slate-900/80' : 'border-purple-200 bg-white shadow-xs'}
        bodyClassName="p-5 sm:p-6 space-y-5"
      >
        <div className="flex justify-end">
          <MonographCopyButton isDark={isDark} getText={getReportText} label="Yatak Başı Rapor Kopyala" />
        </div>

        {/* 3 Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'intraop', label: '1. İntraoperatif Bolus & Taşiflaksi' },
              { id: 'obstetric', label: '2. Obstetrik (Sezaryen) Karar Destek' },
              { id: 'dilution_compare', label: '3. Sulandırma & Vazopresör Karşılaştırma' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? isDark
                    ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                    : 'bg-purple-50 border-purple-500 text-purple-900'
                  : isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: İNTRAOPERATİF BOLUS & TAŞİFLAKSİ */}
        {activeTab === 'intraop' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'adult', label: 'Erişkin (5–10 mg IV)' },
                    { id: 'pediatric', label: 'Pediatrik (0,1–0,2 mg/kg)' },
                  ] as const
                ).map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setPatientGroup(g.id);
                      if (g.id === 'pediatric') {
                        if (weightKg > 40) setWeightKg(18);
                        setDilutionMgMl(1);
                      } else {
                        if (weightKg < 40) setWeightKg(75);
                        setDilutionMgMl(5);
                      }
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                      patientGroup === g.id
                        ? isDark
                          ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                          : 'bg-purple-50 border-purple-500 text-purple-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={wtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Hasta Kilosu (kg)
                  </label>
                  <input
                    id={wtId}
                    type="number"
                    min={3}
                    max={180}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(3, Math.min(180, Number(e.target.value) || 3)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={cumId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Verilmiş Kümülatif Doz (mg)
                  </label>
                  <input
                    id={cumId}
                    type="number"
                    min={0}
                    max={100}
                    step={5}
                    value={cumulativeMg}
                    onChange={(e) => setCumulativeMg(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={mapId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Mevcut OAB (mmHg)
                  </label>
                  <input
                    id={mapId}
                    type="number"
                    min={30}
                    max={120}
                    value={currentMap}
                    onChange={(e) => setCurrentMap(Math.max(30, Math.min(120, Number(e.target.value) || 30)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={hrId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Mevcut KTA (/dk)
                  </label>
                  <input
                    id={hrId}
                    type="number"
                    min={25}
                    max={180}
                    value={currentHr}
                    onChange={(e) => setCurrentHr(Math.max(25, Math.min(180, Number(e.target.value) || 25)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Sulandırma Seçimi */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Hazırlanan Enjektör Konsantrasyonu
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { val: 5, label: '5 mg/mL (Std)' },
                      { val: 10, label: '10 mg/mL' },
                      { val: 1, label: '1 mg/mL (Ped)' },
                    ] as const
                  ).map((d) => (
                    <button
                      key={d.val}
                      type="button"
                      onClick={() => setDilutionMgMl(d.val)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border cursor-pointer transition-colors ${
                        dilutionMgMl === d.val
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-amber-50 border-amber-500 text-amber-900'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-400'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Güvenlik Bayrakları */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMaoi}
                    onChange={(e) => setHasMaoi(e.target.checked)}
                    className="rounded border-slate-400 text-rose-600"
                  />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    Son 14 günde MAOI / Linezolid / Metilen Mavisi kullanımı
                  </span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasHocmOrAs}
                    onChange={(e) => setHasHocmOrAs(e.target.checked)}
                    className="rounded border-slate-400 text-rose-600"
                  />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    HOCM (LVOTO) veya Ciddi Aort Stenozu / Aktif Koroner İskemi
                  </span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {hasMaoi && (
                <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${isDark ? 'bg-rose-950/50 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-950'}`}>
                  <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">DUR! MAOI / Linezolid Etkileşimi — Efedrin KONTRENDİKE!</div>
                    <p className="mt-1 leading-relaxed">
                      İndirekt noradrenalin boşalması şiddetli hipertansif kriz, intraserebral kanama ve ölümcül aritmiye yol açar.
                      Doğrudan düşük doz <strong>direkt etkili vazopresör (Fenilefrin veya Noradrenalin)</strong> titre edin!
                    </p>
                  </div>
                </div>
              )}

              {hasHocmOrAs && (
                <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${isDark ? 'bg-rose-950/40 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-950'}`}>
                  <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">HOCM / Ciddi Aort Stenozu — Efedrin’den Kaçının!</div>
                    <p className="mt-1 leading-relaxed">
                      β₁ inotropi ve taşikardi çıkış yolu obstrüksiyonunu (SAM) ağırlaştırır ve diyastolik koroner perfüzyonu bozar.
                      Bunun yerine <strong>saf α₁ agonisti Fenilefrin</strong> (50–100 mcg IV) tercih edin.
                    </p>
                  </div>
                </div>
              )}

              {isMaxCeilingReached && (
                <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${isDark ? 'bg-amber-950/40 border-amber-500/50 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'}`}>
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">50 mg Kümülatif Tavan &amp; Taşiflaksi — Direkt Vazopresöre Geçin!</div>
                    <p className="mt-1 leading-relaxed">
                      Presinaptik endojen noradrenalin depoları tükenmiştir. Daha fazla efedrin vermek yerine{' '}
                      <strong>Noradrenalin infüzyonu</strong> (0,02–0,1 mcg/kg/dk) veya <strong>Fenilefrin</strong> başlayın ve hipovolemi/kanamayı yeniden değerlendirin.
                    </p>
                  </div>
                </div>
              )}

              {!isMaxCeilingReached && isTachyphylaxisRisk && (
                <div className={`rounded-xl border p-3 text-xs flex items-start gap-2 ${isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Taşiflaksi Eşiği ({cumulativeMg} / 50 mg):</strong> Kümülatif doz 30 mg’ı aştı; yanıt azalıyorsa direkt vazopresör (Noradrenalin / Fenilefrin) hazırlayın.
                  </span>
                </div>
              )}

              {/* Sonuç Kutusu */}
              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                    {patientGroup === 'adult' ? 'Erişkin İntraoperatif Bolus' : 'Pediatrik İntraoperatif Bolus'}
                  </span>
                  <span className="font-mono text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
                    {intraopRec.doseMg.toFixed(patientGroup === 'pediatric' ? 1 : 0)} mg IV
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Doz Rejimi</div>
                    <div className="mt-1 font-semibold leading-relaxed">{intraopRec.rangeText}</div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Çekilecek Hacim ({dilutionMgMl} mg/mL)</div>
                    <div className="mt-1 font-mono font-bold text-amber-600 dark:text-amber-400 leading-relaxed">{intraopRec.volText}</div>
                  </div>
                </div>

                {/* Erişkin Kümülatif Tavan Göstergesi */}
                {patientGroup === 'adult' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-mono tabular-nums">
                      <span className="text-slate-500">Kümülatif Tavan Kullanımı (50 mg)</span>
                      <span className={`font-bold ${isMaxCeilingReached ? 'text-rose-500' : isTachyphylaxisRisk ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {cumulativeMg} / 50 mg (%{Math.min(100, Math.round((cumulativeMg / 50) * 100))})
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isMaxCeilingReached ? 'bg-rose-500' : isTachyphylaxisRisk ? 'bg-amber-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${Math.min(100, (cumulativeMg / 50) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <strong>Klinik Değerlendirme:</strong> {intraopRec.note}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OBSTETRİK SEZARYEN KARAR DESTEK */}
        {activeTab === 'obstetric' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={obsBaseId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Bazal Maternal SKB (mmHg)
                  </label>
                  <input
                    id={obsBaseId}
                    type="number"
                    min={85}
                    max={180}
                    value={obsBaselineSbp}
                    onChange={(e) => setObsBaselineSbp(Math.max(85, Math.min(180, Number(e.target.value) || 85)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={obsCurrId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Mevcut SKB (mmHg)
                  </label>
                  <input
                    id={obsCurrId}
                    type="number"
                    min={50}
                    max={180}
                    value={obsCurrentSbp}
                    onChange={(e) => setObsCurrentSbp(Math.max(50, Math.min(180, Number(e.target.value) || 50)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={obsHrId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Maternal KTA (/dk)
                  </label>
                  <input
                    id={obsHrId}
                    type="number"
                    min={35}
                    max={160}
                    value={obsHr}
                    onChange={(e) => setObsHr(Math.max(35, Math.min(160, Number(e.target.value) || 35)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={obsCumId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Verilen Efedrin (mg)
                  </label>
                  <input
                    id={obsCumId}
                    type="number"
                    min={0}
                    max={60}
                    step={5}
                    value={obsCumulativeEphedrine}
                    onChange={(e) => setObsCumulativeEphedrine(Math.max(0, Math.min(60, Number(e.target.value) || 0)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={obsFetalDistress}
                  onChange={(e) => setObsFetalDistress(e.target.checked)}
                  className="rounded border-slate-400 text-rose-600"
                />
                <span className="text-rose-600 dark:text-rose-400 font-semibold">
                  Fetal distres / NST bozukluğu / acil sezaryen mevcut
                </span>
              </label>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div
                className={`rounded-xl border p-4 space-y-2.5 ${
                  obsVerdict.tone === 'rose'
                    ? isDark
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-100'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : obsVerdict.tone === 'teal'
                      ? isDark
                        ? 'bg-teal-950/40 border-teal-500/50 text-teal-100'
                        : 'bg-teal-50 border-teal-300 text-teal-950'
                      : obsVerdict.tone === 'amber'
                        ? isDark
                          ? 'bg-amber-950/40 border-amber-500/50 text-amber-100'
                          : 'bg-amber-50 border-amber-300 text-amber-950'
                        : isDark
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                }`}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-bold text-sm">{obsVerdict.headline}</span>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-black/10 dark:bg-white/10 tabular-nums">
                    SKB: Bazalin %{obsSbpPct}’i
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-95">{obsVerdict.detail}</p>
              </div>

              <div className={`rounded-xl border p-3.5 text-xs leading-relaxed ${isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                <strong>Neden Obstetride Fenilefrin / Noradrenalin Önde?</strong> Ngan Kee (2009) ve Lee (2002) verileri, Efedrin’in plasentayı geçip fetüste
                doğrudan β-adrenerjik metabolik uyarım yaparak umblikal arter laktatını artırdığını ve pH’yı düşürdüğünü göstermiştir.
                Efedrin obstetride artık <em>bradikardiye eşlik eden hipotansiyon</em> veya Fenilefrin’in refleks bradikardisini dengelemek için seçici olarak kullanılır.
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SULANDIRMA & VAZOPRESÖR KARŞILAŞTIRMA */}
        {activeTab === 'dilution_compare' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className={`rounded-xl border p-4 space-y-1.5 ${isDark ? 'bg-purple-950/25 border-purple-500/30' : 'bg-purple-50/70 border-purple-200'}`}>
                <div className="font-bold text-purple-700 dark:text-purple-300">Erişkin Standart Enjektör (5 mg/mL)</div>
                <p className={`leading-relaxed font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  1 ampul Efedrin (50 mg / 1 mL) + 9 mL %0,9 NaCl = <strong>10 mL (5 mg/mL)</strong>
                </p>
                <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  1 mL = 5 mg · 2 mL = 10 mg. ISO standart <strong>mor (lavanta)</strong> etiket yapıştırın ve konsantrasyonu yazın.
                </p>
              </div>

              <div className={`rounded-xl border p-4 space-y-1.5 ${isDark ? 'bg-sky-950/25 border-sky-500/30' : 'bg-sky-50/70 border-sky-200'}`}>
                <div className="font-bold text-sky-700 dark:text-sky-300">Pediatrik Hassas Enjektör (1 mg/mL)</div>
                <p className={`leading-relaxed font-mono ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  5 mg/mL enjektörden 2 mL (10 mg) + 8 mL %0,9 NaCl = <strong>10 mL (1 mg/mL)</strong>
                </p>
                <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  10 kg çocukta 0,1–0,2 mg/kg = 1–2 mL; küçük çocuklarda aşırı doz hatasını önler.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                    <th className="py-2 pr-3 font-bold">Özellik</th>
                    <th className="py-2 pr-3 font-bold text-purple-600 dark:text-purple-400">Efedrin</th>
                    <th className="py-2 pr-3 font-bold text-sky-600 dark:text-sky-400">Fenilefrin</th>
                    <th className="py-2 font-bold text-rose-600 dark:text-rose-400">Noradrenalin</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/80 text-slate-200' : 'divide-slate-100 text-slate-800'}`}>
                  <tr>
                    <td className="py-2 pr-3 font-semibold">Reseptör / Etki</td>
                    <td className="py-2 pr-3">Karma Direkt + İndirekt α₁, β₁, β₂</td>
                    <td className="py-2 pr-3">Direkt saf α₁ agonist</td>
                    <td className="py-2">Direkt güçlü α₁ + ılımlı β₁</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-semibold">Kalp Hızı (KTA) &amp; Debi</td>
                    <td className="py-2 pr-3">KTA ↑ · Kardiyak debi ↑ / korunur</td>
                    <td className="py-2 pr-3">Refleks bradikardi (KTA ↓) · CO ↓ olabilir</td>
                    <td className="py-2">KTA nötr/hafif ↓ · CO korunur</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-semibold">Taşiflaksi Riski</td>
                    <td className="py-2 pr-3 font-bold text-amber-600 dark:text-amber-400">YÜKSEK (&gt; 30–50 mg)</td>
                    <td className="py-2 pr-3 text-emerald-600 dark:text-emerald-400">Yok (Direkt)</td>
                    <td className="py-2 text-emerald-600 dark:text-emerald-400">Yok (Direkt)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-semibold">Obstetrik Fetal pH</td>
                    <td className="py-2 pr-3 text-rose-600 dark:text-rose-400">Daha düşük pH / laktat ↑</td>
                    <td className="py-2 pr-3 text-emerald-600 dark:text-emerald-400">Üstün (1. tercih)</td>
                    <td className="py-2 text-emerald-600 dark:text-emerald-400">Üstün (KTA’yı daha iyi korur)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-semibold">İdeal Klinik Senaryo</td>
                    <td className="py-2 pr-3">Hipotansiyon + düşük/normal KTA, geçici bolus</td>
                    <td className="py-2 pr-3">Hipotansiyon + taşikardi, HOCM, AS, KAH</td>
                    <td className="py-2">Sürekli infüzyon, septik/vazoplejik şok, dirençli IOH</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </MonographAccordionSection>

      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0) */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Efedrin HCl 50 mg / 1 mL Ampul (%5 — Türkiye Standart Formu)',
            presentation: '1 mL berrak steril enjeksiyonluk çözelti içeren cam ampul (Osel / Galen / Biofarma)',
            concentration: '50 mg / mL (%5 Konsantre)',
            saltOrBaseNote:
              'KRİTİK: Türkiye’deki ticari ampul 50 mg/1 mL konsantredir ve ASLA sulandırılmadan doğrudan IV puşe yapılmaz! 1 mL = 10 erişkin başlangıç dozudur.',
            alertLevel: 'high',
          },
          {
            name: 'Ameliyathane Standart Seyreltilmiş Enjektörleri (Yatak Başı)',
            presentation: '10 mL enjektörde %0,9 NaCl ile seyreltilmiş kullanıma hazır çözelti (ISO Mor / Lavanta Etiket)',
            concentration: '5 mg/mL (Erişkin) · 1 mg/mL (Pediatrik)',
            saltOrBaseNote:
              'Erişkin standardı 5 mg/mL (1 mL = 5 mg, 2 mL = 10 mg); pediatrik hassas dozlama 1 mg/mL ile yapılır.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Erişkin Standart (5 mg/mL): 1 ampul Efedrin (50 mg / 1 mL) + 9 mL %0,9 NaCl = 10 mL enjektör → 1 mL = 5 mg, 2 mL = 10 mg.',
          'Pediatrik Hassas (1 mg/mL): Yukarıdaki 5 mg/mL enjektörden 2 mL (10 mg) + 8 mL %0,9 NaCl = 10 mL → 1 mL = 1 mg (0,1–0,2 mg/kg için).',
          'Yüksek Konsantrasyon Alternatifi (10 mg/mL): 1 ampul (50 mg) + 4 mL SF = 5 mL (hata riski daha yüksek olduğundan rutin 5 mg/mL önerilir).',
        ]}
        concentrationTrapWarning="50 mg/1 mL ampulün sulandırılmadan 1 mL IV verilmesi 10 kat doz aşımına, ani malign hipertansiyona, akut pulmoner ödeme ve intraserebral kanamaya yol açar! Ayrıca Efedrin ile Epinefrin (Adrenalin) LASA (ses benzerliği) açısından ameliyathanede en sık karıştırılan çiftlerden biridir."
      />

      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0) */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="peripheral-ok"
        accessSummary="Serbest akan periferik veya santral IV hattan güvenle bolus uygulanabilir. Bolus sonrası hattaki ölü boşluğu temizlemek ve etkiyi hızlandırmak için 5–10 mL %0,9 NaCl ile yıkayın (flush)."
        phRange="4.5 – 7.0 (Hafif Asidik · Stabil)"
        osmolalityNote="5 mg/mL SF dilüsyonu izotoniktir; non-katekolamin yapısı nedeniyle doku vezikan nekroz riski Noradrenalin/Adrenalin’e göre çok düşüktür."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (İzotonik SF) — 24 saat stabil',
          '%5 Dekstroz (D5W) — 24 saat stabil',
          'Ringer Laktat (RL) — 24 saat stabil',
        ]}
        stabilityNote="Oda sıcaklığında ve ışıktan korunarak saklanır; 5 mg/mL SF dilüsyonu ameliyathane koşullarında 24 saat kimyasal olarak stabildir."
        ySiteCompatible={[
          'Atropin',
          'Lidokain',
          'Fentanil',
          'Midazolam',
          'Propofol',
          'Roküronyum',
          'Oksitosin (fiziksel uyumlu; KB yakından izlenir)',
          'Ondansetron',
        ]}
        ySiteIncompatible={[
          'Sodyum Bikarbonat (%8.4 NaHCO₃ — alkali çökme/inaktivasyon!)',
          'Tiyopental',
          'Fenobarbital',
          'Hidrokortizon (yüksek konsantrasyonda değişken)',
        ]}
        extravasationProtocol="Ekstravazasyon nekroz riski direkt güçlü α₁ katekolaminlere göre düşüktür; ancak sızıntı şüphesinde enjeksiyonu durdurun, ekstremiteyi eleve edin ve lokal solukluk/iskemi gelişirse ılık kompres ile gerekirse 5–10 mg Fentolamin SC infiltrasyon değerlendirin."
      />

      {/* 8. BÖBREK VE KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Ana atılım yolu böbrektir (%60–75 değişmeden); tek/düşük dozda ayar gerekmez ama ileri KBH’de tekrarlayan dozlarda birikim ve hipertansiyon uzar."
        renalDetails={[
          'İdrar pH’sı renal klirensi doğrudan belirler: Alkali idrarda (NaHCO₃, Asetazolamid, RTA) tübüler geri emilim artar ve t½ 6 saati aşar.',
          'İleri KBH / anüride (eGFR < 30 mL/dk) tekrarlayan efedrin bolusları yerine kısa etkili direkt ajan (Noradrenalin/Fenilefrin) tercih edilmelidir.',
        ]}
        hepaticSummary="Karaciğer metabolizması minördür; tek/kısa süreli intraoperatif boluslarda doz ayarı gerekmez."
        hepaticDetails={[
          'İleri sirozda splanknik vazodilatasyon ve otonom disfonksiyon nedeniyle efedrin yanıtı öngörülemez olabilir → erken Noradrenalin infüzyonu üstündür.',
        ]}
        {...STANDALONE_ORGAN_PART1['ephedrine']}
      />

      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0) */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="Küçük Bolus (2.5–5 mg) · İskemi & Taşikardi Riski"
        geriatricPoints={[
          '>65 yaş ve kırılgan hastalarda baroreseptör tamponlama kapasitesi azaldığından standart 10 mg bolus abartılı hipertansiyon, taşikardi ve miyokard iskemisi (MINS) tetikleyebilir; 2,5–5 mg küçük titre boluslarla başlanmalıdır.',
          'Yaşlılarda koroner arter hastalığı, paroksismal AF, BPH (akut idrar retansiyonu) ve dar açılı glokom sıklığı yüksektir; taşikardi eşlik eden hipotansiyonda saf α₁ Fenilefrin veya düşük doz Noradrenalin daha güvenlidir.',
          'Lipofilik yapısı kan-beyin bariyerini geçtiğinden uyanık/rejyonel anestezide yaşlı hastalarda anksiyete, ajitasyon ve postoperatif deliryuma katkı verebilir; ayrıca yaşa bağlı azalan GFR nedeniyle tekrarlayan dozlarda etki süresi uzar.',
        ]}
        obesityWeightScalarBadge="Erişkin Sabit Titre Bolus (5–10 mg) · LBW/IBW Referans"
        obesityPoints={[
          'Erişkin obez hastalarda (BMI ≥ 30–40 kg/m²) efedrin toplam vücut ağırlığına (TBW) göre ölçeklenmez — standart 5–10 mg IV titre boluslarla başlanır ve kümülatif 50 mg tavanı AŞILMAZ (SOBA / Miller’s).',
          'Ağırlık bazlı hesaplama gereken adolesan/özel olgularda TBW yerine LBW veya IBW esas alınmalıdır; aşırı bolus obezitede sık görülen hipertansiyon ve sol ventrikül diyastolik disfonksiyonunu ağırlaştırır.',
          'Uzayan hipotansiyonda tekrarlayan efedrin bolusları taşiflaksi yaratacağından erken Noradrenalin/Fenilefrin infüzyonuna (AdjBW/IBW) geçilmelidir.',
        ]}
      />

      {/* 9. GEBELİK, OBSTETRİK VE LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Plasentayı serbestçe geçer (UV/MA ~1,13) — Sezaryen spinal hipotansiyonunda 1. tercih Fenilefrin/Noradrenalin’dir; Efedrin düşük KTA’da seçici kullanılır."
        pregnancyDetails={[
          'Ngan Kee (2009) & Lee (2002): Efedrin, uteroplasental kan akımını korusa da fetüste doğrudan β-adrenerjik metabolizmayı uyararak umblikal arter pH’sını düşürür ve laktatı yükseltir.',
          'Kinsella (2018) Konsensüsü: Maternal bazal KTA düşükse veya Fenilefrin ile bradikardi geliştiyse 5–10 mg IV Efedrin güvenle eklenebilir; toplam dozu 15–20 mg altında tutmak fetal asidemi riskini azaltır.',
          'Postpartum Metilergonovin (ergot) veya yüksek doz oksitosin ile eş zamanlı uygulamada şiddetli hipertansif kriz ve serebral vazospazm riskine dikkat!',
        ]}
        lactationSummary="Anne sütüne düşük miktarda geçer; perioperatif tek/düşük doz (5–20 mg) sonrası emzirmeyi kesmek gerekmez."
        lactationDetails={[
          'Yüksek veya tekrarlayan dozlarda sütteki geçiş yenidoğanda geçici huzursuzluk ve taşikardi yapabilir; kısa süreli gözlem yeterlidir.',
        ]}
      />

      {/* 10. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Taşiflaksi (Hızlı Yanıt Kaybı)',
            incidenceOrSeverity: 'Çok Sık · > 30–50 mg',
            tone: 'amber',
            detail:
              'Presinaptik sempatik noradrenalin depolarının boşalmasına bağlıdır. Kümülatif 30–50 mg sonrası ek boluslarla basınç yükselmez; direkt vazopresöre geçiş şarttır.',
          },
          {
            title: 'Taşikardi, Aritmi & Miyokard İskemisi',
            incidenceOrSeverity: 'Sık · Doz Bağımlı',
            tone: 'rose',
            detail:
              'β₁ uyarısına bağlı sinüs taşikardisi, SVT/AF hızlanması, PVC ve koroner arter hastalarında artan miyokard O₂ tüketimi sonucu iskemi (MINS).',
          },
          {
            title: 'Rebound Hipertansiyon & İntrakraniyal Kanama',
            incidenceOrSeverity: 'Doz İstifleme / Sulandırmama',
            tone: 'rose',
            detail:
              'Etki başlangıcı 1–2 dk olduğundan aceleyle üst üste verilen boluslar veya 50 mg/1 mL ampulün sulandırılmadan uygulanması ani malign hipertansiyona yol açabilir.',
          },
          {
            title: 'Fetal Metabolik Asidemi & SSS Uyarımı',
            incidenceOrSeverity: 'Obstetrik & Perioperatif',
            tone: 'amber',
            detail:
              'Obstetride yüksek dozda düşük umblikal arter pH; uyanık/rejyonel anestezide anksiyete, tremor, baş ağrısı, hafif MAC artışı ve akut idrar retansiyonu.',
          },
        ]}
      />

      {/* 11. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Neden 30–50 mg Sonrası Efedrin Çalışmaz? (Taşiflaksi)',
            detail:
              'Efedrin kendi reseptör etkisinden çok sinir ucundaki hazır noradrenalin depolarına bağımlıdır. Depolar tükendiğinde ek efedrin kan basıncını artırmaz; hemen direkt etkili Fenilefrin veya Noradrenalin’e geçin.',
          },
          {
            title: 'Linezolid & Metilen Mavisi "Gizli MAOI" Tuzağı',
            detail:
              'Klasik psikiyatrik MAOI’ler dışında antibiyotik Linezolid ve vazoplejide kullanılan Metilen Mavisi güçlü MAO inhibitörleridir. Bu ilaçları alan hastaya Efedrin vermek ölümcül hipertansif kriz tetikleyebilir!',
          },
          {
            title: 'Kronik Katekolamin Deplesyonu & Otonom Nöropati',
            detail:
              'Uzun süreli yoğun bakım/septik şok hastalarında, ağır diyabetik otonom nöropatide veya sempatolitik (rezerpin/metildopa) kullananlarda endojen NE depoları düşük olduğu için Efedrin etkisiz kalabilir.',
          },
          {
            title: 'İdrar Alkalinizasyonu Yarı Ömrü İkiye Katlar',
            detail:
              'Efedrin zayıf bir bazdır; Sodyum Bikarbonat veya Asetazolamid ile idrar alkalileşirse non-iyonize fraksiyon tübüllerden geri emilir ve taşikardi/hipertansiyon etkisi beklenenden uzun sürer.',
          },
          {
            title: 'Halotan / Yüksek Doz Uçucu Anestezik Aritmi Duyarlılığı',
            detail:
              'Modern ajanlarda (sevofluran/desfluran) çok nadir olsa da hipoksi, hiperkarbi veya elektrolit bozukluğu (hipokalemi) varlığında β₁ uyarısı ventriküler ektopileri tetikleyebilir.',
          },
          {
            title: 'Efedrin + Ergot Alkaloidi (Metilergonovin) Sinerjisi',
            detail:
              'Postpartum atoni için Metilergonovin uygulanan hastada yakın zamanda yüksek doz Efedrin verilmişse şiddetli vazospazm, hipertansif ensefalopati veya inme gelişebilir.',
          },
        ]}
      />

      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (Presinaptik NET / VMAT2 Substratı & Postsinaptik α₁ / β₁ / β₂ GPCR)',
          summary:
            'Efedrin (L-eritro-2-(metilamino)-1-fenilpropan-1-ol), fenil halkasında 3,4-dihidroksi (katekol) grubu bulunmayan ve α-karbonunda metil yan zinciri taşıyan non-katekolamin fenilizopropilamin türevidir. Hem presinaptik sempatik akson varikozitesi zarındaki Norepinefrin Taşıyıcısına (NET / SLC6A2 / Uptake-1; Ki ~0,5–2 µM) yüksek afiniteli substrat olarak bağlanıp veziküler noradrenalin salınımını tetikler (~%60–75 baskın indirekt etki), hem de postsinaptik sarkolemmadaki α₁, β₁ ve β₂ adrenoseptörlerine düşük-orta afiniteyle (Ki ~10–50 µM) doğrudan parsiyel/tam agonist olarak kenetlenir (Miller’s 10th Ed. / Stoelting’s 6th Ed. / Goodman & Gilman).',
          points: [
            'Presinaptik Sempatik Sinir Ucu Zarı & Sinaptik Vezikül Membranı (NET / SLC6A2 & VMAT2 Substrat Değişimi): Na⁺/Cl⁻ bağımlı presinaptik NET simporteri tarafından endojen noradrenalin yerine yarışmalı olarak akson sitozolüne taşınır; ardından sinaptik vezikül membranındaki Veziküler Monoamin Taşıyıcı-2 (VMAT2 / SLC18A2) üzerinden asidik vezikül lümenine girer.',
            'Vasküler Düz Kas Hücresi Sarkolemması (Postsinaptik α₁A/B/D-Adrenoseptörler): Özellikle splanknik ve sistemik kapasitans venülleri ile rezistans arteriyollerinin sarkolemmasındaki α₁ reseptörlerini, hem sinaptik aralığa boşalttığı endojen noradrenalin aracılığıyla hem de doğrudan Gαq/11 kenetlenmesiyle aktive eder.',
            'Kardiyomiyosit & SA/AV Düğüm Sarkolemması (Postsinaptik β₁-Adrenoseptörler): SA düğüm pacemaker hücreleri ve ventrikül miyokardındaki β₁ reseptörlerini (Gαs) hem salınan endojen noradrenalin hem de doğrudan bağlanmayla uyarır.',
            'Bronşiyal, Vasküler & Plasental/Fetal Hücre Zarları (β₂-Adrenoseptör & MAO/COMT Enzim Direnci): Katekol halkası olmadığı için endotelyal/hepatik COMT için substrat değildir ve α-metil karbonu sayesinde mitokondriyal MAO-A/B deaminasyonuna dirençlidir; bu lipofilik yapı kan-beyin bariyeri (KBB) endotel zarını ve plasental sinsityotrofoblast membranını yıkılmadan pasif difüzyonla geçmesini sağlar.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'Efedrinin presinaptik vezikül içi proton gradientini yıkmasıyla başlayan nörokimyasal deşarj, postsinaptik düz kas ve miyokard hücrelerinde Ca²⁺ ve cAMP bağımlı ikincil haberci kaskadlarını harekete geçirir:',
          points: [
            'Presinaptik Sinaptik Vezikül İçi ("Weak Base" Proton Gradient Yıkımı & Ters-NET Taşınımı): Zayıf baz (pKa ~9,6) olan efedrin VMAT2 üzerinden asidik sinaptik vezikül içine (pH ~5,5) girdiğinde H⁺ iyonlarını bağlayarak vezikül içi pH gradientini (V-ATPaz proton motor gücünü) nötralize eder. Vezikül içinde kromogranin matriksinden kopan serbest noradrenalin sitozole sızar ve fosforile olmuş NET taşıyıcısının ters yönde çalışmasıyla (reverse transport / Ca²⁺-bağımsız non-ekzositotik efluks) sinaptik aralığa boşalır.',
            'Kardiyomiyosit & SA Düğüm Hücresi İçi (β₁ → Gαs → AC → cAMP↑ → PKA → Cav1.2, RyR2, PLB & HCN4): Sinaptik aralığa salınan noradrenalin ve efedrinin β₁ uyarımıyla yükselen cAMP/PKA; L-tipi Ca²⁺ kanallarını (Cav1.2) ve SR Riyanodin Reseptörlerini (RyR2) fosforilleyerek sistolik Ca²⁺ transientini büyütür (inotropi), Fosfolamban fosforilasyonuyla SERCA2a Ca²⁺ geri alımını hızlandırır (lusitropi) ve SA düğümde HCN4 (If) pacemaker kanallarını açarak Faz 4 diyastolik depolarizasyonu hızlandırır (kronotropi).',
            'Venöz & Arteriyoler Düz Kas Hücresi İçi (α₁ → Gαq/11 → PLC-β → IP₃/DAG → SR Ca²⁺ & MLCK / RhoA-ROCK): PLC-β aktivasyonuyla oluşan IP₃ sarkoplazmik retikulum IP₃R kanallarından Ca²⁺ salınımı yapar; Ca²⁺-Kalmodulin kompleksi MLCK’yı aktive ederek MLC₂₀’yi fosforillerken, DAG/PKC ve RhoA/ROCK yolağı Miyozin Fosfatazı (MLCP) inhibe ederek özellikle venöz kapasitans yataklarında uzun süreli (10–20 dk) tonik kasılma oluşturur.',
            'Bronş Düz Kası & Fetal Hepatosit/Adiposit Hücre İçi (β₂/β₁ → Gαs → cAMP/PKA → MLCK İnhibisyonu & Glikojenoliz/Lipoliz): Bronş düz kasında cAMP/PKA artışı MLCK’yı inhibe ederek gevşeme sağlar; fetüs dokularında ise efedrinin doğrudan β-reseptör uyarımı glikojen fosforilaz ve hormon-duyarlı lipazı aktive ederek hücresel O₂ tüketimini, glikolizi, pirüvat/laktat üretimini ve H⁺ birikimini artırır.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Venöz Kapasitans, Rezistans Arteriyol & Miyokard Dokusu → Kardiyovasküler Sistem',
            tissueTarget: 'Splanknik Venöz Kapasitans · Arteriyol · SA Düğüm & Miyokard',
            accent: 'rose',
            points: [
              'Selektif Venokonstrüksiyon & Preload Restorasyonu: Efedrin, splanknik ve kutanöz kapasitans venlerini rezistans arteriyollerine kıyasla daha güçlü kasar; spinal/epidural sempatik blokaj veya genel anestezi indüksiyonunda göllenen unstressed venöz kanı sağ kalbe geri kazandırarak (Pmsf↑, preload↑) atım hacmini (SV) korur.',
              'Dengeli Kronotropi/İnotropi & Kardiyak Debi (CO): Saf α₁ agonist (Fenilefrin) uygulamasında görülen baroreseptör refleks bradikardi ve kardiyak debi düşüşünün aksine, eşzamanlı β₁ uyarımıyla kalp hızını ve kontraktiliteyi artırarak CO’yu yükseltir; ancak taşikardik veya koroner arter hastalığı olan olgularda miyokard O₂ tüketimini (MVO₂) artırarak subendokardiyal iskemi (MINS) tetikleyebilir.',
              'Yavaş Başlangıç (1–2 dk) & Uzamış Pressör Plato (10–20 dk): Presinaptik NET üzerinden hücre içine giriş ve veziküler NE deplasmanı zaman aldığından pik pressör etki 2–5 dakikada oturur (Fenilefrin/Noradrenalinde 30–45 sn) ve MAO/COMT ile yıkılmadığı için 10–20 dakika sürer.',
            ],
          },
          {
            systemTitle: 'Uteroplasental Vasküler Yatak & Fetal Dokular → Obstetrik & Fetal Fizyoloji',
            tissueTarget: 'Uterin Spiral Arterler · Sinsityotrofoblast · Fetal Miyokard/KC',
            accent: 'amber',
            points: [
              'Uterin Arter β₂ Korunması vs Serbest Plasental Geçiş (UV/MA ~1,13): Uterin arterlerde α₁ kasılmasını β₂ vazodilatasyonla dengelediği için uteroplasental kan akımını korur; ancak lipofilik ve MAO/COMT’ye dirençli yapısı nedeniyle plasental enzimatik bariyere takılmadan fetüse bire bir oranında (umblikal ven / maternal arter oranı ~1,13) geçer.',
              'Fetal β-Adrenerjik Metabolik Asidemi Mekanizması (Ngan Kee 2009): Fetüse geçen efedrin, fetal dokularda doğrudan β-adrenerjik hipermetabolizma, glikojenoliz ve anaerobik/aerobik glikoliz fırtınası başlatarak umblikal arter pH’sını düşürür, PCO₂’yi, laktatı ve baz açığını (base deficit) artırır (bu nedenle sezaryende normal KTA’da 1. tercih Fenilefrin veya Noradrenalindir).',
              'Fetal Kardiyotokografi (NST) Yansıması: Maternal efedrin bolusu sonrası 5–10 dakika içinde fetüste geçici sinüs taşikardisi ve kalp hızı variabilitesinde artış gözlenebilir.',
            ],
          },
          {
            systemTitle: 'Santral Noradrenerjik Ağ, Bronş & Üriner Sfinkter Dokusu → SSS, Solunum & Ürogenital',
            tissueTarget: 'Kan-Beyin Bariyeri · Retiküler Aktivasyon (RAS) · Mesane Sfinkteri',
            accent: 'indigo',
            points: [
              'Kan-Beyin Bariyeri (KBB) Geçişi & MAC Artışı: Non-katekolamin lipofilik yapısıyla KBB’yi hızla geçerek locus coeruleus ve retiküler aktive edici sistemde (RAS) santral noradrenalin/dopamin salınımını artırır → uyanık hastada anksiyete, ajitasyon ve tremor yaparken, genel anestezide volatil anesteziklerin Minimum Alveoler Konsantrasyon (MAC) gereksinimini %10–20 artırabilir.',
              'Bronşiyal Düz Kas & Pulmoner Yatak: Bronş düz kasında β₂-cAMP yoluyla hafif-orta bronkodilatasyon ve nazal/faringeal mukozada α₁ dekonjesyon sağlar; pulmoner arter basıncını (PAP) hafif yükseltebilir.',
              'Mesane Trigon/Sfinkter & Detrüsör Düz Kası: İnternal üretral sfinkter ve prostat kapsülündeki α₁A reseptörlerini kasarken detrüsör düz kasındaki β₂ reseptörlerini gevşetir → özellikle benign prostat hiperplazisi (BPH) olan yaşlı erkeklerde postoperatif akut idrar retansiyonu riskini artırır.',
            ],
          },
          {
            systemTitle: 'Renal Tübül Epiteli & Sempatik Varikozite Depoları → Böbrek & Nörotransmitter Homeostazı',
            tissueTarget: 'Distal Renal Tübül (pH-Bağımlı) · Presinaptik Vezikül Havuzu',
            accent: 'teal',
            points: [
              'Renal Tübüler İyon Tuzağı & İdrar pH Bağımlı Eliminasyon: %60–75 oranında karaciğerde metabolize olmadan böbrekten değişmemiş ilaç olarak süzülür. Zayıf baz (pKa ~9,6) olduğundan asidik idrarda (pH ~5,0) iyonize (BH⁺) kalarak hızla atılır (t½ ~3 saat); alkali idrarda (pH > 6,5–7,5; NaHCO₃ veya Asetazolamid kullanımı) non-iyonize lipofilik form tübül epitelinden pasif geri emilerek eliminasyon yarı ömrünü >6–10 saate çıkarır.',
              'Presinaptik Veziküler Havuz Dinamiği: Sempatik sinir ucunda yalnızca "kolay salınabilir (readily releasable)" sitoplazmik/veziküler noradrenalin havuzunu boşaltabilir; tirozin hidroksilaz üzerinden yeni noradrenalin sentezi saatler sürdüğü için ardışık boluslarda vezikül havuzu hızla tükenir.',
              'Renal Perfüzyon Dengesi: Düşük-orta intraoperatif boluslarda (5–10 mg) kardiyak debiyi ve MAP’ı birlikte yükselterek renal kan akımını ve GFR’yi saf α₁ agonistlere göre daha dengeli korur.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Veziküler NE Deplesyonu (Taşiflaksi), MAOI Fırtınası & Tavan Etkisi',
          summary:
            'Efedrinin pressör etkisinin ~%60–75’inin presinaptik endojen noradrenalin salınımına bağımlı olması, hem akut taşiflaksi/tavan etkisinin hem de MAO inhibitörleriyle gelişen ölümcül ilaç etkileşiminin moleküler temelini oluşturur.',
          points: [
            'Presinaptik Veziküler NE Tükenmesi & Akut Taşiflaksi (30–50 mg Kümülatif Tavan): Kısa aralıklarla tekrarlanan IV boluslar (toplam >30–50 mg) sempatik varikozitelerdeki hazır veziküler noradrenalin havuzunu tamamen boşaltır. Ek olarak, yarı ömrü uzun (3–6 saat) olan efedrin postsinaptik α₁/β₁ reseptörlerini düşük intrinsik aktiviteli (zayıf/parsiyel agonist) olarak işgal etmeye devam ederek kalan endojen katekolaminlerin bağlanmasını da kompetitif olarak perdeler → kan basıncı yanıtı tamamen söner (taşiflaksi) ve doğrudan postsinaptik etkili Noradrenalin veya Fenilefrin’e geçiş zorunlu hale gelir.',
            'Kronik Katekolamin Deplesyonu Durumlarında Primer Yanıtsızlık: Uzamış septik/kardiyojenik şok (>24 saat YBÜ), ileri evre kalp yetmezliği, ağır diyabetik otonom nöropati, spinal kord kesisi veya rezerpin/kronik kokain kullanımı olan hastalarda bazal presinaptik NE depoları zaten boşalmış olduğundan efedrin ilk dozdan itibaren etkisiz kalır.',
            'MAOI / Linezolid / Metilen Mavisi Varlığında Masif Katekolamin Fırtınası (Mutlak Kontrendike): Mitokondriyal MAO-A enzimi inhibe edildiğinde (moklobemid, selegilin, fenelzin, antibiyotik Linezolid veya vazopleji tedavisinde verilen IV Metilen Mavisi) presinaptik sitozol ve veziküllerde normalin 5–10 katı noradrenalin birikir. Bu hastaya tek bir 5–10 mg efedrin bolusu verildiğinde, birikmiş devasa NE havuzu saniyeler içinde sinaptik aralığa boşalarak malign hipertansif kriz, intraserebral kanama ve akut sol ventrikül yetmezliği üretir.',
          ],
        }}
        clinicalPearls={[
          'Doz İstifleme (Dose Stacking) Tuzağı: Efedrinin presinaptik NET üzerinden hücreye girip NE salması 1–2 dakika, pik pressör etkisi ise 2–5 dakika sürer (Fenilefrin/Noradrenalin gibi 30–45 saniyede pik yapmaz!). 1. dakikada "tansiyon çıkmadı" diyerek ikinci/üçüncü 10 mg bolusu puşe etmek, 4. dakikada 220/120 mmHg rebound hipertansiyon ve intrakraniyal kanama/miyokard iskemisi yaratır.',
          'Sezaryen Spinal Hipotansiyonunda Kinsella 2018 & Ngan Kee Kuralı: Plasentayı serbestçe geçip (UV/MA ~1,13) fetal β-adrenerjik laktik asidemi yaptığı için sezaryende normal/yüksek maternal KTA’da 1. tercih Fenilefrin veya Noradrenalindir; Efedrin (5–10 mg IV) yalnızca maternal bradikardi (KTA < 60–65/dk) eşlik ettiğinde ve kümülatif <15–20 mg sınırında seçilir.',
          'HOCM (SAM) ve Ciddi Aort Stenozunda Neden Kontrendike? β₁ inotropi ve taşikardi, hipertrofik obstrüktif kardiyomiyopatide dinamik sol ventrikül çıkış yolu (LVOT) obstrüksiyonunu ve mitral ön yaprakçığın sistolik öne hareketini (SAM) ağırlaştırır; ciddi aort stenozunda ise diyastolik koroner dolum süresini kısaltarak dramatik subendokardiyal iskemi ve arrest tetikler (bu hastalarda saf α₁ Fenilefrin kullanılır!).',
          'Linezolid & Metilen Mavisi "Gizli MAOI" Sorgulaması: Ameliyathaneye gelen ortopedi, yanık veya YBÜ hastasında VRE/MRSA için kullanılan Linezolid antibiyotiği geri dönüşümlü non-selektif MAO inhibitörüdür — bu hastalarda hipotansiyon tedavisinde Efedrin kesinlikle kullanılmaz, düşük doz direkt Noradrenalin veya Fenilefrin titre edilir.',
        ]}
      />

      {/* 13. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Efedrin Hidroklorür"
        drugsComUrl="https://www.drugs.com/drug-interactions/ephedrine.html"
        medscapeUrl="https://reference.medscape.com/drug/akovaz-ephedrine-342432"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'MAOI (Fenelzin · Tranilsipromin · Selejilin) · LİNEZOLİD · METİLEN MAVİSİ',
            mechanism: 'Presinaptik Birikmiş NE Depolarının Ani Masif Boşalımı',
            clinicalEffect: 'Ölümcül hipertansif kriz, intraserebral kanama, akut pulmoner ödem ve malign aritmi.',
            management: 'Son 14 gün içinde MAOI/Linezolid/Metilen Mavisi alan hastada EFEDRİN KESİNLİKLE VERİLMEZ; düşük doz direkt Fenilefrin/Noradrenalin titre edin.',
          },
          {
            severity: 'D',
            agent: 'Ergot Alkaloidleri (Metilergonovin) & Yüksek Doz Oksitosin (Obstetrik)',
            mechanism: 'Sinerjik Periferik & Serebral Vazokonstriksiyon',
            clinicalEffect: 'Postpartum şiddetli hipertansif kriz, serebral vazospazm ve inme riski.',
            management: 'Aynı dönemde kombinasyondan kaçının; mecburiyette dakika dakika kan basıncı izleyin ve vazodilatör hazır bulundurun.',
          },
          {
            severity: 'D',
            agent: 'Trisiklik Antidepresanlar (TCA) · SNRI · Kokain',
            mechanism: 'Presinaptik NET (Uptake-1) Blokajı',
            clinicalEffect: 'Düzensiz/abartılı hipertansif yanıt ve ventriküler taşiaritmi riski (veya kronik TCA’da öngörülemez azalmış/artmış yanıt).',
            management: 'Küçük titre boluslarla (2.5–5 mg) veya direkt etkili kısa süreli vazopresörlerle yönetin.',
          },
          {
            severity: 'D',
            agent: 'İdrar Alkalileştiriciler (Sodyum Bikarbonat · Asetazolamid)',
            mechanism: 'Renal Tübüler Geri Emilim Artışı (Zayıf Baz)',
            clinicalEffect: 'Efedrin eliminasyon yarı ömrü 2 katına (>6 saat) uzar; uzamış taşikardi, hipertansiyon ve tremor.',
            management: 'Alkali idrarlı hastalarda tekrarlayan efedrin boluslarından kaçının; direkt kısa etkili vazopresöre geçin.',
          },
          {
            severity: 'C',
            agent: 'Halojenli İnhalasyon Anestezikleri & Non-Selektif Beta-Blokerler',
            mechanism: 'Miyokardiyal Aritmi Duyarlılaşması / Karşılanmamış α₁',
            clinicalEffect: 'Ventriküler ektopi (özellikle hipoksi/hiperkapnide) veya β-bloker altında aşırı kan basıncı yükselişi.',
            management: 'Sürekli EKG ve KB monitörizasyonu altında en düşük etkin dozu uygulayın.',
          },
        ]}
        references={[
          {
            authors: 'Kinsella SM, Carvalho B, Dyer RA, et al.',
            title: 'International consensus statement on the management of hypotension with vasopressors during caesarean section under spinal anaesthesia',
            journal: 'Anaesthesia. 2018;73(1):71–92',
            year: 2018,
            pmid: '29090733',
            doi: '10.1111/anae.14080',
            note: 'Sezaryen spinal hipotansiyonunda Fenilefrin’in 1. tercih olduğu, Efedrin’in ise düşük maternal kalp hızında seçici kullanılması gerektiğini tanımlayan uluslararası konsensüs.',
          },
          {
            authors: 'Ngan Kee WD, Khaw KS, Tan PE, Ng FF, Karmakar MK, Gin T.',
            title: 'Placental transfer and fetal metabolic effects of phenylephrine and ephedrine during spinal anesthesia for cesarean delivery',
            journal: 'Anesthesiology. 2009;111(3):506–512',
            year: 2009,
            pmid: '19609145',
            doi: '10.1097/ALN.0b013e3181b160a3',
            note: 'Efedrin’in plasentayı serbestçe geçerek fetal metabolizmayı uyardığını ve umblikal arter laktat artışı / pH düşüşüne neden olduğunu kanıtlayan dönüm noktası RKÇ.',
          },
          {
            authors: 'Lee A, Ngan Kee WD, Gin T.',
            title: 'A quantitative, systematic review of randomized controlled trials of ephedrine versus phenylephrine for the management of hypotension during spinal anesthesia for cesarean delivery',
            journal: 'Anesthesia & Analgesia. 2002;94(4):920–926',
            year: 2002,
            pmid: '11916798',
            note: 'Efedrin ve Fenilefrin karşılaştırmalı sistematik derleme ve meta-analiz: Fenilefrin ile anlamlı olarak daha yüksek umblikal arter pH profili.',
          },
          {
            authors: 'Sessler DI, Bloomstone JA, Aronson S, et al. (POQI-3 Workgroup).',
            title: 'Perioperative Quality Initiative consensus statement on intraoperative blood pressure, risk and outcomes for elective surgery',
            journal: 'British Journal of Anaesthesia. 2019;122(5):563–574',
            year: 2019,
            pmid: '30916004',
            doi: '10.1016/j.bja.2019.01.013',
            note: 'İntraoperatif OAB < 65 mmHg eşiğinin miyokardiyal ve böbrek hasarı (MINS/AKI) ile ilişkisini ve zamanında vazopresör yönetimini tanımlayan POQI-3 konsensüsü.',
          },
        ]}
      />
    </div>
  );
};
