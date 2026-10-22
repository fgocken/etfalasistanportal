import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Phone, 
  Calculator, 
  Droplet, 
  BookOpen, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  AlertCircle, 
  Syringe,
  ShieldAlert,
  GripVertical,
  RotateCcw,
  ClipboardCheck,
  BarChart3
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { IntraopFluidCalculator } from './calculators/IntraopFluidCalculator';
import { InfusionRateCalculator } from './calculators/InfusionRateCalculator';
import { AsaClassification } from './asa/AsaClassification';
import { PreoperativeEvaluation } from './preop/PreoperativeEvaluation';
import { InfographicsView } from './infographics/InfographicsView';

export type ToolTabId = 'calculator' | 'intraop' | 'infusion' | 'asa' | 'preop' | 'infographics' | 'contacts';

export interface ToolItemDef {
  id: ToolTabId;
  title: string;
  badge: string;
  badgeHighlight?: boolean;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBgDark: string;
  iconBgLight: string;
  iconColorDark: string;
  iconColorLight: string;
  borderHoverDark: string;
  borderHoverLight: string;
  titleHoverDark: string;
  titleHoverLight: string;
  ringClassDark?: string;
  ringClassLight?: string;
}

export const ALL_CLINICAL_TOOLS: Record<ToolTabId, ToolItemDef> = {
  calculator: {
    id: 'calculator',
    title: 'Kilo, MV Volüm, İdame Sıvı',
    badge: 'IBW · PBW · TV',
    desc: 'Devine İdeal Kilo (IBW), Öngörülen Kilo (PBW), VKİ, Düzeltilmiş Kilo (AdjBW) ve koruyucu tidal volüm.',
    icon: Calculator,
    iconBgDark: 'bg-teal-500/10',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800'
  },
  intraop: {
    id: 'intraop',
    title: 'İntraop Sıvı Hesaplaması',
    badge: 'İntraop Sıvı',
    desc: 'Açlık süresi, obezite (AdjBW) ve 4 farklı cerrahi doku travma kaybına göre saat saat infüzyon planı.',
    icon: Droplet,
    iconBgDark: 'bg-cyan-500/10',
    iconBgLight: 'bg-cyan-50',
    iconColorDark: 'text-cyan-400',
    iconColorLight: 'text-cyan-700',
    borderHoverDark: 'hover:border-cyan-500/40',
    borderHoverLight: 'hover:border-cyan-400',
    titleHoverDark: 'group-hover:text-cyan-300',
    titleHoverLight: 'group-hover:text-cyan-800'
  },
  infusion: {
    id: 'infusion',
    title: 'İnfüzyon Hızı Çevirici/Hesaplayıcı',
    badge: 'Yeni Araç',
    badgeHighlight: true,
    desc: 'İlaç konsantrasyonu, 11 birimde otomatik dönüşüm (mcg/kg/dk, mL/saat) ve canlı sayaç.',
    icon: Syringe,
    iconBgDark: 'bg-teal-500/15',
    iconBgLight: 'bg-teal-50',
    iconColorDark: 'text-teal-400',
    iconColorLight: 'text-teal-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800',
    ringClassDark: 'ring-1 ring-teal-500/20',
    ringClassLight: 'ring-1 ring-teal-500/10'
  },
  asa: {
    id: 'asa',
    title: 'ASA Fiziksel Durum Sınıflaması',
    badge: '2025/2026 Güncel',
    badgeHighlight: true,
    desc: 'En güncel resmi ASA sınıflama tablosu. Resmi tanımlar, açılışta erişkin örnekleri ile pediatrik ve obstetrik gruplar.',
    icon: ShieldAlert,
    iconBgDark: 'bg-emerald-500/15',
    iconBgLight: 'bg-emerald-50',
    iconColorDark: 'text-emerald-400',
    iconColorLight: 'text-emerald-700',
    borderHoverDark: 'hover:border-emerald-500/40',
    borderHoverLight: 'hover:border-emerald-400',
    titleHoverDark: 'group-hover:text-emerald-300',
    titleHoverLight: 'group-hover:text-emerald-800',
    ringClassDark: 'ring-1 ring-emerald-500/20',
    ringClassLight: 'ring-1 ring-emerald-500/10'
  },
  preop: {
    id: 'preop',
    title: 'Preoperatif Değerlendirme',
    badge: 'Preoperatif',
    badgeHighlight: true,
    desc: 'Preoperatif hasta viziti, anestezi hazırlık ve sistemik değerlendirme protokolü.',
    icon: ClipboardCheck,
    iconBgDark: 'bg-blue-500/15',
    iconBgLight: 'bg-blue-50',
    iconColorDark: 'text-blue-400',
    iconColorLight: 'text-blue-700',
    borderHoverDark: 'hover:border-blue-500/40',
    borderHoverLight: 'hover:border-blue-400',
    titleHoverDark: 'group-hover:text-blue-300',
    titleHoverLight: 'group-hover:text-blue-800',
    ringClassDark: 'ring-1 ring-blue-500/20',
    ringClassLight: 'ring-1 ring-blue-500/10'
  },
  infographics: {
    id: 'infographics',
    title: 'Klinik İnfografikler',
    badge: 'İnfografikler',
    badgeHighlight: true,
    desc: 'Anestezi ve cerrahi kılavuzlar, risk sınıflamaları ve hızlı referans infografik şemaları.',
    icon: BarChart3,
    iconBgDark: 'bg-violet-500/15',
    iconBgLight: 'bg-violet-50',
    iconColorDark: 'text-violet-400',
    iconColorLight: 'text-violet-700',
    borderHoverDark: 'hover:border-violet-500/40',
    borderHoverLight: 'hover:border-violet-400',
    titleHoverDark: 'group-hover:text-violet-300',
    titleHoverLight: 'group-hover:text-violet-800',
    ringClassDark: 'ring-1 ring-violet-500/20',
    ringClassLight: 'ring-1 ring-violet-500/10'
  },
  contacts: {
    id: 'contacts',
    title: 'Klinik ve Dahili Hatlar',
    badge: 'Dahili Hatlar',
    desc: 'Ameliyathane koordinasyon, ARYB yoğun bakım, kıdemli hekim odası ve kan merkezi telefonları.',
    icon: Phone,
    iconBgDark: 'bg-indigo-500/10',
    iconBgLight: 'bg-indigo-50',
    iconColorDark: 'text-indigo-400',
    iconColorLight: 'text-indigo-700',
    borderHoverDark: 'hover:border-teal-500/40',
    borderHoverLight: 'hover:border-teal-400',
    titleHoverDark: 'group-hover:text-teal-300',
    titleHoverLight: 'group-hover:text-teal-800'
  }
};

export const DEFAULT_TOOL_ORDER: ToolTabId[] = ['calculator', 'intraop', 'infusion', 'asa', 'preop', 'infographics', 'contacts'];
export const TOOL_ORDER_STORAGE_KEY = 'etfal_clinical_tools_order_v6';

interface PortalWorkspaceProps {
  onBackToWelcome: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

/**
 * Kilo, MV Volüm, İdame Sıvı Hesaplayıcısı
 * @param {Object} params - Hesaplama parametreleri
 * @param {string|number} params.height - Boy (cm veya inç)
 * @param {string|number} params.weight - Kilo (kg veya lb)
 * @param {boolean} [params.isMale=true] - Erkek ise true, Kadın ise false
 * @param {boolean} [params.isMetric=true] - Metrik (cm/kg) ise true, İmperial (inç/lb) ise false
 */
function calculateWeightAndVentilation({
  height,
  weight,
  isMale = true,
  isMetric = true,
}: {
  height: string | number;
  weight: string | number;
  isMale?: boolean;
  isMetric?: boolean;
}) {
  // 1. Birim Dönüşümleri (cm ve kg cinsine çevirme)
  const hCm = isMetric ? parseFloat(String(height)) || 0 : (parseFloat(String(height)) || 0) * 2.54;
  const wKg = isMetric ? parseFloat(String(weight)) || 0 : (parseFloat(String(weight)) || 0) * 0.45359237;

  // 2. İdeal Kilo (IBW - Devine Formülü)
  let ibw = 0;
  if (hCm > 152.4) {
    ibw = isMale ? 50.0 + 0.91 * (hCm - 152.4) : 45.5 + 0.91 * (hCm - 152.4);
  } else {
    ibw = isMale ? 50.0 : 45.5;
  }

  // 3. Vücut Kitle İndeksi (VKİ / BMI)
  const bmi = hCm > 0 ? wKg / Math.pow(hCm / 100.0, 2) : 0;

  // VKİ Sınıflandırması
  let bmiCategory = "";
  let bmiColor = "";
  if (bmi > 0) {
    if (bmi < 18.5) { bmiCategory = "Zayıf"; bmiColor = "#0288D1"; }
    else if (bmi < 25.0) { bmiCategory = "Normal"; bmiColor = "#2E7D32"; }
    else if (bmi < 30.0) { bmiCategory = "Fazla Kilolu"; bmiColor = "#EF6C00"; }
    else if (bmi < 35.0) { bmiCategory = "Obezite (Sınıf 1)"; bmiColor = "#C62828"; }
    else if (bmi < 40.0) { bmiCategory = "Obezite (Sınıf 2)"; bmiColor = "#B71C1C"; }
    else { bmiCategory = "Obezite (Sınıf 3 - Morbid)"; bmiColor = "#880E4F"; }
  }

  // 4. Öngörülen Kilo (PBW - Predicted Body Weight)
  const pbw = ibw; // ARDSnet standardı: PBW = IBW

  // 5. Düzeltilmiş Kilo (AdjBW - Adjusted Body Weight)
  // Gerçek kilo, İdeal kilonun %120'sinden fazlaysa hesaplanır
  const isAdjustedActive = wKg > 0 && ibw > 0 && wKg > ibw * 1.2;
  const adjBw = isAdjustedActive 
    ? ibw + 0.4 * (wKg - ibw) 
    : wKg;

  // 6. Tidal Volüm Hesaplamaları (PBW üzerinden)
  const normalTvMin = pbw * 6; // Akciğer Koruyucu Ventilasyon (6 mL/kg)
  const normalTvMax = pbw * 8; // Akciğer Koruyucu Ventilasyon (8 mL/kg)
  const ardsTvMin = pbw * 4;   // ARDS Ventilasyonu (4 mL/kg)
  const ardsTvMax = pbw * 6;   // ARDS Ventilasyonu (4 mL/kg)

  // 7. İdame Sıvı Hesabı (“4-2-1” Kuralı / Holliday-Segar)
  // Hasta obez ise (BMI >= 30 veya Gerçek Kilo > %120 IBW) AdjBW kullanılır.
  // Obez değilse normal gerçek kilo (wKg) kullanılır.
  const isObese = (bmi >= 30) || isAdjustedActive;
  const fluidWeightVal = isObese ? adjBw : wKg;

  let fluidHourly = 0;
  let fluidFormulaBreakdown = '';
  if (fluidWeightVal > 0) {
    if (fluidWeightVal <= 10) {
      fluidHourly = fluidWeightVal * 4;
      fluidFormulaBreakdown = `${fluidWeightVal.toFixed(1)} kg × 4 mL/kg/saat = ${fluidHourly.toFixed(1)} mL/saat`;
    } else if (fluidWeightVal <= 20) {
      const tier1 = 10 * 4; // 40 mL
      const tier2 = (fluidWeightVal - 10) * 2;
      fluidHourly = tier1 + tier2;
      fluidFormulaBreakdown = `İlk 10 kg için 40 mL + ${(fluidWeightVal - 10).toFixed(1)} kg × 2 mL (${tier2.toFixed(1)} mL) = ${fluidHourly.toFixed(1)} mL/saat`;
    } else {
      const tier1 = 40; // 10 * 4 mL
      const tier2 = 20; // 10 * 2 mL
      const tier3 = (fluidWeightVal - 20) * 1;
      fluidHourly = tier1 + tier2 + tier3;
      fluidFormulaBreakdown = `İlk 10 kg için 40 mL + 10-20 kg için 20 mL + Kalan ${(fluidWeightVal - 20).toFixed(1)} kg için ${tier3.toFixed(1)} mL = ${fluidHourly.toFixed(1)} mL/saat`;
    }
  }

  const fluidDaily = fluidHourly * 24;

  return {
    hCm,
    wKg,
    ibw: ibw.toFixed(1),
    bmi: bmi.toFixed(1),
    bmiCategory,
    bmiColor,
    pbw: pbw.toFixed(1),
    adjBw: adjBw.toFixed(1),
    isAdjustedActive,
    isObese,
    fluidWeightUsed: fluidWeightVal.toFixed(1),
    fluidHourly: (Math.round(fluidHourly * 10) / 10).toFixed(1),
    fluidDaily: Math.round(fluidDaily),
    fluidFormulaBreakdown,
    normalTv: `${Math.round(normalTvMin)} - ${Math.round(normalTvMax)} mL`,
    ardsTv: `${Math.round(ardsTvMin)} - ${Math.round(ardsTvMax)} mL`
  };
}

export const PortalWorkspace: React.FC<PortalWorkspaceProps> = ({ 
  onBackToWelcome, 
  onOpenDisclaimer,
  isDark,
  onToggleTheme
}) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'calculator' | 'intraop' | 'infusion' | 'asa' | 'preop' | 'infographics' | 'contacts'>('tools');
  const [showFluidReferences, setShowFluidReferences] = useState<boolean>(false);

  // Tool Order state with localStorage persistence
  const [toolOrder, setToolOrder] = useState<ToolTabId[]>(() => {
    try {
      const saved = localStorage.getItem(TOOL_ORDER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === DEFAULT_TOOL_ORDER.length) {
          const isValid = DEFAULT_TOOL_ORDER.every(id => parsed.includes(id));
          if (isValid) return parsed as ToolTabId[];
        }
      }

      // Check previous storage versions and insert infographics if missing
      for (const oldKey of ['etfal_clinical_tools_order_v5', 'etfal_clinical_tools_order_v4', 'etfal_clinical_tools_order_v3']) {
        const prevSaved = localStorage.getItem(oldKey);
        if (prevSaved) {
          const parsedOld = JSON.parse(prevSaved);
          if (Array.isArray(parsedOld)) {
            const updated = parsedOld.filter(id => id in ALL_CLINICAL_TOOLS && id !== 'infographics');
            const contactsIdx = updated.indexOf('contacts');
            if (contactsIdx !== -1) {
              updated.splice(contactsIdx, 0, 'infographics');
            } else {
              updated.push('infographics');
            }
            if (updated.length === DEFAULT_TOOL_ORDER.length && DEFAULT_TOOL_ORDER.every(id => updated.includes(id))) {
              return updated as ToolTabId[];
            }
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_TOOL_ORDER;
  });

  const [draggedToolId, setDraggedToolId] = useState<ToolTabId | null>(null);
  const [dragOverToolId, setDragOverToolId] = useState<ToolTabId | null>(null);

  const saveToolOrder = (newOrder: ToolTabId[]) => {
    setToolOrder(newOrder);
    try {
      localStorage.setItem(TOOL_ORDER_STORAGE_KEY, JSON.stringify(newOrder));
    } catch (e) {
      console.error(e);
    }
  };

  const moveTool = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= toolOrder.length || fromIndex === toIndex) return;
    const updated = [...toolOrder];
    const [removed] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, removed);
    saveToolOrder(updated);
  };

  const resetToolOrder = () => {
    saveToolOrder(DEFAULT_TOOL_ORDER);
  };

  const isCustomOrder = JSON.stringify(toolOrder) !== JSON.stringify(DEFAULT_TOOL_ORDER);

  // Top navigation bar scroll & drag states
  const navTabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isJustDragged, setIsJustDragged] = useState(false);

  const checkNavScroll = () => {
    const el = navTabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    checkNavScroll();
    const el = navTabsRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkNavScroll, { passive: true });
    window.addEventListener('resize', checkNavScroll);
    return () => {
      el.removeEventListener('scroll', checkNavScroll);
      window.removeEventListener('resize', checkNavScroll);
    };
  }, [toolOrder]);

  const handleNavScroll = (direction: 'left' | 'right') => {
    const el = navTabsRef.current;
    if (!el) return;
    const scrollAmount = 240;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const handleNavWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = navTabsRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && el.scrollWidth > el.clientWidth) {
      el.scrollLeft += e.deltaY;
    }
  };

  // Calculator inputs
  const [calcHeight, setCalcHeight] = useState<string>('175');
  const [calcWeight, setCalcWeight] = useState<string>('75');
  const [calcIsMale, setCalcIsMale] = useState<boolean>(true);
  const [calcIsMetric, setCalcIsMetric] = useState<boolean>(true);

  // Compute results using user's exact function
  const calcResults = calculateWeightAndVentilation({
    height: calcHeight,
    weight: calcWeight,
    isMale: calcIsMale,
    isMetric: calcIsMetric
  });

  // Clinic Extensions
  const clinicContacts = [
    { title: 'Ameliyathane Koordinasyon & Danışma', ext: '2100', loc: 'Merkez Ameliyathane' },
    { title: 'Anestezi ve Reanimasyon Yoğun Bakım (ARYB)', ext: '3250', loc: '3. Kat Yoğun Bakım' },
    { title: 'Kıdemli Asistan & Nöbetçi Hekim Odası', ext: '2105', loc: 'Ameliyathane İçi' },
    { title: 'Merkez Kan Transfüzyon Ünitesi', ext: '3150', loc: '1. Kat' },
    { title: 'Klinik Eczanesi', ext: '4200', loc: 'Eczacılık Birimi' },
    { title: 'Mavi Kod / Acil Çağrı Merkezi', ext: '1111', loc: 'Güvenlik & Kriz' },
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 bg-transparent ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-30 transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800 backdrop-blur' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWelcome}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-teal-500" />
              <span className="hidden sm:inline">Karşılama Sayfası</span>
            </button>
            <div className={`h-4 w-px hidden sm:block ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <h1 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Şişli Etfal EAH Anestezi & Reanimasyon
            </h1>
          </div>

          {/* Top-Right: Date & Theme Switch */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`text-xs font-mono hidden lg:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar (Follows custom tool ordering, draggable & scrollable) */}
      <div className={`border-b transition-colors relative ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-2 sm:px-6 relative flex items-center">
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <div className={`absolute left-0 top-0 bottom-0 z-20 flex items-center pl-1 sm:pl-2 pr-3 bg-gradient-to-r pointer-events-auto ${
              isDark ? 'from-slate-900 via-slate-900/90 to-transparent' : 'from-white via-white/90 to-transparent'
            }`}>
              <button
                type="button"
                onClick={() => handleNavScroll('left')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                  isDark 
                    ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
                title="Sola kaydır"
                aria-label="Sola kaydır"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Scrolling Tabs Container */}
          <div 
            ref={navTabsRef}
            onWheel={handleNavWheel}
            className="flex-1 flex items-center gap-1 overflow-x-auto py-2 no-scrollbar scroll-smooth"
          >
            {/* Fixed First Tab: Genel Bakış */}
            <button
              key="tools"
              onClick={() => {
                if (isJustDragged) return;
                setActiveTab('tools');
              }}
              onDragOver={(e) => {
                if (draggedToolId) {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                  if (dragOverToolId !== ('tools' as any)) {
                    setDragOverToolId('tools' as any);
                  }
                }
              }}
              onDragLeave={() => {
                if (dragOverToolId === ('tools' as any)) {
                  setDragOverToolId(null);
                }
              }}
              onDrop={(e) => {
                if (draggedToolId) {
                  e.preventDefault();
                  setDragOverToolId(null);
                  const fromIdx = toolOrder.indexOf(draggedToolId);
                  if (fromIdx !== -1) {
                    moveTool(fromIdx, 0);
                  }
                  setDraggedToolId(null);
                }
              }}
              title="Genel Bakış paneli"
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-pointer border ${
                dragOverToolId === ('tools' as any)
                  ? 'ring-2 ring-teal-500 ring-offset-1 bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400'
                  : activeTab === 'tools'
                    ? isDark 
                      ? 'bg-slate-800 text-teal-300 font-semibold border-teal-500/30' 
                      : 'bg-teal-50 text-teal-800 font-semibold border-teal-200/80 shadow-xs'
                    : isDark
                      ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 shrink-0 ${
                activeTab === 'tools' 
                  ? isDark ? 'text-teal-400' : 'text-teal-700' 
                  : isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <span>Genel Bakış</span>
            </button>

            {/* Draggable & Reorderable Tool Tabs */}
            {toolOrder.map((toolId) => {
              const t = ALL_CLINICAL_TOOLS[toolId];
              if (!t) return null;
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              const isDragging = draggedToolId === t.id;
              const isOver = dragOverToolId === t.id;

              return (
                <button
                  key={t.id}
                  draggable
                  onDragStart={(e) => {
                    setIsJustDragged(true);
                    setDraggedToolId(t.id);
                    e.dataTransfer.setData('text/plain', t.id);
                    e.dataTransfer.effectAllowed = 'move';
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    if (dragOverToolId !== t.id) {
                      setDragOverToolId(t.id);
                    }
                  }}
                  onDragLeave={() => {
                    if (dragOverToolId === t.id) {
                      setDragOverToolId(null);
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOverToolId(null);
                    if (draggedToolId && draggedToolId !== t.id) {
                      const fromIdx = toolOrder.indexOf(draggedToolId);
                      const toIdx = toolOrder.indexOf(t.id);
                      if (fromIdx !== -1 && toIdx !== -1) {
                        moveTool(fromIdx, toIdx);
                      }
                    }
                    setDraggedToolId(null);
                  }}
                  onDragEnd={() => {
                    setDraggedToolId(null);
                    setDragOverToolId(null);
                    setTimeout(() => setIsJustDragged(false), 150);
                  }}
                  onClick={() => {
                    if (isJustDragged) return;
                    setActiveTab(t.id as any);
                  }}
                  title={`${t.title} — Sürükleyip bırakarak sekmelerin sırasını değiştirebilirsiniz`}
                  className={`group flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-all cursor-grab active:cursor-grabbing select-none border ${
                    isDragging
                      ? 'opacity-30 scale-95 border-dashed border-teal-500 bg-teal-500/5'
                      : isOver
                        ? 'ring-2 ring-teal-500 ring-offset-1 scale-[1.02] border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                        : isActive
                          ? isDark 
                            ? 'bg-slate-800 text-teal-300 font-semibold border-teal-500/30' 
                            : 'bg-teal-50 text-teal-800 font-semibold border-teal-200/80 shadow-xs'
                          : isDark
                            ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <GripVertical className="w-3 h-3 text-slate-400/60 group-hover:text-slate-400 opacity-40 group-hover:opacity-100 transition-opacity shrink-0 -mr-0.5" />
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${
                    isActive 
                      ? isDark ? 'text-teal-400' : 'text-teal-700' 
                      : isDark ? 'text-slate-500' : 'text-slate-400'
                  }`} />
                  <span>{t.title}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          {canScrollRight && (
            <div className={`absolute right-0 top-0 bottom-0 z-20 flex items-center pr-1 sm:pr-2 pl-3 bg-gradient-to-l pointer-events-auto ${
              isDark ? 'from-slate-900 via-slate-900/90 to-transparent' : 'from-white via-white/90 to-transparent'
            }`}>
              <button
                type="button"
                onClick={() => handleNavScroll('right')}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                  isDark 
                    ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 hover:text-white' 
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
                title="Sağa kaydır"
                aria-label="Sağa kaydır"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* 1. Overview */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className={`border-b pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Şişli Etfal Dashboard
                  </h2>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isDark ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' : 'bg-teal-50 text-teal-800 border border-teal-200'
                  }`}>
                    🖐️ Sürüklenebilir Sıralama
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Kartları sürükleyip bırakarak veya yön butonlarıyla en sık kullandığınız sıraya göre dizebilirsiniz.
                </p>
              </div>

              {isCustomOrder && (
                <button
                  onClick={resetToolOrder}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer self-start sm:self-auto ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-xs'
                  }`}
                  title="Varsayılan araç sıralamasına geri dön"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Sıralamayı Sıfırla</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {toolOrder.map((toolId, index) => {
                const tool = ALL_CLINICAL_TOOLS[toolId];
                if (!tool) return null;
                const Icon = tool.icon;
                const isDragging = draggedToolId === toolId;
                const isOver = dragOverToolId === toolId;

                return (
                  <div
                    key={tool.id}
                    draggable
                    onDragStart={(e) => {
                      setDraggedToolId(tool.id);
                      e.dataTransfer.setData('text/plain', tool.id);
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.dataTransfer.dropEffect = 'move';
                      if (dragOverToolId !== tool.id) {
                        setDragOverToolId(tool.id);
                      }
                    }}
                    onDragLeave={() => {
                      if (dragOverToolId === tool.id) {
                        setDragOverToolId(null);
                      }
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOverToolId(null);
                      if (draggedToolId && draggedToolId !== tool.id) {
                        const fromIdx = toolOrder.indexOf(draggedToolId);
                        const toIdx = toolOrder.indexOf(tool.id);
                        if (fromIdx !== -1 && toIdx !== -1) {
                          moveTool(fromIdx, toIdx);
                        }
                      }
                      setDraggedToolId(null);
                    }}
                    onDragEnd={() => {
                      setDraggedToolId(null);
                      setDragOverToolId(null);
                    }}
                    onClick={() => setActiveTab(tool.id)}
                    className={`relative text-left p-5 rounded-xl border transition-all space-y-2 group flex flex-col justify-between cursor-pointer select-none ${
                      isDragging 
                        ? 'opacity-35 scale-95 border-dashed border-teal-500 bg-teal-500/5' 
                        : isOver 
                          ? 'ring-2 ring-teal-500 ring-offset-2 scale-[1.02] border-teal-500 shadow-lg' 
                          : isDark
                            ? `bg-slate-900 border-slate-800 ${tool.borderHoverDark} text-slate-100 ${tool.ringClassDark || ''}`
                            : `bg-white border-slate-200 ${tool.borderHoverLight} text-slate-900 shadow-xs ${tool.ringClassLight || ''}`
                    }`}
                  >
                    <div>
                      {/* Top Action Row: Icon, Badge, Grip Handle & Reorder arrows */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-2 rounded-lg ${
                          isDark ? `${tool.iconBgDark} ${tool.iconColorDark}` : `${tool.iconBgLight} ${tool.iconColorLight}`
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <span className={`text-[11px] font-mono ${
                            tool.badgeHighlight 
                              ? isDark ? 'text-teal-400 font-semibold' : 'text-teal-600 font-semibold' 
                              : isDark ? 'text-slate-500' : 'text-slate-400'
                          }`}>
                            {tool.badge}
                          </span>

                          {/* Quick Mobile / Button Reorder Controls */}
                          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 rounded-md p-0.5 ml-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              disabled={index === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveTool(index, index - 1);
                              }}
                              title="Sola / Başa taşı"
                              className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                                index === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <button
                              type="button"
                              disabled={index === toolOrder.length - 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                moveTool(index, index + 1);
                              }}
                              title="Sağa / Sona taşı"
                              className={`p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                                index === toolOrder.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Drag Grip Handle */}
                          <div
                            title="Sıralamayı değiştirmek için sürükleyin"
                            className="p-1 text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 cursor-grab active:cursor-grabbing"
                          >
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      <h3 className={`text-sm font-bold transition-colors ${
                        isDark ? `text-white ${tool.titleHoverDark}` : `text-slate-900 ${tool.titleHoverLight}`
                      }`}>
                        {tool.title}
                      </h3>
                      <p className={`text-xs leading-relaxed mt-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {tool.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-xs">
                      <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        #{index + 1}. Sıra
                      </span>
                      <span className={`font-semibold ${
                        isDark ? 'text-teal-400 group-hover:underline' : 'text-teal-700 group-hover:underline'
                      }`}>
                        Aracı Aç →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Custom Calculator: Kilo, MV Volüm, İdame Sıvı Hesaplayıcısı */}
        {activeTab === 'calculator' && (
          <div className={`rounded-xl border p-6 space-y-6 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`border-b pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div>
                <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Kilo, MV Volüm, İdame Sıvı Hesaplayıcısı
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  İdeal Kilo (IBW Devine), Öngörülen Kilo (PBW), VKİ, Düzeltilmiş Kilo (AdjBW), Koruyucu Ventilasyon Tidal Volümü ve 4-2-1 İdame Sıvı Hızı.
                </p>
              </div>

              {/* Metric / Imperial Unit Selector */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setCalcIsMetric(true)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    calcIsMetric 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Metrik (cm, kg)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcIsMetric(false)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    !calcIsMetric 
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  İmperial (inç, lb)
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Cinsiyet
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcIsMale(true)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      calcIsMale 
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold' : 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Erkek
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcIsMale(false)}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      !calcIsMale 
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold' : 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Kadın
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Boy ({calcIsMetric ? 'cm' : 'inç'})
                </label>
                <input
                  type="number"
                  step="any"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(e.target.value)}
                  placeholder={calcIsMetric ? '175' : '69'}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Kilo ({calcIsMetric ? 'kg' : 'lb'})
                </label>
                <input
                  type="number"
                  step="any"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(e.target.value)}
                  placeholder={calcIsMetric ? '75' : '165'}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Calculation Output Cards */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              {/* 1. IBW & PBW */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    İdeal Kilo (IBW / Devine)
                  </div>
                  <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {calcResults.ibw} <span className="text-xs font-normal text-slate-500">kg</span>
                  </div>
                </div>
                <div className={`text-[11px] mt-3 pt-2 border-t ${
                  isDark ? 'border-slate-700/60 text-slate-400' : 'border-slate-200 text-slate-600'
                }`}>
                  Öngörülen Kilo (PBW): <strong className="font-mono text-slate-200 dark:text-white">{calcResults.pbw} kg</strong> (ARDSnet)
                </div>
              </div>

              {/* 2. BMI / VKİ */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Vücut Kitle İndeksi (VKİ / BMI)
                  </div>
                  <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {calcResults.bmi} <span className="text-xs font-normal text-slate-500">kg/m²</span>
                  </div>
                </div>
                <div className="mt-3 pt-2">
                  {calcResults.bmiCategory && (
                    <span 
                      style={{ color: calcResults.bmiColor }}
                      className="text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: calcResults.bmiColor }} />
                      {calcResults.bmiCategory}
                    </span>
                  )}
                </div>
              </div>

              {/* 3. Düzeltilmiş Kilo (AdjBW) */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Düzeltilmiş Kilo (AdjBW)
                  </div>
                  <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {calcResults.adjBw} <span className="text-xs font-normal text-slate-500">kg</span>
                  </div>
                </div>
                <div className={`text-[11px] mt-3 pt-2 border-t ${
                  isDark ? 'border-slate-700/60' : 'border-slate-200'
                }`}>
                  {calcResults.isAdjustedActive ? (
                    <span className="text-amber-400 font-medium">
                      Obezitede Aktif (Gerçek Kilo &gt; %120 IBW)
                    </span>
                  ) : (
                    <span className="text-slate-500">
                      Normal aralık (Gerçek Kilo ≤ %120 IBW)
                    </span>
                  )}
                </div>
              </div>

              {/* 4. Akciğer Koruyucu Ventilasyon (6-8 mL/kg) */}
              <div className={`p-4 rounded-xl border sm:col-span-1 lg:col-span-2 ${
                isDark 
                  ? 'bg-teal-950/40 border-teal-800/60' 
                  : 'bg-teal-50/70 border-teal-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isDark ? 'text-teal-300' : 'text-teal-800'}`}>
                    Akciğer Koruyucu Ventilasyon (Normal TV)
                  </span>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                    6 - 8 mL/kg PBW
                  </span>
                </div>
                <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-teal-200' : 'text-teal-900'}`}>
                  {calcResults.normalTv}
                </div>
                <div className={`text-[11px] mt-2 ${isDark ? 'text-teal-300/80' : 'text-teal-700'}`}>
                  Standart cerrahi vakalarda barotravma ve volütravmayı önleyen koruyucu tidal volüm aralığı.
                </div>
              </div>

              {/* 5. ARDS Ventilasyonu (4-6 mL/kg) */}
              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? 'bg-rose-950/30 border-rose-900/50' 
                  : 'bg-rose-50/70 border-rose-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isDark ? 'text-rose-300' : 'text-rose-800'}`}>
                    ARDS Ventilasyonu (Düşük TV)
                  </span>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                    4 - 6 mL/kg PBW
                  </span>
                </div>
                <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
                  {calcResults.ardsTv}
                </div>
                <div className={`text-[11px] mt-2 ${isDark ? 'text-rose-300/80' : 'text-rose-700'}`}>
                  Akut solunum sıkıntısı sendromu (ARDS) ve kompliyansı düşük akciğerlerde hedef aralık.
                </div>
              </div>
            </div>

            {/* 6. İdame Sıvı Hesabı (“4-2-1” Kuralı / Holliday-Segar) */}
            <div className={`p-5 rounded-xl border transition-colors space-y-4 ${
              isDark 
                ? 'bg-slate-800/40 border-slate-700/80' 
                : 'bg-sky-50/60 border-sky-200/80 shadow-xs'
            }`}>
              {/* Başlık ve Obezite / Kilo Durumu Rozeti */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg ${
                    isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-700'
                  }`}>
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className={`text-sm font-bold flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      İdame Sıvı Hesabı (“4-2-1” Kuralı)
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Holliday-Segar formülü ile saatlik parenteral sıvı infüzyon gereksinimi
                    </p>
                  </div>
                </div>

                {/* Obezite / Kullanılan Kilo Rozeti */}
                <div className="self-start sm:self-auto">
                  {calcResults.isObese ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                      <span>Obez Hasta: Düzeltilmiş Kilo (AdjBW: <strong>{calcResults.fluidWeightUsed} kg</strong>) kullanıldı</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>Normal Ağırlık: Gerçek Kilo (<strong>{calcResults.fluidWeightUsed} kg</strong>) kullanıldı</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Obezite Klinik Açıklaması */}
              {calcResults.isObese && (
                <div className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                  isDark ? 'bg-amber-950/30 text-amber-300/90 border border-amber-900/40' : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                  <span>
                    <strong>Klinik Prensip:</strong> Hastanın VKİ &ge; 30 kg/m² veya gerçek ağırlığı ideal kilosunun %120&apos;sinden fazla olduğu için, aşırı hidrasyon ve kardiyak/pulmoner yüklenmeyi önlemek amacıyla idame sıvı hızı <strong>Düzeltilmiş Vücut Ağırlığı (AdjBW = {calcResults.fluidWeightUsed} kg)</strong> üzerinden hesaplanmıştır.
                  </span>
                </div>
              )}

              {/* Sonuç Kartı: Saatlik İdame Hızı */}
              <div className={`p-4 rounded-xl border flex flex-col justify-between ${
                isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-sky-100 shadow-xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${isDark ? 'text-sky-300' : 'text-sky-800'}`}>
                    Saatlik İdame Sıvı Hızı
                  </span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                    isDark ? 'bg-sky-950 text-sky-400' : 'bg-sky-50 text-sky-700'
                  }`}>
                    İnfüzyon Hızı
                  </span>
                </div>
                <div className={`text-3xl font-bold font-mono mt-2 tabular-nums ${
                  isDark ? 'text-sky-200' : 'text-sky-950'
                }`}>
                  {calcResults.fluidHourly} <span className="text-base font-normal text-slate-500">mL/saat</span>
                </div>
                <div className={`text-[11px] mt-2 pt-2 border-t ${
                  isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-500'
                }`}>
                  Elektronik infüzyon pompası saatlik akış ayarı
                </div>
              </div>

              {/* 4-2-1 Kuralı Kırılım Kutusu */}
              <div className={`p-3.5 rounded-lg border text-xs space-y-1.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white/80 border-slate-200 text-slate-700'
              }`}>
                <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>Hesaplama Kırılımı (“4-2-1” Kuralı):</span>
                  <span className="font-mono text-[11px] text-teal-600 dark:text-teal-400">
                    Hesaplanan Ağırlık: {calcResults.fluidWeightUsed} kg
                  </span>
                </div>
                <div className="font-mono text-xs text-teal-700 dark:text-teal-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded">
                  {calcResults.fluidFormulaBreakdown || '0 mL/saat'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1 text-slate-500 dark:text-slate-400">
                  <div>• <strong>0 - 10 kg:</strong> 4 mL/kg/saat</div>
                  <div>• <strong>&gt;10 - 20 kg:</strong> 40 mL + 2 mL/kg/saat</div>
                  <div>• <strong>&gt;20 kg:</strong> 60 mL + 1 mL/kg/saat</div>
                </div>
              </div>

              {/* Literatür ve Referanslar Açılır Bölüm */}
              <div className={`pt-2 border-t ${isDark ? 'border-slate-700/60' : 'border-sky-200/60'}`}>
                <button
                  type="button"
                  onClick={() => setShowFluidReferences(!showFluidReferences)}
                  className={`flex items-center justify-between w-full text-left text-xs font-medium cursor-pointer transition-colors ${
                    isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-teal-500" />
                    <span>Literatür, Doğrulama &amp; Referanslar (MdCalc)</span>
                  </span>
                  {showFluidReferences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {showFluidReferences && (
                  <div className={`mt-3 p-3.5 rounded-lg text-[11px] space-y-2.5 ${
                    isDark ? 'bg-slate-900/90 border border-slate-800 text-slate-300' : 'bg-white border border-slate-200 text-slate-700'
                  }`}>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Orijinal / Birincil Referans (Original/Primary Reference):</div>
                      <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                        Holiday MA, Segar WE. The maintenance need for water in parenteral fluid therapy. <em>Pediatrics</em>. 1957.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Anestezi Validasyonu (Validation):</div>
                      <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                        Oh TH. Formulas for calculating fluid maintenance requirements. <em>Anesthesiology</em>. 1980; 53:351.
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Diğer Referanslar (Other References):</div>
                      <div className="italic text-slate-500 dark:text-slate-400 mt-0.5">
                        Arya VK. Basics of fluid and blood transfusion therapy in paediatric surgical patients. <em>Indian Journal of Anaesthesia</em>. 2012; 56(5):454-462. doi:10.4103/0019-5049.103960.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. Intraop Fluid Calculator */}
        {activeTab === 'intraop' && (
          <IntraopFluidCalculator isDark={isDark} />
        )}

        {/* 4. Infusion Rate Calculator */}
        {activeTab === 'infusion' && (
          <InfusionRateCalculator isDark={isDark} />
        )}

        {/* 5. ASA Physical Status Classification (Latest Statement) */}
        {activeTab === 'asa' && (
          <AsaClassification isDark={isDark} />
        )}

        {/* 6. Preoperative Evaluation */}
        {activeTab === 'preop' && (
          <PreoperativeEvaluation isDark={isDark} />
        )}

        {/* 7. Clinical Infographics (ESC 2022 Guidelines) */}
        {activeTab === 'infographics' && (
          <InfographicsView isDark={isDark} />
        )}

        {/* 8. Contacts */}
        {activeTab === 'contacts' && (
          <div className={`rounded-xl border p-6 space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik & Ameliyathane Dahili Numaraları
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Şişli Etfal EAH bünyesinde sık aranan kritik birimler.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clinicContacts.map((c) => (
                <div key={c.title} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                  isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                }`}>
                  <div>
                    <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.title}</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.loc}</div>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono text-base font-bold tabular-nums ${
                      isDark ? 'text-teal-400' : 'text-teal-900'
                    }`}>{c.ext}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-auto border-t py-4 px-4 sm:px-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>Şişli Hamidiye Etfal EAH · Anestezi ve Reanimasyon Kliniği Asistan Portalı</span>
          <button
            onClick={onOpenDisclaimer}
            className={`transition-colors underline underline-offset-4 cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-teal-400' : 'text-slate-600 hover:text-teal-700'
            }`}
          >
            Sorumluluk Reddi
          </button>
        </div>
      </footer>
    </div>
  );
};
