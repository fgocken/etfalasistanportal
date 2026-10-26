import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { NERVE_BLOCKS_DATA, NerveBlock } from '../../data/nerveBlocksData';

interface SurgicalZone {
  id: string;
  title: string;
  category: 'Üst Ekstremite' | 'Alt Ekstremite' | 'Gövde & Batın';
  examples: string[];
  recommendedBlocks: string[]; // NerveBlock id'leri
  dermatomes: string;
  notes: string;
}

const SURGICAL_ZONES: SurgicalZone[] = [
  {
    id: 'shoulder',
    title: 'Omuz & Klavikula',
    category: 'Üst Ekstremite',
    examples: ['Omuz Artroskopisi', 'Total Omuz Artroplastisi', 'Proksimal Humerus Kırığı'],
    recommendedBlocks: ['interskalen'],
    dermatomes: 'C5, C6 (Suprascapular, Axillary nerves)',
    notes: 'İnterskalen altın standarttır; diyafram rezervi düşükse supraskapuler + aksiller selektif blok alternatiftir.'
  },
  {
    id: 'elbow',
    title: 'Dirsek Cerrahisi',
    category: 'Üst Ekstremite',
    examples: ['Dirsek Artroskopisi', 'Distal Humerus / Olekranon Kırığı', 'Tenisçi Dirseği'],
    recommendedBlocks: ['supraklavikuler', 'infraklavikuler'],
    dermatomes: 'C5, C6, C7, C8',
    notes: 'Supraklaviküler veya infraklaviküler blok ile tam sensoryel ve motor blok sağlanır.'
  },
  {
    id: 'forearm-hand',
    title: 'Önkol, El Bileği & El',
    category: 'Üst Ekstremite',
    examples: ['Karpal Tünel Gevşetme', 'Radius Distal (Colles) Kırığı', 'Tendon Onarımları', 'AV Fistül'],
    recommendedBlocks: ['aksiller', 'infraklavikuler', 'supraklavikuler'],
    dermatomes: 'C6, C7, C8, T1 (Median, Ulnar, Radial)',
    notes: 'Günübirlik cerrahide aksiller blok torakstan uzaklığıyla en güvenlidir. Turnike için medial kutanöz desteklenmelidir.'
  },
  {
    id: 'hip',
    title: 'Kalça Eklem & Femur Proksimali',
    category: 'Alt Ekstremite',
    examples: ['Total Kalça Artroplastisi', 'Femur Boyun Kırığı', 'Trokanterik Kırık'],
    recommendedBlocks: ['peng', 'femoral'],
    dermatomes: 'L2, L3, L4 (Artiküler dallar & LFCN)',
    notes: 'PENG bloğu motor gücü (kuadriseps) koruyarak tam eklem analjezisi sağlar; LFCN ile kombine edilir.'
  },
  {
    id: 'knee',
    title: 'Diz Eklemi & Patella',
    category: 'Alt Ekstremite',
    examples: ['Total Diz Artroplastisi (TKA)', 'Ön Çapraz Bağ (ÖÇB)', 'Patella Kırığı'],
    recommendedBlocks: ['adduktor-kanal', 'femoral'],
    dermatomes: 'L2, L3, L4 (Safen sinir, Vastus medialis siniri)',
    notes: 'Adduktor Kanal Bloğu motor gücü korur ve düşme riskini düşürür. Femoral blok derin anestezi sağlar ancak düşme riski yüksektir.'
  },
  {
    id: 'foot-ankle',
    title: 'Ayak & Ayak Bileği',
    category: 'Alt Ekstremite',
    examples: ['Trimalleolar Kırık', 'Aşil Tendon Onarımı', 'Diyabetik Ayak Ampütasyonu', 'Halluks Valgus'],
    recommendedBlocks: ['popliteal-siyatik', 'adduktor-kanal'],
    dermatomes: 'L4, L5, S1, S2, S3 (Siyatik + Safen)',
    notes: 'Popliteal siyatik blok ayağın neredeyse tamamını uyuşturur; medial malleol için Safen (ACB) desteği gerekir.'
  },
  {
    id: 'thorax-breast',
    title: 'Göğüs Kafesi & Meme',
    category: 'Gövde & Batın',
    examples: ['Mastektomi / Lumpektomi', 'VATS Torakotomi', 'Kosta Kırıkları'],
    recommendedBlocks: ['esp'],
    dermatomes: 'T2 - T6 (Dorsal & ventral ramuslar)',
    notes: 'Torakal ESP T4-T5 seviyesinde bilateral veya unilateral mükemmel somatik ve visseral analjezi sağlar.'
  },
  {
    id: 'abdomen-midline',
    title: 'Orta Hat Batın & Göbek Fıtığı',
    category: 'Gövde & Batın',
    examples: ['Göbek Fıtığı (Umblikal Herni)', 'Orta Hat Laparotomi', 'Laparoskopi Kamera Giriş Yeri'],
    recommendedBlocks: ['rektus-kilifi', 'esp'],
    dermatomes: 'T7 - T11 (Anterior kutanöz dallar)',
    notes: 'Bilateral Rektus Kılıfı orta hat insizyonlarında epidurale eşdeğer somatik rahatlama sağlar.'
  },
  {
    id: 'lower-abdomen-csection',
    title: 'Alt Batın, Sezaryen & Kasık',
    category: 'Gövde & Batın',
    examples: ['Sezaryen Sonrası Analjezi', 'İnguinal Herni', 'Apendektomi', 'Jinekolojik Alt Batın'],
    recommendedBlocks: ['tap', 'esp'],
    dermatomes: 'T10 - L1',
    notes: 'Bilateral TAP bloğu sezaryen sonrası opioid tüketimini %50’ye varan oranda azaltır.'
  }
];

interface SensoryMapViewerProps {
  onSelectBlock?: (blockId: string) => void;
  selectedBlockId?: string | null;
}

export const SensoryMapViewer: React.FC<SensoryMapViewerProps> = ({ 
  onSelectBlock,
  selectedBlockId 
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('shoulder');

  const currentZone = SURGICAL_ZONES.find(z => z.id === selectedZoneId) || SURGICAL_ZONES[0];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100">
      {/* Başlık */}
      <div className="bg-gradient-to-r from-teal-950/70 via-slate-900 to-cyan-950/40 p-5 border-b border-teal-500/20">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500/20 border border-teal-500/40 rounded-xl text-teal-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                İnteraktif Rehber
              </span>
              <span className="text-xs text-slate-400">Anatomik Kapsama & Dermatom Dağılımı</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mt-1">
              Cerrahi Bölgeye Göre Blok Seçimi & Duyu Haritası
            </h2>
          </div>
        </div>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sol Kolon: Cerrahi Bölge Seçici */}
        <div className="lg:col-span-5 space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-400" />
            Cerrahi Müdahale Alanı Seçin
          </label>

          <div className="space-y-2">
            {SURGICAL_ZONES.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-teal-500/15 border-teal-500/60 shadow-md ring-1 ring-teal-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-teal-400 font-semibold px-1.5 py-0.5 bg-slate-900 rounded">
                        {zone.category}
                      </span>
                      <span className="font-bold text-sm text-white">{zone.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {zone.examples.join(', ')}
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-teal-400 translate-x-1' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Sağ Kolon: Detaylı Kapsama ve Önerilen Bloklar */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-xs text-teal-400 font-mono uppercase">{currentZone.category}</span>
                <h3 className="text-xl font-bold text-white">{currentZone.title}</h3>
                <div className="text-xs text-slate-400 mt-1">
                  <strong>İnnervasyon & Dermatom:</strong> {currentZone.dermatomes}
                </div>
              </div>
            </div>

            {/* Cerrahi Örnekleri */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-slate-400 block mb-2">Başlıca Cerrahi Endikasyonlar:</span>
              <div className="flex flex-wrap gap-2">
                {currentZone.examples.map((ex, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 bg-slate-900 text-teal-200 rounded-lg border border-teal-500/20 font-medium">
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            {/* Klinik Not */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 mb-5 leading-relaxed">
              <strong className="text-amber-300 font-semibold block mb-1">Klinik Tercih & İnci:</strong>
              {currentZone.notes}
            </div>

            {/* Önerilen Blok Kartları */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5 mb-2.5">
                <Layers className="w-4 h-4" />
                Önerilen Rejyonel Anestezi Teknikleri:
              </span>

              <div className="space-y-2.5">
                {currentZone.recommendedBlocks.map((blockId) => {
                  const block = NERVE_BLOCKS_DATA.find(b => b.id === blockId);
                  if (!block) return null;

                  return (
                    <div 
                      key={block.id}
                      className="bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 rounded-xl p-3.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{block.trName}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-teal-500/15 text-teal-300 rounded border border-teal-500/30">
                            {block.regionLabel}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                          {block.summary}
                        </div>
                        <div className="text-[11px] text-cyan-300/90 mt-1">
                          <strong>Hedef:</strong> {block.targetNerves.join(', ')}
                        </div>
                      </div>

                      {onSelectBlock && (
                        <button
                          onClick={() => onSelectBlock(block.id)}
                          className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 self-start sm:self-center"
                        >
                          Bloğu İncele
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
