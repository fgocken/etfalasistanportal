export type AntithromboticClass =
  | 'DOAC'
  | 'Varfarin'
  | 'Heparinler'
  | 'Antiagregan'
  | 'Trombolitik';

export type CrClProfile = 'normal' | 'dusuk';

export type RegionalProcedureTier = 'noraksiyel' | 'derin_blok' | 'yuzeyel_blok';

export type SurgicalBleedMode = 'cerrahi_yuksek' | 'cerrahi_dusuk';

export type CatheterSafetyStatus = 'allowed' | 'conditional' | 'contraindicated';

export type AgentRiskTag =
  | 'CrCl Bağımlı'
  | 'Kesme Zorunlu'
  | 'Devam Edilebilir'
  | 'Yüksek Risk / Kontrendike';

export interface AntithromboticAgent {
  id: string;
  name: string;
  shortName: string;
  drugClass: AntithromboticClass;
  target: string;
  halfLife: string;
  timeToPeak: string;
  renalExcretion: string;
  riskTag: AgentRiskTag;
  isCrClSensitive: boolean;
  /** Rejyonel Anestezi (Nöraksiyel & Derin/Yüzeyel Sinir Blokları) 3-Sütun Matrisi */
  regional: {
    /** Pre-Placement / Pre-Removal Hold (CrCl ≥ 50 mL/dk) */
    preHoldNormal: string;
    /** Pre-Placement / Pre-Removal Hold (CrCl 30–49 mL/dk) */
    preHoldLowCrCl: string;
    /** Kateter Yerindeyken Yönetim Durumu */
    catheterStatus: CatheterSafetyStatus;
    catheterStatusLabel: string;
    /** Indwelling Catheter Management */
    indwellingCatheter: string;
    /** Post-Placement / Post-Removal Restart */
    postRestart: string;
    /** Travmatik / kanlı ponksiyon özel notu */
    bloodyTapNote: string;
    /** Yüzeyel / komprese edilebilir periferik blok farkı (ESAIC/ESRA 2022 & ASRA 2025) */
    superficialBlockNote: string;
    /** Kabul edilebilir laboratuvar eşiği (varsa) */
    labThreshold: string;
  };
  /** Cerrahi Kanama Riskine Göre Perioperatif Yönetim (PAUSE / ACCP 2022 / AHA-ACC 2024 / ESC 2022) */
  surgical: {
    highBleedHoldNormal: string;
    highBleedHoldLowCrCl: string;
    highBleedRestart: string;
    lowModBleedHoldNormal: string;
    lowModBleedHoldLowCrCl: string;
    lowModBleedRestart: string;
    bridgingNote: string;
  };
  rationale: string;
  antidote: string;
  guidelines: string;
  keywords: string[];
}

export interface RegionalProcedureTierMeta {
  id: RegionalProcedureTier;
  label: string;
  shortLabel: string;
  ruleBadge: string;
  tone: 'rose' | 'amber' | 'emerald';
  summary: string;
  examples: string[];
  cautionExamples?: string[];
  guidelineRule: string;
}

export const REGIONAL_PROCEDURE_TIERS: RegionalProcedureTierMeta[] = [
  {
    id: 'noraksiyel',
    label: 'Nöraksiyel Anestezi',
    shortLabel: 'Nöraksiyel',
    ruleBadge: 'Mutlak Süreler Zorunlu',
    tone: 'rose',
    summary:
      'Kapalı spinal kanal içinde gelişen hematom saatler içinde kalıcı paraplejiye yol açabilir. ASRA 5. Baskı (2025) ve ESAIC/ESRA 2022 kesme, kateter ve yeniden başlama süreleri eksiksiz uygulanır.',
    examples: [
      'Spinal (Subaraknoid) Anestezi',
      'Torakal / Lomber / Servikal Epidural',
      'Kombine Spinal–Epidural (KSE)',
      'Kaudal Blok',
      'İntratekal / Epidural Kateter Takma ve Çekme'
    ],
    guidelineRule:
      'Kateter çekimi en az kateter yerleştirme kadar yüksek hematom riski taşır; aynı bekleme süreleri çekim öncesinde de geçerlidir.'
  },
  {
    id: 'derin_blok',
    label: 'Derin / Komprese Edilemeyen Bloklar',
    shortLabel: 'Derin Sinir Blokları',
    ruleBadge: 'Nöraksiyel ile Birebir Aynı',
    tone: 'amber',
    summary:
      'Kanama dışarıdan görülemez ve manuel kompresyonla durdurulamaz (retroperitoneal, mediastinal veya derin kompartman hematomu). ASRA 2025 (Grade 1C) ve ESAIC/ESRA 2022 bu bloklar için NÖRAKSİYEL SÜRELERİN AYNISINI zorunlu kılar.',
    examples: [
      'Lomber Pleksus (Psoas Kompartman) Bloku',
      'Torakal / Lomber Paravertebral Blok (PVB)',
      'İnfraklaviküler Brakiyal Pleksus Bloku',
      'Proksimal Siyatik Blok (Parasakral / Transgluteal / Labat)',
      'Derin Servikal Pleksus & Stellat Ganglion Bloku',
      'Anterior / Transmusküler Quadratus Lumborum (QL3)',
      'Çölyak / Splanknik / Süperior Hipogastrik Bloklar'
    ],
    cautionExamples: [
      'PENG (Perikapsüler Sinir Grubu): Derin yerleşimli ve femoral/obturator damar komşuluğu nedeniyle yüksek dikkat (bireysel değerlendirme; birçok merkez derin blok gibi yönetir).'
    ],
    guidelineRule:
      'ASRA 2025 (Grade 1C) & ESAIC/ESRA 2022: Derin ve komprese edilemeyen tüm pleksus/periferik bloklarda nöraksiyel kesme, kateter ve yeniden başlama kuralları aynen uygulanır.'
  },
  {
    id: 'yuzeyel_blok',
    label: 'Yüzeyel / Komprese Edilebilir Bloklar',
    shortLabel: 'Yüzeyel Bloklar',
    ruleBadge: 'ESAIC: Zorunlu Değil · ASRA: Bireysel',
    tone: 'emerald',
    summary:
      'Kanama erken fark edilebilir ve doğrudan dış kompresyonla kontrol altına alınabilir. ESAIC/ESRA 2022’ye göre nöraksiyel bekleme süreleri bu bloklarda ZORUNLU DEĞİLDİR; ASRA 2025 (Grade 2C) ise kompresibilite, vaskülarite ve kanama sonucuna göre bireyselleştirilmiş karar önerir.',
    examples: [
      'Aksiller Brakiyal Pleksus Bloku',
      'Femoral Sinir & Fasya İliaka Bloku (FICB)',
      'Adduktor Kanal (Safen Sinir) Bloku',
      'Popliteal Siyatik & Ayak Bileği Blokları',
      'TAP (Transversus Abdominis Plan) & Rektus Kılıfı Bloku',
      'PECS I / II & Serratus Anterior Plan (SAP) Bloku',
      'İlioinguinal / İliohipogastrik & Yüzeyel Servikal Pleksus',
      'Erektör Spina Planı (ESP) — ESAIC/ESRA 2022 yüzeyel/düşük riskli sınıfta'
    ],
    cautionExamples: [
      'Supraklaviküler & İnterskalen Brakiyal Pleksus: ESAIC/ESRA yüzeyel sınıflandırsa da subklavyen/vertebral/tiroservikal arter komşuluğu ve plevra yakınlığı nedeniyle yüksek dikkat (ara risk — deneyimli elde USG ile tek geçiş!).'
    ],
    guidelineRule:
      'Deneyimli uygulayıcı, USG kılavuzluğu, tek atravmatik geçiş, damar ponksiyonunda etkin kompresyon ve post-prosedür hematom izlemi şartıyla antikoagülan kesilmeden uygulanabilir.'
  }
];

export const ANTITHROMBOTIC_CLASSES: AntithromboticClass[] = [
  'DOAC',
  'Varfarin',
  'Heparinler',
  'Antiagregan',
  'Trombolitik'
];

export const ANTITHROMBOTIC_AGENTS: AntithromboticAgent[] = [
  // ===================== 1. DOAC (Faktör Xa & IIa) =====================
  {
    id: 'apixaban_high',
    name: 'Apiksaban — Yüksek Doz / Terapötik (5 mg 2×1; AF’de 2.5 mg 2×1*)',
    shortName: 'Apiksaban (Yüksek Doz / Terapötik)',
    drugClass: 'DOAC',
    target: 'Direkt Faktör Xa İnhibitörü',
    halfLife: '12–15 saat (böbrek yetmezliğinde uzar)',
    timeToPeak: '3–4 saat',
    renalExcretion: '~%27',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '≥ 72 saat (3 gün) veya plazma <30 ng/mL / anti-Xa ≤0.1 IU/mL',
      preHoldLowCrCl: '≥ 72 saat (CrCl <30’da uzar; plazma <30 ng/mL veya kalibre anti-Xa ≤0.1 IU/mL önerilir)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kontrendike',
      indwellingCatheter:
        'Epidural / derin perinöral kateter yerindeyken KESİNLİKLE KONTRENDİKEDİR. Yanlışlıkla doz verildiyse kateteri çekmek için tam 72 saat beklenir veya anti-Xa <0.1 IU/mL (<30 ng/mL) doğrulanır.',
      postRestart:
        'Blok veya kateter çekiminden en az 24 saat sonra (ASRA 2025 yüksek doz & ESAIC/ESRA 2022; travmatik ponksiyonda veya yüksek kanama riskli cerrahide 48–72 sa).',
      bloodyTapNote: 'Travmatik/kanlı ponksiyonda ilk terapötik dozu en az 24–48 saat erteleyin ve nörolojik izlemi sıklaştırın.',
      superficialBlockNote:
        'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA 2022 kesme zorunluluğu aramaz; mümkünse çukur (trough) saatinde USG ile tek geçiş tercih edilir.',
      labThreshold: 'Kalibre Apiksaban düzeyi <30 ng/mL veya anti-Xa ≤0.1 IU/mL'
    },
    surgical: {
      highBleedHoldNormal: '2 gün (48 saat; son doz gün -3)',
      highBleedHoldLowCrCl: '2–3 gün (48–72 saat; birikim riski)',
      highBleedRestart: '48–72 saat (tam cerrahi hemostaz sonrası)',
      lowModBleedHoldNormal: '1 gün (24 saat; son doz gün -2)',
      lowModBleedHoldLowCrCl: '1–2 gün (24–48 saat)',
      lowModBleedRestart: '24 saat',
      bridgingNote: 'PAUSE protokolü gereği rutin DMAH/UFH köprülemesi YAPILMAZ (kanamayı artırır, trombozu azaltmaz).'
    },
    rationale:
      'ASRA 2025 uyarısı: İleri yaş (≥80), düşük kilo (<60 kg) veya böbrek yetmezliği nedeniyle AF inme koruması için azaltılmış 2.5 mg 2×1 dozu KULLANAN HASTALARDA ilaç düzeyi terapötik aralıktadır ve “Yüksek Doz (72 saat)” kuralına tabidir! Nöraksiyel güvenlik için 5×t½ (72 saat) gerekir.',
    antidote: 'Andeksanet alfa veya 4-faktör PCC (25–50 Ü/kg). ASRA 2025: Rutin nöraksiyel blok yapmak amacıyla antidot KULLANILMAZ.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, PAUSE / ACCP 2022',
    keywords: ['apiksaban', 'eliquis', 'doac', 'noac', 'faktör xa', 'terapötik', 'af']
  },
  {
    id: 'apixaban_low',
    name: 'Apiksaban — Düşük Doz / VTE Profilaksisi (2.5 mg 2×1, normal böbrek/kilo)',
    shortName: 'Apiksaban (Düşük Doz Profilaksi)',
    drugClass: 'DOAC',
    target: 'Direkt Faktör Xa İnhibitörü (Düşük Doz)',
    halfLife: '~12 saat',
    timeToPeak: '3–4 saat',
    renalExcretion: '~%27',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '≥ 36 saat (ASRA 2025 & ESAIC/ESRA 2022 uyumlu) veya plazma <30 ng/mL',
      preHoldLowCrCl: '36–48 saat (CrCl <30’da 72 saat gibi yönet veya anti-Xa ≤0.1 IU/mL doğrula)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Önerilmez',
      indwellingCatheter:
        'ASRA 2025 & ESAIC/ESRA 2022: Kateter yerindeyken Apiksaban uygulanması önerilmez; yanlışlıkla verildiyse çekim öncesi tam 36 saat beklenir.',
      postRestart: 'Blok veya kateter çekiminden en az 6 saat sonra (travmatik ponksiyonda 24 saat).',
      bloodyTapNote: 'Kanlı ponksiyonda ilk profilaktik dozu 24 saate erteleyin.',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda kesilmeden USG kılavuzluğunda güvenle yapılabilir.',
      labThreshold: 'Apiksaban <30 ng/mL veya anti-Xa ≤0.1 IU/mL'
    },
    surgical: {
      highBleedHoldNormal: '24–48 saat',
      highBleedHoldLowCrCl: '36–48 saat',
      highBleedRestart: '24–48 saat (hemostaz sonrası)',
      lowModBleedHoldNormal: '24 saat',
      lowModBleedHoldLowCrCl: '24–36 saat',
      lowModBleedRestart: '6–24 saat',
      bridgingNote: 'Köprüleme gerekmez; postop mekanik VTE profilaksisi ile desteklenir.'
    },
    rationale:
      'ASRA 5. Baskı (2025) düşük doz VTE profilaksisi (2.5 mg 2×1, normal böbrek ve kilo) için 2×t½ prensibiyle kesme süresini ESAIC/ESRA 2022 ile uyumlu olarak 36 saat şeklinde güncellemiştir.',
    antidote: 'Acil majör kanamada 4-faktör PCC (25–50 Ü/kg) veya Andeksanet alfa.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022',
    keywords: ['apiksaban', 'eliquis', 'profilaktik', 'düşük doz', '2.5 mg', 'vte']
  },
  {
    id: 'rivaroxaban_edoxaban_high',
    name: 'Rivaroksaban / Edoksaban — Yüksek Doz / Terapötik (≥15–20 mg / 30–60 mg)',
    shortName: 'Rivaroksaban / Edoksaban (Yüksek Doz)',
    drugClass: 'DOAC',
    target: 'Direkt Faktör Xa İnhibitörü',
    halfLife: 'Rivaroksaban 5–13 sa · Edoksaban 10–14 sa',
    timeToPeak: '2–4 saat',
    renalExcretion: 'Rivaroksaban ~%35 · Edoksaban ~%50',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '≥ 72 saat (3 gün) veya plazma <30 ng/mL / anti-Xa ≤0.1 IU/mL',
      preHoldLowCrCl: '≥ 72 saat (CrCl <30’da birikim riski: kalibre anti-Xa ≤0.1 IU/mL / <30 ng/mL ile doğrula)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kontrendike',
      indwellingCatheter:
        'Epidural veya derin pleksus kateteri yerindeyken KESİNLİKLE KONTRENDİKEDİR. Yanlışlıkla doz verildiyse çekim için 72 saat beklenir veya anti-Xa kontrolü yapılır.',
      postRestart: 'Blok veya kateter çekiminden en az 24 saat sonra (ASRA 2025 & ESAIC/ESRA 2022; yüksek riskli cerrahide 48–72 sa).',
      bloodyTapNote: 'Kanlı ponksiyonda ilk terapötik dozu 24–48 saat erteleyin.',
      superficialBlockNote:
        'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA kesme zorunluluğu getirmez; çukur (trough) saatinde USG ile atravmatik giriş önerilir.',
      labThreshold: 'İlaç-spesifik plazma <30 ng/mL veya anti-Xa ≤0.1 IU/mL'
    },
    surgical: {
      highBleedHoldNormal: '2 gün (48 saat; PAUSE)',
      highBleedHoldLowCrCl: '2–3 gün (48–72 saat)',
      highBleedRestart: '48–72 saat',
      lowModBleedHoldNormal: '1 gün (24 saat; PAUSE)',
      lowModBleedHoldLowCrCl: '36–48 saat',
      lowModBleedRestart: '24 saat',
      bridgingNote: 'PAUSE çalışmasına göre rutin heparin köprülemesi YAPILMAZ.'
    },
    rationale:
      'Rivaroksaban ve Edoksaban yüksek dozlarda yaşlı ve böbrek fonksiyonu azalmış hastalarda 11–14 saati aşan yarılanma ömrü gösterir; kapalı spinal kanalda kalıntı riskini sıfırlamak için 72 saat (5×t½) kesme gereklidir.',
    antidote: 'Andeksanet alfa veya 4-faktör PCC (25–50 Ü/kg). Rutin blok için antidot KULLANILMAZ.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, PAUSE / ACCP 2022',
    keywords: ['rivaroksaban', 'xarelto', 'edoksaban', 'lixiana', 'doac', 'faktör xa']
  },
  {
    id: 'rivaroxaban_low',
    name: 'Rivaroksaban / Edoksaban — Düşük Doz / Profilaksi (Riva 10 mg 1×1)',
    shortName: 'Rivaroksaban (Düşük Doz 10 mg)',
    drugClass: 'DOAC',
    target: 'Direkt Faktör Xa İnhibitörü (Düşük Doz)',
    halfLife: '5–9 saat (yaşlıda 11–13 sa)',
    timeToPeak: '2–4 saat',
    renalExcretion: '~%35',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '≥ 24 saat (CrCl ≥30 mL/dk)',
      preHoldLowCrCl: '24 saat (CrCl 30–49); CrCl 15–30 mL/dk ise ≥ 30 saat (ASRA 2025 & ESAIC 2022)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Önerilmez',
      indwellingCatheter:
        'Kateter yerindeyken rutin uygulanması önerilmez; yanlışlıkla doz verildiyse çekim için 24 saat (CrCl <30’da 30 sa) beklenir.',
      postRestart: 'Blok veya kateter çekiminden en az 6 saat sonra (travmatik ponksiyonda 24 saat).',
      bloodyTapNote: 'Travmatik ponksiyonda ilk dozu 24 saat erteleyin.',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda kesme gerekmez.',
      labThreshold: 'Plazma <30 ng/mL veya anti-Xa ≤0.1 IU/mL'
    },
    surgical: {
      highBleedHoldNormal: '24–48 saat',
      highBleedHoldLowCrCl: '36–48 saat',
      highBleedRestart: '24–48 saat',
      lowModBleedHoldNormal: '24 saat',
      lowModBleedHoldLowCrCl: '24–36 saat',
      lowModBleedRestart: '6–24 saat',
      bridgingNote: 'Köprüleme gerekmez.'
    },
    rationale:
      'Günde tek doz 10 mg Rivaroksaban profilaksisinde hem ASRA 5. Baskı (2025) hem ESAIC/ESRA 2022, CrCl >30 mL/dk için 24 saat ve CrCl 15–30 mL/dk için 30 saat bekleme penceresinde birleşmiştir (Edoksaban için ASRA 2025’te onaylı düşük doz yoktur; ESAIC 24/30 sa).',
    antidote: 'Acil majör kanamada 4-faktör PCC (25–50 Ü/kg).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022',
    keywords: ['rivaroksaban', 'xarelto', '10 mg', 'profilaksi', 'düşük doz', 'edoksaban']
  },
  {
    id: 'dabigatran_high',
    name: 'Dabigatran — Yüksek Doz / Terapötik (110–150 mg 2×1)',
    shortName: 'Dabigatran (Yüksek Doz / Terapötik)',
    drugClass: 'DOAC',
    target: 'Direkt Trombin (Faktör IIa) İnhibitörü',
    halfLife: '12–17 saat (CrCl <50’de 18–28+ sa)',
    timeToPeak: '1–2 saat',
    renalExcretion: '~%80 (EN YÜKSEK RENAL BAĞIMLILIK)',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: 'CrCl ≥80: ≥ 72 sa · CrCl 50–79: 72 sa (ESAIC) / 96 sa (ASRA)',
      preHoldLowCrCl: 'CrCl 30–49: 120 sa (5 gün — ASRA 2025) / dTT normal veya <30 ng/mL (ESAIC); CrCl <30: BLOKTAN KAÇIN!',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kesin Kontrendike',
      indwellingCatheter:
        'Epidural veya derin kateter yerindeyken KESİNLİKLE KONTRENDİKEDİR. Yanlışlıkla doz verildiyse CrCl’ye göre tam 72–120 saat beklenir veya dTT/plazma <30 ng/mL doğrulanır.',
      postRestart: 'Blok veya kateter çekiminden en az 24 saat sonra (ASRA 2025 yüksek doz & ESAIC/ESRA 2022; yüksek kanama riskli cerrahide 48–72 sa).',
      bloodyTapNote: 'Kanlı ponksiyonda ilk dozu 24–48 saat erteleyin; hızlı pik yaptığı (1–2 sa) için erken dozlama tehlikelidir.',
      superficialBlockNote:
        'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA kesme zorunluluğu koymaz; ancak CrCl <50 hastalarda yüksek plazma düzeyi nedeniyle özellikle dikkatli olunmalıdır.',
      labThreshold: 'Dilüe Trombin Zamanı (dTT) / Ekarin pıhtılaşma zamanı normal veya Dabigatran <30 ng/mL'
    },
    surgical: {
      highBleedHoldNormal: '2 gün (48 sa; CrCl 50–79’da 72 sa)',
      highBleedHoldLowCrCl: '4 gün (96 saat; PAUSE protokolü)',
      highBleedRestart: '48–72 saat',
      lowModBleedHoldNormal: '1 gün (24 saat)',
      lowModBleedHoldLowCrCl: '2 gün (48 saat; PAUSE protokolü)',
      lowModBleedRestart: '24 saat',
      bridgingNote: 'PAUSE protokolüne göre rutin heparin köprülemesi YAPILMAZ; kesme süresi tamamen CrCl’ye göre uzatılır.'
    },
    rationale:
      'Dabigatran’ın %80’i böbreklerden atılır. CrCl <50 mL/dk’da yarılanma ömrü 28 saati aştığı için nöraksiyel kesme süresi 5 güne (120 saat) kadar uzar; CrCl <30 mL/dk’da ilaç düzeyi doğrulanmadan nöraksiyel blok yapılmaz.',
    antidote: 'İdarusizumab (Praxbind® 5 g IV spesifik antidot; yoksa aPCC/PCC veya acil hemodiyaliz). Rutin blok için kullanılmaz.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, PAUSE / ACCP 2022',
    keywords: ['dabigatran', 'pradaxa', 'trombin', 'iia', 'idarusizumab', 'praxbind', 'dtt', 'crcl']
  },
  {
    id: 'dabigatran_low',
    name: 'Dabigatran — Düşük Doz / Profilaksi (150–220 mg 1×1)',
    shortName: 'Dabigatran (Düşük Doz Profilaksi)',
    drugClass: 'DOAC',
    target: 'Direkt Trombin (Faktör IIa) İnhibitörü (Düşük Doz)',
    halfLife: '12–17 saat (CrCl <50’de uzar)',
    timeToPeak: '1–2 saat',
    renalExcretion: '~%80',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '≥ 48 saat (ASRA 2025 & ESAIC/ESRA 2022)',
      preHoldLowCrCl: 'CrCl <50 mL/dk: dTT normal veya Dabigatran <30 ng/mL doğrulanmadan blok yapma (veya ≥72–96 sa)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kontrendike',
      indwellingCatheter: 'Kateter yerindeyken KONTRENDİKEDİR; yanlışlıkla verildiyse çekim için ≥48 saat (veya normal dTT) beklenir.',
      postRestart: 'Blok veya kateter çekiminden en az 6 saat sonra (travmatik ponksiyonda 24 saat).',
      bloodyTapNote: 'Kanlı ponksiyonda 24 saat erteleyin.',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda kesme zorunlu değildir.',
      labThreshold: 'dTT normal veya plazma <30 ng/mL'
    },
    surgical: {
      highBleedHoldNormal: '48 saat',
      highBleedHoldLowCrCl: '72–96 saat',
      highBleedRestart: '24–48 saat',
      lowModBleedHoldNormal: '24 saat',
      lowModBleedHoldLowCrCl: '48 saat',
      lowModBleedRestart: '6–24 saat',
      bridgingNote: 'Köprüleme gerekmez.'
    },
    rationale:
      'ASRA 2025 ve ESAIC/ESRA 2022, düşük doz Dabigatran profilaksisinde normal böbrekte 48 saat kesme süresinde hemfikirdir; CrCl <50 mL/dk’da renal birikim yüzünden laboratuvar teyidi şarttır.',
    antidote: 'Acil majör kanamada İdarusizumab 5 g IV.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022',
    keywords: ['dabigatran', 'pradaxa', 'düşük doz', 'profilaksi', '48 saat']
  },

  // ===================== 2. VARFARİN (VKA) =====================
  {
    id: 'warfarin',
    name: 'Varfarin (Vitamin K Antagonisti — VKA)',
    shortName: 'Varfarin (Coumadin)',
    drugClass: 'Varfarin',
    target: 'K Vitamini Bağımlı Faktör II, VII, IX, X İnhibitörü',
    halfLife: '36–42 saat (Faktör II t½: 60–72 sa)',
    timeToPeak: '72–96 saat (tam antikoagülan etki)',
    renalExcretion: 'Hepatik metabolizma (CrCl’den bağımsız)',
    riskTag: 'Kesme Zorunlu',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: '5 gün önce kes + işlem öncesi INR ≤ 1.4 (normal aralık)',
      preHoldLowCrCl: '5 gün önce kes + işlem öncesi INR ≤ 1.4 (CrCl’den bağımsız)',
      catheterStatus: 'conditional',
      catheterStatusLabel: 'Koşullu (INR < 1.5)',
      indwellingCatheter:
        'ESAIC/ESRA 2022 terapötik VKA altında kateteri önermez. ASRA 2025: Düşük doz yeni başlandıysa günlük INR + nörolojik izlemle yalnızca INR < 1.5 iken çekilir; INR 1.5–3.0 arası dikkatli izlem, INR > 3.0 iken kateter ÇEKİLMEZ (doz kesilir/düzeltilir).',
      postRestart: 'Blok veya kateter çekiminden hemen sonra / aynı akşam (antikoagülan etki 3–5 günde gelişir).',
      bloodyTapNote: 'İlk doz aynı akşam başlanabilir ancak INR yükselirken 48 saat yakın nörolojik izlem yapılır.',
      superficialBlockNote:
        'Yüzeyel komprese edilebilir bloklarda terapötik INR (2.0–3.0) aralığında ESAIC/ESRA 2022 kesme zorunluluğu aramaz (INR >3.0’da dikkat).',
      labThreshold: 'INR ≤ 1.4 (yerleştirme) · INR < 1.5 (kateter çekimi)'
    },
    surgical: {
      highBleedHoldNormal: '5 gün önce kes + preop INR ≤ 1.4–1.5',
      highBleedHoldLowCrCl: '5 gün önce kes + preop INR ≤ 1.4–1.5',
      highBleedRestart: 'Hemostaz sonrası 12–24 saat (genellikle aynı akşam)',
      lowModBleedHoldNormal: '5 gün (katarakt, diş, minör cilt/endoskopide INR 2–3 ile kesmeden devam)',
      lowModBleedHoldLowCrCl: '5 gün (minör işlemlerde kesmeden devam)',
      lowModBleedRestart: 'Aynı akşam (12–24 saat)',
      bridgingNote:
        'BRIDGE çalışması: Düşük–orta tromboemboli riskli AF’de rutin heparin köprülemesi YAPILMAZ. Yalnızca mekanik mitral/eski aort kapağı, son 3 ay inme/VTE veya yüksek CHA₂DS₂-VASc’ta köprülenir.'
    },
    rationale:
      'INR erken dönemde Faktör VII’yi (t½ 6 sa) yansıtsa da güvenli hemostaz için Faktör II (t½ 60–72 sa) ve X’in toparlanması ~5 gün sürer; bu yüzden hem süre (5 gün) hem de normal INR (≤1.4) birlikte doğrulanmalıdır.',
    antidote: 'Acil cerrahide 4-faktör PCC (25–50 Ü/kg) + IV K vitamini (5–10 mg); PCC yoksa TDP (15 mL/kg). Elektifte düşük doz oral K vit (1–2.5 mg).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, ACCP 2022, BRIDGE',
    keywords: ['varfarin', 'warfarin', 'coumadin', 'vka', 'inr', 'bridge', 'pcc', 'k vitamini']
  },

  // ===================== 3. HEPARİNLER & FONDAPARİNUKS =====================
  {
    id: 'lmwh_low',
    name: 'DMAH — Düşük Doz / Profilaktik (Enoksaparin 40 mg 1×1 vb.)',
    shortName: 'DMAH — Profilaktik (Enoksaparin 40 mg)',
    drugClass: 'Heparinler',
    target: 'AT-III Aracılı Faktör Xa İnhibitörü (Düşük Doz)',
    halfLife: '4–6 saat (CrCl <30’da belirgin uzar)',
    timeToPeak: '3–5 saat (SC)',
    renalExcretion: 'Ağırlıklı renal (CrCl <30’da birikim!)',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '≥ 12 saat (yerleştirme ve kateter çekimi öncesi)',
      preHoldLowCrCl: '12 saat (CrCl 30–49); CrCl <30 mL/dk ise ≥ 24 saat veya anti-Xa ≤0.1 IU/mL',
      catheterStatus: 'allowed',
      catheterStatusLabel: '1×1 Dozda Kateter Kalabilir',
      indwellingCatheter:
        'Günde TEK DOZ (1×1) profilaktik DMAH altında epidural kateter güvenle KALABİLİR (kateter çekimi son dozdan ≥12 sa sonra, yeni doz çekimden ≥4 sa sonra). Günde İKİ DOZ (2×1) profilaktik DMAH başlanacaksa kateter ilk dozdan önce ÇEKİLMELİDİR!',
      postRestart:
        'Blok sonrası ilk tek doz ≥12 sa sonra (ASRA) / ≥4 sa sonra (ESAIC; 2×1 rejimde ertesi gün ≥12–24 sa). Kateter çekiminden en az 4 saat sonra (travmatikte 24 sa).',
      bloodyTapNote: 'ASRA 2025 & ESAIC 2022: Kanlı/travmatik ponksiyonda ilk postop DMAH dozunu MUTLAKA 24 saat erteleyin!',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda bekleme süresi gerekmez.',
      labThreshold: 'Anti-Xa ≤ 0.1 IU/mL (CrCl <30 veya belirsiz doz zamanında)'
    },
    surgical: {
      highBleedHoldNormal: '12 saat',
      highBleedHoldLowCrCl: '12–24 saat (CrCl <30’da 24 sa)',
      highBleedRestart: '12 saat (hemostaz sağlandıktan sonra)',
      lowModBleedHoldNormal: '12 saat',
      lowModBleedHoldLowCrCl: '12 saat',
      lowModBleedRestart: '6–12 saat',
      bridgingNote: 'Profilaktik dozlarda ek köprüleme söz konusu değildir.'
    },
    rationale:
      'Profilaktik DMAH’da 12 saatlik pencere anti-Xa aktivitesini güvenli eşiğe düşürür; kateter çekiminden sonraki 4 saatlik pencere ise epidural damar pıhtısının matürasyonu için zorunludur. 2×1 rejimlerde epidural hematom insidansı belirgin yüksek olduğundan kateter bırakılmaz.',
    antidote: 'Protamin sülfat (kısmi nötralizasyon ~%60: son dozdan <8 sa ise 1 mg / 100 anti-Xa Ü).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, ACCP 2022',
    keywords: ['dmah', 'lmwh', 'enoksaparin', 'clexane', 'oksapar', 'profilaktik', '12 saat', '4 saat']
  },
  {
    id: 'lmwh_high',
    name: 'DMAH — Yüksek Doz / Terapötik (Enoksaparin 1 mg/kg 2×1 veya 1.5 mg/kg 1×1)',
    shortName: 'DMAH — Terapötik (1 mg/kg 2×1)',
    drugClass: 'Heparinler',
    target: 'AT-III Aracılı Faktör Xa İnhibitörü (Terapötik)',
    halfLife: '4–7 saat (CrCl <30’da birikim)',
    timeToPeak: '3–5 saat (SC)',
    renalExcretion: 'Ağırlıklı renal',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '≥ 24 saat (yerleştirme ve zorunlu kateter çekimi öncesi)',
      preHoldLowCrCl: '≥ 24 saat (CrCl <30 mL/dk’da ≥ 48 saat veya anti-Xa ≤0.1 IU/mL kontrolü; UFH tercih et)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kontrendike',
      indwellingCatheter:
        'Terapötik DMAH altında epidural veya derin kateter BIRAKILMAZ. Kateter ilk terapötik dozdan en az 4 saat önce çekilmelidir; yanlışlıkla doz verildiyse çekim için ≥24 saat beklenir.',
      postRestart:
        'Bloktan en az 24 saat sonra (yüksek kanama riskli cerrahide veya travmatik ponksiyonda 48–72 saat). Kateter çekiminden en az 4 saat sonra (ve bloktan ≥24 sa geçmiş olmalı).',
      bloodyTapNote: 'Travmatik ponksiyonda terapötik DMAH başlangıcını en az 24–48 saat erteleyin.',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA kesme zorunluluğu getirmez; mümkünse çukur saatinde USG ile tek geçiş.',
      labThreshold: 'Anti-Xa ≤ 0.1 IU/mL'
    },
    surgical: {
      highBleedHoldNormal: '24 saat (son akşam dozu yarı doz veya atlanır)',
      highBleedHoldLowCrCl: '24–48 saat (CrCl <30’da UFH tercih edilir)',
      highBleedRestart: '48–72 saat (tam cerrahi hemostaz sonrası)',
      lowModBleedHoldNormal: '24 saat',
      lowModBleedHoldLowCrCl: '24 saat',
      lowModBleedRestart: '24 saat',
      bridgingNote: 'Yüksek tromboz riskinde Varfarin köprülemesi için kullanılır; ameliyat sabahı dozu atlanır (son doz ≥24 sa önce).'
    },
    rationale:
      'Terapötik DMAH’da 12. saatte dahi yüksek rezidüel anti-Xa aktivitesi sürdüğünden nöraksiyel/derin bloklar ve cerrahi öncesi tam 24 saat beklenir; CrCl <30 mL/dk’da renal birikim çok belirgindir.',
    antidote: 'Protamin sülfat (kısmi etki ~%60: son 8 saat içinde 1 mg/100 Ü; 8–12 sa arası 0.5 mg/100 Ü).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, ACCP 2022',
    keywords: ['dmah', 'lmwh', 'enoksaparin', 'terapötik', 'clexane', '24 saat', 'köprüleme']
  },
  {
    id: 'ufh_iv',
    name: 'UFH — IV Terapötik İnfüzyon (Anfraksiyone Heparin)',
    shortName: 'UFH — IV Terapötik İnfüzyon',
    drugClass: 'Heparinler',
    target: 'AT-III Aracılı Faktör IIa ve Xa İnhibitörü',
    halfLife: '60–90 dakika (doza bağımlı)',
    timeToPeak: 'Anında (IV)',
    renalExcretion: 'Retiküloendotelyal / minimal renal (CrCl’den bağımsız)',
    riskTag: 'Kesme Zorunlu',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: '4–6 saat kes + normal aPTT (veya ACT) doğrulaması',
      preHoldLowCrCl: '4–6 saat kes + normal aPTT (veya ACT) — böbrek yetmezliğinde güvenle tercih edilir',
      catheterStatus: 'conditional',
      catheterStatusLabel: 'Koşullu (aPTT Normal Çekim)',
      indwellingCatheter:
        'İntraoperatif sistemik heparinizasyonda (vasküler/kardiyak cerrahi) kateter kalabilir; ancak çekimden önce IV infüzyon 4–6 saat kesilip NORMAL aPTT doğrulanmalıdır! >4 gün heparin alanlarda HIT için trombosit sayımı şarttır.',
      postRestart:
        'Blok veya kateter çekiminden en az 1 saat sonra (ASRA 2025 & ESAIC/ESRA 2022; travmatik/kanlı ponksiyonda 6–12–24 saat erteleme tartışılır).',
      bloodyTapNote:
        'Vasküler/kardiyak cerrahide kanlı ponksiyon olursa cerrahla konuşulur; tam heparinizasyon (CPB) gerekiyorsa vakayı 24 saat erteleme veya alternatif plan değerlendirilir.',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA zorunlu kılmaz; ancak aktif tam IV heparinizasyonda aPTT kontrolü ve USG dikkat gerektirir.',
      labThreshold: 'Normal aPTT (veya ACT) + >4 gün kullanımda normal Trombosit (HIT dışlama)'
    },
    surgical: {
      highBleedHoldNormal: '4–6 saat + normal aPTT',
      highBleedHoldLowCrCl: '4–6 saat + normal aPTT',
      highBleedRestart: '24–48 saat (yükleme/bolus OLMADAN, hemostaz sonrası)',
      lowModBleedHoldNormal: '4–6 saat + normal aPTT',
      lowModBleedHoldLowCrCl: '4–6 saat + normal aPTT',
      lowModBleedRestart: '12–24 saat',
      bridgingNote: 'Ağır böbrek yetmezliğinde (CrCl <30 mL/dk) köprüleme için ilk tercih ajandır.'
    },
    rationale:
      'Kısa yarılanma ömrü, aPTT ile anlık izlenebilmesi ve Protamin ile %100 geri döndürülebilmesi sayesinde en kontrol edilebilir parenteral antikoagülandır; pıhtı stabilizasyonu için blok/çekim sonrası en az 1 saat heparinsiz pencere zorunludur.',
    antidote: 'Protamin sülfat — tam nötralizasyon (son 1 sa içindeki her 100 Ü UFH için 1 mg yavaş IV; maks. 50 mg).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, ACCP 2022',
    keywords: ['ufh', 'heparin', 'iv heparin', 'aptt', 'act', 'protamin', 'hit']
  },
  {
    id: 'ufh_sc',
    name: 'UFH — SC Profilaktik (5000 Ü 2×1 veya 3×1; ≤15.000 Ü/gün)',
    shortName: 'UFH — SC Profilaktik (≤15.000 Ü/gün)',
    drugClass: 'Heparinler',
    target: 'AT-III Aracılı Faktör IIa ve Xa İnhibitörü (Düşük Doz)',
    halfLife: '1–2 saat (SC pik 2–4 sa)',
    timeToPeak: '2–4 saat (SC)',
    renalExcretion: 'Minimal renal',
    riskTag: 'Kesme Zorunlu',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: '4–6 saat (veya normal aPTT) — Yüksek doz SC (>15–20 bin Ü/gün) ise 12–24 sa + normal aPTT!',
      preHoldLowCrCl: '4–6 saat (CrCl’den bağımsız; >4 gün kullanımda trombosit kontrolü)',
      catheterStatus: 'allowed',
      catheterStatusLabel: 'Kateter Kalabilir',
      indwellingCatheter:
        '5000 Ü 2×1 veya 3×1 SC profilaksi altında epidural kateter güvenle KALABİLİR. Kateter son SC dozdan 4–6 saat sonra çekilir. >4 gün kullanımda HIT için trombosit sayımı yapılır.',
      postRestart: 'Blok veya kateter çekiminden en az 1 saat sonra (ASRA 2025: çekim sonrası hemen / 1 saat sonra; ESAIC/ESRA: ≥1 saat).',
      bloodyTapNote: 'Kanlı ponksiyonda ilk dozu 1–6 saat geciktirin ve motor/duyu takibini sıklaştırın.',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda bekleme süresi gerekmez.',
      labThreshold: 'Normal aPTT (özellikle 3×1 veya >15.000 Ü/gün dozlarda) + >4 günde Trombosit'
    },
    surgical: {
      highBleedHoldNormal: '4–6 saat (çoğu cerrahide preop devam edebilir)',
      highBleedHoldLowCrCl: '4–6 saat',
      highBleedRestart: '6–12 saat',
      lowModBleedHoldNormal: 'Kesme gerekmez veya 4–6 saat',
      lowModBleedHoldLowCrCl: 'Kesme gerekmez veya 4–6 saat',
      lowModBleedRestart: '6–12 saat',
      bridgingNote: 'Profilaktik düşük doz olup CrCl <30 mL/dk hastalarda DMAH yerine tercih edilir.'
    },
    rationale:
      'SC düşük doz UFH’de pik etki 2–4 saatte oluştuğundan nöraksiyel girişim ve kateter çekiminde 4–6 saatlik pencere uygulanır. Günlük >15.000–20.000 Ü yüksek SC dozlarda emilim uzadığı için 12–24 saat + normal aPTT gerekir.',
    antidote: 'Genellikle gerekmez; gerekirse Protamin sülfat.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022',
    keywords: ['ufh', 'sc heparin', 'subkütan heparin', '5000 ünite', 'profilaktik']
  },
  {
    id: 'fondaparinux',
    name: 'Fondaparinuks (Profilaktik 2.5 mg / Terapötik 5–10 mg)',
    shortName: 'Fondaparinuks (Arixtra)',
    drugClass: 'Heparinler',
    target: 'Selektif AT-III Bağımlı İndirekt Faktör Xa İnhibitörü',
    halfLife: '17–21 saat (yaşlı ve KBY’de 30–72 sa!)',
    timeToPeak: '2 saat (SC)',
    renalExcretion: '%100 Renal (CrCl <30’da kontrendike)',
    riskTag: 'CrCl Bağımlı',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: '2.5 mg (Düşük): 36–42 sa (genç 36, yaşlı 42 sa) · 5–10 mg (Yüksek): 70–105 sa (blok önerilmez)',
      preHoldLowCrCl: 'CrCl 30–50 (2.5 mg): ≥ 58 saat (ASRA 2025) · CrCl <30 mL/dk: NÖRAKSİYEL BLOK ÖNERİLMEZ!',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kontrendike',
      indwellingCatheter:
        'ASRA 2025 & ESAIC/ESRA 2022: Çok uzun yarılanma ömrü ve antidotu olmaması nedeniyle indwelling kateter KONTRENDİKEDİR. Yalnızca atravmatik tek-geçişli blok sonrası kateter bırakmadan 2.5 mg profilaksi düşünülebilir (kateter varsa ilk dozdan ≥6 sa önce çekilir).',
      postRestart: 'Blok veya kateter çekiminden en az 6 saat sonra (ASRA 2025; ESAIC/ESRA 6–12 saat; travmatikte kullanma / 24 sa).',
      bloodyTapNote: 'Kanlı/travmatik ponksiyonda Fondaparinuks’tan kaçının (alternatif antikoagülan seçin).',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA kesme zorunluluğu getirmez.',
      labThreshold: 'Kalibre Fondaparinuks anti-Xa < 0.1 mg/L'
    },
    surgical: {
      highBleedHoldNormal: '2–4 gün (profilaktik 36–48 sa; terapötik 3–4 gün)',
      highBleedHoldLowCrCl: '3–5 gün (CrCl <30’da kontrendike)',
      highBleedRestart: '48 saat (yüksek kanama riski)',
      lowModBleedHoldNormal: '24–36 saat',
      lowModBleedHoldLowCrCl: '48 saat',
      lowModBleedRestart: '24 saat',
      bridgingNote: 'HIT öyküsü olan hastalarda heparin yerine kullanılır; çok uzun yarılanma ömrü nedeniyle perioperatif zamanlamaya dikkat edilir.'
    },
    rationale:
      'Fondaparinuks %100 böbrekten atılır, yarılanma ömrü 17–21 saattir (yaşlı ve KBY’de 30–72 sa) ve Protamin ile nötralize EDİLEMEZ. Bu nedenle ASRA 2025 kateter kullanımını kontrendike sayar ve yaş/CrCl’ye göre 36–105 saat bekleme tanımlar.',
    antidote: 'Protamin ETKİSİZDİR! Hayati kanamada rekombinant Faktör VIIa (rFVIIa) veya aPCC değerlendirilir.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022',
    keywords: ['fondaparinuks', 'arixtra', 'hit', 'faktör xa', '36 saat', '42 saat']
  },

  // ===================== 4. ANTİAGREGANLAR =====================
  {
    id: 'aspirin_nsaid',
    name: 'Aspirin (Düşük Doz ≤100–200 mg) & NSAİİ',
    shortName: 'Aspirin (Düşük Doz) & NSAİİ',
    drugClass: 'Antiagregan',
    target: 'COX-1 İnhibitörü (ASA: İrreversibl · NSAİİ: Reversibl)',
    halfLife: 'Trombosit ömrü 7–10 gün (ASA)',
    timeToPeak: '30–60 dk',
    renalExcretion: 'Metabolitler renal (CrCl kesme süresini değiştirmez)',
    riskTag: 'Devam Edilebilir',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: 'Kesme gerekmez (ESAIC 2022: Yüksek doz ASA >200 mg/gün için 3 gün kes)',
      preHoldLowCrCl: 'Kesme gerekmez',
      catheterStatus: 'allowed',
      catheterStatusLabel: 'Kateter Güvenle Kalabilir',
      indwellingCatheter:
        'ASRA 2025 (Grade 1C) & ESAIC/ESRA 2022: Tek başına düşük doz Aspirin veya NSAİİ kullanımı nöraksiyel/derin blok veya kateter bakım/çekimi için kontrendikasyon oluşturmaz. Ancak ek antikoagülan (DMAH/UFH/DOAC) ile KOMBİNASYONDA dikkatli olunmalıdır.',
      postRestart: 'Kesilmediyse kesintisiz devam; kesildiyse 24 saat içinde yeniden başlanır.',
      bloodyTapNote: 'Tek başına düşük doz Aspirin’de ek erteleme gerekmez; ancak eşzamanlı antikoagülan eklenmesine dikkat edin.',
      superficialBlockNote: 'Tüm yüzeyel bloklarda kesintisiz güvenle uygulanır.',
      labThreshold: 'Rutin laboratuvar testi gerekmez'
    },
    surgical: {
      highBleedHoldNormal: 'Sekonder korumada DEVAM; intrakraniyal, intraspinal, posterior göz cerrahisinde 5–7 gün kes',
      highBleedHoldLowCrCl: 'Sekonder korumada DEVAM; kapalı boşluk cerrahisinde 5–7 gün kes',
      highBleedRestart: 'Kesildiyse 24 saat içinde',
      lowModBleedHoldNormal: 'Sekonder korumada DEVAM; primer korumada (POISE-2) 5–7 gün kes',
      lowModBleedHoldLowCrCl: 'Sekonder korumada DEVAM; primer korumada 5–7 gün kes',
      lowModBleedRestart: 'Kesildiyse 24 saat içinde',
      bridgingNote: 'Koroner stentli hastalarda Aspirin’in kesilmesi akut stent trombozu riskini katlar; mümkün olan her cerrahide sürdürülür.'
    },
    rationale:
      'Büyük prospektif veriler tek başına düşük doz Aspirin/NSAİİ’nin spinal hematom riskini artırmadığını göstermiştir (ASRA Grade 1C). Cerrahide ise POISE-2 uyarınca primer korumada kesilirken, sekonder koruma ve koroner stentlerde kesintisiz sürdürülür.',
    antidote: 'Acil nöroşirürjikal/hayati kanamada trombosit süspansiyonu veya Desmopressin (DDAVP 0.3 mcg/kg).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, POISE-2, 2024 AHA/ACC',
    keywords: ['aspirin', 'asa', 'ecopirin', 'coraspin', 'nsaii', 'ibuprofen', 'ketorolak', 'devam']
  },
  {
    id: 'clopidogrel',
    name: 'Klopidogrel (Plavix®)',
    shortName: 'Klopidogrel',
    drugClass: 'Antiagregan',
    target: 'İrreversibl P2Y12 Reseptör İnhibitörü (Ön İlaç)',
    halfLife: 'Aktif metabolit ~6 sa (trombosit inhibisyonu 5–7 gün)',
    timeToPeak: '2 saat (yükleme 300–600 mg) · 3–5 gün (idame 75 mg)',
    renalExcretion: 'Hepatik aktivasyon (CYP2C19)',
    riskTag: 'Kesme Zorunlu',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: '5–7 gün (ASRA 2025 Grade 2C & ESAIC/ESRA 2022)',
      preHoldLowCrCl: '5–7 gün (CrCl’den bağımsız)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kontrendike',
      indwellingCatheter:
        'ESAIC/ESRA 2022 kateter yerindeyken kesin kontrendike sayar. ASRA 2025: Yükleme dozu olmadan yalnızca 75 mg idame dozuyla en fazla 1–2 gün bırakılabileceğini belirtse de klinik pratikte kateterin Klopidogrel başlanmadan ÇEKİLMESİ altın standarttır.',
      postRestart:
        'İdame dozu (75 mg): ASRA 2025 hemen / ESAIC 24 sa. Yükleme dozu (300–600 mg): Kateter çekiminden ≥6 saat (ASRA) / ≥24 saat (ESAIC/ESRA) sonra.',
      bloodyTapNote: 'Kanlı ponksiyonda ilk dozu (özellikle yüklemeyi) 24 saat erteleyin.',
      superficialBlockNote:
        'Yüzeyel komprese edilebilir bloklarda (aksiller, femoral, adduktor, popliteal, TAP vb.) ESAIC/ESRA kesme zorunluluğu getirmez; deneyimli elde USG ile uygulanabilir.',
      labThreshold: 'Gerekirse VerifyNow / P2Y12 trombosit fonksiyon testi (rutin zorunlu değil)'
    },
    surgical: {
      highBleedHoldNormal: '5 gün (koroner stentte kardiyoloji onayı + ASA devam)',
      highBleedHoldLowCrCl: '5 gün',
      highBleedRestart: '24 saat içinde (yüksek kanama riskinde 48 sa)',
      lowModBleedHoldNormal: '5 gün (çok düşük kanama riskli minör işlemde devam tartışılabilir)',
      lowModBleedHoldLowCrCl: '5 gün',
      lowModBleedRestart: '24 saat içinde',
      bridgingNote: 'DES ilk 30 gününde P2Y12 kesmek Sınıf III (Zarar)! Zorunlu cerrahide IV Kangrelor köprüleme tartışılır.'
    },
    rationale:
      'Klopidogrel P2Y12 reseptörünü geri dönüşümsüz bloke eder. Kemik iliğinden günde %10–15 yeni trombosit salındığı için yeterli hemostatik trombosit havuzu cerrahide 5, nöraksiyel/derin blokta 5–7 günde oluşur.',
    antidote: 'Acil kanamada trombosit süspansiyonu (son dozdan ≥6–8 saat sonra serbest metabolit temizlendiği için daha etkilidir).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, 2024 AHA/ACC, 2022 ESC',
    keywords: ['klopidogrel', 'clopidogrel', 'plavix', 'p2y12', 'dapt', 'stent', '5 gün', '7 gün']
  },
  {
    id: 'ticagrelor',
    name: 'Tikagrelor (Brilinta® / Brilique®)',
    shortName: 'Tikagrelor',
    drugClass: 'Antiagregan',
    target: 'Reversibl, Doğrudan ve Güçlü P2Y12 İnhibitörü',
    halfLife: '7–9 saat (aktif metabolit 8–12 sa)',
    timeToPeak: '1.5–2 saat (çok hızlı pik!)',
    renalExcretion: 'Ağırlıklı hepatik/biliyer',
    riskTag: 'Kesme Zorunlu',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: '5 gün (ASRA 5th Ed. 2025 Grade 2C & ESAIC/ESRA 2022 — 5–7 günden 5 güne güncellendi!)',
      preHoldLowCrCl: '5 gün (CrCl’den bağımsız)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kesin Kontrendike',
      indwellingCatheter:
        'Epidural veya derin kateter yerindeyken KESİNLİKLE KONTRENDİKEDİR (hızlı ve derin trombosit inhibisyonu). Kateter ilk dozdan önce mutlaka çekilmelidir.',
      postRestart: 'Blok veya kateter çekiminden ≥6 saat (ASRA 2025) / ≥24 saat (ESAIC/ESRA 2022) sonra.',
      bloodyTapNote: 'Hızlı tepe etkisi (1.5–2 sa) nedeniyle kanlı ponksiyonda en az 24 saat erteleyin.',
      superficialBlockNote:
        'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA kesme zorunluluğu aramaz; ancak güçlü antiplatelet etki nedeniyle USG ile tek atravmatik geçiş ve iyi kompresyon önemlidir.',
      labThreshold: 'Rutin test yok; gerekirse P2Y12 agregometri'
    },
    surgical: {
      highBleedHoldNormal: '3–5 gün (AHA/ACC 2024 & ESC 2022: 3–5 gün; nöro/yüksek kanamada 5 gün)',
      highBleedHoldLowCrCl: '3–5 gün (yüksek riskte 5 gün)',
      highBleedRestart: '24 saat içinde (yüksek kanama riskinde 48 sa)',
      lowModBleedHoldNormal: '3–5 gün',
      lowModBleedHoldLowCrCl: '3–5 gün',
      lowModBleedRestart: '24 saat içinde',
      bridgingNote: 'Reversibl bağlanması nedeniyle cerrahide 3–5 günde toparlanır; stentli hastada ASA devam edilir.'
    },
    rationale:
      'ASRA 5. Baskı (2025), 4. baskıdaki 5–7 günlük süreyi ESAIC/ESRA 2022 ile uyumlu biçimde 5 güne güncellemiştir. Reversibl olmasına karşın çok güçlü ve hızlı (1–2 sa) inhibisyon yaptığı için kateter varlığında kesinlikle verilmez.',
    antidote:
      'Serbest dolaşan Tikagrelor yeni verilen trombositleri de bloke ettiğinden trombosit transfüzyonu ilk 24 saatte SINIRLI etkilidir! Spesifik monoklonal antikor (Bentracimab) klinik/onay sürecindedir.',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, 2024 AHA/ACC, 2022 ESC',
    keywords: ['tikagrelor', 'ticagrelor', 'brilinta', 'brilique', 'p2y12', '5 gün', 'bentracimab']
  },
  {
    id: 'prasugrel',
    name: 'Prasugrel (Effient®)',
    shortName: 'Prasugrel',
    drugClass: 'Antiagregan',
    target: 'İrreversibl, En Güçlü P2Y12 İnhibitörü',
    halfLife: 'Aktif metabolit ~7 sa (trombosit inhibisyonu 7–10 gün)',
    timeToPeak: '30–60 dakika',
    renalExcretion: 'Hepatik dönüşüm',
    riskTag: 'Kesme Zorunlu',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: '7–10 gün (ASRA 2025 Grade 2C) / 7 gün (ESAIC/ESRA 2022)',
      preHoldLowCrCl: '7–10 gün (ASRA) / 7 gün (ESAIC/ESRA)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kesin Kontrendike',
      indwellingCatheter: 'Epidural veya derin kateter yerindeyken KESİNLİKLE KONTRENDİKEDİR.',
      postRestart: 'Blok veya kateter çekiminden ≥6 saat (ASRA 2025) / ≥24 saat (ESAIC/ESRA 2022) sonra.',
      bloodyTapNote: 'Kanlı ponksiyonda en az 24 saat erteleyin.',
      superficialBlockNote: 'Yüzeyel komprese edilebilir bloklarda ESAIC/ESRA zorunlu kılmaz ancak derin inhibisyon nedeniyle dikkatle bireyselleştirilmelidir.',
      labThreshold: 'Rutin test yok'
    },
    surgical: {
      highBleedHoldNormal: '7 gün',
      highBleedHoldLowCrCl: '7 gün',
      highBleedRestart: '24 saat içinde (yüksek kanama riskinde 48 sa)',
      lowModBleedHoldNormal: '7 gün',
      lowModBleedHoldLowCrCl: '7 gün',
      lowModBleedRestart: '24 saat içinde',
      bridgingNote: 'En uzun kesme süresi gerektiren P2Y12 inhibitörüdür; erken stentte kardiyoloji konseyi + ASA devam şarttır.'
    },
    rationale:
      'Aktif metabolitine dönüşümü klopidogrelden çok daha hızlı ve tam olduğundan en derin ve uzun süreli trombosit inhibisyonunu yapar; trombosit havuzunun neredeyse tamamen yenilenmesi (7–10 gün) beklenir.',
    antidote: 'Trombosit süspansiyonu (son dozdan ≥6 saat sonra daha etkilidir).',
    guidelines: 'ASRA 5th Ed. (2025), ESAIC/ESRA 2022, 2024 AHA/ACC, 2022 ESC',
    keywords: ['prasugrel', 'effient', 'p2y12', '7 gün', '10 gün', 'dapt']
  },
  {
    id: 'cangrelor_gp2b3a',
    name: 'Kangrelor (IV P2Y12) / GP IIb–IIIa İnhibitörleri (Tirofiban, Eptifibatid)',
    shortName: 'Kangrelor & GP IIb/IIIa (IV)',
    drugClass: 'Antiagregan',
    target: 'Kısa Etkili IV Antiplateletler (P2Y12 / GP IIb–IIIa)',
    halfLife: 'Kangrelor 3–6 dk · Tirofiban/Eptifibatid 2–2.5 sa',
    timeToPeak: 'Anında (IV)',
    renalExcretion: 'Kangrelor plazma defosforilasyon · Tirofiban/Eptifibatid renal',
    riskTag: 'Yüksek Risk / Kontrendike',
    isCrClSensitive: true,
    regional: {
      preHoldNormal: 'Kangrelor: ≥ 3 saat · Tirofiban/Eptifibatid: 4–8 saat · Absiksimab: 24–48 saat',
      preHoldLowCrCl: 'Kangrelor: ≥ 3 saat (CrCl bağımsız) · Tirofiban/Eptifibatid: ≥ 8–12 saat (renal uzama)',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kesin Kontrendike',
      indwellingCatheter: 'Aktif IV Kangrelor veya GP IIb/IIIa infüzyonu altında kateter KESİNLİKLE KONTRENDİKEDİR.',
      postRestart: 'Blok veya kateter çekiminden en az 8 saat sonra (ASRA 2025).',
      bloodyTapNote: 'Kanlı ponksiyonda en az 24 saat erteleme veya alternatif tedavi tartışılır.',
      superficialBlockNote: 'Kritik AKS/stent hastalarında kullanıldığından yüzeyel blokta dahi belirgin kanama riski gözetilir.',
      labThreshold: 'Trombosit sayımı kontrolü (GP IIb/IIIa akut trombositopeni yapabilir!)'
    },
    surgical: {
      highBleedHoldNormal: 'Kangrelor: 1–6 saat (genellikle 1–3 sa) · Tirofiban/Eptifibatid: 4–6 sa',
      highBleedHoldLowCrCl: 'Kangrelor: 1–3 saat · Tirofiban/Eptifibatid: 8–12 sa',
      highBleedRestart: 'Hemostaz sonrası 6–24 saat (oral P2Y12’ye geçiş öncesi)',
      lowModBleedHoldNormal: 'Kangrelor: 1–3 saat',
      lowModBleedHoldLowCrCl: 'Kangrelor: 1–3 saat',
      lowModBleedRestart: '6–12 saat',
      bridgingNote: 'Kangrelor, yeni DES (<30–90 gün) hastalarında ertelenemeyen cerrahi için IV antiplatelet köprüleme (BRIDGE-Cangrelor) amacıyla kullanılır.'
    },
    rationale:
      'Kangrelor 3–6 dakikalık yarılanma ömrüyle kesildikten 1 saat içinde trombosit fonksiyonunu geri kazandırır (nöraksiyel güvenlik marjı 3 saat). GP IIb/IIIa antagonistleri ise son ortak agregasyon yolunu bloke eder ve ciddi trombositopeni yapabilir.',
    antidote: 'İnfüzyonu durdurmak en hızlı çözümdür; GP IIb/IIIa’da (özellikle Absiksimab) trombosit transfüzyonu gerekebilir.',
    guidelines: 'ASRA 5th Ed. (2025), 2024 AHA/ACC, 2022 ESC',
    keywords: ['kangrelor', 'cangrelor', 'tirofiban', 'aggrastat', 'eptifibatid', 'absiksimab', 'gp2b3a', 'köprüleme']
  },

  // ===================== 5. TROMBOLİTİKLER =====================
  {
    id: 'thrombolytics',
    name: 'Trombolitik / Fibrinolitik Ajanlar (Alteplaz tPA, Tenekteplaz)',
    shortName: 'Trombolitikler (tPA / Tenekteplaz)',
    drugClass: 'Trombolitik',
    target: 'Plazminojen Aktivatörü (Fibrin & Fibrinojen Yıkımı)',
    halfLife: 'Plazma 5–24 dk (sistemik hipofibrinojenemi 24–48+ sa)',
    timeToPeak: 'Anında (IV)',
    renalExcretion: 'Hepatik klirens',
    riskTag: 'Yüksek Risk / Kontrendike',
    isCrClSensitive: false,
    regional: {
      preHoldNormal: '≥ 48 saat + Fibrinojen, PT/INR ve aPTT tam normal (ASRA 2025: 10 gün içinde mümkünse kaçın!)',
      preHoldLowCrCl: '≥ 48 saat + Fibrinojen, PT/INR ve aPTT tam normal',
      catheterStatus: 'contraindicated',
      catheterStatusLabel: 'Kateter Kesin Kontrendike',
      indwellingCatheter:
        'Trombolitik tedavi altında nöraksiyel/derin blok KESİNLİKLE KONTRENDİKEDİR. Kateter yerindeyken acil tromboliz uygulandıysa kateter HEMEN ÇEKİLMEZ — fibrinojen düzeyi normalleşene dek beklenir ve her 2 saatte nörolojik muayene yapılır!',
      postRestart: 'Nöraksiyel/derin ponksiyondan sonraki 10 gün içinde trombolizden kaçınılması önerilir (mutlak acil inme/PE dışında; en az 48 sa).',
      bloodyTapNote: 'Tromboliz adayı hastada nöraksiyel blok kontrendikedir.',
      superficialBlockNote: 'Sistemik fibrinoliz sırasında yüzeyel bloklar dahi ciddi hematom riski taşır; yapılmaması önerilir.',
      labThreshold: 'Fibrinojen > 150–200 mg/dL, normal PT/INR ve aPTT'
    },
    surgical: {
      highBleedHoldNormal: 'Elektif/majör cerrahi kontrendike (en az 48 sa + fibrinojen normal)',
      highBleedHoldLowCrCl: 'En az 48 sa + fibrinojen normal',
      highBleedRestart: 'Majör cerrahiden sonraki 14 gün tromboliz göreceli/mutlak kontrendike',
      lowModBleedHoldNormal: '24–48 saat + fibrinojen kontrolü',
      lowModBleedHoldLowCrCl: '24–48 saat + fibrinojen kontrolü',
      lowModBleedRestart: 'Cerrahiye göre bireysel (hemostaz kesin olmalı)',
      bridgingNote: 'Tromboliz sonrası acil cerrahi gerekirse derhal fibrinojen ve kriyopresipitat/TXA hazırlığı yapılır.'
    },
    rationale:
      'Plazma yarılanma ömürleri kısa olsa da dolaşımdaki fibrinojeni tüketir ve oluşmuş fizyolojik pıhtıları eritir. Epidural hematom olgularının en katastrofik grubu trombolitik maruziyetidir.',
    antidote: 'Kriyopresipitat (10 Ü) veya Fibrinojen konsantresi (hedef fibrinojen >150–200 mg/dL) + Traneksamik asit (TXA 1 g IV).',
    guidelines: 'ASRA 5th Ed. (2025), AHA/ASA İnme & ESC PE Kılavuzları',
    keywords: ['trombolitik', 'fibrinolitik', 'tpa', 'alteplaz', 'tenekteplaz', 'fibrinojen', 'kriyopresipitat']
  }
];

export interface AntithromboticReference {
  title: string;
  authors: string;
  journal: string;
  year: string;
  highlight: string;
}

export const ANTITHROMBOTIC_GUIDELINE_REFS: AntithromboticReference[] = [
  {
    title: 'Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy: ASRA Pain Medicine Evidence-Based Guidelines (Fifth Edition)',
    authors: 'Kopp SL, Vandermeulen E, McBane RD, Perlas A, Leffert L, Horlocker TT',
    journal: 'Regional Anesthesia & Pain Medicine (rapm-2024-105766)',
    year: '2025',
    highlight: 'Yeni düşük/yüksek doz DOAC ayrımı (Apiksaban 36/72 sa, Rivaroksaban 24–30/72 sa, Dabigatran 48/72–120 sa), Tikagrelor 5 gün, derin blok = nöraksiyel kuralı, rutin blok için antidot yasağı.'
  },
  {
    title: 'Regional Anaesthesia in Patients on Antithrombotic Drugs: Joint ESAIC/ESRA Guidelines',
    authors: 'Kietaibl S, Ferrandis R, Godier A, Llau J, Lobo C, Macfarlane AJ, et al.',
    journal: 'European Journal of Anaesthesiology, 39(2):100–132',
    year: '2022',
    highlight: 'Tablo 2 (Derin/Komprese edilemeyen vs. Yüzeyel/Komprese edilebilir blok sınıflaması), USG’nin süreleri kısaltmaması, düşük/yüksek doz kesme & kateter çekim süreleri.'
  },
  {
    title: 'Perioperative Management of Antithrombotic Therapy: An American College of Chest Physicians Clinical Practice Guideline',
    authors: 'Douketis JD, Spyropoulos AC, Murad MH, et al. (ACCP / PAUSE)',
    journal: 'CHEST, 162(5):e207–e243',
    year: '2022',
    highlight: 'Yüksek vs. düşük–orta kanama riskli cerrahilerde DOAC (1–2 gün; Dabigatran CrCl <50’de 2–4 gün), Varfarin (5 gün) ve köprüleme yapılmaması (PAUSE/BRIDGE).'
  },
  {
    title: '2024 AHA/ACC/ACS/ASNC/HRS/SCA Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery & 2022 ESC Guidelines',
    authors: 'Thompson A, Fleischmann KE, Smilowitz NR, et al. / Halvorsen S, Mehilli J, et al.',
    journal: 'Circulation (2024) / European Heart Journal (2022)',
    year: '2022–2024',
    highlight: 'DAPT/DES zamanlaması, Aspirin sekonder korumada devam (POISE-2), P2Y12 kesme pencereleri ve IV Kangrelor köprüleme ilkeleri.'
  }
];
