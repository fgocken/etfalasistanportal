import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldAlert, 
  Baby, 
  User, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  AlertTriangle, 
  Info, 
  BookOpen, 
  Layers,
  Sparkles,
  ExternalLink,
  Flame,
  HelpCircle
} from 'lucide-react';

export type AsaCategory = 'adult' | 'pediatric' | 'obstetric';

export interface AsaItem {
  id: string;
  name: string;
  shortLabel: string;
  badgeColor: {
    bg: string;
    border: string;
    text: string;
    badgeBgDark: string;
    badgeBgLight: string;
    lightBorder: string;
    accent: string;
  };
  definitionTr: string;
  definitionSub?: string;
  adultExamples: string[];
  pediatricExamples: string[];
  obstetricExamples: string[];
  clinicalNotes?: string;
}

export const ASA_DATA: AsaItem[] = [
  {
    id: 'asa-1',
    name: 'ASA I',
    shortLabel: 'Normal Sağlıklı Hasta',
    badgeColor: {
      bg: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      badgeBgDark: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50',
      badgeBgLight: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      lightBorder: 'border-emerald-200',
      accent: '#10b981'
    },
    definitionTr: 'Normal, sağlıklı hasta.',
    definitionSub: 'Herhangi bir fizyolojik, biyokimyasal veya psikiyatrik bozukluğu bulunmayan; cerrahi patolojisi lokalize olan hasta.',
    adultExamples: [
      'Sağlıklı, sigara kullanmayan birey',
      'Hiç alkol kullanmayan veya asgari/minimal düzeyde kullanan'
    ],
    pediatricExamples: [
      'Sağlıklı (akut veya kronik hastalığı yok)',
      'Yaşa göre normal VKİ persentili'
    ],
    obstetricExamples: [
      'Normal gebelik dahi fizyolojik değişiklikler nedeniyle doğrudan ASA II olarak sınıflandırılır (Dökümanda ASA I altında obstetrik örnek yer almamaktadır).'
    ],
    clinicalNotes: 'Gebelik fizyolojisi (plazma volümü ve kardiyak debi artışı, FRC düşüşü) nedeniyle gebe hastalar konsensüs gereği ASA I olarak sınıflandırılmaz.'
  },
  {
    id: 'asa-2',
    name: 'ASA II',
    shortLabel: 'Hafif Sistemik Hastalık',
    badgeColor: {
      bg: 'from-teal-500/20 to-cyan-500/10',
      border: 'border-teal-500/30',
      text: 'text-teal-400',
      badgeBgDark: 'bg-teal-950/60 text-teal-300 border-teal-700/50',
      badgeBgLight: 'bg-teal-50 text-teal-800 border-teal-200',
      lightBorder: 'border-teal-200',
      accent: '#14b8a6'
    },
    definitionTr: 'Hafif sistemik hastalığı olan hasta.',
    definitionSub: 'Yalnızca belirgin fonksiyonel kısıtlılık veya uç organ tutulumu bulunmayan hafif sistemik hastalıklar.',
    adultExamples: [
      'Belirgin fonksiyonel kısıtlılık veya uç organ tutulumu olmaksızın yalnızca hafif hastalıklar',
      'Halen sigara içen (Current smoker)',
      'Sosyal alkol tüketicisi (Social alcohol drinker)',
      'Gebelik (komplikasyonsuz)*',
      'Obezite (30 < VKİ < 40 kg/m²)',
      'İyi kontrollü DM veya HTN',
      'Hafif akciğer hastalığı',
      'KKY NYHA Evre 1 (CHF NYHA Class 1)',
      'Hafif bilişsel disfonksiyon (Mild cognitive dysfunction)',
      'Reçete edildiği şekilde CPAP uyumu olan izole hafif/orta dereceli obstrüktif uyku apnesi (OUA)'
    ],
    pediatricExamples: [
      'Asemptomatik siyanotik olmayan konjenital kardiyak hastalık',
      'İyi kontrollü disritmiler',
      'Alevlenmesi olmayan astım',
      'İyi kontrollü epilepsi',
      'İnsüline bağımlı olmayan diyabet (NIDDM)',
      'Yaşa göre anormal VKİ persentili',
      'Hafif / orta dereceli OUA (Obstrüktif Uyku Apnesi)',
      'Remisyonda onkolojik durum',
      'Hafif kısıtlılığı olan otizm',
      'Malign hipertermi riski (aile öyküsü veya hastada öykü)'
    ],
    obstetricExamples: [
      'Normal gebelik*',
      'İyi kontrollü gestasyonel hipertansiyon (HTN)',
      'Diyetle kontrollü gestasyonel diyabet (DM)'
    ],
    clinicalNotes: 'ASA II hastalarında günlük yaşam aktivitelerinde belirgin fonksiyonel kısıtlılık yoktur. Reçete edilen CPAP cihazını düzenli kullanan hafif-orta OUA bu sınıftadır.'
  },
  {
    id: 'asa-3',
    name: 'ASA III',
    shortLabel: 'Şiddetli Sistemik Hastalık',
    badgeColor: {
      bg: 'from-amber-500/20 to-orange-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      badgeBgDark: 'bg-amber-950/60 text-amber-300 border-amber-700/50',
      badgeBgLight: 'bg-amber-50 text-amber-800 border-amber-200',
      lightBorder: 'border-amber-200',
      accent: '#f59e0b'
    },
    definitionTr: 'Şiddetli sistemik hastalığı olan hasta.',
    definitionSub: 'Belirgin fonksiyonel kısıtlılıklar; bir veya birden fazla orta ila şiddetli sistemik hastalık tablosu.',
    adultExamples: [
      'KOAH (COPD)',
      'Morbid obezite (VKİ ≥ 40 kg/m²)',
      'Aktif hepatit',
      'Kompanse siroz',
      'Alkol bağımlılığı veya kötüye kullanımı',
      'Fonksiyonel implante pacemaker (kalıcı kalp pili)',
      'Ejeksiyon fraksiyonunda (EF) orta derecede azalma veya KKY NYHA Evre 2 ya da 3',
      'Düzenli diyaliz programında olan Son Dönem Böbrek Yetmezliği (SDBY / ESRD)',
      '>3 ay önce geçirilmiş MI, SVO (CVA), GİA (TIA), PE veya KAH (CAD)/stent öyküsü',
      'Belirgin bilişsel disfonksiyon (Significant cognitive dysfunction)',
      'CPAP uyumundan bağımsız izole şiddetli OUA veya CPAP uyumsuzluğu olan herhangi bir derecede obstrüktif uyku apnesi',
      'Uç organ disfonksiyonu olsun ya da olmasın kötü kontrollü DM veya HTN'
    ],
    pediatricExamples: [
      'Düzeltilmemiş stabil konjenital kardiyak anomali',
      'Alevlenmeli astım (Asthma with exacerbation)',
      'Kötü kontrollü epilepsi',
      'İnsüline bağımlı diabetes mellitus',
      'Morbid obezite',
      'Malnütrisyon',
      'Şiddetli OUA (Severe OSA)',
      'Onkolojik durum (Oncologic state)',
      'Böbrek yetmezliği (Renal failure)',
      'Müsküler distrofi',
      'Kistik fibrozis',
      'Organ transplantasyonu öyküsü',
      'Beyin veya omurilik malformasyonu',
      'Semptomatik hidrosefali',
      'Prematüre infant PKA < 60 hafta (Post-conceptual age <60 weeks)',
      'Şiddetli kısıtlılığı olan otizm',
      'Metabolik hastalık',
      'Zor havayolu (Difficult airway)',
      'Uzun süreli parenteral beslenme',
      'Term infantlar, < 6 haftalık (Full term infants <6 weeks of age)'
    ],
    obstetricExamples: [
      'Ağır bulguları olan veya olmayan preeklampsi',
      'Kötü kontrollü veya komplikasyonlu ya da yüksek insülin gereksinimi olan gestasyonel diyabet',
      'Antikoagülasyon gerektiren trombofilik hastalık'
    ],
    clinicalNotes: 'Kritik ayrım: MI/SVO/stent üzerinden 3 aydan fazla zaman geçmişse ASA III; son 3 ay içinde ise ASA IV kabul edilir. CPAP uyumsuz OUA hastası doğrudan ASA III sayılır.'
  },
  {
    id: 'asa-4',
    name: 'ASA IV',
    shortLabel: 'Yaşamı Tehdit Eden Şiddetli Hastalık',
    badgeColor: {
      bg: 'from-orange-500/20 to-red-500/10',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      badgeBgDark: 'bg-orange-950/60 text-orange-300 border-orange-700/50',
      badgeBgLight: 'bg-orange-50 text-orange-800 border-orange-200',
      lightBorder: 'border-orange-200',
      accent: '#f97316'
    },
    definitionTr: 'Yaşamı sürekli tehdit eden şiddetli sistemik hastalığı olan hasta.',
    definitionSub: 'Cerrahi girişimden bağımsız olarak hastanın hayatını anlık veya sürekli tehlikeye sokan kritik sistemik disfonksiyon.',
    adultExamples: [
      'Yakın zamanda (< 3 ay içinde) geçirilmiş SVO (CVA), GİA (TIA) veya KAH (CAD)/stent',
      'Devam eden kardiyak iskemi veya şiddetli kapak disfonksiyonu',
      'Ejeksiyon fraksiyonunda (EF) belirgin/şiddetli azalma veya KKY NYHA Evre 4',
      'Şok',
      'Sepsis',
      'DİK (Dissemine İntravasküler Koagülasyon / DIC)',
      'ARDS (Akut Respiratuar Distres Sendromu)',
      'Düzenli diyaliz programında olmayan Son Dönem Böbrek Yetmezliği (SDBY / ESRD)',
      'Dekompanse siroz',
      'Ağır bilişsel disfonksiyon (Severe cognitive dysfunction)'
    ],
    pediatricExamples: [
      'Semptomatik konjenital kardiyak anomali',
      'Konjestif kalp yetmezliği',
      'Prematüritenin aktif sekelleri',
      'Akut hipoksik-iskemik ensefalopati',
      'Şok',
      'Sepsis',
      'Dissemine intravasküler koagülasyon (DİK / DIC)',
      'Otomatik implante edilebilir kardiyoverter-defibrilatör (AICD)',
      'Ventilatör bağımlılığı',
      'Endokrinopati',
      'Ağır travma',
      'Ağır solunum sıkıntısı (Severe respiratory distress)',
      'İleri evre onkolojik durum'
    ],
    obstetricExamples: [
      'HELLP sendromu veya diğer majör advers olayla komplike ağır preeklampsi',
      'Peripartum kardiyomiyopati',
      'Düzeltilmemiş veya dekompanse kalp hastalığı'
    ],
    clinicalNotes: 'ASA IV hastaları cerrahi olmasa dahi ölüm riski yüksek olan hastalardır. Yakın zamanda (< 3 ay) koroner stent takılmış veya inme geçirmiş hastalar stabil olsalar dahi ASA IV sayılır.'
  },
  {
    id: 'asa-5',
    name: 'ASA V',
    shortLabel: 'Ameliyatsız Yaşaması Beklenmeyen (Moribund)',
    badgeColor: {
      bg: 'from-rose-500/20 to-red-600/10',
      border: 'border-rose-500/30',
      text: 'text-rose-400',
      badgeBgDark: 'bg-rose-950/60 text-rose-300 border-rose-700/50',
      badgeBgLight: 'bg-rose-50 text-rose-800 border-rose-200',
      lightBorder: 'border-rose-200',
      accent: '#f43f5e'
    },
    definitionTr: 'Ameliyat olmaksızın hayatta kalması beklenmeyen moribund hasta.',
    definitionSub: 'Cerrahi operasyon yapılmadığı takdirde 24 saat içinde eksitus olması kesin veya çok yüksek olasılıkta olan can çekişen hasta.',
    adultExamples: [
      'Rüptüre abdominal veya torasik anevrizma',
      'Masif travma',
      'Kitle etkisi olan intrakraniyal kanama',
      'Belirgin kardiyak patoloji veya çoklu organ/sistem disfonksiyonu eşliğinde iskemik barsak'
    ],
    pediatricExamples: [
      'Masif travma',
      'Kitle etkisi olan intrakraniyal kanama',
      'ECMO (Ekstrakorporeal Membran Oksijenizasyonu) gerektiren hasta',
      'Solunum yetmezliği veya solunum durması (arrest)',
      'Hipertansif kriz ile giden malign hipertansiyon',
      'Dekompanse konjestif kalp yetmezliği',
      'Hepatik ensefalopati',
      'İskemik barsak veya çoklu organ / sistem disfonksiyonu'
    ],
    obstetricExamples: [
      'Uterus rüptürü',
      'Amniyotik sıvı embolisi'
    ],
    clinicalNotes: 'ASA V olgularının neredeyse tamamı aynı zamanda acil cerrahi gerektirdiğinden genelde "ASA V-E" olarak sınıflanır.'
  },
  {
    id: 'asa-6',
    name: 'ASA VI',
    shortLabel: 'Beyin Ölümü Gerçekleşmiş Donör',
    badgeColor: {
      bg: 'from-purple-500/20 to-slate-500/10',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      badgeBgDark: 'bg-purple-950/60 text-purple-300 border-purple-700/50',
      badgeBgLight: 'bg-purple-50 text-purple-800 border-purple-200',
      lightBorder: 'border-purple-200',
      accent: '#a855f7'
    },
    definitionTr: 'Organları donör amaçlı çıkarılacak beyin ölümü bildirilmiş hasta.',
    definitionSub: 'Yasal beyin ölümü kriterleri tamamlanmış, organ nakli amacıyla operasyona alınan organ vericisi.',
    adultExamples: [
      'Organ bağışı / donör amacıyla organları çıkarılmakta olan beyin ölümü bildirilmiş hasta'
    ],
    pediatricExamples: [
      'Organ bağışı / donör amacıyla organları çıkarılmakta olan beyin ölümü bildirilmiş hasta'
    ],
    obstetricExamples: [
      'Organ bağışı / donör amacıyla operasyona alınan beyin ölümü bildirilmiş maternal donör hasta'
    ],
    clinicalNotes: 'ASA VI hastasında anestezi yönetiminin amacı hastayı uyutmak değil; nakledilecek organların (kalp, akciğer, karaciğer, böbrek) perfüzyonunu ve oksijenasyonunu maksimize etmektir.'
  }
];

export const ASA_ABBREVIATIONS = [
  { abbr: 'ARDS', name: 'Akut Respiratuar Distres Sendromu (Acute Respiratory Distress Syndrome)' },
  { abbr: 'ASA', name: 'Amerikan Anesteziyologlar Derneği (American Society of Anesthesiologists)' },
  { abbr: 'BMI / VKİ', name: 'Vücut Kitle İndeksi (Body Mass Index, kg/m²)' },
  { abbr: 'CAD / KAH', name: 'Koroner Arter Hastalığı (Coronary Artery Disease)' },
  { abbr: 'CHF NYHA', name: 'Konjestif Kalp Yetmezliği New York Heart Association Sınıflaması (Evre 1-4)' },
  { abbr: 'COPD / KOAH', name: 'Kronik Obstrüktif Akciğer Hastalığı' },
  { abbr: 'CPAP', name: 'Sürekli Pozitif Havayolu Basıncı (Continuous Positive Airway Pressure)' },
  { abbr: 'CVA / SVO', name: 'Serebrovasküler Olay / İnme (Cerebrovascular Accident)' },
  { abbr: 'DIC / DİK', name: 'Dissemine İntravasküler Koagülasyon (Yaygın Damar İçi Pıhtılaşma)' },
  { abbr: 'DM', name: 'Diyabetes Mellitus (Şeker Hastalığı)' },
  { abbr: 'ECMO', name: 'Ekstrakorporeal Membran Oksijenizasyonu' },
  { abbr: 'ESRD / SDBY', name: 'Son Dönem Böbrek Yetmezliği (End-Stage Renal Disease)' },
  { abbr: 'HELLP', name: 'Hemoliz, Yüksek Karaciğer Enzimleri ve Düşük Trombosit Sendromu' },
  { abbr: 'HTN', name: 'Hipertansiyon (Yüksek Tansiyon)' },
  { abbr: 'MI', name: 'Miyokard Enfarktüsü (Kalp Krizi)' },
  { abbr: 'OSA / OUA', name: 'Obstrüktif Uyku Apnesi (Obstructive Sleep Apnea)' },
  { abbr: 'PCA', name: 'Post-konseptüel Yaş (Post-Conceptual Age - Prematüre haftası + Doğum sonrası hafta)' },
  { abbr: 'PE', name: 'Pulmoner Emboli (Akciğer Pıhtısı)' },
  { abbr: 'PS', name: 'Fiziksel Durum (Physical Status)' },
  { abbr: 'TIA / GİA', name: 'Geçici İskemik Atak (Transient Ischemic Attack)' }
];

interface AsaClassificationProps {
  isDark: boolean;
}

export const AsaClassification: React.FC<AsaClassificationProps> = ({ isDark }) => {
  // Category slider state: 0 = adult, 1 = pediatric, 2 = obstetric
  // Requirement: Default opens with adult, swiping left brings pediatric, then obstetric.
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'slider' | 'table'>('slider');
  const [showAbbreviations, setShowAbbreviations] = useState<boolean>(false);
  const [selectedAsaModal, setSelectedAsaModal] = useState<AsaItem | null>(null);

  // Touch & Swipe gesture handling
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef<boolean>(false);

  const categories: { id: AsaCategory; label: string; icon: React.ReactNode; subtitle: string }[] = [
    { 
      id: 'adult', 
      label: 'Erişkin Örnekleri', 
      icon: <User className="w-4 h-4" />,
      subtitle: 'Varsayılan Açılış Görünümü'
    },
    { 
      id: 'pediatric', 
      label: 'Pediatrik Örnekler', 
      icon: <Baby className="w-4 h-4" />,
      subtitle: 'Yenidoğan, Süt Çocuğu & Çocuk'
    },
    { 
      id: 'obstetric', 
      label: 'Obstetrik Örnekler', 
      icon: <Heart className="w-4 h-4" />,
      subtitle: 'Gebelik & Doğum Fizyolojisi'
    }
  ];

  const currentCategory = categories[activeCategoryIndex];

  const handleNextCategory = () => {
    setActiveCategoryIndex((prev) => (prev < categories.length - 1 ? prev + 1 : prev));
  };

  const handlePrevCategory = () => {
    setActiveCategoryIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current || !isSwiping.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only register horizontal swipes if horizontal motion dominates vertical scroll
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      if (deltaX < 0) {
        // Swiped Left -> advance to next category (Adult -> Pediatric -> Obstetric)
        handleNextCategory();
      } else {
        // Swiped Right -> go back
        handlePrevCategory();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  };

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight') {
        handleNextCategory();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCategory();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Full official ASA Data
  const filteredData = ASA_DATA;

  return (
    <div className="space-y-6 select-text">
      {/* Top Section Header */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800/80 border-slate-800 shadow-xl' 
          : 'bg-gradient-to-br from-white via-white to-slate-50 border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase ${
                isDark ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' : 'bg-teal-50 text-teal-800 border border-teal-200'
              }`}>
                <ShieldAlert className="w-3.5 h-3.5" />
                ASA House of Delegates 2025/2026 Kılavuzu
              </span>
              <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
              }`}>
                Anesthesiology Open (e0002)
              </span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ASA Fiziksel Durum Sınıflaması
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Amerikan Anesteziyologlar Derneği (ASA) resmi fiziksel durum sınıflama sistemi ve onaylanmış klinik örnekler tablosu.
            </p>
          </div>

          {/* Quick View Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => setViewMode(viewMode === 'slider' ? 'table' : 'slider')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                viewMode === 'table'
                  ? isDark 
                    ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 shadow-xs' 
                    : 'bg-teal-50 text-teal-800 border-teal-300 shadow-xs'
                  : isDark 
                    ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700' 
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
              title="Geniş karşılaştırma tablosu ile kart görünümü arasında geçiş yap"
            >
              <Layers className="w-4 h-4" />
              <span>{viewMode === 'slider' ? 'Geniş Tablo Görünümü' : 'Kart Görünümü'}</span>
            </button>
            <button
              onClick={() => setShowAbbreviations(!showAbbreviations)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                showAbbreviations
                  ? isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-amber-50 text-amber-800 border-amber-300'
                  : isDark ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Kısaltmalar</span>
            </button>
          </div>
        </div>

        {/* Emergency Modifier ("E" Eki) Callout */}
        <div className="mt-4 pt-3.5 border-t border-slate-200/80 dark:border-slate-800/80">
          <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs ${
            isDark ? 'bg-rose-950/40 border border-rose-800/40 text-rose-300' : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}>
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="font-bold">Acil Cerrahi Modifiyeri (&quot;E&quot; Eki):</span>
            <span className="leading-relaxed">Gecikmenin hayatı veya bir organı tehdit eden riski belirgin artıracağı acil vakalarda ASA sınıfına &quot;E&quot; eklenir (örn: ASA II-E, ASA IV-E).</span>
          </div>
        </div>
      </div>

      {/* Abbreviations Modal/Collapsible Panel */}
      {showAbbreviations && (
        <div className={`p-5 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-amber-500/30 text-slate-200' : 'bg-amber-50/70 border-amber-200 text-slate-800'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold">ASA Tablosu Tıbbi Kısaltmalar Kılavuzu</h3>
            </div>
            <button
              onClick={() => setShowAbbreviations(false)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Kapat
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
            {ASA_ABBREVIATIONS.map(item => (
              <div key={item.abbr} className={`p-2 rounded-lg border ${
                isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-white border-amber-200/60'
              }`}>
                <span className="font-mono font-bold text-teal-500">{item.abbr}:</span>{' '}
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Interactive Slider Mode */}
      {viewMode === 'slider' && (
        <div className="space-y-4">
          {/* Slider Category Header & Touch Controller */}
          <div className={`sticky top-16 z-20 p-3 sm:p-4 rounded-2xl border shadow-md backdrop-blur-md transition-all ${
            isDark 
              ? 'bg-slate-900/95 border-slate-800/90' 
              : 'bg-white/95 border-slate-200/90'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Left / Prev Button */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={handlePrevCategory}
                  disabled={activeCategoryIndex === 0}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    activeCategoryIndex === 0
                      ? 'opacity-35 cursor-not-allowed border-transparent text-slate-400'
                      : isDark
                        ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-xs'
                  }`}
                  aria-label="Önceki Kategori"
                  title="Önceki Kategori"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* 3 Main Segmented Category Tabs */}
                <div className="flex items-center gap-1 sm:gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                  {categories.map((cat, idx) => {
                    const isActive = activeCategoryIndex === idx;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategoryIndex(idx)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? isDark
                              ? 'bg-teal-500 text-slate-950 shadow-sm'
                              : 'bg-teal-600 text-white shadow-sm'
                            : isDark
                              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                        }`}
                      >
                        {cat.icon}
                        <span>{cat.label}</span>
                        {idx === 0 && (
                          <span className={`text-[10px] px-1 py-0.2 rounded font-normal hidden lg:inline ${
                            isActive ? 'bg-black/20 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                          }`}>
                            Açılış
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right / Next Button */}
                <button
                  onClick={handleNextCategory}
                  disabled={activeCategoryIndex === categories.length - 1}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    activeCategoryIndex === categories.length - 1
                      ? 'opacity-35 cursor-not-allowed border-transparent text-slate-400'
                      : isDark
                        ? 'bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border-teal-500/40 shadow-xs ring-1 ring-teal-500/20'
                        : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-300 shadow-xs'
                  }`}
                  aria-label="Sonraki Kategori"
                  title="Sonraki Kategori"
                >
                  <ChevronRight className="w-4 h-4 text-teal-500" />
                </button>
              </div>

              {/* Indicator (Paging Dots) - Text removed as requested */}
              <div className="flex items-center gap-1.5" title="Kategori Sayfaları">
                {categories.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCategoryIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeCategoryIndex === idx 
                        ? 'w-6 bg-teal-500' 
                        : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                    }`}
                    aria-label={`Sayfa ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Active Category Banner */}
          <div className={`px-4 py-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-500/10 text-teal-500">
                {currentCategory.icon}
              </span>
              <span className="font-bold text-teal-500">{currentCategory.label}</span>
              <span className="hidden sm:inline text-slate-400">· {currentCategory.subtitle}</span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              Grup {activeCategoryIndex + 1} / 3
            </div>
          </div>

          {/* Touch-enabled Cards Container */}
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="space-y-4"
          >
            {filteredData.map((item) => {
              // Current examples based on category
              let examplesList: string[] = [];
              let isObstetricNote = false;

              if (activeCategoryIndex === 0) {
                examplesList = item.adultExamples;
              } else if (activeCategoryIndex === 1) {
                examplesList = item.pediatricExamples;
              } else {
                examplesList = item.obstetricExamples;
                if (item.id === 'asa-1') isObstetricNote = true;
              }

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDark 
                      ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-lg' 
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  {/* Card Top Banner: ASA Class Name & Constant Definition */}
                  <div className={`p-4 sm:p-5 border-b transition-colors ${
                    isDark 
                      ? 'bg-gradient-to-r from-slate-900 to-slate-900/70 border-slate-800/80' 
                      : 'bg-gradient-to-r from-slate-50 to-white border-slate-100'
                  }`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* ASA Badge */}
                        <div className={`px-3 py-1.5 rounded-xl border font-black text-sm sm:text-base tracking-wide flex items-center gap-1.5 ${
                          isDark ? item.badgeColor.badgeBgDark : item.badgeColor.badgeBgLight
                        }`}>
                          <span>{item.name}</span>
                        </div>
                        <div>
                          <div className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {item.shortLabel}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Definition Block */}
                    <div className={`mt-3.5 p-3.5 rounded-xl border ${
                      isDark 
                        ? 'bg-slate-950/70 border-slate-800 text-slate-100' 
                        : 'bg-slate-100/80 border-slate-200 text-slate-900'
                    }`}>
                      <div className="flex items-start gap-2.5">
                        <Info className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                            Tanım
                          </div>
                          <div className="text-sm font-semibold mt-0.5 leading-snug">
                            &quot;{item.definitionTr}&quot;
                          </div>
                          {item.definitionSub && (
                            <div className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                              {item.definitionSub}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Dynamic Body: The Examples (Slides on Category Switch) */}
                  <div className="p-4 sm:p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                          activeCategoryIndex === 0 
                            ? 'text-teal-500' 
                            : activeCategoryIndex === 1 
                              ? 'text-cyan-500' 
                              : 'text-pink-500'
                        }`}>
                          {currentCategory.icon}
                          {currentCategory.label}
                        </span>
                      </div>

                      {/* Quick category switch button (icon only) */}
                      <button
                        onClick={handleNextCategory}
                        disabled={activeCategoryIndex === categories.length - 1}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          activeCategoryIndex === categories.length - 1
                            ? 'opacity-25 cursor-not-allowed border-transparent text-slate-400'
                            : isDark
                              ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-teal-400 hover:text-teal-300'
                              : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-teal-600 hover:text-teal-700'
                        }`}
                        title="Sonraki Kategori"
                        aria-label="Sonraki Kategori"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Obstetric ASA I Special Clarification Box */}
                    {isObstetricNote && (
                      <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                        isDark 
                          ? 'bg-amber-950/30 border-amber-800/50 text-amber-200' 
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-amber-500">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>Önemli ASA Obstetrik Kuralı (*):</span>
                        </div>
                        <p>
                          Her ne kadar gebelik bir hastalık olmasa da gebe kadının fizyolojik durumu gebe olmadığı zamana göre belirgin şekilde değiştiğinden (artan kardiyak debi, plazma hacmi, azalmış FRC), başka hiçbir ek hastalığı olmayan normal bir gebelik doğrudan <strong>ASA II</strong> olarak sınıflandırılır.
                        </p>
                        <p className="text-[11px] text-amber-400/90 italic">
                          Bu nedenle ASA I kategorisinde obstetrik hasta örneği yer almaz.
                        </p>
                      </div>
                    )}

                    {/* Examples Bullet List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {examplesList.map((example, eIdx) => (
                        <div
                          key={eIdx}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all text-xs leading-relaxed ${
                            isDark 
                              ? 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 text-slate-200' 
                              : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>

                    {/* Clinical Note Footer */}
                    {item.clinicalNotes && (
                      <div className={`text-[11px] pt-3 border-t flex items-center gap-1.5 ${
                        isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                      }`}>
                        <Sparkles className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                        <span className="font-semibold text-slate-400">Klinik Not:</span>
                        <span>{item.clinicalNotes}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Alternative View Mode: Complete Comparison Grid */}
      {viewMode === 'table' && (
        <div className={`rounded-2xl border overflow-hidden shadow-lg transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                ASA Fiziksel Durum Karşılaştırmalı Tablosu
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Resmi ASA 2025/2026 bildirisinin tüm kategorileri içeren tam matris görünümü
              </p>
            </div>
            <button
              onClick={() => setViewMode('slider')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Kaydırmalı Görünüme Dön
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className={`border-b ${isDark ? 'bg-slate-950/80 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                  <th className="p-3 font-bold w-28 shrink-0">Sınıf (PS)</th>
                  <th className="p-3 font-bold min-w-[200px]">Tanım</th>
                  <th className="p-3 font-bold min-w-[240px]">🧑 Erişkin Örnekleri</th>
                  <th className="p-3 font-bold min-w-[240px]">👶 Pediatrik Örnekler</th>
                  <th className="p-3 font-bold min-w-[240px]">🤰 Obstetrik Örnekler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredData.map((item) => (
                  <tr 
                    key={item.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <td className="p-3 align-top">
                      <span className={`inline-block px-2.5 py-1 rounded-md font-bold text-xs ${
                        isDark ? item.badgeColor.badgeBgDark : item.badgeColor.badgeBgLight
                      }`}>
                        {item.name}
                      </span>
                      <div className={`mt-1 font-semibold text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {item.shortLabel}
                      </div>
                    </td>
                    <td className="p-3 align-top space-y-1">
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.definitionTr}
                      </div>
                      {item.definitionSub && (
                        <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {item.definitionSub}
                        </div>
                      )}
                    </td>
                    <td className="p-3 align-top">
                      <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                        {item.adultExamples.map((ex, i) => (
                          <li key={i} className="leading-snug">{ex}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 align-top">
                      <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                        {item.pediatricExamples.map((ex, i) => (
                          <li key={i} className="leading-snug">{ex}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 align-top">
                      <ul className="space-y-1 list-disc list-inside text-slate-600 dark:text-slate-300">
                        {item.obstetricExamples.map((ex, i) => (
                          <li key={i} className="leading-snug">{ex}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Footnotes and Scientific Statement Card */}
      <div className={`p-5 rounded-2xl border text-xs space-y-3 transition-colors ${
        isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-300 dark:text-white">
          <BookOpen className="w-4 h-4 text-teal-500" />
          <span>Resmi ASA Bildiri Dipnotları ve Metodoloji</span>
        </div>
        <div className="space-y-2 leading-relaxed">
          <p>
            <strong className="text-teal-500">(*) Gebelik Dipnotu:</strong> Her ne kadar gebelik bir hastalık olmasa da gebe kadının fizyolojik durumu gebe olmadığı duruma göre belirgin şekilde değiştiğinden (artan kardiyak debi, plazma volümü artışı, fonksiyonel rezidüel kapasite düşüşü), komplikasyonsuz normal bir gebelik <strong>ASA PS II</strong> olarak atanır.
          </p>
          <p>
            <strong className="text-rose-500">(**) Acil Cerrahi (&quot;E&quot; Eki):</strong> &quot;E&quot; harfinin eklenmesi Acil cerrahiyi (Emergency) belirtir. Hastanın tedavisindeki bir gecikmenin hayatı veya bir vücut organını/parçasını tehdit eden riski önemli ölçüde artıracağı klinik durumlar acil olarak tanımlanır.
          </p>
          <p className="text-[11px] text-slate-400">
            <strong>Kaynak & Atıf:</strong> Statement on ASA Physical Status Classification System. Approved by the ASA House of Delegates on October 15, 2014, and last amended on October 22, 2025. Anesthesiology open 2026; 1:e0002. DOI: 10.1097/ao9.0000000000000002.
          </p>
        </div>
      </div>
    </div>
  );
};
