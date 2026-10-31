import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  ShieldAlert, 
  Heart, 
  Wind, 
  Brain, 
  Flame, 
  Droplet, 
  Zap, 
  Sliders, 
  FileText, 
  Scale, 
  Clock, 
  Stethoscope, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Layers, 
  Filter,
  ArrowLeft,
  Calculator,
  RefreshCw
} from 'lucide-react';

export type IcuCriteriaTabType = 'priority' | 'diagnosis' | 'objective' | 'levels' | 'scoring';

interface IcuAdmissionCriteriaViewProps {
  isDark: boolean;
  initialTab?: IcuCriteriaTabType;
  onBack?: () => void;
}

export const IcuAdmissionCriteriaView: React.FC<IcuAdmissionCriteriaViewProps> = ({ 
  isDark, 
  initialTab = 'priority',
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState<IcuCriteriaTabType>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSystem, setSelectedSystem] = useState<string>('all');
  const [expandedSystemId, setExpandedSystemId] = useState<string | null>('cardio');

  // Interactive SOFA calculator state
  const [sofaRespiration, setSofaRespiration] = useState<number>(0);
  const [sofaCoagulation, setSofaCoagulation] = useState<number>(0);
  const [sofaLiver, setSofaLiver] = useState<number>(0);
  const [sofaCardio, setSofaCardio] = useState<number>(0);
  const [sofaCns, setSofaCns] = useState<number>(0);
  const [sofaRenal, setSofaRenal] = useState<number>(0);

  const totalSofaScore = sofaRespiration + sofaCoagulation + sofaLiver + sofaCardio + sofaCns + sofaRenal;

  const resetSofa = () => {
    setSofaRespiration(0);
    setSofaCoagulation(0);
    setSofaLiver(0);
    setSofaCardio(0);
    setSofaCns(0);
    setSofaRenal(0);
  };

  // Interactive NEWS2 calculator state
  const [newsRr, setNewsRr] = useState<number>(0);
  const [newsSpo2, setNewsSpo2] = useState<number>(0);
  const [newsAirOxygen, setNewsAirOxygen] = useState<number>(0);
  const [newsSbp, setNewsSbp] = useState<number>(0);
  const [newsPulse, setNewsPulse] = useState<number>(0);
  const [newsConsciousness, setNewsConsciousness] = useState<number>(0);
  const [newsTemp, setNewsTemp] = useState<number>(0);

  const totalNewsScore = newsRr + newsSpo2 + newsAirOxygen + newsSbp + newsPulse + newsConsciousness + newsTemp;
  const hasNewsSingle3 = [newsRr, newsSpo2, newsAirOxygen, newsSbp, newsPulse, newsConsciousness, newsTemp].some(v => v === 3);

  const resetNews = () => {
    setNewsRr(0);
    setNewsSpo2(0);
    setNewsAirOxygen(0);
    setNewsSbp(0);
    setNewsPulse(0);
    setNewsConsciousness(0);
    setNewsTemp(0);
  };

  // Search indexing of clinical items
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];

    const items = [
      // Priority Model
      { tab: 'priority' as IcuCriteriaTabType, category: 'SCCM Triyaj Modeli', title: 'Öncelik 1 (Priority 1)', desc: 'Kritik hemodinamik/solunumsal instabilite, aktif organ desteği (İMV, vazopresör, CRRT). Septik şok, ARDS, kardiyojenik şok.' },
      { tab: 'priority' as IcuCriteriaTabType, category: 'SCCM Triyaj Modeli', title: 'Öncelik 2 (Priority 2)', desc: 'Yoğun monitörizasyon ihtiyacı, her an acil müdahale riski. Masif GİS kanaması riski, kardiyak/pulmoner dekompansasyon.' },
      { tab: 'priority' as IcuCriteriaTabType, category: 'SCCM Triyaj Modeli', title: 'Öncelik 3 (Priority 3)', desc: 'Koşullu kabul (DNR/DNI). Altta yatan terminal hastalıkla birlikte akut geri döndürülebilir tablo.' },
      { tab: 'priority' as IcuCriteriaTabType, category: 'SCCM Triyaj Modeli', title: 'Öncelik 4A & 4B', desc: '4A: Fazla iyi (servis/ara YBÜ). 4B: Terminal/geri dönüşümsüz (palyatif bakım).' },
      // Cardiovascular
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Kardiyovasküler', title: 'Komplike Akut MI & Kardiyojenik Şok', desc: 'STEMI/NSTEMI komplikasyonları, papiller kas rüptürü, VSD, dirençli anjina.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Kardiyovasküler', title: 'Şok Tabloları', desc: 'Hipovolemik, kardiyojenik, septik, anafilaktik, nörojenik, obstrüktif şok. MAP < 65 mmHg, vazopresör/inotrop ihtiyacı.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Kardiyovasküler', title: 'Malign Aritmiler & AV Blok', desc: 'Sürekli VT, VF arrest sonrası, instabil SVT, semptomatik Mobitz II veya tam AV blok.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Kardiyovasküler', title: 'Hipertansif Acil & Aort Diseksiyonu', desc: 'Akut hedef organ hasarlı hipertansiyon, tip A/B aort diseksiyonu, tamponad, post-arrest ROSC.' },
      // Respiratory
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Solunum', title: 'Akut Solunum Yetmezliği', desc: 'İMV, NIMV veya HFNC gerektiren Tip 1, 2, 3 ve Tip 4 solunum yetmezliği.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Solunum', title: 'Ağır KOAH & Akut Astım Atağı', desc: 'Solunum asidozu (pH < 7.25 - 7.30), solunum kası yorgunluğu, refrakter hipoksemi.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Solunum', title: 'Ağır Pnömoni & ARDS', desc: 'CURB-65 ≥ 3, PaO2/FiO2 < 300, prone pozisyonu, koruyucu mekanik ventilasyon.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Solunum', title: 'Masif Hemoptizi & Pulmoner Emboli', desc: '>100-200 mL/24h hemoptizi; hipotansiyon/şok ile seyreden masif PTE (trombolitik izlemi).' },
      // Neuro
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Nörolojik', title: 'Akut İnme (tPA / Trombektomi Sonrası)', desc: 'İlk 24 saat nörolojik izlem, intraserebral kanama, İKB monitörizasyonu.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Nörolojik', title: 'Status Epileptikus & Koma (GKS ≤ 8)', desc: 'Refrakter status, sürekli IV anestezik infüzyonu, EEG takibi, havayolu kaybı (GKS ≤ 8).' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Nörolojik', title: 'Nöromusküler Solunum Yetmezliği', desc: 'Myasthenia Gravis krizi, Guillain-Barré (FVC < 15-20 mL/kg, NIF < -20 cmH2O).' },
      // GIS & Renal & Sepsis
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Gastrointestinal', title: 'Masif GİS Kanama & Karaciğer Yetmezliği', desc: 'Hemodinamik instabilite, balon tamponadı, fulminan KC yetmezliği (INR > 1.5, ensefalopati).' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Gastrointestinal', title: 'Ağır Pankreatit & İntestinal İskemi', desc: 'Marshall ≥ 2, APACHE II ≥ 8, nekroz, abdominal kompartman sendromu takibi.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Renal & Metabolik', title: 'Şiddetli AKI (KDIGO Evre 3) & CRRT', desc: 'Dirençli hiperkalemi (>6.5), asidoz (pH < 7.15), CVVHDF/CRRT gereksinimi.' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Renal & Metabolik', title: 'Şiddetli DKA, HHD & Endokrin Krizler', desc: 'pH < 7.00, tiroid fırtınası, Addison krizi, ağır hiponatremi (<115), hiperkalsemi (>14).' },
      { tab: 'diagnosis' as IcuCriteriaTabType, category: 'Sepsis', title: 'Sepsis & Septik Şok (Sepsis-3)', desc: 'SOFA skoru artışı ≥ 2, MAP ≥ 65 mmHg için vazopresör + Laktat > 2 mmol/L.' },
      // Objectives
      { tab: 'objective' as IcuCriteriaTabType, category: 'Objektif Parametreler', title: 'Vital Kritik Eşikler', desc: 'Nabız < 40 veya > 150, SKB < 80 mmHg, MAP < 65 mmHg, DKB > 120 mmHg, Solunum < 8 veya > 35.' },
      { tab: 'objective' as IcuCriteriaTabType, category: 'Objektif Parametreler', title: 'Kan Gazı & Oksijenasyon Eşikleri', desc: 'PaO2 < 50 mmHg, P/F < 200, pH < 7.20 veya > 7.60, PaCO2 > 60 mmHg, Laktat > 2.0-4.0 mmol/L, SpO2 < %88.' },
      { tab: 'objective' as IcuCriteriaTabType, category: 'Objektif Parametreler', title: 'Biyokimya Kritik Eşikleri', desc: 'Na < 110 veya > 160, K < 2.0 veya > 6.5, Glukoz < 40 veya > 600, Kreatinin > 2-3x bazal, PLT < 20.000-50.000.' },
      // Levels
      { tab: 'levels' as IcuCriteriaTabType, category: 'Bakım Basamakları', title: '1., 2. ve 3. Basamak Standartları', desc: 'T.C. Sağlık Bakanlığı ve ESICM yoğun bakım basamak seviyeleri ve donanım kriterleri.' },
      // Scoring
      { tab: 'scoring' as IcuCriteriaTabType, category: 'Skorlama Sistemleri', title: 'SOFA (Sequential Organ Failure Assessment)', desc: 'Sepsis-3 tanısında organ disfonksiyonu puanlaması (Solunum, Koagülasyon, Karaciğer, KV, SSS, Renal).' },
      { tab: 'scoring' as IcuCriteriaTabType, category: 'Skorlama Sistemleri', title: 'NEWS2 (National Early Warning Score 2)', desc: 'Servis hastalarında kötüleşmeyi erken tespit eden ve YBÜ ihtiyacını belirleyen skorlama.' }
    ];

    return items.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className={`w-full rounded-2xl border flex flex-col shadow-sm transition-all overflow-hidden ${
      isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      {/* 1. Header Bar with Back Button */}
      <div className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDark ? 'bg-slate-800/80 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              title="Yoğun Bakım araç paneline dön"
              className={`p-2 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300' 
                  : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-2xs'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            isDark ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-800'
          }`}>
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Yoğun Bakım Endikasyonu (Kabul Kriterleri)
              </h2>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                isDark ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                SCCM & ESICM
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              SCCM, ESICM, Harrison&apos;s, Marino&apos;s The ICU Book ve T.C. Sağlık Bakanlığı Standartları
            </p>
          </div>
        </div>

        {/* Global Quick Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tanı, kriter, organ sistemi veya eşik ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border outline-none transition-all ${
              isDark 
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-rose-500' 
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-rose-600'
            }`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Live Search Results Overlay Panel */}
      {searchQuery.trim().length >= 2 && (
        <div className={`p-4 border-b space-y-2 ${
          isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-rose-50/70 border-rose-100'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300">
            <span>&quot;{searchQuery}&quot; için bulunan sonuçlar ({searchResults.length}):</span>
            <button 
              type="button" 
              onClick={() => setSearchQuery('')}
              className="text-[11px] underline cursor-pointer text-slate-500"
            >
              Aramayı Kapat
            </button>
          </div>
          {searchResults.length === 0 ? (
            <p className="text-xs text-slate-500 py-2">Eşleşen kriter bulunamadı.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {searchResults.map((res, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveTab(res.tab);
                    setSearchQuery('');
                  }}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                    isDark ? 'bg-slate-900/80 border-slate-700 hover:border-rose-500' : 'bg-white border-slate-200 hover:border-rose-500 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-0.5">
                    <span className="text-rose-600 dark:text-rose-400">{res.title}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {res.category}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] line-clamp-2">{res.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. Model Tabs Strip: 5 Distinct Tabs */}
      <div className={`px-4 sm:px-5 py-2 border-b flex items-center gap-1.5 overflow-x-auto ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100/70 border-slate-200'
      }`}>
        {[
          { id: 'priority' as IcuCriteriaTabType, label: '1. SCCM Triyaj Modeli', icon: Scale, badge: 'Öncelik 1-4' },
          { id: 'diagnosis' as IcuCriteriaTabType, label: '2. Tanı & Organ Sistemleri', icon: Heart, badge: '9 Sistem' },
          { id: 'objective' as IcuCriteriaTabType, label: '3. Objektif Parametreler', icon: Sliders, badge: 'Kritik Eşikler' },
          { id: 'levels' as IcuCriteriaTabType, label: '4. Bakım Basamakları', icon: Layers, badge: '1., 2., 3. Basamak' },
          { id: 'scoring' as IcuCriteriaTabType, label: '5. Skorlama (SOFA & NEWS2)', icon: Calculator, badge: 'Organ Disfonksiyonu' }
        ].map(tab => {
          const isSelected = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-rose-700 text-white shadow-xs'
                  : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                isSelected
                  ? 'bg-rose-900 text-rose-100'
                  : isDark
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Content */}
      <div className="p-4 sm:p-6 space-y-6">

        {/* ========================================================= */}
        {/* TAB 1: SCCM ÖNCELİKLENDİRME (TRİYAJ) MODELİ              */}
        {/* ========================================================= */}
        {activeTab === 'priority' && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-rose-50/50 border-rose-100'
            }`}>
              <Info className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  SCCM Önceliklendirme (Triyaj) Modeli Prensibi
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yoğun bakım kaynaklarının rasyonel kullanımı ve hastanın yoğun bakımdan göreceği <strong>maksimum faydayı (reversibilite / geri dönüşlülük)</strong> belirlemek amacıyla hastalar 4 ana öncelik kategorisine ayrılır.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Priority 1 */}
              <div className={`rounded-xl border p-4 sm:p-5 transition-all ${
                isDark ? 'bg-rose-950/20 border-rose-900/60' : 'bg-rose-50/60 border-rose-200'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 mb-3 border-rose-200/50 dark:border-rose-900/40">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse"></span>
                    <h3 className="text-sm font-black text-rose-700 dark:text-rose-300">
                      Öncelik 1 (Priority 1) — En Yüksek Öncelikli Kabul
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-600 text-white">
                    Tedavi Kısıtlaması Yoktur
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Klinik Tanım ve Hasta Profili:
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Kritik, hemodinamik veya solunumsal açıdan instabil; <strong>YBÜ dışında sağlanamayan yoğun organ desteği</strong> (invaziv mekanik ventilasyon, sürekli vazoaktif ilaç infüzyonu, CRRT) ve sürekli invaziv monitörizasyon gerektiren hastalar.
                    </p>
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 font-semibold">
                      *SCCM 2016: 1A (aktif organ desteği alan) ve 1B (organ desteği sınırında, hızla kötüleşen).
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Klinik Örnekler:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      <li>Septik şok (dirençli vazopresör ihtiyacı)</li>
                      <li>Ağır ARDS (koruyucu ventilasyon, prone pozisyonu)</li>
                      <li>Postoperatif kardiyojenik şok / instabil cerrahi hasta</li>
                      <li>Akut solunum yetmezliği (acil entübe / mekanik ventilasyon)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Priority 2 */}
              <div className={`rounded-xl border p-4 sm:p-5 transition-all ${
                isDark ? 'bg-amber-950/20 border-amber-900/60' : 'bg-amber-50/60 border-amber-200'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 mb-3 border-amber-200/50 dark:border-amber-900/40">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <h3 className="text-sm font-black text-amber-700 dark:text-amber-300">
                      Öncelik 2 (Priority 2) — Yoğun Monitörizasyon İhtiyacı
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white">
                    Tedavi Kısıtlaması Yoktur
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Klinik Tanım ve Hasta Profili:
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Yatış anında aktif yaşam desteği (entübasyon veya yüksek doz vazopresör) gerekmeyen ancak <strong>yoğun monitörizasyon ihtiyacı</strong> olan ve her an acil yoğun bakım müdahalesi gerekebilecek yüksek riskli hastalar.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Klinik Örnekler:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      <li>Kronik kalp/akciğer hastalığı zemininde akut ağır tablo</li>
                      <li>Masif gastrointestinal kanama riski olan instabil vaka</li>
                      <li>Yüksek riskli büyük cerrahi sonrası ilk 24 saat yakın takip</li>
                      <li>Ağır elektrolit dengesizliği / malign aritmi tehdidi</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Priority 3 */}
              <div className={`rounded-xl border p-4 sm:p-5 transition-all ${
                isDark ? 'bg-blue-950/20 border-blue-900/60' : 'bg-blue-50/60 border-blue-200'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 mb-3 border-blue-200/50 dark:border-blue-900/40">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <h3 className="text-sm font-black text-blue-700 dark:text-blue-300">
                      Öncelik 3 (Priority 3) — Koşullu / Sınırlı Kabul
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                    Tedavi Sınırları Belirlenebilir (DNR/DNI)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Klinik Tanım ve Hasta Profili:
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Kritik ve instabil durumda olan ancak <strong>altta yatan hastalığın doğası (son dönem organ yetmezliği, metastatik malignite vb.)</strong> nedeniyle uzun dönem sağkalım ve iyileşme potansiyeli belirgin şekilde azalmış hastalar.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Tedavi Yaklaşımı ve Sınırları:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                      <li>Akut geri döndürülebilir tabloyu düzeltmeye yönelik yoğun tedavi (O2, NIMV, IV antibiyotik, diüretik) verilir.</li>
                      <li>Entübasyon veya kardiyopulmoner resüsitasyon (KPR) uygulanmaması yönünde sınırlar önceden belirlenebilir.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Priority 4A & 4B */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 4A */}
                <div className={`rounded-xl border p-4 text-xs space-y-2 ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      Öncelik 4A (&quot;Fazla İyi&quot; / Too Well)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Servis / Ara YBÜ
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    YBÜ yatışından ek fayda görmeyecek kadar stabil olan, normal yataklı serviste veya ara yoğun bakımda güvenle izlenebilecek düşük riskli hastalar.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <strong>Örnek:</strong> Periferik damar cerrahisi sonrası stabil hasta, hafif DKA, stabil intoksikasyon.
                  </p>
                </div>

                {/* 4B */}
                <div className={`rounded-xl border p-4 text-xs space-y-2 ${
                  isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-500" />
                      Öncelik 4B (&quot;Fazla Ağır&quot; / Terminal)
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400">
                      Palyatif Bakım
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Geri dönüşümsüz (irreversibl) süreçte olan, yoğun bakım desteğinin sağkalımı değiştirmeyeceği ve palyatif bakım odaklı izlenmesi gereken hastalar.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <strong>Kural:</strong> Organ bağışı potansiyeli olan beyin ölümü vakaları hariç YBÜ&apos;ye yatırılmaz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TANI VE ORGAN SİSTEMLERİ BAZLI MODEL               */}
        {/* ========================================================= */}
        {activeTab === 'diagnosis' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* System Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Sistem Seç:
              </span>
              {[
                { id: 'all', label: 'Tüm Sistemler (9)' },
                { id: 'cardio', label: 'A. Kardiyovasküler' },
                { id: 'respiratory', label: 'B. Solunum' },
                { id: 'neuro', label: 'C. Nörolojik' },
                { id: 'gis', label: 'D. Gastrointestinal' },
                { id: 'renal_metabolic', label: 'E. Renal & Endokrin' },
                { id: 'sepsis', label: 'F. Sepsis & Enfeksiyon' },
                { id: 'trauma_burn', label: 'G. Cerrahi & Travma' },
                { id: 'heme_obs', label: 'H. Hematoloji & Obstetrik' },
                { id: 'toxicology', label: 'İ. Toksikoloji' }
              ].map(sys => (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setSelectedSystem(sys.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    selectedSystem === sys.id
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {sys.label}
                </button>
              ))}
            </div>

            {/* System Accordion Cards */}
            <div className="space-y-3">
              {/* A. Kardiyovasküler */}
              {(selectedSystem === 'all' || selectedSystem === 'cardio') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'cardio' ? null : 'cardio')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-rose-500/10 hover:bg-rose-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span className="text-rose-700 dark:text-rose-300">
                        A. Kardiyovasküler Sistem Yatış Endikasyonları
                      </span>
                    </div>
                    {expandedSystemId === 'cardio' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'cardio' || selectedSystem === 'cardio') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Akut Miyokard Enfarktüsü (Komplike):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Kardiyojenik şok, yaşamı tehdit eden ventriküler aritmiler, akut mekanik komplikasyonlar (papiller kas rüptürü, VSD, serbest duvar rüptürü) veya tıbbi tedaviye dirençli anjina ile seyreden olgular.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Şok Tabloları (Tüm Etyolojiler):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Hipovolemik, kardiyojenik, distributif (septik, anafilaktik, nörojenik) veya obstrüktif şok. Standart sıvı resüsitasyonuna yanıt vermeyen, invaziv arter basıncı monitörizasyonu ve vazopresör/inotrop infüzyonu gerektiren tüm durumlar.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          3. Kompleks ve Yaşamı Tehdit Eden Aritmiler:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Sürekli ventriküler taşikardi (VT), resüsite edilmiş ventriküler fibrilasyon (VF) sonrası izlem, hemodinamik instabilite yaratan supraventriküler taşikardiler veya geçici/kalıcı kalp pili gerektiren semptomatik yüksek dereceli / tam AV blok.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          4. Akut Dekompanse Kalp Yetmezliği ve Pulmoner Ödem:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Akut solunum yetmezliği, belirgin hipoperfüzyon bulguları; sürekli inotrop / vazodilatör infüzyonu veya mekanik dolaşım desteği (İABP, ECMO) gereksinimi olan tablolar.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          5. Hipertansif Aciller (Hypertensive Emergencies):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Akut hedef organ hasarı (hipertansif ensefalopati, akut sol kalp yetmezliği, eklampsi, akut böbrek hasarı) eşliğinde titre edilebilir IV antihipertansif infüzyon (örn. Nitrogliserin, Esmolol, Labetalol, Sodyum nitroprussid) gerektiren hastalar.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          6. Akut Vasküler & Perikardiyal Aciller ve Post-Arrest ROSC:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Akut tip A/B aort diseksiyonu, rüptüre aort anevrizması, kardiyak tamponad. Kardiyak arrest sonrası spontan dolaşımın geri dönüşü (ROSC) sağlanan, hedefli sıcaklık yönetimi (TTM) ve nöro-yoğun bakım gerektiren post-arrest hastaları.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* B. Solunum */}
              {(selectedSystem === 'all' || selectedSystem === 'respiratory') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'respiratory' ? null : 'respiratory')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-teal-500/10 hover:bg-teal-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <span className="text-teal-700 dark:text-teal-300">
                        B. Solunum Sistemi Yatış Endikasyonları
                      </span>
                    </div>
                    {expandedSystemId === 'respiratory' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'respiratory' || selectedSystem === 'respiratory') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Akut Solunum Yetmezliği (Tüm Tipler):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          İnvaziv mekanik ventilasyon (İMV), yakın izlemli non-invaziv mekanik ventilasyon (NIMV) veya yüksek akımlı nazal kanül (HFNC) gerektiren Tip 1 (Hipoksemik), Tip 2 (Hiperkapnik), Tip 3 (Perioperatif atelektazi) ve Tip 4 (Şoka bağlı perfüzyon yetmezliği).
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Ağır KOAH & Ağır Akut Astım Atağı:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Akut solunum asidozu (pH &lt; 7.25 - 7.30), solunum kası yorgunluğu bulguları, bilinç bulanıklığı, refrakter hipoksemi veya mekanik ventilasyon endikasyonu doğan hastalar.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          3. Ağır Pnömoni ve ARDS (Berlin Tanımı):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          CURB-65 &ge; 3, PSI Sınıf IV-V kriterlerini karşılayan toplum kökenli/hastane kökenli pnömoniler; PaO2/FiO2 &lt; 300 ile seyreden hafif, orta veya ağır ARDS tabloları (koruyucu ventilasyon, nöromusküler blokaj, prone pozisyonu izlemi).
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          4. Masif Hemoptizi & Yüksek Riskli Pulmoner Emboli:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Havayolu obstrüksiyon riski taşıyan masif hemoptizi (&gt;100-200 mL/24 saat); sistemik hipotansiyon/şok veya sağ ventrikül aşırı yüklenmesi eşliğinde sistemik trombolitik tedavi uygulanan masif/submasif PTE olguları.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* C. Nörolojik */}
              {(selectedSystem === 'all' || selectedSystem === 'neuro') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'neuro' ? null : 'neuro')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-indigo-500/10 hover:bg-indigo-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-indigo-700 dark:text-indigo-300">
                        C. Nörolojik Sistem Yatış Endikasyonları
                      </span>
                    </div>
                    {expandedSystemId === 'neuro' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'neuro' || selectedSystem === 'neuro') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Akut İskemik ve Hemorajik İnme:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          İntravenöz trombolitik (IV rt-PA) ve/veya mekanik trombektomi sonrası ilk 24 saat yakın nörolojik izlem, intrakraniyal kanama (SAB, intraserebral hematom) ve intrakraniyal basınç (İKB) artışı monitörizasyonu gereken olgular.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Refrakter Status Epileptikus:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          İlk basamak antikonvülzanlara yanıt vermeyen, sürekli IV anestezik infüzyonu (propofol, midazolam, tiyopental) ve sürekli EEG izlemi gerektiren status epileptikus tabloları.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          3. Bilinç Bozukluğu / Koma (GKS &le; 8):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Glaskow Koma Skalası &le; 8 olan, havayolunu koruma refleksleri (öksürük/öğürme) kaybolmuş ve aspirasyon riski nedeniyle elektif entübasyon gerektiren metabolik, toksik veya enfeksiyöz ensefalopatiler.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          4. Akut Nöromusküler Solunum Yetmezliği:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Myasthenia Gravis krizi veya Guillain-Barré Sendromu (FVC &lt; 15-20 mL/kg, NIF &lt; -20 cmH2O veya solunum kapasitesinde hızlı düşüş trendi).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* D. Gastrointestinal */}
              {(selectedSystem === 'all' || selectedSystem === 'gis') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'gis' ? null : 'gis')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-amber-500/10 hover:bg-amber-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Droplet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-amber-700 dark:text-amber-300">
                        D. Gastrointestinal Sistem Yatış Endikasyonları
                      </span>
                    </div>
                    {expandedSystemId === 'gis' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'gis' || selectedSystem === 'gis') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Masif ve Yaşamı Tehdit Eden GİS Kanamaları:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Hemodinamik instabilite, masif transfüzyon protokolü (MTP) gereksinimi, refrakter varis kanamaları (balon tamponadı, acil TIPS veya cerrahi hazırlık).
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Akut Fulminan Karaciğer Yetmezliği:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Akut karaciğer hasarı zemininde koagülopati (INR &gt; 1.5) ve hepatik ensefalopati gelişimi; serebral ödem ve acil transplantasyon izlemi.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          3. Ağır Akut Pankreatit & İntestinal İskemi:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Kalıcı organ yetmezliği (Marshall skoru &ge; 2, APACHE II &ge; 8), nekrotizan pankreatit, abdominal kompartman sendromu takibi; akut mezenterik iskemi ve peritonit.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* E. Renal & Endokrin & Metabolik */}
              {(selectedSystem === 'all' || selectedSystem === 'renal_metabolic') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'renal' ? null : 'renal')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-blue-500/10 hover:bg-blue-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-blue-700 dark:text-blue-300">
                        E. Renal, Endokrin ve Metabolik Sistemler
                      </span>
                    </div>
                    {expandedSystemId === 'renal' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'renal' || selectedSystem === 'renal_metabolic') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Şiddetli Akut Böbrek Hasarı (KDIGO Evre 3):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Tıbbi tedaviye dirençli hayatı tehdit eden hiperkalemi (&gt;6.5 mEq/L), dirençli metabolik asidoz (pH &lt; 7.15), refrakter pulmoner ödem; sürekli renal replasman tedavisi (CRRT / CVVHDF) gereksinimi.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Şiddetli DKA ve Hiperosmolar Hiperglisemik Durum (HHD):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Ağır asidoz (pH &lt; 7.00), bilinç kaybı, derin hemodinamik instabilite, akut kardiyak komorbidite veya sürekli IV insülin titrasyonu gerektiren kritik vakalar.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          3. Endokrin Krizler & Ağır Elektrolit Anomalileri:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Tiroid fırtınası (Burch-Wartofsky &ge; 45), miksödem koması, akut Addison krizi; semptomatik şiddetli hiponatremi (&lt;115 mEq/L), hipernatremi (&gt;160 mEq/L), hiperkalsemik kriz (&gt;14 mg/dL).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* F. Sepsis */}
              {(selectedSystem === 'all' || selectedSystem === 'sepsis') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'sepsis' ? null : 'sepsis')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-rose-500/10 hover:bg-rose-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span className="text-rose-700 dark:text-rose-300">
                        F. Enfeksiyon Hastalıkları ve Sepsis (Sepsis-3 Kriterleri)
                      </span>
                    </div>
                    {expandedSystemId === 'sepsis' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'sepsis' || selectedSystem === 'sepsis') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Sepsis ve Septik Şok:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Enfeksiyona bağlı organ disfonksiyonu (SOFA skorunda bazale göre &ge;2 artış) ve yeterli sıvı resüsitasyonuna rağmen MAP &ge; 65 mmHg tutmak için vazopresör gereksinimi + Serum Laktatı &gt; 2.0 mmol/L (&gt;18 mg/dL).
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Nekrotizan Yumuşak Doku Enfeksiyonları:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Nekrotizan fasiit, Fournier kangreni (acil tekrarlayan cerrahi debridmanlar, masif sıvı resüsitasyonu ve vazoaktif organ desteği).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* G. Cerrahi & Travma */}
              {(selectedSystem === 'all' || selectedSystem === 'trauma_burn') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'trauma' ? null : 'trauma')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-orange-500/10 hover:bg-orange-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-orange-700 dark:text-orange-300">
                        G. Cerrahi, Travma ve Yanık Endikasyonları
                      </span>
                    </div>
                    {expandedSystemId === 'trauma' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'trauma' || selectedSystem === 'trauma_burn') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Yüksek Riskli Postoperatif Hastalar:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Büyük kardiyotorasik ve abdominal aort cerrahileri, kraniofasiyal/nöroşirürji, ileri yaş veya ciddi komorbiditeleri (ASA III-IV) olan uzamış ameliyatlar.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Politravma ve Ağır Yanıklar:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          ISS (Injury Severity Score) &gt; 15-25, masif transfüzyon protokolü (MTP), flail chest; total yanık yüzey alanı (TBSA) &gt; %20-25 yanıklar ve inhalasyon hasarı.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          3. Abdominal Kompartman Sendromu (AKS):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          İntraabdominal basınç (İAB) &gt; 20 mmHg eşliğinde yeni gelişen organ disfonksiyonu (oligüri, ventilasyon zorluğu).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* H. Hematoloji & Obstetrik */}
              {(selectedSystem === 'all' || selectedSystem === 'heme_obs') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'heme' ? null : 'heme')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-purple-500/10 hover:bg-purple-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Stethoscope className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span className="text-purple-700 dark:text-purple-300">
                        H. Hematolojik, Onkolojik ve Obstetrik Aciller
                      </span>
                    </div>
                    {expandedSystemId === 'heme' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'heme' || selectedSystem === 'heme_obs') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Ağır Preeklampsi, Eklampsi ve HELLP Sendromu:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Şiddetli hipertansiyon, nöbet kontrolü (magnezyum sülfat protokolü), trombositopeni ve karaciğer hasarı; peripartum kardiyomiyopati ve amniyon sıvı embolisi.
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Şiddetli Koagülopati, TTP/HUS ve Tümör Lizis:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Yaygın damar içi pıhtılaşma (DIC), TTP (acil plazmaferez), sitokin salınım sendromu (CRS) ve akut anüri ile seyreden tümör lizis sendromu (TLS).
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* İ. Toksikoloji */}
              {(selectedSystem === 'all' || selectedSystem === 'toxicology') && (
                <div className={`rounded-xl border overflow-hidden transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <button
                    type="button"
                    onClick={() => setExpandedSystemId(expandedSystemId === 'tox' ? null : 'tox')}
                    className="w-full p-4 flex items-center justify-between text-left font-bold text-sm bg-cyan-500/10 hover:bg-cyan-500/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-cyan-700 dark:text-cyan-300">
                        İ. Toksikoloji ve Çevresel Aciller
                      </span>
                    </div>
                    {expandedSystemId === 'tox' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>

                  {(expandedSystemId === 'tox' || selectedSystem === 'toxicology') && (
                    <div className="p-4 sm:p-5 space-y-3 text-xs leading-relaxed divide-y divide-slate-100 dark:divide-slate-800">
                      <div className="pt-2">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          1. Ağır İntoksikasyonlar:
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Koma, solunum depresyonu, kardiyak aritmi, derin hipotansiyon veya inatçı nöbet yaratan zehirlenmeler (trisiklik antidepresanlar, kalsiyum kanal blokerleri, beta blokerler, organofosfatlar).
                        </p>
                      </div>

                      <div className="pt-3">
                        <strong className="text-slate-900 dark:text-white block font-bold mb-1">
                          2. Şiddetli Hipotermi ve Sıcak Çarpması (Hipertermi):
                        </strong>
                        <p className="text-slate-600 dark:text-slate-400">
                          Çekirdek vücut ısısı &lt; 30°C veya &gt; 40.5°C eşliğinde rabdomiyoliz, nörolojik hasar ve çoklu organ yetmezliği riski.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: OBJEKTİF PARAMETRELER MODELİ (KRİTİK EŞİK TABLOSU) */}
        {/* (KUTUCUK / İŞARETLEME OLMADAN, TEMİZ REFERANS TABLOLARI)    */}
        {/* ========================================================= */}
        {activeTab === 'objective' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-blue-50/50 border-blue-100'
            }`}>
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  SCCM Objektif Parametreler Modeli (Kritik Eşik Değerleri Kılavuzu)
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hastanın tanısından bağımsız olarak, aşağıdaki kritik fizyolojik ve laboratuvar eşik değerlerinden <strong>herhangi birinin varlığı</strong> doğrudan yoğun bakım yatış ve acil resüsitasyon endikasyonudur.
                </p>
              </div>
            </div>

            {/* Reference Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Group 1: Vital Bulgular */}
              <div className={`rounded-xl border overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="px-4 py-3 bg-rose-500/10 border-b border-rose-500/20 font-bold text-xs text-rose-700 dark:text-rose-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    1. Vital Bulgular
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">SCCM Eşik Değeri</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b text-[11px] font-bold ${
                        isDark ? 'border-slate-800 text-slate-400 bg-slate-800/40' : 'border-slate-100 text-slate-500 bg-slate-50'
                      }`}>
                        <th className="py-2.5 px-3">Fizyolojik Parametre</th>
                        <th className="py-2.5 px-3 text-right">Kritik Eşik</th>
                        <th className="py-2.5 px-3">Klinik Anlam</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Nabız / Kalp Hızı</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-600 dark:text-rose-400 text-right whitespace-nowrap">&lt; 40 /dk veya &gt; 150 /dk</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Ağır bradiaritmi veya dekompansatris aşırı taşikardi</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Sistolik Kan Basıncı (SKB)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-600 dark:text-rose-400 text-right whitespace-nowrap">&lt; 80 mmHg</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Veya hastanın olağan bazalinden &gt;40 mmHg düşüş</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Ortalama Arter Basıncı (MAP)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-600 dark:text-rose-400 text-right whitespace-nowrap">&lt; 65 mmHg</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Hayati organ otoregülasyon kaybı ve doku hipoperfüzyonu</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Diyastolik Kan Basıncı (DKB)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-600 dark:text-rose-400 text-right whitespace-nowrap">&gt; 120 mmHg</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Hipertansif acil zemininde hedef organ hasarı tehdidi</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Solunum Sayısı</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-rose-600 dark:text-rose-400 text-right whitespace-nowrap">&lt; 8 /dk veya &gt; 35 /dk</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Solunum depresyonu veya ağır kas yorgunluğu / solunum yetmezliği</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Group 2: Kan Gazı & Oksijenasyon */}
              <div className={`rounded-xl border overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="px-4 py-3 bg-teal-500/10 border-b border-teal-500/20 font-bold text-xs text-teal-700 dark:text-teal-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    2. Kan Gazı & Oksijenasyon Eşikleri
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Akut Bozulma</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b text-[11px] font-bold ${
                        isDark ? 'border-slate-800 text-slate-400 bg-slate-800/40' : 'border-slate-100 text-slate-500 bg-slate-50'
                      }`}>
                        <th className="py-2.5 px-3">Parametre</th>
                        <th className="py-2.5 px-3 text-right">Kritik Eşik</th>
                        <th className="py-2.5 px-3">Klinik Değerlendirme</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">PaO2</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400 text-right whitespace-nowrap">&lt; 50 mmHg</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Oda havasında veya oksijen desteğine rağmen ağır hipoksemi</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">PaO2 / FiO2 Oranı (P/F)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400 text-right whitespace-nowrap">&lt; 200</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">&lt;300 solunumsal distresle YBÜ; &lt;200 orta-ağır ARDS tablosu</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Arteriyel pH</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400 text-right whitespace-nowrap">&lt; 7.20 veya &gt; 7.60</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Malign asidemi veya yaşamı tehdit eden ağır alkaloz</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">PaCO2</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400 text-right whitespace-nowrap">&gt; 60 mmHg</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Akut asidoz ve solunum kas yorgunluğu eşliğinde Tip 2 yetmezlik</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Serum Laktat</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400 text-right whitespace-nowrap">&gt; 2.0 - 4.0 mmol/L</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Hücresel hipoksi ve anaerobik metabolizma (Sepsis/Şok kriteri)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Oksijen Satürasyonu (SpO2)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400 text-right whitespace-nowrap">&lt; %88</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Yüksek akımlı O2 / rezervuarlı maskeye rağmen refrakter değer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Group 3: Biyokimya & Hematoloji */}
              <div className={`rounded-xl border overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="px-4 py-3 bg-blue-500/10 border-b border-blue-500/20 font-bold text-xs text-blue-700 dark:text-blue-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    3. Biyokimya & Hematoloji Eşikleri
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Laboratuvar</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b text-[11px] font-bold ${
                        isDark ? 'border-slate-800 text-slate-400 bg-slate-800/40' : 'border-slate-100 text-slate-500 bg-slate-50'
                      }`}>
                        <th className="py-2.5 px-3">Test</th>
                        <th className="py-2.5 px-3 text-right">Kritik Eşik</th>
                        <th className="py-2.5 px-3">Klinik Risk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Serum Sodyum (Na+)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400 text-right whitespace-nowrap">&lt; 110 veya &gt; 160 mEq/L</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Serebral ödem, nöbet, koma ve ODS riski</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Serum Potasyum (K+)</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400 text-right whitespace-nowrap">&lt; 2.0 veya &gt; 6.5 mEq/L</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Ölümcül ventriküler aritmiler ve kardiyak arrest tehdidi</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Serum Glukoz</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400 text-right whitespace-nowrap">&lt; 40 veya &gt; 600 mg/dL</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Hipoglisemik koma veya hiperosmolar koma / DKA</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">İyonize Kalsiyum</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400 text-right whitespace-nowrap">&lt; 0.7 veya &gt; 1.6 mmol/L</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Miyokard depresyonu, tetani veya hiperkalsemik kriz</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Kreatinin / İdrar Çıkışı</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400 text-right whitespace-nowrap">&gt; 2-3x bazal / &lt;0.5 mL/kg/saat</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">KDIGO Evre 3 AKI, anüri, acil CRRT / diyaliz gereksinimi</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Trombosit Sayısı</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400 text-right whitespace-nowrap">&lt; 20.000 - 50.000 /µL</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Spontan intrakraniyal kanama veya aktif kanama riski</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">INR / aPTT</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-blue-600 dark:text-blue-400 text-right whitespace-nowrap">INR &gt; 2.5-3.0 / aPTT &gt; 2x kontrol</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Fulminan koagülopati, DIC veya antikoagülan intoksikasyonu</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Group 4: EKG, Radyoloji & Nörolojik Bulgular */}
              <div className={`rounded-xl border overflow-hidden ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="px-4 py-3 bg-purple-500/10 border-b border-purple-500/20 font-bold text-xs text-purple-700 dark:text-purple-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    4. EKG, Radyoloji & Nörolojik Eşikler
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Acil Müdahale</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className={`border-b text-[11px] font-bold ${
                        isDark ? 'border-slate-800 text-slate-400 bg-slate-800/40' : 'border-slate-100 text-slate-500 bg-slate-50'
                      }`}>
                        <th className="py-2.5 px-3">Bulgu / Modalite</th>
                        <th className="py-2.5 px-3 text-right">Kritik Eşik</th>
                        <th className="py-2.5 px-3">Klinik Eylem Planı</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">EKG: Malign Aritmi</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400 text-right whitespace-nowrap">Sürekli VT / VF sonrası</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Defibrilasyon/kardiyoversiyon, antiaritmik infüzyonu</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">EKG: İleri İleti Bloğu</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400 text-right whitespace-nowrap">Mobitz Tip II / Tam AV Blok</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Geçici transvenöz/transkütan kalp pili hazırlığı</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Glaskow Koma Skoru</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400 text-right whitespace-nowrap">GKS &le; 8 veya ani &ge;2 düşüş</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Havayolu koruma refleksi kaybı, acil entübasyon</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Pupil Muayenesi</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400 text-right whitespace-nowrap">Anizokori / Fiks Dilate Pupil</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Uncal herniasyon şüphesi, acil osmotik tedavi ve BT</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Beyin BT / MR</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400 text-right whitespace-nowrap">Akut İKK / Kitle Etkisi</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Orta hat şifti, İKB artışı izlemi, dekompresif cerrahi</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">Vasküler BT Anjiyografi</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-purple-600 dark:text-purple-400 text-right whitespace-nowrap">Aort Diseksiyonu / Rüptür</td>
                        <td className="py-2.5 px-3 text-slate-500 text-[11px]">Acil kan basıncı & kalp hızı kontrolü, acil KVC/girişimsel konsültasyon</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: BAKIM BASAMAKLARI MODELİ (1., 2. ve 3. BASAMAK)    */}
        {/* ========================================================= */}
        {activeTab === 'levels' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <Layers className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  T.C. Sağlık Bakanlığı ve ESICM Yoğun Bakım Basamak Sınıflaması
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Yoğun bakım üniteleri, hastaların klinik tablosunun ağırlığına, ihtiyaç duyulan organ destek sistemlerine (mekanik ventilatör, vazoaktif ajanlar, hemodiyaliz/CRRT) ve personelin uzmanlık donanımına göre 3 basamak halinde derecelendirilir.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              {/* 1. Basamak */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="font-black text-sm text-slate-800 dark:text-slate-200 block">1. Basamak YBÜ</span>
                      <span className="text-[11px] text-slate-500">Ara Yoğun Bakım / Step-Down</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      Hafif - Orta Risk
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Hasta Profili:</strong> Tek organ yetmezliği riski taşıyan, klinik tablosu stabil ancak serviste izlenmesi riskli olan hastalar.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Solunum Desteği:</strong> Düşük/orta akımlı O2, HFNC veya stabil NIMV. İnvaziv mekanik ventilatör rutin olarak uygulanmaz (entübasyon durumunda 2. veya 3. basamağa transfer gerekir).
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Monitörizasyon:</strong> Sürekli EKG, SpO2, NIBP, solunum frekansı takibi. İnvaziv arteriyel hat veya CVP nadiren uygulanır.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Vazoaktif İnfüzyon:</strong> Titre edilen vazoaktif infüzyonlar yapılmaz ya da çok düşük dozda tektir.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  Hemşire / Hasta Oranı: Genellikle 1:3 - 1:4
                </div>
              </div>

              {/* 2. Basamak */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                isDark ? 'bg-amber-950/20 border-amber-900/60' : 'bg-amber-50/60 border-amber-200 shadow-2xs'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-amber-200/50 dark:border-amber-900/40">
                    <div>
                      <span className="font-black text-sm text-amber-700 dark:text-amber-300 block">2. Basamak YBÜ</span>
                      <span className="text-[11px] text-slate-500">Standart Genel Yoğun Bakım</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white">
                      Aktif Organ Desteği
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Hasta Profili:</strong> Tek organ yetmezliği aktif olan veya birden fazla organ yetmezliği gelişme tehdidi altındaki kritik hastalar.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Solunum Desteği:</strong> İnvaziv mekanik ventilasyon (kısa ve orta süreli), gelişmiş NIMV ve HFNC protokolleri.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Monitörizasyon:</strong> İnvaziv arteriyel kan basıncı monitörizasyonu, santral venöz kateter (CVP), saatlik idrar çıkışı ve kan gazı takipleri.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Vazoaktif İnfüzyon:</strong> Tek vazoaktif/inotrop ajan infüzyonunun sürekli titrasyonu.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-amber-200/50 dark:border-amber-900/40 text-[11px] text-slate-500">
                  Hemşire / Hasta Oranı: Genellikle 1:2
                </div>
              </div>

              {/* 3. Basamak */}
              <div className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                isDark ? 'bg-rose-950/20 border-rose-900/60' : 'bg-rose-50/60 border-rose-200 shadow-2xs'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-rose-200/50 dark:border-rose-900/40">
                    <div>
                      <span className="font-black text-sm text-rose-700 dark:text-rose-300 block">3. Basamak YBÜ</span>
                      <span className="text-[11px] text-slate-500">Tersiyer / İleri Düzey Organ Desteği</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-600 text-white">
                      Çoklu Organ Yetmezliği
                    </span>
                  </div>

                  <div className="space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed">
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Hasta Profili:</strong> İki veya daha fazla organ yetmezliği (Çoklu Organ Yetmezliği - MOF), septik şok, ağır ARDS, komplike politravma ve büyük ameliyat sonrası kritik hastalar.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">İleri Düzey Yaşam Desteği:</strong> İleri ventilatör stratejileri (ARDSnet, prone ventilasyon), sürekli renal replasman (CRRT / CVVHDF), mekanik dolaşım desteği (İABP, ECMO).
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Monitörizasyon:</strong> İleri hemodinamik monitörizasyon (PiCCO, termodilüsyon, pulmoner arter kateteri), invaziv İKB ve sürekli EEG izlemi.
                    </p>
                    <p>
                      <strong className="text-slate-800 dark:text-slate-200">Vazoaktif İnfüzyon:</strong> Çoklu ve yüksek doz kombine vazoaktif/inotrop infüzyonları.
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-rose-200/50 dark:border-rose-900/40 text-[11px] text-slate-500">
                  Hemşire / Hasta Oranı: 1:1 veya en fazla 1:2
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: AYRI SEKMEDE SKORLAMA (SOFA VE NEWS2)               */}
        {/* ========================================================= */}
        {activeTab === 'scoring' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            {/* Header Banner */}
            <div className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-teal-50/60 border-teal-100'
            }`}>
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
                <div className="text-xs space-y-0.5">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                    Fizyolojik Skorlama Sistemleri (SOFA & NEWS2)
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">
                    Sepsis-3 organ disfonksiyonu tayini (SOFA) ve servis hastalarında bozulmayı erken saptayan Ulusal Erken Uyarı Skoru (NEWS2).
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 1: SOFA SCORE CALCULATOR & REFERENCE */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-teal-700 dark:text-teal-300 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-600" />
                    SOFA Skoru (Sequential Organ Failure Assessment)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Sepsis-3 tanısında enfeksiyona bağlı bazale göre <strong>&ge;2 puan artış</strong> akut organ disfonksiyonunu ve YBÜ ihtiyacını gösterir.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Hesaplanan SOFA Skoru:</span>
                    <span className="text-xl font-mono font-black text-teal-600 dark:text-teal-400">
                      {totalSofaScore} / 24 Puan
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={resetSofa}
                    title="Skoru sıfırla"
                    className="p-1.5 rounded-lg border text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SOFA Interactive Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                {/* 1. Solunum */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    1. Solunum (PaO2 / FiO2)
                  </span>
                  <select
                    value={sofaRespiration}
                    onChange={(e) => setSofaRespiration(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>P/F &ge; 400 (0 puan)</option>
                    <option value={1}>P/F &lt; 400 (+1 puan)</option>
                    <option value={2}>P/F &lt; 300 (+2 puan)</option>
                    <option value={3}>P/F &lt; 200 + Ventilatör (+3 puan)</option>
                    <option value={4}>P/F &lt; 100 + Ventilatör (+4 puan)</option>
                  </select>
                </div>

                {/* 2. Koagülasyon */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    2. Koagülasyon (Trombosit x10³/µL)
                  </span>
                  <select
                    value={sofaCoagulation}
                    onChange={(e) => setSofaCoagulation(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>Trombosit &ge; 150.000 (0 puan)</option>
                    <option value={1}>Trombosit &lt; 150.000 (+1 puan)</option>
                    <option value={2}>Trombosit &lt; 100.000 (+2 puan)</option>
                    <option value={3}>Trombosit &lt; 50.000 (+3 puan)</option>
                    <option value={4}>Trombosit &lt; 20.000 (+4 puan)</option>
                  </select>
                </div>

                {/* 3. Karaciğer */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    3. Karaciğer (Bilirubin mg/dL)
                  </span>
                  <select
                    value={sofaLiver}
                    onChange={(e) => setSofaLiver(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>Bilirubin &lt; 1.2 mg/dL (0 puan)</option>
                    <option value={1}>Bilirubin 1.2 - 1.9 mg/dL (+1 puan)</option>
                    <option value={2}>Bilirubin 2.0 - 5.9 mg/dL (+2 puan)</option>
                    <option value={3}>Bilirubin 6.0 - 11.9 mg/dL (+3 puan)</option>
                    <option value={4}>Bilirubin &ge; 12.0 mg/dL (+4 puan)</option>
                  </select>
                </div>

                {/* 4. Kardiyovasküler */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    4. Kardiyovasküler (MAP & Vazopresör)
                  </span>
                  <select
                    value={sofaCardio}
                    onChange={(e) => setSofaCardio(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>MAP &ge; 70 mmHg (0 puan)</option>
                    <option value={1}>MAP &lt; 70 mmHg (+1 puan)</option>
                    <option value={2}>Dopamin &le; 5 veya Dobutamin (herhangi) (+2 puan)</option>
                    <option value={3}>Norepinefrin &le; 0.1 veya Dopamin &gt; 5 (+3 puan)</option>
                    <option value={4}>Norepinefrin &gt; 0.1 veya Epinefrin &gt; 0.1 (+4 puan)</option>
                  </select>
                </div>

                {/* 5. Santral Sinir Sistemi */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    5. SSS (Glaskow Koma Skoru)
                  </span>
                  <select
                    value={sofaCns}
                    onChange={(e) => setSofaCns(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>GKS 15 (0 puan)</option>
                    <option value={1}>GKS 13 - 14 (+1 puan)</option>
                    <option value={2}>GKS 10 - 12 (+2 puan)</option>
                    <option value={3}>GKS 6 - 9 (+3 puan)</option>
                    <option value={4}>GKS &lt; 6 (+4 puan)</option>
                  </select>
                </div>

                {/* 6. Renal */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    6. Renal (Kreatinin mg/dL / İdrar)
                  </span>
                  <select
                    value={sofaRenal}
                    onChange={(e) => setSofaRenal(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>Kreatinin &lt; 1.2 mg/dL (0 puan)</option>
                    <option value={1}>Kreatinin 1.2 - 1.9 mg/dL (+1 puan)</option>
                    <option value={2}>Kreatinin 2.0 - 3.4 mg/dL (+2 puan)</option>
                    <option value={3}>Kreatinin 3.5 - 4.9 mg/dL veya &lt;500 mL/gün (+3 puan)</option>
                    <option value={4}>Kreatinin &ge; 5.0 mg/dL veya &lt;200 mL/gün (+4 puan)</option>
                  </select>
                </div>
              </div>

              {/* SOFA Mortality Risk Evaluation */}
              <div className={`p-3 rounded-xl flex items-center justify-between text-xs ${
                totalSofaScore >= 12
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                  : totalSofaScore >= 6
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
              }`}>
                <span className="font-bold">
                  {totalSofaScore >= 12 
                    ? 'Ağır Çoklu Organ Yetmezliği (Mortalite > %50-%80)'
                    : totalSofaScore >= 6
                      ? 'Belirgin Akut Organ Disfonksiyonu (Mortalite ~ %20-%40)'
                      : totalSofaScore >= 2
                        ? 'Sepsis / Akut Organ Disfonksiyonu Kriteri Karşılandı (SOFA ≥ 2)'
                        : 'Hafif / Normal Aralık (SOFA < 2)'}
                </span>
                <span className="font-semibold text-[11px]">
                  {totalSofaScore >= 2 ? 'YBÜ Yatış ve Organ Desteği Endike' : 'Rutin Takip'}
                </span>
              </div>
            </div>

            {/* SECTION 2: NEWS2 (NATIONAL EARLY WARNING SCORE 2) */}
            <div className={`p-5 rounded-2xl border space-y-4 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3 border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-sm font-black text-rose-700 dark:text-rose-300 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-600" />
                    NEWS2 Skoru (National Early Warning Score 2)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Servis hastalarında klinik bozulmayı öngören ve YBÜ / Acil Tıbbi Müdahale Takımı (MET) çağrısını tetikleyen kılavuz.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 block">Hesaplanan NEWS2 Skoru:</span>
                    <span className="text-xl font-mono font-black text-rose-600 dark:text-rose-400">
                      {totalNewsScore} Puan
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={resetNews}
                    title="Skoru sıfırla"
                    className="p-1.5 rounded-lg border text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* NEWS2 Calculator Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Solunum Sayısı */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Solunum Hızı (/dk)
                  </span>
                  <select
                    value={newsRr}
                    onChange={(e) => setNewsRr(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>12 - 20 /dk (0 puan)</option>
                    <option value={1}>9 - 11 /dk (+1 puan)</option>
                    <option value={2}>21 - 24 /dk (+2 puan)</option>
                    <option value={3}>&le; 8 veya &ge; 25 /dk (+3 puan)</option>
                  </select>
                </div>

                {/* SpO2 */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    SpO2 (%) (Ölçek 1)
                  </span>
                  <select
                    value={newsSpo2}
                    onChange={(e) => setNewsSpo2(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>&ge; %96 (0 puan)</option>
                    <option value={1}>%94 - %95 (+1 puan)</option>
                    <option value={2}>%92 - %93 (+2 puan)</option>
                    <option value={3}>&le; %91 (+3 puan)</option>
                  </select>
                </div>

                {/* O2 Desteği */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Hava / Ek Oksijen
                  </span>
                  <select
                    value={newsAirOxygen}
                    onChange={(e) => setNewsAirOxygen(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>Oda Havası (0 puan)</option>
                    <option value={2}>Oksijen Desteği Alıyor (+2 puan)</option>
                  </select>
                </div>

                {/* SKB */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Sistolik Kan Basıncı (mmHg)
                  </span>
                  <select
                    value={newsSbp}
                    onChange={(e) => setNewsSbp(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>111 - 219 mmHg (0 puan)</option>
                    <option value={1}>101 - 110 mmHg (+1 puan)</option>
                    <option value={2}>91 - 100 mmHg (+2 puan)</option>
                    <option value={3}>&le; 90 veya &ge; 220 mmHg (+3 puan)</option>
                  </select>
                </div>

                {/* Nabız */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Nabız / Kalp Hızı (/dk)
                  </span>
                  <select
                    value={newsPulse}
                    onChange={(e) => setNewsPulse(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>51 - 90 /dk (0 puan)</option>
                    <option value={1}>41 - 50 veya 91 - 110 /dk (+1 puan)</option>
                    <option value={2}>111 - 130 /dk (+2 puan)</option>
                    <option value={3}>&le; 40 veya &ge; 131 /dk (+3 puan)</option>
                  </select>
                </div>

                {/* Bilinç Düzeyi */}
                <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Bilinç Düzeyi (ACVPU)
                  </span>
                  <select
                    value={newsConsciousness}
                    onChange={(e) => setNewsConsciousness(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>Uyanık / Alert (0 puan)</option>
                    <option value={3}>Konfüzyon / Sesli / Ağrılı / Yanıtsız (CVPU) (+3 puan)</option>
                  </select>
                </div>

                {/* Vücut Sıcaklığı */}
                <div className={`p-3 rounded-xl border sm:col-span-2 ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Vücut Sıcaklığı (°C)
                  </span>
                  <select
                    value={newsTemp}
                    onChange={(e) => setNewsTemp(Number(e.target.value))}
                    className={`w-full p-2 rounded-lg text-xs border outline-none font-medium ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value={0}>36.1 - 38.0 °C (0 puan)</option>
                    <option value={1}>35.1 - 36.0 veya 38.1 - 39.0 °C (+1 puan)</option>
                    <option value={2}>&ge; 39.1 °C (+2 puan)</option>
                    <option value={3}>&le; 35.0 °C (Hipotermi) (+3 puan)</option>
                  </select>
                </div>
              </div>

              {/* NEWS2 Clinical Escalation Response */}
              <div className={`p-4 rounded-xl text-xs space-y-1 ${
                totalNewsScore >= 7
                  ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30'
                  : totalNewsScore >= 5 || hasNewsSingle3
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
              }`}>
                <div className="flex items-center justify-between font-bold">
                  <span>
                    {totalNewsScore >= 7 
                      ? 'YÜKSEK KLİNİK RİSK (Skor ≥ 7)' 
                      : (totalNewsScore >= 5 || hasNewsSingle3)
                        ? 'ORTA KLİNİK RİSK (Skor 5-6 veya tek parametrede 3 puan)' 
                        : 'DÜŞÜK KLİNİK RİSK (Skor 0-4)'}
                  </span>
                  <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-white/40 dark:bg-black/20 font-black">
                    {totalNewsScore >= 7 ? 'Acil YBÜ Yatışı' : (totalNewsScore >= 5 || hasNewsSingle3) ? 'Acil MET Çağrısı' : 'Servis Takibi'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {totalNewsScore >= 7
                    ? 'Derhal acil tıbbi müdahale ekibi (MET / Mavi Kod) ve Yoğun Bakım kıdemli hekimi çağrılmalıdır. Sürekli monitörizasyon başlatılmalı, hasta 2. veya 3. Basamak YBÜ’ye devredilmelidir.'
                    : (totalNewsScore >= 5 || hasNewsSingle3)
                      ? 'Acil hekim değerlendirmesi gerekir. Vital bulgu takip sıklığı saatte bire çıkarılmalı ve YBÜ ihtiyacı açısından değerlendirilmelidir.'
                      : 'Klinik tablo stabil. Standart servis izlemine devam edilir (en az 4-12 saatte bir vital takibi).'}
                </p>
              </div>
            </div>

            {/* SECTION 3: APACHE II/IV & SAPS 3 SUMMARY */}
            <div className={`p-4 rounded-xl border text-xs space-y-2 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-500" />
                Diğer Fizyolojik Skorlama Sistemleri (APACHE II/IV & SAPS 3)
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>APACHE II / APACHE IV:</strong> Yatışın ilk 24 saatindeki en anormal 12 fizyolojik parametre, yaş ve altta yatan kronik organ yetmezliğine dayanarak hastane içi mortalite riskini öngörür. Yatış endikasyonu triyajından ziyade, kalite kontrolü ve prognoz belirleme amacıyla kullanılır.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong>SAPS 3 (Simplified Acute Physiology Score):</strong> YBÜ yatış anındaki akut fizyoloji, yaş ve cerrahi durum verilerini kullanarak küresel mortalite riski hesaplar.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
