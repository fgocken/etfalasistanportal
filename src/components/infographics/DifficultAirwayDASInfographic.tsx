import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  Info,
  Layers,
  RotateCcw,
  ShieldAlert,
  Stethoscope,
  Wind,
  XCircle
} from 'lucide-react';
import mallampatiDiagramImg from '../../assets/images/mallampati_classification_diagram_1794666811804.jpg';

interface DifficultAirwayDASInfographicProps {
  isDark: boolean;
}

type AssessmentTab = 'lemon' | 'macocha' | 'matrices';
type DasPlanId = 'planA' | 'planB' | 'planC' | 'planD';

interface DifficultAirwayDefinition {
  id: string;
  title: string;
  criteria: string;
  clinicalThreshold: string;
  source: string;
}

const AIRWAY_DEFINITIONS: DifficultAirwayDefinition[] = [
  {
    id: 'facemask',
    title: 'Zor Yüz Maskesi Ventilasyonu',
    criteria:
      'Deneyimli anestezist tarafından yardımsız %100 O₂ ile SpO₂ > %90 korunamaması, gaz kaçağı, göğüs hareketi olmaması veya iki kişi / airway (Guedel/NP) gerektirmesi (Han Grade 3–4).',
    clinicalThreshold: 'Han Grade 3: İki operatör/airway ile · Grade 4: Ventile edilemiyor',
    source: 'ASA 2022'
  },
  {
    id: 'laryngoscopy',
    title: 'Zor Laringoskopi',
    criteria:
      'Doğrudan veya videolaringoskopi altında vokal kordların hiçbir bölümünün görüntülenememesi.',
    clinicalThreshold: 'Cormack-Lehane Grade III (yalnız epiglot) veya Grade IV (hiç yapı yok)',
    source: 'ASA 2022 / DAS'
  },
  {
    id: 'sad',
    title: 'Zor Supraglottik Havayolu (SAD)',
    criteria:
      'Supraglottik cihazın (i-gel / 2. jenerasyon LMA) yerleştirilmesi için birden fazla girişim gerekmesi veya etkin ventilasyon/sızdırmazlık sağlanamaması.',
    clinicalThreshold: '> 2–3 girişim veya SpO₂ / EtCO₂ korunamaması',
    source: 'ASA 2022 / DAS 2025'
  },
  {
    id: 'intubation',
    title: 'Zor Trakeal Entübasyon',
    criteria:
      'Trakeal tüpün yerleştirilmesi için birden fazla girişim, >10 dakika süre veya ek ileri hava yolu tekniklerinin (buji, VL, fiberoptik) zorunlu hale gelmesi.',
    clinicalThreshold: 'DAS 2025 limiti: En fazla 3 + 1 girişim (sonra başarısız ilan edilir)',
    source: 'DAS 2025 / ASA 2022'
  },
  {
    id: 'cico',
    title: 'Başarısız Entübasyon & CICO Krizi',
    criteria:
      'Plan A (Entübasyon), Plan B (SAD) ve Plan C (Yüz maskesi) sonrası yeterli oksijenasyonun sağlanamaması ("Cannot Intubate, Cannot Oxygenate").',
    clinicalThreshold: 'CICO ilanı → Gecikmeden Plan D (Neşter-Buji-Tüp eFONA)',
    source: 'DAS 2025'
  }
];

interface LemonRiskFactor {
  id: string;
  label: string;
  cutoff: string;
  points: number;
  detail: string;
}

const LEMON_FACTORS: LemonRiskFactor[] = [
  {
    id: 'mallampati',
    label: 'Modifiye Mallampati Sınıf III – IV',
    cutoff: 'Yumuşak damak/uvula tabanı görünmüyor',
    points: 2,
    detail: 'Oturur pozisyonda, baş nötral, dil maksimum dışarıda ve fonasyon ("Aaa") yapılmadan değerlendirilir.'
  },
  {
    id: 'tmd',
    label: 'Kısa Tiromental Mesafe (Patil Testi)',
    cutoff: '< 6.0 cm (< 3 parmak)',
    points: 2,
    detail: 'Baş tam ekstansiyondayken tiroid çentik ile çene ucu (mentum) arası mesafe; küçük mandibula ve anterior larinks göstergesi.'
  },
  {
    id: 'mouth',
    label: 'Kısıtlı Ağız Açıklığı (İnterinsizör Mesafe)',
    cutoff: '< 3.0 cm (< 2 parmak)',
    points: 2,
    detail: 'Laringoskop bıçağının girişi ve SAD yerleştirilmesi için kritik mekanik sınır.'
  },
  {
    id: 'ulbt',
    label: 'Üst Dudak Isırma Testi (ULBT) Sınıf III',
    cutoff: 'Alt kesiciler üst dudağı hiç ısıramıyor',
    points: 2,
    detail: 'Temporomandibular eklem protrüzyonunu ölçer; tek başına yüksek özgüllük ve pozitif prediktif değere sahiptir.'
  },
  {
    id: 'neck',
    label: 'Boyun Ekstansiyon Kısıtlılığı / Kalın Boyun',
    cutoff: 'Hareket < 35° veya Çevre > 43 cm',
    points: 1,
    detail: 'Servikal fiksasyon, ankilozan spondilit, travma boyunluğu veya obezitede oral-faringeal-laringeal aksların hizalanması bozulur.'
  },
  {
    id: 'smd',
    label: 'Kısa Sternomental Mesafe (Savva)',
    cutoff: '< 12.5 cm',
    points: 1,
    detail: 'Baş tam ekstansiyonda iken sternum üst çentiği ile çene ucu arasındaki toplam uzaklık.'
  },
  {
    id: 'look',
    label: 'Dış Görünüm Anomalisi / Obstrüksiyon / OSAS',
    cutoff: 'Retrognati, stridor, tümör, radyoterapi, sakal',
    points: 2,
    detail: 'Hem maske sızdırmazlığını hem de glottik görünümü bozan anatomik engeller; uyanık entübasyon endikasyonu doğurabilir.'
  }
];

interface MacochaItem {
  id: string;
  label: string;
  points: number;
  category: 'Hasta' | 'Patoloji' | 'Operatör';
}

const MACOCHA_ITEMS: MacochaItem[] = [
  { id: 'm_mp', label: 'Mallampati Sınıf III veya IV', points: 5, category: 'Hasta' },
  { id: 'm_osas', label: 'Obstrüktif Uyku Apnesi Sendromu (OSAS)', points: 2, category: 'Hasta' },
  { id: 'm_cerv', label: 'Servikal omurga hareket kısıtlılığı', points: 1, category: 'Hasta' },
  { id: 'm_mouth', label: 'Kısıtlı ağız açıklığı (< 3 cm)', points: 1, category: 'Hasta' },
  { id: 'm_coma', label: 'Koma (GKS < 8)', points: 1, category: 'Patoloji' },
  { id: 'm_hypox', label: 'Ağır hipoksemi (SpO₂ < %80)', points: 1, category: 'Patoloji' },
  { id: 'm_nonanesth', label: 'Anestezist dışı uygulayıcı', points: 1, category: 'Operatör' }
];

const MALLAMPATI_CLASSES = [
  {
    cls: 'Sınıf I',
    structures: 'Yumuşak damak, fauces, uvula ve ön/arka tonsil plikaları tam görünür.',
    risk: 'Düşük Risk'
  },
  {
    cls: 'Sınıf II',
    structures: 'Yumuşak damak, fauces ve uvulanın çoğu görünür; tonsil plikaları gizlidir.',
    risk: 'Düşük Risk'
  },
  {
    cls: 'Sınıf III',
    structures: 'Yalnızca yumuşak damak ve uvulanın tabanı görünür.',
    risk: 'Orta–Yüksek Risk'
  },
  {
    cls: 'Sınıf IV',
    structures: 'Yumuşak damak dahi görünmez; sadece sert damak seçilebilir.',
    risk: 'Yüksek Risk'
  }
];

interface DasPlanDetail {
  id: DasPlanId;
  code: string;
  title: string;
  subtitle: string;
  attemptLimit: string;
  maxAttemptsNum: number;
  goal: string;
  keyActions: string[];
  criticalRules: string[];
  ifSuccess: string;
  ifFailure: string;
  nextPlan?: DasPlanId;
}

const DAS_2025_PLANS: DasPlanDetail[] = [
  {
    id: 'planA',
    code: 'PLAN A',
    title: 'Trakeal Entübasyon (İlk Girişimde Başarıyı Maksimize Et)',
    subtitle: 'DAS 2025 Birincil Strateji: Optimize Edilmiş Videolaringoskopi & Sürekli Oksijenasyon',
    attemptLimit: 'Maksimum 3 + 1 Girişim',
    maxAttemptsNum: 4,
    goal: 'Yeterli oksijenasyon eşliğinde en yüksek ilk geçiş entübasyon başarısını sağlamak ve havayolu travmasından kaçınmak.',
    keyActions: [
      'Pozisyonu optimize et: Nötralde "sniffing" pozisyonu; obez/yüksek risklide "ramped" (kulak-sternum hizası).',
      'Tam preoksijenasyon (EtO₂ > %90) ve girişim boyunca sürekli apneik oksijenasyon (nazal kanül 15 L/dk veya HFNO).',
      'Videolaringoskopi (VL) DAS 2025 tarafından ilk seçenek/erken standart olarak öne çıkarılır (uygun pala: Macintosh veya hiperangüle + uygun stile).',
      'Tam nöromüsküler blokajdan emin ol; eksternal laringeal manipülasyon (BURP / OELM) ve buji/stile kullan.',
      'Her başarısız girişim arasında tekniği anlamlı şekilde değiştir (operatör, pala tipi/boyutu, pozisyon).'
    ],
    criticalRules: [
      'En fazla 3 standart/optimize girişim yapılır; yalnızca farklı bir teknik veya daha kıdemli bir operatörle +1 son girişime izin verilir.',
      'Körlemesine tekrarlayan denemeler laringeal ödem ve kanama yaratarak Plan B ve Plan C’yi sabote eder!'
    ],
    ifSuccess: 'Dalga formu kapnografi (EtCO₂) ve klinik doğrulama ile tüpü tespit et.',
    ifFailure: 'Yüksek sesle "Plan A başarısız — Plan B’ye geçiyorum" ilanı yap ve yardım çağır.',
    nextPlan: 'planB'
  },
  {
    id: 'planB',
    code: 'PLAN B',
    title: 'Supraglottik Havayolu Cihazı (SAD) ile Oksijenasyonun Kurtarılması',
    subtitle: '2. Jenerasyon SAD (i-gel / LMA ProSeal / Supreme) ile Oksijenasyonu Güvenceye Al',
    attemptLimit: 'Maksimum 3 Girişim',
    maxAttemptsNum: 3,
    goal: 'Entübasyon başarısız olduğunda hipoksiyi önlemek için 2. jenerasyon SAD ile ventilasyon ve oksijenasyonu sağlamak.',
    keyActions: [
      'Gastrik drenaj kanallı ve yüksek sızdırmazlık basıncına sahip 2. Jenerasyon SAD seç.',
      'En fazla 3 yerleştirme denemesi yap; başarısız olursa boyut veya cihaz tipini değiştir.',
      'Uygulanmış krikoid basıyı yerleştirme sırasında mutlaka gevşet veya tamamen kaldır.',
      'Ventilasyon sağlanırsa "DUR VE DÜŞÜN (Stop & Think)": 1) Hastayı uyandır, 2) SAD içinden fiberoptik kılavuzlu entübasyon yap, 3) Uygunsa SAD ile vakaya devam et, 4) Cerrahi havayolu/trakeostomi aç.'
    ],
    criticalRules: [
      'SAD içinden KÖRLEMESİNE tüp veya buji itmek KESİNLİKLE YASAKTIR (yüksek başarısızlık ve perforasyon riski).',
      'SAD ile yeterli oksijenasyon sağlanamazsa girişimlere devam etme!'
    ],
    ifSuccess: 'EtCO₂ ile ventilasyonu doğrula → "Dur ve Düşün" ekibiyle 4 seçenekten en güvenlisini seç.',
    ifFailure: '"Plan B başarısız — Plan C’ye geçiyorum" anonsu yap.',
    nextPlan: 'planC'
  },
  {
    id: 'planC',
    code: 'PLAN C',
    title: 'Yüz Maskesi Ventilasyonu (Son Oksijenasyon & Uyandırma Planı)',
    subtitle: 'İki Kişilik Teknik + Havayolu Yardımcıları + Kas Gevşetici Değerlendirmesi',
    attemptLimit: 'Son Kurtarma Basamağı',
    maxAttemptsNum: 1,
    goal: 'Yüz maskesi ile oksijenasyonu sürdürmek; sağlanırsa hastayı uyandırmak, sağlanamazsa gecikmeden CICO ilan etmek.',
    keyActions: [
      'İki kişilik (VE-grip / iki el) yüz maskesi ventilasyonuna geç.',
      'Orofaringeal (Guedel) ve/veya nazofaringeal airway yerleştir; çene itme (jaw thrust) uygula.',
      'Laringospazm veya kas rijiditesini dışlamak için nöromüsküler blokajın tam olduğundan emin ol; ancak uyandırma kararı verilecekse Rokuronyum için Sugammadeks (16 mg/kg) hazırla.',
      'Oksijenasyon başarılıysa hastayı UYANDIR (default en güvenli seçenek) ve ileri uyanık/planlı strateji kur.'
    ],
    criticalRules: [
      'Sugammadeks verilmesi, mekanik üst havayolu obstrüksiyonu olan hastada kendiliğinden solunumu garanti etmez; oksijenasyon çökerken uyandırma umuduyla Plan D geciktirilmemelidir!'
    ],
    ifSuccess: 'Hastayı uyandır (Sugammadeks 16 mg/kg gerekirse) ve güvenli uyanık planlamaya geç.',
    ifFailure: 'Yüksek sesle "VENTİLE EDİLEMİYOR, OKSİJENLENEMİYOR (CICO) — PLAN D BAŞLIYOR" ilanı yap!',
    nextPlan: 'planD'
  },
  {
    id: 'planD',
    code: 'PLAN D',
    title: 'Acil Boyun Önü Hava Yolu (eFONA — Neşter-Buji-Tüp)',
    subtitle: 'CICO Krizinde DAS 2025/2015 Tek Altın Standart Cerrahi Kurtarma Tekniği',
    attemptLimit: 'Acil Tek Kesin Girişim',
    maxAttemptsNum: 1,
    goal: 'CICO durumunda saniyeler içinde trakeaya büyük çaplı, kaflı ve kapnografi ile doğrulanabilir bir tüp yerleştirmek.',
    keyActions: [
      'Ekibe yüksek sesle "CICO — Plan D başlıyor" ilan et; hastanın omuzları altına destek koyup boynu tam ekstansiyona al.',
      'Tam kas gevşetmesi olduğundan emin ol (yetersizse ek kas gevşetici).',
      'Laryngeal Handshake (dominant olmayan el ile larinksi kavra) tekniği ile krikotiroid membranı (CTM) palpe et.',
      '10 Numara Geniş Neşter ile transvers kesi (CTM palpe edilemiyorsa 8–10 cm dikey orta hat cilt kesisi + künt diseksiyon ardından yatay CTM kesisi).',
      'Neşteri çıkarmadan 90° döndür (keskin yüz kaudal) → Bujiyi 10–15 cm trakeaya kaydır → Üzerinden 6.0 mm kaflı ETT geçir → Kafı şişir ve EtCO₂ doğrula.'
    ],
    criticalRules: [
      'Dar lümenli iğne/kanül krikotiroidotomi (%50 üzeri başarısızlık, katlanma ve barotravma riski) DAS yetişkin algoritmasında önerilmez.',
      'Krikotiroidotomi sonrası hasta uyandırılmaz/stabilize edilir ve acil KBB/yoğun bakım devri yapılır.'
    ],
    ifSuccess: '6.0 mm kaflı tüpten %100 O₂ ventilasyonu sağla, dalga formu EtCO₂ doğrula ve tüpü sabitle.',
    ifFailure: 'Dikey orta hat cilt kesisiyle derin künt diseksiyon (parmakla CTM/trakea lokalizasyonu) tekrarla + eşzamanlı KPR hazırlığı.'
  }
];

export const DifficultAirwayDASInfographic: React.FC<DifficultAirwayDASInfographicProps> = ({ isDark }) => {
  const [assessmentTab, setAssessmentTab] = useState<AssessmentTab>('lemon');
  const [selectedLemonIds, setSelectedLemonIds] = useState<string[]>([]);
  const [selectedMacochaIds, setSelectedMacochaIds] = useState<string[]>([]);

  // Interactive DAS 2025 Plan A-D Simulator State
  const [activePlanId, setActivePlanId] = useState<DasPlanId>('planA');
  const [planAAttempts, setPlanAAttempts] = useState<number>(1);
  const [planBAttempts, setPlanBAttempts] = useState<number>(1);
  const [simOutcome, setSimOutcome] = useState<'in-progress' | 'success' | 'cico-done'>('in-progress');
  const [mallampatiImgError, setMallampatiImgError] = useState<boolean>(false);

  const toggleLemon = (id: string) => {
    setSelectedLemonIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const toggleMacocha = (id: string) => {
    setSelectedMacochaIds(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const lemonScore = LEMON_FACTORS.filter(f => selectedLemonIds.includes(f.id)).reduce((s, f) => s + f.points, 0);
  const macochaScore = MACOCHA_ITEMS.filter(m => selectedMacochaIds.includes(m.id)).reduce((s, m) => s + m.points, 0);

  const activePlan = DAS_2025_PLANS.find(p => p.id === activePlanId) || DAS_2025_PLANS[0];

  const handleNextAttempt = () => {
    if (activePlanId === 'planA') {
      if (planAAttempts < 4) {
        setPlanAAttempts(prev => prev + 1);
      } else {
        setActivePlanId('planB');
        setSimOutcome('in-progress');
      }
    } else if (activePlanId === 'planB') {
      if (planBAttempts < 3) {
        setPlanBAttempts(prev => prev + 1);
      } else {
        setActivePlanId('planC');
        setSimOutcome('in-progress');
      }
    }
  };

  const handleEscalatePlan = () => {
    if (activePlan.nextPlan) {
      setActivePlanId(activePlan.nextPlan);
      setSimOutcome('in-progress');
    } else {
      setSimOutcome('cico-done');
    }
  };

  const resetDasSimulator = () => {
    setActivePlanId('planA');
    setPlanAAttempts(1);
    setPlanBAttempts(1);
    setSimOutcome('in-progress');
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark
          ? 'bg-gradient-to-r from-cyan-950/30 via-slate-900 to-slate-900 border-cyan-500/30'
          : 'bg-gradient-to-r from-cyan-50 via-white to-slate-50 border-cyan-200 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
            ZOR HAVAYOLU &amp; KRİZ ALGORİTMASI
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            DAS 2025 Yetişkin Kılavuzu &amp; ASA 2022 Standartları
          </span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Zor Havayolu: Tanım, Risk Skorları ve DAS 2025 İnteraktif Plan A–D Algoritması
        </h3>

        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Preoperatif anatomik ve fizyolojik risk taramasından (LEMON, Mallampati, ULBT, MACOCHA, MOANS/RODS/SHORT) başlayarak, beklenmedik zor entübasyonda kesintisiz oksijenasyon ve adım adım <strong>Plan A → Plan B → Plan C → Plan D (eFONA)</strong> yönetimini simüle eden klinik kılavuz.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2">
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/41203471/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
            <span>DAS 2025 Guidelines (Ahmad et al., BJA · PMID: 41203471)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/34762729/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>ASA 2022 Difficult Airway (PMID: 34762729)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. Zor Havayolu Tanımları (ASA 2022 & DAS 2025) */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-500" />
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              1. Zor Havayolu Alt Tanımları (ASA 2022 &amp; DAS 2025)
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">5 Klinik Senaryo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AIRWAY_DEFINITIONS.map((def, idx) => (
            <div
              key={def.id}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-2.5 ${
                def.id === 'cico'
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-rose-50/70 border-rose-200'
                  : isDark
                    ? 'bg-slate-950/50 border-slate-800'
                    : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {idx + 1}. {def.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{def.source}</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  {def.criteria}
                </p>
              </div>
              <div className={`pt-2 border-t text-[11px] font-mono tabular-nums font-semibold ${
                def.id === 'cico'
                  ? 'border-rose-500/30 text-rose-600 dark:text-rose-300'
                  : 'border-slate-200/60 dark:border-slate-800 text-cyan-700 dark:text-cyan-300'
              }`}>
                {def.clinicalThreshold}
              </div>
            </div>
          ))}
        </div>

        {/* Beklenen Zor Havayolu: Uyanık Entübasyon (ATI) Tanım & Seçim Kriteri */}
        <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
          isDark ? 'bg-indigo-950/20 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
        }`}>
          <div className="font-bold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>Beklenen Zor Havayolu: Ne Zaman Uyanık Entübasyon (ATI) Seçilir? (ASA 2022 &amp; DAS ATI)</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Preoperatif değerlendirmede hem <strong>zor entübasyon</strong> hem de <strong>zor maske/SAD ventilasyonu</strong> şüphesi birlikte varsa, yüksek aspirasyon riski + zor havayolu kombinasyonu mevcutsa veya baş-boyun tümör/radyoterapi/ankiloz nedeniyle CICO riski yüksekse indüksiyon yapılmamalıdır. Topikal lidokain (≤ 9 mg/kg yağsız ağırlık) + minimal sedasyon (Remifentanil / Deksmedetomidin) + oksijenasyon eşliğinde <strong>Uyanık Fiberoptik veya Uyanık Videolaringoskopi</strong> tercih edilmelidir.
          </p>
        </div>
      </div>

      {/* 3. Preoperatif Değerlendirme & İnteraktif Risk Skorları */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-amber-500" />
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                2. Preoperatif Değerlendirme &amp; İnteraktif Risk Skorları
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tek bir tarama testinin duyarlılığı düşüktür; çoklu muayene + risk skoru kombinasyonu önerilir.
              </p>
            </div>
          </div>

          {/* Sub-tabs */}
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setAssessmentTab('lemon')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                assessmentTab === 'lemon'
                  ? 'bg-cyan-600 text-white border-cyan-500'
                  : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              LEMON &amp; Mallampati Sayacı
            </button>
            <button
              type="button"
              onClick={() => setAssessmentTab('macocha')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                assessmentTab === 'macocha'
                  ? 'bg-amber-600 text-white border-amber-500'
                  : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              MACOCHA Skoru (0–12)
            </button>
            <button
              type="button"
              onClick={() => setAssessmentTab('matrices')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                assessmentTab === 'matrices'
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : isDark
                    ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              MOANS · RODS · SHORT &amp; Fizyolojik
            </button>
          </div>
        </div>

        {/* Tab A: LEMON + Mallampati */}
        {assessmentTab === 'lemon' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {LEMON_FACTORS.map(factor => {
                const checked = selectedLemonIds.includes(factor.id);
                return (
                  <button
                    key={factor.id}
                    type="button"
                    onClick={() => toggleLemon(factor.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      checked
                        ? isDark
                          ? 'bg-amber-950/30 border-amber-500 text-white'
                          : 'bg-amber-50 border-amber-400 text-slate-900'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold leading-snug">{factor.label}</span>
                      <span className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded font-bold shrink-0 ${
                        checked
                          ? 'bg-amber-500 text-white'
                          : isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-500 border border-slate-200'
                      }`}>
                        +{factor.points}p
                      </span>
                    </div>
                    <div className="text-[11px] font-mono tabular-nums font-semibold text-cyan-600 dark:text-cyan-400">
                      Eşik: {factor.cutoff}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                      {factor.detail}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* LEMON Live Summary */}
            <div className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
              lemonScore >= 4
                ? isDark ? 'bg-rose-950/25 border-rose-500/40' : 'bg-rose-50 border-rose-300'
                : lemonScore >= 2
                  ? isDark ? 'bg-amber-950/25 border-amber-500/40' : 'bg-amber-50 border-amber-300'
                  : isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Seçili Anatomik Risk Yükü:
                  </span>
                  <span className="font-mono tabular-nums text-sm font-black text-rose-600 dark:text-rose-300">
                    {lemonScore} Puan ({selectedLemonIds.length} bulgu)
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lemonScore >= 4
                    ? 'YÜKSEK BEKLENEN ZOR HAVAYOLU RİSKİ: Uyanık Fiberoptik/VL Entübasyon (ATI) veya çift planlı Videolaringoskop + 2. jen SAD + eFONA kiti hazır tutulmalıdır; kıdemli yardım sağlanmalıdır.'
                    : lemonScore >= 2
                      ? 'ORTA RİSK: İndüksiyon öncesi Videolaringoskop, buji ve 2. jenerasyon SAD odada hazır bulundurulmalı, tam preoksijenasyon ve ramped pozisyon uygulanmalıdır.'
                      : 'DÜŞÜK ANATOMİK RİSK: Standart indüksiyon uygundur; her vakada beklenmedik zor havayolu için DAS 2025 Plan A–D ekipmanı erişilebilir olmalıdır.'}
                </p>
              </div>
              {selectedLemonIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedLemonIds([])}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold shrink-0 cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sıfırla</span>
                </button>
              )}
            </div>

            {/* Mallampati Anatomical Diagram + Reference Strip */}
            <div className={`p-4 rounded-xl border space-y-3 ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h5 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Modifiye Mallampati Sınıflaması (Sınıf I – IV) Görsel Referansı
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Değerlendirme kuralı: Hasta oturur pozisyonda, baş nötral, ağız tam açık, dil maksimum dışarıda ve fonasyon (&ldquo;Aaa&rdquo;) yapılmadan bakılır.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">Samsoon &amp; Young (1987)</span>
              </div>

              {!mallampatiImgError ? (
                <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white">
                  <img
                    src={mallampatiDiagramImg}
                    alt="Modifiye Mallampati Sınıflaması Sınıf I, II, III ve IV anatomik görseli"
                    referrerPolicy="no-referrer"
                    onError={() => setMallampatiImgError(true)}
                    className="w-full max-h-[300px] object-contain mx-auto bg-white"
                  />
                </div>
              ) : (
                <div className={`p-4 rounded-xl border text-center text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  Modifiye Mallampati Sınıf I–IV anatomik görseli yüklenemedi; aşağıdaki sınıf tanımlarını inceleyiniz.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {MALLAMPATI_CLASSES.map((m, idx) => (
                  <div
                    key={m.cls}
                    className={`p-3 rounded-xl border space-y-1 text-xs ${
                      idx >= 2
                        ? isDark ? 'bg-rose-950/15 border-rose-500/30' : 'bg-rose-50/50 border-rose-200'
                        : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{m.cls}</span>
                      <span className={`text-[10px] font-mono font-bold ${
                        idx >= 2 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                      }`}>
                        {m.risk}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug">{m.structures}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab B: MACOCHA Score */}
        {assessmentTab === 'macocha' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {MACOCHA_ITEMS.map(item => {
                const checked = selectedMacochaIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleMacocha(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      checked
                        ? isDark
                          ? 'bg-amber-950/35 border-amber-500 text-white'
                          : 'bg-amber-50 border-amber-400 text-slate-900'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-slate-400">{item.category}</span>
                      <span className={`text-xs font-mono tabular-nums font-bold px-2 py-0.5 rounded ${
                        checked
                          ? 'bg-amber-500 text-white'
                          : isDark ? 'bg-slate-800 text-amber-400' : 'bg-white border border-slate-200 text-amber-700'
                      }`}>
                        +{item.points}
                      </span>
                    </div>
                    <div className="text-xs font-bold leading-snug">{item.label}</div>
                  </button>
                );
              })}
            </div>

            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              macochaScore >= 3
                ? isDark ? 'bg-rose-950/25 border-rose-500/40' : 'bg-rose-50 border-rose-300'
                : isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">MACOCHA Skoru:</span>
                  <span className="font-mono tabular-nums text-base font-black text-rose-600 dark:text-rose-300">
                    {macochaScore} / 12 Puan
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {macochaScore >= 3
                    ? 'MACOCHA ≥ 3: YÜKSEK ZOR ENTÜBASYON RİSKİ! Videolaringoskop birinci tercih olmalı, iki operatör + apneik oksijenasyon/NIV preoksijenasyon ve acil eFONA kiti hazır tutulmalıdır.'
                    : 'MACOCHA < 3: Düşük kritik hasta zor entübasyon skoru (negatif prediktif değer %97–98); yine de fizyolojik stabilizasyon ve kapnografi şarttır.'}
                </p>
              </div>
              {selectedMacochaIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedMacochaIds([])}
                  className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold shrink-0 cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sıfırla</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab C: MOANS, RODS, SHORT & Physiologically Difficult Airway */}
        {assessmentTab === 'matrices' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
            <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold text-amber-600 dark:text-amber-400">MOANS — Zor Yüz Maskesi Ventilasyonu (≥2 Kriter = Yüksek Risk)</div>
              <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                <li><strong>M — Mask seal:</strong> Sakal, yüz travması, nazogastrik sonda</li>
                <li><strong>O — Obesity / Obstruction:</strong> BMI &gt; 26–30 kg/m², boyun kitlesi, horlama</li>
                <li><strong>A — Age:</strong> Yaş &gt; 55 (faringeal tonus kaybı)</li>
                <li><strong>N — No teeth:</strong> Dişsizlik (maske oturması için protezler yerinde bırakılabilir)</li>
                <li><strong>S — Stiff lungs / OSAS:</strong> Ağır astım, KOAH, ARDS, uyku apnesi</li>
              </ul>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="font-bold text-indigo-600 dark:text-indigo-400">RODS &amp; SHORT — Zor SAD ve Zor eFONA Prediktörleri</div>
              <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                <li><strong>RODS (Zor LMA/SAD):</strong> <strong>R</strong>estricted mouth opening (&lt;2 cm), <strong>O</strong>bstruction, <strong>D</strong>isrupted/distorted airway, <strong>S</strong>tiff lungs/cervical spine</li>
                <li><strong>SHORT (Zor Krikotiroidotomi):</strong> <strong>S</strong>urgery/Scar (eski boyun cerrahisi), <strong>H</strong>ematoma/infection, <strong>O</strong>besity (palpasyonsuz boyun → POCUS CTM işaretle), <strong>R</strong>adiation, <strong>T</strong>umor</li>
              </ul>
            </div>

            <div className={`md:col-span-2 p-4 rounded-xl border space-y-2 ${isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'}`}>
              <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Fizyolojik Zor Havayolu (Anatomik Olmayan Arrest Riskleri — İndüksiyon Öncesi Optimize Et!)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
                  <strong>1. Hipoksemi:</strong> NIV/CPAP preoksijenasyon + HFNO/NODESAT 15 L/dk apneik oksijenasyon.
                </div>
                <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
                  <strong>2. Hipotansiyon / Şok:</strong> İndüksiyon öncesi sıvı + push-doz/infüzyon Noradrenalin + Ketamin/Etomidat.
                </div>
                <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
                  <strong>3. Sağ Kalp Yetmezliği:</strong> Hiperkapni, hipoksi ve aşırı PEEP RV yetmezliğini arrestle sonuçlandırır.
                </div>
                <div className={`p-2.5 rounded-lg border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-rose-200'}`}>
                  <strong>4. Ağır Asidoz / Dolu Mide:</strong> Apne süresini kısa tut (ROK/RSI) veya uyanık entübasyon değerlendir.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. EN GÜNCEL DAS 2025 İNTERAKTİF PLAN A–D ALGORİTMASI */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-rose-500" />
            <div>
              <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                3. DAS 2025 İnteraktif Plan A – D Algoritması
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Planlar arasında tıklayarak veya simülatör düğmeleriyle basamak atlayıp kriz yönetimini izleyin.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetDasSimulator}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer self-start sm:self-auto ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Algoritmayı Başa Al (Plan A)</span>
          </button>
        </div>

        {/* Continuous Core Pillars Across All Plans (DAS 2025) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-[11px]">
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${
            isDark ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <Wind className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>Sürekli Oksijenasyon:</strong> Tüm Plan A–D boyunca kesintisiz O₂ verilir.</span>
          </div>
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${
            isDark ? 'bg-sky-950/20 border-sky-500/30 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}>
            <Stethoscope className="w-4 h-4 text-sky-500 shrink-0" />
            <span><strong>İnsan Faktörleri &amp; Yardım:</strong> Başarısızlığı sesli ilan et, erken yardım çağır.</span>
          </div>
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${
            isDark ? 'bg-purple-950/20 border-purple-500/30 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
          }`}>
            <ShieldAlert className="w-4 h-4 text-purple-500 shrink-0" />
            <span><strong>Zorunlu Kapnografi:</strong> Her adımda dalga formu EtCO₂ ile doğrula.</span>
          </div>
        </div>

        {/* Interactive A -> B -> C -> D Step Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {DAS_2025_PLANS.map((plan, index) => {
            const isActive = plan.id === activePlanId;
            const isPast = DAS_2025_PLANS.findIndex(p => p.id === activePlanId) > index;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => {
                  setActivePlanId(plan.id);
                  setSimOutcome('in-progress');
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  isActive
                    ? plan.id === 'planD'
                      ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                      : 'bg-cyan-600 text-white border-cyan-500 shadow-sm'
                    : isPast
                      ? isDark
                        ? 'bg-slate-800/70 border-slate-700 text-slate-400'
                        : 'bg-slate-100 border-slate-300 text-slate-500'
                      : isDark
                        ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-mono text-[11px] font-black tracking-wider">{plan.code}</span>
                  <span className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-600 border border-slate-200'
                  }`}>
                    {plan.id === 'planA'
                      ? `${planAAttempts}/4 Deneme`
                      : plan.id === 'planB'
                        ? `${planBAttempts}/3 Deneme`
                        : plan.attemptLimit}
                  </span>
                </div>
                <div className="text-xs font-bold leading-snug line-clamp-2">{plan.title.split('(')[0]}</div>
              </button>
            );
          })}
        </div>

        {/* Active Plan Interactive Panel */}
        <div className={`p-5 rounded-2xl border space-y-4 ${
          activePlan.id === 'planD'
            ? isDark ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50/70 border-rose-300'
            : isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/90 border-slate-200'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200/70 dark:border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`font-mono text-xs font-black px-2.5 py-0.5 rounded ${
                  activePlan.id === 'planD' ? 'bg-rose-600 text-white' : 'bg-cyan-600 text-white'
                }`}>
                  {activePlan.code}
                </span>
                <span className="font-mono tabular-nums text-xs font-bold text-amber-600 dark:text-amber-400">
                  {activePlan.attemptLimit}
                </span>
              </div>
              <h5 className={`text-base font-bold mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activePlan.title}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">{activePlan.subtitle}</p>
            </div>

            {/* Interactive Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {(activePlan.id === 'planA' || activePlan.id === 'planB') && (
                <button
                  type="button"
                  onClick={handleNextAttempt}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700' : 'bg-white border-amber-300 text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  {activePlan.id === 'planA'
                    ? planAAttempts < 4
                      ? `Deneme #${planAAttempts} Başarısız (+Teknik Değiştir)`
                      : '3+1 Limiti Doldu → Plan B'
                    : planBAttempts < 3
                      ? `SAD Deneme #${planBAttempts} Başarısız`
                      : '3 Deneme Doldu → Plan C'}
                </button>
              )}

              <button
                type="button"
                onClick={() => setSimOutcome('success')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Sağlandı (Başarılı)</span>
              </button>

              {activePlan.nextPlan ? (
                <button
                  type="button"
                  onClick={handleEscalatePlan}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                >
                  <span>{activePlan.nextPlan.replace('plan', 'Plan ').toUpperCase()}'e Geç</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleEscalatePlan}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold cursor-pointer"
                >
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>eFONA Tamamlandı</span>
                </button>
              )}
            </div>
          </div>

          {/* Simulator Feedback Banner */}
          {simOutcome === 'success' && (
            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
              isDark ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <strong>{activePlan.code} Başarılı: </strong>
                {activePlan.ifSuccess}
              </div>
            </div>
          )}

          {simOutcome === 'cico-done' && (
            <div className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
              isDark ? 'bg-amber-950/30 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}>
              <AlertOctagon className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong>eFONA Sonrası Yönetim: </strong>
                {activePlan.ifSuccess} · Hasta kesinlikle uyandırılmaz; cerrahi ekip &amp; YBÜ devri ile hava yolu güvenliği belgelenir.
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Uygulanacak Kritik Adımlar:</div>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
                {activePlan.keyActions.map((act, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed">
                    <span className="font-mono tabular-nums font-bold text-cyan-600 dark:text-cyan-400 shrink-0">{idx + 1}.</span>
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className={`p-3.5 rounded-xl border space-y-1.5 ${
                isDark ? 'bg-rose-950/20 border-rose-500/30 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                  <XCircle className="w-4 h-4" />
                  <span>Kritik Sınırlar &amp; Yasaklar</span>
                </div>
                {activePlan.criticalRules.map((rule, idx) => (
                  <p key={idx} className="text-[11px] leading-relaxed">• {rule}</p>
                ))}
              </div>

              <div className={`p-3 rounded-xl border text-[11px] space-y-1 ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <div><strong className="text-emerald-600 dark:text-emerald-400">Başarılıysa: </strong>{activePlan.ifSuccess}</div>
                <div><strong className="text-rose-600 dark:text-rose-400">Başarısızsa: </strong>{activePlan.ifFailure}</div>
              </div>
            </div>
          </div>
        </div>

        {/* DAS 2025 Plan A-D Özet Akış Grafiği */}
        <div className={`p-4 sm:p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/90 border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200/70 dark:border-slate-800">
            <div>
              <h5 className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
                DAS 2025 Plan A – D Özet Akış Şeması (Tek Bakışta Kriz Kaskadı)
              </h5>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tüm adımlarda kesintisiz oksijenasyon + insan faktörleri + dalga formu EtCO₂ zorunludur. İncelemek için ilgili plana tıklayabilirsiniz.
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400 shrink-0">Ahmad et al., BJA 2026</span>
          </div>

          {/* Continuous Horizontal Banner inside Summary Diagram */}
          <div className={`px-3 py-2 rounded-lg border text-center text-[11px] font-semibold ${
            isDark ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200' : 'bg-cyan-50 border-cyan-200 text-cyan-900'
          }`}>
            KESİNTİSİZ ÇEKİRDEK İLKE: Preoksijenasyon + Apneik O₂ / HFNO · Sesli İlan &amp; Yardım Çağır · Dalga Formu Kapnografi
          </div>

          {/* 4-Stage Visual Flow Diagram */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-2 items-stretch">
            {/* PLAN A NODE */}
            <button
              type="button"
              onClick={() => {
                setActivePlanId('planA');
                setSimOutcome('in-progress');
              }}
              className={`lg:col-span-2 p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                activePlanId === 'planA'
                  ? 'ring-2 ring-cyan-500 border-cyan-500 bg-cyan-500/10'
                  : isDark ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 hover:border-cyan-400'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-cyan-600 dark:text-cyan-400">PLAN A</span>
                  <span className="font-mono tabular-nums text-[10px] font-bold text-slate-400">3+1</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Trakeal Entübasyon</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  Erken Videolaringoskopi, pozisyon, NMB, buji/stile.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 space-y-1 text-[10px]">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Başarılı: EtCO₂ doğrula</div>
                <div className="font-semibold text-rose-600 dark:text-rose-400">✕ Başarısız → Plan B</div>
              </div>
            </button>

            <div className="flex items-center justify-center text-slate-400 py-0.5">
              <ArrowRight className="w-4 h-4 hidden lg:block" />
              <ArrowDown className="w-4 h-4 lg:hidden" />
            </div>

            {/* PLAN B NODE */}
            <button
              type="button"
              onClick={() => {
                setActivePlanId('planB');
                setSimOutcome('in-progress');
              }}
              className={`lg:col-span-2 p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                activePlanId === 'planB'
                  ? 'ring-2 ring-sky-500 border-sky-500 bg-sky-500/10'
                  : isDark ? 'bg-slate-900 border-slate-800 hover:border-sky-500/40' : 'bg-white border-slate-200 hover:border-sky-400'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-sky-600 dark:text-sky-400">PLAN B</span>
                  <span className="font-mono tabular-nums text-[10px] font-bold text-slate-400">Maks 3</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">2. Jen. SAD (O₂ Kurtar)</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  Krikoidi gevşet, kör entübasyon YASAK.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 space-y-1 text-[10px]">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400">✓ O₂ OK: Dur ve Düşün (4 yol)</div>
                <div className="font-semibold text-rose-600 dark:text-rose-400">✕ Başarısız → Plan C</div>
              </div>
            </button>

            <div className="flex items-center justify-center text-slate-400 py-0.5">
              <ArrowRight className="w-4 h-4 hidden lg:block" />
              <ArrowDown className="w-4 h-4 lg:hidden" />
            </div>

            {/* PLAN C NODE */}
            <button
              type="button"
              onClick={() => {
                setActivePlanId('planC');
                setSimOutcome('in-progress');
              }}
              className={`lg:col-span-2 p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                activePlanId === 'planC'
                  ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-500/10'
                  : isDark ? 'bg-slate-900 border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-amber-600 dark:text-amber-400">PLAN C</span>
                  <span className="font-mono tabular-nums text-[10px] font-bold text-slate-400">Son Çare</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">2 Kişilik Yüz Maskesi</div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  VE-grip, Guedel/NP airway, tam NMB kontrolü.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800 space-y-1 text-[10px]">
                <div className="font-semibold text-emerald-600 dark:text-emerald-400">✓ Ventile: Hastayı Uyandır</div>
                <div className="font-semibold text-rose-600 dark:text-rose-400">✕ CICO İlanı → Plan D</div>
              </div>
            </button>

            <div className="flex items-center justify-center text-rose-500 py-0.5">
              <ArrowRight className="w-4 h-4 hidden lg:block" />
              <ArrowDown className="w-4 h-4 lg:hidden" />
            </div>

            {/* PLAN D NODE */}
            <button
              type="button"
              onClick={() => {
                setActivePlanId('planD');
                setSimOutcome('in-progress');
              }}
              className={`lg:col-span-2 p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                activePlanId === 'planD'
                  ? 'ring-2 ring-rose-500 border-rose-500 bg-rose-500/15'
                  : isDark ? 'bg-rose-950/25 border-rose-500/40 hover:border-rose-400' : 'bg-rose-50 border-rose-300 hover:border-rose-400'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-rose-600 dark:text-rose-400">PLAN D</span>
                  <span className="font-mono text-[10px] font-bold text-rose-600 dark:text-rose-300">CICO</span>
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">eFONA (Neşter-Buji-Tüp)</div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                  10 No neşter + buji + 6.0 mm kaflı ETT, boyun ekstansiyon.
                </p>
              </div>
              <div className="pt-2 border-t border-rose-500/25 space-y-1 text-[10px]">
                <div className="font-semibold text-rose-700 dark:text-rose-300">EtCO₂ doğrula · Uyandırma · YBÜ</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 6. Kaynaklar */}
      <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-200">
          <BookOpen className="w-4 h-4 text-cyan-500" />
          <span>Kaynaklar (Güncel Kılavuzlar &amp; Textbook)</span>
        </div>
        <p>1. Ahmad I, El-Boghdadly K, Iliff H, et al. <em>Difficult Airway Society 2025 guidelines for management of unanticipated difficult tracheal intubation in adults.</em> British Journal of Anaesthesia. 2026;136(1):283-307. PMID: 41203471.</p>
        <p>2. Apfelbaum JL, Hagberg CA, Connis RT, et al. <em>2022 American Society of Anesthesiologists Practice Guidelines for Management of the Difficult Airway.</em> Anesthesiology. 2022;136(1):31-81. PMID: 34762729.</p>
        <p>3. Frerk C, Mitchell VS, McNarry AF, et al. <em>DAS 2015 guidelines for management of unanticipated difficult intubation in adults.</em> BJA. 2015;115(6):827-848. PMID: 26556848.</p>
        <p>4. De Jong A, Molinari N, Terzi N, et al. <em>Early identification of patients at risk for difficult intubation in the intensive care unit: development and validation of the MACOCHA score.</em> Am J Respir Crit Care Med. 2013;187(8):832-839.</p>
      </div>
    </div>
  );
};

export default DifficultAirwayDASInfographic;
