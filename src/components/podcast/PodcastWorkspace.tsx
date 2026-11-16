import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Headphones,
  Link2,
  NotebookPen,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  RotateCw,
  Search,
  Volume2,
  VolumeX
} from 'lucide-react';
import {
  extractSpotifyEmbedUrl,
  formatDurationClock,
  formatDurationShortTr,
  formatPubDateTr,
  PodcastConfig,
  PodcastEpisode,
  PodcastFeedResponse,
  PodcastLocalState,
  PodcastShowMeta
} from '../../types/podcast';
import { parsePodcastRssXml } from '../../utils/podcastRssParser';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface PodcastWorkspaceProps {
  isDark: boolean;
}

const PROGRESS_STORAGE_KEY = 'etfal_podcast_progress_v1';
const FEED_CACHE_STORAGE_KEY = 'etfal_podcast_feed_cache_v1';
const FEED_CACHE_TTL_MS = 15 * 60 * 1000;
const DEFAULT_RSS_URL = 'https://anchor.fm/s/11a3a92e0/podcast/rss';
const DEFAULT_SPOTIFY_URL = 'https://podcasters.spotify.com/pod/show/furkan-gken7';
const PLAYBACK_RATES = [1, 1.25, 1.5, 1.75, 2] as const;

type StatusFilter = 'all' | 'in_progress' | 'completed';
type DetailTab = 'notes' | 'personal';

function readLocalState(): PodcastLocalState {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          lastPlayedGuid: typeof parsed.lastPlayedGuid === 'string' ? parsed.lastPlayedGuid : null,
          playbackRate:
            typeof parsed.playbackRate === 'number' && parsed.playbackRate >= 0.5 && parsed.playbackRate <= 3
              ? parsed.playbackRate
              : 1,
          episodes: parsed.episodes && typeof parsed.episodes === 'object' ? parsed.episodes : {}
        };
      }
    }
  } catch {
    // ignore storage read error
  }
  return { lastPlayedGuid: null, playbackRate: 1, episodes: {} };
}

function writeLocalState(state: PodcastLocalState): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage write error
  }
}

interface CachedFeedSnapshot {
  config: PodcastConfig;
  show: PodcastShowMeta;
  episodes: PodcastEpisode[];
  cachedAt: string;
  cachedAtMs: number;
}

function readLocalFeedCache(): CachedFeedSnapshot | null {
  try {
    const raw = localStorage.getItem(FEED_CACHE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.show && Array.isArray(parsed.episodes)) {
      return parsed as CachedFeedSnapshot;
    }
  } catch {
    // ignore storage read error
  }
  return null;
}

function writeLocalFeedCache(snapshot: CachedFeedSnapshot): void {
  try {
    localStorage.setItem(FEED_CACHE_STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // ignore storage write error
  }
}

export const PodcastWorkspace: React.FC<PodcastWorkspaceProps> = ({ isDark }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [config, setConfig] = useState<PodcastConfig | null>(null);
  const [show, setShow] = useState<PodcastShowMeta | null>(null);
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [cachedAt, setCachedAt] = useState<string | null>(null);
  const [staleWarning, setStaleWarning] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Library filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Player & local progress state
  const [localState, setLocalState] = useState<PodcastLocalState>(() => readLocalState());
  const [activeGuid, setActiveGuid] = useState<string | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('notes');
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState<boolean>(false);

  // Audio playback state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingSeekRef = useRef<number | null>(null);
  const lastSavedTickRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const applyFeedData = useCallback((data: PodcastFeedResponse) => {
    setConfig(data.config || null);
    setShow(data.show || null);
    setEpisodes(Array.isArray(data.episodes) ? data.episodes : []);
    setCachedAt(data.cachedAt || null);
    setStaleWarning(data.staleWarning || null);

    if (Array.isArray(data.episodes) && data.episodes.length > 0) {
      setActiveGuid((prev) => {
        if (prev && data.episodes.some((ep) => ep.guid === prev)) return prev;
        const storedLast = readLocalState().lastPlayedGuid;
        if (storedLast && data.episodes.some((ep) => ep.guid === storedLast)) return storedLast;
        return data.episodes[0].guid;
      });
    } else {
      setActiveGuid(null);
    }
  }, []);

  const fetchFeed = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setErrorMsg(null);

      // 1. Try Express backend proxy (/api/podcast/feed) first when available
      try {
        const res = await fetch(`/api/podcast/feed${forceRefresh ? '?refresh=1' : ''}`);
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const data: PodcastFeedResponse = await res.json();
          if (data.success) {
            if (data.show && data.config) {
              writeLocalFeedCache({
                config: data.config,
                show: data.show,
                episodes: data.episodes,
                cachedAt: data.cachedAt || new Date().toISOString(),
                cachedAtMs: Date.now()
              });
            }
            applyFeedData(data);
            setLoading(false);
            setRefreshing(false);
            return;
          }
        }
      } catch {
        // Fall through cleanly to browser RSS fetch on static/Vercel deployments
      }

      // 2. Fallback for static builds (e.g. Vercel / Shared Preview): check fresh localStorage cache first
      const cached = readLocalFeedCache();
      if (!forceRefresh && cached && Date.now() - cached.cachedAtMs < FEED_CACHE_TTL_MS) {
        applyFeedData({
          success: true,
          configured: true,
          config: cached.config,
          show: cached.show,
          episodes: cached.episodes,
          cachedAt: cached.cachedAt,
          fromCache: true
        });
        setLoading(false);
        setRefreshing(false);
        return;
      }

      // 3. Direct browser RSS fetch (Anchor/Spotify RSS supports Access-Control-Allow-Origin: *)
      try {
        const rssRes = await fetch(DEFAULT_RSS_URL, {
          cache: forceRefresh ? 'no-cache' : 'default'
        });
        if (!rssRes.ok) {
          throw new Error(`RSS yanıt kodu: ${rssRes.status}`);
        }
        const xmlText = await rssRes.text();
        if (!/<(rss|channel|feed)\b/i.test(xmlText)) {
          throw new Error('Geçerli RSS/XML içeriği alınamadı.');
        }

        const { show: parsedShow, episodes: parsedEpisodes } = parsePodcastRssXml(
          xmlText,
          DEFAULT_SPOTIFY_URL
        );
        const nowIso = new Date().toISOString();
        const defaultConfig: PodcastConfig = {
          rssUrl: DEFAULT_RSS_URL,
          spotifyShowUrl: parsedShow.link || DEFAULT_SPOTIFY_URL,
          updatedAt: nowIso
        };

        writeLocalFeedCache({
          config: defaultConfig,
          show: parsedShow,
          episodes: parsedEpisodes,
          cachedAt: nowIso,
          cachedAtMs: Date.now()
        });

        applyFeedData({
          success: true,
          configured: true,
          config: defaultConfig,
          show: parsedShow,
          episodes: parsedEpisodes,
          cachedAt: nowIso,
          fromCache: false
        });
      } catch (err: any) {
        if (cached) {
          applyFeedData({
            success: true,
            configured: true,
            config: cached.config,
            show: cached.show,
            episodes: cached.episodes,
            cachedAt: cached.cachedAt,
            fromCache: true,
            staleWarning: 'Güncel yayın alınamadı; son önbellekteki bölümler gösteriliyor.'
          });
        } else {
          setErrorMsg(err?.message || 'Podcast servisine bağlanılamadı.');
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [applyFeedData]
  );

  useEffect(() => {
    fetchFeed(false);
  }, [fetchFeed]);

  const activeEpisode = useMemo(
    () => episodes.find((ep) => ep.guid === activeGuid) || null,
    [episodes, activeGuid]
  );

  const activeProgress = activeEpisode ? localState.episodes[activeEpisode.guid] : undefined;

  const updateEpisodeProgress = useCallback(
    (
      guid: string,
      patch: Partial<{ positionSec: number; durationSec: number; completed: boolean; personalNote: string }>,
      setAsLastPlayed = true
    ) => {
      setLocalState((prev) => {
        const existing = prev.episodes[guid] || {
          positionSec: 0,
          durationSec: 0,
          completed: false,
          updatedAt: new Date().toISOString()
        };
        const nextState: PodcastLocalState = {
          ...prev,
          lastPlayedGuid: setAsLastPlayed ? guid : prev.lastPlayedGuid,
          episodes: {
            ...prev.episodes,
            [guid]: {
              ...existing,
              ...patch,
              updatedAt: new Date().toISOString()
            }
          }
        };
        writeLocalState(nextState);
        return nextState;
      });
    },
    []
  );

  const handlePlaybackRateChange = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setLocalState((prev) => {
      const next = { ...prev, playbackRate: rate };
      writeLocalState(next);
      return next;
    });
  };

  const selectEpisode = (ep: PodcastEpisode, autoPlay = false) => {
    if (activeEpisode && audioRef.current) {
      updateEpisodeProgress(activeEpisode.guid, {
        positionSec: audioRef.current.currentTime,
        durationSec: audioRef.current.duration || activeEpisode.durationSec
      });
    }

    const savedPos = localState.episodes[ep.guid]?.positionSec || 0;
    const savedDone = localState.episodes[ep.guid]?.completed || false;
    const resumeFrom = !savedDone && savedPos > 2 ? savedPos : 0;

    pendingSeekRef.current = resumeFrom;
    setActiveGuid(ep.guid);
    setCurrentTime(resumeFrom);
    setAudioDuration(ep.durationSec || 0);
    setAudioError(null);
    setShowSpotifyEmbed(false);

    setLocalState((prev) => {
      const next = { ...prev, lastPlayedGuid: ep.guid };
      writeLocalState(next);
      return next;
    });

    if (autoPlay) {
      setTimeout(() => {
        audioRef.current?.play().catch(() => {
          setIsPlaying(false);
        });
      }, 60);
    } else {
      setIsPlaying(false);
    }
  };

  // Sync audio element playback rate & initial resume position when activeEpisode changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !activeEpisode) return;
    audio.playbackRate = localState.playbackRate;
    const saved = localState.episodes[activeEpisode.guid];
    const startSec = saved && !saved.completed && saved.positionSec > 2 ? saved.positionSec : 0;
    pendingSeekRef.current = startSec;
    setCurrentTime(startSec);
    setAudioDuration(activeEpisode.durationSec || 0);
    setAudioError(null);
  }, [activeEpisode?.guid]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !activeEpisode) return;
    setAudioError(null);

    if (audio.paused) {
      try {
        audio.playbackRate = localState.playbackRate;
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        setAudioError(
          'Ses tarayıcıda başlatılamadı. Tekrar deneyin veya "Spotify’da Aç" bağlantısını kullanın.'
        );
      }
    } else {
      audio.pause();
      setIsPlaying(false);
      updateEpisodeProgress(activeEpisode.guid, {
        positionSec: audio.currentTime,
        durationSec: audio.duration || activeEpisode.durationSec
      });
    }
  };

  const skipBySeconds = (delta: number) => {
    const audio = audioRef.current;
    if (!audio || !activeEpisode) return;
    const total = audio.duration || activeEpisode.durationSec || 0;
    const target = Math.max(0, Math.min(total > 0 ? total : audio.currentTime + delta, audio.currentTime + delta));
    audio.currentTime = target;
    setCurrentTime(target);
    updateEpisodeProgress(activeEpisode.guid, {
      positionSec: target,
      durationSec: total
    });
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextSec = Number(e.target.value);
    setCurrentTime(nextSec);
    if (audioRef.current) {
      audioRef.current.currentTime = nextSec;
    }
    if (activeEpisode) {
      updateEpisodeProgress(activeEpisode.guid, {
        positionSec: nextSec,
        durationSec: audioDuration || activeEpisode.durationSec
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVol = Number(e.target.value);
    setVolume(nextVol);
    setIsMuted(nextVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = nextVol;
      audioRef.current.muted = nextVol === 0;
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
  };

  const toggleCompleted = (ep: PodcastEpisode) => {
    const currentlyDone = Boolean(localState.episodes[ep.guid]?.completed);
    updateEpisodeProgress(
      ep.guid,
      {
        completed: !currentlyDone,
        positionSec: currentlyDone ? 0 : localState.episodes[ep.guid]?.positionSec || 0,
        durationSec: ep.durationSec || localState.episodes[ep.guid]?.durationSec || 0
      },
      false
    );
  };

  const insertTimestampToNote = () => {
    if (!activeEpisode) return;
    const stamp = `[${formatDurationClock(currentTime)}] `;
    const existing = activeProgress?.personalNote || '';
    const prefix = existing && !existing.endsWith('\n') ? `${existing}\n` : existing;
    updateEpisodeProgress(activeEpisode.guid, { personalNote: `${prefix}${stamp}` }, false);
    setDetailTab('personal');
  };

  // Dynamic categories extracted from feed episodes
  const availableCategories = useMemo(() => {
    const cats = Array.from(new Set(episodes.map((e) => e.category)));
    return ['Tümü', ...cats];
  }, [episodes]);

  const filteredEpisodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return episodes.filter((ep) => {
      if (selectedCategory !== 'Tümü' && ep.category !== selectedCategory) return false;
      const prog = localState.episodes[ep.guid];
      if (statusFilter === 'completed' && !prog?.completed) return false;
      if (statusFilter === 'in_progress' && (!prog || prog.completed || prog.positionSec < 3)) return false;
      if (!q) return true;
      return (
        ep.title.toLowerCase().includes(q) ||
        ep.descriptionText.toLowerCase().includes(q) ||
        ep.category.toLowerCase().includes(q)
      );
    });
  }, [episodes, searchQuery, selectedCategory, statusFilter, localState.episodes]);

  const effectiveDuration = audioDuration || activeEpisode?.durationSec || 0;
  const spotifyExternalUrl =
    activeEpisode?.spotifyUrl || config?.spotifyShowUrl || activeEpisode?.episodeLink || '';
  const spotifyEmbedSrc = extractSpotifyEmbedUrl(
    activeEpisode?.spotifyUrl || config?.spotifyShowUrl || ''
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`p-2.5 rounded-xl border shrink-0 ${
              isDark
                ? 'bg-violet-500/15 border-violet-500/30 text-violet-400'
                : 'bg-violet-50 border-violet-200 text-violet-700'
            }`}
          >
            <Headphones className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h2 className={`text-xl font-bold tracking-tight truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {show?.title || 'Etfal Anestezi Podcast'}
            </h2>
            <div className={`flex flex-wrap items-center gap-1.5 text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>{show?.author || 'Şişli Etfal Anestezi & Reanimasyon'}</span>
              {episodes.length > 0 && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{episodes.length} bölüm</span>
                </>
              )}
              {cachedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    Son eşitleme: {new Date(cachedAt).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => fetchFeed(true)}
            disabled={refreshing}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-violet-500' : ''}`} />
            <span>{refreshing ? 'Yenileniyor' : 'Yenile'}</span>
          </button>

          <ShareLinkButton
            type="arac"
            id="podcast"
            isDark={isDark}
            variant="compact"
            title="Podcast Bağlantısını Paylaş"
          />
        </div>
      </div>

      {staleWarning && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs flex items-center gap-2 ${
            isDark
              ? 'bg-amber-950/30 border-amber-800/70 text-amber-200'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{staleWarning}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div
          className={`rounded-xl border p-8 text-center text-xs ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          Podcast bölümleri yükleniyor...
        </div>
      )}

      {/* Error State (without episodes) */}
      {!loading && errorMsg && episodes.length === 0 && (
        <div
          className={`rounded-xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDark ? 'bg-rose-950/25 border-rose-800/70 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-start gap-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Podcast yayını okunamadı</div>
              <div className="mt-0.5 opacity-90">{errorMsg}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => fetchFeed(true)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white whitespace-nowrap shrink-0 cursor-pointer"
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {/* Empty Episodes State */}
      {!loading && !errorMsg && episodes.length === 0 && (
        <div
          className={`rounded-xl border border-dashed p-10 text-center space-y-2 ${
            isDark ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
          }`}
        >
          <Headphones className="w-8 h-8 mx-auto text-violet-500 opacity-80" />
          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Henüz yayınlanmış bölüm bulunamadı
          </h3>
          <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Yeni bölüm yayınlandıktan kısa süre sonra &ldquo;Yenile&rdquo; butonuna tıklayarak listeyi güncelleyebilirsiniz.
          </p>
        </div>
      )}

      {/* Main Two-Zone Hybrid Podcast Workspace */}
      {!loading && episodes.length > 0 && activeEpisode && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* ZONE 1: Active Player Stage + Show Notes / Personal Notes */}
          <section className="lg:col-span-7 space-y-4 min-w-0">
            <div
              className={`rounded-xl border p-5 space-y-5 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              {/* Hidden native audio engine */}
              <audio
                ref={audioRef}
                src={activeEpisode.audioUrl}
                preload="metadata"
                onLoadedMetadata={(e) => {
                  const el = e.currentTarget;
                  el.playbackRate = localState.playbackRate;
                  el.volume = volume;
                  el.muted = isMuted;
                  if (Number.isFinite(el.duration) && el.duration > 0) {
                    setAudioDuration(el.duration);
                  }
                  if (pendingSeekRef.current !== null && pendingSeekRef.current > 0) {
                    const seekTo =
                      el.duration > 0
                        ? Math.min(pendingSeekRef.current, Math.max(0, el.duration - 2))
                        : pendingSeekRef.current;
                    el.currentTime = seekTo;
                    setCurrentTime(seekTo);
                    pendingSeekRef.current = null;
                  }
                }}
                onTimeUpdate={(e) => {
                  const el = e.currentTarget;
                  const t = el.currentTime;
                  const d = el.duration || activeEpisode.durationSec || 0;
                  setCurrentTime(t);
                  const now = Date.now();
                  if (now - lastSavedTickRef.current >= 2500) {
                    lastSavedTickRef.current = now;
                    const autoCompleted = d > 15 && t / d >= 0.95;
                    updateEpisodeProgress(activeEpisode.guid, {
                      positionSec: t,
                      durationSec: d,
                      ...(autoCompleted ? { completed: true } : {})
                    });
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => {
                  setIsPlaying(false);
                  updateEpisodeProgress(activeEpisode.guid, {
                    positionSec: audioDuration || activeEpisode.durationSec,
                    durationSec: audioDuration || activeEpisode.durationSec,
                    completed: true
                  });
                }}
                onError={() => {
                  setIsPlaying(false);
                  setAudioError(
                    'Ses dosyası doğrudan yüklenemedi. Aşağıdan "Spotify’da Aç" veya "Spotify Embed" seçeneğini kullanabilirsiniz.'
                  );
                }}
              />

              {/* Episode Header with Cover Art & Unboxed Metadata */}
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-600/20 via-teal-500/10 to-slate-900/20 flex items-center justify-center">
                  {activeEpisode.coverImage && !brokenImages[activeEpisode.guid] ? (
                    <img
                      src={activeEpisode.coverImage}
                      alt={activeEpisode.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [activeEpisode.guid]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center">
                      <Headphones className="w-8 h-8 text-violet-500" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {activeEpisode.episodeNumber !== null && (
                      <>
                        <span className="font-mono tabular-nums font-semibold text-violet-600 dark:text-violet-400">
                          Bölüm #{activeEpisode.episodeNumber}
                        </span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    {activeEpisode.pubDateIso && (
                      <>
                        <span>{formatPubDateTr(activeEpisode.pubDateIso)}</span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    <span className="font-mono tabular-nums">{formatDurationShortTr(effectiveDuration)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeEpisode.category}</span>
                    {activeProgress?.completed && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Tamamlandı</span>
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold leading-snug text-balance ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {activeEpisode.title}
                  </h3>

                  {activeProgress && !activeProgress.completed && activeProgress.positionSec > 3 && (
                    <div className={`text-[11px] font-mono tabular-nums flex items-center gap-1.5 ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>Kaldığı yer: {formatDurationClock(activeProgress.positionSec)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Audio Timeline Scrubber */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  aria-label="Ses oynatma konumu"
                  min={0}
                  max={effectiveDuration > 0 ? effectiveDuration : 100}
                  step={1}
                  value={Math.min(currentTime, effectiveDuration > 0 ? effectiveDuration : 100)}
                  onChange={handleScrub}
                  className="w-full h-2 accent-violet-600 cursor-pointer"
                />
                <div className={`flex items-center justify-between text-xs font-mono tabular-nums ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  <span>{formatDurationClock(currentTime)}</span>
                  <span>{formatDurationClock(effectiveDuration)}</span>
                </div>
              </div>

              {/* Transport Controls + Speed + Volume */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => skipBySeconds(-15)}
                    title="15 saniye geri sar"
                    className={`inline-flex items-center gap-1 px-3 py-2 min-h-[40px] text-xs font-mono font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>15s</span>
                  </button>

                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-xs font-bold rounded-lg bg-violet-600 hover:bg-violet-700 text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Duraklat' : activeProgress && activeProgress.positionSec > 3 && !activeProgress.completed ? 'Devam Et' : 'Oynat'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => skipBySeconds(30)}
                    title="30 saniye ileri sar"
                    className={`inline-flex items-center gap-1 px-3 py-2 min-h-[40px] text-xs font-mono font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>30s</span>
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Speed & Volume */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div
                    role="group"
                    aria-label="Oynatma hızı"
                    className={`inline-flex items-center p-0.5 rounded-lg border ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                    }`}
                  >
                    {PLAYBACK_RATES.map((rate) => {
                      const activeRate = localState.playbackRate === rate;
                      return (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => handlePlaybackRateChange(rate)}
                          className={`px-2 py-1 text-[11px] font-mono tabular-nums font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                            activeRate
                              ? isDark
                                ? 'bg-violet-600 text-white'
                                : 'bg-white text-slate-900 shadow-2xs'
                              : isDark
                                ? 'text-slate-400 hover:text-slate-200'
                                : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {String(rate).replace('.', ',')}x
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Sesi aç' : 'Sesi kapat'}
                      className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                        isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <input
                      type="range"
                      aria-label="Ses seviyesi"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1.5 accent-violet-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {audioError && (
                <div
                  className={`rounded-lg border px-3 py-2 text-xs flex items-center gap-2 ${
                    isDark ? 'bg-amber-950/30 border-amber-800 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{audioError}</span>
                </div>
              )}

              {/* Hybrid Actions Row */}
              <div
                className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {spotifyExternalUrl && (
                    <a
                      href={spotifyExternalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                        isDark
                          ? 'bg-emerald-950/40 border-emerald-800/70 text-emerald-300 hover:bg-emerald-900/50'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Spotify&apos;da Aç</span>
                    </a>
                  )}

                  {spotifyEmbedSrc && (
                    <button
                      type="button"
                      onClick={() => setShowSpotifyEmbed((v) => !v)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        showSpotifyEmbed
                          ? isDark
                            ? 'bg-slate-800 border-slate-600 text-white'
                            : 'bg-slate-900 border-slate-900 text-white'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{showSpotifyEmbed ? 'Spotify Embed Gizle' : 'Spotify Embed Oynatıcı'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => toggleCompleted(activeEpisode)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    activeProgress?.completed
                      ? isDark
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>{activeProgress?.completed ? 'Tamamlandı İşaretli' : 'Tamamlandı İşaretle'}</span>
                </button>
              </div>

              {/* Optional Collapsible Spotify Embed */}
              {showSpotifyEmbed && spotifyEmbedSrc && (
                <div className="pt-1">
                  <iframe
                    title="Spotify Podcast Embed"
                    src={spotifyEmbedSrc}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl border-0"
                  />
                </div>
              )}
            </div>

            {/* Episode Show Notes & Personal Clinical Notes Card */}
            <div
              className={`rounded-xl border p-5 space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div
                  className={`inline-flex items-center p-1 rounded-lg border ${
                    isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setDetailTab('notes')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      detailTab === 'notes'
                        ? isDark
                          ? 'bg-slate-800 text-white'
                          : 'bg-white text-slate-900 shadow-2xs'
                        : isDark
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Bölüm Notları &amp; Kaynaklar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDetailTab('personal')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      detailTab === 'personal'
                        ? isDark
                          ? 'bg-slate-800 text-white'
                          : 'bg-white text-slate-900 shadow-2xs'
                        : isDark
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <NotebookPen className="w-3.5 h-3.5" />
                    <span>Kişisel Klinik Notum</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={insertTimestampToNote}
                  className={`text-xs font-mono tabular-nums px-2.5 py-1 rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-violet-300 hover:bg-slate-800'
                      : 'bg-violet-50 border-violet-200 text-violet-800 hover:bg-violet-100'
                  }`}
                >
                  + Zaman Damgası ({formatDurationClock(currentTime)})
                </button>
              </div>

              {detailTab === 'notes' ? (
                <div className="space-y-4">
                  {activeEpisode.descriptionText ? (
                    <div className={`text-xs sm:text-[13px] leading-relaxed space-y-2.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      {activeEpisode.descriptionText.split(/\n{2,}/).map((para, idx) => (
                        <p key={idx} className="whitespace-pre-line">
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      Bu bölüm için RSS açıklamasında metin yer almıyor.
                    </p>
                  )}

                  {activeEpisode.links.length > 0 && (
                    <div className={`pt-3 border-t space-y-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                      <div className={`text-xs font-bold flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        <Link2 className="w-3.5 h-3.5 text-teal-500" />
                        <span>Bölüm İçi Bağlantılar</span>
                      </div>
                      <ul className="space-y-1.5">
                        {activeEpisode.links.map((lnk) => (
                          <li key={lnk.url}>
                            <a
                              href={lnk.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 text-xs underline underline-offset-2 ${
                                isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-700 hover:text-teal-900'
                              }`}
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span className="break-all">{lnk.label}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <textarea
                    rows={5}
                    placeholder="Dinlerken öne çıkan dozlar, kılavuz eşikleri veya klinik özet notlarınızı buraya yazabilirsiniz..."
                    value={activeProgress?.personalNote || ''}
                    onChange={(e) =>
                      updateEpisodeProgress(activeEpisode.guid, { personalNote: e.target.value }, false)
                    }
                    className={`w-full px-3 py-2.5 text-xs leading-relaxed rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                      isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                        : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
                    }`}
                  />
                  <div className={`text-[11px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Notlarınız bölüm bazında bu tarayıcıda otomatik saklanır.
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ZONE 2: Episode Library & Filtering Deck */}
          <aside
            className={`lg:col-span-5 rounded-xl border p-4 space-y-3.5 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Bölüm Kitaplığı
              </h3>
              <span className={`text-xs font-mono tabular-nums ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {filteredEpisodes.length} / {episodes.length}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Bölüm veya konuda ara..."
                className={`w-full pl-8 pr-3 py-2 text-xs rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                }`}
              />
            </div>

            {/* Status Segmented Tabs */}
            <div
              className={`grid grid-cols-3 gap-1 p-1 rounded-lg border ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
              }`}
            >
              {(
                [
                  { id: 'all', label: 'Tümü' },
                  { id: 'in_progress', label: 'Devam Eden' },
                  { id: 'completed', label: 'Tamamlanan' }
                ] as { id: StatusFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-2 py-1.5 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap truncate ${
                    statusFilter === tab.id
                      ? isDark
                        ? 'bg-slate-800 text-white'
                        : 'bg-white text-slate-900 shadow-2xs'
                      : isDark
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Category Interactive Filter Strip */}
            {availableCategories.length > 2 && (
              <div className="flex flex-wrap gap-1.5">
                {availableCategories.map((cat) => {
                  const active = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? isDark
                            ? 'bg-violet-600/25 border-violet-500 text-violet-200 font-semibold'
                            : 'bg-violet-50 border-violet-400 text-violet-900 font-semibold'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Episode List */}
            <div className="space-y-2 max-h-[540px] overflow-y-auto pr-0.5">
              {filteredEpisodes.length === 0 ? (
                <div className={`py-8 text-center text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Seçili filtrelere uygun bölüm bulunamadı.
                </div>
              ) : (
                filteredEpisodes.map((ep) => {
                  const isActive = ep.guid === activeEpisode.guid;
                  const prog = localState.episodes[ep.guid];
                  const totalSec = prog?.durationSec || ep.durationSec || 0;
                  const pct =
                    prog && totalSec > 0 ? Math.min(100, Math.round((prog.positionSec / totalSec) * 100)) : 0;

                  return (
                    <button
                      key={ep.guid}
                      type="button"
                      onClick={() => selectEpisode(ep, false)}
                      className={`w-full text-left rounded-xl border p-3.5 transition-colors cursor-pointer space-y-2 ${
                        isActive
                          ? isDark
                            ? 'bg-violet-950/30 border-violet-500/70'
                            : 'bg-violet-50/70 border-violet-400'
                          : isDark
                            ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {ep.episodeNumber !== null && (
                          <>
                            <span className="font-mono tabular-nums font-semibold">#{ep.episodeNumber}</span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        {ep.pubDateIso && (
                          <>
                            <span>{formatPubDateTr(ep.pubDateIso)}</span>
                            <span aria-hidden="true">·</span>
                          </>
                        )}
                        <span className="font-mono tabular-nums">{formatDurationShortTr(ep.durationSec)}</span>
                        <span aria-hidden="true">·</span>
                        <span>{ep.category}</span>
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div className={`text-xs sm:text-[13px] font-bold leading-snug line-clamp-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                          {ep.title}
                        </div>
                        {prog?.completed && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-label="Tamamlandı" />
                        )}
                      </div>

                      {prog && !prog.completed && pct > 0 && (
                        <div className="space-y-1">
                          <div className={`h-1 w-full rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
                            <div
                              className="h-full bg-violet-500 rounded-full"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className={`text-[10.5px] font-mono tabular-nums ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            %{pct} dinlendi ({formatDurationClock(prog.positionSec)})
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};
