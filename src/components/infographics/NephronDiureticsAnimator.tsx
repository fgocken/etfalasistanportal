import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Activity,
  ShieldAlert,
  CheckCircle2,
  Zap,
  Pill,
  AlertTriangle,
  Gauge,
  BookOpen,
  Lock,
  Filter,
  Sparkles,
} from 'lucide-react';

// ============================================================================
// TİP TANIMLAMALARI (Strict TypeScript Interfaces & Types)
// ============================================================================

export type DiureticId =
  | 'cai'
  | 'osmotic'
  | 'loop'
  | 'thiazide'
  | 'ksparing'
  | 'vaptan';

export type NephronSegmentId =
  | 'glomerulus'
  | 'pct'
  | 'thin_descending'
  | 'tal'
  | 'dct'
  | 'collecting_duct';

export type IonType =
  | 'Na+'
  | 'Cl-'
  | 'K+'
  | 'Ca2+'
  | 'Mg2+'
  | 'HCO3-'
  | 'H2O'
  | 'H+'
  | 'Mannitol';

export type SpeedMultiplier = 0.5 | 1 | 2;

export type EffectDirection = 'up-strong' | 'up' | 'down' | 'down-strong' | 'neutral';

export type GlossaryCategory = 'İyon' | 'Taşıyıcı' | 'Kanal' | 'Reseptör' | 'Enzim' | 'Hormon / Ajan';

export interface ElectrolyteChange {
  symbol: string;
  fullName: string;
  direction: EffectDirection;
  label: string;
  note?: string;
}

export interface GlossaryItem {
  id: string;
  symbol: string;
  fullName: string;
  category: GlossaryCategory;
  ionKey?: IonType;
  generalRole: string;
  relevantGroups: DiureticId[];
  groupSpecificEffect?: Partial<Record<DiureticId, string>>;
}

export interface DiureticProfile {
  id: DiureticId;
  name: string;
  shortName: string;
  prototypes: string[];
  targetSegments: NephronSegmentId[];
  primarySegment: NephronSegmentId;
  segmentLabel: string;
  molecularTarget: string;
  accentColor: string;
  diuresisScore: number; // 0 - 100 (normal fizyoloji = 22)
  diuresisLabel: string;
  feNaPercent: string;
  summary: string;
  normalMechanism: string;
  blockedMechanism: string;
  electrolytes: ElectrolyteChange[];
  acidBaseEffect: string;
  clinicalUses: string[];
  sideEffects: string[];
}

interface Point2D {
  x: number;
  y: number;
}

interface SampledPoint extends Point2D {
  nx: number; // Tübül dışına doğru birim normal vektör x
  ny: number; // Tübül dışına doğru birim normal vektör y
  t: number; // 0..1 normalize ilerleme
  segment: NephronSegmentId;
}

// ============================================================================
// İYON GÖRSEL STİLLERİ VE RENK KODLARI
// ============================================================================

const ION_STYLES: Record<
  IonType,
  { color: string; stroke: string; textColor: string; label: string; radius: number }
> = {
  'Na+': { color: '#f59e0b', stroke: '#b45309', textColor: '#ffffff', label: 'Na⁺', radius: 11 },
  'Cl-': { color: '#10b981', stroke: '#047857', textColor: '#ffffff', label: 'Cl⁻', radius: 11 },
  'K+': { color: '#8b5cf6', stroke: '#5b21b6', textColor: '#ffffff', label: 'K⁺', radius: 11 },
  'Ca2+': { color: '#f43f5e', stroke: '#be123c', textColor: '#ffffff', label: 'Ca²⁺', radius: 11.5 },
  'Mg2+': { color: '#6366f1', stroke: '#3730a3', textColor: '#ffffff', label: 'Mg²⁺', radius: 11.5 },
  'HCO3-': { color: '#06b6d4', stroke: '#0e7490', textColor: '#ffffff', label: 'HCO₃⁻', radius: 12.5 },
  'H2O': { color: '#0ea5e9', stroke: '#0369a1', textColor: '#ffffff', label: 'H₂O', radius: 11 },
  'H+': { color: '#ef4444', stroke: '#991b1b', textColor: '#ffffff', label: 'H⁺', radius: 9.5 },
  Mannitol: { color: '#14b8a6', stroke: '#0f766e', textColor: '#ffffff', label: 'M', radius: 13 },
};

export const DIURETIC_ORDER: DiureticId[] = [
  'cai',
  'osmotic',
  'loop',
  'thiazide',
  'ksparing',
  'vaptan',
];

// ============================================================================
// 6 DİÜRETİK SINIFI TIBBİ VERİ SETİ (Tüm metinlerde uzun ad + kısaltma birlikte)
// ============================================================================

const DARK_ACCENT_COLORS: Record<DiureticId, string> = {
  cai: '#22d3ee',
  osmotic: '#2dd4bf',
  loop: '#fb7185',
  thiazide: '#4ade80',
  ksparing: '#a78bfa',
  vaptan: '#60a5fa',
};

export const DIURETICS: Record<DiureticId, DiureticProfile> = {
  cai: {
    id: 'cai',
    name: 'Karbonik Anhidraz İnhibitörleri (KAI)',
    shortName: 'Karbonik Anhidraz İnh. (KAI)',
    prototypes: ['Asetazolamid', 'Dorzolamid', 'Brinzolamid'],
    targetSegments: ['pct'],
    primarySegment: 'pct',
    segmentLabel: 'Proksimal Kıvrımlı Tübül (PCT)',
    molecularTarget:
      'Apikal Karbonik Anhidraz Tip 4 (CA-IV) ve Sitozolik Karbonik Anhidraz Tip 2 (CA-II) Enzimleri',
    accentColor: '#0891b2',
    diuresisScore: 46,
    diuresisLabel: 'Hafif - Orta Şiddette Alkali Diürez',
    feNaPercent: '%3 - %5',
    summary:
      'Proksimal Kıvrımlı Tübül (PCT) bölgesinde Karbonik Anhidraz Tip 4 (CA-IV) ve Tip 2 (CA-II) enzimlerini inhibe ederek Bikarbonat (HCO₃⁻) geri emilimini durdurur ve Sodyum-Hidrojen Değiştiricisi Tip 3 (NHE3) üzerinden Sodyum (Na⁺) geri emilimini dolaylı olarak azaltır.',
    normalMechanism:
      'Lümen yüzeyindeki Karbonik Anhidraz Tip 4 (CA-IV) enzimi, Bikarbonat (HCO₃⁻) ve Hidrojen (H⁺) iyonlarını Karbondioksit (CO₂) ve Su (H₂O) moleküllerine dönüştürerek hücre içine geçişini sağlar. Hücre içindeki Karbonik Anhidraz Tip 2 (CA-II) yeniden Hidrojen (H⁺) üretir; bu iyon Sodyum-Hidrojen Değiştiricisi Tip 3 (NHE3) ile lümene verilirken Sodyum (Na⁺) hücreye alınır ve Bikarbonat (HCO₃⁻) Elektrojenik Sodyum-Bikarbonat Kotransporteri Tip 1 (NBCe1) aracılığıyla kana geçer.',
    blockedMechanism:
      'Asetazolamid, hem apikal Karbonik Anhidraz Tip 4 (CA-IV) hem de sitozolik Karbonik Anhidraz Tip 2 (CA-II) enzimlerini bloke eder. Bikarbonat (HCO₃⁻) lümenden geri emilemez; hücre içi Hidrojen (H⁺) üretimi azaldığından Sodyum-Hidrojen Değiştiricisi Tip 3 (NHE3) yavaşlar. Sonuç olarak Sodyum (Na⁺), Bikarbonat (HCO₃⁻), Potasyum (K⁺) ve Su (H₂O) idrarla atılır.',
    electrolytes: [
      { symbol: 'Na⁺', fullName: 'Sodyum', direction: 'up', label: '↑ Artar' },
      { symbol: 'K⁺', fullName: 'Potasyum', direction: 'up', label: '↑ Artar', note: 'Distal akış artışıyla' },
      { symbol: 'Cl⁻', fullName: 'Klorür', direction: 'neutral', label: '↔ / ↓ Hafif' },
      { symbol: 'Ca²⁺', fullName: 'Kalsiyum', direction: 'neutral', label: '↔ Değişmez' },
      { symbol: 'Mg²⁺', fullName: 'Magnezyum', direction: 'neutral', label: '↔ Değişmez' },
      { symbol: 'HCO₃⁻', fullName: 'Bikarbonat', direction: 'up-strong', label: '↑↑ Belirgin Artar' },
      { symbol: 'H₂O', fullName: 'Su', direction: 'up', label: '↑ Artar' },
    ],
    acidBaseEffect: 'Hiperkloremik Metabolik Asidoz (Alkali İdrar pH Artışı)',
    clinicalUses: [
      'Açık açılı glokom tedavisi (göz içi aköz hümör sıvısında Bikarbonat (HCO₃⁻) sentezini azaltır)',
      'Yüksek irtifa (akut dağ) hastalığı profilaksisi ve tedavisi (hafif metabolik asidoz solunumu uyarır)',
      'İdrar alkalinizasyonu (sistin ve ürik asit böbrek taşlarının çözünürlüğünü artırır)',
      'İdiyopatik intrakraniyal hipertansiyon ve metabolik alkalozun düzeltilmesi',
    ],
    sideEffects: [
      'Hiperkloremik metabolik asidoz (Bikarbonat (HCO₃⁻) kaybına bağlı) ve hipokalemi (Potasyum (K⁺) düşüklüğü)',
      'Alkali idrar nedeniyle Kalsiyum (Ca²⁺) fosfat böbrek taşı oluşumu riski',
      'Siroz hastalarında Amonyak (NH₃) atılımını azaltarak hepatik ensefalopatiyi tetikleyebilir',
      'Parestezi (uyuşma/karıncalanma), halsizlik ve sülfonamid aşırı duyarlılığı',
    ],
  },
  osmotic: {
    id: 'osmotic',
    name: 'Ozmotik Diüretikler',
    shortName: 'Ozmotik Diüretikler',
    prototypes: ['Mannitol', 'Üre', 'Gliserin'],
    targetSegments: ['pct', 'thin_descending'],
    primarySegment: 'thin_descending',
    segmentLabel: 'Proksimal Kıvrımlı Tübül (PCT) ve Henle İnen İnce Kolu',
    molecularTarget:
      'Lümen İçi Ozmotik Gradyan Artışı — Akuaporin-1 (AQP1) Suya Geçirgen Segmentler',
    accentColor: '#0d9488',
    diuresisScore: 74,
    diuresisLabel: 'Yüksek Şiddette Ozmotik Su Diürezi',
    feNaPercent: '%5 - %10 (Başlıca Serbest Su)',
    summary:
      'Glomerülden serbestçe süzülen ancak tübüllerden geri emilemeyen Mannitol, Proksimal Kıvrımlı Tübül (PCT) ve Henle İnen İnce Kolu lümeninde yüksek ozmotik basınç oluşturarak Su (H₂O) moleküllerini lümende tutar ve Akuaporin-1 (AQP1) kanallarından geri emilimi engeller.',
    normalMechanism:
      'Proksimal Kıvrımlı Tübül (PCT) ve Henle İnen İnce Kolu, Akuaporin-1 (AQP1) su kanalları ve paraselüler aralıklar sayesinde Su (H₂O) moleküllerine yüksek geçirgenlik gösterir. Hiperozmolar medulla gradyanı Su (H₂O) moleküllerini hızla interstisyum ve kana geri çeker.',
    blockedMechanism:
      'Geri emilemeyen Mannitol molekülleri tübül lümeni içinde ozmotik basıncı belirgin biçimde yükseltir. Bu ozmotik çekim gücü Su (H₂O) moleküllerini lümende alıkoyarak Akuaporin-1 (AQP1) üzerinden kana geçişi engeller; yoğun Su (H₂O) ve ikincil Sodyum (Na⁺) atılımı gerçekleşir.',
    electrolytes: [
      { symbol: 'Na⁺', fullName: 'Sodyum', direction: 'up', label: '↑ Artar', note: 'Hızlı akış ve seyrelme ile' },
      { symbol: 'K⁺', fullName: 'Potasyum', direction: 'up', label: '↑ Artar' },
      { symbol: 'Cl⁻', fullName: 'Klorür', direction: 'up', label: '↑ Artar' },
      { symbol: 'Ca²⁺', fullName: 'Kalsiyum', direction: 'up', label: '↑ Hafif Artar' },
      { symbol: 'Mg²⁺', fullName: 'Magnezyum', direction: 'up', label: '↑ Hafif Artar' },
      { symbol: 'HCO₃⁻', fullName: 'Bikarbonat', direction: 'neutral', label: '↔ Minimal' },
      { symbol: 'H₂O', fullName: 'Su', direction: 'up-strong', label: '↑↑ Çok Artar' },
    ],
    acidBaseEffect: 'Doğrudan Primer Asit-Baz Etkisi Yoktur (Hacim Kontraksiyonu Oluşabilir)',
    clinicalUses: [
      'Beyin ödemi ve Kafa İçi Basınç Artışı Sendromu (KİBAS) durumlarında acil basınç düşürme',
      'Akut açı kapanması glokomunda göz içi basıncının hızlı azaltılması',
      'Rabdomiyoliz ve nefrotoksik ilaç zehirlenmelerinde yüksek hızlı idrar akışı (zorlu diürez) sağlama',
    ],
    sideEffects: [
      'Başlangıçta damar içi hacim artışı nedeniyle akut akciğer ödemi riski (Kalp yetmezliğinde kontrendikedir!)',
      'Yoğun Su (H₂O) kaybına bağlı dehidratasyon ve hipernatremi (Sodyum (Na⁺) yükselmesi)',
      'İlk uygulama fazında hücre dışına su çekilmesine bağlı geçici dilüsyonel hiponatremi, baş ağrısı ve bulantı',
    ],
  },
  loop: {
    id: 'loop',
    name: 'Kıvrım (Lup) Diüretikleri',
    shortName: 'Kıvrım (Lup) Diüretikleri',
    prototypes: ['Furosemid', 'Bumetanid', 'Torsemid', 'Etakrinik Asit'],
    targetSegments: ['tal'],
    primarySegment: 'tal',
    segmentLabel: 'Henle Kulpu Çıkan Kalın Kolu (TAL)',
    molecularTarget:
      'Apikal Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2)',
    accentColor: '#e11d48',
    diuresisScore: 96,
    diuresisLabel: 'Çok Yüksek Şiddette Diürez (En Güçlü Sınıf)',
    feNaPercent: '%20 - %25',
    summary:
      'Henle Kulpu Çıkan Kalın Kolu (TAL) apikal membranındaki Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2) proteinini bloke ederek en güçlü natriürez ve diürezi sağlar; paraselüler Kalsiyum (Ca²⁺) ve Magnezyum (Mg²⁺) geri emilimini de durdurur.',
    normalMechanism:
      'Apikal Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2), Sodyum (Na⁺), Potasyum (K⁺) ve Klorür (Cl⁻) iyonlarını hücreye taşır. Potasyum (K⁺) iyonlarının Renal Dış Medüller Potasyum Kanalı (ROMK) üzerinden lümene geri dönmesi +8 mV lümen-pozitif potansiyel oluşturur; bu elektriksel itici güç Kalsiyum (Ca²⁺) ve Magnezyum (Mg²⁺) iyonlarını paraselüler yoldan kana iter.',
    blockedMechanism:
      'Furosemid, Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2) taşıyıcısını doğrudan bloke eder. Sodyum (Na⁺), Potasyum (K⁺) ve Klorür (Cl⁻) lümende kalır. Renal Dış Medüller Potasyum Kanalı (ROMK) kaynaklı +8 mV lümen-pozitif potansiyel kaybolduğundan paraselüler Kalsiyum (Ca²⁺) ve Magnezyum (Mg²⁺) geri emilimi de durur; tüm bu iyonlar Su (H₂O) ile birlikte idrarla atılır.',
    electrolytes: [
      { symbol: 'Na⁺', fullName: 'Sodyum', direction: 'up-strong', label: '↑↑ Çok Artar' },
      { symbol: 'K⁺', fullName: 'Potasyum', direction: 'up-strong', label: '↑↑ Çok Artar' },
      { symbol: 'Cl⁻', fullName: 'Klorür', direction: 'up-strong', label: '↑↑ Çok Artar' },
      { symbol: 'Ca²⁺', fullName: 'Kalsiyum', direction: 'up-strong', label: '↑↑ Artar', note: 'Paraselüler kayıp' },
      { symbol: 'Mg²⁺', fullName: 'Magnezyum', direction: 'up-strong', label: '↑↑ Artar', note: 'Paraselüler kayıp' },
      { symbol: 'HCO₃⁻', fullName: 'Bikarbonat', direction: 'neutral', label: '↔ Minimal' },
      { symbol: 'H₂O', fullName: 'Su', direction: 'up-strong', label: '↑↑ Çok Artar' },
    ],
    acidBaseEffect: 'Hipokloremik Metabolik Alkaloz (Hacim Kontraksiyonu ve Hidrojen (H⁺) Kaybı)',
    clinicalUses: [
      'Akut akciğer ödemi ve akut dekompanse kalp yetmezliğinde hızlı sıvı yükü azaltma',
      'Nefrotik sendrom, karaciğer sirozu asiti ve kronik böbrek yetmezliği ödemlerinin tedavisi',
      'Şiddetli hiperkalsemi (Kalsiyum (Ca²⁺) yüksekliği) tedavisinde izotonik sıvı infüzyonuyla birlikte',
      'Hiperkalemi (Potasyum (K⁺) yüksekliği) ve dirençli hipertansiyon yönetimi',
    ],
    sideEffects: [
      'Hipokalemi (Potasyum (K⁺) düşüklüğü), hipokalsemi (Kalsiyum (Ca²⁺) düşüklüğü), hipomagnezemi (Magnezyum (Mg²⁺) düşüklüğü) ve metabolik alkaloz',
      'Ototoksisite (işitme kaybı; özellikle yüksek doz intravenöz uygulama veya aminoglikozid antibiyotiklerle birlikte)',
      'Hiperürisemi (gut atağı tetiklenebilir), hipovolemi ve ortostatik hipotansiyon',
      'Sülfonamid alerjisi (Etakrinik asit sülfonamid içermez, alternatif olarak kullanılabilir)',
    ],
  },
  thiazide: {
    id: 'thiazide',
    name: 'Tiyazid Diüretikleri',
    shortName: 'Tiyazid Diüretikleri',
    prototypes: ['Hidroklorotiyazid', 'Klortalidon', 'İndapamid'],
    targetSegments: ['dct'],
    primarySegment: 'dct',
    segmentLabel: 'Erken Distal Kıvrımlı Tübül (DCT)',
    molecularTarget:
      'Apikal Sodyum-Klorür Kotransporteri (NCC)',
    accentColor: '#16a34a',
    diuresisScore: 62,
    diuresisLabel: 'Orta Şiddette Diürez (Kalsiyum Koruyucu)',
    feNaPercent: '%5 - %10',
    summary:
      'Erken Distal Kıvrımlı Tübül (DCT) apikal membranındaki Sodyum-Klorür Kotransporteri (NCC) proteinini inhibe ederek Sodyum (Na⁺) ve Klorür (Cl⁻) atılımını artırırken, Kalsiyum (Ca²⁺) geri emilimini belirgin şekilde ARTIRIR.',
    normalMechanism:
      'Apikal Sodyum-Klorür Kotransporteri (NCC), Sodyum (Na⁺) ve Klorür (Cl⁻) iyonlarını hücre içine taşır. Bazolateral Sodyum-Potasyum Adenozin Trifosfataz Pompası (Na⁺/K⁺-ATPaz) hücre içi Sodyum (Na⁺) düzeyini düşük tutar. Kalsiyum (Ca²⁺) ise apikal Geçici Reseptör Potansiyeli Vanilloid 5 Kalsiyum Kanalı (TRPV5) üzerinden girip bazolateral Sodyum-Kalsiyum Değiştiricisi Tip 1 (NCX1) ile kana geçer.',
    blockedMechanism:
      'Hidroklorotiyazid, Sodyum-Klorür Kotransporteri (NCC) taşıyıcısını bloke eder; Sodyum (Na⁺), Klorür (Cl⁻) ve Su (H₂O) idrarla atılır. Hücre içi Sodyum (Na⁺) derişimi daha da düştüğü için bazolateral Sodyum-Kalsiyum Değiştiricisi Tip 1 (NCX1) hızlanır; bu durum apikal Geçici Reseptör Potansiyeli Vanilloid 5 Kalsiyum Kanalı (TRPV5) üzerinden Kalsiyum (Ca²⁺) geri emilimini ARTIRIR (hipokalsiüri).',
    electrolytes: [
      { symbol: 'Na⁺', fullName: 'Sodyum', direction: 'up', label: '↑ Artar' },
      { symbol: 'K⁺', fullName: 'Potasyum', direction: 'up', label: '↑ Artar', note: 'Distal Sodyum (Na⁺) yüküyle' },
      { symbol: 'Cl⁻', fullName: 'Klorür', direction: 'up', label: '↑ Artar' },
      { symbol: 'Ca²⁺', fullName: 'Kalsiyum', direction: 'down', label: '↓ İdrarda Azalır', note: 'Kanda tutulur!' },
      { symbol: 'Mg²⁺', fullName: 'Magnezyum', direction: 'up', label: '↑ Hafif Artar' },
      { symbol: 'HCO₃⁻', fullName: 'Bikarbonat', direction: 'neutral', label: '↔ Değişmez' },
      { symbol: 'H₂O', fullName: 'Su', direction: 'up', label: '↑ Artar' },
    ],
    acidBaseEffect: 'Hafif - Orta Dereceli Hipokloremik Metabolik Alkaloz',
    clinicalUses: [
      'Esansiyel hipertansiyon tedavisinde birinci basamak ilaç seçimi',
      'Hafif ve orta dereceli kronik kalp yetmezliğine bağlı ödem kontrolü',
      'İdiyopatik hiperkalsiüri ve tekrarlayan Kalsiyum (Ca²⁺) oksalat böbrek taşlarının önlenmesi',
      'Osteoporozda kemik Kalsiyum (Ca²⁺) korunması ve nefrojenik diabetes insipidus (paradoksal etki)',
    ],
    sideEffects: [
      'Hipokalemi (Potasyum (K⁺) düşüklüğü), hiponatremi (Sodyum (Na⁺) düşüklüğü — özellikle yaşlılarda) ve metabolik alkaloz',
      'Hiperkalsemi (Kalsiyum (Ca²⁺) geri emiliminin artmasına bağlı)',
      'Hiperglisemi (insülin salınımında azalma), hiperlipidemi ve hiperürisemi (gut riski)',
    ],
  },
  ksparing: {
    id: 'ksparing',
    name: 'Potasyum Tutucu Diüretikler',
    shortName: 'Potasyum Tutucular',
    prototypes: ['Spironolakton', 'Eplerenon', 'Amilorid', 'Triamteren'],
    targetSegments: ['collecting_duct'],
    primarySegment: 'collecting_duct',
    segmentLabel: 'Geç Distal Tübül / Kortikal Toplayıcı Kanal (Esas Hücre)',
    molecularTarget:
      'Epitelyal Sodyum Kanalı (ENaC) ve Mineralokortikoid (Aldosteron) Reseptörü (MR)',
    accentColor: '#7c3aed',
    diuresisScore: 34,
    diuresisLabel: 'Hafif Diürez (Potasyum Koruyucu)',
    feNaPercent: '%2 - %3',
    summary:
      'Amilorid ve Triamteren doğrudan Epitelyal Sodyum Kanalı (ENaC) blokajı yaparken, Spironolakton ve Eplerenon Mineralokortikoid (Aldosteron) Reseptörü (MR) antagonizması ile etki gösterir. Sodyum (Na⁺) atılımını artırırken Potasyum (K⁺) ve Hidrojen (H⁺) kaybını engeller.',
    normalMechanism:
      'Aldosteron hormonu hücre içi Mineralokortikoid (Aldosteron) Reseptörü (MR) ile birleşerek Epitelyal Sodyum Kanalı (ENaC), Renal Dış Medüller Potasyum Kanalı (ROMK) ve Sodyum-Potasyum Adenozin Trifosfataz Pompası (Na⁺/K⁺-ATPaz) sentezini artırır. Epitelyal Sodyum Kanalı (ENaC) ile Sodyum (Na⁺) emilimi lümende negatif potansiyel (-35 mV) oluşturur ve Potasyum (K⁺) Renal Dış Medüller Potasyum Kanalı (ROMK) üzerinden idrara sekrete edilir.',
    blockedMechanism:
      'Amilorid apikal Epitelyal Sodyum Kanalı (ENaC) kanalını doğrudan kapatır; Spironolakton ise Mineralokortikoid (Aldosteron) Reseptörü (MR) bölgesini bloke ederek Epitelyal Sodyum Kanalı (ENaC) ve Sodyum-Potasyum Adenozin Trifosfataz Pompası (Na⁺/K⁺-ATPaz) üretimini azaltır. Sodyum (Na⁺) idrarla atılır; lümen-negatif elektrik yükü kaybolduğu için Potasyum (K⁺) ve Hidrojen (H⁺) sekresyonu durur.',
    electrolytes: [
      { symbol: 'Na⁺', fullName: 'Sodyum', direction: 'up', label: '↑ Hafif Artar' },
      { symbol: 'K⁺', fullName: 'Potasyum', direction: 'down-strong', label: '↓↓ İdrarda Azalır', note: 'Kanda tutulur!' },
      { symbol: 'Cl⁻', fullName: 'Klorür', direction: 'up', label: '↑ Hafif Artar' },
      { symbol: 'Ca²⁺', fullName: 'Kalsiyum', direction: 'neutral', label: '↔ Minimal' },
      { symbol: 'Mg²⁺', fullName: 'Magnezyum', direction: 'down', label: '↓ Hafif Tutulur' },
      { symbol: 'HCO₃⁻', fullName: 'Bikarbonat', direction: 'up', label: '↑ Hafif Artar' },
      { symbol: 'H₂O', fullName: 'Su', direction: 'up', label: '↑ Hafif Artar' },
    ],
    acidBaseEffect: 'Hiperkalemik Metabolik Asidoz (İnterkale Hücrelerde Hidrojen (H⁺) Sekresyonu Azalır)',
    clinicalUses: [
      'Primer hiperaldosteronizm (Conn sendromu) ve siroz asitine bağlı sekonder hiperaldosteronizm',
      'Düşük ejeksiyon fraksiyonlu kalp yetmezliğinde (Spironolakton / Eplerenon mortaliteyi azaltır)',
      'Kıvrım (Lup) ve Tiyazid diüretiklerine bağlı hipokaleminin (Potasyum (K⁺) düşüklüğü) önlenmesi',
      'Amilorid: Lityum tedavisine bağlı nefrojenik diabetes insipidus tedavisi',
    ],
    sideEffects: [
      'Hiperkalemi (Potasyum (K⁺) yükselmesi — Anjiyotensin Dönüştürücü Enzim İnhibitörleri (ACEi) veya Potasyum (K⁺) takviyeleri ile ölümcül aritmi riski!)',
      'Hiperkloremik metabolik asidoz (Hidrojen (H⁺) sekresyonunun azalmasına bağlı)',
      'Spironolakton kullanımında antiandrojenik etkilere bağlı jinekomasti ve adet düzensizliği (Eplerenon daha seçicidir)',
    ],
  },
  vaptan: {
    id: 'vaptan',
    name: 'Antidiüretik Hormon (ADH) Antagonistleri (Vaptanlar)',
    shortName: 'ADH Antagonistleri (Vaptan)',
    prototypes: ['Tolvaptan', 'Konivaptan'],
    targetSegments: ['collecting_duct'],
    primarySegment: 'collecting_duct',
    segmentLabel: 'Medüller Toplayıcı Kanal',
    molecularTarget:
      'Bazolateral Vazopresin Tip 2 Reseptörü (V2) — Akuaporin-2 (AQP2) Yerleşiminin İnhibisyonu',
    accentColor: '#2563eb',
    diuresisScore: 78,
    diuresisLabel: 'Yüksek Serbest Su Diürezi (Akuarez)',
    feNaPercent: 'Elektrolitten Bağımsız (Saf Su)',
    summary:
      'Toplayıcı kanal hücrelerinin bazolateral membranındaki Vazopresin Tip 2 Reseptörü (V2) bölgesini bloke ederek Akuaporin-2 (AQP2) su kanallarının apikal membrana yerleşmesini engeller; Sodyum (Na⁺) veya Potasyum (K⁺) kaybı olmaksızın serbest Su (H₂O) atılımı (akuarez) sağlar.',
    normalMechanism:
      'Kandan gelen Antidiüretik Hormon (ADH), bazolateral Vazopresin Tip 2 Reseptörü (V2) ile birleşir. Bu bağlanma Siklik Adenozin Monofosfat (cAMP) ve Protein Kinaz A (PKA) sinyal yolunu uyararak hücre içi veziküllerdeki Akuaporin-2 (AQP2) kanallarının apikal membrana yerleşmesini sağlar. Böylece Su (H₂O) hızla hücreye girer ve Akuaporin-3 ve Akuaporin-4 (AQP3/4) üzerinden kana geri emilir.',
    blockedMechanism:
      'Tolvaptan ve Konivaptan, bazolateral Vazopresin Tip 2 Reseptörü (V2) bölgesini bloke eder. Siklik Adenozin Monofosfat (cAMP) sinyali kesildiği için Akuaporin-2 (AQP2) kanalları veziküllerde kalır ve apikal membrana yerleşemez. Sodyum (Na⁺) ve Potasyum (K⁺) taşınması etkilenmeden yalnızca serbest Su (H₂O) idrarla atılır.',
    electrolytes: [
      { symbol: 'Na⁺', fullName: 'Sodyum', direction: 'neutral', label: '↔ Etkilenmez', note: 'Serum Sodyum (Na⁺) yükselir' },
      { symbol: 'K⁺', fullName: 'Potasyum', direction: 'neutral', label: '↔ Etkilenmez' },
      { symbol: 'Cl⁻', fullName: 'Klorür', direction: 'neutral', label: '↔ Etkilenmez' },
      { symbol: 'Ca²⁺', fullName: 'Kalsiyum', direction: 'neutral', label: '↔ Etkilenmez' },
      { symbol: 'Mg²⁺', fullName: 'Magnezyum', direction: 'neutral', label: '↔ Etkilenmez' },
      { symbol: 'HCO₃⁻', fullName: 'Bikarbonat', direction: 'neutral', label: '↔ Etkilenmez' },
      { symbol: 'H₂O', fullName: 'Su', direction: 'up-strong', label: '↑↑ Saf Su Artar' },
    ],
    acidBaseEffect: 'Asit-Baz Dengesi Üzerinde Doğrudan Etkisi Yoktur',
    clinicalUses: [
      'Uygunsuz Antidiüretik Hormon Sendromu (SIADH) kaynaklı övolemik hiponatremi (Sodyum (Na⁺) düşüklüğü) tedavisi',
      'Kalp yetmezliğine eşlik eden hipervolemik hiponatremi yönetimi',
      'Otozomal Dominant Polikistik Böbrek Hastalığı (ODPBH / ADPKD) olgularında kist büyümesini yavaşlatma (Tolvaptan)',
    ],
    sideEffects: [
      'Serum Sodyum (Na⁺) düzeyinin aşırı hızlı yükselmesi durumunda Ozmotik Demiyelinizasyon Sendromu riski!',
      'Şiddetli susama hissi, ağız kuruluğu, poliüri ve hipernatremi (Sodyum (Na⁺) yüksekliği)',
      'Uzun süreli Tolvaptan kullanımında hepatotoksisite riski (düzenli karaciğer enzim takibi gerekir)',
    ],
  },
};

// ============================================================================
// İYONLAR, TAŞIYICILAR VE KISALTMALAR REFERANS SÖZLÜĞÜ (Animasyon Altı Tablo)
// ============================================================================

const GLOSSARY_ITEMS: GlossaryItem[] = [
  // İYONLAR VE SU
  {
    id: 'na',
    symbol: 'Na⁺',
    fullName: 'Sodyum İyonu',
    category: 'İyon',
    ionKey: 'Na+',
    generalRole: 'Hücre dışı sıvı hacminin ve ozmotik dengenin ana katyonudur; diüretiklerin temel natriüretik hedefidir.',
    relevantGroups: ['cai', 'osmotic', 'loop', 'thiazide', 'ksparing', 'vaptan'],
    groupSpecificEffect: {
      cai: 'Sodyum-Hidrojen Değiştiricisi Tip 3 (NHE3) yavaşladığı için idrarda Sodyum (Na⁺) atılımı artar.',
      osmotic: 'Su (H₂O) tutulumu ve hızlı lüminal akış nedeniyle Sodyum (Na⁺) geri emilimi azalır.',
      loop: 'Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2) blokajıyla en yüksek düzeyde idrar Sodyum (Na⁺) atılımı oluşur.',
      thiazide: 'Sodyum-Klorür Kotransporteri (NCC) blokajıyla orta şiddette Sodyum (Na⁺) atılımı artar.',
      ksparing: 'Epitelyal Sodyum Kanalı (ENaC) inhibisyonu ile hafif düzeyde Sodyum (Na⁺) atılımı artar.',
      vaptan: 'İdrar Sodyum (Na⁺) atılımı değişmez; serbest Su (H₂O) kaybıyla serum Sodyum (Na⁺) düzeyi yükselir.',
    },
  },
  {
    id: 'k',
    symbol: 'K⁺',
    fullName: 'Potasyum İyonu',
    category: 'İyon',
    ionKey: 'K+',
    generalRole: 'Hücre içi ana katyon olup kalp ritmi ve membran potansiyeli için kritiktir; distal nefronda sekrete edilir.',
    relevantGroups: ['cai', 'osmotic', 'loop', 'thiazide', 'ksparing'],
    groupSpecificEffect: {
      cai: 'Distal tübüle artan Sodyum (Na⁺) ve su akışı nedeniyle Potasyum (K⁺) kaybı (hipokalemi riski) artar.',
      osmotic: 'Yüksek tübüler akış hızı nedeniyle idrarla Potasyum (K⁺) atılımı artar.',
      loop: 'Hem Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2) blokajı hem distal yük artışı belirgin hipokalemi yapar.',
      thiazide: 'Distal Sodyum (Na⁺) yükünün artması toplayıcı kanalda Potasyum (K⁺) kaybını artırır.',
      ksparing: 'Lümen-negatif yük kaybolduğu için Potasyum (K⁺) sekresyonu durur; kanda tutulur (hiperkalemi riski).',
    },
  },
  {
    id: 'cl',
    symbol: 'Cl⁻',
    fullName: 'Klorür İyonu',
    category: 'İyon',
    ionKey: 'Cl-',
    generalRole: 'Hücre dışı ana anyondur; Sodyum (Na⁺) ile birlikte kotransporterler aracılığıyla geri emilir.',
    relevantGroups: ['osmotic', 'loop', 'thiazide', 'ksparing'],
    groupSpecificEffect: {
      osmotic: 'Su (H₂O) ve Sodyum (Na⁺) ile birlikte idrar Klorür (Cl⁻) atılımı artar.',
      loop: 'Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2) blokajı yoğun Klorür (Cl⁻) kaybı (hipokloremik alkaloz) yapar.',
      thiazide: 'Sodyum-Klorür Kotransporteri (NCC) blokajı Klorür (Cl⁻) atılımını artırır.',
      ksparing: 'Sodyum (Na⁺) atılımına eşlik ederek hafif Klorür (Cl⁻) atılımı artışı görülür.',
    },
  },
  {
    id: 'ca',
    symbol: 'Ca²⁺',
    fullName: 'Kalsiyum İyonu',
    category: 'İyon',
    ionKey: 'Ca2+',
    generalRole: 'Kemik mineralizasyonu ve nöromüsküler iletim için gereklidir; Henle ve distal tübülde farklı yönlerde etkilenir.',
    relevantGroups: ['loop', 'thiazide'],
    groupSpecificEffect: {
      loop: 'Lümen-pozitif potansiyel (+8 mV) kaybolduğu için paraselüler Kalsiyum (Ca²⁺) geri emilimi durur (hiperkalsiüri).',
      thiazide: 'Hücre içi Sodyum (Na⁺) düşüşü Sodyum-Kalsiyum Değiştiricisi Tip 1 (NCX1) aktivitesini artırır → Kalsiyum (Ca²⁺) kanda tutulur!',
    },
  },
  {
    id: 'mg',
    symbol: 'Mg²⁺',
    fullName: 'Magnezyum İyonu',
    category: 'İyon',
    ionKey: 'Mg2+',
    generalRole: 'Enzimatik reaksiyonlar ve kardiyak elektrofizyoloji için zorunludur; çoğunlukla Henle çıkan kalın kolundan paraselüler emilir.',
    relevantGroups: ['loop', 'thiazide', 'ksparing'],
    groupSpecificEffect: {
      loop: 'Paraselüler itici güç kaybolduğundan belirgin Magnezyum (Mg²⁺) kaybı (hipomagnezemi) oluşur.',
      thiazide: 'Kronik kullanımda hafif Magnezyum (Mg²⁺) kaybına yol açabilir.',
      ksparing: 'Potasyum (K⁺) ile birlikte Magnezyum (Mg²⁺) tutulmasına da katkı sağlar.',
    },
  },
  {
    id: 'hco3',
    symbol: 'HCO₃⁻',
    fullName: 'Bikarbonat İyonu',
    category: 'İyon',
    ionKey: 'HCO3-',
    generalRole: 'Kanın temel asit-baz tampon sistemidir; filtre edilen Bikarbonat (HCO₃⁻) iyonlarının %85’i proksimal tübülden geri emilir.',
    relevantGroups: ['cai'],
    groupSpecificEffect: {
      cai: 'Karbonik Anhidraz Tip 4 (CA-IV) ve Tip 2 (CA-II) blokajıyla geri emilemez; idrarı alkalileştirir ve metabolik asidoz yapar.',
    },
  },
  {
    id: 'h',
    symbol: 'H⁺',
    fullName: 'Hidrojen İyonu',
    category: 'İyon',
    ionKey: 'H+',
    generalRole: 'İdrar asidifikasyonunu ve Bikarbonat (HCO₃⁻) geri emilimini sağlayan proton iyonudur.',
    relevantGroups: ['cai', 'ksparing'],
    groupSpecificEffect: {
      cai: 'Hücre içi Hidrojen (H⁺) üretimi azaldığı için Sodyum-Hidrojen Değiştiricisi Tip 3 (NHE3) çalışması yavaşlar.',
      ksparing: 'Lümen-negatif yük azaldığından toplayıcı kanalda Hidrojen (H⁺) sekresyonu düşer (asidoz eğilimi).',
    },
  },
  {
    id: 'h2o',
    symbol: 'H₂O',
    fullName: 'Su Molekülü',
    category: 'İyon',
    ionKey: 'H2O',
    generalRole: 'Ozmotik gradyanları izleyerek Akuaporin kanallarından geri emilir; idrar hacminin ana belirleyicisidir.',
    relevantGroups: ['cai', 'osmotic', 'loop', 'thiazide', 'ksparing', 'vaptan'],
    groupSpecificEffect: {
      cai: 'Bikarbonat (HCO₃⁻) ve Sodyum (Na⁺) ile birlikte ozmotik olarak idrarla atılır.',
      osmotic: 'Mannitol tarafından lümende tutulur; Akuaporin-1 (AQP1) üzerinden geri emilemeden hızla atılır.',
      loop: 'Medüller ozmotik gradyan bozulduğundan çok yoğun Su (H₂O) diürezi gerçekleşir.',
      thiazide: 'Sodyum (Na⁺) ve Klorür (Cl⁻) atılımına paralel olarak orta düzeyde Su (H₂O) atılır.',
      ksparing: 'Hafif Sodyum (Na⁺) atılımına eşlik eden hafif Su (H₂O) diürezi görülür.',
      vaptan: 'Akuaporin-2 (AQP2) yerleşemediği için elektrolit kaybı olmadan saf serbest Su (H₂O) atılır (akuarez).',
    },
  },
  // TAŞIYICILAR, KANALLAR, ENZİMLER VE RESEPTÖRLER
  {
    id: 'nhe3',
    symbol: 'NHE3',
    fullName: 'Sodyum-Hidrojen Değiştiricisi Tip 3',
    category: 'Taşıyıcı',
    generalRole: 'Proksimal Kıvrımlı Tübül (PCT) apikal membranında Sodyum (Na⁺) içeri alırken Hidrojen (H⁺) lümene salgılayan antiporterdir.',
    relevantGroups: ['cai'],
    groupSpecificEffect: {
      cai: 'Hücre içi Hidrojen (H⁺) azaldığı için dolaylı olarak inhibe olur; Sodyum (Na⁺) geri emilimi düşer.',
    },
  },
  {
    id: 'ca4_ca2',
    symbol: 'CA-IV / CA-II',
    fullName: 'Karbonik Anhidraz Tip 4 (Apikal) ve Tip 2 (Sitozolik) Enzimi',
    category: 'Enzim',
    generalRole: 'Karbonik asit (H₂CO₃) ⇌ Su (H₂O) + Karbondioksit (CO₂) dönüşümünü katalizleyerek Bikarbonat (HCO₃⁻) geri emilimini mümkün kılar.',
    relevantGroups: ['cai'],
    groupSpecificEffect: {
      cai: 'Asetazolamid tarafından doğrudan inhibe edilen primer moleküler hedeftir.',
    },
  },
  {
    id: 'nbce1',
    symbol: 'NBCe1',
    fullName: 'Elektrojenik Sodyum-Bikarbonat Kotransporteri Tip 1',
    category: 'Taşıyıcı',
    generalRole: 'Proksimal tübül bazolateral membranında Bikarbonat (HCO₃⁻) ve Sodyum (Na⁺) iyonlarını kana aktarır.',
    relevantGroups: ['cai'],
    groupSpecificEffect: {
      cai: 'Hücre içi Bikarbonat (HCO₃⁻) oluşumu durduğu için kana aktarım belirgin biçimde azalır.',
    },
  },
  {
    id: 'aqp1',
    symbol: 'AQP1',
    fullName: 'Akuaporin-1 Su Kanalı',
    category: 'Kanal',
    generalRole: 'Proksimal Kıvrımlı Tübül (PCT) ve Henle İnen İnce Kolu boyunca sürekli açık olan, Antidiüretik Hormon (ADH) bağımsız su kanalıdır.',
    relevantGroups: ['osmotic'],
    groupSpecificEffect: {
      osmotic: 'Mannitol lümen içi ozmotik basıncı yükselttiğinden Akuaporin-1 (AQP1) üzerinden Su (H₂O) geri emilimine karşı koyar.',
    },
  },
  {
    id: 'mannitol',
    symbol: 'Mannitol',
    fullName: 'Mannitol (Ozmotik Ajan)',
    category: 'Hormon / Ajan',
    ionKey: 'Mannitol',
    generalRole: 'Glomerülden serbestçe süzülen ancak tübüllerden geri emilmeyen inert şeker alkolüdür.',
    relevantGroups: ['osmotic'],
    groupSpecificEffect: {
      osmotic: 'Lümende kalarak yüksek ozmotik çekim gücü yaratır ve Su (H₂O) moleküllerini idrara sürükler.',
    },
  },
  {
    id: 'nkcc2',
    symbol: 'NKCC2',
    fullName: 'Sodyum-Potasyum-2 Klorür Kotransporteri',
    category: 'Taşıyıcı',
    generalRole: 'Henle Kulpu Çıkan Kalın Kolu (TAL) apikal membranında 1 Sodyum (Na⁺), 1 Potasyum (K⁺) ve 2 Klorür (Cl⁻) iyonunu birlikte hücreye taşır.',
    relevantGroups: ['loop'],
    groupSpecificEffect: {
      loop: 'Furosemid, Bumetanid ve Torsemid tarafından doğrudan bloke edilen ana hedeftir.',
    },
  },
  {
    id: 'romk',
    symbol: 'ROMK',
    fullName: 'Renal Dış Medüller Potasyum Kanalı',
    category: 'Kanal',
    generalRole: 'Henle çıkan kalın kolunda Potasyum (K⁺) geri dönüşüyle +8 mV lümen-pozitif yük yaratır; toplayıcı kanalda Potasyum (K⁺) sekresyonunu sağlar.',
    relevantGroups: ['loop', 'ksparing'],
    groupSpecificEffect: {
      loop: 'Sodyum-Potasyum-2 Klorür Kotransporteri (NKCC2) durunca geri dönüş azalır ve +8 mV pozitif potansiyel kaybolur.',
      ksparing: 'Lümen-negatif yük kaybolduğu için Renal Dış Medüller Potasyum Kanalı (ROMK) üzerinden Potasyum (K⁺) sekresyonu durur.',
    },
  },
  {
    id: 'clckb',
    symbol: 'ClC-Kb',
    fullName: 'Böbrek Tipi Bazolateral Klorür Kanalı',
    category: 'Kanal',
    generalRole: 'Henle çıkan kalın kolu ve distal tübül hücrelerinden Klorür (Cl⁻) iyonlarının kana geçişini sağlar.',
    relevantGroups: ['loop', 'thiazide'],
  },
  {
    id: 'ncc',
    symbol: 'NCC',
    fullName: 'Sodyum-Klorür Kotransporteri',
    category: 'Taşıyıcı',
    generalRole: 'Erken Distal Kıvrımlı Tübül (DCT) apikal membranında Sodyum (Na⁺) ve Klorür (Cl⁻) iyonlarını elektroneutral olarak hücreye taşır.',
    relevantGroups: ['thiazide'],
    groupSpecificEffect: {
      thiazide: 'Hidroklorotiyazid, Klortalidon ve İndapamid tarafından doğrudan bloke edilen hedeftir.',
    },
  },
  {
    id: 'trpv5',
    symbol: 'TRPV5',
    fullName: 'Geçici Reseptör Potansiyeli Vanilloid 5 Kalsiyum Kanalı',
    category: 'Kanal',
    generalRole: 'Distal tübül apikal membranında Kalsiyum (Ca²⁺) iyonlarının hücre içine girişini sağlayan seçici kalsiyum kanalıdır.',
    relevantGroups: ['thiazide'],
    groupSpecificEffect: {
      thiazide: 'Sodyum-Kalsiyum Değiştiricisi Tip 1 (NCX1) hızlandığı için Geçici Reseptör Potansiyeli Vanilloid 5 Kalsiyum Kanalı (TRPV5) üzerinden Kalsiyum (Ca²⁺) girişi artar.',
    },
  },
  {
    id: 'ncx1',
    symbol: 'NCX1',
    fullName: 'Sodyum-Kalsiyum Değiştiricisi Tip 1',
    category: 'Taşıyıcı',
    generalRole: 'Distal tübül bazolateral membranında 3 Sodyum (Na⁺) iyonunu hücreye alırken 1 Kalsiyum (Ca²⁺) iyonunu kana pompalar.',
    relevantGroups: ['thiazide'],
    groupSpecificEffect: {
      thiazide: 'Hücre içi Sodyum (Na⁺) düştüğünde Sodyum-Kalsiyum Değiştiricisi Tip 1 (NCX1) hızlanarak Kalsiyum (Ca²⁺) geri emilimini artırır.',
    },
  },
  {
    id: 'enac',
    symbol: 'ENaC',
    fullName: 'Epitelyal Sodyum Kanalı',
    category: 'Kanal',
    generalRole: 'Kortikal toplayıcı kanal esas hücrelerinin apikal membranında Sodyum (Na⁺) geri emilimini sağlayan ve lümende negatif potansiyel oluşturan kanaldır.',
    relevantGroups: ['ksparing'],
    groupSpecificEffect: {
      ksparing: 'Amilorid ve Triamteren tarafından doğrudan bloke edilir; Spironolakton ise sentezini azaltır.',
    },
  },
  {
    id: 'mr',
    symbol: 'MR',
    fullName: 'Mineralokortikoid (Aldosteron) Reseptörü',
    category: 'Reseptör',
    generalRole: 'Aldosteron bağlandığında çekirdeğe giderek Epitelyal Sodyum Kanalı (ENaC) ve Sodyum-Potasyum Adenozin Trifosfataz Pompası (Na⁺/K⁺-ATPaz) sentezini artıran hücre içi reseptördür.',
    relevantGroups: ['ksparing'],
    groupSpecificEffect: {
      ksparing: 'Spironolakton ve Eplerenon tarafından yarışmalı olarak antagonize edilir.',
    },
  },
  {
    id: 'v2',
    symbol: 'V2',
    fullName: 'Vazopresin Tip 2 Reseptörü',
    category: 'Reseptör',
    generalRole: 'Toplayıcı kanal bazolateral membranında yer alan ve Antidiüretik Hormon (ADH) bağlanınca Siklik Adenozin Monofosfat (cAMP) üreten G-protein kenetli reseptördür.',
    relevantGroups: ['vaptan'],
    groupSpecificEffect: {
      vaptan: 'Tolvaptan ve Konivaptan tarafından bloke edilerek Akuaporin-2 (AQP2) kanallarının membrana yerleşmesi önlenir.',
    },
  },
  {
    id: 'adh',
    symbol: 'ADH',
    fullName: 'Antidiüretik Hormon (Arjinin Vazopresin)',
    category: 'Hormon / Ajan',
    generalRole: 'Arka hipofizden salınan ve böbrekte serbest Su (H₂O) geri emilimini düzenleyen peptit hormondur.',
    relevantGroups: ['vaptan'],
    groupSpecificEffect: {
      vaptan: 'Vazopresin Tip 2 Reseptörü (V2) bloke edildiği için Antidiüretik Hormon (ADH) etkisini gösteremez.',
    },
  },
  {
    id: 'aqp2',
    symbol: 'AQP2',
    fullName: 'Akuaporin-2 Su Kanalı',
    category: 'Kanal',
    generalRole: 'Toplayıcı kanal hücrelerinde Antidiüretik Hormon (ADH) uyarısıyla veziküllerden apikal membrana yerleşen su kanalıdır.',
    relevantGroups: ['vaptan'],
    groupSpecificEffect: {
      vaptan: 'Siklik Adenozin Monofosfat (cAMP) sinyali kesildiği için apikal membrana yerleşemez ve Su (H₂O) idrarla atılır.',
    },
  },
  {
    id: 'nakatpase',
    symbol: 'Na⁺/K⁺-ATPaz',
    fullName: 'Sodyum-Potasyum Adenozin Trifosfataz Pompası',
    category: 'Taşıyıcı',
    generalRole: 'Tüm tübül epitel hücrelerinin bazolateral membranında 3 Sodyum (Na⁺) kana atıp 2 Potasyum (K⁺) hücreye alarak elektrokimyasal gradyanı korur.',
    relevantGroups: ['cai', 'loop', 'thiazide', 'ksparing'],
    groupSpecificEffect: {
      ksparing: 'Mineralokortikoid (Aldosteron) Reseptörü (MR) blokajı ile sentezi ve aktivitesi azalır.',
    },
  },
];

// ============================================================================
// NEFRON ANATOMİK SPLINE HESAPLAYICI (Catmull-Rom)
// ============================================================================

interface SegmentControlDef {
  id: NephronSegmentId;
  points: Point2D[];
  width: number;
  baseColor: string;
  lumenColor: string;
}

const NEPHRON_SEGMENTS_DEF: SegmentControlDef[] = [
  {
    id: 'pct',
    points: [
      { x: 132, y: 118 },
      { x: 162, y: 92 },
      { x: 190, y: 142 },
      { x: 222, y: 96 },
      { x: 252, y: 148 },
      { x: 274, y: 196 },
      { x: 276, y: 260 },
    ],
    width: 24,
    baseColor: '#f59e0b',
    lumenColor: '#fef3c7',
  },
  {
    id: 'thin_descending',
    points: [
      { x: 276, y: 260 },
      { x: 276, y: 340 },
      { x: 276, y: 422 },
      { x: 282, y: 458 },
      { x: 309, y: 472 },
      { x: 336, y: 458 },
      { x: 342, y: 416 },
    ],
    width: 13,
    baseColor: '#fbbf24',
    lumenColor: '#fef9c3',
  },
  {
    id: 'tal',
    points: [
      { x: 342, y: 416 },
      { x: 342, y: 340 },
      { x: 342, y: 260 },
      { x: 342, y: 175 },
      { x: 348, y: 126 },
      { x: 364, y: 108 },
    ],
    width: 22,
    baseColor: '#f59e0b',
    lumenColor: '#fef3c7',
  },
  {
    id: 'dct',
    points: [
      { x: 364, y: 108 },
      { x: 394, y: 90 },
      { x: 424, y: 138 },
      { x: 458, y: 96 },
      { x: 492, y: 126 },
      { x: 522, y: 134 },
    ],
    width: 21,
    baseColor: '#eab308',
    lumenColor: '#fef9c3',
  },
  {
    id: 'collecting_duct',
    points: [
      { x: 522, y: 134 },
      { x: 522, y: 205 },
      { x: 522, y: 280 },
      { x: 522, y: 365 },
      { x: 522, y: 445 },
      { x: 522, y: 486 },
    ],
    width: 26,
    baseColor: '#d97706',
    lumenColor: '#fde68a',
  },
];

function sampleCatmullRom(pts: Point2D[], samplesPerSpan = 14): Point2D[] {
  const result: Point2D[] = [];
  if (pts.length < 2) return pts;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];

    for (let s = 0; s < samplesPerSpan; s++) {
      const t = s / samplesPerSpan;
      const t2 = t * t;
      const t3 = t2 * t;

      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);
      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

      result.push({ x, y });
    }
  }
  result.push(pts[pts.length - 1]);
  return result;
}

function pointsToSvgPath(pts: Point2D[]): string {
  if (pts.length === 0) return '';
  return pts
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');
}

function buildFullNephronLUT(): {
  segmentPaths: Record<NephronSegmentId, string>;
  fullTrack: SampledPoint[];
} {
  const segmentPaths = {} as Record<NephronSegmentId, string>;
  const fullTrack: SampledPoint[] = [];

  const rawBySeg: { id: NephronSegmentId; pts: Point2D[] }[] = [];
  let totalLen = 0;

  for (const seg of NEPHRON_SEGMENTS_DEF) {
    const sampled = sampleCatmullRom(seg.points, 12);
    segmentPaths[seg.id] = pointsToSvgPath(sampled);
    rawBySeg.push({ id: seg.id, pts: sampled });
    for (let i = 1; i < sampled.length; i++) {
      totalLen += Math.hypot(
        sampled[i].x - sampled[i - 1].x,
        sampled[i].y - sampled[i - 1].y
      );
    }
  }

  let accLen = 0;
  for (const segItem of rawBySeg) {
    const pts = segItem.pts;
    for (let i = 0; i < pts.length; i++) {
      if (i > 0) {
        accLen += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
      }
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const mag = Math.hypot(dx, dy) || 1;
      fullTrack.push({
        x: pts[i].x,
        y: pts[i].y,
        nx: -dy / mag,
        ny: dx / mag,
        t: accLen / totalLen,
        segment: segItem.id,
      });
    }
  }

  return { segmentPaths, fullTrack };
}

const NEPHRON_LUT = buildFullNephronLUT();

function getPointOnNephron(t: number): SampledPoint {
  const clamped = Math.max(0, Math.min(1, t));
  const arr = NEPHRON_LUT.fullTrack;
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid].t < clamped) lo = mid + 1;
    else hi = mid;
  }
  return arr[lo];
}


// ============================================================================
// ORTAK KOMPAKT ANİMASYON ÜST ÇUBUĞU (Grup Seçici < > + Simülasyon Kontrolleri)
// ============================================================================

interface AnimationPanelToolbarProps {
  isDark: boolean;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  selectedDiuretic: DiureticId;
  onPrevDiuretic: () => void;
  onNextDiuretic: () => void;
  isDrugActive: boolean;
  onToggleDrugActive: (active: boolean) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: SpeedMultiplier;
  onChangeSpeed: (s: SpeedMultiplier) => void;
  extraRightSlot?: React.ReactNode;
}

const AnimationPanelToolbar: React.FC<AnimationPanelToolbarProps> = ({
  isDark,
  title,
  subtitle,
  icon,
  selectedDiuretic,
  onPrevDiuretic,
  onNextDiuretic,
  isDrugActive,
  onToggleDrugActive,
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  extraRightSlot,
}) => {
  const drug = DIURETICS[selectedDiuretic];
  const currentIndex = DIURETIC_ORDER.indexOf(selectedDiuretic);

  return (
    <div
      className={`border-b px-3 py-2.5 space-y-2 ${
        isDark
          ? 'border-slate-800 bg-slate-950/60'
          : 'border-slate-200 bg-slate-50/90'
      }`}
    >
      {/* ÜST SATIR: Panel Başlığı + Kompakt Simge Tabanlı Kontroller */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs"
            style={{ backgroundColor: drug.accentColor }}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h2
              className={`text-xs sm:text-sm font-extrabold truncate ${
                isDark ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {title}
            </h2>
            <p
              className={`text-[11px] truncate ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Kompakt Simge Kontrolleri: Normal/Diüretik + Oynat/Duraklat + Hız */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Normal Fizyoloji vs Diüretik Etkisi Kompakt Anahtar */}
          <div
            className={`inline-flex items-center rounded-lg p-0.5 border shadow-2xs ${
              isDark
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
            role="group"
            aria-label="Fizyoloji veya diüretik modu"
          >
            <button
              type="button"
              onClick={() => onToggleDrugActive(false)}
              title="Normal Fizyoloji (İlaçsız)"
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                !isDrugActive
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Normal</span>
            </button>
            <button
              type="button"
              onClick={() => onToggleDrugActive(true)}
              title="Diüretik Etkisi Aktif"
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                isDrugActive
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : isDark
                    ? 'text-slate-300 hover:bg-slate-800'
                    : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Diüretik</span>
            </button>
          </div>

          {/* Oynat / Duraklat Simge Butonu */}
          <button
            type="button"
            onClick={onTogglePlay}
            title={isPlaying ? 'Animasyonu Duraklat' : 'Animasyonu Oynat'}
            aria-label={isPlaying ? 'Duraklat' : 'Oynat'}
            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors cursor-pointer shadow-2xs ${
              isPlaying
                ? isDark
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-amber-950/40'
                  : 'bg-white border-slate-200 text-amber-600 hover:bg-amber-50'
                : 'bg-emerald-600 border-emerald-700 text-white hover:bg-emerald-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Hız Seçici: 0.5x / 1x / 2x */}
          <div
            className={`inline-flex items-center rounded-lg p-0.5 border shadow-2xs ${
              isDark
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
            role="group"
            aria-label="Animasyon hızı"
          >
            {([0.5, 1, 2] as SpeedMultiplier[]).map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => onChangeSpeed(sp)}
                title={`Animasyon Hızı: ${sp}x`}
                className={`px-1.5 py-1 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                  speed === sp
                    ? isDark
                      ? 'bg-slate-100 text-slate-900'
                      : 'bg-slate-800 text-white'
                    : isDark
                      ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
              >
                {sp}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ALT SATIR: Sol (<) / Sağ (>) Oklarla Senkronize Diüretik Grubu Değiştirici */}
      <div
        className={`flex items-center justify-between gap-2 rounded-xl border px-2 py-1.5 shadow-2xs ${
          isDark
            ? 'bg-slate-900/90 border-slate-700/90'
            : 'bg-white border-slate-200/90'
        }`}
      >
        <button
          type="button"
          onClick={onPrevDiuretic}
          title="Önceki Diüretik Grubu (Sol Ok Tuşu)"
          aria-label="Önceki diüretik grubu"
          className={`w-8 h-8 rounded-lg border active:scale-95 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            isDark
              ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 min-w-0 text-center px-1">
          <div className="flex items-center justify-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: drug.accentColor }}
            />
            <span
              className={`text-xs sm:text-sm font-extrabold truncate ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {drug.shortName}
            </span>
            <span
              className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md text-white shrink-0"
              style={{ backgroundColor: drug.accentColor }}
            >
              {currentIndex + 1} / {DIURETIC_ORDER.length}
            </span>
          </div>
          <div
            className={`text-[10.5px] font-semibold truncate mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {drug.prototypes[0]} • {drug.segmentLabel}
          </div>
        </div>

        <button
          type="button"
          onClick={onNextDiuretic}
          title="Sonraki Diüretik Grubu (Sağ Ok Tuşu)"
          aria-label="Sonraki diüretik grubu"
          className={`w-8 h-8 rounded-lg border active:scale-95 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
            isDark
              ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
              : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Opsiyonel Ek Alt Seçici (Örn. Spironolakton / Amilorid) */}
      {extraRightSlot && <div className="flex justify-end">{extraRightSlot}</div>}
    </div>
  );
};

// ============================================================================
// YARDIMCI SVG BİLEŞENLERİ: İYON KÜRESİ & KIRMIZI BLOKAJ ROZETİ
// ============================================================================

const IonBadgeSvg: React.FC<{
  ion: IonType;
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}> = ({ ion, x, y, scale = 1, opacity = 1 }) => {
  const style = ION_STYLES[ion];
  const r = style.radius * scale;
  const isHex = ion === 'Mannitol';

  return (
    <g transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)})`} opacity={opacity}>
      {isHex ? (
        <polygon
          points={`0,${-r} ${(r * 0.87).toFixed(1)},${(-r * 0.5).toFixed(1)} ${(r * 0.87).toFixed(1)},${(r * 0.5).toFixed(1)} 0,${r} ${(-r * 0.87).toFixed(1)},${(r * 0.5).toFixed(1)} ${(-r * 0.87).toFixed(1)},${(-r * 0.5).toFixed(1)}`}
          fill={style.color}
          stroke={style.stroke}
          strokeWidth={1.8}
        />
      ) : (
        <circle r={r} fill={style.color} stroke={style.stroke} strokeWidth={1.5} />
      )}
      <circle cx={-r * 0.28} cy={-r * 0.28} r={r * 0.25} fill="#ffffff" opacity={0.35} />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={style.textColor}
        fontSize={ion === 'HCO3-' ? 7.5 * scale : 8.5 * scale}
        fontWeight="700"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {style.label}
      </text>
    </g>
  );
};

const BlockadeBadgeSvg: React.FC<{
  x: number;
  y: number;
  time: number;
  size?: number;
  label?: string;
}> = ({ x, y, time, size = 14, label }) => {
  const pulse = 1 + 0.14 * Math.sin(time * 6);
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r={size * 1.45 * pulse} fill="#ef4444" opacity={0.22} />
      <circle r={size} fill="#dc2626" stroke="#ffffff" strokeWidth={2.2} />
      <path
        d={`M ${-size * 0.42} ${-size * 0.42} L ${size * 0.42} ${size * 0.42} M ${size * 0.42} ${-size * 0.42} L ${-size * 0.42} ${size * 0.42}`}
        stroke="#ffffff"
        strokeWidth={2.7}
        strokeLinecap="round"
      />
      {label && (
        <g transform={`translate(0, ${-size - 11})`}>
          <rect
            x={-label.length * 3.35 - 7}
            y={-9}
            width={label.length * 6.7 + 14}
            height={17}
            rx={8.5}
            fill="#991b1b"
            stroke="#fecaca"
            strokeWidth={1}
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontSize={8.8}
            fontWeight="700"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};

// ============================================================================
// PANEL 1: MAKRO BÖBREK NEFRONU ANİMASYONU
// ============================================================================

interface MacroNephronPanelProps {
  isDark: boolean;
  selectedDiuretic: DiureticId;
  onPrevDiuretic: () => void;
  onNextDiuretic: () => void;
  isDrugActive: boolean;
  onToggleDrugActive: (active: boolean) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: SpeedMultiplier;
  onChangeSpeed: (s: SpeedMultiplier) => void;
  time: number;
  onSelectSegment: (segment: NephronSegmentId) => void;
}

const MacroNephronPanel: React.FC<MacroNephronPanelProps> = ({
  isDark,
  selectedDiuretic,
  onPrevDiuretic,
  onNextDiuretic,
  isDrugActive,
  onToggleDrugActive,
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  time,
  onSelectSegment,
}) => {
  const drug = DIURETICS[selectedDiuretic];
  const darkSafeAccent = DARK_ACCENT_COLORS[selectedDiuretic];
  const [hoveredSeg, setHoveredSeg] = useState<NephronSegmentId | null>(null);

  const isSegTargeted = (seg: NephronSegmentId) => drug.targetSegments.includes(seg);

  const effectiveDiuresis = isDrugActive ? drug.diuresisScore : 22;
  const flowBoost = isDrugActive ? 1 + (drug.diuresisScore - 22) / 90 : 1;

  const lumenParticles = useMemo(() => {
    const baseIons: IonType[] = [
      'Na+', 'H2O', 'Cl-', 'HCO3-', 'Na+', 'H2O', 'K+', 'Ca2+',
      'Na+', 'H2O', 'Cl-', 'H2O', 'Na+', 'HCO3-', 'Cl-', 'H2O',
      'K+', 'Ca2+', 'Na+', 'H2O', 'Cl-', 'H2O', 'Na+', 'H2O',
    ];
    return baseIons.map((ion, idx) => ({
      id: idx,
      ion,
      offset: idx / baseIons.length,
      jitter: ((idx % 3) - 1) * 3.8,
    }));
  }, []);

  const transportSites: {
    seg: NephronSegmentId;
    t: number;
    side: 1 | -1;
    ions: IonType[];
    isSecretion?: boolean;
    enhancedWhen?: DiureticId;
  }[] = [
    { seg: 'pct', t: 0.12, side: 1, ions: ['Na+', 'HCO3-'] },
    { seg: 'pct', t: 0.21, side: -1, ions: ['H2O', 'Na+'] },
    { seg: 'thin_descending', t: 0.36, side: -1, ions: ['H2O'] },
    { seg: 'tal', t: 0.56, side: 1, ions: ['Na+', 'Cl-'] },
    { seg: 'tal', t: 0.62, side: -1, ions: ['Ca2+', 'K+'] },
    { seg: 'dct', t: 0.72, side: -1, ions: ['Na+', 'Cl-'] },
    { seg: 'dct', t: 0.78, side: 1, ions: ['Ca2+'], enhancedWhen: 'thiazide' },
    { seg: 'collecting_duct', t: 0.87, side: -1, ions: ['Na+'] },
    { seg: 'collecting_duct', t: 0.89, side: 1, ions: ['K+'], isSecretion: true },
    { seg: 'collecting_duct', t: 0.94, side: -1, ions: ['H2O'] },
  ];

  const blockadeCoords: Record<DiureticId, { x: number; y: number; label: string }[]> = {
    cai: [{ x: 205, y: 122, label: 'CA-IV / CA-II İnhibe' }],
    osmotic: [
      { x: 235, y: 136, label: 'Ozmotik Etki' },
      { x: 276, y: 345, label: 'H₂O Tutulur' },
    ],
    loop: [{ x: 342, y: 292, label: 'NKCC2 İnhibe' }],
    thiazide: [{ x: 428, y: 118, label: 'NCC İnhibe' }],
    ksparing: [{ x: 522, y: 215, label: 'ENaC / MR İnhibe' }],
    vaptan: [{ x: 522, y: 365, label: 'V2 / AQP2 İnhibe' }],
  };

  const shouldParticleReachEnd = (ion: IonType, idx: number): boolean => {
    if (!isDrugActive) return idx % 5 === 0;
    if (selectedDiuretic === 'loop') return idx % 5 !== 4;
    if (selectedDiuretic === 'osmotic') return ion === 'H2O' || idx % 3 === 0;
    if (selectedDiuretic === 'vaptan') return ion === 'H2O' || idx % 5 === 0;
    if (selectedDiuretic === 'thiazide') {
      if (ion === 'Ca2+') return false;
      return ion === 'Na+' || ion === 'Cl-' || ion === 'H2O' || idx % 3 === 0;
    }
    if (selectedDiuretic === 'cai') {
      return ion === 'HCO3-' || ion === 'Na+' || ion === 'H2O' || idx % 4 === 0;
    }
    if (selectedDiuretic === 'ksparing') {
      if (ion === 'K+') return false;
      return ion === 'Na+' || idx % 4 === 0;
    }
    return idx % 3 === 0;
  };

  const segmentLabels: {
    seg: NephronSegmentId;
    x: number;
    y: number;
    title: string;
    subtitle: string;
  }[] = [
    { seg: 'pct', x: 210, y: 54, title: 'Proksimal Tübül (PCT)', subtitle: 'KAI • Ozmotik' },
    { seg: 'thin_descending', x: 168, y: 355, title: 'Henle İnen İnce Kol', subtitle: 'Ozmotik (AQP1)' },
    { seg: 'tal', x: 425, y: 315, title: 'Henle Çıkan Kalın Kol', subtitle: 'Kıvrım (Lup) • NKCC2' },
    { seg: 'dct', x: 432, y: 54, title: 'Distal Tübül (DCT)', subtitle: 'Tiyazid • NCC' },
    { seg: 'collecting_duct', x: 594, y: 245, title: 'Toplayıcı Kanal', subtitle: 'K⁺ Tutucu • ADH Ant.' },
  ];

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden flex flex-col ${
        isDark
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* ÜST KONTROL VE GRUP SEÇİM ÇUBUĞU */}
      <AnimationPanelToolbar
        isDark={isDark}
        title="Makro Böbrek Nefronu Animasyonu"
        subtitle="Segmentlere tıklayarak veya ok tuşlarıyla diüretik seçebilirsiniz"
        icon={<Activity className="w-4 h-4" />}
        selectedDiuretic={selectedDiuretic}
        onPrevDiuretic={onPrevDiuretic}
        onNextDiuretic={onNextDiuretic}
        isDrugActive={isDrugActive}
        onToggleDrugActive={onToggleDrugActive}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        speed={speed}
        onChangeSpeed={onChangeSpeed}
      />

      {/* SVG ALANI */}
      <div
        className={`relative p-2 sm:p-3 flex-1 flex flex-col justify-between ${
          isDark
            ? 'bg-slate-950/50'
            : 'bg-gradient-to-b from-slate-50/40 to-white'
        }`}
      >
        <svg
          viewBox="0 0 675 535"
          className="w-full h-auto max-h-[520px] select-none"
          role="img"
          aria-label="Böbrek nefronu animasyonlu anatomik çizimi"
        >
          <defs>
            <linearGradient id="nephron-cortexGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#78350f' : '#fffbeb'} stopOpacity={isDark ? '0.26' : '0.55'} />
              <stop offset="100%" stopColor={isDark ? '#451a03' : '#fef3c7'} stopOpacity={isDark ? '0.16' : '0.28'} />
            </linearGradient>
            <linearGradient id="nephron-medullaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isDark ? '#4c0519' : '#ffe4e6'} stopOpacity={isDark ? '0.24' : '0.32'} />
              <stop offset="100%" stopColor={isDark ? '#881337' : '#fecdd3'} stopOpacity={isDark ? '0.36' : '0.5'} />
            </linearGradient>
            <linearGradient id="nephron-vesselGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <linearGradient id="nephron-urineStreamGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
            </linearGradient>
            <filter id="nephron-segmentGlow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Koyu Mod Taban Tuvali */}
          {isDark && <rect x="4" y="4" width="667" height="527" rx="16" fill="#0f172a" />}

          {/* Korteks ve Medulla Bölgeleri */}
          <rect x="8" y="8" width="659" height="252" rx="14" fill="url(#nephron-cortexGrad)" />
          <rect x="8" y="260" width="659" height="265" rx="14" fill="url(#nephron-medullaGrad)" />
          <line
            x1="14"
            y1="260"
            x2="660"
            y2="260"
            stroke={isDark ? '#334155' : '#cbd5e1'}
            strokeWidth="1.5"
            strokeDasharray="6 5"
          />
          <text
            x="22"
            y="248"
            fontSize="10.5"
            fontWeight="700"
            fill={isDark ? '#fcd34d' : '#92400e'}
            opacity={isDark ? 0.85 : 0.68}
          >
            KORTEKS (Kabuk Bölgesi)
          </text>
          <text
            x="22"
            y="276"
            fontSize="10.5"
            fontWeight="700"
            fill={isDark ? '#fda4af' : '#9f1239'}
            opacity={isDark ? 0.85 : 0.68}
          >
            MEDULLA (Öz Bölge — Artan Ozmotik Gradyan)
          </text>

          {/* Peritübüler Kılcal Damar Arka Planı */}
          <path
            d="M 48 168 C 90 210, 175 188, 240 212 C 256 270, 248 415, 309 494 C 370 465, 378 280, 385 185 C 430 165, 478 190, 492 310"
            fill="none"
            stroke={isDark ? '#fb7185' : '#fca5a5'}
            strokeWidth="6"
            strokeLinecap="round"
            opacity={isDark ? '0.22' : '0.28'}
          />

          {/* GLOMERULUS VE BOWMAN KAPSÜLÜ */}
          <g className="cursor-pointer" onClick={() => onSelectSegment('pct')}>
            <path
              d="M 32 48 C 36 82, 54 96, 76 102"
              fill="none"
              stroke="url(#nephron-vesselGrad)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M 76 134 C 54 140, 38 156, 30 190"
              fill="none"
              stroke="url(#nephron-vesselGrad)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <text x="16" y="64" fontSize="8.5" fontWeight="700" fill={isDark ? '#fca5a5' : '#991b1b'}>
              Afferent
            </text>
            <text x="14" y="203" fontSize="8.5" fontWeight="700" fill={isDark ? '#fca5a5' : '#991b1b'}>
              Efferent
            </text>

            {/* Bowman Kapsülü */}
            <path
              d="M 66 76 C 102 64, 134 86, 136 118 C 134 150, 102 172, 66 160 C 52 154, 48 144, 54 138 C 66 144, 98 152, 114 136 C 122 126, 122 110, 114 100 C 98 84, 66 92, 54 98 C 48 92, 52 82, 66 76 Z"
              fill={isDark ? '#d97706' : '#fbbf24'}
              stroke={isDark ? '#fbbf24' : '#b45309'}
              strokeWidth="2.5"
            />

            {/* Glomerulus Kılcal Yumağı */}
            <g fill="none" stroke={isDark ? '#f87171' : '#dc2626'} strokeWidth="5.5" strokeLinecap="round">
              <path d="M 70 100 C 96 86, 114 104, 96 116 C 78 128, 66 104, 86 98" />
              <path d="M 86 98 C 110 102, 112 132, 90 134 C 68 136, 68 112, 92 116" />
              <path d="M 74 128 C 92 146, 114 128, 104 108" />
            </g>

            {/* Filtrasyon Oku */}
            <path
              d="M 116 118 L 130 118"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="3 3"
            />

            <rect
              x="16"
              y="14"
              width="126"
              height="24"
              rx="7"
              fill={isDark ? '#1e293b' : '#ffffff'}
              stroke={isDark ? '#f87171' : '#fecaca'}
              strokeWidth="1.2"
            />
            <text
              x="79"
              y="29"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fill={isDark ? '#fecaca' : '#991b1b'}
            >
              Glomerulus & Bowman
            </text>
          </g>

          {/* TOPLAYICI KANAL YAN DALLARI */}
          <g stroke={isDark ? '#d97706' : '#b45309'} strokeWidth="2.2" fill={isDark ? '#292524' : '#fde68a'}>
            <path d="M 522 134 L 522 72" stroke={isDark ? '#d97706' : '#b45309'} strokeWidth="22" strokeLinecap="round" />
            <path d="M 522 134 L 522 72" stroke={isDark ? '#292524' : '#fde68a'} strokeWidth="16" strokeLinecap="round" />
            <path d="M 524 106 L 558 88" stroke={isDark ? '#d97706' : '#b45309'} strokeWidth="14" strokeLinecap="round" />
            <path d="M 524 106 L 558 88" stroke={isDark ? '#292524' : '#fde68a'} strokeWidth="9.5" strokeLinecap="round" />
            <path d="M 524 196 L 556 180" stroke={isDark ? '#d97706' : '#b45309'} strokeWidth="14" strokeLinecap="round" />
            <path d="M 524 196 L 556 180" stroke={isDark ? '#292524' : '#fde68a'} strokeWidth="9.5" strokeLinecap="round" />
          </g>

          {/* NEFRON SEGMENTLERİ */}
          {NEPHRON_SEGMENTS_DEF.map((seg) => {
            const d = NEPHRON_LUT.segmentPaths[seg.id];
            const targeted = isSegTargeted(seg.id);
            const isHovered = hoveredSeg === seg.id;
            const highlightColor =
              targeted && isDrugActive
                ? isDark
                  ? darkSafeAccent
                  : drug.accentColor
                : isDark
                  ? '#d97706'
                  : '#b45309';

            return (
              <g
                key={seg.id}
                className="cursor-pointer transition-opacity"
                onClick={() => onSelectSegment(seg.id)}
                onMouseEnter={() => setHoveredSeg(seg.id)}
                onMouseLeave={() => setHoveredSeg(null)}
              >
                {(targeted || isHovered) && (
                  <path
                    d={d}
                    fill="none"
                    stroke={targeted ? (isDark ? darkSafeAccent : drug.accentColor) : '#94a3b8'}
                    strokeWidth={seg.width + (targeted && isDrugActive ? 14 : 9)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={targeted && isDrugActive ? 0.34 + 0.14 * Math.sin(time * 4) : 0.22}
                    filter="url(#nephron-segmentGlow)"
                  />
                )}
                <path
                  d={d}
                  fill="none"
                  stroke={highlightColor}
                  strokeWidth={seg.width + 4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={d}
                  fill="none"
                  stroke={
                    isDark
                      ? targeted && isDrugActive
                        ? '#1e293b'
                        : '#292524'
                      : targeted && isDrugActive
                        ? '#ffffff'
                        : seg.lumenColor
                  }
                  strokeWidth={seg.width - 3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={d}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={Math.max(4, seg.width * 0.34)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="10 14"
                  strokeDashoffset={-time * 42 * flowBoost}
                  opacity={seg.id === 'collecting_duct' && isDrugActive ? 0.78 : 0.48}
                />
              </g>
            );
          })}

          {/* İDRAR ÇIKIŞ AKIŞI */}
          <g transform="translate(522, 486)">
            <path
              d={`M ${-5 - effectiveDiuresis * 0.08} 0 L ${5 + effectiveDiuresis * 0.08} 0 L ${8 + effectiveDiuresis * 0.13} 42 L ${-8 - effectiveDiuresis * 0.13} 42 Z`}
              fill="url(#nephron-urineStreamGrad)"
            />
            {[0, 1, 2, 3].map((dropIdx) => {
              const dt = (time * (1.2 * flowBoost) + dropIdx * 0.25) % 1;
              return (
                <circle
                  key={dropIdx}
                  cx={Math.sin(dropIdx * 2.1) * (3 + effectiveDiuresis * 0.04)}
                  cy={6 + dt * 34}
                  r={isDrugActive ? 3.5 : 2.3}
                  fill={isDark ? '#38bdf8' : '#0284c7'}
                  opacity={1 - dt * 0.65}
                />
              );
            })}
            <text
              x="0"
              y="39"
              textAnchor="middle"
              fontSize="10"
              fontWeight="800"
              fill={isDark ? '#7dd3fc' : '#0369a1'}
            >
              İDRAR AKIŞI ↓
            </text>
          </g>

          {/* LÜMEN İÇİ AKAN İYON PARTİKÜLLERİ */}
          {lumenParticles.map((p) => {
            const rawT = (time * 0.11 * flowBoost + p.offset) % 1;
            const reachesEnd = shouldParticleReachEnd(p.ion, p.id);
            if (!reachesEnd && rawT > 0.68) return null;

            const pt = getPointOnNephron(rawT);
            const px = pt.x + pt.nx * p.jitter;
            const py = pt.y + pt.ny * p.jitter;
            const fade = !reachesEnd && rawT > 0.55 ? (0.68 - rawT) / 0.13 : 1;

            return (
              <IonBadgeSvg
                key={p.id}
                ion={p.ion}
                x={px}
                y={py}
                scale={0.62}
                opacity={fade * 0.92}
              />
            );
          })}

          {/* MANNİTOL AKTİFSE LÜMENDE ÖZEL MANNİTOL MOLEKÜLLERİ */}
          {isDrugActive && selectedDiuretic === 'osmotic' && (
            <>
              {[0.08, 0.2, 0.34, 0.48, 0.65, 0.84].map((off, idx) => {
                const mt = (time * 0.14 + off) % 1;
                const pt = getPointOnNephron(mt);
                return <IonBadgeSvg key={`man-${idx}`} ion="Mannitol" x={pt.x} y={pt.y} scale={0.74} />;
              })}
            </>
          )}

          {/* SEGMENTLERDE GERİ EMİLİM / SEKRESYON VE BLOKAJ ANİMASYONLARI */}
          {transportSites.map((site, sIdx) => {
            const pt = getPointOnNephron(site.t);
            const dir = site.side;
            const isBlockedByDrug =
              isDrugActive &&
              ((selectedDiuretic === 'cai' && site.seg === 'pct') ||
                (selectedDiuretic === 'osmotic' &&
                  (site.seg === 'pct' || site.seg === 'thin_descending') &&
                  site.ions.includes('H2O')) ||
                (selectedDiuretic === 'loop' && site.seg === 'tal') ||
                (selectedDiuretic === 'thiazide' && site.seg === 'dct' && !site.enhancedWhen) ||
                (selectedDiuretic === 'ksparing' && site.seg === 'collecting_duct' && site.t < 0.91) ||
                (selectedDiuretic === 'vaptan' &&
                  site.seg === 'collecting_duct' &&
                  site.ions.includes('H2O')));

            const isEnhanced = isDrugActive && site.enhancedWhen === selectedDiuretic;

            const startX = pt.x + pt.nx * dir * 13;
            const startY = pt.y + pt.ny * dir * 13;
            const endX = pt.x + pt.nx * dir * 44;
            const endY = pt.y + pt.ny * dir * 44;

            const phase = (time * (isEnhanced ? 1.35 : 0.85) + sIdx * 0.27) % 1;

            let ionX: number;
            let ionY: number;
            if (isBlockedByDrug) {
              const bounce = phase < 0.45 ? phase / 0.45 : (1 - phase) / 0.55;
              ionX = pt.x + pt.nx * dir * (4 + bounce * 12);
              ionY = pt.y + pt.ny * dir * (4 + bounce * 12);
            } else if (site.isSecretion) {
              ionX = endX + (startX - endX) * phase;
              ionY = endY + (startY - endY) * phase;
            } else {
              ionX = startX + (endX - startX) * phase;
              ionY = startY + (endY - startY) * phase;
            }

            return (
              <g key={`site-${sIdx}`}>
                <line
                  x1={site.isSecretion ? endX : startX}
                  y1={site.isSecretion ? endY : startY}
                  x2={site.isSecretion ? startX : endX}
                  y2={site.isSecretion ? startY : endY}
                  stroke={
                    isBlockedByDrug
                      ? '#ef4444'
                      : isEnhanced
                        ? '#16a34a'
                        : site.isSecretion
                          ? isDark
                            ? '#a78bfa'
                            : '#7c3aed'
                          : isDark
                            ? '#94a3b8'
                            : '#64748b'
                  }
                  strokeWidth={isEnhanced ? 3 : 1.8}
                  strokeDasharray={isBlockedByDrug ? '3 3' : site.isSecretion ? '4 2' : 'none'}
                  opacity={isBlockedByDrug ? 0.55 : 0.78}
                />
                <IonBadgeSvg
                  ion={site.ions[0]}
                  x={ionX}
                  y={ionY}
                  scale={isEnhanced ? 0.78 : 0.65}
                  opacity={isBlockedByDrug ? 0.85 : 1 - phase * 0.2}
                />
                {isEnhanced && (
                  <g transform={`translate(${endX + 4}, ${endY + 14})`}>
                    <rect x="-34" y="-8" width="68" height="16" rx="8" fill="#15803d" />
                    <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="8.5" fontWeight="700">
                      ↑ Ca²⁺ Kana
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* KIRMIZI BLOKAJ İŞARETLERİ */}
          {isDrugActive &&
            blockadeCoords[selectedDiuretic].map((b, idx) => (
              <BlockadeBadgeSvg key={`blk-${idx}`} x={b.x} y={b.y} time={time} size={13} label={b.label} />
            ))}

          {/* TIKLANABİLİR SEGMENT ETİKETLERİ */}
          {segmentLabels.map((lbl) => {
            const active = isSegTargeted(lbl.seg);
            return (
              <g
                key={lbl.seg}
                transform={`translate(${lbl.x}, ${lbl.y})`}
                className="cursor-pointer"
                onClick={() => onSelectSegment(lbl.seg)}
              >
                <rect
                  x="-72"
                  y="-19"
                  width="144"
                  height="34"
                  rx="9"
                  fill={
                    isDark
                      ? active
                        ? '#0f172a'
                        : 'rgba(15, 23, 42, 0.92)'
                      : active
                        ? '#ffffff'
                        : 'rgba(255,255,255,0.92)'
                  }
                  stroke={
                    active
                      ? isDark
                        ? darkSafeAccent
                        : drug.accentColor
                      : isDark
                        ? '#475569'
                        : '#cbd5e1'
                  }
                  strokeWidth={active ? 2.2 : 1.2}
                />
                <text
                  y="-5"
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill={
                    active
                      ? isDark
                        ? darkSafeAccent
                        : drug.accentColor
                      : isDark
                        ? '#f1f5f9'
                        : '#1e293b'
                  }
                >
                  {lbl.title}
                </text>
                <text
                  y="8"
                  textAnchor="middle"
                  fontSize="8.5"
                  fontWeight="600"
                  fill={isDark ? '#94a3b8' : '#64748b'}
                >
                  {lbl.subtitle}
                </text>
              </g>
            );
          })}
        </svg>

        {/* ALT ŞERİT: CANLI DİÜREZ ŞİDDETİ GÖSTERGESİ */}
        <div
          className={`mt-2 rounded-xl border p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            isDark
              ? 'border-slate-800 bg-slate-900/90'
              : 'border-slate-200 bg-slate-50/90'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                isDrugActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : isDark
                    ? 'bg-sky-950/70 text-sky-400'
                    : 'bg-sky-100 text-sky-700'
              }`}
            >
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wide ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  Diürez Şiddeti / İdrar Akışı
                </span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-300'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  Fraksiyonel Sodyum Atılımı (FENa): {isDrugActive ? drug.feNaPercent : '< %1 (Normal)'}
                </span>
              </div>
              <p
                className={`text-xs font-semibold mt-0.5 ${
                  isDark ? 'text-sky-400' : 'text-sky-700'
                }`}
              >
                {isDrugActive ? drug.diuresisLabel : 'Normal Fizyolojik İdrar Akışı (~1.2 - 1.5 L/gün)'}
              </p>
            </div>
          </div>

          <div className="w-full sm:w-44">
            <div
              className={`flex justify-between text-[10px] font-bold mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              <span>Normal</span>
              <span>%{effectiveDiuresis}</span>
              <span>Maksimum</span>
            </div>
            <div
              className={`w-full h-2.5 rounded-full overflow-hidden ${
                isDark ? 'bg-slate-800' : 'bg-slate-200'
              }`}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${effectiveDiuresis}%`,
                  background: isDrugActive
                    ? `linear-gradient(90deg, #0ea5e9, ${drug.accentColor})`
                    : '#38bdf8',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// PANEL 2: HÜCRESEL ETKİ MEKANİZMASI ANİMASYONU
// ============================================================================

interface CellularMechanismPanelProps {
  isDark: boolean;
  selectedDiuretic: DiureticId;
  onPrevDiuretic: () => void;
  onNextDiuretic: () => void;
  isDrugActive: boolean;
  onToggleDrugActive: (active: boolean) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: SpeedMultiplier;
  onChangeSpeed: (s: SpeedMultiplier) => void;
  time: number;
}

const CellularMechanismPanel: React.FC<CellularMechanismPanelProps> = ({
  isDark,
  selectedDiuretic,
  onPrevDiuretic,
  onNextDiuretic,
  isDrugActive,
  onToggleDrugActive,
  isPlaying,
  onTogglePlay,
  speed,
  onChangeSpeed,
  time,
}) => {
  const drug = DIURETICS[selectedDiuretic];
  const [kSparingMode, setKSparingMode] = useState<'both' | 'spironolactone' | 'amiloride'>('both');

  const lerpPt = (x1: number, y1: number, x2: number, y2: number, p: number) => ({
    x: x1 + (x2 - x1) * p,
    y: y1 + (y2 - y1) * p,
  });

  // Engellenmiş iyonun kanala çarpıp idrar yönüne (aşağıya) sekmesi
  const renderBlockedDeflectIon = (
    ion: IonType,
    targetX: number,
    targetY: number,
    phaseOffset: number,
    key: string
  ) => {
    const p = (time * 0.65 + phaseOffset) % 1;
    let x: number;
    let y: number;
    if (p < 0.38) {
      const k = p / 0.38;
      x = 62 + (targetX - 82) * k;
      y = targetY - 18 + 18 * k;
    } else {
      const k = (p - 0.38) / 0.62;
      x = targetX - 20 - Math.sin(k * Math.PI * 0.5) * 42;
      y = targetY + k * (435 - targetY);
    }
    return <IonBadgeSvg key={key} ion={ion} x={x} y={y} scale={0.92} opacity={p > 0.9 ? (1 - p) * 10 : 1} />;
  };

  // İki nokta arasında akıcı ilerleyen iyon küresi
  const renderFlowIon = (
    ion: IonType,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    phaseOffset: number,
    speedFactor = 0.65,
    key = ''
  ) => {
    const p = (time * speedFactor + phaseOffset) % 1;
    const pos = lerpPt(x1, y1, x2, y2, p);
    const edgeOpacity = p < 0.1 ? p * 10 : p > 0.9 ? (1 - p) * 10 : 1;
    return <IonBadgeSvg key={key} ion={ion} x={pos.x} y={pos.y} scale={0.92} opacity={edgeOpacity} />;
  };

  // Bazolateral Sodyum-Potasyum-ATPaz Pompası
  const renderBasolateralATPase = (yCenter: number, dimmed = false) => {
    const sp = dimmed ? 0.25 : 0.6;
    return (
      <g opacity={dimmed ? 0.5 : 1}>
        <rect
          x="375"
          y={yCenter - 26}
          width="40"
          height="52"
          rx="14"
          fill="#475569"
          stroke={isDark ? '#94a3b8' : '#1e293b'}
          strokeWidth="2"
        />
        <text x="395" y={yCenter - 6} textAnchor="middle" fill="#f8fafc" fontSize="8" fontWeight="800">
          Na⁺/K⁺
        </text>
        <text x="395" y={yCenter + 5} textAnchor="middle" fill="#fde047" fontSize="8" fontWeight="800">
          ATPaz
        </text>
        <line
          x1="340"
          y1={yCenter - 12}
          x2="455"
          y2={yCenter - 12}
          stroke="#f59e0b"
          strokeWidth="2.2"
          markerEnd="url(#cell-arrowAmber)"
        />
        {renderFlowIon('Na+', 342, yCenter - 12, 452, yCenter - 12, 0.1, sp, `atp-na-${yCenter}`)}
        <line
          x1="455"
          y1={yCenter + 13}
          x2="340"
          y2={yCenter + 13}
          stroke="#8b5cf6"
          strokeWidth="2.2"
          markerEnd="url(#cell-arrowPurple)"
        />
        {renderFlowIon('K+', 452, yCenter + 13, 342, yCenter + 13, 0.6, sp, `atp-k-${yCenter}`)}
      </g>
    );
  };

  const renderCellSpecificDiagram = () => {
    switch (selectedDiuretic) {
      case 'cai': {
        return (
          <g>
            {/* Fırçamsı Kenar */}
            <path
              d="M 145 100 Q 134 106 145 112 Q 134 118 145 124 Q 134 130 145 136 M 145 255 Q 134 261 145 267 Q 134 273 145 279 Q 134 285 145 291"
              fill="none"
              stroke={isDark ? '#818cf8' : '#6366f1'}
              strokeWidth="2.5"
            />
            {/* NHE3 */}
            <rect
              x="126"
              y="150"
              width="38"
              height="56"
              rx="13"
              fill={isDrugActive ? '#64748b' : '#0284c7'}
              stroke={isDark ? '#cbd5e1' : '#0f172a'}
              strokeWidth="2"
            />
            <text x="145" y="176" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="800">
              NHE3
            </text>
            <text x="145" y="188" textAnchor="middle" fill="#e0f2fe" fontSize="7.5" fontWeight="700">
              Na⁺/H⁺
            </text>

            {/* CA-IV */}
            <circle
              cx="115"
              cy="252"
              r="20"
              fill={
                isDark
                  ? isDrugActive
                    ? '#450a0a'
                    : '#083344'
                  : isDrugActive
                    ? '#fee2e2'
                    : '#cffafe'
              }
              stroke={isDrugActive ? (isDark ? '#f87171' : '#dc2626') : isDark ? '#22d3ee' : '#0891b2'}
              strokeWidth="2.2"
            />
            <text
              x="115"
              y="249"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="800"
              fill={
                isDark
                  ? isDrugActive
                    ? '#fecaca'
                    : '#a5f3fc'
                  : isDrugActive
                    ? '#991b1b'
                    : '#155e75'
              }
            >
              CA-IV
            </text>
            <text x="115" y="261" textAnchor="middle" fontSize="7" fontWeight="700" fill={isDark ? '#cbd5e1' : '#475569'}>
              (Lümen)
            </text>

            {/* CA-II */}
            <circle
              cx="265"
              cy="252"
              r="22"
              fill={
                isDark
                  ? isDrugActive
                    ? '#450a0a'
                    : '#083344'
                  : isDrugActive
                    ? '#fee2e2'
                    : '#cffafe'
              }
              stroke={isDrugActive ? (isDark ? '#f87171' : '#dc2626') : isDark ? '#22d3ee' : '#0891b2'}
              strokeWidth="2.2"
            />
            <text
              x="265"
              y="249"
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="800"
              fill={
                isDark
                  ? isDrugActive
                    ? '#fecaca'
                    : '#a5f3fc'
                  : isDrugActive
                    ? '#991b1b'
                    : '#155e75'
              }
            >
              CA-II
            </text>
            <text x="265" y="261" textAnchor="middle" fontSize="7" fontWeight="700" fill={isDark ? '#cbd5e1' : '#475569'}>
              (Hücre İçi)
            </text>

            {/* Kimyasal Reaksiyon Kutuları */}
            <rect
              x="18"
              y="286"
              width="118"
              height="32"
              rx="7"
              fill={isDark ? '#0f172a' : '#ffffff'}
              stroke={isDark ? '#0e7490' : '#a5f3fc'}
              strokeWidth="1.2"
            />
            <text x="77" y="299" textAnchor="middle" fontSize="8.3" fontWeight="700" fill={isDark ? '#67e8f9' : '#0e7490'}>
              H⁺ + HCO₃⁻ ⇌ H₂CO₃
            </text>
            <text x="77" y="311" textAnchor="middle" fontSize="7.8" fontWeight="700" fill={isDark ? '#7dd3fc' : '#0369a1'}>
              → CO₂ + H₂O (difüzyon)
            </text>

            <rect
              x="204"
              y="286"
              width="124"
              height="32"
              rx="7"
              fill={isDark ? '#0f172a' : '#ffffff'}
              stroke={isDark ? '#0e7490' : '#a5f3fc'}
              strokeWidth="1.2"
            />
            <text x="266" y="299" textAnchor="middle" fontSize="8.3" fontWeight="700" fill={isDark ? '#67e8f9' : '#0e7490'}>
              CO₂ + H₂O → H₂CO₃
            </text>
            <text x="266" y="311" textAnchor="middle" fontSize="7.8" fontWeight="700" fill={isDark ? '#7dd3fc' : '#0369a1'}>
              → H⁺ + HCO₃⁻
            </text>

            {renderBasolateralATPase(176, isDrugActive)}
            <rect
              x="375"
              y="286"
              width="40"
              height="48"
              rx="13"
              fill={isDrugActive ? '#64748b' : '#0891b2'}
              stroke={isDark ? '#cbd5e1' : '#0f172a'}
              strokeWidth="2"
            />
            <text x="395" y="307" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800">
              NBCe1
            </text>
            <text x="395" y="319" textAnchor="middle" fill="#cffafe" fontSize="7" fontWeight="700">
              Na⁺/HCO₃⁻
            </text>

            {!isDrugActive ? (
              <>
                <line x1="65" y1="166" x2="235" y2="166" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#cell-arrowAmber)" />
                <line x1="230" y1="192" x2="78" y2="192" stroke="#ef4444" strokeWidth="2.2" markerEnd="url(#cell-arrowRed)" />
                {renderFlowIon('Na+', 68, 166, 232, 166, 0.0, 0.65, 'cai-na-in')}
                {renderFlowIon('H+', 228, 192, 82, 192, 0.4, 0.65, 'cai-h-out')}

                <line x1="136" y1="252" x2="236" y2="252" stroke="#06b6d4" strokeWidth="2.4" strokeDasharray="5 3" markerEnd="url(#cell-arrowCyan)" />
                {renderFlowIon('HCO3-', 55, 252, 96, 252, 0.2, 0.6, 'cai-hco3-lum')}
                {renderFlowIon('H2O', 140, 252, 234, 252, 0.5, 0.6, 'cai-co2-in')}

                <line x1="300" y1="310" x2="462" y2="310" stroke="#06b6d4" strokeWidth="2.5" markerEnd="url(#cell-arrowCyan)" />
                {renderFlowIon('HCO3-', 302, 310, 458, 310, 0.3, 0.65, 'cai-hco3-blood')}
              </>
            ) : (
              <>
                <BlockadeBadgeSvg x={115} y={252} time={time} size={13} label="Asetazolamid (İnhibe)" />
                <BlockadeBadgeSvg x={265} y={252} time={time} size={13} />

                <line x1="75" y1="166" x2="122" y2="166" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <text x="195" y="160" fontSize="8.3" fontWeight="700" fill={isDark ? '#fca5a5' : '#dc2626'}>
                  H⁺ azalır → NHE3 yavaşlar
                </text>

                {renderBlockedDeflectIon('HCO3-', 115, 252, 0.0, 'cai-blk-hco3-1')}
                {renderBlockedDeflectIon('HCO3-', 115, 252, 0.5, 'cai-blk-hco3-2')}
                {renderBlockedDeflectIon('Na+', 132, 168, 0.25, 'cai-blk-na')}
                {renderBlockedDeflectIon('H2O', 110, 215, 0.72, 'cai-blk-h2o')}

                <g transform="translate(72, 392)">
                  <rect x="-56" y="-13" width="112" height="26" rx="8" fill="#0891b2" />
                  <text textAnchor="middle" y="-2" fill="#fff" fontSize="8.5" fontWeight="800">
                    ↑ Na⁺, ↑↑ HCO₃⁻, ↑ H₂O
                  </text>
                  <text textAnchor="middle" y="8" fill="#cffafe" fontSize="7.4" fontWeight="700">
                    Alkali İdrar Atılımı
                  </text>
                </g>
              </>
            )}
          </g>
        );
      }

      case 'osmotic': {
        return (
          <g>
            <text x="270" y="54" textAnchor="middle" fontSize="9" fontWeight="700" fill={isDark ? '#7dd3fc' : '#0284c7'}>
              Paraselüler Su (H₂O) Geçişi
            </text>

            {[170, 290].map((yPos, i) => (
              <g key={`aqp1-${i}`}>
                <rect x="130" y={yPos - 18} width="30" height="36" rx="10" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
                <text x="145" y={yPos + 3} textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="800">
                  AQP1
                </text>
                <rect x="380" y={yPos - 18} width="30" height="36" rx="10" fill="#0ea5e9" stroke="#0369a1" strokeWidth="2" />
                <text x="395" y={yPos + 3} textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="800">
                  AQP1
                </text>
              </g>
            ))}

            <rect
              x="422"
              y="102"
              width="106"
              height="36"
              rx="8"
              fill={isDark ? '#4c0519' : '#fff1f2'}
              stroke={isDark ? '#fb7185' : '#fda4af'}
              strokeWidth="1.2"
            />
            <text x="475" y="117" textAnchor="middle" fontSize="8.5" fontWeight="800" fill={isDark ? '#fecdd3' : '#be123c'}>
              Hiperozmolar
            </text>
            <text x="475" y="129" textAnchor="middle" fontSize="8" fontWeight="700" fill={isDark ? '#fda4af' : '#9f1239'}>
              İnterstisyum
            </text>

            {!isDrugActive ? (
              <>
                <line x1="65" y1="66" x2="462" y2="66" stroke="#0ea5e9" strokeWidth="2.5" markerEnd="url(#cell-arrowBlue)" />
                <line x1="65" y1="170" x2="462" y2="170" stroke="#0ea5e9" strokeWidth="2.8" markerEnd="url(#cell-arrowBlue)" />
                <line x1="65" y1="290" x2="462" y2="290" stroke="#0ea5e9" strokeWidth="2.8" markerEnd="url(#cell-arrowBlue)" />

                {renderFlowIon('H2O', 65, 66, 460, 66, 0.1, 0.7, 'osm-h2o-p')}
                {renderFlowIon('H2O', 65, 170, 460, 170, 0.35, 0.75, 'osm-h2o-1')}
                {renderFlowIon('H2O', 65, 170, 460, 170, 0.85, 0.75, 'osm-h2o-2')}
                {renderFlowIon('H2O', 65, 290, 460, 290, 0.6, 0.75, 'osm-h2o-3')}
              </>
            ) : (
              <>
                <rect
                  x="18"
                  y="98"
                  width="102"
                  height="252"
                  rx="14"
                  fill={isDark ? '#134e4a' : '#ccfbf1'}
                  stroke={isDark ? '#2dd4bf' : '#0d9488'}
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  opacity={isDark ? '0.55' : '0.7'}
                />
                <text x="69" y="114" textAnchor="middle" fontSize="9" fontWeight="800" fill={isDark ? '#5eead4' : '#0f766e'}>
                  ↑↑ Ozmotik Basınç
                </text>
                <text x="69" y="125" textAnchor="middle" fontSize="7.4" fontWeight="700" fill={isDark ? '#99f6e4' : '#115e59'}>
                  (Geri Emilmeyen Mannitol)
                </text>

                <line x1="95" y1="170" x2="180" y2="170" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="95" y1="290" x2="180" y2="290" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <BlockadeBadgeSvg x={145} y={170} time={time} size={12} label="Su Çıkışı Engellendi" />
                <BlockadeBadgeSvg x={145} y={290} time={time} size={12} />

                {[0.0, 0.33, 0.66].map((off, idx) => {
                  const p = (time * 0.55 + off) % 1;
                  const y = 135 + p * 290;
                  return (
                    <g key={`man-grp-${idx}`}>
                      <circle cx={68} cy={y} r={24} fill="#14b8a6" opacity={0.18} />
                      <IonBadgeSvg ion="Mannitol" x={68} y={y} scale={0.95} />
                      <IonBadgeSvg ion="H2O" x={42} y={y - 10} scale={0.82} />
                      <IonBadgeSvg ion="H2O" x={94} y={y + 8} scale={0.82} />
                    </g>
                  );
                })}

                <g transform="translate(270, 232)">
                  <rect
                    x="-80"
                    y="-22"
                    width="160"
                    height="44"
                    rx="10"
                    fill={isDark ? '#042f2e' : '#f0fdfa'}
                    stroke={isDark ? '#2dd4bf' : '#14b8a6'}
                    strokeWidth="1.5"
                  />
                  <text textAnchor="middle" y="-6" fontSize="9" fontWeight="800" fill={isDark ? '#5eead4' : '#0f766e'}>
                    Ozmotik Gradyan Engellenir
                  </text>
                  <text textAnchor="middle" y="8" fontSize="8" fontWeight="600" fill={isDark ? '#99f6e4' : '#115e59'}>
                    H₂O kana geçemez, idrarla atılır
                  </text>
                </g>
              </>
            )}
          </g>
        );
      }

      case 'loop': {
        return (
          <g>
            {/* Paraselüler Ca2+ / Mg2+ Yolu */}
            <rect
              x="148"
              y="40"
              width="244"
              height="34"
              rx="8"
              fill={
                isDark
                  ? isDrugActive
                    ? '#450a0a'
                    : '#500724'
                  : isDrugActive
                    ? '#fef2f2'
                    : '#fdf2f8'
              }
              stroke={
                isDark
                  ? isDrugActive
                    ? '#f87171'
                    : '#f472b6'
                  : isDrugActive
                    ? '#fca5a5'
                    : '#f9a8d4'
              }
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
            <text
              x="270"
              y="53"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="800"
              fill={
                isDark
                  ? isDrugActive
                    ? '#fecaca'
                    : '#fbcfe8'
                  : isDrugActive
                    ? '#991b1b'
                    : '#9d174d'
              }
            >
              Paraselüler Yol (Ca²⁺, Mg²⁺)
            </text>

            {/* Lümen Pozitif Voltaj Rozeti */}
            <g transform="translate(72, 108)">
              <rect
                x="-46"
                y="-14"
                width="92"
                height="28"
                rx="9"
                fill={
                  isDark
                    ? isDrugActive
                      ? '#1e293b'
                      : '#451a03'
                    : isDrugActive
                      ? '#f1f5f9'
                      : '#fef3c7'
                }
                stroke={
                  isDrugActive
                    ? isDark
                      ? '#64748b'
                      : '#94a3b8'
                    : '#f59e0b'
                }
                strokeWidth="1.6"
              />
              <text
                textAnchor="middle"
                y="-1"
                fontSize="9.5"
                fontWeight="800"
                fill={
                  isDark
                    ? isDrugActive
                      ? '#cbd5e1'
                      : '#fcd34d'
                    : isDrugActive
                      ? '#64748b'
                      : '#b45309'
                }
              >
                {isDrugActive ? 'Lümen: ~0 mV' : 'Lümen: +8 mV (+)'}
              </text>
              <text textAnchor="middle" y="10" fontSize="7.2" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>
                {isDrugActive ? 'İtici güç kayboldu' : 'Ca²⁺/Mg²⁺ iter'}
              </text>
            </g>

            {/* NKCC2 */}
            <rect
              x="122"
              y="165"
              width="46"
              height="74"
              rx="14"
              fill={isDrugActive ? '#dc2626' : '#e11d48'}
              stroke={isDark ? '#fda4af' : '#881337'}
              strokeWidth="2.2"
            />
            <text x="145" y="196" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">
              NKCC2
            </text>
            <text x="145" y="210" textAnchor="middle" fill="#ffe4e6" fontSize="7.5" fontWeight="700">
              Na⁺/K⁺/2Cl⁻
            </text>

            {/* ROMK */}
            <rect
              x="128"
              y="286"
              width="34"
              height="38"
              rx="10"
              fill={isDrugActive ? '#64748b' : '#7c3aed'}
              stroke={isDark ? '#c4b5fd' : '#4c1d95'}
              strokeWidth="2"
            />
            <text x="145" y="309" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="800">
              ROMK
            </text>

            {renderBasolateralATPase(180, isDrugActive)}
            <rect
              x="378"
              y="286"
              width="36"
              height="38"
              rx="10"
              fill={isDrugActive ? '#64748b' : '#059669'}
              stroke={isDark ? '#6ee7b7' : '#064e3b'}
              strokeWidth="2"
            />
            <text x="396" y="303" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800">
              ClC-Kb
            </text>
            <text x="396" y="314" textAnchor="middle" fill="#d1fae5" fontSize="7.5" fontWeight="700">
              Cl⁻
            </text>

            <text x="270" y="394" textAnchor="middle" fontSize="8.3" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>
              Çıkan Kalın Kol (TAL) suya geçirgen değildir (Dilüsyon segmenti)
            </text>

            {!isDrugActive ? (
              <>
                <line x1="78" y1="62" x2="458" y2="62" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#cell-arrowRose)" />
                {renderFlowIon('Ca2+', 80, 62, 455, 62, 0.1, 0.65, 'loop-ca-norm')}
                {renderFlowIon('Mg2+', 80, 62, 455, 62, 0.6, 0.65, 'loop-mg-norm')}

                <line x1="65" y1="184" x2="260" y2="184" stroke="#f59e0b" strokeWidth="2.4" markerEnd="url(#cell-arrowAmber)" />
                <line x1="65" y1="204" x2="250" y2="204" stroke="#8b5cf6" strokeWidth="2.4" markerEnd="url(#cell-arrowPurple)" />
                <line x1="65" y1="224" x2="260" y2="224" stroke="#10b981" strokeWidth="2.4" markerEnd="url(#cell-arrowGreen)" />
                {renderFlowIon('Na+', 68, 184, 255, 184, 0.0, 0.7, 'loop-na-in')}
                {renderFlowIon('K+', 68, 204, 245, 204, 0.33, 0.7, 'loop-k-in')}
                {renderFlowIon('Cl-', 68, 224, 255, 224, 0.66, 0.7, 'loop-cl-in')}

                <line x1="235" y1="305" x2="78" y2="305" stroke="#7c3aed" strokeWidth="2.4" markerEnd="url(#cell-arrowPurple)" />
                {renderFlowIon('K+', 230, 305, 82, 305, 0.2, 0.7, 'loop-k-romk')}

                <line x1="315" y1="305" x2="462" y2="305" stroke="#10b981" strokeWidth="2.4" markerEnd="url(#cell-arrowGreen)" />
                {renderFlowIon('Cl-', 318, 305, 458, 305, 0.5, 0.7, 'loop-cl-out')}
              </>
            ) : (
              <>
                <BlockadeBadgeSvg x={145} y={202} time={time} size={15} label="Furosemid (NKCC2 İnhibe)" />
                <BlockadeBadgeSvg x={270} y={62} time={time} size={11} />

                {renderBlockedDeflectIon('Na+', 126, 182, 0.0, 'loop-blk-na')}
                {renderBlockedDeflectIon('Cl-', 126, 218, 0.22, 'loop-blk-cl')}
                {renderBlockedDeflectIon('K+', 126, 200, 0.44, 'loop-blk-k')}
                {renderBlockedDeflectIon('Ca2+', 126, 72, 0.66, 'loop-blk-ca')}
                {renderBlockedDeflectIon('Mg2+', 126, 86, 0.85, 'loop-blk-mg')}

                <g transform="translate(270, 290)">
                  <rect
                    x="-86"
                    y="-26"
                    width="172"
                    height="52"
                    rx="10"
                    fill={isDark ? '#4c0519' : '#fff1f2'}
                    stroke={isDark ? '#fb7185' : '#f43f5e'}
                    strokeWidth="1.5"
                  />
                  <text textAnchor="middle" y="-8" fontSize="9" fontWeight="800" fill={isDark ? '#fecdd3' : '#be123c'}>
                    En Güçlü Natriürez ve Kalsiüri
                  </text>
                  <text textAnchor="middle" y="6" fontSize="8" fontWeight="600" fill={isDark ? '#fda4af' : '#881337'}>
                    Medüller ozmotik gradyan bozulur
                  </text>
                  <text textAnchor="middle" y="18" fontSize="8" fontWeight="700" fill={isDark ? '#fda4af' : '#9f1239'}>
                    → Na⁺, Cl⁻, K⁺, Ca²⁺, Mg²⁺, H₂O atılır
                  </text>
                </g>
              </>
            )}
          </g>
        );
      }

      case 'thiazide': {
        return (
          <g>
            {/* NCC */}
            <rect
              x="124"
              y="130"
              width="42"
              height="62"
              rx="14"
              fill={isDrugActive ? '#dc2626' : '#16a34a'}
              stroke={isDark ? '#86efac' : '#14532d'}
              strokeWidth="2.2"
            />
            <text x="145" y="156" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800">
              NCC
            </text>
            <text x="145" y="170" textAnchor="middle" fill="#dcfce7" fontSize="7.8" fontWeight="700">
              Na⁺/Cl⁻
            </text>

            {/* TRPV5 */}
            <rect
              x="126"
              y="286"
              width="38"
              height="48"
              rx="12"
              fill={isDrugActive ? '#15803d' : '#f43f5e'}
              stroke={isDark ? '#fda4af' : '#881337'}
              strokeWidth="2"
            />
            <text x="145" y="308" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="800">
              TRPV5
            </text>
            <text x="145" y="320" textAnchor="middle" fill="#ffe4e6" fontSize="7.5" fontWeight="700">
              Ca²⁺
            </text>

            {renderBasolateralATPase(145, false)}

            <rect
              x="378"
              y="210"
              width="34"
              height="32"
              rx="9"
              fill="#059669"
              stroke={isDark ? '#6ee7b7' : '#064e3b'}
              strokeWidth="1.8"
            />
            <text x="395" y="230" textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="800">
              ClC-Kb
            </text>

            {/* NCX1 */}
            <rect
              x="372"
              y="280"
              width="46"
              height="60"
              rx="13"
              fill={isDrugActive ? '#15803d' : '#e11d48'}
              stroke={isDark ? '#cbd5e1' : '#0f172a'}
              strokeWidth="2"
            />
            <text x="395" y="305" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">
              NCX1
            </text>
            <text x="395" y="318" textAnchor="middle" fill="#fef08a" fontSize="7.2" fontWeight="700">
              3Na⁺ / Ca²⁺
            </text>

            {!isDrugActive ? (
              <>
                <line x1="65" y1="148" x2="255" y2="148" stroke="#f59e0b" strokeWidth="2.4" markerEnd="url(#cell-arrowAmber)" />
                <line x1="65" y1="174" x2="255" y2="174" stroke="#10b981" strokeWidth="2.4" markerEnd="url(#cell-arrowGreen)" />
                {renderFlowIon('Na+', 68, 148, 250, 148, 0.0, 0.65, 'thz-na-norm')}
                {renderFlowIon('Cl-', 68, 174, 250, 174, 0.5, 0.65, 'thz-cl-norm')}

                <line x1="315" y1="226" x2="462" y2="226" stroke="#10b981" strokeWidth="2.2" markerEnd="url(#cell-arrowGreen)" />
                {renderFlowIon('Cl-', 318, 226, 458, 226, 0.3, 0.65, 'thz-cl-out')}

                <line x1="68" y1="310" x2="465" y2="310" stroke="#f43f5e" strokeWidth="2.2" markerEnd="url(#cell-arrowRose)" />
                {renderFlowIon('Ca2+', 70, 310, 460, 310, 0.2, 0.45, 'thz-ca-norm')}
              </>
            ) : (
              <>
                <BlockadeBadgeSvg x={145} y={161} time={time} size={14} label="Hidroklorotiyazid (NCC İnhibe)" />

                {renderBlockedDeflectIon('Na+', 126, 148, 0.0, 'thz-blk-na')}
                {renderBlockedDeflectIon('Cl-', 126, 174, 0.35, 'thz-blk-cl')}
                {renderBlockedDeflectIon('H2O', 112, 196, 0.7, 'thz-blk-h2o')}

                <g transform="translate(268, 212)">
                  <rect
                    x="-78"
                    y="-22"
                    width="156"
                    height="44"
                    rx="10"
                    fill={isDark ? '#052e16' : '#ecfdf5'}
                    stroke={isDark ? '#4ade80' : '#16a34a'}
                    strokeWidth="1.8"
                  />
                  <text textAnchor="middle" y="-5" fontSize="9.5" fontWeight="800" fill={isDark ? '#86efac' : '#166534'}>
                    ↓ Hücre İçi [Na⁺] Düşer
                  </text>
                  <text textAnchor="middle" y="10" fontSize="8" fontWeight="700" fill={isDark ? '#bbf7d0' : '#15803d'}>
                    NCX1 Hızlanır → ↑↑ Ca²⁺ Kana Geçer!
                  </text>
                </g>

                <line x1="65" y1="302" x2="468" y2="302" stroke="#16a34a" strokeWidth="4" markerEnd="url(#cell-arrowGreen)" />
                <line x1="458" y1="326" x2="338" y2="326" stroke="#f59e0b" strokeWidth="2.2" markerEnd="url(#cell-arrowAmber)" />
                {renderFlowIon('Ca2+', 68, 302, 464, 302, 0.0, 1.05, 'thz-ca-fast1')}
                {renderFlowIon('Ca2+', 68, 302, 464, 302, 0.33, 1.05, 'thz-ca-fast2')}
                {renderFlowIon('Ca2+', 68, 302, 464, 302, 0.66, 1.05, 'thz-ca-fast3')}
                {renderFlowIon('Na+', 454, 326, 342, 326, 0.2, 0.85, 'thz-na-ncx')}

                <g transform="translate(465, 272)">
                  <rect x="-48" y="-11" width="96" height="22" rx="8" fill="#15803d" />
                  <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="8.5" fontWeight="800">
                    ↑↑ Ca²⁺ Tutulur
                  </text>
                </g>
              </>
            )}
          </g>
        );
      }

      case 'ksparing': {
        const blockMR = isDrugActive && (kSparingMode === 'both' || kSparingMode === 'spironolactone');
        const blockENaC = isDrugActive && (kSparingMode === 'both' || kSparingMode === 'amiloride');

        return (
          <g>
            <g transform="translate(72, 106)">
              <rect
                x="-48"
                y="-14"
                width="96"
                height="28"
                rx="9"
                fill={
                  isDark
                    ? isDrugActive
                      ? '#1e293b'
                      : '#2e1065'
                    : isDrugActive
                      ? '#f1f5f9'
                      : '#ede9fe'
                }
                stroke={
                  isDrugActive
                    ? isDark
                      ? '#64748b'
                      : '#94a3b8'
                    : isDark
                      ? '#a78bfa'
                      : '#7c3aed'
                }
                strokeWidth="1.6"
              />
              <text
                textAnchor="middle"
                y="-1"
                fontSize="9.2"
                fontWeight="800"
                fill={
                  isDark
                    ? isDrugActive
                      ? '#cbd5e1'
                      : '#ddd6fe'
                    : isDrugActive
                      ? '#64748b'
                      : '#5b21b6'
                }
              >
                {isDrugActive ? 'Lümen: ~0 mV' : 'Lümen: -35 mV (-)'}
              </text>
              <text textAnchor="middle" y="10" fontSize="7.2" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>
                {isDrugActive ? 'K⁺ çekimi durdu' : 'K⁺’u lümene çeker'}
              </text>
            </g>

            {/* ENaC */}
            <rect
              x="126"
              y="148"
              width="38"
              height="52"
              rx="12"
              fill={blockENaC ? '#dc2626' : isDrugActive ? '#64748b' : '#f59e0b'}
              stroke={isDark ? '#fde68a' : '#78350f'}
              strokeWidth="2.2"
            />
            <text x="145" y="172" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="800">
              ENaC
            </text>
            <text x="145" y="185" textAnchor="middle" fill="#fef3c7" fontSize="7.5" fontWeight="700">
              Na⁺
            </text>

            {/* ROMK */}
            <rect
              x="126"
              y="288"
              width="38"
              height="50"
              rx="12"
              fill={isDrugActive ? '#64748b' : '#7c3aed'}
              stroke={isDark ? '#c4b5fd' : '#4c1d95'}
              strokeWidth="2.2"
            />
            <text x="145" y="310" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">
              ROMK
            </text>
            <text x="145" y="323" textAnchor="middle" fill="#ede9fe" fontSize="7.2" fontWeight="700">
              K⁺ Çıkışı
            </text>

            {/* MR */}
            <g transform="translate(268, 224)">
              <rect
                x="-58"
                y="-26"
                width="116"
                height="52"
                rx="12"
                fill={
                  isDark
                    ? blockMR
                      ? '#450a0a'
                      : '#2e1065'
                    : blockMR
                      ? '#fef2f2'
                      : '#f5f3ff'
                }
                stroke={blockMR ? '#ef4444' : isDark ? '#a78bfa' : '#7c3aed'}
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                y="-7"
                fontSize="9"
                fontWeight="800"
                fill={
                  isDark
                    ? blockMR
                      ? '#fecaca'
                      : '#ddd6fe'
                    : blockMR
                      ? '#991b1b'
                      : '#5b21b6'
                }
              >
                Aldosteron (MR)
              </text>
              <text textAnchor="middle" y="6" fontSize="8" fontWeight="700" fill={isDark ? '#cbd5e1' : '#475569'}>
                Reseptörü → mRNA
              </text>
              <text textAnchor="middle" y="18" fontSize="7.2" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>
                (ENaC & Na⁺/K⁺-ATPaz)
              </text>
            </g>

            <line
              x1="210"
              y1="212"
              x2="168"
              y2="180"
              stroke={blockMR ? '#ef4444' : isDark ? '#a78bfa' : '#7c3aed'}
              strokeWidth="1.8"
              strokeDasharray="4 3"
            />
            <line
              x1="210"
              y1="238"
              x2="168"
              y2="298"
              stroke={blockMR ? '#ef4444' : isDark ? '#a78bfa' : '#7c3aed'}
              strokeWidth="1.8"
              strokeDasharray="4 3"
            />

            {renderBasolateralATPase(224, isDrugActive)}

            <text x="270" y="394" textAnchor="middle" fontSize="8.2" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>
              Komşu interkale hücrelerde Hidrojen (H⁺) sekresyonu da azalır
            </text>

            {!isDrugActive ? (
              <>
                <line x1="66" y1="174" x2="220" y2="174" stroke="#f59e0b" strokeWidth="2.6" markerEnd="url(#cell-arrowAmber)" />
                {renderFlowIon('Na+', 68, 174, 216, 174, 0.0, 0.7, 'ksp-na-in')}
                {renderFlowIon('Na+', 68, 174, 216, 174, 0.5, 0.7, 'ksp-na-in2')}

                <line x1="255" y1="313" x2="66" y2="313" stroke="#7c3aed" strokeWidth="2.8" markerEnd="url(#cell-arrowPurple)" />
                {renderFlowIon('K+', 252, 313, 68, 313, 0.2, 0.7, 'ksp-k-sec1')}
                {renderFlowIon('K+', 252, 313, 68, 313, 0.7, 0.7, 'ksp-k-sec2')}
              </>
            ) : (
              <>
                {blockENaC && (
                  <BlockadeBadgeSvg x={145} y={174} time={time} size={13} label="Amilorid (ENaC İnhibe)" />
                )}
                {blockMR && (
                  <BlockadeBadgeSvg x={268} y={224} time={time} size={13} label="Spironolakton (MR İnhibe)" />
                )}

                {renderBlockedDeflectIon('Na+', 126, 174, 0.0, 'ksp-blk-na1')}
                {renderBlockedDeflectIon('Na+', 126, 174, 0.5, 'ksp-blk-na2')}
                {renderBlockedDeflectIon('H2O', 110, 200, 0.25, 'ksp-blk-h2o')}

                <line x1="230" y1="313" x2="165" y2="313" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                <BlockadeBadgeSvg x={145} y={313} time={time} size={11} />
                <IonBadgeSvg ion="K+" x={275 + Math.sin(time * 3) * 6} y={313} scale={0.95} />
                <IonBadgeSvg ion="K+" x={465} y={313 + Math.cos(time * 2.5) * 6} scale={0.95} />

                <g transform="translate(310, 348)">
                  <rect x="-76" y="-12" width="152" height="24" rx="8" fill="#6d28d9" />
                  <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="8.6" fontWeight="800">
                    K⁺ Sekresyonu Durdu → K⁺ Tutulur!
                  </text>
                </g>
              </>
            )}
          </g>
        );
      }

      case 'vaptan': {
        return (
          <g>
            {/* V2 Reseptörü */}
            <rect
              x="372"
              y="128"
              width="46"
              height="52"
              rx="14"
              fill={isDrugActive ? '#dc2626' : '#2563eb'}
              stroke={isDark ? '#93c5fd' : '#1e3a8a'}
              strokeWidth="2.2"
            />
            <text x="395" y="151" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="800">
              V2
            </text>
            <text x="395" y="164" textAnchor="middle" fill="#dbeafe" fontSize="7.2" fontWeight="700">
              Reseptör
            </text>

            {/* ADH Hormonu */}
            <g transform={`translate(${isDrugActive ? 476 : 440 + Math.sin(time * 4) * 5}, 154)`}>
              <rect x="-24" y="-12" width="48" height="24" rx="12" fill="#1d4ed8" stroke="#93c5fd" strokeWidth="1.5" />
              <text textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="9" fontWeight="800">
                ADH
              </text>
            </g>

            {/* cAMP / PKA */}
            <g transform="translate(274, 154)">
              <rect
                x="-56"
                y="-20"
                width="112"
                height="40"
                rx="10"
                fill={
                  isDark
                    ? isDrugActive
                      ? '#0f172a'
                      : '#172554'
                    : isDrugActive
                      ? '#f1f5f9'
                      : '#eff6ff'
                }
                stroke={
                  isDrugActive
                    ? isDark
                      ? '#475569'
                      : '#cbd5e1'
                    : isDark
                      ? '#60a5fa'
                      : '#3b82f6'
                }
                strokeWidth="1.8"
              />
              <text
                textAnchor="middle"
                y="-3"
                fontSize="9"
                fontWeight="800"
                fill={
                  isDark
                    ? isDrugActive
                      ? '#94a3b8'
                      : '#93c5fd'
                    : isDrugActive
                      ? '#64748b'
                      : '#1d4ed8'
                }
              >
                cAMP → PKA
              </text>
              <text textAnchor="middle" y="10" fontSize="7.5" fontWeight="700" fill={isDark ? '#94a3b8' : '#64748b'}>
                {isDrugActive ? 'Sinyal Kesildi!' : 'AQP2 Füzyon Sinyali'}
              </text>
            </g>

            <line
              x1="370"
              y1="154"
              x2="332"
              y2="154"
              stroke={isDrugActive ? '#ef4444' : isDark ? '#60a5fa' : '#2563eb'}
              strokeWidth="2.2"
              strokeDasharray={isDrugActive ? '3 3' : 'none'}
            />

            {!isDrugActive ? (
              <>
                {[215, 295].map((yPos, idx) => (
                  <g key={`aqp2-open-${idx}`}>
                    <rect x="126" y={yPos - 18} width="38" height="36" rx="10" fill="#0284c7" stroke={isDark ? '#7dd3fc' : '#0c4a6e'} strokeWidth="2" />
                    <text x="145" y={yPos + 3} textAnchor="middle" fill="#fff" fontSize="8.8" fontWeight="800">
                      AQP2
                    </text>
                  </g>
                ))}
                <path
                  d="M 245 176 Q 210 205 168 212"
                  fill="none"
                  stroke={isDark ? '#60a5fa' : '#2563eb'}
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  markerEnd="url(#cell-arrowBlue)"
                />
              </>
            ) : (
              <>
                {[215, 295].map((yPos, idx) => (
                  <g key={`aqp2-closed-${idx}`}>
                    <rect
                      x="128"
                      y={yPos - 16}
                      width="34"
                      height="32"
                      rx="8"
                      fill={isDark ? '#450a0a' : '#fef2f2'}
                      stroke={isDark ? '#f87171' : '#ef4444'}
                      strokeWidth="1.8"
                      strokeDasharray="4 3"
                    />
                    <text x="145" y={yPos + 3} textAnchor="middle" fill={isDark ? '#fecaca' : '#dc2626'} fontSize="7.5" fontWeight="800">
                      AQP2 Yok
                    </text>
                  </g>
                ))}
                {[228, 286].map((vy, idx) => (
                  <g key={`ves-${idx}`} transform={`translate(${245 + idx * 34}, ${vy + Math.sin(time * 2 + idx) * 4})`}>
                    <circle
                      r="19"
                      fill={isDark ? '#0c4a6e' : '#e0f2fe'}
                      stroke={isDark ? '#38bdf8' : '#0284c7'}
                      strokeWidth="1.8"
                      strokeDasharray="3 2"
                    />
                    <text textAnchor="middle" y="-2" fontSize="7.5" fontWeight="800" fill={isDark ? '#bae6fd' : '#0369a1'}>
                      AQP2
                    </text>
                    <text textAnchor="middle" y="8" fontSize="6.5" fontWeight="700" fill={isDark ? '#cbd5e1' : '#64748b'}>
                      Vezikül
                    </text>
                  </g>
                ))}
              </>
            )}

            <rect x="376" y="242" width="38" height="46" rx="11" fill="#0ea5e9" stroke={isDark ? '#7dd3fc' : '#0369a1'} strokeWidth="2" />
            <text x="395" y="262" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="800">
              AQP3/4
            </text>
            <text x="395" y="274" textAnchor="middle" fill="#e0f2fe" fontSize="7" fontWeight="700">
              H₂O
            </text>

            <rect
              x="172"
              y="362"
              width="196"
              height="28"
              rx="8"
              fill={isDark ? '#0f172a' : '#f8fafc'}
              stroke={isDark ? '#475569' : '#cbd5e1'}
              strokeWidth="1.2"
            />
            <text x="270" y="379" textAnchor="middle" fontSize="8.3" fontWeight="700" fill={isDark ? '#e2e8f0' : '#334155'}>
              Na⁺ ve K⁺ etkilenmez (Saf Akuarez)
            </text>

            {!isDrugActive ? (
              <>
                <line x1="65" y1="215" x2="372" y2="255" stroke="#0ea5e9" strokeWidth="2.6" markerEnd="url(#cell-arrowBlue)" />
                <line x1="65" y1="295" x2="372" y2="270" stroke="#0ea5e9" strokeWidth="2.6" markerEnd="url(#cell-arrowBlue)" />
                <line x1="416" y1="265" x2="478" y2="265" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#cell-arrowBlue)" />

                {renderFlowIon('H2O', 68, 215, 370, 255, 0.0, 0.72, 'vap-h2o-1')}
                {renderFlowIon('H2O', 68, 295, 370, 270, 0.45, 0.72, 'vap-h2o-2')}
                {renderFlowIon('H2O', 418, 265, 476, 265, 0.25, 0.85, 'vap-h2o-out')}
              </>
            ) : (
              <>
                <BlockadeBadgeSvg x={395} y={154} time={time} size={14} label="Tolvaptan (V2 İnhibe)" />
                <BlockadeBadgeSvg x={145} y={215} time={time} size={10} />

                {renderBlockedDeflectIon('H2O', 124, 215, 0.0, 'vap-blk-1')}
                {renderBlockedDeflectIon('H2O', 124, 260, 0.33, 'vap-blk-2')}
                {renderBlockedDeflectIon('H2O', 124, 295, 0.66, 'vap-blk-3')}

                <g transform="translate(72, 392)">
                  <rect x="-56" y="-13" width="112" height="26" rx="8" fill="#0284c7" />
                  <text textAnchor="middle" y="-2" fill="#fff" fontSize="8.8" fontWeight="800">
                    ↑↑ Serbest H₂O Atılımı
                  </text>
                  <text textAnchor="middle" y="8" fill="#e0f2fe" fontSize="7.4" fontWeight="700">
                    Seyreltik İdrar (Akuarez)
                  </text>
                </g>
              </>
            )}
          </g>
        );
      }
    }
  };

  // Potasyum tutucu aktifken Spironolakton / Amilorid alt seçicisi
  const kSparingSubSelector =
    selectedDiuretic === 'ksparing' && isDrugActive ? (
      <div
        className={`inline-flex flex-wrap items-center p-0.5 rounded-lg border text-[10.5px] font-bold ${
          isDark
            ? 'bg-violet-950/60 border-violet-700/60'
            : 'bg-violet-100/80 border-violet-200'
        }`}
      >
        {(
          [
            { id: 'both', label: 'Spironolakton + Amilorid' },
            { id: 'spironolactone', label: 'Spironolakton (MR)' },
            { id: 'amiloride', label: 'Amilorid (ENaC)' },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setKSparingMode(opt.id)}
            className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
              kSparingMode === opt.id
                ? 'bg-violet-700 text-white shadow-2xs'
                : isDark
                  ? 'text-violet-200 hover:bg-violet-900/60'
                  : 'text-violet-800 hover:bg-violet-200/60'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    ) : null;

  return (
    <div
      className={`rounded-2xl border shadow-sm overflow-hidden flex flex-col ${
        isDark
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* ÜST KONTROL VE GRUP SEÇİM ÇUBUĞU (Panel 1 ile tam senkronize) */}
      <AnimationPanelToolbar
        isDark={isDark}
        title="Hücresel Etki Mekanizması ve İyon Yönleri"
        subtitle={drug.segmentLabel}
        icon={<Zap className="w-4 h-4" />}
        selectedDiuretic={selectedDiuretic}
        onPrevDiuretic={onPrevDiuretic}
        onNextDiuretic={onNextDiuretic}
        isDrugActive={isDrugActive}
        onToggleDrugActive={onToggleDrugActive}
        isPlaying={isPlaying}
        onTogglePlay={onTogglePlay}
        speed={speed}
        onChangeSpeed={onChangeSpeed}
        extraRightSlot={kSparingSubSelector}
      />

      {/* HÜCRESEL SVG */}
      <div
        className={`p-2 sm:p-3 flex-1 flex flex-col justify-between ${
          isDark ? 'bg-slate-950/50' : 'bg-white'
        }`}
      >
        <svg
          viewBox="0 0 540 445"
          className="w-full h-auto max-h-[450px] select-none"
          role="img"
          aria-label="Tübül epitel hücresi iyon taşınma mekanizması"
        >
          <defs>
            <marker id="cell-arrowAmber" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#f59e0b" />
            </marker>
            <marker id="cell-arrowGreen" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#10b981" />
            </marker>
            <marker id="cell-arrowPurple" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#7c3aed" />
            </marker>
            <marker id="cell-arrowBlue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#0ea5e9" />
            </marker>
            <marker id="cell-arrowCyan" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#06b6d4" />
            </marker>
            <marker id="cell-arrowRose" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#f43f5e" />
            </marker>
            <marker id="cell-arrowRed" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="#ef4444" />
            </marker>
            <linearGradient id="cell-lumenBg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? '#0c4a6e' : '#e0f2fe'} stopOpacity={isDark ? '0.62' : '1'} />
              <stop offset="100%" stopColor={isDark ? '#1e293b' : '#fef9c3'} stopOpacity={isDark ? '0.85' : '0.65'} />
            </linearGradient>
            <linearGradient id="cell-bloodBg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={isDark ? '#1e293b' : '#f8fafc'} />
              <stop offset="55%" stopColor={isDark ? '#4c0519' : '#ffe4e6'} stopOpacity={isDark ? '0.6' : '1'} />
              <stop offset="100%" stopColor={isDark ? '#881337' : '#fecdd3'} stopOpacity={isDark ? '0.52' : '1'} />
            </linearGradient>
          </defs>

          {/* Koyu Mod Taban Tuvali */}
          {isDark && <rect x="2" y="2" width="536" height="441" rx="14" fill="#0f172a" />}

          {/* 3 ANATOMİK KOMPARTMAN */}
          <rect x="6" y="34" width="139" height="404" rx="12" fill="url(#cell-lumenBg)" />
          {[32, 72, 108].map((lx, idx) => (
            <line
              key={`lum-flow-${idx}`}
              x1={lx}
              y1="44"
              x2={lx}
              y2="428"
              stroke="#38bdf8"
              strokeWidth="2"
              strokeDasharray="10 18"
              strokeDashoffset={-time * (isDrugActive ? 56 : 28)}
              opacity="0.35"
            />
          ))}

          <rect x="395" y="34" width="139" height="404" rx="12" fill="url(#cell-bloodBg)" />
          <rect
            x="486"
            y="42"
            width="42"
            height="388"
            rx="12"
            fill={isDark ? '#9f1239' : '#fda4af'}
            opacity="0.35"
          />
          <text
            x="507"
            y="236"
            textAnchor="middle"
            fontSize="10"
            fontWeight="800"
            fill={isDark ? '#fda4af' : '#9f1239'}
            opacity={isDark ? '0.88' : '0.72'}
            transform="rotate(90 507 236)"
          >
            PERİTÜBÜLER KILCAL DAMAR
          </text>

          <rect
            x="145"
            y="78"
            width="250"
            height="332"
            rx="16"
            fill={isDark ? '#1e293b' : '#fffef5'}
            stroke={isDark ? '#475569' : '#cbd5e1'}
            strokeWidth="2"
          />
          <line x1="145" y1="88" x2="145" y2="400" stroke={isDark ? '#818cf8' : '#6366f1'} strokeWidth="5.5" strokeLinecap="round" />
          <line x1="395" y1="88" x2="395" y2="400" stroke={isDark ? '#2dd4bf' : '#0f766e'} strokeWidth="5.5" strokeLinecap="round" />

          {/* Sıkı Bağlantılar */}
          <circle cx="152" cy="78" r="4.5" fill={isDark ? '#94a3b8' : '#475569'} />
          <circle cx="388" cy="78" r="4.5" fill={isDark ? '#94a3b8' : '#475569'} />

          {/* Hücre Çekirdeği */}
          <ellipse
            cx="270"
            cy="366"
            rx="44"
            ry="18"
            fill={isDark ? '#334155' : '#fef3c7'}
            stroke={isDark ? '#475569' : '#fde68a'}
            strokeWidth="1.5"
            opacity="0.55"
          />

          {/* ÜST BÖLGE BAŞLIKLARI */}
          <g>
            <rect x="10" y="6" width="130" height="24" rx="8" fill="#0369a1" />
            <text x="75" y="21" textAnchor="middle" fill="#fff" fontSize="9.8" fontWeight="800">
              Tübül Lümeni (İdrar)
            </text>

            <rect x="150" y="6" width="240" height="24" rx="8" fill={isDark ? '#475569' : '#334155'} />
            <text x="270" y="21" textAnchor="middle" fill="#fff" fontSize="9.8" fontWeight="800">
              Tübül Epitel Hücresi
            </text>

            <rect x="400" y="6" width="130" height="24" rx="8" fill="#be123c" />
            <text x="465" y="21" textAnchor="middle" fill="#fff" fontSize="9.8" fontWeight="800">
              İnterstisyum / Kan
            </text>
          </g>

          <text x="154" y="426" fontSize="9.5" fontWeight="800" fill={isDark ? '#a5b4fc' : '#4338ca'}>
            ▲ Apikal Membran
          </text>
          <text x="386" y="426" textAnchor="end" fontSize="9.5" fontWeight="800" fill={isDark ? '#5eead4' : '#0f766e'}>
            Bazolateral Membran ▲
          </text>
          <text x="72" y="428" textAnchor="middle" fontSize="9.5" fontWeight="800" fill={isDark ? '#7dd3fc' : '#0369a1'}>
            İdrar Yönü ↓
          </text>

          {renderCellSpecificDiagram()}
        </svg>

        {/* Mekanizma Kısa Özet Kutusu (Uzun adlar + kısaltmalar birlikte) */}
        <div
          className={`mt-2 rounded-xl border p-3 text-xs leading-relaxed transition-colors ${
            isDrugActive
              ? isDark
                ? 'bg-rose-950/35 border-rose-800/70 text-rose-100'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
              : isDark
                ? 'bg-emerald-950/35 border-emerald-800/70 text-emerald-100'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-center gap-1.5 font-bold mb-1">
            {isDrugActive ? (
              <>
                <Lock className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
                <span>Diüretik Etkisi ({drug.prototypes[0]}):</span>
              </>
            ) : (
              <>
                <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                <span>Normal Fizyolojik Taşınma:</span>
              </>
            )}
          </div>
          <p>{isDrugActive ? drug.blockedMechanism : drug.normalMechanism}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ANİMASYON ALTI 1. BÖLÜM: İYONLAR, TAŞIYICILAR VE KISALTMALAR TABLOSU
// ============================================================================

const IonsAbbreviationsTable: React.FC<{
  selectedDiuretic: DiureticId;
  isDark: boolean;
}> = React.memo(({ selectedDiuretic, isDark }) => {
  const [filterMode, setFilterMode] = useState<'active' | 'all'>('all');
  const drug = DIURETICS[selectedDiuretic];
  const darkSafeAccent = DARK_ACCENT_COLORS[selectedDiuretic];

  const sortedItems = useMemo(() => {
    const relevant = GLOSSARY_ITEMS.filter((item) =>
      item.relevantGroups.includes(selectedDiuretic)
    );
    if (filterMode === 'active') return relevant;
    const others = GLOSSARY_ITEMS.filter(
      (item) => !item.relevantGroups.includes(selectedDiuretic)
    );
    return [...relevant, ...others];
  }, [selectedDiuretic, filterMode]);

  const getCategoryBadgeClass = (cat: GlossaryCategory) => {
    switch (cat) {
      case 'İyon':
        return isDark
          ? 'bg-sky-950/60 text-sky-300 border-sky-700/60'
          : 'bg-sky-50 text-sky-800 border-sky-200';
      case 'Taşıyıcı':
        return isDark
          ? 'bg-amber-950/60 text-amber-300 border-amber-700/60'
          : 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Kanal':
        return isDark
          ? 'bg-indigo-950/60 text-indigo-300 border-indigo-700/60'
          : 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Reseptör':
        return isDark
          ? 'bg-violet-950/60 text-violet-300 border-violet-700/60'
          : 'bg-violet-50 text-violet-800 border-violet-200';
      case 'Enzim':
        return isDark
          ? 'bg-cyan-950/60 text-cyan-300 border-cyan-700/60'
          : 'bg-cyan-50 text-cyan-800 border-cyan-200';
      default:
        return isDark
          ? 'bg-teal-950/60 text-teal-300 border-teal-700/60'
          : 'bg-teal-50 text-teal-800 border-teal-200';
    }
  };

  return (
    <section
      className={`rounded-2xl border shadow-sm overflow-hidden ${
        isDark
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* Başlık ve Filtre Çubuğu */}
      <div
        className={`px-4 sm:px-5 py-3.5 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
          isDark
            ? 'border-slate-800 bg-slate-950/50'
            : 'border-slate-100 bg-slate-50/70'
        }`}
      >
        <div className="flex items-start sm:items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isDark
                ? 'bg-indigo-950/70 text-indigo-300'
                : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3
              className={`text-sm sm:text-base font-extrabold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              İyonlar, Taşıyıcılar ve Kısaltmalar Referans Tablosu
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Animasyonlarda kullanılan tüm iyon simgelerinin ve moleküler kısaltmaların uzun Türkçe karşılıkları
            </p>
          </div>
        </div>

        {/* Aktif Grup vs Tüm Kısaltmalar Filtresi + Yön Efsanesi */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`inline-flex items-center rounded-xl p-1 border text-xs font-bold ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-slate-200/70 border-slate-200'
            }`}
          >
            <Filter className={`w-3.5 h-3.5 mx-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <button
              type="button"
              onClick={() => setFilterMode('active')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === 'active'
                  ? isDark
                    ? 'bg-slate-950 text-white shadow-2xs'
                    : 'bg-white text-slate-900 shadow-2xs'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aktif Grup ({GLOSSARY_ITEMS.filter((i) => i.relevantGroups.includes(selectedDiuretic)).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                filterMode === 'all'
                  ? isDark
                    ? 'bg-slate-950 text-white shadow-2xs'
                    : 'bg-white text-slate-900 shadow-2xs'
                  : isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Kısaltmalar ({GLOSSARY_ITEMS.length})
            </button>
          </div>
        </div>
      </div>

      {/* Ok Yönleri Mini Efsane Şeridi */}
      <div
        className={`px-4 sm:px-5 py-2 border-b flex flex-wrap items-center gap-4 text-[11px] font-semibold ${
          isDark
            ? 'bg-slate-950/30 border-slate-800 text-slate-300'
            : 'bg-slate-50/40 border-slate-100 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 bg-sky-500 inline-block" />
          <span>Geri Emilim (Tübül Lümeni → Kan)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-0.5 border-b-2 border-dashed border-violet-500 inline-block" />
          <span>Sekresyon (Kan → Tübül Lümeni)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center">
            ✕
          </span>
          <span className={isDark ? 'text-rose-400' : 'text-rose-700'}>
            İnhibe Edilen / Bloke Taşınma
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: drug.accentColor }}
          />
          <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
            Aktif Grup ({drug.shortName}) İlgili Öğeleri Vurgulanır
          </span>
        </div>
      </div>

      {/* Responsive Tablo */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b text-[11px] font-extrabold uppercase tracking-wider ${
                isDark
                  ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
            >
              <th className="py-2.5 px-4 w-36">Simge / Kısaltma</th>
              <th className="py-2.5 px-4 min-w-[210px]">Uzun Hali (Tam Türkçe Adı)</th>
              <th className="py-2.5 px-4 w-32">Kategori</th>
              <th className="py-2.5 px-4 min-w-[260px]">Fizyolojik Görev ve Aktif Gruptaki Etkisi</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y text-xs ${
              isDark ? 'divide-slate-800' : 'divide-slate-100'
            }`}
          >
            {sortedItems.map((item) => {
              const isRelevant = item.relevantGroups.includes(selectedDiuretic);
              const ionStyle = item.ionKey ? ION_STYLES[item.ionKey] : null;
              const activeEffect = item.groupSpecificEffect?.[selectedDiuretic];

              return (
                <tr
                  key={item.id}
                  className={`transition-colors ${
                    isRelevant
                      ? isDark
                        ? 'bg-sky-950/25 hover:bg-sky-950/40'
                        : 'bg-sky-50/35 hover:bg-sky-50/60'
                      : isDark
                        ? 'bg-slate-900 hover:bg-slate-800/50 opacity-75'
                        : 'bg-white hover:bg-slate-50/70 opacity-80'
                  }`}
                >
                  {/* Simge / Kısaltma */}
                  <td className="py-2.5 px-4 align-top">
                    <div className="flex items-center gap-2">
                      {ionStyle ? (
                        <span
                          className="w-7 h-7 rounded-full text-[10px] font-extrabold text-white flex items-center justify-center shrink-0 shadow-2xs"
                          style={{ backgroundColor: ionStyle.color }}
                        >
                          {ionStyle.label}
                        </span>
                      ) : (
                        <span
                          className="px-2 py-1 rounded-lg text-[11px] font-extrabold border shrink-0"
                          style={
                            isDark
                              ? {
                                  borderColor: isRelevant ? darkSafeAccent : '#475569',
                                  color: isRelevant ? darkSafeAccent : '#cbd5e1',
                                  backgroundColor: isRelevant ? '#0f172a' : '#1e293b',
                                }
                              : {
                                  borderColor: isRelevant ? drug.accentColor : '#cbd5e1',
                                  color: isRelevant ? drug.accentColor : '#334155',
                                  backgroundColor: isRelevant ? '#ffffff' : '#f8fafc',
                                }
                          }
                        >
                          {item.symbol}
                        </span>
                      )}
                      {ionStyle && (
                        <span
                          className={`font-extrabold ${
                            isDark ? 'text-slate-100' : 'text-slate-900'
                          }`}
                        >
                          {item.symbol}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Uzun Hali */}
                  <td className="py-2.5 px-4 align-top">
                    <div
                      className={`font-bold flex flex-wrap items-center gap-1.5 ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      <span>{item.fullName}</span>
                      {isRelevant && (
                        <span
                          className="inline-flex items-center gap-0.5 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: drug.accentColor }}
                        >
                          <Sparkles className="w-2.5 h-2.5" />
                          Aktif Grup
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="py-2.5 px-4 align-top">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md border text-[10.5px] font-bold ${getCategoryBadgeClass(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </td>

                  {/* Görev ve Aktif Etki */}
                  <td className="py-2.5 px-4 align-top space-y-1">
                    <p
                      className={`leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {item.generalRole}
                    </p>
                    {activeEffect && (
                      <p
                        className={`font-semibold border rounded-lg px-2.5 py-1.5 leading-snug ${
                          isDark
                            ? 'text-slate-100 bg-slate-950/70 border-slate-700/80'
                            : 'text-slate-900 bg-white/90 border-slate-200/80'
                        }`}
                      >
                        <span
                          style={{ color: isDark ? darkSafeAccent : drug.accentColor }}
                          className="font-extrabold"
                        >
                          {drug.shortName}:{' '}
                        </span>
                        {activeEffect}
                      </p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
});

IonsAbbreviationsTable.displayName = 'IonsAbbreviationsTable';

// ============================================================================
// ANİMASYON ALTI 2. BÖLÜM: İDRAR ELEKTROLİT DEĞİŞİMLERİ VE KLİNİK ÖZET KARTI
// ============================================================================

const ClinicalSummaryPanel: React.FC<{
  drug: DiureticProfile;
  isDark: boolean;
}> = React.memo(({ drug, isDark }) => {
  const getBadgeStyle = (dir: EffectDirection) => {
    switch (dir) {
      case 'up-strong':
        return isDark
          ? 'bg-rose-950/50 text-rose-200 border-rose-700/70'
          : 'bg-rose-100 text-rose-900 border-rose-300';
      case 'up':
        return isDark
          ? 'bg-amber-950/50 text-amber-200 border-amber-700/70'
          : 'bg-amber-100 text-amber-900 border-amber-300';
      case 'down-strong':
      case 'down':
        return isDark
          ? 'bg-emerald-950/50 text-emerald-200 border-emerald-700/70'
          : 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return isDark
          ? 'bg-slate-800/80 text-slate-300 border-slate-700'
          : 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section
      className={`rounded-2xl border shadow-sm overflow-hidden ${
        isDark
          ? 'bg-slate-900 border-slate-800'
          : 'bg-white border-slate-200'
      }`}
    >
      {/* Üst Özet Başlık */}
      <div
        className={`px-5 py-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-3 ${
          isDark
            ? 'border-slate-800 bg-slate-950/50'
            : 'border-slate-100 bg-slate-50/70'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: drug.accentColor }}
            />
            <h3
              className={`text-base font-extrabold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {drug.name}
            </h3>
            <span
              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {drug.segmentLabel}
            </span>
          </div>
          <p
            className={`text-xs sm:text-sm mt-1 leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            {drug.summary}
          </p>
        </div>

        {/* Prototip İlaçlar */}
        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <Pill className="w-4 h-4 text-slate-400 mr-0.5" />
          {drug.prototypes.map((med) => (
            <span
              key={med}
              className="text-xs font-bold px-2.5 py-1 rounded-lg text-white shadow-2xs"
              style={{ backgroundColor: drug.accentColor }}
            >
              {med}
            </span>
          ))}
        </div>
      </div>

      {/* İDRAR ELEKTROLİT DEĞİŞİMLERİ ŞERİDİ (7 Elektrolit + Uzun Ad + Kısaltma) */}
      <div className="px-5 pt-4 pb-2">
        <div
          className={`text-xs font-extrabold uppercase tracking-wide mb-2.5 flex items-center gap-1.5 ${
            isDark ? 'text-slate-200' : 'text-slate-700'
          }`}
        >
          <Gauge className={`w-4 h-4 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
          İdrar Elektrolit ve Su Atılımı Değişimleri
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {drug.electrolytes.map((el) => (
            <div
              key={el.symbol}
              className={`px-2.5 py-2 rounded-xl border text-xs flex flex-col justify-between ${getBadgeStyle(
                el.direction
              )}`}
            >
              <div className="font-extrabold text-[11.5px] leading-tight">
                {el.fullName} ({el.symbol})
              </div>
              <div className="font-extrabold text-xs mt-1">{el.label}</div>
              {el.note && (
                <div className="text-[10px] opacity-85 mt-0.5 leading-tight">{el.note}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3 SÜTUNLU KLİNİK DETAYLAR */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 1. Hedef Molekül ve Asit-Baz Etkisi */}
        <div
          className={`p-4 rounded-xl border space-y-3 ${
            isDark
              ? 'bg-slate-950/60 border-slate-800'
              : 'bg-slate-50 border-slate-200/80'
          }`}
        >
          <div>
            <div
              className={`text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Moleküler Hedef
            </div>
            <p
              className={`text-xs font-bold leading-relaxed ${
                isDark ? 'text-slate-100' : 'text-slate-800'
              }`}
            >
              {drug.molecularTarget}
            </p>
          </div>
          <div className={`pt-2.5 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div
              className={`text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Asit-Baz Dengesi Etkisi
            </div>
            <p
              className={`text-xs font-semibold leading-relaxed ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              {drug.acidBaseEffect}
            </p>
          </div>
          <div className={`pt-2.5 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div
              className={`text-[11px] font-extrabold uppercase tracking-wider mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Fraksiyonel Sodyum Atılımı (FENa)
            </div>
            <p className={`text-xs font-bold ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
              {drug.feNaPercent}
            </p>
          </div>
        </div>

        {/* 2. Klinik Endikasyonlar */}
        <div
          className={`p-4 rounded-xl border ${
            isDark
              ? 'bg-emerald-950/25 border-emerald-800/60'
              : 'bg-emerald-50/40 border-emerald-200/70'
          }`}
        >
          <div
            className={`flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide mb-2.5 ${
              isDark ? 'text-emerald-300' : 'text-emerald-800'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            Klinik Kullanım Alanları (Endikasyonlar)
          </div>
          <ul className="space-y-2">
            {drug.clinicalUses.map((use, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2 text-xs leading-relaxed ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Önemli Yan Etkiler */}
        <div
          className={`p-4 rounded-xl border ${
            isDark
              ? 'bg-rose-950/25 border-rose-800/60'
              : 'bg-rose-50/40 border-rose-200/70'
          }`}
        >
          <div
            className={`flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide mb-2.5 ${
              isDark ? 'text-rose-300' : 'text-rose-800'
            }`}
          >
            <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
            Önemli Yan Etkiler ve Klinik Uyarılar
          </div>
          <ul className="space-y-2">
            {drug.sideEffects.map((eff, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-2 text-xs leading-relaxed ${
                  isDark ? 'text-slate-200' : 'text-slate-700'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <span>{eff}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

ClinicalSummaryPanel.displayName = 'ClinicalSummaryPanel';

// ============================================================================
// ANA İNTERAKTİF ANİMASYON BİLEŞENİ (NephronDiureticsAnimator)
// ============================================================================

export interface NephronDiureticsAnimatorProps {
  isDark: boolean;
  selectedDiuretic: DiureticId;
  onSelectDiuretic: (id: DiureticId) => void;
}

export const NephronDiureticsAnimator: React.FC<NephronDiureticsAnimatorProps> = ({
  isDark,
  selectedDiuretic,
  onSelectDiuretic,
}) => {
  const [isDrugActive, setIsDrugActive] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<SpeedMultiplier>(1);
  const [animTime, setAnimTime] = useState<number>(0);

  const lastFrameRef = useRef<number | null>(null);
  const speedRef = useRef<SpeedMultiplier>(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  // Önceki / Sonraki Diüretik Grubu Geçiş Fonksiyonları (Senkronize)
  const handlePrevDiuretic = useCallback(() => {
    const idx = DIURETIC_ORDER.indexOf(selectedDiuretic);
    const prevId = DIURETIC_ORDER[(idx - 1 + DIURETIC_ORDER.length) % DIURETIC_ORDER.length];
    onSelectDiuretic(prevId);
  }, [selectedDiuretic, onSelectDiuretic]);

  const handleNextDiuretic = useCallback(() => {
    const idx = DIURETIC_ORDER.indexOf(selectedDiuretic);
    const nextId = DIURETIC_ORDER[(idx + 1) % DIURETIC_ORDER.length];
    onSelectDiuretic(nextId);
  }, [selectedDiuretic, onSelectDiuretic]);

  const handleTogglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  // Klavye Sol / Sağ Ok Tuşlarıyla Diüretik Grubu Değiştirme
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevDiuretic();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextDiuretic();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handlePrevDiuretic, handleNextDiuretic]);

  // 60 FPS Senkronize Animasyon Döngüsü (requestAnimationFrame)
  useEffect(() => {
    if (!isPlaying) {
      lastFrameRef.current = null;
      return;
    }

    let frameId: number;
    const tick = (now: number) => {
      try {
        if (lastFrameRef.current !== null) {
          const dt = Math.min((now - lastFrameRef.current) / 1000, 0.08);
          setAnimTime((prev) => prev + dt * speedRef.current);
        }
        lastFrameRef.current = now;
        frameId = requestAnimationFrame(tick);
      } catch {
        // Beklenmedik kare hatasında güvenli çıkış
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  // Nefron segmentine tıklandığında ilgili diüretiği seçme
  const handleSelectSegment = useCallback(
    (segment: NephronSegmentId) => {
      switch (segment) {
        case 'pct':
          onSelectDiuretic(selectedDiuretic === 'cai' ? 'osmotic' : 'cai');
          break;
        case 'thin_descending':
          onSelectDiuretic('osmotic');
          break;
        case 'tal':
          onSelectDiuretic('loop');
          break;
        case 'dct':
          onSelectDiuretic('thiazide');
          break;
        case 'collecting_duct':
          onSelectDiuretic(selectedDiuretic === 'ksparing' ? 'vaptan' : 'ksparing');
          break;
        default:
          onSelectDiuretic('cai');
      }
    },
    [selectedDiuretic, onSelectDiuretic]
  );

  const currentDrug = DIURETICS[selectedDiuretic];

  return (
    <div className="space-y-4">
      {/* İKİ SENKRONİZE ANİMASYON PANELİ (Kontroller ve < > Diüretik Seçici Doğrudan Her İki Panelin Başında) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
        <div className="xl:col-span-7 flex flex-col">
          <MacroNephronPanel
            isDark={isDark}
            selectedDiuretic={selectedDiuretic}
            onPrevDiuretic={handlePrevDiuretic}
            onNextDiuretic={handleNextDiuretic}
            isDrugActive={isDrugActive}
            onToggleDrugActive={setIsDrugActive}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            speed={speed}
            onChangeSpeed={setSpeed}
            time={animTime}
            onSelectSegment={handleSelectSegment}
          />
        </div>
        <div className="xl:col-span-5 flex flex-col">
          <CellularMechanismPanel
            isDark={isDark}
            selectedDiuretic={selectedDiuretic}
            onPrevDiuretic={handlePrevDiuretic}
            onNextDiuretic={handleNextDiuretic}
            isDrugActive={isDrugActive}
            onToggleDrugActive={setIsDrugActive}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            speed={speed}
            onChangeSpeed={setSpeed}
            time={animTime}
          />
        </div>
      </div>

      {/* ANİMASYONLARIN ALTINDA 1: İYONLAR, TAŞIYICILAR VE KISALTMALAR TABLOSU (Uzun Halleriyle) */}
      <IonsAbbreviationsTable selectedDiuretic={selectedDiuretic} isDark={isDark} />

      {/* ANİMASYONLARIN ALTINDA 2: İDRAR ELEKTROLİT DEĞİŞİMLERİ VE KLİNİK ÖZET */}
      <ClinicalSummaryPanel drug={currentDrug} isDark={isDark} />
    </div>
  );
};
