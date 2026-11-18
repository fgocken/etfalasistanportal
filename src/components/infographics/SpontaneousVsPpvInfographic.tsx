import React, { useState } from 'react';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BookOpen,
  Heart,
  Info,
  ShieldAlert,
  Sliders,
  Wind
} from 'lucide-react';

interface SpontaneousVsPpvInfographicProps {
  isDark: boolean;
}

type VentMode = 'spontaneous' | 'ppv';
type BreathPhase = 'inspiration' | 'expiration';
type PeepLevel = 'normal' | 'high';
type ClinicalScenarioId = 'hypovolemia' | 'lv-failure' | 'rv-failure' | 'tamponade';

interface ScenarioSpec {
  id: ClinicalScenarioId;
  title: string;
  subtitle: string;
  ppvEffect: string;
  mechanism: string;
  action: string;
  tone: 'rose' | 'emerald' | 'amber';
}

const CLINICAL_SCENARIOS: ScenarioSpec[] = [
  {
    id: 'hypovolemia',
    title: 'Hipovolemi / Kanama / Sepsis',
    subtitle: 'Düşük Ortalama Sistemik Dolum Basıncı (MSFP)',
    ppvEffect: 'Ani & Derin Hipotansiyon',
    mechanism:
      'İntravasküler hacim azaldığında MSFP düşüktür. PBV + PEEP ile sağ atriyum basıncı (PRA) yükselince venöz dönüş gradienti (MSFP − PRA) hızla sıfıra yaklaşır ve atım hacmi (SV) çöker.',
    action:
      'İndüksiyonda agresif PEEP ve yüksek tepe basıncından kaçının; eşzamanlı kristaloid/kan resüsitasyonu ve gerekirse vazopresör (Noradrenalin / Efedrin) uygulayın. PPV > %13 sıvı yanıtlılığını gösterir.',
    tone: 'rose'
  },
  {
    id: 'lv-failure',
    title: 'Akut LV Yetmezliği / Akciğer Ödemi',
    subtitle: 'Yüksek Preload & Yüksek Afterload (HFrEF)',
    ppvEffect: 'Hemodinamik & Oksijenasyon İyileşmesi',
    mechanism:
      'Pozitif intratorasik basınç (CPAP/PBV) fazla venöz dönüşü azaltarak konjesyonu hafifletir VE LV çevresindeki plevral basıncı artırarak LV transmural afterload’unu (PLV − Ppl) belirgin düşürür.',
    action:
      'Akut kardiyojenik ödemde erken NIV/CPAP veya düşük-orta PEEP (5–10 cmH₂O) ile PBV, kalp debisini artırır. Buna karşılık derin spontan inspirasyon eforu (negatif Ppl) LV afterload’u artırarak ödemi ağırlaştırır.',
    tone: 'emerald'
  },
  {
    id: 'rv-failure',
    title: 'Akut RV Yetmezliği / Masif PE / PHT',
    subtitle: 'Afterload’a Aşırı Duyarlı Sağ Ventrikül',
    ppvEffect: 'RV Dilatasyonu & Şok Riski',
    mechanism:
      'Yüksek Vt ve yüksek PEEP alveoler kapillerleri sıkıştırarak Pulmoner Vasküler Direnci (PVR) fırlatır. RV afterload artar, RV dilate olur ve interventriküler septumu sola iterek LV dolumunu bozar.',
    action:
      'Düşük tidal hacim (6 mL/kg IBW), düşük plato basıncı (< 27–30 cmH₂O) ve minimal/ılımlı PEEP (≤ 5–8 cmH₂O) kullanın; hipoksi ve hiperkapni (HPV ile PVR’yi daha da artıran faktörler) önlenmelidir.',
    tone: 'amber'
  },
  {
    id: 'tamponade',
    title: 'Kardiyak Tamponad / Konstriksiyon',
    subtitle: 'Eşitlenmiş Yüksek İntrakardiyak Basınçlar',
    ppvEffect: 'İndüksiyonda Kardiyak Kollaps / Arrest',
    mechanism:
      'Kalp dıştan sıvı basısı altındadır; ventriküler dolum yalnızca yüksek venöz dolum gradientine ve spontan inspirasyondaki negatif intratorasik basınca bağımlıdır. PBV başladığı an venöz dönüş durabilir.',
    action:
      'Perikardiyosentez/cerrahi pencere açılana kadar mümkünse spontan solunumu koruyun (lokal/sedasyon veya ketamin); entübasyon şartsa düşük Vt, sıfır/minimal PEEP ve hazır inotrop/sıvı ile ilerleyin.',
    tone: 'rose'
  }
];

const COMPARISON_ROWS = [
  {
    param: 'Temel Mekanizma',
    spontaneous: 'Negatif Basınç Pompası (Diyafram kasılır → toraks genişler, hava emilir)',
    ppv: 'Pozitif Basınç Pompası (Ventilatör ağız/tüp ucundan basınçla havayı iter)'
  },
  {
    param: 'İnspirasyonda Alveoler Basınç (PA)',
    spontaneous: 'Subatmosferik: −1 ile −2 cmH₂O',
    ppv: 'Pozitif: +10 ile +25 cmH₂O (PEEP üzerine eklenir)'
  },
  {
    param: 'İnspirasyonda Plevral Basınç (Ppl)',
    spontaneous: 'Daha negatif: −5 → −8 cmH₂O',
    ppv: 'Pozitifleşir: −5 → +4 ile +10 cmH₂O (kompliyansa bağlı)'
  },
  {
    param: 'Gaz Dağılımı & V/Q Dengesi',
    spontaneous: 'Posterior diyafram kavisli kasılır → iyi perfüze olan bazal/posterior alanlar iyi ventile olur (Optimal V/Q)',
    ppv: 'Paralizide karın organları posterior diyaframı iter → hava anterior/apikal (non-dependent) bölgeye kaçar, posterior atelektazi & şant artar'
  },
  {
    param: 'Fizyolojik Ölü Boşluk (VD/VT)',
    spontaneous: 'Düşük / Normal (~0.30); West Zon 3 baskın',
    ppv: 'Artar (~0.40+); yüksek Paw apikal kapillerleri ezer → West Zon 1 (alveoler ölü boşluk) genişler'
  },
  {
    param: 'Sağ Atriyum Basıncı (PRA) & Venöz Dönüş',
    spontaneous: 'PRA ↓ → Venöz dönüş gradienti (MSFP − PRA) ARTAR (IVC inspirasyonda daralır)',
    ppv: 'PRA ↑ → Venöz dönüş gradienti (MSFP − PRA) AZALIR (IVC inspirasyonda genişler)'
  },
  {
    param: 'Pulmoner Vasküler Direnç (PVR) & RV Afterload',
    spontaneous: 'Normal FRC’de PVR minimum; RV afterload düşük',
    ppv: 'Yüksek Vt/PEEP alveoler kapillerleri sıkıştırır → PVR ↑ ve RV afterload ↑ (atelektaziyi açan optimal PEEP hariç)'
  },
  {
    param: 'LV Transmural Afterload (PLV − Ppl)',
    spontaneous: 'Negatif Ppl arttıkça LV transmural basıncı ARTAR (ağır obstrüksiyonda NPPE riski)',
    ppv: 'Pozitif Ppl dış destek sağlar → LV transmural afterload AZALIR (akut LV yetmezliğinde faydalı)'
  },
  {
    param: 'Dinamik Sıvı Yanıtlılığı (PPV / SVV)',
    spontaneous: 'Geçersizdir (değişken Vt ve efor nedeniyle güvenilir ölçüm vermez)',
    ppv: 'Geçerlidir (Tam kontrollü PBV, Vt ≥ 8 mL/kg ve sinüs ritminde PPV/SVV > %12–13 → sıvı yanıtlı)'
  },
  {
    param: 'Başlıca Komplikasyonlar',
    spontaneous: 'Solunum kası yorgunluğu, hipoventilasyon, obstrüksiyonda negatif basınçlı pulmoner ödem',
    ppv: 'Barotravma / Volutravma (VILI), hemodinamik instabilite, oto-PEEP, VIDD (diyafram atrofisi)'
  }
];

export const SpontaneousVsPpvInfographic: React.FC<SpontaneousVsPpvInfographicProps> = ({ isDark }) => {
  const [ventMode, setVentMode] = useState<VentMode>('ppv');
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('inspiration');
  const [peepLevel, setPeepLevel] = useState<PeepLevel>('normal');
  const [selectedScenarioId, setSelectedScenarioId] = useState<ClinicalScenarioId>('hypovolemia');

  // Canlı fizyolojik değerler
  const metrics = (() => {
    if (ventMode === 'spontaneous') {
      if (breathPhase === 'inspiration') {
        return {
          paw: '0 cmH₂O (Atmosferik)',
          pa: '−1.5 cmH₂O',
          ppl: '−8.0 cmH₂O',
          pra: '↓ Düşer (0–2 mmHg)',
          venousReturn: '↑ ARTAR (+%15–20)',
          rvAfterload: 'Normal / Düşük',
          lvAfterload: 'Hafif ↑ (negatif Ppl)',
          ivcStatus: 'İnspirasyonda Kollabe (Daralır)',
          diaphragmNote: 'Aktif kasılma — kubbe aşağı iner, posterior bazaller açılır.'
        };
      }
      return {
        paw: '0 cmH₂O',
        pa: '+1.0 cmH₂O',
        ppl: '−5.0 cmH₂O',
        pra: 'Bazal (2–4 mmHg)',
        venousReturn: 'Bazal Normal Akım',
        rvAfterload: 'Normal (FRC)',
        lvAfterload: 'Bazal',
        ivcStatus: 'Bazal Çap',
        diaphragmNote: 'Pasif elastik geri çekilme — solunum işi harcanmaz.'
      };
    }

    // PPV mode
    const isHighPeep = peepLevel === 'high';
    if (breathPhase === 'inspiration') {
      return {
        paw: isHighPeep ? '+28 cmH₂O (PEEP 14)' : '+18 cmH₂O (PEEP 5)',
        pa: isHighPeep ? '+24 cmH₂O' : '+15 cmH₂O',
        ppl: isHighPeep ? '+11 cmH₂O' : '+4.5 cmH₂O',
        pra: isHighPeep ? '↑↑ Belirgin Artar' : '↑ Artar',
        venousReturn: isHighPeep ? '↓↓ Ciddi Azalır' : '↓ Azalır',
        rvAfterload: isHighPeep ? '↑↑ PVR Belirgin Artar' : '↑ Hafif-Orta Artar',
        lvAfterload: isHighPeep ? '↓↓ Belirgin Azalır' : '↓ Hafif Azalır',
        ivcStatus: 'İnspirasyonda Genişler (Distansiyon)',
        diaphragmNote: 'Pasif aşağı itilir — gaz anterior (non-dependent) alanlara yönelir.'
      };
    }
    return {
      paw: isHighPeep ? '+14 cmH₂O (PEEP 14)' : '+5 cmH₂O (PEEP 5)',
      pa: isHighPeep ? '+14 cmH₂O' : '+5 cmH₂O',
      ppl: isHighPeep ? '+6 cmH₂O' : '−2 cmH₂O',
      pra: isHighPeep ? '↑ Sürekli Yüksek' : 'Hafif ↑',
      venousReturn: isHighPeep ? '↓ Ekspirasyonda da Baskılı' : 'Kısmen Toparlanır (dDown sonrası)',
      rvAfterload: isHighPeep ? '↑ Yüksek Kalır' : 'Bazale Yakın',
      lvAfterload: isHighPeep ? '↓ Azalmış Kalır' : 'Bazal',
      ivcStatus: isHighPeep ? 'Sürekli Geniş' : 'Normal/Hafif Geniş',
      diaphragmNote: 'Pasif ekspirasyon; uygulanan PEEP alveollerin kapanmasını engeller.'
    };
  })();

  const activeScenario =
    CLINICAL_SCENARIOS.find((s) => s.id === selectedScenarioId) || CLINICAL_SCENARIOS[0];

  const surfaceCard = isDark
    ? 'bg-slate-900 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const subCard = isDark
    ? 'bg-slate-950/80 border-slate-800 text-slate-200'
    : 'bg-slate-50 border-slate-200 text-slate-800';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="space-y-6">
      {/* ÜST BANNER */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/30 border-slate-800'
            : 'bg-gradient-to-br from-slate-50 via-white to-sky-50/70 border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="font-bold text-sky-500">Solunum Fizyolojisi &amp; Kardiyopulmoner Etkileşim</span>
              <span className={mutedText} aria-hidden="true">·</span>
              <span className={mutedText}>West · Guyton · Miller’s · Marino ICU</span>
            </div>
            <h4 className={`text-lg sm:text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Normal (Spontan) Solunum vs. Pozitif Basınçlı Ventilasyon (PBV) ve Hemodinamik Etkileri
            </h4>
            <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Negatif intratorasik basınç pompasından pozitif basınçlı ventilasyona geçişte basınç gradiyentleri, V/Q dağılımı, sağ/sol ventrikül önyük–ardyük dengesi (Guyton venöz dönüşü, PVR ve LV transmural basıncı) ve kritik hastalık senaryoları.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 shrink-0 text-xs font-mono tabular-nums">
            <div className={`px-3 py-2 rounded-xl border ${subCard}`}>
              <div className={`text-[10px] ${mutedText}`}>Spontan İnsp. Ppl</div>
              <div className="font-bold text-emerald-500">−5 → −8 cmH₂O</div>
            </div>
            <div className={`px-3 py-2 rounded-xl border ${subCard}`}>
              <div className={`text-[10px] ${mutedText}`}>PBV İnsp. Ppl</div>
              <div className="font-bold text-sky-500">−5 → +5..+10 cmH₂O</div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. İNTERAKTİF TORAKS & KALP-AKCİĞER BASINÇ SİMÜLATÖRÜ */}
      <div className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${surfaceCard}`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-sky-500 shrink-0" />
            <div>
              <h5 className="text-sm sm:text-base font-bold">
                1. İnteraktif İntratorasik Basınç &amp; Venöz Dönüş Simülatörü
              </h5>
              <p className={`text-xs ${mutedText}`}>
                Solunum tipini, solunum fazını ve PEEP düzeyini değiştirerek plevral basınç (Ppl) ile kalp-damar yanıtını gözlemleyin.
              </p>
            </div>
          </div>

          {/* Kontrol Barı */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`flex items-center gap-1 p-1 rounded-lg border ${subCard}`}>
              <button
                type="button"
                onClick={() => setVentMode('spontaneous')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  ventMode === 'spontaneous'
                    ? 'bg-emerald-600 text-white'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Spontan (Normal)
              </button>
              <button
                type="button"
                onClick={() => setVentMode('ppv')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  ventMode === 'ppv'
                    ? 'bg-sky-600 text-white'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pozitif Basınçlı (PBV)
              </button>
            </div>

            <div className={`flex items-center gap-1 p-1 rounded-lg border ${subCard}`}>
              <button
                type="button"
                onClick={() => setBreathPhase('inspiration')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  breathPhase === 'inspiration'
                    ? 'bg-indigo-600 text-white'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                İnspirasyon
              </button>
              <button
                type="button"
                onClick={() => setBreathPhase('expiration')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  breathPhase === 'expiration'
                    ? 'bg-indigo-600 text-white'
                    : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ekspirasyon
              </button>
            </div>

            {ventMode === 'ppv' && (
              <div className={`flex items-center gap-1 p-1 rounded-lg border ${subCard}`}>
                <button
                  type="button"
                  onClick={() => setPeepLevel('normal')}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    peepLevel === 'normal'
                      ? 'bg-teal-600 text-white'
                      : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  PEEP 5
                </button>
                <button
                  type="button"
                  onClick={() => setPeepLevel('high')}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    peepLevel === 'high'
                      ? 'bg-rose-600 text-white'
                      : isDark
                        ? 'text-slate-300 hover:text-white'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Yüksek PEEP (14)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sol: Anatomik Toraks & Kalp-Akciğer SVG | Sağ: Canlı Basınç & Hemodinami Telemetrisi */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-center">
          <div className="xl:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-3 sm:p-4">
            <svg
              viewBox="0 0 560 310"
              className="w-full h-auto"
              role="img"
              aria-label="Spontan solunum ve pozitif basınçlı ventilasyonda torasik basınçlar ve kalp-damar etkileşimi şeması"
            >
              {/* Başlık */}
              <text x="16" y="20" fill="#e2e8f0" fontSize="12" fontWeight="bold" fontFamily="monospace">
                {ventMode === 'spontaneous' ? 'SPONTAN SOLUNUM (Negatif Basınç)' : 'POZİTİF BASINÇLI VENTİLASYON (PBV)'} ·{' '}
                {breathPhase === 'inspiration' ? 'İNSPİRASYON' : 'EKSPİRASYON'}
              </text>

              {/* Trakea & ETT (PBV ise tüp çizilir) */}
              <rect x="268" y="34" width="24" height="58" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              {ventMode === 'ppv' && (
                <rect x="273" y="26" width="14" height="62" rx="3" fill="#0284c7" fillOpacity="0.45" stroke="#38bdf8" strokeWidth="1.4" />
              )}

              {/* Hava akım oku */}
              {breathPhase === 'inspiration' ? (
                <g>
                  <line
                    x1="280"
                    y1="26"
                    x2="280"
                    y2="82"
                    stroke={ventMode === 'spontaneous' ? '#34d399' : '#38bdf8'}
                    strokeWidth="3"
                  />
                  <polygon
                    points="273,76 287,76 280,87"
                    fill={ventMode === 'spontaneous' ? '#34d399' : '#38bdf8'}
                  />
                  <text
                    x="302"
                    y="48"
                    fill={ventMode === 'spontaneous' ? '#6ee7b7' : '#7dd3fc'}
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {ventMode === 'spontaneous' ? 'Hava emilir (PA < 0)' : `Ventilatör iter (${metrics.paw.split(' ')[0]})`}
                  </text>
                </g>
              ) : (
                <g>
                  <line x1="280" y1="84" x2="280" y2="30" stroke="#fbbf24" strokeWidth="3" />
                  <polygon points="273,36 287,36 280,25" fill="#fbbf24" />
                  <text x="302" y="48" fill="#fcd34d" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    Pasif ekspirasyon ({metrics.pa})
                  </text>
                </g>
              )}

              {/* Göğüs Kafesi / Plevral Boşluk Kutusu */}
              {(() => {
                const expanded = breathPhase === 'inspiration';
                const chestX = expanded ? 120 : 134;
                const chestW = expanded ? 320 : 292;
                const chestH = expanded ? 186 : 168;
                const isPosPpl = ventMode === 'ppv' && (breathPhase === 'inspiration' || peepLevel === 'high');
                return (
                  <g>
                    <rect
                      x={chestX}
                      y="86"
                      width={chestW}
                      height={chestH}
                      rx="26"
                      fill={isPosPpl ? '#f43f5e' : '#10b981'}
                      fillOpacity={isPosPpl ? '0.13' : '0.10'}
                      stroke={isPosPpl ? '#fb7185' : '#34d399'}
                      strokeWidth="2"
                    />

                    {/* Sol ve Sağ Akciğer Lobları */}
                    <path
                      d={`M${chestX + 26},102 Q${chestX + 12},155 ${chestX + 20},232 L${chestX + 122},232 L${chestX + 122},102 Z`}
                      fill="#0284c7"
                      fillOpacity={expanded ? '0.32' : '0.20'}
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                    />
                    <path
                      d={`M${chestX + chestW - 26},102 Q${chestX + chestW - 12},155 ${chestX + chestW - 20},232 L${chestX + chestW - 122},232 L${chestX + chestW - 122},102 Z`}
                      fill="#0284c7"
                      fillOpacity={expanded ? '0.32' : '0.20'}
                      stroke="#38bdf8"
                      strokeWidth="1.6"
                    />

                    {/* Diyafram kubbesi */}
                    <path
                      d={`M${chestX + 14},${86 + chestH} Q280,${expanded ? 248 : 212} ${chestX + chestW - 14},${86 + chestH}`}
                      fill="none"
                      stroke={ventMode === 'spontaneous' && expanded ? '#34d399' : '#94a3b8'}
                      strokeWidth="4"
                    />
                    <text x="280" y={expanded ? 286 : 272} textAnchor="middle" fill="#cbd5e1" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      Diyafram: {ventMode === 'spontaneous' && expanded ? 'Aktif Kasılır ↓' : expanded ? 'Pasif İtilir ↓' : 'Gevşer ↑'}
                    </text>

                    {/* Plevral basınç okları (İçeri bası vs Dışarı çekim) */}
                    <text
                      x={chestX + 16}
                      y="122"
                      fill={isPosPpl ? '#fda4af' : '#6ee7b7'}
                      fontSize="10.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      Ppl: {metrics.ppl}
                    </text>
                    <text x={chestX + 16} y="138" fill="#7dd3fc" fontSize="10" fontFamily="monospace">
                      PA: {metrics.pa}
                    </text>
                  </g>
                );
              })()}

              {/* Kalp & Sağ Atriyum (Merkez Mediyastinum) */}
              <g>
                <ellipse
                  cx="280"
                  cy="176"
                  rx={ventMode === 'ppv' && breathPhase === 'inspiration' ? 28 : 34}
                  ry={ventMode === 'ppv' && breathPhase === 'inspiration' ? 35 : 40}
                  fill="#9f1239"
                  fillOpacity="0.65"
                  stroke="#fb7185"
                  strokeWidth="2"
                />
                <text x="280" y="172" textAnchor="middle" fill="#ffe4e6" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                  Kalp (RA/RV/LV)
                </text>
                <text x="280" y="187" textAnchor="middle" fill="#fecdd3" fontSize="9.5" fontFamily="monospace">
                  {ventMode === 'ppv' && breathPhase === 'inspiration' ? 'Dıştan Bası ↑ (PRA↑)' : 'Transmural Dolum'}
                </text>
              </g>

              {/* İnferior Vena Kava (IVC) ve Venöz Dönüş Akışı (Alttan RA'ya) */}
              <g>
                {/* IVC damar lümeni: Spontan insp'te daralır ama akış hızlanır; PBV'de genişler ama akış yavaşlar */}
                <rect
                  x={ventMode === 'ppv' ? 256 : 262}
                  y="214"
                  width={ventMode === 'ppv' ? 28 : 16}
                  height="86"
                  rx="4"
                  fill="#1d4ed8"
                  fillOpacity="0.4"
                  stroke="#60a5fa"
                  strokeWidth="1.6"
                />
                {/* Venöz dönüş oku */}
                <line
                  x1="270"
                  y1="294"
                  x2="270"
                  y2="225"
                  stroke={ventMode === 'spontaneous' ? '#34d399' : '#f59e0b'}
                  strokeWidth={ventMode === 'spontaneous' && breathPhase === 'inspiration' ? '4.5' : '2.2'}
                />
                <polygon
                  points="264,232 276,232 270,220"
                  fill={ventMode === 'spontaneous' ? '#34d399' : '#f59e0b'}
                />
                <text x="20" y="294" fill="#93c5fd" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  IVC &amp; Venöz Dönüş: {metrics.venousReturn}
                </text>
              </g>

              {/* Guyton Denklemi Kutusu (Sağ üst/alt köşe) */}
              <g transform="translate(362, 232)">
                <rect x="0" y="0" width="186" height="66" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
                <text x="10" y="18" fill="#38bdf8" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  Guyton Venöz Dönüş Yasası:
                </text>
                <text x="10" y="34" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  VR = (MSFP − PRA) / RVR
                </text>
                <text x="10" y="52" fill={ventMode === 'spontaneous' ? '#6ee7b7' : '#fda4af'} fontSize="9.5" fontFamily="monospace">
                  {ventMode === 'spontaneous' ? 'PRA ↓ → VR ↑ (Emme Pompası)' : 'PRA ↑ → VR ↓ (Sıkışma)'}
                </text>
              </g>
            </svg>
          </div>

          {/* Sağ: Canlı Fizyolojik Parametreler */}
          <div className="xl:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className={`p-3.5 rounded-xl border ${subCard}`}>
              <div className={`text-[11px] ${mutedText}`}>Havayolu (Paw) &amp; Alveol (PA)</div>
              <div className="font-mono font-bold text-sm mt-1 tabular-nums text-sky-500">{metrics.pa}</div>
              <div className={`text-[11px] font-mono mt-0.5 ${mutedText}`}>Paw: {metrics.paw}</div>
            </div>

            <div className={`p-3.5 rounded-xl border ${subCard}`}>
              <div className={`text-[11px] ${mutedText}`}>Plevral / İntratorasik Basınç (Ppl)</div>
              <div
                className={`font-mono font-bold text-sm mt-1 tabular-nums ${
                  ventMode === 'spontaneous' ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {metrics.ppl}
              </div>
              <div className={`text-[11px] mt-0.5 ${mutedText}`}>{metrics.diaphragmNote}</div>
            </div>

            <div className={`p-3.5 rounded-xl border ${subCard}`}>
              <div className={`text-[11px] ${mutedText}`}>Sağ Atriyum (PRA) &amp; Venöz Dönüş</div>
              <div className="font-bold text-sm mt-1">{metrics.venousReturn}</div>
              <div className={`text-[11px] font-mono mt-0.5 ${mutedText}`}>PRA: {metrics.pra}</div>
            </div>

            <div className={`p-3.5 rounded-xl border ${subCard}`}>
              <div className={`text-[11px] ${mutedText}`}>IVC Dinamiği (USG / Ekokardiyografi)</div>
              <div className="font-bold text-sm mt-1">{metrics.ivcStatus}</div>
              <div className={`text-[11px] mt-0.5 ${mutedText}`}>
                {ventMode === 'spontaneous' ? 'Spontan inspirasyonda kollaps normaldir.' : 'PBV’de inspiratuar genişleme olur.'}
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border ${subCard}`}>
              <div className={`text-[11px] ${mutedText}`}>RV Afterload (PVR)</div>
              <div className="font-bold text-sm mt-1 text-amber-500">{metrics.rvAfterload}</div>
              <div className={`text-[11px] mt-0.5 ${mutedText}`}>Alveoler distansiyon kapillerleri ezer.</div>
            </div>

            <div className={`p-3.5 rounded-xl border ${subCard}`}>
              <div className={`text-[11px] ${mutedText}`}>LV Afterload (Transmural Basınç)</div>
              <div className="font-bold text-sm mt-1 text-teal-500">{metrics.lvAfterload}</div>
              <div className={`text-[11px] mt-0.5 ${mutedText}`}>Ptm = PLV − Ppl formülüne bağlıdır.</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HEMODİNAMİK ETKİLER & BASINÇ DALGA KARŞILAŞTIRMASI */}
      <div className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${surfaceCard}`}>
        <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Heart className="w-5 h-5 text-rose-500 shrink-0" />
          <div>
            <h5 className="text-sm sm:text-base font-bold">
              2. Kardiyopulmoner Hemodinamik Etkiler (Önyük, Ardyük, Ventriküler Etkileşim &amp; Nabız Basıncı)
            </h5>
            <p className={`text-xs ${mutedText}`}>
              Pozitif basınçlı ventilasyonun sağ kalp, sol kalp ve sıvı yanıtlılığı (PPV/SVV) üzerindeki temel mekanizmaları:
            </p>
          </div>
        </div>

        {/* 4 Hemodinamik Mekanizma Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border space-y-2 ${subCard}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5 text-rose-500">
                <ArrowDown className="w-4 h-4" />
                1. RV Preload &amp; Venöz Dönüş Azalması
              </span>
              <span className="font-mono text-[11px] text-slate-400">Guyton Modeli</span>
            </div>
            <p className="leading-relaxed">
              Venöz dönüş hızı ortalama sistemik dolum basıncı ile sağ atriyum basıncı farkına bağlıdır (<strong>VR = [MSFP − PRA] / RVR</strong>). PBV ve PEEP intratorasik basıncı artırarak <strong>PRA (CVP)’yi yükseltir</strong>; gradient daralır, RV önyükü ve kardiyak debi düşer. <em>(Spontan inspirasyonda ise PRA düşer ve venöz dönüş artar.)</em>
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 ${subCard}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5 text-amber-500">
                <ArrowUp className="w-4 h-4" />
                2. PVR Artışı, RV Afterload &amp; Septal Kayma
              </span>
              <span className="font-mono text-[11px] text-slate-400">West Zonları</span>
            </div>
            <p className="leading-relaxed">
              Yüksek tidal hacim ve yüksek PEEP alveoler basıncı (PA) artırarak intraalveoler kapillerleri sıkıştırır (<strong>West Zon 1–2 artışı</strong>). Bu durum <strong>Pulmoner Vasküler Direnci (PVR)</strong> ve <strong>RV ardyükünü</strong> artırır. RV aşırı gerilirse interventriküler septum sola kayarak (<em>ventriküler bağımlılık</em>) LV dolumunu kısıtlar.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 ${subCard}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5 text-emerald-500">
                <Activity className="w-4 h-4" />
                3. LV Transmural Afterload Azalması (Pozitif Etki!)
              </span>
              <span className="font-mono text-[11px] text-slate-400">Ptm = PLV − Ppl</span>
            </div>
            <p className="leading-relaxed">
              Sol ventrikülün yenmek zorunda olduğu gerçek duvar gerilimi <strong>transmural basınçtır (PLV − Ppl)</strong>. PBV ile plevral basınç (Ppl) pozitife çıktığında LV ejeksiyonuna dışarıdan destek sağlanır ve <strong>LV ardyükü azalır</strong>. Bu nedenle akut LV yetmezliği / pulmoner ödemde pozitif basınç (CPAP/PBV) kardiyak debiyi artırır.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-2 ${subCard}`}>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm flex items-center gap-1.5 text-sky-500">
                <Wind className="w-4 h-4" />
                4. Dinamik Nabız Basıncı Değişimi (PPV / SVV)
              </span>
              <span className="font-mono text-[11px] text-slate-400">dUp + dDown</span>
            </div>
            <p className="leading-relaxed">
              PBV inspirasyonu başında akciğer kapillerlerindeki kan LV’ye sıkıldığı için kısa bir atım artışı (<strong>dUp</strong>), ardından 2–3 atım sonra RV’den gelen azalmış önyük nedeniyle atım düşüşü (<strong>dDown</strong>) oluşur. Tam kontrollü PBV’de (Vt ≥ 8 mL/kg, sinüs ritmi) <strong>PPV / SVV &gt; %12–13</strong> hipovolemiyi ve sıvı yanıtlılığını gösterir.
            </p>
          </div>
        </div>

        {/* Klinik Senaryo Seçici */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-bold flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <span>Klinik Senaryoya Göre PBV + PEEP Hemodinamik Yanıtı:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {CLINICAL_SCENARIOS.map((sc) => {
              const active = sc.id === selectedScenarioId;
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-sky-950/50 border-sky-400 text-white'
                        : 'bg-sky-50 border-sky-500 text-slate-900'
                      : subCard
                  }`}
                >
                  <div className="text-xs font-bold">{sc.title}</div>
                  <div
                    className={`text-[11px] font-mono font-bold mt-1 ${
                      sc.tone === 'rose'
                        ? 'text-rose-500'
                        : sc.tone === 'emerald'
                          ? 'text-emerald-500'
                          : 'text-amber-500'
                    }`}
                  >
                    {sc.ppvEffect}
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`p-4 rounded-xl border grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs ${subCard}`}>
            <div className="space-y-1">
              <div className="font-bold text-sm">{activeScenario.title}</div>
              <div className={`text-[11px] font-mono ${mutedText}`}>{activeScenario.subtitle}</div>
              <p className="leading-relaxed pt-1">{activeScenario.mechanism}</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-teal-500">Klinik Yönetim &amp; Ventilatör Stratejisi</div>
              <p className="leading-relaxed">{activeScenario.action}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. KAPSAMLI KARŞILAŞTIRMA TABLOSU (SPONTAN vs. PBV) */}
      <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${surfaceCard}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h5 className="text-sm sm:text-base font-bold">
              3. Spontan Solunum vs. Pozitif Basınçlı Ventilasyon (PBV) — 10 Parametreli Kıyaslama
            </h5>
            <p className={`text-xs ${mutedText}`}>
              Basınç fizyolojisi, gaz dağılımı (V/Q), hemodinami ve komplikasyon profilleri:
            </p>
          </div>
          <span className={`text-[11px] font-mono ${mutedText}`}>West · Nunn · Miller’s</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2.5 pr-3 font-bold w-1/4">Fizyolojik Parametre</th>
                <th className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400 w-[37.5%]">
                  Spontan (Normal) Solunum
                </th>
                <th className="py-2.5 pl-3 font-bold text-sky-600 dark:text-sky-400 w-[37.5%]">
                  Pozitif Basınçlı Ventilasyon (PBV)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80">
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.param}
                  className={isDark ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}
                >
                  <td className="py-2.5 pr-3 font-bold align-top">{row.param}</td>
                  <td className="py-2.5 px-3 leading-relaxed align-top">{row.spontaneous}</td>
                  <td className="py-2.5 pl-3 leading-relaxed align-top">{row.ppv}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${subCard}`}>
          <Info className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Klinik İnci (PVR vs. Akciğer Hacmi U-Eğrisi):</strong> Pulmoner vasküler direnç normalde <strong>FRC</strong>’de en düşüktür. Çok düşük hacimde (atelektazi) ekstraalveoler damarlar kıvrıldığı için PVR yüksektir; çok yüksek hacimde (aşırı PBV/PEEP) alveoler kapillerler ezildiği için PVR yine yükselir. Bu nedenle <em>atelektaziyi açan uygun PEEP</em> PVR’yi düşürürken, <em>aşırı PEEP</em> PVR’yi artırır.
          </div>
        </div>
      </div>

      {/* KAYNAKLAR */}
      <div className={`rounded-xl border p-4 text-xs space-y-1.5 ${subCard}`}>
        <div className="flex items-center gap-2 font-bold">
          <BookOpen className="w-4 h-4 text-sky-500" />
          <span className={mutedText}>Kaynaklar (Textbook &amp; Klinik Fizyoloji Rehberleri)</span>
        </div>
        <ol className={`list-decimal list-inside space-y-1 leading-relaxed ${mutedText}`}>
          <li>
            West JB, Luks AM. <em>West’s Respiratory Physiology: The Essentials</em>. 11th ed. Wolters Kluwer; 2021. (Mechanics of Breathing &amp; Pulmonary Circulation / West Zones).
          </li>
          <li>
            Gropper MA, Eriksson LI, Fleisher LA, et al. (Eds.). <em>Miller’s Anesthesia</em>. 10th ed. Elsevier; 2024. (Respiratory Physiology &amp; Cardiopulmonary Interactions During Mechanical Ventilation).
          </li>
          <li>
            Butterworth JF, Mackey DC, Wasnick JD. <em>Morgan &amp; Mikhail’s Clinical Anesthesiology</em>. 7th ed. McGraw-Hill; 2022. (Chapter 23: Respiratory Physiology &amp; Effects of Positive-Pressure Ventilation).
          </li>
          <li>
            Marino PL. <em>The ICU Book</em>. 5th ed. Wolters Kluwer; 2024; &amp; Pinsky MR. Cardiopulmonary Interactions: Physiologic Basis and Clinical Applications. <em>Ann Am Thorac Soc</em>. 2018;15(Suppl 1):S45–S48.
          </li>
        </ol>
      </div>
    </div>
  );
};
