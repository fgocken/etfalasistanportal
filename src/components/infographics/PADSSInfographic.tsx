import React, { useState } from 'react';
import { 
  Home, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  HeartPulse, 
  Coffee, 
  AlertCircle, 
  BookOpen, 
  ExternalLink, 
  RotateCcw, 
  Sparkles, 
  UserCheck, 
  FileText, 
  PhoneCall, 
  Droplets,
  ArrowRight,
  Info
} from 'lucide-react';

interface PADSSInfographicProps {
  isDark: boolean;
  onBackToAldrete?: () => void;
}

interface PADSSCriterion {
  id: 'vitals' | 'activity' | 'nausea' | 'pain' | 'bleeding';
  title: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  clinicalNote: string;
  options: {
    points: 2 | 1 | 0;
    label: string;
    description: string;
    badge: string;
  }[];
}

const PADSS_CRITERIA: PADSSCriterion[] = [
  {
    id: 'vitals',
    title: '1. Yaşamsal Bulgular (Tansiyon & Nabız)',
    shortLabel: 'Vital Bulgular',
    icon: HeartPulse,
    description: 'Sistemik arteriyel kan basıncı ve nabzın preoperatif bazal değerlere uyumu.',
    clinicalNote: 'Hipotansiyon dehidratasyon veya gizli kanama; taşikardi ise ağrı, anksiyete veya hipovolemi belirtisi olabilir.',
    options: [
      {
        points: 2,
        label: 'Preop Bazal Değerin ± %20 Aralığında',
        description: 'Sistolik/diyastolik kan basıncı ve nabız anestezi öncesi bazale çok yakın ve stabil.',
        badge: 'Stabil / Normal'
      },
      {
        points: 1,
        label: 'Preop Bazal Değerin ± %20 – %40 Aralığında',
        description: 'Orta derece sapma; semptomsuz ancak yakın izlem gerektiren hemodinamik dalgalanma.',
        badge: 'Ilımlı Dalgalanma'
      },
      {
        points: 0,
        label: 'Preop Bazal Değerden > %40 Sapma',
        description: 'Ciddi hipo/hipertansiyon, bradikardi veya açıklanamayan belirgin taşikardi.',
        badge: 'İnstabil / Kritik'
      }
    ]
  },
  {
    id: 'activity',
    title: '2. Aktivite & Mobilizasyon (Denge & Yürüyüş)',
    shortLabel: 'Mobilizasyon',
    icon: Activity,
    description: 'Hastanın yardımsız kalkabilmesi, dengeli yürüyebilmesi ve baş dönmesi durumu.',
    clinicalNote: 'Ortostatik hipotansiyon ve rezidüel sedatif/nöromusküler etkiler düşme riskini artırır.',
    options: [
      {
        points: 2,
        label: 'Dengeli Yürüyüş, Baş Dönmesi Yok',
        description: 'Yardımsız ayağa kalkar, düz hatta sendeleyip düşmeksizin yürür, baş dönmesi tariflemez.',
        badge: 'Tam Bağımsız'
      },
      {
        points: 1,
        label: 'Yalnızca Destekle Yürüyebilir',
        description: 'Kendi başına yürüyemez; hemşire veya refakatçinin koluna girerek güvenle adım atabilir.',
        badge: 'Destekli / Yarı Bağımlı'
      },
      {
        points: 0,
        label: 'Belirgin Baş Dönmesi veya Yürüyemez',
        description: 'Ayağa kalkınca sersemlik/senkop hissi, dengesizlik veya yatağa bağımlı kalma hali.',
        badge: 'Yürüyemez / Düşme Riski'
      }
    ]
  },
  {
    id: 'nausea',
    title: '3. Bulantı ve Kusma (PONV)',
    shortLabel: 'Bulantı & Kusma',
    icon: Coffee,
    description: 'Postoperatif bulantı ve kusmanın şiddeti ile tedaviye yanıtı.',
    clinicalNote: 'Dirençli kusma dehidratasyona ve cerrahi yara hattında hematom/gerilime yol açabilir.',
    options: [
      {
        points: 2,
        label: 'Minimal (Yok veya Oral İlaçla Kontrol Altında)',
        description: 'Bulantı yok veya çok hafif; oral antiemetik ile tamamen baskılanmış, kusma yok.',
        badge: 'Semptomsuz / Hafif'
      },
      {
        points: 1,
        label: 'Orta Derece (Parenteral IV/IM Antiemetik Gerekir)',
        description: 'Oral alımı engelleyen bulantı veya 1 kez kusma; IV tedavi sonrası gerileme eğiliminde.',
        badge: 'IV Tedavi Gereksinimi'
      },
      {
        points: 0,
        label: 'Şiddetli & Dirençli (Tekrarlayan Kusma)',
        description: 'Çoklu antiemetiğe rağmen devam eden bulantı-öğürme, aktif kusma, oral sıvı alamama.',
        badge: 'Refrakter PONV'
      }
    ]
  },
  {
    id: 'pain',
    title: '4. Ağrı Kontrolü (Postop Analjezi)',
    shortLabel: 'Ağrı Düzeyi',
    icon: AlertCircle,
    description: 'Ağrının hastanın tolere edebileceği seviyede olması ve analjezik şekli.',
    clinicalNote: 'Eve gidecek hastanın parenteral opioide ihtiyaç duymaması, oral analjezikle ağrısının VAS ≤ 3 olması şarttır.',
    options: [
      {
        points: 2,
        label: 'Minimal / Kabul Edilebilir (Oral Analjezikle Kontrol)',
        description: 'Hafif ağrı (VAS ≤ 3); hasta reçete edilen oral analjeziklerle rahat ettiğini ifade eder.',
        badge: 'Oral Kontrol (VAS ≤ 3)'
      },
      {
        points: 1,
        label: 'Orta – Şiddetli (Parenteral / IV Analjezik Gerekir)',
        description: 'Oral ilaçlarla yatışmayan ağrı; IV parasetamol/NSAİİ veya ek doz gereksinimi.',
        badge: 'Parenteral Gereksinimi'
      },
      {
        points: 0,
        label: 'Dirençli Şiddetli Ağrı (Tedaviye Yanıtsız)',
        description: 'Uygulanan analjeziklere rağmen tolere edilemeyen şiddetli ağrı (VAS ≥ 7).',
        badge: 'Yanıtsız Şiddetli Ağrı'
      }
    ]
  },
  {
    id: 'bleeding',
    title: '5. Cerrahi Kanama (Pansuman & Dren Durumu)',
    shortLabel: 'Cerrahi Kanama',
    icon: Droplets,
    description: 'Cerrahi insizyon bölgesinden sızıntı, hematom varlığı ve pansuman değişim sayısı.',
    clinicalNote: 'Evde kanama tespiti gecikebileceğinden insizyon yerinin kuru ve stabil olması elzemdir.',
    options: [
      {
        points: 2,
        label: 'Minimal (Pansuman Değişimi Gerekmez)',
        description: 'Cerrahi yara temiz, pansuman kuru, aktif sızıntı veya hematom/şişlik yok.',
        badge: 'Kuru & Temiz'
      },
      {
        points: 1,
        label: 'Orta (En Fazla 2 Kez Pansuman Takviyesi)',
        description: 'Ilımlı seröz/kanlı sızıntı; pansuman üzerine ek gazlı bez konmasıyla kontrol altına alındı.',
        badge: 'Hafif Sızıntı'
      },
      {
        points: 0,
        label: 'Şiddetli (≥ 3 Pansuman Değişimi veya Aktif Kanama)',
        description: 'Sürekli pansumanı ıslatan aktif kanama, büyüyen hematom veya cerrahi revizyon şüphesi.',
        badge: 'Aktif Kanama / Alarm'
      }
    ]
  }
];

export const PADSSInfographic: React.FC<PADSSInfographicProps> = ({ isDark, onBackToAldrete }) => {
  // Calculator state: default all to 2 (10 points ideal)
  const [scores, setScores] = useState<Record<string, number>>({
    vitals: 2,
    activity: 2,
    nausea: 2,
    pain: 2,
    bleeding: 2
  });

  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const hasZeroScore = Object.values(scores).some(val => val === 0);

  // Status computation
  let statusBadge = {
    title: 'Eve Güvenli Taburculuk Onaylandı (PADSS ≥ 9)',
    subtitle: 'Hasta günübirlik cerrahi Faz 2 derlenmesini başarıyla tamamlamıştır. Eve taburcu edilebilir.',
    colorClass: 'text-teal-700 dark:text-teal-300',
    bgClass: 'bg-teal-500/10 dark:bg-teal-500/15',
    borderClass: 'border-teal-500/30',
    icon: CheckCircle2,
    recommendation: 'Sorumlu refakatçi eşliğinde, yazılı postop talimatlar, reçete ve 24 saat acil iletişim numarası teslim edilerek taburculuk tamamlanır.'
  };

  if (hasZeroScore) {
    statusBadge = {
      title: 'Taburculuk Engeli: 0 Puan Alan Kriter Mevcut!',
      subtitle: 'Toplam puan ≥ 9 olsa dahi herhangi bir kriterden 0 alan hasta EVE GÖNDERİLEMEZ.',
      colorClass: 'text-rose-700 dark:text-rose-300',
      bgClass: 'bg-rose-500/10 dark:bg-rose-500/15',
      borderClass: 'border-rose-500/30',
      icon: ShieldAlert,
      recommendation: 'Aktif kanama, dengesizlik/yürüyememe, dirençli kusma veya şiddetli ağrı kontrol altına alınana dek hasta klinikte tutulmalıdır. Gerekirse yatış kararı verilir.'
    };
  } else if (totalScore >= 9) {
    // Already safe
  } else if (totalScore >= 7) {
    statusBadge = {
      title: 'Gözlem Süresini Uzat (Skor: 7 – 8)',
      subtitle: 'Taburculuk kriterleri henüz tam sağlanamamıştır. Hasta günübirlik ünitede izlenmeye devam edilmelidir.',
      colorClass: 'text-amber-700 dark:text-amber-300',
      bgClass: 'bg-amber-500/10 dark:bg-amber-500/15',
      borderClass: 'border-amber-500/30',
      icon: AlertTriangle,
      recommendation: 'Oral hidrasyon, ek analjezik/antiemetik uygulanması ve 30-60 dakika sonra mobilizasyon ile skorlama tekrarlanmalıdır.'
    };
  } else {
    statusBadge = {
      title: 'Hastaneye Yatış (Gecelik Kalış) Endikasyonu (Skor < 7)',
      subtitle: 'Günübirlik cerrahi taburculuk güvenliği sağlanamamıştır.',
      colorClass: 'text-rose-700 dark:text-rose-300',
      bgClass: 'bg-rose-500/10 dark:bg-rose-500/15',
      borderClass: 'border-rose-500/30',
      icon: ShieldAlert,
      recommendation: 'Cerrahi ve anestezi hekimi hastayı yeniden değerlendirmeli; hastanın yataklı servise yatışı (overnight admission) planlanmalıdır.'
    };
  }

  const handleSelectScore = (critId: string, pts: number) => {
    setScores(prev => ({ ...prev, [critId]: pts }));
  };

  const handleResetToIdeal = () => {
    setScores({
      vitals: 2,
      activity: 2,
      nausea: 2,
      pain: 2,
      bleeding: 2
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
        isDark 
          ? 'bg-gradient-to-r from-teal-950/30 via-slate-900 to-slate-900 border-teal-500/30' 
          : 'bg-gradient-to-r from-teal-50 via-white to-slate-50 border-teal-200 shadow-xs'
      }`}>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
              FAZ 2 DERLENME · GÜNÜBİRLİK CERRAHİ PROTOKOLÜ
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Frances Chung (1995) & SAMBA Kılavuzları
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            PADSS (Post-Anesthetic Discharge Scoring System)
          </h3>
          <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Günübirlik ve ayaktan cerrahi operasyon geçiren hastaların <strong>hastaneden doğrudan eve güvenle taburcu edilebilmesini</strong> (Home-Readiness) değerlendiren 5 parametreli altın standart Faz 2 derlenme skoru.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          {onBackToAldrete && (
            <button
              type="button"
              onClick={onBackToAldrete}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
              }`}
            >
              <span>← Aldrete Skoru (Faz 1)</span>
            </button>
          )}

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/7481800/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-teal-900/30 hover:bg-teal-900/50 text-teal-200 border-teal-700/50' 
                : 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-300 shadow-xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>PubMed (Chung 1995: PMID 7481800)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. Interactive Calculator Hero */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-500" />
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Canlı İnteraktif PADSS Taburculuk Değerlendirici
              </h4>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Hastanın 5 klinik alanındaki güncel durumunu işaretleyin; eve taburculuk kararı ve öneriler anında oluşturulur.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={handleResetToIdeal}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Sıfırla (10 Puan)</span>
            </button>

            {/* Total Score Display */}
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
              totalScore >= 9 && !hasZeroScore
                ? 'bg-teal-500/15 border-teal-500/40 text-teal-600 dark:text-teal-400'
                : totalScore >= 7 && !hasZeroScore
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                  : 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400'
            }`}>
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold">PADSS Skoru</div>
                <div className="text-2xl font-black font-mono leading-none">{totalScore} <span className="text-xs font-normal">/ 10</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Status / Decision Box */}
        <div className={`mt-4 p-4 rounded-xl border flex flex-col sm:flex-row sm:items-start gap-3.5 ${statusBadge.bgClass} ${statusBadge.borderClass}`}>
          <statusBadge.icon className={`w-6 h-6 shrink-0 mt-0.5 ${statusBadge.colorClass}`} />
          <div className="space-y-1">
            <div className={`text-sm font-bold ${statusBadge.colorClass}`}>
              {statusBadge.title}
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {statusBadge.subtitle}
            </p>
            <div className={`text-xs mt-1.5 pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 flex items-start gap-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <span className="font-bold text-[11px] shrink-0 uppercase tracking-wide">Taburculuk Protokolü:</span>
              <span>{statusBadge.recommendation}</span>
            </div>
          </div>
        </div>

        {/* The 5 Criteria Rows */}
        <div className="mt-6 space-y-4">
          {PADSS_CRITERIA.map((crit) => {
            const currentVal = scores[crit.id];
            const Icon = crit.icon;

            return (
              <div 
                key={crit.id} 
                className={`p-4 rounded-xl border transition-all ${
                  isDark ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${
                      isDark ? 'bg-slate-800 text-teal-400' : 'bg-white text-teal-600 border border-slate-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {crit.title}
                      </h5>
                      <p className="text-[11px] text-slate-400">
                        {crit.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="text-[11px] font-mono text-slate-400">Seçilen:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                      currentVal === 2 
                        ? 'bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30'
                        : currentVal === 1
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30'
                    }`}>
                      {currentVal} Puan
                    </span>
                  </div>
                </div>

                {/* 3 Option Buttons (0, 1, 2) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {crit.options.map((opt) => {
                    const isSelected = currentVal === opt.points;
                    return (
                      <button
                        key={opt.points}
                        type="button"
                        onClick={() => handleSelectScore(crit.id, opt.points)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                          isSelected
                            ? opt.points === 2
                              ? 'bg-teal-500/15 border-teal-500 text-teal-950 dark:text-teal-100 ring-2 ring-teal-500/20 shadow-xs'
                              : opt.points === 1
                                ? 'bg-amber-500/15 border-amber-500 text-amber-950 dark:text-amber-100 ring-2 ring-amber-500/20 shadow-xs'
                                : 'bg-rose-500/15 border-rose-500 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/20 shadow-xs'
                            : isDark
                              ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/80 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className={`text-xs font-bold ${
                              isSelected
                                ? opt.points === 2 ? 'text-teal-700 dark:text-teal-300' : opt.points === 1 ? 'text-amber-700 dark:text-amber-300' : 'text-rose-700 dark:text-rose-300'
                                : isDark ? 'text-slate-200' : 'text-slate-800'
                            }`}>
                              {opt.label}
                            </span>
                            <span className={`text-[11px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-white/80 dark:bg-slate-900/80'
                                : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500'
                            }`}>
                              {opt.points} Puan
                            </span>
                          </div>
                          <p className="text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                            {opt.description}
                          </p>
                        </div>

                        <div className="mt-2 pt-1.5 border-t border-slate-200/40 dark:border-slate-700/40 flex items-center justify-between text-[10px]">
                          <span className="font-mono text-slate-400">{opt.badge}</span>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" /> Seçili
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Practical Clinical Tip */}
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 italic">
                  <Info className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Klinik İpucu: {crit.clinicalNote}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Essential Pre-Discharge Mandatory Checklist */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2 mb-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <UserCheck className="w-5 h-5 text-teal-500" />
          <div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Eve Taburculuk Zorunlu Güvenlik Kriterleri (Checklist)
            </h4>
            <p className="text-xs text-slate-400">
              PADSS skoru ≥ 9 olsa dahi aşağıdaki şartlar sağlanmadan hasta yalnız veya güvenliksiz bırakılamaz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>1. Sorumlu Yetişkin Refakatçi</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Hastanın yanında onu eve götürecek ve ilk 24 saat boyunca evde refakat edecek reşit ve sorumlu bir refakatçi bulunmalıdır. Taksiye yalnız bindirilmez.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 mt-2">✓ Mutlak Şart</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
                <Droplets className="w-4 h-4 shrink-0" />
                <span>2. Spontan İdrar Çıkışı (Miksiyon)</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Spinal/epidural blok, kasık fıtığı, pelvik veya rektal cerrahilerde taburculuk öncesi spontan idrar çıkışı görülmelidir (üriner retansiyon riski).
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 mt-2">✓ Spinal & Pelviste Zorunlu</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
                <Coffee className="w-4 h-4 shrink-0" />
                <span>3. Oral Sıvı Toleransı</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Hastanın bulantı veya kusma hissetmeksizin bir miktar su içebildiği doğrulanmalıdır. Aşırı sıvı içmeye zorlanmamalı, tolerans yeterlidir.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 mt-2">✓ Hidrasyon Güvenliği</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
                <FileText className="w-4 h-4 shrink-0" />
                <span>4. 24 Saatlik Yasal & Güvenlik Kısıtlamaları</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                İlk 24 saat: Araç veya motorlu taşıt kullanmama, karmaşık makine çalıştırmama, hukuki belge imzalamama ve alkol almama yazılı olarak teslim edilmelidir.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 mt-2">✓ Yazılı Onam & İkaz</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>5. 24 Saat Acil İletişim Hattı</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Gece boyunca evde gelişebilecek beklenmeyen kanama, nefes darlığı veya kontrolsüz ağrıda doğrudan ulaşılabilecek klinik/nöbetçi hekim dahili numarası verilmelidir.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 mt-2">✓ 7/24 Klinik İletişim</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold mb-1">
                <Activity className="w-4 h-4 shrink-0" />
                <span>6. Reçete ve Ağrı Yönetim Planı</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Oral analjezik dozları, antibiyotik (varsa), yara bakım kuralları ve ilk cerrahi kontrol randevu günü net olarak belirtilmelidir.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-700 dark:text-teal-300 mt-2">✓ Ev Tedavi Planı</span>
          </div>
        </div>
      </div>

      {/* 4. Comparison Table: Modifiye Aldrete vs PADSS */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/80 border-slate-200'
      }`}>
        <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <ArrowRight className="w-4 h-4 text-teal-500" />
          <span>Derlenme Fazları Karşılaştırma Matrisi (Faz 1 Aldrete vs Faz 2 PADSS)</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                <th className="py-2 px-3 font-semibold">Özellik</th>
                <th className="py-2 px-3 font-semibold text-emerald-600 dark:text-emerald-400">Modifiye Aldrete Skoru</th>
                <th className="py-2 px-3 font-semibold text-teal-600 dark:text-teal-400">PADSS Skoru</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-400">Uygulandığı Aşama</td>
                <td className="py-2.5 px-3"><strong>Faz 1 Derlenme:</strong> Ameliyathane çıkışı PACU / Uyandırma</td>
                <td className="py-2.5 px-3"><strong>Faz 2 Derlenme:</strong> Günübirlik taburculuk ünitesi</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-400">Nihai Hedef</td>
                <td className="py-2.5 px-3">Yataklı cerrahi servise devir teslim</td>
                <td className="py-2.5 px-3">Hastaneden eve güvenli taburculuk (Home-readiness)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-400">Ölçülen Kriterler</td>
                <td className="py-2.5 px-3">Aktivite, Solunum, Kan Basıncı, Bilinç, SpO2</td>
                <td className="py-2.5 px-3">Vital Bulgular, Mobilizasyon, Bulantı/Kusma, Ağrı, Kanama</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-400">Eşik Değer</td>
                <td className="py-2.5 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">≥ 9 / 10 (0 puan yok)</td>
                <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">≥ 9 / 10 (0 puan yok)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-medium text-slate-400">Ek Güvenlik Gereksinimleri</td>
                <td className="py-2.5 px-3">TOF &ge; 0.9, Normotermi &gt; 36°C</td>
                <td className="py-2.5 px-3">Refakatçi, Oral sıvı toleransı, Spontan miksiyon</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Historical & Academic Reference Footnote */}
      <div className={`p-4 rounded-xl border text-xs space-y-2 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-teal-500" />
          <span>Literatür ve Kanıt Temeli</span>
        </div>
        <p className="leading-relaxed">
          Dr. Frances Chung ve meslektaşları tarafından 1995 yılında geliştirilen <strong>PADSS (Post-Anesthetic Discharge Scoring System)</strong>, ambulatuvar cerrahide eve taburculuk için sübjektif değerlendirmelerin yerine objektif ve standardize kriterler getirmiştir. Society for Ambulatory Anesthesia (SAMBA) ve uluslararası günübirlik cerrahi kılavuzları tarafından Faz 2 derlenme standardı olarak tavsiye edilmektedir.
        </p>
        <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
          Referans: <em>Chung F, Chan VW, Ong D. A post-anesthetic discharge scoring system for home readiness after ambulatory surgery. Journal of Clinical Anesthesia. 1995 Sep;7(6):500-506. PMID: 7481800. doi: 10.1016/0952-8180(95)00130-a.</em>
        </div>
      </div>
    </div>
  );
};
