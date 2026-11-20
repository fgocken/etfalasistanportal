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
    ? 'rounded-2xl border border-slate-800 bg-slate-900/75 p-5 sm:p-6 space-y-5'
    : 'rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5 shadow-xs';

  const subCardClass = isDark
    ? 'rounded-xl border border-slate-800 bg-slate-950/60 p-4'
    : 'rounded-xl border border-slate-200 bg-slate-50/75 p-4';

  return (
    <div className="space-y-6">
      {/* ===================================================================== */}
      {/* BÖLÜM 1: EN BAŞTA — STOP-BANG HESAPLAYICI & RİSK YORUMLAMASI          */}
      {/* ===================================================================== */}
      <section className={cardClass}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-500 flex items-center justify-center font-mono text-sm font-bold shrink-0">
              1
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  STOP-BANG Hesaplayıcı &amp; İki Aşamalı (2-Step) Risk Analizi
                </h3>
                <span
                  className={`text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                    isDark
                      ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}
                >
                  Chung 2016 · SASM
                </span>
              </div>
              <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                8 soruluk OSAS tarama ölçeği + 2-Step özgüllük yükseltmesi + Serum HCO₃⁻ / SpO₂ ile OHS taraması
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetAll}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold border transition-colors cursor-pointer self-start sm:self-auto ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Sıfırla</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left 7 Cols: 8 STOP-BANG Interactive Questions */}
          <div className="lg:col-span-7 space-y-3.5">
            {/* STOP & BANG Interactive Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STOP_BANG_QUESTIONS.map((q) => {
                const checked = answers[q.key];
                const isStop = q.group === 'STOP';
                return (
                  <button
                    key={q.key}
                    type="button"
                    onClick={() => toggleAnswer(q.key)}
                    className={`group text-left rounded-xl border p-3.5 transition-all cursor-pointer select-none ${
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
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-8 h-8 rounded-lg font-mono font-bold text-base flex items-center justify-center shrink-0 border ${
                            checked
                              ? isStop
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : 'bg-amber-500 text-white border-amber-400'
                              : isDark
                                ? 'bg-slate-900 text-slate-200 border-slate-700'
                                : 'bg-white text-slate-800 border-slate-200'
                          }`}
                        >
                          {q.letter}
                        </span>
                        <div>
                          <div className={`text-sm font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {q.trTitle}
                          </div>
                          <span className="text-xs font-mono text-slate-400">{q.group}</span>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded border shrink-0 ${
                          checked
                            ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/40'
                            : isDark
                              ? 'bg-slate-900 text-slate-400 border-slate-800'
                              : 'bg-white text-slate-500 border-slate-200'
                        }`}
                      >
                        {checked ? 'EVET (+1)' : 'HAYIR'}
                      </span>
                    </div>
                    <p className={`text-xs sm:text-[13px] mt-2.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {q.detail}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Optional BMI + OHS Screening Helper Strip */}
            <div className={`${subCardClass} space-y-3`}>
              <div className="text-xs sm:text-sm font-bold flex flex-wrap items-center justify-between gap-2">
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                  Opsiyonel Hızlı VKİ &amp; OHS Tarama Parametreleri (Serum HCO₃⁻ &amp; Uyanık SpO₂)
                </span>
                {computedBmi !== null && (
                  <button
                    type="button"
                    onClick={applyBmiToForm}
                    className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
                  >
                    VKİ {computedBmi.toFixed(1)} → B’ye Uygula
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Kilo (kg)</label>
                  <input
                    type="number"
                    placeholder="ör. 112"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Boy (cm)</label>
                  <input
                    type="number"
                    placeholder="ör. 170"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm font-mono ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Venöz HCO₃⁻ (mEq/L)</label>
                  <input
                    type="number"
                    placeholder="Eşik ≥ 27"
                    value={serumHco3}
                    onChange={(e) => setSerumHco3(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm font-mono ${
                      hasHighHco3
                        ? 'bg-rose-500/10 border-rose-500 text-rose-500 font-bold'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Uyanık Oda SpO₂ (%)</label>
                  <input
                    type="number"
                    placeholder="Eşik < 94"
                    value={awakeSpo2}
                    onChange={(e) => setAwakeSpo2(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg border text-sm font-mono ${
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
          <div className="lg:col-span-5 space-y-3.5">
            {/* Score Hero Card */}
            <div
              className={`rounded-2xl border p-4 sm:p-5 space-y-3.5 ${
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
                  <div className="text-xs font-mono uppercase tracking-wider font-bold text-slate-400">
                    STOP-BANG Toplam Skoru
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className={`text-4xl font-mono font-black tabular-nums ${
                        riskLevel === 'high'
                          ? 'text-rose-500'
                          : riskLevel === 'intermediate'
                            ? 'text-amber-500'
                            : 'text-emerald-500'
                      }`}
                    >
                      {totalScore}
                    </span>
                    <span className="text-base font-mono text-slate-400">/ 8 Puan</span>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`inline-block px-3.5 py-1.5 rounded-lg text-sm font-bold uppercase border ${
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
                  <div className="text-xs font-mono text-slate-400 mt-1.5">
                    STOP: {stopScore}/4 · BANG: {bangScore}/4
                  </div>
                </div>
              </div>

              {/* Visual 8-Step Meter Bar */}
              <div className="grid grid-cols-8 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => {
                  const filled = step <= totalScore;
                  const segColor =
                    step <= 2 ? 'bg-emerald-500' : step <= 4 ? 'bg-amber-500' : 'bg-rose-500';
                  return (
                    <div
                      key={step}
                      className={`h-2.5 rounded-sm transition-all ${
                        filled ? segColor : isDark ? 'bg-slate-800' : 'bg-slate-200'
                      }`}
                    />
                  );
                })}
              </div>

              {/* 2-Step Upgrade Explanation Badge */}
              {hasTwoStepUpgrade && (
                <div className="rounded-lg bg-rose-500/15 border border-rose-500/40 px-3 py-2.5 text-xs sm:text-sm text-rose-600 dark:text-rose-200 font-semibold leading-relaxed">
                  <strong>2-Step Yükseltme Aktif:</strong> Skor 3–4 olmasına rağmen <strong>STOP ≥ 2</strong> ve{' '}
                  <strong>{[answers.G && 'Erkek', answers.B && 'VKİ > 35', answers.N && 'Boyun > 40 cm'].filter(Boolean).join(' + ')}</strong>{' '}
                  bulunduğu için hasta <strong>Yüksek Risk</strong> sınıfına alınır (Chung 2016).
                </div>
              )}

              {/* Probability Readouts */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className={`rounded-lg border p-2.5 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Orta–Ağır OSAS (AHI ≥ 15)</div>
                  <div className="text-sm font-mono font-bold mt-1 text-indigo-500">{modSevereProb}</div>
                </div>
                <div className={`rounded-lg border p-2.5 ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/90 border-slate-200'}`}>
                  <div className="text-xs text-slate-400">Ağır OSAS (AHI ≥ 30)</div>
                  <div className="text-sm font-mono font-bold mt-1 text-rose-500">{severeProb}</div>
                </div>
              </div>
            </div>

            {/* OHS Red-Flag Banner (Dynamic) */}
            {ohsSuspected ? (
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'bg-rose-950/50 border-rose-500 text-rose-100' : 'bg-rose-100/80 border-rose-400 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-bold text-rose-500">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>OHS (Obezite Hipoventilasyon Sendromu) Kırmızı Bayrağı!</span>
                </div>
                <p className="text-sm leading-relaxed">
                  {hasHighHco3 && <>Serum <strong>HCO₃⁻ ≥ 27 mEq/L</strong> kronik respiratuvar asidozun renal kompansasyonunu gösterir. </>}
                  {hasLowAwakeSpo2 && <>Uyanık oda havasında <strong>SpO₂ &lt; %94</strong> gündüz hipoksemisi/hipoventilasyonunu işaret eder. </>}
                  <strong>Aksiyon:</strong> Elektif cerrahi öncesi <strong>Arter Kan Gazı (PaCO₂ ≥ 45?)</strong>, EKO (Pulmoner HT / RV) ve göğüs hastalıkları / perioperatif BiPAP optimizasyonu değerlendirilmelidir!
                </p>
              </div>
            ) : (
              <div className={`${subCardClass} space-y-2`}>
                <div className="text-sm font-bold flex items-center gap-1.5 text-indigo-500">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Klinik Karar &amp; Yorum Özeti</span>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  {riskLevel === 'low'
                    ? 'Düşük Risk (0–2): Orta-ağır OSAS olasılığı düşüktür (%90+ negatif öngörü değeri). Standart perioperatif anestezi yönetimi uygundur.'
                    : riskLevel === 'intermediate'
                      ? 'Orta Risk (3–4): Özgüllüğü artırmak için 2-Step kriterlerine (Erkek, VKİ>35, Boyun>40) ve venöz serum HCO₃⁻ (≥28 mmol/L) değerine bakın. Opioid-sparing anestezi ve yakın PACU izlemi önerilir.'
                      : 'Yüksek Risk (≥5 veya 2-Step Yüksek): Tanısız orta-ağır OSAS varsayın! SASM kılavuzuna göre kompanse hastada cerrahi tek başına ertelenmez; ancak zor havayolu, opioid-sparing rejim, TOFR ≥ 0.90, baş-yukarı ekstübasyon ve yakın postop izlem zorunludur. VKİ ≥ 30 ise HCO₃⁻ ile OHS dışlayın!'}
                </p>
              </div>
            )}

            {/* Official 2-Step Rule Summary Box */}
            <div className={subCardClass}>
              <div className="font-bold text-slate-400 uppercase tracking-wider text-xs mb-2">
                Resmi Sınıflama Kuralları (Chung 2016)
              </div>
              <ul className={`space-y-1.5 text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
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
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-500 flex items-center justify-center font-mono text-sm font-bold shrink-0">
            2
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              OSAS ve OHS: Tanım ve Tanı Kriterleri
            </h3>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Obstrüktif Uyku Apne Sendromu (ICSD-3 / AHI) ile Obezite Hipoventilasyon Sendromunun (ATS 2019) Kesin Ayrımı
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* OSAS Card */}
          <div className={`${subCardClass} border-l-4 border-l-sky-500 space-y-3.5`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-sky-500 shrink-0" />
                <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  OSAS (Obstrüktif Uyku Apne Sendromu)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-sky-500 shrink-0">PSG · AHI</span>
            </div>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Uyku sırasında devam eden solunum çabasına rağmen üst hava yolunun tekrarlayan tam (<strong>apne</strong>: ≥ 10 sn ≥ %90 akım kesilmesi)
              veya kısmi (<strong>hipopne</strong>: ≥ 10 sn ≥ %30 akım azalması + ≥ %3–4 desatürasyon veya mikro-uyanma) kollapsıyla karakterize sendromdur.
            </p>

            {/* ICSD-3 Criteria */}
            <div className={`rounded-lg p-3.5 border text-sm space-y-1.5 leading-relaxed ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="font-bold text-sky-500 text-xs uppercase tracking-wide">ICSD-3 Tanı Kriteri (Polisomnografi):</div>
              <div className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                • <strong>AHI ≥ 15 /saat</strong> (semptom olmasa dahi tanı koydurur) <strong>VEYA</strong>
              </div>
              <div className={isDark ? 'text-slate-200' : 'text-slate-700'}>
                • <strong>AHI ≥ 5 /saat</strong> + gündüz uykululuk, tanıklı apne, boğulma hissi veya HT/KAH/AF/Tip 2 DM/inme varlığı.
              </div>
            </div>

            {/* AHI Severity Scale */}
            <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5">
                <div className="text-xs text-emerald-500 font-bold">HAFİF</div>
                <div className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>AHI 5–14</div>
              </div>
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2.5">
                <div className="text-xs text-amber-500 font-bold">ORTA</div>
                <div className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>AHI 15–29</div>
              </div>
              <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5">
                <div className="text-xs text-rose-500 font-bold">AĞIR</div>
                <div className={`text-sm font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>AHI ≥ 30</div>
              </div>
            </div>
          </div>

          {/* OHS Card */}
          <div className={`${subCardClass} border-l-4 border-l-rose-500 space-y-3.5`}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  OHS (Obezite Hipoventilasyon Sendromu)
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-rose-500 shrink-0">ATS 2019 · 3 Kriter</span>
            </div>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              İzole OSAS’tan farklı olarak yalnızca uykuda değil, <strong>gündüz uyanıkken de kronik alveoler hipoventilasyon (hiperkapni)</strong> bulunan
              ve çok daha yüksek perioperatif solunum/kardiyopulmoner mortalite taşıyan sendromdur (<em>Pickwickian Sendromu</em>).
            </p>

            {/* ATS 2019 3 Mandatory Criteria */}
            <div className={`rounded-lg p-3.5 border text-sm space-y-2 leading-relaxed ${isDark ? 'bg-rose-950/25 border-rose-500/30' : 'bg-rose-50/70 border-rose-200'}`}>
              <div className="font-bold text-rose-500 text-xs uppercase tracking-wide">Kesin Tanı İçin 3 Kriterin TAMAMI Gerekir:</div>
              <div className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                <strong>1. Obezite:</strong> VKİ <strong>≥ 30 kg/m²</strong>
              </div>
              <div className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                <strong>2. Gündüz Uyanık Hiperkapni:</strong> Deniz seviyesinde AKG’de <strong>PaCO₂ ≥ 45 mmHg</strong> (ve renal kompansasyonla venöz <strong>HCO₃⁻ ≥ 27 mEq/L</strong>)
              </div>
              <div className={isDark ? 'text-slate-100' : 'text-slate-800'}>
                <strong>3. Dışlama:</strong> Hipoventilasyonu açıklayacak başka neden olmaması (ağır KOAH, kifoskolyoz, nöromüsküler hastalık, hipotiroidi, ilaç).
              </div>
            </div>

            <div className={`text-sm font-medium leading-relaxed ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
              ★ OHS hastalarının <strong>~%90’ında eşlik eden OSAS</strong> vardır; %10’unda ise uykuda non-obstrüktif hipoventilasyon görülür.
            </div>
          </div>
        </div>

        {/* Comparison Table: OSAS vs OHS */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                <th className="text-left p-3 font-bold rounded-tl-lg">Klinik Parametre</th>
                <th className="text-left p-3 font-bold text-sky-500">İzole OSAS</th>
                <th className="text-left p-3 font-bold text-rose-500 rounded-tr-lg">OHS (Obezite Hipoventilasyon)</th>
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
                  <td className={`p-3 font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{row.param}</td>
                  <td className={`p-3 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{row.osas}</td>
                  <td className={`p-3 font-medium leading-relaxed ${isDark ? 'text-rose-200' : 'text-rose-800'}`}>{row.ohs}</td>
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
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center font-mono text-sm font-bold shrink-0">
            3
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Patofizyoloji: Perioperatif Yönetimi Neden Kritik Şekilde Etkiler?
            </h3>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Faringeal Kollaps (Pcrit), Opioid Hiperduyarlılığı, Kemoreseptör Küntleşmesi, Pulmoner HT ve Postop REM Rebound
            </p>
          </div>
        </div>

        {/* 2×2 High-Readability Pathophysiology Grid: 1 & 2 on top row, 3 & 4 on bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Airway Collapse & FRC */}
          <div
            className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 ${
              isDark
                ? 'bg-slate-950/75 border-sky-500/45'
                : 'bg-sky-50/45 border-sky-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-500 font-mono text-sm font-black flex items-center justify-center shrink-0">
                  1
                </span>
                <h4 className={`text-base font-extrabold tracking-tight ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                  FARİNGEAL KOLLAPS &amp; FRC ↓
                </h4>
              </div>
              <ul className={`space-y-2 text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                <li>• Parafaringeal yağ birikimi ve yapısal olarak dar üst hava yolu lümeni</li>
                <li>• Anestezikler, benzodiazepinler ve opioidler <strong>genioglossus / faringeal dilatör tonusunu</strong> siler → kritik kapanma basıncı (<strong>Pcrit</strong>) yükselir!</li>
                <li>• Obezitede <strong>FRC (fonksiyonel rezidüel kapasite)</strong> ciddi azalır → oksijen deposu minimaldir</li>
              </ul>
            </div>
            <div
              className={`rounded-xl border p-3.5 space-y-1.5 ${
                isDark
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-100'
                  : 'bg-sky-100/70 border-sky-300 text-sky-950'
              }`}
            >
              <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-sky-300' : 'text-sky-700'}`}>
                Anestezi Sonucu
              </div>
              <ul className="space-y-1 text-sm leading-snug">
                <li>→ Zor maske ventilasyonu &amp; zor entübasyon (<strong>3–4×</strong> risk artışı)</li>
                <li>→ İndüksiyon apnesinde saniyeler içinde hızlı desatürasyon</li>
                <li>→ Ekstübasyon sonrası üst hava yolu obstrüksiyonu ve laringospazm</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Opioid Hypersensitivity & CO2 Narcosis */}
          <div
            className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 ${
              isDark
                ? 'bg-rose-950/30 border-rose-500/45'
                : 'bg-rose-50/60 border-rose-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-500 font-mono text-sm font-black flex items-center justify-center shrink-0">
                  2
                </span>
                <h4 className={`text-base font-extrabold tracking-tight ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                  OPİOİD DUYARLILIĞI &amp; CO₂ NARKOZU
                </h4>
              </div>
              <ul className={`space-y-2 text-sm leading-relaxed ${isDark ? 'text-rose-100' : 'text-rose-950'}`}>
                <li>• Kronik aralıklı hipoksi → <strong>μ-opioid reseptör up-regülasyonu</strong> (çok düşük dozda derin solunum depresyonu ve apne!)</li>
                <li>• OHS’de santral kemoreseptörlerin <strong>CO₂ duyarlılığı küntleşir</strong>; solunum dürtüsü büyük ölçüde hipoksik uyarana kayar!</li>
                <li>• Yüksek akımlı ek O₂, hipoksik dürtüyü baskılar ve Haldane etkisiyle PaCO₂’yi hızla yükseltir</li>
              </ul>
            </div>
            <div
              className={`rounded-xl border p-3.5 space-y-1.5 ${
                isDark
                  ? 'bg-rose-500/15 border-rose-500/35 text-rose-100'
                  : 'bg-rose-100/80 border-rose-300 text-rose-950'
              }`}
            >
              <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-rose-300' : 'text-rose-700'}`}>
                Anestezi Sonucu
              </div>
              <ul className="space-y-1 text-sm leading-snug">
                <li>→ Standart opioid dozlarında ani derin apne ve sedasyon</li>
                <li>→ Aşırı O₂ + Haldane etkisi → <strong>hiperkapnik CO₂ narkozu</strong></li>
                <li>→ Nazal O₂ altında SpO₂ %98 görünürken gizli hipoventilasyon ve arrest!</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Cardiopulmonary & PHT / RV */}
          <div
            className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 ${
              isDark
                ? 'bg-amber-950/25 border-amber-500/45'
                : 'bg-amber-50/60 border-amber-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-500 font-mono text-sm font-black flex items-center justify-center shrink-0">
                  3
                </span>
                <h4 className={`text-base font-extrabold tracking-tight ${isDark ? 'text-amber-300' : 'text-amber-900'}`}>
                  KARDİYOVASKÜLER ETKİ &amp; PULMONER HT / RV
                </h4>
              </div>
              <ul className={`space-y-2 text-sm leading-relaxed ${isDark ? 'text-amber-100' : 'text-amber-950'}`}>
                <li>• Tekrarlayan hipoksi + hiperkapni → <strong>hipoksik pulmoner vazokonstriksiyon (HPV)</strong> → PVR ↑ ve Pulmoner HT</li>
                <li>• Tıkalı hava yoluna karşı derin inspirasyon çabası (<strong>Müller manevrası</strong>) → şiddetli negatif intratorasik basınç → LV ard yükü ↑</li>
                <li>• Kronik sempatik sinir sistemi aktivasyonu → dirençli HT, taşiaritmi ve AF</li>
              </ul>
            </div>
            <div
              className={`rounded-xl border p-3.5 space-y-1.5 ${
                isDark
                  ? 'bg-amber-500/15 border-amber-500/35 text-amber-100'
                  : 'bg-amber-100/80 border-amber-300 text-amber-950'
              }`}
            >
              <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-amber-300' : 'text-amber-800'}`}>
                Anestezi Sonucu
              </div>
              <ul className="space-y-1 text-sm leading-snug">
                <li>→ İndüksiyonda sistemik vazodilatasyon + PVR artışı → <strong>ağır RV yetmezliği</strong></li>
                <li>→ Postoperatif atriyal fibrilasyon, miyokardiyal hasar (MINS) ve iskemi</li>
                <li>→ Obstrüksiyon anında <strong>negatif basınçlı akciğer ödemi (NPPE)</strong>!</li>
              </ul>
            </div>
          </div>

          {/* Card 4: REM Rebound (Postop Day 3-5) */}
          <div
            className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 ${
              isDark
                ? 'bg-purple-950/25 border-purple-500/45'
                : 'bg-purple-50/60 border-purple-300'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/40 text-purple-400 font-mono text-sm font-black flex items-center justify-center shrink-0">
                  4
                </span>
                <h4 className={`text-base font-extrabold tracking-tight ${isDark ? 'text-purple-300' : 'text-purple-900'}`}>
                  POSTOP “REM REBOUND” (3–5. GECE)
                </h4>
              </div>
              <ul className={`space-y-2 text-sm leading-relaxed ${isDark ? 'text-purple-100' : 'text-purple-950'}`}>
                <li>• Cerrahi stres, genel anestezikler ve opioidler ameliyat sonrası <strong>ilk 1–2 gecede</strong> REM uykusunu baskılar</li>
                <li>• Postoperatif <strong>3–5. gecelerde</strong> telafi amaçlı yoğun <strong>REM uykusu geri tepmesi (REM rebound)</strong> yaşanır</li>
                <li>• REM evresi, faringeal kaslarda <strong>en derin fizyolojik atoninin</strong> ve en uzun apne epizodlarının görüldüğü dönemdir</li>
              </ul>
            </div>
            <div
              className={`rounded-xl border p-3.5 space-y-1.5 ${
                isDark
                  ? 'bg-purple-500/15 border-purple-500/35 text-purple-100'
                  : 'bg-purple-100/80 border-purple-300 text-purple-950'
              }`}
            >
              <div className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-purple-300' : 'text-purple-800'}`}>
                Anestezi Sonucu
              </div>
              <ul className="space-y-1 text-sm leading-snug">
                <li>→ Perioperatif solunum riski <strong>yalnızca PACU’da bitmez!</strong></li>
                <li>→ Postop 3–5. gecede yataklı serviste sessiz ağır hipoksi ve ani ölüm riski</li>
                <li>→ Gece <strong>CPAP/BiPAP cihazının kesintisiz sürdürülmesi</strong> hayati önem taşır!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Pathophysiology Pearls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={subCardClass}>
            <div className="text-sm font-bold text-rose-500 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 shrink-0" />
              <span>Neden “Sadece Nazal O₂ Vermek” Tehlikeli Bir Tuzaktır?</span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              Ek oksijen, pulse oksimetreyi %96–99 bandında tutarak gelişen <strong>opioid ilişkili hipoventilasyonu ve hiperkapniyi maskeler</strong>.
              Özellikle OHS hastasında yüksek FiO₂, hipoksik vazokonstriksiyonu bozarak ölü boşluğu artırır (Haldane etkisi + V/Q bozulması) ve
              hasta ağrısız-sakin uyuyor sanılırken <strong>PaCO₂ 70–90 mmHg’ye çıkıp solunum arresti</strong> gelişebilir.
            </p>
          </div>
          <div className={subCardClass}>
            <div className="text-sm font-bold text-sky-500 mb-2 flex items-center gap-2">
              <Wind className="w-4 h-4 shrink-0" />
              <span>Rezidüel Nöromüsküler Blokaj (RNMB) ile Sinerjik Çöküş</span>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
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
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-mono text-sm font-bold shrink-0">
            4
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Perioperatif Rehber Önerileri (ASA · SASM · ATS)
            </h3>
            <p className={`text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Preoperatif Optimizasyon &amp; Erteleme Kriterleri, İntraoperatif Hava Yolu / Analjezi ve Postoperatif İzlem Protokolü
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Phase A: Preoperative */}
          <div className={`${subCardClass} border-t-4 border-t-indigo-500 space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-indigo-500 uppercase tracking-wide">A. Preoperatif Faz</span>
              <span className="text-xs font-mono text-slate-400">SASM 2016</span>
            </div>
            <ul className={`space-y-2.5 text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Rutin Tarama:</strong> Tüm cerrahi hastalara STOP-BANG uygulanmalı; VKİ ≥ 30 ve STOP-BANG ≥ 3 ise <strong>venöz HCO₃⁻</strong> (≥ 27 mEq/L?) ve oda havası SpO₂ bakılmalıdır.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Kompanse OSAS’ta Erteleme YOK:</strong> Kontrolsüz komorbiditesi olmayan şüpheli/tanılı OSAS hastasında yalnızca uyku testi (PSG) için elektif cerrahi ertelenmez.</span>
              </li>
              <li className="flex gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Erteleme / İleri Tetkik Endikasyonları:</strong> Şüpheli/tedavisiz <strong>OHS</strong> (PaCO₂ ≥ 45), <strong>pulmoner HT / sağ kalp yetmezliği</strong>, dinlenme hipoksemisi veya kontrolsüz kardiyak hastalık!</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>PAP Cihazı Uyumu:</strong> Tanılı hastalar kendi CPAP/BiPAP cihaz ve maskelerini ameliyat günü hastaneye getirmelidir.</span>
              </li>
            </ul>
          </div>

          {/* Phase B: Intraoperative */}
          <div className={`${subCardClass} border-t-4 border-t-emerald-500 space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-500 uppercase tracking-wide">B. İntraoperatif Faz</span>
              <span className="text-xs font-mono text-slate-400">SASM 2018 · ASA</span>
            </div>
            <ul className={`space-y-2.5 text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Rejyonel Anestezi Önceliği:</strong> Mümkünse lokal, periferik sinir bloğu veya nöraksiyel anestezi tercih edin (sedasyonu hafif tutun; sedasyonda <strong>EtCO₂ zorunlu!</strong>).</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Pozisyon &amp; Preoksijenasyon:</strong> <strong>Ramped / HELP</strong> (kulak tragus–sternum hizası), baş yukarı, <strong>CPAP/PEEP 5–10 cmH₂O</strong> ile preoksijenasyon ve videolaringoskopi hazırlığı.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Opioid-Sparing &amp; Kısa Etkili Ajanlar:</strong> <strong>Benzodiazepinlerden KAÇIN!</strong> Multimodal analjezi (parasetamol, NSAİİ, ketamin, deksmedetomidin, lidokain, rejyonel bloklar) kullanın.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Güvenli Ekstübasyon:</strong> <strong>Kantitatif TOF ≥ 0.90</strong> doğrulayın (sugammadeks öncelikli), <strong>tam uyanık</strong> ve <strong>yarı oturur (30–45°)</strong> pozisyonda ekstübe edin.</span>
              </li>
            </ul>
          </div>

          {/* Phase C: Postoperative */}
          <div className={`${subCardClass} border-t-4 border-t-amber-500 space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-amber-500 uppercase tracking-wide">C. Postoperatif Faz</span>
              <span className="text-xs font-mono text-slate-400">ASA · ATS</span>
            </div>
            <ul className={`space-y-2.5 text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Erken PAP Başlatma:</strong> Hastanın CPAP/BiPAP cihazı PACU’da erken dönemde takılmalı; OHS’de <strong>BiPAP</strong> (IPAP/EPAP) ile hiperkapni önlenmelidir.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Oksijen Titrasyonu &amp; Kapnografi:</strong> OHS’de aşırı O₂’den kaçının (hedef <strong>SpO₂ %88–92</strong>); sistemik/nöraksiyel opioid alanlarda sürekli <strong>SpO₂ + EtCO₂ + sedasyon skoru</strong> izleyin.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>PCA &amp; Sedatif Yasağı:</strong> IV PCA kullanılacaksa <strong>bazal (arka plan) infüzyon KONULMAZ!</strong> Eşzamanlı benzodiazepin/gabapentinoid-opioid kombinasyonundan kaçının.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>PACU Çıkış &amp; Günübirlik Kuralı:</strong> Supin yatırmayın (yan/30–45°). PACU’da tekrarlayan apne/bradispne/SpO₂ &lt; %90 veya opioid-sedasyon uyumsuzluğu olanlar monitörize yatakta izlenir (postop 3–5. gün REM rebound uyarısı!).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* High-Yield PACU Red Flags Box */}
        <div
          className={`rounded-xl border p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isDark ? 'bg-rose-950/25 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
          }`}
        >
          <div className="flex items-start gap-3 text-sm leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className={isDark ? 'text-slate-100' : 'text-slate-800'}>
              <strong className="text-rose-500">PACU “Recurrent Respiratory Events” (Tekrarlayan Solunum Olayı) Kriterleri:</strong>{' '}
              30 dk’lık 2 ayrı periyotta <strong>apne ≥ 10 sn</strong>, <strong>bradispne &lt; 8/dk</strong>, <strong>SpO₂ &lt; %90</strong> veya{' '}
              <strong>ağrı-sedasyon uyumsuzluğu</strong> (şiddetli ağrıya rağmen derin sedasyon) gelişirse hasta yüksek postop arrest riskindedir →{' '}
              <strong>Oda havasında en az 3 saat ek izlem + gece boyu sürekli monitörizasyon / PAP!</strong>
            </div>
          </div>
        </div>

        {/* Footer References */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 pt-1">
          <div
            className={`lg:col-span-6 rounded-xl border p-3.5 flex items-start gap-2.5 text-sm leading-relaxed ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Stethoscope className="w-4 h-4 text-indigo-500 shrink-0 mt-1" />
            <div>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>Klinik Özet Kuralı:</strong>{' '}
              STOP-BANG yüksek riskli her obez hastada <strong>“Bu hasta izole OSAS mı yoksa OHS mi?”</strong> sorusunu{' '}
              <strong>Serum HCO₃⁻ (≥ 27)</strong> ve <strong>uyanık SpO₂ (&lt; %94)</strong> ile yanıtlayın.
            </div>
          </div>
          <div
            className={`lg:col-span-6 rounded-xl border p-3.5 flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
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
