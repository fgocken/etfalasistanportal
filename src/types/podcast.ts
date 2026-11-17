export type PodcastChannelId = 'comez' | 'ileri';

export interface PodcastChannelDefinition {
  id: PodcastChannelId;
  title: string;
  shortTitle: string;
  levelLabel: string;
  description: string;
  defaultRssUrl: string;
  defaultSpotifyUrl: string;
}

export const PODCAST_CHANNELS: PodcastChannelDefinition[] = [
  {
    id: 'comez',
    title: 'Çömez Podcast Kanalı',
    shortTitle: 'Çömez',
    levelLabel: 'Temel Düzey · 1–2. Yıl Asistan',
    description:
      'Miller Anestezi Bölümleri Çömez Serisi: temel anestezi kavramları, ameliyathane hazırlığı, nöbet başucu konuları ve sadeleştirilmiş anlatım.',
    defaultRssUrl: 'https://anchor.fm/s/11a44c3dc/podcast/rss',
    defaultSpotifyUrl: 'https://podcasters.spotify.com/pod/show/furkan-gken71'
  },
  {
    id: 'ileri',
    title: 'İleri Düzey Podcast Kanalı',
    shortTitle: 'İleri Düzey',
    levelLabel: 'İleri Düzey · Miller’s & Subspesifik',
    description:
      'Miller’s Anesthesia bölümleri, derin fizyopatoloji, karmaşık vakalar, YBÜ ve ileri klinik karar süreçleri.',
    defaultRssUrl: 'https://anchor.fm/s/11a3a92e0/podcast/rss',
    defaultSpotifyUrl: 'https://podcasters.spotify.com/pod/show/furkan-gken7'
  }
];

export interface PodcastConfig {
  rssUrl: string;
  spotifyShowUrl: string;
  updatedAt?: string;
}

export interface PodcastShowMeta {
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  link: string;
  language?: string;
}

export type PodcastCategory =
  | 'Havayolu'
  | 'Yoğun Bakım'
  | 'Farmakoloji'
  | 'Rejyonal & Blok'
  | 'Hemodinami & Sıvı'
  | 'Klinik Vaka'
  | 'Genel Anestezi';

export interface PodcastNoteLink {
  label: string;
  url: string;
}

export interface PodcastEpisode {
  guid: string;
  title: string;
  descriptionText: string;
  links: PodcastNoteLink[];
  audioUrl: string;
  audioType: string;
  durationSec: number;
  pubDateIso: string;
  coverImage: string;
  episodeNumber: number | null;
  category: PodcastCategory;
  episodeLink: string;
  spotifyUrl: string;
}

export interface PodcastFeedResponse {
  success: boolean;
  configured: boolean;
  channelId?: PodcastChannelId;
  config: PodcastConfig | null;
  show: PodcastShowMeta | null;
  episodes: PodcastEpisode[];
  cachedAt: string | null;
  fromCache: boolean;
  staleWarning?: string;
  error?: string;
}

export interface PodcastEpisodeProgress {
  positionSec: number;
  durationSec: number;
  completed: boolean;
  updatedAt: string;
  personalNote?: string;
}

export interface PodcastLocalState {
  lastPlayedGuid: string | null;
  lastPlayedByChannel?: Partial<Record<PodcastChannelId, string | null>>;
  playbackRate: number;
  episodes: Record<string, PodcastEpisodeProgress>;
}

const CATEGORY_RULES: Array<{ category: PodcastCategory; pattern: RegExp }> = [
  {
    category: 'Havayolu',
    pattern:
      /(?:^|[^\p{L}])(havayolu yönetimi|zor havayolu|airway|entübasyon|entubasyon|laringoskop|krikotiroidotomi|cico|larengeal maske|lma)(?=$|[^\p{L}])/iu
  },
  {
    category: 'Yoğun Bakım',
    pattern:
      /(?:^|[^\p{L}])(yoğun bakım|yogun bakim|ybü|icu|mekanik ventilasyon|ventilatör|ards|sepsis|kan gazı|asit[- ]baz|stewart)(?=$|[^\p{L}])/iu
  },
  {
    category: 'Rejyonal & Blok',
    pattern:
      /(?:^|[^\p{L}])(rejyonal|spinal|epidural|pleksus|intralipid|periferik sinir|sinir bloğu|sinir blokajı|fasya bloğu|tap blok|esp blok|peng blok|blokaj|last)(?=$|[^\p{L}])/iu
  },
  {
    category: 'Farmakoloji',
    pattern:
      /(?:^|[^\p{L}])(propofol|ketamin|remifentanil|fentanil|sevofluran|desfluran|rokuronyum|sugammadeks|lokal anestezik|noradrenalin|adrenalin|farmakoloji|farmakokinetik)(?=$|[^\p{L}])/iu
  },
  {
    category: 'Hemodinami & Sıvı',
    pattern:
      /(?:^|[^\p{L}])(sıvı tedavisi|sıvı yönetimi|gdft|kristaloid|masif transfüzyon|hemodinami|arteriyel kateter|santral venöz|vazopresör)(?=$|[^\p{L}])/iu
  },
  {
    category: 'Klinik Vaka',
    pattern:
      /(?:^|[^\p{L}])(vaka sunumu|olgu sunumu|malign hipertermi|anafilaksi|amniyotik sıvı embolisi|pnömotoraks)(?=$|[^\p{L}])/iu
  }
];

export function inferPodcastCategory(title: string, description: string): PodcastCategory {
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(title)) {
      return rule.category;
    }
  }
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(description)) {
      return rule.category;
    }
  }
  return 'Genel Anestezi';
}

export function formatDurationClock(totalSec: number): string {
  if (!Number.isFinite(totalSec) || totalSec <= 0) return '00:00';
  const rounded = Math.floor(totalSec);
  const h = Math.floor(rounded / 3600);
  const m = Math.floor((rounded % 3600) / 60);
  const s = rounded % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function formatDurationShortTr(totalSec: number): string {
  if (!Number.isFinite(totalSec) || totalSec <= 0) return 'Süre belirtilmemiş';
  const mins = Math.round(totalSec / 60);
  if (mins < 1) return `${Math.round(totalSec)} sn`;
  if (mins < 60) return `${mins} dk`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h} sa ${m} dk` : `${h} sa`;
}

export function formatPubDateTr(isoDate: string): string {
  if (!isoDate) return '';
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function extractSpotifyEmbedUrl(rawUrl: string): string | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();
  const match = trimmed.match(/open\.spotify\.com\/(?:intl-[a-z-]+\/)?(show|episode)\/([a-zA-Z0-9]+)/i);
  if (!match) return null;
  return `https://open.spotify.com/embed/${match[1].toLowerCase()}/${match[2]}?utm_source=generator`;
}

export interface GoogleDocEmbedInfo {
  docId: string;
  originalUrl: string;
  embedUrl: string;
  openUrl: string;
  label: string;
}

export function extractGoogleDocEmbed(rawUrl: string, label = ''): GoogleDocEmbedInfo | null {
  if (!rawUrl) return null;
  const trimmed = rawUrl.trim();

  // Published Google Doc: https://docs.google.com/document/d/e/<PUB_ID>/pub
  const pubMatch = trimmed.match(/docs\.google\.com\/document\/(?:u\/\d+\/)?d\/e\/([a-zA-Z0-9_-]+)/i);
  if (pubMatch) {
    const docId = `pub-${pubMatch[1]}`;
    return {
      docId,
      originalUrl: trimmed,
      embedUrl: `https://docs.google.com/document/d/e/${pubMatch[1]}/pub?embedded=true`,
      openUrl: trimmed,
      label: label && !/^docs\.google\.com/i.test(label) ? label : 'Google Doküman (Bölüm Notu)'
    };
  }

  // Standard Google Doc: https://docs.google.com/document/d/<DOC_ID>/edit?...
  const docMatch = trimmed.match(/docs\.google\.com\/document\/(?:u\/\d+\/)?d\/([a-zA-Z0-9_-]{10,})/i);
  if (docMatch) {
    const docId = docMatch[1];
    return {
      docId,
      originalUrl: trimmed,
      embedUrl: `https://docs.google.com/document/d/${docId}/preview`,
      openUrl: `https://docs.google.com/document/d/${docId}/view`,
      label: label && !/^docs\.google\.com/i.test(label) ? label : 'Google Doküman (Bölüm Notu)'
    };
  }

  // Google Drive file preview: https://drive.google.com/file/d/<FILE_ID>/view
  const driveFileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{10,})/i);
  if (driveFileMatch) {
    const docId = driveFileMatch[1];
    return {
      docId,
      originalUrl: trimmed,
      embedUrl: `https://drive.google.com/file/d/${docId}/preview`,
      openUrl: `https://drive.google.com/file/d/${docId}/view`,
      label: label && !/^drive\.google\.com/i.test(label) ? label : 'Google Drive Dokümanı'
    };
  }

  // Google Drive open?id=<FILE_ID>
  const driveOpenMatch = trimmed.match(/drive\.google\.com\/open\?(?:[^#]*&)?id=([a-zA-Z0-9_-]{10,})/i);
  if (driveOpenMatch) {
    const docId = driveOpenMatch[1];
    return {
      docId,
      originalUrl: trimmed,
      embedUrl: `https://drive.google.com/file/d/${docId}/preview`,
      openUrl: `https://drive.google.com/file/d/${docId}/view`,
      label: label && !/^drive\.google\.com/i.test(label) ? label : 'Google Drive Dokümanı'
    };
  }

  return null;
}

export function extractGoogleDocEmbedsFromEpisode(episode: PodcastEpisode): GoogleDocEmbedInfo[] {
  const results: GoogleDocEmbedInfo[] = [];
  const seenIds = new Set<string>();

  for (const lnk of episode.links || []) {
    const parsed = extractGoogleDocEmbed(lnk.url, lnk.label);
    if (parsed && !seenIds.has(parsed.docId)) {
      seenIds.add(parsed.docId);
      results.push(parsed);
    }
  }

  if (episode.descriptionText) {
    const urlMatches = episode.descriptionText.match(/https?:\/\/[^\s)<>]+/g) || [];
    for (const raw of urlMatches) {
      const cleaned = raw.replace(/[.,;!?]+$/, '');
      const parsed = extractGoogleDocEmbed(cleaned);
      if (parsed && !seenIds.has(parsed.docId)) {
        seenIds.add(parsed.docId);
        results.push(parsed);
      }
    }
  }

  return results;
}
