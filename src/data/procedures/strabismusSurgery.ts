import { ProcedureDefinition } from '../../types/procedures';

/**
 * Şaşılık (Strabismus) Cerrahisi: Pediatrik ve Erişkin Ekstraoküler Kas Geriletme / Rezeksiyonu ve Ayarlanabilir Sütür Cerrahisi
 * (Strabismus Surgery / Extraocular Muscle Recession, Resection and Adjustable Suture Techniques)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), Gan et al. 4th PONV Consensus (2020),
 * APA / ESPA Pediatric PONV Guidelines, RCoA / RCOphth (2012), MHAUS Malignant Hyperthermia Guidelines.
 */
export const strabismusSurgery: ProcedureDefinition = {
  id: 'strabismus-surgery',
  name: 'Şaşılık (Strabismus) Cerrahisi: Pediatrik & Erişkin Ekstraoküler Kas Cerrahisi',
  shortCode: 'GOZ-SASILIK',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  secondarySpecialties: ['cocuk_cerrahisi'],
  categoryTag: 'Pediatrik Oftalmoloji & Şaşılık',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Gözlerin paralel hizalanmasını ve binoküler füzyonu sağlamak amacıyla bir veya birden fazla ekstraoküler kasın (medial, lateral, superior, inferior rektus ve oblik kaslar) geriletme (recession — kası zayıflatma), rezeksiyon/plikasyon (kası güçlendirme) veya transpozisyon teknikleriyle yeniden konumlandırılması ameliyatıdır. Pediatrik ve erişkin göz anestezisinin en klasik ve fizyolojik olarak en yüksek Okülokardiyak Refleks (OCR: %60-90) ile Postoperatif Bulantı-Kusma (PONV: profilaksisiz %50-80!) riski taşıyan cerrahisidir. Operasyon başında cerrah mekanik kısıtlılığı değerlendirmek için "Forced Duction Testi" (FDT) uygular; seçilmiş erişkinlerde postoperatif erken saatlerde ince ayar yapılabilmesi için ayarlanabilir sütür (adjustable suture) tekniği kullanılabilir.',
  indications: [
    'İnfantil / Konjenital veya Akkomodatif Olmayan Ezotropya (İçe Kayma) ve Ekzotropya (Dışa Kayma)',
    'Vertikal Şaşılıklar (İnferior Oblik Hiperfonksiyonu, 4. Sinir Felci, Dissosiye Vertikal Deviasyon)',
    'Paralitik ve Restriktif Şaşılıklar (3./6. Sinir Felci, Duane Sendromu, Brown Sendromu, Graves Orbitopatisi)',
    'Erişkinlerde Çift Görmenin (Diplopi) Giderilmesi ve Binoküler Görmenin / Baş Pozisyonunun Düzeltilmesi'
  ],
  averageDuration: '30 - 75 dakika (Tek göz 2 kas: 30-45 dk; Bilateral veya kompleks oblik/transpozisyon cerrahisi: 60-75 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 15 mL (Konjonktival ve anterior siliyer damar sızıntıları; sistemik kan kaybı minimaldir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Ekstraoküler Kas Kaybı ve Skleral Perforasyon Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez',
    transfusionProbability: '< %0.01 (Transfüzyon endikasyonu yoktur)',
    criticalBleedingSources: [
      'Anterior Siliyer Damarlar (rektus kas insersiyonları — aynı gözde >2 rektus kasına müdahalede ön segment iskemisi riski)',
      'Vorteks Venleri (özellikle oblik kas ve arka skleral manipülasyonlarda)'
    ],
    hemostasisStrategies: [
      'Bipolar wet-field mikro-koter ve epinefrinli/fenilefrinli topikal saha kontrolü',
      'Normokapni ve normotansiyonla episkleral venöz basıncın düşük tutulması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Propofol Temelli TIVA (Total İntravenöz Anestezi) + Laringeal Maske (LMA) veya Spiralli/Oral RAE ETT + Çiftli PONV Profilaksisi (Deksametazon + Ondansetron) — Şaşılık cerrahisinde %50-80\'e varan PONV riskini dramatik düşürdüğü ve MH tetikleyicilerinden kaçındığı için ALTIN STANDARTTIR'
    ],
    alternative: [
      'Sevofluran İnhalasyon İndüksiyonu (IV yolu olmayan küçük çocukta) → IV yol açılır açılmaz Propofol TIVA\'ya geçiş (volatil idamesi PONV\'yi 2-3 kat artırır!)',
      'Erişkinlerde Topikal/Sub-Tenon Blok + Hafif MAC: Yalnızca çok seçilmiş, kooperasyonu tam erişkin tek kas veya ayarlanabilir sütür olgularında (ASA OR Fire uyumlu)'
    ],
    clinicalRationale: 'Şaşılık cerrahisi tüm cerrahiler içinde en yüksek PONV (%50-80) ve OCR (%60-90) insidansına sahiptir. Propofol TIVA (N₂O\'suz) + ikili antiemetik (Deksametazon + Ondansetron) + opioid-sparing multimodal analjezi (Sub-Tenon/topikal lokal + Parasetamol + NSAİİ) PONV\'yi <%10-15\'e indirir; ayrıca pediatrik şaşılıkta gizli miyopati ve Malign Hipertermi (MH) riskine karşı tetikleyici olmayan (non-triggering) güvenli bir temel oluşturur.',
    rulesTitle: 'ŞAŞILIK CERRAHİSİNDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Şaşılık cerrahisinde hayati kurallar: (1) En yüksek OCR (%60-90) — özellikle medial rektus traksiyonunda 1. adım cerrahı durdurmak + normokapni + IV Atropin 0.02 mg/kg (erişkin 0.5 mg); (2) Forced Duction Testi nedeniyle Süksinilkolin KESİN YASAK (20 dk ekstraoküler kas tonusunu bozar + gizli miyopati/MH riski!); (3) En yüksek PONV (%50-80) → Propofol TIVA + Deksametazon + Ondansetron + Kodein/Tramadol YASAK; (4) Gizli miyopati / Malign Hipertermi (MH) uyanıklığı (masseter spazmı, açıklanamayan EtCO₂/taşikardi artışı); (5) Preemptif Sub-Tenon / topikal lokal + Parasetamol + NSAİİ; (6) Pediatrik emergence delirium önlemi.',
    indispensableRules: [
      {
        number: 1,
        title: 'EN YÜKSEK OKÜLOKARDİYAK REFLEKS (OCR: %60–90) — MEDİAL REKTUS ALARMI!',
        content: 'Ekstraoküler kasların (özellikle MEDİAL REKTUS!) kas kancasıyla çekilmesi trigemino-vagal refleksle (CN V₁ → CN X) ani derin bradikardi, nodal ritim, AV blok veya asistoli yaratır (genç ve hiperkapnik çocuklarda çok şiddetlidir!). 1. adım: Cerraha derhal "TRAKSİYONU BIRAK" komutu; 2. adım: Hiperkapni/hipoksi ve anestezi derinliğinin kontrolü; 3. adım: Düzelmeyen veya tekrarlayan ağır bradikardide İV Atropin (pediatrik 0.02 mg/kg [min 0.1 mg, maks 0.5 mg]; erişkin 0.5 mg) veya Glikopirolat. Rutin profilaktik Atropin önerilmez; refleks tekrarlayan uyarılarda yorulma (fatigability) gösterir.'
      },
      {
        number: 2,
        title: 'FORCED DUCTION TESTİ (FDT) VE SÜKSİNİLKOLİN KESİN YASAĞI!',
        content: 'Süksinilkolin ekstraoküler kasların tonik liflerinde 15-20 dakika süren sürekli kasılma yaratarak cerrahın yaptığı Forced Duction Testini (pasif göz hareketi testi) tamamen bozar ve yanlış cerrahi ölçüme yol açar! Ayrıca şaşılık hastalarında gizli konjenital miyopati ve Malign Hipertermi (MH) riski nedeniyle Süksinilkolin KESİNLİKLE KULLANILMAZ.'
      },
      {
        number: 3,
        title: 'EN YÜKSEK PONV RİSKİ (%50–80): PROPOFOL TIVA + ÇİFTLİ ANTİEMETİK + KODEİN/TRAMADOL YASAĞI!',
        content: 'Okülogastrik refleks ve vestibüler/görsel uyumsuzluk nedeniyle profilaksisiz şaşılık hastalarının %50-80\'i kusar! Altın standart: Propofol TIVA (volatil ve N₂O\'dan kaçın!) + indüksiyonda İV Deksametazon (pediatrik 0.15 mg/kg, maks 4-8 mg) + bitimde İV Ondansetron (pediatrik 0.1-0.15 mg/kg, maks 4 mg) + opioid-sparing analjezi. Pediatrik ve erişkin şaşılıkta KODEİN ve TRAMADOL (FDA/EMA Black Box + şiddetli PONV) KESİNLİKLE KULLANILMAZ!'
      },
      {
        number: 4,
        title: 'GİZLİ MİYOPATİ VE MALİGN HİPERTERMİ (MH) UYANIKLIĞI',
        content: 'Pediatrik şaşılık, konjenital pitozis veya kas güçsüzlüğü ile birlikte seyreden olgularda altta yatan santral kor hastalığı, King-Denborough veya diğer miyopatiler bulunabilir. Aile öyküsü mutlaka sorgulanır; intraoperatif açıklanamayan EtCO₂ yükselişi, taşikardi, kas rijiditesi veya hipertermi gelişirse derhal MH kriz protokolü (#arac=emergencies&sub=mh) ve Dantrolen başlatılır.'
      },
      {
        number: 5,
        title: 'PREEMPTİF SUB-TENON / TOPİKAL ANALJEZİ VE OPİOİD-SPARİNG STRATEJİ',
        content: 'Cerrah tarafından uygulanan topikal Tetrakain/Proparakain veya Sub-Tenon lokal anestezik (Ropivakain/Bupivakain) + İV Parasetamol (pediatrik 15 mg/kg; erişkin 1 g) + kontrendikasyon yoksa İV/oral NSAİİ (Ketorolak/İbuprofen) hem OCR insidansını hem de postoperatif ağrı ve PONV\'yi anlamlı azaltır.'
      },
      {
        number: 6,
        title: 'PEDİATRİK EMERGENCE DELİRİUM VE AYARLANABİLİR SÜTÜR KOOPERASYONU',
        content: 'Küçük çocuklarda uyanma ajitasyonunu önlemek için Propofol TIVA, düşük doz Deksmedetomidin (0.3-0.5 mcg/kg İV yavaş) veya uyanma öncesi düşük doz Propofol (0.5-1 mg/kg) etkilidir. Erişkin ayarlanabilir sütür vakasında hasta postop 2-4. saatte kooperasyonlu uyanık olmalıdır (uzun etkili sedatiflerden kaçınılır).'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Pediatrik Oftalmoloji: Şaşılık tipi, kayma açısı (prizma diyoptri), ambliyopi durumu ve müdahale edilecek kas sayısı.',
      'Pediatri / Nöroloji / Genetik (Sendromik veya Miyopati Şüphesinde): Down sendromu (atlantoaksiyel instabilite/KAH!), serebral palsi, Noonan/Marfan/King-Denborough veya ailede anestezi komplikasyonu / MH öyküsü varsa ayrıntılı değerlendirme.',
      'Anestezi Değerlendirmesi: Pediatrik açlık kuralları (ESAIC: berrak sıvı 1 sa, anne sütü 3 sa, mama/katı 4-6 sa), son 2-4 haftada ÜSYE (laringospazm riski!) ve ailede MH/miyopati öyküsü.'
    ],
    historyAndPhysical: [
      'Ailede Malign Hipertermi (MH), Kas Hastalığı veya Anestezide Açıklanamayan Ateş/Ölüm Öyküsü.',
      'Son 2-4 Haftada ÜSYE / Hırıltı / Aktif Öksürük (pediatrik laringospazm risk değerlendirmesi → #arac=preop&sub=cancellation-matrix).',
      'Pediatrik Açlık Süresi ve İntravenöz Yol vs. İnhalasyon İndüksiyonu Planı (EMLA krem ile atravmatik IV yol teşviki).',
      'Erişkinlerde Ayarlanabilir Sütür Planı ve Geçirilmiş PONV / Taşıt Tutması Öyküsü.'
    ],
    laboratoryAndTests: [
      'Sağlıklı pediatrik ve erişkin ASA I–II şaşılık hastalarında RUTİN PREOPERATİF LABORATUVAR VE EKG İSTENMEZ!',
      'Yalnızca klinik endikasyonda (komorbidite, sendromik KAH, miyopati şüphesinde bazal CK/EKG, Warfarin kullanan erişkinde INR) tetkik yapılır.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: Sürekli 5 derivasyonlu EKG (sesli nabız tonu AÇIK — OCR anında fark edilmelidir!), SpO₂, EtCO₂, NIBP ve Core Vücut Sıcaklığı (MH ve pediatrik hipotermi izlemi zorunludur!).',
      'EtCO₂ Kontrolü: Sıkı normokapni (EtCO₂ 35-38 mmHg — hiperkapni OCR\'yi ciddi biçimde şiddetlendirir ve MH\'nin ilk bulgusudur!).',
      'Derinlik & NMB İzlemi (NMB kullanılıyorsa TOF).'
    ],
    vascularAccess: [
      '1 adet güvenli periferik IV damar yolu (pediatrik 22-24G, erişkin 20G).',
      'Acil OCR Kiti MASADA ÇEKİLİ: İV Atropin (pediatrik 0.02 mg/kg [min 0.1 mg]; erişkin 0.5 mg).'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Halka ile Nötral ve Isıtılmış',
    patientPositionDetails: [
      'Pediatrik hastalarda aktif sıcak hava üfleyici battaniye ile normotermi (36.5-37.2°C) korunur.',
      'Baş silikon halka ile nötral sabitlenir; LMA veya Oral RAE/spiralli tüp cerrahi sahaya engel olmadan çene ortasından güvenle tespit edilir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - IV Yolu Olan Çocuk/Erişkin (1. Tercih): Propofol (2.5-3.5 mg/kg ped; 2 mg/kg erişkin) + Remifentanil veya düşük doz Fentanil (1 mcg/kg) + LMA yerleşimi (veya entübasyon gerekiyorsa Rokuronyum 0.6 mg/kg).',
      '  - IV Yolu Olmayan Küçük Çocuk: Sevofluran + Hava/O₂ inhalasyon indüksiyonu (N₂O kullanılmaz!) → IV yol açılır açılmaz Sevofluran kapatılıp Propofol TIVA\'ya geçilir.',
      '  - SÜKSİNİLKOLİN KESİNLİKLE KULLANILMAZ (Forced Duction Testi bozulması + MH/miyopati riski!).',
      'İdame (Antiemetik & OCR Dostu Rejim):',
      '  - Propofol TIVA (pediatrik Paedfusor/Kataria veya 150-250 mcg/kg/dk; erişkin TCI) + Remifentanil (0.05-0.15 mcg/kg/dk) veya düşük doz Deksmedetomidin adjuvanı.',
      '  - N₂O KULLANILMAZ (PONV\'yi belirgin artırır).',
      '  - Çiftli PONV Profilaksisi: İndüksiyonda İV Deksametazon (0.15 mg/kg, maks 4-8 mg) + bitimde İV Ondansetron (0.1-0.15 mg/kg, maks 4 mg).',
      '  - Multimodal Opioid-Sparing Analjezi: İV Parasetamol (15 mg/kg, maks 1 g) + kontrendikasyon yoksa İV İbuprofen/Ketorolak + cerrahın topikal/Sub-Tenon lokal anesteziği.',
      '  - Kontrollü Normokapnik Ventilasyon (EtCO₂ 35-38 mmHg): Spontan hipoventilasyon ve hiperkapni OCR riskini 2-3 kat artırır!'
    ],
    airwayManagement: [
      'Esnek/spiralli Laringeal Maske (Flexible LMA) aspirasyon riski olmayan çocuk ve erişkinlerde pürüzsüz öksürüksüz uyanma sağladığı için mükemmel bir seçenektir.',
      'Küçük bebeklerde (<10 kg), reflü/aspirasyon riskinde veya zor pozisyonda Oral RAE (güney-kutuplu) veya spiralli kaflı ETT tercih edilir.'
    ],
    criticalSurgicalStages: [
      '1. Taraf ve Kas Planı Doğrulaması (Hangi Göz / Hangi Kas / Geriletme vs. Rezeksiyon).',
      '2. Forced Duction Testi (FDT) — Süksinilkolin verilmemiş olduğu teyit edilir!',
      '3. Konjonktival Peritomi (Forniks veya Limbal) ve Ekstraoküler Kasın Kanca ile Yakalanması.',
      '4. EKSTRAOKÜLER KAS TRAKSİYONU (ÖZELLİKLE MEDİAL REKTUS) — EN YÜKSEK OCR RİSKİ! (Gözler EKG\'de, sesli nabız açık!)',
      '5. Kasın Skleradan Ayrılması ve Yeni İnsersiyon Noktasına 6-0 Vikril ile Dikilmesi (Skleral perforasyon önlemi — hareketsizlik!).',
      '6. Konjonktiva Kapanışı, Topikal/Sub-Tenon Analjezi ve Göz Pomadı (genellikle göz kapatılmaz).'
    ],
    emergenceNotes: [
      'Pürüzsüz Uyanma ve Emergence Delirium Önlemi: Propofol TIVA ile sakin uyanma sağlanır; küçük çocuklarda düşük doz Deksmedetomidin (0.3-0.5 mcg/kg) veya uyanma öncesi 0.5-1 mg/kg Propofol ajitasyonu azaltır.',
      'PACU\'da kurtarma antiemetiği (farklı sınıf, örn. düşük doz Droperidol/Dimenhidrinat) hazır tutulur.',
      'Çoğu hasta PADSS ≥9 kriteriyle aynı gün taburcu edilir; erişkin ayarlanabilir sütür hastası ayarlama sonrası taburcu edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Şaşılık cerrahisi sonrası hafif-orta batma, göz hareketiyle ağrı ve konjonktival irritasyon görülür.',
      'Multimodal Opioid-Sparing Rejim: Düzenli Oral/İV Parasetamol (pediatrik 15 mg/kg; erişkin 1 g 6 sa) + Oral İbuprofen (pediatrik 10 mg/kg; erişkin 400 mg) + topikal/Sub-Tenon lokal anestezik + soğuk kompres.',
      'KAÇINILACAK AJANLAR: KODEİN ve TRAMADOL çocuklarda (<12 yaş ve OSA\'da <18 yaş FDA/EMA Black Box!) solunum depresyonu ve tüm yaşlarda şiddetli PONV nedeniyle KESİNLİKLE KULLANILMAZ!'
    ],
    prospectRecommendations: [
      'Şaşılık cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; 4th PONV Consensus (Gan et al. 2020) ve ESPA/APA Pediatrik PONV Kılavuzları doğrultusunda:',
      '  - Propofol TIVA + ikili antiemetik profilaksisi (Deksametazon + Ondansetron) + non-opioid multimodal analjezi (Parasetamol + NSAİİ + topikal/Sub-Tenon lokal) PONV\'yi %50-80\'den <%10-15\'e düşüren en güçlü kanıta dayalı pakettir.'
    ],
    erasRecommendations: [
      'Günübirlik Pediatrik & Erişkin Şaşılık Cerrahisi İlkeleri:',
      '  - ESAIC Pediatrik Açlık: Berrak sıvı 1 saat öncesine kadar serbest (dehidratasyon ve açlık kaynaklı PONV/ajitasyonu azaltır).',
      '  - Erken Oral Alım (zorlanmadan — zorla içirmek kusmayı tetikler!) ve PADSS ≥9 ile günübirlik taburculuk.',
      '  - Kırmızı Bayraklar: İlerleyici şiddetli göz ağrısı, görme kaybı veya yoğun pürülan akıntı (orbital selülit/endoftalmi) durumunda acil başvuru.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Strabismus Surgery. Wolters Kluwer / LWW.',
    erasReference: 'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting (Pediatric & Adult Strabismus High-Risk Protocols). Anesth Analg. 2020;131(2):411-448.',
    prospectReference: 'Şaşılık cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve antiemetik strateji 4th PONV Consensus (2020) ve Association of Paediatric Anaesthetists (APA) PONV Guidelines ilkelerine dayanmaktadır.',
    otherReferences: [
      'Frykholm P, Disma N, Andersson H, et al. Pre-operative fasting in children: A guideline from the European Society of Anaesthesiology and Intensive Care (ESAIC). Eur J Anaesthesiol. 2022;39(1):4-25.',
      'Rodgers A, Cox RG. Anesthetic management for pediatric strabismus surgery: continuing professional development. Can J Anaesth. 2010;57(6):602-617.',
      'Malignant Hyperthermia Association of the United States (MHAUS). Perioperative MH Crisis Guidelines & Triggering Agents.',
      'FDA Drug Safety Communication: Restricting the use of codeine and tramadol in children (2017).'
    ]
  }
};
