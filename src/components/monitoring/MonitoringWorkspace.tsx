import React from 'react';
import { HeartPulse } from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface MonitoringWorkspaceProps {
  isDark: boolean;
}

export const MonitoringWorkspace: React.FC<MonitoringWorkspaceProps> = ({ isDark }) => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border ${
              isDark
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-emerald-50 border-emerald-200 text-emerald-700'
            }`}
          >
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Monitörizasyon
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Klinik Modül · Hazırlanıyor
            </p>
          </div>
        </div>

        <ShareLinkButton
          type="arac"
          id="monitoring"
          isDark={isDark}
          variant="compact"
          title="Monitörizasyon Bağlantısını Paylaş"
        />
      </div>

      {/* Placeholder Stage */}
      <div
        className={`rounded-xl border border-dashed p-8 sm:p-12 text-center space-y-3 ${
          isDark
            ? 'bg-slate-900/60 border-slate-700/80 text-slate-300'
            : 'bg-white border-slate-300 text-slate-700'
        }`}
      >
        <div
          className={`mx-auto w-12 h-12 rounded-xl flex items-center justify-center border ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-emerald-400'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          <HeartPulse className="w-6 h-6" />
        </div>

        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Monitörizasyon Bölümü Hazırlanıyor
        </h3>

        <p className={`max-w-md mx-auto text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Bu bölümün klinik içeriği daha sonra doldurulacaktır. Bölüm şu an Dashboard navigasyonunda ve bağlantılarda aktif durumdadır.
        </p>
      </div>
    </div>
  );
};
