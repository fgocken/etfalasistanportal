import React from 'react';
import { ArrowUp, Search } from 'lucide-react';
import { TabType } from '../types/clinical';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
  onOpenSearch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenSearch }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">KlinikAsistan</span>
            <span>·</span>
            <span>Lokal Klinik Asistan & İntern Hekim Portalı</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => onSelectTab('calculators')}
              className="hover:text-slate-900 transition-colors"
            >
              Hesaplayıcılar
            </button>
            <button
              onClick={() => onSelectTab('drugs')}
              className="hover:text-slate-900 transition-colors"
            >
              İlaç & İnfüzyon
            </button>
            <button
              onClick={() => onSelectTab('labs')}
              className="hover:text-slate-900 transition-colors"
            >
              Laboratuvar
            </button>
            <button
              onClick={() => onSelectTab('protocols')}
              className="hover:text-slate-900 transition-colors"
            >
              Acil Protokoller
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 ml-2 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Yukarı</span>
            </button>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center sm:text-left leading-relaxed">
          Tıbbi Sorumluluk Reddi: Bu web uygulaması lokal klinik stajyeri, intern ve asistan hekimler için eğitim ve pratik klinik hatırlatıcı mahiyettedir. Hasta başındaki tüm tanı ve tedavi kararları sorumlu uzman hekim kontrolünde verilmelidir.
        </div>
      </div>
    </footer>
  );
};
