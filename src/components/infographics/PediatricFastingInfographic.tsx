import React, { useState } from 'react';
import { 
  Baby, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  ExternalLink, 
  RotateCcw, 
  Sparkles, 
  Milk, 
  Droplets, 
  Apple, 
  HeartCrack, 
  HeartPulse, 
  Info, 
  Layers, 
  Zap, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ShareLinkButton } from '../common/ShareLinkButton';

interface PediatricFastingInfographicProps {
  isDark: boolean;
  onOpenAdult?: () => void;
}

interface PediatricFastingRule {
  id: 'clear-fluids' | 'breast-milk' | 'formula' | 'solids';
  name: string;
  hours: number;
  badgeLabel: string;
  badgeColor: string;
  targetGroup: string;
  examples: string[];
  recommendation: string;
  physiologicalRationale: string;
  aspirationSafety: string;
}

const PEDIATRIC_RULES: PediatricFastingRule[] = [
  {
    id: 'clear-fluids',
    name: 'Berrak Sıvılar (Su, Elma Suyu, Şekerli Berrak Sıvılar)',
    hours: 1,
    badgeLabel: '1 Saat (Yeni Standart)',
    badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    targetGroup: 'Tüm yaş grupları (bebekler ve çocuklar)',
    examples: [
      'Su, berrak posasız elma suyu',
      'Şekerli berrak sıvılar / berrak meyve aromalı içecekler',
      'Sütsüz açık çay, berrak elektrolit solüsyonları (pediatrik)'
    ],
    recommendation: 'ESAIC 2022 & ESPA / APA: Elektif cerrahi indüksiyonuna 1 saat kalana kadar çocuklara berrak sıvı verilmeli ve özellikle susayan çocuklar teşvik edilmelidir.',
    physiologicalRationale: 'Çocuklarda berrak sıvıların %95’i 30-45 dakika içinde mideden duodenuma geçer. 1 saatlik süre aspirasyon riskini artırmaksızın dehidratasyon ve ajitasyonu dramatik şekilde azaltır.',
    aspirationSafety: 'Aspirasyon riski klasik 2 saat kuralı ile eşdeğerdir (GRADE 1C kanıt düzeyi).'
  },
  {
    id: 'breast-milk',
    name: 'Anne Sütü (Breast Milk)',
    hours: 3,
    badgeLabel: '3 Saat (Avrupa Kılavuzu)',
    badgeColor: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
    targetGroup: 'Emzirilen bebekler ve küçük çocuklar',
    examples: [
      'Doğrudan anne memesiyle emzirme',
      'Biberonla verilen sağılmış taze anne sütü'
    ],
    recommendation: 'ESAIC 2022 Kılavuzu: Anne sütü ile beslenen bebeklerde elektif anestezi öncesi 3 saatlik açlık yeterlidir (Klasik Amerikan yaklaşımı 4 saattir).',
    physiologicalRationale: 'Anne sütündeki protein ve yağ profili bebek fizyolojisine kusursuz uyumludur; kazein oranı düşüktür ve inek sütü veya formül mamaya göre mideden çok daha hızlı boşalır.',
    aspirationSafety: '3 saatlik açlık bebek midesinde rezidüel volümü güvenli sınırlara indirir.'
  },
  {
    id: 'formula',
    name: 'Bebek Maması (Formül Süt / Bebek Formülü)',
    hours: 4,
    badgeLabel: '4 Saat',
    badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    targetGroup: 'Mama ile beslenen bebekler ve 1 yaş altı süt çocukları',
    examples: [
      'Standart toz/sıvı bebek mamaları (Formül 1, 2 vb.)',
      'Özel hidrolize veya hipoalerjenik bebek mamaları'
    ],
    recommendation: 'Elektif anestezi öncesi formül süt alımına en az 4 saat önce son verilmelidir.',
    physiologicalRationale: 'Formül mama anne sütüne göre daha yüksek kazein ve bitkisel yağ fraksiyonu içerir; gastrik boşalma süresi ortalama 3.5 - 4 saattir.',
    aspirationSafety: '4 saat sonrasında mide boşalması güvenli eşik değerlere ulaşır.'
  },
  {
    id: 'solids',
    name: 'İnek Sütü & Katı Gıdalar (Hafif veya Ağır Öğünler)',
    hours: 6,
    badgeLabel: '6 Saat',
    badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    targetGroup: 'Ek gıda alan bebekler ve büyük çocuklar',
    examples: [
      'İnek sütü, keçi sütü, yoğurt, sütlü tatlılar',
      'Kahvaltı (ekmek, peynir, yumurta, zeytin)',
      'Bebek bisküvisi, püre, çorba, makarna, etli yemekler'
    ],
    recommendation: 'İnek sütü ve her türlü katı gıda için anestezi öncesi en az 6 saat tam açlık şarttır.',
    physiologicalRationale: 'İnek sütü mide asidinde yoğun kazein pıhtısı oluşturarak katı gıda gibi davranır. Yağlı/katı gıdalar çocuklarda 4-6 saatte ancak boşalabilir.',
    aspirationSafety: '6 saatten erken indüksiyonda regürjitasyon ve pulmoner aspirasyon riski yüksektir.'
  }
];

export const PediatricFastingInfographic: React.FC<PediatricFastingInfographicProps> = ({ isDark, onOpenAdult }) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>('clear-fluids');
  const selectedRule = PEDIATRIC_RULES.find(r => r.id === selectedRuleId) || PEDIATRIC_RULES[0];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
        isDark 
          ? 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/30' 
          : 'bg-gradient-to-r from-amber-50 via-white to-slate-50 border-amber-200 shadow-xs'
      }`}>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
              PEDİATRİK PREOPERATİF AÇLIK REHBERİ
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              ESAIC 2022 / ESPA / APA Pediatrik Kılavuzları
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Pediatrik Preoperatif Açlık Kılavuzu (6 - 4 - 3 - 1 Kuralı)
          </h3>
          <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Çocukları gereksiz uzun saatler aç ve susuz bırakmanın yarattığı dehidratasyon, ketotik hipoglisemi, zor damar yolu ve derin ajitasyonu önleyen modern pediatrik anestezi açlık standardı.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          {onOpenAdult && (
            <button
              type="button"
              onClick={onOpenAdult}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 border-emerald-700/50' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
              }`}
            >
              <span>← Erişkin Açlık Rehberi (2-6-8)</span>
            </button>
          )}

          <ShareLinkButton
            type="infografik"
            id="pediatric-fasting"
            isDark={isDark}
            title="Pediatrik Açlık Rehberi Bağlantısını Kopyala"
          />

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/34857683/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>ESAIC 2022 (PMID: 34857683)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. Modern 6-4-3-1 Rule Interactive Ribbon */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Modern Pediatrik 6 - 4 - 3 - 1 Kuralı
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Ayrıntılı önerileri ve fizyolojik gerekçeleri görmek için karta tıklayın
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PEDIATRIC_RULES.map((rule) => {
            const isSelected = rule.id === selectedRuleId;
            return (
              <button
                key={rule.id}
                type="button"
                onClick={() => setSelectedRuleId(rule.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/25 shadow-xs'
                    : isDark
                      ? 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${rule.badgeColor}`}>
                      {rule.badgeLabel}
                    </span>
                    <span className="text-xl font-mono font-black text-amber-600 dark:text-amber-400">
                      {rule.hours} sa
                    </span>
                  </div>

                  <div className={`text-xs font-bold leading-snug line-clamp-2 ${
                    isSelected ? 'text-amber-700 dark:text-amber-300' : isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {rule.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="truncate">{rule.targetGroup}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Item Detail Panel */}
        <div className={`mt-4 p-4 rounded-xl border ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/50 dark:border-slate-800 pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${selectedRule.badgeColor}`}>
                  {selectedRule.hours} Saat Açlık
                </span>
                <h5 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedRule.name}
                </h5>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Hedef Kitle: <strong>{selectedRule.targetGroup}</strong>
              </p>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0 text-xs font-mono">
              <span className="text-slate-400">Güvenlik:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {selectedRule.aspirationSafety}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Apple className="w-3.5 h-3.5 text-amber-500" />
                <span>Kapsanan İçecek & Gıdalar:</span>
              </span>
              <ul className="space-y-1 pl-1">
                {selectedRule.examples.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-2.5 pt-2 border-t border-slate-200/40 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                <strong>Resmi Kılavuz Tavsiyesi:</strong> {selectedRule.recommendation}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-500" />
                <span>Neden Bu Süre? (Fizyolojik Kanıt):</span>
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800">
                {selectedRule.physiologicalRationale}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 4 Major Dangers of Prolonged Fasting in Children */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <HeartCrack className="w-5 h-5 text-rose-500" />
          <div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Çocuklarda Gereksiz Uzamış Açlığın 4 Kritik Tehlikesi
            </h4>
            <p className="text-xs text-slate-400">
              Geleneksel "gece yarısından sonra hiçbir şey yememe" talimatı çocuklarda açlık süresini sıklıkla 10-14 saate çıkarır.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold mb-1">
                <Droplets className="w-4 h-4 shrink-0" />
                <span>1. Dehidratasyon & Hipovolemi</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Bebeklerin vücut yüzey alanı geniştir ve sıvı kayıpları hızlıdır. Açlık damar içi volümü tüketir, venöz kollapsa ve damar yolu açma zorluğuna neden olur.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-300 mt-2">Zor Damar Yolu Riski</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold mb-1">
                <Zap className="w-4 h-4 shrink-0" />
                <span>2. Ketotik Hipoglisemi & Asidoz</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Küçük çocuklarda karaciğer glikojen depoları çok kısıtlıdır. Uzun açlık hızla ketozise, metabolik asidoza ve hipoglisemiye yol açabilir.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 mt-2">Metabolik Stres</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-bold mb-1">
                <HeartPulse className="w-4 h-4 shrink-0" />
                <span>3. Anestezi İndüksiyonunda Hipotansiyon</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                İnhalasyon anestezikleri (Sevofluran) ve propofol vazodilatasyon yapar. Hipovolemik çocukta indüksiyon sırasında derin kardiyovasküler çöküş riski doğar.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300 mt-2">Hemodinamik Çöküş</span>
          </div>

          <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div>
              <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-bold mb-1">
                <Baby className="w-4 h-4 shrink-0" />
                <span>4. Şiddetli Huzursuzluk & Ajitasyon</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                Aç ve susamış bir çocuğun ebeveynden ayrılması ve maske uyumu son derece güçleşir; aşırı ağlama hava yutulmasına (aerofaji) ve mide distansiyonuna yol açar.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-sky-700 dark:text-sky-300 mt-2">Maske Reddi & Aerofaji</span>
          </div>
        </div>
      </div>

      {/* 4. Comparison Table: Klasik (6-4-4-2) vs Modern (6-4-3-1) */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/80 border-slate-200'
      }`}>
        <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <ArrowRight className="w-4 h-4 text-amber-500" />
          <span>Kılavuz Evrimi: Klasik (6-4-4-2) Yaklaşım vs Modern (6-4-3-1) Kılavuzu</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                <th className="py-2 px-3 font-semibold">Gıda Türü</th>
                <th className="py-2 px-3 font-semibold text-slate-500">Klasik Kural (Eski)</th>
                <th className="py-2 px-3 font-semibold text-amber-600 dark:text-amber-400">ESAIC 2022 / ESPA (Güncel)</th>
                <th className="py-2 px-3 font-semibold">Klinik Değişim Nedeni</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Berrak Sıvılar (Su, Elma Suyu)</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">2 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-emerald-600 dark:text-emerald-400">1 Saat</td>
                <td className="py-2.5 px-3 text-[11px]">30-45 dk'da gastrik boşalma kanıtlandı; dehidratasyonu ve susuzluğu önler.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Anne Sütü (Breast Milk)</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">4 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-teal-600 dark:text-teal-400">3 Saat</td>
                <td className="py-2.5 px-3 text-[11px]">Anne sütünün düşük kazein ve yüksek sindirilebilirliği USG ile doğrulandı.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Bebek Maması (Formül Süt)</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">4 Saat / 6 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-amber-600 dark:text-amber-400">4 Saat</td>
                <td className="py-2.5 px-3 text-[11px]">Bebek mamalarının ortalama 3.5-4 saatte güvenli seviyeye boşaldığı gösterildi.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Katı Gıdalar & İnek Sütü</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">6 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-rose-600 dark:text-rose-400">6 Saat</td>
                <td className="py-2.5 px-3 text-[11px]">Değişmedi. İnek sütü ve katılar yüksek kazein/yağ nedeniyle 6 saat kalmalıdır.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Literature References */}
      <div className={`p-4 rounded-xl border text-xs space-y-2 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Pediatrik Literatür ve Kılavuz Künyesi</span>
        </div>
        <p className="leading-relaxed">
          Frykholm P, Disma N, Andersson H, et al. <em>Pre-operative fasting in children: A guideline from the European Society of Anaesthesiology and Intensive Care.</em> European Journal of Anaesthesiology. 2022 Jan;39(1):4-25. <strong>PMID: 34857683</strong>. DOI: 10.1097/EJA.0000000000001599.
        </p>
      </div>
    </div>
  );
};
