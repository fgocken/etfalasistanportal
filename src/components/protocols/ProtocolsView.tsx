import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  RotateCcw, 
  Copy, 
  Check, 
  Heart, 
  Zap, 
  Activity 
} from 'lucide-react';
import { EMERGENCY_PROTOCOLS } from '../../data/clinicalData';
import { EmergencyProtocol } from '../../types/clinical';

export const ProtocolsView: React.FC = () => {
  const [selectedProto, setSelectedProto] = useState<EmergencyProtocol>(EMERGENCY_PROTOCOLS[0]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const toggleStep = (stepKey: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepKey]: !prev[stepKey]
    }));
  };

  const resetSteps = () => {
    setCompletedSteps({});
  };

  const handleCopyProtocol = () => {
    const text = `KLİNİK PROTOKOL: ${selectedProto.title}\n` +
      `Endikasyon: ${selectedProto.indication}\n\n` +
      selectedProto.steps.map(s => 
        `[Adım ${s.stepNumber}] ${s.title}\n${s.description}\n` +
        (s.medications ? `İlaçlar:\n` + s.medications.map(m => ` - ${m}`).join('\n') + '\n' : '')
      ).join('\n') +
      `\nKlinik İpuçları:\n` + selectedProto.pearls.map(p => `• ${p}`).join('\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Acil Klinik Protokoller & Akış Şemaları</h2>
          <p className="text-xs text-slate-500 mt-1">
            Nöbette ve serviste anlık müdahale gerektiren kritik durumlar için adım adım kontrol listeleri
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetSteps}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Adımları Sıfırla</span>
          </button>
          <button
            onClick={handleCopyProtocol}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopyalandı' : 'Protokolü Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* Protocol Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {EMERGENCY_PROTOCOLS.map(proto => {
          const isActive = selectedProto.id === proto.id;
          return (
            <button
              key={proto.id}
              onClick={() => {
                setSelectedProto(proto);
                setCompletedSteps({});
              }}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${isActive ? 'text-rose-300' : 'text-rose-600'}`} />
              <span>{proto.title}</span>
            </button>
          );
        })}
      </div>

      {/* Protocol Main Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>ACİL EYLEM KILAVUZU</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedProto.title}</h3>
          <p className="text-xs text-slate-600 mt-1 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-100">
            <strong>Klinik Endikasyon:</strong> {selectedProto.indication}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {selectedProto.steps.map((step) => {
            const stepKey = `${selectedProto.id}_${step.stepNumber}`;
            const isDone = !!completedSteps[stepKey];

            return (
              <div 
                key={step.stepNumber}
                className={`p-4 rounded-xl border transition-all ${
                  isDone 
                    ? 'bg-emerald-50/40 border-emerald-300' 
                    : 'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleStep(stepKey)}
                      className="mt-0.5 text-slate-400 hover:text-teal-700 transition-colors"
                      title={isDone ? 'Tamamlanmadı yap' : 'Tamamlandı işaretle'}
                    >
                      {isDone ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          Adım {step.stepNumber}
                        </span>
                        <h4 className={`text-sm font-semibold ${isDone ? 'text-emerald-950 line-through' : 'text-slate-900'}`}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-700 mt-1.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Medication doses inside step */}
                {step.medications && step.medications.length > 0 && (
                  <div className="mt-3 ml-8 p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">İlaç Dozajı & Uygulama:</div>
                    {step.medications.map((med, mIdx) => (
                      <div key={mIdx} className="text-xs font-mono text-slate-800 flex items-start gap-1.5">
                        <span className="text-rose-600 font-bold shrink-0">▸</span>
                        <span>{med}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actionable checklists inside step */}
                {step.actionableItems && step.actionableItems.length > 0 && (
                  <div className="mt-3 ml-8 space-y-1">
                    {step.actionableItems.map((item, iIdx) => (
                      <div key={iIdx} className="text-xs text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clinical pearls */}
        {selectedProto.pearls && selectedProto.pearls.length > 0 && (
          <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-2">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <span>Hayati Klinik İpuçları (Clinical Pearls):</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-800">
              {selectedProto.pearls.map((pearl, idx) => (
                <li key={idx} className="leading-relaxed">{pearl}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
