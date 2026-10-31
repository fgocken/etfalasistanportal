import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calendar, 
  Upload, 
  UserCheck, 
  Lock, 
  ShieldCheck, 
  Check, 
  Edit2, 
  AlertCircle, 
  RotateCcw,
  Building2,
  Activity,
  Filter
} from 'lucide-react';
import { WeeklyWorkSchedule, UnitAssignmentRow, WeekOption } from '../../types/weeklySchedule';
import { 
  getSavedWeeklySchedule, 
  saveWeeklyScheduleToServer, 
  fetchServerWeeklySchedule,
  getIstanbulDateInfo,
  getAvailableWeekOptions,
  getActiveWeekKey,
  setActiveWeekKey,
  OFFICIAL_OCTOBER_WEEK_SCHEDULE,
  OFFICIAL_NOVEMBER_WEEK_SCHEDULE
} from '../../services/weeklyScheduleService';
import { isRosterAdminUnlocked, getPreviousDayPostOpDuty } from '../roster/DutyRosterService';
import { RosterAdminAuthModal } from '../roster/RosterAdminAuthModal';
import { WeeklyCellEditModal } from './WeeklyCellEditModal';
import { WeeklyScheduleUploadModal } from './WeeklyScheduleUploadModal';

interface WeeklyScheduleToolViewProps {
  isDark: boolean;
}

export const WeeklyScheduleToolView: React.FC<WeeklyScheduleToolViewProps> = ({ isDark }) => {
  const [schedule, setSchedule] = useState<WeeklyWorkSchedule>(() => getSavedWeeklySchedule());
  const [availableWeeks, setAvailableWeeks] = useState<WeekOption[]>(() => getAvailableWeekOptions());
  const [searchDoctor, setSearchDoctor] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'ameliyathane' | 'yogun_bakim' | 'poliklinik' | 'diger'>('all');
  
  // Admin & Edit Mode
  const [isAdminUnlocked, setIsAdminUnlocked] = useState<boolean>(() => isRosterAdminUnlocked());
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<'upload' | 'edit' | null>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  // Cell Edit Modal state
  const [editingCell, setEditingCell] = useState<{
    unitId: string;
    unitName: string;
    dateKey: string;
    dayFormatted: string;
    dayName: string;
    doctors: string[];
  } | null>(null);

  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Today's date info for column highlight
  const todayInfo = getIstanbulDateInfo();

  const refreshWeekOptions = () => {
    setAvailableWeeks(getAvailableWeekOptions());
  };

  useEffect(() => {
    setIsAdminUnlocked(isRosterAdminUnlocked());
    fetchServerWeeklySchedule().then(fresh => {
      setSchedule(fresh);
      refreshWeekOptions();
    });

    const handleUpdated = (e: any) => {
      if (e.detail) {
        setSchedule(e.detail);
      } else {
        setSchedule(getSavedWeeklySchedule());
      }
      refreshWeekOptions();
    };

    const handleWeekChanged = (e: any) => {
      const wk = e.detail?.weekKey;
      if (wk) {
        setSchedule(getSavedWeeklySchedule(wk));
        refreshWeekOptions();
      }
    };

    window.addEventListener('etfal-schedule-updated', handleUpdated);
    window.addEventListener('etfal-active-week-changed', handleWeekChanged);
    return () => {
      window.removeEventListener('etfal-schedule-updated', handleUpdated);
      window.removeEventListener('etfal-active-week-changed', handleWeekChanged);
    };
  }, []);

  // Admin Actions
  const handleRequestUpload = () => {
    if (isRosterAdminUnlocked()) {
      setShowUploadModal(true);
    } else {
      setPendingAction('upload');
      setShowAuthModal(true);
    }
  };

  const handleToggleEditMode = () => {
    if (isEditMode) {
      setIsEditMode(false);
      setNotification({
        type: 'success',
        message: 'Program düzenleme modu kapatıldı.'
      });
      return;
    }

    if (isRosterAdminUnlocked()) {
      setIsEditMode(true);
      setNotification({
        type: 'success',
        message: 'Düzenleme modu aktif. Değiştirmek istediğiniz hücreye tıklayınız.'
      });
    } else {
      setPendingAction('edit');
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAdminUnlocked(true);
    if (pendingAction === 'upload') {
      setShowUploadModal(true);
    } else if (pendingAction === 'edit') {
      setIsEditMode(true);
      setNotification({
        type: 'success',
        message: 'Admin yetkilendirmesi sağlandı. Düzenleme modu aktif!'
      });
    }
    setPendingAction(null);
  };

  const handleSaveCell = (newDoctors: string[]) => {
    if (!editingCell) return;
    const { unitId, dateKey } = editingCell;

    const updatedRows = schedule.rows.map(row => {
      if (row.unitId === unitId) {
        return {
          ...row,
          assignments: {
            ...row.assignments,
            [dateKey]: newDoctors
          }
        };
      }
      return row;
    });

    const updatedSchedule: WeeklyWorkSchedule = {
      ...schedule,
      rows: updatedRows,
      updatedAt: new Date().toISOString()
    };

    setSchedule(updatedSchedule);
    saveWeeklyScheduleToServer(updatedSchedule);
    setNotification({
      type: 'success',
      message: `${editingCell.unitName} (${editingCell.dayFormatted}) güncellendi ve kaydedildi.`
    });
  };

  const handleCellClick = (row: UnitAssignmentRow, day: { dateKey: string; dateFormatted: string; dayName: string }) => {
    if (!isEditMode) return; // Edit modu kapalıyken hiçbir şey yapma
    setEditingCell({
      unitId: row.unitId,
      unitName: row.unitName,
      dateKey: day.dateKey,
      dayFormatted: day.dateFormatted,
      dayName: day.dayName,
      doctors: row.assignments[day.dateKey] || []
    });
  };

  const handleSelectWeek = (weekKey: string) => {
    setActiveWeekKey(weekKey);
    const target = getSavedWeeklySchedule(weekKey);
    setSchedule(target);
    saveWeeklyScheduleToServer(target);
    setNotification({
      type: 'success',
      message: `${target.title || target.dateRangeText} seçildi ve aktif edildi.`
    });
  };

  const handleResetToOfficial = () => {
    if (!isRosterAdminUnlocked()) {
      setPendingAction('edit');
      setShowAuthModal(true);
      return;
    }
    if (window.confirm('Haftalık programı resmi 26-30 Ekim aslına döndürmek istiyor musunuz?')) {
      setSchedule(OFFICIAL_OCTOBER_WEEK_SCHEDULE);
      saveWeeklyScheduleToServer(OFFICIAL_OCTOBER_WEEK_SCHEDULE);
      setNotification({
        type: 'success',
        message: 'Program resmi 26-30 Ekim aslına sıfırlandı.'
      });
    }
  };

  // Filter rows
  const cleanSearch = searchDoctor.trim().toUpperCase();
  const filteredRows = schedule.rows.filter(row => {
    if (categoryFilter !== 'all' && row.category !== categoryFilter) return false;
    if (!cleanSearch) return true;

    // Check if any doctor in any day matches search
    return Object.values(row.assignments).some(docs => 
      docs.some(doc => doc.toUpperCase().includes(cleanSearch))
    ) || row.unitName.toUpperCase().includes(cleanSearch);
  });

  // Calculate doctor stats if search is active
  const searchResultsCount = cleanSearch
    ? schedule.rows.reduce((acc, row) => {
        return acc + Object.values(row.assignments).reduce((dAcc, docs) => {
          return dAcc + docs.filter(d => d.toUpperCase().includes(cleanSearch)).length;
        }, 0);
      }, 0)
    : 0;

  return (
    <div className={`w-full rounded-2xl border flex flex-col shadow-sm transition-all overflow-hidden ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* 1. Header Bar: Title, Search, Actions */}
      <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-slate-800/80 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isDark ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-800'
          }`}>
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                {schedule.title}
              </h2>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                isDark ? 'bg-teal-950/80 text-teal-300 border border-teal-800/50' : 'bg-teal-50 text-teal-700 border border-teal-200'
              }`}>
                {schedule.dateRangeText}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Ameliyathane salonları, yoğun bakımlar ve poliklinik hekim dağılımı
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* PDF Yükle Butonu */}
          <button
            type="button"
            onClick={handleRequestUpload}
            title={isAdminUnlocked ? 'Haftalık PDF programı yükle' : 'Yükleme yapmak için admin şifresi gereklidir'}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              isDark ? 'bg-teal-600 hover:bg-teal-500 text-white' : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>PDF Yükle</span>
            {!isAdminUnlocked && <Lock className="w-3 h-3 opacity-70 ml-0.5" />}
          </button>

          {/* Düzenleme Modu Butonu */}
          <button
            type="button"
            onClick={handleToggleEditMode}
            title={isEditMode ? 'Düzenleme modunu kapat' : 'Hekim yerleşimi değiştir (Admin şifresi gerektirir)'}
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
            <span>{isEditMode ? 'Düzenleme Aktif' : 'Mesai Değişimi'}</span>
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
            onClick={handleResetToOfficial}
            title="Orijinal 26-30 Ekim haftasına sıfırla"
            className="p-1.5 rounded-lg border text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Week Switcher Strip (Haftalar Arası Kolay Geçiş) */}
      <div className={`px-4 sm:px-5 py-2 border-b flex items-center justify-between gap-3 overflow-x-auto ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100/70 border-slate-200'
      }`}>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            Program Haftası:
          </span>
          <div className="flex items-center gap-1.5">
            {availableWeeks.map(opt => {
              const isSelected = opt.key === schedule.weekKey;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => handleSelectWeek(opt.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs ${
                    isSelected
                      ? 'bg-teal-700 text-white shadow-xs'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-teal-200" />}
                  <span>{opt.displayName}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handleRequestUpload}
          className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <Upload className="w-3 h-3" />
          <span>+ Yeni Hafta Yükle</span>
        </button>
      </div>

      {/* 3. Filter & Search Strip */}
      <div className={`px-4 sm:px-5 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-100'
      }`}>
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filtre:
          </span>
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'ameliyathane', label: 'Ameliyathaneler' },
            { id: 'yogun_bakim', label: 'Yoğun Bakım & Post-op' },
            { id: 'poliklinik', label: 'Poliklinikler' },
            { id: 'diger', label: 'Nöbet Ertesi / İzin' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategoryFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                categoryFilter === tab.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Doctor Search */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Hekim ara (örn. EREN, BERKAN)..."
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
              className={`w-full pl-8 pr-3 py-1 rounded-lg text-xs border font-semibold outline-none transition-colors ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700 text-white focus:border-teal-500' 
                  : 'bg-white border-slate-200 text-slate-900 focus:border-teal-600'
              }`}
            />
          </div>
          {cleanSearch && (
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 whitespace-nowrap">
              {searchResultsCount} görev bulundu
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 whitespace-nowrap ml-auto sm:ml-0">
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
            ×
          </button>
        </div>
      )}

      {/* Edit Mode Active Banner */}
      {isEditMode && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-800 dark:text-amber-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="font-bold">Mesai Düzenleme Modu Aktif:</span>
            <span>Değiştirmek istediğiniz hekim hücresine tıklayarak yeni doktoru giriniz.</span>
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

      {/* 3. High-Density Weekly Grid Table */}
      <div className="p-3 sm:p-5 overflow-y-auto">
        <div className="border rounded-xl overflow-hidden overflow-x-auto border-slate-300 dark:border-slate-700 text-xs shadow-xs">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-[11px] tracking-wider uppercase border-b border-slate-700">
                <th className="py-2.5 px-3 text-left w-56 bg-slate-950">
                  GÖREV YERİ / BİRİM
                </th>
                {schedule.days.map((day) => {
                  const isToday = day.dateKey === todayInfo.dateKey;
                  return (
                    <th 
                      key={day.dateKey}
                      className={`py-2 px-3 border-l border-slate-700 transition-colors ${
                        isToday ? 'bg-teal-900/90 text-teal-200' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] opacity-75 font-mono">{day.dateFormatted}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black">{day.dayName}</span>
                          {isToday && (
                            <span className="px-1 py-0.2 rounded text-[9px] bg-teal-500 text-slate-950 font-black">
                              Bugün
                            </span>
                          )}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredRows.map((row) => {
                const isSeyPostOp = row.isPostOp === 'seyrantepe';
                const isSarPostOp = row.isPostOp === 'sariyer';
                const isPostOpRow = isSeyPostOp || isSarPostOp;

                return (
                  <tr 
                    key={row.unitId}
                    className={`transition-colors text-[11px] ${
                      isPostOpRow
                        ? isDark ? 'bg-teal-950/20' : 'bg-teal-50/60'
                        : isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Görev Yeri / Birim Adı */}
                    <td className="py-2 px-3 text-left font-bold border-r border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <span>{row.unitName}</span>
                        {isSeyPostOp && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30 whitespace-nowrap">
                            Seyrantepe Post-op
                          </span>
                        )}
                        {isSarPostOp && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 whitespace-nowrap">
                            Sarıyer Post-op
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Gün Sütunları */}
                    {schedule.days.map((day) => {
                      const isToday = day.dateKey === todayInfo.dateKey;
                      const docs = row.assignments[day.dateKey] || [];
                      const isMatch = cleanSearch && docs.some(d => d.toUpperCase().includes(cleanSearch));

                      if (day.isHoliday) {
                        return (
                          <td 
                            key={day.dateKey}
                            className="py-2 px-2 text-center text-rose-500/70 dark:text-rose-400/70 font-bold bg-rose-500/5 border-l border-slate-200 dark:border-slate-800"
                          >
                            <span className="text-[10px] tracking-widest font-mono uppercase">
                              {day.holidayNote || 'TATİL'}
                            </span>
                          </td>
                        );
                      }

                      const handover = isPostOpRow ? getPreviousDayPostOpDuty(day.dateKey) : null;
                      const handoverDoc = isSeyPostOp ? handover?.seyrantepeDutyDoc : handover?.sariyerDutyDoc;

                      return (
                        <td
                          key={day.dateKey}
                          onClick={() => handleCellClick(row, day)}
                          title={isEditMode ? `Düzenle: ${row.unitName} - ${day.dateFormatted}` : undefined}
                          className={`py-1.5 px-2 text-center transition-all border-l border-slate-200 dark:border-slate-800 ${
                            isToday ? 'bg-teal-500/5 font-semibold' : ''
                          } ${
                            isMatch ? 'ring-2 ring-teal-500 bg-teal-500/20 font-black' : ''
                          } ${
                            isEditMode ? 'cursor-pointer hover:bg-amber-500/15 hover:ring-1 hover:ring-amber-500' : ''
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center gap-0.5">
                            <div className="flex flex-wrap items-center justify-center gap-1">
                              {docs.length > 0 ? (
                                docs.map((doc, i) => {
                                  const isDocMatch = cleanSearch && doc.toUpperCase().includes(cleanSearch);
                                  return (
                                    <span
                                      key={i}
                                      className={`px-1.5 py-0.5 rounded text-[11px] font-bold tracking-tight ${
                                        isDocMatch
                                          ? 'bg-teal-600 text-white shadow-2xs'
                                          : isPostOpRow
                                            ? isSeyPostOp
                                              ? 'text-teal-700 dark:text-teal-300 bg-teal-500/10'
                                              : 'text-amber-700 dark:text-amber-300 bg-amber-500/10'
                                            : 'text-slate-800 dark:text-slate-200'
                                      }`}
                                    >
                                      {doc}
                                    </span>
                                  );
                                })
                              ) : (
                                <span className="text-slate-400 dark:text-slate-600 font-normal">-</span>
                              )}
                              {isEditMode && (
                                <Edit2 className="w-2.5 h-2.5 opacity-50 text-amber-500 ml-1 shrink-0" />
                              )}
                            </div>

                            {/* Dünkü Nöbetçiden Devir Bilgisi */}
                            {handoverDoc && docs.length > 0 && (
                              <span className={`text-[9px] font-medium tracking-tight px-1 py-0.2 rounded whitespace-nowrap ${
                                isSeyPostOp
                                  ? 'text-teal-700/90 dark:text-teal-300/90 bg-teal-500/15'
                                  : 'text-amber-700/90 dark:text-amber-300/90 bg-amber-500/15'
                              }`}>
                                ({handoverDoc} Nöbetçiydi)
                              </span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <RosterAdminAuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingAction(null);
        }}
        onSuccess={handleAuthSuccess}
        isDark={isDark}
        actionTitle="Haftalık Program Yönetici Girişi"
        actionDescription="Haftalık PDF programı yüklemek veya hekim mesai dağılımını düzenlemek için lütfen admin şifresini giriniz."
      />

      {editingCell && (
        <WeeklyCellEditModal
          isOpen={true}
          onClose={() => setEditingCell(null)}
          onSave={handleSaveCell}
          isDark={isDark}
          unitName={editingCell.unitName}
          dayFormatted={editingCell.dayFormatted}
          dayName={editingCell.dayName}
          initialDoctors={editingCell.doctors}
        />
      )}

      <WeeklyScheduleUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSaveSchedule={(newSch) => {
          setSchedule(newSch);
          saveWeeklyScheduleToServer(newSch);
          setNotification({
            type: 'success',
            message: 'Yeni haftalık program başarıyla yüklendi ve senkronize edildi!'
          });
        }}
        isDark={isDark}
        currentSchedule={schedule}
      />
    </div>
  );
};
