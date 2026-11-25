import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kornea Nakli (Keratoplasti): Penetran Keratoplasti (PKP) ve Lameller Kornea Nakli (DALK, DSAEK, DMEK)
 * (Corneal Transplant / Penetrating and Lamellar Keratoplasty)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * Gan et al. 4th PONV Consensus (2020), ASRA 5th Ed. (2025), ASA OR Fire Advisory (2013).
 */
export const cornealTransplant: ProcedureDefinition = {
  id: 'corneal-transplant',
  name: 'Kornea Nakli (Keratoplasti): Penetran Keratoplasti (PKP) ve Lameller Kornea Nakli (DALK, DSAEK, DMEK)',
  shortCode: 'GOZ-KERATOPLASTI',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Kornea & Ön Segment Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Gözün en ön saydam tabakası olan korneanın hastalık, travma, enfeksiyon veya distrofiler sonucu saydamlığını veya optik biçimini kaybetmesi durumunda, donör göz bankasından temin edilen sağlıklı insan korneası ile değiştirilmesi (allogreft transplantasyonu) ameliyatıdır. İki ana grupta icra edilir: (1) Penetran Keratoplasti (PKP - Tam Kat Kornea Nakli): Kornea trefini ile hastanın hastalıklı korneasından 7.5 - 8.5 mm çapında tam kat yuvarlak bir düğme kesilip çıkarılır; göz küresi dakikalarca tamamen "açık küre" (open-sky) haline gelir. Ardından donör kornea düğmesi alıcı yatağa 16 tekli veya devamlı 10-0 naylon mikrosütürle dikilir. Skleral kollapsı önlemek için sklera üzerine metal Flieringa halkası dikilebilir. (2) Lameller Keratoplasti: Yalnızca hastalıklı kornea katmanının değiştirildiği seçici mikrocerrahidir. DALK yönteminde endotel korunarak stroma değiştirilir; DSAEK ve DMEK yöntemlerinde yalnızca kornea endoteli ve Descemet zarı değiştirilir ve ön kamaraya verilen hava veya %20 SF₆ gaz kabarcığı ile greft arkadan stromaya yapıştırılır.',
  indications: [
    'Keratokonus: İlerleyici kornea dikleşmesi, incelmesi ve gözlük/kontakt lensle düzeltilemeyen ileri evre ektaziler',
    'Psödofakik ve Afakik Büllöz Keratopati (PBK): Önceki katarakt veya ön segment cerrahileri sonrası kornea endotel yetmezliği ve kronik kornea ödemi (DMEK / DSAEK veya PKP)',
    'Fuchs Endotelyal Distrofisi: Genetik endotel kaybına bağlı kornea matlaşması ve görme kaybı',
    'Kornea Skarları ve Lökomlar: Geçirilmiş travma, kornea perforasyonu veya enfeksiyöz keratit (Herpes simplex, bakteriyel veya fungal ülser) sekeli',
    'Kornea Greft Rejeksiyonu ve Yetmezliği: Önceki kornea naklinin reaksiyon veya yaşlanma sonucu saydamlığını kaybetmesi (Re-PKP)'
  ],
  averageDuration: '1.0 - 2.5 saat (Standart PKP: 60-90 dk; Katarakt + İOL ile kombine "Triple Procedure": 90-120 dk; DALK: 75-100 dk; DMEK / DSAEK: 45-75 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 10 - 20 mL (Kornea avaskülerdir; kanama yalnızca konjonktiva, episklera veya Flieringa halkası dikişlerinden kaynaklanan minimal sızıntılardır)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Açık Kürede Katastrofik Ekspulsif Koroidal Kanama Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal / Koroidal Hemoraji: Trefinasyon sonrası "open-sky" evresinde ani intraoküler hipotansiyon, öksürük veya ıkınma ile arka siliyer arterlerin yırtılması (gözün kaybına yol açabilen en ağır komplikasyon)',
      'İris Kökü Kanamaları ve Ön Kamara Hifeması: İridektomi veya periferik sineşi lizisi esnasında mikrodamar yırtılmaları',
      'Flieringa Halkası Skleral Dikiş Sızıntıları'
    ],
    hemostasisStrategies: [
      'Ekspulsif koroid kanaması şüphesinde cerrahın donör düğmeyi derhal yerleştirip 4 kardinal sütürle gözü acilen kapatması veya arka sklerotomi',
      'Tam nöromusküler blokaj (TOF 0/4) ve derin genel anestezi ile açık küre evresinde öksürük ve ıkınmanın mutlak engellenmesi',
      'İntraoperatif kan basıncının bazal değere yakın normotansif sınırda tutulması ve 10-15° baş elevasyonu ile oküler venöz drenajın korunması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA — Propofol + Remifentanil TIVA veya N₂O\'suz Dengeli Anestezi) + Derin Nöromusküler Blokaj (TOF 0/4) + Pürüzsüz Ekstübasyon — Penetran Keratoplastide (PKP) "open-sky" evresi nedeniyle ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genişletilmiş Sub-Tenon Bloğu (Künt Kanül) + Hafif MAC: Özellikle kapalı sistem lameller endotel nakillerinde (DMEK / DSAEK) veya genel anestezi riski aşırı yüksek koopere erişkinlerde (yüksek miyopide [>26 mm] iğneli blok KONTRENDİKEDİR; tam kat PKP\'de tercih edilmez)',
      'Laringeal Maske (LMA) ile Genel Anestezi: Seçilmiş lameller keratoplastilerde (DMEK / DSAEK) pürüzsüz uyanma avantajı ile; tam kat açık küre PKP\'de güvenli ventilasyon ve sıkı PaCO₂ kontrolü için spiralli ETT tercih edilir'
    ],
    clinicalRationale: 'Penetran keratoplastide kornea trefinasyonu sırasında göz 8 mm çapında tam kat "open-sky" haline geldiğinden ekspulsif koroidal hemorajiyi önlemek için derin anestezi ve tam nöromusküler blokaj (TOF 0/4) sağlayan genel anestezi standarttır. Spiralli kaflı endotrakeal tüp baş-boyun örtüleri altında tüp kıvrılmaksızın PaCO₂\'nin 35-38 mmHg\'de tutulmasını sağlar; N₂O kesinlikle kullanılmaz.',
    rulesTitle: 'KORNEA NAKLİNDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Keratoplastide hayati anestezi kuralları: (1) Open-sky evresinde TOF 0/4 + normokapni + sıfır öksürük; (2) DMEK/DSAEK hava/SF₆ kabarcığı nedeniyle N₂O kesin yasağı; (3) Pürüzsüz ekstübasyon + ikili PONV profilaksisi (Tramadol/Kodein YASAK); (4) Flieringa halkası / rektus askısında OCR protokolü; (5) Mannitolün yalnızca endikasyonda düşük-orta doz (0.25-0.5 g/kg) ve mesane takibiyle verilmesi; (6) Yüksek miyopi/Honan balon/steroid glisemi güvenliği.',
    indispensableRules: [
      {
        number: 1,
        title: 'OPEN-SKY (AÇIK KÜRE) EVRESİNDE SIFIR HAREKET, DERİN NMB (TOF 0/4) VE NORMOKAPNİ',
        content: 'Penetran keratoplastide kornea trefinasyonu yapıldığı anda gözün ön yüzeyi 8 mm çapında açık bir pencereye dönüşür. Bu aşamada yüzeyel anestezi, öksürük, ıkınma veya hiperkapni (koroidal venöz dolgunluk) arka siliyer arterleri patlatarak EKSPULSİF KOROİDAL HEMORAJİ ve kalıcı körlük yaratır! Derin anestezi + TOF 0/4 nöromusküler blokaj + EtCO₂/PaCO₂ 35-38 mmHg sıkı normokapni + 10-15° baş elevasyonu sürdürülmelidir.'
      },
      {
        number: 2,
        title: 'DMEK / DSAEK ÖN KAMARA HAVA / SF₆ KABARCIĞI VE AZOT PROTOKSİT (N₂O) YASAĞI',
        content: 'Endotel nakillerinde (DMEK/DSAEK) donör grefti stromaya yapıştırmak için ön kamaraya hava veya %20 SF₆ gazı verilir. N₂O gaz kabarcığına hızla difüze olarak GİB\'i 50-70 mmHg üzerine fırlatır ve santral retinal arter tıkanıklığı (CRAO) ile körlük yaratır! Keratoplastide N₂O KESİNLİKLE YASAKTIR. Postoperatif ilk 24-48 saat hasta kesinlikle SUPİN (sırtüstü) yatırılır.'
      },
      {
        number: 3,
        title: 'PÜRÜZSÜZ ÖKSÜRÜKSÜZ UYANMA VE ÇİFTLİ PONV PROFİLAKSİSİ (TRAMADOL/KODEİN YASAK!)',
        content: 'Donör kornea 16-24 adet 10-0 naylon mikrosütürle tutturulur; ekstübasyonda öksürme veya postop kusma GİB\'i 30-50 mmHg fırlatarak dikiş ayrışması ve iris prolapsusu yaratır. Ekstübasyon öncesi düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) veya Deksmedetomidin + İV Lidokain (1.5 mg/kg) + Sugammadeks (TOF ≥0.9) + ikili PONV profilaksisi (Deksametazon + Ondansetron) uygulanır. Kusmayı tetikleyen Tramadol ve Kodein KULLANILMAZ!'
      },
      {
        number: 4,
        title: 'FLIERINGA HALKASI VE REKTUS SÜTÜRÜNDE OKÜLOKARDİYAK REFLEKS (OCR)',
        content: 'Skleral kollapsı önlemek için Flieringa halkası dikilirken veya rektus askı sütürü çekilirken trigemino-vagal refleks (CN V → CN X) ani derin bradikardi/asistoli yapabilir. İlk adım cerrahı durdurmak, ardından ventilasyon/normokapni kontrolü, düzelmezse İV Atropin 0.5 mg uygulamaktır (rutin profilaktik Atropin önerilmez).'
      },
      {
        number: 5,
        title: 'MANNİTOL DOZ DİSİPLİNİ (0.25–0.5 G/KG) VE MESANE DİSTANSİYONU TUZAĞI',
        content: 'Yaşlı ve kalp yetmezliği riski olan hastalarda rutin 1-1.5 g/kg yüksek doz Mannitol akut pulmoner ödem ve idrar sondasız hastada şiddetli mesane distansiyonu (uyanmada ajitasyon, hipertansiyon ve dikiş patlaması!) yaratır. Mannitol yalnızca cerrahın açık endikasyonuyla (pozitif vitreus basıncı riski) 0.25-0.5 g/kg (maks. 1 g/kg) yavaş infüze edilir ve idrar çıkışı/mesane doluluğu mutlaka takip edilir.'
      },
      {
        number: 6,
        title: 'YÜKSEK MİYOPİDE İĞNELİ BLOK YASAĞI, OR YANGIN GÜVENLİĞİ VE GLİSEMİ',
        content: 'Blokla yapılan DMEK/DSAEK olgularında yüksek miyopi (>26 mm) varsa iğneli blok perforasyon riski nedeniyle YASAKTIR (künt Sub-Tenon seçilir); örtü altı medikal hava / FiO₂ ≤%30 ile ASA OR yangın güvenliği korunur. Trefinasyon başladıktan sonra Honan balonu kesinlikle kullanılmaz. Sistemik/topikal steroid alan diyabetiklerde kan şekeri <180 mg/dL hedeflenir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Kornea Konsültasyonu: Kornea patolojisi, ön kamara derinliği, lens durumu, aksiyel uzunluk (>26 mm yüksek miyopi kontrolü) ve donör kornea göz bankası teyidi.',
      'Kardiyoloji / İç Hastalıkları (Klinik Endikasyonda): İleri yaş genel anestezi adaylarında koroner arter hastalığı, KKY (Mannitol riski!) ve hipertansiyon optimizasyonu.',
      'Göğüs Hastalıkları (KOAH/Astım Varsa): Postoperatif öksürük krizlerini önlemek için inhaler ve bronkodilatör optimizasyonu.',
      'Anestezi Değerlendirmesi: Zor hava yolu, reflü/aspirasyon riski ve pürüzsüz ekstübasyon planı.'
    ],
    historyAndPhysical: [
      'Önceki Oküler Cerrahi Öyküsü: Vitrektomize veya afak gözlerde vitreus desteği olmadığından skleral kollaps ve ekspulsif hemoraji riski belirgin artar (Flieringa halkası gerekir).',
      'Kronik Öksürük ve Reflü: 10-0 kornea dikişlerini tehdit eden aktif ÜSYE/öksürük varsa elektif nakil ertelenebilir (#arac=preop&sub=cancellation-matrix).',
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 / RCoA): Kornea avaskülerdir; ancak PKP\'de iris manipülasyonu/suprakoroidal kanama riski nedeniyle Warfarin/DOAC/antiagregan planı cerrahla birlikte bireyselleştirilir (rutin köprüleme yapılmaz).',
      'Oftalmik Damla ve Sistemik İlaçlar: Timolol (bradikardi/bronkospazm), Asetazolamid (hipokalemi/asidoz), diyabet ve steroid kullanımı.'
    ],
    laboratoryAndTests: [
      'Klinik Endikasyon Bazlı Laboratuvar: Genel anestezi alacak ileri yaş/komorbid hastalarda TKS, kreatinin ve elektrolitler (özellikle Mannitol veya Asetazolamid planlanıyorsa Na⁺, K⁺, böbrek fonksiyonu).',
      'Antikoagülan kullananlarda güncel INR (Warfarin); diyabetiklerde kan şekeri; kardiyovasküler hastalığı olanlarda 12 derivasyonlu EKG.',
      'Oftalmolojik Değerlendirme: Bazal GİB ve opak kornealarda B-Scan oküler USG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR bradikardi izlemi), SpO₂, EtCO₂, NIBP ve Sıcaklık.',
      'Kantitatif Nöromusküler Monitörizasyon (TOF): Open-sky fazında TOF 0/4 (derin blokaj) korunur; ekstübasyon öncesi Sugammadeks ile TOF ≥0.9 doğrulanır.',
      'EtCO₂ Takibi: Sıkı normokapni (EtCO₂ 35-38 mmHg); hiperkapni koroidal vazodilatasyonla GİB\'i ve vitreus basıncını fırlatır.',
      'Hemodinami ve Mesane Takibi: Bazal KB ±%15 korunur; Mannitol uygulanacaksa mesane distansiyonu/idrar sondası mutlaka değerlendirilir.'
    ],
    vascularAccess: [
      '1-2 adet güvenli periferik intravenöz damar yolu (18-20G).',
      'Acil Bradikardi / Hipertansiyon İlaçları: İV Atropin (0.5 mg), Esmolol/Labetalol ve İV Lidokain hazır.',
      'İV Mannitol %20 (YALNIZCA cerrah endikasyonunda ve KKY yoksa: 0.25-0.5 g/kg, maks. 1 g/kg, 20-30 dakikada yavaş infüzyon).'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 10-15° Baş Elevasyonu ve Silikon Donut Sabitleme',
    patientPositionDetails: [
      'Baş silikon donut yastıkla mikroskop optik eksenine paralel sabitlenir; boyun nötral tutulur (jugüler venöz bası sıfır!).',
      '10-15° ters Trendelenburg (baş yukarı) eğim oküler venöz drenajı kolaylaştırarak vitreus itişini (posterior vitreous pressure) azaltır.',
      'Göz çevresi sulu %5 Povidon-İyot ile temizlenir (alkolsüz); bloklu DMEK olgularında örtü altı medikal hava / FiO₂ ≤%30 sağlanır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (1.5-2.5 mg/kg) + Remifentanil (0.1-0.2 mcg/kg/dk) veya Fentanil (2 mcg/kg) + Rokuronyum (0.6-0.9 mg/kg).',
      '  - Süksinilkolin rutin elektif keratoplastide KULLANILMAZ (ekstraoküler kas tonus artışı ile geçici GİB yükselmesi yapar; zor havayolu/RSI gereken kapalı gözde yüksek doz Rokuronyum 1.2 mg/kg + Sugammadeks 16 mg/kg 1. tercihtir).',
      '  - Laringoskopi sempatik yanıtını baskılamak için İV Lidokain (1.5 mg/kg) veya Remifentanil bolusu kullanılır; spiralli ETT tercih edilir.',
      'İdame (N₂O KESİN YASAK!):',
      '  - Propofol + Remifentanil TIVA (PONV\'yi dramatik azaltır ve pürüzsüz uyanma sağlar) veya Sevofluran + Remifentanil (Hava/O₂ karışımı).',
      '  - AZOT PROTOKSİT (N₂O) KESİNLİKLE YASAKTIR! (DMEK/DSAEK ön kamara hava/SF₆ kabarcığını genişleterek CRAO ve körlük yapar).',
      '  - Open-sky fazında derin NMB (TOF 0/4) ve sıkı normokapni (EtCO₂ 35-38 mmHg) korunur.',
      'Vitreus Basıncı Yönetimi:',
      '  - Rutin yüksek doz Mannitol önerilmez; pozitif vitreus basıncı yüksek riskli olgularda cerrah talebiyle 0.25-0.5 g/kg İV Mannitol (KKY dışlanarak ve mesane kontrolüyle) verilir.',
      '  - Hipertansiyonda kısa etkili İV Labetalol/Esmolol/Nikardipin tercih edilir (koroidal vazodilatasyon yapan NTG\'den kaçınılır).'
    ],
    airwayManagement: [
      'Penetran keratoplastide (PKP) spiralli (zırhlı) kaflı endotrakeal tüp altın standarttır; cerrahi tarafın karşı ağız köşesinden sağlam tespit edilir.',
      'Kaf basıncı 20-25 cmH₂O sabitlenir; ısırık bloğu yerleştirilir.',
      'Bloklu lameller keratoplastilerde (DMEK/DSAEK) spontan solunumda örtü altı medikal hava veya FiO₂ ≤%30 korunur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, 10-15° Baş Elevasyonu ve Flieringa Halkası Dikilmesi (OCR kontrolü!).',
      '2. Donör Korneanın Hazırlanması (Yapay ön kamara üzerinde trefinasyon).',
      '3. Alıcı Korneanın Trefinasyonu (OPEN-SKY / AÇIK KÜRE FAZI — TOF 0/4 ve mutlak hareketsizlik!).',
      '4. Hastalıklı Kornea Düğmesinin Çıkarılması ve Gereğinde Ek Cerrahi (Triple Procedure).',
      '5. Donör Korneanın 4 Kardinal Sütürle Tutturulması (Gözün Kapatılması).',
      '6. 16 Tekli veya Sürekli 10-0 Naylon Sütürlerin Atılması ve Keratoskopi.',
      '7. DMEK/DSAEK İse Ön Kamaraya Hava / %20 SF₆ Kabarcığı Verilmesi (N₂O KAPALI TEYİDİ!).',
      '8. Seidel Kaçak Kontrolü, Subkonjonktival İlaçlar ve Basısız Koruyucu Kalkan.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ ÖKSÜRÜKSÜZ EKSTÜBASYON: 10-0 kornea dikişlerini korumak için öksürük, ıkınma ve kusma mutlak engellenmelidir.',
      'Düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) veya Deksmedetomidin + İV Lidokain (1.5 mg/kg) eşliğinde, Sugammadeks ile TOF ≥0.9 doğrulandıktan sonra pürüzsüz ekstübasyon yapılır.',
      'İkili PONV profilaksisi (Deksametazon 4-8 mg indüksiyonda + Ondansetron 4 mg kapanışta) zorunludur.',
      'Ameliyat edilen göze mekanik bası olmadan şeffaf plastik kalkan (eye shield) takılır; DMEK/DSAEK hastaları derhal tam SUPİN (sırtüstü) pozisyona alınır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal, Opioid-Sparing Analjezi Protokolü:',
      '  - 10-0 naylon sütürlere ve epitel defektine bağlı batma/yabancı cisim hissi için düzenli Oral / İV Parasetamol (1000 mg 6 saatte bir).',
      '  - Kontrendikasyon yoksa kısa süreli oral NSAİİ eklenebilir.',
      '  - KAÇINILACAK AJANLAR: Postoperatif bulantı-kusmayı güçlü tetikleyerek GİB\'i 30-50 mmHg fırlatıp kornea dikişlerini patlatan TRAMADOL ve KODEİN rutin analjezide KULLANILMAZ! Şiddetli dirençli kurtarma ağrısında yalnızca mikro-doz titre İV Fentanil (25 mcg) + ek antiemetik kullanılır.',
      '  - KIRMIZI BAYRAK: Şiddetli zonklayıcı baş-göz ağrısı + bulantı gelişirse AKUT GİB ARTIŞI (pupil bloğu / gaz bloğu / viskoelastik) açısından acil tonometri yapılmalıdır!'
    ],
    prospectRecommendations: [
      'Kornea transplantasyonu için yayımlanmış özel bir PROSPECT (ESRA) kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ve RCoA/RCOphth ilkeleri doğrultusunda:',
      '  - Propofol TIVA + ikili antiemetik profilaksisi (Deksametazon + Ondansetron) ve opioid-sparing Parasetamol bazlı analjezi, öğürme/kusma kaynaklı dikiş ayrışmasını ve ekspulsif kanamayı önler.'
    ],
    erasRecommendations: [
      'Perioperatif Keratoplasti İyileşme İlkeleri:',
      '  - Pozisyon Disiplini: DMEK/DSAEK endotel nakli yapılan hastalar greftin tutunması için ilk 24-48 saat KESİNLİKLE SIRTÜSTÜ (SUPİN) yatırılır; SF₆ gazı verilen hastalar gaz emilene dek uçak yolculuğu ve yüksek irtifa YAPAMAZ.',
      '  - Basınç Kısıtlamaları: Öne eğilmek, ıkınmak, ağır kaldırmak ve gözü ovuşturmak kesinlikle yasaktır.',
      '  - Akut Rejeksiyon "RSVP" Eğitimi: Redness (Kızarıklık), Sensitivity (Işık hassasiyeti), Vision loss (Görme azalması), Pain (Ağrı) bulgularından biri gelişirse acil başvuru öğretilir.',
      '  - Topikal İmmünsüpresyon: Saatlik topikal steroid damlalar düzenli uygulanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Corneal Transplant (Penetrating Keratoplasty). Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the RCoA and RCOphth (2012) & ESCRS Corneal Transplantation Consensus.',
    prospectReference: 'Kornea cerrahisi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV stratejisi 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) esas alınarak yapılandırılmıştır.',
    otherReferences: [
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Corneal Ectasia & Corneal Edema and Opacification.',
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.'
    ]
  }
};
