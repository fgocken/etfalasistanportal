import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Layers, 
  Filter, 
  Stethoscope, 
  X,
  ArrowLeft,
  ArrowRight,
  Brain,
  Scissors,
  Heart,
  Bone,
  Baby,
  Activity,
  Ear,
  Sparkles,
  Wind,
  Eye,
  Zap,
  LayoutGrid,
  CheckCircle2
} from 'lucide-react';
import { SurgicalSpecialty, ProcedureDefinition, SurgicalSpecialtyMeta } from '../../types/procedures';
import { 
  SURGICAL_SPECIALTIES, 
  REGISTERED_PROCEDURES, 
  searchProcedures, 
  getProcedureById 
} from '../../data/procedures';
import { ProcedureDetailView } from './ProcedureDetailView';

interface ProceduresWorkspaceProps {
  isDark: boolean;
  initialProcedureId?: string | null;
}

// Branşlara özel ikon ve stil konfigürasyonu
const SPECIALTY_CONFIG: Record<SurgicalSpecialty, {
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  borderHover: string;
}> = {
  norosirurji: {
    icon: Brain,
    accentColor: 'text-purple-600 dark:text-purple-400 bg-purple-500/10',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200 dark:border-purple-800/50',
    borderHover: 'hover:border-purple-500/50'
  },
  genel_cerrahi: {
    icon: Scissors,
    accentColor: 'text-teal-600 dark:text-teal-400 bg-teal-500/10',
    badgeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800/50',
    borderHover: 'hover:border-teal-500/50'
  },
  kvc: {
    icon: Heart,
    accentColor: 'text-rose-600 dark:text-rose-400 bg-rose-500/10',
    badgeBg: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
    borderHover: 'hover:border-rose-500/50'
  },
  ortopedi: {
    icon: Bone,
    accentColor: 'text-amber-600 dark:text-amber-400 bg-amber-500/10',
    badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
    borderHover: 'hover:border-amber-500/50'
  },
  kadin_dogum: {
    icon: Baby,
    accentColor: 'text-pink-600 dark:text-pink-400 bg-pink-500/10',
    badgeBg: 'bg-pink-50 text-pink-700 dark:bg-pink-950/40 dark:text-pink-300 border-pink-200 dark:border-pink-800/50',
    borderHover: 'hover:border-pink-500/50'
  },
  uroloji: {
    icon: Activity,
    accentColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10',
    badgeBg: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/50',
    borderHover: 'hover:border-indigo-500/50'
  },
  kbb: {
    icon: Ear,
    accentColor: 'text-blue-600 dark:text-blue-400 bg-blue-500/10',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
    borderHover: 'hover:border-blue-500/50'
  },
  plastik_cerrahi: {
    icon: Sparkles,
    accentColor: 'text-fuchsia-600 dark:text-fuchsia-400 bg-fuchsia-500/10',
    badgeBg: 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800/50',
    borderHover: 'hover:border-fuchsia-500/50'
  },
  gogus_cerrahisi: {
    icon: Wind,
    accentColor: 'text-sky-600 dark:text-sky-400 bg-sky-500/10',
    badgeBg: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-200 dark:border-sky-800/50',
    borderHover: 'hover:border-sky-500/50'
  },
  cocuk_cerrahisi: {
    icon: Stethoscope,
    accentColor: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    borderHover: 'hover:border-emerald-500/50'
  },
  goz: {
    icon: Eye,
    accentColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10',
    badgeBg: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800/50',
    borderHover: 'hover:border-cyan-500/50'
  },
  gastroenteroloji: {
    icon: Layers,
    accentColor: 'text-teal-600 dark:text-teal-400 bg-teal-500/10',
    badgeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200 dark:border-teal-800/50',
    borderHover: 'hover:border-teal-500/50'
  },
  psikiyatri: {
    icon: Zap,
    accentColor: 'text-violet-600 dark:text-violet-400 bg-violet-500/10',
    badgeBg: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-200 dark:border-violet-800/50',
    borderHover: 'hover:border-violet-500/50'
  }
};

export const ProceduresWorkspace: React.FC<ProceduresWorkspaceProps> = ({
  isDark,
  initialProcedureId
}) => {
  // initialProcedureId varsa doğrudan o prosedürün branşını açacak şekilde başlangıç ayarı yapılır
  const initialProcedure = useMemo(() => {
    if (!initialProcedureId) return null;
    return getProcedureById(initialProcedureId) || null;
  }, [initialProcedureId]);

  // selectedSpecialty: null ise ana "Branş Kartları" görünümü gösterilir.
  // Bir branşa basılırsa o branşın ID'si atanır. 'all' ise düz tüm liste modudur.
  const [selectedSpecialty, setSelectedSpecialty] = useState<SurgicalSpecialty | 'all' | null>(
    initialProcedure ? initialProcedure.specialty : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(initialProcedureId || null);

  // Arama sonuçları
  const filteredProcedures = useMemo(() => {
    const scope = selectedSpecialty === null ? 'all' : selectedSpecialty;
    return searchProcedures(searchQuery, scope);
  }, [searchQuery, selectedSpecialty]);

  const activeProcedure = useMemo(() => {
    if (!selectedProcedureId) return null;
    return getProcedureById(selectedProcedureId) || null;
  }, [selectedProcedureId]);

  // Seçili branşın meta bilgisi
  const activeSpecialtyMeta = useMemo(() => {
    if (!selectedSpecialty || selectedSpecialty === 'all') return null;
    return SURGICAL_SPECIALTIES.find(s => s.id === selectedSpecialty) || null;
  }, [selectedSpecialty]);

  // Branş başına düşen kayıtlı prosedür sayıları
  const procedureCountsBySpecialty = useMemo(() => {
    const map: Record<string, number> = {};
    for (const spec of SURGICAL_SPECIALTIES) {
      map[spec.id] = REGISTERED_PROCEDURES.filter(p => p.specialty === spec.id).length;
    }
    return map;
  }, []);

  // Aktif branş sayısı (en az 1 prosedürü olan)
  const activeSpecialtiesCount = useMemo(() => {
    return Object.values(procedureCountsBySpecialty).filter(c => c > 0).length;
  }, [procedureCountsBySpecialty]);

  // 1) Eğer bir prosedür seçiliyse doğrudan detay görünümünü göster
  if (activeProcedure) {
    return (
      <ProcedureDetailView 
        procedure={activeProcedure}
        isDark={isDark}
        onBack={() => setSelectedProcedureId(null)}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Workspace Header */}
      <div className={`p-6 rounded-2xl border transition-colors ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 shadow-md' 
          : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                isDark ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                Klinik Karar Destek Aracı
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {REGISTERED_PROCEDURES.length} Prosedür · {activeSpecialtiesCount} Aktif Cerrahi Branş
              </span>
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Sistematik Prosedür Bazlı Anestezi Yönetimi
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Cerrahi prosedür bazında anestezi yönetimi, pre-op hazırlık, intra-op havayolu ve vasküler erişim, cerrahi kritik anlar, Jaffe 5th ed., ERAS ve PROSPECT kanıta dayalı analjezi rehberleri.
            </p>
          </div>

          <div className={`shrink-0 p-3.5 rounded-xl border flex items-center gap-3 ${
            isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <BookOpen className="w-5 h-5 text-teal-500 shrink-0" />
            <div className="text-xs">
              <div className="font-bold">Kaynak Temelli</div>
              <div className="text-[11px] text-slate-400">Jaffe · ERAS · PROSPECT</div>
            </div>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              selectedSpecialty && selectedSpecialty !== 'all' && activeSpecialtyMeta
                ? `${activeSpecialtyMeta.name} içinde prosedür veya endikasyon arayın...`
                : "Prosedür adı, cerrahi branş, kısaltma veya endikasyon ile arayın (örn. kolesistektomi, alif, karotis, ekt)..."
            }
            className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm transition-all outline-hidden border ${
              isDark
                ? 'bg-slate-950/70 border-slate-800 text-slate-200 placeholder-slate-500 focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/30'
                : 'bg-slate-50 border-slate-300 text-slate-800 placeholder-slate-400 focus:border-teal-600 focus:ring-1 focus:ring-teal-600/20'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* DURUM 1: Kullanıcı Arama Çubuğuna Yazmışsa (Canlı Arama Sonuçları Modu) */}
      {searchQuery.trim().length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold px-1 text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-teal-500" />
              <span>
                "{searchQuery}" araması için <strong className="text-slate-800 dark:text-slate-200">{filteredProcedures.length}</strong> sonuç bulundu
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-teal-600 dark:text-teal-400 hover:underline cursor-pointer text-xs"
            >
              Aramayı Temizle
            </button>
          </div>

          {filteredProcedures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredProcedures.map((proc) => renderProcedureCard(proc, isDark, setSelectedProcedureId))}
            </div>
          ) : (
            renderEmptyState(isDark, searchQuery)
          )}
        </div>
      ) : selectedSpecialty === null ? (
        /* DURUM 2: Ana Sayfa — BRANŞ KARTLARI GÖRÜNÜMÜ */
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Cerrahi Branş Kataloğu
              </h2>
              <span className="text-xs text-slate-400">
                (İlgilendiğiniz branşı seçiniz)
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSpecialty('all')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-teal-300 hover:border-teal-500/40' 
                  : 'bg-white border-slate-200 text-slate-700 hover:text-teal-700 hover:border-teal-600'
              }`}
            >
              <span>Tüm Prosedürleri Listele ({REGISTERED_PROCEDURES.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Branş Kartları Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SURGICAL_SPECIALTIES.map((spec) => {
              const count = procedureCountsBySpecialty[spec.id] || 0;
              const config = SPECIALTY_CONFIG[spec.id] || {
                icon: Stethoscope,
                accentColor: 'text-slate-600 dark:text-slate-400 bg-slate-500/10',
                badgeBg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
                borderHover: 'hover:border-slate-500/40'
              };
              const IconComponent = config.icon;

              return (
                <div
                  key={spec.id}
                  onClick={() => setSelectedSpecialty(spec.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between gap-4 ${
                    isDark
                      ? `bg-slate-900/80 border-slate-800 ${config.borderHover} hover:bg-slate-900 shadow-sm hover:shadow-md`
                      : `bg-white border-slate-200 ${config.borderHover} hover:shadow-md`
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${config.accentColor}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {count > 0 ? (
                        <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${config.badgeBg}`}>
                          {count} Prosedür
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                          Hazırlanıyor
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3 className={`text-base font-bold transition-colors ${
                        isDark ? 'text-slate-100 group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
                      }`}>
                        {spec.name}
                      </h3>
                      <p className={`text-xs line-clamp-2 leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {spec.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                    <span className={count > 0 ? 'text-teal-600 dark:text-teal-400' : 'text-slate-400 dark:text-slate-500'}>
                      {count > 0 ? 'Prosedürleri İncele' : 'Kayıt Bekleniyor'}
                    </span>
                    <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* DURUM 3: Belirli Bir Branş veya Tüm Liste Seçildiğinde (Prosedürler Listesi) */
        <div className="space-y-5">
          {/* Breadcrumb ve Geri Dön Butonu */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedSpecialty(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-teal-300'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-teal-800 shadow-2xs'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Tüm Cerrahi Branşlar</span>
              </button>

              <span className="text-slate-400 text-xs">/</span>

              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                {activeSpecialtyMeta ? (
                  <>
                    <span>{activeSpecialtyMeta.name}</span>
                    <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
                      ({filteredProcedures.length} Prosedür)
                    </span>
                  </>
                ) : (
                  <>
                    <span>Tüm Prosedürler Kataloğu</span>
                    <span className="text-[11px] font-mono text-teal-600 dark:text-teal-400">
                      ({filteredProcedures.length} Prosedür)
                    </span>
                  </>
                )}
              </span>
            </div>

            {/* Hızlı Branş Değiştirici Butonları */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              <button
                type="button"
                onClick={() => setSelectedSpecialty('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSpecialty === 'all'
                    ? isDark ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-teal-700 text-white'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tümü
              </button>
              {SURGICAL_SPECIALTIES.filter(s => (procedureCountsBySpecialty[s.id] || 0) > 0).map((spec) => {
                const isCurrent = selectedSpecialty === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setSelectedSpecialty(spec.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isCurrent
                        ? isDark ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' : 'bg-teal-700 text-white'
                        : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {spec.shortName} ({procedureCountsBySpecialty[spec.id]})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Branş Açıklama Kutusu */}
          {activeSpecialtyMeta && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              {(() => {
                const config = SPECIALTY_CONFIG[activeSpecialtyMeta.id];
                const IconComponent = config ? config.icon : Stethoscope;
                return (
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${config ? config.accentColor : 'text-teal-600 bg-teal-500/10'}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                );
              })()}
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {activeSpecialtyMeta.name} Anestezi Protokolleri
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeSpecialtyMeta.description}
                </p>
              </div>
            </div>
          )}

          {/* Prosedür Kartları Grid */}
          {filteredProcedures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredProcedures.map((proc) => renderProcedureCard(proc, isDark, setSelectedProcedureId))}
            </div>
          ) : (
            renderEmptyState(isDark, searchQuery)
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Tekil Prosedür Kartı Render Fonksiyonu
 */
function renderProcedureCard(
  proc: ProcedureDefinition,
  isDark: boolean,
  onSelect: (id: string) => void
) {
  return (
    <div
      key={proc.id}
      onClick={() => onSelect(proc.id)}
      className={`p-4.5 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between gap-3 ${
        isDark 
          ? 'bg-slate-900/80 border-slate-800 hover:border-teal-500/50 hover:bg-slate-900 shadow-2xs hover:shadow-sm' 
          : 'bg-white border-slate-200 hover:border-teal-600 hover:shadow-sm'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
            isDark ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' : 'bg-teal-50 text-teal-800 border border-teal-200'
          }`}>
            {proc.shortCode || proc.specialtyName}
          </span>
          {proc.categoryTag && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {proc.categoryTag}
            </span>
          )}
        </div>

        <h3 className={`text-base font-bold transition-colors leading-snug ${
          isDark ? 'text-slate-100 group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
        }`}>
          {proc.name}
        </h3>

        <p className={`text-xs line-clamp-2 leading-relaxed ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {proc.description}
        </p>

        {/* Tahmini Süre */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-amber-600 dark:text-amber-400 pt-0.5">
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>Tahmini Ortalama Süre: <strong className="font-mono font-semibold">{proc.averageDuration}</strong></span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
          <Stethoscope className="w-3.5 h-3.5 text-teal-500 shrink-0" />
          <span className="truncate max-w-[220px]">
            {proc.anesthesiaTechniques.primary[0]}
          </span>
        </div>
        <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform text-xs shrink-0">
          <span>İncele</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}

/**
 * Boş Durum (Empty State) Render Fonksiyonu
 */
function renderEmptyState(isDark: boolean, searchQuery: string) {
  return (
    <div className={`p-8 rounded-2xl border text-center space-y-3 ${
      isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
    }`}>
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
        <BookOpen className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Bu branşta henüz kayıtlı prosedür bulunmuyor
        </h3>
        <p className="text-xs max-w-md mx-auto text-slate-500">
          {searchQuery 
            ? `"${searchQuery}" aramasıyla eşleşen herhangi bir prosedür bulunamadı.` 
            : 'Bu cerrahi branş için protokol kayıtları hazırlanma aşamasındadır.'}
        </p>
      </div>
    </div>
  );
}
