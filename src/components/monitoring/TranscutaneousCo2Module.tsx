import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Flame,
  ShieldAlert,
  Sliders,
} from 'lucide-react';

interface TranscutaneousCo2ModuleProps {
  isDark: boolean;
}

type AirwayMode = 'ett' | 'niv_sedation' | 'jet_hfov';

type TcPresetId =
  | 'normal_stable'
  | 'olv_thoracic'
  | 'jet_ventilation'
  | 'osas_sedation'
  | 'vasopressor_shock'
  | 'low_temp_sensor';

const COMPARISON_ROWS = [
  {
    feature: 'Ölçüm Yöntemi & İnvazivite',
    tcco2: 'Isıtılmış cilt elektrodu (Stow–Severinghaus) · Non-invaziv, sürekli',
    etco2: 'Solunum gazı IR (4.26 µm) · Non-invaziv, nefesten nefese',
    paco2: 'Arteriyel kan gazı (AKG) · İnvaziv, anlık kesit (altın standart)',
  },
  {
    feature: 'Yanıt Hızı (Lag Time)',
    tcco2: 'Yavaş (1–3 dk fizyolojik diffüzyon gecikmesi; ilk ısınma 5–10 dk)',
    etco2: 'Anlık (< 1 sn) — ani apne ve entübasyon için tek standart',
    paco2: 'Örnekleme & analiz süresi (2–5 dk, sürekli değil)',
  },
  {
    feature: 'Ölü Boşluk / V/Q Şant Etkisi',
    tcco2: 'Etkilenmez! OLV, KOAH, ARDS ve pediatrik şantta PaCO₂’ye yakın',
    etco2: 'Belirgin etkilenir (PaCO₂ − EtCO₂ farkı 10–25 mmHg’ye açılır)',
    paco2: 'Doğrudan arteriyel referans',
  },
  {
    feature: 'Jet / HFOV / NIV / Sedasyon',
    tcco2: 'Mükemmel — kapalı devre veya entübasyon gerektirmez',
    etco2: 'Jet/HFOV’da ölçülemez; NIV/maskede kaçakla yalancı düşük',
    paco2: 'Tekrarlayan ponksiyon / arter hattı gerekir',
  },
  {
    feature: 'Şok & Vazopresör Duyarlılığı',
    tcco2: 'Yüksek! Dermal hipoperfüzyonda doku CO₂ göllenmesi → SAHTE YÜKSEK',
    etco2: 'Düşük pulmoner perfüzyon nedeniyle EtCO₂ düşer',
    paco2: 'Periferik vazokonstriksiyondan etkilenmez',
  },
  {
    feature: 'En Önemli Güvenlik Riski',
    tcco2: 'Termal cilt yanığı (42–44 °C · düzenli yer değişimi zorunlu)',
    etco2: 'Su tutucu tıkanması / örnekleme hattı kopması',
    paco2: 'Hematom, iskemi, enfeksiyon, pediatride iyatrojenik anemi',
  },
];

const THERMAL_SAFETY_ROWS = [
  {
    group: 'Erişkin — Standart (Kulak Memesi / Göğüs)',
    temp: '42.0 – 43.0 °C',
    maxDuration: '4 – 8 saat (42 °C kulak memesinde ≤ 8 sa)',
    note: 'Erişkinde hız ve güvenlik dengesi en iyi aralık. Her yer değişiminde eritem kontrolü yap.',
  },
  {
    group: 'Erişkin — Maksimum Arteriyelizasyon',
    temp: '44.0 °C',
    maxDuration: '2 – 4 saat',
    note: 'Hızlı yanıt sağlar ancak termal yanık riski artar; kırılgan yaşlı ciltte ve pediatride kaçın.',
  },
  {
    group: 'Pediatrik & Kırılgan / Yaşlı Cilt',
    temp: '40.0 – 41.0 °C',
    maxDuration: '2 – 4 saat',
    note: 'İnce epidermis nedeniyle düşük sıcaklık seçilir; yanık riskini azaltmak için sık rotasyon gerekir.',
  },
  {
    group: 'Preterm / Yenidoğan (YYBÜ)',
    temp: '39.0 – 40.0 °C',
    maxDuration: '1 – 2 saat',
    note: 'Yenidoğan cildi termal hasara çok hassastır. Yapışkan sökülürken cilt bütünlüğü korunmalıdır.',
  },
];

const REFERENCES = [
  {
    authors: 'Oshibuchi M, Cho S, Hara T, Tomiyasu S, Makita T, Sumikawa K.',
    title: 'A comparative evaluation of transcutaneous and end-tidal measurements of CO2 in thoracic anesthesia.',
    journal: 'Anesth Analg. 2003;97(3):776–779.',
    pmid: '12933401',
  },
  {
    authors: 'Eberhard P.',
    title: 'The design, use, and results of transcutaneous carbon dioxide analysis: current and future directions.',
    journal: 'Anesth Analg. 2007;105(6 Suppl):S48–S52.',
    pmid: '18048898',
  },
  {
    authors: 'Tobias JD.',
    title: 'Transcutaneous carbon dioxide monitoring in infants and children.',
    journal: 'Paediatr Anaesth. 2009;19(5):434–444.',
    pmid: '19236597',
  },
  {
    authors: 'Restrepo RD, Hirst KR, Wittnebel L, Wettstein R (AARC).',
    title: 'AARC Clinical Practice Guideline: Transcutaneous monitoring of carbon dioxide and oxygen: 2012.',
    journal: 'Respir Care. 2012;57(11):1955–1962.',
    pmid: '23107301',
  },
  {
    authors: 'Conway A, Tipton E, Liu WH, et al.',
    title: 'Accuracy and precision of transcutaneous carbon dioxide monitoring: a systematic review and meta-analysis.',
    journal: 'Thorax. 2019;74(2):157–163.',
    pmid: '30209079',
  },
];

export const TranscutaneousCo2Module: React.FC<TranscutaneousCo2ModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<TcPresetId>('normal_stable');
  const [airwayMode, setAirwayMode] = useState<AirwayMode>('ett');
  const [paco2, setPaco2] = useState<number>(40); // mmHg (28..80)
  const [deadSpacePct, setDeadSpacePct] = useState<number>(30); // % (25..70)
  const [perfusionPct, setPerfusionPct] = useState<number>(95); // % (15..100)
  const [sensorTemp, setSensorTemp] = useState<number>(42.0); // °C (39.0..44.0)

  const applyPreset = (preset: TcPresetId) => {
    setActivePreset(preset);
    if (preset === 'normal_stable') {
      setAirwayMode('ett');
      setPaco2(40);
      setDeadSpacePct(30);
      setPerfusionPct(95);
      setSensorTemp(42.0);
    } else if (preset === 'olv_thoracic') {
      setAirwayMode('ett');
      setPaco2(49);
      setDeadSpacePct(58);
      setPerfusionPct(92);
      setSensorTemp(42.0);
    } else if (preset === 'jet_ventilation') {
      setAirwayMode('jet_hfov');
      setPaco2(56);
      setDeadSpacePct(42);
      setPerfusionPct(90);
      setSensorTemp(42.5);
    } else if (preset === 'osas_sedation') {
      setAirwayMode('niv_sedation');
      setPaco2(64);
      setDeadSpacePct(35);
      setPerfusionPct(94);
      setSensorTemp(42.0);
    } else if (preset === 'vasopressor_shock') {
      setAirwayMode('ett');
      setPaco2(42);
      setDeadSpacePct(40);
      setPerfusionPct(22);
      setSensorTemp(42.0);
    } else if (preset === 'low_temp_sensor') {
      setAirwayMode('ett');
      setPaco2(46);
      setDeadSpacePct(32);
      setPerfusionPct(88);
      setSensorTemp(39.0);
    }
  };

  // Physiological PaCO2 / TcCO2 / EtCO2 Simulation
  const sim = useMemo(() => {
    // 1. EtCO2 depends on airway mode and alveolar dead space (Vd/Vt)
    let etco2: number | null = null;
    if (airwayMode === 'ett') {
      // Normal Vd/Vt ~30% -> Pa-EtCO2 ~3-4 mmHg; high Vd/Vt (60%) -> gap widens to ~14-16 mmHg
      const paEtGap = Math.max(2, Math.round(3 + (deadSpacePct - 28) * 0.42 + (perfusionPct < 45 ? (45 - perfusionPct) * 0.25 : 0)));
      etco2 = Math.max(12, paco2 - paEtGap);
    } else if (airwayMode === 'niv_sedation') {
      // Mask dilution/leak causes EtCO2 to markedly underestimate PaCO2
      const maskGap = Math.round(14 + (deadSpacePct - 25) * 0.35 + (paco2 > 50 ? (paco2 - 50) * 0.45 : 0));
      etco2 = Math.max(14, paco2 - maskGap);
    } else {
      // Jet ventilation / HFOV: no continuous end-tidal plateau available
      etco2 = null;
    }

    // 2. TcCO2 depends on PaCO2, dermal perfusion (shock -> venous stasis -> FALSE HIGH!), and sensor heating
    // Normal Severinghaus-corrected TcCO2 ≈ PaCO2 + 1 to +3 mmHg
    const shockStasisBias = perfusionPct < 55 ? Math.round(Math.pow((55 - perfusionPct) / 12, 1.85) * 2.4) : 0;
    const lowTempUnderRead = sensorTemp < 41.0 ? -Math.round((41.0 - sensorTemp) * 3.0) : 0;
    const baseBias = 2;

    const tcco2 = Math.max(18, paco2 + baseBias + shockStasisBias + lowTempUnderRead);
    const tcPaDiff = tcco2 - paco2;
    const paEtDiff = etco2 !== null ? paco2 - etco2 : null;

    // Estimated lag time (seconds) increases when sensor temp is low or perfusion is poor
    const lagSec = Math.round(75 + (42.5 - Math.min(42.5, sensorTemp)) * 35 + (100 - perfusionPct) * 1.4);

    // Heating power (mW) reflects local dermal blood flow (higher flow removes more heat -> higher mW required)
    const heatingPowerMw = Math.round(85 + perfusionPct * 2.4 + (sensorTemp - 39) * 28);

    // Clinical verdict
    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = `Yüksek Uyumlu Non-İnvaziv İzlem (TcCO₂ ${tcco2} vs PaCO₂ ${paco2} mmHg)`;
    let action =
      'Dermal arteriyelizasyon yeterli ve TcCO₂, gerçek arteriyel PaCO₂’yi ±3 mmHg içinde izliyor. Başlangıç AKG korelasyonu sonrası sürekli trend takibi güvenilirdir.';

    if (perfusionPct < 45) {
      status = 'critical';
      headline = `Tuzak: Dermal Hipoperfüzyonda SAHTE YÜKSEK TcCO₂ (${tcco2} vs PaCO₂ ${paco2} mmHg · +${tcPaDiff})`;
      action =
        'Şok veya yüksek doz vazopresör altında cilt kapiller akımı kesildiğinde yerel metabolik CO₂ yıkanamaz ve TcCO₂ gerçek PaCO₂’den +15–30 mmHg yüksek okunur! Düşen ısıtma gücüne (mW) dikkat edin ve karar öncesi AKG alın.';
    } else if (airwayMode === 'jet_hfov') {
      status = paco2 >= 50 ? 'warning' : 'optimal';
      headline = `Jet / HFOV’de Tek Sürekli Rehber: TcCO₂ ${tcco2} mmHg (EtCO₂ Ölçülemez)`;
      action =
        'Açık hava yolu veya yüksek frekanslı ventilasyonda kapnografi plato oluşturamaz. TcCO₂, yükselen hiperkapniyi (PaCO₂ ' +
        paco2 +
        ' mmHg) non-invaziv yakalar; frekans/sürüş basıncını veya kısa konvansiyonel solukları buna göre ayarlayın.';
    } else if (airwayMode === 'niv_sedation' && paco2 >= 50) {
      status = 'critical';
      headline = `Sessiz Hiperkapni Yakalandı! (TcCO₂ ${tcco2} vs Maske EtCO₂ ${etco2} mmHg)`;
      action =
        'Obezite/OSAS sedasyonunda veya NIV kaçağında maske EtCO₂’si gerçeği ciddi biçimde düşük gösterebilir. TcCO₂ belirgin hipoventilasyonu (PaCO₂ ' +
        paco2 +
        ' mmHg) SpO₂ düşmeden önce yakaladı — sedasyonu azaltın ve ventilasyonu destekleyin!';
    } else if (airwayMode === 'ett' && paEtDiff !== null && paEtDiff >= 10) {
      status = 'warning';
      headline = `Geniş Pa–EtCO₂ Farkı (Δ${paEtDiff} mmHg) — TcCO₂ (${tcco2}) Üstünlüğü`;
      action =
        `Tek akciğer ventilasyonu (OLV) veya yüksek ölü boşluk (%${deadSpacePct}) nedeniyle EtCO₂ (${etco2} mmHg) gerçek PaCO₂’yi (${paco2}) belirgin düşük gösteriyor. TcCO₂ (${tcco2} mmHg) alveoler ölü boşluktan etkilenmediği için çok daha doğrudur (Oshibuchi 2003).`;
    } else if (sensorTemp < 40.5) {
      status = 'warning';
      headline = `Yetersiz Sensör Isısı (${sensorTemp.toFixed(1)} °C) — Yavaş Yanıt (${lagSec} sn)`;
      action =
        'Düşük sensör sıcaklığı (preterm yenidoğan hariç) dermal arteriyelizasyonu zayıflatır ve yanıt süresini uzatır. Erişkinde 42–43 °C ayarı tercih edilir.';
    } else if (paco2 >= 55) {
      status = 'critical';
      headline = `Belirgin Hiperkapni (PaCO₂ ${paco2} · TcCO₂ ${tcco2} mmHg)`;
      action =
        'Dakika ventilasyonunu artırın, hava yolu direnci/bronkospazm veya yeniden soluma (FiCO₂) nedenlerini dışlayın ve 1–3 dk sonra TcCO₂ iniş trendini izleyin.';
    }

    return {
      etco2,
      tcco2,
      tcPaDiff,
      paEtDiff,
      lagSec,
      heatingPowerMw,
      status,
      headline,
      action,
    };
  }, [airwayMode, paco2, deadSpacePct, perfusionPct, sensorTemp]);

  // Live 15-minute Ventilation Step-Response Curve SVG (t=0..15 min, event at t=3 min)
  const curveSvg = useMemo(() => {
    const startX = 48;
    const endX = 538;
    const minVal = 20;
    const maxVal = 85;
    const mapY = (v: number) => 154 - ((Math.max(minVal, Math.min(maxVal, v)) - minVal) / (maxVal - minVal)) * 132;

    const baselinePa = 38;
    const baselineTc = 40;
    const baselineEt = airwayMode === 'jet_hfov' ? null : airwayMode === 'niv_sedation' ? 32 : 35;

    const steps = 60;
    const paPts: string[] = [];
    const tcPts: string[] = [];
    const etPts: string[] = [];

    const tauMin = Math.max(0.8, sim.lagSec / 60);

    for (let i = 0; i <= steps; i++) {
      const tMin = (i / steps) * 15;
      const x = startX + (i / steps) * (endX - startX);

      // Smooth arterial rise starting at t = 3 min (tau ~0.5 min)
      const paFrac = tMin <= 3 ? 0 : 1 - Math.exp(-(tMin - 3) / 0.6);
      const curPa = baselinePa + (paco2 - baselinePa) * paFrac;
      paPts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${mapY(curPa).toFixed(1)}`);

      // TcCO2 follows with physiological diffusion lag (tauMin = 1.2 - 3.5 min)
      const tcFrac = tMin <= 3.5 ? 0 : 1 - Math.exp(-(tMin - 3.5) / tauMin);
      const curTc = baselineTc + (sim.tcco2 - baselineTc) * tcFrac;
      tcPts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${mapY(curTc).toFixed(1)}`);

      // EtCO2 responds instantaneously (if measurable)
      if (sim.etco2 !== null && baselineEt !== null) {
        const etFrac = tMin <= 3 ? 0 : 1 - Math.exp(-(tMin - 3) / 0.25);
        const curEt = baselineEt + (sim.etco2 - baselineEt) * etFrac;
        etPts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${mapY(curEt).toFixed(1)}`);
      }
    }

    return {
      paPath: paPts.join(' '),
      tcPath: tcPts.join(' '),
      etPath: etPts.length > 0 ? etPts.join(' ') : null,
      endPaY: mapY(paco2),
      endTcY: mapY(sim.tcco2),
      endEtY: sim.etco2 !== null ? mapY(sim.etco2) : null,
      y45: mapY(45),
    };
  }, [airwayMode, paco2, sim.tcco2, sim.etco2, sim.lagSec]);

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
          <span className="text-teal-600 dark:text-teal-400 font-semibold">Non-İnvaziv Ventilasyon İzlemi</span>
          <span aria-hidden="true">·</span>
          <span>Stow–Severinghaus Elektrodu</span>
          <span aria-hidden="true">·</span>
          <span>TcCO₂ / PtcCO₂</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Transkütanöz Karbondioksit Monitörizasyonu (TcCO₂ / PtcCO₂)
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Transkütanöz CO₂ monitörizasyonu, cildi <strong>41–44 °C</strong>’ye ısıtarak dermal kapillerleri arteriyelize
          eder ve dokudan diffüze olan CO₂’yi elektrokimyasal <strong>Stow–Severinghaus pH elektroduyla</strong> sürekli
          ölçer. Kapnografinin yetersiz kaldığı <strong>tek akciğer ventilasyonu, jet/HFOV, NIV, obezite sedasyonu ve
          pediatride</strong> arteriyel PaCO₂’nin en güçlü non-invaziv tamamlayıcısıdır.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'tc-01', label: '01. Stow–Severinghaus & EtCO₂ Farkı' },
            { id: 'tc-02', label: '02. Canlı Pa–Tc–EtCO₂ Lab' },
            { id: 'tc-03', label: '03. Yerleşim & Termal Güvenlik' },
            { id: 'tc-04', label: '04. Endikasyonlar & Şok Tuzağı' },
            { id: 'tc-05', label: '05. Kurulum Akışı & Literatür' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-teal-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-teal-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. STOW-SEVERINGHAUS FİZİĞİ VE 3 YÖNTEM KARŞILAŞTIRMASI              */}
      {/* ===================================================================== */}
      <section id="tc-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. Stow–Severinghaus Elektrodu, Arteriyelizasyon ve EtCO₂’den Farkı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Karbondioksit dokuda oksijenden ~20 kat daha yüksek diffüzyon kapasitesine sahiptir. Sensördeki ısıtıcı halka
            dermal kapiller akımı artırır; cilt yüzeyinden Teflon membrana geçen CO₂ bikarbonat tamponunun{' '}
            <strong>pH’ını düşürür</strong> ve logaritmik olarak <strong>PtcCO₂</strong> hesaplanır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Stow-Severinghaus Electrode Cross-Section SVG */}
          <div
            className={`lg:col-span-7 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Stow–Severinghaus Sensör Kesiti &amp; Dermal CO₂ Diffüzyonu
              </span>
              <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
                CO₂ + H₂O ⇌ H⁺ + HCO₃⁻
              </span>
            </div>

            <svg
              viewBox="0 0 560 226"
              className="w-full h-auto rounded-lg"
              role="img"
              aria-label="Isıtılmış Stow-Severinghaus transkütanöz CO2 elektrodu kesit ve dermal diffüzyon şeması"
            >
              {/* Sensor Housing */}
              <rect x="132" y="14" width="296" height="92" rx="10" fill={isDark ? '#0f172a' : '#f8fafc'} stroke="#14b8a6" strokeWidth="1.8" />

              {/* Glass pH Electrode & Ag/AgCl Reference */}
              <rect x="236" y="24" width="88" height="44" rx="6" fill="#0ea5e9" fillOpacity="0.2" stroke="#0ea5e9" strokeWidth="1.5" />
              <text x="280" y="43" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#38bdf8' : '#0369a1'}>Cam pH Elektrodu</text>
              <text x="280" y="57" textAnchor="middle" fontSize="8.5" fill={isDark ? '#bae6fd' : '#0284c7'}>+ Ag/AgCl Referans</text>

              {/* Heating Elements on both sides */}
              <rect x="148" y="34" width="72" height="28" rx="5" fill="#f97316" fillOpacity="0.22" stroke="#f97316" strokeWidth="1.4" />
              <text x="184" y="51" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#fb923c">
                Isıtıcı 42°C
              </text>

              <rect x="340" y="34" width="72" height="28" rx="5" fill="#f97316" fillOpacity="0.22" stroke="#f97316" strokeWidth="1.4" />
              <text x="376" y="51" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#fb923c">
                Termistör
              </text>

              {/* Bicarbonate Electrolyte Layer */}
              <rect x="148" y="74" width="264" height="20" rx="3" fill="#14b8a6" fillOpacity="0.22" />
              <text x="280" y="87" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill={isDark ? '#5eead4' : '#0f766e'}>
                Bikarbonat Elektrolit Tabakası (pH Değişimi Ölçülür)
              </text>

              {/* Teflon Membrane */}
              <line x1="132" y1="106" x2="428" y2="106" stroke="#f59e0b" strokeWidth="3.5" />
              <text x="436" y="109" fontSize="8.5" fontWeight="700" fill="#f59e0b">Teflon Membran (CO₂ Geçirgen)</text>

              {/* Contact Gel + Epidermis + Arterialized Dermis */}
              <rect x="20" y="110" width="520" height="14" fill="#38bdf8" fillOpacity="0.2" />
              <text x="28" y="120" fontSize="8.5" fontWeight="600" fill={isDark ? '#7dd3fc' : '#0369a1'}>Temas Jeli (Hava Kabarcıksız!)</text>

              <rect x="20" y="124" width="520" height="26" fill={isDark ? '#334155' : '#fde68a'} fillOpacity={isDark ? '0.65' : '0.45'} />
              <text x="28" y="140" fontSize="9.5" fontWeight="600" fill={isDark ? '#e2e8f0' : '#78350f'}>Epidermis / Stratum Corneum (Isıyla geçirgenleşir)</text>

              <rect x="20" y="150" width="520" height="54" rx="5" fill={isDark ? '#450a0a' : '#ffe4e6'} fillOpacity="0.45" stroke="#f43f5e" strokeOpacity="0.35" />
              <text x="28" y="170" fontSize="10" fontWeight="700" fill={isDark ? '#fda4af' : '#be123c'}>
                Arteriyelize Dermal Kapiller Ağ (Lokal Vazodilatasyon · ↑ Akım)
              </text>

              {/* Upward CO2 Diffusion Arrows */}
              {[205, 280, 355].map((x) => (
                <g key={x}>
                  <line x1={x} y1="184" x2={x} y2="100" stroke="#14b8a6" strokeWidth="2" strokeDasharray="3 2" />
                  <polygon points={`${x},94 ${x - 5},103 ${x + 5},103`} fill="#14b8a6" />
                </g>
              ))}
              <text x="280" y="196" textAnchor="middle" fontSize="9" fontWeight="700" fontFamily="ui-monospace, monospace" fill={isDark ? '#5eead4' : '#0f766e'}>
                CO₂ Diffüzyonu ↑ (Severinghaus 37°C Algoritmasıyla Normalize Edilir)
              </text>

              <text x="280" y="219" textAnchor="middle" fontSize="9.5" fontFamily="ui-monospace, monospace" fill={isDark ? '#94a3b8' : '#64748b'}>
                Normalde PtcCO₂ ≈ PaCO₂ + 2–5 mmHg · Diffüzyon Gecikmesi: 1–3 dk
              </text>
            </svg>
          </div>

          <div className="lg:col-span-5 space-y-3">
            {[
              {
                title: '1. Neden Isıtma Zorunlu? (41–44 °C)',
                body: 'Isı olmadan deri kapillerleri düşük akımlıdır ve stratum corneum lipitleri CO₂ geçişini yavaşlatır. Lokal ısıtma kapillerleri arteriyelize eder ve yanıt hızını belirgin artırır.',
              },
              {
                title: '2. Severinghaus 37 °C Düzeltmesi',
                body: '42 °C’ye ısıtma hem kandaki CO₂ çözünürlüğünü düşürerek parsiyel basıncı (~%4.5/°C) artırır hem de cilt metabolizması CO₂ ekler. Cihaz algoritması bu artışı çıkarıp 37 °C’ye eşdeğer PtcCO₂ gösterir.',
              },
              {
                title: '3. Kapnografinin Rakibi Değil, Tamamlayıcısıdır',
                body: '1–3 dakikalık fizyolojik diffüzyon gecikmesi nedeniyle TcCO₂ ani apneyi veya özofageal entübasyonu yakalayamaz. Hız için EtCO₂, ölü boşluk/açık havayolu doğruluğu için TcCO₂ kullanılır.',
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

        {/* 3-Column Comparison Table: TcCO2 vs EtCO2 vs PaCO2 */}
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
                <th className="py-3 px-4 font-semibold">Kriter</th>
                <th className="py-3 px-4 font-semibold text-teal-600 dark:text-teal-400">TcCO₂ (Transkütanöz)</th>
                <th className="py-3 px-4 font-semibold text-amber-600 dark:text-amber-400">EtCO₂ (Kapnografi)</th>
                <th className="py-3 px-4 font-semibold text-sky-600 dark:text-sky-400">PaCO₂ (Arter Kan Gazı)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.feature} className="align-top">
                  <td className={`py-2.5 px-4 font-semibold min-w-[155px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.feature}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[205px]">{row.tcco2}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[195px] text-slate-500 dark:text-slate-400">{row.etco2}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[185px] text-slate-500 dark:text-slate-400">{row.paco2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI PaCO2 - TcCO2 - EtCO2 GRADYAN & PERFÜZYON LABORATUVARI      */}
      {/* ===================================================================== */}
      <section id="tc-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı PaCO₂ – TcCO₂ – EtCO₂ Gradyan ve Dermal Perfüzyon Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Tek akciğer ventilasyonunda (OLV) ve OSAS sedasyonunda <strong>EtCO₂</strong>’nin nasıl yanıldığını, buna
            karşın <strong>şok / yüksek doz vazopresör</strong> altında <strong>TcCO₂</strong>’nin neden sahte yüksek
            okuduğunu canlı simülatörde gözlemleyin.
          </p>
        </div>

        {/* 6 Scenario Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'normal_stable', label: 'Normal Stabil' },
            { id: 'olv_thoracic', label: 'Tek Akciğer (OLV)' },
            { id: 'jet_ventilation', label: 'Jet Ventilasyon / HFOV' },
            { id: 'osas_sedation', label: 'Obezite / OSAS Sedasyon' },
            { id: 'vasopressor_shock', label: 'Şok / Vazopresör (Tuzak!)' },
            { id: 'low_temp_sensor', label: 'Düşük Isı (39°C)' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as TcPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-teal-600 border-teal-500 text-white'
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
            {/* 4 Live Readout Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* PaCO2 */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Gerçek PaCO₂ (AKG)</div>
                <div className="mt-1 text-2xl font-mono font-bold tabular-nums leading-none text-sky-600 dark:text-sky-400">
                  {paco2} <span className="text-xs font-normal">mmHg</span>
                </div>
                <div className="mt-1.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">Referans Değer</div>
              </div>

              {/* TcCO2 */}
              <div
                className={`p-3 rounded-lg border ${
                  Math.abs(sim.tcPaDiff) >= 8
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>TcCO₂</span>
                  <span className="font-mono tabular-nums">
                    {sim.tcPaDiff >= 0 ? `+${sim.tcPaDiff}` : sim.tcPaDiff}
                  </span>
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    Math.abs(sim.tcPaDiff) >= 8 ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'
                  }`}
                >
                  {sim.tcco2} <span className="text-xs font-normal">mmHg</span>
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {Math.abs(sim.tcPaDiff) >= 8 ? 'STAZ SAPMASI!' : `Lag ~${sim.lagSec} sn`}
                </div>
              </div>

              {/* EtCO2 */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.etco2 === null || (sim.paEtDiff !== null && sim.paEtDiff >= 10)
                    ? isDark
                      ? 'bg-amber-950/30 border-amber-500/45'
                      : 'bg-amber-50 border-amber-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  <span>EtCO₂</span>
                  <span className="font-mono tabular-nums">
                    {sim.paEtDiff !== null ? `−${sim.paEtDiff}` : 'Yok'}
                  </span>
                </div>
                <div className="mt-1 text-2xl font-mono font-bold tabular-nums leading-none text-amber-600 dark:text-amber-400">
                  {sim.etco2 !== null ? (
                    <>
                      {sim.etco2} <span className="text-xs font-normal">mmHg</span>
                    </>
                  ) : (
                    '—'
                  )}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.etco2 === null ? 'AÇIK HAVAYOLU' : sim.paEtDiff && sim.paEtDiff >= 10 ? 'GENİŞ GRADYAN' : 'NORMAL Δ'}
                </div>
              </div>

              {/* Heating Power */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Isıtma Gücü</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    perfusionPct < 45 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {sim.heatingPowerMw} <span className="text-xs font-normal">mW</span>
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {perfusionPct < 45 ? 'DÜŞÜK PERFÜZYON' : `${sensorTemp.toFixed(1)} °C Stabil`}
                </div>
              </div>
            </div>

            {/* Live 15-Minute Step-Response SVG */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  15 Dakikalık Ventilasyon Yanıtı: PaCO₂ (Mavi) · TcCO₂ (Turkuaz) · EtCO₂ (Sarı)
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  Diffüzyon Gecikmesi: ~{sim.lagSec} sn
                </span>
              </div>

              <svg
                viewBox="0 0 560 182"
                className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
                role="img"
                aria-label="PaCO2, TcCO2 ve EtCO2 zaman içi yanıt eğrileri karşılaştırması"
              >
                {/* Grid lines */}
                {[80, 60, 45, 30].map((v) => {
                  const y = 154 - ((v - 20) / 65) * 132;
                  return (
                    <g key={v}>
                      <line
                        x1="48"
                        y1={y}
                        x2="538"
                        y2={y}
                        stroke={v === 45 ? '#334155' : '#1e293b'}
                        strokeDasharray={v === 45 ? '4 4' : undefined}
                        strokeWidth="1"
                      />
                      <text x="40" y={y + 3.5} textAnchor="end" fontSize="9.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                        {v}
                      </text>
                    </g>
                  );
                })}

                {/* Event vertical marker at t = 3 min */}
                <line x1="146" y1="22" x2="146" y2="154" stroke="#475569" strokeDasharray="3 3" strokeWidth="1" />
                <text x="150" y="32" fontSize="8.5" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                  Olay (t=3 dk)
                </text>

                {/* Curves */}
                <path d={curveSvg.paPath} fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="6 3" />
                <path
                  d={curveSvg.tcPath}
                  fill="none"
                  stroke={Math.abs(sim.tcPaDiff) >= 8 ? '#fb7185' : '#14b8a6'}
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                {curveSvg.etPath && (
                  <path d={curveSvg.etPath} fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinejoin="round" />
                )}

                {/* End Dots */}
                <circle cx="538" cy={curveSvg.endPaY} r="3.5" fill="#38bdf8" />
                <circle cx="538" cy={curveSvg.endTcY} r="4.5" fill={Math.abs(sim.tcPaDiff) >= 8 ? '#fb7185' : '#14b8a6'} />
                {curveSvg.endEtY !== null && <circle cx="538" cy={curveSvg.endEtY} r="3.5" fill="#f59e0b" />}

                {/* X-axis labels */}
                <text x="48" y="172" fontSize="9" fontFamily="ui-monospace, monospace" fill="#64748b">0 dk</text>
                <text x="292" y="172" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#94a3b8">
                  Mavi Kesikli: PaCO₂ · Turkuaz: TcCO₂ · Sarı: EtCO₂
                </text>
                <text x="538" y="172" textAnchor="end" fontSize="9" fontFamily="ui-monospace, monospace" fill="#64748b">15 dk</text>
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
                <Sliders className="w-4 h-4 text-teal-500" />
                <span>Ventilasyon &amp; Perfüzyon Kontrolleri</span>
              </div>

              {/* Airway Mode Selector */}
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'ett', label: 'Entübe' },
                  { id: 'niv_sedation', label: 'NIV / Sed.' },
                  { id: 'jet_hfov', label: 'Jet / HFOV' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setAirwayMode(m.id as AirwayMode)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                      airwayMode === m.id
                        ? isDark
                          ? 'bg-slate-800 border-teal-500 text-white'
                          : 'bg-slate-900 border-slate-900 text-white'
                        : isDark
                          ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* PaCO2 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="tc-paco2" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Gerçek PaCO₂
                  </label>
                  <span className="font-mono tabular-nums font-bold text-sky-600 dark:text-sky-400">{paco2} mmHg</span>
                </div>
                <input
                  id="tc-paco2"
                  type="range"
                  min={28}
                  max={80}
                  step={1}
                  value={paco2}
                  onChange={(e) => setPaco2(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* Dead Space */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="tc-vd" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Ölü Boşluk / V/Q (Vd/Vt)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-amber-600 dark:text-amber-400">%{deadSpacePct}</span>
                </div>
                <input
                  id="tc-vd"
                  type="range"
                  min={25}
                  max={70}
                  step={2}
                  value={deadSpacePct}
                  onChange={(e) => setDeadSpacePct(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Dermal Perfusion */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="tc-perf" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Cilt Perfüzyonu (Şok/Vazopresör)
                  </label>
                  <span
                    className={`font-mono tabular-nums font-bold ${
                      perfusionPct < 45 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    %{perfusionPct}
                  </span>
                </div>
                <input
                  id="tc-perf"
                  type="range"
                  min={15}
                  max={100}
                  step={5}
                  value={perfusionPct}
                  onChange={(e) => setPerfusionPct(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              {/* Sensor Temperature */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="tc-temp" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Sensör Sıcaklığı
                  </label>
                  <span className="font-mono tabular-nums font-bold text-orange-600 dark:text-orange-400">
                    {sensorTemp.toFixed(1)} °C
                  </span>
                </div>
                <input
                  id="tc-temp"
                  type="range"
                  min={39.0}
                  max={44.0}
                  step={0.5}
                  value={sensorTemp}
                  onChange={(e) => setSensorTemp(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer"
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
      {/* 03. SENSÖR YERLEŞİMİ VE TERMAL YANIK GÜVENLİĞİ                        */}
      {/* ===================================================================== */}
      <section id="tc-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. Anatomik Sensör Bölgeleri ve Termal Güvenlik (AARC 2012)
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sensör, ince epidermisli, iyi kanlanan, ödem ve kalın yağ dokusundan uzak bölgelere yerleştirilir. Isıtmalı
            elektrot nedeniyle <strong>sıcaklık–süre rotasyonu</strong> termal yanığı önlemenin tek yoludur.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Anatomic Sites Grid */}
          <div className="lg:col-span-5 space-y-3">
            {[
              {
                site: '1. Kulak Memesi (Ear Lobe · Klips Sensör)',
                desc: 'Erişkinde (özellikle Sentec V-Sign) altın standart yerleşim: ince cilt, zengin kapiller yatak, hızlı arteriyelizasyon ve tek probta eşzamanlı SpO₂ + TcCO₂.',
              },
              {
                site: '2. Üst Göğüs / İnfraklaviküler (2–3. İKA)',
                desc: 'Baş–boyun cerrahisinde veya kulak memesi uygun olmadığında ameliyathane ve YBÜ’de çok stabil yapışkan halka yerleşimi.',
              },
              {
                site: '3. Alın / Yanak (Forehead / Cheek)',
                desc: 'İyi perfüze alternatif bölge; ancak BIS/SedLine veya NIRS sensörleriyle çakışmamasına dikkat edilmelidir.',
              },
              {
                site: '4. Yenidoğan / İnfant Gövde veya Uyluk (39–40 °C)',
                desc: 'Kemik çıkıntıdan uzak, geniş düz cilt alanı. Daima düşük sıcaklık ve 1–2 saatte bir sık rotasyon gerektirir.',
              },
            ].map((item) => (
              <div
                key={item.site}
                className={`rounded-xl border p-3.5 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.site}</div>
                <p className={`mt-1 text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Thermal Safety Table */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400">
              <Flame className="w-4 h-4" />
              <span>Termal Yanık Önleme: Sıcaklık ve Maksimum Bölge Süresi Rehberi</span>
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
                    <th className="py-3 px-4 font-semibold">Hasta Grubu</th>
                    <th className="py-3 px-4 font-semibold">Sensör Isısı</th>
                    <th className="py-3 px-4 font-semibold">Maks. Süre</th>
                    <th className="py-3 px-4 font-semibold">Güvenlik Notu</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                  {THERMAL_SAFETY_ROWS.map((row) => (
                    <tr key={row.group} className="align-top">
                      <td className={`py-2.5 px-4 font-semibold min-w-[165px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {row.group}
                      </td>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-orange-600 dark:text-orange-400 font-semibold min-w-[110px]">
                        {row.temp}
                      </td>
                      <td className="py-2.5 px-4 font-mono tabular-nums min-w-[115px]">{row.maxDuration}</td>
                      <td className="py-2.5 px-4 leading-relaxed min-w-[190px] text-slate-500 dark:text-slate-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. KLİNİK ENDİKASYONLAR VE 4 KRİTİK YORUMLAMA TUZAĞI                 */}
      {/* ===================================================================== */}
      <section id="tc-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. Güçlü Klinik Endikasyonlar ve 4 Kritik Yorumlama Tuzağı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            TcCO₂’nin en parlak olduğu alanlar, kapnografinin mekanik veya fizyolojik olarak çöktüğü olgulardır; ancak
            periferik hipoperfüzyon ve temas hataları bilinmeden yorumlanmamalıdır.
          </p>
        </div>

        {/* 6 Indications Strip */}
        <div className={`rounded-xl border p-4 space-y-3 ${isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <Activity className="w-4 h-4 text-teal-500" />
            <span>Anestezi &amp; Yoğun Bakımda En Yüksek Verimli 6 Endikasyon</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {[
              {
                name: 'Torasik Anestezi & OLV',
                desc: 'Tek akciğer ventilasyonunda şant ve ölü boşluk Pa–EtCO₂ farkını açarken TcCO₂ PaCO₂’yi ±2.5 mmHg hassasiyetle izler (Oshibuchi 2003).',
              },
              {
                name: 'Jet Ventilasyon (HFJV) & HFOV',
                desc: 'Rijit bronkoskopi, laringeal lazer ve yüksek frekanslı ventilasyonda kapalı ekspirasyon olmadığı için tek sürekli CO₂ monitörüdür.',
              },
              {
                name: 'Morbid Obezite / OSAS Sedasyonu',
                desc: 'Spontan soluyan obez/OSAS hastasında opioid kaynaklı sessiz hiperkapniyi SpO₂ düşmeden dakikalar önce yakalar.',
              },
              {
                name: 'NIV & KOAH Alevlenmesi / Weaning',
                desc: 'Maske kaçağı EtCO₂’yi bozar; TcCO₂ tekrarlayan ağrılı arter ponksiyonlarını azaltarak NIV yanıtını izler.',
              },
              {
                name: 'Uzun Laparoskopi / Robotik Cerrahi',
                desc: 'CO₂ pnömoperitonyumu + derin Trendelenburg’da genişleyen Pa–EtCO₂ farkını ve gizli respiratuvar asidozu yakalar.',
              },
              {
                name: 'Pediatri, YYBÜ & Apne Testi',
                desc: 'Yenidoğanda kan kaybını azaltır; konjenital siyanotik kalp hastalığında ve beyin ölümü apne testinde güvenli rehberlik sağlar (Tobias 2009).',
              },
            ].map((ind) => (
              <div key={ind.name} className={`p-3 rounded-lg border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`font-bold ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>{ind.name}</div>
                <p className={`mt-1 leading-relaxed text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Pitfall Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: '1. Şok ve Vazopresör Altında SAHTE YÜKSEK TcCO₂',
              tone: 'rose',
              body: 'Ağır vazokonstriksiyon, hipotermi veya şokta deri kapiller akımı duraksar; doku metabolizmasının ürettiği CO₂ temizlenemez. Sonuç: Gerçek PaCO₂ 40 mmHg iken TcCO₂ 65–75 mmHg okunabilir! Düşük ısıtma gücü (mW) bu artefaktın uyarısıdır.',
            },
            {
              title: '2. Hava Kabarcığı / Gevşeyen Sensör → SAHTE DÜŞÜK TcCO₂',
              tone: 'amber',
              body: 'Sensörle cilt arasında temas jeli yetersizse veya yapışkan halka gevşerse ortam havası (PCO₂ ≈ 0.3 mmHg) membrana sızar ve TcCO₂’yi hızla 15–25 mmHg’ye düşürür. Temas halkasını yenileyip tekrar kalibre edin.',
            },
            {
              title: '3. Cilt Ödemi, Skar ve Kalın Subkutan Doku',
              tone: 'sky',
              body: 'Anazarka ödem, yanık skarı veya kalın subkutan doku CO₂ diffüzyon yolunu uzatarak ölçümü yavaşlatır ve sapmayı artırır (AARC 2012 rölatif kontrendikasyonu). Daha ince, ödemsiz bir bölge (ör. kulak memesi) seçilmelidir.',
            },
            {
              title: '4. Ani Apne, Devre Ayrılması ve Entübasyon Onayı Yasağı',
              tone: 'rose',
              body: '1–3 dakikalık fizyolojik gecikme nedeniyle TcCO₂ asla endotrakeal entübasyon doğrulaması (“No Trace = Wrong Place”) veya ani devre kopması alarmı yerine kullanılamaz.',
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
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. KURULUM AKIŞI VE AKADEMİK LİTERATÜR                               */}
      {/* ===================================================================== */}
      <section id="tc-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. 5-Adımlı Yatak Başı TcCO₂ Kurulum Akışı ve Kanıt Özeti
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <strong>Conway et al. (2019 · Thorax)</strong> 73 çalışma ve 7.021 eşleştirilmiş ölçümü kapsayan
            meta-analizinde ortalama sapmanın (bias) neredeyse sıfır (<strong>−0.1 mmHg</strong>) olmasına karşın
            popülasyon uyum sınırlarının geniş (<strong>±15 mmHg</strong>) olduğunu göstermiştir. Bu nedenle başlangıçta
            AKG doğrulaması ve ardından trend takibi temel ilkedir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              step: '01',
              title: 'Kalibrasyon & Membran',
              body: 'Cihazı yerleştirme öncesi kalibrasyon gazıyla sıfırla; membran süresini ve bütünlüğünü kontrol et.',
            },
            {
              step: '02',
              title: 'Bölge & Temas Jeli',
              body: 'Ödemsiz kulak memesi veya üst göğsü alkolle temizle; 1–2 damla jel ile hava kabarcıksız yapıştır.',
            },
            {
              step: '03',
              title: '5–10 dk Stabilizasyon',
              body: 'İlk takıldığında arteriyelizasyon tamamlanana ve eğri düzleşene kadar 5–10 dk bekle.',
            },
            {
              step: '04',
              title: 'İlk AKG Korelasyonu',
              body: 'AARC 2012 önerisi: Başlangıçta 1 kez PaCO₂ ile bireysel farkı doğrula; ardından trendi izle.',
            },
            {
              step: '05',
              title: 'Süreli Yer Değişimi',
              body: 'Erişkinde 4–8 saatte, yenidoğanda 1–2 saatte bir sensörü değiştir ve cildi termal eritem açısından kontrol et.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className={`rounded-xl border p-3.5 space-y-1.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">{item.step}.</div>
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.body}</p>
            </div>
          ))}
        </div>

        {/* References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/60 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-teal-500" />
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
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
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
