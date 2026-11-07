/**
 * Anestezi Troubleshooting (Perioperatif Kriz ve Sorun Giderme Rehberi)
 * 
 * Şişli Hamidiye Etfal EAH Anesteziyoloji ve Reanimasyon Kliniği
 * İçeriği kademeli olarak doldurulmak üzere hazırlanan klinik sorun giderme veri modeli.
 */

export type TroubleshootingCategory = 
  | 'ventilator' 
  | 'hemodynamics' 
  | 'monitoring' 
  | 'drugs-fluids'
  | 'metabolic';

export type TroubleshootingUrgency = 'critical' | 'urgent' | 'warning';

export interface TroubleshootingDifferentialItem {
  condition: string;
  frequency: 'Çok Yaygın' | 'Yaygın' | 'Nadir' | 'Kritik';
  clues: string;
  confirmatoryTest: string;
  immediateAction: string;
}

export interface TroubleshootingAlgorithmicStep {
  stepNumber: number;
  phase: string;
  action: string;
  detail: string;
  checkTip?: string;
}

export interface TroubleshootingItem {
  id: string;
  title: string;
  subtitle: string;
  category: TroubleshootingCategory;
  urgency: TroubleshootingUrgency;
  primaryAlarm?: string;
  summary: string;
  goldenSixtySeconds: string[];
  differentialDiagnosis: TroubleshootingDifferentialItem[];
  algorithmicSteps: TroubleshootingAlgorithmicStep[];
  pearlsAndPitfalls: {
    pearls: string[];
    pitfalls: string[];
  };
  equipmentChecklist: string[];
  tags: string[];
}

export interface TroubleshootingCategoryMeta {
  id: TroubleshootingCategory;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
}

export const TROUBLESHOOTING_CATEGORIES: TroubleshootingCategoryMeta[] = [
  {
    id: 'ventilator',
    name: 'Ventilatör & Solunum Devresi Alarmları',
    shortName: 'Ventilatör & Solunum',
    description: 'Ppeak yüksekliği, devre ayrılması, tidal hacim düşüklüğü ve kaçaklar',
    iconName: 'Wind'
  },
  {
    id: 'hemodynamics',
    name: 'Hemodinamik Kriz & Dalgalanmalar',
    shortName: 'Hemodinami',
    description: 'Ani hipotansiyon, şiddetli hipertansiyon, bradikardi ve taşikardi',
    iconName: 'Activity'
  },
  {
    id: 'monitoring',
    name: 'Monitörizasyon & Sinyal Hataları',
    shortName: 'Monitörizasyon',
    description: 'Sönümlü arter trasesi, SpO2 artefaktı, EKG ve EtCO2 anomalileri',
    iconName: 'Sliders'
  },
  {
    id: 'drugs-fluids',
    name: 'İlaç İnfüzyonu & TIVA Hatları',
    shortName: 'İlaç & İnfüzyon',
    description: 'Damar yolu ekstravazasyonu, pompa oklüzyonu ve anestezi derinliği',
    iconName: 'Syringe'
  },
  {
    id: 'metabolic',
    name: 'Isı & Metabolizma Anomalileri',
    shortName: 'Metabolik & Isı',
    description: 'Açıklanamayan hiperkapni, asidoz, hipotermi ve elektrolit kaymaları',
    iconName: 'Thermometer'
  }
];

/**
 * Kullanıcı isteği doğrultusunda başlangıçta tamamen boştur ("içeriği bomboş olsun").
 * Kademeli olarak ameliyathane kriz ve arıza algoritmalarıyla doldurulacaktır.
 */
export const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [];
