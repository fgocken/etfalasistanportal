import React, { useState } from 'react';
import { 
  Activity, 
  ChevronRight, 
  Heart, 
  FileText, 
  Scale, 
  Layers, 
  Calculator, 
  Wind, 
  ShieldAlert, 
  Sliders, 
  ArrowRight,
  Info
} from 'lucide-react';
import { IcuAdmissionCriteriaView, IcuCriteriaTabType } from './IcuAdmissionCriteriaView';

interface IcuWorkspaceProps {
  isDark: boolean;
}

type IcuSubView = 'hub' | 'admission_criteria' | 'scoring';

export const IcuWorkspace: React.FC<IcuWorkspaceProps> = ({ isDark }) => {
  const [currentView, setCurrentView] = useState<IcuSubView>('hub');
  const [targetTab, setTargetTab] = useState<IcuCriteriaTabType>('priority');

  const openApp = (view: 'admission_criteria' | 'scoring', tab: IcuCriteriaTabType = 'priority') => {
    setTargetTab(tab);
    setCurrentView(view);
  };

  if (currentView !== 'hub') {
    return (
      <IcuAdmissionCriteriaView
        isDark={isDark}
        initialTab={targetTab}
        onBack={() => setCurrentView('hub')}
      />
    );
  }

  return (
    <div className={`w-full rounded-2xl border flex flex-col shadow-sm transition-all overflow-hidden ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Header */}
      <div className={`p-5 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDark ? 'bg-slate-800/80 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-800'
          }`}>
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black tracking-tight">
                Yoğun Bakım Ünitesi (YBÜ)
              </h2>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                isDark ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                Klinik Araçlar & Protokoller
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Şişli Hamidiye Etfal EAH Anestezi & Reanimasyon Kliniği Yoğun Bakım Uygulamaları
            </p>
          </div>
        </div>
      </div>

      {/* Cards Catalog */}
      <div className="p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Yoğun Bakım Uygulama Kataloğu
            </h3>
            <p className="text-xs text-slate-500">
              Kullanmak istediğiniz yoğun bakım klinik aracını aşağıdan seçiniz
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Yoğun Bakım Endikasyonu (Kabul Kriterleri) */}
          <div 
            onClick={() => openApp('admission_criteria', 'priority')}
            className={`group rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
              isDark 
                ? 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-800 hover:border-rose-500/50' 
                : 'bg-white hover:bg-rose-50/30 border-slate-200 hover:border-rose-300 shadow-2xs'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isDark ? 'bg-rose-500/15 text-rose-400' : 'bg-rose-100 text-rose-700'
                }`}>
                  <Scale className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  SCCM · ESICM · Sağlık Bakanlığı
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  Yoğun Bakım Endikasyonu (Kabul Kriterleri)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Society of Critical Care Medicine (SCCM) ve ESICM rehberliğinde 4 temel model üzerinden yoğun bakım yatış ve triyaj kılavuzu.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span><strong>SCCM Triyaj Modeli:</strong> Öncelik 1, 2, 3 ve 4 (DNR/DNI)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span><strong>Tanı & Organ Sistemleri:</strong> 9 ana sistem detaylı yatış kriterleri</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span><strong>Objektif Parametreler:</strong> Vital, Kan Gazı, Biyokimya kritik eşikleri</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0"></span>
                  <span><strong>Bakım Basamakları:</strong> 1., 2. ve 3. Basamak YBÜ standartları</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                Kabul Kriterlerini İncele
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                4 Model Rehberi
              </span>
            </div>
          </div>

          {/* Card 2: Fizyolojik Skorlama Sistemleri (SOFA & NEWS2) */}
          <div 
            onClick={() => openApp('scoring', 'scoring')}
            className={`group rounded-2xl border p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
              isDark 
                ? 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-800 hover:border-teal-500/50' 
                : 'bg-white hover:bg-teal-50/30 border-slate-200 hover:border-teal-300 shadow-2xs'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                  isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-100 text-teal-700'
                }`}>
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Sepsis-3 · Erken Uyarı
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Fizyolojik Skorlama Sistemleri (SOFA & NEWS2)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                  Sepsis-3 organ disfonksiyonu tayini için SOFA Skoru ve servis hastalarında bozulmayı erken saptayan Ulusal Erken Uyarı Skoru (NEWS2).
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span><strong>SOFA Hesaplayıcı:</strong> 6 Organ sistemi üzerinden organ disfonksiyonu skoru</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span><strong>NEWS2 Kılavuzu:</strong> Skor &ge; 7 acil YBÜ yatışı & resüsitasyon</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0"></span>
                  <span><strong>Mortalite Öngörüsü:</strong> APACHE II/IV ve SAPS 3 klinik özetleri</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                Skorlama Aracını Aç
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                İnteraktif Hesaplama
              </span>
            </div>
          </div>
        </div>

        {/* Info banner at bottom */}
        <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
          isDark ? 'bg-slate-800/30 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}>
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Yoğun bakım kabul kararı, hastanın akut geri dönüşlülük (reversibilite) potansiyeli ve yoğun organ desteği gereksinimi göz önünde bulundurularak sorumlu öğretim üyesi ve yoğun bakım uzmanı konsültasyonu ile kesinleştirilir.
          </span>
        </div>
      </div>
    </div>
  );
};
