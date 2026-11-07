import React from 'react';
import { 
  Wrench, 
  Wind, 
  Activity, 
  Sliders, 
  Syringe, 
  Thermometer, 
  Sparkles,
  Layers,
  Inbox
} from 'lucide-react';
import { 
  TROUBLESHOOTING_CATEGORIES, 
  TROUBLESHOOTING_ITEMS 
} from '../../data/troubleshootingData';

interface Props {
  isDark: boolean;
  initialItemId?: string | null;
}

export const AnesthesiaTroubleshootingWorkspace: React.FC<Props> = ({ isDark }) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'ventilator': return <Wind className="w-4 h-4" />;
      case 'hemodynamics': return <Activity className="w-4 h-4" />;
      case 'monitoring': return <Sliders className="w-4 h-4" />;
      case 'drugs-fluids': return <Syringe className="w-4 h-4" />;
      case 'metabolic': return <Thermometer className="w-4 h-4" />;
      default: return <Wrench className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <Wrench className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Anestezi Troubleshooting
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-300 font-medium border border-teal-500/20">
                Klinik Sorun Giderme
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Ameliyathanede karşılaşılan ani ventilatör alarmları, monitörizasyon artefaktları, hemodinamik krizler ve anestezi arızalarında ilk 60 saniye algoritmik ayrıcı tanı ve hızlı müdahale aracı.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span>{TROUBLESHOOTING_ITEMS.length} Kayıtlı Protokol</span>
            <span aria-hidden="true">·</span>
            <span>Aşamalı Doldurma Modu</span>
          </div>
        </div>
      </div>

      {/* Pristine Empty State Container */}
      <div className={`p-10 sm:p-14 rounded-2xl border text-center flex flex-col items-center justify-center space-y-4 ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="p-4 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
          <Inbox className="w-8 h-8" />
        </div>

        <div className="max-w-md space-y-1.5">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            İçerik Hazırlığı Başlatıldı
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Bu bölüm tamamen boş olarak oluşturulmuştur. Klinik ihtiyaçlar, asistan geri bildirimleri ve ameliyathane vaka pratikleri doğrultusunda algoritmalar adım adım buraya eklenecektir.
          </p>
        </div>

        {/* Hazırlanan Kategori Çerçevesi */}
        <div className="pt-6 w-full max-w-3xl border-t border-slate-200 dark:border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Hazır Kategori Altyapısı
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {TROUBLESHOOTING_CATEGORIES.map(cat => (
              <div
                key={cat.id}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between space-y-1.5 transition-colors ${
                  isDark ? 'bg-slate-850/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 w-fit">
                  {getCategoryIcon(cat.id)}
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">
                    {cat.shortName}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {cat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
