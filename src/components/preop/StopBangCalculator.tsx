import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Info,
  Moon,
  RotateCcw,
  ShieldAlert,
  Stethoscope,
  Wind,
} from 'lucide-react';

interface StopBangCalculatorProps {
  isDark: boolean;
}

interface StopBangQuestion {
  key: 'S' | 'T' | 'O' | 'P' | 'B' | 'A' | 'N' | 'G';
  letter: string;
  group: 'STOP' | 'BANG';
  trTitle: string;
  enTitle: string;
  detail: string;
}

const STOP_BANG_QUESTIONS: StopBangQuestion[] = [
  {
    key: 'S',
    letter: 'S',
    group: 'STOP',
    trTitle: 'Horlama (Snoring)',
    enTitle: 'Snoring',
    detail: 'Konuşma sesinden daha yüksek veya kapalı kapı ardından duyulacak kadar gürültülü horluyor musunuz?',
  },
  {
    key: 'T',
    letter: 'T',
    group: 'STOP',
    trTitle: 'Yorgunluk / Uykululuk (Tired)',
    enTitle: 'Tired',
    detail: 'Gündüzleri sık sık yorgun, bitkin veya uykulu hissediyor musunuz (ör. araç kullanırken uyuklama)?',
  },
  {
    key: 'O',
    letter: 'O',
    group: 'STOP',
    trTitle: 'Tanıklı Apne (Observed)',
    enTitle: 'Observed',
    detail: 'Uyurken nefesinizin durduğunu veya boğulur gibi nefes aldığınızı gören oldu mu?',
  },
  {
    key: 'P',
    letter: 'P',
    group: 'STOP',
    trTitle: 'Hipertansiyon (Pressure)',
    enTitle: 'Blood Pressure',
    detail: 'Yüksek tansiyon (HT) tanınız var mı veya antihipertansif tedavi alıyor musunuz?',
  },
  {
    key: 'B',
    letter: 'B',
    group: 'BANG',
    trTitle: 'VKİ > 35 kg/m² (BMI)',
    enTitle: 'BMI > 35 kg/m²',
    detail: 'Vücut kitle indeksi 35 kg/m²’nin üzerinde mi? (Aşağıdaki hızlı VKİ aracından otomatik işaretlenebilir)',
  },
  {
    key: 'A',
    letter: 'A',
    group: 'BANG',
    trTitle: 'Yaş > 50 (Age)',
    enTitle: 'Age > 50 years',
    detail: 'Hasta 50 yaşından büyük mü?',
  },
  {
    key: 'N',
    letter: 'N',
    group: 'BANG',
    trTitle: 'Boyun Çevresi > 40 cm (Neck)',
    enTitle: 'Neck > 40 cm',
    detail: 'Adem elması hizasında boyun çevresi > 40 cm mi? (Cinsiyete özgü: Erkek > 43 cm, Kadın > 41 cm)',
  },
  {
    key: 'G',
    letter: 'G',
    group: 'BANG',
    trTitle: 'Erkek Cinsiyet (Gender)',
    enTitle: 'Gender = Male',
    detail: 'Hasta erkek cinsiyette mi?',
  },
];

export const StopBangCalculator: React.FC<StopBangCalculatorProps> = ({ isDark }) => {
  const [answers, setAnswers] = useState<Record<StopBangQuestion['key'], boolean>>({
    S: false,
    T: false,
    O: false,
    P: false,
    B: false,
    A: false,
    N: false,
    G: false,
  });

  // Optional quick BMI helper + OHS screening markers
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');
  const [serumHco3, setSerumHco3] = useState<string>('');
  const [awakeSpo2, setAwakeSpo2] = useState<string>('');

  const toggleAnswer = (key: StopBangQuestion['key']) => {
    setAnswers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setAnswers({ S: false, T: false, O: false, P: false, B: false, A: false, N: false, G: false });
    setWeightKg('');
    setHeightCm('');
    setSerumHco3('');
    setAwakeSpo2('');
  };

  // Optional BMI auto-calculation
  const parsedW = parseFloat(weightKg);
  const parsedH = parseFloat(heightCm);
  const computedBmi =
    !isNaN(parsedW) && !isNaN(parsedH) && parsedW > 20 && parsedH > 100
      ? parsedW / Math.pow(parsedH / 100, 2)
      : null;

  const applyBmiToForm = () => {
    if (computedBmi !== null) {
      setAnswers((prev) => ({ ...prev, B: computedBmi > 35 }));
    }
  };

  const stopScore = Number(answers.S) + Number(answers.T) + Number(answers.O) + Number(answers.P);
  const bangScore = Number(answers.B) + Number(answers.A) + Number(answers.N) + Number(answers.G);
  const totalScore = stopScore + bangScore;

  // Official Chung et al. (2016) 2-Step Classification
  const hasTwoStepUpgrade =
    totalScore >= 3 &&
    totalScore <= 4 &&
    stopScore >= 2 &&
    (answers.G || answers.B || answers.N);

  const riskLevel: 'low' | 'intermediate' | 'high' =
    totalScore >= 5 || hasTwoStepUpgrade
      ? 'high'
      : totalScore >= 3
        ? 'intermediate'
        : 'low';

  // OHS Red-Flag Evaluation (BMI >= 30 or B=true + HCO3 >= 27 or SpO2 < 94%)
  const parsedHco3 = parseFloat(serumHco3);
  const parsedSpo2 = parseFloat(awakeSpo2);
  const hasHighHco3 = !isNaN(parsedHco3) && parsedHco3 >= 27;
  const hasLowAwakeSpo2 = !isNaN(parsedSpo2) && parsedSpo2 > 50 && parsedSpo2 < 94;
  const hasObesityForOhs = answers.B || (computedBmi !== null && computedBmi >= 30);
  const ohsSuspected = (hasObesityForOhs && (hasHighHco3 || hasLowAwakeSpo2)) || (totalScore >= 3 && hasHighHco3);

  // Predicted Probabilities of Moderate-to-Severe OSA (AHI >= 15) & Severe OSA (AHI >= 30) — Chung et al. 2012/2016
  const modSevereProb =
    totalScore <= 2
      ? '~%18 (Yüksek Negatif Öngörü)'
      : totalScore === 3
        ? '~%36'
        : totalScore === 4
          ? '~%48'
          : totalScore === 5
            ? '~%60'
            : totalScore === 6
              ? '~%72'
              : '~%80+';

  const severeProb =
    totalScore <= 2
      ? '< %5'
      : totalScore === 3
        ? '~%15'
        : totalScore === 4
          ? '~%25'
          : totalScore === 5
            ? '~%38'
            : totalScore === 6
              ? '~%50'
              : '~%65+';

  const cardClass = isDark
    ? 'rounded-2xl border border-slate-800 bg-slate-900/75 p-4 sm:p-5 space-y-4'
    : 'rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4 shadow-xs';

  const subCardClass = isDark
    ? 'rounded-xl border border-slate-800 bg-slate-950/60 p-3.5'
    : 'rounded-xl border border-slate-200 bg-slate-50/75 p-3.5';

  return (
    <div className="space-y-6">
      {/* ===================================================================== */}
      {/* BÖLÜM 1: EN BAŞTA — STOP-BANG HESAPLAYICI & RİSK YORUMLAMASI          */}
      {/* ===================================================================== */}
      <section className={cardClass}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3.5 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
              1
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  STOP-BANG Hesaplayıcı &amp; İki Aşamalı (2-Step) Risk Analizi
                </h3>
                <span
                  className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    isDark
                      ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}
                >
                  Chung 2016 · SASM
                </span>
              </div>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                8 soruluk OSAS tarama ölçeği + 2-Step özgüllük yükseltmesi + Serum HCO₃⁻ / SpO₂ ile OHS taraması
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetAll}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer self-start sm:self-auto ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left 7 Cols: 8 STOP-BANG Interactive Questions */}
          <div className="lg:col-span-7 space-y-3">
            {/* STOP & BANG Group Labels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STOP_BANG_QUESTIONS.map((q) => {
                const checked = answers[q.key];
                const isStop = q.group === 'STOP';
                return (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => toggleAnswer(q.key)}
                    className={`group text-left rounded-xl border p-3 transition-all cursor-pointer select-none ${
                      checked
                        ? isStop
                          ? isDark
                            ? 'bg-indigo-500/15 border-indigo-400 shadow-xs'
                            : 'bg-indigo-50 border-indigo-400 shadow-xs'
                          : isDark
                            ? 'bg-amber-500/15 border-amber-400 shadow-xs'
                            : 'bg-amber-50 border-amber-400 shadow-xs'
                        : isDark
                          ? 'bg-slate-950/60 border-slate-800 hover:border-slate-600'
                          : 'bg-slate-50/70 border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg font-mono font-bold text-sm flex items-center justify-center shrink-0 border ${
                            checked
                              ? isStop
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : 'bg-amber-500 text-white border-amber-400'
                              : isDark
                                ? 'bg-slate-900 text-slate-300 border-slate-700'
                                : 'bg-white text-slate-700 border-slate-200'
                          }`}
                        >
                          {q.letter}
                        </span>
                        <div>
                          <div className={`text-xs font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {q.trTitle}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{q.group}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                          checked
                            ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/40'
                            : isDark
                              ? 'bg-slate-900 text-slate-500 border-slate-800'
                              : 'bg-white text-slate-400 border-slate-200'
                        }`}
                      >
                        {checked ? 'EVET (+1)' : 'HAYIR'}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-2 leading-snug ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {q.detail}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Optional BMI + OHS Screening Helper Strip */}
            <div className={`${subCardClass} space-y-2.5`}>
              <div className="text-[11px] font-bold flex items-center justify-between">
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                  Opsiyonel Hızlı VKİ &amp; OHS Tarama Parametreleri (Serum HCO₃⁻ &amp; Uyanık SpO₂)
                </span>
                {computedBmi !== null && (
                  <button
                    type="button"
                    onClick={applyBmiToForm}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
                  >
                    VKİ {computedBmi.toFixed(1)} → B’ye Uygula
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Kilo (kg)</label>
                  <input
                    type="number"
                    placeholder="ör. 112"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Boy (cm)</label>
                  <input
                    type="number"
                    placeholder="ör. 170"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Venöz HCO₃⁻ (mEq/L)</label>
                  <input
                    type="number"
                    placeholder="Eşik ≥ 27"
                    value={serumHco3}
                    onChange={(e) => setSerumHco3(e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                      hasHighHco3
                        ? 'bg-rose-500/10 border-rose-500 text-rose-500 font-bold'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Uyanık Oda SpO₂ (%)</label>
                  <input
                    type="number"
                    placeholder="Eşik < 94"
                    value={awakeSpo2}
                    onChange={(e) => setAwakeSpo2(e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                      hasLowAwakeSpo2
                        ? 'bg-rose-500/10 border-rose-500 text-rose-500 font-bold'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Live Score Gauge, 2-Step Interpretation & OHS Flag */}
          <div className="lg:col-span-5 space-y-3">
            {/* Score Hero Card */}
            <div
              className={`rounded-2xl border p-4 space-y-3 ${
                riskLevel === 'high'
                  ? isDark
                    ? 'bg-rose-950/35 border-rose-500/45'
                    : 'bg-rose-50 border-rose-300'
                  : riskLevel === 'intermediate'
                    ? isDark
                      ? 'bg-amber-950/30 border-amber-500/45'
                      : 'bg-amber-50 border-amber-300'
                    : isDark
                      ? 'bg-emerald-950/30 border-emerald-500/45'
                      : 'bg-emerald-50 border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                    STOP-BANG Toplam Skoru
                  </div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span
                      className={`text-3xl font-mono font-black tabular-nums ${
                        riskLevel === 'high'
                          ? 'text-rose-500'
                          : riskLevel === 'intermediate'
                            ? 'text-amber-500'
                            : 'text-emerald-500'
                      }`}
                    >
                      {totalScore}
                    </span>
                    <span className="text-sm font-mono text-slate-400">/ 8 Puan</span>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase border ${
                      riskLevel === 'high'
                        ? 'bg-rose-500 text-white border-rose-400'
                        : riskLevel === 'intermediate'
                          ? 'bg-amber-500 text-white border-amber-400'
                          : 'bg-emerald-600 text-white border-emerald-500'
                    }`}
                  >
                    {riskLevel === 'high'
                      ? 'YÜKSEK OSAS RİSKİ'
                      : riskLevel === 'intermediate'
                        ? 'ORTA OSAS RİSKİ'
                        : 'DÜŞÜK OSAS RİSKİ'}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    STOP: {stopScore}/4 · BANG: {bangScore}/4
                  </div>
                </div>
              </div>

              {/* Visual 8-Step Meter Bar */}
              <div className="grid grid-cols-8 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => {
                  const filled = step <= totalScore;
                  const segColor =
                    step <= 2 ? 'bg-emerald-500' : step <= 4 ? 'bg-amber-500' : 'bg-rose-500';
                  return (
                    <div
                      key={step}
                      className={`h-2 rounded-sm transition-all ${
                        filled ? segColor : isDark ? 'bg-slate-800' : 'bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>

              {/* 2-Step Upgrade Explanation Badge */}
              {hasTwoStepUpgrade && (
                <div className="rounded-lg bg-rose-500/15 border border-rose-500/40 px-2.5 py-2 text-[11px] text-rose-600 dark:text-rose-300 font-semibold">
                  <strong>2-Step Yükseltme Aktif:</strong> Skor 3–4 olmasına rağmen <strong>STOP ≥ 2</strong> ve{' '}
                  <strong>{[answers.G && 'Erkek', answers.B && 'VKİ > 35', answers.N && 'Boyun > 40 cm'].filter(Boolean).join(' + ')}</strong>{' '}
                  bulunduğu için hasta <strong>Yüksek Risk</strong> sınıfına alınır (Chung 2016).
                </div>
              )}

              {/* Probability Readouts */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className={`rounded-lg border p-2 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                  <div className="text-[10px] text-slate-400">Orta–Ağır OSAS (AHI ≥ 15)</div>
                  <div className="text-xs font-mono font-bold mt-0.5 text-indigo-500">{modSevereProb}</div>
                </div>
                <div className={`rounded-lg border p-2 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                  <div className="text-[10px] text-slate-400">Ağır OSAS (AHI ≥ 30)</div>
                  <div className="text-xs font-mono font-bold mt-0.5 text-rose-500">{severeProb}</div>
                </div>
              </div>
            </div>

            {/* OHS Red-Flag Banner (Dynamic) */}
            {ohsSuspected ? (
              <div
                className={`rounded-xl border p-3.5 space-y-1.5 ${
                  isDark ? 'bg-rose-950/50 border-rose-500 text-rose-200' : 'bg-rose-100/80 border-rose-400 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-rose-500">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>OHS (Obezite Hipoventilasyon Sendromu) Kırmızı Bayrağı!</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {hasHighHco3 && <>Serum <strong>HCO₃⁻ ≥ 27 mEq/L</strong> kronik respiratuvar asidozun renal kompansasyonunu gösterir. </>}
                  {hasLowAwakeSpo2 && <>Uyanık oda havasında <strong>SpO₂ &lt; %94</strong> gündüz hipoksemisi/hipoventilasyonunu işaret eder. </>}
                  <strong>Aksiyon:</strong> Elektif cerrahi öncesi <strong>Arter Kan Gazı (PaCO₂ ≥ 45?)</strong>, EKO (Pulmoner HT / RV) ve göğüs hastalıkları / perioperatif BiPAP optimizasyonu değerlendirilmelidir!
                </p>
              </div>
            ) : (
              <div className={`${subCardClass} text-[11px] space-y-1.5`}>
                <div className="font-bold flex items-center gap-1.5 text-indigo-500">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Klinik Karar &amp; Yorum Özeti</span>
                </div>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {riskLevel === 'low'
                    ? 'Düşük Risk (0–2): Orta-ağır OSAS olasılığı düşüktür (%90+ negatif öngörü değeri). Standart perioperatif anestezi yönetimi uygundur.'
                    : riskLevel === 'intermediate'
                      ? 'Orta Risk (3–4): Özgüllüğü artırmak için 2-Step kriterlerine (Erkek, VKİ>35, Boyun>40) ve venöz serum HCO₃⁻ (≥28 mmol/L) değerine bakın. Opioid-sparing anestezi ve yakın PACU izlemi önerilir.'
                      : 'Yüksek Risk (≥5 veya 2-Step Yüksek): Tanısız orta-ağır OSAS varsayın! SASM kılavuzuna göre kompanse hastada cerrahi tek başına ertelenmez; ancak zor havayolu, opioid-sparing rejim, TOFR ≥ 0.90, baş-yukarı ekstübasyon ve yakın postop izlem zorunludur. VKİ ≥ 30 ise HCO₃⁻ ile OHS dışlayın!'}
                </p>
              </div>
            )}

            {/* Official 2-Step Rule Summary Box */}
            <div className={`${subCardClass} text-[11px]`}>
              <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1.5">
                Resmi Sınıflama Kuralları (Chung 2016)
              </div>
              <ul className={`space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li><strong className="text-emerald-500">• 0–2 Puan:</strong> Düşük Risk (Sensitivite &gt;%90, orta-ağır OSAS’ı dışlamada güçlü)</li>
                <li><strong className="text-amber-500">• 3–4 Puan:</strong> Orta Risk (2-Step veya Serum HCO₃⁻ ≥ 28 mmol/L ile özgüllük %85+’a çıkar)</li>
                <li><strong className="text-rose-500">• 5–8 Puan</strong> <em>veya</em> <strong>STOP ≥ 2 + (Erkek / VKİ&gt;35 / Boyun&gt;40):</strong> Yüksek Risk</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: OSAS VE OHS — TANIM VE TANI KRİTERLERİ                       */}
      {/* ===================================================================== */}
      <section className={cardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            2
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              OSAS ve OHS: Tanım ve Tanı Kriterleri
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Obstrüktif Uyku Apne Sendromu (ICSD-3 / AHI) ile Obezite Hipoventilasyon Sendromunun (ATS 2019) Kesin Ayrımı
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* OSAS Card */}
          <div className={`${subCardClass} border-l-4 border-l-sky-500 space-y-3`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-sky-500" />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  OSAS (Obstrüktif Uyku Apne Sendromu)
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-sky-500">PSG · AHI</span>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Uyku sırasında devam eden solunum çabasına rağmen üst hava yolunun tekrarlayan tam (<strong>apne</strong>: ≥ 10 sn ≥ %90 akım kesilmesi)
              veya kısmi (<strong>hipopne</strong>: ≥ 10 sn ≥ %30 akım azalması + ≥ %3–4 desatürasyon veya mikro-uyanma) kollapsıyla karakterize sendromdur.
            </p>

            {/* ICSD-3 Criteria */}
            <div className={`rounded-lg p-2.5 border text-xs space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="font-bold text-sky-500 text-[11px]">ICSD-3 Tanı Kriteri (Polisomnografi):</div>
              <div className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                • <strong>AHI ≥ 15 /saat</strong> (semptom olmasa dahi tanı koydurur) <strong>VEYA</strong>
              </div>
              <div className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                • <strong>AHI ≥ 5 /saat</strong> + gündüz uykululuk, tanıklı apne, boğulma hissi veya HT/KAH/AF/Tip 2 DM/inme varlığı.
              </div>
            </div>

            {/* AHI Severity Scale */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2">
                <div className="text-[10px] text-emerald-500 font-bold">HAFİF</div>
                <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>AHI 5–14</div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2">
                <div className="text-[10px] text-amber-500 font-bold">ORTA</div>
                <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>AHI 15–29</div>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2">
                <div className="text-[10px] text-rose-500 font-bold">AĞIR</div>
                <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>AHI ≥ 30</div>
              </div>
            </div>
          </div>

          {/* OHS Card */}
          <div className={`${subCardClass} border-l-4 border-l-rose-500 space-y-3`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  OHS (Obezite Hipoventilasyon Sendromu)
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold text-rose-500">ATS 2019 · 3 Kriter</span>
            </div>

            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              İzole OSAS’tan farklı olarak yalnızca uykuda değil, <strong>gündüz uyanıkken de kronik alveoler hipoventilasyon (hiperkapni)</strong> bulunan
              ve çok daha yüksek perioperatif solunum/kardiyopulmoner mortalite taşıyan sendromdur (<em>Pickwickian Sendromu</em>).
            </p>

            {/* ATS 2019 3 Mandatory Criteria */}
            <div className={`rounded-lg p-2.5 border text-xs space-y-1.5 ${isDark ? 'bg-rose-950/25 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'}`}>
              <div className="font-bold text-rose-500 text-[11px]">Kesin Tanı İçin 3 Kriterin TAMAMI Gerekir:</div>
              <div className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>1. Obezite:</strong> VKİ <strong>≥ 30 kg/m²</strong>
              </div>
              <div className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>2. Gündüz Uyanık Hiperkapni:</strong> Deniz seviyesinde AKG’de <strong>PaCO₂ ≥ 45 mmHg</strong> (ve renal kompansasyonla venöz <strong>HCO₃⁻ ≥ 27 mEq/L</strong>)
              </div>
              <div className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                <strong>3. Dışlama:</strong> Hipoventilasyonu açıklayacak başka neden olmaması (ağır KOAH, kifoskolyoz, nöromüsküler hastalık, hipotiroidi, ilaç).
              </div>
            </div>

            <div className={`text-[11px] font-medium ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
              ★ OHS hastalarının <strong>~%90’ında eşlik eden OSAS</strong> vardır; %10’unda ise uykuda non-obstrüktif hipoventilasyon görülür.
            </div>
          </div>
        </div>

        {/* Comparison Table: OSAS vs OHS */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="text-left p-2.5 font-bold rounded-tl-lg">Klinik Parametre</th>
                <th className="text-left p-2.5 font-bold text-sky-500">İzole OSAS</th>
                <th className="text-left p-2.5 font-bold text-rose-500 rounded-tr-lg">OHS (Obezite Hipoventilasyon)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  param: 'VKİ (BMI)',
                  osas: 'Sıklıkla yüksek ama normal kilolu bireylerde de olabilir (kraniyofasiyal anatomi)',
                  ohs: 'Tanı gereği mutlaka VKİ ≥ 30 kg/m² (çoğunlukla ≥ 35–40 kg/m²)',
                },
                {
                  param: 'Gündüz Uyanık PaCO₂',
                  osas: 'Normal (35–44 mmHg) — gündüz hiperkapni yoktur',
                  ohs: 'Yüksek (PaCO₂ ≥ 45 mmHg) — kronik gündüz hipoventilasyonu',
                },
                {
                  param: 'Venöz Serum HCO₃⁻ (Tarama)',
                  osas: 'Normal (22–26 mEq/L)',
                  ohs: 'Yüksek (≥ 27 mEq/L — renal bikarbonat tutulumu, taramada yüksek duyarlılık!)',
                },
                {
                  param: 'Gündüz Oda Havası SpO₂',
                  osas: 'Genellikle normal (≥ %95)',
                  ohs: 'Sıklıkla düşük (< %94) + sekonder eritrositoz (polisitemi)',
                },
                {
                  param: 'Pulmoner HT / Kor Pulmonale',
                  osas: 'Orta–ağır olguların ~%15–20’sinde (hafif–orta)',
                  ohs: 'Çok sık (~%50–60) ve ağır — sağ kalp yetmezliği riski yüksek!',
                },
                {
                  param: 'Elektif Cerrahi Kararı',
                  osas: 'Kompanse ise tek başına ertelenmez; önlemlerle opere edilir (SASM)',
                  ohs: 'Tanısız/tedavisiz ise ERTELEME + AKG/EKO + preop BiPAP optimizasyonu!',
                },
              ].map((row) => (
                <tr key={row.param} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                  <td className={`p-2.5 font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{row.param}</td>
                  <td className={`p-2.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{row.osas}</td>
                  <td className={`p-2.5 font-medium ${isDark ? 'text-rose-200' : 'text-rose-800'}`}>{row.ohs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: PATOFİZYOLOJİ — PERİOPERATİF YÖNETİMİ NEDEN ETKİLER?        */}
      {/* ===================================================================== */}
      <section className={cardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            3
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Patofizyoloji: Perioperatif Yönetimi Neden Kritik Şekilde Etkiler?
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Faringeal Kollaps (Pcrit), Opioid Hiperduyarlılığı, Kemoreseptör Küntleşmesi, Pulmoner HT ve Postop REM Rebound
            </p>
          </div>
        </div>

        {/* Visual Pathophysiology Cascade SVG */}
        <svg viewBox="0 0 880 205" className="w-full h-auto rounded-xl">
          <rect x="0" y="0" width="880" height="205" rx="12" fill={isDark ? '#090d16' : '#f8fafc'} />

          {/* Box 1: Airway Collapse & FRC */}
          <rect x="14" y="14" width="204" height="177" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#0ea5e9" strokeWidth="1.3" />
          <text x="26" y="34" fill="#38bdf8" fontSize="10" fontWeight="bold">1. FARİNGEAL KOLLAPS &amp; FRC ↓</text>
          <text x="26" y="53" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">• Parafaringeal yağ + dar lümen</text>
          <text x="26" y="67" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">• Anestezik/BZD/opioid genioglossus</text>
          <text x="34" y="79" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">tonusunu siler → Pcrit yükselir!</text>
          <text x="26" y="96" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.8">• Obezitede FRC ↓↓ (O₂ deposu az)</text>
          <rect x="26" y="114" width="180" height="64" rx="6" fill="#0ea5e9" fillOpacity="0.14" />
          <text x="34" y="130" fill="#38bdf8" fontSize="8.8" fontWeight="bold">Anestezi Sonucu:</text>
          <text x="34" y="144" fill={isDark ? '#bae6fd' : '#0369a1'} fontSize="8.5">→ Zor maske &amp; zor entübasyon (3–4×)</text>
          <text x="34" y="157" fill={isDark ? '#bae6fd' : '#0369a1'} fontSize="8.5">→ Apnede saniyeler içinde desatürasyon</text>
          <text x="34" y="170" fill={isDark ? '#bae6fd' : '#0369a1'} fontSize="8.5">→ Ekstübasyon sonrası laringospazm</text>

          {/* Box 2: Opioid Hypersensitivity & CO2 Narcosis */}
          <rect x="230" y="14" width="204" height="177" rx="10" fill={isDark ? '#2a1215' : '#fff1f2'} stroke="#f43f5e" strokeWidth="1.3" />
          <text x="242" y="34" fill="#f43f5e" fontSize="10" fontWeight="bold">2. OPİOİD DUYARLILIĞI &amp; CO₂</text>
          <text x="242" y="53" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.8">• Aralıklı hipoksi → μ-opioid reseptör</text>
          <text x="250" y="65" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.8">up-regülasyonu (düşük dozda apne!)</text>
          <text x="242" y="82" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.8">• OHS: Santral CO₂ duyusu küntleşir;</text>
          <text x="250" y="94" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.8">solunum hipoksik dürtüye kayar!</text>
          <rect x="242" y="114" width="180" height="64" rx="6" fill="#f43f5e" fillOpacity="0.18" />
          <text x="250" y="130" fill="#fb7185" fontSize="8.8" fontWeight="bold">Anestezi Sonucu:</text>
          <text x="250" y="144" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.5">→ Standart opioid dozunda derin apne</text>
          <text x="250" y="157" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.5">→ Aşırı O₂ + Haldane → CO₂ narkozu</text>
          <text x="250" y="170" fill={isDark ? '#fecdd3' : '#881337'} fontSize="8.5">→ O₂ altında SpO₂ %98 iken gizli apne!</text>

          {/* Box 3: Cardiopulmonary & PHT */}
          <rect x="446" y="14" width="204" height="177" rx="10" fill={isDark ? '#1c1910' : '#fffbeb'} stroke="#f59e0b" strokeWidth="1.3" />
          <text x="458" y="34" fill="#f59e0b" fontSize="10" fontWeight="bold">3. KARDİYOVASKÜLER &amp; RV</text>
          <text x="458" y="53" fill={isDark ? '#fde68a' : '#92400e'} fontSize="8.8">• Hipoksi + hiperkapni → HPV (PVR ↑)</text>
          <text x="458" y="67" fill={isDark ? '#fde68a' : '#92400e'} fontSize="8.8">• Obstrüktif çaba (Müller) → Negatif</text>
          <text x="466" y="79" fill={isDark ? '#fde68a' : '#92400e'} fontSize="8.8">intratorasik basınç → LV ard yük ↑</text>
          <text x="458" y="96" fill={isDark ? '#fde68a' : '#92400e'} fontSize="8.8">• Kronik sempatik deşarj → HT, AF</text>
          <rect x="458" y="114" width="180" height="64" rx="6" fill="#f59e0b" fillOpacity="0.16" />
          <text x="466" y="130" fill="#fbbf24" fontSize="8.8" fontWeight="bold">Anestezi Sonucu:</text>
          <text x="466" y="144" fill={isDark ? '#fef3c7' : '#78350f'} fontSize="8.5">→ İndüksiyonda ağır RV yetmezliği</text>
          <text x="466" y="157" fill={isDark ? '#fef3c7' : '#78350f'} fontSize="8.5">→ Postop AF, MINS ve pulmoner ödem</text>
          <text x="466" y="170" fill={isDark ? '#fef3c7' : '#78350f'} fontSize="8.5">→ Negatif basınçlı akciğer ödemi!</text>

          {/* Box 4: REM Rebound (Postop Day 3-5) */}
          <rect x="662" y="14" width="204" height="177" rx="10" fill={isDark ? '#1e1628' : '#faf5ff'} stroke="#a855f7" strokeWidth="1.3" />
          <text x="674" y="34" fill="#c084fc" fontSize="10" fontWeight="bold">4. POSTOP "REM REBOUND"</text>
          <text x="674" y="53" fill={isDark ? '#e9d5ff' : '#581c87'} fontSize="8.8">• Cerrahi + opioidler ilk 1–2 gece</text>
          <text x="682" y="65" fill={isDark ? '#e9d5ff' : '#581c87'} fontSize="8.8">REM uykusunu baskılar</text>
          <text x="674" y="82" fill={isDark ? '#e9d5ff' : '#581c87'} fontSize="8.8">• Postop 3–5. gecede yoğun REM</text>
          <text x="682" y="94" fill={isDark ? '#e9d5ff' : '#581c87'} fontSize="8.8">rebound → derin faringeal atoni!</text>
          <rect x="674" y="114" width="180" height="64" rx="6" fill="#a855f7" fillOpacity="0.16" />
          <text x="682" y="130" fill="#d8b4fe" fontSize="8.8" fontWeight="bold">Anestezi Sonucu:</text>
          <text x="682" y="144" fill={isDark ? '#f3e8ff' : '#581c87'} fontSize="8.5">→ Risk yalnızca PACU’da bitmez!</text>
          <text x="682" y="157" fill={isDark ? '#f3e8ff' : '#581c87'} fontSize="8.5">→ 3–5. gecede serviste sessiz hipoksi</text>
          <text x="682" y="170" fill={isDark ? '#f3e8ff' : '#581c87'} fontSize="8.5">→ Gece CPAP/BiPAP devamı hayati!</text>
        </svg>

        {/* Key Pathophysiology Pearls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className={subCardClass}>
            <div className="font-bold text-rose-500 mb-1 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>Neden "Sadece Nazal O₂ Vermek" Tehlikeli Bir Tuzaktır?</span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Ek oksijen, pulse oksimetreyi %96–99 bandında tutarak gelişen <strong>opioid ilişkili hipoventilasyonu ve hiperkapniyi maskeler</strong>.
              Özellikle OHS hastasında yüksek FiO₂, hipoksik vazokonstriksiyonu bozarak ölü boşluğu artırır (Haldane etkisi + V/Q bozulması) ve
              hasta ağrısız-sakin uyuyor sanılırken <strong>PaCO₂ 70–90 mmHg’ye çıkıp solunum arresti</strong> gelişebilir.
            </p>
          </div>
          <div className={subCardClass}>
            <div className="font-bold text-sky-500 mb-1 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5" />
              <span>Rezidüel Nöromüsküler Blokaj (RNMB) ile Sinerjik Çöküş</span>
            </div>
            <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Faringeal dilatör kaslar diyaframdan çok daha hassastır; TOFR 0.70–0.85 düzeyindeki hafif bir rezidüel blokaj bile normal bir hastada
              tolere edilebilirken, OSAS/OHS hastasında <strong>ani tam üst hava yolu obstrüksiyonuna ve negatif basınçlı pulmoner ödeme (NPPE)</strong> neden olur.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: PERİOPERATİF REHBER ÖNERİLERİ (ASA & SASM & ATS)             */}
      {/* ===================================================================== */}
      <section className={cardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            4
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Perioperatif Rehber Önerileri (ASA · SASM · ATS)
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Preoperatif Optimizasyon &amp; Erteleme Kriterleri, İntraoperatif Hava Yolu / Analjezi ve Postoperatif İzlem Protokolü
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Phase A: Preoperative */}
          <div className={`${subCardClass} border-t-4 border-t-indigo-500 space-y-2.5`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">A. Preoperatif Faz</span>
              <span className="text-[10px] font-mono text-slate-400">SASM 2016</span>
            </div>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Rutin Tarama:</strong> Tüm cerrahi hastalara STOP-BANG uygulanmalı; VKİ ≥ 30 ve STOP-BANG ≥ 3 ise <strong>venöz HCO₃⁻</strong> (≥ 27 mEq/L?) ve oda havası SpO₂ bakılmalıdır.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Kompanse OSAS’ta Erteleme YOK:</strong> Kontrolsüz komorbiditesi olmayan şüpheli/tanılı OSAS hastasında yalnızca uyku testi (PSG) için elektif cerrahi ertelenmez.</span>
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Erteleme / İleri Tetkik Endikasyonları:</strong> Şüpheli/tedavisiz <strong>OHS</strong> (PaCO₂ ≥ 45), <strong>pulmoner HT / sağ kalp yetmezliği</strong>, dinlenme hipoksemisi veya kontrolsüz kardiyak hastalık!</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>PAP Cihazı Uyumu:</strong> Tanılı hastalar kendi CPAP/BiPAP cihaz ve maskelerini ameliyat günü hastaneye getirmelidir.</span>
              </li>
            </ul>
          </div>

          {/* Phase B: Intraoperative */}
          <div className={`${subCardClass} border-t-4 border-t-emerald-500 space-y-2.5`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wide">B. İntraoperatif Faz</span>
              <span className="text-[10px] font-mono text-slate-400">SASM 2018 · ASA</span>
            </div>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Rejyonel Anestezi Önceliği:</strong> Mümkünse lokal, periferik sinir bloğu veya nöraksiyel anestezi tercih edin (sedasyonu hafif tutun; sedasyonda <strong>EtCO₂ zorunlu!</strong>).</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Pozisyon &amp; Preoksijenasyon:</strong> <strong>Ramped / HELP</strong> (kulak tragus–sternum hizası), baş yukarı, <strong>CPAP/PEEP 5–10 cmH₂O</strong> ile preoksijenasyon ve videolaringoskopi hazırlığı.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Opioid-Sparing &amp; Kısa Etkili Ajanlar:</strong> <strong>Benzodiazepinlerden KAÇIN!</strong> Multimodal analjezi (parasetamol, NSAİİ, ketamin, deksmedetomidin, lidokain, rejyonel bloklar) kullanın.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Güvenli Ekstübasyon:</strong> <strong>Kantitatif TOF ≥ 0.90</strong> doğrulayın (sugammadeks öncelikli), <strong>tam uyanık</strong> ve <strong>yarı oturur (30–45°)</strong> pozisyonda ekstübe edin.</span>
              </li>
            </ul>
          </div>

          {/* Phase C: Postoperative */}
          <div className={`${subCardClass} border-t-4 border-t-amber-500 space-y-2.5`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wide">C. Postoperatif Faz</span>
              <span className="text-[10px] font-mono text-slate-400">ASA · ATS</span>
            </div>
            <ul className={`space-y-2 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Erken PAP Başlatma:</strong> Hastanın CPAP/BiPAP cihazı PACU’da erken dönemde takılmalı; OHS’de <strong>BiPAP</strong> (IPAP/EPAP) ile hiperkapni önlenmelidir.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Oksijen Titrasyonu &amp; Kapnografi:</strong> OHS’de aşırı O₂’den kaçının (hedef <strong>SpO₂ %88–92</strong>); sistemik/nöraksiyel opioid alanlarda sürekli <strong>SpO₂ + EtCO₂ + sedasyon skoru</strong> izleyin.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>PCA &amp; Sedatif Yasağı:</strong> IV PCA kullanılacaksa <strong>bazal (arka plan) infüzyon KONULMAZ!</strong> Eşzamanlı benzodiazepin/gabapentinoid-opioid kombinasyonundan kaçının.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>PACU Çıkış &amp; Günübirlik Kuralı:</strong> Supin yatırmayın (yan/30–45°). PACU’da tekrarlayan apne/bradispne/SpO₂ &lt; %90 veya opioid-sedasyon uyumsuzluğu olanlar monitörize yatakta izlenir (postop 3–5. gün REM rebound uyarısı!).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* High-Yield PACU Red Flags Box */}
        <div
          className={`rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isDark ? 'bg-rose-950/25 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
          }`}
        >
          <div className="flex items-start gap-2.5 text-xs">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div className={isDark ? 'text-slate-200' : 'text-slate-800'}>
              <strong className="text-rose-500">PACU “Recurrent Respiratory Events” (Tekrarlayan Solunum Olayı) Kriterleri:</strong>{' '}
              30 dk’lık 2 ayrı periyotta <strong>apne ≥ 10 sn</strong>, <strong>bradispne &lt; 8/dk</strong>, <strong>SpO₂ &lt; %90</strong> veya{' '}
              <strong>ağrı-sedasyon uyumsuzluğu</strong> (şiddetli ağrıya rağmen derin sedasyon) gelişirse hasta yüksek postop arrest riskindedir →{' '}
              <strong>Oda havasında en az 3 saat ek izlem + gece boyu sürekli monitörizasyon / PAP!</strong>
            </div>
          </div>
        </div>

        {/* Footer References */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-1">
          <div
            className={`lg:col-span-6 rounded-xl border p-3 flex items-start gap-2 text-xs ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <div>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>Klinik Özet Kuralı:</strong>{' '}
              STOP-BANG yüksek riskli her obez hastada <strong>“Bu hasta izole OSAS mı yoksa OHS mi?”</strong> sorusunu{' '}
              <strong>Serum HCO₃⁻ (≥ 27)</strong> ve <strong>uyanık SpO₂ (&lt; %94)</strong> ile yanıtlayın.
            </div>
          </div>
          <div
            className={`lg:col-span-6 rounded-xl border p-3 flex items-start gap-2 text-[11px] ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-500 dark:text-slate-300">Kaynaklar:</span> Chung F. et al. (Anesthesiology 2008; Chest 2016),
              ASA Practice Guidelines for OSA (2014), SASM Guidelines (Anesth Analg 2016 &amp; 2018), ATS OHS Guideline (2019), ICSD-3.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StopBangCalculator;
