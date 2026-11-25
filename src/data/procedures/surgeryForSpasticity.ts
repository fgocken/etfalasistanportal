import { ProcedureDefinition } from '../../types/procedures';

/**
 * Spastisite Cerrahisi: Selektif Dorsal Rizotomi (SDR), DREZ Lezyonlama ve Periferik Nörotomi
 * (Surgery for Spasticity: Selective Dorsal Rhizotomy, DREZotomy, and Peripheral Neurotomy)
 *
 * Jaffe (6th ed., 2020, Section II: Neurosurgery - Functional Neurosurgery: Surgery for Spasticity),
 * American Academy for Cerebral Palsy and Developmental Medicine (AACPDM),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve güncel pediatrik nöroanestezi literatürü referans alınarak yapılandırılmıştır.
 */
export const surgeryForSpasticity: ProcedureDefinition = {
  id: 'surgery-for-spasticity',
  name: 'Spastisite Cerrahisi: Selektif Dorsal Rizotomi (SDR), DREZ Lezyonlama ve Periferik Nörotomi',
  shortCode: 'SPASTİSİTE-SDR',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Pediatrik Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal ve fizik tedaviye dirençli şiddetli spastisitede hiperaktif kas tonusunu ve anormal spinal refleks arkını kalıcı olarak azaltan nöromodülasyon/ablasyon girişimleridir. En sık uygulanan prosedür Selektif Dorsal Rizotomi (SDR)\'dir: Lomber tek seviye konus laminoplastisi (L1 - L2) veya çok seviyeli laminotomi (L2 - S1) ve geniş dural açılış sonrası kauda ekuina sinir kökleri (L2 - S2) ventral (motor) ve dorsal (duyu) olarak ayrılır; dorsal kökçükler (rootlets) tek tek elektrofizyolojik EMG stimülasyonuyla test edilerek anormal/yaygın/klonik refleks yanıtı verenler (%30 - %50 oranında) selektif olarak kesilir. Diğer yöntemler arasında ağrılı fokal spastisitede DREZ Lezyonlama ve izole kas kontraktürlerinde seçici periferik parsiyel nörotomiler yer alır.',
  indications: [
    'Serebral Palsi (Spastik Dipleji ve Seçilmiş Spastik Kuadripleji): Ambulasyon potansiyeli olan (GMFCS II - III) veya bakım konforu hedeflenen (GMFCS IV - V), oral antispastiklere ve botulinum toksinine dirençli 3 - 18 yaş arası pediatrik ve genç erişkin hastalar (SDR temel endikasyonu)',
    'Spinal Kord Yaralanması (SCI) veya Multipl Skleroz (MS) Sekeli Şiddetli Spastisite: Makaslama yürüyüşü, kontrolsüz fleksör/ekstansör spazmlar (DİKKAT: > 24 - 48 saat denervasyonda Süksinilkolin ölümcül hiperkalemi yapar — MUTLAK KONTRENDİKE!)',
    'Ağrılı Spastik Ekstremite Deformiteleri ve Brakiyal Pleksus Avülsiyonu: DREZ (Dorsal Root Entry Zone) lezyonlama endikasyonu',
    'İzole Kas Grubu Spastisitesi: Kalça adduktor makaslaması, ekinovarus ayak veya dirsek fleksiyon kontraktürlerinde parsiyel periferik nörotomi',
    'Mevcut İntratekal Baklofen (ITB) Pompasından SDR\'ye Geçiş veya Ortopedik Cerrahi Öncesi Tonus Dengeleme (ITB yoksunluk krizine karşı yüksek alarm!)'
  ],
  averageDuration: '3.0 - 5.5 saat (Prone pozisyonlama, kontraktür destekleri ve floroskopik seviye doğrulama: 45-60 dk; Tek seviye L1-L2 laminoplasti veya çok seviyeli laminotomi: 45-60 dk; Geniş dural açılış, mikronöroşirürjikal kök diseksiyonu ve çok kanallı EMG kökçük stimülasyonu/transeksiyonu: 90-150 dk; Su geçirmez dural tamir [gerekirse doğrudan görüş altında koruyucusuz intratekal morfin], Valsalva testi ve laminoplasti kapanışı: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '100 - 300 mL (Küçük pediatrik olgularda 80 - 150 mL dahi düşük dolaşan kan hacmi nedeniyle toplam kan hacminin %10 - %20\'sine ulaşabilir; çok seviyeli laminotomide ve erişkin SDR/DREZ\'de 150 - 350 mL)',
    riskLevel: 'moderate',
    riskLevelLabel: 'Orta Düzey Risk (Pediatrik Düşük Kan Hacmi — Preoperatif İzin Verilebilir Kan Kaybı [ABL] Hesabı Zorunludur)',
    crossMatchRequirement: '1 - 2 Ünite Eritrosit Süspansiyonu (ES) Cross-Match hazır bulundurulmalıdır; < 20 kg çocuklarda taze/ışınlanmış kan ve gerektiğinde TDP planlanmalıdır',
    transfusionProbability: '%15 - %35 (Düşük kilolu ve çok seviyeli laminotomi uygulanan pediatrik olgularda %30 - %45)',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — prone pozisyonda batın basısı varsa masif kanar)',
      'Spinal Radiküler Besleyici Arterler (A. radicularis magna [Adamkiewicz] ve radikülomedüller dallar)',
      'Subaraknoid Kauda Ekuina Mikrovasküler Yatağı',
      'Çok Seviyeli Laminotomi Kemik Kenarları ve Paravertebral Kas Yatağı'
    ],
    hemostasisStrategies: [
      'Pediatrik Çok Seviyeli Laminotomide Kan Koruma: Preoperatif İzin Verilebilir Kan Kaybı (ABL = EBV × [Hct_başlangıç - Hct_hedef] / Hct_başlangıç) hesaplanır ve kanamayı azaltmak için Traneksamik Asit (TXA — 10 - 15 mg/kg yükleme + 1 - 5 mg/kg/saat infüzyon) düşünülür',
      'Mikronöroşirürjikal düşük akımlı bipolar koagülasyon, kemik mumu ve epidural hemostatik matriks (FloSeal, Surgicel)',
      'Prone pozisyonda batının tamamen serbest asılı tutulması (Vena Cava Inferior ve Batson pleksus basıncını düşürür)'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil — Kas Gevşeticisiz İdame): SDR EMG ve H-refleks kökçük stimülasyonu için MUTLAK ALTIN STANDARTTIR! (Midazolam ve > 0.5 MAC volatil anestezikler SDR EMG ve H-refleks yanıtlarını belirgin baskılar!)',
      'Entübasyon ve Modifiye RSI Stratejisi (GÖRH / Aspirasyon Riski): SÜKSİNİLKOLİN MUTLAK KONTRENDİKEDİR! Kas gevşeticisiz yüksek doz Propofol + Remifentanil VEYA düşük doz Rokuronyum (0.3 - 0.45 mg/kg) + EMG kökçük testi öncesinde Sugammadeks ile tam antagonizasyon (TOF %100)'
    ],
    alternative: [
      'İzole Periferik Nörotomiler İçin: Kas gevşeticisiz genel anestezi veya seçilmiş erişkinlerde sinir stimülasyonunu bozmayan yaklaşımlar'
    ],
    clinicalRationale: 'SDR\'nin tüm klinik başarısı, L2 - S2 dorsal kökçüklerinin ve S2 - S4 pudendal/anal sfinkter liflerinin EMG ve H-refleks yanıtlarının bozulmadan ölçülmesine bağlıdır; bu nedenle Midazolamdan, > 0.5 MAC volatil gazlardan ve idame kas gevşeticilerden kaçınılarak Propofol + Remifentanil TIVA uygulanır. Üst/alt motor nöron denervasyonunda (SCI, MS, spastik kuadripleji) Süksinilkolin ölümcül hiperkalemik arreste yol açtığından kesinlikle kullanılmaz.',
    notes: 'SPASTİSİTE CERRAHİSİNDE (SDR) 6 HAYATİ ANESTEZİ KURALI: (1) SÜKSİNİLKOLİN MUTLAK KONTRENDİKE (HİPERKALEMİK ARREST — NMB-FREE VEYA DÜŞÜK DOZ ROKURONYUM + SUGAMMADEKS!); (2) İNTRATEKAL BAKLOFEN (ITB) YOKSUNLUK KRİZİ VE DOZ AŞIMI PROTOKOLÜ; (3) SDR GENİŞ DURAL AÇILIŞTA EPİDURAL/KAUDAL TOTAL SPİNAL TEHLİKESİ — DOĞRUDAN GÖRÜŞ ALTINDA İNTRATEKAL MORFİN ALTERNATİFİ; (4) REKTAL ISI PROBU YASAK (S2-S4 ANAL SFİNKTER EMG ÇAKIŞMASI — ÖZOFAGEAL + MESANE PROBU KULLAN!); (5) MİDAZOLAM / > 0.5 MAC VOLATİL EMG BASKILAMASI, KETOJENİK DİYET VE LATEKS-FREE ÖNLEM; (6) PRONE KONTRAKTÜR KORUMASI, PEDİATRİK HİPOTERMİ, ABL/TXA VE KÜMÜLATİF LAST/ERKEN KETOROLAK YASAĞI.',
    rulesTitle: 'SPASTİSİTE CERRAHİSİNDE (SDR) ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'SÜKSİNİLKOLİN MUTLAK KONTRENDİKEDİR (ÖLÜMCÜL HİPERKALEMİK KARDİYAK ARREST!)',
        content: 'Spinal kord yaralanması (SCI), Multipl Skleroz (MS), spastik kuadripleji ve > 24 - 48 saatlik üst/alt motor nöron denervasyonunda nikotinik ACh reseptör up-regülasyonu nedeniyle SÜKSİNİLKOLİN masif potasyum salınımı ve ölümcül hiperkalemik arreste yol açar! GÖRH/aspirasyon riskli CP çocuklarında Süksinilkolinsiz modifiye RSI uygulanır: Kas gevşeticisiz Propofol + Remifentanil VEYA düşük doz Rokuronyum (0.3 - 0.45 mg/kg) + EMG testi öncesinde Sugammadeks ile tam antagonizasyon (TOF %100).'
      },
      {
        number: 2,
        title: 'İNTRATEKAL BAKLOFEN (ITB) YOKSUNLUK KRİZİ VE DOZ AŞIMI ACİL PROTOKOLÜ',
        content: 'Mevcut ITB pompası (veya yüksek doz oral baklofen) kesintisinde gelişen ITB Yoksunluk Krizi (yüksek ateş, şiddetli rijidite, rabdomiyoliz, otonomik fırtına, nöbet, DİK) MH ve NMS\'den farklıdır ve hızla ölümcüldür! Tedavi: Acil intratekal baklofen akışının restorasyonu + yüksek doz IV Benzodiazepinler (Diazepam/Lorazepam/Midazolam) + enteral Baklofen + Siproheptadin + agresif soğutma/YBÜ desteği. ITB Doz Aşımında ise (koma, solunum arresti, hipotansiyon): Acil entübasyon, mekanik ventilasyon, pompa durdurma ve 30 - 40 mL BOS aspirasyonu uygulanır.'
      },
      {
        number: 3,
        title: 'SDR GENİŞ DURAL AÇILIŞTA EPİDURAL / KAUDAL GÜVENLİK UYARISI VE İNTRATEKAL MORFİN',
        content: 'SDR\'de geniş dural açılış ve dural dikiş hattı olduğundan epidural kateter veya kaudal blok lokal anesteziğin subaraknoid aralığa sızmasına yol açarak TOTAL SPİNAL ANESTEZİ, solunum arresti, BOS kaçağı/psödomeningosel ve postoperatif nörolojik muayenenin maskelenmesi riskini doğurur! Standart güvenli alternatif: Dural kapanış hemen öncesinde cerrah tarafından doğrudan görüş altında koruyucusuz İNTRATEKAL MORFİN (2 - 5 mcg/kg) uygulanması (+ 24 saat sürekli SpO2/solunum takibi).'
      },
      {
        number: 4,
        title: 'REKTAL ISI PROBU KULLANILMAZ (S2 - S4 ANAL SFİNKTER EMG ÇAKIŞMASI!) + TIVA ŞARTI',
        content: 'S2 - S4 pudendal/sfinkter koruması için yerleştirilen eksternal anal sfinkter EMG elektrotlarıyla çakışıp artefakt yaratacağından REKTAL ISI PROBU YASAKTIR — sıcaklık izlemi ÖZOFAGEAL + MESANE (Foley) problarıyla yapılır! Kökçük EMG ve H-refleks yanıtlarını korumak için Midazolamdan, > 0.5 MAC volatillerden ve idame kas gevşeticilerden kaçınılır (Propofol + Remifentanil TIVA).'
      },
      {
        number: 5,
        title: 'LATEKS-FREE HAZIRLIK, CP EPİLEPSİ / KETOJENİK DİYET VE PEDİATRİK ABL / TXA',
        content: 'Çoklu cerrahi/kateterizasyon öykülü CP ve nörojenik mesane hastalarında yüksek lateks alerjisi riski nedeniyle ameliyathane LATEKS-FREE hazırlanır. Eşlik eden epilepsi ve ketojenik diyet mutlaka sorgulanır (ketojenik diyette dekstroz ve Ringer Laktat YASAK → %0.9 NaCl + glukoz/keton/HCO3- takibi). Düşük kilolu çocuklarda preop ABL hesaplanır ve çok seviyeli laminotomide TXA düşünülür.'
      },
      {
        number: 6,
        title: 'PRONE KONTRAKTÜR KORUMASI, HİPOTERMİ ÖNLEMİ, KÜMÜLATİF LAST VE ERKEN KETOROLAK YASAĞI',
        content: 'Kontraktürlü kalça/dizler zorla düzleştirilmeden silikon pedlerle desteklenir, batın serbest asılır ve açık BOS irrigasyonu 37.5°C\'de tutularak normotermi (> 36.0°C) korunur. Ekstübasyonda IV Lidokain ile yara yeri Ropivakain/Bupivakain birlikte kullanılacaksa KÜMÜLATİF LAST maksimum dozu aşılmamalıdır. Geniş intradural cerrahi sonrası erken dönemde rutin Ketorolak/NSAİİ verilmez (intraspinal hematom riski!).'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Pediatrik Nöroloji / Gelişimsel Pediyatri Konsültasyonu: Serebral palsi alt tipi, GMFCS seviyesi, eşlik eden EPILEPSİ ve KETOJENİK DİYET durumu, oral/intratekal Baklofen rejimi (ITB pompası varsa kapatma/geçiş protokolü).',
      'Fizik Tedavi (FTR), Ortopedi ve Çocuk Ürolojisi Konsültasyonu: Modifiye Ashworth skoru, sabit eklem kontraktürleri, kalça sublüksasyonu/skolyoz derecesi ve bazal mesane/bağırsak sfinkter fonksiyonu.',
      'Göğüs Hastalıkları / Pediatrik Pulmonoloji: Spastik kuadriplejide kronik mikroaspirasyon, GÖRH, kifoskolyoza bağlı restriktif akciğer hastalığı ve zayıf öksürük rezervi.'
    ],
    historyAndPhysical: [
      'LATEKS ALERJİSİ TARAMASI: Çoklu operasyon ve kateterizasyon öyküsü olan CP/spina bifida/nörojenik mesane hastalarında yüksek risk — ameliyathane tam lateks-free hazırlanmalıdır.',
      'GÖRH, Disfaji ve Aspirasyon Riski: Psödobulber palsi, sialore (drooling), mikronati ve zor hava yolu değerlendirmesi (Süksinilkolinsiz modifiye RSI planı).',
      'Antispastik ve Antiepileptik İlaçlar: Mevcut ITB pompası (dolum tarihi, günlük doz, kateter durumu — ani kesilmesi ölümcül yoksunluk krizine yol açar!), oral Baklofen, Tizanidin, Diazepam ve AED\'ler ameliyat sabahı kesintisiz sürdürülür.',
      'Ayrıntılı Motor/Duyu Taban Muayenesi, Kontraktür Haritası ve Beslenme/Subkutan Doku Durumu (bası yarası ve hipotermi yatkınlığı).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit) ve preoperatif İzin Verilebilir Kan Kaybı (ABL) hesabı.',
      'Koagülasyon Paneli (PT, aPTT, INR, Fibrinojen — Valproat kullanan CP/epilepsi olgularında trombosit fonksiyon/PFA-100 kontrolü).',
      'Serum Elektrolitleri (K+ — özellikle SCI/MS/denervasyonda bazal potasyum!), BUN, Kreatinin ve Kan Şekeri (ketojenik diyette glukoz + keton + HCO3-).',
      'Kan Grubu, Antikor Tarama ve 1 - 2 Ünite Eritrosit Süspansiyonu Cross-Match hazırlığı.',
      'Tüm Omurga MRG (konus medullaris seviyesi, gergin omurilik [tethered cord] dışlanması) ve Pelvis AP grafisi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG, SpO2, EtCO2 ve sürekli çift sıcaklık izlemi.',
      'SÜREKLİ ÇİFT SICAKLIK PROBU — ÖZOFAGEAL + MESANE (FOLEY): REKTAL ISI PROBU KESİNLİKLE KULLANILMAZ (S2 - S4 eksternal anal sfinkter EMG elektrotlarıyla çakışır ve artefakt oluşturur!). Hedef çekirdek sıcaklığı > 36.0°C.',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Pediatrik hastalarda anlık hemodinami, seri hemoglobin/Hct, kan gazı, elektrolit (ve ketojenik diyette glukoz/keton/HCO3-) takibi için.',
      'Santral Venöz Erişim (CVC): Düşük kilolu (< 15 kg) veya zor periferik venli çocuklarda.',
      'ÇOK KANALLI İNTRAOPERATİF EMG (İONM): Bilateral Adduktor longus (L2-L3), Quadriceps (L3-L4), Tibialis anterior (L4-L5), Gastrocnemius/Soleus (L5-S1), Hamstring (L5-S2) ve Eksternal Anal Sfinkter EMG (S2-S4 pudendal kök koruması).',
      'Nöromusküler İleti Monitörizasyonu (TOF): Kökçük stimülasyonunda TOF oranı %100 (4/4) olarak kanıtlanmalıdır.',
      'Isı Sensörlü Foley Mesane Sondası (idrar çıkışı > 1.0 mL/kg/saat hedefi).'
    ],
    vascularAccess: [
      'En az 2 adet güvenli periferik intravenöz yol (üst ekstremitelerde; lateks-free malzemelerle)',
      'Ultrason eşliğinde invaziv radiyal arter kanülasyonu',
      'Küçük çocuklarda (< 15 kg) gereğinde santral venöz kateter'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon, Kontraktürlü Eklem Silikon Destekleri ve Karın Tam Serbest Asılı',
    patientPositionDetails: [
      'Göğüs ve Pelvis Silikon Ruloları: Abdomen tamamen serbest bırakılarak Vena Cava Inferior ve Batson epidural venöz pleksus basıncı düşürülür.',
      'Kontraktürlü Eklem Adaptasyonu: Fleksiyon kontraktürlü kalça, diz ve ekinovarus ayak bilekleri anatomik açıda yumuşak jel desteklerle korunur; eklemler ASLA zorla düzleştirilmez.',
      'Yüz, Gözler ve Kafa Koruması: ProneView kask veya jel at nalı destek ile göz kürelerine sıfır bası teyit edilir.',
      'Üst ekstremiteler ve ulnar sinirler silikon pedlerle korunur.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Modifiye RSI (SÜKSİNİLKOLİN MUTLAK YASAK!):',
      '  - GÖRH/aspirasyon riski yüksek CP hastalarında Süksinilkolinsiz modifiye RSI: Propofol (2.5 - 3.5 mg/kg) + Remifentanil (2 - 4 mcg/kg bolus veya infüzyon) ile kas gevşeticisiz entübasyon VEYA düşük doz Rokuronyum (0.3 - 0.45 mg/kg) + cerrahi EMG testi öncesinde Sugammadeks ile tam antagonizasyon (TOF %100).',
      '  - Premedikasyon/indüksiyonda Midazolamdan KAÇINILIR (SDR EMG ve H-reflekslerini baskılar!).',
      'İdame (TIVA Altın Standart):',
      '  - Propofol (100 - 160 mcg/kg/dk) + Remifentanil (0.1 - 0.3 mcg/kg/dk) — idamede KESİNLİKLE kas gevşetici eklenmez! > 0.5 MAC volatil anestezikler (Sevofluran/Desfluran/İzofluran) H-refleks ve polisinaptik EMG yanıtlarını baskıladığından kullanılmaz.',
      'Elektrofizyolojik Kökçük Uyarım Fazı (SDR Testing):',
      '  - L2 - S2 dorsal kökçükleri 0.1 - 1.0 mA ile uyarılır; sürekli klonik/yayılan/kontralateral anormal yanıt veren kökçükler (%30 - %50) kesilir; S2 - S4 anal sfinkter EMG yanıtı veren kökçükler KESİNLİKLE KORUNUR.',
      'Kan Koruma, Sıvı ve Normotermi:',
      '  - Çok seviyeli laminotomide TXA (10 - 15 mg/kg yükleme + 1 - 5 mg/kg/saat infüzyon) ve preop ABL takibi.',
      '  - Ketojenik diyetteki CP çocuklarında yalnızca %0.9 NaCl (Dekstroz ve Ringer Laktat YASAK!); diğer hastalarda 37°C ısıtılmış dengeli kristalloid. Açık subaraknoid irrigasyon 37.5°C, oda sıcaklığı > 24°C ve aktif hava ısıtıcı battaniye kullanılır.',
      'Dural Kapanış Öncesi İntratekal Analjezi:',
      '  - Geniş dural açılış nedeniyle epidural/kaudal blok yerine, dural kapanış öncesinde cerrah tarafından doğrudan görüş altında koruyucusuz İNTRATEKAL MORFİN (2 - 5 mcg/kg) uygulanabilir (+ postop 24 saat sürekli SpO2/apne izlemi!).'
    ],
    airwayManagement: [
      'Spiral telli (wire-reinforced) lateks-free oral endotrakeal tüp.',
      'Pediatrik hastalarda prone pozisyonda baş hareketleriyle tüpün ana bronşa kayması veya çıkmasını önlemek için iki taraflı oskültasyon, sağlam sabitleme ve sürekli EtCO2/SpO2 takibi.',
      'Kaf basıncı manometre ile ≤ 20 cmH2O düzeyinde korunur.'
    ],
    criticalSurgicalStages: [
      '1. Lateks-Free Prone Pozisyonlama (Kontraktür koruması, serbest batın) ve Floroskopik L1 - L2 Seviye Doğrulama.',
      '2. Laminoplasti / Çok Seviyeli Laminotomi (ABL ve TXA ile kanama kontrolü).',
      '3. Geniş Dural Açılış ve Kauda Ekuina / Konus Medullaris Diseksiyonu.',
      '4. Ventral (Motor) ve Dorsal (Duyu) Kök Ayrımı; TOF %100 ve TIVA derinliğinin sabitlenmesi.',
      '5. L2 - S2 Dorsal Kökçük EMG Testlemesi, Selektif Transeksiyon ve S2 - S4 Anal Sfinkter Koruması.',
      '6. İsteğe Bağlı Doğrudan Görüş Altında Koruyucusuz İntratekal Morfin (2 - 5 mcg/kg), Su Geçirmez Dural Tamir ve Valsalva (25 - 30 cmH2O) BOS Kaçağı Kontrolü.',
      '7. Laminoplasti Kapanışı ve Supin Pozisyona Dönüş.'
    ],
    emergenceNotes: [
      'Supin Pozisyonda Öksürmesiz Pürüzsüz Uyanma: Ikınma dural dikiş hattından BOS fistülü ve psödomeningosele yol açar. Ekstübasyon için IV Lidokain kullanılacaksa, cerrahi yara yerine uygulanan Ropivakain/Bupivakain ile KÜMÜLATİF LAST (maksimum lokal anestezik toksik dozu) titizlikle hesaplanmalıdır!',
      'Erken Nörolojik Muayene: İstemli ayak bileği/parmak hareketleri (aşırı rezeksiyon/flask felç dışlanması) ve sfinkter tonusu değerlendirilir.',
      'Normotermi (> 36.5°C) ve ITB Yoksunluk Alarmı: Titreme önlenir; ITB öykülü hastalarda ateş, aşırı rijidite, taşikardi veya kaşıntı gelişirse derhal ITB Yoksunluk Krizi protokolü başlatılır.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'İntradural Cerrahiye Özel Güvenli Multimodal Analjezi Protokolü:',
      '  - Doğrudan Görüş Altında Koruyucusuz İntratekal Morfin (2 - 5 mcg/kg — dural kapanış öncesi cerrah tarafından yerleştirilir; postop 24 saat sürekli SpO2 ve solunum hızı izlemi ZORUNLUDUR!). NOT: Geniş dural açılışta epidural kateter veya kaudal blok lokal anesteziğin intratekal sızıntısı (total spinal anestezi, BOS kaçağı, nörolojik muayenenin maskelenmesi) riski taşır!',
      '  - Yara Yeri Subkütan İnfiltrasyonu (%0.2 Ropivakain — IV Lidokain ile kümülatif LAST limitine kesinlikle dikkat edilir!).',
      '  - Düzenli IV Parasetamol (15 mg/kg 6 saatte bir infüzyon; erişkin 1000 mg).',
      '  - Postoperatif Deafferentasyon Kas Spazmları İçin: Düzenli Oral/IV Diazepam (0.05 - 0.1 mg/kg) veya bazal oral Baklofen (rebound hiperrefleksik spazmları çözer).',
      '  - Kurtarma Analjeziği: PCA / Hemşire Kontrollü Analjezi (düşük doz IV Morfin/Fentanil; intratekal morfin verildiyse solunum depresyonu açısından sıkı titre edilir).',
      '  - ERKEN KETOROLAK / NSAİİ YASAĞI: Geniş intradural SDR/DREZ cerrahisi sonrası erken dönemde rutin Ketorolak veya NSAİİ verilmez (intraspinal/subaraknoid hematom riski! Yalnızca nöroşirürji hemostaz onayı sonrası ≥ 24 - 48 saatte değerlendirilir).'
    ],
    prospectRecommendations: [
      'Pediatrik SDR için özel yayımlanmış bir PROSPECT kılavuzu bulunmamaktadır; doğrudan görüş altında koruyucusuz intratekal morfin (sürekli SpO2 izlemiyle), düzenli Parasetamol (15 mg/kg) ve antispazmodik (Diazepam) kombinasyonu postoperatif şiddetli radiküler ağrıyı ve rebound spazmları güvenle kontrol eder.'
    ],
    erasRecommendations: [
      'Postoperatif SDR ve Spastisite Cerrahisi Güvenlik Protokolü:',
      '  - Düz Supin Yatak İstirahati: Dural tamiri korumak ve BOS kaçağını önlemek için ilk 24 - 48 saat baş elevasyonu < 15 - 20° tutulur.',
      '  - İntratekal Morfin ve Solunum İzlemi: Koruyucusuz intratekal morfin uygulanan tüm çocuklarda ilk 24 saat sürekli SpO2, solunum sayısı ve sedasyon skoru (ve hazır IV Nalokson) takibi zorunludur.',
      '  - ITB Yoksunluk / Doz Aşımı Takibi: Pompadan geçiş yapılan veya yüksek doz oral baklofen alan olgularda ateş, rijidite, kaşıntı ve otonomik fırtına (yoksunluk) veya somnolans/apne (doz aşımı) yakından izlenir.',
      '  - Sfinkter ve Yara Takibi: İdrar retansiyonu (Foley sonda 48 saat) ve insizyonda BOS sızıntısı/psödomeningosel kontrolü.',
      '  - Erken Yoğun Fizyoterapi: 48 - 72. saatten itibaren güçlendirme ve yürüyüş rehabilitasyonu.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery - Functional Neurosurgery: Surgery for Spasticity. Philadelphia: Wolters Kluwer.',
    otherReferences: [
      'Peacock, W. J., & Staudt, L. A. (1991). Selective posterior rhizotomy: indications, surgical technique, and results. Child\'s Nervous System, 7(4), 182-188.',
      'Farmer, J. P., & Sabbagh, A. J. (2007). Selective dorsal rhizotomies in the treatment of spasticity related to cerebral palsy. Child\'s Nervous System, 23(9), 991-1002.',
      'Tedroff, K., Löwing, K., & Åström, E. (2015). A prospective cohort study investigating gross motor function, pain, and health-related quality of life 17 years after selective dorsal rhizotomy in cerebral palsy. Developmental Medicine & Child Neurology, 57(5), 484-490.',
      'Coffey, R. J., Edgar, T. S., Francisco, G. E., et al. (2002). Abrupt withdrawal from intrathecal baclofen: recognition and management of a potentially life-threatening syndrome. Archives of Physical Medicine and Rehabilitation, 83(6), 735-741.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Intraoperative Neurophysiological Monitoring and Pediatric Anesthetic Considerations in Selective Dorsal Rhizotomy.'
    ]
  }
};
