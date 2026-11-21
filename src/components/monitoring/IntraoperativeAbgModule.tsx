import React from 'react';
import {
  AlertTriangle,
  BookOpen,
  Clock,
  Droplets,
  ExternalLink,
  FlaskConical,
  ShieldAlert,
  Syringe,
  Thermometer,
  TrendingDown,
} from 'lucide-react';

interface IntraoperativeAbgModuleProps {
  isDark: boolean;
}

const SAMPLING_CATEGORIES = [
  {
    title: 'Cerrahiye Bağlı Planlı Örnekleme',
    accent: 'sky' as const,
    items: [
      'Kardiyak cerrahi / CPB: İndüksiyon sonrası bazal, pompaya giriş, hipotermi, ısınma ve pompadan ayrılma sonrası (her faz geçişinde).',
      'Torasik cerrahi / Tek Akciğer Ventilasyonu (OLV): Çift lümenli tüp yerleşip OLV’ye geçildikten 15–20 dk sonra (PaO₂, PaCO₂, P(a−Et)CO₂).',
      'Majör vasküler / Aort cerrahisi: Kros-klemp öncesi bazal ve klemp açıldıktan (reperfüzyon) 5–15 dk sonra (laktat, K⁺, asidoz).',
      'Karaciğer transplantasyonu / majör rezeksiyon: Pre-anhepatik, anhepatik ve reperfüzyon fazları (iCa²⁺, K⁺, laktat, glukoz, Hb).',
      'Nöroşirürji: Kraniyotomi ve KİBAS vakalarında PaCO₂’yi dar pencerede (32–35 mmHg) tutmak ve EtCO₂ gradyanını doğrulamak için.',
      'Uzun laparoskopi / robotik cerrahi: Pnömoperitonyum kaynaklı CO₂ retansiyonu ve P(a−Et)CO₂ açılmasını izlemek için (1–2 saatte bir).',
    ],
  },
  {
    title: 'Hastaya Bağlı Endikasyonlar',
    accent: 'emerald' as const,
    items: [
      'Ağır KOAH, ARDS, morbid obezite veya pulmoner hipertansiyon (bazal hiperkapni ve hipoksemi sınırlarının takibi).',
      'Son dönem böbrek yetmezliği / diyaliz hastaları (intraoperatif K⁺ ve metabolik asidoz riski).',
      'Diyabetik / yoğun insülin infüzyonu alan hastalar (genel anestezide hipoglisemi maskelenir — saatlik glukoz ve K⁺ kontrolü).',
      'Preoperatif ciddi anemi, koagülopati veya masif kanama potansiyeli taşıyan ASA III–V hastalar.',
    ],
  },
  {
    title: 'Acil / Dinamik Tetikleyiciler (Beklemeden Al!)',
    accent: 'rose' as const,
    items: [
      'Her 2–4 ünite eritrosit süspansiyonu veya masif kristaloid/kan ürünü transfüzyonu sonrası (Hb, iCa²⁺, K⁺, laktat, BE).',
      'Ani, açıklanamayan SpO₂ veya EtCO₂ düşüşü (emboli, pnömotoraks, endobronşiyal entübasyon, şok).',
      'Artan vazopressör ihtiyacı, refrakter hipotansiyon veya açıklanamayan oligüri (< 0.3 mL/kg/sa).',
      'Şüpheli Malign Hipertermi (ani karma asidoz + hiperkalemi), lokal anestezik siyanozu (MetHb co-oksimetri) veya uzun vaka sonrası ekstübasyon kararı.',
    ],
  },
];

const HIGH_YIELD_TARGETS = [
  {
    param: 'P(a−Et)CO₂ Gradyanı',
    normal: '2 – 5 mmHg',
    pearl: 'Şok, pulmoner emboli, KOAH, OLV ve pnömoperitonyumda alveoler ölü boşluk artar: EtCO₂ 34 görünürken PaCO₂ 55 mmHg olabilir! Mutlaka ilk AKG ile kalibre et.',
  },
  {
    param: 'İyonize Kalsiyum (iCa²⁺)',
    normal: '1.15 – 1.30 mmol/L',
    pearl: 'Kan ürünlerindeki sitrat iCa²⁺’yi hızla bağlar. < 0.90–1.00 mmol/L refrakter hipotansiyon, inotrop direnci ve koagülopati (Faktör IV) yapar — CaCl₂ veya Ca-Glukonat ile düzelt.',
  },
  {
    param: 'Laktat & Baz Açığı (BE)',
    normal: 'Laktat < 2.0 · BE −2..+2',
    pearl: 'Tek ölçümden çok seri trend (klirens) değerlidir. Yükseliyorsa gizli kanama, düşük CO, bağırsak/ekstremite iskemisi veya adrenalin/β₂-stimülasyon (Tip B) ayrımını yap.',
  },
  {
    param: 'Hiperkloremik Asidoz (Cl⁻)',
    normal: 'Cl⁻ 98 – 106 mEq/L',
    pearl: 'Masif %0.9 NaCl (154 mEq/L Cl⁻) sonrası gelişen normal anyon açıklı asidozu (NAGMA) hipoperfüzyon sanıp daha fazla SF yükleme; dengeli kristaloide (RL / Isolyte-S) geç (SMART 2018).',
  },
  {
    param: 'Glukoz · K⁺ · Co-Oksimetri',
    normal: 'Glu 140–180 · K⁺ 3.5–5.0',
    pearl: 'Genel anestezide hipoglisemi bulguları maskelenir. Süksinilkolin/turnike açılışında K⁺’yi, prilokain/benzokain sonrası açıklanamayan SpO₂ ~%85’te MetHb’yi co-oksimetri ile doğrula.',
  },
];

const ALPHA_VS_PH_ROWS = [
  {
    criterion: 'AKG Analiz Sıcaklığı',
    alphaStat: '37 °C’de okunan düzeltilmemiş değerler esas alınır (hasta ısısı girilmez).',
    phStat: 'Hasta kor ısısına göre sıcaklık düzeltmesi yapılır (pH ve PaCO₂ düzeltilir).',
  },
  {
    criterion: 'Hipotermide Fizikokimyasal Durum',
    alphaStat: 'Soğukta CO₂ çözünürlüğü artar → in-vivo pH yükselir, PaCO₂ düşer; ancak histidin imidazol α-iyonizasyon derecesi ve hücre içi nötralite korunur.',
    phStat: 'Sıcaklık düzeltilmiş PaCO₂’yi 40 mmHg ve pH’ı 7.40’ta tutmak için oksijenatör gazına ek CO₂ verilir → görece hiperkapni ve asidoz oluşur.',
  },
  {
    criterion: 'Serebral Kan Akımı (CBF) & Otoregülasyon',
    alphaStat: 'CBF / CMRO₂ metabolik bağlantısı ve serebral otoregülasyon KORUNUR (soğudukça CBF azalır).',
    phStat: 'Otoregülasyon bozulur; eklenen CO₂ güçlü serebral vazodilatasyon ve "lüks perfüzyon" oluşturur.',
  },
  {
    criterion: 'Mikroemboli Riski & Beyin Soğuması',
    alphaStat: 'Gereksiz yüksek CBF olmadığından beyne taşınan gaz/partikül mikroemboli yükü daha DÜŞÜKTÜR.',
    phStat: 'Vazodilatasyon beyin dokusunu daha hızlı ve homojen soğutur + Bohr etkisiyle ODC’yi sağa kaydırır; ancak erişkinde emboli yükünü artırabilir.',
  },
  {
    criterion: 'Klinik Tercih (Kanıt Özeti)',
    alphaStat: 'Erişkin CPB’de STANDART strateji (aterosklerotik/embolik inme riski daha düşük, nörokognitif sonuçlar daha iyi).',
    phStat: 'Pediatrik derin hipotermik sirkülatuar arrest (DHCA) ve siyanotik konjenital kalp cerrahisinin soğuma fazında tercih edilir (ısınmada Alpha-Stat’a geçilebilir).',
  },
];

const HEMORRHAGE_TIMELINE = [
  {
    phase: '0 – 30 dk (Akut Başlangıç · Sıvı Öncesi)',
    hbStatus: 'Hb / Hct NORMAL KALIR ("Sahte Güvenlik Tuzağı!")',
    mechanism:
      'Akut kanamada eritrosit ve plazma aynı oranda (tam kan olarak) kaybedilir. Damar içi konsantrasyon anında değişmediği için 1.5–2 L kanayan şoktaki hastada bile ilk AKG’de Hb 12–13 g/dL okunabilir.',
    action: 'Asla tek normal Hb ile kanamayı dışlama! Önce baz açığı (BE ↓), laktat (↑), taşikardi, PPV/SVV ↑ ve cerrahi alanı izle.',
    tone: 'critical' as const,
  },
  {
    phase: '15 – 60 dk (İntraoperatif Kristaloid / Kolloid Sonrası)',
    hbStatus: 'Hb / Hct HIZLA DÜŞER (İyatrojenik Hemodilüsyon)',
    mechanism:
      'Ameliyathanede Hb düşüşünü en hızlı ortaya çıkaran mekanizma verilen kristaloid ve kolloidlerin damar içi plazma hacmini genişletmesidir. Gerçek kan kaybı bu dilüsyonla birlikte AKG’ye yansır.',
    action: 'Kanama sürüyorsa seri Hb + iCa²⁺ + K⁺ + laktat takibi yap; tek seferlik beklenmedik düşüşte arter hattı SF kontaminasyonunu dışla.',
    tone: 'warning' as const,
  },
  {
    phase: '1 – 24+ saat (Fizyolojik Transkapiller Yeniden Dolum)',
    hbStatus: 'Kademeli Düşüş → 6–24 Saatte Denge (Tam 24–72 sa)',
    mechanism:
      'Hiç IV sıvı verilmese bile düşen kapiller hidrostatik basınç, interstisyel sıvıyı damar içine çeker (transcapillary refill). Bu fizyolojik kompanzasyon 1–2 saatte başlar, 6–24 saatte belirginleşir.',
    action: 'Postop erken dönemde (PACU/YBÜ) devam eden hafif Hb düşüşü her zaman aktif yeni kanama değil, gecikmiş plazma dengelenmesi olabilir; hemodinamiyle birlikte yorumla.',
    tone: 'neutral' as const,
  },
  {
    phase: 'Transfüzyon Sonrası Kontrol (1 Ü ES ≈ +1 g/dL Hb)',
    hbStatus: '15 – 30 dk İçinde Güvenilir Ölçüm Alınabilir',
    mechanism:
      'Eski "transfüzyon sonrası Hb bakmak için 6 saat bekle" miti geçersizdir. Aktif kanama kontrol altındaysa 1 Ü ES (70 kg erişkinde ~+1 g/dL Hb, +%3 Hct) sonrası 15–30 dk içinde AKG/hemogram dengelenir.',
    action: 'Masif transfüzyonda Hb yanında mutlaka iCa²⁺ (< 0.90 mmol/L!), K⁺, sıcaklık ve koagülasyon (ROTEM/TEG veya fibrinojen) izle.',
    tone: 'optimal' as const,
  },
];

const PREANALYTICAL_ERRORS = [
  {
    error: 'Arter Hattından Yetersiz Ölü Boşluk Çekimi (SF Kontaminasyonu)',
    distortion: 'Hb ↓ ("sahte kanama!"), Cl⁻ ↑, K⁺ ↓, iCa²⁺ ↓, pH ↓ (dilüsyonel)',
    prevention: 'Örnekten önce hat ölü boşluğunun en az 3–5 katını (tipik 5–10 mL) çekip ayır veya kapalı geri-verimli (VAMP) sistem kullan.',
  },
  {
    error: 'Enjektörde Fazla Sıvı Heparin Bırakılması',
    distortion: 'PaCO₂ ↓, HCO₃⁻ ↓, iCa²⁺ ↓↓ (heparin kalsiyumu şelatlar!), Hb ↓',
    prevention: 'Önceden hazırlanmış kuru dengeli lityum heparinli AKG enjektörü kullan; sıvı heparinle yıkıyorsan pistonu sonuna kadar boşalt.',
  },
  {
    error: 'Enjektörde Hava Kabarcığı Kalması',
    distortion: 'PaO₂ oda havasına (~150 mmHg) kayar (<150 ise yapay ↑, >150 ise yapay ↓); PaCO₂ ↓, pH ↑',
    prevention: 'Alım sonrası kapağı kapatmadan enjektörü dik tutarak tüm kabarcıkları boşalt ve kapağı hemen kapat.',
  },
  {
    error: 'Oda Isısında Gecikmiş Analiz (> 15–30 dk) / Lökositoz',
    distortion: 'PaO₂ ↓ ("lökosit hırsızlığı"), PaCO₂ ↑, Laktat ↑, pH ↓, Glukoz ↓',
    prevention: 'Ameliyathane içi POC analizörde 10–15 dk içinde çalış; gecikecekse soğutulmuş ortamda hızlı ilet (buzla dondurma → hemoliz/K⁺↑!).',
  },
  {
    error: 'İstemeden Venöz Örnek Alınması',
    distortion: 'SaO₂ ~%70–75 (SpO₂ %99 iken!), PaO₂ ~40 mmHg, PaCO₂ +4–6 mmHg yüksek',
    prevention: 'Pulsatil kan dolumunu gözle; SpO₂ ile SaO₂ arasında > %10–15 uçurum varsa örneğin venöz olduğunu fark et.',
  },
];

const REFERENCES = [
  {
    authors: 'Abdul Aziz KA, Meduoye A',
    title: 'Is pH-stat or alpha-stat the best technique to follow in patients undergoing deep hypothermic circulatory arrest?',
    journal: 'Interact Cardiovasc Thorac Surg. 2010;10(2):271–282',
    pmid: '19914925',
  },
  {
    authors: 'Baird G',
    title: 'Preanalytical considerations in blood gas analysis',
    journal: 'Biochem Med (Zagreb). 2013;23(1):19–27',
    pmid: '23457763',
  },
  {
    authors: 'Davis MD, Walsh BK, Sittig SE, Restrepo RD',
    title: 'AARC Clinical Practice Guideline: Blood Gas Analysis and Hemoximetry: 2013',
    journal: 'Respir Care. 2013;58(10):1694–1703',
    pmid: '23901131',
  },
  {
    authors: 'Semler MW, Self WH, Wanderer JP, et al. (SMART Investigators)',
    title: 'Balanced Crystalloids versus Saline in Critically Ill Adults',
    journal: 'N Engl J Med. 2018;378(9):829–839',
    pmid: '29485925',
  },
];

// Helper: Hill equation for ODC SVG curve (PaO2 0..100 mmHg -> SaO2 0..100%)
function buildOdcPath(p50: number): string {
  const n = 2.7;
  const pts: string[] = [];
  for (let po2 = 0; po2 <= 100; po2 += 2) {
    const sao2 = po2 === 0 ? 0 : (100 * Math.pow(po2, n)) / (Math.pow(po2, n) + Math.pow(p50, n));
    // Plot box: x from 48 to 318 (width 270 for 0..100), y from 176 (0%) to 22 (100%)
    const x = 48 + (po2 / 100) * 270;
    const y = 176 - (sao2 / 100) * 154;
    pts.push(`${po2 === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(' ');
}

export const IntraoperativeAbgModule: React.FC<IntraoperativeAbgModuleProps> = ({ isDark }) => {
  const leftCurvePath = buildOdcPath(19);
  const normalCurvePath = buildOdcPath(26.6);
  const rightCurvePath = buildOdcPath(36);

  return (
    <div className="space-y-7 pb-8">
      {/* ===================================================================== */}
      {/* HEADER                                                                */}
      {/* ===================================================================== */}
      <header className={`pb-5 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-rose-600 dark:text-rose-400 font-semibold">Gaz Değişimi · Asit-Baz · Perfüzyon</span>
          <span aria-hidden="true">·</span>
          <span>Ameliyathane Pratik Rehberi</span>
          <span aria-hidden="true">·</span>
          <span>AARC 2013 · Baird · SMART 2018</span>
        </div>

        <h1
          className={`mt-2 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          İntraoperatif Arter Kan Gazı (AKG) Takibi
        </h1>

        <p className={`mt-2.5 text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Ameliyathanede AKG örnekleme endikasyonları ve sıklığı, akut kanamada <strong>Hb/Hct düşüş zamanlaması</strong>,
          intraoperatif <strong>Oksihemoglobin Dissosiyasyon Eğrisi (ODC / P<sub>50</sub>)</strong> kaymaları, hipotermi ve
          CPB’de <strong>Alpha-Stat vs. pH-Stat</strong> yönetimi ve pre-analitik örnekleme tuzakları.
        </p>
      </header>

      {/* ===================================================================== */}
      {/* 1. INTRAOPERATIVE ABG INDICATIONS & TIMING (EXPANDED)                 */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <Syringe className="w-4 h-4 text-sky-500" />
            <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              İntraoperatif AKG Ne Zaman ve Ne Sıklıkla Alınır?
            </h2>
          </div>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Stabil majör vaka: 1–2 sa · Aktif kanama / CPB / reperfüzyon: 15–30 dk
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
          {SAMPLING_CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div
                className={`text-xs font-bold uppercase tracking-wider ${
                  cat.accent === 'sky'
                    ? 'text-sky-600 dark:text-sky-400'
                    : cat.accent === 'emerald'
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {cat.title}
              </div>
              <ul className={`text-xs leading-relaxed space-y-2 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {cat.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. ACUTE HEMORRHAGE: WHEN DO Hb & Hct ACTUALLY DROP?                  */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-rose-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Akut Kanamada Hemoglobin / Hematokrit Ne Zaman Değişir?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {HEMORRHAGE_TIMELINE.map((item) => (
            <div
              key={item.phase}
              className={`rounded-xl border p-4 space-y-2 ${
                item.tone === 'critical'
                  ? isDark
                    ? 'bg-rose-950/25 border-rose-500/40'
                    : 'bg-rose-50/75 border-rose-200'
                  : item.tone === 'warning'
                    ? isDark
                      ? 'bg-amber-950/20 border-amber-500/35'
                      : 'bg-amber-50/70 border-amber-200'
                    : item.tone === 'optimal'
                      ? isDark
                        ? 'bg-emerald-950/20 border-emerald-500/35'
                        : 'bg-emerald-50/70 border-emerald-200'
                      : isDark
                        ? 'bg-slate-900/60 border-slate-800'
                        : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>{item.phase}</span>
              </div>
              <div
                className={`text-sm font-bold ${
                  item.tone === 'critical'
                    ? 'text-rose-600 dark:text-rose-300'
                    : item.tone === 'warning'
                      ? 'text-amber-700 dark:text-amber-300'
                      : item.tone === 'optimal'
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : isDark
                          ? 'text-white'
                          : 'text-slate-900'
                }`}
              >
                {item.hbStatus}
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.mechanism}</p>
              <div
                className={`pt-2 border-t text-xs font-medium leading-relaxed ${
                  isDark ? 'border-slate-800/80 text-slate-200' : 'border-slate-200/80 text-slate-800'
                }`}
              >
                <strong>Klinik Not:</strong> {item.action}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. INTRAOPERATIVE OXYHEMOGLOBIN DISSOCIATION CURVE (ODC & P50)        */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-sky-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            İntraoperatif Oksihemoglobin Dissosiyasyon Eğrisi (ODC &amp; P<sub>50</sub>)
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Clean Educational ODC SVG Diagram */}
          <div
            className={`lg:col-span-5 rounded-xl border p-4 space-y-2 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold">
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                Oksihemoglobin Eğrisi (P<sub>50</sub> = 26.6 mmHg)
              </span>
              <span className="font-mono text-[10px] text-slate-400">SaO₂ (%) vs. PaO₂</span>
            </div>

            <svg
              viewBox="0 0 340 210"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Oksihemoglobin dissosiyasyon eğrisi normal, sola kayma ve sağa kayma"
            >
              {/* Grid lines */}
              {[25, 50, 75, 90, 100].map((pct) => {
                const y = 176 - (pct / 100) * 154;
                return (
                  <g key={`y-${pct}`}>
                    <line
                      x1="48"
                      y1={y}
                      x2="318"
                      y2={y}
                      stroke={pct === 90 ? '#f59e0b' : isDark ? '#1e293b' : '#e2e8f0'}
                      strokeDasharray={pct === 90 || pct === 50 ? '3 3' : undefined}
                      strokeWidth={pct === 90 ? '1.2' : '1'}
                    />
                    <text x="42" y={y + 3} textAnchor="end" fill="#64748b" fontSize="9" fontFamily="monospace">
                      {pct}%
                    </text>
                  </g>
                );
              })}

              {[0, 20, 40, 60, 80, 100].map((po2) => {
                const x = 48 + (po2 / 100) * 270;
                return (
                  <g key={`x-${po2}`}>
                    <line
                      x1={x}
                      y1="22"
                      x2={x}
                      y2="176"
                      stroke={po2 === 60 ? '#f59e0b' : isDark ? '#1e293b' : '#e2e8f0'}
                      strokeDasharray={po2 === 60 ? '3 3' : undefined}
                      strokeWidth="1"
                    />
                    <text x={x} y="190" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
                      {po2}
                    </text>
                  </g>
                );
              })}

              {/* Axes */}
              <line x1="48" y1="22" x2="48" y2="176" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />
              <line x1="48" y1="176" x2="318" y2="176" stroke={isDark ? '#475569' : '#94a3b8'} strokeWidth="1.2" />

              {/* Left Shift Curve (P50 = 19) */}
              <path d={leftCurvePath} fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeDasharray="5 3" />
              {/* Normal Curve (P50 = 26.6) */}
              <path d={normalCurvePath} fill="none" stroke="#10b981" strokeWidth="2.8" />
              {/* Right Shift Curve (P50 = 36) */}
              <path d={rightCurvePath} fill="none" stroke="#f43f5e" strokeWidth="2.2" strokeDasharray="5 3" />

              {/* Shoulder point (60 mmHg, ~90%) */}
              <circle cx={48 + 0.6 * 270} cy={176 - 0.9 * 154} r="4" fill="#f59e0b" stroke="#0f172a" strokeWidth="1" />
              <text x="218" y="54" fill="#f59e0b" fontSize="9" fontWeight="700" fontFamily="monospace">
                Omuz: PaO₂ 60 / SpO₂ 90%
              </text>

              {/* Curve Labels */}
              <text x="72" y="76" fill="#38bdf8" fontSize="9.5" fontWeight="700" fontFamily="monospace">
                ← Sola (P₅₀↓)
              </text>
              <text x="155" y="138" fill="#f43f5e" fontSize="9.5" fontWeight="700" fontFamily="monospace">
                Sağa (P₅₀↑) →
              </text>

              {/* Axis titles */}
              <text x="183" y="205" textAnchor="middle" fill="#64748b" fontSize="9.5" fontFamily="monospace">
                PaO₂ (mmHg)
              </text>
            </svg>

            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong>Kritik Omuz Noktası (PaO<sub>2</sub> 60 mmHg ≈ SpO<sub>2</sub> %90):</strong> Eğrinin üst platosunda PaO<sub>2</sub> düşse de
              SpO<sub>2</sub> uzun süre &gt; %92 kalır; ancak %90 altına inildiğinde dik yamaca girilir ve desatürasyon saniyeler içinde derinleşir.
            </p>
          </div>

          {/* Left Shift vs Right Shift Intraoperative Table */}
          <div className="lg:col-span-7 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Shift */}
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'bg-sky-950/20 border-sky-500/35' : 'bg-sky-50/70 border-sky-200'
                }`}
              >
                <div className="text-xs font-bold text-sky-600 dark:text-sky-400">
                  Sola Kayma (P<sub>50</sub> ↓ · Hb O<sub>2</sub>’ye Sıkı Yapışır)
                </div>
                <p className={`text-[11px] font-semibold ${isDark ? 'text-sky-200' : 'text-sky-900'}`}>
                  Tehlike: SpO<sub>2</sub> yüksek görünür ama dokuya O<sub>2</sub> bırakımı AZALIR!
                </p>
                <ul className={`text-xs leading-relaxed space-y-1 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Hiperventilasyon / Alkaloz</strong> (pH ↑, PaCO<sub>2</sub> ↓)</li>
                  <li><strong>İntraoperatif Hipotermi</strong> (T &lt; 35 °C)</li>
                  <li><strong>Masif Banka Kanı Transfüzyonu</strong> (depolanmış eritrositlerde <strong>2,3-DPG tükenmesi</strong> — 24–48 saatte yenilenir)</li>
                  <li><strong>COHb</strong> (karbonmonoksit), <strong>MetHb</strong>, <strong>HbF</strong></li>
                </ul>
              </div>

              {/* Right Shift */}
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
                }`}
              >
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400">
                  Sağa Kayma (P<sub>50</sub> ↑ · Dokuya O<sub>2</sub> Bırakımı Artar)
                </div>
                <p className={`text-[11px] font-semibold ${isDark ? 'text-rose-200' : 'text-rose-900'}`}>
                  Fizyoloji: Periferik kapillerde Bohr etkisiyle dokulara O<sub>2</sub> boşaltımı kolaylaşır.
                </p>
                <ul className={`text-xs leading-relaxed space-y-1 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li><strong>Asidoz</strong> (pH ↓ — laktik veya respiratuvar)</li>
                  <li><strong>Hiperkapni</strong> (PaCO<sub>2</sub> ↑ — laparoskopi, permisif hiperkapni)</li>
                  <li><strong>Hipertermi / Ateş / MH</strong> (T ↑)</li>
                  <li><strong>2,3-DPG ↑</strong> (kronik anemi, kronik hipoksi, yüksek rakım)</li>
                </ul>
              </div>
            </div>

            <div
              className={`rounded-xl border p-3.5 text-xs leading-relaxed flex items-start gap-2 ${
                isDark ? 'bg-slate-900/70 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                <strong>Ameliyathane İpucu:</strong> Soğuk, hiperventile ve masif banka kanı almış bir hastada 3 faktör birden
                ODC’yi <strong>sola kaydırır</strong>. Monitörde SpO<sub>2</sub> %99 görünürken bile periferik dokular O<sub>2</sub>’yi
                hemoglobinden koparamaz ve laktat yükselmeye devam eder — hastayı ısıtın ve normokapniyi koruyun!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. HYPOTHERMIA & CPB: ALPHA-STAT vs. pH-STAT (EXPANDED)               */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-indigo-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Hipotermi ve Kardiyopulmoner Bypass (CPB): Alpha-Stat vs. pH-Stat
          </h2>
        </div>

        {/* Physics primer banner */}
        <div
          className={`rounded-xl border p-4 text-xs leading-relaxed space-y-1.5 ${
            isDark ? 'bg-indigo-950/25 border-indigo-500/35 text-indigo-200' : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
          }`}
        >
          <div className="font-bold">Fizikokimyasal Temel (Henry Yasası &amp; Rosenthal Kuralı):</div>
          <p>
            Kan gazı cihazı her örneği sabit <strong>37 °C</strong>’de ölçer. Oysa hasta soğudukça (<strong>−1 °C</strong> başına)
            CO<sub>2</sub>’nin kanda çözünürlüğü artar, <em>in-vivo</em> <strong>PaCO<sub>2</sub> ~%4.5 düşer</strong> ve{' '}
            <strong>pH ~+0.015 yükselir</strong> (örneğin 37 °C’de pH 7.40 / PaCO<sub>2</sub> 40 mmHg olan kan, 27 °C’deki hastada gerçekte
            pH ~7.55 / PaCO<sub>2</sub> ~25 mmHg’dir). "Hasta ısısına göre düzeltme yapıp CO<sub>2</sub> ekleyelim mi, yoksa 37 °C okumasına
            mı bakalım?" sorusu <strong>pH-Stat vs. Alpha-Stat</strong> ayrımını doğurur.
          </p>
        </div>

        {/* Full Comparison Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-2.5 px-4 font-bold">Özellik</th>
                <th className="py-2.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Alpha-Stat (Erişkin CPB Standart)</th>
                <th className="py-2.5 px-4 font-bold text-indigo-600 dark:text-indigo-400">pH-Stat (Pediatrik DHCA / Soğutma)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {ALPHA_VS_PH_ROWS.map((row) => (
                <tr key={row.criterion} className="align-top">
                  <td className={`py-2.5 px-4 font-bold min-w-[160px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.criterion}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[230px]">{row.alphaStat}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[230px]">{row.phStat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. 5 HIGH-YIELD PARAMETERS + PRE-ANALYTICAL ERRORS                    */}
      {/* ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-rose-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ameliyathanede AKG’de Gözden Kaçmaması Gereken 5 Hayati Nokta
          </h2>
        </div>

        <div
          className={`rounded-xl border p-4 sm:p-5 divide-y ${
            isDark ? 'bg-slate-900/60 border-slate-800 divide-slate-800' : 'bg-white border-slate-200 divide-slate-200'
          }`}
        >
          {HIGH_YIELD_TARGETS.map((item) => (
            <div key={item.param} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.param}</span>
                <span className="font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  {item.normal}
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.pearl}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <h2 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Pre-Analitik Hatalar: Ameliyathanede "Bozuk AKG" Tuzakları
          </h2>
        </div>
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-2.5 px-4 font-bold">Örnekleme Hatası</th>
                <th className="py-2.5 px-4 font-bold">Sonuçtaki Yapay Sapma</th>
                <th className="py-2.5 px-4 font-bold">Önleme Kuralı</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {PREANALYTICAL_ERRORS.map((row) => (
                <tr key={row.error} className="align-top">
                  <td className={`py-2.5 px-4 font-bold min-w-[200px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.error}
                  </td>
                  <td className="py-2.5 px-4 text-rose-600 dark:text-rose-400 font-medium min-w-[210px]">
                    {row.distortion}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[240px]">{row.prevention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. VERIFIED PUBMED REFERENCES                                         */}
      {/* ===================================================================== */}
      <section
        className={`rounded-xl border p-4 space-y-2.5 ${
          isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
          <BookOpen className="w-3.5 h-3.5 text-rose-500" />
          <span>Kanıta Dayalı Kaynaklar (PubMed Doğrulamalı)</span>
        </div>
        <ul className="space-y-2 text-xs">
          {REFERENCES.map((ref) => (
            <li
              key={ref.pmid}
              className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              <div>
                <span className="font-semibold">{ref.authors}.</span> {ref.title}.{' '}
                <span className="italic text-slate-500">{ref.journal}.</span>
              </div>
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
              >
                <span>PMID: {ref.pmid}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
