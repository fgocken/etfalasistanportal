import React from 'react';
import { formatTr } from '../../utils/abgAnalysis';

interface AbgAcidBaseMapProps {
  ph: number;
  hco3: number;
  isAbnormal: boolean;
  isDark: boolean;
  baselinePoint?: { ph: number; hco3: number; label?: string } | null;
}

export const AbgAcidBaseMap: React.FC<AbgAcidBaseMapProps> = ({
  ph,
  hco3,
  isAbnormal,
  isDark,
  baselinePoint
}) => {
  const X = (p: number) => 44 + ((p - 6.9) / 0.8) * 356;
  const Y = (y: number) => 270 - (Math.min(Math.max(y, 0), 50) / 50) * 252;

  const isobars = [10, 20, 40, 60, 80].map((c) => {
    const pts: string[] = [];
    let lx = 0;
    let ly = 0;
    for (let p = 6.9; p <= 7.701; p += 0.02) {
      const yVal = 0.03 * c * Math.pow(10, p - 6.1);
      if (yVal > 50) break;
      const px = X(p);
      const py = Y(yVal);
      pts.push(`${pts.length === 0 ? 'M' : 'L'}${px.toFixed(1)} ${py.toFixed(1)}`);
      lx = px;
      ly = py;
    }
    return {
      c,
      d: pts.join(' '),
      lx,
      ly
    };
  });

  const curX = X(Math.min(Math.max(ph, 6.9), 7.7));
  const curY = Y(hco3);

  const prevX = baselinePoint ? X(Math.min(Math.max(baselinePoint.ph, 6.9), 7.7)) : null;
  const prevY = baselinePoint ? Y(baselinePoint.hco3) : null;

  const gridStroke = isDark ? '#1e293b' : '#e2e8f0';
  const isoStroke = isDark ? '#475569' : '#94a3b8';
  const textFill = isDark ? '#94a3b8' : '#64748b';
  const normalFill = isDark ? 'rgba(20, 184, 166, 0.16)' : 'rgba(20, 184, 166, 0.14)';
  const normalStroke = isDark ? '#2dd4bf' : '#0f766e';
  const pointStroke = isDark ? '#0f172a' : '#ffffff';
  const pointFill = isAbnormal ? '#e11d48' : '#10b981';

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 440 302"
        role="img"
        aria-label="pH ve HCO3 Asit-Baz Haritası"
        className="w-full h-auto block select-none"
      >
        <defs>
          <marker
            id="abg-trend-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="5"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 7 3.5, 0 7" fill={isDark ? '#38bdf8' : '#0284c7'} />
          </marker>
        </defs>

        {/* Horizontal grid lines (HCO3) */}
        {[0, 10, 20, 30, 40, 50].map((t) => (
          <g key={`y-${t}`}>
            <line x1={44} x2={400} y1={Y(t)} y2={Y(t)} stroke={gridStroke} strokeWidth={1} />
            <text x={36} y={Y(t) + 3.5} fill={textFill} fontSize={10} fontFamily="JetBrains Mono, monospace" textAnchor="end">
              {t}
            </text>
          </g>
        ))}

        {/* Vertical grid lines (pH) */}
        {[7.0, 7.2, 7.4, 7.6].map((p) => (
          <g key={`x-${p}`}>
            <line x1={X(p)} x2={X(p)} y1={18} y2={270} stroke={gridStroke} strokeWidth={1} strokeDasharray="3 3" />
            <text x={X(p)} y={286} fill={textFill} fontSize={10} fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              {formatTr(p, 1)}
            </text>
          </g>
        ))}

        {/* pCO2 isobars */}
        {isobars.map((iso) => (
          <g key={`iso-${iso.c}`}>
            <path d={iso.d} fill="none" stroke={isoStroke} strokeWidth={1} opacity={0.65} />
            <text
              x={Math.min(iso.lx + 4, 412)}
              y={Math.max(iso.ly + 3, 14)}
              fill={textFill}
              fontSize={9.5}
              fontFamily="JetBrains Mono, monospace"
            >
              {iso.c}
            </text>
          </g>
        ))}

        {/* Normal physiological zone */}
        <rect
          x={X(7.35)}
          y={Y(26)}
          width={X(7.45) - X(7.35)}
          height={Y(22) - Y(26)}
          fill={normalFill}
          stroke={normalStroke}
          strokeWidth={1.5}
          rx={2}
        />

        {/* Baseline to current vector */}
        {prevX !== null && prevY !== null && (
          <g>
            <line
              x1={prevX}
              y1={prevY}
              x2={curX}
              y2={curY}
              stroke={isDark ? '#38bdf8' : '#0284c7'}
              strokeWidth={1.75}
              strokeDasharray="4 3"
              markerEnd="url(#abg-trend-arrow)"
            />
            <circle
              cx={prevX}
              cy={prevY}
              r={4.5}
              fill={isDark ? '#38bdf8' : '#0284c7'}
              stroke={pointStroke}
              strokeWidth={1.5}
            />
          </g>
        )}

        {/* Active measurement point */}
        <circle cx={curX} cy={curY} r={6.5} fill={pointFill} stroke={pointStroke} strokeWidth={2} />

        {/* Axis labels */}
        <text x={222} y={299} fill={textFill} fontSize={10.5} fontWeight={600} textAnchor="middle">
          pH
        </text>
        <text x={8} y={13} fill={textFill} fontSize={10.5} fontWeight={600}>
          HCO₃⁻ (mmol/L)
        </text>
        <text x={402} y={13} fill={textFill} fontSize={9.5} textAnchor="end">
          İzobarlar: pCO₂ (mmHg)
        </text>
      </svg>
    </div>
  );
};
