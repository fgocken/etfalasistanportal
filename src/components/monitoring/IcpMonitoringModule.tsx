import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';

interface IcpMonitoringModuleProps {
  isDark: boolean;
}

type IcpPresetId =
  | 'normal_compliance'
  | 'early_p2_elevation'
  | 'hypercapnia'
  | 'severe_ich'
  | 'head_flat'
  | 'low_cpp_hypotension';

const DEVICE_COMPARE = [
  {
    method: 'EVD (Eksternal Ventriküler Drenaj)',
    accuracy: 'Altın Standart (Sıfırlanabilir · Global ICP)',
    drainage: 'Evet (Terapötik BOS drenajı sağlar!)',
    risks: 'Enfeksiyon (%5–10), hemoraji (%1–2), dar/kollabe ventrikülde yerleştirme zorluğu',
    notes: 'Foramen Monro (Tragus) hizasından sıfırlanır. Sıvı dolu klasik hatta doğru ölçüm için drenaj kısa süreli kapatılmalıdır.',
  },
  {
    method: 'İntraparankimal Prob (Codman / Camino)',
    accuracy: 'Çok Yüksek (Kateter ucu transdüser)',
    drainage: 'Hayır (BOS boşaltamaz)',
    risks: 'Düşük enfeksiyon (< %1–2) & kanama; yerleştirildikten sonra yeniden sıfırlanamaz (~1–2 mmHg/gün drift)',
    notes: 'Şişmiş beyinde / silinmiş ventriküllerde hızlı yerleştirilir; bölgesel parankimal basıncı sürekli okur.',
  },
  {
    method: 'Subdural / Epidural Sensör',
    accuracy: 'Orta–Düşük (Gerçek ICP’yi olduğundan düşük/farklı okuyabilir)',
    drainage: 'Hayır',
    risks: 'En düşük parankim hasarı, ancak güvenilirlik ve dalga kalitesi sınırlı',
    notes: 'Koagülopati veya sadece kaba trend izlemi gereken seçilmiş durumlarda tercih edilir.',
  },
  {
    method: 'Non-İnvaziv (ONSD USG & TCD)',
    accuracy: 'Tarama / Trend Aracı (Kesin mmHg vermez)',
    drainage: 'Hayır',
    risks: 'İnvaziv risk yok; uygulayıcı bağımlı',
    notes: 'Optik sinir kılıfı çapı (ONSD) > 5.0–5.5 mm (globun 3 mm arkası) veya TCD Pulsatilite İndeksi (PI) > 1.4 artmış ICP’yi düşündürür.',
  },
];

const SIBICC_TIERS = [
  {
    tier: 'Tier 0 · Temel Nörokoruma',
    tone: 'emerald',
    items: [
      'Baş 30° elevasyon, boyun nötral hatta (servikal yakalık jugüler veni sıkmamalı).',
      'Normotermi (< 37.5 °C — ateş her 1 °C’de CMRO_{2} ve CBF’yi artırır), normoglisemi, SpO_{2} ≥ %94.',
      'Normokapni (PaCO_{2} 35–38 mmHg), Hb > 7–9 g/dL, antiepileptik profilaksi, CPP 60–70 mmHg.',
    ],
  },
  {
    tier: 'Tier 1 · İlk Basamak (ICP > 22 mmHg)',
    tone: 'sky',
    items: [
      'Analjezi ve sedasyonu derinleştir (Propofol + Opioid · ağrı/öksürük/asenkroniyi kes).',
      'EVD mevcutsa kontrollü BOS drenajı (genellikle 5–10 mL aralıklı veya seviye ayarlı).',
      'Osmoterapi: Mannitol 0.25–1 g/kg IV veya Hipertonik Salin (%3 / %23.4 · hedef Na^{+} < 155–160 mEq/L).',
      'Kısa süreli hafif hiperventilasyon (PaCO_{2} 32–35 mmHg).',
    ],
  },
  {
    tier: 'Tier 2 · İkinci Basamak (Dirençli ICP)',
    tone: 'amber',
    items: [
      'Kısa süreli kas gevşetici (NMB) denemesi — yanıt alınırsa infüzyon değerlendirilir.',
      'MAP Challenge (Otoregülasyon testi): MAP +10 mmHg yükseltilir; ICP düşüyorsa otoregülasyon sağlamdır → daha yüksek CPP hedeflenebilir.',
      'Hafif hiperventilasyonun dikkatli optimizasyonu (PbtO_{2}/SjvO_{2} rehberliğinde).',
    ],
  },
  {
    tier: 'Tier 3 · Kurtarma (Refrakter ICP)',
    tone: 'rose',
    items: [
      'Sekonder Dekompresif Kraniektomi (nöroşirürji konsültasyonu).',
      'Barbitürat Koması (tiyopental/pentobarbital ile EEG burst-suppression; ciddi hipotansiyon riski!).',
      'Hafif terapötik hipotermi (35–36 °C). Travmatik beyin hasarında kortikosteroid KONTRENDİKEDİR (CRASH)!',
    ],
  },
];

const REFERENCES = [
  {
    authors: 'Czosnyka M, Pickard JD.',
    title: 'Monitoring and interpretation of intracranial pressure.',
    journal: 'J Neurol Neurosurg Psychiatry. 2004;75(6):813–821.',
    pmid: '15145991',
  },
  {
    authors: 'Chesnut RM, Temkin N, Carney N, et al. (BEST:TRIP Trial).',
    title: 'A trial of intracranial-pressure monitoring in traumatic brain injury.',
    journal: 'N Engl J Med. 2012;367(26):2471–2481.',
    pmid: '23240909',
  },
  {
    authors: 'Le Roux P, Menon DK, Citerio G, et al. (NCS / ESICM).',
    title: 'Consensus summary statement of the International Multidisciplinary Consensus Conference on Multimodality Monitoring in Neurocritical Care.',
    journal: 'Intensive Care Med. 2014;40(9):1189–1209.',
    pmid: '25208678',
  },
  {
    authors: 'Carney N, Totten AM, O’Reilly C, et al. (Brain Trauma Foundation 4th Ed).',
    title: 'Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition.',
    journal: 'Neurosurgery. 2017;80(1):6–15.',
    pmid: '27654000',
  },
  {
    authors: 'Hawryluk GWJ, Aguilera S, Buki A, et al. (SIBICC).',
    title: 'A management algorithm for patients with intracranial pressure monitoring: the Seattle International Severe Traumatic Brain Injury Consensus Conference.',
    journal: 'Intensive Care Med. 2019;45(12):1783–1794.',
    pmid: '31659383',
  },
];

export const IcpMonitoringModule: React.FC<IcpMonitoringModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<IcpPresetId>('normal_compliance');
  const [massLoad, setMassLoad] = useState<number>(28); // 0..100 % intracranial volume load
  const [mapMmHg, setMapMmHg] = useState<number>(82); // 55..115 mmHg
  const [paco2, setPaco2] = useState<number>(37); // 25..55 mmHg
  const [headElev30, setHeadElev30] = useState<boolean>(true);
  const [evdOpen, setEvdOpen] = useState<boolean>(false);

  const applyPreset = (preset: IcpPresetId) => {
    setActivePreset(preset);
    if (preset === 'normal_compliance') {
      setMassLoad(28);
      setMapMmHg(82);
      setPaco2(37);
      setHeadElev30(true);
      setEvdOpen(false);
    } else if (preset === 'early_p2_elevation') {
      setMassLoad(62);
      setMapMmHg(85);
      setPaco2(37);
      setHeadElev30(true);
      setEvdOpen(false);
    } else if (preset === 'hypercapnia') {
      setMassLoad(55);
      setMapMmHg(86);
      setPaco2(52);
      setHeadElev30(true);
      setEvdOpen(false);
    } else if (preset === 'severe_ich') {
      setMassLoad(86);
      setMapMmHg(84);
      setPaco2(39);
      setHeadElev30(true);
      setEvdOpen(false);
    } else if (preset === 'head_flat') {
      setMassLoad(60);
      setMapMmHg(84);
      setPaco2(38);
      setHeadElev30(false);
      setEvdOpen(false);
    } else if (preset === 'low_cpp_hypotension') {
      setMassLoad(58);
      setMapMmHg(62);
      setPaco2(37);
      setHeadElev30(true);
      setEvdOpen(false);
    }
  };

  // Physiological Monro–Kellie Elastance, CPP & P1/P2/P3 Waveform Model
  const sim = useMemo(() => {
    // Effective intracranial volume index (0..115)
    let effVol = massLoad;
    // PaCO2 modifies cerebral blood volume (CBV) roughly linear between 25 and 55 mmHg
    effVol += (paco2 - 37) * 1.15;
    // Flat head impairs jugular venous drainage
    if (!headElev30) effVol += 14;
    // EVD drainage removes CSF volume, shifting left on Monro-Kellie curve
    if (evdOpen) effVol -= 22;

    const clampedVol = Math.max(5, Math.min(108, effVol));

    // Exponential Monro–Kellie Pressure-Volume Curve: ICP = 6 + 2.4 * exp(0.0255 * V)
    const rawIcp = 5.5 + 1.95 * Math.exp(0.0295 * clampedVol);
    const icp = Math.max(4, Math.min(58, Math.round(rawIcp)));
    const cpp = mapMmHg - icp;

    // P2/P1 compliance ratio increases sharply once passing ~52% volume load (knee of curve)
    const p2OverP1 = Number(
      Math.max(0.55, Math.min(1.85, 0.58 + Math.pow(clampedVol / 78, 2.3) * 0.72)).toFixed(2)
    );
    const complianceLost = p2OverP1 >= 1.0;

    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = 'Normal İntrakraniyal Kompliyans & Perfüzyon (P_{1} > P_{2} > P_{3})';
    let action = `ICP (${icp} mmHg) normal sınırda, CPP (${cpp} mmHg) 60–70 mmHg hedef aralığında ve P_{2}/P_{1} oranı (${p2OverP1}) kompliyans rezervinin korunduğunu gösteriyor. Tier 0 nörokorumayı sürdürün.`;

    if (icp > 22 && cpp < 60) {
      status = 'critical';
      headline = `KRİTİK ACİL: İntrakraniyal Hipertansiyon (ICP ${icp}) + Serebral İskemi (CPP ${cpp} mmHg)!`;
      action = `BTF tedavi eşiği (> 22 mmHg) aşıldı ve CPP < 60 mmHg ile beyin hipoperfüze! Derhal SIBICC Tier 1 başlatın: Baş 30° nötral, EVD drenajı açın, %3/%23.4 Hipertonik Salin veya Mannitol verin, sedasyonu derinleştirin ve vazopresörle MAP’ı yükseltip CPP’yi 60–70 mmHg’ye çekin.`;
    } else if (icp > 22) {
      status = 'critical';
      headline = `Kırmızı Bayrak: Artmış ICP (${icp} mmHg > 22) · Kompliyans Tükendi (P_{2}/P_{1} = ${p2OverP1})`;
      action = !headElev30
        ? `Başın 0° düz olması jugüler venöz drenajı tıkıyor! Önce başı 30° nötral hatta yükseltin, boyunluğu gevşetin; ardından PaCO_{2}’yi 35 mmHg’ye getirin, EVD drenajı veya osmoterapi (Hipertonik Salin / Mannitol) uygulayın.`
        : paco2 >= 45
          ? `Hiperkapni (PaCO_{2} ${paco2} mmHg) serebral vazodilatasyonla kan hacmini (CBV) büyütüyor ve ICP’yi ${icp} mmHg’ye fırlatıyor! Dakika ventilasyonunu artırarak PaCO_{2}’yi 35–38 mmHg’ye çekin.`
          : `Beyin Monro–Kellie eğrisinin dik kolunda (P_{2} > P_{1}). SIBICC Tier 1 uygulayın: Sedasyon/analjezi derinleştirme, EVD BOS drenajı, Mannitol/Hipertonik Salin ve gerekirse kısa süreli PaCO_{2} 32–35 mmHg.`;
    } else if (cpp < 60) {
      status = 'critical';
      headline = `Serebral Hipoperfüzyon Tehlikesi! (CPP = ${cpp} mmHg < 60)`;
      action = `ICP (${icp} mmHg) tek başına 22 mmHg’nin altında olsa da düşük MAP (${mapMmHg} mmHg) nedeniyle CPP ${cpp} mmHg’ye düştü! Sekonder iskemik hasarı önlemek için noradrenalin/sıvı ile MAP’ı yükseltip CPP’yi 60–70 mmHg bandına çıkarın.`;
    } else if (paco2 < 30) {
      status = 'warning';
      headline = `Derin Hipokapni İskemisi Uyarısı (PaCO_{2} ${paco2} mmHg < 30)`;
      action = `Agresif hiperventilasyon serebral vazokonstriksiyonla ICP’yi geçici düşürse de serebral kan akımını (CBF) tehlikeli biçimde azaltarak fokal iskemi yaratır! Herniasyon kurtarma dışında PaCO_{2} < 30 mmHg’den kaçının.`;
    } else if (complianceLost) {
      status = 'warning';
      headline = `Sessiz Uyarı: ICP Hâlâ ${icp} mmHg Ama P_{2} > P_{1} (${p2OverP1}) — Kırılma Noktası!`;
      action = `Yalnızca sayısal ICP’ye bakan klinisyen bu tehlikeyi kaçırır! P_{2} dalgasının P_{1}’i aşması kompliyans rezervinin bittiğini gösterir: en küçük öksürük, aspirasyon, ateş veya CO_{2} artışı ICP’yi aniden > 35 mmHg’ye fırlatacaktır. Önleyici sedasyon, baş 30° ve normokapni sağlayın.`;
    } else if (!headElev30) {
      status = 'warning';
      headline = `Venöz Drenaj Engeli: Baş 0° Düz Pozisyonda (ICP ${icp} mmHg)`;
      action = 'Başı 30° nötral hatta yükseltmek serebral venöz dönüşü kolaylaştırarak ICP’yi ek ilaçsız 4–8 mmHg düşürür.';
    }

    return {
      clampedVol,
      icp,
      cpp,
      p2OverP1,
      complianceLost,
      status,
      headline,
      action,
    };
  }, [massLoad, mapMmHg, paco2, headElev30, evdOpen]);

  // SVG Generators: Panel A (P1/P2/P3 Waveform) + Panel B (Monro-Kellie Curve)
  const graphics = useMemo(() => {
    // Panel A: 2 cardiac cycles of ICP pulse wave (x: 24..264, y: 158..28)
    const pts: string[] = [];
    const steps = 140;
    // Pulse amplitude grows as compliance drops!
    const pulseAmp = 14 + Math.max(0, sim.p2OverP1 - 0.55) * 32;
    const baseY = 142 - Math.min(52, (sim.icp - 5) * 1.15);

    const p1Weight = 1.0;
    const p2Weight = sim.p2OverP1;
    const p3Weight = 0.45 + Math.max(0, sim.p2OverP1 - 0.7) * 0.25;
    const maxWeight = Math.max(p1Weight, p2Weight);

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const x = 22 + u * 246;
      const cyc = (u * 2) % 1;
      // 3 Gaussian peaks per cardiac cycle: P1 (0.18), P2 (0.37), P3 (0.58)
      const p1 = Math.exp(-Math.pow((cyc - 0.19) / 0.065, 2)) * (p1Weight / maxWeight);
      const p2 = Math.exp(-Math.pow((cyc - 0.38) / 0.085, 2)) * (p2Weight / maxWeight);
      const p3 = Math.exp(-Math.pow((cyc - 0.60) / 0.095, 2)) * (p3Weight / maxWeight);
      const val = (p1 + p2 + p3) * 0.85;
      const y = Math.max(24, Math.min(156, baseY - val * pulseAmp));
      pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    // Peak label positions on first cycle (u = 0..0.5)
    const p1X = 22 + (0.19 / 2) * 246;
    const p2X = 22 + (0.38 / 2) * 246;
    const p3X = 22 + (0.60 / 2) * 246;
    const p1Y = Math.max(24, baseY - (p1Weight / maxWeight) * 0.9 * pulseAmp);
    const p2Y = Math.max(24, baseY - (p2Weight / maxWeight) * 0.92 * pulseAmp);
    const p3Y = Math.max(24, baseY - (p3Weight / maxWeight) * 0.9 * pulseAmp);

    // Panel B: Monro-Kellie exponential curve (x: 318..538, y: 158..28)
    const mkPts: string[] = [];
    for (let v = 0; v <= 108; v += 3) {
      const x = 318 + (v / 108) * 218;
      const icpV = 5.5 + 1.95 * Math.exp(0.0295 * v);
      const y = 158 - (Math.min(55, icpV) / 55) * 126;
      mkPts.push(`${v === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }

    const dotX = 318 + (sim.clampedVol / 108) * 218;
    const dotY = 158 - (Math.min(55, sim.icp) / 55) * 126;
    const threshold22Y = 158 - (22 / 55) * 126;

    return {
      wavePath: pts.join(' '),
      p1X,
      p1Y,
      p2X,
      p2Y,
      p3X,
      p3Y,
      mkPath: mkPts.join(' '),
      dotX,
      dotY,
      threshold22Y,
    };
  }, [sim.clampedVol, sim.icp, sim.p2OverP1]);

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
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Nöroanestezi &amp; Nöroyoğun Bakım</span>
          <span aria-hidden="true">·</span>
          <span>Monro–Kellie &amp; CPP = MAP − ICP</span>
          <span aria-hidden="true">·</span>
          <span>BTF 4. Ed &amp; SIBICC 2019</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          İntrakraniyal Basınç (ICP) Monitörizasyonu
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Sert kafatası içindeki beyin, BOS ve kan hacmi dengesini (<strong>Monro–Kellie doktrini</strong>) ve gerçek
          serebral perfüzyonu (<strong>CPP = MAP − ICP</strong>) izlemek sekonder iskemik beyin hasarını önlemenin
          temelidir. Yalnızca sayısal ICP değil, <strong>P<sub>1</sub>–P<sub>2</sub>–P<sub>3</sub> dalga morfolojisi</strong>{' '}
          (kompliyans) ve <strong>tragus hizasından sıfırlama</strong> klinik kararı belirler.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'icp-01', label: '01. Monro–Kellie & CPP' },
            { id: 'icp-02', label: '02. Canlı P₁/P₂/P₃ & Kompliyans Lab' },
            { id: 'icp-03', label: '03. EVD vs. Prob & Sıfırlama' },
            { id: 'icp-04', label: '04. SIBICC Tier 0–3 & Anestezikler' },
            { id: 'icp-05', label: '05. BEST:TRIP, PRx & Literatür' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-indigo-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. MONRO–KELLIE, CPP VE TEMEL HEDEFLER                               */}
      {/* ===================================================================== */}
      <section id="icp-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. Monro–Kellie Doktrini, Serebral Perfüzyon Basıncı (CPP) ve Hedefler
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Erişkin kafatası sabit hacimli (~1.400–1.500 mL) rijit bir kutudur: <strong>Beyin parankimi (%80)</strong>,{' '}
            <strong>BOS (%10)</strong> ve <strong>İntrakraniyal kan (%10)</strong>. Bir bileşen arttığında (hematom,
            ödem, tümör), BOS ve venöz kan dışarı itilerek ICP bir süre yatay tutulur; rezerv tükendiğinde ICP üstel
            olarak fırlayarak herniasyona ve serebral iskemiye yol açar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              formula: 'Normal ICP: 5 – 15 mmHg',
              target: 'BTF Tedavi Eşiği: > 22 mmHg',
              title: 'İntrakraniyal Hipertansiyon Sınırı',
              note: 'BTF 4. Baskı’da (2017) mortaliteyi azaltmak için tedavi eşiği 20’den > 22 mmHg’ye güncellenmiştir; ancak P₂ > P₁ veya herniasyon bulgusunda daha erken müdahale gerekir.',
              cls: isDark ? 'bg-indigo-950/25 border-indigo-500/40' : 'bg-indigo-50/80 border-indigo-200',
              valCls: 'text-indigo-600 dark:text-indigo-400',
            },
            {
              formula: 'CPP = MAP − ICP',
              target: 'Hedef CPP: 60 – 70 mmHg',
              title: 'Serebral Perfüzyon Basıncı',
              note: 'Hem MAP hem EVD transdüseri Foramen Monro (Tragus) hizasından sıfırlanmalıdır. Agresif CPP > 70 mmHg ARDS ve sıvı/vazopresör toksisitesi riskini artırır.',
              cls: isDark ? 'bg-emerald-950/25 border-emerald-500/40' : 'bg-emerald-50/80 border-emerald-200',
              valCls: 'text-emerald-700 dark:text-emerald-400',
            },
            {
              formula: 'P_{1} > P_{2} > P_{3}',
              target: 'Uyarı: P_{2} / P_{1} ≥ 1.0',
              title: 'Dalga Morfolojisi = Kompliyans',
              note: 'P_{1} (perküsyon · arteriyel sistol), P_{2} (tidal · beyin kompliyansı), P_{3} (dikrotik · aort kapak kapanışı). P_{2} > P_{1} olması kompliyansın tükendiğinin en erken habercisidir.',
              cls: isDark ? 'bg-amber-950/25 border-amber-500/40' : 'bg-amber-50/80 border-amber-200',
              valCls: 'text-amber-700 dark:text-amber-400',
            },
          ].map((item) => (
            <div key={item.formula} className={`rounded-xl border p-4 space-y-1.5 ${item.cls}`}>
              <div className={`text-sm font-mono font-bold tabular-nums ${item.valCls}`}>
                <MedicalText text={item.formula} />
              </div>
              <div className="text-xs font-mono font-semibold text-slate-900 dark:text-white">
                <MedicalText text={item.target} />
              </div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <MedicalText text={item.note} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI P1/P2/P3 DALGA FORMU, CPP VE MONRO–KELLIE LABORATUVARI      */}
      {/* ===================================================================== */}
      <section id="icp-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı P<sub>1</sub> · P<sub>2</sub> · P<sub>3</sub> Dalga Morfolojisi ve Monro–Kellie Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Özellikle <strong>“Erken Kompliyans Kaybı (P<sub>2</sub> &gt; P<sub>1</sub>)”</strong> senaryosunu inceleyin:
            ICP henüz 17–18 mmHg iken P<sub>2</sub> dalgası P<sub>1</sub>’i geçer; ardından PaCO<sub>2</sub>’yi hafifçe
            artırın veya başı 0° indirin — eğrinin dik kolunda ICP’nin nasıl sıçradığını canlı gözlemleyin.
          </p>
        </div>

        {/* 6 Clinical Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'normal_compliance', label: 'Normal (P₁ > P₂ > P₃)' },
            { id: 'early_p2_elevation', label: 'Erken P₂ > P₁ (Kırılma Noktası)' },
            { id: 'hypercapnia', label: 'Hiperkapni (PaCO₂ 52)' },
            { id: 'severe_ich', label: 'Ağır KİBAS (ICP > 25)' },
            { id: 'head_flat', label: 'Baş 0° Düz (Venöz Staz)' },
            { id: 'low_cpp_hypotension', label: 'Hipotansiyon (CPP < 50!)' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as IcpPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-indigo-600 border-indigo-500 text-white'
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
          {/* LEFT STAGE */}
          <div
            className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-5 ${
              isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            {/* 4 Live Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* ICP */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.icp > 22
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Canlı ICP</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.icp > 22
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.icp > 15
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.icp} <span className="text-[11px] font-normal">mmHg</span>
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.icp > 22 ? 'ALARM (> 22)' : 'Eşik ≤ 22'}
                </div>
              </div>

              {/* CPP */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.cpp < 60
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">CPP (MAP − ICP)</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.cpp < 60
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.cpp > 75
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-sky-600 dark:text-sky-400'
                  }`}
                >
                  {sim.cpp} <span className="text-[11px] font-normal">mmHg</span>
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.cpp < 60 ? 'İSKEMİ (< 60)' : 'Hedef 60–70'}
                </div>
              </div>

              {/* P2/P1 Ratio */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.complianceLost
                    ? isDark
                      ? 'bg-amber-950/35 border-amber-500/50'
                      : 'bg-amber-50 border-amber-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  P<sub>2</sub> / P<sub>1</sub> Oranı
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.complianceLost ? 'text-amber-600 dark:text-amber-400' : 'text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  {sim.p2OverP1.toFixed(2)}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.complianceLost ? 'P₂ > P₁ (SERT!)' : 'Normal (< 1.0)'}
                </div>
              </div>

              {/* Compliance Zone */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Kompliyans Fazı</div>
                <div
                  className={`mt-1 text-base font-bold leading-tight ${
                    sim.icp > 22
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.complianceLost
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.icp > 22 ? 'Dekompanse' : sim.complianceLost ? 'Kırılma Dizinde' : 'Kompanse'}
                </div>
                <div className="mt-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  PaCO<sub>2</sub> {paco2} · {headElev30 ? '30°' : '0°'}
                </div>
              </div>
            </div>

            {/* Dual-Panel SVG: Waveform + Monro-Kellie Curve */}
            <svg
              viewBox="0 0 560 186"
              className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
              role="img"
              aria-label="Canlı ICP P1 P2 P3 dalga morfolojisi ve Monro-Kellie basınç-hacim kompliyans eğrisi"
            >
              {/* Left Panel: ICP Pulse Wave */}
              <text x="20" y="16" fontSize="9.5" fontWeight="700" fill="#cbd5e1">
                ICP Dalga Morfolojisi (P<tspan dy="2" fontSize="7">1</tspan><tspan dy="-2"> · P</tspan><tspan dy="2" fontSize="7">2</tspan><tspan dy="-2"> · P</tspan><tspan dy="2" fontSize="7">3</tspan><tspan dy="-2">)</tspan>
              </text>
              <line x1="20" y1="158" x2="270" y2="158" stroke="#1e293b" strokeWidth="1" />
              <path
                d={graphics.wavePath}
                fill="none"
                stroke={sim.icp > 22 ? '#fb7185' : sim.complianceLost ? '#f59e0b' : '#38bdf8'}
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              {/* P1 / P2 / P3 Peak Labels */}
              <text x={graphics.p1X} y={graphics.p1Y - 6} textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#38bdf8">
                P<tspan dy="2" fontSize="6.5">1</tspan>
              </text>
              <text
                x={graphics.p2X}
                y={graphics.p2Y - 6}
                textAnchor="middle"
                fontSize="8.5"
                fontWeight="700"
                fontFamily="ui-monospace, monospace"
                fill={sim.complianceLost ? '#fb7185' : '#a78bfa'}
              >
                P<tspan dy="2" fontSize="6.5">2</tspan>
              </text>
              <text x={graphics.p3X} y={graphics.p3Y - 6} textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                P<tspan dy="2" fontSize="6">3</tspan>
              </text>
              <text x="145" y="175" textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">
                {sim.complianceLost ? 'UYARI: P₂ > P₁ (Düşük Kompliyans!)' : 'Normal: P₁ > P₂ > P₃'}
              </text>

              {/* Center Divider */}
              <line x1="292" y1="12" x2="292" y2="176" stroke="#1e293b" strokeWidth="1" />

              {/* Right Panel: Monro-Kellie Elastance Curve */}
              <text x="316" y="16" fontSize="9.5" fontWeight="700" fill="#cbd5e1">
                Monro–Kellie Basınç–Hacim Eğrisi
              </text>
              {/* Axes */}
              <line x1="318" y1="28" x2="318" y2="158" stroke="#334155" strokeWidth="1.2" />
              <line x1="318" y1="158" x2="540" y2="158" stroke="#334155" strokeWidth="1.2" />

              {/* 22 mmHg Threshold Line */}
              <line
                x1="318"
                y1={graphics.threshold22Y}
                x2="540"
                y2={graphics.threshold22Y}
                stroke="#fb7185"
                strokeDasharray="4 3"
                strokeWidth="1"
              />
              <text x="322" y={graphics.threshold22Y - 3} fontSize="7.5" fontFamily="ui-monospace, monospace" fill="#fb7185">
                22 mmHg Eşik (BTF)
              </text>

              {/* Curve */}
              <path d={graphics.mkPath} fill="none" stroke="#6366f1" strokeWidth="2.2" />

              {/* Active Operating Point */}
              <circle
                cx={graphics.dotX}
                cy={graphics.dotY}
                r="6"
                fill={sim.icp > 22 ? '#f43f5e' : sim.complianceLost ? '#f59e0b' : '#10b981'}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="430" y="175" textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">
                İntrakraniyal Hacim (ΔV) →
              </text>
            </svg>

            {/* Lundberg Wave Types Compact Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                {
                  name: 'Lundberg A (Plato Dalgaları)',
                  desc: '50–100 mmHg’ye ani tırmanış, 5–20 dk sürer. İleri kompliyans kaybı ve yaklaşan herniasyon ACİLİDİR!',
                  cls: isDark ? 'bg-rose-950/25 border-rose-500/35 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950',
                },
                {
                  name: 'Lundberg B Dalgaları',
                  desc: 'Dakikada 0.5–2 kez, 20–50 mmHg ritmik salınım. Bozulmuş vazomotor tonus ve erken kompliyans azalması işaretidir.',
                  cls: isDark ? 'bg-amber-950/25 border-amber-500/35 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950',
                },
                {
                  name: 'Lundberg C Dalgaları',
                  desc: 'Dakikada 4–8 kez, < 20 mmHg düşük amplitüdlü salınım. Fizyolojik arteriyel basınç (Traube–Hering) yansımasıdır.',
                  cls: isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700',
                },
              ].map((w) => (
                <div key={w.name} className={`rounded-lg border p-3 space-y-1 ${w.cls}`}>
                  <div className="font-bold text-[11px]">{w.name}</div>
                  <p className="text-[11px] leading-relaxed opacity-90">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className={`rounded-xl border p-4 space-y-3.5 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <span>Fizyoloji &amp; Müdahale Kontrolleri</span>
              </div>

              {/* Mass / Edema Load */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="icp-vol" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Kitle / Beyin Ödemi Yükü
                  </label>
                  <span className="font-mono tabular-nums font-bold text-indigo-600 dark:text-indigo-400">%{massLoad}</span>
                </div>
                <input
                  id="icp-vol"
                  type="range"
                  min={0}
                  max={96}
                  step={2}
                  value={massLoad}
                  onChange={(e) => setMassLoad(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* MAP */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="icp-map" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Ortalama Arter Basıncı (MAP)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                    {mapMmHg} mmHg
                  </span>
                </div>
                <input
                  id="icp-map"
                  type="range"
                  min={55}
                  max={115}
                  step={1}
                  value={mapMmHg}
                  onChange={(e) => setMapMmHg(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* PaCO2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="icp-co2" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Arteriyel PaCO<sub>2</sub>
                  </label>
                  <span
                    className={`font-mono tabular-nums font-bold ${
                      paco2 >= 45 || paco2 < 30 ? 'text-rose-600 dark:text-rose-400' : 'text-sky-600 dark:text-sky-400'
                    }`}
                  >
                    {paco2} mmHg
                  </span>
                </div>
                <input
                  id="icp-co2"
                  type="range"
                  min={25}
                  max={55}
                  step={1}
                  value={paco2}
                  onChange={(e) => setPaco2(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* Head Position & EVD Drainage Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setHeadElev30((v) => !v)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    headElev30
                      ? isDark
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : isDark
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  Baş: {headElev30 ? '30° Nötral' : '0° Düz!'}
                </button>
                <button
                  type="button"
                  onClick={() => setEvdOpen((v) => !v)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    evdOpen
                      ? isDark
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-900 border-slate-900 text-white'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  EVD Drenaj: {evdOpen ? 'Açık' : 'Kapalı'}
                </button>
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
                <span>
                  <MedicalText text={sim.headline} />
                </span>
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
      {/* 03. ÖLÇÜM YÖNTEMLERİ & TRAGUS SIFIRLAMA KURALI                        */}
      {/* ===================================================================== */}
      <section id="icp-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. İnvaziv &amp; Non-İnvaziv Ölçüm Yöntemleri ve Tragus Sıfırlama Kuralı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <strong>EVD (Eksternal Ventriküler Drenaj)</strong> hem yeniden sıfırlanabilen altın standart ölçüm hem de
            BOS drenajıyla doğrudan tedavi aracıdır. İntraparankimal fiberoptik problar ise dar ventriküllerde hızla
            yerleştirilir ancak BOS boşaltamaz ve sıfır kayması (drift) gösterir.
          </p>
        </div>

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
                <th className="py-3 px-4 font-semibold">Yöntem</th>
                <th className="py-3 px-4 font-semibold">Doğruluk</th>
                <th className="py-3 px-4 font-semibold">BOS Drenajı</th>
                <th className="py-3 px-4 font-semibold">Riskler &amp; Sınırlar</th>
                <th className="py-3 px-4 font-semibold">Klinik Not</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {DEVICE_COMPARE.map((row) => (
                <tr key={row.method} className="align-top">
                  <td className={`py-2.5 px-4 font-bold min-w-[180px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.method}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[160px]">{row.accuracy}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[140px] font-medium">{row.drainage}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[190px]">{row.risks}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[210px]">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Critical Tragus Zeroing Rule Callout */}
        <div
          className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
            isDark
              ? 'bg-amber-950/25 border-amber-500/40 text-amber-200'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong>Hidrostatik Tuzak — Tragus (Foramen Monro) Sıfırlama Kuralı:</strong> Baş 30° yükseltilmiş bir
            hastada arteriyel MAP transdüseri flebostatik aksta (kalp), EVD ise kulak hizasında sıfırlanırsa aradaki
            ~15–20 cm yükseklik farkı <strong>CPP’yi olduğundan 11–15 mmHg YÜKSEK (sahte güvenli!)</strong> gösterir.
            Doğru CPP için arter transdüseri de <strong>dış kulak yolu (tragus)</strong> hizasında sıfırlanmalıdır.
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. SIBICC TIER 0–3 ALGORİTMASI & ANESTEZİK ETKİLERİ                  */}
      {/* ===================================================================== */}
      <section id="icp-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. SIBICC (2019) Kademeli ICP Algoritması (Tier 0 → Tier 3) ve Anestezikler
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            SIBICC uzlaşısı, ICP &gt; 22 mmHg yönetimini giderek artan fizyolojik risk profiline göre 3 kademeye ayırır;
            her kademe içinde seçilen tedaviler eşdeğer kabul edilir ve üst basamağa geçmeden önce altta yatan neden
            (kanama, hidrosefali, BT gereksinimi) tekrar sorgulanır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SIBICC_TIERS.map((block) => (
            <div
              key={block.tier}
              className={`rounded-xl border p-4 space-y-2 ${
                block.tone === 'rose'
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-500/35'
                    : 'bg-rose-50/70 border-rose-200'
                  : block.tone === 'amber'
                    ? isDark
                      ? 'bg-amber-950/20 border-amber-500/35'
                      : 'bg-amber-50/70 border-amber-200'
                    : block.tone === 'sky'
                      ? isDark
                        ? 'bg-sky-950/20 border-sky-500/35'
                        : 'bg-sky-50/70 border-sky-200'
                      : isDark
                        ? 'bg-emerald-950/20 border-emerald-500/35'
                        : 'bg-emerald-50/70 border-emerald-200'
              }`}
            >
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{block.tier}</div>
              <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {block.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="font-bold opacity-60 mt-0.5">•</span>
                    <span>
                      <MedicalText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Anesthetic Agents on ICP / CBF / CMRO2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            {
              agent: 'Propofol & Barbitüratlar',
              effect: 'CMRO_{2} ↓↓ · CBF ↓↓ · ICP ↓↓',
              detail: 'Serebral vazokonstriksiyon ve metabolik baskılama sağlar; yüksek ICP’de ideal IV indüksiyon/idame ajanlarıdır (MAP düşüşünü önle!).',
            },
            {
              agent: 'Volatil Ajanlar (Sevo / Des / İzo)',
              effect: '≤ 1.0 MAC: Nötr · > 1.0 MAC: ICP ↑',
              detail: 'Metabolizmayı azaltır ama yüksek MAC’ta intrinsik serebral vazodilatasyonla kan hacmini ve ICP’yi artırır. TIVA tercih edilir.',
            },
            {
              agent: 'Ketamin (Modern Kanıt)',
              effect: 'Normokapnide ICP Nötr / ↓',
              detail: 'Kontrollü mekanik ventilasyonda (PaCO_{2} sabit) ICP’yi artırmadığı gösterilmiştir; hemodinamik stabilite sayesinde seçilmiş travmada kullanılabilir.',
            },
            {
              agent: 'Opioidler & NMB',
              effect: 'ICP Nötr (Hipotansiyon/CO_{2} yok ise)',
              detail: 'Laringoskopi hipertansiyonunu ve öksürüğü baskılayarak ICP sıçramasını önler. NMB venöz dönüşü ve asenkroniyi düzeltir.',
            },
          ].map((card) => (
            <div
              key={card.agent}
              className={`rounded-xl border p-3.5 space-y-1 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.agent}</div>
              <div className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                <MedicalText text={card.effect} />
              </div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <MedicalText text={card.detail} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. KLİNİK KANITLAR (BEST:TRIP · BTF · PRx) & REFERANSLAR             */}
      {/* ===================================================================== */}
      <section id="icp-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. Klinik Kanıt Dengesi (BTF, BEST:TRIP, PRx) ve Akademik Kaynaklar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            ICP monitörü tek başına tedavi değildir; değerini belirleyen şey multimodal nöroizlem (PbtO<sub>2</sub>,
            otoregülasyon indeksi PRx) ve protokolize klinik müdahale disiplinidir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: 'BTF 4. Baskı (Carney 2017)',
              body: 'Ağır travmatik beyin hasarında (GKS ≤ 8 + anormal BT) ICP monitörizasyonu mortaliteyi azaltmak için önerilir; tedavi eşiği > 22 mmHg, hedef CPP 60–70 mmHg’dir.',
            },
            {
              title: 'BEST:TRIP (Chesnut 2012 · NEJM · n=324)',
              body: 'ICP monitörlü protokol ile sık BT + klinik muayene protokolü arasında 6 aylık mortalite/fonksiyonel sonuç farkı bulunmadı → ICP sayısı tek başına değil, bütüncül protokolle anlamlıdır.',
            },
            {
              title: 'PRx & Bireyselleştirilmiş CPP_{opt}',
              body: 'Basınç Reaktivite İndeksi (PRx, MAP–ICP korelasyonu): PRx < 0 sağlam otoregülasyonu, PRx > +0.3 bozulmuş otoregülasyonu gösterir; hastaya özel CPP_{opt} hedeflemesine olanak tanır.',
            },
          ].map((ev) => (
            <div
              key={ev.title}
              className={`rounded-xl border p-3.5 space-y-1 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <MedicalText text={ev.title} />
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <MedicalText text={ev.body} />
              </p>
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
          <Activity className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>Yatak Başı 3 Altın Sayı:</strong>{' '}
            (1) Tedavi eşiği <strong className="font-mono">ICP &gt; 22 mmHg</strong>, (2) Perfüzyon hedefi{' '}
            <strong className="font-mono">CPP = 60–70 mmHg (Tragus sıfırlama!)</strong>, (3) Erken alarm:{' '}
            <strong className="font-mono">
              P<sub>2</sub> &gt; P<sub>1</sub> = Kompliyans Tükendi!
            </strong>
          </div>
        </div>

        {/* Verified PubMed References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/60 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-indigo-500" />
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
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0"
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
