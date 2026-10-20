import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Filter,
  Info
} from 'lucide-react';
import { LAB_PARAMETERS } from '../../data/clinicalData';
import { LabParameter } from '../../types/clinical';

export const LabsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'reference' | 'abg_analyzer'>('reference');
  const [tubeFilter, setTubeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLab, setSelectedLab] = useState<LabParameter | null>(LAB_PARAMETERS[0]);

  // ABG Interpreter inputs
  const [abgPh, setAbgPh] = useState<number>(7.28);
  const [abgPco2, setAbgPco2] = useState<number>(30);
  const [abgHco3, setAbgHco3] = useState<number>(14);

  // Interpretation logic
  const interpretABG = (ph: number, pco2: number, hco3: number) => {
    let acidBaseState = '';
    let primaryDisorder = '';
    let compensationState = '';
    let winterNote = '';

    // 1. pH evaluation
    if (ph < 7.35) {
      acidBaseState = 'Asidemi (pH < 7.35)';
    } else if (ph > 7.45) {
      acidBaseState = 'Alkalemi (pH > 7.45)';
    } else {
      acidBaseState = 'Normal pH (7.35 - 7.45)';
    }

    // 2. Primary disorder
    if (ph < 7.35) {
      if (hco3 < 22 && pco2 <= 45) {
        primaryDisorder = 'Metabolik Asidoz';
        // Winter's formula: Expected pCO2 = (1.5 * HCO3) + 8 (+/- 2)
        const expectedPco2 = Math.round(1.5 * hco3 + 8);
        const minPco2 = expectedPco2 - 2;
        const maxPco2 = expectedPco2 + 2;
        if (pco2 >= minPco2 && pco2 <= maxPco2) {
          compensationState = `Uygun Solunumsal Kompanzasyon (Winter beklenen pCO2: ${minPco2}-${maxPco2} mmHg)`;
        } else if (pco2 > maxPco2) {
          compensationState = `Eşlik Eden Solunumsal Asidoz (pCO2 beklenenden yüksek, hasta hipoventile)`;
        } else {
          compensationState = `Eşlik Eden Solunumsal Alkaloz (pCO2 beklenenden düşük)`;
        }
        winterNote = `Winter Formülü: Beklenen pCO2 = (1.5 × ${hco3}) + 8 ± 2 = ${expectedPco2} ± 2 (${minPco2} - ${maxPco2} mmHg).`;
      } else if (pco2 > 45 && hco3 >= 22) {
        primaryDisorder = 'Solunumsal Asidoz (Hipoventilasyon)';
        if (hco3 > 26) {
          compensationState = 'Kısmi Renal Kompanzasyon (Bikarbonat artışı mevcut)';
        } else {
          compensationState = 'Akut / Henüz Renal Kompanzasyon Gelişmemiş';
        }
      } else {
        primaryDisorder = 'Miks Asidoz (Hem metabolik hem solunumsal asidoz)';
      }
    } else if (ph > 7.45) {
      if (hco3 > 26 && pco2 >= 35) {
        primaryDisorder = 'Metabolik Alkaloz';
        if (pco2 > 45) {
          compensationState = 'Kısmi Solunumsal Kompanzasyon (Hipoventilasyon ile pCO2 yükselmiş)';
        } else {
          compensationState = 'Kompanze Değil';
        }
      } else if (pco2 < 35 && hco3 <= 26) {
        primaryDisorder = 'Solunumsal Alkaloz (Hiperventilasyon)';
        if (hco3 < 22) {
          compensationState = 'Kısmi Renal Kompanzasyon (Bikarbonat itrahı artmış)';
        } else {
          compensationState = 'Akut / Kompanze Değil';
        }
      } else {
        primaryDisorder = 'Miks Alkaloz (Hem metabolik hem solunumsal alkaloz)';
      }
    } else {
      // Normal pH
      if (pco2 > 45 && hco3 > 26) {
        primaryDisorder = 'Tam Kompanze Solunumsal Asidoz veya Tam Kompanze Metabolik Alkaloz';
        compensationState = 'Tam Kompanzasyon veya Miks Bozukluk';
      } else if (pco2 < 35 && hco3 < 22) {
        primaryDisorder = 'Tam Kompanze Solunumsal Alkaloz veya Tam Kompanze Metabolik Asidoz';
        compensationState = 'Tam Kompanzasyon veya Miks Bozukluk';
      } else {
        primaryDisorder = 'Normal Asit-Baz Dengesi';
        compensationState = 'Herhangi bir asit-baz bozukluğu saptanmadı.';
      }
    }

    return { acidBaseState, primaryDisorder, compensationState, winterNote };
  };

  const abgResult = interpretABG(abgPh, abgPco2, abgHco3);

  const filteredLabs = LAB_PARAMETERS.filter(lab => {
    const matchesTube = tubeFilter === 'all' || lab.tube === tubeFilter;
    const matchesSearch = 
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.nameTr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.clinicalSignificance.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTube && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Laboratuvar Değerleri & Kan Gazı Analizi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Klinik tüp renklerine göre referans değerler, patolojik nedenler ve otomatik asit-baz yorumlayıcı
          </p>
        </div>
      </div>

      {/* Segmented Controls */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveTab('reference')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'reference'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Laboratuvar Referans Kılavuzu</span>
        </button>

        <button
          onClick={() => setActiveTab('abg_analyzer')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            activeTab === 'abg_analyzer'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Arteriyel Kan Gazı (AKG) Yorumlayıcı</span>
        </button>
      </div>

      {/* 1. Laboratory Reference Guide */}
      {activeTab === 'reference' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'Tüm Tüpler' },
                { id: 'purple', label: 'Mor Kapak (EDTA)' },
                { id: 'yellow', label: 'Sarı Kapak (Biyokimya)' },
                { id: 'blue', label: 'Mavi Kapak (Koagülasyon)' },
                { id: 'green', label: 'Kan Gazı (Heparin)' },
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setTubeFilter(filter.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                    tubeFilter === filter.id
                      ? 'bg-teal-700 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Test adı veya neden ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              />
            </div>
          </div>

          {/* Grid Layout: Master list & Selected Lab Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Table / List column */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="divide-y divide-slate-100 max-h-[620px] overflow-y-auto">
                {filteredLabs.map(lab => (
                  <button
                    key={lab.id}
                    onClick={() => setSelectedLab(lab)}
                    className={`w-full text-left p-3.5 transition-colors flex items-start justify-between ${
                      selectedLab?.id === lab.id ? 'bg-teal-50/80 border-l-2 border-teal-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{lab.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{lab.nameTr}</div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          lab.tube === 'purple' ? 'bg-purple-600' :
                          lab.tube === 'yellow' ? 'bg-amber-400' :
                          lab.tube === 'blue' ? 'bg-sky-500' : 'bg-emerald-500'
                        }`} />
                        <span>{lab.tubeLabel}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs font-semibold text-slate-800 tabular-nums">
                        {lab.referenceRange}
                      </div>
                      <div className="text-[10px] text-slate-400">{lab.unit}</div>
                    </div>
                  </button>
                ))}

                {filteredLabs.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400">
                    Arama kriterine uygun laboratuvar testi bulunamadı.
                  </div>
                )}
              </div>
            </div>

            {/* Detail Column */}
            {selectedLab && (
              <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold text-teal-700">{selectedLab.tubeLabel}</div>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">{selectedLab.name}</h3>
                    <div className="text-xs text-slate-500 mt-0.5">{selectedLab.nameTr}</div>
                  </div>
                  <div className="text-right p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-[11px] text-slate-500">Referans Aralığı</div>
                    <div className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                      {selectedLab.referenceRange}
                    </div>
                    <div className="text-[10px] text-slate-500">{selectedLab.unit}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-900 mb-1">Klinik Önemi:</div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                    {selectedLab.clinicalSignificance}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* High causes */}
                  <div className="p-3.5 bg-rose-50/50 rounded-lg border border-rose-100">
                    <div className="text-xs font-bold text-rose-900 mb-2 flex items-center gap-1.5">
                      <span>Yükseklik Nedenleri (&gt; {selectedLab.referenceRange.split('-')[1]?.trim() || 'Üst Sınır'}):</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedLab.highCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Low causes */}
                  <div className="p-3.5 bg-sky-50/50 rounded-lg border border-sky-100">
                    <div className="text-xs font-bold text-sky-900 mb-2 flex items-center gap-1.5">
                      <span>Düşüklük Nedenleri (&lt; {selectedLab.referenceRange.split('-')[0]?.trim() || 'Alt Sınır'}):</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {selectedLab.lowCauses.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-sky-500 font-bold">•</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Klinik örnek hemolizli ise potasyum ve LDH düzeylerinin yalancı yüksek çıkabileceğini unutmayınız.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Arterial Blood Gas (ABG) Interactive Interpreter */}
      {activeTab === 'abg_analyzer' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-900">Arteriyel Kan Gazı (AKG) Otomatik Analizörü</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              pH, pCO2 ve HCO3 değerlerini girerek sistemik asit-baz bozukluğunu ve Winter formülü kompanzasyonunu saptayın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                pH <span className="text-slate-400 font-normal">(Normal: 7.35 - 7.45)</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={abgPh}
                onChange={(e) => setAbgPh(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
              <div className="flex gap-2 mt-2">
                {[7.22, 7.30, 7.40, 7.50].map(val => (
                  <button
                    key={val}
                    onClick={() => setAbgPh(val)}
                    className="px-2 py-1 text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-mono"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                pCO2 (mmHg) <span className="text-slate-400 font-normal">(Normal: 35 - 45)</span>
              </label>
              <input
                type="number"
                value={abgPco2}
                onChange={(e) => setAbgPco2(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
              <div className="flex gap-2 mt-2">
                {[25, 32, 40, 55, 65].map(val => (
                  <button
                    key={val}
                    onClick={() => setAbgPco2(val)}
                    className="px-2 py-1 text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-mono"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                HCO3- (mEq/L) <span className="text-slate-400 font-normal">(Normal: 22 - 26)</span>
              </label>
              <input
                type="number"
                value={abgHco3}
                onChange={(e) => setAbgHco3(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
              <div className="flex gap-2 mt-2">
                {[12, 16, 24, 32].map(val => (
                  <button
                    key={val}
                    onClick={() => setAbgHco3(val)}
                    className="px-2 py-1 text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-mono"
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Interpretation Result */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="p-5 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">Otomatik Teşhis Sonucu:</span>
                <span className="text-xs font-mono text-teal-800">{abgResult.acidBaseState}</span>
              </div>

              <div className="text-2xl font-bold text-teal-950">
                {abgResult.primaryDisorder}
              </div>

              <div className="text-xs text-teal-900 font-medium bg-white/70 p-3 rounded-lg border border-teal-100">
                <strong>Kompanzasyon Durumu:</strong> {abgResult.compensationState}
              </div>

              {abgResult.winterNote && (
                <div className="text-xs text-slate-600 font-mono bg-white/60 p-2.5 rounded border border-teal-100">
                  {abgResult.winterNote}
                </div>
              )}
            </div>

            {/* Clinical step guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">1. Adım: pH'a Bak</div>
                <div>pH &lt; 7.35 ise Asidemi, &gt; 7.45 ise Alkalemi vardır. Normal aralıkta miks kompanze durum araştırılır.</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">2. Adım: Birincil Bozukluk</div>
                <div>pH yönü ile aynı yönde değişen parametre primer bozukluğu gösterir (pCO2 asittir, HCO3 bazdır).</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-semibold text-slate-900 mb-1">3. Adım: Anyon Açığı Hesabı</div>
                <div>Metabolik asidoz saptandığında mutlaka Na - (Cl + HCO3) ile Anyon Açığı (HAGMA vs NAGMA) hesaplanmalıdır.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
