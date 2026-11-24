/**
 * Deep Linking & URL Hash Rotalama Yardımcısı
 * 
 * Şişli Etfal Anesteziyoloji & Reanimasyon Portalı
 * Formatlar:
 *   #infografik=rsi-vs-elective
 *   #arac=intraop
 *   #arac=calculator
 */

export type HashRouteType = 'infografik' | 'arac' | 'tedavi' | 'blok';

export interface ParsedHashRoute {
  type: HashRouteType | null;
  id: string | null;
  subId?: string | null;
}

// Bilinen infografik kimlikleri
export const VALID_INFOGRAPHIC_IDS = [
  'iv-access',
  'fluid-management-strategies',
  'vasoactive-decision-matrix',
  'difficult-airway-das',
  'gastric-usg-perlas',
  'rsi-vs-elective',
  'adult-fasting',
  'pediatric-fasting',
  'modified-aldrete',
  'padss',
  'surgical-urgency-2024',
  'surgical-urgency',
  'surgical-risk',
  'respiratory-failure',
  'tiva-csht',
  'spontaneous-vs-ppv',
  'asa-basic-monitoring'
] as const;

export type ValidInfographicId = typeof VALID_INFOGRAPHIC_IDS[number];

// Bilinen klinik araç kimlikleri
export const VALID_TOOL_IDS = [
  'dashboard',
  'tools',
  'calculator',
  'abg',
  'mechanical-ventilation',
  'monitoring',
  'basics',
  'intraop',
  'infusion',
  'preop',
  'airway',
  'treatments',
  'nerve-blocks',
  'vascular-access',
  'emergencies',
  'infographics',
  'podcast',
  'question-bank',
  'contacts',
  'roster',
  'schedule',
  'icu',
  'procedures',
  'ekt',
  'references'
] as const;

export type ValidToolId = typeof VALID_TOOL_IDS[number];

const SPA_PATH_ROUTE_REGEX = /^\/(arac|blok|infografik|tedavi)\/([a-zA-Z0-9_-]+)\/?$/i;

/**
 * Mevcut window.location.hash, pathname (/arac/..., /blok/..., /infografik/..., /tedavi/...)
 * veya query string değerini çözümler.
 */
export function parseHashRoute(): ParsedHashRoute {
  if (typeof window === 'undefined') {
    return { type: null, id: null };
  }

  const hash = window.location.hash.replace(/^#/, '').trim();
  if (hash) {
    // 1. #tedavi=xyz veya #ilac=xyz veya #protocol=xyz
    const tedaviMatch = hash.match(/^(?:tedavi|ilac|ilaç|protocol)=([a-zA-Z0-9_-]+)/i);
    if (tedaviMatch && tedaviMatch[1]) {
      return { type: 'tedavi', id: tedaviMatch[1] };
    }

    // 2. #blok=xyz
    const blokMatch = hash.match(/^(?:blok|block)=([a-zA-Z0-9_-]+)/i);
    if (blokMatch && blokMatch[1]) {
      return { type: 'blok', id: blokMatch[1] };
    }

    // 3. #infografik=xyz veya #infographic=xyz
    const infoMatch = hash.match(/^(?:infografik|infographic)=([a-zA-Z0-9_-]+)/i);
    if (infoMatch && infoMatch[1]) {
      return { type: 'infografik', id: infoMatch[1] };
    }

    // 4. #arac=xyz veya #tool=xyz (veya #arac=treatments&tedavi=xyz, #arac=nerve-blocks&blok=xyz)
    const toolMatch = hash.match(/^(?:arac|araç|tool)=([a-zA-Z0-9_-]+)(?:&(?:tedavi|ilac|ilaç|blok|block|sub)=([a-zA-Z0-9_-]+))?/i);
    if (toolMatch && toolMatch[1]) {
      const toolKey = toolMatch[1].toLowerCase();
      if (toolKey === 'dashboard' || toolKey === 'tools') {
        return { type: 'arac', id: 'dashboard' };
      }
      if (toolKey === 'spinal' || toolKey === 'spinal-anestezi') {
        return { type: 'blok', id: 'spinal-anestezi' };
      }
      if (toolKey === 'respiratory-physiology' || toolKey === 'solunum-fizyolojisi') {
        return { type: 'arac', id: 'basics', subId: 'respiratory-physiology' };
      }
      if (toolKey === 'cardiovascular-physiology' || toolKey === 'kardiyovaskuler-fizyoloji') {
        return { type: 'arac', id: 'basics', subId: 'cardiovascular-physiology' };
      }
      if (
        toolKey === 'solunumsal-destek' ||
        toolKey === 'respiratory-support' ||
        toolKey === 'oksijen-tedavisi' ||
        toolKey === 'oxygen-therapy'
      ) {
        return { type: 'arac', id: 'mechanical-ventilation', subId: 'oxygen-therapy' };
      }
      if (toolKey === 'treatments' && toolMatch[2]) {
        return { type: 'tedavi', id: toolMatch[2] };
      }
      if (toolKey === 'nerve-blocks' && toolMatch[2]) {
        return { type: 'blok', id: toolMatch[2] };
      }
      return { type: 'arac', id: toolMatch[1], subId: toolMatch[2] || null };
    }

    // 5. Doğrudan kısa ad ile fallback kontrolü (örn. #rsi-vs-elective, #spinal-anestezi)
    if (hash.toLowerCase() === 'spinal' || hash.toLowerCase() === 'spinal-anestezi') {
      return { type: 'blok', id: 'spinal-anestezi' };
    }
    if (hash.toLowerCase() === 'respiratory-physiology' || hash.toLowerCase() === 'solunum-fizyolojisi') {
      return { type: 'arac', id: 'basics', subId: 'respiratory-physiology' };
    }
    if (hash.toLowerCase() === 'cardiovascular-physiology' || hash.toLowerCase() === 'kardiyovaskuler-fizyoloji') {
      return { type: 'arac', id: 'basics', subId: 'cardiovascular-physiology' };
    }
    if (
      hash.toLowerCase() === 'solunumsal-destek' ||
      hash.toLowerCase() === 'oksijen-tedavisi' ||
      hash.toLowerCase() === 'oxygen-therapy'
    ) {
      return { type: 'arac', id: 'mechanical-ventilation', subId: 'oxygen-therapy' };
    }

    if (VALID_INFOGRAPHIC_IDS.includes(hash as ValidInfographicId)) {
      return { type: 'infografik', id: hash };
    }

    if (hash.toLowerCase() === 'dashboard' || hash.toLowerCase() === 'tools') {
      return { type: 'arac', id: 'dashboard' };
    }

    if (VALID_TOOL_IDS.includes(hash as ValidToolId)) {
      return { type: 'arac', id: hash };
    }
  }

  // 6. SEO / Sitemap temiz yol (pathname) desteği: /arac/abg, /blok/spinal-anestezi, /infografik/..., /tedavi/...
  const pathMatch = window.location.pathname.match(SPA_PATH_ROUTE_REGEX);
  if (pathMatch && pathMatch[1] && pathMatch[2]) {
    const routeType = pathMatch[1].toLowerCase() as HashRouteType;
    return { type: routeType, id: pathMatch[2] };
  }

  // 7. Query string desteği: ?arac=abg, ?arac=basics&sub=respiratory-physiology, ?blok=spinal-anestezi vb.
  if (window.location.search) {
    const params = new URLSearchParams(window.location.search);
    const subParam = params.get('sub');
    const validSub = subParam && /^[a-zA-Z0-9_-]+$/.test(subParam) ? subParam : null;
    for (const key of ['tedavi', 'blok', 'infografik', 'arac'] as HashRouteType[]) {
      const val = params.get(key);
      if (val && /^[a-zA-Z0-9_-]+$/.test(val)) {
        return { type: key, id: val, subId: validSub };
      }
    }
  }

  return { type: null, id: null };
}

/**
 * SPA içi <a href="..."> bağlantıları için standart hash URL üretir.
 * Örn: buildHashHref('arac', 'preop', 'stop-bang') => '#arac=preop&sub=stop-bang'
 */
export function buildHashHref(type: HashRouteType, id: string, subId?: string | null): string {
  const base = `#${type}=${id}`;
  return subId ? `${base}&sub=${subId}` : base;
}

/**
 * Belirli bir bölüm için tam paylaşılabilir URL oluşturur.
 */
export function buildShareUrl(type: HashRouteType, id: string): string {
  if (typeof window === 'undefined') {
    return `#${type}=${id}`;
  }
  const basePath = SPA_PATH_ROUTE_REGEX.test(window.location.pathname) ? '/' : window.location.pathname;
  const baseUrl = `${window.location.origin}${basePath}`;
  return `${baseUrl}#${type}=${id}`;
}

/**
 * Tarayıcı adres çubuğundaki hash'i sayfa kaydırmadan günceller.
 */
export function updateHashRoute(type: HashRouteType | null, id: string | null): void {
  if (typeof window === 'undefined') return;

  try {
    const isSpaPath = SPA_PATH_ROUTE_REGEX.test(window.location.pathname);
    const normalizedPath = isSpaPath ? '/' : window.location.pathname;

    if (!type || !id) {
      if (window.location.hash || isSpaPath) {
        history.replaceState(null, '', normalizedPath + window.location.search);
        try {
          window.dispatchEvent(new Event('hashchange'));
        } catch {
          // ignore
        }
      }
      return;
    }

    const newHash = `#${type}=${id}`;
    if (window.location.hash !== newHash || isSpaPath) {
      history.replaceState(null, '', `${normalizedPath}${window.location.search}${newHash}`);
      try {
        window.dispatchEvent(new Event('hashchange'));
      } catch {
        // ignore
      }
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
