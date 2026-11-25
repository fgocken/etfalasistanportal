import { ProcedureDefinition } from '../../types/procedures';

/**
 * Pediatrik Konjenital Katarakt, Konjenital Glokom (Gonyotomi/Trabekülotomi) ve Anestezi Altında Muayene (EUA)
 * (Pediatric Congenital Cataract, Congenital Glaucoma Surgery & Examination Under Anesthesia [EUA])
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), ESAIC Pediatric Fasting Guidelines (2022),
 * Gan et al. 4th PONV Consensus (2020), AAO PPP: Pediatric Eye Evaluations & Childhood Glaucoma.
 */
export const pediatricCataractGlaucomaEua: ProcedureDefinition = {
  id: 'pediatric-cataract-glaucoma-eua',
  name: 'Pediatrik Konjenital Katarakt, Konjenital Glokom & Anestezi Altında Muayene (EUA)',
  shortCode: 'GOZ-PED-EUA-GLK',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  secondarySpecialties: ['cocuk_cerrahisi'],
  categoryTag: 'Pediatrik Oftalmoloji & EUA',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Yenidoğan, süt çocuğu ve küçük çocuklarda ambliyopiyi ve kalıcı körlüğü önlemek için uygulanan üç temel pediatrik göz girişimini kapsar: (1) Anestezi Altında Muayene (EUA): Doğru göz içi basıncı (GİB) tonometrisi, kornea çapı/pakimetri, gonyoskopi, fundus/retinoblastom muayenesi; (2) Konjenital Glokom Cerrahisi: Gonyotomi, trabekülotomi (360° GATT / klasik) veya glokom drenaj implantı; (3) Pediatrik Konjenital Katarakt Cerrahisi: Lens aspirasyonu + arka kapsülotomi + ön vitrektomi ± İOL implantasyonu (genellikle >1-2 yaş). Anestezi yönetimi açısından en benzersiz fizyolojik kritik nokta, anestezik ajanların (özellikle Sevofluran ve Propofol\'ün) GİB\'i %20-30 oranında yapay düşürerek konjenital glokomu maskeleyebilmesi ve pediatrik oftalmik damlaların (Brimonidin, Fenilefrin, Atropin/Siklopentolat) hayatı tehdit eden sistemik toksisitesidir.',
  indications: [
    'Primer Konjenital / İnfantil Glokom (Buftalmus, korneal bulanıklık, epifora, fotofobi) — EUA + Gonyotomi / Trabekülotomi',
    'Konjenital veya Gelişimsel Pediatrik Katarakt (Lökokori, nistagmus, derin ambliyopi riski — yaşamın ilk 6-8 haftasında acil olabilir!)',
    'Retinoblastom Tanı, Evreleme, Kemoterapi/Lazer/Kriyoterapi İzlemi (Tekrarlayan EUA)',
    'Pediatrik Üveit, Persistan Fetal Vaskülatür (PFV), Travma veya Kooperasyon Kurulamayan Göz Muayenesi'
  ],
  averageDuration: '15 - 90 dakika (İzole EUA: 15-25 dk; Gonyotomi/Trabekülotomi: 35-60 dk; Pediatrik Katarakt + Ön Vitrektomi: 45-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 15 mL (Sistemik kayıp ihmal edilebilir; ancak gonyotomi/trabekülotomide ön kamara hifeması görülebilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kayıp / Ancak Pediatrik Küçük Kan Volümü ve Ön Kamara Hifeması',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez',
    transfusionProbability: '< %0.01',
    criticalBleedingSources: [
      'Schlemm Kanalı Reflüsü (Gonyotomi / Trabekülotomi sonrası beklenen hafif-orta ön kamara hifeması)',
      'Ekspulsif Koroidal Hemoraji (Özellikle Sturge-Weber sendromlu koroidal hemanjiyomlu çocuklarda çok yüksek risk!)'
    ],
    hemostasisStrategies: [
      'Ön kamara viskoelastik / hava tamponadı ve cerrahi sonunda 30° baş elevasyonu',
      'Sturge-Weber sendromlu çocuklarda ani GİB düşüşünden, öksürükten ve hiperkapniden mutlak kaçınma'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'EUA (GİB Ölçümü Öncelikli): Hafif Sevofluran Yüz Maskesi İndüksiyonu (veya IM/IV Ketamin 3-5 mg/kg IM / 1-2 mg/kg IV) → Laringoskopi/LMA Öncesi İlk 1-3 Dakikada Hemen Tonometri → Ardından İleri Muayene/Cerrahi İçin LMA veya ETT',
      'Konjenital Katarakt & Glokom Cerrahisi: Genel Anestezi (LMA veya Küçük Bebekte Kaflı/Kafsız Pediatrik ETT) + Propofol TIVA veya Sevofluran + Normokapni + Çiftli PONV Profilaksisi'
    ],
    alternative: [
      'Kısa EUA\'da İntravenöz/İntranazal Deksmedetomidin + Topikal Anestezi (seçilmiş kooperasyonu kısmi veya GİB ölçümü kritik vakalarda; bradikardi izlemiyle)',
      'KONTRENDİKASYON: Pediatrik olgularda iğneli retrobulber/peribulber blok YAPILMAZ (yüksek perforasyon riski ve genel anestezi gerekliliği; cerrahi sonunda yalnızca topikal damla veya deneyimli elde künt Sub-Tenon analjezi)'
    ],
    clinicalRationale: 'Tüm inhalasyon anestezikleri (Sevofluran) ve Propofol GİB\'i hızla %20-30 düşürürken, laringoskopi/entübasyon ve ağlama/ıkınma GİB\'i yapay olarak yükseltir. Bu nedenle EUA\'da güvenilir GİB ölçümü için indüksiyondan hemen sonra (yüz maskesiyle hafif-orta planda, gözler santralize olur olmaz, LMA/ETT takılmadan!) cerrahın tonometri yapması altın kuraldır.',
    rulesTitle: 'PEDİATRİK KATARAKT, GLOKOM & EUA\'DA ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Pediatrik oftalmik anestezide hayati kurallar: (1) Sevofluran/Propofol GİB\'i %20-30 düşürerek glokomu maskeler (tonometri zamanlaması!) vs. Ketamin etkisi; (2) BRİMONİDİN (<2 yaş KESİN YASAK — santral apne/koma!), Fenilefrin %2.5 ve Atropin/Siklopentolat damla toksisiteleri; (3) Sendromik eşlikçiler (Down, Lowe, Marfan, Sturge-Weber, Pierre-Robin) ve zor havayolu; (4) Bebek normotermisi, normoglisemi ve ESAIC pediatrik açlık; (5) Pürüzsüz uyanma, laringospazm/emergence delirium önlemi ve çiftli PONV; (6) Kodein/Tramadol kesin yasağı.',
    indispensableRules: [
      {
        number: 1,
        title: 'SEVOFLURAN GİB\'İ %20–30 DÜŞÜREREK GLOKOMU MASKELER — TONOMETRİ ZAMANLAMASI!',
        content: 'Sevofluran ve Propofol indüksiyonu dakikalar içinde GİB\'i %20-30 azaltarak konjenital glokom tanısını maskeleyebilir (yanlış negatif!). KURAL: EUA\'da cerrah tonometri cihazıyla indüksiyon anında başucunda hazır bekler; Sevofluran (%5-6 → göz santralize olunca) ile derinleşmeden ve LMA/ETT takılmadan hemen ilk 1-3 dk içinde GİB ölçülür (maske göze ASLA bastırılmaz!). Ketamin GİB\'i minimal yükseltir veya nötr tutar ancak nistagmus/salivasyon yapabilir.'
      },
      {
        number: 2,
        title: 'PEDİATRİK OFTALMİK DAMLA TOKSİSİTESİ: BRİMONİDİN (<2 YAŞ YASAK!) VE FENİLEFRİN / ANTİKOLİNERJİKLER',
        content: 'Bebeklerde bir damla göz ilacı vücut ağırlığına oranla erişkinin 10-20 katı sistemik doz demektir! (a) BRİMONİDİN: Kan-beyin bariyerini geçerek santral α₂ agonizmasıyla derin letarji, bradikardi, hipotansiyon, HİPOTERMİ ve HAYATİ SANTRAL APNE/KOMA yapar — 2 yaş altında KESİNLİKLE KONTRENDİKEDİR (<6 yaşta kaçınılır); (b) FENİLEFRİN: Yalnızca %2.5 (asla %10 değil!) ve mikro-damla + punktum basısı ile; (c) ATROPİN / SİKLOPENTOLAT: Sıcak kuru cilt, taşikardi, ateş ve santral antikolinerjik deliryum/nöbet (ağır tabloda Fizostigmin); (d) TİMOLOL: Bebeklerde ciddi bradikardi, apne ve bronkospazm!'
      },
      {
        number: 3,
        title: 'SENDROMİK PEDİATRİK KATARAKT / GLOKOM EŞLİKÇİLERİ VE ZOR HAVAYOLU',
        content: 'Konjenital katarakt/glokom sıklıkla sistemik sendromlarla birliktedir: Down sendromu (atlantoaksiyel instabilite, konjenital kalp hastalığı, büyük dil), Sturge-Weber (koroidal hemanjiyom → ekspulsif kanama + nöbet), Lowe sendromu (renal tübüler asidoz, hipotoni), Marfan/Homosistinüri (aort kökü, tromboz), Stickler/Pierre-Robin (mikrognati → ZOR HAVAYOLU!). Preop tarama zorunludur.'
      },
      {
        number: 4,
        title: 'YENİDOĞAN / BEBEK NORMOTERMİSİ, NORMOGLİSEMİ VE SIVI DENGESİ',
        content: 'Özellikle yaşamın ilk 6-8 haftasında opere edilen konjenital katarakt bebeklerinde hipotermi (hedef 36.5-37.5°C), hipoglisemi ve postoperatif apne riski yüksektir. Aktif sıcak hava battaniyesi, ısıtılmış IV sıvılar, kan şekeri takibi ve post-konsepsiyonel yaşı (PCA) <45-60 hafta olan prematüre bebeklerde 24 saat postop apne monitörizasyonu zorunludur.'
      },
      {
        number: 5,
        title: 'İNTRAOKÜLER CERRAHİDE SIFIR ÖKSÜRÜK, ÇİFT PONV VE EMERGENCE DELİRİUM ÖNLEMİ',
        content: 'Pediatrik katarakt/glokom cerrahisinde göz içinde 10-0 dikişler veya taze gonyotomi/trabekülotomi hattı vardır. İndüksiyonda Deksametazon (0.15 mg/kg) + bitimde Ondansetron (0.1 mg/kg) ile çift PONV profilaksisi, normokapni ve uyanmada düşük doz Deksmedetomidin (0.3-0.5 mcg/kg) veya Propofol bolusu (0.5-1 mg/kg) ile hem laringospazm hem de emergence delirium önlenir.'
      },
      {
        number: 6,
        title: 'PEDİATRİK KODEİN VE TRAMADOL MUTLAK YASAĞI (FDA / EMA BLACK BOX)',
        content: 'Çocuklarda CYP2D6 ultra-hızlı metabolizör riski ve şiddetli PONV nedeniyle KODEİN ve TRAMADOL KESİNLİKLE KULLANILMAZ! Temel analjezi: İV/Oral Parasetamol (10-15 mg/kg; yenidoğanda 7.5-10 mg/kg) + topikal/Sub-Tenon lokal anestezik.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Pediatrik Oftalmoloji: Girişim kapsamı (yalnız EUA mı, yoksa aynı seansta gonyotomi/katarakt mı?), tonometri zamanlama koordinasyonu ve damla listesi.',
      'Pediatri / Pediatrik Kardiyoloji (Sendromik/Konjenital Kalp/Prematürite Varsa): Down, Sturge-Weber, Lowe, Marfan, metabolik hastalık veya prematürite apne riski değerlendirmesi.',
      'Anestezi Değerlendirmesi: Post-konsepsiyonel yaş (PCA), son 2-4 haftada ÜSYE/bronşiyolit öyküsü, zor havayolu bulguları ve ESAIC açlık saatleri.'
    ],
    historyAndPhysical: [
      'Doğum Haftası ve Post-Konsepsiyonel Yaş (PCA): Prematüre bebeklerde (PCA <45-60 hf) günübirlik taburculuk YAPILMAZ — 24 saat apne monitörü gerekir.',
      'Kullanılan Göz Damlaları: Brimonidin, Timolol, Asetazolamid (hipokalemi/metabolik asidoz), Pilokarpin veya Siklopentolat/Atropin kullanımı mutlaka sorgulanır.',
      'Eşlik Eden Sendrom / Nöbet / Kardiyak Üfürüm ve Son ÜSYE Öyküsü.'
    ],
    laboratoryAndTests: [
      'Sağlıklı term bebek/çocukta izole EUA ve rutin pediatrik göz cerrahisinde RUTİN LABORATUVAR VE EKG GEREKMEZ.',
      'Klinik Endikasyon Bazlı Tetkikler: Asetazolamid veya Lowe sendromu olanlarda elektrolitler/bikarbonat (K⁺, HCO₃⁻), prematüre yenidoğanda Hb/Hct ve kan şekeri, konjenital kalp hastalığında EKG/EKO.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Pediatrik Monitörizasyon: 5 derivasyonlu EKG (OCR alarmı — sesli nabız açık!), pre/post-duktal SpO₂ (yenidoğanda), EtCO₂, uygun manşonlu NIBP ve Core Vücut Sıcaklığı.',
      'Küçük Bebeklerde / Uzun Vakada: Parmak ucu kan şekeri takibi ve kantitatif TOF (NMB kullanıldıysa).'
    ],
    vascularAccess: [
      '1 adet güvenli pediatrik IV damar yolu (22-24G — izole 10 dakikalık EUA\'da deneyimli pediatrik anestezi ekibiyle maske altında IV\'süz yönetim uygulanabilse de cerrahi/glokom/bradikardi riski olan her olguda IV yol ZORUNLUDUR).',
      'Acil OCR Kiti: İV Atropin (0.02 mg/kg, min 0.1 mg) ve pediatrik resüsitasyon doz kartı hazır.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Pediatrik Baş Halkası ve Aktif Isıtma',
    patientPositionDetails: [
      'Bebek/çocuk vücut sıcaklığını korumak için salon önceden ısıtılır ve sıcak hava üfleyici battaniye kullanılır.',
      'Baş pediatrik silikon halka ile nötral sabitlenir; omuz altına küçük rulo ile hava yolu ekseni korunur (Down sendromunda servikal hiperekstansiyondan kaçınılır!).'
    ],
    anesthesiaManagement: [
      'EUA — Güvenilir GİB Ölçümü Protokolü:',
      '  - Sevofluran (%5-6 → göz santralize olunca %2-3) ile nazik maske indüksiyonu (maske göze değmez!).',
      '  - İndüksiyonun 1-3. dakikasında, hava yolu aleti (LMA/ETT) yerleştirilmeden HEMEN ÖNCE cerrah tonometri ile GİB\'i ölçer (gecikilirse Sevofluran GİB\'i %20-30 düşürerek glokomu gizler!).',
      '  - Alternatif: Tek başına kısa tonometri EUA\'sında IM/IV Ketamin (1-2 mg/kg IV veya 3-5 mg/kg IM) GİB\'i düşürmeden ölçüm imkanı sunar (ancak sekresyon ve nistagmusa dikkat).',
      'Konjenital Katarakt / Glokom Cerrahisi İdamesi:',
      '  - LMA (seçilmiş >5-10 kg çocuk) veya kaflı/kafsız Oral RAE/spiralli pediatrik ETT (yenidoğan/küçük bebek ve uzun intraoküler cerrahide).',
      '  - Propofol TIVA veya Sevofluran + Remifentanil/Fentanil (N₂O kullanılmaz!).',
      '  - Normokapni (EtCO₂ 35-38 mmHg) ve intraoküler aşamada tam hareketsizlik (katarakt/ön vitrektomide Rokuronyum 0.6 mg/kg + TOF).',
      '  - Çiftli PONV Profilaksisi: İV Deksametazon (0.15 mg/kg) + İV Ondansetron (0.1 mg/kg).',
      '  - Topikal damla damlatılırken nazolakrimal punktuma 1-2 dakika nazik bası uygulanarak sistemik emilim azaltılır.'
    ],
    airwayManagement: [
      'İzole kısa EUA: Yüz maskesi → gerekirse LMA.',
      'Yenidoğan, <6 ay bebek ve intraoküler katarakt/glokom cerrahisi: Oral RAE veya spiralli pediatrik ETT (kaf basıncı ≤20 cmH₂O).',
      'Kapanışta laringospazm ve öksürüğü önlemek için nazik aspirasyon ve pürüzsüz uyanma sağlanır.'
    ],
    criticalSurgicalStages: [
      '1. Taraf ve İşlem Doğrulaması (EUA vs. Gonyotomi vs. Katarakt) + Normotermi Hazırlığı.',
      '2. EUA GİB Tonometrisi (LMA/ETT Öncesi İlk 1-3 Dakika — Maske Basısı Sıfır!).',
      '3. Kornea Çapı, Gonyoskopi ve Fundus / Retinoblastom Değerlendirmesi.',
      '4. Cerrahiye Geçilecekse LMA/ETT Güvenli Fiksasyonu ve Sulu %5 Povidon-İyot.',
      '5. Gonyotomi / Trabekülotomi (Hifema kontrolü) veya Pediatrik Lens Aspirasyonu + Arka Kapsülotomi + Ön Vitrektomi (Sıfır hareket!).',
      '6. 10-0 Sütür Kapanışı, Topikal/Sub-Tenon Analjezi ve Basısız Pediatrik Koruyucu Kalkan.'
    ],
    emergenceNotes: [
      'Pürüzsüz Uyanma: İntraoküler dikişlerin korunması ve pediatrik emergence deliriumun önlenmesi için düşük doz Deksmedetomidin (0.3-0.5 mcg/kg) veya uyanma öncesi Propofol (0.5-1 mg/kg) uygulanır; NMB kullanıldıysa Sugammadeks ile TOF ≥0.9 doğrulanır.',
      'Brimonidin/Timolol maruziyeti veya prematürite (PCA <45-60 hf) varsa hasta 24 saat apne/bradikardi monitörizasyonu altında hastanede izlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'EUA ağrısızdır; konjenital katarakt ve gonyotomi/trabekülotomi sonrası hafif-orta batma/ağrı olur.',
      'Bazal Analjezi: İV/Oral Parasetamol (çocuk 15 mg/kg 6 sa; yenidoğan 7.5-10 mg/kg) + cerrahın topikal/Sub-Tenon lokal anesteziği.',
      'KAÇINILACAK AJANLAR: KODEİN ve TRAMADOL pediatride KESİNLİKLE KONTRENDİKEDİR (FDA/EMA Black Box — solunum depresyonu ve PONV!). Gonyotomi/trabekülotomide hifema riski nedeniyle erken dönemde agresif NSAİİ\'lerden kaçınılır.'
    ],
    prospectRecommendations: [
      'Pediatrik oftalmik cerrahi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ve ESAIC Pediatrik Anestezi ilkeleri doğrultusunda:',
      '  - Çiftli PONV profilaksisi (Deksametazon + Ondansetron) + Parasetamol + topikal/Sub-Tenon lokal analjezi güvenli opioid-sparing konfor sağlar.'
    ],
    erasRecommendations: [
      'Pediatrik Oftalmik Perioperatif Bakım İlkeleri:',
      '  - ESAIC Pediatrik Açlık: Berrak sıvı 1 sa, anne sütü 3 sa, mama/hafif katı 4-6 sa.',
      '  - Term ve sağlıklı çocukta izole EUA günübirlik (PADSS ≥9); prematüre (PCA <45-60 hf), sendromik veya bilateral intraoküler cerrahide gece gözlem/apne monitörü.',
      '  - Çocuğun gözünü ovuşturmasını önlemek için koruyucu kalkan ve gerekirse dirsek ateli (arm splints) ebeveyne öğretilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Pediatric Ophthalmic Procedures & Examination Under Anesthesia. Wolters Kluwer / LWW.',
    erasReference: 'Frykholm P, Disma N, Andersson H, et al. Pre-operative fasting in children: A guideline from the European Society of Anaesthesiology and Intensive Care (ESAIC). Eur J Anaesthesiol. 2022;39(1):4-25.',
    prospectReference: 'Pediatrik oftalmik cerrahi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV stratejisi 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'Mikhail M, Sabri K, Levin AV. Effect of anesthesia on intraocular pressure measurement in children. Surv Ophthalmol. 2017;62(5):648-658.',
      'Berlin RJ, Lee UT, Samples JR, et al. Ophthalmic drops causing coma in an infant (Brimonidine central toxicity). J Pediatr. 2001;138(3):441-443.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Pediatric Eye Evaluations.'
    ]
  }
};
