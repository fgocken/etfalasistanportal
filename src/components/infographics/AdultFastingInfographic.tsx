import React, { useState } from 'react';
import { 
  Coffee, 
  Utensils, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  BookOpen, 
  ExternalLink, 
  RotateCcw, 
  Sparkles, 
  Apple, 
  ShieldCheck, 
  AlertCircle, 
  Info, 
  Layers, 
  Pill, 
  Waves,
  Zap,
  ArrowRight
} from 'lucide-react';

interface AdultFastingInfographicProps {
  isDark: boolean;
  onOpenPediatric?: () => void;
  onOpenGastricUsg?: () => void;
}

interface FastingItem {
  id: 'clear-fluids' | 'light-meal' | 'formula-milk' | 'heavy-meal' | 'gum' | 'glp1';
  name: string;
  category: 'Sıvı' | 'Hafif Gıda' | 'Katı / Ağır' | 'Özel Durum';
  recommendedHours: number;
  badgeLabel: string;
  badgeColor: string;
  examples: string[];
  clinicalRule: string;
  aspirationRisk: 'Çok Düşük' | 'Düşük' | 'Orta' | 'Yüksek' | 'Gecikmiş Boşalma';
  keyNotes: string;
}

const ADULT_FASTING_ITEMS: FastingItem[] = [
  {
    id: 'clear-fluids',
    name: 'Berrak Sıvılar (Su, Çay, Karbonhidratlı İçecekler)',
    category: 'Sıvı',
    recommendedHours: 2,
    badgeLabel: '2 Saat',
    badgeColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
    examples: [
      'Su, maden suyu (aromasız/posasız)',
      'Posasız elma suyu veya berrak meyve suları',
      'Açık çay, ıhlamur (sütsüz)',
      'Sütsüz filtre kahve veya espresso',
      'Karbonhidratlı berrak ERAS içecekleri (Maltodekstrin solüsyonları ~400 mL)'
    ],
    clinicalRule: 'Elektif anestezi indüksiyonuna en geç 2 saat kalana kadar serbestçe tüketilebilir ve ERAS kapsamında teşvik edilir.',
    aspirationRisk: 'Çok Düşük',
    keyNotes: 'Süt veya krema içermeyen berrak sıvılar mideden 60-90 dakikada tamamen boşalır. Preoperatif susuzluğu, açlığı, anksiyeteyi ve insülin direncini belirgin azaltır.'
  },
  {
    id: 'light-meal',
    name: 'Hafif Öğün (Yağsız Karbonhidratlar)',
    category: 'Hafif Gıda',
    recommendedHours: 6,
    badgeLabel: '6 Saat',
    badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    examples: [
      'Kızarmış ekmek (tost), galeta, grissini',
      'Bisküvi, kraker (yağsız/kremasız)',
      'Haşlanmış pirinç / patates (yağsız)',
      'Reçel veya ballı hafif kahvaltı dilimi'
    ],
    clinicalRule: 'Elektif anestezi öncesi en az 6 saat tam açlık gereklidir.',
    aspirationRisk: 'Orta',
    keyNotes: 'İçerisinde et, tereyağı, peynir veya kızartma bulunmayan hafif öğünlerin fizyolojik gastrik boşalma süresi ortalama 4-6 saattir.'
  },
  {
    id: 'formula-milk',
    name: 'Hayvansal Sütler & Opak Bitkisel Sütler',
    category: 'Sıvı',
    recommendedHours: 6,
    badgeLabel: '6 Saat',
    badgeColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
    examples: [
      'İnek sütü, keçi sütü, tam yağlı/yarım yağlı süt',
      'Sütlü kahve (Latte, Cappuccino, süt/krema eklenmiş çay)',
      'Yoğurtlu içecekler ve ayran',
      'Tüm opak bitkisel sütler (badem, yulaf, soya, hindistan cevizi sütü — protein/yağ oranından bağımsız)'
    ],
    clinicalRule: 'Hayvansal sütler ve tüm opak bitkisel sütler (badem, yulaf, soya vb.) berrak sıvı DEĞİLDİR; en az 6 saat açlık gerektirir.',
    aspirationRisk: 'Orta',
    keyNotes: 'Mide asidiyle karşılaşan hayvansal süt proteini (kazein) pıhtılaşır; opak bitkisel sütler ise partikül, yağ ve kompleks içerikleri nedeniyle berrak sıvı sınıfına girmez ve 6 saat açlık gerektirir.'
  },
  {
    id: 'heavy-meal',
    name: 'Ağır, Yağlı, Kızartılmış veya Et İçeren Öğünler',
    category: 'Katı / Ağır',
    recommendedHours: 8,
    badgeLabel: '8 Saat (veya daha fazla)',
    badgeColor: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
    examples: [
      'Kırmızı et, kıyma, kebap, tavuk veya balık yemekleri',
      'Kızartmalar, börek, poğaça, pizza, hamburger',
      'Kremalı, soslu veya aşırı yağlı ağır akşam yemekleri'
    ],
    clinicalRule: 'Anestezi indüksiyonu öncesi en az 8 saat tam açlık şarttır.',
    aspirationRisk: 'Yüksek',
    keyNotes: 'Yağ ve protein içeriği yüksek gıdalar mide antrumunda gastrik boşalmayı belirgin geciktirir. Gastroparezi veya diyabeti olanlarda 8 saati aşan süreler gerekebilir.'
  },
  {
    id: 'gum',
    name: 'Yutulmamış Sakız Çiğneme (ASA 2023)',
    category: 'Özel Durum',
    recommendedHours: 0,
    badgeLabel: '0 Saat · İptal Edilmez!',
    badgeColor: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30',
    examples: [
      'Şekersiz veya şekerli sakız çiğneme (YUTULMADAN)',
      'Nikotin sakızı (yalnızca yutulmamış sakız formu)',
      '⚠️ Sert şeker / nane şekeri ve tütün çiğneme bu muafiyette DEĞİLDİR!'
    ],
    clinicalRule: 'ASA 2023 (Joshi, PMID 36629465): Sağlıklı erişkinlerde YALNIZCA yutulmamış sakız çiğnemek elektif cerrahiyi erteleme veya iptal gerekçesi değildir.',
    aspirationRisk: 'Düşük',
    keyNotes: 'Yutulmamış sakız gastrik hacim/pH’ı klinik olarak anlamlı değiştirmez; indüksiyon öncesi ağızdan çıkarılması yeterlidir. DİKKAT: Sert şeker (hard candy) ağızda eriyip yutulduğundan berrak karbonhidrat/katı gibi değerlendirilir; tütün çiğneme ise partiküllü bitkisel materyal içerdiğinden ASLA 0 saat muafiyetinde sayılmaz!'
  },
  {
    id: 'glp1',
    name: 'GLP-1 Reseptör Agonistleri (Semaglutid / Tirzepatid vb.)',
    category: 'Özel Durum',
    recommendedHours: 24,
    badgeLabel: 'Risk Bazlı · 24 sa Sıvı Diyet',
    badgeColor: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
    examples: [
      'Semaglutid (Ozempic, Wegovy, Rybelsus)',
      'Tirzepatid (Mounjaro, Zepbound)',
      'Liraglutid (Victoza, Saxenda), Dulaglutid (Trulicity)'
    ],
    clinicalRule: 'Multisociety 2024 (ASA/AGA/ASMBS/SAGES/ISPCOP): Çoğu hasta tedaviye devam edebilir; 4 yüksek risk kriteri varsa 24 saat sıvı diyet / ortak karar uygulanır. Ortak kararla kesilecekse: günlük doz operasyon günü atlanır, haftalık doz operasyondan 1 hafta önce kesilir.',
    aspirationRisk: 'Gecikmiş Boşalma',
    keyNotes: 'Yüksek risk kriterleri: (1) Doz artırma/eskalasyon fazı, (2) yüksek doz, (3) haftalık dozlama, (4) aktif Gİ semptomları (bulantı, kusma, karın ağrısı, şişkinlik, kabızlık) veya gastroparezi. Riskli hastada işlemden 24 saat önce sıvı diyet önerilir; ortak kararla kesme seçilirse günlük preparat operasyon günü, haftalık preparat 1 hafta önce kesilir. İşlem günü şüphede Gastrik USG (POCUS) veya dolu mide yönetimi (RSI/erteleme) uygulanır.'
  }
];

export const AdultFastingInfographic: React.FC<AdultFastingInfographicProps> = ({ isDark, onOpenPediatric, onOpenGastricUsg }) => {
  const [selectedItemId, setSelectedItemId] = useState<string>('clear-fluids');
  const selectedItem = ADULT_FASTING_ITEMS.find(item => item.id === selectedItemId) || ADULT_FASTING_ITEMS[0];

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark 
          ? 'bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border-emerald-500/30' 
          : 'bg-gradient-to-r from-emerald-50 via-white to-slate-50 border-emerald-200 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
            ERİŞKİN PREOPERATİF AÇLIK REHBERİ
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            ASA 2023, ESAIC &amp; Multisociety GLP-1 (2024)
          </span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Erişkin Preoperatif Açlık ve Aspirasyon Profilaksisi (2 - 6 - 8 Kuralı)
        </h3>

        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Pulmoner aspirasyon riskini en aza indirirken gereksiz uzamış açlığın yol açtığı dehidratasyon, hipovolemi, insülin direnci ve anksiyeteyi önleyen kanıta dayalı açlık süreleri.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2">
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/36629465/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>ASA 2023 Açlık (PMID: 36629465)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/39471342/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 border-purple-700/50 hover:border-purple-600' 
                : 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span>Multisociety 2024 GLP-1 (PMID: 39471342)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {onOpenPediatric && (
            <button
              type="button"
              onClick={onOpenPediatric}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark 
                  ? 'bg-amber-950/30 hover:bg-amber-900/40 text-amber-300 border-amber-700/50' 
                  : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-2xs'
              }`}
            >
              <span>Pediatrik Açlık Rehberi (6-4-3-1) →</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Visual Time Horizon Ribbon (2h -> 6h -> 8h -> Sakız & GLP-1) */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-500" />
            <h4 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Gıda Türüne Göre Asgari Açlık Süreleri
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Ayrıntılı klinik bilgi ve aspirasyon riskini incelemek için karta tıklayın
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {ADULT_FASTING_ITEMS.map((item) => {
            const isSelected = item.id === selectedItemId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItemId(item.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500 ring-2 ring-emerald-500/25 shadow-xs'
                    : isDark
                      ? 'bg-slate-950/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-1.5 py-0.5 rounded border block w-fit mb-2 ${item.badgeColor}`}>
                    {item.badgeLabel}
                  </span>
                  <div className={`text-xs font-bold line-clamp-2 ${
                    isSelected 
                      ? 'text-emerald-700 dark:text-emerald-300' 
                      : isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    {item.name}
                  </div>
                </div>

                <div className="mt-3 pt-1.5 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{item.category}</span>
                  {isSelected && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
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
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${selectedItem.badgeColor}`}>
                  {selectedItem.badgeLabel}
                </span>
                <h5 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedItem.name}
                </h5>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {selectedItem.clinicalRule}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <span className="text-[11px] text-slate-400 font-mono">Aspirasyon Riski:</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border font-mono ${
                selectedItem.aspirationRisk === 'Çok Düşük'
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : selectedItem.aspirationRisk === 'Düşük'
                    ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30'
                    : selectedItem.aspirationRisk === 'Orta'
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
              }`}>
                {selectedItem.aspirationRisk}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Examples List */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-500" />
                <span>Kapsanan Tipik Örnekler:</span>
              </span>
              <ul className="space-y-1 pl-1">
                {selectedItem.examples.map((ex, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-slate-600 dark:text-slate-300">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Physiological & Clinical Note */}
            <div className="space-y-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-emerald-500" />
                <span>Fizyolojik Açıklama & Anestezi Yönetimi:</span>
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white/50 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800">
                {selectedItem.keyNotes}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 2023-2024 Key Practice Updates (Sakız, GLP-1 & Gastrik USG) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Sakız Çiğneme ASA 2023 */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
          isDark 
            ? 'bg-gradient-to-b from-sky-950/20 via-slate-900 to-slate-900 border-sky-500/30' 
            : 'bg-sky-50/50 border-sky-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-700 dark:text-sky-300">
                ASA 2023 GÜNCELLEMESİ
              </span>
              <span className="text-xs font-mono font-bold text-sky-600 dark:text-sky-400">
                Yalnızca Sakız!
              </span>
            </div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Yutulmamış Sakız Çiğneyen Hasta
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              ASA 2023 (Joshi, PMID 36629465) sağlıklı erişkinlerde <strong>yalnızca yutulmamış sakız</strong> için vaka ertelemesini kaldırdı.
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                <span>Yutulmamış şekerli/şekersiz sakız elektif cerrahinin ertelenmesi veya iptali için <strong>gerekçe değildir</strong>; indüksiyondan önce ağızdan çıkarılır.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Sert şeker (hard candy)</strong> eriyip yutulduğundan berrak karbonhidrat/katı gibi değerlendirilir; 0 saat muafiyetinde <strong>DEĞİLDİR</strong>.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Tütün çiğneme</strong> partiküllü bitkisel materyal içerdiğinden <strong>ASLA 0 saat muafiyetinde sayılmaz</strong>!</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-sky-500/20 text-[11px] text-sky-700 dark:text-sky-300 font-semibold">
            ✓ Muafiyet yalnızca sağlıklı erişkinde yutulmamış sakız içindir
          </div>
        </div>

        {/* Card 2: GLP-1 Reseptör Agonistleri (Multisociety 2024) */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
          isDark 
            ? 'bg-gradient-to-b from-purple-950/20 via-slate-900 to-slate-900 border-purple-500/30' 
            : 'bg-purple-50/50 border-purple-200'
        }`}>
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300">
                MULTISOCIETY 2024
              </span>
              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                Risk Bazlı Yaklaşım
              </span>
            </div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              GLP-1 RA (Ozempic / Mounjaro)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              ASA, AGA, ASMBS, SAGES ve ISPCOP ortak rehberi rutin kesme yerine bireyselleştirilmiş risk yönetimini önerir:
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>Çoğu Hastada Devam:</strong> Stabil idame dozunda ve Gİ semptomu yoksa ilaca devam edilebilir.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>4 Yüksek Risk Kriteri:</strong> Doz eskalasyon fazı, yüksek doz, haftalık rejim ve aktif Gİ semptomları (bulantı/kusma/şişkinlik) veya gastroparezi.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                <span><strong>24 sa Sıvı Diyet &amp; Ortak Kararla Kesim:</strong> Riskli hastada <strong>24 saat sıvı diyet</strong> uygulanır; ortak kararla ilacın kesilmesine karar verilirse <strong>günlük doz operasyon günü atlanır</strong>, <strong>haftalık doz operasyondan 1 hafta önce kesilir</strong>.</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-purple-500/20 text-[11px] text-purple-700 dark:text-purple-300 font-semibold">
            ⚠️ 8 saatlik standart açlık dolu mideyi ekarte ettirmez — Şüphede Gastrik POCUS veya RSI/erteleme!
          </div>
        </div>

        {/* Card 3: Gastrik Ultrason (POCUS - Perlas Skoru) */}
        <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between ${
          isDark 
            ? 'bg-gradient-to-b from-emerald-950/20 via-slate-900 to-slate-900 border-emerald-500/30' 
            : 'bg-emerald-50/50 border-emerald-200'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                BAŞUCU DEĞERLENDİRME
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Perlas 0–2 (Berrak Sıvı)
              </span>
            </div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Gastrik POCUS (Mide Ultrasonu)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Perlas Grade 0–2 skalası <strong>yalnızca berrak sıvı</strong> için geçerlidir; <strong>katı/partiküllü içerik</strong> ayrı yüksek risk kategorisidir.
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Grade 0:</strong> Sırtüstü ve sağ lateralde (RLD) antrum boş (çok düşük risk).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Grade 1:</strong> Yalnızca RLD’de berrak sıvı — koşulsuz &lt;1.5 mL/kg değildir (~%25’inde &gt;1.5 mL/kg olabilir; <strong>RLD CSA ölçümü gerekir</strong>).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Grade 2:</strong> Hem supin hem RLD’de berrak sıvı (genellikle &gt;1.5 mL/kg — yüksek risk).</span>
              </div>
              <div className="flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span><strong>Katı İçerik (Ayrı Kategori):</strong> Volüm ölçülmeden doğrudan dolu mide (erteleme veya RSI).</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-emerald-500/20 flex items-center justify-between gap-2 text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
            <span>✓ Şüpheli vakalarda altın standart başucu kılavuz</span>
            {onOpenGastricUsg && (
              <button
                type="button"
                onClick={onOpenGastricUsg}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold cursor-pointer shrink-0"
              >
                <span>Perlas Karar Desteğini Aç</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. High Risk "Full Stomach" Checklist */}
      <div className={`p-5 rounded-2xl border space-y-4 ${
        isDark ? 'bg-amber-950/15 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
      }`}>
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs sm:text-sm">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Açlık Süresine Bakılmaksızın &ldquo;Dolu Mide&rdquo; Kabul Edilen ve Hızlı Seri İndüksiyon (RSI) Gerektiren Durumlar</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-200">1. Acil Cerrahi &amp; Travma</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Ağrı, stres ve şok mide boşalmasını tamamen durdurur. Travma anında midede ne varsa kalır.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-200">2. İleri Gebelik (&gt; 20 Hafta)</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Progesteron etkisiyle alt özofagus sfinkter tonusu azalır ve büyüyen uterus mide içi basıncı artırır (mide boşalması özellikle aktif travay/opioid varlığında gecikir).
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-200">3. Diyabetik Otonom Nöropati</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Diyabetik gastroparezi durumunda 12 saatlik açlık sonrasında bile katı gıda kalıntısı bulunabilir.
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-200">4. Akut Batın &amp; GİS Obstrüksiyonu</span>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              İleus, barsak obstrüksiyonu ve peritonitte nazogastrik sonda ile dekompresyon ve modifiye/klasik RSI tercih edilir; krikoid bası rutin zorunlu değildir, bireyselleştirilir (IRIS 2019).
            </p>
          </div>
        </div>

        {/* ASA 2017 Pharmacologic Prophylaxis Rule */}
        <div className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center gap-2.5 ${
          isDark ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-amber-200 text-slate-700'
        }`}>
          <Pill className="w-4 h-4 text-emerald-500 shrink-0" />
          <p className="text-[11px] leading-relaxed">
            <strong>Farmakolojik Aspirasyon Profilaksisi (ASA 2017 Kuralı):</strong> Aspirasyon riski olmayan sağlıklı elektif hastalarda <strong>rutin PPI, H₂ reseptör blokörü veya metoklopramid ÖNERİLMEZ</strong>. Yüksek aspirasyon riskli seçilmiş hastalarda (ör. acil sezaryen / dolu mide) hızlı etki için <strong>0.3 M partikülsüz sodyum sitrat (30 mL)</strong> tercih edilir; partiküllü antiasitlerden kaçınılır.
          </p>
        </div>
      </div>

      {/* 5. Literature References */}
      <div className={`p-4 rounded-xl border text-xs space-y-2 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>Literatür ve Kılavuz Referansları</span>
        </div>
        <p className="leading-relaxed">
          1. <strong>ASA 2023 Update:</strong> Joshi GP, Abdelmalak BB, Weigel WA, et al. <em>Practice Guidelines for Preoperative Fasting: Carbohydrate-Containing Clear Liquids with or without Protein, Chewing Gum, and Pediatric Fasting Duration—A Modular Update of the American Society of Anesthesiologists Practice Guidelines.</em> Anesthesiology. 2023 Feb;138(2):132-151. PMID: 36629465.
        </p>
        <p className="leading-relaxed">
          2. <strong>GLP-1 RA Multisociety Guidance (2024):</strong> Kindel TL, Wang AY, Wadhwa A, et al. (ASA, AGA, ASMBS, SAGES, ISPCOP). <em>Multisociety Clinical Practice Guidance for the Safe Use of GLP-1 Receptor Agonists in the Perioperative Period.</em> 2024; Anesthesiology 2024 Dec;141(6):1208-1209. doi:10.1097/ALN.0000000000005231. PMID: 39471342.
        </p>
        <p className="leading-relaxed">
          3. <strong>ASA 2017 Fasting &amp; Pharmacologic Prophylaxis:</strong> Practice Guidelines for Preoperative Fasting and the Use of Pharmacologic Agents to Reduce the Risk of Pulmonary Aspiration. <em>Anesthesiology.</em> 2017 Mar;126(3):376-393. PMID: 28045707.
        </p>
      </div>
    </div>
  );
};
