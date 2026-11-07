import { ToolTabId } from '../components/PortalWorkspace';

export type SearchCategory = 
  | 'Hesaplayıcılar' 
  | 'Kılavuzlar & Protokoller' 
  | 'Klinik İnfografikler' 
  | 'Tedaviler & İlaçlar'
  | 'Rehber & Nöbet' 
  | 'Yerleşkeler & Bilgi';

export interface PortalSearchItem {
  id: string;
  title: string;
  category: SearchCategory;
  badge: string;
  description: string;
  keywords: string[];
  tabId: ToolTabId | 'tools' | 'disclaimer';
  popular?: boolean;
}

export const PORTAL_SEARCH_ITEMS: PortalSearchItem[] = [
  // 1. Hesaplayıcılar
  {
    id: 'calc-ibw-devine',
    title: 'Devine İdeal Kilo (IBW) ve Öngörülen Kilo (PBW)',
    category: 'Hesaplayıcılar',
    badge: 'IBW · PBW',
    description: 'Devine formülü ile boy ve cinsiyete göre ideal vücut ağırlığı ve ARDSnet öngörülen kilo.',
    keywords: ['ideal kilo', 'ibw', 'devine', 'pbw', 'predicted body weight', 'boy kilo', 'kilo hesabı', 'cinsiyet'],
    tabId: 'calculator',
    popular: true
  },
  {
    id: 'calc-bmi-vki',
    title: 'Vücut Kitle İndeksi (VKİ / BMI) ve Obezite Kademeleri',
    category: 'Hesaplayıcılar',
    badge: 'VKİ · BMI',
    description: 'DSÖ standartlarına göre zayıf, normal, fazla kilolu ve Sınıf 1-3 morbid obezite değerlendirmesi.',
    keywords: ['vki', 'bmi', 'vücut kitle indeksi', 'obezite', 'morbid obez', 'zayıf', 'kilo', 'boy'],
    tabId: 'calculator',
    popular: true
  },
  {
    id: 'calc-adjbw',
    title: 'Düzeltilmiş Kilo (AdjBW - Adjusted Body Weight)',
    category: 'Hesaplayıcılar',
    badge: 'AdjBW',
    description: 'Obez hastalarda (kilo > %120 IBW) aşırı hidrasyon ve toksisiteyi önleyen düzeltilmiş ağırlık.',
    keywords: ['adjbw', 'düzeltilmiş kilo', 'adjusted body weight', 'obezitede ilaç dozu', 'obezite sıvı', 'aşırı hidrasyon'],
    tabId: 'calculator'
  },
  {
    id: 'calc-protective-tv',
    title: 'Akciğer Koruyucu Ventilasyon Tidal Volümü (6-8 mL/kg)',
    category: 'Hesaplayıcılar',
    badge: '6-8 mL/kg',
    description: 'Öngörülen kilo (PBW) üzerinden barotravmayı önleyen akciğer koruyucu ventilasyon tidal hacmi.',
    keywords: ['tidal volüm', 'tv', 'akciğer koruyucu ventilasyon', 'mekanik ventilasyon', 'pbw', 'volütravma', 'barotravma', 'ventilatör'],
    tabId: 'calculator',
    popular: true
  },
  {
    id: 'calc-ards-tv',
    title: 'ARDS Düşük Tidal Volüm Hesabı (4-6 mL/kg)',
    category: 'Hesaplayıcılar',
    badge: '4-6 mL/kg',
    description: 'Şiddetli akciğer hasarı ve ARDS olgularında ultra-koruyucu ventilasyon hedefi.',
    keywords: ['ards', 'düşük tidal volüm', 'ardsnet', '4 ml/kg', 'atelektotravma', 'solunum yetmezliği', 'yoğun bakım'],
    tabId: 'calculator'
  },
  {
    id: 'calc-maintenance-fluids',
    title: 'İdame Sıvı Hesabı (“4-2-1” Kuralı / Holliday-Segar)',
    category: 'Hesaplayıcılar',
    badge: '4-2-1 Kuralı',
    description: '0-10 kg, 10-20 kg ve >20 kg kademeli saatlik parenteral idame sıvı hızı (mL/saat).',
    keywords: ['4-2-1', 'holliday segar', 'idame sıvı', 'saatlik sıvı', 'sıvı hesabı', 'infüzyon hızı', 'hidrasyon', 'ml saat'],
    tabId: 'calculator',
    popular: true
  },
  {
    id: 'calc-intraop-npo',
    title: 'İntraoperatif Açlık Sıvısı Açığı (NPO Deficit)',
    category: 'Hesaplayıcılar',
    badge: 'NPO Açığı',
    description: 'Açlık süresi ile bazal idamenin çarpımı; 1. saatte %50, 2. ve 3. saatte %25 kümülatif karşılama.',
    keywords: ['intraop sıvı', 'açlık sıvısı', 'npo açığı', 'npo deficit', 'ameliyathane sıvı', 'kristaloid'],
    tabId: 'intraop',
    popular: true
  },
  {
    id: 'calc-tissue-trauma',
    title: 'Cerrahi Doku Travması Kayıpları (Üçüncü Boşluk Kaybı)',
    category: 'Hesaplayıcılar',
    badge: 'Travma Sıvısı',
    description: 'Minimal (0-2 mL/kg), hafif-orta (2-4 mL/kg), orta-şiddetli (4-6 mL/kg) ve şiddetli (6-8 mL/kg/saat) doku kaybı.',
    keywords: ['doku travması', 'üçüncü boşluk', 'fıtık', 'laparoskopi', 'apandisit', 'kolesistit', 'açık batın', 'vasküler cerrahi', 'kristaloid infüzyon'],
    tabId: 'intraop'
  },
  {
    id: 'calc-infusion-rate',
    title: 'İnfüzyon Hızı Çevirici / Hesaplayıcı (mcg/kg/dk ↔ mL/saat)',
    category: 'Hesaplayıcılar',
    badge: 'İnfüzyon Çevirici',
    description: 'Dozajdan infüzyon pompası hızına veya pompa akışından hastaya giden doza anlık çeviri ve canlı sayaç.',
    keywords: ['infüzyon hızı', 'çevirici', 'pompa hızı', 'perfüzör', 'mcg kg dk', 'ml saat', 'doz hesabı', 'hız hesabı'],
    tabId: 'infusion',
    popular: true
  },
  {
    id: 'calc-vasoactive-infusions',
    title: 'Vazoaktif & İnotrop İlaç İnfüzyonları',
    category: 'Hesaplayıcılar',
    badge: 'Vazopresör & İnotrop',
    description: 'Noradrenalin, Adrenalin, Dopamin, Dobutamin, Nitrogliserin, Propofol ve Remifentanil infüzyon parametreleri.',
    keywords: ['noradrenalin', 'adrenalin', 'dopamin', 'dobutamin', 'nitrogliserin', 'propofol', 'remifentanil', 'vazopresör', 'inotrop', 'aritmi', 'şok'],
    tabId: 'infusion'
  },

  // 2. Kılavuzlar & Protokoller
  {
    id: 'guideline-asa',
    title: 'ASA Fiziksel Durum Sınıflaması (2025/2026)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'ASA I - VI',
    description: 'Resmi tanımlar, erişkin, pediatrik ve obstetrik klinik örneklerle güncel ASA risk derecelendirmesi.',
    keywords: ['asa', 'asa sınıflaması', 'asa 1', 'asa 2', 'asa 3', 'asa 4', 'asa 5', 'asa 6', 'fiziksel durum', 'sigara', 'diyabet', 'koah', 'gebe'],
    tabId: 'preop',
    popular: true
  },
  {
    id: 'guideline-asa-e',
    title: 'ASA-E Acil Cerrahi Sınıflama Eki',
    category: 'Kılavuzlar & Protokoller',
    badge: 'ASA-E',
    description: 'Gecikmenin yaşamı veya uzvu tehdit ettiği durumlarda ASA skoruna eklenen acil cerrahi (E) kodu.',
    keywords: ['asa e', 'acil eki', 'emergency modifier', 'acil cerrahi asa skoru', 'uzuv tehdidi'],
    tabId: 'preop'
  },
  {
    id: 'calc-mace-rcri',
    title: 'Pre-op MACE Kardiyak Risk Hesaplayıcı (RCRI - Lee Skoru)',
    category: 'Hesaplayıcılar',
    badge: 'MACE · RCRI',
    description: 'Revised Cardiac Risk Index ile yüksek riskli cerrahi, KAH, KKY, SVO, diyabet ve kreatinin üzerinden MACE riski tahmini.',
    keywords: ['mace', 'rcri', 'lee skoru', 'kardiyak risk', 'preoperatif kardiyak', 'kalp riski', 'kky', 'iskemi', 'kreatinin', 'cerrahi risk', 'acc aha'],
    tabId: 'preop',
    popular: true
  },
  {
    id: 'calc-mace-gupta',
    title: 'NSQIP MICA Kardiyak Risk Hesaplayıcı (Gupta Modeli)',
    category: 'Hesaplayıcılar',
    badge: 'NSQIP MICA',
    description: 'Gupta perioperatif kardiyak risk indeksi: Yaş, fonksiyonel durum, ASA ve prosedür riski ile lojistik regresyon MACE tahmini.',
    keywords: ['gupta', 'nsqip', 'mica', 'mace', 'kardiyak risk', 'fonksiyonel kapasite', 'asa skoru', 'cerrahi prosedür', 'lojistik regresyon'],
    tabId: 'preop',
    popular: true
  },
  {
    id: 'guideline-mallampati',
    title: 'Mallampati Sınıflaması ve Zor Havayolu Kriterleri',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Zor Havayolu',
    description: 'Sınıf 1-4 Mallampati, tiromental mesafe, boyun hareketleri ve zor entübasyon prediktörleri.',
    keywords: ['mallampati', 'zor havayolu', 'entübasyon', 'tiromental', 'ağız açıklığı', 'cormack lehane', 'hava yolu güvenliği'],
    tabId: 'airway',
    popular: true
  },
  {
    id: 'guideline-npo-fasting',
    title: 'Preoperatif Açlık Süreleri (ASA NPO Kılavuzu)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Açlık Kılavuzu',
    description: 'Berrak sıvılar (2 saat), anne sütü (4 saat), bebek maması (6 saat), hafif yemek (6 saat), katı/yağlı gıdalar (8 saat).',
    keywords: ['açlık süreleri', 'npo', 'açlık kılavuzu', 'berrak sıvılar', 'su', 'anne sütü', 'bebek maması', 'katı gıda', 'aspirasyon profilaksisi'],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'guideline-anticoagulants',
    title: 'Antikoagülan ve Antitrombositer Kesilme Süreleri',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Antikoagülan',
    description: 'Aspirin, Klopidogrel (Plavix), Ticagrelor, Varfarin (Coumadin), DOAK (Xarelto, Eliquis, Pradaxa), DMAH (Clexane).',
    keywords: ['antikoagülan', 'aspirin', 'klopidogrel', 'plavix', 'ticagrelor', 'brilinta', 'prasugrel', 'varfarin', 'coumadin', 'doak', 'noak', 'xarelto', 'rivaroksaban', 'eliquis', 'apiksaban', 'pradaxa', 'dabigatran', 'clexane', 'enoksaparin', 'dmah', 'kan sulandırıcı'],
    tabId: 'preop',
    popular: true
  },
  {
    id: 'guideline-preop-labs',
    title: 'Preoperatif Rutin Laboratuvar & Tetkik Endikasyonları',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Preop Tetkik',
    description: 'Yaş, komorbidite ve cerrahi büyüklüğüne göre EKG, PA Akciğer Grafisi, Hemogram, Koagülasyon ve EKO istem kriterleri.',
    keywords: ['preop tetkik', 'laboratuvar', 'ekg istemi', 'pa akciğer grafisi', 'hemogram', 'inr', 'aptt', 'eko', 'böbrek fonksiyonu', 'preoperatif vizit'],
    tabId: 'preop'
  },
  {
    id: 'airway-management-module',
    title: 'Havayolu Yönetimi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Havayolu',
    description: 'Havayolu yönetimi araç ve içerikleri için hazırlık aşamasında olan bölüm.',
    keywords: ['havayolu', 'havayolu yönetimi', 'entübasyon', 'lma', 'laringoskop'],
    tabId: 'airway'
  },
  {
    id: 'emergency-malignant-hyperthermia',
    title: 'Malign Hipertermi (MH) Kriz Protokolü & Dantrolen',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Malign Hipertermi',
    description: '10 aşamalı standart acil kriz protokolü: Tetikleyici kesilmesi, %100 O2 hiperventilasyon, 2.5 mg/kg Dantrolen, soğutma, Larach skoru ve patofizyoloji.',
    keywords: [
      'malign hipertermi', 'mh', 'dantrolen', 'ryanodex', 'dantrium', 'süksinilkolin', 'sevofluran', 
      'desfluran', 'ryr1', 'larach skoru', 'masseter spazmı', 'trismus', 'hipermetabolik', 
      'rabdomiyoliz', 'chct', 'mhaus', 'kriz yönetimi', 'anestezi acili'
    ],
    tabId: 'emergencies',
    popular: true
  },
  {
    id: 'emergency-pulmonary-embolism',
    title: 'Akut Pulmoner Embolizm (PE / PTE) Kriz Protokolü',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Pulmoner Emboli',
    description: '10 aşamalı acil kriz protokolü: Ani EtCO2 çöküşü, aşırı sıvı kısıtlaması, Noradrenalin, acil Alteplase (50-100 mg) ve Tenecteplase trombolizi, UFH antikoagülasyonu, Wells & sPESI skoru ve VA-ECMO.',
    keywords: [
      'pulmoner emboli', 'pulmoner embolizm', 'pe', 'pte', 'masif emboli', 'submasif emboli', 
      'pulmoner tromboemboli', 'alteplase', 'actilyse', 'tenecteplase', 'metalyse', 'tromboliz', 
      'etco2 düşüşü', 'sağ ventrikül yetmezliği', 'sağ kalp çöküşü', 'mcconnell', 'septal shift', 
      'wells skoru', 'cenevre skoru', 'pesi', 'spesi', 'heparin', 'ufh', 'enoksaparin', 'dmah', 
      'va-ecmo', 'embolektomi', 'trendelenburg', 'anestezi acili', 'kriz yönetimi', 'acil protokol'
    ],
    tabId: 'emergencies',
    popular: true
  },
  {
    id: 'emergency-venous-air-embolism',
    title: 'İntraoperatif Venöz & Paradoksal Hava Embolisi (VAE / PAE)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Hava Embolisi (VAE)',
    description: '10 aşamalı acil kriz protokolü: Cerrahi alanı SF ile yıkama, N2O derhal kapatma, Durant manevrası (sol lateral Trendelenburg), CVC hava aspirasyonu, kesin PEEP yasağı, Noradrenalin ve HBOT.',
    keywords: [
      'hava embolisi', 'venöz hava embolisi', 'vae', 'pae', 'paradoksal hava embolisi', 'arteriyel hava embolisi',
      'durant manevrası', 'sol lateral dekübit', 'trendelenburg', 'azot protoksit', 'n2o kapatma',
      'cvc aspirasyonu', 'bunegin albin', 'kavoatriyal bileşke', 'sağ atriyum hava', 'air lock',
      'değirmen çarkı', 'mill wheel', 'prekordiyal doppler', 'tee kar fırtınası', 'snowstorm',
      'sitting position', 'oturur pozisyon kraniyotomi', 'laparoskopi gaz embolisi', 'çimento embolisi',
      'pfo', 'patent foramen ovale', 'peep kontrendikasyonu', 'peep yasağı', 'hbot', 'hiperbarik oksijen',
      'anestezi acili', 'kriz yönetimi', 'acil protokol'
    ],
    tabId: 'emergencies',
    popular: true
  },
  {
    id: 'emergency-last-toxicity',
    title: 'LAST (Lokal Anestezik Sistemik Toksisitesi) & %20 Lipid Kurtarma',
    category: 'Kılavuzlar & Protokoller',
    badge: 'LAST · İntralipid',
    description: '10 aşamalı acil kriz protokolü: ASRA 2020 %20 Lipid Emülsiyonu (1.5 mL/kg bolus + 0.25 mL/kg/dk infüzyon), modifiye düşük doz adrenalin (≤1 mcg/kg), nöbet kontrolü (Midazolam) ve güvenli LA doz limitleri.',
    keywords: [
      'last', 'lokal anestezik toksisitesi', 'lokal anestezik sistemik toksisitesi', 'intralipid', 'lipid emülsiyon', 
      'lipid kurtarma', 'lipid sink', 'bupivakain', 'marcaine', 'ropivakain', 'naropin', 'lidokain', 
      'aritmal', 'prilokain', 'levobupivakain', 'chirocaine', 'asra 2020', 'esra', 'midazolam', 'propofol uyarısı', 
      'modifiye acls', 'düşük doz adrenalin', 'kardiyotoksisite', 'nöbet', 'perioral parestezi', 'metalik tat', 
      'kardiyak arrest', 'lipid doz hesaplama', 'anestezi acili', 'kriz yönetimi', 'acil protokol'
    ],
    tabId: 'emergencies',
    popular: true
  },
  {
    id: 'emergency-anaphylaxis-shock',
    title: 'İntraoperatif Anafilaksi & Şiddetli Anafilaktik Şok',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Anafilaktik Şok',
    description: '10 aşamalı acil kriz protokolü: Erken IV Adrenalin titrasyonu, masif kristaloid sıvı (20-30 mL/kg), kesin kolloid yasağı, Ring & Messmer evrelemesi, seri Triptaz tanı protokolü (NAP6) ve Sugammadeks 16 mg/kg kurtarma dozu.',
    keywords: [
      'anafilaksi', 'anafilaktik şok', 'şiddetli anafilaksi', 'intraoperatif anafilaksi', 'adrenalin', 
      'epinefrin', 'adrenalin titrasyonu', 'triptaz', 'serum triptazı', 'nap6', 'ring messmer', 
      'rokuronyum anafilaksisi', 'süksinilkolin', 'kas gevşetici alerjisi', 'sefazolin alerjisi', 
      'penisilin alerjisi', 'klorheksidin', 'patent blue', 'lateks alerjisi', 'sugammadeks kurtarma', 
      'kounis sendromu', 'mast hücresi', 'vazopleji', 'kristaloid sıvı', 'kolloid yasağı', 
      'anestezi acili', 'kriz yönetimi', 'acil protokol'
    ],
    tabId: 'emergencies',
    popular: true
  },

  // 3. Klinik İnfografikler
  {
    id: 'info-vasoactive-decision-matrix',
    title: 'Vazoaktif ve İnotropik Ajanlar Klinik Karar Matriksi',
    category: 'Klinik İnfografikler',
    badge: 'Karar Matriksi',
    description: 'Doz-yanıt reseptör kayması (biphasic), ikili kombinasyon sinerjileri (Noradrenalin+Vazopressin, Vazopressin+Milrinon), 5 kritik şok vaka simülatörü ve kanıta dayalı referanslar.',
    keywords: [
      'vazoaktif', 'vazopresor', 'vazopressör', 'inotrop', 'inodilatator', 'inodilatatör', 'karar matriksi', 
      'reseptör kayması', 'doz yanıt', 'biphasic', 'sinerji', 'vazopressin milrinon', 'noradrenalin dobutamin', 
      'metilen mavisi', 'vazopleji', 'şok simülatörü', 'septik şok', 'kardiyojenik şok', 'hocm', 'sağ ventrikül', 
      'ssc 2021', 'vasst', 'soap ii'
    ],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'info-rsi-vs-elective',
    title: 'Hızlı Seri Entübasyon (RSI) vs Elektif Entübasyon',
    category: 'Klinik İnfografikler',
    badge: 'RSI · DAS',
    description: 'Dolu mide aspirasyon profilaksisi (RSI) ile elektif indüksiyonun 10 kritik farkı (BMV yasağı, 1.2 mg/kg Rokuronyum, Sellick, NODESAT, Sugammadeks).',
    keywords: [
      'rsi', 'hızlı seri entübasyon', 'rapid sequence induction', 'elektif entübasyon', 'dolu mide', 
      'mendelson', 'aspirasyon', 'sellick', 'krikoid bası', 'rokuronyum 1.2', 'süksinilkolin', 
      'nodesat', 'apneik oksijenasyon', 'bmv yasağı', 'sugammadeks 16', 'cico', 'zor havayolu'
    ],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'info-adult-fasting',
    title: 'Erişkin Preoperatif Açlık Kılavuzu (2 - 6 - 8 Kuralı)',
    category: 'Klinik İnfografikler',
    badge: 'ASA 2023',
    description: 'Erişkinde berrak sıvılar (2 sa), hafif öğün (6 sa), yağlı/et (8 sa), sakız çiğneme (vaka ertelenmez) ve GLP-1 (Ozempic/Wegovy) yönetimi.',
    keywords: [
      'açlık', 'preoperatif açlık', 'açlık süreleri', 'aspirasyon', 'berrak sıvı', 'sakız', 'sakız çiğneme', 
      'glp-1', 'ozempic', 'wegovy', 'mounjaro', 'semaglutid', 'gastrik pocus', 'mide ultrasonu', 'perlas skoru', 
      'hafif öğün', 'katı gıda', 'süt', 'eras', 'maltodekstrin', 'karbonhidrat yüklemesi'
    ],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'info-pediatric-fasting',
    title: 'Pediatrik Preoperatif Açlık Kılavuzu (6 - 4 - 3 - 1 Kuralı)',
    category: 'Klinik İnfografikler',
    badge: 'ESAIC 2022',
    description: 'Çocuklarda modern açlık: Berrak sıvılar 1 sa, anne sütü 3 sa, bebek maması 4 sa, katı gıda & inek sütü 6 sa. Dehidratasyon ve hipoglisemi önlemleri.',
    keywords: [
      'pediatrik açlık', 'çocuk açlık', 'bebek açlık', 'anne sütü açlık', 'formül mama', 'bebek maması', 
      '1 saat berrak sıvı', '6-4-3-1', 'esaic 2022', 'espa', 'çocuklarda dehidratasyon', 'ketotik hipoglisemi', 
      'pediatrik aspirasyon', 'pediatrik anestezi'
    ],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'info-modified-aldrete',
    title: 'Modifiye Aldrete Derlenme ve PACU Taburculuk Skoru',
    category: 'Klinik İnfografikler',
    badge: 'Aldrete 1995',
    description: 'PACU’dan (Derlenme Odası) servise transfer uygunluğunu belirleyen 5 parametreli interaktif skor (Aktivite, Solunum, Dolaşım, Bilinç, SpO2).',
    keywords: [
      'aldrete', 'modifiye aldrete', 'aldrete skoru', 'derlenme', 'pacu', 'uyandırma odası', 
      'taburculuk kriteri', 'postop takip', 'post-anesthesia recovery', 'pars', 'derlenme skoru', 
      'servise transfer', 'motor aktivite', 'spo2', 'solunum', 'dolaşım', 'rezidüel blok', 'faz 1'
    ],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'info-padss',
    title: 'PADSS Günübirlik Cerrahi & Eve Taburculuk Skoru',
    category: 'Klinik İnfografikler',
    badge: 'PADSS · Chung',
    description: 'Ayaktan cerrahide Faz 2 derlenme ve eve güvenli taburculuk kriterleri (Vital bulgular, mobilizasyon, PONV, ağrı, cerrahi kanama).',
    keywords: [
      'padss', 'chung', 'günübirlik cerrahi', 'ayaktan cerrahi', 'eve taburculuk', 'faz 2 derlenme', 
      'home readiness', 'ponv', 'taburculuk skoru', 'ambulatory surgery', 'mobilizasyon', 'postoperatif ağrı', 'idrar çıkışı', 'refakatçi'
    ],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'info-surgical-urgency-2024',
    title: '2024 AHA/ACC Cerrahilerin Aciliyet ve Zamanlama Sınıflaması',
    category: 'Klinik İnfografikler',
    badge: 'AHA/ACC 2024',
    description: 'Acil (<2 sa), İvedi (2-24 sa), Zamana Duyarlı (≤3 ay) ve Elektif (>3 ay) cerrahiler; MACE ve preop strateji yönetimi.',
    keywords: ['acil cerrahi', 'ivedi cerrahi', 'zamana duyarlı cerrahi', 'elektif cerrahi', 'aha acc 2024', 'cerrahi aciliyet', 'mace', 'zamanlama', 'aort anevrizması', 'apandisit', 'kolesistit', 'kanser cerrahisi', 'katarakt', 'protez'],
    tabId: 'infographics',
    popular: true
  },
  {
    id: 'info-esc-surgical-risk',
    title: 'ESC 2022 Cerrahilere Göre Cerrahi Risk Sınıflaması',
    category: 'Klinik İnfografikler',
    badge: 'ESC 2022',
    description: '30 günlük kardiyovasküler olay (MACE) riskine göre Düşük (<%1), Orta (%1-5) ve Yüksek (>%5) riskli cerrahi operasyonlar.',
    keywords: ['esc 2022', 'cerrahi risk', 'düşük risk', 'orta risk', 'yüksek risk', '30 günlük mace', 'kardiyak risk', 'cerrahi operasyonlar'],
    tabId: 'infographics',
    popular: true
  },

  // 4. Rehber & Nöbet
  {
    id: 'contacts-directory',
    title: 'Klinik ve Dahili Hatlar Rehberi (Seyrantepe & Çayırbaşı)',
    category: 'Rehber & Nöbet',
    badge: 'Dahili Hatlar',
    description: 'Seyrantepe ve Çayırbaşı ameliyathaneler, yoğun bakımlar, anestezi odaları ve santral dahili hatları.',
    keywords: ['dahili hatlar', 'telefon rehberi', 'seyrantepe ameliyathane', 'çayırbaşı ameliyathane', 'yoğun bakım dahili', 'anestezi odası', 'santral', 'iç hat', 'dış hat', 'iletişim'],
    tabId: 'contacts',
    popular: true
  },
  {
    id: 'roster-monthly',
    title: 'Asistan Nöbet Çizelgesi (Ekim 2026)',
    category: 'Rehber & Nöbet',
    badge: 'Nöbet Çizelgesi',
    description: 'Seyrantepe ve Çayırbaşı aylık nöbet listesi, bugünün nöbetçileri, takvim, takas yönetimi ve Excel indirme.',
    keywords: ['nöbet', 'nöbet listesi', 'ekim 2026', 'bugün kim nöbetçi', 'asistan nöbet', 'nöbet takas', 'excel nöbet', 'seyrantepe nöbet', 'sarıyer nöbet', 'devir teslim'],
    tabId: 'roster',
    popular: true
  },

  // 5. Yerleşkeler & Bilgi
  {
    id: 'campus-weather-info',
    title: 'Yerleşkeler Canlı Hava Durumu ve Mesafe Bilgisi',
    category: 'Yerleşkeler & Bilgi',
    badge: 'Kampüs & Hava',
    description: 'Seyrantepe Hamidiye Etfal ve Sarıyer Çayırbaşı yerleşkeleri anlık hava durumu ve yerleşkeler arası rota.',
    keywords: ['hava durumu', 'seyrantepe hava', 'çayırbaşı hava', 'yerleşke mesafesi', 'yol tarifi', 'sıcaklık', 'kampüs'],
    tabId: 'tools'
  },
  {
    id: 'treatment-magnesium-replacement',
    title: 'Magnezyum Replasmanı Hesaplayıcısı (Türkiye %15 10 mL Ampul)',
    category: 'Tedaviler & İlaçlar',
    badge: 'MgSO₄ Doz Hesabı',
    description: 'Mathews et al. 2022 eGFR kademeli modelle 10 mL %15 (1.5g) MgSO4 ampul dozu, infüzyon süresi ve flebit güvenliği.',
    keywords: ['magnezyum', 'mgso4', 'magnezyum sülfat', 'replasman', 'hipomagnezemi', 'egfr', 'böbrek', 'ampul hesabı', 'flebit', 'infüzyon süresi', 'mathews', 'elektrolit', 'tedavi'],
    tabId: 'treatments',
    popular: true
  },
  {
    id: 'treatment-hypomagnesemia-infographic',
    title: 'Hipomagnezemi Klinik Bulguları, EKG & Refrakter Elektrolitler',
    category: 'Klinik İnfografikler',
    badge: 'EKG & Klinik',
    description: 'Torsades de Pointes, QT uzaması, Chvostek & Trousseau belirtileri, ROMK refrakter hipokalemi ve PTH refrakter hipokalsemi mekanizmaları.',
    keywords: ['hipomagnezemi', 'torsades', 'torsades de pointes', 'qt uzaması', 'ekg', 'chvostek', 'trousseau', 'tetani', 'romk', 'refrakter hipokalemi', 'refrakter hipokalsemi', 'st çökmesi', 'u dalgası', 'magnezyum'],
    tabId: 'treatments',
    popular: true
  },
  {
    id: 'treatment-potassium-replacement',
    title: 'Potasyum & Kaliphos Replasmanı Hesaplayıcısı (%7.5 KCl & Potasyum Fosfat)',
    category: 'Tedaviler & İlaçlar',
    badge: '%7.5 KCl · Kaliphos',
    description: '%7.5 KCl (10 mL = 10 mEq) ve Kaliphos (10 mL = 30 mEq K⁺ + 60 mEq Fosfat) ampul dozu, periferik/SVK derişim sınırları ve infüzyon hızı.',
    keywords: ['potasyum', 'kcl', 'kaliphos', 'potasyum fosfat', 'fosfat', 'replasman', 'hipokalemi', 'flebit', 'svk', 'periferik damar yolu', 'egfr', 'romk', 'infüzyon hızı'],
    tabId: 'treatments',
    popular: true
  },
  {
    id: 'treatment-hypokalemia-infographic',
    title: 'Hipokalemi Klinik Bulguları, EKG & U Dalgası Matriksi',
    category: 'Klinik İnfografikler',
    badge: 'Hipokalemi EKG',
    description: 'U dalgası, ST depresyonu, T düzleşmesi, asendan flask paralizi, paralitik ileus ve metabolik alkaloz patofizyolojisi.',
    keywords: ['hipokalemi', 'potasyum', 'u dalgası', 'ekg', 'paralitik ileus', 'asendan felç', 'paralizi', 'rabdomiyoliz', 'metabolik alkaloz', 'kardiyak arrest'],
    tabId: 'treatments',
    popular: true
  },
  {
    id: 'treatment-sodium-correction-calculator',
    title: 'Sodyum Bozuklukları & Adrogué-Madias Hesaplayıcısı (%3 NaCl & ODS Sınırı)',
    category: 'Tedaviler & İlaçlar',
    badge: 'Adrogué-Madias',
    description: 'MDCalc standardında Adrogué-Madias formülüyle %3 NaCl hipertonik salin infüzyon hızı, Serbest Su Açığı, Glukoz düzeltmeli Na ve ODS güvenlik eşikleri.',
    keywords: ['sodyum', 'sodium', 'hiponatremi', 'hipernatremi', 'adrogue', 'madias', 'adrogue madias', 'mdcalc', 'hipertonik salin', '%3 nacl', 'ods', 'osmotik demiyelinizasyon', 'serbest su açığı', 'free water deficit', 'glukoz düzeltmeli sodyum', 'katz', 'hillier', 'elektrolit'],
    tabId: 'treatments',
    popular: true
  },
  {
    id: 'treatment-hyponatremia-infographic',
    title: 'Sodyum Bozuklukları İnfografiği (Hiponatremi ODS & Hipernatremi DI)',
    category: 'Klinik İnfografikler',
    badge: 'Hipo & Hipernatremi',
    description: 'Hiponatremi (beyin ödemi, nöbet, %3 acil bolus, ODS, dDAVP geri indirme) ve Hipernatremi (serebral büzüşme, damar yırtılması, etyolojik hacim yaklaşımları, serebral ödemden korunma, Santral DI dDAVP) protokolleri.',
    keywords: ['sodyum', 'hiponatremi', 'hipernatremi', 'ods', 'santral pontin miyelinozis', 'beyin ödemi', 'acil bolus', '%3 salin', 'ddavp', 'desmopressin', 'diabetes insipidus', 'santral di', 'serbest su açığı', 'overcorrection', 'aşırı düzeltme', 'serebral ödem'],
    tabId: 'treatments',
    popular: true
  },
  {
    id: 'treatment-norepinephrine-protocol',
    title: 'Noradrenalin (Norepinefrin) İnfüzyon & Push-Dose Protokolü',
    category: 'Tedaviler & İlaçlar',
    badge: 'Levophed · Vazopressör',
    description: 'Septik şok (SSC 2021 1A), MAP ≥ 65 hedefi, 4 mg/4 mL ampul seyreltmeleri (80-160 mcg/mL), Push-Dose bolus kılavuzu, Fentolamin ekstravazasyon protokolü ve infüzyon pompası.',
    keywords: [
      'noradrenalin',
      'norepinefrin',
      'levophed',
      'sterinor',
      'vazopressör',
      'septik şok',
      'şok',
      'vazopleji',
      'push dose',
      'push-dose noradrenalin',
      'fentolamin',
      'ekstravazasyon',
      'map',
      'arteriyel tansiyon',
      'vazopressin',
      'infüzyon pompası',
      'katekolamin'
    ],
    tabId: 'treatments',
    popular: true
  },
  {
    id: 'airway-management-search',
    title: 'Havayolu Yönetimi & Algoritmalar',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Havayolu',
    description: 'Zor havayolu yönetimi, videolaringoskopi, laringeal maske (LMA / i-gel) ve acil havayolu algoritmaları.',
    keywords: ['havayolu', 'airway', 'entübasyon', 'zor havayolu', 'lma', 'i-gel', 'videolaringoskop', 'krikotiroidotomi'],
    tabId: 'airway',
    popular: true
  },
  // Sinir Blokları ve LAST Modülü
  {
    id: 'tool-nerve-blocks-main',
    title: 'Bölgesel ve Periferik Sinir Blokları Rehberi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Rejyonel Anestezi',
    description: 'USG eşliğinde üst ekstremite, alt ekstremite ve gövde/fasya plan blokları, sonoanatomi ve cerrahi endikasyonlar.',
    keywords: ['sinir bloğu', 'rejyonel anestezi', 'periferik sinir', 'blok', 'usg blok', 'ultrason', 'anestezi', 'fasya plan', 'bölgesel anestezi', 'nysora'],
    tabId: 'nerve-blocks',
    popular: true
  },
  {
    id: 'calc-last-intralipid',
    title: 'Lokal Anestezik Doz ve LAST %20 İntralipid Kurtarma Hesaplayıcısı',
    category: 'Hesaplayıcılar',
    badge: 'LAST · İntralipid',
    description: 'Kilo bazlı maksimum güvenli LA dozu (bupivakain, ropivakain, lidokain) ve ASRA/ESRA %20 İntralipid bolus + infüzyon kurtarma dozu.',
    keywords: ['last', 'intralipid', 'lipid rescue', 'lokal anestezik toksisitesi', 'toksisite', 'bupivakain dozu', 'marcaine', 'ropivakain', 'lidokain', 'kardiyotoksisite', 'kurtarma'],
    tabId: 'nerve-blocks',
    popular: true
  },
  {
    id: 'block-esp',
    title: 'Erector Spinae Plan Bloğu (ESP) - Torakal ve Lomber',
    category: 'Kılavuzlar & Protokoller',
    badge: 'ESP Bloğu',
    description: 'VATS, torakotomi, kosta kırıkları, meme cerrahisi ve omurga cerrahilerinde geniş kraniyokaudal yayılımlı fasya plan analjezisi.',
    keywords: ['esp', 'erector spinae', 'torakal esp', 'kosta kırığı', 'vats', 'toraks cerrahisi', 'meme cerrahisi', 'lomber esp', 'fasya plan'],
    tabId: 'nerve-blocks',
    popular: true
  },
  {
    id: 'block-acb-adductor',
    title: 'Adduktor Kanal Bloğu (ACB) - Motor Koruyucu Diz Analjezisi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'ACB · Safen',
    description: 'Total diz artroplastisinde kuadriseps motor gücünü koruyarak düşme riskini azaltan ve erken mobilizasyon sağlayan subsartoryal blok.',
    keywords: ['adduktor kanal', 'acb', 'safen sinir', 'diz protezi', 'total diz artroplastisi', 'motor koruyucu', 'erken mobilizasyon', 'kuadriseps koruma'],
    tabId: 'nerve-blocks',
    popular: true
  },
  {
    id: 'block-peng',
    title: 'PENG Bloğu (Pericapsular Nerve Group) - Kalça Kırığı ve Artroplastisi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'PENG Bloğu',
    description: 'Kalça kırıklarında motor zaaf yapmaksızın derin eklem analjezisi sağlayan yenilikçi perikapsüler blok tekniği.',
    keywords: ['peng bloğu', 'peng', 'kalça kırığı', 'femur boyun kırığı', 'total kalça', 'artroplasti', 'motor koruyucu kalça'],
    tabId: 'nerve-blocks'
  },
  {
    id: 'block-tap',
    title: 'Transversus Abdominis Plan Bloğu (TAP) - Batın & Sezaryen Analjezisi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'TAP Bloğu',
    description: 'Sezaryen, apendektomi ve alt karın cerrahilerinde somatik karın duvarı ağrısını kesen fasyal blokaj.',
    keywords: ['tap bloğu', 'tap', 'sezaryen analjezi', 'apendektomi', 'alt batın', 'karın duvarı', 'internal oblik', 'transversus abdominis'],
    tabId: 'nerve-blocks'
  },
  {
    id: 'block-isb-interskalen',
    title: 'İnterskalen Brakiyal Pleksus Bloğu (ISB) - Omuz Cerrahisi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'ISB · Omuz',
    description: 'Omuz artroskopisi ve artroplastisi için C5-C7 düzeyinde altın standart brakiyal pleksus bloğu.',
    keywords: ['interskalen', 'isb', 'omuz artroskopisi', 'omuz protezi', 'brakiyal pleksus', 'frenik sinir', 'c5 c6'],
    tabId: 'nerve-blocks'
  },
  {
    id: 'block-popliteal-siyatik',
    title: 'Popliteal Siyatik Sinir Bloğu - Ayak ve Ayak Bileği Cerrahisi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Popliteal Siyatik',
    description: 'Ayak bileği kırıkları, aşil tendon onarımı ve diyabetik ayak cerrahisinde derin ve uzun süreli anestezi.',
    keywords: ['popliteal siyatik', 'siyatik blok', 'ayak cerrahisi', 'ayak bileği kırığı', 'aşil tendon', 'tibial sinir', 'peroneal sinir'],
    tabId: 'nerve-blocks'
  },
  {
    id: 'anesthesia-emergencies',
    title: 'Anestezi Acilleri ve Kriz Yönetimi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Acil Protokol',
    description: 'Perioperatif kriz yönetimi, malign hipertermi, arrest/ACLS, anafilaksi, LAST ve acil eylem algoritmaları.',
    keywords: ['anestezi acilleri', 'acil', 'kriz', 'malign hipertermi', 'arrest', 'acls', 'cpr', 'anafilaksi', 'last', 'cico', 'mavi kod'],
    tabId: 'emergencies',
    popular: true
  },
  {
    id: 'weekly-work-schedule',
    title: 'Haftalık Çalışma Programı (Salon & Birim Dağılımı)',
    category: 'Rehber & Nöbet',
    badge: 'Mesai Programı',
    description: 'Haftalık ameliyathane salonları, yoğun bakımlar, poliklinik ve hekim yerleşimleri tablosu.',
    keywords: ['haftalık çalışma programı', 'mesai programı', 'salon dağılımı', 'post-op', 'hekim nerede', 'ameliyathane salonu', 'seyrantepe post op', 'sarıyer post op'],
    tabId: 'schedule',
    popular: true
  },
  {
    id: 'today-postop-doctors',
    title: 'Günün Post-Op Hekimleri (Seyrantepe & Sarıyer)',
    category: 'Rehber & Nöbet',
    badge: 'Post-op',
    description: 'Hafta içi mesai günlerinde Seyrantepe Post-op YBÜ ve Sarıyer -1 YBÜ görevli doktorları.',
    keywords: ['post op', 'günün postopcusu', 'postop hekimi', 'post-op ybü', 'sarıyer post op', 'seyrantepe post op'],
    tabId: 'schedule',
    popular: true
  },
  {
    id: 'icu-admission-criteria',
    title: 'Yoğun Bakım Endikasyonu (Kabul Kriterleri)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'YBÜ Kabul',
    description: 'SCCM, ESICM ve Sağlık Bakanlığı rehberliğinde Yoğun Bakım Endikasyonları: Triyaj Modeli, 9 Organ Sistemi ve Kritik Eşikler.',
    keywords: ['yoğun bakım', 'ybü', 'icu', 'kabul kriterleri', 'yatış endikasyonu', 'sccm', 'esicm', 'yoğun bakım endikasyonları', 'triyaj'],
    tabId: 'icu',
    popular: true
  },
  {
    id: 'icu-sccm-priority',
    title: 'SCCM Önceliklendirme Modeli (Priority 1, 2, 3, 4A, 4B)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Triyaj',
    description: 'Maksimum reversibilite ve faydaya göre yoğun bakım yatış önceliklendirmesi ve DNR/DNI sınırları.',
    keywords: ['priority 1', 'priority 2', 'priority 3', 'priority 4', 'öncelik 1', 'öncelik 2', 'sccm triyaj', 'reversibilite', 'dnr', 'dni'],
    tabId: 'icu'
  },
  {
    id: 'icu-objective-thresholds',
    title: 'Yoğun Bakım Kritik Eşik Değerleri (Objektif Parametreler)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Kritik Eşikler',
    description: 'Vital bulgular, kan gazı, laktat, PaO2/FiO2, elektrolitler ve EKG kritik eşik değer kontrol listesi.',
    keywords: ['kritik eşikler', 'objektif parametreler', 'kan gazı', 'laktat', 'pao2 fio2', 'pf oranı', 'asidoz', 'vital eşikler', 'hipotansiyon'],
    tabId: 'icu'
  },
  {
    id: 'icu-levels-scoring',
    title: 'Yoğun Bakım Basamakları (1., 2., 3. Basamak) & SOFA, NEWS2',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Basamak & Skorlama',
    description: 'T.C. Sağlık Bakanlığı YBÜ basamak standartları ve SOFA, NEWS2, APACHE fizyolojik skorlama kılavuzu.',
    keywords: ['1 basamak', '2 basamak', '3 basamak', 'sofa skoru', 'news2', 'apache', 'basamak standartları', 'organ yetmezliği'],
    tabId: 'icu'
  },
  {
    id: 'proc-systematic-management',
    title: 'Sistematik Prosedür Bazlı Anestezi Yönetimi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Cerrahi Rehber',
    description: 'Cerrahi branşlara göre prosedür bazlı anestezi yönetimi, pre-op hazırlık, intra-op havayolu ve vasküler erişim, cerrahi kritik anlar, Jaffe 5th ed., ERAS ve PROSPECT rehberleri.',
    keywords: ['prosedür', 'cerrahi anestezi', 'ameliyat rehberi', 'jaffe', 'eras', 'prospect', 'branş cerrahisi', 'anestezi yönetimi', 'laparoskopi'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-lap-chole',
    title: 'Laparoskopik Kolesistektomi (Anestezi Yönetimi, Jaffe, ERAS & PROSPECT)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Genel Cerrahi',
    description: 'Laparoskopik kolesistektomide anestezi teknikleri, CO2 pnömoperitoneum yönetimi, trokar girişi, vagal bradikardi, derin nöromusküler blokaj ve multimodal analjezi.',
    keywords: ['laparoskopik kolesistektomi', 'kolesistektomi', 'safra kesesi', 'lap-kole', 'genel cerrahi', 'jaffe', 'eras', 'prospect', 'trokar', 'pnömoperitoneum'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-open-chole',
    title: 'Açık Kolesistektomi (Anestezi Yönetimi, Jaffe, ERAS & PROSPECT)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Genel Cerrahi',
    description: 'Açık kolesistektomide anestezi teknikleri, subkostal Kocher insizyonu ekartasyonu, torakal epidural analjezi, derin nöromusküler blokaj, vasküler erişim ve ERAS prensipleri.',
    keywords: ['açık kolesistektomi', 'kolesistektomi', 'kocher insizyonu', 'subkostal', 'safra kesesi', 'açık batın', 'genel cerrahi', 'jaffe', 'eras', 'prospect', 'torakal epidural'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-awake-craniotomy',
    title: 'Uyanık Kraniyotomi (Anestezi Yönetimi, Jaffe, ERAS & PROSPECT)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin Cerrahi',
    description: 'Uyanık kraniyotomide Asleep-Awake-Asleep (AAA) ve MAC teknikleri, Skalp Bloğu, Deksmedetomidin/Remifentanil infüzyonu, kortikal haritalama, nöbet yönetimi ve ERAS ilkeleri.',
    keywords: ['uyanık kraniyotomi', 'kraniyotomi', 'awake craniotomy', 'beyin cerrahisi', 'nöroşirürji', 'elokent alan', 'gliom', 'skalp bloğu', 'deksmedetomidin', 'jaffe', 'eras', 'prospect', 'snacc'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniotomy-aneurysm',
    title: 'Kraniyotomi: İntrakraniyel Anevrizma Kliplenmesi (SAK Anestezi Yönetimi)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin Cerrahi',
    description: 'Serebral anevrizma kliplenmesinde TIVA/GETA teknikleri, transmural basınç dengesi, intraoperatif rüptür ve adenozin asistol protokolü, geçici klipleme ve burst süpresyon, AHA/ASA & SNACC rehberleri.',
    keywords: ['kraniyotomi anevrizma', 'anevrizma kliplenmesi', 'intrakraniyel anevrizma', 'serebral anevrizma', 'sak', 'subaraknoid kanama', 'beyin cerrahisi', 'nöroşirürji', 'adenozin asistoli', 'geçici klip', 'burst süpresyon', 'tiva', 'mannitol', 'jaffe', 'aha asa', 'snacc'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniotomy-embolectomy',
    title: 'Kraniyotomi: Serebral Embolektomi (Akut İskemik İnme Cerrahisi)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin Cerrahi',
    description: 'Akut iskemik inmede cerrahi trombektomi/embolektomi, pre-rekanalizasyon MAP ≥85-90 mmHg, post-rekanalizasyon reperfüzyon kanaması koruması (MAP <85 mmHg), IV tPA/heparin reversal ve AHA/ASA & SNACC ilkeleri.',
    keywords: ['kraniyotomi embolektomi', 'serebral embolektomi', 'inme cerrahisi', 'akut iskemik inme', 'trombektomi', 'mca embolektomi', 'büyük damar oklüzyonu', 'lvo', 'beyin cerrahisi', 'nöroşirürji', 'tpa reversal', 'kriyopresipitat', 'penumbra', 'rekanalizasyon', 'reperfüzyon kanaması', 'jaffe', 'aha asa', 'snacc', 'eso'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-gastroscopy',
    title: 'Gastroskopi (ÖGD / Üst GİS Endoskopi Sedasyonu)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Gastroenteroloji',
    description: 'Gastroskopide Propofol bazlı derin sedasyon, mikroakım EtCO2 kapnografi, sol lateral pozisyon, krikofarengeal geçiş, laringospazm ve aspirasyon yönetimi, ASGE/ASA kılavuzları.',
    keywords: ['gastroskopi', 'ögd', 'özofagogastroduodenoskopi', 'üst gis', 'endoskopi', 'gastroenteroloji', 'propofol', 'sedasyon', 'nora', 'aspirasyon', 'jaffe', 'asge'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-colonoscopy',
    title: 'Kolonoskopi (Alt GİS Endoskopi & Polipektomi Sedasyonu)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Gastroenteroloji',
    description: 'Kolonoskopide Propofol bazlı sedasyon + Fentanil/Ketofol analjezisi, fleksura geçişleri ve mezenterik traksiyonda vagal stimülasyon/bradikardi yönetimi, medikal CO2 insüflasyonu.',
    keywords: ['kolonoskopi', 'alt gis', 'polipektomi', 'kolon kanseri', 'gastroenteroloji', 'propofol', 'sedasyon', 'nora', 'fentanil', 'vagal bradikardi', 'jaffe', 'asge', 'esge'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-ercp',
    title: 'ERCP (Endoskopik Retrograd Kolanjiyopankreatografi)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Gastroenteroloji',
    description: 'ERCP anestezisinde endotrakeal genel anestezi vs derin sedasyon, prone pozisyon yönetimi, Oddi sfinkterotomi kanaması, floroskopi güvenliği ve post-ERCP pankreatit (PEP) profilaksisi.',
    keywords: ['ercp', 'kolanjit', 'koledok taşı', 'sfinkterotomi', 'gastroenteroloji', 'prone pozisyon', 'duodenoskop', 'post ercp pankreatit', 'pep', 'nora', 'jaffe', 'asge', 'esge'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-eus',
    title: 'EUS (Endoskopik Ultrasonografi & EUS-FNA/FNB)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Gastroenteroloji',
    description: 'EUS ve biyopsi anestezi yönetimi, MAC / derin sedasyon, pankreas/lenf nodu iğne girişinde mutlak hasta hareketsizliği, çölyak pleksus nörolizinde hipotansiyon yönetimi.',
    keywords: ['eus', 'endosonografi', 'endoskopik ultrasonografi', 'eus fna', 'eus fnb', 'çölyak blok', 'çölyak nöroliz', 'pankreas biyopsisi', 'gastroenteroloji', 'nora', 'jaffe', 'asge', 'esge'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-ekt',
    title: 'EKT (Elektrokonvülsif Tedavi / ECT Anestezisi)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Psikiyatri',
    description: 'EKT anestezisinde Propofol / Metodeksital indüksiyonu, Süksinilkolin nöromusküler blokajı, hiperventilasyon, izole manşon tekniği, bifazik otonomik yanıt (bradikardi/sempatik fırtına) yönetimi.',
    keywords: ['ekt', 'ect', 'elektrokonvülsif', 'psikiyatri', 'şizofreni', 'depresyon', 'katatoni', 'süksinilkolin', 'propofol', 'metodeksital', 'cuff', 'nora', 'jaffe', 'apa'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-breast-biopsy',
    title: 'Meme Biyopsileri (Eksizyonel, İnsizyonel ve Tel ile İşaretli Biyopsiler)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Genel Cerrahi',
    description: 'Meme biyopsilerinde MAC / sedoanaljezi yönetimi, lokal anestezik toksisitesi (LAST), epinefrin yanıtı, tel lokalizasyonu ve vazo-vagal senkop, spesimen mamografisi bekleme aralığı ve ERAS prensipleri.',
    keywords: ['meme biyopsisi', 'eksizyonel biyopsi', 'tel ile işaretli biyopsi', 'wlbb', 'meme cerrahisi', 'genel cerrahi', 'tru-cut', 'insizyonel biyopsi', 'bi-rads', 'sedasyon', 'mac', 'jaffe', 'eras', 'prospect'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-breast-conserving-surgery',
    title: 'Meme Koruyucu Cerrahi (Lumpektomi / Parsiyel Mastektomi ± SLNB)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Genel Cerrahi',
    description: 'Meme koruyucu cerrahide PECS I/II ve Serratus blokları, LMA ile genel anestezi, mavi boya (Patent Blue) enjeksiyonu ve yalancı SpO2 desatürasyonu, aksiller sinir stimülasyonu, neoadjuvan kardiyotoksisite ve ERAS ilkeleri.',
    keywords: ['meme koruyucu cerrahi', 'mkc', 'lumpektomi', 'parsiyel mastektomi', 'kuadrantektomi', 'slnb', 'sentinel lenf nodu', 'pecs bloğu', 'serratus bloğu', 'patent blue', 'metilen mavisi', 'genel cerrahi', 'onkoanestezi', 'jaffe', 'eras', 'prospect'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-anterior-upper-cervical-fusion',
    title: 'Üst Servikal (C1-C2) Anterior Füzyon ve Odontoid Vida Tespiti',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Üst servikal (C1-C2) odontoid vida fiksasyonu ve anterior füzyonda uyanık fiberoptik entübasyon, İONM (MEP/SSEP), çift C-kollu skopi, TIVA ve retrofaringeal ödem/kaff kaçak testi yönetimi.',
    keywords: ['anterior fusion', 'upper cervical spine', 'c1-c2', 'c1 c2', 'odontoid', 'dens kırığı', 'dens fraktürü', 'odontoid vida', 'atlantoaksiyel', 'uyanık fiberoptik', 'afoi', 'ionm', 'mep', 'ssep', 'vertebral arter', 'retrofaringeal ödem', 'cuff leak test', 'nöroşirürji', 'jaffe', 'eras'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-posterior-upper-cervical-fusion',
    title: 'Üst Servikal (C1-C2 / O-C2) Posterior Füzyon ve Enstrümantasyon',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Üst servikal (O-C2, C1-C2) posterior enstrümantasyon (Harms/Magerl), prone çevirme, uyanık fiberoptik, İONM (MEP/SSEP), TIVA, Mayfield tespiti ve görme kaybı (ION) koruması.',
    keywords: ['posterior fusion', 'upper cervical spine', 'c1-c2 posterior', 'harms tekniği', 'magerl', 'transartiküler vida', 'lateral mass vida', 'oksipitoservikal', 'prone pozisyon', 'mayfield çivili başlık', 'uyanık fiberoptik', 'ionm', 'mep', 'ssep', 'vertebral arter', 'tiva', 'iskemik optik nöropati', 'görme kaybı', 'jaffe', 'eras'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniotomy-vascular-malformation',
    title: 'Kraniyotomi: İntrakraniyel Vasküler Malformasyon Cerrahisi (AVM ve Kavernom)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Serebral AVM ve kavernom mikrocerrahisinde TIVA, İONM (MEP/SSEP), Normal Perfüzyon Basıncı Çöküşü (NPPB), oklüzif hiperemi, post-rezeksiyon hipotansiyon ve pürüzsüz uyanma.',
    keywords: ['craniotomy', 'vascular malformations', 'avm', 'arteriyovenöz malformasyon', 'kavernom', 'cavernoma', 'kavernöz hemanjiom', 'nppb', 'spetzler-martin', 'normal perfusion pressure breakthrough', 'oklüzif hiperemi', 'icg anjiyografi', 'tiva', 'esmolol', 'nöroşirürji', 'jaffe', 'eras'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniotomy-ec-ic-bypass',
    title: 'Kraniyotomi: Ekstrakraniyel-İntrakraniyel Revaskülarizasyon (EC-IC Bypass / STA-MCA)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Moyamoya ve kompleks anevrizmalarda STA-MCA bypass; normokapni (PaCO2 38-42), geçici kliplemede indüklenmiş hipertansiyon (MAP 90-100), TIVA, ICG anjiyografi ve serebral hiperperfüzyon önlemi.',
    keywords: ['ec-ic bypass', 'craniotomy', 'extracranial intracranial bypass', 'sta-mca', 'moyamoya', 'moyamoya hastalığı', 'revaskülarizasyon', 'serebral bypass', 'indüklenmiş hipertansiyon', 'tiva', 'icg anjiyografi', 'charbel', 'serebral hiperperfüzyon', 'chs', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniotomy-tumor',
    title: 'Kraniyotomi: Supratentoryal Beyin Tümörü Rezeksiyonu (Gliom, Menenjiyom, Metastaz)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Supratentoryal beyin tümörlerinde TIVA, İONM (MEP/SSEP/Phase Reversal), gevşek beyin (slack brain) yönetimi, Mannitol/Hipertonik Salin, hafif hiperventilasyon, CUSA ve pürüzsüz uyanma.',
    keywords: ['craniotomy for tumor', 'craniotomy tumor', 'beyin tümörü', 'gliom', 'glioblastoma', 'menenjiyom', 'meningioma', 'metastaz', 'supratentoryal tümör', 'kibas', 'mannitol', 'slack brain', 'tiva', 'cusa', 'mayfield', 'pürüzsüz uyanma', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniotomy-trauma',
    title: 'Acil Kraniyotomi ve Kraniektomi: Akut Kafa Travması Cerrahisi (Epidural, Subdural Hematom ve Dekompresyon)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Akut epidural, subdural hematom ve dekompresif kraniektomide MILS ile RSI, hipotansiyondan kaçınma (MAP ≥ 80), CPP ≥ 60-70, normokapni, hipertonik salin, MTP ve kranium açılışı.',
    keywords: ['craniotomy for trauma', 'craniotomy trauma', 'nörotravma', 'kafa travması', 'epidural hematom', 'edh', 'subdural hematom', 'sdh', 'dekompresif kraniektomi', 'tbi', 'btf', 'brain trauma foundation', 'mils', 'rsi', 'hipertonik salin', 'cpp', 'kibas', 'jaffe', 'atls', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniotomy-microvascular-decompression',
    title: 'Kraniyotomi: Kranyal Sinir Mikrovasküler Dekompresyonu (MVD - Trigeminal, Fasiyal ve Glossofaringeal)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Trigeminal nevralji ve hemifasiyal spazmda retrosigmoid MVD; BAEP işitme izlemi (Dalga V), kas gevşeticisiz TIVA, trigemino-kardiyak refleks ve pürüzsüz uyanma.',
    keywords: ['microvascular decompression', 'mvd', 'cranial nerve decompression', 'jannetta', 'trigeminal nevralji', 'hemifasiyal spazm', 'glossofaringeal nevralji', 'retrosigmoid', 'park-bench', 'baep', 'abr', 'fasiyal emg', 'lateral spread response', 'trigemino-kardiyak refleks', 'tiva', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-bifrontal-craniotomy-csf-leak',
    title: 'Bifrontal Kraniyotomi: Beyin Omurilik Sıvısı (BOS) Fistülü ve Rinore Onarımı (Ön Kafa Kaidesi Rekonstrüksiyonu)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Ön kafa tabanı BOS fistülü ve kranializasyonda oral OGT (nazal tüp yasağı), N2O kontrendikasyonu, lomber drenaj, intratekal flöresein, Valsalva ve pürüzsüz uyanma.',
    keywords: ['bifrontal craniotomy', 'csf leak', 'bos fistülü', 'bos rinoresi', 'ön kafa kaidesi', 'lamina kribrosa', 'frontal sinüs kranializasyonu', 'perikranyal flep', 'lomber drenaj', 'intratekal flöresein', 'ngt kontrendikasyonu', 'n2o yasağı', 'valsalva', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-transsphenoidal-pituitary-resection',
    title: 'Transsfenoidal Hipofiz Tümörü Rezeksiyonu (Endoskopik Endonazal Hipofiz Cerrahisi)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Endoskopik hipofiz cerrahisi; akromegali zor hava yolu, nazal epinefrin yanıtı, ICA hasar önlemi, Valsalva ile tümör indirilmesi, boğaz tamponu ve DI takibi.',
    keywords: ['transsphenoidal', 'pituitary tumor', 'hipofiz adenomu', 'hipofizektomi', 'endonazal hipofiz', 'akromegali', 'cushing', 'prolaktinoma', 'diyabetes insipidus', 'throat pack', 'karotid arter', 'valsalva', 'hadad flebi', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-ventricular-shunt-procedures',
    title: 'Ventriküler Şant Girişimleri: Ventriküloperitoneal ve Ventriküloatrial Şant Cerrahisi (VP / VA Şant)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Hidrosefali şant cerrahisinde subkütan tünelleme sempatik yanıtı, laparoskopi ve KİBAS etkileşimi, aşırı drenaj önlemi, VA şant hava embolisi/aritmi ve sterilite.',
    keywords: ['ventricular shunt', 'vp shunt', 'va shunt', 'ventriküloperitoneal şant', 'ventriküloatrial şant', 'hidrosefali', 'normal basınçlı hidrosefali', 'nph', 'subkütan tünelleme', 'laparoskopik şant', 'overdrainage', 'şant enfeksiyonu', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-craniocervical-decompression-chiari',
    title: 'Kraniyoservikal Dekompresyon: Chiari Malformasyonu Cerrahisi (Foramen Magnum Dekompresyonu ve Duraplasti)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Chiari malformasyonunda foramen magnum dekompresyonu; servikal nötral entübasyon, prone pozisyon çene-göğüs 2 parmak kuralı, İONM (MEP/SSEP), VAE ve santral apne takibi.',
    keywords: ['chiari malformation', 'craniocervical decompression', 'chiari dekompresyonu', 'foramen magnum dekompresyonu', 'suboksipital kraniektomi', 'c1 laminektomi', 'siringomiyeli', 'duraplasti', 'prone pozisyon', 'ionm', 'mep', 'ssep', 'baep', 'santral apne', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-stereotactic-neurosurgery',
    title: 'Stereotaktik Beyin Biyopsisi (Çerçeveli ve Çerçevesiz Tanısal Girişimler)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Derin yerleşimli kitle ve tümörlerde stereotaktik biyopsi; çerçeveli hava yolu güvenliği, burr-hole, dural koagülasyon, beyin şifti önlemi ve Ommaya rezervuarı.',
    keywords: ['stereotactic biopsy', 'stereotaktik beyin biyopsisi', 'tümör biyopsisi', 'derin beyin lezyonu', 'leksell çerçeve', 'crw', 'burr-hole', 'ommaya rezervuarı', 'kist aspirasyonu', 'lenfoma', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-stereotactic-dbs-pallidotomy-thalamotomy',
    title: 'Stereotaktik Fonksiyonel Girişimler: Derin Beyin Stimülasyonu (DBS), Pallidotomi ve Talamotomi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Parkinson, tremor ve distonide DBS, GPi pallidotomisi ve Vim talamotomisi; MER uyanık testleme, test/kalıcı RF lezyonlama, optik traktus/kapsül kontrolü ve IPG.',
    keywords: ['deep brain stimulation', 'dbs', 'pallidotomy', 'thalamotomy', 'pallidotomi', 'talamotomi', 'beyin pili', 'parkinson', 'esansiyel tremor', 'distoni', 'stn', 'gpi', 'vim', 'mer', 'mikroelektrot kaydı', 'radyofrekans lezyonlama', 'uyanık dbs', 'deksmedetomidin', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-vagal-nerve-stimulation',
    title: 'Vagal Sinir Stimülasyonu (VNS): Sol Vagus Siniri Stimülatörü İmplantasyonu (Dirençli Epilepsi Tedavisi)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Dirençli epilepside sol VNS implantasyonu; daima sol vagus kuralı, diseksiyonda bradikardi/asistoli yönetimi, elektrot test uyarımı ve servikal hematom önlemi.',
    keywords: ['vagal nerve stimulation', 'vns', 'vagus siniri', 'vagal stimülasyon', 'dirençli epilepsi', 'epilepsi cerrahisi', 'sol vagus', 'bradikardi', 'asistoli', 'lennox-gastaut', 'depresyon', 'lead interrogation', 'jaffe', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-surgical-analgesics-scs-itp-mcs',
    title: 'Cerrahi Analjezik Yöntemler: Omurilik Stimülasyonu (SCS), İntratekal İlaç Pompaları ve Motor Korteks Stimülasyonu (MCS)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Kronik ağrı ve spastisitede SCS, İTP (Baklofen/Morfin pompası) ve MCS; uyanık parestezi haritalaması, akut baklofen toksisitesi/yoksunluğu, SSEP faz dönüşümü ve epidural hematom önlemi.',
    keywords: ['surgical analgesics', 'spinal cord stimulation', 'scs', 'intrathecal pump', 'itb', 'baklofen pompası', 'ağrı pompası', 'omurilik pili', 'motor cortex stimulation', 'mcs', 'motor korteks stimülasyonu', 'fbss', 'crps', 'refleks sempatik distrofi', 'talamik ağrı', 'morfin pompası', 'jaffe', 'nacc', 'pacc', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-epilepsy-surgery',
    title: 'Epilepsi Cerrahisi: Rezektif Cerrahi, Amigdalohipokampektomi ve Elektrokortikografi (ECoG) Eşliğinde Odak Rezeksiyonu',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Dirençli epilepside temporal lobektomi ve amigdalohipokampektomi; ECoG anestezi etkileşimi, masada akut nöbet soğuk SF protokolü, AED etkileşimleri ve pürüzsüz uyanma.',
    keywords: ['epilepsy surgery', 'epilepsi cerrahisi', 'temporal lobektomi', 'amigdalohipokampektomi', 'atl', 'ah', 'mezial temporal skleroz', 'ecog', 'elektrokortikografi', 'diken dalga', 'fokal epilepsi', 'kortikal haritalama', 'cold saline', 'jaffe', 'ilae', 'aes', 'snacc', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-surgery-for-spasticity',
    title: 'Spastisite Cerrahisi: Selektif Dorsal Rizotomi (SDR), DREZ Lezyonlama ve Periferik Nörotomi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Serebral palsi ve spastisitede SDR ve DREZotomi; sıfır kas gevşetici kuralı, kökçük EMG stimülasyonu, S2-S4 sfinkter koruması, pediatrik hipotermi ve spazm analjezisi.',
    keywords: ['surgery for spasticity', 'spastisite cerrahisi', 'selektif dorsal rizotomi', 'sdr', 'drez', 'drezotomi', 'periferik nörotomi', 'serebral palsi', 'spastik dipleji', 'kökçük stimülasyonu', 'emg', 'anal sfinkter', 'jaffe', 'aacpdm', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-percutaneous-trigeminal-neuralgia',
    title: 'Trigeminal Nevraljide Perkütan Girişimler: Radyofrekans Rizotomi (RFT), Balon Mikrokompresyonu ve Gliserol Rizolizisi',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Trigeminal nevraljide perkütan RFT, balon mikrokompresyonu ve gliserol; trigeminokardiyak refleks (TCR) asistoli alarmı, uyut-uyandır-uyut sedasyonu, kornea refleksi ve ICA koruması.',
    keywords: ['percutaneous trigeminal neuralgia', 'trigeminal nevralji', 'perkütan rizotomi', 'radyofrekans rizotomi', 'rft', 'balon mikrokompresyonu', 'gliserol rizolizisi', 'meckel mağarası', 'gasser ganglionu', 'foramen ovale', 'hartel tekniği', 'trigeminokardiyak refleks', 'tcr', 'asistoli', 'kornea refleksi', 'jaffe', 'aans', 'cns', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-anterior-mid-lower-cervical-fusion',
    title: 'Orta ve Alt Servikal Omurga Anterior Füzyon ve Fiksasyonu: Anterior Servikal Diskektomi ve Füzyon (ACDF / ACCF)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'C3-C7 servikal miyelopati ve fıtıklarda ACDF ve ACCF; MILS entübasyon, ekartör sonrası tüp kaf deflasyonu (RLN koruması), MEP/SSEP TIVA ve acil boyun hematomu protokolü.',
    keywords: ['anterior cervical fusion', 'acdf', 'accf', 'servikal diskektomi', 'korpektomi', 'anterior servikal füzyon', 'c3-c7', 'servikal miyelopati', 'smith-robinson', 'recurrent laryngeal nerve', 'rln', 'retrofaringeal hematom', 'mils', 'jaffe', 'csrs', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-posterior-mid-lower-cervical-fusion',
    title: 'Orta ve Alt Servikal Omurga Posterior Füzyon ve Fiksasyonu: Laminektomi, Laminoplasti ve Lateral Mas / Pedikül Vidalama (C3-T1)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'C3-T1 posterior laminektomi ve lateral mas vidalaması; Mayfield çivi fiksasyonu, prone sıfır göz basısı (POVL önleme), TIVA MEP/SSEP ve kaf kaçak testi.',
    keywords: ['posterior cervical fusion', 'lateral mass', 'lateral mas vidalama', 'c3-c7', 'c7-t1', 'laminektomi', 'laminoplasti', 'mayfield', 'povl', 'magerl', 'vertebral arter', 'servikal miyelopati', 'jaffe', 'csrs', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-anterior-cervicothoracic-spine-surgery',
    title: 'Anterior Servikotorasik Omurga Cerrahisi: Transsternal / Manubriotomi Yaklaşımı İle C7-T3 Dekompresyon ve Rekonstrüksiyon',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'C7-T3 omurga tümör ve travmalarında transsternal dekompresyon; innominate arter ekartasyonu, sol radiyal arter kuralı, duktus torasikus ve gecikmiş ekstübasyon.',
    keywords: ['anterior cervicothoracic', 'servikotorasik omurga', 'transsternal', 'manubriotomi', 'c7-t3', 'korpektomi', 'innominate arter', 'sol radiyal arter', 'duktus torasikus', 'watershed iskemi', 'jaffe', 'csrs', 'nass', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-anterior-thoracic-spine-surgery',
    title: 'Anterior Torasik Omurga Cerrahisi: Torakotomi / VATS Yaklaşımı İle Torakal Diskektomi, Korpektomi ve Enstrümentasyon (T3-T12)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'T3-T12 kalsifiye disk ve kırıklarda torakotomi/VATS; tek akciğer ventilasyonu (DLT/OLV), Adamkiewicz arteri parapleji riski, lateral dekübitüs ve torasik epidural analjezi.',
    keywords: ['anterior thoracic spine', 'torasik omurga', 'torakotomi', 'vats', 'torakal diskektomi', 'korpektomi', 't3-t12', 'adamkiewicz arteri', 'tek akciger ventilasyonu', 'olv', 'dlt', 'lateral dekübitüs', 'jaffe', 'srs', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-posterior-thoracic-spine-surgery',
    title: 'Posterior Torasik Omurga Cerrahisi: Laminektomi, Kostotransversektomi ve Enstrümente Füzyon (Pedikül Vidaları ve Osteotomiler)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'T1-T12 torasik stenoz, kırık ve kifoskoliozda posterior füzyon ve osteotomiler; prone karın serbestliği (Batson pleksusu), sıfır göz basısı (POVL), İONM ve TXA.',
    keywords: ['posterior thoracic spine', 'torasik omurga', 'laminektomi', 'kostotransversektomi', 'pedikül vidası', 'kifoz', 'skolyoz', 'osteotomi', 'pso', 'vcr', 'batson pleksusu', 'povl', 'adamkiewicz', 'jaffe', 'srs', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-anterior-lumbar-lumbosacral-spine-surgery',
    title: 'Anterior Lomber ve Lumbosakral Omurga Cerrahisi: Retroperitoneal Yaklaşımla ALIF, OLIF ve Korpektomi (L1-S1)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'L1-S1 bel kayması ve disk dejenerasyonunda ALIF/OLIF; sol ana iliak ven kanama alarmı, süperior hipogastrik pleksus ve retrograd ejakülasyon koruması, çift ayak pulse oksimetresi.',
    keywords: ['anterior lumbar spine', 'alif', 'olif', 'xlif', 'retroperitoneal', 'l1-s1', 'l4-l5', 'l5-s1', 'sol ana iliak ven', 'retrograd ejakülasyon', 'hipogastrik pleksus', 'ayak nabız oksimetresi', 'lomber pleksus emg', 'jaffe', 'nass', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-posterior-lumbar-spine-surgery',
    title: 'Posterior Lomber Omurga Cerrahisi: Laminektomi, Diskektomi, Foraminotomi ve Enstrümente Füzyon (TLIF, PLIF, Pedikül Vidaları L1-S1)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'L1-S1 kanal darlığı, bel fıtığı ve bel kaymasında laminektomi, TLIF ve pedikül vidalama; prone karın serbestliği (Batson pleksusu), tetiklenmiş vida EMG, dural yırtık ve pürüzsüz uyanma.',
    keywords: ['posterior lumbar spine', 'lomber omurga', 'laminektomi', 'diskektomi', 'tlif', 'plif', 'pedikül vidası', 'spondilolistezis', 'bel kayması', 'batson pleksusu', 'triggered emg', 'dural yırtık', 'bos kaçağı', 'kauda ekuina', 'povl', 'jaffe', 'nass', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-posterior-lumbar-fusion-instrumentation',
    title: 'Posterior Lomber Füzyon ve Enstrümantasyon: Çok Seviyeli Pedikül Vidaları, Pelvik Fiksasyon (S2AI/İliak), Cisimlerarası Füzyon (TLIF/PLIF) ve Deformite Osteotomileri (L1-Pelvis)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Lomber skolyoz, düz bel ve lumbosakral instabilitede çok seviyeli pedikül vidalama, S2AI pelvik fiksasyon ve PSO osteotomisi; süperior gluteal arter/siyatik çentik alarmı, masif kanama ve POVL savunması.',
    keywords: ['posterior lumbar fusion', 'enstrümantasyon', 'pedikül vidası', 's2ai', 'iliak vida', 'pelvik fiksasyon', 'tlif', 'plif', 'pso', 'spo', 'osteotomi', 'flat back', 'lomber skolyoz', 'deformite', 'siyatik çentik', 'triggered emg', 'povl', 'jaffe', 'nass', 'srs', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  {
    id: 'proc-combined-anterior-posterior-thoracolumbar-instrumentation',
    title: 'Torasik ve Lomber Omurgada Kombine Anterior ve Posterior Enstrümantasyon: Aynı Gün / Aşamalı Çift Seviyeli Rekonstrüksiyon (360 Derece Füzyon)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Beyin ve Sinir Cerrahisi',
    description: 'Rijit kifoskolyoz, spondilopitozis ve tümör spondilektomisinde 360 derece füzyon; çift pozisyon değişimi/tüp güvenliği, kümülatif masif kanama, Adamkiewicz ve POVL koruması.',
    keywords: ['combined anterior posterior', '360 derece füzyon', 'torakolomber', 'torakotomi', 'retroperitoneal', 'korpektomi', 'pedikül vidası', 's2ai', 'adamkiewicz', 'resüsitasyon molası', 'pozisyon değişimi', 'dlt', 'masif kanama', 'povl', 'jaffe', 'srs', 'nass', 'snacc', 'eras', 'nöroşirürji'],
    tabId: 'procedures',
    popular: true
  },
  // Troubleshooting Tool
  {
    id: 'tool-troubleshooting',
    title: 'Anestezi Troubleshooting (Perioperatif Kriz ve Sorun Giderme)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Troubleshooting',
    description: 'Ameliyathanede ani alarmlar, ventilatör sorunları ve hemodinamik krizlerde algoritmik sorun giderme rehberi.',
    keywords: ['troubleshooting', 'sorun giderme', 'arıza', 'ventilatör alarmı', 'kriz', 'ameliyathane'],
    tabId: 'troubleshooting',
    popular: true
  },
  {
    id: 'disclaimer-info',
    title: 'Aydınlatma Metni ve Tıbbi Sorumluluk Reddi',
    category: 'Yerleşkeler & Bilgi',
    badge: 'Yasal Bilgi',
    description: 'Tıbbi karar destek ilkeleri, klinik bağımsızlık ve kullanım koşulları bilgilendirmesi.',
    keywords: ['aydınlatma metni', 'sorumluluk reddi', 'yasal uyarı', 'disclaimer', 'kullanım koşulları', 'etik'],
    tabId: 'disclaimer'
  }
];

/**
 * Turkish-aware lowercase normalization
 */
export function normalizeTurkish(text: string): string {
  return text
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Search items matching query string
 */
export function searchPortalItems(query: string): PortalSearchItem[] {
  const cleanQuery = normalizeTurkish(query);
  if (!cleanQuery) return [];

  const queryTerms = cleanQuery.split(/\s+/).filter(Boolean);

  return PORTAL_SEARCH_ITEMS.filter((item) => {
    const titleNorm = normalizeTurkish(item.title);
    const descNorm = normalizeTurkish(item.description);
    const badgeNorm = normalizeTurkish(item.badge);
    const categoryNorm = normalizeTurkish(item.category);
    const keywordsNorm = item.keywords.map(normalizeTurkish);

    // Each query term should match somewhere in title, desc, badge, category or keywords
    return queryTerms.every((term) => {
      if (titleNorm.includes(term)) return true;
      if (descNorm.includes(term)) return true;
      if (badgeNorm.includes(term)) return true;
      if (categoryNorm.includes(term)) return true;
      if (keywordsNorm.some((k) => k.includes(term))) return true;
      return false;
    });
  });
}
