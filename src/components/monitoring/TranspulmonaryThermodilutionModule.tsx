import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Droplets,
  Gauge,
  Info,
  ShieldAlert,
  ThermometerSnowflake,
  XCircle,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';
import { TptdInteractiveDecisionTree } from './TptdInteractiveDecisionTree';

interface TranspulmonaryThermodilutionModuleProps {
  isDark: boolean;
}

type SectionFilter =
  | 'all'
  | 'intro'
  | 'physics'
  | 'parameters'
  | 'algorithms'
  | 'pitfalls'
  | 'references';

interface GlossaryTerm {
  symbol: string;
  fullTr: string;
  meaning: string;
}

interface GlossaryGroup {
  title: string;
  subtitle: string;
  items: GlossaryTerm[];
}

const GLOSSARY_GROUPS: GlossaryGroup[] = [
  {
    title: '1. Cihaz, İndikatör ve Zaman Terimleri',
    subtitle: 'Soğuk sıvının damar içindeki yolculuğunu tanımlayan temel ölçüm birimleri',
    items: [
      {
        symbol: 'Termistör',
        fullTr: 'Kateter Ucu Sıcaklık Sensörü',
        meaning:
          'Femoral veya aksiller artere yerleştirilen özel arter kateterinin ucunda bulunan ve kan sıcaklığındaki binde birlik değişimleri algılayan ısı algılayıcısıdır.',
      },
      {
        symbol: 'AT',
        fullTr: 'Appearance Time (Görünüm Süresi)',
        meaning:
          'Soğuk serumun santral venden verildiği an ile ilk soğuk moleküllerin arterdeki termistöre ulaştığı an arasında geçen süredir.',
      },
      {
        symbol: 'MTt',
        fullTr: 'Mean Transit Time (Ortalama Geçiş Süresi)',
        meaning:
          'Enjekte edilen soğuk bolusun yarısının arterdeki sensörden geçmesi için gereken ortalama süredir; tüm göğüs içi karışım hacmini (ITTV) belirler.',
      },
      {
        symbol: 'DSt',
        fullTr: 'Downslope Time (Eksponansiyel Azalma Süresi)',
        meaning:
          'Sıcaklık düşüş eğrisinin tepe noktasından bazale dönerkenki eksponansiyel iniş hızını (%85 → %45) gösterir; zincirdeki en büyük hacmi (akciğerleri / PTV) yansıtır.',
      },
    ],
  },
  {
    title: '2. Termal Karışım Hacimleri (Ara Hesaplamalar)',
    subtitle: 'Cihazın eğriden önce bulup sonra kalp ve akciğeri ayırmak için kullandığı hacimler',
    items: [
      {
        symbol: 'ITTV',
        fullTr: 'İntratorasik Termal Hacim',
        meaning:
          'Soğukluğun santral venden büyük artere giderken temas edip soğuttuğu tüm göğüs içi hacimdir (4 kalp odacığı + akciğer damarlarındaki kan + akciğer dokusundaki su).',
      },
      {
        symbol: 'PTV',
        fullTr: 'Pulmoner Termal Hacim',
        meaning:
          'Yalnızca akciğer kompartmanındaki toplam termal hacimdir; akciğer damarları içindeki kan (PBV) ile damar dışındaki suyun (EVLW) toplamına eşittir.',
      },
      {
        symbol: 'PBV',
        fullTr: 'Pulmoner Kan Hacmi',
        meaning:
          'Akciğer arterleri, kapillerleri ve venlerinin yalnızca damar lümeni içinde yer alan kan hacmidir.',
      },
      {
        symbol: 'ITBV / ITBVI',
        fullTr: 'İntratorasik Kan Hacmi (ve İndeksi)',
        meaning:
          'Göğüs içinde yalnızca damar ve kalp boşluklarının içinde bulunan toplam kan hacmidir (GEDV + PBV).',
      },
    ],
  },
  {
    title: '3. Kalp Doluluğu, Akciğer Ödemi ve Geçirgenlik',
    subtitle: 'Yatak başında sıvı ve ödem yönetimini doğrudan belirleyen klinik hedefler',
    items: [
      {
        symbol: 'GEDV / GEDVI',
        fullTr: 'Global Diyastol Sonu Hacim (ve İndeksi)',
        meaning:
          'Kalbin dört odacığının (sağ/sol atriyum ve sağ/sol ventrikül) diyastol sonundaki toplam kan hacmidir. Basınç (CVP/PAOP) yerine gerçek volümetrik önyükü ölçer.',
      },
      {
        symbol: 'EVLW / EVLWI',
        fullTr: 'Ekstravasküler Akciğer Suyu (ve İndeksi)',
        meaning:
          'Akciğer damarlarının dışına sızmış interstisyel ve alveoler sıvı miktarıdır. Pulmoner ödemin akciğer grafisinden çok önce saptanan doğrudan sayısal ölçüsüdür.',
      },
      {
        symbol: 'PVPI',
        fullTr: 'Pulmoner Vasküler Permeabilite İndeksi',
        meaning:
          'Damar dışındaki akciğer suyunun damar içindeki akciğer kanına oranıdır (EVLW / PBV). Ödemin basınç artışı (kardiyojenik) mı yoksa damar kaçağı (ARDS) mı olduğunu ayırır.',
      },
      {
        symbol: 'BSA vs. PBW',
        fullTr: 'Vücut Yüzey Alanı vs. Öngörülen Kilo',
        meaning:
          'Kalp hacimleri (CI, GEDVI, ITBVI) vücut yüzey alanına (BSA, m^{2}) bölünür. Akciğer büyüklüğü boya bağlı olduğu için EVLWI daima öngörülen vücut ağırlığına (PBW, kg) bölünür.',
      },
    ],
  },
  {
    title: '4. Akım, Kasılma Gücü ve Sürekli Takip',
    subtitle: 'Pompa performansını ve nabız dalgasından anlık takibi anlatan kavramlar',
    items: [
      {
        symbol: 'CO / CI',
        fullTr: 'Kardiyak Debi / Kardiyak İndeks',
        meaning:
          'Kalbin dakikada pompaladığı kan hacmi (L/dk) ve bunun BSA’ya bölünmüş değeridir (L/dk/m^{2}).',
      },
      {
        symbol: 'PCCO',
        fullTr: 'Pulse Contour Cardiac Output',
        meaning:
          'Soğuk salin bolusu ile kalibrasyon yapıldıktan sonra, cihazın arteriyel basınç dalgasının şeklinden atım-atım hesapladığı sürekli kalp debisidir.',
      },
      {
        symbol: 'CFI',
        fullTr: 'Kardiyak Fonksiyon İndeksi',
        meaning:
          'Kardiyak debinin global diyastol sonu hacmine oranıdır (CO / GEDV). Önyükten bağımsız global kalp kasılma gücünü (kontraktilite) yansıtır.',
      },
      {
        symbol: 'GEF',
        fullTr: 'Global Ejeksiyon Fraksiyonu',
        meaning:
          'Dört kalp boşluğunun toplam dolum hacmine kıyasla kalbin fırlattığı kan oranıdır (4 × SV / GEDV). Hem sağ hem sol ventrikülün ortak ejeksiyon göstergesidir.',
      },
    ],
  },
];

interface ParameterRow {
  symbol: string;
  name: string;
  formula: string;
  normalRange: string;
  criticalValue: string;
  indexRule: string;
  clinicalNote: string;
}

const PARAMETER_ROWS: ParameterRow[] = [
  {
    symbol: 'CO / CI',
    name: 'Kardiyak Debi / İndeks',
    formula: 'Stewart–Hamilton (∫ ΔT_{b} dt ters orantılı)',
    normalRange: 'CI: 2,8–4,2 L/dk/m^{2}',
    criticalValue: '< 2,2 L/dk/m^{2} (Hipoperfüzyon)',
    indexRule: 'BSA (m^{2})',
    clinicalNote:
      'Eğri 15–25 sn sürdüğü için 3–5 solunum siklusunu ortalar; PAC bolusa göre solunum fazından daha az etkilenir.',
  },
  {
    symbol: 'GEDVI',
    name: 'Global Diyastol Sonu Hacim İndeksi',
    formula: '(ITTV − PTV) / BSA = [CO × (MTt − DSt)] / BSA',
    normalRange: '680–800 mL/m^{2}',
    criticalValue: '< 600 (Önyük ↓) · > 900 (Volüm fazlası / dilatasyon)',
    indexRule: 'BSA (m^{2})',
    clinicalNote:
      '4 kalp odacığının toplam diyastol sonu kan hacmidir. PEEP ve İAB artışından CVP/PAOP gibi yapay etkilenmez; ancak tek başına sıvı yanıtlılığını (%100) öngörmez.',
  },
  {
    symbol: 'ITBVI',
    name: 'İntratorasik Kan Hacmi İndeksi',
    formula: 'ITBVI ≈ 1,25 × GEDVI (Sakka ampirik ilişkisi)',
    normalRange: '850–1000 mL/m^{2}',
    criticalValue: '< 750 mL/m^{2}',
    indexRule: 'BSA (m^{2})',
    clinicalNote:
      'Kalp odacıkları + pulmoner kan hacmini (PBV) içerir. GEDVI ile matematiksel olarak kupledir (PiCCO).',
  },
  {
    symbol: 'EVLWI',
    name: 'Ekstravasküler Akciğer Suyu İndeksi',
    formula: '(ITTV − ITBV) / PBW = (PTV − PBV) / PBW',
    normalRange: '3,0–7,0 mL/kg PBW',
    criticalValue: '≥ 10 Belirgin Ödem · > 14–15 Ağır / Yüksek Mortalite',
    indexRule: 'PBW (kg) · ÖNGÖRÜLEN KİLO!',
    clinicalNote:
      'Obez hastalarda gerçek ağırlığa bölünürse yapay düşük çıkar; DAİMA boya dayalı öngörülen vücut ağırlığına (PBW) indekslenir. Akciğer grafisinden çok daha erken ödemi yakalar.',
  },
  {
    symbol: 'PVPI',
    name: 'Pulmoner Vasküler Permeabilite İndeksi',
    formula: 'EVLW / PBV = EVLW / (ITBV − GEDV)',
    normalRange: '1,0–3,0',
    criticalValue: '≥ 3,0 (Alveolo-kapiller geçirgenlik artışı / ARDS)',
    indexRule: 'Boyutsuz Oran',
    clinicalNote:
      'Aynı yüksek EVLWI değerinde hidrostatik (PVPI < 3,0) ile permeabilite/ARDS (PVPI ≥ 3,0) ödemini ayırt eden kilit orandır.',
  },
  {
    symbol: 'CFI',
    name: 'Kardiyak Fonksiyon İndeksi',
    formula: 'CO / GEDV (veya CI / GEDVI × 1000)',
    normalRange: '4,5–6,5 dk^{-1}',
    criticalValue: '< 3,5–4,0 dk^{-1} (Sistolik disfonksiyon)',
    indexRule: 'Zaman^{-1} (dk^{-1})',
    clinicalNote:
      'Önyükten bağımsız global kardiyak kontraktiliteyi yansıtır; ancak ciddi RV veya LV dilatasyonunda (GEDV aşırı büyükse) yapay düşük görünebilir.',
  },
  {
    symbol: 'GEF',
    name: 'Global Ejeksiyon Fraksiyonu',
    formula: '(4 × SV) / GEDV × 100',
    normalRange: '%25 – %35',
    criticalValue: '< %20 (Biventriküler veya ağır tek ventrikül yetmezliği)',
    indexRule: 'Yüzde (%)',
    clinicalNote:
      'Ekokardiyografik LVEF ile koreledir; ancak hem RV hem LV ejeksiyonunun bileşimidir. İzole RV yetmezliğinde EKO doğrulaması şarttır.',
  },
];

interface PitfallItem {
  condition: string;
  mechanism: string;
  artifact: string;
  mitigation: string;
  severity: 'high' | 'medium';
}

const PITFALLS: PitfallItem[] = [
  {
    condition: 'Femoral Santral Venöz Kateterden Enjeksiyon',
    mechanism:
      'Soğuk bolus sağ atriyuma ulaşmadan önce tüm inferior vena kava (IVC) kan sütunu ile karışır; ortalama geçiş süresi (MTt) uzar.',
    artifact: 'GEDVI yapay ~150–200 mL/m^{2} yüksek ölçülür (EVLWI yazılım düzeltmesiyle görece korunur).',
    mitigation:
      'Üst kava (İJV/Subklavyen) tercih edin. Femoral SVK zorunluysa monitörde kateter konumu "Femoral" seçilmelidir; mutlak GEDVI yerine trend izleyin.',
    severity: 'medium',
  },
  {
    condition: 'Masif Pulmoner Emboli veya Pnömonektomi / Tek Akciğer',
    mechanism:
      'Soğuk indikatör yalnızca perfüze olan akciğer yatağından geçebilir; akım almayan obstrükte veya rezeke segmentin termal hacmi ölçülemez.',
    artifact: 'EVLWI olduğundan DÜŞÜK (False Low) ölçülür; gerçek pulmoner ödem maskelenebilir.',
    mitigation:
      'Majör akciğer rezeksiyonu veya masif PE’de EVLWI mutlak eşiklerine güvenmeyin; akciğer USG (B-çizgileri) ve PaO_{2}/FiO_{2} ile korele edin.',
    severity: 'high',
  },
  {
    condition: 'İntrakardiyak Şant (ASD / VSD / Açık Foramen Ovale)',
    mechanism:
      'Soğuk bolus kalp içi kısa devre ile erken veya çift pikli resirkülasyon dalgası oluşturur; eksponansiyel azalma (DSt) bozulur.',
    artifact: 'CO, MTt, DSt, GEDVI ve EVLWI ölçümleri tamamen geçersizdir.',
    mitigation:
      'Bilinen anlamlı şantta TPTD kullanmayın; ekokardiyografi (TEE/TTE) ile ventrikül ve şant değerlendirmesi yapın.',
    severity: 'high',
  },
  {
    condition: 'Büyük Torakal/Abdominal Aort Anevrizması veya Dev Odacık',
    mechanism:
      'Büyük damar/odacık hacmi soğuk bolusu ek bir karıştırma havuzunda tutar; ortalama geçiş süresi (MTt) ve DSt belirgin uzar.',
    artifact: 'GEDVI (ve PTV/EVLWI) abartılı yüksek ölçülür; SVV/PPV ilişkisi bozulabilir.',
    mitigation:
      'Kateter yerleşim anatomisini kontrol edin; mutlak GEDVI hedefi (< 800) yerine bazal hastaya özel trend değişimine bakın.',
    severity: 'medium',
  },
  {
    condition: 'VA-ECMO veya Yüksek Akımlı CRRT',
    mechanism:
      'VA-ECMO venöz drenaj kanülü soğuk bolusu hastanın akciğerine gitmeden devreye çeker. Yüksek akımlı CRRT ise kan hattında ısı kaybı yaratır.',
    artifact: 'VA-ECMO’da TPTD tamamen GEÇERSİZDİR. CRRT açıkken ölçülen CO/EVLWI hafif sapabilir (özellikle aynı hatta enjeksiyon yapılırsa).',
    mitigation:
      'VA-ECMO’da TPTD uygulamayın. CRRT sırasında asla diyaliz kateter lümeninden bolus vermeyin; gerekiyorsa ölçüm anında kısa süreli kan akımı durdurma protokolünü uygulayın.',
    severity: 'high',
  },
  {
    condition: 'Radyal Arter Termistör Kullanımı veya Hızlı Vazopresör Değişimi',
    mechanism:
      'Periferik dar arterde uzun yolda termal sinyal söner/yayılır. Ayrıca sürekli nabız konturu (PCCO) bazal arter kompliyansına bağlıdır.',
    artifact: 'Radyal arterde DSt/EVLWI güvenilmezdir. Vazopleji derinleşince kalibresiz nabız konturu CO’yu yanlış tahmin eder.',
    mitigation:
      'Daima femoral (alternatif brakiyal/aksiller) termistör kateter kullanın. Her 4–8 saatte veya noradrenalin/tonus belirgin değiştiğinde 3’lü soğuk salin ile REKALİBRE edin.',
    severity: 'high',
  },
];

const COMPARISON_ROWS = [
  {
    feature: 'İnvazivlik & Kateter',
    tptd: 'Santral Ven (İJV/SC) + Femoral (veya Aksiller) Termistörlü Arter Kateteri',
    pac: 'Santral Ven Introducer + Sağ Kalpten Pulmoner Artere Yüzdürülen Kateter (Swan-Ganz)',
    uncalibrated: 'Yalnızca Standart Radyal veya Femoral Arter Hattı (Ek santral hat şart değil)',
  },
  {
    feature: 'Kardiyak Debi (CO) Doğruluğu',
    tptd: 'Yüksek (Altın standart kalibre); 15–25 sn eğri solunum döngüsünden az etkilenir',
    pac: 'Altın standart; ancak triküspit yetmezliği (TR) ve solunum fazından etkilenir',
    uncalibrated: 'Normotonik cerrahide iyi trend; ağır septik vazoplejide mutlak değer sapar',
  },
  {
    feature: 'Önyük & Akciğer Ödemi Ölçümü',
    tptd: 'Volümetrik Önyük (GEDVI) + Doğrudan Akciğer Suyu (EVLWI) + Permeabilite (PVPI)',
    pac: 'Basınç Bazlı (CVP, PAOP); PEEP/İAB/kompliyanstan etkilenir; EVLWI ölçemez',
    uncalibrated: 'Yalnızca Dinamik İndeksler (SVV/PPV); EVLWI ve GEDVI ölçemez',
  },
  {
    feature: 'Pulmoner Hipertansiyon & Sağ Kalp',
    tptd: 'PAP ve PVR doğrudan ölçmez (İzole RV yetmezliğinde EKO ile birleştirilmeli)',
    pac: 'Doğrudan PAP, PAOP, PVR ve SvO_{2} ölçer (RV/PHT cerrahisinde vazgeçilmez)',
    uncalibrated: 'Ölçemez',
  },
  {
    feature: 'Sürekli Takip & Kalibrasyon',
    tptd: 'Başlangıç bolusu ile kalibreli sürekli PCCO + SVV/PPV (4–8 saatte bir rekalibrasyon)',
    pac: 'Termal filamentli PAC ile yarı-sürekli CCO; standart PAC’ta aralıklı bolus',
    uncalibrated: 'Otomatik sürekli kalibresiz tahmin (dış kalibrasyon gerektirmez)',
  },
];

const REFERENCES = [
  {
    authors: 'Sakka SG, Rühl CC, Pfeiffer UJ, Beale R, McLuckie A, Reinhart K, Meier-Hellmann A.',
    title: 'Assessment of cardiac preload and extravascular lung water by single transpulmonary thermodilution.',
    journal: 'Intensive Care Med. 2000;26(2):180–187.',
    note: 'ITBV = 1,25 × GEDV − 28,4 mL ilişkisi ve tek indikatörlü TPTD hacimlerinin validasyonu.',
  },
  {
    authors: 'Sakka SG, Klein M, Reinhart K, Meier-Hellmann A.',
    title: 'Prognostic value of extravascular lung water in critically ill patients.',
    journal: 'Chest. 2002;122(6):2080–2086.',
    note: 'Yoğun bakım hastalarında artmış EVLWI’nin bağımsız mortalite belirleyicisi olduğunu gösteren dönüm noktası çalışma.',
  },
  {
    authors: 'Monnet X, Anguel N, Osman D, Hamzaoui O, Richard C, Teboul JL.',
    title: 'Assessing pulmonary permeability by transpulmonary thermodilution allows differentiation of hydrostatic pulmonary edema from ALI/ARDS.',
    journal: 'Intensive Care Med. 2007;33(3):448–453.',
    note: 'PVPI ≥ 3,0 eşiğinin ARDS (permeabilite ödemi) ile kardiyojenik (hidrostatik) ödem ayrımındaki tanısal gücü.',
  },
  {
    authors: 'Jozwiak M, Silva S, Persichini R, Anguel N, Osman D, Richard C, Teboul JL, Monnet X.',
    title: 'Extravascular lung water is an independent prognostic factor in patients with acute respiratory distress syndrome.',
    journal: 'Crit Care Med. 2013;41(2):472–480.',
    note: 'ARDS hastalarında maksimum EVLWI (ve PBW indekslemesinin önemi) ile PVPI’nin mortalite ile bağımsız ilişkisi.',
  },
  {
    authors: 'Cecconi M, De Backer D, Antonelli M, Beale R, Bakker J, Hofer C, et al.',
    title: 'Consensus on circulatory shock and hemodynamic monitoring. Task force of the European Society of Intensive Care Medicine (ESICM).',
    journal: 'Intensive Care Med. 2014;40(12):1795–1815.',
    note: 'Kompleks şok ve eşlik eden ARDS durumlarında ileri hemodinamik monitörizasyon (TPTD veya PAC) önerileri.',
  },
  {
    authors: 'Gropper MA, Eriksson LI, Fleisher LA, Wiener-Kronish JP, Cohen NH, Leslie K (Eds.).',
    title: "Miller's Anesthesia (9th Edition) — Cardiovascular Monitoring & Hemodynamic Physiology Chapters.",
    journal: 'Elsevier; 2020.',
    note: 'Stewart–Hamilton denklemi, termodilüsyon fiziği ve perioperatif kalibrasyon standartları.',
  },
];

export const TranspulmonaryThermodilutionModule: React.FC<TranspulmonaryThermodilutionModuleProps> = ({
  isDark,
}) => {
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>('all');

  const showSection = (id: Exclude<SectionFilter, 'all'>) =>
    sectionFilter === 'all' || sectionFilter === id;

  return (
    <div className="space-y-8">
      {/* Header Summary Banner */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 space-y-4 ${
          isDark
            ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 border-slate-800'
            : 'bg-gradient-to-br from-white via-slate-50/70 to-cyan-50/40 border-slate-200'
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              <ThermometerSnowflake className="w-4 h-4" />
              <span>İleri Hemodinamik Monitörizasyon · PiCCO / VolumeView</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Transpulmoner Termodilüsyon (TPTD) Yöntemleri
            </h2>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Hastanın santral toplardamarından bilinen hacim ve soğuklukta serum fizyolojik verip, bu soğukluğun
              <strong> sağ kalp, akciğerler ve sol kalpten geçtikten sonra</strong> kasık veya kol atardamarındaki ısı
              algılayıcısına (termistör) nasıl ulaştığını inceleyen ileri hemodinamik monitörizasyon yöntemidir. Bu tek
              ölçümle kalbin pompalama gücü, kalp boşluklarının gerçek doluluk hacmi ve akciğerlerde biriken ödem suyu
              yatak başında doğrudan ölçülebilir.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
            {[
              { k: 'GEDVI', v: '680–800', u: 'mL/m^{2} (Önyük)' },
              { k: 'EVLWI', v: '3,0–7,0', u: 'mL/kg PBW (Ödem)' },
              { k: 'PVPI', v: '1,0–3,0', u: 'ARDS ≥ 3,0' },
              { k: 'GEF / CFI', v: '%25–35', u: '4,5–6,5 dk^{-1}' },
            ].map((item) => (
              <div
                key={item.k}
                className={`px-3 py-2 rounded-xl border text-center ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  <MedicalText text={item.k} />
                </div>
                <div className={`text-sm font-mono tabular-nums font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.v}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  <MedicalText text={item.u} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Section Filter (Defaults to 'all' — continuous flow) */}
        <div className={`pt-3 border-t flex flex-wrap items-center gap-1.5 ${isDark ? 'border-slate-800' : 'border-slate-200/80'}`}>
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Bölüm Filtresi:</span>
          {(
            [
              { id: 'all', label: 'Tümü (Düz Okuma)' },
              { id: 'intro', label: '00 · Tanım, Mantık & Sözlük' },
              { id: 'physics', label: '01 · Fizik & Termodilüsyon Eğrisi' },
              { id: 'parameters', label: '02 · Volümetrik Parametreler' },
              { id: 'algorithms', label: '03 · Tedavi Karar Ağacı & ROSE' },
              { id: 'pitfalls', label: '04 · Protokol, Tuzaklar & Sınav' },
              { id: 'references', label: '05 · Literatür' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSectionFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                sectionFilter === tab.id
                  ? isDark
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                    : 'bg-cyan-50 border-cyan-400 text-cyan-900'
                  : isDark
                    ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 00. TANIM, KLİNİK MANTIK, SİSTEMLER VE TEMEL KAVRAMLAR SÖZLÜĞÜ       */}
      {/* =================================================================== */}
      {showSection('intro') && (
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Bölüm 00 · Giriş, Tanım ve Temel Kavramlar
            </div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Transpulmoner Termodilüsyon Nedir? Klinik İşlevi ve Temel Kavramlar
            </h3>
          </div>

          {/* A. Word-by-word definition + Clinical need */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                1. “Termodilüsyon” Ne Demektir?
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>Isı seyreltmesi</strong> demektir. Vücut sıcaklığındaki kana bilinen hacim ve sıcaklıkta
                <strong> soğuk serum fizyolojik</strong> (indikatör) verildiğinde, kan geçici olarak soğur. Bu soğukluğun
                aşağı akımda bir sıcaklık sensörü (termistör) tarafından ne kadar sürede ve ne şiddette algılandığı
                ölçülerek <strong>dakikadaki kan akımı (kardiyak debi)</strong> hesaplanır.
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                2. “Transpulmoner” Ne Demektir?
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <strong>“Akciğerlerden geçerek”</strong> demektir. Klasik Pulmoner Arter Kateteri (Swan-Ganz) soğuk
                bolusu yalnızca sağ kalp içinde (sağ atriyum → pulmoner arter) ölçer. <strong>Transpulmoner</strong>{' '}
                yöntemde ise soğuk sıvı <strong>sağ kalp → akciğer dolaşımı → sol kalp → büyük arter (femoral/aksiller)</strong>{' '}
                yolunun tamamını kat eder. Böylece hem kalbe kateter ilerletmeye gerek kalmaz hem de akciğer dokusu ölçüm
                alanına girer.
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                3. Klinikte Hangi Sorunu Çözer?
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Ağır septik şok, ARDS, majör cerrahi veya yanık hastalarında klasik basınç ölçümleri (CVP, PAOP) mekanik
                ventilasyon ve PEEP yüzünden yanıltıcıdır; akciğer grafisi ise ödemi geç gösterir. TPTD tek bir soğuk
                enjeksiyonla <strong>kalp debisi</strong>, <strong>gerçek doluluk hacmi</strong>,{' '}
                <strong>akciğerdeki ödem miktarı</strong> ve <strong>ödemin nedenini</strong> aynı anda ortaya koyar.
              </p>
            </div>
          </div>

          {/* B. What are PiCCO and VolumeView? (Two-step Hybrid Architecture) */}
          <div
            className={`rounded-xl border p-4 sm:p-5 space-y-3 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Klinik Platformlar: PiCCO ve VolumeView Nasıl Çalışır? (2 Aşamalı Hibrit Sistem)
              </h4>
              <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                Aralıklı Kalibrasyon + Sürekli Nabız Konturu
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Klinikte TPTD prensibiyle çalışan iki yaygın ticari platform vardır: <strong>PiCCO</strong> (Pulsion /
              Getinge) ve <strong>VolumeView</strong> (Edwards EV1000 / HemoSphere). Her ikisi de standart bir santral
              venöz kateter ile termistörlü özel bir femoral (veya aksiller) arter kateterini birleştirir ve{' '}
              <strong>iki tamamlayıcı aşamada</strong> çalışır:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className={`rounded-lg border p-3.5 space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                  Aşama 1 · Aralıklı Soğuk Salin Termodilüsyonu (Kalibrasyon & Hacimler)
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Santral venden arka arkaya 3 kez soğuk salin verilir. Cihaz bu eğrilerden kesin kardiyak debiyi (CO),
                  kalbin doluluk hacmini (GEDVI), akciğer suyunu (EVLWI) ve geçirgenliği (PVPI) hesaplar; aynı anda
                  arteriyel basınç dalgasını kalibre eder.
                </p>
              </div>
              <div className={`rounded-lg border p-3.5 space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Aşama 2 · Sürekli Nabız Kontur Analizi (Atım-Atım Takip)
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Kalibrasyon tamamlandıktan sonra soğuk sıvı vermeye gerek kalmadan, aynı arter hattındaki basınç
                  dalgasından her kalp atımında sürekli debi (PCCO), atım hacmi (SV) ve sıvı yanıtlılığı (SVV/PPV)
                  izlenir. <em>Teknik fark:</em> PiCCO akciğer hacmi için yalnızca iniş eğimini (DSt), VolumeView ise
                  ek olarak çıkış/iniş maksimum eğim oranını (<MedicalText text="S_{1}/S_{2}" />) kullanır.
                </p>
              </div>
            </div>
          </div>

          {/* C. Glossary */}
          <div className="space-y-3">
            <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Temel Kısaltmalar ve Kavramlar Sözlüğü
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GLOSSARY_GROUPS.map((group) => (
                <div
                  key={group.title}
                  className={`rounded-xl border p-4 space-y-3 ${
                    isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className={`pb-2 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {group.title}
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {group.subtitle}
                    </div>
                  </div>
                  <dl className="space-y-2.5">
                    {group.items.map((item) => (
                      <div key={item.symbol} className="space-y-0.5">
                        <dt className="flex flex-wrap items-baseline gap-1.5 text-xs">
                          <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                            <MedicalText text={item.symbol} />
                          </span>
                          <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                            — {item.fullTr}
                          </span>
                        </dt>
                        <dd className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          <MedicalText text={item.meaning} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* 01. TEMEL FİZİK, ANATOMİK KURULUM VE TERMODİLÜSYON EĞRİSİ ANALİZİ   */}
      {/* =================================================================== */}
      {showSection('physics') && (
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Bölüm 01 · Fizik & Termodilüsyon Matematiği
            </div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Tek Bir Soğuk Enjeksiyondan Debi, Kalp Hacmi ve Akciğer Suyu Ayrımı
            </h3>
          </div>

          {/* 3-Card Intuitive Physics Explainer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-cyan-50/60 border-cyan-200'
              }`}
            >
              <div className="text-xs font-bold text-cyan-700 dark:text-cyan-300">
                Mantık A · Nehir Analojisi (Stewart–Hamilton → CO)
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Hızlı akan bir nehre soğuk su dökerseniz soğukluk termometrenin önünden hızla geçip gider; sıcaklık
                eğrisi dar ve <strong>küçük alanlı</strong> olur (<strong>CO YÜKSEK</strong>). Yavaş akan nehre
                dökerseniz soğukluk sensörde uzun süre kalır ve <strong>eğri genişler</strong> (<strong>CO DÜŞÜK</strong>).
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50/60 border-indigo-200'
              }`}
            >
              <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                Mantık B · Sıralı Havuzlar Prensibi (MTt &amp; DSt)
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Soğuk sıvı birbirine bağlı kaplardan (sağ kalp → akciğer → sol kalp) geçerken, <strong>ortalama geçiş
                süresi (MTt)</strong> tüm kapların toplam hacmini (<strong>ITTV</strong>) verir. Eğrinin kuyruğundaki{' '}
                <strong>eksponansiyel boşalma süresi (DSt)</strong> ise her zaman serideki en büyük kap olan{' '}
                <strong>akciğerleri (PTV)</strong> yansıtır.
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200'
              }`}
            >
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Mantık C · Isı Damar Dışına Çıkar, Kan Çıkmaz (EVLW Sırrı)
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Akciğerde kan damar içinde kalır; fakat <strong>soğukluk (ısı enerjisi) kapiller duvardan kolayca
                difüze olarak</strong> interstisyum ve alveollerdeki ödem sıvısını da soğutur. Bu yüzden akciğerin
                termal hacminden (PTV) kan hacmini (PBV) çıkardığımızda elimizde doğrudan <strong>akciğer suyu
                (EVLW)</strong> kalır!
              </p>
            </div>
          </div>

          {/* Stacked Full-Width SVG Diagrams */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* PANEL A: Anatomical Flow & Mixing Compartments */}
            <div
              className={`rounded-xl border p-4 sm:p-5 ${
                isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Şekil 1A · TPTD Anatomik Akım Yolu ve Karışım Hacimleri (SVK → Akciğer → Femoral Termistör)
                </div>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400">
                  15–20 mL Soğuk Salin (&lt; 8 °C)
                </span>
              </div>

              <svg
                viewBox="0 0 820 220"
                className="w-full h-auto"
                role="img"
                aria-label="Transpulmoner termodilüsyon anatomik akış ve karışım kompartmanları şeması"
              >
                {/* Background guide bands */}
                <rect
                  x="16"
                  y="14"
                  width="788"
                  height="192"
                  rx="12"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  stroke={isDark ? '#1e293b' : '#e2e8f0'}
                />

                {/* Compartment 1: CVC Injection */}
                <rect
                  x="32"
                  y="52"
                  width="124"
                  height="104"
                  rx="10"
                  fill={isDark ? '#083344' : '#ecfeff'}
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                />
                <text
                  x="94"
                  y="74"
                  textAnchor="middle"
                  className="text-[11px] font-bold"
                  fill={isDark ? '#67e8f9' : '#0e7490'}
                >
                  Santral Ven (SVK)
                </text>
                <text
                  x="94"
                  y="93"
                  textAnchor="middle"
                  className="text-[10px]"
                  fill={isDark ? '#cbd5e1' : '#334155'}
                >
                  İJV / Subklavyen
                </text>
                <text
                  x="94"
                  y="112"
                  textAnchor="middle"
                  className="text-[10px] font-mono font-bold"
                  fill={isDark ? '#a5f3fc' : '#155e75'}
                >
                  Bolus T
                  <tspan dy="2" fontSize="7.5">
                    0
                  </tspan>
                  <tspan dy="-2"> (Sıcaklık)</tspan>
                </text>
                <text
                  x="94"
                  y="138"
                  textAnchor="middle"
                  className="text-[9.5px]"
                  fill={isDark ? '#94a3b8' : '#64748b'}
                >
                  Hızlı &lt; 7 sn enjeksiyon
                </text>

                {/* Arrow 1 */}
                <path d="M 158 104 L 184 104" stroke="#06b6d4" strokeWidth="2.5" />
                <polygon points="184,99 194,104 184,109" fill="#06b6d4" />

                {/* Compartment 2: Right Heart (RA + RV) */}
                <rect
                  x="196"
                  y="52"
                  width="124"
                  height="104"
                  rx="10"
                  fill={isDark ? '#1e1b4b' : '#eef2ff'}
                  stroke="#6366f1"
                  strokeWidth="1.5"
                />
                <text
                  x="258"
                  y="76"
                  textAnchor="middle"
                  className="text-[11px] font-bold"
                  fill={isDark ? '#a5b4fc' : '#4338ca'}
                >
                  Sağ Kalp (RA + RV)
                </text>
                <text
                  x="258"
                  y="98"
                  textAnchor="middle"
                  className="text-[10px] font-mono"
                  fill={isDark ? '#e2e8f0' : '#1e293b'}
                >
                  RAEDV + RVEDV
                </text>
                <text
                  x="258"
                  y="120"
                  textAnchor="middle"
                  className="text-[10px]"
                  fill={isDark ? '#94a3b8' : '#64748b'}
                >
                  GEDV’nin ~yarısı
                </text>
                <text
                  x="258"
                  y="140"
                  textAnchor="middle"
                  className="text-[9.5px] font-mono"
                  fill={isDark ? '#818cf8' : '#4f46e5'}
                >
                  (Önyük Havuzu I)
                </text>

                {/* Arrow 2 */}
                <path d="M 322 104 L 348 104" stroke="#6366f1" strokeWidth="2.5" />
                <polygon points="348,99 358,104 348,109" fill="#6366f1" />

                {/* Compartment 3: Lungs (PBV + EVLW = PTV) */}
                <rect
                  x="360"
                  y="36"
                  width="166"
                  height="136"
                  rx="12"
                  fill={isDark ? '#064e3b' : '#ecfdf5'}
                  stroke="#10b981"
                  strokeWidth="2"
                />
                <text
                  x="443"
                  y="58"
                  textAnchor="middle"
                  className="text-[11.5px] font-bold"
                  fill={isDark ? '#6ee7b7' : '#047857'}
                >
                  Akciğer Kompartmanı (PTV)
                </text>
                <rect
                  x="374"
                  y="68"
                  width="138"
                  height="38"
                  rx="6"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  stroke={isDark ? '#34d399' : '#6ee7b7'}
                />
                <text
                  x="443"
                  y="85"
                  textAnchor="middle"
                  className="text-[10px] font-bold font-mono"
                  fill={isDark ? '#6ee7b7' : '#065f46'}
                >
                  PBV (Pulmoner Kan Hacmi)
                </text>
                <text
                  x="443"
                  y="99"
                  textAnchor="middle"
                  className="text-[9.5px]"
                  fill={isDark ? '#94a3b8' : '#475569'}
                >
                  İntravasküler hacim (~0,25×GEDV)
                </text>
                <rect
                  x="374"
                  y="114"
                  width="138"
                  height="46"
                  rx="6"
                  fill={isDark ? '#451a03' : '#fffbeb'}
                  stroke="#f59e0b"
                  strokeDasharray="3 2"
                />
                <text
                  x="443"
                  y="132"
                  textAnchor="middle"
                  className="text-[10px] font-bold font-mono"
                  fill={isDark ? '#fcd34d' : '#b45309'}
                >
                  EVLW (Ekstravasküler Su)
                </text>
                <text
                  x="443"
                  y="148"
                  textAnchor="middle"
                  className="text-[9px]"
                  fill={isDark ? '#fde68a' : '#78350f'}
                >
                  Soğuk ısı alveol/interstisyuma yayılır!
                </text>

                {/* Arrow 3 */}
                <path d="M 528 104 L 554 104" stroke="#10b981" strokeWidth="2.5" />
                <polygon points="554,99 564,104 554,109" fill="#10b981" />

                {/* Compartment 4: Left Heart (LA + LV) */}
                <rect
                  x="566"
                  y="52"
                  width="110"
                  height="104"
                  rx="10"
                  fill={isDark ? '#3b0764' : '#faf5ff'}
                  stroke="#a855f7"
                  strokeWidth="1.5"
                />
                <text
                  x="621"
                  y="76"
                  textAnchor="middle"
                  className="text-[11px] font-bold"
                  fill={isDark ? '#d8b4fe' : '#7e22ce'}
                >
                  Sol Kalp (LA+LV)
                </text>
                <text
                  x="621"
                  y="98"
                  textAnchor="middle"
                  className="text-[10px] font-mono"
                  fill={isDark ? '#e2e8f0' : '#1e293b'}
                >
                  LAEDV + LVEDV
                </text>
                <text
                  x="621"
                  y="120"
                  textAnchor="middle"
                  className="text-[10px]"
                  fill={isDark ? '#94a3b8' : '#64748b'}
                >
                  GEDV’nin diğer yarısı
                </text>
                <text
                  x="621"
                  y="140"
                  textAnchor="middle"
                  className="text-[9.5px] font-mono"
                  fill={isDark ? '#c084fc' : '#9333ea'}
                >
                  (Önyük Havuzu II)
                </text>

                {/* Arrow 4 */}
                <path d="M 678 104 L 700 104" stroke="#e11d48" strokeWidth="2.5" />
                <polygon points="700,99 710,104 700,109" fill="#e11d48" />

                {/* Compartment 5: Femoral Thermistor */}
                <rect
                  x="712"
                  y="52"
                  width="78"
                  height="104"
                  rx="10"
                  fill={isDark ? '#4c0519' : '#fff1f2'}
                  stroke="#e11d48"
                  strokeWidth="1.5"
                />
                <text
                  x="751"
                  y="78"
                  textAnchor="middle"
                  className="text-[10.5px] font-bold"
                  fill={isDark ? '#fda4af' : '#be123c'}
                >
                  Femoral
                </text>
                <text
                  x="751"
                  y="92"
                  textAnchor="middle"
                  className="text-[10.5px] font-bold"
                  fill={isDark ? '#fda4af' : '#be123c'}
                >
                  Termistör
                </text>
                <text
                  x="751"
                  y="116"
                  textAnchor="middle"
                  className="text-[9.5px] font-mono"
                  fill={isDark ? '#fecdd3' : '#881337'}
                >
                  ΔT
                  <tspan dy="2" fontSize="7.5">
                    b
                  </tspan>
                  <tspan dy="-2">(t) &amp; BP</tspan>
                </text>
                <text
                  x="751"
                  y="140"
                  textAnchor="middle"
                  className="text-[8.5px]"
                  fill={isDark ? '#fda4af' : '#9f1239'}
                >
                  (Radyal uygun değil!)
                </text>

                {/* Bottom summary bracket */}
                <text
                  x="410"
                  y="194"
                  textAnchor="middle"
                  className="text-[10.5px] font-mono font-semibold"
                  fill={isDark ? '#94a3b8' : '#475569'}
                >
                  ITTV (CO × MTt) = [Sağ Kalp + Sol Kalp (GEDV)] + [Pulmoner Kan (PBV) + Ekstravasküler Su (EVLW)]
                </text>
              </svg>
            </div>

            {/* PANEL B: Transpulmonary Thermodilution Curve */}
            <div
              className={`rounded-xl border p-4 sm:p-5 ${
                isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`text-xs font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Şekil 1B · Transpulmoner Termodilüsyon Eğrisi (<MedicalText text="ΔT_{b}" /> vs. Zaman) ve Zaman Sabitleri
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  Eğri Altı Alan → CO · Eğim → PTV
                </span>
              </div>

              <svg
                viewBox="0 0 820 265"
                className="w-full h-auto"
                role="img"
                aria-label="Transpulmoner termodilüsyon sıcaklık değişimi ve zaman eğrisi"
              >
                <rect
                  x="16"
                  y="10"
                  width="788"
                  height="245"
                  rx="12"
                  fill={isDark ? '#0f172a' : '#ffffff'}
                  stroke={isDark ? '#1e293b' : '#e2e8f0'}
                />

                {/* Axes */}
                <line x1="78" y1="210" x2="770" y2="210" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.5" />
                <line x1="78" y1="30" x2="78" y2="210" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.5" />

                {/* Y-axis label */}
                <text
                  x="42"
                  y="120"
                  textAnchor="middle"
                  transform="rotate(-90 42 120)"
                  className="text-[10.5px] font-mono font-bold"
                  fill={isDark ? '#cbd5e1' : '#334155'}
                >
                  Kan Sıcaklık Düşüşü (−ΔT, °C)
                </text>

                {/* X-axis label */}
                <text
                  x="742"
                  y="232"
                  textAnchor="end"
                  className="text-[10.5px] font-mono font-bold"
                  fill={isDark ? '#cbd5e1' : '#334155'}
                >
                  Zaman (saniye · ~20–25 sn)
                </text>

                {/* Shaded Area under curve = CO */}
                <path
                  d="M 130 210 C 165 208, 195 150, 232 68 C 254 34, 278 44, 315 88 C 370 152, 460 192, 650 207 L 650 210 Z"
                  fill={isDark ? 'rgba(6, 182, 212, 0.16)' : 'rgba(6, 182, 212, 0.14)'}
                />

                {/* Main Thermodilution Curve */}
                <path
                  d="M 80 210 L 130 210 C 165 208, 195 150, 232 68 C 254 34, 278 44, 315 88 C 370 152, 460 192, 650 207 L 740 209"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3"
                />

                {/* Appearance Time AT */}
                <line x1="80" y1="224" x2="130" y2="224" stroke="#64748b" strokeWidth="1.5" />
                <circle cx="80" cy="210" r="3.5" fill="#94a3b8" />
                <text x="80" y="241" textAnchor="middle" className="text-[9.5px] font-mono" fill={isDark ? '#94a3b8' : '#475569'}>
                  t
                  <tspan dy="2" fontSize="7">
                    0
                  </tspan>
                  <tspan dy="-2"> (Enjeksiyon)</tspan>
                </text>
                <text x="135" y="241" textAnchor="middle" className="text-[9.5px] font-mono" fill={isDark ? '#cbd5e1' : '#334155'}>
                  AT (Görünüm)
                </text>

                {/* MTt vertical marker */}
                <line
                  x1="322"
                  y1="42"
                  x2="322"
                  y2="210"
                  stroke="#a855f7"
                  strokeWidth="1.8"
                  strokeDasharray="4 3"
                />
                <rect
                  x="248"
                  y="24"
                  width="148"
                  height="22"
                  rx="6"
                  fill={isDark ? '#3b0764' : '#f3e8ff'}
                  stroke="#a855f7"
                />
                <text
                  x="322"
                  y="39"
                  textAnchor="middle"
                  className="text-[10px] font-mono font-bold"
                  fill={isDark ? '#e9d5ff' : '#6b21a8'}
                >
                  MTt → ITTV = CO × MTt
                </text>

                {/* DSt segment highlight (85% down to 45% of peak) */}
                <line x1="305" y1="76" x2="418" y2="162" stroke="#f59e0b" strokeWidth="3.2" />
                <circle cx="305" cy="76" r="4" fill="#f59e0b" />
                <circle cx="418" cy="162" r="4" fill="#f59e0b" />

                <line x1="305" y1="76" x2="305" y2="210" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <line x1="418" y1="162" x2="418" y2="210" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />

                <rect
                  x="438"
                  y="74"
                  width="245"
                  height="52"
                  rx="8"
                  fill={isDark ? '#451a03' : '#fffbeb'}
                  stroke="#f59e0b"
                />
                <text
                  x="560"
                  y="94"
                  textAnchor="middle"
                  className="text-[10.5px] font-mono font-bold"
                  fill={isDark ? '#fcd34d' : '#92400e'}
                >
                  DSt (Eksponansiyel Azalma Zaman Sabiti)
                </text>
                <text
                  x="560"
                  y="112"
                  textAnchor="middle"
                  className="text-[10px] font-mono"
                  fill={isDark ? '#fde68a' : '#78350f'}
                >
                  %85 → %45 iniş eğimi → PTV = CO × DSt
                </text>

                {/* Area callout inside curve */}
                <text
                  x="245"
                  y="156"
                  textAnchor="middle"
                  className="text-[11px] font-mono font-bold"
                  fill={isDark ? '#67e8f9' : '#0e7490'}
                >
                  Alan = ∫ ΔT
                  <tspan dy="2" fontSize="8">
                    b
                  </tspan>
                  <tspan dy="-2"> dt</tspan>
                </text>
                <text
                  x="245"
                  y="174"
                  textAnchor="middle"
                  className="text-[10px] font-semibold"
                  fill={isDark ? '#a5f3fc' : '#155e75'}
                >
                  (CO ile TERS orantılı)
                </text>
              </svg>
            </div>
          </div>

          {/* Mathematical Chain Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                step: '1 · Toplam Termal Hacim',
                formula: 'ITTV = CO × MTt',
                explain:
                  'Enjeksiyon noktasından termistöre kadar olan tüm karıştırma hacimlerini (4 kalp odacığı + PBV + EVLW) içerir.',
              },
              {
                step: '2 · En Büyük Karıştırma Havuzu',
                formula: 'PTV = CO × DSt = PBV + EVLW',
                explain:
                  'Seri haldeki odacıklarda eksponansiyel azalma eğimi (DSt) en büyük kompartman olan akciğeri (Pulmoner Termal Hacim) yansıtır.',
              },
              {
                step: '3 · Global Diyastol Sonu Hacmi',
                formula: 'GEDV = ITTV − PTV',
                explain:
                  'Toplam termal hacimden akciğer termal hacmi çıkarıldığında geriye 4 kalp odacığının diyastol sonu kan hacmi kalır.',
              },
              {
                step: '4 · İntratorasik Kan & Akciğer Suyu',
                formula: 'ITBV = 1,25 × GEDV  |  EVLW = ITTV − ITBV',
                explain:
                  'Sakka eşitliği ile PBV ayrıştırılır; böylece interstisyel ve alveoler ödem (EVLW) yatak başında doğrudan hesaplanır.',
              },
            ].map((card) => (
              <div
                key={card.step}
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  {card.step}
                </div>
                <div
                  className={`text-xs sm:text-sm font-mono font-bold px-2.5 py-1.5 rounded-lg border ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <MedicalText text={card.formula} />
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {card.explain}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* 02. VOLÜMETRİK PARAMETRELER VE SÜREKLİ NABIZ KONTUR KALİBRASYONU   */}
      {/* =================================================================== */}
      {showSection('parameters') && (
        <section className="space-y-5">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Bölüm 02 · Parametreler & İndeksleme Kuralları
            </div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              TPTD Volümetrik Parametreleri, Referans Aralıklar ve İndeksleme Tuzağı (BSA vs. PBW)
            </h3>
            <p className={`text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Bölüm 01’de elde edilen mutlak hacimlerin (ör. mL cinsinden GEDV veya EVLW) farklı boy ve kilodaki
              hastalarda karşılaştırılabilmesi için hastanın vücut ölçülerine göre <strong>indekslenmesi</strong> gerekir.
              Klinikte ve sınavlarda en sık yapılan hata indeksleme kuralını karıştırmaktır: Kalp boşlukları ve debi
              <strong> vücut yüzey alanına (<MedicalText text="BSA, m^{2}" />)</strong> bölünürken, akciğer büyüklüğü
              kilo ile değil boy ile orantılı olduğu için{' '}
              <strong className="text-amber-600 dark:text-amber-400">
                EVLWI mutlaka Öngörülen Vücut Ağırlığına (PBW, kg)
              </strong>{' '}
              bölünmelidir.
            </p>
          </div>

          <div
            className={`rounded-xl border overflow-x-auto ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={`border-b ${
                    isDark ? 'border-slate-800 bg-slate-900/90 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <th className="py-3 px-4 font-semibold">Parametre</th>
                  <th className="py-3 px-4 font-semibold">Formül / Temel</th>
                  <th className="py-3 px-4 font-semibold">Normal Aralık</th>
                  <th className="py-3 px-4 font-semibold">Kritik Eşik & İndeks</th>
                  <th className="py-3 px-4 font-semibold">Klinik Anlam & Sınav Notu</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                {PARAMETER_ROWS.map((row) => (
                  <tr key={row.symbol} className="align-top">
                    <td className="py-3.5 px-4 min-w-[140px]">
                      <div className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                        <MedicalText text={row.symbol} />
                      </div>
                      <div className={`text-[11px] font-semibold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {row.name}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] min-w-[175px]">
                      <MedicalText text={row.formula} />
                    </td>
                    <td className="py-3.5 px-4 font-mono tabular-nums font-semibold whitespace-nowrap">
                      <MedicalText text={row.normalRange} />
                    </td>
                    <td className="py-3.5 px-4 min-w-[180px]">
                      <div className="font-mono font-semibold text-amber-700 dark:text-amber-300">
                        <MedicalText text={row.criticalValue} />
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        İndeks: <MedicalText text={row.indexRule} />
                      </div>
                    </td>
                    <td className="py-3.5 px-4 leading-relaxed min-w-[240px]">
                      <MedicalText text={row.clinicalNote} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pulse Contour Calibration & Static vs Dynamic Warning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 dark:text-cyan-400">
                <Gauge className="w-4 h-4" />
                <span>Sürekli Nabız Kontur Kalibrasyonu (PCCO / VolumeView)</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Başlangıçta yapılan 3’lü soğuk salin bolusu, arteriyel dalga formunun sistolik eğri altı alanını aortik
                empedans ve kompliyans faktörüyle kalibre eder. Bu sayede cihaz atım-atım sürekli <strong>PCCO, SV, SVV,
                PPV ve dPmax</strong> değerlerini üretir.
              </p>
              <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-cyan-200/90' : 'text-cyan-900'}`}>
                <strong>Rekalibrasyon Kuralı:</strong> Stabil hastada <strong>4–8 saatte bir</strong>, ancak vazopresör
                dozu değiştiğinde, akut kanama/sıvı şiftinde veya sepsis vazoplejisi derinleştiğinde <strong>derhal
                yeniden termodilüsyon kalibrasyonu</strong> yapılmalıdır.
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-amber-950/20 border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-300">
                <AlertTriangle className="w-4 h-4" />
                <span>Kritik Kavram: GEDVI Sıvı Yanıtlılığını Tek Başına Öngöremez!</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-amber-100/85' : 'text-amber-950/85'}`}>
                GEDVI, basınç bazlı statik göstergelerden (CVP, PAOP) çok daha güvenilir bir <strong>önyük</strong>{' '}
                ölçümüdür; ancak hastanın Frank–Starling eğrisinin dik kolunda mı yoksa platosunda mı olduğunu tek
                sayıdan kesin söyleyemez (ör. normal GEDVI 720 ile bir sporcu yanıtlı, ağır KKY hastası yanıtsızdır).
              </p>
              <p className={`text-xs leading-relaxed font-medium ${isDark ? 'text-amber-200' : 'text-amber-900'}`}>
                <strong>Doğru Yatak Başı Kombinasyon:</strong> Sıvı verilip verilmeyeceğine{' '}
                <strong>dinamik testlerle (PPV, SVV, PLR)</strong>; verilen sıvının akciğere kaçıp kaçmayacağına (sıvı
                toleransı) ise <strong>EVLWI + PVPI</strong> ile karar verilir.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* 03. TPTD SONUÇLARINA GÖRE TEDAVİ KARAR AĞACI VE ROSE MODELİ         */}
      {/* =================================================================== */}
      {showSection('algorithms') && (
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Bölüm 03 · Tedavi Karar Ağacı &amp; Faz Bazlı Sıvı Yönetimi (PiCCO / VolumeView)
            </div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Termodilüsyon Sonuçlarına Göre Yatak Başı Tedavi Karar Ağacı ve ROSE Sıvı Yönetimi
            </h3>
            <p className={`text-sm leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              TPTD ölçümü yalnızca tanı koymak için değil, sistematik hedefe yönelik tedavi (GDT) yürütmek için
              kullanılır. Klinik karar akışı dört ardışık basamağı izler: <strong>(1) Akım (<MedicalText text="CI" />)</strong>{' '}
              → <strong>(2) Volümetrik Önyük (<MedicalText text="GEDVI" />)</strong>{' '}
              → <strong>(3) Akciğer Sıvı Toleransı (<MedicalText text="EVLWI" />)</strong>{' '}
              → <strong>(4) Ödem Mekanizması / Vasküler Direnç (<MedicalText text="PVPI" /> &amp; <MedicalText text="SVRI" />)</strong>.
            </p>
          </div>

          {/* Action Code Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { code: 'V+', label: 'Sıvı Yüklemesi', desc: '250–500 mL dengeli kristaloid', cls: 'text-sky-600 dark:text-sky-400 border-sky-500/30 bg-sky-500/10' },
              { code: 'V+!', label: 'Dikkatli Mini Bolus', desc: '100–250 mL · EVLWI yüksek', cls: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/10' },
              { code: 'V−', label: 'Negatif Sıvı Dengesi', desc: 'Sıvı kes · Diüretik / CRRT', cls: 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/10' },
              { code: 'Cat', label: 'İnotropik Destek', desc: 'Dobutamin / Adrenalin / Milrinon', cls: 'text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-500/10' },
              { code: 'VP', label: 'Vazopresör', desc: 'Noradrenalin / Vazopresin', cls: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
              { code: 'EKO!', label: 'Acil Yatak Başı EKO', desc: 'RV / Tamponad / Kapak dışla', cls: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10' },
            ].map((item) => (
              <div
                key={item.code}
                className={`rounded-xl border p-2.5 ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}
              >
                <span className={`inline-block font-mono font-bold text-xs px-2 py-0.5 rounded border ${item.cls}`}>
                  {item.code}
                </span>
                <div className={`text-xs font-bold mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Interactive 4-Tier Vertical Visual Decision Tree */}
          <TptdInteractiveDecisionTree isDark={isDark} />

          {/* ROSE 4-Phase Fluid Stewardship with TPTD */}
          <div
            className={`rounded-xl border p-4 sm:p-5 space-y-4 ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Zaman Bazlı Çerçeve · Malbrain ROSE Modeli
              </div>
              <h4 className={`text-sm sm:text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Kritik Hastada Sıvı Tedavisinin 4 Evresi (ROSE) ve TPTD’nin Rolü
              </h4>
              <p className={`text-xs leading-relaxed max-w-4xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Yukarıdaki karar ağacı hastanın <strong>o anki</strong> ölçümüne yanıt verir. <strong>ROSE modeli</strong> ise
                sepsis, majör travma, yanık veya büyük cerrahi sonrası yoğun bakımda izlenen kritik bir hastada{' '}
                <strong>günler içinde sıvı stratejisinin nasıl yön değiştirdiğini</strong> anlatır: ilk saatlerde hayat kurtaran
                sıvı, şok düzeldikten sonra organ ödemine yol açtığı için aktif olarak geri alınmalıdır (<em>de-resüsitasyon</em>).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {[
                {
                  badge: 'FAZ 1 · R',
                  phase: 'Resüsitasyon (Kurtarma)',
                  when: 'İlk dakikalar – ilk saatler · Akut şok / ağır hipoperfüzyon',
                  goal: 'Hayat kurtarıcı hızlı doku perfüzyonu ve ortalama arter basıncını sağlamak.',
                  tptdRole:
                    'Bu aşamada henüz TPTD takılı olmayabilir. Takılıysa düşük GEDVI (< 680) + kuru akciğer (EVLWI < 10) sıvı yüklemesini destekler; yüksek SVRI varsa kanama/hipovolemi, düşük SVRI varsa erken vazopresör ihtiyacı netleşir.',
                  stopRule: 'MAP ≥ 65 mmHg sağlanıp akut dolaşım çökmesi toparlanınca Faz 2’ye geçilir.',
                  accent: 'border-t-sky-500',
                  badgeCls: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-500/30',
                },
                {
                  badge: 'FAZ 2 · O',
                  phase: 'Optimizasyon',
                  when: 'Saatler içinde · Şok kısmen kontrol altında, organ perfüzyonu hassas',
                  goal: 'Gereksiz sıvı yüklemeden kalp debisini (CI) ve oksijen sunumunu optimize etmek.',
                  tptdRole:
                    'TPTD’nin en kritik olduğu fazdır. Her 250 mL bolus öncesi dinamik yanıt (SVV/PPV veya PLR) doğrulanır. GEDVI önyük doluluğunu, EVLWI ise akciğerin sıvı tolerans sınırını (≥ 10 mL/kg) gösterir. PVPI ≥ 3,0 ise kapiller kaçak nedeniyle sıvı erken sınırlandırılır.',
                  stopRule: 'Dinamik test negatifleştiğinde veya EVLWI ≥ 10’a ulaştığında sıvı yüklemesi durdurulur.',
                  accent: 'border-t-amber-500',
                  badgeCls: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
                },
                {
                  badge: 'FAZ 3 · S',
                  phase: 'Stabilizasyon',
                  when: 'Günler içinde · Şok geriliyor, vazoaktif ihtiyaç sabit veya azalıyor',
                  goal: 'Pozitif sıvı birikimini durdurmak ve sıfır (nötr) sıvı dengesini korumak.',
                  tptdRole:
                    'İdame dışı sıvı verilmez; ilaç infüzyonları yoğunlaştırılır. Tansiyon veya debi desteği gerekirse sıvı yerine TPTD’deki SVRI ve CFI/GEF verilerine göre vazopresör veya inotrop titre edilir.',
                  stopRule: 'Vazopresör dozu belirgin azalıp laktat normale indiğinde Faz 4’e (de-resüsitasyon) geçilir.',
                  accent: 'border-t-indigo-500',
                  badgeCls: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
                },
                {
                  badge: 'FAZ 4 · E',
                  phase: 'Evakuasyon (De-Resüsitasyon)',
                  when: 'Toparlanma dönemi · Şok stabil ancak dokularda/akciğerde fazla sıvı birikmiş',
                  goal: 'Birikmiş interstisyel ve pulmoner ödemi aktif negatif sıvı dengesiyle (V−) uzaklaştırmak.',
                  tptdRole:
                    'EVLWI ≥ 10 veya GEDVI > 800 sürüyorsa IV diüretik ya da CRRT ultrafiltrasyon ile kontrollü sıvı çekilir. Seri GEDVI, CI ve PLR takibiyle hastayı aşırı kurutmadan (hipoperfüzyona sokmadan) EVLWI < 10 hedefine inilir.',
                  stopRule: 'EVLWI < 10, GEDVI 680–800 ve klinik ödem çözüldüğünde aktif sıvı çekimi sonlandırılır.',
                  accent: 'border-t-emerald-500',
                  badgeCls: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
                },
              ].map((step) => (
                <div
                  key={step.phase}
                  className={`rounded-xl border border-t-4 ${step.accent} p-3.5 flex flex-col gap-2.5 ${
                    isDark ? 'bg-slate-950/75 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`inline-block font-mono font-bold text-[10px] px-2 py-0.5 rounded border ${step.badgeCls}`}>
                      {step.badge}
                    </span>
                    <div className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {step.phase}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 leading-snug">
                      {step.when}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs leading-relaxed">
                    <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                      <strong className="text-cyan-600 dark:text-cyan-400">Hedef:</strong> {step.goal}
                    </p>
                    <p className={isDark ? 'text-slate-300' : 'text-slate-600'}>
                      <strong className={isDark ? 'text-slate-100' : 'text-slate-800'}>TPTD Kullanımı:</strong>{' '}
                      <MedicalText text={step.tptdRole} />
                    </p>
                  </div>

                  <div
                    className={`mt-auto pt-2 border-t text-[11px] leading-snug ${
                      isDark ? 'border-slate-800 text-amber-300/90' : 'border-slate-100 text-amber-800'
                    }`}
                  >
                    <strong>Geçiş / Dur:</strong> <MedicalText text={step.stopRule} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* 04. PROTOKOL, TUZAKLAR, KIYASLAMA & BOARD SINAV İNCİLERİ             */}
      {/* =================================================================== */}
      {showSection('pitfalls') && (
        <section className="space-y-6">
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Bölüm 04 · Uygulama Protokolü, Hata Kaynakları & Sınav İncileri
            </div>
            <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ölçüm Protokolü, Fiziksel Artefaktlar, PAC/Nabız Konturu Kıyaslaması ve Güvenlik Bariyerleri
            </h3>
          </div>

          {/* 3-Step Measurement Protocol */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {[
              {
                title: '1. Kateter & Sıfırlama Hazırlığı',
                body: 'Üst kava (İJV/Subklavyen) SVK + Femoral (veya aksiller) termistör arter kateteri yerleştirin. Arter transdüserini flebostatik eksene (4. İKA orta aksiller) sıfırlayın ve fast-flush testi yapın.',
              },
              {
                title: '2. Soğuk Bolus & Enjeksiyon',
                body: '15–20 mL soğuk salin (< 8 °C; tercihen 0–4 °C buzlu salin) enjektörü hazırlayın. Aşırı yavaş (< 7 sn üstü) enjeksiyon eğriyi yayar; seri ve kesintisiz tek hamlede distal lümenden verin.',
              },
              {
                title: '3. Üçlü Ölçüm & Tutarlılık Onayı',
                body: 'Arka arkaya 3 ölçüm alın (arada bazal sıcaklığa dönüş beklenir). Değerler birbirinin ±%10–15’i içinde olmalıdır; aykırı eğriyi (çift pik, kaçak, hatalı enjeksiyon) silip ortalamayı onaylayın.',
              },
            ].map((step) => (
              <div
                key={step.title}
                className={`rounded-xl border p-4 space-y-1.5 ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{step.title}</span>
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          {/* Pitfalls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PITFALLS.map((item) => (
              <div
                key={item.condition}
                className={`rounded-xl border p-4 space-y-2 ${
                  item.severity === 'high'
                    ? isDark
                      ? 'bg-rose-950/15 border-rose-500/35'
                      : 'bg-rose-50/50 border-rose-200'
                    : isDark
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`text-xs sm:text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {item.condition}
                  </div>
                  {item.severity === 'high' ? (
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  )}
                </div>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <strong>Mekanizma:</strong> <MedicalText text={item.mechanism} />
                </p>
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                  <strong>Sapma:</strong> <MedicalText text={item.artifact} />
                </p>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-cyan-200/90' : 'text-cyan-900'}`}>
                  <strong>Çözüm / Bariyer:</strong> <MedicalText text={item.mitigation} />
                </p>
              </div>
            ))}
          </div>

          {/* TPTD vs PAC vs Uncalibrated Table */}
          <div
            className={`rounded-xl border overflow-x-auto ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr
                  className={`border-b ${
                    isDark ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <th className="py-3 px-4 font-semibold">Klinik Özellik</th>
                  <th className="py-3 px-4 font-semibold text-cyan-600 dark:text-cyan-400">
                    TPTD (PiCCO / VolumeView)
                  </th>
                  <th className="py-3 px-4 font-semibold">Pulmoner Arter Kateteri (PAC)</th>
                  <th className="py-3 px-4 font-semibold">Kalibresiz Nabız Konturu (FloTrac/PRAM)</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="align-top">
                    <td className={`py-3 px-4 font-bold min-w-[160px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 leading-relaxed min-w-[200px]">
                      <MedicalText text={row.tptd} />
                    </td>
                    <td className="py-3 px-4 leading-relaxed min-w-[200px]">
                      <MedicalText text={row.pac} />
                    </td>
                    <td className="py-3 px-4 leading-relaxed min-w-[200px]">{row.uncalibrated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Board Pearls & Never Events */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-indigo-50/60 border-indigo-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <Activity className="w-4 h-4" />
                <span>Board Sınavı (EDAIC · ABA · TARD) High-Yield İncileri</span>
              </div>
              <ul className={`space-y-1.5 text-xs leading-relaxed list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>
                  <strong>EVLWI İndeksleme Tuzağı:</strong> Obez hastada EVLWI gerçek kiloya değil daima{' '}
                  <strong>PBW’ye (Predicted Body Weight)</strong> bölünür; gerçek kiloya bölünürse akciğer ödemi
                  olduğundan düşük görünür.
                </li>
                <li>
                  <strong>Sakka İlişkisi:</strong> <MedicalText text="ITBV = 1,25 × GEDV" /> (PBV ortalama GEDV’nin
                  yaklaşık %25’idir).
                </li>
                <li>
                  <strong>PVPI Eşiği:</strong> <MedicalText text="EVLWI > 10" /> + <MedicalText text="PVPI ≥ 3,0" /> ={' '}
                  <strong>Permeabilite ödemi (ARDS)</strong>; <MedicalText text="EVLWI > 10" /> +{' '}
                  <MedicalText text="PVPI < 3,0" /> = <strong>Hidrostatik/kardiyojenik ödem</strong>.
                </li>
                <li>
                  <strong>Neden Radyal Arter Olmaz?</strong> Kalpten periferik radyal artere kadar termal sinyal
                  dağılır/zayıflar; MTt ve DSt yapay bozulur (femoral veya aksiller şarttır).
                </li>
              </ul>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-rose-950/20 border-rose-500/30' : 'bg-rose-50/60 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-4 h-4" />
                <span>Kırmızı Bayraklar & Never Events (Güvenlik Bariyerleri)</span>
              </div>
              <ul className={`space-y-1.5 text-xs leading-relaxed list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>
                  <strong>Femoral Arter İskemisi / Psödoanevrizma:</strong> Uzun süreli kalın femoral TPTD arter
                  kateterinde (genelde 4–5F) distal nabızlar, kapiller dolum ve ponksiyon bölgesi her vardiya kontrol
                  edilmelidir.
                </li>
                <li>
                  <strong>SVK Vazoaktif Bolus Kazası (Never Event):</strong> Termodilüsyon bolusu asla noradrenalin /
                  adrenalin / insülin giden lümenden verilmez; ölümcül hipertansif kriz veya aritmiye yol açar!
                </li>
                <li>
                  <strong>Yanlış Rekalibrasyona Dayalı Tedavi:</strong> Vazopleji derinleştiğinde TPTD ile rekalibre
                  edilmemiş eski PCCO rakamına güvenerek inotrop/sıvı titrasyonu yapmak ciddi karar hatasıdır.
                </li>
              </ul>
            </div>
          </div>

          {/* Standard Clinical Verification Note */}
          <div
            className={`rounded-xl border p-3.5 flex items-start gap-2.5 text-xs ${
              isDark ? 'bg-slate-900/70 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <Droplets className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
            <div>
              <strong>Klinik Doğrulama Notu:</strong> TPTD cihazından elde edilen tüm sayısal değerler tek başına nihai
              tedavi emri değildir; hasta başı klinik muayene, laktat/<MedicalText text="SvO_{2}" />, akciğer
              ultrasonu/ekokardiyografi bulguları ve kurumsal yoğun bakım/anestezi protokolleri ile birlikte
              değerlendirilmelidir.
            </div>
          </div>
        </section>
      )}

      {/* =================================================================== */}
      {/* 05. KAYNAKLAR VE REHBER ATIFLARI                                     */}
      {/* =================================================================== */}
      {showSection('references') && (
        <footer
          className={`pt-5 border-t space-y-3 ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div className={`flex items-center gap-2 text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            <BookOpen className="w-4 h-4 text-cyan-500" />
            <span>05. Kanıta Dayalı Kaynaklar, Landmark Çalışmalar ve Rehberler</span>
          </div>
          <ol className="space-y-2.5 text-xs leading-relaxed">
            {REFERENCES.map((ref, idx) => (
              <li key={ref.title} className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                <span className="font-mono font-semibold text-slate-500 mr-1.5">{idx + 1}.</span>
                <span className={isDark ? 'text-slate-200 font-medium' : 'text-slate-800 font-medium'}>
                  {ref.authors}
                </span>{' '}
                <em>{ref.title}</em> {ref.journal}
                <div className={`mt-0.5 pl-4 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  → {ref.note}
                </div>
              </li>
            ))}
          </ol>
        </footer>
      )}
    </div>
  );
};
