import { ProcedureDefinition } from '../../types/procedures';

/**
 * Cerrahi Analjezik Yöntemler: Omurilik Stimülasyonu (SCS), İntratekal İlaç Pompaları ve Motor Korteks Stimülasyonu (MCS)
 * (Surgical Analgesics: Spinal Cord Stimulation, Intrathecal Pumps, and Cortical Stimulation)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: 
 * Surgical Analgesics: Spinal Cord Stimulation, Intrathecal Pumps, and Cortical Stimulation, pp. 486-492),
 * Neuromodulation Appropriateness Consensus Committee (NACC), Polyanalgesic Consensus Conference (PACC),
 * International Neuromodulation Society (INS), Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Nöromodülasyon Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const surgicalAnalgesicsStimulationPumps: ProcedureDefinition = {
  id: 'surgical-analgesics-scs-itp-mcs',
  name: 'Cerrahi Analjezik Yöntemler: Omurilik Stimülasyonu (SCS), İntratekal İlaç Pompaları ve Motor Korteks Stimülasyonu (MCS)',
  shortCode: 'SCS-İTP-MCS',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Ağrı Nöroşirürjisi (Nöromodülasyon)',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal ve konvansiyonel cerrahi tedavilere dirençli şiddetli kronik nöropatik, iskemik veya nosiseptif ağrı ve spastisite olgularında uygulanan üç ana cerrahi nöromodülasyon yöntemini kapsar: (1) Omurilik Stimülasyonu (Spinal Cord Stimulation - SCS): Perkütan silindirik elektrot veya açık laminotomi/laminektomi ile dorsal epidural mesafeye çok kontaklı paddle (plaka) elektrot yerleştirilerek omurilik dorsal kolonunun elektriksel olarak uyarılması ve subkütan puls jeneratörüne (IPG) bağlanmasıdır; Melzack-Wall Kapı Kontrol Teorisi uyarınca kalın A-beta lifleri uyarılarak nosiseptif C-lif iletimi presinaptik olarak baskılanır. (2) İntratekal İlaç Dağıtım Sistemleri (Intrathecal Drug Delivery Systems - ITDD / Ağrı & Baklofen Pompası): Lomber subaraknoid mesafeye intratekal kateter yerleştirilerek anterior karın duvarında subkütan cebe implante edilen programlanabilir bir infüzyon pompasına bağlanmasıdır; omurilik dorsal boynuzundaki opioid (Morfin/Hidromorfon) veya GABA-B (Baklofen) reseptörlerine mikrogram düzeyinde doğrudan ilaç iletimi sağlayarak sistemik toksisiteyi bertaraf eder. (3) Motor Korteks Stimülasyonu (Motor Cortex Stimulation - MCS): Santral inme sonrası ağrı (talamik ağrı sendromu) veya trigeminal anesteziya dolorosa gibi inatçı santral nöropatik tablolarda; kraniyotomi ile primer motor korteks (M1 / precentral gyrus) üzerine epidural/subdural strip elektrot dizilimi yerleştirilerek subklaviküler jeneratöre tünellenmesidir.',
  indications: [
    'Omurilik Stimülasyonu (SCS) Endikasyonları: Başarısız Bel Cerrahisi Sendromu (Failed Back Surgery Syndrome - FBSS), Kompleks Bölgesel Ağrı Sendromu (CRPS Tip I ve II / Refleks Sempatik Distrofi / Kozalji), cerrahiye/revaskülarizasyona uygun olmayan şiddetli Periferik Arter Hastalığı (PAH) iskemik ekstremite ağrıları, refrakter anjina pektoris (inoperabl iskemik kalp hastalığı), post-herpetik nevralji, diyabetik ağrılı periferik nöropati',
    'İntratekal Baklofen (ITB) Pompası Endikasyonları: Serebral palsi, spinal kord yaralanması, multipl skleroz (MS) ve inme sekeline bağlı oral antispastik ilaçlara dirençli veya tolere edilemeyen şiddetli spastisite (Ashworth Skoru ≥ 3-4)',
    'İntratekal Analjezik (Morfin/Zikonotid) Pompası Endikasyonları: İleri evre kanser ağrıları (refrakter malign ağrı), aksiyel başarısız bel cerrahisi sendromu, konservatif tedavilere dirençli yaygın kronik nöropatik ve somatik ağrılar',
    'Motor Korteks Stimülasyonu (MCS) Endikasyonları: Santral inme sonrası ağrı (Central Post-Stroke Pain - CPSP / Talamik Ağrı Sendromu / Dejerine-Roussy Sendromu), Trigeminal Anesteziya Dolorosa, atipik fasiyal nöropatik ağrı, Fantom Ekstremite Ağrısı, Brakiyal Pleksus Avülsiyon Ağrısı',
    'Donanım Revizyonu ve Pil Değişimi: Batarya ömrü tükenen şarj edilebilir/edilemeyen jeneratörlerin (IPG) veya pompa rezervuarlarının cerrahi değişimi, elektrot/kateter migrasyonu veya kırılması revizyonları'
  ],
  averageDuration: '1.5 - 4.0 saat (Perkütan SCS Lead + IPG implantasyonu: 1.5 - 2.5 saat; Açık Laminotomi Paddle Lead SCS + IPG: 2.0 - 3.5 saat; İntratekal Pompa implantasyonu [Lomber girişim + Abdominal cep + Tünelleme]: 1.5 - 2.5 saat; Motor Korteks Stimülasyonu [Kraniyotomi + Faz Dönüşümü / N20 Haritalama + Subklaviküler IPG]: 3.0 - 4.5 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '50 - 200 mL (Perkütan SCS ve İntratekal Pompada < 30 - 100 mL [minimal]; Açık Torasik Laminotomi Paddle SCS ve MCS Kraniyotomisinde 100 - 250 mL)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Hacimli Cerrahi Kan Kaybı (Ancak Dar Spinal Kanal ve Epidural Alanda Hematom Basısı Felç Riski Taşır)',
    crossMatchRequirement: 'Tip & Screen (T&S) kan grubu doğrulaması zorunludur; açık laminotomi veya kraniyotomi planlanan olgularda 1-2 Ünite Eritrosit Süspansiyonu (ES) hazır bulundurulmalıdır',
    transfusionProbability: '< %2 (Standart nöromodülasyon olgularında transfüzyon son derece nadirdir)',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — özellikle açık laminotomi, ligamentum flavum rezeksiyonu ve dural ayrışmada masif venöz kanama riski)',
      'Spinal Arteriyel Perforatörler ve Radiküler Damarlar (Foraminal girişimlerde)',
      'Abdominal / Gluteal Cep Hematomu (A. epigastrica inferior dalları, A. circumflexa ilium superficialis veya gluteal perforatörler)',
      'Subkütan Tünel Hattı Kanamaları (Geniş trokar geçişi esnasında vasküler yırtılmalar)',
      'MCS İçin: Dural orta meningeal arter dalları, dural sinüs komşulukları ve kortikal yüzeyel venler'
    ],
    hemostasisStrategies: [
      'Titiz bipolar mikronöroşirürjikal koagülasyon (spinal kord veya dural yüzeyde monopolar koter KESİNLİKLE kullanılmaz)',
      'Epidural venöz kanamalarda hemostatik ajanlar (FloSeal, Surgicel, Gelfoam + pamuk basısı)',
      'Abdominal ve gluteal jeneratör/pompa ceplerinde bipolar ile tam kuruluk sağlanması; hematom gelişimini önlemek için cep içi yıkama ve aspirasyon',
      'Kraniyotomi kenarlarında dural asıcı sütürler ve kemik mumu uygulaması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Perkütan SCS Girişimi İçin: Lokal Anestezi + Monitörize Anestezi Bakımı (MAC) / Titre Edilmiş Sedasyon (Deksmedetomidin infüzyonu veya Düşük Doz Remifentanil/Propofol). Hasta test aşamasında TAM UYANIK ve KOOPERE olmalı; parestezinin ağrılı sahayı örtüşünü teyit etmelidir',
      'Açık Laminotomi Paddle Lead SCS İçin: Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil). İntraoperatif SSEP / MEP nöromonitörizasyonu yapılacağından cerrahi test aşamasında nöromusküler blokajdan kaçınılır',
      'İntratekal İlaç Pompası (ITB/Ağrı) İçin: Endotrakeal Genel Anestezi (GETA) veya Lokal Anestezi + MAC Sedasyon (hasta toleransı ve hava yolu anatomisine göre)',
      'Motor Korteks Stimülasyonu (MCS) İçin: Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) eşliğinde Uyanık/Asedatif Faz Dönüşümü ve Kortikal Haritalama (veya uyanık kraniyotomi protokolü)'
    ],
    alternative: [
      'Spinal veya Epidural Blok: Perkütan veya açık SCS girişimlerinde KONTRENDİKEDİR (nörolojik parestezi testini ve epidural mesafe ayırt etmeyi engeller)',
      'Revizyon ve Pil Değişimi Olgularında: Yalnızca cep açılışı gerektiren olgularda Lokal Anestezi + Hafif Sedasyon'
    ],
    clinicalRationale: 'Perkütan SCS girişimlerinde intraoperatif parestezi haritalaması için hastanın test anında uyanık ve koopere kalabilmesi amacıyla titre edilebilir MAC + spontan solunum (nazal O2) gerekirken; açık laminotomi ile paddle lead veya MCS olgularında İONM (SSEP/MEP) sinyallerini korumak ve prone pozisyonda hava yolunu güvenceye almak için kürarsız Propofol + Remifentanil TIVA ile spiral telli ETT altın standarttır.',
    notes: 'CERRAHİ ANALJEZİK VE NÖROMODÜLASYON GİRİŞİMLERİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) SCS\'DE İNTRAOPERATİF PARESTEZİ TESTİ VE HASTA KOOPERASYONU — Perkütan lead yerleştirilirken cerrah test uyarımı verir; hastanın elektrot stimülasyonunun ağrılı bölgeyi %80-100 oranında kapsadığını ("parestezi örtüşmesi") net olarak ifade etmesi şarttır. Aşırı derin sedasyon hastanın cevabını bozar; test sırasında hasta tam uyanık olmalıdır. Açık paddle lead girişimlerinde ise SSEP/MEP kollizyon testi için kas gevşeticiler antagonize edilmiş olmalıdır. (2) PRONE POZİSYONDA KARIN BASINCI VE EPİDURAL KANAMA — Prone pozisyonda batın serbest bırakılmalıdır (Wilson çerçevesi veya göğüs-pelvis yastıkları); batına binen dış bası Vena Cava Inferior\'u sıkıştırarak Batson epidural venöz pleksusunda masif konjesyona ve durdurulması güç epidural kanamalara yol açar. (3) İNTRATEKAL POMPALARDA BAKLOFEN VE OPİOİD AKUT DOZ AŞIMI VE YOKSUNLUK TEHLİKESİ — Pompa dolumu, cerrahi test veya kazara yüksek doz verilmesinde akut Baklofen/Opioid toksisitesi (şiddetli hipotansiyon, bradikardi, flaksid paralizi, hipotermi, koma ve solunum arresti) gelişebilir (Antidot: Lomber BOS aspirasyonu, mekanik ventilasyon, destek tedavi). Tam tersi, pompanın aniden durması veya kateter tıkanması ölümcül Baklofen Yoksunluk Fırtınasına (hipertermi, masif rijidite, rabdomiyoliz, nöbet, multiorgan yetmezliği) yol açar! (4) MOTOR KORTEKS STİMÜLASYONUNDA FAZ DÖNÜŞÜMÜ (PHASE REVERSAL) VE AMELİYAT MASASINDA NÖBET KONTROLÜ — M1 motor şeridinin tespiti için SSEP N20/P20 faz dönüşümü ve doğrudan kortikal elektrik uyarımı yapılır. Kortikal stimülasyon fokal/jeneralize nöbeti tetikleyebilir; kortekse dökmek üzere BUZLU SOĞUK SERUM FİZYOLOJİK (cold saline) ve IV Propofol/Levetirasetam anında hazır olmalıdır! (5) TÜNELLEME AĞRISI VE ENFEKSİYON PROTOKOLÜ (SIFIR TOLERANS) — Lomber/kranyal alandan abdominal/subklaviküler cebe uzanan subkütan tünel oluşturulması şiddetli ağrılı ve vagal/hemodinamik dalgalanmalara açıktır; tünel hattına lokal anestezik infiltre edilmelidir. İmplante edilen yabancı cisimler (IPG, pompa, elektrot) enfekte olursa tüm sistemin EKSPLANTASYONU (çıkarılması) gerekir; profilaktik Vankomisin/Sefazolin zamanında uygulanmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Algoloji / Ağrı Tıbbı Konsültasyonu: Hastanın kronik ağrı etiyolojisi (FBSS, CRPS, diyabetik nöropati, kanser), daha önce uygulanan girişimsel enjeksiyonlar, perkütan deneme (trial) aşamasındaki ağrı azalma yüzdesi (en az %50 ağrı azalması doğrulanmalıdır) ve hedeflenen dermatom seviyesi.',
      'Nöroloji Konsültasyonu: İntratekal baklofen pompası takılacak olgularda spastisite haritası, Ashworth skalası ve preoperatif intratekal baklofen bolus test yanıtı; MCS adaylarında talamik inme veya santral nöropati tanısının ve motor korteks lezyonlarının teyidi.',
      'Kardiyoloji Konsültasyonu: Refrakter anjina pektoris veya periferik arter hastalığı (PAH) nedeniyle SCS planlanan olgularda altta yatan koroner yetmezlik, fonksiyonel kapasite ve EKO parametreleri; prone pozisyonun kardiyak önyüke etkileri.',
      'Psikiyatri / Klinik Psikoloji Değerlendirmesi: Kronik ağrı nöromodülasyonu öncesinde majör depresyon, ikincil kazanç beklentisi, aktif madde bağımlılığı ve tedaviye uyumun tespiti.',
      'Enfeksiyon Hastalıkları Konsültasyonu: Vücutta aktif lokal veya sistemik enfeksiyon odağı varlığı (implant cerrahisinde mutlak kontrendikasyondur).'
    ],
    historyAndPhysical: [
      'Ayrıntılı Nörolojik Taban Muayenesi: Ekstremitelerin motor kuvveti (0-5 skalası), duyusal dermatom seviyeleri, patolojik refleksler (Babinski, klonus) ve mesane/bağırsak kontrolü preoperatif belgelenmelidir.',
      'Hava Yolu ve Servikal Hareketlilik: Prone veya lateral pozisyonda entübasyon tüpü güvenliği, servikal spondiloz veya ankilozan spondilit varlığı.',
      'Cerrahi Girişim Yerleri Cilt Muayenesi: Lomber giriş sahası, gluteal bölge, abdominal kadran veya pektoral alanlarda aktif enfeksiyon, egzama veya skar dokusu kontrolü.',
      'Kronik Opioid ve Sedatif Kullanım Hikayesi: Yüksek doz opioid toleransı, yoksunluk riskleri ve olası postoperatif hiperaljezi öyküsü.'
    ],
    laboratoryAndTests: [
      'ANTİKOAGÜLAN VE ANTİAGREGAN KESİLME PROTOKOLÜ (ASRA / NACC / ESRA): Epidural hematom parapleji riski nedeniyle kesindir! Aspirin 7 gün önce, Klopidogrel 7 gün önce, Tikagrelor 5 gün önce, Varfarin INR ≤ 1.4 olana dek kesilmeli; DOAC grubu (Apiksaban, Rivaroksaban, Dabigatran) en az 48-72 saat önce durdurulmalıdır. Profilaktik LMWH en az 12 saat önce kesilmelidir.',
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³ olmalıdır) ve Koagülasyon Paneli (PT, aPTT, INR).',
      'Serum Elektrolitleri, Glukoz, BUN, Kreatinin ve eGFR düzeyi.',
      'Omurga / Kranyal MRG ve BT Görüntülemeleri: Epidural boşluğun açık olup olmadığı, spinal stenoz veya önceki füzyon cerrahilerine bağlı fibröz yapışıklıklar incelenir.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (özellikle epidural girişim esnasında vazovagal bradikardi takibi için sesli puls tonu açık), NIBP (3-5 dk aralıkla), SpO2, EtCO2 ve Vücut Sıcaklığı.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Şiddetli kardiyovasküler hastalığı olan, açık laminotomi uygulanan veya MCS kraniyotomisi planlanan hastalarda sürekli tansiyon takibi.',
      'İntraoperatif Nöromonitörizasyon (İONM): Açık paddle lead ve MCS girişimlerinde SSEP, Transkraniyal MEP, EMG ve Kortikal Faz Dönüşümü (N20/P20) kaydı.',
      'Mesane Sondası: 2 saati aşan ameliyatlarda veya genel anestezi altındaki girişimlerde idrar çıkışı takibi (> 0.5 mL/kg/saat).',
      'Skopi (C-Kollu Floroskopi) Güvenliği: Çoklu floroskopik açı kontrolleri sırasında hastanın korunması ve anestezi ekibinin kurşun önlük/tiroid koruyucu kullanımı.'
    ],
    vascularAccess: [
      'En az 1 veya 2 adet geniş lümenli (16-18G) periferik intravenöz yol (pronedan önce solüsyon akışları ve güvenliği teyit edilmelidir)',
      'Gereğinde invaziv arteriyel hat'
    ],
    patientPosition: 'SCS ve İntratekal Pompada PRONE (Yüzüstü) veya LATERAL DEKÜBİTÜS; MCS olgularında SUPİN (Baş Mayfield Pinleri İle Çevrilmiş)',
    patientPositionDetails: [
      'PRONE POZİSYONDA KARIN RÖTARI: Göğüs ve pelvis altına silikon destekler konularak batın tamamen serbest asılı bırakılır; batın basısı Vena Cava Inferior\'u tıkamamalı ve Batson epidural pleksus kanamasını artırmamalıdır.',
      'Yüz, Gözler ve Bası Noktaları: Göz kürelerine sıfır bası (ProneView koruyucu kask veya jel yastık); dudaklar, burun ucu ve kulaklar serbest tutulur.',
      'Kollar vücut yanında veya dirsekler 90° fleksiyonda baş hizasında nötral desteklenir; ulnar ve brakiyal pleksus gerilimi engellenir.',
      'Bacaklar dizlerden hafif fleksiyonda tutularak lumbosakral lordoz düzleştirilir ve Touhy iğnesi için spinal lamina aralıkları açılır.',
      'İntratekal pompa takılırken karın cebine erişim için hasta hafif lateral açıyla veya modifiye lateral/prone konumlandırılır.'
    ],
    anesthesiaManagement: [
      'Perkütan SCS\'de Uyanık Parestezi Haritalaması Protokolü:',
      '  - Hasta lokal anestezi altında tutulurken düşük doz Deksmedetomidin (0.2-0.5 mcg/kg/saat) ile anksiyolitik ve sakin tutulur.',
      '  - C-kollu skopi altında Touhy iğnesi ile epidural aralığa girilir ve elektrot dorsal epidural hatta ilerletilir.',
      '  - Cerrah test uyarımı başlattığında sedasyon minimuma indirilir; hasta uyanık olarak elektrot titreşiminin/karıncalanmasının bacaklarındaki veya kolundaki ağrılı alanı %80-100 örtüp örtmediğini söyler.',
      'Açık Laminotomi Paddle Lead ve Genel Anestezi Yönetimi:',
      '  - Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) uygulanır.',
      '  - Nöromonitörizasyon (MEP/SSEP) yapılacağından entübasyon sonrası ek kas gevşetici verilmez.',
      'İntratekal Pompalarda Doz Aşımı ve Toksisite Önlemi:',
      '  - Pompa haznesi doldurulurken veya kateter yıkanırken yanlışlıkla sistemik veya yüksek doz intratekal ilaç (baklofen/morfin) kaçmamasına azami dikkat edilir.',
      '  - Akut Baklofen Doz Aşımı Belirtileri: Ani hipotansiyon, bradikardi, flaksid felç, koma ve apne. Müdahale: Acil entübasyon, mekanik ventilasyon, kateterden veya lomber ponksiyonla 30-40 mL BOS boşaltılması ve kardiyovasküler inotrop desteği.',
      'Motor Korteks Stimülasyonunda (MCS) Nöbet Protokolü:',
      '  - M1 motor korteksini haritalamak için doğrudan elektriksel stimülasyon uygulanırken ameliyat masasında epileptik nöbet tetiklenebilir.',
      '  - Cerrahi sahaya dökmek üzere BUZLU SOĞUK SERUM FİZYOLOJİK (cold saline) ve IV Propofol (30-50 mg bolus) / Levetirasetam hazır bulundurulur.',
      'Subkütan Tünelleme Sırasında Analjezik Destek:',
      '  - Omurgadan gluteal/abdominal/subklaviküler cebe trokar geçirilirken hat boyunca yoğun lokal anestezik infiltrasyonu yapılır ve derinlik geçici artırılır.'
    ],
    airwayManagement: [
      'Perkütan Uyanık Girişimlerde: Nazal kanül veya nazal yüksek akımlı oksijen; spontan solunum ve sözel iletişim kesintisiz korunur.',
      'Genel Anestezi Uygulanan Prone Olgularda: Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; tüpün ısırmaya veya bükülmeye karşı korunması ve sağlam flasterlenmesi.',
      'Kaf Basıncı Kontrolü: Prone pozisyonda kaf basıncı 20-25 cmH2O seviyesinde sabit tutulmalıdır.',
      'Ekstübasyonda Düzgün Uyanma: Öksürük ve ıkınmayı önlemek için IV Lidokain (1.0-1.5 mg/kg) uygulanır.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Floroskopik Anatomik Doğrulama (Skopi altında hedef vertebra seviyelerinin işaretlenmesi).',
      '2. Touhy İğnesi İle Epidural / Subaraknoid Giriş (Direnç kaybı [LOR] tekniği veya serbest berrak BOS akışı).',
      '3. Elektrot / İntratekal Kateterin Hedef Seviyeye İlerletilmesi ve Fascial Çapa (Anchor) İle Sabitlenmesi.',
      '4. İntraoperatif Test Fazı (SCS parestezi haritalaması / MCS faz dönüşümü / İTP kateter akış kontrolü).',
      '5. Subkütan IPG veya Pompa Cebinin Oluşturulması (Gluteal, anterior karın alt kadranı veya subklaviküler alan).',
      '6. Trokar Yardımıyla Subkütan Tünelleme ve Kablo/Kateterin Cihaza Kilitlenmesi.',
      '7. Cihaz Telemetrisi, Empedans Doğrulaması ve Katmanlı Su Geçirmez Kapanış.'
    ],
    emergenceNotes: [
      'Öksürme ve Ikınmasız Pürüzsüz Uyanma: Prone pozisyondan döndürülmeden önce veya sonra ekstübasyonda ıkınma, epidural venöz pleksus kanamasını tetikleyerek epidural hematom riskini artırır; IV Lidokain ile refleksler baskılanır.',
      'Acil Postoperatif Nörolojik Muayene: Hasta uyanır uyanmaz her iki bacak ve kolda istemli motor hareketler (ayak bileği dorsifleksiyonu, kuadriseps, başparmak) teyit edilip belgelenmelidir.',
      'Epidural Hematom Alarmı: Bacaklarda ani gelişen kuvvetsizlik veya uyuşukluk acil cerrahi eksplorasyon gerektiren epidural hematom belirtisidir; ilk 6 saat içinde boşaltılmalıdır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid Koruyucu Protokol:',
      '  - İnsizyon ve Tünel Hatlarına Lokal Anestezik İnfiltrasyonu (Bupivakain %0.25 + Epinefrin): Ameliyat sonu ilk 12 saatlik cep ağrısını belirgin hafifletir.',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Oral/IV NSAİİ (İbuprofen 400-800 mg veya Deksketoprofen 50 mg): Cerrahi hemostaz sağlandıktan sonra.',
      '  - Hastanın kronik nöropatik ağrı ilaçlarının (Gabapentin, Pregabalin, Duloksetin) ameliyat sonrası düzenli sürdürülmesi.',
      '  - Şiddetli cep ve tünel ağrıları için kontrollü düşük doz kurtarma opioidleri (Tramadol / Oksikodon).'
    ],
    prospectRecommendations: [
      'Omurga cerrahisi ve nöromodülasyon donanım implantasyonlarında insizyonel lokal anestezik infiltrasyonu, sistemik parasetamol ve selektif NSAİİ kullanımı postoperatif ağrıyı kontrol altına alarak erken mobilizasyonu sağlar.'
    ],
    erasRecommendations: [
      'ERAS Nöromodülasyon ve Fonksiyonel Nöroşirürji Rehberi:',
      '  - Erken Nörolojik Değerlendirme: Serviste saatlik motor güç ve duyu muayenesi; epidural hematom şüphesinde derhal acil MRG.',
      '  - Antikoagülan Tedaviye Başlama Zamanlaması: Postoperatif profilaktik antikoagülanlar cerrahın onayı ile hemostaz tam teyit edildikten en az 24 saat sonra başlatılmalıdır.',
      '  - İntratekal Pompalarda Doz Titrasyonu: Başlangıç dozu düşük tutulur; aşırı sedasyon, hipotansiyon ve solunum depresyonu izlenir.',
      '  - Enfeksiyon Koruması: Cerrahi pansumanların steril tutulması, implant enfeksiyonunu önlemek için profilaktik antibiyotiklerin 24 saat içinde sonlandırılması.',
      '  - Erken Oral Alım ve Postoperatif 4-6. Saatte Kademeli Mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Surgical Analgesics: Spinal Cord Stimulation, Intrathecal Pumps, and Cortical Stimulation, pp. 486-492. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Functional Neurosurgery and Neuromodulation: Consensus Guidelines. Journal of Neurosurgery.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Neuromodulation, Spine and Pain Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Deer, T. R., Mekhail, N., Provenzano, D., et al. (2014). The Appropriate Use of Neurostimulation of the Spinal Cord and Peripheral Nervous System for the Treatment of Chronic Pain and Ischemic Diseases: The Neuromodulation Appropriateness Consensus Committee (NACC). Neuromodulation: Technology at the Neural Interface, 17(6), 515-550.',
      'Deer, T. R., Pope, J. E., Hayek, S. M., et al. (2017). The Polyanalgesic Consensus Conference (PACC): Recommendations on Intrathecal Drug Infusion Systems Best Practices and Guidelines. Neuromodulation: Technology at the Neural Interface, 20(2), 96-132.',
      'Narouze, S., Benzon, H. T., Provenzano, D., et al. (2018). Interventional Spine and Pain Procedures in Patients on Antiplatelet and Anticoagulant Medications: Guidelines From the American Society of Regional Anesthesia and Pain Medicine (ASRA), the European Society of Regional Anaesthesia and Pain Therapy (ESRA), and the American Academy of Pain Medicine. Regional Anesthesia and Pain Medicine, 43(3), 225-262.',
      'Levy, R., Henderson, J., Slavin, K., et al. (2016). Consensus Guidelines for the Implementation and Management of Motor Cortex Stimulation in Chronic Neuropathic Pain Syndromes. Neurosurgery, 79(2), 241-252.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Guidelines on Intraoperative Neuromonitoring and Anesthetic Considerations in Functional Spine and Pain Neurosurgery.'
    ]
  }
};
