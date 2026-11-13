import { ProcedureDefinition } from '../../types/procedures';

/**
 * Anterior ve Lateral Orbitotomi: İntrakonal ve Ekstrakonal Orbita Tümörleri, Lakrimal Bez Lezyonları ve Dekompresyon Cerrahisi
 * (Orbitotomy—Anterior and Lateral: Intraconal/Extraconal Tumor Resection, Lacrimal Gland Excision and Lateral Wall Osteotomy)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Orbital Surgery: Anterior and Lateral Orbitotomy, pp. 894-900),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Orbit and Oculoplastics,
 * European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS),
 * British Ophthalmic Anaesthesia Society (BOAS) ve Türk Oftalmoloji Derneği (TOD) Oküloplastik ve Orbita Cerrahisi Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const orbitotomyAnteriorLateral: ProcedureDefinition = {
  id: 'orbitotomy-anterior-and-lateral',
  name: 'Anterior ve Lateral Orbitotomi: İntrakonal / Ekstrakonal Orbita Tümör ve Kitle Cerrahisi',
  shortCode: 'GOZ-ORBITOTOMI',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Orbita Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Orbita boşluğunda yerleşim gösteren selim veya habis tümörlerin (kavernöz hemanjiyom, schwannom, optik sinir kılıf menenjiyomu, lakrimal bez pleomorfik adenomu / karsinomu, orbital lenfoma, dermoid kist), orbital vasküler malformasyonların eksizyonu veya tiroid orbitopatisinde (Graves oftalmopatisi) optik nöropatiyi önlemek amacıyla orbita apeksinin ve kemik duvarlarının cerrahi olarak açılması ameliyatıdır. İki ana yaklaşım kullanılır: (1) Anterior Orbitotomi: Glob ekvatorunun önünde veya ön-orta orbitada, ekstrakonal alanda (özellikle lakrimal bez loju veya anterior yağ dokusu) yerleşmiş lezyonlara uygulanır; transkonjonktival (forniks), subsiliyer veya üst kapak kıvrımı (crease) insizyonlarıyla kemik kesisi yapılmadan doğrudan kitleye ulaşılır; (2) Lateral Orbitotomi (Krönlein / Stallard-Wright Prosedürü): Globun arkasında, retrobulber intrakonal alanda, optik sinir komşuluğunda veya lateral orbita apeksinde yerleşmiş derin kitlelere ulaşmak için altın standarttır; lateral kantotomi ve temporal fasyaya uzanan insizyon sonrası periost sıyrılır; mikrotur/piezo veya salınımlı kemik testeresi ile zigomatik kemik ve sfenoid büyük kanadından lateral orbita kemik penceresi (osteotomi) kesilip çıkarılır; periorbita açılarak lateral rektus kası ve optik sinir korunarak tümör mikronöroşirürjikal teknikle diseke edilir; operasyon bitiminde kemik pencere titanyum mikroplaklar ve vidalar ile rijit şekilde anatomik yerine tespit edilir.',
  indications: [
    'Retrobulber ve İntrakonal Selim Orbital Tümörler: Kavernöz hemanjiyom (yetişkinlerde en sık), nörinom / schwannom, soliter fibröz tümör',
    'Lakrimal Bez Tümörleri ve İnflamasyonları: Pleomorfik adenom, adenoid kistik karsinom veya biyopsi gerektiren dakriyoadenitler',
    'Optik Sinir ve Kılıfı Tümörleri: Optik sinir kılıfı menenjiyomu, optik gliyom (görme kaybı ve proptozis yapan lezyonlar)',
    'Orbital Maligniteler ve Metastazlar: Lenfoma, rabdomyosarkom (pediatrik), meme veya akciğer karsinomu orbital metastazları',
    'Tiroid Göz Hastalığı (Graves Orbitopatisi): İlerleyici distiroid optik nöropati (DON) ve körlüğü önlemek için 3-duvar / lateral orbita dekompresyonu',
    'Derin Orbital Yabancı Cisimler, Kistler (Dermoid/Epidermoid) ve Apikal Apseler'
  ],
  averageDuration: '90 - 180 dakika (İzole anterior orbitotomi: 60-90 dk; Kemik osteotomili ve intrakonal disseksiyonlu lateral orbitotomi: 120-180 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 150 mL (Orbita retrobulber yağ dokusu, ekstraoküler kas pleksusları ve kemik osteotomi kenarları vaskülerdir; ancak titiz bipolar hemostaz ve kontrollü kan basıncı ile sistemik kan kaybı düşüktür)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Ancak Kapalı Kemik Kompartmanda Katastrofik Retrobulber Hematom ve Körlük Tehlikesi',
    crossMatchRequirement: 'Kan Grubu ve T&S (Geniş osteotomi ve vasküler kitlelerde 1-2 Ünite ES Cross-Match hazır bulundurulmalıdır)',
    transfusionProbability: '< %1 - 3 (İzole kitlelerde nadirdir; ancak vasküler hemanjiyom veya çocuk cerrahisinde gerekebilir)',
    criticalBleedingSources: [
      'Oftalmik Arter Dallarından ve Derin İntrakonal Venöz Pleksuslardan Kanama: Optik sinir komşuluğunda veya tümör pedikülünde vasküler yırtılma',
      'Lateral Duvar Kemik Osteotomi Kanaması: Zigoma ve sfenoid kanadı spongiyöz kemik kanamaları',
      'Lakrimal Arter ve Anterior/Posterior Etmoidal Arter Dallarından Kanama',
      'Derin Retrobulber Hematom: Kapalı kemik orbitada basıncı 60-80 mmHg üzerine fırlatarak santral retinal arteri tıkayan en ölümcül komplikasyon'
    ],
    hemostasisStrategies: [
      'Bipolar wet-field mikro-koter kullanımı (monopolar koter optik sinire termal hasar vereceğinden intrakonal alanda KESİNLİKLE KULLANILMAZ)',
      'Kemik kenarlarına kemik mumu (bone wax) ve hemostatik jelatin sünger (Spongostan / Surgicel / Floseal) uygulaması',
      'İntraoperatif kan basıncının kontrollü normotansif sınırda (MAP 70-80 mmHg) tutulması; ani hipertansif piklerin engellenmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA) + Spiral Telli Tüp + Normotansif/Hafif Hipotansif Stabilite (MAP 70-85 mmHg) + Nöromusküler Blokaj + Pürüzsüz Ekstübasyon Protokolü — DÜNYA GENELİNDE MUTLAK ZORUNLU STANDARTTIR'
    ],
    alternative: [
      'KONTRENDİKASYON UYARISI: Retrobulber, Peribulber veya Sub-Tenon blokları lateral orbitotomide KESİNLİKLE UYGULANMAZ! İntrakonal kitle varlığında iğne ile tümörün veya optik sinirin delinmesi, retrobulber hematom ve görme kaybı riski nedeniyle blok kontrendikedir',
      'Yalnızca çok yüzeyel ve ön kapak kıvrımından yapılan küçük anterior biyopsilerde çok seçilmiş olgularda Lokal İnfiltrasyon + MAC uygulanabilir; kemik osteotomili lateral orbitotomide genel anestezi şarttır'
    ],
    clinicalRationale: 'İntrakonal alanda optik sinire milimetrik komşulukta çalışılması, lateral duvar osteotomisi ve retrobulber blokların kitle/optik sinir delinmesi ile hematom riski taşıması nedeniyle genel anestezi mutlak standarttır. Hava yolunda ise baş-yüz cerrahi örtülerinin altında bükülmeyi önlemek, cerrahi manipülasyona rağmen mutlak hareketsizliği korumak ve normotansif/normokapnik perfüzyon dengesini sürdürmek için spiralli (zırhlı) kaflı endotrakeal tüp tercih edilir.',
    rulesTitle: 'ORBİTOTOMİDE (ANTERİOR VE LATERAL) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'ORBİTOTOMİDE (ANTERİOR VE LATERAL) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) OPTİK SİNİR VE SANTRAL RETİNAL ARTER PERFÜZYON GÜVENLİĞİ — MAP 70-85 mmHg VE SIFIR AŞIRI HİPOTANSİYON DİSİPLİNİ — Retrobulber intrakonal tümör disseksiyonunda optik sinir, siliyer ganglion ve santral retinal arter milimetrik yakınlıktadır. Retinal perfüzyon basıncı (OPP = MAP - GİB) hayati önem taşır. Kanama kontrolü bahanesiyle MAP\'ın < 65 mmHg altına düşürülmesi (aşırı hipotansiyon) veya ekartörlerin küreye aşırı bası yapması optik sinir iskemisine (İskemik Optik Nöropati - İON) ve postoperatif KALICI KÖRLÜĞE yol açar! Kan basıncı MAP 70-85 mmHg seviyesinde normotansif sınırda tutulmalı; aşırı hipotansiyondan kesinlikle kaçınılmalıdır. (2) KRONİK DERİN ORBİTAL / RETROBULBER HEMATOM, AKUT KOMPARTMAN SENDROMU VE KALICI KÖRLÜK ALARMI — Lateral kemik pencere titanyum plaklarla kapatılıp konjonktiva dikildiğinde orbita rijit, kapalı bir kemik kutuya dönüşür. Derin orbital venlerin veya oftalmik arter dallarının kanaması intraorbital basıncı saniyeler içinde 60-80 mmHg üzerine fırlatarak akut orbital kompartman sendromu yaratır (60-90 dakikada kalıcı körlük!). Operasyon bitiminde hemostaz bipolar koter, kemik mumu ve hemostatik matrikslerle eksiksiz yapılmalı; derlenme odasında ani şiddetli göz ağrısı, taş gibi sert proptozis veya pupilla dilatasyonunda (RAPD) derhal dikişler açılmalı ve acil cerrahi dekompresyon uygulanmalıdır. (3) EKSTRAOKÜLER KAS VE ORBİTAL APEKS MANİPÜLASYONUNDA OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE ASİSTOLİ TEHLİKESİ — Lateral rektus kasının askıya alınması, retrobulber yağ diseksiyonu veya orbita apeksine doğru yapılan traksiyon derin trigemino-vagal refleks arkını (CN V1 oftalmik dal -> CN X vagus) tetikler. EKG monitöründe aniden derin sinüs bradikardisi, AV tam blok veya ventriküler asistoli gelişebilir! EKG anlık takip edilmeli, nabız düşüşünde cerraha derhal "TRAKSİYONU BIRAK" ikazı verilmeli; düzelmezse İV Atropin (0.5 - 1.0 mg) uygulanmalıdır. (4) PÜRÜZSÜZ EKSTÜBASYON (SMOOTH EMERGENCE), SIFIR IKINMA / ÖKSÜRÜK VE ŞİDDETLİ KANAMA ÖNLEMİ — Ekstübasyon anında hastanın tüpü ısırması, öksürmesi veya ıkınması baş-boyun venöz basıncını 40-50 cmH2O üzerine çıkararak derin retrobulber venöz kanamayı tetikler ve kemik kapağın altını kanla doldurur. Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg), derin/öksürmesiz uyanma ve ikili kombine antiemetik profilaksisi (İV Ondansetron + Deksametazon) zorunludur; hasta kesinlikle öğürmeden uyandırılmalıdır. (5) KORNEAL KORUMA, SIFIR GLOB BASISI VE KAFATASI TABANI / BOS FİSTÜLÜ KONTROLÜ — İntraoperatif kornea hasarını önlemek için göze antibiyotikli pomad sürülerek opak plastik Corneal Shield (Kornea Kalkanı) yerleştirilmeli; mikrotur veya osteotomi kemik kesilerinde göze mekanik bası sıfır tutulmalıdır. Ayrıca sfenoid kanadı ve orbita tavanına yakın derin lateral diseksiyonlarda dural yırtılma ve Beyin Omurilik Sıvısı (BOS) kaçağı riski vardır; berrak sıvı drenajı anında cerraha bildirilmelidir.',
    indispensableRules: [
      {
        number: 1,
        title: 'OPTİK SİNİR VE SANTRAL RETİNAL ARTER PERFÜZYON GÜVENLİĞİ — MAP 70-85 mmHg VE SIFIR AŞIRI HİPOTANSİYON DİSİPLİNİ',
        content: 'Retrobulber intrakonal tümör disseksiyonunda optik sinir, siliyer ganglion ve santral retinal arter milimetrik yakınlıktadır. Retinal perfüzyon basıncı (OPP = MAP - GİB) hayati önem taşır. Kanama kontrolü bahanesiyle MAP\'ın < 65 mmHg altına düşürülmesi (aşırı hipotansiyon) veya ekartörlerin küreye aşırı bası yapması optik sinir iskemisine (İskemik Optik Nöropati - İON) ve postoperatif KALICI KÖRLÜĞE yol açar! Kan basıncı MAP 70-85 mmHg seviyesinde normotansif sınırda tutulmalı; aşırı hipotansiyondan kesinlikle kaçınılmalıdır.'
      },
      {
        number: 2,
        title: 'KRONİK DERİN ORBİTAL / RETROBULBER HEMATOM, AKUT KOMPARTMAN SENDROMU VE KALICI KÖRLÜK ALARMI',
        content: 'Lateral kemik pencere titanyum plaklarla kapatılıp konjonktiva dikildiğinde orbita rijit, kapalı bir kemik kutuya dönüşür. Derin orbital venlerin veya oftalmik arter dallarının kanaması intraorbital basıncı saniyeler içinde 60-80 mmHg üzerine fırlatarak akut orbital kompartman sendromu yaratır (60-90 dakikada kalıcı körlük!). Operasyon bitiminde hemostaz bipolar koter, kemik mumu ve hemostatik matrikslerle eksiksiz yapılmalı; derlenme odasında ani şiddetli göz ağrısı, taş gibi sert proptozis veya pupilla dilatasyonunda (RAPD) derhal dikişler açılmalı ve acil cerrahi dekompresyon uygulanmalıdır.'
      },
      {
        number: 3,
        title: 'EKSTRAOKÜLER KAS VE ORBİTAL APEKS MANİPÜLASYONUNDA OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE ASİSTOLİ TEHLİKESİ',
        content: 'Lateral rektus kasının askıya alınması, retrobulber yağ diseksiyonu veya orbita apeksine doğru yapılan traksiyon derin trigemino-vagal refleks arkını (CN V1 oftalmik dal -> CN X vagus) tetikler. EKG monitöründe aniden derin sinüs bradikardisi, AV tam blok veya ventriküler asistoli gelişebilir! EKG anlık takip edilmeli, nabız düşüşünde cerraha derhal "TRAKSİYONU BIRAK" ikazı verilmeli; düzelmezse İV Atropin (0.5 - 1.0 mg) uygulanmalıdır.'
      },
      {
        number: 4,
        title: 'PÜRÜZSÜZ EKSTÜBASYON (SMOOTH EMERGENCE), SIFIR IKINMA / ÖKSÜRÜK VE ŞİDDETLİ KANAMA ÖNLEMİ',
        content: 'Ekstübasyon anında hastanın tüpü ısırması, öksürmesi veya ıkınması baş-boyun venöz basıncını 40-50 cmH2O üzerine çıkararak derin retrobulber venöz kanamayı tetikler ve kemik kapağın altını kanla doldurur. Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg), derin/öksürmesiz uyanma ve ikili kombine antiemetik profilaksisi (İV Ondansetron + Deksametazon) zorunludur; hasta kesinlikle öğürmeden uyandırılmalıdır.'
      },
      {
        number: 5,
        title: 'KORNEAL KORUMA, SIFIR GLOB BASISI VE KAFATASI TABANI / BOS FİSTÜLÜ KONTROLÜ',
        content: 'İntraoperatif kornea hasarını önlemek için göze antibiyotikli pomad sürülerek opak plastik Corneal Shield (Kornea Kalkanı) yerleştirilmeli; mikrotur veya osteotomi kemik kesilerinde göze mekanik bası sıfır tutulmalıdır. Ayrıca sfenoid kanadı ve orbita tavanına yakın derin lateral diseksiyonlarda dural yırtılma ve Beyin Omurilik Sıvısı (BOS) kaçağı riski vardır; berrak sıvı drenajı anında cerraha bildirilmelidir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti ve Orbita Konsültasyonu: Proptozis miktarı (Hertel ekzoftalmometresi), görme keskinliği, görme alanı (kompresif optik nöropati), renkli görme (İshihara testi), pupilla refleksleri (RAPD) ve oküler motilite (şaşılık/kısıtlılık).',
      'Nöroradyoloji Konsültasyonu: İnce Kesit Kontrastlı Orbita ve Beyin MRG (T1, T2, Yağ baskılı ve kontrastlı seriler; intrakonal/ekstrakonal lokalizasyon, optik sinir komşuluğu, sfenoid kemik invazyonu) ve 3 Boyutlu Kemik Pencere Orbita BT.',
      'Beyin Cerrahisi Konsültasyonu: Kitle orbita apeksini, optik kanalı aşıp kafa içine (orta kafa çukuru / kavernöz sinüs) uzanıyorsa kombine kraniyotomi/orbitotomi planı.',
      'Kardiyoloji Konsültasyonu: İleri yaş grupta hipertansiyon, aritmiler ve hemodinamik stabilite değerlendirmesi.',
      'Anestezi Hazırlığı: Zor hava yolu ve laringoskopi güvenliği.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan İlaç Kullanımı: Aspirin, Klopidogrel, Warfarin ve DOAK; kapalı kemik kompartmanda retrobulber hematom körlük yarattığından kan sulandırıcılar operasyondan 5-7 gün önce kılavuzlara uygun olarak mutlaka kesilmeli/köprülenmelidir.',
      'Görme Kaybının Hızı: Akut görme kaybı optik sinir basısını veya tümör içi kanamayı düşündürür.',
      'Sistemik Kanser Öyküsü: Meme, akciğer, prostat veya melanom metastazı şüphesi.',
      'Tiroid Hastalığı Öyküsü: Graves orbitopatisinde tiroid hormon düzeyleri (ötiroid durum sağlanmalıdır).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları.',
      'Kan Grubu ve Bekletmesiz Cross-Match (1-2 Ünite ES).',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Orbita ve Kafa Tabanı Yüksek Çözünürlüklü BT / MRG.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve ani bradikardi/asistoli takibi), SpO2, EtCO2 ve Vücut Sıcaklığı.',
      'İnvaziv Arter Basıncı İzlemi (Radial Arter Kanülasyonu): Kan basıncının anlık izlenmesi, MAP 70-85 mmHg aralığında tutulması (Aşırı hipotansiyondan kaçınılır!).',
      'Nöromusküler İleti Monitörizasyonu (TOF): Mikrotur ile kemik kesisi ve optik sinir disseksiyonu esnasında hastanın hareket etmemesi için TOF %0-25 seviyesinde tutulur.',
      'EtCO2 Kontrolü: Normokapni (EtCO2 35-38 mmHg) sağlanır; hiperkapni orbital venöz göllenmeyi ve kanamayı artırır.'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz damar yolu (16-18G)',
      'İntraoperatif İnvaziv Arter Hattı (20G Radial Arter Kanülü)',
      'Acil Bradikardi Kiti: İntravenöz Atropin (0.5 - 1.0 mg) masada hazır',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol veya Labetalol'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Donüt / Mayfield Çivili Başlık ile Sabit ve 20 Derece Reverse Trendelenburg',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş cerrahi mikroskobun eksenine göre 10-15 derece karşı tarafa çevrilir ve rijit sabitlenir.',
      'Orbital venöz basıncı azaltmak için ameliyat masasına 20 derece Reverse Trendelenburg eğimi verilir.',
      'Göze antibiyotikli pomad sürülerek opak plastik Kornea Kalkanı (Corneal Shield) yerleştirilir.',
      'Spiral telli endotrakeal tüp cerrahi sahanın karşı tarafına güvenle sabitlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - Propofol (2.0 mg/kg) + Fentanil / Remifentanil + Rokuronyum (0.6 mg/kg).',
      '  - İV Lidokain (1.5 mg/kg) entübasyon yanıtını ve GİB artışını baskılamak için indüksiyondan 90 saniye önce verilir.',
      'İdame ve Hemodinamik Hedef:',
      '  - TIVA (Propofol + Remifentanil infüzyonu) veya Sevofluran/İzofluran.',
      '  - HEDEF: MAP kesinlikle 70-85 mmHg aralığında tutulmalıdır. Aşırı hipotansiyondan (MAP < 65) optik sinir perfüzyonunu korumak için KESİNLİKLE KAÇINILMALIDIR.',
      'Osteotomi Fazı (Kemik Pencere):',
      '  - Salınımlı testere veya mikrotur kullanılırken serum fizyolojik ile sürekli soğutma yapılır; kemik tozu ve kanama kemik mumu ile kontrol edilir.',
      'Tümör Rezeksiyonu ve Optik Sinir Fazı:',
      '  - Bipolar mikro-koter kullanılır; kitle kapsülü nazikçe sıyrılırken ekstraoküler kas traksiyonunda kalp hızı anlık takip edilir (Aschner refleksi!).',
      'Kapanış Fazı:',
      '  - Lateral kemik pencere titanyum mikroplaklar ve vidalar ile rijit şekilde yerine tespit edilir.',
      '  - Derin orbital hemostaz teyit edilir; gerekirse kapalı emici mikro-dren (Penrose veya mini Jackson-Pratt) konulabilir.'
    ],
    airwayManagement: [
      'Spiral telli (reinforced) endotrakeal tüp baş pozisyonunda bükülmez.',
      'Kapanıştan önce mideye hava veya kan kaçışına karşı orogastrik sonda ile dekompresyon sağlanır.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Rijit Baş Tespiti ve Başın 20 Derece Yükseltilmesi.',
      '2. Koruyucu Pomad Eşliğinde Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Cerrahi İnsizyonun İşaretlenmesi ve 1:100.000 Epinefrinli Lokal İnfiltrasyon (7-10 dk bekleme süresi).',
      '4. Cilt İnsizyonu (Lateral kantotomi + horizontal uzatım veya S-şekilli Stallard insizyonu).',
      '5. Temporalis Kasının ve Periorbitanın Zigomatik Kemiğin Lateral Duvarından Sıyrılması.',
      '6. Kemik Osteotomi: Salınımlı testere veya mikrotur ile zigomatik kemik ve sfenoid kanadından kemik pencere kesilmesi ve kapağın çıkarılması.',
      '7. Periorbitanın Açılarak Retrobulber İntrakonal Boşluğa Girilmesi.',
      '8. Lateral Rektus Kasının Askıya Alınması ve Tümörün Ortaya Konması (Okülokardiyak refleks kontrolü!).',
      '9. Mikronöroşirürjikal Tümör Rezeksiyonu (Optik sinir ve siliyer damarların titizlikle korunması).',
      '10. Derin Orbital Hemostazın Sağlanması (Bipolar koter, Surgicel/Floseal ve kemik mumu).',
      '11. Kemik Pencerenin Titanyum Mikroplak ve Vidalarla Anatomik Tespiti.',
      '12. Periorbita, Temporalis Kası, Kantus ve Cildin Kapatılması, Kornea Kalkanının Çıkarılması ve Basısız Pansuman.'
    ],
    emergenceNotes: [
      'Pürüzsüz Ekstübasyon (Smooth Emergence) Hayati Önem Taşır: Öksürme, ıkınma ve hipertansiyon retrobulber hematomu tetikler!',
      'Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanır.',
      'İntraoperatif kombine İV Ondansetron (4-8 mg) + Deksametazon (4 mg) ile postoperatif kusma kesinlikle önlenir.',
      'Hasta tamamen uyanık, hemodinamik olarak stabil ve normotansif olduğunda nazikçe ekstübe edilir.',
      'GÖZE BASKILI BANDAJ KESİNLİKLE YAPILMAZ! Baskılı bandaj gelişebilecek retrobulber hematomun dışarıya proptozis yaparak basıncı tahliye etmesini engeller ve anında körlük yaratır; hafif steril pansuman ve şeffaf delikli kalkan konulur.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Orbitotomi sonrası kemik osteotomi ve temporalis kas diseksiyonu nedeniyle orta-şiddetli baş ve göz çevresi ağrısı görülebilir.',
      'İntravenöz Parasetamol (1000 mg) her 6 saatte bir bazal analjezik olarak uygulanır.',
      'Gereğinde İV Tramadol (50 mg) veya titre edilmiş Fentanil.',
      'Kanama ve hematom riskini artırabilecek aspirin ve agresif NSAİİ kullanımından kesinlikle kaçınılmalıdır.',
      'Operasyon sahasına aralıklı soğuk jel kompres uygulanması ödemi ve hematom riskini azaltır.'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyofasiyal ve Orbita Cerrahisi Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi protokolleri;',
      'Postoperatif dönemde şiddetli kusma, ıkınma ve tansiyon piklerinin agresif antiemetik ve analjeziklerle engellenmesi esastır.'
    ],
    erasRecommendations: [
      'ERAS Orbita ve Kraniyofasiyal Cerrahi Protokolleri:',
      'Hastanede Yatış ve Yakın İzlem: Hasta en az 24-48 saat serviste veya yoğun bakımda izlenir.',
      'Saatlik Görme ve Pupilla Takibi: İlk 24 saat boyunca her saat başı parmak sayma, ışık algısı ve pupil refleksi (RAPD) hemşirelik takibine alınır.',
      'Başın 30-45 Derece Yükseltilmesi: Orbital venöz göllenmeyi ve ödemi azaltmak için baş sürekli yüksekte tutulur.',
      'Val-salva Önlemleri: Öksürük kesici ve laksatif desteği ile ıkınma engellenir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Orbital Surgery - Anterior and Lateral Orbitotomy (Krönlein / Stallard-Wright Procedure), pp. 894-900.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Clinical Consensus for Inpatient Complex Orbital Surgery.',
    prospectReference: 'PROSPECT Guidelines: Perioperative Pain and PONV Management in Complex Ophthalmic and Cranio-Orbital Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Orbit and Oculoplastic Surgery (Orbital Tumors and Decompression).',
      'European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS): Consensus on Surgical Approaches to the Orbit and Lateral Orbitotomy.',
      'Türk Oftalmoloji Derneği (TOD) Oküloplastik ve Orbita Cerrahisi Birimi: Orbita Tümörleri Tanı, Cerrahi ve Anestezi Yönetimi Rehberi.'
    ]
  }
};
