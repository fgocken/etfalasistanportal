import { ProcedureDefinition } from '../../types/procedures';

/**
 * Göz Kapağı Rekonstrüksiyonu: Tümör Eksizyonu (BCC/SCC) veya Travma Sonrası Parsiyel / Tam Kat Kapak Defekt Onarımı
 * (Eyelid Reconstruction: Direct Closure, Tenzel Flap, Hughes Tarsoconjunctival Flap, Cutler-Beard Bridge Flap, Mustardé Cheek Flap)
 *
 * Referanslar: Jaffe (5th ed., Section VI: Ophthalmic Surgery), RCoA / RCOphth (2012),
 * ASA OR Fire Advisory (2013), ASRA 5th Ed. (2025), Gan et al. 4th PONV Consensus (2020).
 */
export const eyelidReconstruction: ProcedureDefinition = {
  id: 'eyelid-reconstruction',
  name: 'Göz Kapağı Rekonstrüksiyonu: Tümör veya Travma Sonrası Flep ve Greft ile Kapak Onarımı',
  shortCode: 'GOZ-KAPAK-REKON',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Rekonstrüksiyonu',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz kapağının malign tümörlerinin (BCC %90, SCC, Sebase Bez Karsinomu, Melanom) cerrahi sınır kontrolüyle (Mohs / frozen) çıkarılması, majör travma veya konjenital kolobomlar sonucu oluşan parsiyel ya da tam kat kapak doku kayıplarının iki lamel (ön lamel: cilt-orbikülaris; arka lamel: tarsus-konjonktiva) prensibiyle yeniden yapılandırılması ameliyatıdır. Defekt boyutuna göre: (1) Küçük Defektler (<%25-33): Primer kapatma + lateral kantolizis; (2) Orta Defektler (%33-50): Tenzel semisirküler rotasyon flebi; (3) Büyük Alt Kapak Defektleri (>%50): İki aşamalı Hughes tarsokonjonktival flebi + serbest deri grefti veya Mustardé yanak rotasyon flebi; (4) Büyük Üst Kapak Defektleri (>%50): İki aşamalı Cutler-Beard köprü flebi ve sert damak/retroauriküler greftler.',
  indications: [
    'Malign Göz Kapağı Tümörleri: BCC, SCC, Sebase Bez Karsinomu, Merkel Hücreli Karsinom veya Melanom eksizyonu sonrası defektler',
    'Majör Okülopalpebral Travma: Avülsiyon, ısırık veya kaza sekeli tam kat doku kaybı',
    'Skatrisyel Kontraktür ve Radyasyon Nekrozu',
    'Konjenital Göz Kapağı Kolobomu ve Nüks Tümör Kurtarma Cerrahisi'
  ],
  averageDuration: '45 - 120 dakika (Primer kapatma / Tenzel: 45-60 dk; Hughes + greft: 60-90 dk; Mustardé veya Cutler-Beard: 90-120 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 15 - 50 mL (Geniş yanak rotasyon flepleri ve sert damak donör sahasında kanama hafifçe artabilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal - Düşük Kan Kaybı / Ancak Flep Hematomu ve Akut Retrobulber Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (geniş yüz flepleri veya koagülopatide T&S opsiyonel)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Orbital Kompartman / Retrobulber Hematom: Lateral kantotomi/kantolizis ve derin kantal diseksiyonda orbitaya sızıntı (akut görme kaybı riski)',
      'Fasiyal Arter ve Ven Dalları (Mustardé yanak rotasyon flebi)',
      'Marginal ve Periferik Palpebral Arter Arkadları (Hughes / Cutler-Beard)',
      'Donör Saha Kanamaları: Sert damak mukozası greftinde majör palatin arter dalları'
    ],
    hemostasisStrategies: [
      'Lokal anesteziğe 1:100.000 veya 1:200.000 Adrenalin eklenmesi (insizyondan 7-10 dk önce)',
      'Bipolar wet-field mikro-koter ile selektif hemostaz (koter öncesi O₂ kesimi zorunlu!)',
      'Sert damak donör sahasına hemostatik sünger ve koruyucu damak plağı',
      'Akut retrobulber hematom / OCS şüphesinde <60-90 dk içinde acil lateral kantotomi + inferior kantolizis + 30° baş elevasyonu + IV Mannitol (1-2 g/kg) + IV Asetazolamid (500 mg)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genişletilmiş Lokal İnfiltrasyon + Rejyonel Sinir Blokları (İnfraorbital, Supraorbital, Supratroklear, Zigomatikofasiyal) + Minimal MAC — Küçük ve orta boy defektlerde (Primer kapatma, Tenzel) İLK TERCİHTİR',
      'Genel Endotrakeal Anestezi (GETA — Propofol + Remifentanil TIVA) + Spiralli Tüp — Büyük defektler (>%50), sert damak grefti, Mustardé yanak flebi, Hughes/Cutler-Beard ve uzun onkolojik cerrahilerde ALTIN STANDARTTIR'
    ],
    alternative: [
      'Laringeal Maske (LMA) ile Propofol TIVA: Ağız içi damak grefti alınmayacak, aspirasyon riski düşük seçilmiş orta ölçekli rekonstrüksiyonlarda'
    ],
    clinicalRationale: 'Küçük-orta kapak defektlerinde rejyonel yüz sinir blokları + minimal MAC yaşlı onkolojik hastalarda genel anestezi yükünü azaltır. Büyük flep/damak grefti vakalarında ise hava yolu güvenliği, kümülatif lokal anestezik toksisitesinin önlenmesi ve flep perfüzyonunun normotansif sürdürülmesi için Propofol TIVA ile GETA idealdir.',
    rulesTitle: 'GÖZ KAPAĞI REKONSTRÜKSİYONUNDA ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    notes: 'Kapak rekonstrüksiyonunda hayati kurallar: (1) ASA OR Yangın Üçgeni (yüz koteri + FiO₂ ≤%30); (2) Kornea kalkanı ve gömülü dikiş güvenliği; (3) Mustardé/Tenzel fleplerinde fasiyal sinir koruması (aşırı derin NMB\'den kaçınma) ve normotansif flep perfüzyonu; (4) Çoklu donör saha (damak/kulak arkası) kümülatif LAST & Adrenalin dozu + damak greftinde boğaz tamponu çıkarma teyidi; (5) Pürüzsüz uyanma + çift PONV (Tramadol/Kodein YASAK); (6) Akut retrobulber hematom / OCS acil paketi.',
    indispensableRules: [
      {
        number: 1,
        title: 'ASA AMELİYATHANE YANGIN ÜÇGENİ (YÜZ KOTERİ + OKSİJEN GÜVENLİĞİ)',
        content: 'MAC ile yapılan tüm yüz/kapak rekonstrüksiyonlarında örtü altında yüksek akımlı O₂ + bipolar koter kullanımı ciddi yüz yanıklarına yol açar! Örtü altına medikal hava veya FiO₂ ≤%30 verilmeli, koter öncesi O₂ ≥1 dk kesilip havalandırılmalı ve alkol bazlı solüsyon yerine sulu %5 Povidon-İyot kullanılmalıdır.'
      },
      {
        number: 2,
        title: 'KORNEA KALKANI (CORNEAL SHIELD) VE SIFIR İYATROJENİK KORNEA HASARI',
        content: 'Tam kat kapak rezeksiyonu sırasında kornea açıkta kalır. İnsizyon öncesi bol antibiyotikli pomad ile kornea kalkanı takılmalı, tarsal dikiş düğümleri dışa gömülmeli ve operasyon sonunda kalkanın çıkarıldığı teyit edilmelidir.'
      },
      {
        number: 3,
        title: 'ÇOKLU DONÖR SAHA KÜMÜLATİF LAST / ADRENALİN DOZU VE DAMAK GREFTİNDE BOĞAZ TAMPONU',
        content: 'Kapak + retroauriküler/damak donör sahalarına verilen toplam lokal anestezik mg/kg sınırı (Lidokain ≤7 mg/kg adrenalinli, Bupivakain ≤2.5-3 mg/kg) aşılmamalı ve her enjeksiyonda negatif aspirasyon yapılmalıdır (LAST kiti / %20 Lipid Emülsiyonu ulaşılabilir). Sert damak grefti alınıyorsa yerleştirilen boğaz tamponu (throat pack) ekstübasyon öncesi cerrahla sesli teyit edilerek çıkarılmalıdır!'
      },
      {
        number: 4,
        title: 'MUSTARDÉ / TENZEL FLEPLERİNDE FASİYAL SİNİR VE NORMOTANSİF FLEP PERFÜZYONU',
        content: 'Yanak/temporal flep kaldırılırken cerrah fasiyal sinir stimülatörü kullanacaksa aşırı derin NMB\'den kaçınılır (TOF ≥2/4 veya TIVA idamesi). Flep nekrozunu önlemek için normotansiyon, normotermi ve yeterli intravasküler volüm korunur; vazokonstriktör aşırı kullanımından kaçınılır.'
      },
      {
        number: 5,
        title: 'HUGHES / CUTLER-BEARD PEDİKÜL GÜVENLİĞİ: ÇİFT PONV VE TRAMADOL / KODEİN YASAĞI',
        content: 'Uyanmada öksürme/ıkınma veya postop kusma baş-boyun venöz basıncını fırlatarak pediküllü flebi patlatabilir ve flep altı hematom yaratabilir! Propofol TIVA + ikili antiemetik (Deksametazon + Ondansetron) + İV Lidokain (1.5 mg/kg) ile pürüzsüz uyanma sağlanır. Postop TRAMADOL ve KODEİN yüksek PONV riski nedeniyle KULLANILMAZ!'
      },
      {
        number: 6,
        title: 'POSTOPERATİF AKUT RETROBULBER HEMATOM / OCS (<60–90 DK) ACİL DEKOMPRESYON PAKETİ',
        content: 'Ani şiddetli göz ağrısı, proptozis, sert kapak ödemi veya görme kaybında altın pencere (<60-90 dk) içinde: (1) Sütürlerin açılması + acil lateral kantotomi / inferior kantolizis, (2) 30° baş elevasyonu, (3) İV Mannitol (1-2 g/kg) ve (4) İV Asetazolamid (500 mg) uygulanır!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Tümör sınır/frozen planı, defekt yüzdesi, donör saha seçimi (damak, kulak arkası, karşı kapak) ve monoküler hasta durumu (gören tek gözde 3-6 hafta gözü kapatan Hughes/Cutler-Beard yerine alternatif seçilir).',
      'Kardiyoloji / Göğüs Hastalıkları (Klinik Endikasyonda): Geniş flep için genel anestezi alacak ileri yaş onkolojik hastalarda kardiyopulmoner optimizasyon.',
      'Anestezi Değerlendirmesi: Genel vs. MAC kararı, zor havayolu (damak grefti varsa nazal/oral tüp yönlendirmesi) ve PONV riski.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan Yönetimi (ASRA 2025 & PAUSE): Geniş flep/greft disseksiyonunda cilt altı hematom flep nekrozuna yol açabileceğinden antikoagülan kesim süresi (DOAC 48 sa, Warfarin 5 gün INR <1.5; rutin köprüleme YAPILMAZ!) cerrahla bireyselleştirilir (bkz. #infografik=antithrombotic-matrix).',
      'Sigara ve Diyabet Öyküsü: Mikrovasküler flep perfüzyonunu ve greft tutmasını doğrudan etkiler.',
      'Tek Gözlü Hasta (Monoküler) Durumu ve Psikolojik Hazırlık (geçici göz kapaması yapılacaksa).'
    ],
    laboratoryAndTests: [
      'Küçük Lokal/MAC Onarımlarda: Rutin laboratuvar ve EKG istenmez (yalnız klinik endikasyonda INR/KŞ/EKG).',
      'Geniş Flep / Genel Anestezi Adaylarında: TKS, temel biyokimya, antikoagülan varsa INR/koagülasyon ve kardiyovasküler endikasyonda 12 derivasyonlu EKG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (OCR ve adrenalin taşiaritmi analizi), SpO₂, NIBP (3-5 dk), EtCO₂ ve Sıcaklık (normotermi flep perfüzyonu için şarttır!).',
      'Nöromusküler Monitörizasyon (TOF): Fasiyal sinir stimülasyonu yapılacaksa idamede NMB verilmez veya TOF ≥2/4 korunur; ekstübasyon öncesi TOF ≥0.9.'
    ],
    vascularAccess: [
      '1-2 adet güvenli periferik intravenöz damar yolu (18-20G).',
      'Acil İlaçlar Hazır: İV Atropin (0.5 mg), Esmolol/Labetalol ve LAST (%20 Lipid Emülsiyonu) erişilebilir.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, 15-20° Ters Trendelenburg ve Sabit Baş',
    patientPositionDetails: [
      'Baş silikon donut yastıkla sabitlenir; 15-20° ters Trendelenburg baş-boyun venöz basıncını ve ödemi azaltır.',
      'Sert damak grefti alınacaksa orofarenkse yerleştirilen boğaz tamponu (throat pack) anestezi formuna saatle kaydedilir ve ekstübasyon öncesi görsel teyitle çıkarılır.',
      'MAC olgularında örtü altı medikal hava veya FiO₂ ≤%30 sağlanır.'
    ],
    anesthesiaManagement: [
      'Lokal / Rejyonel Anestezi (Küçük-Orta Defektler / MAC):',
      '  - Lidokain %2 + Bupivakain %0.5 (1:1) + 1:100.000 Adrenalin (kümülatif maksimum toksik doz aşılmaz; negatif aspirasyon zorunlu; 7-10 dk vazokonstriksiyon beklemesi).',
      '  - Minimal sedasyon: Gerekirse Fentanil 25 mcg İV ± Midazolam 0.5-1.0 mg İV (derin sedasyon YASAK).',
      'Genel Anestezi (Büyük Defektler, Hughes, Mustardé, Cutler-Beard, Damak Grefti):',
      '  - Propofol + Remifentanil TIVA (en düşük PONV riski ve fasiyal sinir stimülasyonuna uyum!).',
      '  - Hemodinami: Normotansiyon (flep perfüzyonu korunur; hipertansiyon piki İV Labetalol/Esmolol ile önlenir; aşırı hipotansiyondan kaçınılır).',
      '  - Normotermi (>36°C) aktif ısıtıcı ile korunur (hipotermi flep vazospazmı yapar!).'
    ],
    airwayManagement: [
      'MAC olgularında spontan solunum + örtü altı medikal hava (veya FiO₂ ≤%30); koter öncesi O₂ ≥1 dk kesilir ve sulu %5 Povidon-İyot kullanılır (ASA OR Fire).',
      'Genel anestezide spiralli kaflı ETT; sert damak greftinde tüp ağız köşesine güvenle sabitlenir veya nazotrakeal entübasyon tercih edilir + boğaz tamponu çıkış teyidi zorunludur.'
    ],
    criticalSurgicalStages: [
      '1. Taraf Doğrulaması, 15-20° Baş Elevasyonu ve Tümör Sınırlarının İşaretlenmesi.',
      '2. Sulu %5 Povidon-İyot ve Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Kümülatif Doz Kontrollü Adrenalinli Lokal İnfiltrasyon (7-10 dk bekleme).',
      '4. Tümör Rezeksiyonu ve Frozen Section ile Temiz Cerrahi Sınır Teyidi (Koter öncesi O₂ KAPALI!).',
      '5. Arka Lamel Rekonstrüksiyonu (Hughes flebi, sert damak grefti [boğaz tamponu!] veya lateral tarsal strip).',
      '6. Ön Lamel Rekonstrüksiyonu (Tenzel, Mustardé yanak flebi [fasiyal sinir koruması!] veya retroauriküler deri grefti).',
      '7. Kantal Askı Dikişleri (Whitnall periostu — OCR kontrolü!).',
      '8. Kornea Kalkanının Çıkarılma Teyidi, Flep Perfüzyon Kontrolü ve Basısız Steril Pansuman.'
    ],
    emergenceNotes: [
      'Pürüzsüz Uyanma: İV Lidokain (1.5 mg/kg) + düşük doz Remifentanil (0.03-0.05 mcg/kg/dk) + Sugammadeks (TOF ≥0.9) ile öksürük/ıkınma önlenir.',
      'Damak grefti alındıysa BOĞAZ TAMPONU ÇIKARMA TEYİDİ ekstübasyon öncesi direkt görüşle yapılır!',
      'Çiftli PONV Profilaksisi: İV Deksametazon (4-8 mg) + Ondansetron (4 mg) zorunludur.',
      'Sıkı baskılı bandaj YAPILMAZ (flep dolaşımını bozar ve retrobulber hematomu maskeler!).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Kapak rekonstrüksiyonu sonrası ağrı hafif-orta, sert damak/kulak arkası donör sahası varsa orta şiddettedir.',
      'Temel Analjezi: Uzun etkili lokal anestezik + düzenli Oral/İV Parasetamol (1000 mg 6 saatte bir).',
      'KAÇINILACAK AJANLAR: TRAMADOL ve KODEİN yüksek PONV riskiyle flep pedikül ayrışmasına ve flep altı hematoma yol açabileceğinden rutin analjezide KULLANILMAZ! (Ayrıca yaşlılarda deliryum ve pediatrik/OSA FDA Black Box riski). Şiddetli kurtarma ağrısında yalnızca mikro-doz titre İV Fentanil (25 mcg) + ek antiemetik kullanılır.',
      'Erken dönemde flep altı hematom riskini artıran agresif antiplatelet NSAİİ\'lerden kaçınılır; aralıklı soğuk kompres ödemi azaltır.'
    ],
    prospectRecommendations: [
      'Oküloplastik rekonstrüktif cerrahi için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; 4th PONV Consensus (2020) ve RCoA/RCOphth ilkeleri doğrultusunda:',
      '  - Rejyonel fasiyal sinir blokları + Parasetamol + çiftli PONV profilaksisi, opioid tüketimini ve kusma kaynaklı flep ayrışmasını önler.'
    ],
    erasRecommendations: [
      'Oküloplastik Rekonstrüksiyon İyileşme İlkeleri:',
      '  - Küçük defektlerde günübirlik (PADSS ≥9), geniş fleplerde/damak greftinde 1 gece gözlem.',
      '  - Baş 30-45° Elevasyonu: İlk 48 saat venöz konjesyonu ve flep ödemini belirgin azaltır.',
      '  - Saatlik Flep Perfüzyon & Görme Takibi: Flep rengi, hematom ve ani ağrı/proptozis (OCS) açısından yakın izlem.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmic Surgery — Eyelid Reconstruction and Tumor Excision. Wolters Kluwer / LWW.',
    erasReference: 'Kumar CM, Eke T, Dodds C, et al. Local anaesthesia for ophthalmic surgery — Joint guidelines from the Royal College of Anaesthetists (RCoA) and the Royal College of Ophthalmologists (RCOphth). 2012.',
    prospectReference: 'Oküloplastik rekonstrüksiyon için yayımlanmış özel bir PROSPECT kılavuzu bulunmamaktadır; analjezi ve PONV yönetimi 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ilkelerine dayanmaktadır.',
    otherReferences: [
      'ASA Task Force on Operating Room Fires. Practice Advisory for the Prevention and Management of Operating Room Fires. Anesthesiology. 2013;118(2):271-290.',
      'Gan TJ, Belani KG, Bergese S, et al. Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesth Analg. 2020;131(2):411-448.',
      'Kopp SL, Vandermeulen E, et al. ASRA Pain Medicine Evidence-Based Guidelines (5th ed.). Reg Anesth Pain Med. 2025.'
    ]
  }
};
