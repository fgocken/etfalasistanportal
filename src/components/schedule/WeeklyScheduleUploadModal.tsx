import React, { useState, useRef } from 'react';
import { X, Upload, FileText, Check, AlertCircle, Calendar, FileSpreadsheet, Loader2, Sparkles, Building2 } from 'lucide-react';
import { WeeklyWorkSchedule } from '../../types/weeklySchedule';
import { 
  OFFICIAL_OCTOBER_WEEK_SCHEDULE, 
  OFFICIAL_NOVEMBER_WEEK_SCHEDULE,
  parseWeeklyScheduleFile,
  saveWeeklyScheduleToServer,
  setActiveWeekKey
} from '../../services/weeklyScheduleService';

interface WeeklyScheduleUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSchedule: (schedule: WeeklyWorkSchedule) => void;
  isDark: boolean;
  currentSchedule: WeeklyWorkSchedule;
}

export const WeeklyScheduleUploadModal: React.FC<WeeklyScheduleUploadModalProps> = ({
  isOpen,
  onClose,
  onSaveSchedule,
  isDark,
  currentSchedule
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [parsedPreview, setParsedPreview] = useState<WeeklyWorkSchedule | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [uploadedFileType, setUploadedFileType] = useState<'excel' | 'pdf' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setFeedback(null);
    setParsedPreview(null);

    const isPdf = file.name.toLowerCase().endsWith('.pdf');
    const isExcel = file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls');
    setUploadedFileName(file.name);
    setUploadedFileType(isPdf ? 'pdf' : (isExcel ? 'excel' : null));

    try {
      // 1. Automatically parse either Excel or PDF
      const schedule = await parseWeeklyScheduleFile(file);
      setParsedPreview(schedule);
      setFeedback({
        type: 'success',
        message: `Otomatik algılandı: "${schedule.title}" (${schedule.days[0]?.dateFormatted} - ${schedule.days[4]?.dateFormatted}) • ${schedule.rows.length} salon hazır.`
      });
    } catch (err: any) {
      console.error('File parsing error:', err);
      setFeedback({
        type: 'error',
        message: 'Dosya analiz edilirken hata oluştu: ' + (err?.message || 'Geçersiz dosya formatı')
      });
    } finally {
      setIsProcessing(false);
      // Reset input value so same file can be re-selected if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleConfirmPublish = async () => {
    if (!parsedPreview) return;

    setIsProcessing(true);
    try {
      setActiveWeekKey(parsedPreview.weekKey);
      onSaveSchedule(parsedPreview);
      await saveWeeklyScheduleToServer(parsedPreview);

      setFeedback({
        type: 'success',
        message: 'Haftalık program Firestore bulutuna başarıyla yüklendi ve tüm kullanıcılar için canlı güncellendi!'
      });

      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: 'Bulut eşitleme hatası: ' + (err?.message || 'Bilinmeyen hata')
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyPreset = async (preset: 'nov' | 'oct') => {
    setIsProcessing(true);
    try {
      const scheduleToApply = preset === 'nov' ? OFFICIAL_NOVEMBER_WEEK_SCHEDULE : OFFICIAL_OCTOBER_WEEK_SCHEDULE;
      setActiveWeekKey(scheduleToApply.weekKey);
      onSaveSchedule(scheduleToApply);
      await saveWeeklyScheduleToServer(scheduleToApply);
      setFeedback({
        type: 'success',
        message: `${scheduleToApply.title} başarıyla yüklendi ve aktif edildi.`
      });
      setTimeout(() => {
        setIsProcessing(false);
        onClose();
      }, 800);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: 'Şablon uygulanırken hata: ' + (err?.message || 'Bilinmeyen hata')
      });
      setIsProcessing(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-lg rounded-2xl border p-5 sm:p-6 shadow-2xl space-y-4 transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2.5 rounded-xl ${
              isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-100 text-teal-800'
            }`}>
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold tracking-tight">Haftalık Mesai Programı Yükle</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Excel (.xlsx, .xls) veya PDF (.pdf) formatında dosya yükleyebilirsiniz
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

        {/* Feedback Alert */}
        {feedback && (
          <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
          }`}>
            {feedback.type === 'success' ? (
              <Check className="w-4 h-4 shrink-0 text-emerald-500" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {/* Upload Drop Zone: Supports both Excel and PDF */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Yeni Haftalık Program Dosyası (Excel veya PDF)
          </label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-5 sm:p-6 text-center flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
              isDark 
                ? 'border-slate-700 hover:border-teal-500 bg-slate-800/40 hover:bg-slate-800/70' 
                : 'border-slate-300 hover:border-teal-600 bg-slate-50 hover:bg-teal-50/30'
            }`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-2 py-3">
                <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                  Dosya analiz ediliyor (Hafta ve salonlar taranıyor)...
                </span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold">
                    Excel (.xlsx, .xls) veya PDF (.pdf) dosyasını buraya bırakın veya seçin
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Tarihler, salonlar ve hekim görevlendirmeleri otomatik algılanır
                  </p>
                </div>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls, .pdf"
              onChange={handleFileUpload}
              disabled={isProcessing}
              className="hidden"
            />
          </div>
        </div>

        {/* Parsed Preview Card if file was analyzed */}
        {parsedPreview && (
          <div className={`p-4 rounded-xl border space-y-3 ${
            isDark ? 'bg-slate-800/70 border-teal-500/30' : 'bg-teal-50/50 border-teal-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-500" />
                Algılanan Haftalık Program Önizlemesi
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 uppercase">
                {uploadedFileType === 'pdf' ? 'PDF Belgesi' : 'Excel Tablosu'}
              </span>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">
                {parsedPreview.title}
              </div>
              <div className="text-slate-500 dark:text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {parsedPreview.dateRangeText}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {parsedPreview.rows.length} Salon / Birim
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmPublish}
              disabled={isProcessing}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Yayınlanıyor...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Onayla ve Canlı Yayına Al (Firebase)</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Quick Presets */}
        <div className="space-y-2 pt-1 border-t border-slate-200 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Veya Hazır Resmi Haftaları Seçin
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleApplyPreset('nov')}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                currentSchedule.weekKey === '2026-W45'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                  : isDark
                    ? 'border-slate-800 hover:border-slate-700 bg-slate-800/50 text-slate-200'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>02 - 06 Kasım 2026</span>
                {currentSchedule.weekKey === '2026-W45' && <Check className="w-4 h-4 text-teal-500" />}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                02-06 Kasım Haftalık Programı
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset('oct')}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                currentSchedule.weekKey === '2026-W44'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                  : isDark
                    ? 'border-slate-800 hover:border-slate-700 bg-slate-800/50 text-slate-200'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>26 - 30 Ekim 2026</span>
                {currentSchedule.weekKey === '2026-W44' && <Check className="w-4 h-4 text-teal-500" />}
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                29 Ekim Cumhuriyet Bayramı haftası
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border ${
              isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
            }`}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
