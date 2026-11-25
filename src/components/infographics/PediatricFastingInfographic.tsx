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

interface PediatricFastingInfographicProps {
  isDark: boolean;
  onOpenAdult?: () => void;
}

interface PediatricFastingRule {
  id: 'clear-fluids' | 'breast-milk' | 'formula' | 'solids';
  name: string;
  hours: number;
  shortBadge: string;
  badgeLabel: string;
  badgeColor: string;
  hourColorClass: string;
  targetGroup: string;
  examples: string[];
  recommendation: string;
  physiologicalRationale: string;
  aspirationSafety: string;
}

const PEDIATRIC_RULES: PediatricFastingRule[] = [
  {
    id: 'solids',
    name: 'Tam / Diğer Katı Öğünler (Normal & Ağır Yemekler)',
    hours: 6,
    shortBadge: 'GRADE 1C',
    badgeLabel: '6 Saat (GRADE 1C)',
    badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    hourColorClass: 'text-rose-600 dark:text-rose-400',
    targetGroup: 'Tam katı öğün tüketen çocuklar',
    examples: [
      'Etli, yağlı, kızartılmış veya büyük porsiyonlu ana yemekler',
      'Makarna, pilav, pizza, hamburger ve tam öğünler',
      'Hafif kahvaltı kapsamına girmeyen diğer tüm katı gıdalar'
    ],
    recommendation: 'ESAIC 2022 (GRADE 1C): Tam ve diğer katı öğünler için elektif anestezi öncesi en az 6 saat açlık gerekir. (Not: ASA 2017/2023 kılavuzu ağır/yağlı yemek için 8 saat, hafif öğün ve inek sütü için 6 saat uygular.)',
    physiologicalRationale: 'Yüksek yağ ve protein içeren tam katı öğünlerin çocuklarda güvenli rezidüel seviyelere boşalması 6 saati bulur.',
    aspirationSafety: 'ESAIC 2022 GRADE 1C · ASA 2017/2023 ağır öğün: 8 saat'
  },
  {
    id: 'formula',
    name: 'Mama, İnek Sütü & Hafif Kahvaltı / Yarı Katılar',
    hours: 4,
    shortBadge: 'GRADE 2C',
    badgeLabel: '4 Saat (GRADE 2C)',
    badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    hourColorClass: 'text-amber-600 dark:text-amber-400',
    targetGroup: 'Mama alan bebekler, inek sütü veya hafif kahvaltı alan çocuklar',
    examples: [
      'Bebek mamaları (standart veya hidrolize formül sütler)',
      'İnek sütü ve diğer hayvansal sütler (ESAIC 2022: 4 saat)',
      'Hafif kahvaltı / yarı katılar (az yağlı tost/ekmek, yoğurt, püre, bebek bisküvisi)'
    ],
    recommendation: 'ESAIC 2022 (GRADE 2C): Formül mama, inek sütü ve hafif kahvaltı / yarı katı gıdalar için 4 saatlik açlık yeterlidir. (Karşılaştırma: ASA 2017/2023 kılavuzunda formül, inek sütü ve hafif öğün 6 saat kabul edilir.)',
    physiologicalRationale: 'Pediatrik gastrik USG ve boşalma çalışmaları; formül mama, inek sütü ve hafif/yarı-katı gıdaların sağlıklı çocuklarda ortalama 3.5–4 saat içinde güvenli bazal düzeye indiğini göstermiştir.',
    aspirationSafety: 'ESAIC 2022 GRADE 2C · ASA 2017/2023 (8-6-4-2): 6 saat'
  },
  {
    id: 'breast-milk',
    name: 'Anne Sütü (Breast Milk)',
    hours: 3,
    shortBadge: 'GRADE 1C',
    badgeLabel: '3 Saat (GRADE 1C)',
    badgeColor: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
    hourColorClass: 'text-teal-600 dark:text-teal-400',
    targetGroup: 'Emzirilen bebekler ve küçük çocuklar',
    examples: [
      'Doğrudan anne memesiyle emzirme',
      'Biberonla verilen sağılmış taze anne sütü (katkısız)'
    ],
    recommendation: 'ESAIC 2022 (GRADE 1C): Anne sütü ile beslenen bebeklerde elektif anestezi öncesi 3 saatlik açlık yeterlidir (ASA 2017/2023 kılavuzunda 4 saattir).',
    physiologicalRationale: 'Anne sütündeki protein ve yağ profili bebek fizyolojisine kusursuz uyumludur; kazein oranı düşüktür ve inek sütü veya formül mamaya göre mideden çok daha hızlı boşalır.',
    aspirationSafety: 'ESAIC 2022 GRADE 1C · ASA 2017/2023: 4 saat'
  },
  {
    id: 'clear-fluids',
    name: 'Berrak Sıvılar (Su, Elma Suyu · Pratik ≤ 3 mL/kg)',
    hours: 1,
    shortBadge: 'GRADE 1B',
    badgeLabel: '1 Saat (GRADE 1B)',
    badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    hourColorClass: 'text-emerald-600 dark:text-emerald-400',
    targetGroup: 'Tüm yaş grupları (bebekler ve çocuklar)',
    examples: [
      'Su, posasız berrak elma suyu (pratik bolus sınırı: ≤ 3 mL/kg)',
      'Şekerli berrak sıvılar / berrak meyve aromalı içecekler',
      'Sütsüz açık çay, pediatrik berrak oral elektrolit solüsyonları'
    ],
    recommendation: 'ESAIC 2022 (GRADE 1B) & ESPA / APA: Elektif anestezi indüksiyonuna 1 saat kalana kadar çocuklara berrak sıvı (pratikte ≤ 3 mL/kg) verilmesi aktif olarak teşvik edilir.',
    physiologicalRationale: 'Çocuklarda berrak sıvıların %95’i 30–45 dakika içinde mideden duodenuma geçer. 1 saatlik süre aspirasyon riskini artırmaksızın dehidratasyon, ketozis ve ajitasyonu dramatik şekilde azaltır.',
    aspirationSafety: 'Aspirasyon riski 2 saat kuralı ile eşdeğerdir (ESAIC 2022 GRADE 1B)'
  }
];

export const PediatricFastingInfographic: React.FC<PediatricFastingInfographicProps> = ({ isDark, onOpenAdult }) => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>('clear-fluids');
  const selectedRule = PEDIATRIC_RULES.find(r => r.id === selectedRuleId) || PEDIATRIC_RULES[0];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark 
          ? 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border-amber-500/30' 
          : 'bg-gradient-to-r from-amber-50 via-white to-slate-50 border-amber-200 shadow-xs'
      }`}>
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

        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Çocukları gereksiz uzun saatler aç ve susuz bırakmanın yarattığı dehidratasyon, ketotik hipoglisemi, zor damar yolu ve derin ajitasyonu önleyen modern pediatrik anestezi açlık standardı.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2">
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/34857683/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Kaynak: ESAIC 2022 (PMID: 34857683)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {onOpenAdult && (
            <button
              type="button"
              onClick={onOpenAdult}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 border-emerald-700/50' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300 shadow-2xs'
              }`}
            >
              <span>← Erişkin Açlık Rehberi (2-6-8)</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Modern 6-4-3-1 Rule Interactive Ribbon */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500 shrink-0" />
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Modern Pediatrik 6 - 4 - 3 - 1 Kuralı
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Ayrıntılı önerileri ve fizyolojik gerekçeleri görmek için karta tıklayın
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PEDIATRIC_RULES.map((rule) => {
            const isSelected = rule.id === selectedRuleId;
            return (
              <button
                key={rule.id}
                type="button"
                onClick={() => setSelectedRuleId(rule.id)}
                className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-w-0 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/25 shadow-xs'
                    : isDark
                      ? 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div className="space-y-2.5 min-w-0">
                  {/* Üst satır: Sabit tek satır etiket */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-block max-w-full truncate text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border whitespace-nowrap ${rule.badgeColor}`}>
                      {rule.shortBadge}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />}
                  </div>

                  {/* Orta satır: Kaymayan, hizalı büyük saat göstergesi */}
                  <div className="flex items-baseline gap-1.5 whitespace-nowrap tabular-nums">
                    <span className={`text-3xl sm:text-4xl font-mono font-black leading-none tracking-tight ${rule.hourColorClass}`}>
                      {rule.hours}
                    </span>
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      saat
                    </span>
                  </div>

                  {/* Başlık */}
                  <div className={`text-xs font-bold leading-snug line-clamp-2 min-h-[2.125rem] ${
                    isSelected ? 'text-amber-700 dark:text-amber-300' : isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {rule.name}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between gap-1 text-[10px] font-mono text-slate-400 min-w-0">
                  <span className="truncate">{rule.targetGroup}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Item Detail Panel */}
        <div className={`mt-4 p-4 rounded-xl border ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 border-b border-slate-200/50 dark:border-slate-800 pb-3 mb-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${selectedRule.badgeColor}`}>
                  {selectedRule.hours} Saat Açlık
                </span>
                <h5 className={`text-base font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedRule.name}
                </h5>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Hedef Kitle: <strong>{selectedRule.targetGroup}</strong>
              </p>
            </div>

            <div className="text-xs font-mono leading-snug md:text-right md:max-w-sm">
              <span className="text-slate-400 mr-1.5">Güvenlik:</span>
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

      {/* 4. Comparison Table: ASA (8-6-4-2) vs ESAIC 2022 (6-4-3-1) */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50/80 border-slate-200'
      }`}>
        <h4 className={`text-sm font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          <ArrowRight className="w-4 h-4 text-amber-500" />
          <span>Kılavuz Karşılaştırması: ASA 2017/2023 (8-6-4-2) vs ESAIC 2022 (6-4-3-1)</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                <th className="py-2 px-3 font-semibold">Gıda / Sıvı Türü</th>
                <th className="py-2 px-3 font-semibold text-slate-500">ASA 2017/2023 (8-6-4-2)</th>
                <th className="py-2 px-3 font-semibold text-amber-600 dark:text-amber-400">ESAIC 2022 (6-4-3-1)</th>
                <th className="py-2 px-3 font-semibold">Kanıt Düzeyi &amp; Klinik Not</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800/60 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Berrak Sıvılar (Pratik ≤ 3 mL/kg)</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">2 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-emerald-600 dark:text-emerald-400">1 Saat (GRADE 1B)</td>
                <td className="py-2.5 px-3 text-[11px]">30–45 dk’da boşalma kanıtlı; dehidratasyon, ketozis ve ajitasyonu azaltır.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Anne Sütü (Breast Milk)</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">4 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-teal-600 dark:text-teal-400">3 Saat (GRADE 1C)</td>
                <td className="py-2.5 px-3 text-[11px]">Düşük kazein ve hızlı gastrik boşalma USG ile doğrulanmıştır.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Bebek Maması (Formül Süt)</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">6 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-amber-600 dark:text-amber-400">4 Saat (GRADE 2C)</td>
                <td className="py-2.5 px-3 text-[11px]">ESAIC 2022’de formül sütler 4 saat; ASA’da 6 saat kabul edilir.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">İnek Sütü &amp; Hafif Kahvaltı / Yarı Katılar</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">6 Saat</td>
                <td className="py-2.5 px-3 font-mono font-black text-amber-600 dark:text-amber-400">4 Saat (GRADE 2C)</td>
                <td className="py-2.5 px-3 text-[11px]">ESAIC 2022 inek sütü ve hafif kahvaltı/yarı katıları 4 saatte sınıflar (6 sa kuralı ASA’ya aittir).</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200">Tam / Ağır / Yağlı Katı Öğünler</td>
                <td className="py-2.5 px-3 font-mono text-slate-400">8 Saat (Ağır/Yağlı)</td>
                <td className="py-2.5 px-3 font-mono font-black text-rose-600 dark:text-rose-400">6 Saat (GRADE 1C)</td>
                <td className="py-2.5 px-3 text-[11px]">ESAIC 2022’de diğer tüm katı/tam öğünler 6 saat; ASA’da ağır/etli/yağlı öğün 8 saattir.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Neonate/Premature Guidance & High-Risk Pediatric Exceptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className={`p-4 rounded-2xl border space-y-2 ${
          isDark ? 'bg-sky-950/20 border-sky-500/35' : 'bg-sky-50/70 border-sky-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sky-700 dark:text-sky-300">
            <Baby className="w-4 h-4 text-sky-500 shrink-0" />
            <span>Yenidoğan &amp; Prematüreler (&lt; 28 Gün): Hipoglisemi Koruması</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            Yenidoğan ve prematürelerde hepatik glikojen depoları minimaldir; uzamış açlıkta semptomatik/nörotoksik <strong>hipoglisemi</strong> hızla gelişebilir. Vaka sabah ilk sıraya alınmalı, açlık süresi <strong>kesinlikle minimize edilmeli</strong>; açlık uzayacaksa <strong>%1–2.5 dekstroz içeren izotonik dengeli IV idame sıvısı</strong> başlanmalı ve seri kan şekeri izlenmelidir.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border space-y-2 ${
          isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-rose-700 dark:text-rose-300">
            <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
            <span>Yüksek Riskli Pediatrik İstisnalar (6-4-3-1 Kuralı Yetersizdir!)</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Akut travma, GİS obstrüksiyonu / pilor stenozu / ileus, şiddetli GÖRH, aktif opioid kullanımı veya Gİ dismotilite</strong> varlığında standart 6-4-3-1 süreleri boş mideyi garanti etmez! Bu olgularda açlık <strong>bireyselleştirilir</strong>; şüphede başucu <strong>pediatrik gastrik POCUS (Spencer 2015)</strong> uygulanır ve gerekirse modifiye/klasik RSI tercih edilir.
          </p>
        </div>
      </div>

      {/* 6. ESAIC 2022 Additional Practical Pearls */}
      <div className={`p-4 rounded-2xl border space-y-3 ${
        isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
      }`}>
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-slate-800 dark:text-slate-200">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>ESAIC 2022 Ek Klinik Pratik İncileri</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] text-slate-600 dark:text-slate-300">
          <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-emerald-700 dark:text-emerald-300 mb-1">1. Pratik Berrak Sıvı Sınırı (≤ 3 mL/kg)</div>
            <p className="leading-relaxed">
              İndüksiyondan 1 saat öncesine kadar susayan çocuklara pratikte <strong>≤ 3 mL/kg</strong> berrak sıvı verilmesi güvenli kabul edilir ve susuzluğu önler (GRADE 1B).
            </p>
          </div>
          <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-sky-700 dark:text-sky-300 mb-1">2. Pediatrik Sakız Çiğneme</div>
            <p className="leading-relaxed">
              Yutulmamış sakız çiğnemek elektif pediatrik cerrahi için <strong>iptal veya erteleme nedeni değildir</strong>; indüksiyon öncesi ağızdan çıkarılması yeterlidir (GRADE 1C).
            </p>
          </div>
          <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="font-bold text-amber-700 dark:text-amber-300 mb-1">3. Erken Postoperatif Oral Alım</div>
            <p className="leading-relaxed">
              Çocukların derlenme döneminde kendileri istediklerinde <strong>erken oral sıvı/beslenmeye</strong> başlamaları teşvik edilir; zorunlu su içme testi taburculuk şartı değildir (GRADE 1C).
            </p>
          </div>
        </div>
      </div>

      {/* 7. Literature References */}
      <div className={`p-4 rounded-xl border text-xs space-y-2 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Pediatrik Literatür ve Kılavuz Künyesi</span>
        </div>
        <p className="leading-relaxed">
          1. <strong>ESAIC 2022:</strong> Frykholm P, Disma N, Andersson H, et al. <em>Pre-operative fasting in children: A guideline from the European Society of Anaesthesiology and Intensive Care.</em> European Journal of Anaesthesiology. 2022 Jan;39(1):4-25. <strong>PMID: 34857683</strong>. DOI: 10.1097/EJA.0000000000001599.
        </p>
        <p className="leading-relaxed">
          2. <strong>ASA 2023 Modular Update:</strong> Joshi GP, Abdelmalak BB, Weigel WA, et al. <em>2023 American Society of Anesthesiologists Practice Guidelines for Preoperative Fasting (Pediatric Fasting Duration).</em> Anesthesiology. 2023;138(2):132-151. PMID: 36629465.
        </p>
      </div>
    </div>
  );
};
