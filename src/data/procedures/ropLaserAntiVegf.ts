import { ProcedureDefinition } from '../../types/procedures';

/**
 * Prematüre Retinopatisi (ROP) Lazer Fotokoagülasyonu & İntravitreal Anti-VEGF Girişimi
 * (Retinopathy of Prematurity [ROP]: Diode/Argon Laser Photocoagulation and Intravitreal Anti-VEGF Injection)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), AAP / AAO / AAPOS Policy Statement on ROP,
 * COT & BOOST-II SpO2 Target Trials (NEJM), ESAIC Pediatric Fasting Guidelines (2022), ASA OR Fire Advisory (2013).
 */
export const ropLaserAntiVegf: ProcedureDefinition = {
  id: 'rop-laser-anti-vegf',
  name: 'Prematüre Retinopatisi (ROP): Lazer Fotokoagülasyon & İntravitreal Anti-VEGF Girişimi',
  shortCode: 'GOZ-ROP-LAZER',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  secondarySpecialties: ['cocuk_cerrahisi'],
  categoryTag: 'Yenidoğan / NICU & Pediatrik Retina',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Çok düşük doğum ağırlıklı (<1500 g) ve düşük gestasyonel yaşlı (<30-32 hafta) prematüre bebeklerde gelişen avasküler retina neovaskülarizasyonunun (Prematüre Retinopatisi — ROP) retina dekolmanına ve kalıcı körlüğe ilerlemesini durdurmak amacıyla uygulanan acil pediatrik/yenidoğan retina girişimleridir. İki temel tedavi uygulanır: (1) İndirekt Diyot/Argon Lazer Fotokoagülasyonu (60-120 dk; şiddetli ağrı, uzun immobilizasyon, blefarosta/skleral indentasyon ve yüksek apne/bradikardi riski nedeniyle genellikle entübe genel anestezi gerektirir — ameliyathane veya NICU yatak başında [NORA]); (2) İntravitreal Anti-VEGF (Bevasizumab / Ranibizumab) Enjeksiyonu (5-15 dk; çok hızlı olduğundan genellikle topikal anestezi + oral sukroz ± minimal analjezi/NICU izlemi ile yapılır).',
  indications: [
    'Tip 1 ROP (Acil Tedavi Endikasyonu — tanıdan itibaren 48-72 saat içinde!): Zon I herhangi bir evrede Plus hastalığı, Zon I Evre 3 (Plus olmasa da), Zon II Evre 2 veya 3 + Plus hastalığı',
    'Agresif Posterior ROP (A-ROP): Hızla retina dekolmanına ilerleyen şiddetli vasküler hastalık (sıklıkla Anti-VEGF veya lazer)',
    'Lazer Sonrası Nüks veya İntravitreal Anti-VEGF Sonrası Reaktivasyon Olguları'
  ],
  averageDuration: 'İntravitreal Anti-VEGF: 10 - 15 dakika · Bilateral Lazer Fotokoagülasyon: 45 - 120 dakika',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 1 - 2 mL (Kan kaybı yoktur; ancak prematüre bebeklerde 80-90 mL/kg toplam kan volümü nedeniyle gereksiz kan alımlarından kaçınılır)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Prematüre Kardiyorespiratuvar ve Apne Riski Çok Yüksek!',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (ancak preop prematürite anemisi [Hb/Hct] kontrol edilir)',
    transfusionProbability: '< %1 (Yalnızca derin prematürite anemisi varsa NICU protokolüyle)',
    criticalBleedingSources: [
      'Girişim kaynaklı kanama beklenmez; prematüre bebekte asıl hayatı tehdit eden riskler postop santral apne, bradikardi/OCR, hipotermi, hipoglisemi ve intraventriküler kanamayı (İVK) tetikleyen ani KB/CO₂ dalgalanmalarıdır!'
    ],
    hemostasisStrategies: [
      'Atravmatik ventilasyon (barotravma ve hiperkapni/hipokapni dalgalanmalarından kaçınma → İVK koruması)',
      'Sıkı normotermi (36.5-37.5°C) ve normoglisemi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'ROP Lazer Fotokoagülasyonu: Yenidoğan Endotrakeal Genel Anestezi (GETA — Düşük Doz Sevofluran veya Remifentanil + Hava/O₂ ile SpO₂ %90-95 Hedefi!) + Kontrollü Ventilasyon + Postop 24-48 Saat NICU Apne Monitörü — ALTIN STANDARTTIR',
      'İntravitreal Anti-VEGF Enjeksiyonu: Topikal Damla (Proparakain %0.5) + Oral %24 Sukroz + Kundaklama (NICU yatak başında; entübasyon ve genel anestezi stresinden kaçınmak için ilk tercihtir)'
    ],
    alternative: [
      'NICU\'da Entübe Haldeki Bebekte Yatak Başı (NORA) Lazer: Halihazırda mekanik ventilatörde olan kırılgan bebeklerde transport hipotermisi ve ekstübasyon riskini önlemek için NICU kuvözünde IV Fentanil/Remifentanil + kas gevşetici/sedasyonla uygulanabilir (lazer güvenlik kurallarıyla!)',
      'Sub-Tenon / Topikal + Sedasyon ile Lazer: Yalnızca yüksek deneyimli merkezlerde seçilmiş olgularda; prematüre bebekte sedasyon altında korumasız hava yolu yüksek apne/desatürasyon riski taşır'
    ],
    clinicalRationale: 'Prematüre bebeklerde (post-konsepsiyonel yaş [PCA] <45-60 hafta, sıklıkla 1000-2200 g) bronkopulmoner displazi (BPD), prematüre apnesi, patent duktus arteriozus (PDA), hipotermi ve hipoglisemi riski olağanüstü yüksektir. Lazer tedavisinde kontrollü ETT ventilasyonu ile hem hiperoksiden (SpO₂ %90-95) hem de hipoksemi/hiperkapniden (İVK riski) korunur; Anti-VEGF ise kısa olduğu için genel anestezi yükü olmadan topikal+sukrozla yapılır.',
    rulesTitle: 'ROP LAZER & ANTİ-VEGF GİRİŞİMİNDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Prematüre ROP anestezisinde hayati kurallar: (1) HİPEROKSİDEN KAÇINMA: SpO₂ %90-95 hedefi (FiO₂ mümkün olan en düşük düzeyde!); (2) POSTOP SANTRAL APNE: 24-48 saat zorunlu NICU apne/bradikardi monitörü + Kafein sitrat (GÜNÜBİRLİK TABURCULUK KESİN YASAK!); (3) MİDRİYATİK DAMLA TOKSİSİTESİ: Siklopentolat + Fenilefrin ile NEK (nekrotizan enterokolit), ileus, hipertansiyon ve apne riski (mikro-damla + punktum basısı!); (4) HİPOTERMİ & HİPOGLİSEMİ koruması; (5) Skleral indentasyonda şiddetli OCR / bradikardi; (6) LAZER GÖZ VE YANGIN GÜVENLİĞİ (tüm ekibe dalga boyuna uygun lazer gözlüğü + düşük FiO₂).',
    indispensableRules: [
      {
        number: 1,
        title: 'HİPEROKSİDEN KAÇINMA: HEDEF SpO₂ %90–95 (COT / BOOST-II KANITI)!',
        content: 'Yüksek FiO₂ ve hiperoksi (SpO₂ >%95-98) prematüre retinada vasküler obliterasyonu ve ROP progresyonunu, ayrıca bronkopulmoner displaziyi (BPD) şiddetlendirir! Oksijen-hava karıştırıcısı (blender) ile SpO₂ %90-95 (alarm limitleri %88-95) aralığında tutulur; %100 O₂ yalnızca gerçek hipoksemi/resüsitasyon anında kısa süreli kullanılır.'
      },
      {
        number: 2,
        title: 'POSTOPERATİF SANTRAL APNE VE ZORUNLU 24–48 SAAT NICU MONİTÖRİZASYONU!',
        content: 'Post-konsepsiyonel yaşı (PCA) <45-60 hafta olan prematüre bebeklerde genel anestezi sonrası santral apne ve bradikardi insidansı %20-40\'a ulaşır (anemi [Hct <%30] ve opioid kullanımı riski katlar!). KURAL: Günübirlik taburculuk KESİNLİKLE YASAKTIR! Tüm bebekler en az 24-48 saat NICU\'da sürekli apne/SpO₂/EKG monitöründe izlenir; profilaktik/devam eden IV Kafein Sitrat (yükleme 20 mg/kg veya idame 5-10 mg/kg/gün) apne riskini anlamlı azaltır.'
      },
      {
        number: 3,
        title: 'MİDRİYATİK DAMLA TOKSİSİTESİ: SİKLOPENTOLAT + FENİLEFRİN → NEK, İLEUS, HİPERTANSİYON VE APNE!',
        content: 'ROP muayenesi/lazeri öncesi damlatılan kombine Siklopentolat (%0.5) + Fenilefrin (%2.5 — ASLA %10 DEĞİL!) prematüre bebekte hızla sistemik emilerek mezenterik vazokonstriksiyon → BESLENME İNTOLERANSI, İLEUS, NEKROTİZAN ENTEROKOLİT (NEK), hipertansif kriz (İVK riski!) ve santral apne yapabilir! En düşük konsantrasyon, mikro-damla, damla sonrası 1-2 dk nazolakrimal punktum basısı ve fazla damlanın silinmesi zorunludur.'
      },
      {
        number: 4,
        title: 'HİPOTERMİ (36.5–37.5°C) VE HİPOGLİSEMİ KORUMASI',
        content: 'Prematüre bebek dakikalar içinde ısı kaybeder (hipotermi → apne, bradikardi, asidoz, pulmoner hipertansiyon!). Ameliyathane sıcaklığı 25-27°C\'ye çıkarılır, ısıtıcı şilte/radyan ısıtıcı/şapka/sıcak hava battaniyesi kullanılır, transport ısıtmalı kuvözle yapılır ve Dekstroz içeren idame sıvısı + saatlik kan şekeri takibi (hedef >50-70 mg/dL) sağlanır.'
      },
      {
        number: 5,
        title: 'SKLERAL İNDENTASYONDA OKÜLOKARDİYAK REFLEKS (OCR) VE İVK KORUMASI',
        content: 'Lazer sırasında blefarosta ve skleral indentatör basısı prematüre bebekte ani derin bradikardi ve desatürasyon tetikler (1. adım cerrahı durdur → oksijenasyon/ventilasyon kontrol → düzelmezse İV Atropin 0.02 mg/kg [min 0.1 mg]). Germinal matriks / intraventriküler kanamayı (İVK) önlemek için ani KB pikleri, hipokapni (<35 mmHg) ve hiperkapni (>50 mmHg) kesinlikle engellenir.'
      },
      {
        number: 6,
        title: 'LAZER GÖZ GÜVENLİĞİ VE YANGIN ÖNLEMİ',
        content: 'Diyot (810 nm) veya Argon (532 nm) lazer çalıştırılmadan önce salondaki TÜM personel (anestezi, cerrah, hemşire) ilgili dalga boyuna uygun lazer koruyucu gözlük takmalı, kapıya "LAZER KULLANIMDA" uyarı levhası asılmalı ve düşük FiO₂ ile yangın güvenliği sağlanmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Neonatoloji (NICU) Konsültasyonu: Gestasyonel yaş, güncel ağırlık, PCA, bronkopulmoner displazi (BPD) ve bazal O₂ ihtiyacı, apne öyküsü/Kafein tedavisi, PDA/KAH, İVK evresi, NEK/beslenme durumu ve vaka sonrası NICU yatağı/ventilatör teyidi.',
      'Pediatrik Oftalmoloji / Retina: Lazer (süre, bilateral) vs. Anti-VEGF seçimi ve mikro-damla midriyatik protokolü.',
      'Anestezi Değerlendirmesi: Mevcut IV/PICC/UVC hattı, havayolu/ETT numarası (2.5-3.5 mm), anemi (Hct <%30 apne riski!) ve ESAIC yenidoğan açlık saatleri.'
    ],
    historyAndPhysical: [
      'Doğum Haftası, Post-Konsepsiyonel Yaş (PCA) ve Güncel Ağırlık (gram cinsinden kesin tartım!).',
      'Solunum Durumu: BPD, ev/NICU O₂ veya CPAP/HFNC ihtiyacı, son 48 saatteki apne-bradikardi atak sayısı ve Kafein Sitrat dozu.',
      'Kardiyovasküler & Nörolojik Durum: PDA, pulmoner hipertansiyon, önceki İVK ve NEK öyküsü (midriyatik damla sonrası batın distansiyonu kontrolü!).'
    ],
    laboratoryAndTests: [
      'Güncel Hemogram (Hb/Hct — Hct <%30 postop apne riskini anlamlı artırır!), Kan Şekeri ve Serum Elektrolitleri (Na⁺, K⁺, iCa²⁺).',
      'BPD veya solunum desteği olan bebekte güncel kapiller/venöz kan gazı (bazal PaCO₂/HCO₃⁻ hedefi için) ve varsa güncel EKO/kraniyal USG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Yenidoğan ASA Monitörizasyonu: 3/5 derivasyonlu EKG (OCR sesli tonu açık!), Pre-duktal (sağ el) SpO₂ (alarm %88-%95), düşük ölü boşluklu EtCO₂, yenidoğan manşonlu NIBP ve Core Sıcaklık probu (36.5-37.5°C).',
      'Kan Şekeri İzlemi (uzun lazer vakasında intraop ara ölçüm).'
    ],
    vascularAccess: [
      'NICU\'da önceden açılmış güvenli 24G periferik IV veya PICC hattı (hava kabarcığına karşı sıfır hava disiplini — PDA/PFO nedeniyle paradoksal emboli riski!).',
      'Sıvı: Dekstroz içeren izotonik dengeli idame (örn. %5 Dekstroz + dengeli elektrolit, 4 mL/kg/sa; infüzyon pompası zorunlu — el ile bolus/yükleme YAPILMAZ!).',
      'Acil İlaçlar Gram Bazında Hazır: Atropin (0.02 mg/kg), Adrenalin (10 mcg/kg — 1:10.000), Kafein Sitrat.'
    ],
    patientPosition: 'Supin (Sırtüstü), Isıtmalı Kuvöz / Radyan Isıtıcılı Masada Nötral Baş',
    patientPositionDetails: [
      'Salon sıcaklığı 25-27°C; bebek şapka, ısıtıcı jel şilte ve sıcak hava üfleyici ile sarılır (sıfır ısı kaybı!).',
      'Omuz altı küçük rulo ile yenidoğan büyük oksiputu dengelenir; ETT dudak hizası (cm) sürekli doğrulanır (1 cm kayma bile endobronşiyal entübasyon veya kazara ekstübasyon yapar!).'
    ],
    anesthesiaManagement: [
      'İntravitreal Anti-VEGF (Kısa İşlem — 10-15 dk):',
      '  - NICU yatak başında topikal Proparakain %0.5 + oral %24 Sukroz + kundaklama + sürekli SpO₂/EKG monitörizasyonu (genel anestezi stresinden kaçınılır).',
      'ROP Lazer Fotokoagülasyonu (GETA):',
      '  - İndüksiyon: Düşük doz Sevofluran veya IV Propofol/Remifentanil + Rokuronyum/Atrakuryum (0.5 mg/kg) veya düşük doz Fentanil (1-2 mcg/kg) ile atravmatik entübasyon (2.5-3.5 mm ETT).',
      '  - İdame: Düşük doz Sevofluran (%1.5-2) + Remifentanil (0.05-0.15 mcg/kg/dk — ultra-kısa etkili, postop apne yapmaz!) veya düşük doz Fentanil; Hava/O₂ karışımı ile SpO₂ %90-95 hedeflenir (N₂O KULLANILMAZ!).',
      '  - Ventilasyon: Basınç kontrollü yenidoğan ventilasyonu (TV 4-6 mL/kg, PEEP 4-5 cmH₂O, normokapni / BPD\'de bazal PaCO₂\'ye saygı).',
      '  - Analjezi: İV Parasetamol (7.5-10 mg/kg yükleme/idame) + topikal Proparakain damla (uzun etkili opioidlerden apne riski nedeniyle kaçınılır!).',
      '  - Kafein Sitrat: NICU\'da almıyorsa postop apneyi önlemek için IV Kafein Sitrat (10-20 mg/kg yavaş infüzyon) neonatoloji ile koordine edilir.'
    ],
    airwayManagement: [
      'Yenidoğan/prematüre uygun çaplı (2.5 - 3.5 mm) ETT + düşük ölü boşluklu devre + nemlendirici filtre.',
      'Mikro-kaf veya kafsız tüpte minimal kaçak (15-20 cmH₂O) teyit edilir; tüp kaymasını önlemek için baş sabit tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Salon Isıtması (25-27°C), Lazer Gözlüklerinin Dağıtılması ve SpO₂ %90-95 Blender Ayarı.',
      '2. Mikro-Damla Midriyatik Takibi (Punktum Basısı — Taşikardi/Hipertansiyon/Batın Kontrolü).',
      '3. Atravmatik Yenidoğan Entübasyonu ve ETT Derinliğinin Teyidi.',
      '4. Blefarosta ve Skleral İndentasyon (OCR Bradikardi Alarmı!).',
      '5. Bilateral 360° İndirekt Lazer Fotokoagülasyonu (45-120 dk — Normotermi, Normoglisemi ve SpO₂ %90-95).',
      '6. Kapanış, Tam NMB Antagonizasyonu, Isıtmalı Kuvözle NICU Transportu.'
    ],
    emergenceNotes: [
      'Ekstübasyon Kararı: Bebek tam normotermik (>36.5°C), normoglisemik, düzenli güçlü spontan solunumu olan ve NMB\'si tam geri dönmüşse ekstübe edilir; ağır BPD, <1500 g veya uzun/instabil vakada ENTÜBE olarak ısıtmalı kuvözle NICU\'ya devredilmesi daha güvenlidir!',
      'ZORUNLU NICU İZLEMİ: Tüm prematüre ROP hastaları postoperatif en az 24-48 saat NICU\'da apne, bradikardi, SpO₂ (%90-95) ve midriyatik damla sonrası beslenme toleransı (NEK!) açısından takip edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Lazer fotokoagülasyon sonrası hafif-orta konjonktival ödem ve rahatsızlık gelişir.',
      'Opioid-Free / Minimal Opioid Rejim: İV/Oral Parasetamol (prematüre/yenidoğan dozlaması: 7.5-10 mg/kg 8-12 sa, neonatoloji doz tablosuna göre!) + oral sukroz + topikal lubrikasyon.',
      'KAÇINILACAK AJANLAR: Prematüre bebekte solunum depresyonu ve santral apne yapan uzun etkili opioidler, KODEİN ve TRAMADOL KESİNLİKLE KULLANILMAZ!'
    ],
    prospectRecommendations: [
      'Prematüre ROP girişimleri için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; AAP/AAO ROP ve Neonatal Anestezi kılavuzları doğrultusunda:',
      '  - Kısa etkili Remifentanil + yenidoğan dozlu Parasetamol + topikal anestezi + Kafein Sitrat kombinasyonu postop apne riskini minimize eder.'
    ],
    erasRecommendations: [
      'NICU / Neonatal Perioperatif Güvenlik İlkeleri:',
      '  - 24-48 Saat NICU Apne/Bradikardi Monitörizasyonu (Günübirlik taburculuk KESİN YASAK!).',
      '  - SpO₂ %90-95 Hedefinin NICU\'da Sürdürülmesi.',
      '  - Beslenme Toleransı Takibi: Midriyatik damlalar sonrası ileus/NEK dışlanarak enteral beslenmeye kademeli dönüş.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Retinopathy of Prematurity (Cryotherapy and Laser Photocoagulation). Wolters Kluwer / LWW.',
    erasReference: 'Fierson WM; American Academy of Pediatrics (AAP), American Academy of Ophthalmology (AAO), American Association for Pediatric Ophthalmology and Strabismus (AAPOS). Screening Examination of Premature Infants for Retinopathy of Prematurity. Pediatrics. 2018;142(6):e20183061.',
    prospectReference: 'Prematüre ROP girişimleri için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; perioperatif strateji AAP/AAO ROP kılavuzları, COT/BOOST-II SpO₂ kanıtları ve ESAIC Pediatrik Anestezi ilkelerine dayanmaktadır.',
    otherReferences: [
      'Schmidt B, Whyte RK, Asztalos EV, et al. (COT Trial). Effects of targeting higher vs lower arterial oxygen saturations on death or disability in extremely preterm infants. JAMA. 2013;309(20):2111-2120.',
      'BOOST II United Kingdom, Australia, and New Zealand Collaborative Groups. Oxygen saturation and outcomes in preterm infants. N Engl J Med. 2013;368(22):2094-2104.',
      'Mitchell A, Hall RW, Erickson SW, et al. Systemic absorption of cyclopentolate and adverse events after retinopathy of prematurity exams. Curr Eye Res. 2016;41(12):1601-1607.',
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.'
    ]
  }
};
