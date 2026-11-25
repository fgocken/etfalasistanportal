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
  subLabel?: string;
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
  tachypneaO2Flow: number;
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
      'BTS 2017 normoksemik (%94–98) hedefi önerir. Büyük YBÜ RKÇ’leri (ICU-ROX, HOT-ICU) liberal hiperoksinin mortalite/ventilatörsüz gün avantajı sağlamadığını göstermiştir; ancak LOCO2 (NEJM 2020) ARDS’de aşırı konservatif (SpO_{2} %88–92 / P_{a}O_{2} 55–70 mmHg) hedefin mezenterik iskemi riskini artırdığını ortaya koymuştur.',
    avoid: 'Hem gereksiz hiperoksiden (P_{a}O_{2} > 150–200 mmHg) hem de hiperkapni riski olmayan ARDS/sepsis hastasında aşırı konservatif SpO_{2} < %92 hedeflerinden kaçın.',
    severity: 'normal',
  },
  {
    id: 'hypercapnic-risk',
    label: 'Hiperkapnik Solunum Yetmezliği Riski (KOAH, OHS, Nöromüsküler)',
    targetSpo2: '%88 – %92 (AKG’ye göre güncelle)',
    initialDevice: 'Ventüri maskesi (%24 @ 2–3 L/dk veya %28 @ 4 L/dk) ya da 1–2 L/dk nazal kanül',
    initialFio2: '%24 – %28 ile başla · SS > 30/dk ise Ventüri O_{2} akımını %50 artır',
    rationale:
      'Kontrolsüz yüksek FiO_{2}; HPV baskılanmasına bağlı \\dot{V}/\\dot{Q} uyumsuzluğunu artırır, Haldane etkisiyle Hb’den CO_{2} salınımını tetikler ve hipoksik dürtüyü kısmen azaltır. BTS 2017 Tablo 4: AKG’de P_{a}CO_{2} normal çıkarsa (ve önceki NIV/IMV öyküsü yoksa) hedef %94–98’e çıkarılır ve 30–60 dk sonra kontrol AKG alınır.',
    avoid: 'Ciddi hipoksemi varsa oksijeni ANİDEN kesme (rebound hipoksemi ölüme yol açar!); hedef %88–92 kalacak şekilde kademeli azalt ve respiratuvar asidoz (pH < 7,35 + P_{a}CO_{2} > 45 mmHg) sürerse NIV’ye geç.',
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
    id: 'acs-stroke',
    label: 'Akut Koroner Sendrom (MI) & Akut İnme',
    targetSpo2: '%94 – %98 (Normoksemide O_{2} VERME!)',
    initialDevice: 'Yalnızca hipoksemi varsa (ESC AKS: SpO_{2} < %90 · BTS: < %94) nazal kanül 2–4 L/dk',
    initialFio2: 'Normoksemik hastada oda havası (%21)',
    rationale:
      'DETO2X-AMI (NEJM 2017) normoksemik MI hastasında rutin O_{2}’nin mortaliteyi azaltmadığını, AVOID (Circulation 2015) koroner vazokonstriksiyonla infarkt alanını artırabileceğini ve SO2S (JAMA 2017) akut inmede rutin O_{2}’nin nörolojik fayda sağlamadığını kanıtlamıştır.',
    avoid: 'SpO_{2} ≥ %94 olan göğüs ağrılı MI veya akut inme hastasına alışkanlıkla rutin yüksek akım oksijen maskesi takma.',
    severity: 'normal',
  },
  {
    id: 'co-poisoning',
    label: 'Karbonmonoksit (CO) / Siyanür & MetHb Ayrımı',
    targetSpo2: 'Standart SpO_{2} Güvenilmez! → CO/Siyanürde %100 O_{2}',
    initialDevice: 'Sıkı oturan NRBM (15 L/dk) veya Entübe ise FiO_{2} 1,00 (gerekirse HBOT)',
    initialFio2: '%100 (Kesin tanı: KO-oksimetri)',
    rationale:
      'Standart 2 dalga boylu pulse oksimetre (660/940 nm) COHb’yi oksihemoglobinden ayıramayıp SpO_{2}’yi yalancı normal/yüksek (%98–100) okurken, MetHb’de iki dalga boyu eşit absorbe edildiğinden SpO_{2} oksijene dirençli ~%85 (%82–88) platosuna sabitlenir. %100 O_{2}, COHb yarı ömrünü ~4–6 saatten ~60–90 dk’ya indirir.',
    avoid: 'CO zehirlenmesinde SpO_{2} %99 diye oda havasına alma; MetHb’de ~%85 görünümünü basit hipoksemi sanma — mutlaka KO-oksimetri (COHb / MetHb %) iste (MetHb tedavisi: Metilen mavisi).',
    severity: 'critical',
  },
  {
    id: 'bleomycin-paraquat',
    label: 'Bleomisin Akciğer Hasarı veya Parakuat Zehirlenmesi',
    targetSpo2: '%85 – %88 (BTS 2017 Öneri F16 · Hipoksemi yoksa O_{2} VERME)',
    initialDevice: 'Oda havası (%21); yalnızca SpO_{2} < %85 ise düşük akım nazal kanül / %24 Ventüri',
    initialFio2: 'Mümkün olan en düşük FiO_{2} (Hedef SpO_{2} %85 – %88)',
    rationale:
      'BTS 2017 Öneri F16: Bleomisin ve parakuat, yüksek FiO_{2} varlığında akciğerde süperoksit/hidroksil radikalleri üretimini katlayarak geri dönüşsüz interstisyel fibrozis ve ağır ARDS tetikler. Hipoksemi gelişmedikçe ek oksijen verilmez; gerekirse %85–88 aralığında tutulur.',
    avoid: 'Anestezi indüksiyonu veya serviste rutin %100 O_{2} / > %92 hedefinden kesinlikle kaçın (yalnızca hayatı tehdit eden desatürasyonda %85–88’e titre et).',
    severity: 'caution',
  },
  {
    id: 'airway-fire',
    label: 'Havayolu / Baş-Boyun Cerrahisinde Yangın Riski (Koter / Lazer)',
    targetSpo2: 'Güvenli minimum (Genellikle %90 – %95)',
    initialDevice: 'Tıbbi hava ile seyreltilmiş kapalı devre (FiO_{2} < 0,30) veya lazer dirençli ETT',
    initialFio2: '< %30 (N_{2}O KESİNLİKLE YASAK)',
    rationale:
      'Yangın üçgeni: Oksidan (O_{2} ve ekzotermik ayrışan N_{2}O!) + Yakıt (gazlı bez, ETT, alkol antiseptik) + Isı/Kıvılcım (koter, lazer). ASA Yangın Rehberi: FiO_{2} < %30’a indirildikten sonra koter öncesi ≥ 1–3 dk beklenmeli, örtü altında biriken O_{2} süpürülmeli ve lazer ETT kafı hava yerine metilen mavili salinle şişirilmelidir.',
    avoid: 'T4 seviyesi üzerinde açık O_{2} (> %30) / N_{2}O veya HFNC/THRIVE altında koter/lazer kullanma; alkollü antiseptik ≥ 3 dk tamamen kurumadan ateşleme yapma.',
    severity: 'critical',
  },
  {
    id: 'pregnancy-pneumothorax',
    label: 'Gebelik / Obstetrik Acil & Gözlemdeki Pnömotoraks',
    targetSpo2: 'Gebelik: %94 – %98 (Acilde ≥ %95) · Pnömotoraks: Yüksek O_{2}',
    initialDevice: 'Gebelik: sol lateral tilt + titre O_{2} · Drene edilmeyen pnömotoraks (BTS F6): NRBM 15 L/dk',
    initialFio2: 'Elektif normoksemik sezaryende %21 · Pnömotoraks gözleminde %100',
    rationale:
      'BTS 2017 H1–H4: Normoksemik gebede (elektif sezaryen dahil) rutin profilaktik yüksek FiO_{2} fetal asidozu düzeltmez ve oksidatif stres yaratabilir; yalnızca maternal hipoksemide %94–98 hedeflenir. Drene edilmeden gözlenen pnömotoraksta (hiperkapni riski yoksa, BTS F6) 15 L/dk NRBM plevral azot washout hızını ~4 kat artırır.',
    avoid: 'Normoksemik elektif sezaryende körü körüne yüksek akım O_{2} verme; hiperkapnik KOAH’lı sekonder pnömotoraksta kontrolsüz 15 L/dk NRBM uygulama.',
    severity: 'caution',
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
      '×10 çarpanı, C_{a}O_{2} birimi olan dL’yi (100 mL), kalp debisi (CO) birimi olan L’ye (1000 mL) eşitlemek içindir. DO_{2}’nin üç temel ayağı vardır: Kalp Debisi (CO), Hemoglobin (Hb) ve S_{a}O_{2}. Ağır anemide (ör. Hb 5 g/dL) SpO_{2} %100 olsa bile C_{a}O_{2} üçte bire düştüğünden yalnızca FiO_{2} artırmak doku hipoksisini düzeltemez.',
  },
  {
    name: 'Oksijen Tüketimi (VO_{2} · Fick İlkesi) ve Ekstraksiyon Oranı (O_{2}ER)',
    equation: 'VO_{2} = CO × (C_{a}O_{2} − C_{\\bar{v}}O_{2}) × 10   |   O_{2}ER = VO_{2} / DO_{2}',
    normalValue: 'VO_{2} ≈ 250 mL/dk (~3,5 mL/kg/dk)  ·  O_{2}ER ≈ %25  ·  S_{\\bar{v}}O_{2} ≈ %70–75',
    clinicalNote:
      'İstirahatte dokular gelen oksijenin yalnızca ~%25’ini kullanır (4:1 güvenlik rezervi). DO_{2} düştüğünde dokular O_{2}ER’yi %50–60’a çıkararak VO_{2}’yi korur ("sunumdan bağımsız faz"). İnsan verilerinde kritik eşik olan DO_{2krit} (~4–5 mL/kg/dk veya ~280–350 mL/dk) altına inildiğinde ekstraksiyon artık artamaz, VO_{2} sunuma bağımlı düşer ve laktik asidoz başlar.',
  },
  {
    name: 'Ventüri Hava:O_{2} Sürüklenme Oranı ve Transfer O_{2} Tüpü Süresi',
    equation: 'Hava : O_{2} = (1 − FiO_{2}) / (FiO_{2} − 0,21)   |   Süre (dk) = Su Hacmi (L) × (P_{bar} − P_{rezerv}) / Akım',
    normalValue: 'Önerilen emniyet rezervi = 20 bar  ·  2 L @ 150 bar ve 6 L/dk → 2 × 130 / 6 ≈ 43 dk',
    clinicalNote:
      'Boyle Yasasına (P_{1}V_{1} = P_{2}V_{2}) göre silindirin içindeki kullanılabilir gaz hacmi su hacmi (TR portatif transport: 2–3–5–10 L, 150 veya 200 bar dolum) ile kalan basınç farkının çarpımıdır. Pnömatik transport ventilatörlerinin ek sürüş gazı (drive gas) tüketimi unutulmamalıdır.',
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
    humidification: 'Rutin soğuk kabarcıklı nemlendirici önerilmez (BTS 2017 · kontaminasyon riski); uzun süreli yüksek akımda ısıtmalı sistem',
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
    humidification: 'Rutin soğuk nemlendirici gerekmez; uzun süreli/koyu sekresyonda ısıtmalı nemlendirme',
    mechanismNote:
      'Maske içi (~100–200 mL) ek oksijen rezervuarı sağlar; yan deliklerden hem ekspirasyon gazı çıkar hem oda havası sürüklenir.',
    clinicalPearls:
      'NEVER EVENT UYARISI: Akım 5 L/dk’nın altında bırakılırsa ekspiratuvar CO_{2} maskeden yıkanamaz ve hasta kendi CO_{2}’sini geri solur (rebreathing)!',
  },
  {
    device: 'Rezervuarlı Maske (NRBM — Geri Solumasız)',
    category: 'Düşük Akım (Değişken)',
    subLabel: 'Rezervuarlı · Değişken Performans',
    flowRange: '10 – 15 L/dk (Torba sönmemeli!)',
    fio2Range: '~ %60 – %85 (ideal sızdırmazlıkta ~%90)',
    humidification: 'Acil kısa süreli kullanım (nemlendiricisiz)',
    mechanismNote:
      'Altında tek yönlü valfli 600–1000 mL rezervuar torbası + yan ekspiratuvar valfler bulunur. İnspirasyonda hasta torbadan yüksek O_{2} çeker (PIFR çok yüksekse yan kaçaktan oda havası karışır).',
    clinicalPearls:
      'Maske hastaya takılmadan önce valf parmakla kapatılıp torba TAM şişirilmelidir. İnspirasyonda torba 1/3’ten fazla sönüyorsa akım yetmiyordur (15 L/dk’ya çık). Hiperkapnik KOAH’ta risklidir.',
  },
  {
    device: 'Ventüri Maskesi (HAFOE — Sabit Performanslı)',
    category: 'Yüksek Akım (Sabit)',
    flowRange: 'O_{2}: 2–15 L/dk · Toplam Gaz: 30–100+ L/dk',
    fio2Range: '%24 · %28 · %31 · %35 · %40 · %60 (Kesin)',
    humidification: 'Uzun süreli yüksek akımda / trakeostomide aktif ısıtmalı nemlendirme adaptörü',
    mechanismNote:
      'Bernoulli basınç düşüşü + jet sürüklenmesi (dar orifisten geçen yüksek hızlı O_{2} jeti sabit oranda oda havası sürükler). Toplam gaz akımı hastanın PIFR’sini (30–50 L/dk) aştığı için FiO_{2} solunum hızından bağımsız sabit kalır.',
    clinicalPearls:
      'KOAH/hiperkapnide altın standarttır. BTS 2017 Kuralı: Solunum hızı > 30/dk ise O_{2} akımını adaptör minimumunun %50 üzerine çıkarın — FiO_{2} DEĞİŞMEZ, toplam akım artarak PIFR’yi karşılar! %60 yeşil adaptör (~30 L/dk) ağır dispnede yetersiz kalabilir.',
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
      'Tip 1 hipoksemide konvansiyonel O_{2}’den üstündür (ERS 2022). ROX İndeksi = (SpO_{2} / FiO_{2}[ondalık]) / SS: ≥ 4,88 başarı göstergesi; entübasyon riski eşikleri → 2. sa < 2,85 · 6. sa < 3,47 · 12. sa < 3,85 (Roca 2019).',
  },
  {
    device: 'Balon-Valf-Maske (BVM / Ambu)',
    category: 'Resüsitasyon / Devre',
    subLabel: 'Tek Yönlü Valf · Kendiliğinden Şişen',
    flowRange: '12 – 15 L/dk (+ PEEP Valfi 5–10 cmH_{2}O)',
    fio2Range: 'Rezervuarsız ~%40–50 · Rezervuarlı ~%90–100',
    humidification: 'Acil kısa süreli resüsitasyon',
    mechanismNote:
      'Tek yönlü (non-rebreathing) valf ve O_{2} rezervuar torbası sayesinde pozitif basınçlı ventilasyonla %90–100 O_{2} sağlar; gaz kaynağı kesilse dahi oda havasıyla kendini şişirebilir.',
    clinicalPearls:
      'Spontan soluyan hastada kendi kendine açılmayan BVM valfi inspiratuvar direnci artırır (preoksijenasyonda düşük performans); bu nedenle spontan preoksijenasyonda anestezi devresi (FGF ≥ 10 L/dk + APL sıfır) veya NIV/CPAP daha etkilidir.',
  },
  {
    device: 'Mapleson C (Waters Devresi)',
    category: 'Resüsitasyon / Devre',
    subLabel: 'Akımla Şişen · Yarı Açık Geri Solumalı',
    flowRange: 'FGF ≥ 10–15 L/dk (≥ 2–3 × Dakika Ventilasyonu)',
    fio2Range: 'Taze gaz akımı yeterliyse ~%90–100',
    humidification: 'Acil / transfer / PACU kısa süreli kullanım',
    mechanismNote:
      'BVM’den farklı olarak tek yönlü (non-rebreathing) valf İÇERMEZ; akımla şişen (flow-inflating) yarı açık devredir ve basınç/PEEP APL valfiyle elle hissedilerek ayarlanır.',
    clinicalPearls:
      'KRİTİK GÜVENLİK: Taze gaz akımı (FGF) yetersizse hızla CO_{2} geri solunumu (rebreathing) gelişir ve O_{2} kaynağı kesilirse balon şişmez — transferde mutlaka yedek BVM bulundurulmalıdır.',
  },
];

export const VENTURI_ADAPTER_SPECS: VenturiAdapterSpec[] = [
  {
    fio2: 24,
    colorName: 'Mavi',
    swatchHex: '#2563eb',
    minO2Flow: 2,
    tachypneaO2Flow: 3,
    airToO2Ratio: '25,3 : 1',
    totalFlowAtMin: 53,
    clinicalUse: 'Ağır KOAH / Tip 2 solunum yetmezliği başlangıç titrasyonu (SpO_{2} hedef %88–92)',
  },
  {
    fio2: 28,
    colorName: 'Beyaz',
    swatchHex: '#cbd5e1',
    minO2Flow: 4,
    tachypneaO2Flow: 6,
    airToO2Ratio: '10,3 : 1',
    totalFlowAtMin: 45,
    clinicalUse: 'KOAH standart başlangıç veya %24 yanıt vermeyen hiperkapnik hasta',
  },
  {
    fio2: 31,
    colorName: 'Turuncu',
    swatchHex: '#ea580c',
    minO2Flow: 6,
    tachypneaO2Flow: 9,
    airToO2Ratio: '6,9 : 1',
    totalFlowAtMin: 47,
    clinicalUse: 'Orta dereceli kontrollü FiO_{2} artışı gereken kronik akciğer hastaları',
  },
  {
    fio2: 35,
    colorName: 'Sarı',
    swatchHex: '#eab308',
    minO2Flow: 8,
    tachypneaO2Flow: 12,
    airToO2Ratio: '4,6 : 1',
    totalFlowAtMin: 45,
    clinicalUse: 'Post-ekstübasyon kontrollü oksijenasyon veya orta hipoksemi',
  },
  {
    fio2: 40,
    colorName: 'Kırmızı',
    swatchHex: '#dc2626',
    minO2Flow: 10,
    tachypneaO2Flow: 15,
    airToO2Ratio: '3,2 : 1',
    totalFlowAtMin: 42,
    clinicalUse: 'Tip 1 hipoksemide stabil FiO_{2} sağlama (SS > 30/dk ise 15 L/dk ile ~62 L/dk toplam akım)',
  },
  {
    fio2: 60,
    colorName: 'Yeşil',
    swatchHex: '#16a34a',
    minO2Flow: 15,
    tachypneaO2Flow: 15,
    airToO2Ratio: '1,0 : 1',
    totalFlowAtMin: 30,
    clinicalUse: 'Yüksek FiO_{2} gerektiren hipoksemi (Dikkat: toplam akım 30 L/dk olduğundan ağır dispnede PIFR altında kalır → HFNC/NIV düşün!)',
  },
];

export const SPECIAL_SITUATIONS: SpecialSituationItem[] = [
  {
    title: 'Preoksijenasyon (Denitrojenasyon) & PREOXI (NEJM 2024)',
    target: 'FeO_{2} > %85 – %90 (EtO_{2} takibi) · Kritik hastada NIV/BiPAP',
    mechanism:
      'Normalde FRC’nin (%79) ~2.000 mL’sini azot oluşturur. Sıkı oturan maske + %100 O_{2} (FGF ≥ 10 L/dk) ile 3 dk normal tidal solunum veya 60 sn’de 8 derin vital kapasite nefesi FRC’yi oksijenle doldurur; sağlıklı erişkinde güvenli apne süresi (SpO_{2} > %90) ~1–2 dk’dan ~6–8 dk’ya çıkar.',
    action:
      'Obez, gebe ve hipoksemik kritik hastalarda (FRC ↓, VO_{2} ↑) 20–25° baş yukarı (ramped) pozisyon + NIV/CPAP (5–10 cmH_{2}O) tercih edilir. PREOXI RKÇ (NEJM 2024, n=1.301): Acil entübasyonda NIV preoksijenasyonu hipoksemiyi maskeye göre yarıya indirdi (%9,1 vs %18,5) ve aspirasyonu artırmadı.',
  },
  {
    title: 'Apneik Oksijenasyon (NODESAT / THRIVE)',
    target: 'Laringoskopide 10–15 L/dk nazal O_{2} (veya 50–70 L/dk HFNC/THRIVE)',
    mechanism:
      'Apnede alveolden kana geçen O_{2} (~250 mL/dk), kandan alveole geçen CO_{2}’den (~20–40 mL/dk; doku/kanda tamponlandığı için) çok fazla olduğundan alveoler basınç hafif negatifleşir ve farenksteki oksijen pasif kütle akımıyla aşağı çekilir.',
    action:
      'KRİTİK SINIRLAR: Havayolu açıklığı şarttır (çene itme / airway)! P_{a}CO_{2} ilk dakikada ~6–12 mmHg, sonraki her dakikada ~3–5 mmHg yükselir (uzamış THRIVE olgularında TcCO_{2}/AKG izlemi şarttır; KİB/asidozda dikkat). HFNC/THRIVE lazer ve koter cerrahisinde yangın riski nedeniyle KONTRENDİKEDİR.',
  },
  {
    title: 'İntraoperatif Yüksek FiO_{2} (%80 vs %30–40) Tartışması',
    target: 'İdamede rutin %30 – %40 FiO_{2} + PEEP (Normoksemi)',
    mechanism:
      'WHO 2016 rehberi SSI azaltımı için %80 FiO_{2}’yi güçlü önerse de 2018’de öneriyi "koşullu"ya düşürdü. PROXI (JAMA 2009), Kurz (Lancet 2018, n=5.749) ve akciğer koruyucu ventilasyon kullanan iPROVE-O2 (Lancet Respir Med 2020, n=717) %80 FiO_{2} ile SSI azalması göstermedi; McIlroy (BMJ 2022, n=350.647) suprafizyolojik FiO_{2}’yi AKI, miyokard ve akciğer hasarı artışıyla ilişkilendirdi.',
    action:
      'İndüksiyon ve ekstübasyon öncesi preoksijenasyon dışında idame anestezi sırasında normoksemi (SpO_{2} %94–98) sağlayacak en düşük FiO_{2} (%30–40) + bireyselleştirilmiş PEEP tercih edilir.',
  },
  {
    title: 'Ekstübasyon Sonrası & PACU Hipoksemisi (Difüzyon Hipoksisi)',
    target: 'N_{2}O kullanıldıysa kesim sonrası en az 3–5 dk %100 O_{2} + EtCO_{2} izlemi',
    mechanism:
      'N_{2}O kan:gaz erirliği azottan ~30 kat yüksek olduğu için kesildiği anda kandan alveole hızla boşalır; alveoler O_{2} ve CO_{2}’yi seyreltir (Fink difüzyon hipoksisi). PACU hipoksemisinin diğer ana nedenleri rezidüel NMB, opioid solunum depresyonu ve FRC kaybına bağlı atelektazidir.',
    action:
      'Körü körüne tüm ekstübasyonlarda yüksek FiO_{2} + sıfır PEEP yerine klinik riske göre titre et; yüksek FiO_{2} altında ciddi hiperkapni maskelenebileceğinden sedasyon/opioid riskli PACU hastasında kapnografi (EtCO_{2}) ile ventilasyon doğrulanmalıdır.',
  },
];

export const OXYGEN_SAFETY_CHECKLIST = {
  neverEvents: [
    'Basit yüz maskesinde O_{2} akımının < 5 L/dk bırakılması → maske ölü boşluğunda CO_{2} birikimi (rebreathing) ve hiperkapnik asidoz.',
    'CO zehirlenmesinde yalancı normal/yüksek (%98–100) SpO_{2} görünümüne güvenip %100 O_{2}’yi kesmek veya MetHb’de oksijene dirençli ~%85 SpO_{2} platosunu basit hipoksemi sanıp KO-oksimetri istememek.',
    'Baş-boyun, orofarenks veya trakeostomi cerrahisinde açık O_{2} (> %30), N_{2}O veya HFNC/THRIVE altında koter/lazer kullanılması (Ameliyathane Havayolu Yangını!).',
    'Yedek silindiri (veya manometre basıncını) kontrol etmeden entübe/hipoksemik hastayı O_{2} tüpüyle transfere çıkarmak ya da Mapleson C devresini düşük FGF / yedek BVM olmadan kullanmak.',
    'PISS (Pin Index Safety System) ve DISS bağlantıları zorlayarak veya hasarlı adaptörle yanlış medikal gaz vermek.',
  ],
  boardTraps: [
    'KOAH’ta oksijen kaynaklı hiperkapninin EN BÜYÜK nedeni "hipoksik dürtü baskılanması" değil, HPV inhibisyonuna bağlı \\dot{V}/\\dot{Q} uyumsuzluğu artışı (%50–70) + Haldane etkisidir (%25–30)!',
    'Yüksek FiO_{2} altında normokapnik hastada SpO_{2} %99 iken bile ciddi hipoventilasyon ve P_{a}CO_{2} > 70 mmHg gelişebilir — SpO_{2} bir VENTİLASYON monitörü değildir!',
    'Ventüri maskesinde solunum hızı > 30/dk olduğunda O_{2} akımını %50 artırmak FiO_{2}’yi YÜKSELTMEZ; yalnızca toplam gaz akımını artırarak PIFR’yi karşılar.',
    'Boyle Yasası yalnızca sıkıştırılmış gaz fazındaki O_{2} (kritik ısı −118,6 °C) için geçerlidir; N_{2}O (+36,5 °C) tüp içinde sıvı+gaz bulunduğundan basınç (~44–51 bar) sıvı bitene kadar sabit kalır ve kalan miktar TARTILARAK bulunur!',
    'Ağır anemide (Hb = 5 g/dL) SpO_{2} %100 ve P_{a}O_{2} = 500 mmHg olsa bile çözünen O_{2} yalnızca ~1,5 mL/dL ekler; C_{a}O_{2} hâlâ ~8,2 mL/dL (normalin %40’ı) düzeyindedir!',
  ],
};

export const OXYGEN_REFERENCES: OxygenReference[] = [
  {
    authors: "O'Driscoll BR, Howard LS, Earis J, Mak V; British Thoracic Society.",
    title: 'BTS Guideline for oxygen use in adults in healthcare and emergency settings.',
    detail: 'Thorax. 2017;72(Suppl 1):ii1–ii90.',
  },
  {
    authors: 'Oczkowski S, Ergan B, Bos L, et al. & Roca O, Caralt B, Messika J, et al.',
    title: 'ERS clinical practice guidelines: HFNC in acute respiratory failure & ROX Index validation.',
    detail: 'Eur Respir J. 2022;59(4):2101574 · Am J Respir Crit Care Med. 2019;199(11):1368–1376.',
  },
  {
    authors: 'ICU-ROX (Mackle D, 2020), LOCO2 (Barrot L, 2020) & HOT-ICU (Schjørring OL, 2021).',
    title: 'Conservative vs. liberal oxygenation targets in ICU and ARDS patients.',
    detail: 'N Engl J Med. 2020;382:989–998 · 2020;382:999–1008 · 2021;384:1301–1311.',
  },
  {
    authors: 'Gibbs KW, Semler MW, Driver BE, et al. (PREOXI Trial Investigators).',
    title: 'Noninvasive Ventilation for Preoxygenation during Emergency Intubation.',
    detail: 'N Engl J Med. 2024;390(23):2165–2177. (PMID 38869091).',
  },
  {
    authors: 'Hofmann R (DETO2X-AMI), Stub D (AVOID) & Roffe C (SO2S).',
    title: 'Routine oxygen therapy in suspected acute myocardial infarction and acute stroke.',
    detail: 'N Engl J Med. 2017;377:1240–1249 · Circulation. 2015;131:2143–2150 · JAMA. 2017;318:1125–1135.',
  },
  {
    authors: 'Meyhoff CS (PROXI), Kurz A (Lancet 2018), Ferrando C (iPROVE-O2) & McIlroy DR (BMJ 2022).',
    title: 'Perioperative high vs. low FiO_{2}: surgical site infection, atelectasis, and postoperative organ injury.',
    detail: 'JAMA. 2009;302:1543–1550 · Lancet. 2018 · Lancet Respir Med. 2020 · BMJ. 2022;379:e070941.',
  },
  {
    authors: 'Apfelbaum JL, Caplan RA, Barker SJ, et al. (ASA Task Force on Operating Room Fires).',
    title: 'Practice Advisory for the Prevention and Management of Operating Room Fires.',
    detail: 'Anesthesiology. 2013;118(2):271–290.',
  },
  {
    authors: 'Gropper MA, Eriksson LI, Fleisher LA, et al. / Lumb AB / Dorsch JA, Dorsch SE.',
    title: "Miller's Anesthesia (9th/10th ed.), Nunn's Applied Respiratory Physiology (9th ed.) & Understanding Anesthesia Equipment.",
    detail: 'Elsevier / Wolters Kluwer. (Oxygen Delivery, ODC/P50, Boyle’s Law & Medical Gas Cylinders, Preoxygenation).',
  },
  {
    authors: 'Jacobs SS, Krishnan JA, Lederer DJ, et al. (ATS) · Hardinge M (BTS) · GOLD Report.',
    title: 'Home Oxygen Therapy for Adults with Chronic Lung Disease & Global Strategy for COPD.',
    detail: 'Am J Respir Crit Care Med. 2020;202(10):e121–e141 · Thorax. 2015;70(Suppl 1):i1–i43 · GOLD 2024/2025.',
  },
  {
    authors: 'NOTT Group (1980), MRC Working Party (1981) & LOTT Research Group (2016).',
    title: 'Continuous vs. nocturnal oxygen therapy, domiciliary LTOT in hypoxic cor pulmonale, and LTOT in moderate desaturation.',
    detail: 'Ann Intern Med. 1980;93:391–398 · Lancet. 1981;1:681–686 · N Engl J Med. 2016;375:1617–1627.',
  },
];
