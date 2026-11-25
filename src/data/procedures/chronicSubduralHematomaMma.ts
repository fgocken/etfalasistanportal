import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kronik Subdural Hematom (KSDH): Burr-Hole Drenajı ve Orta Meningeal Arter (MMA) Embolizasyonu
 *
 * 2024 NEJM EMBOLISE, MAGIC-MT ve STEM randomize çalışmaları, geriatrik perioperatif bakım
 * ve güncel antikoagülan geri çevirme kılavuzları referans alınarak yapılandırılmıştır.
 */
export const chronicSubduralHematomaMma: ProcedureDefinition = {
  id: 'chronic-subdural-hematoma-mma',
  name: 'Kronik Subdural Hematom: Burr-Hole Drenajı & MMA Embolizasyonu',
  shortCode: 'KSDH-BURR-MMA',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Geriatrik / Vasküler Nöroşirürji',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Çoğunlukla ileri yaşlı, serebral atrofili ve antitrombotik kullanan hastalarda görülen kronik subdural hematomun (KSDH) tek/çift burr-hole kraniyostomi ile irrigasyon-drenajı ve/veya nüksü önlemek amacıyla 2024 NEJM (EMBOLISE, MAGIC-MT, STEM) kanıtlarıyla standartlaşan adjuvan Orta Meningeal Arter (MMA) embolizasyonu işlemidir.',
  indications: [
    'Semptomatik kronik veya subakut subdural hematom: Hemiparezi, yürüyüş bozukluğu, bilinç bulanıklığı, afazi, nöbet veya dirençli baş ağrısı ile birlikte kitle etkisi (>10 mm kalınlık veya >5 mm orta hat şifti)',
    'Bilateral kronik subdural hematomlarda eşzamanlı iki taraflı burr-hole drenajı',
    'Tekrarlayan (nüks) KSDH veya yüksek nüks riskli olgularda cerrahi drenaja ek (adjuvan) ya da hafif semptomatik seçilmiş olgularda tek başına MMA embolizasyonu (EMBOLISE / MAGIC-MT / STEM 2024)',
    'Septalı, organize veya taze pıhtı komponenti baskın KSDH olgularında mini-kraniyotomi ile membranektomi'
  ],
  averageDuration: '45 - 90 dk (Burr-hole drenajı: 45-60 dk; adjuvan MMA embolizasyonu: +45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 150 mL (Tipik burr-hole drenajı ve MMA embolizasyonu); antikoagülasyonu tam dönmemiş veya mini-kraniyotomi gerektiren olgularda 300 - 500 mL',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük (Yüksek Koagülopati & Postop Re-kanama Riski)',
    crossMatchRequirement: 'Kan grubu ve T&S alınmalı; koagülopati/anemi veya mini-kraniyotomi planında 2 Ünite ES Cross-Match + 4F-PCC hazır bulundurulmalıdır',
    transfusionProbability: '%5 - %10 (Esas ihtiyaç kan ürününden ziyade antikoagülan geri çevirme ajanlarıdır)',
    criticalBleedingSources: [
      'Geri çevrilmemiş antikoagülan/antiplatelet etkisi altında akut subdural veya intraparankimal yeniden kanama',
      'Hızlı dekompresyon sonrası köprü venlerin gerilip yırtılması veya kontralateral subdural/intraserebral hematom gelişimi',
      'Skalp kesi kenarları, diploik venler veya dura açılışında MMA dallarından kanama'
    ],
    hemostasisStrategies: [
      'Warfarin (INR > 1.4): Derhal 4-Faktörlü Protrombin Kompleks Konsantresi (4F-PCC 25–50 IU/kg) + IV Vitamin K (10 mg yavaş infüzyon)',
      'DOAC geri çevrimi: Dabigatran için IV Idarucizumab (5 g); Faktör Xa inhibitörleri (Apiksaban/Rivaroksaban) için Andexanet alfa veya 4F-PCC (50 IU/kg)',
      'Bipolar koterizasyon, kemik mumu (bone wax) ve kapalı yerçekimi kontrollü subdural drenaj (negatif vakumsuz!)'
    ]
  },

  // 3) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Lokal Anestezi (Skalp İnfiltrasyonu / Bölgesel Skalp Bloğu) + Monitörize Anestezi Bakımı (MAC): Tek taraflı, koopere, hava yolu güvenli ve kırılgan geriatrik burr-hole veya MMA embolizasyonu olgularında hemodinamik stabilite ve daha az deliryum avantajıyla',
      'Genel Endotrakeal Anestezi (GETA — Düşük doz Propofol/Remifentanil veya Sevofluran): Bilateral olgular, ajite/konfüze veya düşük GKS\'li hastalar, sırtüstü hareketsiz kalamayanlar, mini-kraniyotomiye dönüşüm riski olanlar ve DSA hareket kısıtlaması gereken MMA embolizasyonlarında'
    ],
    alternative: [
      'Supraglottik Hava Yolu (LMA) ile Hafif Genel Anestezi: Seçilmiş aç, aspirasyon riski düşük ve kısa süreli unilateral burr-hole vakalarında'
    ],
    clinicalRationale:
      'KSDH hastaları çoğunlukla çoklu komorbiditeli, antikoagüle ve deliryuma yatkın geriatrik bireylerdir. Uygun hastalarda lokal anestezi + minimal sedasyon (Deksmedetomidin veya ultra-düşük doz Remifentanil) genel anesteziye bağlı hipotansiyonu ve postoperatif deliryumu azaltır; ancak hava yolu güvenliği veya hareketsizlik sağlanamıyorsa erken ve kontrollü GETA tercih edilmelidir.',
    notes:
      'Burr-hole drenajında iki kritik tehlike vardır: (1) N2O kullanımına bağlı akut TANSİYON PNÖMOSEFALİ (N2O KESİNLİKLE KONTRENDİKEDİR!), (2) aşırı hızlı dekompresyon veya dren aşırı boşalmasına bağlı serebral hiperperfüzyon/kontralateral kanama. 2024 NEJM çalışmalarıyla (EMBOLISE, MAGIC-MT, STEM) yaygınlaşan MMA embolizasyonunda ise oftalmik arter ve fasiyal sinir anastomozlarına karşı uyanık olunmalıdır.',
    rulesTitle: 'KSDH BURR-HOLE & MMA EMBOLİZASYONUNDA VAZGEÇİLMEZ 5 KURAL',
    indispensableRules: [
      {
        number: 1,
        title: 'AZOT PROTOKSİT (N2O) KESİNLİKLE KONTRENDİKEDİR!',
        content: 'Subdural boşluk drene edildiğinde intrakraniyal boşluğa mutlaka bir miktar hava girer. N2O kandan hava boşluğuna azottan 34 kat hızlı difüze olarak intrakraniyal hacmi hızla genişletir ve fatal TANSİYON PNÖMOSEFALİ (Mount Fuji bulgusu) oluşturur. N2O kesinlikle kullanılmamalıdır.'
      },
      {
        number: 2,
        title: 'HIZLI ANTİKOAGÜLAN GERİ ÇEVİRİMİ VE HEMOSTAZ DOĞRULAMASI',
        content: 'KSDH hastalarının büyük kısmı Warfarin, DOAC veya antiplatelet kullanmaktadır. Cerrahi öncesi Warfarin için 4F-PCC + IV Vitamin K (hedef INR <1.4), Dabigatran için Idarucizumab, FXa inhibitörleri için Andexanet alfa/4F-PCC derhal tamamlanmalı ve trombosit >100.000/mm³ doğrulanmalıdır.'
      },
      {
        number: 3,
        title: 'AŞIRI HIZLI DEKOMPRESYON VE OVER-DRAINAGE\'DEN KAÇIN',
        content: 'Kronik bası altındaki yaşlı beynin ani dekompresyonu serebral hiperperfüzyona, köprü ven yırtılmasına veya kontralateral hematom büyümesine yol açabilir. Drenaj kontrollü yapılmalı, dren kesinlikle aktif negatif vakuma alınmamalı ve baş pozisyonu cerrahla koordine edilmelidir.'
      },
      {
        number: 4,
        title: 'MMA EMBOLİZASYONU (2024 NEJM) — OFTALMİK & FASİYAL ANASTOMOZ RİSKİ',
        content: 'EMBOLISE, MAGIC-MT ve STEM (NEJM 2024) çalışmaları adjuvan MMA embolizasyonunun KSDH nüksünü belirgin azalttığını kanıtlamıştır. MMA\'nın oftalmik arter (santral retinal arter -> körlük) ve petrozal dal (fasiyal sinir vasa nervorum -> fasiyal paralizi) anastomozları nedeniyle mikrokateter pozisyonu ve uyanık olgularda görme/fasiyal muayene yakından izlenir.'
      },
      {
        number: 5,
        title: 'GERİATRİK DELİRYUMDAN KORUNMA — BENZO, ANTİKOLİNERJİK, TRAMADOL YOK',
        content: 'KSDH popülasyonu yüksek deliryum riski taşır. Midazolam dahil benzodiazepinler, antikolinerjikler (Skopolamin/Atropin), antihistaminikler, Meperidin ve Tramadol\'den kesinlikle kaçınılır; normotermi, normotansiyon ve düşük titre anestezi uygulanır.'
      }
    ]
  },

  // 4) Pre-operatif hazırlık
  preoperative: {
    consultations: [
      'Kardiyoloji / Hematoloji (Gerektiğinde): Mekanik kalp kapağı, yüksek CHA2DS2-VASc atriyal fibrilasyon veya yakın dönem koroner stent varlığında antitrombotik kesilme/geri çevirme ve postop yeniden başlama zamanlaması planlanır.',
      'Girişimsel Nöroradyoloji: Adjuvan MMA embolizasyonu aynı seansta hibrit salonda mı yoksa aşamalı olarak mı yapılacağı netleştirilir.'
    ],
    historyAndPhysical: [
      'Nörolojik Muayene: Bazal GKS, Markwalder KSDH Derecelendirmesi (Grade 0–4), lateralizan motor güçsüzlük, konuşma ve pupiller kaydedilir.',
      'Kapsamlı Antitrombotik Sorgulaması: Son ilaç alım saati (Warfarin, Apiksaban, Rivaroksaban, Dabigatran, Aspirin, Klopidogrel, Tikagrelor) mutlaka belirlenir.',
      'Geriatrik Kırılganlık ve Komorbiditeler: Demans/bazal kognisyon, düşme öyküsü, kalp yetmezliği, KOAH, kronik böbrek hastalığı ve ortostatik hipotansiyon.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Trombosit), Koagülasyon Paneli (PT, INR, aPTT, gerekirse anti-Xa veya trombin zamanı), Böbrek Fonksiyonları (MMA embolizasyonunda kontrast riski) ve Serum Elektrolitleri (yaşlılarda SIADH/diüretik kaynaklı hiponatremi sıktır).',
      '12 Derivasyonlu EKG ve Beyin BT incelemesi (unilateral vs bilateral, orta hat şifti, membran/septasyon varlığı).'
    ]
  },

  // 5) İntra-operatif yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA monitörizasyonu: 5 derivasyonlu EKG, SpO2, sürekli EtCO2 (MAC olgularında nazal örnekleme kanülü zorunlu), NİKB (3–5 dk aralıklarla) ve vücut ısısı.',
      'İnvaziv Arteriyel Hat (A-Line): Rutin tek taraflı burr-hole olgularında gerekmez; ancak ciddi kardiyak hastalık, yüksek KİBAS/düşük GKS, mini-kraniyotomiye dönüşüm veya hemodinamik instabilite varsa yerleştirilir.',
      'İşlenmiş EEG (BIS/SedLine): Yaşlı beyinde burst süpresyonuna ve deliryuma yol açan aşırı anestezi derinliğini önlemek için (hedef BIS 45–60).'
    ],
    vascularAccess: [
      'En az 1–2 adet güvenilir periferik IV kateter (18G; mini-kraniyotomi veya koagülopati varsa 2 adet 16G–18G).',
      'Kırılgan geriatrik cilt ve venlerde kateter tespiti özenle yapılmalıdır.'
    ],
    patientPosition: 'Supine (Sırtüstü), baş nötral veya hafif kontralateral çevrilmiş, simit/at nalı yastık üzerinde (Mayfield çivisi genellikle gerekmez; mini-kraniyotomide kullanılabilir).',
    patientPositionDetails: [
      'Bilateral burr-hole veya postop pnömosefaliyi azaltmak amacıyla cerrahın tercihiyle düz supine veya çok hafif baş elevasyonu (<10–15°) uygulanır.',
      'Yaşlı hastalarda servikal artroz nedeniyle boyun aşırı rotasyona zorlanmamalı; omuz altına destek rulosu konularak juguler venöz dönüş korunmalıdır.',
      'MAC olgularında örtülerin hastanın yüzüne temas etmemesi için çadır (tenting) düzeneği kurulmalı ve kesintisiz oksijen/hava akışı sağlanmalıdır.'
    ],
    anesthesiaManagement: [
      'MAC / Lokal Anestezi Stratejisi: Cerrahın yeterli lokal anestezik (Bupivakain/Lidokain + Epinefrin) infiltrasyonu esastır. Gerekirse minimal Deksmedetomidin (0.2–0.5 mcg/kg/saat, yüklemesiz veya çok yavaş yükleme — bradikardi/hipotansiyona dikkat) veya ultra-düşük doz Remifentanil (0.01–0.03 mcg/kg/dk) titre edilir. Benzodiazepin VERİLMEZ.',
      'GETA Stratejisi: Yaşlılarda indüksiyon dozları %30–50 azaltılarak (yavaş titre Propofol veya Etomidat + Fentanil/Remifentanil + Rokuronyum) hipotansiyon önlenir. İdamede yaşa göre düzeltilmiş düşük MAC Sevofluran veya TIVA kullanılır; N2O KESİNLİKLE YASAKTIR.',
      'Hemodinamik Yönetim: Kronik hipertansif geriatrik hastalarda MAP bazalin ±%15–20 aralığında (genellikle ≥65–75 mmHg) korunur; aşırı hipertansiyon (>160 mmHg) taze subdural kanamayı tetikleyebilir.',
      'Sıvı ve Isı Yönetimi: İzotonik dengeli kristaloidlerle övolemi (aşırı sıvı yüklenmesinden kaçın; yaşlılarda pulmoner ödem riski). Aktif sıcak hava üflemeli battaniye ile normotermi (>36°C) korunur.',
      'MMA Embolizasyonu Ek Notu: Partikül (PVA) veya sıvı embolizan (Onyx/n-BCA) verilirken ağrıya bağlı ani hareket (dural ağrı lifleri) olabilir; lokal + MAC olgularında bu aşamada anlık analjezi veya GETA tercih edilir. İşlem sonunda görme keskinliği ve fasiyal sinir fonksiyonu değerlendirilir.'
    ],
    airwayManagement: [
      'MAC olgularında solunum depresyonu ve obstrüksiyona karşı sürekli EtCO2 izlemi yapılır; hava yolu kurtarma gereçleri (LMA, videolaringoskop) hazır bulundurulur.',
      'GETA olgularında nazik orotrakeal entübasyon uygulanır; diş protezleri ve kısıtlı servikal hareket açıklığı dikkate alınır.'
    ],
    criticalSurgicalStages: [
      'Burr-Hole Açılışı ve Dura İnsizyonu: MAC\'ta delme sesi ve titreşim anksiyete yaratabilir; önceden hastaya sözlü bilgi verilir.',
      'Ilık İzotonik Salinle İrrigasyon ve Subdural Dren Yerleştirilmesi: Sıvının 37°C olması gerekir (soğuk irrigasyon bradikardi/nöbet/hipotermi yapar). Hava kabarcıklarını boşaltmak için boşluk izotonikle doldurulur; N2O kapalıdır.',
      'Drenin Bağlanması: Subdural dren kesinlikle yüksek negatif basınçlı vakuma bağlanmamalı, yerçekimi seviyesinde (kapalı sistem) tutulmalıdır.',
      'MMA Embolizasyonu Aşaması: Mikrokateterin oftalmik veya petrozal anastomozların distaline güvenle yerleştirildiğinin doğrulanması ve embolizan enjeksiyonu sırasında mutlak hareketsizlik.'
    ],
    emergenceNotes: [
      'Öksürük, ıkınma ve hipertansiyon pikini önleyerek pürüzsüz uyanma sağlanır (düşük doz Remifentanil veya IV Lidokain desteği); nöromusküler blokaj tam geri çevrilir (TOF ≥ 0.90).',
      'Ameliyat odasında hemen nörolojik muayene (bilinç, pupiller, motor kuvvet) yapılır; beklenmedik uyanma gecikmesi veya yeni fokal defisit varsa tansiyon pnömosefali veya akut hemoraji açısından ACİL Beyin BT çekilir.'
    ]
  },

  // 6) Post-operatif yönetim
  postoperative: {
    painManagement: [
      'Cerrahi alan lokal anestezik infiltrasyonu + düzenli IV/PO Parasetamol (yaşlı/düşük kilolu hastalarda doz ayarlamasıyla 500–1000 mg q6-8h, maks 2–3 g/gün) temel analjezidir.',
      'Geriatrik deliryum, düşme ve solunum depresyonu riski nedeniyle Tramadol, Kodein, Meperidin ve benzodiazepinler KESİNLİKLE KULLANILMAZ.',
      'İntrakraniyal kanama ve nüks riski nedeniyle non-selektif NSAİİ\'lerden kesinlikle kaçınılır; şiddetli atılım ağrısında yalnızca mikro-doz IV Fentanil (12.5–25 mcg) titre edilir.'
    ],
    erasRecommendations: [
      'Subdural Dren ve Pozisyon Yönetimi: Dren genellikle 24–48 saat yerçekimi düzeyinde tutulur; aşırı drenaj (>150–200 mL/saat veya taze parlak kırmızı kan) acil cerrah bildirimi gerektirir.',
      'Geriatrik Deliryum Profilaksisi: Erken gözlük/işitme cihazı iadesi, erken oral beslenme ve dren çekilir çekilmez erken mobilizasyon, uyku-uyanıklık ritminin korunması.',
      'Antikoagülan / Antiplatelet Yeniden Başlatma: Kontrol BT\'de akut kanama dışlandıktan sonra tromboembolik riske göre nöroşirürji ve kardiyoloji ortak kararıyla planlanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. Anesthesiologist's Manual of Surgical Procedures (5th/6th ed.). Burr-Hole Evacuation of Chronic Subdural Hematoma. Wolters Kluwer.",
    otherReferences: [
      'Davies, J. M., et al. (2024). Adjunctive Middle Meningeal Artery Embolization for Subdural Hematoma (EMBOLISE Trial). New England Journal of Medicine, 391(20), 1890–1900.',
      'Liu, J., et al. (2024). Middle Meningeal Artery Embolization for Nonacute Subdural Hematoma (MAGIC-MT Trial). New England Journal of Medicine, 391(20), 1901–1912.',
      'Fiorella, D., et al. (2024). Embolization of the Middle Meningeal Artery for Chronic Subdural Hematoma (STEM Trial). New England Journal of Medicine, 391(20), 1877–1889.',
      'American Geriatrics Society / ASA Perioperative Brain Health Initiative: Best Practices for Postoperative Delirium Prevention in Older Adults.',
      'Frontera, J. A., et al. Neurocritical Care Society & Society of Critical Care Medicine Guideline for Reversal of Antithrombotics in Intracranial Hemorrhage. Neurocritical Care.'
    ]
  }
};
