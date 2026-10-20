import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Calculator, 
  FlaskConical, 
  Pill, 
  FileText, 
  AlertTriangle, 
  PhoneCall, 
  ListTodo, 
  BookOpen, 
  X, 
  ArrowRight 
} from 'lucide-react';
import { TabType } from '../types/clinical';
import { LAB_PARAMETERS, DRUG_MONOGRAPHS, EMERGENCY_PROTOCOLS, CLINIC_CONTACTS, MEDICAL_ABBREVIATIONS } from '../data/clinicalData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: TabType, extraParam?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectTab }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // open is handled from parent if listener is active, but we ensure toggle works
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search items across calculators
  const calculators = [
    { id: 'gfr', name: 'eGFR & Kreatinin Klerensi (Cockcroft-Gault & CKD-EPI)', tab: 'calculators' as TabType },
    { id: 'bmi', name: 'BMI, İdeal Kilo (IBW) ve Vücut Yüzey Alanı (BSA)', tab: 'calculators' as TabType },
    { id: 'fluids', name: 'Sıvı İdame İhtiyacı (Holliday-Segar 4-2-1 Kuralı)', tab: 'calculators' as TabType },
    { id: 'ca', name: 'Düzeltilmiş Kalsiyum (Albumin Korreksiyonu)', tab: 'calculators' as TabType },
    { id: 'map', name: 'Ortalama Arter Basıncı (OAB / MAP)', tab: 'calculators' as TabType },
    { id: 'anion', name: 'Anyon Açığı (Anion Gap) & Asidoz Ayrımı', tab: 'calculators' as TabType },
    { id: 'curb65', name: 'CURB-65 Pnömoni Ciddiyet ve Yatış Skoru', tab: 'calculators' as TabType },
    { id: 'wells', name: 'Wells DVT ve Pulmoner Emboli Skoru', tab: 'calculators' as TabType },
    { id: 'gcs', name: 'Glasgow Koma Skalası (GKS / GCS)', tab: 'calculators' as TabType },
  ].filter(c => !q || c.name.toLowerCase().includes(q));

  const matchedLabs = LAB_PARAMETERS.filter(l => 
    !q || l.name.toLowerCase().includes(q) || l.nameTr.toLowerCase().includes(q) || l.tubeLabel.toLowerCase().includes(q)
  );

  const matchedDrugs = DRUG_MONOGRAPHS.filter(d => 
    !q || d.genericName.toLowerCase().includes(q) || d.brandNames.toLowerCase().includes(q) || d.category.toLowerCase().includes(q)
  );

  const matchedProtocols = EMERGENCY_PROTOCOLS.filter(p => 
    !q || p.title.toLowerCase().includes(q) || p.indication.toLowerCase().includes(q)
  );

  const matchedContacts = CLINIC_CONTACTS.filter(c => 
    !q || c.unitName.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || c.extension.includes(q)
  );

  const matchedAbbr = MEDICAL_ABBREVIATIONS.filter(a => 
    !q || a.abbr.toLowerCase().includes(q) || a.meaning.toLowerCase().includes(q)
  );

  const handleSelect = (tab: TabType, extraParam?: string) => {
    onSelectTab(tab, extraParam);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Klinik araç, formül, ilaç, lab testi, dahili tel veya kısaltma ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full text-slate-800 placeholder-slate-400 text-sm focus:outline-none bg-transparent"
          />
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-3 space-y-4 text-xs">
          {/* Calculators */}
          {calculators.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-teal-600" />
                <span>Klinik Hesaplayıcılar</span>
              </div>
              <div className="space-y-1 mt-1">
                {calculators.map(calc => (
                  <button
                    key={calc.id}
                    onClick={() => handleSelect(calc.tab, calc.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-100 hover:text-teal-900 transition-colors group"
                  >
                    <span className="font-medium text-slate-800">{calc.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Drugs */}
          {matchedDrugs.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-blue-600" />
                <span>İlaç Monografları & Dozaj</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedDrugs.map(drug => (
                  <button
                    key={drug.id}
                    onClick={() => handleSelect('drugs', drug.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-100 hover:text-blue-900 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-slate-800">{drug.genericName} ({drug.brandNames})</div>
                      <div className="text-slate-500 text-[11px]">{drug.category} · {drug.indication}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Labs */}
          {matchedLabs.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5 text-emerald-600" />
                <span>Laboratuvar Testleri & Referanslar</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedLabs.map(lab => (
                  <button
                    key={lab.id}
                    onClick={() => handleSelect('labs', lab.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-100 hover:text-emerald-900 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-slate-800">{lab.name} — {lab.nameTr}</div>
                      <div className="text-slate-500 text-[11px]">Normal: {lab.referenceRange} {lab.unit} · {lab.tubeLabel}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Protocols */}
          {matchedProtocols.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Acil Klinik Protokoller</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedProtocols.map(proto => (
                  <button
                    key={proto.id}
                    onClick={() => handleSelect('protocols', proto.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-100 hover:text-rose-900 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-slate-800">{proto.title}</div>
                      <div className="text-slate-500 text-[11px]">{proto.indication}</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Contacts */}
          {matchedContacts.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-indigo-600" />
                <span>Klinik Dahili Rehber</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedContacts.map(c => (
                  <button
                    key={c.id}
                    onClick={() => handleSelect('directory', c.id)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-100 hover:text-indigo-900 transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-slate-800">{c.unitName}</div>
                      <div className="text-slate-500 text-[11px]">{c.department} · {c.location}</div>
                    </div>
                    <span className="font-mono text-sm font-semibold text-indigo-600">{c.extension}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Abbreviations */}
          {matchedAbbr.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Tıbbi Kısaltmalar</span>
              </div>
              <div className="space-y-1 mt-1">
                {matchedAbbr.map(abbr => (
                  <button
                    key={abbr.abbr}
                    onClick={() => handleSelect('abbreviations')}
                    className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-slate-100 hover:text-amber-900 transition-colors group"
                  >
                    <div>
                      <span className="font-mono font-bold text-slate-900 mr-2">{abbr.abbr}</span>
                      <span className="text-slate-700">{abbr.meaning}</span>
                      <div className="text-slate-500 text-[11px]">{abbr.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {calculators.length === 0 && matchedLabs.length === 0 && matchedDrugs.length === 0 && matchedProtocols.length === 0 && matchedContacts.length === 0 && matchedAbbr.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-sm">
              "{query}" ile eşleşen klinik araç bulunamadı.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="border-t border-slate-200 px-4 py-2 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Kapatmak için <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-700">ESC</kbd> tuşuna basın</span>
          <span>Açmak için her an <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-slate-700">Ctrl+K</kbd></span>
        </div>
      </div>
    </div>
  );
};
