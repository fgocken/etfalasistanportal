import React, { useState } from 'react';
import { ShieldCheck, Compass, Activity, Droplet, AlertTriangle } from 'lucide-react';
import { UsgCvcModule } from './UsgCvcModule';

interface VascularAccessWorkspaceProps {
  isDark: boolean;
}

type VascularSubModuleId = 'usg-cvc' | 'arterial' | 'diva' | 'clabsi';

interface SubModuleTab {
  id: VascularSubModuleId;
  index: string;
  title: string;
  subtitle: string;
  ready: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const SUB_MODULES: SubModuleTab[] = [
  {
    id: 'usg-cvc',
    index: '01',
    title: 'USG Eşliğinde SVK',
    subtitle: 'İJV · Subklavyen · Femoral',
    ready: true,
    icon: Compass,
  },
  {
    id: 'arterial',
    index: '02',
    title: 'İnvaziv Arteriyel Kanülasyon',
    subtitle: 'Radiyal · Femoral · Aksiller',
    ready: false,
    icon: Activity,
  },
  {
    id: 'diva',
    index: '03',
    title: 'Zor Periferik Erişim (DIVA)',
    subtitle: 'USG Periferik · Orta Hat · İO',
    ready: false,
    icon: Droplet,
  },
  {
    id: 'clabsi',
    index: '04',
    title: 'CLABSI & Komplikasyonlar',
    subtitle: 'Steril Bariyer · Bakım Paketi',
    ready: false,
    icon: AlertTriangle,
  },
];

export const VascularAccessWorkspace: React.FC<VascularAccessWorkspaceProps> = ({ isDark }) => {
  const [activeSubModule, setActiveSubModule] = useState<VascularSubModuleId>('usg-cvc');
  const currentTab = SUB_MODULES.find((m) => m.id === activeSubModule) || SUB_MODULES[0];

  return (
    <div className="space-y-6">
      {/* Üst Başlık ve Alt Modül Seçici */}
      <section
        className={`rounded-xl border p-5 sm:p-6 transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3.5">
            <div
              className={`p-2.5 rounded-lg shrink-0 ${
                isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'
              }`}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Perioperatif Girişimsel Standartlar</span>
                <span aria-hidden="true">·</span>
                <span>Association of Anaesthetists 2025 · ASA 2020 · ESAIC PERSEUS</span>
                <span aria-hidden="true">·</span>
                <span className={isDark ? 'text-sky-400 font-medium' : 'text-sky-700 font-medium'}>
                  Modül 01 Aktif
                </span>
              </div>
              <h2
                className={`text-xl font-bold tracking-tight text-balance ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Güvenli Vasküler Erişim
              </h2>
              <p
                className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
              >
                USG eşliğinde santral venöz kateterizasyon (İJV, Subklavyen/Aksiller, Femoral),
                ömür boyu damar koruma ve Kateter/Ven oranı hesabı, Peres derinlik formülü,
                LocSSIPs/Seldinger 8 adımlı güvenlik protokolü ve kriz yönetimi standartları.
              </p>
            </div>
          </div>
        </div>

        {/* Alt Modül Navigasyon Sekmeleri */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SUB_MODULES.map((mod) => {
            const Icon = mod.icon;
            const isSelected = activeSubModule === mod.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setActiveSubModule(mod.id)}
                className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex items-start gap-2.5 ${
                  isSelected
                    ? isDark
                      ? 'bg-sky-950/40 border-sky-500/60 text-white'
                      : 'bg-sky-50 border-sky-400 text-slate-900'
                    : isDark
                      ? 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      : 'bg-slate-50/70 border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    isSelected
                      ? isDark
                        ? 'bg-sky-500/20 text-sky-400'
                        : 'bg-white text-sky-700 border border-sky-200'
                      : isDark
                        ? 'bg-slate-900 text-slate-500'
                        : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono tabular-nums">
                    <span className={isSelected ? 'text-sky-500 font-bold' : 'text-slate-400'}>
                      {mod.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className={mod.ready ? 'text-emerald-500 font-semibold' : 'text-slate-400'}>
                      {mod.ready ? 'Aktif' : 'Yakında'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold truncate mt-0.5">{mod.title}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {mod.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Aktif Alt Modül İçeriği */}
      {activeSubModule === 'usg-cvc' ? (
        <UsgCvcModule isDark={isDark} />
      ) : (
        <section
          className={`rounded-xl border p-6 space-y-3 ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-200'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
        >
          <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
            {currentTab.index} · {currentTab.subtitle}
          </div>
          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {currentTab.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Bu alt modülün klinik içeriği sıradaki güncellemede eklenecektir. Şu anda{' '}
            <strong>01 · USG Eşliğinde SVK</strong> modülünü tam kapsamlı olarak kullanabilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => setActiveSubModule('usg-cvc')}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-700 text-white transition-colors cursor-pointer"
          >
            USG Eşliğinde SVK Modülüne Dön
          </button>
        </section>
      )}
    </div>
  );
};
