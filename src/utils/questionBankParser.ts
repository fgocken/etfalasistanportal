import { TrueFalseQuestion } from '../types/questionBank';

export interface ParsedQuestionBankResult {
  detectedTitle: string;
  sections: string[];
  questions: TrueFalseQuestion[];
  warnings: string[];
}

function unescapeMarkdownChars(text: string): string {
  return text
    .replace(/\\([.#*_~`[\]()\-+!])/g, '$1')
    .replace(/\u00a0/g, ' ')
    .trim();
}

function stripOuterBoldMarkers(text: string): string {
  let cleaned = text.trim();
  if (cleaned.startsWith('**') && cleaned.endsWith('**') && cleaned.length >= 4) {
    // Only strip outer wrapping ** if there aren't balanced inner ** pairs across the middle
    const inner = cleaned.slice(2, -2);
    if (!inner.includes('**')) {
      cleaned = inner.trim();
    }
  }
  return cleaned;
}

function cleanHeading(raw: string): string {
  return unescapeMarkdownChars(
    raw
      .replace(/^#{1,6}\s*/, '')
      .replace(/\*\*/g, '')
      .replace(/__/g, '')
      .trim()
  );
}

function parseBooleanToken(rawToken: string): boolean | null {
  const normalized = rawToken
    .toLocaleUpperCase('tr-TR')
    .replace(/[^A-ZÇĞİÖŞÜ]/g, '');
  if (normalized === 'DOĞRU' || normalized === 'DOGRU' || normalized === 'TRUE') {
    return true;
  }
  if (normalized === 'YANLIŞ' || normalized === 'YANLIS' || normalized === 'FALSE') {
    return false;
  }
  return null;
}

/**
 * Parses structured Turkish High-Yield True/False Markdown or plain text.
 * Supports patterns such as:
 * ### **Bölüm 1: Başlık**
 * **1\. Soru metni...**
 * * **Cevap:** **[DOĞRU]**
 * * **Açıklama:** Açıklama metni...
 */
export function parseQuestionBankText(
  rawText: string,
  setIdPrefix: string
): ParsedQuestionBankResult {
  const lines = rawText.replace(/\r\n/g, '\n').split('\n');
  const questions: TrueFalseQuestion[] = [];
  const sectionsSet = new Set<string>();
  const warnings: string[] = [];

  let detectedTitle = '';
  let currentSection = 'Genel Sorular';

  let pendingQuestion: {
    number: number;
    section: string;
    statementParts: string[];
    answer: boolean | null;
    explanationParts: string[];
    readingExplanation: boolean;
  } | null = null;

  const flushPending = () => {
    if (!pendingQuestion) return;
    const rawStatement = pendingQuestion.statementParts.join(' ').trim();
    // Clean bold wrapping on question stem
    const statement = unescapeMarkdownChars(stripOuterBoldMarkers(rawStatement))
      .replace(/^\*{2}/, '')
      .replace(/\*{2}$/, '')
      .trim();
    const explanation = unescapeMarkdownChars(pendingQuestion.explanationParts.join('\n').trim());

    if (statement && pendingQuestion.answer !== null) {
      const qNum = pendingQuestion.number || questions.length + 1;
      questions.push({
        id: `${setIdPrefix}-q${qNum}-${questions.length + 1}`,
        number: qNum,
        section: pendingQuestion.section,
        statement,
        answer: pendingQuestion.answer,
        explanation
      });
      sectionsSet.add(pendingQuestion.section);
    } else if (statement && pendingQuestion.answer === null) {
      warnings.push(`Soru ${pendingQuestion.number || questions.length + 1}: Cevap (DOĞRU/YANLIŞ) algılanamadı.`);
    }
    pendingQuestion = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line || /^-{3,}$/.test(line) || /^_{3,}$/.test(line)) {
      if (pendingQuestion && pendingQuestion.readingExplanation && pendingQuestion.explanationParts.length > 0) {
        // Horizontal rule ends a section / block
        if (/^[-_]{3,}$/.test(line)) {
          flushPending();
        }
      }
      continue;
    }

    // Check section heading (### ..., ## ..., # ...)
    if (/^#{1,6}\s+/.test(line)) {
      flushPending();
      const heading = cleanHeading(line);
      if (heading) {
        if (!detectedTitle && /^#\s+/.test(line)) {
          detectedTitle = heading;
        } else {
          currentSection = heading;
        }
      }
      continue;
    }

    // Check answer line (* **Cevap:** **[YANLIŞ]** or Cevap: DOĞRU)
    const plainAnswerLine = line.replace(/[*_`[\]]/g, '').trim();
    const answerMatch = plainAnswerLine.match(
      /^(?:[-•]\s*)?Cevap\s*:?\s*(DOĞRU|DOGRU|YANLIŞ|YANLIS|TRUE|FALSE)$/i
    );
    if (answerMatch && pendingQuestion) {
      const parsedBool = parseBooleanToken(answerMatch[1]);
      if (parsedBool !== null) {
        pendingQuestion.answer = parsedBool;
      }
      pendingQuestion.readingExplanation = false;
      continue;
    }

    // Check explanation line (* **Açıklama:** ... or Açıklama: ...)
    const explanationMatch = line.match(
      /^(?:[-*•]\s*)?(?:\*{1,2}|_{1,2})?(?:Açıklama|Aciklama)(?:\*{1,2}|_{1,2})?:(?:\*{1,2}|_{1,2})?\s*(.*)$/i
    );
    if (explanationMatch && pendingQuestion) {
      pendingQuestion.readingExplanation = true;
      const body = explanationMatch[1].trim();
      if (body) {
        pendingQuestion.explanationParts.push(body);
      }
      continue;
    }

    // Check numbered question start:
    // **1\. Text...**  or  **1. Text...**  or  1. Text...  or  1) Text...
    const qMatch = line.match(/^(\*{1,2})?\s*(\d{1,4})\s*(?:\\\.|[.)])\s*(.+)$/);
    if (qMatch) {
      flushPending();
      const hadOuterBold = qMatch[1] === '**';
      const qNum = Number(qMatch[2]);
      let stem = qMatch[3].trim();
      if (hadOuterBold && stem.endsWith('**')) {
        const beforeTrailing = stem.slice(0, -2);
        const boldPairCount = (beforeTrailing.match(/\*\*/g) || []).length;
        if (boldPairCount % 2 === 0) {
          stem = beforeTrailing.trim();
        }
      }
      pendingQuestion = {
        number: Number.isFinite(qNum) ? qNum : questions.length + 1,
        section: currentSection,
        statementParts: [stem],
        answer: null,
        explanationParts: [],
        readingExplanation: false
      };
      continue;
    }

    // Standalone "Bölüm X: ..." heading without # prefix
    if (/^(?:Bölüm|Ünite|Konu)\s+\d+\s*:/i.test(cleanHeading(line)) && !pendingQuestion) {
      currentSection = cleanHeading(line);
      continue;
    }

    // Continuation line for either statement or explanation
    if (pendingQuestion) {
      if (pendingQuestion.readingExplanation) {
        pendingQuestion.explanationParts.push(line);
      } else if (pendingQuestion.answer === null) {
        let stemPart = line;
        if (stemPart.endsWith('**') && !stemPart.slice(0, -2).includes('**')) {
          stemPart = stemPart.slice(0, -2).trim();
        }
        pendingQuestion.statementParts.push(stemPart);
      }
    }
  }

  flushPending();

  return {
    detectedTitle: detectedTitle || (sectionsSet.size > 0 ? Array.from(sectionsSet)[0] : 'Yeni Soru Seti'),
    sections: Array.from(sectionsSet),
    questions,
    warnings
  };
}

export interface InlineTextSegment {
  type: 'text' | 'bold' | 'italic';
  content: string;
}

/**
 * Safely splits markdown **bold** and *italic* segments for React rendering without HTML injection.
 */
export function parseInlineFormatting(raw: string): InlineTextSegment[] {
  if (!raw) return [];
  const cleaned = unescapeMarkdownChars(raw);
  const segments: InlineTextSegment[] = [];
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(cleaned)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: cleaned.slice(lastIndex, match.index)
      });
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      segments.push({
        type: 'bold',
        content: token.slice(2, -2)
      });
    } else if (token.startsWith('*') && token.endsWith('*')) {
      segments.push({
        type: 'italic',
        content: token.slice(1, -1)
      });
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < cleaned.length) {
    segments.push({
      type: 'text',
      content: cleaned.slice(lastIndex)
    });
  }

  return segments;
}
