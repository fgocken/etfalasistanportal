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
