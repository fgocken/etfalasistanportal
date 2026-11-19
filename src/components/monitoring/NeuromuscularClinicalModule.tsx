import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Hand,
  Info,
  RotateCcw,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';

interface NeuromuscularClinicalModuleProps {
  isDark: boolean;
}

interface ClinicalCheckState {
  tidalVolume: boolean;
  handLegLift: boolean;
  headLift: boolean;
  tongueDepressor: boolean;
  quantitativeTof: boolean;
}

export const NeuromuscularClinicalModule: React.FC<NeuromuscularClinicalModuleProps> = ({ isDark }) => {
  const [checks, setChecks] = useState<ClinicalCheckState>({
    tidalVolume: true,
    handLegLift: false,
    headLift: false,
    tongueDepressor: false,
    quantitativeTof: false,
  });

  const toggle = (key: keyof ClinicalCheckState) =>
    setChecks((prev) => ({ ...prev, [key]: !prev[key] }));

  // Compute estimated minimum TOFR & RNMB safety status based on selected tests
  const evaluation = (() => {
    if (checks.quantitativeTof) {
      return {
        estTofr: '≥ 0.90 (Doğrulanmış)',
        risk: 'Güvenli · ASA / ESAIC 2023 Uyumlu',
        level: 'safe' as const,
        color: 'text-emerald-600 dark:text-emerald-400',
        boxDark: 'bg-emerald-500/10 border-emerald-500/30',
        boxLight: 'bg-emerald-50 border-emerald-200',
        advice:
          'Adduktor pollisiste kantitatif TOFR ≥ 0.90 elde edilmiştir. Faringeal koruma ve üst özofagus sfinkteri toparlanmıştır; diğer klinik kriterler (uyanıklık, oksijenasyon, normotermi) tamamsa güvenle ekstübe edilebilir.',
      };
    }
    if (checks.tongueDepressor) {
      return {
        estTofr: '≈ 0.80 – 0.85',
        risk: 'Orta-Düşük Risk (En Güçlü Klinik Test)',
        level: 'borderline' as const,
        color: 'text-cyan-600 dark:text-cyan-400',
        boxDark: 'bg-cyan-500/10 border-cyan-500/30',
        boxLight: 'bg-cyan-50 border-cyan-200',
        advice:
          'Dil basacağı ısırma testi klinik testler içinde en yüksek TOFR eşiğine (~0.85) sahiptir. Yine de 0.85–0.89 arası hafif rezidüel bloğu %100 dışlayamaz; imkân varsa kantitatif TOF ile doğrulayın ve farmakolojik antagonizasyonu ihmal etmeyin.',
      };
    }
    if (checks.headLift || checks.handLegLift) {
      return {
        estTofr: '≈ 0.60 – 0.70',
        risk: 'Yüksek Gizli RNMB & Aspirasyon Riski!',
        level: 'warning' as const,
        color: 'text-amber-600 dark:text-amber-400',
        boxDark: 'bg-amber-500/10 border-amber-500/30',
        boxLight: 'bg-amber-50 border-amber-200',
        advice:
          'KLİNİK TUZAK: Hasta 5 sn başını kaldırabiliyor veya elinizi sıkabiliyor olsa bile TOFR 0.60–0.70 düzeyinde kalmış olabilir! Bu aralıkta faringeal kas güçsüzlüğü, sessiz aspirasyon ve hipoksik ventilatuvar yanıt baskılanması devam eder.',
      };
    }
    if (checks.tidalVolume) {
      return {
        estTofr: '≈ 0.40 – 0.50',
        risk: 'Çok Yüksek RNMB Riski — Ekstübe Etme!',
        level: 'danger' as const,
        color: 'text-rose-600 dark:text-rose-400',
        boxDark: 'bg-rose-500/10 border-rose-500/30',
        boxLight: 'bg-rose-50 border-rose-200',
        advice:
          'Diyafram NMB’ye en dirençli kastır; normal tidal volüm asla yeterli toparlanma demek değildir! Üst havayolu dilatörleri hâlâ felçli olabilir → ekstübasyonda ani obstrüksiyon ve desatürasyon gelişir.',
      };
    }
    return {
      estTofr: '< 0.40 / Belirsiz',
      risk: 'Derin Blok veya Değerlendirilemiyor',
      level: 'danger' as const,
      color: 'text-rose-600 dark:text-rose-400',
      boxDark: 'bg-rose-500/10 border-rose-500/30',
      boxLight: 'bg-rose-50 border-rose-200',
      advice:
        'Hiçbir klinik veya kantitatif toparlanma kriteri karşılanmadı. Ekstübasyon kontrendikedir; ventilasyonu sürdürün, kantitatif TOF ölçün ve uygun antagonizasyon (sugammadeks / neostigmin) uygulayın.',
    };
  })();

  const cardSurface = isDark
    ? 'bg-slate-900/90 border-slate-800'
    : 'bg-white border-slate-200';
  const mutedSurface = isDark
    ? 'bg-slate-800/60 border-slate-700/80'
    : 'bg-slate-50 border-slate-200/80';
  const headingColor = isDark ? 'text-white' : 'text-slate-900';
  const bodyColor = isDark ? 'text-slate-300' : 'text-slate-600';
  const subtleColor = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`rounded-2xl border p-5 sm:p-6 ${cardSurface}`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className={`flex flex-wrap items-center gap-2 text-xs font-medium ${subtleColor}`}>
              <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                Yatak Başı Kas Gücü & Derlenme
              </span>
              <span aria-hidden="true">·</span>
              <span>Cihazsız Değerlendirme</span>
              <span aria-hidden="true">·</span>
              <span>ASA / ESAIC 2023 Perspektifi</span>
            </div>
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${headingColor}`}>
              Nöromüsküler Klinik Değerlendirme
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
              Ekstübasyon öncesi ve derlenme odasında (PACU) kullanılan yatak başı kas gücü testleri (<strong>5 sn baş kaldırma</strong>,{' '}
              <strong>el sıkma / bacak kaldırma</strong> ve <strong>dil basacağı ısırma</strong>) pratik tarama araçlarıdır; ancak
              modern kılavuzlar (ASA/ESAIC 2023) bu testlerin <strong>rezidüel nöromüsküler bloğu (TOFR &lt; 0.90) tek başına dışlayamadığını</strong>{' '}
              vurgular.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 shrink-0">
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Baş Kaldırma</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                TOFR ~0.65
              </div>
              <div className={`text-[10px] ${subtleColor}`}>5 sn sürdürülebilir</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>El / Bacak</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                TOFR ~0.60
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Subjektif güç testi</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Dil Basacağı ★</div>
              <div className="text-sm font-bold font-mono tabular-nums text-cyan-600 dark:text-cyan-400">
                TOFR ~0.85
              </div>
              <div className={`text-[10px] ${subtleColor}`}>En güçlü klinik test</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Güvenli Hedef</div>
              <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                TOFR ≥ 0.90
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Kantitatif (ASA 2023)</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: FİZYOLOJİK GERÇEK & NEDEN TEK BAŞINA YETMEZ?                 */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Klinik Önemi ve "TOFR Boşluğu" (Neden Klinik Testler Yanıltabilir?)
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Farklı kas grupları nöromüsküler blokerlere farklı duyarlılık gösterir. <strong>Diyafram en hızlı toparlanırken</strong>,
              yutma ve üst havayolunu açık tutan <strong>faringeal kaslar en son toparlanır</strong>. Klinik testler ise aradaki
              "tehlikeli boşlukta" (TOFR 0.60–0.85) yalancı güven verebilir.
            </p>
          </div>
        </div>

        {/* Visual SVG: Physiological Recovery Ladder vs TOFR */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${headingColor}`}>
              Kas Gruplarının Toparlanma Sırası & Klinik Testlerin Karşıladığı TOFR Eşikleri (Kopman / ASA 2023)
            </span>
            <span className={`text-[11px] font-mono ${subtleColor}`}>
              RNMB = TOFR &lt; 0.90
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 175"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Klinik nöromüsküler testlerin TOFR eşiklerine göre karşılaştırma merdiveni"
            >
              {/* TOFR axis line */}
              <defs>
                <linearGradient id="tofrLadder" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.32" />
                  <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.32" />
                  <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.38" />
                </linearGradient>
              </defs>
              <rect x="24" y="64" width="832" height="26" rx="13" fill="url(#tofrLadder)" stroke={isDark ? '#334155' : '#cbd5e1'} />

              {/* Safe zone vertical threshold at TOFR 0.90 */}
              <line x1="726" y1="20" x2="726" y2="148" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />
              <text x="734" y="34" fontSize="9.5" fontFamily="monospace" fontWeight="700" fill="#10b981">
                TOFR ≥ 0.90
              </text>
              <text x="734" y="47" fontSize="8.5" fill="#10b981">
                Güvenli Ekstübasyon
              </text>

              {/* Danger zone label */}
              <text x="360" y="81" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#fde68a' : '#92400e'}>
                REZİDÜEL NÖROMÜSKÜLER BLOK (RNMB) — GİZLİ ASPİRASYON &amp; OBSTRÜKSİYON BÖLGESİ
              </text>

              {/* Milestones */}
              {[
                { x: 110, tofr: '0.40–0.50', title: 'Normal Tidal Volüm', sub: 'Diyafram toparlandı (Erken!)', col: '#f43f5e' },
                { x: 300, tofr: '0.60–0.65', title: 'El Sıkma / Bacak Kaldırma', sub: 'Subjektif · RNMB sürer', col: '#f59e0b' },
                { x: 475, tofr: '0.65–0.70', title: '5 sn Baş Kaldırma', sub: 'Klasik ama düşük duyarlılık', col: '#f59e0b' },
                { x: 645, tofr: '≈ 0.85', title: 'Dil Basacağı Isırma ★', sub: 'En güvenilir klinik test', col: '#06b6d4' },
                { x: 808, tofr: '≥ 0.90', title: 'Faringeal Koruma', sub: 'Yutma & UES tam açık', col: '#10b981' },
              ].map((m) => (
                <g key={m.title}>
                  <line x1={m.x} y1="44" x2={m.x} y2="114" stroke={m.col} strokeWidth="1.6" strokeDasharray="3 2" />
                  <circle cx={m.x} cy="77" r="5.5" fill={m.col} stroke={isDark ? '#0f172a' : '#ffffff'} strokeWidth="2" />
                  <text x={m.x} y="25" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                    {m.title}
                  </text>
                  <text x={m.x} y="38" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill={m.col}>
                    TOFR {m.tofr}
                  </text>
                  <text x={m.x} y="130" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                    {m.sub}
                  </text>
                </g>
              ))}

              <text x="440" y="162" textAnchor="middle" fontSize="9" fill={isDark ? '#94a3b8' : '#64748b'}>
                Klinik duyarlılık: Baş kaldırma ve el sıkma testleri RNMB hastalarının yalnızca ~%10–30’unu yakalayabilir (%70+ yalancı güven!).
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: 3 TEMEL KLİNİK TEST (DETAYLI & GÖRSEL)                       */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Üç Temel Yatak Başı Klinik Testi
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Tüm testlerin ortak kuralı: <strong>Sürdürülebilir güç (en az 5 saniye)</strong> aramak ve hastanın uyanık/koopere
              olduğundan emin olmaktır. Kısa ve ani hareketler asla geçerli kabul edilmez.
            </p>
          </div>
        </div>

        {/* 3 Visual & Detailed Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* TEST 1: HEAD LIFT */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 ${mutedSurface}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h5 className={`text-sm font-bold ${headingColor}`}>1. Baş Kaldırma (Head Lift)</h5>
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                  5 sn · TOFR ~0.65
                </span>
              </div>

              {/* Custom Mini Illustration SVG: Head Lift */}
              <svg
                viewBox="0 0 260 95"
                className={`w-full h-auto rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
                role="img"
                aria-label="5 saniye baş kaldırma testi şeması"
              >
                {/* Bed surface */}
                <line x1="16" y1="74" x2="244" y2="74" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="2" />
                {/* Supine torso */}
                <rect x="92" y="56" width="136" height="16" rx="8" fill="#06b6d4" fillOpacity="0.22" stroke="#06b6d4" strokeWidth="1.5" />
                {/* Neck lifted */}
                <path d="M 94 62 Q 74 58, 62 42" fill="none" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
                {/* Lifted head */}
                <circle cx="54" cy="36" r="15" fill="#06b6d4" fillOpacity="0.22" stroke="#06b6d4" strokeWidth="1.8" />
                {/* Up arrow + 5s */}
                <path d="M 28 68 L 28 32 M 23 38 L 28 32 L 33 38" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <text x="160" y="30" textAnchor="middle" fontSize="10" fontFamily="monospace" fontWeight="700" fill="#f59e0b">
                  ≥ 5 SANİYE KESİNTİSİZ
                </text>
                <text x="160" y="44" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                  Omuzlar yatakta · SCM &amp; Boyun Fleksörleri
                </text>
              </svg>

              <div className={`space-y-1.5 text-xs leading-relaxed ${bodyColor}`}>
                <div>
                  <strong>Uygulama:</strong> Supin hastadan omuzlarını kaldırmadan başını yastıktan ayırıp{' '}
                  <strong>tam 5 saniye</strong> tutması istenir.
                </div>
                <div>
                  <strong>Klinik Değer:</strong> Geleneksel olarak en çok bilinen testtir; geçilememesi belirgin rezidüel bloğa
                  veya derin sedasyona işaret eder.
                </div>
              </div>
            </div>

            <div className={`text-[11px] p-2.5 rounded-lg border ${isDark ? 'bg-amber-500/10 border-amber-500/25 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
              <strong>Tuzak:</strong> Hastaların önemli kısmı TOFR <strong>0.60–0.70</strong> iken 5 sn baş kaldırabilir;
              faringeal aspirasyon riski bu testle dışlanamaz! Servikal patoloji veya ağrıda yapılamaz.
            </div>
          </div>

          {/* TEST 2: HAND GRIP / LEG LIFT */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 ${mutedSurface}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h5 className={`text-sm font-bold ${headingColor}`}>2. El Sıkma / Bacak Kaldırma</h5>
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                  5 sn · TOFR ~0.60
                </span>
              </div>

              {/* Custom Mini Illustration SVG: Hand Grip & Leg Lift */}
              <svg
                viewBox="0 0 260 95"
                className={`w-full h-auto rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
                role="img"
                aria-label="Sürdürülebilir el sıkma ve 5 saniye bacak kaldırma testi şeması"
              >
                {/* Left half: Hand grip */}
                <rect x="10" y="10" width="114" height="75" rx="7" fill={isDark ? '#0f172a' : '#f8fafc'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <circle cx="67" cy="40" r="16" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" strokeWidth="1.6" />
                <path d="M 59 40 L 65 46 L 76 34" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
                <text x="67" y="70" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
                  5 sn Güçlü El Sıkma
                </text>
                <text x="67" y="80" textAnchor="middle" fontSize="7.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                  Anlık kavrama geçersiz
                </text>

                {/* Right half: Leg lift */}
                <rect x="134" y="10" width="116" height="75" rx="7" fill={isDark ? '#0f172a' : '#f8fafc'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <line x1="144" y1="60" x2="240" y2="60" stroke={isDark ? '#334155' : '#cbd5e1'} strokeWidth="1.5" />
                <line x1="152" y1="56" x2="188" y2="56" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
                <line x1="188" y1="56" x2="230" y2="30" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" />
                <text x="192" y="72" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
                  5 sn Bacak Kaldırma
                </text>
                <text x="192" y="81" textAnchor="middle" fontSize="7.5" fill={isDark ? '#94a3b8' : '#64748b'}>
                  Boyun sınırlı / pediatrik
                </text>
              </svg>

              <div className={`space-y-1.5 text-xs leading-relaxed ${bodyColor}`}>
                <div>
                  <strong>El Sıkma:</strong> İki parmağınızı hastanın avucuna verip <strong>5 saniye güçlü ve sabit</strong>{' '}
                  sıkmasını isteyin; gücün saniyeler içinde erimesi (fade) rezidüel bloğu gösterir.
                </div>
                <div>
                  <strong>Bacak Kaldırma:</strong> Boyun cerrahisi/servikal kolarlı veya çocuk hastalarda baş kaldırmaya
                  alternatif olarak bacağı 5 sn havada tutma testidir.
                </div>
              </div>
            </div>

            <div className={`text-[11px] p-2.5 rounded-lg border ${isDark ? 'bg-amber-500/10 border-amber-500/25 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'}`}>
              <strong>Tuzak:</strong> En subjektif testtir! Yaşlı/zayıf hastada bazal kavrama zayıfken, genç kaslı hastada
              TOFR 0.55–0.60’ta bile "güçlü" hissedilerek yanıltabilir.
            </div>
          </div>

          {/* TEST 3: TONGUE DEPRESSOR */}
          <div className={`rounded-xl border p-4 flex flex-col justify-between space-y-3 ${isDark ? 'bg-cyan-500/10 border-cyan-500/35' : 'bg-cyan-50/70 border-cyan-200'}`}>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h5 className={`text-sm font-bold ${headingColor}`}>3. Dil Basacağı Isırma ★</h5>
                <span className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  TOFR ≈ 0.85
                </span>
              </div>

              {/* Custom Mini Illustration SVG: Tongue Depressor Bite */}
              <svg
                viewBox="0 0 260 95"
                className={`w-full h-auto rounded-lg border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}
                role="img"
                aria-label="Dil basacağı ısırma testi şeması"
              >
                {/* Upper & lower teeth */}
                <rect x="48" y="22" width="44" height="16" rx="4" fill={isDark ? '#334155' : '#e2e8f0'} stroke="#64748b" />
                <rect x="48" y="52" width="44" height="16" rx="4" fill={isDark ? '#334155' : '#e2e8f0'} stroke="#64748b" />
                {/* Wooden tongue depressor clamped between teeth */}
                <rect x="54" y="40" width="128" height="10" rx="4" fill="#d97706" fillOpacity="0.85" stroke="#fbbf24" strokeWidth="1.2" />
                {/* Bite arrows */}
                <path d="M 70 10 L 70 20 M 66 16 L 70 20 L 74 16" stroke="#10b981" strokeWidth="1.8" fill="none" />
                <path d="M 70 80 L 70 70 M 66 74 L 70 70 L 74 74" stroke="#10b981" strokeWidth="1.8" fill="none" />
                {/* Pull arrow */}
                <path d="M 190 45 L 228 45 M 222 40 L 228 45 L 222 50" stroke="#06b6d4" strokeWidth="2.2" fill="none" />
                <text x="208" y="34" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#06b6d4">
                  Çekişe Direnç
                </text>
                <text x="158" y="78" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={isDark ? '#67e8f9' : '#0e7490'}>
                  Masseter ≈ Faringeal Duyarlılık
                </text>
              </svg>

              <div className={`space-y-1.5 text-xs leading-relaxed ${bodyColor}`}>
                <div>
                  <strong>Uygulama:</strong> Tahta dil basacağı dişler arasına konur; hasta sıkıca ısırırken klinisyen çubuğu
                  dışarı çekmeye çalışır. Çubuğu sıkıca tutabiliyorsa test geçilir.
                </div>
                <div>
                  <strong>Neden En İyisi?</strong> Masseter kası, üst havayolunu koruyan faringeal kaslara en yakın NMB
                  duyarlılığına sahiptir; bu testi geçmek için ortalama <strong>TOFR ~0.85</strong> gerekir (Kopman).
                </div>
              </div>
            </div>

            <div className={`text-[11px] p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/80 border-cyan-500/30 text-cyan-200' : 'bg-white border-cyan-200 text-cyan-900'}`}>
              <strong>Dikkat:</strong> Dişsiz/gevşek dişli hastalarda uygulanmaz; kooperasyon şarttır. En güvenilir klinik test
              olsa da TOFR ≥ 0.90 kantitatif doğrulamanın yerini tamamen almaz.
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: İNTERAKTİF YATAK BAŞI RNMB RİSK DEĞERLENDİRİCİSİ             */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
              <Hand className="w-4 h-4" />
            </div>
            <div>
              <h4 className={`text-base font-bold ${headingColor}`}>
                İnteraktif Yatak Başı Toparlanma &amp; RNMB Risk Değerlendiricisi
              </h4>
              <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
                Hastanın başarabildiği klinik bulguları işaretleyerek tahmini TOFR eşdeğerini ve gizli rezidüel blok riskini görün.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setChecks({
                tidalVolume: false,
                handLegLift: false,
                headLift: false,
                tongueDepressor: false,
                quantitativeTof: false,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Checkboxes */}
          <div className="lg:col-span-7 space-y-2">
            {[
              {
                key: 'tidalVolume' as const,
                title: 'Normal Spontan Solunum / Tidal Volüm (>5 mL/kg)',
                meta: 'Diyafram · Eşik TOFR ~0.40–0.50',
              },
              {
                key: 'handLegLift' as const,
                title: '5 Saniye Güçlü El Sıkma veya Düz Bacak Kaldırma',
                meta: 'Ekstremite · Eşik TOFR ~0.60',
              },
              {
                key: 'headLift' as const,
                title: '5 Saniye Kesintisiz Baş Kaldırma (Sustained Head Lift)',
                meta: 'Boyun Fleksörleri · Eşik TOFR ~0.65–0.70',
              },
              {
                key: 'tongueDepressor' as const,
                title: 'Dil Basacağı Isırma Testini Geçiyor (Çekişe Dirençli)',
                meta: 'Masseter · En Güvenilir Klinik Test (TOFR ~0.85)',
              },
              {
                key: 'quantitativeTof' as const,
                title: 'Kantitatif NMB Monitörü: Adduktor Pollisis TOFR ≥ 0.90',
                meta: 'Altın Standart (ASA / ESAIC 2023 Zorunlu Hedef)',
              },
            ].map((item) => {
              const active = checks[item.key];
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggle(item.key)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                    active
                      ? item.key === 'quantitativeTof'
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-cyan-600 text-white border-cyan-500'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-cyan-500/50'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-cyan-400'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">{item.title}</div>
                    <div className={`text-[10px] font-mono mt-0.5 ${active ? 'text-white/85' : subtleColor}`}>
                      {item.meta}
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 text-xs font-bold ${
                      active
                        ? 'bg-white/20 border-white/50 text-white'
                        : isDark
                          ? 'border-slate-600'
                          : 'border-slate-300'
                    }`}
                  >
                    {active ? '✓' : ''}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Result Box */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className={`rounded-2xl border p-5 flex-1 flex flex-col justify-between space-y-4 ${
                isDark ? evaluation.boxDark : evaluation.boxLight
              }`}
            >
              <div className="space-y-1">
                <div className={`text-[11px] font-mono font-semibold ${subtleColor}`}>
                  TAHMİNİ MİNİMUM TOPARLANMA DÜZEYİ
                </div>
                <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums ${evaluation.color}`}>
                  {evaluation.estTofr}
                </div>
                <div className={`text-sm font-bold pt-1 ${evaluation.color}`}>
                  {evaluation.risk}
                </div>
              </div>

              <div className={`text-xs leading-relaxed border-t pt-3 ${isDark ? 'border-slate-700/70 text-slate-200' : 'border-slate-200/80 text-slate-700'}`}>
                {evaluation.advice}
              </div>

              <div className={`text-[11px] font-mono pt-2 border-t ${isDark ? 'border-slate-700/70 text-slate-400' : 'border-slate-200/80 text-slate-600'}`}>
                Hatırlatma: Ekstübasyon güvenliği yalnızca kas gücüyle değil, bilinç + koruyucu refleks + normotermi ile bir bütündür.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: YATAK BAŞI TUZAKLAR & HIGH-YIELD ÖZET                        */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${cardSurface}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Klinik Testlerin 4 Büyük Sınırlaması</span>
            </div>
            <ul className={`space-y-1 text-xs leading-relaxed list-disc pl-4 ${bodyColor}`}>
              <li><strong>Düşük duyarlılık:</strong> RNMB (TOFR &lt; 0.90) vakalarının çoğunu kaçırır; postop pulmoner komplikasyonları önlemez.</li>
              <li><strong>Uyanıklık &amp; kooperasyon şartı:</strong> Sedasyon, opioid, ağrı, deliryum veya dil bariyerinde yapılamaz.</li>
              <li><strong>Pediatrik / entübe hasta güçlüğü:</strong> Bebeklerde ve kooperasyon kurulamayan erişkinlerde geçersizdir.</li>
              <li><strong>"Diyafram Yanılsaması":</strong> İyi tidal volüm ve düzenli solunum faringeal kasların toparlandığını göstermez!</li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Yatak Başı 3 Altın Kural (High-Yield)</span>
            </div>
            <ul className={`space-y-1.5 text-xs leading-relaxed ${bodyColor}`}>
              <li className="flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                <span><strong>1. Altın Standart:</strong> NMB verilen her hastada kantitatif TOF (adduktor pollisis <strong>TOFR ≥ 0.90</strong>) hedefle.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>2. Cihazsız En Güçlü Test:</strong> Klinik testler arasında en yüksek TOFR eşiği (~0.85) <strong>Dil Basacağı Isırma</strong> testindedir.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>3. PACU’da Alarm Bulgusu:</strong> Sığ solunum, panik/ajitasyon, yutma güçlüğü, diplopi veya 5 sn baş kaldıramama → acil RNMB düşün!</span>
              </li>
            </ul>
          </div>
        </div>

        {/* References */}
        <div
          className={`pt-3 border-t flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] ${
            isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
          }`}
        >
          <span className="inline-flex items-center gap-1 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-cyan-500" />
            Kaynaklar:
          </span>
          <span>ASA 2023 Practice Guidelines for Monitoring &amp; Antagonism of Neuromuscular Blockade</span>
          <span aria-hidden="true">·</span>
          <span>ESAIC 2023 NMB Management Guidelines</span>
          <span aria-hidden="true">·</span>
          <span>Kopman AF et al. — Clinical Signs vs TOFR (Anesthesiology, 1997)</span>
          <span aria-hidden="true">·</span>
          <span>Miller’s Anesthesia</span>
        </div>
      </section>
    </div>
  );
};
