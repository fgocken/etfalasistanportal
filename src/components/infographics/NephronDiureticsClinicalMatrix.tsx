import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Droplets,
  ExternalLink,
  Flame,
  GitBranch,
  HeartPulse,
  LayoutGrid,
  Layers,
  Play,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Syringe,
  Table2,
  Wind,
  XCircle,
  Zap,
} from 'lucide-react';
import { DIURETICS, DIURETIC_THEME, type DiureticId } from './NephronDiureticsAnimator';

export interface NephronDiureticsClinicalMatrixProps {
  isDark: boolean;
  view: 'matrix' | 'guidelines';
  selectedDiuretic: DiureticId;
  onSelectDiuretic: (id: DiureticId) => void;
  onJumpToAnimation?: (id: DiureticId) => void;
}

// ============================================================================
// BİRLEŞİK DİÜRETİK RENK TEMASI (NephronDiureticsAnimator::DIURETIC_THEME tabanlı)
// cai: cyan · osmotic: teal · loop: rose · thiazide: green · ksparing: violet · vaptan: blue
// ============================================================================

const DIURETIC_META_LABELS: Record<DiureticId, { shortLabel: string; segmentShort: string }> = {
  cai: { shortLabel: 'KA İnh. (Asetazolamid)', segmentShort: 'PCT' },
  osmotic: { shortLabel: 'Ozmotik (Mannitol)', segmentShort: 'PCT + Henle' },
  loop: { shortLabel: 'Loop (Furosemid)', segmentShort: 'TAL' },
  thiazide: { shortLabel: 'Tiyazid (HCTZ / Metolazon)', segmentShort: 'DCT' },
  ksparing: { shortLabel: 'K⁺-Tutucu (Spironolakton)', segmentShort: 'CD' },
  vaptan: { shortLabel: 'Vaptan (Tolvaptan)', segmentShort: 'CD · AQP2' },
};

const getDiureticStyles = (id: DiureticId, isDark: boolean) => {
  const theme = DIURETIC_THEME[id];
  const meta = DIURETIC_META_LABELS[id];
  const accentHex = isDark ? theme.darkHex : theme.hex;
  return {
    ...theme,
    ...meta,
    accentHex,
    badge: `${theme.softBg} ${theme.border} ${theme.text}`,
    ctaBtn: `${theme.pillBg} hover:opacity-90`,
    activePill: `${theme.softBg} ${theme.border} ${isDark ? 'text-white' : 'text-slate-950'}`,
    ruleBox: `${theme.softBg} ${theme.border} ${isDark ? 'text-slate-100' : 'text-slate-900'}`,
    segmentCard: `${theme.softBg} ${theme.border}`,
  };
};

// ============================================================================
// BÖLÜM A: 7 KLİNİK SENARYO KARAR MATRİSİ (Hakem Revizyonlu Kanıta Dayalı Veri)
// ============================================================================

interface BulletPoint {
  lead: string;
  text: string;
}

interface ClinicalScenario {
  id: string;
  shortTitle: string;
  title: string;
  domain: string;
  primaryDiureticId: DiureticId;
  secondaryDiureticIds?: DiureticId[];
  icon: 'heart' | 'layers' | 'brain' | 'droplets' | 'wind' | 'activity' | 'stethoscope';
  kpi: {
    firstLine: string;
    criticalThreshold: string;
    monitoring: string;
    hardAvoid: string;
  };
  ruleLabel: string;
  ruleText: string;
  blocks: {
    firstLineTitle: string;
    firstLineBullets: BulletPoint[];
    secondLineTitle: string;
    secondLineBullets: BulletPoint[];
    monitoringTitle: string;
    monitoringBullets: BulletPoint[];
    avoidTitle: string;
    avoidBullets: BulletPoint[];
  };
  evidenceBadges: string[];
}

const CLINICAL_SCENARIOS: ClinicalScenario[] = [
  {
    id: 'adhf',
    shortTitle: 'ADKY & Pulmoner Ödem',
    title: 'Akut Dekompanse Kalp Yetmezliği (ADKY) & Akut Pulmoner Ödem',
    domain: 'Kardiyoloji · YBÜ',
    primaryDiureticId: 'loop',
    secondaryDiureticIds: ['cai', 'thiazide'],
    icon: 'heart',
    kpi: {
      firstLine: 'IV Furosemid (naif 20–40 mg · kronik 1–2,5× oral) + SGLT2i',
      criticalThreshold: '2. sa idrar Na⁺ <50–70 mEq/L veya 6. sa <100–150 mL/sa → 2× doz',
      monitoring: '2. sa spot Na⁺ · saatlik diürez · 12 sa K⁺/Mg²⁺/Kr',
      hardAvoid: 'Mannitol (akut pulmoner ödemi ölümcül ağırlaştırır)',
    },
    ruleLabel: 'ESC HFA 2019 Erken Yanıt & ESC 2023 Sınıf I Kuralı',
    ruleText:
      'İlk IV loop dozundan 2 saat sonra spot idrar Na⁺ <50–70 mEq/L veya 6. saatte <100–150 mL/sa ise gecikmeden dozu 2× artırın; stabilizasyonla hastane içi SGLT2i (EMPULSE) ekleyin.',
    blocks: {
      firstLineTitle: '1. Basamak Strateji (DOSE / ESC 2021–2023)',
      firstLineBullets: [
        {
          lead: 'IV Loop Dozu:',
          text: 'Diüretik-naif hastada 20–40 mg IV; kronik oral loop kullanıcıda oral günlük dozun 1–2,5× katı IV bolus veya infüzyon.',
        },
        {
          lead: 'ESC 2023 Sınıf I — SGLT2i:',
          text: 'EMPULSE kanıtıyla erken hastane içi SGLT2i (Empagliflozin/Dapagliflozin) başlanması dekonjesyon ve klinik faydayı artırır.',
        },
      ],
      secondLineTitle: '2. Basamak (Direnç / Yetersiz Dekonjesyon)',
      secondLineBullets: [
        {
          lead: 'PCT Blokajı (ADVOR):',
          text: 'IV Asetazolamid 500 mg/gün × 3 gün (başarılı dekonjesyon RR 1,46). Not: ADVOR çalışması SGLT2i kullanıcılarını dışlamıştır!',
        },
        {
          lead: 'DCT Blokajı (CLOROTIC):',
          text: 'Loop direnci sürerse eGFR tabakalı HCTZ veya Metolazon ile ardışık nefron blokajı ekleyin.',
        },
      ],
      monitoringTitle: 'Kritik İzlem',
      monitoringBullets: [
        {
          lead: 'Natriürez & Volüm:',
          text: '2. saat spot idrar Na⁺ (>50–70 mEq/L), 6. saat diürez (>100–150 mL/sa), net sıvı dengesi ve akciğer USG B-çizgileri.',
        },
        {
          lead: 'Elektrolit / Renal:',
          text: '12 saatlik K⁺, Mg²⁺ ve kreatinin; hafif geçici kreatinin artışı dekonjesyon varsa tek başına diüretiği kesme nedeni değildir.',
        },
      ],
      avoidTitle: 'Kesin Yasak & Tuzaklar',
      avoidBullets: [
        {
          lead: 'Mannitol:',
          text: 'Akut intravasküler hacim genişlemesi ile LV dolum basıncını ve akciğer ödemini ölümcül biçimde kötüleştirir.',
        },
        {
          lead: 'NSAİİ / Geç Titrasyon:',
          text: 'NSAİİ afferent PGE₂ blokajı ile diüretik direncini tetikler; 2. saat Na⁺ kontrolünü atlamak dekonjesyonu geciktirir.',
        },
      ],
    },
    evidenceBadges: ['ESC 2021 / 2023', 'ESC HFA 2019', 'DOSE', 'EMPULSE', 'ADVOR', 'CLOROTIC'],
  },
  {
    id: 'resistance',
    shortTitle: 'Diüretik Direnci & KRS',
    title: 'Diüretik Direnci & Kardiyorenal Sendrom (Ardışık Blokaj)',
    domain: 'Kardiyorenal · YBÜ',
    primaryDiureticId: 'thiazide',
    secondaryDiureticIds: ['loop', 'cai'],
    icon: 'layers',
    kpi: {
      firstLine: 'IV Bolus + Furosemid infüzyon (5–20 mg/sa) + HCTZ / Metolazon',
      criticalThreshold: 'CLOROTIC HCTZ: eGFR >50→25 · 20–50→50 · <20→100 mg',
      monitoring: '12 sa K⁺/Mg²⁺/Na⁺/Kr (böbrek boz. %46,5 · hipoK %40,6)',
      hardAvoid: 'Yükleme bolussuz infüzyon · İzlemsiz yüksek doz tiyazid · NSAİİ',
    },
    ruleLabel: 'Nefron Adaptasyonu & CLOROTIC eGFR Tabakalaması',
    ruleText:
      'Sürekli furosemid infüzyonu öncesi IV yükleme bolusu şarttır. Kronik loop maruziyeti DCT hipertrofisi (NCC upregülasyonu) yapar; distal blokajla kırılır ancak elektrolit/renal maliyeti yüksektir.',
    blocks: {
      firstLineTitle: '1. Basamak: Loop Optimizasyonu',
      firstLineBullets: [
        {
          lead: 'Yükleme Bolusu Şart:',
          text: 'Sürekli furosemid infüzyonu (5–20 mg/sa) başlatılmadan önce mutlaka IV yükleme bolusu verin (tübüler eşiğe hızla ulaşım).',
        },
        {
          lead: 'Zamanlama Püf Noktası:',
          text: 'Oral tiyazid / metolazon, IV loop dozundan 30–60 dakika önce uygulanmalıdır.',
        },
      ],
      secondLineTitle: '2. Basamak: Ardışık Blokaj Seçenekleri',
      secondLineBullets: [
        {
          lead: 'CLOROTIC eGFR Tabakalı HCTZ:',
          text: 'eGFR >50 → 25 mg · eGFR 20–50 → 50 mg · eGFR <20 → 100 mg PO (72 sa kilo kaybı ↑, dispne farksız).',
        },
        {
          lead: 'eGFR <30 & PCT Alternatifi:',
          text: 'eGFR <30’da Metolazon 2,5–5 mg veya Klortalidon (loop’tan 30–60 dk önce) VEYA ADVOR protokolü (Asetazolamid 500 mg IV × 3 gün).',
        },
      ],
      monitoringTitle: 'Kritik Elektrolit & Renal Maliyet (CLOROTIC)',
      monitoringBullets: [
        {
          lead: 'CLOROTIC Güvenlik Verisi:',
          text: 'Böbrek fonksiyon bozulması %46,5 vs %17,2 ve hipokalemi %40,6 vs %16,1 oranında anlamlı yüksektir.',
        },
        {
          lead: 'Yoğun Takip:',
          text: '12 saatte bir K⁺, Mg²⁺, Na⁺, kreatinin; proaktif K⁺/Mg²⁺ replasmanı ve intravasküler deplesyon kontrolü.',
        },
      ],
      avoidTitle: 'Kesin Yasak & Tuzaklar',
      avoidBullets: [
        {
          lead: 'İzlemsiz Yüksek Doz Tiyazid:',
          text: 'Saatler içinde derin hipokalemi, hiponatremi ve prerenal ABH geliştirebilir.',
        },
        {
          lead: 'NSAİİ & Hipoperfüzyon:',
          text: 'NSAİİ, hipoalbüminemi ve düşük renal perfüzyon basıncını (MAP <65) düzeltmeden doz artırmak yanıtsızlık yaratır.',
        },
      ],
    },
    evidenceBadges: ['CLOROTIC 2023', 'ADVOR 2022', 'DOSE 2011', 'ESC HFA 2019'],
  },
  {
    id: 'icp',
    shortTitle: 'KİBAS & Beyin Ödemi',
    title: 'KİBAS & Akut Beyin Ödemi (Nöroanestezi / Nöro-YBÜ)',
    domain: 'Nöroanestezi · Nöro-YBÜ',
    primaryDiureticId: 'osmotic',
    icon: 'brain',
    kpi: {
      firstLine: 'Mannitol %20 (0,25–1 g/kg, inline filtre) veya HTS (%3 / %23,4)',
      criticalThreshold: 'Osmolar gap <20 mOsm/kg · Serum osmolarite <320',
      monitoring: 'Osmolar gap · Na⁺ · Akut geçici hiperkalemi (solvent drag)',
      hardAvoid: 'Anürik ABH · Dekompanse KKY · Hipotonik sıvılar',
    },
    ruleLabel: 'NCS 2020 Osmoterapi & Damar Yolu Kuralı',
    ruleText:
      'Hipotansif, travmatik beyin hasarlı (TBI) veya intraserebral kanamalı (İKH) hastada Hipertonik Salin (HTS) Mannitol’e tercih edilir. %3 HTS acilde geniş periferik damar yolundan verilebilir; %23,4 için santral yol şarttır.',
    blocks: {
      firstLineTitle: '1. Basamak Osmoterapi (NCS 2020)',
      firstLineBullets: [
        {
          lead: 'Mannitol %20:',
          text: '0,25–1 g/kg IV (15–20 dk infüzyon). Kristal çökelme riski nedeniyle inline filtre zorunludur.',
        },
        {
          lead: 'Hipertonik Salin (HTS):',
          text: '%3 HTS acilde geniş periferik damar yolundan verilebilir; %23,4 HTS santral venöz yol şartı taşır. Hipotansif/TBI/İKH’de HTS önceliklidir.',
        },
      ],
      secondLineTitle: 'Hemodinami & Övolemi Koruması',
      secondLineBullets: [
        {
          lead: 'Serebral Perfüzyon (CPP):',
          text: 'Mannitol sonrası yoğun ozmotik diürez hipotansiyona yol açabilir; idrar kaybını izotonik SF ile karşılayarak övolemiyi koruyun.',
        },
        {
          lead: 'Rebound Ödem Önleme:',
          text: 'Hasarlı kan-beyin bariyerine mannitol sızmasını önlemek için osmolar gap sınırına sıkı uyun.',
        },
      ],
      monitoringTitle: 'Güvenlik Sınırları & Elektrolit İzlemi',
      monitoringBullets: [
        {
          lead: 'Osmolarite Sınırları:',
          text: 'Osmolar gap <20 mOsm/kg ve serum osmolarite <320 mOsm/kg (ABH ve ozmotik nefroz koruması).',
        },
        {
          lead: 'Solvent Drag Hiperkalemi:',
          text: 'Hızlı Mannitol infüzyonu sonrası hücre dışına K⁺ sürüklenmesine bağlı akut geçici hiperkalemi gelişebilir — EKG/K⁺ izleyin!',
        },
      ],
      avoidTitle: 'Kesin Yasak & Tuzaklar',
      avoidBullets: [
        {
          lead: 'Anürik ABH & KKY:',
          text: 'Mannitol atılamaz → akut intravasküler hacim yüklenmesi, pulmoner ödem ve ozmotik nefroz.',
        },
        {
          lead: 'Hipotonik Sıvılar:',
          text: 'Serbest su beyin parankimine geçerek KİBAS ve herniasyonu hızla ağırlaştırır.',
        },
      ],
    },
    evidenceBadges: ['NCS 2020 Kılavuzu'],
  },
  {
    id: 'cirrhosis',
    shortTitle: 'Siroz & Asit Yönetimi',
    title: 'Karaciğer Sirozu & Asit Yönetimi (EASL 2018)',
    domain: 'Hepatoloji · Perioperatif',
    primaryDiureticId: 'ksparing',
    secondaryDiureticIds: ['loop'],
    icon: 'droplets',
    kpi: {
      firstLine: 'İlk Evre 2: Spironolakton mono · Tekrarlayan/Evre 3: 100:40 kombine',
      criticalThreshold: 'Kilo: ödemsiz ≤0,5 · ödemli ≤1 kg/gün · Na⁺ <125 / K⁺ >6 kes',
      monitoring: 'Günlük tartı · Na⁺/K⁺/Kr · HE taraması · >5 L LVP’de 8 g/L albümin',
      hardAvoid: 'Asetazolamid (HE!) · NSAİİ · Tolvaptan (kesin kontrendike!)',
    },
    ruleLabel: 'EASL 2018 Kesin Ayrımı: İlk Evre 2 vs Tekrarlayan / Evre 3 Asit',
    ruleText:
      'İlk kez gelişen Evre 2 (orta) asitte Spironolakton monoterapisi (100→400 mg/gün); tekrarlayan / uzun süreli veya Evre 3 asitte Spironolakton 100 mg + Furosemid 40 mg (100:40 oranı, maks 400:160) başlanır.',
    blocks: {
      firstLineTitle: '1. Basamak (EASL 2018 Evre Ayrımı)',
      firstLineBullets: [
        {
          lead: 'İlk Evre 2 (Orta) Asit:',
          text: 'Spironolakton monoterapisi 100 mg/gün ile başla; yanıta göre kademeli olarak maks 400 mg/gün’e çık.',
        },
        {
          lead: 'Tekrarlayan / Evre 3 Asit:',
          text: 'Spironolakton 100 mg + Furosemid 40 mg (100:40 oranı); 3–5 günde bir aynı oranla maks 400:160 mg/gün’e titre et.',
        },
      ],
      secondLineTitle: 'Evre 3 Gergin Asit & Albümin Kuralı',
      secondLineBullets: [
        {
          lead: 'Büyük Hacimli Parasentez (LVP):',
          text: 'Evre 3 gergin asitte ilk adım LVP’dir; ardından tekrar birikimi önlemek için 100:40 diüretik kombinasyonu uygulanır.',
        },
        {
          lead: 'IV Albümin Koruması:',
          text: '>5 L asit çekildiğinde parasentez sonrası dolaşım disfonksiyonunu önlemek için litre başına 8 g IV albümin verilir.',
        },
      ],
      monitoringTitle: 'Kilo Hedefi & Kesme Kriterleri',
      monitoringBullets: [
        {
          lead: 'Günlük Kilo Kaybı Hedefi:',
          text: 'Periferik ödem yoksa ≤0,5 kg/gün, periferik ödem varsa ≤1 kg/gün (HRS koruması).',
        },
        {
          lead: 'Derhal Kesme Sınırları:',
          text: 'Serum Na⁺ <125 mEq/L, K⁺ >6 mEq/L, hepatik ensefalopati (HE) veya akut böbrek hasarı (ABH) gelişiminde kes.',
        },
      ],
      avoidTitle: 'Kesin Yasak (Ölümcül Tuzaklar)',
      avoidBullets: [
        {
          lead: 'Asetazolamid (HE Tetikleyici!):',
          text: 'İdrarı alkalileştirerek NH₄⁺ atılımını azaltır, amonyağı dolaşıma geri döndürüp hepatik ensefalopatiyi tetikler.',
        },
        {
          lead: 'Tolvaptan & NSAİİ:',
          text: 'Tolvaptan sirozda KESİN KONTRENDİKE (FDA Kara Kutu hepatotoksisite); NSAİİ prostaglandin blokajıyla HRS/ABH yapar.',
        },
      ],
    },
    evidenceBadges: ['EASL 2018 Kılavuzu', 'FDA Kara Kutu'],
  },
  {
    id: 'alkalosis',
    shortTitle: 'Metabolik Alkaloz (YBÜ)',
    title: 'YBÜ / Post-Diüretik Metabolik Alkalozu',
    domain: 'YBÜ Asit-Baz · Ventilasyon',
    primaryDiureticId: 'cai',
    icon: 'wind',
    kpi: {
      firstLine: 'Önce Cl⁻ (SF) + K⁺ (KCl) → sürerse Asetazolamid 250–500 mg q12–24h',
      criticalThreshold: 'Hacim yükü + pH >7,48 + HCO₃⁻ >32 mEq/L (1–3 gün)',
      monitoring: 'AKG (pH, HCO₃⁻, PaCO₂) · seri K⁺ · solunum mekaniği',
      hardAvoid: 'Siroz/HE · Düzeltilmemiş hipoK · Solunum kas yorgunluğu!',
    },
    ruleLabel: 'DIABOLO (JAMA 2016) Uyarısı & Önce Klorür/Potasyum Kuralı',
    ruleText:
      'Önce Cl⁻ (SF) ve K⁺ (KCl) açığını kapatın. DIABOLO çalışmasında Asetazolamid KOAH’ta HCO₃⁻’ü düşürmüş ancak invaziv MV süresini kısaltmamıştır (p=0,17); solunum kas yorgunluğunda hiperkapni kötüleşebilir!',
    blocks: {
      firstLineTitle: '1. Basamak: Eksik Elektrolit Düzeltmesi',
      firstLineBullets: [
        {
          lead: 'Klorür & Potasyum:',
          text: 'Kontraksiyon alkalozunun temel tedavisi izotonik SF (Cl⁻) ve KCl (K⁺) replasmanıdır; volüm açığı varsa asetazolamid verilmez.',
        },
        {
          lead: 'Asetazolamid Endikasyonu:',
          text: 'Hacim yükü devam ediyor + pH >7,48 + HCO₃⁻ >32 mEq/L sürüyorsa Asetazolamid 250–500 mg IV/PO q12–24h × 1–3 gün.',
        },
      ],
      secondLineTitle: 'DIABOLO (JAMA 2016) Kanıt Nüansı',
      secondLineBullets: [
        {
          lead: 'Weaning Sonucu (p=0,17):',
          text: 'KOAH hastalarında serum HCO₃⁻’ü hızla düşürür ama invaziv mekanik ventilasyon (MV) süresini anlamlı kısaltmamıştır.',
        },
        {
          lead: 'Hiperkapni Riski:',
          text: 'Alkalozu kırarak solunum dürtüsünü uyarır; ancak solunum kas yorgunluğu olan hastada kompansasyon sağlanamazsa PaCO₂ ve asidoz kötüleşir!',
        },
      ],
      monitoringTitle: 'Kritik İzlem',
      monitoringBullets: [
        {
          lead: 'Kan Gazı & Ventilasyon:',
          text: 'Seri AKG (pH, HCO₃⁻, PaCO₂), dakika ventilasyonu ve solunum iş yükü izlemi.',
        },
        {
          lead: 'Potasyum Düşüşü:',
          text: 'Distale ulaşan Na⁺ ve HCO₃⁻ yükü K⁺ sekresyonunu artırır → hipokalemi derinleşebilir.',
        },
      ],
      avoidTitle: 'Kesin Yasak & Dikkat Edilecekler',
      avoidBullets: [
        {
          lead: 'Siroz & Hepatik Ensefalopati:',
          text: 'İdrar alkalileşmesi NH₃ atılımını engeller → kesin kontrendikedir.',
        },
        {
          lead: 'Ağır HipoK / Kas Yorgunluğu:',
          text: 'Hipokalemi düzeltilmeden veya solunum pompası yorgun ağır hiperkapnik hastada rutin kullanılmamalıdır.',
        },
      ],
    },
    evidenceBadges: ['DIABOLO (JAMA 2016)', 'YBÜ Asit-Baz'],
  },
  {
    id: 'siadh',
    shortTitle: 'SIADH & Hiponatremi',
    title: 'SIADH & Hipervolemik Hiponatremi (Serbest Su Fazlalığı)',
    domain: 'Sıvı-Elektrolit · YBÜ',
    primaryDiureticId: 'vaptan',
    secondaryDiureticIds: ['loop'],
    icon: 'activity',
    kpi: {
      firstLine: 'Ağır semptom: %3 HTS 150 mL IV · Refrakter: ESICM vs ABD ayrımı',
      criticalThreshold: 'ODS Sınırı: İlk 24 sa ≤8–10 (yüksek risk ≤6–8) · sonra ≤8/24 sa',
      monitoring: '4–6 sa Na⁺ · saatlik diürez · aşım riskinde %5 Dekstroz + DDAVP',
      hardAvoid: 'Sirozda Tolvaptan (FDA Kara Kutu) · Hipovolemi · Tiyazid',
    },
    ruleLabel: 'Kılavuz Ayrımı (ESICM 2014 vs ABD 2013) & Sert ODS Sınırı',
    ruleText:
      'Avrupa (ESICM 2014) vaptanları önermez; ABD Paneli (Verbalis 2013) seçilmiş refrakter SIADH/KKY’de hastane içi Tolvaptan 15 mg PO’ya izin verir. FDA Kara Kutu: maks 30 gün, sirozda KESİN KONTRENDİKE!',
    blocks: {
      firstLineTitle: '1. Basamak: Semptoma Göre & Kılavuz Ayrımı',
      firstLineBullets: [
        {
          lead: 'Akut Ağır Semptomatik (Nöbet/Koma):',
          text: 'Derhal %3 HTS 150 mL IV (20 dk) — amaç akut 4–6 mmol/L artışla herniasyonu durdurmaktır.',
        },
        {
          lead: 'Avrupa vs ABD Kılavuz Ayrımı:',
          text: 'ESICM 2014 vaptanları önermez (sıvı kısıtlaması + oral üre/tuz + düşük doz loop). ABD Paneli (Verbalis 2013) seçilmiş refrakter SIADH/KKY’de Tolvaptan 15 mg PO’ya izin verir.',
        },
      ],
      secondLineTitle: 'Tolvaptan Güvenlik & Acil Frenleme',
      secondLineBullets: [
        {
          lead: 'Başlama Kuralları & FDA Kara Kutu:',
          text: 'Yalnızca hastanede başlanır ve sıvı kısıtlaması kaldırılır (susama yanıtı korunur). Maksimum 30 gün kullanım; sirozda KESİN KONTRENDİKE!',
        },
        {
          lead: 'Aşırı Hızlı Yükselişte Fren:',
          text: 'ΔNa⁺ hedefi aşma eğilimindeyse derhal %5 Dekstroz infüzyonu + DDAVP (Desmopressin) uygulayın.',
        },
      ],
      monitoringTitle: 'ODS Sınırları & Yüksek Risk Profili',
      monitoringBullets: [
        {
          lead: 'Sert ΔNa⁺ Limitleri:',
          text: 'İlk 24 sa ≤8–10 mmol/L (yüksek riskte ≤6–8 mmol/L); sonraki her 24 saatte ≤8 mmol/L.',
        },
        {
          lead: 'Yüksek ODS Riski & Sık İzlem:',
          text: 'Alkolizm, malnütrisyon, siroz, hipokalemi, başlangıç Na⁺ ≤105 mEq/L. İlk 24 sa 4–6 saatte bir serum Na⁺ + saatlik idrar çıkışı.',
        },
      ],
      avoidTitle: 'Kesin Yasak & Tuzaklar',
      avoidBullets: [
        {
          lead: 'Sirozda Tolvaptan & Hipovolemi:',
          text: 'Sirozda fulminan hepatotoksisite (FDA Kara Kutu); hipovolemik hiponatremide vaptan şok ve ABH tetikler.',
        },
        {
          lead: 'Tiyazid Diüretikler:',
          text: 'Dilüsyon segmentini (DCT) bloke ederek serbest su klirensini bozar ve hiponatremiyi derinleştirir.',
        },
      ],
    },
    evidenceBadges: ['ESICM 2014', 'Verbalis 2013', 'FDA Kara Kutu'],
  },
  {
    id: 'aki',
    shortTitle: 'ABH & Oligüri (FST)',
    title: 'ABH & Oligüri Yönetimi / Furosemid Stres Testi (FST)',
    domain: 'Nefroloji · Perioperatif YBÜ',
    primaryDiureticId: 'loop',
    icon: 'stethoscope',
    kpi: {
      firstLine: 'Yalnızca hacim yükü yönetimi · FST: 1,0 (naif) / 1,5 mg/kg (maruz)',
      criticalThreshold: 'FST 2 sa <200 mL = Evre 3 ABH / RRT güçlü öngörücüsü',
      monitoring: 'Övolemik FST’de 6 sa 1:1 izotonik replasman · K⁺ · asit-baz · RRT',
      hardAvoid: 'ABH önleme/tedavi amaçlı rutin diüretik · Hipovolemide Loop/Mannitol',
    },
    ruleLabel: 'KDIGO 2012 Altın Kuralı',
    ruleText:
      'Diüretikler ABH’yi ÖNLEMEZ ve TEDAVİ ETMEZ! Yalnızca klinik hacim yükü yönetimi ve erken evre ABH’de prognostik Furosemid Stres Testi (FST) için kullanılır.',
    blocks: {
      firstLineTitle: '1. Basamak: Doğru Endikasyon (KDIGO 2012)',
      firstLineBullets: [
        {
          lead: 'Sadece Hacim Yükü:',
          text: 'Pulmoner konjesyon veya belirgin sıvı fazlalığı varsa uygulanır; oligürik ABH’yi zorla non-oligürik yapmak mortaliteyi azaltmaz.',
        },
        {
          lead: 'Ön Değerlendirme:',
          text: 'Diüretik öncesi volüm durumu, MAP ≥65 mmHg renal perfüzyon ve postrenal obstrüksiyon (mesane USG) mutlaka doğrulanır.',
        },
      ],
      secondLineTitle: 'Furosemid Stres Testi (FST — Chawla 2013)',
      secondLineBullets: [
        {
          lead: 'Doz & Eşik:',
          text: 'Diüretik-naif 1,0 mg/kg IV, son 7 günde loop maruziyeti varsa 1,5 mg/kg IV → 2 saatte <200 mL idrar çıkışı Evre 3 ABH ve RRT ihtiyacının güçlü öngörücüsüdür.',
        },
        {
          lead: 'Övolemi Replasman Kuralı:',
          text: 'Övolemik hastada hipovolemiyi önlemek için test sonrası 6 saat boyunca idrar çıkışına 1:1 izotonik kristaloid replasmanı yapılır.',
        },
      ],
      monitoringTitle: 'İzlem & Acil RRT Hazırlığı',
      monitoringBullets: [
        {
          lead: 'Saatlik Yanıt:',
          text: '2 saatlik FST idrar hacmi, net sıvı dengesi, serum K⁺, bikarbonat/pH ve üremi.',
        },
        {
          lead: 'Acil RRT Kriterleri:',
          text: 'Dirençli hiperkalemi, ağır metabolik asidoz, diüretiğe yanıtsız pulmoner ödem veya üremik komplikasyonlarda RRT geciktirilmez.',
        },
      ],
      avoidTitle: 'Kesin Yasak & Tuzaklar',
      avoidBullets: [
        {
          lead: 'Hipovolemik / Prerenal Oligüri:',
          text: 'Yüksek doz Furosemid veya Mannitol renal medüller iskemiyi ve akut tübüler nekrozu ağırlaştırır.',
        },
        {
          lead: 'Kontrast / Post-Op Profilaksi:',
          text: 'Kontrast nefropatisi veya cerrahi sonrası ABH profilaksisinde rutin loop/mannitol etkisiz ve zararlıdır.',
        },
      ],
    },
    evidenceBadges: ['KDIGO 2012 ABH', 'FST (Chawla 2013)'],
  },
];

// ============================================================================
// BÖLÜM B: 4 SEGMENTLİ ARDIŞIK NEFRON BLOKAJI · ESC HFA STEPPER · 5 KIRMIZI ALARM
// ============================================================================

interface NephronSynergySegment {
  stepNum: number;
  segmentCode: string;
  segmentName: string;
  diureticId: DiureticId;
  primaryDrug: string;
  primaryBadge: string;
  secondaryNote: string;
  mechanismTag: string;
}

const NEPHRON_SYNERGY_SEGMENTS: NephronSynergySegment[] = [
  {
    stepNum: 1,
    segmentCode: 'PCT',
    segmentName: 'Proksimal Tübül',
    diureticId: 'cai',
    primaryDrug: 'Asetazolamid',
    primaryBadge: 'ADVOR · 500 mg IV ×3g',
    secondaryNote: '+ SGLT2i (EMPULSE · NHE3 + TGF)',
    mechanismTag: 'Proksimal NaHCO₃ blokajı',
  },
  {
    stepNum: 2,
    segmentCode: 'TAL',
    segmentName: 'Henle Çıkan Kalın',
    diureticId: 'loop',
    primaryDrug: 'Loop Diüretik',
    primaryBadge: 'Ana Omurga · %20–25 FENa',
    secondaryNote: 'Furosemid IV (infüzyon öncesi bolus)',
    mechanismTag: 'NKCC2 güçlü natriürez',
  },
  {
    stepNum: 3,
    segmentCode: 'DCT',
    segmentName: 'Distal Kıvrımlı',
    diureticId: 'thiazide',
    primaryDrug: 'Tiyazid / Metolazon',
    primaryBadge: 'CLOROTIC · 30–60 dk önce',
    secondaryNote: 'eGFR tabakalı HCTZ / Metolazon',
    mechanismTag: 'NCC adaptasyon blokajı',
  },
  {
    stepNum: 4,
    segmentCode: 'CD',
    segmentName: 'Toplayıcı Kanal',
    diureticId: 'ksparing',
    primaryDrug: 'Spironolakton / MRA / ENaC',
    primaryBadge: 'EASL 100:40 · HFrEF mortalite',
    secondaryNote: 'K⁺/Mg²⁺ koruma · Sınıf I A',
    mechanismTag: 'Aldosteron / ENaC blokajı',
  },
];

interface HfaStep {
  step: number;
  label: string;
  title: string;
  threshold: string;
  action: string;
  quickDrugs: DiureticId[];
}

const ESC_HFA_STEPS: HfaStep[] = [
  {
    step: 1,
    label: 'Adım 1 · Başlangıç',
    title: 'IV Loop Başlat',
    threshold: 'Naif: 20–40 mg IV · Kronik: 1–2,5× oral',
    action:
      'İlk IV Furosemid bolusunu uygula (sürekli infüzyon planlanıyorsa önce yükleme bolusu şart). Stabilizasyonla SGLT2i (EMPULSE) eklemeyi planla.',
    quickDrugs: ['loop'],
  },
  {
    step: 2,
    label: 'Adım 2 · 2. & 6. Saat Kontrol',
    title: '2. Sa Spot İdrar Na⁺ <50–70 mEq/L veya 6. Sa <100–150 mL/sa?',
    threshold: 'Hedef: Na⁺ ≥50–70 mEq/L · Diürez ≥100–150 mL/sa',
    action:
      'Hedefin üzerindeyse mevcut IV loop dozuna 12 saatte bir devam et. Eşiğin altındaysa yetersiz natriürez vardır → gecikmeden Adım 3’e geç!',
    quickDrugs: ['loop'],
  },
  {
    step: 3,
    label: 'Adım 3 · Eskalasyon & Sinerji',
    title: 'Dozu 2× Artır → Dirençte PCT (ADVOR) veya DCT (CLOROTIC) Ekle',
    threshold: 'ADVOR: 500 mg IV ×3g · CLOROTIC: eGFR tabakalı HCTZ',
    action:
      'Loop dozunu 2× artır (maks tavan doza kadar). Direnç sürüyorsa PCT blokajı (Asetazolamid — SGLT2i dışlanmış) veya DCT blokajı (HCTZ / Metolazon loop’tan 30–60 dk önce) ekle.',
    quickDrugs: ['cai', 'thiazide'],
  },
];

interface DangerousInteraction {
  id: string;
  pair: string;
  riskTag: string;
  mechanism: string;
  action: string;
}

const DANGEROUS_INTERACTIONS: DangerousInteraction[] = [
  {
    id: 'otonephro',
    pair: 'Loop + Aminoglikozid / Sisplatin / Vankomisin',
    riskTag: 'Ototoksisite & Nefrotoksisite',
    mechanism: 'İç kulak stria vaskülariste NKCC1 blokajı + sinerjik tübüler hasar.',
    action: 'Hızlı bolustan kaçın (≤4 mg/dk infüzyon); ilaç düzeyi & kreatinin izle.',
  },
  {
    id: 'hyperkalemia',
    pair: 'K⁺-Tutucu + ACEi / ARB / ARNI / KCl / Trimetoprim / Heparin',
    riskTag: 'Ölümcül Hiperkalemi',
    mechanism: 'Aldosteron baskılanması (heparin dahil) + ENaC blokajı (TMP amilorid benzeri).',
    action: 'eGFR <30–45’te yüksek risk; KCl kes, seri K⁺ ve EKG takip et.',
  },
  {
    id: 'lithium',
    pair: 'Tiyazid / Loop + Lityum',
    riskTag: 'Lityum Toksisitesi',
    mechanism: 'Hacim deplesyonu proksimal Na⁺ ile paralel Li⁺ geri emilimini artırır.',
    action: 'Tiyazidlerle en şiddetli; Lityum dozunu azalt ve serum düzeyini sık ölç.',
  },
  {
    id: 'digoxin',
    pair: 'Loop / Tiyazid + Digoksin',
    riskTag: 'Ventriküler Aritmi',
    mechanism: 'K⁺ <4,0 mEq/L veya Mg²⁺ <2,0 mg/dL miyokardiyal Na⁺/K⁺-ATPaz bağlanmasını artırır.',
    action: 'K⁺ ≥4,0 ve Mg²⁺ ≥2,0 hedefle; bradiaritmi / ektopi monitörize et.',
  },
  {
    id: 'triple-whammy',
    pair: '"Triple Whammy" (ACEi/ARB + Diüretik + NSAİİ)',
    riskTag: 'Diüretik Direnci & ABH',
    mechanism: 'Afferent arteriyolde PGE₂ blokajı → GFR ve tübüler diüretik sekresyonu düşer.',
    action: 'KKY, KBH, siroz ve ACEi/ARB alanlarda perioperatif NSAİİ’den kesin kaçın.',
  },
];

// ============================================================================
// SEKME 3: ANESTEZİ İNCİLERİ & 13 DOĞRULANMIŞ KILAVUZ / RKÇ KAYNAĞI
// ============================================================================

interface AnesthesiaPearl {
  title: string;
  tag: string;
  detail: string;
  tone: 'rose' | 'amber' | 'teal' | 'sky';
}

const ANESTHESIA_PEARLS: AnesthesiaPearl[] = [
  {
    title: 'NMB & Süksinilkolin Güvenliği',
    tag: 'İndüksiyon · Elektrolit',
    detail:
      'Hipokalemi ve hipomagnezemi non-depolarizan NMB etkisini uzatır; K⁺-tutucular veya hızlı Mannitol (solvent drag) kaynaklı hiperkalemi süksinilkolin ile kardiyak arrest tetikleyebilir.',
    tone: 'rose',
  },
  {
    title: 'Ameliyat Sabahı Diüretik Kuralı',
    tag: 'Pre-Op İlaç Yönetimi',
    detail:
      'Hipertansiyon amaçlı kullanılan loop ve tiyazid diüretikler indüksiyon hipotansiyonu riski nedeniyle ameliyat sabahı genelde ertelenir (aktif KKY / belirgin hacim yükü hariç).',
    tone: 'amber',
  },
  {
    title: 'Sülfonamid Çapraz Reaktivite Miti',
    tag: 'İlaç Alerjisi',
    detail:
      'Antibiyotik sülfonamid (TMP-SMX) alerjisi ile furosemid, tiyazid veya asetazolamid arasında anlamlı çapraz reaktivite yoktur (ağır SJS / TEN öyküsü hariç).',
    tone: 'teal',
  },
  {
    title: 'DOSE & CLOROTIC Nüansı',
    tag: 'Kanıt Yorumlama',
    detail:
      'DOSE yüksek dozda primer semptom skoru sınırda anlamsızdır (p=0,06), ancak sıvı/kilo kaybı anlamlıdır. CLOROTIC dispnede farksızdır ama 72 sa kilo kaybını artırır (böbrek boz. %46,5 & hipoK %40,6 pahasına).',
    tone: 'sky',
  },
];

interface VerifiedReference {
  num: number;
  title: string;
  tag: string;
  tagColor: 'rose' | 'cyan' | 'green' | 'teal' | 'violet' | 'blue' | 'amber';
  authors: string;
  journal: string;
  pmid: string;
  extraNote?: string;
  clinicalNote: string;
}

const VERIFIED_REFERENCES: VerifiedReference[] = [
  {
    num: 1,
    title: 'ESC 2021 HF Guidelines',
    tag: 'ESC Kılavuzu',
    tagColor: 'rose',
    authors: 'McDonagh TA et al.',
    journal: 'Eur Heart J. 2021',
    pmid: '34447992',
    clinicalNote: 'ADKY’de 1. basamak IV loop stratejisi, HFrEF’de MRA sınıf I önerisi ve dekonjesyon yönetimi.',
  },
  {
    num: 2,
    title: 'ESC 2023 Focused Update HF',
    tag: 'ESC 2023',
    tagColor: 'rose',
    authors: 'McDonagh TA et al.',
    journal: 'Eur Heart J. 2023',
    pmid: '37622666',
    clinicalNote: 'Tüm EF spektrumunda KKY ve hastane içi erken SGLT2i (Sınıf I A) güncellemesi.',
  },
  {
    num: 3,
    title: 'ESC HFA Diuretic Position Statement',
    tag: 'HFA Algoritma',
    tagColor: 'rose',
    authors: 'Mullens W et al.',
    journal: 'Eur J Heart Fail. 2019',
    pmid: '30600580',
    clinicalNote: '2. saat spot idrar Na⁺ (<50–70 mEq/L) ve 6. saat idrar debisi (<100–150 mL/sa) basamaklı protokolü.',
  },
  {
    num: 4,
    title: 'ADVOR Trial',
    tag: 'RKÇ · NEJM',
    tagColor: 'cyan',
    authors: 'Mullens W et al.',
    journal: 'N Engl J Med. 2022',
    pmid: '36027559',
    clinicalNote: 'IV loop’a Asetazolamid 500 mg IV × 3 gün eklenmesi dekonjesyon başarısını %46 artırdı (SGLT2i kullanıcıları dışlandı).',
  },
  {
    num: 5,
    title: 'CLOROTIC Trial',
    tag: 'RKÇ · EHJ',
    tagColor: 'green',
    authors: 'Trullàs JC et al.',
    journal: 'Eur Heart J. 2023',
    pmid: '36423214',
    clinicalNote: 'eGFR tabakalı HCTZ (25/50/100 mg) ile 72 sa kilo kaybı ↑; dispne farksız, böbrek bozulması (%46,5) ve hipokalemi (%40,6) ↑.',
  },
  {
    num: 6,
    title: 'DOSE Trial',
    tag: 'RKÇ · NEJM',
    tagColor: 'rose',
    authors: 'Felker GM et al.',
    journal: 'N Engl J Med. 2011',
    pmid: '21366472',
    clinicalNote: '2,5× yüksek doz IV loop daha hızlı sıvı/kilo kaybı sağladı (semptom skoru p=0,06); bolus ve sürekli infüzyon eşdeğerdi.',
  },
  {
    num: 7,
    title: 'EMPULSE Trial (SGLT2i in AHF)',
    tag: 'RKÇ · Nat Med',
    tagColor: 'amber',
    authors: 'Voors AA et al.',
    journal: 'Nat Med. 2022',
    pmid: '35228754',
    clinicalNote: 'ADKY’de hastane içi erken Empagliflozin başlatılması 90 günlük klinik faydayı anlamlı artırdı (Win Ratio 1,36).',
  },
  {
    num: 8,
    title: 'NCS 2020 Cerebral Edema',
    tag: 'NCS Kılavuzu',
    tagColor: 'teal',
    authors: 'Cook AM et al.',
    journal: 'Neurocrit Care. 2020',
    pmid: '32227294',
    clinicalNote: 'KİBAS’ta Mannitol %20 (inline filtre, osmolar gap <20) vs HTS (%3 periferik / %23,4 santral); TBI/İKH/hipotansiyonda HTS.',
  },
  {
    num: 9,
    title: 'EASL 2018 Decompensated Cirrhosis',
    tag: 'EASL Kılavuzu',
    tagColor: 'violet',
    authors: 'EASL.',
    journal: 'J Hepatol. 2018',
    pmid: '29653741',
    clinicalNote: 'İlk Evre 2 asitte Spironolakton monoterapisi; tekrarlayan/Evre 3’te 100:40 kombinasyonu ve >5 L LVP’de 8 g/L albümin.',
  },
  {
    num: 10,
    title: 'ESICM / ESE / ERA-EDTA Hyponatremia',
    tag: 'Avrupa Kılavuzu',
    tagColor: 'blue',
    authors: 'Spasovski G et al.',
    journal: 'Intensive Care Med. 2014',
    pmid: '24562549',
    clinicalNote: 'Ağır semptomda %3 HTS 150 mL IV, vaptanlara karşı öneri, ODS koruması için ΔNa⁺ üst sınırları.',
  },
  {
    num: 11,
    title: 'US Hyponatremia Expert Panel',
    tag: 'ABD Paneli',
    tagColor: 'blue',
    authors: 'Verbalis JG et al.',
    journal: 'Am J Med. 2013',
    pmid: '24074529',
    clinicalNote: 'Seçilmiş refrakter SIADH/KKY’de hastane içi Tolvaptan (15 mg PO, sıvı kısıtlamasız) kullanımı ve yüksek risk ODS eşikleri (≤6–8 mmol/L).',
  },
  {
    num: 12,
    title: 'DIABOLO Trial (COPD Alkalosis)',
    tag: 'RKÇ · JAMA',
    tagColor: 'cyan',
    authors: 'Faisy C et al.',
    journal: 'JAMA. 2016',
    pmid: '26836730',
    clinicalNote: 'KOAH metabolik alkalozunda Asetazolamid HCO₃⁻ düşürdü ancak invaziv MV süresini kısaltmadı (p=0,17).',
  },
  {
    num: 13,
    title: 'Furosemide Stress Test (FST) & KDIGO 2012 AKI Guideline',
    tag: 'Prognostik · KDIGO',
    tagColor: 'rose',
    authors: 'Chawla LS et al.',
    journal: 'Crit Care. 2013',
    pmid: '24053972',
    extraNote: 'KDIGO 2012 AKI Guideline — Kidney Int Suppl. 2012;2(1):1–138',
    clinicalNote: 'Diüretikler ABH’yi önlemez/tedavi etmez; FST (1,0–1,5 mg/kg → 2 sa <200 mL) Evre 3 ABH ve RRT ihtiyacını öngörür.',
  },
];

// ============================================================================
// YARDIMCI GÖRSEL FONKSİYONLAR
// ============================================================================

const renderScenarioIcon = (icon: ClinicalScenario['icon'], className = 'w-4 h-4') => {
  switch (icon) {
    case 'heart':
      return <HeartPulse className={className} />;
    case 'layers':
      return <Layers className={className} />;
    case 'brain':
      return <Brain className={className} />;
    case 'droplets':
      return <Droplets className={className} />;
    case 'wind':
      return <Wind className={className} />;
    case 'activity':
      return <Activity className={className} />;
    case 'stethoscope':
      return <Stethoscope className={className} />;
  }
};

const getRefTagClasses = (color: VerifiedReference['tagColor'], isDark: boolean) => {
  switch (color) {
    case 'rose':
      return isDark ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-200';
    case 'cyan':
      return isDark ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' : 'bg-cyan-50 text-cyan-800 border-cyan-200';
    case 'green':
      return isDark ? 'bg-green-500/15 text-green-300 border-green-500/30' : 'bg-green-50 text-green-800 border-green-200';
    case 'teal':
      return isDark ? 'bg-teal-500/15 text-teal-300 border-teal-500/30' : 'bg-teal-50 text-teal-800 border-teal-200';
    case 'violet':
      return isDark ? 'bg-violet-500/15 text-violet-300 border-violet-500/30' : 'bg-violet-50 text-violet-700 border-violet-200';
    case 'blue':
      return isDark ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200';
    case 'amber':
      return isDark ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' : 'bg-amber-50 text-amber-800 border-amber-200';
  }
};

const getPearlToneClasses = (tone: AnesthesiaPearl['tone'], isDark: boolean) => {
  switch (tone) {
    case 'rose':
      return isDark
        ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
        : 'bg-rose-50 text-rose-700 border-rose-200';
    case 'amber':
      return isDark
        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
        : 'bg-amber-50 text-amber-800 border-amber-200';
    case 'teal':
      return isDark
        ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
        : 'bg-teal-50 text-teal-800 border-teal-200';
    case 'sky':
      return isDark
        ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
        : 'bg-sky-50 text-sky-700 border-sky-200';
  }
};

// ============================================================================
// ANA BİLEŞEN
// ============================================================================

export const NephronDiureticsClinicalMatrix: React.FC<NephronDiureticsClinicalMatrixProps> = ({
  isDark,
  view,
  selectedDiuretic,
  onSelectDiuretic,
  onJumpToAnimation,
}) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(CLINICAL_SCENARIOS[0].id);
  const [matrixViewMode, setMatrixViewMode] = useState<'card' | 'table'>('card');
  const [activeHfaStep, setActiveHfaStep] = useState<number>(1);

  const activeScenario =
    CLINICAL_SCENARIOS.find((s) => s.id === activeScenarioId) ?? CLINICAL_SCENARIOS[0];
  const primaryTheme = getDiureticStyles(activeScenario.primaryDiureticId, isDark);
  const primaryProfile = DIURETICS[activeScenario.primaryDiureticId];

  const handleInspectInAnimation = (id: DiureticId) => {
    onSelectDiuretic(id);
    onJumpToAnimation?.(id);
  };

  // ==========================================================================
  // VIEW 2: GÜNCEL KILAVUZLAR, SGLT2i & ANESTEZİ İNCİLERİ
  // ==========================================================================
  if (view === 'guidelines') {
    return (
      <div className="space-y-6">
        {/* Panel 1: SGLT2i (Modern 7. Natriüretik Sınıf) & Perioperatif Anestezi Güvenliği */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 1: SGLT2 İnhibitörleri */}
          <div
            className={`p-5 rounded-2xl border flex flex-col justify-between gap-4 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-xl border ${
                      isDark
                        ? 'bg-amber-500/15 border-amber-500/35 text-amber-300'
                        : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isDark ? 'text-amber-300' : 'text-amber-700'
                      }`}
                    >
                      Modern 7. Natriüretik Sınıf · ESC 2023 Sınıf I A
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      SGLT2 İnhibitörleri (Empagliflozin / Dapagliflozin)
                    </h3>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    isDark
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  EMPULSE · Win Ratio 1,36
                </span>
              </div>

              <ul className="space-y-2 text-xs leading-relaxed">
                <li className={`flex items-start gap-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                      Proksimal SGLT2 / NHE3 + TGF Restorasyonu:{' '}
                    </strong>
                    PCT’de glukoz ve Na⁺ geri emilimini (NHE3 dahil) inhibe ederek maküla densaya NaCl sunumunu artırır; tübüloglomerüler geri bildirimi (TGF) restore edip afferent vazokonstriksiyonla nefroproteksiyon sağlar.
                  </span>
                </li>
                <li className={`flex items-start gap-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                      ESC 2023 Sınıf I A &amp; EMPULSE:{' '}
                    </strong>
                    Tüm EF spektrumunda KKY temel tedavisi; ADKY’de hastane içi stabilizasyon sonrası erken başlanması 90 günlük klinik faydayı (Win Ratio 1,36) ve dekonjesyon etkinliğini anlamlı artırır.
                  </span>
                </li>
                <li className={`flex items-start gap-2 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                      ADVOR Etkileşim Notu:{' '}
                    </strong>
                    ADVOR (Asetazolamid) çalışması SGLT2i kullanıcılarını dışlamıştır; kombine PCT blokajında kanıt sınırlıdır.
                  </span>
                </li>
              </ul>
            </div>

            {/* Anestezi Altın Kuralı — euDKA */}
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                isDark
                  ? 'bg-rose-950/35 border-rose-500/40 text-rose-100'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <div
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-0.5 ${
                    isDark ? 'text-rose-300' : 'text-rose-700'
                  }`}
                >
                  Anestezi Altın Kuralı · Öglisemik DKA (euDKA) Koruması
                </div>
                <p>
                  <strong>Elektif cerrahiden 3–4 gün önce kesin:</strong> Empagliflozin / Dapagliflozin{' '}
                  <strong>3 gün</strong>, Ertugliflozin <strong>4 gün</strong> önce durdurulur. Normal kan şekerine rağmen açlık ve cerrahi stresle yüksek anyon açıklı ketoasidoz (euDKA) gelişebilir!
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Anesteziyoloji & YBÜ Perioperatif İncileri (4 Madde) */}
          <div
            className={`p-5 rounded-2xl border space-y-3.5 ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`p-2 rounded-xl border ${
                  isDark
                    ? 'bg-teal-500/15 border-teal-500/35 text-teal-300'
                    : 'bg-teal-50 border-teal-200 text-teal-700'
                }`}
              >
                <Syringe className="w-4 h-4" />
              </div>
              <div>
                <div
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-teal-300' : 'text-teal-700'
                  }`}
                >
                  Perioperatif Güvenlik · 4 Kritik İnci
                </div>
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  Anesteziyoloji &amp; YBÜ Perioperatif İncileri
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ANESTHESIA_PEARLS.map((pearl, idx) => (
                <div
                  key={pearl.title}
                  className={`p-3 rounded-xl border space-y-1 ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-xs font-bold ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {idx + 1}. {pearl.title}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${getPearlToneClasses(
                        pearl.tone,
                        isDark
                      )}`}
                    >
                      {pearl.tag}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {pearl.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Panel 2: 13 Doğrulanmış Kılavuz & RKÇ Kaynakları */}
        <section
          id="diuretics-sec-guidelines"
          className={`scroll-mt-20 p-5 sm:p-6 rounded-2xl border space-y-4 ${
            isDark
              ? 'bg-slate-900/95 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
            <div className="flex items-start gap-2.5">
              <div
                className={`p-2 rounded-xl border shrink-0 ${
                  isDark
                    ? 'bg-blue-500/15 border-blue-500/30 text-blue-300'
                    : 'bg-blue-50 border-blue-200 text-blue-700'
                }`}
              >
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  13 Doğrulanmış Uluslararası Kılavuz &amp; RKÇ Kaynağı
                </h2>
                <p
                  className={`text-xs mt-0.5 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                >
                  Karar matrisindeki tüm dozlama eşikleri ve güvenlik sınırları doğrudan doğrulanmış PubMed kaynaklarına dayanır.
                </p>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border self-start sm:self-center shrink-0 ${
                isDark
                  ? 'bg-teal-500/15 border-teal-500/30 text-teal-300'
                  : 'bg-teal-50 border-teal-200 text-teal-700'
              }`}
            >
              13 / 13 PMID DOĞRULANDI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VERIFIED_REFERENCES.map((ref) => (
              <div
                key={ref.num}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 ${
                  isDark
                    ? 'bg-slate-950/60 border-slate-800'
                    : 'bg-slate-50/60 border-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`text-xs font-bold leading-snug ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}
                    >
                      {ref.num}. {ref.title}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border shrink-0 ${getRefTagClasses(
                        ref.tagColor,
                        isDark
                      )}`}
                    >
                      {ref.tag}
                    </span>
                  </div>

                  <p
                    className={`text-[11px] leading-snug ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {ref.authors}{' '}
                    <em className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      {ref.journal}
                    </em>
                    {ref.extraNote ? ` · ${ref.extraNote}` : ''}.
                  </p>

                  <p
                    className={`text-[11px] leading-relaxed pt-1 border-t ${
                      isDark
                        ? 'border-slate-800/80 text-slate-300'
                        : 'border-slate-200/70 text-slate-700'
                    }`}
                  >
                    → {ref.clinicalNote}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-1 rounded-md border transition-colors ${
                      isDark
                        ? 'bg-teal-500/10 border-teal-500/30 text-teal-300 hover:bg-teal-500/20'
                        : 'bg-white border-teal-200 text-teal-700 hover:bg-teal-50'
                    }`}
                  >
                    <span>PMID: {ref.pmid}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // ==========================================================================
  // VIEW 1: KLİNİK KARAR MATRİSİ & ARDIŞIK NEFRON BLOKAJI
  // ==========================================================================
  const currentHfa = ESC_HFA_STEPS[activeHfaStep - 1] ?? ESC_HFA_STEPS[0];

  return (
    <div className="space-y-7">
      {/* ===================================================================== */}
      {/* BÖLÜM A: 7 KLİNİK SENARYO KARAR MATRİSİ [Vaka Kartı | Özet Tablo]     */}
      {/* ===================================================================== */}
      <section id="diuretics-sec-matrix" className="scroll-mt-20 space-y-4">
        {/* Başlık + [Vaka Kartı | Özet Tablo] Görünüm Anahtarı */}
        <div
          className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isDark
                    ? 'bg-teal-500/15 text-teal-300 border-teal-500/30'
                    : 'bg-teal-50 text-teal-700 border-teal-200'
                }`}
              >
                Bölüm A · 7 Klinik Senaryo Karar Matrisi
              </span>
              <span
                className={`text-[11px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                3 Saniyelik Eşik Tarama + Kanıta Dayalı Eylem
              </span>
            </div>
            <h2
              className={`text-base sm:text-lg font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Perioperatif &amp; YBÜ Klinik Senaryolara Göre Diüretik Seçimi
            </h2>
          </div>

          {/* Mutually Exclusive View Mode Switch */}
          <div
            role="tablist"
            aria-label="Karar Matrisi Görünüm Modu"
            className={`inline-flex p-1 rounded-xl border shrink-0 self-start md:self-center ${
              isDark
                ? 'bg-slate-950 border-slate-800'
                : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              role="tab"
              aria-selected={matrixViewMode === 'card'}
              onClick={() => setMatrixViewMode('card')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixViewMode === 'card'
                  ? isDark
                    ? 'bg-teal-500/20 text-teal-200 border border-teal-400/40 shadow-xs'
                    : 'bg-white text-teal-800 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Vaka Kartı</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={matrixViewMode === 'table'}
              onClick={() => setMatrixViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                matrixViewMode === 'table'
                  ? isDark
                    ? 'bg-teal-500/20 text-teal-200 border border-teal-400/40 shadow-xs'
                    : 'bg-white text-teal-800 shadow-xs'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>Özet Tablo</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* GÖRÜNÜM 1: VAKA KARTI                                             */}
        {/* ================================================================= */}
        {matrixViewMode === 'card' ? (
          <div className="space-y-4">
            {/* 7-Senaryo Seçici Çubuğu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-2">
              {CLINICAL_SCENARIOS.map((sc, idx) => {
                const isSelected = sc.id === activeScenario.id;
                const theme = getDiureticStyles(sc.primaryDiureticId, isDark);
                const matchesSimulator = selectedDiuretic === sc.primaryDiureticId;

                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setActiveScenarioId(sc.id)}
                    style={
                      isSelected
                        ? {
                            borderColor: theme.accentHex,
                            boxShadow: `0 0 0 1px ${theme.accentHex}88`,
                          }
                        : undefined
                    }
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? theme.activePill
                        : isDark
                          ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <span
                        className="inline-flex items-center gap-1.5"
                        style={{ color: theme.accentHex }}
                      >
                        {renderScenarioIcon(sc.icon, 'w-3.5 h-3.5 shrink-0')}
                        <span className="text-[10px] font-mono font-bold opacity-85">
                          0{idx + 1}
                        </span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: theme.accentHex }}
                        />
                        {matchesSimulator && (
                          <span
                            title="Simülatörde seçili sınıf"
                            className={`text-[9px] font-mono font-bold ${
                              isDark ? 'text-teal-300' : 'text-teal-700'
                            }`}
                          >
                            ●
                          </span>
                        )}
                      </span>
                    </div>

                    <div>
                      <div
                        className={`text-xs font-bold leading-snug line-clamp-2 ${
                          isSelected
                            ? isDark
                              ? 'text-white'
                              : 'text-slate-950'
                            : isDark
                              ? 'text-slate-200'
                              : 'text-slate-800'
                        }`}
                      >
                        {sc.shortTitle}
                      </div>
                      <div
                        className={`text-[10px] mt-1 truncate ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {theme.shortLabel}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Aktif Vaka Kartı */}
            <div
              className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                isDark
                  ? 'bg-slate-900 border-slate-800'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Kart Üst Başlık + Animasyonda İncele CTA */}
              <div
                className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b ${
                  isDark ? 'border-slate-800' : 'border-slate-200'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${primaryTheme.badge}`}
                    >
                      {renderScenarioIcon(activeScenario.icon, 'w-3 h-3')}
                      {activeScenario.domain}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-md border ${primaryTheme.badge}`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: primaryTheme.accentHex }}
                      />
                      <span>
                        1. Ajan: {primaryTheme.shortLabel} · {primaryProfile.segmentLabel}
                      </span>
                    </span>
                  </div>

                  <h3
                    className={`text-base sm:text-xl font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {activeScenario.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleInspectInAnimation(activeScenario.primaryDiureticId)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer ${primaryTheme.ctaBtn}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Animasyonda İncele</span>
                  </button>

                  {activeScenario.secondaryDiureticIds?.map((secId) => {
                    const secTheme = getDiureticStyles(secId, isDark);
                    return (
                      <button
                        key={secId}
                        type="button"
                        onClick={() => handleInspectInAnimation(secId)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[11px] font-semibold transition-opacity hover:opacity-85 cursor-pointer ${secTheme.badge}`}
                      >
                        <Play className="w-3 h-3 opacity-80" />
                        <span>+ {secTheme.shortLabel.split(' (')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Üst 4-Chip KPI / Eşik Şeridi (3 Saniyelik Tarama) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-emerald-950/25 border-emerald-500/30'
                      : 'bg-emerald-50/70 border-emerald-200'
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'text-emerald-300' : 'text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>1. Basamak</span>
                  </div>
                  <div
                    className={`text-xs font-bold mt-1 leading-snug ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {activeScenario.kpi.firstLine}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-amber-950/25 border-amber-500/30'
                      : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    <Zap className="w-3 h-3 shrink-0" />
                    <span>Kritik Eşik</span>
                  </div>
                  <div
                    className={`text-xs font-bold mt-1 leading-snug ${
                      isDark ? 'text-amber-100' : 'text-amber-950'
                    }`}
                  >
                    {activeScenario.kpi.criticalThreshold}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-sky-950/25 border-sky-500/30'
                      : 'bg-sky-50/70 border-sky-200'
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'text-sky-300' : 'text-sky-700'
                    }`}
                  >
                    <Activity className="w-3 h-3 shrink-0" />
                    <span>İzlem</span>
                  </div>
                  <div
                    className={`text-xs font-bold mt-1 leading-snug ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {activeScenario.kpi.monitoring}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    isDark
                      ? 'bg-rose-950/30 border-rose-500/35'
                      : 'bg-rose-50/80 border-rose-200'
                  }`}
                >
                  <div
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                      isDark ? 'text-rose-300' : 'text-rose-700'
                    }`}
                  >
                    <XCircle className="w-3 h-3 shrink-0" />
                    <span>Kesin Yasak</span>
                  </div>
                  <div
                    className={`text-xs font-bold mt-1 leading-snug ${
                      isDark ? 'text-rose-100' : 'text-rose-950'
                    }`}
                  >
                    {activeScenario.kpi.hardAvoid}
                  </div>
                </div>
              </div>

              {/* Temel Klinik Kural Şeridi */}
              <div
                className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${primaryTheme.ruleBox}`}
              >
                <Zap
                  className="w-4 h-4 shrink-0 mt-0.5"
                  style={{ color: primaryTheme.accentHex }}
                />
                <div className="text-xs leading-relaxed">
                  <span className="font-bold uppercase tracking-wider text-[10px] mr-1.5 opacity-90">
                    {activeScenario.ruleLabel}:
                  </span>
                  <span className="font-medium">{activeScenario.ruleText}</span>
                </div>
              </div>

              {/* 2×2 Yapılandırılmış Aksiyon Blokları (Kısa Maddeler, Duvar Metni Yok) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* 1. Basamak */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isDark
                      ? 'bg-slate-950/55 border-slate-800'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-bold ${
                      isDark ? 'text-emerald-400' : 'text-emerald-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{activeScenario.blocks.firstLineTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs leading-relaxed">
                    {activeScenario.blocks.firstLineBullets.map((b) => (
                      <li
                        key={b.lead}
                        className={`flex items-start gap-2 ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                        <span>
                          <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                            {b.lead}{' '}
                          </strong>
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Basamak */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isDark
                      ? 'bg-slate-950/55 border-slate-800'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-bold ${
                      isDark ? 'text-indigo-400' : 'text-indigo-700'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>{activeScenario.blocks.secondLineTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs leading-relaxed">
                    {activeScenario.blocks.secondLineBullets.map((b) => (
                      <li
                        key={b.lead}
                        className={`flex items-start gap-2 ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                        <span>
                          <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                            {b.lead}{' '}
                          </strong>
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* İzlem */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isDark
                      ? 'bg-slate-950/55 border-slate-800'
                      : 'bg-slate-50/60 border-slate-200'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-bold ${
                      isDark ? 'text-amber-400' : 'text-amber-800'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{activeScenario.blocks.monitoringTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs leading-relaxed">
                    {activeScenario.blocks.monitoringBullets.map((b) => (
                      <li
                        key={b.lead}
                        className={`flex items-start gap-2 ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>
                          <strong className={isDark ? 'text-white' : 'text-slate-900'}>
                            {b.lead}{' '}
                          </strong>
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Kesin Yasak */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isDark
                      ? 'bg-rose-950/20 border-rose-500/35'
                      : 'bg-rose-50/60 border-rose-200'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-bold ${
                      isDark ? 'text-rose-400' : 'text-rose-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{activeScenario.blocks.avoidTitle}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs leading-relaxed">
                    {activeScenario.blocks.avoidBullets.map((b) => (
                      <li
                        key={b.lead}
                        className={`flex items-start gap-2 ${
                          isDark ? 'text-rose-100' : 'text-rose-950'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>
                          <strong>{b.lead} </strong>
                          {b.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dayanak Kılavuz Şeridi */}
              <div
                className={`pt-3 border-t flex flex-wrap items-center justify-between gap-2 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider mr-1 ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    Kanıt / Kılavuz:
                  </span>
                  {activeScenario.evidenceBadges.map((badge) => (
                    <span
                      key={badge}
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-300'
                          : 'bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <span className={`text-[11px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Senaryo {CLINICAL_SCENARIOS.findIndex((s) => s.id === activeScenario.id) + 1} /{' '}
                  {CLINICAL_SCENARIOS.length}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* GÖRÜNÜM 2: ÖZET TABLO (Tek Görünüm — Üst Üste Binme Yok)          */
          /* ================================================================= */
          <div
            className={`rounded-2xl border overflow-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div
              className={`px-4 py-3 border-b flex items-center justify-between gap-2 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-teal-500" />
                <span
                  className={`text-xs font-bold ${
                    isDark ? 'text-slate-100' : 'text-slate-800'
                  }`}
                >
                  7 Klinik Senaryo Hızlı Tarama Özet Tablosu
                </span>
              </div>
              <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Satıra tıklayarak Vaka Kartı detayına geçin
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr
                    className={`border-b text-[10px] uppercase tracking-wider font-bold ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 text-slate-400'
                        : 'bg-slate-50/70 border-slate-200 text-slate-500'
                    }`}
                  >
                    <th className="py-2.5 px-3.5">Senaryo</th>
                    <th className="py-2.5 px-3.5">1. Ajan</th>
                    <th className="py-2.5 px-3.5">1. Basamak</th>
                    <th className="py-2.5 px-3.5">Kritik Eşik</th>
                    <th className="py-2.5 px-3.5">Kesin Yasak</th>
                    <th className="py-2.5 px-3.5 text-right">Animasyon</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-800/80' : 'divide-slate-100'}`}>
                  {CLINICAL_SCENARIOS.map((sc) => {
                    const isRowActive = sc.id === activeScenario.id;
                    const theme = getDiureticStyles(sc.primaryDiureticId, isDark);
                    return (
                      <tr
                        key={sc.id}
                        onClick={() => {
                          setActiveScenarioId(sc.id);
                          setMatrixViewMode('card');
                        }}
                        className={`transition-colors cursor-pointer ${
                          isRowActive
                            ? isDark
                              ? 'bg-teal-500/10'
                              : 'bg-teal-50/60'
                            : isDark
                              ? 'hover:bg-slate-800/50'
                              : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-3.5 font-bold whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span style={{ color: theme.accentHex }}>
                              {renderScenarioIcon(sc.icon, 'w-3.5 h-3.5')}
                            </span>
                            <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>
                              {sc.shortTitle}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3.5 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${theme.badge}`}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: theme.accentHex }}
                            />
                            {theme.shortLabel.split(' (')[0]}
                          </span>
                        </td>
                        <td
                          className={`py-2.5 px-3.5 text-[11px] ${
                            isDark ? 'text-slate-200' : 'text-slate-700'
                          }`}
                        >
                          {sc.kpi.firstLine}
                        </td>
                        <td
                          className={`py-2.5 px-3.5 text-[11px] font-mono ${
                            isDark ? 'text-amber-300' : 'text-amber-800'
                          }`}
                        >
                          {sc.kpi.criticalThreshold}
                        </td>
                        <td
                          className={`py-2.5 px-3.5 text-[11px] font-medium ${
                            isDark ? 'text-rose-300' : 'text-rose-700'
                          }`}
                        >
                          {sc.kpi.hardAvoid}
                        </td>
                        <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInspectInAnimation(sc.primaryDiureticId);
                            }}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-opacity cursor-pointer ${theme.ctaBtn}`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>İncele</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* BÖLÜM B: GÖRSEL ARDIŞIK NEFRON BLOKAJI & ESC HFA STEPPER & 5 ALARM    */}
      {/* ===================================================================== */}
      <section id="diuretics-sec-synergy" className="scroll-mt-20 space-y-5">
        {/* B1: Visual Horizontal 4-Segment Nephron Synergy Strip (PCT → TAL → DCT → CD) */}
        <div
          className={`p-5 rounded-2xl border space-y-4 ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isDark
                      ? 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
                      : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  }`}
                >
                  Bölüm B · Ardışık Nefron Blokajı (Sequential Nephron Blockade)
                </span>
              </div>
              <h3
                className={`text-sm sm:text-base font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <GitBranch className="w-4 h-4 text-teal-500 shrink-0" />
                <span>4 Segmentli Anatomik Sinerji Akışı (PCT → TAL → DCT → CD)</span>
              </h3>
            </div>
            <span
              className={`text-[11px] font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              Segment kartına tıkla → Animasyonda aç
            </span>
          </div>

          {/* 4 Connected Anatomical Boxes with Directional Arrows */}
          <div className="flex flex-col lg:flex-row items-stretch gap-2">
            {NEPHRON_SYNERGY_SEGMENTS.map((seg, idx) => {
              const theme = getDiureticStyles(seg.diureticId, isDark);
              const isSelectedInSim = selectedDiuretic === seg.diureticId;

              return (
                <React.Fragment key={seg.segmentCode}>
                  <button
                    type="button"
                    onClick={() => handleInspectInAnimation(seg.diureticId)}
                    style={
                      isSelectedInSim
                        ? {
                            borderColor: theme.accentHex,
                            boxShadow: `0 0 0 2px ${theme.accentHex}80`,
                          }
                        : undefined
                    }
                    className={`flex-1 p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 hover:brightness-105 ${theme.segmentCard}`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border ${theme.badge}`}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: theme.accentHex }}
                          />
                          <span>
                            {seg.stepNum}. {seg.segmentCode}
                          </span>
                        </span>
                        <span
                          className={`text-[10px] font-medium ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}
                        >
                          {seg.segmentName}
                        </span>
                      </div>

                      <div
                        className={`text-xs font-extrabold leading-snug ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}
                      >
                        {seg.primaryDrug}
                      </div>

                      <div
                        className={`text-[10px] font-mono font-bold ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {seg.primaryBadge}
                      </div>

                      <p
                        className={`text-[11px] leading-snug ${
                          isDark ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {seg.secondaryNote}
                      </p>
                    </div>

                    <div
                      className={`pt-2 border-t flex items-center justify-between gap-1 text-[10px] font-bold ${
                        isDark
                          ? 'border-white/10 text-slate-200'
                          : 'border-slate-900/10 text-slate-700'
                      }`}
                    >
                      <span className="truncate opacity-85">{seg.mechanismTag}</span>
                      <span
                        className="inline-flex items-center gap-1 shrink-0"
                        style={{ color: theme.accentHex }}
                      >
                        <Play className="w-2.5 h-2.5 fill-current" />
                        <span>Gör</span>
                      </span>
                    </div>
                  </button>

                  {idx < NEPHRON_SYNERGY_SEGMENTS.length - 1 && (
                    <div className="flex items-center justify-center shrink-0 py-0.5 lg:py-0">
                      <ArrowRight
                        className={`hidden lg:block w-4 h-4 ${
                          isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      />
                      <ArrowDown
                        className={`lg:hidden w-4 h-4 ${
                          isDark ? 'text-slate-500' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* B2: Interactive 3-Step ESC HFA 2019 Decongestion Stepper */}
        <div
          className={`p-5 rounded-2xl border space-y-3.5 ${
            isDark
              ? 'bg-slate-900 border-slate-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-500 shrink-0" />
              <h3
                className={`text-sm sm:text-base font-bold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                ESC HFA 2019 · 2. Saat Spot İdrar Na⁺ Dekonjesyon Algoritması
              </h3>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                isDark
                  ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              İNTERAKTİF 3 ADIM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {ESC_HFA_STEPS.map((st) => {
              const isStepActive = activeHfaStep === st.step;
              return (
                <button
                  key={st.step}
                  type="button"
                  onClick={() => setActiveHfaStep(st.step)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                    isStepActive
                      ? isDark
                        ? 'bg-rose-500/15 border-rose-400/70 ring-1 ring-rose-400/60'
                        : 'bg-rose-50 border-rose-400 ring-1 ring-rose-300'
                      : isDark
                        ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isStepActive
                          ? isDark
                            ? 'text-rose-300'
                            : 'text-rose-700'
                          : isDark
                            ? 'text-slate-400'
                            : 'text-slate-500'
                      }`}
                    >
                      {st.label}
                    </span>
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold inline-flex items-center justify-center ${
                        isStepActive
                          ? 'bg-rose-600 text-white'
                          : isDark
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {st.step}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-bold leading-snug ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {st.title}
                  </div>
                  <div
                    className={`text-[10px] font-mono ${
                      isDark ? 'text-amber-300' : 'text-amber-800'
                    }`}
                  >
                    {st.threshold}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Aktif Adım Yatak Başı Eylem Çubuğu */}
          <div
            className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDark
                ? 'bg-slate-950/80 border-slate-800 text-slate-200'
                : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <div className="text-xs leading-relaxed">
              <span
                className={`font-bold mr-1.5 ${
                  isDark ? 'text-rose-300' : 'text-rose-700'
                }`}
              >
                Adım {currentHfa.step} Eylemi:
              </span>
              {currentHfa.action}
            </div>
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {currentHfa.quickDrugs.map((dId) => {
                const theme = getDiureticStyles(dId, isDark);
                return (
                  <button
                    key={dId}
                    type="button"
                    onClick={() => handleInspectInAnimation(dId)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border transition-opacity hover:opacity-85 cursor-pointer ${theme.badge}`}
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{theme.shortLabel.split(' (')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* B3: 5 Kırmızı Alarm Kontrendike Kombinasyon Şeridi */}
        <div
          className={`p-5 rounded-2xl border space-y-3.5 ${
            isDark
              ? 'bg-rose-950/25 border-rose-500/40'
              : 'bg-rose-50/70 border-rose-300'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`p-2 rounded-xl border ${
                  isDark
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                    : 'bg-rose-100 border-rose-300 text-rose-700'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isDark ? 'text-rose-400' : 'text-rose-700'
                  }`}
                >
                  Kırmızı Alarm · Perioperatif Güvenlik Bariyeri
                </div>
                <h3
                  className={`text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-rose-950'
                  }`}
                >
                  5 Kontrendike / Yüksek Toksisiteli Diüretik Kombinasyonu
                </h3>
              </div>
            </div>
            <span
              className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border self-start sm:self-center ${
                isDark
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  : 'bg-white border-rose-200 text-rose-700'
              }`}
            >
              YÜKSEK RİSK
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {DANGEROUS_INTERACTIONS.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2 ${
                  isDark
                    ? 'bg-slate-950/80 border-rose-500/25'
                    : 'bg-white border-rose-200 shadow-2xs'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-start justify-between gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {item.riskTag}
                    </span>
                    <Flame className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  </div>

                  <h4
                    className={`text-xs font-bold leading-snug ${
                      isDark ? 'text-rose-100' : 'text-slate-900'
                    }`}
                  >
                    {item.pair}
                  </h4>

                  <p
                    className={`text-[11px] leading-snug ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {item.mechanism}
                  </p>
                </div>

                <div
                  className={`pt-2 border-t text-[10px] leading-snug font-medium ${
                    isDark
                      ? 'border-slate-800 text-rose-300'
                      : 'border-rose-100 text-rose-800'
                  }`}
                >
                  <strong>Önlem: </strong>
                  {item.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
