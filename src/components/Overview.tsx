import React from 'react';
import { 
  Calculator, 
  Pill, 
  FlaskConical, 
  AlertTriangle, 
  FileText, 
  CheckSquare, 
  Phone, 
  BookMarked, 
  ArrowRight, 
  Search,
  Activity,
  HeartPulse,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { TabType } from '../types/clinical';

interface OverviewProps {
  onSelectTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  wardPendingCount: number;
}

export const Overview: React.FC<OverviewProps> = ({ onSelectTab, onOpenSearch, wardPendingCount }) => {
  const tools = [
    {
      id: 'calculators' as TabType,
      title: 'Klinik Hesaplayıcılar',
      desc: 'eGFR, BMI, İdame Sıvı (Holliday-Segar), Düzeltilmiş Ca, OAB, CURB-65, Anyon Açığı ve GKS skalası.',
      icon: Calculator,
      badge: '9 Hesaplayıcı',
      color: 'hover:border-teal-400 group-hover:text-teal-700'
    },
    {
      id: 'drugs' as TabType,
      title: 'İlaç Doz & İnfüzyon',
      desc: 'Elektronik pompa mL/saat, yerçekimi damla/dakika, mg/kg hasta dozajı ve sık kullanılan servis ilaç monografları.',
      icon: Pill,
      badge: 'Sulandırma & Hız',
      color: 'hover:border-blue-400 group-hover:text-blue-700'
    },
    {
      id: 'labs' as TabType,
      title: 'Laboratuvar & AKG Analizörü',
      desc: 'Mor, sarı, mavi kapak tüp referansları, yüksek/düşük nedenleri ve otomatik Arteriyel Kan Gazı asit-baz yorumlayıcı.',
      icon: FlaskConical,
      badge: 'Winter Formülü',
      color: 'hover:border-emerald-400 group-hover:text-emerald-700'
    },
    {
      id: 'protocols' as TabType,
      title: 'Acil Klinik Protokoller',
      desc: 'Anafilaksi İM adrenalin protokolü, hipoglisemi 15-15 kuralı, akut göğüs ağrısı ilk 10 dakika ve hipertansif acil yönetimi.',
      icon: AlertTriangle,
      badge: 'Adım Adım Eylem',
      color: 'hover:border-rose-400 group-hover:text-rose-700'
    },
    {
      id: 'notes' as TabType,
      title: 'SOAP & SBAR Devir Notu',
      desc: 'Uluslararası vizit notu (SOAP) ve nöbet devri (SBAR) yapılandırılmış metin oluşturucu, tek tıkla panoya kopyalama.',
      icon: FileText,
      badge: 'Hızlı Kopyala',
      color: 'hover:border-indigo-400 group-hover:text-indigo-700'
    },
    {
      id: 'ward' as TabType,
      title: 'Servis Nöbet Görevleri',
      desc: 'Vizit öncesi kanlar, pansumanlar, EKG ve konsültasyon takibi için kişiselleştirilmiş görev defteri.',
      icon: CheckSquare,
      badge: wardPendingCount > 0 ? `${wardPendingCount} Bekleyen İş` : 'Tümü Tamam',
      color: 'hover:border-amber-400 group-hover:text-amber-700'
    },
    {
      id: 'directory' as TabType,
      title: 'Klinik Dahili Rehber',
      desc: 'Radyoloji raporlama, kan merkezi, biyokimya laboratuvarı, klinik eczanesi ve nöbetçi kıdemli dahili hatları.',
      icon: Phone,
      badge: 'Tek Tıkla Dahili',
      color: 'hover:border-violet-400 group-hover:text-violet-700'
    },
    {
      id: 'abbreviations' as TabType,
      title: 'Kısaltmalar & Muayene',
      desc: 'Hasta dosyalarındaki tıbbi kısaltmalar sözlüğü ve baştan ayağa sistematik fizik muayene rehberi.',
      icon: BookMarked,
      badge: 'Kılavuz & Bakı',
      color: 'hover:border-sky-400 group-hover:text-sky-700'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner Section */}
      <div className="relative rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>KLİNİK ASİSTAN & İNTERN HEKİM ÇALIŞMA MASASI</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Klinik Kararlar ve Nöbetler İçin Hızlı Araç Merkezi
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                Vizitlerde, acil servis rotasyonlarında ve klinik servis nöbetlerinde ihtiyacınız olan hesaplayıcılar, dozaj rehberleri, laboratuvar yorumlamaları ve nöbet devir notları tek bir temiz ekranda.
              </p>
            </div>

            <div className="pt-6 sm:pt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Hızlı Araç veya İlaç Bul (Ctrl+K)</span>
              </button>

              <button
                onClick={() => onSelectTab('calculators')}
                className="flex items-center gap-2 px-4 py-2.5 bg-teal-50 text-teal-800 border border-teal-200/80 rounded-lg text-xs font-semibold hover:bg-teal-100 transition-colors"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Hesaplayıcılara Git</span>
              </button>

              <button
                onClick={() => onSelectTab('ward')}
                className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Nöbet Listesi ({wardPendingCount})</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100">
            <img
              src="/src/assets/images/clinic_hero_workspace_1792507004314.jpg"
              alt="Klinik Asistan Çalışma İstasyonu"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                // styled CSS fallback container
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Erişilebilir Klinik Araçlar</h2>
            <p className="text-xs text-slate-500">Doğrudan kullanmak istediğiniz aracı seçin</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onSelectTab(tool.id)}
                className={`text-left p-5 bg-white rounded-xl border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between group ${tool.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 group-hover:bg-slate-100 transition-colors">
                      <Icon className="w-5 h-5 text-slate-700 group-hover:text-teal-700 transition-colors" />
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500 font-mono">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-teal-800">
                  <span>Aracı Aç</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clinical Shift Pearls / High-Yield Box */}
      <div className="p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              İntern & Asistan Hekim İçin Nöbet Altın Kuralları
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Vizit Rehberi</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
            <div className="font-semibold text-teal-300">1. Vital Bulgular Önceliktir</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Kötüleşen hastada ilk yapılacak iş her zaman vitalleri (TA, Nabız, Ateş, Solunum Sayısı, SpO2) bizzat kontrol etmektir.
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
            <div className="font-semibold text-teal-300">2. Anafilakside Adrenalin Gecikmez</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Antihistaminik veya kortizon beklemeyin; stridor veya hipotansiyon varsa uyluk anterolateralinden derhal 0.5 mg İM Adrenalin yapın.
            </p>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1">
            <div className="font-semibold text-teal-300">3. Şüphede Kaldığında Danış</div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Kıdemli asistanı ve konsültanı erken aramak hastanın hayatını kurtarır; klinik durumda şüphe duyduğunuz anda haber verin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
