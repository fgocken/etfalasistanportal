import { ProcedureDefinition } from '../types/procedures';
import { getProcedureIndispensableRules } from './procedureRulesParser';
import {
  ClinicalTagTone,
  CockpitTone,
  ContextualPortalLink,
  NeuroCockpitCell,
  getShortDuration,
  getSmartGoldStandard,
  getSmartPosition
} from './neuroProcedureHelpers';

/* =========================================================================
   1. GÖZ HASTALIKLARI ALT GRUP SINIFLANDIRMASI (4 ANATOMİK / KLİNİK GRUP)
   ========================================================================= */

export type OphthalmologySubgroupId =
  | 'anterior_cornea'
  | 'retina_trauma'
  | 'pediatric_strabismus_rop'
  | 'oculoplastic_lacrimal_orbit';

export interface OphthalmologySubgroupMeta {
  id: OphthalmologySubgroupId;
  tabLabel: string;
  sectionTitle: string;
  description: string;
}

export const OPHTHALMOLOGY_SUBGROUPS: OphthalmologySubgroupMeta[] = [
  {
    id: 'anterior_cornea',
    tabLabel: 'Ön Segment & Kornea',
    sectionTitle: 'Ön Segment, Kornea & Glokom Cerrahisi',
    description: 'Katarakt (FAKO), pterjiyum, penetran/lameller keratoplasti (PKP/DMEK) ve trabekülektomi'
  },
  {
    id: 'retina_trauma',
    tabLabel: 'Vitreoretinal & Travma',
    sectionTitle: 'Vitreoretinal Cerrahi & Oküler Travma',
    description: 'Pars plana vitrektomi (PPV), intraoküler gaz tamponadı (SF₆/C₃F₈), skleral çökertme ve açık küre yaralanmaları'
  },
  {
    id: 'pediatric_strabismus_rop',
    tabLabel: 'Pediatrik, Şaşılık & ROP',
    sectionTitle: 'Pediatrik Oftalmoloji, Şaşılık & Prematüre Retinopatisi',
    description: 'Şaşılık (strabismus), pediatrik konjenital katarakt/glokom/EUA ve ROP lazer/anti-VEGF girişimleri'
  },
  {
    id: 'oculoplastic_lacrimal_orbit',
    tabLabel: 'Oküloplastik & Orbita',
    sectionTitle: 'Oküloplastik, Lakrimal Sistem & Orbita Cerrahisi',
    description: 'Pitozis, ektropiyon, entropiyon, kapak rekonstrüksiyonu, DCR, orbitotomi ve enükleasyon/eviserasyon'
  }
];

const OPHTHALMOLOGY_SUBGROUP_MAP: Record<string, OphthalmologySubgroupId> = {
  // Ön Segment & Kornea (4 protokol)
  'cataract-extraction-iol-insertion': 'anterior_cornea',
  'pterygium-excision': 'anterior_cornea',
  'corneal-transplant': 'anterior_cornea',
  'trabeculectomy': 'anterior_cornea',

  // Vitreoretinal & Travma (2 protokol)
  'retinal-surgery-vitrectomy-scleral-buckle': 'retina_trauma',
  'repair-ruptured-lacerated-globe': 'retina_trauma',

  // Pediatrik, Şaşılık & ROP (3 protokol)
  'strabismus-surgery': 'pediatric_strabismus_rop',
  'pediatric-cataract-glaucoma-eua': 'pediatric_strabismus_rop',
  'rop-laser-anti-vegf': 'pediatric_strabismus_rop',

  // Oküloplastik, Lakrimal & Orbita (7 protokol)
  'ptosis-repair': 'oculoplastic_lacrimal_orbit',
  'ectropion-repair': 'oculoplastic_lacrimal_orbit',
  'entropion-repair': 'oculoplastic_lacrimal_orbit',
  'eyelid-reconstruction': 'oculoplastic_lacrimal_orbit',
  'dacryocystorhinostomy-dcr': 'oculoplastic_lacrimal_orbit',
  'orbitotomy-anterior-and-lateral': 'oculoplastic_lacrimal_orbit',
  'enucleation-evisceration-exenteration': 'oculoplastic_lacrimal_orbit'
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
    ...(proc.anesthesiaTechniques?.primary || []),
    ...(proc.anesthesiaTechniques?.alternative || []),
    proc.anesthesiaTechniques?.clinicalRationale || '',
    proc.anesthesiaTechniques?.notes || '',
    ...(proc.anesthesiaTechniques?.indispensableRules || []).map((r) => `${r.title} ${r.content}`),
    ...(proc.preoperative?.historyAndPhysical || []),
    ...(proc.preoperative?.laboratoryAndTests || []),
    ...(proc.intraoperative?.monitoring || []),
    ...(proc.intraoperative?.vascularAccess || []),
    proc.intraoperative?.patientPosition || '',
    ...(proc.intraoperative?.patientPositionDetails || []),
    ...(proc.intraoperative?.anesthesiaManagement || []),
    ...(proc.intraoperative?.airwayManagement || []),
    ...(proc.intraoperative?.criticalSurgicalStages || []),
    ...(proc.intraoperative?.emergenceNotes || []),
    ...(proc.postoperative?.painManagement || [])
  ];
  return toTrLower(parts.join(' \n '));
}

export function getOphthalmologySubgroup(proc: ProcedureDefinition): OphthalmologySubgroupId {
  if (OPHTHALMOLOGY_SUBGROUP_MAP[proc.id]) {
    return OPHTHALMOLOGY_SUBGROUP_MAP[proc.id];
  }
  const hay = toTrLower(`${proc.id} ${proc.categoryTag || ''} ${proc.name}`);
  if (/şaşılık|strabismus|pediatrik|pediatric|rop\b|prematüre|eua\b|konjenital/.test(hay)) {
    return 'pediatric_strabismus_rop';
  }
  if (/retina|vitrektomi|ppv|skleral|açık küre|globe|travma|rüptür|laserasyon/.test(hay)) {
    return 'retina_trauma';
  }
  if (/katarakt|cataract|fako|pterjiyum|pterygium|kornea|corneal|keratoplasti|trabekülektomi|glokom/.test(hay)) {
    return 'anterior_cornea';
  }
  return 'oculoplastic_lacrimal_orbit';
}

/* =========================================================================
   2. OFTALMİK KLİNİK MİKRO-ETİKETLER & RİSK FİLTRELERİ
   ========================================================================= */

export type OphthalmologyTagId =
  | 'open_globe'
  | 'n2o_forbidden'
  | 'ocr_risk'
  | 'block_forbidden'
  | 'pediatric'
  | 'throat_pack'
  | 'fire_risk'
  | 'topical_mac';

export interface OphthalmologyClinicalTag {
  id: OphthalmologyTagId;
  label: string;
  tone: ClinicalTagTone;
}

export type OphthalmologyRiskFilterId =
  | 'topical_mac'
  | 'n2o_forbidden'
  | 'open_globe'
  | 'ocr_risk'
  | 'fire_risk'
  | 'pediatric';

export interface OphthalmologyRiskFilterMeta {
  id: OphthalmologyRiskFilterId;
  label: string;
}

export const OPHTHALMOLOGY_RISK_FILTERS: OphthalmologyRiskFilterMeta[] = [
  { id: 'topical_mac', label: 'Topikal / MAC' },
  { id: 'n2o_forbidden', label: 'N₂O YASAK' },
  { id: 'open_globe', label: 'Açık Küre / GİB' },
  { id: 'ocr_risk', label: 'Yüksek OCR Riski' },
  { id: 'fire_risk', label: 'OR Yangın Riski' },
  { id: 'pediatric', label: 'Pediatrik / ROP' }
];

function extractOphthalmologyTagIds(proc: ProcedureDefinition): OphthalmologyTagId[] {
  const tags: OphthalmologyTagId[] = [];
  const fullText = collectProcedureText(proc);
  const titleAndCat = toTrLower(`${proc.id} ${proc.name} ${proc.categoryTag || ''} ${proc.shortCode || ''}`);
  const primaryText = toTrLower((proc.anesthesiaTechniques?.primary || []).join(' '));

  // 1. Açık Küre / Ekspulsif Kanama Riski
  if (
    proc.id === 'repair-ruptured-lacerated-globe' ||
    proc.id === 'corneal-transplant' ||
    /açık küre|open globe|open-sky|penetran keratoplasti|ekspulsif|glob rüptür/.test(titleAndCat)
  ) {
    tags.push('open_globe');
  }

  // 2. N₂O YASAK (İntraoküler gaz / SF6 / C3F8 / hava tamponadı)
  if (
    proc.id === 'retinal-surgery-vitrectomy-scleral-buckle' ||
    /sf6|c3f8|sf₆|c₃f₈|azot protoksit.*(?:yasak|kesinlikle|kontrendike)|n2o.*(?:yasak|kesinlikle|kontrendike)|n₂o.*(?:yasak|kesinlikle|kontrendike)|intraoküler gaz/.test(
      fullText
    )
  ) {
    tags.push('n2o_forbidden');
  }

  // 3. Blok Yasak (Açık küre travması / yüksek perforasyon riski)
  if (
    proc.id === 'repair-ruptured-lacerated-globe' ||
    /retrobulber.*(?:kesin|mutlak).*kontrendike|iğneli.*blok.*yasak|blok.*kesinlikle.*kontrendike/.test(fullText)
  ) {
    tags.push('block_forbidden');
  }

  // 4. Pediatrik / Prematüre / ROP
  if (
    proc.id === 'strabismus-surgery' ||
    proc.id === 'pediatric-cataract-glaucoma-eua' ||
    proc.id === 'rop-laser-anti-vegf' ||
    (proc.secondarySpecialties && proc.secondarySpecialties.includes('cocuk_cerrahisi')) ||
    /pediatrik|prematüre|yenidoğan|konjenital/.test(titleAndCat)
  ) {
    tags.push('pediatric');
  }

  // 5. Yüksek OCR Riski (Şaşılık, Enükleasyon, Orbitotomi, Skleral çökertme, Açık küre)
  if (
    [
      'strabismus-surgery',
      'enucleation-evisceration-exenteration',
      'orbitotomy-anterior-and-lateral',
      'retinal-surgery-vitrectomy-scleral-buckle',
      'repair-ruptured-lacerated-globe'
    ].includes(proc.id) ||
    /okülokardiyak refleks|aschner/.test(primaryText)
  ) {
    tags.push('ocr_risk');
  }

  // 6. Boğaz Tamponu (DCR)
  if (proc.id === 'dacryocystorhinostomy-dcr' || /boğaz tamponu|faringeal tampon|throat pack/.test(fullText)) {
    tags.push('throat_pack');
  }

  // 7. Topikal / Lokal + MAC
  if (
    /topikal|monitörize anestezi|\bmac\b|lokal infiltrasyon|sub-tenon|peribulber/.test(primaryText) &&
    !/genel endotrakeal anestezi.*(?:altın standart|birincil)/.test(primaryText)
  ) {
    tags.push('topical_mac');
  }

  // 8. Ameliyathane Yangın Üçgeni Riski (Yüz MAC + koter veya lazer)
  if (
    tags.includes('topical_mac') ||
    proc.id === 'rop-laser-anti-vegf' ||
    /yangın üçgeni|or fire|koter.*oksijen|fio₂ ≤\s*%?30|fio2 ≤\s*%?30/.test(fullText)
  ) {
    tags.push('fire_risk');
  }

  return tags;
}

const OPHTH_TAG_DEFS: Record<OphthalmologyTagId, { label: string; tone: ClinicalTagTone }> = {
  open_globe: { label: 'Açık Küre', tone: 'rose' },
  n2o_forbidden: { label: 'N₂O YASAK', tone: 'rose' },
  block_forbidden: { label: 'Blok Yasak', tone: 'orange' },
  pediatric: { label: 'Pediatrik', tone: 'teal' },
  ocr_risk: { label: 'OCR Riski', tone: 'violet' },
  throat_pack: { label: 'Boğaz Tamponu', tone: 'amber' },
  topical_mac: { label: 'Topikal / MAC', tone: 'sky' },
  fire_risk: { label: 'Yangın Riski', tone: 'amber' }
};

export function getOphthalmologyClinicalTags(
  proc: ProcedureDefinition,
  maxCount = 3
): OphthalmologyClinicalTag[] {
  const ids = extractOphthalmologyTagIds(proc);
  return ids.slice(0, maxCount).map((id) => ({
    id,
    label: OPHTH_TAG_DEFS[id].label,
    tone: OPHTH_TAG_DEFS[id].tone
  }));
}

export function matchesOphthalmologyRiskFilter(
  proc: ProcedureDefinition,
  filterId: OphthalmologyRiskFilterId
): boolean {
  const ids = extractOphthalmologyTagIds(proc);
  return ids.includes(filterId);
}

/* =========================================================================
   3. 6 HÜCRELİ OFTALMO-ANESTEZİ HEDEF KOKPİTİ (5 SANİYELİK SALON ÖZETİ)
   ========================================================================= */

interface EyeCockpitOverride {
  technique: { value: string; subValue: string; tone: CockpitTone };
  iopGas: { value: string; subValue: string; tone: CockpitTone };
  ocrHemo: { value: string; subValue: string; tone: CockpitTone };
  airwayFire: { value: string; subValue: string; tone: CockpitTone };
  anticoagBlock: { value: string; subValue: string; tone: CockpitTone };
  emergencePos: { value: string; subValue: string; tone: CockpitTone };
}

const EYE_COCKPIT_MAP: Record<string, EyeCockpitOverride> = {
  'cataract-extraction-iol-insertion': {
    technique: { value: 'Topikal + Minimal MAC', subValue: 'Gerekirse Sub-Tenon', tone: 'sky' },
    iopGas: { value: 'Normal GİB / Hareketsiz', subValue: 'Öksürük & baş hareketi yok', tone: 'teal' },
    ocrHemo: { value: 'Bazal KB · NTG Kaçın', subValue: 'Fenilefrin %2.5 · Ağrı/mesane kontrol', tone: 'emerald' },
    airwayFire: { value: 'Örtü Altı Hava / FiO₂≤%30', subValue: 'Spontan solunum · Yangın önlemi', tone: 'amber' },
    anticoagBlock: { value: 'Antikoagülan DEVAM', subValue: 'Yüksek miyopide (>26mm) iğne yasak', tone: 'emerald' },
    emergencePos: { value: 'Supin · Hızlı Taburculuk', subValue: 'PADSS · Göz koruyucu kalkan', tone: 'emerald' }
  },
  'pterygium-excision': {
    technique: { value: 'Topikal / Subkonj. + MAC', subValue: 'Çocuk/anksiyete → LMA GA', tone: 'sky' },
    iopGas: { value: 'Ekstraoküler · Düşük Risk', subValue: 'Nazal koterde duman/ısı koruma', tone: 'emerald' },
    ocrHemo: { value: 'Bazal KB · Düşük OCR', subValue: 'Adrenalinli lokalde taşikardi izle', tone: 'emerald' },
    airwayFire: { value: 'FiO₂ ≤%30 · Koter Dikkat', subValue: 'ASA OR Yangın Üçgeni kuralı', tone: 'amber' },
    anticoagBlock: { value: 'Antikoagülan DEVAM', subValue: 'Sub-Tenon / topikal güvenli', tone: 'emerald' },
    emergencePos: { value: 'Supin · Günübirlik', subValue: 'Korneal ağrıya topikal/NSAID-Parasetamol', tone: 'emerald' }
  },
  'corneal-transplant': {
    technique: { value: 'GETA (Derin NMB) / Blok', subValue: 'PKP: GA · DMEK: Blok+MAC', tone: 'violet' },
    iopGas: { value: 'Open-Sky · Ekspulsif Risk!', subValue: 'DMEK hava/SF₆ → N₂O YASAK', tone: 'rose' },
    ocrHemo: { value: 'Sıkı Normotansiyon · TOF 0', subValue: 'Mannitol yalnız endikasyonda (0.25-0.5g/kg)', tone: 'amber' },
    airwayFire: { value: 'Spiral ETT · EtCO₂ 35-38', subValue: 'Bloklu DMEK’te FiO₂ ≤%30', tone: 'sky' },
    anticoagBlock: { value: 'Yüksek Miyopi: İğne Yasak', subValue: 'PKP açık göze blok/bası yapılmaz', tone: 'amber' },
    emergencePos: { value: 'Sıfır Öksürük · Çift PONV', subValue: 'DMEK sonrası kesin SUPİN (sırtüstü)', tone: 'rose' }
  },
  'trabeculectomy': {
    technique: { value: 'Sub-Tenon / Topikal + MAC', subValue: 'GA gerekirse TIVA / LMA', tone: 'sky' },
    iopGas: { value: 'Düşük/Stabil GİB · Bleb Koru', subValue: 'Hipotoni/suprakoroidal kanama riski', tone: 'amber' },
    ocrHemo: { value: 'Bazal KB · NTG Kaçın', subValue: 'Timolol/Asetazolamid (K⁺) kontrol', tone: 'teal' },
    airwayFire: { value: 'Koter Var → FiO₂ ≤%30', subValue: 'O₂ kes ≥1 dk önce · Sulu %5 PI', tone: 'amber' },
    anticoagBlock: { value: 'Sub-Tenon Güvenli (ASRA)', subValue: 'Antikoagülan kesimi bireysel', tone: 'teal' },
    emergencePos: { value: 'Sıfır Ikınma · Basısız Kalkan', subValue: 'Tramadol/Kodein YOK · Çift PONV', tone: 'emerald' }
  },
  'retinal-surgery-vitrectomy-scleral-buckle': {
    technique: { value: 'Peribulber/Sub-Tenon + MAC', subValue: 'Uzun PPV/Çökertme → TIVA GA', tone: 'violet' },
    iopGas: { value: 'SF₆ / C₃F₈ → N₂O KESİN YASAK', subValue: 'Gazdan ≥15-20 dk önce kes / hiç açma', tone: 'rose' },
    ocrHemo: { value: 'Yüksek OCR (Çökertme!)', subValue: 'Traksiyonu durdur → IV Atropin 0.5mg', tone: 'rose' },
    airwayFire: { value: 'LMA / Spiral ETT · MAC O₂≤%30', subValue: 'Karanlık salon monitör alarmı', tone: 'sky' },
    anticoagBlock: { value: 'Yüksek Miyopi: Sub-Tenon', subValue: 'Antikoagülan ASRA/RCoA uyumlu', tone: 'teal' },
    emergencePos: { value: 'Postop Yüzüstü / Uçuş YASAK', subValue: 'Gaz bilekliği · Çift PONV profilaksisi', tone: 'rose' }
  },
  'repair-ruptured-lacerated-globe': {
    technique: { value: 'GETA · Modifiye RSI', subValue: 'Rokuronyum 1.2 mg/kg + Sugammadeks', tone: 'rose' },
    iopGas: { value: 'AÇIK KÜRE · Sıfır Göz Basısı', subValue: 'Maske/öksürük/laringoskopi GİB fırlatır', tone: 'rose' },
    ocrHemo: { value: 'OCR Hazır · Derin Anestezi', subValue: 'Remifentanil/Lidokain ile sempatik blok', tone: 'amber' },
    airwayFire: { value: 'Tok Mide · Video Laringoskop', subValue: 'Derin ekstübasyon/LMA-exchange YASAK', tone: 'rose' },
    anticoagBlock: { value: 'Oftalmik Blok KESİN YASAK!', subValue: 'Hacim artışı glob içeriğini prolabe eder', tone: 'rose' },
    emergencePos: { value: 'Smooth Uyanık Ekstübasyon', subValue: 'Remi 0.03-0.05 + Lidokain + Çift PONV', tone: 'amber' }
  },
  'ptosis-repair': {
    technique: { value: 'Lokal İnfiltrasyon + Hafif MAC', subValue: 'İntraop göz aç-kapa kooperasyonu', tone: 'sky' },
    iopGas: { value: 'Ekstraoküler · Levator Testi', subValue: 'Aşırı sedasyon pitozis ayarını bozar', tone: 'teal' },
    ocrHemo: { value: 'MG vs. CPEO Farmakolojisi!', subValue: 'MG: NMB %50-75↓ · CPEO: SCh YASAK', tone: 'rose' },
    airwayFire: { value: 'Yüz Koteri → FiO₂ ≤%30', subValue: 'Medikal hava / koter öncesi O₂ kes', tone: 'amber' },
    anticoagBlock: { value: 'Yüzeyel Lokal (ASRA)', subValue: 'Kapak hematomu için bazal KB koru', tone: 'emerald' },
    emergencePos: { value: 'Supin · Soğuk Kompres', subValue: 'Günübirlik · Konjonktiva/kornea koru', tone: 'emerald' }
  },
  'ectropion-repair': {
    technique: { value: 'Lokal İnfiltrasyon + MAC', subValue: 'Kısa etkili (Propofol/Remi/Deks)', tone: 'sky' },
    iopGas: { value: 'Ekstraoküler · Kapak Gerginliği', subValue: 'Kornea kurumasını önle (jel/kalkan)', tone: 'emerald' },
    ocrHemo: { value: 'Bazal KB · Adrenalin İzlemi', subValue: 'Kızarma/taşikardi ve hematom kontrol', tone: 'teal' },
    airwayFire: { value: 'ASA Yangın Üçgeni (FiO₂≤%30)', subValue: 'Sulu %5 PI · Alkol bazlı prep YASAK', tone: 'amber' },
    anticoagBlock: { value: 'Komprese Edilebilir (ASRA)', subValue: 'Yüksek riskli hemostazda bireysel karar', tone: 'emerald' },
    emergencePos: { value: 'Supin · Retrobulber Hematom İzle', subValue: 'Ağrı/proptozis → acil kantotomi alarmı', tone: 'emerald' }
  },
  'entropion-repair': {
    technique: { value: 'Lokal İnfiltrasyon + MAC', subValue: 'İnfraorbital/lokal blok + hafif sedasyon', tone: 'sky' },
    iopGas: { value: 'Ekstraoküler · Kornea Koru', subValue: 'İçeri dönük kirpik abrazyonu/kornea kalkanı', tone: 'emerald' },
    ocrHemo: { value: 'Bazal KB · Geriatrik Doz↓', subValue: 'Deliryum yapan benzodiazepinden kaçın', tone: 'teal' },
    airwayFire: { value: 'ASA Yangın Üçgeni (FiO₂≤%30)', subValue: 'Koter öncesi O₂ kes + ≥1 dk havalandır', tone: 'amber' },
    anticoagBlock: { value: 'Yüzeyel Lokal (ASRA)', subValue: 'Antikoagülan yönetimi ASRA/PAUSE uyumlu', tone: 'emerald' },
    emergencePos: { value: 'Supin · Günübirlik PADSS', subValue: 'Diplopi/proptozis → derin hematom dışla', tone: 'emerald' }
  },
  'eyelid-reconstruction': {
    technique: { value: 'Lokal + MAC veya LMA/GETA', subValue: 'Geniş flep/greftte TIVA GA tercih', tone: 'sky' },
    iopGas: { value: 'Kornea Kalkanı Zorunlu', subValue: 'Flep/greft basısı ve ödemden kaçın', tone: 'teal' },
    ocrHemo: { value: 'Normotansiyon · Flep Perfüzyonu', subValue: 'Hipotansiyon/vazokonstriksiyon flebi bozar', tone: 'amber' },
    airwayFire: { value: 'Yüz Koteri → FiO₂ ≤%30', subValue: 'Oral/nazal ETT’de tüp fiksasyonu güvenli', tone: 'amber' },
    anticoagBlock: { value: 'Geniş Flep: ASRA/PAUSE', subValue: 'Deri hematomu flep nekrozu yapar', tone: 'amber' },
    emergencePos: { value: 'Pürüzsüz Uyanma · Çift PONV', subValue: 'Tramadol/Kodein YOK · 30° baş elevasyonu', tone: 'emerald' }
  },
  'dacryocystorhinostomy-dcr': {
    technique: { value: 'GETA (TIVA: Propofol + Remi)', subValue: 'Kansız endoskopik/eksternal saha', tone: 'violet' },
    iopGas: { value: 'Nazal Kanama & Aspirasyon', subValue: 'Kokain KULLANMA (Ksilometazolin+Adr)', tone: 'rose' },
    ocrHemo: { value: 'MAP ≥ Bazal −%20 (≥70-80)', subValue: 'Sabit MAP 60 YASAK · HR 55-65/dk', tone: 'amber' },
    airwayFire: { value: 'Oral RAE/Spiral + Boğaz Tamponu', subValue: 'Ekstübasyon öncesi TAMPON ÇIKAR TEYİDİ!', tone: 'rose' },
    anticoagBlock: { value: 'Yüksek Kanama Riskli (PAUSE)', subValue: 'DOAC 48 sa · Rutin köprüleme YOK', tone: 'amber' },
    emergencePos: { value: '15–20° Ters Trendelenburg', subValue: 'Direkt aspirasyon + smooth uyanık ekstüb.', tone: 'teal' }
  },
  'orbitotomy-anterior-and-lateral': {
    technique: { value: 'GETA (TIVA: Propofol + Remi)', subValue: 'Spiral ETT · Mutlak hareketsizlik', tone: 'violet' },
    iopGas: { value: 'Kapalı Kompartman · OCS Riski', subValue: 'Optik sinir basısı/iskemi alarmı', tone: 'rose' },
    ocrHemo: { value: 'Çok Yüksek OCR · Normotansif', subValue: 'İON önlemi: MAP ≥ Bazal −%20', tone: 'rose' },
    airwayFire: { value: 'Spiral/RAE ETT · Uzatma Hattı', subValue: 'Baş-boyun erişimi kısıtlı · Teyp güvenli', tone: 'sky' },
    anticoagBlock: { value: 'Kapalı Kompartman (ASRA/PAUSE)', subValue: 'DOAC 48-96sa · Rutin köprüleme YOK', tone: 'rose' },
    emergencePos: { value: 'Sıfır Öksürük · Görme Kontrol', subValue: 'Acil kantotomi/Mannitol/Asetazolamid hazır', tone: 'rose' }
  },
  'strabismus-surgery': {
    technique: { value: 'Propofol TIVA + LMA / ETT', subValue: 'PONV %50-80 → Volatilden kaçın!', tone: 'violet' },
    iopGas: { value: 'Forced Duction Testi', subValue: 'Süksinilkolin 20 dk tonusu bozar → YASAK', tone: 'rose' },
    ocrHemo: { value: 'EN YÜKSEK OCR (%60–90)!', subValue: 'Traksiyonu durdur → IV Atropin 0.02 mg/kg', tone: 'rose' },
    airwayFire: { value: 'Pediatrik LMA / Spiral ETT', subValue: 'Gizli miyopati / MH uyanıklığı (Dantrolen)', tone: 'amber' },
    anticoagBlock: { value: 'Sub-Tenon / Topikal Adjuvan', subValue: 'Preemptif lokal ağrı & OCR’yi azaltır', tone: 'teal' },
    emergencePos: { value: 'Çift PONV (Deks + Ondansetron)', subValue: 'Opioid-sparing · Kodein/Tramadol YASAK', tone: 'emerald' }
  },
  'pediatric-cataract-glaucoma-eua': {
    technique: { value: 'Sevofluran İnd. → LMA / ETT', subValue: 'EUA’da tonometri indüksiyonun hemen başında!', tone: 'sky' },
    iopGas: { value: 'Sevofluran GİB’i %20–30↓!', subValue: 'Glokomu maskeler · Ketamin GİB’i hafif↑', tone: 'amber' },
    ocrHemo: { value: 'Damla Toksisitesi (Brimonidin!)', subValue: '<2 yaş Brimonidin YASAK (apne/koma)', tone: 'rose' },
    airwayFire: { value: 'Pediatrik Havayolu · Normotermi', subValue: 'Isıtıcı battaniye · Laringospazm önlemi', tone: 'teal' },
    anticoagBlock: { value: 'Topikal / Sub-Tenon Adjuvan', subValue: 'İğneli retrobulber pediatride YAPILMAZ', tone: 'teal' },
    emergencePos: { value: 'Emergence Delirium Önlemi', subValue: 'Deksmedetomidin / Propofol bolusu + PONV', tone: 'emerald' }
  },
  'enucleation-evisceration-exenteration': {
    technique: { value: 'GETA (TIVA) + Preemptif Blok', subValue: 'Şiddetli postop ağrı & yüksek PONV', tone: 'violet' },
    iopGas: { value: 'Optik Sinir Kesisinde Derin OCR', subValue: 'Kesi öncesi cerrahla sözel teyit + Atropin', tone: 'rose' },
    ocrHemo: { value: 'Yüksek OCR + Orbital Kanama', subValue: 'Ekzenterasyonda 2 büyük IV + Cross-match', tone: 'rose' },
    airwayFire: { value: 'Spiral / Oral RAE ETT', subValue: 'Koter/kemik rezeksiyonunda güvenli tespit', tone: 'sky' },
    anticoagBlock: { value: 'Preemptif Peribulber/Retrobulber', subValue: 'Ağrı, OCR ve fantom göz ağrısını azaltır', tone: 'amber' },
    emergencePos: { value: 'Multimodal Analjezi + Çift PONV', subValue: 'Parasetamol + NSAID/Blok + Psikolojik destek', tone: 'teal' }
  },
  'rop-laser-anti-vegf': {
    technique: { value: 'Lazer: GETA · Anti-VEGF: Topikal', subValue: 'Prematüre (PCA <45-60 hf) · NICU/NORA', tone: 'rose' },
    iopGas: { value: 'Hiperoksiden Kaçın: SpO₂ %90-95', subValue: 'Lazer göz koruyucu gözlük tüm ekibe zorunlu', tone: 'rose' },
    ocrHemo: { value: 'OCR + Siklopentolat/Fenilefrin!', subValue: 'NEK/HT/apne riski → Mikro-damla + punktum bası', tone: 'amber' },
    airwayFire: { value: 'Yenidoğan ETT · FiO₂ En Düşük', subValue: 'Lazer yangın güvenliği + aktif ısıtma (36.5-37.5°C)', tone: 'amber' },
    anticoagBlock: { value: 'KŞ / Sıvı / Elektrolit Hassas', subValue: 'Hipoglisemi & hipokalsemi yakın izlem', tone: 'teal' },
    emergencePos: { value: '24–48 sa NICU Apne Monitörü!', subValue: 'Kafein sitrat · Günübirlik taburculuk YASAK', tone: 'rose' }
  }
};

export function extractOphthalmologyCockpit(proc: ProcedureDefinition): NeuroCockpitCell[] {
  const override = EYE_COCKPIT_MAP[proc.id];
  if (override) {
    return [
      { key: 'technique', label: 'Anestezi Tekniği', ...override.technique },
      { key: 'iop_gas', label: 'GİB & N₂O / Gaz', ...override.iopGas },
      { key: 'ocr_hemo', label: 'OCR & Hemodinami', ...override.ocrHemo },
      { key: 'airway_fire', label: 'Hava Yolu & Yangın', ...override.airwayFire },
      { key: 'anticoag_block', label: 'Antikoagülan & Blok', ...override.anticoagBlock },
      { key: 'emergence_pos', label: 'Uyanma & Pozisyon', ...override.emergencePos }
    ];
  }

  // Fallback dinamik çıkarım
  const tags = extractOphthalmologyTagIds(proc);
  return [
    {
      key: 'technique',
      label: 'Anestezi Tekniği',
      value: getSmartGoldStandard(proc),
      subValue: tags.includes('topical_mac') ? 'Minimal sedasyon · Kooperasyon' : 'Hareketsiz cerrahi saha',
      tone: 'sky'
    },
    {
      key: 'iop_gas',
      label: 'GİB & N₂O / Gaz',
      value: tags.includes('n2o_forbidden')
        ? 'N₂O KESİN YASAK'
        : tags.includes('open_globe')
          ? 'Açık Küre · Sıfır Bası'
          : 'Stabil GİB',
      subValue: tags.includes('n2o_forbidden') ? 'İntraoküler gaz genleşmesi' : 'Öksürük/ıkınmadan kaçın',
      tone: tags.includes('n2o_forbidden') || tags.includes('open_globe') ? 'rose' : 'teal'
    },
    {
      key: 'ocr_hemo',
      label: 'OCR & Hemodinami',
      value: tags.includes('ocr_risk') ? 'Yüksek OCR Riski' : 'Bazal KB Koruması',
      subValue: 'Traksiyonu durdur → IV Atropin',
      tone: tags.includes('ocr_risk') ? 'rose' : 'emerald'
    },
    {
      key: 'airway_fire',
      label: 'Hava Yolu & Yangın',
      value: tags.includes('fire_risk') ? 'FiO₂ ≤%30 · Yangın Önlemi' : 'Güvenli Hava Yolu',
      subValue: tags.includes('throat_pack') ? 'Boğaz tamponu çıkış teyidi' : 'EtCO₂ ve oksijenasyon izlemi',
      tone: tags.includes('fire_risk') || tags.includes('throat_pack') ? 'amber' : 'sky'
    },
    {
      key: 'anticoag_block',
      label: 'Antikoagülan & Blok',
      value: tags.includes('block_forbidden') ? 'Oftalmik Blok YASAK' : 'ASRA 2025 / RCoA',
      subValue: 'Yüksek miyopide (>26 mm) iğne yasak',
      tone: tags.includes('block_forbidden') ? 'rose' : 'teal'
    },
    {
      key: 'emergence_pos',
      label: 'Uyanma & Pozisyon',
      value: getSmartPosition(proc.intraoperative?.patientPosition),
      subValue: 'Pürüzsüz uyanma · Çift PONV profilaksisi',
      tone: 'emerald'
    }
  ];
}

/* =========================================================================
   4. BAĞLAMSAL PORTAL ARAÇ BAĞLANTILARI (TÜMÜ DOĞRULANMIŞ HASH ROTALARI)
   ========================================================================= */

export function getOphthalmologyContextualLinks(proc: ProcedureDefinition): ContextualPortalLink[] {
  const fullText = collectProcedureText(proc);
  const tags = extractOphthalmologyTagIds(proc);
  const links: ContextualPortalLink[] = [];
  const seen = new Set<string>();

  const addLink = (link: ContextualPortalLink) => {
    if (seen.has(link.href) || links.length >= 6) return;
    seen.add(link.href);
    links.push(link);
  };

  // 1. Acil Krizler (öncelikli)
  if (tags.includes('ocr_risk') || /okülokardiyak|aschner/.test(fullText)) {
    addLink({
      href: '#tedavi=atropine',
      label: 'Atropin (OCR / Bradikardi)',
      category: 'drug',
      tone: 'rose'
    });
  }

  if (tags.includes('fire_risk')) {
    addLink({
      href: '#arac=emergencies&sub=airway-fire',
      label: 'Ameliyathane Yangını (OR Fire)',
      category: 'emergency',
      tone: 'rose'
    });
  }

  if (proc.id === 'repair-ruptured-lacerated-globe') {
    addLink({
      href: '#infografik=rsi-vs-elective',
      label: 'RSI vs. Elektif İndüksiyon',
      category: 'tool',
      tone: 'rose'
    });
    addLink({
      href: '#arac=emergencies&sub=aspiration',
      label: 'Pulmoner Aspirasyon Krizi',
      category: 'emergency',
      tone: 'rose'
    });
  }

  if (proc.id === 'strabismus-surgery' || proc.id === 'ptosis-repair') {
    addLink({
      href: '#arac=emergencies&sub=mh',
      label: 'Malign Hipertermi (MH)',
      category: 'emergency',
      tone: 'rose'
    });
  }

  if (
    !tags.includes('block_forbidden') &&
    /peribulber|retrobulber|sub-tenon|bupivakain|ropivakain|lidokain/.test(fullText)
  ) {
    addLink({
      href: '#arac=emergencies&sub=last',
      label: 'LAST / İntralipid',
      category: 'emergency',
      tone: 'rose'
    });
  }

  // 2. Antitrombotik & Preop Erteleme Matrisi
  if (!tags.includes('pediatric')) {
    addLink({
      href: '#infografik=antithrombotic-matrix',
      label: 'Antitrombotik & Blok Matrisi',
      category: 'tool',
      tone: 'teal'
    });
  }

  if (tags.includes('pediatric')) {
    addLink({
      href: '#infografik=pediatric-fasting',
      label: 'Pediatrik Açlık (ESAIC)',
      category: 'tool',
      tone: 'sky'
    });
  }

  if (/asetazolamid|glokom|retrobulber hematom|orbital kompartman/.test(fullText)) {
    addLink({
      href: '#tedavi=acetazolamide',
      label: 'Asetazolamid (GİB / OCS)',
      category: 'drug',
      tone: 'amber'
    });
  }

  if (/\btiva\b|propofol.*remifentanil/.test(fullText)) {
    addLink({
      href: '#infografik=tiva-csht',
      label: 'TIVA & CSHT',
      category: 'tool',
      tone: 'violet'
    });
  }

  if (tags.includes('topical_mac') || /günübirlik|padss/.test(fullText)) {
    addLink({
      href: '#infografik=padss',
      label: 'PADSS Günübirlik Taburculuk',
      category: 'tool',
      tone: 'teal'
    });
  }

  if (links.length < 5) {
    addLink({
      href: '#arac=preop&sub=cancellation-matrix',
      label: 'Erteleme / İptal Matrisi',
      category: 'tool',
      tone: 'amber'
    });
  }

  if (links.length < 5 && tags.includes('fire_risk')) {
    addLink({
      href: '#arac=mechanical-ventilation&sub=oxygen-therapy',
      label: 'Oksijen Güvenliği',
      category: 'tool',
      tone: 'sky'
    });
  }

  return links;
}

/* =========================================================================
   5. OFTALMOLOJİ SALON HAZIRLIĞI MİNİ-CHECKLIST & NÖBET ÖZETİ
   ========================================================================= */

export function buildOphthalmologyQuickChecklist(proc: ProcedureDefinition): string[] {
  const tags = extractOphthalmologyTagIds(proc);
  const items: string[] = [];

  items.push('Taraf Doğrulaması (Sign-In): Doğru göz (Sağ OD / Sol OS), lens/implant ve oftalmik damla teyidi');

  if (tags.includes('n2o_forbidden')) {
    items.push('N₂O Kilidi: İntraoküler gaz (SF₆/C₃F₈/hava) olasılığı nedeniyle N₂O kesinlikle KAPALI + hasta gaz bilekliği hazır');
  }

  if (tags.includes('open_globe') || tags.includes('block_forbidden')) {
    items.push('Açık Küre Koruma: İğneli oftalmik blok KESİN YASAK — maske basısı yok, modifiye RSI (Rokuronyum 1.2 mg/kg + Sugammadeks)');
  }

  if (tags.includes('fire_risk')) {
    items.push('ASA OR Yangın Güvenliği: Örtü altı medikal hava veya FiO₂ ≤%30, sulu %5 Povidon-İyot (alkolsüz), koter öncesi O₂ ≥1 dk kapalı');
  }

  if (tags.includes('ocr_risk')) {
    items.push('OCR Hazırlığı: IV Atropin (erişkin 0.5 mg / pediatrik 0.02 mg/kg) çekili; bradikardide ilk adım cerrahı durdurmak');
  }

  if (tags.includes('throat_pack')) {
    items.push('Boğaz Tamponu Güvenliği: Faringeal tampon yerleştirme/çıkarma saati tahtaya kayıt + ekstübasyon öncesi görsel çıkarma teyidi');
  }

  if (tags.includes('pediatric')) {
    items.push(
      proc.id === 'rop-laser-anti-vegf'
        ? 'Prematüre / ROP Hazırlığı: SpO₂ %90–95 hedefi, aktif ısıtma (36.5–37.5°C), lazer gözlüğü ve postop 24–48 sa NICU apne monitörü'
        : 'Pediatrik Göz Hazırlığı: Çift PONV profilaksisi (Deksametazon + Ondansetron), normotermi ve topikal damla (Brimonidin/Fenilefrin) doz teyidi'
    );
  }

  if (proc.intraoperative?.vascularAccess?.[0] && items.length < 6) {
    items.push(`Vasküler Erişim: ${proc.intraoperative.vascularAccess[0]}`);
  }

  if (items.length < 6 && proc.intraoperative?.emergenceNotes?.[0]) {
    items.push(`Uyanma / Koruma: ${proc.intraoperative.emergenceNotes[0]}`);
  }

  return items.slice(0, 7);
}

export function buildOphthalmologyDutySummaryText(proc: ProcedureDefinition): string {
  const parsed = getProcedureIndispensableRules(proc);
  const cockpit = extractOphthalmologyCockpit(proc);
  const lines: string[] = [
    `[${proc.shortCode || 'GÖZ'}] ${proc.name}`,
    `Branş: ${proc.specialtyName}${proc.categoryTag ? ` · ${proc.categoryTag}` : ''}`,
    `Süre: ${getShortDuration(proc.averageDuration)} | Pozisyon: ${getSmartPosition(proc.intraoperative?.patientPosition)}`,
    `Altın Standart: ${getSmartGoldStandard(proc)}`
  ];

  if (proc.bleedingProfile) {
    lines.push(
      `Kanama: ${proc.bleedingProfile.estimatedBloodLoss.split('(')[0].trim()} (${proc.bleedingProfile.riskLevelLabel})`
    );
  }

  lines.push('', '--- OFTALMO-ANESTEZİ HEDEF KOKPİTİ ---');
  for (const cell of cockpit) {
    lines.push(`• ${cell.label}: ${cell.value}${cell.subValue ? ` (${cell.subValue})` : ''}`);
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
