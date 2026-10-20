export type TabType = 
  | 'overview'
  | 'calculators'
  | 'drugs'
  | 'labs'
  | 'protocols'
  | 'notes'
  | 'ward'
  | 'directory'
  | 'abbreviations';

export interface LabParameter {
  id: string;
  name: string;
  nameTr: string;
  tube: 'purple' | 'yellow' | 'blue' | 'green' | 'urine';
  tubeLabel: string;
  referenceRange: string;
  unit: string;
  clinicalSignificance: string;
  highCauses: string[];
  lowCauses: string[];
}

export interface DrugMonograph {
  id: string;
  genericName: string;
  brandNames: string;
  category: string;
  indication: string;
  standardDoseAdult: string;
  standardDosePediatric?: string;
  administration: string;
  dilution: string;
  infusionRate?: string;
  contraindications: string;
  keyCautions: string;
  renalAdjustment?: string;
}

export interface EmergencyProtocol {
  id: string;
  title: string;
  urgency: 'critical' | 'urgent' | 'routine';
  indication: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    actionableItems?: string[];
    medications?: string[];
  }[];
  pearls: string[];
}

export interface ClinicContact {
  id: string;
  unitName: string;
  department: string;
  extension: string;
  altPhone?: string;
  location: string;
  responsibleTitle: string;
  isCustom?: boolean;
}

export interface WardTask {
  id: string;
  roomNumber: string;
  patientAlias: string;
  taskTitle: string;
  category: 'blood' | 'radiology' | 'consultation' | 'medication' | 'dressing' | 'discharge' | 'general';
  priority: 'urgent' | 'routine' | 'pre-round';
  notes?: string;
  completed: boolean;
  createdAt: number;
}
