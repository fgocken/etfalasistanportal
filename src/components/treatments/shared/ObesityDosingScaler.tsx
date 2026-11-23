import React, { useMemo, useState } from 'react';
import { Calculator, ChevronDown, ChevronUp, Scale } from 'lucide-react';

export type DosingScalarType = 'LBW' | 'IBW' | 'AdjBW' | 'TBW';

interface ObesityDosingScalerProps {
  isDark: boolean;
  drugName: string;
  recommendedScalar: DosingScalarType;
  secondaryScalar?: { type: DosingScalarType; context: string };
  rationale: string;
  currentWeightKg: number;
  onApplyWeight: (weightKg: number) => void;
}

/**
 * SOBA / Miller's Anesthesia uyumlu Obezite Dozaj Skaler Yardımcısı
 * - IBW: Devine formülü (Erkek: 50 + 0,91×[boy−152,4], Kadın: 45,5 + 0,91×[boy−152,4])
 * - LBW: Janmahasatian formülü (anestezi PK/PD altın standardı)
 * - AdjBW: IBW + 0,4 × (TBW − IBW)
 */
export const ObesityDosingScaler: React.FC<ObesityDosingScalerProps> = ({
  isDark,
  drugName,
  recommendedScalar,
  secondaryScalar,
  rationale,
  currentWeightKg,
  onApplyWeight,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(172);
  const [tbwKg, setTbwKg] = useState<number>(Math.max(40, Math.round(currentWeightKg || 95)));

  const metrics = useMemo(() => {
    const hM = Math.max(1.2, heightCm / 100);
    const bmi = tbwKg / (hM * hM);
    const over152 = Math.max(0, heightCm - 152.4);
    const ibw = Math.max(30, (sex === 'male' ? 50 : 45.5) + 0.91 * over152);
    const lbw =
      sex === 'male'
        ? (9270 * tbwKg) / (6680 + 216 * bmi)
        : (9270 * tbwKg) / (8780 + 244 * bmi);
    const adjbw = tbwKg > ibw ? ibw + 0.4 * (tbwKg - ibw) : tbwKg;

    const map: Record<DosingScalarType, number> = {
      TBW: Math.round(tbwKg),
      IBW: Math.round(ibw),
      LBW: Math.round(lbw),
      AdjBW: Math.round(adjbw),
    };

    return {
      bmi: Number(bmi.toFixed(1)),
      isObese: bmi >= 30,
      values: map,
      recommendedKg: map[recommendedScalar],
      secondaryKg: secondaryScalar ? map[secondaryScalar.type] : null,
    };
  }, [sex, heightCm, tbwKg, recommendedScalar, secondaryScalar]);

  const scalarDescriptions: Record<DosingScalarType, string> = {
    LBW: 'Yağsız Vücut Ağırlığı (Janmahasatian)',
    IBW: 'İdeal Vücut Ağırlığı (Devine)',
    AdjBW: 'Düzeltilmiş Ağırlık (IBW + 0,4×fazla)',
    TBW: 'Gerçek Vücut Ağırlığı',
  };

  return (
    <div
      className={`rounded-xl border transition-colors ${
        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left cursor-pointer"
      >
        <div className="flex items-center gap-2 text-xs font-bold">
          <Scale className="w-4 h-4 text-teal-500 shrink-0" />
          <span className={isDark ? 'text-slate-100' : 'text-slate-800'}>
            Obezite Doz Skaler Yardımcısı (SOBA · {drugName}:{' '}
            <span className="text-teal-600 dark:text-teal-400 font-mono">{recommendedScalar}</span>)
          </span>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
        )}
      </button>

      {open && (
        <div className="px-3.5 pb-3.5 pt-1 space-y-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {rationale}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">Cinsiyet</span>
              <div className="grid grid-cols-2 gap-1">
                {(['male', 'female'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSex(s)}
                    className={`py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                      sex === s
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-300'
                          : 'bg-white border-slate-300 text-slate-700'
                    }`}
                  >
                    {s === 'male' ? 'Erkek' : 'Kadın'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Boy (cm)
              </label>
              <input
                type="number"
                min={130}
                max={220}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value) || 170)}
                className={`w-full px-2.5 py-1.5 rounded-lg border font-mono font-bold text-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                Gerçek Kilo — TBW (kg)
              </label>
              <input
                type="number"
                min={35}
                max={250}
                value={tbwKg}
                onChange={(e) => setTbwKg(Number(e.target.value) || 70)}
                className={`w-full px-2.5 py-1.5 rounded-lg border font-mono font-bold text-xs ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-white'
                    : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['IBW', 'LBW', 'AdjBW', 'TBW'] as DosingScalarType[]).map((key) => {
              const isRec = key === recommendedScalar;
              return (
                <div
                  key={key}
                  className={`rounded-lg border p-2 ${
                    isRec
                      ? isDark
                        ? 'bg-teal-950/50 border-teal-500/60'
                        : 'bg-teal-50 border-teal-400'
                      : isDark
                        ? 'bg-slate-900 border-slate-800'
                        : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[11px] text-teal-600 dark:text-teal-400">{key}</span>
                    {isRec && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-teal-600 text-white">
                        Önerilen
                      </span>
                    )}
                  </div>
                  <div className={`text-base font-mono font-black tabular-nums mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {metrics.values[key]} kg
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    {scalarDescriptions[key]}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
              VKİ: <strong>{metrics.bmi} kg/m²</strong>{' '}
              {metrics.isObese ? '(Obezite — Skaler zorunlu)' : '(Non-obez)'}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {secondaryScalar && metrics.secondaryKg !== null && (
                <button
                  type="button"
                  onClick={() => onApplyWeight(metrics.secondaryKg!)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer ${
                    isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-200 hover:border-teal-500'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-teal-500'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5 text-teal-500" />
                  <span>
                    {secondaryScalar.context}: {secondaryScalar.type} ({metrics.secondaryKg} kg)
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onApplyWeight(metrics.recommendedKg)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold cursor-pointer transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>
                  {recommendedScalar} ({metrics.recommendedKg} kg) Hesaplayıcıya Uygula
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
