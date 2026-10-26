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
import { ShareLinkButton } from '../common/ShareLinkButton';

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
      description: 'Yetersiz açlık, acil cerrahi, travma, ileus/GIS obstrüksiyonu, ileri gebelik (>20 hf), GLP-1 kullanımı veya diyabetik gastroparezi.',
      badge: 'Dolu Mide (Full Stomach)',
      statusType: 'danger'
    },
    elective: {
      title: 'Doğrulanmış Boş Mide',
      description: 'Açlık kılavuzlarına tam uyumlu: Berrak sıvılar ≥ 2 saat, hafif yemek ≥ 6 saat, ağır/yağlı yemek ≥ 8 saat açlık.',
      badge: 'Boş Mide (2-6-8 Kuralı)',
      statusType: 'neutral'
    },
    clinicalRationale: 'Açlık süresi saat olarak dolsa dahi travma, şok, şiddetli ağrı veya opioid kullanımı mide boşalmasını durdurarak hastayı dolu mide haline getirir.'
  },
  {
    parameter: '3. İlaç Verilme Sırası & Zamanlaması',
    rsi: {
      title: 'Hemen Ardı Ardına (Gecikmesiz Ardışık Veriliş)',
      description: 'Hipnotik ajan bolus verilir verilmez (bilinç kaybıyla eş zamanlı) hiç beklemeden ve araya ventilasyon sokmadan derhal NMB puşe edilir.',
      badge: 'Hipnotik ➔ Anında NMB',
      statusType: 'danger'
    },
    elective: {
      title: 'Kademeli & Doğrulamalı Sıralama',
      description: 'Önce analjezik (fentanil) + hipnotik verilir; hasta uyuduktan sonra ÖNCE balon-maske ile ventile edilebildiği test edilir, ARDINDAN kas gevşetici verilir.',
      badge: 'Hipnotik ➔ BMV Teyidi ➔ NMB',
      statusType: 'info'
    },
    clinicalRationale: 'Elektif indüksiyonda ventilasyon teyit edilmeden NMB verilmez ("hasta ventile edilemezse uyansın" emniyeti). RSI’da ise aspirasyon risk penceresini daraltmak için beklemeden ardışık verilir.'
  },
  {
    parameter: '4. Balon-Maske Ventilasyonu (BMV)',
    rsi: {
      title: 'Rutin BMV Kaçınılır (Modifiye RSI / Nazik Ventilasyon Hariç)',
      description: 'Klasik RSI’da mideye gaz basmamak için rutin BMV yapılmaz. ANCAK hipoksemi riski yüksek, düşük FRC’li (pediatri, obez, ARDS, gebe) hastalarda Modifiye RSI ile tepe basıncı < 15 cmH2O tutularak nazikçe ventile edilir.',
      badge: 'Rutin Kaçınılır (Modifiye Hariç)',
      statusType: 'warning'
    },
    elective: {
      title: 'Rutin Olarak Uygulanır ve Doğrulanır',
      description: 'Hipnotik sonrası ve kas gevşetici etki edene kadar hasta sakin, ritmik ve kontrollü şekilde balon-maskeyle ventile edilir.',
      badge: 'Rutin Doğrulama',
      statusType: 'neutral'
    },
    clinicalRationale: '15-20 cmH2O altındaki tepe basınçlarında alt özofagus sfinkterinin açılmadığı ve regürjitasyon riskinin artmadığı kanıtlanmıştır.'
  },
  {
    parameter: '5. Preoksijenasyon & Apneik Oksijenasyon',
    rsi: {
      title: 'Derin Preoksijenasyon + NODESAT (Apneik Oksijen)',
      description: '%100 O2 ile 3-5 dakika veya 8 vital kapasite nefesi. İndüksiyon anından entübasyona kadar nazal kanülle 15 L/dk O2 (NODESAT) uygulanır.',
      badge: '%100 O2 + NODESAT (15 L/dk)',
      statusType: 'success'
    },
    elective: {
      title: 'Standart Preoksijenasyon',
      description: '%100 O2 ile 3 dakika sakin tidal solunum veya EtO2 > %90 olana kadar maskeyle solutma.',
      badge: 'Standart (EtO2 > %90)',
      statusType: 'neutral'
    },
    clinicalRationale: 'RSI sırasında apne döneminde maske ventilasyonu rutin yapılmadığından, FRC deposunu %100 O2 ile doldurmak desatürasyonsuz süreyi uzatır.'
  },
  {
    parameter: '6. Nöromusküler Blokör (NMB) Dozu',
    rsi: {
      title: 'Yüksek Doz Hızlı Etkili Ajan',
      description: 'Süksinilkolin 1.0–1.5 mg/kg IV veya YÜKSEK DOZ Rokuronyum 1.2 mg/kg IV (standart dozun 2 katı!).',
      badge: 'Rokuronyum 1.2 mg/kg (2X Doz)',
      statusType: 'danger'
    },
    elective: {
      title: 'Standart Doz Kas Gevşetici',
      description: 'Rokuronyum 0.6 mg/kg, Sisatraküryum 0.15 mg/kg veya Veküronyum 0.1 mg/kg IV.',
      badge: 'Rokuronyum 0.6 mg/kg',
      statusType: 'neutral'
    },
    clinicalRationale: 'Rokuronyum dozu 1.2 mg/kg’a çıkarıldığında onset süresi 45-60 saniyeye inerek süksinilkolin hızına ulaşır.'
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
    clinicalRationale: 'RSI’da bekleme payı olmadığı için tam bolus verilir. Anstabil hastada propofolün derin vazodilatasyonundan kaçınmak için Ketamin/Etomidat tercih edilir.'
  },
  {
    parameter: '8. Krikoid Bası (Sellick Manevrası)',
    rsi: {
      title: 'Tartışmalı & İsteğe Bağlı (Opsiyonel)',
      description: 'Güncel kılavuzlarda (DAS, BJA, Cochrane) rutin zorunlu DEĞİLDİR. Uygulanırsa 30 N (~3 kg) bası yapılır; laringoskopik görüşü bozduğu an DERHAL bırakılmalıdır.',
      badge: 'İsteğe Bağlı / Tartışmalı',
      statusType: 'warning'
    },
    elective: {
      title: 'Uygulanmaz (Gerekirse BURP)',
      description: 'Krikoid bası uygulanmaz. Yalnızca larinks görüntüsünü optimize etmek için BURP manevrası yapılabilir.',
      badge: 'Yalnızca BURP',
      statusType: 'neutral'
    },
    clinicalRationale: 'Sellick manevrasının regürjitasyonu kesin önlediğine dair güçlü kanıt yoktur; aksine anatomik olarak krikoidin kayması laringoskopik aksı bozup entübasyonu güçleştirebilir.'
  },
  {
    parameter: '9. Laringoskopi & Kaf Şişirme Zamanı',
    rsi: {
      title: 'İlk Nefesten Önce Kaf Derhal Şişirilir',
      description: 'Tüp vokal kordlardan geçer geçmez kaf şişirilir; ilk pozitif basınçlı soluk ancak kaf şiştikten SONRA verilir.',
      badge: 'Önce Kaf, Sonra Ventilasyon',
      statusType: 'danger'
    },
    elective: {
      title: 'Standart Kaf Şişirme ve Doğrulama',
      description: 'Tüp yerleştirilir, kaf şişirilir, oskültasyon ve kapnografi dalga formu ile teyit edilir.',
      badge: 'Standart Doğrulama',
      statusType: 'neutral'
    },
    clinicalRationale: 'Kaf şişirilmeden önce verilen pozitif basınçlı soluk, farenkste olası regürjite materyali trakea derinliklerine itebilir.'
  },
  {
    parameter: '10. İlaç Etki Bekleme Süresi',
    rsi: {
      title: '45 – 60 Saniye (Kronometre Takibi)',
      description: 'Kas gevşetici verildikten sonra 50-60. saniyede gecikmeksizin doğrudan laringoskopiye girilir.',
      badge: '45 – 60 saniye',
      statusType: 'danger'
    },
    elective: {
      title: '90 – 180 Saniye (Tam Gevşeme)',
      description: 'Kas gevşeticinin tam pik yapması beklenir (genellikle 2-3 dakika), hasta bu sürede nazikçe ventile edilir.',
      badge: '90 – 180 saniye',
      statusType: 'neutral'
    },
    clinicalRationale: 'RSI’da bekleme süresi uzarsa hasta apneik kalır ve desatüre olur; bu nedenle yüksek doz NMB ile en erken sürede tüp takılır.'
  },
  {
    parameter: '11. Başarısız Entübasyon & Kurtarma Planı',
    rsi: {
      title: 'Videolaringoskop + Sugammadeks 16 mg/kg Hazırlığı',
      description: 'RSI öncesi video laringoskop hazır olmalıdır. Rokuronyum 1.2 mg/kg verildiğinde acil CICO reversal için Sugammadeks 16 mg/kg çekili bekletilir.',
      badge: 'Videolaringoskop + Sugammadeks 16 mg/kg',
      statusType: 'success'
    },
    elective: {
      title: 'Standart Algoritma (DAS Kılavuzu)',
      description: 'Balon-maske ile ventile edilebilirlik zaten doğrulanmış olduğundan supraglottik havayolu (LMA) veya standart laringoskopi adımları izlenir.',
      badge: 'Standart DAS Planı',
      statusType: 'neutral'
    },
    clinicalRationale: 'RSI’da "entübe edilemez, ventile edilemez" senaryosunda LMA yerleştirilse dahi mide dolu olduğundan aspirasyon riski yüksektir.'
  }
];

export const RSIvsElectiveInfographic: React.FC<RSIvsElectiveInfographicProps> = ({ isDark }) => {
  const [patientWeight, setPatientWeight] = useState<number>(70);

  // Dosages calculation
  const electiveRocDose = Math.round(patientWeight * 0.6 * 10) / 10;
  const rsiRocDose = Math.round(patientWeight * 1.2 * 10) / 10;
  const succinylcholineDose = Math.round(patientWeight * 1.5 * 10) / 10;
  const sugammadexEmergencyDose = Math.round(patientWeight * 16);

  // Shock dosages
  const ketamineShockDoseMin = Math.round(patientWeight * 1.0 * 10) / 10;
  const ketamineShockDoseMax = Math.round(patientWeight * 2.0 * 10) / 10;
  const etomidateShockDoseMin = Math.round(patientWeight * 0.2 * 10) / 10;
  const etomidateShockDoseMax = Math.round(patientWeight * 0.3 * 10) / 10;
  const propofolReducedDose = Math.round(patientWeight * 0.75 * 10) / 10;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
        isDark 
          ? 'bg-gradient-to-r from-rose-950/30 via-slate-900 to-slate-900 border-rose-500/30' 
          : 'bg-gradient-to-r from-rose-50 via-white to-slate-50 border-rose-200 shadow-xs'
      }`}>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
              HAVAYOLU YÖNETİMİ & ASPİRASYON PROFİLAKSİSİ
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Difficult Airway Society (DAS) & ASA Standartları
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Hızlı Seri Entübasyon (RSI) vs Elektif Entübasyon
          </h3>
          <p className={`text-xs sm:text-sm max-w-3xl leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Dolu mide aspirasyonunu önleyen <strong>Hızlı Seri İndüksiyon (RSI)</strong> ile standart elektif indüksiyonun ilaç sıralaması, BMV tutumu, Sellick tartışması ve şoktaki dozaj farklılıkları.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <ShareLinkButton
            type="infografik"
            id="rsi-vs-elective"
            isDark={isDark}
            title="RSI vs Elektif İnfografiği Bağlantısını Kopyala"
          />

          <a
            href="https://pubmed.ncbi.nlm.nih.gov/20237045/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-500" />
            <span>PubMed (El-Orbany Review: PMID 20237045)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* 2. Interactive Pharmacologic Calculator (Doses for Patient Weight) */}
      <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-rose-500" />
              <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Nöromusküler Blokör & Acil Reversal Hesaplayıcısı
              </h4>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Hasta kilosunu girerek standart elektif doz ile RSI dozu (2 katı!) arasındaki farkı ve acil Sugammadeks miktarını anında hesaplayın.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Hasta Kilosu:</span>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min={30}
                max={200}
                value={patientWeight}
                onChange={(e) => setPatientWeight(Math.max(1, Number(e.target.value)))}
                className={`w-20 px-3 py-1.5 text-sm font-mono font-bold rounded-xl border text-center ${
                  isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              />
              <span className="text-xs font-mono text-slate-400">kg</span>
            </div>
          </div>
        </div>

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
                0.6 mg/kg
              </span>
            </div>
            <div className="text-lg font-black font-mono text-slate-800 dark:text-slate-100">
              {electiveRocDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Standart doz. Onset: <strong>90–120 saniye</strong>. Bu sürede hasta maskeyle ventile edilir.
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
                1.2 mg/kg
              </span>
            </div>
            <div className="text-lg font-black font-mono text-rose-600 dark:text-rose-400">
              {rsiRocDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-1 leading-snug font-medium">
              RSI dozu 2 katıdır! Onset: <strong>45–60 saniye</strong>. Maske ventilasyonu yapılmaksızın entübe edilir.
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
                1.5 mg/kg
              </span>
            </div>
            <div className="text-lg font-black font-mono text-amber-600 dark:text-amber-400">
              {succinylcholineDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              Depolarizan ajan. Onset: <strong>45 sn</strong>, süre: <strong>6-10 dk</strong>. Hiperkalemi, yanık ve MH riskinde kontrendikedir.
            </p>
          </div>

          {/* Card 4: Acil Sugammadeks Kurtarma */}
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-purple-950/20 border-purple-500/40' : 'bg-purple-50/70 border-purple-300'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-purple-700 dark:text-purple-300">
                Acil Reversal (CICO)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold">
                16 mg/kg
              </span>
            </div>
            <div className="text-lg font-black font-mono text-purple-600 dark:text-purple-400">
              {sugammadexEmergencyDose} <span className="text-xs font-normal">mg</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
              RSI'da "entübe edilemez, ventile edilemez" durumunda Rokuronyum bloğunu 3 dakikada tam geri çevirir.
            </p>
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
            <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mb-1">
              Hesaplanan: {ketamineShockDoseMin} – {ketamineShockDoseMax} mg
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Neden?</strong> Endojen katekolamin salgısını uyararak SVR ve kan basıncını korur, bronkodilatördür.
            </p>
            <div className="mt-2 text-[10px] text-amber-700 dark:text-amber-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
              ⚠️ Uzamış derin şokta (katekolamin depoları tükenmişse) doğrudan miyokard depresyonu yapabilir; doz <strong>0.5 – 1.0 mg/kg</strong>'a indirilir.
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
            <div className="text-sm font-bold font-mono text-sky-600 dark:text-sky-400 mb-1">
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
            <div className="text-sm font-bold font-mono text-rose-600 dark:text-rose-400 mb-1">
              Düşürülmüş Doz: ~{propofolReducedDose} mg (Standart 140 mg YERİNE!)
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Dikkat:</strong> Standart 2.0-2.5 mg/kg dozu şoktaki hastada vazodilatasyonla ölümcül kardiyovasküler çöküşe yol açar.
            </p>
            <div className="mt-2 text-[10px] text-rose-700 dark:text-rose-300 bg-rose-500/10 p-1.5 rounded border border-rose-500/20">
              🚨 Mümkünse Ketamin/Etomidat tercih edilmeli; Propofol zorunluysa doz en az %50-70 azaltılmalıdır.
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
          <span>Klinik Ayrım: Klasik RSI vs Modifiye RSI (Nazik Ventilasyon)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-amber-200'
          }`}>
            <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Klasik RSI (Sıfır Ventilasyon)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              İlaçlar puşe edildikten sonra entübasyon tüpü kordlardan geçip kaf şişene kadar <strong>asla maske ventilasyonu yapılmaz</strong>. Yeterli fonksiyonel rezidüel kapasitesi (FRC) olan, preoksijenasyonu tam normoksik erişkinlerde standarttır.
            </p>
          </div>

          <div className={`p-3.5 rounded-xl border ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-amber-200'
          }`}>
            <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Modifiye RSI (Nazik Ventilasyon)
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              Pediatrik hastalar, morbid obezler, kritik hipoksemik ARDS hastaları veya gebe kadınlarda FRC çok düşüktür; 45-60 saniyelik apneyi tolere edemeyip hızla desatüre olurlar. Bu hastalarda tepe inspiratuar basıncı <strong>&lt; 15 cmH2O</strong> tutularak mideye hava basmadan çok nazik maske ventilasyonu uygulanır.
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
          1. El-Orbany M, Connolly LA. <em>Rapid sequence induction and intubation: current controversy.</em> Anesthesia & Analgesia. 2010 May;110(5):1318-28. PMID: 20237045.
        </p>
        <p className="leading-relaxed">
          2. Algie CM, Mahar RK, Tan HB, et al. <em>Effectiveness and risks of cricoid pressure during rapid sequence induction for endotracheal intubation.</em> Cochrane Database Syst Rev. 2015. PMID: 26578526. (Sellick manevrasının tartışmalı rolü ve yetersiz kanıtı).
        </p>
        <p className="leading-relaxed">
          3. Higgs A, McGrath BA, Goddard C, et al. <em>Guidelines for the management of tracheal intubation in critically ill adults.</em> British Journal of Anaesthesia. 2018 Feb;120(2):323-352. PMID: 29406182.
        </p>
      </div>
    </div>
  );
};
