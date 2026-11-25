import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Wind, 
  BookOpen, 
  ExternalLink, 
  Scale, 
  Info, 
  Pill, 
  HeartPulse, 
  HeartCrack,
  Activity, 
  HelpCircle
} from 'lucide-react';

interface RSIvsElectiveInfographicProps {
  isDark: boolean;
}

interface ComparisonRow {
  parameter: string;
  rsi: {
    title: string;
    description: string;
    badge: string;
    statusType: 'danger' | 'warning' | 'info' | 'success';
  };
  elective: {
    title: string;
    description: string;
    badge: string;
    statusType: 'neutral' | 'info';
  };
  clinicalRationale: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    parameter: '1. Temel Klinik Amaç',
    rsi: {
      title: 'Aspirasyonu Önlemek (Mendelson Sendromu)',
      description: 'Bilinç kaybı ile trakeal tüp kafının şişirilmesi arasındaki "korunmasız havayolu süresini" en aza indirmek.',
      badge: 'Aspirasyon Profilaksisi',
      statusType: 'danger'
    },
    elective: {
      title: 'Kontrollü & Konforlu Havayolu Güvenliği',
      description: 'Fizyolojik stabiliteyi koruyarak, titre edilmiş ilaçlarla hemodinamik dalgalanmayı asgariye indirerek entübe etmek.',
      badge: 'Hemodinamik Denge',
      statusType: 'neutral'
    },
    clinicalRationale: 'RSI acil/dolu mide hastasında aspirasyon kaynaklı mortaliteyi önlemeye odaklanırken, elektif indüksiyon hasta konforu ve hemodinamiye odaklanır.'
  },
  {
    parameter: '2. Mide Durumu & Açlık Süresi',
    rsi: {
      title: 'Dolu Mide / Yüksek Aspirasyon Riski',
      description: 'Yetersiz açlık, acil cerrahi, travma, ileus/GİS obstrüksiyonu, ileri gebelik (>20 hf — özellikle aktif travay veya opioid varlığında), GLP-1 kullanımı veya diyabetik gastroparezi.',
      badge: 'Dolu Mide (Full Stomach)',
      statusType: 'danger'
    },
    elective: {
      title: 'Doğrulanmış Boş Mide',
      description: 'Açlık kılavuzlarına tam uyumlu: Berrak sıvılar ≥ 2 saat, hafif yemek ≥ 6 saat, ağır/yağlı yemek ≥ 8 saat açlık.',
      badge: 'Boş Mide (2-6-8 Kuralı)',
      statusType: 'neutral'
    },
    clinicalRationale: 'Travma, şok, şiddetli ağrı veya opioidler mide boşalmasını durdurur. Gebelik nüansı: Travaysız elektif gebelikte mide boşalması normaldir (gecikme esas olarak aktif travay veya opioid kullanımıyla oluşur); ancak >20. haftada LÖS tonusu azaldığı ve karın içi basınç arttığı için regürjitasyon riski artmıştır.'
  },
  {
    parameter: '3. İlaç Verilme Sırası & Zamanlaması',
    rsi: {
      title: 'Hemen Ardı Ardına (Gecikmesiz Ardışık Veriliş)',
      description: 'Hipnotik ajan bolus verilir verilmez (bilinç kaybıyla eş zamanlı) hiç beklemeden derhal yüksek doz NMB puşe edilir.',
      badge: 'Hipnotik ➔ Anında NMB',
      statusType: 'danger'
    },
    elective: {
      title: 'Kademeli İndüksiyon & Erken NMB Yaklaşımı',
      description: 'Analjezik + titre edilmiş hipnotik sonrası nöromüsküler blokör (NMB) uygulanır. Eski dogmanın aksine, DAS 2015/2025 kılavuzları NMB öncesi zorunlu maske ventilasyon testini şart koşmaz.',
      badge: 'Hipnotik ➔ Erken NMB (DAS)',
      statusType: 'info'
    },
    clinicalRationale: 'DAS 2015/2025 kanıtlarına göre erken nöromüsküler blokaj yüz maskesi ventilasyonunu (FMV) kolaylaştırır; laringospazmı ve göğüs duvarı rijiditesini ortadan kaldırır. Rutin "önce FMV teyidi sonra NMB" dogması güncel kılavuzlarda terk edilmiştir.'
  },
  {
    parameter: '4. Balon-Maske Ventilasyonu (BMV)',
    rsi: {
      title: 'Seçilmiş / Hipoksemik Hastada Nazik BMV (< 15–20 cmH₂O)',
      description: 'PreVent RKÇ (Casey, NEJM 2019; PMID 30779528) ve SCCM 2023 RSI kılavuzu: İndüksiyon–laringoskopi arasında tepe basıncı < 15–20 cmH₂O tutularak yapılan nazik BMV, ciddi hipoksemiyi yarıya indirir (%10.9 vs %22.8) ve aspirasyonu artırmaz. Aktif kusma/hematemez veya şiddetli ileusta kaçınılır.',
      badge: 'PreVent 2019 · Nazik BMV <15–20',
      statusType: 'warning'
    },
    elective: {
      title: 'Rutin ve Kontrollü Olarak Uygulanır',
      description: 'Hipnotik ve kas gevşetici sonrası tam gevşeme sağlanana kadar sakin, düşük basınçlı balon-maske ventilasyonu yapılır.',
      badge: 'Rutin Kontrollü BMV',
      statusType: 'neutral'
    },
    clinicalRationale: '15–20 cmH₂O altındaki tepe basınçları alt özofagus sfinkterini açmaz. Mutlak BMV yasağı kritik/hipoksemik hastalarda tehlikeli desatürasyona yol açtığından PreVent (2019) ve SCCM 2023 ile güncellenmiştir.'
  },
  {
    parameter: '5. Pozisyon, Preoksijenasyon & Apneik Oksijenasyon',
    rsi: {
      title: '20–30° Baş Yukarı / Ramped + FeO₂ > %85–90 + NODESAT',
      description: '20–30° baş yukarı / ramped pozisyonda (kulak-sternum hizası) %100 O₂ ile 3–5 dk (veya 8 vital kapasite nefesi) FeO₂ (EtO₂) > %85–90 hedefine ulaşılır; entübasyona dek nazal kanülle 15 L/dk apneik O₂ (NODESAT) veya HFNO sürdürülür.',
      badge: '20–30° Ramped · FeO₂ > %85–90',
      statusType: 'success'
    },
    elective: {
      title: 'Standart Pozisyon & Preoksijenasyon',
      description: 'Sniffing (obezde ramped) pozisyonda %100 O₂ ile 3 dk tidal solunum veya FeO₂ (EtO₂) > %85–90 hedefine kadar preoksijenasyon.',
      badge: 'Standart (FeO₂ > %85–90)',
      statusType: 'neutral'
    },
    clinicalRationale: '20–30° baş yukarı / ramped pozisyon fonksiyonel rezidüel kapasiteyi (FRC) artırır, pasif regürjitasyonu azaltır ve laringoskopik hizalamayı iyileştirir. FeO₂ > %85–90 güvenli apne süresini maksimize eder.'
  },
  {
    parameter: '6. Nöromusküler Blokör (NMB) Dozu & Obezite Kuralı',
    rsi: {
      title: 'Yüksek Doz Hızlı Etkili Ajan (Obezitede IBW/LBW vs TBW)',
      description: 'Rokuronyum 1.2 mg/kg (obezitede İdeal/Yağsız Ağırlık — IBW/LBW ile!) veya Süksinilkolin 1.0–1.5 mg/kg IV (Gerçek Kilo — TBW ile!).',
      badge: 'Rok 1.2 (IBW) / Sük 1.5 (TBW)',
      statusType: 'danger'
    },
    elective: {
      title: 'Standart Doz Kas Gevşetici',
      description: 'Rokuronyum 0.6 mg/kg (obezitede IBW/LBW), Sisatraküryum 0.15 mg/kg veya Veküronyum 0.1 mg/kg IV.',
      badge: 'Rokuronyum 0.6 mg/kg (IBW)',
      statusType: 'neutral'
    },
    clinicalRationale: 'Rokuronyum hidrofiliktir; morbid obezitede TBW ile dozlanırsa ciddi doz aşımı ve uzamış blok gelişir (IBW/LBW kullanılmalıdır). Süksinilkolin ve Sugammadeks ise TBW üzerinden dozlanır.'
  },
  {
    parameter: '7. Hipnotik İndüksiyon Ajanı & Hemodinami',
    rsi: {
      title: 'Hızlı Tek Bolus (Hemodinamiye Göre Seçim)',
      description: 'Stabil hastada Propofol 1.5–2.5 mg/kg; Şok/Anstabil hastada Ketamin 1–2 mg/kg veya Etomidat 0.2–0.3 mg/kg tek hamlede hızla puşe edilir.',
      badge: 'Tek Bolus Puşe',
      statusType: 'warning'
    },
    elective: {
      title: 'Titre Edilmiş Yavaş İndüksiyon',
      description: 'Hastanın hemodinami ve yaşına göre titre edilerek verilir; fentanil/remifentanil ile analjezik destek sağlanır.',
      badge: 'Titre Edilerek',
      statusType: 'neutral'
    },
    clinicalRationale: 'RSI’da bekleme payı olmadığı için hızlı bolus verilir. Anstabil hastada propofolün derin vazodilatasyonundan kaçınmak için Ketamin/Etomidat tercih edilir.'
  },
  {
    parameter: '8. Krikoid Bası (Sellick Manevrası)',
    rsi: {
      title: 'Rutin Zorunlu Değil · Uygulanırsa 10 N (Uyanık) → 30 N (Bilinç Kaybı Sonrası)',
      description: 'IRIS RKÇ (Birenbaum, JAMA Surg 2019; PMID 30347106; n=3.472) ve DAS 2025: Rutin krikoid basının aspirasyonu azalttığı gösterilememiştir; buna karşın entübasyonu uzatır ve görüntüyü bozar. Uygulanacaksa uyanıkken 10 N (~1 kg), bilinç kaybından SONRA 30 N (~3 kg) verilir (uyanık 30 N kusma tetikler!); görüşü/ventilasyonu bozduğu an DERHAL bırakılır.',
      badge: 'IRIS 2019 · 10 N → 30 N (Opsiyonel)',
      statusType: 'warning'
    },
    elective: {
      title: 'Uygulanmaz (Gerekirse BURP / OELM)',
      description: 'Krikoid bası uygulanmaz. Yalnızca larinks görüntüsünü optimize etmek için dış laringeal manipülasyon (BURP / OELM) yapılabilir.',
      badge: 'Yalnızca BURP / OELM',
      statusType: 'neutral'
    },
    clinicalRationale: 'IRIS çalışmasında krikoid bası grubunda aspirasyon oranı sham gruba göre azalmamış (%0.6 vs %0.5), zor Cormack-Lehane görünümü ve uzamış entübasyon anlamlı artmıştır.'
  },
  {
    parameter: '9. Laringoskopi & Kaf Şişirme Zamanı',
    rsi: {
      title: 'İlk Nefesten Önce Kaf Derhal Şişirilir',
      description: 'Tüp vokal kordlardan geçer geçmez kaf şişirilir; ilk pozitif basınçlı soluk ancak kaf şiştikten SONRA verilir ve dalga formu EtCO₂ doğrulanır.',
      badge: 'Önce Kaf, Sonra Ventilasyon',
      statusType: 'danger'
    },
    elective: {
      title: 'Standart Kaf Şişirme ve Doğrulama',
      description: 'Tüp yerleştirilir, kaf şişirilir, sürekli dalga formu kapnografi ("No trace = wrong place") ve oskültasyon ile teyit edilir.',
      badge: 'Standart Doğrulama',
      statusType: 'neutral'
    },
    clinicalRationale: 'Kaf şişirilmeden önce verilen pozitif basınçlı soluk, farenkste olası regürjite materyali trakea derinliklerine itebilir.'
  },
  {
    parameter: '10. İlaç Etki Bekleme Süresi',
    rsi: {
      title: '45 – 60 Saniye (Kronometre Takibi)',
      description: 'Kas gevşetici verildikten sonra 50-60. saniyede gecikmeksizin doğrudan laringoskopiye (tercihen Videolaringoskopi) girilir.',
      badge: '45 – 60 saniye',
      statusType: 'danger'
    },
    elective: {
      title: '90 – 180 Saniye (Tam Gevşeme)',
      description: 'Kas gevşeticinin tam pik yapması beklenir (genellikle 2-3 dakika), hasta bu sürede nazikçe ventile edilir.',
      badge: '90 – 180 saniye',
      statusType: 'neutral'
    },
    clinicalRationale: 'RSI’da yüksek doz NMB ile en erken sürede tam entübasyon koşulları sağlanarak desatürasyon penceresi en aza indirilir.'
  },
  {
    parameter: '11. Başarısız Entübasyon & Kurtarma Planı (DAS 2025)',
    rsi: {
      title: 'Evrensel VL + Önceden Hesaplı Sugammadeks 16 mg/kg (CICO Uyarısı!)',
      description: 'RSI öncesi Videolaringoskop hazır olmalıdır. Rokuronyum 1.2 mg/kg kullanıldığında Sugammadeks 16 mg/kg (TBW) önceden hesaplanmış ve anında ulaşılabilir bulundurulur. KRİTİK DAS 2015/2025 UYARISI: Sugammadeks CICO krizini veya mekanik havayolu obstrüksiyonunu ÇÖZMEZ ve Plan D (eFONA) girişimini ASLA geciktirmemelidir!',
      badge: 'VL + Sugammadeks (eFONA’yı Geciktirme!)',
      statusType: 'danger'
    },
    elective: {
      title: 'DAS 2025 Standart Plan A–D Algoritması',
      description: 'Plan A (maks 3+1 girişim, evrensel VL) → Plan B (2. jen SAD, maks 3) → Plan C (2 kişilik yüz maskesi + uyandırma) → Plan D (CICO: Neşter-Buji-Tüp eFONA).',
      badge: 'DAS 2025 Plan A–D',
      statusType: 'neutral'
    },
    clinicalRationale: 'Yüksek doz hipnotik ve mekanik üst havayolu ödemi/obstrüksiyonu varlığında yalnızca kas gevşeticinin geri çevrilmesi spontan ventilasyonu garanti etmez; oksijenasyon çökerken tek kesin kurtarma Plan D (eFONA)’dır.'
  }
];

export const RSIvsElectiveInfographic: React.FC<RSIvsElectiveInfographicProps> = ({ isDark }) => {
  const [patientWeight, setPatientWeight] = useState<number>(70);
  const [useObesityIbw, setUseObesityIbw] = useState<boolean>(false);
  const [idealWeight, setIdealWeight] = useState<number>(70);

  // Auto-protect Rocuronium against obesity TBW overdose when weight > 95 kg or user enables IBW mode
  const isObesityIbwActive = useObesityIbw || patientWeight > 95;
  const rocuroniumDosingWeight = isObesityIbwActive
    ? Math.min(patientWeight, Math.max(30, idealWeight))
    : patientWeight;

  // Dosages calculation (Rocuronium: IBW/LBW in obesity; Succinylcholine & Sugammadex: TBW)
  const electiveRocDose = Math.round(rocuroniumDosingWeight * 0.6 * 10) / 10;
  const rsiRocDose = Math.round(rocuroniumDosingWeight * 1.2 * 10) / 10;
  const succinylcholineDose = Math.round(patientWeight * 1.5 * 10) / 10;
  const sugammadexEmergencyDose = Math.round(patientWeight * 16);

  // Shock dosages
  const ketamineShockDoseMin = Math.round(patientWeight * 1.0 * 10) / 10;
  const ketamineShockDoseMax = Math.round(patientWeight * 2.0 * 10) / 10;
  const etomidateShockDoseMin = Math.round(patientWeight * 0.2 * 10) / 10;
  const etomidateShockDoseMax = Math.round(patientWeight * 0.3 * 10) / 10;
  const propofolStandardDose = Math.round(patientWeight * 2);
  const propofolReducedDose = Math.round(patientWeight * 0.75 * 10) / 10;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border space-y-3 ${
        isDark 
          ? 'bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border-rose-500/30' 
          : 'bg-gradient-to-r from-rose-50 via-white to-slate-50 border-rose-200 shadow-xs'
      }`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
            HAVAYOLU YÖNETİMİ &amp; ASPİRASYON PROFİLAKSİSİ
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            DAS 2025 · SCCM 2023 RSI · PreVent &amp; IRIS RKÇ Standartları
          </span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Hızlı Seri Entübasyon (RSI) vs Elektif Entübasyon
        </h3>

        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Dolu mide aspirasyonunu önleyen <strong>Hızlı Seri İndüksiyon (RSI)</strong> ile standart elektif indüksiyonun ilaç sıralaması, nazik BMV (PreVent), Sellick (IRIS), obezite IBW/TBW dozajı ve şoktaki indüksiyon farkları.
        </p>

        <div className="pt-1 flex flex-wrap items-center gap-2">
          <a
            href="https://pubmed.ncbi.nlm.nih.gov/30779528/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span>PreVent RKÇ (NEJM 2019 · PMID: 30779528)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/30347106/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>IRIS RKÇ (JAMA Surg 2019 · PMID: 30347106)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/37707379/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-2xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>SCCM 2023 RSI (PMID: 37707379)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. Interactive Pharmacologic Calculator (Doses for Patient Weight) */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-rose-500" />
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Nöromusküler Blokör &amp; Acil Reversal Hesaplayıcısı
              </h4>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Rokuronyum obezitede <strong>IBW/LBW</strong>, Süksinilkolin ve Sugammadeks ise <strong>Gerçek Kilo (TBW)</strong> üzerinden hesaplanır.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Gerçek Kilo (TBW):</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min={30}
                  max={200}
                  value={patientWeight}
                  onChange={(e) => setPatientWeight(Math.min(250, Math.max(1, Number(e.target.value))))}
                  className={`w-20 px-3 py-1.5 text-sm font-mono tabular-nums font-bold rounded-xl border text-center ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                  }`}
                />
                <span className="text-xs font-mono text-slate-400">kg</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setUseObesityIbw(prev => !prev)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isObesityIbwActive
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {patientWeight > 95 ? 'Obezite IBW Koruması (Oto)' : 'İdeal Kilo (IBW) / Obezite'}
            </button>
          </div>
        </div>

        {/* Obesity IBW Selector Banner */}
        {isObesityIbwActive && (
          <div className={`mt-3 p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
            isDark ? 'bg-indigo-950/30 border-indigo-500/40 text-indigo-200' : 'bg-indigo-50 border-indigo-300 text-indigo-950'
          }`}>
            <div className="space-y-0.5 leading-snug">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Obezite Farmakokinetik Koruması Aktif (Rokuronyum → IBW/LBW)</span>
              </div>
              <p className="text-[11px] opacity-90">
                Yüksek kiloda ({patientWeight} kg TBW) Rokuronyum gerçek kilodan verilirse aşırı doz ve uzamış blok gelişir. Rokuronyum <strong>IBW/LBW ({rocuroniumDosingWeight} kg)</strong>, Süksinilkolin ve Sugammadeks <strong>TBW ({patientWeight} kg)</strong> üzerinden hesaplanmaktadır.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-bold whitespace-nowrap">İdeal Kilo (IBW):</span>
              <input
                type="number"
                min={35}
                max={105}
                value={idealWeight}
                onChange={(e) => setIdealWeight(Math.min(120, Math.max(30, Number(e.target.value))))}
                className={`w-18 px-2.5 py-1 text-xs font-mono tabular-nums font-bold rounded-lg border text-center ${
                  isDark ? 'bg-slate-900 border-indigo-500/50 text-white' : 'bg-white border-indigo-300 text-slate-900'
                }`}
              />
              <span className="text-[11px] font-mono">kg</span>
            </div>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Card 1: Elektif Rokuronyum */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                Elektif İndüksiyon
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500">
                0.6 mg/kg {isObesityIbwActive ? 'IBW' : ''}
              </span>
            </div>
            <div className="text-lg font-black font-mono tabular-nums text-slate-800 dark:text-slate-100">
              {electiveRocDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Standart doz ({isObesityIbwActive ? `IBW ${rocuroniumDosingWeight} kg` : `${patientWeight} kg`}). Onset: <strong>90–120 saniye</strong>.
            </p>
          </div>

          {/* Card 2: RSI Rokuronyum (2X Doz!) */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-rose-950/20 border-rose-500/40' : 'bg-rose-50/70 border-rose-300'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-rose-700 dark:text-rose-300">
                RSI Rokuronyum (2X)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold">
                1.2 mg/kg {isObesityIbwActive ? 'IBW' : ''}
              </span>
            </div>
            <div className="text-lg font-black font-mono tabular-nums text-rose-600 dark:text-rose-400">
              {rsiRocDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-1 leading-snug font-medium">
              Onset: <strong>45–60 sn</strong> ({isObesityIbwActive ? `IBW ${rocuroniumDosingWeight} kg — TBW aşımı engellendi` : `${patientWeight} kg`}). Obezitede mutlaka IBW/LBW ile dozlanır.
            </p>
          </div>

          {/* Card 3: Süksinilkolin RSI */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-amber-950/20 border-amber-500/40' : 'bg-amber-50/70 border-amber-300'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-300">
                Süksinilkolin RSI
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                1.5 mg/kg TBW
              </span>
            </div>
            <div className="text-lg font-black font-mono tabular-nums text-amber-600 dark:text-amber-400">
              {succinylcholineDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              TBW ({patientWeight} kg) ile dozlanır. Onset <strong>45 sn</strong>, süre <strong>6–10 dk</strong>. <strong>Kontrendike:</strong> Hiperkalemi, <strong>yanık (&gt;24–48 sa), ezilme (crush), denervasyon/immobilizasyon, miyopati</strong> ve MH.
            </p>
          </div>

          {/* Card 4: Acil Sugammadeks Kurtarma */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-purple-950/20 border-purple-500/40' : 'bg-purple-50/70 border-purple-300'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-purple-700 dark:text-purple-300">
                Acil Reversal (Sugammadeks)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold">
                16 mg/kg TBW
              </span>
            </div>
            <div className="text-lg font-black font-mono tabular-nums text-purple-600 dark:text-purple-400">
              {sugammadexEmergencyDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Önceden hesaplanmış ve anında ulaşılabilir bulundurulur (TBW).
            </p>
            <div className="mt-1.5 text-[10px] font-semibold text-rose-700 dark:text-rose-300 bg-rose-500/10 p-1.5 rounded border border-rose-500/25 leading-snug">
              ⚠️ DAS 2015/2025: Sugammadeks CICO’yu veya mekanik obstrüksiyonu ÇÖZMEZ; Plan D (eFONA) ASLA geciktirilmemelidir!
            </div>
          </div>
        </div>
      </div>

      {/* 3. Hemodynamically Unstable / Shock Patient Induction Guidance (Önemli & Öncelikli Bölüm) */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'bg-gradient-to-r from-amber-950/25 via-slate-900 to-slate-900 border-amber-500/40' : 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border-amber-300 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-500/20">
          <HeartCrack className="w-5 h-5 text-amber-500 shrink-0" />
          <div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Hemodinamisi Anstabil / Şoktaki Hastada İndüksiyon İlaç ve Doz Stratejisi
            </h4>
            <p className="text-xs text-slate-400">
              Travma, sepsis, masif kanama veya kardiyak yetmezlikte standart indüksiyon dozları ani vazodilatasyon ve kardiyak arreste yol açabilir!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
          {/* Ketamin (1. Tercih) */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/70 border-emerald-500/30' : 'bg-white border-emerald-300 shadow-2xs'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>1. Tercih: KETAMİN</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                1.0 – 2.0 mg/kg
              </span>
            </div>
            <div className="text-sm font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mb-1">
              Hesaplanan: {ketamineShockDoseMin} – {ketamineShockDoseMax} mg
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Neden?</strong> Endojen katekolamin salgısını uyararak SVR ve kan basıncını korur, bronkodilatördür.
            </p>
            <div className="mt-2 text-[10px] text-amber-700 dark:text-amber-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
              ⚠️ Uzamış derin şokta (katekolamin depoları tükenmişse) doğrudan miyokard depresyonu yapabilir; doz <strong>0.5 – 1.0 mg/kg</strong>’a indirilir.
            </div>
          </div>

          {/* Etomidat */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/70 border-sky-500/30' : 'bg-white border-sky-300 shadow-2xs'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1">
                <Activity className="w-4 h-4 text-sky-500" />
                <span>2. Tercih: ETOMİDAT</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-sky-500/20 text-sky-700 dark:text-sky-300">
                0.2 – 0.3 mg/kg
              </span>
            </div>
            <div className="text-sm font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mb-1">
              Hesaplanan: {etomidateShockDoseMin} – {etomidateShockDoseMax} mg
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Neden?</strong> Hemodinamik profili en stabil ajandır; miyokardiyal kontraktiliteyi ve vasküler tonusu etkilemez.
            </p>
            <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 p-1.5 rounded border border-slate-200 dark:border-slate-800">
              ℹ️ Geçici adrenal kortizol süpresyonu tartışmalıdır; ancak tek doz acil RSI indüksiyonunda hemodinamik yararı tartışmasızdır.
            </div>
          </div>

          {/* Propofol (Doz Azaltılmalı!) */}
          <div className={`p-4 rounded-xl border ${
            isDark ? 'bg-slate-950/70 border-rose-500/30' : 'bg-white border-rose-300 shadow-2xs'
          }`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>PROPOFOL (Doz Düşürülmeli!)</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-700 dark:text-rose-300">
                0.5 – 1.0 mg/kg
              </span>
            </div>
            <div className="text-sm font-bold font-mono tabular-nums text-rose-600 dark:text-rose-400 mb-1">
              Düşürülmüş Doz: ~{propofolReducedDose} mg (Standart {propofolStandardDose} mg YERİNE!)
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Dikkat:</strong> Standart 2.0–2.5 mg/kg dozu şoktaki hastada vazodilatasyonla ölümcül kardiyovasküler çöküşe yol açar (morbid obezitede LBW/titre doz).
            </p>
            <div className="mt-2 text-[10px] text-rose-700 dark:text-rose-300 bg-rose-500/10 p-1.5 rounded border border-rose-500/20">
              🚨 Mümkünse Ketamin/Etomidat tercih edilmeli; Propofol zorunluysa doz en az %50–70 azaltılmalıdır.
            </div>
          </div>
        </div>

        {/* Resuscitation Checklist Before RSI */}
        <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Kritik Kural (Resüsitasyon Önceliği):</span>
          </span>
          <span className="text-slate-600 dark:text-slate-300">
            İndüksiyon öncesi <strong>Noradrenalin infüzyonu veya puşe vazopresör</strong> (Efedrin/Fenilefrin) hazır olmalı; hacim açığı olan hastada indüksiyondan önce kristaloid/kan resüsitasyonu başlatılmalıdır.
          </span>
        </div>
      </div>

      {/* 4. Complete 11-Parameter Comparison Table */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
          <Scale className="w-5 h-5 text-indigo-500" />
          <div>
            <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              11 Parametrede Adım Adım RSI vs Elektif Entübasyon Matrisi
            </h4>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Her parametrenin klinik dayanağı, ilaç sıralaması, BMV yaklaşımı ve güncel kanıtları.
            </p>
          </div>
        </div>

        {/* Rows */}
        <div className="mt-4 space-y-3.5">
          {COMPARISON_ROWS.map((row, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                row.rsi.statusType === 'danger'
                  ? isDark 
                    ? 'bg-slate-950/70 border-rose-500/30 ring-1 ring-rose-500/10' 
                    : 'bg-rose-50/30 border-rose-200'
                  : isDark 
                    ? 'bg-slate-950/40 border-slate-800' 
                    : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              {/* Header Parameter Title */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {row.parameter}
                </span>
                <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${
                  row.rsi.statusType === 'danger'
                    ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'
                    : row.rsi.statusType === 'warning'
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                }`}>
                  {row.rsi.statusType === 'danger' ? 'Kritik RSI Farkı' : row.rsi.statusType === 'warning' ? 'Tartışmalı / Güncel' : 'Güvenlik Protokolü'}
                </span>
              </div>

              {/* 2-Column Split: RSI vs Elektif */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* RSI Side */}
                <div className={`p-3.5 rounded-lg border ${
                  isDark ? 'bg-rose-950/15 border-rose-500/25' : 'bg-white border-rose-200 shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>Hızlı Seri Entübasyon (RSI)</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-800 dark:text-rose-200">
                      {row.rsi.badge}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {row.rsi.title}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {row.rsi.description}
                  </p>
                </div>

                {/* Elective Side */}
                <div className={`p-3.5 rounded-lg border ${
                  isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
                }`}>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>Elektif Standart Entübasyon</span>
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
                      {row.elective.badge}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {row.elective.title}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {row.elective.description}
                  </p>
                </div>
              </div>

              {/* Clinical Bottom Explanation */}
              <div className="mt-2.5 pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-start gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 italic">
                <Info className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                <span><strong>Klinik Gerekçe:</strong> {row.clinicalRationale}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Classical RSI vs Modified RSI (Gentle Ventilation) */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'bg-amber-950/15 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
      }`}>
        <div className="flex items-center gap-2 mb-3 text-amber-800 dark:text-amber-300 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Klinik Ayrım: Klasik RSI vs Modifiye RSI (PreVent RKÇ &amp; SCCM 2023 Kanıtı)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-amber-200'
          }`}>
            <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Klasik RSI (BMV’den Kaçınma — Seçilmiş Endikasyon)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Aktif kusma, hematemez veya ciddi GİS obstrüksiyonu/ileus bulunan ve oksijenasyon rezervi (FRC) yeterli, tam preoksijenlenmiş (FeO₂ &gt; %85–90) hastalarda indüksiyon sonrası tüp kafı şişene kadar maske ventilasyonundan kaçınılır. Güncel kılavuzlarda artık tüm hastalarda mutlak bir yasak değildir.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-amber-200'
          }`}>
            <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Modifiye RSI — Nazik BMV (&lt; 15–20 cmH₂O · PreVent 2019 &amp; SCCM 2023)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              <strong>PreVent RKÇ (Casey, NEJM 2019; PMID 30779528)</strong> indüksiyon ile laringoskopi arasında tepe basıncı <strong>&lt; 15–20 cmH₂O</strong> tutulan nazik BMV’nin ciddi hipoksemiyi yarıya indirdiğini (<strong>%10.9 vs %22.8</strong>) ve aspirasyonu artırmadığını kanıtlamıştır. <strong>SCCM 2023 RSI</strong> kılavuzu kritik, hipoksemik, morbid obez, gebe, asidotik ve pediatrik hastalarda nazik BMV’yi önerir.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Literature References */}
      <div className={`p-4 rounded-xl border text-xs space-y-2 ${
        isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
          <BookOpen className="w-4 h-4 text-rose-500" />
          <span>Literatür ve Havayolu Kılavuzları</span>
        </div>
        <p className="leading-relaxed">
          1. <strong>PreVent Trial:</strong> Casey JD, Janz DR, Russell DW, et al. <em>Bag-Mask Ventilation during Tracheal Intubation of Critically Ill Adults.</em> N Engl J Med. 2019 Feb 28;380(9):811-821. PMID: 30779528.
        </p>
        <p className="leading-relaxed">
          2. <strong>IRIS Trial:</strong> Birenbaum A, Hajage D, Roche S, et al. <em>Effect of Cricoid Pressure Compared With a Sham Procedure in the Rapid Sequence Induction of Anesthesia: The IRIS Randomized Clinical Trial.</em> JAMA Surg. 2019 Jan 1;154(1):9-17. PMID: 30347106.
        </p>
        <p className="leading-relaxed">
          3. <strong>SCCM 2023 RSI:</strong> Acquisto NM, Mosier JM, Bittner EA, et al. <em>Society of Critical Care Medicine Clinical Practice Guidelines for Rapid Sequence Intubation in the Critically Ill Adult Patient.</em> Crit Care Med. 2023 Oct;51(10):1411-1430. PMID: 37707379.
        </p>
        <p className="leading-relaxed">
          4. <strong>DAS 2025:</strong> Ahmad I, El-Boghdadly K, Iliff H, et al. <em>Difficult Airway Society 2025 guidelines for management of unanticipated difficult tracheal intubation in adults.</em> Br J Anaesth. 2026;136(1):283-307. PMID: 41203471.
        </p>
        <p className="leading-relaxed">
          5. El-Orbany M, Connolly LA. <em>Rapid sequence induction and intubation: current controversy.</em> Anesth Analg. 2010 May;110(5):1318-1328. PMID: 20237045.
        </p>
        <p className="leading-relaxed">
          6. Higgs A, McGrath BA, Goddard C, et al. <em>Guidelines for the management of tracheal intubation in critically ill adults.</em> Br J Anaesth. 2018 Feb;120(2):323-352. PMID: 29406182.
        </p>
      </div>
    </div>
  );
};
