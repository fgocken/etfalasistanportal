import React, { useState, useEffect } from 'react';
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
  Wrench
} from 'lucide-react';
import { ANESTHESIA_EMERGENCIES_DATA } from '../../data/emergenciesData';
import { EMERGENCY_TROUBLESHOOTING_ITEMS } from '../../data/emergenciesTroubleshootingData';
import { EmergencyProtocolDetailView } from './EmergencyProtocolDetailView';
import { EmergencyTroubleshootingDetailView } from './EmergencyTroubleshootingDetailView';
import { updateHashRoute } from '../../utils/deepLink';

interface AnesthesiaEmergenciesViewProps {
  isDark: boolean;
  initialEmergencyId?: string | null;
}

interface EmergencyCategoryPreview {
  id: string;
  title: string;
  shortDesc: string;
  tag: string;
  footerNote?: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: 'rose' | 'amber' | 'red' | 'purple' | 'cyan' | 'emerald';
  isReady?: boolean;
}

const EMERGENCY_PREVIEWS: EmergencyCategoryPreview[] = [
  {
    id: 'mh',
    title: 'Malign Hipertermi (MH)',
    shortDesc: 'RYR1 kalsiyum fırtınası, Dantrolen dozu (2.5 mg/kg), aktif soğutma ve Larach tanı skoru.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Flame,
    accentColor: 'red',
    isReady: true
  },
  {
    id: 'pe',
    title: 'Pulmoner Embolizm (PE / PTE)',
    shortDesc: 'Masif ve submasif PE, ani EtCO2 çöküşü, akut sağ kalp (RV) dekompansasyonu, hedefe yönelik sıvı kısıtlaması, Alteplase/Tenecteplase trombolizi, UFH ve ECMO.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Activity,
    accentColor: 'red',
    isReady: true
  },
  {
    id: 'vae',
    title: 'İntra-operatif Hava Embolisi (VAE / PAE)',
    shortDesc: 'Venöz ve paradoksal hava embolisi, Durant manevrası (sol lateral Trendelenburg), N2O derhal kapatma, CVC hava aspirasyonu, PEEP yasağı ve HBOT.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Wind,
    accentColor: 'cyan',
    isReady: true
  },
  {
    id: 'bronchospasm',
    title: 'İntraoperatif Akut Bronkospazm',
    shortDesc: 'Hava yolu direnci fırtınası, yüksek Ppeak, köpekbalığı sırtı EtCO2, Salbutamol/Mg/Adrenalin ve ventilatör optimizasyonu.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Wind,
    accentColor: 'amber',
    isReady: true
  },
  {
    id: 'laryngospasm',
    title: 'Perioperatif Akut Laringospazm',
    shortDesc: 'Larson çentik manevrası, CPAP, sub-paralitik Süksinilkolin/Propofol ve Negatif Basınçlı Pulmoner Ödem (NPPE) yönetimi.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Activity,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'anaphylaxis',
    title: 'Şiddetli Anafilaktik Şok & İntraoperatif Anafilaksi',
    shortDesc: 'Ring & Messmer Grade 2-4 reaksiyon, Adrenalin kademeli titrasyonu (IV/IM), masif kristaloid volüm, kolloid yasağı, Triptaz tanı protokolü ve Sugammadeks kurtarma dozu.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Syringe,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'acls',
    title: 'Perioperatif Kardiyak Arrest & ACLS',
    shortDesc: 'Şoklanabilir (VF/pVT) ve şoklanamaz (Asistoli/PEA) algoritmaları, EtCO2/arteriyel KPR hedefleri, perioperatif 5H-5T, prone/gebelik KPR ve ROSC bakımı.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: HeartCrack,
    accentColor: 'red',
    isReady: true
  },
  {
    id: 'last',
    title: 'LAST (Lokal Anestezik Sistemik Toksisitesi)',
    shortDesc: 'ASRA 2020 %20 Lipid Emülsiyon (İntralipid) kurtarma, modifiye düşük doz adrenalin (≤1 mcg/kg), nöbet kontrolü ve LA güvenli doz limitleri.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Activity,
    accentColor: 'purple',
    isReady: true
  },
  {
    id: 'airway-crisis',
    title: 'Ventile Edilemiyor - Entübe Edilemiyor (CICO)',
    shortDesc: 'Neşter-buji-tüp krikotiroidotomi, DAS 2015 Plan D eFONA, Sugammadeks 16 mg/kg kurtarma dozu ve anoksik arrest önleme.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: AlertOctagon,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'airway-obstruction',
    title: 'Akut Hava Yolu Obstrüksiyonu',
    shortDesc: 'Postoperatif boyun hematomu yatak başı dikiş açma, yabancı cisim ekstraksiyonu, ETT tıkanması ve laringeal ödem yönetimi.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: ShieldAlert,
    accentColor: 'rose',
    isReady: true
  },
  {
    id: 'aspiration',
    title: 'Pulmoner Aspirasyon (Mendelson)',
    shortDesc: 'Asit ve partikül aspirasyonunda anında Trendelenburg, ETT izolasyonu, PEEP, lavaj yasağı ve gastrik USG.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: AlertTriangle,
    accentColor: 'amber',
    isReady: true
  },
  {
    id: 'mtp',
    title: 'Masif Transfüzyon Protokolü (MTP)',
    shortDesc: '1:1:1 TDP-ES-Trombosit dengeli resüsitasyonu, ABC skoru, ROTEM/TEG hedefli fibrinojen, ilk 3 saat TXA, her 4 ünitede kalsiyum ve Ölümcül Dörtlü yönetimi.',
    tag: '10 Aşamalı Protokol Hazır',
    icon: Activity,
    accentColor: 'rose',
    isReady: true
  }
];

interface TroubleshootingPreview {
  id: string;
  title: string;
  shortDesc: string;
  tag: string;
  footerNote: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TROUBLESHOOTING_PREVIEWS: TroubleshootingPreview[] = [
  {
    id: 'etco2-elevation',
    title: 'İntraoperatif End-Tidal Karbondioksit (EtCO₂) Yükselmesi',
    shortDesc: 'EtCO₂ > 45 mmHg hiperkapni, FiCO₂ > 0 yeniden soluma (soda lime / valf arızası), shark-fin & kurar çentiği kapnogramı, laparoskopik CO₂ emilimi ve Malign Hipertermi erken taraması.',
    tag: 'Sorun Giderme · EtCO₂ ↑',
    footerNote: 'İlk 60 sn · 4 Kapnogram & 9 Neden',
    icon: Sliders
  },
  {
    id: 'etco2-decrease',
    title: 'İntraoperatif End-Tidal Karbondioksit (EtCO₂) Azalması',
    shortDesc: 'Ani EtCO₂ düşüşü veya flatline: Kardiyak arrest, Masif PE/VAE, özofageal entübasyon (NAP4), devre ayrılması, tansiyon pnömotoraks, hiperventilasyon ve hipotermi ayrımı.',
    tag: 'Sorun Giderme · EtCO₂ ↓',
    footerNote: 'İlk 60 sn · 4 Kapnogram & 9 Neden',
    icon: Activity
  },
  {
    id: 'fico2-elevation',
    title: 'İntraoperatif Dönemde FiCO₂ Yükselmesi (Yeniden Soluma)',
    shortDesc: 'İnspiratuvar CO₂ > 0–2 mmHg: Tükenmiş soda lime, tek yönlü ekspiratuvar/inspiratuvar valf takılması, kanister kanalizasyonu/bypass, Mapleson/Bain düşük FGF ve sıfır kalibrasyon kayması.',
    tag: 'Sorun Giderme · FiCO₂ ↑',
    footerNote: 'İlk 60 sn · 4 Kapnogram & 8 Neden',
    icon: Wind
  },
  {
    id: 'ppeak-elevation',
    title: 'İntraoperatif Dönemde Tepe Hava Yolu Basıncı (Ppeak) Yükselmesi',
    shortDesc: 'Ppeak > 35–40 cmH₂O: Basınç-zaman eğrisi ve Ppeak − Pplat gradienti ile rezistans (ETT kink, sekresyon, bronkospazm, HME tıkanıklığı) vs kompliyans (tansiyon pnömotoraks, sağ ana bronş, oto-PEEP) ayrımı.',
    tag: 'Sorun Giderme · Ppeak ↑',
    footerNote: 'İlk 60 sn · Basınç Eğrisi & 10 Neden',
    icon: Wind
  },
  {
    id: 'hypoxemia',
    title: 'İntraoperatif Hipoksemi (Desatürasyon)',
    shortDesc: 'SpO₂ < %90–94: Pleth artefakt & dishemoglobinemi (MetHb/COHb) ayrımı, düşük DO₂/SvO₂, Tek Akciğer Ventilasyonu (OLV — FOB, PEEP, üst akciğer CPAP) ve Hepatopulmoner Sendrom (HPS) yönetimi.',
    tag: 'Sorun Giderme · SpO₂ ↓',
    footerNote: 'İlk 60 sn · 4 Pleth Eğrisi & 12 Neden',
    icon: Activity
  }
];

export const AnesthesiaEmergenciesView: React.FC<AnesthesiaEmergenciesViewProps> = ({ 
  isDark,
  initialEmergencyId 
}) => {
  const [selectedEmergencyId, setSelectedEmergencyId] = useState<string | null>(initialEmergencyId || null);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  useEffect(() => {
    if (initialEmergencyId !== undefined) {
      setSelectedEmergencyId(initialEmergencyId);
    }
  }, [initialEmergencyId]);

  const handleBackToList = () => {
    setSelectedEmergencyId(null);
    updateHashRoute('arac', 'emergencies');
  };

  // Standart 10 aşamalı Anestezi Acili protokolü
  if (selectedEmergencyId && ANESTHESIA_EMERGENCIES_DATA[selectedEmergencyId]) {
    return (
      <EmergencyProtocolDetailView
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
      setFeedbackNotice(`"${item?.title || id}" acil senaryosu, hazırladığımız bu Malign Hipertermi şablonuna göre sıradaki adımda eklenecektir.`);
      setTimeout(() => setFeedbackNotice(null), 5000);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Executive Emergency Header Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border-red-500/30' 
          : 'bg-gradient-to-r from-red-50 via-white to-rose-50 border-red-200 shadow-xs'
      }`}>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              KLİNİK KRİZ YÖNETİMİ
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Perioperatif Hızlı Karar & Eylem Kılavuzları
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
            <span>Anestezi Acilleri</span>
          </h3>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Ameliyathanede ve derlenme odasında saniyelerin kritik olduğu <strong>klinik acil senaryolar</strong> ile alt bölümde yer alan <strong>intraoperatif monitörizasyon ve ventilatör troubleshooting rehberleri</strong>.
          </p>
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


      {/* 3. Emergency Scenarios Cards Grid */}
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
          
          <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md self-start sm:self-auto border ${
            isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            12 Klinik Acil Aktif (MH, PE, Hava Embolisi, LAST, Anafilaksi, ACLS, Bronkospazm, Laringospazm, CICO, Obstrüksiyon, Aspirasyon, MTP)
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_PREVIEWS.map((item) => {
            const Icon = item.icon;
            const isReady = item.isReady;

            return (
              <div
                key={item.id}
                onClick={() => handleSelectEmergency(item.id)}
                className={`p-4 rounded-xl border relative overflow-hidden transition-all group cursor-pointer ${
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
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    isReady
                      ? 'bg-red-500/20 border-red-500/40 text-red-600 dark:text-red-300 font-bold animate-pulse'
                      : isDark 
                        ? 'bg-slate-800 border-slate-700 text-slate-400' 
                        : 'bg-white border-slate-200 text-slate-600'
                  }`}>
                    {item.tag}
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
                    {item.footerNote || (isReady ? '10 Bölümlü Protokol' : 'Şablona Göre Hazırlanacak')}
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
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Sırada
                    </span>
                  )}
                </div>
              </div>
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
            <strong>Malign Hipertermi</strong>, <strong>PE</strong>, <strong>Hava Embolisi</strong>, <strong>LAST</strong>, <strong>Anafilaktik Şok</strong>, <strong>Perioperatif ACLS</strong>, <strong>Bronkospazm</strong>, <strong>Laringospazm</strong>, <strong>CICO</strong>, <strong>Akut Hava Yolu Obstrüksiyonu</strong>, <strong>Pulmoner Aspirasyon</strong> ve <strong>Masif Transfüzyon Protokolü (MTP)</strong> dahil tüm 12 klinik acil senaryo standart 10 aşamalı şablon ve kilo bazlı doz hesaplayıcılarıyla kullanıma hazırdır.
          </span>
        </div>
      </div>

      {/* 4. İntraoperatif Troubleshooting Meseleleri (Klinik Hastalık Şemasından Ayrı — Teal/Slate Tema) */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div>
            <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Wrench className="w-4 h-4 text-teal-500" />
              <span>2. İntraoperatif Troubleshooting Meseleleri (Monitör, Devre &amp; Ventilatör)</span>
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Spesifik bir klinik tanı değil; intraoperatif parametre sapmalarında İlk 60 Saniye, dalga formu ve sistematik teknik/fizyolojik ayırıcı tanı algoritmaları.
            </p>
          </div>

          <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md self-start sm:self-auto border ${
            isDark ? 'bg-teal-950/30 text-teal-300 border-teal-500/30' : 'bg-teal-50 text-teal-700 border-teal-200'
          }`}>
            5 Troubleshooting Konusu · İlk 60 sn &amp; Dalga Formu
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TROUBLESHOOTING_PREVIEWS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleSelectEmergency(item.id)}
                className={`p-4 rounded-xl border relative overflow-hidden transition-all group cursor-pointer ${
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
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                      isDark
                        ? 'bg-teal-500/15 border-teal-500/35 text-teal-300'
                        : 'bg-teal-50 border-teal-200 text-teal-700'
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
