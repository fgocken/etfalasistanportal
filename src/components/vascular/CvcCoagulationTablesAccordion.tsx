import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Droplets, ExternalLink, FileSpreadsheet } from 'lucide-react';

interface CvcCoagulationTablesAccordionProps {
  isDark: boolean;
}

interface TableRowItem {
  lineType: string;
  labResults: string;
  coagRecommendation: string;
  plateletRecommendation: string;
  highlightIntervention?: boolean;
}

const TABLE_5_INSERTION: TableRowItem[] = [
  {
    lineType: 'Komplike Olmayan PICC ve Komplike Olmayan Tünelsiz SVK (CVAD)',
    labResults: 'PT < 18 sn · INR < 1.5 · APTT < 42 sn · APTTr < 1.5',
    coagRecommendation: 'İşlem öncesi normalde tedavi gerekmez',
    plateletRecommendation: 'Özel bir trombosit sayısı eşiği gerekmez',
  },
  {
    lineType: 'Komplike Olmayan PICC ve Komplike Olmayan Tünelsiz SVK (CVAD)',
    labResults: 'PT ≥ 18 sn · INR ≥ 1.5 · APTT ≥ 42 sn · APTTr ≥ 1.5',
    coagRecommendation: 'İşlem öncesi normalde tedavi gerekmez',
    plateletRecommendation: 'Özel bir trombosit sayısı eşiği gerekmez',
  },
  {
    lineType: 'PICC, Tünelsiz SVK (CVAD) — Komplike Hastalar*',
    labResults: 'PT ≥ 18 sn · INR ≥ 1.5 · APTT ≥ 42 sn · APTTr ≥ 1.5',
    coagRecommendation:
      'Koagülopatinin düzeltilmesi düşünülmelidir (Seçenekler: TDP/FFP [genellikle 10–15 mL/kg]; K vitamini; protrombin kompleks konsantresi [PCC]; spesifik pıhtılaşma faktörleri)',
    plateletRecommendation: '≥ 30 × 10⁹/L (≥ 30.000/µL)',
    highlightIntervention: true,
  },
  {
    lineType: 'Tünelli Kateter (Hickman, Port-a-Cath vb.)',
    labResults: 'PT < 18 sn · INR < 1.5 · APTT < 42 sn · APTTr < 1.5',
    coagRecommendation: 'İşlem öncesi normalde tedavi gerekmez',
    plateletRecommendation: '≥ 30 × 10⁹/L (≥ 30.000/µL)',
  },
  {
    lineType: 'Tünelli Kateter (Hickman, Port-a-Cath vb.)',
    labResults: 'PT ≥ 18 sn · INR ≥ 1.5 · APTT ≥ 42 sn · APTTr ≥ 1.5',
    coagRecommendation:
      'Koagülopatinin düzeltilmesi düşünülmelidir (Seçenekler: TDP/FFP [genellikle 10–15 mL/kg]; K vitamini; protrombin kompleks konsantresi [PCC]; spesifik pıhtılaşma faktörleri)',
    plateletRecommendation: '≥ 30 × 10⁹/L (≥ 30.000/µL)',
    highlightIntervention: true,
  },
];

const TABLE_6_REMOVAL: TableRowItem[] = [
  {
    lineType: 'PICC, Tünelsiz SVK (CVAD), Tünelli SVK (CVAD)',
    labResults: 'PT < 18 sn · INR < 1.5 · APTT < 42 sn · APTTr < 1.5',
    coagRecommendation: 'Çıkarma öncesi normalde tedavi gerekmez',
    plateletRecommendation: '≥ 10 × 10⁹/L (≥ 10.000/µL)',
  },
  {
    lineType: 'PICC, Tünelsiz SVK (CVAD) ≤ 8.5 Fr',
    labResults: 'PT ≥ 18 sn · INR ≥ 1.5 · APTT ≥ 42 sn · APTTr ≥ 1.5',
    coagRecommendation: 'Çıkarma öncesi normalde tedavi gerekmez',
    plateletRecommendation: '≥ 10 × 10⁹/L (≥ 10.000/µL)',
  },
  {
    lineType: 'Tünelsiz SVK (CVAD) > 8.5 Fr, Tünelli Kateter (Hickman, Port-a-Cath vb.)',
    labResults: 'PT ≥ 18 sn · INR ≥ 1.5 · APTT ≥ 42 sn · APTTr ≥ 1.5',
    coagRecommendation:
      'Koagülopatinin düzeltilmesi düşünülmelidir (Seçenekler: TDP/FFP [genellikle 10–15 mL/kg]; K vitamini; protrombin kompleks konsantresi [PCC]; spesifik pıhtılaşma faktörleri)',
    plateletRecommendation: '≥ 30 × 10⁹/L (≥ 30.000/µL)',
    highlightIntervention: true,
  },
];

export const CvcCoagulationTablesAccordion: React.FC<CvcCoagulationTablesAccordionProps> = ({ isDark }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section
      className={`rounded-xl border transition-colors overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={`w-full p-5 sm:px-6 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer ${
          isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50/90'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isDark ? 'bg-rose-500/15 text-rose-400' : 'bg-rose-50 text-rose-700'}`}>
            <Droplets className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Johnston et al. 2025 · Tablo 5 &amp; Tablo 6
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                PMID: 40958714 · PMCID: PMC12519924
              </span>
            </div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SVK Takma ve Çıkarma İşlemlerinde Koagülasyon &amp; Trombosit Eşikleri (Gizle / Göster)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Association of Anaesthetists 2025 Kılavuzu: Tünelsiz/Tünelli CVAD &amp; PICC yerleştirme (Tablo 5) ve çıkarma (Tablo 6) eşik değerleri
            </p>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold shrink-0 ${
            isDark
              ? 'bg-slate-950 border-slate-700 text-slate-200'
              : 'bg-slate-100 border-slate-200 text-slate-700'
          }`}
        >
          <span>{isOpen ? 'Gizle' : 'Tabloları Göster'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-6">
          {/* TABLO 5: YERLEŞTİRME (INSERTION) */}
          <div className="space-y-2.5 pt-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-sky-500 shrink-0" />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Tablo 5: Santral Venöz Erişim Cihazlarının (CVAD) Yerleştirilmesi İçin Koagülasyon ve Trombosit Önerileri
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Midline &amp; uzun periferik kanüller PICC gibi yönetilir
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs border-collapse min-w-[780px]">
                <thead>
                  <tr className={isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Kateter / Girişim Tipi</th>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Laboratuvar Sonuçları</th>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Koagülasyon Önerisi</th>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Trombosit Sayısı Önerisi</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                  {TABLE_5_INSERTION.map((row, idx) => (
                    <tr
                      key={`t5-${idx}`}
                      className={
                        row.highlightIntervention
                          ? isDark
                            ? 'bg-amber-950/20'
                            : 'bg-amber-50/50'
                          : isDark
                            ? 'hover:bg-slate-800/30'
                            : 'hover:bg-slate-50'
                      }
                    >
                      <td className="p-3 align-top font-semibold text-slate-900 dark:text-slate-100">
                        {row.lineType}
                      </td>
                      <td className="p-3 align-top font-mono text-[11px] whitespace-nowrap">
                        {row.labResults}
                      </td>
                      <td className={`p-3 align-top leading-relaxed ${row.highlightIntervention ? 'font-semibold text-amber-700 dark:text-amber-300' : ''}`}>
                        {row.coagRecommendation}
                      </td>
                      <td className="p-3 align-top font-mono font-bold whitespace-nowrap text-sky-700 dark:text-sky-300">
                        {row.plateletRecommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              *Komplike hastalar: Zor anatomi, çoklu kateter/ponksiyon gereksinimi, obezite vb. durumları kapsar.
            </p>
          </div>

          {/* TABLO 6: ÇIKARMA (REMOVAL) */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-rose-500 shrink-0" />
                <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Tablo 6: Santral Venöz Erişim Cihazlarının (CVAD) Çıkarılması İçin Koagülasyon ve Trombosit Önerileri
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Midline &amp; uzun periferik kanüller PICC gibi yönetilir
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs border-collapse min-w-[780px]">
                <thead>
                  <tr className={isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Çıkarılan Kateter Tipi</th>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Laboratuvar Sonuçları</th>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Koagülasyon Önerisi</th>
                    <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Trombosit Sayısı Önerisi</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                  {TABLE_6_REMOVAL.map((row, idx) => (
                    <tr
                      key={`t6-${idx}`}
                      className={
                        row.highlightIntervention
                          ? isDark
                            ? 'bg-amber-950/20'
                            : 'bg-amber-50/50'
                          : isDark
                            ? 'hover:bg-slate-800/30'
                            : 'hover:bg-slate-50'
                      }
                    >
                      <td className="p-3 align-top font-semibold text-slate-900 dark:text-slate-100">
                        {row.lineType}
                      </td>
                      <td className="p-3 align-top font-mono text-[11px] whitespace-nowrap">
                        {row.labResults}
                      </td>
                      <td className={`p-3 align-top leading-relaxed ${row.highlightIntervention ? 'font-semibold text-amber-700 dark:text-amber-300' : ''}`}>
                        {row.coagRecommendation}
                      </td>
                      <td className="p-3 align-top font-mono font-bold whitespace-nowrap text-rose-700 dark:text-rose-300">
                        {row.plateletRecommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kısaltmalar ve Tam Kaynak Bilgisi */}
          <div
            className={`p-3.5 rounded-xl border text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
              isDark ? 'bg-slate-950/70 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <div className="leading-relaxed">
              <strong>Kısaltmalar:</strong> PICC, Periferik Yerleştirilen Santral Kateter; CVAD, Santral Venöz Erişim Cihazı; PT, Protrombin Zamanı; INR, Uluslararası Normalize Oran; APTT, Aktive Parsiyel Tromboplastin Zamanı; APTTr, APTT Oranı; TDP (FFP), Taze Donmuş Plazma.
              <br />
              <strong>Kaynak:</strong> Johnston AJ et al. <em>Association of Anaesthetists guidelines: safe vascular access 2025.</em> Anaesthesia. 2025 Nov;80(11):1381–1396.
            </div>
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC12519924/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300 font-mono font-semibold shrink-0 hover:bg-sky-500/20"
            >
              <span>PMC12519924</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
};
