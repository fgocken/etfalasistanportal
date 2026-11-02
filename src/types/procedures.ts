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
  | 'gastroenteroloji'
  | 'psikiyatri';

export interface SurgicalSpecialtyMeta {
  id: SurgicalSpecialty;
  name: string;
  shortName: string;
  description: string;
}

export interface BleedingProfile {
  // Beklenen ortalama kan kaybı miktarı (EBL)
  estimatedBloodLoss: string; // örn: "< 50 mL (minimal / ihmal edilebilir)" veya "100 - 300 mL"
  // Kanama risk derecesi
  riskLevel: 'minimal' | 'low' | 'moderate' | 'high' | 'massive_potential';
  riskLevelLabel: string; // örn: "Minimal / İhmal Edilebilir", "Düşük Risk", "Orta Düzey Risk", "Yüksek / Potansiyel Masif"
  // Kan grubu ve Cross-Match / T&S hazırlık durumu
  crossMatchRequirement: string; // örn: "Rutin kan hazırlığı gerekmez (T&S opsiyonel)", "1-2 Ünite ES Cross-Match hazır bulundurulmalıdır"
  // Olası transfüzyon gereksinimi oranı
  transfusionProbability: string; // örn: "< %1 (Çok Düşük)", "%5 - %15", vb.
  // Potansiyel majör cerrahi/girişimsel kanama odakları ve anatomik risk noktaları
  criticalBleedingSources?: string[];
  // Hemostaz & Kan Koruma Stratejisi (Traneksamik asit, cell saver, koter, klips vb.)
  hemostasisStrategies?: string[];
}

export interface ProcedureDefinition {
  id: string;
  name: string;
  shortCode?: string;
  specialty: SurgicalSpecialty;
  specialtyName: string;
  
  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: string;
  indications: string[];
  averageDuration: string; // örn: "60 - 90 dk"
  categoryTag?: string; // örn: "Laparoskopik Cerrahi", "Açık Girişim", vb.

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile?: BleedingProfile;

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: string[];
    alternative?: string[];
    notes?: string;
  };

  // 4) Pre-operatif Hazırlık
  preoperative: {
    // 4a) Prosedür Spesifik Dikkat Edilmesi Gereken Konsültasyonlar
    consultations?: string[];
    // 4b) Prosedür Spesifik Anamnez ve Fizik Muayenede Dikkat Edilecekler
    historyAndPhysical?: string[];
    // 4c) Prosedür Spesifik Kan ve Laboratuvar Sonuçlarında Dikkat Edilecekler
    laboratoryAndTests?: string[];
  };

  // 5) İntra-operatif Yönetim
  intraoperative: {
    // 5a) Prosedür Spesifik Monitörizasyon
    monitoring: string[];
    // 5b) Prosedür Spesifik Gerekli Vasküler Erişimler
    vascularAccess: string[];
    // 5c) Hasta Pozisyonu & Fizyolojik Güvenlik Önlemleri
    patientPosition: string;
    patientPositionDetails?: string[];
    // 5d) Prosedür Bazlı Anestezi Yönetimi (İndüksiyon, İdame, Nöromusküler Strateji)
    anesthesiaManagement: string[];
    // 5e) Prosedür Bazlı Hava Yolu Yönetimi
    airwayManagement: string[];
    // 5f) Prosedür Spesifik Dikkat Edilmesi Gereken Kritik Karar Noktaları ve Cerrahi Aşamaları
    criticalSurgicalStages: string[];
    // 5g) Uyandırmada (Emergence) Dikkat Edilmesi Gerekenler
    emergenceNotes: string[];
  };

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    // 6a) Ağrı Yönetimi & Multimodal Analjezi Stratejisi
    painManagement: string[];
    // 6b) Varsa PROSPECT Rehber Önerileri
    prospectRecommendations?: string[];
    // 6c) Varsa ERAS Rehberi Önerileri
    erasRecommendations?: string[];
  };

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference?: string; // Jaffe 5th ed.
    erasReference?: string;
    prospectReference?: string;
    otherReferences?: string[];
  };
}
