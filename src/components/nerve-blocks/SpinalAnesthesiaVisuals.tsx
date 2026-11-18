import React, { useState } from 'react';
import positionIllustrationImg from '../../assets/images/spinal_position_tuffier_landmark_1795029076349.jpg';

export type SurgeryVisualId = 'saddle' | 'lower-extremity' | 't10-pelvic' | 'cesarean';

interface SpinalDermatomeVisualProps {
  selectedSurgeryId: SurgeryVisualId;
}

const SURGERY_VISUAL_CONFIG: Record<
  SurgeryVisualId,
  {
    title: string;
    sensoryLevel: string;
    sympatheticLevel: string;
    motorLevel: string;
    sympY: number;
    sensY: number;
    motorY: number;
    cardiacRisk: boolean;
  }
> = {
  saddle: {
    title: 'Saddle Blok (Perineal / Anal)',
    sensoryLevel: 'S2 – S5',
    sympatheticLevel: 'L1 – L2',
    motorLevel: 'Sakral / Minimal Motor',
    sympY: 162,
    sensY: 204,
    motorY: 222,
    cardiacRisk: false
  },
  'lower-extremity': {
    title: 'Alt Ekstremite / Ayak',
    sensoryLevel: 'T12',
    sympatheticLevel: 'T8 – T10',
    motorLevel: 'L2',
    sympY: 120,
    sensY: 148,
    motorY: 170,
    cardiacRisk: false
  },
  't10-pelvic': {
    title: 'Kalça / Diz / TUR-P / Herni',
    sensoryLevel: 'T10 (Göbek)',
    sympatheticLevel: 'T6 – T8',
    motorLevel: 'T12',
    sympY: 102,
    sensY: 132,
    motorY: 152,
    cardiacRisk: false
  },
  cesarean: {
    title: 'Sezaryen / Alt Batın',
    sensoryLevel: 'T4 (Meme Başı)',
    sympatheticLevel: 'T1 – T2 (Kardiyoakseratör)',
    motorLevel: 'T6',
    sympY: 54,
    sensY: 84,
    motorY: 102,
    cardiacRisk: true
  }
};

export const SpinalDermatomeVisual: React.FC<SpinalDermatomeVisualProps> = ({ selectedSurgeryId }) => {
  const cfg = SURGERY_VISUAL_CONFIG[selectedSurgeryId];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-xs font-bold text-cyan-300">
            Canlı Dermatom &amp; Diferansiyel Blok Seviyesi Görseli
          </div>
          <div className="text-[11px] text-slate-400">
            Sempatik blok duyusal bloğun 2–6 dermatom yukarısına, motor blok ~2 dermatom aşağısına yerleşir.
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold text-slate-300">{cfg.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-3">
          <svg
            viewBox="0 0 540 280"
            className="w-full h-auto"
            role="img"
            aria-label="Spinal anestezi dermatom ve diferansiyel blok seviye şeması"
          >
            {/* Sol taraf: Basitleştirilmiş anatomik gövde ve omurga silueti */}
            <defs>
              <linearGradient id="spinalSympGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.34" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.06" />
              </linearGradient>
              <linearGradient id="spinalSensGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.36" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="spinalMotorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.36" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            {/* Baş & boyun & gövde & bacak anatomik konturu */}
            <g fill="#0f172a" stroke="#334155" strokeWidth="1.5">
              <circle cx="115" cy="24" r="14" />
              <path d="M107,38 L123,38 L126,48 L156,56 L166,118 L155,118 L148,74 L145,172 L149,264 L126,264 L118,195 L112,195 L104,264 L81,264 L85,172 L82,74 L75,118 L64,118 L74,56 L104,48 Z" />
            </g>

            {/* T1-T4 Kardiyoakseratör bölge vurgusu */}
            <rect
              x="82"
              y="52"
              width="66"
              height="32"
              rx="4"
              fill={cfg.cardiacRisk ? '#f43f5e' : '#475569'}
              fillOpacity={cfg.cardiacRisk ? '0.26' : '0.12'}
              stroke={cfg.cardiacRisk ? '#fb7185' : '#475569'}
              strokeWidth="1"
              strokeDasharray="3 2"
            />
            <text x="16" y="67" fill={cfg.cardiacRisk ? '#fda4af' : '#94a3b8'} fontSize="9.5" fontFamily="monospace" fontWeight="bold">
              T1–T4 Kalp
            </text>
            <line x1="68" y1="64" x2="82" y2="64" stroke={cfg.cardiacRisk ? '#fb7185' : '#64748b'} strokeWidth="1" />

            {/* Dinamik blok katmanları gövde içinde */}
            <clipPath id="bodyClip">
              <path d="M82,52 L148,52 L148,264 L82,264 Z" />
            </clipPath>
            <g clipPath="url(#bodyClip)">
              {/* Sempatik blok alanı */}
              <rect x="82" y={cfg.sympY} width="66" height={264 - cfg.sympY} fill="url(#spinalSympGrad)" />
              {/* Duyusal blok alanı */}
              <rect x="82" y={cfg.sensY} width="66" height={264 - cfg.sensY} fill="url(#spinalSensGrad)" />
              {/* Motor blok alanı */}
              <rect x="82" y={cfg.motorY} width="66" height={264 - cfg.motorY} fill="url(#spinalMotorGrad)" />
            </g>

            {/* Anatomik dermatom referans çizgileri */}
            {[
              { y: 84, label: 'T4 (Meme başı)' },
              { y: 132, label: 'T10 (Göbek)' },
              { y: 152, label: 'T12 (Kasık)' },
              { y: 204, label: 'S2–S5 (Perine)' }
            ].map((ref) => (
              <g key={ref.label}>
                <line x1="80" y1={ref.y} x2="150" y2={ref.y} stroke="#475569" strokeWidth="0.9" strokeDasharray="2 2" />
                <text x="156" y={ref.y + 3} fill="#94a3b8" fontSize="9" fontFamily="monospace">
                  {ref.label}
                </text>
              </g>
            ))}

            {/* 3 Seviye yatay işaret çizgileri ve sağdaki merdiven bağlantıları */}
            {/* 1. Sempatik */}
            <line x1="78" y1={cfg.sympY} x2="285" y2={cfg.sympY} stroke="#fb7185" strokeWidth="1.8" />
            <circle cx="115" cy={cfg.sympY} r="3.5" fill="#fb7185" />
            <rect x="285" y={cfg.sympY - 14} width="242" height="28" rx="6" fill="#4c0519" fillOpacity="0.65" stroke="#fb7185" strokeWidth="1.2" />
            <text x="295" y={cfg.sympY + 3} fill="#fecdd3" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Sempatik: {cfg.sympatheticLevel}
            </text>

            {/* 2. Duyusal */}
            <line x1="78" y1={cfg.sensY} x2="285" y2={cfg.sensY} stroke="#22d3ee" strokeWidth="1.8" />
            <circle cx="115" cy={cfg.sensY} r="3.5" fill="#22d3ee" />
            <rect x="285" y={cfg.sensY - 14} width="242" height="28" rx="6" fill="#083344" fillOpacity="0.75" stroke="#22d3ee" strokeWidth="1.2" />
            <text x="295" y={cfg.sensY + 3} fill="#cffafe" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Duyusal (Pinprick): {cfg.sensoryLevel}
            </text>

            {/* 3. Motor */}
            <line x1="78" y1={cfg.motorY} x2="285" y2={cfg.motorY} stroke="#34d399" strokeWidth="1.8" />
            <circle cx="115" cy={cfg.motorY} r="3.5" fill="#34d399" />
            <rect x="285" y={cfg.motorY - 14} width="242" height="28" rx="6" fill="#022c22" fillOpacity="0.75" stroke="#34d399" strokeWidth="1.2" />
            <text x="295" y={cfg.motorY + 3} fill="#d1fae5" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Motor: {cfg.motorLevel}
            </text>
          </svg>
        </div>

        <div className="lg:col-span-5 space-y-2.5 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-300">Seçili Cerrahi Yayılım Özeti</div>
            <div className="text-slate-300">
              Duyusal sınır <strong className="text-white">{cfg.sensoryLevel}</strong> seviyesinde tutulurken, sempatik blokaj{' '}
              <strong className="text-rose-300">{cfg.sympatheticLevel}</strong> düzeyine yükselir.
            </div>
          </div>

          {cfg.cardiacRisk ? (
            <div className="p-3 rounded-lg bg-rose-950/35 border border-rose-500/40 text-rose-200 leading-relaxed">
              <strong>T1–T4 Kardiyoakseratör Uyarısı:</strong> T4 sezaryen bloğunda sempatik düzey T1–T2’ye çıkabilir. Venöz dönüş azalması + kardiyak sempatik blokaj derin bradikardi (Bezold-Jarisch) tetikleyebilir → Atropin / Efedrin / sıvı hazır olmalıdır.
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 leading-relaxed">
              <strong>Kardiyak Sempatik Koruma:</strong> Bu cerrahi seviyede sempatik blok T1–T4 kardiyoakseratör liflerin altında kalır; yine de hiperbarik ilacın sefalik yayılımını önlemek için masa eğimi ve ilk 15 dk NIBP izlemi şarttır.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SpinalNeedleBevelVisual: React.FC = () => {
  const [bevelMode, setBevelMode] = useState<'correct' | 'wrong'>('correct');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
      {/* Sol SVG: İğne Uç Geometrileri (23G Quincke vs 25G Quincke vs Kalem Uçlu) */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-white">İğne Ucu Geometrisi &amp; Çap Karşılaştırması</div>
          <span className="text-[11px] font-mono text-slate-400">Miller’s · NYSORA</span>
        </div>

        <svg
          viewBox="0 0 460 200"
          className="w-full h-auto"
          role="img"
          aria-label="23G Siyah Quincke, 25G Turuncu Quincke ve Kalem Uçlu spinal iğne karşılaştırması"
        >
          {/* 1. 23G Siyah Quincke */}
          <g transform="translate(15, 18)">
            <text x="0" y="12" fill="#e2e8f0" fontSize="11" fontWeight="bold">
              23G Siyah (Quincke · 0.64 mm)
            </text>
            <text x="275" y="12" fill="#fb7185" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Kesici · Yüksek PDPH
            </text>
            {/* Hub */}
            <rect x="0" y="22" width="38" height="18" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <rect x="8" y="25" width="12" height="12" rx="1" fill="#0f172a" />
            {/* Kalın şaft + kesici bevel */}
            <path d="M38,26 L360,26 L385,36 L38,36 Z" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
            {/* BOS hızlı damla */}
            <path d="M398,31 C403,24 408,33 403,38 C399,42 394,35 398,31 Z" fill="#38bdf8" />
            <text x="415" y="34" fill="#7dd3fc" fontSize="9.5" fontFamily="monospace">
              Hızlı BOS
            </text>
          </g>

          {/* 2. 25G Turuncu Quincke */}
          <g transform="translate(15, 78)">
            <text x="0" y="12" fill="#e2e8f0" fontSize="11" fontWeight="bold">
              25G Turuncu (Quincke · 0.51 mm)
            </text>
            <text x="275" y="12" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Kesici · Genç &amp; Gebe
            </text>
            {/* Turuncu hub */}
            <rect x="0" y="22" width="38" height="18" rx="3" fill="#ea580c" stroke="#fdba74" strokeWidth="1.2" />
            {/* İnce şaft + kesici bevel */}
            <path d="M38,28.5 L365,28.5 L384,34.5 L38,34.5 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
            {/* BOS yavaş damla */}
            <circle cx="399" cy="32" r="3" fill="#38bdf8" fillOpacity="0.8" />
            <text x="410" y="35" fill="#fbbf24" fontSize="9.5" fontFamily="monospace">
              10–15 sn
            </text>
          </g>

          {/* 3. Kalem Uçlu (Whitacre / Sprotte - Atravmatik Referans) */}
          <g transform="translate(15, 138)">
            <text x="0" y="12" fill="#e2e8f0" fontSize="11" fontWeight="bold">
              25–27G Kalem Uçlu (Whitacre / Sprotte)
            </text>
            <text x="275" y="12" fill="#2dd4bf" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Atravmatik · En Düşük PDPH
            </text>
            <rect x="0" y="22" width="38" height="18" rx="3" fill="#0f766e" stroke="#5eead4" strokeWidth="1.2" />
            {/* Konik kapalı uç + yan delik */}
            <path d="M38,28.5 L368,28.5 L386,31.5 L368,34.5 L38,34.5 Z" fill="#e2e8f0" stroke="#64748b" strokeWidth="1" />
            <ellipse cx="357" cy="31.5" rx="4.5" ry="1.8" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.9" />
            <text x="394" y="35" fill="#5eead4" fontSize="9.5" fontFamily="monospace">
              Yan delik
            </text>
          </g>
        </svg>
      </div>

      {/* Sağ SVG: İnteraktif Dural Lifler & Bevel Oryantasyonu */}
      <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs font-bold text-amber-300">
            Bevel Oryantasyonu &amp; Dural Lif Hasarı
          </div>
          <div className="flex items-center gap-1 p-0.5 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setBevelMode('correct')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                bevelMode === 'correct'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Doğru (Lateral)
            </button>
            <button
              type="button"
              onClick={() => setBevelMode('wrong')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                bevelMode === 'wrong'
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Yanlış (Yukarı/Aşağı)
            </button>
          </div>
        </div>

        <svg
          viewBox="0 0 460 175"
          className="w-full h-auto"
          role="img"
          aria-label="Quincke iğnede bevel oryantasyonunun uzunlamasına dural liflere etkisi"
        >
          {/* Dura mater dikey lif demetleri (Kraniyokaudal eksen) */}
          <rect x="20" y="15" width="230" height="145" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.2" />
          <text x="135" y="32" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
            ↑ Kraniyal · Dura Mater Lifleri · Kaudal ↓
          </text>

          {[45, 65, 85, 105, 125, 145, 165, 185, 205, 225].map((x) => {
            const isMiddle = x === 125 || x === 145;
            if (bevelMode === 'correct') {
              const bend = x === 125 ? -7 : x === 145 ? 7 : 0;
              return (
                <path
                  key={x}
                  d={`M${x},42 Q${x + bend},92 ${x},148`}
                  fill="none"
                  stroke={isMiddle ? '#34d399' : '#64748b'}
                  strokeWidth={isMiddle ? '2.2' : '1.4'}
                />
              );
            }
            const isCut = x >= 105 && x <= 165;
            return isCut ? (
              <g key={x}>
                <line x1={x} y1="42" x2={x} y2="79" stroke="#fb7185" strokeWidth="2.2" />
                <line x1={x} y1="106" x2={x} y2="148" stroke="#fb7185" strokeWidth="2.2" />
              </g>
            ) : (
              <line key={x} x1={x} y1="42" x2={x} y2="148" stroke="#64748b" strokeWidth="1.4" />
            );
          })}

          {/* İğne kesit yarası / açıklık */}
          {bevelMode === 'correct' ? (
            <ellipse
              cx="135"
              cy="92"
              rx="4"
              ry="16"
              fill="#022c22"
              stroke="#34d399"
              strokeWidth="2"
            />
          ) : (
            <ellipse
              cx="135"
              cy="92"
              rx="34"
              ry="11"
              fill="#4c0519"
              stroke="#fb7185"
              strokeWidth="2.2"
            />
          )}

          {/* Sağ açıklama paneli içinde SVG */}
          <g transform="translate(268, 22)">
            <rect
              x="0"
              y="0"
              width="176"
              height="132"
              rx="8"
              fill={bevelMode === 'correct' ? '#022c22' : '#4c0519'}
              fillOpacity="0.45"
              stroke={bevelMode === 'correct' ? '#10b981' : '#f43f5e'}
              strokeWidth="1.2"
            />
            <text
              x="12"
              y="22"
              fill={bevelMode === 'correct' ? '#6ee7b7' : '#fda4af'}
              fontSize="11"
              fontWeight="bold"
            >
              {bevelMode === 'correct' ? 'BEVEL SAĞA / SOLA' : 'BEVEL YUKARI / AŞAĞI'}
            </text>
            <text x="12" y="42" fill="#e2e8f0" fontSize="10">
              {bevelMode === 'correct' ? '• Uzunlamasına liflere paralel' : '• Lifleri enlemesine keser'}
            </text>
            <text x="12" y="60" fill="#e2e8f0" fontSize="10">
              {bevelMode === 'correct' ? '• Lifleri kesmez, aralar' : '• Geniş dural defekt açılır'}
            </text>
            <text x="12" y="78" fill="#e2e8f0" fontSize="10">
              {bevelMode === 'correct' ? '• İğne çıkınca lifler kapanır' : '• BOS kaçağı artar'}
            </text>
            <text
              x="12"
              y="108"
              fill={bevelMode === 'correct' ? '#34d399' : '#fb7185'}
              fontSize="10.5"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {bevelMode === 'correct' ? 'Sonuç: Düşük PDPH Riski' : 'Sonuç: Yüksek PDPH Riski'}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

interface LayerInfo {
  id: number;
  name: string;
  feel: string;
  color: string;
}

const SAGITTAL_LAYERS: LayerInfo[] = [
  {
    id: 1,
    name: '1. Cilt & Cilt Altı',
    feel: '2–3 mL %2 Lidokain (40–60 mg; maks. 5 mL) ile cilt içi wheal ve cilt altı infiltrasyon yapılan ilk katman.',
    color: '#f59e0b'
  },
  {
    id: 2,
    name: '2. Supraspinöz Ligaman',
    feel: 'Spinöz çıkıntıların ucunu birleştiren ilk sert bağ.',
    color: '#94a3b8'
  },
  {
    id: 3,
    name: '3. İnterspinöz Ligaman',
    feel: 'Spinöz çıkıntılar arasındaki yumuşak/orta dirençli aralık.',
    color: '#64748b'
  },
  {
    id: 4,
    name: '4. Ligamentum Flavum',
    feel: 'Kıkırdakvari belirgin direnç; geçildiğinde direnç kaybı alınır.',
    color: '#eab308'
  },
  {
    id: 5,
    name: '5. Epidural Aralık',
    feel: 'Yağ dokusu ve venöz pleksus (Batson); spinalde doğrudan geçilir.',
    color: '#fb923c'
  },
  {
    id: 6,
    name: '6. Dura & Araknoid',
    feel: 'Geçişte karakteristik "pop / tık" hissi alınır.',
    color: '#38bdf8'
  },
  {
    id: 7,
    name: '7. Subaraknoid Aralık (BOS)',
    feel: 'Mandren çekilince berrak serbest BOS gelir; swirl teyidi sonrası enjeksiyon.',
    color: '#22d3ee'
  }
];

export const SpinalAnatomyProcedureVisuals: React.FC = () => {
  const [imgError, setImgError] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number>(4);

  const selectedLayerInfo = SAGITTAL_LAYERS.find((l) => l.id === activeLayer) || SAGITTAL_LAYERS[3];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
      {/* Sol Kart: Kedi Kamburu Pozisyonu & Tuffier İllüstrasyonu */}
      <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="text-xs font-bold text-indigo-300">
            Pozisyon &amp; Tuffier Çizgisi (L4 / L4–L5)
          </div>
          <p className="text-[11px] text-slate-400">
            Çene göğse, omurga fleksiyon (“kedi kamburu”) — her iki krista iliyakayı birleştiren çizgi L4’ü gösterir.
          </p>
        </div>

        {!imgError ? (
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-white">
            <img
              src={positionIllustrationImg}
              alt="Oturur kedi kamburu pozisyonunda lomber omurga ve krista iliyaka anatomik çizimi"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-56 object-contain bg-white"
            />
            <div className="px-3 py-2 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
              <span className="text-teal-300 font-bold">Hedef: L3–L4 / L4–L5</span>
              <span className="text-amber-300">Konus: L1–L2</span>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900 text-center text-xs text-slate-400">
            Oturur pozisyon ve Tuffier çizgisi anatomik çizimi yüklenemedi; sağdaki sagital kesit şemasını inceleyiniz.
          </div>
        )}
      </div>

      {/* Sağ Kart: İnteraktif Sagital Lomber Anatomi & 7 Katman */}
      <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-bold text-cyan-300">
              İnteraktif Sagital Kesit: L1–S1 Anatomi &amp; Geçilen 7 Katman
            </div>
            <div className="text-[11px] text-slate-400">
              Katman numaralarına tıklayarak iğne yolundaki doku hissini inceleyin:
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-300 font-bold">10–15° Sefalik Açı</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-2">
            <svg
              viewBox="0 0 360 255"
              className="w-full h-auto"
              role="img"
              aria-label="Lomber spinal anestezi sagital anatomik kesiti ve 7 katman"
            >
              {/* Yön işaretleri */}
              <text x="14" y="14" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                Anterior (Karın)
              </text>
              <text x="255" y="14" fill="#94a3b8" fontSize="9" fontFamily="monospace">
                Posterior (Sırt)
              </text>

              {/* Vertebra cisimleri L1 - L5 + S1 */}
              {[
                { y: 26, lbl: 'L1' },
                { y: 66, lbl: 'L2' },
                { y: 106, lbl: 'L3' },
                { y: 146, lbl: 'L4' },
                { y: 186, lbl: 'L5' }
              ].map((v) => (
                <g key={v.lbl}>
                  <rect x="44" y={v.y} width="56" height="30" rx="5" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
                  <text x="72" y={v.y + 19} textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold" fontFamily="monospace">
                    {v.lbl}
                  </text>
                  {/* İntervertebral disk */}
                  <rect x="47" y={v.y + 31} width="50" height="8" rx="3" fill="#64748b" />
                  {/* Spinöz çıkıntılar (posterior) */}
                  <path
                    d={`M165,${v.y + 5} L222,${v.y + 14} L222,${v.y + 28} L165,${v.y + 24} Z`}
                    fill="#cbd5e1"
                    stroke="#475569"
                    strokeWidth="1.2"
                  />
                </g>
              ))}
              {/* S1 */}
              <path d="M46,226 L100,226 L110,250 L54,250 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />
              <text x="76" y="242" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                S1
              </text>

              {/* Subaraknoid BOS kesesi (L1 -> S1) */}
              <rect
                x="110"
                y="20"
                width="36"
                height="226"
                rx="10"
                fill="#0284c7"
                fillOpacity={activeLayer === 7 ? '0.45' : '0.24'}
                stroke={activeLayer === 6 || activeLayer === 7 ? '#38bdf8' : '#0369a1'}
                strokeWidth={activeLayer === 6 ? '2.5' : '1.4'}
              />

              {/* Medulla Spinalis -> Konus Medullaris L1-L2'de biter */}
              <path d="M120,20 L136,20 L133,66 L128,82 L123,66 Z" fill="#fde047" stroke="#ca8a04" strokeWidth="1" />
              <text x="12" y="76" fill="#fde047" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                Konus
              </text>
              <text x="12" y="86" fill="#fde047" fontSize="8.5" fontFamily="monospace">
                (L1–L2)
              </text>

              {/* Kauda Equina lifleri */}
              {[124, 128, 132].map((cx) => (
                <path
                  key={cx}
                  d={`M${cx},80 Q${cx - 2},150 ${cx + 1},242`}
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="1.1"
                  strokeOpacity="0.85"
                />
              ))}

              {/* Epidural aralık */}
              <rect
                x="148"
                y="22"
                width="10"
                height="218"
                fill="#fb923c"
                fillOpacity={activeLayer === 5 ? '0.55' : '0.18'}
              />

              {/* Ligamentum Flavum */}
              <rect
                x="159"
                y="22"
                width="9"
                height="218"
                fill="#eab308"
                fillOpacity={activeLayer === 4 ? '0.85' : '0.42'}
              />

              {/* İnterspinöz & Supraspinöz ligamanlar + Cilt */}
              <rect
                x="170"
                y="22"
                width="48"
                height="218"
                fill="#64748b"
                fillOpacity={activeLayer === 3 ? '0.35' : '0.1'}
              />
              <rect
                x="224"
                y="22"
                width="10"
                height="218"
                fill="#94a3b8"
                fillOpacity={activeLayer === 2 ? '0.75' : '0.3'}
              />
              <rect
                x="236"
                y="22"
                width="18"
                height="218"
                rx="4"
                fill="#f59e0b"
                fillOpacity={activeLayer === 1 ? '0.45' : '0.15'}
              />

              {/* Tuffier Çizgisi (L4 seviyesi) */}
              <line x1="25" y1="160" x2="275" y2="160" stroke="#14b8a6" strokeWidth="1.2" strokeDasharray="4 3" />
              <text x="258" y="156" fill="#2dd4bf" fontSize="8.5" fontWeight="bold" fontFamily="monospace">
                Tuffier (L4)
              </text>

              {/* Spinal İğne (L3-L4 aralığından 10-15° SEFALİK/YUKARI açıyla subaraknoid BOS içine) */}
              <line x1="298" y1="158" x2="128" y2="132" stroke="#f8fafc" strokeWidth="2.4" />
              {/* İğne başlığı */}
              <rect x="296" y="152" width="16" height="10" rx="2" transform="rotate(8.7 296 157)" fill="#ea580c" stroke="#fed7aa" strokeWidth="1" />
              {/* Uç noktası BOS ortasında */}
              <circle cx="128" cy="132" r="3" fill="#22d3ee" />
              <text x="262" y="176" fill="#fcd34d" fontSize="8.5" fontFamily="monospace">
                ↑ 10–15° Sefalik
              </text>
            </svg>
          </div>

          <div className="md:col-span-5 space-y-1.5">
            {SAGITTAL_LAYERS.map((layer) => {
              const isSelected = activeLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayer(layer.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {layer.name}
                </button>
              );
            })}
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-snug">
              <strong className="text-cyan-300 block mb-0.5">{selectedLayerInfo.name}</strong>
              {selectedLayerInfo.feel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BromageStickVisualProps {
  score: number;
}

export const BromageStickVisual: React.FC<BromageStickVisualProps> = ({ score }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-2.5">
      <svg
        viewBox="0 0 280 95"
        className="w-full h-20"
        role="img"
        aria-label={`Modifiye Bromage Skor ${score} bacak hareket durumu şeması`}
      >
        {/* Sedye */}
        <line x1="20" y1="76" x2="250" y2="76" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        {/* Supin yatan hasta baş & gövde */}
        <circle cx="38" cy="60" r="9" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
        <line x1="47" y1="67" x2="128" y2="67" stroke="#94a3b8" strokeWidth="7" strokeLinecap="round" />

        {/* Bacak duruşu skora göre */}
        {score === 0 && (
          <g>
            {/* Düz bacak kaldırma */}
            <line x1="128" y1="67" x2="210" y2="26" stroke="#34d399" strokeWidth="6" strokeLinecap="round" />
            <line x1="210" y1="26" x2="222" y2="15" stroke="#34d399" strokeWidth="5" strokeLinecap="round" />
            <text x="155" y="18" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Düz Kaldırabilir ✓
            </text>
          </g>
        )}
        {score === 1 && (
          <g>
            {/* Diz fleksiyonu */}
            <line x1="128" y1="67" x2="176" y2="38" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
            <line x1="176" y1="38" x2="220" y2="67" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" />
            <line x1="220" y1="67" x2="226" y2="55" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
            <text x="155" y="22" fill="#fcd34d" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Diz Bükebilir
            </text>
          </g>
        )}
        {score === 2 && (
          <g>
            {/* Yalnızca ayak bileği hareketi */}
            <line x1="128" y1="67" x2="218" y2="67" stroke="#60a5fa" strokeWidth="6" strokeLinecap="round" />
            <line x1="218" y1="67" x2="232" y2="53" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
            <path d="M236,48 Q242,56 236,64" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="148" y="42" fill="#93c5fd" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Sadece Ayak Bileği
            </text>
          </g>
        )}
        {score === 3 && (
          <g>
            {/* Tam hareketsiz bacak */}
            <line x1="128" y1="67" x2="224" y2="67" stroke="#fb7185" strokeWidth="6" strokeLinecap="round" />
            <line x1="224" y1="67" x2="224" y2="54" stroke="#fb7185" strokeWidth="5" strokeLinecap="round" />
            <text x="148" y="42" fill="#fda4af" fontSize="10" fontWeight="bold" fontFamily="monospace">
              Hareket Yok (Tam Blok)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

type SpecialGroupId = 'obesity' | 'elderly' | 'kyphoscoliosis' | 'height';

interface SpecialGroupInfo {
  id: SpecialGroupId;
  title: string;
  doseRule: string;
  doseTone: 'reduce' | 'titrate';
  mechanism: string;
  techniquePearls: string[];
}

const SPECIAL_GROUPS: SpecialGroupInfo[] = [
  {
    id: 'obesity',
    title: 'Obezite (VKİ ≥ 35–40 kg/m²)',
    doseRule: 'Doz %20–25 Azaltılır',
    doseTone: 'reduce',
    mechanism:
      'Artmış intraabdominal basınç ve epidural yağ/venöz engorjman subaraknoid BOS hacmini daraltır; gerçek kiloya göre tam doz verilirse blok aşırı yükselir.',
    techniquePearls: [
      'Doz gerçek vücut ağırlığına göre değil, boy / yağsız vücut kütlesine göre ayarlanır.',
      'Cilt–BOS mesafesi arttığı için uzun (115–120 mm) spinal iğne ve oturur pozisyon tercih edilir.',
      'Kalça yağ dokusu Tuffier çizgisini yalancı yukarı kaydırabilir; gerekirse pre-op USG ile orta hat & derinlik işaretlenir.'
    ]
  },
  {
    id: 'elderly',
    title: 'İleri Yaş (≥ 65–70 Yaş)',
    doseRule: 'Doz %20–25 Azaltılır',
    doseTone: 'reduce',
    mechanism:
      'Yaşla BOS hacmi azalır, sinir köklerinin lokal anesteziğe duyarlılığı artar; standart doz aşırı yüksek sempatik blok ve derin hipotansiyona yol açar.',
    techniquePearls: [
      'Supraspinöz ve interspinöz ligamanlar kalsifiye ise orta hat yerine Paramedyan yaklaşım seçilmelidir.',
      'PDPH riski 65 yaş üstünde minimal olduğu için 23G Siyah Quincke veya introducer’lı 25G güvenle kullanılabilir.',
      'Kardiyovasküler rezerv kısıtlı olduğundan ilk 15 dk NIBP takibi ve erken vazopressör titrasyonu kritiktir.'
    ]
  },
  {
    id: 'kyphoscoliosis',
    title: 'Kifoskolyoz / Ankilozan Spondilit',
    doseRule: 'İzobarik veya Dikkatli Titre (%10–20 Azalt)',
    doseTone: 'titrate',
    mechanism:
      'Vertebral rotasyon ve skolyoz eğriliği hiperbarik ilacın asimetrik/yamalı dağılmasına veya beklenmedik seviyeye çıkmasına neden olabilir.',
    techniquePearls: [
      'Orta hat interspinöz aralık kapalıysa Paramedyan yaklaşım (veya L5–S1 Taylor yaklaşımı) altın standarttır.',
      'Skolyozda spinöz çıkıntı konkav tarafa döner; iğne lamina penceresi daha geniş olan konveks taraftan/yöne yönlendirilir.',
      'İleri anatomik deformitede pre-op spinal USG taraması giriş açısını ve derinliği netleştirir.'
    ]
  },
  {
    id: 'height',
    title: 'Uç Boy Değerleri (< 155 cm vs. > 185 cm)',
    doseRule: '< 155 cm: −%15–25 · > 185 cm: +%10–15',
    doseTone: 'titrate',
    mechanism:
      'Spinal blok yüksekliği vücut ağırlığından çok vertebral kolon uzunluğu (boy) ve lumbosakral BOS hacmi ile belirlenir.',
    techniquePearls: [
      'Kısa boy (< 155 cm): Vertebral kolon kısadır; T4–T10 hedeflerinde Bupivakain dozu %15–25 azaltılır (örn. Sezaryen 8–10 mg).',
      'Uzun boy (> 185–190 cm): Standart doz kısa kalabilir; doz %10–15 artırılır (örn. T10 için 12.5–15 mg; tek doz üst sınırı ~15–17.5 mg).',
      'Kısa ve uzun boylu hastalarda enjeksiyon sonrası 5. ve 10. dk pinprick dermatom kontrolü şarttır.'
    ]
  }
];

export const SpinalSpecialPopulationsDosingCard: React.FC = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<SpecialGroupId>('obesity');
  const activeGroup = SPECIAL_GROUPS.find((g) => g.id === selectedGroupId) || SPECIAL_GROUPS[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white">
            Özel Hasta Grupları &amp; Boy/Kilo Uç Değerlerinde Doz Modifikasyonu
          </h3>
          <p className="text-xs text-slate-400">
            Obezite, ileri yaş, kifoskolyoz ve ekstrem boy (&lt; 155 cm / &gt; 185 cm) durumlarında Marcaine Heavy doz uyarlaması ve iğne/teknik ön hazırlığı.
          </p>
        </div>
        <span className="text-[11px] font-mono text-teal-400 shrink-0">Miller’s · NYSORA · Barash</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {SPECIAL_GROUPS.map((grp) => {
          const active = grp.id === selectedGroupId;
          return (
            <button
              key={grp.id}
              type="button"
              onClick={() => setSelectedGroupId(grp.id)}
              className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                active
                  ? 'bg-indigo-950/50 border-indigo-400 text-white'
                  : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold">{grp.title}</div>
              <div
                className={`text-[11px] font-mono font-bold mt-1 ${
                  grp.doseTone === 'reduce' ? 'text-amber-400' : 'text-cyan-300'
                }`}
              >
                {grp.doseRule}
              </div>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-5 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-white">{activeGroup.title}</span>
            <span className="text-[11px] font-mono font-bold text-amber-300">{activeGroup.doseRule}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{activeGroup.mechanism}</p>
        </div>
        <div className="lg:col-span-7">
          <div className="text-[11px] font-bold text-teal-300 mb-1.5">Klinik Uygulama İpuçları</div>
          <ul className="space-y-1 text-xs text-slate-300 leading-relaxed">
            {activeGroup.techniquePearls.map((pearl, idx) => (
              <li key={idx}>• {pearl}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const SpinalParamedianApproachCard: React.FC = () => {
  const [approachMode, setApproachMode] = useState<'midline-normal' | 'paramedian' | 'walkoff' | 'midline-blocked'>('paramedian');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white">
            Görsel Şema: Orta Hat (Midline) vs. Paramedyan Yaklaşım &amp; &ldquo;Walking Off the Lamina&rdquo;
          </h3>
          <p className="text-xs text-slate-400">
            Normal anatomide ilk tercih Orta Hat (Midline); kalsifiye bağ, ileri yaş veya kifoskolyozda kurtarıcı rota Paramedyan yaklaşımdır.
          </p>
        </div>
        <span className="text-[11px] font-mono text-teal-400 shrink-0">Miller’s · NYSORA · Barash</span>
      </div>

      {/* İki Yaklaşımın Kısa Karşılaştırma Özeti */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-950/70 border border-cyan-500/30 rounded-xl p-3.5 space-y-1">
          <div className="font-bold text-cyan-300">Orta Hat (Midline) Yaklaşımı · Standart İlk Tercih</div>
          <p className="text-slate-300 leading-relaxed">
            İki spinöz çıkıntının tam orta noktasından (<strong>0° lateral</strong>) hafif <strong>10–15° sefalik</strong> açıyla ilerlenir. Sırasıyla <em>Supraspinöz → İnterspinöz → Ligamentum Flavum</em> geçilir; genç ve normal anatomide en kısa ve simetrik yoldur.
          </p>
        </div>
        <div className="bg-slate-950/70 border border-teal-500/30 rounded-xl p-3.5 space-y-1">
          <div className="font-bold text-teal-300">Paramedyan (Lateral) Yaklaşım · Zor Anatomi Kurtarıcısı</div>
          <p className="text-slate-300 leading-relaxed">
            Alt spinöz çıkıntının üst kenarından <strong>1 cm lateral + 1 cm kaudal</strong> girilip <strong>10–15° mediyal + 10–15° sefalik</strong> açıyla ilerlenir. Supraspinöz ve interspinöz bağları tamamen atlayarak doğrudan lamina penceresinden <em>Ligamentum Flavum</em>’a ulaşır.
          </p>
        </div>
      </div>

      {/* İnteraktif Mod Seçici + Çift Görünümlü Anatomik SVG */}
      <div className="bg-slate-950/80 border border-indigo-500/30 rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-white">Giriş Rotasını Seçerek İnceleyin:</span>
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setApproachMode('midline-normal')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                approachMode === 'midline-normal' ? 'bg-cyan-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Orta Hat (Midline)
            </button>
            <button
              type="button"
              onClick={() => setApproachMode('paramedian')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                approachMode === 'paramedian' ? 'bg-teal-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Paramedyan Giriş
            </button>
            <button
              type="button"
              onClick={() => setApproachMode('walkoff')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                approachMode === 'walkoff' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Lamina Teması (Walk-off)
            </button>
            <button
              type="button"
              onClick={() => setApproachMode('midline-blocked')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer ${
                approachMode === 'midline-blocked' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'
              }`}
            >
              Orta Hat Engeli (Kalsifiye)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Sol SVG: Posterior Koronal Görünüm */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-3">
            <svg
              viewBox="0 0 380 230"
              className="w-full h-auto"
              role="img"
              aria-label="Lomber omurga posterior görünümde orta hat ve paramedyan giriş noktası"
            >
              <text x="190" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Posterior Görünüm (Sırt Yüzeyi · L3–L5)
              </text>

              {/* Orta hat ekseni */}
              <line x1="190" y1="24" x2="190" y2="215" stroke="#475569" strokeWidth="1.2" strokeDasharray="4 3" />

              {/* L3, L4, L5 Lamina ve Transvers/Spinöz Yapılar */}
              {[
                { y: 34, label: 'L3' },
                { y: 98, label: 'L4' },
                { y: 162, label: 'L5' }
              ].map((v) => (
                <g key={v.label}>
                  <path
                    d={`M120,${v.y + 8} L168,${v.y} L212,${v.y} L260,${v.y + 8} L256,${v.y + 34} L210,${v.y + 40} L170,${v.y + 40} L124,${v.y + 34} Z`}
                    fill="#334155"
                    stroke="#64748b"
                    strokeWidth="1.2"
                  />
                  <rect x="181" y={v.y + 4} width="18" height="38" rx="6" fill="#cbd5e1" stroke="#475569" strokeWidth="1.2" />
                  <text x="190" y={v.y + 27} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                    {v.label}
                  </text>
                </g>
              ))}

              {/* İnterlaminar / İnterspinöz pencere (L3-L4 arası) */}
              <rect
                x="170"
                y="76"
                width="40"
                height="20"
                rx="6"
                fill="#0284c7"
                fillOpacity="0.32"
                stroke="#38bdf8"
                strokeWidth="1.3"
                strokeDasharray="3 2"
              />
              <text x="86" y="89" fill="#7dd3fc" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
                İnterlaminar Pencere
              </text>
              <line x1="168" y1="86" x2="152" y2="86" stroke="#38bdf8" strokeWidth="1" />

              {/* Normal Orta Hat (Midline) Girişi */}
              {approachMode === 'midline-normal' && (
                <g>
                  <circle cx="190" cy="88" r="6" fill="#22d3ee" stroke="#ffffff" strokeWidth="1.4" />
                  <line x1="190" y1="88" x2="190" y2="79" stroke="#67e8f9" strokeWidth="2.8" />
                  <text x="205" y="83" fill="#67e8f9" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    Orta Hat Giriş (0° Lat.)
                  </text>
                  <text x="205" y="95" fill="#bae6fd" fontSize="8.5" fontFamily="monospace">
                    10–15° Sefalik Açı
                  </text>
                </g>
              )}

              {/* Orta Hat Kalsifiye Engel */}
              {approachMode === 'midline-blocked' && (
                <g>
                  <rect x="184" y="72" width="12" height="28" rx="3" fill="#f43f5e" fillOpacity="0.55" stroke="#fb7185" strokeWidth="1.5" />
                  <circle cx="190" cy="86" r="5" fill="#fb7185" />
                  <text x="206" y="83" fill="#fda4af" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    Kalsifiye Bağ / Kemik Blok
                  </text>
                </g>
              )}

              {/* Paramedyan Giriş & Lamina Walk-Off */}
              {(approachMode === 'paramedian' || approachMode === 'walkoff') && (
                <g>
                  <line x1="190" y1="112" x2="232" y2="112" stroke="#fbbf24" strokeWidth="1.2" />
                  <text x="211" y="123" textAnchor="middle" fill="#fcd34d" fontSize="9" fontFamily="monospace">
                    1 cm lat.
                  </text>
                  <line x1="232" y1="98" x2="232" y2="112" stroke="#fbbf24" strokeWidth="1.2" />
                  <text x="242" y="109" fill="#fcd34d" fontSize="9" fontFamily="monospace">
                    1 cm kaud.
                  </text>

                  <circle cx="232" cy="112" r="5" fill={approachMode === 'walkoff' ? '#f59e0b' : '#2dd4bf'} stroke="#ffffff" strokeWidth="1.2" />
                  <line
                    x1="232"
                    y1="112"
                    x2={approachMode === 'walkoff' ? 215 : 193}
                    y2={approachMode === 'walkoff' ? 105 : 86}
                    stroke={approachMode === 'walkoff' ? '#fbbf24' : '#2dd4bf'}
                    strokeWidth="2.6"
                  />
                  {approachMode === 'walkoff' && (
                    <>
                      <line
                        x1="232"
                        y1="112"
                        x2="193"
                        y2="86"
                        stroke="#34d399"
                        strokeWidth="2"
                        strokeDasharray="3 2"
                      />
                      <text x="242" y="142" fill="#fcd34d" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                        Lamina → Sefalik Yürüt
                      </text>
                    </>
                  )}
                  {approachMode === 'paramedian' && (
                    <text x="244" y="88" fill="#5eead4" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                      10–15° Mediyal + Sefalik
                    </text>
                  )}
                </g>
              )}
            </svg>
          </div>

          {/* Sağ SVG: Aksiyel Kesit */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-xl p-3">
            <svg
              viewBox="0 0 380 230"
              className="w-full h-auto"
              role="img"
              aria-label="Aksiyel kesitte orta hat ve paramedyan iğne rotası"
            >
              <text x="190" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Aksiyel Kesit: Orta Hat Bağları vs. Paramedyan Rota
              </text>

              {/* Cilt / Sırt konturu */}
              <path d="M40,185 Q190,210 340,185" fill="none" stroke="#f59e0b" strokeWidth="3" />
              <text x="52" y="205" fill="#fbbf24" fontSize="9.5" fontFamily="monospace">
                Cilt (Posterior)
              </text>

              {/* Vertebra Cismi */}
              <ellipse cx="190" cy="64" rx="52" ry="30" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
              <text x="190" y="68" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Vertebra Cismi
              </text>

              {/* Laminalar */}
              <path d="M138,76 L112,126 L180,152 L190,145 L182,135 L134,116 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />
              <path d="M242,76 L268,126 L200,152 L190,145 L198,135 L246,116 Z" fill="#94a3b8" stroke="#475569" strokeWidth="1.2" />
              <text x="276" y="128" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                Lamina
              </text>

              {/* İnterspinöz Aralık / Bağ Hattı (Normalde açık fibröz bağ, kalsifiyede kemikleşmiş engel) */}
              <rect
                x="183"
                y="144"
                width="14"
                height="44"
                rx="4"
                fill={
                  approachMode === 'midline-blocked'
                    ? '#f43f5e'
                    : approachMode === 'midline-normal'
                      ? '#0ea5e9'
                      : '#64748b'
                }
                fillOpacity={approachMode === 'midline-blocked' ? '0.6' : approachMode === 'midline-normal' ? '0.25' : '0.35'}
                stroke={approachMode === 'midline-blocked' ? '#fb7185' : '#475569'}
                strokeWidth="1.2"
                strokeDasharray={approachMode === 'midline-normal' ? '3 2' : undefined}
              />

              {/* Ligamentum Flavum & Subaraknoid BOS kesesi */}
              <path d="M150,126 Q190,136 230,126" fill="none" stroke="#eab308" strokeWidth="4" />
              <text x="72" y="138" fill="#fde047" fontSize="9" fontFamily="monospace">
                Lig. Flavum
              </text>
              <circle cx="190" cy="112" r="20" fill="#0284c7" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="1.8" />
              <text x="190" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                BOS
              </text>

              {/* İğne Yolları */}
              {approachMode === 'midline-normal' && (
                <g>
                  <line x1="190" y1="210" x2="190" y2="116" stroke="#22d3ee" strokeWidth="2.8" />
                  <circle cx="190" cy="116" r="3.5" fill="#22d3ee" />
                  <text x="204" y="168" fill="#67e8f9" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    Orta Hat (Supraspinöz + İnterspinöz)
                  </text>
                  <text x="204" y="182" fill="#a5f3fc" fontSize="9" fontFamily="monospace">
                    Normal anatomide direkt geçiş ✓
                  </text>
                </g>
              )}

              {approachMode === 'midline-blocked' && (
                <g>
                  <line x1="190" y1="212" x2="190" y2="156" stroke="#fb7185" strokeWidth="2.8" />
                  <circle cx="190" cy="156" r="4" fill="#fb7185" />
                  <text x="206" y="176" fill="#fda4af" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    Kalsifiye / Kemik Engel!
                  </text>
                </g>
              )}

              {approachMode === 'paramedian' && (
                <g>
                  <line x1="252" y1="204" x2="194" y2="116" stroke="#2dd4bf" strokeWidth="2.8" />
                  <circle cx="194" cy="116" r="3.5" fill="#22d3ee" />
                  <text x="256" y="198" fill="#5eead4" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                    10–15° Mediyal
                  </text>
                  <text x="246" y="162" fill="#a7f3d0" fontSize="9" fontFamily="monospace">
                    Bağlar atlandı ✓
                  </text>
                </g>
              )}

              {approachMode === 'walkoff' && (
                <g>
                  <line x1="256" y1="204" x2="235" y2="132" stroke="#fbbf24" strokeWidth="2.4" />
                  <circle cx="235" cy="132" r="4" fill="#fbbf24" />
                  <line x1="256" y1="204" x2="194" y2="116" stroke="#34d399" strokeWidth="2.4" strokeDasharray="4 2" />
                  <circle cx="194" cy="116" r="3.5" fill="#34d399" />
                  <text x="255" y="150" fill="#fcd34d" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    1. Lamina teması
                  </text>
                  <text x="255" y="164" fill="#6ee7b7" fontSize="9" fontWeight="bold" fontFamily="monospace">
                    2. Geri çek &amp; mediyale yürüt
                  </text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Orta Hat (Midline) Başarısızlık Nedenleri & Çözüm Yolları (Paramedyan Harici Kurtarma) */}
      <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300">
              Orta Hat (Midline) Başarısızlığında Olası Nedenler &amp; Çözüm Yolları (Paramedyan Öncesi Kurtarma)
            </div>
            <p className="text-[11px] text-slate-400">
              Paramedyana geçmeden önce orta hat başarısızlığının en sık 7 nedenini ve yatak başı düzeltme manevralarını uygulayın:
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-400 shrink-0">Miller’s · Morgan &amp; Mikhail · NYSORA</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 pr-3 font-bold">Karşılaşılan Sorun</th>
                <th className="py-2 px-3 font-bold">Anatomik / Teknik Neden</th>
                <th className="py-2 pl-3 font-bold">Orta Hatta Çözüm Yolu (Paramedyan Harici)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr className="hover:bg-slate-900/50">
                <td className="py-2.5 pr-3 font-semibold text-white whitespace-nowrap">1. İnterspinöz Aralık Dar / Kapalı</td>
                <td className="py-2.5 px-3 text-slate-300 leading-snug">
                  Hasta yalnızca omuzlarını öne eğmiş, kalça ve bel lomber lordozda kalmıştır.
                </td>
                <td className="py-2.5 pl-3 text-teal-300 leading-snug">
                  Ayakları tabureye bastırın, çeneyi göğse alıp beli geriye &ldquo;kedi kamburu&rdquo; gibi itmesini isteyin; lateral dekübitte dizleri karna çekip omuz-kalça eksenini masaya dik tutun.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-2.5 pr-3 font-semibold text-white whitespace-nowrap">2. Yüzeyel Kemik (~2–3 cm)</td>
                <td className="py-2.5 px-3 text-slate-300 leading-snug">
                  İğne interspinöz boşluk yerine alt veya üst spinöz çıkıntının ucuna çarpmıştır.
                </td>
                <td className="py-2.5 pl-3 text-teal-300 leading-snug">
                  Cilt altına kadar geri çekip (dokuda eğmeyin!) <strong>10–15° daha sefalik</strong> yönlendirin; hâlâ yüzeyel kemik varsa giriş noktasını <strong>5 mm sefalik veya kaudal</strong> kaydırın.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-2.5 pr-3 font-semibold text-white whitespace-nowrap">3. Derin Kemik (~4–6 cm)</td>
                <td className="py-2.5 px-3 text-slate-300 leading-snug">
                  İğne derinleştikçe orta hattan sağa/sola sapmış ve laminaya/pediküle dayanmıştır.
                </td>
                <td className="py-2.5 pl-3 text-teal-300 leading-snug">
                  Hastanın sırtındaki orta hat çukuru ve krista iliyakaları yeniden hizalayın; <strong>introducer</strong>’ı tam dik (0° lateral) yerleştirin veya bir üst/alt aralığa (<strong>L3–L4 ↔ L4–L5</strong>) geçin.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-2.5 pr-3 font-semibold text-white whitespace-nowrap">4. &ldquo;Pop&rdquo; Var Ama BOS Gelmiyor</td>
                <td className="py-2.5 px-3 text-slate-300 leading-snug">
                  İnce 25G iğnede akış yavaştır, bevel dura kenarında yarım kalmıştır veya BOS basıncı çok düşüktür.
                </td>
                <td className="py-2.5 pl-3 text-teal-300 leading-snug">
                  En az <strong>15–20 sn</strong> bekleyin → iğneyi <strong>90°–180° döndürün</strong> → mandreni takıp 1–2 mm kontrollü ilerletin → gerekirse hastayı hafif doğrultun / Valsalva yaptırın (asla boş enjektörle sert aspire etmeyin!).
                </td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-2.5 pr-3 font-semibold text-amber-300 whitespace-nowrap">5. Parestezi (Elektrik Çarpması)</td>
                <td className="py-2.5 px-3 text-slate-300 leading-snug">
                  İğne orta hattan lateralize olup kauda equina sinir köküne temas etmiştir.
                </td>
                <td className="py-2.5 pl-3 text-amber-200 leading-snug">
                  Derhal 1–2 mm geri çekin, <strong>kesinlikle ilaç vermeyin</strong>! Sağ bacakta sızı varsa iğne sağa kaymıştır → cilt altına çekip <strong>karşı tarafa (sola)</strong> doğrultun; geçmezse çıkarın.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-2.5 pr-3 font-semibold text-rose-300 whitespace-nowrap">6. Kanlı Akış / Sürekli Taze Kan</td>
                <td className="py-2.5 px-3 text-slate-300 leading-snug">
                  Cilt altı küçük kapiller sıyrılması veya lateral epidural venöz pleksusa (Batson) giriş.
                </td>
                <td className="py-2.5 pl-3 text-rose-200 leading-snug">
                  2–3 damla bekleyin: BOS hızla berraklaşırsa devam edilebilir. <strong>Sürekli taze kan</strong> geliyorsa iğneyi hemen çıkarın, yeni iğne ile <strong>farklı aralıktan</strong> tam orta hattan tekrar deneyin.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/50">
                <td className="py-2.5 pr-3 font-semibold text-white whitespace-nowrap">7. 25G Bükülüyor / Kısa Kalıyor</td>
                <td className="py-2.5 px-3 text-slate-300 leading-snug">
                  Sert bağda introducer’sız 25G bükülür veya obez hastada 90 mm iğne subaraknoid aralığa yetmez.
                </td>
                <td className="py-2.5 pl-3 text-teal-300 leading-snug">
                  25G iğneyi mutlaka <strong>kılavuz (introducer)</strong> ile kullanın; ≥ 65 yaşta <strong>23G</strong> tercih edin; derin anatomide <strong>uzun (115–120 mm)</strong> iğne ve pre-op USG derinlik ölçümü yapın.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};



