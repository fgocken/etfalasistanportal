// Master Deduplicated References & Further Reading Registry for Şişli Etfal Anestezi Portalı
// Bundan sonra portala yeni modül/kılavuz/protokol eklendikçe kaynaklar bu merkezi dizine eklenir;
// ayrıca emergenciesData içerisindeki yeni kaynaklar da mükerrer kontrolüyle otomatik birleştirilir.

import { ANESTHESIA_EMERGENCIES_DATA } from './emergenciesData';

export type ReferenceCategory =
  | 'textbooks'
  | 'emergencies_acls'
  | 'airway'
  | 'preop_recovery'
  | 'fluid_hemodynamics'
  | 'icu_vasoactive'
  | 'electrolytes'
  | 'pharmacology'
  | 'regional_procedures'
  | 'vascular_access'
  | 'calculators_safety';

export type ReferenceKind =
  | 'Textbook'
  | 'Uluslararası Kılavuz'
  | 'Dönüm Noktası Çalışma / RKÇ'
  | 'Konsensus / Uzman Görüşü'
  | 'Klinik İnceleme / Derleme';

export interface PortalReference {
  id: string;
  category: ReferenceCategory;
  kind: ReferenceKind;
  authors: string;
  title: string;
  publication: string;
  year: string;
  pmid?: string;
  doi?: string;
  externalUrl?: string;
  usedInModules: string[];
  clinicalNote: string;
}

export interface ReferenceCategoryMeta {
  id: ReferenceCategory;
  title: string;
  shortTitle: string;
  description: string;
}

export const REFERENCE_CATEGORIES: ReferenceCategoryMeta[] = [
  {
    id: 'textbooks',
    title: '1. Temel Anesteziyoloji, Cerrahi ve Yoğun Bakım Textbookları',
    shortTitle: 'Temel Textbooklar',
    description: 'Portal genelindeki fizyoloji, farmakoloji, prosedür ve elektrolit algoritmalarının ana başvuru kitapları.'
  },
  {
    id: 'emergencies_acls',
    title: '2. Perioperatif Kardiyak Arrest, ACLS ve Hayati Krizler',
    shortTitle: 'ACLS & Acil Krizler',
    description: 'AHA/ERC resüsitasyon kılavuzları, Malign Hipertermi, Anafilaksi, LAST, Pulmoner ve Hava Embolisi literatürü.'
  },
  {
    id: 'airway',
    title: '3. Hava Yolu Yönetimi, Zor Entübasyon, Aspirasyon ve Ekstübasyon',
    shortTitle: 'Hava Yolu & Aspirasyon',
    description: 'DAS, ASA Zor Hava Yolu, NAP4, RSI, bronkospazm, laringospazm, boyun hematomu ve gastrik USG kılavuzları.'
  },
  {
    id: 'preop_recovery',
    title: '4. Preoperatif Değerlendirme, Açlık, Risk Skorları ve Derlenme',
    shortTitle: 'Preop & Derlenme',
    description: 'ASA fiziksel durum, AHA/ACC 2024 ve ESC 2022 MACE skorları, açlık süreleri (ASA/ESAIC), Aldrete ve PADSS.'
  },
  {
    id: 'fluid_hemodynamics',
    title: '5. İntraoperatif Sıvı Yönetimi ve Hemodinamik Optimizasyon',
    shortTitle: 'İntraop Sıvı & ERAS',
    description: 'Liberal, Restriktif ve GDFT stratejileri (RELIEF, POQI, OPTIMISE II, FEDORA), ERAS ve Holliday-Segar doğrulamaları.'
  },
  {
    id: 'icu_vasoactive',
    title: '6. Yoğun Bakım Kabul Kriterleri, Sepsis, Şok ve Vazoaktif Ajanlar',
    shortTitle: 'YBÜ & Vazoaktifler',
    description: 'SCCM/ESICM yoğun bakım triyaj kriterleri, Sepsis-3/SOFA, NEWS2, SSC, SOAP II ve VASST çalışmaları.'
  },
  {
    id: 'electrolytes',
    title: '7. Sıvı-Elektrolit Dengesi ve Metabolik Bozukluklar',
    shortTitle: 'Elektrolit Tedavileri',
    description: 'Akut hipo/hipernatremi, ozmotik demiyelinizasyon koruması, hipopotasemi ve IV magnezyum replasmanı kanıtları.'
  },
  {
    id: 'pharmacology',
    title: '8. Anestezi Farmakolojisi, TİVA, Sedasyon ve Analjezi',
    shortTitle: 'İlaçlar & Farmakoloji',
    description: 'Propofol, Remifentanil, Fentanil, Midazolam, Deksmedetomidin, Ketamin, Lidokain ve etkileşim veritabanları.'
  },
  {
    id: 'regional_procedures',
    title: '9. Rejyonal Anestezi, Sinir Blokları ve Cerrahi Prosedürler',
    shortTitle: 'Bloklar & Prosedürler',
    description: 'NYSORA, ASRA/ESRA, PROSPECT ağrı protokolleri, branş bazlı ERAS konsensusları ve EKT standartları.'
  },
  {
    id: 'vascular_access',
    title: '10. Güvenli Vasküler Erişim ve Kateterizasyon (SVK / Arteriyel)',
    shortTitle: 'Vasküler Erişim',
    description: 'Association of Anaesthetists 2025, ASA 2020 ve ESAIC PERSEUS USG eşliğinde SVK, 3SITES, Peres derinlik, damar koruma ve CLABSI kılavuzları.'
  },
  {
    id: 'calculators_safety',
    title: '11. Klinik Hesaplayıcılar, Ventilasyon ve Ekipman Güvenliği',
    shortTitle: 'Hesaplama & Güvenlik',
    description: 'ARDSnet akciğer koruyucu ventilasyon, Devine IBW formülü, CURB-65 ve anestezi cihazı sorun giderme standartları.'
  }
];

export const MASTER_PORTAL_REFERENCES: PortalReference[] = [
  // =========================================================================
  // 1. TEMEL TEXTBOOKLAR
  // =========================================================================
  {
    id: 'tb-miller-anesthesia',
    category: 'textbooks',
    kind: 'Textbook',
    authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.).',
    title: "Miller's Anesthesia (9th & 10th Editions).",
    publication: 'Philadelphia: Elsevier.',
    year: '2020 / 2024',
    externalUrl: 'https://www.elsevier.com/books-and-journals/anesthesiology',
    usedInModules: [
      'İntraoperatif Sıvı Yönetimi',
      'Vazoaktif Karar Matriksi',
      'Anestezi Acilleri (MH, Bronkospazm, Laringospazm)',
      'Tedaviler & Elektrolitler',
      'Sistematik Prosedür Yönetimi',
      'Güvenli Vasküler Erişim (İnvaziv Arteriyel)'
    ],
    clinicalNote: 'Perioperatif sıvı fizyolojisi, otonomik farmakoloji, NORA, hava yolu komplikasyonları ve malign hipertermi ana başvuru kaynağı.'
  },
  {
    id: 'tb-jaffe-procedures',
    category: 'textbooks',
    kind: 'Textbook',
    authors: 'Jaffe RA, Schmiesing CA, Golianu B.',
    title: "Anesthesiologist's Manual of Surgical Procedures (5th Edition).",
    publication: 'Philadelphia: Wolters Kluwer / Lippincott Williams & Wilkins.',
    year: '2014',
    usedInModules: ['Sistematik Prosedür Bazlı Anestezi Yönetimi (Tüm Branşlar)'],
    clinicalNote: 'Cerrahi prosedürlerin pozisyon, süre, kan kaybı, kritik cerrahi anlar ve postoperatif analjezi standartlarını belirleyen temel kaynak.'
  },
  {
    id: 'tb-barash-clinical',
    category: 'textbooks',
    kind: 'Textbook',
    authors: 'Barash PG, Cullen BF, Stoelting RK, Cahalan MK, Stock MC, Ortega R, et al.',
    title: 'Clinical Anesthesia (8th Edition).',
    publication: 'Philadelphia: Wolters Kluwer.',
    year: '2017',
    usedInModules: [
      'Vazoaktif Karar Matriksi',
      'Sistematik Prosedür Yönetimi',
      'Anestezi Troubleshooting'
    ],
    clinicalNote: 'Kardiyovasküler farmakoloji, adrenerjik reseptör fizyolojisi, laparoskopi ve ayaktan/genel cerrahi anestezi yönetimi.'
  },
  {
    id: 'tb-morgan-mikhail',
    category: 'textbooks',
    kind: 'Textbook',
    authors: "Butterworth JF, Mackey DC, Wasnick JD.",
    title: "Morgan & Mikhail's Clinical Anesthesiology (7th Edition).",
    publication: 'New York: McGraw-Hill Education.',
    year: '2022',
    usedInModules: [
      'İntraoperatif Sıvı Yönetimi',
      'Anestezi Troubleshooting',
      'Temel İlaç Monografları'
    ],
    clinicalNote: 'İntraoperatif açlık açığı, 3. boşluk kayıpları, devre arızaları ve pratik ameliyathane içi problem çözme algoritmaları.'
  },
  {
    id: 'tb-marino-icu',
    category: 'textbooks',
    kind: 'Textbook',
    authors: 'Marino PL.',
    title: "Marino's The ICU Book (4th Edition).",
    publication: 'Philadelphia: Wolters Kluwer.',
    year: '2014',
    usedInModules: ['Yoğun Bakım Kabul Kriterleri', 'Potasyum & Elektrolit Protokolleri'],
    clinicalNote: 'Yoğun bakımda santral venöz potasyum derişim güvenliği, şok resüsitasyonu ve asit-baz fizyolojisi.'
  },
  {
    id: 'tb-rose-post',
    category: 'textbooks',
    kind: 'Textbook',
    authors: 'Rose BD, Post TW.',
    title: 'Clinical Physiology of Acid-Base and Electrolyte Disorders (5th Edition).',
    publication: 'New York: McGraw-Hill.',
    year: '2001',
    usedInModules: ['Tedaviler (Potasyum & Sodyum Hesaplayıcılar)'],
    clinicalNote: 'Total vücut potasyum açığı tahmini, transselüler şift mekanizmaları ve ozmotik denge matematiği.'
  },
  {
    id: 'tb-tintinalli',
    category: 'textbooks',
    kind: 'Textbook',
    authors: 'Tintinalli JE, Ma OJ, Yealy DM, et al.',
    title: "Tintinalli's Emergency Medicine: A Comprehensive Study Guide (9th Edition).",
    publication: 'New York: McGraw-Hill.',
    year: '2020',
    usedInModules: ['Potasyum Hesaplayıcı', 'Anestezi Acilleri'],
    clinicalNote: 'Acil elektrolit replasman dinamikleri ve akut kardiyopulmoner resüsitasyon protokolleri.'
  },

  // =========================================================================
  // 2. PERİOPERATİF KARDİYAK ARREST, ACLS VE HAYATİ KRİZLER
  // =========================================================================
  {
    id: 'acls-aha-2020',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'Panchal AR, Bartos JA, Cabañas JG, et al. (AHA ACLS Writing Group).',
    title: 'Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.',
    publication: 'Circulation. 2020;142(16_suppl_2):S366–S468 (ve 2023–2025 Focused Updates).',
    year: '2020–2025',
    pmid: '33081529',
    doi: '10.1161/CIR.0000000000000916',
    usedInModules: ['Anestezi Acilleri (ACLS)', 'Lidokain Protokolü', 'Adrenalin Protokolü'],
    clinicalNote: 'Erişkin ACLS şoklanabilir/şoklanamaz ritim algoritmaları, adrenalin zamanlaması, amiodaron/lidokain ve ROSC sonrası bakım.'
  },
  {
    id: 'acls-paramedic2-2018',
    category: 'emergencies_acls',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Perkins GD, Ji C, Deakin CD, et al. (PARAMEDIC2 Collaborators).',
    title: 'A Randomized Trial of Epinephrine in Out-of-Hospital Cardiac Arrest (PARAMEDIC2).',
    publication: 'New England Journal of Medicine. 2018;379(8):711–721.',
    year: '2018',
    pmid: '30021076',
    doi: '10.1056/NEJMoa1806842',
    usedInModules: ['Adrenalin Protokolü', 'Anestezi Acilleri (ACLS)'],
    clinicalNote: '8.014 olguluk çift-kör RKÇ; kardiyak arrestte 1 mg adrenalinin ROSC ve 30 günlük sağkalımı belirgin artırdığını ancak nörolojik prognozda KPR kalitesinin belirleyiciliğini gösterir.'
  },
  {
    id: 'acls-erc-als-2021',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'Soar J, Böttiger BW, Carli P, et al.',
    title: 'European Resuscitation Council Guidelines 2021: Adult advanced life support.',
    publication: 'Resuscitation. 2021;161:115–151.',
    year: '2021',
    pmid: '33773825',
    doi: '10.1016/j.resuscitation.2021.02.010',
    usedInModules: ['Anestezi Acilleri (ACLS, Pulmoner Emboli)', 'Lidokain Protokolü'],
    clinicalNote: 'Avrupa Resüsitasyon Konseyi ileri yaşam desteği, EtCO2 rehberliği ve trombolitik uygulanan arrestte uzatılmış KPR.'
  },
  {
    id: 'acls-erc-special-2021',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'Lott C, Truhlář A, Alfonzo A, et al. (ERC Special Circumstances Writing Group).',
    title: 'European Resuscitation Council Guidelines 2021: Cardiac arrest in special circumstances.',
    publication: 'Resuscitation. 2021;161:152–219.',
    year: '2021',
    pmid: '33773826',
    doi: '10.1016/j.resuscitation.2021.02.011',
    usedInModules: ['Anestezi Acilleri (Perioperatif Kardiyak Arrest & ACLS)'],
    clinicalNote: 'Ameliyathane içi arrest, prone KPR, pnömoperiton boşaltma, gebelikte 4–5 dk perimortem sezaryen ve ECPR standartları.'
  },
  {
    id: 'acls-moitra-2018',
    category: 'emergencies_acls',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Moitra VK, Einav S, Thies KC, et al.',
    title: 'Cardiac Arrest in the Operating Room: Resuscitation and Management for the Anesthesiologist: Part 1.',
    publication: 'Anesthesia & Analgesia. 2018;126(3):876–888.',
    year: '2018',
    pmid: '30044297',
    doi: '10.1213/ANE.0000000000003552',
    usedInModules: ['Anestezi Acilleri (Perioperatif Kardiyak Arrest & ACLS)'],
    clinicalNote: 'Anestezistler için ameliyathaneye özgü PEA nedenleri, EtCO2 ve invaziv arter diyastolik basıncı ile KPR optimizasyonu.'
  },
  {
    id: 'acls-mcevoy-2018',
    category: 'emergencies_acls',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'McEvoy MD, Thies KC, Einav S, et al.',
    title: 'Cardiac Arrest in the Operating Room: Part 2 — Special Situations in the Perioperative Period.',
    publication: 'Anesthesia & Analgesia. 2018;126(3):889–903.',
    year: '2018',
    pmid: '29200065',
    doi: '10.1213/ANE.0000000000002595',
    usedInModules: ['Anestezi Acilleri (Perioperatif Kardiyak Arrest & ACLS)'],
    clinicalNote: 'Laparoskopi, nöroaksiyel blok, hava embolisi, LAST, anafilaksi ve prone pozisyonda perioperatif arrest modifikasyonları.'
  },
  {
    id: 'mh-larach-1994',
    category: 'emergencies_acls',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Larach MG, Localio AR, Allen GC, et al.',
    title: 'A clinical grading scale to predict malignant hyperthermia susceptibility.',
    publication: 'Anesthesiology. 1994;80(4):771–779.',
    year: '1994',
    pmid: '8024130',
    doi: '10.1097/00000542-199404000-00008',
    usedInModules: ['Anestezi Acilleri (Malign Hipertermi)'],
    clinicalNote: 'Malign Hipertermi tanısında kullanılan 6 göstergeli Larach Klinik Derecelendirme Skalası (CGS) orijinal doğrulaması.'
  },
  {
    id: 'mh-emhg-2021',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'Rüffert H, Bastian B, Bendixen D, et al. (European Malignant Hyperthermia Group).',
    title: 'Consensus guidelines on perioperative management of malignant hyperthermia suspected or susceptible patients from the European Malignant Hyperthermia Group.',
    publication: 'British Journal of Anaesthesia (BJA). 2021;126(1):120–130.',
    year: '2021',
    pmid: '33269407',
    doi: '10.1016/j.bja.2020.09.029',
    usedInModules: ['Anestezi Acilleri (Malign Hipertermi)'],
    clinicalNote: 'EMHG 2021 MH krizi dantrolen dozlama, aktif soğutma, aktif karbon filtresi ve MH duyarlı hastada temiz anestezi hazırlığı.'
  },
  {
    id: 'mh-mhaus-guidelines',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'MHAUS Medical Advisory Board (Rosenberg H, et al.).',
    title: 'MHAUS Guidelines: Emergency Therapy for Malignant Hyperthermia.',
    publication: 'Malignant Hyperthermia Association of the United States (MHAUS).',
    year: '2023',
    externalUrl: 'https://www.mhaus.org/healthcare-professionals/managing-a-crisis/',
    usedInModules: ['Anestezi Acilleri (Malign Hipertermi)'],
    clinicalNote: '2.5 mg/kg Dantrolen (Dantrium vs Ryanodex) hızlı hazırlama, soğutma kesme eşiği (38°C) ve 48 saatlik YBÜ izlem protokolü.'
  },
  {
    id: 'last-asra-2020',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'Neal JM, Neal EJ, Weinberg GL.',
    title: 'American Society of Regional Anesthesia and Pain Medicine Local Anesthetic Systemic Toxicity checklist: 2020 version.',
    publication: 'Regional Anesthesia & Pain Medicine. 2021;46(1):81–86.',
    year: '2021',
    pmid: '33148630',
    doi: '10.1136/rapm-2020-101986',
    usedInModules: ['Sinir Blokları & LAST', 'Anestezi Acilleri (LAST)', 'Lidokain Protokolü', 'Adrenalin Protokolü'],
    clinicalNote: '%20 İntralipid (1.5 mL/kg bolus + 0.25 mL/kg/dk infüzyon), düşük doz adrenalin (≤1 mcg/kg) ve modifiye ACLS checklisti.'
  },
  {
    id: 'last-weinberg-2008',
    category: 'emergencies_acls',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Weinberg GL, Di Gregorio G, Ripper R, et al.',
    title: 'Resuscitation with lipid emulsion: active metabolite or physical sink?',
    publication: 'Anesthesiology. 2008;108(6):1007–1014.',
    year: '2008',
    doi: '10.1097/ALN.0b013e318173f66e',
    usedInModules: ['Anestezi Acilleri (LAST)'],
    clinicalNote: 'Lipid sink (lipid havuzu) ve metabolik/inotrofik lipid mekiği (lipid shuttle) kurtarma mekanizmasının deneysel temeli.'
  },
  {
    id: 'last-gitman-2019',
    category: 'emergencies_acls',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Gitman M, Fettiplace MR, Weinberg GL, Neal JM, Barrington MJ.',
    title: 'Local Anesthetic Systemic Toxicity: A Systematic Review of Recent Case Reports and Registry Data.',
    publication: 'Regional Anesthesia & Pain Medicine. 2019;44(6):629–635.',
    year: '2019',
    doi: '10.1136/rapm-2018-100181',
    usedInModules: ['Anestezi Acilleri (LAST)'],
    clinicalNote: 'Güncel olgu kayıtlarında LAST klinik prezentasyon zamanlaması ve fasya plan blokları sonrası geç toksisite profilleri.'
  },
  {
    id: 'anaph-nap6-2018',
    category: 'emergencies_acls',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Harper NJN, Cook TM, Garcez T, et al. (NAP6 Steering Group).',
    title: 'Anaesthesia, surgery, and life-threatening allergic reactions: epidemiology and clinical features of perioperative anaphylaxis in the 6th National Audit Project (NAP6).',
    publication: 'British Journal of Anaesthesia. 2018;121(1):159–171.',
    year: '2018',
    pmid: '29935569',
    doi: '10.1016/j.bja.2018.04.015',
    usedInModules: ['Anestezi Acilleri (Anafilaksi)', 'Adrenalin Protokolü'],
    clinicalNote: 'Perioperatif anafilaksi epidemiyolojisi (antibiyotikler, NMBAlar, klorheksidin, patent blue), erken adrenalin ve triptaz protokolü.'
  },
  {
    id: 'anaph-garvey-2019',
    category: 'emergencies_acls',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Garvey LH, Dewachter P, Hepner DL, et al.',
    title: 'Management of suspected immediate perioperative allergic reactions: an international consensus statement.',
    publication: 'British Journal of Anaesthesia. 2019;123(1):e50–e64.',
    year: '2019',
    pmid: '31130272',
    doi: '10.1016/j.bja.2019.04.044',
    usedInModules: ['Anestezi Acilleri (Anafilaksi)', 'Adrenalin Protokolü'],
    clinicalNote: 'Şiddete göre IV/IM adrenalin titrasyonu, agresif kristaloid resüsitasyonu ve seri serum triptaz (1. saat, 2-4. saat, bazal) zamanlaması.'
  },
  {
    id: 'anaph-ring-messmer-1977',
    category: 'emergencies_acls',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Ring J, Messmer K.',
    title: 'Incidence and severity of anaphylactoid reactions to colloid solutions.',
    publication: 'The Lancet. 1977;309(8010):466–469.',
    year: '1977',
    pmid: '65572',
    doi: '10.1016/s0140-6736(77)91953-5',
    usedInModules: ['Anestezi Acilleri (Anafilaksi)'],
    clinicalNote: 'Klasik Ring & Messmer Evre I–IV perioperatif anafilaksi şiddet derecelendirme skalasının orijinal makalesi.'
  },
  {
    id: 'anaph-wao-2020',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'Cardona V, Ansotegui IJ, Ebisawa M, et al.',
    title: 'World Allergy Organization Anaphylaxis Guidance 2020.',
    publication: 'World Allergy Organization Journal. 2020;13(10):100472.',
    year: '2020',
    pmid: '33204386',
    doi: '10.1016/j.waojou.2020.100472',
    usedInModules: ['Anestezi Acilleri (Anafilaksi)'],
    clinicalNote: 'Dünya Alerji Örgütü küresel anafilaksi tanı kriterleri, intramüsküler/IV epinefrin önceliği ve bifazik reaksiyon izlemi.'
  },
  {
    id: 'pe-esc-2019',
    category: 'emergencies_acls',
    kind: 'Uluslararası Kılavuz',
    authors: 'Konstantinides SV, Meyer G, Becattini C, et al.',
    title: '2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the ERS.',
    publication: 'European Heart Journal. 2020;41(4):543–603.',
    year: '2020',
    pmid: '31697840',
    doi: '10.1093/eurheartj/ehz726',
    usedInModules: ['Anestezi Acilleri (Pulmoner Embolizm)'],
    clinicalNote: 'Yüksek riskli masif PE tanı, RV yüklenmesinde sıvı kısıtlaması (maks 500 mL), sistemik tromboliz ve PERT/ECMO karar akışı.'
  },
  {
    id: 'pe-aha-2011',
    category: 'emergencies_acls',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Jaff MR, McMurtry MS, Archer SL, et al.',
    title: 'Management of massive and submassive pulmonary embolism, iliofemoral deep vein thrombosis, and chronic thromboembolic pulmonary hypertension.',
    publication: 'Circulation. 2011;123(16):1788–1830.',
    year: '2011',
    pmid: '21422387',
    doi: '10.1161/CIR.0b013e318214914f',
    usedInModules: ['Anestezi Acilleri (Pulmoner Embolizm)'],
    clinicalNote: 'AHA masif ve submasif PE risk sınıflaması, trombolitik dozları ve kateter/cerrahi embolektomi endikasyonları.'
  },
  {
    id: 'vae-mirski-2007',
    category: 'emergencies_acls',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Mirski MA, Lele AV, Fitzsimmons L, Toung TJ.',
    title: 'Diagnosis and treatment of vascular air embolism.',
    publication: 'Anesthesiology. 2007;106(1):164–177.',
    year: '2007',
    pmid: '17197859',
    doi: '10.1097/00000542-200701000-00026',
    usedInModules: ['Anestezi Acilleri (Venöz & Paradoksal Hava Embolisi)'],
    clinicalNote: 'Prekordiyal Doppler ve TEE duyarlılığı, Durant manevrası, Bunegin-Albin CVC hava aspirasyonu ve HBOT basamakları.'
  },
  {
    id: 'vae-muth-2000',
    category: 'emergencies_acls',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Muth CM, Shank ES.',
    title: 'Gas embolism.',
    publication: 'New England Journal of Medicine. 2000;342(7):476–482.',
    year: '2000',
    pmid: '10675429',
    doi: '10.1056/NEJM200002173420706',
    usedInModules: ['Anestezi Acilleri (Venöz & Paradoksal Hava Embolisi)'],
    clinicalNote: 'Venöz ve arteriyel/paradoksal gaz embolisi patofizyolojisi, 3–5 mL/kg letal hava hacmi ve hiperbarik oksijen mekanizması.'
  },

  // =========================================================================
  // 3. HAVA YOLU YÖNETİMİ, ZOR ENTÜBASYON, ASPİRASYON & EKSTÜBASYON
  // =========================================================================
  {
    id: 'airway-das-2015',
    category: 'airway',
    kind: 'Uluslararası Kılavuz',
    authors: 'Frerk C, Mitchell VS, McNarry AF, et al. (Difficult Airway Society).',
    title: 'Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults.',
    publication: 'British Journal of Anaesthesia. 2015;115(6):827–848.',
    year: '2015',
    pmid: '26556848',
    doi: '10.1093/bja/aev371',
    usedInModules: ['Anestezi Acilleri (CICO, Hava Yolu Obstrüksiyonu)', 'Klinik İnfografikler (RSI)'],
    clinicalNote: 'Plan A–D zor entübasyon basamakları, 3+1 girişim sınırı ve Plan D acil neşter-buji-tüp krikotiroidotomi standardı.'
  },
  {
    id: 'airway-asa-2022',
    category: 'airway',
    kind: 'Uluslararası Kılavuz',
    authors: 'Apfelbaum JL, Hagberg CA, Connis RT, et al. (ASA Task Force on Management of the Difficult Airway).',
    title: '2022 American Society of Anesthesiologists Practice Guidelines for Management of the Difficult Airway.',
    publication: 'Anesthesiology. 2022;136(1):31–81.',
    year: '2022',
    pmid: '34762729',
    doi: '10.1097/ALN.0000000000004002',
    usedInModules: ['Anestezi Acilleri (CICO, Hava Yolu Obstrüksiyonu)', 'Havayolu Yönetimi'],
    clinicalNote: 'Güncel ASA zor hava yolu karar ağacı, uyanık fiberoptik entübasyon endikasyonları ve eFONA geçiş kriterleri.'
  },
  {
    id: 'airway-nap4-2011',
    category: 'airway',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Cook TM, Woodall N, Frerk C. (Royal College of Anaesthetists).',
    title: 'Major complications of airway management in the UK: results of the Fourth National Audit Project (NAP4).',
    publication: 'British Journal of Anaesthesia. 2011;106(5):617–642.',
    year: '2011',
    pmid: '21447488',
    doi: '10.1093/bja/aer058',
    usedInModules: ['Anestezi Acilleri (CICO, Hava Yolu Obstrüksiyonu)'],
    clinicalNote: 'Anestezi ve YBÜ hava yolu ölümlerinde kapnografi yokluğunun, tekrarlanan kör girişimlerin ve gecikmiş cerrahi hava yolunun analizi.'
  },
  {
    id: 'airway-das-extub-2012',
    category: 'airway',
    kind: 'Uluslararası Kılavuz',
    authors: 'Popat M, Mitchell V, Dravid R, et al. (Difficult Airway Society Extubation Guidelines Group).',
    title: 'Difficult Airway Society Guidelines for the management of tracheal extubation.',
    publication: 'Anaesthesia. 2012;67(3):318–340.',
    year: '2012',
    pmid: '22321104',
    doi: '10.1111/j.1365-2044.2012.07075.x',
    usedInModules: ['Anestezi Acilleri (Laringospazm)'],
    clinicalNote: 'Riskli ekstübasyon stratejileri, uyanık/derin ekstübasyon ayrımı ve ekstübasyon sonrası laringospazm önleme algoritması.'
  },
  {
    id: 'airway-higgs-2018',
    category: 'airway',
    kind: 'Uluslararası Kılavuz',
    authors: 'Higgs A, McGrath BA, Goddard C, et al. (Difficult Airway Society).',
    title: 'Guidelines for the management of tracheal intubation in critically ill adults.',
    publication: 'British Journal of Anaesthesia. 2018;120(2):323–352.',
    year: '2018',
    pmid: '29406182',
    doi: '10.1016/j.bja.2017.10.021',
    usedInModules: ['Klinik İnfografikler (RSI vs Elektif)', 'Anestezi Acilleri (Aspirasyon)'],
    clinicalNote: 'Kritik hastada modifiye RSI, nazal apneik oksijenizasyon (NODESAT), nazik maske stratejisi ve peri-entübasyon hemodinami.'
  },
  {
    id: 'airway-thyroid-2022',
    category: 'airway',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Iliff HA, El-Boghdadly K, Ahmad I, et al. (DAS, BAETS & ENT-UK).',
    title: 'Management of haematoma after thyroid surgery: systematic review and multidisciplinary consensus guidelines from DAS, BAETS and ENT-UK.',
    publication: 'Anaesthesia. 2022;77(1):82–95.',
    year: '2022',
    pmid: '34545943',
    doi: '10.1111/anae.15585',
    usedInModules: ['Anestezi Acilleri (Akut Hava Yolu Obstrüksiyonu)'],
    clinicalNote: 'Tiroid cerrahisi sonrası akut boyun hematomunda yatak başı SCOOP dikiş açma protokolü ve venöz konjesyon yönetimi.'
  },
  {
    id: 'airway-rsi-el-orbany-2010',
    category: 'airway',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'El-Orbany M, Connolly LA.',
    title: 'Rapid sequence induction and intubation: current controversy.',
    publication: 'Anesthesia & Analgesia. 2010;110(5):1318–1325.',
    year: '2010',
    pmid: '20237045',
    doi: '10.1213/ANE.0b013e3181d5ae47',
    usedInModules: ['Klinik İnfografikler (RSI vs Elektif)'],
    clinicalNote: 'Klasik ve modifiye RSI karşılaştırması, yüksek doz rokuronyum (1.2 mg/kg) vs süksinilkolin ve krikoid bası tartışmaları.'
  },
  {
    id: 'airway-algie-cochrane-2015',
    category: 'airway',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Algie CM, Mahar RK, Tan HB, et al.',
    title: 'Effectiveness and risks of cricoid pressure during rapid sequence induction for endotracheal intubation.',
    publication: 'Cochrane Database of Systematic Reviews. 2015;(11):CD011656.',
    year: '2015',
    pmid: '26578526',
    doi: '10.1002/14651858.CD011656.pub2',
    usedInModules: ['Klinik İnfografikler (RSI vs Elektif)'],
    clinicalNote: 'Sellick manevrasının (krikoid bası) aspirasyonu önlemedeki kanıt düzeyi ve laringoskopi görüntüsünü bozma riski.'
  },
  {
    id: 'airway-perlas-2016',
    category: 'airway',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Perlas A, Van de Putte P, Van Houwe P, Chan VW.',
    title: 'I-AIM framework for point-of-care gastric ultrasound in the perioperative setting.',
    publication: 'British Journal of Anaesthesia. 2016;116(1):7–11.',
    year: '2016',
    pmid: '25951832',
    doi: '10.1093/bja/aev113',
    usedInModules: ['Anestezi Acilleri (Pulmoner Aspirasyon)'],
    clinicalNote: 'Yatak başı gastrik ultrasonografi (GUS) ile antral içerik derecelendirmesi (Perlas Grade 0–2) ve aspirasyon risk tayini.'
  },
  {
    id: 'airway-larson-1998',
    category: 'airway',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Larson CP Jr.',
    title: 'Laryngospasm—the best treatment.',
    publication: 'Anesthesiology. 1998;89(5):1293–1294.',
    year: '1998',
    pmid: '9822036',
    doi: '10.1097/00000542-199811000-00056',
    usedInModules: ['Anestezi Acilleri (Laringospazm)'],
    clinicalNote: 'Mastoid çıkıntı ile ramus mandibula arasındaki çentiğe uygulanan Larson manevrası (Laryngospasm Notch) orijinal tekniği.'
  },
  {
    id: 'airway-orliaguet-2012',
    category: 'airway',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Orliaguet GA, Gall O, Savoldelli GL, Couloigner V.',
    title: 'Case scenario: perianesthetic management of laryngospasm in children.',
    publication: 'Anesthesiology. 2012;116(2):458–471.',
    year: '2012',
    pmid: '22222477',
    doi: '10.1097/ALN.0b013e318242aae9',
    usedInModules: ['Anestezi Acilleri (Laringospazm)'],
    clinicalNote: 'Pediatrik laringospazmda propofol, sub-paralitik süksinilkolin ve damar yolu olmayan olguda intramüsküler kurtarma.'
  },
  {
    id: 'airway-woods-asthma-2009',
    category: 'airway',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Woods BD, Sladen RN.',
    title: 'Perioperative considerations for the patient with asthma and bronchospasm.',
    publication: 'British Journal of Anaesthesia. 2009;103(Suppl 1):i57–i65.',
    year: '2009',
    pmid: '20007991',
    doi: '10.1093/bja/aep271',
    usedInModules: ['Anestezi Acilleri (Akut Bronkospazm)'],
    clinicalNote: 'İntraoperatif bronkospazmda sevofluran derinleştirme, desfluran yasağı, salbutamol, ketamin ve oto-PEEP boşaltma manevrası.'
  },

  // =========================================================================
  // 4. PREOPERATİF DEĞERLENDİRME, AÇLIK, RİSK SKORLARI VE DERLENME
  // =========================================================================
  {
    id: 'preop-asa-ps-2026',
    category: 'preop_recovery',
    kind: 'Uluslararası Kılavuz',
    authors: 'American Society of Anesthesiologists (ASA House of Delegates).',
    title: 'Statement on ASA Physical Status Classification System (Last amended October 22, 2025).',
    publication: 'Anesthesiology Open. 2026;1:e0002.',
    year: '2025 / 2026',
    doi: '10.1097/ao9.0000000000000002',
    usedInModules: ['Preoperatif Değerlendirme (ASA Sınıflaması)'],
    clinicalNote: 'Güncel 2025/2026 ASA I–VI sınıflaması, obstetrik ve pediatrik örnekleri dahil resmi klinik tanı standardı.'
  },
  {
    id: 'preop-aha-acc-2024',
    category: 'preop_recovery',
    kind: 'Uluslararası Kılavuz',
    authors: 'Thompson A, Fleischmann KE, Smilowitz NR, et al.',
    title: '2024 AHA/ACC/ACS/ASNC/HRS/SCA/SCCT/SCMR/SVM Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery.',
    publication: 'J Am Coll Cardiol / Circulation. 2024;150(19):e351–e442.',
    year: '2024',
    pmid: '39320289',
    doi: '10.1016/j.jacc.2024.06.013',
    externalUrl: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001285',
    usedInModules: ['Preoperatif Değerlendirme (MACE)', 'Klinik İnfografikler (Cerrahi Aciliyet 2024)'],
    clinicalNote: 'Güncel 2024 AHA/ACC cerrahi aciliyet zaman penceresi (Acil <2 sa, Acil-Urgent 2–24 sa, Time-Sensitive <3 ay, Elektif) ve CV risk algoritması.'
  },
  {
    id: 'preop-esc-ncs-2022',
    category: 'preop_recovery',
    kind: 'Uluslararası Kılavuz',
    authors: 'Halvorsen S, Mehilli J, Cassese S, et al. (ESC Scientific Document Group).',
    title: '2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery.',
    publication: 'European Heart Journal. 2022;43(39):3826–3924.',
    year: '2022',
    pmid: '36017553',
    doi: '10.1093/eurheartj/ehac270',
    usedInModules: ['Preoperatif Değerlendirme (MACE)', 'Klinik İnfografikler (Cerrahi Risk Sınıflaması)'],
    clinicalNote: 'Cerrahi prosedüre özgü 30 günlük kardiyak risk tablosu (<%1 düşük, %1–5 orta, >%5 yüksek) ve antitrombotik kesme/köprüleme önerileri.'
  },
  {
    id: 'preop-rcri-lee-1999',
    category: 'preop_recovery',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Lee TH, Marcantonio ER, Mangione CM, et al.',
    title: 'Derivation and prospective validation of a simple index for prediction of cardiac risk of major noncardiac surgery.',
    publication: 'Circulation. 1999;100(10):1043–1049.',
    year: '1999',
    pmid: '10477528',
    doi: '10.1161/01.cir.100.10.1043',
    usedInModules: ['Preoperatif Değerlendirme (MACE Hesaplayıcı)'],
    clinicalNote: 'Revised Cardiac Risk Index (RCRI) 6 kriterli orijinal prospektif türetme ve validasyon çalışması.'
  },
  {
    id: 'preop-ccs-2017',
    category: 'preop_recovery',
    kind: 'Uluslararası Kılavuz',
    authors: 'Duceppe E, Parlow J, MacDonald P, et al. (Devereaux PJ, CCS).',
    title: 'Canadian Cardiovascular Society Guidelines on Perioperative Cardiac Risk Assessment and Management for Patients Who Undergo Noncardiac Surgery.',
    publication: 'Canadian Journal of Cardiology. 2017;33(1):17–32.',
    year: '2017',
    pmid: '27865641',
    doi: '10.1016/j.cjca.2016.09.008',
    usedInModules: ['Preoperatif Değerlendirme (MACE Hesaplayıcı)'],
    clinicalNote: 'RCRI skorlarının modern troponin monitörizasyonlu güncel MACE oranlarıyla (0: %3.9, 1: %6.0, 2: %10.1, ≥3: %15.0) dış doğrulaması.'
  },
  {
    id: 'preop-gupta-2011',
    category: 'preop_recovery',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Gupta PK, Gupta H, Sundaram A, et al.',
    title: 'Development and validation of a risk calculator for prediction of cardiac risk after surgery (NSQIP MICA).',
    publication: 'Circulation. 2011;124(4):381–387.',
    year: '2011',
    pmid: '21730309',
    doi: '10.1161/CIRCULATIONAHA.110.015701',
    usedInModules: ['Preoperatif Değerlendirme (MACE Hesaplayıcı)'],
    clinicalNote: 'ACS NSQIP veri tabanından türetilen yaş, ASA sınıfı, fonksiyonel durum, kreatinin ve cerrahi tip bazlı MICA risk modeli.'
  },
  {
    id: 'preop-dasi-hlatky-1989',
    category: 'preop_recovery',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Hlatky MA, Boineau RE, Higginbotham MB, et al.',
    title: 'A brief self-administered questionnaire to determine functional capacity (the Duke Activity Status Index).',
    publication: 'Am J Cardiol. 1989;64(10):651–654.',
    year: '1989',
    pmid: '2782256',
    doi: '10.1016/0002-9149(89)90496-7',
    usedInModules: ['Preoperatif Değerlendirme (DASI Hesaplayıcı)'],
    clinicalNote: '12 soruluk yapılandırılmış DASI anketinin (0–58.20 puan) ve VO₂peak = 0.43 × DASI + 9.6 regresyon denkleminin orijinal validasyonu.'
  },
  {
    id: 'preop-mets-wijeysundera-2018',
    category: 'preop_recovery',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Wijeysundera DN, Pearse RM, Shulman MA, et al. (METS Study Investigators).',
    title: 'Assessment of functional capacity before major non-cardiac surgery: an international, prospective cohort study.',
    publication: 'Lancet. 2018;391(10140):2631–2640.',
    year: '2018',
    pmid: '30070222',
    doi: '10.1016/S0140-6736(18)31131-0',
    usedInModules: ['Preoperatif Değerlendirme (DASI Hesaplayıcı)'],
    clinicalNote: 'Uluslararası prospektif METS Çalışması; yapılandırılmış DASI anketinin subjektif hekim tahminine üstünlüğünü ve DASI ≤ 34 eşiğinde artmış 30 günlük ölüm/MI riskini kanıtlar.'
  },
  {
    id: 'preop-asa-fasting-2023',
    category: 'preop_recovery',
    kind: 'Uluslararası Kılavuz',
    authors: 'Joshi GP, Abdelmalak BB, Weigel WA, et al. (ASA Task Force).',
    title: '2023 American Society of Anesthesiologists Practice Guidelines for Preoperative Fasting: Carbohydrate-Containing Clear Liquids with or without Protein, Chewing Gum, and Pediatric Fasting Duration.',
    publication: 'Anesthesiology. 2023;138(2):132–151.',
    year: '2023',
    pmid: '36629465',
    doi: '10.1097/ALN.0000000000004381',
    usedInModules: ['Klinik İnfografikler (Erişkin Açlık Süreleri)', 'Anestezi Acilleri (Aspirasyon)'],
    clinicalNote: 'Berrak sıvılar için 2 saat, karbonhidratlı içecekler, sakız çiğneme sonrası erteleme yapılmaması ve güncel preoperatif açlık güncellemesi.'
  },
  {
    id: 'preop-asa-glp1-2023',
    category: 'preop_recovery',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Joshi GP, Abdelmalak BB, Weigel WA, et al.',
    title: 'American Society of Anesthesiologists Consensus-Based Guidance on Preoperative Management of Patients on Glucagon-Like Peptide-1 (GLP-1) Receptor Agonists.',
    publication: 'ASA Task Force on Preoperative Fasting Guidance.',
    year: '2023',
    externalUrl: 'https://www.asahq.org/about-asa/newsroom/news-releases/2023/06/american-society-of-anesthesiologists-consensus-based-guidance-on-preoperative',
    usedInModules: ['Klinik İnfografikler (Erişkin Açlık Süreleri)'],
    clinicalNote: 'Semaglutid, liraglutid ve tirzepatid gibi GLP-1 agonistlerinde gecikmiş mide boşalması riski ve gastrik USG / RSI kararları.'
  },
  {
    id: 'preop-esaic-peds-2022',
    category: 'preop_recovery',
    kind: 'Uluslararası Kılavuz',
    authors: 'Frykholm P, Disma N, Andersson H, et al.',
    title: 'Pre-operative fasting in children: A guideline from the European Society of Anaesthesiology and Intensive Care.',
    publication: 'European Journal of Anaesthesiology. 2022;39(1):4–25.',
    year: '2022',
    pmid: '34857683',
    doi: '10.1097/EJA.0000000000001599',
    usedInModules: ['Klinik İnfografikler (Pediatrik Açlık 1-3-4-6 Kuralı)'],
    clinicalNote: 'Çocuklarda 1 saat berrak sıvı, 3 saat anne sütü, 4 saat mama/hafif kahvaltı ve 6 saat katı gıda serbestleştirilmiş açlık kuralı.'
  },
  {
    id: 'rec-aldrete-1995',
    category: 'preop_recovery',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Aldrete JA.',
    title: 'The post-anesthesia recovery score revisited.',
    publication: 'Journal of Clinical Anesthesia. 1995;7(1):89–91.',
    year: '1995',
    pmid: '7772368',
    doi: '10.1016/0952-8180(94)00001-k',
    usedInModules: ['Klinik İnfografikler (Modifiye Aldrete Skoru)'],
    clinicalNote: 'PACU (derlenme ünitesi) taburculuğu için SpO2 parametresini ekleyen 10 puanlık Modifiye Aldrete Skorlama sistemi.'
  },
  {
    id: 'rec-padss-1995',
    category: 'preop_recovery',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Chung F, Chan VW, Ong D.',
    title: 'A post-anesthetic discharge scoring system for home readiness after ambulatory surgery.',
    publication: 'Journal of Clinical Anesthesia. 1995;7(6):500–506.',
    year: '1995',
    pmid: '8534468',
    doi: '10.1016/0952-8180(95)00130-a',
    usedInModules: ['Klinik İnfografikler (PADSS Taburculuk Skoru)'],
    clinicalNote: 'Günübirlik cerrahide (Faz II) eve güvenli taburculuk için 10 puanlık PADSS (≥9 puan eşiği) doğrulaması.'
  },

  // =========================================================================
  // 5. İNTRAOPERATİF SIVI YÖNETİMİ VE HEMODİNAMİK OPTİMİZASYON
  // =========================================================================
  {
    id: 'fluid-relief-2018',
    category: 'fluid_hemodynamics',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Myles PS, Bellomo R, Corcoran T, et al. (RELIEF Trial Investigators).',
    title: 'Restrictive versus Liberal Fluid Therapy for Major Abdominal Surgery (RELIEF Trial).',
    publication: 'New England Journal of Medicine. 2018;378(24):2263–2274.',
    year: '2018',
    pmid: '29742967',
    doi: '10.1056/NEJMoa1801601',
    usedInModules: ['İntraoperatif Sıvı Yönetimi (Liberal vs Restriktif vs GDFT)'],
    clinicalNote: '3000 hastada aşırı restriktif sıvı rejiminin akut böbrek hasarı (%8.6 vs %5.0) ve cerrahi alan enfeksiyonunu artırdığını kanıtlayan RKÇ.'
  },
  {
    id: 'fluid-eras-colorectal-2019',
    category: 'fluid_hemodynamics',
    kind: 'Uluslararası Kılavuz',
    authors: 'Gustafsson UO, Scott MJ, Hubner M, et al.',
    title: 'Guidelines for Perioperative Care in Elective Colorectal Surgery: Enhanced Recovery After Surgery (ERAS®) Society Recommendations: 2018.',
    publication: 'World Journal of Surgery. 2019;43(3):659–695.',
    year: '2019',
    pmid: '30426190',
    doi: '10.1007/s00268-018-4844-y',
    usedInModules: ['İntraoperatif Sıvı Yönetimi', 'Sistematik Prosedürler (GIS)'],
    clinicalNote: 'ERAS sıfır-denge (near-zero fluid balance), preoperatif karbonhidrat yüklemesi ve yüksek riskli olgularda GDFT önerileri.'
  },
  {
    id: 'fluid-poqi-2016',
    category: 'fluid_hemodynamics',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Thiele RH, Raghunathan K, Brudney CS, Lobo DN, Miller TE, et al. (ASER / POQI Workgroup).',
    title: 'American Society for Enhanced Recovery (ASER) and Perioperative Quality Initiative (POQI) joint consensus statement on perioperative fluid management.',
    publication: 'Perioperative Medicine. 2016;5:24.',
    year: '2016',
    pmid: '27660701',
    doi: '10.1186/s13741-016-0049-9',
    usedInModules: ['İntraoperatif Sıvı Yönetimi (Liberal vs Restriktif vs GDFT)'],
    clinicalNote: 'Cerrahi risk düzeyine göre düşük riskte ılımlı övolemik, majör riskli cerrahide hedefe yönelik (GDFT) sıvı optimizasyonu çerçevesi.'
  },
  {
    id: 'fluid-optimise2-2024',
    category: 'fluid_hemodynamics',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Edwards MR, Forbes G, MacDonald N, Pearse RM, et al. (OPTIMISE II Investigators).',
    title: 'Cardiac output-guided haemodynamic therapy for patients undergoing major gastrointestinal surgery: OPTIMISE II randomised clinical trial.',
    publication: 'BMJ. 2024;387:e080439.',
    year: '2024',
    pmid: '39626899',
    doi: '10.1136/bmj-2024-080439',
    usedInModules: ['İntraoperatif Sıvı Yönetimi (GDFT)'],
    clinicalNote: 'Modern ERAS çağında rutin kalp debisi-güdümlü sıvı + inotrop protokolünün infeksiyon/mortalite sınırlarını gösteren 2024 RKÇ.'
  },
  {
    id: 'fluid-fedora-2018',
    category: 'fluid_hemodynamics',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Calvo-Vecino JM, Ripollés-Melchor J, Mythen MG, et al. (FEDORA Trial).',
    title: 'Effect of goal-directed haemodynamic therapy on postoperative complications in low–moderate risk surgical patients: a multicentre randomised controlled trial.',
    publication: 'British Journal of Anaesthesia. 2018;120(4):734–744.',
    year: '2018',
    pmid: '29576114',
    doi: '10.1016/j.bja.2017.12.018',
    usedInModules: ['İntraoperatif Sıvı Yönetimi (GDFT)'],
    clinicalNote: 'Özofageal Doppler rehberliğinde SV optimizasyonu ile postoperatif komplikasyonlar ve hastane yatış süresinde anlamlı azalma.'
  },
  {
    id: 'fluid-nice-cg174',
    category: 'fluid_hemodynamics',
    kind: 'Uluslararası Kılavuz',
    authors: 'National Institute for Health and Care Excellence (NICE).',
    title: 'Intravenous fluid therapy in adults in hospital (NICE Clinical Guideline CG174).',
    publication: 'NICE Guidelines (Updated 2017).',
    year: '2013 / 2017',
    externalUrl: 'https://www.nice.org.uk/guidance/cg174',
    usedInModules: ['İntraoperatif Sıvı Yönetimi'],
    clinicalNote: 'Hastane içi IV sıvı yönetiminde 5R yaklaşımı (Resuscitation, Routine maintenance, Replacement, Redistribution, Reassessment).'
  },
  {
    id: 'fluid-holliday-segar-1957',
    category: 'fluid_hemodynamics',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Holliday MA, Segar WE.',
    title: 'The maintenance need for water in parenteral fluid therapy.',
    publication: 'Pediatrics. 1957;19(5):823–832.',
    year: '1957',
    pmid: '13431307',
    usedInModules: ['Kilo, MV Volüm & İdame Sıvı Hesaplayıcı', 'İntraop Sıvı Hesaplayıcı (Liberal)', 'Klinik Hesaplayıcılar'],
    clinicalNote: 'Klasik 4-2-1 saatlik ve 100-50-20 günlük idame sıvı gereksinimi formülünün orijinal kalorik fizyoloji çalışması.'
  },
  {
    id: 'fluid-oh-1980',
    category: 'fluid_hemodynamics',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Oh TH.',
    title: 'Formulas for calculating fluid maintenance requirements.',
    publication: 'Anesthesiology. 1980;53(4):351.',
    year: '1980',
    pmid: '7425366',
    doi: '10.1097/00000542-198010000-00020',
    usedInModules: ['Kilo, MV Volüm & İdame Sıvı Hesaplayıcı'],
    clinicalNote: 'Holliday-Segar ağırlık bazlı idame sıvı formülünün anestezi pratiğindeki saatlik (4-2-1) cebirsel doğrulaması.'
  },
  {
    id: 'fluid-arya-2012',
    category: 'fluid_hemodynamics',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Arya VK.',
    title: 'Basics of fluid and blood transfusion therapy in paediatric surgical patients.',
    publication: 'Indian Journal of Anaesthesia. 2012;56(5):454–462.',
    year: '2012',
    pmid: '23293384',
    doi: '10.4103/0019-5049.103960',
    usedInModules: ['Kilo, MV Volüm & İdame Sıvı Hesaplayıcı'],
    clinicalNote: 'Pediatrik cerrahide 4-2-1 idame, açlık defisiti ve üçüncü boşluk sıvı replasmanı prensipleri.'
  },

  // =========================================================================
  // 6. YOĞUN BAKIM KABUL KRİTERLERİ, SEPSİS, ŞOK VE VAZOAKTİF AJANLAR
  // =========================================================================
  {
    id: 'icu-sccm-triage-2016',
    category: 'icu_vasoactive',
    kind: 'Uluslararası Kılavuz',
    authors: 'Nates JL, Nunnally M, Kleinpell R, et al.',
    title: 'ICU Admission, Discharge, and Triage Guidelines: A Framework to Enhance Clinical Operations, Development of Institutional Policies, and Further Research.',
    publication: 'Critical Care Medicine. 2016;44(8):1553–1602.',
    year: '2016',
    pmid: '27428118',
    doi: '10.1097/CCM.0000000000001856',
    usedInModules: ['Yoğun Bakım Kabul Kriterleri (Triyaj Priority 1–4)'],
    clinicalNote: 'SCCM Priority 1–4 yoğun bakım yatış önceliklendirme, fizyolojik eşikler ve taburculuk/triyaj modeli.'
  },
  {
    id: 'icu-sepsis3-2016',
    category: 'icu_vasoactive',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Singer M, Deutschman CS, Seymour CW, et al.',
    title: 'The Third International Consensus Definitions for Sepsis and Septic Shock (Sepsis-3).',
    publication: 'JAMA. 2016;315(8):801–810.',
    year: '2016',
    pmid: '26903338',
    doi: '10.1001/jama.2016.0287',
    usedInModules: ['Yoğun Bakım Kabul Kriterleri (SOFA Skoru)'],
    clinicalNote: 'SOFA organ yetmezliği skoru (≥2 puan artışı) ve septik şok (MAP < 65 mmHg vazopresör gereksinimi + laktat > 2 mmol/L) tanımları.'
  },
  {
    id: 'icu-ssc-2021',
    category: 'icu_vasoactive',
    kind: 'Uluslararası Kılavuz',
    authors: 'Evans L, Rhodes A, Alhazzani W, et al.',
    title: 'Surviving Sepsis Campaign: International Guidelines for Management of Sepsis and Septic Shock 2021.',
    publication: 'Intensive Care Medicine / Critical Care Medicine. 2021;49(11):e1063–e1143.',
    year: '2021',
    pmid: '34605781',
    doi: '10.1097/CCM.0000000000005337',
    usedInModules: ['Vazoaktif Karar Matriksi', 'Noradrenalin Protokolü', 'Adrenalin Protokolü', 'Yoğun Bakım'],
    clinicalNote: 'Septik şokta 1. basamak noradrenalin (hedef MAP ≥ 65 mmHg), erken periferik başlama ve >0.25 mcg/kg/dk dozunda vazopressin eklenmesi.'
  },
  {
    id: 'icu-cats-annane-2007',
    category: 'icu_vasoactive',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Annane D, Vignon P, Renault A, et al. (CATS Study Group).',
    title: 'Norepinephrine plus dobutamine versus epinephrine alone for management of septic shock: a randomised trial.',
    publication: 'The Lancet. 2007;370(9588):676–684.',
    year: '2007',
    pmid: '17720019',
    doi: '10.1016/S0140-6736(07)61344-0',
    usedInModules: ['Adrenalin Protokolü', 'Vazoaktif Karar Matriksi'],
    clinicalNote: 'Septik şokta tek başına adrenalin ile noradrenalin+dobutamin kombinasyonunu kıyaslayan CATS RKÇ; mortalite benzerken adrenalinde geçici Tip-B laktat artışı bildirilmiştir.'
  },
  {
    id: 'icu-soap2-2010',
    category: 'icu_vasoactive',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'De Backer D, Biston P, Devriendt J, et al. (SOAP II Investigators).',
    title: 'Comparison of Dopamine and Norepinephrine in the Treatment of Shock.',
    publication: 'New England Journal of Medicine. 2010;362(9):779–789.',
    year: '2010',
    pmid: '20200382',
    doi: '10.1056/NEJMoa0907118',
    usedInModules: ['Vazoaktif Karar Matriksi', 'Noradrenalin Protokolü'],
    clinicalNote: 'Dopaminin noradrenaline kıyasla taşiaritmiyi ve kardiyojenik şokta 28 günlük mortaliteyi anlamlı artırdığını gösteren RKÇ.'
  },
  {
    id: 'icu-vasst-2008',
    category: 'icu_vasoactive',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Russell JA, Walley KR, Singer J, et al. (VASST Investigators).',
    title: 'Vasopressin versus Norepinephrine Infusion in Patients with Septic Shock.',
    publication: 'New England Journal of Medicine. 2008;358(9):877–887.',
    year: '2008',
    pmid: '18305265',
    doi: '10.1056/NEJMoa067373',
    usedInModules: ['Vazoaktif Karar Matriksi'],
    clinicalNote: 'Orta şiddette septik şokta erken düşük doz vazopressin (0.01–0.03 U/dk) eklenmesinin katekolamin koruyucu sinerjik rolü.'
  },
  {
    id: 'icu-esicm-shock-2014',
    category: 'icu_vasoactive',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Cecconi M, De Backer D, Antonelli M, et al.',
    title: 'Consensus on circulatory shock and hemodynamic monitoring. Task force of the European Society of Intensive Care Medicine.',
    publication: 'Intensive Care Medicine. 2014;40(12):1795–1815.',
    year: '2014',
    pmid: '25392034',
    doi: '10.1007/s00134-014-3525-z',
    usedInModules: ['Noradrenalin Protokolü', 'Yoğun Bakım'],
    clinicalNote: 'Dolaşım şokunda erken vazopresör, dinamik ön yük yanıtlılığı (SVV/PPV) ve mikrosirkülatuar perfüzyon hedefleri.'
  },
  {
    id: 'icu-esc-hf-2021',
    category: 'icu_vasoactive',
    kind: 'Uluslararası Kılavuz',
    authors: 'McDonagh TA, Metra M, Adamo M, et al.',
    title: '2021 ESC Guidelines for the diagnosis and treatment of acute and chronic heart failure.',
    publication: 'European Heart Journal. 2021;42(36):3599–3726.',
    year: '2021',
    pmid: '34447992',
    doi: '10.1093/eurheartj/ehab368',
    usedInModules: ['Vazoaktif Karar Matriksi'],
    clinicalNote: 'Kardiyojenik şokta dobutamin, milrinon ve levosimendan inotrop seçimi (kronik beta-bloker altında PDE-3 inhibitörü üstünlüğü).'
  },
  {
    id: 'icu-lahm-rv-2018',
    category: 'icu_vasoactive',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Lahm T, Douglas IS, Archer SL, et al. (ATS Official Statement).',
    title: 'Assessment of Right Ventricular Function in the Research Setting: Knowledge Gaps and Pathways Forward (RV Failure Management).',
    publication: 'American Journal of Respiratory and Critical Care Medicine. 2018;198(4):e15–e43.',
    year: '2018',
    pmid: '30109950',
    doi: '10.1164/rccm.201806-1160ST',
    usedInModules: ['Vazoaktif Karar Matriksi'],
    clinicalNote: 'Sağ ventrikül yetmezliği ve pulmoner hipertansiyonda vazopressin + PDE-3i ile PVR düşürürken RCA perfüzyonunu koruma.'
  },
  {
    id: 'icu-news2-rcp',
    category: 'icu_vasoactive',
    kind: 'Uluslararası Kılavuz',
    authors: 'Royal College of Physicians (RCP).',
    title: 'National Early Warning Score (NEWS) 2: Standardising the assessment of acute-illness severity in the NHS.',
    publication: 'London: Royal College of Physicians.',
    year: '2017',
    externalUrl: 'https://www.rcp.ac.uk/improving-care/resources/national-early-warning-score-news-2/',
    usedInModules: ['Yoğun Bakım Kabul Kriterleri (NEWS2 Skorlayıcı)'],
    clinicalNote: 'Klinik kötüleşmeyi erken yakalayan 7 parametreli NEWS2 puanlaması (Skor 5–6 orta risk / MET, ≥7 yüksek risk / acil YBÜ).'
  },

  // =========================================================================
  // 7. SIVI-ELEKTROLİT DENGESİ VE METABOLİK BOZUKLUKLAR
  // =========================================================================
  {
    id: 'elec-adrogue-2000',
    category: 'electrolytes',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Adrogué HJ, Madias NE.',
    title: 'Hyponatremia.',
    publication: 'New England Journal of Medicine. 2000;342(21):1581–1589.',
    year: '2000',
    pmid: '10824078',
    doi: '10.1056/NEJM200005253422107',
    usedInModules: ['Tedaviler (Sodyum Hesaplayıcı)', 'Hiponatremi İnfografiği'],
    clinicalNote: '1 litre infüzyonun serum sodyumunda oluşturacağı tahmini değişimi hesaplayan Adrogué-Madias formülü.'
  },
  {
    id: 'elec-spasovski-2014',
    category: 'electrolytes',
    kind: 'Uluslararası Kılavuz',
    authors: 'Spasovski G, Vanholder R, Allolio B, et al.',
    title: 'Clinical practice guideline on diagnosis and treatment of hyponatraemia.',
    publication: 'European Journal of Endocrinology / Nephrol Dial Transplant. 2014;170(3):G1–G47.',
    year: '2014',
    pmid: '24569125',
    doi: '10.1530/EJE-13-1020',
    usedInModules: ['Tedaviler (Sodyum Hesaplayıcı)', 'Hiponatremi İnfografiği'],
    clinicalNote: 'Avrupa Endokrinoloji ve Yoğun Bakım ortak kılavuzu: Ağır semptomatik hiponatremide acil 150 mL %3 NaCl bolus protokolü.'
  },
  {
    id: 'elec-sterns-2015',
    category: 'electrolytes',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Sterns RH.',
    title: 'Disorders of plasma sodium—causes, consequences, and correction.',
    publication: 'New England Journal of Medicine. 2015;372(1):55–65.',
    year: '2015',
    pmid: '25551526',
    doi: '10.1056/NEJMra1404489',
    usedInModules: ['Tedaviler (Sodyum Hesaplayıcı)', 'Hiponatremi İnfografiği'],
    clinicalNote: 'Ozmotik demiyelinizasyon sendromunu (ODS) önlemek için 24 saatte maksimum 8 mEq/L düzeltme sınırı ve aşırı düzeltmeyi DDAVP ile geri çevirme.'
  },
  {
    id: 'elec-mathews-2022',
    category: 'electrolytes',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Mathews V, Paul J, Paul C, George JK, Babu A.',
    title: 'A prospective observational study to identify the effectiveness of intravenous magnesium replacement in an intensive care setting.',
    publication: 'Journal of Anaesthesiology Clinical Pharmacology. 2022;38(3):453–457.',
    year: '2022',
    pmid: '36505214',
    doi: '10.4103/joacp.JOACP_530_20',
    usedInModules: ['Tedaviler (Magnezyum Hesaplayıcı)', 'Hipomagnezemi İnfografiği'],
    clinicalNote: 'Yoğun bakımda hipomagnezemi derecesine göre kanıta dayalı IV MgSO4 gram dozaj ve infüzyon süresi doğrulaması.'
  },

  // =========================================================================
  // 8. ANESTEZİ FARMAKOLOJİSİ, TİVA, SEDASYON VE ANALJEZİ
  // =========================================================================
  {
    id: 'pharm-weibel-lidocaine-2018',
    category: 'pharmacology',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Weibel S, Jelting Y, Pace NL, et al.',
    title: 'Continuous intravenous perioperative lidocaine infusion for postoperative pain and recovery in adults.',
    publication: 'Cochrane Database of Systematic Reviews. 2018;6(6):CD009642.',
    year: '2018',
    pmid: '29864216',
    doi: '10.1002/14651858.CD009642.pub3',
    usedInModules: ['Tedaviler (Lidokain Protokolü)'],
    clinicalNote: 'Perioperatif IV lidokain infüzyonunun (1.5 mg/kg bolus + 1–2 mg/kg/sa) postoperatif ağrı, ileus ve opioid tüketimine etkisi.'
  },
  {
    id: 'pharm-schug-ketamine-2018',
    category: 'pharmacology',
    kind: 'Uluslararası Kılavuz',
    authors: 'Schwenk ES, Viscusi ER, Buvanendran A, Schug SA, et al.',
    title: 'Consensus Guidelines on the Use of Intravenous Ketamine Infusions for Acute Pain Management From the ASRA, AAPM, and ASA.',
    publication: 'Regional Anesthesia & Pain Medicine. 2018;43(5):456–466.',
    year: '2018',
    pmid: '29870457',
    doi: '10.1097/AAP.0000000000000806',
    usedInModules: ['Tedaviler (Ketamin Protokolü)'],
    clinicalNote: 'Sub-anestezik ketamin infüzyon dozu (0.1–0.5 mg/kg/sa), opioid toleransı, kontraendikasyonlar ve psikomimetik yan etki yönetimi.'
  },
  {
    id: 'pharm-green-ketamine-2011',
    category: 'pharmacology',
    kind: 'Uluslararası Kılavuz',
    authors: 'Green SM, Roback MG, Kennedy RM, Krauss B.',
    title: 'Clinical practice guideline for emergency department ketamine dissociative sedation: 2011 update.',
    publication: 'Annals of Emergency Medicine. 2011;57(5):449–461.',
    year: '2011',
    pmid: '21256625',
    doi: '10.1016/j.annemergmed.2010.11.030',
    usedInModules: ['Tedaviler (Ketamin Protokolü)'],
    clinicalNote: 'Ketamin ile disosiyatif sedasyon, hava yolu reflekslerinin korunması ve laringospazm insidansı üzerine ACEP kılavuzu.'
  },
  {
    id: 'pharm-padis-2018',
    category: 'pharmacology',
    kind: 'Uluslararası Kılavuz',
    authors: 'Devlin JW, Skrobik Y, Gélinas C, et al. (SCCM PADIS Panel).',
    title: 'Clinical Practice Guidelines for the Prevention and Management of Pain, Agitation/Sedation, Delirium, Immobility, and Sleep Disruption in Adult Patients in the ICU.',
    publication: 'Critical Care Medicine. 2018;46(9):e825–e873.',
    year: '2018',
    pmid: '30113379',
    doi: '10.1097/CCM.0000000000003299',
    usedInModules: ['Tedaviler (Ketamin, Deksmedetomidin, Fentanil, Remifentanil, Propofol, Midazolam Protokolleri)', 'Yoğun Bakım'],
    clinicalNote: 'Yoğun bakımda deliryum önleme (benzodiazepin yerine propofol/deksmedetomidin önceliği) ve multimodal analjezi.'
  },
  {
    id: 'pharm-sedcom-riker-2009',
    category: 'pharmacology',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Riker RR, Shehabi Y, Bokesch PM, et al. (SEDCOM Study Group).',
    title: 'Dexmedetomidine vs midazolam for sedation of critically ill patients: a randomized trial.',
    publication: 'JAMA. 2009;301(5):489–499.',
    year: '2009',
    pmid: '19190314',
    doi: '10.1001/jama.2009.56',
    usedInModules: ['Deksmedetomidin Protokolü', 'Midazolam Protokolü'],
    clinicalNote: 'Mekanik ventilasyondaki hastalarda deksmedetomidinin midazolama kıyasla deliryumu belirgin azalttığını ve ekstübasyon süresini kısalttığını gösteren RKÇ.'
  },
  {
    id: 'pharm-spice3-shehabi-2019',
    category: 'pharmacology',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Shehabi Y, Howe BD, Bellomo R, et al. (SPICE III Investigators).',
    title: 'Early Sedation with Dexmedetomidine in Critically Ill Patients.',
    publication: 'New England Journal of Medicine. 2019;380(26):2506–2517.',
    year: '2019',
    pmid: '31106539',
    doi: '10.1056/NEJMoa1904710',
    usedInModules: ['Deksmedetomidin Protokolü'],
    clinicalNote: '3.904 YBÜ hastasında erken deksmedetomidin sedasyonunun 90 günlük mortalite ve bradikardi/hipotansiyon güvenliği açısından prospektif verisi.'
  },
  {
    id: 'pharm-minto-remifentanil-1997',
    category: 'pharmacology',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Minto CF, Schnider TW, Egan TD, et al.',
    title: 'Influence of age and gender on the pharmacokinetics and pharmacodynamics of remifentanil. I. Model development.',
    publication: 'Anesthesiology. 1997;86(1):10–23.',
    year: '1997',
    pmid: '9009935',
    doi: '10.1097/00000542-199701000-00004',
    usedInModules: ['Remifentanil Protokolü'],
    clinicalNote: 'Remifentanil TCI/TIVA dozlamasında yağsız vücut ağırlığı (LBM) ve yaşa bağlı klirens modelinin orijinal farmakokinetik temeli.'
  },
  {
    id: 'pharm-glass-remifentanil-1999',
    category: 'pharmacology',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Glass PS, Gan TJ, Howell S.',
    title: 'A review of the pharmacokinetics and pharmacodynamics of remifentanil.',
    publication: 'Anesthesia & Analgesia. 1999;89(4 Suppl):S7–S14.',
    year: '1999',
    pmid: '10511072',
    doi: '10.1097/00000539-199910001-00003',
    usedInModules: ['Remifentanil Protokolü'],
    clinicalNote: 'Non-spesifik doku ve plazma esteraz hidrolizi ile 3–4 dakikalık sabit bağlam duyarlı yarı ömür ve organ-bağımsız eliminasyon.'
  },
  {
    id: 'pharm-peng-fentanyl-1999',
    category: 'pharmacology',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Peng PW, Sandler AN.',
    title: 'A review of the use of fentanyl analgesia in the management of acute pain in adults.',
    publication: 'Anesthesiology. 1999;90(2):576–599.',
    year: '1999',
    pmid: '9952166',
    doi: '10.1097/00000542-199902000-00034',
    usedInModules: ['Fentanil Protokolü'],
    clinicalNote: 'Fentanilin lipofilik doku dağılımı, uzayan infüzyonlarda artan bağlam duyarlı yarı ömrü ve CYP3A4 hepatik klirensi.'
  },
  {
    id: 'pharm-schnider-propofol-1998',
    category: 'pharmacology',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Schnider TW, Minto CF, Gambus PL, et al.',
    title: 'The influence of method of administration and covariates on the pharmacokinetics of propofol in adult volunteers.',
    publication: 'Anesthesiology. 1998;88(5):1170–1182.',
    year: '1998',
    pmid: '9605675',
    doi: '10.1097/00000542-199805000-00006',
    usedInModules: ['Propofol Protokolü'],
    clinicalNote: 'Propofol TIVA/TCI uygulamalarında yağsız vücut kütlesi (LBW) ve yaş düzeltmeli Schnider farmakokinetik modeli.'
  },
  {
    id: 'pharm-kam-pris-2007',
    category: 'pharmacology',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Kam PC, Cardone D.',
    title: 'Propofol infusion syndrome.',
    publication: 'Anaesthesia. 2007;62(7):690–701.',
    year: '2007',
    pmid: '17567345',
    doi: '10.1111/j.1365-2044.2007.05055.x',
    usedInModules: ['Propofol Protokolü'],
    clinicalNote: 'Propofol İnfüzyon Sendromu (PRIS) mitokondriyal etiyolojisi, >4 mg/kg/saat ve >48 saat risk sınırı ile laktik asidoz/rabdomiyoliz izlemi.'
  },
  {
    id: 'pharm-rampart-midazolam-2012',
    category: 'pharmacology',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Silbergleit R, Durkalski V, Lowenstein D, et al. (NETT Investigators / RAMPART).',
    title: 'Intramuscular versus intravenous therapy for prehospital status epilepticus (RAMPART).',
    publication: 'New England Journal of Medicine. 2012;366(7):591–600.',
    year: '2012',
    pmid: '22335738',
    doi: '10.1056/NEJMoa1107494',
    usedInModules: ['Midazolam Protokolü'],
    clinicalNote: 'Status epileptikusta damar yolu yokken 10 mg IM midazolamın IV lorazepam ile kıyaslandığında hızlı ve etkili acil durdurma başarısı.'
  },
  {
    id: 'pharm-jalili-ketofol-2016',
    category: 'pharmacology',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Jalili M, Bahreini M, Doosti-Irani A, Masoomi R, Arbab M, Mirfazaelian H.',
    title: 'Ketamine-propofol combination (ketofol) vs propofol for procedural sedation and analgesia: systematic review and meta-analysis.',
    publication: 'American Journal of Emergency Medicine. 2016;34(3):558–569.',
    year: '2016',
    pmid: '26809929',
    doi: '10.1016/j.ajem.2015.12.074',
    usedInModules: ['Ketamin Protokolü', 'Propofol Protokolü'],
    clinicalNote: 'Prosedürel sedoanaljezide Ketofol kombinasyonunun tek başına propofole göre solunum depresyonu ve hipotansiyonu azalttığını gösteren meta-analiz.'
  },
  {
    id: 'pharm-drugs-medscape-interactions',
    category: 'pharmacology',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Drugs.com Clinical Drug Interactions & Medscape Reference Monographs.',
    title: 'Perioperative IV Sedative, Opioid, Local Anesthetic & Vasopressor Interaction and Monograph Databases.',
    publication: 'Drugs.com / WebMD Medscape Reference.',
    year: '2025 / 2026',
    externalUrl: 'https://reference.medscape.com/drug-interactionchecker',
    usedInModules: [
      'Noradrenalin Protokolü',
      'Adrenalin Protokolü',
      'Lidokain Protokolü',
      'Ketamin Protokolü',
      'Deksmedetomidin Protokolü',
      'Remifentanil Protokolü',
      'Fentanil Protokolü',
      'Propofol Protokolü',
      'Midazolam Protokolü'
    ],
    clinicalNote: 'CYP3A4 etkileşimleri, MAOi/TCA katekolamin duyarlılığı, PRIS, bradikardi ve solunum depresyonu sinerji kontrolleri.'
  },

  // =========================================================================
  // 9. REJYONAL ANESTEZİ, SİNİR BLOKLARI VE CERRAHİ PROSEDÜRLER
  // =========================================================================
  {
    id: 'reg-nysora-compendium',
    category: 'regional_procedures',
    kind: 'Textbook',
    authors: 'Hadzic A (Ed.), NYSORA Editorial Board.',
    title: 'NYSORA Compendium of Regional Anesthesia & Ultrasound-Guided Nerve Blocks.',
    publication: 'New York School of Regional Anesthesia (NYSORA).',
    year: '2024',
    externalUrl: 'https://www.nysora.com/',
    usedInModules: ['Sinir Blokları & LAST (ESP, TAP, PENG, ACB, İnterscalen, Supraklaviküler, Popliteal)'],
    clinicalNote: 'USG prob yerleşimleri, sonoanatomik işaret noktaları, lokal anestezik hacimleri ve blok komplikasyonları referans atlası.'
  },
  {
    id: 'proc-prospect-esra',
    category: 'regional_procedures',
    kind: 'Uluslararası Kılavuz',
    authors: 'PROSPECT Working Group (European Society of Regional Anaesthesia & Pain Therapy - ESRA).',
    title: 'Procedure-Specific Postoperative Pain Management (PROSPECT) Evidence-Based Guidelines.',
    publication: 'ESRA / British Journal of Anaesthesia / Anaesthesia.',
    year: '2018–2025',
    externalUrl: 'https://esraeurope.org/prospect/',
    usedInModules: ['Sistematik Prosedür Bazlı Anestezi Yönetimi (Tüm Cerrahi Branşlar)'],
    clinicalNote: 'Cerrahiye özgü multimodal analjezi, yara yeri infiltrasyonu, fasya plan blokları ve opioid koruyucu postop ağrı protokolleri.'
  },
  {
    id: 'proc-eras-spine-2021',
    category: 'regional_procedures',
    kind: 'Konsensus / Uzman Görüşü',
    authors: 'Debono B, Wainwright TW, Wang MY, et al.',
    title: 'Consensus statement for perioperative care in lumbar spinal fusion: Enhanced Recovery After Surgery (ERAS®) Society recommendations.',
    publication: 'The Spine Journal. 2021;21(5):729–752.',
    year: '2021',
    pmid: '33444664',
    doi: '10.1016/j.spinee.2021.01.001',
    usedInModules: ['Sistematik Prosedürler (Beyin & Omurga Cerrahisi)'],
    clinicalNote: 'Servikal, torakal ve lomber omurga füzyonlarında nöromonitörizasyon uyumu, kan koruma (TXA) ve ERAS hızlı iyileşme standartları.'
  },
  {
    id: 'proc-eras-lung-2019',
    category: 'regional_procedures',
    kind: 'Uluslararası Kılavuz',
    authors: 'Batchelor TJP, Rasburn NJ, Abdelnour-Berchtold E, et al.',
    title: 'Guidelines for enhanced recovery after lung surgery: recommendations of the ERAS® Society and the European Society of Thoracic Surgeons (ESTS).',
    publication: 'European Journal of Cardio-Thoracic Surgery. 2019;55(1):91–115.',
    year: '2019',
    pmid: '30304509',
    doi: '10.1093/ejcts/ezy301',
    usedInModules: ['Sistematik Prosedürler (Göğüs Cerrahisi & Bronkoskopi)'],
    clinicalNote: 'Tek akciğer ventilasyonu (OLV), restriktif sıvı dengesi, torakal epidural/paravertebral blok ve erken mobilizasyon.'
  },
  {
    id: 'proc-ect-bryson-2017',
    category: 'regional_procedures',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Bryson EO, Aloysi AS, Farber KG, Kellner CH.',
    title: 'Individualized Anesthetic Management for Patients Undergoing Electroconvulsive Therapy: A Review of Current Practice.',
    publication: 'Anesthesia & Analgesia. 2017;124(6):1943–1956.',
    year: '2017',
    pmid: '28277323',
    doi: '10.1213/ANE.0000000000001873',
    usedInModules: ['Sistematik Prosedürler (EKT)', 'EKT Vaka Takip & Zamanlayıcı (Ketofol)'],
    clinicalNote: 'EKTde anesteziklerin nöbet eşiği ve süresi üzerine etkileri, Ketofol sinerjisi, süksinilkolin ve otonomik hemodinamik zirve yönetimi.'
  },
  {
    id: 'proc-btf-tbi-2017',
    category: 'regional_procedures',
    kind: 'Uluslararası Kılavuz',
    authors: 'Carney N, Totten AM, O’Reilly C, et al. (Brain Trauma Foundation).',
    title: 'Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition.',
    publication: 'Neurosurgery. 2017;80(1):6–15.',
    year: '2017',
    pmid: '27654000',
    doi: '10.1227/NEU.0000000000001432',
    usedInModules: ['Sistematik Prosedürler (Beyin Cerrahisi)'],
    clinicalNote: 'Kafa içi basınç (KİB/ICP) hedefleri, serebral perfüzyon basıncı (CPP 60–70 mmHg), normokapni ve mannitol/hipertonik salin yönetimi.'
  },

  // =========================================================================
  // 10. GÜVENLİ VASKÜLER ERİŞİM VE KATETERİZASYON (SVK / ARTERİYEL)
  // =========================================================================
  {
    id: 'vasc-aa-safe-vascular-2025',
    category: 'vascular_access',
    kind: 'Uluslararası Kılavuz',
    authors: 'Johnston AJ, Simpson MJ, McCormack V, Barton A, Bennett J, Chalisey A, Crane J, et al.',
    title: 'Association of Anaesthetists guidelines: safe vascular access 2025.',
    publication: 'Anaesthesia. 2025;80(11):1381–1396.',
    year: '2025',
    pmid: '40958714',
    doi: '10.1111/anae.16727',
    usedInModules: ['Güvenli Vasküler Erişim (USG & Landmark SVK)', 'Güvenli Vasküler Erişim (İnvaziv Arteriyel)'],
    clinicalNote: '6 alanda 15 konsensus önerisi: LocSSIPs güvenlik listeleri, ömür boyu damar koruma (KBH/AV fistül ve mastektomi/aksiller diseksiyon), Kateter/Ven çap oranı ile CRT önlemi, koagülopati/antikoagülasyon risk-yarar dengesi, alt SVC/karina düzeyinde uç doğrulama (IC-ECG) ve kılavuz tel retansiyonu ("Never Event") önlemi.'
  },
  {
    id: 'vasc-asa-cvc-2020',
    category: 'vascular_access',
    kind: 'Uluslararası Kılavuz',
    authors: 'Practice Guidelines for Central Venous Access Task Force (ASA).',
    title: 'Practice Guidelines for Central Venous Access 2020: An Updated Report by the American Society of Anesthesiologists Task Force on Central Venous Access.',
    publication: 'Anesthesiology. 2020;132(1):8–43.',
    year: '2020',
    pmid: '31821240',
    doi: '10.1097/ALN.0000000000002864',
    usedInModules: ['Güvenli Vasküler Erişim (USG & Landmark SVK)'],
    clinicalNote: 'Gerçek zamanlı USG ile ponksiyon, dilatasyon öncesi basınç/USG venöz doğrulama, yanlışlıkla arteriyel dilatasyonda kateteri yerinde bırakma ve post-prosedür uç doğrulama standardı.'
  },
  {
    id: 'vasc-perseus-esaic-2020',
    category: 'vascular_access',
    kind: 'Uluslararası Kılavuz',
    authors: 'Lamperti M, Biasucci DG, Disma N, Pittiruti M, et al.',
    title: 'European Society of Anaesthesiology guidelines on peri-operative use of ultrasound-guided for vascular access (PERSEUS vascular access).',
    publication: 'European Journal of Anaesthesiology. 2020;37(5):344–376.',
    year: '2020',
    pmid: '32265391',
    doi: '10.1097/EJA.0000000000001180',
    usedInModules: ['Güvenli Vasküler Erişim (USG Eşliğinde SVK)', 'Güvenli Vasküler Erişim (İnvaziv Arteriyel)'],
    clinicalNote: 'Perioperatif İJV, aksiller/subklavyen ve femoral erişimde pre-prosedür USG tarama (RaCeVA), In-Plane/Out-of-Plane teknikler ve plevral kayma ile pnömotoraks dışlama.'
  },
  {
    id: 'vasc-3sites-parienti-2015',
    category: 'vascular_access',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Parienti JJ, Mongardon N, Mégarbane B, et al. (3SITES Study Group).',
    title: 'Intravascular Complications of Central Venous Catheterization by Insertion Site.',
    publication: 'New England Journal of Medicine. 2015;373(13):1220–1229.',
    year: '2015',
    pmid: '26398070',
    doi: '10.1056/NEJMoa1500964',
    usedInModules: ['Güvenli Vasküler Erişim (USG Eşliğinde SVK)'],
    clinicalNote: '3.471 kateterizasyonluk çok merkezli RKÇ: Subklavyen erişimde CLABSI ve semptomatik DVT en düşük iken pnömotoraks riski (~%1.5) en yüksektir.'
  },
  {
    id: 'vasc-peres-depth-1990',
    category: 'vascular_access',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Peres PW.',
    title: 'Positioning central venous catheters—a prospective survey.',
    publication: 'Anaesthesia and Intensive Care. 1990;18(4):536–539.',
    year: '1990',
    pmid: '2268022',
    doi: '10.1177/0310057X9001800422',
    usedInModules: ['Güvenli Vasküler Erişim (Peres Kateter Derinliği Hesaplayıcı)'],
    clinicalNote: 'Kateter ucunun sağ atriyuma girmesini önleyen boy bazlı Peres derinlik formülleri (Sağ İJV Boy/10, Sol İJV Boy/10+4, Sağ SKV Boy/10−2, Sol SKV Boy/10+2).'
  },
  {
    id: 'vasc-cdc-clabsi-2011',
    category: 'vascular_access',
    kind: 'Uluslararası Kılavuz',
    authors: 'O’Grady NP, Alexander M, Burns LA, et al. (HICPAC / CDC).',
    title: 'Guidelines for the Prevention of Intravascular Catheter-Related Infections.',
    publication: 'Clinical Infectious Diseases. 2011;52(9):e162–e193.',
    year: '2011',
    pmid: '21460264',
    doi: '10.1093/cid/cir257',
    usedInModules: ['Güvenli Vasküler Erişim (USG Eşliğinde SVK)'],
    clinicalNote: 'Maksimal Steril Bariyer (MSB), >%0.5 alkolik klorheksidin glukonat cilt antisepsisi, femoral erişimden kaçınma ve günlük kateter gerekliliği değerlendirmesi.'
  },
  {
    id: 'vasc-ins-2024',
    category: 'vascular_access',
    kind: 'Uluslararası Kılavuz',
    authors: 'Nickel B, Gorski L, Kleidon T, et al. (Infusion Nurses Society).',
    title: 'Infusion Therapy Standards of Practice, 9th Edition.',
    publication: 'Journal of Infusion Nursing. 2024;47(1S Suppl 1):S1–S285.',
    year: '2024',
    pmid: '38211609',
    usedInModules: ['Güvenli Vasküler Erişim (Periferik IV)', 'Klinik İnfografikler (IV Erişim)'],
    clinicalNote: 'Periferik IV kanüllerde en küçük uygun kalibre seçimi, 2-deneme DIVA kuralı, USG eşliğinde uzun kanül kullanımı, ven koruma ve flebit/ekstravazasyon önleme standartları.'
  },
  {
    id: 'vasc-iso-10555-5',
    category: 'vascular_access',
    kind: 'Uluslararası Kılavuz',
    authors: 'International Organization for Standardization (ISO).',
    title: 'ISO 10555-5:2013/Amd 1:2017 — Intravascular catheters: Over-needle peripheral catheters.',
    publication: 'ISO Standards. 2017.',
    year: '2017',
    externalUrl: 'https://www.iso.org/standard/57882.html',
    usedInModules: ['Güvenli Vasküler Erişim (Periferik IV)', 'Klinik İnfografikler (IV Erişim)'],
    clinicalNote: '14G Turuncu – 26G Mor standart periferik IV kanül renk kodlaması, dış çap toleransları ve standart yerçekimi akım testi referansları.'
  },
  {
    id: 'vasc-arrow-7fr-20cm',
    category: 'vascular_access',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Teleflex / Arrow® Vascular Access Technical Data.',
    title: 'Arrow Three-Lumen Central Venous Catheterization Set (7 Fr × 20 cm: Distal 16G, Medial 18G, Proximal 18G) Flow Specifications.',
    publication: 'Manufacturer Instructions for Use (IFU).',
    year: '2024',
    externalUrl: 'https://www.teleflex.com/',
    usedInModules: ['Güvenli Vasküler Erişim (Periferik IV)', 'Klinik İnfografikler (IV Erişim)'],
    clinicalNote: 'Standart 7 Fr 20 cm 3 lümenli SVK yerçekimi (100 cm H₂O, %0.9 NaCl) akım referansları: Distal 16G ≈ 3,100 mL/sa (~52 mL/dk), Medial 18G ≈ 1,500 mL/sa (~25 mL/dk), Proksimal 18G ≈ 1,600 mL/sa (~27 mL/dk).'
  },
  {
    id: 'vasc-bannon-landmark-2011',
    category: 'vascular_access',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Bannon MP, Heller SF, Rivera M.',
    title: 'Anatomic considerations for central venous cannulation.',
    publication: 'Risk Management and Healthcare Policy. 2011;4:27–39.',
    year: '2011',
    pmid: '22312225',
    doi: '10.2147/rmhp.s10383',
    usedInModules: ['Güvenli Vasküler Erişim (Landmark Metodu ile SVK)'],
    clinicalNote: 'Sédillot üçgeni, eksternal juguler ven kesişimi, klavikula bükümü ve komşu plevra/arter anatomisi üzerine klinik landmark rehberi.'
  },
  {
    id: 'vasc-nuttall-arterial-2016',
    category: 'vascular_access',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Nuttall G, Burckhardt J, Hadley A, Kane S, Kor D, Marienau MS, Schroeder DR, Handlogten K, Wilson G, Oliver WC.',
    title: 'Surgical and Patient Risk Factors for Severe Arterial Line Complications in Adults.',
    publication: 'Anesthesiology. 2016;124(3):590–597.',
    year: '2016',
    pmid: '26640979',
    doi: '10.1097/ALN.0000000000000967',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)'],
    clinicalNote: '62.626 erişkin perioperatif arteriyel kateterizasyonda majör komplikasyonların çok nadir olduğu (genel oran 3.4/10.000; radiyal 2.7/10.000, brakiyal 12.3/10.000, femoral 9.0/10.000) ancak kadın cinsiyet, ASA skoru ve ileri yaşın riski artırdığı gösterilmiştir.'
  },
  {
    id: 'vasc-handlogten-brachial-2014',
    category: 'vascular_access',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Handlogten KS, Wilson GA, Clifford L, Nuttall GA, Kor DJ.',
    title: 'Brachial artery catheterization: an assessment of use patterns and associated complications.',
    publication: 'Anesthesia & Analgesia. 2014;118(2):288–295.',
    year: '2014',
    pmid: '24445630',
    doi: '10.1213/ANE.0000000000000082',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)'],
    clinicalNote: '21.597 brakiyal arter kateterizasyonunda toplam komplikasyon oranı %0.19 (vasküler %0.16, nörolojik %0.03); erken iskemi/parestezi bulgularında kateterin derhal çekilmesi ve yakın distal takip ile güvenle kullanılabileceğini gösterir.'
  },
  {
    id: 'vasc-scheer-arterial-2002',
    category: 'vascular_access',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Scheer B, Perel A, Pfeiffer UJ.',
    title: 'Clinical review: complications and risk factors of peripheral arterial catheters used for haemodynamic monitoring in anaesthesia and intensive care medicine.',
    publication: 'Critical Care. 2002;6(3):199–204.',
    year: '2002',
    pmid: '12133178',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)'],
    clinicalNote: 'Radiyal, femoral, aksiller, brakiyal ve dorsalis pedis arteriyel kateterizasyonda tromboz, geçici oklüzyon, psödoanevrizma ve lokal enfeksiyon oranlarının bölge bazlı karşılaştırmalı sistematik derlemesi.'
  },
  {
    id: 'vasc-gardner-damping-1981',
    category: 'vascular_access',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Gardner RM.',
    title: 'Direct blood pressure measurement—dynamic response requirements.',
    publication: 'Anesthesiology. 1981;54(3):227–236.',
    year: '1981',
    pmid: '7469106',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)'],
    clinicalNote: 'Arteriyel basınç monitörizasyonunda doğal frekans, sönümleme katsayısı (ζ), kare dalga (fast-flush) testi ve overdamped/underdamped dalga bozulmalarının klasik fizyolojik temeli.'
  },
  {
    id: 'vasc-foti-underdamping-2022',
    category: 'vascular_access',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Foti L, Michard F, Villa G, Ricci Z, Romagnoli S.',
    title: 'The impact of arterial pressure waveform underdamping and resonance filters on cardiac output measurements with pulse wave analysis.',
    publication: 'British Journal of Anaesthesia. 2022;129(1):e6–e8.',
    year: '2022',
    pmid: '35459533',
    doi: '10.1016/j.bja.2022.03.024',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)'],
    clinicalNote: 'Underdamped (rezonant) arteriyel basınç dalgasının sistolik tepeyi ve nabız dalga analizi (pulse contour) ile ölçülen atım hacmi / kardiyak debi değerlerini yapay olarak yükselttiğini gösterir.'
  },
  {
    id: 'vasc-michard-ppv-2000',
    category: 'vascular_access',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Michard F, Boussat S, Chemla D, Anguel N, Mercat A, Lecarpentier Y, Richard C, Pinsky MR, Teboul JL.',
    title: 'Relation between respiratory changes in arterial pulse pressure and fluid responsiveness in septic patients with acute circulatory failure.',
    publication: 'American Journal of Respiratory and Critical Care Medicine. 2000;162(1):134–138.',
    year: '2000',
    pmid: '10903232',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)', 'İntraoperatif Sıvı Yönetimi (GDFT)'],
    clinicalNote: 'Mekanik ventilasyon altında arteriyel Nabız Basıncı Varyasyonu (PPV ≥ %13) eşiğinin sıvı yüklemesine yanıtı CVP ve PAOP’tan üstün öngördüğünü kanıtlayan klasik çalışma.'
  },
  {
    id: 'vasc-yang-du-ppv-2014',
    category: 'vascular_access',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Yang X, Du B.',
    title: 'Does pulse pressure variation predict fluid responsiveness in critically ill patients? A systematic review and meta-analysis.',
    publication: 'Critical Care. 2014;18(6):650.',
    year: '2014',
    pmid: '25427970',
    doi: '10.1186/s13054-014-0650-6',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)', 'İntraoperatif Sıvı Yönetimi (GDFT)'],
    clinicalNote: '22 klinik çalışmanın meta-analizi: sinüs ritminde ve kontrollü mekanik ventilasyonda PPV eşiği (~%12) için havuzlanmış duyarlılık %88, özgüllük %89 ve AUROC 0.94.'
  },
  {
    id: 'vasc-myatra-tv-challenge-2017',
    category: 'vascular_access',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Myatra SN, Prabu NR, Divatia JV, Monnet X, Kulkarni AP, Teboul JL.',
    title: 'The Changes in Pulse Pressure Variation or Stroke Volume Variation After a "Tidal Volume Challenge" Reliably Predict Fluid Responsiveness During Low Tidal Volume Ventilation.',
    publication: 'Critical Care Medicine. 2017;45(3):415–421.',
    year: '2017',
    pmid: '27922879',
    doi: '10.1097/CCM.0000000000002183',
    usedInModules: ['Güvenli Vasküler Erişim (İnvaziv Arteriyel)', 'İntraoperatif Sıvı Yönetimi (GDFT)'],
    clinicalNote: 'Düşük tidal volüm ventilasyonda (6 mL/kg) 1 dk süreyle VT 8 mL/kg’a yükseltildiğinde ΔPPV ≥ %3.5 veya ΔSVV ≥ %2.5 artışının sıvı yanıtlılığını yüksek doğrulukla öngördüğünü gösterir.'
  },

  // =========================================================================
  // 11. KLİNİK HESAPLAYICILAR, VENTİLASYON VE EKİPMAN GÜVENLİĞİ
  // =========================================================================
  {
    id: 'calc-ardsnet-2000',
    category: 'calculators_safety',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Acute Respiratory Distress Syndrome Network (ARDSnet).',
    title: 'Ventilation with lower tidal volumes as compared with traditional tidal volumes for acute lung injury and the acute respiratory distress syndrome.',
    publication: 'New England Journal of Medicine. 2000;342(18):1301–1308.',
    year: '2000',
    pmid: '10793162',
    doi: '10.1056/NEJM200005043421801',
    usedInModules: ['Kilo, MV Volüm & İdame Sıvı Hesaplayıcı'],
    clinicalNote: 'Gerçek kilo yerine Öngörülen Vücut Ağırlığı (PBW) baz alınarak 6 mL/kg (ARDSde 4–6 mL/kg) düşük tidal volüm ventilasyonu standardı.'
  },
  {
    id: 'calc-devine-1974',
    category: 'calculators_safety',
    kind: 'Klinik İnceleme / Derleme',
    authors: 'Devine BJ.',
    title: 'Gentamicin therapy (Devine Ideal Body Weight Formula).',
    publication: 'Drug Intelligence & Clinical Pharmacy. 1974;8:650–655.',
    year: '1974',
    usedInModules: ['Kilo, MV Volüm & İdame Sıvı Hesaplayıcı', 'İntraop Sıvı Hesaplayıcı (Liberal)', 'Klinik Hesaplayıcılar'],
    clinicalNote: 'Boy ve cinsiyet üzerinden İdeal Vücut Ağırlığı (IBW) ve ARDSnet PBW hesaplamasının evrensel formülü.'
  },
  {
    id: 'calc-curb65-2003',
    category: 'calculators_safety',
    kind: 'Dönüm Noktası Çalışma / RKÇ',
    authors: 'Lim WS, van der Eerden MM, Laing R, et al.',
    title: 'Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study (CURB-65).',
    publication: 'Thorax. 2003;58(5):377–382.',
    year: '2003',
    pmid: '12728155',
    doi: '10.1136/thorax.58.5.377',
    usedInModules: ['Klinik Hesaplayıcılar (CURB-65 Skoru)'],
    clinicalNote: 'Toplum kökenli pnömonide mortalite öngörüsü ve servis vs yoğun bakım yatış kararını yönlendiren 5 parametreli skor.'
  },
  {
    id: 'calc-asa-tof-2023',
    category: 'calculators_safety',
    kind: 'Uluslararası Kılavuz',
    authors: 'Thilen SR, Weigel WA, Todd MM, et al. (ASA Task Force on Neuromuscular Blockade).',
    title: '2023 American Society of Anesthesiologists Practice Guidelines for Monitoring and Antagonism of Neuromuscular Blockade.',
    publication: 'Anesthesiology. 2023;138(1):13–41.',
    year: '2023',
    pmid: '36520073',
    doi: '10.1097/ALN.0000000000004379',
    usedInModules: ['Anestezi Troubleshooting', 'Sistematik Prosedürler', 'Anestezi Acilleri'],
    clinicalNote: 'Kantitatif TOF monitörizasyonu zorunluluğu ve ekstübasyon öncesi rezidüel blokajı dışlamak için TOF oranı ≥ 0.90 hedefi.'
  }
];

function normalizeTitleKey(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9ğüşöçı]/g, '')
    .slice(0, 48);
}

/**
 * Returns the complete, deduplicated list of portal references.
 * Automatically merges any new protocol references added to ANESTHESIA_EMERGENCIES_DATA
 * if they are not already registered in MASTER_PORTAL_REFERENCES.
 */
export function getUnifiedPortalReferences(): PortalReference[] {
  const combined: PortalReference[] = [...MASTER_PORTAL_REFERENCES];
  const seenKeys = new Set<string>(
    MASTER_PORTAL_REFERENCES.map((r) => normalizeTitleKey(r.title))
  );

  Object.values(ANESTHESIA_EMERGENCIES_DATA).forEach((protocol) => {
    protocol.references.forEach((ref, idx) => {
      const key = normalizeTitleKey(ref.title);
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        combined.push({
          id: `auto-emerg-${protocol.id}-${idx}`,
          category: 'emergencies_acls',
          kind: ref.journal.toLowerCase().includes('guideline') || ref.title.toLowerCase().includes('guideline')
            ? 'Uluslararası Kılavuz'
            : 'Klinik İnceleme / Derleme',
          authors: ref.authors,
          title: ref.title,
          publication: ref.journal,
          year: ref.year,
          usedInModules: [`Anestezi Acilleri (${protocol.title})`],
          clinicalNote: ref.relevance
        });
      }
    });
  });

  return combined;
}
