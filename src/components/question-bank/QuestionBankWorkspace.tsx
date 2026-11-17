import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  Bookmark,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileUp,
  HelpCircle,
  Plus,
  RotateCcw,
  Trash2,
  X,
  XCircle
} from 'lucide-react';
import { BUILT_IN_QUESTION_SETS } from '../../data/builtInQuestionSets';
import {
  ExamAttemptResult,
  QuestionBankProgressState,
  QuestionProgressEntry,
  QuestionSet,
  QuestionStudyMode,
  TrueFalseQuestion
} from '../../types/questionBank';
import { parseInlineFormatting, parseQuestionBankText } from '../../utils/questionBankParser';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface QuestionBankWorkspaceProps {
  isDark: boolean;
}

const CUSTOM_SETS_STORAGE_KEY = 'etfal_question_bank_custom_sets_v1';
const PROGRESS_STORAGE_KEY = 'etfal_question_bank_progress_v1';

const SAMPLE_TEMPLATE_TEXT = `### **Bölüm 1: Örnek Konu Başlığı**

**1\\. Genel anesteziklerin hareketsizlik (immobility) etkisi primer olarak spinal kord düzeyinde gerçekleşir.**

* **Cevap:** **[DOĞRU]**
* **Açıklama:** Anesteziklerin hareketsizlik etkisi spinal kord düzeyinde oluşurken, bilinç kaybı **supraspinal ağların** modülasyonu ile gerçekleşir.

**2\\. Propofol, insanlarda düzenli ve öngörülebilir bir retrograd amnezi oluşturur.**

* **Cevap:** **[YANLIŞ]**
* **Açıklama:** Anestezik amnezi neredeyse tamamen **anterograd** karakterdedir.`;

function readCustomSets(): QuestionSet[] {
  try {
    const raw = localStorage.getItem(CUSTOM_SETS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (item) =>
          item &&
          typeof item.id === 'string' &&
          typeof item.title === 'string' &&
          Array.isArray(item.questions) &&
          item.questions.length > 0
      );
    }
  } catch {
    // ignore storage read error
  }
  return [];
}

function writeCustomSets(sets: QuestionSet[]): void {
  try {
    localStorage.setItem(CUSTOM_SETS_STORAGE_KEY, JSON.stringify(sets));
  } catch {
    // ignore storage write error
  }
}

function readProgressState(): QuestionBankProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          activeSetId:
            typeof parsed.activeSetId === 'string'
              ? parsed.activeSetId
              : BUILT_IN_QUESTION_SETS[0]?.id || '',
          byQuestionId:
            parsed.byQuestionId && typeof parsed.byQuestionId === 'object'
              ? parsed.byQuestionId
              : {}
        };
      }
    }
  } catch {
    // ignore storage read error
  }
  return {
    activeSetId: BUILT_IN_QUESTION_SETS[0]?.id || '',
    byQuestionId: {}
  };
}

function writeProgressState(state: QuestionBankProgressState): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage write error
  }
}

const FormattedText: React.FC<{ text: string; isDark: boolean }> = ({ text, isDark }) => {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, lineIdx) => {
        const segments = parseInlineFormatting(line);
        return (
          <React.Fragment key={lineIdx}>
            {lineIdx > 0 && <br />}
            {segments.map((seg, segIdx) => {
              if (seg.type === 'bold') {
                return (
                  <strong
                    key={segIdx}
                    className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}
                  >
                    {seg.content}
                  </strong>
                );
              }
              if (seg.type === 'italic') {
                return (
                  <em key={segIdx} className="italic">
                    {seg.content}
                  </em>
                );
              }
              return <React.Fragment key={segIdx}>{seg.content}</React.Fragment>;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
};

export const QuestionBankWorkspace: React.FC<QuestionBankWorkspaceProps> = ({ isDark }) => {
  const [customSets, setCustomSets] = useState<QuestionSet[]>(() => readCustomSets());
  const [progressState, setProgressState] = useState<QuestionBankProgressState>(() =>
    readProgressState()
  );

  const allSets = useMemo(
    () => [...BUILT_IN_QUESTION_SETS, ...customSets],
    [customSets]
  );

  const activeSet = useMemo(() => {
    return (
      allSets.find((s) => s.id === progressState.activeSetId) ||
      allSets[0] ||
      BUILT_IN_QUESTION_SETS[0]
    );
  }, [allSets, progressState.activeSetId]);

  const [mode, setMode] = useState<QuestionStudyMode>('study');
  const [selectedSection, setSelectedSection] = useState<string>('Tümü');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Exam mode ephemeral session
  const [examAnswers, setExamAnswers] = useState<Record<string, boolean | undefined>>({});
  const [examResult, setExamResult] = useState<ExamAttemptResult | null>(null);
  const [showExamReviewList, setShowExamReviewList] = useState<boolean>(true);

  // Confirmations (no window.confirm/alert)
  const [confirmResetOpen, setConfirmResetOpen] = useState<boolean>(false);
  const [confirmDeleteSetId, setConfirmDeleteSetId] = useState<string | null>(null);

  // Import Modal state
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importTitle, setImportTitle] = useState<string>('');
  const [importSource, setImportSource] = useState<string>('');
  const [importRawText, setImportRawText] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Persist custom sets & progress
  useEffect(() => {
    writeCustomSets(customSets);
  }, [customSets]);

  useEffect(() => {
    writeProgressState(progressState);
  }, [progressState]);

  // Sections in active set
  const availableSections = useMemo(() => {
    const unique = new Set<string>();
    activeSet.questions.forEach((q) => unique.add(q.section));
    return ['Tümü', ...Array.from(unique)];
  }, [activeSet]);

  // Overall progress metrics for active set
  const setMetrics = useMemo(() => {
    let answeredCount = 0;
    let correctCount = 0;
    let wrongPoolCount = 0;
    let bookmarkCount = 0;
    let reviewPoolCount = 0;

    for (const q of activeSet.questions) {
      const entry = progressState.byQuestionId[q.id];
      if (!entry) continue;
      if (entry.lastSelected !== null && entry.lastSelected !== undefined) {
        answeredCount++;
        if (entry.lastSelected === q.answer) {
          correctCount++;
        }
      }
      if (entry.everWrong) wrongPoolCount++;
      if (entry.isBookmarked) bookmarkCount++;
      if (entry.everWrong || entry.isBookmarked) reviewPoolCount++;
    }

    const accuracyPct =
      answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : null;

    return {
      total: activeSet.questions.length,
      answeredCount,
      correctCount,
      wrongPoolCount,
      bookmarkCount,
      reviewPoolCount,
      accuracyPct
    };
  }, [activeSet, progressState.byQuestionId]);

  // Filtered question list based on mode & section
  const filteredQuestions = useMemo(() => {
    return activeSet.questions.filter((q) => {
      if (selectedSection !== 'Tümü' && q.section !== selectedSection) {
        return false;
      }
      if (mode === 'review') {
        const entry = progressState.byQuestionId[q.id];
        return Boolean(entry && (entry.everWrong || entry.isBookmarked));
      }
      return true;
    });
  }, [activeSet.questions, selectedSection, mode, progressState.byQuestionId]);

  // Keep currentIndex within bounds
  useEffect(() => {
    if (filteredQuestions.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= filteredQuestions.length) {
      setCurrentIndex(filteredQuestions.length - 1);
    }
  }, [filteredQuestions.length, currentIndex]);

  const currentQuestion: TrueFalseQuestion | null =
    filteredQuestions[currentIndex] || null;
  const currentEntry: QuestionProgressEntry | undefined = currentQuestion
    ? progressState.byQuestionId[currentQuestion.id]
    : undefined;

  const handleSelectSet = useCallback((setId: string) => {
    setProgressState((prev) => ({ ...prev, activeSetId: setId }));
    setSelectedSection('Tümü');
    setCurrentIndex(0);
    setExamAnswers({});
    setExamResult(null);
    setConfirmResetOpen(false);
    setConfirmDeleteSetId(null);
  }, []);

  const handleModeChange = useCallback((nextMode: QuestionStudyMode) => {
    setMode(nextMode);
    setCurrentIndex(0);
    setConfirmResetOpen(false);
    if (nextMode !== 'exam') {
      setExamResult(null);
    }
  }, []);

  const handleSectionChange = useCallback((sec: string) => {
    setSelectedSection(sec);
    setCurrentIndex(0);
  }, []);

  const recordAnswer = useCallback(
    (question: TrueFalseQuestion, choice: boolean) => {
      if (mode === 'exam') {
        if (examResult) return;
        setExamAnswers((prev) => ({ ...prev, [question.id]: choice }));
        return;
      }

      const isCorrect = choice === question.answer;
      setProgressState((prev) => {
        const existing = prev.byQuestionId[question.id];
        return {
          ...prev,
          byQuestionId: {
            ...prev.byQuestionId,
            [question.id]: {
              lastSelected: choice,
              everWrong: isCorrect ? Boolean(existing?.everWrong) : true,
              isBookmarked: Boolean(existing?.isBookmarked),
              attempts: (existing?.attempts || 0) + 1,
              updatedAt: new Date().toISOString()
            }
          }
        };
      });
    },
    [mode, examResult]
  );

  const clearSingleQuestionAnswer = useCallback((questionId: string) => {
    setProgressState((prev) => {
      const existing = prev.byQuestionId[questionId];
      if (!existing) return prev;
      return {
        ...prev,
        byQuestionId: {
          ...prev.byQuestionId,
          [questionId]: {
            ...existing,
            lastSelected: null,
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  }, []);

  const toggleBookmark = useCallback((questionId: string) => {
    setProgressState((prev) => {
      const existing = prev.byQuestionId[questionId];
      return {
        ...prev,
        byQuestionId: {
          ...prev.byQuestionId,
          [questionId]: {
            lastSelected: existing?.lastSelected ?? null,
            everWrong: Boolean(existing?.everWrong),
            isBookmarked: !existing?.isBookmarked,
            attempts: existing?.attempts || 0,
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  }, []);

  const removeFromWrongList = useCallback((questionId: string) => {
    setProgressState((prev) => {
      const existing = prev.byQuestionId[questionId];
      if (!existing) return prev;
      return {
        ...prev,
        byQuestionId: {
          ...prev.byQuestionId,
          [questionId]: {
            ...existing,
            everWrong: false,
            updatedAt: new Date().toISOString()
          }
        }
      };
    });
  }, []);

  const handleFinishExam = useCallback(() => {
    const scope = filteredQuestions.length > 0 ? filteredQuestions : activeSet.questions;
    let correctCount = 0;
    let wrongCount = 0;
    let unansweredCount = 0;

    setProgressState((prev) => {
      const updatedMap = { ...prev.byQuestionId };
      for (const q of scope) {
        const chosen = examAnswers[q.id];
        if (chosen === undefined) {
          unansweredCount++;
          continue;
        }
        const existing = updatedMap[q.id];
        const isCorrect = chosen === q.answer;
        if (isCorrect) {
          correctCount++;
        } else {
          wrongCount++;
        }
        updatedMap[q.id] = {
          lastSelected: chosen,
          everWrong: isCorrect ? Boolean(existing?.everWrong) : true,
          isBookmarked: Boolean(existing?.isBookmarked),
          attempts: (existing?.attempts || 0) + 1,
          updatedAt: new Date().toISOString()
        };
      }
      return { ...prev, byQuestionId: updatedMap };
    });

    setExamResult({
      completedAt: new Date().toISOString(),
      total: scope.length,
      correctCount,
      wrongCount,
      unansweredCount,
      answers: { ...examAnswers }
    });
    setShowExamReviewList(true);
  }, [filteredQuestions, activeSet.questions, examAnswers]);

  const handleResetExam = useCallback(() => {
    setExamAnswers({});
    setExamResult(null);
    setCurrentIndex(0);
  }, []);

  const handleResetSetProgress = useCallback(() => {
    setProgressState((prev) => {
      const nextMap = { ...prev.byQuestionId };
      for (const q of activeSet.questions) {
        delete nextMap[q.id];
      }
      return { ...prev, byQuestionId: nextMap };
    });
    setExamAnswers({});
    setExamResult(null);
    setConfirmResetOpen(false);
    setCurrentIndex(0);
  }, [activeSet.questions]);

  const handleDeleteCustomSet = useCallback(
    (setId: string) => {
      setCustomSets((prev) => prev.filter((s) => s.id !== setId));
      if (activeSet.id === setId) {
        const fallbackId = BUILT_IN_QUESTION_SETS[0]?.id || '';
        setProgressState((prev) => ({ ...prev, activeSetId: fallbackId }));
        setSelectedSection('Tümü');
        setCurrentIndex(0);
      }
      setConfirmDeleteSetId(null);
    },
    [activeSet.id]
  );

  // Live parser preview for "Yeni Set Ekle" modal
  const liveParsedImport = useMemo(() => {
    if (!importRawText.trim()) return null;
    return parseQuestionBankText(importRawText, 'preview');
  }, [importRawText]);

  const handleSaveImportedSet = useCallback(() => {
    if (!importRawText.trim()) return;
    const slugId = `custom-${Date.now()}`;
    const parsed = parseQuestionBankText(importRawText, slugId);
    if (parsed.questions.length === 0) return;

    const finalTitle =
      importTitle.trim() ||
      parsed.detectedTitle ||
      `Özel Soru Seti (${parsed.questions.length} Soru)`;
    const finalSource =
      importSource.trim() || 'Kullanıcı tarafından eklenen yüksek verimli soru seti';

    const newSet: QuestionSet = {
      id: slugId,
      title: finalTitle,
      sourceLabel: finalSource,
      isBuiltIn: false,
      createdAt: new Date().toISOString(),
      questions: parsed.questions
    };

    setCustomSets((prev) => [...prev, newSet]);
    setProgressState((prev) => ({ ...prev, activeSetId: newSet.id }));
    setSelectedSection('Tümü');
    setMode('study');
    setCurrentIndex(0);
    setExamAnswers({});
    setExamResult(null);
    setImportTitle('');
    setImportSource('');
    setImportRawText('');
    setImportModalOpen(false);
  }, [importRawText, importTitle, importSource]);

  const handleImportFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = typeof reader.result === 'string' ? reader.result : '';
        setImportRawText(text);
        if (!importTitle.trim()) {
          const cleanName = file.name.replace(/\.(txt|md)$/i, '').replace(/[_-]+/g, ' ').trim();
          if (cleanName) setImportTitle(cleanName);
        }
      };
      reader.readAsText(file, 'utf-8');
      e.target.value = '';
    },
    [importTitle]
  );

  // Keyboard shortcuts when working on questions (disabled when modal or text input focused)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (importModalOpen) {
        if (e.key === 'Escape') setImportModalOpen(false);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (!currentQuestion || (mode === 'exam' && examResult)) return;

      const key = e.key.toLocaleLowerCase('tr-TR');
      if (key === 'd' || key === '1') {
        e.preventDefault();
        recordAnswer(currentQuestion, true);
      } else if (key === 'y' || key === '2') {
        e.preventDefault();
        recordAnswer(currentQuestion, false);
      } else if (key === 'k') {
        e.preventDefault();
        toggleBookmark(currentQuestion.id);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((idx) => Math.min(filteredQuestions.length - 1, idx + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((idx) => Math.max(0, idx - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    importModalOpen,
    currentQuestion,
    mode,
    examResult,
    filteredQuestions.length,
    recordAnswer,
    toggleBookmark
  ]);

  // Exam section-by-section breakdown
  const examSectionBreakdown = useMemo(() => {
    if (!examResult) return [];
    const scope = filteredQuestions.length > 0 ? filteredQuestions : activeSet.questions;
    const map = new Map<string, { section: string; total: number; correct: number; wrong: number }>();

    for (const q of scope) {
      const curr = map.get(q.section) || {
        section: q.section,
        total: 0,
        correct: 0,
        wrong: 0
      };
      curr.total++;
      const chosen = examResult.answers[q.id];
      if (chosen !== undefined) {
        if (chosen === q.answer) curr.correct++;
        else curr.wrong++;
      }
      map.set(q.section, curr);
    }
    return Array.from(map.values());
  }, [examResult, filteredQuestions, activeSet.questions]);

  const examAnsweredCount = useMemo(() => {
    const scope = filteredQuestions.length > 0 ? filteredQuestions : activeSet.questions;
    return scope.filter((q) => examAnswers[q.id] !== undefined).length;
  }, [filteredQuestions, activeSet.questions, examAnswers]);

  const activeChoiceForCard = useMemo(() => {
    if (!currentQuestion) return null;
    if (mode === 'exam') {
      const val = examAnswers[currentQuestion.id];
      return val === undefined ? null : val;
    }
    const val = currentEntry?.lastSelected;
    return val === undefined || val === null ? null : val;
  }, [currentQuestion, mode, examAnswers, currentEntry?.lastSelected]);

  const revealFeedback =
    mode !== 'exam' && activeChoiceForCard !== null && currentQuestion !== null;
  const isCurrentChoiceCorrect =
    currentQuestion !== null && activeChoiceForCard === currentQuestion.answer;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border ${
              isDark
                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-400'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2
              className={`text-xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Soru Bankası
            </h2>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Yüksek Verimli (High-Yield) Doğru / Yanlış · Anesteziyoloji Yeterlik Hazırlığı
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setImportModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Yeni Set Ekle</span>
          </button>

          <ShareLinkButton
            type="arac"
            id="question-bank"
            isDark={isDark}
            variant="compact"
            title="Soru Bankası Bağlantısını Paylaş"
          />
        </div>
      </div>

      {/* Simple Topic Title Selector Strip */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          {allSets.map((setItem) => {
            const isActive = setItem.id === activeSet.id;
            const solvedInSet = setItem.questions.filter((q) => {
              const e = progressState.byQuestionId[q.id];
              return e && e.lastSelected !== null && e.lastSelected !== undefined;
            }).length;

            return (
              <div key={setItem.id} className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSelectSet(setItem.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] text-xs rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? isDark
                        ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                        : 'bg-indigo-50 border-indigo-500 text-indigo-950 font-semibold'
                      : isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate max-w-[260px]">{setItem.title}</span>
                  <span
                    className={`font-mono tabular-nums text-[11px] ${
                      isActive
                        ? isDark
                          ? 'text-indigo-300'
                          : 'text-indigo-700'
                        : isDark
                          ? 'text-slate-500'
                          : 'text-slate-400'
                    }`}
                  >
                    {solvedInSet}/{setItem.questions.length}
                  </span>
                </button>

                {!setItem.isBuiltIn && (
                  confirmDeleteSetId === setItem.id ? (
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomSet(setItem.id)}
                        className="px-2 py-1.5 text-[11px] font-semibold rounded-md bg-rose-600 hover:bg-rose-700 text-white cursor-pointer whitespace-nowrap"
                      >
                        Sil
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteSetId(null)}
                        className={`px-2 py-1.5 text-[11px] rounded-md border cursor-pointer whitespace-nowrap ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-300'
                            : 'bg-white border-slate-300 text-slate-600'
                        }`}
                      >
                        İptal
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteSetId(setItem.id)}
                      aria-label={`${setItem.title} setini sil`}
                      title="Özel seti sil"
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-800'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200'
                      }`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mode Selector + Clean Unboxed Metrics Row */}
      <div
        className={`rounded-xl border p-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div
          role="tablist"
          aria-label="Çalışma modu"
          className={`inline-flex items-center p-1 rounded-lg border self-start ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {(
            [
              { id: 'study', label: 'Anlık Çözüm' },
              { id: 'exam', label: 'Sınav Modu' },
              {
                id: 'review',
                label: `Yanlışlar & Yer İmi (${setMetrics.reviewPoolCount})`
              }
            ] as { id: QuestionStudyMode; label: string }[]
          ).map((tab) => {
            const active = mode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => handleModeChange(tab.id)}
                className={`px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? isDark
                      ? 'bg-slate-800 text-white'
                      : 'bg-white text-slate-900 shadow-2xs'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Clean Unboxed Metadata Stats */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-x-3 gap-y-2 text-xs">
          <div
            className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono tabular-nums ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            <span>
              Çözülen: <strong className={isDark ? 'text-slate-100' : 'text-slate-900'}>{setMetrics.answeredCount}/{setMetrics.total}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Doğruluk:{' '}
              <strong className={isDark ? 'text-emerald-400' : 'text-emerald-700'}>
                {setMetrics.accuracyPct !== null ? `%${setMetrics.accuracyPct}` : '—'}
              </strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Yanlış: <strong className={isDark ? 'text-rose-400' : 'text-rose-700'}>{setMetrics.wrongPoolCount}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Yer İmi: <strong className={isDark ? 'text-amber-400' : 'text-amber-700'}>{setMetrics.bookmarkCount}</strong>
            </span>
          </div>

          {confirmResetOpen ? (
            <div className="inline-flex items-center gap-1.5 shrink-0">
              <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                İlerleme silinsin mi?
              </span>
              <button
                type="button"
                onClick={handleResetSetProgress}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-rose-600 hover:bg-rose-700 text-white cursor-pointer whitespace-nowrap"
              >
                Evet, Sıfırla
              </button>
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md border cursor-pointer whitespace-nowrap ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-slate-300'
                    : 'bg-slate-50 border-slate-300 text-slate-700'
                }`}
              >
                Vazgeç
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span>İlerlemeyi Sıfırla</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Zone Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT STAGE (~65%): Active Question OR Exam Result Summary */}
        <section className="lg:col-span-8 space-y-4">
          {mode === 'exam' && examResult ? (
            <div className="space-y-4">
              {/* Exam Result Summary Card */}
              <div
                className={`rounded-xl border p-5 sm:p-6 space-y-5 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div
                      className={`text-xs font-medium ${
                        isDark ? 'text-indigo-400' : 'text-indigo-700'
                      }`}
                    >
                      Sınav Tamamlandı · {activeSet.title}
                    </div>
                    <h3
                      className={`text-2xl font-bold font-mono tabular-nums ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      %{examResult.total > 0 ? Math.round((examResult.correctCount / examResult.total) * 100) : 0} Başarı ({examResult.correctCount} / {examResult.total})
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {examResult.wrongCount > 0 && (
                      <button
                        type="button"
                        onClick={() => handleModeChange('review')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Yanlışları Tekrarla ({examResult.wrongCount})</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleResetExam}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        isDark
                          ? 'bg-slate-950 border-slate-700 text-slate-200 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      <ClipboardCheck className="w-3.5 h-3.5" />
                      <span>Yeni Sınav Başlat</span>
                    </button>
                  </div>
                </div>

                {/* Metric Breakdown Row */}
                <div
                  className={`grid grid-cols-3 gap-3 pt-4 border-t font-mono tabular-nums ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Doğru
                    </div>
                    <div className={`text-lg font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {examResult.correctCount}
                    </div>
                  </div>
                  <div>
                    <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Yanlış
                    </div>
                    <div className={`text-lg font-bold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
                      {examResult.wrongCount}
                    </div>
                  </div>
                  <div>
                    <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Boş
                    </div>
                    <div className={`text-lg font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {examResult.unansweredCount}
                    </div>
                  </div>
                </div>

                {/* Section Breakdown */}
                {examSectionBreakdown.length > 0 && (
                  <div
                    className={`pt-4 border-t space-y-2.5 ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <div
                      className={`text-xs font-bold ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`}
                    >
                      Konu Alt Bölümü Dağılımı
                    </div>
                    <div className="space-y-2">
                      {examSectionBreakdown.map((sec) => {
                        const pct = sec.total > 0 ? Math.round((sec.correct / sec.total) * 100) : 0;
                        return (
                          <div key={sec.section} className="space-y-1">
                            <div className="flex items-center justify-between gap-2 text-xs">
                              <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                {sec.section}
                              </span>
                              <span
                                className={`font-mono tabular-nums shrink-0 ${
                                  isDark ? 'text-slate-400' : 'text-slate-600'
                                }`}
                              >
                                {sec.correct}/{sec.total} (%{pct})
                              </span>
                            </div>
                            <div
                              className={`h-1.5 w-full rounded-full overflow-hidden ${
                                isDark ? 'bg-slate-800' : 'bg-slate-200'
                              }`}
                            >
                              <div
                                className="h-full bg-indigo-500 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Item-by-Item Exam Answer & Explanation Review */}
              <div
                className={`rounded-xl border p-5 space-y-4 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    Soru Bazlı Çözüm ve Açıklamalar
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowExamReviewList((v) => !v)}
                    className={`text-xs font-semibold cursor-pointer ${
                      isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-700 hover:text-indigo-900'
                    }`}
                  >
                    {showExamReviewList ? 'Listeyi Daralt' : 'Listeyi Genişlet'}
                  </button>
                </div>

                {showExamReviewList && (
                  <div className="divide-y divide-slate-200 dark:divide-slate-800">
                    {(filteredQuestions.length > 0 ? filteredQuestions : activeSet.questions).map(
                      (q) => {
                        const chosen = examResult.answers[q.id];
                        const isRight = chosen === q.answer;
                        const isUnanswered = chosen === undefined;
                        return (
                          <div key={q.id} className="py-4 first:pt-0 last:pb-0 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                              <span
                                className={`font-mono tabular-nums ${
                                  isDark ? 'text-slate-400' : 'text-slate-500'
                                }`}
                              >
                                #{q.number} · {q.section}
                              </span>
                              {isUnanswered ? (
                                <span
                                  className={`font-semibold ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                  }`}
                                >
                                  Boş Bırakıldı · Doğrusu: {q.answer ? 'DOĞRU' : 'YANLIŞ'}
                                </span>
                              ) : isRight ? (
                                <span
                                  className={`inline-flex items-center gap-1 font-semibold ${
                                    isDark ? 'text-emerald-400' : 'text-emerald-700'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Doğru ({chosen ? 'DOĞRU' : 'YANLIŞ'})</span>
                                </span>
                              ) : (
                                <span
                                  className={`inline-flex items-center gap-1 font-semibold ${
                                    isDark ? 'text-rose-400' : 'text-rose-700'
                                  }`}
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>
                                    Yanlış (Seçiminiz: {chosen ? 'DOĞRU' : 'YANLIŞ'} · Doğrusu:{' '}
                                    {q.answer ? 'DOĞRU' : 'YANLIŞ'})
                                  </span>
                                </span>
                              )}
                            </div>

                            <p
                              className={`text-sm font-semibold leading-relaxed ${
                                isDark ? 'text-slate-100' : 'text-slate-900'
                              }`}
                            >
                              {q.statement}
                            </p>

                            {q.explanation && (
                              <p
                                className={`text-xs leading-relaxed ${
                                  isDark ? 'text-slate-300' : 'text-slate-700'
                                }`}
                              >
                                <FormattedText text={q.explanation} isDark={isDark} />
                              </p>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : currentQuestion ? (
            <div
              className={`rounded-xl border p-5 sm:p-6 space-y-5 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Card Metadata Top Row (Unboxed typography) */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div
                  className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  <span className="font-medium">{currentQuestion.section}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    Soru {currentIndex + 1}/{filteredQuestions.length}
                    {filteredQuestions.length !== activeSet.questions.length
                      ? ` (#${currentQuestion.number})`
                      : ''}
                  </span>
                  {currentEntry?.everWrong && mode !== 'exam' && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className={isDark ? 'text-rose-400' : 'text-rose-700'}>
                        Yanlış listesinde
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {mode === 'review' && currentEntry?.everWrong && (
                    <button
                      type="button"
                      onClick={() => removeFromWrongList(currentQuestion.id)}
                      className={`px-2.5 py-1.5 text-[11px] font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-emerald-700 hover:text-emerald-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-800'
                      }`}
                    >
                      Öğrendim (Çıkar)
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleBookmark(currentQuestion.id)}
                    aria-pressed={Boolean(currentEntry?.isBookmarked)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      currentEntry?.isBookmarked
                        ? isDark
                          ? 'bg-amber-950/40 border-amber-700 text-amber-300'
                          : 'bg-amber-50 border-amber-300 text-amber-800'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        currentEntry?.isBookmarked ? 'fill-current' : ''
                      }`}
                    />
                    <span>{currentEntry?.isBookmarked ? 'Kaydedildi' : 'Yer İmi'}</span>
                  </button>
                </div>
              </div>

              {/* Clinical Question Statement */}
              <div className="max-w-3xl">
                <p
                  className={`text-base sm:text-lg font-semibold leading-relaxed ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <span
                    className={`font-mono tabular-nums mr-2 ${
                      isDark ? 'text-indigo-400' : 'text-indigo-700'
                    }`}
                  >
                    {currentQuestion.number}.
                  </span>
                  {currentQuestion.statement}
                </p>
              </div>

              {/* DOĞRU / YANLIŞ Decision Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {([true, false] as const).map((optionValue) => {
                  const isSelected = activeChoiceForCard === optionValue;
                  const isOptionCorrectAnswer = currentQuestion.answer === optionValue;
                  const label = optionValue ? 'DOĞRU' : 'YANLIŞ';
                  const shortcutHint = optionValue ? 'D' : 'Y';

                  let btnClass = isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-600 hover:bg-slate-800/70'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-400 hover:bg-slate-100';

                  if (mode === 'exam') {
                    if (isSelected) {
                      btnClass = isDark
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-indigo-50 border-indigo-600 text-indigo-950';
                    }
                  } else if (revealFeedback) {
                    if (isSelected && isCurrentChoiceCorrect) {
                      btnClass = isDark
                        ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-600 text-emerald-950';
                    } else if (isSelected && !isCurrentChoiceCorrect) {
                      btnClass = isDark
                        ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                        : 'bg-rose-50 border-rose-600 text-rose-950';
                    } else if (!isCurrentChoiceCorrect && isOptionCorrectAnswer) {
                      btnClass = isDark
                        ? 'bg-emerald-950/25 border-emerald-700/70 text-emerald-300'
                        : 'bg-emerald-50/60 border-emerald-400 text-emerald-900';
                    }
                  }

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => recordAnswer(currentQuestion, optionValue)}
                      aria-pressed={isSelected}
                      className={`flex items-center justify-between px-4 py-3.5 min-h-[54px] rounded-xl border-2 text-sm font-bold transition-colors cursor-pointer ${btnClass}`}
                    >
                      <span className="flex items-center gap-2.5">
                        {revealFeedback && isSelected && isCurrentChoiceCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                        {revealFeedback && isSelected && !isCurrentChoiceCorrect && (
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                        )}
                        {revealFeedback &&
                          !isSelected &&
                          !isCurrentChoiceCorrect &&
                          isOptionCorrectAnswer && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                        <span>{label}</span>
                      </span>

                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                          isDark
                            ? 'bg-slate-900 border-slate-700 text-slate-400'
                            : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        {shortcutHint}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Section (Study & Review Modes) */}
              {revealFeedback && (
                <div
                  className={`pt-4 border-t space-y-3 ${
                    isDark ? 'border-slate-800' : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div
                      className={`inline-flex items-center gap-2 text-xs font-bold ${
                        isCurrentChoiceCorrect
                          ? isDark
                            ? 'text-emerald-400'
                            : 'text-emerald-700'
                          : isDark
                            ? 'text-rose-400'
                            : 'text-rose-700'
                      }`}
                    >
                      {isCurrentChoiceCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Doğru Bildiniz</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>
                            Yanlış Cevap · Doğrusu: {currentQuestion.answer ? 'DOĞRU' : 'YANLIŞ'}
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => clearSingleQuestionAnswer(currentQuestion.id)}
                      className={`text-[11px] font-medium cursor-pointer ${
                        isDark
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Cevabı Temizle
                    </button>
                  </div>

                  {currentQuestion.explanation && (
                    <div
                      className={`rounded-lg border p-4 space-y-1.5 ${
                        isDark
                          ? 'bg-slate-950/70 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div
                        className={`flex items-center gap-1.5 text-xs font-bold ${
                          isDark ? 'text-slate-200' : 'text-slate-900'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>Klinik Açıklama</span>
                      </div>
                      <p className="text-[13px] leading-relaxed">
                        <FormattedText text={currentQuestion.explanation} isDark={isDark} />
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Footer */}
              <div
                className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    currentIndex === 0
                      ? isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                      : isDark
                        ? 'bg-slate-950 border-slate-700 text-slate-200 hover:bg-slate-800 cursor-pointer'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Önceki</span>
                </button>

                <span
                  className={`hidden sm:inline text-[11px] font-mono ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  D Doğru · Y Yanlış · ←/→ Gezin · K Yer İmi
                </span>

                {mode === 'exam' && currentIndex === filteredQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleFinishExam}
                    className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>Sınavı Bitir</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={currentIndex >= filteredQuestions.length - 1}
                    onClick={() =>
                      setCurrentIndex((i) => Math.min(filteredQuestions.length - 1, i + 1))
                    }
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                      currentIndex >= filteredQuestions.length - 1
                        ? isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-600 cursor-not-allowed'
                          : 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                        : isDark
                          ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                          : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                    }`}
                  >
                    <span>Sonraki</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Empty State (e.g. Review Pool has 0 wrong/bookmarked questions) */
            <div
              className={`rounded-xl border border-dashed p-8 sm:p-10 text-center space-y-3 ${
                isDark
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                  : 'bg-white border-slate-300 text-slate-700'
              }`}
            >
              <CheckCircle2
                className={`w-8 h-8 mx-auto ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}
              />
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {mode === 'review'
                  ? 'Yanlış veya Yer İmli Soru Bulunmuyor'
                  : 'Bu Filtreye Uygun Soru Yok'}
              </h3>
              <p
                className={`max-w-md mx-auto text-xs leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {mode === 'review'
                  ? 'Çözüm sırasında yanlış yaptığınız veya yer imine eklediğiniz sorular otomatik olarak burada toplanır.'
                  : 'Farklı bir alt bölüm seçebilir veya tüm sorulara geri dönebilirsiniz.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setMode('study');
                  setSelectedSection('Tümü');
                  setCurrentIndex(0);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[40px] text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Anlık Çözüme Dön</span>
              </button>
            </div>
          )}
        </section>

        {/* RIGHT NAVIGATOR DECK (~35%): Subsections Filter + Question Grid */}
        <aside
          className={`lg:col-span-4 rounded-xl border p-4 space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          {/* Section Filter List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Konu Alt Bölümleri
              </h3>
              <span
                className={`text-[11px] font-mono tabular-nums ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {availableSections.length - 1} Bölüm
              </span>
            </div>

            <div className="space-y-1">
              {availableSections.map((sec) => {
                const isSecActive = selectedSection === sec;
                const countInSec =
                  sec === 'Tümü'
                    ? activeSet.questions.length
                    : activeSet.questions.filter((q) => q.section === sec).length;

                return (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => handleSectionChange(sec)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs rounded-lg border transition-colors cursor-pointer ${
                      isSecActive
                        ? isDark
                          ? 'bg-indigo-600/20 border-indigo-500/70 text-white font-semibold'
                          : 'bg-indigo-50 border-indigo-400 text-indigo-950 font-semibold'
                        : isDark
                          ? 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="truncate">{sec}</span>
                    <span
                      className={`font-mono tabular-nums text-[11px] shrink-0 ${
                        isSecActive
                          ? isDark
                            ? 'text-indigo-300'
                            : 'text-indigo-700'
                          : isDark
                            ? 'text-slate-500'
                            : 'text-slate-400'
                      }`}
                    >
                      {countInSec}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Grid */}
          <div
            className={`pt-3.5 border-t space-y-2.5 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Soru Haritası
              </h3>
              <span
                className={`text-[11px] font-mono tabular-nums ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {filteredQuestions.length} soru
              </span>
            </div>

            {filteredQuestions.length > 0 ? (
              <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 gap-1.5">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex && !(mode === 'exam' && examResult);
                  const entry = progressState.byQuestionId[q.id];
                  const examVal = examAnswers[q.id];

                  let tileStyle = isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400';

                  if (mode === 'exam') {
                    if (examResult) {
                      const chosen = examResult.answers[q.id];
                      if (chosen === q.answer) {
                        tileStyle = isDark
                          ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-400 text-emerald-800';
                      } else if (chosen !== undefined) {
                        tileStyle = isDark
                          ? 'bg-rose-950/50 border-rose-700 text-rose-300'
                          : 'bg-rose-50 border-rose-400 text-rose-800';
                      }
                    } else if (examVal !== undefined) {
                      tileStyle = isDark
                        ? 'bg-indigo-950/60 border-indigo-600 text-indigo-200'
                        : 'bg-indigo-50 border-indigo-400 text-indigo-800';
                    }
                  } else if (entry?.lastSelected !== null && entry?.lastSelected !== undefined) {
                    if (entry.lastSelected === q.answer) {
                      tileStyle = isDark
                        ? 'bg-emerald-950/50 border-emerald-700 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-400 text-emerald-800';
                    } else {
                      tileStyle = isDark
                        ? 'bg-rose-950/50 border-rose-700 text-rose-300'
                        : 'bg-rose-50 border-rose-400 text-rose-800';
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        if (mode === 'exam' && examResult) setExamResult(null);
                        setCurrentIndex(idx);
                      }}
                      aria-label={`Soru ${q.number}`}
                      className={`relative h-9 rounded-lg border text-xs font-mono tabular-nums font-semibold transition-colors cursor-pointer flex items-center justify-center ${tileStyle} ${
                        isCurrent ? 'ring-2 ring-indigo-500 ring-offset-1 ring-offset-transparent' : ''
                      }`}
                    >
                      <span>{q.number}</span>
                      {entry?.isBookmarked && (
                        <Bookmark className="w-2.5 h-2.5 fill-amber-500 text-amber-500 absolute top-0.5 right-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Gösterilecek soru yok.
              </p>
            )}
          </div>

          {/* Exam Mode Action Bar */}
          {mode === 'exam' && filteredQuestions.length > 0 && (
            <div
              className={`pt-3.5 border-t space-y-2 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}
            >
              {!examResult ? (
                <>
                  <button
                    type="button"
                    onClick={handleFinishExam}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                  >
                    <ClipboardCheck className="w-4 h-4" />
                    <span>
                      Sınavı Bitir ({examAnsweredCount}/{filteredQuestions.length})
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetExam}
                    className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Seçimleri Temizle</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleResetExam}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Yeni Sınav Başlat</span>
                </button>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Textbook / Guideline Source Attribution Footer */}
      <div
        className={`rounded-xl border px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-xs ${
          isDark
            ? 'bg-slate-900/60 border-slate-800 text-slate-400'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
        <div>
          <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>Kaynak:</strong>{' '}
          {activeSet.sourceLabel}
        </div>
        <span className="font-mono tabular-nums text-[11px]">
          {activeSet.questions.length} Yüksek Verimli Doğru/Yanlış Sorusu
        </span>
      </div>

      {/* Add New Question Set Modal (Paste Text / Upload .txt/.md) */}
      {importModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setImportModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="import-set-modal-title"
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border p-5 sm:p-6 space-y-4 shadow-xl ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id="import-set-modal-title" className="text-base font-bold">
                  Yeni Doğru / Yanlış Soru Seti Ekle
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  Hazırladığınız metin veya Markdown dosyasını yapıştırın; alt bölümler, cevaplar ve açıklamalar otomatik ayrıştırılır.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                aria-label="Kapat"
                className={`p-2 rounded-lg border cursor-pointer ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="qb-set-title"
                  className={`block text-xs font-semibold ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Konu / Set Başlığı
                </label>
                <input
                  id="qb-set-title"
                  type="text"
                  value={importTitle}
                  onChange={(e) => setImportTitle(e.target.value)}
                  placeholder="Örn: Bölüm 2: Uyku Tıbbı ve Anestezi"
                  className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="qb-set-source"
                  className={`block text-xs font-semibold ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Kaynak Kitap / Kılavuz
                </label>
                <input
                  id="qb-set-source"
                  type="text"
                  value={importSource}
                  onChange={(e) => setImportSource(e.target.value)}
                  placeholder="Örn: Miller's Anesthesia, 10. Baskı – Ch. 9"
                  className={`w-full px-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white placeholder:text-slate-600'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="qb-raw-text"
                  className={`text-xs font-semibold ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Soru Metni (Markdown / Text)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setImportRawText(SAMPLE_TEMPLATE_TEXT)}
                    className={`text-[11px] font-medium underline underline-offset-2 cursor-pointer ${
                      isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-700 hover:text-indigo-900'
                    }`}
                  >
                    Örnek Formatı Doldur
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded-md border cursor-pointer ${
                      isDark
                        ? 'bg-slate-950 border-slate-700 text-slate-200 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <FileUp className="w-3 h-3" />
                    <span>.txt / .md Yükle</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt,.md,text/plain,text/markdown"
                    onChange={handleImportFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <textarea
                id="qb-raw-text"
                rows={9}
                value={importRawText}
                onChange={(e) => setImportRawText(e.target.value)}
                placeholder="### **Bölüm 1: ...**&#10;**1. Soru cümlesi...**&#10;* **Cevap:** **[DOĞRU]**&#10;* **Açıklama:** ..."
                className={`w-full px-3 py-2.5 text-xs font-mono leading-relaxed rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>

            {/* Live Parse Preview */}
            {liveParsedImport && (
              <div
                className={`rounded-lg border p-3 text-xs space-y-2 ${
                  liveParsedImport.questions.length > 0
                    ? isDark
                      ? 'bg-emerald-950/30 border-emerald-800 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-800 text-amber-200'
                      : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  {liveParsedImport.questions.length > 0 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span>
                    {liveParsedImport.questions.length > 0
                      ? `${liveParsedImport.sections.length} alt bölüm · ${liveParsedImport.questions.length} Doğru/Yanlış sorusu algılandı`
                      : 'Henüz geçerli soru algılanamadı. "1. Soru", "Cevap: DOĞRU/YANLIŞ" ve "Açıklama:" biçimini kontrol edin.'}
                  </span>
                </div>

                {liveParsedImport.questions.length > 0 && (
                  <div
                    className={`pt-2 border-t text-[11px] space-y-1 ${
                      isDark ? 'border-emerald-900/60 text-slate-300' : 'border-emerald-200 text-slate-700'
                    }`}
                  >
                    {liveParsedImport.questions.slice(0, 2).map((q) => (
                      <div key={q.id} className="truncate">
                        <span className="font-mono font-semibold">
                          #{q.number} [{q.answer ? 'DOĞRU' : 'YANLIŞ'}]
                        </span>{' '}
                        {q.statement}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className={`px-4 py-2 min-h-[40px] text-xs font-semibold rounded-lg border cursor-pointer ${
                  isDark
                    ? 'bg-slate-950 border-slate-700 text-slate-300 hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                İptal
              </button>
              <button
                type="button"
                disabled={!liveParsedImport || liveParsedImport.questions.length === 0}
                onClick={handleSaveImportedSet}
                className={`px-4 py-2 min-h-[40px] text-xs font-bold rounded-lg transition-colors ${
                  !liveParsedImport || liveParsedImport.questions.length === 0
                    ? 'bg-indigo-600/40 text-white/60 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                }`}
              >
                Seti Kaydet ({liveParsedImport?.questions.length || 0} Soru)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
