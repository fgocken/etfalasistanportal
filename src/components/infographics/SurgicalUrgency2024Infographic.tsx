import React, { useState } from 'react';
import { 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  HeartPulse, 
  ExternalLink, 
  BookOpen, 
  Activity, 
  Stethoscope, 
  Info,
  ChevronDown,
  ChevronUp,
  Table
} from 'lucide-react';

interface SurgicalUrgency2024InfographicProps {
  isDark: boolean;
}

interface UrgencyTier {
  id: 'emergency' | 'urgent' | 'time-sensitive' | 'elective';
  title: string;
  badgeLabel: string;
  timeWindow: string;
  threatLevel: string;
  colorScheme: {
    accent: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    cardBg: string;
    dotBg: string;
    ring: string;
    gradient: string;
  };
  maceOpportunity: string;
  preopEvaluation: string;
  clinicalActions: string[];
  examples: string[];
}

const URGENCY_TIERS: UrgencyTier[] = [
  {
    id: 'emergency',
    title: 'Acil Cerrahi',
    badgeLabel: 'Acil',
    timeWindow: '< 2 Saat',
    threatLevel: 'Cerrahi müdahale yapılmadığı takdirde yaşam veya uzuv kaybı tehdidi anidir.',
    colorScheme: {
      accent: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-500/15',
      badgeText: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-500/30',
      cardBg: 'from-rose-950/25 via-slate-900 to-slate-900',
      dotBg: 'bg-rose-500',
      ring: 'ring-rose-500/20',
      gradient: 'from-rose-500 to-red-600'
    },
    maceOpportunity: 'Yok veya son derece kısıtlı — cerrahi geciktirilemez',
    preopEvaluation: 'Preoperatif klinik değerlendirme için süre yok denecek kadar azdır (tipik olarak < 2 saat). Cerrahi gecikmeksizin başlatılmalıdır.',
    clinicalActions: [
      'Kardiyoloji konsültasyonu veya ileri kardiyak tetkik (EKO, BT, koroner anjiyo) için cerrahi KESİNLİKLE geciktirilmez.',
      'Hedeflenen temel hazırlık: Hızlı havayolu ve solunum güvenliği, masif transfüzyon/kan hazırlığı ve geniş lümenli vasküler erişim.',
      'Doğrudan ameliyathaneye acil transfer; intraoperatif hemodinamik izlem ve hedefe yönelik resüsitasyon ön plandadır.'
    ],
    examples: [
      'Rüptüre abdominal veya torasik aort anevrizması',
      'Masif intrakraniyal kanama ve herniasyon tehdidi',
      'Hemorajik şok ile seyreden majör künt / penetran travma',
      'Akut ekstremite iskemisi ve kompartman sendromu',
      'Tansiyon pnömotoraks veya kardiyak tamponad cerrahisi'
    ]
  },
  {
    id: 'urgent',
    title: 'İvedi Cerrahi',
    badgeLabel: 'İvedi',
    timeWindow: '2 ila 24 Saat',
    threatLevel: 'Cerrahi yapılmadığı takdirde yaşam veya uzuv tehdidi mevcuttur.',
    colorScheme: {
      accent: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-500/15',
      badgeText: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      cardBg: 'from-amber-950/25 via-slate-900 to-slate-900',
      dotBg: 'bg-amber-500',
      ring: 'ring-amber-500/20',
      gradient: 'from-amber-500 to-orange-600'
    },
    maceOpportunity: 'MACE ve perioperatif komplikasyon riskini azaltmak için kısıtlı ancak değerli bir müdahale penceresi mevcuttur',
    preopEvaluation: 'Kardiyovasküler riski ve diğer ameliyat sonrası komplikasyonları azaltacak klinik müdahalelere izin verecek süre mevcuttur (tipik olarak 2 ila < 24 saat).',
    clinicalActions: [
      'Hızlı odaklanmış kardiyak inceleme (POCUS / kardiyak ve akciğer ultrasonu, 12-derivasyon EKG, elektrolitler, kan gazı).',
      'Hızlı volüm ve asit-baz optimizasyonu, kritik elektrolit (potasyum, magnezyum, kalsiyum) bozukluklarının hızla düzeltilmesi.',
      'Kardiyak ilaçların hızlı düzenlenmesi (beta-bloker kesilmemeli, hemodinamiye göre vazopresör ve inotrop hazırlığı).',
      'Antikoagülan ve antitrombositer ajanların acil geri çevrilmesi (antidot/reversal) için protokol başlatılması.'
    ],
    examples: [
      'Akut peritonit, barsak perforasyonu veya strangüle herni',
      'Akut apandisit ve akut taşlı kolesistit',
      'Açık veya instabil kırıklar, acil ortopedik fiksasyon',
      'Biliyer veya ürolojik sepsis drenajı (kolanjit, pyonefroz)',
      'Diyabetik enfekte ayak ülseri ve derin apse drenajı'
    ]
  },
  {
    id: 'time-sensitive',
    title: 'Zamana Duyarlı Cerrahi',
    badgeLabel: 'Zamana Duyarlı',
    timeWindow: '1 ila 3 Aya Kadar (≤ 3 Ay)',
    threatLevel: 'Hemen ölüm tehlikesi yoktur ancak 1-3 aydan fazla gecikme prognozu ve sağkalımı bozar.',
    colorScheme: {
      accent: 'text-sky-600 dark:text-sky-400',
      badgeBg: 'bg-sky-500/15',
      badgeText: 'text-sky-700 dark:text-sky-300',
      border: 'border-sky-500/30',
      cardBg: 'from-sky-950/25 via-slate-900 to-slate-900',
      dotBg: 'bg-sky-500',
      ring: 'ring-sky-500/20',
      gradient: 'from-sky-500 to-blue-600'
    },
    maceOpportunity: 'Tam kapsamlı kardiyovasküler değerlendirme, optimizasyon ve risk modellemesi için yeterli süre tanır',
    preopEvaluation: 'Sonuçları olumsuz etkilemeksizin preoperatif kardiyak tetkik, medikal optimizasyon ve multidisipliner tedavi planlaması için cerrahi 3 aya kadar ertelenebilir.',
    clinicalActions: [
      'RCRI (Lee İndeksi) veya NSQIP MACE risk hesaplaması yapılması.',
      'Fonksiyonel kapasite (<4 MET) ve semptomlara göre Transtorasik Ekokardiyografi (TTE) veya Farmakolojik Stres Testi planlaması.',
      'Yakın dönemde koroner stent geçmişi varsa ikili antiplatelet (DAPT) zamanlamasının cerrahi ekip ve kardiyoloji ile ortak yönetimi.',
      'Kalp yetersizliği, kontrolsüz hipertansiyon ve diyabetin perioperatif hedef değerlere getirilmesi.'
    ],
    examples: [
      'Akciğer rezeksiyonları ve torasik onkolojik cerrahiler (lobektomi vb.)',
      'Gastrointestinal kanser cerrahileri (kolon, rektum, mide, pankreas rezeksiyonları)',
      'Meme kanseri cerrahisi (mastektomi ve aksiller lenf diseksiyonu)',
      'Jinekolojik ve ürolojik malignite ameliyatları (radikal nefrektomi, sistektomi)',
      'Asemptomatik ancak ilerleyici vasküler lezyonlar'
    ]
  },
  {
    id: 'elective',
    title: 'Elektif Cerrahi',
    badgeLabel: 'Elektif',
    timeWindow: '> 3 Ay / Tamamen Planlı',
    threatLevel: 'Yaşam ya da uzuv tehdidi yoktur; cerrahi uygun bir zamana güvenle ertelenebilir.',
    colorScheme: {
      accent: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-500/15',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      cardBg: 'from-emerald-950/25 via-slate-900 to-slate-900',
      dotBg: 'bg-emerald-500',
      ring: 'ring-emerald-500/20',
      gradient: 'from-emerald-500 to-teal-600'
    },
    maceOpportunity: 'Maksimum preoperatif optimizasyon; kardiyak risk faktörleri kontrol altına alınmadan operasyona girilmez',
    preopEvaluation: 'Eksiksiz bir preoperatif klinik değerlendirme ve uygun medikal yönetim tamamlanana kadar cerrahi işlem güvenle ertelenebilir.',
    clinicalActions: [
      'Gereğinde koroner revaskülarizasyon (stent veya baypas) veya kapak girişimi tamamlandıktan sonra cerrahinin planlanması.',
      'Kronik kardiyovasküler medikal tedavinin (ACE inhibitörü/ARB, Statin, SGLT2 inhibitörü, Beta-bloker) kılavuzlara göre optimize edilmesi.',
      'Ameliyat öncesi fiziksel egzersiz (prehabilitasyon) ve sigara/alkol bırakma programları.',
      'Tüm sistemik yandaş hastalıkların en ideal fizyolojik seviyeye ulaştırılması.'
    ],
    examples: [
      'Total kalça ve diz protezi cerrahileri (artroplasti)',
      'Asemptomatik kasık veya karın duvarı fıtığı onarımı',
      'Katarakt ve diğer oftalmolojik ameliyatlar',
      'Kozmetik, plastik ve rekonstrüktif cerrahi girişimler',
      'İyi huylu jinekolojik ve ürolojik cerrahiler (TUR-P, pelvik taban onarımı)'
    ]
  }
];

export const SurgicalUrgency2024Infographic: React.FC<SurgicalUrgency2024InfographicProps> = ({ isDark }) => {
  const [selectedTierId, setSelectedTierId] = useState<'emergency' | 'urgent' | 'time-sensitive' | 'elective'>('urgent');
  // Karşılaştırma tablosu varsayılan olarak kapalıdır; merak eden tıklayarak genişletir
  const [isTableExpanded, setIsTableExpanded] = useState<boolean>(false);

  const activeTier = URGENCY_TIERS.find(t => t.id === selectedTierId) || URGENCY_TIERS[0];

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Kılavuz Künyesi */}
      <div className={`p-5 sm:p-6 rounded-2xl border space-y-3 transition-colors ${
        isDark 
          ? 'bg-gradient-to-r from-slate-900 via-slate-800/80 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-r from-teal-50/60 via-white to-sky-50/50 border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
            2024 AHA / ACC KILAVUZU
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
            Non-Kardiyak Cerrahi Perioperatif Kardiyovasküler Yönetim
          </span>
        </div>

        <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Cerrahi Aciliyet ve Zamanlama Sınıflaması
        </h3>

        <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          American College of Cardiology (ACC) ve American Heart Association (AHA) ortak kılavuzuna göre cerrahi operasyonların 
          zaman penceresine, yaşam/uzuv tehdidine ve <strong>MACE (Majör İstenmeyen Kardiyovasküler Olay)</strong> riskini azaltmaya 
          yönelik preoperatif değerlendirme olanağına göre 4 kademeli resmi sınıflaması.
        </p>

        <div className="pt-1 flex items-center">
          <a
            href="https://www.ahajournals.org/doi/10.1161/CIR.0000000000001285"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 text-teal-400 border-slate-700 hover:border-slate-600 shadow-xs' 
                : 'bg-white hover:bg-teal-50 text-teal-800 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-500 shrink-0" />
            <span>Kaynak: Kılavuz Tam Metni (Circulation 2024)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. Interactive Time-Horizon Visual Ribbon (0h -> <2h -> 24h -> 3mo -> Elective) */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Klinik Zaman Ufku ve Müdahale Penceresi
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Ayrıntıları görüntülemek için aşağıdaki kademelere tıklayın
          </span>
        </div>

        {/* 4-Step Interactive Navigation Pill Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {URGENCY_TIERS.map((tier) => {
            const isSelected = tier.id === selectedTierId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTierId(tier.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? isDark 
                      ? 'bg-slate-800 border-teal-500 ring-2 ring-teal-500/30 shadow-md' 
                      : 'bg-teal-50/80 border-teal-500 ring-2 ring-teal-500/20 shadow-md'
                    : isDark 
                      ? 'bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70' 
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className={`text-[10px] font-mono uppercase font-bold px-1.5 py-0.5 rounded ${tier.colorScheme.badgeBg} ${tier.colorScheme.badgeText}`}>
                      {tier.badgeLabel}
                    </span>
                    <span className="text-[11px] font-bold font-mono text-slate-800 dark:text-slate-200">
                      {tier.timeWindow}
                    </span>
                  </div>
                  <div className={`text-xs font-bold ${isSelected ? 'text-teal-700 dark:text-teal-300' : isDark ? 'text-white' : 'text-slate-900'}`}>
                    {tier.title}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                  <span className="truncate pr-1">
                    {tier.id === 'emergency' ? 'Gecikme Yok' : tier.id === 'urgent' ? 'MACE Azaltımı' : tier.id === 'time-sensitive' ? 'Onkolojik Pencere' : 'Tam Optimizasyon'}
                  </span>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${tier.colorScheme.dotBg}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Selected Tier Deep Dive Card */}
      <div className={`rounded-2xl border p-5 sm:p-6 transition-all ${
        isDark 
          ? `bg-gradient-to-b ${activeTier.colorScheme.cardBg} ${activeTier.colorScheme.border}` 
          : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-3.5 h-3.5 rounded-full ${activeTier.colorScheme.dotBg} ring-4 ${activeTier.colorScheme.ring}`} />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base sm:text-lg font-extrabold tracking-tight">
                  {activeTier.title}
                </h4>
                <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${activeTier.colorScheme.badgeBg} ${activeTier.colorScheme.badgeText}`}>
                  Zamanlama: {activeTier.timeWindow}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {activeTier.threatLevel}
              </p>
            </div>
          </div>

          <div className={`px-3 py-1.5 rounded-xl text-xs font-medium border shrink-0 ${
            isDark ? 'bg-slate-800/80 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <span className="text-slate-400 mr-1.5">MACE Azaltma Fırsatı:</span>
            <span className="font-bold">{activeTier.maceOpportunity}</span>
          </div>
        </div>

        {/* 2-Column Split: Clinical Approach vs Representative Surgical Procedures */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left Column: Perioperative Strategy & Actions */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-teal-500" />
              <span>Preoperatif Kardiyovasküler Strateji &amp; Klinik Yaklaşım</span>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              isDark ? 'bg-slate-800/60 border-slate-700 text-slate-200' : 'bg-teal-50/50 border-teal-200 text-slate-800'
            }`}>
              <div className="font-semibold text-teal-700 dark:text-teal-300 mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Kılavuz Tanımı (AHA/ACC 2024):</span>
              </div>
              <p className="italic">
                "{activeTier.preopEvaluation}"
              </p>
            </div>

            <div className="space-y-2">
              {activeTier.clinicalActions.map((action, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                    isDark ? 'bg-slate-900/60 border-slate-800/80 text-slate-300' : 'bg-slate-50/80 border-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Typical Surgical Examples */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-teal-500" />
              <span>Kapsamdaki Tipik Cerrahi Örnekleri</span>
            </div>

            <div className="space-y-2 text-xs">
              {activeTier.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isDark 
                      ? 'bg-slate-800/40 border-slate-700/60 text-slate-200 hover:border-slate-600' 
                      : 'bg-white border-slate-200 text-slate-800 hover:border-teal-300 shadow-2xs'
                  }`}
                >
                  <div className="font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    <span>{ex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 4. Complete Comparison Matrix Table - Collapsible / Accordion */}
      <div className={`rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <button
          type="button"
          onClick={() => setIsTableExpanded(!isTableExpanded)}
          className={`w-full p-4 flex items-center justify-between text-left transition-colors cursor-pointer rounded-2xl ${
            isTableExpanded 
              ? isDark ? 'border-b border-slate-800 bg-slate-800/50' : 'border-b border-slate-200 bg-slate-50'
              : isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
          }`}
          aria-expanded={isTableExpanded}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-600'}`}>
              <Table className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  4 Kademenin Karşılaştırmalı Özet Tablosu
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  {isTableExpanded ? 'Genişletildi' : 'Tıklayınca Açılır'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Kılavuzdaki zaman penceresi, tehdit seviyesi ve klinik karar kurallarını yan yana inceleyin.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 hidden sm:inline">
              {isTableExpanded ? 'Tabloyu Gizle' : 'Tabloyu Genişlet'}
            </span>
            <div className={`p-1.5 rounded-lg border transition-transform ${
              isDark ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
            }`}>
              {isTableExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </div>
          </div>
        </button>

        {/* Collapsible Content Area */}
        {isTableExpanded && (
          <div className="p-0 overflow-x-auto transition-all animate-fadeIn">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                  isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  <th className="py-2.5 px-3.5 w-36">Kategori</th>
                  <th className="py-2.5 px-3 w-28">Tipik Süre</th>
                  <th className="py-2.5 px-4 w-60">Yaşam / Uzuv Tehdidi</th>
                  <th className="py-2.5 px-4">Preoperatif Değerlendirme &amp; MACE Azaltma Fırsatı</th>
                  <th className="py-2.5 px-4">Klinik Karar Kuralı</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                {URGENCY_TIERS.map((tier) => (
                  <tr 
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`transition-colors cursor-pointer ${
                      tier.id === selectedTierId 
                        ? isDark ? 'bg-teal-950/20 font-semibold' : 'bg-teal-50/60 font-semibold'
                        : isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="py-3 px-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${tier.colorScheme.dotBg}`} />
                        <div className="font-bold text-slate-900 dark:text-white">{tier.title}</div>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono font-bold whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] ${tier.colorScheme.badgeBg} ${tier.colorScheme.badgeText}`}>
                        {tier.timeWindow}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      {tier.threatLevel}
                    </td>

                    <td className="py-3 px-4 text-slate-700 dark:text-slate-200 text-[11px] leading-relaxed">
                      {tier.preopEvaluation}
                    </td>

                    <td className="py-3 px-4 text-[11px]">
                      {tier.id === 'emergency' && (
                        <span className="font-bold text-rose-600 dark:text-rose-400">
                          🚨 Tetkik için ertelenemez
                        </span>
                      )}
                      {tier.id === 'urgent' && (
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          ⚠️ Odaklanmış hızlı stabilizasyon
                        </span>
                      )}
                      {tier.id === 'time-sensitive' && (
                        <span className="font-bold text-sky-600 dark:text-sky-400">
                          📅 Kapsamlı tetkik (≤ 3 ay)
                        </span>
                      )}
                      {tier.id === 'elective' && (
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          ✓ Tam kardiyak optimizasyon
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Key Clinical Takeaways & Recommendation Box */}
      <div className={`p-4 sm:p-5 rounded-2xl border text-xs leading-relaxed space-y-2 ${
        isDark ? 'bg-slate-800/30 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs">
          <ShieldAlert className="w-4 h-4 text-teal-500" />
          <span>2024 AHA/ACC Kılavuzu Temel Perioperatif Kardiyovasküler Çıkarımları:</span>
        </div>
        <ul className="list-disc pl-5 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
          <li>
            <strong>Acil cerrahilerde</strong> ileri kardiyak tetkik (örneğin preoperatif stres testi veya invaziv koroner anjiyografi) için cerrahi kesinlikle geciktirilmemelidir; hemodinamik izlem ameliyathanede sağlanır.
          </li>
          <li>
            <strong>İvedi cerrahilerde</strong> amaç ameliyatı geciktirmek değil; mevcut 2–24 saatlik pencerede hastanın sıvı, elektrolit, kanama kontrolü ve kritik kardiyak ilaçlarını optimize ederek <em>MACE (Kardiyovasküler Ölüm, Miyokard Enfarktüsü, İnme)</em> riskini en aza indirmektir.
          </li>
          <li>
            <strong>Zamana duyarlı onkolojik cerrahilerde</strong> kardiyak tetkik ve stent/antiplatelet yönetimi, onkolojik rezeksiyonun azami 1–3 aylık güvenli penceresi aşılmayacak şekilde koordine edilmelidir.
          </li>
          <li>
            <strong>Elektif cerrahilerde</strong> hasta kardiyak ve sistemik açıdan tam olarak optimize edilmeden elektif operasyona alınmamalıdır.
          </li>
        </ul>
      </div>

      {/* 6. Footer Citation */}
      <div className={`p-3.5 rounded-xl border text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
        isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-2xs'
      }`}>
        <div className="flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-teal-500 shrink-0" />
          <span>
            <strong>Resmi Kaynak:</strong> <em>2024 AHA/ACC/ACS/ASNC/HRS/SCA/SCCT/SCMR/SVM Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery.</em> Circulation. 2024;150:e354–e443.
          </span>
        </div>
        <a
          href="https://www.ahajournals.org/doi/10.1161/CIR.0000000000001285"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline shrink-0 inline-flex items-center gap-1"
        >
          <span>DOI: 10.1161/CIR.0000000000001285</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
