import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle2,
  Eye,
  HeartPulse,
  Info,
  RotateCcw,
  ShieldAlert,
  Wind,
} from 'lucide-react';

interface ClinicalReflexesModuleProps {
  isDark: boolean;
}

type PrstDomainKey = 'p' | 'r' | 's' | 't';

interface PrstOption {
  score: 0 | 1 | 2;
  label: string;
  detail: string;
}

interface PrstDomain {
  key: PrstDomainKey;
  letter: string;
  title: string;
  subtitle: string;
  options: PrstOption[];
}

const PRST_DOMAINS: PrstDomain[] = [
  {
    key: 'p',
    letter: 'P',
    title: 'Pressure (Sistolik Kan Basıncı)',
    subtitle: 'Preoperatif bazal SBP’ye göre artış',
    options: [
      { score: 0, label: '< +15 mmHg', detail: 'Bazal SBP’nin 15 mmHg altındaki artış' },
      { score: 1, label: '+15 – +30 mmHg', detail: 'Bazal SBP’nin 15–30 mmHg üstünde' },
      { score: 2, label: '> +30 mmHg', detail: 'Bazal SBP’den >30 mmHg belirgin artış' },
    ],
  },
  {
    key: 'r',
    letter: 'R',
    title: 'Rate (Kalp Hızı)',
    subtitle: 'Preoperatif bazal kalp hızına göre artış',
    options: [
      { score: 0, label: '< +15 /dk', detail: 'Bazal KH’nin 15/dk altındaki artış' },
      { score: 1, label: '+15 – +30 /dk', detail: 'Bazal KH’nin 15–30/dk üstünde' },
      { score: 2, label: '> +30 /dk', detail: 'Bazal KH’den >30/dk belirgin taşikardi' },
    ],
  },
  {
    key: 's',
    letter: 'S',
    title: 'Sweating (Terleme)',
    subtitle: 'Alın ve gövde cildi sempatik yanıtı',
    options: [
      { score: 0, label: 'Yok', detail: 'Cilt tamamen kuru' },
      { score: 1, label: 'Nemli', detail: 'Sadece dokunulduğunda nem hissedilir' },
      { score: 2, label: 'Görünür Ter', detail: 'Gözle görülür ter boncukları / akıntı' },
    ],
  },
  {
    key: 't',
    letter: 'T',
    title: 'Tears (Gözyaşı / Lakrimasyon)',
    subtitle: 'Otonomik lakrimasyon değerlendirmesi',
    options: [
      { score: 0, label: 'Yok', detail: 'Göz kapakları açıldığında yaşarma yok' },
      { score: 1, label: 'Göz İçi Yaş', detail: 'Kapaklar açılınca belirgin gözyaşı birikimi' },
      { score: 2, label: 'Taşan Gözyaşı', detail: 'Göz kapalıyken bile dışarı taşan yaşarma' },
    ],
  },
];

export const ClinicalReflexesModule: React.FC<ClinicalReflexesModuleProps> = ({ isDark }) => {
  const [prst, setPrst] = useState<Record<PrstDomainKey, 0 | 1 | 2>>({
    p: 0,
    r: 0,
    s: 0,
    t: 0,
  });

  const totalPrst = prst.p + prst.r + prst.s + prst.t;

  const prstInterpretation =
    totalPrst <= 2
      ? {
          status: 'normal' as const,
          label: 'Yeterli Otonomik Baskılama',
          color: 'text-emerald-600 dark:text-emerald-400',
          darkBg: 'bg-emerald-500/10 border-emerald-500/30',
          lightBg: 'bg-emerald-50 border-emerald-200',
          advice:
            'Cerrahi uyarana karşı otonomik stres yanıtı kontrol altında. Ancak beta-bloker, deksmedetomidin veya yüksek doz opioid kullanımında skorun yalancı düşük kalabileceğini unutmayın.',
        }
      : totalPrst <= 4
        ? {
            status: 'warning' as const,
            label: 'Sınırda / Yüzeyelleşme Uyarısı',
            color: 'text-amber-600 dark:text-amber-400',
            darkBg: 'bg-amber-500/10 border-amber-500/30',
            lightBg: 'bg-amber-50 border-amber-200',
            advice:
              'Artmış sempatik/nosiseptif yanıt sinyali. End-tidal volatil (MAC) veya TIVA infüzyon hattını, analjezi düzeyini ve olası hiperkapni/hipovolemi gibi nedenleri hemen kontrol edin.',
          }
        : {
            status: 'critical' as const,
            label: 'Yetersiz Anestezi / Belirgin Otonomik Stres',
            color: 'text-rose-600 dark:text-rose-400',
            darkBg: 'bg-rose-500/10 border-rose-500/30',
            lightBg: 'bg-rose-50 border-rose-200',
            advice:
              'Yüksek farkındalık (AAGA) veya şiddetli ağrı yanıtı riski! Önce ilaç dağıtımını (vaporizatör, IV hat tıkanıklığı/ekstravazasyon) doğrulayın, hipnotik ve analjeziyi hızla derinleştirin.',
          };

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
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                Cihazsız Anestezi Derinliği Takibi
              </span>
              <span aria-hidden="true">·</span>
              <span>Yatak Başı Klinik Değerlendirme</span>
              <span aria-hidden="true">·</span>
              <span>High-Yield Rehber</span>
            </div>
            <h3 className={`text-lg sm:text-xl font-bold tracking-tight ${headingColor}`}>
              Klinik Refleksler & Otonomik Yanıtlar (PRST)
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
              İşlenmiş EEG (BIS/Entropi) veya end-tidal ajan ölçümü olsun ya da olmasın, anestezi derinliğinin en hızlı ve
              gecikmesiz değerlendirmesi hastanın <strong>göz/kraniyal sinir refleksleri</strong>,{' '}
              <strong>hava yolu–somatik yanıtları</strong> ve <strong>otonomik bulgularının (PRST)</strong> bütüncül okunmasıdır.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 shrink-0">
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>İlk Kaybolan</div>
              <div className="text-sm font-bold font-mono text-violet-600 dark:text-violet-400">
                Kirpik Ref.
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Bilinç kaybı (LOC)</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>SGA Hazırlık</div>
              <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400">
                Çene İtme
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Jaw Thrust = Altın test</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Otonomik Skor</div>
              <div className="text-sm font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
                PRST 0–8
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Evans Skoru (≥3 uyarı)</div>
            </div>
            <div className={`px-3 py-2.5 rounded-xl border ${mutedSurface}`}>
              <div className={`text-[10px] font-medium ${subtleColor}`}>Kritik Tuzak</div>
              <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400">
                NMB Maskesi
              </div>
              <div className={`text-[10px] ${subtleColor}`}>Kürar hareketi siler!</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* BÖLÜM 1: NEDEN ÖNEMLİDİR? & DERİNLİK SPEKTRUMU                        */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-500/15 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Klinik Önemi: Neden Cihazsız Refleks Takibi Vazgeçilmezdir?
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Anestezi derinliği tek bir parametre değildir; <strong>hipnoz (bilinçsizlik)</strong>, <strong>analjezi (nosisepsiyon baskılanması)</strong>{' '}
              ve <strong>immobilitenin (refleks baskılanması)</strong> bileşimidir. Klinik refleksler bu üç bileşeni anlık olarak yatak başında test eder.
            </p>
          </div>
        </div>

        {/* High-Yield 3 Why Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold ${headingColor}`}>1. Sıfır Gecikme, Her Yerde Hazır</div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              BIS/Entropi gibi cihazların 15–30 saniyelik hesaplama gecikmesi vardır ve elektrokoter, EMG veya ketamin/N₂O’dan
              bozulur. Klinik refleksler indüksiyon, SGA yerleştirme ve ekstübasyonda <strong>anlık karar</strong> verdirir.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold ${headingColor}`}>2. Laringospazm & Farkındalık Kalkanı</div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Yüzeyel fazda havayolu uyarısı ölümcül laringospazm tetiklerken, idamede artan otonomik yanıtlar (terleme, yaşarma,
              taşikardi) <strong>intraoperatif farkındalığın (AAGA)</strong> ve kopmuş TIVA hattının en erken uyarısıdır.
            </p>
          </div>
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className={`text-xs font-bold text-rose-600 dark:text-rose-400`}>
              3. Altın Kural: Maskeleyen İlaçları Bil!
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              <strong>Nöromüsküler blokerler (NMB)</strong> kirpik, yutkunma, öksürük ve somatik hareketi tamamen siler (hasta uyanıkken
              hareketsiz kalabilir!). <strong>Beta-bloker ve opioidler</strong> ise taşikardi/hipertansiyon yanıtını gizler.
            </p>
          </div>
        </div>

        {/* Visual Spectrum SVG: Order of Reflex Disappearance Across Depth */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`text-xs font-bold ${headingColor}`}>
              Anestezi Derinleştikçe Reflekslerin Kaybolma Sırası (Uyanık → Cerrahi Derinlik)
            </span>
            <span className={`text-[11px] font-mono ${subtleColor}`}>
              Uyanmada kabaca ters sırayla geri döner
            </span>
          </div>

          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 155"
              className="w-full min-w-[680px] h-auto"
              role="img"
              aria-label="Anestezi derinliği arttıkça klinik reflekslerin kaybolma sırası"
            >
              {/* Horizontal depth bar */}
              <defs>
                <linearGradient id="depthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.28" />
                  <stop offset="35%" stopColor="#a855f7" stopOpacity="0.32" />
                  <stop offset="70%" stopColor="#10b981" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.28" />
                </linearGradient>
              </defs>
              <rect x="20" y="54" width="840" height="24" rx="12" fill="url(#depthGrad)" stroke={isDark ? '#334155' : '#cbd5e1'} />

              {/* Stage Labels on Bar */}
              <text x="95" y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#bae6fd' : '#0369a1'}>
                SEDASYON / LOC
              </text>
              <text x="305" y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#e9d5ff' : '#6b21a8'}>
                YÜZEYEL (EVRE II RİSKİ!)
              </text>
              <text x="570" y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#a7f3d0' : '#047857'}>
                CERRAHİ ANESTEZİ (1.0–1.3 MAC)
              </text>
              <text x="795" y="70" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#fecdd3' : '#be123c'}>
                AŞIRI DERİN
              </text>

              {/* Milestone nodes */}
              {[
                { x: 68, top: 'Sözel Yanıt ↓', bot: 'MAC-awake ~0.3', col: '#38bdf8' },
                { x: 182, top: 'Kirpik Refleksi ↓', bot: 'İlk hipnoz işareti', col: '#818cf8' },
                { x: 312, top: 'Göz Sabit / Kornea ↓', bot: 'Yutkunma / Laringospazm!', col: '#a855f7' },
                { x: 468, top: 'Çene İtme / SGA OK', bot: 'Hava yolu refleksi ↓', col: '#10b981' },
                { x: 622, top: 'Somatik Hareket ↓', bot: '1.0 MAC (İnsizyon)', col: '#059669' },
                { x: 772, top: 'Otonomik (PRST) ↓', bot: 'MAC-BAR ~1.3–1.5', col: '#f43f5e' },
              ].map((m) => (
                <g key={m.top}>
                  <line x1={m.x} y1="36" x2={m.x} y2="108" stroke={m.col} strokeWidth="1.6" strokeDasharray="3 2" />
                  <circle cx={m.x} cy="66" r="5" fill={m.col} stroke={isDark ? '#0f172a' : '#ffffff'} strokeWidth="2" />
                  <text x={m.x} y="27" textAnchor="middle" fontSize="9.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                    {m.top}
                  </text>
                  <text x={m.x} y="124" textAnchor="middle" fontSize="8.5" fontFamily="monospace" fill={isDark ? '#94a3b8' : '#475569'}>
                    {m.bot}
                  </text>
                </g>
              ))}

              <text x="440" y="147" textAnchor="middle" fontSize="9" fill={isDark ? '#94a3b8' : '#64748b'}>
                Dikkat: Somatik hareket spinal kord refleksidir; kortikal farkındalık (bilinç) ise çok daha düşük ajan dozunda (MAC-awake) kaybolur.
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 2: GÖZ VE KRANİYAL SİNİR REFLEKSLERİ                            */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Göz ve Kraniyal Sinir Refleksleri
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Beyin sapı ve kraniyal sinir (CN II, III, V, VII) bütünlüğü üzerinden hipnoz geçişini ve sempatik/opioid dengesini
              gösteren en hızlı görsel ipuçlarıdır.
            </p>
          </div>
        </div>

        {/* Visual Eye States SVG */}
        <div className={`rounded-xl border p-4 ${mutedSurface}`}>
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 880 148"
              className="w-full min-w-[660px] h-auto"
              role="img"
              aria-label="Anestezi derinliğine göre dört karakteristik göz ve pupil görünümü"
            >
              {[
                {
                  x: 8,
                  title: '1. Yüzeyel / Eksitasyon',
                  sub: 'Ekzantrik gezici bakış · Geniş pupil',
                  note: 'Lakrimasyon (+), kirpik (+/−)',
                  pupilR: 13,
                  offsetX: 11,
                  offsetY: -5,
                  col: '#f59e0b',
                },
                {
                  x: 226,
                  title: '2. Cerrahi Anestezi',
                  sub: 'Santral & sabit bakış · Küçük-orta',
                  note: 'Kirpik (−), kornea (−), kuru göz',
                  pupilR: 7,
                  offsetX: 0,
                  offsetY: 0,
                  col: '#10b981',
                },
                {
                  x: 444,
                  title: '3. Güçlü Opioid Etkisi',
                  sub: 'Santral · İğne başı (Pinpoint)',
                  note: 'Fentanil/remifentanil → miyozis',
                  pupilR: 3.5,
                  offsetX: 0,
                  offsetY: 0,
                  col: '#38bdf8',
                },
                {
                  x: 662,
                  title: '4. Sabit Midriyazis (ALARM!)',
                  sub: 'Geniş, ışığa yanıtsız pupil',
                  note: 'Atropin / Adrenalin / Hipoksi / Aşırı derin',
                  pupilR: 15,
                  offsetX: 0,
                  offsetY: 0,
                  col: '#f43f5e',
                },
              ].map((eye) => (
                <g key={eye.title} transform={`translate(${eye.x}, 8)`}>
                  <rect
                    width="208"
                    height="132"
                    rx="10"
                    fill={isDark ? '#0f172a' : '#ffffff'}
                    stroke={isDark ? '#1e293b' : '#e2e8f0'}
                  />
                  <text x="104" y="22" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={eye.col}>
                    {eye.title}
                  </text>
                  {/* Eye sclera almond */}
                  <path
                    d="M 48 62 Q 104 30, 160 62 Q 104 94, 48 62 Z"
                    fill={isDark ? '#1e293b' : '#f8fafc'}
                    stroke={isDark ? '#64748b' : '#94a3b8'}
                    strokeWidth="1.6"
                  />
                  {/* Iris */}
                  <circle
                    cx={104 + eye.offsetX}
                    cy={62 + eye.offsetY}
                    r="18"
                    fill={eye.col}
                    fillOpacity="0.24"
                    stroke={eye.col}
                    strokeWidth="1.4"
                  />
                  {/* Pupil */}
                  <circle cx={104 + eye.offsetX} cy={62 + eye.offsetY} r={eye.pupilR} fill="#020617" />
                  {/* Glint */}
                  <circle cx={104 + eye.offsetX - 3} cy={62 + eye.offsetY - 3} r="1.8" fill="#ffffff" fillOpacity="0.8" />

                  <text x="104" y="106" textAnchor="middle" fontSize="9.2" fontWeight="700" fill={isDark ? '#e2e8f0' : '#0f172a'}>
                    {eye.sub}
                  </text>
                  <text x="104" y="121" textAnchor="middle" fontSize="8.5" fill={isDark ? '#94a3b8' : '#475569'}>
                    {eye.note}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* High-Yield Table for Ocular/CN Reflexes */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-50 text-slate-700'}>
                <th className="py-2.5 px-3 font-bold">Refleks / Bulgu</th>
                <th className="py-2.5 px-3 font-bold font-mono">Yolak</th>
                <th className="py-2.5 px-3 font-bold">Klinik Anlamı (High-Yield)</th>
                <th className="py-2.5 px-3 font-bold">Tuzak / Dikkat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {[
                {
                  name: 'Kirpik (Eyelash) Refleksi',
                  arc: 'CN V₁ → VII',
                  meaning: 'İndüksiyonda bilinç kaybının (LOC) en pratik ilk göstergesi. Kirpiklere hafifçe dokunulunca göz kırpma kaybolur.',
                  pitfall: 'Kaybolması yalnızca hipnoz başlangıcıdır — entübasyon veya SGA için yeterli derinlik DEMEK DEĞİLDİR! NMB ile silinir.',
                },
                {
                  name: 'Kornea Refleksi',
                  arc: 'CN V₁ → VII',
                  meaning: 'Kirpikten daha derin anestezi düzeyinde kaybolur; beyin sapı baskılanmasını gösterir.',
                  pitfall: 'Kornea abrazyonu riski nedeniyle rutin ve tekrarlı kontrol edilmemelidir.',
                },
                {
                  name: 'Göz Pozisyonu & Hareketi',
                  arc: 'CN III, IV, VI',
                  meaning: 'Yüzeyel fazda diverjan/ekzantrik ve gezici (roving); cerrahi anestezide santral ve sabit konuma yerleşir.',
                  pitfall: 'Ketamin altında nistagmus ve açık/hareketli gözler derin anestezide bile sürebilir.',
                },
                {
                  name: 'Pupil Çapı & Işık Yanıtı',
                  arc: 'CN II → III',
                  meaning: 'Cerrahi derinlikte küçük-orta ve sabit; ağrılı yüzeyel uyaranda sempatik midriyazis görülür.',
                  pitfall: 'Opioidler pupili iğne başı tutar (yüzeyelliği gizler); atropin/adrenalin/hipoksi ise midriyazis yapar!',
                },
                {
                  name: 'Konjonktival Yaşarma',
                  arc: 'CN V → VII (Par.)',
                  meaning: 'PRST skorunun "T" bileşenidir; ağrı veya yüzeyel anestezide erken otonomik lakrimasyon başlar.',
                  pitfall: 'Antikolinerjikler (atropin/glikopirolat) gözyaşını kurutur; göz bandı tahrişi yalancı yaşarma yapabilir.',
                },
              ].map((row) => (
                <tr
                  key={row.name}
                  className={isDark ? 'hover:bg-slate-800/40 text-slate-300' : 'hover:bg-slate-50 text-slate-700'}
                >
                  <td className="py-2.5 px-3 font-semibold">{row.name}</td>
                  <td className="py-2.5 px-3 font-mono text-sky-600 dark:text-sky-400 whitespace-nowrap">{row.arc}</td>
                  <td className="py-2.5 px-3">{row.meaning}</td>
                  <td className="py-2.5 px-3 text-amber-700 dark:text-amber-300">{row.pitfall}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 3: HAVA YOLU VE SOMATİK REFLEKSLER                              */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`text-base font-bold ${headingColor}`}>
              Hava Yolu ve Somatik Refleksler
            </h4>
            <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
              Havayolu girişimi (LMA/SGA, laringoskopi), cerrahi insizyon ve güvenli ekstübasyon zamanlamasında hayat kurtaran
              en pratik yatak başı testlerdir.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Card 1: Jaw Thrust */}
          <div className={`p-4 rounded-xl border space-y-2 ${mutedSurface}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                Çene İtme Testi (Jaw Thrust) — SGA Altın Testi
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                High-Yield ★
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              İki el parmaklarıyla bilateral mandibula açılarından kuvvetli öne-yukarı itme uygulanır.{' '}
              <strong>Kaş çatma, baş/ekstremite çekme, yutkunma veya nefes tutma yoksa</strong> hipofarenks refleksleri
              baskılanmıştır → LMA/SGA güvenle yerleştirilebilir.
            </p>
            <div className={`text-[11px] pt-1.5 border-t ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <strong>Neden kirpikten üstün?</strong> Kirpik refleksi erken kaybolur; kirpik yokken takılan LMA öksürük ve
              laringospazm yapar. Çene itme doğrudan ağrılı derinlik eşiğidir.
            </div>
          </div>

          {/* Card 2: Trapezius Squeeze */}
          <div className={`p-4 rounded-xl border space-y-2 ${mutedSurface}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                Trapezius Sıkma Testi (Trapezius Squeeze)
              </span>
              <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400">
                Ağrılı Somatik
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              Trapezius kasının tam kalınlığı 1–2 saniye kuvvetle sıkılır. <strong>Ayak başparmağı veya ekstremite hareketi yoksa</strong>{' '}
              supraglottik havayolu veya cerrahi insizyon için yeterli analjezik/hipnotik derinliğe ulaşılmıştır.
            </p>
            <div className={`text-[11px] pt-1.5 border-t ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <strong>Klinik ipucu:</strong> Özellikle pediatrik sevofluran indüksiyonunda damar yolu veya LMA öncesi yüksek
              güvenilirlik gösterir.
            </div>
          </div>

          {/* Card 3: Airway Reflexes & Stage II Danger */}
          <div className={`p-4 rounded-xl border space-y-2 ${mutedSurface}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                Yutkunma, Öğürme (Gag) & Öksürük / Laringospazm
              </span>
              <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400">
                Evre II Tehlikesi!
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              CN IX ve X aracılı bu koruyucu refleksler <strong>yüzeyel anestezide (Guedel Evre II)</strong> hiperaktifleşir.
              Yutkunma, düzensiz solunum veya öğürme varken aspirasyon/ekstübasyon yapılması şiddetli <strong>laringospazm</strong>{' '}
              ve negatif basınçlı pulmoner ödem riskini doğurur.
            </p>
            <div className={`text-[11px] pt-1.5 border-t ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <strong>Ekstübasyon kuralı:</strong> Ya tam derin (refleksler kapalı) ya da tam uyanık (göz açma + emirlere uyma +
              düzenli solunum) ekstübe et — arada asla dokunma!
            </div>
          </div>

          {/* Card 4: Somatic Movement & Solunum Paterni */}
          <div className={`p-4 rounded-xl border space-y-2 ${mutedSurface}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-xs sm:text-sm font-bold ${headingColor}`}>
                Somatik Hareket (1 MAC) & Spontan Solunum Paterni
              </span>
              <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                Spinal Kord + Medulla
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${bodyColor}`}>
              İnsizyona amaçlı hareket <strong>spinal kord</strong> refleksidir (1.0 MAC’ta %50 baskılanır); hareket olması her zaman
              uyanıklık (farkındalık) anlamına gelmese de anesteziyi derinleştirme uyarısıdır. Spontan soluyan hastada{' '}
              <strong>takipne, nefes tutma veya ventilatörle çakışma</strong> yüzeyel anestezinin erken belirtisidir.
            </p>
            <div className={`text-[11px] pt-1.5 border-t ${isDark ? 'border-slate-700 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <strong>Unutma:</strong> Kas gevşetici (NMB) verildiğinde bu bölümdeki TÜM refleksler kaybolur — derinlik takibinde
              yalnızca otonomik yanıtlar, MAC ve varsa EEG kalır!
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM 4: OTONOMİK YANITLAR & İNTERAKTİF PRST (EVANS) SKORU            */}
      {/* ===================================================================== */}
      <section className={`rounded-2xl border p-5 sm:p-6 space-y-5 ${cardSurface}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <HeartPulse className="w-4 h-4" />
            </div>
            <div>
              <h4 className={`text-base font-bold ${headingColor}`}>
                Otonomik Yanıtlar ve PRST (Evans) Skoru
              </h4>
              <p className={`text-xs sm:text-sm mt-0.5 ${bodyColor}`}>
                Özellikle <strong>nöromüsküler bloker (NMB)</strong> altındaki hastalarda somatik hareket silindiği için, cerrahi
                stres ve yüzeyel anestezinin temel cihazsız göstergesi sempatik/otonomik aktivasyondur.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPrst({ p: 0, r: 0, s: 0, t: 0 })}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Skoru Sıfırla</span>
          </button>
        </div>

        {/* Interactive PRST Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-8 space-y-2.5">
            {PRST_DOMAINS.map((domain) => (
              <div key={domain.key} className={`p-3.5 rounded-xl border ${mutedSurface}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-violet-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {domain.letter}
                    </span>
                    <span className={`text-xs font-bold ${headingColor}`}>{domain.title}</span>
                  </div>
                  <span className={`text-[11px] ${subtleColor}`}>{domain.subtitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                  {domain.options.map((opt) => {
                    const active = prst[domain.key] === opt.score;
                    return (
                      <button
                        key={opt.score}
                        type="button"
                        onClick={() => setPrst((prev) => ({ ...prev, [domain.key]: opt.score }))}
                        className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-violet-600 text-white border-violet-500'
                            : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-violet-500/50'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-violet-400'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-bold">{opt.label}</span>
                          <span
                            className={`text-[11px] font-mono tabular-nums font-bold ${
                              active ? 'text-violet-100' : 'text-violet-600 dark:text-violet-400'
                            }`}
                          >
                            +{opt.score}
                          </span>
                        </div>
                        <div className={`text-[10px] mt-0.5 leading-snug ${active ? 'text-violet-100' : subtleColor}`}>
                          {opt.detail}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Live PRST Score Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            <div
              className={`rounded-2xl border p-5 flex-1 flex flex-col justify-between space-y-4 ${
                isDark ? prstInterpretation.darkBg : prstInterpretation.lightBg
              }`}
            >
              <div className="space-y-1">
                <div className={`text-[11px] font-mono font-semibold ${subtleColor}`}>
                  CANLI PRST (EVANS) SKORU
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-bold font-mono tabular-nums ${prstInterpretation.color}`}>
                    {totalPrst}
                  </span>
                  <span className={`text-sm font-mono ${subtleColor}`}>/ 8 puan</span>
                </div>
                <div className={`text-sm font-bold pt-1 ${prstInterpretation.color}`}>
                  {prstInterpretation.label}
                </div>
              </div>

              {/* Score bar */}
              <div className="space-y-1.5">
                <div className={`h-2.5 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-white/80'}`}>
                  <div
                    className={`h-full transition-all duration-200 ${
                      totalPrst <= 2 ? 'bg-emerald-500' : totalPrst <= 4 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${Math.max(8, (totalPrst / 8) * 100)}%` }}
                  />
                </div>
                <div className={`flex justify-between text-[10px] font-mono ${subtleColor}`}>
                  <span>0–2: Yeterli</span>
                  <span>3–4: Uyarı</span>
                  <span>5–8: Stres / Yüzeyel</span>
                </div>
              </div>

              <div className={`text-xs leading-relaxed border-t pt-3 ${isDark ? 'border-slate-700/70 text-slate-200' : 'border-slate-200/80 text-slate-700'}`}>
                {prstInterpretation.advice}
              </div>

              <div className={`grid grid-cols-4 gap-1.5 text-center font-mono tabular-nums text-[11px] pt-1`}>
                {(['p', 'r', 's', 't'] as PrstDomainKey[]).map((k) => (
                  <div
                    key={k}
                    className={`py-1.5 rounded-lg border ${
                      isDark ? 'bg-slate-900/70 border-slate-700 text-slate-200' : 'bg-white/90 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="text-[9px] uppercase text-slate-400">{k}</div>
                    <div className="font-bold">{prst[k]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PRST Confounders & Clinical Pearls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Yalancı Düşük PRST (Yüzeyelliği Gizleyenler!)</span>
            </div>
            <ul className={`space-y-1 text-xs leading-relaxed list-disc pl-4 ${bodyColor}`}>
              <li><strong>Beta-blokerler &amp; Kalsiyum kanal blokerleri:</strong> Taşikardi (R) ve hipertansiyonu (P) maskeler.</li>
              <li><strong>Deksmedetomidin / Klonidin &amp; Yüksek doz opioidler:</strong> Sempatik çıkışı baskılar (hasta uyanık olsa bile PRST 0–1 kalabilir!).</li>
              <li><strong>Antikolinerjikler (Atropin / Glikopirolat):</strong> Terleme (S) ve gözyaşını (T) kurutur.</li>
              <li><strong>Otonom nöropati (diyabet) &amp; Torasik epidural:</strong> Kardiyosempatik yanıtı köreltir.</li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl border space-y-1.5 ${mutedSurface}`}>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Yalancı Yüksek PRST (Derin Anesteziye Rağmen!)</span>
            </div>
            <ul className={`space-y-1 text-xs leading-relaxed list-disc pl-4 ${bodyColor}`}>
              <li><strong>Hiperkapni, hipoksi veya hafif hipovolemi:</strong> Sempatik deşarj ile P ve R’yi yükseltir.</li>
              <li><strong>Vazopresörler / Atropin / Ketamin:</strong> Doğrudan taşikardi ve kan basıncı artışı yapar.</li>
              <li><strong>Dolu mesane, turnike ağrısı, ateş / sepsis / MH:</strong> Terleme, taşikardi ve hipertansiyonu taklit eder.</li>
              <li><strong>Karar kuralı:</strong> PRST ≥3 ise körlemesine hipnotik artırmadan önce <em>ABC, EtCO₂, ilaç hattı ve analjeziyi</em> kontrol et!</li>
            </ul>
          </div>
        </div>

        {/* Bottom 3-Bullet High-Yield Takeaway Bar */}
        <div
          className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-violet-500/10 border-violet-500/30' : 'bg-violet-50/70 border-violet-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-violet-700 dark:text-violet-300">
            <CheckCircle2 className="w-4 h-4" />
            <span>Yatak Başı 3 Altın Özet (High-Yield)</span>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs leading-relaxed ${bodyColor}`}>
            <div className="flex items-start gap-1.5">
              <Activity className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
              <span>
                <strong>İndüksiyonda:</strong> Kirpik refleksi kaybı = bilinç kaybı; ancak LMA/SGA öncesi mutlaka{' '}
                <strong>Çene İtme (Jaw Thrust)</strong> ile derinliği doğrula.
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
              <span>
                <strong>NMB Altında:</strong> Hareket ve göz refleksleri güvenilmezdir; <strong>PRST + end-tidal ajan (≥0.7 MAC)</strong>{' '}
                ve TIVA’da mümkünse işlenmiş EEG birlikte kullanılmalıdır.
              </span>
            </div>
            <div className="flex items-start gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-violet-500 shrink-0 mt-0.5" />
              <span>
                <strong>PRST’nin Gücü:</strong> Duyarlılığı yüksek, özgüllüğü düşüktür; özellikle <strong>terleme + yaşarma</strong>{' '}
                varsa yetersiz anestezi/analjezi olasılığı çok yüksektir.
              </span>
            </div>
          </div>
        </div>

        {/* References */}
        <div
          className={`pt-3 border-t flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] ${
            isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
          }`}
        >
          <span className="inline-flex items-center gap-1 font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-violet-500" />
            Kaynaklar:
          </span>
          <span>Miller’s Anesthesia (Consciousness, Memory & Depth of Anesthesia)</span>
          <span aria-hidden="true">·</span>
          <span>Evans JM — Clinical Signs & PRST Score (1987)</span>
          <span aria-hidden="true">·</span>
          <span>NAP5 Report (Accidental Awareness During General Anaesthesia)</span>
          <span aria-hidden="true">·</span>
          <span>Drage et al. — Jaw Thrust Test for LMA Insertion</span>
        </div>
      </section>
    </div>
  );
};
