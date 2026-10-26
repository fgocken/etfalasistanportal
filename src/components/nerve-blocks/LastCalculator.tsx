import React, { useState } from 'react';
import { 
  AlertTriangle, 
  HeartCrack, 
  Activity, 
  Droplet, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Info,
  Scale
} from 'lucide-react';
import { LOCAL_ANESTHETICS, calculateLastLipidDoses } from '../../data/nerveBlocksData';

export const LastCalculator: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [hasEpinephrine, setHasEpinephrine] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'calculator' | 'protocol'>('calculator');

  const lipid = calculateLastLipidDoses(weight);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl text-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-amber-950/40 p-5 border-b border-rose-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-400">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-bold px-2 py-0.5 bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">
                  ASRA & ESRA Kılavuzları
                </span>
                <span className="text-xs text-slate-400">Lipid Rescue 2024-2025</span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                Lokal Anestezik Doz & LAST İntralipid Kurtarma Hesaplayıcısı
              </h2>
            </div>
          </div>

          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'calculator'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Doz Hesaplayıcı
            </button>
            <button
              onClick={() => setActiveTab('protocol')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'protocol'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LAST Yönetim Algoritması
            </button>
          </div>
        </div>

        {/* Hasta Kilosu Kontrol Paneli */}
        <div className="mt-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-teal-400" />
            <div>
              <span className="text-xs text-slate-400 font-medium block">Hasta Vücut Ağırlığı</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="2"
                  max="160"
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value) || 1)}
                  className="w-20 px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-lg font-bold text-teal-300 text-center focus:outline-none focus:border-teal-500"
                />
                <span className="text-sm font-semibold text-slate-300">kg</span>
              </div>
            </div>
          </div>

          {/* Hızlı Kilo Butonları */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[10, 25, 50, 60, 70, 80, 90, 100].map((w) => (
              <button
                key={w}
                onClick={() => setWeight(w)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  weight === w
                    ? 'bg-teal-500/30 text-teal-300 border border-teal-500/50'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {w} kg
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 cursor-pointer bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700/60 select-none">
            <input
              type="checkbox"
              checked={hasEpinephrine}
              onChange={(e) => setHasEpinephrine(e.target.checked)}
              className="rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-800"
            />
            <span className="text-xs font-semibold text-amber-300">Adrenalinli Solüsyon (1:200.000)</span>
          </label>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        <div className="p-5 space-y-6">
          {/* %20 İntralipid Acil Kurtarma Kutusu */}
          <div className="bg-gradient-to-br from-rose-950/40 via-slate-900 to-rose-900/20 border-2 border-rose-500/40 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20 mb-4">
              <div className="flex items-center gap-2">
                <HeartCrack className="w-5 h-5 text-rose-400 animate-pulse" />
                <h3 className="text-base font-bold text-rose-300">
                  %20 İntralipid (Lipid Rescue) Acil Tedavi Dozları ({weight} kg için)
                </h3>
              </div>
              <span className="text-xs bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-full font-mono font-bold">
                Acil Durum Dozajı
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/30">
                <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider mb-1">
                  1. Adım: İV Bolus
                </div>
                <div className="text-2xl font-black text-rose-200 font-mono">
                  {lipid.bolusMl} <span className="text-sm font-normal text-slate-400">mL</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  1.5 mL/kg İV, 2-3 dakikada hızlı infüze edilir.
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/30">
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-1">
                  2. Adım: Sürekli İnfüzyon
                </div>
                <div className="text-2xl font-black text-amber-200 font-mono">
                  {lipid.infusionMlPerHour} <span className="text-sm font-normal text-slate-400">mL/saat</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  0.25 mL/kg/dk ({lipid.infusionMlPerMin} mL/dk) hızında hemodinami düzelene dek sürdürülür.
                </div>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-rose-500/30">
                <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-1">
                  Dirençli Durum & Tavan Sınır
                </div>
                <div className="text-base font-bold text-cyan-200">
                  Tekrar Bolus: <span className="font-mono text-lg text-cyan-300">{lipid.refractoryBolusMl} mL</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Dirençli arrestte bolus 1-2 kez tekrarlanır, infüzyon <span className="text-cyan-300 font-mono">{lipid.refractoryInfusionMlPerHour} mL/saat</span>’e (0.5 mL/kg/dk) çıkarılır.
                  <div className="text-rose-400 font-semibold mt-1">Maksimum sınır: {lipid.maxCumulativeMl} mL</div>
                </div>
              </div>
            </div>
          </div>

          {/* Maksimum Güvenli Lokal Anestezik Dozları Tablosu */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-400" />
                Maksimum Güvenli Doz Hesaplama ({weight} kg)
              </h3>
              <span className="text-xs text-slate-400">
                {hasEpinephrine ? 'Adrenalinli formül devrede' : 'Adrenalinsiz düz solüsyon'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {LOCAL_ANESTHETICS.map((la) => {
                const maxMgKg = hasEpinephrine && la.withEpiMaxDoseMgKg ? la.withEpiMaxDoseMgKg : la.plainMaxDoseMgKg;
                const ceilingMg = hasEpinephrine && la.withEpiMaxTotalMg ? la.withEpiMaxTotalMg : la.plainMaxTotalMg;
                const calculatedMg = Math.min(ceilingMg, Math.round(weight * maxMgKg));

                // Örnek standart volüm hesapları (%0.5 ve %0.25 için)
                let volumeTip = '';
                if (la.id === 'bupivacaine' || la.id === 'levobupivacaine') {
                  const ml05 = (calculatedMg / 5).toFixed(0);
                  const ml025 = (calculatedMg / 2.5).toFixed(0);
                  volumeTip = `%0.5: maks ${ml05} mL · %0.25: maks ${ml025} mL`;
                } else if (la.id === 'ropivacaine') {
                  const ml075 = (calculatedMg / 7.5).toFixed(0);
                  const ml05 = (calculatedMg / 5).toFixed(0);
                  const ml02 = (calculatedMg / 2).toFixed(0);
                  volumeTip = `%0.5: maks ${ml05} mL · %0.2: maks ${ml02} mL`;
                } else if (la.id === 'lidocaine') {
                  const ml2 = (calculatedMg / 20).toFixed(0);
                  const ml1 = (calculatedMg / 10).toFixed(0);
                  volumeTip = `%2: maks ${ml2} mL · %1: maks ${ml1} mL`;
                }

                return (
                  <div key={la.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-white text-base">{la.name}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${la.toxicityColor}`}>
                          {la.toxicityRank}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mb-3">{la.brandTr}</div>

                      <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800/80 mb-2">
                        <div className="flex items-baseline justify-between">
                          <span className="text-xs text-slate-400">Önerilen Maks Doz:</span>
                          <span className="text-lg font-bold text-teal-300 font-mono">
                            {calculatedMg} <span className="text-xs font-normal text-slate-400">mg</span>
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex justify-between mt-0.5">
                          <span>{maxMgKg} mg/kg</span>
                          <span>Tavan: {ceilingMg} mg</span>
                        </div>
                      </div>

                      {volumeTip && (
                        <div className="text-[11px] text-teal-400/90 font-mono bg-teal-950/20 px-2 py-1 rounded border border-teal-500/20 mb-2">
                          {volumeTip}
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed mt-2 pt-2 border-t border-slate-800/60">
                      {la.notes}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* LAST Yönetim Algoritması Sekmesi */
        <div className="p-5 space-y-5">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-slate-300">
              <strong className="text-amber-300 font-semibold">LAST Şüphesinde İlk Hareket:</strong> Enjeksiyonu DERHAL durdurun! Yardım çağırın (Kritik Havayolu & KPR ekibi), Acil Lipid Kurtarma Kitini (%20 İntralipid) ve defibrilatörü getirtin.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <HeartCrack className="w-4 h-4 text-rose-400" />
                1. Havayolu ve Ventilasyon Yönetimi
              </h4>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                <li><strong>FiO2 1.0 ile oksijenizasyon:</strong> Hipoksi ve asidoz lokal anestezik kardiyotoksisitesini katlayarak artırır.</li>
                <li><strong>Hiperventilasyondan kaçının:</strong> Aşırı hipokapni serebral kan akımını azaltır ve hipokalemi yaratarak aritmileri tetikler. Normokapni hedeflenmelidir.</li>
                <li><strong>Erken havayolu güvenliği:</strong> Nöbet ve bilinç kaybında aspirasyonu önlemek için hızlı seri entübasyon düşünülmelidir.</li>
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                2. Nöbet ve Kardiyak Arrest Yönetimi
              </h4>
              <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                <li><strong>Nöbet kontrolü:</strong> Benzodiazepinler ilk tercihtir (Midazolam 1-2 mg İV titrasyon). Propofol kardiyodepresan etkisi nedeniyle KULLANILMAMALIDIR.</li>
                <li><strong>Düşük Doz Adrenalin:</strong> Standart 1 mg ACLS dozu miyokardiyal iskemi ve aritmileri şiddetlendirir. Tercihen küçük titrasyonlar (&lt;1 mcg/kg, örn. 10-50 mcg) uygulanmalıdır.</li>
                <li><strong>Kaçınılması Gerekenler:</strong> Vazopressin, kalsiyum kanal blokerleri, beta blokerler ve lokal anestezik yapılı antiaritmikler (Lidokain).</li>
              </ul>
            </div>
          </div>

          {/* İzlem Süresi */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-2">
              <Clock className="w-4 h-4" />
              Gözlem ve İzlem Süresi
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kardiyovasküler kollaps veya dirençli nöbet geçiren hastalar, resüsitasyon başarılı olduktan sonra en az <strong>24 saat</strong> süreyle yoğun bakımda takip edilmelidir. Sadece hafif santral semptom gösterip düzelen hastalar en az <strong>4-6 saat</strong> hemodinamik monitörizasyonda kalmalıdır.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
