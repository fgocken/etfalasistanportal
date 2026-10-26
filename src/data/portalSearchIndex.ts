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
    tabId: 'preop',
    popular: true
  },
  {
    id: 'guideline-npo-fasting',
    title: 'Preoperatif Açlık Süreleri (ASA NPO Kılavuzu)',
    category: 'Kılavuzlar & Protokoller',
    badge: 'Açlık Kılavuzu',
    description: 'Berrak sıvılar (2 saat), anne sütü (4 saat), bebek maması (6 saat), hafif yemek (6 saat), katı/yağlı gıdalar (8 saat).',
    keywords: ['açlık süreleri', 'npo', 'açlık kılavuzu', 'berrak sıvılar', 'su', 'anne sütü', 'bebek maması', 'katı gıda', 'aspirasyon profilaksisi'],
    tabId: 'preop',
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

  // 3. Klinik İnfografikler
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
