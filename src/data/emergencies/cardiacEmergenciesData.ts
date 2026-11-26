import type { EmergencyProtocol } from '../emergenciesData';

export const CARDIAC_EMERGENCIES_DATA: Record<string, EmergencyProtocol> = {
  'intraop-mi': {
    id: 'intraop-mi',
    // 1) Başlık
    title: 'İntraoperatif Miyokard İnfarktüsü & Akut Koroner Sendrom (PMI / MINS)',
    subTitle: 'Tip 1 (Plak Rüptürü) vs Tip 2 (O₂ Sunum/Tüketim Dengesizliği) · Perioperatif Miyokard Hasarı & Akut İskemi Yönetimi',
    codeColor: 'red',
    severityBadge: 'KOD KIRMIZI · AKUT MİYOKARD İSKEMİSİ · KARDİYOJENİK ŞOK & ARİTMİ RİSKİ',
    keyCallout: 'İntraoperatif yeni ST elevasyonu/depresyonu (>1 mm), T inversiyonu, yeni LBBB, malign aritmi veya TEE’de yeni bölgesel duvar hareket bozukluğu (RWMA) = AKUT MİYOKARD İSKEMİSİ! Perioperatif MI’ların çoğunluğu Tip 2 (O₂ sunum/tüketim dengesizliği) kaynaklıdır: Derhal O₂ sunumunu artır (SpO₂ ≥%95, Hb ≥8–9 g/dL, MAP ≥65–70 mmHg), MVO₂’yi düşür (HR kontrolü 60–75/dk — Esmolol/Metoprolol; ağrı/ısı/anestezi derinliğini optimize et), cerrahla aktif kanama riskini konuş (Aspirin + UFH; FİBRİNOLİTİK KESİN YASAK!). Sağ ventrikül infarktında (D2/D3/aVF + V4R) ve PDE-5 inhibitörü alanlarda NİTROGLİSERİN KONTRENDİKEDİR! STEMI veya refrakter şokta acil Kardiyoloji / Primer PKG planla!',
    quickCalculatorType: 'intraop-mi',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Perioperatif Miyokard İnfarktüsü (PMI), 4. Evrensel Miyokard İnfarktüsü Tanımı’na (Thygesen et al., 2018) göre kardiyak troponin (hs-cTn) değerinin 99. persentil üst referans sınırının üzerine yükselmesi/dalgalanması (>%20 değişim) ile birlikte akut miyokard iskemisi kanıtlarının (yeni iskemik EKG değişiklikleri, yeni patolojik Q dalgası, görüntülemede/TEE’de yeni bölgesel duvar hareket bozukluğu [RWMA] veya anjiyografik koroner trombüs) varlığıdır. Non-kardiyak Cerrahi Sonrası Miyokard Hasarı (MINS) ise iskemik semptom veya EKG değişikliği olmasa dahi iskemik kökene bağlı postoperatif troponin yükselmesini tanımlar ve 30 günlük mortalitenin güçlü, bağımsız bir öngörücüsüdür.',
      epidemiology: 'VISION çalışmasında (Devereaux et al., JAMA 2017) 45 yaş üstü non-kardiyak cerrahi hastalarının yaklaşık %18’inde MINS ve %3–5’inde klinik PMI geliştiği gösterilmiştir. Perioperatif MI’ların >%65’i genel anestezi, sedasyon ve postoperatif analjezi (opioid/epidural) nedeniyle göğüs ağrısı olmadan “klinik olarak sessiz” seyreder; ilk bulgu çoğunlukla intraoperatif ST değişikliği, yeni aritmi, açıklanamayan hipotansiyon/pulmoner ödem veya rutin hs-cTn yüksekliğidir. Etyolojik olarak perioperatif MI’ların büyük bölümü (~%70–85) Tip 2 MI (O₂ sunum/tüketim dengesizliği), yaklaşık %15–30’u ise Tip 1 MI (aterosklerotik plak rüptürü/erozyonu ve akut intraluminal trombüs) mekanizmasıyla gelişir.',
      triggers: [
        'Tip 2 MI — MVO₂ (Oksijen Tüketimi) Artışı: Taşikardi (diyastolik koroner doluş süresini dramatik kısaltır!), şiddetli hipertansiyon (↑afterload / duvar gerilimi), yetersiz anestezi/analjezi, postoperatif titreme (MVO₂’yi %200–400 artırır), ateş ve sempatik deşarj',
        'Tip 2 MI — DO₂ (Oksijen Sunumu) Azalması: İntraoperatif hipotansiyon (MAP <65 mmHg veya diyastolik basınç düşüşü → koroner perfüzyon basıncı CPP = DBP − LVEDP çöküşü), akut anemi/kanama (Hb <8 g/dL), hipoksemi (SpO₂ <%90), hipokapniye bağlı koroner vazokonstriksiyon ve aşırı sıvı yüklenmesi (↑LVEDP)',
        'Tip 1 MI — Plak Rüptürü & Akut Koroner Tromboz: Cerrahi stresin yarattığı hiperkoagülabilite (↑fibrinojen, ↑PAI-1, trombosit aktivasyonu), katekolamin artışı ile hemodinamik shear stress ve preoperatif antiplatelet (özellikle yakın dönem koroner stentte DAPT!) kesilmesine bağlı stent trombozu',
        'Yüksek Riskli Cerrahi & Hasta Profili: Majör vasküler (aort, periferik arter), torasik, acil majör batın cerrahileri; bilinen koroner arter hastalığı, yakın dönem (<6 ay) MI/PKG, kalp yetmezliği, kronik böbrek hastalığı, diyabet ve ileri yaş (RCRI ≥2)'
      ],
      safeAgents: [
        'Oksijen Sunumu & Hemodinamik Stabilizasyon: SpO₂ %94–98 hedefi (aşırı hiperoksiden [PaO₂ >300 mmHg] kaçın), Hb ≥8–9 g/dL (aktif iskemide erken eritrosit transfüzyonu), normotermi (>36°C), derin dengeli analjezi (Fentanil/Sufentanil) ve normokapni (EtCO₂ 35–40 mmHg)',
        'Kalp Hızı (MVO₂) Kontrolü: Kısa etkili titre edilebilir β₁-selektif bloker Esmolol (0,5 mg/kg IV bolus → 50–200 mcg/kg/dk infüzyon) veya Metoprolol (1–5 mg IV yavaş bolus; hedef HR 60–75/dk) — YALNIZCA akut kalp yetmezliği, kardiyojenik şok, bradikardi veya AV blok YOKSA!',
        'Koroner Vazodilatasyon & Preload Azaltma: İV Nitrogliserin (50–100 mcg bolus → 5–200 mcg/dk infüzyon; SKB >100 mmHg ise) — SAĞ VENTRİKÜL İNFARKTI (inferior MI + V4R) ve PDE-5 inhibitörlerinde (Sildenafil/Tadalafil) KESİN KONTRENDİKE!',
        'Antitrombotik & Reperfüzyon: Cerrahla kanama riski tartışılarak erken Aspirin (162–325 mg çiğneme/NG/rektal) ve geri çevrilebilir Anfraksiyone Heparin (UFH 60–70 IU/kg bolus, Protamin ile nötralize edilebilir); STEMI / refrakter iskemide Primer PKG (Fibrinolitikler KESİN YASAK!)',
        'Kardiyojenik Şok Desteği: Noradrenalin (ilk tercih vazopressör, hedef MAP ≥65 mmHg) + Dobutamin (inotropi, düşük CO/kardiyak indeks; taşikardi riskini izle) + erken mekanik destek (IABP / Impella / VA-ECMO) konsültasyonu'
      ],
      mortalityStats: 'Perioperatif MI gelişen hastalarda 30 günlük mortalite %10–25 civarındadır (kardiyojenik şok eşlik ederse >%40–50); klinik olarak sessiz MINS olgularında dahi 30 günlük mortalite 3–5 kat artmaktadır (VISION: %9–10 vs <%1). Erken tanı, MVO₂/DO₂ dengesinin hızla restorasyonu ve STEMI/refrakter olgularda acil koroner anjiyografi sağkalımı belirgin iyileştirir.',
      clinicalUrgency: 'İntraoperatif ST segment sapması, yeni RWMA veya açıklanamayan hemodinamik/aritmik instabilite tespit edildiği saniyede cerrahi ekibe haber verilmeli; 5-derivasyon EKG/12-derivasyon EKG ve mümkünse TEE ile tanı hızla netleştirilerek miyokard oksijen dengesi ve reperfüzyon stratejisi eşzamanlı yürütülmelidir.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Genel anestezi altındaki hasta göğüs ağrısı tarif edemez; bu nedenle intraoperatif tanı sürekli 5-derivasyon EKG (özellikle D2 + V4 + V5), hemodinamik dalga formu analizi, transözofageal ekokardiyografi (TEE) ve postoperatif seri yüksek duyarlıklı kardiyak troponin (hs-cTn) izlemine dayanır. London ve ark. (Anesthesiology 1988) klasik çalışmasında tek derivasyon olarak V5 intraoperatif iskeminin %75’ini, D2 + V5 kombinasyonu %80’ini, D2 + V4 + V5 kombinasyonu ise >%95’ini yakalamıştır. TEE’de yeni bölgesel duvar hareket bozukluğu (RWMA — hipokinezi/akinezi/diskinezi) koroner akım azalmasından sonraki 15–30 saniye içinde gelişir ve EKG ST değişikliklerinden çok daha erken ve hassastır.',
      clinicalCriteria: [
        '5-Derivasyon EKG & 12-Derivasyon EKG Kriterleri: Birbirini izleyen ≥2 derivasyonda yeni yatay veya aşağı eğimli ST depresyonu ≥0,5–1 mm (subendokardiyal iskemi / Tip 2 MI veya NSTEMI) ya da J noktasında yeni ST elevasyonu ≥1 mm (V2–V3’te erkek ≥2 mm, kadın ≥1,5 mm → transmural iskemi / STEMI)',
        'Kritik Lokalizasyon & Sağ Ventrikül Uyarısı: D2, D3, aVF’de ST elevasyonu (İnferior MI) saptandığında DERHAL sağ prekordiyal derivasyon (özellikle V4R) çekilmelidir! V4R’de ≥1 mm ST elevasyonu = Sağ Ventrikül İnfarktı (NTG ve agresif diüretik KESİN YASAK!).',
        'Transözofageal Ekokardiyografi (TEE — En Erken Göstergedir!): Sol ventrikül kısa eksen (mid-papiller SAX) ve uzun eksen görüntülerinde yeni bölgesel duvar hareket ve sistolik kalınlaşma kaybı (RWMA), yeni iskemik mitral yetmezlik (papiller kas disfonksiyonu) veya RV dilatasyonu',
        'Hemodinamik & Aritmik İpuçları: Açıklanamayan hipotansiyon, CVP veya PCWP’de (pulmoner kapiller kama basıncında dev V dalgaları = akut papiller kas/mitral yetmezliği!) ani yükselme, yeni sık PVC’ler, VT/VF veya yeni yüksek dereceli AV blok (inferior/RCA iskemisi!)',
        'Biyokimyasal Tanı (4. Evrensel MI Tanımı): Seri hs-cTn ölçümünde 99. persentil üst sınırının üzerinde değer + yükselme/düşme paterni (>%20 değişim); MINS için belirgin iskemik hs-cTn artışı (örn. hs-cTnT ≥20–65 ng/L + ≥5 ng/L artış veya ≥65 ng/L)'
      ],
      gradingScaleTitle: 'Perioperatif Miyokard İskemisi / İnfarktüsü Klinik Fenotip & Risk Sınıflaması',
      gradingScaleSource: '4th Universal Definition of MI (2018), ESC 2022 NCS & AHA/ACC 2024 Perioperatif CV Kılavuzu',
      larachScale: [
        { category: 'Sınıf 1 — Geçici İntraoperatif İskemi (ST Depresyonu <2 mm, Hemodinami Stabil)', points: 'Erken / Tip 2', description: 'Genellikle taşikardi, hipotansiyon veya anemiye sekonder subendokardiyal iskemi; MVO₂/DO₂ düzeltilince dakikalar içinde geriler (postop seri hs-cTn şart!).' },
        { category: 'Sınıf 2 — MINS / NSTEMI (Belirgin hs-cTn Yükselmesi ± Kalıcı ST Depresyonu / T İnversiyonu)', points: 'Yüksek Risk', description: 'Tip 2 veya plak erozyonu kaynaklı non-transmural nekroz; göğüs ağrısı çoğunlukla yoktur ancak 30 günlük mortalite 3–5 kat yüksektir.' },
        { category: 'Sınıf 3 — Akut STEMI / Yeni LBBB / Refrakter Transmural İskemi', points: 'KOD KIRMIZI', description: 'Akut koroner oklüzyon (Tip 1 plak rüptürü veya stent trombozu) göstergesi! Cerrahi güvenli en erken noktada sonlandırılıp acil Primer PKG (Cath Lab) gerekir.' },
        { category: 'Sınıf 4 — Kardiyojenik Şok / Mekanik Komplikasyon / Malign Aritmi (Killip IV)', points: 'KRİTİK / ŞOK', description: 'MAP <65 mmHg, laktat artışı, oligüri, pulmoner ödem, akut MR/VSD veya VT/VF fırtınası — Noradrenalin + Dobutamin + acil PKG + IABP/VA-ECMO değerlendirmesi!' }
      ],
      larachInterpretation: 'İntraoperatif EKG’de izole D2 izlemi iskemilerin önemli bir kısmını kaçırır; tüm kardiyak riskli hastalarda 5-derivasyon EKG (D2 + V5, mümkünse V4) ve ST-trend analizi aktif olmalıdır. ST elevasyonu veya hemodinamik kollapsa yol açan iskemi saptandığında Tip 1 koroner oklüzyon varsayılıp eşzamanlı kardiyoloji/anjiyografi aktivasyonu yapılmalıdır.',
      differentialDiagnosis: [
        {
          condition: 'Masif Pulmoner Emboli (PE) veya Sağ Kalp Yetmezliği',
          differentiatingFactors: 'Ani EtCO₂ düşüşü + derin hipoksemi + RV dilatasyonu (McConnell bulgusu) ve D-şekilli LV görülür; EKG’de S1Q3T3, yeni RBBB veya V1–V4 T negatifliği izlenebilir ancak koroner arter bölgesine uyan LV duvar hareket bozukluğu yoktur.'
        },
        {
          condition: 'Takotsubo (Stres) Kardiyomiyopatisi',
          differentiatingFactors: 'Perioperatif yoğun katekolamin deşarjı (entübasyon, feokromositoma, adrenalin maruziyeti, anafilaksi) sonrası ST elevasyonu ve hafif-orta troponin artışı yapar; TEE/EKO’da tek bir koroner dağılımını aşan apikal balonlaşma ve bazal hiperkinezi görülür; kesin ayrım koroner anjiyografi iledir.'
        },
        {
          condition: 'Kounis Sendromu (Alerjik Akut Koroner Sendrom / Koroner Vazospazm)',
          differentiatingFactors: 'Antibiyotik, NMB veya lateks sonrası anafilaksi tablosuna (eritem, bronkospazm, derin hipotansiyon) eşlik eden ani ST elevasyonu (histamin/lökotrien aracılı koroner vazospazm veya plak rüptürü). Adrenalin ve anafilaksi tedavisi yanında koroner iskemi protokolü birlikte yönetilir.'
        },
        {
          condition: 'Hiperkalemi / Elektrolit Bozukluğu veya Perikardit / Erken Repolarizasyon',
          differentiatingFactors: 'Hiperkalemide sivri T dalgaları, QRS genişlemesi ve sine-wave paterni (kan gazında K⁺ >6,0 mEq/L); perikarditte yaygın konkav ST elevasyonu ve PR depresyonu (resiprokal ST depresyonu yok) izlenir.'
        },
        {
          condition: 'Akut Aort Diseksiyonu (Tip A)',
          differentiatingFactors: 'Yırtıcı göğüs/sırt ağrısı (uyanık hastada), ekstremiteler arası tansiyon farkı, mediastinal genişleme ve TEE’de intimal flep + akut aort yetmezliği; sağ koroner ostium tutulumu inferior STEMI’yi birebir taklit edebilir (ANTİKOAGÜLASYON ÖLÜMCÜLDÜR — şüphede önce TEE/BT!).'
        }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'CERRAHA DERHAL BİLDİRİN · ACİL KARDİYOLOJİ KONSÜLTASYONU + 12-DERİVASYON EKG + TEE EKİBİNİ ÇAĞIRIN! Fibrinolitikler aktif cerrahide KESİN KONTRENDİKEDİR.',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'CERRAHA HABER VER, İSKEMİYİ DOĞRULA & YARDIM ÇAĞIR',
          action: 'Cerrahi ekibi derhal bilgilendirin; ameliyatın en kısa sürede güvenli bir noktada sonlandırılıp sonlandırılamayacağını (veya hasar kontrol moduna geçilmesini) konuşun. 5-derivasyon EKG kablolarını doğrulayın, mümkünse steril alan dışı 12-derivasyon EKG çekin, defibrilatör pedlerini hazır bulundurun ve acil Kardiyoloji konsültasyonu isteyin.',
          criticalNote: 'İnferior derivasyonlarda (D2, D3, aVF) ST elevasyonu varsa mutlaka V4R çekerek Sağ Ventrikül İnfarktını dışlayın!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'OKSİJEN SUNUMUNU (DO₂) MAKSİMİZE ET: FiO₂, HEMOGLOBİN & PERFÜZYON',
          action: 'SpO₂ <%95 ise FiO₂’yi artırarak %94–98 hedefleyin (gereksiz aşırı hiperoksi [PaO₂ >300] koroner vazokonstriksiyon yapabilir). Normokapniyi (EtCO₂ 35–40 mmHg) koruyun. Acil arter kan gazı ve Hb bakın: Aktif miyokard iskemisinde Hb <8–9 g/dL ise derhal eritrosit süspansiyonu transfüze edin! Aktif ısıtma ile normotermiyi (>36°C) sağlayın.',
          criticalNote: 'Aktif akut koroner iskemide standart kısıtlayıcı Hb 7 g/dL eşiği GEÇERSİZDİR — ESC 2022 & AHA 2024 doğrultusunda Hb ≥8–9 g/dL hedeflenmelidir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'MVO₂ KONTROLÜ: KALP HIZI (HR), ANESTEZİ DERİNLİĞİ & HEMODİNAMİ',
          action: 'Taşikardi (>90/dk) varsa önce yüzeyel anestezi, ağrı, hipovolemi, hiperkapni veya kanamayı hızla düzeltin. Yeterli analjezi (Fentanil/Sufentanil) ve normovolemiye rağmen taşikardi sürüyorsa ve akut kalp yetmezliği/şok/AV blok YOKSA kısa etkili β₁-bloker Esmolol (0,5 mg/kg IV bolus → 50–200 mcg/kg/dk infüzyon) veya Metoprolol (1–5 mg IV yavaş bolus) ile HR’yi 60–75/dk bandına indirin. MAP ≥65–70 mmHg (veya bazalin %80–100’ü) koruyun; hipotansiyonda düşük doz Fenilefrin (taşikardik hastada!) veya Noradrenalin infüzyonu kullanın.',
          criticalNote: 'Sol ventrikül koroner perfüzyonu diyastolde olur: Kalp hızını 110’dan 70/dk’ya düşürmek diyastolik doluş süresini uzatarak iskemiyi düzeltmenin EN GÜÇLÜ yoludur — ancak kardiyojenik şokta β-bloker KESİN KONTRENDİKEDİR!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'NİTROGLİSERİN (NTG) — PRELOAD & KORONER VAZODİLATASYON (2 KRİTİK YASAK!)',
          action: 'Sistolik KB >100 mmHg, devam eden ST değişikliği, hipertansiyon veya sol ventrikül yüklenme (↑LVEDP / pulmoner konjesyon) bulguları varsa İV Nitrogliserin başlatın: 50–100 mcg yavaş bolus veya 5–20 mcg/dk infüzyon ile başlayıp yanıt ve kan basıncına göre 5–200 mcg/dk aralığında titre edin.',
          criticalNote: 'İKİ KESİN KONTRENDİKASYON: (1) Sağ Ventrikül İnfarktında (D2/D3/aVF + V4R ST↑, hipotansiyon, temiz akciğer) NTG önyükü çökertip kardiyak arrest yapar (tedavi: dikkatli sıvı + Noradrenalin)! (2) Son 24 saatte Sildenafil/Vardenafil veya 48 saatte Tadalafil (PDE-5 inhibitörü) almış hastada refrakter şok oluşturur!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'ANTİTROMBOTİK STRATEJİ & FİBRİNOLİTİK YASAĞI (CERRAH + KARDİYOLOJİ ORTAK KARARI)',
          action: 'Aktif cerrahi kanama riskini (intrakraniyal, spinal, retroperitoneal, göz içi, kontrolsüz cerrahi kanama) cerrahla saniyeler içinde değerlendirin. Mutlak kanama kontrendikasyonu yoksa: Aspirin 162–325 mg (çiğneme, NG/OG tüpten ezilerek veya rektal supozituvar) uygulayın. Tip 1 AKS / STEMI / stent trombozu şüphesi yüksekse ve cerrahi hemostaz uygunsa geri çevrilebilir Anfraksiyone Heparin (UFH 60–70 IU/kg IV bolus [maks 4000–5000 IU] → 12 IU/kg/saat infüzyon) düşünün. P2Y12 inhibitörünü (Klopidogrel/Tikagrelor/Prasugrel) koroner anjiyografi ve cerrahi kanama netleşene kadar kardiyoloji ile kararlaştırın.',
          criticalNote: 'FİBRİNOLİTİK TEDAVİ (Alteplaz / Tenekteplaz) AKTİF CERRAHİDE VE YAKIN DÖNEM MAJÖR CERRAHİDE KESİNLİKLE KONTRENDİKEDİR! Reperfüzyon gerektiren STEMI’de tek yol Acil Primer PKG’dir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 6,
          title: 'İNVAZİV MONİTÖRİZASYON & TEE İLE MEKANİK / KARDİYOJENİK DEĞERLENDİRME',
          action: 'Henüz yoksa arteriyel kateter (sürekli beat-to-beat MAP ve seri AKG/laktat/hs-cTn için) yerleştirin. İmkan varsa intraoperatif TEE uygulayarak yeni RWMA’yı, LV/RV ejeksiyon fraksiyonunu, volüm durumunu ve akut mekanik komplikasyonları (papiller kas rüptürüne bağlı ciddi MR, serbest duvar rüptürü/tamponad, VSD) değerlendirin.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'KARDİYOJENİK ŞOK & MALİGN ARİTMİ YÖNETİMİ',
          action: 'Kardiyojenik şok (MAP <65 mmHg, laktat artışı, soğuk ekstremite, TEE’de ağır LV disfonksiyonu) gelişirse ilk tercih vazopressör olarak Noradrenalin (0,05–0,5 mcg/kg/dk) başlatın; düşük kalp debisi sürüyorsa Dobutamin (2–10 mcg/kg/dk — taşiaritmi ve MVO₂ artışına dikkat!) ekleyin. Refrakter şokta erken dönemde IABP, Impella veya VA-ECMO için kardiyoloji/KVC ekibini devreye alın. VT/VF veya yüksek dereceli AV blokta ilgili ACLS/aritmi protokollerini uygulayın.',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'PRİMER PKG (CATH LAB) TRANSFERİ & POSTOPERATİF YOĞUN BAKIM',
          action: 'STEMI, yeni LBBB, refrakter iskemi, yeni ciddi RWMA, akut stent trombozu veya kardiyojenik şok varlığında cerrahi en kısa sürede kapatılarak hasta entübe/monitörize halde doğrudan Koroner Anjiyografi (Primer PKG) laboratuvarına transfer edilmelidir. Stabil Tip 2 iskemi olgularında erken ekstübasyon kararını miyokard oksijen talebi (titreme/ağrı/hipertansiyon) riskine karşı tartarak hastayı YBÜ / Koroner YBÜ’ye alın; 0., 3., 6., 24. saat hs-cTn ve seri 12-derivasyon EKG planlayın.',
          priority: 'HIGH'
        }
      ],
      structuredCrisisBlocks: {
        tieredLadder: {
          title: 'İntraoperatif Miyokard İskemisi Şiddet & Müdahale Merdiveni',
          accent: 'red',
          levels: [
            {
              badge: 'BASAMAK 1 · ERKEN İSKEMİ',
              target: 'ST Depresyonu 1–2 mm · Hemodinami Stabil (Olası Tip 2)',
              presentation: 'V5 veya D2’de yeni yatay/downsloping ST depresyonu, sıklıkla taşikardi (>95/dk), hipotansiyon veya akut kanama eşliğinde.',
              intervention: 'Tetikleyiciyi düzelt (analjezi/derinlik, Hb ≥8–9, SpO₂ %94–98, MAP ≥65), Esmolol ile HR 60–75/dk’ya çek, normotermi sağla, 12-derivasyon EKG + hs-cTn gönder.',
              severity: 'WARNING'
            },
            {
              badge: 'BASAMAK 2 · ISRARCI NSTEMI / RWMA',
              target: 'Kalıcı ST Depresyonu ≥2 mm / T İnversiyonu / TEE’de Yeni RWMA',
              presentation: 'Hemodinami optimize edilmesine rağmen düzelmeyen ST değişikliği, yükselen CVP/PCWP, yeni ventriküler ektopi veya TEE’de fokal hipokinezi.',
              intervention: 'Cerrahla ameliyatı hızlandırmayı konuş, İV Nitrogliserin (RV MI/PDE-5 yoksa!) başla, cerrahi onay ile Aspirin 162–325 mg ± UFH, acil Kardiyoloji konsültasyonu.',
              severity: 'HIGH'
            },
            {
              badge: 'BASAMAK 3 · AKUT STEMI / STENT TROMBOZU',
              target: 'Yeni ST Elevasyonu ≥1–2 mm (≥2 Ardışık Derivasyon) veya Yeni LBBB',
              presentation: 'Transmural iskemi (Tip 1 plak rüptürü veya akut stent trombozu), resiprokal ST depresyonu, derin RWMA / akinezi, hızla bozulan hemodinami.',
              intervention: 'CERRAHİYİ EN KISA SÜREDE SONLANDIR → Acil Primer PKG (Cath Lab)! Fibrinolitik YASAK! Aspirin + (cerrahi uygunsa) UFH; inferior STEMI’de V4R çek (RV MI dışla!).',
              severity: 'CRITICAL'
            },
            {
              badge: 'BASAMAK 4 · KARDİYOJENİK ŞOK / ARREST',
              target: 'Refrakter Hipotansiyon + Düşük CO / Pulmoner Ödem / VT-VF',
              presentation: 'MAP <65 mmHg, artan laktat, akut mitral yetmezliği (dev V dalgası), ağır LV/RV yetmezliği veya malign ventriküler aritmi/arrest.',
              intervention: 'β-bloker ve NTG’yi KES! Noradrenalin + Dobutamin başlat, ACLS / defibrilasyon uygula, acil Primer PKG + mekanik dolaşım desteği (IABP / VA-ECMO)!',
              severity: 'CRITICAL'
            }
          ]
        },
        comparisonTable: {
          title: 'Perioperatif Akut Koroner Fenotiplerin Ayırıcı Karşılaştırması',
          columns: ['Klinik Fenotip', 'Temel Patofizyoloji', 'EKG / TEE Bulgusu', 'İntraoperatif Kritik Tedavi', 'Kesin Tuzak / Kontrendikasyon'],
          rows: [
            {
              col1: 'Tip 1 MI (STEMI / NSTEMI)',
              col2: 'Aterosklerotik plak rüptürü/erozyonu veya stent trombozu → akut koroner oklüzyon (~%15–30)',
              col3: 'ST elevasyonu (≥2 ardışık derivasyon), resiprokal depresyon, yeni LBBB veya fokal akinezi (RWMA)',
              col4: 'Cerrahiyi hızla bitir → Acil Primer PKG (Cath Lab) + cerrahi onay ile Aspirin & UFH',
              col5: 'Aktif cerrahide FİBRİNOLİTİK KESİN YASAK! Stent trombozunda anjiyografiyi geciktirme!'
            },
            {
              col1: 'Tip 2 MI (O₂ Dengesizliği)',
              col2: 'Koroner darlık zemininde O₂ tüketimi ↑ (taşikardi) veya sunumu ↓ (hipotansiyon, anemi, hipoksi) (~%70–85)',
              col3: 'Tipik olarak yaygın/subendokardiyal ST depresyonu (özellikle V4–V5), geçici T inversiyonu',
              col4: 'Önce tetikleyiciyi düzelt: HR 60–75 (Esmolol), MAP ≥65–70, Hb ≥8–9 g/dL, normotermi, ağrı kontrolü',
              col5: 'Altta yatan kanama/hipovolemiyi düzeltmeden agresif β-bloker veya antikoagülan verme!'
            },
            {
              col1: 'Sağ Ventrikül İnfarktı (RV MI)',
              col2: 'Proksimal RCA oklüzyonu → RV pompa yetmezliği, preload bağımlı düşük kardiyak debi',
              col3: 'İnferior STEMI (D2, D3, aVF ST↑) + V4R’de ≥1 mm ST↑; TEE’de dilate/hipokinetik RV',
              col4: 'Dikkatli sıvı yüklemesi (CVP 10–14 mmHg), Noradrenalin, AV senkroniyi koru (pacing/atropin), acil PKG',
              col5: 'NİTROGLİSERİN, morfin ve diüretikler KESİN YASAK → preload çöküşü ile ani kardiyak arrest!'
            },
            {
              col1: 'MINS (Perioperatif Miyokard Hasarı)',
              col2: 'Klinik semptom/göğüs ağrısı olmadan iskemik perioperatif hs-cTn yükselmesi (VISION)',
              col3: 'Çoğunlukla normal veya non-spesifik EKG; tanı postop 24–72. saat seri hs-cTn taramasıyla konur',
              col4: 'Sekonder kardiyovasküler koruma: Aspirin + Statin, kanama dışlandıktan sonra kardiyoloji takibi (MANAGE: Dabigatran değerlendirmesi)',
              col5: '“Göğüs ağrısı yok” diyerek yüksek hs-cTn’yi göz ardı etme — 30 günlük mortalite 3–5 kat yüksektir!'
            }
          ]
        },
        drugPolicyCards: {
          title: 'İntraoperatif MI / AKS Farmakolojik Karar Kartları',
          items: [
            {
              domain: 'Nitrogliserin (50–100 mcg bolus / 5–200 mcg/dk)',
              recommendation: 'SKB >100 mmHg, hipertansif/hipervolemik iskemi ve sol ventrikül konjesyonunda koroner vazodilatasyon ve preload düşürmek için titre et.',
              rationaleAndCaution: 'SAĞ VENTRİKÜL İNFARKTINDA (D2/D3/aVF + V4R) ve son 24–48 saatte PDE-5 İNHİBİTÖRÜ (Sildenafil/Vardenafil 24 sa, Tadalafil 48 sa) kullanımında KESİN KONTRENDİKEDİR!',
              status: 'CAUTION'
            },
            {
              domain: 'Esmolol / Metoprolol (HR Kontrolü — MVO₂)',
              recommendation: 'Taşikardik (HR >90/dk) ve hemodinamik olarak stabil Tip 2/NSTEMI iskemide Esmolol (0,5 mg/kg → 50–200 mcg/kg/dk) ile diyastolik doluş süresini uzat (hedef HR 60–75/dk).',
              rationaleAndCaution: 'Kardiyojenik şok, akut pulmoner ödem, hipotansiyon (SKB <90), bradikardi (<55/dk) veya 2./3. derece AV blokta KESİN KONTRENDİKEDİR! Ayrıca hipovolemik refleks taşikardide önce volümü/kanamayı düzelt.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Aspirin (162–325 mg) & UFH (60–70 IU/kg)',
              recommendation: 'Cerrahla kanama riski mutabakatı sağlanır sağlanmaz erken Aspirin (NG/rektal/çiğneme) ve yüksek riskli Tip 1 AKS’de Protaminle geri çevrilebilir UFH tercih et.',
              rationaleAndCaution: 'İntrakraniyal, spinal/epidural (kateter varlığında!) veya kontrolsüz cerrahi kanamada antikoagülan/antiplatelet kararını mutlaka cerrah ve kardiyologla birlikte ver.',
              status: 'CAUTION'
            },
            {
              domain: 'Fibrinolitikler (Alteplaz / Tenekteplaz)',
              recommendation: 'Aktif cerrahi sırasında veya son 2–4 hafta içinde majör cerrahi geçirmiş hastada ASLA UYGULAMA!',
              rationaleAndCaution: 'Ölümcül cerrahi alan, intrakraniyal veya retroperitoneal kanamaya yol açar. STEMI’de tek güvenli ve etkili reperfüzyon yöntemi Acil Primer PKG’dir.',
              status: 'AVOID'
            },
            {
              domain: 'Eritrosit Transfüzyonu (Aktif İskemide Hb Hedefi)',
              recommendation: 'Aktif intraoperatif miyokard iskemisinde Hb <8–9 g/dL ise kan transfüzyonu başlat; kısıtlayıcı 7 g/dL eşiğini bekleme!',
              rationaleAndCaution: 'Koroner rezervi sınırlı miyokardda O₂ taşıma kapasitesini artırmak Tip 2 iskemiyi hızla geri çevirir; ancak transfüzyon ilişkili dolaşım yüklenmesinden (TACO / ↑LVEDP) kaçın.',
              status: 'RECOMMENDED'
            }
          ]
        },
        preventionBox: {
          title: 'ESC 2022 & AHA/ACC 2024 Perioperatif Miyokard Koruma Kontrol Listesi',
          highlightRule: 'POISE Kuralı: Kronik β-bloker ve statin tedavisini ameliyat sabahı MUTLAKA DEVAM ET; ancak β-bloker naif hastaya ameliyat günü yüksek doz yeni β-bloker BAŞLAMA (inme ve tüm nedenlere bağlı mortaliteyi artırır)!',
          checks: [
            '5-Derivasyon EKG Standardı: Tüm kardiyak riskli hastalarda D2 + V5 (mümkünse V4 + V5 → >%95 hassasiyet) sürekli ST-trend analizi ile monitörize edilmelidir.',
            'Hipotansiyon ve Taşikardi Önleme: İntraoperatif MAP’ı ≥65 mmHg (hipertansiflerde bazalin ≥%80’i) ve HR’yi 60–85/dk aralığında tut; indüksiyon hipotansiyonundan kaçın.',
            'DAPT & Koroner Stent Güvenliği: Yakın dönem ilaç kaplı stent (DES) hastalarında elektif cerrahi ertelenmeli; acil cerrahide Aspirin mümkünse kesilmeden sürdürülmeli ve cerrahi sonrası P2Y12 en erken dönemde yeniden başlanmalıdır.',
            'Postoperatif MINS Taraması (ESC 2022 Sınıf I): Bilinen KVH, KV risk faktörü veya ≥65 yaş yüksek/orta riskli non-kardiyak cerrahi hastalarında preoperatif bazal + postop 24. ve 48. saatlerde hs-cTn ölçümü yapılmalıdır.'
          ]
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Miyokard oksijen tüketimi (MVO₂) temel olarak 4 faktöre bağlıdır: kalp hızı (en güçlü belirleyici), miyokardiyal duvar gerilimi (Laplace yasası: P × r / 2h — preload & afterload) ve kontraktilite. Oksijen sunumu (DO₂) ise koroner kan akımı (sol ventrikülde ağırlıklı olarak diyastolde; CPP = Diyastolik KB − LVEDP) ve arteriyel oksijen içeriği (CaO₂ ≈ 1,34 × Hb × SaO₂) tarafından belirlenir. Miyokard bazal durumda dahi gelen oksijenin %70–80’ini ekstrakte ettiği için artan oksijen ihtiyacı yalnızca koroner kan akımı artışıyla karşılanabilir; stenotik koroner yatakta bu rezerv kaybolduğunda saniyeler içinde anaerobik metabolizma, laktat birikimi ve mekanik gevşeme/kasılma kaybı (iskemik kaskad) başlar.',
      stepsTitle: 'İskemik Kaskad & Tip 1 / Tip 2 Perioperatif Miyokard Hasarı Ekseni',
      flowType: 'dual-axis',
      cycleWarning: 'İskemi → diyastolik sertlik artışı (↑LVEDP) → Koroner Perfüzyon Basıncı (DBP − LVEDP) daha da düşer → derinleşen subendokardiyal iskemi → pompalama yetmezliği, hipotansiyon ve refleks taşikardi kısır döngüsü!',
      cascadeSteps: [
        {
          phase: '1. O₂ Sunum/Tüketim Dengesizliği (Tip 2) veya Plak Rüptürü (Tip 1)',
          mechanism: 'Taşikardi (diyastol kısalması), hipotansiyon, anemi/hipoksi veya cerrahi stres kaynaklı plak rüptürü + tromboz kritik koroner akımı miyokard ihtiyacının altına düşürür.',
          badge: 'MVO₂ > DO₂ / TROMBÜS',
          color: 'amber'
        },
        {
          phase: '2. Erken Diyastolik & Sistolik Disfonksiyon (TEE’de Yeni RWMA)',
          mechanism: 'ATP tükenmesiyle ilk 15–30 saniyede aktif gevşeme bozulur (↑LVEDP), ardından bölgesel duvar kalınlaşması durur (TEE’de RWMA). Bu evrede yüzey EKG hâlâ normal olabilir!',
          badge: 'TEE EN ERKEN BULGU',
          color: 'cyan'
        },
        {
          phase: '3. Repolarizasyon Bozukluğu (EKG ST–T Değişiklikleri) & Elektriksel İnstabilite',
          mechanism: 'Hücresel K⁺ kaçağı ve istirahat membran potansiyeli düşüşü ST depresyonu (subendokardiyal) veya ST elevasyonu (transmural) oluşturur; re-entry mekanizması ile PVC, VT/VF veya AV blok gelişir.',
          badge: 'EKG ST↑/↓ · ARİTMİ',
          color: 'red'
        },
        {
          phase: '4. Kardiyomiyosit Nekrozu (hs-cTn ↑) & Kardiyojenik Şok',
          mechanism: 'İskemi >20–30 dk sürerse geri dönüşsüz miyosit ölümü (troponin salınımı) başlar; geniş nekroz veya papiller kas disfonksiyonu akut pulmoner ödem ve kardiyojenik şoka ilerler.',
          badge: 'NEKROZ / ŞOK',
          color: 'rose'
        }
      ],
      summaryText: 'İskemik kaskadda mekanik disfonksiyon (TEE’de RWMA) EKG değişikliklerinden önce, EKG değişiklikleri ise biyokimyasal nekrozdan (hs-cTn) önce gelişir. Perioperatif dönemde hızlı HR/BP/Hb/O₂ optimizasyonu Tip 2 iskemiyi nekroz gelişmeden durdurabilir; Tip 1 transmural oklüzyonda ise zaman eşittir miyokarddır (Acil Primer PKG!).'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        '5-derivasyon EKG’de (özellikle V5 ve D2’de) yeni ≥0,5–1 mm yatay/aşağı eğimli ST depresyonu veya sivri/ters dönmüş T dalgaları',
        'TEE’de koroner arter dağılımına uyan yeni fokal hipokinezi veya akinezi (EKG’den önce ortaya çıkabilir!)',
        'Açıklanamayan sinüs taşikardisi, sık yeni ventriküler erken vurular (PVC) veya yeni başlangıçlı hızlı atriyal fibrilasyon',
        'Uyanık/rejyonal anestezi hastasında göğüste baskı, çene/sol kol/epigastrik ağrı, soğuk terleme, bulantı veya ani dispne'
      ],
      progressingSigns: [
        '≥2 ardışık derivasyonda yeni ST elevasyonu (STEMI) ve karşıt derivasyonlarda resiprokal ST depresyonu veya yeni sol dal bloğu (LBBB)',
        'Hemodinamik bozulma: Sıvıya yanıt vermeyen hipotansiyon, CVP/PCWP artışı (akut papiller kas disfonksiyonunda dev V dalgaları)',
        'İnferior MI (D2/D3/aVF ST↑) zemininde yeni 1./2./3. derece AV blok veya sağ ventrikül infarktına bağlı derin hipotansiyon + yüksek CVP + temiz akciğerler',
        'Pulmoner konjesyon bulguları: Hava yolu tepe basıncında (Ppeak) artış, pembe köpüklü sekresyon ve SpO₂ düşüşü'
      ],
      lateSigns: [
        'Kardiyojenik şok: Refrakter hipotansiyon (MAP <65 mmHg), düşük EtCO₂, soğuk/benekli ekstremiteler, oligüri ve hızla yükselen arteriyel laktat',
        'Malign ventriküler aritmiler: Sürekli monomorfik/polimorfik VT, Ventriküler Fibrilasyon (VF) veya tam AV blok',
        'Mekanik komplikasyonlar: Akut ciddi mitral yetmezliği (papiller kas rüptürü), interventriküler septal rüptür veya serbest duvar rüptürü/tamponad',
        'Kardiyak arrest (VF/pVT veya refrakter PEA)'
      ],
      specialAlertTitle: 'Sessiz Perioperatif İskemi & Sağ Ventrikül İnfarktı Tuzağı!',
      specialAlertContent: 'POISE ve VISION verileri perioperatif MI’ların >%65’inin klasik göğüs ağrısı olmadan geliştiğini göstermiştir; bu nedenle yüksek riskli hastada yeni hipotansiyon, açıklanamayan taşikardi/aritmi veya postop dispne daima akut koroner iskemi olarak araştırılmalıdır. İnferior ST yükselmesinde (D2/D3/aVF) V4R’yi kontrol etmeden Nitrogliserin vermek sağ ventrikül infarktında ani kardiyak arreste yol açabilir!'
    },

    // 7) Önleyici Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'ESC 2022 & AHA/ACC 2024 doğrultusunda fonksiyonel kapasite (MET ≥4 / DASI), RCRI skoru, aktif kardiyak koşullar (unstabil angina, dekompanse KKY, ciddi kapak darlığı, malign aritmi) ve yakın dönem koroner stent öyküsü değerlendirilmelidir.',
        'Kronik β-bloker ve statin tedavisi ameliyat sabahı KESİLMEMELİDİR; ancak β-bloker kullanmayan hastada ameliyat günü yüksek doz profilaktik β-bloker başlatılmamalıdır (POISE: artmış inme ve mortalite!).',
        'Yüksek riskli hastalarda (≥65 yaş veya bilinen KVH/KV risk faktörü + orta/yüksek riskli cerrahi) preoperatif bazal hs-cTn ve 12-derivasyon EKG (karşılaştırma referansı!) alınmalıdır.',
        'ACEi/ARB’ler hipertansiyon endikasyonuyla alınıyorsa ameliyat sabahı atlanması (refrakter intraop hipotansiyonu önlemek için) ESC 2022 tarafından önerilir; ancak kalp yetmezliğinde (HFrEF) bireyselleştirilerek devamı değerlendirilir.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Kardiyak Riskli Hastada İntraoperatif Koruma Protokolü',
        steps: [
          '5-derivasyon EKG (D2 + V5 standart; yüksek riskte V4 + V5) yerleştirin ve monitörde sürekli ST-segment trend alarmını açın.',
          'Orta-yüksek riskli cerrahi veya ciddi KAH/düşük EF’de indüksiyon ÖNCESİ invaziv arteriyel kateterizasyon planlayın (indüksiyon hipotansiyonunu saniyeler içinde yakalamak için).',
          'Isıtıcı battaniye ve sıvı ısıtıcıyı baştan aktif ederek hipotermiyi ve postoperatif titremeyi (MVO₂ patlamasını) önleyin.',
          'Hemodinamik stabiliteyi koruyan dengeli indüksiyon (Etomidat veya titre Propofol + yeterli opioid + laringoskopi yanıtını körelten Lidokain/Esmolol) uygulayın.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'İntraoperatif hipotansiyondan (MAP <65 mmHg veya bazalden >%20 düşüş) ve uzamış taşikardiden (>90–100/dk) kaçınmak için proaktif vazopressör (Noradrenalin/Fenilefrin) ve kısa etkili β-bloker (Esmolol) hazır bulundurulması',
        'Kanama yönetiminde hedefe yönelik sıvı tedavisi (aşırı kristaloid → ↑LVEDP ve hemodilüsyon!) ve yüksek kardiyak riskli hastada Hb 8 g/dL altında erken transfüzyon eşiği',
        'Postoperatif dönemde kesintisiz multimodal analjezi (rejyonal blok / epidural / IV analjezi) ile katekolamin deşarjının ve ağrıya bağlı taşikardinin engellenmesi'
      ],
      cartTitle: 'İntraoperatif AKS / Kardiyak İskemi Acil Hazırlık Listesi:',
      cartChecklist: [
        'Bifazik Defibrilatör / Kardiyoverter + Yapışkan Pedler (Oda içinde hazır)',
        'İV Nitrogliserin İnfüzyonu (örn. 50 mg / 250 mL = 200 mcg/mL veya 10 mg / 100 mL = 100 mcg/mL)',
        'Esmolol (10 mg/mL bolus + infüzyon) & Metoprolol (5 mg ampul)',
        'Vazopressör / İnotrop Seti: Noradrenalin, Fenilefrin (50–100 mcg/mL) ve Dobutamin',
        'Antitrombotikler: Aspirin (300 mg çiğneme/NG/rektal), Anfraksiyone Heparin (UFH) & Protamin Sülfat',
        '12-Derivasyon EKG Cihazı, TEE Probu/Cihazı, Arter Kan Gazı & Seri hs-cTn Tüpleri'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'İntraoperatif MI / AKS veya belirgin ST değişikliği yaşayan her hasta en az 24–48 saat Koroner Yoğun Bakım veya Cerrahi Yoğun Bakım Ünitesi’nde sürekli telemetri (ST-trend + aritmi) altında izlenmelidir.',
      recurrenceRate: 'Perioperatif MI’ların büyük bölümü ilk 48–72 saat içinde (özellikle analjezi kesilip sempatik tonus arttığında ve hiperkoagülabilite zirve yaptığında) ortaya çıkar veya tekrarlar.',
      recurrenceRiskBadge: 'EN YÜKSEK RİSK İLK 48–72 SAAT · SERİ hs-cTn ZORUNLU',
      maintenanceTherapy: 'Kardiyoloji eşliğinde sekonder koruma: Cerrahi hemostaz sağlanır sağlanmaz Aspirin ve yüksek yoğunluklu Statin, hemodinami elveriyorsa kardiyoselektif β-bloker ve ACEi/ARB; normotermi, Hb ≥8–9 g/dL, etkin ağrı kontrolü ve normovolemi.',
      monitoringParameters: [
        'Seri yüksek duyarlıklı kardiyak troponin (hs-cTn): Olay anı (0. saat), 3., 6., 24. ve 48. saatlerde yükselme/düşme kinetiği',
        'Seri 12-derivasyon EKG (inferior tutulumda V4R ve posterior V7–V9 dahil) — yeni Q dalgası, ST rezolüsyonu veya iletim bloğu takibi',
        'Yatak başı Transtorasik Ekokardiyografi (TTE): LVEF, yeni RWMA, sağ ventrikül fonksiyonu ve kapak/mekanik komplikasyon taraması',
        'Sürekli arteriyel basınç, saatlik idrar çıkışı, seri laktat, Hb/Htc ve elektrolit (K⁺ ≥4,0 mEq/L, Mg²⁺ ≥2,0 mg/dL — aritmi koruması!) takibi',
        'Antitrombotik/antikoagülan başlandıysa cerrahi dren debisi, hemoglobin trendi ve koagülasyon (aPTT/ACT) yakın izlemi'
      ],
      expectedComplications: [
        'Kardiyojenik şok ve akut dekompanse kalp yetmezliği / pulmoner ödem',
        'Malign ventriküler aritmiler (VT/VF), yüksek dereceli AV blok veya yeni başlangıçlı atriyal fibrilasyon',
        'Mekanik komplikasyonlar: Papiller kas rüptürü (akut ciddi MR), serbest duvar rüptürü/tamponad, ventriküler septal rüptür',
        'Antitrombotik/PKG sonrası cerrahi alan kanaması (cerrahi-kardiyoloji hassas dengesi)',
        'Uzun dönem kalp yetmezliği, tekrarlayan MACE ve artmış 30 günlük / 1 yıllık mortalite'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'Acil veya Erken İnvaziv Koroner Anjiyografi (Primer PKG)',
          description: 'STEMI, yeni LBBB, refrakter angina/iskemi, kardiyojenik şok veya malign aritmi eşlik eden olgularda kesin tanı ve primer reperfüzyon standardıdır.'
        },
        {
          testName: 'Seri hs-cTn + 12-Derivasyon EKG & Transtorasik EKO',
          description: 'Tip 1 vs Tip 2 MI ve MINS ayrımı, infarkt büyüklüğünün belirlenmesi ve LVEF/RWMA bazalının saptanması.'
        },
        {
          testName: 'Taburculuk Sonrası Kardiyoloji & Sekonder Koruma Planı',
          description: 'Non-invaziv iskemi/viabilite testi (anjiyografi yapılmayan Tip 2/MINS hastalarında), DAPT/antikoagülan süre planlaması ve kardiyak rehabilitasyon.'
        }
      ],
      prognosisSummary: 'Perioperatif MI/MINS, non-kardiyak cerrahide 30 günlük mortalitenin önde gelen nedenidir. Ancak intraoperatif erken tanı (V5+D2 EKG / TEE), MVO₂–DO₂ dengesinin saniyeler içinde restorasyonu, STEMI’de fibrinolitik tuzağına düşmeden Primer PKG’ye yönlendirme ve MINS hastalarında yapılandırılmış sekonder koruma (ASA + Statin) ile sağkalım anlamlı düzeyde iyileşmektedir.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: '5-Derivasyon EKG Hassasiyeti & TEE’nin Erken Üstünlüğü',
        takeaway: 'İntraoperatif iskemiyi yakalamada tek başına V5 %75, D2 + V5 %80, D2 + V4 + V5 kombinasyonu ise >%95 hassastır (London 1988). Ancak en erken bulgu EKG değil, TEE’de 15–30 saniye içinde ortaya çıkan yeni bölgesel duvar hareket bozukluğudur (RWMA)!',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Sağ Ventrikül İnfarktı (V4R) & PDE-5 İnhibitörü = Nitrogliserin YASAK!',
        takeaway: 'İnferior MI (D2, D3, aVF ST elevasyonu) gördüğünde V4R çekmeden Nitrogliserin verme! Sağ ventrikül infarktı preload bağımlıdır; NTG önyükü çökertip ani kardiyak arrest yapar. Benzer şekilde son 24–48 saatte Sildenafil/Tadalafil alan hastada da NTG kesin kontrendikedir!',
        category: 'Tuzak'
      },
      {
        title: 'Aktif Cerrahide Fibrinolitik KESİN KONTRENDİKE — Tek Reperfüzyon Primer PKG!',
        takeaway: 'İntraoperatif STEMI’de trombolitik (Alteplaz/Tenekteplaz) vermek kontrolsüz cerrahi kanama ile ölümcüldür. Cerrahla ameliyatı en kısa sürede güvenli sonlandırıp hastayı doğrudan Primer PKG (Kateter Laboratuvarı) ekibine devret; antikoagülasyon gerekirse Protaminle geri çevrilebilen UFH’yi seç!',
        category: 'Kritik Doz'
      },
      {
        title: 'Perioperatif MI’ların Çoğu Tip 2’dir & >%65’i Sessizdir!',
        takeaway: 'Perioperatif MI’ların ~%70–85’i plak rüptüründen ziyade taşikardi, hipotansiyon, anemi ve hipoksinin yarattığı O₂ sunum/tüketim dengesizliğinden (Tip 2) doğar. Analjezi göğüs ağrısını maskelediği için yüksek riskli hastalarda postop 24–48. saat hs-cTn taraması (MINS) hayat kurtarır.',
        category: 'Ezber Bozan'
      },
      {
        title: 'Aktif İskemide Hb Eşiği 7 Değil 8–9 g/dL & POISE β-Bloker Kuralı',
        takeaway: 'Aktif miyokard iskemisinde kısıtlayıcı Hb 7 g/dL eşiğini beklemeden Hb ≥8–9 g/dL hedefle. Kronik β-blokerleri ameliyat sabahı mutlaka devam et; ancak β-bloker naif hastaya ameliyat günü yüksek doz yeni β-bloker başlama (POISE: inme ve mortalite artışı)!',
        category: 'Sınav / Klinik Notu'
      }
    ],

    // 10) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'Thygesen K, Alpert JS, Jaffe AS, et al.; Joint ESC/ACC/AHA/WHF Task Force.',
        title: 'Fourth Universal Definition of Myocardial Infarction (2018).',
        journal: 'European Heart Journal. 2019;40(3):237–269 & Circulation. 2018;138(20):e618–e651.',
        year: '2018 / 2019',
        relevance: 'Tip 1 vs Tip 2 MI, miyokard hasarı (MINS) ve hs-cTn tanı kriterlerinin uluslararası standart tanımı.'
      },
      {
        authors: 'Halvorsen S, Mehilli J, Cassese S, et al.; ESC Scientific Document Group.',
        title: '2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery.',
        journal: 'European Heart Journal. 2022;43(39):3826–3924.',
        year: '2022',
        relevance: 'Non-kardiyak cerrahide perioperatif kardiyovasküler risk yönetimi, PMI/MINS hs-cTn taraması, antitrombotik ve β-bloker kılavuzu.'
      },
      {
        authors: 'Thompson A, Fleischmann KE, Smilowitz NR, et al.',
        title: '2024 AHA/ACC/ACS/ASNC/HRS/SCA/SCCT/SCMR/SVM Guideline for Perioperative Cardiovascular Management for Noncardiac Surgery.',
        journal: 'Circulation. 2024;150(19):e351–e442.',
        year: '2024',
        relevance: 'Güncel AHA/ACC 2024 perioperatif kardiyovasküler yönetim, intraoperatif hemodinami/transfüzyon hedefleri ve PMI/MINS yaklaşımı.'
      },
      {
        authors: 'Byrne RA, Rossello X, Coughlan JJ, et al.; ESC Scientific Document Group.',
        title: '2023 ESC Guidelines for the management of acute coronary syndromes.',
        journal: 'European Heart Journal. 2023;44(38):3720–3826.',
        year: '2023',
        relevance: 'STEMI/NSTEMI akut farmakoterapi, RV infarktı yönetimi, primer PKG zamanlaması ve kardiyojenik şok kılavuzu.'
      },
      {
        authors: 'Devereaux PJ, Biccard BM, Sigamani A, et al.; VISION Study Investigators.',
        title: 'Association of Postoperative High-Sensitivity Troponin Levels With Myocardial Injury and 30-Day Mortality Among Patients Undergoing Noncardiac Surgery.',
        journal: 'JAMA. 2017;317(16):1642–1651.',
        year: '2017',
        relevance: 'MINS prevalansı, sessiz perioperatif miyokard hasarı ve 30 günlük mortalite ilişkisinin temel kanıtı.'
      },
      {
        authors: 'London MJ, Hollenberg M, Wong MG, et al. & POISE Study Group (Devereaux PJ, et al.).',
        title: 'Intraoperative myocardial ischemia: localization by continuous 12-lead ECG (Anesthesiology 1988) & POISE trial (Lancet 2008).',
        journal: 'Anesthesiology. 1988;69(2):232–241 & The Lancet. 2008;371(9627):1839–1847.',
        year: '1988 / 2008',
        relevance: 'V5 (%75), D2+V5 (%80) ve D2+V4+V5 (>%95) intraoperatif EKG duyarlılığı ile perioperatif yeni başlangıçlı yüksek doz β-bloker riskinin kanıtı.'
      }
    ],
    relatedLinks: [
      { label: 'İntraoperatif Malign Aritmiler (VT/VF/Torsades)', href: '#arac=emergencies&sub=malignant-arrhythmias', badge: 'Aritmi Krizi' },
      { label: 'İntraoperatif Hipotansiyon (IOH)', href: '#arac=emergencies&sub=hypotension', badge: 'Perfüzyon / Şok' },
      { label: 'İntraoperatif Hipertansiyon Krizi', href: '#arac=emergencies&sub=hypertension', badge: 'Afterload / MVO₂' },
      { label: 'Perioperatif Kardiyak Arrest & ACLS', href: '#arac=emergencies&sub=acls', badge: 'ACLS' },
      { label: 'Antitrombotik & Rejyonal Yönetim Matriksi', href: '#infografik=antithrombotic-matrix', badge: 'İnfografik' },
      { label: 'Vazoaktif İlaç Karar Matriksi', href: '#infografik=vasoactive-decision-matrix', badge: 'İnfografik' }
    ]
  },

  'malignant-arrhythmias': {
    id: 'malignant-arrhythmias',
    // 1) Başlık
    title: 'İntraoperatif Malign Aritmiler (VT / VF / Torsades / Unstabil Taşiaritmiler)',
    subTitle: 'Nabızsız VT/VF · Polimorfik VT (Torsades de Pointes) · Pre-Eksitasyonlu AF (WPW) & Hemodinamik Unstabil Taşikardiler',
    codeColor: 'red',
    severityBadge: 'KOD KIRMIZI · ANİ HEMODİNAMİK KOLLAPS · ACİL DEFİBRİLASYON / KARDİYOVERSİYON',
    keyCallout: 'İntraoperatif malign taşiaritmide İLK SORU: NABIZ VE ARTER/EtCO₂ DALGASI VAR MI? Nabızsız VT/VF → DERHAL 150–200 J BIFAZİK DEFİBRİLASYON + KPR + Adrenalin 1 mg + Amiodaron 300 mg! Nabızlı ama UNSTABİL taşikardi → SENKRONİZE KARDİYOVERSİYON (Dar düzenli SVT 50–100 J; Monomorfik VT 100 J; Hızlı AF 120–200 J)! Polimorfik VT / Torsades de Pointes (uzun QT) → İV MAGNEZYUM SÜLFAT 2 g + DEFİBRİLASYON (senkronize edilmez!) + AMIODARON VERME! WPW (Pre-eksitasyonlu düzensiz geniş kompleks AF) → AV DÜĞÜM BLOKERLERİ (Adenozin, Verapamil, Diltiazem, Digoksin, β-bloker, Amiodaron) KESİNLİKLE YASAK (VF tetikler!) — Senkronize Kardiyoversiyon veya Prokainamid uygula!',
    quickCalculatorType: 'malignant-arrhythmias',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'İntraoperatif malign aritmiler; cerrahi ve anestezi sırasında aniden gelişerek kardiyak debiyi çökerten, miyokardiyal/serebral hipoperfüzyona veya saniyeler içinde kardiyak arreste yol açan hayatı tehdit eden taşiaritmilerdir. Klinik olarak dört ana acil eksende yönetilir: (1) Nabızsız VT / Ventriküler Fibrilasyon (VF), (2) Nabızlı Monomorfik Ventriküler Taşikardi (stabil vs unstabil), (3) Polimorfik VT / Torsades de Pointes (TdP — uzamış QTc zemininde) ve (4) Hemodinamik unstabil Supraventriküler Taşiaritmiler (SVT, Hızlı AF/Flutter ve özellikle Pre-eksitasyonlu AF [WPW]).',
      epidemiology: 'Genel anestezi sırasında tüm ritim bozukluklarının görülme sıklığı %60–70’e ulaşsa da (çoğu benign sinüs taşikardisi veya izole ektopidir), klinik müdahale gerektiren ciddi perioperatif taşiaritmi insidansı non-kardiyak cerrahide %1–5, torasik ve kardiyak cerrahilerde %15–40’a kadar çıkmaktadır. Ameliyathanedeki kardiyak arrestlerin yaklaşık %15–25’i şoklanabilir ritim (VF/pVT) ile başlar ve ameliyathanede erken defibrilasyon sayesinde hastane dışı arreste kıyasla çok daha yüksek ROSC ve nörolojik sağkalım oranlarına sahiptir.',
      triggers: [
        'Metabolik, Elektrolit & Solunumsal Tetikleyiciler: Hipoksi, hiperkapni/asidoz, HİPERKALEMİ (süksinilkolin, masif transfüzyon, ezilme/yanık, böbrek yetmezliği), HİPOKALEMİ (<3,5 mEq/L) ve HİPOMAGNEZEMİ (<1,8 mg/dL)',
        'QT Uzatan İlaçlar (Torsades de Pointes Tetikleyicileri!): Droperidol, Haloperidol, Ondansetron (ve diğer 5-HT₃ antagonistleri), Sevofluran/İsofluran/Desfluran, Metadon, Amiodaron, Sotalol, makrolidler/florokinolonlar',
        'Miyokard İskemisi & Mekanik İrritasyon: Akut koroner iskemi/reperfüzyon, santral venöz kateter veya pulmoner arter kateteri kılavuz telinin (guidewire) sağ ventriküle ilerlemesi, torasik/kardiyak cerrahi manipülasyon',
        'Toksik, Endokrin & Hipermetabolik Krizler: Lokal Anestezik Sistemik Toksisitesi (LAST — özellikle Bupivakain!), Malign Hipertermi (MH), Feokromositoma krizi, tiroid fırtınası, cerrahi lokal infiltrasyondan sistemik Adrenalin emilimi ve derin hipotermi (<30°C)',
        'Cihaz & Artefakt Tuzakları: Elektrokoter elektromanyetik interferansı (EMI — monitörde sahte VF görünümü veya kalp pili/ICD’nin yanlış algılama/inhibisyonu!)'
      ],
      safeAgents: [
        'Elektriksel Tedavi (Unstabil Hastada En Hızlı ve Güvenli Seçenek!): Nabızsız VT/VF ve Torsades’ta Senkronize Olmayan Defibrilasyon (150–200 J bifazik); Nabızlı Unstabil Taşikardide Senkronize Kardiyoversiyon (SVT 50–100 J, Monomorfik VT 100 J, AF/WPW 120–200 J)',
        'Nabızsız VT/VF & Stabil Monomorfik VT: Amiodaron (pVT/VF’de 300 mg → 150 mg IV; nabızlı stabil monomorfik VT’de 150 mg IV 10 dk’da → infüzyon) veya Lidokain (1–1,5 mg/kg IV bolus)',
        'Torsades de Pointes (Polimorfik VT + Uzun QT): İlk basamak İV Magnezyum Sülfat 2 g (unstabilde 1–2 dk, stabilde 10–15 dk) + K⁺ >4,0–4,5 mEq/L + Overdrive Pacing / Edinsel Uzun QT’de İzoproterenol (2–10 mcg/dk) — AMIODARON VERME!',
        'Düzenli Dar-Kompleks Stabil SVT: Vagal manevra → Adenozin 6 mg hızlı IV puşe + 20 mL SF flaş → yanıt yoksa 12 mg (santral hattan veya kalp naklinde 3 mg)',
        'WPW (Pre-Eksitasyonlu Düzensiz Geniş Kompleks AF): Unstabilde Senkronize Kardiyoversiyon (120–200 J); stabilde IV Prokainamid (20–50 mg/dk) veya İbutilid — AV DÜĞÜM BLOKERLERİ KESİNLİKLE YASAK!'
      ],
      mortalityStats: 'VF/pVT’de defibrilasyondaki her 1 dakikalık gecikme sağkalımı %7–10 azaltır; buna karşın ameliyathanede ilk 2 dakika içinde defibrilasyon ve altta yatan nedenin (elektrolit, iskemi, guidewire, LAST) hızla giderilmesiyle ROSC oranları >%60–75’e ulaşır. Pre-eksitasyonlu AF’ye yanlışlıkla Verapamil/Adenozin/Amiodaron verilmesi veya Torsades’a Amiodaron verilmesi iatrojenik VF ve ölüme yol açabilir.',
      clinicalUrgency: 'Monitörde malign aritmi görüldüğünde ilk 5 saniyede hastanın nabzı, arter dalga formu, EtCO₂ ve SpO₂ pletismografisi kontrol edilerek gerçek aritmi koter/elektrot artefaktından ayrılmalı; nabız yoksa KPR + defibrilasyon, nabızlı unstabilse acil senkronize kardiyoversiyon başlatılmalıdır.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'İntraoperatif taşiaritmi tanısında 3 soruluk yapılandırılmış yaklaşım hayat kurtarır: (1) Gerçek ritim mi, artefakt/koter EMI mi? (Arter trasesi, SpO₂ pletismografisi, EtCO₂ ve santral nabız kontrolü — hasta normotansif ve arter trasesi normalse “sahte VF”dir, şoklama!). (2) Hasta nabızsız mı, nabızlı unstabil mi (SKB <90 / MAP <65, şok, akut iskemi, akut pulmoner ödem, bilinç kaybı), yoksa stabil mi? (3) QRS dar mı (<120 ms) geniş mi (≥120 ms) ve R-R aralığı düzenli mi düzensiz mi? Kural: Aksi ispatlanana kadar her düzenli geniş-kompleks taşikardi Ventriküler Taşikardi (VT), her çok hızlı (>200/dk) düzensiz geniş-kompleks taşikardi (değişken QRS morfolojisi — “FBI: Fast, Broad, Irregular”) ise Pre-eksitasyonlu AF (WPW) kabul edilmelidir!',
      clinicalCriteria: [
        'Nabızsız VT / VF: Kaotik QRS’siz fibrilasyon dalgaları (VF) veya nabız/arter dalgasının kaybolduğu hızlı geniş-kompleks taşikardi (pVT) + EtCO₂’de ani <10–15 mmHg çöküşü',
        'Monomorfik VT (Nabızlı): Geniş QRS (≥120 ms), düzenli, tek tip QRS morfolojisi, tipik hız 150–250/dk; AV disosiyasyon, füzyon/capture vuruları ve prekordiyal konkordans tanıyı destekler',
        'Polimorfik VT / Torsades de Pointes (TdP): İzoelektrik eksen etrafında amplitüdü ve polaritesi dönerek değişen (“noktaların dönmesi”) hızlı (160–250/dk) geniş kompleksler + bazal EKG’de uzamış QTc (>480–500 ms)',
        'Pre-Eksitasyonlu AF (WPW — “FBI”): Çok hızlı (sıklıkla >200–250/dk), DÜZENSİZ R-R aralıklı, GENİŞ ve atımdan atıma değişen QRS genişliğinde taşikardi (bazal EKG’de kısa PR + delta dalgası öyküsü olabilir)',
        'Dar-Kompleks SVT / Hızlı AF / Flutter: QRS <120 ms; düzenli (AVNRT/AVRT 150–220/dk, Atriyal Flutter 150/dk 2:1 iletim) veya düzensiz (P dalgası yok, hızlı ventrikül yanıtlı AF)'
      ],
      gradingScaleTitle: 'İntraoperatif Taşiaritmi Klinik Triyaj & Elektrik Enerji Matriksi',
      gradingScaleSource: 'AHA 2020/2025 ACLS, ERC 2021 ALS & ESC 2022 Ventriküler Aritmiler Kılavuzu',
      larachScale: [
        { category: 'Sınıf 1 — Nabızsız VT / VF (Kardiyak Arrest)', points: 'DEFİBRİLASYON 150–200 J', description: 'Nabız, arter trasesi ve EtCO₂ yok. Senkronize OLMAYAN 150–200 J bifazik şok + kesintisiz KPR + Adrenalin 1 mg + Amiodaron 300 mg / Lidokain.' },
        { category: 'Sınıf 2 — Polimorfik VT / Torsades de Pointes (Uzun QT)', points: 'MgSO₄ 2 g + DEFİB', description: 'Değişken eksenli polimorfik VT. Unstabil/nabızsızda senkronize OLMAYAN defibrilasyon + İV MgSO₄ 2 g + K⁺ >4,0 + overdrive pacing / İzoproterenol. AMIODARON YASAK!' },
        { category: 'Sınıf 3 — Nabızlı Unstabil Taşikardi (Monomorfik VT / WPW-AF / SVT / AF)', points: 'SENKRONİZE KARDİYOVERSİYON', description: 'MAP <65, şok, akut iskemi veya pulmoner ödem var! Dar düzenli SVT: 50–100 J; Monomorfik VT: 100 J; Hızlı AF veya WPW-AF: 120–200 J senkronize kardiyoversiyon.' },
        { category: 'Sınıf 4 — Hemodinamik Stabil Taşiaritmi (Dar SVT / Monomorfik VT / WPW-AF)', points: 'HEDEF FARMAKOTERAPİ', description: 'Dar düzenli SVT → Adenozin 6→12 mg; Stabil monomorfik VT → Amiodaron 150 mg (10 dk) veya Prokainamid; Stabil WPW-AF → Prokainamid/İbutilid (AV bloker YASAK!).' }
      ],
      larachInterpretation: 'Hasta hemodinamik olarak unstabilse ritmin ince elektrofizyolojik ayrımıyla (örn. aberran SVT vs VT) vakit kaybedilmez: DERHAL senkronize kardiyoversiyon uygulanır! Tek istisna: Polimorfik VT / Torsades’ta cihaz QRS’leri senkronize edemeyeceği için senkronize olmayan defibrilasyon seçilir.',
      rhythmEcgGallery: [
        {
          rhythmName: 'Ventriküler Fibrilasyon (VF)',
          badge: 'ŞOKLANABİLİR · 150–200 J DEFİBRİLASYON',
          shockable: true,
          imagePath: '/ecg/vf_real.jpg',
          ecgFeatures: 'Kaotik, düzensiz, organize QRS kompleksi ve P dalgası olmayan fibrilasyon dalgaları.',
          caption: 'Arter trasesi/nabız yoksa saniye kaybetmeden 150–200 J bifazik defibrilasyon + 2 dk kesintisiz KPR; 2. şok sonrası Adrenalin 1 mg, 3. şok sonrası Amiodaron 300 mg veya Lidokain!',
          sourceLicense: 'Wikimedia Commons · Derivasyon II · Public Domain'
        },
        {
          rhythmName: 'Monomorfik Ventriküler Taşikardi (VT)',
          badge: 'NABIZSIZ: DEFİB 200 J · UNSTABİL: SENK. 100 J',
          shockable: true,
          imagePath: '/ecg/vt_real.jpg',
          ecgFeatures: 'Geniş QRS (≥120 ms), hızlı (>150/dk), düzenli ve tek tip morfolojili ventriküler kompleksler.',
          caption: 'Nabız yoksa defibrilasyon (200 J); nabızlı ama unstabilse senkronize kardiyoversiyon (100 J → 150 J → 200 J); stabilse Amiodaron 150 mg (10 dk) veya Prokainamid!',
          sourceLicense: 'Wikimedia Commons · Derivasyon II · Public Domain'
        }
      ],
      differentialDiagnosis: [
        {
          condition: 'Elektrokoter EMI / Titreme / Gevşek Elektrot (“Sahte VF/VT”)',
          differentiatingFactors: 'Monitörde VF veya hızlı VT görünür ANCAK invaziv arter trasesi, SpO₂ pletismografisi, EtCO₂ ve palpe edilen karotis nabzı tamamen normaldir! ASLA şoklama — elektrokoteri kestir ve kabloları kontrol et!'
        },
        {
          condition: 'Aberran İletimli SVT (Dal Bloklu SVT) vs Monomorfik VT',
          differentiatingFactors: 'İkisi de düzenli geniş-kompleks taşikardi yapar. Yapısal kalp hastalığı/KAH olan hastada düzenli geniş-kompleks taşikardinin >%80’i VT’dir! Şüphede daima VT gibi tedavi et; Verapamil/Diltiazem vermek VT’de kardiyak arrest yapar.'
        },
        {
          condition: 'Lokal Anestezik Sistemik Toksisitesi (LAST) Kaynaklı Ventriküler Aritmi',
          differentiatingFactors: 'Rejyonal blok veya lokal infiltrasyon sonrası QRS genişlemesi, polimorfik VT/VF ve refrakter arrest gelişir. Standart ACLS tek başına yetmez: DERHAL %20 Lipid Emülsiyonu (1,5 mL/kg bolus → 0,25 mL/kg/dk) ver; Lidokain/lokal anestezik antiaritmik KULLANMA, Adrenalini ≤1 mcg/kg düşük dozda tut!'
        },
        {
          condition: 'Hiperkalemi Kaynaklı Geniş-Kompleks Taşikardi / Sine-Wave',
          differentiatingFactors: 'Masif transfüzyon, süksinilkolin, reperfüzyon veya KBY’de aşırı geniş QRS (>160–200 ms) ve sivri T dalgaları görülür. Antiaritmiklerden önce DERHAL IV Kalsiyum Klorür 1 g (veya Kalsiyum Glukonat 3 g) + İnsülin/Dekstroz + Bikarbonat uygulanmalıdır!'
        },
        {
          condition: 'Malign Hipertermi (MH) veya Feokromositoma Krizi',
          differentiatingFactors: 'MH’de hızla yükselen EtCO₂, rijidite, asidoz ve hiperkalemi eşlik eder (Dantrolen şart!). Feokromositomada aşırı hipertansiyon krizi (SKB >220) + taşiaritmi görülür (önce α-bloker Fentolamin/Nikardipin, sonra β-bloker!).'
        }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'ACİL YARDIM & DEFİBRİLATÖR İSTEYİN · CERRAHA BİLDİRİN (%100 O₂’ye geçin, elektrokoteri kapatın, santral kateter guidewire varsa geri çekin)!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'NABIZ, ARTER TRASESİ & ARTEFAKT KONTROLÜ + %100 OKSİJEN + YARDIM ÇAĞIR',
          action: 'İlk 5–10 saniyede karotis nabzı, arter dalga formu, SpO₂ pletismografisi ve EtCO₂’yi kontrol ederek gerçek aritmiyi koter/elektrot artefaktından ayırın. Cerraha haber verip koter kullanımını durdurun, FiO₂’yi %100’e çıkarın, volatil anesteziği hafifletin (derin hipotansiyonda kapatın) ve bifazik defibrilatörü hasta başına getirip pedleri yapıştırın.',
          criticalNote: 'Santral venöz veya PA kateteri yerleştirilirken aritmi çıktıysa İLK İŞ kılavuz teli (guidewire) / kateteri 3–5 cm geri çekmektir!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'NABIZSIZ VT / VF İSE: ERKEN BIFAZİK DEFİBRİLASYON (150–200 J) + KPR',
          action: 'Nabız ve arter trasesi yoksa saniye kaybetmeden yüksek kaliteli KPR başlatın (100–120/dk, 5–6 cm) ve ilk fırsatta 150–200 J (üretici bilinmiyorsa maks enerji) SENKRONİZE OLMAYAN bifazik şok uygulayın. Şok sonrası nabız beklemeden 2 dk KPR yapın. 2. şok sonrası Adrenalin 1 mg IV (her 3–5 dk’da tekrar), 3. şok sonrası refrakter VF/pVT için Amiodaron 300 mg IV bolus (sonraki doz 150 mg) VEYA Lidokain 1–1,5 mg/kg IV (sonraki 0,5–0,75 mg/kg, maks 3 mg/kg) verin.',
          criticalNote: 'VF/pVT’de defibrilasyondaki her 1 dk gecikme sağkalımı %7–10 azaltır; ameliyathanede pedler takılır takılmaz ilk şok <60 saniyede verilmelidir!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'NABIZLI AMA UNSTABİL TAŞİKARDİ: ACİL SENKRONİZE KARDİYOVERSİYON',
          action: 'Nabız var ancak hipotansiyon (MAP <65 / SKB <90), akut şok, iskemik ST değişikliği, akut pulmoner ödem veya bilinç değişikliği varsa DERHAL defibrilatörü “SYNC” (Senkronize) moduna alın (monitörde her R dalgası üzerinde işaret olduğunu teyit edin!) ve şoklayın: Dar düzenli SVT / Atriyal Flutter: 50–100 J; Monomorfik VT: 100 J (yanıt yoksa 150 → 200 J); Hızlı AF veya Pre-eksitasyonlu AF (WPW): 120–200 J bifazik.',
          criticalNote: 'Uyanık/rejyonal hastada hemodinami izin veriyorsa hızlı sedasyon (Midazolam/Etomidat/Fentanil) verin; ancak ağır şok/peri-arrestte sedasyon için kardiyoversiyonu GECİKTİRMEYİN! Her şok sonrası cihazın SYNC modundan çıkabileceğini unutmayın.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'POLİMORFİK VT / TORSADES DE POINTES (UZUN QT): İV MAGNEZYUM 2 g + DEFİBRİLASYON!',
          action: 'Uzamış QTc zemininde ekseni dönen polimorfik VT (Torsades) saptandığında: (1) Unstabil/nabızsız ise SENKRONİZE OLMAYAN 150–200 J defibrilasyon yapın (cihaz polimorfik QRS’yi senkronize edemez!). (2) İlk basamak spesifik ilaç olarak İV MAGNEZYUM SÜLFAT 2 g uygulayın (unstabilde 1–2 dk içinde; stabil/tekrarlayan TdP’de 10–15 dk’da, ardından 0,5–1 g/saat infüzyon). (3) Serum K⁺ düzeyini >4,0–4,5 mEq/L’ye çıkarın. (4) QT uzatan ajanları (Droperidol, Ondansetron, Sevofluran → TIVA’ya geçmeyi düşün!) kesin. (5) Tekrarlayan bradikardi-bağımlı (pause-dependent) TdP’de transkutanöz/transvenöz Overdrive Pacing (hedef HR 90–110/dk) veya edinsel uzun QT’de İzoproterenol (2–10 mcg/dk) başlatın.',
          criticalNote: 'KRİTİK YASAK: Torsades de Pointes’te AMIODARON (ve Prokainamid/Sotalol) KESİNLİKLE VERME — QT aralığını daha da uzatarak refrakter VF fırtınasını tetikler!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'PRE-EKSİTASYONLU AF (WPW — DÜZENSİZ GENİŞ KOMPLEKS): AV BLOKER KESİN YASAK!',
          action: 'Çok hızlı (>200/dk), düzensiz ve değişken geniş QRS’li (FBI: Fast, Broad, Irregular) taşikardi = Pre-eksitasyonlu AF (WPW) olarak tanıyın! Unstabilse (veya şüphede) derhal Senkronize Kardiyoversiyon (120–200 J bifazik) uygulayın. Hemodinamik olarak stabilse aksesuar yolu bloke eden İV Prokainamid (20–50 mg/dk, maks 17 mg/kg; hipotansiyon veya QRS >%50 uzarsa dur!) veya İbutilid (1 mg IV 10 dk’da) kullanın.',
          criticalNote: 'ÖLÜMCÜL TUZAK: WPW’li AF’de ADENOZİN, VERAPAMİL, DİLTİAZEM, DİGOKSİN, β-BLOKER ve AMIODARON KESİNLİKLE KONTRENDİKEDİR! AV düğümün kapanması tüm atriyal uyarıların aksesuar yoldan ventriküle akmasına ve ani VENTRİKÜLER FİBRİLASYONA yol açar!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 6,
          title: 'STABİL MONOMORFİK VT & STABİL DAR-KOMPLEKS SVT / HIZLI AF YÖNETİMİ',
          action: 'Stabil Monomorfik VT: Amiodaron 150 mg IV 10 dk’da infüzyon (gerekirse tekrar → 1 mg/dk 6 sa → 0,5 mg/dk 18 sa) veya Prokainamid (20–50 mg/dk) — yanıt yoksa veya hemodinami bozulursa senkronize kardiyoversiyon! Stabil Düzenli Dar SVT: Vagal manevra (modifiye Valsalva) → Adenozin 6 mg hızlı IV puşe + 20 mL SF flaş → yanıt yoksa 12 mg (santral hat/kalp nakli: 3 mg). Stabil Hızlı AF (WPW dışlandıysa!): Önce ağrı/hipovolemi/elektroliti düzelt; hız kontrolü için Esmolol (0,5 mg/kg → 50–200 mcg/kg/dk), Metoprolol (2,5–5 mg IV), Diltiazem (0,25 mg/kg IV) veya düşük EF’de Amiodaron 150 mg IV.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'İNTRAOPERATİF GERİ DÖNDÜRÜLEBİLİR TETİKLEYİCİLERİ TARA & TEDAVİ ET',
          action: 'Acil arter kan gazı ve elektrolit gönderin: Hipoksi/hiperkapniyi düzeltin; Hiperkalemi varsa (K⁺ >6,0 / geniş QRS) DERHAL Kalsiyum Klorür 1 g (veya Ca Glukonat 3 g) + İnsülin/Dekstroz verin; Hipokalemi (<4,0) ve Hipomagnezemi (<2,0) varsa KCl + MgSO₄ replasmanı yapın. Akut miyokard iskemisi, LAST (%20 Lipid Emülsiyonu!), Malign Hipertermi (Dantrolen!), gerilim pnömotoraks, tamponad, feokromositoma veya yüksek doz lokal adrenalin emilimini sistemik olarak dışlayın.',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'ARİTMİ SONRASI STABİLİZASYON, 12-DERİVASYON EKG & KARDİYOLOJİ KONSÜLTASYONU',
          action: 'Sinüs ritmi sağlandığında 12-derivasyon EKG çekin (QTc süresi, ST-T iskemisi, delta dalgası/WPW, Brugada paterni kontrolü!), kardiyak troponin (hs-cTn) ve elektrolit takibi yapın. Cerrahi kararını (devam vs sonlandırma) ekipçe verin; tekrarlayan malign aritmi veya arrest sonrası hastayı sürekli telemetri ve Kardiyoloji/Elektrofizyoloji konsültasyonuyla YBÜ’ye transfer edin.',
          priority: 'MEDIUM'
        }
      ],
      structuredCrisisBlocks: {
        tieredLadder: {
          title: 'Malign Taşiaritmi Aciliyet & Müdahale Merdiveni',
          accent: 'red',
          levels: [
            {
              badge: 'BASAMAK 1 · STABİL TAŞİARİTMİ',
              target: 'MAP ≥65, İskemi/Şok Yok (Dar SVT, Hızlı AF veya Stabil VT)',
              presentation: 'Perfüzyon korunmuş; ritim düzenli dar SVT, hızlı AF veya hemodinamik olarak tolere edilen monomorfik VT.',
              intervention: 'Tetikleyiciyi düzelt (O₂, ağrı, volüm, K⁺/Mg²⁺). Düzenli dar SVT: Adenozin 6→12 mg; Stabil AF: Esmolol/Metoprolol/Diltiazem; Stabil VT: Amiodaron 150 mg (10 dk) veya Prokainamid.',
              severity: 'WARNING'
            },
            {
              badge: 'BASAMAK 2 · UNSTABİL DAR SVT / HIZLI AF',
              target: 'QRS <120 ms + Hipotansiyon / İskemi / Pulmoner Ödem',
              presentation: 'Hızlı (>150/dk) dar-kompleks taşikardiye bağlı hızla düşen MAP, artan CVP veya ST depresyonu.',
              intervention: 'DERHAL Senkronize Kardiyoversiyon (SYNC açık!): Düzenli SVT / Flutter için 50–100 J; Düzensiz Hızlı AF için 120–200 J bifazik!',
              severity: 'HIGH'
            },
            {
              badge: 'BASAMAK 3 · UNSTABİL MONOMORFİK VT / WPW-AF',
              target: 'Geniş QRS (≥120 ms) + Hemodinamik Bozulma veya FBI Paterni',
              presentation: 'Düzenli geniş QRS (VT) veya çok hızlı düzensiz değişken geniş QRS (Pre-eksitasyonlu AF / WPW).',
              intervention: 'Senkronize Kardiyoversiyon (Monomorfik VT: 100→150→200 J; WPW-AF: 120–200 J). WPW-AF’de stabilse Prokainamid — AV DÜĞÜM BLOKERLERİ KESİN YASAK!',
              severity: 'CRITICAL'
            },
            {
              badge: 'BASAMAK 4 · TORSADES & NABIZSIZ VT / VF',
              target: 'Polimorfik VT (Uzun QT) veya Nabızsız Arrest Ritimleri',
              presentation: 'Ekseni dönen polimorfik VT (TdP) veya nabız/arter trasesinin kaybolduğu pVT/VF.',
              intervention: 'SENKRONİZE OLMAYAN Defibrilasyon (150–200 J) + KPR! Torsades’ta İV MgSO₄ 2 g + K⁺ >4,0 + Overdrive Pacing (Amiodaron YASAK!). pVT/VF’de Adrenalin 1 mg + Amiodaron 300 mg / Lidokain.',
              severity: 'CRITICAL'
            }
          ]
        },
        comparisonTable: {
          title: 'İntraoperatif Kritik Taşiaritmi Fenotiplerinin Karşılaştırması',
          columns: ['Aritmi Tipi', 'EKG Karakteristiği', 'Unstabil / Nabızsız Tedavi', 'Stabil Farmakoterapi', 'Kesin Tuzak / Yasak İlaç'],
          rows: [
            {
              col1: 'Nabızsız VT / VF',
              col2: 'Kaotik VF dalgaları veya nabızsız hızlı geniş QRS; arter/EtCO₂ düz',
              col3: '150–200 J Senkronize OLMAYAN Defibrilasyon + kesintisiz KPR',
              col4: 'Adrenalin 1 mg (2. şok sonrası), Amiodaron 300→150 mg veya Lidokain 1–1,5 mg/kg',
              col5: 'Şok sonrası nabız kontrolü için KPR’yi geciktirme; LAST ise Lipid ver, Lidokain VERME!'
            },
            {
              col1: 'Monomorfik VT (Nabızlı)',
              col2: 'Düzenli, tek tip geniş QRS (≥120 ms), HR >150/dk, AV disosiyasyon',
              col3: 'Senkronize Kardiyoversiyon: 100 J → 150 J → 200 J bifazik',
              col4: 'Amiodaron 150 mg IV (10 dk) veya Prokainamid (20–50 mg/dk)',
              col5: '“Aberran SVT olabilir” diyerek Verapamil/Diltiazem vermek VT’de kardiyak arrest yapar!'
            },
            {
              col1: 'Torsades de Pointes (TdP)',
              col2: 'İzoelektrik eksen etrafında dönen polimorfik geniş QRS + bazal QTc >480–500 ms',
              col3: 'Senkronize OLMAYAN Defibrilasyon (150–200 J) + İV MgSO₄ 2 g (1–2 dk)',
              col4: 'İV MgSO₄ 2 g (10–15 dk) + K⁺ >4,0–4,5 + Overdrive Pacing / İzoproterenol (edinsel LQTS)',
              col5: 'AMIODARON (ve Sotalol/Prokainamid) KESİN YASAK — QT’yi uzatıp TdP fırtınasını alevlendirir!'
            },
            {
              col1: 'Pre-Eksitasyonlu AF (WPW)',
              col2: 'Çok hızlı (>200/dk), DÜZENSİZ R-R, GENİŞ ve değişken QRS morfolojisi (“FBI”)',
              col3: 'Senkronize Kardiyoversiyon: 120–200 J bifazik',
              col4: 'İV Prokainamid (20–50 mg/dk) veya İbutilid (1 mg 10 dk’da)',
              col5: 'AV DÜĞÜM BLOKERLERİ (Adenozin, Verapamil, Diltiazem, Digoksin, β-bloker, Amiodaron) KESİN YASAK → VF!'
            },
            {
              col1: 'Dar-Kompleks SVT / Hızlı AF',
              col2: 'QRS <120 ms; düzenli (AVNRT/AVRT/Flutter) veya düzensiz (AF)',
              col3: 'Senkronize Kardiyoversiyon: SVT 50–100 J; Hızlı AF 120–200 J',
              col4: 'Düzenli SVT: Vagal → Adenozin 6→12 mg; Hızlı AF: Esmolol / Metoprolol / Diltiazem',
              col5: 'Kalp naklinde veya santral hattan Adenozin verilecekse dozu 3 mg’a düşür (uzun asistoli riski)!'
            }
          ]
        },
        drugPolicyCards: {
          title: 'Malign Aritmi Kritik İlaç Politikaları & Kırmızı Çizgiler',
          items: [
            {
              domain: 'İV Magnezyum Sülfat (2 g IV)',
              recommendation: 'Torsades de Pointes’te (polimorfik VT + uzun QT) serum Mg²⁺ düzeyi normal olsa dahi İLK TERCİH spesifik tedavidir (unstabilde 1–2 dk, stabilde 10–15 dk).',
              rationaleAndCaution: 'Erken afterdepolarizasyonları (EAD) bloke ederek Torsades’ı sonlandırır; QT aralığını kısaltmasa da re-entry tetiklenmesini durdurur. Hızlı enjeksiyonda geçici hipotansiyon/flushing yapabilir.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Amiodaron (300 mg Arrest / 150 mg Stabil VT)',
              recommendation: 'Refrakter VF/pVT ve hemodinamik stabil monomorfik VT’de (özellikle yapısal kalp hastalığı / düşük EF’de) güçlü birinci basamak antiaritmiktir.',
              rationaleAndCaution: 'Torsades de Pointes (uzun QT’yi daha da uzatır!) ve WPW / Pre-eksitasyonlu AF’de (AV düğüm blokajı ile VF riski!) KESİNLİKLE KULLANILMAZ!',
              status: 'CAUTION'
            },
            {
              domain: 'AV Düğüm Blokerleri (WPW / Pre-Eksitasyonlu AF’de)',
              recommendation: 'Adenozin, Verapamil, Diltiazem, Digoksin, β-bloker ve Amiodaron pre-eksitasyonlu AF’de (düzensiz geniş kompleks taşikardi) KESİNLİKLE YASAKTIR!',
              rationaleAndCaution: 'AV düğümü bloke ederek tüm hızlı atriyal impulsların (300–400/dk) aksesuar yoldan (Kent demeti) ventriküle geçişine ve ani Ventriküler Fibrilasyona neden olur.',
              status: 'AVOID'
            },
            {
              domain: 'Prokainamid (20–50 mg/dk IV, maks 17 mg/kg)',
              recommendation: 'Hemodinamik olarak stabil Pre-eksitasyonlu AF (WPW) ve yapısal kalp hastalığı olmayan stabil monomorfik VT’de en güvenli farmakolojik seçenektir.',
              rationaleAndCaution: 'Aksesuar yolun refrakter periyodunu uzatır. Hipotansiyon gelişirse, QRS bazale göre >%50 genişlerse veya aritmi sonlanırsa infüzyon hemen durdurulmalıdır; uzun QT/TdP’de kullanılmaz.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Adenozin (6 mg → 12 mg Hızlı IV Puşe)',
              recommendation: 'Stabil düzenli dar-kompleks SVT’de (AVNRT/AVRT) birinci basamak ajandır; geniş çaplı proksimal venden hızlı puşe + 20 mL SF flaş ile verilir.',
              rationaleAndCaution: 'Düzensiz geniş-kompleks taşikardide (WPW-AF) YASAKTIR! Ciddi astım/bronkospazmda dikkat; kalp nakli, Dipiridamol kullanımı veya santral hattan uygulanırken başlangıç dozunu 3 mg’a düşür.',
              status: 'CAUTION'
            }
          ]
        },
        preventionBox: {
          title: 'İntraoperatif Malign Aritmi Önleme & Güvenli Kardiyoversiyon Kontrol Listesi',
          highlightRule: 'Kural: Monitörde VF/VT gördüğünde İLK 3 SANİYEDE arter trasesi, SpO₂ pletismografisi ve EtCO₂’ye bak (koter/artefaktı dışla!); gerçekse ve nabız yoksa 60 saniye içinde şokla!',
          checks: [
            'Elektrolit Kalkanı: Kardiyak riskli, diüretik kullanan veya uzun QT’li hastalarda ameliyat öncesi ve sırasında serum K⁺ ≥4,0 mEq/L ve Mg²⁺ ≥2,0 mg/dL hedeflenmelidir.',
            'Uzun QT (LQTS) Anestezi Güvenliği: Bazal QTc >470–500 ms olan hastalarda Droperidol, Haloperidol, yüksek doz Ondansetron ve derin Sevofluran maruziyetinden kaçın (Propofol TIVA + Deksametazon antiemezis tercih et!), defibrilatör pedlerini önceden yapıştır.',
            'Santral Kateter Kılavuz Teli (Guidewire) Derinliği: İnternal juguler/subklavyen kateterizasyonda guidewire’ı 15–18 cm’den fazla ilerletme; monitörde yeni PVC/VT çıktığı an teli 3–5 cm geri çek!',
            'Kalp Pili / ICD & Elektrokoter Güvenliği: Bipolar koter tercih et, topraklama plağını göğüsten uzak yerleştir, ICD şok tedavisini programlayıcı/mıknatıs ile yönet ve işlem boyunca harici defibrilatör/pacing pedlerini hazır tut.'
          ]
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'İntraoperatif taşiaritmiler üç temel elektrofizyolojik mekanizmadan doğar: (1) Re-entry (yeniden giriş — iskemik skar dokusu, aksesuar yol [WPW] veya AV düğüm çift yolunda dairesel uyarım; monomorfik VT, VF, AVNRT/AVRT ve flutter’ın ana mekanizması), (2) Tetiklenmiş Aktivite (Triggered Activity — uzamış aksiyon potansiyeli faz 2/3’te gelişen Erken Afterdepolarizasyonlar [EAD → Torsades de Pointes] veya Ca²⁺ yüklenmesi/digoksin/katekolamin fazlalığında Geç Afterdepolarizasyonlar [DAD]) ve (3) Artmış Otomatisite (katekolamin fırtınası, hipoksi, asidoz, hipokalemi, mekanik gerilim).',
      stepsTitle: 'Elektrofizyolojik Tetiklenme → Hemodinamik Çöküş Kaskadı',
      flowType: 'vicious-cycle',
      cycleWarning: 'Çok yüksek ventrikül hızı (>160–200/dk) → diyastolik doluş süresinin ve atriyal kick’in kaybı → koroner perfüzyon çöküşü → derinleşen miyokardiyal iskemi ve asidoz → refrakter VF kısır döngüsü!',
      cascadeSteps: [
        {
          phase: '1. Substrat + İntraoperatif Tetikleyici Buluşması',
          mechanism: 'Altta yatan koroner skar, uzun QT veya aksesuar yol (WPW) zemininde hipoksi, elektrolit dengesizliği (K⁺/Mg²⁺), iskemi, QT uzatan ilaçlar, LAST veya kateter irritasyonu membran stabilitesini bozar.',
          badge: 'SUBSTRAT + TETİK',
          color: 'amber'
        },
        {
          phase: '2. Re-Entry veya EAD/DAD Patlaması',
          mechanism: 'İskemik sınırda re-entry halkası (monomorfik VT), repolarizasyon gecikmesiyle EAD’ler (Torsades de Pointes) veya WPW’de aksesuar yoldan kontrolsüz hızlı iletim (pre-eksitasyonlu AF) başlar.',
          badge: 'MALİGN RİTİM',
          color: 'purple'
        },
        {
          phase: '3. Diyastolik Doluş & Atriyal Kick Kaybı',
          mechanism: 'Ventrikül hızı 160–250/dk’ya çıktığında diyastol neredeyse sıfırlanır; atım hacmi (SV) ve koroner kan akımı hızla düşerek akut hipotansiyon, pulmoner konjesyon ve EtCO₂ düşüşü yaratır.',
          badge: 'DEKOLLAPS / İSKEMİ',
          color: 'red'
        },
        {
          phase: '4. Ventriküler Fibrilasyon & Kardiyak Arrest',
          mechanism: 'Hızlı elektriksel tedavi (defibrilasyon/kardiyoversiyon) veya yanlış ilaç seçimi (WPW’de AV bloker, TdP’de Amiodaron) düzeltilmezse organize ritim kaotik VF’ye ve dolaşım durmasına ilerler.',
          badge: 'VF / ARREST',
          color: 'rose'
        }
      ],
      summaryText: 'Elektriksel kardiyoversiyon ve defibrilasyon tüm miyokard hücrelerini aynı anda depolarize ederek re-entry halkalarını sıfırlar ve sinüs düğümüne kontrolü geri verir. Ancak altta yatan intraoperatif tetikleyici (iskemi, hipokalemi/hipomagnezemi, LAST, kateter teli) düzeltilmezse malign aritmi dakikalar içinde tekrarlayacaktır.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'Sık multifokal PVC’ler, R-on-T fenomeni, non-sustained VT (NSVT) atakları veya EKG’de giderek uzayan QTc (>480–500 ms)',
        'Ani başlayan hızlı dar-kompleks (>150/dk) veya geniş-kompleks taşikardi',
        'Santral kateter kılavuz teli ilerletilirken veya cerrahi manipülasyonda tetiklenen ventriküler ektopi salvosu',
        'İnvaziv arter trasesinde nabız basıncının aniden daralması ve sistolik basıncın dalgalanması'
      ],
      progressingSigns: [
        'Hemodinamik instabilite: MAP <65 mmHg / SKB <90 mmHg, yeni ST depresyonu/elevasyonu ve CVP artışı',
        'EtCO₂’de ani belirgin düşüş (azalmış pulmoner kan akımı ve kardiyak debi göstergesi)',
        'Uyanık/rejyonal hastada göğüs ağrısı, çarpıntı, baş dönmesi, presenkop, soğuk terleme ve ani dispne',
        'Tekrarlayan Torsades de Pointes salvosu (kısa-uzun-kısa döngü sonrası polimorfik VT)'
      ],
      lateSigns: [
        'Nabızsız VT veya kaotik Ventriküler Fibrilasyon (VF)',
        'İnvaziv arter dalga formunun ve SpO₂ pletismografisinin tamamen düzleşmesi, EtCO₂’nin <10 mmHg’ye çökmesi',
        'Bilinç kaybı, solunum durması ve kardiyak arrest',
        'Elektriksel fırtına (24 saatte ≥3 tekrarlayan VT/VF atağı — acil derin sedasyon, iskemi/elektrolit düzeltmesi, stellat ganglion bloğu veya kateter ablasyon/ECMO gereksinimi!)'
      ],
      specialAlertTitle: 'İki Ölümcül İatrojenik Aritmi Tuzağı: Torsades’ta Amiodaron & WPW’de AV Bloker!',
      specialAlertContent: 'İntraoperatif geniş-kompleks taşikardide tüm ilaçlar her ritme uymaz: (1) Uzun QT zeminindeki Polimorfik VT’ye (Torsades) Amiodaron vermek QT’yi daha da uzatıp durdurulamaz VF fırtınası yaratır (tedavi: İV MgSO₄ 2 g + defibrilasyon + overdrive pacing!). (2) Düzensiz geniş-kompleks taşikardide (WPW Pre-eksitasyonlu AF) Adenozin, Verapamil, Diltiazem, Digoksin, β-bloker veya Amiodaron vermek AV düğümü kapatıp VF’ye sürükler (tedavi: Senkronize Kardiyoversiyon veya Prokainamid!).'
    },

    // 7) Önleyici Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Preoperatif 12-derivasyon EKG’de bazal QTc süresi (>450 ms erkek / >460 ms kadın), WPW (kısa PR + delta dalgası), Brugada paterni, yapısal kalp hastalığı, geçirilmiş MI ve ICD/kalp pili varlığı mutlaka taranmalıdır.',
        'Kardiyak riskli, kronik diüretik/digoksin kullanan veya bağırsak hazırlığı yapılan hastalarda preoperatif serum K⁺ (≥4,0 mEq/L) ve Mg²⁺ (≥2,0 mg/dL) optimize edilmelidir.',
        'Konjenital uzun QT sendromlu (LQTS) hastalarda kronik β-bloker tedavisi ameliyat sabahı KESİNLİKLE DEVAM EDİLMELİ ve tüm QT uzatan anestezik/antiemetik ilaçlar listeden çıkarılmalıdır.',
        'ICD / Kalp Pili taşıyan hastalarda cihaz kartı, üretici firması, pil bağımlılığı ve elektrokoter/mıknatıs yanıtı preoperatif kardiyoloji/elektrofizyoloji ile netleştirilmelidir.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Yüksek Aritmi Riskli Hastada Ameliyathane Hazırlığı',
        steps: [
          'Yüksek riskli (ciddi EF düşüklüğü, geçirilmiş VT/VF, LQTS, Brugada, WPW veya ICD devre dışı bırakılan) hastalarda indüksiyon ÖNCESİ çok fonksiyonlu defibrilasyon/pacing pedlerini ön-arka (AP) veya ön-yan pozisyonda yapıştırın.',
          'Bifazik defibrilatörün SYNC düğmesinin, enerji seçiminin ve şarj fonksiyonunun çalıştığını ameliyat öncesi test edin.',
          '5-derivasyon EKG (D2 + V5), sürekli invaziv arter monitörizasyonu ve acil elektrolit/kan gazı erişimini hazır tutun.',
          'LQTS hastalarında Propofol bazlı TIVA + normokapni + normotermi + derin analjezi planlayın; Süksinilkolin, Droperidol, Ondansetron ve sempatomimetik dalgalanmalardan kaçının.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Santral venöz kateter yerleştirirken kılavuz tel derinliğinin (≤15–18 cm) sıkı kontrolü ve sürekli sesli EKG monitörizasyonu',
        'Anestezi indüksiyonu ve entübasyon sırasında derin hipoksi, hiperkapni ve aşırı sempatik yanıtın engellenmesi',
        'Lokal anestezik + adrenalin infiltrasyonlarında cerrahla maksimum güvenli doz (LAST ve adrenalin toksisitesi sınırları) teyidi'
      ],
      cartTitle: 'Malign Aritmi & Elektrokardiyoversiyon Acil Hazırlık Listesi:',
      cartChecklist: [
        'Bifazik Defibrilatör / Senkronize Kardiyoverter + Transkutanöz Pacing (TCP) Pedleri',
        'Amiodaron (150 mg ampul × 3–4) & Lidokain (%2 — 100 mg ampul × 3)',
        'Magnezyum Sülfat (MgSO₄ — %15 1,5 g ampul × 2–4; Torsades için 2 g hazır!)',
        'Adenozin (6 mg flakon × 3) + 20 mL Hızlı SF Flaş Enjektörleri + 3 Yollu Musluk',
        'Prokainamid (stabil WPW-AF / VT) & Esmolol / Metoprolol / Diltiazem (stabil SVT/AF)',
        'Kalsiyum Klorür (%10 1 g) / Kalsiyum Glukonat (hiperkalemi!), Adrenalin (1 mg) & %20 Lipid Emülsiyonu (LAST)'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'İntraoperatif defibrilasyon, kardiyoversiyon, Torsades de Pointes veya sürekli VT yaşayan tüm hastalar en az 24–48 saat sürekli EKG telemetrisi altında YBÜ / Koroner YBÜ’de izlenmelidir.',
      recurrenceRate: 'Altta yatan iskemi, elektrolit bozukluğu (K⁺/Mg²⁺) veya ilaç ilişkili QTc uzaması devam ettiği sürece ilk 24–48 saatte erken aritmi nüksü ve elektriksel fırtına riski yüksektir.',
      recurrenceRiskBadge: 'İLK 24–48 SAAT NÜKS & ELEKTRİKSEL FIRTINA RİSKİ',
      maintenanceTherapy: 'İdame antiaritmik (başarılı Amiodaron bolusundan sonra 1 mg/dk 6 sa → 0,5 mg/dk 18 sa; TdP’de MgSO₄ infüzyonu 0,5–1 g/sa), elektrolit hedefi (K⁺ >4,0 mEq/L, Mg²⁺ >2,0 mg/dL), iskemi/ağrı kontrolü ve QT uzatan tüm ilaçların yasaklanması.',
      monitoringParameters: [
        'Sürekli çok kanallı EKG telemetrisi ve 12-derivasyon EKG’de seri QTc, QRS ve ST-segment takibi',
        'Seri serum elektrolitleri (K⁺, Mg²⁺, iyonize Ca²⁺) ve arteriyel kan gazı (pH, PaO₂, PaCO₂, laktat)',
        'Seri yüksek duyarlıklı kardiyak troponin (hs-cTn — altta yatan akut koroner sendrom dışlaması!)',
        'Transtorasik Ekokardiyografi (LVEF, duvar hareket bozukluğu, kapak patolojisi ve kardiyomiyopati taraması)',
        'Kardiyoversiyon/defibrilasyon sonrası cilt yanığı, aspirasyon ve post-resüsitasyon nörolojik durum izlemi'
      ],
      expectedComplications: [
        'Tekrarlayan VT/VF atakları (elektriksel fırtına) ve kardiyojenik şok',
        'Uzamış arrest veya refrakter hipotansiyona bağlı hipoksik-iskemik beyin hasarı ve akut böbrek hasarı',
        'Yeni başlangıçlı >48 saat süren AF’de tromboembolik inme riski (kardiyoversiyon sonrası antikoagülasyon değerlendirmesi)',
        'Amiodaron infüzyonuna bağlı flebit, hipotansiyon veya bradikardi/AV blok',
        'Kardiyak kontüzyon, kot kırığı (KPR sonrası) veya yanlış senkronizasyonla R-on-T VF indüksiyonu'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: '12-Derivasyon Sinüs Ritmi EKG & Kardiyoloji / Elektrofizyoloji Konsültasyonu',
          description: 'Gizli WPW (delta dalgası), Brugada sendromu, konjenital/edinsel uzun QT, ARVC veya iskemik Q dalgalarının tespiti ve ICD/ablasyon gereksiniminin belirlenmesi.'
        },
        {
          testName: 'Koroner Anjiyografi (İskemi Şüphesinde)',
          description: 'Açıklanamayan polimorfik VT/VF veya yeni ST değişikliği eşlik eden monomorfik VT’de akut koroner arter hastalığının kesin dışlanması ve revaskülarizasyonu.'
        },
        {
          testName: 'Transtorasik EKO / Kardiyak MRG (Yapısal Kalp Hastalığı Tarama)',
          description: 'LVEF tayini, geçirilmiş sessiz infarkt skarı veya infiltratif/hipertrofik kardiyomiyopati araştırması.'
        }
      ],
      prognosisSummary: 'İntraoperatif malign aritmiler ameliyathanenin anlık monitörizasyon ve erken defibrilasyon avantajı sayesinde hızla tanınıp doğru yönetildiğinde (Torsades’ta MgSO₄, WPW’de AV blokerden kaçınma, pVT/VF’de <1 dk defibrilasyon ve tetikleyicinin giderilmesi) yüksek sağkalım ve tam nörolojik iyileşme ile sonuçlanır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Torsades de Pointes: İV Magnezyum 2 g + Defibrilasyon — AMIODARON YASAK!',
        takeaway: 'Uzun QT zemininde polimorfik VT (Torsades) gördüğünde serum Mg²⁺ normal olsa bile derhal 2 g İV MgSO₄ ver, unstabilse senkronize OLMAYAN defibrilasyon yap ve K⁺ >4,0 hedefle. Amiodaron QT’yi daha da uzatıp Torsades fırtınasını büyütür — edinsel uzun QT’de overdrive pacing veya İzoproterenol kullan!',
        category: 'Kritik Doz'
      },
      {
        title: 'WPW (Pre-Eksitasyonlu AF — “FBI”): AV Düğüm Blokerleri ÖLÜMCÜLDÜR!',
        takeaway: 'Hızlı (>200/dk), DÜZENSİZ ve GENİŞ kompleksli (değişken QRS) taşikardi = Pre-eksitasyonlu AF! Adenozin, Verapamil, Diltiazem, Digoksin, β-bloker ve Amiodaron AV düğümü tıkayıp impulsları aksesuar yola yönlendirerek ani VF tetikler. Tedavi: Senkronize Kardiyoversiyon (120–200 J) veya stabilse Prokainamid!',
        category: 'Tuzak'
      },
      {
        title: 'Koter / Elektrot Artefaktı (“Sahte VF”): Şoklamadan Önce Arter & EtCO₂’ye Bak!',
        takeaway: 'Ameliyathanede elektrokoter EMI veya gevşek kablo monitörde birebir VF görüntüsü oluşturabilir. Arter trasesi, SpO₂ pletismografisi ve EtCO₂ normalse hasta VF’de DEĞİLDİR — normal sinüs ritmindeki hastayı şoklamak gerçek VF indükler!',
        category: 'Ezber Bozan'
      },
      {
        title: 'Monomorfik VT’de Senkronize Kardiyoversiyon (100 J) vs Nabızsız VT’de Defibrilasyon (200 J)',
        takeaway: 'Nabızlı unstabil monomorfik VT’de mutlaka SYNC düğmesine basıp 100 J ile senkronize kardiyoversiyon yap (R-on-T VF’yi önler). Ancak nabızsız VT/VF veya polimorfik VT’de (Torsades) SYNC kapatılıp doğrudan 150–200 J defibrilasyon uygulanır!',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Santral Kateter Aritmisi & Hiperkalemi/LAST Özel İstisnaları',
        takeaway: 'Santral kateter takarken VT çıktığında ilk refleks ilaç değil, kılavuz teli 3–5 cm geri çekmektir! Rejyonal blok sonrası VF/VT’de LAST’ı düşün (%20 Lipid Emülsiyonu ver, Lidokain VERME!); masif transfüzyon/süksinilkolin sonrası geniş QRS’te önce IV Kalsiyum ver!',
        category: 'Tuzak'
      }
    ],

    // 10) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'Panchal AR, Bartos JA, Cabañas JG, et al.; AHA Adult Basic and Advanced Life Support Writing Group.',
        title: 'Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.',
        journal: 'Circulation. 2020;142(16_suppl_2):S366–S468.',
        year: '2020',
        relevance: 'Nabızsız VT/VF defibrilasyon-ilaç algoritması, unstabil taşikardide senkronize kardiyoversiyon enerjileri ve stabil taşiaritmi yönetimi.'
      },
      {
        authors: 'Soar J, Böttiger BW, Carli P, et al.',
        title: 'European Resuscitation Council Guidelines 2021: Adult advanced life support.',
        journal: 'Resuscitation. 2021;161:115–151.',
        year: '2021',
        relevance: 'ERC 2021 peri-arrest taşiaritmi algoritmaları, bifazik şok stratejileri ve geri döndürülebilir nedenler (4H–4T).'
      },
      {
        authors: 'Zeppenfeld K, Tfelt-Hansen J, de Riva M, et al.; ESC Scientific Document Group.',
        title: '2022 ESC Guidelines for the management of patients with ventricular arrhythmias and the prevention of sudden cardiac death.',
        journal: 'European Heart Journal. 2022;43(40):3997–4126.',
        year: '2022',
        relevance: 'Monomorfik VT, Torsades de Pointes (MgSO₄, overdrive pacing, İzoproterenol), uzun QT ve elektriksel fırtına yönetimi.'
      },
      {
        authors: 'Joglar JA, Chung MK, Armbruster AL, et al.',
        title: '2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation.',
        journal: 'Circulation. 2024;149(1):e1–e156.',
        year: '2024',
        relevance: 'Perioperatif hızlı atriyal fibrilasyon hız/ritim kontrolü ve pre-eksitasyonlu AF’de (WPW) AV düğüm blokerlerinin kesin kontrendikasyonu.'
      },
      {
        authors: 'Page RL, Joglar JA, Caldwell MA, et al.',
        title: '2015 ACC/AHA/HRS Guideline for the Management of Adult Patients With Supraventricular Tachycardia.',
        journal: 'Circulation. 2016;133(14):e506–e574.',
        year: '2016',
        relevance: 'Dar-kompleks SVT (Adenozin, vagal manevralar) ve WPW sendromlu pre-eksitasyonlu taşiaritmilerin akut tedavi standartları.'
      },
      {
        authors: 'Moitra VK, Einav S, Thies KC, et al.',
        title: 'Cardiac Arrest in the Operating Room: Resuscitation and Management for the Anesthesiologist: Part 1.',
        journal: 'Anesthesia & Analgesia. 2018;126(3):876–888.',
        year: '2018',
        relevance: 'Ameliyathaneye özgü aritmi/arrest tetikleyicileri (LAST, MH, hiperkalemi, kateter irritasyonu, iskemi) ve anesteziyoloji liderliği.'
      }
    ],
    relatedLinks: [
      { label: 'Perioperatif Kardiyak Arrest & ACLS', href: '#arac=emergencies&sub=acls', badge: 'KPR / Defib' },
      { label: 'İntraoperatif Miyokard İnfarktüsü (PMI/MINS)', href: '#arac=emergencies&sub=intraop-mi', badge: 'İskemik Tetik' },
      { label: 'İntraoperatif Bradikardi & AV Blok', href: '#arac=emergencies&sub=intraop-bradycardia', badge: 'Bradikardi / Pacing' },
      { label: 'LAST (Lokal Anestezik Toksisitesi)', href: '#arac=emergencies&sub=last', badge: 'Lipid Kurtarma' },
      { label: 'Magnezyum Sülfat (MgSO₄) İlaç Monografı', href: '#tedavi=magnesium', badge: 'İlaç Kartı' },
      { label: 'Potasyum Klorür (KCl) & Elektrolit Tedavisi', href: '#tedavi=potassium', badge: 'İlaç Kartı' }
    ]
  },

  'intraop-bradycardia': {
    id: 'intraop-bradycardia',
    // 1) Başlık
    title: 'İntraoperatif Bradikardi & Yüksek Dereceli AV Blok Kriz Protokolü',
    subTitle: 'Cerrahi Vagal Refleksler (OCR / TCR / Pnömoperitonyum) · Bezold-Jarisch · Mobitz II / Tam AV Blok & Transkutanöz Pacing',
    codeColor: 'amber',
    severityBadge: 'KOD AMBER / KIRMIZI · SEMPTOMATİK BRADİKARDİ · TAM AV BLOK & ASİSTOLİ RİSKİ',
    keyCallout: 'İntraoperatif HR <50/dk + hipotansiyon/hipoperfüzyon veya ani asistoli duraklaması: (1) ÖNCE CERRAHİ VAGAL UYARANI DERHAL DURDUR (pnömoperitonyum dekompresyonu, göz kası/OCR, trigeminal/TCR, mezenter traksiyonu!) ve %100 O₂ + ventilasyonu kontrol et (ÇOCUKTA EN SIK NEDEN HİPOKSİDİR!). (2) Erişkin semptomatik sinüs/Mobitz I bradikardisinde AHA 2020 ACLS: ATROPİN 1 mg IV (her 3–5 dk, maks 3 mg — 2020’de 0,5 mg’dan 1 mg’a çıkarıldı!). (3) 4 KRİTİK ATROPİN İSTİSNASI: Mobitz Tip II / 3. Derece Tam AV Blok (doğrudan TCP + Adrenalin/Dopamin!), Kalp Nakli Denerve Kalp (Atropin ETKİSİZ → İzoproterenol/Adrenalin/TCP!), Pediatrik Bradikardi HR <60 + Kötü Perfüzyon (Önce %100 O₂ → KPR + Adrenalin 10 mcg/kg; Atropin 0,02 mg/kg — eski 0,1 mg minimumu KALDIRILDI!) ve KİBAS/Cushing Refleksi (Atropin VERME, KİBAS’ı tedavi et!).',
    quickCalculatorType: 'intraop-bradycardia',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'İntraoperatif bradikardi, erişkinde kalp hızının <50/dk’ya (bazı kaynaklarda <60/dk veya bazalin >%20–30 altına) düşmesidir; klinik aciliyet, hemodinamik bozulmanın (MAP <65 mmHg, organ hipoperfüzyonu, iskemik EKG değişikliği, bilinç bulanıklığı) veya asistoliye ilerleme riski yüksek iletim bozukluklarının (Mobitz Tip II 2. derece AV blok, 3. derece tam AV blok, >3 sn sinüs duraklamaları) eşlik etmesiyle tanımlanır. Ameliyathanede bradikardi sıklıkla cerrahi vagal refleksler, nöroaksiyel sempatik blokaj, hipoksi (özellikle pediatride) ve anestezik ilaç sinerjilerinin ortak sonucudur.',
      epidemiology: 'Genel anestezi sırasında anlamlı bradikardi insidansı %5–15 arasında değişirken, şaşılık cerrahisinde Okülokardiyak Refleks (OCR) %30–90 oranında görülür. Spinal anestezi altında ani bradikardi insidansı %10–13 olup ciddi vagal/Bezold-Jarisch deşarjı tedavi edilmezse 1:1.500–1:3.000 oranında ani spinal kardiyak arreste ilerleyebilir (Pollard, Anesth Analg 2001). Pediatrik perioperatif arrestlerde ise bradikardi en sık görülen ön-arrest ritmidir ve olguların büyük çoğunluğunda primer neden hipoksemidir.',
      triggers: [
        'Cerrahi Vagal & Kraniyal Refleksler: Laparoskopik CO₂ pnömoperitonyumu (peritoneal gerilim + IVC basısı), mezenterik/peritoneal/servikal/rektal traksiyon, Okülokardiyak Refleks (OCR — göz dışı kas traksiyonu/glob basısı), Trigemino-kardiyak Refleks (TCR — beyin/kafa tabanı/maksillofasiyal cerrahi), karotis sinüs manipülasyonu, laringoskopi ve bronkoskopi',
        'Nöroaksiyel Yüksek Blok & Bezold-Jarisch Refleksi: T1–T4 kardiyoakceleratör sempatik lif blokajı + venöz göllenmeye bağlı “boş ama hiperkontraktil sol ventrikül” mekanoreseptör uyarımı (ani derin bradikardi + vazodilatasyon → asistoli!)',
        'Farmakolojik Ajanlar & Toksisiteler: Deksmedetomidin, Remifentanil ve yüksek doz opioidler, Süksinilkolin (özellikle 2. dozda veya çocuklarda M₂ muskarinik etki!), Neostigmin (yetersiz antikolinerjikle), Sugammadeks (nadir ama ani ağır bradikardi/asistoli!), β-bloker / Kalsiyum Kanal Blokeri (Verapamil/Diltiazem) / Digoksin toksisitesi ve derin volatil/Propofol sinerjisi',
        'Sistemik & Kardiyak Patolojiler: HİPOKSİ (pediatride 1 numara!), akut inferior miyokard infarktüsü (RCA/AV düğüm iskemisi!), hiperkalemi, ağır hipotermi, KİBAS (Cushing refleksi — hipertansiyon + bradikardi!) ve altta yatan iletim sistemi hastalığı (bifasiküler/trifasiküler blok)'
      ],
      safeAgents: [
        'İlk ve En Hızlı Müdahale: Cerrahi vagal uyaranı DERHAL durdur (pnömoperitonyumu indir, göz/mezenter traksiyonunu bırak!) + %100 O₂ + yeterli ventilasyonu doğrula (EtCO₂/SpO₂)',
        'Erişkin Semptomatik Sinüs / Mobitz I Bradikardisi (AHA 2020 ACLS): Atropin 1 mg IV bolus, her 3–5 dakikada bir tekrar (maks toplam 3 mg) — Mobitz II/Tam Blok, Kalp Nakli ve Cushing’de ETKİSİZ/YASAK!',
        'Atropine Dirençli Bradikardi & İnfranodal AV Blok (Mobitz II / 3. Derece Tam Blok): Doğrudan Transkutanöz Pacing (TCP — 70–80/dk, mekanik nabız + elektrik capture teyidi!) VE/VEYA Adrenalin infüzyonu (2–10 mcg/dk; peri-arrestte 10–50 mcg bolus!) veya Dopamin infüzyonu (5–20 mcg/kg/dk)',
        'Kalp Nakli (Denerve Kalp) Özel Seçeneği: İzoproterenol (2–10 mcg/dk), Adrenalin (2–10 mcg/dk), Efedrin/Aminofilin veya Transkutanöz Pacing (Atropin TAMAMEN ETKİSİZDİR!)',
        'Pediatrik Bradikardi (AHA PALS 2020): Önce %100 O₂ + etkin pozitif basınçlı ventilasyon! HR <60/dk + kötü perfüzyon sürerse DERHAL KPR + Adrenalin 0,01 mg/kg (10 mcg/kg) IV; vagal/AV blokta Atropin 0,02 mg/kg IV (maks 0,5 mg çocuk / 1 mg adolesan — eski 0,1 mg minimum dozu KALDIRILDI!)'
      ],
      mortalityStats: 'İzole refleks vagal bradikardi uyaranın kesilmesi ve zamanında antikolinerjik/kronotrop desteğiyle hızla ve sekelsiz düzelir. Ancak spinal anestezi altında tanınmayan Bezold-Jarisch progresyonu, infranodal tam AV blokta Atropin ile zaman kaybedilmesi veya pediatride hipoksik bradikardide KPR’nin gecikmesi ani asistoliye ve yüksek mortaliteye yol açar.',
      clinicalUrgency: 'Kalp hızı hızla <45–50/dk’ya inerken MAP düşüyor, P dalgaları ile QRS ilişkisi kopuyor (AV blok) veya asistoli duraklamaları başlıyorsa saniyeler içinde cerrahi uyaran kesilmeli, %100 O₂ verilmeli, Atropin/Adrenalin ve transkutanöz pacing pedleri eşzamanlı hazırlanmalıdır.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'İntraoperatif bradikardi tanısında yalnızca kalp hızı sayısına değil, EKG’deki iletim düzeyine (sinüs düğümü/AV düğüm üstü [dar QRS] vs His-Purkinje infranodal [geniş QRS]), hemodinamik toleransa ve eşlik eden klinik bağlama (cerrahi manipülasyon, kan basıncı, oksijenasyon, spinal seviye, yaş, kalp nakli öyküsü) bakılmalıdır. Özellikle hipertansiyon eşlik eden bradikardide KİBAS (Cushing refleksi) veya şiddetli α₁-agonist (Fenilefrin) refleks bradikardisi mutlaka ayırt edilmelidir.',
      clinicalCriteria: [
        'Semptomatik / Hemodinamik Unstabil Bradikardi: HR <50/dk (veya pediatride <60/dk) ile birlikte hipotansiyon (MAP <65 mmHg), azalmış EtCO₂, soğuk perifer/kötü kapiller dolum, akut iskemik ST değişikliği veya uyanık hastada presenkop/bilinç değişikliği',
        'Supranodal (Atropine Yanıtlı) İletim Bozuklukları: Sinüs bradikardisi, sinüs duraklaması, junctional kaçış ritmi (dar QRS) ve Mobitz Tip I (Wenckebach — giderek uzayan PR sonrası düşen QRS)',
        'İnfranodal / Yüksek Dereceli AV Bloklar (ATROPİNE DİRENÇLİ — DOĞRUDAN TCP/ADRENALİN!): Mobitz Tip II (sabit PR aralığı + ani düşen QRS, sıklıkla geniş QRS!) ve 3. Derece Tam AV Blok (P dalgaları ile QRS tamamen bağımsız — AV disosiyasyon; ventriküler kaçış 25–40/dk)',
        'Refleks Cerrahi Kriterleri: Laparoskopi insüflasyonu, göz dışı kas çekilmesi (OCR — CN V₁ → CN X) veya trigeminal/kafa tabanı manipülasyonu (TCR — CN V → CN X) ile eşzamanlı ani HR düşüşü (>%20) veya asistoli',
        'Özel Fenotipik Alarmlar: Hipertansiyon + Bradikardi + Düzensiz solunum = Cushing Refleksi (KİBAS!); SpO₂ düşüşü + çocukta bradikardi = Hipoksik Bradikardi; Spinal blok sonrası ani bulantı + hipotansiyon + bradikardi = T1–T4 Blok / Bezold-Jarisch Refleksi'
      ],
      gradingScaleTitle: 'İntraoperatif Bradikardi & AV Blok Klinik Şiddet ve Risk Sınıflaması',
      gradingScaleSource: 'AHA 2020 ACLS & PALS, ACC/AHA/HRS 2018 & ESC 2021 Kardiyak Pacing Kılavuzu',
      larachScale: [
        { category: 'Evre 1 — Stabil / Kompanse Bradikardi (HR 45–55/dk, MAP Normal)', points: 'Gözlem / Sebep Düzelt', description: 'Perfüzyon tam, dar QRS, geçici cerrahi vagal uyaran veya derin opioid/deksmedetomidin etkisi. Uyaranı hafiflet, oksijenasyonu ve anestezi derinliğini gözden geçir; acil Atropin şart değil.' },
        { category: 'Evre 2 — Semptomatik Sinüs / Mobitz Tip I Bradikardisi', points: 'ATROPİN 1 mg IV', description: 'HR <50/dk + hipotansiyon veya aktif cerrahi vagal refleks (OCR/TCR/pnömoperitonyum). Cerrahı durdur + %100 O₂ + Atropin 1 mg IV (her 3–5 dk, maks 3 mg).' },
        { category: 'Evre 3 — Atropine Dirençli / Mobitz Tip II / 3. Derece Tam AV Blok / Kalp Nakli', points: 'TCP + ADRENALİN / DOPAMİN', description: 'İnfranodal geniş-QRS blok, denerve kalp veya Atropin yanıtsızlığı! Atropinle vakit kaybetme → DERHAL Transkutanöz Pacing (TCP) + Adrenalin (2–10 mcg/dk) veya Dopamin (5–20 mcg/kg/dk)!' },
        { category: 'Evre 4 — Peri-Arrest / Asistoli / Pediatrik HR <60 + Kötü Perfüzyon', points: 'KOD KIRMIZI · KPR + ADRENALİN', description: 'HR <30/dk + derin şok, asistoli duraklamaları veya çocukta %100 O₂’ye rağmen HR <60 + kötü perfüzyon! DERHAL KPR + IV Adrenalin (erişkin 10–50 mcg bolus → arrestte 1 mg; çocuk 10 mcg/kg)!' }
      ],
      larachInterpretation: 'Mobitz Tip II ve 3. derece (tam) AV blokta kaçış odağı His-Purkinje sistemindedir ve vagal liflerle innerve değildir; bu hastalara Atropin vermek hem etkisizdir hem de sinüs hızını hızlandırarak infranodal bloğu paradoksal biçimde ağırlaştırabilir. Pacing pedleri ve Adrenalin infüzyonu 1. saniyede devreye girmelidir!',
      differentialDiagnosis: [
        {
          condition: 'KİBAS / İntrakraniyal Basınç Artışı (Cushing Refleksi)',
          differentiatingFactors: 'Bradikardiye ŞİDDETLİ HİPERTANSİYON (geniş nabız basıncı) ve spontan soluyan hastada düzensiz solunum eşlik eder. Atropin VERİLMEZ — KİBAS’ı tedavi et (baş 30° nötral, Mannitol / %3 hipertonik salin, ılımlı hiperventilasyon, acil dekompresyon)!'
        },
        {
          condition: 'Saf α₁-Agonist (Fenilefrin / Noradrenalin) veya Hipertansiyona Bağlı Baroreseptör Refleks Bradikardi',
          differentiatingFactors: 'Yüksek kan basıncı (SKB >160–180 mmHg) ile birlikte gelişen kompansatuvar sinüs bradikardisidir. Önce Fenilefrin dozunu azalt/kes veya hipertansiyonu tedavi et; hipertansif hastaya Atropin vermek tehlikeli taşikardi ve hipertansif krize yol açar!'
        },
        {
          condition: 'Akut İnferior Miyokard İnfarktüsü (RCA / AV Düğüm İskemisi)',
          differentiatingFactors: 'D2, D3, aVF’de ST elevasyonu + yeni 2./3. derece AV blok veya sinüs bradikardisi. İskemiyi (MVO₂/DO₂) ve gerekirse TCP/Adrenalin ile hemodinamiyi desteklerken acil Primer PKG planla (aşırı taşikardi yaratan yüksek doz Atropin/İzoproterenol infarktı büyütür!).'
        },
        {
          condition: 'β-Bloker, Kalsiyum Kanal Blokeri (CCB) veya Digoksin Toksisitesi',
          differentiatingFactors: 'Atropine dirençli ağır bradikardi + derin hipotansiyon/AV blok. Spesifik antidot gerekir: β-blokerde Glukagon (3–5 mg IV) + Yüksek Doz İnsülin-Öglisemi (HIET); CCB’de IV Kalsiyum + HIET + Noradrenalin; Digoksinde Digoksin-Fab antikoru (ve Kalsiyumdan kaçın!).'
        },
        {
          condition: 'Hiperkalemi veya Ağır Hipotermi (<32°C)',
          differentiatingFactors: 'Hiperkalemide P dalgası silinir, QRS genişler ve ağır bradikardi/asistoli gelişir (acil IV Kalsiyum Klorür 1 g!). Hipotermide Osborn (J) dalgaları görülür; miyokard Atropin ve pacing’e dirençlidir, aktif ısıtma esastır.'
        }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'CERRAHA DERHAL “DUR!” DEYİN (Vagal Uyaranı Kesin!) · %100 O₂ & VENTİLASYONU KONTROL EDİN · DEFİBRİLATÖR / TRANSKUTANÖZ PACING PEDLERİNİ HAZIRLAYIN!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'CERRAHİ VAGAL UYARANI DERHAL DURDUR + %100 O₂ & VENTİLASYON KONTROLÜ',
          action: 'Cerraha yüksek sesle durmasını söyleyin: Laparoskopide pnömoperitonyum gazını derhal boşaltın, şaşılık/göz cerrahisinde göz kası traksiyonunu (OCR), beyin/maksillofasiyal cerrahide trigeminal uyarımı (TCR), batın cerrahisinde mezenter/periton traksiyonunu bıraktırın. Eşzamanlı FiO₂’yi %100’e çıkarın, havayolunu ve ventilasyonu (SpO₂, EtCO₂, göğüs hareketi) doğrulayın.',
          criticalNote: 'PEDİATRİK ALTIN KURAL: Çocukta bradikardinin bir numaralı nedeni HİPOKSİDİR — ilaca uzanmadan önce %100 O₂ ile etkin pozitif basınçlı ventilasyon sağla!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'RİTMİ, NABZI & 4 KRİTİK ATROPİN İSTİSNASINI SANİYELER İÇİNDE TARA',
          action: 'Karotis nabzı, arter trasesi ve EKG ritmini değerlendirin (sinüs bradikardisi / Mobitz I mi, yoksa geniş-QRS Mobitz II / 3. derece tam AV blok mu?). Eşzamanlı olarak şu 4 özel durumu hızla dışlayın: (a) Mobitz II / Tam AV blok, (b) Kalp Nakli (denerve kalp), (c) Pediatrik HR <60 + kötü perfüzyon, (d) KİBAS / Cushing refleksi (hipertansiyon + bradikardi)! Ayrıca volatil anesteziği azaltın ve Remifentanil/Deksmedetomidin infüzyonunu durdurun.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'ERİŞKİN SEMPTOMATİK SİNÜS / MOBİTZ I BRADİKARDİSİ: ATROPİN 1 mg IV (AHA 2020)',
          action: 'Yukarıdaki 4 istisna YOKSA ve hemodinamik bozulma (MAP <65, şok, iskemi, peri-arrest) sürüyorsa AHA 2020 ACLS doğrultusunda İV ATROPİN 1 mg hızlı bolus uygulayın; yanıt yoksa her 3–5 dakikada bir tekrarlayın (maksimum toplam doz 3 mg). Nöroaksiyel blok (Bezold-Jarisch) eşlik ediyorsa eşzamanlı 500–1000 mL hızlı kristaloid + pasif bacak kaldırma + Efedrin (10–25 mg IV) ekleyin.',
          criticalNote: 'AHA 2020 GÜNCELLEMESİ: Atropin başlangıç dozu 0,5 mg’dan 1 mg’a çıkarılmıştır! Çok düşük doz Atropin (<0,5 mg erişkinde) paradoksal santral vagotonik bradikardi yapabilir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'ATROPİNE DİRENÇLİ VEYA MOBİTZ II / 3. DERECE TAM AV BLOK: TRANSKUTANÖZ PACING (TCP)',
          action: 'Atropin etkisizse VEYA baştan Mobitz Tip II / 3. derece (tam) AV blok saptandıysa vakit kaybetmeden Transkutanöz Pacing (TCP) pedlerini (ön-arka [AP] pozisyon idealdir) yapıştırın: Pacing modunu açın, hızı 70–80/dk ayarlayın, akımı (mA) en düşükten başlayarak monitörde her pacing spike’ı sonrası geniş QRS (“elektriksel capture”) ve arter trasesi/femoral nabızda eşzamanlı atım (“mekanik capture” — ZORUNLU!) görülene kadar artırın (tipik 40–80 mA); yakalama eşiğinin %10–20 (5–10 mA) üzerinde sabitleyin.',
          criticalNote: 'KRİTİK DOĞRULAMA: Ekranda pacing çizgisi görmek yetmez — mutlaka invaziv arter dalga formu, SpO₂ pletismografisi veya femoral/karotis nabzıyla MEKANİK CAPTURE’ı doğrula! Uyanık/rejyonal hastada ağrılı kas kasılmaları için derhal IV analjezi/sedasyon ver!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'KRONOTROPİK İNFÜZYONLAR & PERİ-ARREST ADRENALİN',
          action: 'TCP hazırlanırken, capture sağlanamazsa veya TCP’ye köprü/alternatif olarak kronotropik infüzyon başlatın: (1) ADRENALİN 2–10 mcg/dk IV infüzyon (peri-arrest / Bezold-Jarisch / spinal ağır bradikardide beklemeden 10–50 mcg IV push-dose bolus; asistoliye dönüyorsa 1 mg ACLS!), VEYA (2) DOPAMİN 5–20 mcg/kg/dk IV infüzyon. Kalp nakli (denerve kalp) hastasında doğrudan İZOPROTERENOL (2–10 mcg/dk) veya Adrenalin tercih edin (Atropin VERME!).',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 6,
          title: 'PEDİATRİK BRADİKARDİ ÖZEL ADIMI (AHA PALS 2020)',
          action: 'Çocuk hastada %100 O₂ + etkin ventilasyona rağmen HR <60/dk ve kötü perfüzyon bulguları (hipotansiyon, zayıf nabız, solukluk/siyanoz, düşük EtCO₂) devam ediyorsa DERHAL GÖĞÜS KOMPRESYONLARINA (KPR) ve İV/İO ADRENALİN 0,01 mg/kg (10 mcg/kg; 0,1 mL/kg 1:10.000 solüsyon, maks 1 mg) uygulamasına başlayın (her 3–5 dk’da tekrar). Primer neden artmış vagal tonus (OCR, laringoskopi, süksinilkolin) veya primer AV bloksa Atropin 0,02 mg/kg IV (maks tek doz çocukta 0,5 mg, adolesanda 1 mg) uygulayın.',
          criticalNote: 'PALS GÜNCELLEMESİ: Eski “minimum 0,1 mg Atropin” kuralı AHA PALS 2020’de KALDIRILMIŞTIR! Yenidoğan/bebeklerde kesin ağırlık bazlı 0,02 mg/kg verilir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 7,
          title: 'ALTTA YATAN ÖZEL NEDENLERİ HEDEFLE (KİBAS, İSKEMİ, HİPERKALEMİ, TOKSİSİTE)',
          action: 'KİBAS / Cushing refleksinde (hipertansiyon + bradikardi) Atropin vermeden intrakraniyal basıncı düşürün (baş 30° nötral, kısa süreli ılımlı hiperventilasyon [PaCO₂ 30–35], Mannitol 0,5–1 g/kg veya %3 Hipertonik Salin, acil nöroşirürji). Acil AKG/elektrolit (hiperkalemi → IV Kalsiyum!), 12-derivasyon EKG (inferior MI!) ve ilaç toksisitelerini (β-bloker → Glukagon + HIET; CCB → IV Kalsiyum + HIET; Digoksin → Digoksin-Fab) hızla tedavi edin.',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'KARDİYOLOJİ KONSÜLTASYONU (TRANSVENÖZ PACING) & POSTOPERATİF İZLEM',
          action: 'TCP geçici bir köprüdür; yüksek dereceli AV blok (Mobitz II / 3. derece tam blok), tekrarlayan semptomatik duraklamalar veya peri-arrest bradikardide acil Kardiyoloji konsültasyonu ile geçici transvenöz pacing (TVP) ve gerekirse kalıcı pil planlayın. Hastayı sürekli EKG telemetrisi altında YBÜ / Koroner YBÜ’de izleyin.',
          priority: 'HIGH'
        }
      ],
      structuredCrisisBlocks: {
        tieredLadder: {
          title: 'Bradikardi & AV Blok Kademeli Müdahale Merdiveni',
          accent: 'amber',
          levels: [
            {
              badge: 'BASAMAK 1 · VAGAL REFLEKS / HAFİF',
              target: 'HR 40–55/dk · Cerrahi Uyaran (OCR / TCR / Pnömoperitonyum)',
              presentation: 'Göz kası, mezenter, periton veya trigeminal manipülasyonla ani kalp hızı düşüşü; henüz derin şok yok.',
              intervention: 'CERRAHA DUR DE! Pnömoperitonyumu dekomprese et, %100 O₂ ve ventilasyonu doğrula, anestezik/opioid/deksmedetomidin dozunu azalt.',
              severity: 'WARNING'
            },
            {
              badge: 'BASAMAK 2 · SEMPTOMATİK SİNÜS / MOBİTZ I',
              target: 'HR <50/dk + Hipotansiyon (Supranodal / Dar QRS)',
              presentation: 'Uyaran bırakılmasına rağmen süren bradikardi + MAP <65 mmHg, spinal sempatoliz veya ilaç kaynaklı vagotoni.',
              intervention: 'AHA 2020 ACLS: İV Atropin 1 mg bolus (her 3–5 dk, maks 3 mg). Spinal/Bezold-Jarisch ise hızlı kristaloid + pasif bacak kaldırma + Efedrin (10–25 mg).',
              severity: 'HIGH'
            },
            {
              badge: 'BASAMAK 3 · ATROPİNE DİRENÇLİ / TAM AV BLOK',
              target: 'Mobitz Tip II · 3. Derece Tam AV Blok · Kalp Nakli',
              presentation: 'Geniş QRS, AV disosiyasyon, Atropine yanıtsızlık veya denerve kalp nakli hastasında derin bradikardi.',
              intervention: 'ATROPİNLE VAKİT KAYBETME! Doğrudan Transkutanöz Pacing (TCP 70–80/dk, mekanik nabız doğrula!) + Adrenalin (2–10 mcg/dk) veya Dopamin (5–20 mcg/kg/dk); kalp naklinde İzoproterenol!',
              severity: 'CRITICAL'
            },
            {
              badge: 'BASAMAK 4 · PERİ-ARREST / PEDİATRİK HR <60',
              target: 'Asistoli / HR <30 + Şok · Çocukta HR <60 + Kötü Perfüzyon',
              presentation: 'Nabız kaybı, asistoli duraklamaları veya çocukta %100 O₂ + ventilasyona rağmen HR <60 + kötü perfüzyon.',
              intervention: 'DERHAL KPR BAŞLAT! Erişkin: Adrenalin 10–50 mcg bolus → arrestte 1 mg IV; Çocuk (PALS 2020): KPR + Adrenalin 10 mcg/kg (0,01 mg/kg) IV + geri döndürülebilir neden!',
              severity: 'CRITICAL'
            }
          ]
        },
        comparisonTable: {
          title: 'Bradikardi Alt Tipleri & 4 Kritik Atropin İstisnası Karşılaştırması',
          columns: ['Klinik Tablo', 'Mekanizma / EKG Özelliği', 'Atropin Yanıtı', 'Birinci Basamak Tedavi', 'Ölümcül Tuzak / Kritik Not'],
          rows: [
            {
              col1: 'Sinüs Bradikardisi / Mobitz Tip I',
              col2: 'Vagal tonus ↑, OCR/TCR, ilaçlar, inferior iskemi; dar QRS, supranodal (AV düğüm)',
              col3: 'YÜKSEK YANITLI (1 mg IV, maks 3 mg)',
              col4: 'Cerrahi uyaranı kes + %100 O₂ + Atropin 1 mg IV (her 3–5 dk)',
              col5: 'Düşük doz (<0,5 mg) Atropin erişkinde paradoksal bradikardi yapabilir!'
            },
            {
              col1: 'Mobitz Tip II & 3. Derece (Tam) AV Blok',
              col2: 'İnfranodal (His-Purkinje) blok; sabit PR + düşen QRS veya AV disosiyasyon, geniş QRS',
              col3: 'ETKİSİZ / KÖTÜLEŞTİRİR!',
              col4: 'Doğrudan Transkutanöz Pacing (TCP) + Adrenalin (2–10 mcg/dk) / Dopamin + TVP',
              col5: 'Atropin sinüs hızını artırıp infranodal bloğu (2:1 → tam blok) PARADOKSAL kötüleştirebilir!'
            },
            {
              col1: 'Kalp Nakli (Denerve Kalp)',
              col2: 'Cerrahi vagal efferent denervasyon; muskarinik blokaj kalp hızını etkilemez',
              col3: 'TAMAMEN ETKİSİZ!',
              col4: 'Direkt β-agonist: İzoproterenol (2–10 mcg/dk) / Adrenalin veya Transkutanöz Pacing',
              col5: 'Atropin etkisizdir ve nadir paradoksal sinüs arresti/AV blok bildirilmiştir; Neostigmin de öngörülemez!'
            },
            {
              col1: 'Pediatrik Bradikardi (PALS 2020)',
              col2: 'En sık neden HİPOKSİ (%100 O₂ + ventilasyon şart!); daha nadir vagal/süksinilkolin',
              col3: 'Yalnızca primer vagal/AV blokta (0,02 mg/kg)',
              col4: 'Önce %100 O₂ + ventilasyon → HR <60 + kötü perfüzyonda DERHAL KPR + Adrenalin 10 mcg/kg!',
              col5: 'Eski 0,1 mg minimum Atropin kuralı PALS 2020’de KALDIRILDI! Hipoksiyi düzeltmeden Atropinle oyalanma!'
            },
            {
              col1: 'KİBAS / Cushing Refleksi',
              col2: 'Yüksek intrakraniyal basınç → beyin sapı iskemisi → Hipertansiyon + Bradikardi + düzensiz solunum',
              col3: 'KONTRENDİKE!',
              col4: 'KİBAS’ı düşür: Baş 30° nötral, PaCO₂ 30–35, Mannitol / %3 Salin, acil nöroşirürji!',
              col5: 'Atropin vermek beyin herniasyonu alarmını maskeler ve hipertansiyonu/ICP’yi tehlikeli biçimde artırır!'
            }
          ]
        },
        drugPolicyCards: {
          title: 'Bradikardi & AV Blok Farmakoloji ve Pacing Karar Kartları',
          items: [
            {
              domain: 'Atropin (AHA 2020: 1 mg IV, Maks 3 mg)',
              recommendation: 'Erişkin semptomatik sinüs bradikardisi, cerrahi vagal refleks (OCR/TCR) ve Mobitz Tip I AV blokta 1 mg IV bolus (her 3–5 dk, maks 3 mg) uygula.',
              rationaleAndCaution: 'Mobitz Tip II / 3. derece tam AV blokta etkisiz (paradoksal kötüleşme riski!), kalp naklinde tamamen etkisiz, KİBAS/Cushing’de kontrendikedir! Koroner iskemide aşırı taşikardiden kaçın.',
              status: 'CAUTION'
            },
            {
              domain: 'Transkutanöz Pacing (TCP — 70–80/dk)',
              recommendation: 'Mobitz Tip II, 3. derece (tam) AV blok ve Atropine yanıtsız tüm unstabil bradikardilerde İLK BASAMAK hayat kurtarıcı köprü tedavidir.',
              rationaleAndCaution: 'Monitördeki elektriksel pacing spike’ı tek başına YETERLİ DEĞİLDİR — mutlaka arter dalga formu veya nabız palpasyonu ile MEKANİK CAPTURE’ı doğrula! Uyanık hastaya sedasyon/analjezi ekle.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Adrenalin (2–10 mcg/dk) & Dopamin (5–20 mcg/kg/dk)',
              recommendation: 'Atropine dirençli bradikardi, peri-arrest (10–50 mcg IV push-dose Adrenalin!), yüksek spinal/Bezold-Jarisch veya TCP’ye alternatif/köprü olarak derhal başlat.',
              rationaleAndCaution: 'Adrenalin güçlü β₁+α₁ etkisiyle hem kalp hızını hem perfüzyon basıncını hızla kurtarır; koroner arter hastalığında miyokard O₂ tüketimini artırdığı için en düşük etkin doza titre et.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'İzoproterenol (2–10 mcg/dk IV)',
              recommendation: 'Kalp nakli geçirmiş (denerve kalp) hastanın semptomatik bradikardisinde ve edinsel uzun QT’ye bağlı bradikardi-bağımlı Torsades’ta birinci basamak direkt β-agonisttir.',
              rationaleAndCaution: 'Saf β₁/β₂ agonist olduğu için vazodilatasyonla diyastolik basıncı düşürüp MVO₂’yi şiddetle artırır — akut koroner iskemide/MI’da kullanmaktan kaçın!',
              status: 'CAUTION'
            },
            {
              domain: 'KİBAS / Cushing Refleksinde Atropin',
              recommendation: 'Şiddetli hipertansiyonla birlikte gelişen beyin sapı herniasyonu / Cushing bradikardisinde Atropin ASLA VERME!',
              rationaleAndCaution: 'Bradikardi yüksek ICP’nin kompansatuvar yanıtıdır; Atropin herniasyon takibini bozar ve kan basıncı/ICP dalgalanmasıyla serebral kanamayı ağırlaştırabilir.',
              status: 'AVOID'
            }
          ]
        },
        preventionBox: {
          title: 'İntraoperatif Bradikardi & Ani Asistoli Önleme Kontrol Listesi',
          highlightRule: 'Bezold-Jarisch & Spinal Arrest Kuralı: Spinal anestezi sonrası HR <50/dk + hipotansiyon başladığında beklemeden preload (sıvı + bacak kaldırma) + Atropin/Efedrin → yanıt yoksa SANİYELER İÇİNDE düşük doz IV Adrenalin (10–50 mcg) uygula!',
          checks: [
            'Yüksek İletim Riskli Hasta (Bifasiküler Blok, Mobitz II, Eski Senkop): Ameliyat öncesi defibrilatör/TCP pedlerini yapıştır ve kardiyoloji ile profilaktik pacing ihtiyacını belirle.',
            'Laparoskopi & Göz/Kafa Tabanı Cerrahisi: CO₂ pnömoperitonyumunu yavaş ve <12–15 mmHg basınçta başlat; şaşılık (OCR) ve kafa tabanı (TCR) vakalarında cerrahla anlık sesli iletişim kur.',
            'İlaç Sinerjisi & Sugammadeks/Süksinilkolin Dikkat: Remifentanil + Propofol + Deksmedetomidin kombinasyonunda vagal tonus maksimumdur; çocukta veya 2. doz Süksinilkolinde bradikardiye karşı Atropin hazır tut; Sugammadeks sonrası ilk 5 dk kalp hızını yakından izle.',
            'β-Bloker / CCB / Digoksin Kullanan Hastalar: İndüksiyon sırasında derin anestezi ve vagal laringoskopi uyarısını minimize et; acil Glukagon / IV Kalsiyum erişimini bil.'
          ]
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Kalp hızı, sinoatriyal (SA) ve atriyoventriküler (AV) düğümler üzerindeki sempatik (T1–T4 kardiyoakceleratör lifler → β₁-reseptör → cAMP artışı) ve parasempatik (vagus siniri CN X → M₂ muskarinik reseptör → Gᵢ proteini aracılı K⁺ kanalı açılması ve hiperpolarizasyon) dengesiyle düzenlenir. Cerrahi mekanoreseptör/kraniyal sinir uyarısı (CN V → CN X) veya T1–T4 sempatik blokaj vagal baskınlık yaratarak SA/AV düğümü frenler. Buna karşın His-Purkinje sistemi (infranodal ileti) parasempatik vagal innervasyondan yoksundur; bu nedenle Mobitz Tip II ve 3. derece tam AV blokta antimuskarinik Atropin etkisiz kalır.',
      stepsTitle: 'Vagal Refleks / Sempatoliz & İnfranodal İletim Bloğu Kaskadı',
      flowType: 'dual-axis',
      cycleWarning: 'Spinal sempatoliz + venöz göllenme → boşalan sol ventrikülde paradoksal mekanoreseptör uyarımı (Bezold-Jarisch refleksi) → ani vagal fırtına + derin bradikardi → koroner perfüzyon durması ve ani asistoli!',
      cascadeSteps: [
        {
          phase: '1. Vagal Afferent Uyarı, T1–T4 Sempatoliz veya Hipoksi',
          mechanism: 'OCR (CN V₁), TCR (CN V), peritoneal/mezenterik gerilim, yüksek spinal blok (T1–T4) veya pediatride hipoksemi beyin sapı vagal çekirdeklerini (nukleus ambiguus/dorsal motor çekirdek) ateşler veya SA düğümü doğrudan baskılar.',
          badge: 'VAGAL DEŞARJ / HİPOKSİ',
          color: 'amber'
        },
        {
          phase: '2. SA/AV Düğüm Hiperpolarizasyonu veya İnfranodal Blok',
          mechanism: 'Vagal ACh salınımı (M₂ reseptörü) SA düğüm ateşlemesini yavaşlatır ve AV iletimini uzatır (Atropine yanıtlı). İskemi/fibrozis kaynaklı His-Purkinje bloğunda ise (Mobitz II/Tam Blok) vagal innervasyon olmadığından Atropin etkisizdir.',
          badge: 'BRADİKARDİ / AV BLOK',
          color: 'purple'
        },
        {
          phase: '3. Kalp Debisi (CO = HR × SV) & Perfüzyon Çöküşü',
          mechanism: 'Özellikle sabit atım hacmine sahip bebek/çocuklarda, diyastolik disfonksiyonlu yaşlılarda veya vazoplejik spinal hastasında HR düşüşü kardiyak debiyi doğrudan çökertir; MAP <50–60 mmHg’ye iner.',
          badge: 'DÜŞÜK DEBİ / ŞOK',
          color: 'red'
        },
        {
          phase: '4. Miyokardiyal İskemi & Ani Asistoli (Önlenebilir Sonuç)',
          mechanism: 'Düzeltilmeyen derin bradikardi + hipotansiyon koroner perfüzyonu keserek saniyeler içinde tam sinüs arresti veya asistoliye ilerler. Uyaranın kesilmesi + erken Adrenalin/TCP döngüyü kırar.',
          badge: 'ASİSTOLİ RİSKİ',
          color: 'rose'
        }
      ],
      summaryText: 'İntraoperatif bradikardinin doğru tedavisi patofizyolojik odağa bağlıdır: Cerrahi reflekslerde mekanik uyaranı kesmek, çocukta hipoksiyi düzeltmek, supranodal vagotonide Atropin (1 mg), infranodal blokta ve denerve kalpte ise doğrudan Transkutanöz Pacing ve direkt β-agonist (Adrenalin/İzoproterenol) kullanmak hayat kurtarır.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'Cerrahi manipülasyon (pnömoperitonyum, göz kası, mezenter, kafa tabanı) anında kalp hızında bazale göre >%20 düşüş (<55/dk)',
        'Spinal/epidural anestezi sonrası ani bulantı, esneme, soğuk terleme ve hızla gerileyen kalp hızı (Bezold-Jarisch habercisi!)',
        'EKG’de PR aralığının uzaması, yeni junctional ritim veya aralıklı düşen QRS kompleksleri',
        'Pediatrik hastada SpO₂ düşüşü veya havayolu obstrüksiyonu ile eşzamanlı hızla düşen kalp hızı'
      ],
      progressingSigns: [
        'HR <45–50/dk ile birlikte hipotansiyon (MAP <65 mmHg), daralan arter dalga formu ve düşen EtCO₂',
        'Mobitz Tip II (sabit PR + ani atlayan QRS) veya 3. derece tam AV blok (P ve QRS tamamen ayrı hızlarda!)',
        'Atropin 1 mg IV bolusa rağmen kalp hızının hiç artmaması veya bloğun daha da derinleşmesi',
        'Uyanık/rejyonal hastada baş dönmesi, göz kararması, göğüs ağrısı, dispne ve konfüzyon'
      ],
      lateSigns: [
        'İleri bradikardi (<30/dk), >3 saniyelik sinüs duraklamaları veya ventriküler kaçış ritminin sönümlenmesi',
        'Ani asistoli (özellikle OCR, TCR, Sugammadeks nadir reaksiyonu veya spinal Bezold-Jarisch’te!)',
        'Düzleşen arter trasesi, <10 mmHg EtCO₂, bilinç kaybı ve kardiyak arrest',
        'Pediatrik hastada HR <60/dk + soluk/alacalı cilt + zayıf/alınamayan santral nabız'
      ],
      specialAlertTitle: 'Spinal Anestezide “Sakin Hasta + Yavaşlayan Nabız = Yaklaşan Asistoli” & Cushing Tuzağı!',
      specialAlertContent: 'Spinal anestezi altındaki sağlıklı genç bir hastada HR’nin 80’den 55 → 45/dk’ya inip bulantı/terleme başlaması masum bir vagotoni değildir — Bezold-Jarisch refleksiyle saniyeler içinde asistoliye gidebilir! Erken sıvı + Atropin/Efedrin yetmezse HİÇ BEKLEMEDEN 10–50 mcg IV Adrenalin verin. Tam tersi, intrakraniyal patolojili hastada hipertansiyon + bradikardi (Cushing refleksi) varsa Atropin VERMEYİN, derhal KİBAS’ı tedavi edin!'
    },

    // 7) Önleyici Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Preoperatif 12-derivasyon EKG’de sinüs düğümü disfonksiyonu, PR uzaması, dal blokları (özellikle bifasiküler blok: RBBB + sol anterior/posterior hemiblok veya LBBB!), eski senkop ve kalıcı pil öyküsü sorgulanmalıdır.',
        'Kalp nakli hastaları, kronik β-bloker / Verapamil / Diltiazem / Digoksin / Amiodaron kullanıcıları ve KİBAS hastaları anestezi güvenlik brifinginde kırmızı bayrakla işaretlenmelidir.',
        'Şaşılık (OCR), beyin/kafa tabanı (TCR), karotis endarterektomi ve laparoskopik majör cerrahilerde refleks bradikardi riski cerrahi ekiple ameliyat öncesi paylaşılmalıdır.',
        'Pediatrik hastalarda üst solunum yolu enfeksiyonu, zor havayolu veya hipoksemi riski değerlendirilmeli; ağırlığa göre hesaplanmış Adrenalin (10 mcg/kg) ve Atropin (0,02 mg/kg) dozları önceden hazır olmalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Bradikardi & Yüksek Dereceli AV Blok Hazırlık Protokolü',
        steps: [
          'Bilinen iletim bloğu (Mobitz II, bifasiküler blok + senkop, kalp nakli) veya yüksek riskli cerrahide indüksiyon ÖNCESİ Transkutanöz Pacing (TCP) pedlerini göğse yapıştırın.',
          'Ameliyathane masasında çekili Atropin (1 mg/mL veya 0,5 mg/mL) ve push-dose Adrenalin (10 mcg/mL) hazır bulundurun.',
          'Spinal/epidural anestezi öncesi geniş IV damar yolu, yeterli preload ve sürekli sesli EKG/SpO₂ monitörizasyonunu teyit edin.',
          'Laparoskopide yavaş CO₂ insüflasyonu ve ≤12–15 mmHg intraabdominal basınç limiti ayarlayın.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Pediatrik ve erişkin vakalarda 2. doz Süksinilkolin veya yüksek doz Remifentanil/Deksmedetomidin kullanımında bradikardiye karşı dikkatli titrasyon',
        'Neostigmin ile nöromüsküler blok geri çevrilirken eşzamanlı doğru doz antikolinerjik (Glikopirolat veya Atropin) uygulanması ve Sugammadeks sonrası ilk 5 dakika yakın EKG takibi',
        'Karotis sinüs manipülasyonu sırasında tekrarlayan bradikardide cerrahın karotis sinüs bölgesine %1 Lidokain infiltrasyonu yapmasının sağlanması'
      ],
      cartTitle: 'Bradikardi & Pacing Acil Müdahale Hazırlık Listesi:',
      cartChecklist: [
        'Transkutanöz Pacing (TCP) Özellikli Bifazik Defibrilatör + Yapışkan Pedler (Erişkin & Pediatrik)',
        'Atropin (1 mg / 0,5 mg ampuller — AHA 2020 erişkin 1 mg; PALS 0,02 mg/kg)',
        'Adrenalin (10 mcg/mL push-dose enjektör + 1 mg ampul + 2–10 mcg/dk infüzyon seti)',
        'Dopamin İnfüzyonu (5–20 mcg/kg/dk) & İzoproterenol (kalp nakli / denerve kalp için!)',
        'Efedrin (5 mg/mL — spinal hipotansiyon + bradikardi) & Glikopirolat (0,2–0,4 mg)',
        'Özel Antidotlar: Glukagon (β-bloker toksisitesi), Kalsiyum Klorür (hiperkalemi / CCB), Mannitol / %3 Salin (KİBAS)'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'İzole cerrahi vagal refleks (OCR/TCR/pnömoperitonyum) sonrası tamamen düzelen stabil olgular standart PACU monitörizasyonuyla izlenebilir; ancak Mobitz Tip II / 3. derece tam AV blok, TCP/kronotrop infüzyonu, peri-arrest veya kalp nakli bradikardisi geçiren hastalar en az 24–48 saat YBÜ / Koroner YBÜ telemetrisinde izlenmelidir.',
      recurrenceRate: 'Altta yatan cerrahi uyaran bittiğinde refleks bradikardi tekrarlamaz; ancak iletim sistemi hastalığı, akut inferior MI, rezidüel nöroaksiyel blok veya uzun etkili β-bloker/CCB/Deksmedetomidin varlığında ilk 24 saatte nüks riski yüksektir.',
      recurrenceRiskBadge: 'AV BLOK & İLAÇ ETKİSİNDE 24 SAAT TELEMETRİ ŞART',
      maintenanceTherapy: 'İnfranodal blokta Kardiyoloji eşliğinde geçici transvenöz pacing (TVP) veya kalıcı kalp pili planlaması; geçici kronotrop infüzyonunun (Adrenalin/Dopamin) kademeli azaltılması, elektrolit (K⁺, Mg²⁺) ve oksijenasyon optimizasyonu.',
      monitoringParameters: [
        'Sürekli EKG telemetrisi (PR aralığı, QRS genişliği, yeni duraklama veya AV blok nüksü takibi)',
        '12-derivasyon EKG ve seri hs-cTn (özellikle >50 yaş veya risk faktörlü hastada akut inferior MI dışlaması!)',
        'Transkutanöz pacing uygulandıysa göğüs cildi termal yanık kontrolü ve kas ağrısı/sedasyon takibi',
        'Serum elektrolitleri (K⁺, Mg²⁺, Ca²⁺), arteriyel kan gazı ve tiroid fonksiyonları (açıklanamayan dirençli bradikardide hipotiroidi!)',
        'KİBAS şüphesinde seri nörolojik muayene (GKS, pupiller) ve acil Kraniyal BT'
      ],
      expectedComplications: [
        'Ani asistoli veya bradikardi-bağımlı (pause-dependent) Torsades de Pointes gelişimi',
        'Uzamış hipoperfüzyona bağlı miyokard iskemisi, akut böbrek hasarı veya serebral hipoperfüzyon',
        'TCP sırasında yetersiz mekanik capture’ın gözden kaçırılması (“yalancı capture” şoku!) veya göğüs cilt yanığı',
        'Yüksek doz Atropin sonrası santral antikolinerjik sendrom (deliryum/ajitasyon), taşikardiye bağlı miyokard iskemisi veya idrar retansiyonu',
        'Pediatrik hipoksik bradikardide geç KPR’ye bağlı hipoksik ensefalopati'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: '12-Derivasyon EKG & Kardiyoloji / Elektrofizyoloji Değerlendirmesi',
          description: 'Mobitz Tip II, 3. derece AV blok veya semptomatik sinüs düğümü disfonksiyonunda geçici transvenöz pacing ve kalıcı pacemaker endikasyonunun kesinleştirilmesi.'
        },
        {
          testName: 'Seri hs-cTn & Transtorasik Ekokardiyografi',
          description: 'İnferior MI (RCA), infiltratif kardiyomiyopati veya yapısal kapak/iletim hastalığının araştırılması.'
        },
        {
          testName: 'Metabolik, Toksikolojik & Nörolojik Tarama',
          description: 'Hiperkalemi, hipotiroidi (TSH/sT4), digoksin düzeyi veya KİBAS şüphesinde acil Kraniyal BT.'
        }
      ],
      prognosisSummary: 'İntraoperatif bradikardi ve yüksek dereceli AV bloklar; cerrahi refleksin hızla kesilmesi, pediatride oksijenasyonun öncelenmesi, erişkinde doğru Atropin dozu (1 mg) ve özellikle 4 kritik Atropin istisnasında (Mobitz II/Tam Blok, Kalp Nakli, Pediatrik Hipoksi, Cushing Refleksi) doğru alternatife saniyeler içinde geçilmesiyle mükemmel prognoza sahiptir.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'AHA 2020 Güncellemesi: Erişkin Atropin Dozu 0,5 mg Değil 1 mg IV!',
        takeaway: 'AHA 2020 ACLS Bradycardia kılavuzu erişkin başlangıç Atropin dozunu 0,5 mg’dan 1 mg IV bolusa (her 3–5 dk, maks 3 mg) çıkarmıştır. Çok düşük doz Atropin (<0,5 mg) santral muskarinik etkiyle paradoksal bradikardi yapabilir!',
        category: 'Kritik Doz'
      },
      {
        title: 'Mobitz Tip II & 3. Derece Tam AV Blokta Atropin ETKİSİZ — Hatta KÖTÜLEŞTİRİR!',
        takeaway: 'İnfranodal (His-Purkinje, geniş QRS) AV bloklarda vagal innervasyon yoktur. Atropin sinüs hızını artırırken infranodal bloğu açamadığı için iletim oranını (2:1 → 3:1 / tam blok) paradoksal olarak kötüleştirebilir! Doğrudan Transkutanöz Pacing (TCP) + Adrenalin/Dopamin başlat!',
        category: 'Tuzak'
      },
      {
        title: 'Kalp Nakli (Denerve Kalp) = Atropin Sıfır Etki → İzoproterenol / Adrenalin / TCP!',
        takeaway: 'Transplante kalpte vagal efferent lifler kesilmiştir; Atropin kalp hızını ARTIRMAZ (hatta nadir paradoksal sinüs arresti yapabilir). Doğrudan etkili β-agonist (İzoproterenol 2–10 mcg/dk veya Adrenalin) ya da Transkutanöz Pacing kullan!',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Pediatrik Bradikardi (PALS 2020): Önce %100 O₂! Eski 0,1 mg Minimum Atropin KALDIRILDI!',
        takeaway: 'Çocukta bradikardinin bir numaralı nedeni HİPOKSİDİR: Önce havayolu + %100 O₂ + ventilasyon! Etkin ventilasyona rağmen HR <60/dk + kötü perfüzyon sürerse hemen KPR + Adrenalin 10 mcg/kg IV başla! Vagal nedende Atropin 0,02 mg/kg’dır — eski 0,1 mg minimum doz kuralı PALS 2020’de kaldırılmıştır!',
        category: 'Ezber Bozan'
      },
      {
        title: 'KİBAS / Cushing Refleksi & Cerrahi OCR/TCR Refleksi',
        takeaway: 'Hipertansiyon + bradikardi (Cushing refleksi) beyin sapı herniasyonu alarmıdır — Atropin VERME, derhal KİBAS’ı tedavi et! Şaşılık (OCR) veya kafa tabanı (TCR) cerrahisinde ani bradikardi/asistoli gördüğünde İLK İŞ ilaca değil cerraha uzanmaktır: Uyaran bırakılınca kalp hızı çoğunlukla saniyeler içinde döner!',
        category: 'Tuzak'
      }
    ],

    // 10) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'Panchal AR, Bartos JA, Cabañas JG, et al.; AHA Adult Basic and Advanced Life Support Writing Group.',
        title: 'Part 3: Adult Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.',
        journal: 'Circulation. 2020;142(16_suppl_2):S366–S468.',
        year: '2020',
        relevance: 'Erişkin bradikardi algoritması: Atropin başlangıç dozunun 1 mg IV (maks 3 mg) olarak güncellenmesi, TCP, Adrenalin (2–10 mcg/dk) ve Dopamin (5–20 mcg/kg/dk).'
      },
      {
        authors: 'Topjian AA, Raymond TT, Atkins D, et al.; AHA Pediatric Basic and Advanced Life Support Collaborators.',
        title: 'Part 4: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.',
        journal: 'Circulation. 2020;142(16_suppl_2):S469–S523.',
        year: '2020',
        relevance: 'Pediatrik hipoksik bradikardi yaklaşımı (HR <60 + kötü perfüzyonda KPR + Adrenalin 0,01 mg/kg) ve Atropin 0,02 mg/kg (minimum 0,1 mg kuralının kaldırılması).'
      },
      {
        authors: 'Kusumoto FM, Schoenfeld MH, Barrett C, et al.',
        title: '2018 ACC/AHA/HRS Guideline on the Evaluation and Management of Patients With Bradycardia and Cardiac Conduction Delay.',
        journal: 'Circulation. 2019;140(8):e382–e482.',
        year: '2019',
        relevance: 'İnfranodal AV bloklarda (Mobitz II / Tam Blok) Atropin sınırları, kalp nakli (denerve kalp) yönetimi ve akut pacing kılavuzu.'
      },
      {
        authors: 'Glikson M, Nielsen JC, Kronborg MB, et al.; ESC Scientific Document Group.',
        title: '2021 ESC Guidelines on cardiac pacing and cardiac resynchronization therapy.',
        journal: 'European Heart Journal. 2021;42(35):3427–3520.',
        year: '2021',
        relevance: 'Yüksek dereceli AV blok, geçici transkutanöz/transvenöz pacing ve perioperatif iletim bozukluklarının yönetimi.'
      },
      {
        authors: 'Pollard JB.',
        title: 'Cardiac arrest during spinal anesthesia: common mechanisms and strategies for prevention.',
        journal: 'Anesthesia & Analgesia. 2001;92(1):252–256.',
        year: '2001',
        relevance: 'Nöroaksiyel blokta T1–T4 sempatoliz, Bezold-Jarisch refleksi, ani bradikardi/asistoli mekanizması ve erken Adrenalin stratejisi.'
      },
      {
        authors: 'Meuwly C, Golanov E, Chowdhury T, Erne P, Schaller B.',
        title: 'Trigeminal cardiac reflex: new thinking model about the definition based on a literature review.',
        journal: 'Medicine (Baltimore). 2015;94(5):e484.',
        year: '2015',
        relevance: 'Okülokardiyak (OCR) ve Trigemino-kardiyak reflekslerin (TCR) fizyolojisi, cerrahi uyaran kesilmesinin önceliği ve anestezi yönetimi.'
      }
    ],
    relatedLinks: [
      { label: 'Perioperatif Kardiyak Arrest & ACLS', href: '#arac=emergencies&sub=acls', badge: 'Asistoli / KPR' },
      { label: 'Yüksek / Total Spinal Anestezi Krizi', href: '#arac=emergencies&sub=total-spinal', badge: 'T1–T4 / Bezold-Jarisch' },
      { label: 'İntraoperatif Hipotansiyon (IOH)', href: '#arac=emergencies&sub=hypotension', badge: 'Perfüzyon' },
      { label: 'İntraoperatif Malign Aritmiler', href: '#arac=emergencies&sub=malignant-arrhythmias', badge: 'Aritmi / Pacing' },
      { label: 'Atropin İlaç Monografı & Dozajı', href: '#tedavi=atropine', badge: 'İlaç Kartı' }
    ]
  }
};
