import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Download, 
  Calendar as CalendarIcon, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  FileSpreadsheet, 
  Edit3, 
  Search,
  FileText,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { MonthDutyRoster, DayDutySchedule, MonthOption } from './DutyRosterTypes';
import { 
  getSavedRoster, 
  saveRoster, 
  downloadExcelTemplate, 
  downloadNovemberExcelTemplate,
  parseExcelRoster, 
  resetToDefaultRoster,
  getCurrentShiftStatus,
  fetchServerRosters,
  getAvailableMonthOptions,
  getActiveMonthKey,
  setActiveMonthKey
} from './DutyRosterService';

interface DutyRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onRosterUpdated?: () => void;
}

export const DutyRosterModal: React.FC<DutyRosterModalProps> = ({
  isOpen,
  onClose,
  isDark,
  onRosterUpdated
}) => {
  const [activeMonth, setActiveMonth] = useState<string>(() => getActiveMonthKey());
  const [roster, setRoster] = useState<MonthDutyRoster>(() => getSavedRoster(getActiveMonthKey()));
  const [monthOptions, setMonthOptions] = useState<MonthOption[]>(() => getAvailableMonthOptions());
  const [selectedDateKey, setSelectedDateKey] = useState<string>(() => getCurrentShiftStatus(getSavedRoster(getActiveMonthKey())).activeDateKey);
  const [activeShiftKey, setActiveShiftKey] = useState<string>(() => getCurrentShiftStatus(getSavedRoster(getActiveMonthKey())).activeDateKey);

  const [activeTab, setActiveTab] = useState<'table' | 'calendar'>('table');
  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // When modal is opened, sync with latest roster and server
  React.useEffect(() => {
    if (isOpen) {
      fetchServerRosters().then(() => {
        const currentKey = getActiveMonthKey();
        setActiveMonth(currentKey);
        setMonthOptions(getAvailableMonthOptions());
        const freshRoster = getSavedRoster(currentKey);
        setRoster(freshRoster);
        const curShift = getCurrentShiftStatus(freshRoster);
        setSelectedDateKey(curShift.activeDateKey);
        setActiveShiftKey(curShift.activeDateKey);
      });
    }
  }, [isOpen]);

  const handleSelectMonth = (monthKey: string) => {
    setActiveMonthKey(monthKey);
    setActiveMonth(monthKey);
    const selected = getSavedRoster(monthKey);
    setRoster(selected);
    const keys = Object.keys(selected.days).sort();
    if (keys.length > 0) {
      setSelectedDateKey(keys[0]);
    }
  };

  if (!isOpen) return null;

  const sortedDates = Object.keys(roster.days).sort();
  const activeDaySchedule: DayDutySchedule | undefined = roster.days[selectedDateKey] || roster.days[sortedDates[0]];

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
      if (keys.length > 0) {
        setSelectedDateKey(keys[0]);
      }
      const seyCount = Object.values(updatedRoster.days).reduce((acc, d) => acc + d.seyrantepeStaff.length, 0);
      const sarCount = Object.values(updatedRoster.days).reduce((acc, d) => acc + d.cayirbasiStaff.length, 0);
      setNotification({
        type: 'success',
        message: `${updatedRoster.monthName} başarıyla işlendi ve sunucuya kaydedildi! (${keys.length} gün, Seyrantepe: ${seyCount} nöbetçi, Sarıyer: ${sarCount} nöbetçi)`
      });
      if (onRosterUpdated) onRosterUpdated();
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
    if (window.confirm('Nöbet listesini Ekim 2026 resmi aslına sıfırlamak istiyor musunuz?')) {
      const fresh = resetToDefaultRoster();
      setRoster(fresh);
      setActiveMonth('2026-10');
      setMonthOptions(getAvailableMonthOptions());
      setNotification({
        type: 'success',
        message: 'Nöbet listesi resmi Ekim 2026 klinik aslına sıfırlandı.'
      });
      if (onRosterUpdated) onRosterUpdated();
    }
  };

  const handleUpdateDoctorName = (
    campus: 'seyrantepe' | 'cayirbasi',
    staffId: string,
    newName: string
  ) => {
    if (!activeDaySchedule) return;

    const updatedRoster = { ...roster };
    const day = updatedRoster.days[selectedDateKey];
    if (!day) return;

    if (campus === 'seyrantepe') {
      day.seyrantepeStaff = day.seyrantepeStaff.map(s => 
        s.id === staffId ? { ...s, name: newName.toUpperCase() } : s
      );
    } else {
      day.cayirbasiStaff = day.cayirbasiStaff.map(s => 
        s.id === staffId ? { ...s, name: newName.toUpperCase() } : s
      );
    }

    setRoster(updatedRoster);
    saveRoster(updatedRoster);
    if (onRosterUpdated) onRosterUpdated();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className={`w-full max-w-6xl max-h-[94vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
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
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                  {roster.monthName}
                </h2>
                <span className="text-[11px] px-2 py-0.5 rounded-full font-mono bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Seyrantepe & Sarıyer (Çayırbaşı)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aynı kişi ardışık veya gün aşırı tarihlerde görevlendirilirse ilgili hücreler otomatik kontrol edilir.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action Bar: Upload Excel, Download Excel, Open PDF, Search */}
        <div className={`px-4 sm:px-5 py-3 border-b flex flex-wrap items-center justify-between gap-2.5 ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          {/* Left Buttons: Excel & PDF Tools */}
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
              onClick={() => fileInputRef.current?.click()}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                isDark 
                  ? 'bg-teal-600 hover:bg-teal-500 text-white' 
                  : 'bg-teal-700 hover:bg-teal-800 text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploadLoading ? 'İşleniyor...' : 'Yeni Excel Yükle (.xlsx)'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              title="Bu listenin birebir resmi Excel şablonunu (.xlsx) indirin"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Excel Formatında İndir</span>
            </button>

            <button
              type="button"
              onClick={() => downloadNovemberExcelTemplate()}
              title="Kasım 2026 için doldurmaya hazır resmi boş şablon (.xlsx) indirin"
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-teal-950/60 hover:bg-teal-900/60 border-teal-700/60 text-teal-300' 
                  : 'bg-teal-50 hover:bg-teal-100 border-teal-200 text-teal-800'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-teal-500" />
              <span>Kasım Şablonu (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Resmi Ekim 2026 aslına geri dön"
              className={`p-1.5 rounded-lg border text-xs text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 border-slate-200 dark:border-slate-700 transition-colors cursor-pointer`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Search Filter & View Switch */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-52">
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

            <div className="inline-flex rounded-lg border p-0.5 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeTab === 'table' 
                    ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-2xs font-bold' 
                    : 'text-slate-500'
                }`}
              >
                Resmi Tablo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('calendar')}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeTab === 'calendar' 
                    ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-2xs font-bold' 
                    : 'text-slate-500'
                }`}
              >
                Gün Detayı
              </button>
            </div>
          </div>
        </div>

        {/* Month Selector Strip */}
        <div className={`px-4 sm:px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-2.5 ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-100'
        }`}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <CalendarIcon className="w-3.5 h-3.5 text-teal-500" />
              Aktif Takvim Ayı:
            </span>
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
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Sunucu Senkronize
            </span>
          </div>
        </div>

        {/* Notifications (Success or Error) */}
        {notification && (
          <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
            notification.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
          }`}>
            <div className="flex items-center gap-2">
              {notification.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
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

        {/* Body Content */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[calc(94vh-180px)]">
          
          {/* VIEW A: OFFICIAL TABLE VIEW MATCHING THE PDF */}
          {activeTab === 'table' && (
            <div className="border rounded-xl overflow-hidden overflow-x-auto border-slate-300 dark:border-slate-700 text-xs shadow-xs">
              <table className="w-full text-center border-collapse">
                <thead>
                  {/* Top Super-headers: SEYRANTEPE (1-6) and SARIYER (1-4) */}
                  <tr className="bg-slate-900 text-white font-bold text-[11px] tracking-wider uppercase border-b border-slate-700">
                    <th colSpan={2} className="py-2 px-3 text-left bg-slate-950">TARİH & GÜN</th>
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
                    const isWeekend = day.isWeekend;

                    const getSeySlot = (num: number) => 
                      day.seyrantepeStaff.find(s => s.slot === `SEYRANTEPE ${num}`)?.name || day.seyrantepeStaff[num - 1]?.name || '';

                    const getSarSlot = (num: number) => 
                      day.cayirbasiStaff.find(s => s.slot === `SARIYER-${num}`)?.name || day.cayirbasiStaff[num - 1]?.name || '';

                    return (
                      <tr 
                        key={dateKey}
                        onClick={() => {
                          setSelectedDateKey(dateKey);
                        }}
                        className={`transition-colors cursor-pointer text-[11px] ${
                          isSelected
                            ? 'ring-2 ring-teal-500 font-bold bg-teal-500/10'
                            : isWeekend
                              ? isDark ? 'bg-amber-950/20 hover:bg-amber-950/30 text-amber-200' : 'bg-yellow-200/80 hover:bg-yellow-300/80 text-slate-900 font-bold'
                              : isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Tarih */}
                        <td className="py-1.5 px-3 text-left font-mono font-semibold whitespace-nowrap">
                          {day.formattedDate}
                          {isToday && (
                            <span className="ml-1.5 px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-600 text-white">
                              Bugün
                            </span>
                          )}
                        </td>

                        {/* Gün */}
                        <td className={`py-1.5 px-3 text-left whitespace-nowrap ${isWeekend ? 'font-extrabold' : ''}`}>
                          {day.dayName}
                        </td>

                        {/* Seyrantepe 1..6 */}
                        <td className="py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">{getSeySlot(1) || '-'}</td>
                        <td className="py-1.5 px-2">{getSeySlot(2) || '-'}</td>
                        <td className="py-1.5 px-2">{getSeySlot(3) || '-'}</td>
                        <td className="py-1.5 px-2">{getSeySlot(4) || '-'}</td>
                        <td className="py-1.5 px-2 text-slate-400">{getSeySlot(5) || '-'}</td>
                        <td className="py-1.5 px-2 text-slate-400 border-r border-slate-300 dark:border-slate-700">{getSeySlot(6) || '-'}</td>

                        {/* Sarıyer (Çayırbaşı) 1..4 */}
                        <td className="py-1.5 px-2 font-bold text-slate-900 dark:text-slate-100">{getSarSlot(1) || '-'}</td>
                        <td className="py-1.5 px-2">{getSarSlot(2) || '-'}</td>
                        <td className="py-1.5 px-2">{getSarSlot(3) || '-'}</td>
                        <td className="py-1.5 px-2 text-slate-400">{getSarSlot(4) || '-'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW B: DAY INSPECTOR & INLINE SWAPPER */}
          {activeTab === 'calendar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column: Month Days Grid */}
              <div className="lg:col-span-7 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
                  <span>Ayın Günleri (Seçmek için tıklayın)</span>
                  <span>{sortedDates.length} Gün</span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                  {sortedDates.map((dateKey) => {
                    const day = roster.days[dateKey];
                    const isSelected = dateKey === selectedDateKey;
                    const matchesFilter = filteredDates.includes(dateKey);
                    const isWeekend = day.isWeekend;
                    const isToday = dateKey === activeShiftKey;

                    return (
                      <button
                        key={dateKey}
                        type="button"
                        onClick={() => setSelectedDateKey(dateKey)}
                        className={`p-2 rounded-xl text-center border transition-all cursor-pointer relative flex flex-col items-center justify-center min-h-[58px] ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/30'
                            : matchesFilter
                              ? isWeekend
                                ? isDark ? 'bg-amber-950/40 border-amber-800/80 text-amber-200' : 'bg-yellow-200 border-yellow-300 text-slate-900 font-bold'
                                : isDark ? 'bg-slate-800/50 border-slate-800 text-slate-200 hover:border-slate-600' : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                              : 'opacity-30 border-transparent bg-slate-100 dark:bg-slate-800/30'
                        }`}
                      >
                        {isToday && (
                          <span className="absolute top-1 right-1 px-1 py-0.2 rounded text-[7px] font-bold bg-emerald-600 text-white leading-none">
                            Bugün
                          </span>
                        )}
                        <span className="text-[10px] uppercase font-bold opacity-75">
                          {day.dayName.substring(0, 3)}
                        </span>
                        <span className="text-base font-extrabold leading-tight">
                          {day.dayNumber}
                        </span>

                        <div className="flex items-center gap-1 mt-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-teal-500'}`} />
                          <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-200' : 'bg-amber-500'}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Day Duty Inspector & Instant Shift Swapper */}
              <div className="lg:col-span-5 flex flex-col">
                {activeDaySchedule ? (
                  <div className={`p-4 rounded-xl border flex flex-col h-full transition-colors ${
                    isDark ? 'bg-slate-800/50 border-slate-700/80' : 'bg-slate-50/70 border-slate-200'
                  }`}>
                    
                    {/* Day Card Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Seçili Gün Nöbetçileri
                        </span>
                        <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <CalendarIcon className="w-3.5 h-3.5 text-teal-500" />
                          <span>{activeDaySchedule.formattedDate} ({activeDaySchedule.dayName})</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsEditing(!isEditing)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          isEditing 
                            ? 'bg-teal-600 text-white border-teal-600' 
                            : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-black'
                        }`}
                      >
                        {isEditing ? <Check className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                        <span>{isEditing ? 'Tamamla' : 'Düzenle'}</span>
                      </button>
                    </div>

                    {/* SEYRANTEPE EKİBİ */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        <span>Seyrantepe Yerleşkesi</span>
                      </div>
                      <div className="space-y-1.5">
                        {activeDaySchedule.seyrantepeStaff.map((staff) => (
                          <div 
                            key={staff.id}
                            className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={staff.name}
                                  onChange={(e) => handleUpdateDoctorName('seyrantepe', staff.id, e.target.value)}
                                  className={`w-full px-2 py-0.5 rounded border text-xs outline-none uppercase font-bold ${
                                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                                  }`}
                                />
                              ) : (
                                <span className="font-bold truncate block">
                                  {staff.name}
                                </span>
                              )}
                            </div>
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono font-bold">
                              {staff.slot}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SARIYER (ÇAYIRBAŞI) EKİBİ */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Sarıyer (Çayırbaşı) Yerleşkesi</span>
                      </div>
                      <div className="space-y-1.5">
                        {activeDaySchedule.cayirbasiStaff.map((staff) => (
                          <div 
                            key={staff.id}
                            className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                              isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={staff.name}
                                  onChange={(e) => handleUpdateDoctorName('cayirbasi', staff.id, e.target.value)}
                                  className={`w-full px-2 py-0.5 rounded border text-xs outline-none uppercase font-bold ${
                                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                                  }`}
                                />
                              ) : (
                                <span className="font-bold truncate block">
                                  {staff.name}
                                </span>
                              )}
                            </div>
                            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono font-bold">
                              {staff.slot}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-3 p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-[11px] text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Nöbet değişimi anında kaydedildi ve ana ekrana yansıdı.</span>
                      </div>
                    )}

                  </div>
                ) : null}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
          isDark ? 'bg-slate-800/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-500" />
            <span>Şişli Hamidiye Etfal EAH Anesteziyoloji ve Reanimasyon Kliniği Resmi Nöbet Çizelgesi</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>

    </div>
  );
};
