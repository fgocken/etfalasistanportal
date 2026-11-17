import {
  inferPodcastCategory,
  PodcastEpisode,
  PodcastNoteLink,
  PodcastShowMeta
} from '../types/podcast';

function decodeEntities(input: string): string {
  if (!input) return '';
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, dec) => {
      const code = Number(dec);
      return Number.isFinite(code) ? String.fromCharCode(code) : '';
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      const code = parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCharCode(code) : '';
    });
}

function extractTagContent(block: string, tagNames: string[]): string {
  for (const tag of tagNames) {
    const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, 'i');
    const match = block.match(regex);
    if (match && match[1]) {
      return decodeEntities(match[1]).trim();
    }
  }
  return '';
}

function extractTagAttribute(block: string, tagNames: string[], attrName: string): string {
  for (const tag of tagNames) {
    const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`<${escapedTag}\\s+[^>]*?${attrName}\\s*=\\s*["']([^"']+)["'][^>]*\\/?>`, 'i');
    const match = block.match(regex);
    if (match && match[1]) {
      return decodeEntities(match[1]).trim();
    }
  }
  return '';
}

function parseDurationSeconds(raw: string): number {
  const cleaned = raw.trim();
  if (!cleaned) return 0;

  if (/^\d+(\.\d+)?$/.test(cleaned)) {
    return Math.round(Number(cleaned));
  }

  const parts = cleaned.split(':').map((p) => Number(p.trim()));
  if (parts.some((n) => !Number.isFinite(n))) return 0;

  if (parts.length === 3) {
    return Math.round(parts[0] * 3600 + parts[1] * 60 + parts[2]);
  }
  if (parts.length === 2) {
    return Math.round(parts[0] * 60 + parts[1]);
  }
  return 0;
}

function parseRichDescription(rawHtmlOrText: string): { text: string; links: PodcastNoteLink[] } {
  if (!rawHtmlOrText) return { text: '', links: [] };

  const links: PodcastNoteLink[] = [];
  const seenUrls = new Set<string>();

  const anchorRegex = /<a\s+[^>]*href\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let anchorMatch: RegExpExecArray | null;
  while ((anchorMatch = anchorRegex.exec(rawHtmlOrText)) !== null) {
    const url = decodeEntities(anchorMatch[1]).trim();
    const rawLabel = decodeEntities(anchorMatch[2].replace(/<[^>]+>/g, '')).trim();
    if (url && !seenUrls.has(url) && links.length < 8) {
      seenUrls.add(url);
      links.push({
        url,
        label: rawLabel && rawLabel !== url ? rawLabel : url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 60)
      });
    }
  }

  // Convert structural tags to clean line breaks, then strip remaining HTML tags
  const normalizedText = rawHtmlOrText
    .replace(/([^\s>])<\s*a\b/gi, '$1 <a')
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*li\s*>/gi, '\n')
    .replace(/<\/\s*(?:p|div|ul|ol|h[1-6]|blockquote)\s*>/gi, '\n\n')
    .replace(/<\s*li(?:\s[^>]*)?>/gi, '• ')
    .replace(/<[^>]+>/g, '');

  const cleanedText = decodeEntities(normalizedText)
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Also detect plain-text URLs not already captured from anchor tags
  const plainUrls = cleanedText.match(/https?:\/\/[^\s)<>]+/g) || [];
  for (const rawUrl of plainUrls) {
    const url = rawUrl.replace(/[.,;!?]+$/, '');
    if (!seenUrls.has(url) && links.length < 10) {
      seenUrls.add(url);
      links.push({
        url,
        label: url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 60)
      });
    }
  }

  return { text: cleanedText, links };
}

export function parsePodcastRssXml(
  xml: string,
  fallbackSpotifyShowUrl = ''
): { show: PodcastShowMeta; episodes: PodcastEpisode[] } {
  const channelMatch = xml.match(/<channel\b[^>]*>([\s\S]*?)<\/channel>/i);
  const channelContent = channelMatch ? channelMatch[1] : xml;

  // Separate channel header from items
  const firstItemIdx = channelContent.search(/<item\b/i);
  const channelHeader = firstItemIdx !== -1 ? channelContent.slice(0, firstItemIdx) : channelContent;

  const showTitle = extractTagContent(channelHeader, ['title']) || 'Anestezi Podcast';
  const showDescRaw = extractTagContent(channelHeader, ['itunes:summary', 'description']);
  const showDesc = parseRichDescription(showDescRaw).text;
  const showAuthor =
    extractTagContent(channelHeader, ['itunes:author', 'managingEditor', 'dc:creator']) ||
    'Şişli Etfal Anestezi Kliniği';
  const showLink = extractTagContent(channelHeader, ['link']) || fallbackSpotifyShowUrl;
  const showLang = extractTagContent(channelHeader, ['language']);

  let showImage = extractTagAttribute(channelHeader, ['itunes:image'], 'href');
  if (!showImage) {
    const imageBlock = channelHeader.match(/<image\b[^>]*>([\s\S]*?)<\/image>/i);
    if (imageBlock) {
      showImage = extractTagContent(imageBlock[1], ['url']);
    }
  }

  const show: PodcastShowMeta = {
    title: showTitle,
    description: showDesc,
    author: showAuthor,
    imageUrl: showImage,
    link: showLink,
    language: showLang
  };

  const episodes: PodcastEpisode[] = [];
  const itemRegex = /<item\b[^>]*>([\s\S]*?)<\/item>/gi;
  let itemMatch: RegExpExecArray | null;

  while ((itemMatch = itemRegex.exec(channelContent)) !== null) {
    const itemBlock = itemMatch[1];

    const title = extractTagContent(itemBlock, ['title']) || 'İsimsiz Bölüm';
    const rawDesc =
      extractTagContent(itemBlock, ['content:encoded', 'description', 'itunes:summary']) || '';
    const { text: descriptionText, links } = parseRichDescription(rawDesc);

    const audioUrl =
      extractTagAttribute(itemBlock, ['enclosure', 'media:content'], 'url') || '';
    const audioType =
      extractTagAttribute(itemBlock, ['enclosure', 'media:content'], 'type') || 'audio/mpeg';

    if (!audioUrl) {
      // Skip non-audio items if enclosure is missing
      continue;
    }

    const rawGuid = extractTagContent(itemBlock, ['guid']);
    const episodeLink = extractTagContent(itemBlock, ['link']);
    const guid = rawGuid || episodeLink || audioUrl;

    const rawPubDate = extractTagContent(itemBlock, ['pubDate', 'dc:date']);
    let pubDateIso = '';
    if (rawPubDate) {
      const parsedDate = new Date(rawPubDate);
      if (!Number.isNaN(parsedDate.getTime())) {
        pubDateIso = parsedDate.toISOString();
      }
    }

    const durationRaw = extractTagContent(itemBlock, ['itunes:duration']);
    const durationSec = parseDurationSeconds(durationRaw);

    const episodeImage =
      extractTagAttribute(itemBlock, ['itunes:image', 'media:thumbnail'], 'href') ||
      extractTagAttribute(itemBlock, ['media:thumbnail'], 'url') ||
      showImage;

    const epNumRaw = extractTagContent(itemBlock, ['itunes:episode']);
    const episodeNumber = epNumRaw && /^\d+$/.test(epNumRaw) ? Number(epNumRaw) : null;

    const spotifyUrl = /spotify\.com/i.test(episodeLink)
      ? episodeLink
      : fallbackSpotifyShowUrl || episodeLink;

    episodes.push({
      guid,
      title,
      descriptionText,
      links,
      audioUrl,
      audioType,
      durationSec,
      pubDateIso,
      coverImage: episodeImage,
      episodeNumber,
      category: inferPodcastCategory(title, descriptionText),
      episodeLink,
      spotifyUrl
    });
  }

  return { show, episodes };
}
