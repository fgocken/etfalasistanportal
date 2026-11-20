import React, { useState } from 'react';
import { BookOpen, List } from 'lucide-react';
import {
  RESPIRATORY_TEXTBOOK_CHAPTERS,
  RESPIRATORY_TEXTBOOK_REFERENCES,
} from './respiratory/respiratoryTextbookChapters';
import { MedicalText } from './respiratory/MedicalText';
import { RespiratoryTextbookDiagram } from './respiratory/RespiratoryTextbookDiagrams';

interface RespiratoryPhysiologyWorkspaceProps {
  isDark: boolean;
}

export const RespiratoryPhysiologyWorkspace: React.FC<RespiratoryPhysiologyWorkspaceProps> = ({
  isDark,
}) => {
  const [activeChapterId, setActiveChapterId] = useState<string>(
    RESPIRATORY_TEXTBOOK_CHAPTERS[0].id
  );

  const scrollToSection = (id: string) => {
    setActiveChapterId(id);
    const el = document.getElementById(`resp-ch-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Clean Editorial Monograph Header */}
      <header
        className={`rounded-2xl border p-6 sm:p-8 ${
          isDark ? 'bg-slate-900/75 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold text-sky-500">
          <span>Temel Bilgiler</span>
          <span aria-hidden="true">·</span>
          <span>Sistematik Ders Özeti</span>
          <span aria-hidden="true">·</span>
          <span>8 Bölüm · 5 Şematik Görsel</span>
        </div>
        <h1
          className={`text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Solunum Fizyolojisi
        </h1>
        <p
          className={`text-sm sm:text-base mt-2.5 max-w-3xl leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          Anesteziyoloji ve Reanimasyon uzmanlık müfredatı temel kaynaklarından (
          <em>West&apos;s, Nunn&apos;s, Miller&apos;s, Morgan &amp; Mikhail, Levitzky</em>) derlenmiş; fonksiyonel anatomiden solunum mekaniğine, gaz değişiminden solunum kontrolüne ve perioperatif senteze uzanan bütüncül düz okuma metni ve temel şemalar.
        </p>

        {/* Compact Horizontal Table of Contents (Mobile & Tablet) */}
        <div
          className={`mt-5 pt-4 border-t xl:hidden ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
            <List className="w-3.5 h-3.5" />
            <span>Bölümler</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {RESPIRATORY_TEXTBOOK_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToSection(ch.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  activeChapterId === ch.id
                    ? 'bg-sky-600 border-sky-500 text-white'
                    : isDark
                      ? 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300'
                }`}
              >
                {ch.number}: <MedicalText text={ch.title.split(':')[0].split(',')[0]} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('kaynakca')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                activeChapterId === 'kaynakca'
                  ? 'bg-sky-600 border-sky-500 text-white'
                  : isDark
                    ? 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-600'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-sky-300'
              }`}
            >
              Kaynakça
            </button>
          </div>
        </div>
      </header>

      {/* Main Plain-Reading Layout with Sticky TOC on Desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Sticky Chapter Navigation (Desktop) */}
        <aside className="hidden xl:block xl:col-span-3 sticky top-20">
          <nav
            aria-label="Solunum Fizyolojisi İçindekiler"
            className={`rounded-2xl border p-4 space-y-1.5 ${
              isDark ? 'bg-slate-900/75 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2 px-2 pb-2 mb-1 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
              <BookOpen className="w-3.5 h-3.5 text-sky-500" />
              <span>İçindekiler</span>
            </div>
            {RESPIRATORY_TEXTBOOK_CHAPTERS.map((ch) => {
              const active = activeChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToSection(ch.id)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs leading-snug transition-colors cursor-pointer ${
                    active
                      ? isDark
                        ? 'bg-sky-950/60 text-sky-300 font-bold'
                        : 'bg-sky-50 text-sky-800 font-bold'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-800/70'
                        : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-mono text-[11px] text-sky-500">{ch.number}</div>
                  <div className="mt-0.5">
                    <MedicalText text={ch.title} />
                  </div>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => scrollToSection('kaynakca')}
              className={`w-full text-left px-2.5 py-2 rounded-lg text-xs leading-snug transition-colors cursor-pointer ${
                activeChapterId === 'kaynakca'
                  ? isDark
                    ? 'bg-sky-950/60 text-sky-300 font-bold'
                    : 'bg-sky-50 text-sky-800 font-bold'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800/70'
                    : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="font-mono text-[11px] text-sky-500">Referanslar</div>
              <div className="mt-0.5">Temel Kaynakça</div>
            </button>
          </nav>
        </aside>

        {/* Continuous Plain Reading Article */}
        <article
          className={`xl:col-span-9 rounded-2xl border p-6 sm:p-9 lg:p-10 space-y-12 ${
            isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          {RESPIRATORY_TEXTBOOK_CHAPTERS.map((chapter, chIdx) => (
            <section
              key={chapter.id}
              id={`resp-ch-${chapter.id}`}
              className={`scroll-mt-24 space-y-7 ${
                chIdx > 0
                  ? isDark
                    ? 'pt-10 border-t border-slate-800'
                    : 'pt-10 border-t border-slate-200'
                  : ''
              }`}
            >
              {/* Chapter Header */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-sky-500">
                    {chapter.number}
                  </span>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                    {chapter.sources}
                  </span>
                </div>
                <h2
                  className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-snug ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  <MedicalText text={chapter.title} />
                </h2>
                <p
                  className={`text-sm sm:text-[15px] leading-relaxed ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  <MedicalText text={chapter.summary} />
                </p>
              </div>

              {/* Subsections */}
              <div className="space-y-8">
                {chapter.subsections.map((sub) => (
                  <div key={sub.heading} className="space-y-4">
                    <h3
                      className={`text-lg font-bold tracking-tight ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      <MedicalText text={sub.heading} />
                    </h3>

                    <div className="space-y-3.5 max-w-[74ch]">
                      {sub.paragraphs.map((p, idx) => (
                        <p
                          key={idx}
                          className={`text-[15px] sm:text-base leading-[1.82] ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          <MedicalText text={p} />
                        </p>
                      ))}
                    </div>

                    {sub.formulas && sub.formulas.length > 0 && (
                      <div className="space-y-2.5 pt-1">
                        {sub.formulas.map((f, idx) => (
                          <div
                            key={idx}
                            className={`rounded-xl border px-4 py-3.5 ${
                              isDark
                                ? 'bg-slate-950 border-slate-800'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div
                              className={`font-sans text-sm sm:text-[15.5px] font-semibold tracking-wide leading-relaxed ${
                                isDark ? 'text-sky-300' : 'text-slate-900'
                              }`}
                            >
                              <MedicalText text={f.expression} />
                            </div>
                            <div
                              className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}
                            >
                              <MedicalText text={f.caption} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {sub.diagramId && (
                      <div className="pt-1">
                        <RespiratoryTextbookDiagram id={sub.diagramId} isDark={isDark} />
                      </div>
                    )}

                    {sub.bullets && sub.bullets.length > 0 && (
                      <ul className="space-y-2.5 max-w-[74ch] pt-1">
                        {sub.bullets.map((b) => (
                          <li
                            key={b.label}
                            className={`text-[15px] sm:text-base leading-[1.78] pl-4 relative ${
                              isDark ? 'text-slate-200' : 'text-slate-700'
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className="absolute left-0 top-[11px] w-1.5 h-1.5 rounded-full bg-sky-500"
                            />
                            <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                              <MedicalText text={b.label} />:
                            </strong>{' '}
                            <MedicalText text={b.text} />
                          </li>
                        ))}
                      </ul>
                    )}

                    {sub.table && (
                      <div className="space-y-2 pt-1">
                        <div
                          className={`text-xs font-bold uppercase tracking-wide ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          <MedicalText text={sub.table.title} />
                        </div>
                        <div
                          className={`overflow-x-auto rounded-xl border ${
                            isDark ? 'border-slate-800' : 'border-slate-200'
                          }`}
                        >
                          <table className="w-full text-xs sm:text-sm border-collapse">
                            <thead>
                              <tr
                                className={
                                  isDark
                                    ? 'bg-slate-950 text-slate-200 border-b border-slate-800'
                                    : 'bg-slate-100 text-slate-900 border-b border-slate-200'
                                }
                              >
                                {sub.table.headers.map((h) => (
                                  <th key={h} className="text-left p-3 font-semibold whitespace-nowrap">
                                    <MedicalText text={h} />
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                              {sub.table.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className={
                                    isDark
                                      ? 'bg-slate-900/50 hover:bg-slate-800/50'
                                      : 'bg-white hover:bg-slate-50/80'
                                  }
                                >
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className={`p-3 align-top leading-relaxed ${
                                        cIdx === 0
                                          ? isDark
                                            ? 'font-semibold text-white'
                                            : 'font-semibold text-slate-900'
                                          : isDark
                                            ? 'text-slate-300'
                                            : 'text-slate-700'
                                      }`}
                                    >
                                      <MedicalText text={cell} />
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {sub.clinicalNote && (
                      <div
                        className={`rounded-xl border p-4 sm:p-5 max-w-[74ch] ${
                          isDark
                            ? 'bg-sky-950/25 border-sky-500/30 text-slate-200'
                            : 'bg-sky-50/70 border-sky-200 text-slate-800'
                        }`}
                      >
                        <div
                          className={`text-xs font-bold uppercase tracking-wide mb-1 ${
                            isDark ? 'text-sky-300' : 'text-sky-800'
                          }`}
                        >
                          Klinik &amp; Anestezi Notu — <MedicalText text={sub.clinicalNote.title} />
                        </div>
                        <p className="text-sm sm:text-[15px] leading-[1.78]">
                          <MedicalText text={sub.clinicalNote.text} />
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* References Section */}
          <section
            id="resp-ch-kaynakca"
            className={`scroll-mt-24 pt-10 border-t space-y-4 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-500">
                Referanslar
              </div>
              <h2
                className={`text-xl font-extrabold mt-1 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Temel Kaynakça
              </h2>
            </div>
            <ol className="space-y-2.5 max-w-[74ch]">
              {RESPIRATORY_TEXTBOOK_REFERENCES.map((ref, idx) => (
                <li
                  key={ref.title}
                  className={`text-sm leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  <span className="font-mono text-xs text-slate-400 mr-2">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <strong className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                    {ref.authors}
                  </strong>{' '}
                  <em>{ref.title}</em> {ref.detail}
                </li>
              ))}
            </ol>
          </section>
        </article>
      </div>
    </div>
  );
};

export default RespiratoryPhysiologyWorkspace;
