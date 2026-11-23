import React, { useState, useId } from 'react';
import {
  Brain,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  ShieldAlert,
  Info,
  CheckCircle2,
  ExternalLink,
  RotateCcw,
  Activity,
  HeartPulse,
  Syringe,
  Pill,
  Droplet,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  BookOpen
} from 'lucide-react';
import {
  CompatibilityAndLineBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographCopyButton,
  MonographQuickNav,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

export const DexmedetomidineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  
  // Çözelti Hazırlama Modu
  const [prepType, setPrepType] = useState<'vial_50' | 'vial_100' | 'ampoule_custom' | 'custom_conc'>('vial_50');
  const [customDiluentVolume, setCustomDiluentVolume] = useState<number>(50); // mL (örn 200 mcg ampul + SF)
  const [customConcInput, setCustomConcInput] = useState<number>(4); // mcg/mL
  
  // Yükleme Dozu (Bolus)
  const [enableBolus, setEnableBolus] = useState<boolean>(false);
  const [bolusDoseMcgKg, setBolusDoseMcgKg] = useState<number>(1.0); // 0.5 - 1.0 mcg/kg
  const [bolusDurationMin, setBolusDurationMin] = useState<number>(10); // 10 - 20 dk
  
  // İdame Dozu (mcg/kg/saat)
  const [maintenanceDoseMcgKgHr, setMaintenanceDoseMcgKgHr] = useState<number>(0.7); // mcg/kg/saat
  
  // Akordiyon State: Farmakokinetik (Varsayılan KAPALI)
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Benzersiz erişilebilirlik kimlikleri (ARIA)
  const weightInputId = useId();
  const prepSelectId = useId();
  const bolusToggleId = useId();
  const bolusDoseInputId = useId();
  const bolusDurationInputId = useId();
  const customVolInputId = useId();
  const customConcInputId = useId();
  const maintDoseRangeId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'vial_50':
        return 4.0; // 200 mcg / 50 mL = 4 mcg/mL
      case 'vial_100':
        return 4.0; // 400 mcg / 100 mL = 4 mcg/mL
      case 'ampoule_custom':
        // 1 ampul (200 mcg) kullanıcının girdiği toplam hacme seyreltilir
        return customDiluentVolume > 0 ? 200 / customDiluentVolume : 4.0;
      case 'custom_conc':
        return customConcInput > 0 ? customConcInput : 4.0;
      default:
        return 4.0;
    }
  })();

  // --- İDAME HESAPLAMALARI ---
  // Saatlik doz (mcg/saat) = Doz (mcg/kg/saat) * Ağırlık (kg)
  const hourlyDoseMcg = maintenanceDoseMcgKgHr * weightKg;
  // İnfüzyon debisi (mL/saat) = mcg/saat / (mcg/mL)
  const infusionRateMlHr = concentrationMcgMl > 0 ? hourlyDoseMcg / concentrationMcgMl : 0;
  // 24 saatlik toplam tüketim
  const dailyTotalMcg = hourlyDoseMcg * 24;
  const dailyTotalMl = infusionRateMlHr * 24;
  // 24 saatlik flakon (200 mcg) ihtiyacı
  const dailyVialsNeeded = dailyTotalMcg / 200;

  // --- YÜKLEME (BOLUS) HESAPLAMALARI ---
  const totalBolusDoseMcg = enableBolus ? bolusDoseMcgKg * weightKg : 0;
  const totalBolusVolumeMl = concentrationMcgMl > 0 && enableBolus ? totalBolusDoseMcg / concentrationMcgMl : 0;
  // Bolus süresine göre saatlik pompa hızı (mL/saat)
  const bolusPumpRateMlHr =
    enableBolus && bolusDurationMin > 0 ? (totalBolusVolumeMl / bolusDurationMin) * 60 : 0;
  // Bolus süresine göre eşdeğer saatlik hız (mcg/kg/saat) - Kronometre takibi için
  const bolusRateMcgKgHr =
    enableBolus && bolusDurationMin > 0 ? (bolusDoseMcgKg * 60) / bolusDurationMin : 0;

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet & Etki' },
          { id: 'sec-pkpd', label: 'PK / PD' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-endikasyon', label: 'Endikasyonlar' },
          { id: 'sec-dozlar', label: 'Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="dexmedeTOMIDINE (4 mcg/mL Standart Seyreltme)"
        confusionRiskWith="Deksametazon · Dobutamin · Klonidin · Precedex ↔ Prevacid / Peridex"
        antidoteOrRescue="Spesifik Klinik Antidot YOK (Atipamezol Veteriner) — Destekleyici Tedavi: İnfüzyonu derhal durdurun. Semptomatik bradikardide Atropin 0,5–1 mg IV (veya glikopirolat), hipotansiyonda dengeli kristaloid + vazopresör (noradrenalin/efedrin) uygulayın."
        criticalAlerts={[
          '200 mcg/2 mL Konsantre Flakon ASLA Sulandırılmadan Puşe Edilmez: Standart 4 mcg/mL (200 mcg / 50 mL SF) elektronik infüzyon pompası ve bağımsız hemşire çift kontrolü (independent double-check) ile uygulanır.',
          'Pacemaker’sız İleri AV Blok & Ciddi Bradikardi: 2. veya 3. derece AV blok, hasta sinüs sendromu ve başlangıç KTA < 50/dk durumlarında infüzyon başlatılmamalıdır.',
          'Hızlı Yükleme Bolusu Riski: < 10–20 dakikada hızlı IV bolus periferik α₂B uyarısıyla bifazik geçici hipertansiyon, ardından derin bradikardi/asistoli tetikler; YBÜ ve kırılgan/yaşlı hastalarda yükleme atlanır.',
          'SPICE III ≤ 65 Yaş Mortalite Uyarısı (EMA 2022): ≤ 65 yaş kritik YBÜ hastalarında artmış 90 günlük mortalite sinyali nedeniyle endikasyon ve alternatif sedatifler (propofol) dikkatle tartılmalıdır.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>Santral Alfa-2 Adrenerjik Reseptör Agonisti</span>
              <span aria-hidden="true">·</span>
              <span>Precedex / Deksmedetomidin</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: N05CM18</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Deksmedetomidin Hidroklorür (Precedex)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Oldukça
              selektif santral α₂-adrenerjik reseptör agonistidir. Alfa-2 / Alfa-1 seçicilik oranı 1620:1 olup,
              klonidine kıyasla yaklaşık 8 kat daha güçlü ve selektiftir.
            </p>
          </div>
        </div>

        {/* Etki Mekanizması Açıklaması */}
        <div
          className={`mt-4 p-4 rounded-xl border leading-relaxed text-xs sm:text-sm ${
            isDark
              ? 'bg-purple-950/20 border-purple-900/50 text-purple-200'
              : 'bg-purple-50/70 border-purple-200 text-purple-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Brain className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold text-sm block">Etki Mekanizması &amp; Nörofizyolojik Temeli:</span>
              <p>
                Beyin sapında yer alan <strong>Locus Coeruleus</strong> çekirdeğindeki presinaptik ve postsinaptik{' '}
                <strong>α₂A adrenerjik reseptörlerini</strong> aktive eder. Presinaptik nöronda adenilat siklazı
                inhibe ederek voltaj kapılı kalsiyum girişini azaltır ve santral sempatik tonusu baskılar (noradrenalin
                salınımını durdurur).
              </p>
              <p className="text-xs opacity-90">
                • <strong>Doğal NREM Benzeri Uyku:</strong> GABAerjik inhibitör sistemleri doğrudan aktive eden
                propofol ve benzodiazepinlerin aksine, endojen uyku yolaklarını harekete geçirir. Hasta derin komada
                değildir; sesli ve fiziksel uyaranla kolayca <em>uyandırılabilir, oryante ve kooperatif</em> hale gelir
                (hafif sedasyon: RASS -1 / -2).
              </p>
              <p className="text-xs opacity-90">
                • <strong>Solunum Güvenliği:</strong> Medüller ve kortikal solunum merkezleri üzerinde belirgin
                depresan etkisi yoktur. Karbondioksit (CO₂) uyarısına ventilatuar yanıtı korur, bu sayede invaziv
                ventilatörden ayırma (weaning) ve uyanık havayolu işlemlerinde eşsiz bir güvenlik marjı sağlar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK BÖLÜMÜ (AÇILIP KAPANABİLİR AKORDİYON)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen(!pkOpen)}
          className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
          }`}
          aria-expanded={pkOpen}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Farmakokinetik Özellikler (PK / PD)
                </h2>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pkOpen ? 'Gizle' : 'Tıkla & Göster'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Başlangıç süresi, pik etki, dağılım hacmi, protein bağlama, CYP/UGT metabolizması ve klirens parametreleri
              </p>
            </div>
          </div>
          <div className="text-slate-400">
            {pkOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 border-t border-slate-200 dark:border-slate-800 space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Etki Başlangıcı (Onset)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">5 – 15 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">IV infüzyon başladıktan sonra klinik sedasyon başlangıcı.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pik Etki (Peak)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">15 – 30 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">Sürekli infüzyonla kararlı plazma konsantrasyonu oluşturma.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Etki Süresi &amp; Dağılım
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 2 Saat</span>
                <p className="text-[11px] text-slate-500 mt-1">Hızlı dağılım fazı yarı ömrü (t½α): ~6 dakika.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">~118 L (1.3 – 2.1 L/kg)</span>
                <p className="text-[11px] text-slate-500 mt-1">Yüksek lipofilik özellik, santral sinir sistemine hızla penetre olur.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Plazma Protein Bağlanması
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">%94 (Çok Yüksek)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Esas olarak albümin ve α₁-asit glikoproteine bağlanır. Hemodiyalizle temizlenmez.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Eliminasyon Yarı Ömrü (t½β)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">2.1 – 2.5 Saat</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Şiddetli karaciğer yetmezliğinde <strong>7.4 saate kadar</strong> uzayabilir!
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Biyotransformasyon ve Atılım Yolağı:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Hepatik Biyotransformasyon:</strong> Deksmedetomidin neredeyse tamamen karaciğerde metabolize
                edilir. İki temel yolak vardır: Glukuronidasyon (esas olarak <em>UGT2B10</em> ve <em>UGT1A4</em> enzimleri)
                ve sitokrom P450 aracılı hidroksilasyon (esas olarak <em>CYP2A6</em>).
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Klirens ve Eliminasyon:</strong> Ortalama sistemik klirens yaklaşık 39 L/saattir. Uygulanan
                dozun yaklaşık <strong>%95’i idrarla</strong> (tamamı inaktif metabolitler halinde), %4’ü ise feçesle
                atılır. İdrarla değişmeden atılan aktif deksmedetomidin oranı &lt;%1’dir.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KONTRENDİKASYONLAR                                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-kontrendikasyon"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Kontrendikasyonlar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mutlak Kontrendikasyonlar */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-rose-950/20 border-rose-900/50 text-rose-200' : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm text-rose-600 dark:text-rose-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Mutlak Kontrendikasyonlar</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
              <li>
                <strong>İlaç Aşırı Duyarlılığı:</strong> Deksmedetomidine veya formülasyondaki yardımcı maddelere karşı
                aşırı duyarlılık öyküsü.
              </li>
              <li>
                <strong>Pacemaker'sız İleri Derece Kalp Bloğu:</strong> Kalıcı kardiyak pacemaker'ı olmayan 2. veya 3.
                derece atriyoventriküler (AV) blok ve hasta sinüs sendromu (Sick Sinus Syndrome). Şiddetli asistoli riski
                nedeniyle mutlak kontrendikedir.
              </li>
            </ul>
          </div>

          {/* Rölatif Kontrendikasyonlar & Yüksek Risk */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm text-amber-600 dark:text-amber-400 mb-2">
              <Info className="w-4 h-4" />
              <span>Rölatif Kontrendikasyonlar / Yüksek Risk</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
              <li>
                <strong>Ciddi Bradikardi:</strong> Başlangıç kalp tepe atımı &lt; 50/dk olan hastalar (derin bradikardi ve
                hemodinamik çöküş riski).
              </li>
              <li>
                <strong>Düzeltilmemiş Şiddetli Hipovolemi:</strong> Damar içi volüm replasmanı yapılmamış hipovolemik
                veya şoktaki hastalar (derin vazodilatatör hipotansiyon).
              </li>
              <li>
                <strong>İleri Evre Ventriküler Disfonksiyon:</strong> Sol ventrikül ejeksiyon fraksiyonu &lt; %30 olan
                kalp yetmezliği hastalarında kardiak debiyi daha da düşürebilir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ENDİKASYONLAR VE OFF-LABEL KULLANIMLAR                          */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-endikasyon"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <CheckCircle2 className="w-5 h-5 text-teal-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Endikasyonlar ve Off-Label Kullanımlar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Ruhsatlı Endikasyonlar */}
          <div className="p-4 rounded-xl border border-teal-500/30 bg-teal-500/5 space-y-2">
            <span className="font-bold text-teal-700 dark:text-teal-300 text-sm block">
              FDA / EMA / TİTCK Onaylı Ruhsatlı Endikasyonlar
            </span>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <p>
                <strong>1. Yoğun Bakım Ünitesi Sedasyonu:</strong> Yoğun bakımda başlangıçta entübe edilmiş ve mekanik
                ventilasyon uygulanan kritik erişkin hastaların sedasyonu. Ekstübasyon anında ve ekstübasyon sonrasında
                da sürdürülebilir.
              </p>
              <p>
                <strong>2. Prosedürel Sedasyon (Girişimsel Odalar &amp; Ameliyathane):</strong> Tanısal ve cerrahi
                işlemler öncesinde ve/veya sırasında entübe edilmemiş erişkin hastaların uyanık sedasyonu (örn.
                bronkoskopi, uyanık trakeostomi, kardiyak girişimler).
              </p>
              <p>
                <strong>3. Şizofreni ve Bipolar Bozukluk Akut Ajitasyonu:</strong> Hafif, orta ve şiddetli akut ajitasyon
                epizotlarının kooperatif kontrolünde FDA onaylı sublingual film formülasyonu (Igalmi).
              </p>
            </div>
          </div>

          {/* Off-Label Kullanımlar */}
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-2">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm block">
              Off-Label / Kanıta Dayalı Klinik Kullanım Alanları
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
              <li>
                <strong>Genel Anestezi İdamesi &amp; Opioid/MAC Koruyucu Adjuvan:</strong> İntraoperatif hemodinamik
                stabilite, cerrahi stres yanıtının baskılanması, inhalasyonel anestezik (MAC) ve opioid tüketiminde
                %30–50 azalma, postoperatif titreme ve uyanma deliryumunun önlenmesi.
              </li>
              <li>
                <strong>Yoğun Bakım Deliryumu:</strong> PADIS kılavuzlarında mekanik ventilasyondaki ajite deliryumda
                benzodiazepinler yerine birinci basamak tedavi olarak önerilir.
              </li>
              <li>
                <strong>Zor Havayolu &amp; Uyanık Fiberoptik Entübasyon:</strong> Spontan solunum ve havayolu refleksleri
                korunduğu için fiberoptik entübasyonda altın standart adjuvandır.
              </li>
              <li>
                <strong>Postoperatif Titreme (Shivering):</strong> Santral termoregülatuar eşiği düşürerek titremeyi
                hızla sonlandırır.
              </li>
              <li>
                <strong>Alkol ve Madde Yoksunluk Sendromu:</strong> Otonom hiperaktiviteyi (sempatik fırtına, hipertansiyon,
                taşikardi) etkin şekilde baskılar.
              </li>
              <li>
                <strong>Uyanık Kraniyotomi:</strong> Cerrahi esnasında nörolojik muayene ve lisan testleri yapılabilmesi
                için hastanın uyandırılabilirliğini korur.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. UYGULAMA YOLLARI, ERİŞKİN VE PEDİATRİK DOZ REJİMLERİ            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozlar"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Syringe className="w-5 h-5 text-cyan-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Uygulama Yolları ve Doz Rejimleri (Erişkin &amp; Pediatrik)
          </h2>
        </div>

        {/* Uygulama Yolları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <span className="font-bold text-xs text-cyan-700 dark:text-cyan-300 block mb-1">
              1. İntravenöz (IV) İnfüzyon
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Standart yol. YBÜ ve anestezi pratiğinde mutlaka infüzyon pompası ile uygulanır (santral veya periferik).
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <span className="font-bold text-xs text-amber-700 dark:text-amber-300 block mb-1">
              2. Sublingual / Buccal Film
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Şizofreni/Bipolar ajitasyonu için FDA onaylı film formu (Igalmi: 120–180 mcg). <em>IV solüsyon sublingual verilmez!</em>
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
            <span className="font-bold text-xs text-purple-700 dark:text-purple-300 block mb-1">
              3. İntranazal (IN) Yol
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Pediatrik premedikasyon ve tanısal görüntülemede (MRI vb.) mukozal atomizer (MAD) ile 1–2 mcg/kg.
            </p>
          </div>
        </div>

        {/* Erişkin vs Pediatrik Tablosu */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* Erişkin Dozları */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Erişkin Doz Rejimleri</span>
            </span>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  YBÜ Mekanik Ventilasyon Sedasyonu:
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">0.2 – 1.4 mcg/kg/saat</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Başlangıç: 0.2–0.7 mcg/kg/saat. Bolus atlanır. Doz en erken 30 dakikada bir titre edilir.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Prosedürel / Girişimsel Sedasyon:
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  Yükleme 0.5–1.0 mcg/kg (10 dk) + İdame 0.2–1.0 mcg/kg/saat
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Şizofreni ve Bipolar Bozukluk Akut Ajitasyonu:
                </span>
                <div className="mt-1 space-y-1">
                  <div>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      Sublingual Film: 120 – 180 mcg (Tek Doz)
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Hafif-orta ajitasyonda 120 mcg SL; şiddetli ajitasyonda 180 mcg SL tek doz. Yanıt yetersizse ≥2 saat sonra 60–90 mcg ek doz (maks 360 mcg/24 saat). Uygulama sonrası 2 saat vital/ortostaz takibi.
                    </p>
                  </div>
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-700/60">
                    <span className="font-mono font-semibold text-teal-600 dark:text-teal-400 text-xs">
                      YBÜ / Klinik IV Titrasyon (Off-Label): 0.2 – 0.7 mcg/kg/saat
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Bolussuz IV sürekli infüzyon; solunumu baskılamadan kooperatif ve uyanabilir ajitasyon sedasyonu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Genel Anestezi İdamesi (Off-Label / Anestezi Adjuvanı):
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  0.2 – 0.7 mcg/kg/saat IV İnfüzyon
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Opsiyonel yükleme: 0.5–1.0 mcg/kg (10–15 dk; hemodinamik labilitede bolus atlanabilir). İnhalasyon anestezik (MAC) ve opioid ihtiyacını %30–50 azaltır; cerrahi stres yanıtını baskılar; postoperatif titreme (shivering) ve uyanma deliryumunu önler; pürüzsüz ekstübasyon sağlar. Ameliyat bitiminden 15–30 dk önce infüzyon kapatılabilir.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Weaning ve Ekstübasyon Süreci:
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">0.2 – 0.7 mcg/kg/saat</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Ekstübasyon esnasında kesilmez; solunumu baskılamadan post-ekstübasyon ajitasyonunu önler.
                </p>
              </div>
            </div>
          </div>

          {/* Pediatrik Dozları */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Pediatrik Doz Rejimleri (Off-Label / Kanıta Dayalı)</span>
            </span>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  İntranazal Premedikasyon / Sedasyon:
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">1.0 – 2.0 mcg/kg (Tek Doz)</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  İşlemden 30–45 dakika önce burun mukozasına mukozal atomizer (MAD) ile verilir. Ağrısız, iğnesiz anksiyoliz ve uyanık sedasyon sağlar.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Emergence Deliryumu (Anestezi Sonrası Uyanma Ajitasyonu):
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  0.3 – 0.5 mcg/kg IV Yavaş Bolus (5–10 dk)
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Özellikle sevofluran veya desfluran anestezisi sonrası pediatrik uyanma ajitasyonunun önlenmesi ve tedavisinde etkilidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF İNFÜZYON VE DOZ HESAPLAYICISI                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-7 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900 border-teal-500/30 ring-1 ring-teal-500/20'
            : 'bg-white border-teal-300 shadow-md ring-1 ring-teal-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Deksmedetomidin İnfüzyon Pompası &amp; Doz Hesaplayıcısı
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Hasta ağırlığına ve çözelti hacmine göre hassas mL/saat debi, opsiyonel bolus ve 24 saatlik tüketim hesabı
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <MonographCopyButton
              isDark={isDark}
              getText={() =>
                [
                  `DEKSMEDETOMİDİN İNFÜZYON ÖZETİ`,
                  `Hesaplama Ağırlığı: ${weightKg} kg`,
                  `Çözelti Konsantrasyonu: ${concentrationMcgMl.toFixed(1)} mcg/mL`,
                  `İdame Dozu: ${maintenanceDoseMcgKgHr.toFixed(2)} mcg/kg/saat (${hourlyDoseMcg.toFixed(1)} mcg/saat)`,
                  `Pompa Hızı: ${infusionRateMlHr.toFixed(1)} mL/saat`,
                  enableBolus
                    ? `Yükleme Bolusu: ${bolusDoseMcgKg} mcg/kg (${totalBolusDoseMcg.toFixed(0)} mcg / ${totalBolusVolumeMl.toFixed(1)} mL, ${bolusDurationMin} dk)`
                    : `Yükleme Bolusu: Devre dışı`,
                  `24 Saatlik Tüketim: ${dailyTotalMcg.toFixed(0)} mcg (~${dailyVialsNeeded.toFixed(1)} adet 200 mcg flakon)`,
                ].join('\n')
              }
            />
            <button
              type="button"
              onClick={() => {
                setWeightKg(70);
                setPrepType('vial_50');
                setEnableBolus(false);
                setBolusDoseMcgKg(1.0);
                setBolusDurationMin(10);
                setMaintenanceDoseMcgKgHr(0.7);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Varsayılana Sıfırla</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sol Kolon: Parametre Girişleri (7 Kolon) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 1. Hasta Ağırlığı & Endikasyon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={weightInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Hasta Vücut Ağırlığı (kg)
                </label>
                <div className="relative">
                  <input
                    id={weightInputId}
                    type="number"
                    min={2}
                    max={250}
                    step={1}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value)))}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-teal-500 ${
                      isDark
                        ? 'bg-slate-800/80 border-slate-700 text-white'
                        : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 pointer-events-none font-medium">
                    kg
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <ObesityDosingScaler
                  isDark={isDark}
                  drugName="Deksmedetomidin"
                  recommendedScalar="AdjBW"
                  secondaryScalar={{ type: 'LBW', context: 'Morbid Obez' }}
                  rationale="SOBA / Miller's Anesthesia: Morbid obez hastalarda TBW ile dozlama aşırı plazma düzeyi, derin bradikardi ve uzamış sedasyona yol açar; AdjBW veya LBW tercih edilir."
                  currentWeightKg={weightKg}
                  onApplyWeight={(w) => setWeightKg(Math.max(2, Math.min(250, w)))}
                />
              </div>

              <div>
                <label htmlFor={prepSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Çözelti Hazırlama / Flakon Modu
                </label>
                <select
                  id={prepSelectId}
                  value={prepType}
                  onChange={(e) => setPrepType(e.target.value as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="vial_50">Hazır Flakon: 200 mcg / 50 mL (4 mcg/mL)</option>
                  <option value="vial_100">Hazır Flakon: 400 mcg / 100 mL (4 mcg/mL)</option>
                  <option value="ampoule_custom">Ampul (200 mcg / 2 mL) + Serbest Hacim</option>
                  <option value="custom_conc">Özel Konsantrasyon (mcg/mL serbest giriş)</option>
                </select>
              </div>
            </div>

            {/* Özel Seyreltme / Konsantrasyon Detayı */}
            {prepType === 'ampoule_custom' && (
              <div className="p-3.5 rounded-xl border border-teal-500/30 bg-teal-500/5 flex items-center justify-between gap-4">
                <div>
                  <label htmlFor={customVolInputId} className="text-xs font-bold text-teal-900 dark:text-teal-200 block">
                    1 Ampul (200 mcg) Tamamlanacak Toplam Hacim (mL SF / D5W):
                  </label>
                  <span className="text-[11px] text-teal-700 dark:text-teal-400">
                    Örn. 50 mL = 4 mcg/mL · Sıvı kısıtlı hastada 25 mL = 8 mcg/mL
                  </span>
                </div>
                <div className="w-28 relative">
                  <input
                    id={customVolInputId}
                    type="number"
                    min={10}
                    max={500}
                    value={customDiluentVolume}
                    onChange={(e) => setCustomDiluentVolume(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg border border-teal-500/40 text-center font-bold text-sm bg-white dark:bg-slate-800"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-slate-400 pointer-events-none">mL</span>
                </div>
              </div>
            )}

            {prepType === 'custom_conc' && (
              <div className="p-3.5 rounded-xl border border-teal-500/30 bg-teal-500/5 flex items-center justify-between gap-4">
                <div>
                  <label htmlFor={customConcInputId} className="text-xs font-bold text-teal-900 dark:text-teal-200 block">
                    Özel Çözelti Konsantrasyonu (mcg/mL):
                  </label>
                  <span className="text-[11px] text-teal-700 dark:text-teal-400">
                    Örn. Pediatrik özel seyreltme (2 mcg/mL veya 8 mcg/mL)
                  </span>
                </div>
                <div className="w-28 relative">
                  <input
                    id={customConcInputId}
                    type="number"
                    min={0.1}
                    max={100}
                    step={0.5}
                    value={customConcInput}
                    onChange={(e) => setCustomConcInput(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg border border-teal-500/40 text-center font-bold text-sm bg-white dark:bg-slate-800"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-slate-400 pointer-events-none">mcg/mL</span>
                </div>
              </div>
            )}

            {/* 2. Yükleme Dozu (Bolus) Anahtarı */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                enableBolus
                  ? isDark
                    ? 'bg-amber-950/20 border-amber-800'
                    : 'bg-amber-50 border-amber-300'
                  : isDark
                  ? 'bg-slate-800/40 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor={bolusToggleId} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 cursor-pointer">
                    <span>Yükleme Dozu (Bolus) Uygula</span>
                    {enableBolus && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                        Aktif
                      </span>
                    )}
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    YBÜ mekanik ventilasyonda hipotansiyon ve bradikardiyi önlemek için rutin bolus önerilmez. Prosedürel sedasyonda veya hekim isteminde açılabilir.
                  </p>
                </div>

                <input
                  id={bolusToggleId}
                  type="checkbox"
                  checked={enableBolus}
                  onChange={(e) => setEnableBolus(e.target.checked)}
                  className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500 border-slate-300 cursor-pointer"
                />
              </div>

              {enableBolus && (
                <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-900/50 grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={bolusDoseInputId} className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Bolus Dozu (mcg/kg):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={bolusDoseInputId}
                        type="number"
                        min={0.2}
                        max={1.5}
                        step={0.1}
                        value={bolusDoseMcgKg}
                        onChange={(e) => setBolusDoseMcgKg(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                      />
                      <span className="text-xs text-slate-400">mcg/kg</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={bolusDurationInputId} className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      İnfüzyon Süresi (dk):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={bolusDurationInputId}
                        type="number"
                        min={5}
                        max={30}
                        step={5}
                        value={bolusDurationMin}
                        onChange={(e) => setBolusDurationMin(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                      />
                      <span className="text-xs text-slate-400">dakika</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. İdame Dozu Ayarı (Slider & Butonlar & Sayısal Giriş) */}
            <div className="space-y-2 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor={maintDoseRangeId} className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    İstenen İnfüzyon Dozu (mcg/kg/saat):
                  </label>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Önerilen standart aralık: 0.20 – 1.40 mcg/kg/saat
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min={0.05}
                    max={2.5}
                    step={0.05}
                    value={maintenanceDoseMcgKgHr}
                    onChange={(e) => setMaintenanceDoseMcgKgHr(Math.max(0.05, Math.min(2.5, Number(e.target.value) || 0.7)))}
                    className="w-20 px-2.5 py-1.5 rounded-lg border border-teal-500/40 text-center font-mono font-extrabold text-sm text-teal-600 dark:text-teal-400 bg-white dark:bg-slate-800"
                  />
                  <span className="text-xs text-slate-500 font-medium">mcg/kg/sa</span>
                </div>
              </div>

              <input
                id={maintDoseRangeId}
                type="range"
                min={0.1}
                max={1.5}
                step={0.05}
                value={maintenanceDoseMcgKgHr}
                onChange={(e) => setMaintenanceDoseMcgKgHr(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />

              <div className="flex items-center justify-between gap-1.5 pt-1">
                <div className="flex items-center gap-1">
                  {[0.2, 0.4, 0.7, 1.0, 1.4].map((dose) => (
                    <button
                      key={dose}
                      type="button"
                      onClick={() => setMaintenanceDoseMcgKgHr(dose)}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-medium border transition-colors cursor-pointer ${
                        maintenanceDoseMcgKgHr === dose
                          ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {dose}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setMaintenanceDoseMcgKgHr((prev) => Math.max(0.1, Number((prev - 0.05).toFixed(2))))}
                    className="px-2 py-1 rounded border text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 cursor-pointer"
                    title="0.05 azalt"
                  >
                    -0.05
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaintenanceDoseMcgKgHr((prev) => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
                    className="px-2 py-1 rounded border text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-700 cursor-pointer"
                    title="0.05 artır"
                  >
                    +0.05
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Hesaplanan Pompa Hızı ve Klinik Çıktılar (5 Kolon) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Ana İnfüzyon Hızı Kartı */}
            <div
              className={`p-5 rounded-2xl border text-center relative overflow-hidden transition-all ${
                isDark
                  ? 'bg-teal-950/30 border-teal-500/40 text-teal-100'
                  : 'bg-teal-50/90 border-teal-300 text-teal-950 shadow-xs'
              }`}
            >
              <span className="text-xs uppercase tracking-wider font-bold text-teal-700 dark:text-teal-300 block mb-1">
                İnfüzyon Pompası Hızı (İdame)
              </span>

              <div className="flex items-baseline justify-center gap-2 my-2">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-teal-600 dark:text-teal-400">
                  {infusionRateMlHr.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-slate-600 dark:text-slate-300">mL/saat</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-white/60 dark:bg-slate-900/60 border border-teal-500/20 text-slate-700 dark:text-slate-300">
                <span>{weightKg} kg</span>
                <span>·</span>
                <span>{maintenanceDoseMcgKgHr} mcg/kg/sa</span>
                <span>·</span>
                <span>{concentrationMcgMl.toFixed(1)} mcg/mL</span>
              </div>

              <div className="mt-4 pt-3 border-t border-teal-500/20 grid grid-cols-2 gap-2 text-left text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Saatlik İlaç Dozu:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {hourlyDoseMcg.toFixed(1)} mcg/saat
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Aktif Konsantrasyon:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {concentrationMcgMl.toFixed(2)} mcg/mL
                  </span>
                </div>
              </div>
            </div>

            {/* Yükleme Dozu Çıktısı (Açıksa) */}
            {enableBolus && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-3 ${
                  isDark
                    ? 'bg-amber-950/25 border-amber-800/60 text-amber-200'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-amber-200/50 dark:border-amber-800/50">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-amber-700 dark:text-amber-300">
                    <Activity className="w-4 h-4" />
                    <span>Yükleme Bolus Pompa Ayarı ({bolusDurationMin} dk)</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200">
                    Hedef: {bolusDoseMcgKg} mcg/kg
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/40">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                      Eşdeğer Pompa Hızı:
                    </span>
                    <span className="font-mono font-bold text-base text-amber-600 dark:text-amber-400 block">
                      {bolusRateMcgKgHr.toFixed(1)} mcg/kg/saat
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      ({bolusDurationMin} dk boyunca)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-800/40">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
                      Bolus Pompa Debisi:
                    </span>
                    <span className="font-mono font-bold text-base text-amber-700 dark:text-amber-300 block">
                      {bolusPumpRateMlHr.toFixed(1)} mL/saat
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Toplam: {totalBolusVolumeMl.toFixed(1)} mL ({totalBolusDoseMcg.toFixed(0)} mcg)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-100/60 dark:bg-amber-900/30 text-[11px] leading-relaxed text-amber-900 dark:text-amber-200">
                  <div className="font-semibold flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 inline" />
                    <span>Kronometre &amp; Uygulama Protokolü:</span>
                  </div>
                  <span>
                    Pompayı <strong>{bolusRateMcgKgHr.toFixed(1)} mcg/kg/saat</strong> (veya <strong>{bolusPumpRateMlHr.toFixed(1)} mL/saat</strong>) hızına ayarlayın. {bolusDurationMin} dakika süreyle kronometre tutun. {bolusDurationMin} dakika dolduğunda pompayı doğrudan seçilen idame hızına (<strong>{maintenanceDoseMcgKgHr.toFixed(2)} mcg/kg/saat</strong> / {infusionRateMlHr.toFixed(1)} mL/saat) düşürün.
                  </span>
                </div>
              </div>
            )}

            {/* 24 Saatlik Kümülatif İhtiyaç */}
            <div
              className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                24 Saatlik Tahmini Tüketim &amp; Sıvı Yükü:
              </span>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Toplam İlaç</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {dailyTotalMcg.toFixed(0)} mcg
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Sıvı Hacmi</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {dailyTotalMl.toFixed(1)} mL
                  </span>
                </div>

                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Flakon İhtiyacı</span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                    ~{Math.ceil(dailyVialsNeeded)} Adet (200 mcg)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0)                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Deksmedetomidin 200 mcg / 2 mL Konsantre Flakon (Precedex / Sedadex / Dekstomid / Hipnodex)',
            presentation: 'IV infüzyon için berrak, renksiz konsantre çözelti içeren 2 mL cam flakon (Türkiye’de en yaygın ruhsatlı hastane formu)',
            concentration: '100 mcg/mL (KONSANTRE!)',
            saltOrBaseNote: '200 mcg deksmedetomidin baza eşdeğer 236 mcg deksmedetomidin HCl içerir. Sulandırılmadan IV puşe KESİNLİKLE YAPILMAZ (fatal bradikardi / AV tam blok!).',
            alertLevel: 'high',
          },
          {
            name: 'Deksmedetomidin 200 mcg / 50 mL & 400 mcg / 100 mL Hazır İnfüzyon',
            presentation: 'Kullanıma hazır (premixed) %0.9 NaCl içinde 50 mL veya 100 mL cam flakon / torba (mevcut olduğu merkezlerde)',
            concentration: '4 mcg/mL (Hazır)',
            saltOrBaseNote: 'Doğrudan infüzyon pompasına bağlanır; ek seyreltme gerektirmez.',
            alertLevel: 'standard',
          },
        ]}
        standardDilutions={[
          'Standart Erişkin (4 mcg/mL): 1 flakon (200 mcg / 2 mL) + 48 mL %0.9 NaCl veya %5 Dekstroz → toplam 50 mL (enjektör pompası standardı).',
          'Yüksek Hacimli YBÜ (4 mcg/mL): 2 flakon (400 mcg / 4 mL) + 96 mL SF/D5W → toplam 100 mL.',
          'Sıvı Kısıtlı YBÜ (8 mcg/mL — Santral Tercihli): 1 flakon (200 mcg / 2 mL) + 23 mL SF → toplam 25 mL (veya 2 flakon → 50 mL); yüksek konsantrasyon etiketi zorunludur.',
          'İntranazal Pediatrik Premedikasyon (Off-Label): 100 mcg/mL konsantre formdan mukozal atomizer (MAD) ile 1–2 mcg/kg (burun deliği başına küçük hacim).',
        ]}
        concentrationTrapWarning="200 mcg/2 mL konsantre flakon (100 mcg/mL), standart 4 mcg/mL infüzyon çözeltisinin 25 KATIDIR! Konsantre flakon asla doğrudan IV puşe edilmez; her enjektör/torba üzerine 4 mcg/mL veya 8 mcg/mL konsantrasyonu mutlaka yazılmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DAMAR YOLU, pH/OZMOLALİTE, Y-SITE UYUMLULUK & EKSTRAVAZASYON (v4.0)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        accessRequirement="peripheral-ok"
        accessSummary="Standart 4 mcg/mL dilüsyon periferik veya santral IV hattan elektronik infüzyon/şırınga pompasıyla güvenle uygulanır. Sıvı kısıtlı hastalarda 8 mcg/mL konsantre rejim için ayrı santral lümen tercih edilir. Ölü boşluk (dead-space) yıkaması yapılmamalıdır."
        phRange="4.5 – 7.0 (Hafif Asidik – Nötr)"
        osmolalityNote="4 mcg/mL SF/D5W dilüsyonu izotoniktir (~290–300 mOsm/kg); venöz irritasyon ve flebit potansiyeli çok düşüktür."
        compatibleDiluents={[
          '%0.9 Sodyum Klorür (İzotonik SF) — 24 saat stabil',
          '%5 Dekstroz (D5W) — 24 saat stabil',
          'Ringer Laktat (RL) & %20 Mannitol — uyumlu',
        ]}
        stabilityNote="Hazırlanan 4 mcg/mL dilüsyon oda sıcaklığında (20–25 °C) 24 saat, buzdolabında (2–8 °C) 48 saat stabildir. Doğal kauçuk içeren setlerde hafif adsorpsiyon olabileceğinden PVC/sentetik setler tercih edilir."
        ySiteCompatible={[
          'Propofol',
          'Midazolam',
          'Remifentanil',
          'Fentanil',
          'Morfin',
          'Ketamin',
          'Norepinefrin',
          'Epinefrin',
          'Dopamin',
          'Dobutamin',
          'Roküronyum',
          'Cisatrakuryum',
        ]}
        ySiteIncompatible={[
          'Amfoterisin B (çökelme!)',
          'Diazepam (çökelme!)',
          'Kan / Eritrosit / Plazma Ürünleri (uyumluluk kanıtlanmamıştır — ayrı hat)',
        ]}
        extravasationProtocol="Non-vezikandır; ekstravazasyon doku nekrozu yapmaz. İnfüzyonu durdurup kateteri aspire edin, ekstremiteyi eleve edin. Asıl hat güvenliği kuralı: deksmedetomidin hattından hızlı sıvı/ilaç puşesi yapmayın (ölü boşluktaki ilaç tek seferde giderek ani bradikardi/hipertansiyon yapar)."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. BÖBREK YETMEZLİĞİNDE DOZ REVİZYONU                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-organ"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Droplet className="w-5 h-5 text-teal-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Böbrek Yetmezliğinde Doz Revizyonu Kılavuzu
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="py-2.5 pr-4">Böbrek Fonksiyon Düzeyi / Tedavi</th>
                <th className="py-2.5 px-4">Doz Revizyonu Gerekir mi?</th>
                <th className="py-2.5 pl-4">Klinik Açıklama &amp; Eylem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR ≥ 50 mL/dk (Normal / Hafif)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Standart erişkin doz protokolü uygulanır.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR 30–49 mL/dk (Evre 3)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Aktif ilacın klirensi etkilenmez. Hedef RASS skoruna göre titre edilir.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR 15–29 mL/dk (Evre 4)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  İnaktif glukuronid metabolitleri birikebilir; metabolitler hemodinamik etki yapmaz. Sedasyon titrasyonu izlenir.
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  GFR &lt; 15 mL/dk (Evre 5 / Diyaliz Dışı)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Doz azaltımı gerekmez. Ancak sedasyon derinliği titrasyon adımları dikkatle takip edilmelidir.
                </td>
              </tr>
              <tr className="bg-slate-50/60 dark:bg-slate-800/30">
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  Haftada 3 Gün Hemodiyaliz (HD)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Plazma proteinlerine bağlanma oranı çok yüksektir (%94). Hemodiyaliz filtresi ile temizlenmez; diyaliz sonrası ek doza gerek yoktur.
                </td>
              </tr>
              <tr className="bg-slate-50/60 dark:bg-slate-800/30">
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  Periton Diyalizi (PD)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  Periton membranından anlamlı klirens gerçekleşmez.
                </td>
              </tr>
              <tr className="bg-slate-50/60 dark:bg-slate-800/30">
                <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">
                  Sürekli Renal Replasman (CRRT / CVVH)
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">GEREKMEZ</span>
                </td>
                <td className="py-3 pl-4 text-slate-600 dark:text-slate-400">
                  CRRT membranlarından anlamlı eliminasyon olmaz. Standart infüzyon dozlaması sürdürülür.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONU                            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Activity className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Karaciğer Yetmezliğinde Doz Revizyonu (Child-Turcotte-Pugh Sınıflaması)
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
          Deksmedetomidin neredeyse tamamen hepatik yolla metabolize edildiğinden, karaciğer bozukluğunda klirens belirgin
          şekilde azalır ve eliminasyon yarı ömrü 2.2 saatten <strong>7.4 saate kadar</strong> uzayabilir.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          {/* Class A */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Child-Pugh Class A (Hafif)
            </span>
            <span className="font-semibold text-amber-600 dark:text-amber-400 block">
              Doz Azaltımı Düşünülmeli
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Klirens hafif düşüktür. Başlangıç dozu alt sınırdan (0.2–0.4 mcg/kg/saat) başlanmalı, titrasyon aralıkları
              uzatılmalıdır.
            </p>
          </div>

          {/* Class B */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
            <span className="font-bold text-sm text-amber-950 dark:text-amber-200">
              Child-Pugh Class B (Orta)
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-300 block">
              %25 – %50 Doz Azaltımı Önerilir
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              Klirens yaklaşık %50 azalmıştır. İdame infüzyon hızı yarı yarıya düşürülmeli, kümülatif sedasyon derinliği
              sık kontrol edilmelidir.
            </p>
          </div>

          {/* Class C */}
          <div className="p-4 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/20 space-y-1.5">
            <span className="font-bold text-sm text-rose-950 dark:text-rose-200">
              Child-Pugh Class C (Şiddetli)
            </span>
            <span className="font-bold text-rose-700 dark:text-rose-300 block">
              %50 veya Daha Fazla Doz Azaltımı
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              Klirens dramatik olarak çökmüştür (t½: 7.4 saat). Çok düşük dozlarla (0.1–0.2 mcg/kg/saat) başlanmalı,
              yükleme bolusu kesinlikle yapılmamalıdır.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="Yükleme Atla · %25–50 Doz Azaltımı"
        geriatricPoints={[
          'Yaşlı (>65 yaş), kırılgan (frail) veya diyabetik otonom nöropatili hastalarda sempatik rezerv azalmıştır; bradikardi, AV blok ve hipotansiyon riski gençlere göre belirgin yüksektir.',
          'Yükleme bolusu KESİNLİKLE ATLANMALI (prosedürel sedasyonda zorunluysa ≤ 0.5 mcg/kg 15–20 dk’da); idame infüzyonu düşük hızdan (0.2 mcg/kg/saat) başlatılarak ≥ 30 dk aralıklarla yavaş titre edilmelidir.',
          'SPICE III Yaş Etkileşimi: >65 yaş kritik YBÜ hastalarında (özellikle postoperatif/deliryum riskli olgularda) deksmedetomidin olumlu mortalite/deliryum profili gösterirken, ≤65 yaş grupta EMA 2022 uyarısı akılda tutulmalıdır.',
        ]}
        obesityWeightScalarBadge="AdjBW (Tercih) veya LBW"
        obesityPoints={[
          'SOBA ve Miller’s Anesthesia kılavuzları: Morbid obez hastalarda (BMI ≥ 30–40 kg/m²) deksmedetomidinin klerensi TBW ile doğrusal artmaz; TBW üzerinden dozlama aşırı yüksek plazma düzeylerine, derin bradikardiye ve uzamış sedasyona yol açar.',
          'Doz hesaplamasında Düzeltilmiş Vücut Ağırlığı (AdjBW) veya Yağsız Vücut Kütlesi (LBW) kullanılmalıdır.',
          'Solunum dürtüsünü koruduğu için obez/OSA hastalarında avantajlıdır; ancak RASS -3 ve daha derin sedasyonda faringeal gevşemeye bağlı parsiyel üst havayolu obstrüksiyonu gelişebileceği unutulmamalıdır.',
        ]}
        clinicalNote="Yukarıdaki etkileşimli hesaplayıcı içindeki Obezite Doz Ölçekleyici ile hastanın AdjBW/LBW değeri tek tıkla hesaplamaya aktarılabilir."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. GEBELİK VE LAKTASYON KILAVUZU                                     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="FDA Gebelik Kategorisi C · Plasentayı kısmen geçer; maternal fayda fetüs riskine üstünse kullanılır."
        pregnancyDetails={[
          'Obstetrik anestezide spinal bloğa veya doğum analjezisine adjuvan olarak kullanımı sınırlı ve seçili olgulardadır; fetal bradikardi açısından yakından izlenmelidir.',
          'Yoğun bakımda gebe hastada konfor/sedasyon gerektiğinde en düşük etkin idame dozu tercih edilmelidir.',
        ]}
        lactationSummary="Anne sütüne çok düşük düzeyde geçer (RID < %1); oral biyoyararlanımı çok düşüktür."
        lactationDetails={[
          'Kısa süreli ameliyathane/sedasyon uygulaması sonrası anne tamamen uyandığında emzirme güvenlidir.',
          'Uzun süreli yoğun bakım infüzyonu sonrası prematüre veya yenidoğan bebeklerde uyku/emme takibi veya 24 saatlik ara önerilebilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-olumsuz"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <HeartPulse className="w-5 h-5 text-rose-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Önemli Olumsuz Etkiler (Adverse Effects)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-1">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Bradikardi (%25–40)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Sempatik deşarj baskılandığı için sinüs bradikardisi sıktır. KTA &lt; 50/dk olduğunda infüzyon hızı
              düşürülür, gerekirse atropin veya glikopirolat uygulanır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-1">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Hipotansiyon (%30–50)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Santral sempatoliz ile vazodilatasyon gelişir. MAP &lt; 60 mmHg ise sıvı replasmanı, doz azaltımı veya düşük
              doz vazopressör desteği sağlanır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-500/5 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">Bifazik Tansiyon Yanıtı</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Hızlı yükleme bolusunda periferik α₂B uyarımı ile önce geçici <strong>hipertansiyon</strong>,
              ardından santral etkiyle <strong>hipotansiyon</strong> görülür. Bu nedenle bolus yavaş (10-20 dk) verilmelidir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Rebound &amp; Yoksunluk</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              &gt; 48–72 saat yüksek doz alan hastalarda aniden kesilirse klonidin benzeri yoksunluk gelişir: Rebound
              hipertansiyon, taşikardi, ajitasyon. Doz 24–48 saatte kademeli azaltılmalıdır.
            </p>
          </div>
        </div>

        {/* Detaylı Klinik Olumsuz Etkiler: AVP Eksikliği / Direnci ve Tolerans Gelişimi */}
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Arginine Vasopressin (AVP) Eksikliği ve/veya Direnci */}
          <div className="p-4 rounded-xl border border-cyan-300 dark:border-cyan-800/60 bg-cyan-50/40 dark:bg-cyan-950/20 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-200 dark:border-cyan-900/50">
              <span className="font-bold text-sm text-cyan-900 dark:text-cyan-200 flex items-center gap-1.5">
                <Droplet className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span>Arginine Vasopressin (AVP) Eksikliği ve Direnci</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300">
                Santral &amp; Nefrojenik DI Benzeri Tablo
              </span>
            </div>

            <div className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              <div>
                <strong className="text-cyan-950 dark:text-cyan-300 block mb-0.5">Patofizyolojik Mekanizma:</strong>
                <p>
                  Deksmedetomidin, hipotalamik supraoptik ve paraventriküler nükleuslardaki presinaptik α₂-adrenoseptörleri
                  uyararak hipofizer <strong>Arginin Vazopressin (AVP / ADH)</strong> salınımını doğrudan baskılar.
                  Eş zamanlı olarak toplayıcı tübüllerdeki α₂B reseptörleri üzerinden adenilat siklazı inhibe ederek renal
                  V₂ reseptör cAMP yolağına karşı periferik direnç oluşturur ve <strong>Akuaporin-2 (AQP2)</strong> su kanallarının
                  apikal membrana göçünü engeller. Böylece mikst tipte (santral + nefrojenik) diabetes insipidus benzeri serbest su kaybı ortaya çıkar.
                </p>
              </div>

              <div>
                <strong className="text-cyan-950 dark:text-cyan-300 block mb-0.5">Klinik Prezantasyon &amp; Laboratuvar:</strong>
                <p>
                  Özellikle yüksek doz (≥ 0.7–1.0 mcg/kg/saat) veya &gt; 24–48 saat uzamış infüzyon alan YBÜ hastalarında
                  ani başlangıçlı masif poliüri (<strong>&gt; 4–5 mL/kg/saat</strong> veya <strong>&gt; 3–4 L/gün</strong>),
                  idrar dansitesinde belirgin düşüş (&lt; 1.005), hipoozmolar idrar (&lt; 200–300 mOsm/kg) ve serbest su kaybına
                  bağlı hızla gelişen <strong>hipernatremi (serum Na⁺ &gt; 145–155 mEq/L)</strong> ile dehidratasyon tablosu görülür.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-cyan-200 dark:border-cyan-800/40">
                <strong className="text-cyan-950 dark:text-cyan-200 block mb-1">Klinik Yönetim &amp; Eylem Protokolü:</strong>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <li><strong>İzlem:</strong> Saatlik idrar debisi, serum sodyumu, plazma ve idrar ozmolaritesi sıkı takip edilir.</li>
                  <li><strong>İlaç Kesilmesi:</strong> Belirgin poliüri veya hipernatremi geliştiğinde deksmedetomidin infüzyonu vakit kaybetmeden azaltılmalı veya sonlandırılmalıdır; ilaç kesilince diürez genellikle <strong>12–24 saat içinde normale döner</strong>.</li>
                  <li><strong>Sıvı Replasmanı:</strong> Serbest su açığı hesaplanarak hipotonik sıvılarla (%5 Dekstroz) yerine konur (Na düşüşü &lt; 8–10 mEq/L/gün hedeflenir).</li>
                  <li><strong>Medikal Tedavi:</strong> Masif veya inatçı tablolarda desmopressin (dDAVP 1–2 mcg IV/SC) denenebilir; asıl küratif tedavi infüzyonun kesilmesidir.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Tolerans Gelişimi ve Taşifilaksi */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-amber-200 dark:border-amber-900/50">
              <span className="font-bold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Tolerans Gelişimi, Taşifilaksi ve Tapering</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                Reseptör Desensitizasyonu &amp; Doz Eskalasyonu
              </span>
            </div>

            <div className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
              <div>
                <strong className="text-amber-950 dark:text-amber-300 block mb-0.5">Hücresel &amp; Moleküler Tolerans:</strong>
                <p>
                  Sürekli infüzyon 24–48 saati aştığında lokus seruleustaki presinaptik ve postsinaptik α₂-adrenoseptörlerde
                  G-proteini kenet kaybı (uncoupling), G-proteini kenetli reseptör kinazları (GRK) ile fosforilasyon,
                  reseptör internalizasyonu ve <strong>down-regülasyon (yoğunluk azalması)</strong> gelişir.
                </p>
              </div>

              <div>
                <strong className="text-amber-950 dark:text-amber-300 block mb-0.5">Klinik Görünüm &amp; Doz Eskalasyonu:</strong>
                <p>
                  Aynı sedasyon derinliğini (RASS -1/-2) sürdürebilmek için infüzyon hızının sürekli artırılması zorunluluğu
                  (taşifilaksi) doğar. Yüksek dozlara rağmen sedatif ve opioid koruyucu analjezik yanıt körelir, hastada
                  ajitasyon ve otonomik aktivasyon belirtileri görülebilir.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/70 border border-amber-200 dark:border-amber-800/40">
                <strong className="text-amber-950 dark:text-amber-200 block mb-1">Çekilme Reboundu &amp; Tapering (Kademeli Kesme) Protokolü:</strong>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <li><strong>Akut Kesilme Riski:</strong> &gt; 48 saat alan hastada aniden kesilirse şiddetli sempatik deşarj (hipertansif kriz, sinüs taşikardisi, tremor, ajitasyon) tetiklenir.</li>
                  <li><strong>Kademeli Azaltma:</strong> İnfüzyon her 6–12 saatte bir <strong>%25–50 oranında kademeli olarak</strong> düşürülmeli, doğrudan stoplanmamalıdır.</li>
                  <li><strong>Enteral Klonidin Köprüsü:</strong> YBÜ'den servise çıkışta veya deksmedetomidinden ayrılma esnasında oral/enteral <strong>klonidin (0.1–0.3 mg/gün oral veya transdermal flaster)</strong> başlanarak infüzyon güvenle sonlandırılır.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR (v4.0)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'SPICE III ≤ 65 Yaş Mortalite Sinyali (EMA 2022 Güvenlik Uyarısı)',
            detail:
              'SPICE III RKÇ’sinin (NEJM 2019; Intensive Care Med 2021 alt grup analizi) ardından EMA (2022), ≤ 65 yaş kritik yoğun bakım hastalarında deksmedetomidinin standart sedatiflere kıyasla artmış 90 günlük mortalite riski taşıyabileceğine dair resmi uyarı yayımlamıştır. Genç/non-operatif kritik hastalarda alternatif sedasyonla fayda-risk dengesi gözetilmelidir.',
          },
          {
            title: 'Deksmedetomidin Kaynaklı Santral Hipertermi (İlaç Ateşi)',
            detail:
              'Uzun süreli YBÜ infüzyonlarında enfeksiyon dışı, antibiyotiğe yanıtsız yüksek ateş (≥ 38,5–40 °C) gelişebilir ve sıklıkla sepsis sanılır. Hipotalamik α₂ termoregülasyon etkisine bağlıdır; infüzyon kesildiğinde ateş 6–12 saat içinde hızla geriler.',
          },
          {
            title: 'Hipovolemi & Yükleme Bolusu Bifazik Yanıtı',
            detail:
              'Damar içi volümü tükenmiş hastalarda santral vazomotor tonus baskılandığında derin refrakter hipotansiyon gelişir (önce volüm resüsitasyonu!). Hızlı IV bolus (< 10 dk) periferik α₂B uyarısıyla geçici şiddetli hipertansiyon, ardından derin bradikardi/AV blok/asistoli tetikler; YBÜ ve kırılgan hastalarda yükleme atlanmalıdır.',
          },
          {
            title: 'Eşzamanlı Bradikardizan İlaçlar & Otonomik Nöropati',
            detail:
              'Beta-blokerler (metoprolol, esmolol), non-dihidropiridin KKB’ler (diltiazem, verapamil), digoksin, amiodaron veya remifentanil alan hastalarda ve diyabetik otonom nöropatide sinerjik ağır bradikardi ve asistoli riski katlanır.',
          },
          {
            title: 'Solunum Avantajı vs Orofaringeal Obstrüksiyon',
            detail:
              'Medüller solunum güdüsünü ve CO₂ yanıtını korur; ancak derin sedasyonda (RASS ≤ -3) veya obstrüktif uyku apnesi (OSA) olanlarda orofaringeal kas gevşemesiyle parsiyel üst havayolu obstrüksiyonu gelişebileceği akılda tutulmalıdır.',
          },
          {
            title: 'Poliüri / Hipernatremi (AVP Baskılanması) & Kademeli Kesme',
            detail:
              'Uzamış/yüksek doz infüzyonlarda santral + nefrojenik DI benzeri masif poliüri gelişirse ilaç kesilmelidir (12–24 saatte düzelir). > 48–72 saat alan hastalarda ani kesilme rebound hipertansiyon/taşikardi yapar; 24–48 saatte kademeli azaltılmalı veya oral klonidin köprüsü kurulmalıdır.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (7-TM α₂A / α₂B / α₂C-Adrenerjik GPCR [α₂:α₁ = 1620:1; Gαi/o] & İmidazolin I₁/I₂ Reseptörleri)',
          summary:
            'Deksmedetomidin (medetomidinin aktif dekstro-izomeri), α₂:α₁ bağlanma seçiciliği 1620:1 olan (klonidinin [220:1] ~8 katı) ultra-selektif bir imidazol türevi tam α₂-adrenerjik agonisti ve imidazolin (I₁/I₂) reseptör ligandıdır. Beyin sapı Locus Coeruleus (LC), medulla spinalis arka boynuz Substantia Gelatinosa (Lamina II), rostral ventrolateral medulla (RVLM) ve periferik damar düz kası zarlarındaki 7-transmembran (7-TM) α₂A, α₂B ve α₂C G-proteini kenetli reseptörlerine (GPCR) bağlanarak pertussis toksinine duyarlı heterotrimerik Gαi/o proteinlerini aktive eder (Miller’s 10th Ed. / Stoelting’s 6th Ed. / Goodman & Gilman 14th Ed.).',
          points: [
            'Locus Coeruleus, RVLM & Spinal Arka Boynuz Nöron Zarı (α₂A-Adrenerjik Reseptör — Ana Terapötik Hedef): Beyin sapındaki en büyük noradrenerjik çekirdek olan Locus Coeruleus (LC) nöronlarının somatodendritik postsinaptik ve presinaptik otoreseptör zarlarında, RVLM vazomotor merkezinde ve spinal kord arka boynuzu (Substantia Gelatinosa) primer afferent Aδ/C terminalleri ile ikinci sıra projeksiyon nöronlarında yoğunlaşan α₂A reseptörlerini uyarır → fizyolojik NREM benzeri sedasyon, anksiyoliz, santral sempatoliz ve spinal/supraspinal analjeziden sorumludur.',
            'Vasküler Düz Kas Sarkolemması & Renal Toplayıcı Tübül Zarı (α₂B-Adrenerjik Reseptör): Periferik direnç arteriyollerinin ve venüllerin postsinaptik düz kas zarında yer alan α₂B reseptörleri (özellikle hızlı IV yükleme bolusuyla oluşan yüksek pik plazma konsantrasyonlarında) doğrudan vazokonstriksiyonu tetikler; ayrıca hipotalamus/hipofiz ve böbrek kortikal toplayıcı tübül epitel zarında su dengesini modüle eder ve santral termoregülasyon (titreme eşiği) kontrolüne katılır.',
            'Striatum, Hipokampus & Dorsal Kök Gangliyonu Zarı (α₂C-Adrenerjik Reseptör): Bazal gangliyonlar, limbik korteks, adrenal medulla kromafin hücreleri ve spinal arka boynuzdaki α₂C reseptörlerini uyararak akustik/dokunsal irkilme (startle) yanıtını, soğuk kaynaklı vazokonstriksiyonu, adrenal epinefrin deşarjını ve dopaminerjik/adrenerjik stres işlemesini baskılar.',
            'Beyin Sapı & Mitokondriyal İmidazolin (I₁ / I₂) Bağlanma Bölgeleri: İmidazol halkası sayesinde RVLM ve nucleus reticularis lateralis’teki non-adrenerjik İmidazolin-1 (I₁) reseptörlerine (santral hipotansif/sempatolitik sinerji) ve astrosit/mitokondri zarındaki İmidazolin-2 (I₂) bağlanma bölgelerine (nöroprotektif anti-apoptotik sinyal) bağlanır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'α₂-GPCR aktivasyonuyla ayrışan heterotrimerik Gαi/o ve Gβγ alt birimleri; nöron içinde cAMP/PKA baskılanması, GIRK K⁺ kanalı açılmasıyla hiperpolarizasyon ve N/P-tipi Ca²⁺ kanalı blokajıyla veziküler ekzositoz durmasını tetiklerken, yüksek konsantrasyonda damar düz kasında Gαq/i aracılı Ca²⁺ girişi üretir:',
          points: [
            'Sitozolik Adenilat Siklaz İnhibisyonu (Gαi/o → AC ↓ → cAMP ↓ → PKA ↓ Kaskadı): Aktive olan Gαi/o alt birimi membran bağlı Adenilat Siklazı (AC) doğrudan inhibe eder; hücre içi siklik AMP (cAMP) sentezi düşer ve cAMP-bağımlı Protein Kinaz A (PKA) aktivitesi baskılanır → hedef iyon kanallarının ve sinaptik vezikül proteinlerinin bazal fosforilasyonu azalır.',
            'Somatodendritik GIRK (Kir3) Kanal Açılımı & Nöronal Hiperpolarizasyon (Gβγ → K⁺ Çıkışı ↑): Serbestleşen Gβγ dimeri, postsinaptik/somatodendritik zardaki G-Proteini Kapılı İçeri Doğrultucu Potasyum (GIRK / Kir3) kanallarına doğrudan bağlanarak kanalı açar → hücre dışına K⁺ iyon çıkışı (efluksu) hızlanır, Locus Coeruleus ve spinal arka boynuz projeksiyon nöronlarının zar potansiyeli −60 mV’tan −75 mV’a hiperpolarize olur ve spontan aksiyon potansiyeli ateşlemesi tamamen susar.',
            'Presinaptik N/P/Q-Tipi Ca²⁺ Kanal Blokajı & Vezikül Ekzositozunun Durması (Gβγ → Cav2.2 ↓ → NE / Glutamat / P Maddesi ↓): Presinaptik akson terminalinde Gβγ kompleksi voltaj-kapılı N-tipi (Cav2.2) ve P/Q-tipi (Cav2.1) Ca²⁺ kanallarını doğrudan inhibe eder ve SNARE (SNAP-25) füzyon kompleksini frenler → sinaptik veziküllerden Noradrenalin (sempatik sinir uçları ve LC), Glutamat ve P Maddesi / CGRP (spinal arka boynuz nosiseptif Aδ/C terminalleri) ekzositozu durur.',
            'Vasküler Düz Kas α₂B Ca²⁺ Girişi (Faz-1 Hipertansiyon) vs Renal Toplayıcı Tübül AQP2 İnhibisyonu: Yüksek plazma konsantrasyonlarında (>1,5–2 ng/mL; hızlı IV bolus) damar düz kası α₂B reseptörleri Gαi/Gαq üzerinden L-tipi Ca²⁺ girişini ve PLC-IP₃-Ca²⁺-MLCK kaskadını tetikleyerek geçici düz kas kontraksiyonu yapar. Böbrek toplayıcı tübül esas (principal) hücrelerinde ise α₂B → Gαi → cAMP ↓ kaskadı, Vazopressin V₂ reseptörünün (Gαs → cAMP ↑ → PKA) Akuaporin-2 (AQP2) su kanallarını apikal zara yerleştirme sinyalini antagonize eder (hücresel ADH direnci).',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Locus Coeruleus → VLPO Uyku Devresi & Spinal Arka Boynuz → SSS, NREM Uyku & Analjezi',
            tissueTarget: 'Locus Coeruleus · Preoptik VLPO · Lamina II (Substantia Gelatinosa)',
            accent: 'indigo',
            points: [
              'LC → VLPO Devresi & Doğal NREM Evre 2–3 Benzeri Kooperatif Uyku: Locus Coeruleus (LC) noradrenerjik nöronlarının hiperpolarize olarak susması, hipotalamik Ventrolateral Preoptik Çekirdek (VLPO) üzerindeki tonik noradrenerjik inhibisyonu kaldırır (disinhibisyon). Aktive olan VLPO nöronları GABA ve Galanin salgılayarak histaminerjik Tuberomammiller Çekirdeği (TMN) ve uyanıklık ağlarını kapatır → kortikal GABA-A reseptörlerini yapay olarak boğmadan fizyolojik NREM Evre 2–3 uykusu (EEG’de yavaş δ dalgaları ve 12–16 Hz uyku iğcikleri [sleep spindles]) başlar; hasta sesli uyaranla anında uyanıp komuta uyar ve uyaran kesilince tekrar uykuya döner.',
              'Deliryumdan Koruma (SEDCOM/MENDS) & Serebral Hemodinami: Fizyolojik NREM uyku mimarisini koruduğu, antikolinerjik yük taşımadığı ve kortikal GABAerjik ağ disfonksiyonu/nöroinflamasyon (mikroglial TLR4/NF-κB) oluşturmadığı için YBÜ deliryum insidansını midazolam ve lorazepama kıyasla belirgin düşürür. Serebral damarlarda hafif α₂B vazokonstriksiyon ve metabolik azalmayla CBF’yi ~%20–30 düşürürken ICP’yi artırmaz ve kraniyotomide uyanık nörolojik muayeneye izin verir.',
              'Spinal/Supraspinal Opioid-Sparing Analjezi & Hipotalamik Anti-Shivering Etki: Spinal kord Substantia Gelatinosa’da presinaptik P maddesi/glutamat salınımını kesip postsinaptik WDR nöronlarını GIRK ile hiperpolarize ederek opioid tüketimini %30–50 azaltır; preoptik hipotalamusta ise vazokonstriksiyon ve titreme (shivering) eşik sıcaklığını düşürerek postoperatif titremeyi meperidin kadar etkin durdurur (nadiren santral α₂ termoregülasyon kaymasıyla enfeksiyon dışı "ilaç ateşi" yapabilir).',
            ],
          },
          {
            systemTitle: 'Vasküler Düz Kas (α₂B), RVLM Vazomotor Merkez & SA/AV Düğüm → Kardiyovasküler Fizyoloji',
            tissueTarget: 'Arteriyoler α₂B · RVLM Sempatik Çekirdek · SA/AV İleti Sistemi',
            accent: 'rose',
            points: [
              'Klasik Bifazik Hemodinamik Yanıt (Faz-1 Periferik α₂B Hipertansiyon → Faz-2 Santral α₂A Hipotansiyon): Hızlı IV yükleme bolusu (<10 dk) verildiğinde yüksek plazma pik konsantrasyonu önce damar düz kasındaki postsinaptik α₂B reseptörlerini uyararak 5–15 dk süren sistemik vazokonstriksiyon (SVR ↑, MAP ↑) ve barorefleks aracılı derin bradikardi oluşturur (Faz 1). İlaç kan-beyin bariyerini geçip LC ve RVLM’deki α₂A/I₁ reseptörlerini doyurduğunda ise santral sempatik çıkış ve plazma noradrenalin düzeyi %60–80 düşer → vasküler endotelyal eNOS/NO salınımı ve sempatolizle kalıcı vazodilatasyon (SVR ↓, MAP %15–30 ↓) baskınlaşır (Faz 2).',
              'SA/AV Düğüm İletisi, Vagomimetik Baskınlık & Asistoli Riski: Kardiyak sempatik hızlandırıcı liflerde presinaptik noradrenalin salınımının durması ve nucleus ambiguus’ta santral parasempatik (vagal) tonusun karşılıksız kalmasıyla SA düğüm Faz 4 eğimi yavaşlar ve AV düğüm refrakter periyodu uzar → doz-bağımlı sinüs bradikardisi (%25–40); pacemaker’sız 2./3. derece AV blokta, hasta sinüs sendromunda veya β-bloker/diltiazem/remifentanil birlikteliğinde kavşak kaçış ritmi ve sinüs arresti/asistoli gelişebilir.',
              'Miyokard Oksijen Dengesi (MVO₂) & Perioperatif Kardiyoproteksiyon: Direkt miyokardiyal negatif inotropik etkisi minimaldir (kalp debisi yalnızca bradikardi ve hipovolemik preload düşüşüyle azalır); cerrahi stres kaynaklı katekolamin fırtınasını ve taşikardiyi baskıladığı için diyastolik koroner perfüzyon süresini uzatır ve miyokard O₂ tüketimini (MVO₂) düşürür.',
            ],
          },
          {
            systemTitle: 'Pre-Bötzinger Solunum Merkezi, Karotid Cisimcik & Üst Havayolu → Solunum Fizyolojisi',
            tissueTarget: 'Medüller Solunum Merkezi · Faringeal Genioglossus · Bronş Düz Kası',
            accent: 'teal',
            points: [
              'Medüller Solunum Dürtüsü & Hiperkapnik/Hipoksik Yanıtın Korunumu: Propofol, midazolam ve opioidlerden farklı olarak medüller pre-Bötzinger solunum ritim merkezi üzerinde GABA-A veya µ-opioid aracılı depresyon yapmaz; dakika ventilasyonu, solunum frekansı ve PaCO₂–ventilasyon yanıt eğrisinin eğimi terapötik dozlarda (0,2–1,4 mcg/kg/saat) doğal NREM uykusu düzeyinde korunur (extübasyon sürecinde infüzyonu kapatmadan ventilatörden ayırma [weaning] ve NIV uyumunda altın standarttır).',
              'Üst Havayolu (Orofaringeal) Kas Tonusu & Uyanık Fiberoptik Entübasyon: Doğal NREM uykusunda olduğu gibi yüksek dozlarda (RASS ≤ −3) veya Obstrüktif Uyku Apneli (OSA) hastalarda genioglossus/faringeal dilatatör kaslarda hafif gevşeme ve horlama/parsiyel üst havayolu kollapsı oluşabilir ancak çene itme veya sesli uyarıyla anında açılır; antisialagog (sekresyon azaltıcı) etkisi ve solunumu koruması sayesinde uyanık fiberoptik entübasyonda idealdir.',
              'Bronşiyal Tonus & Pulmoner Vasküler Yatak: Histamin/asetilkolin kaynaklı refleks bronkokonstriksiyonu hafifletir ve Hipoksik Pulmoner Vazokonstriksiyon (HPV) refleksini bozmaz.',
            ],
          },
          {
            systemTitle: 'Hipotalamo-Hipofizer AVP, Renal Toplayıcı Tübül, Karaciğer & Endokrin → Sistemik Organlar',
            tissueTarget: 'Supraoptik Çekirdek (AVP) · Toplayıcı Tübül (AQP2) · Hepatosit CYP2A6/UGT',
            accent: 'amber',
            points: [
              'Hipotalamo-Hipofizer AVP Baskılanması & Renal Toplayıcı Tübül AQP2 Direnci (Poliüri / DI Sendromu): Hipotalamik supraoptik ve paraventriküler çekirdeklerde α₂A uyarımıyla arka hipofizden Arginin Vazopressin (AVP / ADH) sekresyonunu baskılar (santral DI bileşeni); eşzamanlı olarak böbrek kortikal toplayıcı tübüllerinde α₂B → Gαi → cAMP düşüşüyle V₂ reseptör-Akuaporin-2 (AQP2) su geri emilimini bloke eder (nefrojenik DI bileşeni) ve ANP salınımını artırır → masif serbest su diürezi (poliüri > 4 mL/kg/saat, idrar dansitesi < 1.005) ve hipernatremi gelişebilir.',
              'Hepatik UGT1A4/2B10 & CYP2A6 Biyotransformasyonu (Saf Hepatik Klirens): İlacın >%95’i karaciğerde doğrudan N-glukuronidasyon (UGT2B10, UGT1A4) ve CYP2A6 aracılı alifatik hidroksilasyon (3-hidroksi-deksmedetomidin) ile tamamen İNAKTİF metabolitlere dönüştürülerek idrarla (%95) atılır; böbrek yetmezliğinde (KBY/CRRT) aktif metabolit birikimi olmazken, Child-Pugh B/C sirozda serbest fraksiyon artar ve eliminasyon yarı ömrü 2,5 saatten 7,5 saate uzar.',
              'Endokrin (Adrenal Korteks / Pankreas β-Hücresi) & Gastrointestinal Motilite: Etomidatın imidazol halkasına benzese de klinik infüzyon dozlarında adrenal korteks 11β-hidroksilazı ve ACTH yanıtını anlamlı baskılamaz. Pankreas adacık β-hücrelerindeki α₂A reseptörlerini uyararak insülin sekresyonunu geçici azaltabilir (hafif hiperglisemi), tükürük bezlerinde α₂ uyarımıyla kserostomi (ağız kuruluğu) yapar ve enterik pleksusta asetilkolin salınımını azaltarak GİS motilitesini hafif yavaşlatır.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Reseptör Kinetiği, Bifazik α₂B → α₂A Konsantrasyon Dinamiği, Sedasyon Tavan Etkisi, Taşiflaksi & Sinerji',
          summary:
            'Deksmedetomidinin farmakodinamik kinetiğini; plazma konsantrasyonuna göre yer değiştiren periferik α₂B vazokonstriksiyon vs santral α₂A sempatoliz dengesi, GABA-A dışı mekanizmaya bağlı kesin sedasyon tavan etkisi ve >48 saatte gelişen GPCR down-regülasyonu belirler.',
          points: [
            'Bifazik α₂B → α₂A Konsantrasyon-Yanıt Kinetiği: Düşük-orta kararlı plazma konsantrasyonlarında (0,3–1,2 ng/mL; yavaş idame infüzyonu) yüksek afiniteli santral α₂A reseptörleri baskındır ve net etki sempatoliz + vazodilatasyondur (MAP ↓, HR ↓). Ancak hızlı yükleme bolusuyla veya çok yüksek infüzyon hızlarında (>1,5–2,0 ng/mL) periferik damar düz kasındaki düşük afiniteli α₂B reseptörleri devreye girerek santral vazodilatasyonu yener ve sistemik hipertansiyon + refleks bradikardi üretir (bu nedenle YBÜ’de yükleme bolusu atlanır!).',
            'Kesin Sedasyon Tavan Etkisi (Ceiling Effect — NMB Altında Tek Başına Kullanılmaz!): LC → VLPO endojen NREM uyku yolağı üzerinden çalıştığı ve kortikal piramidal nöronları doğrudan GABA-A (propofol) veya NMDA (ketamin) gibi susturmadığı için, doz 1,4 mcg/kg/saat tavanının üzerine çıkarılsa bile genel anestezi, derin koma (RASS −4/−5) veya güvenilir anterograd amnezi OLUŞTURAMAZ; bu nedenle nöromüsküler bloker (paralizi) altındaki hastada tek başına kullanılması ağır farkındalık (awareness) hatasıdır.',
            'MAC-Sparing & Opioid/Propofol Sinerjisi: Farklı reseptör yolağı (α₂A → Gi/o → GIRK) kullandığı için volatil anesteziklerin MAC değerini, propofolün EC₅₀ konsantrasyonunu ve opioidlerin analjezik doz gereksinimini supra-aditif olarak %30–50 oranında azaltır (ancak remifentanil veya β-blokerlerle vagotonik bradikardi sinerjisi gösterir).',
            'GPCR Desensitizasyonu (Taşiflaksi) & Rebound Çekilme Kinetiği: >48–72 saat süren kesintisiz infüzyonlarda LC ve RVLM’deki α₂A reseptörleri GRK (G-proteini kenetli reseptör kinaz) ile fosforillenir, β-arrestin bağlanarak Gαi/o kenetlenmesini koparır (uncoupling) ve reseptör endositozla hücre içine çekilir (down-regülasyon → klinik tolerans/taşiflaksi). Bu aşamada infüzyon aniden kesilirse, baskıdan kurtulan sempatik nöronlardan masif noradrenalin deşarjı (rebound hipertansiyon, taşikardi, ajitasyon) patlar → 24–48 saatte kademeli azaltılmalı veya enteral Klonidin (0,1–0,3 mg/gün) köprüsü kurulmalıdır.',
          ],
        }}
        clinicalPearls={[
          'SPICE III ≤ 65 Yaş Mortalite Paradoksu (EMA 2022 Uyarısı): 3.904 hastalı SPICE III çalışmasında >65 yaş ve postoperatif YBÜ hastalarında deksmedetomidin sağkalım ve deliryum avantajı sağlarken, ≤65 yaş non-operatif kritik hastalarda 90 günlük mortalitede artış sinyali saptanmıştır; genç septik/kritik hastada derin sedasyon gerekiyorsa propofol öncelikli düşünülmelidir.',
          'Açıklanamayan Poliüri + Hipernatremide "Deksmedetomidin Kaynaklı DI": YBÜ’de deksmedetomidin alan hastada idrar çıkışı aniden >300–400 mL/saate (>4 mL/kg/saat) fırlar, idrar dansitesi <1.005’e düşer ve serum Na⁺ >145–150 mEq/L’ye yükselirse santral AVP baskılanması + renal α₂B-AQP2 direnci gelişmiştir; infüzyon kesildiğinde poliüri 12–24 saat içinde tamamen normale döner.',
          'Kültür-Negatif YBÜ Ateşinde "Santral α₂ İlaç Ateşi": Prokalsitonin ve kültürleri negatif olmasına rağmen 39–40 °C ateşi devam eden hastada hipotalamik α₂ termoregülasyon kaymasına bağlı deksmedetomidin ateşi akla gelmelidir; ilaç kesildikten sonra 6–12 saat içinde defervesans (ateşin düşmesi) tanı koydurucudur.',
          'İnsanlarda Spesifik Antidot Yokluğu & Bradikardi/Hipotansiyon Yönetimi: Veterinerlikteki spesifik α₂-antagonist Atipamezol insanlarda onaylı değildir; aşırı bradikardi/AV blokta infüzyon kapatılır, Atropin 0,5–1 mg IV (veya glikopirolat / efedrin / geçici pacemaker) uygulanır, vazodilatatör hipotansiyonda ise önce kristaloid bolusu ve düşük doz Noradrenalin verilir.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Deksmedetomidin"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Amfoterisin B · Diazepam (Aynı IV Hat / Y-Site) & Pacemaker’sız 2.–3. Derece AV Blok',
            mechanism: 'Fizikokimyasal Presipitasyon / İleri İletim Sistemi Bloku',
            clinicalEffect: 'Y-site çökelme ve kateter tıkanması; ileri AV blokta fatal bradikardi/asistoli.',
            management: 'Amfoterisin B ve diazepam ile ayrı lümen kullanın; pacemaker’sız ileri AV blokta kesinlikle uygulamayın.',
          },
          {
            severity: 'D',
            agent: 'Beta-Blokerler (Metoprolol, Esmolol) · Non-DHP KKB (Diltiazem, Verapamil) · Digoksin · Amiodaron',
            mechanism: 'Aditif / Sinerjik SA–AV Nod Depresyonu & Sempatoliz',
            clinicalEffect: 'Ciddi sinüs bradikardisi (<40–50/dk), yüksek dereceli AV blok, sinüs arresti ve asistoli riski.',
            management: 'Yükleme bolusundan kaçının; düşük idame hızıyla (0.2 mcg/kg/saat) başlayın, sürekli EKG ve yatak başı atropin hazır bulundurun.',
          },
          {
            severity: 'D',
            agent: 'Opioidler (Remifentanil, Fentanil) · Propofol · Midazolam · İnhalasyon Anestezikleri',
            mechanism: 'Farmakodinamik Sinerji (Sedasyon, Vagotoni & Vazodilatasyon)',
            clinicalEffect: 'Derin sedasyon, hipotansiyon ve vagotonik bradikardi; MAC ve opioid gereksiniminde %30–50 düşüş.',
            management: 'Eşzamanlı anestezik ve opioid dozlarını %30–50 titre ederek azaltın; derin sedasyonda üst havayolu açıklığını izleyin.',
          },
          {
            severity: 'D',
            agent: 'Antihipertansifler (ACEi/ARB, Klonidin, Vazodilatörler) & Nöroaksiyel (Spinal/Epidural) Blok',
            mechanism: 'Aditif Santral + Periferik Sempatik Blokaj',
            clinicalEffect: 'Dirençli hipotansiyon ve ortostatik kollaps; klonidin ile birlikte kullanımda ağır bradikardi.',
            management: 'Öncelikle övolemiyi sağlayın; vazopresör (efedrin/fenilefrin/norepinefrin) hazır bulundurun.',
          },
          {
            severity: 'C',
            agent: 'Antidepresanlar / Antipsikotikler & CYP2A6 / UGT Modülatörleri',
            mechanism: 'Aditif SSS Sedasyonu / Hepatik Metabolizma Değişikliği',
            clinicalEffect: 'Artmış somnolans, ortostatik hipotansiyon veya hepatik klerens değişkenliği.',
            management: 'RASS hedefi (-1 / -2) eşliğinde kademeli titrasyon yapın.',
          },
        ]}
        references={[
          {
            authors: 'Riker RR, Shehabi Y, Bokesch PM, et al. (SEDCOM)',
            title: 'Dexmedetomidine vs midazolam for sedation of critically ill patients: a randomized trial.',
            journal: 'JAMA',
            year: 2009,
            pmid: '19190314',
            doi: '10.1001/jama.2009.56',
            note: 'YBÜ sedasyonunda midazolama kıyasla daha düşük deliryum insidansı ve daha kısa ekstübasyon süresi.',
          },
          {
            authors: 'Shehabi Y, Howe BD, Bellomo R, et al. (SPICE III)',
            title: 'Early Sedation with Dexmedetomidine in Critically Ill Patients.',
            journal: 'N Engl J Med',
            year: 2019,
            pmid: '31106539',
            doi: '10.1056/NEJMoa1904710',
            note: '3.904 kritik hastada erken deksmedetomidin sedasyonu çok merkezli RKÇ verileri.',
          },
          {
            authors: 'Devlin JW, Skrobik Y, Gélinas C, et al. (SCCM PADIS)',
            title: 'Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU.',
            journal: 'Crit Care Med',
            year: 2018,
            pmid: '30113379',
            doi: '10.1097/CCM.0000000000003299',
            note: 'Benzodiazepin dışı hafif sedasyon önceliği ve deliryum önleme kılavuzu.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/dexmedetomidine-index.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
      />
    </div>
  );
};
