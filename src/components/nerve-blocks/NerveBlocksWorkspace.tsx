import React, { useState, useEffect, useMemo } from 'react';
import { 
  Activity, 
  Search, 
  Layers, 
  ShieldAlert, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Sparkles,
  Zap,
  Filter,
  Eye,
  SlidersHorizontal,
  BookmarkCheck
} from 'lucide-react';
import { NERVE_BLOCKS_DATA, NerveBlock, BlockRegion } from '../../data/nerveBlocksData';
import { LastCalculator } from './LastCalculator';
import { SensoryMapViewer } from './SensoryMapViewer';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface NerveBlocksWorkspaceProps {
  initialBlockId?: string | null;
  isDark?: boolean;
}

export const NerveBlocksWorkspace: React.FC<NerveBlocksWorkspaceProps> = ({ 
  initialBlockId,
  isDark = true
}) => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'last' | 'sensory'>('blocks');
  const [selectedRegion, setSelectedRegion] = useState<BlockRegion | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedBlockId, setExpandedBlockId] = useState<string | null>(initialBlockId || null);

  // Eğer URL'den veya haritadan özel bir blok seçilirse aç ve o sekmeye geç
  useEffect(() => {
    if (initialBlockId) {
      setExpandedBlockId(initialBlockId);
      setActiveTab('blocks');
    }
  }, [initialBlockId]);

  // Filtrelenmiş Bloklar
  const filteredBlocks = useMemo(() => {
    return NERVE_BLOCKS_DATA.filter((block) => {
      const matchesRegion = selectedRegion === 'all' || block.region === selectedRegion;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesRegion;

      const matchesSearch = 
        block.name.toLowerCase().includes(q) ||
        block.trName.toLowerCase().includes(q) ||
        block.summary.toLowerCase().includes(q) ||
        block.indications.some(i => i.toLowerCase().includes(q)) ||
        block.targetNerves.some(n => n.toLowerCase().includes(q)) ||
        block.tags.some(t => t.toLowerCase().includes(q));

      return matchesRegion && matchesSearch;
    });
  }, [selectedRegion, searchQuery]);

  const handleSelectFromMap = (blockId: string) => {
    setExpandedBlockId(blockId);
    setActiveTab('blocks');
    // Sayfada o bloğa doğru kaydır
    setTimeout(() => {
      const el = document.getElementById(`block-${blockId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      {/* Üst Başlık & Hızlı Sekmeler */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Dekoratif Arka Plan Işığı */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Rejyonel Anestezi & Analjezi
              </span>
              <span className="text-xs text-slate-400">Şişli Etfal Klinik Rehberi</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Bölgesel & Periferik Sinir Blokları
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              USG rehberliğinde ekstremite ve fasya plan blokları, sonoanatomi belirteçleri, kilo bazlı maksimum güvenli LA dozları ve acil ASRA/ESRA %20 İntralipid LAST kurtarma algoritması.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            <ShareLinkButton
              type="arac"
              id="nerve-blocks"
              title="Bölümü Paylaş"
              isDark={isDark}
              variant="compact"
            />
          </div>
        </div>

        {/* Ana Navigasyon Sekmeleri */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('blocks')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'blocks'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            Sinir Blokları Kütüphanesi ({NERVE_BLOCKS_DATA.length})
          </button>

          <button
            onClick={() => setActiveTab('last')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'last'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            Lokal Anestezik Doz & LAST İntralipid
          </button>

          <button
            onClick={() => setActiveTab('sensory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === 'sensory'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4 text-teal-400" />
            Cerrahi Bölge & Duyu Haritası
          </button>
        </div>
      </div>

      {/* 1. SEKME: SİNİR BLOKLARI KÜTÜPHANESİ */}
      {activeTab === 'blocks' && (
        <div className="space-y-6">
          {/* Filtre ve Arama Çubuğu */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Bölge Butonları */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: 'Tüm Bloklar' },
                { id: 'upper', label: 'Üst Ekstremite' },
                { id: 'lower', label: 'Alt Ekstremite' },
                { id: 'trunk', label: 'Gövde & Fasya' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedRegion === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Arama Alanı */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Blok, cerrahi veya sinir ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Blok Kartları Listesi */}
          <div className="space-y-4">
            {filteredBlocks.map((block) => {
              const isExpanded = expandedBlockId === block.id;

              return (
                <div
                  key={block.id}
                  id={`block-${block.id}`}
                  className={`bg-slate-900 border transition-all rounded-2xl overflow-hidden shadow-lg ${
                    isExpanded 
                      ? 'border-indigo-500/50 ring-1 ring-indigo-500/30' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Blok Kart Başlığı */}
                  <div
                    onClick={() => setExpandedBlockId(isExpanded ? null : block.id)}
                    className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-slate-800/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          block.region === 'upper'
                            ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                            : block.region === 'lower'
                            ? 'bg-teal-500/10 text-teal-300 border-teal-500/30'
                            : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                        }`}>
                          {block.regionLabel}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {block.name}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {block.trName}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                        {block.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right hidden sm:block">
                        <span className="text-[11px] font-mono text-cyan-400 block font-semibold">
                          {block.usg.probe}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {block.usg.needleApproach}
                        </span>
                      </div>

                      <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Genişletilmiş Detay Alanı */}
                  {isExpanded && (
                    <div className="p-6 bg-slate-950/70 border-t border-slate-800/80 space-y-6">
                      {/* Üst Bilgi Rozetleri & Bağlantı Paylaşımı */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs text-slate-400 font-medium">Hedef Yapılar:</span>
                          {block.targetNerves.map((n, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-200 rounded font-mono">
                              {n}
                            </span>
                          ))}
                        </div>

                        <ShareLinkButton
                          type="arac"
                          id={`nerve-blocks&blok=${block.id}`}
                          title="Bu Bloğun Linkini Kopyala"
                          isDark={isDark}
                          variant="compact"
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Sol Kolon: USG Rehberliği & Sonoanatomi */}
                        <div className="space-y-4">
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-3">
                              <Eye className="w-4 h-4" />
                              Ultrasonografi ve Girişim Tekniği
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div>
                                <span className="text-slate-400 block">Prob Tipi:</span>
                                <span className="text-white font-medium">{block.usg.probe}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Hasta Pozisyonu:</span>
                                <span className="text-slate-200">{block.usg.patientPosition}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Prob Yerleşimi:</span>
                                <span className="text-slate-200">{block.usg.probePosition}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">İğne Giriş Yönü:</span>
                                <span className="text-teal-300 font-semibold">{block.usg.needleApproach}</span>
                              </div>
                            </div>
                          </div>

                          {/* Sonoanatomi Belirteçleri */}
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2 mb-3">
                              <SlidersHorizontal className="w-4 h-4" />
                              Kritik Sonoanatomi Belirteçleri
                            </h4>
                            <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
                              {block.usg.sonoanatomy.map((sono, idx) => (
                                <li key={idx} className="leading-relaxed">{sono}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Sağ Kolon: İlaç Volümü, Cerrahi Kapsam & Pearls */}
                        <div className="space-y-4">
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2 mb-3">
                              <Zap className="w-4 h-4" />
                              Lokal Anestezik ve Dozaj Önerisi
                            </h4>
                            <div className="space-y-2 text-xs">
                              <div>
                                <span className="text-slate-400 block">Önerilen İlaç & Konsantrasyon:</span>
                                <span className="text-white font-medium">{block.localAnesthetic.recommendedDrugs}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Tipik Volüm:</span>
                                <span className="text-indigo-300 font-mono font-bold text-sm">
                                  {block.localAnesthetic.volumeRange}
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Başlama & Süre:</span>
                                <span className="text-slate-300">{block.localAnesthetic.onsetDuration}</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Motor / Duyu Karakteristiği:</span>
                                <span className="text-amber-300">{block.localAnesthetic.sensoryVsMotor}</span>
                              </div>
                            </div>
                          </div>

                          {/* Cerrahi Endikasyonlar */}
                          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-2">
                              <CheckCircle2 className="w-4 h-4" />
                              Cerrahi Endikasyonlar
                            </h4>
                            <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-4">
                              {block.indications.map((ind, i) => (
                                <li key={i}>{ind}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* İnci ve Tuzaklar ("Pearls & Pitfalls") */}
                      <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4" />
                          Klinik İpuçları, Güvenlik ve Tuzaklar ("Pearls & Pitfalls")
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-300 list-disc pl-4">
                          {block.pearlsAndPitfalls.map((pearl, i) => (
                            <li key={i} className="leading-relaxed">{pearl}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Kontrendikasyonlar ve Komplikasyonlar */}
                      <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
                        <div>
                          <strong className="text-rose-400">Olası Komplikasyonlar: </strong>
                          {block.complications.join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredBlocks.length === 0 && (
              <div className="text-center py-12 bg-slate-900/50 border border-slate-800 rounded-2xl">
                <Info className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-300">Aramanıza uygun sinir bloğu bulunamadı.</p>
                <p className="text-xs text-slate-500 mt-1">Lütfen filtreleri sıfırlayın veya farklı bir cerrahi arayın.</p>
                <button
                  onClick={() => { setSelectedRegion('all'); setSearchQuery(''); }}
                  className="mt-3 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-lg"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SEKME: LAST & LOKAL ANESTEZİK HESAPLAYICI */}
      {activeTab === 'last' && <LastCalculator />}

      {/* 3. SEKME: DUYU HARİTASI VE CERRAHİ BÖLGE */}
      {activeTab === 'sensory' && (
        <SensoryMapViewer onSelectBlock={handleSelectFromMap} selectedBlockId={expandedBlockId} />
      )}
    </div>
  );
};
