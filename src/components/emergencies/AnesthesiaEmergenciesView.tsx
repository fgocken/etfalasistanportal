import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  AlertOctagon, 
  Flame, 
  HeartCrack, 
  Activity, 
  ShieldAlert, 
  AlertCircle,
  AlertTriangle,
  Syringe,
  Wind,
  ArrowRight,
  Layers,
  HelpCircle,
  Sliders,
  Wrench,
  Search,
  X,
  Clock
} from 'lucide-react';
import { ANESTHESIA_EMERGENCIES_DATA } from '../../data/emergenciesData';
import { EMERGENCY_TROUBLESHOOTING_ITEMS } from '../../data/emergenciesTroubleshootingData';
import { EmergencyProtocolDetailView } from './EmergencyProtocolDetailView';
import { EmergencyTroubleshootingDetailView } from './EmergencyTroubleshootingDetailView';
import { PortalLink } from '../common/PortalLink';
import { buildHashHref, parseHashRoute, updateHashRoute } from '../../utils/deepLink';

interface AnesthesiaEmergenciesViewProps {
  isDark: boolean;
  initialEmergencyId?: string | null;
}

type EmergencyDomainFilter = 'all' | 'airway' | 'cardiovascular' | 'metabolic-toxic' | 'troubleshooting';
type EmergencyClinicalCategory = 'airway' | 'cardiovascular' | 'metabolic-toxic';

const CATEGORY_LABELS: Record<EmergencyClinicalCategory, string> = {
  airway: 'Hava Yolu Acilleri',
  cardiovascular: 'Kardiyovasküler & Kanama',
  'metabolic-toxic': 'Metabolik, Toksik & Alerjik'
};

interface EmergencyCategoryPreview {
  id: string;
  category: EmergencyClinicalCategory;
  title: string;
  shortDesc: string;
  footerNote?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: 'rose' | 'amber' | 'red' | 'purple' | 'cyan' | 'emerald';
  isReady?: boolean;
}

const EMERGENCY_PREVIEWS: EmergencyCategoryPreview[] = [
  {
    id: 'mh',
    category: 'metabolic-toxic',
    title: 'Malign Hipertermi (MH)',
    shortDesc: 'RYR1 kalsiyum fırtınası, Dantrolen dozu (2.5 mg/kg), aktif soğutma ve Larach tanı skoru.',
    icon: Flame,
    accentColor: 'red',
    isReady: true
  },
  {
    id: 'pe',
    category: 'cardiovascular',
    title: 'Pulmoner Embolizm (PE / PTE)',
    shortDesc: 'Masif ve submasif PE, ani EtCO2 çöküşü, akut sağ kalp (RV) dekompansasyonu, hedefe yönelik sıvı kısıtlaması, Alteplase/Tenecteplase trombolizi, UFH ve ECMO.',
    icon: Activity,
    accentColor: 'red',
    isReady: true
  },
  {
    id: 'vae',
    category: 'cardiovascular',
    title: 'İntra-operatif Hava Embolisi (VAE / PAE)',
    shortDesc: 'Venöz ve paradoksal hava embolisi, Durant manevrası (sol lateral Trendelenburg), N2O derhal kapatma, CVC hava aspirasyonu, PEEP yasağı ve HBOT.',
    icon: Wind,
    accentColor: 'cyan',
    isReady: true
  },
  {
    id: 'bronchospasm',
    category: 'airway',
    title: 'İntraoperatif Akut Bronkospazm',
    shortDesc: 'Hava yolu direnci fırtınası, yüksek Ppeak, köpekbalığı sırtı EtCO2, Salbutamol/Mg/Adrenalin ve ventilatör optimizasyonu.',
    icon: Wind,
    accentColor: 'amber',
    isReady: true
  },
  {
    id: 'laryngospasm',
    category: 'airway',
    title: 'Perioperatif Akut Laringospazm',
    shortDesc: 'Larson çentik manevrası, CPAP, sub-paralitik Süksinilkolin/Propofol ve Negatif Basınçlı Pulmoner Ödem (NPPE) yönetimi.',
    icon: Activity,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'anaphylaxis',
    category: 'metabolic-toxic',
    title: 'Şiddetli Anafilaktik Şok & İntraoperatif Anafilaksi',
    shortDesc: 'Ring & Messmer Grade 2-4 reaksiyon, Adrenalin kademeli titrasyonu (IV/IM), masif kristaloid volüm, kolloid yasağı, Triptaz tanı protokolü ve Sugammadeks kurtarma dozu.',
    icon: Syringe,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'acls',
    category: 'cardiovascular',
    title: 'Perioperatif Kardiyak Arrest & ACLS',
    shortDesc: 'Şoklanabilir (VF/pVT) ve şoklanamaz (Asistoli/PEA) algoritmaları, EtCO2/arteriyel KPR hedefleri, perioperatif 5H-5T, prone/gebelik KPR ve ROSC bakımı.',
    icon: HeartCrack,
    accentColor: 'red',
    isReady: true
  },
  {
    id: 'last',
    category: 'metabolic-toxic',
    title: 'LAST (Lokal Anestezik Sistemik Toksisitesi)',
    shortDesc: 'ASRA 2020 %20 Lipid Emülsiyon (İntralipid) kurtarma, modifiye düşük doz adrenalin (≤1 mcg/kg), nöbet kontrolü ve LA güvenli doz limitleri.',
    icon: Activity,
    accentColor: 'purple',
    isReady: true
  },
  {
    id: 'airway-crisis',
    category: 'airway',
    title: 'Ventile Edilemiyor - Entübe Edilemiyor (CICO)',
    shortDesc: 'Neşter-buji-tüp krikotiroidotomi, DAS 2015 Plan D eFONA, Sugammadeks 16 mg/kg kurtarma dozu ve anoksik arrest önleme.',
    icon: AlertOctagon,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'airway-obstruction',
    category: 'airway',
    title: 'Akut Hava Yolu Obstrüksiyonu',
    shortDesc: 'Postoperatif boyun hematomu yatak başı dikiş açma, yabancı cisim ekstraksiyonu, ETT tıkanması ve laringeal ödem yönetimi.',
    icon: ShieldAlert,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'aspiration',
    category: 'airway',
    title: 'Pulmoner Aspirasyon (Mendelson)',
    shortDesc: 'Asit ve partikül aspirasyonunda anında Trendelenburg, ETT izolasyonu, PEEP, lavaj yasağı ve gastrik USG.',
    icon: AlertTriangle,
    accentColor: 'amber',
    isReady: true
  },
  {
    id: 'mtp',
    category: 'cardiovascular',
    title: 'Masif Transfüzyon Protokolü (MTP)',
    shortDesc: '1:1:1 TDP-ES-Trombosit dengeli resüsitasyonu, ABC skoru, ROTEM/TEG hedefli fibrinojen, ilk 3 saat TXA, her 4 ünitede kalsiyum ve Ölümcül Dörtlü yönetimi.',
    icon: Activity,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'tension-pneumothorax',
    category: 'airway',
    title: 'Tansiyon Pnömotoraks',
    shortDesc: 'Tek yönlü valf & obstrüktif şok, N₂O kapatma, PEEP=0, acil 4–5. İKA AAL/MAL iğne veya parmak torakostomi, BTS Emniyet Üçgeni tüp ve klemp yasağı.',
    icon: Wind,
    accentColor: 'red',
    isReady: true
  },
  {
    id: 'airway-fire',
    category: 'airway',
    title: 'Hava Yolu Yangını (Airway Fire)',
    shortDesc: 'ETT çıkarımı + gaz kesimi + steril SF dökümü (eşzamanlı refleks), Yangın Üçgeni, lazer-dirençli ETT & metilen mavisi kaf, FiO₂ ≤ %30 ve 3 dk alkol kuruma.',
    icon: Flame,
    accentColor: 'red',
    isReady: true
  }
];

interface TroubleshootingPreview {
  id: string;
  category: EmergencyClinicalCategory;
  title: string;
  shortDesc: string;
  tag: string;
  footerNote: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TROUBLESHOOTING_PREVIEWS: TroubleshootingPreview[] = [
  {
    id: 'etco2-elevation',
    category: 'metabolic-toxic',
    title: 'İntraoperatif End-Tidal Karbondioksit (EtCO₂) Yükselmesi',
    shortDesc: 'EtCO₂ > 45 mmHg hiperkapni, FiCO₂ > 0 yeniden soluma (soda lime / valf arızası), shark-fin & kurar çentiği kapnogramı, laparoskopik CO₂ emilimi ve Malign Hipertermi erken taraması.',
    tag: 'EtCO₂ ↑ · Metabolik & Devre',
    footerNote: 'İlk 60 sn · 4 Kapnogram & 9 Neden',
    icon: Sliders
  },
  {
    id: 'etco2-decrease',
    category: 'cardiovascular',
    title: 'İntraoperatif End-Tidal Karbondioksit (EtCO₂) Azalması',
    shortDesc: 'Ani EtCO₂ düşüşü veya flatline: Kardiyak arrest, Masif PE/VAE, özofageal entübasyon (NAP4), devre ayrılması, tansiyon pnömotoraks, hiperventilasyon ve hipotermi ayrımı.',
    tag: 'EtCO₂ ↓ · Hemodinamik & Arrest',
    footerNote: 'İlk 60 sn · 4 Kapnogram & 9 Neden',
    icon: Activity
  },
  {
    id: 'fico2-elevation',
    category: 'airway',
    title: 'İntraoperatif Dönemde FiCO₂ Yükselmesi (Yeniden Soluma)',
    shortDesc: 'İnspiratuvar CO₂ > 0–2 mmHg: Tükenmiş soda lime, tek yönlü ekspiratuvar/inspiratuvar valf takılması, kanister kanalizasyonu/bypass, Mapleson/Bain düşük FGF ve sıfır kalibrasyon kayması.',
    tag: 'FiCO₂ ↑ · Devre & Hava Yolu',
    footerNote: 'İlk 60 sn · 4 Kapnogram & 8 Neden',
    icon: Wind
  },
  {
    id: 'ppeak-elevation',
    category: 'airway',
    title: 'İntraoperatif Dönemde Tepe Hava Yolu Basıncı (Ppeak) Yükselmesi',
    shortDesc: 'Ppeak > 35–40 cmH₂O: Basınç-zaman eğrisi ve Ppeak − Pplat gradienti ile rezistans (ETT kink, sekresyon, bronkospazm, HME tıkanıklığı) vs kompliyans (tansiyon pnömotoraks, sağ ana bronş, oto-PEEP) ayrımı.',
    tag: 'Ppeak ↑ · Hava Yolu & Ventilatör',
    footerNote: 'İlk 60 sn · Basınç Eğrisi & 10 Neden',
    icon: Wind
  },
  {
    id: 'hypoxemia',
    category: 'airway',
    title: 'İntraoperatif Hipoksemi (Desatürasyon)',
    shortDesc: 'SpO₂ < %90–94: Pleth artefakt & dishemoglobinemi (MetHb/COHb) ayrımı, düşük DO₂/SvO₂, Tek Akciğer Ventilasyonu (OLV — FOB, PEEP, üst akciğer CPAP) ve Hepatopulmoner Sendrom (HPS) yönetimi.',
    tag: 'SpO₂ ↓ · Solunum & Oksijenasyon',
    footerNote: 'İlk 60 sn · 4 Pleth Eğrisi & 12 Neden',
    icon: Activity
  },
  {
    id: 'emergence-delay',
    category: 'metabolic-toxic',
    title: 'Anestezi Sonrası Gecikmiş Uyanma (Emergence Delay)',
    shortDesc: 'Anestezikler kesildikten > 30–45 dk sonra yanıtsızlık: Önce TOF (uyanık paralizi), parmak ucu glukoz ve AKG dışlaması; Propofol/opioid birikimi, Nalokson/Flumazenil/Fizostigmin titrasyonu, hipotermi, CO₂ narkozu ve acil Beyin BT.',
    tag: 'Uyanma ↓ · Farmakolojik & Nörolojik',
    footerNote: 'İlk 60 sn · 6 Adım & 12 Neden',
    icon: Clock
  }
];

const isValidEmergencyId = (id: string | null | undefined): id is string =>
  Boolean(
    id &&
      (ANESTHESIA_EMERGENCIES_DATA[id] ||
        EMERGENCY_TROUBLESHOOTING_ITEMS.some((item) => item.id === id))
  );

export const AnesthesiaEmergenciesView: React.FC<AnesthesiaEmergenciesViewProps> = ({ 
  isDark,
  initialEmergencyId 
}) => {
  const [selectedEmergencyId, setSelectedEmergencyId] = useState<string | null>(() => {
    if (isValidEmergencyId(initialEmergencyId)) return initialEmergencyId;
    const route = parseHashRoute();
    if (route.type === 'arac' && route.id === 'emergencies' && isValidEmergencyId(route.subId)) {
      return route.subId;
    }
    return null;
  });
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<EmergencyDomainFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (isValidEmergencyId(initialEmergencyId)) {
      setSelectedEmergencyId(initialEmergencyId);
    } else if (initialEmergencyId === null) {
      const route = parseHashRoute();
      if (route.type === 'arac' && route.id === 'emergencies' && isValidEmergencyId(route.subId)) {
        setSelectedEmergencyId(route.subId);
      } else {
        setSelectedEmergencyId(null);
      }
    }
  }, [initialEmergencyId]);

  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHashRoute();
      if (route.type === 'arac' && route.id === 'emergencies') {
        setSelectedEmergencyId(isValidEmergencyId(route.subId) ? route.subId : null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filterTabs = useMemo(() => {
    const countByCat = (cat: EmergencyClinicalCategory) =>
      EMERGENCY_PREVIEWS.filter((p) => p.category === cat).length +
      TROUBLESHOOTING_PREVIEWS.filter((t) => t.category === cat).length;

    return [
      {
        id: 'all' as EmergencyDomainFilter,
        label: 'Tümü',
        count: EMERGENCY_PREVIEWS.length + TROUBLESHOOTING_PREVIEWS.length
      },
      {
        id: 'airway' as EmergencyDomainFilter,
        label: 'Hava Yolu Acilleri',
        count: countByCat('airway')
      },
      {
        id: 'cardiovascular' as EmergencyDomainFilter,
        label: 'Kardiyovasküler & Kanama',
        count: countByCat('cardiovascular')
      },
      {
        id: 'metabolic-toxic' as EmergencyDomainFilter,
        label: 'Metabolik, Toksik & Alerjik',
        count: countByCat('metabolic-toxic')
      },
      {
        id: 'troubleshooting' as EmergencyDomainFilter,
        label: 'Monitör & Ventilatör',
        count: TROUBLESHOOTING_PREVIEWS.length
      }
    ];
  }, []);

  const feedbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const filteredEmergencies = useMemo(() => {
    if (activeFilter === 'troubleshooting') return [];
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR');
    return EMERGENCY_PREVIEWS.filter((item) => {
      if (activeFilter !== 'all' && item.category !== activeFilter) {
        return false;
      }
      if (!q) return true;
      const protocol = ANESTHESIA_EMERGENCIES_DATA[item.id];
      const extraText = protocol
        ? `${protocol.keyCallout} ${protocol.introduction.triggers?.join(' ') || ''}`
        : '';
      const haystack = `${item.title} ${item.shortDesc} ${CATEGORY_LABELS[item.category]} ${extraText}`.toLocaleLowerCase('tr-TR');
      return haystack.includes(q);
    });
  }, [activeFilter, searchQuery]);

  const filteredTroubleshooting = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase('tr-TR');
    return TROUBLESHOOTING_PREVIEWS.filter((item) => {
      if (activeFilter !== 'all' && activeFilter !== 'troubleshooting' && item.category !== activeFilter) {
        return false;
      }
      if (!q) return true;
      const fullItem = EMERGENCY_TROUBLESHOOTING_ITEMS.find((t) => t.id === item.id);
      const extraText = fullItem
        ? `${fullItem.subtitle} ${fullItem.goldenSixtySeconds.join(' ')} ${fullItem.differentialDiagnosis.map((d) => d.condition).join(' ')} ${fullItem.tags.join(' ')}`
        : '';
      const haystack = `${item.title} ${item.shortDesc} ${item.tag} ${CATEGORY_LABELS[item.category]} ${extraText}`.toLocaleLowerCase('tr-TR');
      return haystack.includes(q);
    });
  }, [activeFilter, searchQuery]);

  const handleBackToList = () => {
    setSelectedEmergencyId(null);
    updateHashRoute('arac', 'emergencies');
  };

  // Standart 10 aşamalı Anestezi Acili protokolü
  if (selectedEmergencyId && ANESTHESIA_EMERGENCIES_DATA[selectedEmergencyId]) {
    return (
      <EmergencyProtocolDetailView
        key={selectedEmergencyId}
        protocol={ANESTHESIA_EMERGENCIES_DATA[selectedEmergencyId]}
        isDark={isDark}
        onBack={handleBackToList}
      />
    );
  }

  // İntraoperatif Monitörizasyon & Ventilatör Kriz / Sorun Giderme Protokolü
  const selectedTroubleshootingItem = selectedEmergencyId
    ? EMERGENCY_TROUBLESHOOTING_ITEMS.find((item) => item.id === selectedEmergencyId)
    : undefined;

  if (selectedTroubleshootingItem) {
    return (
      <EmergencyTroubleshootingDetailView
        key={selectedTroubleshootingItem.id}
        item={selectedTroubleshootingItem}
        isDark={isDark}
        onBack={handleBackToList}
      />
    );
  }

  const handleSelectEmergency = (id: string) => {
    if (
      ANESTHESIA_EMERGENCIES_DATA[id] ||
      EMERGENCY_TROUBLESHOOTING_ITEMS.some((item) => item.id === id)
    ) {
      setSelectedEmergencyId(id);
      updateHashRoute('arac', `emergencies&sub=${id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const item = EMERGENCY_PREVIEWS.find(p => p.id === id);
      setFeedbackNotice(`"${item?.title || id}" acil senaryosu, hazırladığımız şablona göre sıradaki adımda eklenecektir.`);
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
      feedbackTimerRef.current = window.setTimeout(() => setFeedbackNotice(null), 5000);
    }
  };

  const totalVisible = filteredEmergencies.length + filteredTroubleshooting.length;

  return (
    <div className="space-y-6">
      {/* 1. Executive Emergency Header Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-red-500/30' 
          : 'bg-gradient-to-r from-red-50 via-white to-rose-50 border-red-200 shadow-xs'
      }`}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              KLİNİK KRİZ YÖNETİMİ
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold">
              Perioperatif Hızlı Karar &amp; Eylem Kılavuzları
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
            <span>Anestezi Acilleri</span>
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Ameliyathanede ve derlenme odasında saniyelerin kritik olduğu <strong>klinik acil senaryoları</strong> sistemlere göre filtreleyebilir veya <strong>intraoperatif monitör &amp; ventilatör sorun giderme</strong> algoritmalarına doğrudan ulaşabilirsiniz.
          </p>
        </div>
      </div>

      {/* 2. Classification Filter Bar & Quick Search */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Anestezi acili sınıflandırması"
            className="flex flex-wrap items-center gap-1.5"
          >
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-red-600 border-red-600 text-white'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`font-mono tabular-nums text-[11px] ${
                      isActive
                        ? 'text-red-100'
                        : isDark
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search
              className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            />
            <input
              type="search"
              aria-label="Anestezi acilleri, belirti veya ilaç ara"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Acil, belirti veya ilaç ara..."
              className={`w-full pl-8 pr-8 py-2 min-h-[38px] text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-red-500/40 ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Aramayı temizle"
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Temporary Feedback Notice if user clicks a planned emergency */}
      {feedbackNotice && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs font-semibold animate-in fade-in duration-200 ${
          isDark ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900 shadow-2xs'
        }`}>
          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* Empty Search/Filter Result */}
      {totalVisible === 0 && (
        <div className={`p-8 rounded-2xl border border-dashed text-center space-y-3 ${
          isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
        }`}>
          <p className="text-sm font-semibold">
            Arama veya filtre kriterine uyan acil protokol bulunamadı.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
          >
            <span>Tüm Acilleri Göster</span>
          </button>
        </div>
      )}

      {/* 3. Emergency Scenarios Cards Grid */}
      {filteredEmergencies.length > 0 && (
        <div className={`p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
            <div>
              <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Layers className="w-4 h-4 text-red-500" />
                <span>1. Klinik Acil Senaryo Protokolleri (10 Aşamalı Şablon)</span>
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Standart 10 aşamalı klinik kriz protokolleri ve hastanın kilosuna göre dinamik ilaç/müdahale hesaplayıcıları.
              </p>
            </div>
            
            <span className={`text-[11px] font-mono tabular-nums self-start sm:self-auto ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {filteredEmergencies.length} / {EMERGENCY_PREVIEWS.length} Klinik Acil
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmergencies.map((item) => {
              const Icon = item.icon;
              const isReady = item.isReady;
              const categoryTitle = CATEGORY_LABELS[item.category];

              return (
                <PortalLink
                  key={item.id}
                  href={isReady ? buildHashHref('arac', 'emergencies', item.id) : undefined}
                  disabled={!isReady}
                  onNavigate={() => handleSelectEmergency(item.id)}
                  className={`block p-4 rounded-xl border relative overflow-hidden transition-all group ${
                    isReady ? 'cursor-pointer' : 'cursor-not-allowed'
                  } ${
                    isReady
                      ? isDark 
                        ? 'bg-gradient-to-b from-red-950/30 to-slate-800/80 border-red-500/50 hover:border-red-400 shadow-sm hover:shadow-red-950/40' 
                        : 'bg-gradient-to-b from-red-50/70 to-white border-red-300 hover:border-red-400 hover:shadow-md'
                      : isDark 
                        ? 'bg-slate-800/40 border-slate-700/70 hover:border-slate-600' 
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isReady 
                        ? 'bg-red-500 text-white shadow-xs' 
                        : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[11px] font-medium text-right ${
                      isReady
                        ? 'text-red-600 dark:text-red-300'
                        : isDark
                          ? 'text-slate-400'
                          : 'text-slate-600'
                    }`}>
                      {categoryTitle}
                    </span>
                  </div>

                  <h5 className={`text-sm font-bold mb-1.5 transition-colors ${
                    isReady
                      ? isDark ? 'text-white group-hover:text-red-300' : 'text-slate-900 group-hover:text-red-600'
                      : isDark ? 'text-slate-200 group-hover:text-slate-100' : 'text-slate-800'
                  }`}>
                    {item.title}
                  </h5>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {item.shortDesc}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                    <span className={`font-mono text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {item.footerNote || (isReady ? '10 Aşamalı Protokol' : 'Şablona Göre Hazırlanacak')}
                    </span>
                    
                    {isReady ? (
                      <span className="font-bold text-xs inline-flex items-center gap-1 text-red-600 dark:text-red-400 group-hover:translate-x-0.5 transition-transform">
                        <span>Protokolü Aç</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className={`font-semibold inline-flex items-center gap-1 ${
                        isDark ? 'text-amber-400/90' : 'text-amber-600'
                      }`}>
                        Sırada
                      </span>
                    )}
                  </div>
                </PortalLink>
              );
            })}
          </div>

          {/* Informative Guidance Footer */}
          <div className={`mt-5 p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
            isDark 
              ? 'bg-slate-800/60 border-slate-700/80 text-slate-300' 
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <HelpCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>
              Tüm 14 klinik acil senaryo; <strong>Hava Yolu Acilleri</strong>, <strong>Kardiyovasküler &amp; Kanama</strong> ve <strong>Metabolik, Toksik &amp; Alerjik</strong> grupları altında 10 aşamalı şablon ve kilo bazlı doz hesaplayıcılarıyla kullanıma hazırdır.
            </span>
          </div>
        </div>
      )}

      {/* 4. İntraoperatif Troubleshooting Meseleleri (Klinik Hastalık Şemasından Ayrı — Teal/Slate Tema) */}
      {filteredTroubleshooting.length > 0 && (
        <div className={`p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
            <div>
              <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                <Wrench className="w-4 h-4 text-teal-500" />
                <span>2. İntraoperatif Troubleshooting Meseleleri (Monitör, Devre, Ventilatör &amp; Derlenme)</span>
              </h4>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Spesifik bir klinik tanı değil; intraoperatif parametre sapmalarında İlk 60 Saniye, dalga formu ve sistematik teknik/fizyolojik ayırıcı tanı algoritmaları.
              </p>
            </div>

            <span className={`text-[11px] font-mono tabular-nums self-start sm:self-auto ${
              isDark ? 'text-teal-300' : 'text-teal-700'
            }`}>
              {filteredTroubleshooting.length} / {TROUBLESHOOTING_PREVIEWS.length} Sorun Giderme
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTroubleshooting.map((item) => {
              const Icon = item.icon;
              return (
                <PortalLink
                  key={item.id}
                  href={buildHashHref('arac', 'emergencies', item.id)}
                  onNavigate={() => handleSelectEmergency(item.id)}
                  className={`block p-4 rounded-xl border relative overflow-hidden transition-all group cursor-pointer ${
                    isDark
                      ? 'bg-gradient-to-b from-teal-950/20 to-slate-800/70 border-teal-500/35 hover:border-teal-400 shadow-sm'
                      : 'bg-gradient-to-b from-teal-50/60 to-white border-teal-200 hover:border-teal-400 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-teal-600 text-white shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-[11px] font-medium text-right ${
                        isDark ? 'text-teal-300' : 'text-teal-700'
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h5
                    className={`text-sm font-bold mb-1.5 transition-colors ${
                      isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-700'
                    }`}
                  >
                    {item.title}
                  </h5>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {item.shortDesc}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                    <span className={`font-mono text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {item.footerNote}
                    </span>
                    <span className="font-bold text-xs inline-flex items-center gap-1 text-teal-600 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
                      <span>Algoritmayı Aç</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </PortalLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

