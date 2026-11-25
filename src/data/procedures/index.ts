import { ProcedureDefinition, SurgicalSpecialty, SurgicalSpecialtyMeta } from '../../types/procedures';
// 1) Beyin ve Sinir Cerrahisi (Nöroşirürji) — Kraniyal/Vasküler/Girişimsel → Kafa Tabanı/BOS/Pediatrik → Fonksiyonel → Spinal (Kraniyokaudal)
import { craniotomyAneurysm } from './craniotomyAneurysm';
import { endovascularAneurysmCoilingEmbolization } from './endovascularAneurysmCoilingEmbolization';
import { craniotomyVascularMalformation } from './craniotomyVascularMalformation';
import { craniotomyEcIcBypass } from './craniotomyEcIcBypass';
import { endovascularMechanicalThrombectomy } from './endovascularMechanicalThrombectomy';
import { craniotomyEmbolectomy } from './craniotomyEmbolectomy';
import { craniotomyTumor } from './craniotomyTumor';
import { awakeCraniotomy } from './awakeCraniotomy';
import { craniotomyTrauma } from './craniotomyTrauma';
import { chronicSubduralHematomaMma } from './chronicSubduralHematomaMma';
import { intracerebralHemorrhageEvacuation } from './intracerebralHemorrhageEvacuation';
import { craniotomyMicrovascularDecompression } from './craniotomyMicrovascularDecompression';
import { posteriorFossaCpaTumor } from './posteriorFossaCpaTumor';
import { bifrontalCraniotomyCsfLeak } from './bifrontalCraniotomyCsfLeak';
import { transsphenoidalPituitaryResection } from './transsphenoidalPituitaryResection';
import { craniocervicalDecompressionChiari } from './craniocervicalDecompressionChiari';
import { ventricularShuntProcedures } from './ventricularShuntProcedures';
import { endoscopicThirdVentriculostomy } from './endoscopicThirdVentriculostomy';
import { pediatricCraniosynostosis } from './pediatricCraniosynostosis';
import { pediatricMyelomeningoceleRepair } from './pediatricMyelomeningoceleRepair';
import { stereotacticNeurosurgery } from './stereotacticNeurosurgery';
import { stereotacticDbsPallidotomyThalamotomy } from './stereotacticDbsPallidotomyThalamotomy';
import { epilepsySurgery } from './epilepsySurgery';
import { vagalNerveStimulation } from './vagalNerveStimulation';
import { surgeryForSpasticity } from './surgeryForSpasticity';
import { surgicalAnalgesicsStimulationPumps } from './surgicalAnalgesicsStimulationPumps';
import { percutaneousTrigeminalNeuralgia } from './percutaneousTrigeminalNeuralgia';
import { anteriorUpperCervicalFusion } from './anteriorUpperCervicalFusion';
import { posteriorUpperCervicalFusion } from './posteriorUpperCervicalFusion';
import { anteriorMidLowerCervicalFusion } from './anteriorMidLowerCervicalFusion';
import { posteriorMidLowerCervicalFusion } from './posteriorMidLowerCervicalFusion';
import { anteriorCervicothoracicSpineSurgery } from './anteriorCervicothoracicSpineSurgery';
import { anteriorThoracicSpineSurgery } from './anteriorThoracicSpineSurgery';
import { posteriorThoracicSpineSurgery } from './posteriorThoracicSpineSurgery';
import { anteriorLumbarLumbosacralSpineSurgery } from './anteriorLumbarLumbosacralSpineSurgery';
import { posteriorLumbarSpineSurgery } from './posteriorLumbarSpineSurgery';
import { posteriorLumbarFusionInstrumentation } from './posteriorLumbarFusionInstrumentation';
import { combinedAnteriorPosteriorThoracolumbarInstrumentation } from './combinedAnteriorPosteriorThoracolumbarInstrumentation';

// 2) Göz Hastalıkları — Ön Segment → Arka Segment → Oküler Travma → Oküloplastik & Orbita
import { cataractExtractionIolInsertion } from './cataractExtractionIolInsertion';
import { pterygiumExcision } from './pterygiumExcision';
import { cornealTransplant } from './cornealTransplant';
import { trabeculectomy } from './trabeculectomy';
import { retinalSurgery } from './retinalSurgery';
import { repairRupturedLaceratedGlobe } from './repairRupturedLaceratedGlobe';
import { ptosisRepair } from './ptosisRepair';
import { ectropionRepair } from './ectropionRepair';
import { entropionRepair } from './entropionRepair';
import { eyelidReconstruction } from './eyelidReconstruction';
import { dacryocystorhinostomy } from './dacryocystorhinostomy';
import { orbitotomyAnteriorLateral } from './orbitotomyAnteriorLateral';

// 3) Kulak Burun Boğaz (KBB) — Faringeal/Özofageal → Laringoloji → Onkoloji → Acil/İleri Hava Yolu
import { tonsillectomyAdenoidectomy } from './tonsillectomyAdenoidectomy';
import { zenkersDiverticulectomy } from './zenkersDiverticulectomy';
import { laryngoscopy } from './laryngoscopy';
import { laryngealFrameworkSurgery } from './laryngealFrameworkSurgery';
import { laryngectomyPartialTotal } from './laryngectomyPartialTotal';
import { intubationForEpiglottitis } from './intubationForEpiglottitis';
import { tracheostomyCricothyroidotomy } from './tracheostomyCricothyroidotomy';

// 4) Genel Cerrahi — Hepatobiliyer → Meme Cerrahisi → Kolorektal & Anorektal
import { laparoscopicCholecystectomy } from './laparoscopicCholecystectomy';
import { openCholecystectomy } from './openCholecystectomy';
import { breastBiopsy } from './breastBiopsy';
import { breastConservingSurgery } from './breastConservingSurgery';
import { surgicalHemorrhoidectomy } from './surgicalHemorrhoidectomy';

// 5) Gastroenteroloji — Üst GİS → Alt GİS → İleri Girişimsel Endoskopi
import { gastroscopy } from './gastroscopy';
import { colonoscopy } from './colonoscopy';
import { eus } from './eus';
import { ercp } from './ercp';

// 6) Göğüs Cerrahisi — Tanısal/Girişimsel → Rekonstrüktif Hava Yolu
import { bronchoscopy } from './bronchoscopy';
import { trachealCricotrachealResection } from './trachealCricotrachealResection';

// 7) Kalp ve Damar Cerrahisi (KVC)
import { carotidEndarterectomy } from './carotidEndarterectomy';

// 8) Kardiyoloji (Girişimsel)
import { transcatheterAorticValveImplantation } from './transcatheterAorticValveImplantation';

// 9) Psikiyatri
import { ekt } from './ekt';

export {
  craniotomyAneurysm,
  endovascularAneurysmCoilingEmbolization,
  craniotomyVascularMalformation,
  craniotomyEcIcBypass,
  endovascularMechanicalThrombectomy,
  craniotomyEmbolectomy,
  craniotomyTumor,
  awakeCraniotomy,
  craniotomyTrauma,
  chronicSubduralHematomaMma,
  intracerebralHemorrhageEvacuation,
  craniotomyMicrovascularDecompression,
  posteriorFossaCpaTumor,
  bifrontalCraniotomyCsfLeak,
  transsphenoidalPituitaryResection,
  craniocervicalDecompressionChiari,
  ventricularShuntProcedures,
  endoscopicThirdVentriculostomy,
  pediatricCraniosynostosis,
  pediatricMyelomeningoceleRepair,
  stereotacticNeurosurgery,
  stereotacticDbsPallidotomyThalamotomy,
  epilepsySurgery,
  vagalNerveStimulation,
  surgeryForSpasticity,
  surgicalAnalgesicsStimulationPumps,
  percutaneousTrigeminalNeuralgia,
  anteriorUpperCervicalFusion,
  posteriorUpperCervicalFusion,
  anteriorMidLowerCervicalFusion,
  posteriorMidLowerCervicalFusion,
  anteriorCervicothoracicSpineSurgery,
  anteriorThoracicSpineSurgery,
  posteriorThoracicSpineSurgery,
  anteriorLumbarLumbosacralSpineSurgery,
  posteriorLumbarSpineSurgery,
  posteriorLumbarFusionInstrumentation,
  combinedAnteriorPosteriorThoracolumbarInstrumentation,
  cataractExtractionIolInsertion,
  pterygiumExcision,
  cornealTransplant,
  trabeculectomy,
  retinalSurgery,
  repairRupturedLaceratedGlobe,
  ptosisRepair,
  ectropionRepair,
  entropionRepair,
  eyelidReconstruction,
  dacryocystorhinostomy,
  orbitotomyAnteriorLateral,
  tonsillectomyAdenoidectomy,
  zenkersDiverticulectomy,
  laryngoscopy,
  laryngealFrameworkSurgery,
  laryngectomyPartialTotal,
  intubationForEpiglottitis,
  tracheostomyCricothyroidotomy,
  laparoscopicCholecystectomy,
  openCholecystectomy,
  breastBiopsy,
  breastConservingSurgery,
  surgicalHemorrhoidectomy,
  gastroscopy,
  colonoscopy,
  eus,
  ercp,
  bronchoscopy,
  trachealCricotrachealResection,
  carotidEndarterectomy,
  transcatheterAorticValveImplantation,
  ekt
};

/**
 * Cerrahi Branş Meta Verileri (Aktif branşlar prosedür yoğunluğuna göre üstte, hazırlanan branşlar altta)
 */
export const SURGICAL_SPECIALTIES: SurgicalSpecialtyMeta[] = [
  {
    id: 'norosirurji',
    name: 'Beyin ve Sinir Cerrahisi',
    shortName: 'Nöroşirürji',
    description: 'Kraniyotomi (anevrizma, tümör, hematom), girişimsel nöroradyoloji (EVT, koilleme), posterior fossa/pediatrik, fonksiyonel cerrahi ve kraniyokaudal omurga stabilizasyonları'
  },
  {
    id: 'goz',
    name: 'Göz Hastalıkları',
    shortName: 'Göz Cerrahisi',
    description: 'Ön segment (FAKO, keratoplasti, glokom), vitreoretinal cerrahi, glob travması ve oküloplastik ameliyatlar'
  },
  {
    id: 'kbb',
    name: 'Kulak Burun Boğaz',
    shortName: 'KBB',
    description: 'Tonsillektomi, mikrolaringocerrahi, larenjektomi, baş-boyun ve ileri hava yolu cerrahileri'
  },
  {
    id: 'genel_cerrahi',
    name: 'Genel Cerrahi',
    shortName: 'Genel Cerrahi',
    description: 'Laparoskopik ve açık batın, meme, tiroid, kolorektal ve hepatobiliyer cerrahiler'
  },
  {
    id: 'gastroenteroloji',
    name: 'Gastroenteroloji',
    shortName: 'Gastroenteroloji',
    description: 'Tanısal ve girişimsel üst GİS endoskopi, kolonoskopi, polipektomi, EUS ve ERCP sedasyonu'
  },
  {
    id: 'gogus_cerrahisi',
    name: 'Göğüs Cerrahisi',
    shortName: 'Göğüs Cerrahi',
    description: 'Bronkoskopi, trakeal/krikotrakeal rezeksiyon, VATS, torakotomi ve akciğer cerrahileri'
  },
  {
    id: 'kvc',
    name: 'Kalp ve Damar Cerrahisi',
    shortName: 'KVC',
    description: 'Karotis endarterektomi, açık kalp (KABG, kapak replasmanı), periferik vasküler ve aort cerrahileri'
  },
  {
    id: 'cocuk_cerrahisi',
    name: 'Çocuk Cerrahisi',
    shortName: 'Çocuk Cerrahi',
    description: 'Yenidoğan ve pediatrik genel, nöroşirürji, KBB, ürolojik ve torasik cerrahi girişimler'
  },
  {
    id: 'kardiyoloji',
    name: 'Kardiyoloji (Girişimsel)',
    shortName: 'Kardiyoloji',
    description: 'Transkateter aort kapak implantasyonu (TAVİ/TAVR), perkütan koroner girişimler ve yapısal kalp hastalıkları yönetimi'
  },
  {
    id: 'psikiyatri',
    name: 'Psikiyatri',
    shortName: 'Psikiyatri',
    description: 'Elektrokonvülsif tedavi (EKT / ECT), transkraniyal manyetik stimülasyon (TMS) ve psikiyatrik girişim anestezi yönetimi'
  },
  {
    id: 'kadin_dogum',
    name: 'Kadın Hastalıkları ve Doğum',
    shortName: 'Kadın Doğum',
    description: 'Elektif/acil sezaryen, jinekolojik onkoloji, histerektomi ve laparoskopi'
  },
  {
    id: 'ortopedi',
    name: 'Ortopedi ve Travmatoloji',
    shortName: 'Ortopedi',
    description: 'Artroplasti (diz, kalça, omuz), artroskopi, travma ve omurga cerrahileri'
  },
  {
    id: 'plastik_cerrahi',
    name: 'Plastik ve Rekonstrüktif Cerrahi',
    shortName: 'Plastik Cerrahi',
    description: 'Doku flepleri, maksillofasiyal travma, yanık rekonstrüksiyonu ve estetik cerrahi'
  },
  {
    id: 'uroloji',
    name: 'Üroloji',
    shortName: 'Üroloji',
    description: 'TUR-P, TUR-M, radikal prostatektomi, nefrektomi ve endoürolojik girişimler'
  }
];

/**
 * Kayıtlı Tüm Prosedürler Kataloğu
 * Branş ve anatomik/klinik hiyerarşiye göre sistematik sıralama
 */
export const REGISTERED_PROCEDURES: ProcedureDefinition[] = [
  // Nöroşirürji — Kraniyal Vasküler, Girişimsel Nöroradyoloji, Tümör & Travma
  craniotomyAneurysm,
  endovascularAneurysmCoilingEmbolization,
  craniotomyVascularMalformation,
  craniotomyEcIcBypass,
  endovascularMechanicalThrombectomy,
  craniotomyEmbolectomy,
  craniotomyTumor,
  awakeCraniotomy,
  craniotomyTrauma,
  chronicSubduralHematomaMma,
  intracerebralHemorrhageEvacuation,

  // Nöroşirürji — Kafa Tabanı, Posterior Fossa, BOS & Pediatrik
  craniotomyMicrovascularDecompression,
  posteriorFossaCpaTumor,
  bifrontalCraniotomyCsfLeak,
  transsphenoidalPituitaryResection,
  craniocervicalDecompressionChiari,
  ventricularShuntProcedures,
  endoscopicThirdVentriculostomy,
  pediatricCraniosynostosis,
  pediatricMyelomeningoceleRepair,

  // Nöroşirürji — Fonksiyonel, Epilepsi ve Ağrı Cerrahisi
  stereotacticNeurosurgery,
  stereotacticDbsPallidotomyThalamotomy,
  epilepsySurgery,
  vagalNerveStimulation,
  surgeryForSpasticity,
  surgicalAnalgesicsStimulationPumps,
  percutaneousTrigeminalNeuralgia,

  // Nöroşirürji — Spinal Cerrahi (Kraniyokaudal: Üst Servikal -> Lumbosakral/Pelvis)
  anteriorUpperCervicalFusion,
  posteriorUpperCervicalFusion,
  anteriorMidLowerCervicalFusion,
  posteriorMidLowerCervicalFusion,
  anteriorCervicothoracicSpineSurgery,
  anteriorThoracicSpineSurgery,
  posteriorThoracicSpineSurgery,
  anteriorLumbarLumbosacralSpineSurgery,
  posteriorLumbarSpineSurgery,
  posteriorLumbarFusionInstrumentation,
  combinedAnteriorPosteriorThoracolumbarInstrumentation,

  // Göz Hastalıkları — Ön Segment -> Arka Segment -> Travma -> Oküloplastik & Orbita
  cataractExtractionIolInsertion,
  pterygiumExcision,
  cornealTransplant,
  trabeculectomy,
  retinalSurgery,
  repairRupturedLaceratedGlobe,
  ptosisRepair,
  ectropionRepair,
  entropionRepair,
  eyelidReconstruction,
  dacryocystorhinostomy,
  orbitotomyAnteriorLateral,

  // Kulak Burun Boğaz — Faringeal/Özofageal -> Laringoloji -> Onkoloji -> Acil/İleri Hava Yolu
  tonsillectomyAdenoidectomy,
  zenkersDiverticulectomy,
  laryngoscopy,
  laryngealFrameworkSurgery,
  laryngectomyPartialTotal,
  intubationForEpiglottitis,
  tracheostomyCricothyroidotomy,

  // Genel Cerrahi — Hepatobiliyer -> Meme Cerrahisi -> Kolorektal & Anorektal
  laparoscopicCholecystectomy,
  openCholecystectomy,
  breastBiopsy,
  breastConservingSurgery,
  surgicalHemorrhoidectomy,

  // Gastroenteroloji — Üst GİS -> Alt GİS -> İleri Girişimsel Endoskopi
  gastroscopy,
  colonoscopy,
  eus,
  ercp,

  // Göğüs Cerrahisi
  bronchoscopy,
  trachealCricotrachealResection,

  // Kalp ve Damar Cerrahisi
  carotidEndarterectomy,

  // Kardiyoloji (Girişimsel)
  transcatheterAorticValveImplantation,

  // Psikiyatri
  ekt
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
  return REGISTERED_PROCEDURES.filter(p => 
    p.specialty === specialty || (p.secondarySpecialties && p.secondarySpecialties.includes(specialty))
  );
}

function normalizeTrSearch(value: string): string {
  return value.toLocaleLowerCase('tr-TR');
}

/**
 * Serbest metin arama (Türkçe İ/ı uyumlu; İsim, Branş, Endikasyon, Kategori, Anestezi Tekniği, Pozisyon, Monitör ve Hayati İlkeler)
 */
export function searchProcedures(
  query: string, 
  specialty: SurgicalSpecialty | 'all' = 'all'
): ProcedureDefinition[] {
  const normalized = normalizeTrSearch(query.trim());
  const pool = getProceduresBySpecialty(specialty);

  if (!normalized) return pool;

  const tokens = normalized.split(/\s+/).filter(Boolean);

  return pool.filter(p => {
    const haystack = normalizeTrSearch(
      [
        p.id,
        p.name,
        p.shortCode || '',
        p.specialtyName,
        p.description,
        p.categoryTag || '',
        ...(p.indications || []),
        ...(p.anesthesiaTechniques?.primary || []),
        ...(p.anesthesiaTechniques?.alternative || []),
        p.anesthesiaTechniques?.notes || '',
        ...(p.anesthesiaTechniques?.indispensableRules || []).map(r => `${r.title} ${r.content}`),
        p.intraoperative?.patientPosition || '',
        ...(p.intraoperative?.monitoring || []),
        ...(p.intraoperative?.airwayManagement || [])
      ].join(' ')
    );

    return tokens.every(token => haystack.includes(token));
  });
}
