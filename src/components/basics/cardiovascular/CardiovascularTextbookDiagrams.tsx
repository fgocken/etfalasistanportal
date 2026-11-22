import React from 'react';

export type CardiovascularDiagramId =
  | 'vascular-ecc'
  | 'action-potentials'
  | 'wiggers-pv'
  | 'frank-starling-guyton'
  | 'coronary-autoregulation'
  | 'valvular-pv-loops';

interface DiagramProps {
  id: CardiovascularDiagramId;
  isDark: boolean;
}

export const CardiovascularTextbookDiagram: React.FC<DiagramProps> = ({ id, isDark }) => {
  const palette = isDark
    ? {
        bg: '#0b1220',
        panel: '#0f172a',
        border: '#1e293b',
        grid: '#1e293b',
        axis: '#94a3b8',
        text: '#e2e8f0',
        muted: '#94a3b8',
        crimson: '#fb7185',
        crimsonStrong: '#f43f5e',
        crimsonSoft: 'rgba(244,63,94,0.16)',
        sky: '#38bdf8',
        skySoft: 'rgba(56,189,248,0.16)',
        teal: '#2dd4bf',
        tealSoft: 'rgba(45,212,191,0.16)',
        amber: '#fbbf24',
        amberSoft: 'rgba(251,191,36,0.16)',
        indigo: '#818cf8',
        indigoSoft: 'rgba(129,140,248,0.18)',
      }
    : {
        bg: '#f8fafc',
        panel: '#ffffff',
        border: '#cbd5e1',
        grid: '#e2e8f0',
        axis: '#475569',
        text: '#0f172a',
        muted: '#475569',
        crimson: '#be123c',
        crimsonStrong: '#e11d48',
        crimsonSoft: '#ffe4e6',
        sky: '#0284c7',
        skySoft: '#e0f2fe',
        teal: '#0d9488',
        tealSoft: '#ccfbf1',
        amber: '#d97706',
        amberSoft: '#fef3c7',
        indigo: '#1e3a8a',
        indigoSoft: '#dbeafe',
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

  if (id === 'vascular-ecc') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-rose-400' : 'text-rose-800'}`}>
            Şekil 1 — Vasküler Ağaç Basınç/Hacim Profili ve Kardiyomiyosit ECC
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Klabunde B.1–2 · Guyton &amp; Hall
          </span>
        </div>

        <div className="space-y-4">
          {/* Panel 1A: Pressure & Volume Profile */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              A. Sistemik Vasküler Ağaç Boyunca Basınç Düşüşü ve Kan Hacmi Dağılımı
            </div>
            <svg
              viewBox="0 0 560 264"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Sistemik vasküler ağaç basınç düşüşü ve kan hacmi dağılımı"
            >
              {/* Plot Area */}
              <rect x="64" y="14" width="474" height="196" fill={palette.bg} stroke={palette.grid} />

              {/* Horizontal grid lines (0..120) */}
              {[0, 20, 40, 60, 80, 100, 120].map((v) => {
                const y = 210 - (v / 120) * 190;
                return (
                  <g key={v}>
                    <line x1="64" y1={y} x2="538" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="11" fill={palette.muted}>
                      {v}
                    </text>
                  </g>
                );
              })}

              {/* Vertical segment dividers */}
              <line x1="182" y1="14" x2="182" y2="210" stroke={palette.grid} strokeWidth="1" />
              <line x1="301" y1="14" x2="301" y2="210" stroke={palette.grid} strokeWidth="1" />
              <line x1="420" y1="14" x2="420" y2="210" stroke={palette.grid} strokeWidth="1" />

              {/* Y-axis label */}
              <text
                x="18"
                y="112"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill={palette.text}
                transform="rotate(-90 18 112)"
              >
                Basınç (mmHg) / Hacim (%)
              </text>

              {/* Pulsatile pressure envelope in Aorta/Arteries */}
              <path
                d="M 66 20 Q 124 24 182 54 Q 214 96 248 148 L 248 164 Q 210 130 182 96 Q 124 84 66 84 Z"
                fill={palette.crimsonSoft}
              />

              {/* Mean arterial pressure curve */}
              <path
                d="M 66 61 Q 124 64 182 76 Q 222 126 274 160 Q 340 180 420 194 Q 480 202 534 206"
                fill="none"
                stroke={palette.crimson}
                strokeWidth="3.2"
              />

              {/* Blood volume distribution dashed blue curve & fill */}
              <path
                d="M 66 210 L 66 196 Q 112 184 156 204 Q 210 208 262 204 Q 332 194 378 190 Q 438 112 478 106 Q 512 124 534 208 L 534 210 Z"
                fill={palette.skySoft}
              />
              <path
                d="M 66 196 Q 112 184 156 204 Q 210 208 262 204 Q 332 194 378 190 Q 438 112 478 106 Q 512 124 534 208"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.6"
                strokeDasharray="6,4"
              />

              {/* Callout: MAP ≈ 93 mmHg */}
              <text x="116" y="40" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.crimson}>
                MAP ≈ 93 mmHg
              </text>

              {/* Callout: En keskin ΔP */}
              <rect x="240" y="42" width="112" height="36" rx="6" fill={palette.amberSoft} stroke={palette.amber} strokeWidth="1.2" />
              <text x="296" y="57" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={palette.amber}>
                En keskin ΔP
              </text>
              <text x="296" y="72" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={palette.amber}>
                (85 → 32 mmHg)
              </text>
              <line x1="256" y1="78" x2="232" y2="118" stroke={palette.amber} strokeWidth="1.6" />

              {/* Callout: Kan Hacminin ~%64'ü */}
              <text x="454" y="80" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.sky}>
                Kan Hacminin ~%64&apos;ü
              </text>
              <text x="454" y="95" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={palette.sky}>
                (Yüksek Kompliyans)
              </text>

              {/* Callout: CVP */}
              <rect x="462" y="142" width="66" height="32" rx="5" fill={palette.crimsonSoft} stroke={palette.crimson} strokeWidth="1.2" />
              <text x="495" y="156" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={palette.crimson}>
                CVP
              </text>
              <text x="495" y="169" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.crimson}>
                2–6 mmHg
              </text>
              <line x1="504" y1="174" x2="528" y2="202" stroke={palette.crimson} strokeWidth="1.4" />

              {/* Legend */}
              <rect x="380" y="20" width="152" height="36" rx="5" fill={palette.panel} stroke={palette.border} />
              <line x1="388" y1="32" x2="404" y2="32" stroke={palette.crimson} strokeWidth="2.8" />
              <text x="410" y="36" fontSize="10" fontWeight="600" fill={palette.text}>Ortalama Basınç (mmHg)</text>
              <line x1="388" y1="47" x2="404" y2="47" stroke={palette.sky} strokeWidth="2.2" strokeDasharray="4,3" />
              <text x="410" y="51" fontSize="10" fontWeight="600" fill={palette.text}>Toplam Kan Hacmi (%)</text>

              {/* X-axis segment captions */}
              <text x="123" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text}>Aort &amp; Arterler</text>
              <text x="123" y="242" textAnchor="middle" fontSize="10" fill={palette.muted}>(~%13 Hacim)</text>

              <text x="242" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text}>Arteriyoller</text>
              <text x="242" y="242" textAnchor="middle" fontSize="10" fill={palette.muted}>(Ana Direnç · ~%2)</text>

              <text x="360" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text}>Kapillerler</text>
              <text x="360" y="242" textAnchor="middle" fontSize="10" fill={palette.muted}>(Değişim · ~%5)</text>

              <text x="479" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text}>Venül &amp; Venler</text>
              <text x="479" y="242" textAnchor="middle" fontSize="10" fill={palette.muted}>(Kapasitans · ~%64)</text>
            </svg>
          </div>

          {/* Panel 1B: Cardiomyocyte ECC & Lusitropy */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              B. Kardiyomiyosit Eksitasyon–Kontraksiyon Kenetlenmesi (CICR) ve Aktif Lusitropi
            </div>
            <svg
              viewBox="0 0 560 228"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Kardiyomiyosit eksitasyon-kontraksiyon kenetlenmesi ve aktif lusitropi şeması"
            >
              {/* Top box: Sarcolemma & T-tubule */}
              <rect x="20" y="8" width="520" height="48" rx="8" fill={palette.skySoft} stroke={palette.sky} strokeWidth="1.6" />
              <text x="280" y="27" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={palette.sky}>
                Sarkolemma &amp; T-Tübül (Faz 2 Platosu)
              </text>
              <text x="280" y="45" textAnchor="middle" fontSize="11.2" fill={palette.text}>
                Voltaj kapılı L-tipi Ca<tspan fontSize="8" dy="-3.5">2+</tspan><tspan dy="3.5"> kanalı açılır → Hücre dışından tetikleyici Ca</tspan><tspan fontSize="8" dy="-3.5">2+</tspan><tspan dy="3.5"> girişi (~%10–20)</tspan>
              </text>

              {/* Down arrow to SR */}
              <line x1="145" y1="56" x2="145" y2="76" stroke={palette.sky} strokeWidth="2.2" />
              <polygon points="140,72 150,72 145,80" fill={palette.sky} />
              <text x="155" y="72" fontSize="10.8" fontWeight="700" fill={palette.sky}>
                Tetikleyici Ca<tspan fontSize="7.5" dy="-3">2+</tspan>
              </text>

              {/* Middle Left: Sarcoplasmic Reticulum */}
              <rect x="20" y="82" width="236" height="58" rx="8" fill={palette.amberSoft} stroke={palette.amber} strokeWidth="1.6" />
              <text x="138" y="102" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={palette.amber}>
                Sarkoplazmik Retikulum (SR)
              </text>
              <text x="138" y="119" textAnchor="middle" fontSize="10.8" fill={palette.text}>
                RyR2 reseptörü uyarılır → CICR ile
              </text>
              <text x="138" y="133" textAnchor="middle" fontSize="10.8" fill={palette.text}>
                yoğun Ca<tspan fontSize="7.5" dy="-3">2+</tspan><tspan dy="3"> salınımı (~%80–90)</tspan>
              </text>

              {/* Right arrow SR -> Sarcomere */}
              <line x1="256" y1="111" x2="298" y2="111" stroke={palette.crimson} strokeWidth="2.4" />
              <polygon points="294,106 294,116 302,111" fill={palette.crimson} />
              <text x="278" y="103" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={palette.crimson}>
                Ca<tspan fontSize="7.5" dy="-3">2+</tspan><tspan dy="3"> ↑</tspan>
              </text>

              {/* Middle Right: Sarcomere */}
              <rect x="304" y="82" width="236" height="58" rx="8" fill={palette.crimsonSoft} stroke={palette.crimson} strokeWidth="1.6" />
              <text x="422" y="102" textAnchor="middle" fontSize="12.5" fontWeight="800" fill={palette.crimson}>
                Sarkomer (Troponin C)
              </text>
              <text x="422" y="119" textAnchor="middle" fontSize="10.8" fill={palette.text}>
                Aktin–Miyozin çapraz köprü döngüsü
              </text>
              <text x="422" y="133" textAnchor="middle" fontSize="10.8" fill={palette.text}>
                (Kontraktilite / İnotropi · ATP)
              </text>

              {/* Lusitropy divider & down arrows */}
              <line x1="138" y1="140" x2="138" y2="160" stroke={palette.teal} strokeWidth="2.2" />
              <polygon points="133,156 143,156 138,164" fill={palette.teal} />
              <line x1="422" y1="140" x2="422" y2="160" stroke={palette.axis} strokeWidth="2.2" />
              <polygon points="417,156 427,156 422,164" fill={palette.axis} />
              <text x="280" y="156" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.teal}>
                Gevşeme (Aktif Lusitropi)
              </text>

              {/* Bottom Left: SERCA2a */}
              <rect x="20" y="166" width="248" height="56" rx="8" fill={palette.tealSoft} stroke={palette.teal} strokeWidth="1.6" />
              <text x="144" y="185" textAnchor="middle" fontSize="12" fontWeight="800" fill={palette.teal}>
                SERCA2a + Fosfolamban (ATP)
              </text>
              <text x="144" y="201" textAnchor="middle" fontSize="10.5" fill={palette.text}>
                Diyastolde SR&apos;ye aktif Ca<tspan fontSize="7.5" dy="-2.5">2+</tspan><tspan dy="2.5"> geri alımı (~%80)</tspan>
              </text>
              <text x="144" y="215" textAnchor="middle" fontSize="10.2" fontWeight="600" fill={palette.teal}>
                β<tspan fontSize="7.2" dy="2">1</tspan><tspan dy="-2"> / PKA → Fosforilasyon → Pozitif Lusitropi</tspan>
              </text>

              {/* Bottom Right: NCX & PMCA */}
              <rect x="292" y="166" width="248" height="56" rx="8" fill={palette.bg} stroke={palette.axis} strokeWidth="1.5" />
              <text x="416" y="185" textAnchor="middle" fontSize="12" fontWeight="800" fill={palette.text}>
                NCX (3 Na<tspan fontSize="7.5" dy="-2.5">+</tspan><tspan dy="2.5"> / 1 Ca</tspan><tspan fontSize="7.5" dy="-2.5">2+</tspan><tspan dy="2.5">) &amp; PMCA</tspan>
              </text>
              <text x="416" y="201" textAnchor="middle" fontSize="10.5" fill={palette.text}>
                Hücre dışına Ca<tspan fontSize="7.5" dy="-2.5">2+</tspan><tspan dy="2.5"> atımı (~%20)</tspan>
              </text>
              <text x="416" y="215" textAnchor="middle" fontSize="10.2" fill={palette.muted}>
                Na<tspan fontSize="7.2" dy="-2.5">+</tspan><tspan dy="2.5">/K</tspan><tspan fontSize="7.2" dy="-2.5">+</tspan><tspan dy="2.5">-ATPaz gradyentine bağımlı (Digoksin)</tspan>
              </text>
            </svg>
            <p className={subCaptionClass}>
              Arteriyoller SVR&apos;nin ana belirleyicisidir; venler düşük basınçta kan hacminin ~2/3&apos;ünü barındırır. β<sub className="text-[0.75em]">1</sub> uyarımı fosfolamban fosforilasyonu ile SERCA2a&apos;yı hızlandırır (pozitif lusitropi).
            </p>
          </div>
        </div>
      </figure>
    );
  }

  if (id === 'action-potentials') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-rose-400' : 'text-rose-800'}`}>
            Şekil 2 — Hızlı Yanıt (Ventrikül) ve Yavaş Yanıt (SA Nod) Aksiyon Potansiyelleri
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Klabunde B.2 · Guyton &amp; Hall
          </span>
        </div>

        <div className="space-y-4">
          {/* Panel 2A: Fast Response AP */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              A. Hızlı Yanıt Aksiyon Potansiyeli (Ventriküler Miyosit / His–Purkinje)
            </div>
            <svg
              viewBox="0 0 560 250"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Hızlı yanıt ventriküler aksiyon potansiyeli"
            >
              <rect x="64" y="14" width="474" height="190" fill={palette.bg} stroke={palette.grid} />

              {/* Y ticks: +40 to -100 */}
              {[40, 20, 0, -20, -40, -60, -80, -100].map((mv) => {
                const y = 20 + ((40 - mv) / 140) * 176;
                return (
                  <g key={mv}>
                    <line x1="64" y1={y} x2="538" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="11" fill={palette.muted}>
                      {mv}
                    </text>
                  </g>
                );
              })}

              <text
                x="18"
                y="108"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill={palette.text}
                transform="rotate(-90 18 108)"
              >
                Membran Potansiyeli (mV)
              </text>

              {/* Fast AP Curve (0 to 350 ms mapped to x=64..538 => 1.354 px/ms) */}
              {/* 0..48ms: -90mV (y=183.4), 48..54ms: +30mV (y=32.6), 54..62ms: +10mV (y=57.7), 62..200ms plateau: +8 -> -5mV (y=60..76.6), 200..280ms Phase 3 -> -90mV (y=183.4), 280..350ms Phase 4 */}
              <path
                d="M 64 183 L 128 183 L 136 33 L 147 58 C 192 60 286 64 334 78 C 366 88 386 144 416 172 C 428 182 440 183 538 183"
                fill="none"
                stroke={palette.crimson}
                strokeWidth="3.2"
                strokeLinejoin="round"
              />

              {/* Phase annotations */}
              <text x="100" y="96" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.sky}>
                Faz 0
              </text>
              <text x="100" y="111" textAnchor="middle" fontSize="10.8" fontWeight="700" fill={palette.sky}>
                (Hızlı I<tspan fontSize="7.5" dy="2">Na</tspan><tspan dy="-2"> ↑)</tspan>
              </text>

              <text x="206" y="34" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.amber}>
                Faz 1 (I<tspan fontSize="7.5" dy="2">to</tspan><tspan dy="-2"> K</tspan><tspan fontSize="7.5" dy="-3.5">+</tspan><tspan dy="3.5">)</tspan>
              </text>

              <rect x="190" y="42" width="136" height="22" rx="5" fill={palette.tealSoft} stroke={palette.teal} strokeWidth="1.2" />
              <text x="258" y="57" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.teal}>
                Faz 2: Plato (I<tspan fontSize="7.5" dy="2">Ca-L</tspan><tspan dy="-2"> ≈ I</tspan><tspan fontSize="7.5" dy="2">K</tspan><tspan dy="-2">)</tspan>
              </text>

              <text x="454" y="102" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.indigo}>
                Faz 3
              </text>
              <text x="454" y="117" textAnchor="middle" fontSize="10.8" fontWeight="700" fill={palette.indigo}>
                (I<tspan fontSize="7.5" dy="2">Kr</tspan><tspan dy="-2"> / I</tspan><tspan fontSize="7.5" dy="2">Ks</tspan><tspan dy="-2"> ↑)</tspan>
              </text>

              <text x="488" y="160" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.text}>
                Faz 4 (I<tspan fontSize="7.5" dy="2">K1</tspan><tspan dy="-2">)</tspan>
              </text>
              <text x="488" y="174" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.muted}>
                −90 mV
              </text>

              {/* ERP and RRP bars */}
              <rect x="132" y="188" width="246" height="14" rx="3" fill={palette.crimsonSoft} stroke={palette.crimson} strokeWidth="1" />
              <text x="255" y="199" textAnchor="middle" fontSize="10.2" fontWeight="800" fill={palette.crimson}>
                ERP (Mutlak Refrakter ≈ 200 ms)
              </text>

              <rect x="382" y="188" width="76" height="14" rx="3" fill={palette.amberSoft} stroke={palette.amber} strokeWidth="1" />
              <text x="420" y="199" textAnchor="middle" fontSize="10.2" fontWeight="800" fill={palette.amber}>
                RRP
              </text>

              {/* X-axis ticks */}
              {[0, 50, 100, 150, 200, 250, 300, 350].map((ms) => {
                const x = 64 + (ms / 350) * 474;
                return (
                  <text key={ms} x={x} y="220" textAnchor="middle" fontSize="11" fill={palette.muted}>
                    {ms}
                  </text>
                );
              })}
              <text x="301" y="240" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
                Süre (ms) — Toplam AP Süresi ≈ 250–300 ms (EKG QT Aralığı Korelasyonu)
              </text>
            </svg>
          </div>

          {/* Panel 2B: Slow Response Pacemaker AP */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              B. Yavaş Yanıt Pacemaker Potansiyeli (SA Nod) ve Otonomik Faz 4 Modülasyonu
            </div>
            <svg
              viewBox="0 0 560 264"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Yavaş yanıt SA nod pacemaker potansiyeli ve otonomik modülasyon"
            >
              <rect x="64" y="14" width="474" height="174" fill={palette.bg} stroke={palette.grid} />

              {/* Y ticks: +20 to -60 */}
              {[20, 0, -20, -40, -60].map((mv) => {
                const y = 26 + ((20 - mv) / 80) * 144;
                return (
                  <g key={mv}>
                    <line x1="64" y1={y} x2="538" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="11" fill={palette.muted}>
                      {mv}
                    </text>
                  </g>
                );
              })}

              <text
                x="18"
                y="100"
                textAnchor="middle"
                fontSize="11.5"
                fontWeight="700"
                fill={palette.text}
                transform="rotate(-90 18 100)"
              >
                Membran Potansiyeli (mV)
              </text>

              {/* Threshold line at -40 mV (y = 134) */}
              <line x1="64" y1="134" x2="538" y2="134" stroke={palette.amber} strokeWidth="1.6" strokeDasharray="5,4" />

              {/* Normal SA node (~75/dk, 800 ms cycle): 0..1600ms => 474px */}
              <path
                d="M 64 170 Q 134 156 202 134 Q 218 52 238 40 Q 260 56 300 170 Q 370 156 438 134 Q 454 52 474 40 Q 496 56 538 170"
                fill="none"
                stroke={palette.text}
                strokeWidth="3"
              />

              {/* Sympathetic (faster slope, ~500 ms cycle) */}
              <path
                d="M 64 170 Q 112 152 152 134 Q 166 50 180 38 Q 198 54 226 168 Q 272 152 312 134 Q 326 50 340 38 Q 358 54 388 168"
                fill="none"
                stroke={palette.crimson}
                strokeWidth="2.4"
                strokeDasharray="6,4"
              />

              {/* Vagal (hyperpolarized & slower slope, ~1200 ms cycle) */}
              <path
                d="M 64 180 Q 178 164 294 134 Q 312 52 332 42 Q 356 60 412 180"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.4"
                strokeDasharray="3,4"
              />

              {/* Labels */}
              <text x="122" y="96" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.text}>
                Faz 4 (I<tspan fontSize="7.5" dy="2">f</tspan><tspan dy="-2"> &quot;Funny&quot; Na</tspan><tspan fontSize="7.5" dy="-3.5">+</tspan><tspan dy="3.5">)</tspan>
              </text>
              <text x="122" y="111" textAnchor="middle" fontSize="10.5" fill={palette.muted}>
                Spontan Depolarizasyon
              </text>

              <text x="310" y="28" textAnchor="middle" fontSize="11.2" fontWeight="800" fill={palette.crimson}>
                Faz 0 (Yavaş I<tspan fontSize="7.5" dy="2">Ca-L</tspan><tspan dy="-2">) · Faz 3 (I</tspan><tspan fontSize="7.5" dy="2">K</tspan><tspan dy="-2">)</tspan>
              </text>

              {/* X-axis ticks */}
              {[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600].map((ms) => {
                const x = 64 + (ms / 1600) * 474;
                return (
                  <text key={ms} x={x} y="204" textAnchor="middle" fontSize="10.8" fill={palette.muted}>
                    {ms}
                  </text>
                );
              })}
              <text x="301" y="220" textAnchor="middle" fontSize="11.2" fontWeight="700" fill={palette.text}>
                Zaman (ms)
              </text>

              {/* Legend */}
              <rect x="76" y="228" width="448" height="32" rx="6" fill={palette.panel} stroke={palette.border} />
              <line x1="88" y1="240" x2="108" y2="240" stroke={palette.amber} strokeWidth="1.8" strokeDasharray="4,3" />
              <text x="113" y="244" fontSize="10" fontWeight="600" fill={palette.text}>Eşik (−40 mV)</text>

              <line x1="196" y1="240" x2="216" y2="240" stroke={palette.text} strokeWidth="2.6" />
              <text x="221" y="244" fontSize="10" fontWeight="600" fill={palette.text}>Normal SA (~75/dk)</text>

              <line x1="330" y1="240" x2="350" y2="240" stroke={palette.crimson} strokeWidth="2.2" strokeDasharray="5,3" />
              <text x="355" y="244" fontSize="10" fontWeight="600" fill={palette.crimson}>Sempatik (β₁ → HR ↑)</text>

              <line x1="196" y1="254" x2="216" y2="254" stroke={palette.sky} strokeWidth="2.2" strokeDasharray="3,3" />
              <text x="221" y="257" fontSize="10" fontWeight="600" fill={palette.sky}>Vagal (M₂ → I_K(ACh) ↑ → HR ↓)</text>
            </svg>
            <p className={subCaptionClass}>
              Uzun Faz 2 platosu mutlak refrakter periyodu (ERP) uzatarak kalbin tetanik kasılmasını önler. SA nodda Faz 4 eğimi (I<sub className="text-[0.75em]">f</sub>) kalp hızını belirler.
            </p>
          </div>
        </div>
      </figure>
    );
  }

  if (id === 'wiggers-pv') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-rose-400' : 'text-rose-800'}`}>
            Şekil 3 — Wiggers Diyagramı ve Sol Ventrikül Basınç–Hacim (P–V) Döngüsü
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Klabunde B.3–4 · Suga &amp; Sagawa · Kaplan&apos;s
          </span>
        </div>

        <div className="space-y-4">
          {/* Panel 3A: Wiggers Diagram */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              A. Wiggers Diyagramı: Aort, LV, LA Basınçları ve Ventrikül Hacmi
            </div>
            <svg
              viewBox="0 0 560 272"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Wiggers diyagramı aort, sol ventrikül, sol atriyum basınçları ve LV hacmi"
            >
              {/* Plot area: x=58..500 (width 442 for 0.0..0.8 sn), y=18..208 (height 190 for 0..140 mmHg) */}
              <rect x="58" y="18" width="442" height="190" fill={palette.bg} stroke={palette.grid} />

              {/* Shaded cardiac phases */}
              {/* IVK: 0.10..0.15 sn => x=113..141 */}
              <rect x="113" y="18" width="28" height="190" fill={palette.amberSoft} fillOpacity="0.45" />
              {/* Ejection: 0.15..0.35 sn => x=141..251 */}
              <rect x="141" y="18" width="110" height="190" fill={palette.crimsonSoft} fillOpacity="0.45" />
              {/* IVR: 0.35..0.41 sn => x=251..285 */}
              <rect x="251" y="18" width="34" height="190" fill={palette.amberSoft} fillOpacity="0.45" />
              {/* Diastolic filling: 0.41..0.80 sn => x=285..500 */}
              <rect x="285" y="18" width="215" height="190" fill={palette.tealSoft} fillOpacity="0.35" />

              {/* Horizontal grid lines */}
              {[0, 20, 40, 60, 80, 100, 120, 140].map((p) => {
                const y = 208 - (p / 140) * 184;
                return (
                  <g key={p}>
                    <line x1="58" y1={y} x2="500" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="51" y={y + 4} textAnchor="end" fontSize="10.8" fill={palette.muted}>
                      {p}
                    </text>
                  </g>
                );
              })}

              {/* Phase headings */}
              <text x="127" y="32" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={palette.amber}>IVK</text>
              <text x="196" y="32" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.crimson}>Ejeksiyon (Sistol)</text>
              <text x="268" y="32" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={palette.amber}>IVR</text>
              <text x="392" y="32" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.teal}>Diyastolik Doluş (~%65)</text>

              {/* Aortic pressure curve (amber) */}
              <path
                d="M 58 92 L 141 102 C 166 56 196 42 222 52 C 238 60 248 80 256 84 L 266 74 C 316 78 416 86 500 92"
                fill="none"
                stroke={palette.amber}
                strokeWidth="2.8"
              />
              <text x="328" y="64" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={palette.amber}>
                S<tspan fontSize="7.5" dy="2">2</tspan><tspan dy="-2"> · Dikrotik Çentik</tspan>
              </text>

              {/* LV pressure curve (crimson) */}
              <path
                d="M 58 196 Q 94 195 113 190 L 141 102 C 166 50 196 40 222 50 C 238 60 250 86 266 130 L 285 198 Q 360 198 500 195"
                fill="none"
                stroke={palette.crimson}
                strokeWidth="3.2"
              />

              {/* LA pressure curve (dashed blue) */}
              <path
                d="M 58 195 Q 84 186 100 194 Q 124 186 138 196 Q 196 199 266 184 Q 290 198 340 198 L 500 196"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2"
                strokeDasharray="5,3"
              />

              {/* LV Volume curve (teal, right axis 50..120 mL mapped to y=184..128) */}
              <path
                d="M 58 134 Q 90 128 113 124 L 141 124 Q 186 138 228 176 L 251 186 L 285 186 Q 326 154 396 142 L 500 134"
                fill="none"
                stroke={palette.teal}
                strokeWidth="2.6"
              />

              {/* S1 annotation */}
              <text x="86" y="154" textAnchor="middle" fontSize="11" fontWeight="800" fill={palette.crimson}>
                S<tspan fontSize="7.5" dy="2">1</tspan><tspan dy="-2"> (MV ↓)</tspan>
              </text>
              <line x1="94" y1="160" x2="111" y2="186" stroke={palette.crimson} strokeWidth="1.5" />

              {/* Left & Right Y-axis labels */}
              <text x="16" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text} transform="rotate(-90 16 114)">
                Basınç (mmHg)
              </text>
              <text x="506" y="128" fontSize="10.5" fontWeight="700" fill={palette.teal}>120</text>
              <text x="506" y="190" fontSize="10.5" fontWeight="700" fill={palette.teal}>50</text>
              <text x="546" y="114" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.teal} transform="rotate(90 546 114)">
                LV Hacmi (mL)
              </text>

              {/* X-axis ticks */}
              {[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((t) => {
                const x = 58 + (t / 0.8) * 442;
                return (
                  <text key={t} x={x} y="224" textAnchor="middle" fontSize="10.8" fill={palette.muted}>
                    {t.toFixed(1)}
                  </text>
                );
              })}
              <text x="279" y="240" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text}>
                Zaman (sn · 75 atım/dk → 1 Siklus = 0,80 sn)
              </text>

              {/* Legend */}
              <rect x="64" y="248" width="430" height="22" rx="5" fill={palette.panel} stroke={palette.border} />
              <line x1="74" y1="259" x2="90" y2="259" stroke={palette.amber} strokeWidth="2.6" />
              <text x="94" y="263" fontSize="9.8" fontWeight="600" fill={palette.text}>Aort</text>
              <line x1="138" y1="259" x2="154" y2="259" stroke={palette.crimson} strokeWidth="2.8" />
              <text x="158" y="263" fontSize="9.8" fontWeight="600" fill={palette.text}>Sol Ventrikül</text>
              <line x1="242" y1="259" x2="258" y2="259" stroke={palette.sky} strokeWidth="2" strokeDasharray="4,2" />
              <text x="262" y="263" fontSize="9.8" fontWeight="600" fill={palette.text}>Sol Atriyum (a, c, v)</text>
              <line x1="382" y1="259" x2="398" y2="259" stroke={palette.teal} strokeWidth="2.6" />
              <text x="402" y="263" fontSize="9.8" fontWeight="600" fill={palette.text}>LV Hacmi (mL)</text>
            </svg>
          </div>

          {/* Panel 3B: LV P-V Loop */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              B. Sol Ventrikül Basınç–Hacim (P–V) Döngüsü (Saat Yönünün Tersi)
            </div>
            <svg
              viewBox="0 0 560 256"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Sol ventrikül basınç-hacim döngüsü, ESPVR ve EDPVR"
            >
              {/* Plot area: x=64..530 (0..170 mL), y=16..208 (0..150 mmHg) */}
              <rect x="64" y="16" width="466" height="192" fill={palette.bg} stroke={palette.grid} />

              {/* Y ticks 0..140 */}
              {[0, 20, 40, 60, 80, 100, 120, 140].map((p) => {
                const y = 208 - (p / 150) * 188;
                return (
                  <g key={p}>
                    <line x1="64" y1={y} x2="530" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="11" fill={palette.muted}>
                      {p}
                    </text>
                  </g>
                );
              })}

              {/* X ticks 0..160 */}
              {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((v) => {
                const x = 64 + (v / 170) * 466;
                return (
                  <g key={v}>
                    <line x1={x} y1="16" x2={x} y2="208" stroke={palette.grid} strokeWidth="1" />
                    <text x={x} y="224" textAnchor="middle" fontSize="11" fill={palette.muted}>
                      {v}
                    </text>
                  </g>
                );
              })}

              <text x="18" y="112" textAnchor="middle" fontSize="11.2" fontWeight="700" fill={palette.text} transform="rotate(-90 18 112)">
                Sol Ventrikül Basıncı (mmHg)
              </text>
              <text x="297" y="244" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
                Sol Ventrikül Hacmi (mL)
              </text>

              {/* ESPVR line (teal dashed): V0 ~ 15 mL (x=105, y=208) -> (50 mL, 100 mmHg => x=201, y=83) -> (70 mL, 150 mmHg => x=256, y=20) */}
              <line x1="105" y1="208" x2="256" y2="20" stroke={palette.teal} strokeWidth="2.4" strokeDasharray="6,4" />

              {/* EDPVR curve (blue dashed) */}
              <path
                d="M 118 205 Q 240 203 393 196 Q 456 190 508 176"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.4"
                strokeDasharray="6,4"
              />

              {/* P-V Loop filled & stroked:
                  A (EDV=120, P=10): x=393, y=195
                  B (EDV=120, P=80): x=393, y=108
                  Peak (V=85, P=128): x=297, y=47
                  C (ESV=50, P=100): x=201, y=83
                  D (ESV=50, P=4): x=201, y=203
              */}
              <path
                d="M 393 195 L 393 108 C 362 72 324 44 282 48 C 246 52 218 68 201 83 L 201 203 Q 296 200 393 195 Z"
                fill={palette.crimsonSoft}
                stroke={palette.crimson}
                strokeWidth="3.2"
              />

              {/* Corner dots */}
              <circle cx="393" cy="195" r="4.8" fill={palette.amber} stroke={palette.panel} strokeWidth="1.5" />
              <circle cx="393" cy="108" r="4.8" fill={palette.crimson} stroke={palette.panel} strokeWidth="1.5" />
              <circle cx="201" cy="83" r="4.8" fill={palette.teal} stroke={palette.panel} strokeWidth="1.5" />
              <circle cx="201" cy="203" r="4.8" fill={palette.sky} stroke={palette.panel} strokeWidth="1.5" />

              {/* Stroke work & SV arrow */}
              <text x="297" y="128" textAnchor="middle" fontSize="12" fontWeight="800" fill={palette.crimson}>
                Atım İşi (SW)
              </text>
              <line x1="210" y1="156" x2="384" y2="156" stroke={palette.text} strokeWidth="1.8" />
              <polygon points="212,152 212,160 204,156" fill={palette.text} />
              <polygon points="382,152 382,160 390,156" fill={palette.text} />
              <text x="297" y="149" textAnchor="middle" fontSize="11.5" fontWeight="800" fill={palette.text}>
                SV ≈ 70 mL
              </text>

              {/* Corner Labels */}
              <text x="404" y="182" fontSize="10.8" fontWeight="800" fill={palette.text}>A: MV Kapanır</text>
              <text x="404" y="196" fontSize="10.2" fill={palette.muted}>(EDV ≈ 120 mL)</text>

              <text x="404" y="102" fontSize="10.8" fontWeight="800" fill={palette.text}>B: AV Açılır</text>
              <text x="404" y="116" fontSize="10.2" fill={palette.muted}>(DBP ≈ 80)</text>

              <text x="86" y="64" fontSize="10.8" fontWeight="800" fill={palette.text}>C: AV Kapanır</text>
              <text x="86" y="78" fontSize="10.2" fill={palette.muted}>(ESV ≈ 50 mL)</text>

              <text x="86" y="184" fontSize="10.8" fontWeight="800" fill={palette.text}>D: MV Açılır</text>

              {/* Legend */}
              <rect x="368" y="22" width="154" height="50" rx="6" fill={palette.panel} stroke={palette.border} />
              <line x1="376" y1="35" x2="394" y2="35" stroke={palette.teal} strokeWidth="2.2" strokeDasharray="5,3" />
              <text x="399" y="39" fontSize="9.8" fontWeight="600" fill={palette.text}>ESPVR (Kontraktilite · E<tspan fontSize="7" dy="2">es</tspan><tspan dy="-2">)</tspan></text>
              <line x1="376" y1="50" x2="394" y2="50" stroke={palette.sky} strokeWidth="2.2" strokeDasharray="5,3" />
              <text x="399" y="54" fontSize="9.8" fontWeight="600" fill={palette.text}>EDPVR (Diyastolik Sertlik)</text>
              <line x1="376" y1="64" x2="394" y2="64" stroke={palette.crimson} strokeWidth="2.8" />
              <text x="399" y="68" fontSize="9.8" fontWeight="600" fill={palette.text}>Normal LV P–V Döngüsü</text>
            </svg>
            <p className={subCaptionClass}>
              P–V döngüsü saat yönünün tersine döner. Alanı Atım İşini (SW), yatay genişliği Atım Hacmini (SV = EDV − ESV ≈ 70 mL) verir.
            </p>
          </div>
        </div>
      </figure>
    );
  }

  if (id === 'frank-starling-guyton') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-rose-400' : 'text-rose-800'}`}>
            Şekil 4 — Frank–Starling Eğrisi ve Guyton Venöz Dönüş – Kardiyak Debi Dengesi
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Guyton 1955 · Klabunde B.8 · Marino&apos;s
          </span>
        </div>

        <div className="space-y-4">
          {/* Panel 4A: Frank-Starling Curve */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              A. Frank–Starling Eğrisi: Sıvı Yanıtlılığı ve İnotropik Kaymalar
            </div>
            <svg
              viewBox="0 0 560 250"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Frank-Starling eğrisi sıvı yanıtlılığı ve inotropik kaymalar"
            >
              {/* Plot area: x=64..534 (Preload 0..24), y=16..204 (SV 0..140) */}
              <rect x="64" y="16" width="470" height="188" fill={palette.bg} stroke={palette.grid} />

              {/* Left fluid-responsive zone (0..10) & right plateau (10..24) */}
              <rect x="64" y="16" width="196" height="188" fill={palette.tealSoft} fillOpacity="0.45" />
              <rect x="260" y="16" width="274" height="188" fill={palette.crimsonSoft} fillOpacity="0.32" />

              {/* Grid lines */}
              {[0, 20, 40, 60, 80, 100, 120, 140].map((sv) => {
                const y = 204 - (sv / 140) * 184;
                return (
                  <g key={sv}>
                    <line x1="64" y1={y} x2="534" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="10.8" fill={palette.muted}>
                      {sv}
                    </text>
                  </g>
                );
              })}

              {/* Zone titles */}
              <text x="162" y="34" textAnchor="middle" fontSize="11.2" fontWeight="800" fill={palette.teal}>
                Preload-Bağımlı Zon
              </text>
              <text x="162" y="49" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={palette.teal}>
                (PPV / SVV &gt; %12)
              </text>

              <text x="396" y="34" textAnchor="middle" fontSize="11.2" fontWeight="800" fill={palette.crimson}>
                Preload-Bağımsız Plato
              </text>
              <text x="396" y="49" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={palette.crimson}>
                (Sıvı → Pulmoner Ödem Riski)
              </text>

              {/* High Inotropy (teal dashed) */}
              <path
                d="M 64 204 Q 124 88 216 56 Q 340 34 528 32"
                fill="none"
                stroke={palette.teal}
                strokeWidth="2.6"
                strokeDasharray="6,4"
              />

              {/* Normal Ventricle (dark solid) */}
              <path
                d="M 64 204 Q 146 114 252 88 Q 372 74 528 74"
                fill="none"
                stroke={palette.text}
                strokeWidth="3.2"
              />

              {/* Low Inotropy / Heart Failure (crimson solid) */}
              <path
                d="M 64 204 Q 160 154 276 140 Q 400 136 528 136"
                fill="none"
                stroke={palette.crimson}
                strokeWidth="2.6"
              />

              {/* Fluid responsive step arrow */}
              <line x1="150" y1="138" x2="220" y2="138" stroke={palette.amber} strokeWidth="2.2" />
              <line x1="220" y1="138" x2="220" y2="100" stroke={palette.amber} strokeWidth="2.2" />
              <polygon points="215,104 225,104 220,94" fill={palette.amber} />
              <text x="228" y="122" fontSize="11" fontWeight="800" fill={palette.amber}>↑↑ SV</text>
              <text x="228" y="136" fontSize="10" fontWeight="700" fill={palette.amber}>(Sıvı Yanıtlı)</text>

              {/* Legend */}
              <rect x="352" y="148" width="176" height="50" rx="6" fill={palette.panel} stroke={palette.border} />
              <line x1="360" y1="161" x2="378" y2="161" stroke={palette.teal} strokeWidth="2.4" strokeDasharray="5,3" />
              <text x="383" y="165" fontSize="9.8" fontWeight="600" fill={palette.text}>↑ İnotropi (Katekolamin)</text>
              <line x1="360" y1="175" x2="378" y2="175" stroke={palette.text} strokeWidth="2.8" />
              <text x="383" y="179" fontSize="9.8" fontWeight="600" fill={palette.text}>Normal Ventrikül</text>
              <line x1="360" y1="189" x2="378" y2="189" stroke={palette.crimson} strokeWidth="2.4" />
              <text x="383" y="193" fontSize="9.8" fontWeight="600" fill={palette.text}>↓ İnotropi (KY / İskemi)</text>

              {/* Axes labels */}
              <text x="18" y="110" textAnchor="middle" fontSize="11.2" fontWeight="700" fill={palette.text} transform="rotate(-90 18 110)">
                Atım Hacmi — SV (mL)
              </text>
              {[0, 5, 10, 15, 20].map((v) => {
                const x = 64 + (v / 24) * 470;
                return (
                  <text key={v} x={x} y="220" textAnchor="middle" fontSize="11" fill={palette.muted}>
                    {v}
                  </text>
                );
              })}
              <text x="299" y="240" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
                Preload (LVEDP · mmHg / EDV)
              </text>
            </svg>
          </div>

          {/* Panel 4B: Guyton Venous Return + CO Curve */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              B. Guyton Birleşik Venöz Dönüş (VR) ve Kardiyak Debi (CO) Denge Eğrisi
            </div>
            <svg
              viewBox="0 0 560 256"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Guyton venöz dönüş ve kardiyak debi denge eğrisi"
            >
              {/* Plot area: x=64..534 (RAP -4..14 => 18 units), y=16..206 (CO/VR 0..13 L/dk) */}
              <rect x="64" y="16" width="470" height="190" fill={palette.bg} stroke={palette.grid} />

              {/* Y ticks 0..12 */}
              {[0, 2, 4, 6, 8, 10, 12].map((l) => {
                const y = 206 - (l / 13) * 186;
                return (
                  <g key={l}>
                    <line x1="64" y1={y} x2="534" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="10.8" fill={palette.muted}>
                      {l}
                    </text>
                  </g>
                );
              })}

              {/* X ticks -4..14 */}
              {[-4, -2, 0, 2, 4, 6, 8, 10, 12, 14].map((r) => {
                const x = 64 + ((r + 4) / 18) * 470;
                return (
                  <g key={r}>
                    <line x1={x} y1="16" x2={x} y2="206" stroke={r === 0 ? palette.axis : palette.grid} strokeWidth={r === 0 ? '1.6' : '1'} />
                    <text x={x} y="222" textAnchor="middle" fontSize="10.8" fontWeight={r === 0 ? '700' : '400'} fill={palette.muted}>
                      {r}
                    </text>
                  </g>
                );
              })}

              {/* Venous Collapse shaded zone RAP < 0 (x=64..168) */}
              <rect x="64" y="16" width="104" height="190" fill={palette.skySoft} fillOpacity="0.35" />
              <text x="116" y="88" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={palette.sky}>
                Venöz Kollaps
              </text>
              <text x="116" y="102" textAnchor="middle" fontSize="10.2" fontWeight="700" fill={palette.sky}>
                (Şelale Platosu)
              </text>

              {/* High P_msf (11.5 mmHg => x=469) dashed teal */}
              <path d="M 64 68 L 168 68 L 469 206" fill="none" stroke={palette.teal} strokeWidth="2.2" strokeDasharray="6,4" />

              {/* Low P_msf (5 mmHg => x=299) dotted amber */}
              <path d="M 64 140 L 168 140 L 299 206" fill="none" stroke={palette.amber} strokeWidth="2.2" strokeDasharray="3,4" />

              {/* Normal Venous Return (P_msf = 8 mmHg => x=377, plateau at 6.8 L/dk => y=109) */}
              <path d="M 64 109 L 168 109 L 377 206" fill="none" stroke={palette.sky} strokeWidth="3" />

              {/* Cardiac Output Curve (crimson): starts RAP=-1 (x=142, y=206) -> (2, 5.2 => x=221, y=132) -> plateau 10.6 (y=54) */}
              <path
                d="M 142 206 Q 192 146 254 102 Q 332 62 436 52 L 528 50"
                fill="none"
                stroke={palette.crimson}
                strokeWidth="3.2"
              />

              {/* Operating equilibrium dot: RAP ~ 1.8, CO ~ 5.2 => x=216, y=132 */}
              <circle cx="216" cy="132" r="5.5" fill={palette.text} stroke={palette.panel} strokeWidth="2" />

              {/* Operating point callout */}
              <rect x="200" y="24" width="164" height="34" rx="6" fill={palette.amberSoft} stroke={palette.amber} strokeWidth="1.2" />
              <text x="282" y="38" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={palette.amber}>
                Normal Denge
              </text>
              <text x="282" y="52" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={palette.text}>
                (CO ≈ 5 L/dk, RAP ≈ 2)
              </text>
              <line x1="252" y1="58" x2="219" y2="125" stroke={palette.amber} strokeWidth="1.5" />

              {/* P_msf callout */}
              <rect x="330" y="160" width="84" height="22" rx="5" fill={palette.skySoft} stroke={palette.sky} strokeWidth="1.2" />
              <text x="372" y="175" textAnchor="middle" fontSize="10.8" fontWeight="800" fill={palette.sky}>
                P<tspan fontSize="7.5" dy="2">msf</tspan><tspan dy="-2"> ≈ 8 mmHg</tspan>
              </text>
              <line x1="372" y1="182" x2="376" y2="202" stroke={palette.sky} strokeWidth="1.5" />

              {/* Legend */}
              <rect x="378" y="22" width="150" height="62" rx="6" fill={palette.panel} stroke={palette.border} />
              <line x1="386" y1="34" x2="404" y2="34" stroke={palette.crimson} strokeWidth="2.8" />
              <text x="409" y="38" fontSize="9.5" fontWeight="600" fill={palette.text}>Kardiyak Debi (CO)</text>
              <line x1="386" y1="48" x2="404" y2="48" stroke={palette.sky} strokeWidth="2.6" />
              <text x="409" y="52" fontSize="9.5" fontWeight="600" fill={palette.text}>Normal VR (P<tspan fontSize="7" dy="2">msf</tspan><tspan dy="-2"> ≈ 8)</tspan></text>
              <line x1="386" y1="62" x2="404" y2="62" stroke={palette.teal} strokeWidth="2" strokeDasharray="5,3" />
              <text x="409" y="66" fontSize="9.5" fontWeight="600" fill={palette.teal}>↑ P<tspan fontSize="7" dy="2">msf</tspan><tspan dy="-2"> (Sıvı / NE α</tspan><tspan fontSize="7" dy="2">1</tspan><tspan dy="-2">)</tspan></text>
              <line x1="386" y1="76" x2="404" y2="76" stroke={palette.amber} strokeWidth="2" strokeDasharray="3,3" />
              <text x="409" y="80" fontSize="9.5" fontWeight="600" fill={palette.amber}>↓ P<tspan fontSize="7" dy="2">msf</tspan><tspan dy="-2"> (Propofol / Spinal)</tspan></text>

              <text x="18" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text} transform="rotate(-90 18 112)">
                Kardiyak Debi / Venöz Dönüş (L/dk)
              </text>
              <text x="299" y="244" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
                Sağ Atriyum Basıncı — RAP / CVP (mmHg)
              </text>
            </svg>
            <p className={subCaptionClass}>
              RAP &lt; 0 mmHg olduğunda büyük torasik venler çöker (şelale/Starling etkisi) ve venöz dönüş daha fazla artmaz.
            </p>
          </div>
        </div>
      </figure>
    );
  }

  if (id === 'coronary-autoregulation') {
    return (
      <figure className={figureWrap}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-rose-400' : 'text-rose-800'}`}>
            Şekil 5 — Sol vs. Sağ Koroner Arter Fazik Akımı ve Organ Otoregülasyon Eğrisi
          </figcaption>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Kaplan&apos;s · Klabunde B.7 · Miller&apos;s
          </span>
        </div>

        <div className="space-y-4">
          {/* Panel 5A: LCA vs RCA Phasic Flow */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              A. Sol (LCA) vs. Sağ (RCA) Koroner Arterde Fazik Kan Akımı
            </div>
            <svg
              viewBox="0 0 560 250"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Sol ve sağ koroner arter fazik kan akımı"
            >
              {/* Plot area: x=64..534 (0.0..0.8 sn), y=16..204 (0..140) */}
              <rect x="64" y="16" width="470" height="188" fill={palette.bg} stroke={palette.grid} />

              {/* Systole (0.10..0.35 sn => x=123..270) & Diastole (0.35..0.80 => x=270..534) */}
              <rect x="123" y="16" width="147" height="188" fill={palette.crimsonSoft} fillOpacity="0.4" />
              <rect x="270" y="16" width="264" height="188" fill={palette.tealSoft} fillOpacity="0.35" />

              {[0, 20, 40, 60, 80, 100, 120, 140].map((v) => {
                const y = 204 - (v / 140) * 184;
                return (
                  <g key={v}>
                    <line x1="64" y1={y} x2="534" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="10.8" fill={palette.muted}>
                      {v}
                    </text>
                  </g>
                );
              })}

              <text x="196" y="34" textAnchor="middle" fontSize="11.2" fontWeight="800" fill={palette.crimson}>
                SİSTOL
              </text>
              <text x="196" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.crimson}>
                (LV Sıkışması → LCA Akımı ↓)
              </text>

              <text x="402" y="34" textAnchor="middle" fontSize="11.2" fontWeight="800" fill={palette.teal}>
                DİYASTOL
              </text>
              <text x="402" y="48" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.teal}>
                (Sol Ventrikül Perfüzyon Penceresi)
              </text>

              {/* Aortic Pressure Reference (amber dashed) */}
              <path
                d="M 64 102 L 148 106 Q 186 58 214 56 Q 246 66 270 96 L 284 82 Q 394 88 534 102"
                fill="none"
                stroke={palette.amber}
                strokeWidth="2"
                strokeDasharray="6,4"
              />

              {/* LCA Flow (teal solid — ~80% diastolic) */}
              <path
                d="M 64 134 L 123 138 L 154 196 Q 194 162 224 164 L 266 192 Q 294 128 318 74 Q 402 88 534 134"
                fill="none"
                stroke={palette.teal}
                strokeWidth="3.2"
              />

              {/* RCA Flow (blue solid — systolic + diastolic) */}
              <path
                d="M 64 174 L 123 176 Q 186 138 228 144 Q 254 156 272 170 L 292 162 Q 394 166 534 174"
                fill="none"
                stroke={palette.sky}
                strokeWidth="2.8"
              />

              {/* Legend */}
              <rect x="336" y="148" width="192" height="50" rx="6" fill={palette.panel} stroke={palette.border} />
              <line x1="344" y1="161" x2="362" y2="161" stroke={palette.teal} strokeWidth="3" />
              <text x="367" y="165" fontSize="9.5" fontWeight="700" fill={palette.text}>Sol Koroner (LCA · ~%80 Diyastolik)</text>
              <line x1="344" y1="175" x2="362" y2="175" stroke={palette.sky} strokeWidth="2.6" />
              <text x="367" y="179" fontSize="9.5" fontWeight="700" fill={palette.text}>Sağ Koroner (RCA · Sist + Diyast)</text>
              <line x1="344" y1="189" x2="362" y2="189" stroke={palette.amber} strokeWidth="2" strokeDasharray="5,3" />
              <text x="367" y="193" fontSize="9.5" fontWeight="600" fill={palette.muted}>Aort Basıncı Referansı</text>

              <text x="18" y="110" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text} transform="rotate(-90 18 110)">
                Koroner Kan Akımı (Göreceli)
              </text>
              {[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8].map((t) => {
                const x = 64 + (t / 0.8) * 470;
                return (
                  <text key={t} x={x} y="220" textAnchor="middle" fontSize="10.8" fill={palette.muted}>
                    {t.toFixed(1)}
                  </text>
                );
              })}
              <text x="299" y="240" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
                Kardiyak Siklus Zamanı (sn)
              </text>
            </svg>
          </div>

          {/* Panel 5B: Organ Autoregulation Curve */}
          <div className={subCardWrap}>
            <div className={subTitleClass}>
              B. Koroner ve Serebral Otoregülasyon Eğrisi (Normal vs. Kronik Hipertansiyon)
            </div>
            <svg
              viewBox="0 0 560 256"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label="Koroner ve serebral otoregülasyon eğrisi"
            >
              {/* Plot area: x=64..534 (MAP 15..200 => 185 units), y=16..206 (Flow 0..175%) */}
              <rect x="64" y="16" width="470" height="190" fill={palette.bg} stroke={palette.grid} />

              {/* Normal autoregulation band (MAP 55..150 => x=166..407) */}
              <rect x="166" y="16" width="241" height="190" fill={palette.tealSoft} fillOpacity="0.35" />

              {[20, 40, 60, 80, 100, 120, 140, 160].map((v) => {
                const y = 206 - (v / 175) * 184;
                return (
                  <g key={v}>
                    <line x1="64" y1={y} x2="534" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="10.8" fill={palette.muted}>
                      {v}
                    </text>
                  </g>
                );
              })}

              {[25, 50, 75, 100, 125, 150, 175, 200].map((p) => {
                const x = 64 + ((p - 15) / 185) * 470;
                return (
                  <g key={p}>
                    <line x1={x} y1="16" x2={x} y2="206" stroke={palette.grid} strokeWidth="1" />
                    <text x={x} y="222" textAnchor="middle" fontSize="10.8" fill={palette.muted}>
                      {p}
                    </text>
                  </g>
                );
              })}

              {/* Maximal vasodilation / critical stenosis distal (straight blue dotted) */}
              <line x1="64" y1="186" x2="292" y2="24" stroke={palette.sky} strokeWidth="2.4" strokeDasharray="3,4" />

              {/* Normal autoregulation curve (dark solid): rises to 100% (y=101) at MAP 55 (x=166), plateau to 150 (x=407), rises steeply */}
              <path
                d="M 64 182 Q 116 144 166 101 L 407 101 Q 470 76 534 34"
                fill="none"
                stroke={palette.text}
                strokeWidth="3.2"
              />

              {/* Chronic Hypertension right-shifted curve (crimson dashed): rises to 100% at MAP 85 (x=242), plateau to 175 (x=470) */}
              <path
                d="M 64 190 Q 156 156 242 101 L 470 101 Q 502 88 534 68"
                fill="none"
                stroke={palette.crimson}
                strokeWidth="2.6"
                strokeDasharray="6,4"
              />

              {/* Plateau callout */}
              <rect x="284" y="60" width="132" height="32" rx="6" fill={palette.tealSoft} stroke={palette.teal} strokeWidth="1.2" />
              <text x="350" y="74" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={palette.teal}>
                Otoregülasyon Platosu
              </text>
              <text x="350" y="87" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.teal}>
                (Akım Sabit)
              </text>

              {/* Right shift ischemia callout */}
              <rect x="296" y="138" width="146" height="34" rx="6" fill={palette.crimsonSoft} stroke={palette.crimson} strokeWidth="1.2" />
              <text x="369" y="152" textAnchor="middle" fontSize="10.5" fontWeight="800" fill={palette.crimson}>
                Alt eşik yükselir!
              </text>
              <text x="369" y="166" textAnchor="middle" fontSize="10" fontWeight="700" fill={palette.crimson}>
                (MAP &lt; 75–80&apos;de iskemi)
              </text>
              <line x1="296" y1="146" x2="220" y2="115" stroke={palette.crimson} strokeWidth="1.6" />

              {/* Legend */}
              <rect x="72" y="22" width="212" height="50" rx="6" fill={palette.panel} stroke={palette.border} />
              <line x1="80" y1="34" x2="98" y2="34" stroke={palette.text} strokeWidth="2.8" />
              <text x="103" y="38" fontSize="9.5" fontWeight="600" fill={palette.text}>Normal Otoregülasyon (55–150 mmHg)</text>
              <line x1="80" y1="48" x2="98" y2="48" stroke={palette.crimson} strokeWidth="2.2" strokeDasharray="5,3" />
              <text x="103" y="52" fontSize="9.5" fontWeight="600" fill={palette.crimson}>Kronik Hipertansiyon (Sağa Kayma!)</text>
              <line x1="80" y1="62" x2="98" y2="62" stroke={palette.sky} strokeWidth="2.2" strokeDasharray="3,3" />
              <text x="103" y="66" fontSize="9.5" fontWeight="600" fill={palette.sky}>Maks. Vazodilatasyon / Stenoz Distali</text>

              <text x="18" y="112" textAnchor="middle" fontSize="11" fontWeight="700" fill={palette.text} transform="rotate(-90 18 112)">
                Organ Kan Akımı (% Bazal)
              </text>
              <text x="299" y="244" textAnchor="middle" fontSize="11.5" fontWeight="700" fill={palette.text}>
                Ortalama Arteriyel Basınç / Perfüzyon Basıncı (mmHg)
              </text>
            </svg>
            <p className={subCaptionClass}>
              Kritik koroner darlığın distalinde damar zaten maksimal dilate olduğundan akım doğrudan diyastolik basınca bağımlıdır.
            </p>
          </div>
        </div>
      </figure>
    );
  }

  // id === 'valvular-pv-loops' (Şekil 6)
  const normalRefLoopPath =
    'M 346 197 L 346 138 C 322 110 294 97 264 99 C 228 101 200 112 182 121 L 182 203 Q 264 201 346 197 Z';

  const valvularPanels: {
    key: string;
    title: string;
    goalBanner: string;
    ariaLabel: string;
    loopPath: string;
    stroke: string;
    fill: string;
    badgeBg: string;
    badgeBorder: string;
    annotations: { x: number; y: number; text: string; sub?: string; align?: 'start' | 'middle' | 'end' }[];
    caption: string;
  }[] = [
    {
      key: 'as',
      title: 'A. Aort Darlığı (AS) — Kronik Basınç Yükü ve Konsantrik Hipertrofi',
      goalBanner: '↑↑ LV Sistolik Basınç · ↑ LVEDP · ↓ SV   |   Hedef: Yavaş-Normal Sinüs · ↑ SVR · Normal–↑ Preload',
      ariaLabel: 'Aort darlığı basınç-hacim döngüsü',
      loopPath:
        'M 358 187 L 358 136 C 344 76 318 36 285 37 C 254 38 232 56 217 78 L 217 197 Q 288 194 358 187 Z',
      stroke: palette.crimson,
      fill: palette.crimsonSoft,
      badgeBg: isDark ? 'bg-rose-950/50 text-rose-200 border-rose-800/70' : 'bg-rose-50 text-rose-900 border-rose-200',
      badgeBorder: palette.crimson,
      annotations: [
        { x: 372, y: 48, text: '↑↑ Pik LV Basıncı (~195 mmHg)', sub: 'Aort kapağı boyunca yüksek gradiyent', align: 'start' },
        { x: 372, y: 178, text: '↑ LVEDP (Sert LV)', sub: 'Atriyal kick (%30–40) kritik', align: 'start' },
        { x: 286, y: 152, text: 'Dar & Uzun', sub: '↓ SV', align: 'middle' },
      ],
      caption:
        'Ağır AS’de yüksek ejeksiyon direnci pik LV basıncını ~190–200 mmHg’ye çıkarır; konsantrik hipertrofi LVEDP’yi yükselterek subendokardiyal perfüzyon payını daraltır.',
    },
    {
      key: 'ar',
      title: 'B. Aort Yetmezliği (AR) — Hacim Yükü ve Diyastolik Regürjitasyon',
      goalBanner: '↑↑ EDV · IVR Kaybı · ↓ DBP · Geniş Nabız Basıncı   |   Hedef: Hızlı-Normal HR (80–90) · ↓ SVR · Normal Preload',
      ariaLabel: 'Aort yetmezliği basınç-hacim döngüsü',
      loopPath:
        'M 487 191 L 487 162 C 440 104 374 72 316 73 C 266 74 228 96 205 118 Q 220 164 257 199 Q 372 197 487 191 Z',
      stroke: palette.sky,
      fill: palette.skySoft,
      badgeBg: isDark ? 'bg-sky-950/50 text-sky-200 border-sky-800/70' : 'bg-sky-50 text-sky-900 border-sky-200',
      badgeBorder: palette.sky,
      annotations: [
        { x: 334, y: 54, text: 'Geniş Sağ Kaymış Döngü (EDV ≈ 180 mL)', sub: 'Toplam SV yüksek, ileri SV düşük', align: 'middle' },
        { x: 196, y: 156, text: 'IVR Kaybı!', sub: 'Diyastolde aorttan LV’ye kaçış', align: 'end' },
        { x: 478, y: 146, text: '↓ DBP', sub: 'Geniş nabız basıncı', align: 'end' },
      ],
      caption:
        'Aort kapağı tam kapanmadığı için gerçek izovolümik gevşeme (IVR) kaybolur; bradikardi diyastol süresini ve regürjitan hacmi artırarak LV dilatasyonunu ağırlaştırır.',
    },
    {
      key: 'ms',
      title: 'C. Mitral Darlık (MS) — Kısıtlı Diyastolik Doluş ve Sabit Debi',
      goalBanner: '↓↓ EDV (Doluş Kısıtlı) · ↓ SV · Sabit Debi   |   Hedef: Yavaş Sinüs (60–70) · ↑ SVR · PVR Artışından Kaçın',
      ariaLabel: 'Mitral darlık basınç-hacim döngüsü',
      loopPath:
        'M 266 201 L 266 144 C 248 122 230 114 212 115 C 192 116 176 122 163 128 L 163 203 Q 214 202 266 201 Z',
      stroke: palette.amber,
      fill: palette.amberSoft,
      badgeBg: isDark ? 'bg-amber-950/50 text-amber-200 border-amber-800/70' : 'bg-amber-50 text-amber-900 border-amber-200',
      badgeBorder: palette.amber,
      annotations: [
        { x: 214, y: 168, text: 'Küçük Döngü', sub: '↓↓ EDV · ↓ SV', align: 'middle' },
        { x: 368, y: 146, text: 'Normal LV Doluşu Sağda Kalır', sub: 'Dar mitral orifis LV’yi dolduramaz', align: 'start' },
        { x: 368, y: 84, text: 'Taşikardi → Diyastol Kısalır', sub: 'LA basıncı hızla yükselir → Pulmoner ödem', align: 'start' },
      ],
      caption:
        'Sol ventrikül kontraktilitesi çoğunlukla korunmuştur ancak dar mitral kapak EDV’yi ciddi biçimde sınırlar; soluk/sakin kalp hızı diyastolik doluş süresi için şarttır.',
    },
    {
      key: 'mr',
      title: 'D. Mitral Yetmezlik (MR) — Düşük Dirençli LA’ya Sistolik Kaçış',
      goalBanner: '↑ EDV · ↓ ESV · IVK Kaybı (LA’ya Kaçış)   |   Hedef: Hızlı-Normal HR (80–90) · ↓ SVR · Normal Preload',
      ariaLabel: 'Mitral yetmezlik basınç-hacim döngüsü',
      loopPath:
        'M 431 194 Q 412 164 386 138 C 350 112 312 106 278 108 C 224 110 176 118 144 128 L 144 202 Q 288 200 431 194 Z',
      stroke: palette.teal,
      fill: palette.tealSoft,
      badgeBg: isDark ? 'bg-teal-950/50 text-teal-200 border-teal-800/70' : 'bg-teal-50 text-teal-900 border-teal-200',
      badgeBorder: palette.teal,
      annotations: [
        { x: 438, y: 158, text: 'IVK Kaybı!', sub: 'Sistol başlar başlamaz LA’ya kaçış', align: 'start' },
        { x: 138, y: 108, text: '↓ ESV', sub: 'EF olduğundan yüksek görünür', align: 'end' },
        { x: 286, y: 156, text: 'Geniş Toplam SV', sub: 'İleri Akım ↓ (SVR artarsa kaçış ↑)', align: 'middle' },
      ],
      caption:
        'LV sistol başlar başlamaz düşük basınçlı sol atriyuma boşaldığı için gerçek izovolümik kasılma (IVK) kaybolur; afterload (SVR) düşürülmesi ileri aortik akımı artırır.',
    },
  ];

  return (
    <figure className={figureWrap}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <figcaption className={`text-xs font-bold uppercase tracking-wide ${isDark ? 'text-rose-400' : 'text-rose-800'}`}>
          Şekil 6 — Sol Kalp Kapak Hastalıklarının P–V Döngüsü İmzaları (AS, AR, MS, MR)
        </figcaption>
        <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Kaplan&apos;s Cardiac Anesthesia · Klabunde · Miller&apos;s
        </span>
      </div>

      {/* Shared Legend Strip */}
      <div
        className={`flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-lg border px-3 py-2 text-xs ${
          isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}
      >
        <span className="inline-flex items-center gap-2 font-medium">
          <span
            className="inline-block w-6 border-t-2 border-dashed"
            style={{ borderColor: palette.muted }}
          />
          Normal LV P–V Referans Döngüsü (EDV 120 · ESV 50 mL)
        </span>
        <span className="inline-flex items-center gap-2 font-semibold">
          <span
            className="inline-block w-4 h-3 rounded-xs border-2"
            style={{ borderColor: palette.crimson, backgroundColor: palette.crimsonSoft }}
          />
          Renkli Alan: İlgili Kapak Patolojisi P–V Döngüsü
        </span>
      </div>

      <div className="space-y-4">
        {valvularPanels.map((panel) => (
          <div key={panel.key} className={subCardWrap}>
            <div className={subTitleClass}>{panel.title}</div>
            <div className={`text-xs font-semibold rounded-lg border px-3 py-1.5 text-center ${panel.badgeBg}`}>
              {panel.goalBanner}
            </div>
            <svg
              viewBox="0 0 560 250"
              className="w-full max-w-3xl mx-auto h-auto"
              role="img"
              aria-label={panel.ariaLabel}
            >
              {/* Plot area: x=64..534 (0..200 mL), y=18..206 (0..220 mmHg) */}
              <rect x="64" y="18" width="470" height="188" fill={palette.bg} stroke={palette.grid} />

              {/* Y ticks 0..200 mmHg */}
              {[0, 50, 100, 150, 200].map((p) => {
                const y = 206 - (p / 220) * 188;
                return (
                  <g key={p}>
                    <line x1="64" y1={y} x2="534" y2={y} stroke={palette.grid} strokeWidth="1" />
                    <text x="56" y={y + 4} textAnchor="end" fontSize="10.8" fill={palette.muted}>
                      {p}
                    </text>
                  </g>
                );
              })}

              {/* X ticks 0..200 mL */}
              {[0, 40, 80, 120, 160, 200].map((v) => {
                const x = 64 + (v / 200) * 470;
                return (
                  <g key={v}>
                    <line x1={x} y1="18" x2={x} y2="206" stroke={palette.grid} strokeWidth="1" />
                    <text x={x} y="222" textAnchor="middle" fontSize="10.8" fill={palette.muted}>
                      {v}
                    </text>
                  </g>
                );
              })}

              {/* Dashed Normal LV Reference Loop */}
              <path
                d={normalRefLoopPath}
                fill="none"
                stroke={palette.muted}
                strokeWidth="2"
                strokeDasharray="6,4"
              />

              {/* Pathology P-V Loop */}
              <path
                d={panel.loopPath}
                fill={panel.fill}
                fillOpacity="0.65"
                stroke={panel.stroke}
                strokeWidth="3.2"
              />

              {/* Annotations */}
              {panel.annotations.map((ann) => (
                <g key={ann.text}>
                  <text
                    x={ann.x}
                    y={ann.y}
                    textAnchor={ann.align ?? 'start'}
                    fontSize="10.8"
                    fontWeight="800"
                    fill={panel.stroke}
                  >
                    {ann.text}
                  </text>
                  {ann.sub && (
                    <text
                      x={ann.x}
                      y={ann.y + 13}
                      textAnchor={ann.align ?? 'start'}
                      fontSize="9.8"
                      fontWeight="600"
                      fill={palette.muted}
                    >
                      {ann.sub}
                    </text>
                  )}
                </g>
              ))}

              {/* Axis titles */}
              <text
                x="18"
                y="112"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill={palette.text}
                transform="rotate(-90 18 112)"
              >
                LV Basıncı (mmHg)
              </text>
              <text x="299" y="242" textAnchor="middle" fontSize="11.2" fontWeight="700" fill={palette.text}>
                LV Hacmi (mL)
              </text>
            </svg>
            <p className={subCaptionClass}>{panel.caption}</p>
          </div>
        ))}
      </div>

      <p className={`text-xs text-center font-medium leading-relaxed pt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
        Darlıklarda (AS, MS) akım sınırlıdır → Yavaş sinüs + SVR&apos;yi koru. Yetmezliklerde (AR, MR) hacim yükü ve geri kaçış baskındır → Hızlı-normal HR + Afterload&apos;u (SVR) düşür.
      </p>
    </figure>
  );
};

export default CardiovascularTextbookDiagram;
