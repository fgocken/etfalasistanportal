import { ProcedureDefinition, SurgicalSpecialty, SurgicalSpecialtyMeta } from '../../types/procedures';
import { laparoscopicCholecystectomy } from './laparoscopicCholecystectomy';
import { openCholecystectomy } from './openCholecystectomy';
import { awakeCraniotomy } from './awakeCraniotomy';
import { gastroscopy } from './gastroscopy';
import { colonoscopy } from './colonoscopy';
import { ercp } from './ercp';
import { eus } from './eus';
import { ekt } from './ekt';
import { breastBiopsy } from './breastBiopsy';
import { breastConservingSurgery } from './breastConservingSurgery';
import { craniotomyAneurysm } from './craniotomyAneurysm';
import { craniotomyEmbolectomy } from './craniotomyEmbolectomy';
import { anteriorUpperCervicalFusion } from './anteriorUpperCervicalFusion';
import { posteriorUpperCervicalFusion } from './posteriorUpperCervicalFusion';
import { craniotomyVascularMalformation } from './craniotomyVascularMalformation';
import { craniotomyEcIcBypass } from './craniotomyEcIcBypass';
import { craniotomyTumor } from './craniotomyTumor';
import { craniotomyTrauma } from './craniotomyTrauma';
import { craniotomyMicrovascularDecompression } from './craniotomyMicrovascularDecompression';
import { bifrontalCraniotomyCsfLeak } from './bifrontalCraniotomyCsfLeak';
import { transsphenoidalPituitaryResection } from './transsphenoidalPituitaryResection';
import { ventricularShuntProcedures } from './ventricularShuntProcedures';
import { craniocervicalDecompressionChiari } from './craniocervicalDecompressionChiari';
import { stereotacticNeurosurgery } from './stereotacticNeurosurgery';
import { stereotacticDbsPallidotomyThalamotomy } from './stereotacticDbsPallidotomyThalamotomy';
import { vagalNerveStimulation } from './vagalNerveStimulation';
import { surgicalAnalgesicsStimulationPumps } from './surgicalAnalgesicsStimulationPumps';
import { epilepsySurgery } from './epilepsySurgery';
import { surgeryForSpasticity } from './surgeryForSpasticity';
import { percutaneousTrigeminalNeuralgia } from './percutaneousTrigeminalNeuralgia';
import { anteriorMidLowerCervicalFusion } from './anteriorMidLowerCervicalFusion';
import { posteriorMidLowerCervicalFusion } from './posteriorMidLowerCervicalFusion';
import { anteriorCervicothoracicSpineSurgery } from './anteriorCervicothoracicSpineSurgery';
import { anteriorThoracicSpineSurgery } from './anteriorThoracicSpineSurgery';
import { posteriorThoracicSpineSurgery } from './posteriorThoracicSpineSurgery';
import { anteriorLumbarLumbosacralSpineSurgery } from './anteriorLumbarLumbosacralSpineSurgery';
import { posteriorLumbarSpineSurgery } from './posteriorLumbarSpineSurgery';
import { posteriorLumbarFusionInstrumentation } from './posteriorLumbarFusionInstrumentation';
import { combinedAnteriorPosteriorThoracolumbarInstrumentation } from './combinedAnteriorPosteriorThoracolumbarInstrumentation';
import { carotidEndarterectomy } from './carotidEndarterectomy';
import { cataractExtractionIolInsertion } from './cataractExtractionIolInsertion';

export {
  laparoscopicCholecystectomy,
  openCholecystectomy,
  awakeCraniotomy,
  gastroscopy,
  colonoscopy,
  ercp,
  eus,
  ekt,
  breastBiopsy,
  breastConservingSurgery,
  craniotomyAneurysm,
  craniotomyEmbolectomy,
  anteriorUpperCervicalFusion,
  posteriorUpperCervicalFusion,
  craniotomyVascularMalformation,
  craniotomyEcIcBypass,
  craniotomyTumor,
  craniotomyTrauma,
  craniotomyMicrovascularDecompression,
  bifrontalCraniotomyCsfLeak,
  transsphenoidalPituitaryResection,
  ventricularShuntProcedures,
  craniocervicalDecompressionChiari,
  stereotacticNeurosurgery,
  stereotacticDbsPallidotomyThalamotomy,
  vagalNerveStimulation,
  surgicalAnalgesicsStimulationPumps,
  epilepsySurgery,
  surgeryForSpasticity,
  percutaneousTrigeminalNeuralgia,
  anteriorMidLowerCervicalFusion,
  posteriorMidLowerCervicalFusion,
  anteriorCervicothoracicSpineSurgery,
  anteriorThoracicSpineSurgery,
  posteriorThoracicSpineSurgery,
  anteriorLumbarLumbosacralSpineSurgery,
  posteriorLumbarSpineSurgery,
  posteriorLumbarFusionInstrumentation,
  combinedAnteriorPosteriorThoracolumbarInstrumentation,
  carotidEndarterectomy,
  cataractExtractionIolInsertion
};

/**
 * Cerrahi Branş Meta Verileri (Tüm Branşlar İçin Kategori Ağacı)
 */
export const SURGICAL_SPECIALTIES: SurgicalSpecialtyMeta[] = [
  {
    id: 'genel_cerrahi',
    name: 'Genel Cerrahi',
    shortName: 'Genel Cerrahi',
    description: 'Laparoskopik ve açık batın, tiroid, meme, kolorektal ve hepatobiliyer cerrahiler'
  },
  {
    id: 'ortopedi',
    name: 'Ortopedi ve Travmatoloji',
    shortName: 'Ortopedi',
    description: 'Artroplasti (diz, kalça, omuz), artroskopi, travma ve omurga cerrahileri'
  },
  {
    id: 'kadin_dogum',
    name: 'Kadın Hastalıkları ve Doğum',
    shortName: 'Kadın Doğum',
    description: 'Elektif/acil sezaryen, jinekolojik onkoloji, histerektomi ve laparoskopi'
  },
  {
    id: 'kvc',
    name: 'Kalp ve Damar Cerrahisi',
    shortName: 'KVC',
    description: 'Açık kalp (KABG, kapak replasmanı), periferik vasküler ve aort cerrahileri'
  },
  {
    id: 'uroloji',
    name: 'Üroloji',
    shortName: 'Üroloji',
    description: 'TUR-P, TUR-M, radikal prostatektomi, nefrektomi ve endoürolojik girişimler'
  },
  {
    id: 'kbb',
    name: 'Kulak Burun Boğaz',
    shortName: 'KBB',
    description: 'Tonsillektomi, FESS, timpanoplasti, larenjektomi ve baş-boyun cerrahileri'
  },
  {
    id: 'norosirurji',
    name: 'Beyin ve Sinir Cerrahisi',
    shortName: 'Nöroşirürji',
    description: 'Kraniyotomi (tümör, anevrizma, hematom) ve lomber/servikal spinal stabilizasyon'
  },
  {
    id: 'plastik_cerrahi',
    name: 'Plastik ve Rekonstrüktif Cerrahi',
    shortName: 'Plastik Cerrahi',
    description: 'Doku flepleri, maksillofasiyal travma, yanık rekonstrüksiyonu ve estetik cerrahi'
  },
  {
    id: 'gogus_cerrahisi',
    name: 'Göğüs Cerrahisi',
    shortName: 'Göğüs Cerrahi',
    description: 'VATS, torakotomi, lobektomi, pnömonektomi ve trakea cerrahileri'
  },
  {
    id: 'cocuk_cerrahisi',
    name: 'Çocuk Cerrahisi',
    shortName: 'Çocuk Cerrahi',
    description: 'Yenidoğan ve pediatrik genel, ürolojik ve torasik cerrahi girişimler'
  },
  {
    id: 'goz',
    name: 'Göz Hastalıkları',
    shortName: 'Göz Cerrahisi',
    description: 'Katarakt (fakoemülsiyon), vitrektomi, glokom ve strabismus ameliyatları'
  },
  {
    id: 'gastroenteroloji',
    name: 'Gastroenteroloji',
    shortName: 'Gastroenteroloji',
    description: 'Tanısal ve girişimsel üst GİS endoskopi, kolonoskopi, polipektomi, ERCP ve EUS sedasyonu'
  },
  {
    id: 'psikiyatri',
    name: 'Psikiyatri',
    shortName: 'Psikiyatri',
    description: 'Elektrokonvülsif tedavi (EKT / ECT), transkraniyal manyetik stimülasyon (TMS) ve psikiyatrik girişim anestezi yönetimi'
  }
];

/**
 * Kayıtlı Tüm Prosedürler Kataloğu
 * 
 * Yeni prosedürler hekim kontrolü ve kullanıcı direktifleriyle
 * tek tek buraya eklenecektir.
 */
export const REGISTERED_PROCEDURES: ProcedureDefinition[] = [
  laparoscopicCholecystectomy,
  openCholecystectomy,
  awakeCraniotomy,
  gastroscopy,
  colonoscopy,
  ercp,
  eus,
  ekt,
  breastBiopsy,
  breastConservingSurgery,
  craniotomyAneurysm,
  craniotomyEmbolectomy,
  anteriorUpperCervicalFusion,
  posteriorUpperCervicalFusion,
  craniotomyVascularMalformation,
  craniotomyEcIcBypass,
  craniotomyTumor,
  craniotomyTrauma,
  craniotomyMicrovascularDecompression,
  bifrontalCraniotomyCsfLeak,
  transsphenoidalPituitaryResection,
  ventricularShuntProcedures,
  craniocervicalDecompressionChiari,
  stereotacticNeurosurgery,
  stereotacticDbsPallidotomyThalamotomy,
  vagalNerveStimulation,
  surgicalAnalgesicsStimulationPumps,
  epilepsySurgery,
  surgeryForSpasticity,
  percutaneousTrigeminalNeuralgia,
  anteriorMidLowerCervicalFusion,
  posteriorMidLowerCervicalFusion,
  anteriorCervicothoracicSpineSurgery,
  anteriorThoracicSpineSurgery,
  posteriorThoracicSpineSurgery,
  anteriorLumbarLumbosacralSpineSurgery,
  posteriorLumbarSpineSurgery,
  posteriorLumbarFusionInstrumentation,
  combinedAnteriorPosteriorThoracolumbarInstrumentation,
  carotidEndarterectomy,
  cataractExtractionIolInsertion
];

/**
 * ID ile prosedür bul
 */
export function getProcedureById(id: string): ProcedureDefinition | undefined {
  return REGISTERED_PROCEDURES.find(p => p.id === id);
}

/**
 * Branşa göre prosedürleri filtrele
 */
export function getProceduresBySpecialty(specialty: SurgicalSpecialty | 'all'): ProcedureDefinition[] {
  if (specialty === 'all') return REGISTERED_PROCEDURES;
  return REGISTERED_PROCEDURES.filter(p => p.specialty === specialty);
}

/**
 * Serbest metin arama (İsim, Branş, Endikasyon, Kategori)
 */
export function searchProcedures(
  query: string, 
  specialty: SurgicalSpecialty | 'all' = 'all'
): ProcedureDefinition[] {
  const normalized = query.trim().toLowerCase();
  const pool = getProceduresBySpecialty(specialty);

  if (!normalized) return pool;

  return pool.filter(p => {
    return (
      p.name.toLowerCase().includes(normalized) ||
      (p.shortCode && p.shortCode.toLowerCase().includes(normalized)) ||
      p.specialtyName.toLowerCase().includes(normalized) ||
      p.description.toLowerCase().includes(normalized) ||
      (p.categoryTag && p.categoryTag.toLowerCase().includes(normalized)) ||
      p.indications.some(ind => ind.toLowerCase().includes(normalized))
    );
  });
}
