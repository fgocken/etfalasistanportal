export type UrgencyMode = 'elektif' | 'zamana' | 'ivedi' | 'acil';

export type SystemCategory =
  | 'Pre-op / Lojistik'
  | 'Kardiyovasküler'
  | 'Solunum'
  | 'Endokrin / Metabolik'
  | 'Nöroloji / Hematoloji'
  | 'Renal / Hepatik / Gebelik';

export type DecisionType =
  | 'Kesin Erteleme'
  | 'Optimizasyon Gerekli'
  | 'İptal Nedeni Değil';

export interface RelatedPortalLink {
  href: string;
  label: string;
}

export interface CancellationCriterion {
  id: string;
  category: SystemCategory;
  title: string;
  shortThreshold: string;
  threshold: string;
  decision: DecisionType;
  waitDuration: string;
  rationale: string;
  clinicalPearl: string;
  guideline: string;
  evidenceLevel: string;
  plans: Record<UrgencyMode, string>;
  relatedLinks?: RelatedPortalLink[];
  keywords?: string[];
}

export interface UrgencyModeMeta {
  id: UrgencyMode;
  label: string;
  shortLabel: string;
  timeWindow: string;
  clinicalNote: string;
}

export const URGENCY_MODES: UrgencyModeMeta[] = [
  {
    id: 'elektif',
    label: 'Elektif Cerrahi',
    shortLabel: 'Elektif',
    timeWindow: 'Planlı (>3 ay)',
    clinicalNote:
      'Tam optimizasyon zamanı vardır. Kesin erteleme eşiklerindeki hastalar stabilize edilmeden anestezi indüksiyonuna alınmaz; gereksiz iptallerden de kaçınılır.'
  },
  {
    id: 'zamana',
    label: 'Zamana Duyarlı',
    shortLabel: 'Zamana Duyarlı',
    timeWindow: '≤ 3 ay (Onkoloji vb.)',
    clinicalNote:
      'Gecikme sağkalımı veya prognozu bozar. Multidisipliner (anestezi–cerrahi–ilgili branş) risk–yarar dengesi ve hedeflenmiş kısa optimizasyon ön plandadır.'
  },
  {
    id: 'ivedi',
    label: 'İvedi Cerrahi',
    shortLabel: 'İvedi',
    timeWindow: '2 – 24 saat',
    clinicalNote:
      'Yaşam/uzuv tehdidi vardır ancak 2–24 saatlik sınırlı pencerede hızlı optimizasyon (sıvı, K⁺/glukoz, PCC/antidot, yatak başı POCUS, antibiyotik) yapılabilir.'
  },
  {
    id: 'acil',
    label: 'Acil Cerrahi',
    shortLabel: 'Acil',
    timeWindow: '< 2 saat',
    clinicalNote:
      'Yaşam veya uzuv kaybı tehdidi anidir. Hiçbir konsültasyon veya ileri tetkik için cerrahi geciktirilmez; doğrudan ameliyathanede eşzamanlı resüsitasyon ve yüksek riskli yönetim uygulanır.'
  }
];

export const SYSTEM_CATEGORIES: SystemCategory[] = [
  'Pre-op / Lojistik',
  'Kardiyovasküler',
  'Solunum',
  'Endokrin / Metabolik',
  'Nöroloji / Hematoloji',
  'Renal / Hepatik / Gebelik'
];

export const DECISION_TYPES: DecisionType[] = [
  'Kesin Erteleme',
  'Optimizasyon Gerekli',
  'İptal Nedeni Değil'
];

export interface ClinicalScenarioPreset {
  id: string;
  label: string;
  urgency: UrgencyMode;
  criterionIds: string[];
  summary: string;
}

export const CLINICAL_SCENARIO_PRESETS: ClinicalScenarioPreset[] = [
  {
    id: 'onco-des-sglt2',
    label: 'Onkoloji + DES (4. ay) + SGLT-2',
    urgency: 'zamana',
    criterionIds: ['c8', 'c3', 'c20'],
    summary: '4 ay önce DES takılmış, SGLT-2 kesilmemiş ve Hb 9.6 g/dL olan kolon Ca hastası'
  },
  {
    id: 'elective-ht-hba1c',
    label: 'Elektif Protez + Evre 2 HT + HbA1c %9.2',
    urgency: 'elektif',
    criterionIds: ['c11', 'c16', 'c24'],
    summary: 'TA 162/94 mmHg, HbA1c %9.2 ve 3 saat önce su içmiş diz protezi adayı'
  },
  {
    id: 'urgent-hyperk-aki',
    label: 'İvedi Apandisit + K⁺ 5.9 + Dolu Mide',
    urgency: 'ivedi',
    criterionIds: ['c18', 'c1', 'c27'],
    summary: '2 saat önce yemek yemiş, K⁺ 5.9 mEq/L ve akut böbrek hasarı gelişmiş akut batın'
  }
];

export const CANCELLATION_CRITERIA: CancellationCriterion[] = [
  // ======================== 1. PRE-OP / LOJİSTİK ========================
  {
    id: 'c1',
    category: 'Pre-op / Lojistik',
    title: 'Katı Gıda Açlık İhlali',
    shortThreshold: 'Hafif öğün <6 sa · Ağır/yağlı <8 sa',
    threshold: 'Hafif öğün 6 saatten, ağır/yağlı/etli öğün 8 saatten kısa (berrak sıvı erişkin <2 sa, çocuk <1 sa)',
    decision: 'Kesin Erteleme',
    waitDuration: '6–8 saat dolana dek (berrak sıvıda 1–2 sa)',
    rationale:
      'Genel anestezi ve derin sedasyon koruyucu laringeal refleksleri ve alt özofagus sfinkter tonusunu baskılar. Midede katı gıda bulunması halinde regürjitasyon ve pulmoner aspirasyon; kimyasal pnömonit (Mendelson sendromu), ARDS ve havayolu obstrüksiyonuna yol açar. Katıların pilordan geçişi sıfırıncı derece kinetikle yavaş olduğundan hafif öğün için en az 6, yağlı/etli ağır öğün için en az 8 saat gerekir.',
    clinicalPearl:
      'Şüpheli açlık süresinde yatak başı Gastrik POCUS (Perlas 0–2) ile antrum değerlendirilebilir; antrumda katı içerik veya sağ lateral dekübitte >1.5 mL/kg berrak sıvı görülmesi yüksek aspirasyon riskini doğrular.',
    guideline: 'ASA 2017/2023 ve ESAIC 2011/2022 Preoperatif Açlık Kılavuzları',
    evidenceLevel: 'Sınıf I / Temel havayolu güvenliği standardı',
    plans: {
      elektif: 'Hafif öğünde 6 saat, ağır/yağlı öğünde 8 saat tamamlanana kadar elektif vaka ertelenir.',
      zamana: 'Mümkünse aynı gün açlık penceresi tamamlanana kadar liste sonuna alınır; şüphede Gastrik POCUS yapılır.',
      ivedi: 'Klinik durum izin veriyorsa 6 saate tamamlanır veya Gastrik POCUS ile risk değerlendirilip RSI planlanır.',
      acil: 'Erteleme yok; dolu mide kabul edilerek hızlı seri indüksiyon (RSI), baş yukarı pozisyon ve kaflı ETT uygulanır.'
    },
    relatedLinks: [
      { href: '#infografik=adult-fasting', label: 'Erişkin 2-6-8 Açlık' },
      { href: '#infografik=pediatric-fasting', label: 'Pediatrik 6-4-3-1' },
      { href: '#infografik=gastric-usg-perlas', label: 'Gastrik USG (Perlas)' },
      { href: '#infografik=rsi-vs-elective', label: 'RSI Protokolü' }
    ],
    keywords: ['açlık', 'mide', 'aspirasyon', 'mendelson', 'npo', 'yemek', 'su', 'kahvaltı']
  },
  {
    id: 'c2',
    category: 'Pre-op / Lojistik',
    title: 'GLP-1 Reseptör Agonistleri (Yüksek Risk / Semptomatik)',
    shortThreshold: 'Aktif GİS semptomu, doz artışı veya POCUS pozitif',
    threshold: 'Bulantı/kusma/şişkinlik, yeni doz titrasyonu veya Gastrik POCUS’ta katı/yüksek hacimli rezidüel içerik',
    decision: 'Optimizasyon Gerekli',
    waitDuration: 'Risk bazlı: 24 sa sıvı diyet + POCUS (semptomatik/dolu midede erteleme)',
    rationale:
      'GLP-1 agonistleri (semaglutid, tirzepatid, liraglutid vb.) vagal inhibisyonla mide boşalmasını belirgin geciktirir ve standart açlık sürelerine uyulsa dahi rezidüel gastrik içerik (RGC) bırakabilir. 2024 Multisociety Uzlaşısı (ASA/AGA/ASMBS/SAGES/ISPCOP) düşük riskli asemptomatik hastalarda rutin kesme yerine risk stratifikasyonunu; yüksek riskli (doz artış fazı, haftalık yüksek doz, GİS semptomu) hastalarda ise 24 saat berrak sıvı diyeti ve Gastrik POCUS kullanımını önerir.',
    clinicalPearl:
      'Aktif bulantı/kusma/karın ağrısı varsa veya POCUS’ta katı içerik/Perlas Grade 2 (>1.5 mL/kg) saptanırsa elektif işlem ertelenmelidir. Asemptomatik, uzun süredir stabil dozda ve POCUS Grade 0–1 hastada vaka iptal edilmeden güvenle ilerlenebilir.',
    guideline: '2024 Multisociety GLP-1 Uzlaşısı (ASA/AGA/ASMBS/SAGES/ISPCOP) ve ESAIC 2025',
    evidenceLevel: 'Çoklu Dernek Klinik Pratik Uzlaşısı — Gastrik POCUS güçlü öneri',
    plans: {
      elektif: 'Aktif GİS semptomu veya POCUS’ta dolu mide varsa ertelenir; asemptomatik yüksek riskte 24 sa berrak sıvı diyeti + POCUS uygulanır.',
      zamana: 'İşlemden önceki 24 saat berrak sıvı diyeti planlanır; ameliyat sabahı Gastrik POCUS ile antrum doğrulanır.',
      ivedi: 'Gastrik POCUS yapılır; dolu mide bulgusunda veya POCUS yoksa RSI + aspirasyon önlemleriyle işleme alınır.',
      acil: 'Erteleme yok; dolu mide kabul edilerek RSI, baş 30° elevasyon ve gerekirse prokinetik/NG dekompresyon uygulanır.'
    },
    relatedLinks: [
      { href: '#infografik=gastric-usg-perlas', label: 'Gastrik USG (Perlas 0–2)' },
      { href: '#infografik=adult-fasting', label: 'GLP-1 & Açlık Rehberi' },
      { href: '#infografik=rsi-vs-elective', label: 'RSI Protokolü' }
    ],
    keywords: ['glp-1', 'ozempic', 'wegovy', 'mounjaro', 'semaglutid', 'liraglutid', 'tirzepatid', 'pocus']
  },
  {
    id: 'c3',
    category: 'Pre-op / Lojistik',
    title: 'SGLT-2 İnhibitörü Kesilmemesi',
    shortThreshold: 'İşlemden 3–4 gün önce kesilmemiş',
    threshold: 'Empagliflozin/Dapagliflozin/Kanagliflozin <3 gün, Ertugliflozin <4 gün kesilmemiş',
    decision: 'Optimizasyon Gerekli',
    waitDuration: '3 gün (Ertugliflozin 4 gün)',
    rationale:
      'SGLT-2 inhibitörleri renal glukoz atılımını artırırken insülin salınımını düşürür ve glukagonu yükseltir. Cerrahi stres ve açlıkla birleştiğinde normal veya hafif yüksek kan şekerinde dahi (<200–250 mg/dL) ağır yüksek anyon açıklı metabolik asidozla seyreden öglisemik diyabetik ketoasidoz (öDKA) gelişebilir; normoglisemi nedeniyle tanı tehlikeli biçimde gecikebilir.',
    clinicalPearl:
      'Kesilmeden gelen acil/ivedi hastalarda kan şekerine aldanmayın! İntraoperatif ve postoperatif ilk 24–48 saatte arteriyel/venöz kan gazında pH, baz fazlası, anyon açığı ve kan β-hidroksibütirat (<0.6 mmol/L) takibi yapın; kalp yetmezliği endikasyonuyla kullanan minör günübirlik olgularda risk–yarar dengesini gözetin.',
    guideline: '2024 AHA/ACC Perioperatif Kılavuzu, FDA Güvenlik Uyarısı ve ADA 2024',
    evidenceLevel: 'Sınıf I / Güçlü öneri (öDKA önlenmesi)',
    plans: {
      elektif: 'Orta–yüksek riskli veya uzamış açlık gerektiren elektif cerrahide 3–4 gün (ertugliflozin 4 gün) kesilmemişse ertele.',
      zamana: 'Kısa 3–4 günlük kesme penceresi çoğu onkolojik vakada güvenle beklenebilir; beklenemiyorsa seri keton/AKG takibi yapılır.',
      ivedi: 'SGLT-2 hemen kesilir; preop AKG + kan ketonu bakılır, hidrasyon ve bazal insülin desteğiyle yakın metabolik takipte alınır.',
      acil: 'Erteleme yok; intraop/postop seri AKG, anyon açığı ve kapiller/kan keton izlemi (oral alım başlayana dek yeniden başlanmaz).'
    },
    relatedLinks: [
      { href: '#arac=abg', label: 'Yatak Başı AKG & Anyon Açığı' },
      { href: '#infografik=diuretics-nephron', label: 'SGLT2i & Nefron İnfo' }
    ],
    keywords: ['sglt2', 'sglt-2', 'empagliflozin', 'dapagliflozin', 'jardiance', 'forxiga', 'ödka', 'ketoasidoz']
  },
  {
    id: 'c4',
    category: 'Pre-op / Lojistik',
    title: 'Antikoagülan / Antiagregan Kesilmemesi',
    shortThreshold: 'Güvenli eliminasyon penceresi sağlanmamış',
    threshold: 'Yüksek kanama riskli cerrahi veya nöraksiyel blokta DOAC/Varfarin/P2Y12 kesme süresi eksik',
    decision: 'Kesin Erteleme',
    waitDuration: 'DOAC 24–72 sa · Varfarin 5 g · Klopidogrel 5 g · Tikagrelor 3–5 g · Prasugrel 7 g',
    rationale:
      'Yetersiz kesme süresiyle yüksek kanama riskli cerrahi veya spinal/epidural blok uygulanması; kontrolsüz hemoraji ve kalıcı paraplejiye yol açabilen spinal/epidural hematom riski doğurur. DOAC eliminasyonu böbrek fonksiyonuna bağlıdır (özellikle Dabigatran CrCl <50 mL/dk’da 72–96 saate uzar).',
    clinicalPearl:
      'PAUSE protokolüne göre çoğu DOAC için rutin heparin köprülemesi YAPILMAZ (kanamayı artırır, trombozu azaltmaz). Aspirin monoterapisi ise intrakraniyal, intraspinal ve posterior göz cerrahisi dışındaki çoğu non-kardiyak cerrahide ve nöraksiyel blokta KESİLMEZ.',
    guideline: '2024 AHA/ACC, 2022 ESC, PAUSE Çalışması ve ASRA/ESAIC Rejyonel Kılavuzları',
    evidenceLevel: 'Sınıf I / Yüksek kanıt (PAUSE & BRIDGE)',
    plans: {
      elektif: 'Yüksek kanama riskli cerrahi veya nöraksiyel blokta ilaç ve CrCl’ye uygun pencere dolana dek ertelenir.',
      zamana: 'Uygun kesme penceresi (2–5 gün) beklenir; sadece nöraksiyel engel varsa genel anestezi alternatifi değerlendirilir.',
      ivedi: 'Son doz zamanı, CrCl ve INR/anti-Xa düzeyi değerlendirilir; gerekirse IV K vitamini/4F-PCC veya spesifik antidot ile hazırlanır.',
      acil: 'Erteleme yok; Varfarin’de 4F-PCC + IV K vit, Dabigatran’da İdarusizumab, Xa inh.’de Andeksanet/4F-PCC ve hemostaz protokolü.'
    },
    relatedLinks: [
      { href: '#arac=nerve-blocks', label: 'Nöraksiyel Blok Güvenliği' },
      { href: '#arac=vascular-access', label: 'Koagülasyon Tabloları' },
      { href: '#arac=emergencies&sub=mtp', label: 'Masif Transfüzyon (MTP)' }
    ],
    keywords: ['doac', 'noac', 'apiksaban', 'rivaroksaban', 'dabigatran', 'varfarin', 'coumadin', 'klopidogrel', 'plavix', 'tikagrelor', 'prasugrel', 'aspirin', 'spinal']
  },
  {
    id: 'c5',
    category: 'Pre-op / Lojistik',
    title: 'Onam, Kan Hazırlığı veya YBÜ Yatağı Eksikliği',
    shortThreshold: 'Yasal onam yok veya majör cerrahide kritik kaynak eksik',
    threshold: 'Bilgilendirilmiş onam eksikliği, cross-match kan ürünü yokluğu veya zorunlu postop YBÜ yatağının olmaması',
    decision: 'Kesin Erteleme',
    waitDuration: 'Eksik hukuki veya lojistik şart tamamlanana dek',
    rationale:
      'Elektif girişimde geçerli bilgilendirilmiş anestezi/cerrahi onamının olmaması mutlak etik ve medikolegal engeldir. Yüksek kanama riskli cerrahide cross-match kan ürünlerinin veya ASA III–IV majör olguda postoperatif yoğun bakım yatağının hazır olmaması, öngörülebilir komplikasyonların yönetimini imkansız kılar.',
    clinicalPearl:
      'WHO Güvenli Cerrahi Kontrol Listesi’nin “Sign-In” fazı anestezi indüksiyonundan ÖNCE tamamlanmalıdır. Postop YBÜ endikasyonu olan elektif hasta, yatak teyidi alınmadan ameliyathane masasına yatırılmamalıdır.',
    guideline: 'WHO Güvenli Cerrahi Kontrol Listesi ve TARD / ASA Temel Güvenlik Standartları',
    evidenceLevel: 'Mutlak güvenlik ve medikolegal zorunluluk',
    plans: {
      elektif: 'Onam, gerekli kan ürünleri ve zorunlu YBÜ rezervasyonu teyit edilmeden anestezi indüksiyonu yapılmaz.',
      zamana: 'Hızlı kan tedariki ve YBÜ yatak koordinasyonu tamamlanarak en yakın uygun slota alınır.',
      ivedi: 'Acil kan bankası aktivasyonu ve YBÜ/PACU geçiş planı eşzamanlı yürütülerek gecikmeden hazırlanır.',
      acil: 'Yaşam kurtarıcı acil prosedür uygulanır; 0 Rh(-) acil kan/MTP aktive edilir, yasal acil tutanak düzenlenir.'
    },
    relatedLinks: [
      { href: '#arac=icu', label: 'YBÜ Yatış Kriterleri' },
      { href: '#arac=emergencies&sub=mtp', label: 'Masif Transfüzyon (MTP)' }
    ],
    keywords: ['onam', 'kan', 'cross', 'cross-match', 'ybü', 'yoğun bakım', 'who', 'checklist', 'lojistik']
  },
  {
    id: 'c24',
    category: 'Pre-op / Lojistik',
    title: 'Berrak Sıvı (≥2 sa / Çocuk ≥1 sa) veya Sakız Çiğneme',
    shortThreshold: 'Şekersiz sakız (yutulmamış) · Uygun berrak sıvı',
    threshold: 'Erişkinde ≥2 sa / çocukta ≥1 sa önce alınmış berrak sıvı veya yutulmamış sakız çiğneme',
    decision: 'İptal Nedeni Değil',
    waitDuration: 'Bekleme / iptal gerekmez',
    rationale:
      'ASA 2023 ve ESAIC 2022 kanıtları, sakız çiğnemenin (yutulmadığı sürece) gastrik hacmi klinik olarak anlamlı artırmadığını ve mide pH’ını bozmadığını göstermektedir. Gereksiz uzamış susuzluk ise özellikle çocuklarda ve yaşlılarda hipovolemi, indüksiyon hipotansiyonu, insülin direnci, hipoglisemi ve postoperatif deliryumu artırır.',
    clinicalPearl:
      'Yutulan sakız katı gıda gibi değerlendirilir (6 saat); ancak yutulmadan çıkarılan sakız kesinlikle vaka erteleme/iptal nedeni değildir! Süt/krema eklenmiş kahve katı gıda sayılır, sade su/çay/elma suyu ise berrak sıvıdır.',
    guideline: 'ASA 2023 Preoperatif Açlık Güncellemesi ve ESAIC 2022 Pediatrik Açlık Kılavuzu',
    evidenceLevel: 'Sınıf I / Güçlü öneri — Gereksiz iptalden kaçınılmalı',
    plans: {
      elektif: 'Vaka ertelenmez ve iptal edilmez; ağız içi kontrol edilip sakız çıkarıldıktan sonra güvenle işleme alınır.',
      zamana: 'Doğrudan işleme alınır.',
      ivedi: 'Doğrudan işleme alınır.',
      acil: 'Doğrudan işleme alınır.'
    },
    relatedLinks: [
      { href: '#infografik=adult-fasting', label: 'Erişkin 2-6-8 Açlık' },
      { href: '#infografik=pediatric-fasting', label: 'Pediatrik 6-4-3-1' }
    ],
    keywords: ['sakız', 'berrak sıvı', 'su', 'çay', 'iptal değil', 'gereksiz iptal', 'açlık']
  },

  // ======================== 2. KARDİYOVASKÜLER ========================
  {
    id: 'c6',
    category: 'Kardiyovasküler',
    title: 'Aktif Kardiyak Durum (AKS, Dekompanse KY, Ağır AS, Ciddi Aritmi)',
    shortThreshold: 'Stabil olmayan iskemi, dekompanse KY, ağır kapak/aritmi',
    threshold: 'Unstabil angina/AKS, akut dekompanse KY, semptomatik ağır Aort/Mitral darlığı veya yüksek dereceli AV blok / hızlı kontrolsüz AF',
    decision: 'Kesin Erteleme',
    waitDuration: 'Kardiyolojik medikal/girişimsel stabilizasyon sağlanana dek',
    rationale:
      'Anestezi indüksiyonundaki vazodilatasyon, miyokard depresyonu ve laringoskopik sempatik yanıt; koroner veya kapak rezervi tükenmiş kalpte ani sunum–talep çöküşüne, refrakter hipotansiyona, akut pulmoner ödeme ve perioperatif kardiyak arreste yol açar. Öncelikli kardiyolojik tedavi yapılmadan elektif cerrahi kabul edilemez MACE ve mortalite taşır.',
    clinicalPearl:
      'Ağır Aort Stenozunda (AVA <1.0 cm², ortalama gradiyent ≥40 mmHg) sinüs ritmi, yeterli preload ve SVR korunması (Fenilefrin/Noradrenalin) hayati önem taşır; ani vazodilatasyon (spinal anestezi!) ölümcül koroner hipoperfüzyon kısır döngüsü başlatır.',
    guideline: '2024 AHA/ACC ve 2022 ESC Non-Kardiyak Cerrahi Kılavuzları',
    evidenceLevel: 'Sınıf I (Aktif kardiyak durumda elektif cerrahi ertelenmeli)',
    plans: {
      elektif: 'Elektif cerrahi kesinlikle ertelenir; kardiyoloji tarafından revaskülarizasyon, TAVİ/kapak veya KY/ritim tedavisi yapılır.',
      zamana: 'Multidisipliner Kalp–Cerrahi–Anestezi konseyi; köprü balon valvüloplasti/TAVİ veya agresif IV diürez/hız kontrolü değerlendirilir.',
      ivedi: 'Sınırlı sürede kardiyoloji + POCUS/EKO ile hızlı diürez, hız kontrolü veya geçici pacemaker hazırlığı yapılıp invaziv monitörle alınır.',
      acil: 'İndüksiyon öncesi invaziv arter, santral kateter, vazoaktif pompa ve gerekirse TEE/defibrilatör pedleri eşliğinde hayati cerrahi.'
    },
    relatedLinks: [
      { href: '#arac=preop&sub=mace', label: 'MACE Risk Hesaplayıcı' },
      { href: '#arac=preop&sub=dasi', label: 'DASI (METs)' },
      { href: '#infografik=vasoactive-decision-matrix', label: 'Vazoaktif Karar Matrisi' },
      { href: '#infografik=surgical-risk', label: 'ESC Cerrahi Risk' }
    ],
    keywords: ['aks', 'kalp yetmezliği', 'dekompanse', 'aort stenozu', 'as', 'aritmi', 'av blok', 'af', 'mace']
  },
  {
    id: 'c7',
    category: 'Kardiyovasküler',
    title: 'Yakın Dönem Akut Miyokard Enfarktüsü (MI)',
    shortThreshold: 'Son 60 gün içinde geçirilmiş MI',
    threshold: 'Son 60 gün içinde geçirilmiş STEMI veya NSTEMI (ilk 30 gün en yüksek mortalite)',
    decision: 'Kesin Erteleme',
    waitDuration: 'En az 60 gün (ilk 30 gün mutlak kaçınma)',
    rationale:
      'Akut MI sonrası enfarkt bölgesi mekanik ve elektriksel olarak instabildir. Cerrahinin yarattığı protrombotik ortam, katekolamin artışı, taşikardi ve anemi; re-enfarktüs ve ölümcül ventriküler aritmi riskini dramatik biçimde yükseltir. İlk 60 gün içinde yapılan non-kardiyak cerrahilerde 30 günlük MACE ve mortalite belirgin yüksektir.',
    clinicalPearl:
      '60 gün geçtikten sonra dahi hastanın koroner stent tipi (DES/BMS) ve rezidüel iskemi/EF durumu ayrıca değerlendirilmelidir. Zorunlu cerrahide perioperatif beta-bloker/statin sürdürülür, taşikardi/hipotansiyon önlenir ve postop seri hs-Troponin (MINS taraması) alınır.',
    guideline: '2024 AHA/ACC Perioperatif Kardiyovasküler Yönetim Kılavuzu',
    evidenceLevel: 'Sınıf I / IIa (İlk 60 gün elektif cerrahi ertelenmelidir)',
    plans: {
      elektif: 'En az 60 gün ertelenir; sonrasında stent durumu, EF ve fonksiyonel kapasite (DASI) ile yeniden değerlendirilir.',
      zamana: '30–60 gün arasında yalnızca ertelenemeyen onkolojik vb. vakada kardiyoloji konseyiyle ve sıkı anti-iskemik protokolle değerlendirilir.',
      ivedi: 'Kardiyoloji onayı, seri EKG/troponin, invaziv arter monitörizasyonu ve hedeflenmiş hemodinamiyle (MAP ≥65, KAH/taşikardi önleme) alınır.',
      acil: 'Erteleme yok; anti-iskemik strateji, invaziv arter, Hb ≥8–9 g/dL hedefi ve postop YBÜ + seri hs-Troponin takibi.'
    },
    relatedLinks: [
      { href: '#arac=preop&sub=mace', label: 'MACE Risk (RCRI/Gupta)' },
      { href: '#infografik=surgical-urgency-2024', label: 'AHA/ACC 2024 Zamanlama' }
    ],
    keywords: ['mi', 'enfarktüs', 'kalp krizi', 'stemi', 'nstemi', 'troponin', 'mins']
  },
  {
    id: 'c8',
    category: 'Kardiyovasküler',
    title: 'İlaç Salınımlı Stent (DES)',
    shortThreshold: 'Kronik KAH <6 ay · AKS/kompleks <12 ay',
    threshold: 'Yeni nesil DES sonrası Kronik KAH’ta <6 ay, AKS veya kompleks stentte <12 ay (ilk 30 gün mutlak yasak)',
    decision: 'Kesin Erteleme',
    waitDuration: 'Elektif 6–12 ay · Zamana duyarlı ≥3 ay (ilk 30 gün Sınıf III Zarar)',
    rationale:
      'DES üzerindeki antiproliferatif ilaçlar damar endotelizasyonunu yavaşlatır. Cerrahiye bağlı hiperkoagülabilite döneminde ikili antiagregan tedavinin (DAPT) erken kesilmesi, mortalitesi %40’ı aşabilen akut stent trombozunu tetikler. İlk 30 gün içinde DAPT kesilerek elektif cerrahi yapılması kesinlikle zararlıdır (Class III: Harm).',
    clinicalPearl:
      'P2Y12 inhibitörü (klopidogrel/tikagrelor/prasugrel) kesilmek zorundaysa Aspirin mümkün olan her vakada KESİNTİSİZ sürdürülür ve cerrahi hemostaz sağlandığında P2Y12 en geç 24–48 saatte yeniden başlanır. İlk 30–90 günde acil/yüksek riskli cerrahide IV Kangrelor köprüleme tartışılır.',
    guideline: '2024 AHA/ACC Perioperatif Kardiyovasküler Yönetim Kılavuzu',
    evidenceLevel: 'İlk 30 gün Sınıf III (Zarar); Elektif CCD 6 ay / AKS 12 ay (Sınıf I–IIa)',
    plans: {
      elektif: 'Kronik KAH’ta en az 6 ay, AKS veya kompleks stent sonrası en az 12 ay ertelenir.',
      zamana: '3. aydan sonra multidisipliner kararla Aspirin devamı eşliğinde P2Y12 geçici kesilmesi değerlendirilebilir.',
      ivedi: 'Düşük/orta kanama riskli cerrahide DAPT sürdürülür; yüksek kanama riskinde kardiyolojiyle Aspirin devamı veya IV Kangrelor köprüleme planlanır.',
      acil: 'İlk 30 günde mümkünse DAPT sürdürülür; kanama tehdidinde en azından Aspirin devam edilir, trombosit hazırlığı ve acil kateter lab yedeği planlanır.'
    },
    relatedLinks: [
      { href: '#arac=preop&sub=mace', label: 'MACE Risk Hesaplayıcı' },
      { href: '#infografik=surgical-urgency-2024', label: 'AHA/ACC 2024 Zamanlama' }
    ],
    keywords: ['des', 'stent', 'dapt', 'antiagregan', 'aspirin', 'klopidogrel', 'kangrelor', 'koroner']
  },
  {
    id: 'c9',
    category: 'Kardiyovasküler',
    title: 'Çıplak Metal Stent (BMS) / Balon Anjiyoplasti',
    shortThreshold: 'BMS <30 gün · Balon <14 gün',
    threshold: 'Stentsiz balon anjiyoplastide <14 gün, çıplak metal stentte (BMS) <30 gün',
    decision: 'Kesin Erteleme',
    waitDuration: 'Balon ≥14 gün · BMS ≥30 gün',
    rationale:
      'Balon anjiyoplastide damar intimasının iyileşmesi ve akut elastik recoil/tromboz riskinin gerilemesi için en az 14 gün; çıplak metal stentte ise stent tellerinin endotel ile kaplanması için en az 30 günlük kesintisiz DAPT gereklidir.',
    clinicalPearl:
      'Süre dolmadan zorunlu cerrahi gerekiyorsa DAPT’nin kesilmeden sürdürülmesi veya en azından Aspirin’in korunması kardiyolojiyle birlikte kararlaştırılır.',
    guideline: '2024 AHA/ACC Perioperatif Kardiyovasküler Yönetim Kılavuzu',
    evidenceLevel: 'Sınıf I (Zamanlama eşiği)',
    plans: {
      elektif: 'Balon sonrası 14 gün, BMS sonrası 30 gün tamamlanana dek elektif cerrahi ertelenir.',
      zamana: 'Kısa süreler (14–30 gün) çoğu zamana duyarlı vakada güvenle beklenir; beklenemiyorsa DAPT devamı değerlendirilir.',
      ivedi: 'Kardiyoloji görüşüyle mümkünse DAPT kesilmeden (veya en azından Aspirin altında) kanama kontrolüyle ilerlenir.',
      acil: 'Erteleme yok; kanama–tromboz dengesi cerrahla birlikte intraoperatif yönetilir, postop erken antiagregan başlanır.'
    },
    relatedLinks: [
      { href: '#arac=preop&sub=mace', label: 'MACE Risk Hesaplayıcı' }
    ],
    keywords: ['bms', 'balon', 'ptca', 'anjiyoplasti', 'stent', 'dapt']
  },
  {
    id: 'c10',
    category: 'Kardiyovasküler',
    title: 'Evre 3 Hipertansiyon (≥180/110 mmHg)',
    shortThreshold: '≥180/110 mmHg (inatçı / hedef organ hasarı)',
    threshold: 'İstirahat tekrarlı ölçümlerde SKB ≥180 mmHg veya DKB ≥110 mmHg (özellikle yeni hedef organ hasarıyla)',
    decision: 'Optimizasyon Gerekli',
    waitDuration: 'Antihipertansif regülasyon sağlanana dek (genellikle 1–2 hafta)',
    rationale:
      '≥180/110 mmHg kontrolsüz hipertansiyonda serebral/renal otoregülasyon sağa kaymıştır ve vasküler kompliyans azalmıştır. Bu durum indüksiyonda derin hipotansiyon ve entübasyonda şiddetli hipertansif piklerle seyreden aşırı hemodinamik labilite yaratır; özellikle yeni/kötüleşen hedef organ hasarında (LVH, iskemi, ABH, retinopati) MACE ve inme riski yükselir.',
    clinicalPearl:
      'Pre-op salonda tek seferlik agresif IV antihipertansifle tansiyonu hızla düşürüp vakaya almak YANLIŞTIR (serebral/koroner hipoperfüzyon riski!). Önce ağrı/anksiyete ve beyaz önlük hipertansiyonunu dışlayın, 15 dk dinlenme sonrası tekrar ölçün; inatçı ≥180/110 mmHg ve hedef organ hasarı varsa erteleyin.',
    guideline: '2024 AHA/ACC ve 2022 ESC Non-Kardiyak Cerrahi Kılavuzları',
    evidenceLevel: 'Sınıf IIb (Hedef organ hasarı veya inatçı ≥180/110’da erteleme değerlendirilir)',
    plans: {
      elektif: 'Dinlenme sonrası inatçı ≥180/110 mmHg ve/veya yeni hedef organ hasarı varsa elektif cerrahi ertelenip oral tedavi düzenlenir.',
      zamana: 'Hedef organ krizi yoksa kısa süreli oral regülasyon sonrası invaziv arter takibi ve bazal ±%20 MAP hedefiyle ilerlenebilir.',
      ivedi: 'Akut hedef organ hasarı (diseksiyon, ödem, ensefalopati) dışlanır; IV titre edilebilir ajanla (Nikardipin/Esmolol) kademeli kontrol sağlanır.',
      acil: 'Erteleme yok; indüksiyon öncesi arteriyel hat + IV titre edilebilir kısa etkili ajanlarla (Esmolol, Nikardipin, Labetalol) yönetim.'
    },
    relatedLinks: [
      { href: '#arac=preop&sub=mace', label: 'MACE Risk Hesaplayıcı' },
      { href: '#arac=monitoring&sub=ibp-monitoring', label: 'İnvaziv Arter (IBP)' }
    ],
    keywords: ['hipertansiyon', 'tansiyon', '180', '110', 'evre 3', 'skb', 'dkb', 'nikardipin', 'esmolol']
  },
  {
    id: 'c11',
    category: 'Kardiyovasküler',
    title: 'Evre 1–2 Hipertansiyon (<180/110 mmHg)',
    shortThreshold: '<180/110 mmHg (hedef organ krizi yok)',
    threshold: 'SKB <180 mmHg ve DKB <110 mmHg (akut hedef organ hasarı olmaksızın)',
    decision: 'İptal Nedeni Değil',
    waitDuration: 'Bekleme / iptal gerekmez',
    rationale:
      'Randomize ve büyük gözlemsel çalışmalar, 180/110 mmHg altındaki izole hipertansiyon nedeniyle elektif cerrahiyi ertelemenin perioperatif kardiyovasküler olayları veya mortaliteyi azaltmadığını kanıtlamıştır. Gereksiz iptaller hastada tedavi gecikmesine ve kaynak israfına yol açar.',
    clinicalPearl:
      'Kronik beta-bloker ve kalsiyum kanal blokerleri ameliyat sabahı bir yudum suyla alınır. 2024 AHA/ACC kılavuzuna göre yalnızca hipertansiyon endikasyonuyla kullanılan ACEi/ARB’lerin ameliyattan 24 saat önce kesilmesi (Class IIb) refrakter indüksiyon hipotansiyonunu azaltabilir.',
    guideline: '2024 AHA/ACC ve 2022 ESC Non-Kardiyak Cerrahi Kılavuzları',
    evidenceLevel: 'Sınıf III (Yararsız — yalnızca bu nedenle erteleme yapılmamalı)',
    plans: {
      elektif: 'Hedef organ hasarı yoksa erteleme/iptal yapılmaz; antihipertansif rejim yönetilerek güvenle işleme alınır.',
      zamana: 'Doğrudan işleme alınır.',
      ivedi: 'Doğrudan işleme alınır.',
      acil: 'Doğrudan işleme alınır.'
    },
    relatedLinks: [
      { href: '#arac=preop&sub=mace', label: 'MACE Risk Hesaplayıcı' }
    ],
    keywords: ['hipertansiyon', 'evre 1', 'evre 2', 'tansiyon', 'acei', 'arb', 'iptal değil']
  },
  {
    id: 'c29',
    category: 'Kardiyovasküler',
    title: 'İzole Asemptomatik VES / SVES veya Kronik Stabil Dal Bloğu',
    shortThreshold: 'Yapısal hastalık / iskemi / elektrolit bozukluğu yok',
    threshold: 'Asemptomatik izole prematüre atımlar (VES/SVES), RBBB veya bilinen eski/stabil LBBB',
    decision: 'İptal Nedeni Değil',
    waitDuration: 'Bekleme / iptal gerekmez',
    rationale:
      'Altta yatan aktif miyokard iskemisi, yapısal kalp hastalığı (düşük EF), senkop veya elektrolit dengesizliği (K⁺/Mg²⁺) olmaksızın görülen izole asemptomatik VES/SVES, RBBB veya önceden bilinen stabil LBBB; perioperatif tam AV blok veya MACE riskini anlamlı artırmaz ve profilaktik pacemaker gerektirmez.',
    clinicalPearl:
      'Önceki EKG ile karşılaştırın! YENİ gelişmiş LBBB veya bifasiküler blok + senkop öyküsü varsa aktif iskemi / ileti sistemi hastalığı açısından kardiyoloji değerlendirmesi gerekir; kronik bilinen stabil dal bloğu ise vaka iptal nedeni değildir.',
    guideline: '2024 AHA/ACC ve 2022 ESC Non-Kardiyak Cerrahi Kılavuzları',
    evidenceLevel: 'Sınıf III (İzole asemptomatik bulguda rutin ileri tetkik/erteleme yararsız)',
    plans: {
      elektif: 'Yeni başlangıçlı LBBB, iskemi ve K⁺/Mg²⁺ bozukluğu dışlandıysa vaka ertelenmez.',
      zamana: 'Doğrudan işleme alınır; standart 5-derivasyon EKG takibi yeterlidir.',
      ivedi: 'K⁺ ve Mg²⁺ kontrolü ile doğrudan işleme alınır.',
      acil: 'Doğrudan işleme alınır.'
    },
    relatedLinks: [
      { href: '#arac=monitoring&sub=ecg-monitoring', label: 'EKG Monitörizasyonu' },
      { href: '#tedavi=potassium', label: 'Potasyum Yönetimi' }
    ],
    keywords: ['ves', 'sves', 'rbbb', 'lbbb', 'dal bloğu', 'ekg', 'ekstrasistol', 'iptal değil']
  },

  // ======================== 3. SOLUNUM ========================
  {
    id: 'c12',
    category: 'Solunum',
    title: 'Akut Ateşli ÜSYE / ASYE veya Pnömoni',
    shortThreshold: '>38°C ateş, pürülan sekresyon, ronküs/wheezing',
    threshold: 'Ateş >38°C, pürülan balgam/rinore, öksürük krizi, ronküs/ral/stridor veya akut pnömoni',
    decision: 'Kesin Erteleme',
    waitDuration: 'Ateşli ÜSYE 2–4 hafta · ASYE / Pnömoni 4–6 hafta',
    rationale:
      'Viral ve bakteriyel solunum yolu enfeksiyonları bronşiyal epitel hasarı, artmış mukus sekresyonu ve vagal afferent duyarlılık üzerinden belirgin havayolu hiperreaktivitesi oluşturur. Entübasyon veya LMA yerleşimi sırasında laringospazm, şiddetli bronkospazm, desatürasyon ve postoperatif pnömoni riski (PRAE) 2–7 kat artar; epitel onarımı 2–6 hafta sürer.',
    clinicalPearl:
      'Pediatrik olgularda özellikle <1 yaş, prematürite, pasif sigara maruziyeti, KBB/havayolu cerrahisi ve ETT gereksinimi PRAE riskini katlar. Acil/ivedi olguda mümkünse rejyonel anestezi, değilse derin indüksiyon, kısa etkili β₂-agonist hazırlığı ve LMA/ETT dikkatle seçilir.',
    guideline: 'APA / ESPA Pediatrik Anestezi ve ESAIC Perioperatif Solunum Konsensüsleri',
    evidenceLevel: 'Yüksek perioperatif solunumsal advers olay (PRAE) riski',
    plans: {
      elektif: 'Ateşli ÜSYE’de 2–4 hafta, ASYE/pnömonide 4–6 hafta (semptom ve akciğer bulguları tam düzelene dek) ertelenir.',
      zamana: 'Risk–yarar değerlendirilir; mümkünse rejyonel/nöroaksiyel anestezi veya enfeksiyonun akut pikinin geçmesi beklenir.',
      ivedi: 'Bronkodilatör + antipiretik/antibiyotik başlanır; mümkünse rejyonel teknik, genel anestezide derin indüksiyon ve sekresyon kontrolü.',
      acil: 'Erteleme yok; nebülize salbutamol/ipratropium hazırlığı, derin anestezi, akciğer koruyucu ventilasyon ve yakın postop SpO₂ takibi.'
    },
    relatedLinks: [
      { href: '#infografik=difficult-airway-das', label: 'Zor Havayolu (DAS 2025)' },
      { href: '#infografik=respiratory-failure', label: 'Solunum Yetmezliği Tip 1–4' }
    ],
    keywords: ['üsye', 'asye', 'pnömoni', 'ateş', 'öksürük', 'balgam', 'laringospazm', 'bronkospazm', 'prae', 'pediatrik']
  },
  {
    id: 'c13',
    category: 'Solunum',
    title: 'COVID-19 (SARS-CoV-2) Enfeksiyonu',
    shortThreshold: 'Pozitif test sonrası akut ve erken nekahat',
    threshold: 'İlk 2 hafta akut dönem; 2–7 hafta arası risk bazlı (orta–ağır / rezidüel semptom)',
    decision: 'Optimizasyon Gerekli',
    waitDuration: 'Asemptomatik/Hafif ≥2 hafta · Orta–Ağır/Yatışlı ≥7 hafta',
    rationale:
      'SARS-CoV-2 enfeksiyonu akut dönemde bulaştırıcılık ve hiperenflamasyon yaratır; orta–ağır enfeksiyon geçirenlerde endotelyal hasar, protrombotik durum ve subklinik pulmoner tutulum nedeniyle ilk 7 hafta içinde yapılan cerrahilerde postoperatif pulmoner komplikasyon, VTE ve 30 günlük mortalite belirgin artar.',
    clinicalPearl:
      'ASA/APSF Haziran 2023 güncellemesi artık tüm vakalar için sabit 7 hafta yerine risk temelli yaklaşım getirmiştir: ilk 2 hafta elektif cerrahi yapılmaz; 2–7 hafta arasında hasta kırılganlığı, aşılama, rezidüel semptom ve cerrahi riskine göre karar verilir; orta–ağır/rezidüel semptomlu vakada ≥7 hafta beklenir.',
    guideline: 'ASA / APSF 2023 Ortak Güncellemesi ve UK Multidisipliner Konsensüsü',
    evidenceLevel: 'Risk temelli zamanlama (İlk 2 hf ertele; orta–ağır/semptomatikte ≥7 hf)',
    plans: {
      elektif: 'İlk 2 hafta tüm elektif cerrahiler ertelenir; orta–ağır hastalıkta veya süren semptomda en az 7 hafta beklenir.',
      zamana: '2–7 hafta aralığında aşılama durumu, fonksiyonel kapasite ve cerrahi büyüklüğe göre multidisipliner karar verilir.',
      ivedi: 'İzolasyon önlemleri, akciğer koruyucu ventilasyon (6–8 mL/kg PBW), VTE profilaksisi ve rejyonel anestezi önceliğiyle alınır.',
      acil: 'Erteleme yok; tam KKE/izolasyon, akciğer koruyucu ventilasyon ve postop tromboprofilaksi uygulanır.'
    },
    relatedLinks: [
      { href: '#infografik=respiratory-failure', label: 'Solunum Yetmezliği Tip 1–4' },
      { href: '#arac=mechanical-ventilation&sub=oxygen-therapy', label: 'Oksijen Tedavisi Modülü' }
    ],
    keywords: ['covid', 'covid-19', 'sars-cov-2', 'korona', 'pcr', '7 hafta', '2 hafta']
  },
  {
    id: 'c14',
    category: 'Solunum',
    title: 'Basit Ateşsiz ÜSYE (Hafif Berrak Rinore)',
    shortThreshold: 'Yalnızca berrak burun akıntısı, genel durum iyi',
    threshold: '1 yaş üzeri, ateşsiz, pürülan sekresyon/ronküs/wheezing yok, havayolu cerrahisi değil',
    decision: 'İptal Nedeni Değil',
    waitDuration: 'Bekleme / iptal gerekmez',
    rationale:
      'Ateş, pürülan sekresyon, alt solunum yolu bulgusu veya sistemik halsizlik olmaksızın yalnızca hafif berrak burun akıntısı bulunan >1 yaş hastalarda geçici desatürasyon gibi minör olaylar hafifçe artabilse de, deneyimli anestezi yönetimiyle ciddi/kalıcı morbidite artışı görülmez. Özellikle yılda 6–8 kez ÜSYE geçiren çocuklarda gereksiz iptal döngüsünü önler.',
    clinicalPearl:
      'COLDS skorunu kullanın; havayolu cerrahisi yoksa ETT yerine supraglottik havayolu (LMA) tercih edilmesi laringospazm ve bronkospazm oranını belirgin azaltır. İndüksiyon öncesi salbutamol ve derin anestezi düzeyi güvenliği artırır.',
    guideline: 'Pediatrik Anestezi Klinik Konsensüsü (COLDS Skoru Yaklaşımı)',
    evidenceLevel: 'Havayolu dışı cerrahilerde deneyimli ekip ile güvenle yönetilebilir',
    plans: {
      elektif: '1 yaş üzeri, ateşsiz ve akciğerleri temiz hastada havayolu cerrahisi değilse ertelenmez (mümkünse LMA/rejyonel).',
      zamana: 'Doğrudan işleme alınır.',
      ivedi: 'Doğrudan işleme alınır.',
      acil: 'Doğrudan işleme alınır.'
    },
    relatedLinks: [
      { href: '#infografik=difficult-airway-das', label: 'Havayolu Yönetimi (DAS)' }
    ],
    keywords: ['nezle', 'burun akıntısı', 'rinore', 'colds', 'hafif üsye', 'iptal değil', 'lma']
  },
  {
    id: 'c25',
    category: 'Solunum',
    title: 'KOAH / Astım Akut Alevlenme veya Aktif Bronkospazm',
    shortThreshold: 'İstirahatte wheezing, artmış SABA ihtiyacı, SpO₂ düşüşü',
    threshold: 'Aktif ekspiratuar wheezing, kurtarıcı inhaler ihtiyacında artış, sistemik steroid gerektiren alevlenme veya bazalin altında SpO₂',
    decision: 'Kesin Erteleme',
    waitDuration: 'Alevlenme tam düzelip bazale dönene dek (genellikle 2–4 hafta)',
    rationale:
      'Aktif bronkokonstriksiyon ve havayolu enflamasyonu zemininde endotrakeal entübasyon, hayatı tehdit eden refrakter intraoperatif bronkospazm, oto-PEEP/dinamik hiperinflasyon, barotravma, hipotansiyon ve uzamış mekanik ventilasyona yol açar. Stabil ve kontrollü astım/KOAH ise erteleme nedeni değildir.',
    clinicalPearl:
      'İnhaler bronkodilatör ve inhaler steroidler ameliyat sabahı MUTLAKA uygulanmalıdır. Acil/ivedi olguda propofol/ketamin/sevofluran bronkodilatör etkileri nedeniyle avantajlıdır; desfluran ve histamin salan ajanlardan (atrakuryum/mivakuryum/morfin) kaçının.',
    guideline: 'GINA / GOLD 2024 ve ESAIC Perioperatif Pulmoner Risk Kılavuzları',
    evidenceLevel: 'Yüksek intraoperatif bronkospazm ve PPC riski',
    plans: {
      elektif: 'Aktif bronkospazm/alevlenme düzelip sistemik steroid + bronkodilatör ile bazal fonksiyona dönene dek (2–4 hf) ertelenir.',
      zamana: 'Kısa süreli agresif bronkodilatör + sistemik steroid optimizasyonu sonrası mümkünse rejyonel anestezi ile planlanır.',
      ivedi: 'Nebülize SABA + İpratropium + IV steroid (metilprednizolon/hidrokortizon) ile optimize edilip rejyonel/bronkodilatör anesteziyle alınır.',
      acil: 'Erteleme yok; indüksiyon öncesi nebülize salbutamol + IV steroid, propofol/ketamin + sevofluran ve uzun ekspiryum (I:E 1:3–4) ventilasyonu.'
    },
    relatedLinks: [
      { href: '#arac=mechanical-ventilation&sub=oxygen-therapy', label: 'KOAH Oksijen & Hiperkapni' },
      { href: '#infografik=respiratory-failure', label: 'Solunum Yetmezliği Tip 1–4' }
    ],
    keywords: ['koah', 'astım', 'bronkospazm', 'wheezing', 'alevlenme', 'salbutamol', 'steroid']
  },
  {
    id: 'c26',
    category: 'Solunum',
    title: 'Tanısız / Kontrolsüz Ağır OSAS veya OHS Şüphesi',
    shortThreshold: 'STOP-BANG ≥5 + kontrolsüz sistemik komorbidite / HCO₃⁻ ≥27',
    threshold: 'Yüksek STOP-BANG (≥5) + istirahat hipoksemisi, pulmoner HT, sağ KY veya venöz HCO₃⁻ ≥27 mEq/L (OHS şüphesi)',
    decision: 'Optimizasyon Gerekli',
    waitDuration: 'Uyku/göğüs değerlendirmesi ve PAP titrasyonu tamamlanana dek',
    rationale:
      'Obezite Hipoventilasyon Sendromu (OHS: VKİ ≥30 + gündüz PaCO₂ ≥45 mmHg / venöz HCO₃⁻ ≥27) ve pulmoner HT eşlik eden kontrolsüz ağır OSAS hastalarında opioidler ve sedatifler ani hiperkapnik solunum arresti, postoperatif solunum yetmezliği ve sağ ventrikül yetmezliği riskini katlar. Buna karşılık komorbiditesi stabil olan izole OSAS şüphesi tek başına elektif vaka iptal nedeni değildir.',
    clinicalPearl:
      'SASM kılavuzuna göre izole yüksek STOP-BANG skoru tek başına elektif ameliyatı İPTAL ettirmez (ek önlemlerle — multimodal opioid-sparing analjezi, kapnografi, CPAP — ilerlenir). Erteleme yalnızca kontrolsüz sistemik hastalık (OHS, pulmoner HT, sağ KY, istirahat hipoksemisi) eşlik ediyorsa gerekir.',
    guideline: 'SASM 2016/2023 ve ASA Obstrüktif Uyku Apnesi Perioperatif Kılavuzları',
    evidenceLevel: 'SASM Güçlü Uzlaşı — OHS / Pulmoner HT’de optimizasyon; izole OSAS’ta iptal yok',
    plans: {
      elektif: 'OHS (HCO₃⁻ ≥27 / gündüz hiperkapni), pulmoner HT veya sağ KY eşlik ediyorsa uyku/göğüs optimizasyonu ve PAP için ertelenir; izole OSAS ertelenmez.',
      zamana: 'Hızlı AKG + EKO ile pulmoner HT/hiperkapni dışlanır; opioid-sparing rejim ve postop CPAP + YBÜ/monitörlü izlem planlanır.',
      ivedi: 'Zor havayolu + kısa etkili/opioid-sparing anestezi, tam NMB derlenmesi (TOF ≥0.9) ve postop sürekli SpO₂/EtCO₂ + NIV/CPAP.',
      acil: 'Erteleme yok; rampa pozisyonu, videolaringoskop, minimum opioid ve postop erken NIV/CPAP ile yakın izlem.'
    },
    relatedLinks: [
      { href: '#arac=preop&sub=stop-bang', label: 'STOP-BANG & OHS Hesaplayıcı' },
      { href: '#arac=abg', label: 'AKG / HCO₃⁻ Analizi' }
    ],
    keywords: ['osas', 'osa', 'ohs', 'uyku apnesi', 'stop-bang', 'cpap', 'bikarbonat', 'hco3', 'obezite']
  },

  // ======================== 4. ENDOKRİN / METABOLİK ========================
  {
    id: 'c15',
    category: 'Endokrin / Metabolik',
    title: 'DKA / HHD veya Ağır Hiperglisemi',
    shortThreshold: 'Ketozis/asidoz veya KŞ >250–300 mg/dL',
    threshold: 'Diyabetik ketoasidoz (DKA), Hiperozmolar Hiperglisemik Durum (HHD) veya kontrolsüz KŞ >250–300 mg/dL',
    decision: 'Kesin Erteleme',
    waitDuration: 'Asidoz, ketozis, volüm ve K⁺ tam stabilize olana dek',
    rationale:
      'DKA ve HHD; ağır intravasküler volüm açığı, metabolik asidoz, ciddi potasyum kaymaları ve miyokardiyal depresyon ile seyreder. Bu tabloda anestezi indüksiyonu derin vazopleji, dirençli şok ve ölümcül aritmilere neden olur; ağır hiperglisemi ayrıca lökosit fonksiyonunu bozarak enfeksiyon ve yara açılması riskini yükseltir.',
    clinicalPearl:
      'İnsülin başlarken serum K⁺ düzeyini mutlaka kontrol edin (K⁺ <3.3 mEq/L iken insülin başlanması ölümcül hipokalemiye yol açar!). Perioperatif hedef kan şekeri çoğu hastada 140–180 mg/dL’dir (<100–110 sıkı kontrolden kaçınılır).',
    guideline: 'ADA 2024 Perioperatif Bakım Standartları ve UK CPOC / JBDS Kılavuzları',
    evidenceLevel: 'Sınıf I / Mutlak metabolik stabilizasyon gerekliliği',
    plans: {
      elektif: 'Elektif vaka kesinlikle ertelenir; IV kristaloid, IV insülin ve potasyum tedavisiyle metabolik stabilizasyon tamamlanır.',
      zamana: 'Asidoz, ketozis ve volüm açığı düzeltildikten (anyon açığı kapandıktan) sonra kontrollü biçimde işleme alınır.',
      ivedi: '2–24 saatlik pencerede agresif IV sıvı + K⁺ + IV regüler insülin infüzyonuyla pH/volüm/K⁺ hızla düzeltilip alınır.',
      acil: 'Hayati kaynak kontrolü (örn. nekrotizan enfeksiyon, perforasyon) geciktirilmez; ameliyathanede eşzamanlı IV sıvı, K⁺ ve insülin infüzyonu.'
    },
    relatedLinks: [
      { href: '#arac=abg', label: 'Yatak Başı AKG & Anyon Açığı' },
      { href: '#tedavi=potassium', label: 'Potasyum Yönetimi' }
    ],
    keywords: ['dka', 'hhd', 'ketoasidoz', 'hiperglisemi', 'kan şekeri', 'diyabet', 'insülin', 'keton']
  },
  {
    id: 'c16',
    category: 'Endokrin / Metabolik',
    title: 'Yüksek HbA1c (>%8.5)',
    shortThreshold: 'HbA1c >%8.5 (69 mmol/mol)',
    threshold: 'Son 3 ay içinde HbA1c >%8.5 (%8.5–9.0 üzeri; CPOC ≥69 mmol/mol)',
    decision: 'Optimizasyon Gerekli',
    waitDuration: 'Glisemik regülasyon için 1–3 ay (elektif protez/majör cerrahide)',
    rationale:
      'Kronik kötü glisemik kontrol; mikrovasküler hasar, otonom nöropati (sessiz miyokard iskemisi, gastroparezi ve ortostatik hipotansiyon), bozulmuş kollajen sentezi ve nötrofil kemotaksis kusuruyla ilişkilidir. Özellikle eklem artroplastisi ve implant cerrahilerinde HbA1c >%8.5 düzeyinde cerrahi alan/protez enfeksiyonu, ABH ve yatış süresi anlamlı biçimde artar.',
    clinicalPearl:
      'Sadece yüksek HbA1c nedeniyle onkolojik, vasküler veya zamana duyarlı cerrahi ASLA ertelenmez! Bu vakalarda ameliyat günü kan şekerinin 140–180 mg/dL bandında tutulması ve postop endokrin takibi esastır.',
    guideline: 'ADA 2024 Standartları, UK CPOC Diyabet Kılavuzu ve ANZCA',
    evidenceLevel: 'Elektif protez/implant cerrahisinde optimizasyon; onkolojide erteleme yok',
    plans: {
      elektif: 'Özellikle artroplasti, spinal enstrümantasyon ve yüksek enfeksiyon riskli elektif cerrahilerde glisemik optimizasyon için ertelenir.',
      zamana: 'Yalnızca HbA1c yüksekliği nedeniyle onkolojik/zamana duyarlı cerrahi ertelenmez; perioperatif KŞ 140–180 mg/dL yönetilir.',
      ivedi: 'Erteleme yok; ketozis dışlanır ve perioperatif IV/SC insülin protokolüyle KŞ 140–180 mg/dL hedeflenir.',
      acil: 'Erteleme yok; akut hiperglisemi ve ketozis eşzamanlı yönetilir.'
    },
    relatedLinks: [
      { href: '#arac=abg', label: 'Yatak Başı Kan Gazı' }
    ],
    keywords: ['hba1c', 'diyabet', 'şeker', 'protez', 'artroplasti', 'enfeksiyon', 'cpoc']
  },
  {
    id: 'c17',
    category: 'Endokrin / Metabolik',
    title: 'Kontrolsüz Tirotoksikoz / Ağır Miksödem',
    shortThreshold: 'Klinik hipertiroidi veya ağır hipotiroidi',
    threshold: 'Aşikar tirotoksikoz (yüksek fT3/fT4, taşikardi/AF) veya ağır semptomatik hipotiroidi/miksödem',
    decision: 'Kesin Erteleme',
    waitDuration: 'Ötiroidi sağlanana dek',
    rationale:
      'Kontrolsüz hipertiroidide cerrahi stres katekolamin duyarlılığını aşırı artırarak mortalitesi %10–30’a ulaşabilen intraoperatif/postoperatif tiroid fırtınasını (hipertermi, taşiaritmi, yüksek debili KY) tetikler. Ağır miksödemde ise baroreseptör refleks kaybı, düşük kardiyak debi, hipotermi ve anesteziklere aşırı duyarlılık kardiyak kollaps ve uzamış solunum depresyonuna yol açar.',
    clinicalPearl:
      'Hafif veya subklinik hipotiroidi (normal fT4, hafif yüksek TSH, asemptomatik) tek başına elektif cerrahi iptal nedeni DEĞİLDİR! Tirotoksikoz acilinde ise PTU/metimazol + Lugol iyot (antitiroidden 1 saat sonra!) + IV propranolol/esmolol + IV hidrokortizon dörtlüsü uygulanır.',
    guideline: 'ATA (American Thyroid Association) ve Endokrin Anestezi Kılavuzları',
    evidenceLevel: 'Sınıf I / Yüksek perioperatif mortalite riski',
    plans: {
      elektif: 'Ötiroidi sağlanana dek tüm elektif cerrahiler kesinlikle ertelenir (subklinik hafif hipotiroidi hariç).',
      zamana: 'Endokrinoloji iş birliğiyle hızlı antitiroid + beta-bloker + steroid veya IV levotiroksin + stres steroid hazırlığı yapılır.',
      ivedi: 'Tirotoksikozda IV esmolol/propranolol + hidrokortizon + antitiroid/iyot; miksödemde IV levotiroksin + hidrokortizon ile alınır.',
      acil: 'Dörtlü tiroid fırtınası/miksödem protokolü, invaziv hemodinamik izlem, aktif sıcaklık kontrolü ve postop YBÜ eşliğinde acil cerrahi.'
    },
    relatedLinks: [
      { href: '#tedavi=hydrocortisone', label: 'Hidrokortizon Protokolü' }
    ],
    keywords: ['tiroid', 'tirotoksikoz', 'hipertiroidi', 'hipotiroidi', 'miksödem', 'tsh', 'fırtına']
  },
  {
    id: 'c18',
    category: 'Endokrin / Metabolik',
    title: 'Akut Elektrolit Bozukluğu (K⁺ / Na⁺)',
    shortThreshold: 'K⁺ <3.0 / >5.5 · Na⁺ <130 / >150 mEq/L',
    threshold: 'Akut K⁺ <3.0 veya >5.5 mEq/L, Na⁺ <130 veya >150 mEq/L veya değerden bağımsız EKG değişikliği/semptom',
    decision: 'Kesin Erteleme',
    waitDuration: 'Güvenli aralığa ve normal EKG’ye dönene dek',
    rationale:
      'Akut hipokalemi ve hiperkalemi kardiyak istirahat membran potansiyelini bozarak intraoperatif ventriküler fibrilasyon, torsades de pointes veya asistoli riskini dramatik biçimde yükseltir. Akut hiponatremi (<130 mEq/L) serebral ödem ve nöbet riskini artırırken, hızlı kontrolsüz düzeltme ozmotik demiyelinizasyon sendromuna (ODS) yol açabilir.',
    clinicalPearl:
      'Kronik KBY/diyaliz hastasında EKG tamamen normalse hafif kronik hiperkalemi (5.1–5.5 mEq/L) akut yükselmeyle aynı riski taşımaz; ancak akut yükselmelerde veya EKG değişikliğinde (sivri T, QRS genişlemesi) derhal IV kalsiyum glukonat/klorür ile membran stabilizasyonu gerekir. Kronik hiponatremide 24 saatlik düzeltme sınırı ≤6–8 mEq/L’dir!',
    guideline: 'Perioperatif Elektrolit Yönetimi, ERC Hiperkalemi ve ESE Hiponatremi Kılavuzları',
    evidenceLevel: 'EKG değişikliği veya akut semptomda değerden bağımsız mutlak erteleme',
    plans: {
      elektif: 'Akut sapmalarda (K⁺ <3.0/>5.5, Na⁺ <130/>150) veya EKG değişikliğinde elektif cerrahi kesin ertelenir.',
      zamana: 'Güvenli hızda düzeltme (K⁺ replasmanı/düşürme; Na⁺ ≤6–8 mEq/L/gün) ve kontrol EKG/lab teyidiyle alınır.',
      ivedi: '2–24 saatlik pencerede kontrollü K⁺/Na⁺ düzeltmesi (hiperkalemide insülin-dekstroz, salbutamol, gerekirse diyaliz) sonrası alınır.',
      acil: 'Erteleme yok; hiperkalemide IV Kalsiyum + insülin-dekstroz + süksinilkolin YASAĞI, hipokalemide IV KCl + MgSO₄ eşliğinde acil cerrahi.'
    },
    relatedLinks: [
      { href: '#tedavi=potassium', label: 'Potasyum Hesaplayıcı' },
      { href: '#tedavi=sodium', label: 'Sodyum & ODS Rehberi' },
      { href: '#tedavi=magnesium', label: 'Magnezyum Protokolü' },
      { href: '#arac=abg', label: 'Yatak Başı AKG' }
    ],
    keywords: ['potasyum', 'hiperkalemi', 'hipokalemi', 'sodyum', 'hiponatremi', 'hipernatremi', 'ekg', 'elektrolit', 'ods']
  },

  // ======================== 5. NÖROLOJİ / HEMATOLOJİ ========================
  {
    id: 'c19',
    category: 'Nöroloji / Hematoloji',
    title: 'Yakın Dönem İskemik İnme / GİA',
    shortThreshold: 'Son 3 ay içinde SVO veya GİA',
    threshold: 'Son 3 ay içinde geçirilmiş akut iskemik inme (SVO) veya geçici iskemik atak (GİA)',
    decision: 'Kesin Erteleme',
    waitDuration: 'En az 3 ay (yüksek riskli cerrahide 6–9 aya dek değerlendir)',
    rationale:
      'Akut serebral iskemi sonrası enfarkt çevresindeki penumbrada serebral otoregülasyon bozulur ve serebral kan akımı doğrudan sistemik kan basıncına bağımlı hale gelir. İntraoperatif hafif hipotansiyon, hipokapni veya cerrahi protrombotik yanıt; ilk 3 ayda tekrarlayan perioperatif inme ve mortalite riskini katlayarak artırır.',
    clinicalPearl:
      '2024 AHA/ACC kılavuzu yeni veriler ışığında minimum erteleme eşiğini ≥3 ay (Class IIa) olarak belirlemiştir (yüksek riskli majör/vasküler cerrahilerde 6–9 aya uzatma değerlendirilir). İntraoperatif bazal MAP’ın ±%10–15 içinde tutulması, sıkı normokapni (PaCO₂ 35–40 mmHg) ve normoglisemi esastır.',
    guideline: '2024 AHA/ACC Perioperatif Kılavuzu ve SNACC / APSF İnme Konsensüsü',
    evidenceLevel: 'Sınıf IIa (En az 3 ay erteleme)',
    plans: {
      elektif: 'Elektif non-kardiyak cerrahi en az 3 ay ertelenir; yüksek riskli majör cerrahide 6–9 ay değerlendirilir.',
      zamana: 'Nöroloji konsültasyonu, antiagregan yönetimi, invaziv arterle bazal MAP korunması ve normokapni/normoglisemi planlanır.',
      ivedi: 'Bazal tansiyonun altına düşmeden (MAP ≥ bazal %85–90), normokapni ve mümkünse NIRS serebral oksimetriyle ilerlenir.',
      acil: 'Erteleme yok; bazal MAP korunması, invaziv arter, NIRS takibi ve postop erken nörolojik muayene.'
    },
    relatedLinks: [
      { href: '#arac=monitoring&sub=nirs-cerebral-oximetry', label: 'Serebral Oksimetri (NIRS)' },
      { href: '#arac=procedures&sub=endovascular-mechanical-thrombectomy', label: 'EVT / İnme Protokolü' }
    ],
    keywords: ['inme', 'svo', 'gia', 'tia', 'iskemik', 'serebrovasküler', '3 ay', '9 ay', 'otoregülasyon']
  },
  {
    id: 'c20',
    category: 'Nöroloji / Hematoloji',
    title: 'Pre-operatif Orta–Ağır Anemi (Düzeltilebilir)',
    shortThreshold: 'Hb <10–13 g/dL (majör kanama riskli cerrahi)',
    threshold: 'Majör kanama beklentili (>500 mL) elektif cerrahide Hb <13 g/dL (WHO/ESC PBM) veya orta–ağır anemi (Hb <10 g/dL)',
    decision: 'Optimizasyon Gerekli',
    waitDuration: 'IV demir / PBM yanıtı için 2–4 hafta',
    rationale:
      'Preoperatif anemi oksijen sunum kapasitesini (DO₂) azaltarak miyokardiyal iskemi, akut böbrek hasarı, yara yeri enfeksiyonu ve allojenik eritrosit transfüzyonu ihtiyacını bağımsız olarak artırır. Transfüzyonun kendi immünomodülatör ve enfeksiyöz riskleri nedeniyle majör elektif cerrahi öncesi Hasta Kan Yönetimi (PBM) ile hemoglobin optimizasyonu sonuçları belirgin iyileştirir.',
    clinicalPearl:
      'Demir eksikliği anemisinde oral demir yavaş ve emilimi düşüktür; modern IV demir (ferrik karboksimaltoz vb.) 2–4 haftada Hb’yi 1.5–2 g/dL yükseltir. Sadece Hb’yi yükseltmek için elektif hastaya rutin preop eritrosit transfüzyonu yapmaktan kaçının (PBM ilkesi).',
    guideline: '2022 ESC Non-Kardiyak Cerrahi Kılavuzu ve WHO Hasta Kan Yönetimi (PBM)',
    evidenceLevel: 'Sınıf I (Majör cerrahi öncesi anemi taranmalı ve tedavi edilmeli)',
    plans: {
      elektif: 'Majör kanama riskli elektif cerrahide etiyoloji (demir/ferritin/B12/folat) araştırılır; IV demir/PBM için 2–4 hafta ertelenir.',
      zamana: 'Yüksek doz IV demir başlanır; cell-saver, traneksamik asit (TXA) ve kısıtlı kan örneklemesi planıyla zamanında alınır.',
      ivedi: 'Tip & cross-match hazırlanır, aktif kanama/iskemi eşiklerine göre (genel Hb <7–8, koroner/aktif iskemi <8–9 g/dL) hedeflenmiş transfüzyon.',
      acil: 'Erteleme yok; eşiklere göre hedeflenmiş kan ürünü transfüzyonu, TXA ve koagülopati önlemi.'
    },
    relatedLinks: [
      { href: '#arac=emergencies&sub=mtp', label: 'Masif Transfüzyon (MTP)' },
      { href: '#arac=monitoring&sub=intraoperative-bleeding', label: 'İntraop Kanama Takibi' }
    ],
    keywords: ['anemi', 'hemoglobin', 'hb', 'demir', 'pbm', 'transfüzyon', 'ferritin', 'txa']
  },
  {
    id: 'c21',
    category: 'Nöroloji / Hematoloji',
    title: 'Akut Venöz Tromboemboli (DVT / Pulmoner Emboli)',
    shortThreshold: 'İlk 1–3 ay içinde akut DVT veya PE',
    threshold: 'Son 30 gün (çok yüksek risk) veya 1–3 ay içinde tanı almış akut DVT / Pulmoner Emboli',
    decision: 'Kesin Erteleme',
    waitDuration: 'İlk 1 ay kesin · Tercihen en az 3 ay',
    rationale:
      'Akut VTE sonrası ilk 30 günde antikoagülasyonun kesilmesi halinde rekürren pulmoner emboli riski %40’a yaklaşır; bu risk 3. aya kadar kademeli olarak azalır. Cerrahinin yol açtığı venöz staz, endotelyal hasar ve hiperkoagülabilite henüz organize olmamış trombüsün masif embolizasyonuna neden olabilir.',
    clinicalPearl:
      'İlk 1 ay içinde hayat/uzuv kurtarıcı cerrahi zorunluysa ve tam antikoagülasyon verilemeyecekse çıkarılabilir (retrievable) IVC filtresi hematoloji/girişimsel radyoloji ile tartışılır ve postop en erken güvenli saatte antikoagülasyon yeniden başlanır.',
    guideline: 'ACCP 2022, ASH Antitrombotik ve 2022 ESC Non-Kardiyak Kılavuzları',
    evidenceLevel: 'Çok yüksek rekürren PE ve mortalite riski',
    plans: {
      elektif: 'İlk 1 ay kesinlikle, tercihen en az 3 ay boyunca elektif cerrahi ertelenir.',
      zamana: 'İlk 1–3 ayda ertelenemeyen cerrahide kısa kesme + gerekirse geçici IVC filtresi veya köprüleme multidisipliner tartışılır.',
      ivedi: 'Hematoloji/kardiyoloji görüşü, sağ ventrikül POCUS değerlendirmesi ve gerekirse çıkarılabilir IVC filtresi planıyla alınır.',
      acil: 'Erteleme yok; kanama–tromboz dengesi intraoperatif yönetilir, postop erken mekanik ve farmakolojik tromboprofilaksi başlanır.'
    },
    relatedLinks: [
      { href: '#arac=emergencies&sub=pe', label: 'Pulmoner Emboli Krizi' }
    ],
    keywords: ['dvt', 'pe', 'vte', 'pulmoner emboli', 'tromboz', 'ivc filtresi', 'antikoagülan']
  },
  {
    id: 'c28',
    category: 'Nöroloji / Hematoloji',
    title: 'Ciddi Trombositopeni veya Kontrolsüz Koagülopati',
    shortThreshold: 'Plt <50 bin (Nöro/Göz <100 bin) · INR >1.5',
    threshold: 'Genel majör cerrahide Plt <50.000/µL, nöroşirürji/oküler cerrahide <100.000/µL, nöraksiyelde <70–75.000/µL veya açıklanamayan INR >1.5',
    decision: 'Kesin Erteleme',
    waitDuration: 'Etiyoloji aydınlatılıp güvenli hemostaz sağlanana dek',
    rationale:
      'Açıklanamayan ciddi trombositopeni veya pıhtılaşma faktör eksikliği (INR >1.5, uzamış aPTT), özellikle kapalı boşluk cerrahilerinde (beyin, omurga, göz) ve nöraksiyel bloklarda katastrofik hemorajiye yol açar. Öncelikle EDTA’ya bağlı yalancı trombositopeni (psödotrombositopeni) periferik yayma ile dışlanmalıdır.',
    clinicalPearl:
      'İzole ılımlı trombositopenide (Plt 70–100 bin) genel cerrahi çoğu zaman güvenle yapılabilir ancak nöraksiyel blok (ASRA/ESAIC ≥70–75 bin) ve kraniyotomi/oküler cerrahi (≥100 bin) daha yüksek eşik ister. Acil olguda viskoelastik testler (TEG/ROTEM) hedefe yönelik replasman sağlar.',
    guideline: 'AABB Trombosit Transfüzyon, ESAIC Majör Kanama 2023 ve ASRA Kılavuzları',
    evidenceLevel: 'Sınıf I / Prosedür bazlı hemostaz güvenliği eşikleri',
    plans: {
      elektif: 'Psödotrombositopeni dışlanır; gerçek koagülopati/trombositopeni etiyolojisi çözülüp eşik sağlanana dek ertelenir.',
      zamana: 'Hematoloji ile nedene yönelik tedavi (steroid/IVIG, K vit, faktör) planlanır; nöraksiyel yerine genel anestezi seçilebilir.',
      ivedi: 'Hedefe yönelik trombosit süspansiyonu / TDP / 4F-PCC / fibrinojen hazırlığı (tercihen TEG/ROTEM eşliğinde) yapılarak alınır.',
      acil: 'Erteleme yok; intraoperatif eşzamanlı trombosit, kriyopresipitat/fibrinojen, 4F-PCC ve MTP aktivasyonu.'
    },
    relatedLinks: [
      { href: '#arac=monitoring&sub=viscoelastic-hemostasis', label: 'TEG / ROTEM' },
      { href: '#arac=vascular-access', label: 'Koagülasyon Tabloları' },
      { href: '#arac=emergencies&sub=mtp', label: 'Masif Transfüzyon (MTP)' }
    ],
    keywords: ['trombosit', 'plt', 'trombositopeni', 'inr', 'aptt', 'koagülopati', 'kanama', 'teg', 'rotem']
  },
  {
    id: 'c30',
    category: 'Nöroloji / Hematoloji',
    title: 'Akut Nörolojik Defisit, Kontrolsüz KİBAS veya Aktif Nöbet',
    shortThreshold: 'Yeni fokal defisit, bilinç değişikliği veya son 24–48 sa nöbet',
    threshold: 'Yeni/açıklanamayan fokal nörolojik defisit, akut bilinç bozukluğu, artmış KİBAS veya kontrolsüz/küme epileptik nöbetler',
    decision: 'Kesin Erteleme',
    waitDuration: 'Nörogörüntüleme ve nörolojik stabilizasyon sağlanana dek',
    rationale:
      'Açıklanamayan yeni nörolojik defisit veya bilinç değişikliği akut intrakraniyal kanama, kitle, venöz sinüs trombozu veya inme habercisi olabilir. Kontrolsüz epilepside ise cerrahi stres, uyku yoksunluğu, elektrolit değişimleri ve bazı anestezik ajanlar (yüksek doz sevofluran, tramadol, meperidin) status epileptikusu tetikleyebilir.',
    clinicalPearl:
      'Kronik antiepileptik ilaçlar (levetirasetam, valproat, karbamazepin vb.) ameliyat sabahı KESİNTİSİZ alınmalı; oral alamayan hastalarda eşdeğer IV formlara geçilmelidir. Nöbet öyküsünde tramadol ve hipokapnik hiperventilasyondan kaçının.',
    guideline: 'SNACC Perioperatif Nöroanestezi ve Nöroloji Güvenlik Standartları',
    evidenceLevel: 'Yüksek akut intrakraniyal patoloji ve status epileptikus riski',
    plans: {
      elektif: 'Non-nöroşirürjikal tüm elektif cerrahiler nöroloji/BT-MRG değerlendirmesi ve antiepileptik stabilizasyona dek ertelenir.',
      zamana: 'Acil nöroloji + beyin görüntüleme ile akut intrakraniyal patoloji dışlanıp IV antiepileptik yükleme sonrası planlanır.',
      ivedi: 'Akut KİBAS/kanama dışlanır; IV levetirasetam/antiepileptik profilaksi, nöroprotektif TIVA ve normokapni ile ilerlenir.',
      acil: 'Nöroşirürjikal dekompresyon dahil hayati acillerde erteleme yok; KİBAS/CPP 60–70 mmHg yönetimi ve IV antiepileptik.'
    },
    relatedLinks: [
      { href: '#arac=monitoring&sub=icp-monitoring', label: 'ICP / KİBAS Monitörü' },
      { href: '#arac=procedures&sub=epilepsy-surgery', label: 'Epilepsi Anestezisi' }
    ],
    keywords: ['nöbet', 'epilepsi', 'kibas', 'defisit', 'bilinç', 'status', 'levetirasetam', 'nöroloji']
  },

  // ======================== 6. RENAL / HEPATİK / GEBELİK ========================
  {
    id: 'c27',
    category: 'Renal / Hepatik / Gebelik',
    title: 'Akut Böbrek Hasarı (AKI) veya Diyaliz Günü / Hipervolemi',
    shortThreshold: 'KDIGO Evre 2–3 AKI, üremi veya son 24 sa diyalizsiz SDBY',
    threshold: 'Yeni gelişen/kötüleşen AKI, üremik ensefalopati/perikardit, akciğer ödemi veya hemodiyaliz hastasında son 24 sa diyaliz yapılmamış olması',
    decision: 'Kesin Erteleme',
    waitDuration: 'Renal stabilizasyon / uygun diyaliz sonrası (tercihen ertesi gün)',
    rationale:
      'Aktif AKI ve yetersiz diyalize olmuş son dönem böbrek yetmezliğinde (SDBY) hiperkalemi, metabolik asidoz, volüm yüklenmesi (pulmoner ödem), üremik trombosit disfonksiyonu ve ilaç birikimi perioperatif kardiyak arrest ve solunum yetmezliği riskini ciddi biçimde artırır. Diyalizden hemen sonraki ilk birkaç saatte ise rezidüel heparin etkisi ve intravasküler volüm açığı hipotansiyona neden olur.',
    clinicalPearl:
      'Hemodiyaliz hastalarında elektif cerrahi için en ideal zamanlama diyalizden 12–24 saat sonrasıdır (heparin etkisi geçmiş, K⁺ ve volüm dengelenmiş). AV fistül bulunan kola ASLA tansiyon manşonu, turnike veya IV kanül takılmaz! Atrakuryum/Sisatrakuryum (Hofmann eliminasyonu) güvenlidir.',
    guideline: 'KDIGO AKI Kılavuzu ve Perioperatif Renal Anestezi Standartları',
    evidenceLevel: 'Yüksek hiperkalemi, akciğer ödemi ve mortalite riski',
    plans: {
      elektif: 'Yeni AKI stabilize olana dek ertelenir; kronik HD hastasında ameliyattan önceki gün heparinsiz/uygun diyaliz + kontrol K⁺/volüm sağlanır.',
      zamana: 'Nefroloji ile acil/planlı heparinsiz hemodiyaliz (ultrafiltrasyon + K⁺ düşürme) ardından 12–24 sa içinde işleme alınır.',
      ivedi: 'Hiperkalemi/asidoz/akciğer ödemi varsa cerrahi öncesi kısa heparinsiz acil diyaliz veya medikal stabilizasyon yapılıp alınır.',
      acil: 'Erteleme yok; IV kalsiyum/insülin-dekstroz, süksinilkolin ve nefrotoksik ajanlardan (NSAİİ/aminoglikozid) kaçınma, postop CRRT/HD.'
    },
    relatedLinks: [
      { href: '#tedavi=potassium', label: 'Potasyum Yönetimi' },
      { href: '#infografik=diuretics-nephron', label: 'Nefron & Diüretikler' },
      { href: '#arac=abg', label: 'Yatak Başı AKG' }
    ],
    keywords: ['böbrek', 'aki', 'abh', 'kby', 'sdby', 'diyaliz', 'hemodiyaliz', 'kreatinin', 'üremi', 'fistül']
  },
  {
    id: 'c22',
    category: 'Renal / Hepatik / Gebelik',
    title: 'Akut Hepatit / Child-Pugh C Dekompanse Siroz',
    shortThreshold: 'Akut hepatit veya Child-Pugh C / MELD ≥15–20',
    threshold: 'Akut viral/alkolik/toksik hepatit veya ağır dekompanse siroz (Child-Pugh C, MELD ≥15–20, refrakter asit/ensefalopati)',
    decision: 'Kesin Erteleme',
    waitDuration: 'Akut hepatit tam düzelene dek · Child C’de elektif iptal',
    rationale:
      'Akut hepatitli veya dekompanse sirozlu karaciğerde anestezi ve cerrahi stresle hepatik kan akımının azalması; fulminan karaciğer yetmezliği, ağır koagülopati, sepsis ve hepatorenal sendromu tetikler. Child-Pugh Sınıf C sirozda majör abdominal/torasik cerrahilerde perioperatif mortalite %50–80 bandına ulaşabildiğinden elektif cerrahi genellikle kontrendikedir.',
    clinicalPearl:
      'Sirozda tek başına INR yüksekliği her zaman kanama riski anlamına gelmez (antikoagülan faktörler de düşüktür — dengeli hemostaz); gereksiz TDP yüklemesi portal basıncı artırarak kanamayı KÖTÜLEŞTİRİR! Mümkünse TEG/ROTEM rehberliğinde hemostaz ve MAP korunması esastır.',
    guideline: 'AGA 2023 Sirozda Cerrahi Risk Güncellemesi ve Hepatoloji/Anestezi Kılavuzları',
    evidenceLevel: 'Sınıf I / Çok yüksek perioperatif mortalite (Child C %50–80)',
    plans: {
      elektif: 'Akut hepatitte tam biyokimyasal düzelme beklenir; Child-Pugh C sirozda elektif majör cerrahi iptal edilir (alternatif minimal yöntem).',
      zamana: 'Hepatoloji konseyi; ensefalopati, asit (albüminli parasentez), hiponatremi ve TEG/ROTEM koagülopati optimizasyonuyla en minimal invaziv seçenek.',
      ivedi: 'Yüksek risk onamı, albümin/vazopresör ile hepatik perfüzyon korunması, TEG/ROTEM hemostazı ve nefrotoksin/sedatif kısıtlaması.',
      acil: 'Yüksek mortalite onamı, invaziv hemodinami, glukoz/laktat takibi, sisatrakuryum/remifentanil/sevofluran gibi organ-bağımsız ajanlar.'
    },
    relatedLinks: [
      { href: '#arac=monitoring&sub=viscoelastic-hemostasis', label: 'TEG / ROTEM Hemostaz' },
      { href: '#tedavi=sodium', label: 'Sodyum & Siroz Yönetimi' }
    ],
    keywords: ['hepatit', 'siroz', 'child', 'child-pugh', 'meld', 'karaciğer', 'asit', 'ensefalopati']
  },
  {
    id: 'c23',
    category: 'Renal / Hepatik / Gebelik',
    title: 'Gebelik (Non-Obstetrik Cerrahi)',
    shortThreshold: 'Yeni saptanan / mevcut gebelik',
    threshold: 'Doğurganlık çağındaki hastada pozitif β-hCG / yeni saptanan gebelik',
    decision: 'Kesin Erteleme',
    waitDuration: 'Elektif cerrahi doğum sonrasına ertelenir',
    rationale:
      'Gebelikte non-obstetrik cerrahi ve anestezi; 1. trimesterde spontan abortus ve organogenez dönemi riski, 3. trimesterde ise preterm eylem ve aortokaval kompresyon riski taşır. Anne için acil veya zamana duyarlı bir zorunluluk yoksa fetüsü gereksiz fizyolojik stresten korumak amacıyla tüm elektif ameliyatlar postpartum döneme ertelenir.',
    clinicalPearl:
      'Ertelenemeyen bir cerrahi (apandisit, over torsiyonu, malignite, travma) GEBELİK NEDENİYLE ASLA GECİKTİRİLMEZ! Anne hipoksisi ve hipotansiyonu fetüs için en büyük tehdittir. ≥18–20. haftadan itibaren 15° sol lateral tilt, aspirasyon profilaksisi ve obstetri ekibiyle FKH izlemi şarttır.',
    guideline: 'ACOG Committee Opinion No. 775 ve ASA Gebelikte Non-Obstetrik Cerrahi Ortak Görüşü',
    evidenceLevel: 'Sınıf I (Anne sağlığı esastır; elektif işlemler postpartum döneme ertelenir)',
    plans: {
      elektif: 'Tüm elektif non-obstetrik cerrahiler doğum sonrasına (postpartum) ertelenir.',
      zamana: 'Ertelenemeyen cerrahi mümkünse en güvenli dönem olan 2. trimestere (14–27. hafta) planlanır; obstetri konsültasyonu alınır.',
      ivedi: 'Trimesterden bağımsız geciktirilmez; obstetri + FKH izlemi, ≥20. haftada 15° sol lateral tilt, aspirasyon önlemi ve normokapni/normotansiyon.',
      acil: 'Anne hayatını kurtarmak için asla ertelenmez; sol lateral tilt, zor havayolu/RSI hazırlığı, maternal SpO₂/MAP korunması ve obstetri eşliği.'
    },
    relatedLinks: [
      { href: '#infografik=rsi-vs-elective', label: 'RSI & Aspirasyon Önlemi' },
      { href: '#infografik=surgical-urgency-2024', label: 'Cerrahi Aciliyet Sınıflaması' }
    ],
    keywords: ['gebelik', 'hamile', 'bhcg', 'fetus', 'obstetrik', 'trimester', 'acog', 'sol lateral tilt']
  }
];

export interface GuidelineReference {
  title: string;
  journal: string;
  year: string;
  scope: string;
}

export const CANCELLATION_GUIDELINE_REFS: GuidelineReference[] = [
  {
    title: '2024 AHA/ACC/ACS/ASNC/HRS/SCA/SCCT/SCMR/SVM Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery',
    journal: 'Circulation / JACC',
    year: '2024',
    scope: 'Cerrahi aciliyet, MI (60 g), DES (6–12 ay / ≥3 ay), İnme (≥3 ay), HT (≥180/110 vs <180/110), SGLT-2i (3–4 g)'
  },
  {
    title: '2022 ESC Guidelines on Cardiovascular Assessment and Management of Patients Undergoing Non-Cardiac Surgery',
    journal: 'European Heart Journal',
    year: '2022',
    scope: 'Cerrahi risk, anemi/PBM (Sınıf I), antikoagülan/DOAC, VTE ve kardiyak stabilizasyon eşikleri'
  },
  {
    title: 'Multisociety Clinical Practice Guidance for Safe Use of GLP-1 Receptor Agonists in the Perioperative Period (ASA/AGA/ASMBS/SAGES/ISPCOP)',
    journal: 'Clinical Gastroenterology & Hepatology / Surgery for Obesity / Anesthesia',
    year: '2024',
    scope: 'GLP-1 risk stratifikasyonu, 24 saat sıvı diyet ve yatak başı Gastrik POCUS kullanımı'
  },
  {
    title: 'ASA Practice Guidelines for Preoperative Fasting (2017/2023) & ESAIC Pediatric Preoperative Fasting Guideline (2022)',
    journal: 'Anesthesiology / European Journal of Anaesthesiology',
    year: '2022–2023',
    scope: '2-6-8 erişkin / 6-4-3-1 pediatrik açlık kuralları ve sakız çiğnemenin iptal nedeni olmaması'
  },
  {
    title: 'ASA and APSF Joint Statement on Elective Surgery/Procedures and Anesthesia for Patients after COVID-19 Infection',
    journal: 'ASA / APSF',
    year: '2023',
    scope: 'COVID-19 sonrası 2 hafta temel erteleme ve 2–7 hafta risk bazlı zamanlama'
  },
  {
    title: 'ACOG Committee Opinion No. 775: Nonobstetric Surgery During Pregnancy (reaffirmed with ASA)',
    journal: 'Obstetrics & Gynecology',
    year: '2019 (Güncel)',
    scope: 'Elektif postpartum erteleme, 2. trimester tercihi ve acilde anne önceliği'
  },
  {
    title: 'CPOC / JBDS Guideline for Perioperative Care for People with Diabetes Mellitus & ADA Standards of Care',
    journal: 'Centre for Perioperative Care / Diabetes Care',
    year: '2023–2024',
    scope: 'DKA/HHD kesin erteleme, HbA1c >%8.5 optimizasyon eşiği ve 140–180 mg/dL hedefi'
  }
];
