import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Filter, 
  Stethoscope, 
  X
} from 'lucide-react';
import { SurgicalSpecialty, ProcedureDefinition } from '../../types/procedures';
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

export const ProceduresWorkspace: React.FC<ProceduresWorkspaceProps> = ({
  isDark,
  initialProcedureId
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<SurgicalSpecialty | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(initialProcedureId || null);

  const filteredProcedures = useMemo(() => {
    return searchProcedures(searchQuery, selectedSpecialty);
  }, [searchQuery, selectedSpecialty]);

  const activeProcedure = useMemo(() => {
    if (!selectedProcedureId) return null;
    return getProcedureById(selectedProcedureId) || null;
  }, [selectedProcedureId]);

  // If a procedure is selected, render the detail view
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
                {REGISTERED_PROCEDURES.length} Prosedür Kayıtlı
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
            <BookOpen className="w-5 h-5 text-teal-500" />
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
            placeholder="Prosedür adı, cerrahi branş, kısaltma veya endikasyon ile arayın (örn. kolesistektomi, protez, apendektomi)..."
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

      {/* Specialty Filter Tabs (All Specialties Category Tree) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 px-1">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Cerrahi Branş Filtresi</span>
          </div>
          <span>{filteredProcedures.length} sonuç</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          <button
            type="button"
            onClick={() => setSelectedSpecialty('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedSpecialty === 'all'
                ? isDark
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-xs'
                  : 'bg-teal-700 text-white shadow-xs'
                : isDark
                  ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs'
            }`}
          >
            Tüm Branşlar
          </button>

          {SURGICAL_SPECIALTIES.map((spec) => {
            const isSelected = selectedSpecialty === spec.id;
            const count = REGISTERED_PROCEDURES.filter(p => p.specialty === spec.id).length;
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => setSelectedSpecialty(spec.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-xs'
                      : 'bg-teal-700 text-white shadow-xs'
                    : isDark
                      ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs'
                }`}
              >
                <span>{spec.shortName}</span>
                {count > 0 && (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : isDark ? 'bg-slate-800 text-teal-400' : 'bg-slate-100 text-teal-700'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Procedures List */}
      {filteredProcedures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredProcedures.map((proc) => (
            <div
              key={proc.id}
              onClick={() => setSelectedProcedureId(proc.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer group flex flex-col justify-between gap-3 ${
                isDark 
                  ? 'bg-slate-900/80 border-slate-800 hover:border-teal-500/50 hover:bg-slate-900' 
                  : 'bg-white border-slate-200 hover:border-teal-600 hover:shadow-xs'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isDark ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' : 'bg-teal-50 text-teal-800 border border-teal-200'
                  }`}>
                    {proc.shortCode || proc.specialtyName}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-amber-500 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{proc.averageDuration}</span>
                  </div>
                </div>

                <h3 className={`text-base font-bold transition-colors ${
                  isDark ? 'text-slate-100 group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-700'
                }`}>
                  {proc.name}
                </h3>

                <p className={`text-xs line-clamp-2 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {proc.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                  <Stethoscope className="w-3.5 h-3.5 text-teal-500" />
                  <span className="truncate max-w-[240px]">
                    {proc.anesthesiaTechniques.primary[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold group-hover:translate-x-0.5 transition-transform text-xs">
                  <span>İncele</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
              {searchQuery ? `"${searchQuery}" aramasıyla eşleşen prosedür bulunamadı.` : 'Bu branş için kayıtlı prosedür bulunamadı.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
