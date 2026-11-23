export interface OxygenTargetProfile {
  id: string;
  label: string;
  targetSpo2: string;
  initialDevice: string;
  initialFio2: string;
  rationale: string;
  avoid: string;
  severity: 'normal' | 'caution' | 'critical';
}

export interface OxygenFormulaEntry {
  name: string;
  equation: string;
  normalValue: string;
  clinicalNote: string;
}

export interface DeliveryDeviceRow {
  device: string;
  category: 'Düşük Akım (Değişken)' | 'Yüksek Akım (Sabit)' | 'Resüsitasyon / Devre';
  flowRange: string;
  fio2Range: string;
  humidification: string;
  mechanismNote: string;
  clinicalPearls: string;
}

export interface VenturiAdapterSpec {
  fio2: number;
  colorName: string;
  swatchHex: string;
  minO2Flow: number;
  airToO2Ratio: string;
  totalFlowAtMin: number;
  clinicalUse: string;
}

export interface CopdHypercapniaMechanism {
  rank: string;
  title: string;
  contribution: string;
  physiology: string;
}

export interface SpecialSituationItem {
  title: string;
  target: string;
  mechanism: string;
  action: string;
}

export interface OxygenReference {
  authors: string;
  title: string;
  detail: string;
}

export const OXYGEN_TARGET_PROFILES: OxygenTargetProfile[] = [
  {
    id: 'standard-hypoxemia',
    label: 'Genel Akut Hipoksemi (Hiperkapni Riski Yok)',
    targetSpo2: '%94 – %98',
    initialDevice: 'Nazal kanül (2–6 L/dk) veya Basit maske (5–10 L/dk); SpO_{2} < %85 ise NRBM (15 L/dk)',
    initialFio2: 'Titre edilen en düşük FiO_{2}',
    rationale:
      'BTS 2017 ve yoğun bakım çalışmaları (ICU-ROX, HOT-ICU) normoksemik hedeflerin doku hipoksisini giderirken hiperokseminin yol açtığı reabsorpsiyon atelektazisi, vazokonstriksiyon ve oksidatif stresi önlediğini gösterir.',
    avoid: 'Normoksemik (SpO_{2} ≥ %94) hastada gereksiz %100 O_{2} ile rutin hiperoksi (P_{a}O_{2} > 150–200 mmHg) oluşturma.',
    severity: 'normal',
  },
  {
    id: 'hypercapnic-risk',
    label: 'Hiperkapnik Solunum Yetmezliği Riski (KOAH, OHS, Nöromüsküler)',
    targetSpo2: '%88 – %92',
    initialDevice: 'Ventüri maskesi (%24 @ 2 L/dk veya %28 @ 4 L/dk) ya da 1–2 L/dk nazal kanül',
    initialFio2: '%24 – %28 ile başla, AKG sonucuna göre titre et',
    rationale:
      'Kontrolsüz yüksek FiO_{2}; HPV baskılanmasına bağlı \\dot{V}/\\dot{Q} uyumsuzluğunu artırır, Haldane etkisiyle Hb’den CO_{2} salınımını tetikler ve hipoksik dürtüyü kısmen azaltarak akut hiperkapnik asidoz ve koma geliştirir.',
    avoid: 'Ciddi hipoksemi varsa oksijeni ANİDEN kesme (rebound hipoksemi ölüme yol açar!); hedef %88–92 kalacak şekilde kademeli azalt ve hiperkapnik asidoz (pH < 7,35) gelişirse NIV’ye geç.',
    severity: 'caution',
  },
  {
    id: 'critical-emergency',
    label: 'Kritik Resüsitasyon, Şok, Travma, Sepsis & Anaflaksi',
    targetSpo2: 'Başlangıçta %100 FiO_{2} → Stabilizasyonda %94 – %98',
    initialDevice: 'Rezervuarlı maske (NRBM 15 L/dk) veya BVM (%100 O_{2})',
    initialFio2: '%85 – %100 (ROSC sonrası normoksemi titre et)',
    rationale:
      'Kardiyak arrest (CPR) sırasında ve ağır dolaşım şokunda hücresel O_{2} sunumu (DO_{2}) kritik düşüktür; ancak SpO_{2} güvenilir biçimde ölçüldüğü ve ROSC sağlandığı anda (AHA/ERC) %92–%98 normoksemiye inilmelidir.',
    avoid: 'Post-ROSC dönemde uzun süreli P_{a}O_{2} > 300 mmHg hiperoksemi nörolojik hasarı artırabilir; SpO_{2} > %98 tutma.',
    severity: 'critical',
  },
  {
    id: 'co-poisoning',
    label: 'Karbonmonoksit (CO) Zehirlenmesi / Siyanür İnhalasyonu',
    targetSpo2: 'SpO_{2} Güvenilmez! → %100 O_{2} zorunlu',
    initialDevice: 'Sıkı oturan NRBM (15 L/dk) veya Entübe ise FiO_{2} 1,00 (gerekirse HBOT)',
    initialFio2: '%100',
    rationale:
      'Standart 2 dalga boylu pulse oksimetre (660/940 nm) COHb’yi oksihemoglobinden ayıramaz ve SpO_{2}’yi yalancı normal/yüksek (%98–100) okur. %100 O_{2}, COHb yarı ömrünü ~4–6 saatten ~60–90 dakikaya indirir.',
    avoid: 'SpO_{2} %99 diye oda havasına alma! Mutlaka KO-oksimetri (arteriyel/venöz kan gazı COHb düzeyi) ile değerlendir.',
    severity: 'critical',
  },
  {
    id: 'bleomycin-paraquat',
    label: 'Bleomisin Pnömonisi Riski veya Parakuat Zehirlenmesi',
    targetSpo2: '%88 – %92 (Mümkün olan minimum FiO_{2})',
    initialDevice: 'Oda havası veya gerekirse düşük akım nazal kanül / %24–28 Ventüri',
    initialFio2: '%21 – %30 (Asla rutin > %30 verme)',
    rationale:
      'Bleomisin ve parakuat akciğer dokusunda yüksek FiO_{2} varlığında süperoksit ve hidroksil radikalleri üretimini katlayarak geri dönüşsüz akut interstisyel fibrozis (ARDS benzeri tablo) tetikler.',
    avoid: 'Preoksijenasyon/anestezi sırasında rutin körü körüne %100 O_{2} kullanımından kaçın (yalnızca hayatı tehdit eden desatürasyonda titre et).',
    severity: 'caution',
  },
  {
    id: 'airway-fire',
    label: 'Havayolu / Baş-Boyun Cerrahisinde Yangın Riski (Koter / Lazer)',
    targetSpo2: 'Güvenli minimum (Genellikle %90 – %95)',
    initialDevice: 'Tıbbi hava ile seyreltilmiş devre (FiO_{2} < 0,30)',
    initialFio2: '< %30 (N_{2}O KESİNLİKLE YASAK)',
    rationale:
      'Yangın üçgeni: Oksidan (O_{2} ve N_{2}O!) + Yakıt (gazlı bez, ETT, alkol antiseptik) + Isı/Kıvılcım (koter, lazer). Yüksek açık alan FiO_{2}’si ve N_{2}O (ekzotermik ayrışır) ani havayolu yangınına yol açar.',
    avoid: 'Yüz/boyun/orofarenks veya trakeostomi açılışı sırasında koter kullanırken açık maske/nazal kanülle > %30 O_{2} veya N_{2}O verilmesi.',
    severity: 'critical',
  },
];

export const OXYGEN_DELIVERY_FORMULAS: OxygenFormulaEntry[] = [
  {
    name: 'Arteriyel Oksijen İçeriği (C_{a}O_{2})',
    equation: 'C_{a}O_{2} = (1,34 × Hb × S_{a}O_{2}) + (0,0031 × P_{a}O_{2})',
    normalValue: '≈ 19,5 – 20,5 mL O_{2}/dL kan (Hb 15 g/dL, S_{a}O_{2} 0,98, P_{a}O_{2} 95 mmHg)',
    clinicalNote:
      '1,34 (veya textbooklara göre 1,36–1,39) mL O_{2}/g Hb Hüfner sabitidir; S_{a}O_{2} ondalık (ör. 0,98) girilir. Normobarik ortamda oksijenin ~%98,5’i hemoglobine bağlıdır; çözünen fraksiyon (0,0031 × P_{a}O_{2}) oda havasında ~0,3 mL/dL iken %100 O_{2}’de bile yalnızca ~1,8–2,0 mL/dL olur. Hiperbarik 3 ATA’da ~6 mL/dL’ye ulaşarak tek başına bazal metabolizmayı sürdürebilir.',
  },
  {
    name: 'Sistemik Oksijen Sunumu (DO_{2} ve DO_{2}I)',
    equation: 'DO_{2} = CO × C_{a}O_{2} × 10',
    normalValue: '≈ 900 – 1100 mL O_{2}/dk  (İndeks DO_{2}I ≈ 520 – 650 mL/dk/m^{2})',
    clinicalNote:
      '×10 çarpanı, C_{a}O_{2} birimi olan dL’yi (100 mL), kalp debisi (CO) birimi olan L’ye (1000 mL) eşitlemek içindir. DO_{2}’nin üç temel ayağı vardır: Kalp Debisi (CO), Hemoglobin (Hb) ve S_{a}O_{2}. Ağır anemide (ör. Hb 5 g/dL) SpO_{2} %100 olsa bile C_{a}O_{2} yarıdan fazla düştüğünden yalnızca FiO_{2} artırmak doku hipoksisini düzeltemez.',
  },
  {
    name: 'Oksijen Tüketimi (VO_{2} · Fick İlkesi) ve Ekstraksiyon Oranı (O_{2}ER)',
    equation: 'VO_{2} = CO × (C_{a}O_{2} − C_{\\bar{v}}O_{2}) × 10   |   O_{2}ER = VO_{2} / DO_{2}',
    normalValue: 'VO_{2} ≈ 250 mL/dk (~3,5 mL/kg/dk)  ·  O_{2}ER ≈ %25  ·  S_{\\bar{v}}O_{2} ≈ %70–75',
    clinicalNote:
      'İstirahatte dokular gelen oksijenin yalnızca ~%25’ini kullanır (4:1 güvenlik rezervi). DO_{2} düştüğünde dokular O_{2}ER’yi %50–60’a çıkararak VO_{2}’yi korur ("sunumdan bağımsız faz"). Kritik eşik olan DO_{2krit} (~4–8 mL/kg/dk veya ~300 mL/dk) altına inildiğinde ekstraksiyon artık artamaz, VO_{2} sunuma bağımlı düşer ve laktik asidoz başlar.',
  },
  {
    name: 'Ventüri Hava:O_{2} Sürüklenme Oranı ve Transfer O_{2} Tüpü Süresi',
    equation: 'Hava : O_{2} = (1 − FiO_{2}) / (FiO_{2} − 0,21)   |   Süre (dk) = Su Hacmi (L) × (P_{bar} − P_{rezerv}) / Akım',
    normalValue: 'Emniyet rezervi ≈ 20 bar  ·  2 L @ 150 bar ve 6 L/dk → 2 × 130 / 6 ≈ 43 dk',
    clinicalNote:
      'Boyle Yasasına (P_{1}V_{1} = P_{2}V_{2}) göre silindirin içindeki kullanılabilir gaz hacmi su hacmi (TR portatif transport: 2 L, standart E-silindir: ~4,7 L, sedye: 5 L) ile kalan basınç farkının çarpımıdır. Pnömatik transport ventilatörlerinin ek sürüş gazı (drive gas) tüketimi unutulmamalıdır.',
  },
];

export const COPD_HYPERCAPNIA_MECHANISMS: CopdHypercapniaMechanism[] = [
  {
    rank: '1. Mekanizma (Ana Neden)',
    title: '\\dot{V}/\\dot{Q} Uyumsuzluğunun Artması & HPV Baskılanması',
    contribution: '~ %50 – %70 katkı',
    physiology:
      'İleri KOAH’ta hipoventile alveollerde hipoksik pulmoner vazokonstriksiyon (HPV) kanı iyi ventile alanlara yönlendirir. Yüksek FiO_{2} verilince bu alanlarda P_{A}O_{2} yükselir, HPV kalkar ve kötü ventile alveollere kan akımı artar; iyi ventile alanlardan perfüzyon çalınarak fizyolojik ölü boşluk (V_{D}/V_{T}) ve P_{a}CO_{2} artar.',
  },
  {
    rank: '2. Mekanizma (Önemli)',
    title: 'Haldane Etkisi (Oksihemoglobinin CO_{2} Bağlama Afinitesini Düşürmesi)',
    contribution: '~ %25 – %30 katkı',
    physiology:
      'Hemoglobin oksijenlendikçe konformasyon değiştirir ve karbamino bileşiği + H^{+} tamponlama kapasitesi azalır. Periferik ve pulmoner kapillerlerde Hb’den serbestleşen CO_{2} plazmaya geçer; solunumsal rezervi kısıtlı hasta bunu atamazsa P_{a}CO_{2} yükselir.',
  },
  {
    rank: '3. Mekanizma (Klasik / Sınırlı)',
    title: 'Hipoksik Solunum Dürtüsünün Baskılanması',
    contribution: '~ %10 – %20 katkı',
    physiology:
      'Kronik hiperkapnide santral kemoreseptörler BOS bikarbonat artışına kısmen adapte olduğu için periferik (karotid cisimcik) hipoksik dürtü önem kazanır. Yüksek P_{a}O_{2} ilk dakikalarda dakika ventilasyonunu (%10–20) düşürse de tek başına tüm hiperkapniyi açıklamaz.',
  },
];

export const DELIVERY_DEVICES: DeliveryDeviceRow[] = [
  {
    device: 'Nazal Kanül (Çatal)',
    category: 'Düşük Akım (Değişken)',
    flowRange: '1 – 6 L/dk',
    fio2Range: '~ %24 – %40',
    humidification: '≤ 4 L/dk gerekmez · > 4 L/dk kabarcıklı nemlendirici önerilir',
    mechanismNote:
      'Nazofarinksi anatomik rezervuar (~50 mL) olarak kullanır. Her +1 L/dk kabaca FiO_{2}’yi ~%3–4 artırır; ancak hastanın PIFR’si arttığında (taşipne) oda havası sürüklenerek FiO_{2} düşer.',
    clinicalPearls:
      '> 6 L/dk akım FiO_{2}’yi anlamlı artırmaz; mukozal kuruluk, epistaksis ve frontal sinüs ağrısı yapar. Ağızdan soluyan hastalarda da nazofarinks karışımı sürer.',
  },
  {
    device: 'Basit Yüz Maskesi',
    category: 'Düşük Akım (Değişken)',
    flowRange: '5 – 10 L/dk (MİNİMUM 5 L/dk!)',
    fio2Range: '~ %35 – %55',
    humidification: 'Standart soğuk/ısıtmasız nemlendirici opsiyonel',
    mechanismNote:
      'Maske içi (~100–200 mL) ek oksijen rezervuarı sağlar; yan deliklerden hem ekspirasyon gazı çıkar hem oda havası sürüklenir.',
    clinicalPearls:
      'NEVER EVENT UYARISI: Akım 5 L/dk’nın altında bırakılırsa ekspiratuvar CO_{2} maskeden yıkanamaz ve hasta kendi CO_{2}’sini geri solur (rebreathing)!',
  },
  {
    device: 'Rezervuarlı Maske (NRBM — Geri Solumasız)',
    category: 'Düşük Akım (Değişken)',
    flowRange: '10 – 15 L/dk (Torba sönmemeli!)',
    fio2Range: '~ %60 – %85 (ideal sızdırmazlıkta ~%90)',
    humidification: 'Genellikle nemlendiricisiz acil yüksek akım',
    mechanismNote:
      'Altında tek yönlü valfli 600–1000 mL rezervuar torbası + yan ekspiratuvar valfler bulunur. İnspirasyonda hasta torbadan yüksek O_{2} çeker.',
    clinicalPearls:
      'Maske hastaya takılmadan önce valf parmakla kapatılıp torba TAM şişirilmelidir. İnspirasyonda torba 1/3’ten fazla sönüyorsa akım yetmiyordur (15 L/dk’ya çık). Hiperkapnik KOAH’ta risklidir.',
  },
  {
    device: 'Ventüri Maskesi (HAFOE — Sabit Performanslı)',
    category: 'Yüksek Akım (Sabit)',
    flowRange: 'O_{2}: 2–15 L/dk · Toplam Gaz: 30–100+ L/dk',
    fio2Range: '%24 · %28 · %31 · %35 · %40 · %60 (Kesin)',
    humidification: 'Yüksek akım nedeniyle kurumaya karşı nemlendirme adaptörü eklenebilir',
    mechanismNote:
      'Bernoulli ilkesi (dar orifisten geçen yüksek hızlı O_{2} jeti etrafında negatif basınç oluşturarak belirli oranda oda havası sürükler). Toplam gaz akımı hastanın PIFR’sini (30–50 L/dk) aştığı için FiO_{2} solunum hızından bağımsız sabit kalır.',
    clinicalPearls:
      'KOAH ve hiperkapnik solunum yetmezliğinde kontrollü O_{2} titrasyonunun altın standardıdır. Dikkat: %60 yeşil adaptörde toplam akım (~30 L/dk) derin taşipnede PIFR’nin altında kalabilir.',
  },
  {
    device: 'Yüksek Akımlı Nazal Kanül (HFNC)',
    category: 'Yüksek Akım (Sabit)',
    flowRange: '30 – 60 L/dk (özel sistemler 70 L/dk)',
    fio2Range: '%21 – %100 (Blender ile bağımsız ayar)',
    humidification: 'ZORUNLU Aktif Isıtmalı Nemlendirme (37 °C · 44 mg H_{2}O/L)',
    mechanismNote:
      'Akım hastanın PIFR’sini tam karşıladığından sabit FiO_{2} verir; anatomik ölü boşluğu CO_{2}’den yıkar ve ağız kapalıyken akıma bağlı düşük düzey PEEP (~2–5 cmH_{2}O) oluşturur.',
    clinicalPearls:
      'Hipoksemik (Tip 1) solunum yetmezliğinde konvansiyonel oksijenden üstündür (ERS 2022). Başlangıçtan sonraki 2–6–12. saatlerde ROX İndeksi = (SpO_{2}/FiO_{2}) / Solunum Hızı takip edilir (< 2,85–3,85 entübasyon riski).',
  },
  {
    device: 'Balon-Valf-Maske (BVM / Ambu) & Mapleson C',
    category: 'Resüsitasyon / Devre',
    flowRange: '12 – 15 L/dk (+ PEEP Valfi 5–10 cmH_{2}O)',
    fio2Range: 'Rezervuarsız ~%40–50 · Rezervuarlı ~%90–100',
    humidification: 'Acil kısa süreli kullanım',
    mechanismNote:
      'Tek yönlü valf (non-rebreathing) ve rezervuar sayesinde spontan veya pozitif basınçlı ventilasyonla %100’e yakın oksijen sağlar.',
    clinicalPearls:
      'Spontan soluyan hastada kendi kendine açılmayan BVM valfi inspiratuvar iş yükünü artırabilir; preoksijenasyonda anestezi devresi (yüksek FGF ≥ 10 L/dk + APL sıfır) daha konforlu ve etkilidir.',
  },
];

export const VENTURI_ADAPTER_SPECS: VenturiAdapterSpec[] = [
  {
    fio2: 24,
    colorName: 'Mavi',
    swatchHex: '#2563eb',
    minO2Flow: 2,
    airToO2Ratio: '25,3 : 1',
    totalFlowAtMin: 53,
    clinicalUse: 'Ağır KOAH / Tip 2 solunum yetmezliği başlangıç titrasyonu (SpO_{2} hedef %88–92)',
  },
  {
    fio2: 28,
    colorName: 'Beyaz',
    swatchHex: '#cbd5e1',
    minO2Flow: 4,
    airToO2Ratio: '10,3 : 1',
    totalFlowAtMin: 45,
    clinicalUse: 'KOAH standart başlangıç veya %24 yanıt vermeyen hiperkapnik hasta',
  },
  {
    fio2: 31,
    colorName: 'Turuncu',
    swatchHex: '#ea580c',
    minO2Flow: 6,
    airToO2Ratio: '6,9 : 1',
    totalFlowAtMin: 47,
    clinicalUse: 'Orta dereceli kontrollü FiO_{2} artışı gereken kronik akciğer hastaları',
  },
  {
    fio2: 35,
    colorName: 'Sarı',
    swatchHex: '#eab308',
    minO2Flow: 8,
    airToO2Ratio: '4,6 : 1',
    totalFlowAtMin: 45,
    clinicalUse: 'Post-ekstübasyon kontrollü oksijenasyon veya orta hipoksemi',
  },
  {
    fio2: 40,
    colorName: 'Kırmızı',
    swatchHex: '#dc2626',
    minO2Flow: 10,
    airToO2Ratio: '3,1 : 1',
    totalFlowAtMin: 41,
    clinicalUse: 'Tip 1 hipoksemide stabil FiO_{2} sağlama (10–12 L/dk ile 41–49 L/dk akım)',
  },
  {
    fio2: 60,
    colorName: 'Yeşil',
    swatchHex: '#16a34a',
    minO2Flow: 15,
    airToO2Ratio: '1,0 : 1',
    totalFlowAtMin: 30,
    clinicalUse: 'Yüksek FiO_{2} gerektiren hipoksemi (Dikkat: toplam akım 30 L/dk olduğundan ağır dispnede PIFR altında kalabilir!)',
  },
];

export const SPECIAL_SITUATIONS: SpecialSituationItem[] = [
  {
    title: 'Preoksijenasyon (Denitrojenasyon) & Güvenli Apne Penceresi',
    target: 'FeO_{2} > %85 – %90 (EtO_{2} takibi)',
    mechanism:
      'Normalde FRC’nin (%79) ~2.000 mL’sini azot oluşturur. Sıkı oturan maske + %100 O_{2} (≥ 10 L/dk) ile 3 dk normal tidal solunum veya 60 sn’de 8 derin vital kapasite nefesi FRC’yi oksijenle doldurur; sağlıklı erişkinde güvenli apne süresi (SpO_{2} > %90) ~1–2 dk’dan ~6–8 dk’ya çıkar.',
    action:
      'Obez, gebe ve yüksek metabolizmalı hastalarda (FRC ↓, VO_{2} ↑) süre yarıdan fazla kısalır → 20–25° baş yukarı (ramped) pozisyon + 5–10 cmH_{2}O CPAP/PEEP ile preoksijenasyon atelektazisi önlenir.',
  },
  {
    title: 'Apneik Oksijenasyon (NODESAT / THRIVE)',
    target: 'Laringoskopi süresince 10–15 L/dk nazal O_{2} (veya 50–70 L/dk HFNC)',
    mechanism:
      'Apnede alveolden kana geçen O_{2} (~250 mL/dk), kandan alveole geçen CO_{2}’den (~20–40 mL/dk; doku/kanda tamponlandığı için) çok fazla olduğundan alveoler basınç hafif negatifleşir ve farenksteki oksijen pasif kütle akımıyla aşağı çekilir.',
    action:
      'KRİTİK SINIR: Havayolu açıklığı şarttır (çene itme / airway)! Ayrıca ventilasyon olmadığı için P_{a}CO_{2} ilk dakikada ~6–12 mmHg, sonraki her dakikada ~3–5 mmHg yükselir (asidoz/KİB artışı riski).',
  },
  {
    title: 'İntraoperatif Yüksek FiO_{2} (%80 vs %30–40) Tartışması',
    target: 'İdamede rutin %30 – %40 FiO_{2} + PEEP (Normoksemi)',
    mechanism:
      'WHO 2016/2018 rehberleri kolorektal cerrahide SSI azaltımı için %80 FiO_{2} önermiş olsa da; PROXI çalışması (JAMA 2009) ve güncel anestezi/perioperatif meta-analizler SSI’da anlamlı klinik fayda göstermemiş, %80 FiO_{2}’nin absorpsiyon atelektazisini ve oksidatif stresi artırdığını ortaya koymuştur.',
    action:
      'İndüksiyon ve ekstübasyon öncesi preoksijenasyon dışında idame anestezi sırasında normoksemi (SpO_{2} %94–98) sağlayacak en düşük FiO_{2} + akciğer koruyucu PEEP tercih edilir.',
  },
  {
    title: 'Ekstübasyon Sonrası & PACU Hipoksemisi (Difüzyon Hipoksisi)',
    target: 'N_{2}O kullanıldıysa kesim sonrası en az 3–5 dk %100 O_{2}',
    mechanism:
      'N_{2}O kan:gaz erirliği azottan ~30 kat yüksek olduğu için kesildiği anda kandan alveole hızla boşalır; alveoler O_{2} ve CO_{2}’yi seyreltir (Fink difüzyon hipoksisi). PACU hipoksemisinin diğer ana nedenleri rezidüel NMB, opioid solunum depresyonu ve FRC kaybına bağlı atelektazidir.',
    action:
      'Körü körüne tüm ekstübasyonlarda yüksek FiO_{2} + sıfır PEEP yerine klinik riske göre titre et; SpO_{2} tek başına ventilasyon yeterliliğini göstermez (yüksek FiO_{2} altında ciddi hiperkapni maskelenebilir!).',
  },
];

export const OXYGEN_SAFETY_CHECKLIST = {
  neverEvents: [
    'Basit yüz maskesinde O_{2} akımının < 5 L/dk bırakılması → maske ölü boşluğunda CO_{2} birikimi (rebreathing) ve hiperkapnik asidoz.',
    'Karbonmonoksit (CO) veya MetHb zehirlenmesinde standart SpO_{2} %99 görünümüne güvenip oksijen tedavisini kesmek.',
    'Baş-boyun, orofarenks veya trakeostomi cerrahisinde açık O_{2} (> %30) veya N_{2}O akımı altında koter/lazer kullanılması (Ameliyathane Havayolu Yangını!).',
    'Yedek silindiri (veya manometre basıncını) kontrol etmeden entübe/hipoksemik hastayı O_{2} tüpüyle transfere çıkarmak.',
    'PISS (Pin Index Safety System) ve DISS bağlantıları zorlayarak veya hasarlı adaptörle yanlış medikal gaz vermek.',
  ],
  boardTraps: [
    'KOAH’ta oksijen kaynaklı hiperkapninin EN BÜYÜK nedeni "hipoksik dürtü baskılanması" değil, HPV inhibisyonuna bağlı \\dot{V}/\\dot{Q} uyumsuzluğu artışı + Haldane etkisidir!',
    'Yüksek FiO_{2} altında normokapnik hastada SpO_{2} %99 iken bile ciddi hipoventilasyon ve P_{a}CO_{2} > 70 mmHg gelişebilir — SpO_{2} bir VENTİLASYON monitörü değildir!',
    'Rezervuarlı (NRBM) maskede akım yetersizse inspirasyonda torba çöker ve tek yönlü valf çalışmazsa hasta CO_{2} biriktirir.',
    'Ventüri maskesinin (HAFOE) sabit FiO_{2} verebilmesinin sırrı, dar jet orifisten oluşan Bernoulli sürüklemesiyle hastanın PIFR’sini (30–50 L/dk) aşan toplam akım üretmesidir.',
    'Ağır anemide (Hb = 5 g/dL) SpO_{2} %100 olsa bile C_{a}O_{2} yarıya düşmüştür; yalnızca çözünen O_{2} (0,0031 × P_{a}O_{2}) artışı derin anemiyi tek başına kompanse edemez.',
  ],
};

export const OXYGEN_REFERENCES: OxygenReference[] = [
  {
    authors: "O'Driscoll BR, Howard LS, Earis J, Mak V; British Thoracic Society.",
    title: 'BTS Guideline for oxygen use in adults in healthcare and emergency settings.',
    detail: 'Thorax. 2017;72(Suppl 1):ii1–ii90.',
  },
  {
    authors: 'Oczkowski S, Ergan B, Bos L, et al.',
    title: 'ERS clinical practice guidelines: high-flow nasal cannula in acute respiratory failure.',
    detail: 'Eur Respir J. 2022;59(4):2101574.',
  },
  {
    authors: 'ICU-ROX Investigators (Mackle D et al.) & HOT-ICU Trial (Schjørring OL et al.).',
    title: 'Conservative vs. liberal oxygenation targets in mechanically ventilated & hypoxemic ICU patients.',
    detail: 'N Engl J Med. 2020;382:989–998 & N Engl J Med. 2021;384:1301–1311.',
  },
  {
    authors: 'Hofmann R, James SK, Jernberg T, et al. (DETO2X-AMI Investigators).',
    title: 'Oxygen therapy in suspected acute myocardial infarction.',
    detail: 'N Engl J Med. 2017;377(13):1240–1249.',
  },
  {
    authors: 'Meyhoff CS, Wetterslev J, Jorgensen LN, et al. (PROXI Trial Group).',
    title: 'Effect of high perioperative oxygen fraction on surgical site infection and pulmonary complications after abdominal surgery.',
    detail: 'JAMA. 2009;302(14):1543–1550.',
  },
  {
    authors: 'Gropper MA, Eriksson LI, Fleisher LA, et al. / Lumb AB / Dorsch JA, Dorsch SE.',
    title: "Miller's Anesthesia (9th/10th ed.), Nunn's Applied Respiratory Physiology (9th ed.) & Understanding Anesthesia Equipment.",
    detail: 'Elsevier / Wolters Kluwer. (Oxygen Therapy, Boyle’s Law & Medical Gas Cylinders, Preoxygenation, Hypoxia & Hyperoxia).',
  },
  {
    authors: 'Jacobs SS, Krishnan JA, Lederer DJ, et al. (ATS Clinical Practice Guideline).',
    title: 'Home Oxygen Therapy for Adults with Chronic Lung Disease: An Official American Thoracic Society Clinical Practice Guideline.',
    detail: 'Am J Respir Crit Care Med. 2020;202(10):e121–e141.',
  },
  {
    authors: 'Hardinge M, Annandale J, Bourne S, et al. (British Thoracic Society) & GOLD Report.',
    title: 'BTS Guidelines for Home Oxygen Use in Adults & Global Strategy for Prevention, Diagnosis and Management of COPD.',
    detail: 'Thorax. 2015;70(Suppl 1):i1–i43 & GOLD 2024/2025.',
  },
  {
    authors: 'NOTT Group (1980), MRC Working Party (1981) & LOTT Research Group (2016).',
    title: 'Continuous vs. nocturnal oxygen therapy, domiciliary LTOT in hypoxic cor pulmonale, and LTOT in moderate desaturation.',
    detail: 'Ann Intern Med. 1980;93:391–398 · Lancet. 1981;1:681–686 · N Engl J Med. 2016;375:1617–1627.',
  },
];
