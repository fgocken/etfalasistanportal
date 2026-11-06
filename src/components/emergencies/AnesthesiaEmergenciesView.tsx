import React, { useState } from 'react';
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
  HelpCircle
} from 'lucide-react';
import { ANESTHESIA_EMERGENCIES_DATA } from '../../data/emergenciesData';
import { EmergencyProtocolDetailView } from './EmergencyProtocolDetailView';

interface AnesthesiaEmergenciesViewProps {
  isDark: boolean;
  initialEmergencyId?: string | null;
}

interface EmergencyCategoryPreview {
  id: string;
  title: string;
  shortDesc: string;
  tag: string;
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
    shortDesc: 'Şoklanabilir (VF/pVT) ve şoklanamaz (Asistoli/PEA) ritimler, arrest algoritması.',
    tag: 'AHA / ERC 2025 (Sıradaki)',
    icon: HeartCrack,
    accentColor: 'red',
    isReady: false
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
    shortDesc: '1:1:1 TDP-ES-Trombosit transfüzyon oranı, kalsiyum ve traneksamik asit zamanlaması.',
    tag: 'Hemostaz & TEG/ROTEM (Sıradaki)',
    icon: Activity,
    accentColor: 'rose',
    isReady: false
  }
];

export const AnesthesiaEmergenciesView: React.FC<AnesthesiaEmergenciesViewProps> = ({ 
  isDark,
  initialEmergencyId 
}) => {
  const [selectedEmergencyId, setSelectedEmergencyId] = useState<string | null>(initialEmergencyId || null);
  const [feedbackNotice, setFeedbackNotice] = useState<string | null>(null);

  // If an active protocol is selected (e.g. 'mh')
  if (selectedEmergencyId && ANESTHESIA_EMERGENCIES_DATA[selectedEmergencyId]) {
    return (
      <EmergencyProtocolDetailView
        protocol={ANESTHESIA_EMERGENCIES_DATA[selectedEmergencyId]}
        isDark={isDark}
        onBack={() => setSelectedEmergencyId(null)}
      />
    );
  }

  const handleSelectEmergency = (id: string) => {
    if (ANESTHESIA_EMERGENCIES_DATA[id]) {
      setSelectedEmergencyId(id);
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
            Ameliyathanede ve derlenme odasında saniyelerin kritik olduğu acil senaryolarda kılavuz odaklı tanı kriterleri, dozaj hesaplayıcıları ve adım adım eylem algoritmaları.
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
              <span>Acil Senaryo Protokolleri</span>
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Aşağıdaki acil senaryo kartlarından hazır olanı açabilir veya planlananları inceleyebilirsiniz.
            </p>
          </div>
          
          <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md self-start sm:self-auto border ${
            isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            10 Acil Senaryo Hazır (MH, PE, Hava Embolisi, LAST, Anafilaksi, Bronkospazm, Laringospazm, CICO, Obstrüksiyon, Aspirasyon) · 2 Senaryo Sırada (ACLS, MTP)
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
                    {isReady ? '10 Bölümlü Protokol' : 'Şablona Göre Hazırlanacak'}
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
            <strong>Malign Hipertermi</strong>, <strong>Bronkospazm</strong>, <strong>Laringospazm</strong>, <strong>CICO</strong>, <strong>Akut Hava Yolu Obstrüksiyonu</strong> ve <strong>Pulmoner Aspirasyon</strong> protokolleri hazırlandı. Kalan 3 acil durum (ACLS, Anafilaktik Şok, LAST, MTP) aynı standart 10 aşamalı şablon mimarisiyle sırayla eklenecektir.
          </span>
        </div>
      </div>
    </div>
  );
};
