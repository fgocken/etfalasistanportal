import React, { useState, useEffect } from 'react';
import { X, Check, Trash2, Edit3, ShieldAlert } from 'lucide-react';

interface WeeklyCellEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newDoctors: string[]) => void;
  isDark: boolean;
  unitName: string;
  dayFormatted: string;
  dayName: string;
  initialDoctors: string[];
}

export const WeeklyCellEditModal: React.FC<WeeklyCellEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isDark,
  unitName,
  dayFormatted,
  dayName,
  initialDoctors
}) => {
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setInputText(initialDoctors.join(', '));
    }
  }, [isOpen, initialDoctors]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanList = inputText
      .split(/[,;\n]+/)
      .map(s => s.trim().toUpperCase())
      .filter(Boolean);
    onSave(cleanList);
    onClose();
  };

  const handleClear = () => {
    onSave([]);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-md rounded-2xl border p-5 sm:p-6 shadow-2xl space-y-4 transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${
              isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-100 text-teal-800'
            }`}>
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold">Görevli Hekim Düzenle</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {unitName} · {dayFormatted} ({dayName})
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Görevli Doktor(lar) (Birden fazlaysa virgülle ayırınız)
            </label>
            <input
              type="text"
              autoFocus
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Örn: EBRU, HAMİT"
              className={`w-full px-3 py-2 rounded-xl text-sm border font-bold uppercase transition-all outline-none ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700 text-white focus:border-teal-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-600'
              }`}
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Büyük harfe otomatik çevrilir ve tüm ziyaretçiler için anında sunucuya kaydedilir.
            </p>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Görevi Boşalt</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
