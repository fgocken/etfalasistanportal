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
  'asa-basic-monitoring',
  'diuretics-nephron',
  'surgical-cancellation-matrix',
  'antithrombotic-matrix',
  'ponv-management'
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

const SPA_PATH_ROUTE_REGEX = /^\/(arac|blok|infografik|tedavi)\/([a-zA-Z0-9_-]+)(?:\/([a-zA-Z0-9_-]+))?\/?$/i;

function canUseCleanPathRouting(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.location.protocol.startsWith('http')) return false;
  const p = window.location.pathname || '/';
  return p === '/' || SPA_PATH_ROUTE_REGEX.test(p);
}

/**
 * Verilen rota bileşenlerinden temiz SPA path üretir.
 * Örn: ('arac', 'emergencies&sub=icp-crisis') => '/arac/emergencies/icp-crisis'
 */
export function buildCleanPath(type: HashRouteType, id: string, subId?: string | null): string {
  const [rawId, embeddedSub] = id.split(/&(?:sub|tedavi|ilac|ilaç|blok|block)=/i);
  const cleanId = rawId.trim();
  const cleanSub = (subId || embeddedSub || '').trim();
  return cleanSub ? `/${type}/${cleanId}/${cleanSub}` : `/${type}/${cleanId}`;
}

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

  // 6. SEO / Sitemap / GA4 temiz yol (pathname) desteği: /arac/abg, /arac/emergencies/icp-crisis, /blok/..., /infografik/..., /tedavi/...
  const pathMatch = window.location.pathname.match(SPA_PATH_ROUTE_REGEX);
  if (pathMatch && pathMatch[1] && pathMatch[2]) {
    const routeType = pathMatch[1].toLowerCase() as HashRouteType;
    const rawId = pathMatch[2];
    const rawSub = pathMatch[3] || null;
    if (routeType === 'arac' && (rawId.toLowerCase() === 'dashboard' || rawId.toLowerCase() === 'tools')) {
      return { type: 'arac', id: 'dashboard' };
    }
    if (routeType === 'arac' && rawId.toLowerCase() === 'treatments' && rawSub) {
      return { type: 'tedavi', id: rawSub };
    }
    if (routeType === 'arac' && rawId.toLowerCase() === 'nerve-blocks' && rawSub) {
      return { type: 'blok', id: rawSub };
    }
    return { type: routeType, id: rawId, subId: rawSub };
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
 * SPA içi <a href="..."> bağlantıları için temiz URL üretir.
 * Örn: buildHashHref('arac', 'preop', 'stop-bang') => '/arac/preop/stop-bang'
 */
export function buildHashHref(type: HashRouteType, id: string, subId?: string | null): string {
  if (canUseCleanPathRouting()) {
    return buildCleanPath(type, id, subId);
  }
  const base = `#${type}=${id}`;
  return subId ? `${base}&sub=${subId}` : base;
}

/**
 * Belirli bir bölüm için tam paylaşılabilir URL oluşturur.
 */
export function buildShareUrl(type: HashRouteType, id: string): string {
  if (typeof window === 'undefined') {
    return buildCleanPath(type, id);
  }
  if (canUseCleanPathRouting()) {
    return `${window.location.origin}${buildCleanPath(type, id)}`;
  }
  const basePath = SPA_PATH_ROUTE_REGEX.test(window.location.pathname) ? '/' : window.location.pathname;
  return `${window.location.origin}${basePath}#${type}=${id}`;
}

const TOOL_TITLE_LABELS: Record<string, string> = {
  dashboard: 'Ana Panel (Dashboard)',
  tools: 'Ana Panel (Dashboard)',
  calculator: 'Klinik Hesaplayıcılar',
  abg: 'Kan Gazı (AKG) & Asit-Baz',
  'mechanical-ventilation': 'Solunumsal Destek & Ventilasyon',
  monitoring: 'Monitörizasyon (ASA)',
  basics: 'Temel Anestezi Fizyolojisi',
  intraop: 'İntraoperatif Yönetim',
  infusion: 'İnfüzyon Pompası Hesaplayıcı',
  preop: 'Preoperatif Değerlendirme',
  airway: 'Havayolu Yönetimi',
  treatments: 'Tedaviler & İlaçlar',
  'nerve-blocks': 'Nöraksiyel & Periferik Sinir Blokları',
  'vascular-access': 'Vasküler Erişim',
  emergencies: 'Anestezi Acilleri & Troubleshooting',
  infographics: 'Klinik İnfografikler',
  podcast: 'Anestezi Podcast',
  'question-bank': 'Soru Bankası',
  contacts: 'Hastane Rehberi',
  roster: 'Nöbet Listesi',
  schedule: 'Haftalık Program',
  icu: 'Yoğun Bakım (YBÜ)',
  procedures: 'Cerrahi Prosedürler',
  ekt: 'EKT Anestezisi',
  references: 'Kılavuzlar & Kaynaklar',
};

const BASE_PORTAL_TITLE = 'Şişli Etfal EAH Anestezi ve Reanimasyon Asistan Portalı';

function humanizeSlug(slug: string): string {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/**
 * Aktif rota için dinamik sayfa başlığı üretir (tarayıcı sekmesi + GA4 page_title).
 */
export function getRoutePageTitle(route: ParsedHashRoute): string {
  if (!route.type || !route.id) {
    return BASE_PORTAL_TITLE;
  }
  if (route.type === 'tedavi') {
    return `${humanizeSlug(route.id)} · İlaç Monografisi | Şişli Etfal Anestezi`;
  }
  if (route.type === 'infografik') {
    return `${humanizeSlug(route.id)} · İnfografik | Şişli Etfal Anestezi`;
  }
  if (route.type === 'blok') {
    return `${humanizeSlug(route.id)} · Sinir Bloğu | Şişli Etfal Anestezi`;
  }
  const toolLabel = TOOL_TITLE_LABELS[route.id] || humanizeSlug(route.id);
  if (route.subId) {
    return `${humanizeSlug(route.subId)} · ${toolLabel} | Şişli Etfal Anestezi`;
  }
  return `${toolLabel} | Şişli Etfal Anestezi`;
}

/**
 * GTM / GA4 için temiz sanal sayfa görüntüleme olayı (`virtual_page_view`) ve dinamik `document.title` gönderir.
 */
export function trackRoutePageView(route: ParsedHashRoute): void {
  if (typeof window === 'undefined') return;
  const pageTitle = getRoutePageTitle(route);
  document.title = pageTitle;

  const pagePath =
    route.type && route.id
      ? buildCleanPath(route.type, route.id, route.subId)
      : window.location.pathname || '/';
  const pageLocation = `${window.location.origin}${pagePath}`;

  try {
    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({
      event: 'virtual_page_view',
      page_path: pagePath,
      page_title: pageTitle,
      page_location: pageLocation,
      route_type: route.type || 'home',
      route_id: route.id || 'welcome',
      route_sub_id: route.subId || '',
    });
  } catch {
    // ignore
  }
}

/**
 * Mevcut rotadan hiyerarşik olarak bir üst (geri) rotayı hesaplar.
 * En geri nokta `dashboard` olarak kabul edilir; dashboard'dayken `null` döner.
 */
export function getParentRoute(route: ParsedHashRoute): { type: HashRouteType; id: string } | null {
  if (!route.type || !route.id) {
    return null;
  }

  if (route.type === 'tedavi') {
    return { type: 'arac', id: 'treatments' };
  }
  if (route.type === 'infografik') {
    return { type: 'arac', id: 'infographics' };
  }
  if (route.type === 'blok') {
    return { type: 'arac', id: 'nerve-blocks' };
  }
  if (route.type === 'arac') {
    if (route.subId) {
      return { type: 'arac', id: route.id };
    }
    if (route.id === 'dashboard' || route.id === 'tools') {
      return null;
    }
    return { type: 'arac', id: 'dashboard' };
  }

  return null;
}

/**
 * Tarayıcı adres çubuğundaki rotayı günceller.
 * - Kök dizinde (Vercel / üretim) temiz SPA pathname (`/tedavi/cefazolin`, `/infografik/ponv-management`,
 *   `/arac/emergencies/icp-crisis`) kullanarak GA4, GTM, Vercel Analytics ve mobil Geri tuşunun
 *   her alt sayfayı ayrı ayrı algılamasını sağlar.
 * - Varsayılan olarak `history.pushState` kullanır (`replace: true` ile geçmişe eklemeden değiştirilebilir).
 */
export function updateHashRoute(
  type: HashRouteType | null,
  id: string | null,
  options?: { replace?: boolean }
): void {
  if (typeof window === 'undefined') return;

  try {
    const useCleanPath = canUseCleanPathRouting();
    const isSpaPath = SPA_PATH_ROUTE_REGEX.test(window.location.pathname);
    const normalizedPath = isSpaPath ? '/' : window.location.pathname;
    const useReplace = Boolean(options?.replace);

    if (!type || !id) {
      if (window.location.hash || isSpaPath) {
        const nextUrl = `${normalizedPath}${window.location.search}`;
        if (useReplace) {
          history.replaceState(null, '', nextUrl);
        } else {
          history.pushState(null, '', nextUrl);
        }
        try {
          window.dispatchEvent(new Event('hashchange'));
        } catch {
          // ignore
        }
      }
      return;
    }

    if (useCleanPath) {
      const cleanPath = buildCleanPath(type, id);
      const nextUrl = `${cleanPath}${window.location.search}`;
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (currentUrl !== nextUrl || window.location.hash) {
        if (useReplace) {
          history.replaceState(null, '', nextUrl);
        } else {
          history.pushState(null, '', nextUrl);
        }
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
      const nextUrl = `${normalizedPath}${window.location.search}${newHash}`;
      if (useReplace) {
        history.replaceState(null, '', nextUrl);
      } else {
        history.pushState(null, '', nextUrl);
      }
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
