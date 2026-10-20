import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Activity, 
  Pill, 
  FileText, 
  Phone, 
  Calculator,
  Check
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface PortalWorkspaceProps {
  onBackToWelcome: () => void;
  onOpenDisclaimer: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const PortalWorkspace: React.FC<PortalWorkspaceProps> = ({ 
  onBackToWelcome, 
  onOpenDisclaimer,
  isDark,
  onToggleTheme
}) => {
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
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-30 transition-colors ${
        isDark ? 'bg-slate-900/95 border-slate-800 backdrop-blur' : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToWelcome}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-teal-500" />
              <span className="hidden sm:inline">Karşılama Sayfası</span>
            </button>
            <div className={`h-4 w-px hidden sm:block ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <h1 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Şişli Etfal EAH Anestezi & Reanimasyon
            </h1>
          </div>

          {/* Top-Right: Date & Theme Switch */}
          <div className="flex items-center gap-3">
            <div className={`text-xs font-mono hidden md:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className={`border-b transition-colors ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
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
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? isDark 
                      ? 'bg-slate-800 text-teal-300 font-semibold border border-teal-500/20' 
                      : 'bg-teal-50 text-teal-800 font-semibold'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${
                  isActive 
                    ? isDark ? 'text-teal-400' : 'text-teal-700' 
                    : isDark ? 'text-slate-500' : 'text-slate-400'
                }`} />
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
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Anestezi & Reanimasyon Çalışma Alanı
              </h2>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Şişli Etfal EAH Anesteziyoloji ve Reanimasyon Kliniği asistanları için sadeleştirilmiş nöbet ve vaka araçları.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setActiveTab('calculator')}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-teal-400 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/10 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
                    <Calculator className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Ventilatör & Sıvı
                  </span>
                </div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
                }`}>
                  İdeal Kilo & Tidal Volüm Hesaplayıcı
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Devine formülü ile IBW hesabı, koruyucu ventilasyon için 6-8 mL/kg tidal volüm ve 4-2-1 saatlik idame sıvı hızı.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('drugs')}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-teal-400 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>
                    <Pill className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    İndüksiyon & Dozaj
                  </span>
                </div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
                }`}>
                  Kritik Anestezi İlaçları & Dozları
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Propofol, Röküronyum, Fentanil, Sugammadeks, Efedrin ve acil resüsitasyon dozaj hatırlatıcıları.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-teal-400 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Kişisel Notlar
                  </span>
                </div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
                }`}>
                  Nöbet & Salon Not Defteri
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Vaka takibi, preoperatif değerlendirme notları ve nöbet yapılacakları için tarayıcınızda kayıtlı tutulan sade not defteri.
                </p>
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className={`text-left p-5 rounded-xl border transition-all space-y-2 group cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 hover:border-teal-500/40 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-teal-400 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isDark ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-700'}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    Dahili Hatlar
                  </span>
                </div>
                <h3 className={`text-sm font-bold transition-colors ${
                  isDark ? 'text-white group-hover:text-teal-300' : 'text-slate-900 group-hover:text-teal-800'
                }`}>
                  Klinik ve Ameliyathane Dahili Hatları
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ameliyathane koordinasyon, yoğun bakım, kıdemli hekim odası ve kan merkezi direkt dahili telefonları.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* 2. Calculator */}
        {activeTab === 'calculator' && (
          <div className={`rounded-xl border p-6 space-y-6 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İdeal Kilo (IBW) & Koruyucu Ventilatör Ayarları
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Anestezi altında mekanik ventilatör parametreleri hastanın gerçek kilosuna değil, İdeal Vücut Ağırlığına (IBW) göre ayarlanır.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Cinsiyet
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCalcGender('male')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      calcGender === 'male' 
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold' : 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Erkek
                  </button>
                  <button
                    onClick={() => setCalcGender('female')}
                    className={`py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                      calcGender === 'female' 
                        ? isDark ? 'bg-teal-500/20 border-teal-500 text-teal-300 font-semibold' : 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                        : isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Kadın
                  </button>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Boy (cm)
                </label>
                <input
                  type="number"
                  value={calcHeight}
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Aktüel Kilo (kg)
                </label>
                <input
                  type="number"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono tabular-nums ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Results */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>İdeal Kilo (Devine IBW)</div>
                <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {ibw} <span className="text-xs font-normal text-slate-500">kg</span>
                </div>
                <div className={`text-[11px] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Ventilatör tidal volümü ve hidrofilik ilaç dozajı temeli.
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark 
                  ? 'bg-teal-950/40 border-teal-800/60' 
                  : 'bg-teal-50/70 border-teal-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-teal-300' : 'text-teal-800'}`}>
                  Hedef Tidal Volüm (6-8 mL/kg IBW)
                </div>
                <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-teal-200' : 'text-teal-900'}`}>
                  {tidalVolumeLow} - {tidalVolumeHigh} <span className="text-xs font-normal text-teal-600">mL</span>
                </div>
                <div className={`text-[11px] mt-2 ${isDark ? 'text-teal-300/80' : 'text-teal-700'}`}>
                  Akciğer koruyucu mekanik ventilasyon önerisi.
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Saatlik İdame Sıvı Hızı (4-2-1)</div>
                <div className={`text-3xl font-bold font-mono mt-1 tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {hourlyFluid} <span className="text-xs font-normal text-slate-500">mL/saat</span>
                </div>
                <div className={`text-[11px] mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Hastanın bazal sıvı ihtiyacı (açlık açığı ayrıca hesaplanır).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Drugs */}
        {activeTab === 'drugs' && (
          <div className={`rounded-xl border p-6 space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Sık Kullanılan Anestezi İlaçları
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Genel anestezi indüksiyonu ve idamesinde sık başvurulan ajanların standart dozları.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {anesthesiaDrugs.map((drug) => (
                <div key={drug.name} className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
                  isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {drug.name}
                    </span>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                      isDark 
                        ? 'bg-teal-500/10 text-teal-300 border-teal-500/20' 
                        : 'bg-teal-50 text-teal-800 border-teal-200/50'
                    }`}>
                      {drug.use}
                    </span>
                  </div>
                  <div className={`font-mono text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    Doz: {drug.dose}
                  </div>
                  <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {drug.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. Notes */}
        {activeTab === 'notes' && (
          <div className={`rounded-xl border p-6 space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDark ? 'border-slate-800' : 'border-slate-100'
            }`}>
              <div>
                <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Nöbet & Vaka Not Defteri
                </h3>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Bu alana yazdığınız tüm notlar cihazınızın tarayıcısında güvenle saklanır.
                </p>
              </div>
              <button
                onClick={handleSaveNotes}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-teal-600 hover:bg-teal-500 text-white'
                    : 'bg-teal-800 hover:bg-teal-900 text-white'
                }`}
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
              className={`w-full p-3.5 text-xs border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono leading-relaxed ${
                isDark 
                  ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-500' 
                  : 'bg-white border-slate-300 text-slate-800'
              }`}
            />
          </div>
        )}

        {/* 5. Contacts */}
        {activeTab === 'contacts' && (
          <div className={`rounded-xl border p-6 space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className={`border-b pb-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik & Ameliyathane Dahili Numaraları
              </h3>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Şişli Etfal EAH bünyesinde sık aranan kritik birimler.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clinicContacts.map((c) => (
                <div key={c.title} className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                  isDark ? 'bg-slate-800/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                }`}>
                  <div>
                    <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{c.title}</div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.loc}</div>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono text-base font-bold tabular-nums ${
                      isDark ? 'text-teal-400' : 'text-teal-900'
                    }`}>{c.ext}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`mt-auto border-t py-4 px-4 sm:px-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>Şişli Hamidiye Etfal EAH · Anestezi ve Reanimasyon Kliniği Asistan Portalı</span>
          <button
            onClick={onOpenDisclaimer}
            className={`transition-colors underline underline-offset-4 cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-teal-400' : 'text-slate-600 hover:text-teal-700'
            }`}
          >
            Sorumluluk Reddi
          </button>
        </div>
      </footer>
    </div>
  );
};
