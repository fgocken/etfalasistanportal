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
export function getProcedureIndispensableRules(
  procedure: ProcedureDefinition
): ParsedRulesResult {
  // 1. Doğrudan yapısal olarak tanımlanmış kurallar varsa öncelikli kullan
  const explicitRules = procedure.indispensableRules || procedure.anesthesiaTechniques?.indispensableRules;
  const explicitTitle = procedure.rulesTitle || procedure.anesthesiaTechniques?.rulesTitle;

  if (explicitRules && explicitRules.length > 0) {
    return {
      hasRules: true,
      headerTitle: explicitTitle || `${procedure.name.toUpperCase()} ANESTEZİSİNDE VAZGEÇİLMEZ KURALLAR`,
      rules: explicitRules,
      airwayRationale: procedure.anesthesiaTechniques?.notes
    };
  }

  const notes = procedure.anesthesiaTechniques?.notes?.trim();
  if (!notes) {
    return {
      hasRules: false,
      headerTitle: '',
      rules: []
    };
  }

  // Not metninde (1) kural başlangıcı aranır
  const firstRuleIdx = notes.indexOf('(1)');
  const mentionsRules = /VAZGEÇİLMEZ|ALTIN KURAL|KRİTİK KURAL|HAYATİ KURAL|ÖLÜMCÜL KURAL|TEMEL DİREĞİ|TEMEL AYAR/i.test(notes);

  // Eğer numaralı kural dizilimi yoksa bu klasik bir "Hava Yolu ve Klinik Tercih Notu"dur
  if (firstRuleIdx === -1 && !mentionsRules) {
    return {
      hasRules: false,
      headerTitle: 'Klinik Tercih Gerekçesi ve Hava Yolu Kararı',
      rules: [],
      airwayRationale: notes
    };
  }

  // Başlığı çek: (1)'den önceki metin
  let title = `${procedure.name.toUpperCase()} CERRAHİSİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI`;
  let preNote: string | undefined = undefined;

  if (firstRuleIdx > 0) {
    const rawHeader = notes.substring(0, firstRuleIdx).trim().replace(/[:—\-\s]+$/, '');
    if (rawHeader.length > 3) {
      // Eğer başlık içinde VAZGEÇİLMEZ veya KURAL geçiyorsa bunu başlık yap
      if (/VAZGEÇİLMEZ|KURAL|DİREĞİ|HAYATİ|HEDEF|AYAR|SÜTUN/i.test(rawHeader)) {
        title = rawHeader;
      } else {
        preNote = rawHeader;
      }
    }
  }

  // Kuralları ayrıştır: (1) ... (2) ... (3) ... (4) ... (5) ...
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

    let ruleTitle = `Kural ${num}`;
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
      headerTitle: title,
      rules,
      airwayRationale: preNote
    };
  }

  // Ayrıştırma 2'den az kural bulduysa orijinal not olarak göster
  return {
    hasRules: false,
    headerTitle: 'Klinik Tercih Gerekçesi ve Hava Yolu Kararı',
    rules: [],
    airwayRationale: notes
  };
}
