export interface TrueFalseQuestion {
  id: string;
  number: number;
  section: string;
  statement: string;
  answer: boolean;
  explanation: string;
}

export interface QuestionSet {
  id: string;
  title: string;
  sourceLabel: string;
  isBuiltIn: boolean;
  createdAt: string;
  questions: TrueFalseQuestion[];
}

export type QuestionStudyMode = 'study' | 'exam' | 'review';

export interface QuestionProgressEntry {
  lastSelected: boolean | null;
  everWrong: boolean;
  isBookmarked: boolean;
  attempts: number;
  updatedAt: string;
}

export interface QuestionBankProgressState {
  activeSetId: string;
  byQuestionId: Record<string, QuestionProgressEntry>;
}

export interface ExamAttemptResult {
  completedAt: string;
  total: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  answers: Record<string, boolean | undefined>;
}
