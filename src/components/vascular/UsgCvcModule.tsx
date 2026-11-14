import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Calculator,
  Check,
  CheckCircle2,
  Compass,
  ExternalLink,
  Eye,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Wind
} from 'lucide-react';
import { CvcCoagulationTablesAccordion } from './CvcCoagulationTablesAccordion';

interface UsgCvcModuleProps {
  isDark: boolean;
}

type PeresAccessSite = 'r-ijv' | 'l-ijv' | 'r-scv' | 'l-scv' | 'femoral';
type CatheterType = 'triple-7fr' | 'sheath-85fr' | 'dialysis-12fr';

const SELDINGER_STEPS = [
  {
    id: 1,
    title: 'LocSSIPs Time-Out, Pre-Prosedürel USG (RaCeVA) & Damar Koruma',
    detail: 'İşlem öncesi LocSSIPs güvenlik kontrolü yapılır. Her iki taraf venleri USG ile taranır: ven iç çapı ölçülür (Kateter/Ven oranı ≤%33–45), trombüs/hipoplazi dışlanır. KBH (AV fistül) veya mastektomi/aksiller cerrahi tarafı korunur. Antikoagülan/koagülopati risk-yarar dengesi kurulur; basılabilir bölge (İJV/FV) ve deneyimli operatör + USG ile gereksiz kan ürünü profilaksisinden kaçınılır.'
  },
  {
    id: 2,
    title: 'Maksimal Steril Bariyer (MSB) & Klorheksidin Antisepsisi',
    detail: 'Operatör: bone, maske, steril önlük ve steril eldiven. Hasta: tepeden tırnağa tam steril örtü. Cilt: %2 Klorheksidin Glukonat + %70 İzopropil Alkol ile temizlenip tam kuruma (≥ 30 sn) beklenir. USG probu steril kılıf ve steril jel ile kaplanır.'
  },
  {
    id: 3,
    title: 'Pozisyon, Mekanik Ventilasyon Kontrolü & Dinamik USG Ponksiyonu',
    detail: 'İJV/SKV için 15° Trendelenburg verilir; baş rotasyonu ≤ 30° tutulur. Mekanik ventilatörde İJV/FV için devre kesilmez; SKV’de plevra çizgisi korunarak ve ağır ARDS yoksa kısa ekspiratuvar tutma opsiyonu değerlendirilerek iğne ucu kesintisiz izlenir (arka duvara geçilmez).'
  },
  {
    id: 4,
    title: 'Venöz Kan Akımı & İğne İçi Konum Doğrulaması',
    detail: 'Aspirasyonda koyu renkli ve pulsatil olmayan düşük basınçlı venöz akım doğrulanır. Şüphe halinde (hipotansif hastada koyu arter kanı veya yüksek basınçlı ven) iğneyi oynatmadan basınç transdüksiyonu (manometri) veya USG’de tel görünümü teyit edilir.'
  },
  {
    id: 5,
    title: 'J-Uçlu Kılavuz Tel (Guidewire) İlerletme Güvenliği',
    detail: 'İğne sabit tutulurken J-uçlu kılavuz tel dirençsiz biçimde en fazla ~18–20 cm ilerletilir. Direnç varsa ZORLAMA. Monitörde yeni ventriküler ektopi/PVC görülürse tel derhal 2–3 cm geri çekilir. Tel ASLA elden bırakılmaz ("Never Event" önlemi).'
  },
  {
    id: 6,
    title: 'Kontrollü Cilt İnsizyonu & Kısa Dilatasyon',
    detail: 'Telin damar içinde olduğu USG (uzun/kısa eksen) ile teyit edildikten sonra bistüri sırtı tele dönük küçük cilt kesisi yapılır. Dilatatör tüm boyuyla değil, sadece cilt-subkütan-damar duvarı mesafesi kadar (genellikle 2–4 cm) tel üzerinde serbestçe kaydırılarak çevrilir.'
  },
  {
    id: 7,
    title: 'Kateter İlerletme & İki Kişilik "Never Event" Tel Teyidi',
    detail: 'Kateter tel üzerinden ilerletilmeden önce telin arka ucu distal hub’dan dışarı çıkana dek geri çekilip elle kavranır. Kateter Peres derinliğine yerleştirilir, tel tamamen çıkarılır ve J-ucun tam/sağlam çıktığı iki kişiyle görsel-fiziksel teyit edilir (en ufak şüphede acil grafi zorunludur!).'
  },
  {
    id: 8,
    title: 'Lümen Hazırlığı, Tespit & Multimodal Uç Doğrulama (CAJ / Karina)',
    detail: 'Tüm lümenlerden serbest kan aspirasyonu yapılıp %0.9 NaCl ile yıkanır. Sütür + steril CHG şeffaf pansuman uygulanır. Hedef uç (alt SVC / kava-atriyal bileşke, radyografik karina düzeyi, perikard dışı) İntrakaviter EKG (IC-ECG) veya grafi ile doğrulanır.'
  }
];

const QUICK_NAV = [
  { id: 'cvc-sites', label: '1. Bölge Seçimi & 3SITES' },
  { id: 'cvc-vent', label: '2. Mekanik Ventilasyon Tedbirleri' },
  { id: 'cvc-peres', label: '3. Peres & Kateter/Ven Oranı' },
  { id: 'cvc-seldinger', label: '4. Seldinger 8 Adım' },
  { id: 'cvc-complications', label: '5. Komplikasyon & Kriz' },
  { id: 'cvc-refs', label: '6. Kaynaklar' }
];

const CVC_REFERENCES = [
  {
    id: 'aa-safe-vascular-2025',
    citation: 'Johnston AJ, Simpson MJ, McCormack V, et al. Association of Anaesthetists guidelines: safe vascular access 2025. Anaesthesia. 2025;80(11):1381–1396.',
    note: '2025 Güncel Kılavuz: 6 alanda 15 uzlaşı önerisi — LocSSIPs güvenlik listeleri, ömür boyu damar koruma (KBH/AVF ve mastektomi/aksiller cerrahi), Kateter/Ven çap oranı & CRT önlemi, koagülopati/antikoagülasyon yönetimi, IC-ECG/karina uç doğrulama ve kılavuz tel retansiyonu ("Never Event") önlemi.',
    pmid: '40958714',
    doi: '10.1111/anae.16727'
  },
  {
    id: 'asa-cvc-2020',
    citation: 'ASA Task Force on Central Venous Access. Practice Guidelines for Central Venous Access 2020. Anesthesiology. 2020;132(1):8–43.',
    note: 'Gerçek zamanlı USG, basınç/USG venöz doğrulama, arteriyel dilatasyonda kateteri yerinde bırakma ve post-prosedür uç doğrulama standardı.',
    pmid: '31821240',
    doi: '10.1097/ALN.0000000000002864'
  },
  {
    id: 'perseus-2020',
    citation: 'Lamperti M, Biasucci DG, Disma N, et al. European Society of Anaesthesiology guidelines on peri-operative use of ultrasound-guided for vascular access (PERSEUS). Eur J Anaesthesiol. 2020;37(5):344–376.',
    note: 'Perioperatif İJV, aksiller/subklavyen ve femoral erişimde USG tarama (RaCeVA), In-Plane/Out-of-Plane teknik ve plevral doğrulama.',
    pmid: '32265391',
    doi: '10.1097/EJA.0000000000001180'
  },
  {
    id: '3sites-2015',
    citation: 'Parienti JJ, Mongardon N, Mégarbane B, et al. (3SITES Study Group). Intravascular Complications of Central Venous Catheterization by Insertion Site. N Engl J Med. 2015;373(13):1220–1229.',
    note: '3.471 kateterizasyonda Subklavyen vs İJV vs Femoral bölgelerinin enfeksiyon, tromboz ve pnömotoraks risk karşılaştırması.',
    pmid: '26398070',
    doi: '10.1056/NEJMoa1500964'
  },
  {
    id: 'peres-1990',
    citation: 'Peres PW. Positioning central venous catheters—a prospective survey. Anaesth Intensive Care. 1990;18(4):536–539.',
    note: 'Boy temelli SVK yerleştirme derinliği formülleri (Sağ İJV Boy/10, Sol İJV Boy/10+4, Sağ SKV Boy/10−2, Sol SKV Boy/10+2).',
    pmid: '2268022',
    doi: '10.1177/0310057X9001800422'
  },
  {
    id: 'cdc-clabsi-2011',
    citation: 'O’Grady NP, Alexander M, Burns LA, et al. Guidelines for the Prevention of Intravascular Catheter-Related Infections. Clin Infect Dis. 2011;52(9):e162–e193.',
    note: 'Maksimal Steril Bariyer (MSB), >%0.5 alkolik klorheksidin cilt antisepsisi, femoral bölgeden kaçınma ve günlük kateter gerekliliği değerlendirmesi.',
    pmid: '21460264',
    doi: '10.1093/cid/cir257'
  }
];

export const UsgCvcModule: React.FC<UsgCvcModuleProps> = ({ isDark }) => {
  // Peres & Equipment + Catheter-to-Vein Ratio Calculator States
  const [heightCm, setHeightCm] = useState<number>(175);
  const [peresSite, setPeresAccessSite] = useState<PeresAccessSite>('r-ijv');
  const [catheterType, setCatheterType] = useState<CatheterType>('triple-7fr');
  const [veinDiameterMm, setVeinDiameterMm] = useState<number>(10.0);

  // Seldinger 8-Step Checklist State
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const peresResult = useMemo(() => {
    const safeHeight = Math.max(100, Math.min(220, heightCm || 170));
    let depthCm = safeHeight / 10;
    let formulaText = 'Boy (cm) / 10';
    let recommendedLength = '15 – 16 cm';
    let targetAnatomy = 'Kava-Atriyal Bileşke (CAJ) · Alt SVC';
    let warningNote = 'Perikardiyal refleksiyon üzerinde (karina ~2–3 cm altı) tutulmalıdır.';

    if (peresSite === 'r-ijv') {
      depthCm = safeHeight / 10;
      formulaText = 'Boy (cm) / 10';
      recommendedLength = safeHeight >= 180 ? '16 – 20 cm' : '15 – 16 cm';
    } else if (peresSite === 'l-ijv') {
      depthCm = safeHeight / 10 + 4;
      formulaText = '(Boy (cm) / 10) + 4 cm';
      recommendedLength = '20 cm (16 cm çoğu erişkinde kısa kalır)';
      warningNote = 'Sol brakiyosefalik ven açısı nedeniyle uç lateral SVC duvarına dayanmamalıdır.';
    } else if (peresSite === 'r-scv') {
      depthCm = safeHeight / 10 - 2;
      formulaText = '(Boy (cm) / 10) − 2 cm';
      recommendedLength = '15 – 16 cm';
    } else if (peresSite === 'l-scv') {
      depthCm = safeHeight / 10 + 2;
      formulaText = '(Boy (cm) / 10) + 2 cm';
      recommendedLength = '20 cm';
    } else {
      depthCm = 18;
      formulaText = 'Standart İliofemoral / Alt İVC Uzunluğu';
      recommendedLength = '15 – 20 cm (tercihen 20 cm erişkin)';
      targetAnatomy = 'Ana İliak Ven / İnferior Vena Kava (renal ven altı)';
      warningNote = 'Femoral kateterde uç derinliği Peres formülü ile değil anatomik kateter boyu (15–20 cm göbekte) ile belirlenir.';
    }

    const catheterLabel =
      catheterType === 'triple-7fr'
        ? '7 Fr · 3 Lümen (16G Distal / 18G Med / 18G Prox)'
        : catheterType === 'sheath-85fr'
          ? '8.5 Fr · Geniş Çaplı İntrodüser (Hızlı Masif Resüsitasyon / PA Kateter)'
          : '11.5 – 13.5 Fr · Çift Lümenli Hemodiyaliz / CRRT Kateteri';

    const flushVolume =
      catheterType === 'triple-7fr'
        ? 'Her lümen için 5–10 mL %0.9 NaCl (Ölü boşluk ~0.4–0.6 mL)'
        : catheterType === 'sheath-85fr'
          ? 'Yan kol 10 mL %0.9 NaCl + kapalı valf kontrolü'
          : 'Lümen başına ~1.5–2.2 mL ölü boşluk · %0.9 NaCl veya protokol kilidi';

    const catheterOuterMm =
      catheterType === 'triple-7fr' ? 2.33 : catheterType === 'sheath-85fr' ? 2.83 : 4.0;
    const safeVeinMm = Math.max(4.0, Math.min(20.0, veinDiameterMm || 10.0));
    const catheterToVeinPct = (catheterOuterMm / safeVeinMm) * 100;

    const cvrStatus =
      catheterToVeinPct <= 33
        ? {
            tier: 'ideal' as const,
            label: 'İdeal Oran (≤ %33)',
            note: 'Johnston 2025: Endotel hasarı ve kateter ilişkili tromboz (CRT) riski minimaldir.'
          }
        : catheterToVeinPct <= 45
          ? {
              tier: 'borderline' as const,
              label: 'Kabul Edilebilir Sınır (%34 – %45)',
              note: 'Johnston 2025: Sınır değer; daha uzun kalış veya protrombotik zeminde CRT açısından yakın izlem gerekir.'
            }
          : {
              tier: 'high' as const,
              label: 'Yüksek CRT Riski (> %45)',
              note: 'Johnston 2025 Uyarı: Kateter ven lümeninin %45’inden fazlasını tıkamaktadır — daha ince kalibre kateter veya daha geniş ven seçin!'
            };

    return {
      depthCm: depthCm.toFixed(1),
      rangeLow: Math.max(8, depthCm - 1).toFixed(1),
      rangeHigh: (depthCm + 1).toFixed(1),
      formulaText,
      recommendedLength,
      targetAnatomy,
      warningNote,
      catheterLabel,
      flushVolume,
      catheterOuterMm: catheterOuterMm.toFixed(2),
      catheterToVeinPct: catheterToVeinPct.toFixed(1),
      cvrStatus
    };
  }, [heightCm, peresSite, catheterType, veinDiameterMm]);

  const toggleStep = (id: number) => {
    setCheckedSteps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const panelClass = `rounded-xl border transition-colors ${
    isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
  }`;

  const subSurfaceClass = `rounded-xl border ${
    isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50/80 border-slate-200'
  }`;

  return (
    <div className="space-y-6">
      {/* Sticky-Free Quick Section Navigation */}
      <nav
        aria-label="SVK Modül Bölümleri"
        className={`p-3 rounded-xl border flex flex-wrap items-center gap-2 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {QUICK_NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-sky-300 border border-slate-700/80'
                : 'bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* BÖLÜM 1: ENDİKASYONLAR, KONTRENDİKASYONLAR & 3 BÖLGE KARŞILAŞTIRMASI (3SITES) */}
      <section id="cvc-sites" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
              <span>01 · Anatomik Erişim &amp; Damar Koruma</span>
              <span aria-hidden="true">·</span>
              <span>3SITES RKÇ · ASA 2020 · Association of Anaesthetists 2025</span>
            </div>
            <h3 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Endikasyonlar, Kontrendikasyonlar ve 3 Bölge Risk Matriksi
            </h3>
          </div>
        </div>

        {/* Endikasyonlar vs Rölatif Kontrendikasyonlar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
              Klinik Endikasyonlar
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• Vazoaktif ajan (Noradrenalin, Adrenalin, Vazopressin), hiperozmolar TPN (&gt;900 mOsm/L) veya irritan ilaç infüzyonu.</li>
              <li>• Çoklu uyumsuz ilaçların eş zamanlı çok lümenli uygulaması veya yetersiz periferik venöz erişim.</li>
              <li>• Hemodinamik monitörizasyon (CVP, ScvO₂, transpulmoner termodilüsyon) ve geçici transvenöz pacemaker.</li>
              <li>• Akut hemodiyaliz / CRRT (geniş lümenli diyaliz kateteri) veya masif hızlı volüm/kan resüsitasyonu (8.5 Fr Sheath).</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
              Rölatif Kontrendikasyonlar &amp; Bölge Değiştirme Kriterleri
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• Girişim bölgesinde cilt enfeksiyonu, yanık veya lokal derin ven trombozu (USG kompresyon testinde trombüs saptanması).</li>
              <li>• Koagülopati / Antikoagülan kullanımı (Johnston 2025): Subklavyen yerine <strong>basılabilir İJV veya Femoral</strong> seçilir; deneyimli operatör + gerçek zamanlı USG ile rutin gereksiz TDP/trombosit profilaksisinden kaçınılır.</li>
              <li>• Tek taraflı akciğer patolojisi (örn. karşı akciğerde pnömotoraks varsa): Sağlam hemitoraksı korumak için <strong>patolojik tarafa</strong> veya İJV/Femoral takılır.</li>
              <li>• İpsilateral klavikula kırığı, SVC sendromu, kalıcı pacemaker lead’leri, mastektomi/aksiller cerrahi tarafı veya KBH (diyaliz AV fistül korunması).</li>
            </ul>
          </div>
        </div>

        {/* 3 Bölge Karşılaştırma Tablosu */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse min-w-[680px]">
            <thead>
              <tr className={isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Klinik Parametre</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">İnternal Juguler (İJV)</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Subklavyen / Aksiller (SKV)</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Femoral Ven (FV)</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              <tr>
                <td className="p-3 font-medium">CLABSI Enfeksiyon Riski</td>
                <td className="p-3">Orta</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>En Düşük (3SITES referans)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>En Yüksek (48–72 sa çekilmeli)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Semptomatik Tromboz (DVT/CRT)</td>
                <td className="p-3">Orta (%0.9–2 · Kateter/Ven ≤%45 korur)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>En Düşük (%0.5)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>En Yüksek (%1.4–3+)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Pnömotoraks / Hemotoraks</td>
                <td className="p-3">Çok Düşük (&lt; %0.1–0.5)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>En Yüksek (~%1.5)</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Yok (%0)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Kompresyon / Koagülopati</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Basılabilir · Güvenli</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>Basılamaz · Riskli</td>
                <td className={`p-3 font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Tam Basılabilir · Güvenli</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">Ana Klinik Tercih</td>
                <td className="p-3">Perioperatif &amp; acil ameliyathane standart 1. tercih (Sağ İJV)</td>
                <td className="p-3">Uzun süreli YBÜ, TPN, KİBAS/boyunluk, trakeostomi (KBH’de kaçın)</td>
                <td className="p-3">KPR esnasında, ağır solunum yetmezliği, ağır koagülopati</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Johnston 2025 (Association of Anaesthetists): Ömür Boyu Damar Koruma & Koagülopati/CRT Çerçevesi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-teal-400' : 'text-teal-700'}`}>
              Ömür Boyu Damar Koruma (Vessel Preservation · Johnston 2025)
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>KBH &amp; Renal Replasman Adayları:</strong> Gelecekteki arteriyovenöz (AV) fistül/greft için ekstremite ve subklavyen venleri korumak amacıyla subklavyen erişimden kaçının; kısa süreli diyaliz dışında küçük kalibreli İJV seçin.</li>
              <li>• <strong>Mastektomi &amp; Aksiller Lenf Nodu Cerrahisi:</strong> Lenfödem ve venöz staz riski nedeniyle opere edilen ipsilateral üst ekstremite, aksiller ve subklavyen bölgeden uzak durun.</li>
              <li>• <strong>Cihaz Seçimi &amp; Lümen Sayısı:</strong> Klinik gereksinimi karşılayan <em>en ince kalibre ve en az lümenli</em> kateter seçilmelidir; Kateter / Ven iç çap oranı (aşağıdaki hesaplayıcı) işlem öncesi USG ile doğrulanır.</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
              Koagülopati, Antikoagülasyon &amp; CRT Çerçevesi (Johnston 2025)
            </h4>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Kanama vs Trombüs/Transfüzyon Dengesi:</strong> Antikoagülan/antiagregan alan veya hafif-orta koagülopatili hastalarda gerçek zamanlı USG eşliğinde basılabilir bölgeden (İJV/Femoral) deneyimli operatörce yapılan girişim güvenlidir; kanıt olmadan rutin profilaktik TDP/trombosit önerilmez.</li>
              <li>• <strong>Kateter İlişkili Tromboz (CRT):</strong> Kateter çapının damar lümeninin %33–45’ini aşması akımı yavaşlatıp endotel hasarıyla CRT’yi artırır; klinik gereksinim bittiği gün kateter çekilmelidir.</li>
              <li>• <strong>LocSSIPs &amp; Ekip Standartları:</strong> Kurumsal vasküler erişim paketleri (LocSSIPs) ve ekip bazlı standartlar mekanik komplikasyonları ve “Never Event”leri anlamlı azaltır.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BÖLÜM 2: MEKANİK VENTİLATÖRE BAĞLI HASTADA TEDBİRLER (USG METODU) */}
      <section id="cvc-vent" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'}`}>
              <Wind className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                02 · Mekanik Ventilasyon Güvenliği · Pozitif Basınçlı Ventilasyon (PBV)
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Mekanik Ventilatöre Bağlı Hastada Tedbirler (USG Metodu)
              </h3>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-md border self-start sm:self-auto ${
              isDark
                ? 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                : 'bg-sky-50 border-sky-200 text-sky-800'
            }`}
          >
            Rutin Apne Gerekmez · Bölgeye Göre Seçici Tedbir
          </span>
        </div>

        <div
          className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
            isDark
              ? 'bg-sky-950/30 border-sky-900/60 text-sky-200'
              : 'bg-sky-50 border-sky-200 text-sky-950'
          }`}
        >
          <strong>Klinik İlke:</strong> Gerçek zamanlı USG eşliğinde <strong>İJV ve Femoral</strong> kateterizasyonda ventilatör durdurulmaz ve devre açılmaz. Subklavyen/aksiller erişimde ise plevra kubbesi In-Plane kesitte sürekli görülse bile yüksek PEEP altında seçici önlemler devreye girer.
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <div className="flex items-center justify-between gap-2">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                İnternal Juguler Ven (İJV)
              </h4>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                Devre Kesilmez
              </span>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Tedbir Durumu:</strong> Rutin apne veya ventilatör durdurma <strong>alınmaz / gerekmez</strong>.</li>
              <li>• <strong>PEEP Avantajı:</strong> 5–8 cmH₂O PEEP intratorasik basıncı hafif artırarak İJV dolgunluğunu ve çapını büyütür; ponksiyonu kolaylaştırır.</li>
              <li>• <strong>Yüksek PEEP (&gt; 10–15 cmH₂O):</strong> Akciğer apeksi yükseldiği için düşük supraklaviküler pencereden kaçınılır; orta boyun (krikoid düzeyi) tercih edilir.</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <div className="flex items-center justify-between gap-2">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Subklavyen / Aksiller (SKV)
              </h4>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                Seçici Tedbir
              </span>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Kısa Ekspiratuvar Tutma:</strong> İnspirasyonda plevra yükselir. Hasta ağır hipoksemik değilse (SpO₂ &gt; %95), iğne ilerletilirken <strong>10–15 sn ekspiratuvar duraklatma (PEEP = 0)</strong> opsiyonu plevrayı aşağı çeker; tel/akım doğrulanınca derhal ventilasyona dönülür.</li>
              <li>• <strong>Ağır ARDS / Yüksek PEEP:</strong> Alveoler derecruitment riski nedeniyle ventilatör <strong>ASLA</strong> kapatılmaz ve devre açılmaz — bunun yerine İJV veya Femoral seçilir.</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
            <div className="flex items-center justify-between gap-2">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Femoral Ven (FV)
              </h4>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                Tedbir Gerekmez
              </span>
            </div>
            <ul className={`text-xs space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Tedbir Durumu:</strong> Toraks boşluğundan ve plevra mekaniğinden tamamen bağımsızdır; <strong>ventilatör ayarı değiştirilmez</strong>.</li>
              <li>• <strong>Klinik Kullanım:</strong> Ağır solunum yetmezliği, yüksek PEEP veya apne toleransı olmayan hastalarda pnömotoraks riski %0 olduğu için güvenli alternatiftir.</li>
              <li>• <strong>Hemodinamik Not:</strong> Yüksek PEEP venöz dönüşü yavaşlatabileceğinden kan akımı ve kılavuz tel USG ile doğrulanır.</li>
            </ul>
          </div>
        </div>

        <div
          className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
            isDark
              ? 'bg-rose-950/30 border-rose-900/60 text-rose-200'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <strong>Ortak Güvenlik Kuralı (Tansiyon Pnömotoraks Alarmı):</strong> Pozitif basınçlı ventilasyon altında gelişebilecek küçük bir plevral laserasyon hızla <strong>tansiyon pnömotoraksa</strong> ilerleyebilir. İşlem sırasında ve hemen sonrasında ani <strong>Ppeak artışı, SpO₂/EtCO₂ düşüşü, tek taraflı solunum ses kaybı ve hipotansiyon</strong> gelişimi açısından sürekli takip zorunludur.
          </div>
        </div>
      </section>

      {/* BÖLÜM 3: İNTERAKTİF PERES KATETER DERİNLİĞİ & EKİPMAN HESAPLAYICISI */}
      <section id="cvc-peres" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'}`}>
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Peres Derinliği &amp; Kateter / Ven Çap Oranı Hesaplayıcısı
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peres (1990) boy temelli hedef derinlik · Johnston (2025) Kateter/Ven oranı &amp; Kava-Atriyal Bileşke (CAJ)
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Sol Girişler */}
          <div className={`lg:col-span-5 ${subSurfaceClass} p-4 space-y-4`}>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Hasta Boyu (cm)
                </label>
                <span className="text-sm font-mono tabular-nums font-bold text-sky-500">
                  {heightCm} cm
                </span>
              </div>
              <input
                type="range"
                min={120}
                max={210}
                step={1}
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {[155, 165, 175, 185, 195].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setHeightCm(preset)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono tabular-nums border transition-colors cursor-pointer ${
                      heightCm === preset
                        ? 'bg-sky-600 border-sky-500 text-white font-semibold'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {preset} cm
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Girişim Bölgesi &amp; Taraf
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'r-ijv', label: 'Sağ İJV' },
                    { id: 'l-ijv', label: 'Sol İJV' },
                    { id: 'r-scv', label: 'Sağ SKV' },
                    { id: 'l-scv', label: 'Sol SKV' },
                    { id: 'femoral', label: 'Femoral' }
                  ] as { id: PeresAccessSite; label: string }[]
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPeresAccessSite(item.id)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      peresSite === item.id
                        ? 'bg-sky-600 border-sky-500 text-white'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                Kateter Tipi &amp; Kalibre
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {(
                  [
                    { id: 'triple-7fr', label: '7 Fr (2.33 mm) · 3 Lümenli Standart SVK' },
                    { id: 'sheath-85fr', label: '8.5 Fr (2.83 mm) · Hızlı İnfüzyon / Sheath' },
                    { id: 'dialysis-12fr', label: '12 Fr (4.00 mm) · Diyaliz / CRRT Kateteri' }
                  ] as { id: CatheterType; label: string }[]
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCatheterType(cat.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-medium text-left border transition-colors cursor-pointer ${
                      catheterType === cat.id
                        ? 'bg-sky-600 border-sky-500 text-white font-semibold'
                        : isDark
                          ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  USG Ölçülen Ven Çapı (mm)
                </label>
                <span className="text-sm font-mono tabular-nums font-bold text-teal-500">
                  {veinDiameterMm.toFixed(1)} mm
                </span>
              </div>
              <input
                type="range"
                min={5.0}
                max={18.0}
                step={0.5}
                value={veinDiameterMm}
                onChange={(e) => setVeinDiameterMm(Number(e.target.value))}
                className="w-full accent-teal-500 cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                <span>5.0 mm (Hipovolemik / Dar)</span>
                <span>10.0 mm (Ortalama İJV)</span>
                <span>18.0 mm</span>
              </div>
            </div>
          </div>

          {/* Sağ Hesaplama Çıktıları */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-sky-950/30 border-sky-800/70' : 'bg-sky-50/70 border-sky-200'
              }`}>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                  Cilt Sabitleme Derinliği
                </span>
                <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums mt-1 ${
                  isDark ? 'text-sky-300' : 'text-sky-900'
                }`}>
                  {peresSite === 'femoral' ? '15–20' : peresResult.depthCm}{' '}
                  <span className="text-xs font-normal text-slate-400">cm</span>
                </div>
                <div className="text-[11px] font-mono tabular-nums mt-1 text-slate-500 dark:text-slate-400">
                  {peresSite === 'femoral'
                    ? 'İliofemoral tam boy'
                    : `${peresResult.rangeLow}–${peresResult.rangeHigh} cm · ${peresResult.formulaText}`}
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                  Önerilen Kateter Boyu
                </span>
                <div className={`text-lg sm:text-xl font-bold font-mono tabular-nums mt-1.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {peresResult.recommendedLength}
                </div>
                <div className="text-[11px] mt-1.5 text-slate-500 dark:text-slate-400">
                  Hedef: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{peresResult.targetAnatomy}</strong>
                </div>
              </div>

              <div className={`p-4 rounded-xl border ${
                peresResult.cvrStatus.tier === 'ideal'
                  ? isDark ? 'bg-emerald-950/30 border-emerald-800/70' : 'bg-emerald-50/80 border-emerald-200'
                  : peresResult.cvrStatus.tier === 'borderline'
                    ? isDark ? 'bg-amber-950/30 border-amber-800/70' : 'bg-amber-50/80 border-amber-200'
                    : isDark ? 'bg-rose-950/30 border-rose-800/70' : 'bg-rose-50/80 border-rose-200'
              }`}>
                <span className="text-[11px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">
                  Kateter / Ven Oranı
                </span>
                <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums mt-1 ${
                  peresResult.cvrStatus.tier === 'ideal'
                    ? isDark ? 'text-emerald-300' : 'text-emerald-800'
                    : peresResult.cvrStatus.tier === 'borderline'
                      ? isDark ? 'text-amber-300' : 'text-amber-800'
                      : isDark ? 'text-rose-300' : 'text-rose-800'
                }`}>
                  %{peresResult.catheterToVeinPct}
                </div>
                <div className={`text-[11px] font-semibold mt-1 ${
                  peresResult.cvrStatus.tier === 'ideal'
                    ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                    : peresResult.cvrStatus.tier === 'borderline'
                      ? isDark ? 'text-amber-400' : 'text-amber-700'
                      : isDark ? 'text-rose-400' : 'text-rose-700'
                }`}>
                  {peresResult.cvrStatus.label}
                </div>
              </div>
            </div>

            <div className={`${subSurfaceClass} p-4 space-y-2.5 text-xs`}>
              <div className="flex items-start gap-2">
                <Eye className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                    Uç Doğrulama (Karina / IC-ECG) &amp; Tromboz (CRT) Koruması
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-0.5">
                    <strong>{peresResult.warningNote}</strong> {peresResult.cvrStatus.note} İntrakaviter EKG (IC-ECG) ile tel/kateter kava-atriyal bileşkeye (radyografik karina seviyesi) ulaştığında P dalgası maksimum amplitüde çıkar; bu noktadan <strong>1–2 cm geri çekilerek</strong> tespit edilir. Sağ atriyum içi yerleşim perforasyon ve tamponad riski taşır!
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Seçilen Ekipman ({peresResult.catheterOuterMm} mm Dış Çap):</span>
                  <span className="text-slate-600 dark:text-slate-400">{peresResult.catheterLabel}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 block">Lümen Yıkama &amp; Hazırlık:</span>
                  <span className="text-slate-600 dark:text-slate-400">{peresResult.flushVolume}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BÖLÜM 4: SELDİNGER TEKNİĞİ 8 ADIMLI GÜVENLİ SVK KONTROL LİSTESİ */}
      <section id="cvc-seldinger" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Seldinger Tekniği: 8 Adımlı Güvenli SVK &amp; LocSSIPs Protokolü
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                LocSSIPs Time-Out · Maksimal Steril Bariyer · Dinamik USG · &quot;Never Event&quot; Tel Kontrolü
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono tabular-nums font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
              {checkedSteps.length} / {SELDINGER_STEPS.length} Tamamlandı
            </span>
            {checkedSteps.length > 0 && (
              <button
                type="button"
                onClick={() => setCheckedSteps([])}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sıfırla</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {SELDINGER_STEPS.map((step) => {
            const isChecked = checkedSteps.includes(step.id);
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => toggleStep(step.id)}
                className={`p-4 rounded-xl border text-left transition-colors cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? isDark
                      ? 'bg-emerald-950/30 border-emerald-700/60'
                      : 'bg-emerald-50/70 border-emerald-300'
                    : isDark
                      ? 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono tabular-nums font-bold transition-colors ${
                    isChecked
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-300 text-slate-600'
                  }`}
                >
                  {isChecked ? <Check className="w-3.5 h-3.5" /> : step.id}
                </span>
                <div className="space-y-1">
                  <span className={`text-xs font-bold block ${
                    isChecked
                      ? isDark ? 'text-emerald-300' : 'text-emerald-900'
                      : isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    {step.title}
                  </span>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {step.detail}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* BÖLÜM 5: KRİTİK KOMPLİKASYONLAR & ACİL MÜDAHALE MATRİKSİ */}
      <section id="cvc-complications" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-rose-500/15 text-rose-400' : 'bg-rose-50 text-rose-700'}`}>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kritik Mekanik Komplikasyonlar &amp; Acil Müdahale Kriterleri
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ASA 2020 &amp; Association of Anaesthetists 2025: Arteriyel Dilatasyon · Pnömotoraks · Hava Embolisi · &quot;Never Event&quot; Kılavuz Tel Güvenliği
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border space-y-2 ${
            isDark ? 'bg-rose-950/25 border-rose-900/60' : 'bg-rose-50/70 border-rose-200'
          }`}>
            <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Yanlışlıkla Arteriyel Ponksiyon vs Dilatasyon</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • <strong>Sadece İnce İğne (18G) İle Girildiyse:</strong> İğneyi hemen geri çekin ve basılabilir bölgede (İJV/Femoral) kesintisiz 5–10 dk doğrudan bası uygulayın.<br />
              • <strong>Dilatatör veya Kateter Arter İçindeyse (ASA KRİTİK KURAL):</strong> <strong>KATETERİ ASLA DOĞRUDAN ÇEKMEYİN!</strong> Kateteri yerinde sabit bırakın, transdüsere bağlayın ve derhal Kalp-Damar Cerrahisi / Girişimsel Radyoloji ile cerrahi/endovasküler onarım planlayın. Körlemesine çekilmesi ölümcül hemoraji, hava yolu basısı (retrofaringeal hematom) veya inme yaratır.
            </p>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
              <Activity className="w-4 h-4 shrink-0" />
              <span>Pnömotoraks &amp; Hemotoraks (USG Plevral Tarama)</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • İşlem bitiminde lineer probla her iki anterior göğüs duvarında (2–4. İKA) <strong>plevral kayma (lung sliding)</strong> ve B-çizgileri bakılır; kaymanın kaybı (“Barcode / Stratosphere sign”) ve akciğer noktası (lung point) yüksek doğrulukla pnömotoraksı gösterir.<br />
              • Pozitif basınçlı ventilasyon altındaki hastada ani Ppeak artışı, desatürasyon ve hipotansiyon varsa tansiyon pnömotoraks düşünülerek acil iğne/tüp dekompresyonu yapılır.
            </p>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400">
              <Compass className="w-4 h-4 shrink-0" />
              <span>Venöz Hava Embolisi (VAE)</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • Hipovolemik veya spontan soluyan hastada açık kateter hub’ından negatif intratorasik basınçla hava emilebilir (ani EtCO₂ düşüşü, taşikardi, "mill-wheel" üfürüm, hipotansiyon).<br />
              • <strong>Acil Eylem:</strong> Hub’ı hemen kapat, %100 O₂ ver, hastayı <strong>Sol Lateral Dekübitus + Trendelenburg (Durant Manevrası)</strong> pozisyonuna al ve santral kateterden hava aspire etmeye çalış.
            </p>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>&quot;Never Event&quot; Kılavuz Tel Retansiyonu, Aritmi &amp; Tamponad</span>
            </div>
            <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
              • <strong>Johnston 2025 &amp; LocSSIPs Kuralı:</strong> Tel daima görünür ve elle kavranmış olmalıdır. İşlem sonunda kılavuz telin tüm boyu ve J-ucuyla birlikte işlem sahasından tamamen çıkarıldığı <strong>iki kişi tarafından görsel-fiziksel teyit edilir</strong>; telin varlığından en ufak kuşku duyulursa derhal grafi ile dışlanmalıdır.<br />
              • Kateter ucunun sağ atriyum içine fazla itilmesi aritmi ve miyokard erozyonu ile <strong>kardiyak tamponada</strong> yol açabilir; uç alt SVC / CAJ (karina düzeyi) seviyesinde tutulur.
            </p>
          </div>
        </div>
      </section>

      {/* GİZLENEBİLİR AKORDİYON: JOHNSTON 2025 TABLO 5 & TABLO 6 (KOAGÜLASYON & TROMBOSİT EŞİKLERİ) */}
      <CvcCoagulationTablesAccordion isDark={isDark} />

      {/* BÖLÜM 6: KANITA DAYALI KAYNAKLAR */}
      <section id="cvc-refs" className={`${panelClass} p-5 sm:p-6 space-y-4`}>
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kanıta Dayalı Kaynaklar (PubMed &amp; DOI)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bu modüldeki tüm kılavuz ve eşikler aşağıdaki uluslararası yayınlara dayanmaktadır
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {CVC_REFERENCES.map((ref) => (
            <div key={ref.id} className="py-3 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="space-y-0.5 text-xs">
                <p className={`font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                  {ref.citation}
                </p>
                <p className="text-slate-500 dark:text-slate-400">{ref.note}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono tabular-nums font-semibold transition-colors ${
                    isDark
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-300 hover:bg-sky-500/20'
                      : 'bg-sky-50 border-sky-200 text-sky-800 hover:bg-sky-100'
                  }`}
                >
                  <span>PubMed {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={`https://doi.org/${ref.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] font-mono font-semibold transition-colors ${
                    isDark
                      ? 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500/20'
                      : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
                  }`}
                >
                  <span>DOI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
