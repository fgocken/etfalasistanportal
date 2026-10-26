import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  ShieldCheck, 
  ShieldAlert, 
  Stethoscope, 
  Wind, 
  HeartPulse, 
  Brain, 
  Eye, 
  ExternalLink, 
  BookOpen, 
  Info, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Thermometer,
  Zap
} from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface ModifiedAldreteInfographicProps {
  isDark: boolean;
  onOpenPADSS?: () => void;
}

interface AldreteCriterion {
  id: 'activity' | 'respiration' | 'circulation' | 'consciousness' | 'oxygenation';
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

const ALDRETE_CRITERIA: AldreteCriterion[] = [
  {
    id: 'activity',
    title: 'Aktivite (Motor Fonksiyon)',
    shortLabel: 'Aktivite',
    icon: Activity,
    description: 'İstemli veya sözel komutla ekstremite hareket kabiliyeti.',
    clinicalNote: 'Spinal/epidural anestezi sonrası motor blok çözülmesi (Bromage skoru) ve rezidüel nöromusküler blok (NMB) izlemi açısından esastır.',
    options: [
      {
        points: 2,
        label: '4 Ekstremiteyi Hareket Ettirir',
        description: 'İstemli veya komutla tüm 4 ekstremitede aktif ve amaca yönelik hareket mevcut.',
        badge: 'Normal / Tam Güç'
      },
      {
        points: 1,
        label: '2 Ekstremiteyi Hareket Ettirir',
        description: 'Yalnızca 2 ekstremitede (örn. sadece kollar veya tek taraf) hareket var.',
        badge: 'Kısmi / Rezidüel Blok'
      },
      {
        points: 0,
        label: 'Hiçbir Ekstremiteyi Hareket Ettiremez',
        description: 'Komutla veya istemli hiçbir kol ve bacakta hareket yok (tam paralizi/inaktivite).',
        badge: 'Hareketsiz / Derin Blok'
      }
    ]
  },
  {
    id: 'respiration',
    title: 'Solunum (Respiratuar Fonksiyon)',
    shortLabel: 'Solunum',
    icon: Wind,
    description: 'Solunum eforu, derinliği ve serbestçe öksürebilme kapasitesi.',
    clinicalNote: 'Opioid sedasyonu, rezidüel kürarizasyon veya havayolu kollapsı riski. Apne varlığında derhal solunum desteği sağlanmalıdır.',
    options: [
      {
        points: 2,
        label: 'Derin Nefes Alabilir & Serbestçe Öksürebilir',
        description: 'Solunum ritmik, derin, efor sarfetmeksizin rahat ve havayolu refleksleri (öksürük) korunmuş.',
        badge: 'Spontan & Yeterli'
      },
      {
        points: 1,
        label: 'Dispneik, Yüzeyel veya Sınırlı Solunum',
        description: 'Solunum sığ, yüzeyel, takipneik veya belirgin solunum eforu/dispne izleniyor.',
        badge: 'Kısıtlı / Dispne'
      },
      {
        points: 0,
        label: 'Apneik veya Mekanik Destek Gereksinimi',
        description: 'Spontan solunum yok, solunum arresti veya ventilatör/balon-maske zorunluluğu.',
        badge: 'Apne / Kritik'
      }
    ]
  },
  {
    id: 'circulation',
    title: 'Dolaşım (Sistemik Kan Basıncı)',
    shortLabel: 'Dolaşım',
    icon: HeartPulse,
    description: 'Sistemik arteriyel kan basıncının anestezi öncesi bazal düzeye oranı.',
    clinicalNote: 'Preoperatif bazal kan basıncı referans alınır. Hipovolemi, yetersiz analjezi, sempatik blok veya kanama işaret edebilir.',
    options: [
      {
        points: 2,
        label: 'Kan Basıncı Preop Düzeyin ± %20 Aralığında',
        description: 'Sistolik ve ortalama kan basıncı anestezi öncesi bazal değerin en fazla ± %20 farkındadır.',
        badge: 'Normotansif / Stabil'
      },
      {
        points: 1,
        label: 'Kan Basıncı Preop Düzeyin ± %20 – %49 Aralığında',
        description: 'Belirgin sapma: Bazal değerin %20 ile %49 altı (hipotansiyon) veya üstü (hipertansiyon).',
        badge: 'Ilımlı Hipo/Hipertansiyon'
      },
      {
        points: 0,
        label: 'Kan Basıncı Preop Düzeyin ± %50’sinden Farklı',
        description: 'Aşırı sapma: Bazal değerin yarısından düşük veya %50 üzerinde şiddetli hemodinamik instabilite.',
        badge: 'Ağır İnstabilite'
      }
    ]
  },
  {
    id: 'consciousness',
    title: 'Bilinç Durumu (Uyanıklık & Oryantasyon)',
    shortLabel: 'Bilinç',
    icon: Brain,
    description: 'Çevresel uyaranlara yanıt, oryantasyon ve kooperasyon düzeyi.',
    clinicalNote: 'Anestezik gazların ve santral etkili sedatiflerin atılımı. Sedasyon skalaları (RASS / POSS) ile eş zamanlı değerlendirilir.',
    options: [
      {
        points: 2,
        label: 'Tam Uyanık, Oryante & Kooperatif',
        description: 'Kişi, yer ve zamanı bilir; sözel sorulara net yanıt verir, komutları eksiksiz uygular.',
        badge: 'Tam Uyanık'
      },
      {
        points: 1,
        label: 'Sesli Uyaranla Uyanır (Gözlerini Açar)',
        description: 'Kendi kendine uyur halde; ancak seslenildiğinde gözlerini açar, uyarılınca komut alır.',
        badge: 'Uyarılabilir Sedasyon'
      },
      {
        points: 0,
        label: 'Uyaranlara Yanıtsız',
        description: 'Sesli uyaranlara tepkisiz; yalnızca derin ağrılı uyaranla minimal yanıt veya cevapsız.',
        badge: 'Yanıtsız / Derin Uyku'
      }
    ]
  },
  {
    id: 'oxygenation',
    title: 'O2 Satürasyonu (Puls Oksimetre - SpO2)',
    shortLabel: 'O2 Satürasyonu',
    icon: Eye,
    description: 'Puls oksimetre ile ölçülen periferik arteriyel hemoglobin oksijen saturasyonu.',
    clinicalNote: '1995 Aldrete revizyonu ile eski "cilt rengi" parametresinin yerine nesnel ölçüm olarak getirilmiştir.',
    options: [
      {
        points: 2,
        label: 'Oda Havasında SpO2 > %92',
        description: 'Ek oksijen desteğine gereksinim duymaksızın oda havasında güvenli saturasyon düzeyi.',
        badge: 'Oda Havasında Yeterli'
      },
      {
        points: 1,
        label: 'SpO2 > %90 Tutmak İçin Ek Oksijen Gerekir',
        description: 'Oda havasında desatüre olur; SpO2 > %90 sürdürmek için nazal kanül veya maske ile O2 gerekir.',
        badge: 'O2 Desteği Bağımlı'
      },
      {
        points: 0,
        label: 'Ek Oksijene Rağmen SpO2 < %90',
        description: 'Ek oksijen desteği verilmesine karşın hipoksemi devam eder (refrakter hipoksi).',
        badge: 'Hipoksemik / Kritik'
      }
    ]
  }
];

export const ModifiedAldreteInfographic: React.FC<ModifiedAldreteInfographicProps> = ({ isDark, onOpenPADSS }) => {
  // Calculator state: default all to 2 (healthy recovered state = 10 points)
  const [scores, setScores] = useState<Record<string, number>>({
    activity: 2,
    respiration: 2,
    circulation: 2,
    consciousness: 2,
    oxygenation: 2
  });

  const totalScore = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const hasZeroScore = Object.values(scores).some(val => val === 0);

  // Status calculation
  let statusBadge = {
    title: 'Servise Transfer Onaylı (Güvenli Derlenme)',
    subtitle: 'Hasta PACU’dan (Derlenme Odası) yataklı cerrahi servisine güvenle transfer edilebilir.',
    colorClass: 'text-emerald-700 dark:text-emerald-300',
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/15',
    borderClass: 'border-emerald-500/30',
    icon: CheckCircle2,
    recommendation: 'Standart servis taburculuk protokolü uygulanabilir. Transfer öncesi son vital bulgu seti ve pansuman kontrolü yapılmalıdır.'
  };

  if (hasZeroScore) {
    statusBadge = {
      title: 'Transfer Engeli: 0 Puan Alan Kritik Parametre Mevcut!',
      subtitle: 'Toplam puan ≥ 9 olsa dahi, herhangi bir parametreden 0 alan hasta servise GÖNDERİLEMEZ.',
      colorClass: 'text-rose-700 dark:text-rose-300',
      bgClass: 'bg-rose-500/10 dark:bg-rose-500/15',
      borderClass: 'border-rose-500/30',
      icon: ShieldAlert,
      recommendation: '0 puan alan parametrenin (apne, hipotansiyon/hipertansiyon, cevapsızlık, paralizi veya refrakter hipoksi) kök nedeni araştırılmalı ve düzeltilene kadar PACU’da kalınmalıdır.'
    };
  } else if (totalScore >= 9) {
    // Already set to safe
  } else if (totalScore >= 7) {
    statusBadge = {
      title: 'PACU’da Yakın Takibe Devam (Skor: 7 – 8)',
      subtitle: 'Derlenme henüz tam tamamlanmamıştır. Hasta PACU’da izlenmeye devam edilmelidir.',
      colorClass: 'text-amber-700 dark:text-amber-300',
      bgClass: 'bg-amber-500/10 dark:bg-amber-500/15',
      borderClass: 'border-amber-500/30',
      icon: AlertTriangle,
      recommendation: 'Vital bulgular 10-15 dakikada bir tekrarlanmalı; oksijen desteği, ağrı/sedasyon ve rezidüel blok kontrolü sürdürülmelidir. Skor ≥ 9 olana dek beklenmelidir.'
    };
  } else {
    statusBadge = {
      title: 'Kritik Durum / Aktif Resüsitasyon & İleri PACU Takibi (Skor < 7)',
      subtitle: 'Ciddi derlenme geriliği veya fizyolojik instabilite mevcuttur.',
      colorClass: 'text-rose-700 dark:text-rose-300',
      bgClass: 'bg-rose-500/10 dark:bg-rose-500/15',
      borderClass: 'border-rose-500/30',
      icon: ShieldAlert,
      recommendation: 'Rezidüel anestezi/nöromusküler blok, solunum depresyonu (nalokson/flumazenil gereksinimi?), hipotermi veya cerrahi kanama şüphesi hızla değerlendirilmeli; gerektiğinde Yoğun Bakım (YBÜ) konsültasyonu istenmelidir.'
    };
  }

  const handleSelectScore = (critId: string, pts: number) => {
    setScores(prev => ({
      ...prev,
      [critId]: pts
    }));
  };

  const handleResetToIdeal = () => {
    setScores({
      activity: 2,
      respiration: 2,
      circulation: 2,
      consciousness: 2,
      oxygenation: 2
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border-emerald-500/30' 
          : 'bg-gradient-to-r from-emerald-50 via-white to-slate-50 border-emerald-200 shadow-xs'
      }`}>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              PACU / DERLENME ODASI TABURCULUK PROTOKOLÜ
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Aldrete JA (1995 Revizyonu) & ASA Standartları
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Modifiye Aldrete Skoru (Modified Aldrete Scoring System)
          </h3>
          <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Genel, rejyonal veya sedasyon anestezisi alan hastaların <strong>Postanestezi Bakım Ünitesi'nden (PACU / Uyandırma Odası)</strong> cerrahi servise güvenli transfer edilebilirliğini objektif olarak ölçen 5 parametreli altın standart derlenme skoru.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <ShareLinkButton
            type="infografik"
            id="modified-aldrete"
            isDark={isDark}
            title="Modifiye Aldrete Skoru Bağlantısını Kopyala"
          />

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/7772368/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
            <span>PubMed (Aldrete 1995: PMID 7772368)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. Interactive Calculator & Status Hero Card */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500" />
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Canlı İnteraktif Aldrete Değerlendirici
              </h4>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Aşağıdaki 5 kriter için hastanın mevcut durumunu seçin; anlık skor ve klinik karar otomatik üretilir.
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

            {/* Total Score Display Pill */}
            <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${
              totalScore >= 9 && !hasZeroScore
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                : totalScore >= 7 && !hasZeroScore
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400'
                  : 'bg-rose-500/15 border-rose-500/40 text-rose-600 dark:text-rose-400'
            }`}>
              <div className="text-right">
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold">Toplam Skor</div>
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
              <span className="font-bold text-[11px] shrink-0 uppercase tracking-wide">Klinik Eylem:</span>
              <span>{statusBadge.recommendation}</span>
            </div>
          </div>
        </div>

        {/* The 5 Criteria Rows */}
        <div className="mt-6 space-y-4">
          {ALDRETE_CRITERIA.map((crit) => {
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
                      isDark ? 'bg-slate-800 text-emerald-400' : 'bg-white text-emerald-600 border border-slate-200'
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
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
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
                              ? 'bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20 shadow-xs'
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
                                ? opt.points === 2 ? 'text-emerald-700 dark:text-emerald-300' : opt.points === 1 ? 'text-amber-700 dark:text-amber-300' : 'text-rose-700 dark:text-rose-300'
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
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
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
                  <span>Klinik İncelik: {crit.clinicalNote}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Infographic Key Concept Cards: 3 Tiers of Recovery & Discharge Protocol */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tier 1: Skor >= 9 */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
          isDark 
            ? 'bg-gradient-to-b from-emerald-950/20 via-slate-900 to-slate-900 border-emerald-500/30' 
            : 'bg-emerald-50/50 border-emerald-200'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                GÜVENLİ TRANSFER
              </span>
              <span className="text-sm font-mono font-black text-emerald-600 dark:text-emerald-400">
                Skor: 9 – 10
              </span>
            </div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Servise Nakil Uygun
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Solunum ve havayolu korunmuş, hemodinami stabil, bilinç açık, 4 ekstremite hareketli veya kabul edilebilir motor fonksiyon var.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Hiçbir parametre 0 puan olmamalıdır.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>En az 30-45 dakika stabil PACU takibi tamamlanmış olmalıdır.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Cerrahi pansuman kuru, aktif drenaj / kanama kontrol altında.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
            ✓ Faz 1 Derlenme tamamlandı
          </div>
        </div>

        {/* Tier 2: Skor 7 - 8 */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
          isDark 
            ? 'bg-gradient-to-b from-amber-950/20 via-slate-900 to-slate-900 border-amber-500/30' 
            : 'bg-amber-50/50 border-amber-200'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300">
                PACU TAKİBİ
              </span>
              <span className="text-sm font-mono font-black text-amber-600 dark:text-amber-400">
                Skor: 7 – 8
              </span>
            </div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Takibe Devam Edilmeli
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Hasta uykulu, hafif dispneik, kan basıncı dalgalı veya ek O2 desteğine bağımlı. Henüz servise devredilemez.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>10-15 dakikada bir vital bulgu ve skor kontrolü.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Havayolu açıklığı, çene itme (jaw-thrust) ve O2 akımı kontrolü.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Rezidüel nöromusküler blok şüphesinde TOF monitörizasyonu.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-amber-700 dark:text-amber-300 font-semibold">
            ⏳ Derlenme devam ediyor (PACU'da kalış)
          </div>
        </div>

        {/* Tier 3: Skor < 7 veya 0 Puan */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
          isDark 
            ? 'bg-gradient-to-b from-rose-950/20 via-slate-900 to-slate-900 border-rose-500/30' 
            : 'bg-rose-50/50 border-rose-200'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300">
                KRİTİK / ALARM
              </span>
              <span className="text-sm font-mono font-black text-rose-600 dark:text-rose-400">
                Skor &lt; 7 veya 0 Puan
              </span>
            </div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Aktif Müdahale & Resüsitasyon
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Solunum yetmezliği, apne, derin hipotansiyon/şok, refrakter hipoksi veya uyandırılamayan koma durumu.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>Acil anestezi hekimi müdahalesi ve havayolu emniyeti.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>Kürar/opioid antagonizasyonu (Sugammadeks / Nalokson).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>Yoğun Bakım (YBÜ) nakli için hazırlık yapılması.</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-500/20 text-[11px] text-rose-700 dark:text-rose-300 font-semibold">
            🚨 Yoğun bakım veya acil re-entübasyon adayı
          </div>
        </div>
      </div>

      {/* 4. Deep Clinical Context: Faz 1 (PACU) vs Faz 2 (Günübirlik/PADSS) & Kritik Kontrol Noktaları */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-indigo-500" />
          <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Klinik Algoritma: Derlenme Fazları ve Modifiye Aldrete'nin Kapsamı
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Phase 1 Box */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">FAZ 1 DERLENME (PACU)</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                Hedef: Servise Transfer
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Ameliyat salonundan çıkış ile yaşamsal fonksiyonların servise güvenle devredilebilecek stabiliteye ulaştığı ilk dönemdir.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Ölçüm Aracı:</strong> Modifiye Aldrete Skoru (Skor ≥ 9).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Temel Odak:</strong> Solunum arresti, hemodinamik şok, rezidüel kürarizasyon ve laringospazm/aspirasyonun engellenmesi.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Sonuç:</strong> Yataklı cerrahi servise hemşire eşliğinde güvenli devir teslim.</span>
              </div>
            </div>
          </div>

          {/* Phase 2 Box */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400">FAZ 2 DERLENME (GÜNÜBİRLİK)</span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-300">
                Hedef: Eve Taburculuk
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              Günübirlik cerrahide hastanın hastaneden eve taburcu olabilmesi için Modifiye Aldrete <strong>tek başına yeterli DEĞİLDİR</strong>.
            </p>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Ölçüm Aracı:</strong> PADSS (Post-Anesthesia Discharge Scoring System).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Gerekli Ek Kriterler:</strong> Bulantı/kusmanın (PONV) olmaması, oral sıvı alabilme, kabul edilebilir ağrı (VAS ≤ 3), cerrahi kanama olmaması, refakatçi mevcudiyeti.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Sonuç:</strong> Yazılı ve sözlü postop talimatlar verilerek eve güvenli taburculuk.</span>
              </div>

              {onOpenPADSS && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenPADSS}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-700 dark:text-teal-300 border border-teal-500/30 transition-all cursor-pointer w-full justify-center shadow-xs"
                  >
                    <span>Faz 2 PADSS İnfografiğini İncele</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Anesthesia Discharge Safety Checklist */}
        <div className={`mt-4 p-4 rounded-xl border ${
          isDark ? 'bg-amber-950/15 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Klinik Güvenlik Kontrol Listesi: Transfer Öncesi 4 Altın Kural</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-200">1. Rezidüel Blok (NMB)</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Hasta 4 ekstremiteyi hareket ettirse bile TOF oranı &ge; 0.9 olmadan kürardan tam çıkmış sayılmaz.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-200">2. Normotermi</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Aksiller/timpanik vücut sıcaklığı &gt; 36.0°C olmalıdır. Hipotermi ilaç atılımını ve pıhtılaşmayı bozar.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-200">3. Analjezi & PONV</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Ağrı skoru VAS &le; 4 olmalı; dirençli bulantı veya aktif kusma kontrol altına alınmış olmalıdır.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-700 dark:text-slate-200">4. Stabilite Süresi</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Skor 9-10'a ulaştıktan sonra en az 15-30 dakika süreyle vital bulgular stabilitesini korumalıdır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Historical & Academic Reference Footnote */}
      <div className={`p-4 rounded-xl border text-xs space-y-2 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Literatür ve Tarihsel Gelişim</span>
        </div>
        <p className="leading-relaxed">
          <strong>1970 (Orijinal PARS):</strong> Dr. J. Antonio Aldrete tarafından tanımlandı. 5 parametre: Motor Aktivite, Solunum, Kan Basıncı, Bilinç ve <em>Cilt Rengi (Pembe / Soluk / Siyanoz)</em>.
        </p>
        <p className="leading-relaxed">
          <strong>1995 (Modifiye Aldrete):</strong> Cilt rengi subjektif olduğu ve farklı ten renklerinde yanıltıcı olabildiği için, puls oksimetre yaygınlaşmasıyla birlikte <em>SpO2 (Oksijen Satürasyonu)</em> parametresine dönüştürüldü. Günümüzde dünya genelinde PACU Faz 1 derlenme standardıdır.
        </p>
        <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
          Referans: <em>Aldrete JA. The post-anesthesia recovery score revisited. Journal of Clinical Anesthesia. 1995 Feb;7(1):89-91. doi: 10.1016/0952-8180(94)00001-k.</em>
        </div>
      </div>
    </div>
  );
};
