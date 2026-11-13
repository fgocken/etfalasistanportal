import { ProcedureDefinition } from '../../types/procedures';

/**
 * Ventriküler Şant Girişimleri: Ventriküloperitoneal ve Ventriküloatrial Şant Cerrahisi (VP / VA Şant)
 * (Ventricular Shunt Procedures: Ventriculoperitoneal & Ventriculoatrial Shunting)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Pediatric & Adult: Ventricular Shunt Procedures, pp. 463-468),
 * AANS/CNS Pediatric & Adult Hydrocephalus Guidelines,
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Nöroşirürji Konsensus Raporları referans alınarak yapılandırılmıştır.
 */
export const ventricularShuntProcedures: ProcedureDefinition = {
  id: 'ventricular-shunt-procedures',
  name: 'Ventriküler Şant Girişimleri: Ventriküloperitoneal ve Ventriküloatrial Şant Cerrahisi (VP / VA Şant)',
  shortCode: 'VP-ŞANT-HİDROSEFALİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Pediatrik & Erişkin Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Beyin ventrikülleri içerisinde aşırı biriken Beyin Omurilik Sıvısının (BOS) yarattığı hidrosefali ve kafa içi basınç artışını (KİBAS) kalıcı olarak tedavi etmek amacıyla; lateral ventriküle (genellikle sağ Kocher noktası veya parietal Keen/Dandy noktası) yerleştirilen proksimal ventriküler kateterin, tek yönlü basınç ayarlı bir valv (pompa haznesi) aracılığıyla cilt altı tünelleme ile başka bir emilim kompartmanına bağlanması ameliyatıdır. En yaygın yöntem periton boşluğuna yönlendirilen Ventriküloperitoneal (VP) Şanttır; periton içi yapışıklık veya cerrahi kontrendikasyon varlığında kateter V. Jugularis Interna yoluyla sağ atriyum girişine yönlendirilerek Ventriküloatrial (VA) Şant, veya plevral boşluğa yönlendirilerek Ventriküloplevral (VPl) Şant uygulanır.',
  indications: [
    'Konjenital Hidrosefali (Pediatrik Olgular): Akuaduktus Sylvii stenozu, Dandy-Walker malformasyonu, Chiari Tip II malformasyonu ve miyelomeningosel ile ilişkili hidrosefali',
    'Edinsel / Post-Hemorajik Hidrosefali: Prematüre yenidoğanlarda intraventriküler kanama (IVH) sonrası veya erişkinlerde spontan Anevrizmatik Subaraknoid Kanama (SAK) sonrası gelişen BOS emilim bozukluğu',
    'Post-Menenjitik ve Enfeksiyöz Hidrosefali: Menenjit sonrası araknoid villusların fibrozisle tıkanması',
    'Tümöral / Obstrüktif Hidrosefali: Arka çukur, 3. ventrikül veya pineal bölge kitlelerinin foramen Monroi veya akuaduktu tıkaması sonucu gelişen akut KİBAS dekompresyonu',
    'Normal Basınçlı Hidrosefali (NPH - Hakim-Adams Triadı): İleri yaşta progresif yürüme ataksisi, üriner inkontinans ve demans (bilişsel yıkım) ile seyreden, lomber boşaltıcı ponksiyon (Tap test) ile klinik düzelme gösteren olgular',
    'Şant Malfonksiyonu ve Revizyonu: Ventriküler kateter tıkanması (koroid pleksus invazyonu), valv mekanik arızası, distal kateter psödokisti, şant enfeksiyonu veya kateter kopması'
  ],
  averageDuration: '1.0 - 2.5 saat (Anestezi indüksiyonu, pozisyonlama, antibiyotik profilaksisi ve cerrahi örtüm: 30-40 dk; Kranyal burr-hole açılışı ve ventriküle kateter girişi: 20-30 dk; Boyun, göğüs ve batın boyunca cilt altı tünel açılması [trokar/tünelleyici]: 20-30 dk; Laparoskopik veya açık mini-laparotomi ile distal kateterin peritona [veya V. jugularis üzerinden atriyuma] yerleştirilmesi ve şantın çalışmasının doğrulanması: 20-30 dk; Kapanış ve uyanma: 15-25 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 150 mL (Standart VP şant cerrahisinde kan kaybı ihmal edilebilir / minimal düzeydedir; ancak prematüre yenidoğanlarda, ventriküler ponksiyonda koroid pleksus yırtılmasında veya VA şant internal juguler ven diseksiyonunda kan kaybı nispi olarak artabilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Risk / Minimal Cerrahi Kanama (Pediatrikte Dikkat)',
    crossMatchRequirement: 'Erişkinlerde: Kan grubu ve T&S doğrulaması yeterlidir (rutin kan hazırlığı gerekmez). Pediatrik / Yenidoğanlarda: Tip & Screen ve 1 Ünite rekonstitüe taze eritrosit hazır bulundurulmalıdır',
    transfusionProbability: '< %1 - %5 (Erişkinlerde <%1; düşük doğum ağırlıklı prematüre bebeklerde %5-10)',
    criticalBleedingSources: [
      'Ventriküler Kateter Girişi: Ventrikül duvarında foramen Monro komşuluğundaki koroid pleksus damarlarının veya talamostriat venlerin yırtılması (akut intraventriküler hemoraji riski)',
      'Subkütan Tünelleme Hattı: Boyun ve klavikula üzerinden geçerken genişlemiş cilt altı venlerinin trokar ile zedelenmesi',
      'VA Şantta V. Jugularis Interna / V. Facialis Dalları: Vasküler giriş esnasında venöz kanama ve Venöz Hava Embolisi (VAE) riski',
      'Mini-Laparotomi / Trokar Giriş Yeri: A. epigastrica inferior dalları veya mezenter damarları'
    ],
    hemostasisStrategies: [
      'Skalp burr-hole kenarlarında kemik mumu ve bipolar koagülasyon',
      'Ventriküler kateter yerleştirilirken aşırı forseps manipülasyonundan kaçınılması; kateter ucundan berrak pulsatil BOS akışının görülmesi',
      'Tünelleme öncesinde subkütan hatta adrenalinli lokal anestezik infiltrasyonu (hem analjezi hem vasokonstriksiyon)',
      'VA şantta juguler ven kanülasyonu sırasında Trendelenburg pozisyonu verilerek hava embolisinin önlenmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA) — İnhalasyonel Anestezi (Sevofluran) veya TIVA (Propofol + Remifentanil): Kas gevşetici ile tam kontrollü mekanik ventilasyon',
      'Laparoskopik VP şant uygulanacak olgularda endotrakeal genel anestezi ZORUNLUDUR (pnömoperitoneum ve artan karın içi basınca karşı hava yolu güvenliği)'
    ],
    alternative: [
      'Sedasyon Altında Lokal Anestezi (Çok Nadir): Yalnızca genel anesteziyi kaldıramayacak kadar ağır komorbiditeli ileri evre yoğun bakım hastalarında acil ventrikülostomi/şant revizyonunda'
    ],
    clinicalRationale: 'Baş, boyun, göğüs duvarı ve batını aynı steril örtü altında birleştiren ağrılı subkütan tünelleme ile (laparoskopik yerleşimde) pnömoperitoneum basıncına karşı tam hareketsizlik ve kontrollü PaCO2 gerektiğinden kas gevşeticili endotrakeal genel anestezi (GETA) altın standarttır. Örtü altında başa erişim kısıtlı olacağından ve yüksek hava yolu basınçları gelişebileceğinden LMA yerine sağlam tespitli kaflı ETT zorunludur.',
    notes: 'ŞANT CERRAHİSİNDE ANESTEZİNİN 5 KRİTİK KLİNİK NOKTASI: (1) SUBKÜTAN TÜNELLEME MASİF AĞRILIDIR — Trokar baş bölgesinden boyun, klavikula ve göğüs duvarını geçip batına ilerletilirken çok şiddetli sempatik deşarj (ani hipertansif fırlama, taşikardi veya uyanma çabası) gelişir; tünelleme hattı lokal anestezikle bloke edilmeli veya derin anestezi/opioid bolusu sağlanmalıdır! (2) PNÖMOPERİTONEUM VE KİBAS ETKİLEŞİMİ — Laparoskopik yerleşimde batına CO2 insüflasyonu (10-14 mmHg) diyaframı yukarı iter, intratorasik basıncı ve CVP\'yi artırarak serebral venöz dönüşü engeller; kafa içi basınç (ICP) geçici olarak yükselir! Laparotomi tercih edilmeli veya insüflasyon basıncı düşük (< 8-10 mmHg) tutulmalıdır, (3) AŞIRI BOS BOŞALMASI (OVERDRAINAGE) TEHLİKESİ — Ventriküle girildiğinde cerrah uzun süre serbest BOS akıtırsa beyin aniden çökerek kortikal köprü venlerini yırtabilir ve akut SUBDURAL HEMATOM / HİGROMA oluşturabilir; BOS kontrollü boşaltılmalıdır, (4) VA ŞANT VE HAVA EMBOLİSİ / ARİTMİ — Kateter sağ atriyuma girerken hava embolisi riski ve mekanik fokal aritmiler (ventriküler ekstrasistoller) gelişebilir; EKG izlemi şarttır, (5) SIKI STERİLİTE VE ENFEKSİYON KORUMASI — Şant enfeksiyonu en yıkıcı komplikasyondur; profilaktik antibiyotik cerrahi kesiden 30 dk önce verilmiş olmalı, ameliyathane trafiği sıfıra indirilmelidir.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji Konsültasyonu: Kranial BT veya MRG; ventrikülomegali derecesi (Evans İndeksi > 0.30 NPH için pozitiftir), periventriküler transependimal BOS ödemi, 3. ve 4. ventrikül boyutları, kitle veya herniasyon bulguları incelenmelidir.',
      'Pediatrik Konsültasyonu / Neonatoloji (Pediatrik Olgularda): Eşlik eden konjenital anomaliler (Miyelomeningosel, kardiyak malformasyonlar), prematürite öyküsü, termoregülasyon ve damar yolu planlaması.',
      'Kardiyoloji Konsültasyonu (VA Şant Planlanan Olgularda): Patent Foramen Ovale (PFO), intrakardiyak şant, triküspit kapak anatomisi ve aritmi öyküsü; atriyal kateter yerleşimi için floroskopi gereksinimi.',
      'Gastroenteroloji / Genel Cerrahi Konsültasyonu: Geçirilmiş peritonit, nekrotizan enterokolit (NEK), çoklu batın cerrahileri (batın yapışıklığı varsa VP şant yerine VA şant endikedir).'
    ],
    historyAndPhysical: [
      'KİBAS Belirti ve Bulguları: Bebeklerde ön fontanel bombeliği, "batan güneş" (sunset eye) manzarası, baş çevresinde hızlı artış, tiz sesle ağlama ve kusma; erişkinlerde baş ağrısı, bulantı, papilödem ve letarji.',
      'Mide Doluluğu / Aspirasyon Riski: Akut KİBAS\'lı hastalar bulantı ve kusma nedeniyle mide boşalması gecikmiş (tok) kabul edilmelidir.',
      'Şant Revizyonu Olgularında Enfeksiyon Taraması: Ateş, menenjit bulguları, şant trasesi boyunca ciltte hiperemi/endürasyon varlığı; aktif enfeksiyon varlığında şant eksize edilmeli, geçici EVD (eksternal ventriküler drenaj) konulmalıdır.',
      'Boyun ve Hava Yolu Muayenesi: Miyelomeningosel veya Chiari malformasyonu olan çocuklarda laringeal stridor, vokal kord paralizisi ve zor entübasyon riski.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve T&S doğrulaması.',
      'Tam Kan Sayımı (Hb, Hct, Lökosit, Trombosit).',
      'Serum Elektrolitleri (Sodyum, Potasyum, Klor; diüretik/Asetazolamid kullanan hastalarda hiponatremi ve metabolik asidoz kontrolü).',
      'Böbrek Fonksiyon Testleri (Kreatinin, BUN) ve Koagülasyon Paneli (PT/INR, aPTT).',
      'BOS Biyokimyası ve Kültürü (enfeksiyon şüphesi olan revizyon olgularında protein, glukoz, lökosit).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (özellikle VA şantta atriyal aritmi takibi), Non-invaziv veya İnvaziv Arter Basıncı (A-line: ciddi kardiyovasküler komorbiditeli veya instabil yenidoğanlarda).',
      'Sürekli End-Tidal CO2 (EtCO2): Laparoskopik VP şantlarda CO2 insüflasyonuna bağlı hiperkapninin ve VA şantta venöz hava embolisinin erken tespiti için şarttır.',
      'Isı Monitörizasyonu (Özofageal veya Rektal): Bebeklerde ve geniş cerrahi örtüm altındaki olgularda hipoterminin kesin önlenmesi (hedef 36.5 - 37.5°C).',
      'İntraoperatif Floroskopi (C-Kollu Skopi): VA şant uygulamasında atriyal kateterin vena cava superior - sağ atriyum bileşkesinde (T4-T5 veya karina hizasında) olduğunu doğrulamak için.',
      'Nöromusküler İleti İzlemi (TOF): Laparoskopi ve tünelleme esnasında tam kas gevşemesini garantilemek için.'
    ],
    vascularAccess: [
      'En az 1 veya 2 adet güvenli periferik intravenöz hat (cerrahi tarafın karşı kolunda veya bacakta)',
      'Pediatrik olgularda sıvı infüzyon pompası (mikro-büretli) ve ısıtıcı pedler',
      'Kan/Sıvı Isıtıcı Düzenekleri'
    ],
    patientPosition: 'Supin Pozisyon, Baş Karşı Tarafa 30 - 45° Döndürülmüş ve Omuz Altına Destek Rulo Yerleştirilmiş',
    patientPositionDetails: [
      'Başın çevrilmesi ve sağ omuz altına konulan silikon rulo boyun ve klavikula bölgesini gererek trokarın cilt altında düzgün kaymasını sağlar.',
      'AŞIRI BOYUN ROTASYONUNDAN KAÇINILMALIDIR: Aşırı çevirme ve fleksiyon internal juguler veni basıya uğratarak serebral venöz konjesyon yaratır ve endotrakeal tüpü bükebilir.',
      'Geniş Cerrahi Saha Örtümü: Baş, boyun, göğüs ve tüm abdomen aynı steril cerrahi alan içine alınır; solunum devreleri cerrahi örtülerin altından çıkmayacak şekilde kilitlenir.',
      'Bası Noktaları: Oksiput jel halka ile desteklenir; gözler koruyucu pomadla kapatılır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Propofol (2 - 2.5 mg/kg) veya bebeklerde Sevofluran inhalasyonu + Fentanil (2 mcg/kg) + Rokuronyum (0.6 mg/kg). KİBAS bulgusu olan olgularda indüksiyonda hemodinami korunarak yumuşak entübasyon yapılır.',
      'İdame: İnhalasyon anestezisi (Sevofluran / Desfluran MAC 0.8 - 1.0) veya TIVA (Propofol + Remifentanil) + Orta etkili kas gevşetici idamesi.',
      'Subkütan Tünelleme Sırasında Analjezi ve Hemodinamik Yönetim:',
      '  - Cerrah trokarı kranyal burr-hole\'dan boyun ve göğüs üzerinden batına ilerletirken çok güçlü ağrılı uyaran oluşur.',
      '  - Müdahale: Tünellemeden hemen önce cerrah cilt altı hattına %0.25 Bupivakain + 1:200.000 Epinefrin infiltre etmeli; anestezi derinliği artırılmalı veya Remifentanil/Fentanil bolusu verilmelidir.',
      'Laparoskopi ve Pnömoperitoneum Yönetimi (VP Şant İçin):',
      '  - Batın içi insüflasyon basıncı pediatrikte 6 - 8 mmHg, erişkinde 10 - 12 mmHg ile sınırlandırılmalıdır.',
      '  - CO2 eliminasyonu için dakika ventilasyonu artırılarak PaCO2 35 - 38 mmHg aralığında tutulur.',
      'Ventriküler Ponksiyon ve Hızlı Dekompresyonun Önlenmesi:',
      '  - Ventriküle girildiğinde serbest BOS akışı kontrollü olmalı; ventrikülün aniden sönmesi ve subdural hematom gelişimini önlemek için kateter ucu hızla valve bağlanmalıdır.'
    ],
    airwayManagement: [
      'Standart Oral Endotrakeal Entübasyon; başın sağa/sola çevrilmesi esnasında trakeal tüpün yerinden oynamaması veya derinleşmemesi için tüp derinliği dinlenerek teyit edilir.',
      'Baş ve gövde aynı örtü altında kalacağından tüp tespit bantları neme dayanıklı flasterlerle güçlendirilir.',
      'Kaf basıncı sürekli 20 - 25 cmH2O aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Profilaktik Antibiyotik Uygulaması: Cerrahi cilt insizyonundan 15-30 dakika önce Sefazolin (30-50 mg/kg pediatrik, 2 g erişkin) veya Vankomisin IV uygulanması.',
      '2. Kranyal Burr-Hole ve Ventriküler Kateter Yerleşimi: BOS basıncının ölçülmesi ve aşırı hızlı boşalmanın önlenmesi.',
      '3. Subkütan Tünelleme: Şiddetli sempatik uyaran, taşikardi ve hipertansiyon kontrolü.',
      '4. Distal Kateterin Batına / Atriyuma Yerleşimi:',
      '   - VP Şant: Mini-laparotomi veya laparoskopi ile peritona giriş; distal kateterden damla damla berrak BOS aktığının teyidi.',
      '   - VA Şant: Floroskopi eşliğinde internal juguler ven kanülasyonu; atriyal kateterin SVC-sağ atriyum bileşkesine ilerletilmesi, aritmi ve hava embolisi izlemi.',
      '5. Kateterlerin ve Valvin Krikoid / Mastoid Bölgede Kilitlenmesi ve Kapanış.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ UYANMA: Ekstübasyon anında öksürme ve ıkınma abdominal yarada gerginliğe ve kranyal alanda venöz kanamaya yol açabilir; uyanma analjezi ve antiemetik desteğiyle sakinleştirilir.',
      'Postoperatif Nörolojik Değerlendirme: Hasta uyanır uyanmaz bilinci, pupilleri ve motor hareketleri değerlendirilir. NPH hastalarında kognitif durum; hidrosefali krizindeki hastalarda baş ağrısının gerilemesi kontrol edilir.',
      'Subdural Hematom Uyarısı: Ameliyat sonrası bilinç bulanıklığı, anizokori veya fokal nörolojik defisit gelişirse aşırı BOS drenajına bağlı akut subdural hematom ekarte edilmek üzere acil Kranial BT çekilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Cerrahi İnsizyon ve Tünel Giriş Yerlerine Lokal İnfiltrasyon (%0.25 Bupivakain): Postoperatif ilk 8-12 saatlik konforu dramatik artırır.',
      '  - IV Parasetamol (15 mg/kg pediatrik, 1000 mg erişkin 6 saatte bir düzenli infüzyon).',
      '  - IV İbuprofen veya Deksketoprofen: Renal fonksiyonu normal olgularda non-opioid destek.',
      '  - Kurtarma Opiyatı: Düşük doz Fentanil (0.5-1 mcg/kg) veya Tramadol; sedasyon skoru yakından izlenir.'
    ],
    prospectRecommendations: [
      'Kranyal ve abdominal insizyon hatlarına cerrah tarafından lokal anestezik infiltrasyonu yapılması opiat ihtiyacını azaltır ve postoperatif derlenmeyi hızlandırır.'
    ],
    erasRecommendations: [
      'ERAS Nöroşirürji ve Şant Kılavuzları:',
      '  - Şant Enfeksiyonu Önleme Protokolü: Cerrahi örtülerin ve pansumanın 24-48 saat steril korunması; yara yerinde BOS sızıntısı veya eritemin yakın takibi.',
      '  - Pozisyonlandırma: Ani aşırı drenajı (overdrainage) ve subdural efüzyonu önlemek için ilk 12-24 saatte hastanın düz (0-15°) yatırılması; sonrasında kademeli 30-45° elevasyona geçilmesi.',
      '  - Erken Oral Beslenme ve Mobilizasyon: Laparoskopik olgularda bağırsak sesleri duyulduktan sonra postop 4. saatte oral sıvı başlanması.',
      '  - Batın İçi Komplikasyon Takibi: Peritonit, psödokist veya distal kateter migrasyonuna bağlı karın ağrısı ve distansiyon takibi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Pediatric & Adult: Ventricular Shunt Procedures (pp. 463-468). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Pediatric and Adult Neurosurgery: Consensus Guidelines. Journal of Neurosurgery: Pediatrics & Spine.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Cranial and Abdominal Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'American Association of Neurological Surgeons (AANS) & Congress of Neurological Surgeons (CNS). Pediatric Hydrocephalus Systematic Review and Evidence-Based Guidelines.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Anesthetic Management of Patients Undergoing Ventriculoperitoneal Shunt Surgery.',
      'Drake, J. M., et al. (1998). Randomized trial of cerebrospinal fluid shunt valve design in pediatric hydrocephalus. Neurosurgery, 43(2), 294-305.'
    ]
  }
};
