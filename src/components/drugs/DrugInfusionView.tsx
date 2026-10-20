import React, { useState } from 'react';
import { 
  Pill, 
  Droplet, 
  Calculator, 
  Search, 
  AlertCircle, 
  Clock, 
  ShieldAlert, 
  Check, 
  HelpCircle 
} from 'lucide-react';
import { DRUG_MONOGRAPHS } from '../../data/clinicalData';
import { DrugMonograph } from '../../types/clinical';

export const DrugInfusionView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'infusion' | 'dosage' | 'monographs'>('infusion');

  // Infusion calculator states
  const [infusionVolume, setInfusionVolume] = useState<number>(500); // mL
  const [durationValue, setDurationValue] = useState<number>(4); // hours or minutes
  const [durationUnit, setDurationUnit] = useState<'hours' | 'minutes'>('hours');
  const [dripFactor, setDripFactor] = useState<number>(20); // 20 drops/mL standard, 15 blood, 60 micro

  const totalMinutes = durationUnit === 'hours' ? durationValue * 60 : durationValue;
  const totalHours = totalMinutes / 60;
  
  const mlPerHour = totalHours > 0 ? Math.round(infusionVolume / totalHours) : 0;
  const dropsPerMinute = totalMinutes > 0 ? Math.round((infusionVolume * dripFactor) / totalMinutes) : 0;
  const secondsPerDrop = dropsPerMinute > 0 ? (60 / dropsPerMinute).toFixed(1) : '0';

  // Dose calculator states
  const [patientWeight, setPatientWeight] = useState<number>(70);
  const [targetDosePerKg, setTargetDosePerKg] = useState<number>(15); // e.g. 15 mg/kg
  const [drugVialTotalMg, setDrugVialTotalMg] = useState<number>(1000); // 1000 mg
  const [drugVialTotalMl, setDrugVialTotalMl] = useState<number>(100); // in 100 mL

  const totalDoseMg = Math.round(patientWeight * targetDosePerKg);
  const concentrationMgPerMl = drugVialTotalMl > 0 ? drugVialTotalMg / drugVialTotalMl : 0;
  const requiredVolumeMl = concentrationMgPerMl > 0 ? parseFloat((totalDoseMg / concentrationMgPerMl).toFixed(1)) : 0;

  // Search in monographs
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugMonograph>(DRUG_MONOGRAPHS[0]);

  const filteredDrugs = DRUG_MONOGRAPHS.filter(d => 
    d.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.brandNames.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.indication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">İlaç Dozaj & İnfüzyon Hızı Rehberi</h2>
          <p className="text-xs text-slate-500 mt-1">
            Damla/dakika, infüzyon pompası saatlik hızları, mg/kg dozajı ve servis ilaç monografları
          </p>
        </div>
      </div>

      {/* Segmented Controls for Drug View */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveSubTab('infusion')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            activeSubTab === 'infusion'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Droplet className="w-3.5 h-3.5" />
          <span>İnfüzyon & Damla Hızı Hesaplayıcı</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dosage')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            activeSubTab === 'dosage'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>mg/kg Dozaj & Enjektör Hacmi</span>
        </button>

        <button
          onClick={() => setActiveSubTab('monographs')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
            activeSubTab === 'monographs'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Pill className="w-3.5 h-3.5" />
          <span>Sık Kullanılan Servis İlaçları</span>
        </button>
      </div>

      {/* 1. Infusion Rate Calculator */}
      {activeSubTab === 'infusion' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-900">İnfüzyon Hızı & Damla Sayısı Hesaplayıcı</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              İntravenöz infüzyon pompası hızı (mL/saat) ve yerçekimi infüzyon seti damla/dakika ayarı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Toplam Sıvı Hacmi (mL)</label>
              <input
                type="number"
                value={infusionVolume}
                onChange={(e) => setInfusionVolume(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                placeholder="Örn: 500 mL SF"
              />
              <div className="flex gap-2 mt-2">
                {[100, 250, 500, 1000].map(vol => (
                  <button
                    key={vol}
                    onClick={() => setInfusionVolume(vol)}
                    className="px-2 py-1 text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-mono"
                  >
                    {vol} mL
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">İnfüzyon Süresi</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={durationValue}
                  onChange={(e) => setDurationValue(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
                <select
                  value={durationUnit}
                  onChange={(e) => setDurationUnit(e.target.value as 'hours' | 'minutes')}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 shrink-0"
                >
                  <option value="hours">Saat</option>
                  <option value="minutes">Dakika</option>
                </select>
              </div>
              <div className="flex gap-2 mt-2">
                {[
                  { label: '30 dk', val: 30, unit: 'minutes' as const },
                  { label: '1 sa', val: 1, unit: 'hours' as const },
                  { label: '4 sa', val: 4, unit: 'hours' as const },
                  { label: '8 sa', val: 8, unit: 'hours' as const },
                  { label: '24 sa', val: 24, unit: 'hours' as const },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setDurationValue(item.val);
                      setDurationUnit(item.unit);
                    }}
                    className="px-2 py-1 text-[11px] bg-slate-100 text-slate-700 hover:bg-slate-200 rounded"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">İnfüzyon Seti Damla Faktörü</label>
              <select
                value={dripFactor}
                onChange={(e) => setDripFactor(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={20}>Standart Serum Seti (20 damla / mL)</option>
                <option value={15}>Kan Transfüzyon Seti (15 damla / mL)</option>
                <option value={60}>Pediatrik / Mikrodrip Seti (60 damla / mL)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                Hastane servislerindeki standart infüzyon setleri genellikle 20 damla/mL'dir.
              </p>
            </div>
          </div>

          {/* Results strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200/60">
              <div className="text-xs font-medium text-teal-800">Elektronik Pompa Hızı</div>
              <div className="text-3xl font-bold font-mono text-teal-900 mt-1 tabular-nums">
                {mlPerHour} <span className="text-xs font-normal text-teal-700">mL/saat</span>
              </div>
              <div className="text-[11px] text-teal-700 mt-2">
                Volumetrik infüzyon pompasına (Perfüzör/Bikar) doğrudan girilecek akış ayarı.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500">Yerçekimi Damla Sayısı</div>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {dropsPerMinute} <span className="text-xs font-normal text-slate-500">damla/dk</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                Manuel makara ayarı ile damlatma haznesinde sayılacak dakika başına damla.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-500">Pratik Gözlem Aralığı</div>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  Her {secondsPerDrop} sn <span className="text-xs font-normal text-slate-500">/ 1 damla</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                Hemşire ve asistan takibinde saniye sayacı ile pratik akış hızı kontrolü.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Dosage & Syringe Volume Calculator */}
      {activeSubTab === 'dosage' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-semibold text-slate-900">mg/kg Dozaj & Enjektör Hacmi Hesaplayıcı</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hastanın ağırlığına göre hedeflenen miligram dozu ve ampul konsantrasyonuna göre çekilecek mililitre (mL) hesabı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Hasta Kilosu (kg)</label>
              <input
                type="number"
                value={patientWeight}
                onChange={(e) => setPatientWeight(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Hedef Doz (mg/kg)</label>
              <input
                type="number"
                step="0.5"
                value={targetDosePerKg}
                onChange={(e) => setTargetDosePerKg(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Flakon/Ampul İlaç Miktarı (mg)</label>
              <input
                type="number"
                value={drugVialTotalMg}
                onChange={(e) => setDrugVialTotalMg(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Sulandırma / Şişe Hacmi (mL)</label>
              <input
                type="number"
                value={drugVialTotalMl}
                onChange={(e) => setDrugVialTotalMl(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500">Gereken Toplam Doz</div>
              <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {totalDoseMg} <span className="text-xs font-normal text-slate-500">mg</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                {patientWeight} kg × {targetDosePerKg} mg/kg formülü ile hesaplandı.
              </div>
            </div>

            <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200/80">
              <div className="text-xs font-medium text-teal-800">Enjektörden Çekilecek Hacim</div>
              <div className="text-3xl font-bold font-mono text-teal-900 mt-1 tabular-nums">
                {requiredVolumeMl} <span className="text-xs font-normal text-teal-700">mL</span>
              </div>
              <div className="text-[11px] text-teal-700 mt-2">
                İlacın sulandırılmış çözeltisinden hastaya uygulanacak tam hacim.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500">Solüsyon Konsantrasyonu</div>
              <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {concentrationMgPerMl.toFixed(2)} <span className="text-xs font-normal text-slate-500">mg/mL</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-2">
                {drugVialTotalMg} mg / {drugVialTotalMl} mL oranında konsantre solüsyon.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Drug Monographs Library */}
      {activeSubTab === 'monographs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Drug list column */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="İlaç veya endikasyon ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="space-y-1.5 max-h-[550px] overflow-y-auto pr-1">
              {filteredDrugs.map(drug => (
                <button
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedDrug.id === drug.id
                      ? 'border-teal-600 bg-teal-50/70 text-teal-950 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-xs font-semibold">{drug.genericName}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Ticari: {drug.brandNames}</div>
                  <div className="text-[10px] text-teal-700 mt-1">{drug.category}</div>
                </button>
              ))}

              {filteredDrugs.length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400">
                  Sonuç bulunamadı.
                </div>
              )}
            </div>
          </div>

          {/* Selected Drug Detail Sheet */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <div className="text-xs font-medium text-teal-700">{selectedDrug.category}</div>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {selectedDrug.genericName}
              </h3>
              <div className="text-xs text-slate-500 mt-1">
                Piyasa / Ticari İsimler: <strong className="text-slate-700">{selectedDrug.brandNames}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-xs font-semibold text-slate-800 mb-1">Erişkin Standart Dozu</div>
                <div className="text-xs text-slate-700 font-mono leading-relaxed">
                  {selectedDrug.standardDoseAdult}
                </div>
              </div>

              {selectedDrug.standardDosePediatric && (
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-xs font-semibold text-slate-800 mb-1">Pediatrik Dozaj</div>
                  <div className="text-xs text-slate-700 font-mono leading-relaxed">
                    {selectedDrug.standardDosePediatric}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="font-semibold text-slate-900">Endikasyon:</div>
                <div className="text-slate-700 mt-0.5">{selectedDrug.indication}</div>
              </div>

              <div>
                <div className="font-semibold text-slate-900">Uygulama Şekli & Hızı:</div>
                <div className="text-slate-700 mt-0.5">{selectedDrug.administration}</div>
              </div>

              <div>
                <div className="font-semibold text-slate-900">Sulandırma / Seyreltme:</div>
                <div className="text-slate-700 mt-0.5">{selectedDrug.dilution}</div>
              </div>

              {selectedDrug.renalAdjustment && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                  <div className="font-semibold flex items-center gap-1.5 text-amber-800 mb-0.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Böbrek Fonksiyon Ayarlaması (eGFR):</span>
                  </div>
                  <div>{selectedDrug.renalAdjustment}</div>
                </div>
              )}

              <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-rose-900">
                <div className="font-semibold flex items-center gap-1.5 text-rose-800 mb-0.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                  <span>Kontrendikasyonlar & Kritik Uyarılar:</span>
                </div>
                <div>{selectedDrug.contraindications}</div>
                <div className="mt-1 text-[11px] text-rose-800">
                  <strong>Dikkat:</strong> {selectedDrug.keyCautions}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
