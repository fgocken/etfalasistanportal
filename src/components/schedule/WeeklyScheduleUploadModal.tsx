import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  Check, 
  AlertCircle, 
  Calendar, 
  FileSpreadsheet, 
  Loader2, 
  Sparkles, 
  Building2,
  ChevronDown,
  ChevronUp,
  Copy,
  Info,
  CheckCircle2,
  RotateCcw
} from 'lucide-react';
import { WeeklyWorkSchedule } from '../../types/weeklySchedule';
import { 
  OFFICIAL_OCTOBER_WEEK_SCHEDULE, 
  OFFICIAL_NOVEMBER_WEEK_SCHEDULE,
  OFFICIAL_NOVEMBER_9_13_SCHEDULE,
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
  const [cleanOverwrite, setCleanOverwrite] = useState<boolean>(true);
  const [showDiagnostics, setShowDiagnostics] = useState<boolean>(false);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setFeedback(null);
    setParsedPreview(null);
    setShowDiagnostics(false);
    setCopiedReport(false);

    const isPdf = file.name.toLowerCase().endsWith('.pdf');
    const isExcel = file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls');
    setUploadedFileName(file.name);
    setUploadedFileType(isPdf ? 'pdf' : (isExcel ? 'excel' : null));

    try {
      // 1. Automatically parse either Excel or PDF
      const schedule = await parseWeeklyScheduleFile(file);
      setParsedPreview(schedule);
      
      const unmappedCount = schedule.diagnostics?.unmappedRows?.length || 0;
      setFeedback({
        type: 'success',
        message: `Otomatik analiz tamamlandı: "${schedule.title}" • ${schedule.rows.length} salon algılandı.${unmappedCount > 0 ? ` (${unmappedCount} satır atlandı/teşhis mevcut)` : ''}`
      });

      // Auto expand diagnostics if any unmapped rows exist or to inspect
      if (unmappedCount > 0) {
        setShowDiagnostics(true);
      }
    } catch (err: any) {
      console.error('File parsing error:', err);
      setFeedback({
        type: 'error',
        message: 'Dosya analiz edilirken hata oluştu: ' + (err?.message || 'Geçersiz dosya formatı')
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyDiagnostics = () => {
    if (!parsedPreview?.diagnostics) return;
    const d = parsedPreview.diagnostics;
    const textLines = [
      `--- HAFTALIK PROGRAM TEŞHİS RAPORU ---`,
      `Dosya: ${uploadedFileName}`,
      `Hafta Başlığı: ${parsedPreview.title}`,
      `Tarih Aralığı: ${parsedPreview.dateRangeText}`,
      `Başlık Satırı İndeksi: Satır ${d.headerRowIndex}`,
      `Gün Sütunları: ${d.dayColumns.map(c => `${c.dayName}=${c.colLetter}`).join(', ')}`,
      `Algılanan Toplam Salon Sayısı: ${d.detectedUnitCount}`,
      `\n[ALGILANAN SALONLAR]`,
      ...d.detectedUnits.map((u, i) => `${i + 1}. ${u.unitName} (${u.category}) - ${u.doctorCount} hekim görevi`),
      `\n[ATLANAN / OKUNAMAYAN SATIRLAR (${d.unmappedRows.length} adet)]`,
      ...d.unmappedRows.map(u => `Satır ${u.rowNumber}: [${u.rawFirstCells.join(', ')}] -> ${u.reason}`),
      `---------------------------------------`
    ];
    navigator.clipboard.writeText(textLines.join('\n'));
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2500);
  };

  const handleConfirmPublish = async () => {
    if (!parsedPreview) return;

    setIsProcessing(true);
    try {
      setActiveWeekKey(parsedPreview.weekKey);
      onSaveSchedule(parsedPreview);
      await saveWeeklyScheduleToServer(parsedPreview, cleanOverwrite);

      setFeedback({
        type: 'success',
        message: 'Haftalık program temiz bir şekilde Firestore bulutuna yüklendi ve canlı güncellendi!'
      });

      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: 'Bulut eşitleme hatası: ' + (err?.message || 'Bilinmeyen hata')
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApplyPreset = async (preset: 'nov-9-13' | 'nov' | 'oct') => {
    setIsProcessing(true);
    try {
      let scheduleToApply = OFFICIAL_NOVEMBER_9_13_SCHEDULE;
      if (preset === 'nov') scheduleToApply = OFFICIAL_NOVEMBER_WEEK_SCHEDULE;
      if (preset === 'oct') scheduleToApply = OFFICIAL_OCTOBER_WEEK_SCHEDULE;

      setActiveWeekKey(scheduleToApply.weekKey);
      onSaveSchedule(scheduleToApply);
      await saveWeeklyScheduleToServer(scheduleToApply, true);
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
          <div className={`p-4 rounded-xl border space-y-3.5 ${
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
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                {parsedPreview.title}
              </div>
              <div className="text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-3 pt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-500" />
                  {parsedPreview.dateRangeText}
                </span>
                <span className="flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400">
                  <Building2 className="w-3.5 h-3.5" />
                  {parsedPreview.rows.length} Salon / Birim Algılandı
                </span>
              </div>
            </div>

            {/* Clean Overwrite Mode Toggle */}
            <div className={`p-2.5 rounded-lg border text-xs flex items-start gap-2.5 ${
              isDark ? 'bg-slate-900/60 border-slate-700/70' : 'bg-white border-slate-200'
            }`}>
              <input 
                id="clean-overwrite-checkbox"
                type="checkbox" 
                checked={cleanOverwrite} 
                onChange={(e) => setCleanOverwrite(e.target.checked)}
                className="mt-0.5 rounded accent-teal-600 cursor-pointer"
              />
              <label htmlFor="clean-overwrite-checkbox" className="cursor-pointer text-[11px] leading-relaxed">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <RotateCcw className="w-3 h-3 text-teal-500" />
                  Temiz Yükleme (Eski Hafta Verilerini Sıfırla ve Yeniden Yaz)
                </span>
                <span className="text-slate-500 dark:text-slate-400 block mt-0.5">
                  Bu hafta için daha önce yüklenmiş veriler varsa, çakışmayı ve artık/bozuk satırları önlemek için eski kayıtlar tamamen temizlenip sıfırdan kaydedilir.
                </span>
              </label>
            </div>

            {/* Diagnostics Accordion */}
            {parsedPreview.diagnostics && (
              <div className={`rounded-lg border overflow-hidden text-xs ${
                isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-white border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowDiagnostics(!showDiagnostics)}
                  className="w-full p-2.5 flex items-center justify-between text-left font-semibold text-[11px] hover:bg-slate-500/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-teal-500" />
                    <span>Excel Yapı & Teşhis Raporu</span>
                    {parsedPreview.diagnostics.unmappedRows.length > 0 ? (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                        {parsedPreview.diagnostics.unmappedRows.length} atlanan satır
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        Sorunsuz
                      </span>
                    )}
                  </div>
                  {showDiagnostics ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {showDiagnostics && (
                  <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5 max-h-60 overflow-y-auto">
                    {/* Day mapping summary */}
                    <div className="flex flex-wrap gap-1.5 text-[10px]">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Gün Eşleşmeleri:</span>
                      {parsedPreview.diagnostics.dayColumns.map(col => (
                        <span key={col.dayName} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono">
                          {col.dayName}: Sütun {col.colLetter}
                        </span>
                      ))}
                    </div>

                    {/* Detected Salons tags */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        Okunan Görev Yerleri ({parsedPreview.diagnostics.detectedUnits.length}):
                      </div>
                      <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-1 rounded bg-slate-50 dark:bg-slate-800/50">
                        {parsedPreview.diagnostics.detectedUnits.map((u, idx) => (
                          <span 
                            key={idx} 
                            className="px-1.5 py-0.5 rounded text-[10px] bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-2.5 h-2.5 text-teal-500 shrink-0" />
                            {u.unitName}
                            {u.doctorCount > 0 && <span className="text-[9px] opacity-75 font-mono">({u.doctorCount})</span>}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Unmapped / Skipped rows */}
                    {parsedPreview.diagnostics.unmappedRows.length > 0 ? (
                      <div className="space-y-1 pt-1">
                        <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 text-amber-500" />
                          Atlanan Satırlar ({parsedPreview.diagnostics.unmappedRows.length}):
                        </div>
                        <div className="space-y-1 max-h-28 overflow-y-auto">
                          {parsedPreview.diagnostics.unmappedRows.map((un, idx) => (
                            <div key={idx} className="p-1.5 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] space-y-0.5">
                              <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                                <span>Satır #{un.rowNumber}</span>
                                <span className="text-[9px] text-amber-600 dark:text-amber-400">{un.reason}</span>
                              </div>
                              {un.rawFirstCells.length > 0 && (
                                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-mono truncate">
                                  Hücreler: [{un.rawFirstCells.join(' | ')}]
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Tüm salon ve görev yerleri eksiksiz ayrıştırıldı.
                      </div>
                    )}

                    {/* Copy Diagnostics Button */}
                    <div className="pt-1 flex justify-end">
                      <button
                        type="button"
                        onClick={handleCopyDiagnostics}
                        className="px-2.5 py-1 rounded-md text-[10px] font-bold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-slate-700 dark:text-slate-300 cursor-pointer transition-colors"
                      >
                        {copiedReport ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">Rapor Kopyalandı!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Teşhis Raporunu Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

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
                  <span>{cleanOverwrite ? 'Temiz Olarak Onayla ve Yayına Al (Firebase)' : 'Onayla ve Yayına Al (Firebase)'}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleApplyPreset('nov-9-13')}
              className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                currentSchedule.weekKey === '2026-W46'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                  : isDark
                    ? 'border-slate-800 hover:border-slate-700 bg-slate-800/50 text-slate-200'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>09 - 13 Kasım</span>
                {currentSchedule.weekKey === '2026-W46' && <Check className="w-3.5 h-3.5 text-teal-500" />}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                09-13 Kasım Mesai Programı
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset('nov')}
              className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                currentSchedule.weekKey === '2026-W45'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                  : isDark
                    ? 'border-slate-800 hover:border-slate-700 bg-slate-800/50 text-slate-200'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>02 - 06 Kasım</span>
                {currentSchedule.weekKey === '2026-W45' && <Check className="w-3.5 h-3.5 text-teal-500" />}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                02-06 Kasım Mesai Programı
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset('oct')}
              className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all cursor-pointer ${
                currentSchedule.weekKey === '2026-W44'
                  ? 'border-teal-500 bg-teal-500/10 text-teal-600 dark:text-teal-400'
                  : isDark
                    ? 'border-slate-800 hover:border-slate-700 bg-slate-800/50 text-slate-200'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>26 - 30 Ekim</span>
                {currentSchedule.weekKey === '2026-W44' && <Check className="w-3.5 h-3.5 text-teal-500" />}
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                29 Ekim Cumhuriyet Bayramı
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
