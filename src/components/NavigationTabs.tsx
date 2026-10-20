import React from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  Pill, 
  FlaskConical, 
  AlertTriangle, 
  FileText, 
  CheckSquare, 
  Phone, 
  BookMarked 
} from 'lucide-react';
import { TabType } from '../types/clinical';

interface NavigationTabsProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  wardPendingCount?: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ 
  activeTab, 
  onSelectTab,
  wardPendingCount = 0
}) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'Genel Bakış', icon: LayoutDashboard },
    { id: 'calculators' as TabType, label: 'Hesaplayıcılar', icon: Calculator },
    { id: 'drugs' as TabType, label: 'İlaç & İnfüzyon', icon: Pill },
    { id: 'labs' as TabType, label: 'Laboratuvar & AKG', icon: FlaskConical },
    { id: 'protocols' as TabType, label: 'Acil Protokoller', icon: AlertTriangle },
    { id: 'notes' as TabType, label: 'SOAP & Devir', icon: FileText },
    { id: 'ward' as TabType, label: 'Servis Görevleri', icon: CheckSquare, badge: wardPendingCount },
    { id: 'directory' as TabType, label: 'Dahili Rehber', icon: Phone },
    { id: 'abbreviations' as TabType, label: 'Kısaltmalar', icon: BookMarked },
  ];

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 overflow-x-auto py-2 no-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="font-mono text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
