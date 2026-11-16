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
    pattern: /havayolu|airway|entübasyon|entubasyon|laringoskop|krikotiroidotomi|cico|sga|larengeal|maske/i
  },
  {
    category: 'Yoğun Bakım',
    pattern: /yoğun bakım|yogun bakim|ybü|icu|ventilasyon|ventilatör|ards|sepsis|kan gazı|asit[- ]baz|stewart/i
  },
  {
    category: 'Rejyonal & Blok',
    pattern: /blok|rejyonal|spinal|epidural|pleksus|last|intralipid|sinir|fasya|tap|esp|peng/i
  },
  {
    category: 'Farmakoloji',
    pattern: /propofol|ketamin|remifentanil|opioid|kas gevşetici|rokuronyum|sugammadeks|lokal anestezik|noradrenalin|adrenalin|farmakoloji|ilaç/i
  },
  {
    category: 'Hemodinami & Sıvı',
    pattern: /sıvı|sivi|gdft|kristaloid|masif|transfüzyon|şok|sok|hemodinami|arteriyel|santral venöz|svk|kalp/i
  },
  {
    category: 'Klinik Vaka',
    pattern: /vaka|olgu|kriz|malign hipertermi|anafilaksi|emboli|pnömotoraks|aciller|nöbet|nobet/i
  }
];

export function inferPodcastCategory(title: string, description: string): PodcastCategory {
  const combined = `${title} ${description}`;
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(combined)) {
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
