import React, { useState, useEffect } from 'react';
import { UserCheck, Check, X, Calendar, Building2, Trash2 } from 'lucide-react';
import { sanitizeDoctorName } from './DutyRosterService';

interface RosterDutyEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  isDark: boolean;
  dateStr: string;
  dayName: string;
  slotLabel: string;
  campusName: string;
  currentName: string;
}

export const RosterDutyEditModal: React.FC<RosterDutyEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isDark,
  dateStr,
  dayName,
  slotLabel,
  campusName,
  currentName
}) => {
  const [nameInput, setNameInput] = useState<string>(currentName);

  useEffect(() => {
    setNameInput(currentName);
  }, [currentName, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = sanitizeDoctorName(nameInput);
    onSave(clean);
    onClose();
  };

  const handleClear = () => {
    onSave('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-sm rounded-2xl border p-5 sm:p-6 shadow-2xl space-y-4 transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              campusName.toLowerCase().includes('seyrantepe')
                ? 'bg-teal-500/20 text-teal-400'
                : 'bg-amber-500/20 text-amber-400'
            }`}>
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">
                Nöbetçi Hekim Değişimi
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Resmi Nöbet Çizelgesi Güncellemesi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Pill */}
        <div className={`p-2.5 rounded-xl border text-xs space-y-1 ${
          isDark ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-500" />
              <span>{dateStr} ({dayName})</span>
            </span>
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {slotLabel}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>{campusName}</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 pt-1">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Nöbetçi Hekim Adı Soyadı
            </label>
            <input
              type="text"
              autoFocus
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value.toUpperCase())}
              placeholder="Örn: FATMA, AHMET..."
              className={`w-full px-3 py-2 text-xs font-bold uppercase rounded-xl border focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center justify-between gap-2 pt-1">
            {currentName && (
              <button
                type="button"
                onClick={handleClear}
                title="Bu nöbetçiyi listeden kaldır"
                className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-rose-500 border-rose-500/20 hover:bg-rose-500/10 transition-colors cursor-pointer flex items-center gap-1`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Boşalt</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                İptal
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Kaydet</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
