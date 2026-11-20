import React from 'react';

export type RespiratoryDiagramId =
  | 'weibel-anatomy'
  | 'mechanics-pv-epp'
  | 'volumes-rahn'
  | 'west-zones-pvr'
  | 'oxyhb-cascade';

interface DiagramProps {
  id: RespiratoryDiagramId;
  isDark: boolean;
}

export const RespiratoryTextbookDiagram: React.FC<DiagramProps> = ({ id, isDark }) => {
  const palette = isDark
    ? {
        bg: '#0b1220',
        panel: '#0f172a',
        border: '#1e293b',
        grid: '#1e293b',
        axis: '#94a3b8',
        text: '#e2e8f0',
        muted: '#94a3b8',
        sky: '#38bdf8',
        skySoft: 'rgba(56,189,248,0.16)',
        teal: '#2dd4bf',
        tealSoft: 'rgba(45,212,191,0.16)',
        rose: '#fb7185',
        roseSoft: 'rgba(251,113,133,0.16)',
        amber: '#fbbf24',
        amberSoft: 'rgba(251,191,36,0.16)',
        violet: '#a78bfa',
      }
    : {
        bg: '#f8fafc',
        panel: '#ffffff',
        border: '#cbd5e1',
        grid: '#e2e8f0',
        axis: '#475569',
        text: '#0f172a',
        muted: '#475569',
        sky: '#0284c7',
        skySoft: '#e0f2fe',
        teal: '#0d9488',
        tealSoft: '#ccfbf1',
        rose: '#e11d48',
        roseSoft: '#ffe4e6',
        amber: '#d97706',
        amberSoft: '#fef3c7',
        violet: '#7c3aed',
      };

  const figureWrap = `rounded-xl border p-4 sm:p-5 space-y-3 ${
    isDark ? 'bg-slate-950/75 border-slate-800' : 'bg-slate-50/70 border-slate-200'
  }`;

  if (id === 'weibel-anatomy') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
            Şekil 1 — Weibel Dallanma Modeli (0–23. Jenerasyon) ve Toplam Kesit Alanı Eğrisi
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            West B.1 · Nunn&apos;s B.1
          </span>
        </div>

        <svg viewBox="0 0 760 285" className="w-full h-auto" role="img" aria-label="Weibel dallanma ve kesit alanı şeması">
          <defs>
            <linearGradient id="weibelFill" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={palette.sky} stopOpacity="0.14" />
              <stop offset="68%" stopColor={palette.sky} stopOpacity="0.22" />
              <stop offset="100%" stopColor={palette.teal} stopOpacity="0.38" />
            </linearGradient>
          </defs>

          {/* Left panel: Weibel tree & area curve */}
          <rect x="14" y="14" width="470" height="256" rx="10" fill={palette.panel} stroke={palette.border} />
          <rect x="46" y="34" width="278" height="176" fill={palette.bg} stroke={palette.grid} />
          <rect x="324" y="34" width="142" height="176" fill={palette.tealSoft} stroke={palette.teal} strokeOpacity="0.4" />
          <line x1="324" y1="34" x2="324" y2="210" stroke={palette.teal} strokeWidth="2" strokeDasharray="5,4" />

          <text x="185" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.sky}>
            İLETİCİ ZON (Jenerasyon 0–16)
          </text>
          <text x="185" y="67" textAnchor="middle" fontSize="10" fill={palette.muted}>
            Konveksiyon (Bulk Flow) · Ölü Boşluk ≈ 150 mL
          </text>

          <text x="395" y="52" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.teal}>
            RESPİRATUVAR ZON (17–23)
          </text>
          <text x="395" y="67" textAnchor="middle" fontSize="10" fill={palette.teal}>
            Moleküler Difüzyon · Asinus
          </text>

          {/* Branching schematic */}
          <g stroke={palette.axis} strokeLinecap="round" fill="none">
            <line x1="64" y1="118" x2="112" y2="118" strokeWidth="7" />
            <line x1="112" y1="118" x2="162" y2="94" strokeWidth="4.5" />
            <line x1="112" y1="118" x2="162" y2="142" strokeWidth="4.5" />
            <line x1="162" y1="94" x2="214" y2="82" strokeWidth="3" />
            <line x1="162" y1="94" x2="214" y2="106" strokeWidth="3" />
            <line x1="162" y1="142" x2="214" y2="130" strokeWidth="3" />
            <line x1="162" y1="142" x2="214" y2="154" strokeWidth="3" />
            <line x1="214" y1="82" x2="274" y2="75" strokeWidth="1.8" />
            <line x1="214" y1="82" x2="274" y2="89" strokeWidth="1.8" />
            <line x1="214" y1="106" x2="274" y2="99" strokeWidth="1.8" />
            <line x1="214" y1="106" x2="274" y2="113" strokeWidth="1.8" />
            <line x1="214" y1="130" x2="274" y2="123" strokeWidth="1.8" />
            <line x1="214" y1="130" x2="274" y2="137" strokeWidth="1.8" />
            <line x1="214" y1="154" x2="274" y2="147" strokeWidth="1.8" />
            <line x1="214" y1="154" x2="274" y2="161" strokeWidth="1.8" />
          </g>

          {/* Alveolar clusters */}
          <g fill={palette.tealSoft} stroke={palette.teal} strokeWidth="1.4">
            <circle cx="352" cy="92" r="9" />
            <circle cx="370" cy="88" r="9" />
            <circle cx="386" cy="95" r="9" />
            <circle cx="352" cy="122" r="9" />
            <circle cx="370" cy="118" r="9" />
            <circle cx="386" cy="125" r="9" />
            <circle cx="352" cy="150" r="9" />
            <circle cx="370" cy="146" r="9" />
            <circle cx="386" cy="153" r="9" />
          </g>

          {/* Exponential cross-sectional area curve */}
          <path
            d="M 56 205 L 272 203 Q 324 198 358 176 T 456 132 L 456 210 L 56 210 Z"
            fill="url(#weibelFill)"
          />
          <path
            d="M 56 205 L 272 203 Q 324 198 358 176 T 456 132"
            fill="none"
            stroke={palette.sky}
            strokeWidth="2.5"
          />
          <text x="178" y="196" fontSize="10.5" fontWeight="700" fill={palette.text}>
            Toplam Kesit Alanı (cm<tspan fontSize="7.5" dy="-3.5">2</tspan><tspan dy="3.5">)</tspan>
          </text>
          <text x="418" y="196" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={palette.teal}>
            &gt; 10.000 cm<tspan fontSize="7.5" dy="-3.5">2</tspan>
          </text>

          {/* X-axis */}
          <line x1="46" y1="210" x2="466" y2="210" stroke={palette.axis} strokeWidth="1.5" />
          <text x="64" y="226" fontSize="10" fill={palette.muted}>0 (Trakea)</text>
          <text x="195" y="226" textAnchor="middle" fontSize="10" fill={palette.muted}>8 (Bronş)</text>
          <text x="324" y="226" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.teal}>16 (Term. Br.)</text>
          <text x="458" y="226" textAnchor="end" fontSize="10" fill={palette.muted}>23 (Alveol)</text>

          <text x="256" y="252" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={palette.muted}>
            Paralel dallanma nedeniyle çap &lt; 2 mm havayolları toplam direncin yalnızca %10–20&apos;sini oluşturur.
          </text>

          {/* Right panel: Alveolocapillary barrier cross-section */}
          <rect x="498" y="14" width="248" height="256" rx="10" fill={palette.panel} stroke={palette.border} />
          <text x="622" y="38" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
            Alveolokapiller Bariyer
          </text>
          <text x="622" y="53" textAnchor="middle" fontSize="10" fill={palette.muted}>
            İnce Gaz Değişim Tarafı: 0,2 – 0,5 µm
          </text>

          {/* Layered cross-section */}
          <rect x="520" y="68" width="204" height="30" rx="5" fill={palette.skySoft} stroke={palette.sky} strokeOpacity="0.45" />
          <text x="622" y="87" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={palette.sky}>
            Alveol Havası (O<tspan fontSize="7.5" dy="2.5">2</tspan><tspan dy="-2.5"> ↓ · CO</tspan><tspan fontSize="7.5" dy="2.5">2</tspan><tspan dy="-2.5"> ↑)</tspan>
          </text>

          <rect x="520" y="102" width="204" height="18" rx="3" fill={palette.tealSoft} stroke={palette.teal} strokeOpacity="0.5" />
          <text x="622" y="114" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={palette.teal}>
            1. Sürfaktan Film (DPPC)
          </text>

          <rect x="520" y="124" width="204" height="22" rx="3" fill={palette.bg} stroke={palette.border} />
          <text x="622" y="138" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={palette.text}>
            2. Tip I Alveoler Epitel (~0,1 µm)
          </text>

          <rect x="520" y="150" width="204" height="20" rx="3" fill={palette.amberSoft} stroke={palette.amber} strokeOpacity="0.5" />
          <text x="622" y="163" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={palette.amber}>
            3. Kaynaşmış Bazal Membran
          </text>

          <rect x="520" y="174" width="204" height="22" rx="3" fill={palette.bg} stroke={palette.border} />
          <text x="622" y="188" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={palette.text}>
            4. Pulmoner Kapiller Endoteli
          </text>

          <rect x="520" y="200" width="204" height="36" rx="5" fill={palette.roseSoft} stroke={palette.rose} strokeOpacity="0.5" />
          <ellipse cx="562" cy="218" rx="18" ry="8" fill={palette.rose} fillOpacity="0.75" />
          <ellipse cx="682" cy="218" rx="18" ry="8" fill={palette.rose} fillOpacity="0.75" />
          <text x="622" y="221" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.rose}>
            Kapiller Kan (RBC)
          </text>

          <text x="622" y="254" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
            Tip II pnömositler köşelerde DPPC üretir
          </text>
        </svg>
      </figure>
    );
  }

  if (id === 'mechanics-pv-epp') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
            Şekil 2 — Basınç–Hacim (P–V) Histerezis Döngüsü ve Eşit Basınç Noktası (EPP)
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            West B.7 · Mead 1967
          </span>
        </div>

        <svg viewBox="0 0 760 295" className="w-full h-auto" role="img" aria-label="P-V histerezis ve EPP şeması">
          {/* Left: P-V Loop */}
          <rect x="14" y="14" width="356" height="266" rx="10" fill={palette.panel} stroke={palette.border} />
          <text x="192" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
            P–V Döngüsü: Histerezis, LIP ve UIP (Gagalaşma)
          </text>

          <rect x="56" y="48" width="292" height="186" fill={palette.bg} stroke={palette.grid} />
          <rect x="276" y="48" width="72" height="54" fill={palette.roseSoft} />
          <text x="312" y="64" textAnchor="middle" fontSize="9" fontWeight="800" fill={palette.rose}>
            UIP / Gagalaşma
          </text>
          <text x="312" y="76" textAnchor="middle" fontSize="8.5" fill={palette.rose}>
            (Aşırı Gerilme)
          </text>

          {/* Static compliance slope */}
          <line x1="70" y1="224" x2="280" y2="78" stroke={palette.axis} strokeWidth="1.4" strokeDasharray="5,4" />
          <text x="165" y="138" transform="rotate(-35 165 138)" fontSize="9.5" fontWeight="600" fill={palette.muted}>
            Statik Kompliyans (ΔV/ΔP)
          </text>

          {/* Inspiratory & Expiratory limbs */}
          <path d="M 70 224 Q 124 218 150 194 Q 198 142 276 80 Q 308 69 338 66" fill="none" stroke={palette.sky} strokeWidth="2.8" />
          <path d="M 338 66 Q 230 70 150 116 Q 90 160 70 224" fill="none" stroke={palette.teal} strokeWidth="2.8" />

          {/* LIP & UIP dots */}
          <circle cx="144" cy="200" r="4.8" fill={palette.amber} stroke={palette.panel} strokeWidth="1.5" />
          <text x="154" y="210" fontSize="9.5" fontWeight="800" fill={palette.amber}>LIP (Alt İnfleksiyon)</text>
          <circle cx="276" cy="80" r="4.8" fill={palette.rose} stroke={palette.panel} strokeWidth="1.5" />

          <text x="218" y="176" fontSize="10" fontWeight="700" fill={palette.sky}>İnspirasyon →</text>
          <text x="108" y="102" fontSize="10" fontWeight="700" fill={palette.teal}>← Ekspirasyon</text>

          <text x="48" y="58" textAnchor="end" fontSize="9.5" fontWeight="700" fill={palette.muted}>Hacim</text>
          <text x="48" y="232" textAnchor="end" fontSize="9.5" fill={palette.muted}>0</text>
          <text x="202" y="252" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.text}>
            Havayolu Basıncı (cmH<tspan fontSize="7.5" dy="2.5">2</tspan><tspan dy="-2.5">O)</tspan>
          </text>
          <text x="192" y="270" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
            Histerezis: sürfaktan dinamiği + alveolar recruitment + viskoelastisite
          </text>

          {/* Right: EPP Diagram */}
          <rect x="386" y="14" width="360" height="266" rx="10" fill={palette.panel} stroke={palette.border} />
          <text x="566" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
            Zorlu Ekspirasyonda Eşit Basınç Noktası (EPP)
          </text>

          {/* Normal scenario */}
          <rect x="404" y="50" width="324" height="96" rx="8" fill={palette.bg} stroke={palette.grid} />
          <text x="416" y="67" fontSize="10" fontWeight="700" fill={palette.teal}>
            Normal Akciğer (P<tspan fontSize="7.5" dy="2.2">pl</tspan><tspan dy="-2.2"> = +20, P</tspan><tspan fontSize="7.5" dy="2.2">el</tspan><tspan dy="-2.2"> = +10 ⇒ P</tspan><tspan fontSize="7.5" dy="2.2">alv</tspan><tspan dy="-2.2"> = +30 cmH</tspan><tspan fontSize="7.5" dy="2.2">2</tspan><tspan dy="-2.2">O)</tspan>
          </text>
          {/* Alveolus + Airway */}
          <circle cx="442" cy="106" r="22" fill={palette.tealSoft} stroke={palette.teal} strokeWidth="2" />
          <text x="442" y="110" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.teal}>+30</text>
          <path d="M 464 96 L 692 96 M 464 116 L 692 116" stroke={palette.axis} strokeWidth="2" />
          {/* Cartilage ticks on right half */}
          <g stroke={palette.sky} strokeWidth="2.4">
            <line x1="590" y1="92" x2="590" y2="97" />
            <line x1="612" y1="92" x2="612" y2="97" />
            <line x1="634" y1="92" x2="634" y2="97" />
            <line x1="656" y1="92" x2="656" y2="97" />
            <line x1="590" y1="115" x2="590" y2="120" />
            <line x1="612" y1="115" x2="612" y2="120" />
            <line x1="634" y1="115" x2="634" y2="120" />
            <line x1="656" y1="115" x2="656" y2="120" />
          </g>
          <text x="514" y="110" textAnchor="middle" fontSize="9.5" fill={palette.text}>+25</text>
          <circle cx="604" cy="106" r="11" fill={palette.tealSoft} stroke={palette.teal} strokeWidth="1.5" />
          <text x="604" y="109" textAnchor="middle" fontSize="9" fontWeight="800" fill={palette.teal}>+20</text>
          <text x="664" y="110" textAnchor="middle" fontSize="9.5" fill={palette.text}>+10 → 0</text>
          <text x="604" y="136" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={palette.teal}>
            EPP kıkırdaklı bronşta (çökmez)
          </text>

          {/* Emphysema scenario */}
          <rect x="404" y="158" width="324" height="106" rx="8" fill={palette.bg} stroke={palette.rose} strokeOpacity="0.45" />
          <text x="416" y="175" fontSize="10" fontWeight="700" fill={palette.rose}>
            Amfizem / KOAH (P<tspan fontSize="7.5" dy="2.2">el</tspan><tspan dy="-2.2"> ↓ = +4 ⇒ P</tspan><tspan fontSize="7.5" dy="2.2">alv</tspan><tspan dy="-2.2"> = +24 cmH</tspan><tspan fontSize="7.5" dy="2.2">2</tspan><tspan dy="-2.2">O)</tspan>
          </text>
          <circle cx="442" cy="216" r="22" fill={palette.roseSoft} stroke={palette.rose} strokeWidth="2" />
          <text x="442" y="220" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.rose}>+24</text>
          {/* Collapsing airway */}
          <path d="M 464 206 L 516 206 Q 550 214 580 206 L 692 206" fill="none" stroke={palette.rose} strokeWidth="2.2" />
          <path d="M 464 226 L 516 226 Q 550 218 580 226 L 692 226" fill="none" stroke={palette.rose} strokeWidth="2.2" />
          <circle cx="510" cy="216" r="10.5" fill={palette.roseSoft} stroke={palette.rose} strokeWidth="1.5" />
          <text x="510" y="219" textAnchor="middle" fontSize="8.8" fontWeight="800" fill={palette.rose}>+20</text>
          <text x="550" y="200" textAnchor="middle" fontSize="9" fontWeight="800" fill={palette.rose}>Kollaps</text>
          <text x="646" y="220" textAnchor="middle" fontSize="9.5" fill={palette.muted}>Hava hapsi</text>
          <text x="566" y="252" textAnchor="middle" fontSize="9.5" fontWeight="600" fill={palette.muted}>
            EPP kıkırdaksız distale kayar → Büzük dudak / PEEP EPP&apos;yi proksimale iter.
          </text>
        </svg>
      </figure>
    );
  }

  if (id === 'volumes-rahn') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
            Şekil 3 — Akciğer Hacimleri / Kapasiteleri (Spirogram) ve Rahn Statik Denge Eğrisi
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Nunn&apos;s B.2 · West B.2, 7
          </span>
        </div>

        <svg viewBox="0 0 760 295" className="w-full h-auto" role="img" aria-label="Akciğer hacimleri ve Rahn diyagramı">
          {/* Left: Spirogram */}
          <rect x="14" y="14" width="380" height="266" rx="10" fill={palette.panel} stroke={palette.border} />
          <text x="204" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
            Spirogram: 4 Hacim ve 4 Kapasite (70 kg Erkek · 6,0 L)
          </text>

          {/* Y axis & horizontal bands */}
          <rect x="52" y="50" width="180" height="200" fill={palette.bg} stroke={palette.grid} />
          {/* IRV band (50-150 = 3.0L) */}
          <rect x="52" y="50" width="180" height="96" fill={palette.skySoft} fillOpacity="0.45" />
          {/* VT band (146-164 = 0.5L) */}
          <rect x="52" y="146" width="180" height="20" fill={palette.tealSoft} fillOpacity="0.85" />
          {/* ERV band (166-206 = 1.2L) */}
          <rect x="52" y="166" width="180" height="40" fill={palette.amberSoft} fillOpacity="0.5" />
          {/* RV band (206-250 = 1.2L) */}
          <rect x="52" y="206" width="180" height="44" fill={palette.roseSoft} fillOpacity="0.65" />

          {/* Spirogram wave */}
          <path
            d="M 56 164 Q 68 146 80 164 Q 92 146 104 164 Q 114 146 128 54 Q 140 54 156 204 Q 168 204 180 164 Q 192 146 204 164 Q 216 146 228 164"
            fill="none"
            stroke={palette.sky}
            strokeWidth="2.4"
          />

          {/* Dashed RV line */}
          <line x1="52" y1="206" x2="232" y2="206" stroke={palette.rose} strokeWidth="1.4" strokeDasharray="4,3" />

          {/* Volume labels inside */}
          <text x="60" y="96" fontSize="10" fontWeight="700" fill={palette.sky}>IRV (3,0 L)</text>
          <text x="60" y="160" fontSize="9.5" fontWeight="800" fill={palette.teal}>
            V<tspan fontSize="7" dy="2.2">T</tspan><tspan dy="-2.2"> (0,5 L)</tspan>
          </text>
          <text x="60" y="190" fontSize="10" fontWeight="700" fill={palette.amber}>ERV (1,2 L)</text>
          <text x="60" y="232" fontSize="10" fontWeight="700" fill={palette.rose}>RV (1,2 L · Spirometri ölçmez)</text>

          {/* Y axis ticks */}
          <text x="46" y="56" textAnchor="end" fontSize="9.5" fill={palette.muted}>6,0 L</text>
          <text x="46" y="168" textAnchor="end" fontSize="9.5" fontWeight="700" fill={palette.teal}>2,4 L</text>
          <text x="46" y="210" textAnchor="end" fontSize="9.5" fill={palette.muted}>1,2 L</text>
          <text x="46" y="252" textAnchor="end" fontSize="9.5" fill={palette.muted}>0</text>

          {/* Capacity brackets on right of spirogram */}
          {/* IC: 50 to 166 */}
          <path d="M 240 52 L 246 52 L 246 164 L 240 164" fill="none" stroke={palette.sky} strokeWidth="1.6" />
          <text x="252" y="112" fontSize="9.5" fontWeight="700" fill={palette.sky}>IC (3,5 L)</text>

          {/* FRC: 166 to 250 */}
          <path d="M 240 168 L 246 168 L 246 248 L 240 248" fill="none" stroke={palette.teal} strokeWidth="2" />
          <text x="252" y="212" fontSize="10" fontWeight="800" fill={palette.teal}>FRC (2,4 L)</text>

          {/* VC: 50 to 206 */}
          <path d="M 308 52 L 314 52 L 314 204 L 308 204" fill="none" stroke={palette.amber} strokeWidth="1.6" />
          <text x="320" y="132" fontSize="9.5" fontWeight="700" fill={palette.amber}>VC (4,7 L)</text>

          {/* TLC: 50 to 250 */}
          <path d="M 358 52 L 364 52 L 364 248 L 358 248" fill="none" stroke={palette.text} strokeWidth="1.8" />
          <text x="369" y="152" fontSize="9.5" fontWeight="800" fill={palette.text}>TLC</text>

          <text x="204" y="270" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
            FRC = ERV + RV (Anestezide %35–45 düşerek ana O<tspan fontSize="7" dy="2">2</tspan><tspan dy="-2"> deposunu küçültür)</tspan>
          </text>

          {/* Right: Rahn Diagram */}
          <rect x="408" y="14" width="338" height="266" rx="10" fill={palette.panel} stroke={palette.border} />
          <text x="577" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
            Rahn Diyagramı: Statik Basınç–Hacim Dengesi
          </text>

          <rect x="458" y="50" width="266" height="184" fill={palette.bg} stroke={palette.grid} />
          {/* Zero pressure line */}
          <line x1="584" y1="50" x2="584" y2="234" stroke={palette.axis} strokeWidth="1.6" />
          <text x="584" y="46" textAnchor="middle" fontSize="9" fontWeight="700" fill={palette.text}>P = 0</text>

          {/* FRC line */}
          <line x1="458" y1="168" x2="724" y2="168" stroke={palette.teal} strokeWidth="1.4" strokeDasharray="5,4" />
          <text x="464" y="163" fontSize="9.5" fontWeight="700" fill={palette.teal}>Normal FRC (~%42 VC)</text>

          {/* Chest wall curve (blue dashed) */}
          <path d="M 488 228 Q 524 180 554 134 T 584 92 Q 596 72 612 56" fill="none" stroke={palette.sky} strokeWidth="2.2" strokeDasharray="5,3" />
          <text x="498" y="220" fontSize="9.5" fontWeight="700" fill={palette.sky}>Göğüs Duvarı</text>

          {/* Lung curve (red dashed) */}
          <path d="M 590 228 Q 612 186 638 144 T 698 68" fill="none" stroke={palette.rose} strokeWidth="2.2" strokeDasharray="5,3" />
          <text x="676" y="124" fontSize="9.5" fontWeight="700" fill={palette.rose}>Akciğer</text>

          {/* Combined system curve */}
          <path d="M 494 228 Q 542 198 584 168 T 672 94 Q 694 72 714 56" fill="none" stroke={palette.text} strokeWidth="2.8" />
          <text x="654" y="156" fontSize="10" fontWeight="800" fill={palette.text}>Sistem</text>

          <circle cx="584" cy="168" r="5" fill={palette.teal} stroke={palette.panel} strokeWidth="1.5" />

          <text x="452" y="58" textAnchor="end" fontSize="9" fill={palette.muted}>100%</text>
          <text x="452" y="232" textAnchor="end" fontSize="9" fill={palette.muted}>RV</text>
          <text x="518" y="248" textAnchor="middle" fontSize="9.5" fill={palette.muted}>−20 (Dışa)</text>
          <text x="584" y="248" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={palette.text}>0</text>
          <text x="658" y="248" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
            +20 cmH<tspan fontSize="7" dy="2">2</tspan><tspan dy="-2">O (İçe)</tspan>
          </text>
          <text x="577" y="270" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
            FRC&apos;de akciğer içe çekilmesi (+5) ile göğüs duvarı dışa çekilmesi (−5) eşitlenir.
          </text>
        </svg>
      </figure>
    );
  }

  if (id === 'west-zones-pvr') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
            Şekil 4 — West Pulmoner Perfüzyon Zonları (1–3) ve Akciğer Hacmine Göre U-Şekilli PVR
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            West B.4–5 · Nunn&apos;s B.6
          </span>
        </div>

        <svg viewBox="0 0 760 285" className="w-full h-auto" role="img" aria-label="West zonları ve PVR grafiği">
          {/* Left: West Zones */}
          <rect x="14" y="14" width="376" height="256" rx="10" fill={palette.panel} stroke={palette.border} />
          <text x="202" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
            Dik Pozisyonda West Zonları (Apeks → Taban)
          </text>

          {/* Stylized Lung Silhouette divided into 3 horizontal zones */}
          <path
            d="M 118 52 C 84 62 60 128 54 228 C 54 238 66 244 102 242 C 138 240 162 238 172 228 C 176 168 164 78 134 54 C 128 50 122 50 118 52 Z"
            fill={palette.bg}
            stroke={palette.axis}
            strokeWidth="1.8"
          />

          {/* Zone dividers */}
          <line x1="66" y1="112" x2="372" y2="112" stroke={palette.border} strokeWidth="1.4" strokeDasharray="4,3" />
          <line x1="56" y1="176" x2="372" y2="176" stroke={palette.border} strokeWidth="1.4" strokeDasharray="4,3" />

          {/* Zone 1 */}
          <rect x="188" y="54" width="184" height="50" rx="6" fill={palette.amberSoft} />
          <text x="115" y="88" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.amber}>ZON 1</text>
          <text x="198" y="72" fontSize="10.5" fontWeight="800" fill={palette.amber}>
            P<tspan fontSize="7.5" dy="2.2">A</tspan><tspan dy="-2.2"> &gt; P</tspan><tspan fontSize="7.5" dy="2.2">a</tspan><tspan dy="-2.2"> &gt; P</tspan><tspan fontSize="7.5" dy="2.2">v</tspan><tspan dy="-2.2"> (Ölü Boşluk)</tspan>
          </text>
          <text x="198" y="88" fontSize="9.5" fill={palette.text}>Yüksek PEEP / hipovolemide artar</text>

          {/* Zone 2 */}
          <rect x="188" y="120" width="184" height="50" rx="6" fill={palette.skySoft} />
          <text x="115" y="148" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.sky}>ZON 2</text>
          <text x="198" y="138" fontSize="10.5" fontWeight="800" fill={palette.sky}>
            P<tspan fontSize="7.5" dy="2.2">a</tspan><tspan dy="-2.2"> &gt; P</tspan><tspan fontSize="7.5" dy="2.2">A</tspan><tspan dy="-2.2"> &gt; P</tspan><tspan fontSize="7.5" dy="2.2">v</tspan><tspan dy="-2.2"> (Şelale)</tspan>
          </text>
          <text x="198" y="154" fontSize="9.5" fill={palette.text}>
            Akım ∝ (P<tspan fontSize="7" dy="2">a</tspan><tspan dy="-2"> − P</tspan><tspan fontSize="7" dy="2">A</tspan><tspan dy="-2">) · Orta bölge</tspan>
          </text>

          {/* Zone 3 */}
          <rect x="188" y="184" width="184" height="54" rx="6" fill={palette.tealSoft} />
          <text x="115" y="214" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.teal}>ZON 3</text>
          <text x="198" y="203" fontSize="10.5" fontWeight="800" fill={palette.teal}>
            P<tspan fontSize="7.5" dy="2.2">a</tspan><tspan dy="-2.2"> &gt; P</tspan><tspan fontSize="7.5" dy="2.2">v</tspan><tspan dy="-2.2"> &gt; P</tspan><tspan fontSize="7.5" dy="2.2">A</tspan><tspan dy="-2.2"> (Sürekli Akım)</tspan>
          </text>
          <text x="198" y="219" fontSize="9.5" fill={palette.text}>
            Akım ∝ (P<tspan fontSize="7" dy="2">a</tspan><tspan dy="-2"> − P</tspan><tspan fontSize="7" dy="2">v</tspan><tspan dy="-2">) · En yoğun akım</tspan>
          </text>

          <text x="202" y="256" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
            Tabana inildikçe V/Q oranı düşer (Apeks ~3,0 → Taban ~0,6)
          </text>

          {/* Right: U-Shaped PVR vs Lung Volume */}
          <rect x="404" y="14" width="342" height="256" rx="10" fill={palette.panel} stroke={palette.border} />
          <text x="575" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
            Akciğer Hacmine Göre PVR (Minimum = FRC)
          </text>

          <rect x="454" y="50" width="270" height="174" fill={palette.bg} stroke={palette.grid} />

          {/* FRC vertical marker */}
          <line x1="574" y1="50" x2="574" y2="224" stroke={palette.teal} strokeWidth="1.5" strokeDasharray="5,4" />
          <text x="574" y="216" textAnchor="middle" fontSize="10" fontWeight="800" fill={palette.teal}>FRC (Min. PVR)</text>

          {/* Extra-alveolar vessel resistance (high at low vol, drops with volume) */}
          <path d="M 468 78 Q 524 146 600 186 T 710 206" fill="none" stroke={palette.sky} strokeWidth="2" strokeDasharray="5,3" />
          <text x="472" y="72" fontSize="9.5" fontWeight="700" fill={palette.sky}>Ekstra-alveoler</text>

          {/* Alveolar capillary resistance (low at low vol, rises steeply toward TLC) */}
          <path d="M 468 206 Q 560 194 636 146 T 710 72" fill="none" stroke={palette.rose} strokeWidth="2" strokeDasharray="5,3" />
          <text x="652" y="72" fontSize="9.5" fontWeight="700" fill={palette.rose}>Alveoler</text>

          {/* Total PVR U-curve */}
          <path d="M 468 68 Q 524 156 574 166 Q 634 156 710 64" fill="none" stroke={palette.text} strokeWidth="3" />
          <circle cx="574" cy="166" r="5" fill={palette.teal} stroke={palette.panel} strokeWidth="1.5" />
          <text x="574" y="152" textAnchor="middle" fontSize="10" fontWeight="800" fill={palette.text}>Toplam PVR</text>

          <text x="448" y="64" textAnchor="end" fontSize="9.5" fontWeight="700" fill={palette.muted}>PVR</text>
          <text x="468" y="238" textAnchor="middle" fontSize="9.5" fill={palette.muted}>RV</text>
          <text x="574" y="238" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={palette.teal}>FRC</text>
          <text x="708" y="238" textAnchor="middle" fontSize="9.5" fill={palette.muted}>TLC</text>

          <text x="575" y="256" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
            Hem atelektazi (RV) hem aşırı şişirme (TLC) sağ ventrikül afterload&apos;unu artırır.
          </text>
        </svg>
      </figure>
    );
  }

  // id === 'oxyhb-cascade'
  return (
    <figure className={figureWrap}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
          Şekil 5 — Oksijen–Hemoglobin Dissosiyasyon Eğrisi (P<sub className="text-[0.75em]">50</sub>) ve Oksijen Kaskadı
        </figcaption>
        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          West B.6 · Nunn&apos;s B.9–10
        </span>
      </div>

      <svg viewBox="0 0 760 290" className="w-full h-auto" role="img" aria-label="Oksijen-hemoglobin eğrisi ve oksijen kaskadı">
        {/* Left: O2-Hb Dissociation Curve */}
        <rect x="14" y="14" width="366" height="262" rx="10" fill={palette.panel} stroke={palette.border} />
        <text x="197" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
          O<tspan fontSize="8" dy="2.5">2</tspan><tspan dy="-2.5">–Hemoglobin Dissosiyasyon Eğrisi (P</tspan><tspan fontSize="8" dy="2.5">50</tspan><tspan dy="-2.5"> = 26,8 mmHg)</tspan>
        </text>

        <rect x="56" y="48" width="302" height="178" fill={palette.bg} stroke={palette.grid} />

        {/* Reference lines: 90% @ 60 mmHg and 50% @ 26.8 mmHg */}
        <line x1="56" y1="68" x2="218" y2="68" stroke={palette.teal} strokeWidth="1.2" strokeDasharray="4,3" />
        <line x1="218" y1="68" x2="218" y2="226" stroke={palette.teal} strokeWidth="1.2" strokeDasharray="4,3" />

        <line x1="56" y1="138" x2="132" y2="138" stroke={palette.amber} strokeWidth="1.2" strokeDasharray="4,3" />
        <line x1="132" y1="138" x2="132" y2="226" stroke={palette.amber} strokeWidth="1.2" strokeDasharray="4,3" />

        {/* Left-shifted curve */}
        <path d="M 56 226 C 84 198 96 112 138 72 C 174 58 248 54 348 52" fill="none" stroke={palette.sky} strokeWidth="1.8" strokeDasharray="5,3" />
        <text x="114" y="64" fontSize="9.2" fontWeight="700" fill={palette.sky}>← Sola (↓T, ↑pH, ↓2,3-DPG)</text>

        {/* Right-shifted curve */}
        <path d="M 56 226 C 110 214 146 156 184 96 C 224 68 278 58 348 55" fill="none" stroke={palette.rose} strokeWidth="1.8" strokeDasharray="5,3" />
        <text x="206" y="160" fontSize="9.2" fontWeight="700" fill={palette.rose}>
          Sağa (↑T, ↓pH, ↑CO<tspan fontSize="6.8" dy="2">2</tspan><tspan dy="-2">, ↑DPG) →</tspan>
        </text>

        {/* Normal sigmoid curve */}
        <path d="M 56 226 C 98 210 120 144 154 90 C 186 64 246 56 348 53" fill="none" stroke={palette.text} strokeWidth="3" />

        {/* Key clinical points */}
        <circle cx="132" cy="138" r="4.5" fill={palette.amber} stroke={palette.panel} strokeWidth="1.5" />
        <circle cx="218" cy="68" r="4.5" fill={palette.teal} stroke={palette.panel} strokeWidth="1.5" />
        <text x="226" y="84" fontSize="9.2" fontWeight="700" fill={palette.teal}>Kritik Diz: 60 mmHg / %90</text>

        <text x="50" y="56" textAnchor="end" fontSize="9" fill={palette.muted}>100%</text>
        <text x="50" y="72" textAnchor="end" fontSize="9" fontWeight="700" fill={palette.teal}>90%</text>
        <text x="50" y="142" textAnchor="end" fontSize="9" fontWeight="700" fill={palette.amber}>50%</text>
        <text x="50" y="226" textAnchor="end" fontSize="9" fill={palette.muted}>0</text>

        <text x="132" y="240" textAnchor="middle" fontSize="9" fontWeight="700" fill={palette.amber}>27</text>
        <text x="218" y="240" textAnchor="middle" fontSize="9" fontWeight="700" fill={palette.teal}>60</text>
        <text x="326" y="240" textAnchor="middle" fontSize="9" fill={palette.muted}>100 mmHg</text>
        <text x="197" y="260" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={palette.text}>
          P<tspan fontSize="7" dy="2">a</tspan><tspan dy="-2">O</tspan><tspan fontSize="7" dy="2">2</tspan><tspan dy="-2"> (mmHg) — Dik kol doku bırakımını hızlandırır</tspan>
        </text>

        {/* Right: Oxygen Cascade Step Chart */}
        <rect x="394" y="14" width="352" height="262" rx="10" fill={palette.panel} stroke={palette.border} />
        <text x="570" y="36" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
          Oksijen Kaskadı (F<tspan fontSize="8" dy="2.5">i</tspan><tspan dy="-2.5">O</tspan><tspan fontSize="8" dy="2.5">2</tspan><tspan dy="-2.5"> = 0,21 · mmHg)</tspan>
        </text>

        <rect x="434" y="48" width="296" height="178" fill={palette.bg} stroke={palette.grid} />

        {/* Step bars */}
        {[
          { label: 'Atm', val: 159, h: 154, color: palette.sky },
          { label: 'Trakea', val: 149, h: 144, color: palette.sky },
          { label: 'Alveol', val: 100, h: 98, color: palette.teal },
          { label: 'Arter', val: 95, h: 92, color: palette.teal },
          { label: 'Venöz', val: 40, h: 40, color: palette.amber },
          { label: 'Mitok.', val: 10, h: 14, color: palette.rose },
        ].map((step, i) => {
          const x = 446 + i * 47;
          const y = 224 - step.h;
          return (
            <g key={step.label}>
              <rect x={x} y={y} width="34" height={step.h} rx="4" fill={step.color} fillOpacity="0.82" />
              <text x={x + 17} y={y - 5} textAnchor="middle" fontSize="9.5" fontWeight="800" fill={palette.text}>
                {step.val}
              </text>
              <text x={x + 17} y="240" textAnchor="middle" fontSize="9.2" fontWeight="600" fill={palette.muted}>
                {step.label}
              </text>
            </g>
          );
        })}

        <text x="428" y="64" textAnchor="end" fontSize="9" fill={palette.muted}>160</text>
        <text x="428" y="128" textAnchor="end" fontSize="9" fill={palette.muted}>100</text>
        <text x="428" y="186" textAnchor="end" fontSize="9" fill={palette.muted}>40</text>
        <text x="428" y="226" textAnchor="end" fontSize="9" fill={palette.muted}>0</text>

        <text x="570" y="260" textAnchor="middle" fontSize="9.5" fill={palette.muted}>
          Atmosferden mitokondriye basamaklı basınç düşüşü (Pasteur eşiği ≈ 1–3 mmHg)
        </text>
      </svg>
    </figure>
  );
};

export default RespiratoryTextbookDiagram;
