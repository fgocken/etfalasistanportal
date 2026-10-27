import React from 'react';
import { 
  AlertOctagon, 
  Flame, 
  HeartCrack, 
  Activity, 
  ShieldAlert, 
  Stethoscope, 
  Clock, 
  Sparkles, 
  AlertCircle,
  Syringe,
  Wind
} from 'lucide-react';

interface AnesthesiaEmergenciesViewProps {
  isDark: boolean;
}

interface EmergencyCategoryPreview {
  id: string;
  title: string;
  shortDesc: string;
  tag: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: 'rose' | 'amber' | 'red' | 'purple' | 'cyan' | 'emerald';
}

const EMERGENCY_PREVIEWS: EmergencyCategoryPreview[] = [
  {
    id: 'mh',
    title: 'Malign Hipertermi (MH)',
    shortDesc: 'Dantrolen hazırlığı, tetikleyici kesilmesi, hiperventilasyon ve soğutma protokolü.',
    tag: 'Ryanodex / Dantrolen',
    icon: Flame,
    accentColor: 'red'
  },
  {
    id: 'acls',
    title: 'Perioperatif Kardiyak Arrest & ACLS',
    shortDesc: 'Şoklanabilir (VF/pVT) ve şoklanamaz (Asistoli/PEA) ritimler, arrest algoritması.',
    tag: 'AHA / ERC 2025',
    icon: HeartCrack,
    accentColor: 'rose'
  },
  {
    id: 'anaphylaxis',
    title: 'Şiddetli Anaflaksi & Bronkospazm',
    shortDesc: 'İntravenöz/intramüsküler Adrenalin titrasyonu, sıvı resüsitasyonu ve hava yolu yönetimi.',
    tag: 'Grade 3-4 Reaksiyon',
    icon: Wind,
    accentColor: 'amber'
  },
  {
    id: 'last',
    title: 'LAST (Lokal Anestezik Sistemik Toksisitesi)',
    shortDesc: '%20 İntralipid bolus & infüzyon kurtarma protokolü ve nörotoksisite basamakları.',
    tag: 'ASRA Kılavuzu',
    icon: Syringe,
    accentColor: 'purple'
  },
  {
    id: 'airway-crisis',
    title: 'CICO (Can\'t Intubate, Can\'t Oxygenate)',
    shortDesc: 'Acil krikotiroidotomi, cerrahi havayolu ve 3-adımlı acil oksijenizasyon algoritması.',
    tag: 'DAS Standartları',
    icon: AlertOctagon,
    accentColor: 'red'
  },
  {
    id: 'mtp',
    title: 'Masif Transfüzyon Protokolü (MTP)',
    shortDesc: '1:1:1 TDP-ES-Trombosit transfüzyon oranı, kalsiyum ve traneksamik asit zamanlaması.',
    tag: 'Hemostaz & TEG/ROTEM',
    icon: Activity,
    accentColor: 'rose'
  }
];

export const AnesthesiaEmergenciesView: React.FC<AnesthesiaEmergenciesViewProps> = ({ isDark }) => {
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

          {/* Status Note */}
          <div className="pt-1.5 flex items-center">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] ${
              isDark ? 'bg-slate-800/50 border-slate-700/60 text-slate-400' : 'bg-slate-100/80 border-slate-200 text-slate-600'
            }`}>
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Modül Tasarımı & İçerik Entegrasyonu Devam Ediyor</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Intelligent Category Blueprint Grid (Elegant Placeholder State) */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
          <div>
            <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Sparkles className="w-4 h-4 text-red-500" />
              <span>Acil Senaryo Protokolleri</span>
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Klinik araç modülü için planlanan acil kriz protokolleri ve karar destek blokları.
            </p>
          </div>
          
          <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md self-start sm:self-auto border ${
            isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-50 text-slate-600 border-slate-200'
          }`}>
            6 Protokol Planlandı
          </span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMERGENCY_PREVIEWS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border relative overflow-hidden transition-all group ${
                  isDark 
                    ? 'bg-slate-800/40 border-slate-700/70 hover:border-red-500/40' 
                    : 'bg-slate-50/70 border-slate-200 hover:border-red-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isDark ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-semibold ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-slate-400' 
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}>
                    {item.tag}
                  </span>
                </div>

                <h5 className={`text-sm font-bold mb-1.5 transition-colors ${
                  isDark ? 'text-slate-200 group-hover:text-red-300' : 'text-slate-800 group-hover:text-red-700'
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
                    Protokol Yapısı
                  </span>
                  <span className={`font-semibold inline-flex items-center gap-1 ${
                    isDark ? 'text-amber-400/90' : 'text-amber-600'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    İçerik Bekleniyor
                  </span>
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
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>
            Bu bölüm yeni klinik araç olarak eklendi. Gelecek adımda eklenmesini istediğiniz acil kriz algoritmalarını veya ilaç protokollerini bildirebilirsiniz.
          </span>
        </div>
      </div>
    </div>
  );
};
