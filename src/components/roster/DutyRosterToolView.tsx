import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Download, 
  Calendar as CalendarIcon, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  FileSpreadsheet, 
  Edit3, 
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { MonthDutyRoster, DayDutySchedule } from './DutyRosterTypes';
import { 
  getSavedRoster, 
  saveRoster, 
  downloadExcelTemplate, 
  parseExcelRoster, 
  resetToDefaultRoster
} from './DutyRosterService';

interface DutyRosterToolViewProps {
  isDark: boolean;
}

export const DutyRosterToolView: React.FC<DutyRosterToolViewProps> = ({ isDark }) => {
  const [roster, setRoster] = useState<MonthDutyRoster>(() => getSavedRoster());
  const [selectedDateKey, setSelectedDateKey] = useState<string>('2026-10-22');

  const [activeTab, setActiveTab] = useState<'table' | 'calendar'>('table');
  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sortedDates = Object.keys(roster.days).sort();
  const activeDaySchedule: DayDutySchedule | undefined = roster.days[selectedDateKey] || roster.days[sortedDates[0]];

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

  // Handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    setNotification(null);

    try {
      const updatedRoster = await parseExcelRoster(file);
      setRoster(updatedRoster);
      setNotification({
        type: 'success',
        message: `Excel başarıyla yüklendi! (${Object.keys(updatedRoster.days).length} günlük nöbet listesi güncellendi)`
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
    if (window.confirm('Nöbet listesini Ekim 2026 resmi aslına sıfırlamak istiyor musunuz?')) {
      const fresh = resetToDefaultRoster();
      setRoster(fresh);
      setNotification({
        type: 'success',
        message: 'Nöbet listesi resmi Ekim 2026 aslına sıfırlandı.'
      });
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
    <div className="space-y-4 animate-in fade-in duration-200">
      
      {/* Tool Header Card */}
      <div className={`p-4 sm:p-6 rounded-2xl border transition-colors shadow-xs ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-800'
            }`}>
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {roster.monthName}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                  Seyrantepe & Sarıyer
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Aylık nöbet çizelgesi, resmi Excel (.xlsx) yükleme & indirme ve hekim nöbet takas yönetimi.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white shadow-2xs transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{uploadLoading ? 'İşleniyor...' : 'Yeni Excel Yükle (.xlsx)'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Excel Formatında İndir</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              title="Resmi Ekim 2026 aslına sıfırla"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <div className={`mt-4 p-3 rounded-xl text-xs flex items-center justify-between border ${
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
              className="p-1 cursor-pointer hover:opacity-75"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Filter & View Switcher Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Doktor ara (örn. FATMA, SÜLEYMAN)..."
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
              className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-xs border outline-none font-semibold transition-colors ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-white focus:border-teal-500' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-teal-600'
              }`}
            />
          </div>

          {/* View Toggles & Keyboard Tip */}
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-[11px] text-slate-400">
              Klavyede <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono">←</kbd> ve <kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-mono">→</kbd> tuşları ile gün geçişi yapabilirsiniz.
            </span>

            <div className="inline-flex rounded-lg border p-0.5 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
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
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
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

      </div>

      {/* Main Content: TABLE VIEW */}
      {activeTab === 'table' && (
        <div className={`border rounded-2xl overflow-hidden shadow-xs ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse text-xs">
              <thead>
                {/* Hospital super-headers */}
                <tr className="bg-slate-900 text-white font-bold text-[11px] tracking-wider uppercase border-b border-slate-700">
                  <th colSpan={2} className="py-2.5 px-4 text-left bg-slate-950">TARİH & GÜN</th>
                  <th colSpan={6} className="py-2.5 px-3 bg-teal-900/90 border-x border-teal-800 text-teal-100">
                    SEYRANTEPE YERLEŞKESİ (1 - 6)
                  </th>
                  <th colSpan={4} className="py-2.5 px-3 bg-amber-900/90 text-amber-100">
                    SARIYER ÇAYIRBAŞI YERLEŞKESİ (1 - 4)
                  </th>
                </tr>
                {/* Column Slot Headers */}
                <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                  isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}>
                  <th className="py-2 px-4 text-left w-28">TARİH</th>
                  <th className="py-2 px-3 text-left w-28">GÜN</th>
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
                  const isToday = dateKey === '2026-10-22';
                  const isWeekend = day.isWeekend;

                  const getSeySlot = (num: number) => 
                    day.seyrantepeStaff.find(s => s.slot === `SEYRANTEPE ${num}`)?.name || day.seyrantepeStaff[num - 1]?.name || '';

                  const getSarSlot = (num: number) => 
                    day.cayirbasiStaff.find(s => s.slot === `SARIYER-${num}`)?.name || day.cayirbasiStaff[num - 1]?.name || '';

                  return (
                    <tr 
                      key={dateKey}
                      onClick={() => setSelectedDateKey(dateKey)}
                      className={`transition-colors cursor-pointer text-[11px] ${
                        isSelected
                          ? 'ring-2 ring-teal-500 font-bold bg-teal-500/10'
                          : isWeekend
                            ? isDark ? 'bg-amber-950/20 hover:bg-amber-950/30 text-amber-200' : 'bg-yellow-200/80 hover:bg-yellow-300/80 text-slate-900 font-bold'
                            : isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-2 px-4 text-left font-mono font-semibold whitespace-nowrap">
                        {day.formattedDate}
                        {isToday && (
                          <span className="ml-2 px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-600 text-white">
                            Bugün
                          </span>
                        )}
                      </td>

                      <td className={`py-2 px-3 text-left whitespace-nowrap ${isWeekend ? 'font-extrabold' : ''}`}>
                        {day.dayName}
                      </td>

                      {/* Seyrantepe 1..6 */}
                      <td className="py-2 px-2 font-bold text-slate-900 dark:text-slate-100">{getSeySlot(1) || '-'}</td>
                      <td className="py-2 px-2">{getSeySlot(2) || '-'}</td>
                      <td className="py-2 px-2">{getSeySlot(3) || '-'}</td>
                      <td className="py-2 px-2">{getSeySlot(4) || '-'}</td>
                      <td className="py-2 px-2 text-slate-400">{getSeySlot(5) || '-'}</td>
                      <td className="py-2 px-2 text-slate-400 border-r border-slate-300 dark:border-slate-700">{getSeySlot(6) || '-'}</td>

                      {/* Sarıyer (Çayırbaşı) 1..4 */}
                      <td className="py-2 px-2 font-bold text-slate-900 dark:text-slate-100">{getSarSlot(1) || '-'}</td>
                      <td className="py-2 px-2">{getSarSlot(2) || '-'}</td>
                      <td className="py-2 px-2">{getSarSlot(3) || '-'}</td>
                      <td className="py-2 px-2 text-slate-400">{getSarSlot(4) || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Main Content: CALENDAR & DAY INSPECTOR */}
      {activeTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Left: Days Grid */}
          <div className={`p-5 rounded-2xl border lg:col-span-7 transition-colors shadow-xs ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500">
              <span>Ekim 2026 Nöbet Takvimi</span>
              <span>{sortedDates.length} Gün</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {sortedDates.map((dateKey) => {
                const day = roster.days[dateKey];
                const isSelected = dateKey === selectedDateKey;
                const matchesFilter = filteredDates.includes(dateKey);
                const isWeekend = day.isWeekend;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() => setSelectedDateKey(dateKey)}
                    className={`p-2.5 rounded-xl text-center border transition-all cursor-pointer relative flex flex-col items-center justify-center min-h-[64px] ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/30'
                        : matchesFilter
                          ? isWeekend
                            ? isDark ? 'bg-amber-950/40 border-amber-800/80 text-amber-200' : 'bg-yellow-200 border-yellow-300 text-slate-900 font-bold'
                            : isDark ? 'bg-slate-800/50 border-slate-800 text-slate-200 hover:border-slate-600' : 'bg-white border-slate-200 text-slate-700 hover:border-teal-300'
                          : 'opacity-30 border-transparent bg-slate-100 dark:bg-slate-800/30'
                    }`}
                  >
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

          {/* Right: Selected Day Inspector & Inline Shift Swap */}
          <div className="lg:col-span-5">
            {activeDaySchedule ? (
              <div className={`p-5 rounded-2xl border transition-colors shadow-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Seçili Gün Nöbetçileri
                    </span>
                    <div className="text-sm font-bold flex items-center gap-1.5 mt-0.5">
                      <CalendarIcon className="w-4 h-4 text-teal-500" />
                      <span>{activeDaySchedule.formattedDate} ({activeDaySchedule.dayName})</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isEditing 
                        ? 'bg-teal-600 text-white border-teal-600' 
                        : isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-black'
                    }`}
                  >
                    {isEditing ? <Check className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                    <span>{isEditing ? 'Tamamla' : 'Nöbet Değişimi'}</span>
                  </button>
                </div>

                {/* Seyrantepe Section */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    <span>Seyrantepe Yerleşkesi</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeDaySchedule.seyrantepeStaff.map((staff) => (
                      <div 
                        key={staff.id}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                          isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          {isEditing ? (
                            <input
                              type="text"
                              value={staff.name}
                              onChange={(e) => handleUpdateDoctorName('seyrantepe', staff.id, e.target.value)}
                              className={`w-full px-2 py-1 rounded border text-xs outline-none uppercase font-bold ${
                                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          ) : (
                            <span className="font-bold truncate block">
                              {staff.name}
                            </span>
                          )}
                        </div>
                        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-bold">
                          {staff.slot}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Çayırbaşı Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Sarıyer (Çayırbaşı) Yerleşkesi</span>
                  </div>
                  <div className="space-y-1.5">
                    {activeDaySchedule.cayirbasiStaff.map((staff) => (
                      <div 
                        key={staff.id}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                          isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          {isEditing ? (
                            <input
                              type="text"
                              value={staff.name}
                              onChange={(e) => handleUpdateDoctorName('cayirbasi', staff.id, e.target.value)}
                              className={`w-full px-2 py-1 rounded border text-xs outline-none uppercase font-bold ${
                                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                              }`}
                            />
                          ) : (
                            <span className="font-bold truncate block">
                              {staff.name}
                            </span>
                          )}
                        </div>
                        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-bold">
                          {staff.slot}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

    </div>
  );
};
