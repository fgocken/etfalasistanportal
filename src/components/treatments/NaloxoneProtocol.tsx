import React, { useState, useId } from 'react';
import {
  Activity,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldAlert,
  Syringe,
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

interface Props {
  isDark: boolean;
}

type CalcTab = 'pacu_oird' | 'overdose_infusion' | 'pruritus';
type PatientGroup = 'adult' | 'pediatric';

export const NaloxoneProtocol: React.FC<Props> = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState<CalcTab>('pacu_oird');
  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  // 1. PACU / Postoperatif Solunum Depresyonu (OIRD) State
  const [pacuGroup, setPacuGroup] = useState<PatientGroup>('adult');
  const [pacuWeightKg, setPacuWeightKg] = useState<number>(75);
  const [pacuRespRate, setPacuRespRate] = useState<number>(7);
  const [isChronicOpioid, setIsChronicOpioid] = useState<boolean>(false);
  const [isLongActingOpioid, setIsLongActingOpioid] = useState<boolean>(true);
  const [hasCardiacDisease, setHasCardiacDisease] = useState<boolean>(false);

  // 2. Akut Opioid Zehirlenmesi & Sürekli IV İnfüzyon (Boyer 2012) State
  const [odGroup, setOdGroup] = useState<PatientGroup>('adult');
  const [odWeightKg, setOdWeightKg] = useState<number>(75);
  const [isCardiacArrest, setIsCardiacArrest] = useState<boolean>(false);
  const [wakeUpDoseMg, setWakeUpDoseMg] = useState<number>(0.4);

  // 3. Nöroaksiyel Opioid Kaşıntısı & PONV (Düşük Doz) State
  const [pruritusWeightKg, setPruritusWeightKg] = useState<number>(70);
  const [pruritusRateMcgKgHr, setPruritusRateMcgKgHr] = useState<number>(0.5);

  const pacuWtId = useId();
  const pacuRrId = useId();
  const odWtId = useId();
  const wakeId = useId();
  const pruWtId = useId();
  const pruRateId = useId();

  // --- 1. PACU OIRD HESAPLAMALARI ---
  const getPacuRec = () => {
    if (pacuGroup === 'pediatric') {
      const pedWt = Math.min(pacuWeightKg, 50);
      const lowMcg = Number((pedWt * 1).toFixed(1));
      const highMcg = Number((pedWt * 2).toFixed(1));
      const suggestedMcg = pacuRespRate <= 6 ? highMcg : lowMcg;
      // Çift sulandırma 4 mcg/mL (40 mcg/mL'den 1 mL + 9 mL SF)
      const vol4McgMl = suggestedMcg / 4;
      const vol40McgMl = suggestedMcg / 40;
      return {
        doseLabel: `${suggestedMcg} mcg (${(suggestedMcg / 1000).toFixed(3)} mg) IV`,
        rangeText: `${lowMcg} – ${highMcg} mcg IV (1 – 2 mcg/kg · q2–3 dk titre et; analjeziyi koru!)`,
        dilutionText:
          suggestedMcg < 20
            ? `${vol4McgMl.toFixed(1)} mL (4 mcg/mL pediatrik çift sulandırma: 40 mcg/mL’den 1 mL + 9 mL SF)`
            : `${vol40McgMl.toFixed(2)} mL (40 mcg/mL standart sulandırma: 0,4 mg ampul + 9 mL SF)`,
        targetNote:
          'Postoperatif OIRD’de pediatrik tam zehirlenme dozu (0,1 mg/kg) ASLA verilmez — akut ağrı krizi ve pulmoner ödem yapar! Yalnızca solunum sayısını normale döndürecek kadar titre edin.',
      };
    }

    const startMcg = isChronicOpioid || hasCardiacDisease ? 20 : 40;
    const volMl = startMcg / 40; // 40 mcg/mL standart PACU sulandırma (0.4 mg + 9 mL SF)
    return {
      doseLabel: `${startMcg} mcg (0,0${startMcg / 10} mg) IV`,
      rangeText: `${startMcg} – 80 mcg IV (0,04 – 0,08 mg) · Her 2–3 dk’da bir SS ≥ 10–12/dk olana kadar titre et`,
      dilutionText: `${volMl.toFixed(1)} mL (40 mcg/mL standart PACU enjektörü: 1 ampul 0,4 mg + 9 mL %0,9 NaCl = 10 mL)`,
      targetNote:
        'AMAÇ: Hastayı tamamen uyandırıp ağrıdan bağırtmak DEĞİL, yeterli spontan ventilasyonu (SS ≥ 10–12/dk, SpO₂ ≥ %94, EtCO₂ normal) analjeziyi koruyarak geri kazandırmaktır (Dahan 2010).',
    };
  };

  const pacuRec = getPacuRec();

  // --- 2. OVERDOSE & BOYER 2/3 İNFÜZYON HESAPLAMALARI ---
  const infusionMgHr = Number(((wakeUpDoseMg * 2) / 3).toFixed(2));
  const infusionMcgHr = Math.round(infusionMgHr * 1000);
  // Standart infüzyon hazırlığı: 2 mg (5 ampul 0,4 mg) + 45 mL SF = 50 mL (0,04 mg/mL = 40 mcg/mL)
  const infusionMlHrAt40McgMl = Number((infusionMgHr / 0.04).toFixed(1));
  const halfRescueBolusMg = Number((wakeUpDoseMg / 2).toFixed(2));

  const pedOdDoseMg = odWeightKg <= 20 ? Math.min(2, Number((odWeightKg * 0.1).toFixed(2))) : 2.0;

  // --- 3. KAŞINTI / PONV DÜŞÜK DOZ İNFÜZYON HESAPLAMALARI ---
  const pruritusMcgHr = Number((pruritusWeightKg * pruritusRateMcgKgHr).toFixed(1));
  // 1 ampul (400 mcg) / 100 mL SF = 4 mcg/mL
  const pruritusMlHrAt4McgMl = Number((pruritusMcgHr / 4).toFixed(1));
  const pruritusAnalgesiaRisk = pruritusRateMcgKgHr > 2.0;

  const getReportText = () => {
    if (activeTab === 'pacu_oird') {
      const flags: string[] = [];
      if (pacuRespRate < 6) {
        flags.push('ACİL HAVA YOLU: SS < 6/dk — İlaçtan önce derhal çene itme/maske + %100 O₂ ile BVM ventilasyonu başlatın!');
      }
      if (isChronicOpioid) {
        flags.push('KRONİK OPİOİD / BAĞIMLILIK: Akut şiddetli yoksunluk ve katekolamin fırtınasını önlemek için 20 mcg (0,5 mL) mikro-boluslarla titre edin.');
      }
      if (hasCardiacDisease) {
        flags.push('KAH / HİPERTANSİYON: Hızlı tam reversal ani hipertansiyon, taşikardi, MINS ve akut flash pulmoner ödem yapabilir — 20 mcg mikro-titrasyon!');
      }
      if (isLongActingOpioid) {
        flags.push('RENARKOTİZASYON RİSKİ: Nalokson süresi 30–60 dk’dır; son dozdan sonra en az 2 saat PACU/monitörlü gözlem şarttır!');
      }

      return [
        'NALOKSON HİDROKLORÜR — PACU / POSTOP SOLUNUM DEPRESYONU (OIRD) RAPORU',
        `Hasta: ${pacuGroup === 'adult' ? 'Erişkin' : 'Pediatrik'} (${pacuWeightKg} kg) | Mevcut SS: ${pacuRespRate}/dk`,
        `Önerilen Başlangıç Titrasyon Dozu: ${pacuRec.rangeText}`,
        `Hazırlama: ${pacuRec.dilutionText} (TR 0,4 mg/1 mL tam ampul ASLA tek seferde puşe edilmez!)`,
        `Hedef: ${pacuRec.targetNote}`,
        flags.length ? `Güvenlik Uyarıları:\n- ${flags.join('\n- ')}` : 'Güvenlik Taraması: Ek risk bayrağı işaretlenmedi.',
      ].join('\n');
    }

    if (activeTab === 'overdose_infusion') {
      return [
        'NALOKSON — AKUT OPİOİD ZEHİRLENMESİ & SÜREKLİ İNFÜZYON RAPORU (Boyer NEJM 2012 · AHA 2023)',
        `Durum: ${isCardiacArrest ? 'Kardiyak Arrest Şüphesi (ÖNCE YÜKSEK KALİTELİ CPR + VENTİLASYON!)' : 'Solunum Depresyonu / Nabız VAR'} | Grup: ${odGroup === 'adult' ? 'Erişkin' : `Pediatrik (${odWeightKg} kg)`}`,
        odGroup === 'adult'
          ? 'Erişkin Bolus: 0,04 → 0,4 → 2 mg IV kademeli titrasyon (sentetik/buprenorfin yanıtsızsa 10 mg’a kadar; IN sprey 4 mg / IM 0,4–2 mg).'
          : `Pediatrik Tam Doz Aşımı: ${pedOdDoseMg} mg IV/IO (≤20 kg: 0,1 mg/kg, >20 kg: 2 mg; hafif vakada 0,01 mg/kg ile başla).`,
        `Sürekli IV İnfüzyon (İlk uyanma dozu ${wakeUpDoseMg} mg’ın 2/3’ü/saat): ${infusionMgHr} mg/saat (${infusionMcgHr} mcg/saat)`,
        `Pompa Hazırlığı (2 mg [5 ampul] / 50 mL SF = 40 mcg/mL): ${infusionMlHrAt40McgMl} mL/saat (+ 15. dk’da ${halfRescueBolusMg} mg tek yarım bolus renarkotizasyonu önler).`,
      ].join('\n');
    }

    return [
      'NALOKSON — NÖROAKSİYEL OPİOİD KAŞINTISI / PONV DÜŞÜK DOZ İNFÜZYON (Murphy 2011 · Kjellberg 2001)',
      `Hasta Kilosu: ${pruritusWeightKg} kg | Hedef Hız: ${pruritusRateMcgKgHr} mcg/kg/saat (= ${pruritusMcgHr} mcg/saat)`,
      `Hazırlık (1 ampul 0,4 mg [400 mcg] + 99 mL %0,9 NaCl = 100 mL → 4 mcg/mL): ${pruritusMlHrAt4McgMl} mL/saat IV`,
      pruritusAnalgesiaRisk
        ? 'UYARI: > 2 mcg/kg/saat hızında nöroaksiyel analjezi geri dönebilir! Hızı ≤ 2 mcg/kg/saat sınırında tutun.'
        : 'Analjezi Korunur: 0,25–2,0 mcg/kg/saat aralığı kaşıntı ve bulantıyı azaltırken spinal/epidural analjeziyi korur.',
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
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyonlar' },
          { id: 'sec-dozlar', label: 'Endikasyonlar & Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik & Yenidoğan' },
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
        tallManName="NALOXONE (0,4 mg/1 mL → PACU’da 40 mcg/mL SULANDIR!)"
        confusionRiskWith="NALTREKSON · NALBUFİN · LANOXIN (DİGOKSİN)"
        criticalAlerts={[
          'PACU’da 0,4 mg (400 mcg) tam ampulü doğrudan puşe ETMEYİN — 10 mL’ye sulandırıp (40 mcg/mL) 1 mL’lik (40 mcg) dilimlerle titre edin; aksi halde akut ağrı krizi, MINS ve flash pulmoner ödem gelişebilir.',
          'Nalokson’un etki süresi (30–60 dk) çoğu opioidden KISADIR — son doz sonrası en az 2 saat renarkotizasyon açısından monitörlü gözlem şarttır.',
          'Ameliyathanede nalokson enjektörüne ISO standart beyaz/mavi-çizgili (antagonist) etiket yapıştırın ve konsantrasyonu (40 mcg/mL) açıkça yazın.',
          'Opioid ilişkili kardiyak arrestte (nabız yok) nalokson için yüksek kaliteli CPR, ventilasyon ve Adrenalin’i ASLA geciktirmeyin (AHA 2023).',
        ]}
        antidoteOrRescue="Naloksonun kendisinin aşırı dozuna bağlı akut flash pulmoner ödem gelişirse derhal yüksek akım O₂ / NIV (CPAP/BiPAP) veya endotrakeal entübasyon + PEEP uygulanır (diüretik rutin ilk basamak değildir, non-kardiyojeniktir). Akut hipertansif kriz ve taşiaritmide kısa etkili IV Esmolol veya Nikardipin/Nitrogliserin titre edilir; nalokson etkisi 30–60 dk içinde kendiliğinden sonlanır."
      />

      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-rose-500/30 shadow-xl shadow-rose-950/20 text-slate-100'
            : 'bg-white border-rose-200 shadow-lg shadow-rose-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Wind className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/40 font-mono">
                  Saf Kompetitif Opioid Antagonisti (μ &gt; κ &gt; δ)
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: V03AB15
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  TR Ampul: 0,4 mg / 1 mL (400 mcg/mL)
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Nalokson Hidroklorür (NALOXONE) Monografisi
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                İntrinsik agonist aktivitesi olmayan saf μ-opioid reseptör antagonisti.{' '}
                <strong>Postoperatif PACU opioid solunum depresyonunda (OIRD) analjeziyi koruyan 40 mcg mikro-titrasyon</strong>,{' '}
                <strong>akut opioid doz aşımı / Boyer 2/3 sürekli infüzyonu</strong> ve{' '}
                <strong>nöroaksiyel opioid kaşıntısı</strong> yönetiminde temel kurtarıcı antidot.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 shrink-0 font-mono tabular-nums">
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">IV Etki / Süre</div>
              <div className="text-sm font-extrabold text-rose-600 dark:text-rose-400">1–2 dk / 30–60 dk</div>
              <div className="text-[10px] text-slate-500">RENARKOTİZASYON!</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">PACU Sulandırma</div>
              <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">40 mcg / mL</div>
              <div className="text-[10px] text-slate-500">0,4 mg + 9 mL SF (10 mL)</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">PACU Titrasyon</div>
              <div className="text-sm font-extrabold text-amber-600 dark:text-amber-400">40 mcg (1 mL)</div>
              <div className="text-[10px] text-slate-500">q2–3 dk · Tam ampul VERME!</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] uppercase text-slate-500 font-bold">İnfüzyon Kuralı</div>
              <div className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">2/3 Uyanma / sa</div>
              <div className="text-[10px] text-slate-500">Uzun etkili opioidde</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        summary="Nalokson, santral ve periferik opioid reseptörlerine (özellikle μ [mü] reseptörüne en yüksek afiniteyle, ardından κ ve δ reseptörlerine) yüksek afiniteyle bağlanan ancak intrinsik aktivitesi SIFIR olan saf kompetitif antagonisttir."
        pillars={[
          {
            title: 'Hızlı μ-Reseptör Yer Değiştirmesi',
            detail:
              'Lipofilik yapısı sayesinde kan-beyin bariyerini 1–2 dakikada geçer ve beyin sapı solunum merkezindeki (pre-Bötzinger kompleksi) opioid moleküllerini reseptörden uzaklaştırarak solunum dürtüsünü, sedasyonu ve miyozisi geri döndürür.',
          },
          {
            title: 'Kısa Etki Süresi & Renarkotizasyon Paradoksu',
            detail:
              'Nalokson santral sinir sisteminden hızla yeniden dağılır (30–60 dk). Morfin, metadon, uzun salımlı oral opioidler, transdermal fentanil veya yüksek doz intraoperatif fentanil vücutta kaldığı için nalokson bitince solunum depresyonu TEKRARLAR (renarkotizasyon)!',
          },
          {
            title: 'Yüksek Afinitede Direnç (Buprenorfin & Sentetik Fentanil)',
            detail:
              'Buprenorfin (parsiyel μ agonisti) reseptöre çok sıkı bağlanıp yavaş ayrıldığı için (Dahan 2010) yüksek doz ve sürekli nalokson infüzyonu gerektirir. Benzer şekilde karfentanil/yüksek doz fentanilde tekrarlayan yüksek boluslara ihtiyaç duyulabilir.',
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
            <Clock className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
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
                  <td className="py-2.5 pr-4 font-sans font-semibold">Etki Başlangıcı (IV / IM / IN)</td>
                  <td className="py-2.5 pr-4 text-rose-600 dark:text-rose-400 font-bold">IV: 1–2 dk · IM/IN: 2–5 dk</td>
                  <td className="py-2.5 font-sans text-xs">
                    IV yol mevcutsa en hızlı ve titre edilebilir yoldur; damar yolu yoksa IM, IO veya intranazal (IN) hemen uygulanır.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Klinik Etki Süresi</td>
                  <td className="py-2.5 pr-4 text-amber-600 dark:text-amber-400 font-bold">30 – 60 dk (IV) · 60–90 dk (IM)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Hemen tüm uzun/orta etkili opioidlerden KISADIR → son dozdan sonra en az 2 saat yakın SpO₂/SS/kapnografi izlemi zorunludur!
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Eliminasyon Yarı Ömrü (t½)</td>
                  <td className="py-2.5 pr-4 font-bold">30 – 81 dk (Erişkin) · ~3 saat (Yenidoğan)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Yenidoğanlarda glukuronidasyon immatür olduğu için t½ belirgin uzundur.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Oral Biyoyararlanım</td>
                  <td className="py-2.5 pr-4 font-bold">&lt; %2 (Çok yüksek ilk geçiş)</td>
                  <td className="py-2.5 font-sans text-xs">
                    Oral nalokson sistemik emilmez (yalnızca bağırsak μ reseptörlerini bloke eder; OIC tedavisi). Sistemik etki için IV/IM/IN/SC şarttır.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Metabolizma &amp; Atılım</td>
                  <td className="py-2.5 pr-4 font-bold">Hepatik glukuronidasyon (UGT2B7) → Renal</td>
                  <td className="py-2.5 font-sans text-xs">
                    Başlıca inaktif nalokson-3-glukuronide çevrilip idrarla atılır (%60–70).
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-sans font-semibold">Analjezi Koruma Eşiği (PACU)</td>
                  <td className="py-2.5 pr-4 text-emerald-600 dark:text-emerald-400 font-bold">0,04 mg (40 mcg) IV · ≤ 2 mcg/kg/sa</td>
                  <td className="py-2.5 font-sans text-xs">
                    40 mcg (1 mL sulandırılmış) titrasyonu veya ≤ 2 mcg/kg/sa infüzyon solunum/kaşıntıyı düzeltirken analjeziyi korur.
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
          'Nalokson hidroklorüre karşı doğrulanmış aşırı duyarlılık (anafilaksi — son derece nadir).',
          'NOT: Solunum arresti veya hayatı tehdit eden opioid solunum depresyonunda başka MUTLAK kontrendikasyon YOKTUR; ancak doğru doz titrasyonu hayati önem taşır!',
        ]}
        relativeItems={[
          'Kronik opioid kullanan veya opioid bağımlısı hastalar: Yüksek tek bolus (≥ 0,4 mg) akut şiddetli yoksunluk sendromu, kusma/aspirasyon, ajitasyon ve ölümcül katekolamin fırtınası tetikler → 20–40 mcg mikro-titrasyon yap!',
          'Ciddi koroner arter hastalığı (KAH), kontrolsüz hipertansiyon, intrakraniyal anevrizma veya yeni geçirilmiş nöroşirürji/vasküler cerrahi: Ani ağrı geri dönüşü ve sempatik deşarj ile hipertansif kriz, MINS, ventriküler aritmi ve akut flash pulmoner ödem riski!',
          'Opioid bağımlısı annenin yenidoğanı (doğum salonu): Yenidoğanda akut yoksunluk ve nöbet tetikleyebileceğinden rutin nalokson verilmez (NRP: temel tedavi pozitif basınçlı ventilasyon + solunum desteğidir!).',
          'Eş zamanlı kokain/amfetamin/sempatomimetik alımı (polimadde zehirlenmesi): Opioid sedasyonu kalkınca karşılanmamış şiddetli sempatik hiperaktivite, hipertansif kriz ve nöbet ortaya çıkabilir.',
        ]}
        clinicalNote="Opioid dışı sedatif zehirlenmelerinde (benzodiyazepin, propofol, alkol, rezidüel kas gevşetici!) nalokson ETKİSİZDİR. PACU’da uyanmayan/apneik hastada daima önce hava yolu + BVM ventilasyonu, TOF (rezidüel NMB dışlama) ve EtCO₂/kan gazı kontrolü yapın!"
      />

      {/* 5. KLİNİK ENDİKASYONLAR VE DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozlar"
        title="Klinik Endikasyonlar ve Kanıta Dayalı Doz Rejimleri"
        icon={<Syringe className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />}
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
                <td className="py-3 pr-4 font-bold text-emerald-600 dark:text-emerald-400 min-w-[190px]">
                  Postoperatif PACU Solunum Depresyonu (OIRD — Erişkin)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums min-w-[195px]">
                  0,04 mg (40 mcg) IV<br />
                  <span className="text-[11px] font-normal text-slate-500">q2–3 dk titre et (KAH/kronikte 20 mcg)</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>Dahan (Anesthesiology 2010):</strong> 1 ampulü (0,4 mg) 10 mL’ye sulandırın (40 mcg/mL) ve 1 mL’lik (40 mcg) küçük boluslarla
                  solunum normale dönene dek titre edin. <strong>Asla tek seferde 0,4 mg puşe etmeyin!</strong>
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-sky-600 dark:text-sky-400">
                  Postoperatif PACU OIRD (Pediatrik)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  1 – 2 mcg/kg IV<br />
                  <span className="text-[11px] font-normal text-slate-500">(0,001–0,002 mg/kg) · q2–3 dk tekrar</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Analjeziyi koruyan mikro-doz titrasyonudur; tam zehirlenme dozu (0,1 mg/kg) ile karıştırılmamalıdır!
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-rose-600 dark:text-rose-400">
                  Akut Opioid Doz Aşımı / Zehirlenme (Erişkin — AHA 2023)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,04 → 0,4 → 2 mg IV/IO<br />
                  <span className="text-[11px] font-normal text-slate-500">IN sprey: 4 mg · IM: 0,4–2 mg · Maks 10 mg</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>Boyer 2012 &amp; AHA 2023:</strong> Kronik kullanıcıda/nabız varken 0,04–0,4 mg ile başla; apneik/hayatı tehdit edici toksisitede
                  0,4–2 mg IV/IM/IN ver. 10 mg’a dek yanıt yoksa opioid dışı nedenleri araştır (sentetik fentanil/buprenorfinde ek doz gerekebilir).
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-indigo-600 dark:text-indigo-400">
                  Sürekli IV İnfüzyon (Renarkotizasyon / Uzun Etkili Opioid)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  İlk uyanma dozunun 2/3’ü / saat<br />
                  <span className="text-[11px] font-normal text-slate-500">+ 15. dk’da ilk bolusun 1/2’si ek doz</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Metadon, transdermal fentanil, uzun salımlı oral opioidler, buprenorfin veya tekrarlayan bolus gerektiren hastalarda uygulanır (Boyer 2012).
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-amber-600 dark:text-amber-400">
                  Pediatrik Tam Opioid İntoksikasyonu (Acil/YBÜ)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  ≤ 20 kg: 0,1 mg/kg (maks 2 mg)<br />
                  <span className="text-[11px] font-normal text-slate-500">&gt; 20 kg / ≥ 5 yaş: 2 mg IV/IO/IM</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  Apne/ağır zehirlenme içindir; hafif-orta sedasyonda 0,01 mg/kg ile kademeli titrasyon tercih edilebilir.
                </td>
              </tr>
              <tr className="align-top">
                <td className="py-3 pr-4 font-bold text-teal-600 dark:text-teal-400">
                  Nöroaksiyel Opioid Kaşıntısı &amp; PONV (Murphy 2011)
                </td>
                <td className="py-3 pr-4 font-mono font-bold tabular-nums">
                  0,25 – 2,0 mcg/kg/saat IV<br />
                  <span className="text-[11px] font-normal text-slate-500">veya 40 mcg IV aralıklı bolus</span>
                </td>
                <td className="py-3 text-xs leading-relaxed">
                  <strong>Kjellberg &amp; Tramèr 2001 / Murphy 2011:</strong> Spinal/epidural morfin kaşıntısını analjeziyi bozmadan giderir; &gt; 2 mcg/kg/saat üzerinde analjezi azalır.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </MonographAccordionSection>

      {/* 6. ETKİLEŞİMLİ TİTRASYON, İNFÜZYON & KAŞINTI HESAPLAYICISI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="Etkileşimli Nalokson Titrasyon & İnfüzyon Pompası Hesaplayıcısı"
        subtitle="PACU analjezi koruyucu 40 mcg titrasyonu, Boyer 2/3 sürekli infüzyon pompası ve nöroaksiyel kaşıntı protokolü"
        icon={<Activity className={`h-5 w-5 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />}
        defaultOpen={false}
        containerClassName={
          isDark ? 'border-rose-500/30 bg-slate-900/80' : 'border-rose-200 bg-white shadow-xs'
        }
        bodyClassName="p-5 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-end gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <MonographCopyButton isDark={isDark} getText={getReportText} label="Yatak Başı Rapor Kopyala" />
        </div>

        {/* 3 Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'pacu_oird', label: '1. PACU Solunum Depresyonu (OIRD)' },
              { id: 'overdose_infusion', label: '2. Opioid Doz Aşımı & 2/3 İnfüzyon' },
              { id: 'pruritus', label: '3. Nöroaksiyel Kaşıntı / PONV' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? isDark
                    ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                    : 'bg-rose-50 border-rose-500 text-rose-900'
                  : isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PACU OIRD */}
        {activeTab === 'pacu_oird' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'adult', label: 'Erişkin PACU (40 mcg)' },
                    { id: 'pediatric', label: 'Pediatrik PACU (1–2 mcg/kg)' },
                  ] as const
                ).map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setPacuGroup(g.id);
                      if (g.id === 'pediatric' && pacuWeightKg > 40) setPacuWeightKg(18);
                      if (g.id === 'adult' && pacuWeightKg < 40) setPacuWeightKg(75);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                      pacuGroup === g.id
                        ? isDark
                          ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                          : 'bg-rose-50 border-rose-500 text-rose-900'
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
                  <label htmlFor={pacuWtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Hasta Kilosu (kg)
                  </label>
                  <input
                    id={pacuWtId}
                    type="number"
                    min={3}
                    max={180}
                    value={pacuWeightKg}
                    onChange={(e) => setPacuWeightKg(Math.max(3, Math.min(180, Number(e.target.value) || 3)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={pacuRrId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Mevcut Solunum Sayısı (/dk)
                  </label>
                  <input
                    id={pacuRrId}
                    type="number"
                    min={0}
                    max={30}
                    value={pacuRespRate}
                    onChange={(e) => setPacuRespRate(Math.max(0, Math.min(30, Number(e.target.value) || 0)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isLongActingOpioid}
                    onChange={(e) => setIsLongActingOpioid(e.target.checked)}
                    className="rounded border-slate-400 text-amber-600"
                  />
                  <span>Uzun/orta etkili opioid verildi (Morfin, Hidromorfon, Metadon, yüksek doz Fentanil)</span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChronicOpioid}
                    onChange={(e) => setIsChronicOpioid(e.target.checked)}
                    className="rounded border-slate-400 text-rose-600"
                  />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    Kronik opioid kullanımı / bağımlılık öyküsü var
                  </span>
                </label>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCardiacDisease}
                    onChange={(e) => setHasCardiacDisease(e.target.checked)}
                    className="rounded border-slate-400 text-rose-600"
                  />
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">
                    Ciddi KAH / Kontrolsüz HT / Yeni vasküler-kraniyal cerrahi
                  </span>
                </label>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {pacuRespRate < 6 && (
                <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${isDark ? 'bg-rose-950/50 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-950'}`}>
                  <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">ÖNCE HAVAYOLU &amp; BVM VENTİLASYONU (SS &lt; 6/dk)!</div>
                    <p className="mt-1 leading-relaxed">
                      Nalokson etkisini 1–2 dakikada gösterir. İlaç hazırlanırken <strong>çene itme (jaw-thrust), %100 O₂ ve balon-valf-maske (BVM) ventilasyonu</strong> ile hipoksiyi derhal düzeltin!
                    </p>
                  </div>
                </div>
              )}

              {(isChronicOpioid || hasCardiacDisease) && (
                <div className={`rounded-xl border p-3 text-xs flex items-start gap-2 ${isDark ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Yüksek Sempatik Fırtına / Yoksunluk Riski:</strong> Başlangıç dozu <strong>20 mcg (0,5 mL)</strong> mikro-bolusa düşürüldü. Hızlı tam reversal hipertansif kriz, MINS ve akut flash pulmoner ödem yapabilir!
                  </span>
                </div>
              )}

              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Analjezi Koruyucu Titrasyon Önerisi
                  </span>
                  <span className="font-mono text-lg font-extrabold tabular-nums text-slate-900 dark:text-white">
                    {pacuRec.doseLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Titrasyon Rejimi</div>
                    <div className="mt-1 font-semibold leading-relaxed">{pacuRec.rangeText}</div>
                  </div>
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Sulandırılmış Çekim Hacmi</div>
                    <div className="mt-1 font-mono font-bold text-amber-600 dark:text-amber-400 leading-relaxed">{pacuRec.dilutionText}</div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  {pacuRec.targetNote}
                </div>

                {isLongActingOpioid && (
                  <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'}`}>
                    <strong>Renarkotizasyon Gözlem Kuralı:</strong> Nalokson etkisi 30–60 dakikada biter. Son nalokson dozundan sonra hastayı PACU’da{' '}
                    <strong>en az 2 saat</strong> monitörlü izleyin; solunum depresyonu tekrarlarsa Sekme 2’deki sürekli IV infüzyona geçin.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: OPİOİD DOZ AŞIMI & BOYER 2/3 İNFÜZYON */}
        {activeTab === 'overdose_infusion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    { id: 'adult', label: 'Erişkin Zehirlenme' },
                    { id: 'pediatric', label: 'Pediatrik Zehirlenme' },
                  ] as const
                ).map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setOdGroup(g.id);
                      if (g.id === 'pediatric' && odWeightKg > 40) setOdWeightKg(15);
                      if (g.id === 'adult' && odWeightKg < 40) setOdWeightKg(75);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-colors ${
                      odGroup === g.id
                        ? isDark
                          ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                          : 'bg-rose-50 border-rose-500 text-rose-900'
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
                  <label htmlFor={odWtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Hasta Kilosu (kg)
                  </label>
                  <input
                    id={odWtId}
                    type="number"
                    min={3}
                    max={180}
                    value={odWeightKg}
                    onChange={(e) => setOdWeightKg(Math.max(3, Math.min(180, Number(e.target.value) || 3)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={wakeId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    İlk Etkili Uyanma Bolusu (mg)
                  </label>
                  <input
                    id={wakeId}
                    type="number"
                    min={0.04}
                    max={10}
                    step={0.1}
                    value={wakeUpDoseMg}
                    onChange={(e) => setWakeUpDoseMg(Math.max(0.04, Math.min(10, Number(e.target.value) || 0.04)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isCardiacArrest}
                  onChange={(e) => setIsCardiacArrest(e.target.checked)}
                  className="rounded border-slate-400 text-rose-600"
                />
                <span className="text-rose-600 dark:text-rose-400 font-semibold">
                  Nabız YOK — Opioid İlişkili Kardiyak Arrest Şüphesi (AHA 2023)
                </span>
              </label>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Örn: Hastanın spontan solunumu <strong>0,4 mg</strong> IV ile döndüyse, sürekli infüzyon saatte bu dozun 2/3’ü (<strong>0,27 mg/saat</strong>) olarak başlanır.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {isCardiacArrest && (
                <div className={`rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${isDark ? 'bg-rose-950/50 border-rose-500/50 text-rose-200' : 'bg-rose-50 border-rose-300 text-rose-950'}`}>
                  <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm">AHA 2023 Kuralı: ÖNCE YÜKSEK KALİTELİ CPR + VENTİLASYON!</div>
                    <p className="mt-1 leading-relaxed">
                      Nabızsız opioid arrestinde naloksonun sağkalım faydası kanıtlanmamıştır — <strong>kesintisiz göğüs kompresyonu, ventilasyon ve Adrenalin</strong> asla nalokson için geciktirilmez (eş zamanlı 0,4–2 mg IV/IO veya 4 mg IN uygulanabilir).
                    </p>
                  </div>
                </div>
              )}

              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {odGroup === 'adult'
                    ? 'Erişkin Akut Zehirlenme Merdiveni & Boyer (2012) Sürekli İnfüzyon'
                    : `Pediatrik Tam Doz Aşımı (${odWeightKg} kg) & İnfüzyon`}
                </div>

                {odGroup === 'adult' ? (
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs tabular-nums">
                    {['0,04 mg (Kronik)', '0,4 mg (Standart)', '2,0 mg (Ağır/Apne)', '4–10 mg (Sentetik/Tavan)'].map((step, i, arr) => (
                      <React.Fragment key={step}>
                        <span className={`px-2.5 py-1 rounded-lg border font-bold ${isDark ? 'bg-slate-900 border-rose-500/40 text-rose-300' : 'bg-white border-rose-200 text-rose-800'}`}>
                          {step}
                        </span>
                        {i < arr.length - 1 && <span className="text-slate-400">→</span>}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg border font-mono text-xs tabular-nums ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <strong>Pediatrik Acil Bolus:</strong> {pedOdDoseMg} mg IV/IO/IM ({odWeightKg <= 20 ? '0,1 mg/kg, maks 2 mg' : '> 20 kg sabit 2 mg'} · 2–3 dk’da tekrar)
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono tabular-nums">
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-indigo-500/30' : 'bg-white border-indigo-200'}`}>
                    <div className="text-[10px] uppercase text-slate-400">Boyer 2/3 İnfüzyon Hızı</div>
                    <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                      {infusionMgHr} mg / saat
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">({infusionMcgHr} mcg/saat IV)</div>
                  </div>

                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-emerald-500/30' : 'bg-white border-emerald-200'}`}>
                    <div className="text-[10px] uppercase text-slate-400">Pompa Hızı (2 mg / 50 mL SF)</div>
                    <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                      {infusionMlHrAt40McgMl} mL / saat
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">5 ampul (2 mg) + 45 mL SF = 40 mcg/mL</div>
                  </div>
                </div>

                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <strong>15. Dakika Köprü Bolusu (Boyer 2012):</strong> Sürekli infüzyon kararlı plazma düzeyine ulaşırken ilk bolusun etkisi düşebilir;
                  infüzyon başladıktan <strong>15 dakika sonra {halfRescueBolusMg} mg</strong> (ilk uyanma dozunun yarısı) tek ek bolus yapılması erken renarkotizasyonu önler.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NÖROAKSİYEL KAŞINTI / PONV */}
        {activeTab === 'pruritus' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={pruWtId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Hasta Kilosu (kg)
                  </label>
                  <input
                    id={pruWtId}
                    type="number"
                    min={10}
                    max={150}
                    value={pruritusWeightKg}
                    onChange={(e) => setPruritusWeightKg(Math.max(10, Math.min(150, Number(e.target.value) || 10)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label htmlFor={pruRateId} className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-300">
                    Hız (mcg/kg/saat)
                  </label>
                  <input
                    id={pruRateId}
                    type="number"
                    min={0.25}
                    max={3.0}
                    step={0.25}
                    value={pruritusRateMcgKgHr}
                    onChange={(e) => setPruritusRateMcgKgHr(Math.max(0.25, Math.min(3.0, Number(e.target.value) || 0.25)))}
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-mono font-bold tabular-nums ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[0.25, 0.5, 1.0, 2.0].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setPruritusRateMcgKgHr(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                      pruritusRateMcgKgHr === r
                        ? isDark
                          ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                          : 'bg-teal-50 border-teal-500 text-teal-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {r} mcg/kg/sa
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {pruritusAnalgesiaRisk && (
                <div className={`rounded-xl border p-3 text-xs flex items-start gap-2 ${isDark ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'}`}>
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Analjezi Kaybı Eşiği (&gt; 2 mcg/kg/saat):</strong> Bu hızın üzerinde nöroaksiyel opioid analjezisi tersine dönmeye başlar (Kjellberg &amp; Tramèr 2001). Dozu ≤ 2 mcg/kg/saat sınırında tutun!
                  </span>
                </div>
              )}

              <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Spinal / Epidural Morfin Kaşıntısı &amp; PONV İnfüzyon Reçetesi
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono tabular-nums">
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-[10px] uppercase text-slate-400">Saatlik Doz</div>
                    <div className="text-xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">{pruritusMcgHr} mcg / saat</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{pruritusRateMcgKgHr} mcg/kg/sa × {pruritusWeightKg} kg</div>
                  </div>
                  <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-emerald-500/30' : 'bg-white border-emerald-200'}`}>
                    <div className="text-[10px] uppercase text-slate-400">Pompa (400 mcg / 100 mL SF)</div>
                    <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{pruritusMlHrAt4McgMl} mL / saat</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">1 ampul (0,4 mg) + 99 mL SF = 4 mcg/mL</div>
                  </div>
                </div>
                <div className={`p-3 rounded-lg border text-xs leading-relaxed ${isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'}`}>
                  <strong>Klinik İpucu (Murphy 2011):</strong> Nöroaksiyel morfine bağlı kaşıntıda antihistaminikler (hidroksizin/feniramin) genellikle etkisizdir çünkü mekanizma histamin değil santral μ-reseptörüdür; düşük doz nalokson (0,25–1 mcg/kg/saat veya 40 mcg IV bolus) en etkili spesifik tedavidir.
                </div>
              </div>
            </div>
          </div>
        )}
      </MonographAccordionSection>

      {/* 7. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0) */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Nalokson HCl 0,4 mg / 1 mL Ampul (Türkiye Ruhsatlı Standart Form)',
            presentation: '1 mL berrak enjeksiyonluk çözelti içeren cam ampul (IV / IM / SC / IO kullanım; atomizer ile IN)',
            concentration: '0,4 mg/mL (400 mcg/mL)',
            saltOrBaseNote: '1 tam ampul = 400 mcg nalokson HCl içerir. Postoperatif PACU hastasında tek seferde 1 tam ampul puşe edilmesi şiddetli ağrı krizi ve flash pulmoner ödem nedenidir.',
            alertLevel: 'high',
          },
          {
            name: 'İntranazal (IN) Sprey / Atomizer Hazırlığı (Off-Label MAD)',
            presentation: 'Türkiye’de hazır 4 mg IN sprey her merkezde bulunmayabilir; acil damar yolu yoksa 0,4 mg/mL ampulden Mukozal Atomizasyon Cihazı (MAD) ile her burun deliğine ≤ 1 mL uygulanır.',
            concentration: '0,4 mg/mL (ampul) · 4 mg/0,1 mL (hazır sprey)',
            saltOrBaseNote: 'Damar yolu yoksa IM (deltoid/vastus lateralis) veya IN uygulama hayat kurtarıcıdır; ilk etki 2–5 dk’da başlar.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'PACU Erişkin Standart Titrasyon (40 mcg/mL): 1 ampul (0,4 mg / 1 mL) + 9 mL %0,9 NaCl = 10 mL enjektör → 1 mL = 40 mcg (0,5 mL = 20 mcg mikro-bolus).',
          'Pediatrik PACU Çift Sulandırma (4 mcg/mL): 40 mcg/mL enjektörden 1 mL çekilir + 9 mL %0,9 NaCl eklenir = 10 mL → 1 mL = 4 mcg (1–2 mcg/kg hassas titrasyon için).',
          'Boyer 2/3 Sürekli IV İnfüzyon (40 mcg/mL): 5 ampul (2 mg / 5 mL) + 45 mL %0,9 NaCl veya %5 Dekstroz = 50 mL perfüzör enjektörü.',
          'Nöroaksiyel Kaşıntı / PONV Düşük Doz İnfüzyon (4 mcg/mL): 1 ampul (0,4 mg = 400 mcg) + 99 mL %0,9 NaCl = 100 mL torba → 0,25–2,0 mcg/kg/saat hızında.',
        ]}
        concentrationTrapWarning="Postoperatif PACU’da ASLA 0,4 mg/1 mL tam ampulü doğrudan IV puşe etmeyin! Daima 10 mL’ye sulandırıp (40 mcg/mL) 1 mL’lik (40 mcg) dilimler halinde (KAH/kronik opioidde 0,5 mL = 20 mcg) titre edin."
      />

      {/* 8. DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0) */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="peripheral-ok"
        accessSummary="Periferik veya santral IV hattan doğrudan uygulanabilir. Damar yolu bulunmayan acil opioid intoksikasyonunda IM, SC, IO veya atomizerle intranazal (IN) yollar derhal kullanılabilir (ETT yolu emilim değişkenliği nedeniyle son çaredir)."
        phRange="3.0 – 6.5 (Asidik)"
        osmolalityNote="İzotonik seyreltmede (SF/D5W) doku vezikanı değildir; ancak asidik pH nedeniyle alkali çözeltilerle ve bisülfit/metabisülfit içeren preparatlarla kimyasal olarak geçimsizdir."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (İzotonik SF) — 24 saat stabil',
          '%5 Dekstroz (D5W) — 24 saat stabil',
          'Enjeksiyonluk Steril Su (dilüsyon için)',
        ]}
        stabilityNote="SF veya D5W içinde hazırlanan 4–40 mcg/mL infüzyon çözeltileri oda sıcaklığında (20–25 °C) 24 saat stabildir; ışıktan korunması önerilir ve 24 saat sonunda kalan çözelti atılmalıdır."
        ySiteCompatible={[
          'Heparin',
          'Ondansetron',
          'Linezolid',
          'Propofol (hat yıkaması sonrası)',
          'Ringer Laktat',
        ]}
        ySiteIncompatible={[
          'Sodyum Bikarbonat (alkali çökelme)',
          'Fenitoin (alkali presipitasyon)',
          'Bisülfit / Metabisülfit içeren çözeltiler',
          'Amfoterisin B',
          'Diazepam',
        ]}
        extravasationProtocol="Doku vezikanı değildir; periferik ekstravazasyonda infüzyonu durdurup kateteri çıkarın, ekstremiteyi eleve edin ve soğuk/ılık lokal takip yapın. Asıl klinik risk ekstravazasyona bağlı ilaç kaybı ve gecikmiş renarkotizasyondur — acil durumda derhal IM/IN veya ikinci IV hattan devam edin."
      />

      {/* 9. BÖBREK VE KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Acil ve perioperatif dozda renal ayarlama gerekmez; ancak böbrek yetmezliğinde sorumlu opioid (özellikle Morfin-6-glukuronid!) çok uzun süre biriktiği için RENARKOTİZASYON riski katlanır!"
        renalDetails={[
          'Nalokson inaktif glukuronid metabolitlerine karaciğerde çevrilir; bu nedenle başlangıç doz ayarı yapılmaz.',
          'KBH/ABY hastalarında aktif opioid metabolitleri (M6G, normeperidin) vücutta günlerce kalabildiğinden çok daha uzun gözlem veya sürekli nalokson infüzyonu gerekir.',
        ]}
        hepaticSummary="Başlangıç acil dozda değişiklik yapılmaz; ağır sirozda hepatik glukuronidasyon yavaşladığı için nalokson klirensi bir miktar uzar."
        hepaticDetails={[
          'Ağır karaciğer yetmezliğinde opioid klirensi de ciddi biçimde bozulduğundan renarkotizasyon takibi ve hepatik ensefalopati ayrımı kritiktir.',
        ]}
        {...STANDALONE_ORGAN_PART2['naloxone']}
      />

      {/* 10. GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0) */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="20–40 mcg Mikro-Titrasyon"
        geriatricPoints={[
          '>65 yaş, kırılgan (frailty) ve gizli/bilinen koroner arter hastalığı olan yaşlı hastalarda ani tam opioid geri dönüşü şiddetli hipertansif kriz, taşikardi, perioperatif miyokard hasarı (MINS) ve akut flash pulmoner ödemi tetikler.',
          'PACU’da 20–40 mcg (0,5–1 mL sulandırılmış 40 mcg/mL çözelti) çok küçük alikuotlarla 2–3 dakikada bir yalnızca yeterli spontan ventilasyon (SS ≥ 10–12/dk) sağlanana dek titre edin.',
          'Yaşlılarda opioid klirensi de yavaşladığı için nalokson sonrası renarkotizasyon penceresi uzundur; en az 2–4 saat yakın SpO₂/kapnografi izlemi gerekir.',
        ]}
        obesityWeightScalarBadge="Sabit Titre Alikuot (0,04 mg · Kilo Bazlı Yüksek Bolus YOK)"
        obesityPoints={[
          'Erişkin obez hastalarda (BMI ≥ 30–40 kg/m²) nalokson toplam vücut ağırlığına (TBW) göre yüksek tek bolus olarak hesaplanmaz; sabit 0,04 mg (40 mcg) titre alikuotlarla (zehirlenmede 0,4 → 2 mg merdiveni) klinik solunum yanıtına göre uygulanır.',
          'Obstrüktif uyku apnesi (OSA) ve obezite hipoventilasyon sendromu (OHS) bulunan hastalarda lipofilik opioidler (fentanil) yağ dokusundan yavaş salındığı için naloksonun 30–60 dk’lık etkisi geçince ağır renarkotizasyon ve üst hava yolu obstrüksiyonu gelişir.',
          'Obez PACU hastasında naloksonla birlikte baş elevasyonu (30°), CPAP/NIV desteği ve uzatılmış kapnografi izlemi zorunludur.',
        ]}
        clinicalNote="Kilo bazlı dozlama (1–2 mcg/kg PACU veya 0,1 mg/kg tam zehirlenme) yalnızca pediatrik popülasyon için geçerlidir; erişkinlerde (yaşlı/obez dahil) klinik yanıta göre mikro-titrasyon esastır."
      />

      {/* 11. GEBELİK, OBSTETRİK VE YENİDOĞAN */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Maternal solunum depresyonunda gecikmeden verilir (hayatı tehdit eden maternal hipoksi fetüs için en büyük risktir); kronik opioid kullanan gebede düşük doz titrasyonu şarttır."
        pregnancyDetails={[
          'Opioid bağımlısı gebede yüksek bolus fetal yoksunluk, fetal distres ve erken doğum tetikleyebilir → 40 mcg mikro-titrasyon ile yalnızca maternal solunumu restore edin.',
          'Doğum salonunda maternal opioid maruziyetli yenidoğanda (NRP): Öncelik daima pozitif basınçlı ventilasyon (PBV) ve solunum desteğidir; özellikle bağımlı anne bebeğinde nalokson akut nöbet riski nedeniyle önerilmez.',
        ]}
        lactationSummary="Oral biyoyararlanımı < %2 olduğu için anne sütüne geçse bile emzirilen bebekte sistemik emilim beklenmez — emzirme ile tamamen uyumludur."
        lactationDetails={[
          'Perioperatif kaşıntı veya solunum depresyonu tedavisinde nalokson sonrası emzirmeyi kesmeye gerek yoktur.',
        ]}
      />

      {/* 12. ÖNEMLİ OLUMSUZ ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Akut Non-Kardiyojenik (Flash) Pulmoner Ödem',
            incidenceOrSeverity: 'Nadir · Hayatı Tehdit Edici',
            tone: 'rose',
            detail:
              'Ani opioid geri dönüşünün tetiklediği masif katekolamin deşarjı → pulmoner vasküler basınç artışı ve kapalı glottise karşı inspirasyon (negatif basınçlı ödem) ile pembe köpüklü balgam ve ağır hipoksemi!',
          },
          {
            title: 'Sempatik Fırtına: Hipertansiyon, Taşikardi & MINS',
            incidenceOrSeverity: 'Yüksek Boluslarda Sık',
            tone: 'rose',
            detail:
              'Postoperatif ani şiddetli ağrı dönüşüyle sistolik tansiyon fırlaması, ventriküler aritmi, miyokard iskemisi, cerrahi anastomoz/kraniyal kanama riski.',
          },
          {
            title: 'Renarkotizasyon (Tekrarlayan Solunum Depresyonu)',
            incidenceOrSeverity: '30–60 dk Sonra KRİTİK',
            tone: 'amber',
            detail:
              'Naloksonun etki süresi (30–60 dk) morfin/fentanil/metadondan kısa olduğu için hasta servise alındıktan sonra tekrar apne ve arrest gelişebilir!',
          },
          {
            title: 'Akut Opioid Yoksunluk Sendromu',
            incidenceOrSeverity: 'Kronik Kullanıcıda',
            tone: 'amber',
            detail:
              'Şiddetli ajitasyon, kusma (aspirasyon riski!), diyare, terleme, piloereksiyon, kas krampları ve taşikardi — düşük doz (20–40 mcg) titrasyonla önlenir.',
          },
        ]}
      />

      {/* 13. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'PACU Altın Kuralı: "Ampulü 10’a Böl, 1 mL Ver!"',
            detail:
              '0,4 mg ampulü tek seferde vermek hastayı ağrı şokuna ve pulmoner ödeme sokar. 0,4 mg + 9 mL SF = 40 mcg/mL hazırlayıp 1 mL (40 mcg) aralıklarla titre etmek solunumu döndürürken analjeziyi korur.',
          },
          {
            title: 'Renarkotizasyon: Servise Gönderme Tuzağı',
            detail:
              'PACU’da naloksonla uyanan hasta 45 dakika sonra tekrar apneye girebilir. Son nalokson dozundan sonra en az 2 saat (uzun etkili opioid/KBH’de daha uzun veya infüzyonla) yakın monitörizasyon zorunludur.',
          },
          {
            title: 'Buprenorfin Direnci (Yüksek Reseptör Afinite)',
            detail:
              'Buprenorfin μ-reseptöründen çok yavaş ayrılır; standart 0,4 mg tek bolus yetersiz kalabilir ve daha yüksek bolus + saatlerce süren sürekli nalokson infüzyonu gerektirir (Dahan 2010).',
          },
          {
            title: 'Ksilazin / Benzodiyazepin / Rezidüel NMB Ayrımı',
            detail:
              'Nalokson yalnızca opioidleri çevirir. Yeterli naloksona rağmen solunum/bilinç açılmıyorsa hipoglisemi, hiperkapnik narkoz, rezidüel nöromüsküler blokaj (TOF kontrolü!), benzodiyazepin (Flumazenil) veya santral olay araştırın.',
          },
          {
            title: 'Opioid-İlişkili Göğüs Duvarı Rijiditesi (Wooden Chest)',
            detail:
              'Hızlı yüksek doz fentanil/remifentanil sonrası gelişen "tahta göğüs" sendromunda ventilasyon imkânsızlaşırsa hızlı etkili kas gevşetici (Süksinilkolin/Roküronyum) 1. tercihtir; nalokson da opioid rijiditesini çözer.',
          },
          {
            title: 'Nöroaksiyel Morfin Kaşıntısında Spesifik Antidot',
            detail:
              'Sezaryen veya ortopedi sonrası intratekal/epidural morfin kaşıntısı histamin aracılı değildir; 0,25–1 mcg/kg/saat düşük doz nalokson analjeziyi koruyarak kaşıntı ve bulantıyı çözer (Murphy 2011).',
          },
        ]}
      />

      {/* 14. DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (7-TM Opioid Reseptörleri [μ >> κ ≥ δ] Kompetitif Ortosterik Antagonizması & Ters Agonizma Biyofiziği)',
          summary:
            'Nalokson (17-allil-4,5α-epoksi-3,14-dihidroksimorfinan-6-on), oksimorfonun azot atomundaki metil grubunun bir N-allil (-CH₂-CH=CH₂) köküyle değiştirilmesiyle elde edilen, 7-transmembran (7-TM) G-proteini kenetli opioid reseptör ailesinin tüm alt tiplerine bağlanan ancak intrinsik Gαi/o aktivitesi SIFIR olan saf kompetitif ortosterik antagonisttir. Reseptör afinite hiyerarşisi μ-opioid reseptörü (MOR / OPRM1; Ki ≈ 0,8–1,1 nM) >> κ-opioid reseptörü (KOR / OPRK1; Ki ≈ 2–12 nM) ≥ δ-opioid reseptörü (DOR / OPRD1; Ki ≈ 16–25 nM) şeklindedir. Yüksek lipofilisite ve pKa 7,94 özelliğiyle kan-beyin bariyerini 60–90 saniyede geçerek beyin/plazma oranını hızla >1’in üzerine çıkarır (Miller’s 10th Ed. / Stoelting’s 6th Ed. / Boyer NEJM 2012).',
          points: [
            'MOR (OPRM1) Ortosterik Bağlanma Cebi & Sterik Konformasyon Kilidi: Nöronal membrandaki MOR’un TM3 (Asp147) ve TM6/TM7 hidrofobik cebine bağlanır; ancak hacimli N-allil yan zinciri TM6 heliksinin hücre içi Gαi/o kenetlenmesi için gereken dışa doğru dönme hareketini sterik olarak engeller → reseptörü inaktif konformasyonda kilitler.',
            'Nötr Antagonist vs Bağımlı Durumda Ters Agonist (Inverse Agonist) Davranışı: Opioid-naif (opioidsiz) bireyde bazal MOR aktivitesi düşük olduğundan klinik dozlarda nötr antagonist gibi davranır ve fizyolojik etki üretmez. Buna karşın kronik opioid maruziyetinde bazal konstitütif (ligand-bağımsız) aktivitesi artmış MOR popülasyonunda "ters agonist" (inverse agonist) gibi davranarak bazal Gαi/o tonusunu bile sıfırın altına çeker.',
            'Kütle Etkisi Yasası (Law of Mass Action) & k_off (Ayrılma Hızı) Kinetiği: Kompetitif yer değiştirme hızı hem nalokson konsantrasyonuna hem de mevcut opioid agonistinin reseptörden ayrılma sabitine (k_off) bağlıdır. Morfin ve fentanil (hızlı-orta k_off) hızla yer değiştirirken, çok yavaş k_off değerine sahip Buprenorfin (parsiyel MOR agonisti; t½_dissociation ~40–160 dk) veya ultra-potent karfentanil standart nalokson boluslarına direnç gösterir (Dahan 2010).',
            'Non-Opioid Membran Reseptörlerinden Tam Bağımsızlık: Pentamerik GABA-A (benzodiyazepin/propofol/barbitürat), NMDA (ketamin), α₂-adrenerjik (deksmedetomidin/klonidin/ksilazin) veya nikotinik ACh (nöromüsküler bloker) reseptörlerine bağlanmaz.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'Naloksonun MOR bağlanma cebinden opioid agonistini uzaklaştırması, Gαi/o ve Gβγ alt birimlerinin ayrışmasını saniyeler içinde durdurarak hücre içinde üç kritik elektrokimyasal "fren kalkması" (disinhibisyon) ve kronik bağımlıda "cAMP süperaktivasyonu" yaratır:',
          points: [
            'Postsinaptik GIRK (Kir3.1/3.2) Kanallarının Kapanması → Membran Repolarizasyonu / Depolarizasyon: Gβγ dimerlerinin GIRK potasyum kanallarından ayrılmasıyla hücre dışına K⁺ sızıntısı (hiperpolarizasyon akımı) anında kesilir. Pre-Bötzinger solunum pacemaker nöronları ve locus coeruleus uyanıklık nöronları −75 mV’tan −55 mV ateşleme eşiğine geri yükselerek spontan aksiyon potansiyeli deşarjına yeniden başlar.',
            'Presinaptik N/P/Q-Tipi Ca²⁺ (Cav2.2) Kanallarının Yeniden Açılması → SNARE Ekzositoz Restorasyonu: Presinaptik akson terminallerinde Gβγ aracılı Cav2.2 kanal inhibisyonu kalkar; depolarizasyonla hücre içine yeniden Ca²⁺ girer ve sinaptotagmin-SNARE kompleksi üzerinden Glutamat, P Maddesi, Noradrenalin ve Asetilkolin vezikül ekzositozu geri döner.',
            'Adenilat Siklaz (AC) Disinhibisyonu & Akut "cAMP Overshoot / Süperaktivasyonu": Gαi freninin kalkmasıyla membrana bağlı Adenilat Siklaz yeniden ATP’den cAMP üretmeye başlar. Kronik opioid kullanan veya yüksek doz opioid infüzyonu alan hastalarda kompansatuar olarak yukarı regüle olmuş AC Tip I/VIII ve PKA, nalokson verildiğinde bazalin 5–10 katı üzerinde patlayıcı bir hücre içi cAMP ve PKA fırtınası ("cAMP overshoot") üretir.',
            'Locus Coeruleus & Sempatoadrenal Nöronlarda CREB/PKA Hiperaktivasyonu: cAMP/PKA patlaması, katyon kanallarını ve voltaj kapılı Na⁺/Ca²⁺ kanallarını aşırı fosforilleyerek locus coeruleus ve rostral ventrolateral medulla (RVLM) sempatik nöronlarında kontrolsüz yüksek frekanslı ateşleme ve adrenal medulladan masif katekolamin (epinefrin/norepinefrin) ekzositozu tetikler.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Pre-Bötzinger Solunum Merkezi, Karotid Cisimcik & Göğüs Duvarı → Solunum Sistemi',
            tissueTarget: 'Pre-Bötzinger Kompleksi · Kemoreseptörler · Striatal/Laringeal Motor Ağ',
            accent: 'teal',
            points: [
              'Pre-Bötzinger Ritim & CO₂/Hipoksi Duyarlılığının Restorasyonu (1–2 dk): Medüller solunum merkezi ve karotid cisimcik Tip-I glomus hücrelerindeki MOR inhibisyonunu kaldırarak PaCO₂–ventilasyon yanıt eğrisinin eğimini ve sola kaymasını 1–2 dakika içinde normale döndürür; önce tidal hacim ve ardından solunum sayısı (SS ≥ 10–12/dk) yükselir.',
              'Opioid Kaynaklı Toraks & Vokal Kord Rijiditesinin ("Wooden Chest") Çözülmesi: Hızlı fentanil/remifentanil bolusuna bağlı nükleus raphe magnus ve bazal gangliyon/striatal MOR hiperaktivasyonunu bloke ederek torakoabdominal ve laringeal glottik spazmı santral düzeyde çözer.',
              'Negatif Basınçlı & Katekolamin Aracılı Akut "Flash" Pulmoner Ödem: Yüksek doz/hızlı nalokson bolusu sonrası aniden uyanan hastada kapalı glottise veya üst hava yolu obstrüksiyonuna karşı yapılan şiddetli inspiratuar çaba (Müller manevrası → aşırı negatif intratorasik basınç) ile masif sempatik pulmoner venokonstriksiyon birleşerek alveolokapiller membranı yırtar ve dakikalar içinde pembe köpüklü non-kardiyojenik pulmoner ödem oluşturur.',
            ],
          },
          {
            systemTitle: 'RVLM Sempatik Çekirdek, Adrenal Medulla & Miyokard/Vasküler Yatak → Kardiyovasküler Sistem',
            tissueTarget: 'RVLM & Sempatik Gangliyonlar · Koroner Yatak · Pulmoner/Sistemik Venler',
            accent: 'rose',
            points: [
              'Sempatoadrenal Katekolamin Fırtınası & Afterload Sıçraması: Yüksek doz nalokson (≥0,4 mg tek puşe) ile analjezinin aniden silinmesi plazma noradrenalin ve adrenalin düzeylerini saniyeler içinde 10–30 kat artırır → sistemik vasküler direnç (SVR), arteriyel kan basıncı ve kalp hızı patlayıcı biçimde fırlar.',
              'Miyokard Oksijen Tüketimi (MVO₂) Artışı, MINS & Ventriküler Aritmiler: Taşikardi ve akut sol ventrikül duvar gerilimi (afterload) artışı subendokardiyal koroner perfüzyonu bozarak koroner arter hastalarında perioperatif miyokard hasarı (MINS), akut koroner sendrom ve özellikle hipoksik/hiperkapnik miyokardda VT/VF tetikler.',
              'Pulmoner Kapiller Hidrostatik Yüklenme: Alfa-1 aracılı sistemik vazokonstriksiyon kanı periferden santral/pulmoner vasküler yatağa kaydırırken pulmoner venüller kasılır; sol atriyum ve pulmoner kapiller kama basıncı (PCWP) hızla yükselerek flash pulmoner ödeme hidrostatik zemin hazırlar.',
            ],
          },
          {
            systemTitle: 'Locus Coeruleus, Spinal Arka Boynuz & Serebral Dolaşım → Santral Sinir Sistemi',
            tissueTarget: 'Locus Coeruleus · Lamina I/II & Trigeminal Çekirdek · Serebral Damarlar',
            accent: 'indigo',
            points: [
              'Analjezi Koruyucu Pencere vs Akut Ağrı Krizinin Nörobiyolojisi: Düşük doz mikro-titrasyonda (20–40 mcg IV) beyin sapı solunum merkezindeki (μ₂) depresyon seçici olarak çözülürken spinal/supraspinal analjezi (μ₁) büyük ölçüde korunur; tam ampul (400 mcg) verildiğinde ise lamina I/II ve PAG’daki tüm MOR’lar boşalarak cerrahi hastayı akut ağrı ve deliryum krizine sokar.',
              'Spinal Trigeminal Çekirdek ("Kaşıntı Merkezi") & Area Postrema (PONV): Nöroaksiyel morfinin medüller dorsal boynuz / spinal trigeminal çekirdekteki kaşıntı nöronları (GRP reseptör yolu) üzerindeki disinhibisyonunu 0,25–2,0 mcg/kg/saat düşük dozda bloke ederek analjeziyi bozmadan santral opioid kaşıntısını ve bulantıyı keser (Murphy 2011; Kjellberg 2001).',
              'Serebral Kan Akımı (CBF), KİB & Yenidoğan/Tramadol Nöbet Eşiği: Ani uyanma ve hipertansif pik CBF ve kafa içi basıncını (ICP) yükselterek intrakraniyal anevrizma veya yeni kraniyotomi hastasında kanama riski yaratır; opioid bağımlısı anne yenidoğanında ve meperidin/tramadol intoksikasyonunda nöbet tetikleyebilir.',
            ],
          },
          {
            systemTitle: 'Enterik Miyenterik Pleksus, Hepatik UGT2B7 & Beyin-Plazma Kompartmanı → GİS & Metabolizma',
            tissueTarget: 'Miyenterik Pleksus · Hepatik Sinüzoid (UGT2B7) · KBB Dağılımı',
            accent: 'amber',
            points: [
              'Hızlı Beyin-Plazma Redistribüsyonu (Renarkotizasyonun Farmakokinetik Kökü): Nalokson çok yüksek lipofilisitesiyle beyne hızla girer ancak 20–30 dakika içinde beyin dokusundan periferik kompartmana geri dağılır ve karaciğerde UGT2B7 glukuronidasyonuyla hızla temizlenir (etki süresi 30–60 dk). Morfin, metadon veya yağdan salınan fentanil beyinde kaldığından hasta 45 dk sonra yeniden apneye girer.',
              'Hepatik İlk-Geçiş Yıkımı (%98+) & Enterik Selektif OIC Tedavisi: Oral verildiğinde bağırsak duvarı ve karaciğerde UGT2B7 ile %98’den fazla ilk-geçiş glukuronidasyonuna (nalokson-3-glukuronid) uğradığından sistemik dolaşıma geçmez; yalnızca miyenterik pleksustaki enterik MOR’ları bloke ederek santral analjeziyi bozmadan opioid ilişkili konstipasyonu (OIC) çözer.',
              'Akut GİS Yoksunluk Hipermotilitesi & Kusma/Aspirasyon: Kronik opioid kullanıcısında parenteral yüksek doz nalokson enterik pleksusta ani ACh ve serotonin deşarjı yaratarak şiddetli abdominal kramp, patlayıcı diyare ve fışkırır tarzda kusma (korunmasız hava yolunda ölümcül aspirasyon!) başlatır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Renarkotizasyon Biyofiziği, Buprenorfin Direnci (k_off) & Boyer 2/3 İnfüzyon Modeli',
          summary:
            'Nalokson tedavisinde klinik başarı; "reseptör doluluk oranı (occupancy)" ile "ayrılma kinetiği (k_off)" arasındaki zamansal uyumsuzluğu yönetmeye dayanır.',
          points: [
            'Diferansiyel Reseptör Doluluk Eşiği (Solunum Kurtarma vs Tam Analjezi Silinmesi): Pre-Bötzinger solunum merkezinde yeterli spontan ventilasyonu geri kazandırmak için MOR popülasyonunun yalnızca %20–30’undan agonisti uzaklaştırmak (20–40 mcg IV mikro-titrasyon) yeterlidir; buna karşın >200–400 mcg tek bolus reseptörlerin >%80–90’ını aniden boşaltarak analjeziyi sıfırlar ve sempatik taşma (cAMP overshoot) üretir (Dahan 2010).',
            'Buprenorfin "Çan Eğrisi" & Yavaş k_off Direnci: Buprenorfin MOR’a sub-nanomolar afiniteyle bağlanır ve reseptörden ayrılma yarı ömrü (~40–160 dk) naloksonun beyin kalış süresinden (~30 dk) çok daha uzundur. Bu nedenle buprenorfin solunum depresyonunda standart 0,4 mg nalokson etkisiz kalır; reseptörleri açılan boşluklarda yakalayabilmek için 2–4 mg yükleme ve mutlaka sürekli IV infüzyon (4–8 mg/saat’e varan; ancak >10 mg üzerinde çan eğrisi/paradoksal azalma olabileceği unutulmadan) gerekir.',
            'Boyer (NEJM 2012) "2/3 Uyanma Dozu / Saat" Farmakokinetik Modeli: Naloksonun görünür dağılım hacmi ve 30–80 dakikalık eliminasyon yarı ömrü nedeniyle, hastanın solunumunu/bilincini açan ilk etkili kümülatif bolusun (ör. 0,6 mg) her saat 2/3’ünün (0,4 mg/saat) sürekli IV infüzyon olarak verilmesi (+ infüzyonun 15. dakikasında dağılım çukurunu doldurmak için ilk bolusun 1/2’si köprü bolusu), santral kompartmandaki antagonist konsantrasyonunu sabit tutarak renarkotizasyonu matematiksel olarak engeller.',
          ],
        }}
        clinicalPearls={[
          'Neden Hipoksik/Hiperkapnik Hastada Nalokson Öncesi BVM Ventilasyon Hayati Şarttır? Şiddetli hiperkapni (PaCO₂ > 65 mmHg) ve hipoksi altında miyokard zaten yüksek endojen katekolamin ve asidoz yükü altındadır; BVM ile CO₂ düşürülmeden yüksek doz nalokson puşe edilirse gelişen ani sempatik deşarj ventriküler fibrilasyon (VF) ve flash pulmoner ödemi doğrudan tetikler.',
          'PACU "40 mcg (1 mL) Mikro-Titrasyon" Sanatı: 1 ampul (0,4 mg / 1 mL) Naloksonu 9 mL SF ile 10 mL’ye tamamlayın (40 mcg/mL). Her 2–3 dakikada bir yalnızca 1 mL (40 mcg; KAH veya kronik opioid kullanıcısında 0,5 mL = 20 mcg) verin. Hedef hastanın gözünü açıp konuşması DEĞİL, solunum sayısının ≥10–12/dk ve EtCO₂’nin güvenli aralığa gelmesidir.',
          'Nalokson-İlişkili Flash Pulmoner Ödemde Furosemid Tuzağı: Bu tablo sol kalp yetmezliği veya hipervolemi değil, masif katekolamin venokonstriksiyonu + negatif intratorasik basınca bağlı alveolokapiller sızıntıdır (non-kardiyojenik ARDS benzeri). Tedavinin temeli agresif diürez değil, derhal pozitif basınçlı ventilasyon (NIV / CPAP veya entübasyon + yüksek PEEP) ve oksijenasyondur.',
          'Polimadde & Ksilazin / Benzodiyazepin / Rezidüel NMB Ayırıcı Tanısı: Kümülatif 2–10 mg naloksona yanıt vermeyen postoperatif veya acil servis hastasında ısrarla nalokson tekrarlamak yerine; TOF cihazıyla rezidüel nöromüsküler blokajı, benzodiyazepin/alkol/ksilazin ko-ingestiyonunu, hipoglisemiyi, ağır hiperkapnik narkozu veya akut intrakraniyal olayı dışlayın.',
        ]}
      />

      {/* 15. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (v4.0) */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Nalokson Hidroklorür"
        drugsComUrl="https://www.drugs.com/drug-interactions/naloxone.html"
        medscapeUrl="https://reference.medscape.com/drug/narcan-naloxone-343741"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Sodyum Bikarbonat · Fenitoin · Bisülfit/Metabisülfit Çözeltileri (Aynı IV Hat)',
            mechanism: 'Fizikokimyasal pH Uyumsuzluğu & Kimyasal İnaktivasyon',
            clinicalEffect: 'Asidik nalokson çözeltisi alkali ilaçlarla çökelir; bisülfit/metabisülfit ile kimyasal degradasyona uğrayarak antidot etkinliğini yitirir.',
            management: 'Aynı IV hattan/Y-site’dan asla vermeyin; ayrı lümen kullanın veya hattı SF ile yıkayın.',
          },
          {
            severity: 'D',
            agent: 'Kronik Opioid Agonistleri (Metadon · Morfin · Oksikodon · Fentanil TTS)',
            mechanism: 'Ani Kompetitif μ-Opioid Reseptör Boşaltımı',
            clinicalEffect: 'Yüksek tek bolus (≥ 0,4 mg) akut şiddetli yoksunluk sendromu, kusma/aspirasyon, ajitasyon ve katekolamin fırtınası (HT, MINS, flash pulmoner ödem) tetikler.',
            management: '20–40 mcg IV mikro-titrasyon ile yalnızca yeterli spontan solunumu (SS ≥ 10–12/dk) hedefleyin; uzun etkili opioidde Boyer 2/3 infüzyonu planlayın.',
          },
          {
            severity: 'D',
            agent: 'Sempatomimetikler (Kokain · Amfetamin · Yüksek Doz Katekolaminler)',
            mechanism: 'Karşılanmamış Sempatik Hiperaktivite (Opioid Freninin Ani Kalkması)',
            clinicalEffect: 'Polimadde zehirlenmesinde opioid sedasyonu kalkınca şiddetli hipertansif kriz, taşiaritmi, miyokard iskemisi ve nöbet gelişebilir.',
            management: 'Düşük doz titre nalokson (0,04 mg) kullanın; ajitasyon/HT için benzodiyazepin ve kısa etkili vazodilatör/esmolol hazır bulundurun.',
          },
          {
            severity: 'D',
            agent: 'Buprenorfin (Yüksek Afinite Parsiyel μ-Agonisti)',
            mechanism: 'Yavaş Reseptör Ayrılma Kinetiği (Yüksek μ-Afinite Direnci)',
            clinicalEffect: 'Standart 0,4 mg tek bolus solunum depresyonunu tam döndüremeyebilir ve hızlı renarkotizasyon gelişir.',
            management: 'Daha yüksek kademeli bolus (2–4+ mg) ve saatlerce süren sürekli nalokson IV infüzyonu uygulayın.',
          },
          {
            severity: 'C',
            agent: 'Klonidin (Santral α₂-Agonisti)',
            mechanism: 'Kısmi Endojen Opioid / Santral Sempatolitik Etkileşim',
            clinicalEffect: 'Klonidin intoksikasyonunda naloksonun solunum/sedasyon geri dönüş etkisi değişken ve öngörülemezdir; paradoks hipertansiyon gelişebilir.',
            management: 'Klonidin toksisitesinde temel tedavi destekleyici havayolu/hemodinami yönetimidir; nalokson denenirse hemodinamiyi yakından izleyin.',
          },
        ]}
        references={[
          {
            authors: 'Boyer EW.',
            title: 'Management of Opioid Analgesic Overdose',
            journal: 'The New England Journal of Medicine. 2012;367(2):146–155',
            year: 2012,
            pmid: '22784117',
            doi: '10.1056/NEJMra1202561',
            note: '0,04 mg düşük doz titrasyonu, renarkotizasyon mekanizması, ilk uyanma dozunun 2/3’ü/saat sürekli infüzyon kuralı ve akut pulmoner ödem yönetimini tanımlayan ana kaynak.',
          },
          {
            authors: 'Dahan A, Aarts L, Smith TW.',
            title: 'Incidence, Reversal, and Prevention of Opioid-induced Respiratory Depression',
            journal: 'Anesthesiology. 2010;112(1):226–238',
            year: 2010,
            pmid: '20010421',
            doi: '10.1097/ALN.0b013e3181c38c25',
            note: 'Postoperatif PACU OIRD insidansı, analjezi koruyucu düşük doz nalokson titrasyonu ve buprenorfin gibi yüksek afiniteli opioidlerin geri dönüş kinetiği.',
          },
          {
            authors: 'Lavonas EJ, Akpunonu PD, Arens AM, et al.',
            title: '2023 American Heart Association Focused Update on the Management of Patients With Cardiac Arrest or Life-Threatening Toxicity Due to Poisoning',
            journal: 'Circulation. 2023;148(16):e149–e184',
            year: 2023,
            pmid: '37721023',
            note: 'Opioid ilişkili solunum/kardiyak acillerde nalokson uygulaması ve CPR’ı geciktirmeme prensiplerini içeren güncel AHA kılavuzu.',
          },
          {
            authors: 'Murphy JD, Gelfand HJ, Bicket MC, et al.',
            title: 'Analgesic efficacy of intravenous naloxone for the treatment of postoperative pruritus: a meta-analysis',
            journal: 'Journal of Opioid Management. 2011;7(4):321–327',
            year: 2011,
            pmid: '21957831',
            note: 'Düşük doz IV naloksonun postoperatif opioid kaşıntı ve bulantısını ağrı skorlarını bozmadan azalttığını gösteren meta-analiz.',
          },
          {
            authors: 'Kjellberg F, Tramèr MR.',
            title: 'Pharmacological control of opioid-induced pruritus: a quantitative systematic review of randomized trials',
            journal: 'European Journal of Anaesthesiology. 2001;18(6):346–357',
            year: 2001,
            pmid: '11412287',
            note: '0,25–2,4 mcg/kg/saat düşük doz sürekli nalokson infüzyonunun opioid kaşıntısındaki etkinliğini ve > 2 mcg/kg/saat analjezi kaybı eşiğini tanımlayan sistematik derleme.',
          },
        ]}
      />
    </div>
  );
};
