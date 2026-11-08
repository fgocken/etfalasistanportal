import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  ChevronDown,
  ChevronUp,
  Activity,
  Droplet,
  Layers,
  HeartPulse,
  Wind,
  FileText,
  Bookmark,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ProcedureDefinition } from '../../types/procedures';
import { getProcedureIndispensableRules } from '../../utils/procedureRulesParser';

interface ProcedureDetailViewProps {
  procedure: ProcedureDefinition;
  isDark: boolean;
  onBack: () => void;
}

export const ProcedureDetailView: React.FC<ProcedureDetailViewProps> = ({
  procedure,
  isDark,
  onBack
}) => {
  // Ana bölümlerin açılıp kapanabilir durumları (hepsi başlangıçta açık: 1'den 7'ye kadar)
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>({
    sec1: true,
    sec2: true,
    sec3: true,
    sec4: true,
    sec5: true,
    sec6: true,
    sec7: true
  });

  // Alt akordeonların durumları (4a-4c, 5a-5g, 6a-6c)
  const [subOpen, setSubOpen] = useState<Record<string, boolean>>({
    '4a': true,
    '4b': true,
    '4c': true,
    '5a': true,
    '5b': true,
    '5c': true,
    '5d': true,
    '5e': true,
    '5f': true,
    '5g': true,
    '6a': true,
    '6b': true,
    '6c': true
  });

  // Anestezinin Vazgeçilmez Kuralları ve Hava Yolu Notlarının Akıllı Ayrıştırılması
  const parsedRules = getProcedureIndispensableRules(procedure);

  const toggleSection = (key: string) => {
    setSectionOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSub = (key: string) => {
    setSubOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const expandAll = () => {
    setSectionOpen({ sec1: true, sec2: true, sec3: true, sec4: true, sec5: true, sec6: true, sec7: true });
    setSubOpen({
      '4a': true, '4b': true, '4c': true,
      '5a': true, '5b': true, '5c': true, '5d': true, '5e': true, '5f': true, '5g': true,
      '6a': true, '6b': true, '6c': true
    });
  };

  const collapseAll = () => {
    setSectionOpen({ sec1: false, sec2: false, sec3: false, sec4: false, sec5: false, sec6: false, sec7: false });
    setSubOpen({
      '4a': false, '4b': false, '4c': false,
      '5a': false, '5b': false, '5c': false, '5d': false, '5e': false, '5f': false, '5g': false,
      '6a': false, '6b': false, '6c': false
    });
  };

  const scrollToSection = (id: string) => {
    // Bölüm kapalıysa önce aç
    setSectionOpen(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 select-text">
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          type="button"
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer w-fit ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tüm Prosedürler Kataloğuna Dön</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2.5 py-1 rounded font-medium border ${
            isDark 
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-300' 
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            {procedure.specialtyName}
          </span>
          {procedure.categoryTag && (
            <span className={`text-xs px-2 py-0.5 rounded font-medium ${
              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
            }`}>
              {procedure.categoryTag}
            </span>
          )}
        </div>
      </div>

      {/* Hero Overview Card */}
      <div className={`p-5 rounded-2xl border transition-colors ${
        isDark 
          ? 'bg-slate-900/90 border-slate-800 shadow-md' 
          : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
              isDark ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' : 'bg-teal-50 text-teal-800 border border-teal-200'
            }`}>
              {procedure.shortCode || 'PROSEDÜR'}
            </span>
            <span className="text-xs text-slate-400 font-medium">Sistematik Prosedür Bazlı Anestezi Yönetimi</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            {procedure.name}
          </h1>
          <p className={`text-sm leading-relaxed max-w-3xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            {procedure.description}
          </p>
        </div>

        {/* Hızlı Atla & Genişlet/Daralt Araç Çubuğu */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold shrink-0 mr-1">Hızlı Geçiş:</span>
            <button
              type="button"
              onClick={() => scrollToSection('sec1')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              1. Tanım & Süre
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec2')}
              className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-semibold whitespace-nowrap cursor-pointer transition-colors border border-rose-200/50 dark:border-rose-800/50 flex items-center gap-1"
            >
              <Droplet className="w-3 h-3 text-rose-500" />
              <span>2. Kanama Profili</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec3')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              3. Teknikler
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec4')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              4. Pre-op
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec5')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              5. İntra-op
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec6')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              6. Post-op
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('sec7')}
              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap cursor-pointer transition-colors"
            >
              7. Kaynaklar
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={expandAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 cursor-pointer transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Tümünü Genişlet</span>
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Tümünü Daralt</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          AŞAĞI DOĞRU AKAN SIRALI TÜM BÖLÜMLER (1, 2, 3, 4, 5 ve KAYNAKLAR)
         ========================================================================= */}

      {/* BÖLÜM 1: PROSEDÜR İSMİ - TANIMI - ENDİKASYONLARI - TAHMİNİ SÜRE */}
      <section id="sec1" className="scroll-mt-6">
        <div className={`rounded-xl border transition-colors overflow-hidden ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('sec1')}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center text-xs font-mono font-bold">
                1
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
                </h2>
                <p className="text-[11px] text-slate-400">Cerrahi operasyon özeti ve temel endikasyon listesi</p>
              </div>
            </div>
            {sectionOpen.sec1 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {sectionOpen.sec1 && (
            <div className="p-4 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800/70 mt-1">
              <div className={`p-4 rounded-lg text-xs leading-relaxed ${
                isDark ? 'bg-slate-950/60 text-slate-300 border border-slate-800/80' : 'bg-slate-50 text-slate-700 border border-slate-200'
              }`}>
                <strong className="text-teal-600 dark:text-teal-400 block mb-1">Cerrahi Prosedür Tanımı:</strong>
                {procedure.description}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Temel Cerrahi Endikasyonlar:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {procedure.indications.map((ind, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs ${
                        isDark 
                          ? 'bg-slate-950/40 border-slate-800/70 text-slate-300' 
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-3.5 rounded-lg border flex items-center justify-between text-xs ${
                isDark ? 'bg-amber-500/10 border-amber-500/25 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <strong>Tahmini Ortalama Cerrahi Süresi:</strong>
                </div>
                <span className="font-mono font-bold text-xs sm:text-sm">{procedure.averageDuration}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BÖLÜM 2: BEKLENEN KANAMA VE TRANSFÜZYON PROFİLİ */}
      {procedure.bleedingProfile && (
        <section id="sec2" className="scroll-mt-6">
          <div className={`rounded-xl border transition-colors overflow-hidden ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <button
              type="button"
              onClick={() => toggleSection('sec2')}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-rose-500/15 text-rose-500 flex items-center justify-center text-xs font-mono font-bold">
                  2
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-rose-500 inline-block" />
                      <span>2) Beklenen Kanama ve Transfüzyon Profili</span>
                    </h2>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      procedure.bleedingProfile.riskLevel === 'minimal'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                        : procedure.bleedingProfile.riskLevel === 'low'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                        : procedure.bleedingProfile.riskLevel === 'moderate'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    }`}>
                      {procedure.bleedingProfile.riskLevelLabel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Tahmini ortalama kan kaybı, kan ürünü & Cross-Match hazırlığı ve hemostaz yönetimi</p>
                </div>
              </div>
              {sectionOpen.sec2 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {sectionOpen.sec2 && (
              <div className="p-4 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800/70 mt-1">
                {/* 4 Temel Metrik Kartı */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Tahmini Kan Kaybı (EBL) */}
                  <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-rose-50/50 border-rose-200/70'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tahmini Ortalama Kan Kaybı</span>
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 mt-1">{procedure.bleedingProfile.estimatedBloodLoss}</span>
                  </div>

                  {/* Kanama Risk Sınıfı */}
                  <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kanama Risk Derecesi</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{procedure.bleedingProfile.riskLevelLabel}</span>
                  </div>

                  {/* Cross-Match / Hazırlık */}
                  <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kan Ürünü & Cross-Match</span>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">{procedure.bleedingProfile.crossMatchRequirement}</span>
                  </div>

                  {/* Transfüzyon Olasılığı */}
                  <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Transfüzyon İhtimali</span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">{procedure.bleedingProfile.transfusionProbability}</span>
                  </div>
                </div>

                {/* Kritik Kanama Odakları */}
                {procedure.bleedingProfile.criticalBleedingSources && procedure.bleedingProfile.criticalBleedingSources.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                      Potansiyel Majör Kanama Odakları & Vasküler Risk Noktaları:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {procedure.bleedingProfile.criticalBleedingSources.map((source, sIdx) => (
                        <div
                          key={sIdx}
                          className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                            isDark ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                          <span>{source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hemostaz ve Kan Koruma Stratejileri */}
                {procedure.bleedingProfile.hemostasisStrategies && procedure.bleedingProfile.hemostasisStrategies.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-teal-500" />
                      Hemostaz ve Hasta Kan Yönetimi (PBM) Stratejileri:
                    </span>
                    <div className="space-y-1.5">
                      {procedure.bleedingProfile.hemostasisStrategies.map((strat, stIdx) => (
                        <div
                          key={stIdx}
                          className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                            isDark ? 'bg-teal-500/5 border-teal-500/20 text-slate-300' : 'bg-teal-50/50 border-teal-200 text-slate-700'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                          <span>{strat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* BÖLÜM 3: OLASI ANESTEZİ YÖNETİMİ TEKNİKLERİ */}
      <section id="sec3" className="scroll-mt-6">
        <div className={`rounded-xl border transition-colors overflow-hidden ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('sec3')}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center text-xs font-mono font-bold">
                3
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  3) Olası Anestezi Yönetimi Teknikleri
                </h2>
                <p className="text-[11px] text-slate-400">Birincil altın standart ve seçilmiş alternatif yaklaşımlar</p>
              </div>
            </div>
            {sectionOpen.sec3 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {sectionOpen.sec3 && (
            <div className="p-4 pt-0 space-y-4 border-t border-slate-100 dark:border-slate-800/70 mt-1">
              {/* Birincil Teknikler */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Birincil / Altın Standart Teknikler</span>
                </div>
                <div className="space-y-2">
                  {procedure.anesthesiaTechniques.primary.map((tech, idx) => (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-lg border text-xs font-semibold flex items-center gap-2.5 ${
                        isDark 
                          ? 'bg-teal-500/10 border-teal-500/30 text-teal-200' 
                          : 'bg-teal-50 border-teal-200 text-teal-900'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alternatif Teknikler */}
              {procedure.anesthesiaTechniques.alternative && procedure.anesthesiaTechniques.alternative.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Seçilmiş / Alternatif Teknikler</span>
                  </div>
                  <div className="space-y-2">
                    {procedure.anesthesiaTechniques.alternative.map((alt, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-lg border text-xs ${
                          isDark 
                            ? 'bg-slate-950/50 border-slate-800 text-slate-300' 
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {alt}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Anestezinin Vazgeçilmez Kuralları VEYA Standart Klinik / Hava Yolu Notları */}
              {parsedRules.hasRules ? (
                <div className={`p-4 sm:p-5 rounded-xl border transition-colors space-y-4 ${
                  isDark 
                    ? 'bg-amber-950/20 border-amber-500/30' 
                    : 'bg-amber-50/70 border-amber-200 shadow-xs'
                }`}>
                  {/* Başlık Alanı */}
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      isDark ? 'bg-amber-500/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                    }`}>
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-200">
                          Hayati Klinik İlkeler
                        </span>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {parsedRules.rules.length} Temel Kural
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 uppercase tracking-tight">
                        {parsedRules.headerTitle}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        Cerrahi başarıyı belirleyen, perioperatif mortalite ve majör morbiditeyi önleyen tavizsiz anestezi prensipleri:
                      </p>
                    </div>
                  </div>

                  {/* Numaralandırılmış Kural Kartları */}
                  <div className="space-y-2.5 pt-1">
                    {parsedRules.rules.map((rule) => (
                      <div
                        key={rule.number}
                        className={`p-3.5 rounded-lg border transition-all ${
                          isDark
                            ? 'bg-slate-900/90 border-slate-800/80 hover:border-amber-500/40 text-slate-200'
                            : 'bg-white border-amber-200/60 shadow-xs hover:border-amber-400 text-slate-800'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 ${
                            isDark 
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            0{rule.number}
                          </span>
                          <div className="flex-1 space-y-1 min-w-0">
                            <h5 className="text-xs font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-snug">
                              {rule.title}
                            </h5>
                            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                              {rule.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Eğer önceden girilmiş ek hava yolu gerekçesi varsa ayrıca göster */}
                  {parsedRules.airwayRationale && (
                    <div className={`p-3 rounded-lg border text-xs leading-relaxed ${
                      isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white/80 border-slate-200 text-slate-600'
                    }`}>
                      <strong className="block font-semibold mb-0.5 text-slate-700 dark:text-slate-300">Ek Hava Yolu & Klinik Not:</strong>
                      <p>{parsedRules.airwayRationale}</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Standart Klinik Tercih Gerekçesi ve Hava Yolu Kararı (Kurallar dizisi olmayan standart prosedürler için) */
                procedure.anesthesiaTechniques.notes && (
                  <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
                    isDark ? 'bg-blue-500/10 border-blue-500/25 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-900'
                  }`}>
                    <strong className="block font-bold">Klinik Tercih Gerekçesi ve Hava Yolu Kararı:</strong>
                    <p>{procedure.anesthesiaTechniques.notes}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </section>

      {/* BÖLÜM 4: PRE-OPERATİF HAZIRLIK (4a, 4b, 4c) */}
      <section id="sec4" className="scroll-mt-6">
        <div className={`rounded-xl border transition-colors overflow-hidden ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('sec4')}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center text-xs font-mono font-bold">
                4
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  4) Pre-operatif Hazırlık
                </h2>
                <p className="text-[11px] text-slate-400">4a Konsültasyonlar, 4b Anamnez/Fizik Muayene, 4c Kan ve Laboratuvar</p>
              </div>
            </div>
            {sectionOpen.sec4 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {sectionOpen.sec4 && (
            <div className="p-4 pt-0 space-y-3 border-t border-slate-100 dark:border-slate-800/70 mt-1">
              {/* 4a) Konsültasyonlar */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('4a')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-indigo-500">4a)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Spesifik Dikkat Edilmesi Gereken Konsültasyonlar
                    </span>
                  </div>
                  {subOpen['4a'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['4a'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.preoperative.consultations && procedure.preoperative.consultations.length > 0 ? (
                      procedure.preoperative.consultations.map((item, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                            isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Prosedüre özgü ek konsültasyon tanımlanmamıştır.</p>
                    )}
                  </div>
                )}
              </div>

              {/* 4b) Anamnez ve Fizik Muayene */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('4b')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-teal-500">4b)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Spesifik Anamnez ve Fizik Muayenede Dikkat Edilecekler
                    </span>
                  </div>
                  {subOpen['4b'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['4b'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.preoperative.historyAndPhysical && procedure.preoperative.historyAndPhysical.length > 0 ? (
                      procedure.preoperative.historyAndPhysical.map((item, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                            isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          <Stethoscope className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Genel anestezi preoperatif muayene ilkeleri geçerlidir.</p>
                    )}
                  </div>
                )}
              </div>

              {/* 4c) Kan ve Laboratuvar */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('4c')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-rose-500">4c)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Spesifik Kan ve Laboratuvar Sonuçlarında Dikkat Edilecekler
                    </span>
                  </div>
                  {subOpen['4c'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['4c'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.preoperative.laboratoryAndTests && procedure.preoperative.laboratoryAndTests.length > 0 ? (
                      procedure.preoperative.laboratoryAndTests.map((item, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                            isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          <Droplet className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Standart preoperatif tetkik paneli yeterlidir.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BÖLÜM 5: İNTRA-OPERATİF YÖNETİM (5a - 5g) */}
      <section id="sec5" className="scroll-mt-6">
        <div className={`rounded-xl border transition-colors overflow-hidden ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('sec5')}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center text-xs font-mono font-bold">
                5
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  5) İntra-operatif Yönetim
                </h2>
                <p className="text-[11px] text-slate-400">5a Monitörizasyon, 5b Vasküler, 5c Pozisyon, 5d Anestezi, 5e Havayolu, 5f Kritik Anlar, 5g Uyandırma</p>
              </div>
            </div>
            {sectionOpen.sec5 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {sectionOpen.sec5 && (
            <div className="p-4 pt-0 space-y-3 border-t border-slate-100 dark:border-slate-800/70 mt-1">
              {/* 5a) Monitörizasyon */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('5a')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-teal-500">5a)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Spesifik Monitörizasyon
                    </span>
                  </div>
                  {subOpen['5a'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['5a'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.intraoperative.monitoring.map((m, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                          isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <HeartPulse className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5b) Vasküler Erişimler */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('5b')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-cyan-500">5b)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Spesifik Gerekli Vasküler Erişimler
                    </span>
                  </div>
                  {subOpen['5b'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['5b'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.intraoperative.vascularAccess.map((v, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                          isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Droplet className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5c) Hasta Pozisyonu */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('5c')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-amber-500">5c)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Hasta Pozisyonu & Fizyolojik Güvenlik Önlemleri
                    </span>
                  </div>
                  {subOpen['5c'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['5c'] && (
                  <div className="p-3 pt-0 space-y-3 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    <div className={`p-3 rounded-lg text-xs font-bold ${
                      isDark ? 'bg-amber-500/15 text-amber-200 border border-amber-500/30' : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}>
                      {procedure.intraoperative.patientPosition}
                    </div>
                    {procedure.intraoperative.patientPositionDetails && (
                      <div className="space-y-1.5">
                        {procedure.intraoperative.patientPositionDetails.map((det, idx) => (
                          <div key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{det}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 5d) Prosedür Bazlı Anestezi Yönetimi */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('5d')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-500">5d)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Bazlı Anestezi Yönetimi (İndüksiyon, İdame, Nöromusküler Strateji)
                    </span>
                  </div>
                  {subOpen['5d'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['5d'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.intraoperative.anesthesiaManagement.map((am, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                          isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Stethoscope className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5e) Hava Yolu Yönetimi */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('5e')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-teal-500">5e)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Bazlı Hava Yolu Yönetimi
                    </span>
                  </div>
                  {subOpen['5e'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['5e'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.intraoperative.airwayManagement.map((aw, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                          isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Wind className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                        <span>{aw}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5f) Kritik Karar Noktaları ve Cerrahi Aşamalar */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('5f')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-rose-500">5f)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Prosedür Spesifik Dikkat Edilmesi Gereken Kritik Karar Noktaları ve Cerrahi Aşamaları
                    </span>
                  </div>
                  {subOpen['5f'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['5f'] && (
                  <div className="p-3 pt-0 space-y-2.5 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.intraoperative.criticalSurgicalStages.map((cs, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 rounded-lg border text-xs leading-relaxed flex items-start gap-3 ${
                          isDark 
                            ? 'bg-rose-950/20 border-rose-900/40 text-rose-200' 
                            : 'bg-rose-50/80 border-rose-200 text-rose-900'
                        }`}
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{cs}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 5g) Uyandırmada Dikkat Edilecekler */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('5g')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-emerald-500">5g)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Uyandırmada (Emergence) Dikkat Edilmesi Gerekenler
                    </span>
                  </div>
                  {subOpen['5g'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['5g'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.intraoperative.emergenceNotes.map((em, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                          isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{em}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* BÖLÜM 6: POST-OPERATİF YÖNETİM (6a, 6b, 6c) */}
      <section id="sec6" className="scroll-mt-6">
        <div className={`rounded-xl border transition-colors overflow-hidden ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('sec6')}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center text-xs font-mono font-bold">
                6
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
                </h2>
                <p className="text-[11px] text-slate-400">6a Ağrı Yönetimi, 6b PROSPECT Rehber Önerileri, 6c ERAS Rehberi Önerileri</p>
              </div>
            </div>
            {sectionOpen.sec6 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {sectionOpen.sec6 && (
            <div className="p-4 pt-0 space-y-3 border-t border-slate-100 dark:border-slate-800/70 mt-1">
              {/* 6a) Ağrı Yönetimi */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('6a')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-indigo-500">6a)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Ağrı Yönetimi & Multimodal Analjezi Stratejisi
                    </span>
                  </div>
                  {subOpen['6a'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['6a'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.postoperative.painManagement.map((pm, idx) => (
                      <div 
                        key={idx}
                        className={`p-3 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                          isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Layers className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{pm}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6b) PROSPECT Rehber Önerileri */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('6b')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-teal-500">6b)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Varsa PROSPECT Rehber Önerileri
                    </span>
                  </div>
                  {subOpen['6b'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['6b'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.postoperative.prospectRecommendations && procedure.postoperative.prospectRecommendations.length > 0 ? (
                      procedure.postoperative.prospectRecommendations.map((pr, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-lg text-xs leading-relaxed ${
                            idx === 0
                              ? isDark ? 'font-bold text-teal-300' : 'font-bold text-teal-900'
                              : isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {pr}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Bu prosedür için yayınlanmış spesifik PROSPECT kılavuzu bulunmamaktadır.</p>
                    )}
                  </div>
                )}
              </div>

              {/* 6c) ERAS Rehberi Önerileri */}
              <div className={`rounded-lg border overflow-hidden ${
                isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => toggleSub('6c')}
                  className="w-full p-3 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-blue-500">6c)</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Varsa ERAS Rehberi Önerileri
                    </span>
                  </div>
                  {subOpen['6c'] ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {subOpen['6c'] && (
                  <div className="p-3 pt-0 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60 mt-1">
                    {procedure.postoperative.erasRecommendations && procedure.postoperative.erasRecommendations.length > 0 ? (
                      procedure.postoperative.erasRecommendations.map((er, idx) => (
                        <div 
                          key={idx}
                          className={`p-3 rounded-lg text-xs leading-relaxed ${
                            idx === 0
                              ? isDark ? 'font-bold text-blue-300' : 'font-bold text-blue-900'
                              : isDark ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {er}
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 italic">Bu prosedür için yayınlanmış spesifik ERAS protokolü bulunmamaktadır.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          BÖLÜM 7: KULLANILAN KAYNAKLAR VE LİTERATÜR REFERANSLARI
         ========================================================================= */}
      <section id="sec7" className="scroll-mt-6">
        <div className={`rounded-xl border transition-colors overflow-hidden ${
          isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-2xs'
        }`}>
          <button
            type="button"
            onClick={() => toggleSection('sec7')}
            className="w-full p-4 flex items-center justify-between text-left cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center text-xs font-mono font-bold">
                7
              </span>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                  7) Kullanılan Kaynaklar ve Literatür Referansları
                </h2>
                <p className="text-[11px] text-slate-400">Öncelikli rehberler (Jaffe 5th ed, ERAS, PROSPECT) ve ek kaynaklar</p>
              </div>
            </div>
            {sectionOpen.sec7 ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>

          {sectionOpen.sec7 && (
            <div className="p-4 pt-0 space-y-3 border-t border-slate-200 dark:border-slate-800/80 mt-1 text-xs">
              <div className="space-y-2">
                {procedure.references.jaffeReference && (
                  <div className={`p-3 rounded-lg border leading-relaxed ${
                    isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <strong className="text-teal-600 dark:text-teal-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      7a) Birincil Kaynak (Jaffe Manual):
                    </strong>
                    <span>{procedure.references.jaffeReference}</span>
                  </div>
                )}

                {procedure.references.erasReference && (
                  <div className={`p-3 rounded-lg border leading-relaxed ${
                    isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <strong className="text-blue-600 dark:text-blue-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      7b) Varsa ERAS Protokol Önerileri:
                    </strong>
                    <span>{procedure.references.erasReference}</span>
                  </div>
                )}

                {procedure.references.prospectReference && (
                  <div className={`p-3 rounded-lg border leading-relaxed ${
                    isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <strong className="text-teal-600 dark:text-teal-400 block text-[11px] uppercase tracking-wider mb-0.5">
                      7c) Varsa PROSPECT Rehber Önerileri:
                    </strong>
                    <span>{procedure.references.prospectReference}</span>
                  </div>
                )}

                {procedure.references.otherReferences && procedure.references.otherReferences.length > 0 && (
                  <div className={`p-3 rounded-lg border leading-relaxed ${
                    isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-800'
                  }`}>
                    <strong className="text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider mb-1">
                      7d) Diğer Kullanılan Kaynaklar:
                    </strong>
                    <ul className="space-y-1 list-disc list-inside">
                      {procedure.references.otherReferences.map((ref, idx) => (
                        <li key={idx} className="text-[11px]">{ref}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
