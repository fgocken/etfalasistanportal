import React from 'react';
import { Wind, Clock } from 'lucide-react';

interface AirwayManagementViewProps {
  isDark: boolean;
}

export const AirwayManagementView: React.FC<AirwayManagementViewProps> = ({ isDark }) => {
  return (
    <div className="space-y-6">
      {/* Temiz & Sade Boş Durum (Hazırlanıyor) */}
      <div
        className={`p-12 rounded-2xl border text-center transition-all flex flex-col items-center justify-center min-h-[360px] ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 text-slate-400'
            : 'bg-white border-slate-200 text-slate-500 shadow-xs'
        }`}
      >
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-105 ${
            isDark ? 'bg-cyan-950/50 border border-cyan-800/40 text-cyan-400' : 'bg-cyan-50 border border-cyan-200 text-cyan-600'
          }`}
        >
          <Wind className="w-8 h-8" />
        </div>

        <h3 className={`text-lg font-bold mb-1.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Havayolu Yönetimi
        </h3>

        <p className="text-xs sm:text-sm max-w-md text-balance mb-4 text-slate-400 dark:text-slate-500">
          Bu bölümün içeriği üzerinde çalışılmaktadır. Yakında yeni araçlar ve içerikler buraya eklenecektir.
        </p>

        <div
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border ${
            isDark
              ? 'bg-slate-800/80 border-slate-700 text-slate-400'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <Clock className="w-3.5 h-3.5 text-cyan-500" />
          <span>Hazırlanıyor</span>
        </div>
      </div>
    </div>
  );
};

export default AirwayManagementView;
