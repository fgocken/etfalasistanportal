import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  Calculator,
  CheckCircle2,
  Compass,
  ExternalLink,
  Info,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface GastricUsgPerlasInfographicProps {
  isDark: boolean;
}

type QualitativeFinding = 'grade0' | 'grade1' | 'grade2' | 'solid';
type MeasureMode = 'diameters' | 'csa';
type CaseUrgency = 'elective' | 'urgent';

const PERLAS_REFERENCE_CARDS = [
  {
    grade: 'Perlas Grade 0',
    tag: 'Boş Antrum',
    risk: 'Çok Düşük Risk',
    supine: 'Boş (Yassı / Bull’s eye)',
    rld: 'Boş (Sıvı / katı yok)',
    expectedVolume: '~ 0 mL/kg (Bazal)',
    sonographicLook: 'Anterior ve posterior mide duvarları birbirine değmiş görünür ("Hedef tahtası / Bull’s eye" veya yassı görünüm).',
    tone: 'emerald' as const
  },
  {
    grade: 'Perlas Grade 1',
    tag: 'RLD’de Berrak Sıvı',
    risk: 'CSA Ölçümü Gerekir (~%75 ≤ 1.5 mL/kg)',
    supine: 'Boş',
    rld: 'Berrak (anekoik) sıvı görülür',
    expectedVolume: '~%75’inde ≤ 1.5 mL/kg (~%25’inde > 1.5 mL/kg)',
    sonographicLook: 'Supinde boş olan antrum, RLD’de yerçekimiyle dolup anekoik/hipoekoik berrak sıvı gösterir. Yeni içilmiş küçük hava kabarcıklı berrak sıvıda "yıldızlı gece (starry night)" görünümü izlenebilir (Van de Putte & Perlas, BJA 2014).',
    tone: 'sky' as const
  },
  {
    grade: 'Perlas Grade 2',
    tag: 'Yüksek Volüm Berrak Sıvı',
    risk: 'Yüksek Aspirasyon Riski (> 1.5 mL/kg)',
    supine: 'Berrak sıvı görülür',
    rld: 'Genişlemiş antrumda bol berrak sıvı',
    expectedVolume: 'Genellikle > 1.5 mL/kg (>100–120 mL)',
    sonographicLook: 'Hem supinde hem RLD pozisyonunda yuvarlak, gergin, ince duvarlı ve anekoik (veya yeni içildiyse "starry night" kabarcıklı) berrak sıvı ile dolu antrum izlenir.',
    tone: 'rose' as const
  },
  {
    grade: 'Katı / Partiküllü İçerik',
    tag: 'Volüm Ölçülmeden Dolu Mide',
    risk: 'KRİTİK YÜKSEK RİSK',
    supine: 'Ekojenik / Heterojen içerik',
    rld: 'Ekojenik / "Buzlu Cam" görünüm',
    expectedVolume: 'Hesaplama yapılmaz — Dolu Mide!',
    sonographicLook: 'Erken katı gıdada hava-gıda karışımıyla arka akustik gölgelenme veren "buzlu cam (frosted-glass)" artefaktı; geç/yarı-sindirilmiş katı gıdada heterojen, orta-yüksek ekojeniteli partiküllü içerik görülür ("starry night" katı gıda değil, yeni içilmiş berrak sıvı bulgusudur).',
    tone: 'amber' as const
  }
];

export const GastricUsgPerlasInfographic: React.FC<GastricUsgPerlasInfographicProps> = ({ isDark }) => {
  const [age, setAge] = useState<string>('45');
  const [weight, setWeight] = useState<string>('70');
  const [urgency, setUrgency] = useState<CaseUrgency>('elective');
  const [finding, setFinding] = useState<QualitativeFinding>('grade1');
  const [measureMode, setMeasureMode] = useState<MeasureMode>('diameters');
  const [apDiameterCm, setApDiameterCm] = useState<string>('2.4');
  const [ccDiameterCm, setCcDiameterCm] = useState<string>('3.2');
  const [directCsaCm2, setDirectCsaCm2] = useState<string>('6.0');

  // Optional clinical risk modifiers
  const [hasGlp1, setHasGlp1] = useState<boolean>(false);
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(false);
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [isObese, setIsObese] = useState<boolean>(false);

  const parsedAge = parseFloat(age);
  const hasValidAge = !Number.isNaN(parsedAge) && parsedAge > 0;
  const ageYears = hasValidAge ? Math.min(95, parsedAge) : 45;
  const isPediatric = hasValidAge && parsedAge < 18;
  const ageMonths = Math.round(ageYears * 12);

  const parsedWeight = parseFloat(weight);
  const weightNum = !Number.isNaN(parsedWeight) && parsedWeight > 0
    ? Math.min(250, Math.max(3, parsedWeight))
    : isPediatric
      ? 20
      : 70;

  const apNum = Math.max(0, parseFloat(apDiameterCm) || 0);
  const ccNum = Math.max(0, parseFloat(ccDiameterCm) || 0);
  const safeDirectCsa = Math.max(0, parseFloat(directCsaCm2) || 0);

  const computedCsa =
    measureMode === 'diameters'
      ? +((Math.PI * apNum * ccNum) / 4).toFixed(2)
      : +safeDirectCsa.toFixed(2);

  // Adult (>=18y): Perlas 2013 Non-Pregnant RLD Model: GV (mL) = 27.0 + 14.6 * RLD_CSA - 1.28 * Age(y)
  // Pediatric (<18y): Spencer 2015 Pediatric RLD Model (PMID 25312066): GV (mL) = -7.8 + 3.5 * RLD_CSA + 0.127 * Age(mo)
  const rawGastricVolumeMl =
    finding === 'grade0'
      ? 0
      : isPediatric
        ? Math.max(0, Math.round(-7.8 + 3.5 * computedCsa + 0.127 * ageMonths))
        : Math.max(0, Math.round(27.0 + 14.6 * computedCsa - 1.28 * ageYears));

  const volumePerKg = +(rawGastricVolumeMl / weightNum).toFixed(2);

  // Consistent > 1.5 mL/kg cutoff (Van de Putte & Perlas 2014) + Arzola Obstetric RLD CSA > 9.6 cm2 cutoff
  const isHighVolumeCutoff = volumePerKg > 1.5;
  const isPregnantHighCsa = isPregnant && (finding === 'grade1' || finding === 'grade2') && computedCsa > 9.6;
  const isGrade2Discordant = finding === 'grade2' && !isHighVolumeCutoff && !isPregnantHighCsa;

  const isHighRisk =
    finding === 'solid' ||
    finding === 'grade2' ||
    isPregnantHighCsa ||
    (finding === 'grade1' && isHighVolumeCutoff);

  const hasModifiers = hasGlp1 || hasDiabetes || isPregnant || isObese;

  const resetCalculator = () => {
    setAge('45');
    setWeight('70');
    setUrgency('elective');
    setFinding('grade1');
    setMeasureMode('diameters');
    setApDiameterCm('2.4');
    setCcDiameterCm('3.2');
    setDirectCsaCm2('6.0');
    setHasGlp1(false);
    setHasDiabetes(false);
    setIsPregnant(false);
    setIsObese(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark
          ? 'bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border-emerald-500/30'
          : 'bg-gradient-to-r from-emerald-50 via-white to-slate-50 border-emerald-200 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            BAŞUCU POCUS · ASPİRASYON KARAR DESTEĞİ
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Perlas 0–2 Evrelemesi &amp; Kantitatif RLD Antral Volüm Modeli
          </span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Gastrik Ultrasonografi (GUS) &amp; Perlas 0–2 Aktif Karar Destek Uygulaması
        </h3>

        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Açlık durumu belirsiz, GLP-1 reseptör agonisti kullanan, diyabetik gastroparezili, gebe veya acil hastalarda yatak başı mide ultrasonu ile <strong>Perlas Grade 0–2</strong> evrelemesi, <strong>Antral Kesit Alanı (CSA)</strong> ölçümü ve <strong>1.5 mL/kg</strong> aspirasyon risk eşiğini anlık hesaplayarak indüksiyon kararını belirleyin.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2">
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/24950550/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Van de Putte &amp; Perlas (BJA 2014 · PMID: 24950550)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/23011564/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>Perlas Volüm Modeli (Anesth Analg 2013 · PMID: 23011564)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. AKTİF KARAR DESTEK HESAPLAYICISI */}
      <div className={`p-5 rounded-2xl border space-y-5 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-emerald-500" />
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                1. Aktif Gastrik USG &amp; Perlas Karar Destek Uygulaması
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Hasta verilerini ve ultrasonografik bulguları girerek anlık havayolu/indüksiyon önerisini alın.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetCalculator}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer self-start sm:self-auto ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Dön</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-7 space-y-4">
            {/* Patient Age, Weight, Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Hasta Yaşı (1–95 yıl)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="95"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                    className={`w-full px-3 py-2 text-xs font-mono tabular-nums font-bold rounded-xl border ${
                      isPediatric
                        ? isDark ? 'bg-amber-950/30 border-amber-500 text-white' : 'bg-amber-50 border-amber-400 text-slate-900'
                        : isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3 top-2 text-[11px] text-slate-400 font-mono">yıl</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Hasta Kilosu (kg)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="3"
                    max="220"
                    value={weight}
                    onChange={e => setWeight(e.target.value)}
                    className={`w-full px-3 py-2 text-xs font-mono tabular-nums font-bold rounded-xl border ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3 top-2 text-[11px] text-slate-400 font-mono">kg</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Cerrahi Aciliyet
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setUrgency('elective')}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      urgency === 'elective'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Elektif
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('urgent')}
                    className={`py-2 px-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                      urgency === 'urgent'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Acil / İvedi
                  </button>
                </div>
              </div>
            </div>

            {isPediatric && (
              <div className={`p-3 rounded-xl border text-[11px] flex items-start gap-2 ${
                isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  <strong>Pediatrik Mod Aktif — Spencer 2015 (PMID: 25312066):</strong> 18 yaş altında erişkin Perlas denklemi kullanılmaz! Otomatik olarak pediatrik RLD modeli (<code>GV = −7.8 + 3.5 × CSA + 0.127 × Yaş(ay)</code>; {ageMonths} ay) uygulanmaktadır.
                </div>
              </div>
            )}

            {/* Qualitative Finding Selector (Perlas 0-2 & Solid) */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Adım 1 — Kalitatif Antrum Görünümü (Supin + Sağ Lateral Dekübit [RLD])
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'grade0' as QualitativeFinding, title: 'Perlas Grade 0', sub: 'Hem supin hem RLD’de boş antrum' },
                  { id: 'grade1' as QualitativeFinding, title: 'Perlas Grade 1', sub: 'Supinde boş, sadece RLD’de berrak sıvı' },
                  { id: 'grade2' as QualitativeFinding, title: 'Perlas Grade 2', sub: 'Hem supin hem RLD’de berrak sıvı' },
                  { id: 'solid' as QualitativeFinding, title: 'Katı / Partiküllü İçerik', sub: 'Herhangi bir pozisyonda katı / buzlu cam' }
                ].map(opt => {
                  const selected = finding === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFinding(opt.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? opt.id === 'grade2' || opt.id === 'solid'
                            ? 'bg-rose-600 text-white border-rose-500'
                            : 'bg-emerald-600 text-white border-emerald-500'
                          : isDark
                            ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{opt.title}</div>
                      <div className={`text-[11px] mt-0.5 ${selected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                        {opt.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantitative CSA Measurement Inputs (shown for Grade 1 / Grade 2) */}
            {(finding === 'grade1' || finding === 'grade2') && (
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Adım 2 — RLD Antral Kesit Alanı (CSA) Ölçümü
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setMeasureMode('diameters')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                        measureMode === 'diameters'
                          ? 'bg-sky-600 text-white border-sky-500'
                          : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      D1 × D2 Çap Gir
                    </button>
                    <button
                      type="button"
                      onClick={() => setMeasureMode('csa')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border cursor-pointer ${
                        measureMode === 'csa'
                          ? 'bg-sky-600 text-white border-sky-500'
                          : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      Doğrudan CSA Gir
                    </button>
                  </div>
                </div>

                {measureMode === 'diameters' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        AP Çap — D1 (cm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="15"
                        value={apDiameterCm}
                        onChange={e => setApDiameterCm(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs font-mono tabular-nums font-bold rounded-lg border ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        CC Çap — D2 (cm)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="15"
                        value={ccDiameterCm}
                        onChange={e => setCcDiameterCm(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs font-mono tabular-nums font-bold rounded-lg border ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div className={`p-2 rounded-lg border text-center ${
                      isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                    }`}>
                      <div className="text-[10px] font-mono text-slate-400">RLD CSA = (π×D1×D2)/4</div>
                      <div className="text-sm font-mono tabular-nums font-black text-sky-600 dark:text-sky-400">
                        {computedCsa} cm²
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        Cihazla Ölçülen RLD CSA (cm²)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="40"
                        value={directCsaCm2}
                        onChange={e => setDirectCsaCm2(e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs font-mono tabular-nums font-bold rounded-lg border ${
                          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      <strong>Peristaltik kontraksiyonlar arasında (istirahatte)</strong>, serozadan serozaya (dış duvar dahil) free-trace ile RLD pozisyonunda ölçülen antral alan.
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Risk Modifiers */}
            <div className="space-y-1.5">
              <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-300">
                Ek Gecikmiş Mide Boşalması / Özel Popülasyon Etkenleri (Opsiyonel):
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'GLP-1 Agonisti', active: hasGlp1, toggle: () => setHasGlp1(v => !v) },
                  { label: 'Diyabetik Gastroparezi', active: hasDiabetes, toggle: () => setHasDiabetes(v => !v) },
                  { label: 'Gebelik (>20 hf)', active: isPregnant, toggle: () => setIsPregnant(v => !v) },
                  { label: 'BMI > 35–40 kg/m²', active: isObese, toggle: () => setIsObese(v => !v) }
                ].map(mod => (
                  <button
                    key={mod.label}
                    type="button"
                    onClick={mod.toggle}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold cursor-pointer transition-all ${
                      mod.active
                        ? 'bg-purple-600 text-white border-purple-500'
                        : isDark ? 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Clinical Decision Output */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className={`p-5 rounded-2xl border h-full flex flex-col justify-between space-y-4 ${
              isHighRisk
                ? isDark ? 'bg-rose-950/25 border-rose-500/45' : 'bg-rose-50 border-rose-300'
                : isDark ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-emerald-50 border-emerald-300'
            }`}>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={`text-[10px] font-mono uppercase font-black px-2.5 py-0.5 rounded ${
                      isHighRisk ? 'bg-rose-600 text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      {isHighRisk ? 'YÜKSEK ASPİRASYON RİSKİ' : 'DÜŞÜK ASPİRASYON RİSKİ'}
                    </span>
                    {isPediatric && (
                      <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-amber-500 text-white">
                        Pediatrik · Spencer 2015
                      </span>
                    )}
                    {isPregnant && (
                      <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                        isPregnantHighCsa ? 'bg-purple-600 text-white' : 'bg-purple-500/20 text-purple-700 dark:text-purple-300'
                      }`}>
                        Obstetrik · Arzola
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                    {finding === 'solid' ? 'Katı İçerik' : finding.toUpperCase()}
                  </span>
                </div>

                {/* Quantitative Volume Readout */}
                {finding !== 'solid' ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className={`p-3 rounded-xl border ${
                        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                      }`}>
                        <div className="text-[10px] font-mono text-slate-400">
                          {isPediatric ? 'Tahmini Volüm (Spencer)' : 'Tahmini Mide Volümü'}
                        </div>
                        <div className="text-lg font-mono tabular-nums font-black text-slate-900 dark:text-white">
                          {rawGastricVolumeMl} mL
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl border ${
                        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                      }`}>
                        <div className="text-[10px] font-mono text-slate-400">Kilo Başına (Eşik &gt;1.5)</div>
                        <div className={`text-lg font-mono tabular-nums font-black ${
                          isHighVolumeCutoff ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {volumePerKg} mL/kg
                        </div>
                      </div>
                    </div>

                    {isPregnant && (finding === 'grade1' || finding === 'grade2') && (
                      <div className={`p-2.5 rounded-xl border text-[11px] flex items-center justify-between gap-2 font-mono tabular-nums ${
                        isPregnantHighCsa
                          ? isDark ? 'bg-purple-950/40 border-purple-500/60 text-purple-200' : 'bg-purple-100 border-purple-400 text-purple-950'
                          : isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}>
                        <span>Obstetrik RLD CSA (Arzola Eşiği &gt; 9.6 cm²):</span>
                        <strong className={isPregnantHighCsa ? 'text-rose-600 dark:text-rose-300' : 'text-emerald-600 dark:text-emerald-400'}>
                          {computedCsa} cm² {isPregnantHighCsa ? '(AŞILDI!)' : '(≤ 9.6)'}
                        </strong>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`p-3 rounded-xl border text-xs font-bold text-rose-700 dark:text-rose-300 ${
                    isDark ? 'bg-slate-950/70 border-rose-500/40' : 'bg-white border-rose-300'
                  }`}>
                    Katı / partiküllü içerikte volüm hesaplaması yapılmaz — mide otomatik olarak DOLU kabul edilir!
                  </div>
                )}

                {/* Primary Clinical Recommendation */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    {isHighRisk ? (
                      <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {finding === 'solid'
                          ? urgency === 'elective'
                            ? 'Elektif Cerrahiyi Ertele / İptal Et — Katı Gıda Kalıntısı'
                            : 'Acil Vaka: Kesin RSI + Videolaringoskop + Kaflı ETT!'
                          : isPregnantHighCsa
                            ? urgency === 'elective'
                              ? 'Obstetrik Yüksek Risk (RLD CSA > 9.6 cm²): Elektif Vakayı Ertele / Rejyonel Önceliklendir'
                              : 'Obstetrik Acil Vaka (RLD CSA > 9.6 cm²): Dolu Mide — Rejyonel veya RSI!'
                            : isGrade2Discordant
                              ? urgency === 'elective'
                                ? 'Perlas Grade 2 (Kalitatif Yüksek Risk): Ölçümü Yeniden Doğrula / Ertele'
                                : 'Acil Vaka (Perlas Grade 2): Ölçümü Doğrula & RSI ile Güvenceye Al'
                              : isHighRisk
                                ? urgency === 'elective'
                                  ? 'Dolu Mide (> 1.5 mL/kg): Elektif Vakayı Ertele'
                                  : 'Acil Vaka: Hızlı Seri Entübasyon (RSI) + NGT Değerlendir'
                                : 'Boş / Bazal Mide (≤ 1.5 mL/kg): Standart İndüksiyon Uygun'}
                      </div>
                      <p className="text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed">
                        {finding === 'solid'
                          ? urgency === 'elective'
                            ? 'Katı partiküllü içerik en yüksek pnömoni/asfiksi riskini taşır. Açlık süresi dolsa dahi (ör. GLP-1, gastroparezi) elektif vaka ertelenir ve 6–8 saat sonra GUS tekrarlanır.'
                            : 'Aktif regürjitasyon riski nedeniyle %100 O₂ preoksijenasyon + NODESAT 15 L/dk eşliğinde Rokuronyum 1.2 mg/kg (obezitede IBW) veya Süksinilkolin 1.5 mg/kg ile RSI ve kaflı ETT uygulayın.'
                          : isPregnantHighCsa
                            ? `Gebelikte (>20 hf) Arzola obstetrik RLD kesit alanı eşiği (CSA > 9.6 cm²; mevcut: ${computedCsa} cm²) aşılmıştır! Gebe dışı Perlas formülü ≤ 1.5 mL/kg hesaplasada hasta YÜKSEK ASPİRASYON RİSKİ (dolu mide) kabul edilir. Mümkünse rejyonel anestezi veya elektif erteleme; genel anestezi zorunluysa kaflı ETT ile RSI ve 0.3 M sodyum sitrat uygulanır.`
                            : isGrade2Discordant
                              ? `Kalitatif Perlas Grade 2 (hem supin hem RLD’de berrak sıvı) yüksek aspirasyon riski ile ilişkilidir; hesaplanan hacim (${volumePerKg} mL/kg ≤ 1.5 mL/kg) düşük görünüyorsa RLD pozisyonunda antrum ölçümünü (peristaltik kontraksiyonlar arasında istirahatte, abdominal aorta düzleminde) yeniden doğrulayın. Uyumsuzluk sürerse dolu mide kabul edin.`
                              : isHighRisk
                                ? urgency === 'elective'
                                  ? `Hesaplanan berrak sıvı hacmi (${volumePerKg} mL/kg) bazal sekresyon eşiğini (> 1.5 mL/kg) aşmaktadır. Mümkünse 2–4 saat bekleyip GUS’u tekrarlayın; ertelenemiyorsa derin sedasyondan/SAD’dan kaçınıp RSI ile kaflı ETT uygulayın.`
                                  : `Yüksek volümlü berrak sıvı (${volumePerKg} mL/kg > 1.5 mL/kg) mevcuttur. Supraglottik cihaz (LMA) yerine kaflı ETT ile RSI uygulanmalı; indüksiyon öncesi nazogastrik dekompresyon düşünülmelidir.`
                                : `Perlas Grade 0 veya düşük volümlü (${volumePerKg} mL/kg ≤ 1.5 mL/kg) Grade 1 bulgusu normal açlık fizyolojisi ile uyumludur; ek risk faktörü yoksa standart anestezi ve havayolu planı güvenle uygulanabilir.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Population Caveats Footer */}
              <div className={`p-3 rounded-xl border text-[11px] space-y-1 ${
                isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
              }`}>
                <div className="font-mono text-[10px] text-slate-400">
                  {isPediatric
                    ? `Spencer 2015 (Pediatrik): GV = −7.8 + 3.5 × CSA_RLD + 0.127 × Yaş(${ageMonths} ay) · PMID: 25312066`
                    : 'Perlas 2013 (Erişkin): GV = 27.0 + 14.6 × CSA_RLD − 1.28 × Yaş(yıl) · Eşik: > 1.5 mL/kg'}
                </div>
                {hasModifiers && (
                  <div className="text-amber-700 dark:text-amber-300 font-medium leading-snug">
                    {isPregnant && '• Gebelik (>20 hf): Karar motorunda Arzola obstetrik RLD eşiği (CSA > 9.6 cm²) aktif olarak değerlendirilmektedir; gebe dışı Perlas volüm denklemi gebelikte tek başına belirleyici değildir. '}
                    {isObese && '• BMI > 35–40 kg/m²: Derin penetrasyon (2–3 MHz) gerekir ve formül yüksek BMI’da hafif sapma gösterebilir. '}
                    {(hasGlp1 || hasDiabetes) && '• GLP-1 RA / Diyabet (Multisociety 2024): Özellikle doz eskalasyon fazı veya aktif Gİ semptomu varsa 24 saat sıvı diyete karşın fundus/korpus retansiyonu olabileceğinden belirsizlikte RSI/erteleme değerlendirilir.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Perlas 0-2 Sonografik Evreleme Kartları */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-800">
          <Activity className="w-4 h-4 text-sky-500" />
          <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            2. Perlas 0–2 Evrelemesi ve Sonografik Tanı Kriterleri
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          {PERLAS_REFERENCE_CARDS.map(card => (
            <div
              key={card.grade}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                card.tone === 'emerald'
                  ? isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
                  : card.tone === 'sky'
                    ? isDark ? 'bg-sky-950/20 border-sky-500/30' : 'bg-sky-50/70 border-sky-200'
                    : card.tone === 'rose'
                      ? isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
                      : isDark ? 'bg-amber-950/20 border-amber-500/35' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-slate-900 dark:text-white">{card.grade}</span>
                  <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">{card.tag}</span>
                </div>
                <div className="text-[11px] space-y-1 text-slate-700 dark:text-slate-300">
                  <div><strong>Supin:</strong> {card.supine}</div>
                  <div><strong>RLD:</strong> {card.rld}</div>
                  <div className="font-mono tabular-nums"><strong>Volüm:</strong> {card.expectedVolume}</div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed pt-1 border-t border-black/10 dark:border-white/10">
                  {card.sonographicLook}
                </p>
              </div>
              <div className={`text-[11px] font-bold pt-1 ${
                card.tone === 'emerald'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : card.tone === 'sky'
                    ? 'text-sky-600 dark:text-sky-400'
                    : card.tone === 'rose'
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-amber-600 dark:text-amber-400'
              }`}>
                {card.risk}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Yatak Başı Teknik Protokol, I-AIM & Kritik Tuzaklar */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-800">
          <Compass className="w-4 h-4 text-indigo-500" />
          <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
            3. I-AIM Protokolü, Anatomik Landmarklar &amp; Kritik Tuzaklar
          </h4>
        </div>

        {/* Spelled-out I-AIM Framework Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-[11px]">
          <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-indigo-950/25 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'}`}>
            <strong>I — Indication (Endikasyon):</strong> Belirsiz açlık, GLP-1 RA, gastroparezi, acil/travma, gebelik.
          </div>
          <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-sky-950/25 border-sky-500/30 text-sky-200' : 'bg-sky-50/70 border-sky-200 text-sky-950'}`}>
            <strong>A — Acquisition (Görüntüleme):</strong> Supin + RLD tarama, Abdominal Aorta düzlemi, istirahatte ölçüm.
          </div>
          <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-emerald-950/25 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'}`}>
            <strong>I — Interpretation (Yorumlama):</strong> Boş vs berrak sıvı (Perlas 0–2 + CSA) vs katı içerik ayrımı.
          </div>
          <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-rose-950/25 border-rose-500/30 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950'}`}>
            <strong>M — Medical Decision-Making:</strong> Standart indüksiyon vs erteleme vs RSI / NGT / rejyonel.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          <div className={`p-4 rounded-xl border space-y-1.5 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-indigo-500" />
              <span>Prob &amp; Pencere Ayarı</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Erişkinde <strong>düşük frekanslı konveks prob (2–5 MHz)</strong> kullanılır (zayıf/pediatrikte yüksek frekanslı lineer prob). Prob epigastriuma <strong>sagital / parasagital</strong> yerleştirilir; işaretçi kraniyale bakar.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-500" />
              <span>Standart Anatomik Landmarklar</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Antrum; anterior-süperiorda <strong>Karaciğer Sol Lobu</strong>, posteriorda <strong>Pankreas başı</strong> ve derin arka planda <strong>Abdominal Aorta / Superior Mezenterik Arter (SMA)</strong> hizasında (IVC düzleminde DEĞİL!) yuvarlak/oval yapı olarak tanımlanır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Neden Sağ Lateral Dekübit (RLD)?</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Supin pozisyonda mide sıvısı yerçekimiyle fundusta toplanıp antrumu boş gösterebilir. <strong>RLD pozisyonunda</strong> içerik antruma akar; hem kalitatif tarama duyarlılığı hem de Perlas/Spencer volüm denklemleri yalnızca RLD’de doğrulanmıştır.
            </p>
          </div>
        </div>

        {/* Critical Pitfalls & Contraindications */}
        <div className={`p-4 rounded-xl border space-y-2.5 ${
          isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-xs text-rose-700 dark:text-rose-300">
            <AlertOctagon className="w-4 h-4 shrink-0" />
            <span>Kritik Tuzaklar &amp; Ölçüm Kuralları (Yanlış Negatif / Geçersiz Model Riskleri)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px] text-slate-700 dark:text-slate-300">
            <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
              <strong>1. Geçirilmiş Mide Cerrahisi:</strong> Sleeve gastrektomi, RYGB veya Nissen fundoplikasyonda anatomi değişmiştir; <strong>matematiksel volüm modelleri GEÇERSİZDİR</strong> (yalnızca kalitatif bakı + klinik ihtiyat).
            </div>
            <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
              <strong>2. Büyük Hiatal Herni:</strong> Mide içeriği toraksa fıtıklaşabileceğinden epigastrik antrum boş görünerek <strong>yanlış negatif</strong> sonuç verebilir.
            </div>
            <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
              <strong>3. Peristaltizm Arası Ölçüm:</strong> Antral CSA mutlaka <strong>peristaltik kontraksiyonlar arasında (istirahatte)</strong> ve serozadan serozaya ölçülmelidir; kontraksiyon anı hacmi yapay olarak düşürür.
            </div>
            <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
              <strong>4. Aorta vs IVC Düzlemi:</strong> Ölçüm <strong>IVC değil, Abdominal Aorta düzleminde</strong> yapılmalıdır; sağa (IVC’ye) kaymak pilor/duodenum veya yanlış kesit ölçümüne neden olur.
            </div>
          </div>
        </div>
      </div>

      {/* 5. Kaynaklar */}
      <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Kaynaklar (Güncel Kılavuzlar &amp; Literatür)</span>
        </div>
        <p>1. Van de Putte P, Perlas A. <em>Ultrasound assessment of gastric content and volume.</em> British Journal of Anaesthesia. 2014;113(1):12-22. PMID: 24950550.</p>
        <p>2. Perlas A, Mitsakakis N, Liu L, et al. <em>Validation of a mathematical model for ultrasound assessment of gastric volume by gastroscopic examination.</em> Anesthesia &amp; Analgesia. 2013;116(2):357-363. PMID: 23011564.</p>
        <p>3. Spencer AO, Walker AM, Yeung AK, et al. <em>Ultrasound assessment of gastric volume in the fasted pediatric patient undergoing upper gastrointestinal endoscopy: development of a predictive model using endoscopically suctioned volumes.</em> Paediatr Anaesth. 2015;25(3):301-308. PMID: 25312066.</p>
        <p>4. Arzola C, Perlas A, Siddiqui NT, Downey K, Ye XY, Carvalho JCA. <em>Gastric ultrasound in the third trimester of pregnancy: a randomised controlled trial to develop a predictive model of volume assessment.</em> Anaesthesia. 2018;73(3):295-303. PMID: 29210064.</p>
        <p>5. Perlas A, Van de Putte P, Van Houwe P, Chan VW. <em>I-AIM framework for point-of-care gastric ultrasound.</em> British Journal of Anaesthesia. 2016;116(1):7-11. PMID: 26675946.</p>
        <p>6. Joshi GP, Abdelmalak BB, Weigel WA, et al. <em>2023 ASA Practice Guidelines for Preoperative Fasting.</em> Anesthesiology. 2023;138(2):132-151. PMID: 36629465.</p>
        <p>7. Kindel TL, Wang AY, Wadhwa A, et al. (ASA, AGA, ASMBS, SAGES, ISPCOP). <em>Multisociety Clinical Practice Guidance for the Safe Use of GLP-1 Receptor Agonists in the Perioperative Period.</em> Anesthesiology. 2024;141(6):1208-1209. PMID: 39471342.</p>
      </div>
    </div>
  );
};

export default GastricUsgPerlasInfographic;
