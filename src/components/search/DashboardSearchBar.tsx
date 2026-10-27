import React from 'react';
import { Search } from 'lucide-react';

interface DashboardSearchBarProps {
  onClick: () => void;
  isDark: boolean;
}

export const DashboardSearchBar: React.FC<DashboardSearchBarProps> = ({ onClick, isDark }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full sm:max-w-md flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl border text-left transition-all cursor-pointer shadow-2xs group ${
        isDark 
          ? 'bg-slate-900/80 hover:bg-slate-800/90 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-teal-500/40 shadow-slate-950/20' 
          : 'bg-white hover:bg-slate-50/90 text-slate-500 hover:text-slate-800 border-slate-200/90 hover:border-teal-400/80 shadow-slate-100'
      }`}
      title="Hızlı ara (Kısayol: ⌘K veya Ctrl+K)"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Search className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors shrink-0" />
        <span className="text-xs truncate text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 font-normal">
          Hızlı ara...
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <kbd className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border ${
          isDark 
            ? 'bg-slate-800 text-slate-400 border-slate-700' 
            : 'bg-slate-100 text-slate-500 border-slate-200'
        }`}>
          ⌘K
        </kbd>
      </div>
    </button>
  );
};
