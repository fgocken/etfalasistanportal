import { ProcedureDefinition } from '../../types/procedures';

/**
 * Açık Küre Travması Onarımı: Glob Rüptürü ve Korneoskleral Laserasyon Primer Mikrocerrahi Onarımı
 * (Repair of Ruptured or Lacerated Globe / Open Globe Injury [OGI] Repair)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Ocular Trauma: Repair of Ruptured or Lacerated Globe, pp. 842-848),
 * Birmingham Eye Trauma Terminology System (BETTS) & American Society of Ophthalmic Trauma (ASOT),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Open Globe Injuries,
 * British Ophthalmic Anaesthesia Society (BOAS) & Royal College of Anaesthetists (RCoA),
 * Türk Oftalmoloji Derneği (TOD) Oküler Travma ve Mediko-Legal Oftalmoloji Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const repairRupturedLaceratedGlobe: ProcedureDefinition = {
  id: 'repair-ruptured-lacerated-globe',
  name: 'Açık Küre Travması Onarımı: Glob Rüptürü ve Korneoskleral Laserasyon Primer Onarımı',
  shortCode: 'GOZ-GLOB-RUPTUR',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküler Travma & Açık Küre Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz küresi dış duvarının (kornea, sklera veya her ikisinin) künt travma sonucu patlaması (glob rüptürü) ya da kesici/delici alet, şarapnel veya mermi çekirdeği ile tam kat delinmesi (korneoskleral laserasyon, penetran/perforan travma, göz içi yabancı cisim [İOFB]) sonucu gelişen ve acil cerrahi eksplorasyon ile mikrocerrahi onarım gerektiren en kritik oftalmik acil tablodur. BETTS sınıflamasına göre rüptürler göz içi basıncının aniden yükselmesiyle skleranın en zayıf noktalarından (limbus, ekvator, rektus kas insersiyonları arkası veya geçirilmiş katarakt/keratoplasti kesi yerleri) içten dışa doğru yırtılmasıdır; laserasyonlar ise dıştan içe keskin penetrasyondur. Cerrahi aşamalar: (1) Göze asla bası uygulamadan cerrahi örtülerin yerleştirilmesi; (2) 360 derece konjonktival peritomi yapılarak dört rektus kasının askıya alınması ve tüm skleranın ekvator arkasına kadar eksplorasyonu (okült rüptür araması); (3) Kornea ve limbus anatomik işaret noktalarının (landmarks) 10-0 naylon sütürlerle su geçirmez kapatılması; (4) Skleral yırtığın rektus kaslarının altından geçilerek arkaya doğru 8-0 veya 9-0 naylon dikişlerle adım adım kapatılması; (5) Prolabe olmuş, nekrotik veya enfekte uveal/vitreus dokularının temizlenmesi, viable iris dokusunun repozisyonu; (6) Ön kamara rekonstrüksiyonu, BSS ile glob tonusunun sağlanması ve profilaktik intravitreal/intrakameral antibiyotik enjeksiyonu.',
  indications: [
    'Tam Kat Korneal, Limbal veya Skleral Laserasyon (Penetran Açık Küre Travması)',
    'Künt Travmaya Bağlı Glob Rüptürü (Hifema, derin vitreus kanaması, yumuşak glob / intraoküler hipotoni ve prolabe doku varlığı)',
    'Göz İçi Yabancı Cisim (İOFB - Intraocular Foreign Body) Eşlik Eden Perfore Açık Küre Yaralanması',
    'Perforan Göz Yaralanması (Hem giriş hem çıkış deliği olan çift delikli travma)',
    'Eski Cerrahi Kesi Hattı Ayrılması (Post-katarakt, post-PKP veya post-glokom flep ayrışması ve doku ekstrüzyonu)'
  ],
  averageDuration: '60 - 150 dakika (İzole ön segment kornea laserasyonu: 45-60 dk; Rektus kasları altına uzanan kompleks korneoskleral rüptür: 90-150 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 20 - 50 mL (Avasküler kornea ve sklera kesilerinde kanama azdır; ancak üvea ve koroid yırtıklarında veya suprakoroidal kanamada göz içi kan kaybı artabilir; sistemik dolaşım için kan kaybı düşüktür)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kan Kaybı / Ancak Katastrofik Masif Ekspulsif Koroidal Hemoraji Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur; ancak çoklu travmalı politravma hastalarında kontrol edilir)',
    transfusionProbability: '< %0.01 (İzole oküler travmada transfüzyon gerekmez)',
    criticalBleedingSources: [
      'Ekspulsif Suprakoroidal Hemoraji: Açık kürede ani hipotoni, ıkınma veya öksürükle arka siliyer arterlerin patlaması sonucu tüm intraoküler içeriğin yaradan dışarı fışkırması (gözün tamamen kaybına yol açan en ölümcül oküler komplikasyon)',
      'İris Kökü Yırtılması (İridodiyaliz) ve Ön Kamara Masif Hifeması',
      'Siliyer Cisim ve Koroid Yırtıklarından Kaynaklanan Vitreus İçi Kanamalar'
    ],
    hemostasisStrategies: [
      'Anestezi indüksiyonunda, entübasyonda ve idame sırasında göz içi basıncını (GİB) artırabilecek her türlü manevranın mutlak engellenmesi',
      'Yırtık skleral kenarların cerrah tarafından hızla naylon dikişlerle kapatılarak göz anatomik bütünlüğünün sağlanması',
      'İntraoperatif kan basıncının normotansif sınırda tutulması (SKB < 120-130 mmHg)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Modifiye Hızlı Ardışık İndüksiyon (Modified RSI) ile Endotrakeal Genel Anestezi (GETA) + Yüksek Doz Non-Depolarizan Nöromusküler Blokaj (Rokuronyum 0.9 - 1.2 mg/kg) + Pürüzsüz Ekstübasyon Protokolü — Açık kürede DÜNYA GENELİNDE MUTLAK ZORUNLU STANDARTTIR'
    ],
    alternative: [
      'KONTRENDİKASYON UYARISI: Rejyonel anestezi (Retrobulber, Peribulber veya Sub-Tenon Blokları) AÇIK KÜRE TRAVMASINDA KESİNLİKLE YASAKTIR! Retrobulber mesafeye enjekte edilecek 3-5 mL sıvı hacmi intraorbital basıncı fırlatarak göz içi dokularını (iris, lens, vitreus, retina) açık yaradan dışarı fışkırtır (ekstrüzyon felaketi) ve gözü anında kör eder!',
      'Topikal anestezi yalnızca çok küçük, kendiliğinden kapanmış (self-sealing) mikro-perforasyonlarda acil geçici muayene için kullanılabilir; onarım ameliyatında genel anestezi şarttır'
    ],
    rulesTitle: 'AÇIK KÜRE YARALANMALARINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'AÇIK KÜRE YARALANMALARINDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) AÇIK KÜREDE "SIFIR BASINÇ" DİSİPLİNİ, REJYONEL BLOK YASAĞI VE DOKU EKSTRÜZYONU ÖNLEMİ — Glob duvarı tam kat açıktır ve göz içi ile dış ortam arasında sıfır bariyer vardır. Maske ventilasyonu yapılırken maske ASLA göze temas etmemeli, yalnızca orbita kemik kenarlarına nazikçe oturtulmalıdır (indüksiyon tamamlanana kadar koruyucu göz kalkanı [eye shield] çıkarılmaz!). Rejyonel anestezi (retrobulber/peribulber blok) KESİNLİKLE KONTRENDİKEDİR; retrobulber enjeksiyon hacmi intraorbital basıncı artırarak vitreus, iris ve retinayı açık yaradan dışarı fışkırtır ve gözü anında kör eder! (2) "TOKLUK VE ASPİRASYON" RİSKİNE KARŞI MODİFİYE HIZLI ARDIŞIK İNDÜKSİYON (RSI) VE SÜKSİNİLKOLİN TARTIŞMASI — Açık küre travması acil bir durumdur ve hasta neredeyse daima "tok" kabul edilir. Ancak klasik krikoid bası (Sellick manevrası) hastada öğürme yaratırsa GİB\'i fırlatabilir; krikoid bası nazik uygulanmalıdır. Nöromusküler blokajda süksinilkolin ekstraoküler kasların tonik liflerini kasarak GİB\'i 8-10 mmHg yükselttiğinden, güncel altın standart yüksek doz Rokuronyum (0.9 - 1.2 mg/kg) ile hızlı entübasyondur (beklenmedik zor hava yolunda acil geri döndürme için Sugammadeks 16 mg/kg masada hazır tutulur). (3) PÜRÜZSÜZ ENTÜBASYON DİSİPLİNİ — İNTRAVENÖZ LİDOKAİN, DERİN ANELJEZİ VE SIFIR ÖKSÜRÜK — Entübasyon esnasında laringoskopi uyarısına bağlı hipertansiyon, öksürük ve farengeal refleksler açık kürede katastrofiktir. İndüksiyondan 90 saniye önce İV Lidokain (1.5 mg/kg), yeterli doz opioid (Fentanil 2-3 mcg/kg veya Remifentanil) ve hipnotik (Propofol 2-2.5 mg/kg) ile derin anestezi sağlanmalı; hasta ancak TOF 0/4 tam kas gevşemesi teyit edildikten sonra entübe edilmelidir. (4) PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE), SIFIR IKINMA VE AGRESİF ANTİEMETİK (PONV) DİSİPLİNİ — Cerrahi bittiğinde kornea ve sklera 10-0 naylon mikro-sütürlerle kapatılmış olsa bile yara hattı son derece kırılgandır. Ekstübasyonda tüpü ısırma, öksürme veya ameliyat sonrası kusma yeni atılan dikişleri anında patlatır, yara ayrışması (dehiscence) ve re-ekstrüzyon yaratır! Ekstübasyondan önce İV Lidokain (1.5 mg/kg) verilmeli, hasta öksürmeden uyanmalı; intraoperatif kombine antiemetik profilaksisi (İV Ondansetron + Deksametazon) eksiksiz uygulanmalıdır. (5) AZOT PROTOKSİT (N2O) YASAĞI VE EŞLİK EDEN KAFA TRAVMASI / İNTRAKRANİYAL HAVA (PNÖMOSEFALİ) ALARMI — Travmatik açık küre olgularında cerrahi aşamada ön veya arka kamaraya hava/gaz (SF6, C3F8) verilebilir; N2O bu gaz kabarcıklarını şişirerek GİB\'i hızla 50-70 mmHg üzerine fırlatır ve santral retinal arteri tıkar! Ayrıca travma yüksek enerjili künt darbe veya ateşli silah/şarapnel kaynaklıysa eşlik eden kafa tabanı kırığı ve pnömosefali riski vardır; N2O intrakraniyal havayı genişleterek tansiyon pnömosefali yaratabilir. Bu nedenle operasyonda AZOT PROTOKSİT KESİNLİKLE KONTRENDİKEDİR.',
    indispensableRules: [
      {
        number: 1,
        title: 'AÇIK KÜREDE "SIFIR BASINÇ" DİSİPLİNİ, REJYONEL BLOK YASAĞI VE DOKU EKSTRÜZYONU ÖNLEMİ',
        content: 'Glob duvarı tam kat açıktır ve göz içi ile dış ortam arasında sıfır bariyer vardır. Maske ventilasyonu yapılırken maske ASLA göze temas etmemeli, yalnızca orbita kemik kenarlarına nazikçe oturtulmalıdır (indüksiyon tamamlanana kadar koruyucu göz kalkanı [eye shield] çıkarılmaz!). Rejyonel anestezi (retrobulber/peribulber blok) KESİNLİKLE KONTRENDİKEDİR; retrobulber enjeksiyon hacmi intraorbital basıncı artırarak vitreus, iris ve retinayı açık yaradan dışarı fışkırtır ve gözü anında kör eder!'
      },
      {
        number: 2,
        title: '"TOKLUK VE ASPİRASYON" RİSKİNE KARŞI MODİFİYE HIZLI ARDIŞIK İNDÜKSİYON (RSI) VE SÜKSİNİLKOLİN TARTIŞMASI',
        content: 'Açık küre travması acil bir durumdur ve hasta neredeyse daima "tok" kabul edilir. Ancak klasik krikoid bası (Sellick manevrası) hastada öğürme yaratırsa GİB\'i fırlatabilir; krikoid bası nazik uygulanmalıdır. Nöromusküler blokajda süksinilkolin ekstraoküler kasların tonik liflerini kasarak GİB\'i 8-10 mmHg yükselttiğinden, güncel altın standart yüksek doz Rokuronyum (0.9 - 1.2 mg/kg) ile hızlı entübasyondur (beklenmedik zor hava yolunda acil geri döndürme için Sugammadeks 16 mg/kg masada hazır tutulur).'
      },
      {
        number: 3,
        title: 'PÜRÜZSÜZ ENTÜBASYON DİSİPLİNİ — İNTRAVENÖZ LİDOKAİN, DERİN ANELJEZİ VE SIFIR ÖKSÜRÜK',
        content: 'Entübasyon esnasında laringoskopi uyarısına bağlı hipertansiyon, öksürük ve farengeal refleksler açık kürede katastrofiktir. İndüksiyondan 90 saniye önce İV Lidokain (1.5 mg/kg), yeterli doz opioid (Fentanil 2-3 mcg/kg veya Remifentanil) ve hipnotik (Propofol 2-2.5 mg/kg) ile derin anestezi sağlanmalı; hasta ancak TOF 0/4 tam kas gevşemesi teyit edildikten sonra entübe edilmelidir.'
      },
      {
        number: 4,
        title: 'PÜRÜZSÜZ UYANMA (SMOOTH EMERGENCE), SIFIR IKINMA VE AGRESİF ANTİEMETİK (PONV) DİSİPLİNİ',
        content: 'Cerrahi bittiğinde kornea ve sklera 10-0 naylon mikro-sütürlerle kapatılmış olsa bile yara hattı son derece kırılgandır. Ekstübasyonda tüpü ısırma, öksürme veya ameliyat sonrası kusma yeni atılan dikişleri anında patlatır, yara ayrışması (dehiscence) ve re-ekstrüzyon yaratır! Ekstübasyondan önce İV Lidokain (1.5 mg/kg) verilmeli, hasta öksürmeden uyanmalı; intraoperatif kombine antiemetik profilaksisi (İV Ondansetron + Deksametazon) eksiksiz uygulanmalıdır.'
      },
      {
        number: 5,
        title: 'AZOT PROTOKSİT (N2O) YASAĞI VE EŞLİK EDEN KAFA TRAVMASI / İNTRAKRANİYAL HAVA (PNÖMOSEFALİ) ALARMI',
        content: 'Travmatik açık küre olgularında cerrahi aşamada ön veya arka kamaraya hava/gaz (SF6, C3F8) verilebilir; N2O bu gaz kabarcıklarını şişirerek GİB\'i hızla 50-70 mmHg üzerine fırlatır ve santral retinal arteri tıkar! Ayrıca travma yüksek enerjili künt darbe veya ateşli silah/şarapnel kaynaklıysa eşlik eden kafa tabanı kırığı ve pnömosefali riski vardır; N2O intrakraniyal havayı genişleterek tansiyon pnömosefali yaratabilir. Bu nedenle operasyonda AZOT PROTOKSİT KESİNLİKLE KONTRENDİKEDİR.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküler Travma Konsültasyonu: BETTS sınıflaması (rüptür vs laserasyon, zon 1-3), görme keskinliği (Işık hissi [LP] varlığı/yokluğu - en önemli prognostik faktör), rölatif afferent pupil defekti (RAPD), Seidel testi (aköz kaçağı), prolabe üvea dokusu ve hifema düzeyi.',
      'Radyoloji Konsültasyonu: Yüksek çözünürlüklü İnce Kesit Kontrastsız Orbita ve Kafa BT (Manyetik rezonans [MRG] İOFB şüphesinde KESİNLİKLE KONTRENDİKEDİR! Metalik yabancı cisim manyetik alanda hareket ederek gözü parçalayabilir).',
      'Beyin Cerrahisi ve KBB / Çene Cerrahisi: Eşlik eden kafa travması, frontal kemik kırığı, BOS fistülü veya maksillofasiyal travma varlığında kombine değerlendirme.',
      'Anestezi Acil Hazırlığı: Açlık süresi (tok mide), aspirasyon riski ve acil hava yolu algoritması.'
    ],
    historyAndPhysical: [
      'Travmanın Oluş Mekanizması: Künt darbe (yumruk, top, trafik kazası) mi, delici alet (bıçak, tel, cam) mi, yoksa yüksek hızlı metal çapak/patlama mı (metal-on-metal çekiç darbesi intraoküler yabancı cisim açısından patognomoniktir).',
      'Son Yemek / Sıvı Alım Saati: Acil travma hastalarında aspirasyon riskini belirlemek için açlık süresi kaydedilir.',
      'Tetanoz Bağışıklık Durumu: Kirli veya açık yaralanmalarda tetanoz profilaksisi (Tetanoz aşısı ve Tetanoz immünglobulini) derhal planlanır.',
      'Sistemik İlaçlar ve Allerjiler: Özellikle antibiyotik ve anestezi ilaç alerjileri.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları.',
      'Kan Grubu ve Bekletmesiz Cross-Match / T&S (Gereğinde çoklu travma için).',
      'Kontrastsız Orbita ve Kafa BT (Yabancı cisim ve kemik kırığı tespiti).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve ani bradikardi takibi), SpO2, EtCO2 ve Vücut Sıcaklığı.',
      'Sürekli İnvaziv veya Non-İnvaziv Kan Basıncı: Laringoskopi ve cerrahi eksplorasyonda ani hipertansif atakların (GİB artışı) engellenmesi (hedef MAP 70-85 mmHg, SKB < 120-130 mmHg).',
      'Nöromusküler İleti Monitörizasyonu (TOF): Açık küre kapatılana kadar hastanın en ufak kas seğirmesi veya solunuma direnç göstermemesi için TOF 0/4 (tam paralizi) sürdürülmelidir.',
      'EtCO2 Kontrolü: Normokapni (EtCO2 35-38 mmHg) korunmalıdır; hipoventilasyon ve hiperkapni koroid damarlarını genişleterek GİB\'i artırır ve doku ekstrüzyonunu tetikler.'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz damar yolu (16-18G)',
      'Acil Nöromusküler Blokajı Geri Döndürme Kiti: Sugammadeks (16 mg/kg acil entübe edilemeyen senaryo için masada hazır)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg ampul)',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol veya Labetalol'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Donüt ile Hareketsiz ve Hafif Yükseltilmiş',
    patientPositionDetails: [
      'Hasta ameliyat masasına sırtüstü yatırılır; baş mikroskobun optik eksenine paralel sabitlenir.',
      'Baş-boyun venöz basıncını ve koroidal venöz dolgunluğu azaltmak için masaya 15 derece Reverse Trendelenburg eğimi verilir.',
      'Cerrahi örtüler yerleştirilirken asla göze bası uygulanmaz; koruyucu metal/plastik göz kalkanı cerrah cerrahiye başlayana dek yerinde tutulur.'
    ],
    anesthesiaManagement: [
      'Preoksijenizasyon:',
      '  - %100 O2 ile 3-5 dakika nazik spontan solunumla preoksijenizasyon yapılır; maske yüze bastırılmaz, göze temas ettirilmez.',
      'İndüksiyon Protokolü (Modifiye RSI):',
      '  - İV Lidokain (1.5 mg/kg): İndüksiyondan 90 saniye önce verilir (öksürük refleksini ve laringoskopi kardiyovasküler yanıtını baskılar).',
      '  - İV Fentanil (2-3 mcg/kg) veya Remifentanil infüzyonu.',
      '  - İV Propofol (2.0 - 2.5 mg/kg): Hipnotik etki için titre edilir.',
      '  - İV Rokuronyum (0.9 - 1.2 mg/kg): Süksinilkolinin GİB artırıcı etkisinden kaçınmak için yüksek doz rokuronyum uygulanır; 45-60 saniyede tam nöromusküler blokaj sağlar.',
      'Entübasyon:',
      '  - Videolaringoskop eşliğinde, hastanın farengeal refleks göstermediği ve TOF 0/4 olduğu teyit edilerek pürüzsüz ve nazik entübasyon yapılır.',
      'İdame:',
      '  - Sevofluran/İzofluran veya TIVA (Propofol + Remifentanil).',
      '  - AZOT PROTOKSİT (N2O) KESİNLİKLE KULLANILMAZ.',
      '  - TOF 0/4 seviyesinde idame kas gevşetici tekrarlanır.'
    ],
    airwayManagement: [
      'Spiral telli (reinforced) endotrakeal tüp baş hareketlerine ve cerrahın el basısına karşı güvenlidir.',
      'Tüp ağız köşesine sağlam flasterlenir; trakeal manşon (kaf) basıncı 20-25 cmH2O seviyesinde kontrol edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma ve Göz Kalkanının Cerrah Tarafından Nazikçe Kaldırılması.',
      '2. Göz Kapaklarına Bası Yapmayan Özel Askı Dikişleri veya Askılı Blefaroste Yerleştirilmesi (Göz küresine sıfır baskı!).',
      '3. Cerrahi Alanın Povidon İyot (%5) ile Nazik Antisepsisi.',
      '4. 360 Derece Konjonktival Peritomi ve 4 Rektus Kasının Askıya Alınması (Gizli arka skleral rüptür eksplorasyonu — Okülokardiyak refleks kontrolü!).',
      '5. Kornea Anatomik İşaret Noktalarının ve Limbusun 10-0 Naylon Sütürlerle Karşı Karşıya Getirilmesi.',
      '6. Korneal Laserasyonun Su Geçirmez Kapatılması (Dikişler gerginliği eşit dağıtacak şekilde atılır).',
      '7. Prolabe Üveal Dokunun Değerlendirilmesi: Canlı iris dokusunun viskoelastik madde ile ön kamaraya repozisyonu; nekrotik/enfekte dokuların dikkatle eksize edilmesi.',
      '8. Skleral Yırtığın Arkaya Doğru 8-0 Naylon Sütürlerle Kapatılması (Hand-over-hand tekniği).',
      '9. Ön Kamara Rekonstrüksiyonu, Parasentezden BSS Verilerek Glob Tonusunun Sağlanması ve Kaçak Kontrolü (Seidel testi).',
      '10. İntrakameral ve İntravitreal Profilaktik Geniş Spektrumlu Antibiyotik Enjeksiyonu (Vankomisin + Seftazidim).',
      '11. Konjonktivanın Kapatılması, Antibiyotikli Pomad ve Basısız Koruyucu Sert Plastik/Metal Kalkan (Rigid Eye Shield).'
    ],
    emergenceNotes: [
      'Ekstübasyon Cerrahinin En Tehlikeli Fazıdır: Hasta tüpü ısırmamalı, öksürmemeli, ıkınmamalı ve öğürmemelidir!',
      'Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanır.',
      'Kombine İV Ondansetron (4-8 mg) + Deksametazon (4 mg) ile postoperatif bulantı ve kusma mutlak engellenmelidir.',
      'Derin plan ekstübasyon (hava yolu refleksleri henüz uyanmadan) veya laringeal maskeye geçiş (LMA-exchange) öksürüğü sıfırlamak için tercih edilebilir; ancak aspirasyon riski olan tam tok hastalarda hasta tam uyanık, sözel komutlara yanıt verirken ve nazikçe aspire edilerek ekstübe edilmelidir.',
      'Ameliyat edilen göze baskılı pansuman KESİNLİKLE YAPILMAZ; steril sert plastik veya delikli alüminyum kalkan (Fox eye shield) gevşekçe flasterlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Açık küre travması onarımı sonrası orta-şiddetli oküler ağrı görülebilir.',
      'İntravenöz Parasetamol (1000 mg) her 6 saatte bir bazal analjezik olarak uygulanır.',
      'Şiddetli ağrıda İV Tramadol (50 mg) veya titre edilmiş Fentanil.',
      'Trombosit fonksiyonlarını bozan ve intraoküler hifema/koroid kanama riskini artıran agresif NSAİİ ve aspirinden erken dönemde kesinlikle kaçınılmalıdır.',
      'Göz kalkanı hastanın gözü ovuşturmasını engellemek için postoperatif günlerce sürekli takılı kalmalıdır.'
    ],
    prospectRecommendations: [
      'PROSPECT Oküler Travma ve Açık Küre Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi;',
      'Postoperatif dönemde şiddetli ağrının ve buna bağlı otonomik hipertansiyonun önlenmesi;',
      'Bulantı ve kusmanın (PONV) agresif şekilde baskılanarak intratorasik ve oküler venöz basınç artışının engellenmesi esastır.'
    ],
    erasRecommendations: [
      'ERAS ve ASOT Travma Protokolleri:',
      'Yatak İstirahati ve Başın 30 Derece Yükseltilmesi: İntraoküler venöz basıncı düşürür, hifemanın ön kamara tabanına çökmesini sağlar.',
      'Val-salva Önlemleri: Öksürük kesiciler ve ıkınmayı önlemek için gaita yumuşatıcı (laksatif) başlanması zorunludur.',
      'Sistemik Geniş Spektrumlu Antibiyotik: Post-travmatik endoftalmiyi engellemek için İV Siprofloksasin / Vankomisin / Seftazidim protokolü uygulanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Ocular Trauma - Repair of Ruptured or Lacerated Globe (Open Globe Injury), pp. 842-848.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Guidelines for Anesthesia in Emergency Open Globe Surgery.',
    prospectReference: 'PROSPECT Guidelines: Pain and PONV Management in Emergency Ophthalmic Trauma.',
    otherReferences: [
      'Birmingham Eye Trauma Terminology System (BETTS) & American Society of Ophthalmic Trauma (ASOT): Classification and Management of Open Globe Injuries.',
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Open Globe Injuries and Management of Ocular Trauma.',
      'Royal College of Anaesthetists (RCoA): Ophthalmic Anesthesia Safety in Open Eye and Full Stomach Emergencies.',
      'Türk Oftalmoloji Derneği (TOD) Oküler Travma ve Mediko-Legal Oftalmoloji Birimi: Açık Küre Yaralanmaları Tedavi ve Anestezi Rehberi.'
    ]
  }
};
