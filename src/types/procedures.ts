/**
 * Sistematik Prosedür Bazlı Anestezi Yönetimi
 * Veri Modeli ve Tip Tanımları
 * 
 * Şişli Hamidiye Etfal EAH Anesteziyoloji ve Reanimasyon Kliniği
 */

export type SurgicalSpecialty =
  | 'genel_cerrahi'
  | 'ortopedi'
  | 'kadin_dogum'
  | 'kvc'
  | 'uroloji'
  | 'kbb'
  | 'norosirurji'
  | 'plastik_cerrahi'
  | 'gogus_cerrahisi'
  | 'cocuk_cerrahisi'
  | 'goz'
  | 'gastroenteroloji';

export interface SurgicalSpecialtyMeta {
  id: SurgicalSpecialty;
  name: string;
  shortName: string;
  description: string;
}

export interface ProcedureDefinition {
  id: string;
  name: string;
  shortCode?: string;
  specialty: SurgicalSpecialty;
  specialtyName: string;
  
  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: string;
  indications: string[];
  averageDuration: string; // örn: "60 - 90 dk"
  categoryTag?: string; // örn: "Laparoskopik Cerrahi", "Açık Girişim", vb.

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: string[];
    alternative?: string[];
    notes?: string;
  };

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations?: string[];
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical?: string[];
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests?: string[];
  };

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: string[];
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: string[];
    // 4c) Hasta pozisyonu
    patientPosition: string;
    patientPositionDetails?: string[];
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: string[];
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: string[];
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve dikkat edilmesi gereken cerrahi aşamaları
    criticalSurgicalStages: string[];
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: string[];
  };

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: string[];
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations?: string[];
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations?: string[];
  };

  // Kullanılabilecek kaynaklar
  references: {
    jaffeReference?: string; // Jaffe 5th ed.
    erasReference?: string;
    prospectReference?: string;
    otherReferences?: string[];
  };
}
