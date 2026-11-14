import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  Check,
  CheckCircle2,
  Compass,
  ExternalLink,
  Maximize2,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Wind,
  X
} from 'lucide-react';
import { CvcCoagulationTablesAccordion } from './CvcCoagulationTablesAccordion';

interface LandmarkCvcModuleProps {
  isDark: boolean;
}

type LandmarkSiteId = 'ijv' | 'subclavian' | 'femoral';

interface LandmarkApproach {
  name: string;
  entryPoint: string;
  directionAngle: string;
  expectedDepth: string;
  notes: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption: string;
  imageSource: string;
  imageLightBg?: boolean;
}

interface LandmarkSiteSpec {
  id: LandmarkSiteId;
  name: string;
  shortName: string;
  position: string;
  surfaceLandmarks: string[];
  approaches: LandmarkApproach[];
  ventilationRule: string;
  keyPitfalls: string[];
  successAndSafety: string;
}

const LANDMARK_SITES: Record<LandmarkSiteId, LandmarkSiteSpec> = {
  ijv: {
    id: 'ijv',
    name: 'İnternal Juguler Ven (İJV) — Anatomik Landmark Yaklaşımları',
    shortName: 'İnternal Juguler (İJV)',
    position:
      '15° Trendelenburg (venöz dolgunluğu artırır, hava embolisini önler) · Baş karşı tarafa 15–30° çevrilir (aşırı rotasyon İJV’yi karotis üzerine bindirir). Sağ taraf brakiyosefalik ven ile düz hat oluşturduğu için önceliklidir.',
    surfaceLandmarks: [
      'Sternokleidomastoid (SKM) kasının sternal ve klaviküler başları arasındaki üçgen alan (Sedillot üçgeni) ve bu üçgenin apeksi.',
      'Tiroid kıkırdak üst kenarı / krikoid kıkırdak seviyesi (C6 düzeyi): İğne girişi karotis bifurkasyonunun altında, plevra kubbesinden ise mümkün olduğunca uzakta kalmalıdır.',
      'Sol elin 2–3 parmağı ile Ana Karotis Arter (AKA) pulsasyonu nazikçe palpe edilip hafifçe mediale korunur (sert bası veni kollabe eder!).'
    ],
    approaches: [
      {
        name: 'Santral (Orta / Sedillot Apeks) Yaklaşım — Standart',
        entryPoint: 'SKM sternal ve klaviküler başlarının birleşim apeksi (krikoid kıkırdak hizası), palpe edilen karotis nabzının hemen 0.5–1 cm laterali.',
        directionAngle: 'İpsilateral meme başı (veya ipsilateral ön-üst iliak çıkıntı) yönünde cilde 30–45° açı.',
        expectedDepth: '1.5 – 3.0 cm (genellikle ilk 2 cm içinde venöz akım alınır).',
        notes: '3–4 cm derinlikte ven bulunamazsa iğne geri çekilir; daha derine inmek karotis, brakiyal pleksus veya apikal plevra riskini artırır.',
        imageSrc: '/landmark/PMC3270925_rmhp-4-027f5.jpg',
        imageAlt: 'Gerçek hasta fotoğrafı: Sédillot üçgeni — SKM sternal başı (sarı ok), klaviküler başı (turuncu ok), klavikula (kırmızı ok) ve iğne giriş noktası (*)',
        imageCaption: 'Sédillot üçgeni: SKM sternal başı (sarı ok), klaviküler başı (turuncu ok), klavikula (kırmızı ok) ve üçgen apeksi ponksiyon noktası (*).',
        imageSource: 'Bannon MP et al., Risk Manag Healthc Policy 2011 · Fig. 5 · PMID: 22312225 · CC BY-NC'
      },
      {
        name: 'Posterior Yaklaşım',
        entryPoint: 'SKM klaviküler başının arka-dış kenarı, eksternal juguler venin SKM’yi çaprazladığı noktanın hemen üzeri (klavikula 3–5 cm üstü).',
        directionAngle: 'SKM altından suprasternal çentiğe doğru 30–40° açı ile mediale-kaudale.',
        expectedDepth: '2.0 – 3.5 cm.',
        notes: 'Boynu kısa veya kalın hastalarda tercih edilebilir; brakiyal pleksus ve frenik sinir komşuluğuna dikkat edilmelidir.',
        imageSrc: '/landmark/PMC4588320_IJN-25-265-g001.jpg',
        imageAlt: 'Gerçek hasta fotoğrafı: İJV posterior yaklaşımda eksternal juguler ven, SKM arka kenarı ve suprasternal çentiğe yönelen enjektör',
        imageCaption: 'SKM arka kenarı ve eksternal juguler ven (kırmızı çizgi) kesişimi üzerinden kas altından suprasternal çentiğe yönelen posterior ponksiyon.',
        imageSource: 'Mathur M et al., Indian J Nephrol 2015 · Fig. 1 · PMID: 26628790 · CC BY-NC-SA 3.0'
      },
      {
        name: 'Anterior Yaklaşım',
        entryPoint: 'SKM ön kenarının orta noktası (klavikula ile mastoid arası orta hat), karotis nabzının 0.5 cm laterali.',
        directionAngle: 'İpsilateral meme başı yönüne 30–45° açı.',
        expectedDepth: '1.5 – 3.0 cm.',
        notes: 'Karotis ponksiyonu riski santral yaklaşıma göre biraz daha yüksektir; mutlaka 22G arama iğnesi önerilir.',
        imageSrc: '/landmark/PMC13743112_ACA-29-503-g001.webp',
        imageAlt: 'Gerçek hasta fotoğrafı: Tiroid/krikoid kıkırdak, SKM ön kenarı ve anterior İJV landmark işaretlemeleri',
        imageCaption: 'Yüzeyel boyun landmarkları: (a–b) Tiroid/krikoid kıkırdak ve SKM ön sınırı; (c–f) Krikoid düzeyi ve SKM ön kenarı üzerindeki ponksiyon noktaları.',
        imageSource: 'Zahid MA et al., Ann Card Anaesth 2026 · Fig. 1 · PMID: 42862664 · CC BY-NC-SA 4.0'
      }
    ],
    ventilationRule:
      'Mekanik ventilatöre bağlı hastada İJV landmark ponksiyonu için RUTİN ventilatör kesilmesi / apne GEREKMEZ. Pozitif basınç (özellikle PEEP 5–8 cmH₂O) venöz dolgunluğu artırabilir. Ancak apikal plevra yükselmiş olabileceğinden düşük supraklaviküler giriş yerine yüksek/santral (krikoid hizası) yaklaşım seçilmelidir.',
    keyPitfalls: [
      'Aşırı karotis kompresyonu İJV’yi tamamen söndürerek ponksiyonu imkansız hale getirir ve arka duvar geçişi ("double-wall") sonrası arter ponksiyonuna yol açar.',
      'Sol İJV körlemesine girişimde şilotoraks (duktus torasikus) ve SVC duvar erozyonu riski daha yüksektir.',
      'Maksimum 2–3 geçişte başarısız olunursa körlemesine ısrar edilmez.'
    ],
    successAndSafety: 'Basılabilir bölge olduğu için acilde USG yokluğunda ilk tercihtir (ancak koagülopatide USG şiddetle önerilir).'
  },
  subclavian: {
    id: 'subclavian',
    name: 'Subklavyen Ven (SKV) — İnfraklaviküler & Supraklaviküler Landmark',
    shortName: 'Subklavyen (SKV)',
    position:
      '10–15° Trendelenburg · Baş nötral veya hafif karşıya dönük · Kollar vücut yanında nötral pozisyonda (omuz altına sert rulo konulması klavikulayı vene bastırıp mesafeyi daraltabileceğinden rutin önerilmez).',
    surfaceLandmarks: [
      'Klavikulanın medial 1/3 ile orta 1/3 birleşim noktası ("deltopektoral geçiş bölgesi" mediali — klavikulanın öne doğru yaptığı konveks kıvrımın büküm yeri).',
      'Sol işaret parmağı suprasternal çentiğe (juguler çentik), başparmak ise klavikula-1. kosta açısına yerleştirilir; hedef trasesi parmak ucunun arkasına yönlendirilir.',
      'Subklavyen ven, 1. kosta üzerinde ve anterior skalen kasının ÖNÜNDE yer alır (arter ve brakiyal pleksus bu kasın arkasındadır).'
    ],
    approaches: [
      {
        name: 'İnfraklaviküler Yaklaşım (Aubaniac / Standart)',
        entryPoint: 'Klavikula medial–orta 1/3 birleşim noktasının 1 cm altı ve 1 cm laterali.',
        directionAngle: 'Önce klavikula alt yüzüne temas edilecek kadar sığ açıyla ilerlenir ("walk-under clavicle"), ardından iğne cilde/göğüs duvarına PARALEL tutularak suprasternal çentiğe konulan parmağın hemen arkasına doğru ilerletilir.',
        expectedDepth: '3.0 – 5.0 cm.',
        notes: 'İğne ucu göğüs duvarına doğru ASLA dikleştirilmemelidir (>15° açı doğrudan plevra kubbesine girer!). Yön değiştirme sadece iğne cilt altına geri çekildikten sonra yapılır.',
        imageSrc: '/landmark/PMC3270925_rmhp-4-027f9.jpg',
        imageAlt: 'Gerçek hasta fotoğrafı: Klavikula bükümü ve infraklaviküler subklavyen giriş noktası (*) ile suprasternal çentik doğrultusu (ok)',
        imageCaption: 'Klavikulanın medial–orta 1/3 bükümünün ("break") hemen alt-dışındaki giriş noktası (*) ve suprasternal çentiğe paralel trasesi (ok).',
        imageSource: 'Bannon MP et al., Risk Manag Healthc Policy 2011 · Fig. 9 · PMID: 22312225 · CC BY-NC'
      },
      {
        name: 'Supraklaviküler Yaklaşım (Yoffa)',
        entryPoint: 'SKM klaviküler başının lateral kenarı ile klavikula üst kenarının oluşturduğu klavikulosternomastoid açı (tepe noktası).',
        directionAngle: 'Bu açının açıortayı boyunca kontralateral meme başı yönüne, koronal düzlemin 10–15° önüne/altına doğru.',
        expectedDepth: '1.5 – 3.0 cm (cilde daha yakın).',
        notes: 'Kısa mesafe ve sağ/sol brakiyosefalik bileşkeye doğrudan giriş avantajı sunar; ancak plevra kubbesi çok yakındır — deneyimsiz ellerde önerilmez.',
        imageSrc: '/landmark/PMC12602559_423_2025_3908_Fig2_HTML.jpg',
        imageAlt: 'Gerçek hasta fotoğrafı: Yoffa supraklaviküler yaklaşımda klavikulosternomastoid açıdan ponksiyon ve venöz kan aspirasyonu',
        imageCaption: 'Klavikulosternomastoid açı apeksinden açıortay boyunca kontralateral meme başı yönüne sığ açılı ponksiyon ve venöz aspirasyon.',
        imageSource: 'Bouazizi YE et al., Langenbecks Arch Surg 2025 · Fig. 2 · PMID: 41212240 · CC BY-NC-ND 4.0'
      }
    ],
    ventilationRule:
      'KRİTİK TEDBİR (Mekanik Ventilasyon): Subklavyen landmark ponksiyonunda PEEP ve pozitif basınç akciğer apeksini yukarı ittiği için pnömotoraks riski yüksektir. Hasta kısa apneyi tolere edebiliyorsa (SpO₂ > %95, düşük PEEP/FiO₂), iğne ilerletilirken 10–15 sn süreli ekspiratuvar tutma / ventilatör devresi geçici kesilmesi (PEEP sıfırlanması) uygulanarak plevra aşağı indirilir. Ağır ARDS / yüksek PEEP bağımlı hipoksemide ise ventilatör KESİNLİKLE kesilmez ve kör Subklavyen yaklaşım TERK EDİLİR (İJV veya Femoral seçilir).',
    keyPitfalls: [
      'Klavikula arkasında kaldığı için arteriyel ponksiyonda DIŞARIDAN BASI UYGULANAMAZ — koagülopatide/antikoagülasyonda kontrendikedir.',
      'Kılavuz rehberler (Johnston 2025): KBH / gelecekteki diyaliz AV fistülü adaylarında ve ipsilateral mastektomi/aksiller diseksiyon tarafında santral venöz stenoz nedeniyle kaçınılmalıdır.',
      'Aynı tarafta bilinen pnömotoraks veya tek taraflı akciğer hastalığı varsa sağlam hemitoraksa DEĞİL patolojik tarafa (ya da İJV/Femorale) yönelin.'
    ],
    successAndSafety: 'Kör teknikte pnömotoraks riski (~%1.5–3) en yüksek bölge olduğundan USG yokluğunda acil endikasyon dışında tercih edilmemelidir.'
  },
  femoral: {
    id: 'femoral',
    name: 'Femoral Ven (FV) — İnguinal Landmark (NAVEL) Yaklaşımı',
    shortName: 'Femoral Ven (FV)',
    position:
      'Supin (baş-aşağı gerektirmez — KPR, pulmoner ödem ve KİBAS’ta idealdir) · Kalça hafif abdüksiyon (15°) ve hafif dış rotasyon ("kurbağa bacağı").',
    surfaceLandmarks: [
      'İnguinal ligaman hattı: Ön-üst iliak çıkıntı (ASIS) ile pubik tüberkül arasındaki çizgi (obezitede cilt kıvrımı ligamanın çok altında olabilir; kemik çıkıntılar palpe edilmelidir!).',
      'Lateralden Mediale "NAVEL" sırası: Sinir (Nerve) – Arter – Ven – Boşluk (Empty space) – Lenfatikler.',
      'KPR esnasında arter nabzı alınamıyorsa: ASIS–pubik simfiz hattı üç eşit parçaya bölünür; femoral ven kabaca medial 1/3 ile orta 1/3 birleşim noktasının hemen medialindedir.'
    ],
    approaches: [
      {
        name: 'Standart İnguinal Kıvrım Altı Yaklaşım',
        entryPoint: 'İnguinal ligamanın 1–2 cm distali, palpe edilen Femoral Arter nabzının 1.0–1.5 cm MEDİALİ.',
        directionAngle: 'Göbek / sefalik yöne doğru 30–45° açı ile (obezitede 45°).',
        expectedDepth: '2.0 – 4.0 cm (obezitede 4–6 cm).',
        notes: 'İnguinal ligamanın ÜZERİNE çıkılırsa dış eksternal iliak damar ponksiyonu ile ölümcül retroperitoneal hematom gelişebilir!',
        imageSrc: '/landmark/wiki_femoral_diagram.jpg',
        imageAlt: 'Femoral üçgen anatomik diyagramı: İnguinal ligaman, Sartorius, Adductor longus ve lateralden mediale Sinir–Arter–Ven (NAVEL) ilişkisi',
        imageCaption: 'İnguinal ligaman altında lateralden mediale NAVEL dizilimi: Femoral Sinir (sarı), Ana Femoral Arter (kırmızı) ve Ana Femoral Ven (mavi, en mediyal).',
        imageSource: 'Craig Hacking, Radiopaedia.org · Wikimedia Commons (2019 · CC BY-SA-NC)',
        imageLightBg: true
      }
    ],
    ventilationRule:
      'Mekanik ventilatöre bağlı hastada Femoral Ven landmark ponksiyonu için HİÇBİR ventilatör değişikliği, PEEP durdurulması veya apne TEDBİRİ GEREKMEZ. İntratorasik basınç ve akciğer mekaniklerinden tamamen bağımsızdır; yüksek PEEP’li ağır ARDS veya devam eden KPR sırasında en güvenli acil kör erişim yoludur.',
    keyPitfalls: [
      'Yüksek PEEP veya artmış karın içi basıncı (obezite, asit, gebelik) femoral venöz akımı yavaşlatabilir; aspirasyon sırasında nazik negatif basınç uygulanmalıdır.',
      'İnfeksiyon (CLABSI) ve iliofemoral DVT riski en yüksektir — acil stabilizasyon sonrası 48–72 saat içinde USG eşliğinde İJV/SKV ile değiştirilmelidir.',
      'Distalde ven arterin posterioruna kayabildiğinden girişim inguinal ligamana yakın (ancak asla üstünde olmayacak şekilde) yapılmalıdır.'
    ],
    successAndSafety: 'Pnömotoraks riski sıfır (%0) ve tam basılabilir olduğu için KPR ve ağır koagülopati/solunum yetmezliği acillerinde en güvenli kör erişimdir.'
  }
};

const LANDMARK_CHECKLIST = [
  {
    id: 1,
    title: 'Klinik Gerekçe, LocSSIPs Time-Out & Damar Koruma (Johnston 2025)',
    detail: 'USG neden kullanılmıyor? (Hiperakut acil/KPR veya cihaz yokluğu). KBH/AV fistül adayı ve mastektomi tarafı korunur. Koagülopati varsa kör Subklavyenden kaçınılır; basılabilir İJV veya Femoral seçilir.'
  },
  {
    id: 2,
    title: 'Mekanik Ventilasyon Kararı (PEEP / Apne Kontrolü)',
    detail: 'İJV ve Femoral için ventilatör kesilmez. Subklavyen landmark seçildiyse ve hasta hipoksik değilse iğne ilerletme anında 10–15 sn ekspiryumda bekletilir; ağır ARDS/yüksek PEEP varsa kör Subklavyen yapılmaz!'
  },
  {
    id: 3,
    title: 'Maksimal Steril Bariyer (MSB) & >%0.5 Alkolik Klorheksidin',
    detail: 'Tam steril örtü, önlük, bone, maske ve eldiven; cilt antisepsisinde ≥30 sn tam kuruma beklenir (acil KPR dışında steriliteden ödün verilmez).'
  },
  {
    id: 4,
    title: '22G "Arama İğnesi" (Finder Needle) & 3 Geçiş Limiti (ASA 2020)',
    detail: 'Önce ince 22G iğne ile ven derinliği ve yönü doğrulanır; venöz kan gelişi görüldüğünde açı bozulmadan 18G kanül paralel ilerletilir. Aynı bölgede en fazla 2–3 başarısız geçiş sonrası bölge değiştirilir.'
  },
  {
    id: 5,
    title: 'Basınç / Kan Akımı Teyidi & Dirençsiz Seldinger Tel',
    detail: 'Koyu renkli, pulsatil olmayan akım görülür; hipotansif/hipoksik hastada arter şüphesi varsa dilatatör ÖNCESİ mutlaka basınç manometrisi (su sütunu / transdüser) ile venöz basınç doğrulanır. Tel dirençle karşılaşırsa ASLA zorlanmaz.'
  },
  {
    id: 6,
    title: 'İki Kişilik "Never Event" Tel Teyidi & Post-İşlem Pnömotoraks Kontrolü',
    detail: 'Kılavuz telin tam ve J-ucu sağlam çıktığı iki kişiyle görsel-fiziksel teyit edilir. PBV altındaki hastada olası tansiyon pnömotoraksı yakalamak için Ppeak, SpO₂, oskültasyon ve akciğer grafisi kontrol edilir.'
  }
];

const LANDMARK_REFS = [
  {
    id: 'lm-asa-2020',
    citation: 'ASA Task Force on Central Venous Access. Practice Guidelines for Central Venous Access 2020. Anesthesiology. 2020;132(1):8–43.',
    note: 'Acil durumlarda anatomik landmark yaklaşımı, ince arama iğnesi (finder needle), dilatasyon öncesi basınç manometrisi ve yanlışlıkla arteriyel dilatasyon yönetimi.',
    pmid: '31821240',
    doi: '10.1097/ALN.0000000000002864'
  },
  {
    id: 'lm-johnston-2025',
    citation: 'Johnston AJ, Simpson MJ, McCormack V, et al. Association of Anaesthetists guidelines: safe vascular access 2025. Anaesthesia. 2025;80(11):1381–1396.',
    note: 'LocSSIPs prosedür kontrolü, ömür boyu damar koruma (KBH/AVF & mastektomi), kılavuz tel retansiyonu ("Never Event") önlemi ve koagülopati ilkeleri.',
    pmid: '40958714',
    doi: '10.1111/anae.16727'
  },
  {
    id: 'lm-3sites-2015',
    citation: 'Parienti JJ, Mongardon N, Mégarbane B, et al. (3SITES Study Group). Intravascular Complications of Central Venous Catheterization by Insertion Site. N Engl J Med. 2015;373(13):1220–1229.',
    note: 'Subklavyen, İJV ve Femoral bölgelerinin enfeksiyon, DVT ve mekanik pnömotoraks insidanslarının RKÇ karşılaştırması.',
    pmid: '26398070',
    doi: '10.1056/NEJMoa1500964'
  },
  {
    id: 'lm-peres-1990',
    citation: 'Peres PW. Positioning central venous catheters—a prospective survey. Anaesth Intensive Care. 1990;18(4):536–539.',
    note: 'Landmark ve USG yaklaşımlarında sağ atriyum perforasyonunu önleyen boy bazlı yerleştirme derinlik formülleri.',
    pmid: '2268022',
    doi: '10.1177/0310057X9001800422'
  }
];

export const LandmarkCvcModule: React.FC<LandmarkCvcModuleProps> = ({ isDark }) => {
  const [selectedSite, setSelectedSite] = useState<LandmarkSiteId>('ijv');
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);
  const [enlargedApproach, setEnlargedApproach] = useState<LandmarkApproach | null>(null);

  const site = LANDMARK_SITES[selectedSite];

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
      {/* Hızlı Bölüm Navigasyonu */}
      <nav
        aria-label="Landmark SVK Modül Bölümleri"
        className={`p-3 rounded-xl border flex flex-wrap items-center gap-2 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {[
          { id: 'lm-indications', label: '1. Endikasyon & Kılavuz Sınırı' },
          { id: 'lm-landmarks', label: '2. Anatomik Landmarklar (İJV / SKV / FV)' },
          { id: 'lm-vent', label: '3. Mekanik Ventilasyon Tedbirleri' },
          { id: 'lm-protocol', label: '4. Arama İğnesi & 6 Adım Kontrol' },
          { id: 'lm-refs', label: '5. Kaynaklar' }
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/80'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* BÖLÜM 1: ENDİKASYONLAR & KILAVUZ SINIRLARI */}
      <section id="lm-indications" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
              <span>01 · Anatomik İşaret (Kör) Tekniği</span>
              <span aria-hidden="true">·</span>
              <span>ASA 2020 · Association of Anaesthetists 2025</span>
            </div>
            <h3 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Landmark Metodu ile SVK Yerleştirilmesi: Klinik Konum ve Sınırlar
            </h3>
          </div>
        </div>

        <div className={`p-4 rounded-xl border space-y-1.5 text-xs ${
          isDark ? 'bg-amber-950/25 border-amber-800/60' : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Kılavuz Standart Uyarısı: Elektifte 1. Tercih Daima USG’dir</span>
          </div>
          <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            ASA 2020, ESAIC PERSEUS ve Association of Anaesthetists 2025 kılavuzlarına göre gerçek zamanlı ultrasonografi mevcut olan her durumda standart yöntemdir. <strong>Landmark metodu yalnızca</strong> USG cihazına anında ulaşılamayan hiperakut hayat kurtarıcı acillerde (KPR, masif travma/şok), cihaz arızasında veya USG deneyimli ekip beklenemeyecek aciliyette geçici kurtarıcı seçenek olarak uygulanır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              Uygulanabilir Acil Senaryolar &amp; Temel Kurallar
            </h4>
            <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• KPR sırasında göğüs kompresyonları sürerken acil santral/ilaç yolu ihtiyacı (öncelik: <strong>Femoral Landmark</strong>).</li>
              <li>• Ameliyathane dışında veya nakil sırasında USG yokluğunda acil vazoaktif/resüsitasyon erişimi.</li>
              <li>• <strong>2–3 Deneme Kuralı:</strong> Aynı bölgede körlemesine en fazla 2–3 geçiş yapılır; başarısızlıkta başka bölgeye geçilir veya USG beklenir.</li>
              <li>• Ömür boyu damar koruma (KBH/AVF ve mastektomi tarafı) landmark tekniğinde de mutlak geçerlidir.</li>
            </ul>
          </div>

          <div className={`${subSurfaceClass} p-4 space-y-2`}>
            <h4 className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>
              Landmarkta Yüksek Riskli Durumlar (USG Beklenmeli)
            </h4>
            <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <li>• <strong>Ağır Koagülopati / Antikoagülasyon:</strong> Basılamayan Subklavyen landmark kesinlikle yapılmaz; elektifte USG şarttır.</li>
              <li>• <strong>Morbid Obezite, Kısa Boyun, Ödem, Guatr veya Boyun Cerrahisi/RT Öyküsü:</strong> Yüzeyel anatomik işaretler kaybolduğundan arter ponksiyonu ve başarısızlık riski katlanır.</li>
              <li>• <strong>Tek Taraflı Akciğer Patolojisi / Büllöz Amfizem:</strong> Sağlam tarafa kör Subklavyen yapılmaz (bilateral solunum yetmezliği riski).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BÖLÜM 2: BÖLGEYE ÖZEL ANATOMİK LANDMARK PROTOKOLLERİ */}
      <section id="lm-landmarks" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span>02 · Yüzeyel Anatomik İşaretler &amp; İğne Vektörleri</span>
            </div>
            <h3 className={`text-lg font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Bölgesel Landmark Yaklaşımları (İJV · Subklavyen · Femoral)
            </h3>
          </div>

          <div className={`inline-flex flex-wrap p-1 rounded-lg border gap-1 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            {(['ijv', 'subclavian', 'femoral'] as LandmarkSiteId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedSite(id)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSite === id
                    ? isDark
                      ? 'bg-amber-600 text-white'
                      : 'bg-white text-amber-900 shadow-2xs'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {LANDMARK_SITES[id].shortName}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
              <div className="flex items-center gap-2 font-bold text-sky-600 dark:text-sky-400">
                <Compass className="w-4 h-4 shrink-0" />
                <span>Hasta Pozisyonu &amp; Palpasyon İşaretleri</span>
              </div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                <strong>Pozisyon:</strong> {site.position}
              </p>
              <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {site.surfaceLandmarks.map((lm, i) => (
                  <li key={i}>• {lm}</li>
                ))}
              </ul>
            </div>

            <div className={`${subSurfaceClass} p-4 space-y-2.5`}>
              <div className="flex items-center gap-2 font-bold text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Kör Teknik Tuzakları &amp; Kritik Güvenlik Notu</span>
              </div>
              <ul className={`space-y-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {site.keyPitfalls.map((p, i) => (
                  <li key={i}>• {p}</li>
                ))}
              </ul>
              <p className={`pt-2 border-t border-slate-200 dark:border-slate-800 font-medium ${
                isDark ? 'text-emerald-300' : 'text-emerald-800'
              }`}>
                Klinik Özet: {site.successAndSafety}
              </p>
            </div>
          </div>

          {/* Alt Yaklaşım Kartları */}
          <div className={`grid grid-cols-1 ${
            site.approaches.length === 3 ? 'lg:grid-cols-3' : site.approaches.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
          } gap-3.5 text-xs`}>
            {site.approaches.map((app, idx) => (
              <div key={idx} className={`${subSurfaceClass} p-4 flex flex-col justify-between space-y-3`}>
                <div className="space-y-2.5">
                  <h4 className={`text-sm font-bold pb-2 border-b border-slate-200 dark:border-slate-800 ${
                    isDark ? 'text-amber-300' : 'text-amber-900'
                  }`}>
                    {app.name}
                  </h4>

                  <button
                    type="button"
                    onClick={() => setEnlargedApproach(app)}
                    className={`group w-full rounded-lg overflow-hidden border text-left transition-colors cursor-pointer ${
                      isDark
                        ? 'border-slate-800 hover:border-amber-500/60 bg-slate-900/60'
                        : 'border-slate-200 hover:border-amber-400 bg-white'
                    }`}
                    aria-label={`${app.name} anatomik görselini büyüt`}
                  >
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 ${
                        app.imageLightBg ? 'bg-white' : 'bg-slate-950'
                      }`}
                    >
                      <img
                        src={app.imageSrc}
                        alt={app.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
                      />
                      <span className="absolute top-2 right-2 p-1.5 rounded-md bg-slate-900/80 border border-slate-700 text-slate-100 opacity-85 group-hover:opacity-100">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="px-2.5 py-2 space-y-1">
                      <p className={`text-[11px] leading-snug ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {app.imageCaption}
                      </p>
                      <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                        {app.imageSource}
                      </div>
                    </div>
                  </button>

                  <div>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 block">Giriş Noktası:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{app.entryPoint}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 block">Yönelim &amp; Açı:</span>
                    <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{app.directionAngle}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-500 dark:text-slate-400 block">Beklenen Ven Derinliği:</span>
                    <span className="font-mono tabular-nums font-semibold text-sky-600 dark:text-sky-400">{app.expectedDepth}</span>
                  </div>
                </div>
                <p className={`pt-2 border-t border-slate-200 dark:border-slate-800 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {app.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BÖLÜM 3: MEKANİK VENTİLATÖRE BAĞLI HASTADA TEDBİRLER (LANDMARK vs USG) */}
      <section id="lm-vent" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-sky-500/15 text-sky-400' : 'bg-sky-50 text-sky-700'}`}>
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Mekanik Ventilatöre Bağlı Hastada Tedbirler (Landmark vs USG Karşılaştırması)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pozitif İntratorasik Basınç (PBV) · PEEP Etkisi · Kısa Ekspiratuvar Tutma / Apne Kararı · Tansiyon Pnömotoraks İzlemi
            </p>
          </div>
        </div>

        {/* Seçili Bölgeye Özel Anlık Kural */}
        <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
          isDark ? 'bg-sky-950/30 border-sky-800/60' : 'bg-sky-50/80 border-sky-200'
        }`}>
          <div className="font-bold text-sky-600 dark:text-sky-400">
            Seçili Bölge ({site.shortName}) İçin Mekanik Ventilasyon Kuralı:
          </div>
          <p className={`leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
            {site.ventilationRule}
          </p>
        </div>

        {/* Karşılaştırma Tablosu: Her İki Yöntem İçin Tedbir Alınıp Alınmadığı */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className={isDark ? 'bg-slate-950/90 text-slate-300' : 'bg-slate-100 text-slate-700'}>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Erişim Bölgesi</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">Landmark (Kör) Metodda Tedbir</th>
                <th className="p-3 font-semibold border-b border-slate-200 dark:border-slate-800">USG Eşliğinde Metodda Tedbir</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
              <tr>
                <td className="p-3 font-semibold">İnternal Juguler Ven (İJV)</td>
                <td className="p-3">
                  <strong>Rutin ventilatör kesilmesi ALINMAZ.</strong> Düşük supraklaviküler yaklaşımdan kaçınılır; yüksek/santral yaklaşım (krikoid hizası) seçilir.
                </td>
                <td className="p-3">
                  <strong>Ventilatör kesilmez.</strong> PEEP genellikle İJV çapını genişleterek kolaylaştırır; yüksek PEEP’te orta boyun tercih edilip alt plevradan uzak durulur.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Subklavyen / Aksiller (SKV)</td>
                <td className="p-3">
                  <strong>TEDBİR ALINIR:</strong> Hasta tolere ediyorsa iğne ilerletilirken 10–15 sn ekspiryumda tutma / PEEP geçici sıfırlama uygulanır. <strong>Ağır ARDS / yüksek PEEP’te ventilatör KESİLMEZ ve kör SKV YAPILMAZ!</strong>
                </td>
                <td className="p-3">
                  <strong>Rutin apne zorunlu değil</strong> (Uzun eksen In-Plane’de plevra görülür); ancak düşük hipoksemi riskli olguda iğne geçişi anında kısa ekspiratuvar durdurma güvenlik marjını artırır. Ağır ARDS’de devre ayrılmaz.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Femoral Ven (FV)</td>
                <td className="p-3">
                  <strong>Ek solunumsal tedbir ALINMAZ.</strong> Ventilasyon kesintisiz sürer (yüksek PEEP’te venöz dönüş yavaşsa nazik aspirasyon yapılır).
                </td>
                <td className="p-3">
                  <strong>Ek solunumsal tedbir ALINMAZ.</strong> İntratorasik basınç/PEEP değişikliğinden etkilenmez.
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Ortak Post-İşlem Kuralı</td>
                <td className="p-3" colSpan={2}>
                  Pozitif basınçlı ventilasyon (PBV) altında oluşan küçük bir plevra laserasyonu hızla <strong>tansiyon pnömotoraksa</strong> dönüşebilir! Her iki metodda da işlem sonrası ani <strong>Ppeak artışı, SpO₂ düşüşü, hipotansiyon</strong> izlenir; solunum sesleri / plevra değerlendirilir. Ek olarak açık hub’dan ventilatör devresi kesilirse hava embolisi gelişebileceğinden hub daima kapalı tutulur.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* BÖLÜM 4: 22G ARAMA İĞNESİ & 6 ADIMLI LANDMARK GÜVENLİK KONTROLÜ */}
      <section id="lm-protocol" className={`${panelClass} p-5 sm:p-6 space-y-5`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/15 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Landmark Güvenlik Protokolü (22G Arama İğnesi &amp; 6 Adımlı Kontrol)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Maksimum 2–3 Geçiş Limiti · Basınç Manometrisi · &quot;Never Event&quot; Tel Kontrolü
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono tabular-nums font-semibold px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
              {checkedSteps.length} / {LANDMARK_CHECKLIST.length} Tamamlandı
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
          {LANDMARK_CHECKLIST.map((step) => {
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

        <div className={`p-4 rounded-xl border text-xs flex items-start gap-2.5 ${
          isDark ? 'bg-rose-950/25 border-rose-900/60' : 'bg-rose-50/70 border-rose-200'
        }`}>
          <Activity className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <p className={isDark ? 'text-slate-300 leading-relaxed' : 'text-slate-700 leading-relaxed'}>
            <strong>ASA 2020 Kritik Kuralı — Dilatasyon Öncesi Doğrulama &amp; Arteriyel Yaralanma:</strong> Kör teknikte venöz kan koyu görünse bile hipoksemi/hipotansiyonda arter kanı venöz sanılabilir! Şüphe halinde dilatatör ilerletilmeden önce basınç manometrisi (su sütunu yükselmiyorsa venöz) veya kan gazı teyidi yapılır. Kateter/dilatatör yanlışlıkla artere yerleştirildiyse <strong>ASLA ÇEKİLMEZ</strong>; yerinde bırakılıp Damar Cerrahisi / Girişimsel Radyoloji konsülte edilir.
          </p>
        </div>
      </section>

      {/* GİZLENEBİLİR AKORDİYON: JOHNSTON 2025 TABLO 5 & TABLO 6 (KOAGÜLASYON & TROMBOSİT EŞİKLERİ) */}
      <CvcCoagulationTablesAccordion isDark={isDark} />

      {/* BÖLÜM 5: KANITA DAYALI KAYNAKLAR */}
      <section id="lm-refs" className={`${panelClass} p-5 sm:p-6 space-y-4`}>
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className={`p-2 rounded-lg ${isDark ? 'bg-teal-500/15 text-teal-400' : 'bg-teal-50 text-teal-700'}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Kanıta Dayalı Kaynaklar (PubMed &amp; DOI)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Landmark SVK endikasyonları, güvenlik sınırları ve mekanik ventilasyon ilkeleri
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {LANDMARK_REFS.map((ref) => (
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

      {/* Anatomik Landmark Şema Büyütme Modalı */}
      {enlargedApproach && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setEnlargedApproach(null)}
          role="dialog"
          aria-modal="true"
          aria-label={enlargedApproach.imageAlt}
        >
          <div
            className={`max-w-3xl w-full rounded-xl border overflow-hidden shadow-2xl ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {site.shortName} · Anatomik Landmark Şeması
                </div>
                <h4 className="text-sm sm:text-base font-bold">{enlargedApproach.name}</h4>
              </div>
              <button
                type="button"
                onClick={() => setEnlargedApproach(null)}
                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
                aria-label="Görseli kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className={`p-2 sm:p-4 flex items-center justify-center max-h-[65vh] overflow-hidden ${
                enlargedApproach.imageLightBg ? 'bg-white' : 'bg-slate-950'
              }`}
            >
              <img
                src={enlargedApproach.imageSrc}
                alt={enlargedApproach.imageAlt}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className={`px-4 py-3 border-t text-xs space-y-1.5 ${
              isDark ? 'border-slate-800 bg-slate-950/60 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
            }`}>
              <p className="font-medium">{enlargedApproach.imageCaption}</p>
              <p>
                <strong>Giriş &amp; Yönelim:</strong> {enlargedApproach.entryPoint} {enlargedApproach.directionAngle}
              </p>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                Kaynak &amp; Lisans: {enlargedApproach.imageSource}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
