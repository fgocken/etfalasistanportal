import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Compass,
  Info,
  Scan,
  ShieldAlert,
  Sliders,
  Wrench,
} from 'lucide-react';

interface TeeMonitoringModuleProps {
  isDark: boolean;
}

type TeeViewId =
  | 'me-4c-normal'
  | 'tg-sax-hypovolemia'
  | 'tg-sax-rwma'
  | 'me-4c-pe-rv'
  | 'me-4c-tamponade'
  | 'me-lax-dissection'
  | 'me-bicaval-vae';

interface TeeViewCase {
  id: TeeViewId;
  shortLabel: string;
  title: string;
  level: string;
  omniplane: string;
  status: 'normal' | 'warning' | 'critical';
  badgeText: string;
  keyMetricLabel: string;
  keyMetricValue: string;
  finding: string;
  clinicalMeaning: string;
  action: string;
}

const TEE_VIEW_CASES: TeeViewCase[] = [
  {
    id: 'me-4c-normal',
    shortLabel: 'ME 4C (Normal)',
    title: 'Mid-Özofageal 4-Odacık (ME 4C) — Normal Referans',
    level: 'ME · 30–35 cm',
    omniplane: '0° – 20°',
    status: 'normal',
    badgeText: 'RV < 2/3 LV · Normal EF & Kapaklar',
    keyMetricLabel: 'LV EF / RV:LV',
    keyMetricValue: '%60 · < 0.6',
    finding:
      'Özofagus hemen arkada olduğu için Sol Atriyum (LA) sektörün en üstünde (yakın alan) yer alır. Mitral (sol) ve triküspit (sağ) kapaklar, LV ve RV boyut oranı (RV alanı LV’nin < 2/3’ü) eşzamanlı değerlendirilir.',
    clinicalMeaning:
      'Rescue TEE’de ilk açılan temel tarama penceresidir. Global LV/RV sistolik işlevi, ciddi kapak yetmezliği, perikardiyal efüzyon ve atriyal kitleler hızla taranır.',
    action:
      'LV apeksinin kısalmasını (foreshortening) önlemek için hafif retrofleksiyon uygulayın; renkli Doppler ile MY ve TY jetlerini tarayın.',
  },
  {
    id: 'tg-sax-hypovolemia',
    shortLabel: 'TG SAX (Hipovolemi)',
    title: 'Transgastrik Mid-Papiller SAX — "Kissing Papillary Muscles"',
    level: 'TG · 40–45 cm',
    omniplane: '0°',
    status: 'warning',
    badgeText: 'Küçük Hiperdinamik LV · LVEDA < 5.5 cm²/m²',
    keyMetricLabel: 'LVEDA / FAC',
    keyMetricValue: '4.8 cm²/m² · >%75',
    finding:
      'Sol ventrikül kavitesi belirgin küçülmüştür ve sistol sonunda anterolateral ile posteromedial papiller kaslar neredeyse birbirine temas eder ("kissing walls / papillary muscles").',
    clinicalMeaning:
      'Ağır hipovolemi (kanama, dehidratasyon) veya belirgin vazopleji (düşük SVR / anafilaksi / sepsis) tablosunu gösterir. Sol ventrikül pompasının kendisi hiperdinamiktir.',
    action:
      'Dengeli sıvı/kan ürünü bolusu verin ve LVEDA artışını canlı izleyin; eşlik eden vazopleji varsa (düşük MAP + normal/yüksek VTI) vazopresör ekleyin.',
  },
  {
    id: 'tg-sax-rwma',
    shortLabel: 'TG SAX (İskemi / RWMA)',
    title: 'Transgastrik Mid-Papiller SAX — Bölgesel Duvar Hareketi (RWMA)',
    level: 'TG · 40–45 cm',
    omniplane: '0°',
    status: 'critical',
    badgeText: 'LAD Alanı Akinezi · EKG ST’den Önce!',
    keyMetricLabel: 'Koroner Alan',
    keyMetricValue: 'LAD + LCx + RCA',
    finding:
      'Mid-papiller kısa eksen (TG SAX) üç ana koroner arterin (LAD: anterior/anteroseptal, LCx: lateral, RCA: inferior/inferoseptal) suladığı segmentleri tek karede gösterir. İskemik segmentte sistolik duvar kalınlaşması (< %30) ve içe hareket kaybolur (hipokinezi/akinezi).',
    clinicalMeaning:
      'İskemik kaskadda yeni başlayan RWMA, EKG ST-segment değişikliğinden daha erken (10–20 sn içinde) ve daha yüksek duyarlılıkla miyokard iskemisini yakalar!',
    action:
      'Koroner perfüzyon basıncını (MAP↑) optimize edin, taşikardiyi kontrol edin (O₂ talebini azaltın), anemiyi/hipoksiyi düzeltin ve cerrahi/kardiyoloji ekibini uyarın.',
  },
  {
    id: 'me-4c-pe-rv',
    shortLabel: 'ME 4C (Masif PE / RV)',
    title: 'Akut RV Yüklenmesi & Masif PE (RV > LV · D-Şekilli Septum)',
    level: 'ME · 30–35 cm',
    omniplane: '0°',
    status: 'critical',
    badgeText: 'RV/LV > 1.0 · McConnell İşareti',
    keyMetricLabel: 'RV:LV / TAPSE',
    keyMetricValue: '1.25 · 11 mm',
    finding:
      'Sağ ventrikül dilate olmuş ve LV’den büyük hâle gelmiştir (RV:LV > 1.0). İnterventriküler septum sola (LV içine) bombeleşir (kısa eksende D-sign). RV serbest duvar orta segmenti akinetik iken apeks kasılması korunur (McConnell işareti).',
    clinicalMeaning:
      'Akut masif pulmoner emboli, protamin krizi, ağır hipoksik pulmoner vazokonstriksiyon veya akut RV infarktüsü! Aşırı sıvı vermek septumu daha da sola iterek LV doluşunu çökertir.',
    action:
      'Aşırı sıvıdan KAÇININ! Norepinefrin/vazopresin ile RV koroner perfüzyonunu (MAP > mPAP) koruyun, O₂/iNO ile PVR’yi düşürün; ME Asc Ao SAX’ta ana PA içi trombüs arayın.',
  },
  {
    id: 'me-4c-tamponade',
    shortLabel: 'ME 4C (Tamponad)',
    title: 'Kardiyak Tamponad — Perikardiyal Efüzyon & RA/RV Kollapsı',
    level: 'ME · 30–35 cm',
    omniplane: '0°',
    status: 'critical',
    badgeText: 'Sistolik RA + Diyastolik RV Kollapsı!',
    keyMetricLabel: 'Efüzyon / Kollaps',
    keyMetricValue: '2.4 cm · Pozitif',
    finding:
      'Kalbi çevreleyen geniş anekoik (siyah) veya pıhtılı (post-KVC’de lokalize!) perikardiyal boşluk. Perikard basıncı odacık basıncını aştığında geç diyastol/sistolde RA duvarı, erken diyastolde RV serbest duvarı içe çöker.',
    clinicalMeaning:
      'Tamponad klinik + ekokardiyografik tanıdır: Az miktarda hızlı biriken kan (ör. post-KVC 150 mL pıhtı) bile lokalize LA/RV basısıyla ağır şok yapabilir.',
    action:
      'Acil perikardiyosentez / cerrahi drenaj (resternotomi)! Drenaja kadar spontan solunumu mümkünse koruyun, yüksek PEEP’ten kaçının, ön yükü ve kalp hızını (Full, Fast, Tight) koruyun.',
  },
  {
    id: 'me-lax-dissection',
    shortLabel: 'ME LAX (Aort Diseksiyonu)',
    title: 'ME Aort Uzun Eksen (ME AV LAX) — Tip A Aort Diseksiyonu',
    level: 'ME · 28–32 cm',
    omniplane: '120° – 140°',
    status: 'critical',
    badgeText: 'İntimal Flep · Gerçek vs Yalancı Lümen',
    keyMetricLabel: 'Çıkan Aorta',
    keyMetricValue: '5.4 cm · Flep (+)',
    finding:
      'Çıkan aorta içinde kardiyak siklusla bağımsız dalgalanan parlak lineer intimal flep görülür. Gerçek lümen (genellikle daha küçük, sistolde genişleyen, ileri akımlı) ile yalancı lümen (daha büyük, spontan eko kontrastı/trombüs) ayırt edilir.',
    clinicalMeaning:
      'TEE, Tip A aort diseksiyonunda %98 duyarlılığa sahiptir. Aynı anda aort yetmezliği (AY) mekanizması, koroner ostium tutulumu ve hemoperikardiyum (tamponad) da değerlendirilir.',
    action:
      'Acil kalp cerrahisi! Antimpulse tedavisi başlatın (SKB 100–120 mmHg, KH < 60/dk — önce beta-bloker, sonra vazodilatör). Reverberasyon artefaktını gerçek flepten mutlaka ayırt edin (M-mode + renkli Doppler).',
  },
  {
    id: 'me-bicaval-vae',
    shortLabel: 'ME Bicaval (VAE / SVC)',
    title: 'ME Bikaval (90°–110°) — Venöz Hava Embolisi & SVC Kollapsı',
    level: 'ME · 30–35 cm',
    omniplane: '90° – 110°',
    status: 'warning',
    badgeText: 'En Hassas VAE Monitörü (0.02 mL/kg)!',
    keyMetricLabel: 'SVC Δ / PFO',
    keyMetricValue: 'ΔSVC > %36 · Hava!',
    finding:
      'Sağa çevirme + 90°–110° omniplane ile SVC (sağda), IVC (solda), RA, LA ve interatriyal septum (fossa ovalis) net görülür. Hava kabarcıkları RA/SVC içinde parlak beyaz kar fırtınası (mikro-eko) oluşturur; PPV altında SVC kollapsı > %36 sıvı yanıtlılığını gösterir.',
    clinicalMeaning:
      'TEE, oturur pozisyon kraniyotomi/spinal cerrahide venöz hava embolisini EtCO₂ düşmeden önce yakalayan EN DUYARLI monitördür. Aynı kesitte PFO/paradoksik emboli ve SVK kılavuz telinin SVC–RA kavşağı konumu doğrulanır.',
    action:
      'Hava embolisi görülürse cerrahı hemen uyarın (sahayı salinle doldur/kemik mumu), N₂O’yu kapatıp %100 O₂ verin, Durant pozisyonu ve santral kateterden hava aspirasyonu uygulayın.',
  },
];

export const TeeMonitoringModule: React.FC<TeeMonitoringModuleProps> = ({ isDark }) => {
  // Section 1 Interactive Simulator State (Doppler Angle + LVOT VTI CO + Modified Bernoulli)
  const [lvotDiam, setLvotDiam] = useState<number>(2.1); // cm
  const [lvotVti, setLvotVti] = useState<number>(20); // cm
  const [hr, setHr] = useState<number>(72); // bpm
  const [dopplerAngle, setDopplerAngle] = useState<number>(10); // degrees (0..70)
  const [trVelocity, setTrVelocity] = useState<number>(2.6); // m/s
  const [cvpEst, setCvpEst] = useState<number>(8); // mmHg

  // Section 4 Interactive TEE View State
  const [selectedViewId, setSelectedViewId] = useState<TeeViewId>('me-4c-normal');

  // Calculations
  const lvotArea = Math.PI * Math.pow(lvotDiam / 2, 2); // cm²
  const trueSv = lvotArea * lvotVti; // mL
  const trueCo = (trueSv * hr) / 1000; // L/min
  const cosTheta = Math.cos((dopplerAngle * Math.PI) / 180);
  const measuredVti = lvotVti * cosTheta;
  const measuredSv = lvotArea * measuredVti;
  const measuredCo = (measuredSv * hr) / 1000;
  const angleErrorPct = Math.round((1 - cosTheta) * 100);

  // Modified Bernoulli (TR jet)
  const trueTrGrad = 4 * trVelocity * trVelocity;
  const estSpap = Math.round(trueTrGrad + cvpEst);
  const measuredTrVel = trVelocity * cosTheta;
  const measuredTrGrad = 4 * measuredTrVel * measuredTrVel;
  const measuredSpap = Math.round(measuredTrGrad + cvpEst);

  const selectedView =
    TEE_VIEW_CASES.find((v) => v.id === selectedViewId) ?? TEE_VIEW_CASES[0];

  const sectionCardClass = isDark
    ? 'rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5 space-y-4'
    : 'rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4 shadow-xs';

  const subCardClass = isDark
    ? 'rounded-xl border border-slate-800 bg-slate-950/60 p-3.5'
    : 'rounded-xl border border-slate-200 bg-slate-50/70 p-3.5';

  // Render dynamic ultrasound sector content per selected TEE view
  const renderUltrasoundSector = (viewId: TeeViewId) => {
    const sectorClipId = 'tee-sector-clip';
    return (
      <svg viewBox="0 0 420 265" className="w-full h-auto rounded-xl bg-[#04070d]">
        <defs>
          <clipPath id={sectorClipId}>
            <path d="M 210 18 L 36 235 A 255 255 0 0 0 384 235 Z" />
          </clipPath>
          <radialGradient id="tee-bg-grad" cx="50%" cy="8%" r="92%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.65" />
            <stop offset="65%" stopColor="#0b1220" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#04070d" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Sector Frame */}
        <path
          d="M 210 18 L 36 235 A 255 255 0 0 0 384 235 Z"
          fill="url(#tee-bg-grad)"
          stroke="#334155"
          strokeWidth="1.4"
        />

        {/* Depth Ticks on Right Edge */}
        {[58, 102, 146, 190, 234].map((y, idx) => (
          <g key={y}>
            <line x1="382" y1={y} x2="390" y2={y} stroke="#64748b" strokeWidth="1.2" />
            <text x="394" y={y + 3} fill="#64748b" fontSize="8.5" fontFamily="monospace">
              {(idx + 1) * 3}cm
            </text>
          </g>
        ))}

        {/* Transducer Origin Marker */}
        <circle cx="210" cy="18" r="4" fill="#c084fc" />
        <text x="210" y="12" fill="#c084fc" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          ÖZOFAGUS (PROB · 6 MHz)
        </text>

        {/* Omniplane Mini Dial (Top Left) */}
        <g transform="translate(36, 36)">
          <circle cx="0" cy="0" r="18" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
          <line
            x1="-14"
            y1="0"
            x2="14"
            y2="0"
            stroke="#c084fc"
            strokeWidth="2"
            transform={
              viewId === 'me-lax-dissection'
                ? 'rotate(125)'
                : viewId === 'me-bicaval-vae'
                  ? 'rotate(100)'
                  : 'rotate(0)'
            }
          />
          <text x="0" y="30" fill="#cbd5e1" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            {selectedView.omniplane}
          </text>
        </g>

        {/* Sector Interior per View */}
        <g clipPath={`url(#${sectorClipId})`}>
          {viewId === 'me-4c-normal' && (
            <>
              {/* LA (top-right of screen = patient left in standard ME 4C, actually in standard ASE ME 4C: LA is top-right, LV bottom-right; RA top-left, RV bottom-left!) */}
              {/* RA (top-left) */}
              <ellipse cx="164" cy="86" rx="34" ry="26" fill="#020617" stroke="#94a3b8" strokeWidth="3.5" />
              {/* LA (top-right) */}
              <ellipse cx="252" cy="84" rx="40" ry="28" fill="#020617" stroke="#94a3b8" strokeWidth="3.5" />
              {/* RV (bottom-left, smaller < 2/3 LV) */}
              <path d="M 134 114 C 122 154, 140 206, 178 222 C 194 198, 198 156, 194 114 Z" fill="#020617" stroke="#cbd5e1" strokeWidth="4.5" />
              {/* LV (bottom-right, bullet shaped, thick myocardium) */}
              <path d="M 208 114 C 204 166, 214 218, 250 232 C 288 218, 304 162, 290 114 Z" fill="#020617" stroke="#e2e8f0" strokeWidth="7" />
              {/* Mitral & Tricuspid leaflets */}
              <line x1="216" y1="112" x2="242" y2="128" stroke="#f8fafc" strokeWidth="2.5" />
              <line x1="284" y1="112" x2="258" y2="128" stroke="#f8fafc" strokeWidth="2.5" />
              <line x1="142" y1="114" x2="164" y2="128" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="190" y1="114" x2="172" y2="128" stroke="#cbd5e1" strokeWidth="2" />
              {/* Subtle normal blue diastolic inflow */}
              <path d="M 250 116 L 238 152 L 262 152 Z" fill="#38bdf8" fillOpacity="0.28" />
              <text x="164" y="89" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">RA</text>
              <text x="252" y="88" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">LA (Yakın)</text>
              <text x="164" y="168" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">RV</text>
              <text x="252" y="176" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">LV (Normal)</text>
              <text x="200" y="162" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">IVS</text>
            </>
          )}

          {viewId === 'tg-sax-hypovolemia' && (
            <>
              {/* Small thick hyperdynamic LV ring */}
              <circle cx="222" cy="148" r="56" fill="#1e293b" stroke="#e2e8f0" strokeWidth="10" />
              {/* Tiny obliterated cavity with kissing papillary muscles */}
              <circle cx="222" cy="148" r="24" fill="#020617" stroke="#94a3b8" strokeWidth="2" />
              {/* Anterolateral (bottom-right) & Posteromedial (top-left) papillary muscles touching! */}
              <ellipse cx="209" cy="137" rx="13" ry="10" fill="#cbd5e1" stroke="#f59e0b" strokeWidth="1.6" />
              <ellipse cx="235" cy="159" rx="13" ry="10" fill="#cbd5e1" stroke="#f59e0b" strokeWidth="1.6" />
              {/* Crescent RV on left */}
              <path d="M 156 112 C 122 132, 122 174, 158 190 C 146 164, 146 136, 156 112 Z" fill="#020617" stroke="#94a3b8" strokeWidth="3.5" />
              <text x="136" y="154" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">RV</text>
              <text x="222" y="76" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                İnferior (Üst · Yakın)
              </text>
              <text x="222" y="226" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                Anterior (Alt · Uzak)
              </text>
              <text x="222" y="151" fill="#f43f5e" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                KISSING!
              </text>
            </>
          )}

          {viewId === 'tg-sax-rwma' && (
            <>
              {/* LV short axis ring with 3 coronary territory arcs */}
              <circle cx="222" cy="148" r="64" fill="#020617" stroke="#475569" strokeWidth="12" />
              {/* RCA Inferior (top, near field) - normal thick green */}
              <path d="M 169 112 A 64 64 0 0 1 275 112" fill="none" stroke="#34d399" strokeWidth="11" />
              {/* LCx Lateral (right) - normal thick sky */}
              <path d="M 275 112 A 64 64 0 0 1 268 192" fill="none" stroke="#38bdf8" strokeWidth="11" />
              {/* LAD Anterior/Anteroseptal (bottom & bottom-left) - THIN AKINETIC RED! */}
              <path d="M 268 192 A 64 64 0 0 1 169 112" fill="none" stroke="#f43f5e" strokeWidth="5.5" strokeDasharray="6 3" />
              {/* Papillary muscles */}
              <circle cx="198" cy="126" r="10" fill="#94a3b8" />
              <circle cx="248" cy="168" r="10" fill="#94a3b8" />
              {/* RV */}
              <path d="M 148 112 C 110 132, 110 176, 148 194" fill="none" stroke="#64748b" strokeWidth="4" />
              <text x="222" y="72" fill="#34d399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                RCA · İnferior (Normal)
              </text>
              <text x="322" y="152" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                LCx (Lat.)
              </text>
              <text x="218" y="232" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                LAD · Anterior AKİNEZİ (RWMA!)
              </text>
            </>
          )}

          {viewId === 'me-4c-pe-rv' && (
            <>
              {/* Dilated RA & Massive RV pushing septum into LV */}
              <ellipse cx="152" cy="84" rx="44" ry="30" fill="#020617" stroke="#f59e0b" strokeWidth="3.5" />
              <ellipse cx="262" cy="84" rx="34" ry="24" fill="#020617" stroke="#94a3b8" strokeWidth="3" />
              {/* Massive Dilated RV (left) */}
              <path d="M 104 114 C 92 162, 120 220, 198 228 C 218 196, 224 154, 210 114 Z" fill="#020617" stroke="#f43f5e" strokeWidth="5" />
              {/* Compressed D-shaped LV (right) */}
              <path d="M 222 114 C 234 156, 232 198, 222 224 C 276 218, 296 164, 286 114 Z" fill="#020617" stroke="#e2e8f0" strokeWidth="6" />
              {/* Arrows pushing septum rightwards (toward LV) */}
              <path d="M 190 162 L 222 162" stroke="#facc15" strokeWidth="2.5" />
              <polygon points="222,162 214,157 214,167" fill="#facc15" />
              <text x="152" y="88" fill="#fbbf24" fontSize="10.5" fontWeight="bold" textAnchor="middle">Dilate RA</text>
              <text x="154" y="168" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">DEV RV (&gt;LV)</text>
              <text x="256" y="170" fill="#94a3b8" fontSize="10.5" fontWeight="bold" textAnchor="middle">Sıkışık LV</text>
              <text x="180" y="210" fill="#34d399" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                Apeks Korunmuş (McConnell)
              </text>
            </>
          )}

          {viewId === 'me-4c-tamponade' && (
            <>
              {/* Large black pericardial effusion halo */}
              <ellipse cx="210" cy="148" rx="126" ry="96" fill="#000000" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="210" y="64" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                GENİŞ PERİKARDİYAL EFÜZYON (SIVI/PIHTI)
              </text>
              {/* Collapsed RA & RV free walls bowing inward! */}
              <path d="M 150 86 Q 178 100, 184 114 L 198 114 L 198 82 Z" fill="#0f172a" stroke="#f43f5e" strokeWidth="3.5" />
              <ellipse cx="242" cy="96" rx="30" ry="20" fill="#0f172a" stroke="#94a3b8" strokeWidth="3" />
              {/* RV with inward free-wall collapse */}
              <path d="M 158 118 Q 186 154, 174 206 L 198 210 L 198 118 Z" fill="#0f172a" stroke="#f43f5e" strokeWidth="4" />
              {/* LV */}
              <path d="M 208 118 C 206 160, 214 204, 242 214 C 272 204, 282 158, 274 118 Z" fill="#0f172a" stroke="#e2e8f0" strokeWidth="5.5" />
              <text x="128" y="156" fill="#fb7185" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                RV Kollaps →
              </text>
              <text x="242" y="168" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">LV</text>
            </>
          )}

          {viewId === 'me-lax-dissection' && (
            <>
              {/* LA (top) */}
              <ellipse cx="206" cy="76" rx="54" ry="26" fill="#020617" stroke="#94a3b8" strokeWidth="3.5" />
              {/* LVOT & LV (bottom-left) */}
              <path d="M 94 128 C 122 114, 162 112, 198 116 L 204 164 C 160 184, 118 192, 92 174 Z" fill="#020617" stroke="#e2e8f0" strokeWidth="6" />
              {/* Dilated Ascending Aorta (right) */}
              <path d="M 202 104 L 348 90 L 352 162 L 204 166 Z" fill="#020617" stroke="#cbd5e1" strokeWidth="4.5" />
              {/* Bright undulating intimal flap! */}
              <path d="M 218 128 Q 254 114, 286 132 Q 318 148, 348 126" fill="none" stroke="#f43f5e" strokeWidth="3.5" />
              {/* True lumen color flow */}
              <path d="M 218 142 L 336 144" stroke="#38bdf8" strokeWidth="8" strokeOpacity="0.32" strokeLinecap="round" />
              <text x="206" y="79" fill="#c084fc" fontSize="10.5" fontWeight="bold" textAnchor="middle">LA</text>
              <text x="144" y="154" fill="#e2e8f0" fontSize="10.5" fontWeight="bold" textAnchor="middle">LVOT</text>
              <text x="284" y="110" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">Yalancı Lümen</text>
              <text x="284" y="156" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Gerçek Lümen</text>
              <text x="284" y="188" fill="#fb7185" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                İNTİMAL FLEP (TİP A DİSEKSİYON!)
              </text>
            </>
          )}

          {viewId === 'me-bicaval-vae' && (
            <>
              {/* LA (top, near field) */}
              <path d="M 108 66 Q 210 46, 312 66 L 302 114 Q 210 104, 118 114 Z" fill="#020617" stroke="#94a3b8" strokeWidth="3.5" />
              {/* Interatrial Septum + Fossa Ovalis */}
              <path d="M 118 114 Q 210 108, 302 114" fill="none" stroke="#e2e8f0" strokeWidth="4" />
              {/* RA (bottom center) + IVC (left) + SVC (right) */}
              <path d="M 64 134 L 136 132 Q 210 112, 284 130 L 356 124 L 356 174 L 284 176 Q 210 212, 136 178 L 64 176 Z" fill="#020617" stroke="#cbd5e1" strokeWidth="4" />
              {/* Bright Venous Air Embolism microbubbles entering from SVC into RA! */}
              {[
                [334, 142], [318, 150], [304, 140], [286, 152], [268, 146], [250, 160],
                [234, 148], [218, 162], [202, 152], [294, 160], [262, 164], [240, 138],
              ].map(([cx, cy], idx) => (
                <circle key={idx} cx={cx} cy={cy} r={idx % 3 === 0 ? 3.2 : 2.2} fill="#f8fafc" stroke="#38bdf8" strokeWidth="0.8" />
              ))}
              <text x="210" y="88" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">LA</text>
              <text x="210" y="126" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">IAS (Fossa Ovalis / PFO)</text>
              <text x="102" y="158" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">IVC</text>
              <text x="320" y="116" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">SVC (Sağ)</text>
              <text x="210" y="192" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                RA · HAVA EMBOLİSİ (MİKRO-EKO!)
              </text>
            </>
          )}
        </g>
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Clinical Hero Strip */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 ${
          isDark
            ? 'bg-gradient-to-br from-purple-950/45 via-slate-900 to-slate-900 border-purple-500/30'
            : 'bg-gradient-to-br from-purple-50/90 via-white to-slate-50 border-purple-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                    : 'bg-purple-100 text-purple-800 border-purple-200'
                }`}
              >
                İleri Kardiyak Görüntüleme · ASE / SCA
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                6 Bölümlü Sistematik Çerçeve · 7 Temel/Rescue Kesit + Canlı Doppler Simülatörü
              </span>
            </div>
            <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              TEE (Transözofageal Ekokardiyografi Monitörizasyonu)
            </h3>
            <p className={`text-xs leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Özofagusun sol atriyum arkasındaki engelsiz akustik penceresinden 5–7 MHz yüksek çözünürlüklü görüntüleme,
              gerçek zamanlı biventriküler doluş/kontraktilite, en erken miyokard iskemisi (RWMA), kapak/aort patolojisi ve
              Doppler kardiyak debi izlemi.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
            {[
              { label: 'Frekans', value: '5–7 MHz', tone: 'text-purple-500' },
              { label: 'Omniplane', value: '0° – 180°', tone: 'text-sky-500' },
              { label: 'Temel Seri', value: '11 Basic View', tone: 'text-emerald-500' },
              { label: 'LVOT VTI', value: '18–22 cm', tone: 'text-amber-500' },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-xl border px-3 py-2 text-center ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[10px] font-semibold text-slate-400">{item.label}</div>
                <div className={`text-xs font-mono font-bold mt-0.5 tabular-nums ${item.tone}`}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 1: FİZİKSEL PRENSİP VE ÇALIŞMA MEKANİZMASI */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            1
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Fiziksel Prensip ve Çalışma Mekanizması
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Piezoelektrik 5–7 MHz Akustik Pencere, Doppler Kayması (cos θ), Modifiye Bernoulli (ΔP = 4v²) ve LVOT VTI
            </p>
          </div>
        </div>

        {/* Visual 1A: Dual Physics Diagrams */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left SVG: Piezoelectric Resolution vs Acoustic Window */}
          <div className={subCardClass}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                A. Özofagus Akustik Penceresi & Doppler Modları
              </span>
              <span className="text-[10px] font-mono text-purple-500 font-bold">c = 1540 m/s · f ↑ → λ ↓</span>
            </div>

            <svg viewBox="0 0 460 210" className="w-full h-auto rounded-lg">
              <rect x="0" y="0" width="460" height="210" rx="10" fill={isDark ? '#090d16' : '#f8fafc'} />

              {/* TTE vs TEE comparison */}
              <rect x="14" y="12" width="212" height="108" rx="8" fill={isDark ? '#111827' : '#ffffff'} stroke={isDark ? '#334155' : '#cbd5e1'} />
              <text x="24" y="29" fill="#94a3b8" fontSize="9.5" fontWeight="bold">TTE (2–3.5 MHz · Göğüs Duvarı)</text>
              <text x="24" y="46" fill="#f43f5e" fontSize="8.8">✕ Kosta + akciğer havası + obezite engeli</text>
              <text x="24" y="61" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">• Derin penetrasyon, daha düşük çözünürlük</text>
              <line x1="24" y1="72" x2="214" y2="72" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
              <text x="24" y="88" fill="#c084fc" fontSize="9.5" fontWeight="bold">TEE (5–7 MHz · Posterior LA Komşu)</text>
              <text x="24" y="104" fill="#34d399" fontSize="8.8">✓ Engelsiz pencere → Yüksek aksiyel çözünürlük!</text>

              {/* Doppler Modes box */}
              <rect x="236" y="12" width="210" height="108" rx="8" fill={isDark ? '#111827' : '#ffffff'} stroke="#a855f7" strokeWidth="1.2" />
              <text x="246" y="29" fill="#c084fc" fontSize="9.5" fontWeight="bold">DOPPLER MODLARI & BART KURALI</text>
              <text x="246" y="47" fill="#38bdf8" fontSize="8.8" fontWeight="bold">BART: Blue Away · Red Toward</text>
              <text x="246" y="64" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.5">• PW Doppler: Tek nokta derinlik seçer,</text>
              <text x="254" y="76" fill="#fbbf24" fontSize="8.2">ama yüksek hızda Aliasing (Nyquist) olur!</text>
              <text x="246" y="93" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="8.5">• CW Doppler: Aliasing YOK (AS/TR ölçer),</text>
              <text x="254" y="105" fill="#94a3b8" fontSize="8.2">ama hat boyunca tüm hızları toplar.</text>

              {/* Bottom Formula Banner */}
              <rect x="14" y="130" width="432" height="68" rx="8" fill={isDark ? '#1e1b4b' : '#f5f3ff'} stroke={isDark ? '#6d28d9' : '#ddd6fe'} />
              <text x="26" y="149" fill={isDark ? '#e9d5ff' : '#6b21a8'} fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Doppler: Δf = (2 · f₀ · v · cos θ) / c   |   Bernoulli: ΔP = 4 · v²
              </text>
              <text x="26" y="168" fill={isDark ? '#f8fafc' : '#1e293b'} fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                Atım Hacmi (SV) = π · (D<tspan dy="2" fontSize="7">LVOT</tspan><tspan dy="-2"> / 2)² · VTI</tspan><tspan dy="2" fontSize="7">LVOT</tspan><tspan dy="-2">   |   CO = SV × KH</tspan>
              </text>
              <text x="26" y="186" fill="#fbbf24" fontSize="8.5" fontWeight="bold">
                KRİTİK: Açı θ &gt; 20° hızı düşük ölçer! LVOT çapı karesel etki eder (2 mm hata ≈ %20 SV hatası)!
              </text>
            </svg>
          </div>

          {/* Right SVG: Live Doppler Angle Vector Visualization */}
          <div className={subCardClass}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                B. Canlı İnsonasyon Açısı (θ = {dopplerAngle}°) & Hız Kaybı
              </span>
              <span
                className={`text-[10px] font-mono font-bold ${
                  dopplerAngle > 20 ? 'text-rose-500' : 'text-emerald-500'
                }`}
              >
                cos({dopplerAngle}°) = {cosTheta.toFixed(2)} (−%{angleErrorPct})
              </span>
            </div>

            <svg viewBox="0 0 460 210" className="w-full h-auto rounded-lg">
              <rect x="0" y="0" width="460" height="210" rx="10" fill={isDark ? '#090d16' : '#f8fafc'} />

              {/* Vessel / LVOT tube */}
              <rect x="34" y="102" width="392" height="54" rx="8" fill={isDark ? '#1e293b' : '#e2e8f0'} fillOpacity="0.45" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.6" />
              {/* Blood flow vector arrow */}
              <line x1="90" y1="129" x2="364" y2="129" stroke="#38bdf8" strokeWidth="3.5" />
              <polygon points="368,129 354,122 354,136" fill="#38bdf8" />
              <text x="358" y="118" fill="#38bdf8" fontSize="9.5" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                Kan Akımı (v_gerçek)
              </text>

              {/* Doppler Ultrasound Beam at angle dopplerAngle */}
              {(() => {
                const rad = (dopplerAngle * Math.PI) / 180;
                const originX = 210;
                const originY = 129;
                const len = 104;
                const probeX = originX - len * Math.cos(rad);
                const probeY = originY - len * Math.sin(rad);
                return (
                  <>
                    <line
                      x1={probeX}
                      y1={probeY}
                      x2={originX}
                      y2={originY}
                      stroke={dopplerAngle > 20 ? '#f43f5e' : '#c084fc'}
                      strokeWidth="2.8"
                      strokeDasharray="5 3"
                    />
                    <circle cx={probeX} cy={probeY} r="7" fill={dopplerAngle > 20 ? '#f43f5e' : '#c084fc'} />
                    <circle cx={originX} cy={originY} r="4.5" fill="#facc15" />
                    <text
                      x={Math.max(54, probeX)}
                      y={Math.max(18, probeY - 12)}
                      fill={dopplerAngle > 20 ? '#fb7185' : '#e879f9'}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      US Demeti (θ = {dopplerAngle}°)
                    </text>
                  </>
                );
              })()}

              {/* Status Banner bottom */}
              <rect
                x="14"
                y="168"
                width="432"
                height="32"
                rx="6"
                fill={
                  dopplerAngle > 20
                    ? isDark
                      ? '#3b0d15'
                      : '#fff1f2'
                    : isDark
                      ? '#0c241d'
                      : '#ecfdf5'
                }
                stroke={dopplerAngle > 20 ? '#f43f5e' : '#10b981'}
              />
              <text
                x="230"
                y="188"
                fill={dopplerAngle > 20 ? '#fb7185' : '#10b981'}
                fontSize="9.5"
                fontWeight="bold"
                textAnchor="middle"
                fontFamily="monospace"
              >
                {dopplerAngle <= 20
                  ? `✓ KABUL EDİLEBİLİR (θ ≤ 20°): Hız kaybı yalnızca %${angleErrorPct} (DTG LAX / TG LAX paralel!)`
                  : `⚠ AÇI HATASI (θ > 20°): Hız %${angleErrorPct} DÜŞÜK ölçülür → CO ve AS/TR gradienti küçümsenir!`}
              </text>
            </svg>
          </div>
        </div>

        {/* Interactive Simulator 1B */}
        <div
          className={`rounded-xl border p-4 space-y-4 ${
            isDark ? 'bg-slate-950/80 border-purple-500/30' : 'bg-purple-50/40 border-purple-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-500" />
              <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Canlı LVOT VTI (SV / CO), Doppler Açı (cos θ) & Modifiye Bernoulli (sPAP) Simülatörü
              </span>
            </div>
            <span className="text-[11px] font-mono text-purple-500 font-semibold">
              DTG LAX / ME 4C · Anlık Hesaplama
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Left Sliders */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  label: 'LVOT Çapı (ME LAX)',
                  val: `${lvotDiam.toFixed(1)} cm`,
                  min: 1.6,
                  max: 2.6,
                  step: 0.1,
                  value: lvotDiam,
                  onChange: setLvotDiam,
                  accent: 'accent-purple-500',
                },
                {
                  label: 'Gerçek LVOT VTI',
                  val: `${lvotVti} cm`,
                  min: 8,
                  max: 28,
                  step: 1,
                  value: lvotVti,
                  onChange: setLvotVti,
                  accent: 'accent-sky-500',
                },
                {
                  label: 'Kalp Hızı (KH)',
                  val: `${hr} /dk`,
                  min: 45,
                  max: 130,
                  step: 1,
                  value: hr,
                  onChange: setHr,
                  accent: 'accent-emerald-500',
                },
                {
                  label: 'Doppler Açısı (θ)',
                  val: `${dopplerAngle}°`,
                  min: 0,
                  max: 65,
                  step: 5,
                  value: dopplerAngle,
                  onChange: setDopplerAngle,
                  accent: 'accent-rose-500',
                },
                {
                  id: 'tr-vel',
                  label: (
                    <>
                      TR Jet Hızı (v<sub>TR</sub>)
                    </>
                  ),
                  val: `${trVelocity.toFixed(1)} m/s`,
                  min: 2.0,
                  max: 4.8,
                  step: 0.1,
                  value: trVelocity,
                  onChange: setTrVelocity,
                  accent: 'accent-amber-500',
                },
                {
                  id: 'cvp-est',
                  label: 'Tahmini CVP / RAP',
                  val: `${cvpEst} mmHg`,
                  min: 4,
                  max: 20,
                  step: 1,
                  value: cvpEst,
                  onChange: setCvpEst,
                  accent: 'accent-cyan-500',
                },
              ].map((ctrl, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{ctrl.label}</span>
                    <span className="font-mono font-bold tabular-nums text-purple-500">{ctrl.val}</span>
                  </div>
                  <input
                    type="range"
                    min={ctrl.min}
                    max={ctrl.max}
                    step={ctrl.step}
                    value={ctrl.value}
                    onChange={(e) => ctrl.onChange(Number(e.target.value))}
                    className={`w-full h-1.5 rounded-lg cursor-pointer ${ctrl.accent}`}
                  />
                </div>
              ))}
            </div>

            {/* Right Live Readout Cards */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className={`rounded-xl border p-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-semibold text-slate-400">LVOT Alanı (CSA)</div>
                <div className="text-base font-mono font-bold tabular-nums text-purple-500 mt-0.5">
                  {lvotArea.toFixed(2)} cm²
                </div>
                <div className="text-[9.5px] font-mono text-slate-400">π × (D/2)²</div>
              </div>

              <div className={`rounded-xl border p-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-semibold text-slate-400">Gerçek SV (θ=0°)</div>
                <div className="text-base font-mono font-bold tabular-nums text-emerald-500 mt-0.5">
                  {Math.round(trueSv)} mL
                </div>
                <div className="text-[9.5px] font-mono text-slate-400">Gerçek CO: {trueCo.toFixed(1)} L/dk</div>
              </div>

              <div
                className={`rounded-xl border p-3 ${
                  dopplerAngle > 20
                    ? isDark
                      ? 'bg-rose-500/10 border-rose-500/40'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[10px] font-semibold text-slate-400">Ölçülen CO ({dopplerAngle}°)</div>
                <div
                  className={`text-base font-mono font-bold tabular-nums mt-0.5 ${
                    dopplerAngle > 20 ? 'text-rose-500' : 'text-sky-500'
                  }`}
                >
                  {measuredCo.toFixed(1)} L/dk
                </div>
                <div className="text-[9.5px] font-mono text-slate-400">
                  SV: {Math.round(measuredSv)} mL (−%{angleErrorPct})
                </div>
              </div>

              <div className={`rounded-xl border p-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-semibold text-slate-400">TR Gradient (4v²)</div>
                <div className="text-base font-mono font-bold tabular-nums text-amber-500 mt-0.5">
                  {Math.round(trueTrGrad)} mmHg
                </div>
                <div className="text-[9.5px] font-mono text-slate-400">
                  Ölçülen: {Math.round(measuredTrGrad)} mmHg
                </div>
              </div>

              <div
                className={`col-span-2 rounded-xl border p-3 ${
                  estSpap >= 45
                    ? isDark
                      ? 'bg-rose-500/10 border-rose-500/40'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-slate-400">Tahmini sPAP (4v² + CVP)</span>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Açı ile: {measuredSpap} mmHg
                  </span>
                </div>
                <div
                  className={`text-base font-mono font-bold tabular-nums mt-0.5 ${
                    estSpap >= 45 ? 'text-rose-500' : 'text-emerald-500'
                  }`}
                >
                  {estSpap} mmHg{' '}
                  <span className="text-xs font-sans font-semibold">
                    {estSpap >= 55 ? '(Ağır Pulmoner HT!)' : estSpap >= 38 ? '(Pulmoner HT Şüphesi)' : '(Normal sPAP)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ENDİKASYONLAR VE KLİNİK AMAÇ */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            2
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Endikasyonlar ve Klinik Amaç
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Rescue TEE (Açıklanamayan Şok/Arrest), Kardiyak & Aort Cerrahisi, İskemik Kaskad (RWMA) ve Dinamik Sıvı İzlemi
            </p>
          </div>
        </div>

        {/* Visual 2A: 4-Panel ASA/SCA Indication Infographic */}
        <svg viewBox="0 0 880 170" className="w-full h-auto rounded-xl">
          <rect x="0" y="0" width="880" height="170" rx="12" fill={isDark ? '#090d16' : '#f8fafc'} />

          {/* Panel 1: Rescue TEE */}
          <rect x="14" y="14" width="204" height="142" rx="10" fill={isDark ? '#2a1215' : '#fff1f2'} stroke="#f43f5e" strokeWidth="1.2" />
          <text x="26" y="34" fill="#f43f5e" fontSize="10.5" fontWeight="bold">1. RESCUE TEE (ACİL ŞOK)</text>
          <text x="26" y="54" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.3">• Dirençli açıklanamayan hipotansiyon</text>
          <text x="26" y="70" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.3">• İntraop kardiyak arrest (CPR anı)</text>
          <text x="26" y="86" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.3">• Ani hipoksemi / masif PE / VAE</text>
          <text x="26" y="102" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9.3">• Şüpheli tamponad / akut MY</text>
          <rect x="26" y="118" width="180" height="26" rx="5" fill="#f43f5e" fillOpacity="0.16" />
          <text x="116" y="135" fill="#fb7185" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            5 dk’da Nedene Yönelik Tanı!
          </text>

          {/* Panel 2: Cardiac & Aortic Surgery */}
          <rect x="230" y="14" width="204" height="142" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#a855f7" strokeWidth="1.2" />
          <text x="242" y="34" fill="#c084fc" fontSize="10.5" fontWeight="bold">2. KVC & AORT CERRAHİSİ</text>
          <text x="242" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• Açık kalp & kapak onarımı/değişimi</text>
          <text x="242" y="70" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• Tip A aort diseksiyonu / TEVAR</text>
          <text x="242" y="86" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• CPB çıkışı: hava, paravalvüler kaçak</text>
          <text x="242" y="102" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• SAM, LVAD/ECMO kanül konumu</text>
          <rect x="242" y="118" width="180" height="26" rx="5" fill="#a855f7" fillOpacity="0.16" />
          <text x="332" y="135" fill="#d8b4fe" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            ASA/SCA Sınıf I Endikasyon
          </text>

          {/* Panel 3: Early Ischemia (RWMA) */}
          <rect x="446" y="14" width="204" height="142" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#f59e0b" strokeWidth="1.2" />
          <text x="458" y="34" fill="#f59e0b" fontSize="10.5" fontWeight="bold">3. EN ERKEN İSKEMİ (RWMA)</text>
          <text x="458" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• Perfüzyon ↓ → Diyastolik boz. →</text>
          <text x="458" y="70" fill="#fbbf24" fontSize="9.3" fontWeight="bold">  RWMA (10–20 sn!) → EKG ST</text>
          <text x="458" y="86" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• TG Mid-SAX: LAD + LCx + RCA</text>
          <text x="458" y="102" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• Yeni akinezi / kalınlaşma kaybı</text>
          <rect x="458" y="118" width="180" height="26" rx="5" fill="#f59e0b" fillOpacity="0.15" />
          <text x="548" y="135" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            EKG’den Daha Erken & Hassas
          </text>

          {/* Panel 4: Dynamic Volume & Transplant */}
          <rect x="662" y="14" width="204" height="142" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#0ea5e9" strokeWidth="1.2" />
          <text x="674" y="34" fill="#0ea5e9" fontSize="10.5" fontWeight="bold">4. SIVI & ÖZEL CERRAHİ</text>
          <text x="674" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• Karaciğer / akciğer transplantasyonu</text>
          <text x="674" y="70" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• Oturur pozisyon (VAE 0.02 mL/kg)</text>
          <text x="674" y="86" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• ΔSVC &gt; %36 (PPV sıvı yanıtı)</text>
          <text x="674" y="102" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9.3">• LVOT VTI & LVEDA seri takibi</text>
          <rect x="674" y="118" width="180" height="26" rx="5" fill="#0ea5e9" fillOpacity="0.15" />
          <text x="764" y="135" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Dinamik Ön Yük Değerlendirmesi
          </text>
        </svg>
      </section>

      {/* SECTION 3: TEKNİK KURULUM VE KALİBRASYON */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            3
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Teknik Kurulum, Prob Manipülasyonu ve Kontrendikasyonlar
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              4 Özofagus Seviyesi (UE / ME / TG / DTG), 6 Temel Prob Hareketi, Omniplane (0°–180°) ve Mutlak Kontrendikasyonlar
            </p>
          </div>
        </div>

        {/* Visual 3A: Depth Levels & Probe Manipulation Diagram */}
        <div className={subCardClass}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              <Compass className="w-3.5 h-3.5 text-purple-500" />
              4 Görüntüleme Seviyesi (Dişlerden Derinlik) & Prob Manipülasyon Haritası
            </span>
            <span className="text-[10px] font-mono text-amber-500 font-bold">Bite Block Zorunlu · Tekerler KİLİTSİZ!</span>
          </div>

          <svg viewBox="0 0 860 215" className="w-full h-auto rounded-lg">
            <rect x="0" y="0" width="860" height="215" rx="10" fill={isDark ? '#090d16' : '#f8fafc'} />

            {/* Left: Esophageal Depth Ladder */}
            <rect x="14" y="14" width="430" height="187" rx="8" fill={isDark ? '#111827' : '#ffffff'} stroke={isDark ? '#334155' : '#cbd5e1'} />
            <text x="28" y="34" fill="#c084fc" fontSize="10" fontWeight="bold">ÖZOFAGUS SEVİYELERİ (DİŞ HİZASINDAN)</text>

            {/* Vertical Esophagus Line */}
            <line x1="78" y1="48" x2="78" y2="188" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.45" />
            {[
              { y: 60, code: 'UE', depth: '20–25 cm', views: 'Aort Arkusu · Ana PA · Pulmoner Venler', color: '#38bdf8' },
              { y: 100, code: 'ME', depth: '30–35 cm', views: 'ME 4C (0°), ME 2C (90°), ME LAX (120°), AV SAX (35°), Bikaval (100°)', color: '#c084fc' },
              { y: 142, code: 'TG', depth: '40–45 cm', views: 'TG Mid-Papiller SAX (0°, antefleks!) · TG 2C (90°) · TG LAX (120°)', color: '#34d399' },
              { y: 180, code: 'DTG', depth: '45–50 cm', views: 'Deep TG LAX (0° + maks antefleksiyon) → LVOT/AV CW Doppler!', color: '#f59e0b' },
            ].map((lvl) => (
              <g key={lvl.code}>
                <circle cx="78" cy={lvl.y} r="7" fill={lvl.color} />
                <text x="30" y={lvl.y + 4} fill={lvl.color} fontSize="10" fontWeight="bold" fontFamily="monospace">
                  {lvl.code}
                </text>
                <text x="96" y={lvl.y - 2} fill={isDark ? '#f8fafc' : '#0f172a'} fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                  {lvl.depth}
                </text>
                <text x="164" y={lvl.y - 2} fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.8">
                  {lvl.views}
                </text>
              </g>
            ))}

            {/* Right: 6 Probe Manipulations */}
            <rect x="458" y="14" width="388" height="187" rx="8" fill={isDark ? '#111827' : '#ffffff'} stroke="#a855f7" strokeWidth="1.2" />
            <text x="472" y="34" fill="#c084fc" fontSize="10" fontWeight="bold">6 TEMEL PROB HAREKETİ & OMNIPLANE</text>

            {[
              { x: 472, y: 48, title: '1. İlerlet / Geri Çek', desc: 'UE ↔ ME ↔ TG ↔ DTG dikey derinlik', color: '#38bdf8' },
              { x: 664, y: 48, title: '2. Sağa / Sola Çevir', desc: 'Sağ (saat yönü) → RA/Bikaval · Sol → İnen Aorta', color: '#34d399' },
              { x: 472, y: 100, title: '3. Ante / Retrofleksiyon', desc: 'Büyük teker · TG SAX için antefleksiyon!', color: '#f59e0b' },
              { x: 664, y: 100, title: '4. Sağ / Sol Fleksiyon', desc: 'Küçük teker · İnce lateral merkezleme', color: '#fb7185' },
              { x: 472, y: 152, title: '5. Omniplane (0°→180°)', desc: '0°:4C · 35°:AV SAX · 60°:Komisür · 90°:2C · 120°:LAX', color: '#c084fc', wide: true },
            ].map((item) => (
              <g key={item.title}>
                <rect
                  x={item.x}
                  y={item.y}
                  width={item.wide ? 360 : 180}
                  height="42"
                  rx="6"
                  fill={isDark ? '#0b1220' : '#f8fafc'}
                  stroke={item.color}
                  strokeWidth="1"
                />
                <text x={item.x + 8} y={item.y + 16} fill={item.color} fontSize="9.2" fontWeight="bold">
                  {item.title}
                </text>
                <text x={item.x + 8} y={item.y + 32} fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.3">
                  {item.desc}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Setup & Contraindications 2-Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={subCardClass}>
            <div className="flex items-center gap-2 mb-2.5">
              <Wrench className="w-4 h-4 text-emerald-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Güvenli Yerleştirme & Görüntü Optimizasyonu
              </span>
            </div>
            <ul className={`space-y-1.5 text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Hazırlık:</strong> Prob kılıfını çatlak/elektriksel kaçak açısından kontrol edin; ısırma bloğunu (bite block) mutlaka baştan yerleştirin; tekerleri <strong>KİLİTSİZ</strong> bırakın.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Yerleştirme:</strong> Çene kaldırma (jaw thrust) ile orta hattan nazikçe ilerletin; direnç varsa ASLA zorlamayın — gerekirse direkt/video laringoskopi altında krikofaringeal girişi görün.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Kalibrasyon:</strong> EKG kablosunu bağlayın (sistol/diyastol zamanlaması!), renkli Doppler Nyquist sınırını <strong>50–60 cm/s</strong>’ye ayarlayın; odak noktasını hedef kapağa getirin.</span>
              </li>
            </ul>
          </div>

          <div className={subCardClass}>
            <div className="flex items-center gap-2 mb-2.5">
              <ClipboardList className="w-4 h-4 text-rose-500" />
              <span className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Kontrendikasyonlar (ASE / ASA Kılavuzu)
              </span>
            </div>
            <div className="space-y-2 text-xs">
              <div className={`rounded-lg p-2.5 border ${isDark ? 'bg-rose-950/30 border-rose-500/30' : 'bg-rose-50 border-rose-200'}`}>
                <div className="font-bold text-rose-500 mb-0.5">Mutlak Kontrendikasyonlar:</div>
                <p className={isDark ? 'text-rose-200' : 'text-rose-900'}>
                  Özofagus striktürü, tümörü, perforasyonu/laserasyonu, semptomatik özofagus divertikülü, aktif üst GİS kanaması, yakın özofajektomi / özofagokutanöz fistül.
                </p>
              </div>
              <div className={`rounded-lg p-2.5 border ${isDark ? 'bg-amber-950/25 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
                <div className="font-bold text-amber-500 mb-0.5">Göreceli Kontrendikasyonlar (Fayda &gt; Risk):</div>
                <p className={isDark ? 'text-amber-200' : 'text-amber-900'}>
                  Özofagus varisleri (Child-Pugh/bandlama öyküsü), şiddetli koagülopati/trombositopeni, mediastinal radyoterapi, servikal omurga instabilitesi, semptomatik hiatal herni, ağır özofajit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: NORMAL VE PATOLOJİK PENCERELER / BULGULAR */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            4
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Normal ve Patolojik Ekokardiyografi Pencereleri (İnteraktif TEE Monitörü)
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              7 Kritik Perioperatif Kesit: ME 4C Normal, Hipovolemi (Kissing), RWMA İskemi, Masif PE (RV), Tamponad, Tip A Diseksiyon ve Bicaval VAE
            </p>
          </div>
        </div>

        {/* View Selector Buttons */}
        <div className="flex flex-wrap gap-1.5">
          {TEE_VIEW_CASES.map((item) => {
            const active = item.id === selectedViewId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedViewId(item.id)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                      : 'bg-purple-600 border-purple-600 text-white'
                    : isDark
                      ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-purple-300'
                }`}
              >
                {item.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Dark Ultrasound Monitor Console */}
        <div className="rounded-2xl bg-[#050810] border border-slate-800 p-4 space-y-4">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Scan className="w-4 h-4 text-purple-400" />
                <span className="text-xs sm:text-sm font-bold text-white">{selectedView.title}</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {selectedView.level} · Omniplane {selectedView.omniplane}
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono tabular-nums">
              <div className="text-right">
                <div className="text-[10px] text-purple-400 uppercase">{selectedView.keyMetricLabel}</div>
                <div className="text-sm font-bold text-white">{selectedView.keyMetricValue}</div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${
                  selectedView.status === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : selectedView.status === 'warning'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}
              >
                {selectedView.badgeText}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Ultrasound Sector Visualization */}
            <div className="lg:col-span-6">{renderUltrasoundSector(selectedView.id)}</div>

            {/* 3 Structured Clinical Panels */}
            <div className="lg:col-span-6 space-y-2.5 text-xs">
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3">
                <div className="text-[10px] font-mono font-bold uppercase text-purple-400 mb-1">
                  Ekokardiyografik Bulgu
                </div>
                <p className="text-slate-300 leading-relaxed">{selectedView.finding}</p>
              </div>
              <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3">
                <div className="text-[10px] font-mono font-bold uppercase text-amber-400 mb-1">
                  Hemodinamik & Klinik Anlam
                </div>
                <p className="text-slate-300 leading-relaxed">{selectedView.clinicalMeaning}</p>
              </div>
              <div className="rounded-xl bg-slate-900/90 border border-emerald-500/30 p-3">
                <div className="text-[10px] font-mono font-bold uppercase text-emerald-400 mb-1">
                  Yatak Başı Aksiyon
                </div>
                <p className="text-emerald-100 leading-relaxed font-medium">{selectedView.action}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LİMİTASYONLAR VE ARTEFAKTLAR */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            5
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Limitasyonlar ve Ultrason Artefaktları
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Reverberasyon (Yalancı Diseksiyon), Akustik Gölgeleme, Distal Aort Kör Noktası ve Normal Anatomik Tuzaklar
            </p>
          </div>
        </div>

        {/* Visual 5A: 3-Zone Ultrasound Artifact SVG */}
        <svg viewBox="0 0 860 156" className="w-full h-auto rounded-xl">
          <rect x="0" y="0" width="860" height="156" rx="12" fill={isDark ? '#090d16' : '#f8fafc'} />

          {/* Zone 1 */}
          <rect x="14" y="14" width="268" height="128" rx="10" fill={isDark ? '#1e1628' : '#faf5ff'} stroke="#a855f7" strokeWidth="1.2" />
          <text x="26" y="34" fill="#c084fc" fontSize="10.5" fontWeight="bold">1. REVERBERASYON & GÖLGELEME</text>
          <text x="26" y="54" fill={isDark ? '#e9d5ff' : '#581c87'} fontSize="9">• Reverberasyon (Çift Yansıma):</text>
          <text x="34" y="67" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">Çıkan aortada yalancı intimal flep taklidi!</text>
          <text x="26" y="86" fill={isDark ? '#e9d5ff' : '#581c87'} fontSize="9">• Akustik Gölgeleme (Shadowing):</text>
          <text x="34" y="99" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">Mekanik kapak / kalsiyum arkası karanlık kalır</text>
          <text x="26" y="122" fill="#34d399" fontSize="8.8" fontWeight="bold">✓ Çözüm: 2 farklı kesit + TG pencereden bak!</text>

          {/* Zone 2 */}
          <rect x="296" y="14" width="268" height="128" rx="10" fill={isDark ? '#1c1910' : '#fffbeb'} stroke="#f59e0b" strokeWidth="1.2" />
          <text x="308" y="34" fill="#f59e0b" fontSize="10.5" fontWeight="bold">2. KÖR NOKTA & DOPPLER TUZAĞI</text>
          <text x="308" y="54" fill={isDark ? '#fde68a' : '#92400e'} fontSize="9">• "Blind Spot" (Hava Gölgelenmesi):</text>
          <text x="316" y="67" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">Trakea/sol ana bronş distal çıkan aorta ve</text>
          <text x="316" y="79" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">proksimal arkusu gizler (epiaortik US gerekir)</text>
          <text x="308" y="98" fill={isDark ? '#fde68a' : '#92400e'} fontSize="9">• Açı &gt; 20° / PW Aliasing:</text>
          <text x="316" y="111" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">AS/TR gradienti yalancı düşük çıkar!</text>
          <text x="308" y="130" fill="#fbbf24" fontSize="8.8" fontWeight="bold">✓ Aort akımı için DTG LAX (0°) + CW kullan</text>

          {/* Zone 3 */}
          <rect x="578" y="14" width="268" height="128" rx="10" fill={isDark ? '#0f172a' : '#f0f9ff'} stroke="#0ea5e9" strokeWidth="1.2" />
          <text x="590" y="34" fill="#0ea5e9" fontSize="10.5" fontWeight="bold">3. YALANCI KİTLELER (NORMAL ANATOMİ)</text>
          <text x="590" y="54" fill={isDark ? '#bae6fd' : '#0369a1'} fontSize="9">• Coumadin (Warfarin) Ridge:</text>
          <text x="598" y="67" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">LAA ile sol üst pulmoner ven arası doku</text>
          <text x="590" y="85" fill={isDark ? '#bae6fd' : '#0369a1'} fontSize="9">• Crista Terminalis · Eustachian · Chiari:</text>
          <text x="598" y="98" fill={isDark ? '#cbd5e1' : '#475569'} fontSize="8.5">RA içi normal yapılar (trombüs/tümör sanma!)</text>
          <text x="590" y="122" fill="#38bdf8" fontSize="8.8" fontWeight="bold">• Operatör bağımlı · Sürekli eller serbest değil</text>
        </svg>

        {/* Troubleshooting Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="text-left p-2.5 font-bold rounded-tl-lg">Artefakt / Limitasyon</th>
                <th className="text-left p-2.5 font-bold">Mekanizma</th>
                <th className="text-left p-2.5 font-bold">Klinik Tuzak</th>
                <th className="text-left p-2.5 font-bold rounded-tr-lg">Ayırt Etme / Çözüm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  issue: 'Reverberasyon (Lineer Eko)',
                  mech: 'Ses dalgasının iki parlak yüzey arasında gidip gelmesi',
                  pitfall: 'Çıkan aortada Tip A diseksiyon flebi sanılabilir',
                  fix: 'Renkli Doppler akımı çizgiyi bozmadan geçer; M-mode’da aort duvarıyla paralel hareket eder, 2. düzlemde kaybolur.',
                },
                {
                  issue: 'Akustik Gölgeleme',
                  mech: 'Mekanik kapak/kalsiyum tüm ses dalgasını yansıtır',
                  pitfall: 'Protez kapak arkasındaki kaçak/trombüs gizlenir',
                  fix: 'ME pencereden gizlenen aort/mitral arka yüzü için TG LAX ve DTG LAX pencerelerini ekleyin.',
                },
                {
                  issue: 'LV Apeks Kısalması (Foreshortening)',
                  mech: 'Görüntü düzleminin gerçek apeksten değil yan duvardan geçmesi',
                  pitfall: 'Yalancı yüksek EF veya apikal akinezinin atlanması',
                  fix: 'ME 4C’de hafif retrofleksiyon uygulayın ve apeks duvarının sivri-incelmiş göründüğünü doğrulayın.',
                },
                {
                  issue: 'Coumadin Ridge (LAA Sırtı)',
                  mech: 'LAA ile LUPV arasındaki normal Q-tip benzeri doku',
                  pitfall: 'Sol atriyum trombüsü veya miksoma sanılıp gereksiz antikoagülasyon',
                  fix: 'Tipik anatomik lokasyonu ve doku ekojenitesini (miyokardla eş) 0°–90° tarayarak doğrulayın.',
                },
                {
                  issue: 'Yan Lop (Side-Lobe) Artefaktı',
                  mech: 'Ana demet dışındaki zayıf yan demetlerin parlak yapıdan yansıması',
                  pitfall: 'Aort kökünde kavisli yalancı flep veya kitle görüntüsü',
                  fix: 'Kazancı (gain) azaltın ve prob açısını değiştirin; artefakt silikleşir veya kaybolur.',
                },
                {
                  issue: 'LVOT Çap Ölçüm Hatası',
                  mech: 'SV formülünde LVOT çapının karesi (D²) alınır',
                  pitfall: '2 mm eksik/fazla ölçüm SV ve AVA’da ~%20 hata yaratır',
                  fix: 'ME AV LAX (120°)’ta mid-sistolde zoom yaparak aort kapağı 0.5 cm proksimalinden iç-içe ölçün.',
                },
              ].map((r) => (
                <tr key={r.issue} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                  <td className={`p-2.5 font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{r.issue}</td>
                  <td className={`p-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{r.mech}</td>
                  <td className="p-2.5 text-rose-500 font-medium">{r.pitfall}</td>
                  <td className={`p-2.5 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>{r.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 6: KOMPLİKASYONLAR VE GÜVENLİK */}
      <section className={sectionCardClass}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center font-mono text-xs font-bold shrink-0">
            6
          </div>
          <div>
            <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Komplikasyonlar ve Güvenlik
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Özofagus Perforasyonu, Termal Mukozal Hasar (&gt; 41°C), Hava Yolu Basısı ve Güvenli Çıkarma Kuralları
            </p>
          </div>
        </div>

        {/* Visual 6A: 3-Panel TEE Safety SVG */}
        <svg viewBox="0 0 860 172" className="w-full h-auto rounded-xl">
          <rect x="0" y="0" width="860" height="172" rx="12" fill={isDark ? '#090d16' : '#f8fafc'} />

          {/* Panel 1: Esophageal Perforation */}
          <rect x="14" y="14" width="268" height="144" rx="10" fill={isDark ? '#2a1215' : '#fff1f2'} stroke="#f43f5e" strokeWidth="1.4" />
          <text x="26" y="34" fill="#f43f5e" fontSize="10.5" fontWeight="bold">1. ÖZOFAGUS PERFORASYONU (%0.01–0.09)</text>
          <text x="26" y="54" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9">• En sık: Hipofarenks / krikofaringeal darlık</text>
          <text x="26" y="69" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9">• Risk: Dirence karşı itme, kilitli fleksiyon,</text>
          <text x="34" y="81" fill={isDark ? '#fecdd3' : '#881337'} fontSize="9">ileri yaş, düşük BMI, uzun CPB süresi</text>
          <text x="26" y="100" fill="#fbbf24" fontSize="9" fontWeight="bold">Alarm: Postop odinofaji, boyun amfizemi,</text>
          <text x="26" y="113" fill="#fbbf24" fontSize="9" fontWeight="bold">pnömomediastinum, açıklanamayan sepsis!</text>
          <text x="26" y="138" fill="#34d399" fontSize="8.8" fontWeight="bold">✓ Kural: Direnç varsa dur + laringoskopi ile tak!</text>

          {/* Panel 2: Thermal Injury & Pressure Necrosis */}
          <rect x="296" y="14" width="268" height="144" rx="10" fill={isDark ? '#1f1a0d' : '#fffbeb'} stroke="#f59e0b" strokeWidth="1.4" />
          <text x="308" y="34" fill="#f59e0b" fontSize="10.5" fontWeight="bold">2. TERMAL HASAR & BASI NEKROZU</text>
          <text x="308" y="54" fill={isDark ? '#fde68a' : '#92400e'} fontSize="9">• Sürekli aktif transdüser ucu &gt; 41°C ısınır</text>
          <text x="308" y="69" fill={isDark ? '#fde68a' : '#92400e'} fontSize="9">• Kilitli antefleksiyon + düşük akım (CPB)</text>
          <text x="316" y="81" fill={isDark ? '#fde68a' : '#92400e'} fontSize="9">özofagus mukozasında iskemi/yanık yapar!</text>
          <rect x="308" y="92" width="244" height="28" rx="5" fill="#f59e0b" fillOpacity="0.16" />
          <text x="430" y="110" fill="#fbbf24" fontSize="9.2" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            Aktif Bakmıyorsan → FREEZE + KİLİTSİZ!
          </text>
          <text x="308" y="138" fill="#34d399" fontSize="8.8" fontWeight="bold">✓ CPB’de probu nötrle / üst özofagusa çek</text>

          {/* Panel 3: Airway, Dental & Bleeding */}
          <rect x="578" y="14" width="268" height="144" rx="10" fill={isDark ? '#111827' : '#ffffff'} stroke="#0ea5e9" strokeWidth="1.2" />
          <text x="590" y="34" fill="#38bdf8" fontSize="10.5" fontWeight="bold">3. HAVA YOLU · DENTAL · KANAMA</text>
          <text x="590" y="54" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9">• Diş/Dudak/Dil Hasarı: Bite block zorunlu!</text>
          <text x="590" y="69" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9">• Hava Yolu: ETT yer değiştirme / kaf sızıntısı</text>
          <text x="598" y="81" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">(pediatride sol ana bronş / trakea basısı!)</text>
          <text x="590" y="99" fill={isDark ? '#e2e8f0' : '#334155'} fontSize="9">• GİS Kanama: Heparinli KVC hastasında</text>
          <text x="598" y="111" fill={isDark ? '#94a3b8' : '#64748b'} fontSize="8.5">çıkarken prob ucunda taze kan kontrolü</text>
          <text x="590" y="138" fill="#c084fc" fontSize="8.8" fontWeight="bold">• Çıkarırken: Tekerler KİLİTSİZ + Nötr!</text>
        </svg>

        {/* Post-Procedure Safety & Cleaning Box */}
        <div
          className={`rounded-xl border p-4 space-y-2 ${
            isDark ? 'bg-purple-950/25 border-purple-500/35' : 'bg-purple-50/70 border-purple-200'
          }`}
        >
          <div className="flex items-center gap-2 text-purple-500 font-bold text-xs">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Güvenli Çıkarma, Çapraz Enfeksiyon (High-Level Disinfection) ve Elektrik Güvenliği</span>
          </div>
          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Probu çıkarmadan önce mutlaka <strong>FREEZE</strong> yapın ve her iki fleksiyon tekerinin <strong>tamamen kilitsiz ve nötr</strong> olduğundan emin olun (kilitli uçla çekmek özofagus yırtığının klasik nedenidir!).
            Çıktığında uçta taze kan olup olmadığını kontrol edin. Yüksek düzey dezenfeksiyon (HLD) öncesi her vakada kılıf bütünlüğü ve <strong>elektriksel kaçak akım testi</strong> (mikroşok / termal yanık koruması) yapılmalıdır.
          </p>
        </div>

        {/* Clinical Pearl + References */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-1">
          <div
            className={`lg:col-span-7 rounded-xl border p-3 flex items-start gap-2.5 text-xs ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <Info className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
            <div>
              <strong className={isDark ? 'text-white' : 'text-slate-900'}>Klinik Altın Özet:</strong>{' '}
              Rescue TEE’de 2 pencere hayat kurtarır: <strong>ME 4C (0°)</strong> ile RV/LV oranı, kapaklar ve tamponadı;{' '}
              <strong>TG Mid-SAX (0°)</strong> ile doluşu (kissing walls) ve 3 koroner alanın RWMA’sını saniyeler içinde görün.
            </div>
          </div>
          <div
            className={`lg:col-span-5 rounded-xl border p-3 flex items-start gap-2 text-[11px] ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-500 dark:text-slate-300">Kaynaklar:</span> ASE/SCA Basic & Comprehensive PTEeXAM Guidelines,
              ASA/SCA Practice Guidelines for Perioperative TEE, Miller’s Anesthesia (9th Ed.).
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
