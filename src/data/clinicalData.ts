import { LabParameter, DrugMonograph, EmergencyProtocol, ClinicContact } from '../types/clinical';

export const LAB_PARAMETERS: LabParameter[] = [
  // Mor Tüp - EDTA (Hemogram)
  {
    id: 'wbc',
    name: 'WBC (Lökosit)',
    nameTr: 'Beyaz Kan Hücresi / Lökosit',
    tube: 'purple',
    tubeLabel: 'Mor Kapak (EDTA)',
    referenceRange: '4.0 - 10.5',
    unit: 'x10³/µL',
    clinicalSignificance: 'Enfeksiyon, enflamasyon ve kemik iliği yanıtı göstergesi.',
    highCauses: ['Bakteriyel enfeksiyonlar', 'Doku nekrozu/travma', 'Lösemi/Miyeloproliferatif hastalıklar', 'Kortikosteroid kullanımı', 'Şiddetli fiziksel/duygusal stres'],
    lowCauses: ['Viral enfeksiyonlar (Hepatit, İnfluenza, HIV)', 'Kemoterapi/Radyoterapi', 'Kemik iliği yetmezliği (Aplastik anemi)', 'Otoimmün hastalıklar (SLE)', 'B12/Folat eksikliği']
  },
  {
    id: 'hb',
    name: 'Hemoglobin (Hb)',
    nameTr: 'Hemoglobin',
    tube: 'purple',
    tubeLabel: 'Mor Kapak (EDTA)',
    referenceRange: 'Erkek: 13.5 - 17.5 | Kadın: 12.0 - 15.5',
    unit: 'g/dL',
    clinicalSignificance: 'Oksijen taşıma kapasitesi ve anemi değerlendirmesi.',
    highCauses: ['Polisitemi (Vera veya Sekonder)', 'Kronik hipoksemi (KOAH, yüksek irtifa)', 'Dehidrasyon (Hemokonsantrasyon)', 'Sigara kullanımı'],
    lowCauses: ['Demir eksikliği anemisi', 'Kronik hastalık anemisi', 'Akut veya kronik kan kaybı', 'Hemolitik anemiler', 'Malnutrisyon / Hemodilüsyon']
  },
  {
    id: 'plt',
    name: 'Trombosit (PLT)',
    nameTr: 'Trombosit Sayısı',
    tube: 'purple',
    tubeLabel: 'Mor Kapak (EDTA)',
    referenceRange: '150 - 450',
    unit: 'x10³/µL',
    clinicalSignificance: 'Primer hemostaz ve pıhtılaşma güvenliği (<50k kanama riski artar, <20k spontan kanama riski).',
    highCauses: ['Reaktif trombositoz (enfeksiyon, cerrahi sonrası, demir eksikliği)', 'Esansiyel trombositemi', 'Splenektomi sonrası', 'Malignite'],
    lowCauses: ['İmmün trombositopeni (ITP)', 'İlaca bağlı (Heparin - HIT, antibiyotikler)', 'Sepsis / DİK', 'Hipersplenizm', 'Kemik iliği süpresyonu']
  },
  {
    id: 'mcv',
    name: 'MCV',
    nameTr: 'Ortalama Eritrosit Hacmi',
    tube: 'purple',
    tubeLabel: 'Mor Kapak (EDTA)',
    referenceRange: '80 - 100',
    unit: 'fL',
    clinicalSignificance: 'Anemi ayırıcı tanısında eritrosit boyutu (Mikrositer / Normositer / Makrositer).',
    highCauses: ['B12 veya Folat eksikliği', 'Alkol kullanımı', 'Karaciğer hastalığı', 'Hipotiroidizm', 'Miyelodisplastik sendrom'],
    lowCauses: ['Demir eksikliği anemisi', 'Talasemi taşıyıcılığı/hastalığı', 'Sideroblastik anemi', 'Kurşun zehirlenmesi']
  },

  // Sarı / Kırmızı Tüp (Biyokimya)
  {
    id: 'creatinine',
    name: 'Kreatinin',
    nameTr: 'Serum Kreatinin',
    tube: 'yellow',
    tubeLabel: 'Sarı Kapak (Jelli Biyokimya)',
    referenceRange: 'Erkek: 0.7 - 1.2 | Kadın: 0.5 - 1.0',
    unit: 'mg/dL',
    clinicalSignificance: 'Böbrek fonksiyonu ve glomerüler filtrasyon takibi. Kas kütlesi ile ilişkilidir.',
    highCauses: ['Akut Böbrek Hasarı (Prerenal, Renal, Postrenal)', 'Kronik Böbrek Yetmezliği', 'Rabdomiyoliz', 'Şiddetli dehidrasyon', 'Nefrotoksik ilaçlar (NSAİİ, Aminoglikozit, Kontrast)'],
    lowCauses: ['Düşük kas kütlesi (Kaşeksi, amputasyon, immobilizasyon)', 'Gebelikte artmış GFR', 'Şiddetli karaciğer yetmezliği']
  },
  {
    id: 'bun_urea',
    name: 'Üre (BUN)',
    nameTr: 'Serum Üre / Kan Üre Azotu',
    tube: 'yellow',
    tubeLabel: 'Sarı Kapak (Jelli Biyokimya)',
    referenceRange: 'Üre: 15 - 45 (BUN: 7 - 20)',
    unit: 'mg/dL',
    clinicalSignificance: 'Protein metabolizması ve renal klirens. Üre/Kreatinin oranı prerenal azotemi ayrımında kıymetlidir (>20:1).',
    highCauses: ['Üst GİS kanaması (barsakta protein yıkımı)', 'Dehidrasyon / Hipovolemi', 'Yüksek proteinli diyet', 'Renal yetmezlik', 'Katabolik durumlar'],
    lowCauses: ['Şiddetli karaciğer yetmezliği', 'Yetersiz protein alımı / Malnutrisyon', 'Aşırı hidrasyon']
  },
  {
    id: 'glucose',
    name: 'Açlık Glukozu',
    nameTr: 'Açlık Kan Şekeri (AKŞ)',
    tube: 'yellow',
    tubeLabel: 'Sarı Kapak (Jelli Biyokimya)',
    referenceRange: '70 - 100 (Açlık)',
    unit: 'mg/dL',
    clinicalSignificance: 'Karbonhidrat metabolizması. Hipoglisemi (<70 mg/dL) ve Diyabet tanısı/takibi.',
    highCauses: ['Diabetes Mellitus', 'Kortikosteroid tedavisi', 'Akut stres yanıtı (sepsis, travma, MI)', 'Cushing sendromu', 'Pankreatit'],
    lowCauses: ['Aşırı insülin / OAD dozu', 'Uzamış açlık / Malnutrisyon', 'İnsülinoma', 'Şiddetli karaciğer hastalığı', 'Adrenal yetmezlik (Addison)']
  },
  {
    id: 'potassium',
    name: 'Potasyum (K+)',
    nameTr: 'Serum Potasyum',
    tube: 'yellow',
    tubeLabel: 'Sarı Kapak (Jelli Biyokimya)',
    referenceRange: '3.5 - 5.1',
    unit: 'mEq/L (mmol/L)',
    clinicalSignificance: 'Kardiyak membran potansiyeli ve ritim regülasyonu. Kritik değerler (<3.0 veya >6.0 fatal aritmi riski). Hemolizli örnekte sahte yüksek çıkabilir!',
    highCauses: ['Akut/Kronik böbrek yetmezliği', 'Hemolizli numune (laboratuvara tekrar sor)', 'Asidoz (hücre dışına kaçış)', 'Doku yıkımı / Yanık / Rabdomiyoliz', 'ACE inhibitörleri / ARB / Spironolakton'],
    lowCauses: ['GİS kayıpları (İshal, kusma, nazogastrik drenaj)', 'Diüretikler (Furosemid, Tiyazid)', 'Alkaloz (hücre içine giriş)', 'İnsülin uygulaması', 'Magnezyum eksikliği']
  },
  {
    id: 'sodium',
    name: 'Sodyum (Na+)',
    nameTr: 'Serum Sodyum',
    tube: 'yellow',
    tubeLabel: 'Sarı Kapak (Jelli Biyokimya)',
    referenceRange: '135 - 145',
    unit: 'mEq/L (mmol/L)',
    clinicalSignificance: 'Ekstrasellüler osmolalite ve volüm dengesi. Hızlı düzeltmeler nörolojik komplikasyon (ODS / beyin ödemi) yaratabilir.',
    highCauses: ['Serbest su kaybı (Diyabetes İnsipidus, aşırı terleme)', 'Yetersiz sıvı alımı (özellikle yaşlı/bilinci kapalı)', 'Hipertonik salin verilmesi'],
    lowCauses: ['Uygunsuz ADH Sendromu (SIADH)', 'Diüretik kullanımı', 'Kalp yetmezliği / Siroz (hipervolemik hiponatremi)', 'Aşırı hipotonik sıvı infüzyonu', 'Psödohiponatremi (aşırı hiperglisemi/hiperlipidemi)']
  },
  {
    id: 'crp',
    name: 'C-Reaktif Protein (CRP)',
    nameTr: 'Serum CRP',
    tube: 'yellow',
    tubeLabel: 'Sarı Kapak (Jelli Biyokimya)',
    referenceRange: '0 - 5',
    unit: 'mg/L',
    clinicalSignificance: 'Akut faz reaktanı. Enflamatuvar, otoimmün ve enfeksiyöz olaylarda hızla yükselir.',
    highCauses: ['Bakteriyel enfeksiyonlar (genelde >50-100)', 'Sepsis', 'Akut miyokard enfarktüsü', 'Postoperatif dönem', 'Otoimmün alevlenmeler (RA, Vaskülit)'],
    lowCauses: ['Normal sağlıklı durum', 'Enfeksiyonun gerilemesi / tedaviye yanıt']
  },
  {
    id: 'ast_alt',
    name: 'ALT / AST',
    nameTr: 'Karaciğer Transaminazları',
    tube: 'yellow',
    tubeLabel: 'Sarı Kapak (Jelli Biyokimya)',
    referenceRange: 'ALT: 0 - 45 | AST: 0 - 35',
    unit: 'U/L',
    clinicalSignificance: 'Hepatosellüler hasar belirteçleri. ALT karaciğere daha spesifiktir. AST/ALT > 2 alkolik hepatitte sıktır.',
    highCauses: ['Viral / Toksik / İskemik hepatit (>1000 değerler)', 'İlaca bağlı karaciğer hasarı (Parasetamol vb.)', 'Safra yolları patolojileri', 'Non-alkolik yağlı karaciğer (NASH)', 'Rabdomiyoliz / Kas hasarı (özellikle AST)'],
    lowCauses: ['Klinik anlamı yoktur (normal varyant)']
  },

  // Mavi Tüp - Sitrat (Koagülasyon)
  {
    id: 'inr_pt',
    name: 'PT / INR',
    nameTr: 'Protrombin Zamanı ve INR',
    tube: 'blue',
    tubeLabel: 'Mavi Kapak (Sodyum Sitrat)',
    referenceRange: 'INR: 0.8 - 1.2 (Varfarin hedefi genelde 2.0 - 3.0)',
    unit: 'Oran',
    clinicalSignificance: 'Ekstrensek ve ortak pıhtılaşma yolu. Karaciğer sentez kapasitesi ve Varfarin takibi.',
    highCauses: ['Varfarin kullanımı', 'Karaciğer sirozu / yetmezliği', 'K vitamini eksikliği', 'Yaygın Damar İçi Pıhtılaşma (DİK)', 'Masif transfüzyon / Dilüsyonel koagülopati'],
    lowCauses: ['Tromboz riski veya hiperkoagülabilite (nadir tek başına INR ile)']
  },
  {
    id: 'd_dimer',
    name: 'D-Dimer',
    nameTr: 'D-Dimer Fibrin Yıkım Ürünü',
    tube: 'blue',
    tubeLabel: 'Mavi Kapak (Sodyum Sitrat)',
    referenceRange: '< 500',
    unit: 'ng/mL FEU (veya <0.5 µg/mL)',
    clinicalSignificance: 'Yüksek negatif prediktif değer. Düşük klinik olasılıkta DVT ve Pulmoner Emboli dışlamada kullanılır. Yaş düzeltmeli: Yaş x 10 (>50 yaş).',
    highCauses: ['Venöz Tromboembolizm (DVT, PE)', 'Sepsis ve ağır enfeksiyonlar', 'Malignite', 'Gebelik', 'Cerrahi / Travma sonrası'],
    lowCauses: ['Tromboembolizmin dışlanması (Wells düşük riskte)']
  },

  // Yeşil Tüp / Kan Gazı Enjektörü (Arteriyel Kan Gazı)
  {
    id: 'abg_ph',
    name: 'Kan Gazı: pH',
    nameTr: 'Arteriyel / Venöz pH',
    tube: 'green',
    tubeLabel: 'Heparinli Enjektör / Yeşil Kapak',
    referenceRange: '7.35 - 7.45',
    unit: 'pH birimi',
    clinicalSignificance: 'Sistemik asit-baz dengesi. <7.35 Asidemi, >7.45 Alkalemi.',
    highCauses: ['Metabolik alkaloz', 'Solunumsal alkaloz (hiperventilasyon)'],
    lowCauses: ['Metabolik asidoz (laktat, ketoasidoz, üremi)', 'Solunumsal asidoz (hipoventilasyon, KOAH)']
  },
  {
    id: 'abg_pco2',
    name: 'Kan Gazı: pCO2',
    nameTr: 'Karbondioksit Parsiyel Basıncı',
    tube: 'green',
    tubeLabel: 'Heparinli Enjektör / Yeşil Kapak',
    referenceRange: '35 - 45',
    unit: 'mmHg',
    clinicalSignificance: 'Solunumsal komponent göstergesi. Ventilasyon yeterliliğini yansıtır.',
    highCauses: ['Hipoventilasyon', 'KOAH alevlenme', 'Sedatif aşırı dozu', 'Nöromusküler zayıflık'],
    lowCauses: ['Hiperventilasyon (Anksiyete, ağrı)', 'Ağır hipoksiye yanıt', 'Pulmoner emboli', 'Sepsis erken dönemi']
  },
  {
    id: 'abg_hco3',
    name: 'Kan Gazı: HCO3- (Bikarbonat)',
    nameTr: 'Standart / Aktüel Bikarbonat',
    tube: 'green',
    tubeLabel: 'Heparinli Enjektör / Yeşil Kapak',
    referenceRange: '22 - 26',
    unit: 'mEq/L (mmol/L)',
    clinicalSignificance: 'Metabolik komponent ve tamponlama kapasitesi.',
    highCauses: ['Metabolik alkaloz (kusma, diüretik)', 'Kronik solunumsal asidoz renal kompanzasyonu'],
    lowCauses: ['Metabolik asidoz (tüketim veya bikarbonat kaybı - ishal)', 'Kronik solunumsal alkaloz kompanzasyonu']
  },
  {
    id: 'abg_lactate',
    name: 'Laktat',
    nameTr: 'Kan Laktat Seviyesi',
    tube: 'green',
    tubeLabel: 'Heparinli Enjektör / Yeşil Kapak',
    referenceRange: '0.5 - 2.0',
    unit: 'mmol/L',
    clinicalSignificance: 'Doku hipoperfüzyonu ve hücresel anaerobik metabolizma belirteci. >2.0 sepsis kriteri, >4.0 kritik şok göstergesi.',
    highCauses: ['Septik şok / Hipovolemik şok / Kardiyojenik şok', 'Mezenter iskemi / Ekstremite iskemisi', 'Şiddetli hipoksi', 'Karaciğer yetmezliği (klerens azlığı)', 'Metformin intoksikasyonu'],
    lowCauses: ['Yeterli doku perfüzyonu ve oksijenizasyon']
  }
];

export const DRUG_MONOGRAPHS: DrugMonograph[] = [
  {
    id: 'paracetamol_iv',
    genericName: 'Parasetamol (Asetaminofen)',
    brandNames: 'Parol, Perfalgan, Minoset',
    category: 'Analjezik & Antipiretik',
    indication: 'Hafif-orta şiddette ağrı, ateş düşürülmesi.',
    standardDoseAdult: '1000 mg (1 flakon) IV veya Oral. Gerekirse 6 saatte bir tekrarlanır. Günlük maksimum doz: 4000 mg (Kronik KC hastalığı veya malnütrisyonda max 2000-3000 mg/gün).',
    standardDosePediatric: '15 mg/kg/doz IV/Oral, maksimum 4 doz/gün (max 60 mg/kg/gün).',
    administration: 'IV İnfüzyon şeklinde 15 dakika boyunca uygulanır. Puşe yapılmaz!',
    dilution: '100 mL hazır infüzyon şişesi sulandırılmadan doğrudan damar yoluna takılır.',
    infusionRate: '15 dakikada gidecek şekilde (yaklaşık 400 mL/saat hız ayarı).',
    contraindications: 'Ağır karaciğer yetmezliği, parasetamole aşırı duyarlılık.',
    keyCautions: 'Karaciğer toksisitesi riski. Hastanın aldığı diğer kombine soğuk algınlığı ilaçlarında parasetamol olup olmadığını kontrol edin.',
    renalAdjustment: 'GFR < 30 mL/dk ise doz aralığı minimum 6-8 saate çıkarılmalıdır.'
  },
  {
    id: 'ceftriaxone',
    genericName: 'Seftriakson',
    brandNames: 'Rocephin, Desefin, Novosef, Unacefin',
    category: '3. Kuşak Sefalosporin Antibiyotik',
    indication: 'Pnömoni, ÜSE/Piyelonefrit, Menenjit, Sepsis, Karın içi enfeksiyonlar.',
    standardDoseAdult: '1 - 2 g IV günde tek doz (24 saatte bir). Menenjit durumunda 2x2 g IV.',
    standardDosePediatric: '50 - 75 mg/kg/gün tek doz veya 2 eşit doza bölünerek (Menenjitte 100 mg/kg/gün).',
    administration: 'IV yavaş infüzyon (30 dakika) veya IM (Lidokain çözeltisi ile sulandırılarak).',
    dilution: '1 g flakon: 10 mL steril enjeksiyonluk su ile çözülüp 50-100 mL %0.9 NaCl veya %5 Dekstroz içerisine katılır.',
    infusionRate: '30 dakikada infüzyon.',
    contraindications: 'Sefalosporin veya penisilin anafilaksi öyküsü. Kalsiyum içeren solüsyonlarla (örn: Ringer Laktat) KESİNLİKLE aynı damar yolundan verilmez (Çökelti oluşturur!).',
    keyCautions: 'Yenidoğanlarda hiperbilirubinemi ve kalsiyum ile ölümcül presipitasyon riski nedeniyle kontrendikedir.',
    renalAdjustment: 'Karaciğer fonksiyonu normalse hafif/orta böbrek yetmezliğinde doz azaltımı gerekmez. Ağır kombine böbrek+KC yetmezliğinde max 2 g/gün.'
  },
  {
    id: 'metronidazole',
    genericName: 'Metronidazol',
    brandNames: 'Flagyl, Polgyl, Metrajil',
    category: 'Antiprotozoal & Antianaerobik Antibakteriyel',
    indication: 'Karın içi enfeksiyonlar, pelvik enfeksiyonlar, C. difficile koliti, amebiyazis.',
    standardDoseAdult: '500 mg IV 8 saatte bir (veya 500 mg PO TID).',
    standardDosePediatric: '7.5 mg/kg/doz 8 saatte bir IV/Oral.',
    administration: 'IV infüzyon (en az 30-60 dakika sürmelidir). Hızlı infüzyon yapılmaz.',
    dilution: '500 mg / 100 mL hazır solüsyon doğrudan verilir.',
    infusionRate: '100 mL torba 30-60 dakikada gidecek hızda.',
    contraindications: 'Metronidazol aşırı duyarlılığı, gebeliğin ilk trimesteri (rölatif).',
    keyCautions: 'Disülfiram benzeri reaksiyon: Tedavi süresince ve bittikten sonra 48 saat alkol kesinlikle yasaktır! Metalik tat, periferik nöropati.',
    renalAdjustment: 'GFR < 10 mL/dk ise doz %50 azaltılabilir veya aralık açılır.'
  },
  {
    id: 'furosemide',
    genericName: 'Furosemid',
    brandNames: 'Lasix, Furomid, Desal',
    category: 'Kıvrım (Loop) Diüretik',
    indication: 'Akut akciğer ödemi, Kalp yetmezliği volüm yükü, Sirotik asit, Hipertansif krizde volüm kontrolü.',
    standardDoseAdult: '20 - 40 mg (1-2 ampul) IV yavaş puşe. Yanıta göre titre edilir.',
    standardDosePediatric: '1 mg/kg/doz IV (maksimum 2 mg/kg/doz).',
    administration: 'IV yavaş puşe (dakikada en fazla 20 mg olacak şekilde 1-2 dakikada) veya sürekli infüzyon.',
    dilution: 'Puşe doğrudan sulandırılmadan veya 10 mL SF ile sulandırılarak yapılabilir.',
    infusionRate: 'Yüksek doz infüzyonlarda maksimum hız: 4 mg/dk (Ototoksisiteyi önlemek için).',
    contraindications: 'Anüri, ağır hipovolemi/dehidrasyon, ağır hipokalemi/hiponatremi, hepatik koma.',
    keyCautions: 'Elektrolit takibi (K+, Na+, Mg+) ve kan basıncı monitorizasyonu şarttır. Hızlı enjeksiyon kalıcı işitme kaybına (ototoksisite) yol açabilir.',
    renalAdjustment: 'Böbrek yetmezliğinde yüksek dozlar gerekebilir ancak dikkatle titre edilmelidir.'
  },
  {
    id: 'ondansetron',
    genericName: 'Ondansetron',
    brandNames: 'Zofran, Zofer, Emetron',
    category: '5-HT3 Reseptör Antagonisti (Antiemetik)',
    indication: 'Kemoterapi/radyoterapi ilişkili ve postoperatif bulantı-kusma, acil serviste şiddetli kusma.',
    standardDoseAdult: '4 - 8 mg IV yavaş veya Oral tablet/ODT. Günlük maksimum doz 16-24 mg.',
    standardDosePediatric: '0.15 mg/kg/doz IV yavaş (maksimum 4-8 mg).',
    administration: 'IV yavaş enjeksiyon (en az 2-5 dakika) veya 50 mL SF içinde 15 dakikada.',
    dilution: '4 mg/2 mL veya 8 mg/4 mL ampul. 50 mL SF/Dekstroz içine eklenebilir.',
    infusionRate: '15 dakika veya en az 2-3 dakika yavaş puşe.',
    contraindications: 'Apomorfin ile eş zamanlı kullanım (şiddetli hipotansiyon ve bilinç kaybı riski), konjenital uzun QT.',
    keyCautions: 'QT uzaması yapabilir; diğer QT uzatan ilaçlarla veya elektrolit dengesizliği olanlarda EKG takibi önerilir. Kabızlık ve baş ağrısı yapabilir.',
    renalAdjustment: 'Böbrek yetmezliğinde doz ayarlaması gerekmez. Ağır karaciğer yetmezliğinde (Child-Pugh C) günlük maksimum 8 mg.'
  },
  {
    id: 'salbutamol',
    genericName: 'Salbutamol (Albuterol)',
    brandNames: 'Ventolin Nebules / Inhaler',
    category: 'Kısa Etkili Beta-2 Agonist (Bronkodilatör)',
    indication: 'Akut bronkospazm (Astım alevlenme, KOAH alevlenme), Hiperkalemi acil tedavisi.',
    standardDoseAdult: '2.5 - 5 mg (1-2 nebül) nebülizatör ile 20 dakikada bir 3 doza kadar. İdame 4-6 saatte bir 2.5 mg.',
    standardDosePediatric: '0.15 mg/kg (minimum 1.25 - 2.5 mg) nebül.',
    administration: 'Nebülizatör maskesi ile 6-8 L/dk O2 akımı altında uygulanır.',
    dilution: 'Gerekirse nebül haznesi 2-3 mL SF ile sulandırılır.',
    infusionRate: '10 - 15 dakikada nebül bitene kadar.',
    contraindications: 'Salbutamole aşırı duyarlılık.',
    keyCautions: 'Taşikardi, tremor, palpitasyon ve hipokalemi yapabilir. Kardiyak aritmisi olan hastalarda dikkatle izlenmelidir.',
    renalAdjustment: 'Doz ayarlaması gerekmez.'
  }
];

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'anaphylaxis',
    title: 'Anafilaksi Acil Yönetim Protokolü',
    urgency: 'critical',
    indication: 'Ani başlayan cilt bulguları (ürtiker/anjiyoödem) + solunum sıkıntısı (stridor/bronkospazm) ve/veya hipotansiyon/şok.',
    steps: [
      {
        stepNumber: 1,
        title: 'Tetikleyiciyi Kesin ve Pozisyon Verin',
        description: 'İnfüzyon halindeki ilacı derhal durdurun. Damar yolunu koruyun. Hastayı sırtüstü yatırıp bacaklarını yükseltin (Trendelenburg). Solunum sıkıntısı varsa yarı oturur pozisyona getirin. KESİNLİKLE aniden ayağa kaldırmayın (ani kardiyak arrest riski!).',
        actionableItems: ['İlaç/alerjen infüzyonunu kes', 'Bacakları kaldır (şok pozisyonu)', 'Hemen yardım çağır / Mavi Kod']
      },
      {
        stepNumber: 2,
        title: 'İntramusküler (İM) ADRENALİN Uygulayın (1. Basamak & Hayat Kurtarıcı)',
        description: 'Vakit kaybetmeden Uyluğun anterolateral (vastus lateralis) bölgesinden İM yapın. İM enjeksiyon subkütana göre çok daha hızlı pik konsantrasyona ulaşır.',
        medications: [
          'Erişkin: 0.5 mg İM (1:1000 [1 mg/mL] ampulden 0.5 mL sulandırılmadan)',
          'Çocuk (>12 yaş): 0.5 mg İM',
          'Çocuk (6-12 yaş): 0.3 mg İM (0.3 mL)',
          'Çocuk (<6 yaş): 0.15 mg İM (0.15 mL)',
          '5-15 dakika içinde klinik yanıt alınamazsa AYNI DOZDA İKİNCİ ADRENALİN İM tekrarlanır!'
        ]
      },
      {
        stepNumber: 3,
        title: 'Oksijen & Agresif Sıvı Resüsitasyonu',
        description: 'Yüksek akımlı O2 (10-15 L/dk rezervuarlı maske) başlayın. İki adet geniş lümenli (16G veya 18G) periferik damar yolu açın.',
        medications: [
          'Erişkin: Hızlı Kristalloid (%0.9 SF) 500 - 1000 mL bolus (ilk 5-10 dakikada)',
          'Çocuk: 20 mL/kg SF bolus'
        ]
      },
      {
        stepNumber: 4,
        title: 'İkincil İlaçlar (Adrenalin yerine geçmez, adjuvandır!)',
        description: 'Adrenalin verildikten ve hemodinami sağlandıktan sonra nüksü ve uzamış reaksiyonu önlemek için:',
        medications: [
          'Antihistaminik (H1): Feniramin (Avil) 1 ampul (45.5 mg) IV yavaş puşe',
          'Kortikosteroid: Metilprednizolon (Prednol) 1-2 mg/kg IV (Erişkinde 40-80 mg IV)',
          'Bronkospazm sürüyorsa: Salbutamol nebül 2.5-5 mg'
        ]
      },
      {
        stepNumber: 5,
        title: 'Gözlem Süresi (Bifazik Reaksiyon Takibi)',
        description: 'Hafif-orta anafilaksiler en az 6-8 saat, ağır ve hipotansif anafilaksiler en az 12-24 saat monitorize edilmelidir.',
        actionableItems: ['Vital parametreleri 15 dakikada bir kaydet', 'Bifazik reaksiyon riski için gözlem süresini koru']
      }
    ],
    pearls: [
      'Adrenalin için hiçbir mutlak kontrendikasyon yoktur; yaşlıda veya kardiyak hastada dahi anafilakside İM adrenalin ilk tercihtir.',
      'Antihistaminik ve kortikosteroidler hava yolunu açmaz ve şoku düzeltmez; Adrenalin vermeyi ASLA geciktirmeyin!',
      'Beta bloker kullanan hastalarda adrenalinin etkisi azalabilir; refrakter vakalarda Glukagon (1-5 mg IV) düşünülmelidir.'
    ]
  },
  {
    id: 'hypoglycemia',
    title: 'Akut Hipoglisemi Yönetim Algoritması',
    urgency: 'critical',
    indication: 'Kan şekeri < 70 mg/dL (veya semptomatik düşük kan şekeri). Terleme, tremor, bilinç bulanıklığı, nöbet.',
    steps: [
      {
        stepNumber: 1,
        title: 'Bilinç Durumunu Değerlendirin',
        description: 'Hasta yutabiliyor mu ve bilinci yerinde mi? (Aspirasyon riski kontrolü).',
        actionableItems: ['Kapiller kan şekerini ölç', 'Bilinç durumunu ve hava yolu güvenliğini değerlendir']
      },
      {
        stepNumber: 2,
        title: 'Bilinç AÇIK ve Yutabiliyorsa ("15-15 Kuralı")',
        description: 'Ağızdan 15-20 gram hızlı emilen basit karbonhidrat verin:',
        medications: [
          '3-4 adet kesme şeker (suda eritilerek) veya',
          '150-200 mL meyve suyu / normal kola',
          '15 DAKİKA BEKLEYİN ve kan şekerini tekrar ölçün.',
          'KŞ hala < 70 mg/dL ise 15 gram daha basit şeker tekrarlayın.',
          'KŞ normale dönünce kompleks karbonhidrat (bisküvi/ekmek/öğün) verin.'
        ]
      },
      {
        stepNumber: 3,
        title: 'Bilinç KAPALI, Yutamıyor veya Oral Alımı Uygunsuzsa',
        description: 'Oral hiçbir şey vermeyin (Aspirasyon riski!). Damar yolundan intravenöz dekstroz uygulayın:',
        medications: [
          '%20 Dekstroz: 50 - 100 mL IV puşe (veya %10 Dekstroz 100 - 200 mL)',
          'Ardından %5 veya %10 Dekstroz idame infüzyonu takın (75-100 mL/saat)',
          'Damar yolu YOKSA: Glukagon 1 mg İM veya SC uygulayın (glukagon karaciğer glikojen depolarını boşaltarak etki eder)'
        ]
      },
      {
        stepNumber: 4,
        title: 'Altta Yatan Nedeni Araştırın ve Takip Edin',
        description: 'Özellikle sülfonilüre grubu oral antidiyabetik (glimepirid vb.) kullanan hastalarda yarılanma ömrü uzun olduğu için tekrarlayan hipoglisemi gelişebilir; en az 24 saat hastanede takip gereklidir.',
        actionableItems: ['İlaç doz aşımı veya atlanan öğün sorgulama', 'Böbrek/KC fonksiyonlarını kontrol et', 'Saatlik KŞ profili planla']
      }
    ],
    pearls: [
      'Çikolata veya yağlı besinler yağ içerdiği için şekerin emilimini geciktirir; hipoglisemide tercih edilmez, doğrudan basit şeker verilmelidir.',
      'Alkolik hipoglisemide Dekstroz vermeden önce veya eş zamanlı olarak Wernicke ensefalopatisini önlemek için Tiamin (B1 vitamini) 100 mg IV yapılmalıdır.'
    ]
  },
  {
    id: 'acute_coronary',
    title: 'Akut Göğüs Ağrısı / AKS İlk 10 Dakika Protokolü',
    urgency: 'critical',
    indication: 'Baskı/sıkıştırıcı vasıfta göğüs ağrısı, sol kola/çeneye yayılım, soğuk terleme, dispne.',
    steps: [
      {
        stepNumber: 1,
        title: 'İlk 10 Dakika Kuralı & EKG',
        description: 'Hasta gelir gelmez ilk 10 dakika içerisinde 12 derivasyonlu EKG çekilmeli ve hekim tarafından ST elevasyonu açısından incelenmelidir.',
        actionableItems: ['12 derivasyonlu EKG çek', 'Vital bulguları al (özellikle iki koldan tansiyon - diseksiyon ekarte et)', 'Monitörize et']
      },
      {
        stepNumber: 2,
        title: 'İlk İlaç Müdahalesi (MONA Yaklaşımı)',
        description: 'Kontrendikasyonları hızla sorgulayarak uygulayın:',
        medications: [
          'Aspirin (Asetilsalisilik Asit): 300 mg çiğnetilerek (Enterik kaplı olmayan)',
          'Oksijen: Sadece SpO2 < %90 veya dispneik ise verilir (rutin normoksik hastada hiperoksi iskemi bölgesini daraltabilir!)',
          'Nitrat (İsosorbid dinitrat / Nitrogliserin): Dilaltı sprey veya tablet. DİKKAT: Sistolik KB < 90 mmHg, Sağ ventrikül MI (V4R ST elevasyonu) ve son 24-48 saatte PDE-5 inhibitörü (Viagra/Cialis) kullanımında KONTRENDİKEDİR!',
          'Morfin: Refrakter şiddetli ağrıda 2-4 mg IV yavaş (yakın solunum ve KB takibi ile)'
        ]
      },
      {
        stepNumber: 3,
        title: 'ST Elevasyonlu MI (STEMI) ise Acil Girişim Kararı',
        description: 'Hemen Kıdemli Hekim / Kardiyoloji Konsültanı ve Koroner Anjiyo ünitesine haber verilir. Hedef: Kapı-Balon süresi < 90 dakika.',
        actionableItems: ['Kardiyolojiye haber ver', 'Troponin I, CK-MB, Hemogram, Biyokimya, Koagülasyon kanlarını gönder', 'Çift antiagregan (Klopidogrel/Tikagrelor) ve Heparin konsültan onayına göre başla']
      }
    ],
    pearls: [
      'Normal bir ilk EKG akut koroner sendromu dışlamaz! Şüphe sürüyorsa 15-30 dakikada bir EKG tekrarlanmalı veya arka duvar için V7-V9 derivasyonları çekilmelidir.',
      'Diyabetik ve yaşlı hastalarda ağrısız (sessiz) MI tablosu yalnızca ani dispne, halsizlik veya bulantı ile prezente olabilir.'
    ]
  },
  {
    id: 'hypertensive_urgency',
    title: 'Hipertansif Acil (Emergency vs Urgency) Ayrımı & Yönetimi',
    urgency: 'urgent',
    indication: 'Kan basıncı > 180/120 mmHg olan hastanın değerlendirilmesi.',
    steps: [
      {
        stepNumber: 1,
        title: 'Hedef Organ Hasarı Sorgulaması (Kritik Ayrım)',
        description: 'Tansiyon yüksekliğinde aciliyet derecesini sayının yüksekliği değil, "Hedef Organ Hasarı" varlığı belirler:',
        actionableItems: [
          'Beyin: Bilinç bulanıklığı, inme bulgusu, fışkırır tarzda kusma, baş ağrısı (Hipertansif ensefalopati / SVO)',
          'Göz: Papilödem, retinal kanama, ani görme kaybı',
          'Kalp & Damar: Göğüs ağrısı (MI, Aort diseksiyonu), akut nefes darlığı / pembe köpüklü balgam (Akut AC ödemi)',
          'Böbrek: Akut hematüri, oligüri, kreatinin fırlaması'
        ]
      },
      {
        stepNumber: 2,
        title: 'Hipertansif Urgency (Hedef Organ Hasarı YOK)',
        description: 'Tansiyonu hemen dakikalar içinde düşürmeye ÇALIŞMAYIN! Ani düşüş serebral veya miyokardiyal iskemiye yol açabilir.',
        medications: [
          'Oral antihipertansifler ile 24-48 saat içinde kademeli düşüş hedeflenir.',
          'Kaptopril 25 mg PO veya Kalsiyum kanal blokeri (Amlodipin 5-10 mg PO)',
          'DİKKAT: Dilaltı Nifedipin (Adalat) kapsülü ısırttırmak KESİNLİKLE YASAKTIR (Ani ölüm ve inme riski nedeniyle kılavuzlardan çıkarılmıştır!).'
        ]
      },
      {
        stepNumber: 3,
        title: 'Hipertansif Emergency (Hedef Organ Hasarı VAR)',
        description: 'Yoğun bakım / acil resüsitasyon şartlarında IV titre edilebilir ajanlar (Nitroglicerin, Labetalol, Esmolol vb.) kullanılır. İlk 1 saatte MAP en fazla %20-25 oranında düşürülmelidir (Aort diseksiyonu hariç; diseksiyonda sistol < 120 ve nabız < 60 hızlı hedeflenir).',
        actionableItems: ['Kıdemli hekime ve ilgili uzmanlığa haber ver', 'İntravenöz infüzyon pompası hazırla']
      }
    ],
    pearls: [
      'Ağrı, idrar retansiyonu (glob vezikale) ve anksiyete reaktif tansiyon yüksekliğinin en sık nedenleridir; önce bu faktörleri çözün.'
    ]
  }
];

export const CLINIC_CONTACTS: ClinicContact[] = [
  {
    id: 'rad_1',
    unitName: 'Radyoloji Raporlama & BT/MR Danışma',
    department: 'Radyoloji',
    extension: '2140',
    altPhone: 'Dahili: 2141',
    location: 'Zemin Kat - Koridor B',
    responsibleTitle: 'Nöbetçi Radyoloji Asistanı'
  },
  {
    id: 'rad_usg',
    unitName: 'Ultrasonografi (USG) Birimi',
    department: 'Radyoloji',
    extension: '2145',
    location: 'Zemin Kat - Oda 12',
    responsibleTitle: 'USG Teknisyeni / Nöbetçi Hekim'
  },
  {
    id: 'lab_bio',
    unitName: 'Merkez Biyokimya Laboratuvarı',
    department: 'Laboratuvar',
    extension: '3100',
    altPhone: 'Numune Kabul: 3102',
    location: '1. Kat - Doğu Kanadı',
    responsibleTitle: 'Laboratuvar Sorumlu Teknisyeni'
  },
  {
    id: 'lab_blood',
    unitName: 'Kan Merkezi / Transfüzyon Ünitesi',
    department: 'Laboratuvar',
    extension: '3150',
    location: '1. Kat - Kan Bankası',
    responsibleTitle: 'Kan Merkezi Sorumlusu'
  },
  {
    id: 'pharmacy',
    unitName: 'Klinik Eczanesi & İlaç İstemi',
    department: 'Eczacılık',
    extension: '4200',
    location: 'Bodrum Kat - Depo Yanı',
    responsibleTitle: 'Nöbetçi Eczacı'
  },
  {
    id: 'senior_resident',
    unitName: 'Kıdemli Asistan Hekim Odası',
    department: 'Klinik İdari',
    extension: '1050',
    location: '3. Kat - Servis İçi',
    responsibleTitle: 'Başasistan / Kıdemli Hekim'
  },
  {
    id: 'security_emergency',
    unitName: 'Güvenlik & Mavi Kod / Beyaz Kod Çağrı',
    department: 'Güvenlik & Kriz',
    extension: '1111',
    altPhone: 'Santral: 0',
    location: 'Ana Giriş Güvenlik Danışma',
    responsibleTitle: 'Güvenlik Amiri'
  },
  {
    id: 'echo_ecg',
    unitName: 'Kardiyoloji EKO & EKG Laboratuvarı',
    department: 'Kardiyoloji',
    extension: '2280',
    location: '2. Kat - Poliklinikler',
    responsibleTitle: 'Kardiyoloji Teknisyeni'
  }
];

export const MEDICAL_ABBREVIATIONS = [
  { abbr: 'AKŞ', meaning: 'Açlık Kan Şekeri', description: 'Laboratuvar veya glukometre ile sabah açlık glukoz ölçümü' },
  { abbr: 'ABH / AKI', meaning: 'Akut Böbrek Hasarı', description: 'Kreatinin bazal değere göre $\ge 0.3$ mg/dL veya %50 artışı' },
  { abbr: 'KBY / CKD', meaning: 'Kronik Böbrek Yetmezliği', description: 'GFR < 60 mL/dk veya renal hasar bulgularının > 3 ay sürmesi' },
  { abbr: 'KOAH / COPD', meaning: 'Kronik Obstrüktif Akciğer Hastalığı', description: 'Geri dönüşümsüz hava yolu kısıtlılığı ile giden akciğer hastalığı' },
  { abbr: 'KKY / CHF', meaning: 'Kronik Kalp Yetmezliği', description: 'Kalbin dokuların metabolik ihtiyacını karşılayacak debiyi sağlayamaması' },
  { abbr: 'DVT', meaning: 'Derin Ven Trombozu', description: 'Özellikle alt ekstremite derin venlerinde pıhtı oluşumu' },
  { abbr: 'PTE / PE', meaning: 'Pulmoner Tromboemboli', description: 'Pulmoner arteriyel yatağın trombüs ile tıkanması' },
  { abbr: 'GKS / GCS', meaning: 'Glasgow Koma Skalası', description: 'Bilinç düzeyini puanlayan nörolojik değerlendirme skalası (3-15)' },
  { abbr: 'OAB / MAP', meaning: 'Ortalama Arter Basıncı', description: '[(2 x Diyastol) + Sistol] / 3 ile hesaplanan perfüzyon basıncı' },
  { abbr: 'TİT', meaning: 'Tam İdrar Tahlili', description: 'İdrar dansitesi, pH, protein, eritrosit, lökosit ve sediment incelemesi' },
  { abbr: 'SVO / Stroke', meaning: 'Serebrovasküler Olay', description: 'İskemik veya hemorajik inme tablosu' },
  { abbr: 'USG', meaning: 'Ultrasonografi', description: 'Radyasyon içermeyen ses dalgasıyla görüntüleme tetkiki' },
  { abbr: 'BT / CT', meaning: 'Bilgisayarlı Tomografi', description: 'Kesitsel X-ışını görüntülemesi (kontrastlı veya kontrastsız)' },
  { abbr: 'MRG / MRI', meaning: 'Manyetik Rezonans Görüntüleme', description: 'Yumuşak doku ve merkezi sinir sistemi görüntülemesi' },
  { abbr: 'SOAP', meaning: 'Subjective, Objective, Assessment, Plan', description: 'Uluslararası klinik vizit ve poliklinik notu formatı' },
  { abbr: 'SBAR', meaning: 'Situation, Background, Assessment, Recommendation', description: 'Nöbet devri ve kritik hasta konsültasyonunda standart aktarım protokolü' }
];
