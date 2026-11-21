import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Zap,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';

interface PeripheralNerveStimulatorModuleProps {
  isDark: boolean;
}

type StimPattern = 'tof' | 'ptc' | 'dbs';
type BlockAgent = 'nondepol' | 'succinylcholine';
type PnsPresetId =
  | 'intense_ptc0'
  | 'deep_ptc3'
  | 'moderate_tof2'
  | 'shallow_residual'
  | 'safe_extubation'
  | 'sux_phase1';

const PATTERN_TABLE = [
  {
    pattern: 'TOF (Train-of-Four)',
    protocol: '2 Hz × 4 supramaksimal puls (0.5 sn ara · toplam 2 sn · tekrar ≥ 12–15 sn)',
    useCase: 'İntraoperatif orta/yüzeyel blok takibi ve ekstübasyon onayı (TOFR = T_{4} / T_{1})',
    clinicalKey: 'T_{4} kaybı ~%75, T_{3} ~%80, T_{2} ~%85–90, T_{1} ~%90–95 reseptör bloğunu gösterir. Güvenli ekstübasyon: Kantitatif TOFR ≥ 0.90.',
  },
  {
    pattern: 'PTC (Post-Tetanik Sayım)',
    protocol: '50 Hz × 5 sn tetani → 3 sn bekleme → 1 Hz tekli uyarılar (15–20 kez)',
    useCase: 'TOF = 0 iken derin ve yoğun bloğu ölçmek (laparoskopi, göz/beyin cerrahisi)',
    clinicalKey: 'Post-tetanik kolaylaştırma ile geçici ACh mobilizasyonu sağlar. PTC ≥ 1–2 → Sugammadeks 4 mg/kg. 3–5 dk’dan sık tekrarlama (bloğu yapay açar!).',
  },
  {
    pattern: 'DBS_{3,3} (Double Burst)',
    protocol: '50 Hz 3 puls → 750 ms ara → 50 Hz 3 puls (iki belirgin kasılma: D_{1} & D_{2})',
    useCase: 'Yalnızca kalitatif (manuel) stimülatör varsa rezidüel fade saptama duyarlılığını artırma',
    clinicalKey: 'Elle TOF fade’i TOFR > 0.40’ta kaçırılırken DBS_{3,3} eşiği ~0.60–0.70’e çeker; yine de TOFR 0.70–0.89 rezidüel bloğu dışlayamaz!',
  },
  {
    pattern: 'Tetani (50–100 Hz) & ST',
    protocol: 'Tekli uyarı (ST): 0.1–1 Hz · Tetani: 50–100 Hz × 5 sn sürekli uyarı',
    useCase: 'ST araştırma/bazal kalibrasyon; tetani yüksek frekanslı fade stres testi',
    clinicalKey: 'ST bazal kontrol gerektirir. Tetani çok ağrılıdır ve sık yapılırsa post-tetanik kolaylaştırma nedeniyle sonraki TOF okumalarını bozar.',
  },
];

const SENSOR_TABLE = [
  {
    tech: 'EMG (Elektromiyografi)',
    principle: 'Sinir uyarımı sonrası oluşan birleşik kas aksiyon potansiyelini (CMAP) yüzey elektrotlarıyla ölçer.',
    pros: 'Elin serbestçe hareket etmesi gerekmez (örtü altında sabitlenmiş kolda çalışır); bazal over-estimation (> 1.00) yapmaz.',
    cons: 'Elektrokoter parazitine duyarlı olabilir; cilt hazırlığı ve elektrot teması önemlidir.',
  },
  {
    tech: 'AMG (Akseleromiyografi)',
    principle: 'Başparmağa takılan piezoelektrik ivmeölçer ile F = m × a üzerinden kasılma ivmesini ölçer (TOF-Watch, Stimpod).',
    pros: 'Yaygın, pratik ve düşük maliyetli kantitatif monitörizasyon.',
    cons: 'Başparmak TAMAMEN SERBEST olmalıdır! Bazal TOFR sıkça 1.05–1.15 çıkar → normalize edilmemiş AMG’de hedef TOFR ≥ 1.00 olmalıdır.',
  },
  {
    tech: 'KMG (Kinemiyografi)',
    principle: 'Başparmak ile işaret parmağı arasına yerleştirilen piezoelektrik şeridin bükülme voltajını ölçer.',
    pros: 'Ön yük (preload) gerektirmez, el içi yerleşimi kolaydır.',
    cons: 'Başparmağın serbest hareketini gerektirir; örtü/bant teması ölçümü bozar.',
  },
  {
    tech: 'Kalitatif PNS (Göz / El)',
    principle: 'Cihaz yalnızca elektrik akımı verir; klinisyen kasılmaları görerek veya dokunarak sayar.',
    pros: 'Sıfır monitör yokluğundan iyidir; derin blokta TOF sayısı ve PTC sayılabilir.',
    cons: 'TOFR 0.40–0.89 aralığında KÖRDÜR! ASA 2023 & ESAIC 2023 kantitatif izlem karşısında yetersiz kabul eder.',
  },
];

const REFERENCES = [
  {
    authors: 'Viby-Mogensen J, Howardy-Hansen P, Chraemmer-Jørgensen B, et al.',
    title: 'Posttetanic count (PTC): a new method of evaluating an intense nondepolarizing neuromuscular blockade.',
    journal: 'Anesthesiology. 1981;55(4):458–461.',
    pmid: '7294384',
  },
  {
    authors: 'Engbæk J, Østergaard D, Viby-Mogensen J.',
    title: 'Double burst stimulation (DBS): a new pattern of nerve stimulation to identify residual neuromuscular block.',
    journal: 'Br J Anaesth. 1989;62(3):274–278.',
    pmid: '2522790',
  },
  {
    authors: 'Naguib M, Brull SJ, Kopman AF, et al.',
    title: 'Consensus Statement on Perioperative Use of Neuromuscular Monitoring.',
    journal: 'Anesth Analg. 2018;127(1):71–80.',
    pmid: '29200077',
  },
  {
    authors: 'Fuchs-Buder T, Romero CS, Lewald H, et al. (ESAIC).',
    title: 'Peri-operative management of neuromuscular blockade: a guideline from the European Society of Anaesthesiology and Intensive Care.',
    journal: 'Eur J Anaesthesiol. 2023;40(2):82–94.',
    pmid: '36394863',
  },
  {
    authors: 'Thilen SR, Weigel WA, Todd MM, et al. (ASA Task Force).',
    title: '2023 American Society of Anesthesiologists Practice Guidelines for Monitoring and Antagonism of Neuromuscular Blockade.',
    journal: 'Anesthesiology. 2023;138(1):13–41.',
    pmid: '36520073',
  },
];

export const PeripheralNerveStimulatorModule: React.FC<PeripheralNerveStimulatorModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<PnsPresetId>('shallow_residual');
  const [pattern, setPattern] = useState<StimPattern>('tof');
  const [agent, setAgent] = useState<BlockAgent>('nondepol');
  const [occupancy, setOccupancy] = useState<number>(68); // 0..100 % nAChR receptor occupancy

  const applyPreset = (preset: PnsPresetId) => {
    setActivePreset(preset);
    if (preset === 'intense_ptc0') {
      setAgent('nondepol');
      setOccupancy(99);
      setPattern('ptc');
    } else if (preset === 'deep_ptc3') {
      setAgent('nondepol');
      setOccupancy(95);
      setPattern('ptc');
    } else if (preset === 'moderate_tof2') {
      setAgent('nondepol');
      setOccupancy(84);
      setPattern('tof');
    } else if (preset === 'shallow_residual') {
      setAgent('nondepol');
      setOccupancy(68);
      setPattern('tof');
    } else if (preset === 'safe_extubation') {
      setAgent('nondepol');
      setOccupancy(32);
      setPattern('tof');
    } else if (preset === 'sux_phase1') {
      setAgent('succinylcholine');
      setOccupancy(82);
      setPattern('tof');
    }
  };

  // Physiological Neuromuscular Junction & Quantitative TOF / PTC / DBS Model
  const sim = useMemo(() => {
    let t1 = 100;
    let t2 = 100;
    let t3 = 100;
    let t4 = 100;
    let ptc = 15;
    let d1 = 100;
    let d2 = 100;

    if (agent === 'succinylcholine') {
      // Phase I depolarizing block: NO fade! All 4 twitches depressed equally, NO post-tetanic facilitation
      const scale = occupancy >= 94 ? 0 : Math.max(0, Math.min(100, Math.round((94 - occupancy) * 2.2)));
      t1 = scale;
      t2 = scale;
      t3 = scale;
      t4 = scale;
      d1 = scale;
      d2 = scale;
      ptc = scale > 0 ? 12 : 0;
    } else {
      // Classic non-depolarizing occupancy ladder (Paton & Waud margin of safety ~75%!)
      if (occupancy >= 92) {
        t1 = 0;
        t2 = 0;
        t3 = 0;
        t4 = 0;
      } else if (occupancy >= 86) {
        t1 = Math.max(8, Math.round(((92 - occupancy) / 6) * 42));
        t2 = 0;
        t3 = 0;
        t4 = 0;
      } else if (occupancy >= 80) {
        t1 = Math.round(42 + ((86 - occupancy) / 6) * 24);
        t2 = Math.max(8, Math.round(((86 - occupancy) / 6) * 34));
        t3 = 0;
        t4 = 0;
      } else if (occupancy >= 74) {
        t1 = Math.round(66 + ((80 - occupancy) / 6) * 18);
        t2 = Math.round(34 + ((80 - occupancy) / 6) * 24);
        t3 = Math.max(8, Math.round(((80 - occupancy) / 6) * 32));
        t4 = 0;
      } else {
        // 4 twitches present — TOFR rises smoothly from ~0.18 at 73% to 1.00 at <= 35%
        t1 = Math.min(100, Math.round(84 + Math.max(0, 74 - occupancy) * 0.5));
        const ratio = Math.max(0.15, Math.min(1.0, 1.0 - Math.max(0, occupancy - 36) * 0.022));
        t4 = Math.round(t1 * ratio);
        t3 = Math.round(t1 * (ratio + (1 - ratio) * 0.34));
        t2 = Math.round(t1 * (ratio + (1 - ratio) * 0.68));
      }

      // PTC count (meaningful when TOF = 0, i.e., occupancy >= 92%)
      if (occupancy >= 98) ptc = 0;
      else if (occupancy >= 92) ptc = Math.max(1, Math.round((98 - occupancy) * 1.9));
      else ptc = 15;

      // DBS3,3 bursts (slightly amplifies fade perception relative to T4/T1)
      if (t1 === 0) {
        d1 = 0;
        d2 = 0;
      } else {
        d1 = t1;
        const rawTofr = t4 / t1;
        d2 = Math.round(d1 * Math.max(0, rawTofr - 0.06));
      }
    }

    const tofCount = [t1, t2, t3, t4].filter((v) => v > 0).length;
    const tofr = tofCount === 4 && t1 > 0 ? Number((t4 / t1).toFixed(2)) : null;

    // Depth classification & ASA 2023 / ESAIC 2023 Antagonism Recommendation
    let depthLabel = 'Tam Derlenme';
    let sugammadeksDose = 'Gerekmez';
    let neostigminAdvice = 'VERİLMEZ (Paradoksal güçsüzlük!)';
    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = 'Güvenli Ekstübasyon Kriteri Sağlandı (Kantitatif TOFR ≥ 0.90)';
    let action =
      'Adduktor pollisis kantitatif TOFR ≥ 0.90 düzeyinde. Antagonizma gerekmez; bu aşamada neostigmin verilmesi paradoksal nöromüsküler güçsüzlüğe ve üst havayolu kollapsına yol açabilir.';

    if (agent === 'succinylcholine') {
      depthLabel = occupancy >= 94 ? 'Tam Depolarizan Blok' : 'Faz I Depolarizan Blok';
      sugammadeksDose = 'ETKİSİZ (Steroidal değil!)';
      neostigminAdvice = 'KONTRENDİKE (Faz I bloğu UZATIR!)';
      status = 'warning';
      headline = `Süksinilkolin Faz I Blok: Fade YOK (TOFR = ${tofr !== null ? tofr.toFixed(2) : '0'})`;
      action =
        'Depolarizan Faz I blokta dört yanıt eşit küçülür (fade ve post-tetanik kolaylaştırma yoktur). Neostigmin plazma kolinesterazını inhibe ederek süksinilkolin bloğunu UZATIR; Sugammadeks ise süksinilkoline bağlanmaz — spontan derlenme beklenir.';
    } else if (tofCount === 0 && ptc === 0) {
      depthLabel = 'Yoğun / Tam Blok (PTC 0)';
      sugammadeksDose = '16 mg/kg (Yalnızca acil CICO)';
      neostigminAdvice = 'ETKİSİZ · VERİLMEZ';
      status = 'critical';
      headline = 'Yoğun (Komplet) Blok: TOF = 0 · PTC = 0';
      action =
        'Reseptörlerin >%98’i bloke; neostigmin bu derinlikte tamamen etkisizdir! Rutin uyanma için PTC ≥ 1–2 olana kadar bekleyin. Yalnızca acil “Entübe Edilemez–Oksijenlenemez (CICO)” kurtarmasında Roküronyum sonrası Sugammadeks 16 mg/kg (gerçek vücut ağırlığı) kullanılır.';
    } else if (tofCount === 0 && ptc >= 1) {
      depthLabel = `Derin Blok (TOF 0 · PTC ${ptc})`;
      sugammadeksDose = '4 mg/kg IV';
      neostigminAdvice = 'ETKİSİZ · VERİLMEZ';
      status = 'critical';
      headline = `Derin Nöromüsküler Blok: TOF = 0 · PTC = ${ptc}`;
      action = `Cerrahi için mükemmel derin kas gevşemesi (laparoskopi/robotik/açık batın). Uyanma gerekiyorsa tek etkili antagonist Sugammadeks 4 mg/kg’dır (Roküronyum/Veküronyum). Benzilizokinolinyumda (Sisatrakuryum) TOF 4/4 beklenmelidir.`;
    } else if (tofCount >= 1 && tofCount <= 3) {
      depthLabel = `Orta Blok (TOF ${tofCount}/4)`;
      sugammadeksDose = tofCount >= 2 ? '2 mg/kg IV' : '4 mg/kg (TOF 1/4)';
      neostigminAdvice = 'ASA 2023: TOF 4/4 bekle!';
      status = 'warning';
      headline = `Orta Blok (TOF ${tofCount}/4) — Ekstübasyon KESİNLİKLE YASAK!`;
      action = `Roküronyum/Veküronyum için Sugammadeks ${tofCount >= 2 ? '2 mg/kg' : '4 mg/kg'} hızla TOFR ≥ 0.90’a döndürür. Neostigmin kullanılacaksa ASA 2023 kılavuzu tavan etkisi nedeniyle TOF 4/4 (minimal blok) beklenmesini önerir; neostigmin verildikten sonra kantitatif TOFR ≥ 0.90 teyit edilmelidir.`;
    } else if (tofr !== null && tofr < 0.9) {
      depthLabel = `Rezidüel / Yüzeyel Blok (TOFR ${tofr.toFixed(2)})`;
      sugammadeksDose = '2 mg/kg IV (veya düşük doz)';
      neostigminAdvice = '20–40 mcg/kg + Atropin/Glikopirolat';
      status = 'critical';
      headline = `TEHLİKE: Rezidüel Kürarizasyon (TOFR = ${tofr.toFixed(2)} < 0.90)!`;
      action =
        tofr >= 0.4 && tofr < 0.7
          ? `Kör Nokta Uyarısı! TOFR ${tofr.toFixed(2)} iken gözle/elle TOF’ta 4 eşit yanıt sanılır; DBS_{3,3}’te fade hâlâ hissedilebilir. Ekstübasyon hipoksi ve aspirasyon riskini katlar — antagonizma uygulayıp kantitatif TOFR ≥ 0.90 görün!`
          : tofr >= 0.7
            ? `Sinsi Bölge! TOFR ${tofr.toFixed(2)} düzeyinde hem manuel TOF hem manuel DBS_{3,3} fade’i KAÇIRIR, hasta 5 sn başını bile kaldırabilir ama faringeal kaslar zayıftır! Düşük doz Neostigmin (15–30 mcg/kg) veya Sugammadeks ile TOFR ≥ 0.90’a çıkarın.`
            : `Belirgin yüzeyel blok (TOFR ${tofr.toFixed(2)}). Sugammadeks 2 mg/kg veya Neostigmin 40–50 mcg/kg (+ antikolinerjik) uygulayıp kantitatif TOFR ≥ 0.90 doğrulayın.`;
    }

    return {
      t1,
      t2,
      t3,
      t4,
      tofCount,
      tofr,
      ptc,
      d1,
      d2,
      depthLabel,
      sugammadeksDose,
      neostigminAdvice,
      status,
      headline,
      action,
    };
  }, [agent, occupancy]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* EDITORIAL OPENING HEADER */}
      <header className={`pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Nöromüsküler Monitörizasyon</span>
          <span aria-hidden="true">·</span>
          <span>TOF · PTC · DBS<sub>3,3</sub> · EMG / AMG</span>
          <span aria-hidden="true">·</span>
          <span>ASA 2023 &amp; ESAIC 2023 Kılavuzları</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Periferik Sinir Stimülatörü (TOF, PTC, DBS) ve Kantitatif NMB İzlemi
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Rezidüel nöromüsküler blok (<strong>TOFR &lt; 0.90</strong>), ekstübasyon sonrası üst havayolu kollapsı,
          sessiz aspirasyon ve hipokseminin en önlenebilir nedenidir. <strong>ASA 2023</strong> ve{' '}
          <strong>ESAIC 2023</strong> kılavuzları, kas gevşetici alan her hastada yüz kasları yerine{' '}
          <strong>Adduktor Pollisis’te kantitatif izlem (TOFR ≥ 0.90)</strong> yapılmasını güçlü kanıtla zorunlu kılar.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'pns-01', label: '01. TOF · PTC · DBS Fiziği' },
            { id: 'pns-02', label: '02. Canlı Stimülatör & Antagonizma Lab' },
            { id: 'pns-03', label: '03. Elektrot, Kas Seçimi & EMG/AMG' },
            { id: 'pns-04', label: '04. Kör Nokta, Hipotermi & Tuzaklar' },
            { id: 'pns-05', label: '05. ASA / ESAIC 2023 & Literatür' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-emerald-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. STİMÜLASYON PATERNLERİ VE RESEPTÖR İŞGAL MERDİVENİ                */}
      {/* ===================================================================== */}
      <section id="pns-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. Stimülasyon Paternleri (TOF · PTC · DBS<sub>3,3</sub>) ve Reseptör Güvenlik Marjı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Nöromüsküler kavşak yüksek bir <strong>güvenlik marjına</strong> sahiptir: postsinaptik nikotinik
            reseptörlerin <strong>~%75’i bloke olmadan</strong> tekli kasılma (T<sub>1</sub>) düşmez. Non-depolarizan
            ajanlar presinaptik reseptörleri de bloke edip ACh mobilizasyonunu azalttığından <strong>fade (sönme)</strong>{' '}
            oluşturur; depolarizan Faz I blokta (süksinilkolin) ise <strong>fade görülmez</strong>.
          </p>
        </div>

        {/* Receptor Occupancy Ladder Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { occ: '~%75 Blok', tof: 'T_{4} Kaybolur (TOF 3/4)', tone: 'amber' },
            { occ: '~%80 Blok', tof: 'T_{3} Kaybolur (TOF 2/4)', tone: 'amber' },
            { occ: '~%85–90 Blok', tof: 'T_{2} Kaybolur (TOF 1/4)', tone: 'rose' },
            { occ: '≥ %90–95 Blok', tof: 'T_{1} Kaybolur → PTC’ye Geç!', tone: 'rose' },
          ].map((step) => (
            <div
              key={step.occ}
              className={`rounded-xl border p-3 ${
                step.tone === 'rose'
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-500/35'
                    : 'bg-rose-50/70 border-rose-200'
                  : isDark
                    ? 'bg-amber-950/20 border-amber-500/35'
                    : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{step.occ}</div>
              <div className={`mt-0.5 text-[11px] font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <MedicalText text={step.tof} />
              </div>
            </div>
          ))}
        </div>

        {/* 4 Stimulation Patterns Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Patern</th>
                <th className="py-3 px-4 font-semibold">Elektriksel Protokol</th>
                <th className="py-3 px-4 font-semibold">Kullanım Amacı</th>
                <th className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Klinik Anahtar</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {PATTERN_TABLE.map((row) => (
                <tr key={row.pattern} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <MedicalText text={row.pattern} />
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[200px] font-mono text-[11px]">{row.protocol}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[180px]">
                    <MedicalText text={row.useCase} />
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[230px]">
                    <MedicalText text={row.clinicalKey} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI PERİFERİK SİNİR STİMÜLATÖRÜ & ANTAGONİZMA LABORATUVARI      */}
      {/* ===================================================================== */}
      <section id="pns-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı TOF · PTC · DBS<sub>3,3</sub> ve Antagonizma Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Reseptör blok derinliğini kaydırarak ve <strong>TOF / PTC / DBS<sub>3,3</sub></strong> modları arasında
            geçiş yaparak hangi derinlikte hangi stimülasyonun anlamlı olduğunu ve <strong>ASA/ESAIC 2023</strong>’e göre
            tam <strong>Sugammadeks / Neostigmin</strong> kararını canlı inceleyin.
          </p>
        </div>

        {/* 6 Clinical Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'intense_ptc0', label: 'Yoğun Blok (PTC 0)' },
            { id: 'deep_ptc3', label: 'Derin Blok (TOF 0 · PTC 3)' },
            { id: 'moderate_tof2', label: 'Orta Blok (TOF 2/4)' },
            { id: 'shallow_residual', label: 'Rezidüel Tuzak (TOFR 0.55)' },
            { id: 'safe_extubation', label: 'Güvenli Ekstübasyon (≥ 0.90)' },
            { id: 'sux_phase1', label: 'Süksinilkolin Faz I (Fade Yok)' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as PnsPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : isDark
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT STAGE: 4 Readouts + Interactive Stimulator Screen SVG */}
          <div
            className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-5 ${
              isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            {/* 4 Live Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">TOF Sayısı</div>
                <div className="mt-1 text-2xl font-mono font-bold tabular-nums leading-none text-sky-600 dark:text-sky-400">
                  {sim.tofCount} / 4
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  Reseptör %{occupancy}
                </div>
              </div>

              <div
                className={`p-3 rounded-lg border ${
                  sim.tofr !== null && sim.tofr < 0.9
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  TOFR (T<sub>4</sub>/T<sub>1</sub>)
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.tofr === null
                      ? 'text-slate-400'
                      : sim.tofr >= 0.9
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {sim.tofr !== null ? `%${Math.round(sim.tofr * 100)}` : '—'}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.tofr !== null && sim.tofr >= 0.9 ? 'EKSTÜBE EDİLEBİLİR' : 'Hedef ≥ %90'}
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">PTC Sayısı</div>
                <div className="mt-1 text-2xl font-mono font-bold tabular-nums leading-none text-amber-600 dark:text-amber-400">
                  {sim.tofCount === 0 ? sim.ptc : '—'}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.tofCount === 0 ? (sim.ptc === 0 ? 'Yoğun Blok' : 'Derin Blok') : 'TOF > 0 (Gereksiz)'}
                </div>
              </div>

              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Sugammadeks</div>
                <div className="mt-1 text-xs font-mono font-bold leading-snug text-emerald-600 dark:text-emerald-400">
                  {sim.sugammadeksDose}
                </div>
                <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {sim.depthLabel}
                </div>
              </div>
            </div>

            {/* Mode Switch Bar above Monitor */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'tof', label: 'TOF (2 Hz)' },
                  { id: 'ptc', label: 'PTC (50 Hz + 1 Hz)' },
                  { id: 'dbs', label: 'DBS₃,₃ (50 Hz × 2)' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPattern(m.id as StimPattern)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      pattern === m.id
                        ? isDark
                          ? 'bg-slate-800 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-900 text-white'
                        : isDark
                          ? 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {agent === 'nondepol' ? 'Non-Depolarizan (Fade Var)' : 'Süksinilkolin Faz I (Fade Yok)'}
              </span>
            </div>

            {/* Interactive Quantitative NMB Monitor SVG */}
            <svg
              viewBox="0 0 560 198"
              className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
              role="img"
              aria-label="Canlı TOF, PTC ve DBS periferik sinir stimülatörü yanıt ekranı"
            >
              {/* Baseline grid */}
              <line x1="36" y1="158" x2="536" y2="158" stroke="#334155" strokeWidth="1.2" />
              <line x1="36" y1="38" x2="536" y2="38" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="36" y1="98" x2="536" y2="98" stroke="#1e293b" strokeDasharray="4 4" strokeWidth="1" />
              <text x="12" y="42" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">100%</text>
              <text x="16" y="102" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">50%</text>
              <text x="20" y="161" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">0%</text>

              {pattern === 'tof' && (
                <>
                  <text x="286" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#38bdf8">
                    TRAIN-OF-FOUR (2 Hz · 0.5 sn Aralıklı 4 Supramaksimal Uyarı)
                  </text>
                  {[
                    { label: '1', val: sim.t1, x: 110 },
                    { label: '2', val: sim.t2, x: 225 },
                    { label: '3', val: sim.t3, x: 340 },
                    { label: '4', val: sim.t4, x: 455 },
                  ].map((bar) => {
                    const h = (bar.val / 100) * 120;
                    const fill =
                      bar.val === 0
                        ? '#334155'
                        : sim.tofr !== null && sim.tofr >= 0.9
                          ? '#10b981'
                          : sim.tofr !== null && sim.tofr < 0.9
                            ? '#fb7185'
                            : '#f59e0b';
                    return (
                      <g key={bar.label}>
                        <rect x={bar.x - 22} y={158 - h} width="44" height={Math.max(2, h)} rx="4" fill={fill} fillOpacity="0.85" />
                        <text x={bar.x} y={158 - h - 6} textAnchor="middle" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill={fill}>
                          %{bar.val}
                        </text>
                        <text x={bar.x} y="174" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#cbd5e1">
                          T<tspan dy="2" fontSize="7.5">{bar.label}</tspan>
                        </text>
                      </g>
                    );
                  })}
                  <text x="286" y="190" textAnchor="middle" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                    {sim.tofr !== null
                      ? `Kantitatif TOFR = T₄ / T₁ = ${sim.tofr.toFixed(2)} (${sim.tofr >= 0.9 ? 'GÜVENLİ ≥ 0.90' : 'REZİDÜEL BLOK < 0.90!'})`
                      : `TOF Sayısı = ${sim.tofCount}/4 · TOFR hesaplamak için 4 yanıt gereklidir`}
                  </text>
                </>
              )}

              {pattern === 'ptc' && (
                <>
                  <text x="286" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#f59e0b">
                    POST-TETANİK SAYIM (50 Hz × 5 sn Tetani → 3 sn Ara → 1 Hz Tekli Uyarılar)
                  </text>
                  {/* 50 Hz Tetanic Block */}
                  <rect x="46" y="64" width="110" height="94" rx="4" fill="#6366f1" fillOpacity="0.22" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="101" y="106" textAnchor="middle" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#a5b4fc">
                    50 Hz × 5 sn
                  </text>
                  <text x="101" y="120" textAnchor="middle" fontSize="8" fill="#94a3b8">
                    ACh Mobilizasyonu
                  </text>

                  {/* 3s Pause */}
                  <text x="184" y="114" textAnchor="middle" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#64748b">
                    3 sn
                  </text>

                  {/* 15 Post-Tetanic 1 Hz Twitches */}
                  {Array.from({ length: 15 }, (_, idx) => {
                    const active = idx < sim.ptc;
                    const x = 216 + idx * 21;
                    const decayH = active ? Math.max(16, 98 - idx * 5.2) : 3;
                    return (
                      <rect
                        key={idx}
                        x={x}
                        y={158 - decayH}
                        width="11"
                        height={decayH}
                        rx="2"
                        fill={active ? '#f59e0b' : '#1e293b'}
                      />
                    );
                  })}

                  <text x="286" y="182" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#fbbf24">
                    {sim.tofCount > 0
                      ? `TOF = ${sim.tofCount}/4 (Zaten > 0 — PTC yalnızca TOF = 0 derin blokta kullanılır)`
                      : `PTC = ${sim.ptc} · ${sim.ptc === 0 ? 'Yoğun Blok (Sugammadeks yalnızca acil 16 mg/kg)' : 'Derin Blok (Sugammadeks 4 mg/kg ile döndürülebilir)'}`}
                  </text>
                </>
              )}

              {pattern === 'dbs' && (
                <>
                  <text x="286" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#a78bfa">
                    DOUBLE BURST STIMULATION (DBS₃,₃ · 3 Puls + 750 ms + 3 Puls)
                  </text>
                  {/* Burst 1 */}
                  <rect
                    x="130"
                    y={158 - (sim.d1 / 100) * 120}
                    width="74"
                    height={Math.max(3, (sim.d1 / 100) * 120)}
                    rx="5"
                    fill="#38bdf8"
                    fillOpacity="0.85"
                  />
                  <text x="167" y="175" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#cbd5e1">
                    1. Patlama (D<tspan dy="2" fontSize="7.5">1</tspan><tspan dy="-2"> · %{sim.d1})</tspan>
                  </text>

                  {/* 750 ms interval arrow */}
                  <line x1="224" y1="108" x2="334" y2="108" stroke="#64748b" strokeDasharray="3 3" strokeWidth="1.4" />
                  <text x="279" y="100" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                    750 ms
                  </text>

                  {/* Burst 2 */}
                  <rect
                    x="354"
                    y={158 - (sim.d2 / 100) * 120}
                    width="74"
                    height={Math.max(3, (sim.d2 / 100) * 120)}
                    rx="5"
                    fill={sim.d2 < sim.d1 * 0.85 ? '#fb7185' : '#10b981'}
                    fillOpacity="0.85"
                  />
                  <text x="391" y="175" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#cbd5e1">
                    2. Patlama (D<tspan dy="2" fontSize="7.5">2</tspan><tspan dy="-2"> · %{sim.d2})</tspan>
                  </text>

                  <text x="286" y="191" textAnchor="middle" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#c4b5fd">
                    {sim.tofr !== null && sim.tofr >= 0.7 && sim.tofr < 0.9
                      ? 'KRİTİK: TOFR 0.70–0.89 arasında DBS₃,₃ bile elle fade’i KAÇIRIR — Kantitatif monitör şart!'
                      : sim.tofr !== null && sim.tofr >= 0.4 && sim.tofr < 0.7
                        ? 'Manuel TOF’ta kaçırılan fade, DBS₃,₃’te D₂ < D₁ olarak elle hissedilebilir!'
                        : 'DBS₃,₃ manuel taktil değerlendirmeyi iyileştirir ancak kantitatif TOFR ≥ 0.90 yerine geçmez.'}
                  </text>
                </>
              )}
            </svg>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className={`rounded-xl border p-4 space-y-3.5 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Sliders className="w-4 h-4 text-emerald-500" />
                <span>Nöromüsküler Blok Kontrolleri</span>
              </div>

              {/* Agent Switch */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setAgent('nondepol')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    agent === 'nondepol'
                      ? isDark
                        ? 'bg-slate-800 border-emerald-500 text-white'
                        : 'bg-slate-900 border-slate-900 text-white'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Non-Depolarizan
                </button>
                <button
                  type="button"
                  onClick={() => setAgent('succinylcholine')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    agent === 'succinylcholine'
                      ? isDark
                        ? 'bg-slate-800 border-amber-500 text-white'
                        : 'bg-slate-900 border-slate-900 text-white'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Süksinilkolin (Faz I)
                </button>
              </div>

              {/* Receptor Occupancy Slider */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pns-occ" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    nAChR Reseptör Blokajı
                  </label>
                  <span className="font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                    %{occupancy}
                  </span>
                </div>
                <input
                  id="pns-occ"
                  type="range"
                  min={15}
                  max={100}
                  step={1}
                  value={occupancy}
                  onChange={(e) => setOccupancy(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span>Derlenme (%15)</span>
                  <span>%75 (T₄ ↓)</span>
                  <span>Tam (%100)</span>
                </div>
              </div>

              {/* Quick Antagonism Comparison Box */}
              <div
                className={`rounded-lg border p-3 space-y-1.5 text-[11px] ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 dark:text-slate-400">Sugammadeks:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-right">
                    {sim.sugammadeksDose}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 dark:text-slate-400">Neostigmin:</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-right">
                    {sim.neostigminAdvice}
                  </span>
                </div>
              </div>
            </div>

            {/* Dual-Coded Clinical Action Box */}
            <div
              className={`rounded-xl border p-4 text-xs leading-relaxed space-y-2 ${
                sim.status === 'optimal'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : sim.status === 'critical'
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {sim.status === 'optimal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : sim.status === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{sim.headline}</span>
              </div>
              <p>
                <MedicalText text={sim.action} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 03. ELEKTROT YERLEŞİMİ, KAS SEÇİMİ VE SENSÖR TEKNOLOJİLERİ            */}
      {/* ===================================================================== */}
      <section id="pns-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. Elektrot Yerleşimi, Neden Adduktor Pollisis? ve EMG vs. AMG
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <strong>ASA 2023’ün en kritik uyarısı:</strong> Göz çevresi kasları (orbikularis okuli / korrugator
            süpersilii) bloktan <strong>erken döner</strong>; yüz izlemi ekstübasyon sonrası rezidüel blok riskini{' '}
            <strong>5 kat artırır</strong>! Güvenli ekstübasyon için mutlaka <strong>Ulnar Sinir → Adduktor Pollisis</strong>{' '}
            (başparmak) izlenmelidir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Ulnar Nerve Electrode Placement SVG */}
          <div
            className={`lg:col-span-5 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <svg
              viewBox="0 0 380 198"
              className="w-full h-auto"
              role="img"
              aria-label="Ulnar sinir adduktor pollisis siyah distal kırmızı proksimal elektrot yerleşimi"
            >
              <text x="190" y="18" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                Ulnar Sinir · Adduktor Pollisis Yerleşimi (Altın Standart)
              </text>

              {/* Forearm + Wrist + Hand silhouette */}
              <path
                d="M 28 78 L 210 78 Q 238 78, 255 62 L 290 42 Q 304 38, 302 54 L 274 84 L 344 82 Q 354 88, 344 96 L 284 102 L 342 110 Q 350 118, 338 124 L 278 122 L 212 134 L 28 134 Z"
                fill={isDark ? '#1e293b' : '#f1f5f9'}
                stroke={isDark ? '#475569' : '#94a3b8'}
                strokeWidth="1.8"
              />

              {/* Ulnar Nerve Course (lower/ulnar border) */}
              <line x1="36" y1="120" x2="250" y2="120" stroke="#f59e0b" strokeWidth="2.4" strokeDasharray="5 3" />
              <text x="72" y="148" fontSize="8.5" fontWeight="700" fill="#f59e0b">Ulnar Sinir Trasesi</text>

              {/* Proximal Electrode: RED (+) */}
              <circle cx="132" cy="120" r="11" fill="#ef4444" stroke="#ffffff" strokeWidth="1.6" />
              <text x="132" y="123" textAnchor="middle" fontSize="9" fontWeight="700" fill="#ffffff">+</text>
              <text x="132" y="64" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#f87171">Kırmızı (+) Proksimal</text>
              <line x1="132" y1="70" x2="132" y2="108" stroke="#f87171" strokeWidth="1" strokeDasharray="2 2" />

              {/* Distal Electrode: BLACK (-) */}
              <circle cx="192" cy="120" r="11" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.8" />
              <text x="192" y="123" textAnchor="middle" fontSize="10" fontWeight="700" fill="#38bdf8">−</text>
              <text x="206" y="46" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#38bdf8">Siyah (−) DİSTAL</text>
              <text x="206" y="57" textAnchor="middle" fontSize="7.5" fill={isDark ? '#94a3b8' : '#64748b'}>(Bilek +1 cm · 2–3 cm ara)</text>
              <line x1="192" y1="62" x2="192" y2="108" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />

              {/* Adductor Pollicis Sensor on Thumb */}
              <circle cx="290" cy="52" r="8" fill="#10b981" fillOpacity="0.35" stroke="#10b981" strokeWidth="1.8" />
              <text x="322" y="34" textAnchor="middle" fontSize="8" fontWeight="700" fill="#10b981">Başparmak (AP)</text>

              <text x="190" y="182" textAnchor="middle" fontSize="8.5" fontWeight="600" fill={isDark ? '#cbd5e1' : '#334155'}>
                Kural: Siyah (Katot −) Distalde · AMG’de başparmak TAMAMEN serbest olmalı!
              </text>
            </svg>
          </div>

          {/* Muscle Sensitivity Hierarchy */}
          <div className="lg:col-span-7 space-y-3">
            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="text-xs font-bold text-rose-700 dark:text-rose-300">
                Dirençli / Erken Dönen Kaslar (YÜZDEN EKSTÜBASYON KARARI VERME!)
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Diyafram, Laringeal Adduktorlar, Korrugator Süpersilii (Kaş) ve Orbikularis Okuli (Göz):</strong>{' '}
                Blok başlangıcı hızlıdır (entübasyon zamanlamasını iyi gösterir), ancak derlenme erken olur. Yüzde TOF
                4/4 görünürken hastanın faringeal kasları ve başparmağı hâlâ ciddi rezidüel blokta olabilir!
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-emerald-950/20 border-emerald-500/35' : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Hassas / En Geç Dönen Kaslar (EKSTÜBASYON GÜVENLİK REFERANSI)
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Faringeal / Üst Havayolu Kasları ve Adduktor Pollisis (Başparmak):</strong> En son derlenen
                kaslardır. Adduktor pollisiste kantitatif <strong>TOFR ≥ 0.90</strong> sağlandığında faringeal yutma,
                öksürük ve havayolu koruma reflekslerinin de güvenli biçimde döndüğü doğrulanır.
              </p>
            </div>
          </div>
        </div>

        {/* Sensor Comparison Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Teknoloji</th>
                <th className="py-3 px-4 font-semibold">Ölçüm Prensibi</th>
                <th className="py-3 px-4 font-semibold text-emerald-600 dark:text-emerald-400">Avantajlar</th>
                <th className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">Kısıtlılıklar &amp; Tuzaklar</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {SENSOR_TABLE.map((row) => (
                <tr key={row.tech} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.tech}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[200px]">{row.principle}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[190px]">{row.pros}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[210px]">{row.cons}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. SIK HATALAR, KÖR NOKTA VE TEKNİK TUZAKLAR                         */}
      {/* ===================================================================== */}
      <section id="pns-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. Klinik Tuzaklar: Kalitatif Kör Nokta, Direkt Kas Uyarımı ve Hipotermi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. Kalitatif Kör Nokta (TOFR 0.40 – 0.89)',
              body: 'Deneyimli klinisyenler bile göz/el ile TOF’ta TOFR > 0.40’ta, DBS₃,₃’te ise TOFR > 0.60–0.70’te fade’i algılayamaz. 5 saniye baş kaldırma veya güçlü el sıkma testleri TOFR 0.50’de bile başarılabilir ve rezidüel bloğu dışlamaz.',
            },
            {
              title: '2. Direkt Kas Uyarımı (Direct Muscle Stimulation)',
              body: 'Elektrotlar sinir trasesi yerine doğrudan kas gövdesine (özellikle yüz/göz veya tenar bölge) yerleştirilirse elektrik akımı nöromüsküler kavşağı atlayıp kası doğrudan kasar — derin blokta bile sahte kasılma görülür!',
            },
            {
              title: '3. Soğuk Ekstremite (< 32 °C El Cildi)',
              body: 'İzlenen elin cilt ısısı 32 °C’nin altına düştüğünde sinir ileti hızı ve kas kontraktilitesi azalır; twitch amplitüdü ve TOFR yapay olarak düşük okunabilir. İzlenen kolu mutlaka sıcak tutun.',
            },
            {
              title: '4. Supramaksimal Kalibrasyon Zamanlaması',
              body: 'Supramaksimal akım (tipik 40–60 mA, 0.2 ms puls) mutlaka anestezi indüksiyonundan SONRA, ancak kas gevşetici VERMEDEN ÖNCE kalibre edilmelidir. Uyanık hastada 50–60 mA uyarı şiddetli ağrı yaratır.',
            },
          ].map((pitfall) => (
            <div
              key={pitfall.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>{pitfall.title}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{pitfall.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. ASA 2023 & ESAIC 2023 ÖZETİ VE PUBMED KAYNAKLARI                  */}
      {/* ===================================================================== */}
      <section id="pns-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. ASA 2023 &amp; ESAIC 2023 Kılavuz Sentezi ve Akademik Kaynaklar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              title: 'ASA 2023 Güçlü Önerileri (Thilen · Anesthesiology)',
              body: 'NMB alan her hastada yalnızca klinik testler yerine kantitatif monitörizasyon (Adduktor Pollisis) kullanın; ekstübasyon öncesi TOFR ≥ 0.90 doğrulayın; göz kası izleminden kaçının; derin/orta/yüzeyel roküronyum-veküronyum bloğunda Sugammadeks’i neostigmine tercih edin.',
            },
            {
              title: 'ESAIC 2023 Güçlü Önerileri (Fuchs-Buder · EJA)',
              body: 'Kantitatif ulnar-adduktor pollisis izlemi zorunludur (kalibresiz AMG’de hedef ≥ 1.00). Derin blokta (PTC ≥ 1–2) Sugammadeks 4 mg/kg, orta blokta (TOF ≥ 2) 2 mg/kg; neostigmin yalnızca TOF 4/4 (veya en azından ileri spontan derlenme) sonrası kullanılmalıdır.',
            },
          ].map((g) => (
            <div
              key={g.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{g.title}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{g.body}</p>
            </div>
          ))}
        </div>

        <div
          className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
            isDark
              ? 'bg-slate-900/60 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>Yatak Başı 3 Altın Kural:</strong>{' '}
            (1) <strong className="font-mono">Adduktor Pollisis (Siyah Distal)</strong> — yüzden ekstübasyon kararı
            verme, (2) Ekstübasyon için <strong className="font-mono">Kantitatif TOFR ≥ 0.90</strong> (kalibresiz AMG ≥
            1.00), (3) <strong className="font-mono">TOF 0 + PTC ≥ 1 → Sugammadeks 4 mg/kg · TOF ≥ 2 → 2 mg/kg</strong>.
          </div>
        </div>

        {/* Verified PubMed References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/60 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Temel Akademik Kaynaklar (PubMed Doğrulamalı)</span>
          </div>
          <ol className="space-y-2 text-xs">
            {REFERENCES.map((ref, idx) => (
              <li
                key={ref.pmid}
                className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span>
                  <span className="font-mono text-slate-400 mr-1.5">{idx + 1}.</span>
                  <strong>{ref.authors}</strong> {ref.title}{' '}
                  <em className="text-slate-500 dark:text-slate-400">{ref.journal}</em>
                </span>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0"
                >
                  <span>PMID: {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};
