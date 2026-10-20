import React from 'react';
import { Search } from 'lucide-react';
import { TabType } from '../types/clinical';

interface HeaderProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenSearch }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no subtitles) */}
        <button 
          onClick={() => onSelectTab('overview')} 
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 text-left hover:text-teal-700 transition-colors"
        >
          KlinikAsistan
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('calculators')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'calculators' ? 'text-teal-700 font-semibold underline underline-offset-8 decoration-2 decoration-teal-600' : 'hover:text-slate-900'
            }`}
          >
            Hesaplayıcılar
          </button>
          <button
            onClick={() => onSelectTab('drugs')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'drugs' ? 'text-teal-700 font-semibold underline underline-offset-8 decoration-2 decoration-teal-600' : 'hover:text-slate-900'
            }`}
          >
            İlaç & İnfüzyon
          </button>
          <button
            onClick={() => onSelectTab('labs')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'labs' ? 'text-teal-700 font-semibold underline underline-offset-8 decoration-2 decoration-teal-600' : 'hover:text-slate-900'
            }`}
          >
            Laboratuvar & AKG
          </button>
          <button
            onClick={() => onSelectTab('protocols')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'protocols' ? 'text-teal-700 font-semibold underline underline-offset-8 decoration-2 decoration-teal-600' : 'hover:text-slate-900'
            }`}
          >
            Acil Protokoller
          </button>
          <button
            onClick={() => onSelectTab('notes')}
            className={`transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'notes' ? 'text-teal-700 font-semibold underline underline-offset-8 decoration-2 decoration-teal-600' : 'hover:text-slate-900'
            }`}
          >
            SOAP & SBAR
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Search button with shortcut hint) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-200"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Klinik Arama</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] text-slate-500 font-mono">
              Ctrl+K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
