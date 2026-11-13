import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Filter,
  Library,
  RotateCcw,
  Search,
  X
} from 'lucide-react';
import {
  PortalReference,
  REFERENCE_CATEGORIES,
  ReferenceCategory,
  ReferenceKind,
  getUnifiedPortalReferences
} from '../../data/referencesData';

interface ReferencesLibraryViewProps {
  isDark: boolean;
}

const REFERENCE_KINDS: ReferenceKind[] = [
  'Uluslararası Kılavuz',
  'Textbook',
  'Dönüm Noktası Çalışma / RKÇ',
  'Konsensus / Uzman Görüşü',
  'Klinik İnceleme / Derleme'
];

function normalizeSearch(value: string): string {
  return value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export const ReferencesLibraryView: React.FC<ReferencesLibraryViewProps> = ({ isDark }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ReferenceCategory | 'all'>('all');
  const [selectedKind, setSelectedKind] = useState<ReferenceKind | 'all'>('all');
  const [onlyDirectLinks, setOnlyDirectLinks] = useState(false);
  const [copiedDoiId, setCopiedDoiId] = useState<string | null>(null);

  const allReferences = useMemo(() => getUnifiedPortalReferences(), []);

  const stats = useMemo(() => {
    const withPmid = allReferences.filter((r) => Boolean(r.pmid)).length;
    const withDoi = allReferences.filter((r) => Boolean(r.doi)).length;
    const withAnyLink = allReferences.filter(
      (r) => Boolean(r.pmid || r.doi || r.externalUrl)
    ).length;

    return {
      total: allReferences.length,
      categories: REFERENCE_CATEGORIES.length,
      withPmid,
      withDoi,
      withAnyLink
    };
  }, [allReferences]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allReferences.length };
    for (const cat of REFERENCE_CATEGORIES) {
      counts[cat.id] = 0;
    }
    for (const ref of allReferences) {
      counts[ref.category] = (counts[ref.category] || 0) + 1;
    }
    return counts;
  }, [allReferences]);

  const filteredReferences = useMemo(() => {
    const q = normalizeSearch(searchQuery);
    const terms = q ? q.split(/\s+/).filter(Boolean) : [];

    return allReferences.filter((ref) => {
      if (selectedCategory !== 'all' && ref.category !== selectedCategory) {
        return false;
      }
      if (selectedKind !== 'all' && ref.kind !== selectedKind) {
        return false;
      }
      if (onlyDirectLinks && !ref.pmid && !ref.doi && !ref.externalUrl) {
        return false;
      }
      if (terms.length === 0) return true;

      const haystack = normalizeSearch(
        [
          ref.title,
          ref.authors,
          ref.publication,
          ref.year,
          ref.pmid || '',
          ref.doi || '',
          ref.clinicalNote,
          ref.kind,
          ...ref.usedInModules
        ].join(' ')
      );

      return terms.every((term) => haystack.includes(term));
    });
  }, [allReferences, selectedCategory, selectedKind, onlyDirectLinks, searchQuery]);

  const groupedSections = useMemo(() => {
    const categoriesToRender =
      selectedCategory === 'all'
        ? REFERENCE_CATEGORIES
        : REFERENCE_CATEGORIES.filter((c) => c.id === selectedCategory);

    return categoriesToRender
      .map((category) => ({
        category,
        items: filteredReferences.filter((ref) => ref.category === category.id)
      }))
      .filter((section) => section.items.length > 0);
  }, [filteredReferences, selectedCategory]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedKind !== 'all' ||
    onlyDirectLinks;

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedKind('all');
    setOnlyDirectLinks(false);
  };

  const handleCopyDoi = async (ref: PortalReference) => {
    if (!ref.doi) return;
    try {
      await navigator.clipboard.writeText(ref.doi);
      setCopiedDoiId(ref.id);
      window.setTimeout(() => {
        setCopiedDoiId((prev) => (prev === ref.id ? null : prev));
      }, 1800);
    } catch {
      // Clipboard fallback if blocked
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Summary Panel */}
      <section
        className={`rounded-xl border p-5 sm:p-6 transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-lg border ${
                  isDark
                    ? 'bg-teal-500/10 border-teal-500/25 text-teal-400'
                    : 'bg-teal-50 border-teal-200 text-teal-700'
                }`}
              >
                <Library className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  KAYNAKLAR VE İLERİ OKUMA
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Portal modüllerindeki tüm kılavuz, textbook ve dönüm noktası çalışmalarının mükerrersiz merkezi bibliyografyası.
                </p>
              </div>
            </div>
            <p
              className={`text-xs leading-relaxed pt-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              Yeni protokol ve klinik modüller eklendikçe referanslar bu merkezi dizinde tekilleştirilerek otomatik olarak listelenir. Doğrulanmış PubMed PMID, DOI ve resmi kılavuz bağlantıları doğrudan erişime açıktır.
            </p>
          </div>

          {/* Numeric Summary Readout */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
            <div
              className={`rounded-lg border px-3.5 py-2.5 ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`text-[11px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Tekil Kaynak
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono tabular-nums mt-0.5 text-teal-500">
                {stats.total}
              </div>
            </div>
            <div
              className={`rounded-lg border px-3.5 py-2.5 ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`text-[11px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Ana Başlık
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono tabular-nums mt-0.5">
                {stats.categories}
              </div>
            </div>
            <div
              className={`rounded-lg border px-3.5 py-2.5 ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div
                className={`text-[11px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                Doğrudan Erişim
              </div>
              <div className="text-lg sm:text-xl font-bold font-mono tabular-nums mt-0.5 text-sky-500">
                {stats.withAnyLink}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Kind Filters */}
        <div
          className={`mt-5 pt-5 border-t space-y-4 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Başlık, yazar, dergi, modül adı, PMID veya DOI ile ara (örn. RELIEF, Miller, 36629465, ACLS)..."
                className={`w-full pl-10 pr-9 py-2.5 text-sm rounded-lg border outline-none transition-colors ${
                  isDark
                    ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-teal-500'
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-teal-600'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  title="Aramayı temizle"
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded cursor-pointer ${
                    isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setOnlyDirectLinks((prev) => !prev)}
              className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-2 ${
                onlyDirectLinks
                  ? isDark
                    ? 'bg-teal-500/15 border-teal-500/50 text-teal-300'
                    : 'bg-teal-50 border-teal-500 text-teal-800'
                  : isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Yalnızca PubMed / DOI / Web Bağlantılılar</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className={`px-3.5 py-2.5 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>

          {/* Reference Kind Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`text-[11px] font-semibold mr-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Kaynak Türü:
            </span>
            <button
              type="button"
              onClick={() => setSelectedKind('all')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedKind === 'all'
                  ? isDark
                    ? 'bg-teal-600 text-white'
                    : 'bg-teal-700 text-white'
                  : isDark
                  ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tümü
            </button>
            {REFERENCE_KINDS.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => setSelectedKind(kind)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedKind === kind
                    ? isDark
                      ? 'bg-teal-600 text-white'
                      : 'bg-teal-700 text-white'
                    : isDark
                    ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {kind}
              </button>
            ))}
          </div>

          {/* Category Navigation Bar */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`text-[11px] font-semibold mr-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Klinik Alan:
            </span>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? isDark
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : 'bg-slate-900 text-white font-semibold'
                  : isDark
                  ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>Tüm Kategoriler</span>
              <span className="font-mono tabular-nums text-[11px] opacity-75">
                ({categoryCounts.all})
              </span>
            </button>
            {REFERENCE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? isDark
                        ? 'bg-slate-100 text-slate-900 font-semibold'
                        : 'bg-slate-900 text-white font-semibold'
                      : isDark
                      ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span>{cat.shortTitle}</span>
                  <span className="font-mono tabular-nums text-[11px] opacity-75">
                    ({categoryCounts[cat.id] || 0})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Result Count Bar */}
      <div className="flex items-center justify-between text-xs px-1">
        <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          Gösterilen kaynak:{' '}
          <strong className="font-mono tabular-nums text-teal-500">
            {filteredReferences.length}
          </strong>{' '}
          / <span className="font-mono tabular-nums">{stats.total}</span>
          {' · '}
          <span className="font-mono tabular-nums">{stats.withPmid}</span> PubMed,{' '}
          <span className="font-mono tabular-nums">{stats.withDoi}</span> DOI kaydı
        </span>
      </div>

      {/* Empty State */}
      {groupedSections.length === 0 && (
        <div
          className={`rounded-xl border p-8 text-center space-y-3 ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-slate-300'
              : 'bg-white border-slate-200 text-slate-700'
          }`}
        >
          <BookOpen className="w-8 h-8 mx-auto opacity-50" />
          <div className="text-sm font-semibold">
            Arama veya filtre kriterlerine uyan kaynak bulunamadı
          </div>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Farklı bir anahtar kelime deneyin veya aktif filtreleri sıfırlayın.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
              isDark
                ? 'bg-teal-600 hover:bg-teal-500 text-white'
                : 'bg-teal-700 hover:bg-teal-800 text-white'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Filtreleri Sıfırla</span>
          </button>
        </div>
      )}

      {/* Categorized Reference Sections */}
      <div className="space-y-6">
        {groupedSections.map(({ category, items }) => (
          <section
            key={category.id}
            className={`rounded-xl border overflow-hidden transition-colors ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Category Header */}
            <div
              className={`px-5 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
              }`}
            >
              <div>
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {category.title}
                </h3>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {category.description}
                </p>
              </div>
              <span
                className={`text-xs font-mono tabular-nums font-semibold shrink-0 ${
                  isDark ? 'text-teal-400' : 'text-teal-700'
                }`}
              >
                {items.length} kaynak
              </span>
            </div>

            {/* Reference Rows */}
            <div
              className={`divide-y ${
                isDark ? 'divide-slate-800/80' : 'divide-slate-200/80'
              }`}
            >
              {items.map((ref) => {
                const pubmedUrl = ref.pmid
                  ? `https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`
                  : null;
                const doiUrl = ref.doi ? `https://doi.org/${ref.doi}` : null;
                const hasAnyLink = Boolean(pubmedUrl || doiUrl || ref.externalUrl);

                return (
                  <article
                    key={ref.id}
                    className={`p-4 sm:p-5 transition-colors ${
                      isDark ? 'hover:bg-slate-800/35' : 'hover:bg-slate-50/70'
                    }`}
                  >
                    {/* Top Quiet Typographic Metadata Line */}
                    <div
                      className={`text-[11px] font-mono tabular-nums flex flex-wrap items-center gap-x-2 gap-y-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`font-sans font-semibold ${
                          isDark ? 'text-teal-400' : 'text-teal-700'
                        }`}
                      >
                        {ref.kind}
                      </span>
                      <span>·</span>
                      <span>{ref.year}</span>
                      {ref.pmid && (
                        <>
                          <span>·</span>
                          <span>PMID {ref.pmid}</span>
                        </>
                      )}
                      {ref.doi && (
                        <>
                          <span>·</span>
                          <span className="break-all">DOI {ref.doi}</span>
                        </>
                      )}
                    </div>

                    {/* Title */}
                    <h4
                      className={`text-sm sm:text-[15px] font-semibold mt-1.5 leading-snug ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {ref.title}
                    </h4>

                    {/* Authors & Journal / Publisher */}
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      <span className="font-medium">{ref.authors}</span>{' '}
                      <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                        {ref.publication}
                      </span>
                    </p>

                    {/* Clinical Note */}
                    <p
                      className={`text-xs mt-2 leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {ref.clinicalNote}
                    </p>

                    {/* Used in Modules + Interactive Links Footer */}
                    <div className="mt-3 pt-2.5 border-t border-dashed border-slate-200/70 dark:border-slate-800/80 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
                      <div
                        className={`text-[11px] leading-relaxed ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <span className="font-semibold">Kullanıldığı Modüller: </span>
                        <span>{ref.usedInModules.join(' · ')}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        {pubmedUrl && (
                          <a
                            href={pubmedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold font-mono tabular-nums transition-colors ${
                              isDark
                                ? 'bg-sky-500/10 border-sky-500/30 text-sky-300 hover:bg-sky-500/20'
                                : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
                            }`}
                          >
                            <span>PubMed · {ref.pmid}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {doiUrl && ref.doi && (
                          <div className="inline-flex items-center">
                            <a
                              href={doiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-l-md border text-[11px] font-semibold font-mono transition-colors ${
                                isDark
                                  ? 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500/20'
                                  : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
                              }`}
                            >
                              <span>DOI</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleCopyDoi(ref)}
                              title={`DOI kopyala: ${ref.doi}`}
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-r-md border border-l-0 text-[11px] font-medium transition-colors cursor-pointer ${
                                isDark
                                  ? 'bg-slate-800 border-teal-500/30 text-slate-300 hover:text-white hover:bg-slate-700'
                                  : 'bg-white border-teal-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                              }`}
                            >
                              {copiedDoiId === ref.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span>Kopyalandı</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Kopyala</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {ref.externalUrl && (
                          <a
                            href={ref.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold transition-colors ${
                              isDark
                                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                                : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                            }`}
                          >
                            <span>Resmi Kaynak</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        {!hasAnyLink && (
                          <span
                            className={`text-[11px] italic ${
                              isDark ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            Basılı textbook / klasik referans
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
