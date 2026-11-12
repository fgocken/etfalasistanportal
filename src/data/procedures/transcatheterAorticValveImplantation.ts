import { ProcedureDefinition } from '../../types/procedures';

/**
 * Transkateter Aort Kapak İmplantasyonu / Replasmanı (TAVİ / TAVR)
 * (Transcatheter Aortic Valve Implantation / Replacement)
 * 
 * Jaffe (5th ed., Section II/III: Cardiac & Vascular - Transcatheter Aortic Valve Replacement [TAVR], pp. 520-530),
 * 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease,
 * 2021 ESC/EACTS Guidelines for the management of valvular heart disease,
 * Society of Cardiovascular Anesthesiologists (SCA) Clinical Practice Advisory for TAVR
 * ve Heart Team Multidisipliner Protokolleri referans alınarak yapılandırılmıştır.
 */
export const transcatheterAorticValveImplantation: ProcedureDefinition = {
  id: 'transcatheter-aortic-valve-implantation',
  name: 'Transkateter Aort Kapak İmplantasyonu (TAVİ / TAVR): Transfemoral / Alternatif Girişimsel Aort Kapak Replasmanı',
  shortCode: 'KARD-TAVİ',
  specialty: 'kardiyoloji',
  secondarySpecialties: ['kvc'],
  specialtyName: 'Kardiyoloji & Kalp Damar Cerrahisi',
  categoryTag: 'Girişimsel Kardiyoloji & Yapısal Kalp Hastalıkları',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Şiddetli semptomatik aort darlığı (aortik stenoz) bulunan, açık cerrahi kapak replasmanı (SAVR) için yüksek veya orta cerrahi risk taşıyan (veya uygun anatomisi olan yaşlı/kırılgan) hastalarda, sternotomi ve kardiyopulmoner baypas (KPB) gerekmeksizin kateter temelli yöntemle biyoprotez aort kapağının anülüse yerleştirilmesidir. Girişimsel Kardiyoloji ve Kalp Damar Cerrahisi ortaklığında ("Heart Team") hibrit ameliyathanede veya gelişmiş anjiyografi laboratuvarında gerçekleştirilir. En yaygın ve tercih edilen yaklaşım Transfemoral (TF) yoldur; femoral arter uygun olmadığında alternatif olarak transaksiller/subklavyan, transkarotid, transaortik veya transapikal erişim yolları kullanılır. İşlem adımları: Femoral arter ve ven ponksiyonu, geçici transvenöz pacing elektrodunun sağ ventriküle yerleştirilmesi, retrograd yolla stenotik aort kapağının kılavuz tel ile geçilmesi, ön balon valvüloplasti (BAV - gerekirse), kriminlenmiş biyoprotez kapağın (Balonla genişleyen [Edwards SAPIEN] veya Kendiliğinden genişleyen [Medtronic CoreValve / Evolut]) floroskopi ve ekokardiyografi eşliğinde tam anülüs hizasına konumlandırılması, hızlı ventriküler pacing (Rapid Ventricular Pacing - RVP 180-220 bpm) esnasında kapağın açılması ve açılma sonrası anjiyografi/EKO ile paravalvüler kaçak (PVL) ve koroner açıklığın teyit edilerek vasküler kapatma cihazları (Perclose ProGlide, MANTA vb.) ile hemostaz sağlanmasıdır.',
  indications: [
    'Şiddetli Semptomatik Aort Darlığı (Aort kapak alanı < 1.0 cm² veya < 0.6 cm²/m², ortalama sistolik gradiyent ≥ 40 mmHg veya maksimum jet hızı ≥ 4.0 m/s) ile birlikte cerrahi kapak replasmanı (SAVR) için yüksek, orta veya belirlenmiş düşük cerrahi risk (STS/EuroSCORE II)',
    'İleri Yaş (≥ 75-80 yaş) veya Frailty (Kırılganlık / Yatağa bağımlılık riski yüksek olan geriatrik hastalar)',
    'Porselen Aort (Aort duvarında yaygın çepeçevre kalsifikasyon nedeniyle açık kros-klemplemenin imkansız olduğu olgular)',
    'Düşük Akım - Düşük Gradiyentli Aort Darlığı (Dobutamin stres ekokardiyografi ile kontraktil rezervi doğrulanmış şiddetli AS)',
    'Daha Önce Geçirilmiş KVC Cerrahisi (Sternotomi sonrası açık patent internal mammarian greftlerin cerrahi diseksiyon yaralanma riski)',
    'Valve-in-Valve TAVİ: Daha önce takılmış dejenere biyoprotez aort kapak içine perkütan kapak yerleştirilmesi',
    'Göğüs Radyoterapisi veya Ciddi Deformite Öyküsü (Açık cerrahi yaklaşımı kontrendike kılan toraks patolojileri)'
  ],
  averageDuration: '1.0 - 2.0 saat (Pozisyonlama, vasküler ultrason eşliğinde çift femoral kılıf girişi ve invaziv hatlar: 20-30 dk; Sağ ventrikül geçici pacemaker yerleşimi ve kapak geçişi: 20-30 dk; Balon valvüloplasti, RVP eşliğinde kapak açılması ve post-dilatasyon: 20-30 dk; Hemodinamik/ekokardiyografik PVL kontrolü ve perkütan vasküler kapatma: 15-25 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 300 mL (Standart sorunsuz transfemoral TAVİ olgularında minimal kan kaybı; ancak femoral arter diseksiyonu, kılıf çevresi yırtık, retroperitoneal hematom veya anülüs rüptüründe dakikalar içinde masif transfüzyon gerektiren ölümcül kanama tablosuna dönüşebilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Akut Retroperitoneal Kanama & Aort Anülüs Rüptüründe Masif Transfüzyon Riski',
    crossMatchRequirement: 'En az 2-4 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır; 2 Ünite Taze Donmuş Plazma (TDP) kan merkezinde rezerve edilmiş olmalıdır',
    transfusionProbability: '%10 - %20 (Femoral vasküler kapatma yetersizliği, retroperitoneal hematom, ileri yaş anemisi veya acil cerrahi konversiyonda transfüzyon gerekir)',
    criticalBleedingSources: [
      'Giriş Yeri ve Arteria Femoralis Communis / İliyak Arter Disseksiyonu veya Avülsiyonu',
      'Retroperitoneal Hematom (İnguinal ligaman yukarısından yüksek ponksiyonda eksternal iliyak arter yaralanması — sessiz ve ölümcül masif iç kanama odağıdır)',
      'Aort Kökü ve Anülüs Rüptürü (Özellikle aşırı kalsifiye anülüste aşırı boyutlu balon veya kapak şişirilmesiyle gelişir; masif perikardiyal tamponad ve kardiyojenik şok)',
      'Sol Ventrikül Apeks Perforasyonu (Sert "Amplatz / Safari" kılavuz telinin sert apeksi delmesi sonucu gelişen hemoperikardiyum / tamponad)',
      'Vasküler Giriş Kapatma Cihazı (ProGlide / MANTA) Başarısızlığına Bağlı Femoral Hematom'
    ],
    hemostasisStrategies: [
      'Titiz İntraoperatif Heparinizasyon ve ACT Takibi: Kılıf yerleşimi sonrası 50-70 IU/kg Heparin; hedef ACT 250-300 saniye (tromboemboli ile kanama riski dengesi)',
      'İşlem Sonunda Protamin ile Kısmi veya Tam Nötralizasyon: Kapatma cihazı uygulanmadan önce ACT kontrolü ile 0.5-1 mg Protamin / 100 IU Heparin yavaş IV infüzyon',
      'Ultrason ve Floroskopi Eşliğinde Vasküler Ponksiyon: Common femoral arter bifurkasyonunun altından veya inguinal ligamanın üstünden kaçınılarak güvenli giriş',
      'Perkütan vasküler kapatma yetersizliğinde acil balon tamponadı (kontralateral femoralden iliyak balonu ile oklüzyon) veya acil cerrahi cut-down / greftleme',
      'Hücre Kurtarıcı (Cell Saver) Cihazı ve Masif Transfüzyon Protokolü (MTP) hibrit salonda acil kullanıma hazır tutulmalıdır'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Monitörize Anestezi Bakımı (MAC / Bilinçli Sedasyon) + Lokal Anestezi İnfiltrasyonu: Güncel kılavuzlarda (ACC/AHA ve ESC) hemodinamik stabilitesi uygun transfemoral TAVİ olgularında İLK TERCİHTİR. Deksmedetomidin infüzyonu (0.2-0.6 mcg/kg/saat) veya titiz Remifentanil/Fentanil titrasyonu ile hastanın spontan solunumu ve hemodinamisi korunur, işlem anında uyanık nörolojik değerlendirme yapılabilir.'
    ],
    alternative: [
      'Endotrakeal Genel Anestezi (GETA) + İnvaziv Hemodinamik İzlem: TEE (Transözofageal Eko) ile sürekli izlem gerektiren vakalar, uyumsuz/aşırı anksiyeteli hastalar, solunum yetmezliği/ortopnesi olanlar, transfemoral dışı cerrahi yaklaşımlar (transapikal, transaortik) veya yüksek cerrahi konversiyon/komplikasyon riski taşıyan olgularda.'
    ],
    notes: 'TRANSKATETER AORT KAPAK İMPLANTASYONUNDA (TAVİ) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) HIZLI VENTRİKÜLER PACİNG (RAPİD VENTRICULAR PACING - RVP 180-220 bpm) VE DERİN GEÇİCİ HİPOTANSİYON YÖNETİMİ — Balon valvüloplasti ve balonla genişleyen kapak (Edwards SAPIEN) dağıtımı esnasında kalbin sistolik fırlatma gücünü sıfırlamak ve kapağın aort köküne fırlamasını (dislokasyonunu) engellemek için geçici transvenöz pacing ile 180-220 vuru/dk hızında pacing uygulanır. Bu fazda sistolik arter basıncı < 50 mmHg seviyesine düşer, nabız trasesi düzleşir. Pacing süresi 15-20 saniyeyi ASLA GEÇMEMELİDİR! Pacing kesildiği anda ventrikül fibrilasyonu (VF), inatçı ventriküler taşikardi (VT) veya derin vazodilatatör arrest gelişebilir. Anestezist pacing öncesi arteriyel dolumu korumak için vazopressör (Noradrenalin / Fenilefrin bolus) hazırlamalı, defibrilatör kaşıkları hastanın göğsünde hazır yapışık olmalıdır! (2) KARDİYOLOJİ-KVC "HEART TEAM" VE ACİL STERNOTOMİ / KPB / PERİKARDİYOSENTEZ HAZIRLIĞI — Aort anülüs rüptürü, aort diseksiyonu, sert tel ile sol ventrikül perforasyonu, akut tamponad veya koroner ostiyum tıkanması geliştiğinde mortalite dakikalar içinde %50\'nin üzerine fırlar. Bu nedenle TAVİ yapılan hibrit odada KVC cerrahı, cerrahi asistan ve perfüzyonist hazır bulunmalı; sternotomi seti, acil perikardiyosentez iğnesi ve KPB için tam doz heparin (300 IU/kg) hazır tutulmalıdır. (3) ANESTEZİ YAKLAŞIMI: MAC (BİLİNÇLİ SEDASYON) VS. GETA (GENEL ENDOTRAKEAL ANESTEZİ) — Modern TAVİ pratiğinde hastaların %80\'inden fazlası transfemoral yolla MAC (Monitored Anesthesia Care) altında yapılmaktadır. MAC yaklaşımı vazodilatasyonu azaltır, inotrop/vazopressör ihtiyacını düşürür, işlem süresince serebral iskemiyi/inmeyi anında tespit etmeye olanak sağlar ve erken mobilizasyon sunar. Ancak TEE ile sürekli görüntüleme şartsa, hasta sırtüstü yatamıyorsa (ortopne, KOAH), sol ventrikül fonksiyonu kritik derecede bozuksa veya cerrahiye dönüşüm ihtimali yüksekse gecikmeden Endotrakeal Genel Anestezi (GETA) uygulanmalıdır. (4) VASKÜLER GİRİŞ KOMPLİKASYONLARI VE RETROPERİTONEAL KANAMA TEYAKKUZU — 14-16 Fr kalın kılıfların kullanıldığı femoral arter hattında diseksiyon, yalancı anevrizma veya retroperitoneal kanama sıktır. Kılıf çekimi veya kapatma cihazı sonrası açıklanamayan ani taşikardi, dirençli hipotansiyon veya hematokrit düşüşü aksi kanıtlanana kadar RETROPERİTONEAL KANAMA kabul edilmeli; acil anjiyografik balon tamponadı veya cerrahi eksplorasyon başlatılmalıdır. (5) İLETİM SİSTEMİ HASARI (TAM AV BLOK, YENİ LBBB) VE PARAVALVÜLER KAÇAK (PVL) KONTROLÜ — Aort anülüs tabanındaki membranöz septum ve His demeti basısı nedeniyle, özellikle kendiliğinden açılan kapaklarda (Evolut / CoreValve) %15-25 oranında Tam AV Blok ve Sol Dal Bloğu (LBBB) gelişir. Geçici transvenöz pacemaker kılıfı ameliyat sonunda hemen çekilmemeli, hasta telemetrik monitorizasyon ile YBÜ\'ye çıkarılmalıdır. Kapak açıldıktan sonra gelişen paravalvüler kaçak (PVL) aort yetersizliği ve akut sol kalp yetmezliğine yol açacağından, ekokardiyografi ve hemodinamik diyastolik basınç eğrisi ile derhal değerlendirilmeli, gerekirse post-dilatasyon yapılmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Girişimsel Kardiyoloji & KVC Ortak Konseyi (Heart Team): EuroSCORE II / STS skorları, kırılganlık (frailty) indeksi, transfemoral damar lümeni uygunluğu (en az 5.0-5.5 mm lümen) ve koroner anatominin çok disiplinli değerlendirilmesi.',
      'Kardiyak Anesteziyoloji Konsültasyonu: Hava yolu değerlendirmesi (özellikle MAC sırasında acil entübasyon gereksinimi için zor hava yolu hazırlığı), frailty, böbrek yetmezliği, karotis darlığı ve pulmoner hipertansiyon riski.',
      'Girişimsel Radyoloji / Kardiyovasküler BT: Kontrastlı TAVİ Protokolü BT — Aort anülüs çapı, perimeter, koroner ostiyum yükseklikleri (LMCA ve RCA çıkış yüksekliği < 10-12 mm ise koroner oklüzyon riski yüksektir!), kalsifikasyon dağılımı, sinotübüler bileşke ve femoral/iliyak damar tortuozitesi/kalsifikasyonu.',
      'Göğüs Hastalıkları Konsültasyonu: Ciddi KOAH, pulmoner hipertansiyon, evde O2 bağımlılığı ve ortopne toleransı.'
    ],
    historyAndPhysical: [
      'Aort Darlığı Semptom Triadı: Senkop, Angina ve Kalp Yetersizliği / Efor Dispnesi (Semptomatik şiddetli AS\'de 2 yıllık mortalite %50\'dir).',
      'Fonksiyonel Kapasite ve Kırılganlık (Frailty): 5 metre yürüme testi, albümin düzeyi, günlük yaşam aktivitelerinde bağımlılık derecesi.',
      'Periferik Nabızlar ve Damar Erişimi: Femoral, popliteal, dorsalis pedis nabızları; önceki vasküler baypas veya stent öyküsü.',
      'Nörolojik Taban Muayenesi: Karotis üfürümü, geçirilmiş inme/GİA öyküsü ve bazal kognitif durum (Mini-Mental Test).'
    ],
    laboratoryAndTests: [
      'Transtorasik Ekokardiyografi (TTE): Aort kapak alanı, zirve ve ortalama gradiyent, SV ejeksiyon fraksiyonu (EF), eşlik eden mitral/triküspit regürjitasyonu ve pulmoner arter sistolik basıncı (PAB).',
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı; Heyde Sendromu [AS + GİS anjiyodisplazisi + edinilmiş von Willebrand eksikliği] açısından anemi taranmalıdır).',
      'Serum Kreatinin ve eGFR (Kontrast nefropatisi risk değerlendirmesi; işlem öncesi hidrasyon planı).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      '2-4 Ünite Eritrosit Süspansiyonu Cross-Match ve Kan Grubu Doğrulaması.',
      '12 Derivasyonlu EKG: Bazal PR aralığı, QRS süresi, sağ dal veya önceden mevcut sol dal bloğu (LBBB varlığında işlemde tam AV blok riski çok daha yüksektir).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (özellikle ST segment değişiklikleri ve yeni gelişen iletim blokları takibi), SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Arter Basınç İzlemi (A-Line): Genellikle sol radyal artere takılır (sağ femoral ve sol femoral kateter girişleri kardiyologlar tarafından kullanıldığı için; alternatif transaksiller yaklaşım gerekirse kontralateral arter tercih edilir). Pacing ve kapak açılması anında sürekli ve anlık basınç takibi şarttır.',
      'Santral Venöz Kateter (CVC): Vazopressör/inotrop infüzyonları ve gerektiğinde santral venöz basınç izlemi için (ultrason eşliğinde sağ internal juguler ven).',
      'Geçici Transvenöz Pacemaker Monitörizasyonu: Femoral venden sağ ventriküle yerleştirilen geçici bipolar pacing kateteri ve harici jeneratörün eşik/direnç testi.',
      'Defibrilasyon Pedleri (Hands-Free): Ameliyata başlamadan önce göğüs ön ve arka duvarına yapıştırılmış ve harici bifazik defibrilatöre bağlı olmalıdır.',
      'Serebral Oksimetre (NIRS / rSO2): MAC ve genel anestezide serebral hipoperfüzyon ve mikroembolizasyonu anlık izlemek için.',
      'Transözofageal Ekokardiyografi (TEE) veya Transtorasik Eko (TTE): Kapak pozisyonu, kapak genişlemesi, sol ventrikül kontraktilitesi, paravalvüler kaçak (PVL) ve perikardiyal efüzyon/tamponad kontrolü.',
      'Aktive Edilmiş Pıhtılaşma Zamanı (ACT): Bazal ölçüm ve heparinden sonra her 30 dakikada bir (hedef ACT 250-300 sn).'
    ],
    vascularAccess: [
      'Geniş lümenli periferik damar yolu (16G veya 14G) ve hızlı sıvı/kan infüzyon seti (Rapid Infuser hazırda).',
      'Kardiyoloji Girişleri: Ana femoral arter kılıfı (14-16 Fr TAVİ kılıfı), sekonder femoral arter kılıfı (6 Fr pig-tail anjiyo kateteri için), femoral venöz kılıf (6 Fr geçici pacemaker elektrodu için).',
      'Kardiyak Acil İlaç Hatları: Noradrenalin, Fenilefrin, Adrenalin, Atropin, Efedrin ve Kalsiyum Glukonat enjektörlerde çekili ve anestezi masasında hazır olmalıdır.'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Radyolusent Anjiyografi Masasında',
    patientPositionDetails: [
      'Kollar vücut yanına düzgünce tespit edilir (floroskopi C-kolunun açılanmasını engellememek için kolların nötral pozisyonda sarılması ve brakial pleksus basısının önlenmesi).',
      'Baş altına yumuşak jel destek konur; MAC altında hastanın burun kanülü ile oksijenasyonu sağlanır ve yüz örtüleri hastayı klostrofobik hissettirmeyecek şekilde asılır.',
      'Kasık bölgeleri (bilateral femoral) ve açık cerrahiye dönüşüm ihtimaline karşı tüm göğüs ön duvarı (jugulumdan simfizis pubise kadar) steril boyanır ve örtülür.'
    ],
    anesthesiaManagement: [
      'Monitörize Anestezi Bakımı (MAC) Protokolü:',
      '  - Hafif Anksiyoliz ve Sedasyon: Deksmedetomidin (0.2-0.5 mcg/kg/saat) veya Remifentanil (0.01-0.04 mcg/kg/dk TCI) ile hastanın sözel komutlara yanıt verebileceği (RASS -1 ila -2) derinlik sağlanır.',
      '  - Derin sedasyondan, hipoventilasyondan ve hiperkapniden kaçınılır (pulmoner hipertansiyonu ve ajitasyonu tetiklememek için).',
      '  - Cerrahi Giriş Yeri İnfiltrasyonu: Operatör tarafından bilateral femoral arter ponksiyon noktalarına ve çevre dokuya bol lokal anestezik (Lidokain %1 veya Bupivakain %0.25) uygulanır.',
      'Endotrakeal Genel Anestezi Protokolü (Seçilmiş Olgularda):',
      '  - Hemodinamik Olarak Stabil İndüksiyon: Etomidat (0.15-0.2 mg/kg) veya titre edilmiş Propofol (0.5-1 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil + Rokuronyum (0.6 mg/kg).',
      '  - İdame: Sevofluran / Desfluran veya TIVA (Propofol + Remifentanil). Sistemik vasküler rezistansın (SVR) düşmesini önlemek için erken Noradrenalin infüzyonu titre edilir.',
      'Kritik Aort Darlığında Hemodinamik Hedefler (KARDİNAL KURALLAR):',
      '  - Kalp Hızı: 60-80 vuru/dk (Sinüs ritmi hayati öneme sahiptir; taşikardi diyastolik koroner dolumu bozar, bradikardi ise sabit atım hacmi nedeniyle debiyi çökertir).',
      '  - Ön Yük (Preload): Yüksek-normal tutulmalıdır (hipertrofik sol ventrikülün dolumu için adil venöz dolum şarttır; hipovolemi tolere edilemez).',
      '  - Art Yük (Afterload): SVR korunmalıdır; periferik vazodilatasyon kritik koroner perfüzyon basıncını düşürerek ölümcül spiral iskemi yaratır.',
      '  - Kontraktilite: Korunmalı veya inotropla desteklenmelidir.',
      'Hızlı Ventriküler Pacing (RVP) Fazı Yönetimi:',
      '  - Cerrah ve anjiyografi ekibiyle senkronize geri sayım yapılır: "Pacing başlıyor: 3, 2, 1, Pacing On".',
      '  - Hız 180-220 bpm\'e çıkarılır; arter trasesinde nabız basıncının < 15-20 mmHg ve sistolik basıncın < 50 mmHg olduğu doğrulanır.',
      '  - Kapak açıldığı anda: "Pacing Off".',
      '  - Basıncın hızla toparlanması için gerekirse Noradrenalin (10-20 mcg) bolus verilir; ritim takibi yapılır (VF gelişirse derhal senkronize olmayan 200J DC şok!).',
      'Kapak Yerleşimi Sonrası Değerlendirme:',
      '  - Paravalvüler Kaçak (PVL) Kontrolü: Aort kökü anjiyografisi ve EKO ile değerlendirilir; diyastolik arter basıncında ani düşüş ve geniş nabız basıncı PVL lehinedir.',
      '  - Koroner Ostiyum Açıklığı: ST elevasyonu veya ani bradikardi/hipotansiyon durumunda sol ana koroner (LMCA) oklüzyonu düşünülmeli; anjiyografik stentleme hazırlığı yapılmalıdır.',
      '  - İletim Blokları Kontrolü: Yeni LBBB veya tam AV blok saptanırsa geçici pacemaker devrede tutulur.',
      'İşlem Sonu ve Protamin Uygulaması:',
      '  - Başarılı kapak kontrolü sonrası operatör onayıyla Protamin (0.5-1 mg/100 IU Heparin) yavaş IV puşe/infüzyon ile verilir; vasküler kapatma cihazları uygulanır.'
    ],
    airwayManagement: [
      'MAC Olgularında: Burun kanülü ile 2-4 L/dk O2 veya Venturi maske uygulanır. Kapnografi (EtCO2 örneklemeli nazal kanül) ile solunum sayısı ve dalga formu kesintisiz izlenir.',
      'Acil Hava Yolu Yönetimi Hazırlığı: Ani anülüs rüptürü, tamponad veya kardiyak arrest durumunda saniyeler içinde entübasyon gerekebileceğinden, videolaringoskop, uygun boyutta endotrakeal tüpler, stileler ve aspiratör başucunda hazır kilitli tutulmalıdır.',
      'Genel Anestezi Olgularında: Standart oral endotrakeal entübasyon; TEE probu yerleşimi esnasında orofaringeal travmadan kaçınılmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Giriş Yolu Ponksiyonu ve Kılıfların Yerleştirilmesi (Sağ femoral ana TAVİ kılıfı, sol femoral pigtail ve femoral ven pacemaker kılıfı).',
      '2. Sistemik Heparinizasyon ve ACT Kontrolü (ACT > 250 sn).',
      '3. Geçici Pacemaker Elektrodunun Sağ Ventriküle Yerleştirilmesi ve Eşik Testi (Pacing capture kontrolü).',
      '4. Kılavuz Tel ve Kateter ile Aort Kapağının Retrograd Geçilmesi ve Sol Ventriküle Pigtail / Sert Tel Yerleşimi.',
      '5. Balon Aortik Valvüloplasti (BAV - Gerekli anatomik olgularda ön dilatasyon).',
      '6. Biyoprotez Kapağın İlerletilmesi ve Aortik Anülüs Düzeyinde Floroskopik / Eko Doğrulaması.',
      '7. Hızlı Ventriküler Pacing (RVP 180-220 bpm) Başlatılması, Hipotansiyon Teyidi ve Kapağın Açılması / Dağıtımı.',
      '8. Pacingin Sonlandırılması, Hemodinaminin Toparlanması ve Post-Dilatasyon (Kapak tam açılmadıysa veya ciddi PVL varsa).',
      '9. Aort Kökü Anjiyografisi, Koroner Akımların Doğrulanması, EKO ile PVL ve Perikard Efüzyonu Taraması.',
      '10. Protamin Nötralizasyonu, Femoral Kapatma Cihazlarının (ProGlide / MANTA) Kapatılması ve Femoral Hemostaz Kontrolü.'
    ],
    emergenceNotes: [
      'MAC Olgularında: İşlem bitiminde sedasyon infüzyonu kesilir; hasta hemen komutlara uyar hale gelir. Kasık hematomu kontrol edilir; ayak parmak hareketleri, periferik nabızlar ve nörolojik durum (fasiyal simetri, konuşma, kolların motor gücü) masada test edilir.',
      'Genel Anestezi Ekstübasyonu: Hemodinamik stabilite tam sağlandıktan, vasküler kapatma cihazları kontrol edildikten ve perikardiyal tamponad ekarte edildikten sonra hasta masada ekstübe edilebilir veya sedatize olarak KVC Yoğun Bakıma transfer edilir.',
      'MASADA NÖROLOJİK MUAYENE (AKUT İNME TARAMASI):',
      '  - Kalsifiye aort kapağı ve aort arkus manipülasyonu serebral mikroemboli riskini artırır.',
      '  - Bilinç durumu, konuşma (afazi/dizartri), karşı kol ve bacak kuvveti anında değerlendirilir.',
      'İLETİM SİSTEMİ KONTROLÜ: EKG ritmi (Sinüs vs. Tam AV blok vs. Yeni LBBB). Geçici pacemaker jeneratörü güvenli bir şekilde yatağa sabitlenmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Düşük Ağrı Skoru: Transfemoral TAVİ minimal invaziv bir girişim olduğundan postoperatif ağrı çoğunlukla kasık giriş yerlerindeki hafif sızı ile sınırlıdır.',
      'Düzenli IV Parasetamol (1000 mg 6-8 saatte bir infüzyon).',
      'Gerektiğinde hafif oral/parenteral analjezikler (Tramadol 50 mg IV); sedatif narkotiklerden nörolojik takibi maskelememek için kaçınılır.',
      'Kasıkta ani şiddetli ağrı olması durumunda hematom, vasküler oklüzyon veya retroperitoneal kanama şüphesiyle derhal fizik muayene ve görüntüleme yapılmalıdır.'
    ],
    prospectRecommendations: [
      'PROSPECT & Minimal İnvaziv Kardiyak Girişim Önerileri: Lokal anestezik infiltrasyonu ile optimal kasık analjezisi; erken postoperatif dönemde aşırı opioid sedasyonunun önlenmesi, kognitif deliryum riskinin azaltılması ve aynı gün mobilizasyonun desteklenmesi.'
    ],
    erasRecommendations: [
      'ERAS ve TAVİ Klinik Yol Haritası (Fast-Track TAVI):',
      '  - KVC / Koroner Yoğun Bakım İzlemi: İlk 12-24 saat sürekli invaziv arter basıncı, telemetrik EKG ve geçici pacemaker takibi.',
      '  - Hemodinamik Hedefler: Normotansiyon (MAP 65-85 mmHg); aşırı hipertansiyon paravalvüler sızıntıyı ve vasküler ponksiyon yeri hematomunu artırır.',
      '  - Vasküler Giriş Yeri ve Kompresyon Takibi: Kasık bandajı, periferik nabızlar (Dorsalis pedis ve Tibialis posterior) ve hematom gelişimi saatlik kontrol edilir; kum torbası protokolü uygulanır.',
      '  - İletim Sistemi Takibi (Kalıcı Pacemaker Endikasyonu): PR uzaması veya yeni LBBB gelişen hastalar en az 24-48 saat telemetride tutulur; tam AV blokta kalıcı pacemaker (PPM) takılır.',
      '  - Renal Koruma (Kontrast Nefropatisi Önleme): İşlem sonrası yeterli izotonik hidrasyon (1 mL/kg/saat) ve idrar çıkışı takibi (> 0.5 mL/kg/saat).',
      '  - Erken Mobilizasyon ve Taburculuk: Femoral kapatma cihazı başarılı olan ve hemodinamisi stabil seyreden MAC hastaları 4-6. saatte yatak içi hareketlendirilir, ertesi gün taburculuk planlanabilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: "Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section II/III: Cardiac & Vascular Surgery - Transcatheter Aortic Valve Replacement (TAVR/TAVI), pp. 520-530. Philadelphia: Lippincott Williams & Wilkins.",
    erasReference: 'ESC/EACTS 2021 Guidelines for the management of valvular heart disease. European Heart Journal, 42(36), 3598–3672. Fast-track and minimalist TAVI pathways.',
    prospectReference: 'Society of Cardiovascular Anesthesiologists (SCA) Clinical Practice Advisory for the Anesthetic Management of Patients Undergoing Transcatheter Aortic Valve Replacement (TAVR). Journal of Cardiothoracic and Vascular Anesthesia.',
    otherReferences: [
      'Otto, C. M., et al. (2020). 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease. Circulation, 143(5), e72-e227.',
      'Mayr, N. P., et al. (2020). Sedation versus general anesthesia for transcatheter aortic valve implantation: the randomized SOLVE-TAVI trial. European Heart Journal, 41(25), 2364-2373.',
      'Hyman, M. C., et al. (2017). Conscious Sedation Versus General Anesthesia for Transcatheter Aortic Valve Replacement: Insights from the STS/ACC TVT Registry. Circulation, 136(22), 2132-2140.',
      'Kappetein, A. P., et al. (2012). Updated standardized endpoint definitions for transcatheter aortic valve implantation: the Valve Academic Research Consortium-2 (VARC-2) consensus document. European Heart Journal, 33(19), 2403-2418.',
      'Miller, R. D., et al. (2020). Miller\'s Anesthesia (9th ed.). Chapter 65: Anesthesia for Cardiac Surgical Procedures - Structural Heart Disease & TAVR. Elsevier.'
    ]
  }
};
