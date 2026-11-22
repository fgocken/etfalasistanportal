import React, { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  HeartPulse,
  ShieldAlert,
  Syringe,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  ContraindicationsGridBlock,
  DrugReferencesAndInteractionsBlock,
  HighAlertSafetyBlock,
  MechanismOfActionBlock,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
} from './shared/DrugMonographBlocks';

interface Props {
  isDark: boolean;
}

type CalcTab = 'bradycardia' | 'nmb_reversal' | 'organophosphate';
type BradyScenario = 'acls_adult' | 'intraop_vagal' | 'pals_child' | 'pals_adolescent';
type AmpuleStrength = 0.25 | 0.5 | 1;
type NmbDepth = 'shallow' | 'moderate';

export const AtropineProtocol: React.FC<Props> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<CalcTab>('bradycardia');
  const [pkOpen, setPkOpen] = useState<boolean>(true);

  // 1. Bradikardi (ACLS / PALS / İntraoperatif) State
  const [bradyScenario, setBradyScenario] = useState<BradyScenario>('acls_adult');
  const [weightKg, setWeightKg] = useState<number>(75);
  const [ampuleStrength, setAmpuleStrength] = useState<AmpuleStrength>(0.5);
  const [heartRate, setHeartRate] = useState<number>(38);
  const [hasAvBlockHigh, setHasAvBlockHigh] = useState<boolean>(false);
  const [isHeartTransplant, setIsHeartTransplant] = useState<boolean>(false);
  const [isUnstable, setIsUnstable] = useState<boolean>(true);

  // 2. NMB Reversal (Neostigmin + Atropin) State
  const [nmbWeightKg, setNmbWeightKg] = useState<number>(75);
  const [nmbDepth, setNmbDepth] = useState<NmbDepth>('moderate');
  const [nmbBaselineHr, setNmbBaselineHr] = useState<number>(68);

  // 3. Organofosfat / Karbamat Zehirlenmesi (Eddleston Doubling-Dose) State
  const [opSeverity, setOpSeverity] = useState<'moderate' | 'severe'>('severe');
  const [opInitialMg, setOpInitialMg] = useState<number>(2);
  const [opTotalAtropinizationMg, setOpTotalAtropinizationMg] = useState<number>(14);

  const weightId = useId();
  const hrId = useId();
  const nmbWtId = useId();
  const nmbHrId = useId();
  const opTotalId = useId();

  // --- 1. BRADİKARDİ HESAPLAMALARI ---
  const getBradyRecommendation = () => {
    if (bradyScenario === 'acls_adult') {
      const doseMg = 1.0;
      const volMl = doseMg / ampuleStrength;
      return {
        title: 'Erişkin Semptomatik Bradikardi (AHA ACLS 2020)',
        doseMg,
        rangeText: '1,0 mg IV bolus — her 3–5 dakikada bir tekrarlanabilir (Maksimum kümülatif: 3,0 mg)',
        ampText: `${volMl.toFixed(1)} mL (${ampuleStrength} mg/mL TR ampulden ${(doseMg / ampuleStrength).toFixed(1)} ampul)`,
        routeNote: 'Hızlı IV bolus + 10–20 mL %0,9 NaCl flush (düşük doz < 0,5 mg YAVAŞ verilirse paradoksal bradikardi riski!)',
        monitor:
          'Yanıt yoksa veya hemodinamik instabilite sürüyorsa gecikmeden Transkütanöz Pacing, Dopamin (5–20 mcg/kg/dk) veya Adrenalin (2–10 mcg/dk) infüzyonuna geçin.',
      };
    }

    if (bradyScenario === 'intraop_vagal') {
      const calcMg = Math.max(0.5, Math.min(1.0, Number((weightKg * 0.01).toFixed(2))));
      // Pratikte 0.5 veya 1.0 mg
      const practicalMg = calcMg >= 0.75 ? 1.0 : 0.5;
      const volMl = practicalMg / ampuleStrength;
      return {
        title: 'İntraoperatif Refleks / Vagal Bradikardi (Laparoskopi · Okülokardiyak · Spinal)',
        doseMg: practicalMg,
        rangeText: `0,5 – 1,0 mg IV bolus (Önerilen başlangıç: ${practicalMg.toFixed(1)} mg IV; erişkinde ≥ 0,5 mg ver!)`,
        ampText: `${volMl.toFixed(1)} mL (${ampuleStrength} mg/mL TR ampulden ${(practicalMg / ampuleStrength).toFixed(1)} ampul)`,
        routeNote: 'Önce tetikleyici cerrahi uyaranı (pnömoperitonyum, göz kası/mezenter traksiyonu) DURDURUN ve oksijenasyonu (SpO₂) doğrulayın!',
        monitor:
          'Spinal anestezide eşlik eden hipotansiyon (Bezold-Jarisch) varsa tek başına atropin yetmeyebilir → Efedrin 5–10 mg veya Adrenalin 10–50 mcg IV ekleyin.',
      };
    }

    // Pediatrik PALS (AHA 2020)
    const isAdolescent = bradyScenario === 'pals_adolescent';
    const maxSingle = isAdolescent ? 1.0 : 0.5;
    const maxTotal = isAdolescent ? 3.0 : 1.0;
    const pedWt = Math.min(weightKg, isAdolescent ? 80 : 40);
    const rawMg = pedWt * 0.02;
    const doseMg = Math.min(maxSingle, Number(rawMg.toFixed(2)));
    const volMl = doseMg / ampuleStrength;

    return {
      title: isAdolescent
        ? 'Pediatrik / Adolesan Semptomatik Bradikardi (AHA PALS 2020)'
        : 'Pediatrik Semptomatik Bradikardi — Artmış Vagal Tonus / AV Blok (AHA PALS 2020)',
      doseMg,
      rangeText: `${doseMg.toFixed(2)} mg IV/IO (0,02 mg/kg · Tek doz maks ${maxSingle.toFixed(1)} mg · 5 dk sonra 1 kez tekrar, maks toplam ${maxTotal.toFixed(1)} mg)`,
      ampText: `${volMl.toFixed(2)} mL (${ampuleStrength} mg/mL ampul — pediatride 0,25 mg/mL veya 10 mL’ye sulandırılmış enjektörle hassas ölçüm önerilir)`,
      routeNote:
        'AHA PALS Kuralı: Çocukta bradikardinin 1 numaralı nedeni HİPOKSİDİR! Önce hava yolu + %100 O₂ ventilasyonu; KTA < 60/dk ve perfüzyon bozuksa CPR + 1. tercih ADRENALİN (0,01 mg/kg). Atropin yalnızca artmış vagal tonus veya primer AV blokta 1. tercihtir.',
      monitor:
        'AHA 2015/2020 güncellemesiyle infant/küçük çocukta katı 0,1 mg alt sınırı kaldırılmıştır (0,02 mg/kg hesaplanır).',
    };
  };

  const bradyRec = getBradyRecommendation();

  // --- 2. NMB REVERSAL (NEOSTİGMİN + ATROPİN) HESAPLAMALARI ---
  const neoMgPerKg = nmbDepth === 'shallow' ? 0.04 : 0.05;
  const neoDoseMg = Math.min(5.0, Number((nmbWeightKg * neoMgPerKg).toFixed(2)));
  // Pratik klinik oran: 1 mg Neostigmin için 0.4 mg Atropin (~0.015–0.02 mg/kg; tavan 1.5–2.0 mg)
  const atrForNeoMg = Math.min(2.0, Number((neoDoseMg * 0.4).toFixed(2)));
  const neoAmpCount = neoDoseMg / 0.5; // TR Neostigmin ampul: 0.5 mg / 1 mL
  const atrAmpCount05 = atrForNeoMg / 0.5; // TR Atropin 0.5 mg / 1 mL
  const isTachycardicForAtropine = nmbBaselineHr > 105;

  // --- 3. ORGANOFOSFAT ATROPİNİZASYON HESAPLAMALARI ---
  const opDoublingSteps = [
    opInitialMg,
    opInitialMg * 2,
    opInitialMg * 4,
    opInitialMg * 8,
    opInitialMg * 16,
  ];
  const opInfusionLowMgHr = Number((opTotalAtropinizationMg * 0.1).toFixed(1));
  const opInfusionHighMgHr = Number((opTotalAtropinizationMg * 0.2).toFixed(1));

  const getReportText = () => {
    if (activeTab === 'bradycardia') {
      const alerts: string[] = [];
      if (isHeartTransplant) {
        alerts.push('KRİTİK: Kalp nakli (denerve kalp) — Atropin ETKİSİZDİR ve paradoksal AV blok/sinüs arresti yapabilir! İzoproterenol / Adrenalin / Pacing kullan!');
      }
      if (hasAvBlockHigh) {
        alerts.push('KRİTİK: Mobitz Tip II veya 3. Derece (geniş QRS) AV Blok — Atropin infranodal blokta etkisizdir/kötüleştirebilir; doğrudan Transkütanöz Pacing hazırlayın!');
      }
      if (!isUnstable && heartRate >= 50) {
        alerts.push('NOT: Asemptomatik / stabil hafif bradikardide rutin atropin gerekmez; altta yatan nedeni (hipoksi, vagal refleks, ilaç) izle.');
      }

      return [
        'ATROPİN SÜLFAT — BRADİKARDİ YATAK BAŞI RAPORU',
        `Senaryo: ${bradyRec.title} | Kilo: ${weightKg} kg | KTA: ${heartRate}/dk | Ampul: ${ampuleStrength} mg/mL`,
        `Önerilen Doz: ${bradyRec.rangeText}`,
        `Hazırlama: ${bradyRec.ampText}`,
        `Uygulama Notu: ${bradyRec.routeNote}`,
        `İzlem: ${bradyRec.monitor}`,
        alerts.length ? `Güvenlik Uyarıları:\n- ${alerts.join('\n- ')}` : 'Güvenlik Taraması: Kontrendikasyon bayrağı işaretlenmedi.',
      ].join('\n');
    }

    if (activeTab === 'nmb_reversal') {
      return [
        'NEOSTİGMİN + ATROPİN (NMB REVERSAL) KOMBİNASYON RAPORU',
        `Hasta Kilosu: ${nmbWeightKg} kg | Blok Derinliği: ${nmbDepth === 'shallow' ? 'Yüzeyel (TOF 4/4 fade yok / minimal)' : 'Orta (TOF 2–4 yanıt, kantitatif TOF < 0,9)'} | Bazal KTA: ${nmbBaselineHr}/dk`,
        `Neostigmin Dozu (${neoMgPerKg} mg/kg, maks 5 mg): ${neoDoseMg.toFixed(2)} mg IV → ${neoAmpCount.toFixed(1)} ampul (0,5 mg/1 mL)`,
        `Atropin Dozu (~0,4 mg / 1 mg Neostigmin): ${atrForNeoMg.toFixed(2)} mg IV → ${atrAmpCount05.toFixed(1)} ampul (0,5 mg/1 mL)`,
        `Uygulama: Aynı enjektörde karıştırılarak 1–2 dakikada yavaş IV (veya bazal KTA düşükse atropin 30–60 sn önce). Kantitatif TOF ≥ 0,90 olmadan ekstübasyon YAPMA!`,
        isTachycardicForAtropine
          ? 'UYARI: Bazal KTA > 105/dk — Atropin taşikardiyi belirgin artırabilir; mümkünse Glikopirolat veya Sugammadeks tercih edin.'
          : 'Not: Atropin (pik 2–4 dk) Neostigmin’den (pik 7–10 dk) önce etki ettiği için ilk dakikalarda geçici taşikardi normaldir.',
      ].join('\n');
    }

    return [
      'ORGANOFOSFAT / KARBAMAT ZEHİRLENMESİ — ATROPİNİZASYON PROTOKOLÜ (Eddleston Lancet 2008)',
      `Başlangıç Şiddeti: ${opSeverity === 'severe' ? 'Ağır kolinerjik kriz (bronkore/hipoksi)' : 'Orta kolinerjik sendrom'}`,
      `Doubling-Dose Bolus Merdiveni (her 5 dk yanıt yoksa 2 katına çık): ${opDoublingSteps.join(' mg → ')} mg IV`,
      `Atropinizasyon Hedefi (5 Kriter — Pupilla DEĞİL!): 1) Akciğer dinlemekle temiz/kuru (bronkore yok), 2) KTA > 80/dk, 3) SKB > 80 mmHg, 4) Aksilla kuru, 5) Pupillalar artık nokta değil.`,
      `İdame İnfüzyon (Toplam ${opTotalAtropinizationMg} mg atropinizasyon dozunun %10–20’si/saat): ${opInfusionLowMgHr} – ${opInfusionHighMgHr} mg/saat sürekli IV infüzyon`,
      'Not: Atropin nikotinik kas güçsüzlüğünü/solunum felcini DÜZELTMEZ — erken entübasyon + organofosfatta Pralidoksim (2-PAM) ekleyin.',
    ].join('\n');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-emerald-500/30 shadow-xl shadow-emerald-950/20 text-slate-100'
            : 'bg-white border-emerald-200 shadow-lg shadow-emerald-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <HeartPulse className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 font-mono">
                  Antikolinerjik · Non-Selektif Muskarinik Antagonist (M₁–M₅)
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: A03BA01
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  TR Ampuller: 0,25 · 0,5 · 1 mg / 1 mL
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Atropin Sülfat (ATROPINE) Monografisi
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Tersiyer amin yapılı kompetitif muskarinik reseptör antagonisti.{' '}
                <strong>Semptomatik sinüs/AV nodal bradikardi (AHA ACLS 1 mg)</strong>, intraoperatif vagal refleksler,{' '}
                <strong>Neostigmin ile nöromüsküler blokaj geri dönüşü</strong> ve{' '}
                <strong>organofosfat/karbamat zehirlenmesinde</strong> hayat kurtarıcı 1. basamak ajan.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 shrink-0 font-mono tabular-nums">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">IV Etki Başlangıcı</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">1 – 2 dakika</div>
              <div className="text-[10px] text-slate-500">Pik: 2 – 4 dk</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">ACLS İlk Doz</div>
              <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400">1,0 mg IV</div>
              <div className="text-[10px] text-slate-500">q3–5 dk · Maks 3 mg</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">Paradoksal Eşik</div>
              <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">&lt; 0,5 mg YASAK</div>
              <div className="text-[10px] text-slate-500">Erişkinde M₁ bradikardi</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">SSS / Plasenta</div>
              <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">GEÇER (Tersiyer)</div>
              <div className="text-[10px] text-slate-500">Deliryum · Antidot: Fizostigmin</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <MonographQuickNav
            isDark={isDark}
            items={[
              { id: 'sec-etki', label: 'Etki Mekanizması' },
              { id: 'sec-pkpd', label: 'PK / PD' },
              { id: 'sec-kontrendikasyon', label: 'Kontrendikasyonlar' },
              { id: 'sec-dozlar', label: 'Endikasyonlar & Dozaj' },
              { id: 'sec-hesaplayici', label: 'Doz Hesaplayıcı' },
              { id: 'sec-uyumluluk', label: 'TR Ampuller & Uyumluluk' },
              { id: 'sec-organ', label: 'Böbrek / Karaciğer' },
              { id: 'sec-gebelik', label: 'Gebelik & Laktasyon' },
              { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
              { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
              { id: 'sec-guvenlik', label: 'ISMP & Antidot' },
              { id: 'sec-kaynaklar', label: 'Kaynakça' },
            ]}
          />
        </div>
      </section>

      {/* 2. ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        summary="Atropin, postgangliyonik parasempatik sinapslardaki ve santral sinir sistemindeki M₁–M₅ muskarinik asetilkolin reseptörlerinin kompetitif, geri dönüşümlü antagonistidir. Nikotinik reseptörler (nöromüsküler kavşak ve otonom gangliyonlar) üzerinde klinik dozlarda anlamlı etkisi YOKTUR."
        pillars={[
          {
            title: 'Kardiyak M₂ Blokajı (Kronotropi & Dromotropi)',
            detail:
              'Sinoatriyal (SA) düğüm ve atriyoventriküler (AV) düğüm üzerindeki vagal (parasempatik) freni kaldırır. Kalp hızını artırır, AV düğüm iletimini hızlandırır (PR kısalır). His-Purkinje sistemi vagal innervasyon almadığından infranodal bloklarda etkisizdir.',
          },
          {
            title: 'Ekzokrin & Düz Kas M₃ Blokajı',
            detail:
              'Tükürük, bronşiyal ve ter bezlerinin sekresyonunu azaltır (antisiyalogog); bronş düz kaslarını gevşetir (hafif bronkodilatasyon ve ölü boşluk artışı); pupillayı dilate eder (midriyazis) ve GIS/mesane düz kas tonusunu azaltır.',
          },
          {
            title: 'Tersiyer Amin Yapı (KBB & Plasenta Geçişi)',
            detail:
              'Glikopirolatın (kuaterner amin) aksine lipofilik tersiyer amin olduğu için kan-beyin bariyerini ve plasentayı kolayca geçer. Bu nedenle yaşlılarda Santral Antikolinerjik Sendrom (deliryum/sedasyon) ve fetüste taşikardi/variabilite kaybı oluşturabilir.',
          },
        ]}
      />

      {/* 3. FARMAKOKİNETİK / FARMAKODİNAMİK (PK/PD) */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-3 cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Clock className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
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
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Başlangıcı (IV / IM / ETT)</td>
                  <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-bold">IV: 1–2 dk · IM: 15–30 dk</td>
                  <td className="py-2.5 font-sans text-xs">
                    IV bolus sonrası vagolitik taşikardi 1 dakikada başlar, 2–4 dakikada pik yapar (Neostigmin’den hızlıdır!).
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Klinik Etki Süresi</td>
                  <td className="py-2.5 pr-4 font-bold">30 – 60 dk (Kardiyak) · 2–4 sa (Sekresyon)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Kalp hızı etkisi görece kısa sürer; tekrarlayan vagal uyarıda veya organofosfatta ek doz/infüzyon gerekir.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Eliminasyon Yarı Ömrü (t½)</td>
                  <td className="py-2.5 pr-4 font-bold">2,0 – 4,0 saat (Erişkin)</td>
                  <td className="py-2.5 font-sans text-xs">
                    &lt; 2 yaş çocuklarda ve &gt; 65 yaş yaşlılarda t½ 2 kata kadar (6–10 saat) uzayabilir → kümülatif deliryum riski!
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Dağılım Hacmi (Vd) &amp; Protein Bağlanma</td>
                  <td className="py-2.5 pr-4 font-bold">2 – 4 L/kg · %14 – 22 (düşük)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Dokulara ve SSS’ye hızla dağılır; hipoalbüminemi serbest ilaç fraksiyonunu anlamlı değiştirmez.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Metabolizma &amp; Atılım</td>
                  <td className="py-2.5 pr-4 font-bold">~%50 Hepatik hidroliz · ~%50 Renal (değişmeden)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Çift yolaklı eliminasyon nedeniyle tek doz acil bradikardi kullanımında renal/hepatik doz azaltımı gerekmez.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Kardiyak Vagolitik Tam Blokaj Dozu</td>
                  <td className="py-2.5 pr-4 text-amber-600 dark:text-amber-400 font-bold">0,04 mg/kg (~3 mg erişkin)</td>
                  <td className="py-2.5 font-sans text-xs">
                    3 mg üzerinde (ACLS’de) kardiyak vagal reseptörler tamamen bloke olur; ek doz kalp hızını daha fazla artırmaz.
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
          'Atropine veya belladona alkaloidlerine karşı doğrulanmış aşırı duyarlılık (anafilaksi).',
          'Acil hayatı tehdit eden durumlar DIŞINDA: Tedavi edilmemiş dar açılı (akut açı kapanması) glokom, obstrüktif üropati (ağır BPH/idrar retansiyonu), mekanik GİS obstrüksiyonu / paralitik ileus / toksik megakolon.',
          'Kalp nakli yapılmış denerve kalp hastasında bradikardi (vagal innervasyon olmadığı için etkisizdir; paradoksal sinüs arresti veya yüksek dereceli AV blok bildirilmiştir — mutlak kaçın!).',
          'Myasthenia gravis krizi (neostigmin/piridostigmin muskarinik yan etkilerini azaltmak için verilen eş zamanlı koruyucu dozlar HARİÇ).',
        ]}
        relativeItems={[
          'Mobitz Tip II (2. derece) veya geniş QRS’li 3. derece (tam) AV blok: Blok His-Purkinje düzeyindedir; atropin sinüs hızını artırıp AV iletim oranını kötüleştirerek ventriküler hızı DAHA DA düşürebilir → doğrudan Transkütanöz Pacing!',
          'Akut koroner sendrom / ciddi koroner arter hastalığı ve ciddi aort/mitral stenoz: Taşikardi miyokard O₂ tüketimini artırıp diyastolik doluşu kısaltarak iskemi/akciğer ödemini tetikleyebilir.',
          'Yaşlı (> 65–70 yaş) ve demans/deliryum öykülü hastalar: Kan-beyin bariyerini geçtiği için postoperatif deliryum ve Santral Antikolinerjik Sendrom riski yüksektir (mümkünse Glikopirolat tercih et).',
          'Ateşli / hipertermik hastalar ve çocuklar: Terlemeyi bloke ederek hipertermiyi şiddetlendirebilir; tirotoksikoz ve feokromositomada aşırı taşiaritmi riski.',
        ]}
        clinicalNote="Hayatı tehdit eden semptomatik bradikardi veya organofosfat zehirlenmesinde (bronkore/hipoksi) HİÇBİR rölatif kontrendikasyon (glokom, KAH, BPH dahil) hayat kurtarıcı atropin uygulamasını geciktirmez!"
      />

      {/* 5. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ */}
      <section
        id="sec-dozlar"
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Syringe className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
          <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Klinik Endikasyonlar ve Kanıta Dayalı Doz Rejimleri
          </h3>
        </div>

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
                <td className="py-3 pr-4 font-bold text-rose-600 dark:text-rose-400 min-w-[180px]">
                  Erişkin Semptomatik Bradikardi (AHA ACLS 2020)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums min-w-[195px]">
                  1,0 mg IV bolus<br />
                  <span className="text-[11px] font-normal text-slate-500">3–5 dk’da bir tekrar · Maks 3 mg</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>2020 AHA Güncellemesi:</strong> Eski 0,5 mg dozu yerine artık doğrudan <strong>1,0 mg IV</strong> önerilir.
                  Asistoli ve NEA (PEA) arrest protokollerinden rutin atropin 2010’da çıkarılmıştır.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-emerald-600 dark:text-emerald-400">
                  İntraoperatif Vagal / Refleks Bradikardi
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,5 – 1,0 mg IV bolus<br />
                  <span className="text-[11px] font-normal text-slate-500">Asla &lt; 0,5 mg verme (erişkin)</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Laparoskopik pnömoperitonyum, okülokardiyak refleks, servikal/peritoneal traksiyon, laringoskopi ve yüksek spinal blok.
                  Önce cerrahi traksiyonu durdurun ve hipoksiyi dışlayın.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-sky-600 dark:text-sky-400">
                  Neostigmin ile NMB Geri Dönüşü (ASA 2023)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,015 – 0,02 mg/kg IV<br />
                  <span className="text-[11px] font-normal text-slate-500">≈ 0,4 mg Atropin / 1 mg Neostigmin</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Neostigminin muskarinik bradikardi, bronkospazm ve sekresyon etkisini bloke eder. Aynı enjektörde karıştırılabilir.
                  Kardiyak yan etki ve deliryum hassasiyetinde (varsa) Glikopirolat (0,2 mg / 1 mg Neostigmin) alternatiftir.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-indigo-600 dark:text-indigo-400">
                  Pediatrik Bradikardi (AHA PALS 2020)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,02 mg/kg IV/IO<br />
                  <span className="text-[11px] font-normal text-slate-500">Maks tek doz: 0,5 mg (çocuk) / 1 mg (adolesan)</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Sadece <strong>artmış vagal tonus</strong> veya <strong>primer AV blok</strong> kaynaklı bradikardide 1. tercih (hipoksik bradikardide 1. tercih O₂ + Adrenalin!).
                  Rutin pediatrik RSI premedikasyonu artık önerilmez (yalnızca &lt; 1 yaş veya süksinilkolin/bradikardi yüksek riskinde).
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-amber-600 dark:text-amber-400">
                  Organofosfat / Karbamat Zehirlenmesi
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  1 – 3 mg IV → her 5 dk 2× artır<br />
                  <span className="text-[11px] font-normal text-slate-500">Üst sınır YOK (onlarca–yüzlerce mg!)</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>Eddleston (Lancet 2008):</strong> 3 mg ACLS tavanı burada GEÇERSİZDİR! Hedef pupilla dilatasyonu değil,{' '}
                  <strong>akciğer sekresyonlarının (bronkorenin) kurumasıdır</strong>. Sonrasında saatte toplam atropinizasyon dozunun %10–20’si infüzyon.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-teal-600 dark:text-teal-400">
                  Antisiyalogog (Uyanık Fiberoptik / Ketamin)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,4 – 0,6 mg IV/IM<br />
                  <span className="text-[11px] font-normal text-slate-500">İşlemden 15–30 dk önce</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Topikal lokal anestezik temasını artırmak ve ketamin hipersalivasyonunu azaltmak için kullanılır; erişkinde taşikardi ve ağız kuruluğu yapar (glikopirolat yoksa tercih edilir).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. ETKİLEŞİMLİ DOZ & HAZIRLAMA HESAPLAYICI */}
      <section
        id="sec-hesaplayici"
        className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${
          isDark ? 'border-emerald-500/30 bg-slate-900/80' : 'border-emerald-200 bg-white shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <Activity className={`h-5 w-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <div>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Etkileşimli Atropin Doz &amp; TR Ampul Hesaplayıcısı
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                ACLS/PALS bradikardi, Neostigmin+Atropin NMB reversal ve Organofosfat atropinizasyon protokolleri
              </p>
            </div>
          </div>

          <MonographCopyButton isDark={isDark} getText={getReportText} label="Yatak Başı Rapor Kopyala" />
        </div>

        {/* 3 Calculator Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'bradycardia', label: '1. Bradikardi (ACLS / PALS / İntraop)' },
              { id: 'nmb_reversal', label: '2. NMB Reversal (Neostigmin + Atropin)' },
              { id: 'organophosphate', label: '3. Organofosfat Atropinizasyonu' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? isDark
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: BRADİKARDİ */}
        {activeTab === 'bradycardia' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Klinik Senaryo
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(
                    [
                      { id: 'acls_adult', label: 'Erişkin ACLS Bradikardi' },
                      { id: 'intraop_vagal', label: 'İntraop Vagal Refleks' },
                      { id: 'pals_child', label: 'Pediatrik PALS (<12y)' },
                      { id: 'pals_adolescent', label: 'Adolesan PALS (≥12y)' },
                    ] as const
                  ).map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setBradyScenario(s.id);
                        if (s.id === 'pals_child' && weightKg > 40) setWeightKg(18);
                        if (s.id === 'pals_adolescent' && weightKg < 35) setWeightKg(50);
                        if ((s.id === 'acls_adult' || s.id === 'intraop_vagal') && weightKg < 40) setWeightKg(75);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-colors cursor-pointer ${
                        bradyScenario === s.id
                          ? isDark
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-900'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-300'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={weightId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Hasta Kilosu (kg)
                  </label>
                  <input
                    id={weightId}
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
                  <label htmlFor={hrId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Mevcut KTA (/dk)
                  </label>
                  <input
                    id={hrId}
                    type="number"
                    min={15}
                    max={140}
                    value={heartRate}
                    onChange={(e) => setHeartRate(Math.max(15, Math.min(140, Number(e.target.value) || 15)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* TR Ampule Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Eldeki TR Atropin Ampul Konsantrasyonu (1 mL)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([0.25, 0.5, 1] as const).map((str) => (
                    <button
                      key={str}
                      type="button"
                      onClick={() => setAmpuleStrength(str)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold border cursor-pointer transition-colors ${
                        ampuleStrength === str
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                            : 'bg-amber-50 border-amber-500 text-amber-900'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-400'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {str === 0.25 ? '0,25 mg/mL' : str === 0.5 ? '0,5 mg/mL' : '1,0 mg/mL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Safety Toggles */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isUnstable}
                    onChange={(e) => setIsUnstable(e.target.checked)}
                    className="rounded border-slate-400 text-emerald-600"
                  />
                  <span>Hemodinamik instabilite / semptom var (hipotansiyon, bilinç değişikliği, iskemi)</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAvBlockHigh}
                    onChange={(e) => setHasAvBlockHigh(e.target.checked)}
                    className="rounded border-slate-400 text-rose-600"
                  />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    Mobitz Tip II veya 3. Derece (Geniş QRS) AV Blok var
                  </span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isHeartTransplant}
                    onChange={(e) => setIsHeartTransplant(e.target.checked)}
                    className="rounded border-slate-400 text-rose-600"
                  />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    Kalp nakli (denerve kalp) hastası
                  </span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {isHeartTransplant && (
                <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${isDark ? 'bg-rose-950/50 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-950'}`}>
                  <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">DUR! Kalp Nakli (Denerve Kalp) — Atropin VERME!</div>
                    <p className="mt-1 leading-relaxed">
                      Transplante kalp vagal innervasyondan yoksundur; atropin kalp hızını ARTIRMAZ ve paradoksal yüksek dereceli AV blok veya sinüs arrestine yol açabilir.
                      Bunun yerine doğrudan <strong>İzoproterenol, Adrenalin (Epinefrin) veya Transkütanöz Pacing</strong> kullanın!
                    </p>
                  </div>
                </div>
              )}

              {hasAvBlockHigh && (
                <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${isDark ? 'bg-amber-950/40 border-amber-500/50 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'}`}>
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">İnfranodal AV Blok Uyarısı (Mobitz II / 3. Derece)</div>
                    <p className="mt-1 leading-relaxed">
                      Atropin yalnızca AV düğüm düzeyinde etkilidir; His-Purkinje altı blokta etkisizdir ve atriyal hızı artırarak blok oranını kötüleştirebilir.
                      <strong> Transkütanöz Pacing</strong> pedlerini derhal yapıştırın ve kronotrop infüzyon (Adrenalin/Dopamin) hazırlayın!
                    </p>
                  </div>
                </div>
              )}

              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {bradyRec.title}
                  </span>
                  <span className="font-mono text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
                    {bradyRec.doseMg.toFixed(bradyRec.doseMg < 0.5 ? 2 : 1)} mg IV
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Doz Rejimi</div>
                    <div className="mt-1 font-semibold leading-relaxed">{bradyRec.rangeText}</div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Çekilecek Hacim ({ampuleStrength} mg/mL)</div>
                    <div className="mt-1 font-mono font-bold text-amber-600 dark:text-amber-400 leading-relaxed">{bradyRec.ampText}</div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <strong>Uygulama:</strong> {bradyRec.routeNote}
                </div>
                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <strong>Sonraki Adım / İzlem:</strong> {bradyRec.monitor}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NMB REVERSAL (NEOSTİGMİN + ATROPİN) */}
        {activeTab === 'nmb_reversal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={nmbWtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Hasta Kilosu (kg — İdeal/Düzeltilmiş)
                  </label>
                  <input
                    id={nmbWtId}
                    type="number"
                    min={10}
                    max={150}
                    value={nmbWeightKg}
                    onChange={(e) => setNmbWeightKg(Math.max(10, Math.min(150, Number(e.target.value) || 10)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={nmbHrId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Bazal KTA (/dk)
                  </label>
                  <input
                    id={nmbHrId}
                    type="number"
                    min={35}
                    max={160}
                    value={nmbBaselineHr}
                    onChange={(e) => setNmbBaselineHr(Math.max(35, Math.min(160, Number(e.target.value) || 35)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  NMB Derinliği (TOF Sayımı)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNmbDepth('shallow')}
                    className={`p-3 rounded-xl border text-left text-xs cursor-pointer ${
                      nmbDepth === 'shallow'
                        ? isDark
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Yüzeyel Blok</div>
                    <div className="text-[11px] opacity-80 mt-0.5">TOF 4/4 (0,04 mg/kg Neo)</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setNmbDepth('moderate')}
                    className={`p-3 rounded-xl border text-left text-xs cursor-pointer ${
                      nmbDepth === 'moderate'
                        ? isDark
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-500 text-emerald-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Orta Blok</div>
                    <div className="text-[11px] opacity-80 mt-0.5">TOF 2–4 (0,05 mg/kg Neo)</div>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Derin blokta (TOF 0–1 / sadece PTC) Neostigmin etkisizdir → Sugammadeks veya spontan TOF ≥ 2 dönüşünü bekleyin (ASA 2023).
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {isTachycardicForAtropine && (
                <div className={`rounded-xl border p-3 text-xs flex items-start gap-2 ${isDark ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Bazal KTA &gt; 105/dk:</strong> Atropin pik taşikardiyi belirgin artırabilir (miyokard iskemisi riski).
                    Mümkünse <strong>Glikopirolat</strong> (0,2 mg / 1 mg Neostigmin) veya <strong>Sugammadeks</strong> tercih edin.
                  </span>
                </div>
              )}

              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                  Ortak Enjektör Reçetesi (1 mg Neostigmin : 0,4 mg Atropin)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono tabular-nums">
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] uppercase text-slate-400">Neostigmin ({neoMgPerKg} mg/kg · maks 5 mg)</div>
                    <div className="text-xl font-extrabold text-sky-600 dark:text-sky-400 mt-1">{neoDoseMg.toFixed(2)} mg IV</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      ≈ <strong>{neoAmpCount.toFixed(1)} ampul</strong> (0,5 mg / 1 mL TR)
                    </div>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-emerald-500/30' : 'bg-white border-emerald-200'}`}>
                    <div className="text-[10px] uppercase text-slate-400">Atropin Sülfat (Antimuskarinik)</div>
                    <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{atrForNeoMg.toFixed(2)} mg IV</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      ≈ <strong>{atrAmpCount05.toFixed(1)} ampul</strong> (0,5 mg / 1 mL TR)
                    </div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <strong>Klinik İpucu:</strong> Atropin (pik 2–4 dk) Neostigminden (pik 7–10 dk) önce etki gösterdiği için enjeksiyonu izleyen ilk dakikalarda
                  geçici kalp hızı artışı, ardından 10. dakikada bazale dönüş normaldir. <strong>Kantitatif TOF ≥ 0,90</strong> doğrulanmadan ekstübasyon yapmayın.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORGANOFOSFAT ATROPİNİZASYONU */}
        {activeTab === 'organophosphate' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Kolinerjik Kriz Şiddeti &amp; İlk Bolus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOpSeverity('moderate');
                      setOpInitialMg(1);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                      opSeverity === 'moderate'
                        ? isDark
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                          : 'bg-amber-50 border-amber-500 text-amber-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Orta (1–2 mg)</div>
                    <div className="text-[11px] opacity-80">Sekresyon + miyozis</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpSeverity('severe');
                      setOpInitialMg(2);
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs cursor-pointer ${
                      opSeverity === 'severe'
                        ? isDark
                          ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                          : 'bg-rose-50 border-rose-500 text-rose-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">Ağır (2–3 mg)</div>
                    <div className="text-[11px] opacity-80">Bronkore · Hipoksi · Bradikardi</div>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor={opTotalId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                  Atropinizasyonu Sağlayan Toplam Bolus Dozu (mg)
                </label>
                <input
                  id={opTotalId}
                  type="number"
                  min={2}
                  max={500}
                  value={opTotalAtropinizationMg}
                  onChange={(e) => setOpTotalAtropinizationMg(Math.max(2, Math.min(500, Number(e.target.value) || 2)))}
                  className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Örn: 2 + 4 + 8 = 14 mg ile akciğerler kuruduysa saatlik idame infüzyonu bu toplamın %10–20’sidir.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Eddleston (Lancet 2008) Doubling-Dose Hızlı Atropinizasyon
                </div>

                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs tabular-nums">
                  {opDoublingSteps.map((mg, idx) => (
                    <React.Fragment key={idx}>
                      <span
                        className={`px-2.5 py-1 rounded-lg border font-bold ${
                          isDark ? 'bg-slate-900 border-rose-500/40 text-rose-300' : 'bg-white border-rose-200 text-rose-800'
                        }`}
                      >
                        {idx * 5}. dk: {mg} mg
                      </span>
                      {idx < opDoublingSteps.length - 1 && <span className="text-slate-400">→</span>}
                    </React.Fragment>
                  ))}
                </div>

                <div className={`p-3 rounded-lg border font-mono tabular-nums ${isDark ? 'bg-slate-900 border-emerald-500/30' : 'bg-white border-emerald-200'}`}>
                  <div className="text-[10px] uppercase text-slate-400">İdame IV İnfüzyon Hızı (%10–20 / saat)</div>
                  <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {opInfusionLowMgHr} – {opInfusionHighMgHr} mg / saat IV
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <strong>5 Atropinizasyon Hedefi (Pupillaya göre DOZLAMA!):</strong> (1) Akciğer dinlemekle temiz / bronkore yok,
                  (2) KTA &gt; 80/dk, (3) SKB &gt; 80 mmHg, (4) Aksilla kuru, (5) Pupillalar artık nokta değil.
                  <em> Taşikardi tek başına kontrendikasyon değildir (hipoksi/hipovolemiden olabilir); akciğerler ıslaksa atropine devam!</em>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 7. HAZIRLAMA, TR AMPUL FORMLARI & UYUMLULUK */}
      <section
        id="sec-uyumluluk"
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <FlaskConical className={`h-5 w-5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Türkiye Ampul Formları, Hazırlama &amp; Y-Site Uyumluluk
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className={`rounded-xl border p-4 space-y-1.5 ${isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'}`}>
            <div className="font-bold text-amber-700 dark:text-amber-300">Türkiye’de 3 Farklı 1 mL Ampul!</div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Piyasada <strong>0,25 mg/1 mL</strong>, <strong>0,5 mg/1 mL</strong> ve <strong>1 mg/1 mL</strong> ampullerin tamamı 1 mL’dir!
              Çekmeden önce etiketi yüksek sesle teyit edin; 4 kat doz hatası en sık ameliyathane hatasıdır.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-1.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-emerald-700 dark:text-emerald-300">Dilüsyon &amp; Uygulama Yolları</div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Erişkinde sulandırmadan hızlı IV puşe + SF flush uygulanabilir. Pediatride hassas doz için 1 mg + 9 mL SF (= <strong>0,1 mg/mL</strong>) hazırlanabilir.
              Yalnızca IV/IO yoksa son çare endotrakeal tüp (ETT): IV dozun 2–2,5 katı, 5–10 mL SF ile.
            </p>
          </div>

          <div className={`rounded-xl border p-4 space-y-1.5 ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-sky-700 dark:text-sky-300">Y-Site Uyumluluk &amp; Geçimsizlik</div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <strong>Uyumlu:</strong> %0,9 NaCl, %5 Dekstroz, Neostigmin (aynı enjektörde stabil!), Fentanil, Midazolam, Morfin.<br />
              <strong>Geçimsiz:</strong> Alkali çözeltiler (<strong>Sodyum Bikarbonat</strong>, Tiyopental, Noradrenalin alkali/stabilite riski) — aynı lümenden verme!
            </p>
          </div>
        </div>
      </section>

      {/* 8. BÖBREK VE KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Tek doz acil/intraoperatif kullanımda doz ayarlaması gerekmez; tekrarlayan dozlarda kümülatif toksisiteye dikkat."
        renalDetails={[
          'Atropinin yaklaşık %50’si böbreklerden değişmeden idrarla atılır.',
          'İleri KBH (eGFR < 30 mL/dk) veya anüride tekrarlayan dozlar veya organofosfat infüzyonunda deliryum, idrar retansiyonu ve taşikardi süresi uzar.',
          'Diyalizle (HD/CRRT) anlamlı düzeyde uzaklaştırılmaz (geniş Vd: 2–4 L/kg).',
        ]}
        hepaticSummary="Tek doz acil kullanımda doz ayarlaması gerekmez; Child-Pugh B/C’de tekrarlayan dozlarda santral antikolinerjik etki uzar."
        hepaticDetails={[
          'Yaklaşık %50’si karaciğerde enzimatik hidrolizle (tropin ve tropik asit) metabolize olur.',
          'Siroz/hepatik ensefalopatiye yatkın hastalarda tersiyer amin SSS geçişi konfüzyonu ağırlaştırabilir.',
          'NMB reversal için ağır karaciğer yetmezliğinde antikolinerjik deliryum riski nedeniyle mümkünse Glikopirolat veya Sugammadeks tercih edilir.',
        ]}
      />

      {/* 9. GEBELİK, OBSTETRİK VE LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Plasentayı hızla geçer (1–2 dk) — Maternal bradikardide güvenle kullanılır; ancak fetal taşikardi ve variabilite kaybı yapar."
        pregnancyDetails={[
          'Maternal semptomatik bradikardi, yüksek spinal blok (Bezold-Jarisch) veya organofosfat zehirlenmesinde hayati endikasyonda geciktirilmeden verilir.',
          'Plasentadan hızla geçtiği için 5–10 dakika içinde fetal kalp hızını artırır ve NST’de beat-to-beat variabiliteyi geçici olarak azaltır (fetal distresle karıştırılmamalı!).',
          'Gebe hastada non-obstetrik cerrahi sonrası Neostigmin reversal yapılacaksa, plasentayı geçmeyen Glikopirolat teorik olarak fetüste bradikardiyi koruyamayacağı için Neostigmin ile birlikte plasentayı geçen ATROPİN tercih edilmesi klasik obstetrik anestezi kuralıdır!',
        ]}
        lactationSummary="Anne sütüne çok düşük düzeyde geçer; tek doz perioperatif/acil kullanım emzirme ile uyumludur."
        lactationDetails={[
          'Perioperatif tek doz (bradikardi veya NMB reversal) sonrası emzirmeyi kesmeye gerek yoktur.',
          'Tekrarlayan yüksek dozlar süt üretimini (prolaktin/ekzokrin inhibisyon) azaltabilir ve yenidoğanda antikolinerjik etki açısından izlem gerektirir.',
        ]}
      />

      {/* 10. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Paradoksal Bradikardi (< 0,5 mg)',
            incidenceOrSeverity: 'KRİTİK TUZAK',
            tone: 'rose',
            detail:
              'Erişkinde 0,5 mg altındaki düşük dozların yavaş uygulanması, presinaptik M₁ otoreseptör blokajı veya santral vagal uyarı ile geçici paradoksal bradikardi / AV blok yapabilir.',
          },
          {
            title: 'Taşikardi & Miyokard İskemisi',
            incidenceOrSeverity: 'Sık · Doz Bağımlı',
            tone: 'rose',
            detail:
              'Sinüs taşikardisi, SVT/AF hızlanması, koroner arter hastalarında O₂ tüketim artışı ve diyastolik doluş kısalmasına bağlı miyokard iskemisi.',
          },
          {
            title: 'Santral Antikolinerjik Sendrom (SAS)',
            incidenceOrSeverity: 'Yaşlıda Yüksek Risk',
            tone: 'amber',
            detail:
              'KBB geçişine bağlı postoperatif deliryum, ajitasyon, görsel halüsinasyonlar veya tersine açıklanamayan somnolans/uyanma gecikmesi (antidot: Fizostigmin).',
          },
          {
            title: 'Antikolinerjik Toksidrom ("Kör, Kırmızı, Sıcak, Kuru, Deli")',
            incidenceOrSeverity: 'Doz Aşımı',
            tone: 'amber',
            detail:
              'Midriyazis/siklopileji (bulanık görme), kutanöz vazodilatasyon (kızarıklık), anhidroz + hipertermi, kuru mukoza, ileus ve akut idrar retansiyonu.',
          },
        ]}
      />

      {/* 11. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Kalp Nakli (Denerve Kalp) Hastasında Etkisizdir',
            detail:
              'Transplante kalpte vagal sinir bağlantısı kesildiği için atropin kalp hızını yükseltmez, hatta paradoksal AV blok/sinüs arresti tetikleyebilir. Doğrudan İzoproterenol, Adrenalin veya Pacing kullanın.',
          },
          {
            title: 'Mobitz Tip II ve 3. Derece AV Blokta Pacing’i Geciktirmeyin',
            detail:
              'Geniş QRS’li infranodal bloklarda atropin etkisizdir ve atriyal hızı artırarak ventriküler cevabı daha da düşürebilir. Transkütanöz pacing ve kronotrop infüzyon 1. tercihtir.',
          },
          {
            title: 'Spinal Anestezide Bezold-Jarisch Bradikardisi',
            detail:
              'Yüksek sempatik blokajda azalan venöz dönüş kalpte paradoksal vagal refleks başlatır. Şiddetli bradikardiye hipotansiyon eşlik ediyorsa sadece atropin yetmez; hızla Efedrin veya düşük doz Adrenalin (10–50 mcg IV) + bacak elevasyonu/sıvı ekleyin.',
          },
          {
            title: 'Atropin vs. Glikopirolat Seçimi',
            detail:
              'Atropin daha hızlı (1–2 dk), ucuz ve acil bradikardide 1. tercihtir; ancak KBB ve plasentayı geçer. Glikopirolat (kuaterner amin) SSS’ye geçmez, daha az taşikardi yapar, daha güçlü antisiyalogogdur ve yaşlıda deliryum riski yaratmaz.',
          },
          {
            title: 'Organofosfatta "Pupilla" Tuzağı',
            detail:
              'Organofosfat göze direkt temas ettiyse miyozis sistemik atropine dirençli kalabilir. Atropin dozunu ASLA pupillaya göre değil, akciğer dinleme bulgularına (bronkore ve rallerin kaybolması) göre titre edin.',
          },
          {
            title: 'Ölü Boşluk (Vd/Vt) ve Sekresyon Koyulaşması',
            detail:
              'Bronşiyal sekresyonları kuruturken viskoziteyi artırır (mukus tıkacı riski) ve bronkodilatasyon nedeniyle anatomik ölü boşluğu hafifçe artırır; KOAH/entübe YBÜ hastalarında gereksiz tekrarlayan dozlardan kaçının.',
          },
        ]}
      />

      {/* 12. ISMP HIGH-ALERT & ANTİDOT */}
      <HighAlertSafetyBlock
        isDark={isDark}
        tallManName="ATROPINE (0,25 · 0,5 · 1 mg/mL)"
        confusionRiskWith="ADRENALİN · ADENOZİN · ATRAKÜRYUM"
        criticalAlerts={[
          'Türkiye’de 0,25 mg/mL, 0,5 mg/mL ve 1 mg/mL Atropin ampullerinin hepsi 1 mL hacimdedir — 4 katlık konsantrasyon hatasını önlemek için kırılmadan önce etiket mg/mL değerini mutlaka sesli okuyun.',
          'Erişkinde bradikardi için < 0,5 mg (ör. tek bir 0,25 mg ampul) uygulamayın: paradoksal bradikardiye yol açabilir (AHA ACLS ilk dozu 1,0 mg IV).',
          'Ameliyathane ilaç tepsisinde aynı yeşil/beyaz etiketli ampullerle (özellikle Adrenalin ve Neostigmin) karıştırmamak için ISO renk kodlu enjektör etiketi (antikolinerjik: yeşil) yapıştırın.',
          'Asistoli veya NEA (PEA) kardiyak arrestte rutin atropin artık kılavuzlarda YOKTUR — CPR ve Adrenalin’i geciktirmeyin.',
        ]}
        antidoteOrRescue="Ağır Santral Antikolinerjik Sendrom / deliryumda spesifik antidot FİZOSTİGMİN’dir (0,5–1,0 mg IV 2–5 dk’da yavaş; yanıt yoksa 10–15 dk sonra tekrar, pediatride 0,02 mg/kg maks 0,5 mg — Dawson & Buckley 2016). QRS genişlemesi (≥ 100 ms) veya TSA eş alımı varsa Fizostigmin KONTRENDİKEDİR → Benzodiyazepin (Midazolam/Diazepam) ve soğutma + destek tedavisi uygulanır."
      />

      {/* 13. KANITA DAYALI KAYNAKÇA & İLAÇ ETKİLEŞİMLERİ */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Atropin Sülfat"
        drugsComUrl="https://www.drugs.com/drug-interactions/atropine.html"
        medscapeUrl="https://reference.medscape.com/drug/atropine-iv-im-343093"
        references={[
          {
            authors: 'Panchal AR, Bartos JA, Cabañas JG, et al.',
            title: 'Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
            journal: 'Circulation. 2020;142(16_suppl_2):S366–S468',
            year: 2020,
            pmid: '33081529',
            doi: '10.1161/CIR.0000000000000916',
            note: 'Erişkin semptomatik bradikardide başlangıç Atropin dozunu 0,5 mg’dan 1,0 mg IV (q3–5 dk, maks 3 mg) düzeyine güncelleyen ana ACLS kılavuzu.',
          },
          {
            authors: 'Topjian AA, Raymond TT, Atkins D, et al.',
            title: 'Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care',
            journal: 'Circulation. 2020;142(16_suppl_2):S469–S523',
            year: 2020,
            pmid: '33081526',
            note: 'Pediatrik bradikardide 0,02 mg/kg IV/IO dozajı, artmış vagal tonus/AV blok endikasyonu ve rutin RSI premedikasyonunun kısıtlanması.',
          },
          {
            authors: 'Thilen SR, Weigel WA, Todd MM, et al.',
            title: '2023 American Society of Anesthesiologists Practice Guidelines for Monitoring and Antagonism of Neuromuscular Blockade',
            journal: 'Anesthesiology. 2023;138(1):13–41',
            year: 2023,
            pmid: '36520073',
            note: 'Neostigmin + antikolinerjik geri dönüş dozlama ilkeleri ve kantitatif TOF ≥ 0,90 doğrulama standardı.',
          },
          {
            authors: 'Eddleston M, Buckley NA, Eyer P, Dawson AH.',
            title: 'Management of acute organophosphorus pesticide poisoning',
            journal: 'The Lancet. 2008;371(9612):597–607',
            year: 2008,
            pmid: '17706760',
            doi: '10.1016/S0140-6736(07)61202-1',
            note: 'Organofosfat zehirlenmesinde doubling-dose hızlı atropinizasyon, 5 klinik hedef kriteri ve %10–20/saat idame infüzyonu.',
          },
          {
            authors: 'Dawson AH, Buckley NA.',
            title: 'Pharmacological management of anticholinergic delirium — theory, evidence and practice',
            journal: 'Br J Clin Pharmacol. 2016;81(3):516–524',
            year: 2016,
            pmid: '26589572',
            doi: '10.1111/bcp.12839',
            note: 'Santral antikolinerjik deliryumda titre edilmiş Fizostigmin (0,5–1 mg IV) antidot protokolü ve güvenlik sınırları.',
          },
        ]}
      />
    </div>
  );
};
