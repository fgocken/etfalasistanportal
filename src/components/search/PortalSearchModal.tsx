import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  BookOpen, 
  BarChart3, 
  Phone, 
  Calendar, 
  CornerDownLeft, 
  Info,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  PORTAL_SEARCH_ITEMS, 
  PortalSearchItem, 
  SearchCategory, 
  searchPortalItems 
} from '../../data/portalSearchIndex';

interface PortalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: PortalSearchItem) => void;
  isDark: boolean;
}

const CATEGORIES: ('Tümü' | SearchCategory)[] = [
  'Tümü',
  'Hesaplayıcılar',
  'Kılavuzlar & Protokoller',
  'Klinik İnfografikler',
  'Rehber & Nöbet',
  'Yerleşkeler & Bilgi'
];

function getCategoryIcon(cat: SearchCategory) {
  switch (cat) {
    case 'Hesaplayıcılar':
      return Calculator;
    case 'Kılavuzlar & Protokoller':
      return BookOpen;
    case 'Klinik İnfografikler':
      return BarChart3;
    case 'Rehber & Nöbet':
      return Calendar;
    case 'Yerleşkeler & Bilgi':
      return Info;
    default:
      return Search;
  }
}

function getCategoryBadgeClass(cat: SearchCategory, isDark: boolean) {
  switch (cat) {
    case 'Hesaplayıcılar':
      return isDark ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border-cyan-200';
    case 'Kılavuzlar & Protokoller':
      return isDark ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Klinik İnfografikler':
      return isDark ? 'bg-violet-500/15 text-violet-300 border-violet-500/30' : 'bg-violet-50 text-violet-700 border-violet-200';
    case 'Rehber & Nöbet':
      return isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Yerleşkeler & Bilgi':
      return isDark ? 'bg-slate-500/15 text-slate-300 border-slate-500/30' : 'bg-slate-100 text-slate-700 border-slate-200';
  }
}

export const PortalSearchModal: React.FC<PortalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  isDark
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Tümü' | SearchCategory>('Tümü');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input upon open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedCategory('Tümü');
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Compute filtered items
  const filteredItems = useMemo(() => {
    let items: PortalSearchItem[] = [];

    if (!query.trim()) {
      // Default to popular shortcuts when query is empty
      items = PORTAL_SEARCH_ITEMS.filter(item => item.popular);
    } else {
      items = searchPortalItems(query);
    }

    if (selectedCategory !== 'Tümü') {
      items = items.filter(item => item.category === selectedCategory);
    }

    return items;
  }, [query, selectedCategory]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems.length, selectedCategory]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (filteredItems.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filteredItems[selectedIndex];
        if (item) {
          onSelectItem(item);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, onSelectItem]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[82vh] transition-all duration-150 ${
          isDark 
            ? 'bg-slate-900 border-slate-700/80 text-slate-100 shadow-teal-950/30' 
            : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/40'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <div className={`p-3.5 sm:p-4 border-b flex items-center gap-3 ${
          isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-100 bg-slate-50/60'
        }`}>
          <div className={`p-2 rounded-xl shrink-0 ${
            isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-600'
          }`}>
            <Search className="w-4 h-4" />
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kılavuz, hesaplayıcı, formül, ilaç, infografik veya nöbet ara..."
            className={`flex-1 bg-transparent text-sm sm:text-base font-medium outline-hidden ${
              isDark ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
            }`}
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
              }`}
              title="Aramayı temizle"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className={`px-2 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
              isDark 
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            ESC
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className={`px-3 py-2 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs ${
          isDark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-100 bg-slate-50/40'
        }`}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? isDark 
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                      : 'bg-teal-100/80 text-teal-900 border border-teal-300 font-semibold shadow-2xs'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results Header Status */}
        <div className={`px-4 py-2 text-[11px] font-semibold flex items-center justify-between border-b ${
          isDark ? 'border-slate-800/80 bg-slate-950/40 text-slate-400' : 'border-slate-100 bg-slate-100/50 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5">
            {!query.trim() ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Sık Kullanılan İçerikler &amp; Hızlı Başlangıç</span>
              </>
            ) : (
              <span>Bulunan Sonuçlar ({filteredItems.length})</span>
            )}
          </div>
          <span className="hidden sm:inline font-normal text-slate-400">
            Yön tuşları <kbd className="font-mono text-[10px]">↑</kbd> <kbd className="font-mono text-[10px]">↓</kbd> ile gezin, <kbd className="font-mono text-[10px]">↵</kbd> ile aç
          </span>
        </div>

        {/* Results Scroll Area */}
        <div 
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-1.5 no-scrollbar"
        >
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-400">
                "{query}" ile eşleşen bir içerik bulunamadı.
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Örnek aramalar: <em>açlık süreleri</em>, <em>infüzyon</em>, <em>mallampati</em>, <em>acil cerrahi</em>, <em>vki</em>, <em>aspirin</em>, <em>nöbet</em> veya <em>dahili hatlar</em>.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const Icon = getCategoryIcon(item.category);
              const badgeClass = getCategoryBadgeClass(item.category, isDark);

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer border flex items-start justify-between gap-3 group ${
                    isSelected
                      ? isDark 
                        ? 'bg-slate-800/90 border-teal-500/50 shadow-xs' 
                        : 'bg-teal-50/70 border-teal-300 shadow-xs'
                      : isDark 
                        ? 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-800/50 hover:border-slate-700' 
                        : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-xl mt-0.5 shrink-0 ${
                      isSelected
                        ? isDark ? 'bg-teal-500/20 text-teal-300' : 'bg-teal-100 text-teal-800'
                        : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs sm:text-sm font-bold truncate ${
                          isSelected
                            ? isDark ? 'text-teal-300' : 'text-teal-900'
                            : isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {item.title}
                        </span>

                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${badgeClass}`}>
                          {item.badge}
                        </span>
                      </div>

                      <p className={`text-xs line-clamp-2 leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 mt-1 self-center">
                    {isSelected ? (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
                        <span>Aç</span>
                        <CornerDownLeft className="w-3 h-3" />
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className={`p-3 border-t text-[11px] flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/80 text-slate-400' : 'border-slate-100 bg-slate-50 text-slate-500'
        }`}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">Enter</kbd> Seç
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-[10px]">Esc</kbd> Kapat
            </span>
          </div>

          <div className="font-semibold text-teal-700 dark:text-teal-300">
            Şişli Etfal Anestezi Asistan Portalı
          </div>
        </div>
      </div>
    </div>
  );
};
