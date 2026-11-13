import { IndispensableRule, ProcedureDefinition } from '../types/procedures';

export interface ParsedRulesResult {
  hasRules: boolean;
  headerTitle: string;
  rules: IndispensableRule[];
  airwayRationale?: string;
}

/**
 * Prosedür notlarından veya tanımlı kurallardan "Anestezinin Vazgeçilmez Kuralları"nı
 * akıllı ve ayrıştırılmış bir yapıya dönüştürür.
 * 
 * Hem mevcut 42+ prosedürdeki serbest metin formatını (1), (2), (3)... 
 * hem de gelecekte eklenecek yapısal `indispensableRules` dizisini destekler.
 */
function normalizePrinciplesTitle(rawTitle: string): string {
  return rawTitle
    .replace(/(^|\s)[2-9]\s+VAZGEÇİLMEZ\s+KURALI(?=\s|$)/gi, '$1TEMEL İLKELERİ')
    .replace(/(^|\s)[2-9]\s+ÖLÜMCÜL\s+KURALI(?=\s|$)/gi, '$1HAYATİ İLKELERİ')
    .replace(/(^|\s)[2-9]\s+HAYATİ\s+ANESTEZİ\s+KURALI(?=\s|$)/gi, '$1HAYATİ ANESTEZİ İLKELERİ')
    .replace(/(^|\s)[2-9]\s+VAZGEÇİLMEZ\s+DİREĞİ(?=\s|$)/gi, '$1TEMEL İLKELERİ')
    .replace(/(^|\s)[2-9]\s+TEMEL\s+DİREĞİ(?=\s|$)/gi, '$1TEMEL İLKELERİ')
    .replace(/(^|\s)[2-9]\s+KRİTİK\s+KLİNİK\s+NOKTASI(?=\s|$)/gi, '$1KRİTİK KLİNİK NOKTALARI')
    .replace(/(^|\s)[2-9]\s+ALTIN\s+KURALI(?=\s|$)/gi, '$1ALTIN İLKELERİ')
    .replace(/(^|\s)[2-9]\s+VAZGEÇİLMEZ\s+İLKESİ(?=\s|$)/gi, '$1VAZGEÇİLMEZ İLKELERİ')
    .replace(/(^|\s)[2-9]\s+TEMEL\s+HEDEFİ(?=\s|$)/gi, '$1TEMEL HEDEFLERİ')
    .replace(/(^|\s)[2-9]\s+HAYATİ\s+HEDEFİ(?=\s|$)/gi, '$1HAYATİ HEDEFLERİ')
    .replace(/(^|\s)[2-9]\s+KRİTİK\s+SÜTUNU(?=\s|$)/gi, '$1KRİTİK SÜTUNLARI')
    .replace(/(^|\s)[2-9]\s+TEMEL\s+AYAĞI(?=\s|$)/gi, '$1TEMEL AYAKLARI')
    .replace(/(^|\s)[2-9]\s+HAYATİ\s+ZORUNLULUĞU(?=\s|$)/gi, '$1HAYATİ ÖNCELİKLERİ')
    .replace(/(^|\s)ALTIN\s+ÜÇGENİ(?=\s|$)/gi, '$1TEMEL ANESTEZİ İLKELERİ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function getProcedureIndispensableRules(
  procedure: ProcedureDefinition
): ParsedRulesResult {
  const explicitRationale = procedure.anesthesiaTechniques?.clinicalRationale?.trim();

  // 1. Doğrudan yapısal olarak tanımlanmış kurallar varsa öncelikli kullan
  const explicitRules = procedure.indispensableRules || procedure.anesthesiaTechniques?.indispensableRules;
  const explicitTitle = procedure.rulesTitle || procedure.anesthesiaTechniques?.rulesTitle;

  if (explicitRules && explicitRules.length > 0) {
    // Kurallar zaten ayrıştırılmış nesneler halinde mevcut; notes alanı kural metninin tekrarıysa ek not olarak gösterilmez
    let cleanAirwayRationale: string | undefined = explicitRationale;
    if (!cleanAirwayRationale) {
      const rawNotes = procedure.anesthesiaTechniques?.notes?.trim();
      if (rawNotes) {
        const isDuplicateOfRules = /\([1-9]\)/.test(rawNotes) || 
          /VAZGEÇİLMEZ|ALTIN KURAL|KRİTİK KURAL|HAYATİ KURAL|ÖLÜMCÜL KURAL|TEMEL DİREĞİ|TEMEL AYAR|ALTIN ÜÇGEN|TEMEL AYAK|KRİTİK KLİNİK NOKTA|HAYATİ ZORUNLULUK|TEMEL İLKE/i.test(rawNotes);
        if (!isDuplicateOfRules) {
          cleanAirwayRationale = rawNotes;
        }
      }
    }

    return {
      hasRules: true,
      headerTitle: normalizePrinciplesTitle(
        explicitTitle || `${procedure.name.toUpperCase()} — TEMEL ANESTEZİ İLKELERİ`
      ),
      rules: explicitRules,
      airwayRationale: cleanAirwayRationale
    };
  }

  const notes = procedure.anesthesiaTechniques?.notes?.trim();
  if (!notes) {
    return {
      hasRules: false,
      headerTitle: '',
      rules: [],
      airwayRationale: explicitRationale
    };
  }

  // Not metninde (1) kural başlangıcı aranır
  const firstRuleIdx = notes.indexOf('(1)');
  const mentionsRules = /VAZGEÇİLMEZ|ALTIN KURAL|KRİTİK KURAL|HAYATİ KURAL|ÖLÜMCÜL KURAL|TEMEL DİREĞİ|TEMEL AYAR|ALTIN ÜÇGEN|TEMEL AYAK|KRİTİK KLİNİK NOKTA|HAYATİ ZORUNLULUK|HAYATİ HEDEF|TEMEL HEDEF|TEMEL İLKE/i.test(notes);

  // Eğer numaralı kural dizilimi yoksa bu klasik bir "Hava Yolu ve Klinik Tercih Notu"dur
  if (firstRuleIdx === -1 && !mentionsRules) {
    return {
      hasRules: false,
      headerTitle: 'Klinik Tercih Gerekçesi ve Hava Yolu Kararı',
      rules: [],
      airwayRationale: explicitRationale || notes
    };
  }

  // Başlığı çek: (1)'den önceki metin
  let title = `${procedure.name.toUpperCase()} — TEMEL ANESTEZİ İLKELERİ`;
  let preNote: string | undefined = explicitRationale;

  if (firstRuleIdx > 0) {
    const rawHeader = notes.substring(0, firstRuleIdx).trim().replace(/[:—\-\s]+$/, '');
    if (rawHeader.length > 3) {
      // Eğer başlık içinde kural anahtar kelimeleri geçiyorsa veya standart başlık uzunluğundaysa bunu başlık yap
      const isTitlePattern = /VAZGEÇİLMEZ|KURAL|DİREĞİ|HAYATİ|HEDEF|AYAR|SÜTUN|ÜÇGEN|AYAĞI|AYAK|NOKTA|İLKE|ZORUNLULUK|KRİTİK/i.test(rawHeader) || rawHeader.length < 130;
      if (isTitlePattern) {
        title = rawHeader;
      } else if (!preNote) {
        preNote = rawHeader;
      }
    }
  }

  // Eğer preNote başlık ile aynıysa veya kural belirteçleri içeriyorsa iptal et
  if (!explicitRationale && preNote && (/\([1-9]\)/.test(preNote) || preNote.trim() === title.trim())) {
    preNote = undefined;
  }

  // Kuralları ayrıştır: (1) ... (2) ... (3) ...
  const rules: IndispensableRule[] = [];
  const rulePattern = /\(([1-9])\)\s*([\s\S]+?)(?=\([1-9]\)|$)/g;
  let match: RegExpExecArray | null;

  while ((match = rulePattern.exec(notes)) !== null) {
    const num = parseInt(match[1], 10);
    const body = match[2].trim();

    // Başlık ile içeriği ayıran ayırıcıyı bul (em-dash, en-dash, tire veya iki nokta)
    const emDashIdx = body.indexOf(' — ');
    const enDashIdx = body.indexOf(' – ');
    const hyphenIdx = body.indexOf(' - ');
    const colonIdx = body.indexOf(': ');

    const candidates = [
      { idx: emDashIdx, len: 3 },
      { idx: enDashIdx, len: 3 },
      { idx: hyphenIdx, len: 3 },
      { idx: colonIdx, len: 2 }
    ].filter(c => c.idx !== -1).sort((a, b) => a.idx - b.idx);

    let splitIdx = -1;
    let sepLen = 0;

    if (candidates.length > 0 && candidates[0].idx < 140) {
      splitIdx = candidates[0].idx;
      sepLen = candidates[0].len;
    }

    let ruleTitle = `Klinik İlke ${num}`;
    let content = body;

    if (splitIdx !== -1) {
      ruleTitle = body.substring(0, splitIdx).trim();
      content = body.substring(splitIdx + sepLen).trim();
    }

    rules.push({
      number: num,
      title: ruleTitle,
      content
    });
  }

  if (rules.length >= 2) {
    return {
      hasRules: true,
      headerTitle: normalizePrinciplesTitle(title),
      rules,
      airwayRationale: preNote
    };
  }

  // Ayrıştırma 2'den az kural bulduysa orijinal not olarak göster
  return {
    hasRules: false,
    headerTitle: 'Klinik Tercih Gerekçesi ve Hava Yolu Kararı',
    rules: [],
    airwayRationale: explicitRationale || notes
  };
}
