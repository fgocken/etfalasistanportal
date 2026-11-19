import React, { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Layers,
  Search,
  Syringe
} from 'lucide-react';
import { SpinalAnesthesiaGuide } from './SpinalAnesthesiaGuide';
import { ShareLinkButton } from '../common/ShareLinkButton';
import { updateHashRoute } from '../../utils/deepLink';

export type NeuraxialCategory = 'all' | 'intrathecal' | 'epidural' | 'caudal';

export interface NeuraxialLibraryItem {
  id: string;
  category: Exclude<NeuraxialCategory, 'all'>;
  categoryLabel: string;
  name: string;
  trName: string;
  summary: string;
  techniqueMeta: string;
  needleOrLevel: string;
  status: 'active' | 'preparing';
}

export const NEURAXIAL_LIBRARY_ITEMS: NeuraxialLibraryItem[] = [
  {
    id: 'spinal-anestezi',
    category: 'intrathecal',
    categoryLabel: 'İntratekal (Spinal)',
    name: 'Intrathecal / Subarachnoid Block',
    trName: 'Spinal Anestezi Klinik Talimatı & Doz / Güvenlik Rehberi',
    summary:
      'ASRA antikoagülan bekleme süreleri, Marcaine Heavy %0.5 dozlama, özel hasta grupları, orta hat vs. paramedyan yaklaşım, 23G/25G iğne seçimi, diferansiyel blok, Modifiye Bromage skalası ve post-op kırmızı bayraklar.',
    techniqueMeta: 'L3–L4 / L4–L5 Ponksiyon',
    needleOrLevel: '23G–25G Quincke · L1–L2 Medulla',
    status: 'active'
  },
  {
    id: 'epidural-anestezi',
    category: 'epidural',
    categoryLabel: 'Epidural Anestezi',
    name: 'Lumbar & Thoracic Epidural Block',
    trName: 'Lomber & Torakal Epidural Anestezi / Analjezi',
    summary:
      'Direnç kaybı (LOR) tekniği, hedef dermatom seviyesine göre kateter yerleştirme, test dozu güvenliği, sürekli infüzyon/PCEA rejimleri ve epidural hematom/apse kırmızı bayrakları.',
    techniqueMeta: 'Tuohy 18G · LOR',
    needleOrLevel: 'Lomber & Torakal Seviyeler',
    status: 'preparing'
  },
  {
    id: 'kombine-spinal-epidural',
    category: 'epidural',
    categoryLabel: 'Kombine Spinal-Epidural',
    name: 'Combined Spinal-Epidural (CSE)',
    trName: 'Kombine Spinal-Epidural (KSE / CSE)',
    summary:
      'Needle-through-needle tekniği, hızlı başlangıçlı düşük doz intratekal blok ile uzatılabilir epidural kateter titrasyonu (obstetrik ve majör alt ekstremite cerrahileri).',
    techniqueMeta: 'Tuohy + Pencil-Point',
    needleOrLevel: 'Ardışık İntratekal + Epidural',
    status: 'preparing'
  },
  {
    id: 'kaudal-blok',
    category: 'caudal',
    categoryLabel: 'Sakral / Kaudal Blok',
    name: 'Caudal Epidural Block',
    trName: 'Kaudal (Sakral) Blok',
    summary:
      'Sakral hiatus & kornu anatomisi, USG/landmark rehberliği, pediatrik volüm hesaplama ve erişkin sakral analjezi yaklaşımları.',
    techniqueMeta: 'Sakral Hiatus',
    needleOrLevel: 'Pediatrik & Erişkin',
    status: 'preparing'
  }
];

interface NeuraxialLibraryViewProps {
  isDark?: boolean;
  expandedItemId: string | null;
  onExpandItem: (itemId: string | null) => void;
}

export const NeuraxialLibraryView: React.FC<NeuraxialLibraryViewProps> = ({
  isDark = true,
  expandedItemId,
  onExpandItem
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NeuraxialCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return NEURAXIAL_LIBRARY_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      if (!q) return matchesCat;
      const matchesSearch =
        item.name.toLowerCase().includes(q) ||
        item.trName.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.techniqueMeta.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    if (expandedItemId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`neuraxial-${expandedItemId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [expandedItemId]);

  const toggleItem = (itemId: string) => {
    const nextId = expandedItemId === itemId ? null : itemId;
    onExpandItem(nextId);
    updateHashRoute('blok', nextId || 'neuraxial');
  };

  return (
    <div className="space-y-6">
      {/* Filtre ve Arama Çubuğu (Sinir Blokları Kütüphanesi mimarisi ile birebir uyumlu) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: `Tüm Nöraksiyel Bloklar (${NEURAXIAL_LIBRARY_ITEMS.length})` },
            { id: 'intrathecal', label: 'İntratekal / Spinal' },
            { id: 'epidural', label: 'Epidural & KSE' },
            { id: 'caudal', label: 'Sakral / Kaudal' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedCategory(tab.id as NeuraxialCategory)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Spinal, epidural, kaudal ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Nöraksiyel Blok Kartları Listesi */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isExpanded = expandedItemId === item.id;
          const isActive = item.status === 'active';

          return (
            <div
              key={item.id}
              id={`neuraxial-${item.id}`}
              className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden shadow-lg ${
                isExpanded
                  ? 'border-cyan-500/50 ring-1 ring-cyan-500/30'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Kart Başlığı */}
              <a
                href={`#blok=${item.id}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    toggleItem(item.id);
                  }
                }}
                className="group p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors no-underline text-inherit"
              >
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                        item.category === 'intrathecal'
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : item.category === 'epidural'
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                          : 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                      }`}
                    >
                      {item.categoryLabel}
                    </span>
                    {item.status === 'preparing' && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded border bg-amber-500/10 text-amber-300 border-amber-500/30 inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Hazırlanıyor
                      </span>
                    )}
                    <span className="text-xs text-slate-400 font-mono">{item.name}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.trName}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-mono text-cyan-400 block font-semibold">
                      {item.techniqueMeta}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.needleOrLevel}</span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </a>

              {/* Genişletilmiş İçerik Alanı */}
              {isExpanded && (
                <div className="p-4 sm:p-6 bg-slate-950/70 border-t border-slate-800/80 space-y-4">
                  {isActive && item.id === 'spinal-anestezi' ? (
                    <SpinalAnesthesiaGuide isDark={isDark} />
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Layers className="w-4 h-4 text-cyan-400" />
                          <span>Nöraksiyel Anestezi Kütüphanesi · Planlanan Modül</span>
                        </div>
                        <ShareLinkButton
                          type="blok"
                          id={item.id}
                          title={`${item.trName} Bağlantısını Kopyala`}
                          isDark={isDark}
                          variant="compact"
                        />
                      </div>

                      <div className="rounded-xl border border-dashed border-slate-700/80 bg-slate-900/60 p-8 text-center space-y-3">
                        <div className="mx-auto w-11 h-11 rounded-xl flex items-center justify-center border bg-slate-800 border-slate-700 text-cyan-400">
                          <Syringe className="w-5 h-5" />
                        </div>
                        <h4 className="text-base font-bold text-white">{item.trName} Bölümü Hazırlanıyor</h4>
                        <p className="max-w-lg mx-auto text-xs text-slate-400 leading-relaxed">
                          Bu nöraksiyel blok protokolünün klinik içeriği bir sonraki aşamada kanıta dayalı kılavuzlar ve doz tablolarıyla eklenecektir.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl">
            <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">Aramanıza uygun nöraksiyel blok bulunamadı.</p>
            <p className="text-xs text-slate-500 mt-1">Lütfen filtreleri sıfırlayın veya farklı bir arama yapın.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg cursor-pointer"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
