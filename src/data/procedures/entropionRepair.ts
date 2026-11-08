import { ProcedureDefinition } from '../../types/procedures';

/**
 * Entropiyon Onarımı: Alt Kapak Retraktör Plikasyonu, Transvers Tarsotomi (Wies/Quickert) ve Lateral Tarsal Strip Cerrahisi
 * (Entropion Repair / Lower Eyelid Retractor Plication, Wies Transverse Blepharotomy, Quickert Sutures and Lateral Tarsal Strip)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Oculoplastics: Ectropion and Entropion Repair, pp. 868-874),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Oculofacial Plastic Surgery,
 * European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS),
 * British Ophthalmic Anaesthesia Society (BOAS) ve Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const entropionRepair: ProcedureDefinition = {
  id: 'entropion-repair',
  name: 'Entropiyon Onarımı: Alt Kapak Retraktör Plikasyonu ve Tarsal Strip Cerrahisi',
  shortCode: 'GOZ-ENTROPIYON',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz kapağının (özellikle alt kapağın) serbest kenarının ve kirpiklerinin içe, göz küresine doğru dönmesi (inversiyonu) sonucu kirpiklerin (trikiyazis / psödotrikiyazis) ve keratinize kapak derisinin sürekli korneaya ve bulber konjonktivaya sürtünmesiyle seyreden tablonun cerrahi olarak düzeltilmesi ameliyatıdır. Kornea epitelyal erozyonunu, persistan kornea ülserlerini, vaskülarizasyonu ve kornea perforasyonu/kalıcı görme kaybını engeller. İnvolüsyonel (senil) entropiyonda temel anatomik defektler şunlardır: (a) Alt kapak retraktörlerinin (kapsülopalpebral fasya ve inferior tarsal kas) tarsusun alt kenarından ayrılması (dehissens/dezinsersiyon), (b) Horizontal kapak laksitesi (kantal tendon gevşekliği), (c) Preseptal orbikülaris kas liflerinin pretarsal orbikülaris üzerine kayarak kapağı içe döndürmesi (overriding), (d) Enoftalmus (orbital yağ atrofisi). Başlıca mikrocerrahi teknikler: (1) Alt Kapak Retraktör Plikasyonu / Reinsersiyonu (Jones / Wobig Prosedürü): Subsiliyer insizyonla retraktör fasya bulunur, mobilize edilir ve tarsusun alt sınırına 5-0 veya 6-0 emilebilir dikişlerle yeniden tespit edilir; (2) Kombine Lateral Tarsal Strip (LTS): Retraktör onarımı ile eşzamanlı olarak horizontal gevşekliğin düzeltilmesi için lateral kantus periostuna tarsal şerit tespiti yapılır (nüksü önlemede dünya genelinde altın standarttır); (3) Wies Transvers Blefarotomi / Tarsotomi: Kapak kenarının 4 mm altından tam kat transvers insizyon ve eversiyon sütürleri ile kapak kenarının dışa rotasyonu; (4) Quickert Eversiyon Sütürleri: Geçici/hızlı klinik çözüm amacıyla forniksten deri altına geçen tam kat dikişler; (5) Skatrisyel Entropiyon Onarımı: Arka lamel kısalığında sert damak, bukkal mukoza veya donör sklera grefti ile arka lamelin uzatılması.',
  indications: [
    'İnvolüsyonel (Senil) Entropiyon: İleri yaşta alt kapak retraktör dezinsersiyonu, preseptal orbikülaris kas over-riding\'i ve horizontal kapak gevşekliği (en sık endikasyon)',
    'Persistan Maruziyet Keratit, Korneal Epitelyal Defekt ve Kornea Ülseri: Kirpiklerin korneayı çizmesiyle enfeksiyöz keratit ve perforasyon riski',
    'Skatrisyel Entropiyon: Oküler sikatrisyel pemfigoid (OCP), Stevens-Johnson sendromu (SJS), kimyasal/termal yanıklar, trahom, Herpes zoster veya travma sekeli',
    'Spastik Entropiyon: Göz içi cerrahisi veya oküler inflamasyon sonrası gelişen inatçı orbikülaris kas spazmı',
    'Konjenital Entropiyon ve Epiblefaron: Pediatrik olgularda tarsal gelişim geriliği veya aşırı deri kıvrımı'
  ],
  averageDuration: '30 - 60 dakika (Tek taraflı retraktör plikasyonu + LTS: 35-45 dk; Bilateral olgular veya greftli skatrisyel onarımlar: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 20 mL (Göz kapağı, pretarsal doku ve kantal alan son derece zengin damar ağına sahiptir; ancak lokal vazokonstriktör [adrenalin] ve bipolar mikro-koterizasyon ile kan kaybı ihmal edilebilir düzeydedir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Postoperatif Derin Orbital/Retrobulber Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Orbital Kompartman / Retrobulber Hematom: Alt kapak retraktör disseksiyonu orbital yağ yastıkçıklarının hemen önünde yapılır; orbital yağ damarlarının veya lakrimal/lateral kantal arterlerin kanayarak orbita arkasına sızması (akut orbital kompartman sendromu ve körlük riski)',
      'Marginal ve Periferik Palpebral Arter Arkadları: Tarsusun alt ve üst sınırındaki mikrovasküler kanamalar',
      'İnferior Oblik Kas Çevresi Damarları: Medial ve santral retraktör disseksiyonunda kas kılıfı venleri'
    ],
    hemostasisStrategies: [
      'Lokal anestezik solüsyonuna 1:100.000 veya 1:200.000 Epinefrin (Adrenalin) eklenmesi ve insizyondan 7-10 dakika önce dokuya infüze edilmesi',
      'Bipolar wet-field mikro-koter ile doku nekrozu yaratmadan selektif hassas hemostaz',
      'Orbital septumu aşan disseksiyonlarda orbital yağ fıtıklaşması damarlarının nazikçe koterize edilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Lokal İnfiltrasyon Anestezisi (Lidokain %2 + Bupivakain %0.5 + 1:100.000 Epinefrin) + Rejyonel Sinir Bloğu (İnfraorbital Sinir Bloğu) + Monitörize Anestezi Bakımı (MAC: Bilinçli Minimal Sedasyon) — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Genel Endotrakeal Anestezi (GETA) veya Laringeal Maske (LMA): İleri derecede demansı, kontrolsüz esansiyel/Parkinson baş tremoru, mental retardasyonu, klostrofobisi veya panik bozukluğu olan yaşlı hastalarda; pediatrik konjenital/epiblefaron olgularında veya mukoza grefti gerektiren büyük skatrisyel rekonstrüksiyonlarda'
    ],
    rulesTitle: 'ENTROPİYON ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'ENTROPİYON ONARIMINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) MEVCUT KORNEA DEFEKTİ/ÜLSERİ KORUMASI, KORNEA SHIELD (KORUYUCU SKLERAL KALKAN) VE SIFIR İYATROJENİK PERFORASYON — Entropiyon hastalarında kirpiklerin ve kapak derisinin sürekli korneaya sürtünmesi nedeniyle kornea epiteli zaten erozyone, incelmiş ve ülserli olabilir. İnsizyon, retraktör diseksiyonu ve dikiş atımı korneaya birkaç milimetre mesafede yapılır. Önceden antibiyotikli yoğun oftalmik pomad sürülerek mutlaka steril Corneal Shield (sklera ve korneayı örten koruyucu plastik kalkan) takılmalı; aletlerin veya koterin incelmiş korneayı perfore etmesi engellenmelidir. (2) ALT KAPAK RETRAKTÖR DİSSEKSİYONUNDA İNFERİOR OBLİK KAS KORUMASI VE POSTOPERATİF DİPLOOPİ (ÇİFT GÖRME) ÖNLEMİ — Kapsülopalpebral fasya ve alt kapak retraktörleri serbestleştirilirken hemen arkada ve medyalde yer alan inferior oblik kas (ve alt rektus kası) diseksiyon sahasına çok yakındır. Koter ısısı veya yanlış derin dikiş ile inferior oblik kasının zedelenmesi postoperatif kalıcı dikey şaşılık ve diplopiye yol açar! Anestezi ekibi ve cerrah kas anatomisine dikkat etmeli, aşırı derin koterizasyondan kaçınılmalıdır. (3) LOKAL ANESTEZİK VE EPİNEFRİN (ADRENALİN) TOKSİSİTESİ, İNTRAVASKÜLER ENJEKSİYON VE KARDİYOVASKÜLER DALGALANMA ALARMI — Kapak derisi ve kantal bölge son derece zengin mikrovasküler ağa sahiptir. Kanama kontrolü için Lidokain/Bupivakain karışımına 1:100.000 veya 1:200.000 Epinefrin eklenir. Enjeksiyon esnasında negatif aspirasyon yapılmazsa veya yaşlı kardiyak hastada aşırı doz uygulanırsa akut taşikardi, ventriküler aritmiler, şiddetli hipertansif kriz ve miyokardiyal iskemi gelişebilir! Anestezi ekibi enjeksiyon anında ritmi ve tansiyonu kesintisiz izlemeli, cerrah ile verilen lokal anestezik hacmini mililitre bazında teyit etmeli ve kardiyak dalgalanmalara karşı beta-bloker/vazodilatatör hazır bulundurmalıdır. (4) MONİTÖRİZE ANESTEZİ BAKIMINDA (MAC) "AŞIRI SEDASYON VE HİPOVENTİLASYON TUZAĞI" — Entropiyon hastaları çoğunlukla ileri yaşta, kardiyak ve akciğer patolojisi olan bireylerdir. Hastayı sakinleştirmek amacıyla kontrolsüz Propofol bolusları veya yüksek doz benzodiazepin verilmesi solunum depresyonuna, hiperkapniye ve örtü altında hava açlığıyla ani sıçrayarak uyanmaya yol açar. Bu istemsiz baş hareketi cerrahın elindeki bistüri veya koterin glob perforasyonu yapmasına yol açabilecek en büyük tehlikedir! Yalnızca titre edilmiş minimal Midazolam (0.5-1 mg) ve Fentanil (25 mcg) uygulanmalı, nazal O2 ile örtü altı aktif aspirasyon sürdürülmeli ve hasta ile sakin sözel iletişim korunmalıdır. (5) POSTOPERATİF DERİN ORBİTAL / RETROBULBER HEMATOM, GÖZ İÇİ BASINCI (GİB) VE KALICI KÖRLÜK RİSKİ — Alt kapak retraktör disseksiyonu orbital yağ yastıkçıklarının hemen önünde gerçekleşir. Orbital yağ damarlarının veya kantal damarların yetersiz hemostazı, kanın orbital septumu aşarak orbita arkasına sızmasına ve retrobulber hematoma yol açar! İntraorbital basıncın ve GİB\'in hızla fırlaması santral retinal arteri tıkayarak saatler içinde KALICI KÖRLÜK yaratır! Operasyon bitiminde koterizasyon eksiksiz olmalı; derlenme odasında hastada ani gelişen şiddetli göz ağrısı, proptozis, kapakta gergin şişlik veya görme kaybı görüldüğünde anestezi ve cerrahi ekibi derhal acil lateral kantotomi/kantolizis ile orbitayı dekomprese etmeye hazır olmalıdır.',
    indispensableRules: [
      {
        number: 1,
        title: 'MEVCUT KORNEA DEFEKTİ/ÜLSERİ KORUMASI, KORNEA SHIELD (KORUYUCU SKLERAL KALKAN) VE SIFIR İYATROJENİK PERFORASYON',
        content: 'Entropiyon hastalarında kirpiklerin ve kapak derisinin sürekli korneaya sürtünmesi nedeniyle kornea epiteli zaten erozyone, incelmiş ve ülserli olabilir. İnsizyon, retraktör diseksiyonu ve dikiş atımı korneaya birkaç milimetre mesafede yapılır. Önceden antibiyotikli yoğun oftalmik pomad sürülerek mutlaka steril Corneal Shield (sklera ve korneayı örten koruyucu plastik kalkan) takılmalı; aletlerin veya koterin incelmiş korneayı perfore etmesi engellenmelidir.'
      },
      {
        number: 2,
        title: 'ALT KAPAK RETRAKTÖR DİSSEKSİYONUNDA İNFERİOR OBLİK KAS KORUMASI VE POSTOPERATİF DİPLOOPİ (ÇİFT GÖRME) ÖNLEMİ',
        content: 'Kapsülopalpebral fasya ve alt kapak retraktörleri serbestleştirilirken hemen arkada ve medyalde yer alan inferior oblik kas (ve alt rektus kası) diseksiyon sahasına çok yakındır. Koter ısısı veya yanlış derin dikiş ile inferior oblik kasının zedelenmesi postoperatif kalıcı dikey şaşılık ve diplopiye yol açar! Anestezi ekibi ve cerrah kas anatomisine dikkat etmeli, aşırı derin koterizasyondan kaçınılmalıdır.'
      },
      {
        number: 3,
        title: 'LOKAL ANESTEZİK VE EPİNEFRİN (ADRENALİN) TOKSİSİTESİ, İNTRAVASKÜLER ENJEKSİYON VE KARDİYOVASKÜLER DALGALANMA ALARMI',
        content: 'Kapak derisi ve kantal bölge son derece zengin mikrovasküler ağa sahiptir. Kanama kontrolü için Lidokain/Bupivakain karışımına 1:100.000 veya 1:200.000 Epinefrin eklenir. Enjeksiyon esnasında negatif aspirasyon yapılmazsa veya yaşlı kardiyak hastada aşırı doz uygulanırsa akut taşikardi, ventriküler aritmiler, şiddetli hipertansif kriz ve miyokardiyal iskemi gelişebilir! Anestezi ekibi enjeksiyon anında ritmi ve tansiyonu kesintisiz izlemeli, cerrah ile verilen lokal anestezik hacmini mililitre bazında teyit etmeli ve kardiyak dalgalanmalara karşı beta-bloker/vazodilatatör hazır bulundurmalıdır.'
      },
      {
        number: 4,
        title: 'MONİTÖRİZE ANESTEZİ BAKIMINDA (MAC) "AŞIRI SEDASYON VE HİPOVENTİLASYON TUZAĞI"',
        content: 'Entropiyon hastaları çoğunlukla ileri yaşta, kardiyak ve akciğer patolojisi olan bireylerdir. Hastayı sakinleştirmek amacıyla kontrolsüz Propofol bolusları veya yüksek doz benzodiazepin verilmesi solunum depresyonuna, hiperkapniye ve örtü altında hava açlığıyla ani sıçrayarak uyanmaya yol açar. Bu istemsiz baş hareketi cerrahın elindeki bistüri veya koterin glob perforasyonu yapmasına yol açabilecek en büyük tehlikedir! Yalnızca titre edilmiş minimal Midazolam (0.5-1 mg) ve Fentanil (25 mcg) uygulanmalı, nazal O2 ile örtü altı aktif aspirasyon sürdürülmeli ve hasta ile sakin sözel iletişim korunmalıdır.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF DERİN ORBİTAL / RETROBULBER HEMATOM, GÖZ İÇİ BASINCI (GİB) VE KALICI KÖRLÜK RİSKİ',
        content: 'Alt kapak retraktör disseksiyonu orbital yağ yastıkçıklarının hemen önünde gerçekleşir. Orbital yağ damarlarının veya kantal damarların yetersiz hemostazı, kanın orbital septumu aşarak orbita arkasına sızmasına ve retrobulber hematoma yol açar! İntraorbital basıncın ve GİB\'in hızla fırlaması santral retinal arteri tıkayarak saatler içinde KALICI KÖRLÜK yaratır! Operasyon bitiminde koterizasyon eksiksiz olmalı; derlenme odasında hastada ani gelişen şiddetli göz ağrısı, proptozis, kapakta gergin şişlik veya görme kaybı görüldüğünde anestezi ve cerrahi ekibi derhal acil lateral kantotomi/kantolizis ile orbitayı dekomprese etmeye hazır olmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Entropiyon etiyolojisi (involüsyonel, skatrisyel, spastik), kornea erozyonu/ülseri varlığı (biyomikroskopi ve florosein boyama), alt kapak retraktör ayrılması (derin forniks, beyaz çizgi bulgusu), horizontal kantal laksite ve cerrahi plan.',
      'Kardiyoloji Konsültasyonu: Geriatrik grupta yaygın olan hipertansiyon, aritmiler ve koroner arter hastalığının optimizasyonu; adrenalinli lokal anestezik güvenliği.',
      'Göğüs Hastalıkları Konsültasyonu: Cerrahi örtü altında panik veya apne yaşamaması için KOAH veya astım hastalarında preoperatif inhaler tedavisi.',
      'Anestezi Polikliniği: Sırtüstü yatma toleransı, boyun omurga anatomisi (kifoz), sedasyon derinliği ve aspirasyon riski değerlendirmesi.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan İlaç Kullanımı: Aspirin, Klopidogrel, DOAK ve Warfarin kullanımı; alt kapak retraktör ve kantal cerrahide orbital hematom riskini önlemek için hemostatik strateji cerrah ile belirlenir.',
      'Kornea Ülseri ve Enfeksiyon Öyküsü: Aktif bakteriyel keratit varlığı cerrahi öncesi topikal antibiyotik tedavisini gerektirebilir.',
      'Hipertansiyon ve Taşikardi Öyküsü: İntraoperatif adrenalin enjeksiyonuna karşı kardiyovasküler yanıt hassasiyeti.',
      'Klostrofobi ve Anksiyete: Ameliyat örtüleri altında nefes alamama ve yüz kapatılması fobisi.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit düzeyi).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri ve Temel Biyokimya (Böbrek ve karaciğer fonksiyonları).',
      '12 Derivasyonlu EKG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve adrenalin kaynaklı taşiaritmi analizi), SpO2, NIBP ve Solunum Sayısı.',
      'Kan Basıncı Takibi (3-5 dakikada bir): Adrenalinli lokal infiltrasyon ve kantal diseksiyon evresinde kan basıncı stabilitesi (SKB < 140 mmHg).',
      'Sedasyon ve Solunum Takibi: Nazal kanülden CO2 örneklemesi (kapnografi) ve örtü altı oksijenizasyon izlemi.'
    ],
    vascularAccess: [
      '1 adet güvenli periferik intravenöz damar yolu (20-22G)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg ampul)',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol veya Labetalol'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Hafif Yükseltilmiş (15-20 Derece) ve Hareketsiz',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş silikon donüt yastıkla sabitlenerek yüzün hafifçe cerraha doğru paralel olması sağlanır.',
      'Baş-boyun venöz basıncını azaltarak kanamayı önlemek amacıyla yatağın baş kısmı 15-20 derece yükseltilir (Reverse Trendelenburg eğimi).',
      'Cerrahi örtülerin yüze doğrudan temas etmemesi ve solunum alanının açık kalması için esnek L-bar köprüsü kurulur.',
      'Hastaya burun kanülü ile 2-3 L/dk O2 verilir ve örtü altına temiz hava/aspirasyon hattı yerleştirilir.'
    ],
    anesthesiaManagement: [
      'Lokal İnfiltrasyon ve Rejyonel Blok Protokolü:',
      '  - Solüsyon: Lidokain %2 + Bupivakain %0.5 (1:1 karışım) + 1:100.000 Epinefrin + Hyaluronidaz (15 IU/mL).',
      '  - Enjeksiyon Alanı: Alt kapak subsiliyer hat, alt forniks subkonjonktival doku ve lateral kantus (toplam 2-4 mL). Enjeksiyon öncesi negatif aspirasyon zorunludur.',
      '  - Tam vazokonstrüksiyon ve anestezi oturması için insizyondan önce EN AZ 7-10 DAKİKA BEKLENMELİDİR.',
      'Monitörize Anestezi Bakımı (MAC):',
      '  - Minimal sedasyon: Midazolam 0.5 - 1.0 mg İV + Fentanil 25 mcg İV.',
      '  - Derin sedasyondan kesinlikle kaçınılır; hasta sözel komutlara yanıt verebilmeli, derin uyku ve apneye girmemelidir.',
      'Genel Anestezi Gereken Durumlarda:',
      '  - Laringeal Maske (LMA) veya Spiral Telli Endotrakeal Tüp ile pürüzsüz uyanma sağlanır; ekstübasyonda öksürük engellenir.'
    ],
    airwayManagement: [
      'MAC yönetiminde hava yolu hastanın kendi spontan solunumudur; nazal kanül ile 2 L/dk O2 verilir.',
      'Örtü altında karbondioksit birikimini ve sıcaklık hissini önlemek için vakum hortumu ile aktif örtü altı havalandırma kurulur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Başın Sabitlenmesi.',
      '2. Topikal Anestezi Damlası (Proparakain %0.5) Damlatılması ve Koruyucu Pomad Eşliğinde Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Lokal Anestezik ve Epinefrin İnfiltrasyonu (Alt kapak ve lateral kantus — 7-10 dk bekleme süresi).',
      '4. Subsiliyer İnsizyon Yapılması (Kirpiklerin 2-3 mm altından deri veya deri-kas flebi disseksiyonu).',
      '5. Preseptal Orbikülaris Kasının Tarsus Üzerinden Sıyrılması (Over-riding liflerin diseksiyonu).',
      '6. Alt Kapak Retraktörlerinin (Kapsülopalpebral Fasya) Tanımlanması ve Serbestleştirilmesi — (İnferior oblik kası koruma kontrolü!).',
      '7. Retraktörlerin Tarsusun Alt Sınırına Plikasyonu / Reinsersiyonu (5-0 veya 6-0 emilebilir dikişlerle kapak kenarının eversiyon vektörünün oluşturulması).',
      '8. Eşlik Eden Horizontal Laksitede Lateral Tarsal Strip (LTS) Uygulanması (Whitnall tüberkülüne tespit — Okülokardiyak refleks kontrolü!).',
      '9. Deri İnsizyonunun Kapatılması (6-0 sütürlerin retraktör fasyayı hafifçe yakalayarak eversiyonu desteklemesi).',
      '10. Kornea Kalkanının Nazikçe Çıkarılması, Kornea Epitel Muayenesi, Antibiyotikli Pomad ve Basısız Pansuman.'
    ],
    emergenceNotes: [
      'Lokal/MAC cerrahisinde uyanma dönemi yoktur; ameliyat bitiminde hasta sedyeye veya tekerlekli sandalyeye oturur vaziyette alınabilir.',
      'Ameliyat edilen göze baskı yapılmaz; steril gazlı bezle hafif pansuman uygulanır (görme keskinliği ve hematom kontrolü için bantlar çok sıkı olmamalıdır).',
      'Hastaya ve refakatçisine ameliyat sonrası ani gelişen şiddetli göz ağrısı veya görme kaybında acilen hekime başvurması tembihlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Entropiyon onarımı sonrası ağrı genellikle hafif düzeydedir ve cerrahi sahada gerginlik/sızlama şeklindedir.',
      'Oral Parasetamol (500-1000 mg) ilk 24-48 saatte tamamen yeterlidir.',
      'Trombosit fonksiyonlarını baskılayarak hematom riskini artırabilecek aspirin veya agresif NSAİİ kullanımından ilk günlerde kaçınılmalıdır.',
      'İlk 24-48 saat cerrahi sahaya aralıklı soğuk jel kompres uygulanması ödemi ve hematom riskini belirgin şekilde azaltır.'
    ],
    prospectRecommendations: [
      'PROSPECT Oküloplastik Cerrahi Rehberleri:',
      'Preoperatif ve intraoperatif lokal infiltrasyon + sinir bloğunun postoperatif analjezik gereksinimini sıfıra indirdiği;',
      'Opioid kullanımından kaçınılarak PONV (bulantı/kusma) ve buna bağlı venöz basınç artışının engellenmesi tavsiye edilir.'
    ],
    erasRecommendations: [
      'ERAS Göz ve Oküloplastik Cerrahi Protokolleri:',
      'Günübirlik cerrahi (Day-case surgery): Hasta operasyondan 30-45 dakika sonra oral alıma başlayabilir ve aynı gün güvenle taburcu edilir.',
      'Postoperatif Baş Pozisyonu: İlk gece başın 2 yastıkla (30-45 derece) yükseltilmesi ödem ve kanama riskini önler.',
      'Gözü Ovuşturma Yasağı: Yeni atılan retraktör ve kantal dikişlerin korunması için hastanın gözünü ovuşturması kesinlikle yasaklanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Oculoplastics - Ectropion and Entropion Repair, pp. 868-874.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Recommendations for Day-Case Oculofacial Surgery.',
    prospectReference: 'PROSPECT Guidelines: Postoperative Pain Management in Ophthalmic and Oculoplastic Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Oculofacial Plastic Surgery (Involutional Entropion Management).',
      'European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS): Lower Eyelid Retractor Repair and Canthoplasty Consensus.',
      'Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi: Kapak Malpozisyonları ve Entropiyon Tedavi Kılavuzu.'
    ]
  }
};
