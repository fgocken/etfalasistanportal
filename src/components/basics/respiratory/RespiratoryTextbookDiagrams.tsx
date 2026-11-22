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

  const figureWrap = `rounded-xl border p-4 sm:p-5 space-y-4 ${
    isDark ? 'bg-slate-950/75 border-slate-800' : 'bg-slate-50/70 border-slate-200'
  }`;

  const subCardWrap = `rounded-xl border p-4 sm:p-5 space-y-3 ${
    isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
  }`;

  const subTitleClass = `text-sm sm:text-[15px] font-bold text-center ${
    isDark ? 'text-slate-100' : 'text-slate-900'
  }`;

  const subCaptionClass = `text-xs sm:text-[13px] text-center leading-relaxed ${
    isDark ? 'text-slate-400' : 'text-slate-600'
  }`;

  if (id === 'weibel-anatomy') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
            Şekil 1 — Weibel Dallanma Modeli (0–23. Jenerasyon), Kesit Alanı ve Alveolokapiller Bariyer
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            West B.1 · Nunn&apos;s B.1
          </span>
        </div>

        <div className="space-y-4">
          {/* Panel 1A: Weibel tree & area curve */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              Weibel Dallanma Modeli (0–23. Jenerasyon) ve Toplam Kesit Alanı Eğrisi
            </div>
            <svg
              viewBox="0 0 540 232"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Weibel dallanma ve kesit alanı şeması"
            >
              <defs>
                <linearGradient id="weibelFill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={palette.sky} stopOpacity="0.14" />
                  <stop offset="68%" stopColor={palette.sky} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={palette.teal} stopOpacity="0.38" />
                </linearGradient>
              </defs>

              <rect x="16" y="10" width="328" height="190" fill={palette.bg} stroke={palette.grid} />
              <rect x="344" y="10" width="180" height="190" fill={palette.tealSoft} stroke={palette.teal} strokeOpacity="0.4" />
              <line x1="344" y1="10" x2="344" y2="200" stroke={palette.teal} strokeWidth="2" strokeDasharray="5,4" />

              <text x="180" y="30" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={palette.sky}>
                İLETİCİ ZON (Jenerasyon 0–16)
              </text>
              <text x="180" y="47" textAnchor="middle" fontSize="11" fill={palette.muted}>
                Konveksiyon (Bulk Flow) · Ölü Boşluk ≈ 150 mL
              </text>

              <text x="434" y="30" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.teal}>
                RESPİRATUVAR ZON (17–23)
              </text>
              <text x="434" y="47" textAnchor="middle" fontSize="11" fill={palette.teal}>
                Moleküler Difüzyon · Asinus
              </text>

              {/* Branching schematic */}
              <g stroke={palette.axis} strokeLinecap="round" fill="none">
                <line x1="34" y1="106" x2="88" y2="106" strokeWidth="7.5" />
                <line x1="88" y1="106" x2="148" y2="80" strokeWidth="4.8" />
                <line x1="88" y1="106" x2="148" y2="132" strokeWidth="4.8" />
                <line x1="148" y1="80" x2="210" y2="68" strokeWidth="3.2" />
                <line x1="148" y1="80" x2="210" y2="92" strokeWidth="3.2" />
                <line x1="148" y1="132" x2="210" y2="120" strokeWidth="3.2" />
                <line x1="148" y1="132" x2="210" y2="144" strokeWidth="3.2" />
                <line x1="210" y1="68" x2="282" y2="61" strokeWidth="2" />
                <line x1="210" y1="68" x2="282" y2="75" strokeWidth="2" />
                <line x1="210" y1="92" x2="282" y2="85" strokeWidth="2" />
                <line x1="210" y1="92" x2="282" y2="99" strokeWidth="2" />
                <line x1="210" y1="120" x2="282" y2="113" strokeWidth="2" />
                <line x1="210" y1="120" x2="282" y2="127" strokeWidth="2" />
                <line x1="210" y1="144" x2="282" y2="137" strokeWidth="2" />
                <line x1="210" y1="144" x2="282" y2="151" strokeWidth="2" />
              </g>

              {/* Alveolar clusters */}
              <g fill={palette.tealSoft} stroke={palette.teal} strokeWidth="1.5">
                <circle cx="378" cy="76" r="10" />
                <circle cx="398" cy="72" r="10" />
                <circle cx="416" cy="80" r="10" />
                <circle cx="378" cy="108" r="10" />
                <circle cx="398" cy="104" r="10" />
                <circle cx="416" cy="112" r="10" />
                <circle cx="378" cy="138" r="10" />
                <circle cx="398" cy="134" r="10" />
                <circle cx="416" cy="142" r="10" />
              </g>

              {/* Exponential cross-sectional area curve */}
              <path
                d="M 26 194 L 286 192 Q 344 186 386 162 T 514 110 L 514 200 L 26 200 Z"
                fill="url(#weibelFill)"
              />
              <path
                d="M 26 194 L 286 192 Q 344 186 386 162 T 514 110"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.8"
              />
              <text x="172" y="184" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
                Toplam Kesit Alanı (cm<tspan fontSize="8" dy="-4">2</tspan><tspan dy="4">)</tspan>
              </text>
              <text x="466" y="184" textAnchor="middle" fontSize="12" fontWeight="800" fill={palette.teal}>
                &gt; 10.000 cm<tspan fontSize="8" dy="-4">2</tspan>
              </text>

              {/* X-axis */}
              <line x1="16" y1="200" x2="524" y2="200" stroke={palette.axis} strokeWidth="1.6" />
              <text x="24" y="218" fontSize="11" fill={palette.muted}>0 (Trakea)</text>
              <text x="184" y="218" textAnchor="middle" fontSize="11" fill={palette.muted}>8 (Bronş)</text>
              <text x="344" y="218" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.teal}>16 (Term. Br.)</text>
              <text x="518" y="218" textAnchor="end" fontSize="11" fill={palette.muted}>23 (Alveol)</text>
            </svg>
            <p className={subCaptionClass}>
              Paralel dallanma nedeniyle çap &lt; 2 mm havayolları toplam direncin yalnızca %10–20&apos;sini oluşturur.
            </p>
          </div>

          {/* Panel 1B: Alveolocapillary barrier cross-section */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              Alveolokapiller Bariyer (İnce Gaz Değişim Tarafı: 0,2 – 0,5 µm)
            </div>
            <svg
              viewBox="0 0 540 218"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Alveolokapiller bariyer katmanları"
            >
              <rect x="28" y="8" width="484" height="34" rx="6" fill={palette.skySoft} stroke={palette.sky} strokeOpacity="0.45" />
              <text x="270" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill={palette.sky}>
                Alveol Havası (O<tspan fontSize="9" dy="3">2</tspan><tspan dy="-3"> ↓ · CO</tspan><tspan fontSize="9" dy="3">2</tspan><tspan dy="-3"> ↑)</tspan>
              </text>

              <rect x="28" y="47" width="484" height="24" rx="4" fill={palette.tealSoft} stroke={palette.teal} strokeOpacity="0.5" />
              <text x="270" y="63" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.teal}>
                1. Sürfaktan Film (DPPC)
              </text>

              <rect x="28" y="76" width="484" height="28" rx="4" fill={palette.bg} stroke={palette.border} />
              <text x="270" y="94" textAnchor="middle" fontSize="12" fontWeight="600" fill={palette.text}>
                2. Tip I Alveoler Epitel (~0,1 µm)
              </text>

              <rect x="28" y="109" width="484" height="26" rx="4" fill={palette.amberSoft} stroke={palette.amber} strokeOpacity="0.5" />
              <text x="270" y="126" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.amber}>
                3. Kaynaşmış Bazal Membran
              </text>

              <rect x="28" y="140" width="484" height="28" rx="4" fill={palette.bg} stroke={palette.border} />
              <text x="270" y="158" textAnchor="middle" fontSize="12" fontWeight="600" fill={palette.text}>
                4. Pulmoner Kapiller Endoteli
              </text>

              <rect x="28" y="173" width="484" height="38" rx="6" fill={palette.roseSoft} stroke={palette.rose} strokeOpacity="0.5" />
              <ellipse cx="104" cy="192" rx="24" ry="10" fill={palette.rose} fillOpacity="0.75" />
              <ellipse cx="436" cy="192" rx="24" ry="10" fill={palette.rose} fillOpacity="0.75" />
              <text x="270" y="196" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={palette.rose}>
                Kapiller Kan (RBC)
              </text>
            </svg>
            <p className={subCaptionClass}>
              Tip II pnömositler alveol köşelerinde sürfaktan (DPPC) sentezler ve Tip I epitel hasarında çoğalır.
            </p>
          </div>
        </div>
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

        <div className="space-y-4">
          {/* Panel 2A: P-V Loop */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              P–V Döngüsü: Histerezis, LIP ve UIP (Gagalaşma)
            </div>
            <svg
              viewBox="0 0 540 245"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Basınç-hacim histerezis döngüsü"
            >
              <rect x="66" y="16" width="444" height="196" fill={palette.bg} stroke={palette.grid} />
              <rect x="402" y="16" width="108" height="62" fill={palette.roseSoft} />
              <text x="456" y="38" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.rose}>
                UIP / Gagalaşma
              </text>
              <text x="456" y="54" textAnchor="middle" fontSize="10.5" fill={palette.rose}>
                (Aşırı Gerilme)
              </text>

              {/* Static compliance slope */}
              <line x1="84" y1="200" x2="404" y2="48" stroke={palette.axis} strokeWidth="1.6" strokeDasharray="5,4" />
              <text x="228" y="114" transform="rotate(-25 228 114)" fontSize="11.5" fontWeight="600" fill={palette.muted}>
                Statik Kompliyans (ΔV/ΔP)
              </text>

              {/* Inspiratory & Expiratory limbs */}
              <path
                d="M 84 200 Q 162 192 204 168 Q 278 112 402 48 Q 452 35 496 32"
                fill="none"
                stroke={palette.sky}
                strokeWidth="3.2"
              />
              <path
                d="M 496 32 Q 332 36 204 86 Q 112 134 84 200"
                fill="none"
                stroke={palette.teal}
                strokeWidth="3.2"
              />

              {/* LIP & UIP dots */}
              <circle cx="195" cy="174" r="5.5" fill={palette.amber} stroke={palette.panel} strokeWidth="1.8" />
              <text x="210" y="186" fontSize="12" fontWeight="800" fill={palette.amber}>
                LIP (Alt İnfleksiyon)
              </text>
              <circle cx="402" cy="48" r="5.5" fill={palette.rose} stroke={palette.panel} strokeWidth="1.8" />

              <text x="314" y="150" fontSize="12.5" fontWeight="700" fill={palette.sky}>
                İnspirasyon →
              </text>
              <text x="132" y="72" fontSize="12.5" fontWeight="700" fill={palette.teal}>
                ← Ekspirasyon
              </text>

              <text x="56" y="28" textAnchor="end" fontSize="11.5" fontWeight="700" fill={palette.muted}>
                Hacim
              </text>
              <text x="56" y="214" textAnchor="end" fontSize="11.5" fill={palette.muted}>
                0
              </text>
              <text x="288" y="234" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.text}>
                Havayolu Basıncı (cmH<tspan fontSize="8.5" dy="3">2</tspan><tspan dy="-3">O)</tspan>
              </text>
            </svg>
            <p className={subCaptionClass}>
              Histerezis: sürfaktan dinamiği + alveolar recruitment + viskoelastisite.
            </p>
          </div>

          {/* Panel 2B: EPP Diagram */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              Zorlu Ekspirasyonda Eşit Basınç Noktası (EPP)
            </div>
            <svg
              viewBox="0 0 540 250"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Zorlu ekspirasyonda eşit basınç noktası şeması"
            >
              {/* Normal scenario */}
              <rect x="16" y="10" width="508" height="106" rx="8" fill={palette.bg} stroke={palette.grid} />
              <text x="30" y="30" fontSize="12" fontWeight="700" fill={palette.teal}>
                Normal Akciğer (P<tspan fontSize="8.5" dy="2.5">pl</tspan><tspan dy="-2.5"> = +20, P</tspan><tspan fontSize="8.5" dy="2.5">el</tspan><tspan dy="-2.5"> = +10 ⇒ P</tspan><tspan fontSize="8.5" dy="2.5">alv</tspan><tspan dy="-2.5"> = +30 cmH</tspan><tspan fontSize="8.5" dy="2.5">2</tspan><tspan dy="-2.5">O)</tspan>
              </text>

              <circle cx="64" cy="70" r="24" fill={palette.tealSoft} stroke={palette.teal} strokeWidth="2.2" />
              <text x="64" y="75" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={palette.teal}>+30</text>
              <path d="M 88 58 L 484 58 M 88 82 L 484 82" stroke={palette.axis} strokeWidth="2.2" />

              {/* Cartilage ticks on right half */}
              <g stroke={palette.sky} strokeWidth="2.8">
                <line x1="286" y1="53" x2="286" y2="59" />
                <line x1="322" y1="53" x2="322" y2="59" />
                <line x1="358" y1="53" x2="358" y2="59" />
                <line x1="394" y1="53" x2="394" y2="59" />
                <line x1="286" y1="81" x2="286" y2="87" />
                <line x1="322" y1="81" x2="322" y2="87" />
                <line x1="358" y1="81" x2="358" y2="87" />
                <line x1="394" y1="81" x2="394" y2="87" />
              </g>
              <text x="166" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill={palette.text}>+25</text>
              <circle cx="316" cy="70" r="13.5" fill={palette.tealSoft} stroke={palette.teal} strokeWidth="1.8" />
              <text x="316" y="74" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.teal}>+20</text>
              <text x="426" y="74" textAnchor="middle" fontSize="12" fontWeight="600" fill={palette.text}>+10 → 0</text>
              <text x="316" y="106" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.teal}>
                EPP kıkırdaklı bronşta (havayolu çökmez)
              </text>

              {/* Emphysema scenario */}
              <rect x="16" y="128" width="508" height="112" rx="8" fill={palette.bg} stroke={palette.rose} strokeOpacity="0.45" />
              <text x="30" y="148" fontSize="12" fontWeight="700" fill={palette.rose}>
                Amfizem / KOAH (P<tspan fontSize="8.5" dy="2.5">el</tspan><tspan dy="-2.5"> ↓ = +4 ⇒ P</tspan><tspan fontSize="8.5" dy="2.5">alv</tspan><tspan dy="-2.5"> = +24 cmH</tspan><tspan fontSize="8.5" dy="2.5">2</tspan><tspan dy="-2.5">O)</tspan>
              </text>

              <circle cx="64" cy="188" r="24" fill={palette.roseSoft} stroke={palette.rose} strokeWidth="2.2" />
              <text x="64" y="193" textAnchor="middle" fontSize="12.5" fontWeight="700" fill={palette.rose}>+24</text>

              {/* Collapsing airway */}
              <path d="M 88 176 L 176 176 Q 232 186 284 176 L 484 176" fill="none" stroke={palette.rose} strokeWidth="2.4" />
              <path d="M 88 200 L 176 200 Q 232 190 284 200 L 484 200" fill="none" stroke={palette.rose} strokeWidth="2.4" />
              <circle cx="164" cy="188" r="13" fill={palette.roseSoft} stroke={palette.rose} strokeWidth="1.8" />
              <text x="164" y="192" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.rose}>+20</text>
              <text x="232" y="168" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.rose}>Kollaps</text>
              <text x="392" y="192" textAnchor="middle" fontSize="12" fontWeight="600" fill={palette.muted}>Hava hapsi</text>
              <text x="270" y="228" textAnchor="middle" fontSize="11.5" fontWeight="600" fill={palette.muted}>
                EPP kıkırdaksız distale kayar → Büzük dudak / PEEP EPP&apos;yi proksimale iter.
              </text>
            </svg>
          </div>
        </div>
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

        <div className="space-y-4">
          {/* Panel 3A: Spirogram */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              Spirogram: 4 Hacim ve 4 Kapasite (70 kg Erkek · 5,9 L)
            </div>
            <svg
              viewBox="0 0 540 245"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Spirogram akciğer hacimleri ve kapasiteleri"
            >
              {/* Y axis & horizontal bands */}
              <rect x="56" y="14" width="254" height="214" fill={palette.bg} stroke={palette.grid} />
              {/* IRV band (3.0 L) */}
              <rect x="56" y="14" width="254" height="104" fill={palette.skySoft} fillOpacity="0.45" />
              {/* VT band (0.5 L) */}
              <rect x="56" y="118" width="254" height="22" fill={palette.tealSoft} fillOpacity="0.85" />
              {/* ERV band (1.2 L) */}
              <rect x="56" y="140" width="254" height="42" fill={palette.amberSoft} fillOpacity="0.5" />
              {/* RV band (1.2 L) */}
              <rect x="56" y="182" width="254" height="46" fill={palette.roseSoft} fillOpacity="0.65" />

              {/* Spirogram wave */}
              <path
                d="M 62 138 Q 78 118 94 138 Q 110 118 126 138 Q 140 118 160 18 Q 176 18 198 180 Q 214 180 230 138 Q 246 118 262 138 Q 278 118 296 138"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.8"
              />

              {/* Dashed RV line */}
              <line x1="56" y1="182" x2="310" y2="182" stroke={palette.rose} strokeWidth="1.6" strokeDasharray="4,3" />

              {/* Volume labels inside */}
              <text x="66" y="64" fontSize="12.5" fontWeight="700" fill={palette.sky}>IRV (3,0 L)</text>
              <text x="66" y="133" fontSize="11.5" fontWeight="800" fill={palette.teal}>
                V<tspan fontSize="8" dy="2.5">T</tspan><tspan dy="-2.5"> (0,5 L)</tspan>
              </text>
              <text x="66" y="166" fontSize="12.5" fontWeight="700" fill={palette.amber}>ERV (1,2 L)</text>
              <text x="66" y="210" fontSize="11.5" fontWeight="700" fill={palette.rose}>RV (1,2 L · Spirometri ölçmez)</text>

              {/* Y axis ticks */}
              <text x="48" y="22" textAnchor="end" fontSize="11.5" fill={palette.muted}>5,9 L</text>
              <text x="48" y="144" textAnchor="end" fontSize="11.5" fontWeight="700" fill={palette.teal}>2,4 L</text>
              <text x="48" y="186" textAnchor="end" fontSize="11.5" fill={palette.muted}>1,2 L</text>
              <text x="48" y="232" textAnchor="end" fontSize="11.5" fill={palette.muted}>0</text>

              {/* Capacity brackets on right */}
              {/* IC: 14 to 140 */}
              <path d="M 320 16 L 328 16 L 328 138 L 320 138" fill="none" stroke={palette.sky} strokeWidth="1.8" />
              <text x="336" y="82" fontSize="12" fontWeight="700" fill={palette.sky}>IC (3,5 L)</text>

              {/* FRC: 140 to 228 */}
              <path d="M 320 142 L 328 142 L 328 226 L 320 226" fill="none" stroke={palette.teal} strokeWidth="2.2" />
              <text x="336" y="188" fontSize="12.5" fontWeight="800" fill={palette.teal}>FRC (2,4 L)</text>

              {/* VC: 14 to 182 */}
              <path d="M 412 16 L 420 16 L 420 180 L 412 180" fill="none" stroke={palette.amber} strokeWidth="1.8" />
              <text x="428" y="102" fontSize="12" fontWeight="700" fill={palette.amber}>VC (4,7 L)</text>

              {/* TLC: 14 to 228 */}
              <path d="M 484 16 L 492 16 L 492 226 L 484 226" fill="none" stroke={palette.text} strokeWidth="2" />
              <text x="498" y="126" fontSize="12" fontWeight="800" fill={palette.text}>TLC</text>
            </svg>
            <p className={subCaptionClass}>
              FRC = ERV + RV (Dikten toplam ~%35–45; supine göre indüksiyonla ek %15–20 düşer).
            </p>
          </div>

          {/* Panel 3B: Rahn Diagram */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              Rahn Diyagramı: Statik Basınç–Hacim Dengesi
            </div>
            <svg
              viewBox="0 0 540 242"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Rahn statik basınç-hacim dengesi diyagramı"
            >
              <rect x="66" y="22" width="444" height="190" fill={palette.bg} stroke={palette.grid} />

              {/* Zero pressure line */}
              <line x1="278" y1="22" x2="278" y2="212" stroke={palette.axis} strokeWidth="1.8" />
              <text x="278" y="15" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>P = 0</text>

              {/* FRC line */}
              <line x1="66" y1="144" x2="510" y2="144" stroke={palette.teal} strokeWidth="1.6" strokeDasharray="5,4" />
              <text x="76" y="137" fontSize="12" fontWeight="700" fill={palette.teal}>Normal FRC (~%42 VC)</text>

              {/* Chest wall curve (blue dashed) */}
              <path
                d="M 116 206 Q 176 156 226 110 T 278 66 Q 298 46 324 30"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.6"
                strokeDasharray="6,4"
              />
              <text x="128" y="196" fontSize="12" fontWeight="700" fill={palette.sky}>Göğüs Duvarı</text>

              {/* Lung curve (red dashed) */}
              <path
                d="M 288 206 Q 324 162 368 118 T 468 42"
                fill="none"
                stroke={palette.rose}
                strokeWidth="2.6"
                strokeDasharray="6,4"
              />
              <text x="434" y="102" fontSize="12" fontWeight="700" fill={palette.rose}>Akciğer</text>

              {/* Combined system curve */}
              <path
                d="M 126 206 Q 208 175 278 144 T 424 68 Q 460 46 492 30"
                fill="none"
                stroke={palette.text}
                strokeWidth="3.2"
              />
              <text x="398" y="132" fontSize="12.5" fontWeight="800" fill={palette.text}>Sistem</text>

              <circle cx="278" cy="144" r="5.5" fill={palette.teal} stroke={palette.panel} strokeWidth="1.8" />

              <text x="58" y="32" textAnchor="end" fontSize="11.5" fill={palette.muted}>100%</text>
              <text x="58" y="212" textAnchor="end" fontSize="11.5" fill={palette.muted}>RV</text>
              <text x="166" y="232" textAnchor="middle" fontSize="12" fill={palette.muted}>−20 (Dışa)</text>
              <text x="278" y="232" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.text}>0</text>
              <text x="404" y="232" textAnchor="middle" fontSize="12" fill={palette.muted}>
                +20 cmH<tspan fontSize="8.5" dy="2.5">2</tspan><tspan dy="-2.5">O (İçe)</tspan>
              </text>
            </svg>
            <p className={subCaptionClass}>
              FRC&apos;de akciğer içe çekilmesi (+5 cmH<sub className="text-[0.75em]">2</sub>O) ile göğüs duvarı dışa çekilmesi (−5 cmH<sub className="text-[0.75em]">2</sub>O) eşitlenir.
            </p>
          </div>
        </div>
      </figure>
    );
  }

  if (id === 'west-zones-pvr') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-sky-400' : 'text-sky-800'}`}>
            Şekil 4 — West Pulmoner Perfüzyon Zonları (1–4) ve Akciğer Hacmine Göre U-Şekilli PVR
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            West B.4–5 · Nunn&apos;s B.6 · Hughes 1968
          </span>
        </div>

        <div className="space-y-4">
          {/* Panel 4A: West Zones */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              Dik Pozisyonda West Zonları (Apeks → En Bazal)
            </div>
            <svg
              viewBox="0 0 540 248"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Dik pozisyonda West pulmoner perfüzyon zonları 1 ile 4 arası"
            >
              {/* Stylized Lung Silhouette divided into 4 horizontal zones */}
              <path
                d="M 114 14 C 74 26 44 100 36 218 C 36 230 52 238 96 236 C 142 234 172 230 184 218 C 190 146 174 44 136 16 C 128 11 120 11 114 14 Z"
                fill={palette.bg}
                stroke={palette.axis}
                strokeWidth="2"
              />

              {/* Zone dividers */}
              <line x1="60" y1="68" x2="520" y2="68" stroke={palette.border} strokeWidth="1.4" strokeDasharray="5,3" />
              <line x1="46" y1="124" x2="520" y2="124" stroke={palette.border} strokeWidth="1.4" strokeDasharray="5,3" />
              <line x1="40" y1="180" x2="520" y2="180" stroke={palette.border} strokeWidth="1.4" strokeDasharray="5,3" />

              {/* Zone 1 */}
              <rect x="212" y="14" width="312" height="48" rx="7" fill={palette.amberSoft} />
              <text x="114" y="47" textAnchor="middle" fontSize="13" fontWeight="800" fill={palette.amber}>ZON 1</text>
              <text x="226" y="34" fontSize="12.5" fontWeight="800" fill={palette.amber}>
                P<tspan fontSize="8.5" dy="2.5">A</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">a</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">v</tspan><tspan dy="-2.5"> (Ölü Boşluk)</tspan>
              </text>
              <text x="226" y="53" fontSize="11.5" fill={palette.text}>
                Yüksek PEEP / hipovolemide artar
              </text>

              {/* Zone 2 */}
              <rect x="212" y="73" width="312" height="46" rx="7" fill={palette.skySoft} />
              <text x="114" y="102" textAnchor="middle" fontSize="13" fontWeight="800" fill={palette.sky}>ZON 2</text>
              <text x="226" y="92" fontSize="12.5" fontWeight="800" fill={palette.sky}>
                P<tspan fontSize="8.5" dy="2.5">a</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">A</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">v</tspan><tspan dy="-2.5"> (Şelale)</tspan>
              </text>
              <text x="226" y="110" fontSize="11.5" fill={palette.text}>
                Akım ∝ (P<tspan fontSize="8" dy="2">a</tspan><tspan dy="-2"> − P</tspan><tspan fontSize="8" dy="2">A</tspan><tspan dy="-2">) · Orta bölge</tspan>
              </text>

              {/* Zone 3 */}
              <rect x="212" y="129" width="312" height="46" rx="7" fill={palette.tealSoft} />
              <text x="114" y="158" textAnchor="middle" fontSize="13" fontWeight="800" fill={palette.teal}>ZON 3</text>
              <text x="226" y="148" fontSize="12.5" fontWeight="800" fill={palette.teal}>
                P<tspan fontSize="8.5" dy="2.5">a</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">v</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">A</tspan><tspan dy="-2.5"> (Sürekli Akım)</tspan>
              </text>
              <text x="226" y="166" fontSize="11.5" fill={palette.text}>
                Akım ∝ (P<tspan fontSize="8" dy="2">a</tspan><tspan dy="-2"> − P</tspan><tspan fontSize="8" dy="2">v</tspan><tspan dy="-2">) · En yoğun akım</tspan>
              </text>

              {/* Zone 4 */}
              <rect x="212" y="185" width="312" height="50" rx="7" fill={palette.roseSoft} />
              <text x="112" y="213" textAnchor="middle" fontSize="13" fontWeight="800" fill={palette.rose}>ZON 4</text>
              <text x="226" y="205" fontSize="12.2" fontWeight="800" fill={palette.rose}>
                P<tspan fontSize="8.5" dy="2.5">a</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8" dy="2.5">isf</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">v</tspan><tspan dy="-2.5"> &gt; P</tspan><tspan fontSize="8.5" dy="2.5">A</tspan><tspan dy="-2.5"> (Bazal Sıkışma)</tspan>
              </text>
              <text x="226" y="224" fontSize="11.2" fill={palette.text}>
                Düşük hacim / obezite / ödemde akım ↓
              </text>
            </svg>
            <p className={subCaptionClass}>
              V/Q oranı apeks (~3,0) → taban (~0,6) düşer; en bazalde (Zon 4) ekstra-alveoler sıkışma nedeniyle akım tekrar azalır.
            </p>
          </div>

          {/* Panel 4B: U-Shaped PVR vs Lung Volume */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              Akciğer Hacmine Göre PVR (Minimum = FRC)
            </div>
            <svg
              viewBox="0 0 540 236"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Akciğer hacmine göre pulmoner vasküler direnç U-eğrisi"
            >
              <rect x="64" y="16" width="446" height="190" fill={palette.bg} stroke={palette.grid} />

              {/* FRC vertical marker */}
              <line x1="268" y1="16" x2="268" y2="206" stroke={palette.teal} strokeWidth="1.8" strokeDasharray="5,4" />
              <text x="268" y="196" textAnchor="middle" fontSize="12" fontWeight="800" fill={palette.teal}>
                FRC (Min. PVR)
              </text>

              {/* Extra-alveolar vessel resistance */}
              <path
                d="M 88 46 Q 182 120 310 165 T 490 186"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.4"
                strokeDasharray="6,4"
              />
              <text x="96" y="38" fontSize="12" fontWeight="700" fill={palette.sky}>
                Ekstra-alveoler
              </text>

              {/* Alveolar capillary resistance */}
              <path
                d="M 88 186 Q 244 172 368 120 T 490 40"
                fill="none"
                stroke={palette.rose}
                strokeWidth="2.4"
                strokeDasharray="6,4"
              />
              <text x="424" y="38" fontSize="12" fontWeight="700" fill={palette.rose}>
                Alveoler
              </text>

              {/* Total PVR U-curve */}
              <path
                d="M 88 34 Q 184 134 268 144 Q 368 134 490 30"
                fill="none"
                stroke={palette.text}
                strokeWidth="3.4"
              />
              <circle cx="268" cy="144" r="5.5" fill={palette.teal} stroke={palette.panel} strokeWidth="1.8" />
              <text x="268" y="126" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={palette.text}>
                Toplam PVR
              </text>

              <text x="54" y="30" textAnchor="end" fontSize="11.5" fontWeight="700" fill={palette.muted}>PVR</text>
              <text x="88" y="226" textAnchor="middle" fontSize="12" fill={palette.muted}>RV</text>
              <text x="268" y="226" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.teal}>FRC</text>
              <text x="488" y="226" textAnchor="middle" fontSize="12" fill={palette.muted}>TLC</text>
            </svg>
            <p className={subCaptionClass}>
              Hem atelektazi (RV) hem aşırı şişirme (TLC) pulmoner vasküler direnci ve sağ ventrikül afterload&apos;unu artırır.
            </p>
          </div>
        </div>
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

      <div className="space-y-4">
        {/* Panel 5A: O2-Hb Dissociation Curve */}
        <div className={subCardWrap}>
          <div className={subTitleClass}>
            O<sub className="text-[0.75em]">2</sub>–Hemoglobin Dissosiyasyon Eğrisi (P<sub className="text-[0.75em]">50</sub> = 26,8 mmHg)
          </div>
          <svg
            viewBox="0 0 540 245"
            className="w-full max-w-3xl mx-auto h-auto"
            role="img"
            aria-label="Oksijen-hemoglobin dissosiyasyon eğrisi"
          >
            <rect x="64" y="16" width="448" height="194" fill={palette.bg} stroke={palette.grid} />

            {/* Reference lines: 90% @ 60 mmHg and 50% @ 26.8 mmHg */}
            <line x1="64" y1="38" x2="298" y2="38" stroke={palette.teal} strokeWidth="1.4" strokeDasharray="4,3" />
            <line x1="298" y1="38" x2="298" y2="210" stroke={palette.teal} strokeWidth="1.4" strokeDasharray="4,3" />

            <line x1="64" y1="114" x2="174" y2="114" stroke={palette.amber} strokeWidth="1.4" strokeDasharray="4,3" />
            <line x1="174" y1="114" x2="174" y2="210" stroke={palette.amber} strokeWidth="1.4" strokeDasharray="4,3" />

            {/* Left-shifted curve */}
            <path
              d="M 64 210 C 104 180 122 86 184 42 C 238 27 346 23 496 21"
              fill="none"
              stroke={palette.sky}
              strokeWidth="2.2"
              strokeDasharray="6,4"
            />
            <text x="150" y="34" fontSize="11.5" fontWeight="700" fill={palette.sky}>
              ← Sola (↓T, ↑pH, ↓2,3-DPG)
            </text>

            {/* Right-shifted curve */}
            <path
              d="M 64 210 C 142 198 194 134 250 70 C 310 38 390 27 496 24"
              fill="none"
              stroke={palette.rose}
              strokeWidth="2.2"
              strokeDasharray="6,4"
            />
            <text x="282" y="138" fontSize="11.5" fontWeight="700" fill={palette.rose}>
              Sağa (↑T, ↓pH, ↑CO<tspan fontSize="8" dy="2.5">2</tspan><tspan dy="-2.5">, ↑DPG) →</tspan>
            </text>

            {/* Normal sigmoid curve */}
            <path
              d="M 64 210 C 124 194 156 120 206 62 C 254 34 344 25 496 22"
              fill="none"
              stroke={palette.text}
              strokeWidth="3.4"
            />

            {/* Key clinical points */}
            <circle cx="174" cy="114" r="5.5" fill={palette.amber} stroke={palette.panel} strokeWidth="1.8" />
            <circle cx="298" cy="38" r="5.5" fill={palette.teal} stroke={palette.panel} strokeWidth="1.8" />
            <text x="310" y="56" fontSize="12" fontWeight="700" fill={palette.teal}>
              Kritik Diz: 60 mmHg / %90
            </text>

            <text x="56" y="26" textAnchor="end" fontSize="11.5" fill={palette.muted}>100%</text>
            <text x="56" y="42" textAnchor="end" fontSize="11.5" fontWeight="700" fill={palette.teal}>90%</text>
            <text x="56" y="118" textAnchor="end" fontSize="11.5" fontWeight="700" fill={palette.amber}>50%</text>
            <text x="56" y="212" textAnchor="end" fontSize="11.5" fill={palette.muted}>0</text>

            <text x="174" y="226" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.amber}>26,8</text>
            <text x="298" y="226" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.teal}>60</text>
            <text x="466" y="226" textAnchor="middle" fontSize="11.5" fill={palette.muted}>100 mmHg</text>
            <text x="288" y="242" textAnchor="middle" fontSize="12" fontWeight="700" fill={palette.text}>
              PO<tspan fontSize="8.5" dy="2.5">2</tspan><tspan dy="-2.5"> (mmHg)</tspan>
            </text>
          </svg>
          <p className={subCaptionClass}>
            Üst plato (PO<sub className="text-[0.75em]">2</sub> &gt; 60 mmHg) güvenlik marjı sağlarken, dik kol periferik dokulara O<sub className="text-[0.75em]">2</sub> bırakımını hızlandırır.
          </p>
        </div>

        {/* Panel 5B: Oxygen Cascade Step Chart */}
        <div className={subCardWrap}>
          <div className={subTitleClass}>
            Oksijen Kaskadı (F<sub className="text-[0.75em]">i</sub>O<sub className="text-[0.75em]">2</sub> = 0,21 · mmHg)
          </div>
          <svg
            viewBox="0 0 540 232"
            className="w-full max-w-3xl mx-auto h-auto"
            role="img"
            aria-label="Oksijen kaskadı basamak grafiği"
          >
            <rect x="64" y="16" width="448" height="184" fill={palette.bg} stroke={palette.grid} />

            {/* Step bars */}
            {[
              { label: 'Atm', val: 159, h: 154, color: palette.sky },
              { label: 'Trakea', val: 149, h: 144, color: palette.sky },
              { label: 'Alveol', val: 100, h: 97, color: palette.teal },
              { label: 'Arter', val: 95, h: 92, color: palette.teal },
              { label: 'Venöz', val: 40, h: 40, color: palette.amber },
              { label: 'Mitok.', val: 10, h: 14, color: palette.rose },
            ].map((step, i) => {
              const x = 86 + i * 71;
              const y = 200 - step.h;
              return (
                <g key={step.label}>
                  <rect x={x} y={y} width="50" height={step.h} rx="5" fill={step.color} fillOpacity="0.82" />
                  <text x={x + 25} y={y - 6} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={palette.text}>
                    {step.val}
                  </text>
                  <text x={x + 25} y="220" textAnchor="middle" fontSize="12" fontWeight="600" fill={palette.muted}>
                    {step.label}
                  </text>
                </g>
              );
            })}

            <text x="56" y="44" textAnchor="end" fontSize="11.5" fill={palette.muted}>160</text>
            <text x="56" y="104" textAnchor="end" fontSize="11.5" fill={palette.muted}>100</text>
            <text x="56" y="164" textAnchor="end" fontSize="11.5" fill={palette.muted}>40</text>
            <text x="56" y="202" textAnchor="end" fontSize="11.5" fill={palette.muted}>0</text>
          </svg>
          <p className={subCaptionClass}>
            Atmosferden mitokondriye basamaklı basınç düşüşü (Pasteur eşiği ≈ 1–3 mmHg).
          </p>
        </div>
      </div>
    </figure>
  );
};

export default RespiratoryTextbookDiagram;
