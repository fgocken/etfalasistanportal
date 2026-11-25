import { ProcedureDefinition } from '../../types/procedures';

/**
 * Stereotaktik Beyin Biyopsisi, Kist Aspirasyonu ve Ommaya Rezervuarı Yerleşimi
 * (Stereotactic Brain Biopsy, Cyst Aspiration, and Ommaya Reservoir Placement — Framed & Frameless)
 *
 * Jaffe (6th ed., 2020, Section II: Neurosurgery - Stereotactic Procedures),
 * PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve güncel nöroanestezi/nöroşirürji kılavuzları referans alınarak yapılandırılmıştır.
 */
export const stereotacticNeurosurgery: ProcedureDefinition = {
  id: 'stereotactic-neurosurgery',
  name: 'Stereotaktik Beyin Biyopsisi, Kist Aspirasyonu ve Ommaya Rezervuarı (Çerçeveli ve Çerçevesiz)',
  shortCode: 'STEREOTAKTİK-BİYOPSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Tanısal & Stereotaktik Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Üç boyutlu kartezyen koordinat sistemi (X, Y, Z açıları) ve milimetrik görüntüleme füzyonu rehberliğinde, açık kraniyotomiye gerek kalmaksızın tek bir trepanasyon (burr-hole) deliğinden derin, elokent veya multifokal beyin lezyonlarına ulaşarak histopatolojik/moleküler tanı amaçlı biyopsi alma, kistik lezyon/apse aspirasyonu yapma veya intraventriküler/intrakaviter kemoterapi için Ommaya rezervuarı yerleştirme girişimidir. İki temel sistem kullanılır: (1) Çerçeveli (Framed) Stereotaksi — kafatasına lokal anestezi + hafif sedasyonla rijit metalik çerçeve (Leksell, CRW) vidalanıp stereotaktik BT/MR çekilir (en yüksek milimetrik doğruluk, ancak hava yolu erişimini fiziksel olarak kilitler); (2) Çerçevesiz (Frameless) / Robotik Nöronavigasyon — genel anestezi altında 3 pinli Mayfield çivili başlık ve optik/elektromanyetik navigasyon ile hedeflenir (hava yolu daha erişilebilir ve hasta konforu daha yüksektir).',
  indications: [
    'Derin ve Elokent Yerleşimli İntrakraniyel Kitlelerin Tanısal Biyopsisi: Bazal ganglionlar, talamus, korpus kallozum, beyin sapı, periventriküler alan veya pineal bölgede açık rezeksiyonun yüksek nörolojik morbidite taşıdığı tümörler',
    'Primer SSS Lenfoması (PCNSL) Şüphesi: Cerrahi rezeksiyonun sağkalıma katkısı olmayan, sistemik yüksek doz kemoterapi öncesi kesin histopatolojik tanı gerektiren periventriküler/derin kitleler (BİYOPSİ ÖNCESİ STEROİD KESİNLİKLE YASAKTIR!)',
    'Multifokal, Diffüz veya İnoperabl İntrakraniyel Lezyonlar: Çoklu beyin metastazları, diffüz gliomatozis serebri veya cerrahi rezeksiyona uygun olmayan yüksek dereceli gliomların moleküler (IDH, MGMT, 1p/19q) profillemesi',
    'Enfeksiyöz ve Enflamatuar Beyin Lezyonları: İmmün yetmezlikli (HIV, transplantasyon, kemoterapi) hastalarda beyin apsesi, toksoplazmoz, tüberkülom, nokardiyoz veya fungal lezyonların tanısal aspirasyonu ve mikrobiyolojik kültür örneklemesi',
    'Kistik Tümör Aspirasyonu ve Ommaya Rezervuarı Yerleşimi: Kistik kraniofarenjiyom, kistik gliom veya beyin apsesi dekompresyonu; leptomeningeal metastaz veya primer SSS lenfomasında intratekal/intraventriküler kemoterapi için Ommaya rezervuarı implantasyonu'
  ],
  averageDuration: '1.0 - 2.5 saat (Çerçeveli teknikte lokal anestezi ile çerçeve tespiti ve stereotaktik BT/MR görüntüleme füzyonu: 45-60 dk; Çerçevesiz teknikte indüksiyon, Mayfield başlık ve nöronavigasyon kaydı: 20-30 dk; Burr-hole açılışı, dural koagülasyon, stereotaktik kanül ilerletilmesi, seri kadran biyopsisi/kist aspirasyonu veya Ommaya yerleşimi ve frozen kesit doğrulaması: 30-50 dk; Hemostaz ve cilt kapanışı: 15-20 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 30 - 100 mL (Eksternal cerrahi kan kaybı minimaldir; ancak körlemesine ilerletilen biyopsi iğnesi hipervasküler tümör yatağını, sulkal arterleri veya derin perforatörleri zedelerse semptomatik intrakraniyel hematom [%1 - %5] gelişebilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Eksternal Kan Kaybı / Kritik İntraserebral Biyopsi Hematomu Riski (%1 - %5)',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması zorunludur; trombositopeni, koagülopati veya acil kraniyotomiye dönüş riski yüksek hipervasküler lezyonlarda 2 Ünite ES hazır bulundurulabilir',
    transfusionProbability: '< %1 (İntraserebral masif hematom nedeniyle acil açık kraniyotomiye dönülmedikçe transfüzyon gerekmez)',
    criticalBleedingSources: [
      'Kortikal Giriş Noktasındaki Pial ve Sulkal Damarlar (Burr-hole altından biyopsi kanülü girerken yüzeyel ven/arter yaralanması)',
      'Hipervasküler Tümör İçi Anormal Neovasküler Yatak (Yüksek dereceli gliom, metastaz, hemanjiyoblastom veya anevrizmal yapılar)',
      'Derin Perforatör Damarlar (Talamoperforatör, lentikülostriat ve derin beyin sapı arterleri; talamostriat/internal serebral venler)',
      'Diploik ve Emisser Venler (Burr-hole açılışında kemik kenarı kanaması ve Venöz Hava Embolisi [VAE] giriş kapısı)'
    ],
    hemostasisStrategies: [
      'Preoperatif kontrastlı 3T MRG / MR anjiyografi ile sulkus, ventrikül ve pial damarlardan uzak güvenli biyopsi trasesinin (trajectory) planlanması',
      'İntraoperatif Sıkı Kan Basıncı Kontrolü: Biyopsi iğnesi parankime ilerletilirken ve doku örneği kesilirken sistolik KB < 130 - 140 mmHg (hastanın bazalinin ±%15 sınırında) tutulmalıdır; ani hipertansif pik intrakraniyel kanamayı katlar',
      'Biyopsi sonrası kanül içinden berrak geri dönüş kontrolü, gerektiğinde ılık serum fizyolojik yıkaması ve koagülopatinin sıfırlanması',
      'Acil Plan: Biyopsi kanülünden durmayan aktif arteriyel kanama, ani Cushing yanıtı veya postoperatif nörolojik kötüleşmede derhal Kranial BT ve açık kraniyotomi/hematom boşaltma hazırlığı'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Endotrakeal Anestezi (GETA — Propofol + Remifentanil TIVA veya < 0.8 MAC Sevofluran/İzofluran + Remifentanil): Çerçevesiz (Mayfield) nöronavigasyon biyopsileri, Ommaya rezervuarı, KİBAS/kitle etkisi bulunanlar, arka çukur/beyin sapı lezyonları, pediatrik, ajite/konfüze veya zor hava yolu olan hastalarda ALTIN STANDARTTIR',
      'Monitörize Anestezi Bakımı (MAC) + Çivi Yeri/Skalp Lokal Anestezik Bloğu: Yalnızca kooperatif, KİBAS/orta hat şifti olmayan, havayolu düşük riskli seçilmiş çerçeveli supratentoryal biyopsi olgularında (titre Deksmedetomidin 0.2 - 0.5 mcg/kg/saat veya ultra-düşük doz Remifentanil)'
    ],
    alternative: [
      'Çerçeveli Biyopside Genel Anestezi (GETA): Çerçeve lokal anesteziyle takılıp görüntüleme tamamlandıktan sonra ameliyathanede çerçevenin ön barı çıkarılarak veya videolaringoskop/fiberoptik ile güvenli entübasyon altında genel anestezi'
    ],
    clinicalRationale: 'Stereotaktik biyopsi olgularının çoğunda peritümöral ödem, kitle etkisi ve KİBAS bulunduğundan MAC sedasyonunun yol açabileceği hafif bir hipoventilasyon ve hiperkapni dahi akut herniasyonu tetikleyebilir; bu nedenle KİBAS, beyin sapı/posterior fossa yerleşimi, kooperasyon bozukluğu veya çerçevesiz Mayfield kullanımında GETA ile kontrollü normokapni (PaCO2 32 - 35 mmHg) en güvenli yaklaşımdır. Seçilmiş KİBAS\'sız çerçeveli olgularda MAC tercih edilirse sürekli yan akım EtCO2 kapnografi ve çerçeve acil sökme anahtarı zorunludur.',
    notes: 'STEREOTAKTİK BİYOPSİDE 6 HAYATİ ANESTEZİ KURALI: (1) PCNSL ŞÜPHESİNDE STEROİD YASAĞI (POBK DAHİL DEKSAMETAZON VERME!); (2) KİBAS + ÇERÇEVE HAVA YOLU KİLİTLENMESİ VE HİPERKAPNİ TEHLİKESİ; (3) YARI OTURUR POZİSYONDA VENÖZ HAVA EMBOLİSİ (VAE); (4) PNÖMOSEFALİ, BEYİN ŞİFTİ VE N2O YASAĞI; (5) BİYOPSİ SONRASI İLK 2-6 SAAT YÜKSEK HEMATOM PENCERESİ VE UYANMADA GECİKMEDE ACİL BT; (6) ANTİKOAGÜLAN KESİMİ VE TANSİYON KONTROLÜ.',
    rulesTitle: 'STEREOTAKTİK BEYİN BİYOPSİSİNDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'PRİMER SSS LENFOMASI (PCNSL) ŞÜPHESİNDE MUTLAK STEROİD YASAĞI',
        content: 'Periventriküler/derin kitlede Primer SSS Lenfoması (PCNSL) ayırıcı tanıda ise histopatolojik doku alınana kadar KESİNLİKLE Deksametazon veya herhangi bir kortikosteroid VERİLMEZ (POBK profilaksisi dahil!). Tek doz steroid dahi lenfoma hücrelerinde hızlı apoptoz ve "kaybolan tümör" (vanishing tumor) fenomeni yaratarak biyopsiyi tanısal olmaktan çıkarır. POBK profilaksisi için yalnızca Ondansetron (5-HT3 antagonisti) ve TIVA kullanılır.'
      },
      {
        number: 2,
        title: 'KİBAS / KİTLE ETKİSİ + KİLİTLİ STEREOTAKTİK ÇERÇEVE HAVA YOLU TEHLİKESİ',
        content: 'Biyopsi hastalarında kitle etkisi ve KİBAS sık olduğundan MAC sedasyonu altında gelişen hipoventilasyon ve hiperkapni (↑ PaCO2) serebral vazodilatasyonla akut herniasyonu tetikler! KİBAS/orta hat şifti, bilinç bulanıklığı veya beyin sapı lezyonunda GETA seçilmelidir. Rijit çerçeveli (Leksell/CRW) hastalarda ağız açıklığı ve boyun fleksiyonu kilitlidir: Videolaringoskop, Fiberoptik, LMA ve çerçevenin 4 vidasını saniyeler içinde sökecek alyan anahtarı (Allen key) çerçeveye/masaya flasterle sabitlenmiş olarak daima hazır tutulmalıdır.'
      },
      {
        number: 3,
        title: 'YARI OTURUR POZİSYONDA VENÖZ HAVA EMBOLİSİ (VAE) FARKINDALIĞI',
        content: 'Burr-hole kalp seviyesinin üzerinde olduğunda açık diploik veya dural venlerden Venöz Hava Embolisi (VAE) gelişebilir. Ani EtCO2 düşüşü, desatürasyon, hipotansiyon, taşikardi (uyanık hastada ani öksürük/dispne) saptandığında derhal cerrah uyarılır, saha serum fizyolojik ve kemik mumuyla kapatılır, %100 O2 verilir, baş indirilir (güvenliyse sol yan pozisyon), jugüler venöz kompresyon ve vazopresör destek uygulanır.'
      },
      {
        number: 4,
        title: 'N2O KONTRENDİKASYONU, PNÖMOSEFALİ VE BEYİN ŞİFTİ (BRAIN SHIFT) ÖNLEMİ',
        content: 'Dural açılışta subdural aralığa hava girmesi (pnömosefali) ve BOS kaybı beynin 5 - 10 mm kaymasına (brain shift) yol açarak stereotaktik koordinatları saptırır ve biyopsinin hedefi ıskalamasına neden olur. Baş elevasyonu aşırı yapılmamalı (15 - 20°), burr-hole serum fizyolojik/jelatin süngerle hızla kapatılmalı ve pnömosefali ile VAE hacmini genişleten N2O KESİNLİKLE kullanılmamalıdır.'
      },
      {
        number: 5,
        title: 'BİYOPSİ SONRASI İLK 2 - 6 SAAT YÜKSEK HEMATOM PENCERESİ VE ACİL BT PROTOKOLÜ',
        content: 'Semptomatik post-biyopsi intraserebral hematomların büyük çoğunluğu ilk 2 - 6 saatte (özellikle ilk 2 saatte) klinik verir. Anestezi sonunda uyanmada gecikme (failure to emerge), yeni fokal nörolojik defisit (hemiparezi, afazi, anizokori) veya GKS düşüşü gelişirse nöroşirürji ekibi derhal uyarılır, hava yolu güvenceye alınır ve vakit kaybetmeden ACİL KRANİAL BT çekilerek gerekirse açık kraniyotomiye geçilir.'
      },
      {
        number: 6,
        title: 'SIKI KAN BASINCI KONTROLÜ, KOAGÜLASYON OPTİMİZASYONU VE İLAÇ DEVAMLILIĞI',
        content: 'Biyopsi kanülü parankime girerken sistolik KB < 130 - 140 mmHg tutulmalı ve pürüzsüz ekstübasyon sağlanmalıdır. Tüm antikoagülan/antiagreganlar ajana özgü doğru sürelerde kesilmiş ve koagülasyon tam normal olmalıdır. Eşlik eden Parkinson hastalığı olan olgularda tanısal beyin biyopsisi için L-Dopa ve dopamin agonistleri ASLA kesilmez; düzenli dozlar kesintisiz sürdürülür.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Nöroradyoloji Konsültasyonu: 3 Tesla kontrastlı MRG, MR spektroskopi/perfüzyon ve BT incelemesi ile lezyon lokalizasyonu (supratentoryal vs beyin sapı/posterior fossa), kitle etkisi, orta hat şifti (> 5 mm KİBAS göstergesi), hidrosefali, kistik/nekrotik yapı ve Primer SSS Lenfoması (PCNSL) şüphesinin kesinleştirilmesi.',
      'Nöroloji / Onkoloji / Enfeksiyon Hastalıkları Konsültasyonu: PCNSL şüphesinde steroid yasağının cerrahi ve anestezi ekibi arasında yazılı teyidi; immünsüprese/HIV/transplant hastalarında fırsatçı enfeksiyon, eşlik eden organ disfonksiyonu ve nöbet profilaksisi (Levetirasetam) değerlendirmesi.',
      'Kardiyoloji / Hematoloji Konsültasyonu: Hipertansiyon regülasyonu (intraoperatif SKB < 130 - 140 mmHg hedefi); antikoagülan/antiagregan kullanan yüksek tromboemboli veya koroner stent riskli hastalarda ilaç kesim ve köprüleme (bridging) planı.'
    ],
    historyAndPhysical: [
      'KİBAS ve Nörolojik Taban Muayenesi: Baş ağrısı, bulantı-kusma, letarji, papilödem, Cushing yanıtı bulguları; bilinç (GKS), pupilla simetrisi, 4 ekstremite motor kuvveti, konuşma ve kranyal sinir muayenesi (postoperatif karşılaştırma için bazal kayıt şarttır).',
      'Steroid Durumunun Teyidi: PCNSL şüphesi varsa steroid VERİLMEMELİDİR (POBK profilaksisi dahil). Non-lenfoma metastaz/gliom nedeniyle halihazırda yüksek doz Deksametazon kullanan olgularda ise hiperglisemi ve adrenal supresyon değerlendirilir.',
      'Kronik İlaçların Devamlılığı: Antiepileptikler (Levetirasetam vb.) ve eşlik eden Parkinson hastalığı varsa L-Dopa/dopamin agonistleri tanısal biyopsi için KESİNLİKLE kesilmez; ameliyat sabahı zamanında verilir.',
      'Zor Hava Yolu ve İşbirliği Değerlendirmesi: Çerçeveli stereotakside çerçevenin ağız açıklığı ve boyun hareketini kilitleyeceği öngörülerek Mallampati, tiromental mesafe, servikal mobilite, OSA, klostrofobi ve hastanın supin/yarı oturur pozisyonda hareketsiz kalabilme kapasitesi değerlendirilir.'
    ],
    laboratoryAndTests: [
      'AJANA ÖZGÜ ANTİKOAGÜLAN VE ANTİAGREGAN KESİLME PROTOKOLÜ (İntrakraniyel Yüksek Kanama Riski):',
      '  - Varfarin: ~5 gün önce kesilir, işlem öncesi INR ≤ 1.2 - 1.3 doğrulanır (yüksek tromboemboli riskinde DMAH köprüleme: profilaktik son doz ≥ 12 saat, terapötik son doz ≥ 24 saat önce kesilir).',
      '  - DOAC (Apiksaban, Rivaroksaban, Edoksaban): En az 48 - 72 saat önce kesilir (böbrek fonksiyonuna göre).',
      '  - Dabigatran: En az 72 - 96 saat önce (CrCl < 50 mL/dk ise ≥ 96 - 120 saat) kesilir.',
      '  - Klopidogrel: 5 - 7 gün; Prasugrel: 7 - 10 gün; Tikagrelor: 5 gün; Aspirin: 5 - 7 gün önce kesilir (yakın tarihli koroner stent/yüksek kardiyovasküler riskte nöroşirürji–kardiyoloji ortak kararıyla bireyselleştirilir).',
      'Tam Kan Sayımı ve Koagülasyon Paneli: Hb/Hct, Trombosit ≥ 100.000/mm³, PT/INR, aPTT, Fibrinojen (koagülopati kesinlikle düzeltilmeden biyopsi yapılmaz).',
      'Kan Grubu, Antikor Tarama ve Tip & Screen (T&S) doğrulaması.',
      'Serum Elektrolitleri (Na+ — SIADH/tuz kaybı taraması), Glukoz, Böbrek ve Karaciğer Fonksiyon Testleri.',
      'Nöronavigasyon veya Stereotaktik Planlama İstasyonuna Yüklenmiş İnce Kesit BT ve Kontrastlı 3T MRG Füzyon Verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, vücut sıcaklığı ve ZORUNLU sürekli kapnografi (GETA\'da end-tidal CO2, MAC\'te yan akım [sidestream] nazal EtCO2 — hipoventilasyonu ve VAE\'yi anında yakalar).',
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line — Tragus/Kalp Seviyesinde Sıfırlanmış): Kontrolsüz hipertansiyon, KİBAS, beyin sapı/derin talamik lezyon, yarı oturur pozisyon veya ciddi kardiyopulmoner komorbiditesi olan olgularda (SKB < 130 - 140 mmHg sıkı kontrolü ve PaCO2/ABG analizi için) kuvvetle önerilir.',
      'Venöz Hava Embolisi (VAE) İzlemi: Yarı oturur pozisyonda sürekli EtCO2 trendi; yüksek riskli dik pozisyonlarda prekordiyal Doppler ultrasonografi (en duyarlı non-invaziv VAE dedektörü).',
      'Mesane Sondası (Foley): 2 saati aşan, ozmotik diüretik (Mannitol) kullanılan veya genel anestezi altındaki olgularda saatlik idrar çıkışı ve mesane distansiyonu kontrolü.',
      'Nöromusküler İleti Monitörizasyonu (TOF): GETA altında tam gevşeme takibi ve uyanmada rezidüel blokajın sıfırlanması (ekstübasyon sonrası nörolojik muayenenin güvenilirliği için).'
    ],
    vascularAccess: [
      'En az 2 adet güvenli periferik intravenöz yol (16G - 18G; cerrahi manipülasyondan uzak ekstremitelerde)',
      'Gereğinde invaziv radiyal arter kanülasyonu ve kısa etkili antihipertansif (Esmolol, Nikardipin, Labetalol) infüzyon/bolus hazırlığı'
    ],
    patientPosition: 'Supin (Sırtüstü) veya Hafif Yarı Oturur (Semi-Fowler, 15 - 20° Elevasyon); Posterior Fossa/Oksipital Girişimlerde Lateral veya Prone',
    patientPositionDetails: [
      'Çerçeveli Stereotakside: Leksell/CRW çerçevesi masa adaptörüne kilitlenir; baş aşırı yükseltilmez (15 - 20°), çünkü aşırı diklik pnömosefali, beyin şifti ve Venöz Hava Embolisi (VAE) riskini artırır.',
      'Çerçevesiz (Frameless) Nöronavigasyonda: Baş 3 pinli Mayfield başlık ile sabitlenir; boyun aşırı rotasyon/fleksiyonundan kaçınılarak internal juguler ven drenajı (KİBAS kontrolü) korunur.',
      'MAC Olgularında: Cerrahi örtü şeffaf çadır (drape tent) şeklinde düzenlenerek klostrofobi azaltılır; hastanın yüzü, konuşması ve solunumu doğrudan gözlemlenir.',
      'Bası Koruması ve Göz Güvenliği: Diz altı desteği, topuk jel pedleri ve GETA\'da koruyucu göz pomadı/bandı uygulanır.'
    ],
    anesthesiaManagement: [
      '1. Çerçeve veya Mayfield Pin Tespiti Fazı:',
      '  - 4 çerçeve vidası veya 3 Mayfield pini kafatasına sıkılırken şiddetli nosiseptif sempatik pik ve ani hipertansiyon gelişir.',
      '  - Müdahale: Pin yerlerine lokal anestezik infiltrasyonu (%0.25 - 0.5 Bupivakain veya Ropivakain — kümülatif toksik doz sınırına dikkat) + GETA\'da anestezi derinliğinin geçici artırılması (Remifentanil/Fentanil/Propofol bolusu) veya kısa etkili beta-bloker (Esmolol).',
      '2. Genel Anestezi (GETA) Protokolü (Çerçevesiz, KİBAS\'lı, Beyin Sapı veya Kooperatif Olmayan Olgular):',
      '  - İndüksiyon: Propofol (1.5 - 2.5 mg/kg titre) + Fentanil (2 - 3 mcg/kg) veya Remifentanil + Rokuronyum (0.6 mg/kg); indüksiyon/laringoskopi hipertansiyonunu ve KİBAS artışını önleyerek pürüzsüz entübasyon.',
      '  - İdame: Propofol + Remifentanil TIVA (özellikle KİBAS\'ta serebral kan hacmini ve ödemi azaltır) veya < 0.8 MAC Sevofluran/İzofluran + Remifentanil. N2O KESİNLİKLE KULLANILMAZ.',
      '  - Ventilasyon: Normokapni / hafif hipokapni (PaCO2 32 - 35 mmHg); hiperkapni kesinlikle önlenir.',
      '3. MAC + Lokal Anestezi Protokolü (Yalnızca Seçilmiş KİBAS\'sız Çerçeveli Olgular):',
      '  - Skalp insizyonu ve çivi yerlerine derin lokal anestezik bloğu; solunumu baskılamayan hafif Deksmedetomidin (0.2 - 0.5 mcg/kg/saat) veya ultra-düşük doz Remifentanil (0.02 - 0.05 mcg/kg/dk).',
      '  - Aşırı sedasyon, üst hava yolu obstrüksiyonu ve hiperkapniden (EtCO2 > 40 - 45 mmHg → KİBAS/herniasyon!) KESİNLİKLE kaçınılır.',
      '4. POBK Profilaksisi ve PCNSL Uyarısı:',
      '  - PCNSL şüphesinde Deksametazon KESİNLİKLE VERİLMEZ! Yalnızca Ondansetron (4 mg IV) + TIVA kullanılır.',
      '  - Non-lenfoma olgularda Ondansetron 4 mg IV + (cerrahi ekibin onayıyla) Deksametazon 4 - 8 mg IV verilebilir.',
      '5. Biyopsi / Kist Aspirasyonu / Ommaya Yerleşimi Sırasında Hemodinami:',
      '  - İğne veya kateter beyin parankimine girerken SKB < 130 - 140 mmHg tutulur; ani öksürme/hareket tam engellenir.'
    ],
    airwayManagement: [
      'ÇERÇEVELİ (LEKSELL/CRW) HASTADA ACİL HAVA YOLU ALGORİTMASI:',
      '  - Stereotaktik çerçeve ağız açıklığını ve boyun fleksiyonunu fiziksel olarak kilitler; konvansiyonel direkt laringoskopi imkansızdır!',
      '  - Hiperangüle Videolaringoskop (GlideScope/McGrath), Fiberoptik bronkoskop, LMA ve çerçevenin 4 vidasını saniyeler içinde sökecek alyan anahtarı (Allen key) çerçeveye/yatağa flasterle sabitlenmiş olarak başucunda hazır tutulmalıdır.',
      'MAC Olgularında: Nazal kanül ile O2 + ZORUNLU yan akım (sidestream) EtCO2 kapnografi; desatürasyon veya CO2 retansiyonunda sedasyon derhal kesilir.',
      'GETA Olgularında: Sağlam tespitli (Mayfield/lateral/prone pozisyonlarda spiral telli) oral ETT; kaf basıncı 20 - 25 cmH2O.'
    ],
    criticalSurgicalStages: [
      '1. Çerçeve veya Mayfield Pin Tespiti ve Görüntüleme/Navigasyon Doğrulaması: Sempatik hipertansif pik kontrolü.',
      '2. Burr-Hole Açılışı ve Dural Koagülasyon: Pnömosefali, beyin şifti ve Venöz Hava Embolisi (VAE) riskinin en yüksek olduğu aşama.',
      '3. Biyopsi Kanülü / Ommaya Kateterinin Hedefe İlerletilmesi ve Seri Doku Örneklemesi (Frozen İnceleme): SKB < 130 - 140 mmHg mutlak kan basıncı kontrolü ve hareketsizlik.',
      '4. İntraoperatif Kanama Kontrolü: Kanül aspirasyonunda taze kan gelmesi halinde kan basıncı kontrolü, yıkama ve hematom açısından acil görüntüleme/kraniyotomi hazırlığı.',
      '5. Burr-Hole Kapanışı, Çerçeve/Mayfield Çıkarılması ve Derlenme.'
    ],
    emergenceNotes: [
      'Öksürmesiz ve Ikınmasız Pürüzsüz Uyanma (Smooth Emergence): Ekstübasyon sırasındaki öksürük ve hipertansiyon taze biyopsi yatağında ölümcül intraserebral hematoma yol açar! IV Lidokain (1 - 1.5 mg/kg) veya düşük doz Remifentanil eşliğinde pürüzsüz ekstübasyon; SKB < 130 - 140 mmHg (Esmolol/Labetalol/Nikardipin) tutulur.',
      'Hızlı Nörolojik Değerlendirme: Bilinç (GKS), kooperasyon, pupiller, konuşma ve 4 ekstremite motor gücü ameliyathanede belgelenir.',
      'UYANMADA GECİKME (FAILURE TO EMERGE) VE ACİL BT PROTOKOLÜ: Hasta beklenenden geç uyanıyorsa, anizokori, yeni hemiparezi veya afazi varsa rezidüel anestezik/kas gevşetici/hipoglisemi hızla dışlanırken VAKİT KAYBETMEDEN ACİL KRANİAL BT çekilir (entübe hastada hava yolu korunarak BT\'ye transport).'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal ve Nörolojik Muayeneyi Maskelemeyen Analjezi Protokolü (PROSPECT Craniotomy 2023 İlkeleriyle Uyumlu):',
      '  - Çivi Giriş Yerleri ve Burr-Hole Skalp İnsizyonuna Lokal Anestezik İnfiltrasyonu / Skalp Bloğu (%0.25 Bupivakain veya %0.25 - 0.5 Ropivakain — kümülatif toksik doz sınırlarına dikkat).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon; pediatrik 15 mg/kg).',
      '  - Kurtarma Analjeziği: Yalnızca gerekirse küçük titre doz kısa etkili IV Fentanil (25 mcg) veya düşük doz Oksikodon/Hidromorfon (aşırı sedasyondan kaçınılır).',
      '  - KESİNLİKLE KAÇINILACAKLAR: Tramadol (intrakraniyel kitleli hastalarda nöbet eşiğini düşürür!) ve taze beyin biyopsisi sonrası erken dönemde rutin IV NSAİİ (Deksketoprofen/Ketorolak — intrakraniyel kanama riski! NSAİİ ancak nöroşirürji hemostazı ve kontrol BT ile kanama dışlandıktan sonra ≥ 24 saatte düşünülebilir).'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi Kılavuzu (Mestdagh et al., EJA 2023) temel ilkeleri doğrultusunda insizyonel lokal anestezik infiltrasyonu / skalp bloğu ve düzenli Parasetamol bazlı opioid-koruyucu analjezi, sedasyonu ve postoperatif bulantı-kusmayı (POBK) en aza indirerek güvenilir nörolojik izlem sağlar.'
    ],
    erasRecommendations: [
      'Postoperatif Güvenlik ve İzlem Protokolü:',
      '  - KRİTİK 2 - 6 SAAT HEMATOM GÖZLEM PENCERESİ: Post-biyopsi intraserebral kanamaların büyük çoğunluğu ilk 2 - 6 saat içinde klinik verir. Bu süre boyunca yakın yoğun bakım/PACU nörolojik takibi (15 - 30 dk aralıklarla GKS, pupilla, motor güç) ve nöroşirürji protokolüne göre postoperatif 2 - 4. saatte kontrol Kranial BT çekilmesi esastır.',
      '  - Sıkı Kan Basıncı Kontrolü: İlk 24 saatte sistolik KB < 130 - 140 mmHg tutulmalıdır.',
      '  - POBK Kontrolü: Kusma ve öğürme intrakraniyel basıncı artırarak biyopsi yatağı kanamasını tetikler; Ondansetron (4 mg IV) ile agresif profilaksi sağlanır (PCNSL kesin histopatoloji alınana dek Deksametazon verilmez!).',
      '  - Antiepileptik ve Kronik İlaçların Devamı: Mevcut antiepileptikler ve Parkinson ilaçları (L-Dopa) kesintisiz sürdürülür.',
      '  - Kontrol BT temiz ve nörolojik muayene stabil ise postoperatif 4 - 6. saatte kademeli oral alım ve mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery - Stereotactic Procedures. Philadelphia: Wolters Kluwer.',
    prospectReference: 'Mestdagh, F. P., Lavand\'homme, P. M., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group of ESRA. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Field, M., Witham, T. F., Flickinger, J. C., Kondziolka, D., & Lunsford, L. D. (2001). Comprehensive assessment of hemorrhage risks and outcomes after stereotactic brain biopsy. Journal of Neurosurgery, 94(4), 545-551.',
      'Riche, M., Amelot, A., Peyre, M., Capelle, L., Carpentier, A., & Mathon, B. (2021). Complications after frame-based stereotactic brain biopsy: a systematic review. Neurosurgical Review, 44(1), 301-307.',
      'Hoang-Xuan, K., Deckert, M., Ferreri, A. J. M., et al. (2023). European Association of Neuro-Oncology (EANO) guidelines for treatment of primary central nervous system lymphoma (PCNSL). Neuro-Oncology, 25(1), 37-53.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Practice Guidelines for Perioperative Neuroanesthesia and Stereotactic Intracranial Procedures.'
    ]
  }
};
