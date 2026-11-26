import type {
  AdverseEffectItem,
  ClinicalCautionItem,
  MechanismPillar,
  OrganHepaticTierCard,
  OrganRenalMatrixRow,
  StructuredDrugInteraction,
  TissueOrganSystemCard,
  TurkeyPreparationItem,
  VerifiedDrugReference,
} from '../../components/treatments/shared/DrugMonographBlocks';
import type { DosingScalarType } from '../../components/treatments/shared/ObesityDosingScaler';

export type AntimicrobialClassTag =
  | 'beta_lactam'
  | 'carbapenem_blbli'
  | 'glycopeptide_lipopeptide'
  | 'polymyxin'
  | 'aminoglycoside'
  | 'macrolide'
  | 'echinocandin';

export interface AntimicrobialRegimenCard {
  title: string;
  setting: 'core' | 'perioperative' | 'icu' | 'special';
  badge: string;
  dose: string;
  infusionDuration: string;
  interval: string;
  note: string;
}

export interface AntimicrobialRenalTier {
  id: string;
  label: string;
  egfrRange: string;
  recommendation: string;
  doseText: string;
  note: string;
  tone: 'emerald' | 'amber' | 'rose' | 'sky';
}

export interface AntimicrobialCalcConfig {
  defaultWeightKg: number;
  weightScalar: DosingScalarType;
  secondaryScalar?: { type: DosingScalarType; context: string };
  obesityRationale: string;

  /** Sekme 1: Perioperatif Cerrahi Profilaksi & İntraoperatif Redozaj */
  perioperative: {
    applicable: boolean;
    summaryTitle: string;
    timingWindow: string;
    standardDoseLabel: string;
    /** kg -> { doseDisplay, note, highWeightTriggered } */
    adultStandardDoseMg: number;
    highWeightThresholdKg?: number;
    highWeightDoseMg?: number;
    /** Eğer kg bazlı profilaksi ise (örn. Vankomisin 15 mg/kg, Amikasin 15 mg/kg) */
    weightBasedMgKg?: number;
    weightBasedMaxMg?: number;
    pediatricMgKg?: number;
    pediatricMaxMg?: number;
    infusionTimeText: string;
    redoseHours?: number;
    bloodLossRedoseMl?: number;
    clinicalNote: string;
    nonProphylaxisReason?: string;
  };

  /** Sekme 2: YBÜ Sepsis / MDR / Yükleme & Uzamış İnfüzyon */
  icu: {
    pkPdTarget: string;
    pkPdBadge: string;
    loadingDoseLabel: string;
    loadingWeightBasedMgKg?: number;
    loadingFixedMg?: number;
    loadingMaxMg?: number;
    loadingUnit?: 'mg' | 'MIU' | 'IU';
    loadingInfusionText: string;
    maintenanceLabel: string;
    maintenanceMode: 'fixed_regimen' | 'weight_based_qinterval' | 'colistin_cba_miu' | 'polymyxin_b_iu';
    /** Sabit rejim seçenekleri (örn. Meropenem 1g vs 2g, EI 3 saat vs 30 dk) */
    fixedOptions?: {
      id: string;
      label: string;
      singleDoseMg: number;
      intervalHours: number;
      infusionHours: number;
      diluentVolumeMl: number;
      note: string;
    }[];
    /** Kilo bazlı seçenekler (örn. Vankomisin, Teikoplanin, Daptomisin, Amikasin) */
    weightOptions?: {
      id: string;
      label: string;
      mgPerKg: number;
      maxSingleMg?: number;
      intervalHours: number;
      infusionHours: number;
      diluentVolumeMl: number;
      note: string;
    }[];
    tdmNote?: string;
    specialConversionNote?: string;
  };

  /** Sekme 3: Böbrek Yetmezliği / eGFR / CRRT / HD Doz Ayarlama */
  renalTiers: AntimicrobialRenalTier[];
  crrtSummary: string;
  hdSummary: string;
}

export interface AntimicrobialMonographData {
  id: string;
  classTag: AntimicrobialClassTag;
  accentColor: 'teal' | 'cyan' | 'purple' | 'rose';
  atcCode: string;
  classLabel: string;
  tradeNamesTr: string;
  title: string;
  cardTitle: string;
  cardBadge: string;
  cardCategoryLabel: string;
  cardShortDesc: string;
  cardHighlights: {
    label: string;
    value: string;
    subtext?: string;
    tooltip?: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
  }[];
  aliases: string[];
  searchKeywords: string[];

  /** 1. ISMP High-Alert & Tall-Man */
  highAlert: {
    tallManName: string;
    confusionRiskWith: string;
    criticalAlerts: string[];
    antidoteOrRescue: string;
  };

  /** 2. Özet & Etki Mekanizması */
  identitySummary: string;
  spectrumHighlights: {
    title: string;
    detail: string;
    tone: 'emerald' | 'amber' | 'rose';
  }[];
  mechanismSummary: string;
  mechanismPillars: MechanismPillar[];

  /** 3. PK / ADME Akordiyonu */
  pkCards: {
    label: string;
    value: string;
    detail: string;
  }[];

  /** 4. Kontrendikasyonlar (Endikasyonlardan ÖNCE!) */
  contraindications: {
    absoluteItems: string[];
    relativeItems: string[];
    clinicalNote?: string;
  };

  /** 5. Klinik Endikasyonlar & Dozaj (Perioperatif + YBÜ) */
  regimenCards: AntimicrobialRegimenCard[];

  /** 6. İnteraktif Hesaplayıcı Konfigürasyonu */
  calculator: AntimicrobialCalcConfig;

  /** 7. Türkiye Preparatları */
  turkeyFormulations: {
    preparations: TurkeyPreparationItem[];
    standardDilutions: string[];
    concentrationTrapWarning: string;
  };

  /** 8. Damar Yolu & Y-Site Uyumluluk */
  compatibility: {
    accessRequirement: 'central-mandatory' | 'central-preferred' | 'peripheral-ok';
    accessSummary: string;
    phRange: string;
    osmolalityNote: string;
    compatibleDiluents: string[];
    ySiteCompatible: string[];
    ySiteIncompatible: string[];
    stabilityNote: string;
    extravasationProtocol: string;
  };

  /** 9. Böbrek & Karaciğer Yetmezliği */
  organImpairment: {
    renalSummary: string;
    renalDetails: string[];
    hepaticSummary: string;
    hepaticDetails: string[];
    renalMatrix?: OrganRenalMatrixRow[];
    hepaticMatrix?: OrganHepaticTierCard[];
    dualOrganNote?: string;
  };

  /** 10. Geriatri & Obezite */
  geriatricObesity: {
    geriatricReductionBadge: string;
    geriatricPoints: string[];
    obesityWeightScalarBadge: string;
    obesityPoints: string[];
    clinicalNote: string;
  };

  /** 11. Gebelik & Laktasyon */
  pregnancyLactation: {
    pregnancySummary: string;
    pregnancyDetails: string[];
    lactationSummary: string;
    lactationDetails: string[];
  };

  /** 12. Önemli Olumsuz Etkiler */
  adverseEffects: AdverseEffectItem[];

  /** 13. Özel Klinik Durumlar */
  specialClinicalCautions: ClinicalCautionItem[];

  /** 14. 4 Kademeli Derin Farmakodinami */
  deepPharmacodynamics: {
    receptorMechanism: { title?: string; summary: string; points: string[] };
    intracellularSignaling: { title?: string; summary: string; points: string[] };
    tissueOrganSystems: TissueOrganSystemCard[];
    synergyAndCeiling: { title?: string; summary?: string; points: string[] };
    clinicalPearls: string[];
  };

  /** 15. Etkileşimler & Kaynakça */
  referencesAndInteractions: {
    drugName: string;
    structuredInteractions: StructuredDrugInteraction[];
    references: VerifiedDrugReference[];
    drugsComUrl: string;
    medscapeUrl: string;
    medscapeLabel?: string;
  };
}
