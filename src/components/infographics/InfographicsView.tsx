import React, { useState } from 'react';
import { 
  BarChart3, 
  ExternalLink, 
  Info, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface InfographicsViewProps {
  isDark: boolean;
}

export interface InfographicTopic {
  id: string;
  title: string;
  category: string;
  tag: string;
}

const INFOGRAPHIC_TOPICS: InfographicTopic[] = [
  {
    id: 'surgical-risk',
    title: 'Cerrahilere Göre Cerrahi Risk Sınıflaması',
    category: 'Preoperatif & Kardiyoloji',
    tag: 'ESC Kılavuzu'
  }
];

export const InfographicsView: React.FC<InfographicsViewProps> = ({ isDark }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('surgical-risk');

  return (
    <div className={`rounded-xl border p-6 space-y-6 transition-colors ${
      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
    }`}>
      {/* Module Header - Generic Library Header */}
      <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
        isDark ? 'border-slate-800' : 'border-slate-100'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${
            isDark ? 'bg-violet-500/15 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-700 border border-violet-200'
          }`}>
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik İnfografikler
              </h3>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isDark ? 'bg-violet-500/15 text-violet-300 border border-violet-500/30' : 'bg-violet-50 text-violet-700 border border-violet-200'
              }`}>
                İnfografik Kütüphanesi
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Anestezi ve Reanimasyon Kliniği görsel kılavuzlar, sınıflamalar ve hızlı referans infografikleri
            </p>
          </div>
        </div>

        {/* Topic Counter */}
        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-slate-500 dark:text-slate-400">
          <span>{INFOGRAPHIC_TOPICS.length} İnfografik Yayında</span>
        </div>
      </div>

      {/* Topic Selector Tabs (Ready for future topics) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {INFOGRAPHIC_TOPICS.map((topic, index) => {
          const isActive = selectedTopicId === topic.id;
          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopicId(topic.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-all cursor-pointer border-b-2 -mb-px whitespace-nowrap ${
                isActive
                  ? isDark 
                    ? 'border-violet-500 text-violet-300 bg-violet-500/10' 
                    : 'border-violet-600 text-violet-900 bg-violet-50'
                  : isDark 
                    ? 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40' 
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                isActive ? 'bg-violet-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {index + 1}
              </span>
              <span>{topic.title}</span>
            </button>
          );
        })}
      </div>

      {/* TOPIC 1: Cerrahilere Göre Cerrahi Risk Sınıflaması (ESC Kılavuzu) */}
      {selectedTopicId === 'surgical-risk' && (
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
