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

interface EsophagealPressureModuleProps {
  isDark: boolean;
}

type VentEffortMode = 'passive' | 'spontaneous';

type PesPresetId =
  | 'normal_passive'
  | 'obese_collapse'
  | 'obese_optimized'
  | 'ards_high_stress'
  | 'psili_effort'
  | 'ineffective_trigger';

const PAW_VS_PL_ROWS = [
  {
    scenario: 'Morbid Obezite / Pnömoperitonyum / İAH',
    pawOnly: 'P_{plat} 32–36 cmH₂O yüksek görünür → klinisyen PEEP’i düşürüp atelektaziyi artırır.',
    pesGuided: 'Yüksek P_{es,ee} (16–20 cmH₂O) saptanır; P_{L,ee} = 0..+2 için yeterli PEEP güvenle verilir.',
  },
  {
    scenario: 'Şiddetli ARDS (Sert Akciğer · Yüksek E_{L})',
    pawOnly: 'P_{plat} 28 cmH₂O sınırda sanılabilir ancak düşük göğüs duvarı elastansında akciğer aşırı gerilebilir.',
    pesGuided: 'İnspiryum sonu P_{L,ei} (< 20–25 cmH₂O) ve ΔP_{L} (< 10–12 cmH₂O) ile gerçek akciğer stresi sınırlanır.',
  },
  {
    scenario: 'Spontan Solunum & P-SILI Riski',
    pawOnly: 'PSV’de P_{aw} 16–18 cmH₂O çok güvenli görünür; hastanın gizli negatif plevral çekişi görülmez.',
    pesGuided: 'Derin negatif ΔP_{es} (−15 ila −20 cmH₂O) ile P_{L} = P_{aw} − (−P_{es}) = +35 cmH₂O P-SILI tehlikesi yakalanır.',
  },
  {
    scenario: 'Hasta–Ventilatör Asenkronisi & Weaning',
    pawOnly: 'İnefektif tetikleme ve ters tetikleme (reverse triggering) yalnızca akım/basınçta gözden kaçar.',
    pesGuided: 'Her diyafram kasılması P_{es}’te net negatif defleksiyon yaratır; ΔP_{es} (−3 ila −8) ile efor titre edilir.',
  },
];

const REFERENCES = [
  {
    authors: 'Baydur A, Behrakis PK, Zin WA, Jaeger MJ, Milic-Emili J.',
    title: 'A simple method for assessing the validity of the esophageal balloon technique.',
    journal: 'Am Rev Respir Dis. 1982;126(5):788–791.',
    pmid: '7149443',
  },
  {
    authors: 'Talmor D, Sarge T, Malhotra A, et al. (EPVent Trial).',
    title: 'Mechanical ventilation guided by esophageal pressure in acute lung injury.',
    journal: 'N Engl J Med. 2008;359(20):2095–2104.',
    pmid: '19001507',
  },
  {
    authors: 'Akoumianaki E, Maggiore SM, Valenza F, et al. (PLUG Working Group).',
    title: 'The application of esophageal pressure measurement in patients with respiratory failure.',
    journal: 'Am J Respir Crit Care Med. 2014;189(5):520–531.',
    pmid: '24467647',
  },
  {
    authors: 'Mauri T, Yoshida T, Bellani G, et al.',
    title: 'Esophageal and transpulmonary pressure in the clinical setting: meaning, usefulness and perspectives.',
    journal: 'Intensive Care Med. 2016;42(9):1360–1373.',
    pmid: '27334266',
  },
  {
    authors: 'Beitler JR, Sarge T, Banner-Goodspeed VM, et al. (EPVent-2 Study Group).',
    title: 'Effect of titrating positive end-expiratory pressure (PEEP) with an esophageal pressure-guided strategy vs an empirical high PEEP-FiO2 strategy on death and days free from mechanical ventilation among patients with ARDS.',
    journal: 'JAMA. 2019;321(9):846–857.',
    pmid: '30776290',
  },
];

export const EsophagealPressureModule: React.FC<EsophagealPressureModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<PesPresetId>('normal_passive');
  const [mode, setMode] = useState<VentEffortMode>('passive');
  const [peep, setPeep] = useState<number>(8); // cmH2O (4..24)
  const [pplat, setPplat] = useState<number>(18); // cmH2O (10..42)
  const [pesEe, setPesEe] = useState<number>(7); // cmH2O (2..24)
  const [deltaPes, setDeltaPes] = useState<number>(3); // passive: +1..+14; spontaneous: -2..-22

  const applyPreset = (preset: PesPresetId) => {
    setActivePreset(preset);
    if (preset === 'normal_passive') {
      setMode('passive');
      setPeep(8);
      setPplat(18);
      setPesEe(7);
      setDeltaPes(3);
    } else if (preset === 'obese_collapse') {
      setMode('passive');
      setPeep(8);
      setPplat(30);
      setPesEe(18);
      setDeltaPes(10);
    } else if (preset === 'obese_optimized') {
      setMode('passive');
      setPeep(20);
      setPplat(36);
      setPesEe(18);
      setDeltaPes(8);
    } else if (preset === 'ards_high_stress') {
      setMode('passive');
      setPeep(14);
      setPplat(34);
      setPesEe(10);
      setDeltaPes(3);
    } else if (preset === 'psili_effort') {
      setMode('spontaneous');
      setPeep(8);
      setPplat(18);
      setPesEe(8);
      setDeltaPes(-16);
    } else if (preset === 'ineffective_trigger') {
      setMode('spontaneous');
      setPeep(8);
      setPplat(14);
      setPesEe(10);
      setDeltaPes(-7);
    }
  };

  const handleModeSwitch = (nextMode: VentEffortMode) => {
    setMode(nextMode);
    if (nextMode === 'passive' && deltaPes < 0) {
      setDeltaPes(4);
    } else if (nextMode === 'spontaneous' && deltaPes >= 0) {
      setDeltaPes(-6);
    }
  };

  // Physiological Transpulmonary Mechanics Calculation (P_L = P_aw - P_es)
  const sim = useMemo(() => {
    const effPplat = Math.max(peep + 2, pplat);
    const deltaPaw = effPplat - peep;
    const pesEi = pesEe + deltaPes; // passive: pesEe + positive delta; spontaneous: pesEe - effort

    const plEe = peep - pesEe; // End-expiratory transpulmonary pressure (target 0 to +2 cmH2O)
    const plEiDirect = effPplat - pesEi; // Direct end-inspiratory P_L (target < 20-25 cmH2O)
    const deltaPl = deltaPaw - deltaPes; // Transpulmonary driving pressure / stress swing (target < 10-12 cmH2O)

    // Elastance-derived P_L,ei (only meaningful in passive ventilation: P_L,ei = Pplat * (E_L / E_RS))
    const elOverErs =
      mode === 'passive' && deltaPaw > 0
        ? Math.max(0.15, Math.min(0.95, deltaPl / deltaPaw))
        : null;
    const plEiElastance = elOverErs !== null ? Number((effPplat * elOverErs).toFixed(1)) : null;

    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = 'Akciğer Koruyucu Transpulmoner Denge (Nominal)';
    let action = `Ekspiryum sonu P_{L,ee} (${plEe >= 0 ? `+${plEe}` : plEe} cmH₂O) alveolleri açık tutuyor; inspiratuvar stres (P_{L,ei} ${plEiDirect} cmH₂O) ve ΔP_{L} (${deltaPl} cmH₂O) güvenli aralıktadır.`;

    if (mode === 'spontaneous' && deltaPes <= -12) {
      status = 'critical';
      headline = `Kırmızı Bayrak: P-SILI Tehlikesi! (Gizli ΔP_{L} = ${deltaPl} · P_{L,ei} = ${plEiDirect} cmH₂O)`;
      action = `Ventilatör ekranında hava yolu basıncı yalnızca ${effPplat} cmH₂O görünürken, hastanın şiddetli inspiratuvar eforu (ΔP_{es} ${deltaPes} cmH₂O) transpulmoner stresi ${plEiDirect} cmH₂O’ya fırlatıyor! Sedasyonu artırın, PSV desteğini düzenleyin veya kısa süreli kontrollü ventilasyona/NMB’ye geçin.`;
    } else if (activePreset === 'ineffective_trigger' && mode === 'spontaneous') {
      status = 'warning';
      headline = `Hasta–Ventilatör Asenkronisi: İnefektif Tetikleme (ΔP_{es} ${deltaPes} cmH₂O)`;
      action =
        'P_{es} eğrisinde net negatif diyafram eforu izlenmesine rağmen ventilatör tetiklenmiyor (genellikle oto-PEEP veya aşırı basınç desteği nedeniyle). Oto-PEEP’i azaltın, PSV’yi hafif düşürün ve tetikleme hassasiyetini gözden geçirin.';
    } else if (plEe < -2) {
      status = 'critical';
      headline = `Ekspiratuvar Alveoler Kollaps / Atelektotravma (P_{L,ee} = ${plEe} cmH₂O < 0)`;
      action = `Yüksek göğüs duvarı / karın içi yükü (P_{es,ee} ${pesEe} cmH₂O) mevcut PEEP’i (${peep} cmH₂O) yeniyor ve ekspiryum sonunda akciğeri kapatıyor. P_{L,ee}’yi 0 ile +2 cmH₂O bandına çıkarmak için PEEP’i ~${pesEe}–${pesEe + 2} cmH₂O’ya kademeli titre edin (P_{L,ei}’yi < 20–25 koruyarak).`;
    } else if (plEiDirect >= 20 || deltaPl >= 14) {
      status = 'critical';
      headline = `Aşırı Akciğer Stresi / Barotravma Riski (P_{L,ei} = ${plEiDirect} · ΔP_{L} = ${deltaPl} cmH₂O)`;
      action = `Transpulmoner sürüş basıncı (ΔP_{L} ${deltaPl} cmH₂O) veya inspiratuvar stres (P_{L,ei} ${plEiDirect} cmH₂O) güvenli sınırı (< 12 / < 20 cmH₂O) aştı! Akciğer elastansı yüksek (E_{L}/E_{RS} ${elOverErs ? `%${Math.round(elOverErs * 100)}` : '—'}): tidal volümü (4–6 mL/kg PBW) veya PEEP’i düşürün.`;
    } else if (plEe > 5) {
      status = 'warning';
      headline = `Aşırı PEEP / Aşırı Gerilme Eğilimi (P_{L,ee} = +${plEe} cmH₂O)`;
      action =
        'Ekspiryum sonu transpulmoner basınç > +4–5 cmH₂O düzeyinde; hemodinamik venöz dönüş baskısı ve alveoler overdistansiyon açısından PEEP’i kademeli azaltmayı değerlendirin.';
    } else if (mode === 'spontaneous' && Math.abs(deltaPes) < 3) {
      status = 'warning';
      headline = `Aşırı Ventilatör Desteği / Diyafram Atrofisi Riski (ΔP_{es} ${deltaPes} cmH₂O)`;
      action =
        'Spontan efor çok düşük (< 3 cmH₂O); aşırı basınç desteği (over-assistance) diyafram disfonksiyonuna ve inefektif tetiklemeye yol açar. PSV desteğini kademeli azaltarak ΔP_{es}’i −3 ila −8 cmH₂O hedefine getirin.';
    } else if (effPplat >= 30 && plEiDirect < 20 && plEe >= 0) {
      status = 'optimal';
      headline = `Yüksek P_{plat} (${effPplat}) Ama Akciğer Güvende! (P_{L,ei} = ${plEiDirect} · P_{L,ee} = +${plEe})`;
      action = `Özofageal basıncın en büyük klinik katkısı: P_{plat} ${effPplat} cmH₂O korkutucu görünse de basıncın büyük kısmı sert göğüs duvarına/karına (P_{es,ee} ${pesEe}) harcanıyor; gerçek akciğer stresi (P_{L,ei} ${plEiDirect} cmH₂O) tamamen koruyucu aralıktadır.`;
    }

    return {
      effPplat,
      deltaPaw,
      pesEi,
      plEe,
      plEiDirect,
      deltaPl,
      elOverErs,
      plEiElastance,
      status,
      headline,
      action,
    };
  }, [activePreset, mode, peep, pplat, pesEe, deltaPes]);

  // Synchronized 3-Trace SVG (Paw, Pes, P_L = Paw - Pes) across 2 breathing cycles
  const waves = useMemo(() => {
    const startX = 52;
    const endX = 542;
    const steps = 160;

    // Row 1: Paw (0..45 cmH2O -> y 66..14)
    const mapPawY = (v: number) => 66 - (Math.max(0, Math.min(45, v)) / 45) * 52;
    // Row 2: Pes (-15..35 cmH2O -> y 138..86)
    const mapPesY = (v: number) => 138 - ((Math.max(-15, Math.min(35, v)) + 15) / 50) * 52;
    // Row 3: P_L (-15..35 cmH2O -> y 212..156)
    const mapPlY = (v: number) => 212 - ((Math.max(-15, Math.min(35, v)) + 15) / 50) * 56;

    const pawPts: string[] = [];
    const pesPts: string[] = [];
    const plPts: string[] = [];

    for (let i = 0; i <= steps; i++) {
      const u = i / steps;
      const x = startX + u * (endX - startX);
      const cyc = (u * 2) % 1; // 2 respiratory cycles

      let curPaw = peep;
      let curPes = pesEe;

      // Subtle cardiac oscillation on Pes (~1.0 cmH2O)
      const cardiacOsc = Math.sin(u * Math.PI * 18) * 0.7;

      if (activePreset === 'ineffective_trigger' && mode === 'spontaneous' && u > 0.5) {
        // Second cycle is an untriggered inspiratory effort!
        const effPhase = cyc >= 0.12 && cyc <= 0.45 ? Math.sin(((cyc - 0.12) / 0.33) * Math.PI) : 0;
        curPaw = peep - effPhase * 0.9; // Tiny dip, fails to trigger
        curPes = pesEe + deltaPes * effPhase + cardiacOsc;
      } else if (mode === 'passive') {
        // VCV-like rise + inspiratory plateau (0.10..0.48) then passive expiration
        let shape = 0;
        if (cyc >= 0.08 && cyc < 0.24) {
          shape = (cyc - 0.08) / 0.16;
        } else if (cyc >= 0.24 && cyc < 0.46) {
          shape = 1;
        } else if (cyc >= 0.46 && cyc < 0.62) {
          shape = 1 - (cyc - 0.46) / 0.16;
        }
        curPaw = peep + sim.deltaPaw * shape;
        curPes = pesEe + deltaPes * shape + cardiacOsc;
      } else {
        // Spontaneous PSV: negative Pes swing triggers positive Paw support
        let effortShape = 0;
        let supportShape = 0;
        if (cyc >= 0.08 && cyc <= 0.46) {
          effortShape = Math.sin(((cyc - 0.08) / 0.38) * Math.PI);
        }
        if (cyc >= 0.12 && cyc < 0.48) {
          supportShape = cyc < 0.2 ? (cyc - 0.12) / 0.08 : cyc < 0.42 ? 1 : (0.48 - cyc) / 0.06;
        }
        curPaw = peep + sim.deltaPaw * supportShape;
        curPes = pesEe + deltaPes * effortShape + cardiacOsc;
      }

      const curPl = curPaw - curPes;

      pawPts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${mapPawY(curPaw).toFixed(1)}`);
      pesPts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${mapPesY(curPes).toFixed(1)}`);
      plPts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${mapPlY(curPl).toFixed(1)}`);
    }

    return {
      pawPath: pawPts.join(' '),
      pesPath: pesPts.join(' '),
      plPath: plPts.join(' '),
      plZeroY: mapPlY(0),
      plDangerY: mapPlY(20),
    };
  }, [activePreset, mode, peep, pesEe, deltaPes, sim.deltaPaw]);

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
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">İleri Solunum Mekaniği</span>
          <span aria-hidden="true">·</span>
          <span>
            Özofageal Balon Manometrisi (P<sub>es</sub>)
          </span>
          <span aria-hidden="true">·</span>
          <span>
            Transpulmoner Basınç (P<sub>L</sub> = P<sub>aw</sub> − P<sub>es</sub>)
          </span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Özofageal Basınç Monitörizasyonu (P<sub>es</sub> &amp; Transpulmoner Basınç)
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Ventilatörde okunan hava yolu basıncı (
          <strong>
            P<sub>aw</sub>
          </strong>
          ), akciğer ile göğüs duvarının toplam yükünü gösterir. Alt 1/3 özofagusa yerleştirilen ince bir balon kateter ile plevral basıncın yerine geçen{' '}
          <strong>
            özofageal basınç (P<sub>es</sub>)
          </strong>{' '}
          ölçülerek akciğeri gerçekten geren{' '}
          <strong>
            transpulmoner basınç (P<sub>L</sub> = P<sub>aw</sub> − P<sub>es</sub>)
          </strong>
          , <strong>P-SILI</strong> ve asenkroni doğrudan izlenir.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'pes-01', label: '01. P_{L} = P_{aw} − P_{es} Fiziği' },
            { id: 'pes-02', label: '02. Canlı 3-Trase & P-SILI Lab' },
            { id: 'pes-03', label: '03. Yerleşim & Baydur Testi' },
            { id: 'pes-04', label: '04. Obezite, Asenkroni & Tuzaklar' },
            { id: 'pes-05', label: '05. EPVent / EPVent-2 & Literatür' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-cyan-400'
              }`}
            >
              <MedicalText text={nav.label} />
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. TRANSPULMONER BASINÇ FİZİĞİ VE HEDEFLER                           */}
      {/* ===================================================================== */}
      <section id="pes-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. Akciğer ve Göğüs Duvarını Ayırmak: Transpulmoner Basınç (P<sub>L</sub>)
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Solunum sistemi elastansı seri bağlı iki yay gibidir:{' '}
            <strong>
              E<sub>RS</sub> = E<sub>L</sub> (Akciğer) + E<sub>CW</sub> (Göğüs Duvarı)
            </strong>
            . Yüksek bir plato basıncı (P<sub>plat</sub>) her zaman akciğerin tehlikede olduğunu göstermez; obezitede veya
            pnömoperitonyumda basıncın büyük kısmı göğüs duvarına/karına harcanır.
          </p>
        </div>

        {/* 3 Target Formula Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              formula: 'P_{L,ee} = PEEP − P_{es,ee}',
              target: 'Hedef: 0 ila +2 cmH₂O',
              title: 'Ekspiryum Sonu P_{L} (Atelektazi Kalkanı)',
              note: 'Negatifse (< 0 cmH₂O) dış göğüs/karın basıncı PEEP’i yener ve bazal alveoller her nefeste kapanır (atelektotravma).',
              cls: isDark ? 'bg-cyan-950/25 border-cyan-500/40' : 'bg-cyan-50/80 border-cyan-200',
              numCls: 'text-cyan-600 dark:text-cyan-400',
            },
            {
              formula: 'P_{L,ei} = P_{plat} − P_{es,ei}',
              target: 'Hedef: < 20 – 25 cmH₂O',
              title: 'İnspiryum Sonu P_{L} (Akciğer Stresi)',
              note: 'Alveol duvarını gerçekten geren maksimum basıncı (lung stress) gösterir. Pasif ventilasyonda elastans oranı (P_{plat} × E_{L}/E_{RS}) ile de tahmin edilir.',
              cls: isDark ? 'bg-emerald-950/25 border-emerald-500/40' : 'bg-emerald-50/80 border-emerald-200',
              numCls: 'text-emerald-700 dark:text-emerald-400',
            },
            {
              formula: 'ΔP_{L} = ΔP_{aw} − ΔP_{es}',
              target: 'Hedef: < 10 – 12 cmH₂O',
              title: 'Transpulmoner Sürüş Basıncı',
              note: 'Spontan solunumda ΔP_{es} negatif olduğundan ΔP_{L} = ΔP_{aw} + |ΔP_{es}| şeklinde BÜYÜR — gizli P-SILI’yi ortaya çıkarır!',
              cls: isDark ? 'bg-amber-950/25 border-amber-500/40' : 'bg-amber-50/80 border-amber-200',
              numCls: 'text-amber-700 dark:text-amber-400',
            },
          ].map((item) => (
            <div key={item.formula} className={`rounded-xl border p-4 space-y-1.5 ${item.cls}`}>
              <div className={`text-sm font-mono font-bold tabular-nums ${item.numCls}`}>
                <MedicalText text={item.formula} />
              </div>
              <div className="text-xs font-mono font-semibold text-slate-900 dark:text-white">{item.target}</div>
              <div className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
                <MedicalText text={item.title} />
              </div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <MedicalText text={item.note} />
              </p>
            </div>
          ))}
        </div>

        {/* Paw Only vs Pes Guided Table */}
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
                <th className="py-3 px-4 font-semibold">Klinik Senaryo</th>
                <th className="py-3 px-4 font-semibold text-slate-500 dark:text-slate-400">
                  Yalnızca P<sub>aw</sub> (Standart Ventilatör)
                </th>
                <th className="py-3 px-4 font-semibold text-cyan-600 dark:text-cyan-400">
                  Özofageal Basınç (P<sub>es</sub> / P<sub>L</sub>) Rehberliği
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {PAW_VS_PL_ROWS.map((row) => (
                <tr key={row.scenario} className="align-top">
                  <td className={`py-2.5 px-4 font-semibold min-w-[180px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <MedicalText text={row.scenario} />
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[220px] text-slate-500 dark:text-slate-400">
                    <MedicalText text={row.pawOnly} />
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[235px]">
                    <MedicalText text={row.pesGuided} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI 3-TRASE (Paw / Pes / PL) VE P-SILI LABORATUVARI             */}
      {/* ===================================================================== */}
      <section id="pes-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı Senkronize P<sub>aw</sub> · P<sub>es</sub> · P<sub>L</sub> Mekanik ve P-SILI Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Özellikle <strong>“Morbid Obezite (Kollaps)”</strong> ve <strong>“Spontan P-SILI (Güçlü Efor)”</strong>{' '}
            senaryolarını karşılaştırın: İlkinde yüksek P<sub>plat</sub>’a rağmen akciğer güvendedir; ikincisinde düşük P<sub>aw</sub>’a rağmen
            negatif P<sub>es</sub> çekişi akciğeri barotravma sınırının ötesine taşır.
          </p>
        </div>

        {/* 6 Scenario Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'normal_passive', label: 'Normal Pasif' },
            { id: 'obese_collapse', label: 'Obezite / İAH (Kollaps!)' },
            { id: 'obese_optimized', label: 'Obezite (PEEP Optimize)' },
            { id: 'ards_high_stress', label: 'ARDS (Aşırı Stres)' },
            { id: 'psili_effort', label: 'Spontan P-SILI (Efor ↑↑)' },
            { id: 'ineffective_trigger', label: 'İnefektif Tetikleme' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as PesPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-cyan-600 border-cyan-500 text-white'
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
            {/* 4 Live Mechanics Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* P_L,ee */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.plEe < 0
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  P<sub>L,ee</sub> (Eksp.)
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.plEe < 0
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.plEe > 5
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.plEe >= 0 ? `+${sim.plEe}` : sim.plEe} <span className="text-[11px] font-normal">cmH₂O</span>
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.plEe < 0 ? 'KOLLAPS (< 0)' : 'Hedef 0..+2'}
                </div>
              </div>

              {/* P_L,ei */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.plEiDirect >= 20
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  P<sub>L,ei</sub> (İnsp.)
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.plEiDirect >= 20 ? 'text-rose-600 dark:text-rose-400' : 'text-cyan-600 dark:text-cyan-400'
                  }`}
                >
                  {sim.plEiDirect} <span className="text-[11px] font-normal">cmH₂O</span>
                </div>
                <div className="mt-1.5 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  {sim.plEiElastance !== null ? `Elastans: ${sim.plEiElastance}` : 'Hedef < 20–25'}
                </div>
              </div>

              {/* Delta P_L */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.deltaPl >= 14
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  ΔP<sub>L</sub> (Sürüş)
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.deltaPl >= 14 ? 'text-rose-600 dark:text-rose-400' : 'text-indigo-600 dark:text-indigo-400'
                  }`}
                >
                  {sim.deltaPl} <span className="text-[11px] font-normal">cmH₂O</span>
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.deltaPl >= 14 ? 'YÜKSEK STRES!' : 'Hedef < 10–12'}
                </div>
              </div>

              {/* E_L / E_RS or Effort */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {mode === 'passive' ? (
                    <>
                      E<sub>L</sub> / E<sub>RS</sub> Payı
                    </>
                  ) : (
                    <>
                      Diyafram ΔP<sub>es</sub>
                    </>
                  )}
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    mode === 'spontaneous' && deltaPes <= -12
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {mode === 'passive' && sim.elOverErs !== null
                    ? `%${Math.round(sim.elOverErs * 100)}`
                    : `${deltaPes}`}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {mode === 'passive' ? 'Akciğer / Toplam' : 'Hedef −3..−8'}
                </div>
              </div>
            </div>

            {/* Synchronized 3-Trace Waveform SVG */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Eş Zamanlı Ventilatör Dalgaları: P<sub>aw</sub> (Mavi) · P<sub>es</sub> (Turuncu) · P<sub>L</sub> = P<sub>aw</sub> − P<sub>es</sub> (Yeşil/Kırmızı)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  {mode === 'passive' ? (
                    <>
                      Pasif Kontrollü (P<sub>es</sub> ↑)
                    </>
                  ) : (
                    <>
                      Spontan Efor (P<sub>es</sub> ↓)
                    </>
                  )}
                </span>
              </div>

              <svg
                viewBox="0 0 560 226"
                className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
                role="img"
                aria-label="Senkronize hava yolu basıncı, özofageal basınç ve transpulmoner basınç dalgaları"
              >
                {/* Row dividers */}
                <line x1="12" y1="74" x2="548" y2="74" stroke="#1e293b" strokeWidth="1" />
                <line x1="12" y1="146" x2="548" y2="146" stroke="#1e293b" strokeWidth="1" />

                {/* Row Labels */}
                <text x="12" y="26" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#38bdf8">
                  P<tspan dy="2.5" fontSize="7.5">aw</tspan>
                </text>
                <text x="12" y="42" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#64748b">cmH₂O</text>

                <text x="12" y="98" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#f59e0b">
                  P<tspan dy="2.5" fontSize="7.5">es</tspan>
                </text>
                <text x="12" y="114" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#64748b">+Kardiyak</text>

                <text x="12" y="172" fontSize="10.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#10b981">
                  P<tspan dy="2.5" fontSize="7.5">L</tspan>
                </text>
                <text x="12" y="188" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">
                  P<tspan dy="1.8" fontSize="6.5">aw</tspan><tspan dy="-1.8">−P</tspan><tspan dy="1.8" fontSize="6.5">es</tspan>
                </text>

                {/* P_L Collapse (<0) and High Stress (>20) zones */}
                <rect x="52" y={waves.plZeroY} width="490" height={212 - waves.plZeroY} fill="#f43f5e" fillOpacity="0.14" />
                <line x1="52" y1={waves.plZeroY} x2="542" y2={waves.plZeroY} stroke="#fb7185" strokeDasharray="4 3" strokeWidth="1" />
                <text x="540" y={waves.plZeroY + 10} textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill="#fb7185">
                  0 cmH₂O (Kollaps Sınırı)
                </text>

                <line x1="52" y1={waves.plDangerY} x2="542" y2={waves.plDangerY} stroke="#f59e0b" strokeDasharray="3 3" strokeWidth="1" strokeOpacity="0.65" />
                <text x="540" y={waves.plDangerY - 3} textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill="#fbbf24">
                  +20 cmH₂O (Stres)
                </text>

                {/* Waveforms */}
                <path d={waves.pawPath} fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinejoin="round" />
                <path d={waves.pesPath} fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinejoin="round" />
                <path
                  d={waves.plPath}
                  fill="none"
                  stroke={sim.status === 'critical' ? '#fb7185' : '#10b981'}
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
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
                <Sliders className="w-4 h-4 text-cyan-500" />
                <span>Mekanik &amp; Efor Kontrolleri</span>
              </div>

              {/* Mode Switch */}
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleModeSwitch('passive')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    mode === 'passive'
                      ? isDark
                        ? 'bg-slate-800 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-900 text-white'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Pasif (VCV/PCV)
                </button>
                <button
                  type="button"
                  onClick={() => handleModeSwitch('spontaneous')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                    mode === 'spontaneous'
                      ? isDark
                        ? 'bg-slate-800 border-cyan-500 text-white'
                        : 'bg-slate-900 border-slate-900 text-white'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Spontan (PSV)
                </button>
              </div>

              {/* PEEP */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pes-peep" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    PEEP (Ekspiryum Sonu)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-sky-600 dark:text-sky-400">{peep} cmH₂O</span>
                </div>
                <input
                  id="pes-peep"
                  type="range"
                  min={4}
                  max={24}
                  step={1}
                  value={peep}
                  onChange={(e) => setPeep(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* Pplat / Paw */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pes-pplat" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {mode === 'passive' ? (
                      <>
                        P<sub>plat</sub> (Plato Basıncı)
                      </>
                    ) : (
                      <>
                        P<sub>aw</sub> Pik (PEEP + PS)
                      </>
                    )}
                  </label>
                  <span className="font-mono tabular-nums font-bold text-indigo-600 dark:text-indigo-400">
                    {sim.effPplat} cmH₂O
                  </span>
                </div>
                <input
                  id="pes-pplat"
                  type="range"
                  min={10}
                  max={42}
                  step={1}
                  value={pplat}
                  onChange={(e) => setPplat(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Pes_ee */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pes-ee" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Bazal P<sub>es,ee</sub> (Göğüs/Karın Yükü)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">
                    {pesEe} cmH₂O
                  </span>
                </div>
                <input
                  id="pes-ee"
                  type="range"
                  min={2}
                  max={24}
                  step={1}
                  value={pesEe}
                  onChange={(e) => setPesEe(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Delta Pes */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="pes-delta" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {mode === 'passive' ? (
                      <>
                        Pasif ΔP<sub>es</sub> (Göğüs Duvarı Yükselişi)
                      </>
                    ) : (
                      <>
                        Spontan ΔP<sub>es</sub> (İnspiratuvar Efor)
                      </>
                    )}
                  </label>
                  <span
                    className={`font-mono tabular-nums font-bold ${
                      mode === 'spontaneous' && deltaPes <= -12
                        ? 'text-rose-600 dark:text-rose-400'
                        : 'text-cyan-600 dark:text-cyan-400'
                    }`}
                  >
                    {deltaPes >= 0 ? `+${deltaPes}` : deltaPes} cmH₂O
                  </span>
                </div>
                <input
                  id="pes-delta"
                  type="range"
                  min={mode === 'passive' ? 1 : -22}
                  max={mode === 'passive' ? 14 : -1}
                  step={1}
                  value={deltaPes}
                  onChange={(e) => setDeltaPes(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer"
                />
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
      {/* 03. BALON YERLEŞİMİ VE BAYDUR OKLÜZYON DOĞRULAMA TESTİ (1982)         */}
      {/* ===================================================================== */}
      <section id="pes-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. Özofageal Balon Yerleşimi, Dolum Hacmi ve Baydur Oklüzyon Testi
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Yanlış derinlikte (midede veya proksimal trakea arkasında) ya da hatalı şişirilmiş bir özofageal balon
            tamamen yanıltıcı basınç okur. Her yerleştirmede{' '}
            <strong>
              Baydur Oklüzyon Testi (ΔP<sub>es</sub> / ΔP<sub>aw</sub> = 0.8–1.2)
            </strong>{' '}
            zorunlu doğrulama adımıdır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Placement & Baydur Test SVG */}
          <div
            className={`lg:col-span-6 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <svg
              viewBox="0 0 460 218"
              className="w-full h-auto"
              role="img"
              aria-label="Alt 1/3 özofagus balon yerleşimi ve Baydur oklüzyon doğrulama testi"
            >
              {/* Left: Anatomical depth diagram */}
              <rect x="10" y="10" width="186" height="198" rx="10" fill={isDark ? '#0f172a' : '#ffffff'} stroke={isDark ? '#334155' : '#cbd5e1'} />
              <text x="103" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                Alt 1/3 Özofagus (~35–45 cm)
              </text>

              {/* Esophagus tube */}
              <rect x="92" y="40" width="22" height="128" rx="6" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke={isDark ? '#475569' : '#94a3b8'} />
              {/* Heart silhouette adjacent */}
              <ellipse cx="64" cy="112" rx="22" ry="26" fill="#f43f5e" fillOpacity="0.18" stroke="#fb7185" strokeWidth="1.4" />
              <text x="64" y="115" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fb7185">Kalp</text>

              {/* Inflated Esophageal Balloon in lower 1/3 */}
              <ellipse cx="103" cy="118" rx="9" ry="22" fill="#06b6d4" fillOpacity="0.35" stroke="#06b6d4" strokeWidth="2" />
              <line x1="103" y1="36" x2="103" y2="96" stroke="#06b6d4" strokeWidth="2" />

              {/* Diaphragm & Stomach */}
              <path d="M 30 162 Q 103 148, 176 162" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
              <text x="150" y="152" textAnchor="middle" fontSize="8" fill="#f59e0b">Diyafram</text>
              <text x="103" y="186" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                1) Mide (~55 cm) → 2) Geri Çek
              </text>

              {/* Right: Baydur Occlusion Test Diagram */}
              <rect x="208" y="10" width="242" height="198" rx="10" fill="#090d16" stroke="#1e293b" />
              <text x="329" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill="#38bdf8">
                Baydur Oklüzyon Testi (1982)
              </text>
              <text x="329" y="42" textAnchor="middle" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                Ekspiryum Sonu Oklüzyon + Efor / Göğüs Basısı
              </text>

              {/* Matched Paw & Pes deflections */}
              <text x="218" y="72" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#38bdf8">
                ΔP<tspan dy="2" fontSize="6.5">aw</tspan>
              </text>
              <path d="M 250 76 L 285 76 L 308 104 L 332 76 L 372 76 L 395 104 L 418 76 L 438 76" fill="none" stroke="#38bdf8" strokeWidth="2.2" />

              <text x="218" y="126" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#f59e0b">
                ΔP<tspan dy="2" fontSize="6.5">es</tspan>
              </text>
              <path d="M 250 130 L 285 130 L 308 158 L 332 130 L 372 130 L 395 158 L 418 130 L 438 130" fill="none" stroke="#f59e0b" strokeWidth="2.2" />

              {/* Verdict formula */}
              <rect x="224" y="170" width="210" height="28" rx="6" fill="#064e3b" fillOpacity="0.45" stroke="#10b981" strokeWidth="1" />
              <text x="329" y="188" textAnchor="middle" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#6ee7b7">
                Geçerli: ΔP<tspan dy="2" fontSize="7">es</tspan><tspan dy="-2"> / ΔP</tspan><tspan dy="2" fontSize="7">aw</tspan><tspan dy="-2"> = 0.8 – 1.2</tspan>
              </text>
            </svg>
          </div>

          <div className="lg:col-span-6 space-y-3">
            {[
              {
                title: '1. İki Aşamalı Yerleştirme (Mide → Alt 1/3 Özofagus)',
                body: 'Kateter önce mideye (~55–60 cm) ilerletilir; karına nazik basıyla pozitif basınç sıçraması görülerek gastrik konum doğrulanır. Ardından 35–45 cm’ye geri çekilir: kardiyak osilasyonların belirmesi ve (spontanda) negatif efor defleksiyonu doğru özofagus yerleşimini gösterir.',
              },
              {
                title: '2. Optimum Balon Şişirme Hacmi (Minimal Distansiyon)',
                body: 'Balon tamamen boşaltılıp üreticinin önerdiği hacimde (genellikle 0.5–4.0 mL hava) şişirilir. Az hava basıncı sönümler; fazla hava balon duvarının kendi elastansı nedeniyle sahte yüksek P_{es} okutur.',
              },
              {
                title: '3. Pasif Hastada Modifiye Baydur Testi (Göğüs Basısı)',
                body: 'Paralize veya derin sedatize hastada ekspiryum sonu tutma (expiratory hold) sırasında sternuma nazikçe 2–3 kez basılır: ΔP_{es} / ΔP_{aw} oranı 0.8–1.2 arasında ise balon doğrulaması başarılıdır.',
              },
              {
                title: '4. Mediastinal Ağırlık ve Periyodik Hava Kontrolü',
                body: 'Supin pozisyonda kalp ve mediasten ağırlığı mutlak P_{es}’i ~3–5 cmH₂O artırabilir. Ayrıca ince balonlardan saatler içinde hava sızabileceğinden 4–6 saatte bir balon hacmi yenilenmelidir.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <MedicalText text={item.body} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. KLİNİK KULLANIM ALANLARI, P-SILI VE TUZAKLAR                      */}
      {/* ===================================================================== */}
      <section id="pes-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. Yüksek Verimli Klinik Kullanım Alanları, P-SILI ve Kontrendikasyonlar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Özofageal basınç en büyük faydayı göğüs duvarı mekaniğinin bozulduğu (obezite, karın içi hipertansiyon) ve
            spontan solunum eforunun tehlikeli boyutlara ulaştığı yoğun bakım / ameliyathane olgularında sunar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. Morbid Obezite, Pnömoperitonyum & İAH',
              tone: 'cyan',
              body: 'Yüksek karın içi basınç diyaframı yukarı iterek P_{es,ee}’yi 15–22 cmH₂O’ya çıkarır. Standart düşük PEEP (5–8 cmH₂O) ciddi ekspiratuvar atelektaziye yol açarken, P_{L,ee} = 0..+2 hedefiyle güvenli yüksek PEEP titre edilir.',
            },
            {
              title: '2. P-SILI & Diyafram Koruyucu Ventilasyon',
              tone: 'rose',
              body: 'Ağır ARDS veya solunum sıkıntısında güçlü spontan inspirasyon (ΔP_{es} < −12 ila −15 cmH₂O) pendelluft, negatif basınçlı pulmoner ödem ve kendi kendine akciğer hasarı (P-SILI) doğurur. Hedef fizyolojik efor ΔP_{es} = −3 ila −8 cmH₂O’dur.',
            },
            {
              title: '3. Gizli Hasta–Ventilatör Asenkronileri',
              tone: 'amber',
              body: 'İnefektif tetikleme (efor var ama soluk yok), ters tetikleme (reverse triggering — ventilatör soluğu diyaframı refleks kasılmaya iter) ve çift tetikleme yalnızca P_{es} trasesiyle kesin olarak ayrıştırılır.',
            },
            {
              title: '4. Artefaktlar & Kontrendikasyonlar',
              tone: 'rose',
              body: 'Özofagus varisi, striktürü, tümörü, yakın dönem özofagus/gastrik cerrahisi, ağır koagülopati ve nazal/kafa tabanı travmasında KONTRENDİKEDİR. Spontan özofageal peristaltizm dalgaları geçici yüksek basınç artefaktı yaratır.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                card.tone === 'rose'
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-500/35'
                    : 'bg-rose-50/70 border-rose-200'
                  : card.tone === 'amber'
                    ? isDark
                      ? 'bg-amber-950/20 border-amber-500/35'
                      : 'bg-amber-50/70 border-amber-200'
                    : isDark
                      ? 'bg-cyan-950/20 border-cyan-500/35'
                      : 'bg-cyan-50/70 border-cyan-200'
              }`}
            >
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{card.title}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <MedicalText text={card.body} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. EPVent vs EPVent-2 KANIT ÖZETİ VE LİTERATÜR                       */}
      {/* ===================================================================== */}
      <section id="pes-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. EPVent vs EPVent-2 Klinik Kanıt Dengesi ve Akademik Kaynaklar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Özofageal basınç kılavuzlu PEEP titrasyonu, her ARDS hastasında rutin zorunluluk olmaktan ziyade{' '}
            <strong>seçilmiş kompleks fizyolojilerde</strong> bireyselleştirilmiş ventilasyon aracı olarak konumlanır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              study: 'EPVent (Talmor 2008 · NEJM · n=61)',
              finding:
                'Düşük PEEP kontrol grubuna kıyasla P_{es} rehberli PEEP (P_{L,ee} 0–10 cmH₂O) PaO₂/FiO₂ oranını (+88 mmHg) ve solunum sistemi kompliyansını anlamlı artırdı.',
            },
            {
              study: 'EPVent-2 (Beitler 2019 · JAMA · n=200)',
              finding:
                'Ampirik YÜKSEK PEEP–FiO₂ stratejisi ile kıyaslandığında 28 günlük mortalite veya ventilatörsüz gün sayısında anlamlı fark saptanmadı → tüm ARDS’de rutin üstünlük yok.',
            },
            {
              study: 'PLUG (Akoumianaki 2014) & Mauri (2016)',
              finding:
                'Morbid obezite, yüksek İAH, ECMO öncesi dirençli ARDS, P-SILI şüphesi ve ağır hasta–ventilatör asenkronisinde fizyolojiye dayalı en değerli yatak başı araçtır.',
            },
          ].map((ev) => (
            <div
              key={ev.study}
              className={`rounded-xl border p-3.5 space-y-1 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{ev.study}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <MedicalText text={ev.finding} />
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
          <Activity className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
          <div>
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>Yatak Başı 3 Altın Sayı:</strong>{' '}
            (1) Baydur doğrulaması{' '}
            <strong className="font-mono">
              ΔP<sub>es</sub>/ΔP<sub>aw</sub> = 0.8–1.2
            </strong>
            , (2) Ekspiryum sonu{' '}
            <strong className="font-mono">
              P<sub>L,ee</sub> = 0..+2 cmH₂O
            </strong>
            , (3) İnspiryum sonu{' '}
            <strong className="font-mono">
              P<sub>L,ei</sub> &lt; 20–25 cmH₂O
            </strong>{' '}
            &amp;{' '}
            <strong className="font-mono">
              ΔP<sub>L</sub> &lt; 10–12 cmH₂O
            </strong>
            .
          </div>
        </div>

        {/* References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/60 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-cyan-500" />
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
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
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
