import React from 'react';
import { ClipboardCheck, Sparkles, Clock, FileSpreadsheet } from 'lucide-react';

interface PreoperativeEvaluationProps {
  isDark: boolean;
}

export const PreoperativeEvaluation: React.FC<PreoperativeEvaluationProps> = ({ isDark }) => {
  return (
    <div className={`rounded-xl border p-6 space-y-6 transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Header */}
      <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            isDark ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-700 border border-blue-200'
          }`}>
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Preoperatif Değerlendirme
              </h3>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isDark ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200'
              }`}>
                Klinik Modül
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Şişli Etfal EAH Anestezi ve Reanimasyon Kliniği Preoperatif Hasta Değerlendirme Modülü
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg ${
            isDark ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-slate-100 text-slate-600 border border-slate-200'
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>Hazırlık Aşamasında</span>
          </span>
        </div>
      </div>

      {/* Empty State / Blank Placeholder Container */}
      <div className={`min-h-[380px] rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-8 text-center transition-colors ${
        isDark 
          ? 'border-slate-800/80 bg-slate-950/40 text-slate-400' 
          : 'border-slate-200 bg-slate-50/50 text-slate-500'
      }`}>
        <div className={`p-4 rounded-2xl mb-4 ${
          isDark ? 'bg-slate-800/80 text-blue-400 ring-1 ring-slate-700' : 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200'
        }`}>
          <ClipboardCheck className="w-10 h-10 stroke-[1.5]" />
        </div>

        <h4 className={`text-sm font-bold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
          Preoperatif Değerlendirme İçeriği
        </h4>

        <p className={`text-xs max-w-md leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Bu klinik aracın içeriği henüz eklenmemiştir. İhtiyacınıza göre vizit notları, havayolu değerlendirmesi, preop tetkik kriterleri veya form şablonları eklenebilir.
        </p>

        <div className={`mt-6 inline-flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border ${
          isDark ? 'border-slate-800 bg-slate-900/60 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-blue-500" />
          <span>İçerik şimdilik boş bırakılmıştır</span>
        </div>
      </div>
    </div>
  );
};
