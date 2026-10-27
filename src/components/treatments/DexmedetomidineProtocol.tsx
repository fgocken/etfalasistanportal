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
  Copy,
  Check,
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

interface Props {
  isDark: boolean;
}

export const DexmedetomidineProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [indication, setIndication] = useState<'icu_sedation' | 'weaning' | 'delirium' | 'procedural' | 'anesthesia'>(
    'icu_sedation'
  );
  const [targetRass, setTargetRass] = useState<string>('-1 ila -2 (Hafif kooperatif sedasyon)');
  
  // Çözelti Hazırlama Modu
  const [prepType, setPrepType] = useState<'vial_50' | 'vial_100' | 'ampoule_custom' | 'custom_conc'>('vial_50');
  const [customDiluentVolume, setCustomDiluentVolume] = useState<number>(50); // mL (örn 200 mcg ampul + SF)
  const [customConcInput, setCustomConcInput] = useState<number>(4); // mcg/mL
  
  // Yükleme Dozu (Bolus)
  const [enableBolus, setEnableBolus] = useState<boolean>(false);
  const [bolusDoseMcgKg, setBolusDoseMcgKg] = useState<number>(1.0); // 0.5 - 1.0 mcg/kg
  const [bolusDurationMin, setBolusDurationMin] = useState<number>(10); // 10 - 20 dk
  
  // İdame Dozu
  const [maintenanceDoseMcgKgHr, setMaintenanceDoseMcgKgHr] = useState<number>(0.7); // mcg/kg/saat
  
  // Akordiyon State: Farmakokinetik (Varsayılan KAPALI)
  const [pkOpen, setPkOpen] = useState<boolean>(false);
  
  // Kopyalama bildirimi
  const [copied, setCopied] = useState<boolean>(false);

  // Benzersiz erişilebilirlik kimlikleri (ARIA)
  const weightInputId = useId();
  const prepSelectId = useId();
  const indicationSelectId = useId();
  const rassSelectId = useId();
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

  // Endikasyona göre önerilen doz aralıkları ve açıklamaları
  const getIndicationInfo = () => {
    switch (indication) {
      case 'icu_sedation':
        return {
          title: 'Yoğun Bakım Ünitesi Mekanik Ventilasyon Sedasyonu',
          range: '0.2 – 1.4 mcg/kg/saat',
          guidance:
            'Başlangıç genellikle 0.2–0.7 mcg/kg/saat ile yapılır, RASS hedefine (-1 ila -2) göre titre edilir. Derin bradikardi ve hipotansiyonu önlemek için YBÜ’de yükleme bolusu ÖNERİLMEZ (Doğrudan idame başlanır).'
        };
      case 'weaning':
        return {
          title: 'Mekanik Ventilatörden Ayırma (Weaning) ve Ekstübasyon Süreci',
          range: '0.2 – 0.7 mcg/kg/saat',
          guidance:
            'Solunum merkezini baskılamaz, spontan solunum sürücüsünü korur. Ekstübasyon anında ve ekstübasyon sonrasında da güvenle sürdürülebilir; re-entübasyon riskini ve ajitasyonu azaltır.'
        };
      case 'delirium':
        return {
          title: 'Yoğun Bakım Deliryumu Yönetimi & Önlenmesi (PADIS Kılavuzu)',
          range: '0.15 – 0.7 mcg/kg/saat',
          guidance:
            'Hiperaktif veya karma deliryumda birinci tercih sedatiftir. Benzodiazepin kullanımını sınırlar ve mekanik ventilatör gün sayısını belirgin kısaltır.'
        };
      case 'procedural':
        return {
          title: 'Girişimsel / Prosedürel Sedasyon (Fiberoptik Bronkoskopi, Uyanık Girişimler)',
          range: 'İsteğe bağlı 0.5–1.0 mcg/kg bolus (10 dk) + 0.2–1.0 mcg/kg/saat idame',
          guidance:
            'Hasta komutlara kooperatiftir ve havayolu refleksleri korunur. Girişim öncesi 10 dakikada yavaş yükleme bolusu uygulanabilir.'
        };
      case 'anesthesia':
        return {
          title: 'Genel Anestezi İdamesi & Opioid Koruyucu Adjuvant',
          range: '0.2 – 0.8 mcg/kg/saat',
          guidance:
            'İntraoperatif inhalasyon anestezikleri ve opioid gereksinimini %30–50 azaltır. Cerrahi stres yanıtı ve postoperatif titremeyi (shivering) engeller.'
        };
    }
  };

  const currentIndication = getIndicationInfo();

  // Reçete metni kopyalama
  const handleCopyOrder = () => {
    const text = `DEKSMEDETOMİDİN (PRECEDEX) İNFÜZYON EMİR ÖZETİ:
• Hasta Ağırlığı: ${weightKg} kg
• Endikasyon: ${currentIndication.title}
• Hedef RASS: ${targetRass}
• Çözelti Hazırlama: ${
      prepType === 'vial_50'
        ? '200 mcg / 50 mL Hazır Flakon (4 mcg/mL)'
        : prepType === 'vial_100'
        ? '400 mcg / 100 mL Hazır Flakon (4 mcg/mL)'
        : prepType === 'ampoule_custom'
        ? `200 mcg / 2 mL Ampul + SF/D5W ile ${customDiluentVolume} mL tamamlandı (${concentrationMcgMl.toFixed(2)} mcg/mL)`
        : `Özel Konsantrasyon: ${concentrationMcgMl} mcg/mL`
    }
${
  enableBolus
    ? `• YÜKLEME (BOLUS) DOZU: ${bolusDoseMcgKg} mcg/kg -> Toplam ${totalBolusDoseMcg.toFixed(1)} mcg (${totalBolusVolumeMl.toFixed(1)} mL), ${bolusDurationMin} dakikada infüzyon pompası ile ${bolusPumpRateMlHr.toFixed(1)} mL/saat hızında verilecek.\n`
    : '• YÜKLEME DOZU: Uygulanmayacak (Doğrudan İdame İnfüzyon).\n'
}• İDAME İNFÜZYON DOZU: ${maintenanceDoseMcgKgHr.toFixed(2)} mcg/kg/saat
• İNFÜZYON POMPASI HIZI: ${infusionRateMlHr.toFixed(2)} mL/saat
• 24 Saatlik Tahmini Tüketim: ${dailyTotalMcg.toFixed(0)} mcg (${dailyTotalMl.toFixed(1)} mL / ~${dailyVialsNeeded.toFixed(1)} adet 200 mcg flakon)
• Güvenlik Kriteri: KTA < 50/dk veya MAP < 60 mmHg durumunda hız %50 azaltılmalı / hekime haber verilmelidir.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI                  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
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
            </div>
          </div>

          {/* Off-Label Kullanımlar */}
          <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-2">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm block">
              Off-Label / Kanıta Dayalı Klinik Kullanım Alanları
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
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
                  Pediatrik YBÜ Sürekli İnfüzyon:
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">0.2 – 1.4 mcg/kg/saat</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Yenidoğan ve infantlarda karaciğer enzim matürasyonu yetersizdir; 0.1–0.2 mcg/kg/saat ile başlanır.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  İntranazal Premedikasyon / Sedasyon:
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">1.0 – 2.0 mcg/kg (Tek Doz)</span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  İşlemden 30–45 dakika önce burun mukozasına atomizer ile verilir. Ağrısız, iğnesiz sedasyon sağlar.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Emergence Deliryumu (Anestezi Sonrası Uyanma Ajitasyonu):
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  0.3 – 0.5 mcg/kg IV Yavaş Bolus (5–10 dk)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF İNFÜZYON VE DOZ HESAPLAYICISI                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
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

          <button
            type="button"
            onClick={() => {
              setWeightKg(70);
              setIndication('icu_sedation');
              setPrepType('vial_50');
              setEnableBolus(false);
              setBolusDoseMcgKg(1.0);
              setBolusDurationMin(10);
              setMaintenanceDoseMcgKgHr(0.7);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer self-start sm:self-auto ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
                : 'bg-slate-100 text-slate-700 hover:text-slate-900 border-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Varsayılana Sıfırla</span>
          </button>
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

            {/* 2. Klinik Endikasyon Seçimi */}
            <div>
              <label htmlFor={indicationSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Klinik Endikasyon ve Protokol Rehberi
              </label>
              <select
                id={indicationSelectId}
                value={indication}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setIndication(val);
                  if (val === 'icu_sedation') setMaintenanceDoseMcgKgHr(0.7);
                  if (val === 'weaning') setMaintenanceDoseMcgKgHr(0.4);
                  if (val === 'delirium') setMaintenanceDoseMcgKgHr(0.35);
                  if (val === 'procedural') setMaintenanceDoseMcgKgHr(0.6);
                  if (val === 'anesthesia') setMaintenanceDoseMcgKgHr(0.5);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="icu_sedation">1. YBÜ Mekanik Ventilasyon Sedasyonu (0.2 – 1.4 mcg/kg/saat)</option>
                <option value="weaning">2. Mekanik Ventilatörden Ayırma / Weaning (0.2 – 0.7 mcg/kg/saat)</option>
                <option value="delirium">3. Yoğun Bakım Deliryumu Yönetimi (0.15 – 0.7 mcg/kg/saat)</option>
                <option value="procedural">4. Girişimsel / Prosedürel Sedasyon (0.2 – 1.0 mcg/kg/saat)</option>
                <option value="anesthesia">5. Genel Anestezi İdamesi &amp; Opioid Koruyucu (0.2 – 0.8 mcg/kg/saat)</option>
              </select>

              <div className="mt-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                <span className="font-bold text-teal-600 dark:text-teal-400 block mb-0.5">
                  Önerilen Doz Aralığı: {currentIndication.range}
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  {currentIndication.guidance}
                </p>
              </div>
            </div>

            {/* Hedef RASS Skoru */}
            <div>
              <label htmlFor={rassSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Hedeflenen Sedasyon Derinliği (RASS Skoru)
              </label>
              <select
                id={rassSelectId}
                value={targetRass}
                onChange={(e) => setTargetRass(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-teal-500 cursor-pointer ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="-1 ila -2 (Hafif kooperatif sedasyon)">
                  RASS -1 ila -2: Uykulu / Hafif sedasyon (Önerilen YBÜ hedefi, sesle göz teması kurar)
                </option>
                <option value="0 (Sakin ve uyanık)">RASS 0: Sakin ve tamamen uyanık (Weaning / Ekstübasyon)</option>
                <option value="-3 (Orta sedasyon)">RASS -3: Orta sedasyon (Sesle göz açar ancak göz teması kuramaz)</option>
              </select>
            </div>

            {/* 3. Yükleme Dozu (Bolus) Anahtarı */}
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
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                        Aktif
                      </span>
                    )}
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    YBÜ’de hipotansiyon ve bradikardiyi önlemek için rutin bolus önerilmez. Prosedürel sedasyonda açılabilir.
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

            {/* 4. İdame Dozu Ayarı (Slider & Butonlar) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={maintDoseRangeId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  İdame İnfüzyon Dozu:
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-extrabold text-teal-600 dark:text-teal-400">
                    {maintenanceDoseMcgKgHr.toFixed(2)}
                  </span>
                  <span className="text-xs text-slate-500">mcg/kg/saat</span>
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
                          ? 'bg-teal-600 text-white border-teal-600'
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
                    className="px-2 py-1 rounded border text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
                    title="0.05 azalt"
                  >
                    -0.05
                  </button>
                  <button
                    type="button"
                    onClick={() => setMaintenanceDoseMcgKgHr((prev) => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
                    className="px-2 py-1 rounded border text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
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
                className={`p-4 rounded-xl border text-xs ${
                  isDark
                    ? 'bg-amber-950/25 border-amber-800/60 text-amber-200'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm text-amber-700 dark:text-amber-300 mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Yükleme Bolus Pompa Ayarı ({bolusDurationMin} dk)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Toplam Bolus Hacmi:</span>
                    <span className="font-mono font-bold text-base">
                      {totalBolusVolumeMl.toFixed(1)} mL ({totalBolusDoseMcg.toFixed(0)} mcg)
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Bolus Pompa Debisi:</span>
                    <span className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                      {bolusPumpRateMlHr.toFixed(1)} mL/saat
                    </span>
                  </div>
                </div>
                <p className="text-[10px] opacity-80 mt-2">
                  * İnfüzyon pompasını {bolusDurationMin} dakikaya ayarlayın, ardından otomatik olarak {infusionRateMlHr.toFixed(2)} mL/saat idameye geçin.
                </p>
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

            {/* Reçete & Emir Kopyalama Butonu */}
            <button
              type="button"
              onClick={handleCopyOrder}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>İnfüzyon Emri Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>İnfüzyon Reçetesini / Emrini Kopyala</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. BÖBREK YETMEZLİĞİNDE DOZ REVİZYONU                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
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
      {/* 9. ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS)                         */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
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
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL DURUMLAR                 */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Stethoscope className="w-5 h-5 text-teal-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar
          </h2>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Hipovolemi:</strong> Damar içi hacmi tükenmiş
              hastalarda santral vazomotor tonus baskılandığında derin refrakter hipotansiyon ortaya çıkabilir. İlaç
              başlanmadan önce volüm resüsitasyonu tamamlanmalıdır.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Eşzamanlı Bradikardizan İlaçlar:</strong> Beta
              blokerler (metoprolol, esmolol), non-dihidropiridin kalsiyum kanal blokerleri (diltiazem, verapamil),
              digoksin veya amiodaron alan hastalarda deksmedetomidin ile sinergistik bradikardi ve asistoli riski
              katlanır.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Otonomik Nöropati ve Yaşlı Hastalar:</strong> Sempatik
              rezervi sınırlı olan diyabetik otonom nöropatili veya geriatrik hastalarda bradikardik ve hipotansif yanıtlar
              çok daha belirgindir.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Solunum Avantajı ve Havayolu:</strong> Opioidler veya
              GABA-erjik sedatiflerden farklı olarak solunum güdüsünü korur. Ancak derin sedasyonda (RASS -3 veya daha
              derin) veya anatomik havayolu obstrüksiyonu olanlarda (uyku apnesi) orofaringeal gevşeme ve parsiyel obstrüksiyon
              olabileceği akılda tutulmalıdır.
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. IV UYGULAMA VE SULANDIRMA / HAZIRLAMA ŞEKİLLERİ                */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <Pill className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            IV Uygulama ve Sulandırma / Hazırlama Şekilleri
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              Piyasa Formları ve Standart Çözelti
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400">
              <li>
                <strong>200 mcg / 50 mL Hazır Flakon:</strong> Kullanıma hazır infüzyon çözeltisi (Konsantrasyon:{' '}
                <strong>4 mcg/mL</strong>).
              </li>
              <li>
                <strong>400 mcg / 100 mL Hazır Flakon:</strong> Kullanıma hazır infüzyon çözeltisi (Konsantrasyon:{' '}
                <strong>4 mcg/mL</strong>).
              </li>
              <li>
                <strong>200 mcg / 2 mL Konsantre Ampul:</strong> 48 mL %0.9 NaCl (SF) veya %5 Dekstroz ile sulandırılarak
                toplam 50 mL'ye tamamlanır (Konsantrasyon: <strong>4 mcg/mL</strong>).
              </li>
              <li>
                <strong>Sıvı Kısıtlı Hastalar:</strong> Santral venöz kateterden 200 mcg / 25 mL tamamlanarak{' '}
                <strong>8 mcg/mL</strong> konsantrasyonda da infüze edilebilir.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-2">
            <span className="font-bold text-rose-700 dark:text-rose-300 block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Hayati Uygulama Kuralları</span>
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
              <li>
                <strong>KESİNLİKLE konsantre (sulandırılmamış) ampul IV puşe yapılmaz!</strong> Ani fatal bradikardi,
                AV tam blok ve kardiyak arreste neden olur.
              </li>
              <li>
                Daima kalibre edilmiş <strong>elektronik infüzyon pompası</strong> veya şırınga pompası ile kontrollü
                verilmelidir.
              </li>
              <li>
                Hazırlanan seyreltilmiş solüsyon oda sıcaklığında (20–25°C) <strong>24 saat stabildir</strong>.
              </li>
              <li>
                Geçimlilik: %0.9 NaCl, %5 Dekstroz, Ringer Laktat ve Mannitol çözeltileriyle tam geçimlidir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. İLAÇ GÜVENLİĞİ VE YÜKSEK RİSKLİ İLAÇ (HIGH-ALERT) DURUMLARI     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <ShieldCheck className="w-5 h-5 text-indigo-500" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            İlaç Güvenliği ve Yüksek Riskli İlaç (ISMP High-Alert) Uyarıları
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">ISMP High-Alert İlaç</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Hatalı doz hesabı veya infüzyon pompası programlama hataları derin kardiyovasküler kollapsa neden olabilir.
              Hemşire çift kontrolü (independent double-check) önerilir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Ses / Yazılış Benzerliği</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Precedex</strong> ile <strong>Prevacid</strong> (Lansoprazol) ve <strong>Peridex</strong>{' '}
              (Klorheksidin gargarası) karışıklıklarına karşı eczane ve servis dolaplarında Tall-Man yazı biçimi
              (dexmedetomiDINE) kullanılmalıdır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Gebelik ve Laktasyon</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Gebelik Kategorisi C:</strong> Plasentayı geçer. Sadece anne için faydası fetüse riskinden üstünse
              kullanılmalıdır. Anne sütüne çok düşük miktarda geçer; uygulamadan sonra 24 saat emzirmeye ara verilmesi
              önerilir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. İLAÇ ETKİLEŞİMİ SORGULAMA DIŞ BAĞLANTILARI                      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-teal-500" />
              <span>İlaç Etkileşimi Sorgulama (Dış Kaynaklar)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hastanın kullandığı diğer ilaçlarla (sedatifler, antiaritmikler, vazodilatatörler) etkileşimi anında sorgulayın:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://www.drugs.com/drug-interactions/dexmedetomidine-index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 hover:border-teal-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-teal-500 hover:bg-white hover:shadow-xs'
            }`}
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 flex items-center gap-1.5">
                <span>Drugs.com Drug Interactions Checker</span>
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Deksmedetomidin için majör, orta ve minör etkileşim veri tabanı
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-500 shrink-0 ml-2" />
          </a>

          <a
            href="https://reference.medscape.com/drug-interactionchecker"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 hover:border-teal-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-teal-500 hover:bg-white hover:shadow-xs'
            }`}
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 flex items-center gap-1.5">
                <span>Medscape Drug Interaction Checker</span>
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Klinik farmakoloji ve çoklu ilaç kombinasyon kontrolü
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-500 shrink-0 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
};
