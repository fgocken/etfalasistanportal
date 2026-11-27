import React, { useId, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Flame,
  HeartPulse,
  Scale,
  ShieldAlert,
  Syringe,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  CompatibilityAndLineBlock,
  ContraindicationsGridBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MechanismOfActionBlock,
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

type CalcTab = 'eligibility_dose' | 'periop_asra' | 'switch_safety' | 'p2y12_compare';
type ClinicalSetting = 'stemi_pci' | 'nste_pre_angio' | 'nste_post_angio_pci' | 'med_fib_af';
type StentWindow = 'no_stent_or_6m' | 'des_1_6m' | 'fresh_stent_lt1m';
type SurgeryMode = 'elective_noncardiac' | 'elective_cabg' | 'urgent_bleed';
type SwitchDirection = 'clop_to_pras' | 'tica_to_pras' | 'pras_to_clop' | 'pras_to_tica';

export const PrasugrelProtocol: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [activeTab, setActiveTab] = useState<CalcTab>('eligibility_dose');

  // Tab 1: Uygunluk & Doz (TRITON-TIMI 38 · ACCOAST · ISAR-REACT 5)
  const [setting, setSetting] = useState<ClinicalSetting>('nste_post_angio_pci');
  const [priorStrokeTia, setPriorStrokeTia] = useState<boolean>(false);
  const [patientAge, setPatientAge] = useState<number>(62);
  const [patientWeightKg, setPatientWeightKg] = useState<number>(75);

  // Tab 2: Perioperatif, ASRA 2018 (7–10 Gün!) & Acil Kanama
  const [stentWindow, setStentWindow] = useState<StentWindow>('no_stent_or_6m');
  const [surgeryMode, setSurgeryMode] = useState<SurgeryMode>('elective_noncardiac');
  const [neuraxialPlanned, setNeuraxialPlanned] = useState<boolean>(true);
  const [hoursSinceLastDose, setHoursSinceLastDose] = useState<number>(12);

  // Tab 3: P2Y12 Geçiş (Switching)
  const [switchDir, setSwitchDir] = useState<SwitchDirection>('clop_to_pras');
  const [isAcutePhase, setIsAcutePhase] = useState<boolean>(true);

  // Akordeon
  const [showAdmeDetails, setShowAdmeDetails] = useMonographAccordion('prs-moa', false);

  const uniqueId = useId();
  const basePanel = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-100'
    : 'bg-white border-slate-200 text-slate-900 shadow-xs';
  const mutedText = isDark ? 'text-slate-400' : 'text-slate-600';

  const quickNavItems = [
    { id: 'prs-high-alert', label: 'Yüksek Uyarı' },
    { id: 'prs-moa', label: 'Etki & 1-Basamak PK' },
    { id: 'prs-contra', label: 'Kontrendikasyonlar' },
    { id: 'prs-indications', label: 'Endikasyonlar' },
    { id: 'prs-calc', label: 'Hesaplayıcı & ASRA' },
    { id: 'prs-tr', label: 'TR Formlar' },
    { id: 'prs-compat', label: 'Uygulama & NG' },
    { id: 'prs-organ', label: 'Organ Yetmezliği' },
    { id: 'prs-special', label: '≥75y & <60 kg' },
    { id: 'prs-preg', label: 'Gebelik & Laktasyon' },
    { id: 'prs-adr', label: 'Yan Etkiler & TTP' },
    { id: 'prs-cautions', label: 'Klinik Dikkat' },
    { id: 'prs-pd', label: 'Derin Farmakodinami' },
    { id: 'prs-refs', label: 'Etkileşim & Kaynak' },
  ];

  // --- TAB 1 KARAR MOTORU ---
  const isUnder60Kg = patientWeightKg < 60;
  const isOver75Yr = patientAge >= 75;

  const getEligibilityResult = () => {
    if (priorStrokeTia) {
      return {
        tone: 'rose' as const,
        headline: 'MUTLAK KONTRENDİKE: GEÇİRİLMİŞ İNME / TIA ÖYKÜSÜ (FDA Kutu Uyarısı!)',
        dose: 'PRASUGREL VERME!',
        detail:
          'TRITON-TIMI 38 çalışmasında geçmiş iskemik/hemorajik inme veya TIA öyküsü olan hastalarda Prasugrel fatal/intrakraniyal kanamayı dramatik artırarak net klinik ZARAR vermiştir → Tikagrelor veya Klopidogrel seçin!',
      };
    }
    if (setting === 'nste_pre_angio') {
      return {
        tone: 'rose' as const,
        headline: 'ESC 2023 SINIF III (ZARAR): NSTE-ACS’DE ANJİYOGRAFİ ÖNCESİ ÖN-TEDAVİ YAPMA (ACCOAST!)',
        dose: 'KORONER ANATOMİ GÖRÜLENE KADAR BEKLE!',
        detail:
          'ACCOAST çalışmasında koroner anatomisi bilinmeyen NSTE-ACS hastalarına anjiyo öncesi Prasugrel yüklemesi iskemik fayda sağlamazken majör/KABG kanamasını 2 kat artırmıştır! Anjiyoda PCI kararı verilince 60 mg yükleyin!',
      };
    }
    if (setting === 'med_fib_af') {
      return {
        tone: 'rose' as const,
        headline: 'ENDİKE DEĞİL / KAÇININ (TRILOGY ACS & AUGUSTUS)',
        dose: 'KLOPİDOGREL (veya uygun olguda Tikagrelor) SEÇİN!',
        detail:
          'Prasugrel konservatif (PCI yapılmayan) AKS’de Klopidogrele üstün değildir (TRILOGY ACS), STEMI fibrinolizinde endike değildir ve AF + DOAC/Varfarin kombinasyonunda aşırı kanama yapar!',
      };
    }
    if (isOver75Yr) {
      return {
        tone: 'amber' as const,
        headline: 'YAŞ ≥75: RUTİN ÖNERİLMEZ (Yalnızca Çok Yüksek İskemik Riskte 5 mg/gün!)',
        dose: 'Yükleme 60 mg → İdame 5 mg/gün (Tercihen Klopidogrel / Tikagrelor değerlendir)',
        detail:
          'TRITON-TIMI 38’de ≥75 yaş hastalarda fatal ve intrakraniyal kanama artışı nedeniyle rutin önerilmez; diyabet/önceki MI gibi çok yüksek trombotik riskte kesin endikasyon varsa 5 mg/gün azaltılmış idame (+ ASA 75–100 mg + Pantoprazol 40 mg/gün) kullanılır.',
      };
    }
    if (isUnder60Kg) {
      return {
        tone: 'amber' as const,
        headline: 'VÜCUT AĞIRLIĞI <60 kg: İDAME DOZUNU 5 mg/GÜN’E DÜŞÜR!',
        dose: '60 mg Tek Yükleme → 5 mg Günde 1 Kez (+ ASA 75–100 mg + PPI)',
        detail:
          '<60 kg hastalarda aktif metabolit (R-138727) maruziyeti ve majör kanama riski belirgin arttığından 60 mg yükleme sonrası idame kesinlikle 5 mg/gün (yarım doz!) olarak uygulanır!',
      };
    }
    return {
      tone: 'emerald' as const,
      headline:
        setting === 'nste_post_angio_pci'
          ? 'ESC 2023 SINIF IIa (ISAR-REACT 5): PCI’YA GİDEN NSTE-ACS’DE TİKAGRELORA TERCİH EDİLİR!'
          : 'UYGUN — STEMI PRİMER PCI STANDART PROTOKOLÜ (ESC 2023)',
      dose: '60 mg Tek Yükleme (6×10 mg) → 10 mg Günde 1 Kez (+ ASA 75–100 mg + PPI)',
      detail:
        '30–60 dk içinde güçlü ve öngörülebilir P2Y₁₂ blokajı sağlar (CYP2C19 polimorfizminden ve PPI/Omeprazolden etkilenmez!). GİS koruması için Pantoprazol 40 mg/gün ekleyin.',
    };
  };
  const elig = getEligibilityResult();

  // --- TAB 2 PERİOPERATİF & ASRA 2018 KARAR MOTORU ---
  const pltEffective = hoursSinceLastDose >= 6;
  const getPeriopVerdict = () => {
    if (surgeryMode === 'urgent_bleed') {
      return {
        tone: 'rose' as const,
        headline: 'ACİL CERRAHİ / KANAMA — PRASUGRELİ KES · TROMBOSİT TRANSFÜZYONU PLANLA!',
        detail: pltEffective
          ? `Son dozdan ${hoursSinceLastDose} saat geçmiş (≥6 sa): Aktif metabolit (R-138727) dolaşımdan büyük ölçüde temizlenmiştir → 2 ünite aferez trombosit transfüzyonu yeni trombositlerle hemostazı ETKİN DÜZELTİR! (+ TXA 1 g IV / Desmopressin 0,3 mcg/kg).`
          : `Son dozdan yalnızca ${hoursSinceLastDose} saat geçmiş (<6 sa): Dolaşımda hâlâ aktif R-138727 bulunabileceğinden transfüze trombositler kısmen bloke olabilir — mümkünse 6. saati bekleyin veya yüksek doz (2+ ünite) aferez trombosit + TXA planlayın!`,
      };
    }
    if (stentWindow === 'fresh_stent_lt1m') {
      return {
        tone: 'rose' as const,
        headline: 'ELEKTİF CERRAHİYİ ERTELE! (<1 Ay Taze Stent — Ölümcül Stent Trombozu!)',
        detail:
          'ESC 2022: Stentten sonraki ilk 1 ayda (AKS/kompleks DES’te ideal 3–6 ay) P2Y₁₂ kesilmesi katastrofik stent trombozu riski taşır! Ertelenemeyen hayati cerrahide Kardiyoloji ile IV Kangrelor köprülemesi planlanmalıdır.',
      };
    }
    if (surgeryMode === 'elective_cabg') {
      return {
        tone: 'amber' as const,
        headline: 'KABG ÖNCESİ EN AZ 7 GÜN ÖNCE KES! (TRITON-TIMI 38: <7g = 4× Majör Kanama!)',
        detail:
          'ESC 2022 & FDA Uyarısı: Prasugrel, KABG öncesi <7 gün kesildiğinde Klopidogrele kıyasla ~4 kat daha fazla majör KABG kanamasına yol açmıştır! Kesinlikle ≥7 gün önceden kesip Aspirin 75–100 mg/gün’ü sürdürün.',
      };
    }
    return {
      tone: stentWindow === 'des_1_6m' ? ('amber' as const) : ('emerald' as const),
      headline:
        stentWindow === 'des_1_6m'
          ? 'KARDİYOLOJİ ONAYIYLA EN AZ 7 GÜN ÖNCE KES · ASPİRİNİ SÜRDÜR!'
          : 'PREOP EN AZ 7 GÜN ÖNCE KES (ESC 2022) · ASPİRİNİ (75–100 mg) SÜRDÜR!',
      detail:
        'Oral P2Y₁₂ ajanları arasında EN UZUN cerrahi kesme süresi Prasugrel’e aittir (Prasugrel 7g vs Klopidogrel 5g vs Tikagrelor 3–5g)! Postop hemostaz sağlanınca 24–48 saat içinde yeniden başlanır.',
    };
  };
  const periopVerdict = getPeriopVerdict();

  // --- TAB 3 SWITCHING MOTORU ---
  const getSwitchProtocol = () => {
    if (switchDir === 'clop_to_pras') {
      return isAcutePhase
        ? {
            title: 'Klopidogrel → Prasugrel (Akut AKS / PCI · Eskalasyon)',
            regimen: 'Son Klopidogrel saatine bakılmaksızın HEMEN 60 mg Prasugrel Yükleme → 10 mg (veya 5 mg) q24sa!',
            note: 'İnme/TIA öyküsü mutlaka dışlanmalıdır; koroner anatomi biliniyor ve PCI planlanıyorsa doğrudan 60 mg yüklenir.',
          }
        : {
            title: 'Klopidogrel → Prasugrel (Kronik / Stabil Faz)',
            regimen: 'Son Klopidogrel dozundan 24 saat sonra doğrudan 10 mg (veya <60 kg: 5 mg) q24sa (Yükleme gerekmez).',
            note: 'Stabil fazda CYP2C19 yavaş metabolizör nedeniyle geçiş yapılıyorsa 24. saatte idame dozuyla devam edilir.',
          };
    }
    if (switchDir === 'tica_to_pras') {
      return isAcutePhase
        ? {
            title: 'Tikagrelor → Prasugrel (Akut Faz)',
            regimen: 'Son Tikagrelor dozundan ~24 saat sonra 60 mg Prasugrel Yükleme → 10 mg (veya 5 mg) q24sa!',
            note: 'Tikagrelor geri dönüşlü olduğundan reseptör boşluğunu önlemek için akut fazda 60 mg yükleme tercih edilir (SWAP-4).',
          }
        : {
            title: 'Tikagrelor → Prasugrel (Kronik / Dispne Nedeniyle Geçiş)',
            regimen: 'Son Tikagrelor dozundan 24 saat sonra 60 mg yükleme (veya yüksek kanama riskinde 10 mg idame) → 10 mg/gün.',
            note: 'Tikagrelora bağlı şiddetli dispne/bradikardi gelişen ve inme öyküsü olmayan PCI hastalarında Prasugrel mükemmel alternatiftir!',
          };
    }
    if (switchDir === 'pras_to_clop') {
      return {
        title: 'Prasugrel → Klopidogrel (De-eskalasyon · Kanama / AF+DOAC / Maliyet)',
        regimen: isAcutePhase
          ? 'Son Prasugrel dozundan 24 saat sonra 75 mg/gün Klopidogrel (yüksek trombotik riskte 600 mg yükleme tartışılabilir; genelde 75 mg yeterlidir!).'
          : 'Son Prasugrel dozundan 24 saat sonra doğrudan 75 mg/gün Klopidogrel (Yükleme GEREKMEZ — Prasugrel zaten geri dönüşsüzdür!).',
        note: 'Klopidogrele geçerken hastanın Omeprazol/Esomeprazol almadığını teyit edip Pantoprazol 40 mg/gün kullanın!',
      };
    }
    return {
      title: 'Prasugrel → Tikagrelor',
      regimen: isAcutePhase
        ? 'Son Prasugrel dozundan 24 saat sonra 180 mg Tikagrelor Yükleme (veya 90 mg q12sa) → 90 mg q12sa!'
        : 'Son Prasugrel dozundan 24 saat sonra 90 mg q12sa Tikagrelor (ASA kesinlikle ≤100 mg/gün olmalı!).',
      note: 'Yeni gelişen TIA/inme öyküsünde Prasugrel kesilip Tikagrelor veya Klopidogrele geçilir.',
    };
  };
  const switchInfo = getSwitchProtocol();

  // --- KOPYALANABİLİR ORDER METNİ ---
  const buildOrderText = () => {
    if (activeTab === 'eligibility_dose') {
      return `PRASUGREL DEĞERLENDİRMESİ (${patientAge} yaş, ${patientWeightKg} kg, İnme/TIA: ${priorStrokeTia ? 'VAR' : 'YOK'}): ${elig.headline} | Öneri: ${elig.dose}`;
    }
    if (activeTab === 'periop_asra') {
      const asraTxt = neuraxialPlanned
        ? 'ASRA 2018 / ESAIC 2022 NÖRAAKSİYEL: Prasugrel son dozdan EN AZ 7–10 GÜN geçmeden spinal/epidural ponksiyon YAPILMAZ! (En uzun kesme süresi!).'
        : '';
      return `PERİOPERATİF PRASUGREL (ESC 2022): ${periopVerdict.headline} ${asraTxt}`;
    }
    if (activeTab === 'switch_safety') {
      return `P2Y₁₂ GEÇİŞ PROTOKOLÜ (${switchInfo.title}): ${switchInfo.regimen}`;
    }
    return `P2Y₁₂ KIYASLAMA: Prasugrel (Cerrahi 7g · ASRA 7–10g · İnme/TIA YASAK · NSTE-ACS anjiyo öncesi YASAK · <60kg/≥75y 5 mg · ISAR-REACT 5 PCI lideri) vs Tikagrelor (Cerrahi 3–5g · ASRA 5–7g · Plt transfüzyonu etkisiz) vs Klopidogrel (Cerrahi 5g · ASRA 5–7g · CYP2C19/Omeprazol).`;
  };

  return (
    <div className="space-y-6 pb-10">
      {/* 1. HIZLI GEZİNME ÇUBUĞU */}
      <MonographQuickNav isDark={isDark} items={quickNavItems} />

      {/* 2. YÜKSEK UYARI & GÜVENLİK BLOĞU */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="prs-high-alert"
        defaultOpen={false}
        tallManName="PRASUGREL (İNME/TIA YASAK · ANJİYO ÖNCESİ YASAK · ASRA 7–10 GÜN KES!)"
        confusionRiskWith="≥75 Yaş / <60 kg (5 mg Kuralı!) · NSTE-ACS Ön-Tedavi Hatası (ACCOAST) · KABG 7 Gün Kuralı"
        criticalAlerts={[
          'FDA KUTU UYARISI — GEÇİRİLMİŞ İNME veya TIA ÖYKÜSÜNDE MUTLAK KONTRENDİKE!: TRITON-TIMI 38 çalışmasında herhangi bir iskemik/hemorajik inme veya TIA öyküsü olan hastalarda Prasugrel intrakraniyal/fatal kanamayı dramatik artırarak NET ZARAR vermiştir — İNME/TIA öyküsü varsa ASLA VERME!',
          'ESC 2023 SINIF III (ACCOAST) — NSTE-ACS’DE KORONER ANATOMİ BİLİNMEDEN ÖN-TEDAVİ YASAK!: Anjiyografi öncesi Prasugrel yüklemesi iskemik yarar sağlamazken majör ve KABG kanamasını 2× artırır! Yalnızca anjiyoda PCI kararı verildikten sonra 60 mg yükle!',
          'EN UZUN KESME SÜRESİ — CERRAHİ/KABG ≥7 GÜN · NÖRAAKSİYEL (ASRA 2018) 7–10 GÜN!: Oral P2Y₁₂ ajanları içinde en güçlü ve en uzun geri dönüşsüz blokajı yapar! KABG öncesi <7 gün kesilirse majör kanama 4× artar; spinal/epidural blok için EN AZ 7–10 GÜN kesilmelidir!',
          'YAŞ ≥75 (RUTİN ÖNERİLMEZ) & KİLO <60 kg (5 mg/gün KURALI)!: <60 kg hastalarda idame dozu 10 mg yerine KESİNLİKLE 5 mg/gün’e düşürülür! ≥75 yaşta fatal kanama riski nedeniyle rutin kullanılmaz (çok yüksek iskemik riskte zorunluysa 5 mg/gün)!',
        ]}
        antidoteOrRescue="Spesifik kimyasal antidotu yoktur. (1) Hayatı tehdit eden cerrahi/GİS kanamada: Aktif metabolit R-138727’nin plazmadan büyük ölçüde temizlendiği ≥4–6 saat sonrasında verilen 2 ünite aferez trombosit transfüzyonu yeni bloke olmamış trombositlerle hemostazı ETKİN DÜZELTİR (Tikagrelordan avantajı!). Yardımcı olarak Traneksamik asit 1 g IV / Desmopressin 0,3 mcg/kg düşünülebilir. (2) Hemodiyaliz Prasugreli temizlemez (~%98 albumin + kovalent trombosit bağlanması)!"
      />

      {/* 3. KİMLİK, ÖZET & ORDER KOPYALA KARTI */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${basePanel}`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                Antitrombotik · 3. Kuşak Geri Dönüşsüz P2Y₁₂ İnhibitörü (Tiyenopiridin)
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Effient® · Prasugel® · Prensor® 10 mg &amp; 5 mg Tablet
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                ISAR-REACT 5 · TRITON-TIMI 38 · ACCOAST · ASRA 7–10g
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Prasugrel{' '}
              <span className="text-base sm:text-lg font-semibold text-rose-600 dark:text-rose-400">
                (Effient® · Efient® · Prasugel® · Prensor®)
              </span>
            </h1>
            <p className={`text-sm leading-relaxed ${mutedText}`}>
              Tek basamaklı hepatik CYP3A4/CYP2B6 aktivasyonuyla <strong>30–60 dakika içinde</strong> güçlü, hızlı ve
              öngörülebilir P2Y₁₂ blokajı sağlayan (<strong>CYP2C19 polimorfizminden ve PPI/Omeprazolden etkilenmeyen!</strong>)
              3. kuşak geri dönüşsüz antiplatelet ajandır. <strong>ISAR-REACT 5 (NEJM 2019)</strong> kanıtıyla{' '}
              <strong>ESC 2023 kılavuzunda PCI’ya giden NSTE-ACS hastalarında Tikagrelora tercih edilen</strong> (Sınıf
              IIa) ajandır; ancak <strong>geçirilmiş inme/TIA’da mutlak kontrendikasyon</strong>,{' '}
              <strong>anjiyo öncesi ön-tedavi yasağı (ACCOAST)</strong>, <strong>&lt;60 kg / ≥75 yaş 5 mg sınırı</strong>{' '}
              ve <strong>en uzun perioperatif/nöraksiyel kesme süresi (7 / 7–10 gün)</strong> hayati önem taşır.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 shrink-0">
            <MonographCopyButton
              isDark={isDark}
              getText={buildOrderText}
              label="Aktif Hesap Order’ını Kopyala"
            />
            <span className={`text-[11px] ${mutedText}`}>
              ATC: B01AC22 · 1-Basamak CYP3A4/2B6 · Etki 7–10 Gün
            </span>
          </div>
        </div>

        {/* Hızlı Özet Kutu Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="p-3 rounded-xl border bg-teal-500/10 border-teal-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
              PCI Yükleme &amp; İdame
            </div>
            <div className="text-base font-black text-teal-800 dark:text-teal-200 mt-0.5">
              60 mg → 10 mg q24sa
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              &lt;60 kg veya seçilmiş ≥75y: 5 mg/gün!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-rose-500/10 border-rose-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
              3 Mutlak Kırmızı Çizgi
            </div>
            <div className="text-base font-black text-rose-800 dark:text-rose-200 mt-0.5">
              İnme/TIA · Anjiyo Öncesi
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Fibrinoliz &amp; AF+DOAC’ta KULLANMA!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
              En Uzun Kesme Süresi!
            </div>
            <div className="text-base font-black text-amber-800 dark:text-amber-200 mt-0.5">
              Cerrahi/KABG 7g · ASRA 7–10g
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              KABG &lt;7g = 4× majör kanama!
            </div>
          </div>
          <div className="p-3 rounded-xl border bg-indigo-500/10 border-indigo-500/30">
            <div className="text-[10px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Farmakolojik Üstünlük
            </div>
            <div className="text-base font-black text-indigo-800 dark:text-indigo-200 mt-0.5">
              CYP2C19 &amp; PPI Bağımsız!
            </div>
            <div className={`text-[11px] mt-0.5 ${mutedText}`}>
              Acil kanamada 2 Ü Plt (&gt;6 sa) etkilidir
            </div>
          </div>
        </div>
      </div>

      {/* 4. ETKİ MEKANİZMASI & 1-BASAMAK ADME AKORDEONU */}
      <div className="space-y-4">
        <MechanismOfActionBlock
          isDark={isDark}
          sectionId="prs-moa"
          sectionTitle="Etki Mekanizması: Hızlı 1-Basamaklı Biyoaktivasyon & Güçlü Geri Dönüşsüz P2Y₁₂ Blokajı"
          summary="Klopidogrelin aksine Prasugrel karaciğerde inaktif yolağa (%85 CES1 kaybı) sapmaz: bağırsak/plazma esterazlarıyla hızla tiyolakton ara ürüne çevrilir ve tek bir hepatik CYP3A4/CYP2B6 oksidasyonuyla aktif tiyol metaboliti R-138727’yi oluşturur. Bu sayede 30–60 dk içinde %70–80 düzeyinde çok güçlü ve öngörülebilir P2Y₁₂ inhibisyonu sağlar."
          pillars={[
            {
              title: '1. CYP2C19 & PPI Darboğazı Yok (Hızlı & Tutarlı Aktivasyon)',
              detail:
                'Aktivasyon ağırlıklı CYP3A4 ve CYP2B6 üzerinden tek basamakta ilerler; CYP2C19 genetik polimorfizmlerinden (*2/*3) ve Omeprazol/Esomeprazol gibi PPI’lardan klinik olarak etkilenmez!',
            },
            {
              title: '2. Güçlü Kovalent P2Y₁₂ Blokajı (7–10 Gün · Maksimum Antitrombotik Etki)',
              detail:
                'Aktif metabolit R-138727, trombosit P2Y₁₂ ADP reseptörüne kovalent bağlanarak GPIIb/IIIa aktivasyonunu trombosit ömrü boyunca kalıcı durdurur — TRITON-TIMI 38’de stent trombozunu Klopidogrele göre %52 azaltmıştır!',
            },
            {
              title: '3. Güçlü Blokajın Bedeli: Artmış Kanama & 7–10 Günlük Toparlanma',
              detail:
                'Daha derin trombosit inhibisyonu nedeniyle hem espontane/KABG kanama riski Klopidogrelden yüksektir hem de normal hemostazın dönüşü 7–10 gün sürer (ASRA 7–10 gün, cerrahi/KABG ≥7 gün kesme zorunluluğu!).',
            },
          ]}
        />

        {/* Genişletilebilir ADME Akordeonu */}
        <div className={`rounded-2xl border overflow-hidden scroll-mt-20 ${basePanel}`}>
          <button
            type="button"
            onClick={() => setShowAdmeDetails((v) => !v)}
            aria-expanded={showAdmeDetails}
            className={`w-full px-5 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
              isDark ? 'hover:bg-slate-800/70' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-teal-500 shrink-0" />
              <span className="text-sm font-bold">
                Detaylı Farmakokinetik (ADME): 30 dk Pik (R-138727), &lt;60 kg Maruziyet Artışı &amp; Diyalizlenmezlik
              </span>
            </div>
            {showAdmeDetails ? (
              <ChevronUp className="w-4 h-4 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 shrink-0" />
            )}
          </button>

          {showAdmeDetails && (
            <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-teal-600 dark:text-teal-400 mb-1">
                  A — Hızlı Emilim (Pik ~30 dk · ≥%79 Emilim)
                </div>
                Oral emilimi ≥%79’dur; <strong>60 mg yükleme</strong> sonrası aktif metabolit R-138727 yalnızca{' '}
                <strong>~30 dakikada</strong> pik yapar (Klopidogrelin 2–4 saatine karşı!). Yüksek yağlı öğün Tmax’ı
                0,5’ten 1,5 saate uzatsa da toplam AUC değişmez; AKS’de IV Morfin emilimi geciktirebilir.
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  D — &lt;60 kg Maruziyet Artışı &amp; ~%98 Albumin Bağlanması
                </div>
                Aktif metabolit R-138727 serum albuminine <strong>~%98</strong> bağlanır ve hemodiyalizle temizlenmez.{' '}
                <strong>Vücut ağırlığı &lt;60 kg</strong> hastalarda 10 mg/gün ile aktif metabolit AUC’si ~%30–40
                yükseldiğinden kanamayı önlemek için <strong>5 mg/gün</strong> idame zorunludur!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                  M — Esteraz (hCE2) → Tek Basamak CYP3A4 / CYP2B6
                </div>
                Değişmemiş Prasugrel plazmada saptanmaz; bağırsak duvarında hızla tiyolaktona hidrolize olup
                karaciğerde <strong>CYP3A4 &amp; CYP2B6</strong> (daha az CYP2C9/2C19) ile aktif R-138727’ye dönüşür.
                Güçlü CYP3A4 inhibitörleri (Ketokonazol) Cmax’ı düşürse de toplam AUC ve antiplatelet etkiyi klinik
                anlamda bozmaz!
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="font-bold text-rose-600 dark:text-rose-400 mb-1">
                  E — Eliminasyon (R-138727 t½ ~7 sa · Trombosit 7–10 Gün)
                </div>
                İnaktif metabolitlerin ~%68’i idrar, ~%27’si feçesle atılır. Dolaşımdaki serbest aktif metabolit
                ~4–6 saat içinde klinik olarak temizlendiğinden acil kanamada ≥6 saat sonra verilen taze trombositler
                etkindir!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. KONTRENDİKASYONLAR */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="prs-contra"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'GEÇİRİLMİŞ HERHANGİ BİR İNME (İskemik veya Hemorajik) veya GEÇİCİ İSKEMİK ATAK (TIA) ÖYKÜSÜ — FDA Kutu Uyarısı & EMA SmPC! (TRITON-TIMI 38: net klinik ZARAR!).',
          'Aktif patolojik kanama (aktif GİS ülser kanaması, intrakraniyal kanama, retroperitoneal kanama vb.).',
          'Ağır karaciğer yetmezliği (Child-Pugh C — EMA ve Türkiye SmPC kontrendikasyonu!).',
          'Prasugrel veya yardımcı maddelere aşırı duyarlılık / anafilaksi veya geçmiş tiyenopiridin ilişkili TTP öyküsü.',
        ]}
        relativeTitle="Kesin Kaçınılması Gereken Senaryolar & Relatif Kontrendikasyonlar"
        relativeItems={[
          'NSTE-ACS’de koroner anatomi bilinmeden (anjiyografi öncesi) ön-tedavi — ESC 2023 Sınıf III ZARAR (ACCOAST: 2× majör/KABG kanaması!).',
          'Yaş ≥75: TRITON-TIMI 38’de fatal/ICH kanama artışı nedeniyle rutin ÖNERİLMEZ (yalnızca çok yüksek iskemik riskte 5 mg/gün!).',
          'Vücut ağırlığı <60 kg: 10 mg/gün KULLANILMAZ — mutlaka 5 mg/gün idameye inilir!',
          'Konservatif (PCI yapılmayan) AKS (TRILOGY ACS), STEMI fibrinolizi ve AF + Oral Antikoagülan (DOAC/Varfarin) kombinasyonu → Klopidogrel seçin!',
          'Planlanan elektif cerrahi/KABG (<7 gün içinde) veya planlanan spinal/epidural nöraksiyel blok (<7–10 gün içinde)!',
        ]}
        clinicalNote="ASRA 2018 & ESAIC 2022 Kesin Kuralı: Prasugrel, tüm oral P2Y₁₂ inhibitörleri içinde EN UZUN nöraksiyel kesme süresine sahiptir — spinal/epidural ponksiyon ve derin blok için EN AZ 7–10 GÜN önceden kesilmelidir!"
      />

      {/* 6. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="prs-indications"
        title="Klinik Endikasyonlar & Kanıta Dayalı Doz Rejimleri (ESC 2023 · ISAR-REACT 5 · TRITON-TIMI 38)"
        subtitle="Prasugrel yalnızca PCI ile yönetilen AKS hastalarının ilacıdır — hasta ve zamanlama seçimi her şeydir!"
        icon={<BookOpen className="w-5 h-5 text-teal-500 shrink-0" />}
        defaultOpen={false}
      >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs leading-relaxed">
            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-teal-700 dark:text-teal-300">
                  1. NSTE-ACS → PCI (Anatomi Görüldükten Sonra · ESC Sınıf IIa!)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  60 mg → 10 / 5 mg
                </span>
              </div>
              <p className={mutedText}>
                <strong>ISAR-REACT 5 (NEJM 2019):</strong> PCI’ya giden AKS hastalarında Prasugrel, Tikagrelora göre
                1 yıllık ölüm/MI/inme bileşik sonlanımını anlamlı azalttı (%6,9 vs %9,3) ve majör kanama artışı yapmadı!
                <strong> ESC 2023:</strong> NSTE-ACS’de anjiyo sonrası PCI kararı verilince Prasugrel Tikagrelora tercih
                edilir (inme/TIA öyküsü yoksa!).
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-rose-700 dark:text-rose-300">
                  2. STEMI Primer PCI (TRITON-TIMI 38)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300">
                  60 mg → 10 / 5 mg
                </span>
              </div>
              <p className={mutedText}>
                Primer PCI planlanan STEMI’de <strong>60 mg tek yükleme</strong> (+ Aspirin 150–300 mg yükleme → 75–100
                mg/gün idame), ardından günde tek doz <strong>10 mg</strong> (kilo &lt;60 kg ise <strong>5 mg</strong>).
                Diyabetik ve yüksek stent trombozu riskli STEMI olgularında özellikle güçlü koruma sağlar.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-indigo-700 dark:text-indigo-300">
                  3. Klopidogrel Direnci / Stent Trombozu veya Tikagrelor Dispnesi
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/15 text-indigo-700 dark:text-indigo-300">
                  60 / 10 mg Geçiş
                </span>
              </div>
              <p className={mutedText}>
                CYP2C19 yavaş metabolizörlerde, Klopidogrel altında stent trombozu gelişenlerde veya Tikagrelora bağlı
                tolere edilemeyen dispne/bradikardi yaşayan PCI hastalarında (inme/TIA öyküsü yoksa!) günde tek doz
                Prasugrel ideal geçiş seçeneğidir.
              </p>
            </div>

            <div className={`p-4 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-black text-amber-700 dark:text-amber-300">
                  4. Doz Azaltımı (&lt;60 kg &amp; Seçilmiş ≥75 Yaş)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  5 mg Günde 1 Kez
                </span>
              </div>
              <p className={mutedText}>
                60 mg yükleme sonrası idame <strong>&lt;60 kg</strong> hastalarda mutlaka <strong>5 mg/gün</strong>’e
                düşürülür. <strong>≥75 yaş</strong> hastalarda rutin kullanılmaz; çok yüksek trombotik riskte
                zorunluysa 5 mg/gün + Pantoprazol 40 mg/gün ile yakın kanama takibi yapılır.
              </p>
            </div>
          </div>
      </MonographAccordionSection>

      {/* 7. 4 SEKMELİ ETKİLEŞİMLİ HESAPLAYICI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="prs-calc"
        title="Prasugrel Uygunluk, ASRA 2018 (7–10g) & P2Y₁₂ Geçiş Hesaplayıcısı"
        subtitle="TRITON-TIMI 38 / ACCOAST / ISAR-REACT 5 kırmızı çizgi kilidi, KABG 7 gün kuralı & P2Y₁₂ switching"
        icon={
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
            <HeartPulse className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
      >
        <div className="flex items-center justify-end mb-4">
          <MonographCopyButton
            isDark={isDark}
            getText={buildOrderText}
            label="Order Kopyala"
          />
        </div>

          {/* Sekmeler */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
            {[
              { id: 'eligibility_dose' as CalcTab, label: '1. Uygunluk & Doz', icon: Syringe },
              { id: 'periop_asra' as CalcTab, label: '2. Perioperatif & ASRA', icon: Activity },
              { id: 'switch_safety' as CalcTab, label: '3. P2Y₁₂ Geçiş (Switch)', icon: ShieldAlert },
              { id: 'p2y12_compare' as CalcTab, label: '4. P2Y₁₂ Kıyaslama', icon: Scale },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    active
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: UYGUNLUK & DOZ */}
          {activeTab === 'eligibility_dose' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">1. Klinik Senaryo</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'nste_post_angio_pci' as ClinicalSetting, label: 'NSTE-ACS (Anjiyo Sonrası PCI)' },
                      { id: 'stemi_pci' as ClinicalSetting, label: 'STEMI Primer PCI' },
                      { id: 'nste_pre_angio' as ClinicalSetting, label: 'NSTE-ACS (Anjiyo Öncesi!)' },
                      { id: 'med_fib_af' as ClinicalSetting, label: 'Medikal / Fibrinoliz / AF+OAC' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSetting(s.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-bold ${
                          setting === s.id
                            ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label
                  className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${
                    priorStrokeTia
                      ? 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                      : isDark
                        ? 'bg-slate-950/50 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={priorStrokeTia}
                    onChange={(e) => setPriorStrokeTia(e.target.checked)}
                    className="mt-0.5 accent-rose-600"
                  />
                  <div>
                    <div className="font-black">Geçirilmiş İnme (İskemik/Hemorajik) veya TIA Öyküsü Var!</div>
                    <div className="text-[11px] opacity-80">FDA Kutu Uyarısı — MUTLAK KONTRENDİKASYON</div>
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor={`${uniqueId}-prsage`} className="block text-xs font-bold mb-1">
                      Yaş:{' '}
                      <span className={isOver75Yr ? 'text-rose-600 dark:text-rose-400' : 'text-teal-600 dark:text-teal-400'}>
                        {patientAge} yaş {isOver75Yr ? '(≥75!)' : ''}
                      </span>
                    </label>
                    <input
                      id={`${uniqueId}-prsage`}
                      type="range"
                      min={30}
                      max={92}
                      step={1}
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      className="w-full accent-rose-600"
                    />
                  </div>
                  <div>
                    <label htmlFor={`${uniqueId}-prswt`} className="block text-xs font-bold mb-1">
                      Ağırlık:{' '}
                      <span className={isUnder60Kg ? 'text-amber-600 dark:text-amber-400' : 'text-teal-600 dark:text-teal-400'}>
                        {patientWeightKg} kg {isUnder60Kg ? '(<60 kg!)' : ''}
                      </span>
                    </label>
                    <input
                      id={`${uniqueId}-prswt`}
                      type="range"
                      min={40}
                      max={135}
                      step={1}
                      value={patientWeightKg}
                      onChange={(e) => setPatientWeightKg(Number(e.target.value))}
                      className="w-full accent-teal-600"
                    />
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div
                  className={`p-4 rounded-xl border-2 space-y-1.5 ${
                    elig.tone === 'emerald'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                      : elig.tone === 'amber'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100'
                        : 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                  }`}
                >
                  <div className="text-sm font-black">{elig.headline}</div>
                  <div className="text-xs font-black px-2.5 py-1 rounded-lg bg-black/10 dark:bg-white/10 inline-block">
                    {elig.dose}
                  </div>
                  <p className="text-xs leading-relaxed">{elig.detail}</p>
                </div>

                <div className={`p-3 rounded-xl border text-xs ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <strong>PPI &amp; CYP2C19 Notu:</strong> Prasugrel Omeprazol/Esomeprazol ile klinik etkileşime girmez;
                  ancak DAPT’ta GİS kanaması riski yüksek olduğundan <strong>Pantoprazol 40 mg/gün</strong> eklenmesi
                  ESC 2023 Sınıf I önerisidir!
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERİOPERATİF & ASRA 2018 (7–10 GÜN!) */}
          {activeTab === 'periop_asra' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">1. Stent Zamanlaması</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'no_stent_or_6m' as StentWindow, label: 'Stent Yok / >6 Ay' },
                      { id: 'des_1_6m' as StentWindow, label: '1–6 Ay DES' },
                      { id: 'fresh_stent_lt1m' as StentWindow, label: '<1 Ay Taze Stent!' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStentWindow(s.id)}
                        className={`p-2 rounded-xl border text-xs font-bold ${
                          stentWindow === s.id
                            ? 'bg-teal-500/15 border-teal-500 text-teal-800 dark:text-teal-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5">2. Cerrahi / Klinik Durum</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'elective_noncardiac' as SurgeryMode, label: 'Elektif Cerrahi' },
                      { id: 'elective_cabg' as SurgeryMode, label: 'Elektif KABG' },
                      { id: 'urgent_bleed' as SurgeryMode, label: 'Acil / Majör Kanama' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSurgeryMode(m.id)}
                        className={`p-2 rounded-xl border text-xs font-bold ${
                          surgeryMode === m.id
                            ? 'bg-rose-500/15 border-rose-500 text-rose-800 dark:text-rose-200'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {surgeryMode === 'urgent_bleed' && (
                  <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <label htmlFor={`${uniqueId}-prshrs`} className="block text-xs font-bold mb-1">
                      Son Prasugrel Dozundan Geçen Süre:{' '}
                      <span className={pltEffective ? 'text-emerald-500' : 'text-rose-500'}>
                        {hoursSinceLastDose} saat
                      </span>
                    </label>
                    <input
                      id={`${uniqueId}-prshrs`}
                      type="range"
                      min={1}
                      max={48}
                      step={1}
                      value={hoursSinceLastDose}
                      onChange={(e) => setHoursSinceLastDose(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                )}

                <label className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs ${isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <input
                    type="checkbox"
                    checked={neuraxialPlanned}
                    onChange={(e) => setNeuraxialPlanned(e.target.checked)}
                    className="accent-rose-600"
                  />
                  <span className="font-bold">Spinal / Epidural Nöraksiyel Blok veya Derin Pleksus Bloku Planlanıyor</span>
                </label>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div
                  className={`p-4 rounded-xl border-2 space-y-1.5 ${
                    periopVerdict.tone === 'emerald'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                      : periopVerdict.tone === 'amber'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-100'
                        : 'bg-rose-500/15 border-rose-500 text-rose-900 dark:text-rose-100'
                  }`}
                >
                  <div className="text-xs font-black uppercase opacity-80">ESC 2022 Cerrahi / Kanama Kararı</div>
                  <div className="text-sm font-black">{periopVerdict.headline}</div>
                  <p className="text-xs leading-relaxed">{periopVerdict.detail}</p>
                </div>

                {neuraxialPlanned && (
                  <div className="p-3.5 rounded-xl border bg-rose-500/15 border-rose-500/40 text-xs leading-relaxed text-rose-900 dark:text-rose-100 space-y-1">
                    <div className="font-black">ASRA 2018 / ESAIC 2022 Nöraksiyel Blok Kuralı (EN UZUN BEKLEME!):</div>
                    <p>
                      • <strong>Ponksiyon Öncesi:</strong> Son Prasugrel dozundan <strong>EN AZ 7–10 GÜN</strong>{' '}
                      geçmeden spinal/epidural ponksiyon veya derin sinir bloku <strong>KESİNLİKLE YAPILMAZ!</strong>
                    </p>
                    <p>
                      • <strong>Kateter Çekilimi &amp; Yeniden Başlama:</strong> Aktif Prasugrel altında epidural kateter
                      çekilmez! Kateter çekildikten sonra hızlı başlangıçlı olduğu için yeniden başlamadan önce en az{' '}
                      <strong>≥6 saat</strong> beklenmeli ve nörolojik muayene normal olmalıdır!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: P2Y12 GEÇİŞ (SWITCHING) */}
          {activeTab === 'switch_safety' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold mb-1.5">Geçiş Yönü (ESC 2023 Switching)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'clop_to_pras' as SwitchDirection, label: 'Klopidogrel → Prasugrel' },
                      { id: 'tica_to_pras' as SwitchDirection, label: 'Tikagrelor → Prasugrel' },
                      { id: 'pras_to_clop' as SwitchDirection, label: 'Prasugrel → Klopidogrel' },
                      { id: 'pras_to_tica' as SwitchDirection, label: 'Prasugrel → Tikagrelor' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSwitchDir(s.id)}
                        className={`p-2.5 rounded-xl border text-xs font-bold ${
                          switchDir === s.id
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : isDark
                              ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAcutePhase(true)}
                    className={`py-2 rounded-xl border text-xs font-bold ${
                      isAcutePhase
                        ? 'bg-rose-600 text-white border-rose-600'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Akut Faz (AKS / İlk 30 Gün)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAcutePhase(false)}
                    className={`py-2 rounded-xl border text-xs font-bold ${
                      !isAcutePhase
                        ? 'bg-teal-600 text-white border-teal-600'
                        : isDark
                          ? 'bg-slate-950/50 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    Kronik / Stabil Faz (&gt;30 Gün)
                  </button>
                </div>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {switchInfo.title}
                </div>
                <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="text-sm font-black text-rose-600 dark:text-rose-400">{switchInfo.regimen}</div>
                </div>
                <div className="p-3 rounded-xl border bg-amber-500/10 border-amber-500/30 text-xs">
                  <strong>Klinik Not:</strong> {switchInfo.note}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: P2Y12 KIYASLAMA */}
          {activeTab === 'p2y12_compare' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className={isDark ? 'bg-slate-800/80 text-slate-200' : 'bg-slate-100 text-slate-800'}>
                    <th className="p-2.5 rounded-tl-xl font-black">Özellik</th>
                    <th className="p-2.5 font-black text-rose-600 dark:text-rose-400">Prasugrel (Effient®)</th>
                    <th className="p-2.5 font-black">Tikagrelor (Brilinta®)</th>
                    <th className="p-2.5 rounded-tr-xl font-black">Klopidogrel (Plavix®)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-2.5 font-bold">Aktivasyon &amp; Başlangıç</td>
                    <td className="p-2.5 font-semibold text-teal-600 dark:text-teal-400">1 basamak (CYP3A4/2B6) · 30–60 dk</td>
                    <td className="p-2.5">Aktif ilaç · 30–60 dk</td>
                    <td className="p-2.5">2 basamak CYP2C19 · 2–6 sa</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Cerrahi / ASRA Kesme</td>
                    <td className="p-2.5 font-black text-rose-600 dark:text-rose-400">Cerrahi 7g · ASRA 7–10g!</td>
                    <td className="p-2.5">Cerrahi 3–5g · ASRA 5–7g</td>
                    <td className="p-2.5">Cerrahi 5g · ASRA 5–7g</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">NSTE-ACS Ön-Tedavi</td>
                    <td className="p-2.5 font-bold text-rose-600 dark:text-rose-400">YASAK (Anjiyo sonrası · ACCOAST!)</td>
                    <td className="p-2.5">Rutin önerilmez (ESC 2023)</td>
                    <td className="p-2.5">Gecikmiş anjiyoda seçilebilir</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">İnme / TIA Öyküsü</td>
                    <td className="p-2.5 font-black text-rose-600 dark:text-rose-400">MUTLAK KONTRENDİKE!</td>
                    <td className="p-2.5">İskemik inmede kullanılabilir</td>
                    <td className="p-2.5">Kullanılır (minör inmede 1. seçim)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Acil Plt Transfüzyonu</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">ETKİLİ (&gt;4–6 sa sonra!)</td>
                    <td className="p-2.5 text-rose-600 dark:text-rose-400">Zayıf/etkisiz (serbest ilaç bağlar!)</td>
                    <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-bold">ETKİLİ (&gt;4–6 sa sonra!)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">Özel Yan Etki / Avantaj</td>
                    <td className="p-2.5">Günde 1× · Dispne/bradikardi YOK · ISAR-REACT 5 lideri</td>
                    <td className="p-2.5">Günde 2× · Dispne &amp; bradikardi · ASA ≤100 mg</td>
                    <td className="p-2.5">AF+DOAC · Fibrinoliz · HBR · Omeprazol YASAK</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
      </MonographAccordionSection>

      {/* 8. TÜRKİYE PİYASA FORMLARI */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="prs-tr"
        preparations={[
          {
            name: 'Effient® / Efient® / Prasugel® / Prensor® 10 mg Film Tablet',
            presentation: '10 mg film kaplı tablet (28 tabletlik blister)',
            concentration: '10 mg / tablet (Standart erişkin idame · Yükleme: 6× 10 mg = 60 mg)',
            saltOrBaseNote:
              'Günde tek doz 10 mg (≥60 kg ve <75 yaş). Kırılmadan yutulur; yemekle veya aç karnına alınabilir.',
            alertLevel: 'standard',
          },
          {
            name: 'Effient® / Prasugel® 5 mg Film Tablet (Düşük Doz Formu)',
            presentation: '5 mg film kaplı tablet',
            concentration: '5 mg / tablet (<60 kg & seçilmiş ≥75 yaş idame formu!)',
            saltOrBaseNote:
              'Vücut ağırlığı <60 kg olan tüm hastalarda idame 5 mg/gün olmalıdır! 10 mg tablet bölünmeye uygun film tablet olmadığından doğrudan 5 mg formu reçete edilmelidir.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Entübe / Primer PCI NG Yükleme: 60 mg (6× 10 mg tablet) ince ezilip 20–30 mL su içinde süspanse edilerek NG/OG sondadan verilebilir (CRUSH çalışmasında ezilmiş Prasugrel 30 dk’da çok daha hızlı trombosit blokajı sağlamıştır!).',
          'Parenteral (IV) Form Yoktur: Yalnızca oral/enteral uygulanır.',
        ]}
        concentrationTrapWarning={'10 mg vs 5 mg & İNME ÖYKÜSÜ TUZAĞI: (1) Hastanın <60 kg olduğunu atlayıp 10 mg/gün vermek majör kanama riskini katlar! (2) Hastanın yıllar önceki bir TIA öyküsünü sorgulamadan Prasugrel başlamak fatal intrakraniyal kanamaya yol açabilir!'}
      />

      {/* 9. UYGULAMA YOLU & ENTERAL UYUMLULUK */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="prs-compat"
        accessRequirement="peripheral-ok"
        accessSummary="Oral (veya primer PCI/entübe hastada ezilmiş NG/OG sonda) yoldan günde tek doz uygulanır; gıdalardan klinik olarak etkilenmez. Parenteral IV formu yoktur."
        phRange="Oral Film Tablet (Prasugrel Hidroklorür)"
        osmolalityNote="CRUSH çalışmasına göre STEMI primer PCI’da ezilmiş Prasugrel tabletler bütün yutmaya göre daha hızlı emilim ve daha erken P2Y₁₂ blokajı sağlar."
        compatibleDiluents={[
          'Oral / NG Sonda: 20–30 mL içme suyu (ezilerek hemen uygulanır)',
        ]}
        stabilityNote="Neme duyarlıdır — orijinal blisterinde oda sıcaklığında (<25–30 °C) saklayın; nem çekmesini önlemek için blisteri kullanımdan hemen önce açın."
        ySiteCompatible={[
          'Tüm PPI’lar (Pantoprazol 40 mg/gün 1. tercih; Omeprazol ile klinik etkileşimi YOKTUR!)',
          'Aspirin 75–100 mg/gün (DAPT)',
        ]}
        ySiteIncompatible={[
          'Oral Antikoagülanlar (DOAC / Varfarin) — aşırı majör kanama riski nedeniyle kombine edilmez (AF+PCI’da Klopidogrel seçin!)',
        ]}
        extravasationProtocol="Oral ajandır. Hayatı tehdit eden kanamada son dozdan ≥4–6 saat geçmişse 2 ünite aferez trombosit transfüzyonu (+ TXA 1 g IV) hemostazı etkin düzeltir."
      />

      {/* 10. ORGAN YETMEZLİĞİ MATRİSİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="prs-organ"
        renalSummary="eGFR ≥30 mL/dk’da doz ayarı gerekmez (10 mg / <60 kg: 5 mg); eGFR <30 / ESRD / IHD’de klinik deneyim kısıtlı ve kanama riski çok yüksektir (diyalizlenmez — Klopidogrel tercih edilir!)."
        renalDetails={[
          'eGFR ≥30 mL/dk: Standart doz (+ Pantoprazol 40 mg/gün).',
          'eGFR <30 / IHD / CRRT: ~%98 protein bağlı & kovalent trombosit bağlanması nedeniyle diyalizlenmez; üremik kanama riski çok yüksektir.',
        ]}
        hepaticSummary="Child-Pugh A–B’de PK korunur (varis kanaması dikkat!); Child-Pugh C ağır karaciğer yetmezliğinde EMA/TR SmPC’ye göre MUTLAK KONTRENDİKEDİR!"
        hepaticDetails={[
          'Child-Pugh A–B: Standart doz (portal hipertansiyon/varis kanaması açısından dikkat & PPI!).',
          'Child-Pugh C: Ağır koagülopati ve masif varis kanaması nedeniyle KONTRENDİKEDİR!',
        ]}
        {...STANDALONE_ORGAN_PART2['prasugrel']}
      />

      {/* 11. GERİATRİ (≥75 YAŞ) & AĞIRLIK (<60 kg) DOZ ÖLÇEKLEME */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="prs-special"
        geriatricReductionBadge="YAŞ ≥75: RUTİN ÖNERİLMEZ! (Zorunluysa 5 mg/gün)"
        geriatricPoints={[
          'TRITON-TIMI 38 Yaş ≥75 Uyarısı: 75 yaş ve üstünde fatal ve intrakraniyal kanama artışı nedeniyle net klinik yarar kaybolmuştur — rutin kullanılmaz (Klopidogrel [POPular AGE] veya Tikagrelor tercih edilir!).',
          'İstisnai Kullanım: Çok yüksek trombotik riskte (diyabet, tekrarlayan MI, inme öyküsü YOK) hekim kararıyla zorunluysa mutlaka 5 mg/gün azaltılmış idame + Pantoprazol 40 mg/gün verilir.',
        ]}
        obesityWeightScalarBadge="<60 kg → 5 mg/gün! · ≥60 kg → 10 mg/gün"
        obesityPoints={[
          'Kritik Alt Sınır (<60 kg): 60 kg altındaki erişkinlerde aktif metabolit maruziyeti ~%30–40 arttığından 10 mg yerine 5 mg/gün idame zorunludur (60 mg yükleme değişmez!).',
          'Morbid Obezite (BMI ≥35–40): Klopidogrelde obezitede yanıt azalabilirken, Prasugrel 10 mg/gün obez hastalarda dahi güçlü ve tutarlı P2Y₁₂ inhibisyonu sağlar (10 mg üzerine çıkılmaz!).',
        ]}
        clinicalNote="<60 kg doz azaltımı eşiğini kontrol etmek ve ağırlık değerlendirmesi için:"
      />

      <ObesityDosingScaler
        isDark={isDark}
        drugName="Prasugrel"
        recommendedScalar="TBW"
        secondaryScalar={{ type: 'IBW', context: '<60 kg: 5 mg/gün · ≥60 kg: 10 mg/gün' }}
        rationale="Prasugrelde vücut ağırlığı kritik eşiktir: <60 kg erişkinlerde 5 mg/gün, ≥60 kg (<75 yaş) erişkinlerde 10 mg/gün idame uygulanır; obezitede 10 mg üzerine çıkılmaz."
        currentWeightKg={patientWeightKg}
        onApplyWeight={(w) => setPatientWeightKg(Math.max(40, Math.min(135, Math.round(w))))}
      />

      {/* 12. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="prs-preg"
        pregnancySummary="İnsan gebelik verisi yok denecek kadar azdır; yalnızca anne yararı potansiyel fetal riski açıkça aşıyorsa değerlendirilir. Doğum ve epidural anestezi güvenliği için planlı doğumdan EN AZ 7–10 GÜN ÖNCE kesilmelidir!"
        pregnancyDetails={[
          'Gebelikte nadir AKS/stent durumunda daha fazla klinik deneyime sahip Klopidogrel tercih edilir; Prasugrel kullanılıyorsa doğum öncesi 7–10 gün kesme planı şarttır.',
        ]}
        lactationSummary="İnsan sütüne geçişi bilinmemektedir (hayvan sütünde tespit edilmiştir) — emzirme döneminde KAÇINILMASI önerilir!"
        lactationDetails={[
          'Yenidoğanda geri dönüşsüz trombosit inhibisyonu ve kanama riski nedeniyle emziren annelerde kullanılmamalıdır.',
        ]}
      />

      {/* 13. YAN ETKİLER */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="prs-adr"
        items={[
          {
            title: 'Majör, Hayatı Tehdit Eden & Fatal Kanamalar (KABG · İntrakraniyal · GİS)',
            incidenceOrSeverity: 'En Önemli Risk · Klopidogrelden Yüksek (TRITON-TIMI 38)',
            detail:
              'İnme/TIA öyküsü, ≥75 yaş, <60 kg (10 mg alırsa) ve <7 gün kesilen KABG’de (4× kanama!) risk dramatik yükselir. DAPT’ta mutlaka Pantoprazol 40 mg/gün ekleyin!',
            tone: 'rose',
          },
          {
            title: 'Trombotik Trombositopenik Purpura (TTP)',
            incidenceOrSeverity: 'Çok Nadir · Ölümcül Acil!',
            detail:
              'İlk 2 hafta içinde gelişebilen MAHA (şistosit), ağır trombositopeni, nörolojik bulgu, böbrek yetmezliği ve ateş — ilacı DERHAL kes, trombosit VERME, acil plazmaferez (PEX) başlat!',
            tone: 'rose',
          },
          {
            title: 'Hipersensitivite & Anjiyoödem (Tiyenopiridin Çapraz Reaksiyonu)',
            incidenceOrSeverity: 'Nadir · Klopidogrel Alerjisinde Dikkat',
            detail:
              'Klopidogrele karşı anjiyoödem veya ağır hematolojik reaksiyon geliştirenlerde çapraz reaktivite bildirilmiştir (bu durumda tiyenopiridin olmayan Tikagrelor tercih edilir!).',
            tone: 'amber',
          },
          {
            title: 'Hipertansiyon, Baş Ağrısı, Sırt Ağrısı & Epistaksis / Ekimoz',
            incidenceOrSeverity: 'Hafif–Orta · Sık',
            detail:
              'Tikagrelordan farklı olarak adenozin aracılı DİSPNE veya ventriküler bradikardi/duraklama YAPMAZ (hasta uyumu bu nedenle çok iyidir!).',
            tone: 'indigo',
          },
        ]}
      />

      {/* 14. ÖZEL KLİNİK DİKKAT NOKTALARI */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="prs-cautions"
        items={[
          {
            title: 'ISAR-REACT 5 (NEJM 2019): Neden ESC 2023’te PCI’ya Giden NSTE-ACS’de 1. Tercih?',
            detail:
              '4.018 AKS hastasını içeren açık etiketli landmark ISAR-REACT 5 çalışmasında Prasugrel stratejisi (NSTE-ACS’de anjiyo sonrası yükleme!), Tikagrelora kıyasla 1 yıllık ölüm/MI/inmeyi anlamlı azalttı (%6,9 vs %9,3) ve majör kanamada artış göstermedi. Ayrıca günde 1× kullanım ve dispne olmaması uyumu artırır!',
          },
          {
            title: 'ACCOAST Dersleri: NSTE-ACS’de Anjiyografi Öncesi Neden ASLA Verilmez?',
            detail:
              'NSTE-ACS hastalarının önemli bir bölümü anjiyografide KABG’ye veya medikal izleme yönlendirilir. Anjiyo öncesi 60 mg Prasugrel yüklenen hastalar acil/erken KABG’ye gittiğinde 7 gün bekleyemeyip katastrofik cerrahi kanama yaşar — bu yüzden NSTE-ACS’de anjiyo masasında PCI kararı kesinleşince yüklenir!',
          },
          {
            title: 'Acil Ameliyatta Trombosit Transfüzyonu Ne Zaman Etkilidir?',
            detail:
              'Prasugrelin aktif metaboliti R-138727 son dozdan ~4–6 saat sonra dolaşımdan temizlendiğinden, ≥6 saat sonrasında verilen 2 ünite aferez trombosit transfüzyonu hemostazı belirgin düzeltir (Tikagrelordan önemli perioperatif üstünlük!).',
          },
          {
            title: 'Prasugrel vs Tikagrelor: Aspirin Dozu & Dispne Farkı',
            detail:
              'Tikagrelorda >100 mg Aspirin etkinliği bozarken Prasugrelde bu etkileşim yoktur (yine de GİS güvenliği için 75–100 mg ASA standarttır!). Ayrıca Prasugrel dispne, ürik asit artışı veya sinoatriyal duraklama yapmaz.',
          },
        ]}
      />

      {/* 15. DERİN FARMAKODİNAMİ & ORGAN SİSTEMİ ETKİLERİ */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="prs-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Tek Basamaklı Biyoaktivasyon (R-138727) & Yüksek Potensli Kovalent P2Y₁₂ Blokajı',
          summary:
            'Prasugrel, Klopidogrelin iki temel farmakolojik zaafını (CES1 inaktivasyon kaybı ve 2 basamaklı CYP2C19 darboğazı) yapısal olarak ortadan kaldıracak şekilde tasarlanmıştır:',
          points: [
            'Esteraz Avantajı (CES1 Kaybı Yok): Klopidogrelin %85’i CES1 ile çöpe giderken, Prasugrel bağırsak esterazıyla (hCE2) doğrudan aktif yolağın ara ürünü olan tiyolaktona dönüşür — biyoyararlanım verimi katbekat yüksektir!',
            'CYP2C19’dan Bağımsız Hızlı Pik (30 dk): Tek basamaklı CYP3A4/CYP2B6 dönüşümü sayesinde 60 mg yükleme sonrası 30–60 dk içinde %70–80 trombosit inhibisyonuna ulaşılır ve Klopidogrel direnci (HTPR) görülmez.',
            'Kovalent Ömür Boyu Blokaj: P2Y₁₂ reseptörünü disülfid köprüsüyle kalıcı kapattığından ve blokaj oranı çok yüksek olduğundan, trombosit havuzunun güvenli hemostatik düzeye dönmesi 7–10 gün sürer.',
          ],
        }}
        intracellularSignaling={{
          title: 'Derin P2Y₁₂ – Gi Blokajı, GPIIb/IIIa Kilitlenmesi & Kanama Eşikleri',
          summary:
            'Yüksek düzeyde sürekli P2Y₁₂ inhibisyonunun trombüs koruması ve kanama dengesi üzerindeki etkileri:',
          points: [
            'Tam ADP Amplifikasyon Kesintisi: İntraselüler cAMP’yi yüksek ve VASP’ı fosforile tutarak trombosit agregasyonunu ve pıhtı stabilizasyonunu Klopidogrelden çok daha derin bastırır.',
            'Serebrovasküler Kırılganlık (İnme/TIA Kontrendikasyonu): Geçirilmiş inme/TIA hastalarının frajil serebral mikrovaskülatüründe bu derin geri dönüşsüz trombosit inhibisyonu intrakraniyal kanamayı tetikler.',
            'Kısa Serbest Metabolit Penceresi: Kovalent bağlanma nedeniyle serbest R-138727 kandan ~4–6 saatte ayrılır — acil kanamada taze trombosit transfüzyonunun önünü açar.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Koroner Stentler & Akut Koroner Sendrom',
            tissueTarget: 'Trombosit P2Y₁₂ · Yüksek Riskli Koroner Plak/Stent',
            accent: 'teal',
            points: [
              'TRITON-TIMI 38’de stent trombozunu %52, MI’yı %24 azaltmış; ISAR-REACT 5’te PCI’ya giden AKS’de Tikagrelora üstün gelmiştir.',
              'Özellikle diyabetik AKS ve karmaşık PCI olgularında çok güçlü antitrombotik koruma sunar.',
            ],
          },
          {
            systemTitle: 'Nöraksiyel Kanal & Kardiyak/Non-Kardiyak Cerrahi',
            tissueTarget: 'Epidural Venöz Pleksus · Sternotomi / Cerrahi Yatak',
            accent: 'rose',
            points: [
              'Oral P2Y₁₂’ler arasında EN UZUN kesme süresi gerekir: Cerrahi/KABG ≥7 gün, ASRA nöraksiyel blok 7–10 gün!',
              '<7 gün kesilen KABG’de majör kanama Klopidogrelin ~4 katına çıkar.',
            ],
          },
          {
            systemTitle: 'Serebral Vaskülatür (<60 kg & ≥75 Yaş Kırılganlığı)',
            tissueTarget: 'Serebral Mikrovaskülatür · GİS Mukoza',
            accent: 'amber',
            points: [
              'Geçirilmiş inme/TIA’da MUTLAK KONTRENDİKE; ≥75 yaşta rutin önerilmez; <60 kg’da 5 mg/gün şarttır.',
              'DAPT’ta GİS kanaması riski yüksek olduğundan Pantoprazol 40 mg/gün eklenmelidir.',
            ],
          },
          {
            systemTitle: 'Solunum & İleti Sistemi (Tikagrelordan Farkı!)',
            tissueTarget: 'Adenozin Yolağı Etkilenmez',
            accent: 'indigo',
            points: [
              'Tikagrelorun aksine ENT-1 adenozin geri alımını bloke ETMEZ — dispne, bradikardi/AV blok veya hiperürisemi/gut tetiklemez!',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Prasugrel + Aspirin (DAPT) & De-eskalasyon Stratejisi',
          summary:
            'Kardiyolojide ilk aylarda yüksek iskemik korumayı sağlayıp uzun dönemde kanama riskini azaltan güncel stratejiler:',
          points: [
            'İlk 1–3 Ay Prasugrel + ASA → De-eskalasyon (HOST-REDUCE-POLYTECH-ACS / TROPICAL-ACS): Seçilmiş yüksek kanama riskli hastalarda 1 ay sonra 5 mg Prasugrele veya Klopidogrele inilmesi kanamayı azaltır.',
            'AF + DOAC Gelişirse: Hasta Prasugrel alırken yeni atriyal fibrilasyon gelişip DOAC başlanacaksa Prasugrel kesilip 24 saat sonra Klopidogrel 75 mg/gün’e geçilir!',
          ],
        }}
        clinicalPearls={[
          '3 Saniyelik Güvenlik Kontrolü: Prasugrel yazmadan önce 3 şeyi sor → (1) İnme/TIA var mı? (2) Anjiyo yapıldı mı? (3) Yaş ≥75 veya kilo <60 kg mı?',
          'ASRA 7–10 Gün & KABG 7 Gün: Klopidogrelin 5 günüyle KARIŞTIRMA — Prasugrelde en az 7 gün (nöraksiyel 7–10 gün) beklenir!',
          'Tikagrelor Dispnesinde Altın Alternatif: Tikagrelorda nefes darlığı yaşayan (inme öyküsü olmayan) PCI hastasını günde 1× Prasugrele geçirmek uyumu kurtarır!',
          'Acil Kanamada >6 Saat Sonra 2 Ünite Aferez Trombosit Etkin: Aktif metabolit kandan temizlendiği için taze trombositler hemostazı geri getirir!',
        ]}
      />

      {/* 16. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKLAR */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="prs-refs"
        drugName="Prasugrel"
        drugsComUrl="https://www.drugs.com/drug-interactions/prasugrel.html"
        medscapeUrl="https://reference.medscape.com/drug-interactionchecker"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Oral Antikoagülanlar (Varfarin · Apiksaban · Rivaroksaban · Dabigatran · Edoksaban) — Triple Terapi',
            mechanism: 'Güçlü Geri Dönüşsüz P2Y₁₂ Blokajı + Sistemik Antikoagülasyon',
            clinicalEffect:
              'Hayatı tehdit eden majör GİS ve intrakraniyal kanama riskinde aşırı artış (ESC 2023 Sınıf III!).',
            management:
              'AF + PCI gibi OAC gereken hastalarda Prasugrel KULLANMAYIN — Klopidogrel 75 mg/gün’e geçin!',
          },
          {
            severity: 'D',
            agent: 'NSAİİ’ler (İbuprofen · Tenoksikam · Diklofenak) & Sistemik Kortikosteroidler / SSRI’lar',
            mechanism: 'Sinerjik Gastrik Mukozal Hasar + Derin Trombosit İnhibisyonu',
            clinicalEffect:
              'Majör üst/alt GİS kanaması riskinde 3–6 kat artış.',
            management:
              'Kronik NSAİİ’den kaçının (Parasetamol seçin); tüm DAPT hastalarına Pantoprazol 40 mg/gün ekleyin.',
          },
          {
            severity: 'C',
            agent: 'IV Morfin / Fentanil (AKS Yüklemesi Sırasında)',
            mechanism: 'Opioid Aracılı Gastrik Boşalma Gecikmesi',
            clinicalEffect:
              '60 mg Prasugrel yüklemesinin pik etki süresi 30 dk’dan 1–2+ saate gecikebilir.',
            management:
              'Primer PCI’da tabletlerin ezilerek verilmesi (CRUSH protokolü) veya IV Kangrelor değerlendirilebilir.',
          },
          {
            severity: 'C',
            agent: 'CYP2B6 Substratları (Efavirenz · Siklofosfamid · Bupropion · Metadon)',
            mechanism: 'Prasugrelin Zayıf CYP2B6 İnhibisyonu',
            clinicalEffect:
              'Siklofosfamid/Bupropion aktif metabolitinde hafif azalma potansiyeli (çoğunlukla klinik önemi sınırlı).',
            management:
              'Klinik yanıtı izleyin; PPI’larla (Omeprazol dahil) KLİNİK ANLAMLI ETKİLEŞİMİ YOKTUR!',
          },
        ]}
        references={[
          {
            authors: 'Wiviott SD, Braunwald E, McCabe CH, et al. (TRITON-TIMI 38 Investigators)',
            title: 'Prasugrel versus Clopidogrel in Patients with Acute Coronary Syndromes',
            journal: 'New England Journal of Medicine',
            year: 2007,
            note: 'Prasugrelin stent trombozu ve MI’yı azaltırken inme/TIA öyküsünde net zarar, ≥75 yaş / <60 kg’da ve KABG’de yüksek kanama riskini ortaya koyan landmark RKÇ.',
          },
          {
            authors: 'Schüpke S, Neumann FJ, Menichelli M, et al. (ISAR-REACT 5 Trial Investigators)',
            title: 'Ticagrelor or Prasugrel in Patients with Acute Coronary Syndromes',
            journal: 'New England Journal of Medicine',
            year: 2019,
            note: 'PCI’ya giden AKS hastalarında Prasugrelin Tikagrelora kıyasla ölüm/MI/inme bileşik sonlanımında üstün olduğunu kanıtlayan landmark RKÇ.',
          },
          {
            authors: 'Montalescot G, Bolognese L, Dudek D, et al. (ACCOAST Investigators)',
            title: 'Pretreatment with Prasugrel in Non-ST-Segment Elevation Acute Coronary Syndromes',
            journal: 'New England Journal of Medicine',
            year: 2013,
            note: 'NSTE-ACS’de koroner anjiyografi öncesi Prasugrel ön-tedavisinin iskemik yarar sağlamayıp majör kanamayı 2× artırdığını kanıtlayan çalışma.',
          },
          {
            authors: 'Byrne RA, Rossello X, Coughlan JJ, et al. (ESC Task Force)',
            title: '2023 ESC Guidelines for the management of acute coronary syndromes',
            journal: 'European Heart Journal',
            year: 2023,
            note: 'NSTE-ACS’de PCI sonrası Prasugrelin Tikagrelora tercihi (Sınıf IIa), ön-tedavi yasağı (Sınıf III) ve P2Y₁₂ geçiş protokolleri.',
          },
          {
            authors: 'Halvorsen S, Mehilli J, Cassese S, et al. (ESC Task Force)',
            title: '2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery',
            journal: 'European Heart Journal',
            year: 2022,
            note: 'Elektif non-kardiyak cerrahi ve KABG öncesi Prasugrelin en az 7 gün kesilmesi kılavuzu.',
          },
          {
            authors: 'Horlocker TT, Vandermeuelen E, Kopp SL, et al.',
            title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy (ASRA 4th Edition)',
            journal: 'Regional Anesthesia & Pain Medicine',
            year: 2018,
            note: 'Spinal/epidural blok ve derin pleksus bloku öncesi Prasugrelin 7–10 gün kesilmesi kuralı.',
          },
          {
            authors: 'Roe MT, Armstrong PW, Fox KAA, et al. (TRILOGY ACS Investigators)',
            title: 'Prasugrel versus Clopidogrel for Acute Coronary Syndromes without Revascularization',
            journal: 'New England Journal of Medicine',
            year: 2012,
            note: 'Medikal (PCI dışı) yönetilen NSTE-ACS’de Prasugrelin Klopidogrele üstünlük göstermediğini ortaya koyan çalışma.',
          },
        ]}
      />

      {/* Alt Bilgi Şeridi */}
      <div className={`flex items-center justify-between text-[11px] px-2 ${mutedText}`}>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          ESC 2022/2023 · ISAR-REACT 5 · TRITON-TIMI 38 · ACCOAST · ASRA 2018 ile Uyumlu
        </span>
        <span className="flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-rose-500" />
          Antitrombotik · 3. Kuşak P2Y₁₂ İnhibitörü
        </span>
      </div>
    </div>
  );
};
