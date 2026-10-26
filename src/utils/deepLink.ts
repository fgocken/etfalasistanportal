/**
 * Deep Linking & URL Hash Rotalama Yardımcısı
 * 
 * Şişli Etfal Anesteziyoloji & Reanimasyon Portalı
 * Formatlar:
 *   #infografik=rsi-vs-elective
 *   #arac=intraop
 *   #arac=calculator
 */

export type HashRouteType = 'infografik' | 'arac';

export interface ParsedHashRoute {
  type: HashRouteType | null;
  id: string | null;
}

// Bilinen infografik kimlikleri
export const VALID_INFOGRAPHIC_IDS = [
  'rsi-vs-elective',
  'adult-fasting',
  'pediatric-fasting',
  'modified-aldrete',
  'padss',
  'surgical-urgency-2024',
  'surgical-urgency',
  'surgical-risk'
] as const;

export type ValidInfographicId = typeof VALID_INFOGRAPHIC_IDS[number];

// Bilinen klinik araç kimlikleri
export const VALID_TOOL_IDS = [
  'calculator',
  'intraop',
  'infusion',
  'preop',
  'airway',
  'treatments',
  'infographics',
  'contacts',
  'roster'
] as const;

export type ValidToolId = typeof VALID_TOOL_IDS[number];

/**
 * Mevcut window.location.hash değerini çözümler.
 */
export function parseHashRoute(): ParsedHashRoute {
  if (typeof window === 'undefined') {
    return { type: null, id: null };
  }

  const hash = window.location.hash.replace(/^#/, '').trim();
  if (!hash) {
    return { type: null, id: null };
  }

  // 1. #infografik=xyz veya #infographic=xyz
  const infoMatch = hash.match(/^(?:infografik|infographic)=([a-zA-Z0-9_-]+)/i);
  if (infoMatch && infoMatch[1]) {
    return { type: 'infografik', id: infoMatch[1] };
  }

  // 2. #arac=xyz veya #tool=xyz
  const toolMatch = hash.match(/^(?:arac|araç|tool)=([a-zA-Z0-9_-]+)/i);
  if (toolMatch && toolMatch[1]) {
    return { type: 'arac', id: toolMatch[1] };
  }

  // 3. Doğrudan kısa ad ile fallback kontrolü (örn. #rsi-vs-elective)
  if (VALID_INFOGRAPHIC_IDS.includes(hash as ValidInfographicId)) {
    return { type: 'infografik', id: hash };
  }

  if (VALID_TOOL_IDS.includes(hash as ValidToolId)) {
    return { type: 'arac', id: hash };
  }

  return { type: null, id: null };
}

/**
 * Belirli bir bölüm için tam paylaşılabilir URL oluşturur.
 */
export function buildShareUrl(type: HashRouteType, id: string): string {
  if (typeof window === 'undefined') {
    return `#${type}=${id}`;
  }
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}#${type}=${id}`;
}

/**
 * Tarayıcı adres çubuğundaki hash'i sayfa kaydırmadan günceller.
 */
export function updateHashRoute(type: HashRouteType | null, id: string | null): void {
  if (typeof window === 'undefined') return;

  try {
    if (!type || !id) {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      return;
    }

    const newHash = `#${type}=${id}`;
    if (window.location.hash !== newHash) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}${newHash}`);
    }
  } catch (e) {
    console.error('Hash update error:', e);
  }
}

/**
 * Verilen URL'yi panoya kopyalar.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback'e devam
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Clipboard copy error:', err);
    return false;
  }
}
