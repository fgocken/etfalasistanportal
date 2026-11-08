import { ProcedureDefinition } from '../../types/procedures';

/**
 * Rijit ve Fleksibl Bronkoskopi: Tanısal ve Girişimsel Hava Yolu Cerrahisi (EBUS-TBNA, Yabancı Cisim Çıkarılması, Tümör Debulking ve Trakeobronşiyal Stent)
 * (Bronchoscopy—Rigid and Flexible: Interventional Airway Procedures, EBUS, Foreign Body Extraction, Laser/Cryo Debulking and Stenting)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Larynx and Trachea: Bronchoscopy - Rigid and Flexible, pp. 786-792),
 * American Thoracic Society (ATS) & European Respiratory Society (ERS) Interventional Pulmonology Guidelines,
 * British Thoracic Society (BTS) Guidelines for Advanced Diagnostic and Therapeutic Flexible and Rigid Bronchoscopy,
 * Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS),
 * Türk Göğüs Cerrahisi Derneği (TGCD) ve TÜSAD Girişimsel Bronkoloji Çalışma Grubu Protokolleri referans alınarak yapılandırılmıştır.
 */
export const bronchoscopy: ProcedureDefinition = {
  id: 'bronchoscopy-rigid-and-flexible',
  name: 'Rijit ve Fleksibl Bronkoskopi: Girişimsel Hava Yolu Cerrahisi ve EBUS',
  shortCode: 'GOGUS-BRONKOSKOPI',
  specialty: 'gogus_cerrahisi',
  specialtyName: 'Göğüs Cerrahisi',
  categoryTag: 'Girişimsel Bronkoskopi & Hava Yolu Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Trakeobronşiyal ağacın (trakea, karina, sağ/sol ana bronşlar, lober ve segmental bronşlar) lümenini tıkayan, daraltan veya kanayan patolojilerin doğrudan görselleştirilmesi, biyopsi alınması, trakeal stent yerleştirilmesi veya acil yabancı cisimlerin çıkarılması amacıyla rijit metal bronkoskop (Storz, Dumon) ya da yüksek çözünürlüklü fleksibl/videobronkoskop ve EBUS (Endobronşiyal Ultrasonografi) cihazları kullanılarak icra edilen kritik hava yolu cerrahisidir. İki ana modalite içerir: (1) Rijit Bronkoskopi: Genel anestezi altında ağızdan trakeaya sokulan içi boş metal borudur; anestezi ventilatörü için yan giriş portu (side-arm) bulunur. Masif hemoptizide kanı hızla aspire edip hava yolunu güvenceye almak, aspire edilmiş organik/inorganik yabancı cisimleri optik forsepslerle yakalamak, santral hava yolu tümörlerini mekanik/lazer/kriyo ile rezeke etmek ve silikon (Dumon) ya da metalik hava yolu stentleri yerleştirmek için altın standarttır; (2) Fleksibl Bronkoskopi ve EBUS-TBNA: İnce bükülebilir fiberoptik/video skop ile endotrakeal tüp, LMA veya rijit bronkoskop içinden segmental dallara kadar ilerlenir; bronkoalveoler lavaj (BAL), fırçalama, endobronşiyal/transbronşiyal biyopsi ve mediastinal/hiler lenf nodu evrelemesi (EBUS iğne aspirasyonu) yapılır.',
  indications: [
    'Masif ve Yaşamı Tehdit Eden Hemoptizi: Kanama odağının tespiti, bronş lavajı, selektif balon tamponadı veya bronşiyal bloker yerleştirilmesi',
    'Trakeobronşiyal Yabancı Cisim Aspirasyonu: Pediatrik veya erişkin hastalarda aspirasyon (fındık, fıstık, kemik, iğne, diş, protez)',
    'Santral Hava Yolu Obstrüksiyonu (Malign / Benign): Akciğer kanseri veya metastazların trakeayı tıkaması; mekanik debulking, kriyoterapi, APC (argon plazma) veya lazer rezeksiyonu',
    'Trakeobronşiyal Stent İmplantasyonu: Malign darlık veya post-entübasyon trakeal darlıklarında Dumon silikon veya kendiliğinden genişleyen metalik (SEMS) stent yerleştirilmesi',
    'Akciğer Kanseri Tanı ve Mediastinal Evrelemesi: EBUS-TBNA (hiler ve mediastinal lenf nodu biyopsileri)',
    'Post-Entübasyon veya Post-Trakeostomi Trakeal Darlıkları ve Trakeomalazi Değerlendirmesi',
    'Bronkoplevral Fistül (BPF) Teşhis ve Endobronşiyal Valf / Tıkaç Uygulaması'
  ],
  averageDuration: '30 - 90 dakika (Tanısal EBUS-TBNA: 30-45 dk; Yabancı cisim çıkarılması: 30-60 dk; Kompleks rijit bronkoskopi, tümör rezeksiyonu ve stent: 60-90 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 20 - 150 mL (Tanısal işlemlerde < 20 mL; ancak trakeobronşiyal tümör rezeksiyonunda veya masif hemoptizi olgularında hava yoluna kanama miktarı 100 - 500 mL seviyesine ulaşabilir ve asfiksi yaratabilir)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk / Ancak Asfiksi Yaratan Katastrofik Masif Hava Yolu Kanaması ve Boğulma Tehlikesi',
    crossMatchRequirement: 'Kan Grubu ve T&S (Masif hemoptizi ve geniş tümör rezeksiyonu olgularında 2 Ünite ES Cross-Match hazır bulundurulmalıdır)',
    transfusionProbability: '< %1 - 5 (Masif hemoptizide transfüzyon gerekebilir)',
    criticalBleedingSources: [
      'Bronşiyal Arter ve Pulmoner Arter Dalları: Tümör tabanından veya biyopsi sahasından masif arteriyel kanama',
      'Endobronşiyal Neovaskülarizasyon Pleksusları: Tümör rezeksiyonunda friabl damarlar',
      'Yabancı Cisim Granülasyon Dokusu Kanamaları'
    ],
    hemostasisStrategies: [
      'Rijit bronkoskop ucuyla aktif kanayan bronş lümenine doğrudan mekanik kompresyon / tamponad',
      'Buzlu Serum Fizyolojik (%0.9 NaCl, 4°C) Lavajı ve Topikal Adrenalinli (1:20.000) solüsyon instilasyonu',
      'Endobronşiyal Bloker (Arndt veya Fogarty kateteri) ile kanayan akciğer lobunun anında izole edilmesi ve sağlam akciğerin korunması',
      'Argon Plazma Koagülasyonu (APC), Kriyoterapi veya Elektrokoter ile termal hemostaz'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genel Anestezi + TIVA (Propofol + Remifentanil) + Tam Nöromusküler Blokaj (TOF 0/4) + Rijit Bronkoskop Yan Girişinden Ventilatör Bağlantısı (Ventilasyonlu Rijit Bronkoskopi) veya Laringeal Maske (LMA) İçinden Fleksibl/EBUS — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Manuel veya Yüksek Frekanslı Jet Ventilasyon (HFJV): Rijit bronkoskop arkası sürekli açık çalışılacaksa uygulanır; ancak barotravma ve hava hapsi (air-trapping) riskine karşı çok dikkatli olunmalıdır',
      'Topikal Havayolu Anestezisi (Lidokain nebulizasyon/sprey) + Monitörize Anestezi Bakımı (MAC / Bilinçli Sedasyon): Yalnızca stabil, acil olmayan basit tanısal fleksibl bronkoskopilerde uygulanır; rijit girişimlerde kesinlikle genel anestezi şarttır'
    ],
    rulesTitle: 'BRONKOSKOPİDE (RİJİT VE FLEKSİBL) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'BRONKOSKOPİDE (RİJİT VE FLEKSİBL) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) RİJİT BRONKOSKOPİDE HAVA KAÇAĞI, JET VENTİLASYON VE TANSİYON PNÖMOTORAKS (BAROTRAVMA) ALARMI — Rijit bronkoskopun arkası cerrahi aletlerin sokulması için açık bırakıldığında ventilatör devresi çöker ve masif hava kaçağı olur; cerrah alet çıkarırken kapağı kapamalıdır. Eğer Jet Ventilasyon (HFJV veya manuel jet) kullanılıyorsa, ekspiratuar gazın dışarı kaçabileceği tam bir çıkış yolu (egzoz) ŞARTTIR! Trakeada büyük tümör veya yabancı cisim "çek-valf" mekanizmasıyla gaz çıkışını engellerse saniyeler içinde akciğer aşırı şişer, alveoller patlar ve katastrofik TANSİYON PNÖMOTORAKS ile kardiyak arrest gelişir! Göğüs kafesi ekspansiyonu ve ekspiratuar hava çıkışı kesintisiz izlenmelidir. (2) MASİF HAVA YOLU KANAMASI (HEMOPTİZİ) VE "SAĞLAM AKCİĞERİ KORUMA" DİSİPLİNİ — Endobronşiyal tümör debulking, biyopsi veya vasküler yabancı cisim çıkarılırken pulmoner veya bronşiyal damar yırtılmasıyla dakikada yüzlerce mililitre kan hava yoluna boşalabilir. Hastanın kendi kanında boğulmasını (asfiksi) önlemek için kanama tarafı derhal rijit bronkoskop veya selektif ana bronş entübasyonu ile izole edilmeli; sağlam akciğere kan sızması engellenmelidir (Trendelenburg/lateral pozisyon, buzlu serum fizyolojik, topikal adrenalinli pamuk, Arndt bronşiyal bloker ve gerekirse acil torakotomi hazırlığı!). (3) KARİNA VE TRAKEOBRONŞİYAL UYARIMDA SIFIR ÖKSÜRÜK VE DERİN NÖROMUSKÜLER BLOKAJ (TOF 0/4) — Karina ve ana bronşlar aşırı yoğun vagal duyusal reseptörlerle kaplıdır. Rijit metal tüpün karinaya temas etmesi veya biyopsi anında hastanın aniden öksürmesi, ıkınması veya nefes almaya çalışması rijit metal bronkoskopun trakea veya ana bronşu yırtmasına (trakeal laserasyon/perforasyon) ve masif mediastinite yol açar! Operasyon boyunca TIVA ve TOF 0/4 tam kas gevşemesi sürdürülmeli; karinal temas esnasında İV Lidokain veya lokal lidokain spreyi ile refleksler körlenmelidir. (4) VOKAL KORD TRAVMASI, DİŞ KIRIKLARI VE SÜPİNO-OKSİPİTAL AKS GÜVENLİĞİ — Rijit bronkoskopun ağızdan larinkse ilerletilmesi esnasında üst kesici dişler dayanak noktası yapılırsa dişler anında kırılabilir veya avülse olabilir (üst diş koruyucu mutlaka yerleştirilmelidir!). Metal boru vokal kordların arasından geçerken kordları ezmemeli, posterior komissürden 90 derece rotasyonla nazikçe kaydırılmalıdır. İntraoperatif laringeal ödemi ve postoperatif stridoru önlemek için İV Deksametazon (8-10 mg) uygulanmalıdır. (5) TRAKEOMALAZİ, STENT DİSLOKASYONU VE POSTOPERATİF HAVA YOLU ÇÖKMESİ (STRİDOR) ALARMI — Büyük lümen tıkayıcı tümörler çıkarıldıktan veya trakeal/bronşiyal stent (Dumon silikon veya metal stent) takıldıktan sonra kıkırdak desteğini yitirmiş trakea ekspiryumda aniden kollabe olabilir (trakeomalazi) ya da stent öksürükle yerinden oynayıp lümeni tam tıkayabilir! Ekstübasyon ameliyathanede tam uyanık, solunum eforu güçlü, farengeal sekresyonlar tamamen aspire edilmiş halde yapılmalı; hastada postoperatif stridor veya dispne gelişirse acil rijit bronkoskopi veya trakeotomi kiti hasta başında hazır tutulmalıdır.',
    indispensableRules: [
      {
        number: 1,
        title: 'RİJİT BRONKOSKOPİDE HAVA KAÇAĞI, JET VENTİLASYON VE TANSİYON PNÖMOTORAKS (BAROTRAVMA) ALARMI',
        content: 'Rijit bronkoskopun arkası cerrahi aletlerin sokulması için açık bırakıldığında ventilatör devresi çöker ve masif hava kaçağı olur; cerrah alet çıkarırken kapağı kapamalıdır. Eğer Jet Ventilasyon (HFJV veya manuel jet) kullanılıyorsa, ekspiratuar gazın dışarı kaçabileceği tam bir çıkış yolu (egzoz) ŞARTTIR! Trakeada büyük tümör veya yabancı cisim "çek-valf" mekanizmasıyla gaz çıkışını engellerse saniyeler içinde akciğer aşırı şişer, alveoller patlar ve katastrofik TANSİYON PNÖMOTORAKS ile kardiyak arrest gelişir! Göğüs kafesi ekspansiyonu ve ekspiratuar hava çıkışı kesintisiz izlenmelidir.'
      },
      {
        number: 2,
        title: 'MASİF HAVA YOLU KANAMASI (HEMOPTİZİ) VE "SAĞLAM AKCİĞERİ KORUMA" DİSİPLİNİ',
        content: 'Endobronşiyal tümör debulking, biyopsi veya vasküler yabancı cisim çıkarılırken pulmoner veya bronşiyal damar yırtılmasıyla dakikada yüzlerce mililitre kan hava yoluna boşalabilir. Hastanın kendi kanında boğulmasını (asfiksi) önlemek için kanama tarafı derhal rijit bronkoskop veya selektif ana bronş entübasyonu ile izole edilmeli; sağlam akciğere kan sızması engellenmelidir (Trendelenburg/lateral pozisyon, buzlu serum fizyolojik, topikal adrenalinli pamuk, Arndt bronşiyal bloker ve gerekirse acil torakotomi hazırlığı!).'
      },
      {
        number: 3,
        title: 'KARİNA VE TRAKEOBRONŞİYAL UYARIMDA SIFIR ÖKSÜRÜK VE DERİN NÖROMUSKÜLER BLOKAJ (TOF 0/4)',
        content: 'Karina ve ana bronşlar aşırı yoğun vagal duyusal reseptörlerle kaplıdır. Rijit metal tüpün karinaya temas etmesi veya biyopsi anında hastanın aniden öksürmesi, ıkınması veya nefes almaya çalışması rijit metal bronkoskopun trakea veya ana bronşu yırtmasına (trakeal laserasyon/perforasyon) ve masif mediastinite yol açar! Operasyon boyunca TIVA ve TOF 0/4 tam kas gevşemesi sürdürülmeli; karinal temas esnasında İV Lidokain veya lokal lidokain spreyi ile refleksler körlenmelidir.'
      },
      {
        number: 4,
        title: 'VOKAL KORD TRAVMASI, DİŞ KIRIKLARI VE SÜPİNO-OKSİPİTAL AKS GÜVENLİĞİ',
        content: 'Rijit bronkoskopun ağızdan larinkse ilerletilmesi esnasında üst kesici dişler dayanak noktası yapılırsa dişler anında kırılabilir veya avülse olabilir (üst diş koruyucu mutlaka yerleştirilmelidir!). Metal boru vokal kordların arasından geçerken kordları ezmemeli, posterior komissürden 90 derece rotasyonla nazikçe kaydırılmalıdır. İntraoperatif laringeal ödemi ve postoperatif stridoru önlemek için İV Deksametazon (8-10 mg) uygulanmalıdır.'
      },
      {
        number: 5,
        title: 'TRAKEOMALAZİ, STENT DİSLOKASYONU VE POSTOPERATİF HAVA YOLU ÇÖKMESİ (STRİDOR) ALARMI',
        content: 'Büyük lümen tıkayıcı tümörler çıkarıldıktan veya trakeal/bronşiyal stent (Dumon silikon veya metal stent) takıldıktan sonra kıkırdak desteğini yitirmiş trakea ekspiryumda aniden kollabe olabilir (trakeomalazi) ya da stent öksürükle yerinden oynayıp lümeni tam tıkayabilir! Ekstübasyon ameliyathanede tam uyanık, solunum eforu güçlü, farengeal sekresyonlar tamamen aspire edilmiş halde yapılmalı; hastada postoperatif stridor veya dispne gelişirse acil rijit bronkoskopi veya trakeotomi kiti hasta başında hazır tutulmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göğüs Cerrahisi / Girişimsel Pulmonoloji Konsültasyonu: Lezyonun trakea/bronş içindeki lokalizasyonu, lümen tıkanıklık yüzdesi, stridor varlığı, EBUS planı ve stent gereksinimi.',
      'Toraks ve Boyun İnce Kesit Kontrastlı BT / Sanal Bronkoskopi: Trakeobronşiyal lümen çapı, vasküler yapılarla (pulmoner arter, aorta) komşuluk, mediastinal lenfadenopati ve invazyon derinliği.',
      'Kardiyoloji Konsültasyonu: Ağır KOAH, hipoksi ve koroner arter hastalığı olan hastalarda kardiyak rezervin ve aritmilerin optimizasyonu.',
      'Anestezi Hazırlığı: Kritik hava yolu obstrüksiyonu riski, uyanık entübasyon/rijit bronkoskopi hazırlığı ve aspirasyon güvenliği.'
    ],
    historyAndPhysical: [
      'Stridor ve Dinlenme Dispnesi: İnspiratuar veya bifazik stridor trakea lümeninin kritik derecede (< 5-6 mm) daraldığını gösterir; kas gevşetici verildiğinde tam obstrüksiyon gelişebilir!',
      'Hemoptizi Miktarı ve Süresi: Masif kanama (> 200 mL/24 saat) öyküsü olan hastalarda hava yolu sel baskını hazırlığı.',
      'Antikoagülan / Antiagregan İlaç Kullanımı: Biyopsi ve stent öncesi hemostatik panel kontrolü.',
      'Diş Muayenesi: Üst kesici dişlerin stabilitesi (rijit skop basısına karşı diş koruyucu planı).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Arteriyel Kan Gazı (AKG): Bazal PaO2, PaCO2 ve pH düzeyi (karbondioksit retansiyonu takibi).',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Toraks ve Mediasten BT.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Karinal uyarım kaynaklı bradikardi ve taşiaritmi analizi), SpO2, EtCO2 ve Vücut Sıcaklığı.',
      'İnvaziv Arter Basıncı İzlemi (Radial Arter Kanülasyonu): Masif hemoptizi, ciddi KOAH veya stent planlanan rijit bronkoskopilerde anlık kan gazı ve tansiyon takibi için önerilir.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Rijit metal borunun trakeayı delmemesi için TOF 0/4 tam blokaj sürdürülür.',
      'Ventilatör Tepe Basınçları ve Akım Eğrileri: Bronkoskop lümeni tıkadığında ani tepe basıncı artışları ve hava hapsi izlenir.'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli periferik intravenöz damar yolu (16-18G)',
      'Acil Bradikardi Kiti: İntravenöz Atropin (0.5 - 1.0 mg) masada hazır',
      'Acil Nöromusküler Blokajı Geri Döndürme Kiti: Sugammadeks (4 - 16 mg/kg acil uyanma senaryosu için)',
      'Acil Hava Yolu Kiti: Endobronşiyal bloker (Arndt), selektif çift lümenli tüp (DLT) ve krikotiroidotomi / trakeotomi seti'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Ekstansiyonda ve Boyun Düz ("Jackson Boyun Pozisyonu")',
    patientPositionDetails: [
      'Hasta ameliyat masasına sırtüstü yatırılır; ağız, farinks ve trakeayı tek bir düz hatta getirmek için baş atlanto-oksipital eklemden hafif ekstansiyona alınır.',
      'Üst diş kavisinin üzerine özel silikon diş koruyucu (dental guard) yerleştirilir.',
      'Bronkoskop girişi esnasında gözler pomadlanıp kapatılır.',
      'Cerrah hastanın başucunda durur; anestezi cihazı ve monitörler hastanın göğüs hizasına yerleştirilir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - %100 O2 ile 3-5 dakika preoksijenizasyon.',
      '  - İV Lidokain (1.5 mg/kg): Trakeobronşiyal ve karinal refleksleri baskılamak için indüksiyondan önce uygulanır.',
      '  - TIVA İndüksiyonu: Propofol (2.0 - 2.5 mg/kg) + Remifentanil infüzyonu (0.2 - 0.5 mcg/kg/dk).',
      '  - Kas Gevşetici: Kritik hava yolu obstrüksiyonu yoksa Rokuronyum (0.6 - 1.0 mg/kg); kritik darlıkta cerrah rijit skopu sokana dek spontan solunum korunabilir veya uyanık entübasyon yapılır.',
      'Ventilasyon Yöntemleri:',
      '  - Ventilasyonlu Rijit Bronkoskopi: Rijit skopun yan portuna anestezi devresi bağlanır; cerrah alet sokmadığı anlarda optik kapak kapatılarak aralıklı pozitif basınçlı ventilasyon (IPPV) uygulanır.',
      '  - Manuel / Yüksek Frekanslı Jet Ventilasyon (HFJV): Açık sistem çalışırken 1.5 - 2.5 bar basınçla jet uygulanır; egzoz çıkışı açık olmalıdır.',
      'İdame:',
      '  - TIVA (Propofol + Remifentanil): Hava kaçaklarında volatil gaz salınımı olmaması ve derin anestezinin korunması için en güvenli yöntemdir.',
      '  - TOF 0/4 tam paralizi korunur.'
    ],
    airwayManagement: [
      'Rijit skop çıkarıldıktan sonra hasta entübe edilecekse tek lümenli kaflı tüp (ETT) ile hava yolu güvene alınır.',
      'EBUS veya fleksibl bronkoskopi LMA (4 veya 5 numara) üzerinden bronkoskopi adaptörü ile güvenle yürütülebilir.',
      'Cerrahi bitiminde trakea ve farenksteki kan ve sekresyonlar eksiksiz aspire edilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Preoksijenizasyon ve Üst Diş Koruyucunun Takılması.',
      '2. TIVA İndüksiyonu ve Tam Nöromusküler Blokajın Teyidi (TOF 0/4).',
      '3. Rijit Bronkoskopun Ağızdan Sokulması, Vokal Kordların 90 Derece Rotasyonla Geçilmesi.',
      '4. Anestezi Devresinin Rijit Skop Yan Portuna Bağlanması ve Ventilasyonun Başlatılması.',
      '5. Trakea, Karina ve Ana Bronşların İncelenmesi (Karinal temasta taşikardi/bradikardi kontrolü!).',
      '6. Yabancı Cisim Yakalanması veya Tümör Debulking / Kriyoterapi Aşaması (Sıfır hareket aşaması!).',
      '7. Aktif Kanama Durumunda Rijit Skop Ucuyla Tamponad ve Buzlu SF Lavajı.',
      '8. Gerekirse Trakeal/Bronşiyal Silikon (Dumon) veya Metal Stent Yerleştirilmesi ve Pozisyon Kontrolü.',
      '9. Fleksibl Bronkoskop ile Distal Lümenlerin ve Stent Açıklığının Teyidi.',
      '10. Rijit Bronkoskopun Çıkarılması, Dişlerin Kontrolü, Standart ETT/LMA ile Havayolu Güvencesi veya Ekstübasyon.'
    ],
    emergenceNotes: [
      'Ekstübasyon Öncesi Laringeal Ödem Profilaksisi: İntraoperatif İV Deksametazon (8-10 mg) uygulanmış olmalıdır.',
      'Sugammadeks (2 - 4 mg/kg) ile nöromusküler blokaj hızla geri döndürülür (TOF oranı > %90 teyit edilir).',
      'Trakeomalazi ve Stent Kontrolü: Stent takılan veya büyük tümörü çıkarılan hastalar ekspiratuar kollaps açısından uyanma anında yakından izlenir.',
      'Hasta ameliyathanede tam uyanık, solunum eforu güçlü, tidal volümü yeterli ve farengeal refleksleri tam geri dönmüş olarak ekstübe edilir.',
      'Ekstübasyon sonrası nemlendirilmiş O2 desteği verilir; postoperatif stridor veya dispneye karşı acil krikotiroidotomi/rijit set hazır tutulur.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Bronkoskopi sonrası ağrı genellikle hafif düzeydedir ve trakeal yanma hissi, boğaz ağrısı ve retrosternal sızı şeklindedir.',
      'Oral / İV Parasetamol (1000 mg) çoğu olguda tamamen yeterlidir.',
      'Şiddetli öksürük ve retrosternal ağrıda hafif opioid (Tramadol 50 mg) veya kodeinli öksürük baskılayıcılar verilebilir.',
      'Boğaz kuruluğu ve laringeal tahrişi gidermek için ılık buhar inhalasyonu uygulanır.'
    ],
    prospectRecommendations: [
      'PROSPECT Toraks ve Havayolu Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi;',
      'Postoperatif öksürüğün baskılanarak trakeobronşiyal mukozal kanamanın ve stent dislokasyonunun önlenmesi;',
      'Agresif PONV profilaksisi ile gastrik içeriğin hava yoluna regürjitasyonunun engellenmesi önerilir.'
    ],
    erasRecommendations: [
      'ERAS Göğüs Cerrahisi ve Girişimsel Pulmonoloji Protokolleri:',
      'Komplikasyonsuz tanısal işlemlerde 2-4 saatlik derlenme ve oral su alımı sonrası aynı gün taburcu.',
      'Stent veya rezeksiyon uygulanan hastalarda en az 1 gece hastane gözlemi.',
      'Postoperatif Hemoptizi ve Dispne Takibi: Balgamda hafif kan çizgileri normal kabul edilir; ancak taze kırmızı aktif kanama veya stridorda derhal hekime bildirilmelidir.',
      'Kontrol Akciğer Grafisi: İşlemden 2-4 saat sonra olası pnömotoraks, pnömomediasten veya atelektaziyi dışlamak için PA Akciğer Grafisi çekilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section V: Otolaryngology - Larynx and Trachea: Bronchoscopy (Rigid and Flexible), pp. 786-792.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Thoracic Society (BTS): Guidelines for Advanced Interventional Bronchoscopy and Day-Case Airway Surgery.',
    prospectReference: 'PROSPECT Guidelines: Perioperative Pain and Anesthetic Management in Interventional Pulmonology and Bronchoscopy.',
    otherReferences: [
      'American Thoracic Society (ATS) / European Respiratory Society (ERS): Consensus Statement on Interventional Bronchoscopy.',
      'Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS): Anesthetic Management of the Shared Airway in Bronchology.',
      'Türk Göğüs Cerrahisi Derneği (TGCD) ve TÜSAD: Girişimsel Bronkoskopi ve Trakeobronşiyal Stent Uygulama Rehberi.'
    ]
  }
};
