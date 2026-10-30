import React, { useState, useRef, useEffect } from 'react';
import { 
  X,
  Upload, 
  Download, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  FileSpreadsheet, 
  Search, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  Edit2 
} from 'lucide-react';
import { MonthDutyRoster, DayDutySchedule, MonthOption } from './DutyRosterTypes';
import { 
  getSavedRoster, 
  saveRoster, 
  downloadExcelTemplate, 
  parseExcelRoster, 
  resetToDefaultRoster,
  getCurrentShiftStatus,
  fetchServerRosters,
  getAvailableMonthOptions,
  getActiveMonthKey,
  setActiveMonthKey,
  isRosterAdminUnlocked
} from './DutyRosterService';
import { RosterAdminAuthModal } from './RosterAdminAuthModal';
import { RosterDutyEditModal } from './RosterDutyEditModal';

interface DutyRosterToolViewProps {
  isDark: boolean;
}

export const DutyRosterToolView: React.FC<DutyRosterToolViewProps> = ({ isDark }) => {
  const [activeMonth, setActiveMonth] = useState<string>(() => getActiveMonthKey());
  const [roster, setRoster] = useState<MonthDutyRoster>(() => getSavedRoster(getActiveMonthKey()));
  const [monthOptions, setMonthOptions] = useState<MonthOption[]>(() => getAvailableMonthOptions());
  const [selectedDateKey, setSelectedDateKey] = useState<string>('');
  const [activeShiftKey, setActiveShiftKey] = useState<string>('');

  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Admin authentication state
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => isRosterAdminUnlocked());
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);
  const [pendingAdminAction, setPendingAdminAction] = useState<'upload' | 'edit' | null>(null);

  // Cell editing modal state
  const [editingCell, setEditingCell] = useState<{
    dateKey: string;
    campus: 'seyrantepe' | 'cayirbasi';
    staffId: string;
    slotLabel: string;
    campusName: string;
    currentName: string;
    dateStr: string;
    dayName: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync with server on initial mount and register event listeners
  useEffect(() => {
    setIsAdminUnlocked(isRosterAdminUnlocked());
    fetchServerRosters().then(() => {
      const currentKey = getActiveMonthKey();
      setActiveMonth(currentKey);
      setMonthOptions(getAvailableMonthOptions());
      const freshRoster = getSavedRoster(currentKey);
      setRoster(freshRoster);
      const curShift = getCurrentShiftStatus(freshRoster);
      const keys = Object.keys(freshRoster.days).sort();
      setSelectedDateKey(curShift.activeDateKey || (keys.length > 0 ? keys[0] : ''));
      setActiveShiftKey(curShift.activeDateKey);
    });

    const handleRostersUpdated = () => {
      const currentKey = getActiveMonthKey();
      setMonthOptions(getAvailableMonthOptions());
      const updated = getSavedRoster(currentKey);
      setRoster(updated);
      const curShift = getCurrentShiftStatus(updated);
      setActiveShiftKey(curShift.activeDateKey);
    };

    const handleActiveMonthChanged = (e: any) => {
      const newKey = e.detail?.monthKey || getActiveMonthKey();
      setActiveMonth(newKey);
      const updated = getSavedRoster(newKey);
      setRoster(updated);
      const keys = Object.keys(updated.days).sort();
      const curShift = getCurrentShiftStatus(updated);
      setActiveShiftKey(curShift.activeDateKey);
      if (curShift.activeDateKey && updated.days[curShift.activeDateKey]) {
        setSelectedDateKey(curShift.activeDateKey);
      } else if (keys.length > 0) {
        setSelectedDateKey(keys[0]);
      }
    };

    window.addEventListener('etfal-rosters-updated', handleRostersUpdated);
    window.addEventListener('etfal-active-month-changed', handleActiveMonthChanged);
    return () => {
      window.removeEventListener('etfal-rosters-updated', handleRostersUpdated);
      window.removeEventListener('etfal-active-month-changed', handleActiveMonthChanged);
    };
  }, []);

  // Live timer to keep current active shift up to date
  useEffect(() => {
    const checkActiveShift = () => {
      const freshStatus = getCurrentShiftStatus(roster);
      setActiveShiftKey(freshStatus.activeDateKey);
    };
    checkActiveShift();
    const interval = setInterval(checkActiveShift, 30000);
    return () => clearInterval(interval);
  }, [roster]);

  const sortedDates = Object.keys(roster.days).sort();

  // Month selection switch
  const handleSelectMonth = (monthKey: string) => {
    setActiveMonthKey(monthKey);
    setActiveMonth(monthKey);
    const selected = getSavedRoster(monthKey);
    setRoster(selected);
    const keys = Object.keys(selected.days).sort();
    const curShift = getCurrentShiftStatus(selected);
    setActiveShiftKey(curShift.activeDateKey);
    if (curShift.activeDateKey && selected.days[curShift.activeDateKey]) {
      setSelectedDateKey(curShift.activeDateKey);
    } else if (keys.length > 0) {
      setSelectedDateKey(keys[0]);
    }
  };

  // Keyboard navigation when this tool is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const curIdx = sortedDates.indexOf(selectedDateKey);
        if (curIdx > 0) {
          setSelectedDateKey(sortedDates[curIdx - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const curIdx = sortedDates.indexOf(selectedDateKey);
        if (curIdx < sortedDates.length - 1) {
          setSelectedDateKey(sortedDates[curIdx + 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDateKey, sortedDates]);

  // Admin Trigger Handlers
  const handleRequestUpload = () => {
    if (isRosterAdminUnlocked()) {
      fileInputRef.current?.click();
    } else {
      setPendingAdminAction('upload');
      setShowAdminAuthModal(true);
    }
  };

  const handleToggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setNotification({
        type: 'success',
        message: 'Nöbet düzenleme modu kapatıldı.'
      });
      return;
    }

    if (isRosterAdminUnlocked()) {
      setIsEditMode(true);
      setNotification({
        type: 'success',
        message: 'Nöbet düzenleme modu aktif. Değiştirmek istediğiniz hekim hücresine tıklayınız.'
      });
    } else {
      setPendingAdminAction('edit');
      setShowAdminAuthModal(true);
    }
  };

  const handleAdminAuthSuccess = () => {
    setIsAdminUnlocked(true);

    if (pendingAdminAction === 'upload') {
      setNotification({
        type: 'success',
        message: 'Admin yetkilendirmesi sağlandı. Dosya seçici açılıyor.'
      });
      setTimeout(() => fileInputRef.current?.click(), 100);
    } else if (pendingAdminAction === 'edit') {
      setIsEditMode(true);
      setNotification({
        type: 'success',
        message: 'Admin yetkilendirmesi sağlandı. Nöbet düzenleme modu aktif! Değiştirmek istediğiniz hekime tıklayınız.'
      });
    }
    setPendingAdminAction(null);
  };

  const handleCellClick = (
    dateKey: string,
    campus: 'seyrantepe' | 'cayirbasi',
    staffId: string,
    slotLabel: string,
    campusName: string,
    currentName: string,
    dateStr: string,
    dayName: string
  ) => {
    // 1. Her zaman tıklanan o günü seç (şifre sormadan sadece seçer)
    setSelectedDateKey(dateKey);

    // 2. Edit modu açık değilse şifre sorma, başka hiçbir işlem yapma
    if (!isEditMode) {
      return;
    }

    // 3. Edit modu açıkken hekim değiştirme penceresini aç
    setEditingCell({
      dateKey,
      campus,
      staffId,
      slotLabel,
      campusName,
      currentName,
      dateStr,
      dayName
    });
  };

  const handleSaveCellEdit = (newName: string) => {
    if (!editingCell) return;
    const { dateKey, campus, staffId, slotLabel, dateStr } = editingCell;

    const updatedRoster = { ...roster };
    const day = updatedRoster.days[dateKey];
    if (!day) return;

    if (campus === 'seyrantepe') {
      const exists = day.seyrantepeStaff.some(s => s.id === staffId);
      if (exists) {
        day.seyrantepeStaff = day.seyrantepeStaff.map(s => 
          s.id === staffId ? { ...s, name: newName } : s
        );
      } else if (newName) {
        day.seyrantepeStaff.push({
          id: staffId,
          name: newName,
          slot: slotLabel,
          role: slotLabel
        });
      }
    } else {
      const exists = day.cayirbasiStaff.some(s => s.id === staffId);
      if (exists) {
        day.cayirbasiStaff = day.cayirbasiStaff.map(s => 
          s.id === staffId ? { ...s, name: newName } : s
        );
      } else if (newName) {
        day.cayirbasiStaff.push({
          id: staffId,
          name: newName,
          slot: slotLabel,
          role: slotLabel
        });
      }
    }

    setRoster(updatedRoster);
    saveRoster(updatedRoster);
    setNotification({
      type: 'success',
      message: `${dateStr} günü ${slotLabel} için nöbetçi '${newName || 'BOŞ'}' olarak güncellendi ve sunucuya kaydedildi.`
    });
    setEditingCell(null);
  };

  // Handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setNotification(null);

    try {
      const updatedRoster = await parseExcelRoster(file);
      setRoster(updatedRoster);
      setActiveMonth(updatedRoster.monthKey);
      setMonthOptions(getAvailableMonthOptions());
      const keys = Object.keys(updatedRoster.days).sort();
      const curShift = getCurrentShiftStatus(updatedRoster);
      setActiveShiftKey(curShift.activeDateKey);
      if (curShift.activeDateKey && updatedRoster.days[curShift.activeDateKey]) {
        setSelectedDateKey(curShift.activeDateKey);
      } else if (keys.length > 0) {
        setSelectedDateKey(keys[0]);
      }
      const seyCount = Object.values(updatedRoster.days).reduce((acc, d) => acc + d.seyrantepeStaff.length, 0);
      const sarCount = Object.values(updatedRoster.days).reduce((acc, d) => acc + d.cayirbasiStaff.length, 0);
      setNotification({
        type: 'success',
        message: `${updatedRoster.monthName} başarıyla işlendi ve sunucuya kaydedildi! (${keys.length} gün, Seyrantepe: ${seyCount} nöbetçi, Sarıyer: ${sarCount} nöbetçi)`
      });
    } catch (err: any) {
      setNotification({
        type: 'error',
        message: err?.message || 'Excel dosyası işlenirken bir hata oluştu.'
      });
    } finally {
      setUploadLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    downloadExcelTemplate(roster);
  };

  const handleReset = () => {
    if (!isRosterAdminUnlocked()) {
      setPendingAdminAction('edit');
      setShowAdminAuthModal(true);
      return;
    }

    if (window.confirm('Nöbet listesini Ekim 2026 resmi aslına sıfırlamak istiyor musunuz?')) {
      const fresh = resetToDefaultRoster();
      setRoster(fresh);
      setActiveMonth('2026-10');
      setMonthOptions(getAvailableMonthOptions());
      setNotification({
        type: 'success',
        message: 'Nöbet listesi resmi Ekim 2026 aslına sıfırlandı.'
      });
    }
  };

  const isWeekendDay = (day: DayDutySchedule) => {
    if (day.date) {
      const parts = day.date.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 12, 0, 0);
        const dow = d.getDay();
        return dow === 0 || dow === 6;
      }
    }
    const name = (day.dayName || '').toLowerCase().trim();
    if (name.includes('pazartesi') || name === 'pzt' || 
        name.includes('salı') || name.includes('sali') || 
        name.includes('çarşamba') || name.includes('carsamba') || 
        name.includes('perşembe') || name.includes('persembe') || 
        (name.includes('cuma') && !name.includes('cumartesi'))) {
      return !!day.notes?.toLowerCase().includes('bayram');
    }
    if (name.includes('cumartesi') || name.startsWith('c.tesi') || name === 'cmt' ||
        (name.includes('pazar') && !name.includes('pazartesi')) || name === 'paz') {
      return true;
    }
    return !!day.isWeekend;
  };

  const filteredDates = sortedDates.filter(dateKey => {
    if (!searchDoctor.trim()) return true;
    const day = roster.days[dateKey];
    const query = searchDoctor.trim().toUpperCase();
    const hasSey = day.seyrantepeStaff.some(s => s.name.toUpperCase().includes(query));
    const hasCay = day.cayirbasiStaff.some(s => s.name.toUpperCase().includes(query));
    return hasSey || hasCay;
  });

  return (
    <div className={`rounded-2xl border shadow-sm overflow-hidden transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* Top Banner */}
      <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-slate-800/80 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-800'
          }`}>
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight whitespace-nowrap overflow-x-auto py-0.5">
              {roster.monthName}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isAdminUnlocked && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-lg border border-teal-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              Yönetici Girişi Aktif
            </span>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className={`px-4 sm:px-5 py-3 border-b flex flex-wrap items-center justify-between gap-2.5 ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100'
      }`}>
        {/* Left Buttons: Excel & Edit Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            className="hidden"
          />

          <button
            type="button"
            disabled={uploadLoading}
            onClick={handleRequestUpload}
            title={isAdminUnlocked ? 'Nöbet listesi yükle' : 'Nöbet listesi yüklemek için şifre gereklidir'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              isDark 
                ? 'bg-teal-600 hover:bg-teal-500 text-white' 
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{uploadLoading ? 'İşleniyor...' : 'Nöbet Yükle'}</span>
            {!isAdminUnlocked && <Lock className="w-3 h-3 opacity-70 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={handleToggleEditMode}
            title={isEditMode ? 'Düzenleme modunu kapat' : 'Hekim nöbet değişimi yap (Admin şifresi gerektirir)'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isEditMode
                ? 'bg-amber-500 text-white border-amber-600 font-bold shadow-xs'
                : isAdminUnlocked
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold'
                  : isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isEditMode ? 'Düzenleme Aktif' : 'Nöbet Değişimi'}</span>
            {isEditMode ? (
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            ) : isAdminUnlocked ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            ) : (
              <Lock className="w-3 h-3 text-slate-400 ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadTemplate}
            title="Bu listenin resmi Excel tablosunu (.xlsx) indirin"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Nöbet İndir</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Resmi aslına geri dön"
            className={`p-1.5 rounded-lg border text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 border-slate-200 dark:border-slate-700 transition-colors cursor-pointer`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Search Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Doktor ara (örn. FATMA, BERKAY)..."
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border transition-colors outline-none font-semibold ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700 text-white focus:border-teal-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-600'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Month Selector Strip (Task 3: No "Aktif Takvim Ayı:" text or icon) */}
      <div className={`px-4 sm:px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-2.5 ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-100'
      }`}>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="inline-flex p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 border border-slate-300/50 dark:border-slate-700/60">
            {monthOptions.map((opt) => {
              const isSelected = opt.key === activeMonth;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectMonth(opt.key)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{opt.displayName}</span>
                  {opt.isOfficialDefault && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                    }`}>
                      Resmi
                    </span>
                  )}
                  {opt.key !== '2026-10' && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                    }`}>
                      {opt.key === '2026-11' ? 'Kasım' : 'Yüklendi'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          {isAdminUnlocked && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-md border border-teal-500/20">
              <ShieldCheck className="w-3 h-3" />
              Admin Aktif (Hekime tıklayıp değiştirin)
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Senkronize
          </span>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
          notification.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{notification.message}</span>
          </div>
          <button 
            type="button"
            onClick={() => setNotification(null)}
            className="p-1 hover:opacity-70 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Edit Mode Active Banner */}
      {isEditMode && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-800 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-bold">Nöbet Düzenleme Modu Aktif:</span>
            <span>Listede değiştirmek istediğiniz hekim hücresine tıklayarak yeni ismi yazın veya takas yapın.</span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditMode(false)}
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-[11px] font-bold cursor-pointer transition-colors"
          >
            Düzenlemeyi Bitir
          </button>
        </div>
      )}

      {/* Table Content: Sole clean view */}
      <div className="p-3 sm:p-5 overflow-y-auto">
        <div className="border rounded-xl overflow-hidden overflow-x-auto border-slate-300 dark:border-slate-700 text-xs shadow-xs">
          <table className="w-full text-center border-collapse">
            <thead>
              {/* Top Super-headers */}
              <tr className="bg-slate-900 text-white font-bold text-[11px] tracking-wider uppercase border-b border-slate-700">
                <th colSpan={2} className="py-2 px-3 text-left bg-slate-950">TARİH &amp; GÜN</th>
                <th colSpan={6} className="py-2 px-3 bg-teal-900 border-x border-teal-800 text-teal-100">
                  SEYRANTEPE YERLEŞKESİ (1 - 6)
                </th>
                <th colSpan={4} className="py-2 px-3 bg-amber-900 text-amber-100">
                  SARIYER ÇAYIRBAŞI YERLEŞKESİ (1 - 4)
                </th>
              </tr>
              {/* Column Slot Headers */}
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}>
                <th className="py-2 px-3 text-left w-24">TARİH</th>
                <th className="py-2 px-3 text-left w-24">GÜN</th>
                <th className="py-2 px-2 text-teal-700 dark:text-teal-300">SEY-1</th>
                <th className="py-2 px-2 text-teal-700 dark:text-teal-300">SEY-2</th>
                <th className="py-2 px-2 text-teal-700 dark:text-teal-300">SEY-3</th>
                <th className="py-2 px-2 text-teal-700 dark:text-teal-300">SEY-4</th>
                <th className="py-2 px-2 text-teal-700 dark:text-teal-300">SEY-5</th>
                <th className="py-2 px-2 text-teal-700 dark:text-teal-300 border-r border-slate-300 dark:border-slate-700">SEY-6</th>
                <th className="py-2 px-2 text-amber-700 dark:text-amber-300">SAR-1</th>
                <th className="py-2 px-2 text-amber-700 dark:text-amber-300">SAR-2</th>
                <th className="py-2 px-2 text-amber-700 dark:text-amber-300">SAR-3</th>
                <th className="py-2 px-2 text-amber-700 dark:text-amber-300">SAR-4</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredDates.map((dateKey) => {
                const day = roster.days[dateKey];
                const isSelected = dateKey === selectedDateKey;
                const isToday = dateKey === activeShiftKey;
                const isWeekend = isWeekendDay(day);

                const getSeySlot = (num: number) => 
                  day.seyrantepeStaff.find(s => s.slot === `SEYRANTEPE ${num}`)?.name || day.seyrantepeStaff[num - 1]?.name || '';

                const getSarSlot = (num: number) => 
                  day.cayirbasiStaff.find(s => s.slot === `SARIYER-${num}`)?.name || day.cayirbasiStaff[num - 1]?.name || '';

                const renderDoctorCell = (
                  campus: 'seyrantepe' | 'cayirbasi',
                  slotNum: number,
                  name: string,
                  isExtraBorder: boolean = false
                ) => {
                  const slotLabel = campus === 'seyrantepe' ? `SEYRANTEPE ${slotNum}` : `SARIYER-${slotNum}`;
                  const campusName = campus === 'seyrantepe' ? 'Seyrantepe Yerleşkesi' : 'Sarıyer (Çayırbaşı) Yerleşkesi';
                  const staffId = `${campus.substring(0, 3)}-${dateKey}-${slotNum}`;

                  return (
                    <td 
                      key={`${campus}-${slotNum}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCellClick(
                          dateKey,
                          campus,
                          staffId,
                          slotLabel,
                          campusName,
                          name,
                          day.formattedDate,
                          day.dayName
                        );
                      }}
                      title={
                        isEditMode 
                          ? `Nöbeti Değiştir: ${day.formattedDate} - ${slotLabel} (${name || 'Boş'})`
                          : `${day.formattedDate} - ${slotLabel}`
                      }
                      className={`py-1.5 px-2 transition-all cursor-pointer relative group ${
                        isExtraBorder ? 'border-r border-slate-300 dark:border-slate-700 ' : ''
                      }${
                        isEditMode
                          ? 'hover:ring-2 hover:ring-amber-500 hover:z-10 bg-amber-500/10'
                          : ''
                      } ${
                        isWeekend 
                          ? 'text-amber-900 dark:text-amber-300 font-bold hover:bg-amber-300/60 dark:hover:bg-amber-900/50' 
                          : 'text-slate-900 dark:text-slate-100 hover:bg-teal-500/15'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span className={name ? '' : 'text-slate-400 dark:text-slate-600 font-normal'}>
                          {name || '-'}
                        </span>
                        {isEditMode && (
                          <Edit2 className="w-2.5 h-2.5 opacity-60 text-amber-600 dark:text-amber-400 shrink-0" />
                        )}
                      </div>
                    </td>
                  );
                };

                return (
                  <tr 
                    key={dateKey}
                    onClick={() => setSelectedDateKey(dateKey)}
                    className={`transition-colors text-[11px] ${
                      isSelected
                        ? 'ring-2 ring-teal-500 font-bold bg-teal-500/10'
                        : isWeekend
                          ? isDark ? 'bg-amber-950/25 text-amber-300' : 'bg-yellow-200/90 text-amber-950 font-bold'
                          : isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Tarih */}
                    <td className={`py-1.5 px-3 text-left font-mono whitespace-nowrap ${isWeekend ? 'font-bold text-amber-900 dark:text-amber-300' : 'font-semibold'}`}>
                      {day.formattedDate}
                      {isToday && (
                        <span className="ml-1.5 px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-600 text-white">
                          Bugün
                        </span>
                      )}
                    </td>

                    {/* Gün */}
                    <td className={`py-1.5 px-3 text-left whitespace-nowrap ${isWeekend ? 'font-black text-amber-700 dark:text-amber-300' : ''}`}>
                      {day.dayName}
                    </td>

                    {/* Seyrantepe 1..6 */}
                    {renderDoctorCell('seyrantepe', 1, getSeySlot(1))}
                    {renderDoctorCell('seyrantepe', 2, getSeySlot(2))}
                    {renderDoctorCell('seyrantepe', 3, getSeySlot(3))}
                    {renderDoctorCell('seyrantepe', 4, getSeySlot(4))}
                    {renderDoctorCell('seyrantepe', 5, getSeySlot(5))}
                    {renderDoctorCell('seyrantepe', 6, getSeySlot(6), true)}

                    {/* Sarıyer (Çayırbaşı) 1..4 */}
                    {renderDoctorCell('cayirbasi', 1, getSarSlot(1))}
                    {renderDoctorCell('cayirbasi', 2, getSarSlot(2))}
                    {renderDoctorCell('cayirbasi', 3, getSarSlot(3))}
                    {renderDoctorCell('cayirbasi', 4, getSarSlot(4))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Password Modal (furkan1825 SHA-256) */}
      <RosterAdminAuthModal
        isOpen={showAdminAuthModal}
        onClose={() => {
          setShowAdminAuthModal(false);
          setPendingAdminAction(null);
        }}
        onSuccess={handleAdminAuthSuccess}
        isDark={isDark}
        actionTitle={pendingAdminAction === 'upload' ? 'Nöbet Yükleme Yetkisi' : 'Nöbet Değişimi Yetkisi'}
        actionDescription={
          pendingAdminAction === 'upload'
            ? 'Yeni Excel nöbet çizelgesi yüklemek için lütfen klinik yönetici şifresini giriniz.'
            : 'Hekim nöbet çizelgesinde değişiklik yapmak için lütfen klinik yönetici şifresini giriniz.'
        }
      />

      {/* Duty Edit / Swap Modal */}
      {editingCell && (
        <RosterDutyEditModal
          isOpen={true}
          onClose={() => setEditingCell(null)}
          onSave={handleSaveCellEdit}
          isDark={isDark}
          dateStr={editingCell.dateStr}
          dayName={editingCell.dayName}
          slotLabel={editingCell.slotLabel}
          campusName={editingCell.campusName}
          currentName={editingCell.currentName}
        />
      )}
    </div>
  );
};
