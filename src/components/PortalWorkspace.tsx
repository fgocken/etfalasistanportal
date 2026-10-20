import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Pill, 
  FileText, 
  Phone, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Calculator,
  Search,
  Check
} from 'lucide-react';

interface PortalWorkspaceProps {
  onBackToWelcome: () => void;
}

export const PortalWorkspace: React.FC<PortalWorkspaceProps> = ({ onBackToWelcome }) => {
  const [activeTab, setActiveTab] = useState<'tools' | 'calculator' | 'drugs' | 'notes' | 'contacts'>('tools');

  // Simple clean Anesthesia calculator states
  const [calcWeight, setCalcWeight] = useState<number>(70);
  const [calcHeight, setCalcHeight] = useState<number>(175);
  const [calcGender, setCalcGender] = useState<'male' | 'female'>('male');

  // IBW calculation (Devine)
  const inchesOver5Feet = Math.max(0, (calcHeight / 2.54) - 60);
  const ibw = Math.round(calcGender === 'male' ? 50 + 2.3 * inchesOver5Feet : 45.5 + 2.3 * inchesOver5Feet);
  const tidalVolumeLow = Math.round(ibw * 6);
  const tidalVolumeHigh = Math.round(ibw * 8);

  // Holliday-Segar fluid
  const hourlyFluid = calcWeight <= 10 
    ? calcWeight * 4 
    : calcWeight <= 20 
      ? 40 + (calcWeight - 10) * 2 
      : 60 + (calcWeight - 20) * 1;

  // Simple Notes state
  const [notes, setNotes] = useState<string>(() => {
    return localStorage.getItem('etfal_anestezi_notes') || '';
  });
  const [notesSaved, setNotesSaved] = useState(false);

  const handleSaveNotes = () => {
    localStorage.setItem('etfal_anestezi_notes', notes);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 2000);
  };

  // Anesthesia Quick Drug Reference
  const anesthesiaDrugs = [
    { name: 'Propofol', use: 'İndüksiyon', dose: '1.5 - 2.5 mg/kg IV', note: 'Hipotansiyon ve bradikardi riski' },
    { name: 'Röküronyum (Esmeron)', use: 'Nöromusküler Blokaj', dose: '0.6 mg/kg (RSI: 1.0 - 1.2 mg/kg)', note: 'Etki başlama: 60-90 sn, süre: 30-45 dk' },
    { name: 'Fentanil', use: 'Analjezi / İndüksiyon', dose: '1 - 2 mcg/kg IV', note: 'Gerektikçe 25-50 mcg titre edilir' },
    { name: 'Sugammadeks (Bridion)', use: 'Röküronyum Reversali', dose: '2 mg/kg (orta), 4 mg/kg (derin blok)', note: 'TOF yanıtına göre uygulanır' },
    { name: 'Efedrin', use: 'Hipotansiyon', dose: '5 - 10 mg IV bolus', note: 'Taşikardi eşlik etmeyen hipotansiyonda' },
    { name: 'Atropin', use: 'Bradikardi', dose: '0.5 mg IV bolus', note: 'Kardiyak ritim ve nabız kontrolü ile' },
  ];

  // Clinic Extensions
  const clinicContacts = [
    { title: 'Ameliyathane Koordinasyon & Danışma', ext: '2100', loc: 'Merkez Ameliyathane' },
    { title: 'Anestezi ve Reanimasyon Yoğun Bakım (ARYB)', ext: '3250', loc: '3. Kat Yoğun Bakım' },
    { title: 'Kıdemli Asistan & Nöbetçi Hekim Odası', ext: '2105', loc: 'Ameliyathane İçi' },
    { title: 'Merkez Kan Transfüzyon Ünitesi', ext: '3150', loc: '1. Kat' },
    { title: 'Klinik Eczanesi', ext: '4200', loc: 'Eczacılık Birimi' },
    { title: 'Mavi Kod / Acil Çağrı Merkezi', ext: '1111', loc: 'Güvenlik & Kriz' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWelcome}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Karşılama Sayfası</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">
              Şişli Etfal EAH Anestezi & Reanimasyon
            </h1>
          </div>

          <div className="text-xs text-slate-500 font-mono hidden md:block">
            {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto py-2 no-scrollbar">
          {[
            { id: 'tools', label: 'Genel Bakış', icon: Activity },
            { id: 'calculator', label: 'Hızlı Hesaplayıcı', icon: Calculator },
            { id: 'drugs', label: 'Kritik İlaçlar', icon: Pill },
            { id: 'notes', label: 'Nöbet Notları', icon: FileText },
            { id: 'contacts', label: 'Dahili Numaralar', icon: Phone },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* 1. Overview */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">Anestezi & Reanimasyon Çalışma Alanı</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Şişli Etfal EAH Anesteziyoloji ve Reanimasyon Kliniği asistanları için sadeleştirilmiş nöbet ve vaka araçları.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('calculator')}
                className="text-left p-5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Ventilatör & Sıvı</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  İdeal Kilo & Tidal Volüm Hesaplayıcı
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Devine formülü ile IBW hesabı, koruyucu ventilasyon için 6-8 mL/kg tidal volüm ve 4-2-1 saatlik idame sıvı hızı.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('drugs')}
                className="text-left p-5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <Pill className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">İndüksiyon & Kas Gevşetici</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  Kritik Anestezi İlaçları & Dozları
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Propofol, Röküronyum, Fentanil, Sugammadeks, Efedrin ve acil resüsitasyon dozaj hatırlatıcıları.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className="text-left p-5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Kişisel Notlar</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  Nöbet & Salon Not Defteri
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Vaka takibi, preoperatif değerlendirme notları ve nöbet yapılacakları için tarayıcınızda kayıtlı tutulan sade not defteri.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className="text-left p-5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Dahili Hatlar</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  Klinik ve Ameliyathane Dahili Hatları
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ameliyathane koordinasyon, yoğun bakım, kıdemli hekim odası ve kan merkezi direkt dahili telefonları.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* 2. Calculator */}
        {activeTab === 'calculator' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">İdeal Kilo (IBW) & Koruyucu Ventilatör Ayarları</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Anestezi altında mekanik ventilatör parametreleri hastanın gerçek kilosuna değil, İdeal Vücut Ağırlığına (IBW) göre ayarlanır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Cinsiyet</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCalcGender('male')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcGender === 'male' ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold' : 'border-slate-300 text-slate-600'
                    }`}
                  >
                    Erkek
                  </button>
                  <button
                    onClick={() => setCalcGender('female')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                      calcGender === 'female' ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold' : 'border-slate-300 text-slate-600'
                    }`}
                  >
                    Kadın
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Boy (cm)</label>
                <input
                  type="number"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Aktüel Kilo (kg)</label>
                <input
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums"
                />
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">İdeal Kilo (Devine IBW)</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {ibw} <span className="text-xs font-normal text-slate-500">kg</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Ventilatör tidal volümü ve hidrofilik ilaç dozajı temeli.
                </div>
              </div>

              <div className="p-4 bg-teal-50/70 rounded-xl border border-teal-200/80">
                <div className="text-xs font-medium text-teal-800">Hedef Tidal Volüm (6-8 mL/kg IBW)</div>
                <div className="text-3xl font-bold font-mono text-teal-900 mt-1 tabular-nums">
                  {tidalVolumeLow} - {tidalVolumeHigh} <span className="text-xs font-normal text-teal-700">mL</span>
                </div>
                <div className="text-[11px] text-teal-700 mt-2">
                  Akciğer koruyucu mekanik ventilasyon önerisi.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs text-slate-500">Saatlik İdame Sıvı Hızı (4-2-1)</div>
                <div className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                  {hourlyFluid} <span className="text-xs font-normal text-slate-500">mL/saat</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">
                  Hastanın bazal sıvı ihtiyacı (açlık açığı ayrıca hesaplanır).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Drugs */}
        {activeTab === 'drugs' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Sık Kullanılan Anestezi İlaçları</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Genel anestezi indüksiyonu ve idamesinde sık başvurulan ajanların standart dozları.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {anesthesiaDrugs.map((drug) => (
                <div key={drug.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{drug.name}</span>
                    <span className="text-[11px] font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                      {drug.use}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-semibold text-slate-800">
                    Doz: {drug.dose}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {drug.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Notes */}
        {activeTab === 'notes' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-semibold text-slate-900">Nöbet & Vaka Not Defteri</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Bu alana yazdığınız tüm notlar cihazınızın tarayıcısında güvenle saklanır.
                </p>
              </div>
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-800 hover:bg-teal-900 rounded-lg transition-colors cursor-pointer"
              >
                {notesSaved ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : null}
                <span>{notesSaved ? 'Kaydedildi' : 'Kaydet'}</span>
              </button>
            </div>

            <textarea
              rows={10}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Vaka notları, salon teslimleri, preoperatif değerlendirme veya nöbette yapılacaklar..."
              className="w-full p-3.5 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 font-mono leading-relaxed"
            />
          </div>
        )}

        {/* 5. Contacts */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-semibold text-slate-900">Klinik & Ameliyathane Dahili Numaraları</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Şişli Etfal EAH bünyesinde sık aranan kritik birimler.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clinicContacts.map((c) => (
                <div key={c.title} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-slate-900">{c.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{c.loc}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-base font-bold text-teal-900 tabular-nums">{c.ext}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
        Şişli Hamidiye Etfal EAH · Anestezi ve Reanimasyon Kliniği Asistan Portalı
      </footer>
    </div>
  );
};
