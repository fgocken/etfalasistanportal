import { ProcedureDefinition } from '../../types/procedures';

/**
 * Rijit Direkt Laringoskopi ve Mikrolaringocerrahi (MLS): Süspansiyon Laringoskopi, Vokal Kord Biyopsisi ve Lazer Eksizyonu
 * (Direct Laryngoscopy and Suspension Microlaryngeal Surgery [MLS] with Vocal Fold Biopsy / Laser Excision)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Larynx and Trachea: Direct Laryngoscopy and Suspension Microlaryngoscopy, pp. 780-786),
 * American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS) Clinical Practice Guidelines: Dysphonia and Laryngeal Procedures,
 * British Association of Otorhinolaryngologists - Head and Neck Surgeons (ENT UK),
 * Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS),
 * Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) Laringoloji Okulu Protokolleri referans alınarak hazırlanmıştır.
 */
export const laryngoscopy: ProcedureDefinition = {
  id: 'direct-laryngoscopy-and-microlaryngeal-surgery',
  name: 'Rijit Direkt Laringoskopi ve Mikrolaringocerrahi (MLS): Süspansiyon Laringoskopi ve Vokal Kord Cerrahisi',
  shortCode: 'KBB-LARİNGOSKOPİ',
  specialty: 'kbb',
  specialtyName: 'Kulak Burun Boğaz',
  categoryTag: 'Laringoloji & Baş-Boyun Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Genel anestezi altında rijit bir laringoskop (Kleinsasser, Lindholm, Dedo veya Ossoff laringoskopu) ağızdan ilerletilerek larinks, epiglottis, vokal kordlar (ses telleri), ön/arka komissür, subglottik alan, piriform sinüsler ve hipofarinksin doğrudan ve büyütülmüş optik mikroskop (400 mm odaklı) veya rijit endoskoplar altında incelenmesi, biyopsi alınması ve mikrocerrahi lezyon eksizyonu ameliyatıdır. Cerrahi basamaklar: (1) Dişleri korumak amacıyla silikon/plastik diş koruyucu (dental guard) yerleştirilir; (2) Rijit laringoskop yerleştirilip vokal kordlar görünür hale getirilir; (3) Laringoskop cerrahın göğsüne veya ameliyat masasına monte edilen mekanik askı aparatına (süspansiyon aparatı - Lewy / Boston gallows) kilitlenerek süspansiyon kurulur; (4) Mikroskop altında mikro-forseps, mikro-makas veya lazer (CO2 lazer, KTP lazer) ile ses teli polipleri, kistleri, nodülleri, papillomları veya tümöral lezyonları fonocerrahi prensipleriyle (derin dokuyu koruyarak) rezeke edilir; (5) Gereğinde ses teli felçlerinde vokal korda hyaluronik asit/yağ enjeksiyonu (enjeksiyon laringoplasti) yapılır.',
  indications: [
    'Kronik Disfoni (Ses Kısıklığı) ve Benign Ses Teli Lezyonları: Vokal kord polipleri, nodülleri, kistleri, Reinke ödemi, vokal granülom',
    'Premalign ve Malign Laringeal Lezyonlar: Lökoplaki, eritroplaki, laringeal displazi ve larinks karsinomu (SCC) tanısal derin biyopsisi',
    'Baş-Boyun Tümörlerinin TNM Evrelemesi (Panendoskopi: Laringoskopi + Özofagoskopi + Bronkoskopi)',
    'Tekrarlayan Respiratuar Papillomatozis (RRP): Vokal kord papillomlarının mikrodebrider veya CO2 lazer ile ablasyonu',
    'Unilateral Vokal Kord Paralizisi (Felci): İntrakordal enjeksiyon laringoplasti (yağ, fasya, hyaluronik asit dolgusu)',
    'Laringeal Stenoz, Web (Perde) ve Subglottik Darlıkların Lazer ve Balon Dilatasyonu'
  ],
  averageDuration: '20 - 60 dakika (Tanısal direkt laringoskopi ve biyopsi: 20-30 dk; Mikrolaringocerrahi [MLS] ve CO2 lazer eksizyonu: 40-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 - 20 mL (Mikrolaringeal vokal kord rezeksiyonlarında kanama minimaldir; ancak vasküler tümörler veya supraglottik kitle biyopsilerinde hafif aspiratör kanaması görülebilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Sistemik Kan Kaybı / Ancak Hava Yoluna Kan Kaçışı ve Akut Laringospazm Tehlikesi',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Vokal Kord Submukozal Mikrovasküler Kanamalar ve Hematom (Ses teli içi hematom kalıcı ses kaybı yaratabilir)',
      'Geniş Eksofitik Larinks Karsinomu Biyopsisi: Tümör yüzeyindeki frajil neovasküler damarların kanayarak trakeobronşiyal ağaca sızması',
      'Dil Kökü ve Faringeal Mukoza Laserasyonları (Laringoskop bıçağının aşırı basısına bağlı)'
    ],
    hemostasisStrategies: [
      'Topikal Adrenalinli (1:10.000 veya 1:100.000) mikro-nöroşirürjikal pamukcuklar (patties / cottonoids) ile bası hemostazı',
      'Mikro-bipolar koter veya mikro-emici koter ile noktasal koagülasyon',
      'CO2 Lazer cerrahisinde lazerin hemostatik koagülasyon etkisinden yararlanılması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) + Mikrolaringeal Tüp (MLT 5.0 - 6.0 mm) + Tam Nöromusküler Blokaj + Lazer Güvenlik Protokolü (FiO2 < %30) — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'Tüpsüz Yüksek Frekanslı Jet Ventilasyon (HFJV - Tubeless Jet Ventilation): Arka komissür ve subglottik alandaki lezyonlarda tüpün cerrahi görüşü engellememesi için supraglottik veya transglottik jet ventilasyon; barotravma ve pnömotoraks riskine karşı dikkatli olunmalıdır',
      'Apneik Oksijenizasyon (THRIVE - Transnasal Humidified Rapid-Insufflation Ventilatory Exchange): Çok kısa (< 10-15 dk) tanısal laringoskopi ve biyopsilerde',
      'İntermittan Apne / Entübasyon Tekniği: Lazer esnasında tüpün çıkarılıp cerrahi sonrası tekrar takılması'
    ],
    rulesTitle: 'DİREKT LARİNGOSKOPİ VE MİKROLARİNGOCERRAHİDE (MLS) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'DİREKT LARİNGOSKOPİ VE MİKROLARİNGOCERRAHİDE (MLS) ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) PAYLAŞILAN HAVA YOLU (SHARED AIRWAY) DİSİPLİNİ VE LAZER ATEŞİ (LASER AIRWAY FIRE) ÖNLEMİ — Laringoskopide anestezi uzmanı ve cerrah tam anlamıyla aynı dar anatomik kanalı paylaşır. Eğer laringeal lezyon için CO2 veya KTP lazer kullanılacaksa hava yolu yangını (Airway Fire) riski en üst düzeydedir! Çift kaflı, lazer dirençli metal spiral tüp (Laser-Flex vb.) kullanılmalı; kaf içi metilen mavili serum fizyolojik ile şişirilmeli; ilham edilen oksijen fraksiyonu (FiO2) KESİNLİKLE < %30 (O2/Hava karışımı) tutulmalı ve yanmayı körükleyen AZOT PROTOKSİT (N2O) KESİNLİKLE KULLANILMAMALIDIR! (2) SÜSPANSİYON MANEVRASINDA MASİF SEMPATİK DEŞARJ VE KARDİYOVASKÜLER DALGALANMA ALARMI — Rijit Kleinsasser laringoskopunun göğüs desteği üzerine asılarak laringeal süspansiyon kurulması dil kökü ve supraglottik bölgeye 20-30 kg\'lık mekanik traksiyon uygular. Bu manevra masif sempatik deşarja yol açarak kan basıncını aniden fırlatır (SKB > 180-200 mmHg), şiddetli taşikardi, koroner iskemi ve ventriküler aritmiler yaratır; nadiren de vagal uyarım bradikardi ve asistoliye neden olur! Süspansiyon öncesi derin anestezi, yüksek doz opioid (Remifentanil infüzyonu veya Fentanil bolusu) ve İV Esmolol/Labetalol hazır bulundurulmalıdır. (3) MİKROLARİNGEAL TÜP (MLT) VE HAVA YOLU KONTROLÜ — TÜPÜN ÇIKMASI (EKSTÜBASYON) VE KİNKİNG ALARMI — Cerraha vokal kordları ve arka komissürü gösterebilmek için yetişkin hastada standart tüp yerine dar lümenli 5.0 veya 6.0 mm iç çaplı Mikrolaringeal Tüp (MLT) tercih edilir. Cerrah laringoskopu boğaza yerleştirirken tüpü ezebilir (kinking), aşırı iterek tek akciğer entübasyonuna yol açabilir veya cerrahi aletlerle tüpü aniden yerinden çıkarabilir (kazara ekstübasyon!). Ventilasyon parametreleri, EtCO2 dalga formu ve tepe hava yolu basınçları (Ppeak) anlık izlenmelidir. (4) TAM NÖROMUSKÜLER BLOKAJ (TOF 0/4) VE SES TELLERİNDE SIFIR HAREKET DİSİPLİNİ — Mikroskop altında 400 mm odak mesafesinde vokal kord kist, polip veya kanser disseksiyonu yapılırken hastanın en ufak bir öksürmesi, ıkınması veya diyafram seğirmesi cerrahi makas veya lazerin sağlıklı vokal kord veya anterior komissürü biçmesine (kalıcı ses kısıklığı / afoni) yol açar! Ameliyat boyunca TOF 0/4 tam nöromusküler blokaj sürdürülmeli; cerrahi bittiğinde Sugammadeks ile blok hızla ve eksiksiz geri döndürülmelidir. (5) POSTOPERATİF LARİNGOFASİYAL ÖDEM, LARİNGOSPAZM VE UYANMA GÜVENLİĞİ — Laringoskopun dişlere basısı diş kırıklarına; dil köküne basısı dilde geçici uyuşma ve ödeme yol açabilir. Ekstübasyonda en büyük tehlike akut laringospazm, postoperatif laringeal ödem ve vokal kord hematomudur! Operasyon esnasında İV Deksametazon (8-10 mg) uygulanmalı; hasta ameliyathanede tam uyanık, hava yolu koruyucu refleksleri (öğürme/yutkunma) tam geri dönmüş ve vokal kord hareketleri doğrudan teyit edilerek pürüzsüz ekstübe edilmelidir.',
    indispensableRules: [
      {
        number: 1,
        title: 'PAYLAŞILAN HAVA YOLU (SHARED AIRWAY) DİSİPLİNİ VE LAZER ATEŞİ (LASER AIRWAY FIRE) ÖNLEMİ',
        content: 'Laringoskopide anestezi uzmanı ve cerrah tam anlamıyla aynı dar anatomik kanalı paylaşır. Eğer laringeal lezyon için CO2 veya KTP lazer kullanılacaksa hava yolu yangını (Airway Fire) riski en üst düzeydedir! Çift kaflı, lazer dirençli metal spiral tüp (Laser-Flex vb.) kullanılmalı; kaf içi metilen mavili serum fizyolojik ile şişirilmeli; ilham edilen oksijen fraksiyonu (FiO2) KESİNLİKLE < %30 (O2/Hava karışımı) tutulmalı ve yanmayı körükleyen AZOT PROTOKSİT (N2O) KESİNLİKLE KULLANILMAMALIDIR!'
      },
      {
        number: 2,
        title: 'SÜSPANSİYON MANEVRASINDA MASİF SEMPATİK DEŞARJ VE KARDİYOVASKÜLER DALGALANMA ALARMI',
        content: 'Rijit Kleinsasser laringoskopunun göğüs desteği üzerine asılarak laringeal süspansiyon kurulması dil kökü ve supraglottik bölgeye 20-30 kg\'lık mekanik traksiyon uygular. Bu manevra masif sempatik deşarja yol açarak kan basıncını aniden fırlatır (SKB > 180-200 mmHg), şiddetli taşikardi, koroner iskemi ve ventriküler aritmiler yaratır; nadiren de vagal uyarım bradikardi ve asistoliye neden olur! Süspansiyon öncesi derin anestezi, yüksek doz opioid (Remifentanil infüzyonu veya Fentanil bolusu) ve İV Esmolol/Labetalol hazır bulundurulmalıdır.'
      },
      {
        number: 3,
        title: 'MİKROLARİNGEAL TÜP (MLT) VE HAVA YOLU KONTROLÜ — TÜPÜN ÇIKMASI (EKSTÜBASYON) VE KİNKİNG ALARMI',
        content: 'Cerraha vokal kordları ve arka komissürü gösterebilmek için yetişkin hastada standart tüp yerine dar lümenli 5.0 veya 6.0 mm iç çaplı Mikrolaringeal Tüp (MLT) tercih edilir. Cerrah laringoskopu boğaza yerleştirirken tüpü ezebilir (kinking), aşırı iterek tek akciğer entübasyonuna yol açabilir veya cerrahi aletlerle tüpü aniden yerinden çıkarabilir (kazara ekstübasyon!). Ventilasyon parametreleri, EtCO2 dalga formu ve tepe hava yolu basınçları (Ppeak) anlık izlenmelidir.'
      },
      {
        number: 4,
        title: 'TAM NÖROMUSKÜLER BLOKAJ (TOF 0/4) VE SES TELLERİNDE SIFIR HAREKET DİSİPLİNİ',
        content: 'Mikroskop altında 400 mm odak mesafesinde vokal kord kist, polip veya kanser disseksiyonu yapılırken hastanın en ufak bir öksürmesi, ıkınması veya diyafram seğirmesi cerrahi makas veya lazerin sağlıklı vokal kord veya anterior komissürü biçmesine (kalıcı ses kısıklığı / afoni) yol açar! Ameliyat boyunca TOF 0/4 tam nöromusküler blokaj sürdürülmeli; cerrahi bittiğinde Sugammadeks ile blok hızla ve eksiksiz geri döndürülmelidir.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF LARİNGOFASİYAL ÖDEM, LARİNGOSPAZM VE UYANMA GÜVENLİĞİ',
        content: 'Laringoskopun dişlere basısı diş kırıklarına; dil köküne basısı dilde geçici uyuşma ve ödeme yol açabilir. Ekstübasyonda en büyük tehlike akut laringospazm, postoperatif laringeal ödem ve vokal kord hematomudur! Operasyon esnasında İV Deksametazon (8-10 mg) uygulanmalı; hasta ameliyathanede tam uyanık, hava yolu koruyucu refleksleri (öğürme/yutkunma) tam geri dönmüş ve vokal kord hareketleri doğrudan teyit edilerek pürüzsüz ekstübe edilmelidir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'KBB / Laringoloji Konsültasyonu: Fleksibl fiberoptik laringoskopi / videolaringostroboskopi (lezyonun glottik/supraglottik yeri, vokal kord mobilitesi, hava yolu obstrüksiyon derecesi ve stridor varlığı).',
      'Hava Yolu ve Entübasyon Değerlendirmesi: Mallampati skoru, tiromental mesafe, ağız açıklığı, boyun ekstansiyonu ve olası zor laringoskopi taraması (büyük kitlelerde uyanık videolaringoskopi veya fiberoptik entübasyon planı).',
      'Diş Muayenesi: Sallanan, kırık, kaplama veya protez dişlerin tespiti (rijit laringoskop basısına bağlı diş travmasını önlemek için diş koruyucu planlanır).',
      'Kardiyoloji Konsültasyonu: İleri yaş sigara içen popülasyonda koroner arter hastalığı, KOAH ve hipertansiyon optimizasyonu.'
    ],
    historyAndPhysical: [
      'Sigara ve Alkol Kullanım Öyküsü: Larinks kanseri etiyolojisinde en önemli risk faktörleri (reaktif hava yolu ve kardiyovasküler komorbiditeler).',
      'Stridor ve Efor Dispnesi: Dinlenme stridoru veya inspiratuar çekilmeler kritik hava yolu darlığını gösterir; indüksiyonda tam hava yolu obstrüksiyonu gelişebilir!',
      'Gastroözofageal Reflü (Laringofaringeal Reflü - LPR): Posterior komissür hipertrofisi ve granülom riski.',
      'Antikoagülan / Antiagregan İlaç Kullanımı: Vokal kord biyopsisinde laringeal hematomu önlemek için hemostatik planlama.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri, Serum Elektrolitleri ve Böbrek Fonksiyonları.',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Boyun ve Larinks BT / MRG (Kitle invazyon derinliği ve kıkırdak destrüksiyonu tespiti).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Süspansiyon taşiaritmi ve laringeal bradikardi takibi), SpO2, NIBP, EtCO2 ve Vücut Sıcaklığı.',
      'Sürekli Kan Basıncı Takibi (2-3 dakikada bir NIBP veya invaziv arter hattı): Süspansiyon manevrasında hipertansif piklerin izlenmesi.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Vokal kord mikrocerrahisinde sıfır hareket için TOF 0/4 tam blokaj takibi.',
      'Solunum Mekaniği ve Tepe Basınçları (Ppeak): MLT tüpünün dar lümeni nedeniyle hava yolu direnci yüksektir; tüp bükülmesi anında saptanır.'
    ],
    vascularAccess: [
      'En az 1-2 adet güvenli periferik intravenöz damar yolu (18G)',
      'Acil Hipertansiyon & Taşikardi Kiti: İV Esmolol, Labetalol veya Gliseril Trinitrat (süspansiyon piki için masada hazır)',
      'Acil Bradikardi Kiti: İV Atropin (0.5 mg ampul)',
      'Sugammadeks (2 - 4 mg/kg acil dekürarizasyon için)'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Boyun Fleksiyonda Baş Ekstansiyonda ("Koklama / Sniffing" Pozisyonu)',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; başın altına silikon halka konularak boyun fleksiyona, baş ise atlanto-oksipital eklemden ekstansiyona getirilir.',
      'Diş koruyucu (dental guard) üst diş kavisinin üzerine yerleştirilir.',
      'Süspansiyon çubuğu (Lewy laringoskop tutacağı) hastanın göğsü üzerine koruyucu ped konularak yerleştirilir veya masaya kilitlenir.',
      'Gözler antibiyotikli pomad sürülerek nemli gazlı bezlerle kapatılır (lazer ve alet travmasından korunur).'
    ],
    anesthesiaManagement: [
      'İndüksiyon:',
      '  - %100 O2 ile 3-5 dakika preoksijenizasyon.',
      '  - İV Lidokain (1.5 mg/kg): İndüksiyondan 90 saniye önce verilir (öksürük ve laringospazmı baskılar).',
      '  - Propofol (2.0 - 2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil infüzyonu.',
      '  - Rokuronyum (0.6 - 1.0 mg/kg): Hızlı ve tam nöromusküler blokaj sağlar.',
      'Entübasyon:',
      '  - Mikrolaringeal Tüp (MLT 5.0 - 6.0 mm) videolaringoskop eşliğinde, vokal kord lezyonunu zedelemeden nazikçe arka komissürden geçirilir.',
      '  - Tüp kafı dikkatle şişirilir ve basınç 20-25 cmH2O seviyesinde tutulur.',
      'Lazer Protokolü:',
      '  - Lazer kullanılacaksa Lazer-Flex tüp seçilir, kaf serum fizyolojik ve metilen mavisi ile şişirilir.',
      '  - FiO2 < %30 (O2/Hava karışımı); N2O KESİNLİKLE YASAKTIR.',
      '  - Tüp kafının çevresine ıslak nöroşirürjikal pamukcuklar (patties) yerleştirilir.',
      'İdame:',
      '  - TIVA (Propofol + Remifentanil infüzyonu): Hızlı derinleşme ve anında uyanma sağladığı için MLS cerrahisinde en popüler yöntemdir.',
      '  - Süspansiyon yerleştirilirken Remifentanil hızı artırılarak taşikardi ve hipertansif atak önlenir.'
    ],
    airwayManagement: [
      'Dar lümenli MLT tüpü hava yolu direncini artırabileceğinden ventilatör inspiratuar basınç limitleri ayarlanır.',
      'Cerrah laringoskopu yerleştirirken ve süspansiyona alırken tüpün derinliği ve EtCO2 dalgası kontrol edilir.',
      'Cerrahi bitiminde sekresyonlar nazikçe aspire edilir; vokal kordlara travma yapılmaz.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Üst Diş Koruyucunun Yerleştirilmesi.',
      '2. Mikrolaringeal Tüp (MLT) ile Pürüzsüz Entübasyon ve Tüpün Ağız Köşesine Tespiti.',
      '3. Rijit Laringoskopun (Kleinsasser) Yerleştirilmesi ve Larinksin Görselleştirilmesi.',
      '4. Laringeal Süspansiyonun Kurulması (Maksimum sempatik uyarım — Tansiyon ve taşikardi kontrolü!).',
      '5. 400 mm Odaklı Cerrahi Mikroskobun ve Lazer Ünitesinin Sahaya Hizalanması.',
      '6. Vokal Kord Lezyonunun Palpasyonu, Mobilite Analizi ve Biyopsi / Eksizyon Aşaması (Sıfır hareket aşaması!).',
      '7. Lazer ile Kitle Ablasyonu veya Mikromakas ile Mukozal Flep Disseksiyonu.',
      '8. Hemostazın Sağlanması (Adrenalinli spanç ve mikro-bipolar koter).',
      '9. Süspansiyonun Kaldırılması ve Rijit Laringoskopun Çıkarılması.',
      '10. Dişlerin, Dilin ve Farenks Mukozasının İyatrojenik Travma Açısından Kontrolü.'
    ],
    emergenceNotes: [
      'Ekstübasyon Öncesi Laringeal Ödem Profilaksisi: İntraoperatif İV Deksametazon (8-10 mg) uygulanmış olmalıdır.',
      'Sugammadeks (2 - 4 mg/kg) ile nöromusküler blokaj tamamen geri döndürülür (TOF oranı > %90 teyit edilir).',
      'Ekstübasyon Pürüzsüz Olmalıdır: Öksürük ve ıkınmayı önlemek için İV Lidokain (1.5 mg/kg) verilir.',
      'LARİNGOSPAZM ALARMI: Hasta ameliyathanede tam uyanık, sözel komutlara yanıt verirken, farengeal sekresyonlar temizlenmiş olarak ekstübe edilir; yüz maskesi ile %100 O2 pozitif basınçlı solunum desteği verilir.',
      'Postoperatif Ses İstirahati: Hastaya ameliyat sonrası en az 48-72 saat fısıltı dahil KESİNLİKLE KONUŞMAMASI (mutlak ses istirahati) tembihlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Laringoskopi sonrası ağrı genellikle hafif-orta düzeydedir ve boğazda yutkunma güçlüğü (odinofaji), dil kökü ağrısı ve çene sızlaması şeklindedir.',
      'İntravenöz Parasetamol (1000 mg) her 6 saatte bir bazal analjezik olarak uygulanır.',
      'Gereğinde hafif doz NSAİİ veya Tramadol (50 mg).',
      'Boğaz kuruluğunu gidermek ve ses tellerini nemli tutmak için ılık buhar inhalasyonu (soğuk buhar nemlendirici) uygulanır.'
    ],
    prospectRecommendations: [
      'PROSPECT Laringoloji ve Baş-Boyun Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi;',
      'Süspansiyon laringoskopi sonrası gelişen odontoid ve faringeal ağrının Parasetamol ve lokal anestezik spreylerle yönetimi;',
      'PONV profilaksisinin agresif tutularak kusmanın ses tellerine asit reflüsü yaratmasının önlenmesi tavsiye edilir.'
    ],
    erasRecommendations: [
      'ERAS KBB ve Laringoloji Protokolleri:',
      'Günübirlik cerrahi (Day-case): Komplikasyonsuz biyopsi ve MLS hastaları 2-4 saatlik derlenme ve oral alım sonrası aynı gün taburcu edilebilir.',
      'ZORUNLU SES İSTİRAHATİ (VOCAL REST): İlk 48-72 saat tam sessizlik (fısıldamak ses tellerini daha çok gerer, fısıldama yasaktır!).',
      'Laringeal Ödem Takibi: Postoperatif stridor, inspiratuar dispne veya siyanoz gelişmesi durumunda acil epinefrin nebülizasyonu ve re-entübasyon/trakeotomi hazırlığı.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section V: Otolaryngology - Larynx and Trachea: Direct Laryngoscopy and Suspension Microlaryngoscopy, pp. 780-786.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Association of Otorhinolaryngologists (ENT UK): Day-Case Microlaryngeal Surgery Guidelines.',
    prospectReference: 'PROSPECT Guidelines: Perioperative Pain and Airway Management in Microlaryngeal Procedures.',
    otherReferences: [
      'American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS): Clinical Practice Guideline on Dysphonia and Laryngeal Surgery.',
      'Society for Head and Neck Anesthesia (SHNA) & Difficult Airway Society (DAS): Consensus on Shared Airway and Laser Safety in Laryngology.',
      'Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC): Fonocerrahi ve Mikrolaringeal Cerrahi Kılavuzu.'
    ]
  }
};
