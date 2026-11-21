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

interface MultigasAgentAnalysisModuleProps {
  isDark: boolean;
}

type VolatileAgentId = 'sevo' | 'des' | 'iso';

type MultigasPresetId =
  | 'standard_maint'
  | 'elderly_overdose'
  | 'low_mac_awareness'
  | 'n2o_des_balanced'
  | 'low_flow_hypoxia';

interface AgentSpec {
  id: VolatileAgentId;
  name: string;
  shortName: string;
  mac40: number; // Nickalls & Mapleson 2003 (age 40, % atm)
  macAwakeRatio: number; // ~0.33 of MAC
  bloodGas: number;
  isoColorLabel: string;
  accentHex: string;
  badgeTextClass: string;
  maxSlider: number;
}

const AGENTS: Record<VolatileAgentId, AgentSpec> = {
  sevo: {
    id: 'sevo',
    name: 'Sevofluran',
    shortName: 'SEV',
    mac40: 1.8,
    macAwakeRatio: 0.34,
    bloodGas: 0.65,
    isoColorLabel: 'Sarı (ISO)',
    accentHex: '#eab308',
    badgeTextClass: 'text-amber-600 dark:text-amber-400',
    maxSlider: 6.0,
  },
  des: {
    id: 'des',
    name: 'Desfluran',
    shortName: 'DES',
    mac40: 6.6,
    macAwakeRatio: 0.36,
    bloodGas: 0.42,
    isoColorLabel: 'Mavi (ISO)',
    accentHex: '#0284c7',
    badgeTextClass: 'text-sky-600 dark:text-sky-400',
    maxSlider: 12.0,
  },
  iso: {
    id: 'iso',
    name: 'İzofluran',
    shortName: 'ISO',
    mac40: 1.17,
    macAwakeRatio: 0.34,
    bloodGas: 1.46,
    isoColorLabel: 'Mor (ISO)',
    accentHex: '#9333ea',
    badgeTextClass: 'text-purple-600 dark:text-purple-400',
    maxSlider: 4.0,
  },
};

const N2O_MAC40 = 104; // % atm (Nickalls & Mapleson 2003)

// Mapleson (1996) age-adjusted MAC formula for ages >= 1 year:
// MAC_age = MAC_40 * 10^(-0.00269 * (age - 40))
const calcMacAtAge = (mac40: number, age: number) => mac40 * Math.pow(10, -0.00269 * (age - 40));

const SENSOR_TECH_ROWS = [
  {
    tech: 'NDIR (Çok Bantlı Kızılötesi · 8–12 µm)',
    gases: 'CO₂ (4.26 µm), N₂O (4.5 µm), Volatil Ajanlar (8–12 µm)',
    response: 'Hızlı (~200–350 ms · Nefes bazlı)',
    keyNote: 'Asimetrik çok atomlu gazları ölçer; 8–12 µm parmak izi bölgesinde otomatik ajan tanıma (Auto-ID) ve Mixed Agent tespiti yapar.',
  },
  {
    tech: 'Paramanyetik O₂ Analizörü',
    gases: 'Yalnızca O₂ (çiftleşmemiş 2 elektron)',
    response: 'Çok hızlı (< 200 ms · FiO₂ & EtO₂)',
    keyNote: 'O₂ simetrik molekül olduğu için IR ile ölçülemez. Manyetik alana çekilme prensibiyle sarf malzemesiz nefesten nefese EtO₂ izler.',
  },
  {
    tech: 'Galvanik Yakıt Hücresi (Elektrokimyasal)',
    gases: 'Yalnızca O₂ (inspiratuvar kol)',
    response: 'Yavaş (15–30 sn · Yalnızca FiO₂)',
    keyNote: 'EtO₂ ve solunum dalgası veremez. Kimyasal pil tüketildiği için 1–2 yılda değiştirilir; anestezi cihazında yedek O₂ güvenlik sensörüdür.',
  },
  {
    tech: 'Hesaplanmış Denge (Azot / N₂)',
    gases: 'N₂ (100% − [O₂ + CO₂ + N₂O + AA])',
    response: 'Sürekli (dolaylı hesaplama)',
    keyNote: 'N₂ de simetrik olduğundan IR’de görünmez; diğer tüm gazların toplamının %100’den çıkarılmasıyla veya hava kaçağı/denitrojenasyon takibinde tahmin edilir.',
  },
];

const REFERENCES = [
  {
    authors: 'Mapleson WW.',
    title: 'Effect of age on MAC in humans: a meta-analysis.',
    journal: 'Br J Anaesth. 1996;76(2):179–185.',
    pmid: '8777094',
  },
  {
    authors: 'Eger EI 2nd.',
    title: 'Age, minimum alveolar anesthetic concentration, and minimum alveolar anesthetic concentration-awake.',
    journal: 'Anesth Analg. 2001;93(4):947–953.',
    pmid: '11574362',
  },
  {
    authors: 'Nickalls RWD, Mapleson WW.',
    title: 'Age-related iso-MAC charts for isoflurane, sevoflurane and desflurane in man.',
    journal: 'Br J Anaesth. 2003;91(2):170–174.',
    pmid: '12878613',
  },
  {
    authors: 'Avidan MS, Jacobsohn E, Glick D, et al. (BAG-RECALL Group).',
    title: 'Prevention of intraoperative awareness in a high-risk surgical population.',
    journal: 'N Engl J Med. 2011;365(7):591–600.',
    pmid: '21848460',
  },
  {
    authors: 'Feldman JM.',
    title: 'Managing fresh gas flow to reduce environmental contamination.',
    journal: 'Anesth Analg. 2012;114(5):1093–1101.',
    pmid: '22415533',
  },
];

export const MultigasAgentAnalysisModule: React.FC<MultigasAgentAnalysisModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<MultigasPresetId>('standard_maint');
  const [agentId, setAgentId] = useState<VolatileAgentId>('sevo');
  const [age, setAge] = useState<number>(40);
  const [fiAgent, setFiAgent] = useState<number>(2.0);
  const [etAgent, setEtAgent] = useState<number>(1.8);
  const [etN2o, setEtN2o] = useState<number>(0);
  const [fiO2, setFiO2] = useState<number>(45);

  const agent = AGENTS[agentId];

  const handleAgentSwitch = (nextId: VolatileAgentId) => {
    setAgentId(nextId);
    const nextSpec = AGENTS[nextId];
    const targetEt = Number(calcMacAtAge(nextSpec.mac40, age).toFixed(2));
    setEtAgent(targetEt);
    setFiAgent(Number(Math.min(nextSpec.maxSlider, targetEt * 1.12).toFixed(2)));
  };

  const applyPreset = (preset: MultigasPresetId) => {
    setActivePreset(preset);
    if (preset === 'standard_maint') {
      setAgentId('sevo');
      setAge(40);
      setFiAgent(2.0);
      setEtAgent(1.8);
      setEtN2o(0);
      setFiO2(45);
    } else if (preset === 'elderly_overdose') {
      setAgentId('sevo');
      setAge(82);
      setFiAgent(2.2);
      setEtAgent(2.0);
      setEtN2o(0);
      setFiO2(45);
    } else if (preset === 'low_mac_awareness') {
      setAgentId('sevo');
      setAge(34);
      setFiAgent(1.1);
      setEtAgent(0.9);
      setEtN2o(0);
      setFiO2(45);
    } else if (preset === 'n2o_des_balanced') {
      setAgentId('des');
      setAge(55);
      setFiAgent(4.2);
      setEtAgent(3.9);
      setEtN2o(50);
      setFiO2(45);
    } else if (preset === 'low_flow_hypoxia') {
      setAgentId('sevo');
      setAge(46);
      setFiAgent(3.2);
      setEtAgent(1.5);
      setEtN2o(65);
      setFiO2(24);
    }
  };

  const sim = useMemo(() => {
    const mac10AtAge = calcMacAtAge(agent.mac40, age);
    const n2oMac10AtAge = calcMacAtAge(N2O_MAC40, age);

    const agentMacAge = etAgent / mac10AtAge;
    const n2oMacAge = etN2o / n2oMac10AtAge;
    const totalMacAge = agentMacAge + n2oMacAge;

    const rawMac40 = etAgent / agent.mac40 + etN2o / N2O_MAC40;
    const macAwakeAtAge = mac10AtAge * agent.macAwakeRatio;

    const fiEtDiff = fiAgent - etAgent; // >0 uptake, <0 washout/emergence
    const etO2 = Math.max(15, Math.round(fiO2 - (fiO2 >= 85 ? 8 : 5)));

    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = `Optimal Cerrahi Anestezi Bandı (${totalMacAge.toFixed(2)} MAC-Age)`;
    let action =
      'Yaşa düzeltilmiş toplam MAC hedef aralıkta (0.8–1.2 MAC), FiO₂ güvenli ve Fi–Et gradyanı dengeli. Mevcut taze gaz akımı ve vaporizatör ayarı sürdürülebilir.';

    if (fiO2 < 28) {
      status = 'critical';
      headline = `Kırmızı Bayrak: Hipoksik Gaz Karışımı (FiO₂ %${fiO2} · EtO₂ %${etO2})`;
      action =
        'Düşük akımda O₂ tüketimi (200–250 mL/dk) karşılanamıyor veya yüksek N₂O (%' +
        etN2o +
        ') oksijeni seyreltiyor! Derhal N₂O’yu kapatın, yüksek akımla %100 O₂ verin ve oksijen kaynağı/akış ölçer güvenliğini doğrulayın.';
    } else if (totalMacAge < 0.7) {
      status = 'critical';
      headline = `Farkındalık Riski — BAG-RECALL Eşiği Altı (${totalMacAge.toFixed(2)} MAC-Age < 0.70)`;
      action =
        'Paralize hastada TIVA ekli değilse < 0.7 MAC-Age (özellikle < 0.35 MAC-Awake) intraoperatif farkındalık riskini artırır! Vaporizatör ayarını, devre kaçağını ve taze gaz akımını kontrol ederek EtAA’yı hızla yükseltin.';
    } else if (totalMacAge >= 1.35) {
      status = 'warning';
      headline = `Yaşa Göre Aşırı Volatil Derinlik (${totalMacAge.toFixed(2)} MAC-Age · Ham 40y MAC: ${rawMac40.toFixed(2)})`;
      action =
        age >= 65
          ? `${age} yaşındaki hastada 1.0 MAC yalnızca %${mac10AtAge.toFixed(2)} ${agent.name} değerine karşılık gelir! Yaş düzeltmesi göz ardı edilirse derin hipotansiyon, burst supresyon ve postop deliryum gelişir; vaporizatörü azaltın.`
          : '1.35 MAC-Age üzeri vazodilatasyon, hipotansiyon ve derin EEG supresyonu riskini artırır. Cerrahi uyaran düşükse veya opioid desteği varsa volatil konsantrasyonu titre ederek azaltın.';
    } else if (fiEtDiff < -0.15) {
      status = 'warning';
      headline = `Aktif Washout / Uyanma Fazı (EtAA %${etAgent.toFixed(2)} > FiAA %${fiAgent.toFixed(2)})`;
      action =
        'Ekspiratuvar ajan inspiratuvardan yüksek: beyin ve dokulardan akciğere aktif ajan atılımı sürüyor. Ekstübasyon için EtAA’nın MAC-Awake (%' +
        macAwakeAtAge.toFixed(2) +
        ') altına gerilemesini bekleyin.';
    } else if (fiEtDiff > agent.mac40 * 0.6) {
      status = 'warning';
      headline = `Geniş Fi–Et Gradyanı (Δ ${fiEtDiff.toFixed(2)}% · Denge Henüz Sağlanmadı)`;
      action =
        'Hızlı indüksiyon, çok düşük taze gaz akımı veya yüksek doku alımı sırasında FiAA, EtAA’dan belirgin yüksektir. Beyin/alveol dengelenmesi için birkaç dakika bekleyin veya geçici FGF artırın.';
    } else if (fiO2 >= 90 && etO2 >= 85) {
      status = 'optimal';
      headline = `Etkin Denitrojenasyon / Preoksijenasyon (EtO₂ %${etO2} ≥ %85)`;
      action =
        'Paramanyetik O₂ analizi FRC’deki nitrojenin başarıyla oksijenle yer değiştirdiğini doğruluyor. Apneik oksijenasyon rezervi maksimize edilmiştir.';
    }

    return {
      mac10AtAge,
      n2oMac10AtAge,
      agentMacAge,
      n2oMacAge,
      totalMacAge,
      rawMac40,
      macAwakeAtAge,
      fiEtDiff,
      etO2,
      status,
      headline,
      action,
    };
  }, [agent, age, fiAgent, etAgent, etN2o, fiO2]);

  // Build Breath-by-Breath Volatile Agent Waveform SVG (Inverse shape of capnogram!)
  const agentWavePath = useMemo(() => {
    const startX = 44;
    const endX = 540;
    const maxYVal = Math.max(agent.maxSlider, fiAgent + 0.5, etAgent + 0.5);
    const mapY = (val: number) => 116 - (Math.max(0, Math.min(maxYVal, val)) / maxYVal) * 92;

    const yFi = mapY(fiAgent);
    const yEt = mapY(etAgent);

    // 3 breathing cycles: Inspiration plateau = FiAgent, Expiration plateau = EtAgent
    const cycles = 3;
    const cycW = (endX - startX) / cycles;
    const pts: string[] = [];

    for (let c = 0; c < cycles; c++) {
      const x0 = startX + c * cycW;
      // Start of inspiration (Fi plateau)
      pts.push(`${c === 0 ? 'M' : 'L'} ${x0.toFixed(1)} ${yFi.toFixed(1)}`);
      pts.push(`L ${(x0 + cycW * 0.38).toFixed(1)} ${yFi.toFixed(1)}`);
      // Transition to expiration (Et plateau)
      pts.push(`L ${(x0 + cycW * 0.48).toFixed(1)} ${yEt.toFixed(1)}`);
      pts.push(`L ${(x0 + cycW * 0.90).toFixed(1)} ${yEt.toFixed(1)}`);
      // Next inspiration rise
      pts.push(`L ${(x0 + cycW).toFixed(1)} ${yFi.toFixed(1)}`);
    }

    return { path: pts.join(' '), yFi, yEt };
  }, [agent.maxSlider, fiAgent, etAgent]);

  // Build Mapleson (1996) Age-MAC Iso-Curve SVG
  const isoMacSvg = useMemo(() => {
    const minAge = 10;
    const maxAge = 95;
    const startX = 48;
    const endX = 536;
    const maxConc = agent.mac40 * 1.85;

    const mapX = (a: number) => startX + ((a - minAge) / (maxAge - minAge)) * (endX - startX);
    const mapY = (conc: number) => 126 - (Math.max(0, Math.min(maxConc, conc)) / maxConc) * 104;

    const buildLine = (macMult: number) => {
      const pts: string[] = [];
      for (let a = minAge; a <= maxAge; a += 5) {
        const c = calcMacAtAge(agent.mac40, a) * macMult;
        pts.push(`${a === minAge ? 'M' : 'L'} ${mapX(a).toFixed(1)} ${mapY(c).toFixed(1)}`);
      }
      return pts.join(' ');
    };

    // Effective equivalent agent conc including N2O additive contribution
    const equivConc = etAgent + (etN2o / calcMacAtAge(N2O_MAC40, age)) * calcMacAtAge(agent.mac40, age);

    return {
      line13: buildLine(1.3),
      line10: buildLine(1.0),
      line07: buildLine(0.7),
      lineAwake: buildLine(agent.macAwakeRatio),
      ptX: mapX(age),
      ptY: mapY(equivConc),
    };
  }, [agent, age, etAgent, etN2o]);

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
          <span className="text-amber-600 dark:text-amber-400 font-semibold">Solunum Gazları &amp; Farmakokinetik</span>
          <span aria-hidden="true">·</span>
          <span>Multigaz Analizörü (NDIR + Paramanyetik O₂)</span>
          <span aria-hidden="true">·</span>
          <span>FiAA / EtAA / MAC-Age</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Anestezik Ajan Gaz Analizi (Multigaz Monitörizasyonu)
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Multigaz analizörü, Y-parçasından çekilen gaz örneğinde <strong>CO₂, N₂O ve halojenli volatil ajanları</strong>{' '}
          (<em>Sevofluran, Desfluran, İzofluran</em>) 8–12 µm kızılötesi parmak izi spektroskopisiyle otomatik tanır;{' '}
          <strong>O₂</strong>’yi ise nefesten nefese paramanyetik sensörle ölçerek <strong>yaşa düzeltilmiş MAC</strong> ve
          düşük akım güvenliğini sağlar.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'mg-01', label: '01. IR & Paramanyetik O₂ Fiziği' },
            { id: 'mg-02', label: '02. Canlı MAC-Age & Fi–Et Lab' },
            { id: 'mg-03', label: '03. Örnekleme & Düşük Akım' },
            { id: 'mg-04', label: '04. Tuzaklar & MAC Faktörleri' },
            { id: 'mg-05', label: '05. Klinik Akış & Literatür' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-amber-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-amber-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. KIZILÖTESİ SPEKTROSKOPİ VE PARAMANYETİK O2 FİZİĞİ                 */}
      {/* ===================================================================== */}
      <section id="mg-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. Çok Bantlı IR Spektroskopi (8–12 µm) ve O₂ Neden IR ile Ölçülemez?
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Kızılötesi (IR) ışığı yalnızca <strong>iki farklı atom türü içeren (asimetrik / dipol momentli)</strong>{' '}
            moleküller soğurur. Bu nedenle <strong>CO₂, N₂O ve volatil ajanlar</strong> IR ile ölçülürken, simetrik
            moleküller olan <strong>O₂ ve N₂</strong> IR ışığını soğurmaz; O₂ için ayrı bir <strong>paramanyetik</strong>{' '}
            analizör zorunludur.
          </p>
        </div>

        {/* Infrared Absorption Spectrum SVG */}
        <div
          className={`rounded-xl border p-4 sm:p-5 ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/70 border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Kızılötesi (IR) Soğurma Spektrumu (3–13 µm) · Otomatik Ajan Tanıma (Auto-ID)
            </span>
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
              O₂ &amp; N₂: IR İnaktif (Paramanyetik Gerekir)
            </span>
          </div>

          <svg
            viewBox="0 0 560 198"
            className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
            role="img"
            aria-label="CO2, N2O ve volatil anesteziklerin 3 ile 13 mikrometre arası kızılötesi soğurma spektrumu"
          >
            {/* Fingerprint Region Highlight (8 - 12 um) */}
            <rect x="300" y="18" width="184" height="142" fill="#f59e0b" fillOpacity="0.1" />
            <text x="392" y="33" textAnchor="middle" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#fbbf24">
              8 – 12 µm Parmak İzi Bölgesi (Auto-ID)
            </text>

            {/* Axes */}
            <line x1="40" y1="160" x2="538" y2="160" stroke="#334155" strokeWidth="1.2" />
            {[3, 4, 5, 6, 8, 10, 12].map((um) => {
              const x = 40 + ((um - 2.5) / 10.5) * 488;
              return (
                <g key={um}>
                  <line x1={x} y1="160" x2={x} y2="165" stroke="#475569" strokeWidth="1" />
                  <text x={x} y="178" textAnchor="middle" fontSize="9.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                    {um} µm
                  </text>
                </g>
              );
            })}

            {/* 3.3 um Legacy Volatile + Alcohol overlap peak */}
            <path d="M 62 160 Q 77 72, 92 160" fill="#64748b" fillOpacity="0.28" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="77" y="102" textAnchor="middle" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">3.3 µm</text>
            <text x="77" y="114" textAnchor="middle" fontSize="8" fill="#64748b">Eski (Alkol!)</text>

            {/* 4.26 um CO2 sharp peak */}
            <path d="M 112 160 Q 122 36, 132 160" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2.2" />
            <text x="122" y="48" textAnchor="middle" fontSize="9.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#34d399">
              CO₂ (4.26)
            </text>

            {/* 4.5 um N2O peak (adjacent to CO2 -> collision broadening) */}
            <path d="M 134 160 Q 146 62, 160 160" fill="#818cf8" fillOpacity="0.3" stroke="#818cf8" strokeWidth="2" />
            <text x="166" y="76" textAnchor="start" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#a5b4fc">
              N₂O (4.5)
            </text>

            {/* Fingerprint region distinct agent peaks (Sevo / Iso / Des) */}
            <path d="M 316 160 Q 336 62, 354 160" fill="#eab308" fillOpacity="0.32" stroke="#eab308" strokeWidth="2.2" />
            <text x="335" y="72" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#facc15">
              SEV
            </text>

            <path d="M 366 160 Q 388 54, 410 160" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2.2" />
            <text x="388" y="64" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#c084fc">
              ISO
            </text>

            <path d="M 418 160 Q 444 58, 470 160" fill="#0ea5e9" fillOpacity="0.3" stroke="#0ea5e9" strokeWidth="2.2" />
            <text x="444" y="68" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#38bdf8">
              DES
            </text>

            {/* Footer note */}
            <text x="280" y="192" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#94a3b8">
              Modern analizörler 5+ dar optik filtreyle 8–12 µm’de her ajanı ayrı tanır · O₂ ayrı paramanyetik hücrede ölçülür
            </text>
          </svg>
        </div>

        {/* Sensor Technology Comparison Table */}
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
                <th className="py-3 px-4 font-semibold">Sensör Teknolojisi</th>
                <th className="py-3 px-4 font-semibold">Ölçülen Gazlar</th>
                <th className="py-3 px-4 font-semibold">Yanıt Hızı</th>
                <th className="py-3 px-4 font-semibold">Klinik Önem</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {SENSOR_TECH_ROWS.map((row) => (
                <tr key={row.tech} className="align-top">
                  <td className={`py-2.5 px-4 font-semibold min-w-[190px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.tech}
                  </td>
                  <td className="py-2.5 px-4 font-mono tabular-nums min-w-[165px]">{row.gases}</td>
                  <td className="py-2.5 px-4 min-w-[155px]">{row.response}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[235px] text-slate-500 dark:text-slate-400">
                    {row.keyNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI MAC-AGE HESAPLAYICI VE Fi-Et MULTİGAZ LABORATUVARI          */}
      {/* ===================================================================== */}
      <section id="mg-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı Multigaz Ekranı, Mapleson MAC-Age ve Fi–Et Denge Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Aynı <strong>EtAA%</strong> değeri 25 yaşındaki hastada yüzeyel kalırken 82 yaşındaki hastada derin aşırı doza
            dönüşür (<em>Mapleson 1996: 40 yaş sonrası her 10 yılda MAC ~%6 azalır</em>). Aşağıda volatil ajan, yaş, Fi–Et
            farkı ve N₂O katkısını değiştirerek <strong>MAC-Age</strong> ve nefes bazlı ajan dalgasını inceleyin.
          </p>
        </div>

        {/* 5 Clinical Scenario Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'standard_maint', label: 'İdeal İdame (40y · Sevo)' },
            { id: 'elderly_overdose', label: 'Geriatrik Aşırı Doz (82y)' },
            { id: 'low_mac_awareness', label: 'Farkındalık Riski (< 0.7 MAC)' },
            { id: 'n2o_des_balanced', label: 'Desfluran + %50 N₂O' },
            { id: 'low_flow_hypoxia', label: 'Düşük Akım Hipoksi (FiO₂ %24)' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as MultigasPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-amber-600 border-amber-500 text-white'
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
            {/* 4-Tile Multigas Monitor Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Volatile Agent */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span className={`font-bold ${agent.badgeTextClass}`}>{agent.shortName}</span>
                  <span className="font-mono text-[10px]">Fi %{fiAgent.toFixed(2)}</span>
                </div>
                <div className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${agent.badgeTextClass}`}>
                  Et %{etAgent.toFixed(2)}
                </div>
                <div className="mt-1.5 text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Fi−Et: {sim.fiEtDiff >= 0 ? `+${sim.fiEtDiff.toFixed(2)}%` : `${sim.fiEtDiff.toFixed(2)}%`}
                </div>
              </div>

              {/* MAC-Age */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.totalMacAge < 0.7
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : sim.totalMacAge >= 1.35
                      ? isDark
                        ? 'bg-amber-950/30 border-amber-500/50'
                        : 'bg-amber-50 border-amber-300'
                      : isDark
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>MAC-Age</span>
                  <span className="font-mono text-[10px]">{age} yaş</span>
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.totalMacAge < 0.7
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.totalMacAge >= 1.35
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.totalMacAge.toFixed(2)}
                </div>
                <div className="mt-1.5 text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Ham 40y: {sim.rawMac40.toFixed(2)}
                </div>
              </div>

              {/* O2 Paramagnetic */}
              <div
                className={`p-3 rounded-lg border ${
                  fiO2 < 28
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>O₂ (Param.)</span>
                  <span className="font-mono text-[10px]">Fi %{fiO2}</span>
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    fiO2 < 28 ? 'text-rose-600 dark:text-rose-400' : 'text-sky-600 dark:text-sky-400'
                  }`}
                >
                  Et %{sim.etO2}
                </div>
                <div className="mt-1.5 text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  {sim.etO2 >= 85 ? 'Denitrojenize' : fiO2 < 28 ? 'HİPOKSİK!' : `ΔO₂ %${fiO2 - sim.etO2}`}
                </div>
              </div>

              {/* N2O */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>N₂O</span>
                  <span className="font-mono text-[10px]">Additif</span>
                </div>
                <div className="mt-1 text-2xl font-mono font-bold tabular-nums leading-none text-indigo-600 dark:text-indigo-400">
                  %{etN2o}
                </div>
                <div className="mt-1.5 text-[10px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  +{sim.n2oMacAge.toFixed(2)} MAC
                </div>
              </div>
            </div>

            {/* SVG 1: Breath-by-Breath Volatile Agent Waveform */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Nefes Bazlı {agent.name} Trasesi (Kapnogramın Tersi: İnspiryum = FiAA · Ekspiryum = EtAA)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  {sim.fiEtDiff >= 0.05 ? 'Doku Alımı (Fi > Et)' : sim.fiEtDiff <= -0.05 ? 'Atılım / Washout (Et > Fi)' : 'Denge (Fi ≈ Et)'}
                </span>
              </div>

              <svg
                viewBox="0 0 560 132"
                className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
                role="img"
                aria-label="Volatil anestezik ajan inspiratuvar ve ekspiratuvar dalga formu"
              >
                {/* Reference lines */}
                <line x1="44" y1={agentWavePath.yFi} x2="540" y2={agentWavePath.yFi} stroke={agent.accentHex} strokeDasharray="3 3" strokeOpacity="0.45" />
                <line x1="44" y1={agentWavePath.yEt} x2="540" y2={agentWavePath.yEt} stroke="#10b981" strokeDasharray="3 3" strokeOpacity="0.45" />

                <text x="38" y={agentWavePath.yFi + 3} textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill={agent.accentHex}>
                  Fi
                </text>
                <text x="38" y={agentWavePath.yEt + 3} textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="#34d399">
                  Et
                </text>

                <path
                  d={agentWavePath.path}
                  fill="none"
                  stroke={agent.accentHex}
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />

                <text x="110" y="126" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                  İnspiryum (Fi %{fiAgent.toFixed(2)})
                </text>
                <text x="275" y="126" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#34d399">
                  Ekspiryum Platosu (Et %{etAgent.toFixed(2)})
                </text>
                <text x="460" y="126" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                  MAC-Awake ≈ %{sim.macAwakeAtAge.toFixed(2)}
                </text>
              </svg>
            </div>

            {/* SVG 2: Nickalls & Mapleson Age-Related Iso-MAC Chart */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Nickalls &amp; Mapleson Yaş–MAC Eğrisi ({agent.name} · 1.0 MAC@{age}y = %{sim.mac10AtAge.toFixed(2)})
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  MAC_40 = %{agent.mac40.toFixed(2)} · λ(kan/gaz) = {agent.bloodGas}
                </span>
              </div>

              <svg
                viewBox="0 0 560 150"
                className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
                role="img"
                aria-label="Yaşa göre düzeltilmiş iso-MAC eğrisi ve mevcut hasta konumu"
              >
                {/* X-axis age markers */}
                {[20, 40, 60, 80].map((a) => {
                  const x = 48 + ((a - 10) / 85) * 488;
                  return (
                    <g key={a}>
                      <line x1={x} y1="18" x2={x} y2="126" stroke="#1e293b" strokeWidth="1" />
                      <text x={x} y="142" textAnchor="middle" fontSize="9.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                        {a} yaş
                      </text>
                    </g>
                  );
                })}

                {/* Iso-MAC curves */}
                <path d={isoMacSvg.line13} fill="none" stroke="#f59e0b" strokeWidth="1.3" strokeDasharray="4 3" />
                <path d={isoMacSvg.line10} fill="none" stroke="#10b981" strokeWidth="2.2" />
                <path d={isoMacSvg.line07} fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 3" />
                <path d={isoMacSvg.lineAwake} fill="none" stroke="#64748b" strokeWidth="1.1" strokeDasharray="2 3" />

                {/* Labels on right edge */}
                <text x="532" y="42" textAnchor="end" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#fbbf24">1.3 MAC (Derin)</text>
                <text x="532" y="64" textAnchor="end" fontSize="8.5" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#34d399">1.0 MAC</text>
                <text x="532" y="84" textAnchor="end" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#fb7185">0.7 MAC (Eşik)</text>
                <text x="532" y="109" textAnchor="end" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">MAC-Awake</text>

                {/* Live Patient Operating Point */}
                <circle
                  cx={isoMacSvg.ptX}
                  cy={isoMacSvg.ptY}
                  r="6"
                  fill={sim.status === 'optimal' ? '#10b981' : sim.status === 'critical' ? '#f43f5e' : '#f59e0b'}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={Math.min(470, Math.max(82, isoMacSvg.ptX))}
                  y={Math.max(26, isoMacSvg.ptY - 10)}
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="700"
                  fontFamily="ui-monospace, monospace"
                  fill="#ffffff"
                >
                  {sim.totalMacAge.toFixed(2)} MAC
                </text>
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
                <Sliders className="w-4 h-4 text-amber-500" />
                <span>Multigaz &amp; Hasta Kontrolleri</span>
              </div>

              {/* Agent Selector */}
              <div className="grid grid-cols-3 gap-1.5">
                {(['sevo', 'des', 'iso'] as VolatileAgentId[]).map((id) => {
                  const a = AGENTS[id];
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleAgentSwitch(id)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                        agentId === id
                          ? isDark
                            ? 'bg-slate-800 border-amber-500 text-white'
                            : 'bg-slate-900 border-slate-900 text-white'
                          : isDark
                            ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {a.name}
                    </button>
                  );
                })}
              </div>

              {/* Age */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="mg-age" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Hasta Yaşı
                  </label>
                  <span className="font-mono tabular-nums font-bold text-slate-900 dark:text-white">{age} yaş</span>
                </div>
                <input
                  id="mg-age"
                  type="range"
                  min={10}
                  max={95}
                  step={1}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* FiAgent */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="mg-fi" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    İnspiratuvar {agent.shortName} (FiAA)
                  </label>
                  <span className={`font-mono tabular-nums font-bold ${agent.badgeTextClass}`}>
                    %{fiAgent.toFixed(2)}
                  </span>
                </div>
                <input
                  id="mg-fi"
                  type="range"
                  min={0}
                  max={agent.maxSlider}
                  step={0.1}
                  value={fiAgent}
                  onChange={(e) => setFiAgent(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* EtAgent */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="mg-et" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Ekspiratuvar {agent.shortName} (EtAA)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-emerald-600 dark:text-emerald-400">
                    %{etAgent.toFixed(2)}
                  </span>
                </div>
                <input
                  id="mg-et"
                  type="range"
                  min={0}
                  max={agent.maxSlider}
                  step={0.1}
                  value={etAgent}
                  onChange={(e) => setEtAgent(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* EtN2O */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="mg-n2o" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    EtN₂O (Azot Protoksit)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-indigo-600 dark:text-indigo-400">%{etN2o}</span>
                </div>
                <input
                  id="mg-n2o"
                  type="range"
                  min={0}
                  max={70}
                  step={5}
                  value={etN2o}
                  onChange={(e) => setEtN2o(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* FiO2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="mg-fio2" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    FiO₂ (İnspiratuvar O₂)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-sky-600 dark:text-sky-400">%{fiO2}</span>
                </div>
                <input
                  id="mg-fio2"
                  type="range"
                  min={21}
                  max={100}
                  step={1}
                  value={fiO2}
                  onChange={(e) => setFiO2(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
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
                <span>{sim.headline}</span>
              </div>
              <p>{sim.action}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 03. SIDESTREAM ÖRNEKLEME MİMARİSİ VE DÜŞÜK AKIMLI ANESTEZİ            */}
      {/* ===================================================================== */}
      <section id="mg-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. Sidestream Örnekleme Hattı, Su Tutucu ve Düşük Akım Güvenliği
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Multigaz modülleri neredeyse tamamen <strong>sidestream</strong> çalışır ve Y-parçasından dakikada{' '}
            <strong>150–200 mL</strong> gaz emer. Bu hattın doğru bağlanması ve taze gaz akımıyla ilişkisi düşük akımlı
            anestezinin temel emniyet kilididir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Sampling Line Architecture SVG */}
          <div
            className={`lg:col-span-6 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <svg
              viewBox="0 0 460 206"
              className="w-full h-auto"
              role="img"
              aria-label="HMEF filtre temiz tarafından multigaz örnekleme hattı, su tutucu ve optik tezgah bağlantısı"
            >
              {/* Patient ETT -> HMEF -> Y-Piece */}
              <rect x="18" y="34" width="76" height="34" rx="6" fill={isDark ? '#1e293b' : '#e2e8f0'} stroke={isDark ? '#475569' : '#94a3b8'} />
              <text x="56" y="54" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>Hasta / ETT</text>

              <line x1="94" y1="51" x2="122" y2="51" stroke="#38bdf8" strokeWidth="3" />

              {/* HMEF Filter */}
              <rect x="122" y="28" width="90" height="46" rx="8" fill="#0ea5e9" fillOpacity="0.18" stroke="#0ea5e9" strokeWidth="2" />
              <text x="167" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill={isDark ? '#38bdf8' : '#0369a1'}>HMEF Filtre</text>
              <text x="167" y="63" textAnchor="middle" fontSize="8.5" fill={isDark ? '#bae6fd' : '#0284c7'}>Nem &amp; Bakteri</text>

              <line x1="212" y1="51" x2="254" y2="51" stroke="#38bdf8" strokeWidth="3" />

              {/* Sampling Port on Machine Side of HMEF */}
              <circle cx="228" cy="51" r="6" fill="#10b981" />
              <text x="228" y="20" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#10b981">
                Doğru Port (Temiz Taraf)
              </text>
              <line x1="228" y1="24" x2="228" y2="44" stroke="#10b981" strokeWidth="1.2" />

              {/* Y-Piece */}
              <rect x="254" y="34" width="110" height="34" rx="6" fill={isDark ? '#1e293b' : '#f1f5f9'} stroke={isDark ? '#475569' : '#94a3b8'} />
              <text x="309" y="54" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#e2e8f0' : '#334155'}>Y-Parçası / Devre</text>

              {/* Sample Line Down to Water Trap */}
              <path d="M 228 57 L 228 112 L 170 112" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="5 3" />
              <text x="292" y="96" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#f59e0b">
                150–200 mL/dk · Nafion / Sample Line
              </text>

              {/* Water Trap */}
              <rect x="74" y="94" width="96" height="38" rx="6" fill="#f59e0b" fillOpacity="0.16" stroke="#f59e0b" strokeWidth="1.6" />
              <text x="122" y="111" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#fcd34d' : '#b45309'}>Su Tutucu</text>
              <text x="122" y="124" textAnchor="middle" fontSize="8" fill={isDark ? '#fde68a' : '#92400e'}>Hidrofobik Filtre</text>

              <line x1="122" y1="132" x2="122" y2="156" stroke="#f59e0b" strokeWidth="2" />

              {/* Optical Bench + Paramagnetic O2 */}
              <rect x="30" y="156" width="212" height="38" rx="6" fill={isDark ? '#0f172a' : '#ffffff'} stroke="#6366f1" strokeWidth="1.8" />
              <text x="136" y="173" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#a5b4fc' : '#4338ca'}>
                NDIR Optik Küvet + Paramanyetik O₂
              </text>
              <text x="136" y="186" textAnchor="middle" fontSize="8" fill={isDark ? '#94a3b8' : '#64748b'}>
                CO₂ · N₂O · SEV/DES/ISO · FiO₂/EtO₂
              </text>

              {/* Exhaust Return to Scavenging or Circle System */}
              <path d="M 242 175 L 330 175 L 330 68" fill="none" stroke="#10b981" strokeWidth="1.8" strokeDasharray="4 3" />
              <rect x="278" y="126" width="164" height="32" rx="6" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeWidth="1.2" />
              <text x="360" y="140" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={isDark ? '#6ee7b7' : '#047857'}>
                Düşük Akımda Devreye Dönüş
              </text>
              <text x="360" y="152" textAnchor="middle" fontSize="7.8" fill={isDark ? '#a7f3d0' : '#065f46'}>
                veya Atık Gaz (Scavenging)
              </text>
            </svg>
          </div>

          <div className="lg:col-span-6 space-y-3">
            {[
              {
                title: '1. Örnekleme Portu Daima HMEF’in Makine (Temiz) Tarafında Olmalı',
                body: 'Hasta tarafına takılırsa sekresyon ve yoğunlaşan su saniyeler içinde su tutucuyu tıkar; gaz analizi ve kapnografi aynı anda kaybolur. Port yukarı bakacak şekilde konumlandırılmalıdır.',
              },
              {
                title: '2. Preoksijenasyonun Gerçek Hedefi: EtO₂ ≥ %85–90',
                body: 'SpO₂ %100 iken bile akciğerlerde (FRC) yüksek oranda nitrojen kalmış olabilir. Paramanyetik sensörden okunan EtO₂ ≥ %85–90 güvenli apne süresini kanıtlayan gerçek denitrojenasyon göstergesidir.',
              },
              {
                title: '3. Düşük / Minimal Akım (≤ 1.0 L/dk) Multigazsız Uygulanamaz',
                body: 'FGF 0.5–1.0 L/dk iken vaporizatör kadranındaki % (FD) ile hastanın gerçekten soluduğu FiAA arasında belirgin fark doğar ve hipoksik karışım riski artar (Feldman 2012). Canlı FiO₂ + EtAA izlemi zorunludur.',
              },
              {
                title: '4. Gaz Geri Dönüşü (Sample Gas Return) ve Çevresel Etki',
                body: '200 mL/dk örneklenen gazı tekrar solunum devresine iade eden modern iş istasyonları, minimal akımda devre hacim kaybını ve sera gazı salınımını (özellikle yüksek GWP’li Desfluran ve N₂O) belirgin azaltır.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. TUZAKLAR, YANLIŞ AJAN TANIMA VE MAC'I DEĞİŞTİREN FAKTÖRLER        */}
      {/* ===================================================================== */}
      <section id="mg-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. Klinik Tuzaklar, Yanlış Ajan Tanıma ve MAC’ı Değiştiren Faktörler
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Ekrandaki <strong>MAC</strong> değeri yalnızca solunan gazların yaşa göre aritmetik toplamıdır; intravenöz
            ilaçları, fizyolojik MAC değiştiricilerini ve gaz karışım artefaktlarını otomatik bilemez.
          </p>
        </div>

        {/* 4 Pitfall Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. Karışık Ajan (Mixed Agent) ve Etanol/Aseton Artefaktı',
              tone: 'amber',
              body: 'Yanlış dolum (ör. Sevofluran vaporizatörüne İzofluran konması) veya iki vaporizatörün ardışık açılması “MIXED AGENT” alarmı verir ve toplam MAC doğruluğunu bozar. Eski 3.3 µm cihazlarda etanol, diyabetik ketoasidoz (aseton) veya bağırsak metanı sahte volatil okunabilir.',
            },
            {
              title: '2. İntravenöz İlaçlar MAC Ekranında Görünmez!',
              tone: 'rose',
              body: 'Multigaz analizörü propofol, remifentanil, fentanil, ketamin veya deksmedetomidini GÖREMEZ. Remifentanil infüzyonu altındaki hastada 0.7 MAC-Age klinik olarak 1.1–1.2 MAC derinliğinde olabilir; tersine TIVA hastasında ekran MAC = 0.0 yazar (pEEG/BIS/PSI gerekir).',
            },
            {
              title: '3. Histerezis: EtAA ≠ Anlık Beyin Konsantrasyonu',
              tone: 'sky',
              body: 'İndüksiyonun veya uyanmanın hızlı değişim anlarında alveol (EtAA) ile beyin (efektör kompartman) arasında dakikalar süren gecikme vardır. Ciddi V/Q bozukluğu veya ölü boşluk artışında EtAA gerçek arteriyel konsantrasyonu düşük gösterebilir.',
            },
            {
              title: '4. Yüksek Rakım & Çarpışma Genişlemesi (Collision Broadening)',
              tone: 'amber',
              body: 'Anestezi etkisini hacim yüzdesi (%) değil parsiyel basınç (mmHg) belirler. Ayrıca yüksek N₂O veya O₂ molekülleri CO₂/ajan IR soğurma bantlarını genişletir; modern cihazlar bunu çapraz düzeltir ancak tıkalı su tutucu/sıfırlama hatası tüm kanalları kaydırır.',
            },
          ].map((trap) => (
            <div
              key={trap.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                trap.tone === 'rose'
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-500/35'
                    : 'bg-rose-50/70 border-rose-200'
                  : trap.tone === 'amber'
                    ? isDark
                      ? 'bg-amber-950/20 border-amber-500/35'
                      : 'bg-amber-50/70 border-amber-200'
                    : isDark
                      ? 'bg-sky-950/20 border-sky-500/35'
                      : 'bg-sky-50/70 border-sky-200'
              }`}
            >
              <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{trap.title}</div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{trap.body}</p>
            </div>
          ))}
        </div>

        {/* MAC Modifiers 3-Column Reference Table */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-emerald-950/15 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200'}`}>
            <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">MAC’ı AZALTANLAR (İhtiyaç ↓)</div>
            <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>İleri yaş</strong> (40 yaş sonrası her 10 yılda ~%6 ↓)</li>
              <li>• <strong>Hipotermi</strong> (her −1°C’de ~%5 ↓)</li>
              <li>• <strong>Gebelik</strong> (~%25–40 ↓)</li>
              <li>• <strong>Akut etanol</strong> alımı, Opioidler, α₂-agonistler (Deksmedetomidin), Propofol, Benzodiazepinler</li>
              <li>• Şiddetli hipotansiyon, hipoksemi (PaO₂ &lt; 40), ağır anemi (Hct &lt; %10), hiponatremi, lityum</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-rose-950/15 border-rose-500/30' : 'bg-rose-50/60 border-rose-200'}`}>
            <div className="text-xs font-bold text-rose-700 dark:text-rose-400">MAC’ı ARTIRANLAR (İhtiyaç ↑)</div>
            <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>İnfant / Genç yaş</strong> (en yüksek ~6 aylıkta)</li>
              <li>• <strong>Hipertermi / Ateş</strong> (&gt; 42°C hariç)</li>
              <li>• <strong>Kronik alkolizm</strong> (çapraz tolerans)</li>
              <li>• <strong>Akut sempatomimetikler</strong> (kokain, amfetamin, efedrin — santral katekolamin ↑)</li>
              <li>• <strong>Hipernatremi</strong> (BOS Na⁺ artışı) ve kızıl saç (MC1R varyantı ~%15–20 ↑)</li>
            </ul>
          </div>

          <div className={`rounded-xl border p-4 space-y-2 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>MAC’ı DEĞİŞTİRMEYENLER</div>
            <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li>• <strong>Cinsiyet</strong> ve vücut ağırlığı / obezite</li>
              <li>• <strong>Anestezi süresi</strong> (uzun ameliyat MAC’ı değiştirmez)</li>
              <li>• <strong>Tiroid hastalıkları</strong> (hasta normotermikse)</li>
              <li>• Hafif–orta hiperkapni (PaCO₂ &lt; 95 mmHg) veya hafif anemi</li>
              <li>• Kan basıncı (otoregülasyon aralığı içinde) ve K⁺ değişiklikleri</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. KLİNİK UYGULAMA AKIŞI (BAG-RECALL) VE AKADEMİK KAYNAKLAR          */}
      {/* ===================================================================== */}
      <section id="mg-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. Ameliyathane 4-Fazlı Multigaz Kontrol Akışı ve Temel Kanıtlar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <strong>BAG-RECALL</strong> çalışması (Avidan 2011 · NEJM, n=6.041), volatil anestezide sesli{' '}
            <strong>ETAG ≥ 0.7 MAC-Age</strong> alarm protokolünün intraoperatif farkındalığı önlemede tek başına BIS
            kadar güçlü olduğunu göstermiştir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              step: '01',
              phase: 'Preoksijenasyon',
              rule: 'EtO₂ ≥ %85–90 Hedefle',
              detail: 'SpO₂’ye değil paramanyetik EtO₂ değerine bak; maske kaçağı varsa EtO₂ %80’in üstüne çıkamaz.',
            },
            {
              step: '02',
              phase: 'İndüksiyon & Yaş Girişi',
              rule: 'MAC-Age Aktif + Fi–Et Takibi',
              detail: 'Hasta yaşını monitöre mutlaka gir. İnsizyon öncesi Fi–Et farkının daraldığını ve ≥ 0.8–1.0 MAC-Age’i doğrula.',
            },
            {
              step: '03',
              phase: 'İdame & Düşük Akım',
              rule: 'Alarm ≥ 0.7 MAC · FiO₂ ≥ %30',
              detail: 'BAG-RECALL farkındalık alt sınırını (0.7 MAC-Age) ve düşük akımda FiO₂ alt alarmını açık tut; geriatrik hastada > 1.2 MAC’tan kaçın.',
            },
            {
              step: '04',
              phase: 'Uyanma (Washout)',
              rule: 'EtAA < 0.1–0.2 MAC (< Awake)',
              detail: 'Vaporizatör kapandıktan sonra EtAA > FiAA ters gradyanıyla atılımı izle; ekstübasyon öncesi MAC-Awake altını doğrula.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{item.step}.</span>
                <span className="text-[11px] font-medium text-slate-400">{item.phase}</span>
              </div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.rule}</div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* High-Yield Clinical Reminder */}
        <div
          className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
            isDark
              ? 'bg-slate-900/60 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>Klinik Özet:</strong> Multigaz monitörizasyonu
            aynı anda üç temel hasta güvenliği işlevi görür: (1) <strong>Farkındalıktan koruma</strong> (ETAG ≥ 0.7
            MAC-Age), (2) <strong>Geriatrik aşırı dozun önlenmesi</strong> (yaşa göre düzeltilmiş MAC), (3){' '}
            <strong>Hipoksik gaz karışımı ve yanlış vaporizatör dolumunun</strong> (Mixed Agent) anlık saptanması.
          </div>
        </div>

        {/* References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/60 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-amber-500" />
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
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline shrink-0"
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
