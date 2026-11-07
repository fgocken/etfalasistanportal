import { ProcedureDefinition } from '../../types/procedures';

/**
 * Stereotaktik Fonksiyonel Girişimler: Derin Beyin Stimülasyonu (DBS), Pallidotomi ve Talamotomi
 * (Stereotactic Procedures: Deep Brain Stimulation, Pallidotomy, and Thalamotomy)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Stereotactic Procedures: Deep Brain Stimulation,
 * Pallidotomy, and Thalamotomy, pp. 477-482),
 * World Society for Stereotactic and Functional Neurosurgery (WSSFN),
 * Movement Disorder Society (MDS), American Society for Stereotactic and Functional Neurosurgery (ASSFN),
 * SNACC ve ERAS Society Fonksiyonel Nöroşirürji Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const stereotacticDbsPallidotomyThalamotomy: ProcedureDefinition = {
  id: 'stereotactic-dbs-pallidotomy-thalamotomy',
  name: 'Stereotaktik Fonksiyonel Girişimler: Derin Beyin Stimülasyonu (DBS), Pallidotomi ve Talamotomi',
  shortCode: 'DBS-PALLİDOTOMİ-TALAMOTOMİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Stereotaktik Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Hareket bozuklukları (Parkinson hastalığı, esansiyel tremor, distoni) ve nöropsikiyatrik tablolarda; stereotaktik çerçeve (Leksell, CRW) veya robotik nöronavigasyon kılavuzluğunda subkortikal derin çekirdeklere (STN, GPi, Vim) ulaşılarak uygulanan nöromodülasyon (Derin Beyin Stimülasyonu - DBS) veya radyofrekans (RF) termokoagülasyon ile geri dönüşümsüz ablatif lezyonlama (Stereotaktik Pallidotomi veya Talamotomi) ameliyatıdır. Mikroelektrot kayıtları (MER) ve uyanık intraoperatif klinik testleme ile terapötik etkinlik (tremorun ve rijiditenin durması) ile yan etki eşikleri (kapsüla interna uyarımı ile parestezi/motor kasılma, optik traktus uyarımı ile fosfen/görme bozukluğu) milimetrik olarak haritalanır.',
  indications: [
    'Parkinson Hastalığı - N. Subthalamicus (STN) veya Globus Pallidus internus (GPi) DBS:',
    '  - Medikal L-Dopa tedavisine dirençli motor dalgalanmalar (öngörülemeyen "Off" periyotları)',
    '  - Şiddetli L-Dopa kaynaklı tepe dozu diskinezileri ve distoniler',
    '  - Medikal tedaviye yanıtsız dirençli istirahat tremoru',
    'Stereotaktik Pallidotomi (GPi RF Lezyonlama):',
    '  - DBS implantasyonuna uygun olmayan, tek taraflı şiddetli Parkinsonian diskinezisi ve rijiditesi olan olgularda posteroventral GPi çekirdeğinin RF ile ablasyonu (genellikle tek taraflı)',
    'Stereotaktik Talamotomi (Vim Çekirdeği RF Lezyonlama) veya Talamik DBS:',
    '  - Medikal tedaviye (propranolol, primidon) dirençli, yazı yazmayı ve beslenmeyi engelleyen şiddetli Esansiyel Tremor',
    '  - İlaç tedavisine dirençli şiddetli Parkinsonian tremor veya post-travmatik/rubral tremor olguları',
    'Primer ve Sekonder Distoni (Jeneralize, Segmental veya Servikal Distoni / Tortikollis): Bilateral GPi DBS implantasyonu',
    'Tedaviye Dirençli Obsesif Kompulsif Bozukluk (OKB) ve Ağır Depresyon: Ventral kapsül / ventral striatum (VC/VS) veya subkallozal singulat DBS',
    'Dirençli Epilepsi: Talamus anterior nükleusu (ANT) DBS'
  ],
  averageDuration: '3.5 - 6.5 saat (Stereotaktik çerçevenin lokal anestezi/hafif sedasyon ile kafatasına tespiti, stereotaktik BT/MR görüntüleme ve cerrahi planlama: 60-90 dk; Ameliyathanede burr-hole açılışı, mikroelektrot kayıtları [MER] ve uyanık testleme/lezyonlama: 120-180 dk; Kalıcı elektrot fiksasyonu veya RF lezyonlama tamamlanması: 30-45 dk; DBS olgularında Faz II: Genel anestezi altında subklaviküler pil/IPG cebi açılışı ve boyun tünellemesi: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 150 mL (Mikrocerrahi stereotaktik girişte dış kan kaybı minimaldir; ancak kılavuz kanül, mikroelektrot veya RF probu derin sulkal damarları veya talamostriat/lentikülostriat damarları zedelerse intrakraniyel hematom gelişebilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Cerrahi Kan Kaybı / Kritik İntraserebral Mikrokanama Riski (%1-2)',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması yeterlidir; rutin kan hazırlığı gerekmez',
    transfusionProbability: '< %1 (İntraserebral masif hematom komplikasyonu gelişmedikçe transfüzyon gerekmez)',
    criticalBleedingSources: [
      'Derin Sulkal Arterler ve Pial Yüzey Venleri (Burr-hole altından elektrot/RF kanülü sokulurken kortikal giriş noktasındaki damarlar)',
      'Talamoperforatör ve Lentikülostriat Derin Penetran Arterler (GPi, STN veya talamus tabanındaki damarlar)',
      'Kapsüla İnterna Komşuluğundaki Mikrokapiller Yatak (RF termokoagülasyonda termal hasar kanaması)',
      'Subklaviküler İnsizyon ve Tünelleme Hattı (A. thoracica interna dalları ve V. cephalica - Faz II aşamasında)'
    ],
    hemostasisStrategies: [
      'Kortikal giriş noktasında titiz dural bipolar koagülasyon ve damarsız sulkus/girus trasesinin preoperatif MRG traktografide seçilmesi',
      'İntraoperatif Sıkı Kan Basıncı Kontrolü: Kanül ve elektrot beyin parankimine ilerletilirken sistolik KB < 130-140 mmHg tutulmalıdır (hipertansiyon intrakraniyel kanama riskini katlar!)',
      'RF Lezyonlama Güvenliği: Önce 42-45°C\'de 60 saniye geri dönüşümlü test lezyonlaması yapılır; nörolojik defisit gelişmediği doğrulanınca 70-80°C\'de 60 saniye kalıcı lezyonlama uygulanır'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'İki Aşamalı Anestezi Protokolü (Altın Standart):',
      '  - Faz I (Kranyal Aşama - MER, Makrostimülasyon ve RF Lezyonlama): Monitörize Anestezi Bakımı (MAC) / Uyanık Hasta — Deksmedetomidin infüzyonu (0.2 - 0.4 mcg/kg/saat) veya ultra-düşük doz Remifentanil; MER kayıtları ve klinik testler başlamadan 20-30 dakika önce sedasyon TAMAMEN KESİLİR',
      '  - Faz II (Subklaviküler Pil / IPG Cebi ve Tünelleme - Yalnızca DBS İçin): Genel Endotrakeal Anestezi (GETA) veya LMA ile genel anestezi (şiddetli tünelleme ağrısını tamamen bloke etmek için)'
    ],
    alternative: [
      'Asleep DBS (Genel Anestezi Altında DBS): İntraoperatif MRG (iMRI) veya BT eşliğinde doğrudan anatomik hedefleme ile uyanık testleme yapılmaksızın GETA altında elektrot implantasyonu (MER kullanılmaz)',
      'İzole Pallidotomi / Talamotomi İçin: Tüm operasyon lokal anestezi + MAC altında tamamlanır (IPG aşaması yoktur)'
    ],
    notes: 'DBS, PALLİDOTOMİ VE TALAMOTOMİDE ANESTEZİNİN 5 TEMEL DİREĞİ: (1) MER VE TEST FAZINDA SIFIR SEDASYON — Propofol, benzodiazepinler ve yüksek doz opioidler STN/GPi/Vim nöronal deşarjlarını ve beta osilasyonlarını tamamen siler; titreme, rijidite ve konuşma testlerinin yapılabilmesi için hasta MER ve stimülasyon/lezyonlama esnasında tamamen uyanık ve oryante olmalıdır! (2) ÇERÇEVELİ HASTADA ACİL HAVA YOLU KİLİTLENMESİ — Stereotaktik çerçeve (Leksell/CRW) ağız açıklığını ve boyun fleksiyonunu engeller; konvansiyonel laringoskopi İMKANSIZDIR! Videolaringoskop, Fiberoptik, LMA ve çerçevenin 4 vidasını saniyeler içinde sökecek alyan anahtarı başucunda hazır olmalıdır, (3) BEYİN ŞİFTİ (BRAIN SHIFT) VE PNÖMOSEFALİ ÖNLEMİ — Burr-hole açıldığında hava girmesi ve BOS kaçağı beynin yerçekimiyle 5-10 mm çökmesine yol açarak koordinatları bozar; baş elevasyonu düşük (10-15°) tutulmalı, dura hızla fibrin matriksle yalıtılmalı ve N2O kesinlikle yasaklanmalıdır, (4) OPTİK TRAKTUS VE KAPSÜLA İNTERNA YAN ETKİ KONTROLÜ — GPi pallidotomisinde elektrot optik traktusa yakınsa görme alanında ışık çakması (fosfen) veya körlük; STN/Vim hedefinde kapsüla internaya yakınsa kontralateral yüzde çekilme, motor kasılma ve dizartri gelişir; hasta uyanıkken bu yanıtlar anestezi etkisi olmadan saptanmalıdır, (5) SIKI KAN BASINCI KONTROLÜ — Derin parankime iğne/elektrot sokulurken sistolik KB < 130-140 mmHg tutulmalı, ani hipertansif pikler Labetalol/Esmolol ile önlenmelidir.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Hareket Bozuklukları Nöroloğu Konsültasyonu: UPDRS Motor Skoru III (L-Dopa On/Off testi), L-Dopa duyarlılığı (DBS başarısının en güçlü prediktörüdür), kognitif değerlendirme (MMSE / MoCA - demans varlığı DBS için rölatif kontrendikasyondur) ve psikiyatrik tarama.',
      'Nöroşirürji ve Nöroradyoloji Konsültasyonu: 3 Tesla Volümetrik T1/T2, FGATIR ve Traktografi MRG; hedef çekirdek sınırları (STN boyutu ~3x6x9 mm; GPi optik traktus mesafesi; Vim talamik sınırları), kortikal giriş sulkusları ve damar anomalileri incelenmelidir.',
      'Kardiyoloji Konsültasyonu: Uyanık operasyon boyunca kan basıncının stabil tutulabilmesi için preoperatif antihipertansif tedavi optimizasyonu; pacemaker varlığı (DBS donanımı ile elektromanyetik etkileşim kontrolü).',
      'Psikiyatri Konsültasyonu: Depresyon, dürtü kontrol bozukluğu ve halüsinasyon anamnezi (STN stimülasyonu nadiren hipomani veya intihar eğilimini tetikleyebilir).'
    ],
    historyAndPhysical: [
      'Antiparkinson İlaçların Yönetimi: İntraoperatif tremor ve rijidite testlerinin net yapılabilmesi için hastanın L-Dopa ve dopamin agonistleri ameliyat sabahı (veya operasyondan 12 saat önce) KESİLİR ("Off" durumda ameliyathaneye alınır).',
      'Antikoagülan / Antiagregan Tedavi: Aspirin, Klopidogrel, DOAC veya Warfarin; derin intraserebral hematom riskini sıfırlamak için en az 7-10 gün önce kesilmiş ve koagülasyon paneli tam normal olmalıdır!',
      'Hava Yolu ve Servikal Muayene: Çerçeve takıldıktan sonra oluşacak laringoskopi zorluğu preoperatif öngörülmeli; Mallampati ve retrognati değerlendirilmelidir.',
      'Klostrofobi ve Anksiyete: Uyanık hastanın çerçeve altında 3-5 saat sabit kalabilme toleransı sorgulanmalıdır.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve T&S doğrulaması.',
      'Tam Kan Sayımı ve Koagülasyon Paneli: PT/INR, aPTT, Fibrinojen ve Trombosit Sayımı.',
      'Serum Elektrolitleri, Böbrek ve Karaciğer Fonksiyon Testleri.',
      'Ameliyathane Nöronavigasyon ve Stereotaktik Planlama İstasyonuna Yüklenmiş 3T MRG ve İnce Kesit BT Füzyon Verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp Seviyesinde Sıfırlanmış: Çerçeve takılışı öncesinde yerleştirilmelidir. Beyin parankimine mikroelektrot ve RF kanülü ilerletilirken sistolik KB < 130-140 mmHg tutulması ve vazoaktif ajanların (Labetalol, Esmolol, Nikardipin) anlık titrasyonu için zorunludur.',
      'Mikroelektrot Kaydı (MER) ve Nörostimülasyon Monitörizasyonu: Nörofizyolog eşliğinde subkortikal çekirdeklerin tipik hücresel ateşleme frekanslarının (STN: 35-50 Hz yüksek frekanslı düzensiz patlamalar; GPi: 60-80 Hz sürekli yüksek frekans) osiloskop ve hoparlörden sesli takibi.',
      'Anestezi Derinliği İzlemi: BIS (Uyanık testleme fazında sedasyonun tamamen kesildiğini ve hastanın kognitif test verebilecek uyanıklıkta olduğunu doğrulamak için).',
      'İntraoperatif Floroskopi (C-Kollu Skopi) veya O-Arm / iCT: Elektrot veya RF probunun derinliğini milimetrik doğrulamak için.',
      'Isı Problu Foley İdrar Sondası: Uyanık hastada uzun süren cerrahide mesane distansiyonuna bağlı ajitasyon ve hipertansiyonu önlemek için.',
      'Sürekli Nazal Kapnografi ve EKG (elektrik parazitlerini süzen filtreli derivasyonlar).'
    ],
    vascularAccess: [
      'En az 2 adet güvenli periferik intravenöz yol (16G veya 18G; cerrahi kolların dışında)',
      'Hassas İnfüzyon Pompaları (Deksmedetomidin, Remifentanil ve Esmolol için hazır)'
    ],
    patientPosition: 'Yarı Oturur (Semi-Fowler) Pozisyon, Gövde 15 - 20° Hafif Elevasyonda',
    patientPositionDetails: [
      'Başın rijit stereotaktik çerçevesi ameliyat masasının adaptörüne sıkıca kilitlenir.',
      'Aşırı Baş Dikliğinden Kaçınılmalıdır: Başın 30°\'den fazla dikleştirilmesi burr-hole açıldığında hava girişini ve beynin yerçekimiyle çökmesini (Brain Shift) artırır; açı 15-20° ile sınırlandırılır.',
      'Hasta Konforu: Diz altına bükülebilir yastık, bel desteği, topuk jel pedleri ve ısıtıcı çoraplar konulur.',
      'Şeffaf Cerrahi Çadır (Drape Tent): Nöroloğun hastanın yüz mimiklerini, konuşmasını ve göz hareketlerini doğrudan görebilmesi için cerrahi örtüler şeffaf çadır şeklinde kurulur.'
    ],
    anesthesiaManagement: [
      '1. Çerçeve Takılması Fazı:',
      '  - Kafa kemiklerine 4 çivinin sıkılması şiddetli sempatik pik yapar.',
      '  - Müdahale: Çivi yerlerine derin lokal anestezik (%0.5 Bupivakain + %1 Lidokain + Epinefrin) infiltrasyonu + düşük doz Fentanil (50-100 mcg) veya Remifentanil bolusu.',
      '2. Burr-Hole ve Dural Açılış Fazı:',
      '  - Hafif sedasyon: Deksmedetomidin infüzyonu (0.2 - 0.4 mcg/kg/saat) ile solunumu deprese etmeyen sakinleştirme sağlanır.',
      '3. Mikroelektrot (MER) ve Klinik Testleme / RF Lezyonlama Fazı (EN KRİTİK EVRE):',
      '  - Tüm Sedatifler KESİLİR: Elektrot hedefe 10 mm kala Deksmedetomidin tamamen kapatılır. Hasta tamamen uyanık olmalıdır.',
      '  - Test Protokolü (STN/GPi/Vim):',
      '    * Tremor ve rijidite kontrolü: Hastaya ellerini açıp kapaması, parmak vurma ve dişli çark rijiditesi testleri yaptırılır.',
      '    * Konuşma testi: 1\'den 10\'a kadar sayma ve cümle kurdurma (disartri kontrolü).',
      '    * Görme alanı ve optik traktus testi (özellikle GPi Pallidotomisinde): Işık çakması (fosfen) veya görme alanı daralması olup olmadığı sorgulanır.',
      '    * Motor kapsüla interna testi: Yüzde veya kolda istemsiz kasılma eşikleri kontrol edilir.',
      '  - RF Termokoagülasyon Protokolü (Pallidotomi/Talamotomi için):',
      '    * Test Lezyonlama: 42 - 45°C\'de 60 saniye (geri dönüşümlü inaktivasyon; tremor durmalı, yan etki olmamalı).',
      '    * Kalıcı Lezyonlama: 70 - 80°C\'de 60 saniye kalıcı doku koagülasyonu.',
      '4. Faz II - Subklaviküler Pil (IPG) Cebi ve Tünelleme (DBS İçin):',
      '  - Çerçeve çıkarılır. Hasta genel anesteziye (LMA veya GETA) alınır; tünelleme ağrısı genel anestezi altında tamamen bloke edilir.'
    ],
    airwayManagement: [
      'Faz I (Uyanık Aşama): Nazal kanül ile oksijen ve yan akım EtCO2.',
      'ÇERÇEVELİ HASTADA ACİL HAVA YOLU KİLİTLENMESİ ALGORİTMASI:',
      '  - Nöbet, aspirasyon veya apne geliştiğinde çerçeve nedeniyle konvansiyonel laringoskopi yapılamaz!',
      '  - Ekipman: Videolaringoskop (hiperangüle McGrath/GlideScope), Fiberoptik bronkoskop ve LMA başucunda hazır tutulur.',
      '  - Acil Çerçeve Sökme Anahtarı: Leksell alyan anahtarı anestezi uzmanının elinin altında, anestezi masasına flasterle yapışık olmalıdır!',
      'Faz II (IPG Aşaması): LMA veya Oral ETT ile genel anestezi.'
    ],
    criticalSurgicalStages: [
      '1. Stereotaktik Çerçevenin Takılması ve Koordinat Eşleştirmesi: Sempatik pik kontrolü.',
      '2. Burr-Hole ve Dural Açılış: Pnömosefali ve beyin şiftini önlemek için kemik deliğine serum ve jelatin sünger konulması.',
      '3. Mikroelektrot (MER) İlerlemesi: Hedef çekirdeğin nöronal deşarj sınırlarının belirlenmesi; elektrik paraziti yaratan cihazların geçici durdurulması.',
      '4. Makrostimülasyon / Test Lezyonlama: Terapötik yanıt (tremor durması) ile kapsüler/optik yan etki eşiklerinin haritalanması.',
      '5. RF Kalıcı Lezyonlama (Pallidotomi/Talamotomi) VEYA Kalıcı DBS Elektrotunun Kilitlenmesi.',
      '6. Faz II Tünelleme ve Subklaviküler Pil İmplantasyonu (DBS İçin).'
    ],
    emergenceNotes: [
      'Faz I Sonrası: Hasta zaten uyanıktır; hemodinamik stabilite (sistolik KB < 130-140 mmHg) sürdürülür.',
      'Faz II (Genel Anestezi) Sonrası Uyanma: Öksürmesiz, ıkınmasız pürüzsüz uyanma; subklaviküler cepte hematom kontrolü.',
      'Acil Nörolojik Değerlendirme: Bilinç, kooperasyon, dört ekstremite motor gücü, pupiller, görme alanı ve konuşma ameliyathanede kaydedilir. Yeni fokal nörolojik defisitte acil Kranial BT çekilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Çerçeve Çivi Yerleri ve Skalp İnsizyonuna Lokal İnfiltrasyon (%0.25 Bupivakain).',
      '  - Subklaviküler Cep ve Boyun Tüneli Boyunca Lokal Anestezik İnfiltrasyonu (Faz II sonrasında ağrıyı belirgin azaltır).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon).',
      '  - Cerrahi hemostaz teyit edildiyse IV Deksketoprofen (50 mg 12 saatte bir).',
      '  - Kurtarma analjeziği: Düşük doz Tramadol veya Fentanil.'
    ],
    prospectRecommendations: [
      'Stereotaktik girişimlerde çivi giriş yerlerinin ve cerrahi insizyonların preoperatif lokal anestezikle bloke edilmesi intraoperatif hemodinamik stabiliteyi ve postoperatif hasta konforunu sağlar.'
    ],
    erasRecommendations: [
      'ERAS Fonksiyonel Nöroşirürji Kılavuzları:',
      '  - Postoperatif Kranial BT / MRG Kontrolü: Elektrot veya RF lezyon lokalizasyonunun doğrulanması ve intrakraniyel mikrokanama veya pnömosefalinin tespiti için ilk 2-4 saatte görüntüleme yapılması.',
      '  - Parkinson İlaçlarının Yeniden Başlanması: Bilinç ve yutma tam açılır açılmaz hastanın bazal L-Dopa tedavisi nöroloji kontrolünde kademeli geri başlanmalıdır (akut akineziyi önlemek için!).',
      '  - RF Lezyonlama Sonrası Ödem Takibi: Pallidotomi ve talamotomi sonrası lezyon çevresi vazojenik ödem geçici fokal defisit yapabileceğinden kısa süreli Deksametazon tedavisi planlanabilir.',
      '  - Erken Mobilizasyon: Postoperatif 4-6. saatte hastanın mobilize edilmesi.',
      '  - Donanım ve Yara Yeri Enfeksiyonu Takibi: Subklaviküler pil cebinde seroma, hematom veya eritem takibi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Stereotactic Procedures: Deep Brain Stimulation, Pallidotomy, and Thalamotomy (pp. 477-482). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Functional Neurosurgery and Deep Brain Stimulation: Consensus Guidelines. Journal of Neurosurgery.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Minor Cranial and Stereotactic Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Lozano, A. M., et al. (2019). Deep brain stimulation: current challenges and future directions. Nature Reviews Neurology, 15(3), 148-160.',
      'World Society for Stereotactic and Functional Neurosurgery (WSSFN). Clinical Guidelines for Deep Brain Stimulation and Lesioning in Movement Disorders.',
      'Venkatraghavan, L., et al. (2016). Anesthesia for deep brain stimulation: a review. Current Opinion in Anaesthesiology, 29(5), 546-551.'
    ]
  }
};
