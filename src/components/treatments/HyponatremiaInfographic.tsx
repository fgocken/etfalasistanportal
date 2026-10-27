import React, { useState } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  ShieldAlert, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Droplet, 
  Zap, 
  Info,
  ShieldCheck,
  Stethoscope,
  RotateCcw,
  Flame,
  Scale
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

type MainDisorder = 'hyponatremia' | 'hypernatremia';
type HypoTab = 'cns' | 'acute_vs_chronic' | 'ods' | 'emergency_bolus';
type HyperTab = 'hyper_cns' | 'etiology_volume' | 'cerebral_edema' | 'central_di';

export const HyponatremiaInfographic: React.FC<Props> = ({ isDark }) => {
  // Ana Bozukluk Seçimi: Hiponatremi vs Hipernatremi
  const [mainDisorder, setMainDisorder] = useState<MainDisorder>('hyponatremia');

  // Hiponatremi Alt Sekmeleri
  const [hypoTab, setHypoTab] = useState<HypoTab>('cns');
  const [severityFilter, setSeverityFilter] = useState<'mild' | 'severe'>('mild');

  // Hipernatremi Alt Sekmeleri
  const [hyperTab, setHyperTab] = useState<HyperTab>('hyper_cns');

  return (
    <div className={`p-4 sm:p-5 rounded-xl border space-y-5 transition-all ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Üst Başlık & Ana Bozukluk Seçici (Hipo vs Hipernatremi) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight">
              Sodyum Bozuklukları Klinik Bulguları &amp; Algoritmaları
            </h3>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hiponatremi (%3 Bolus &amp; ODS) ve Hipernatremi (Serebral Ödem, Santral DI &amp; Su Açığı)
            </div>
          </div>
        </div>

        {/* Ana Bozukluk Değiştirici */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setMainDisorder('hyponatremia')}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mainDisorder === 'hyponatremia'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-teal-300" />
            <span>Hiponatremi Rehberi</span>
          </button>
          <button
            type="button"
            onClick={() => setMainDisorder('hypernatremia')}
            className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mainDisorder === 'hypernatremia'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-300" />
            <span>Hipernatremi Rehberi</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BÖLÜM 1: HİPONATREMİ KLİNİK VE ALGORİTMALARI */}
      {/* ============================================================== */}
      {mainDisorder === 'hyponatremia' && (
        <div className="space-y-4">
          {/* Hiponatremi Alt Sekmeler */}
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
              Hiponatremi Protokol Sekmeleri:
            </span>
            <div className={`inline-flex p-1 rounded-lg border text-xs font-semibold ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setHypoTab('cns')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hypoTab === 'cns'
                    ? isDark ? 'bg-slate-900 text-teal-400 font-bold shadow-xs' : 'bg-white text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                SSS Semptomları
              </button>
              <button
                type="button"
                onClick={() => setHypoTab('acute_vs_chronic')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hypoTab === 'acute_vs_chronic'
                    ? isDark ? 'bg-slate-900 text-teal-400 font-bold shadow-xs' : 'bg-white text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Akut vs Kronik
              </button>
              <button
                type="button"
                onClick={() => setHypoTab('ods')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hypoTab === 'ods'
                    ? isDark ? 'bg-slate-900 text-teal-400 font-bold shadow-xs' : 'bg-white text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                ODS Yönetimi
              </button>
              <button
                type="button"
                onClick={() => setHypoTab('emergency_bolus')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hypoTab === 'emergency_bolus'
                    ? isDark ? 'bg-slate-900 text-teal-400 font-bold shadow-xs' : 'bg-white text-teal-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                %3 Acil Bolus
              </button>
            </div>
          </div>

          {/* 1.1 SSS Semptomları ve Şiddet Skalası */}
          {hypoTab === 'cns' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Hiponatremi Klinik Şiddet Düzeyi:
                </span>
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setSeverityFilter('mild')}
                    className={`px-3 py-1 rounded-md border font-semibold cursor-pointer transition-all ${
                      severityFilter === 'mild'
                        ? 'bg-amber-500 text-white border-amber-500 font-bold'
                        : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    Orta / Ilımlı Semptomlar (125–134 mEq/L)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSeverityFilter('severe')}
                    className={`px-3 py-1 rounded-md border font-semibold cursor-pointer transition-all ${
                      severityFilter === 'severe'
                        ? 'bg-rose-600 text-white border-rose-600 font-bold'
                        : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                  >
                    Ağır / Yaşamı Tehdit Eden (&lt;125 mEq/L)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {severityFilter === 'mild' ? (
                  <>
                    <div className={`p-4 rounded-xl border space-y-2.5 ${
                      isDark ? 'bg-amber-950/20 border-amber-800/80' : 'bg-amber-50/80 border-amber-200'
                    }`}>
                      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
                        <Activity className="w-4 h-4" />
                        Ilımlı Nörolojik Bulgular
                      </div>
                      <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
                        <li>Küt ve inatçı baş ağrısı</li>
                        <li>Bulantı (kusmasız) ve iştahsızlık</li>
                        <li>Dikkat dağınıklığı, unutkanlık ve kognitif yavaşlama</li>
                        <li>Gövde ataksisi, dengesizlik ve geriatrik düşme eğilimi</li>
                        <li>Genel kas güçsüzlüğü, kramplar ve huzursuzluk</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border space-y-2.5 ${
                      isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
                        <Stethoscope className="w-4 h-4" />
                        Klinik Yaklaşım &amp; Öncelik
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Hastada aktif kusma, nöbet veya bilinç bulanıklığı yoksa <strong>acil bolus %3 NaCl endikasyonu yoktur</strong>. 
                        Etyoloji (hipovolemi, SIADH, kalp yetmezliği, tiazid diüretik vb.) aydınlatılmalı; 
                        sıvı kısıtlaması veya yavaş izotonik replasman planlanmalıdır. 
                        Maksimum yükselme: <strong>≤ 6–8 mEq/L / 24 saat</strong>.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`p-4 rounded-xl border space-y-2.5 ${
                      isDark ? 'bg-rose-950/30 border-rose-800/80' : 'bg-rose-50 border-rose-300'
                    }`}>
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4" />
                        Ağır Serebral Ödem &amp; Acil Bulgular
                      </div>
                      <ul className="text-xs space-y-1.5 list-disc list-inside text-rose-900 dark:text-rose-200">
                        <li>İnatçı fışkırır tarzda kusma</li>
                        <li>İlerleyici somnolans, stupor ve koma</li>
                        <li>Jeneralize tonik-klonik konvülziyonlar / Status Epilepticus</li>
                        <li>Solunum depresyonu, Cheyne-Stokes solunumu ve arrest</li>
                        <li>Tentoryal veya unkal herniasyon (anizokori, Cushing triadı)</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-xl border space-y-2.5 ${
                      isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
                        <Zap className="w-4 h-4" />
                        Acil Müdahale Protokolü
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Ağır semptomlar varlığında beklemeden <strong>%3 NaCl 100–150 mL IV bolus (10–20 dk)</strong> başlanmalıdır. 
                        Amaç derhal serum Na düzeyini 4–6 mEq/L yükselterek intrakraniyal basıncı düşürmektir. 
                        İlk 24 saatte toplam düzeltme 8–10 mEq/L'yi geçmemelidir.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* 1.2 Akut vs Kronik Hiponatremi */}
          {hypoTab === 'acute_vs_chronic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-cyan-950/20 border-cyan-800/80 text-cyan-200' : 'bg-cyan-50 border-cyan-200 text-cyan-950'
              }`}>
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>Akut Hiponatremi (&lt; 48 Saat)</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                    Primer Risk: Beyin Ödemi
                  </span>
                </div>
                <p className="leading-relaxed opacity-90">
                  Gelişimi 48 saatten kısadır (maraton koşucuları, psikojenik polidipsi, MDMA kullanımı, postoperatif hipotonik infüzyon veya TURP sendromu).
                </p>
                <div className="space-y-1.5 pt-1">
                  <div><strong>Hücresel Durum:</strong> Beyin hücreleri henüz idiogenik osmolitleri atamamıştır; su hızla astrositlerin içine girer.</div>
                  <div><strong>Klinik Tehlike:</strong> Akut serebral ödem, intrakraniyal hipertansiyon ve unkal herniasyon.</div>
                  <div><strong>Tedavi Önceliği:</strong> Semptomları hızla yatıştırmak için agresif %3 NaCl bolusları verilebilir. ODS riski düşüktür.</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-amber-950/20 border-amber-800/80 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <div className="flex items-center justify-between font-bold text-sm">
                  <span>Kronik Hiponatremi (≥ 48 Saat)</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    Primer Risk: ODS
                  </span>
                </div>
                <p className="leading-relaxed opacity-90">
                  Klinikte görülen olguların &gt;%90'ı kroniktir. Süre belirsiz olduğunda her zaman kronik kabul edilir.
                </p>
                <div className="space-y-1.5 pt-1">
                  <div><strong>Hücresel Durum:</strong> Beyin hücreleri glutamat, miyo-inozitol ve elektrolitleri dışarı atarak hacmi dengelemiştir.</div>
                  <div><strong>Klinik Tehlike:</strong> Sodyum hızla yükseltilirse nöronlar ve oligodendrositler büzüşür; <strong>Osmotik Demiyelinizasyon Sendromu</strong> tetiklenir.</div>
                  <div><strong>Tedavi Kuralı:</strong> Güvenli hız: <strong>maks 6–8 mEq/L / 24 saat</strong>. Yüksek riskte maks 4–6 mEq/L/gün.</div>
                </div>
              </div>
            </div>
          )}

          {/* 1.3 ODS & Kurtarma Protokolü */}
          {hypoTab === 'ods' && (
            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  Osmotik Demiyelinizasyon Sendromu (Santral Pontin Miyelinozis)
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Kronik hiponatremik bir hastanın serum sodyumu aşırı hızlı yükseltildiğinde (&gt;8–10 mEq/L/gün), 
                  organik osmolitlerini kaybetmiş beyin hücreleri hiperosmolaliteye uyum sağlayamaz ve hızlı dehidratasyonla apoptoza uğrar. 
                  Pontin ve ekstrapontin miyelin kılıfları parçalanır.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg border bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-800 dark:text-slate-200">Gecikmeli Başlangıç</div>
                    <div className="text-slate-500 mt-1">Düzeltmeden 2 ila 6 gün sonra sinsi şekilde başlar (başta hasta iyileşmiş görünür).</div>
                  </div>
                  <div className="p-3 rounded-lg border bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-800 dark:text-slate-200">Tipik Nörolojik Tablo</div>
                    <div className="text-slate-500 mt-1">Spastik kuadriparezi, psödobulber disartri, disfaji, 'Locked-in' sendromu ve koma.</div>
                  </div>
                  <div className="p-3 rounded-lg border bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-800 dark:text-slate-200">Geri Dönüşümsüzlük</div>
                    <div className="text-slate-500 mt-1">Kalıcı ağır nörolojik sekeller ve yüksek mortalite ile seyreder.</div>
                  </div>
                </div>
              </div>

              {/* Aşırı Düzeltmede Kurtarma Protokolü */}
              <div className={`p-4 rounded-xl border space-y-2.5 ${
                isDark ? 'bg-amber-950/20 border-amber-800/80 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}>
                <div className="font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  Aşırı Düzeltme (Overcorrection) Halinde Acil Geri İndirme Protokolü
                </div>
                <p className="leading-relaxed">
                  Eğer 24 saat içinde yükselme 8 mEq/L'yi aştıysa veya hasta poliüriye girip Na hızla fırlamaya başladıysa:
                </p>
                <ol className="list-decimal list-inside space-y-1 pt-1 opacity-95">
                  <li>Mevcut sodyum infüzyonunu ve tüm aktif sodyum içeren sıvıları derhal durdurunuz.</li>
                  <li>Serbest su kaybını önlemek için <strong>Desmopressin (dDAVP) 1–2 mcg IV/SC</strong> (her 6–8 saatte bir) uygulayınız.</li>
                  <li>Serum sodyumunu hedeflenen güvenli sınıra geri çekmek için <strong>%5 Dextroz (D5W) 3–5 mL/kg/saat</strong> infüzyonu başlayınız.</li>
                  <li>Serum sodyumunu saatte bir ölçerek yükselmenin durduğunu ve gerilediğini teyit ediniz.</li>
                </ol>
              </div>
            </div>
          )}

          {/* 1.4 %3 Acil Bolus Protokolü */}
          {hypoTab === 'emergency_bolus' && (
            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-teal-950/20 border-teal-800/80 text-teal-200' : 'bg-teal-50 border-teal-200 text-teal-950'
              }`}>
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-teal-600" />
                  Şiddetli Semptomlu Hiponatremide 150 mL %3 NaCl Bolus Algoritması (ESE / US Consensus)
                </h4>
                <p className="leading-relaxed opacity-95">
                  Nöbet, koma, status epileptikus veya solunum arresti ile gelen olgularda, laboratuvar sonucu veya altta yatan neden beklenmeden uygulanır:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-lg border bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-teal-800 dark:text-teal-300">1. Bolus Dozu</div>
                    <div className="text-slate-600 dark:text-slate-300 font-mono text-base font-bold">100–150 mL %3 NaCl</div>
                    <div className="text-slate-500 text-[11px]">10–20 dakikada IV infüzyonla verilir.</div>
                  </div>

                  <div className="p-3 rounded-lg border bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-teal-800 dark:text-teal-300">2. Değerlendirme &amp; Tekrar</div>
                    <div className="text-slate-600 dark:text-slate-300 font-mono text-base font-bold">20. Dakikada Kontrol</div>
                    <div className="text-slate-500 text-[11px]">Semptomlar devam ediyorsa aynı doz bir kez daha tekrarlanabilir (Maks 3 kez).</div>
                  </div>

                  <div className="p-3 rounded-lg border bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-teal-800 dark:text-teal-300">3. Hedef Akut Artış</div>
                    <div className="text-slate-600 dark:text-slate-300 font-mono text-base font-bold">+4 ila 6 mEq/L Na⁺</div>
                    <div className="text-slate-500 text-[11px]">Beyin ödemini geriletmeye yeterlidir. Sonrasında idame hızına geçilir.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* BÖLÜM 2: HİPERNATREMİ KLİNİK VE ALGORİTMALARI */}
      {/* ============================================================== */}
      {mainDisorder === 'hypernatremia' && (
        <div className="space-y-4">
          {/* Hipernatremi Alt Sekmeler */}
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider">
              Hipernatremi Protokol Sekmeleri:
            </span>
            <div className={`inline-flex p-1 rounded-lg border text-xs font-semibold ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setHyperTab('hyper_cns')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hyperTab === 'hyper_cns'
                    ? isDark ? 'bg-slate-900 text-cyan-400 font-bold shadow-xs' : 'bg-white text-cyan-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Klinik &amp; Damar Yırtılması
              </button>
              <button
                type="button"
                onClick={() => setHyperTab('etiology_volume')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hyperTab === 'etiology_volume'
                    ? isDark ? 'bg-slate-900 text-cyan-400 font-bold shadow-xs' : 'bg-white text-cyan-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Hacim Durumuna Göre Tedavi
              </button>
              <button
                type="button"
                onClick={() => setHyperTab('cerebral_edema')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hyperTab === 'cerebral_edema'
                    ? isDark ? 'bg-slate-900 text-cyan-400 font-bold shadow-xs' : 'bg-white text-cyan-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Serebral Ödem Koruması
              </button>
              <button
                type="button"
                onClick={() => setHyperTab('central_di')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  hyperTab === 'central_di'
                    ? isDark ? 'bg-slate-900 text-cyan-400 font-bold shadow-xs' : 'bg-white text-cyan-800 font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Santral DI &amp; dDAVP
              </button>
            </div>
          </div>

          {/* 2.1 Hipernatremi Klinik ve Damar Yırtılması */}
          {hyperTab === 'hyper_cns' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-cyan-950/20 border-cyan-800/80 text-cyan-200' : 'bg-cyan-50 border-cyan-200 text-cyan-950'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm text-cyan-700 dark:text-cyan-300">
                  <Flame className="w-4 h-4" />
                  <span>Klinik Semptomlar &amp; Hiperozmolalite</span>
                </div>
                <p className="leading-relaxed opacity-90">
                  Hipernatremi daima hipertonisiteyi ve intraselüler dehidratasyonu yansıtır.
                </p>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>Aşırı Susuzluk (Polidipsi):</strong> En erken ve en güçlü fizyolojik savunma mekanizmasıdır.</li>
                  <li><strong>Mukozal Kuruluk &amp; Turgor Kaybı:</strong> Dil, ağız kuruluğu, kuru aksiller çukur ve oligüri.</li>
                  <li><strong>Nöromusküler İrritabilite:</strong> Kas seğirmeleri (fasciculation), hiperrefleksi ve spastisite.</li>
                  <li><strong>Ağır Tablo (&gt;160 mEq/L):</strong> Ataksi, konfüzyon, deliryum, konvülziyonlar, stupor ve koma.</li>
                </ul>
              </div>

              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-rose-950/20 border-rose-800/80 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm text-rose-700 dark:text-rose-300">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Mekanik Tehlike: Beyin Büzüşmesi &amp; Kanama</span>
                </div>
                <p className="leading-relaxed opacity-90">
                  Hücre dışı aşırı osmotik yük nedeniyle su hızla beyin hücrelerini terk eder.
                </p>
                <ul className="space-y-1.5 list-disc list-inside">
                  <li><strong>Beyin Hacminde Küçülme:</strong> Parankim büzüşür ve kalvaryum kemiklerinden uzaklaşır.</li>
                  <li><strong>Dural Köprü Venlerinin Gerilmesi:</strong> Subdural ve subaraknoid alandaki hassas venler gerilerek yırtılır.</li>
                  <li><strong>İntraserebral ve Subaraknoid Kanamalar:</strong> Ağır akut hipernatremide spontan dural sinüs trombozu ve peteşiyal kanamalar görülebilir.</li>
                  <li><strong>Kalıcı Nörolojik Hasar:</strong> Özellikle bebeklerde ve yaşlılarda ölümcül vasküler komplikasyonlara yol açar.</li>
                </ul>
              </div>
            </div>
          )}

          {/* 2.2 Hacim Durumuna Göre Tedavi */}
          {hyperTab === 'etiology_volume' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3.5 rounded-xl border space-y-2 ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-amber-500" />
                  Hipovolemik Hipernatremi
                </div>
                <div className="text-slate-500 text-[11px]">Su Kaybı &gt; Sodyum Kaybı</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  <strong>Nedenler:</strong> Aşırı terleme, yanıklar, ozmotik diürez (DKA, HHS, Mannitol), GIS kayıpları.
                </p>
                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px]">
                  <strong>Protokol:</strong> Hemodinamik instabilite/şok varsa önce <strong>%0.9 SF</strong> ile intravasküler hacim düzeltilir. Şok düzelince serbest su açığı için <strong>%0.45 NaCl</strong> veya <strong>%5 Dextroz</strong>'a geçilir.
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-2 ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-cyan-500" />
                  Övolemik Hipernatremi
                </div>
                <div className="text-slate-500 text-[11px]">Saf Serbest Su Kaybı</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  <strong>Nedenler:</strong> Santral veya Nefrojenik Diabetes Insipidus (DI), insensible deri/solunum kayıpları, susama mekanizması bozulmuş geriatri.
                </p>
                <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-800 dark:text-cyan-300 text-[11px]">
                  <strong>Protokol:</strong> Saf serbest su replasmanı esastır. <strong>%5 Dextroz (D5W)</strong> IV veya bilinci açıksa <strong>Oral / NG Su</strong> verilir. Santral DI olgularında ek olarak <strong>Desmopressin (dDAVP)</strong> başlanır.
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-2 ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-purple-500" />
                  Hipervolemik Hipernatremi
                </div>
                <div className="text-slate-500 text-[11px]">Tuz Kazancı &gt; Su Kazancı</div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  <strong>Nedenler:</strong> İyatrojenik %3 NaCl veya hipertonik NaHCO3 infüzyonları, primer hiperaldosteronizm, Cushing sendromu.
                </p>
                <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-800 dark:text-purple-300 text-[11px]">
                  <strong>Protokol:</strong> Fazla tuzu böbrekten atmak için <strong>Kıvrım Diüretiği (Furosemid)</strong> verilir; açığa çıkan serbest su kaybı <strong>%5 Dextroz (D5W)</strong> ile karşılanır.
                </div>
              </div>
            </div>
          )}

          {/* 2.3 Serebral Ödem Koruması & Yavaş Düzeltme */}
          {hyperTab === 'cerebral_edema' && (
            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  Kronik Hipernatremide Aşırı Hızlı Düzeltme ve Fatal Serebral Ödem
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hipernatremi &ge; 48 saat sürdüğünde, beyin hücreleri hücre içi osmolaliteyi yükseltmek ve su kaybını durdurmak için 
                  <strong>"İdiogenik Osmolitler"</strong> (glutamat, miyo-inozitol, taurin) sentezler. 
                  Bu sayede beyin hacmi normale yaklaşır.
                </p>

                <div className="p-3 rounded-lg border bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200 space-y-2">
                  <div className="font-bold text-xs uppercase tracking-wider">
                    Ölümcül Hata: Hızlı Hipotonik Sıvı / Saf Su Verilmesi
                  </div>
                  <p className="leading-relaxed">
                    Eğer serum sodyumu hızla düşürülürse (&gt; 10–12 mEq/L/gün veya saatte &gt; 0.5 mEq/L), 
                    hücre içi idiogenik osmolitler hızla yıkılamadığı için ekstraselüler hipotonisite gelişir. 
                    Serbest su osmoz ile hızla beyin hücrelerinin içine hücum eder; 
                    <strong>akut beyin ödemi, intrakraniyal herniasyon ve fatal nöbetler</strong> meydana gelir!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded-lg border bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-teal-800 dark:text-teal-300">Güvenli Düşüş Hızı Tavanı</div>
                    <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      Maksimum 10–12 mEq/L / 24 saat
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Hedef saatlik hız: ~0.5 mEq/L / saat</div>
                  </div>
                  <div className="p-3 rounded-lg border bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-teal-800 dark:text-teal-300">Minimum Tedavi Süresi</div>
                    <div className="text-base font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                      En az 48 ila 72 Saate Yayılmalı
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">Su açığı hesabı ilk 24 saatte en fazla yarısı verilecek şekilde planlanır.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2.4 Santral DI & dDAVP Protokolü */}
          {hyperTab === 'central_di' && (
            <div className="space-y-4 text-xs">
              <div className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-cyan-950/20 border-cyan-800/80 text-cyan-200' : 'bg-cyan-50 border-cyan-200 text-cyan-950'
              }`}>
                <h4 className="font-bold text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-600" />
                  Santral Diabetes Insipidus (DI) &amp; Perioperatif Desmopressin Protokolü
                </h4>
                <p className="leading-relaxed opacity-95">
                  Özellikle kafa travması, transsfenoidal hipofiz cerrahisi veya beyin ölümü donör yönetiminde antidiüretik hormon (ADH) yetersizliği sonucu ortaya çıkar:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-lg border bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-cyan-800 dark:text-cyan-300">1. Tanı Kriterleri</div>
                    <div className="text-slate-600 dark:text-slate-300 font-mono text-xs font-bold">
                      İdrar &gt; 300 mL/saat (2 ardışık saat)
                    </div>
                    <div className="text-slate-500 text-[11px]">veya &gt; 4-5 mL/kg/saat, idrar dansitesi &lt; 1.005, idrar osm &lt; 200.</div>
                  </div>

                  <div className="p-3 rounded-lg border bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-cyan-800 dark:text-cyan-300">2. Desmopressin (dDAVP)</div>
                    <div className="text-slate-600 dark:text-slate-300 font-mono text-xs font-bold">
                      1 – 2 mcg IV veya SC
                    </div>
                    <div className="text-slate-500 text-[11px]">Etki süresi 6–12 saat. İdrar çıkışına göre her 6–12 saatte bir tekrarlanır.</div>
                  </div>

                  <div className="p-3 rounded-lg border bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="font-bold text-cyan-800 dark:text-cyan-300">3. Sıvı Dengeleme</div>
                    <div className="text-slate-600 dark:text-slate-300 font-mono text-xs font-bold">
                      Saatlik İdrar + İdame D5W
                    </div>
                    <div className="text-slate-500 text-[11px]">İdrar çıkışı normale inene kadar kaybedilen idrar hacmi %5 Dextroz ile birebir karşılanır.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
