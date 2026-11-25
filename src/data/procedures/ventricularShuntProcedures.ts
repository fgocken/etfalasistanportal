import { ProcedureDefinition } from '../../types/procedures';

/**
 * Ventriküler Şant Girişimleri: Ventriküloperitoneal ve Ventriküloatrial Şant Cerrahisi (VP / VA Şant)
 * (Ventricular Shunt Procedures: Ventriculoperitoneal & Ventriculoatrial Shunting)
 *
 * Jaffe (6th ed., 2020), AANS/CNS Pediatric Hydrocephalus Guidelines (Flannery et al., 2014),
 * ASHP/IDSA Surgical Antimicrobial Prophylaxis Guidelines (Bratzler et al., 2013),
 * PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023),
 * 4th Consensus Guidelines for PONV (Gan et al., Anesth Analg 2020) ve FDA Pediatrik Tramadol
 * Güvenlik Uyarısı referans alınarak yapılandırılmıştır.
 */
export const ventricularShuntProcedures: ProcedureDefinition = {
  id: 'ventricular-shunt-procedures',
  name: 'Ventriküler Şant Girişimleri: Ventriküloperitoneal ve Ventriküloatrial Şant Cerrahisi (VP / VA Şant)',
  shortCode: 'VP-ŞANT-HİDROSEFALİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Pediatrik & Erişkin Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Beyin ventrikülleri içerisinde aşırı biriken Beyin Omurilik Sıvısının (BOS) yarattığı hidrosefali ve kafa içi basınç artışını (KİBAS) kalıcı olarak tedavi etmek amacıyla; lateral ventriküle (genellikle sağ Kocher noktası veya parietal Keen/Dandy noktası) yerleştirilen proksimal ventriküler kateterin, tek yönlü basınç ayarlı bir valv (pompa haznesi) aracılığıyla cilt altı tünelleme ile başka bir emilim kompartmanına bağlanması ameliyatıdır. En yaygın yöntem periton boşluğuna yönlendirilen Ventriküloperitoneal (VP) Şanttır; periton içi yapışıklık veya cerrahi kontrendikasyon varlığında (PFO/sağ-sol intrakardiyak şant yokluğu doğrulanarak!) kateter V. Jugularis Interna yoluyla sağ atriyum girişine yönlendirilerek Ventriküloatrial (VA) Şant, veya plevral boşluğa yönlendirilerek Ventriküloplevral (VPl) Şant uygulanır.',
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
      'Tünelleme öncesinde subkütan hatta adrenalinli lokal anestezik infiltrasyonu (hem analjezi hem vazokonstriksiyon — pediatrik maksimum toksik doz aşılmadan!)',
      'VA şantta juguler ven kanülasyonu sırasında Trendelenburg pozisyonu verilerek hava embolisinin önlenmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA) — Sevofluran (< 0.8 - 1.0 MAC; yüksek ICP\'de < 0.5 - 0.8 MAC) veya TIVA (Propofol + Remifentanil): Kas gevşetici ile kontrollü mekanik ventilasyon. N₂O ve (pediatrik/yüksek ICP\'de) Desfluran KESİNLİKLE KULLANILMAZ!',
      'Akut KİBAS / Şant Malfonksiyonu / Kusan Hastada Hızlı Seri İndüksiyon (RSI — Rokuronyum 1.0 - 1.2 mg/kg) ZORUNLUDUR; laparoskopik VP şantlarda kaflı ETT şarttır'
    ],
    alternative: [
      'Sedasyon Altında Lokal Anestezi (Çok Nadir): Yalnızca genel anesteziyi kaldıramayacak kadar ağır komorbiditeli ileri evre erişkin yoğun bakım hastalarında acil ventrikülostomi/revizyonda'
    ],
    clinicalRationale: 'Baş, boyun, göğüs duvarı ve batını aynı steril örtü altında birleştiren şiddetli ağrılı subkütan tünelleme ile pnömoperitoneum basıncına karşı tam hareketsizlik ve kontrollü PaCO2 gerektiğinden kaflı ETT ile genel anestezi altın standarttır. Akut KİBAS ve kusması olan dolu mideli şant malfonksiyonu hastalarında Sevofluran inhalasyon indüksiyonu kesinlikle yapılmaz, Rokuronyum 1.0-1.2 mg/kg ile IV RSI uygulanır; N₂O (pnömosefali/pnömoperitoneum/VAE) ve Desfluran (pediatrik hava yolu irritasyonu/serebral vazodilatasyon) kullanılmaz.',
    notes: 'ŞANT CERRAHİSİNDE TEMEL ANESTEZİ İLKELERİ: (1) Akut KİBAS/kusan hastada Rokuronyum 1.0-1.2 mg/kg ile RSI — Sevofluran inhalasyon indüksiyonu yasağı; (2) Subkütan tünelleme ağrısı, N₂O ve Desfluran yasağı; (3) Overdrainage önlemi ve VA şantta PFO kesin kontrendikasyonu + intravasküler EKG (sivri P dalgası) ucu teyidi; (4) Miyelomeningoselde Lateks-Free OR ve doğru antibiyotik profilaksisi (Sefazolin 30 mg/kg maks. 2 g; Vankomisin 60-120 dk önce); (5) Pediatrik Tramadol FDA/EMA Black Box ve Deksketoprofen yasağı + izotonik dengeli sıvılar.',
    rulesTitle: 'ŞANT CERRAHİSİNDE ANESTEZİNİN 5 KRİTİK GÜVENLİK KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'AKUT KİBAS / ŞANT MALFONKSİYONUNDA RSI (ROKURONYUM 1.0-1.2 mg/kg) VE İNHALASYON YASAĞI',
        content: 'Akut KİBAS ve kusması olan çocuk/erişkin TAM DOLU MİDE kabul edilir! Kusan/yüksek ICP\'li çocukta Sevofluran inhalasyon indüksiyonu (aspirasyon + hiperkapni + serebral vazodilatasyon) KESİNLİKLE YAPILMAZ — IV erişim sağlanıp Propofol/Etomidat + Rokuronyum 1.0-1.2 mg/kg (0.6 mg/kg yetersizdir!) ile RSI uygulanır. İnhalasyon indüksiyonu yalnızca aç, elektif, KİBAS\'ı olmayan ve IV yolu bulunmayan çocuklarda tercih edilir.'
      },
      {
        number: 2,
        title: 'N₂O VE DESFLURAN YASAĞI + SUBKÜTAN TÜNELLEME & PNÖMOPERİTONEUM YÖNETİMİ',
        content: 'N₂O (pnömosefali, laparoskopik pnömoperitoneum genişlemesi ve VA şant VAE riski) KESİNLİKLE KONTRENDİKEDİR. Pediatrik ve yüksek ICP\'li olgularda Desfluran (laringospazm/hava yolu irritasyonu ve serebral vazodilatasyon) KULLANILMAZ. Subkütan tünelleme masif ağrılıdır (lokal infiltrasyon + opioid/anestezi derinleştirmesi şart); laparoskopik insüflasyon basıncı pediatrikte 6-8 mmHg, erişkinde 10-12 mmHg ile sınırlanır.'
      },
      {
        number: 3,
        title: 'VA ŞANTTA PFO KONTRENDİKASYONU, İNTRAVASKÜLER EKG (SİVRİ P DALGASI) VE OVERDRAINAGE',
        content: 'VA şantta Patent Foramen Ovale (PFO) veya sağdan sola intrakardiyak şant paradoksal hava/septik emboli riski nedeniyle KESİN KONTRENDİKASYONDUR! Atriyal kateter ucu floroskopiye ek olarak İNTRAVASKÜLER EKG ile doğrulanır (SVC-sağ atriyum bileşkesinde maksimal sivri P dalgası). Ventriküler girişte ani aşırı BOS boşaltımı (overdrainage) akut subdural hematom yaratır.'
      },
      {
        number: 4,
        title: 'MİYELOMENİNGOSELDE ZORUNLU LATEKS-FREE OR VE ANTİBİYOTİK PROFİLAKSİSİ',
        content: 'Miyelomeningoselli/spina bifidalı çocuklarda %100 LATEKS-FREE ameliyathane ortamı zorunludur. Şant enfeksiyonu yıkıcıdır: Pediatrik Sefazolin 30 mg/kg (maks. 2 g; erişkin 2 g) kesiden 30-60 dk önce; Vankomisin kullanılacaksa kesiden 60-120 dk önce infüzyona başlanmalıdır!'
      },
      {
        number: 5,
        title: 'PEDİATRİK TRAMADOL (FDA BLACK BOX) & DEKSKETOPROFEN YASAĞI + İZOTONİK SIVI SEÇİMİ',
        content: 'TRAMADOL çocuklarda ölümcül solunum depresyonu riski nedeniyle FDA/EMA KARA KUTU KONTRENDİKASYONUDUR! DEKSKETOPROFEN pediatrikte ruhsatsızdır ve taze ventriküler ponksiyonda IVH/SDH kanama riski nedeniyle kullanılmaz. Hipotonik sıvılar yasaktır; pediatrikte izotonik dengeli kristalloid (yalnızca yenidoğan/süt çocuklarında %1-2 dekstrozlu izotonik dengeli sıvı) kullanılır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji Konsültasyonu: Kranial BT veya MRG; ventrikülomegali derecesi (Evans İndeksi > 0.30 NPH için pozitiftir), periventriküler transependimal BOS ödemi, 3. ve 4. ventrikül boyutları, kitle veya herniasyon bulguları incelenmelidir.',
      'Pediatri / Neonatoloji Konsültasyonu ve Lateks-Free Planlama: Eşlik eden konjenital anomaliler (Miyelomeningosel/Chiari II — ZORUNLU LATEKS-FREE AMELİYATHANE!), prematürite öyküsü, apne riski, termoregülasyon ve damar yolu planlaması.',
      'Kardiyoloji Konsültasyonu (VA Şant Planlanan Olgularda): Ekokardiyografi ile Patent Foramen Ovale (PFO) ve sağdan sola intrakardiyak şant mutlaka dışlanmalıdır — PFO/sağ-sol şant varlığı paradoksal hava/tromboemboli riski nedeniyle VA ŞANT İÇİN KESİN KONTRENDİKASYONDUR!',
      'Gastroenteroloji / Genel Cerrahi Konsültasyonu: Geçirilmiş peritonit, nekrotizan enterokolit (NEK), çoklu batın cerrahileri (batın yapışıklığı varsa VP şant yerine VA şant değerlendirilir).'
    ],
    historyAndPhysical: [
      'KİBAS Belirti ve Bulguları: Bebeklerde ön fontanel bombeliği, "batan güneş" (sunset eye) manzarası, baş çevresinde hızlı artış, tiz sesle ağlama ve fışkırır tarzda kusma; erişkinlerde baş ağrısı, bulantı, papilödem ve letarji.',
      'Mide Doluluğu / Aspirasyon Riski: Akut KİBAS ve şant malfonksiyonu olan tüm hastalar bulantı/kusma ve gecikmiş mide boşalması nedeniyle TAM DOLU MİDE kabul edilir (RSI zorunlu!).',
      'Şant Revizyonu Olgularında Enfeksiyon Taraması: Ateş, menenjit bulguları, şant trasesi boyunca ciltte hiperemi/endürasyon varlığı; aktif enfeksiyon varlığında şant eksize edilmeli, geçici EVD konulmalıdır.',
      'Boyun ve Hava Yolu Muayenesi: Miyelomeningosel veya Chiari malformasyonu olan çocuklarda laringeal stridor, vokal kord paralizisi, makrosefali (baş altına omuz desteği gerekebilir!) ve zor entübasyon riski.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve T&S doğrulaması (prematüre/yenidoğanda 1 Ünite rekonstitüe taze ES).',
      'Tam Kan Sayımı (Hb, Hct, Lökosit, Trombosit).',
      'Serum Elektrolitleri ve Kan Glukozu (Sodyum, Potasyum, Klor; Asetazolamid/diüretik kullanan veya kusan olgularda hiponatremi, hipokalemi ve metabolik asidoz/alkaloz kontrolü).',
      'Böbrek Fonksiyon Testleri (Kreatinin, BUN) ve Koagülasyon Paneli (PT/INR, aPTT).',
      'BOS Biyokimyası ve Kültürü (enfeksiyon şüphesi olan revizyon olgularında protein, glukoz, lökosit).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (özellikle VA şantta atriyal/ventriküler aritmi takibi), Non-invaziv Kan Basıncı; yüksek KİBAS\'lı, hemodinamik instabil veya ciddi komorbiditeli olgularda Dış Kulak Yolu (Tragus / Willis Poligonu) Seviyesinde Sıfırlanmış İnvaziv Arter Basıncı (A-Line).',
      'Sürekli End-Tidal CO2 (EtCO2): Laparoskopik VP şantlarda CO2 insüflasyonuna bağlı hiperkapninin ve VA şantta venöz hava embolisinin (VAE) erken tespiti için şarttır.',
      'Isı Monitörizasyonu (Özofageal veya Rektal): Bebeklerde ve geniş cerrahi örtüm altındaki olgularda hipoterminin kesin önlenmesi (hedef 36.0 - 37.0°C; yenidoğan/süt çocuğunda 36.5 - 37.5°C).',
      'VA Şant Ucu Doğrulaması — Floroskopi + İntravasküler EKG: C-kollu skopiye (SVC-sağ atriyum bileşkesi, karina/T4-T5 hizası) ek olarak salin dolu atriyal kateter üzerinden V-derivasyonu ile İNTRAVASKÜLER EKG izlenir; kateter ucu SVC-RA bileşkesine ulaştığında maksimal SİVRİ/YÜKSEK P DALGASI (peaked P wave) görülür (bifazik P dalgası sağ atriyum içi derin yerleşimi gösterir — geri çekilir!).',
      'Kantitatif Nöromusküler İleti İzlemi (TOF — ekstübasyon öncesi TOFR ≥ 0.90) ve Seri Kan Glukozu Takibi (erişkin hedefi 140 - 180 mg/dL; pediatrikte hipoglisemi < 70 mg/dL ve hiperglisemi > 180 mg/dL\'den kaçınma).'
    ],
    vascularAccess: [
      'En az 1 veya 2 adet güvenli periferik intravenöz hat (cerrahi tarafın karşı kolunda veya bacakta)',
      'Pediatrik olgularda hassas infüzyon pompası, hava filtresi ve ısıtıcı pedler',
      'Kan/Sıvı Isıtıcı Düzenekleri'
    ],
    patientPosition: 'Supin Pozisyon, Baş Karşı Tarafa 30 - 45° Döndürülmüş ve Omuz Altına Destek Rulo Yerleştirilmiş',
    patientPositionDetails: [
      'Başın çevrilmesi ve sağ omuz altına konulan silikon rulo boyun ve klavikula bölgesini gererek trokarın cilt altında düzgün kaymasını sağlar; makrosefalik bebeklerde hava yolunu hizalamak için gövde/omuz altına ek destek konur.',
      'AŞIRI BOYUN ROTASYONUNDAN KAÇINILMALIDIR: Aşırı çevirme ve fleksiyon internal juguler veni basıya uğratarak serebral venöz konjesyon yaratır ve endotrakeal tüpü bükebilir.',
      'Geniş Cerrahi Saha Örtümü: Baş, boyun, göğüs ve tüm abdomen aynı steril cerrahi alan içine alınır; solunum devreleri cerrahi örtülerin altından çıkmayacak şekilde kilitlenir.',
      'Bası Noktaları: Oksiput jel halka ile desteklenir; gözler koruyucu pomadla kapatılır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon (KİBAS ve Mide Doluluğuna Göre Kesin Ayrım):',
      '  - AKUT KİBAS / ŞANT MALFONKSİYONU / KUSAN (DOLU MİDE) HASTA: Hızlı Seri İndüksiyon (RSI) ZORUNLUDUR! Preoksijenasyon sonrası IV Propofol (2 - 2.5 mg/kg; instabil olguda Etomidat) + Fentanil (1 - 2 mcg/kg) + ROKURONYUM 1.0 - 1.2 mg/kg (0.6 mg/kg RSI için YETERSİZDİR!). Kusan, akut KİBAS\'lı veya tok çocukta Sevofluran inhalasyon indüksiyonu KESİNLİKLE YAPILMAZ (aspirasyon + hiperkapni + KİBAS krizi!).',
      '  - AÇ, ELEKTİF, KİBAS BULGUSU OLMAYAN VE IV YOLU BULUNMAYAN KÜÇÜK ÇOCUKLAR: Yalnızca bu seçilmiş grupta nazik Sevofluran inhalasyon indüksiyonu ile IV erişim sağlanıp Rokuronyum sonrası entübasyon yapılabilir.',
      'İdame: Sevofluran (< 0.8 - 1.0 MAC; yüksek ICP\'de < 0.5 - 0.8 MAC) veya TIVA (Propofol + Remifentanil) + orta etkili kas gevşetici idamesi.',
      'GAZ KISITLAMALARI (KESİN YASAKLAR):',
      '  - Azot Protoksit (N₂O) KESİNLİKLE KONTRENDİKEDİR: Ventriküler pnömosefali, laparoskopik pnömoperitoneum genişlemesi, VA şantta venöz hava embolisi (VAE) büyümesi ve KİBAS artışı!',
      '  - Desfluran pediatrik olgularda (şiddetli hava yolu irritasyonu, öksürük ve laringospazm) ve yüksek ICP hastalarında (doza bağlı serebral vazodilatasyon) KULLANILMAZ!',
      'LATEKS-FREE OR PROTOKOLÜ (Miyelomeningosel / Spina Bifida): Tüm ameliyathane ve anestezi ekipmanı %100 lateks-free olmalıdır.',
      'Sıvı ve Glukoz Yönetimi:',
      '  - Erişkinlerde izotonik dengeli kristalloid (Plasmalyte/Isolyte-S) veya %0.9 NaCl kullanılır; hipotonik ve dekstrozlu sıvılar yasaktır.',
      '  - Pediatrik olgularda İZOTONİK DENGELİ KRİSTALLOİD temel idame sıvısıdır (hipotonik sıvılar iyatrojenik hiponatremi ve akut beyin ödemi riski nedeniyle KESİNLİKLE KONTRENDİKEDİR!). YALNIZCA yenidoğan ve süt çocuklarında hipoglisemiyi önlemek için kan şekeri izlemiyle %1 - 2 dekstroz içeren izotonik dengeli sıvı uygulanır.',
      '  - Glisemik Hedef: 140 - 180 mg/dL (pediatrikte hipoglisemi < 70 mg/dL ve hiperglisemi > 180 mg/dL\'den kaçınılır).',
      'Subkütan Tünelleme Analjezisi: Trokar geçişinden hemen önce cerrah cilt altı hattına %0.25 Bupivakain + 1:200.000 Epinefrin (pediatrik maksimum doz ≤ 2 - 2.5 mg/kg aşılmadan!) infiltre etmeli; anestezi derinliği artırılmalı veya Fentanil/Remifentanil bolusu verilmelidir.',
      'Laparoskopi ve Pnömoperitoneum Yönetimi (VP Şant): İnsüflasyon basıncı pediatrikte 6 - 8 mmHg, erişkinde 10 - 12 mmHg ile sınırlandırılır; dakika ventilasyonu artırılarak PaCO2 35 - 38 mmHg tutulur.',
      'Ventriküler Ponksiyon ve Overdrainage Önlemi: Ventriküle girildiğinde serbest BOS akışı kontrollü olmalı; ani ventrikül kollapsı ve akut subdural hematom gelişimini önlemek için kateter hızla valve bağlanmalıdır.'
    ],
    airwayManagement: [
      'Standart Oral Kaflı Endotrakeal Entübasyon (pediatrikte yaşa uygun mikro-kaflı ETT); başın sağa/sola çevrilmesi esnasında tüpün yerinden oynamaması veya endobronşiyal ilerlememesi için iki akciğer sesleri dinlenerek tüp derinliği teyit edilir.',
      'Baş ve gövde aynı steril örtü altında kalacağından tüp tespit bantları neme dayanıklı flasterlerle güçlendirilir.',
      'Kaf basıncı erişkinde 20 - 25 cmH2O (pediatrikte ≤ 20 cmH2O) aralığında tutulmalıdır.'
    ],
    criticalSurgicalStages: [
      '1. Profilaktik Antibiyotik Uygulaması: Cerrahi cilt insizyonundan 30 - 60 dakika önce Sefazolin (30 mg/kg pediatrik [maks. 2 g], 2 g erişkin IV). Vankomisin (MRSA riski / beta-laktam alerjisi / şant revizyonu) kullanılacaksa infüzyon süresi ve doku dağılımı nedeniyle insizyondan 60 - 120 dakika önce başlanmalıdır!',
      '2. Kranyal Burr-Hole ve Ventriküler Kateter Yerleşimi: BOS basıncının ölçülmesi ve aşırı hızlı boşalmanın (overdrainage) önlenmesi.',
      '3. Subkütan Tünelleme: Şiddetli sempatik uyaran, taşikardi ve hipertansiyon kontrolü.',
      '4. Distal Kateterin Batına / Atriyuma Yerleşimi:',
      '   - VP Şant: Mini-laparotomi veya laparoskopi ile peritona giriş; distal kateterden damla damla berrak BOS aktığının teyidi.',
      '   - VA Şant (PFO/Sağ-Sol Şant Yokluğu Doğrulanmış!): Floroskopi + İntravasküler EKG (SVC-sağ atriyum bileşkesinde maksimal sivri P dalgası) eşliğinde internal juguler ven kanülasyonu; aritmi ve VAE izlemi.',
      '5. Kateterlerin ve Valvin Mastoid / Retroauriküler / Parietal Bölgede Sabitlenmesi ve Tabakalı Kapanış.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ UYANMA: Ekstübasyon öncesi kantitatif TOFR ≥ 0.90 doğrulanır; öksürme ve ıkınma abdominal yarada gerginliğe ve kranyal alanda venöz kanamaya yol açabileceğinden uyanma analjezi ve antiemetik desteğiyle sakinleştirilir.',
      'Postoperatif Nörolojik Değerlendirme: Hasta uyanır uyanmaz bilinci, pupilleri ve motor hareketleri değerlendirilir. Prematüre/yenidoğanlarda postoperatif apne takibi için en az 24 saat yoğun bakım monitörizasyonu planlanır.',
      'Subdural Hematom / IVH Uyarısı: Ameliyat sonrası bilinç bulanıklığı, anizokori, dirençli kusma veya fokal nörolojik defisit gelişirse aşırı BOS drenajına bağlı akut subdural hematom veya intraventriküler kanama ekarte edilmek üzere acil Kranial BT çekilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Analjezi Protokolü:',
      '  - Cerrahi İnsizyon ve Tünel Giriş Yerlerine Lokal İnfiltrasyon (%0.25 Bupivakain veya %0.2 Ropivakain; pediatrik toksik doz ≤ 2 - 2.5 mg/kg aşılmadan): İlk 8-12 saatlik konforu dramatik artırır.',
      '  - Düzenli IV Parasetamol (10 - 15 mg/kg pediatrik [yenidoğanda 7.5 mg/kg], 1000 mg erişkin 6 saatte bir infüzyon).',
      '  - Kurtarma Opiyatı: Dikkatle titre edilen düşük doz IV Fentanil (0.5 - 1 mcg/kg pediatrik; 25 - 50 mcg erişkin); sedasyon ve solunum yakından izlenir.',
      '  - KESİN KONTRENDİKASYONLAR: TRAMADOL çocuklarda ölümcül solunum depresyonu riski nedeniyle FDA/EMA KARA KUTU (BLACK BOX) KONTRENDİKASYONUDUR ve nöbet/PONV riski nedeniyle erişkin şant hastalarında da KULLANILMAZ! IV DEKSKETOPROFEN pediatrik yaş grubunda ruhsatsızdır (onaysızdır) ve taze ventriküler ponksiyon sonrası intraventriküler hemoraji (IVH) / akut subdural hematom (SDH) riski nedeniyle rutin IV NSAİİ/Deksketoprofen KULLANILMAZ!'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi (2023) ilkeleri doğrultusunda kranyal ve abdominal insizyon hatlarına lokal anestezik infiltrasyonu ile düzenli IV Parasetamol temel non-opioid stratejidir; taze ventriküler girişim ve pediatrik güvenlik kuralları gereği Tramadol ve IV Deksketoprofen kullanılmaz.'
    ],
    erasRecommendations: [
      '4. Konsensus PONV (2020) ve Pediatrik/Erişkin Şant Postoperatif Bakım Protokolleri:',
      '  - Şant Enfeksiyonu Önleme Protokolü: Cerrahi örtülerin ve pansumanın 24-48 saat steril korunması; yara yerinde BOS sızıntısı veya eritemin yakın takibi; gereksiz uzamış antibiyotikten kaçınılması.',
      '  - Agresif PONV Profilaksisi: Kusma KİBAS ve abdominal yara gerginliğini artırdığından Ondansetron (0.1 - 0.15 mg/kg pediatrik / 4 mg erişkin) + Deksametazon (0.15 mg/kg pediatrik / 4 - 8 mg erişkin) uygulanır.',
      '  - Pozisyonlandırma: Ani aşırı drenajı (overdrainage) ve subdural efüzyonu önlemek için ilk 12-24 saatte hastanın düz (0 - 15°) yatırılması; sonrasında kademeli 30 - 45° elevasyona geçilmesi.',
      '  - Sıvı ve Glisemik Takip: İzotonik sıvı idamesi (hipotonik sıvı yasağı; yenidoğan/süt çocuğunda %1-2 dekstrozlu izotonik dengeli sıvı) ve kan glukozu 140 - 180 mg/dL (pediatrikte hipoglisemi < 70 mg/dL önlemi).',
      '  - Erken Oral Beslenme ve Batın Takibi: Bağırsak sesleri duyulduktan sonra erken oral sıvı başlanması; peritonit, psödokist veya distal kateter migrasyonuna bağlı karın ağrısı/distansiyon takibi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery — Ventricular Shunt Procedures. Philadelphia: Wolters Kluwer.',
    erasReference: 'Gan, T. J., Belani, K. G., Bergese, S., et al. (2020). Fourth Consensus Guidelines for the Management of Postoperative Nausea and Vomiting. Anesthesia & Analgesia, 131(2), 411-448.',
    prospectReference: 'Mestdagh, F., Lavand\'homme, P., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Flannery, A. M., Mitchell, L., & Pediatric Hydrocephalus Systematic Review and Evidence-Based Guidelines Task Force. (2014). Pediatric hydrocephalus: systematic literature review and evidence-based guidelines. Journal of Neurosurgery: Pediatrics, 14(Suppl 1), 1-129.',
      'Bratzler, D. W., Dellinger, E. P., Olsen, K. M., et al. (2013). Clinical practice guidelines for antimicrobial prophylaxis in surgery (ASHP/IDSA/SIS/SHEA). American Journal of Health-System Pharmacy, 70(3), 195-283.',
      'Drake, J. M., Kestle, J. R., Milner, R., et al. (1998). Randomized trial of cerebrospinal fluid shunt valve design in pediatric hydrocephalus. Neurosurgery, 43(2), 294-305.',
      'U.S. Food and Drug Administration (FDA). (2017). FDA Drug Safety Communication: Restricting use of prescription codeine pain and cough medicines and tramadol pain medicines in children.'
    ]
  }
};
