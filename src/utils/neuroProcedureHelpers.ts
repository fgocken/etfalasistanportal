import { ProcedureDefinition } from '../types/procedures';
import { getProcedureIndispensableRules } from './procedureRulesParser';

/* =========================================================================
   1. NÖROŞİRÜRJİ ALT GRUP SINIFLANDIRMASI (4 ANATOMİK / KLİNİK GRUP)
   ========================================================================= */

export type NeuroSubgroupId =
  | 'cranial_vascular_trauma'
  | 'skull_base_posterior_csf'
  | 'functional_epilepsy_pain'
  | 'spine';

export interface NeuroSubgroupMeta {
  id: NeuroSubgroupId;
  tabLabel: string;
  sectionTitle: string;
  description: string;
}

export const NEURO_SUBGROUPS: NeuroSubgroupMeta[] = [
  {
    id: 'cranial_vascular_trauma',
    tabLabel: 'Kraniyal & Vasküler',
    sectionTitle: 'Kraniyal Vasküler, Tümör & Travma',
    description: 'Anevrizma, AVM, bypass, tümör, uyanık kraniyotomi, travma, KSDH, İSK ve girişimsel nöroradyoloji'
  },
  {
    id: 'skull_base_posterior_csf',
    tabLabel: 'Kafa Tabanı & BOS',
    sectionTitle: 'Kafa Tabanı, Posterior Fossa & BOS',
    description: 'MVD, hipofiz, kafa tabanı, Chiari, CPA tümörü, pediatrik kraniyosinostoz/myelomeningosel, şant & ETV'
  },
  {
    id: 'functional_epilepsy_pain',
    tabLabel: 'Fonksiyonel & Ağrı',
    sectionTitle: 'Fonksiyonel, Stereotaktik & Ağrı',
    description: 'DBS, stereotaksi, epilepsi, VNS, spastisite (SDR), SCS/intratekal pompa ve trigeminal nevralji'
  },
  {
    id: 'spine',
    tabLabel: 'Spinal Cerrahi',
    sectionTitle: 'Spinal Cerrahi — Kraniyokaudal',
    description: 'Üst servikalden lumbosakral/pelvik enstrümantasyon ve 360° kombine omurga cerrahilerine'
  }
];

const NEURO_SUBGROUP_MAP: Record<string, NeuroSubgroupId> = {
  // Kraniyal Vasküler, Tümör & Travma (11 protokol)
  'craniotomy-aneurysm': 'cranial_vascular_trauma',
  'craniotomy-vascular-malformation': 'cranial_vascular_trauma',
  'craniotomy-ec-ic-bypass': 'cranial_vascular_trauma',
  'craniotomy-embolectomy': 'cranial_vascular_trauma',
  'craniotomy-tumor': 'cranial_vascular_trauma',
  'awake-craniotomy': 'cranial_vascular_trauma',
  'craniotomy-trauma': 'cranial_vascular_trauma',
  'endovascular-mechanical-thrombectomy': 'cranial_vascular_trauma',
  'endovascular-aneurysm-coiling-embolization': 'cranial_vascular_trauma',
  'chronic-subdural-hematoma-mma': 'cranial_vascular_trauma',
  'intracerebral-hemorrhage-evacuation': 'cranial_vascular_trauma',

  // Kafa Tabanı, Posterior Fossa & BOS (9 protokol)
  'craniotomy-microvascular-decompression': 'skull_base_posterior_csf',
  'bifrontal-craniotomy-csf-leak': 'skull_base_posterior_csf',
  'transsphenoidal-pituitary-resection': 'skull_base_posterior_csf',
  'craniocervical-decompression-chiari': 'skull_base_posterior_csf',
  'ventricular-shunt-procedures': 'skull_base_posterior_csf',
  'posterior-fossa-cpa-tumor': 'skull_base_posterior_csf',
  'pediatric-craniosynostosis': 'skull_base_posterior_csf',
  'pediatric-myelomeningocele-repair': 'skull_base_posterior_csf',
  'endoscopic-third-ventriculostomy': 'skull_base_posterior_csf',

  // Fonksiyonel, Stereotaktik & Ağrı (7 protokol)
  'stereotactic-neurosurgery': 'functional_epilepsy_pain',
  'stereotactic-dbs-pallidotomy-thalamotomy': 'functional_epilepsy_pain',
  'epilepsy-surgery': 'functional_epilepsy_pain',
  'vagal-nerve-stimulation': 'functional_epilepsy_pain',
  'surgery-for-spasticity': 'functional_epilepsy_pain',
  'surgical-analgesics-scs-itp-mcs': 'functional_epilepsy_pain',
  'percutaneous-trigeminal-neuralgia': 'functional_epilepsy_pain',

  // Spinal Cerrahi — Kraniyokaudal (11 protokol)
  'anterior-upper-cervical-fusion': 'spine',
  'posterior-upper-cervical-fusion': 'spine',
  'anterior-mid-lower-cervical-fusion': 'spine',
  'posterior-mid-lower-cervical-fusion': 'spine',
  'anterior-cervicothoracic-spine-surgery': 'spine',
  'anterior-thoracic-spine-surgery': 'spine',
  'posterior-thoracic-spine-surgery': 'spine',
  'anterior-lumbar-lumbosacral-spine-surgery': 'spine',
  'posterior-lumbar-spine-surgery': 'spine',
  'posterior-lumbar-fusion-instrumentation': 'spine',
  'combined-anterior-posterior-thoracolumbar-instrumentation': 'spine'
};

function toTrLower(text?: string | null): string {
  return (text || '').toLocaleLowerCase('tr-TR');
}

function collectProcedureText(proc: ProcedureDefinition): string {
  const parts: string[] = [
    proc.id,
    proc.name,
    proc.shortCode || '',
    proc.categoryTag || '',
    proc.description,
    ...(proc.indications || []),
    proc.bleedingProfile?.estimatedBloodLoss || '',
    proc.bleedingProfile?.riskLevelLabel || '',
    proc.bleedingProfile?.crossMatchRequirement || '',
    ...(proc.anesthesiaTechniques?.primary || []),
    ...(proc.anesthesiaTechniques?.alternative || []),
    proc.anesthesiaTechniques?.clinicalRationale || '',
    proc.anesthesiaTechniques?.notes || '',
    ...(proc.intraoperative?.monitoring || []),
    ...(proc.intraoperative?.vascularAccess || []),
    proc.intraoperative?.patientPosition || '',
    ...(proc.intraoperative?.patientPositionDetails || []),
    ...(proc.intraoperative?.anesthesiaManagement || []),
    ...(proc.intraoperative?.airwayManagement || []),
    ...(proc.intraoperative?.criticalSurgicalStages || []),
    ...(proc.intraoperative?.emergenceNotes || [])
  ];
  return toTrLower(parts.join(' \n '));
}

export function getNeuroSubgroup(proc: ProcedureDefinition): NeuroSubgroupId {
  if (NEURO_SUBGROUP_MAP[proc.id]) {
    return NEURO_SUBGROUP_MAP[proc.id];
  }

  const hay = toTrLower(`${proc.id} ${proc.categoryTag || ''} ${proc.name}`);
  if (
    /spine|spinal|cervical|servikal|thoracic|torasik|lumbar|lomber|lumbosakral|füzyon|fusion|enstrümantasyon|omurga|acdf|alif|tlif|plif/.test(
      hay
    )
  ) {
    return 'spine';
  }
  if (
    /stereotaktik|stereotactic|dbs|epilepsi|epilepsy|vagal|vns|spastisite|spasticity|rizotomi|trigeminal|scs|pompa|fonksiyonel|ağrı/.test(
      hay
    )
  ) {
    return 'functional_epilepsy_pain';
  }
  if (
    /kafa tabanı|skull base|posterior fossa|cpa|köşe tümör|hipofiz|pituitary|transsfenoidal|chiari|kraniyoservikal|şant|shunt|bos|csf|ventrikülostomi|etv|mikrovasküler|mvd|kraniyosinostoz|craniosynostosis|myelomeningosel|myelomeningocele/.test(
      hay
    )
  ) {
    return 'skull_base_posterior_csf';
  }
  return 'cranial_vascular_trauma';
}

/* =========================================================================
   2. KLİNİK MİKRO-ETİKETLER & RİSK FİLTRELERİ
   ========================================================================= */

export type ClinicalTagId =
  | 'ionm'
  | 'kurarsiz'
  | 'awake_mac'
  | 'prone_povl'
  | 'vae'
  | 'acil_rsi'
  | 'olv'
  | 'pediatrik'
  | 'masif_kanama'
  | 'niv_anjiyo';

export type ClinicalTagTone =
  | 'violet'
  | 'amber'
  | 'sky'
  | 'orange'
  | 'cyan'
  | 'rose'
  | 'blue'
  | 'teal'
  | 'fuchsia';

export interface ClinicalTag {
  id: ClinicalTagId;
  label: string;
  tone: ClinicalTagTone;
}

export type NeuroRiskFilterId =
  | 'ionm_kurarsiz'
  | 'awake_mac'
  | 'prone_povl'
  | 'high_bleeding'
  | 'acil_rsi'
  | 'vae'
  | 'pediatrik';

export interface NeuroRiskFilterMeta {
  id: NeuroRiskFilterId;
  label: string;
}

export const NEURO_RISK_FILTERS: NeuroRiskFilterMeta[] = [
  { id: 'ionm_kurarsiz', label: 'İONM / Kürarsız' },
  { id: 'awake_mac', label: 'Uyanık / MAC' },
  { id: 'prone_povl', label: 'Prone / POVL' },
  { id: 'high_bleeding', label: 'Yüksek / Masif Kanama' },
  { id: 'acil_rsi', label: 'Acil / RSI' },
  { id: 'vae', label: 'VAE Riski' },
  { id: 'pediatrik', label: 'Pediatrik' }
];

function extractAllClinicalTagIds(proc: ProcedureDefinition): ClinicalTagId[] {
  const tags: ClinicalTagId[] = [];
  const fullText = collectProcedureText(proc);
  const titleAndCat = toTrLower(`${proc.id} ${proc.name} ${proc.categoryTag || ''} ${proc.shortCode || ''}`);
  const primaryText = toTrLower((proc.anesthesiaTechniques?.primary || []).join(' '));
  const monitoringText = toTrLower((proc.intraoperative?.monitoring || []).join(' '));
  const mgmtText = toTrLower(
    [
      ...(proc.intraoperative?.anesthesiaManagement || []),
      proc.anesthesiaTechniques?.notes || '',
      proc.anesthesiaTechniques?.clinicalRationale || '',
      ...(proc.anesthesiaTechniques?.indispensableRules || []).map((r) => `${r.title} ${r.content}`)
    ].join(' ')
  );
  const positionText = toTrLower(
    [
      proc.intraoperative?.patientPosition || '',
      ...(proc.intraoperative?.patientPositionDetails || [])
    ].join(' ')
  );
  const airwayText = toTrLower((proc.intraoperative?.airwayManagement || []).join(' '));

  // 1. Masif Kanama
  if (
    proc.bleedingProfile?.riskLevel === 'massive_potential' ||
    /katastrofik|masif kanama/.test(toTrLower(proc.bleedingProfile?.riskLevelLabel))
  ) {
    tags.push('masif_kanama');
  }

  // 2. NİV / Anjiyo (Endovasküler / Girişimsel Nöroradyoloji)
  if (
    /endovasküler|endovascular|anjiyo|trombektomi|thrombectomy|koilleme|coiling|embolizasyon|embolization|mma\b|nöroradyoloji/.test(
      titleAndCat
    )
  ) {
    tags.push('niv_anjiyo');
  }

  // 3. OLV (Çift Lümenli Tüp / Tek Akciğer Ventilasyonu)
  if (/çift lümenli tüp|\bdlt\b|\bolv\b|tek akciğer ventilasyon/.test(`${primaryText} ${airwayText} ${mgmtText}`)) {
    tags.push('olv');
  }

  // 4. Uyanık / MAC (Dikkat: "<0.5 MAC sevofluran" ile karıştırılmaz!)
  const isAwakeMac =
    /uyanık kraniyotomi|awake|asleep-awake-asleep|monitörize anestezi bakımı|\(mac\)|\bmac\s*\+|\bmac\s*\//.test(
      `${titleAndCat} ${primaryText}`
    ) ||
    /uyanık testleme|uyanık hasta|uyanık faz/.test(primaryText);
  if (isAwakeMac) {
    tags.push('awake_mac');
  }

  // 5. Pediatrik
  if (
    proc.id.startsWith('pediatric-') ||
    /pediatrik|yenidoğan|bebek|infant|kraniyosinostoz|myelomeningosel|miyelomeningosel|serebral palsi|selektif dorsal rizotomi|ventriküler şant|endoskopik üçüncü ventrikülostomi/.test(
      `${titleAndCat} ${toTrLower(proc.description)}`
    )
  ) {
    tags.push('pediatrik');
  }

  // 6. Acil / RSI
  if (
    /hızlı seri indüksiyon|\brsi\b/.test(`${primaryText} ${airwayText} ${mgmtText}`) ||
    /travma|trauma|embolectomy|embolektomi|thrombectomy|trombektomi|intracerebral-hemorrhage|intraserebral hematom|ultra-acil/.test(
      `${titleAndCat} ${toTrLower(proc.averageDuration)}`
    )
  ) {
    tags.push('acil_rsi');
  }

  // 7. İONM (MEP / SSEP / BAEP / EMG / ECoG / MER)
  if (
    /\bionm\b|\bi̇onm\b|nöromonitörizasyon|tcmep|\bmep\b|\bssep\b|\bbaep\b|\becog\b|mikroelektrot kaydı|\bmer\b|kranial sinir monitöriz|fasiyal sinir.*emg|kökçük stimülasyonu/.test(
      `${monitoringText} ${primaryText} ${mgmtText}`
    )
  ) {
    tags.push('ionm');
  }

  // 8. Kürarsız (İdame kas gevşetici kullanılmaması)
  if (
    /kürarsız|kas gevşetici kullanılmaz|kas gevşeticisiz|idame(?:de)?\s+(?:kas gevşetici|nmb)\s*(?:kullanılmaz|yasak|verilmez|kesil)|nöromusküler bloker(?:ler)?\s*(?:idamede\s*)?(?:kullanılmaz|yasak|verilmez|kesil)|ek kas gevşetici verilmez|sıfır kas gevşetici|nmb\s+kesil|entübasyon sonrası kas gevşetici.*(?:verilmez|yapılmaz|yasak|kullanılmaz)|kas gevşeticiden kaçın/.test(
      mgmtText
    )
  ) {
    tags.push('kurarsiz');
  }

  // 9. Prone / POVL
  if (/\bprone\b|yüzüstü|\bpovl\b|iskemik optik nöropati/.test(`${positionText} ${fullText.includes('povl') ? 'povl' : ''}`)) {
    tags.push('prone_povl');
  }

  // 10. VAE (Venöz Hava Embolisi)
  if (
    /venöz hava embolisi|\bvae\b|prekordiyal doppler|hava embolisi/.test(
      `${monitoringText} ${positionText} ${mgmtText} ${toTrLower((proc.intraoperative?.criticalSurgicalStages || []).join(' '))}`
    )
  ) {
    tags.push('vae');
  }

  return tags;
}

const CLINICAL_TAG_DEFS: Record<ClinicalTagId, { label: string; tone: ClinicalTagTone }> = {
  masif_kanama: { label: 'Masif Kanama', tone: 'rose' },
  niv_anjiyo: { label: 'NİV/Anjiyo', tone: 'fuchsia' },
  olv: { label: 'OLV', tone: 'blue' },
  awake_mac: { label: 'Uyanık/MAC', tone: 'sky' },
  pediatrik: { label: 'Pediatrik', tone: 'teal' },
  acil_rsi: { label: 'Acil/RSI', tone: 'rose' },
  ionm: { label: 'İONM', tone: 'violet' },
  kurarsiz: { label: 'Kürarsız', tone: 'amber' },
  prone_povl: { label: 'Prone/POVL', tone: 'orange' },
  vae: { label: 'VAE', tone: 'cyan' }
};

export function getClinicalTags(proc: ProcedureDefinition, maxCount = 3): ClinicalTag[] {
  const ids = extractAllClinicalTagIds(proc);
  return ids.slice(0, maxCount).map((id) => ({
    id,
    label: CLINICAL_TAG_DEFS[id].label,
    tone: CLINICAL_TAG_DEFS[id].tone
  }));
}

export function matchesNeuroRiskFilter(proc: ProcedureDefinition, filterId: NeuroRiskFilterId): boolean {
  const ids = extractAllClinicalTagIds(proc);
  switch (filterId) {
    case 'ionm_kurarsiz':
      return ids.includes('ionm') || ids.includes('kurarsiz');
    case 'awake_mac':
      return ids.includes('awake_mac');
    case 'prone_povl':
      return ids.includes('prone_povl');
    case 'high_bleeding':
      return (
        proc.bleedingProfile?.riskLevel === 'massive_potential' ||
        proc.bleedingProfile?.riskLevel === 'high'
      );
    case 'acil_rsi':
      return ids.includes('acil_rsi');
    case 'vae':
      return ids.includes('vae');
    case 'pediatrik':
      return ids.includes('pediatrik');
    default:
      return true;
  }
}

/* =========================================================================
   3. KISA SÜRE, AKILLI POZİSYON VE AKILLI ALTIN STANDART AYRIŞTIRICILARI
   ========================================================================= */

/**
 * Uzun faz kırılımlarını ("4 - 7 saat (Anestezi indüksiyonu...)") temizleyerek
 * kartlar için okunaklı kısa süre üretir.
 */
export function getShortDuration(duration?: string): string {
  if (!duration) return 'Değişken';
  let short = duration.split('(')[0].trim();
  short = short.replace(/\s*[,;—–-]\s*$/, '').trim();
  short = short.replace(/\bdakika\b/gi, 'dk');
  if (short.length > 22) {
    const semi = short.split(/[;,]/)[0].trim();
    if (semi.length > 0 && semi.length <= 22) {
      return semi;
    }
    return truncateOnWordBoundary(short, 20);
  }
  return short || 'Değişken';
}

/**
 * Pozisyon metnindeki 7 klasik hatayı çözer:
 * - "kontralateral" kelimesi ASLA "Lateral Dekübit" olarak algılanmaz.
 * - Supin / Prone / Park-Bench / Yarı-Oturur / Oturur, Ters Trendelenburg'dan önce gelir.
 * - 360° / çift aşamalı / çoklu pozisyonları net özetler.
 * - Mayfield / Çerçeve / Jackson gibi fiksasyon ipuçlarını kompakt ekler.
 */
export function getSmartPosition(pos?: string): string {
  if (!pos) return 'Supin';
  const raw = pos.trim();
  const clean = toTrLower(raw);

  // "kontralateral" kelimesini lateral kontrolü öncesinde çıkar
  const cleanNoContra = clean.replace(/kontralateral/g, '');

  const hasSupin = /\bsupin(?:e)?\b|sırtüstü/.test(clean);
  const hasProne = /\bprone\b|yüzüstü/.test(clean);
  const hasParkBench = /park[\s-]?bench/.test(clean);
  const hasSemiSitting = /yarı[\s-]?oturur|semi[\s-]?fowler|beach[\s-]?chair/.test(clean);
  const hasSitting = !hasSemiSitting && /\boturur\b|sitting/.test(clean);
  const hasLateral =
    /(?:^|[\s(/,–-])lateral(?!\s*tilt)/.test(cleanNoContra) || /dekübit/.test(cleanNoContra);
  const hasLitotomi = /litotomi/.test(clean);
  const hasReverseTrend = /(ters|reverse)\s*trendelenburg/.test(clean);
  const hasTrend = !hasReverseTrend && /trendelenburg/.test(clean);

  // Fiksasyon / masa ipucu
  let fixation = '';
  if (/mayfield/.test(clean)) {
    fixation = 'Mayfield';
  } else if (/jackson/.test(clean)) {
    fixation = 'Jackson';
  } else if (/çerçeve|leksell|crw|stereotaktik/.test(clean)) {
    fixation = 'Çerçeve';
  }

  // 1. Çift aşamalı (360° / Anterior -> Posterior) omurga veya iki fazlı cerrahiler
  const isDualStage =
    /çift aşamalı|iki aşamalı|360°|ardından|önce.*sonra|başlangıç.*intraoperatif/.test(clean);
  if (isDualStage) {
    if (hasProne && (hasSupin || hasLateral)) {
      return hasLateral && hasSupin ? '360° (Ant → Prone)' : hasLateral ? 'Lateral → Prone' : 'Supin → Prone';
    }
    if (hasSupin && hasSemiSitting) {
      return 'Supin → Yarı-Oturur';
    }
  }

  // 2. Çoklu alternatif pozisyonlar ("Supin veya Lateral", "Park-Bench veya Prone", vb.)
  const detected: string[] = [];
  if (hasParkBench) detected.push('Park-Bench');
  if (hasProne) detected.push('Prone');
  if (hasSemiSitting) detected.push('Yarı-Oturur');
  if (hasSitting) detected.push('Oturur');
  if (hasSupin) detected.push('Supin');
  if (hasLateral && !hasParkBench) {
    detected.push(/sol\s+lateral/.test(cleanNoContra) ? 'Sol Lateral' : 'Lateral');
  }
  if (hasLitotomi) detected.push('Litotomi');

  // Birden fazla ana pozisyon varsa (örn. "Supin / Lateral" veya "Supin / Prone")
  if (detected.length >= 2) {
    // Sırayı metindeki ilk geçiş sırasına göre diz ki ana pozisyon önde olsun
    const orderKey = (label: string): number => {
      switch (label) {
        case 'Park-Bench':
          return clean.search(/park[\s-]?bench/);
        case 'Prone':
          return clean.search(/\bprone\b|yüzüstü/);
        case 'Yarı-Oturur':
          return clean.search(/yarı[\s-]?oturur|semi[\s-]?fowler|beach[\s-]?chair/);
        case 'Oturur':
          return clean.search(/\boturur\b|sitting/);
        case 'Supin':
          return clean.search(/\bsupin(?:e)?\b|sırtüstü/);
        case 'Sol Lateral':
        case 'Lateral':
          return cleanNoContra.search(/(?:^|[\s(/,–-])lateral(?!\s*tilt)|dekübit/);
        case 'Litotomi':
          return clean.search(/litotomi/);
        default:
          return 9999;
      }
    };
    detected.sort((a, b) => orderKey(a) - orderKey(b));
    const combo = detected.slice(0, 2).join(' / ');
    return combo;
  }

  // 3. Tek bir ana pozisyon varsa (+ kompakt fiksasyon ipucu)
  if (detected.length === 1) {
    const primary = detected[0] === 'Lateral' ? 'Lateral Dekübit' : detected[0];
    if (fixation && `${primary} · ${fixation}`.length <= 22) {
      return `${primary} · ${fixation}`;
    }
    return primary;
  }

  // 4. Sadece Trendelenburg belirtilmişse (örn. Laparoskopik Kolesistektomi)
  if (hasReverseTrend) return 'Ters Trendelenburg';
  if (hasTrend) return 'Trendelenburg';

  const fallback = raw.split(',')[0].replace(/\(.*\)/g, '').trim();
  return truncateOnWordBoundary(fallback || 'Supin', 20);
}

/**
 * Parantez derinliği 0 iken ilk üst seviye ayırıcıyı bulur (parantez içini ASLA bölmez!).
 */
function splitAtTopLevel(text: string, separators: string[]): string {
  let depthParen = 0;
  let depthBracket = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '(') depthParen++;
    else if (ch === ')') depthParen = Math.max(0, depthParen - 1);
    else if (ch === '[') depthBracket++;
    else if (ch === ']') depthBracket = Math.max(0, depthBracket - 1);

    if (depthParen === 0 && depthBracket === 0) {
      for (const sep of separators) {
        if (text.startsWith(sep, i)) {
          return text.slice(0, i).trim();
        }
      }
    }
  }
  return text.trim();
}

function truncateOnWordBoundary(text: string, maxLen: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLen) return trimmed;
  const slice = trimmed.slice(0, maxLen - 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > Math.floor(maxLen * 0.55) ? slice.slice(0, lastSpace) : slice;
  // Kesme nedeniyle açık kalan parantez varsa sondaki eksik parantez grubunu temizle
  const openCount = (cut.match(/\(/g) || []).length;
  const closeCount = (cut.match(/\)/g) || []).length;
  let safe = cut.replace(/[,;:\-–—/\s]+$/, '').trim();
  if (openCount > closeCount) {
    const lastOpen = safe.lastIndexOf('(');
    if (lastOpen > 8) {
      safe = safe.slice(0, lastOpen).replace(/[,;:\-–—/\s]+$/, '').trim();
    } else {
      safe = `${safe})`;
    }
  }
  return `${safe}…`;
}

/**
 * Birincil anestezi tekniğinden parantez kırılması olmayan, başlık-satırına takılmayan
 * temiz "Altın Standart" metni üretir.
 */
export function getSmartGoldStandard(proc: ProcedureDefinition): string {
  const primaries = proc.anesthesiaTechniques?.primary || [];
  if (primaries.length === 0) return 'Genel Anestezi (GETA)';

  let raw = primaries[0].trim();

  // Başlık-only satırları atla (örn. DBS: "İki Aşamalı Anestezi Protokolü (Altın Standart):")
  if (raw.endsWith(':')) {
    const joinedRest = toTrLower(primaries.slice(1).join(' '));
    const hasAwakePhase = /uyanık|\bmac\b|monitörize anestezi/.test(joinedRest);
    const hasGetaPhase = /\bgeta\b|genel endotrakeal|genel anestezi/.test(joinedRest);
    if (hasAwakePhase && hasGetaPhase) {
      return 'Uyanık MAC → GETA (İki Aşamalı)';
    }
    const nextNonHeading = primaries.slice(1).find((line) => line.trim() && !line.trim().endsWith(':'));
    if (nextNonHeading) {
      raw = nextNonHeading.replace(/^\s*[-•*]\s*/, '').trim();
    }
  }

  // "X İçin: Y" kalıbında bağlam etiketini atıp teknik kısmını al
  const icinMatch = raw.match(/^[^:]{4,60}\bİçin:\s*(.+)$/i);
  if (icinMatch && icinMatch[1]) {
    raw = icinMatch[1].trim();
  }

  // Üst düzey (parantez dışı) em-dash / en-dash / tire ayırıcısından önce böl
  let clean = splitAtTopLevel(raw, [' — ', ' – ', ' - ']);

  // Eğer hâlâ üst düzey ": " varsa ve öncesi kısa bir teknik adıysa (örn. "Asleep-Awake-Asleep (AAA) Tekniği: Açılış...")
  const topColon = splitAtTopLevel(clean, [': ']);
  if (topColon.length >= 12 && topColon.length < clean.length && !/\bİçin$/i.test(topColon)) {
    clean = topColon;
  }

  // Sondaki iki noktayı kaldır
  clean = clean.replace(/:\s*$/, '').trim();

  // Uzun standart ifadeleri kompakt ve okunaklı hale getir
  clean = clean
    .replace(/Endotrakeal Genel Anestezi\s*\(TIVA\s*[-:]\s*Propofol\s*(?:&|ve|\+)\s*Remifentanil[^)]*\)/gi, 'GETA (TIVA: Propofol + Remifentanil)')
    .replace(/Genel Endotrakeal Anestezi\s*\(GETA\)/gi, 'GETA')
    .replace(/Endotrakeal Genel Anestezi\s*\(GETA\)/gi, 'GETA')
    .replace(/Endotrakeal Genel Anestezi/gi, 'GETA')
    .replace(/Hedef Kontrollü İnfüzyon\s*\[TCI\]/gi, 'TCI')
    .replace(/Monitörize Anestezi Bakımı\s*\(MAC\)/gi, 'MAC')
    .replace(/Ultrason Eşliğinde\s*/gi, 'USG ')
    .replace(/\s+VEYA\s+/g, ' veya ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return truncateOnWordBoundary(clean, 64);
}

/* =========================================================================
   4. 6 HÜCRELİ NÖROANESTEZİ HEDEF KOKPİTİ (5 SANİYELİK SALON ÖZETİ)
   ========================================================================= */

export type CockpitTone = 'teal' | 'sky' | 'amber' | 'rose' | 'violet' | 'emerald';

export interface NeuroCockpitCell {
  key: string;
  label: string;
  value: string;
  subValue?: string;
  tone: CockpitTone;
}

function extractMapTarget(text: string, proc: ProcedureDefinition): { value: string; subValue?: string } {
  const cppMatch = text.match(/CPP\s*(?:>|≥|>=)?\s*\d{2}(?:\s*[-–]\s*\d{2,3})?\s*mmHg/i);
  const mapMatch = text.match(/MAP\s*(?:>|≥|>=|<|≤)?\s*\d{2,3}(?:\s*[-–]\s*\d{2,3})?\s*mmHg/i);
  const sbpMatch = text.match(/(?:Sistolik\s*KB|SKB|SAB)\s*(?:<|≤|>|≥)?\s*\d{2,3}(?:\s*[-–]\s*\d{2,3})?\s*mmHg/i);

  if (mapMatch && cppMatch) {
    return { value: mapMatch[0].replace(/\s+/g, ' '), subValue: cppMatch[0].replace(/\s+/g, ' ') };
  }
  if (mapMatch) {
    return {
      value: mapMatch[0].replace(/\s+/g, ' '),
      subValue: sbpMatch ? sbpMatch[0].replace(/\s+/g, ' ') : 'Bazal ±%15–20 koruma'
    };
  }
  if (sbpMatch) {
    return {
      value: sbpMatch[0].replace(/\s+/g, ' '),
      subValue: cppMatch ? cppMatch[0].replace(/\s+/g, ' ') : 'Hipertansif pikten kaçın'
    };
  }
  if (cppMatch) {
    return { value: cppMatch[0].replace(/\s+/g, ' '), subValue: 'Normotansif perfüzyon' };
  }

  const subgroup = getNeuroSubgroup(proc);
  if (subgroup === 'spine') {
    return { value: 'MAP ≥80–85 mmHg', subValue: 'Spinal kord perfüzyonu' };
  }
  if (proc.id.includes('trauma') || proc.id.includes('hemorrhage')) {
    return { value: 'CPP 60–70 mmHg', subValue: 'SKB ≥100–110 / <140–160' };
  }
  return { value: 'Bazal ±%10–15', subValue: 'Serebral perfüzyon stabil' };
}

function extractCo2Target(text: string, tags: ClinicalTagId[]): { value: string; subValue?: string } {
  if (tags.includes('awake_mac') && !/entübasyon.*tiva|geta/.test(toTrLower(text))) {
    return { value: 'Spontan Solunum', subValue: 'Nazal EtCO₂ takibi' };
  }
  const paco2Match = text.match(/PaCO2\s*(?:hedefi\s*(?:kesin olarak\s*)?)?\d{2}\s*[-–]\s*\d{2}\s*mmHg/i);
  if (paco2Match) {
    const cleanVal = paco2Match[0].replace(/hedefi\s*(?:kesin olarak\s*)?/i, '').replace(/\s+/g, ' ');
    const isMildHyper = /30|32|33|34/.test(cleanVal);
    return {
      value: cleanVal.replace(/PaCO2/i, 'PaCO₂'),
      subValue: isMildHyper ? 'Hafif kontrollü hipokapni' : 'Sıkı normokapni'
    };
  }
  const etco2Match = text.match(/EtCO2\s*\d{2}\s*[-–]\s*\d{2}\s*mmHg/i);
  if (etco2Match) {
    return { value: etco2Match[0].replace(/EtCO2/i, 'EtCO₂'), subValue: 'ABG ile korelasyon' };
  }
  if (tags.includes('awake_mac')) {
    return { value: 'Normokapni / Spontan', subValue: 'Hiperkapni beyin şişmesi yapar' };
  }
  return { value: 'PaCO₂ 35–40 mmHg', subValue: 'Normokapni · ABG korele' };
}

function extractNmbIonmSummary(tags: ClinicalTagId[], fullText: string): { value: string; subValue: string; tone: CockpitTone } {
  if (tags.includes('awake_mac') && !tags.includes('ionm')) {
    return { value: 'Uyanık / MAC', subValue: 'NMB yok · Nörolojik test', tone: 'sky' };
  }
  if (tags.includes('ionm') && tags.includes('kurarsiz')) {
    return { value: 'İONM · Kürarsız', subValue: 'TIVA · İdamede NMB yasak', tone: 'violet' };
  }
  if (tags.includes('ionm')) {
    const hasMep = /\bmep\b|tcmep|emg|fasiyal|mer\b/.test(fullText);
    return {
      value: hasMep ? 'İONM (MEP/SSEP)' : 'İONM (SSEP/EEG)',
      subValue: hasMep ? 'TIVA · İdamede NMB kaçın' : 'TIVA / <0.5 MAC tercih',
      tone: 'violet'
    };
  }
  if (/derin nöromusküler|tof\s*0/.test(fullText)) {
    return { value: 'Derin NMB (TOF 0)', subValue: 'Mutlak hareketsizlik', tone: 'teal' };
  }
  return { value: 'Standart NMB + TOF', subValue: 'Ekstübasyon öncesi TOF ≥0.9', tone: 'teal' };
}

function extractBleedingSummary(proc: ProcedureDefinition): { value: string; subValue: string; tone: CockpitTone } {
  const bp = proc.bleedingProfile;
  if (!bp) {
    return { value: 'Minimal', subValue: 'Rutin hazırlık', tone: 'emerald' };
  }

  const rawEbl = bp.estimatedBloodLoss ? bp.estimatedBloodLoss.split('(')[0].trim() : '';
  const eblShort = rawEbl && rawEbl.length <= 22 ? rawEbl : bp.riskLevel === 'massive_potential' ? 'Masif Risk' : bp.riskLevel === 'high' ? 'Yüksek Risk' : bp.riskLevel === 'moderate' ? 'Orta Risk' : 'Düşük/Minimal';

  const cm = bp.crossMatchRequirement || '';
  const cmLower = toTrLower(cm);
  let prep = 'T&S yeterli';
  const esMatch = cm.match(/(\d+(?:\s*[-–]\s*\d+)?)\s*Ü(?:nite)?\s*(?:ES|Eritrosit)/i);
  if (esMatch) {
    prep = `${esMatch[1]} Ü ES Cross-Match`;
    if (/mtp|masif/i.test(cmLower)) prep += ' + MTP';
    else if (/cell[\s-]?saver/i.test(cmLower)) prep += ' + Cell-Saver';
  } else if (/masif|mtp/i.test(cmLower)) {
    prep = 'MTP & Cross-Match hazır';
  } else if (/cross[\s-]?match/i.test(cmLower) && !/gerekmez/i.test(cmLower)) {
    prep = 'Cross-Match hazır';
  } else if (/t&s|tip\s*&\s*screen/i.test(cmLower)) {
    prep = 'Tip & Screen (T&S)';
  }

  const tone: CockpitTone =
    bp.riskLevel === 'massive_potential' || bp.riskLevel === 'high'
      ? 'rose'
      : bp.riskLevel === 'moderate'
        ? 'amber'
        : 'emerald';

  return { value: eblShort, subValue: prep, tone };
}

function extractEmergenceSummary(proc: ProcedureDefinition, tags: ClinicalTagId[]): { value: string; subValue: string; tone: CockpitTone } {
  const emText = toTrLower(
    [
      ...(proc.intraoperative?.emergenceNotes || []),
      ...(proc.intraoperative?.airwayManagement || [])
    ].join(' ')
  );

  if (tags.includes('awake_mac') && !/faz\s*ii|genel anestezi/.test(toTrLower((proc.anesthesiaTechniques?.primary || []).join(' ')))) {
    return { value: 'Uyanık Takip', subValue: 'PACU / Nöro-YBÜ nöro-muayene', tone: 'emerald' };
  }
  if (/entübe olarak.*ybü|sedatize ve entübe|entübe.*devredilir|mekanik ventilasyon.*ybü/.test(emText)) {
    const canExtubateSelected = /masada ekstübasyon|seçilmiş|grade 1-2/.test(emText);
    return {
      value: canExtubateSelected ? 'Seçilmiş Ekstübasyon / YBÜ' : 'Entübe Nöro-YBÜ',
      subValue: canExtubateSelected ? 'Ağır olguda entübe transfer' : 'Ödem / hemodinami takibi',
      tone: 'amber'
    };
  }
  if (/öksürük|ıkınma|bucking|pürüzsüz/.test(emText)) {
    return {
      value: 'Pürüzsüz Masada Ekstüb.',
      subValue: 'Öksürük/HT yok · Erken nöro-muayene',
      tone: 'emerald'
    };
  }
  return {
    value: 'Erken Nöro-Muayene',
    subValue: 'Normotermik & hemodinamik stabil',
    tone: 'emerald'
  };
}

export function extractNeuroCockpit(proc: ProcedureDefinition): NeuroCockpitCell[] {
  const fullText = collectProcedureText(proc);
  const rawCombined = [
    ...(proc.intraoperative?.anesthesiaManagement || []),
    ...(proc.intraoperative?.monitoring || []),
    ...(proc.intraoperative?.criticalSurgicalStages || []),
    proc.anesthesiaTechniques?.notes || ''
  ].join(' \n ');
  const tags = extractAllClinicalTagIds(proc);

  const mapInfo = extractMapTarget(rawCombined, proc);
  const co2Info = extractCo2Target(rawCombined, tags);
  const nmbInfo = extractNmbIonmSummary(tags, fullText);
  const posValue = getSmartPosition(proc.intraoperative?.patientPosition);
  const posSub = tags.includes('vae')
    ? 'VAE & jugüler bası kontrolü'
    : tags.includes('prone_povl')
      ? 'POVL · Göz & karın serbest'
      : /mayfield/.test(toTrLower(proc.intraoperative?.patientPosition))
        ? 'Pin HT pikini baskıla'
        : 'Venöz drenaj & bası koruması';
  const bleedInfo = extractBleedingSummary(proc);
  const emInfo = extractEmergenceSummary(proc, tags);

  return [
    {
      key: 'map',
      label: 'MAP / CPP Hedefi',
      value: mapInfo.value,
      subValue: mapInfo.subValue,
      tone: 'teal'
    },
    {
      key: 'co2',
      label: 'PaCO₂ / Ventilasyon',
      value: co2Info.value,
      subValue: co2Info.subValue,
      tone: 'sky'
    },
    {
      key: 'ionm',
      label: 'NMB / İONM',
      value: nmbInfo.value,
      subValue: nmbInfo.subValue,
      tone: nmbInfo.tone
    },
    {
      key: 'position',
      label: 'Pozisyon & Başlık',
      value: posValue,
      subValue: posSub,
      tone: tags.includes('prone_povl') || tags.includes('vae') ? 'amber' : 'sky'
    },
    {
      key: 'bleeding',
      label: 'Kanama & Hazırlık',
      value: bleedInfo.value,
      subValue: bleedInfo.subValue,
      tone: bleedInfo.tone
    },
    {
      key: 'emergence',
      label: 'Ekstübasyon / YBÜ',
      value: emInfo.value,
      subValue: emInfo.subValue,
      tone: emInfo.tone
    }
  ];
}

/* =========================================================================
   5. BAĞLAMSAL PORTAL ARAÇ BAĞLANTILARI (DOĞRULANMIŞ HASH ROTALARI)
   ========================================================================= */

export interface ContextualPortalLink {
  href: string;
  label: string;
  category: 'emergency' | 'monitoring' | 'tool' | 'drug';
  tone: 'rose' | 'teal' | 'sky' | 'amber' | 'violet';
}

export function getContextualPortalLinks(proc: ProcedureDefinition): ContextualPortalLink[] {
  const fullText = collectProcedureText(proc);
  const tags = extractAllClinicalTagIds(proc);
  const links: ContextualPortalLink[] = [];
  const seen = new Set<string>();

  const addLink = (link: ContextualPortalLink) => {
    if (seen.has(link.href) || links.length >= 6) return;
    seen.add(link.href);
    links.push(link);
  };

  // Acil kriz protokolleri (öncelikli)
  if (tags.includes('vae')) {
    addLink({
      href: '#arac=emergencies&sub=vae',
      label: 'VAE Kriz Protokolü',
      category: 'emergency',
      tone: 'rose'
    });
  }

  if (
    proc.bleedingProfile?.riskLevel === 'massive_potential' ||
    proc.bleedingProfile?.riskLevel === 'high' ||
    /masif transfüzyon|\bmtp\b/.test(fullText)
  ) {
    addLink({
      href: '#arac=emergencies&sub=mtp',
      label: 'Masif Transfüzyon (MTP)',
      category: 'emergency',
      tone: 'rose'
    });
  }

  if (
    /zor hava yolu|zor havayolu|fiberoptik|akromegali|servikal instabilite|çerçeve.*laringoskopi|cico/.test(
      fullText
    )
  ) {
    addLink({
      href: '#arac=emergencies&sub=airway-crisis',
      label: 'Zor Havayolu Krizi',
      category: 'emergency',
      tone: 'rose'
    });
  }

  if (/skalp blok|lokal anestezik infiltrasyon|\blast\b|bupivakain|ropivakain/.test(fullText) && (tags.includes('awake_mac') || /skalp blok/.test(fullText))) {
    addLink({
      href: '#arac=emergencies&sub=last',
      label: 'LAST / İntralipid',
      category: 'emergency',
      tone: 'rose'
    });
  }

  // Monitörizasyon modülleri
  if (tags.includes('ionm')) {
    addLink({
      href: '#arac=monitoring&sub=evoked-potentials',
      label: 'SSEP / MEP (İONM)',
      category: 'monitoring',
      tone: 'violet'
    });
  }

  if (/\bkibas\b|\bkİbas\b|\bicp\b|intrakraniyal basınç|herniasyon|hidrosefali|evd\b/.test(fullText)) {
    addLink({
      href: '#arac=monitoring&sub=icp-monitoring',
      label: 'ICP / KİBAS Monitörü',
      category: 'monitoring',
      tone: 'teal'
    });
  }

  if (/\bnirs\b|serebral oksimetri|bypass|trombektomi|embolektomi|anevrizma|karotis/.test(fullText)) {
    addLink({
      href: '#arac=monitoring&sub=nirs-cerebral-oximetry',
      label: 'Serebral Oksimetri (NIRS)',
      category: 'monitoring',
      tone: 'sky'
    });
  }

  if (/invaziv arter|a-line|arteriyel kanül/.test(fullText)) {
    addLink({
      href: '#arac=monitoring&sub=ibp-monitoring',
      label: 'İnvaziv Arter (IBP)',
      category: 'monitoring',
      tone: 'teal'
    });
  }

  // İnfografikler ve İlaç / Elektrolit araçları
  if (/\btiva\b|propofol.*remifentanil/.test(fullText)) {
    addLink({
      href: '#infografik=tiva-csht',
      label: 'TIVA & CSHT',
      category: 'tool',
      tone: 'sky'
    });
  }

  if (/hiponatremi|siadh|csw|serebral tuz|diabetes insipidus|\bsodyum\b/.test(fullText)) {
    addLink({
      href: '#tedavi=sodium',
      label: 'Sodyum (SIADH / CSW)',
      category: 'drug',
      tone: 'amber'
    });
  }

  if (/deksmedetomidin/.test(fullText) && tags.includes('awake_mac')) {
    addLink({
      href: '#tedavi=dexmedetomidine',
      label: 'Deksmedetomidin',
      category: 'drug',
      tone: 'amber'
    });
  }

  if (/\bbis\b|burst süpresyon|sedline/.test(fullText)) {
    addLink({
      href: '#arac=monitoring&sub=bis-monitoring',
      label: 'BIS / Anestezi Derinliği',
      category: 'monitoring',
      tone: 'violet'
    });
  }

  if (/\btof\b|rokuronyum|sugammadeks/.test(fullText)) {
    addLink({
      href: '#arac=monitoring&sub=quantitative-nmb-monitors',
      label: 'Kantitatif TOF / NMB',
      category: 'monitoring',
      tone: 'teal'
    });
  }

  if (links.length < 4) {
    addLink({
      href: '#arac=infusion',
      label: 'İnfüzyon Hesaplayıcı',
      category: 'tool',
      tone: 'amber'
    });
  }

  if (links.length < 4) {
    addLink({
      href: '#arac=abg',
      label: 'Yatak Başı AKG',
      category: 'tool',
      tone: 'sky'
    });
  }

  return links;
}

/* =========================================================================
   6. SALON HAZIRLIĞI MİNİ-CHECKLIST & NÖBET ÖZETİ METİN ÜRETİCİ
   ========================================================================= */

export function buildProcedureQuickChecklist(proc: ProcedureDefinition): string[] {
  const items: string[] = [];
  const tags = extractAllClinicalTagIds(proc);
  const fullText = collectProcedureText(proc);

  if (proc.bleedingProfile?.crossMatchRequirement) {
    items.push(`Kan Hazırlığı: ${proc.bleedingProfile.crossMatchRequirement}`);
  }
  if (proc.intraoperative?.vascularAccess?.[0]) {
    items.push(`Vasküler Erişim: ${proc.intraoperative.vascularAccess[0]}`);
  }
  if (proc.intraoperative?.airwayManagement?.[0]) {
    items.push(`Hava Yolu: ${proc.intraoperative.airwayManagement[0]}`);
  }
  if (tags.includes('ionm')) {
    items.push(
      tags.includes('kurarsiz')
        ? 'İONM / NMB: İdamede kas gevşetici KULLANMA — TIVA (Propofol + Remifentanil) ve TOF doğrulaması'
        : 'İONM Hazırlığı: Nörofizyoloji ekibiyle elektrot yerleşimi ve TIVA / <0.5 MAC koordinasyonu'
    );
  }
  if (tags.includes('vae')) {
    items.push('VAE Hazırlığı: Prekordiyal Doppler / TEE, EtCO₂ alarmı, %100 O₂ ve aspirasyon hazır');
  }
  if (tags.includes('prone_povl')) {
    items.push('Prone Güvenliği: Göz basısı sıfır, karın serbest asılı, ETT sabitleme ve bası noktaları kontrolü');
  }
  if (/mayfield/.test(fullText)) {
    items.push('Mayfield Çivisi: Çivileme öncesi ek analjezi/propofol bolusu ve lokal infiltrasyon teyidi');
  }
  if (proc.intraoperative?.monitoring?.[0] && items.length < 6) {
    items.push(`Öncelikli Monitör: ${proc.intraoperative.monitoring[0]}`);
  }
  if (items.length < 5 && proc.intraoperative?.emergenceNotes?.[0]) {
    items.push(`Uyanma / Devir: ${proc.intraoperative.emergenceNotes[0]}`);
  }

  return items.slice(0, 7);
}

export function buildProcedureDutySummaryText(proc: ProcedureDefinition): string {
  const parsed = getProcedureIndispensableRules(proc);
  const lines: string[] = [
    `[${proc.shortCode || 'PROSEDÜR'}] ${proc.name}`,
    `Branş: ${proc.specialtyName}${proc.categoryTag ? ` · ${proc.categoryTag}` : ''}`,
    `Süre: ${getShortDuration(proc.averageDuration)} | Pozisyon: ${getSmartPosition(proc.intraoperative?.patientPosition)}`,
    `Altın Standart: ${getSmartGoldStandard(proc)}`
  ];

  if (proc.bleedingProfile) {
    lines.push(
      `Kanama: ${proc.bleedingProfile.estimatedBloodLoss.split('(')[0].trim()} (${proc.bleedingProfile.riskLevelLabel})`,
      `Kan Hazırlığı: ${proc.bleedingProfile.crossMatchRequirement}`
    );
  }

  if (proc.specialty === 'norosirurji') {
    const cockpit = extractNeuroCockpit(proc);
    lines.push('', '--- NÖROANESTEZİ HEDEFLERİ ---');
    for (const cell of cockpit) {
      lines.push(`• ${cell.label}: ${cell.value}${cell.subValue ? ` (${cell.subValue})` : ''}`);
    }
  }

  if (parsed.hasRules && parsed.rules.length > 0) {
    lines.push('', '--- HAYATİ İLKELER ---');
    for (const r of parsed.rules) {
      lines.push(`${r.number}) ${r.title}: ${r.content}`);
    }
  }

  if (proc.intraoperative?.criticalSurgicalStages?.length) {
    lines.push('', '--- KRİTİK CERRAHİ AŞAMALAR (5f) ---');
    proc.intraoperative.criticalSurgicalStages.slice(0, 5).forEach((s, i) => {
      lines.push(`${i + 1}. ${s}`);
    });
  }

  lines.push('', 'Kaynak: Şişli Hamidiye Etfal Anestezi Asistan Portalı');
  return lines.join('\n');
}
