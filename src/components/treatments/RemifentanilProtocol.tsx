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
  Flame,
  Zap
} from 'lucide-react';

interface Props {
  isDark: boolean;
}

export const RemifentanilProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(70);
  const [indication, setIndication] = useState<'anesthesia_maint' | 'spontaneous_mac' | 'icu_analgosedation' | 'cardiac' | 'neurosurgery'>(
    'anesthesia_maint'
  );
  
  // Çözelti Hazırlama Modu
  const [prepType, setPrepType] = useState<'vial_1mg_50' | 'vial_2mg_50' | 'vial_5mg_100' | 'custom_prep'>('vial_1mg_50');
  const [customVialMg, setCustomVialMg] = useState<number>(2); // mg
  const [customDiluentVolume, setCustomDiluentVolume] = useState<number>(50); // mL
  const [customConcInput, setCustomConcInput] = useState<number>(20); // mcg/mL
  
  // Yükleme Dozu (Bolus)
  const [enableBolus, setEnableBolus] = useState<boolean>(false);
  const [bolusDoseMcgKg, setBolusDoseMcgKg] = useState<number>(0.5); // 0.5 - 1.0 mcg/kg
  const [bolusDurationSec, setBolusDurationSec] = useState<number>(60); // 30 - 60 sn
  
  // İdame Dozu Birimi ve Değeri
  // Anestezi standardı: mcg/kg/dakika
  const [doseUnit, setDoseUnit] = useState<'mcg_kg_min' | 'mcg_kg_hr'>('mcg_kg_min');
  const [maintenanceDoseMcgKgMin, setMaintenanceDoseMcgKgMin] = useState<number>(0.15); // mcg/kg/dakika
  
  // Akordiyon State: Farmakokinetik (Varsayılan KAPALI)
  const [pkOpen, setPkOpen] = useState<boolean>(false);
  
  // Kopyalama bildirimi
  const [copied, setCopied] = useState<boolean>(false);

  // Benzersiz erişilebilirlik kimlikleri (ARIA)
  const weightInputId = useId();
  const prepSelectId = useId();
  const indicationSelectId = useId();
  const bolusToggleId = useId();
  const bolusDoseInputId = useId();
  const bolusDurationInputId = useId();
  const customVialMgId = useId();
  const customVolInputId = useId();
  const maintDoseRangeId = useId();

  // --- KONSANTRASYON HESABI (mcg/mL) ---
  const concentrationMcgMl: number = (() => {
    switch (prepType) {
      case 'vial_1mg_50':
        // 1 mg (1000 mcg) / 50 mL = 20 mcg/mL
        return 20.0;
      case 'vial_2mg_50':
        // 2 mg (2000 mcg) / 50 mL = 40 mcg/mL
        return 40.0;
      case 'vial_5mg_100':
        // 5 mg (5000 mcg) / 100 mL = 50 mcg/mL
        return 50.0;
      case 'custom_prep':
        if (customDiluentVolume > 0 && customVialMg > 0) {
          return (customVialMg * 1000) / customDiluentVolume;
        }
        return customConcInput > 0 ? customConcInput : 20.0;
      default:
        return 20.0;
    }
  })();

  // Doz birimi dönüşümleri
  // mcg/kg/dakika temel alınır
  const activeDoseMcgKgMin = doseUnit === 'mcg_kg_min' ? maintenanceDoseMcgKgMin : maintenanceDoseMcgKgMin / 60;
  const activeDoseMcgKgHr = doseUnit === 'mcg_kg_hr' ? maintenanceDoseMcgKgMin : maintenanceDoseMcgKgMin * 60;

  // --- İDAME HESAPLAMALARI ---
  // Dakikalık doz (mcg/dk) = Doz (mcg/kg/dk) * Ağırlık (kg)
  const minuteDoseMcg = activeDoseMcgKgMin * weightKg;
  // Saatlik doz (mcg/saat) = Dakikalık doz * 60
  const hourlyDoseMcg = minuteDoseMcg * 60;
  // İnfüzyon debisi (mL/saat) = Saatlik doz (mcg/saat) / Konsantrasyon (mcg/mL)
  const infusionRateMlHr = concentrationMcgMl > 0 ? hourlyDoseMcg / concentrationMcgMl : 0;
  // 4 saatlik cerrahi ve 24 saatlik YBÜ tüketimi
  const surgery4HrTotalMg = (hourlyDoseMcg * 4) / 1000;
  const dailyTotalMg = (hourlyDoseMcg * 24) / 1000;
  const dailyTotalMl = infusionRateMlHr * 24;
  const vialsNeeded1mg = (hourlyDoseMcg * 24) / 1000;

  // --- YÜKLEME (BOLUS) HESAPLAMALARI ---
  const totalBolusDoseMcg = enableBolus ? bolusDoseMcgKg * weightKg : 0;
  const totalBolusVolumeMl = concentrationMcgMl > 0 && enableBolus ? totalBolusDoseMcg / concentrationMcgMl : 0;
  // Bolus süresi (saniye cinsinden) saatlik debiye çevrilir: mL / (sec / 3600)
  const bolusPumpRateMlHr =
    enableBolus && bolusDurationSec > 0 ? (totalBolusVolumeMl / bolusDurationSec) * 3600 : 0;

  // Endikasyona göre önerilen doz aralıkları ve açıklamaları
  const getIndicationInfo = () => {
    switch (indication) {
      case 'anesthesia_maint':
        return {
          title: 'Genel Anestezi İdamesi (Entübe / Mekanik Ventilasyon)',
          range: '0.05 – 0.5 mcg/kg/dakika (Tipik: 0.1 – 0.25 mcg/kg/dk)',
          guidance:
            'TIVA (Propofol ile) veya dengeli inhalasyon anestezisinde analjezik omurgayı oluşturur. Cerrahi uyarılara göre 2-5 dakikada bir titre edilir. Ameliyat bitiminden 30-45 dk önce postoperatif geçiş analjezisi (morfin, tramadol, parasetamol) uygulanmalıdır!'
        };
      case 'spontaneous_mac':
        return {
          title: 'İzlenen Anestezi Bakımı (MAC) & Spontan Solunumlu Sedasyon',
          range: '0.025 – 0.1 mcg/kg/dakika',
          guidance:
            'Hastanın spontan solunumu devam ederken sedoanaljezi sağlar. Çok dar bir solunum güvenlik aralığı vardır; solunum sayısı < 8/dk veya apne gelişirse infüzyon derhal durdurulmalıdır.'
        };
      case 'icu_analgosedation':
        return {
          title: 'Yoğun Bakım Ünitesi Mekanik Ventilasyon Analgosedasyonu',
          range: '0.05 – 0.15 mcg/kg/dakika (3 – 9 mcg/kg/saat)',
          guidance:
            'Ağrı odaklı sedasyon (analgosedasyon) için idealdir. Organ yetmezliğinden bağımsız temizlenir; infüzyon kesildiğinde 3-5 dakikada nörolojik değerlendirme ve weaning değerlendirmesi yapılabilir.'
        };
      case 'cardiac':
        return {
          title: 'Açık Kalp Cerrahisi & Sternotomi Yüksek Stres Protokolü',
          range: '0.2 – 1.0 mcg/kg/dakika (Yüksek Doz Opioid Tekniği)',
          guidance:
            'Sternotomi, aortik kros-klemp ve kardiyopulmoner baypas esnasında hemodinamik ve nöroendokrin stres yanıtını mükemmel şekilde bloke eder.'
        };
      case 'neurosurgery':
        return {
          title: 'Nöroşirürji & Uyanık Kraniyotomi Hızlı Değerlendirme',
          range: '0.05 – 0.25 mcg/kg/dakika',
          guidance:
            'İntraoperatif motor/lisan haritalama veya acil postoperatif intrakraniyal kanama/ödem muayenesi gereken hastalarda anında uyanma sağlar.'
        };
    }
  };

  const currentIndication = getIndicationInfo();

  // Reçete metni kopyalama
  const handleCopyOrder = () => {
    const text = `REMİFENTANİL (ULTIVA) İNFÜZYON EMİR ÖZETİ:
• Hasta Vücut Ağırlığı: ${weightKg} kg
• Klinik Endikasyon: ${currentIndication.title}
• Çözelti Hazırlama: ${
      prepType === 'vial_1mg_50'
        ? '1 mg Flakon + SF ile 50 mL tamamlandı (20 mcg/mL)'
        : prepType === 'vial_2mg_50'
        ? '2 mg Flakon + SF ile 50 mL tamamlandı (40 mcg/mL)'
        : prepType === 'vial_5mg_100'
        ? '5 mg Flakon + SF ile 100 mL tamamlandı (50 mcg/mL)'
        : `${customVialMg} mg Flakon + ${customDiluentVolume} mL (${concentrationMcgMl.toFixed(1)} mcg/mL)`
    }
${
  enableBolus
    ? `• YÜKLEME (BOLUS) DOZU: ${bolusDoseMcgKg} mcg/kg -> Toplam ${totalBolusDoseMcg.toFixed(1)} mcg (${totalBolusVolumeMl.toFixed(1)} mL), en az ${bolusDurationSec} saniyede yavaş infüzyonla (${bolusPumpRateMlHr.toFixed(1)} mL/saat).\n`
    : '• YÜKLEME DOZU: Uygulanmayacak (Doğrudan İdame İnfüzyon).\n'
}• İDAME İNFÜZYON DOZU: ${activeDoseMcgKgMin.toFixed(3)} mcg/kg/dakika (${activeDoseMcgKgHr.toFixed(1)} mcg/kg/saat)
• İNFÜZYON POMPASI HIZI: ${infusionRateMlHr.toFixed(2)} mL/saat (${minuteDoseMcg.toFixed(1)} mcg/dakika)
• 4 Saatlik Cerrahi Tüketimi: ~${surgery4HrTotalMg.toFixed(2)} mg
• 24 Saatlik YBÜ Tüketimi: ~${dailyTotalMg.toFixed(2)} mg (${dailyTotalMl.toFixed(1)} mL / ~${Math.ceil(vialsNeeded1mg)} flakon 1 mg)
• KRİTİK UYARI: İnfüzyon kesilmeden 30-45 dk önce uzun etkili postoperatif analjezik (morfin, tramadol, parasetamol) başlanmalıdır! Aksi halde 5-10 dk içinde hiperaljezi ve şiddetli ağrı gelişir.`;

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
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span>Ultra-Kısa Etkili Sentetik μ-Opioid Analjezik</span>
              <span aria-hidden="true">·</span>
              <span>Ultiva / Remifentanil</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">ATC: N01AH06</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Remifentanil Hidroklorür (Ultiva)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong> Ester bağı
              içeren, ultra-kısa etkili, saf ve selektif sentetik <strong>μ-opioid</strong> reseptör agonistidir (fentanil
              türevi 4-anilinopiperidin derivesi). Morfine göre yaklaşık 100-200 kat, fentanile benzer güçtedir.
            </p>
          </div>
        </div>

        {/* Etki Mekanizması Açıklaması */}
        <div
          className={`mt-4 p-4 rounded-xl border leading-relaxed text-xs sm:text-sm ${
            isDark
              ? 'bg-rose-950/20 border-rose-900/50 text-rose-200'
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <Zap className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="font-bold text-sm block">Etki Mekanizması &amp; Eşsiz Esteraz Hidrolizi:</span>
              <p>
                Santral sinir sistemi ve arka boynuzdaki <strong>μ₁ ve μ₂ opioid reseptörlerine</strong> yüksek
                afiniteyle bağlanır. İnhibitör G-proteini (Gi/Go) aracılığıyla adenilat siklazı inhibe eder, voltaj bağımlı
                kalsiyum kanallarını kapatır ve potasyum kanallarını açarak presinaptik nöronda hiperpolarizasyon yaratır;
                P maddesi ve glutamat gibi nosiseptif nörotransmitterlerin salınımını güçlü biçimde bloke eder.
              </p>
              <p className="text-xs opacity-90">
                • <strong>Organ Bağımsız Eliminasyon:</strong> Remifentanil molekülündeki metil ester bağı, kanda ve dokularda
                bulunan <em>non-spesifik esterazlar</em> tarafından hızla hidrolize edilir. Plazma psödokolinesterazından veya
                karaciğer/böbrek fonksiyonlarından tamamen bağımsızdır.
              </p>
              <p className="text-xs opacity-90">
                • <strong>Sabit Bağlam Duyarlı Yarı Ömür (Context-Sensitive Half-Time: 3–4 dk):</strong> İnfüzyon ister
                30 dakika, ister 48 saat sürsün; vücutta birikmez (akümülasyon yapmaz). İnfüzyon kapatıldığında plazma
                düzeyi 3–4 dakikada yarıya iner, hasta 5–10 dakikada tamamen uyanır ve spontan solunumu geri döner.
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
                Başlangıç süresi, pik etki, dağılım hacmi, protein bağlama, esteraz metabolizması ve bağlam duyarlı yarı ömür
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
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1 – 1.5 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">Hızlı kan-beyin bariyeri dengelenmesi (t½ke0 ~1 dk).</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pik Etki (Peak)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">1.5 – 3 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">Bolus veya infüzyon hızı artışından hemen sonra pik analjezi.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Etki Süresi &amp; Kesilme
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">5 – 10 Dakika</span>
                <p className="text-[11px] text-slate-500 mt-1">İnfüzyon kesildikten 5-10 dk sonra analjezik etki tamamen sonlanır.</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">~300 – 400 mL/kg (Küçük)</span>
                <p className="text-[11px] text-slate-500 mt-1">Santral kompartman hacmi oldukça düşüktür (~100 mL/kg).</p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Plazma Protein Bağlanması
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">%70 (Orta Düzey)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Esas olarak α₁-asit glikoproteine bağlanır.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Bağlam Duyarlı Yarı Ömür
                </span>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400 font-mono">3 – 4 Dakika (SABİT)</span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Süre uzadıkça uzamaz! Fentanil veya sufentanilden en temel farkıdır.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Biyotransformasyon ve Atılım Yolağı:
              </span>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>Non-Spesifik Doku ve Kan Esterazları:</strong> Kırmızı kan hücreleri (eritrositler) ve interstisyel
                dokulardaki non-spesifik esterazlar remifentanilin propanoik asit metil esterini hızla parçalar. Karaciğerdeki
                sitokrom P450 enzimleri veya plazma psödokolinesterazı (bütirilkolinesteraz) bu metabolizmada rol oynamaz.
                Dolayısıyla kolinesteraz eksikliği olan veya karaciğer yetmezliği olan hastalarda etki süresi UZAMAZ.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                • <strong>İnaktif Metabolit (Remifentanil Asit - GI90291):</strong> Parçalanma ürünü olan karboksilik asit
                türevi metabolit, ana moleküle göre <strong>4600 kat daha zayıf</strong> bir reseptör afinitesine sahiptir.
                Metabolitin %95'i idrarla böbreklerden atılır. Şiddetli böbrek yetmezliğinde bu metabolit birikse dahi klinik
                olarak anlamlı bir opioid etkisi yaratmaz.
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
                <strong>Epidural veya İntratekal Uygulama KESİNLİKLE KONTRENDİKEDİR:</strong> Flakon formülasyonu yardımcı
                madde olarak <em>glisin</em> içerir. Glisin nöraksiyel yolla verildiğinde nörotoksiktir ve kalıcı paraplejiye
                yol açabilir. SADECE İNTRAVENÖZ (IV) VERİLEBİLİR!
              </li>
              <li>
                <strong>Aşırı Duyarlılık:</strong> Remifentanil, fentanil analogları veya formülasyondaki maddelere karşı bilinen aşırı duyarlılık.
              </li>
              <li>
                <strong>Tek Başına İndüksiyon Ajanı Olarak Kullanım:</strong> Hipnotik değildir, bilinç kaybı sağlamaz; tek başına indüksiyon amacıyla kullanılmaz.
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
                <strong>Hızlı Postoperatif Ağrı Riski:</strong> İnfüzyon kapatılmadan önce uzun etkili analjezi planlanmamışsa
                hasta 5-10 dakikada şiddetli ağrı krizi (rebound ağrı) yaşar.
              </li>
              <li>
                <strong>Spontan Solunumlu Havayolu Güvencesiz Hastalar:</strong> Çok güçlü medüller solunum depresanıdır; entübe
                olmayan hastada mutlaka sürekli kapnografi ve anestezi uzmanı gözetimi gerekir.
              </li>
              <li>
                <strong>Ciddi Bradikardi &amp; İletim Bozuklukları:</strong> Vagal tonusu artırarak sinüs bradikardisi ve asistoliye yol açabilir.
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
                <strong>1. Genel Anestezi İndüksiyonu ve İdamesi:</strong> TIVA (Total İntravenöz Anestezi) veya dengeli
                inhalasyon anestezisinde analjezik omurga olarak (erişkin ve 1 yaş üzeri çocuklarda).
              </p>
              <p>
                <strong>2. Kardiyak Cerrahi Anestezisi:</strong> Koroner bypass ve kapak cerrahisinde endotrakeal entübasyon,
                sternotomi ve kardiyopulmoner bypass stres yanıtını baskılamak için.
              </p>
              <p>
                <strong>3. Yoğun Bakım Analgosedasyonu:</strong> 18 yaş ve üzeri mekanik ventilasyondaki kritik hastalarda
                analjezi ve sedasyon idamesi.
              </p>
              <p>
                <strong>4. İzlenen Anestezi Bakımı (MAC):</strong> Girişimsel işlemler esnasında analjezi idamesi.
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
                <strong>Uyanık Kraniyotomi &amp; Nöromonitörizasyon:</strong> Hızlı açılıp kapanabilen analjezi sayesinde
                kortikal haritalama sırasında hastanın tam kooperatif olmasını sağlar.
              </li>
              <li>
                <strong>Zor Havayolu ve Uyanık Fiberoptik Entübasyon:</strong> Glottik refleksleri ve öksürüğü mükemmel baskılar,
                işlem biter bitmez solunum hızla geri döner.
              </li>
              <li>
                <strong>Doğum Analjezisi (Remifentanil PCA):</strong> Epidural anestezi kontrendike olan (trombositopeni, omurga deformitesi)
                gebe kadınlarda hasta kontrollü IV analjezi (fetusta hızla metabolize olur).
              </li>
              <li>
                <strong>Elektrokonvülsif Terapi (EKT):</strong> Nöbet süresini kısaltmadan hemodinamik fırtınayı baskılamak için.
              </li>
              <li>
                <strong>Postoperatif Titreme (Shivering):</strong> Düşük doz bolusla titremeyi dakikalar içinde sonlandırır.
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

        {/* Uygulama Yolları Uyarısı */}
        <div className="p-3.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-500/10 text-rose-900 dark:text-rose-200 text-xs sm:text-sm mb-5 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <strong>Uygulama Yolu Kuralı:</strong> SADECE İNTRAVENÖZ (IV) infüzyon veya kontrollü yavaş bolus olarak
            uygulanır. Formülasyonundaki nörotoksik glisin nedeniyle <strong>epidural veya intratekal verilmesi KESİNLİKLE YASAKTIR</strong>.
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
                  Genel Anestezi İndüksiyon (Entübe):
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  0.5 – 1.0 mcg/kg IV Yavaş Bolus (≥ 30-60 saniye)
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Rijidite ve bradikardiyi önlemek için en az 30-60 saniyede verilmeli veya indüksiyonda bolus yerine 0.5 mcg/kg/dk infüzyon başlanmalıdır.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Genel Anestezi İdamesi (Ventile):
                </span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  0.05 – 0.5 mcg/kg/dakika (Tipik: 0.1 – 0.25 mcg/kg/dk)
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Propofol veya inhalasyon ajanıyla kombine edilir. Cerrahi stimülasyona göre 2-5 dakikada titre edilir.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Spontan Soluyan Hastada Sedoanaljezi (MAC):
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  0.025 – 0.1 mcg/kg/dakika
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Bolus verilmez! Çok düşük hızla başlanıp solunum sayısı izlenerek titre edilir.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Yoğun Bakım Ünitesi Analgosedasyon:
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  0.05 – 0.15 mcg/kg/dakika (3 – 9 mcg/kg/saat)
                </span>
              </div>
            </div>
          </div>

          {/* Pediatrik Dozları */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>Pediatrik Doz Rejimleri</span>
            </span>
            <div className="space-y-2 text-slate-700 dark:text-slate-300">
              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Pediatrik Anestezi İdamesi (1 Yaş ve Üzeri):
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  0.05 – 0.3 mcg/kg/dakika
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Çocuklarda klirens daha hızlıdır. Doz titrasyonu %25 adımlarla yapılır.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="font-semibold block text-slate-900 dark:text-slate-100">
                  Yenidoğan ve İnfantlar (&lt; 1 Yaş):
                </span>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  0.1 – 0.3 mcg/kg/dakika
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Yenidoğanda klirens yüksektir ancak bradikardiye çok duyarlıdırlar; atropin hazır bulundurulmalıdır.
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800">
                <span className="font-bold text-amber-900 dark:text-amber-200 block text-xs">
                  Pediatride Bolus Doz Uyarısı:
                </span>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                  Pediatrik hastalarda hızlı IV bolus KESİNLİKLE ÖNERİLMEZ. Ağır göğüs kafesi rijiditesi (ventilasyon kaybı)
                  ve derin bradikardiye yol açar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF İNFÜZYON VE DOZ HESAPLAYICISI (HEMEN ARDINDAN!)        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        className={`p-5 sm:p-7 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900 border-rose-500/30 ring-1 ring-rose-500/20'
            : 'bg-white border-rose-300 shadow-md ring-1 ring-rose-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                  Remifentanil İnfüzyon Pompası &amp; Doz Hesaplayıcısı
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  mcg/kg/dakika ve mcg/kg/saat modunda anlık mL/saat debi, opsiyonel bolus ve ameliyat süresi tüketim hesabı
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setWeightKg(70);
              setIndication('anesthesia_maint');
              setPrepType('vial_1mg_50');
              setDoseUnit('mcg_kg_min');
              setEnableBolus(false);
              setBolusDoseMcgKg(0.5);
              setBolusDurationSec(60);
              setMaintenanceDoseMcgKgMin(0.15);
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
            {/* 1. Hasta Ağırlığı & Doz Birimi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={weightInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Hasta Ağırlığı (kg) <span className="text-[10px] text-slate-400 font-normal">(Obezde IBW)</span>
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
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 ${
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
                  Çözelti Hazırlama Modu
                </label>
                <select
                  id={prepSelectId}
                  value={prepType}
                  onChange={(e) => setPrepType(e.target.value as any)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer ${
                    isDark
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="vial_1mg_50">Standart: 1 mg Flakon / 50 mL SF (20 mcg/mL)</option>
                  <option value="vial_2mg_50">Konsantre: 2 mg Flakon / 50 mL SF (40 mcg/mL)</option>
                  <option value="vial_5mg_100">Büyük Flakon: 5 mg Flakon / 100 mL SF (50 mcg/mL)</option>
                  <option value="custom_prep">Kullanıcı Tanımlı Flakon ve Hacim</option>
                </select>
              </div>
            </div>

            {/* Özel Seyreltme Detayı */}
            {prepType === 'custom_prep' && (
              <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5 grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor={customVialMgId} className="text-xs font-bold text-rose-900 dark:text-rose-200 block mb-1">
                    Flakon İlaç Miktarı (mg):
                  </label>
                  <input
                    id={customVialMgId}
                    type="number"
                    min={0.5}
                    max={20}
                    step={0.5}
                    value={customVialMg}
                    onChange={(e) => setCustomVialMg(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label htmlFor={customVolInputId} className="text-xs font-bold text-rose-900 dark:text-rose-200 block mb-1">
                    Seyreltilen Hacim (mL):
                  </label>
                  <input
                    id={customVolInputId}
                    type="number"
                    min={10}
                    max={500}
                    value={customDiluentVolume}
                    onChange={(e) => setCustomDiluentVolume(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                  />
                </div>
              </div>
            )}

            {/* 2. Klinik Endikasyon Seçimi */}
            <div>
              <label htmlFor={indicationSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Klinik Endikasyon ve Titrasyon Rehberi
              </label>
              <select
                id={indicationSelectId}
                value={indication}
                onChange={(e) => {
                  const val = e.target.value as any;
                  setIndication(val);
                  if (val === 'anesthesia_maint') setMaintenanceDoseMcgKgMin(0.15);
                  if (val === 'spontaneous_mac') setMaintenanceDoseMcgKgMin(0.05);
                  if (val === 'icu_analgosedation') setMaintenanceDoseMcgKgMin(0.08);
                  if (val === 'cardiac') setMaintenanceDoseMcgKgMin(0.3);
                  if (val === 'neurosurgery') setMaintenanceDoseMcgKgMin(0.12);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus:outline-hidden focus:ring-2 focus:ring-rose-500 cursor-pointer ${
                  isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="anesthesia_maint">1. Genel Anestezi İdamesi (Entübe: 0.05 – 0.5 mcg/kg/dk)</option>
                <option value="spontaneous_mac">2. Spontan Solunumlu MAC / Sedoanaljezi (0.025 – 0.1 mcg/kg/dk)</option>
                <option value="icu_analgosedation">3. Yoğun Bakım Analgosedasyonu (0.05 – 0.15 mcg/kg/dk / 3-9 mcg/kg/sa)</option>
                <option value="cardiac">4. Açık Kalp Cerrahisi Yüksek Doz Protokolü (0.2 – 1.0 mcg/kg/dk)</option>
                <option value="neurosurgery">5. Nöroşirürji Hızlı Uyanma &amp; Haritalama Protokolü (0.05 – 0.25 mcg/kg/dk)</option>
              </select>

              <div className="mt-2 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs">
                <span className="font-bold text-rose-600 dark:text-rose-400 block mb-0.5">
                  Önerilen Doz: {currentIndication.range}
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  {currentIndication.guidance}
                </p>
              </div>
            </div>

            {/* 3. Yükleme Dozu (Bolus) Anahtarı */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                enableBolus
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-800'
                    : 'bg-rose-50 border-rose-300'
                  : isDark
                  ? 'bg-slate-800/40 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <label htmlFor={bolusToggleId} className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5 cursor-pointer">
                    <span>Yükleme Bolusu Uygula (İndüksiyon / Cerrahi Pik)</span>
                    {enableBolus && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                        Aktif
                      </span>
                    )}
                  </label>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Göğüs rijiditesi ve bradikardiyi önlemek için bolus mutlaka en az 30–60 saniyede yavaş verilmelidir.
                  </p>
                </div>

                <input
                  id={bolusToggleId}
                  type="checkbox"
                  checked={enableBolus}
                  onChange={(e) => setEnableBolus(e.target.checked)}
                  className="w-5 h-5 rounded text-rose-600 focus:ring-rose-500 border-slate-300 cursor-pointer"
                />
              </div>

              {enableBolus && (
                <div className="mt-3 pt-3 border-t border-rose-200 dark:border-rose-900/50 grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={bolusDoseInputId} className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Bolus Dozu (mcg/kg):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={bolusDoseInputId}
                        type="number"
                        min={0.2}
                        max={2.0}
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
                      İnfüzyon Süresi (Saniye):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        id={bolusDurationInputId}
                        type="number"
                        min={30}
                        max={180}
                        step={10}
                        value={bolusDurationSec}
                        onChange={(e) => setBolusDurationSec(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 rounded-lg border text-xs font-bold text-center bg-white dark:bg-slate-800"
                      />
                      <span className="text-xs text-slate-400">saniye</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. İdame Dozu Ayarı (Slider & Butonlar) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor={maintDoseRangeId} className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    İdame İnfüzyon Dozu:
                  </label>
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 border text-[10px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setDoseUnit('mcg_kg_min')}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        doseUnit === 'mcg_kg_min'
                          ? 'bg-white dark:bg-slate-700 text-rose-600 font-bold shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      mcg/kg/dk
                    </button>
                    <button
                      type="button"
                      onClick={() => setDoseUnit('mcg_kg_hr')}
                      className={`px-1.5 py-0.5 rounded cursor-pointer ${
                        doseUnit === 'mcg_kg_hr'
                          ? 'bg-white dark:bg-slate-700 text-rose-600 font-bold shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      mcg/kg/sa
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-extrabold text-rose-600 dark:text-rose-400">
                    {maintenanceDoseMcgKgMin.toFixed(3)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {doseUnit === 'mcg_kg_min' ? 'mcg/kg/dk' : 'mcg/kg/sa'}
                  </span>
                </div>
              </div>

              <input
                id={maintDoseRangeId}
                type="range"
                min={doseUnit === 'mcg_kg_min' ? 0.025 : 1.5}
                max={doseUnit === 'mcg_kg_min' ? 1.0 : 60}
                step={doseUnit === 'mcg_kg_min' ? 0.025 : 1}
                value={maintenanceDoseMcgKgMin}
                onChange={(e) => setMaintenanceDoseMcgKgMin(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />

              <div className="flex items-center justify-between gap-1.5 pt-1">
                <div className="flex items-center gap-1 flex-wrap">
                  {(doseUnit === 'mcg_kg_min' ? [0.05, 0.1, 0.15, 0.25, 0.5] : [3, 6, 9, 15, 30]).map((dose) => (
                    <button
                      key={dose}
                      type="button"
                      onClick={() => setMaintenanceDoseMcgKgMin(dose)}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-medium border transition-colors cursor-pointer ${
                        maintenanceDoseMcgKgMin === dose
                          ? 'bg-rose-600 text-white border-rose-600'
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
                    onClick={() =>
                      setMaintenanceDoseMcgKgMin((prev) =>
                        Math.max(0.01, Number((prev - (doseUnit === 'mcg_kg_min' ? 0.025 : 1)).toFixed(3)))
                      )
                    }
                    className="px-2 py-1 rounded border text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMaintenanceDoseMcgKgMin((prev) =>
                        Math.min(1.5, Number((prev + (doseUnit === 'mcg_kg_min' ? 0.025 : 1)).toFixed(3)))
                      )
                    }
                    className="px-2 py-1 rounded border text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 cursor-pointer"
                  >
                    +
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
                  ? 'bg-rose-950/30 border-rose-500/40 text-rose-100'
                  : 'bg-rose-50/90 border-rose-300 text-rose-950 shadow-xs'
              }`}
            >
              <span className="text-xs uppercase tracking-wider font-bold text-rose-700 dark:text-rose-300 block mb-1">
                İnfüzyon Pompası Hızı (İdame)
              </span>

              <div className="flex items-baseline justify-center gap-2 my-2">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-rose-600 dark:text-rose-400">
                  {infusionRateMlHr.toFixed(2)}
                </span>
                <span className="text-lg font-bold text-slate-600 dark:text-slate-300">mL/saat</span>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-white/60 dark:bg-slate-900/60 border border-rose-500/20 text-slate-700 dark:text-slate-300">
                <span>{weightKg} kg</span>
                <span>·</span>
                <span>{activeDoseMcgKgMin.toFixed(3)} mcg/kg/dk</span>
                <span>·</span>
                <span>{concentrationMcgMl.toFixed(1)} mcg/mL</span>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-500/20 grid grid-cols-2 gap-2 text-left text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Dakikalık Doz:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {minuteDoseMcg.toFixed(1)} mcg/dk
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] block">Saatlik Toplam:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {hourlyDoseMcg.toFixed(1)} mcg/saat
                  </span>
                </div>
              </div>
            </div>

            {/* Yükleme Dozu Çıktısı (Açıksa) */}
            {enableBolus && (
              <div
                className={`p-4 rounded-xl border text-xs ${
                  isDark
                    ? 'bg-rose-950/30 border-rose-800 text-rose-200'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-sm text-rose-700 dark:text-rose-300 mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Yükleme Bolus Ayarı ({bolusDurationSec} sn)</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Toplam Bolus:</span>
                    <span className="font-mono font-bold text-base">
                      {totalBolusVolumeMl.toFixed(2)} mL ({totalBolusDoseMcg.toFixed(0)} mcg)
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Bolus Pompa Debisi:</span>
                    <span className="font-mono font-bold text-base text-rose-600 dark:text-rose-400">
                      {bolusPumpRateMlHr.toFixed(1)} mL/saat
                    </span>
                  </div>
                </div>
                <p className="text-[10px] opacity-80 mt-2">
                  * Pompayı {bolusDurationSec} saniyeye ayarlayın veya mikropipet/enjektör ile yavaşça verin.
                </p>
              </div>
            )}

            {/* Akut Ağrı Fırtınası Uyarısı (Altın Standart Klinik Kural) */}
            <div className="p-3.5 rounded-xl border border-amber-300 dark:border-amber-900/60 bg-amber-500/10 text-xs space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Geçiş Analjezisi Güvenlik Kuralı:</span>
              </span>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                Remifentanil infüzyonu kapatıldığında analjezik etki <strong>5–10 dakika içinde tamamen sıfırlanır</strong>.
                Ameliyat bitmeden veya ekstübasyondan <strong>30–45 dakika önce</strong> uzun etkili analjezik (morfin,
                tramadol, parasetamol) uygulanmalıdır.
              </p>
            </div>

            {/* Tüketim & Flakon Hesabı */}
            <div
              className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">4 Sa Cerrahi Tüketimi</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    ~{surgery4HrTotalMg.toFixed(2)} mg
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">24 Sa YBÜ Tüketimi</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    ~{dailyTotalMg.toFixed(2)} mg (~{Math.ceil(vialsNeeded1mg)} flk)
                  </span>
                </div>
              </div>
            </div>

            {/* Reçete & Emir Kopyalama Butonu */}
            <button
              type="button"
              onClick={handleCopyOrder}
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-98"
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
                  Standart doz titrasyonu uygulanır.
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
                  Remifentanil klirensi ve uyanma süresi değişmez.
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
                  İnaktif remifentanil asit metaboliti birikebilir; ancak analjezik/sedatif gücü ana ilaca göre 4600 kat daha düşüktür.
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
                  Aktif ilacın parçalanması doku esterazları ile sağlandığından etki süresi uzamaz.
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
                  Diyaliz sonrası ek doza gerek yoktur. Diyaliz hastalarında güvenle kullanılabilir.
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
                  Doz ayarlaması gerekmez.
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
                  CRRT filtresiyle temizlenmesine ihtiyaç duyulmaz; esteraz hidrolizi yeterlidir.
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
          Remifentanil karaciğer metabolizmasına bağımlı <strong>DEĞİLDİR</strong>. Karaciğer sirozu, fulminan hepatit
          veya anhepatik fazda (karaciğer transplantasyonu esnasında) dahi klirensi ve eliminasyon yarı ömrü değişmez.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs sm:text-sm">
          {/* Class A */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Child-Pugh Class A (Hafif)
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
              Doz Revizyonu Gerekmez
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Standart protokol uygulanır. Doku esterazları ilacı normal hızda temizler.
            </p>
          </div>

          {/* Class B */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 space-y-1.5">
            <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Child-Pugh Class B (Orta)
            </span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
              Doz Revizyonu Gerekmez
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Eritrosit ve doku esteraz klirensi etkilenmez; bağlam-duyarlı yarı ömür sabittir.
            </p>
          </div>

          {/* Class C */}
          <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 space-y-1.5">
            <span className="font-bold text-sm text-amber-950 dark:text-amber-200">
              Child-Pugh Class C (Şiddetli)
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-300 block">
              Doz Revizyonu Gerekmez (Yakın Takip)
            </span>
            <p className="text-slate-700 dark:text-slate-300 text-xs">
              Klirens değişmez; ancak şiddetli karaciğer yetmezliğinde santral sinir sistemi opioid duyarlılığı artmış
              olabileceğinden titrasyon adımları dikkatle izlenmelidir.
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
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Toraks Rijiditesi (Wooden Chest)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Hızlı IV bolus (&lt; 30 sn) veya yüksek doz infüzyonda göğüs duvarı kaslarında şiddetli rijidite gelişir;
              maskeyle havalandırma imkansızlaşır. (Tedavi: Nöromüsküler bloker veya nalokson).
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-1">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Bradikardi &amp; Hipotansiyon</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Santral vagal stimülasyon ile belirgin sinüs bradikardisi ve vazodilatatör hipotansiyon gelişir. Atropin veya
              glikopirolat ile hızla yanıt alınır.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-500/5 space-y-1">
            <span className="font-bold text-amber-700 dark:text-amber-300 block">Opioid İlişkili Hiperaljezi (OIH)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Yüksek doz remifentanil (&gt; 0.25 mcg/kg/dk) sonrası NMDA reseptör aktivasyonu ile postoperatif ağrı eşiği
              düşer, akut aşırı ağrı hassasiyeti oluşabilir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Akut Ağrı Fırtınası</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              İnfüzyon kapatıldığında analjezi 5-10 dakikada biter. Önceden analjezik verilmemişse hasta uyanırken şiddetli
              cerrahi ağrı krizine girer.
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
              <strong className="text-slate-900 dark:text-slate-100">Postoperatif Analjezi Geçiş Planlaması:</strong> Cerrahi
              sona ermeden 30-45 dakika önce uzun etkili bir analjezik (morfin, tramadol, parasetamol, NSAİİ veya rejyonel blok)
              uygulanmalıdır. Remifentanil kapatıldığında geride hiç analjezik etkisi kalmaz!
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Geriatrik / Yaşlı Hastalar:</strong> 65 yaş üzeri
              hastalarda farmakodinamik duyarlılık 2 kat artar, santral kompartman hacmi küçülür. Başlangıç dozu ve infüzyon
              hızları <strong>%50 oranında azaltılmalıdır</strong>.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Obez Hastalarda Dozlama:</strong> Remifentanil lipofilik
              olmasına karşın aşırı yağ dokusuna belirgin dağılmaz. Doz mutlaka <strong>İdeal Vücut Ağırlığı (IBW)</strong> veya
              yağsız vücut kütlesi (Lean Body Mass) üzerinden hesaplanmalıdır; total ağırlıkla dozlama ölümcül aşırı doza yol açar.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <span className="font-bold text-teal-600 dark:text-teal-400 shrink-0">•</span>
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Hızlı Bolustan Kesinlikle Kaçınma:</strong> İndüksiyon bolusları
              asla 30 saniyeden kısa sürede enjekte edilmemelidir. Anestezi uzmanı hazırda atropin ve kas gevşetici bulundurmalıdır.
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
              Piyasa Formları ve Seyreltme Protokolü
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-400">
              <li>
                <strong>Piyasa Formları:</strong> 1 mg, 2 mg ve 5 mg beyaz liyofilize toz içeren flakonlar.
              </li>
              <li>
                <strong>Standart Çözelti (20 mcg/mL):</strong> 1 mg flakon önce 1 mL SF ile eritilir, ardından 49 mL
                %0.9 NaCl (veya %5 Dekstroz) ile 50 mL'ye tamamlanır.
              </li>
              <li>
                <strong>Konsantre Çözelti (40 mcg/mL):</strong> 2 mg flakon eritilip 50 mL'ye tamamlanır.
              </li>
              <li>
                <strong>Yoğun Bakım / Santral Yol (50 mcg/mL):</strong> 5 mg flakon eritilip 100 mL'ye tamamlanır.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-2">
            <span className="font-bold text-rose-700 dark:text-rose-300 block flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Hayati Sulandırma &amp; Uygulama Kuralları</span>
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-slate-300">
              <li>
                <strong>Sulandırılmadan KESİNLİKLE enjekte edilmez!</strong> Daima infüzyon pompası ile kontrollü uygulanmalıdır.
              </li>
              <li>
                <strong>Kan Ürünleri ile Karıştırılmaz:</strong> Kan/plazma ile aynı damar yolundan verilmemelidir (kan esterazları ilacı infüzyon hattında parçalar).
              </li>
              <li>
                <strong>İnfüzyon Hattının Yıkanması (Flushing) Riski:</strong> İnfüzyon kapatıldıktan sonra damar yolu hızlıca
                yıkanırsa hatta kalan remifentanil bolus halinde giderek ani apne ve bradikardiye neden olabilir. Hat kapatılmalı
                veya dikkatle aspire edilmelidir.
              </li>
              <li>
                Geçimlilik: %0.9 NaCl, %5 Dekstroz, Ringer Laktat ile 24 saat oda sıcaklığında stabildir.
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
          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-500/5 space-y-1">
            <span className="font-bold text-rose-700 dark:text-rose-300 block">Kırmızı Reçete &amp; Narkotik</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Uluslararası kontrole tabi narkotik analjeziktir. Yanlış programlama dakikalar içinde fatal solunum arrestine
              yol açar. Bağımsız çift kontrol zorunludur.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Nörotoksisite (Glisin)</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              Glisin taşıyıcısı içerdiğinden intratekal/epidural verildiğinde geri dönüşsüz spinal hasara yol açar.
              Nöraksiyel enjektörlerle asla temas etmemelidir.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-500/5 space-y-1">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">Gebelik ve Doğum Analjezisi</span>
            <p className="text-slate-600 dark:text-slate-400 text-xs">
              <strong>Gebelik Kategorisi C:</strong> Plasentayı hızla geçer; ancak yenidoğan esterazları tarafından da hızla
              hidrolize edilir. Doğumda epidural alamayan gebelerde PCA ile güvenle kullanılır.
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
              <ExternalLink className="w-5 h-5 text-rose-500" />
              <span>İlaç Etkileşimi Sorgulama (Dış Kaynaklar)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hastanın kullandığı sedatifler, hipnotikler, inhalasyon anestezikleri ve beta blokerlerle etkileşim sorgulaması:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://www.drugs.com/drug-interactions/remifentanil-index.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 hover:border-rose-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-rose-500 hover:bg-white hover:shadow-xs'
            }`}
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 flex items-center gap-1.5">
                <span>Drugs.com Remifentanil Etkileşim Veritabanı</span>
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Remifentanil için majör, orta ve minör farmakodinamik etkileşim sorgusu
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-rose-500 shrink-0 ml-2" />
          </a>

          <a
            href="https://reference.medscape.com/drug-interactionchecker"
            target="_blank"
            rel="noopener noreferrer"
            className={`p-4 rounded-xl border flex items-center justify-between transition-all group ${
              isDark
                ? 'bg-slate-800/60 border-slate-700 hover:border-rose-500 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200 hover:border-rose-500 hover:bg-white hover:shadow-xs'
            }`}
          >
            <div>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 flex items-center gap-1.5">
                <span>Medscape Drug Interaction Checker</span>
              </span>
              <p className="text-xs text-slate-500 mt-1">
                Klinik anestezi ve yoğun bakım ilaç kombinasyon kontrolü
              </p>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-rose-500 shrink-0 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
};
