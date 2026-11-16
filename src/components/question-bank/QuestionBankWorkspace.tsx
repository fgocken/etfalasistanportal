import React from 'react';
import { HelpCircle } from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface QuestionBankWorkspaceProps {
  isDark: boolean;
}

export const QuestionBankWorkspace: React.FC<QuestionBankWorkspaceProps> = ({ isDark }) => {
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
                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Soru Bankası
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Yeterlik / Board Hazırlık &amp; Vaka Soruları · Klinik Modül
            </p>
          </div>
        </div>

        <ShareLinkButton
          type="arac"
          id="question-bank"
          isDark={isDark}
          variant="compact"
          title="Soru Bankası Bağlantısını Paylaş"
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
              ? 'bg-slate-800 border-slate-700 text-indigo-400'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700'
          }`}
        >
          <HelpCircle className="w-6 h-6" />
        </div>

        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Soru Bankası Bölümü Hazırlanıyor
        </h3>

        <p className={`max-w-md mx-auto text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Bu bölümün soru setleri ve açıklamalı çözüm içerikleri daha sonra eklenecektir. Bölüm şu an Dashboard navigasyonunda ve bağlantılarda aktif durumdadır.
        </p>
      </div>
    </div>
  );
};
