import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  AlertOctagon,
  AlertTriangle,
  Clock,
  CheckCircle2,
  RotateCcw,
  BookOpen,
  ExternalLink,
  ClipboardCheck,
  ShieldAlert,
  Sparkles,
  XCircle,
  Activity,
  Wind,
  Wrench
} from 'lucide-react';
import { EmergencyTroubleshootingItem } from '../../data/emergenciesTroubleshootingData';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface EmergencyTroubleshootingDetailViewProps {
  item: EmergencyTroubleshootingItem;
  isDark: boolean;
  onBack: () => void;
}

export const EmergencyTroubleshootingDetailView: React.FC<EmergencyTroubleshootingDetailViewProps> = ({
  item,
  isDark,
  onBack
}) => {
  const [diffFilter, setDiffFilter] = useState<'all' | 'Acil' | 'Çok Yaygın' | 'Yaygın'>('all');
  const [checkedGoldenSteps, setCheckedGoldenSteps] = useState<number[]>([]);

  useEffect(() => {
    setCheckedGoldenSteps([]);
    setDiffFilter('all');
  }, [item.id]);

  const toggleGoldenStep = (idx: number) => {
    setCheckedGoldenSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Üst Başlık ve Geri Dönüş */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border ${
          isDark
            ? 'bg-gradient-to-r from-teal-950/40 via-slate-900 to-slate-900 border-teal-500/35 shadow-lg shadow-slate-950/30'
            : 'bg-gradient-to-r from-teal-50/80 via-white to-cyan-50/50 border-teal-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={onBack}
              className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 mt-0.5 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                  : 'bg-white border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-2xs'
              }`}
              title="Listeye Dön"
            >
              <ArrowLeft className="w-5 h-5 text-teal-500" />
            </button>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {item.title}
                </h1>
                <span className="text-xs font-medium text-teal-600 dark:text-teal-400">
                  · {item.categoryLabel}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            <ShareLinkButton
              type="arac"
              id={`emergencies&sub=${item.id}`}
              isDark={isDark}
              title="Bu Troubleshooting Rehberinin Bağlantısını Kopyala"
            />
            <button
              type="button"
              onClick={onBack}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal-500" />
              <span>Listeye Dön</span>
            </button>
          </div>
        </div>
      </div>

      {/* A. Alarm & Fizyolojik Denklem Özeti */}
      <div
        className={`p-5 rounded-2xl border space-y-3 ${
          isDark
            ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/20 border-teal-500/30'
            : 'bg-gradient-to-r from-teal-50/50 via-white to-slate-50 border-teal-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              İNTRAOPERATİF TROUBLESHOOTING
            </span>
            <span className="text-slate-400">·</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {item.categoryLabel}
            </span>
          </div>
          {item.physiologyFormula && (
            <span
              className={`font-mono tabular-nums text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-cyan-300'
                  : 'bg-white border-slate-200 text-cyan-800'
              }`}
            >
              {item.physiologyFormula}
            </span>
          )}
        </div>

        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
          {item.summary}
        </p>

        {item.primaryAlarm && (
          <div
            className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
              isDark
                ? 'bg-amber-950/25 border-amber-500/30 text-amber-200'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="font-mono tabular-nums font-semibold">{item.primaryAlarm}</div>
          </div>
        )}
      </div>

      {/* B. İlk 60 Saniye Altın Müdahale Kontrol Listesi */}
      <div
        className={`p-5 rounded-2xl border space-y-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              1. İlk 60 Saniye Altın Müdahale (Golden 60 Seconds)
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono tabular-nums text-xs font-bold text-teal-600 dark:text-teal-400">
              {checkedGoldenSteps.length} / {item.goldenSixtySeconds.length} Tamamlandı
            </span>
            {checkedGoldenSteps.length > 0 && (
              <button
                type="button"
                onClick={() => setCheckedGoldenSteps([])}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <RotateCcw className="w-3 h-3" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2">
          {item.goldenSixtySeconds.map((step, idx) => {
            const isDone = checkedGoldenSteps.includes(idx);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleGoldenStep(idx)}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                  isDone
                    ? isDark
                      ? 'bg-emerald-950/25 border-emerald-500/40 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : isDark
                      ? 'bg-slate-950/50 border-slate-800 text-slate-200 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 font-mono tabular-nums text-[11px] font-bold ${
                    isDone
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-300 text-slate-600'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </span>
                <span className={`text-xs leading-relaxed ${isDone ? 'line-through opacity-80' : ''}`}>
                  {step}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* C1. Kapnogram Dalga Formu Tanı Rehberi */}
      {item.capnogramPatterns && item.capnogramPatterns.length > 0 && (
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                2. Kapnogram Dalga Formu &amp; Taban Çizgisi Ayrımı
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Monitör Eğrisi Hızlı Tanı</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {item.capnogramPatterns.map((pat) => {
              const strokeColor =
                pat.tone === 'normal'
                  ? '#10b981'
                  : pat.tone === 'warning'
                    ? '#f59e0b'
                    : pat.tone === 'danger'
                      ? '#f43f5e'
                      : '#06b6d4';
              return (
                <div
                  key={pat.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{pat.label}</div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{pat.subtitle}</div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
                      <svg viewBox="0 0 160 60" className="w-full h-14 overflow-visible" aria-label={pat.label}>
                        <line x1="2" y1="50" x2="158" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="3" y="57" fill="#64748b" fontSize="6" fontFamily="monospace">
                          0 mmHg
                        </text>
                        {pat.baselineY < 50 && (
                          <text x="116" y="47" fill="#fb7185" fontSize="6" fontFamily="monospace">
                            FiCO₂ &gt; 0
                          </text>
                        )}
                        <path
                          d={pat.svgPath}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{pat.meaning}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                    → {pat.action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* C2. Basınç-Zaman Dalga Formu & İnspiratuvar Tutma (Ppeak vs Pplat) */}
      {item.pressurePatterns && item.pressurePatterns.length > 0 && (
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                2. Basınç-Zaman Eğrisi &amp; İnspiratuvar Tutma (Ppeak vs Pplat Ayrımı)
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Rezistans vs Kompliyans Hızlı Tanı</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {item.pressurePatterns.map((pat) => {
              const strokeColor =
                pat.tone === 'normal'
                  ? '#10b981'
                  : pat.tone === 'warning'
                    ? '#f59e0b'
                    : pat.tone === 'danger'
                      ? '#f43f5e'
                      : '#06b6d4';
              return (
                <div
                  key={pat.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{pat.label}</div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{pat.subtitle}</div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
                      <svg viewBox="0 0 160 62" className="w-full h-16 overflow-visible" aria-label={pat.label}>
                        <line x1="2" y1="20" x2="158" y2="20" stroke="#7f1d1d" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="3" y="17" fill="#fca5a5" fontSize="6" fontFamily="monospace">
                          30 cmH₂O (Pplat sınırı)
                        </text>
                        <line x1="2" y1="50" x2="158" y2="50" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="3" y="57" fill="#64748b" fontSize="6" fontFamily="monospace">
                          0 cmH₂O
                        </text>
                        <path
                          d={pat.svgPath}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono tabular-nums">
                      <div className={`px-2 py-1 rounded border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="text-slate-400">Ppeak: </span>
                        <strong>{pat.ppeakLabel}</strong>
                      </div>
                      <div className={`px-2 py-1 rounded border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'}`}>
                        <span className="text-slate-400">Pplat: </span>
                        <strong>{pat.pplatLabel}</strong>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded border text-[10px] font-mono font-bold tabular-nums text-center ${
                        pat.tone === 'normal'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                          : pat.tone === 'warning'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                            : pat.tone === 'danger'
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300'
                              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                      }`}
                    >
                      {pat.gradientLabel}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{pat.meaning}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                    → {pat.action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* C3. SpO₂ Pletismografi (Pleth) Dalga Formu & Artefakt / Dishemoglobinemi Ayrımı */}
      {item.spo2Patterns && item.spo2Patterns.length > 0 && (
        <div
          className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                2. Pletismografi (Pleth) Dalgası &amp; SpO₂ Artefakt / Dishemoglobinemi Ayrımı
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">Gerçek Hipoksemi vs Artefakt Hızlı Tanı</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {item.spo2Patterns.map((pat) => {
              const strokeColor =
                pat.tone === 'normal'
                  ? '#10b981'
                  : pat.tone === 'warning'
                    ? '#f59e0b'
                    : pat.tone === 'danger'
                      ? '#f43f5e'
                      : '#06b6d4';
              return (
                <div
                  key={pat.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{pat.label}</div>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{pat.subtitle}</div>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-2">
                      <svg viewBox="0 0 160 62" className="w-full h-16 overflow-visible" aria-label={pat.label}>
                        <line x1="2" y1="16" x2="158" y2="16" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="3" y="12" fill="#64748b" fontSize="6" fontFamily="monospace">
                          Normal PI
                        </text>
                        <line x1="2" y1="48" x2="158" y2="48" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />
                        <text x="3" y="56" fill="#64748b" fontSize="6" fontFamily="monospace">
                          Bazal (0)
                        </text>
                        <path
                          d={pat.svgPath}
                          fill="none"
                          stroke={strokeColor}
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div
                      className={`px-2 py-1 rounded border text-[10px] font-mono font-bold tabular-nums text-center ${
                        pat.tone === 'normal'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-300'
                          : pat.tone === 'warning'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                            : pat.tone === 'danger'
                              ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-300'
                              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-300'
                      }`}
                    >
                      {pat.spo2Badge}
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{pat.meaning}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
                    → {pat.action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* D. Sistematik Ayırıcı Tanı Matriksi */}
      <div
        className={`p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-500" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                3. Sistematik Ayırıcı Tanı ({item.differentialDiagnosis.length} Etiyoloji)
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Fizyolojik mekanizmaya ve sıklığa göre klinik ipuçları, doğrulama testi ve acil müdahale.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['all', 'Acil', 'Çok Yaygın', 'Yaygın'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setDiffFilter(f)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer ${
                  diffFilter === f
                    ? f === 'Acil'
                      ? 'bg-red-600 text-white border-red-500'
                      : 'bg-teal-600 text-white border-teal-500'
                    : isDark
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {f === 'all' ? 'Tümü' : f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {item.differentialDiagnosis
            .filter((d) => diffFilter === 'all' || d.frequency === diffFilter)
            .map((diff, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2.5 ${
                  diff.frequency === 'Acil'
                    ? isDark
                      ? 'bg-red-950/25 border-red-500/45'
                      : 'bg-red-50/75 border-red-300'
                    : isDark
                      ? 'bg-slate-950/50 border-slate-800'
                      : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    {diff.mechanism && (
                      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        {diff.mechanism}
                      </div>
                    )}
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {diff.condition}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                      diff.frequency === 'Acil'
                        ? 'bg-red-600 text-white border-red-500'
                        : diff.frequency === 'Çok Yaygın'
                          ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30'
                          : 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30'
                    }`}
                  >
                    {diff.frequency}
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] leading-relaxed">
                  <div className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Klinik İpuçları: </strong>
                    {diff.clues}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    <strong className="text-cyan-700 dark:text-cyan-400">Doğrulama: </strong>
                    {diff.confirmatoryTest}
                  </div>
                  <div
                    className={`p-2 rounded-lg border font-medium ${
                      diff.frequency === 'Acil'
                        ? isDark
                          ? 'bg-red-950/45 border-red-500/35 text-red-200'
                          : 'bg-white border-red-200 text-red-900'
                        : isDark
                          ? 'bg-slate-900 border-slate-800 text-emerald-300'
                          : 'bg-white border-slate-200 text-emerald-900'
                    }`}
                  >
                    <strong>{diff.frequency === 'Acil' ? 'Acil Müdahale: ' : 'Müdahale: '}</strong>
                    {diff.immediateAction}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* E. Adım Adım Karar & Müdahale Algoritması */}
      <div
        className={`p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200/70 dark:border-slate-800">
          <ClipboardCheck className="w-4 h-4 text-teal-500" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
            4. Adım Adım Algoritmik Sorun Giderme Akışı
          </h2>
        </div>

        <div className="space-y-2.5">
          {item.algorithmicSteps.map((step) => (
            <div
              key={step.stepNumber}
              className={`p-4 rounded-xl border flex flex-col sm:flex-row gap-3 ${
                isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center sm:flex-col sm:items-start gap-2 sm:w-44 shrink-0">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-mono tabular-nums text-xs font-bold flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </span>
                <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400">
                  {step.phase}
                </span>
              </div>
              <div className="space-y-1 flex-1">
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{step.action}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.detail}</p>
                {step.checkTip && (
                  <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 pt-1">
                    ✓ Kontrol İpucu: {step.checkTip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* F. Klinik İnciler, Tuzaklar ve Ekipman Kontrol Listesi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
            isDark ? 'bg-emerald-950/15 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Klinik İnciler (Pearls)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {item.pearlsAndPitfalls.pearls.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
            isDark ? 'bg-rose-950/15 border-rose-500/30' : 'bg-rose-50/60 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs text-rose-700 dark:text-rose-300 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Kritik Tuzaklar (Pitfalls)</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {item.pearlsAndPitfalls.pitfalls.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-teal-500 shrink-0" />
            <span>Yatak Başı Ekipman Listesi</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            {item.equipmentChecklist.map((eq, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="font-mono tabular-nums font-bold text-teal-600 dark:text-teal-400 shrink-0">
                  {idx + 1}.
                </span>
                <span>{eq}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* G. Kaynaklar */}
      {item.references && item.references.length > 0 && (
        <div
          className={`p-4 rounded-xl border text-xs space-y-1.5 ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
            <BookOpen className="w-4 h-4 text-teal-500" />
            <span>Kaynaklar (Textbook &amp; Güncel Kılavuzlar)</span>
          </div>
          {item.references.map((ref, idx) => (
            <div key={idx} className="flex flex-wrap items-center gap-1.5 leading-relaxed">
              <span>
                {idx + 1}. {ref.citation}
              </span>
              {ref.pmid && (
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span>PMID: {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
