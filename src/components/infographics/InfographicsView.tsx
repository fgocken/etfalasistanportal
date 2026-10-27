import React, { useState } from 'react';
import { 
  BarChart3, 
  ExternalLink, 
  Info, 
  BookOpen, 
  ArrowLeft,
  ChevronRight,
  Heart,
  Activity,
  Layers,
  Sparkles,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';

import { SurgicalUrgency2024Infographic } from './SurgicalUrgency2024Infographic';
import { ModifiedAldreteInfographic } from './ModifiedAldreteInfographic';
import { PADSSInfographic } from './PADSSInfographic';
import { AdultFastingInfographic } from './AdultFastingInfographic';
import { PediatricFastingInfographic } from './PediatricFastingInfographic';
import { RSIvsElectiveInfographic } from './RSIvsElectiveInfographic';
import { ShareLinkButton } from '../common/ShareLinkButton';
import { updateHashRoute } from '../../utils/deepLink';

interface InfographicsViewProps {
  isDark: boolean;
  initialInfographicId?: string | null;
}

export interface InfographicCardItem {
  id: string;
  title: string;
  source: string;
  sourceBadge: string;
  category: string;
  shortDesc: string;
  pillsHeader: string;
  publisher: string;
  riskPills: { label: string; rate: string; colorClass: string; bgClass: string; borderClass: string }[];
  accentColor: string;
}

const INFOGRAPHIC_COLLECTION: InfographicCardItem[] = [
  {
    id: 'rsi-vs-elective',
    title: 'Hızlı Seri Entübasyon (RSI) vs Elektif Entübasyon',
    source: 'Difficult Airway Society (DAS) & Anesth Analg Kılavuzları',
    sourceBadge: 'DAS / ASA',
    category: 'Havayolu & Aspirasyon',
    shortDesc: 'Dolu mide aspirasyon profilaksisi (RSI) ile elektif indüksiyonun 10 kritik parametrede karşılaştırması: BMV yasağı, 1.2 mg/kg Rokuronyum, Sellick manevrası ve apneik oksijenasyon.',
    pillsHeader: 'Kritik RSI Farkları:',
    publisher: 'Anesth Analg / DAS Guidelines',
    riskPills: [
      { label: 'BMV', rate: 'YASAK', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Rokuronyum', rate: '1.2 mg/kg', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Oksijen', rate: 'NODESAT', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Kurtarma', rate: '16 mg/kg', colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-purple-500/10', borderClass: 'border-purple-500/30' },
    ],
    accentColor: 'rose'
  },
  {
    id: 'adult-fasting',
    title: 'Erişkin Preoperatif Açlık Kılavuzu (2 - 6 - 8 Kuralı)',
    source: 'ASA 2023 Güncellemesi & ESAIC Perioperatif Kılavuzları',
    sourceBadge: 'ASA 2023',
    category: 'Preop Açlık & Aspirasyon',
    shortDesc: 'Berrak sıvılar (2 sa), hafif öğün (6 sa), ağır/yağlı yemekler (8 sa), sakız çiğneme (vaka ertelenmez) ve GLP-1 (Ozempic/Wegovy) yönetimi.',
    pillsHeader: 'Açlık Pencereleri:',
    publisher: 'Anesthesiology / ESAIC',
    riskPills: [
      { label: 'Berrak Sıvı', rate: '2 Saat', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Hafif Öğün', rate: '6 Saat', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Ağır / Et', rate: '8 Saat', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'Sakız', rate: 'İptal Yok', colorClass: 'text-sky-600 dark:text-sky-400', bgClass: 'bg-sky-500/10', borderClass: 'border-sky-500/30' },
    ],
    accentColor: 'emerald'
  },
  {
    id: 'pediatric-fasting',
    title: 'Pediatrik Preoperatif Açlık Kılavuzu (6 - 4 - 3 - 1 Kuralı)',
    source: 'ESAIC 2022 / ESPA / APA Pediatrik Kılavuzları',
    sourceBadge: 'ESAIC 2022',
    category: 'Pediatri & Preop Açlık',
    shortDesc: 'Çocuklarda dehidratasyon, hipoglisemi ve ajitasyonu önleyen modern 6-4-3-1 açlık standardı: Berrak sıvılar 1 sa, anne sütü 3 sa, mama 4 sa, katı 6 sa.',
    pillsHeader: 'Pediatrik 6-4-3-1:',
    publisher: 'Eur J Anaesthesiol / ESPA',
    riskPills: [
      { label: 'Berrak Sıvı', rate: '1 Saat', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Anne Sütü', rate: '3 Saat', colorClass: 'text-teal-600 dark:text-teal-400', bgClass: 'bg-teal-500/10', borderClass: 'border-teal-500/30' },
      { label: 'Bebek Maması', rate: '4 Saat', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Katı / İnek Sütü', rate: '6 Saat', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
    ],
    accentColor: 'amber'
  },
  {
    id: 'modified-aldrete',
    title: 'Modifiye Aldrete Derlenme ve PACU Taburculuk Skoru',
    source: 'Aldrete JA (1995 Revizyonu) & ASA PACU Kılavuzu',
    sourceBadge: 'Aldrete 1995',
    category: 'Postop & Derlenme (PACU)',
    shortDesc: 'Genel ve rejyonal anestezi sonrası PACU’dan servise transfer güvenliğini belirleyen 5 parametreli altın standart Faz 1 derlenme skoru (0-10).',
    pillsHeader: 'Klinik Karar Eşikleri:',
    publisher: 'J Clin Anesth / ASA Guidelines',
    riskPills: [
      { label: 'Servis Onayı', rate: 'Skor ≥ 9', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'PACU Takip', rate: 'Skor 7 – 8', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Kritik / Alarm', rate: 'Skor < 7', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
    ],
    accentColor: 'emerald'
  },
  {
    id: 'padss',
    title: 'PADSS Günübirlik Cerrahi & Eve Taburculuk Skoru',
    source: 'Frances Chung (1995) & SAMBA Kılavuzları',
    sourceBadge: 'Chung 1995',
    category: 'Günübirlik & Eve Taburculuk (Faz 2)',
    shortDesc: 'Ayaktan cerrahi hastalarının ameliyat sonrası aynı gün eve güvenle taburcu edilebilmesini (Home-Readiness) sağlayan 5 parametreli altın standart Faz 2 derlenme skoru.',
    pillsHeader: 'Eve Taburculuk Eşiği:',
    publisher: 'J Clin Anesth / SAMBA',
    riskPills: [
      { label: 'Eve Taburcu', rate: 'PADSS ≥ 9', colorClass: 'text-teal-600 dark:text-teal-400', bgClass: 'bg-teal-500/10', borderClass: 'border-teal-500/30' },
      { label: 'Gözlem Uzat', rate: 'Skor 7 – 8', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Yatış Gerekir', rate: 'Skor < 7', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
    ],
    accentColor: 'teal'
  },
  {
    id: 'surgical-urgency-2024',
    title: 'Cerrahilerin Zamanlama ve Aciliyet Sınıflaması',
    source: '2024 AHA/ACC/ACS/ASNC/HRS/SCA Noncardiac Surgery Guideline',
    sourceBadge: 'AHA/ACC 2024',
    category: 'Zamanlama & Preop Yönetim',
    shortDesc: 'Cerrahi operasyonların zaman penceresine, yaşam/uzuv tehdidine ve MACE riskini azaltacak preoperatif müdahale olanağına göre 4 kademeli sınıflaması.',
    pillsHeader: '4 Kademeli Cerrahi Zaman Ufku:',
    publisher: 'Circulation (AHA / ACC)',
    riskPills: [
      { label: 'Acil', rate: '< 2 sa', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
      { label: 'İvedi', rate: '2 – 24 sa', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Zamana Duyarlı', rate: '≤ 3 ay', colorClass: 'text-sky-600 dark:text-sky-400', bgClass: 'bg-sky-500/10', borderClass: 'border-sky-500/30' },
      { label: 'Elektif', rate: 'Planlı', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
    ],
    accentColor: 'teal'
  },
  {
    id: 'surgical-risk',
    title: 'Cerrahilere Göre Cerrahi Risk Sınıflaması',
    source: 'ESC 2022 Kılavuzu (European Heart Journal)',
    sourceBadge: 'ESC 2022',
    category: 'Perioperatif Kardiyoloji',
    shortDesc: '30 günlük majör kardiyovasküler olay (MACE: ölüm, MI ve inme) riskine göre non-kardiyak cerrahilerin 3 kademeli sınıflaması.',
    pillsHeader: '30 Günlük MACE Riski Kademeleri:',
    publisher: 'Oxford Academic (OUP)',
    riskPills: [
      { label: 'Düşük', rate: '< %1', colorClass: 'text-emerald-600 dark:text-emerald-400', bgClass: 'bg-emerald-500/10', borderClass: 'border-emerald-500/30' },
      { label: 'Orta', rate: '%1 – %5', colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-500/10', borderClass: 'border-amber-500/30' },
      { label: 'Yüksek', rate: '> %5', colorClass: 'text-rose-600 dark:text-rose-400', bgClass: 'bg-rose-500/10', borderClass: 'border-rose-500/30' },
    ],
    accentColor: 'violet'
  }
];

export const InfographicsView: React.FC<InfographicsViewProps> = ({ isDark, initialInfographicId }) => {
  const normalizeId = (id: string | null | undefined): string | null => {
    if (!id) return null;
    if (id === 'surgical-urgency') return 'surgical-urgency-2024';
    return id;
  };

  // null = mini cards gallery view, string = open infographic view
  const [activeInfographicId, setActiveInfographicId] = useState<string | null>(() => {
    return normalizeId(initialInfographicId);
  });

  // Sync state if initialInfographicId changes (e.g. hash navigation)
  React.useEffect(() => {
    if (initialInfographicId) {
      setActiveInfographicId(normalizeId(initialInfographicId));
    }
  }, [initialInfographicId]);

  const handleSelectInfographic = (id: string | null) => {
    setActiveInfographicId(id);
    if (id) {
      updateHashRoute('infografik', id);
    } else {
      updateHashRoute('arac', 'infographics');
    }
  };

  const selectedInfographic = INFOGRAPHIC_COLLECTION.find(item => item.id === activeInfographicId);

  return (
    <div className={`rounded-xl border p-6 space-y-6 transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Top Header */}
      <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          {activeInfographicId ? (
            <button
              type="button"
              onClick={() => handleSelectInfographic(null)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="İnfografik galerisine geri dön"
            >
              <ArrowLeft className="w-5 h-5 text-violet-500" />
            </button>
          ) : (
            <div className={`p-2.5 rounded-xl ${
              isDark ? 'bg-violet-500/15 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-700 border border-violet-200'
            }`}>
              <BarChart3 className="w-6 h-6" />
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {activeInfographicId ? selectedInfographic?.title : 'Klinik İnfografikler'}
              </h3>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isDark ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30' : 'bg-violet-50 text-violet-700 border border-violet-200'
              }`}>
                {activeInfographicId ? 'İnfografik İnceleme' : 'İnfografik Koleksiyonu'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {activeInfographicId 
                ? 'İnfografiği kapatıp listeye dönmek için sol üstteki geri butonuna tıklayabilirsiniz.'
                : 'İnteraktif İnfografik Kartları'
              }
            </p>
          </div>
        </div>

        {activeInfographicId && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <ShareLinkButton
              type="infografik"
              id={activeInfographicId}
              isDark={isDark}
              title="Bu İnfografiğin Bağlantısını Kopyala"
            />
            <button
              type="button"
              onClick={() => handleSelectInfographic(null)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-violet-500" />
              <span>Tüm İnfografiklere Dön</span>
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: Mini Cards Gallery (When no infographic is opened) */}
      {!activeInfographicId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>İncelemek istediğiniz infografiğin üzerine tıklayın:</span>
            <span className="font-mono text-[11px]">{INFOGRAPHIC_COLLECTION.length} İnfografik</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INFOGRAPHIC_COLLECTION.map((card) => (
              <div
                key={card.id}
                onClick={() => handleSelectInfographic(card.id)}
                className={`group relative p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer select-none ${
                  isDark 
                    ? 'bg-slate-900/90 border-slate-800 hover:border-violet-500/50 hover:bg-slate-800/60 shadow-xs' 
                    : 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-md'
                }`}
              >
                <div>
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                      card.accentColor === 'rose'
                        ? 'bg-rose-500/15 text-rose-700 dark:text-rose-300'
                        : card.accentColor === 'amber'
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                          : card.accentColor === 'emerald'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                            : card.accentColor === 'teal'
                              ? 'bg-teal-500/15 text-teal-700 dark:text-teal-300'
                              : 'bg-violet-500/15 text-violet-600 dark:text-violet-300'
                    }`}>
                      {card.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-bold">
                      {card.sourceBadge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h4 className={`text-sm font-bold transition-colors ${
                    card.accentColor === 'rose'
                      ? 'group-hover:text-rose-600 dark:group-hover:text-rose-400'
                      : card.accentColor === 'amber'
                        ? 'group-hover:text-amber-600 dark:group-hover:text-amber-400'
                        : card.accentColor === 'emerald'
                          ? 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                          : card.accentColor === 'teal'
                            ? 'group-hover:text-teal-600 dark:group-hover:text-teal-400'
                            : 'group-hover:text-violet-500 dark:group-hover:text-violet-400'
                  } ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {card.title}
                  </h4>
                  <p className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {card.shortDesc}
                  </p>

                  {/* Visual Mini Preview Strip */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="text-[10px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                      <Activity className={`w-3 h-3 ${
                        card.accentColor === 'rose'
                          ? 'text-rose-500'
                          : card.accentColor === 'amber'
                            ? 'text-amber-500'
                            : card.accentColor === 'emerald'
                              ? 'text-emerald-500'
                              : card.accentColor === 'teal'
                                ? 'text-teal-500'
                                : 'text-violet-500'
                      }`} />
                      <span>{card.pillsHeader}</span>
                    </div>
                    <div className={`grid gap-1.5 text-center ${card.riskPills.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
                      {card.riskPills.map((pill, idx) => (
                        <div
                          key={idx}
                          className={`px-1 py-1 rounded-lg border text-[10px] font-mono ${pill.bgClass} ${pill.borderClass}`}
                        >
                          <div className={`font-semibold text-[9px] sm:text-[10px] truncate ${pill.colorClass}`}>{pill.label}</div>
                          <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400 truncate">{pill.rate}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium truncate max-w-[120px] sm:max-w-none">
                    {card.publisher}
                  </span>
                  <span className={`font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                    card.accentColor === 'rose'
                      ? 'text-rose-600 dark:text-rose-400'
                      : card.accentColor === 'amber'
                        ? 'text-amber-600 dark:text-amber-400'
                        : card.accentColor === 'emerald'
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : card.accentColor === 'teal'
                            ? 'text-teal-600 dark:text-teal-400'
                            : 'text-violet-600 dark:text-violet-400'
                  }`}>
                    <span>İnfografiği Aç</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}

            {/* Future Slot Placeholder Card */}
            <div className={`p-5 rounded-2xl border border-dashed flex flex-col items-center justify-center text-center p-6 transition-colors ${
              isDark ? 'border-slate-800 bg-slate-900/30 text-slate-500' : 'border-slate-200 bg-slate-50/50 text-slate-400'
            }`}>
              <div className={`p-3 rounded-xl mb-2 ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-400 shadow-xs'}`}>
                <PlusCircle className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Yeni İnfografikler</div>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 max-w-[200px]">
                Gelecekte eklenecek kılavuz ve infografikler bu alanda mini kart olarak listelenecektir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2A: RSI vs Elective Intubation Infographic */}
      {activeInfographicId === 'rsi-vs-elective' && (
        <RSIvsElectiveInfographic isDark={isDark} />
      )}

      {/* VIEW 2B: Adult Preoperative Fasting Infographic */}
      {activeInfographicId === 'adult-fasting' && (
        <AdultFastingInfographic 
          isDark={isDark} 
          onOpenPediatric={() => setActiveInfographicId('pediatric-fasting')}
        />
      )}

      {/* VIEW 2B: Pediatric Preoperative Fasting Infographic */}
      {activeInfographicId === 'pediatric-fasting' && (
        <PediatricFastingInfographic 
          isDark={isDark} 
          onOpenAdult={() => setActiveInfographicId('adult-fasting')}
        />
      )}

      {/* VIEW 2C: Modified Aldrete Score Infographic */}
      {activeInfographicId === 'modified-aldrete' && (
        <ModifiedAldreteInfographic 
          isDark={isDark} 
          onOpenPADSS={() => setActiveInfographicId('padss')}
        />
      )}

      {/* VIEW 2D: PADSS Outpatient Recovery Infographic */}
      {activeInfographicId === 'padss' && (
        <PADSSInfographic 
          isDark={isDark} 
          onBackToAldrete={() => setActiveInfographicId('modified-aldrete')}
        />
      )}

      {/* VIEW 2E: 2024 AHA/ACC Surgical Urgency Infographic */}
      {activeInfographicId === 'surgical-urgency-2024' && (
        <SurgicalUrgency2024Infographic isDark={isDark} />
      )}

      {/* VIEW 2B: ESC 2022 Surgical Risk Infographic */}
      {activeInfographicId === 'surgical-risk' && (
        <div className="space-y-5">
          {/* Infographic Banner */}
          <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDark 
              ? 'bg-gradient-to-r from-slate-900 via-slate-800/60 to-slate-900 border-slate-800' 
              : 'bg-gradient-to-r from-slate-50 via-white to-slate-50 border-slate-200 shadow-xs'
          }`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-violet-500/15 text-violet-600 dark:text-violet-300">
                  ESC 2022 KILAVUZU
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Non-Kardiyak Cerrahi</span>
              </div>
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Cerrahilere Göre Cerrahi Risk Sınıflaması
              </h4>
              <p className={`text-xs mt-0.5 max-w-2xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Cerrahiye bağlı risk; 30 günlük <strong>MACE (Major Adverse Cardiovascular Events: Kardiyovasküler Ölüm, Miyokard Enfarktüsü ve İnme)</strong> riskini ifade eder.
              </p>
            </div>

            <a
              href="https://academic.oup.com/view-large/570640891"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-500" />
              <span>Orijinal Tablo (OUP)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          {/* MACE Risk Definition Pill Bar */}
          <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs ${
            isDark ? 'bg-violet-950/20 border-violet-800/40 text-violet-200' : 'bg-violet-50/80 border-violet-200 text-violet-900'
          }`}>
            <span className="font-bold px-2 py-0.5 rounded bg-violet-500/20 text-violet-700 dark:text-violet-300 text-[11px] font-mono shrink-0">
              MACE Tanımı
            </span>
            <span className="text-[11px] leading-tight">
              <strong>MACE:</strong> Major Adverse Cardiovascular Events — 30 gün içinde gelişen kardiyovasküler mortalite, non-fatal miyokard enfarktüsü veya inme.
            </span>
          </div>

          {/* Quick-Glance 3-Tier Visual Columns (Direct, Scannable, No Extra Clutter) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. DÜŞÜK RİSK (< %1) */}
            <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between ${
              isDark 
                ? 'bg-gradient-to-b from-emerald-950/25 via-slate-900 to-slate-900 border-emerald-500/30' 
                : 'bg-gradient-to-b from-emerald-50/60 via-white to-white border-emerald-200 shadow-xs'
            }`}>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                    <h5 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      Düşük Risk
                    </h5>
                  </div>
                  <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    &lt; %1 MACE Riski
                  </span>
                </div>

                {/* Key takeaway */}
                <div className={`p-2.5 rounded-lg mb-3 text-[11px] leading-relaxed border ${
                  isDark ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900 font-medium'
                }`}>
                  ✓ Aktif kardiyak semptom yoksa rutin EKO / ileri tetkik gerekmez.
                </div>

                {/* Procedure List */}
                <div className="space-y-1.5 text-xs">
                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Meme Cerrahisi</div>
                    <div className="text-[10px] text-slate-400 italic">Breast surgery (mastektomi, lumpektomi)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Diş / Ağız Cerrahisi</div>
                    <div className="text-[10px] text-slate-400 italic">Dental surgery</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Endokrin: Tiroid Cerrahisi</div>
                    <div className="text-[10px] text-slate-400 italic">Endocrine: thyroid surgery (tiroidektomi)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Göz Cerrahisi</div>
                    <div className="text-[10px] text-slate-400 italic">Eye surgery (katarakt, vitrektomi vb.)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Minör Jinekolojik Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Minor gynaecological surgery (histeroskopi vb.)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Minör Ortopedik Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Minor orthopaedic (menisektomi, artroskopi)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Plastik &amp; Rekonstrüktif</div>
                    <div className="text-[10px] text-slate-400 italic">Reconstructive surgery</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Yüzeyel Cilt Cerrahisi</div>
                    <div className="text-[10px] text-slate-400 italic">Superficial surgery</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Minör Ürolojik Cerrahi (TUR-P vb.)</div>
                    <div className="text-[10px] text-slate-400 italic">Minor urological (transüretral prostat rezeksiyonu)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• VATS Minör Akciğer Rezeksiyonu</div>
                    <div className="text-[10px] text-slate-400 italic">VATS minor lung resection (kama rezeksiyon)</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-emerald-500/20 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">
                30 Günlük MACE Riski &lt; %1
              </div>
            </div>

            {/* 2. ORTA RİSK (%1 – %5) */}
            <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between ${
              isDark 
                ? 'bg-gradient-to-b from-amber-950/25 via-slate-900 to-slate-900 border-amber-500/30' 
                : 'bg-gradient-to-b from-amber-50/60 via-white to-white border-amber-200 shadow-xs'
            }`}>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                    <h5 className="text-sm font-bold text-amber-700 dark:text-amber-300">
                      Orta Risk
                    </h5>
                  </div>
                  <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    %1 – %5 MACE Riski
                  </span>
                </div>

                {/* Key takeaway */}
                <div className={`p-2.5 rounded-lg mb-3 text-[11px] leading-relaxed border ${
                  isDark ? 'bg-amber-950/40 border-amber-800/40 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900 font-medium'
                }`}>
                  ⚠️ ≥65 yaş veya KV risk faktörlerinde EKG, hs-cTn ve BNP önerilir.
                </div>

                {/* Procedure List */}
                <div className="space-y-1.5 text-xs">
                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• İntraperitoneal Cerrahiler</div>
                    <div className="text-[10px] text-slate-400 italic">Kolesistektomi, splenektomi, hiatal herni onarımı</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Majör Ortopedik / Spinal Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Total kalça/diz protezi, spinal cerrahi</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Karotis Endarterektomisi (CEA)</div>
                    <div className="text-[10px] text-slate-400 italic">Asemptomatik veya semptomatik açık CEA</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Endovasküler Aort Onarımı (EVAR)</div>
                    <div className="text-[10px] text-slate-400 italic">Endovascular aortic aneurysm repair</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Baş ve Boyun Cerrahisi</div>
                    <div className="text-[10px] text-slate-400 italic">Head or neck surgery (majör KBB, boyun diseksiyonu)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Majör Nörolojik Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Major neurological surgery (kraniyotomi vb.)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Majör Olmayan İntratorasik Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Non-major intrathoracic surgery</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Periferik Arteriyel Anjiyoplasti</div>
                    <div className="text-[10px] text-slate-400 italic">Peripheral arterial angioplasty</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Böbrek Transplantasyonu</div>
                    <div className="text-[10px] text-slate-400 italic">Renal transplants (böbrek nakli)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Majör Ürolojik / Jinekolojik Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Radikal histerektomi, nefrektomi vb.</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-amber-500/20 text-[10px] text-amber-600 dark:text-amber-400 font-mono font-semibold">
                30 Günlük MACE Riski %1 – %5
              </div>
            </div>

            {/* 3. YÜKSEK RİSK (> %5) */}
            <div className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between ${
              isDark 
                ? 'bg-gradient-to-b from-rose-950/25 via-slate-900 to-slate-900 border-rose-500/30' 
                : 'bg-gradient-to-b from-rose-50/60 via-white to-white border-rose-200 shadow-xs'
            }`}>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-500/20">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                    <h5 className="text-sm font-bold text-rose-700 dark:text-rose-300">
                      Yüksek Risk
                    </h5>
                  </div>
                  <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30">
                    &gt; %5 MACE Riski
                  </span>
                </div>

                {/* Key takeaway */}
                <div className={`p-2.5 rounded-lg mb-3 text-[11px] leading-relaxed border ${
                  isDark ? 'bg-rose-950/40 border-rose-900/40 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-900 font-medium'
                }`}>
                  🚨 Multidisipliner kardiyak değerlendirme ve invaziv hemodinami.
                </div>

                {/* Procedure List */}
                <div className="space-y-1.5 text-xs">
                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Aort ve Majör Vasküler Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Açık abdominal/torasik aort anevrizma onarımı</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Duodeno-Pankreatik Cerrahi</div>
                    <div className="text-[10px] text-slate-400 italic">Whipple ameliyatı, pankreatektomi</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Karaciğer Rezeksiyonu &amp; Safra Yolu</div>
                    <div className="text-[10px] text-slate-400 italic">Majör hepatektomi, hepatikojejunostomi</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Özofajektomi</div>
                    <div className="text-[10px] text-slate-400 italic">Yemek borusu rezeksiyonu (torakoabdominal)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Perfore Barsak Acil Onarımı</div>
                    <div className="text-[10px] text-slate-400 italic">Peritonit, sepsis, akut batın laparotomisi</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Pnömonektomi</div>
                    <div className="text-[10px] text-slate-400 italic">Tüm akciğerin çıkarılması (açık veya VATS)</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Akut Bacak İskemisi / Amputasyon</div>
                    <div className="text-[10px] text-slate-400 italic">Açık revaskülarizasyon veya majör amputasyon</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Karaciğer veya Akciğer Nakli</div>
                    <div className="text-[10px] text-slate-400 italic">Pulmonary or liver transplant</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Adrenal Bez Rezeksiyonu</div>
                    <div className="text-[10px] text-slate-400 italic">Adrenalektomi, feokromositoma rezeksiyonu</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Total Sistektomi</div>
                    <div className="text-[10px] text-slate-400 italic">Mesanenin çıkarılması ve üriner diversiyon</div>
                  </div>

                  <div className={`p-2 rounded-lg border ${
                    isDark ? 'bg-slate-800/40 border-slate-700/60 text-slate-200' : 'bg-white border-slate-100 text-slate-800 shadow-xs'
                  }`}>
                    <div className="font-bold">• Semptomatik Karotis Stenti (CAS)</div>
                    <div className="text-[10px] text-slate-400 italic">Symptomatic carotid artery stenting</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-rose-500/20 text-[10px] text-rose-600 dark:text-rose-400 font-mono font-semibold">
                30 Günlük MACE Riski &gt; %5
              </div>
            </div>

          </div>

          {/* Clinical Reference Footer Card */}
          <div className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isDark ? 'bg-slate-800/30 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
              <div className="leading-relaxed text-[11px]">
                <strong>Resmi Kaynak:</strong> <em>2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery.</em> European Heart Journal (academic.oup.com).
              </div>
            </div>

            <a
              href="https://academic.oup.com/view-large/570640891"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-400 hover:underline font-semibold shrink-0 inline-flex items-center gap-1 text-[11px]"
            >
              <span>academic.oup.com/view-large/570640891</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
