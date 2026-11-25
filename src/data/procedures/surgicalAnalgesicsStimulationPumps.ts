import { ProcedureDefinition } from '../../types/procedures';

/**
 * Cerrahi Analjezik Yöntemler: Omurilik Stimülasyonu (SCS), İntratekal İlaç Pompaları ve Motor Korteks Stimülasyonu (MCS)
 * (Surgical Analgesics: Spinal Cord Stimulation, Intrathecal Pumps, and Motor Cortex Stimulation)
 *
 * Jaffe (6th ed., 2020, Section II: Neurosurgery - Functional Neurosurgery: Surgical Analgesics),
 * ASRA/ESRA/AAPM/INS/NANS/WIP Anticoagulation Guidelines (Narouze et al., Reg Anesth Pain Med 2018),
 * NACC (Deer et al., 2014), PACC (Deer et al., 2017), PROSPECT Craniotomy (Mestdagh et al., EJA 2023)
 * ve SNACC Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const surgicalAnalgesicsStimulationPumps: ProcedureDefinition = {
  id: 'surgical-analgesics-scs-itp-mcs',
  name: 'Cerrahi Analjezik Yöntemler: Omurilik Stimülasyonu (SCS), İntratekal İlaç Pompaları ve Motor Korteks Stimülasyonu (MCS)',
  shortCode: 'SCS-İTP-MCS',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Ağrı Nöroşirürjisi (Nöromodülasyon)',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Medikal ve konvansiyonel cerrahi tedavilere dirençli şiddetli kronik nöropatik, iskemik veya nosiseptif ağrı ile ağır spastisitede uygulanan üç ana nöromodülasyon cerrahisini kapsar: (1) Omurilik Stimülasyonu (Spinal Cord Stimulation — SCS): Perkütan silindirik elektrot veya açık laminotomi ile dorsal epidural mesafeye paddle (plaka) elektrot yerleştirilip IPG\'ye bağlanmasıdır (konvansiyonel parestezi bazlı sistemlerin yanı sıra modern parestezisiz 10 kHz [HF10] ve burst SCS sistemleri anatomik T8 - T10 hedeflemesiyle uyanık parestezi testi gerektirmeyebilir; genel anestezi altındaki paddle lead olgularında EMG/CMAP orta hat simetri ve SSEP kollizyon testi kullanılır). (2) İntratekal İlaç Dağıtım Sistemleri (ITDD — Ağrı & Baklofen Pompası): Lomber subaraknoid kateterin abdominal subkütan cebe implante edilen programlanabilir infüzyon pompasına (örn. SynchroMed II) bağlanmasıyla Morfin/Hidromorfon, Zikonotid veya Baklofenin doğrudan dorsal boynuz reseptörlerine verilmesidir. (3) Motor Korteks Stimülasyonu (MCS): Kraniyotomi ile primer motor korteks (M1) üzerine epidural/subdural strip elektrot yerleştirilip subklaviküler IPG\'ye tünellenmesidir.',
  indications: [
    'Omurilik Stimülasyonu (SCS): Başarısız Bel Cerrahisi Sendromu (FBSS), Kompleks Bölgesel Ağrı Sendromu (CRPS Tip I/II), revaskülarizasyona uygun olmayan kritik Periferik Arter Hastalığı (PAH), refrakter anjina pektoris (inoperabl koroner arter hastalığı), post-herpetik nevralji ve ağrılı diyabetik nöropati',
    'İntratekal Baklofen (ITB) Pompası: Serebral palsi, spinal kord yaralanması, MS veya inme sekeli şiddetli spastisite (Ashworth ≥ 3 - 4)',
    'İntratekal Analjezik (Morfin / Hidromorfon / Zikonotid) Pompası: Refrakter kanser ağrısı, başarısız bel cerrahisi ve sistemik opioid toksisitesi nedeniyle kontrol edilemeyen ağır kronik ağrılar',
    'Motor Korteks Stimülasyonu (MCS): Santral inme sonrası talamik ağrı (Dejerine-Roussy), Trigeminal Anesteziya Dolorosa, fantom ekstremite ağrısı ve brakiyal pleksus avülsiyon ağrısı',
    'Donanım Revizyonu ve Pil/Pompa Değişimi: Batarya ömrü dolan IPG veya pompaların değişimi, kateter kırığı/migrasyonu veya kateter ucu granülomu revizyonu'
  ],
  averageDuration: '1.5 - 4.5 saat (Perkütan SCS + IPG: 1.5 - 2.5 saat; Açık Laminotomi Paddle Lead SCS + IPG: 2.0 - 3.5 saat; İntratekal Pompa [Lomber girişim + Abdominal cep + Tünelleme]: 1.5 - 2.5 saat; Motor Korteks Stimülasyonu [Kraniyotomi + Faz Dönüşümü/Haritalama + Subklaviküler IPG]: 3.0 - 4.5 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '50 - 200 mL (Perkütan SCS ve İntratekal Pompada < 30 - 100 mL; Açık Torasik Laminotomi Paddle SCS ve MCS Kraniyotomisinde 100 - 250 mL)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Hacimli Kan Kaybı (Ancak Spinal Epidural veya İntrakraniyel Hematom Kalıcı Felç/Ölüm Riski Taşır)',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması zorunludur; açık laminotomi veya MCS kraniyotomisinde 1 - 2 Ünite ES hazır bulundurulmalıdır',
    transfusionProbability: '< %2 (Standart nöromodülasyon girişimlerinde transfüzyon nadirdir)',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — prone pozisyonda karın basısıyla şiddetlenir; spinal epidural hematom parapleji riski!)',
      'Spinal Arteriyel Perforatörler ve Radiküler Damarlar',
      'Abdominal / Gluteal / Subklaviküler Cep Hematomu (A. epigastrica inferior, gluteal perforatörler, A. thoracica interna dalları)',
      'Subkütan Tünel Hattı Kanamaları',
      'MCS İçin: Orta meningeal arter, dural sinüsler ve kortikal yüzeyel venler'
    ],
    hemostasisStrategies: [
      'Yalnızca BİPOLAR mikronöroşirürjikal koagülasyon (spinal kord/dura yakınında ve implante IPG/pompa varlığında monopolar koter hasar riski taşır; diatermi MUTLAK KONTRENDİKEDİR!)',
      'Epidural sahada hemostatik matriks ajanları (FloSeal, Surgicel, Gelfoam)',
      'ASRA/NACC 2018 yüksek riskli nöroaksiyel antikoagülan kesim kurallarına %100 uyum'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Konvansiyonel Perkütan SCS İçin: Lokal Anestezi + Titre MAC (Deksmedetomidin 0.2 - 0.5 mcg/kg/saat veya ultra-düşük doz Remifentanil) + ZORUNLU yan akım (sidestream) EtCO2 kapnografi; parestezi testinde hasta tam uyanık ve koopere olmalıdır (NOT: Modern parestezisiz 10 kHz [HF10] ve burst SCS sistemlerinde anatomik hedefleme ile uyanık parestezi testi gerekmeyebilir)',
      'Açık Laminotomi Paddle Lead SCS İçin: Genel Endotrakeal Anestezi (TIVA: Propofol + Remifentanil — kas gevşeticisiz / TOF %100 idame) ile uyuyan (asleep) EMG/CMAP orta hat simetri ve SSEP kollizyon testi',
      'İntratekal İlaç Pompası (ITDD) İçin: Genel Endotrakeal Anestezi (GETA) veya seçilmiş olgularda Lokal Anestezi + MAC (sidestream EtCO2 ile)',
      'Motor Korteks Stimülasyonu (MCS) İçin: Genel Endotrakeal Anestezi (TIVA: Propofol + Remifentanil) + SSEP N20/P20 faz dönüşümü ve kortikal motor haritalama (veya uyanık kraniyotomi)'
    ],
    alternative: [
      'Spinal veya Epidural Blok: SCS yerleşiminde KONTRENDİKEDİR (nörolojik geribildirimi ve epidural mesafe güvenliğini engeller)',
      'İzole Pil/Pompa Değişimi: Lokal Anestezi + Hafif MAC (sidestream EtCO2 + bipolar koter güvenliği)'
    ],
    clinicalRationale: 'Konvansiyonel perkütan SCS\'de uyanık parestezi haritalaması için titre MAC + zorunlu sidestream EtCO2 ve prone acil hava yolu kurtarma planı gerekirken; açık paddle lead SCS\'de EMG/CMAP orta hat testi ve SSEP kollizyonu için kas gevşeticisiz Propofol + Remifentanil TIVA + spiral telli ETT altın standarttır. Genel anestezi altındaki tüm prone olgular EKSTÜBASYONDAN ÖNCE MUTLAKA SUPİN POZİSYONA ÇEVRİLMELİDİR.',
    notes: 'NÖROMODÜLASYON VE AĞRI POMPALARINDA 6 HAYATİ ANESTEZİ KURALI: (1) ASRA/NACC 2018 YÜKSEK RİSKLİ ANTİKOAGÜLAN KURALLARI (VARFARİN INR ≤ 1.2, APİKSABAN/RİVAROKSABAN 72 SA, DABİGATRAN 96-120 SA, TERAPÖTİK DMAH 24 SA, PRASUGREL 7-10 GÜN); (2) PRONE EKSTÜBASYON KESİNLİKLE YASAK (ÖNCE SUPİNE ÇEVİR!) + PRONE MAC ACİL HAVA YOLU VE SİDESTREAM EtCO2; (3) OPİOİD TOLERANSLI HASTA PROTOKOLÜ (BAZAL OPİOİD/FENTANİL YAMASINA DEVAM, FENTANİL YAMASI ÜZERİNE ISITICI BATTANİYE YASAK!, TRAMADOL YASAK — DULOKSETİN SEROTONİN SENDROMU & MCS NÖBETİ!); (4) ITDD DERİN GÜVENLİK: ITB YOKSUNLUK, OPİOİD DOZ AŞIMINDA IV NALOKSON, ZİKONOTİD NÖROPSİKİYATRİK/CK TOKSİSİTESİ, CAP PORTU KAZARA BOLUS TEHLİKESİ; (5) SYNCHROMED II MRG ROTOR KİLİTLENMESİ (POST-MRG SORGULAMA ŞART!), KATETER UCU GRANÜLOMU VE DİATERMİ YASAĞI; (6) MCS NÖBETİ (4°C SF), ANJİNA SCS ANTİ-İSKEMİK YÖNETİM VE POST-MCS/EPİDURAL NSAİİ HEMATOM UYARISI.',
    rulesTitle: 'SCS, İNTRATEKAL POMPA VE MCS CERRAHİSİNDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'ASRA / NACC 2018 YÜKSEK RİSKLİ NÖROAKSİYEL ANTİKOAGÜLAN KESİM KURALLARI',
        content: 'Spinal epidural hematom parapleji riski nedeniyle yüksek riskli kurallar kesindir: Varfarin INR ≤ 1.2 (≤ 1.4 DEĞİL!) olmalıdır; Apiksaban/Rivaroksaban 72 saat (5 yarılanma ömrü), Dabigatran 96 - 120 saat (4 - 5 gün; CrCl < 50 mL/dk ise daha uzun!), Terapötik DMAH 24 saat (profilaktik 12 saat), Prasugrel 7 - 10 gün, Klopidogrel 7 gün, Tikagrelor 5 gün; Aspirin primer profilakside 4 - 6 gün kesilir (sekonder koroner profilakside kardiyoloji–ağrı/nöroşirürji konseyiyle bireyselleştirilir).'
      },
      {
        number: 2,
        title: 'PRONE POZİSYONDA EKSTÜBASYON YASAK + UYANIK PRONE MAC ACİL HAVA YOLU VE EtCO2',
        content: 'Genel anestezi altındaki tüm prone hastalar EKSTÜBASYONDAN ÖNCE MUTLAKA SUPİN (SIRTÜSTÜ) POZİSYONA ÇEVRİLİR! Uyanık prone MAC olgularında sürekli yan akım (sidestream) EtCO2 kapnografi ZORUNLUDUR; ameliyathanede sedye/yatak hemen hazır bekletilir ve apne/obstrüksiyon acilinde kurtarıcı LMA yerleşimi ve/veya hızlı supin çevirme + entübasyon algoritması uygulanır.'
      },
      {
        number: 3,
        title: 'OPİOİD TOLERANSLI HASTA PROTOKOLÜ, FENTANİL YAMASI ISI YASAĞI VE TRAMADOL YASAĞI',
        content: 'Kronik ağrı hastalarının sabah bazal opioidleri ve transdermal Fentanil yaması KESİNTİSİZ DEVAM ETTİRİLİR. KRİTİK UYARI: Sıcak hava üfleyen ısıtıcı battaniye (Bair Hugger) KESİNLİKLE transdermal Fentanil yamasının üzerine konmaz (aşırı emilim → ölümcül solunum arresti!). Düşük doz IV Ketamin, IV Lidokain ve Deksmedetomidin eklenir; Duloksetin/Gabapentin/Pregabalin sürdürülür. TRAMADOL KESİNLİKLE YASAKTIR (Duloksetin ile Serotonin Sendromu ve MCS\'de nöbet riski!).'
      },
      {
        number: 4,
        title: 'ITDD KRİTİK ACİLLERİ: ITB YOKSUNLUK, OPİOİD/NALOKSON, ZİKONOTİD VE CAP PORTU TEHLİKESİ',
        content: 'ITB Yoksunluk Krizinde (hipertermi, rijidite, rabdomiyoliz, nöbet, DİK): Acil intratekal baklofen restorasyonu + yüksek doz IV Benzodiazepinler + enteral Baklofen + Siproheptadin + soğutma/YBÜ. İntratekal Opioid Doz Aşımında: Titre IV NALOKSON + ventilasyon desteği. ZİKONOTİD ağır nöropsikiyatrik toksisite (psikoz, halüsinasyon, konfüzyon) ve CK artışı/rabdomiyoliz yapar ve NALOKSON İLE GERİ DÖNMEZ! Pompa dolumunda ilacın yanlışlıkla Kateter Erişim Portuna (CAP) verilmesi subaraknoid mesafeye 100 - 1000 kat bolus göndererek ani ölümcül arreste yol açar!'
      },
      {
        number: 5,
        title: 'SYNCHROMED II MRG ROTOR KİLİTLENMESİ, KATETER UCU GRANÜLOMU VE DİATERMİ YASAĞI',
        content: 'SynchroMed II pompalarında MRG manyetik alanı pompa rotorunu durdurur (stalling) — MRG sonrası ZORUNLU TELEMETRİK SORGULAMA (post-MRI interrogation) ile motorun yeniden çalıştığı doğrulanmazsa sessiz ITB yoksunluk krizi gelişir! Yüksek konsantrasyonlu IT opioidlerde progresif paraparezi + doz artışında KATETER UCU GRANÜLOMU acil kontrastlı MRG ile dışlanır. İmplante IPG/pompada bipolar koter tercih edilir; kısa dalga/mikrodalga DİATERMİ MUTLAK KONTRENDİKEDİR.'
      },
      {
        number: 6,
        title: 'UYUYAN PADDLE EMG/CMAP TESTİ, MCS NÖBETİ, ANJİNA SCS VE POST-MCS/EPİDURAL NSAİİ UYARISI',
        content: 'Açık paddle lead SCS\'de EMG/CMAP orta hat testi ve SSEP kollizyonu için kas gevşeticisiz (TOF %100) TIVA şarttır. MCS kortikal stimülasyonunda akut nöbet için 4°C buzlu SF + IV Propofol/Levetirasetam hazır tutulur. Refrakter anjina SCS\'de beta-blokerler sürdürülür ve taşikardi/hipotansiyon önlenir. Açık epidural laminotomi veya MCS kraniyotomisi sonrası erken dönemde rutin NSAİİ verilmez (hematom riski; cerrahi hemostaz/görüntüleme onayı şarttır!).'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Algoloji / Ağrı Tıbbı ve Nöroloji Konsültasyonu: Kronik ağrı/spastisite etiyolojisi, perkütan deneme (trial) yanıtı (≥ %50 iyileşme), hedeflenen dermatom veya ITDD ilaç konsantrasyonu (Morfin/Hidromorfon/Zikonotid/Baklofen) ve pompa tipi (SynchroMed II vb.).',
      'Kardiyoloji Konsültasyonu: Refrakter anjina pektoris veya kritik PAH nedeniyle SCS planlanan olgularda EKO, iskemik eşik, anti-iskemik ilaçların (beta-bloker, nitrat, statin) ameliyat sabahı kesintisiz devamı ve antikoagülan/antiagregan köprüleme kararı.',
      'Psikiyatri / Enfeksiyon Hastalıkları Konsültasyonu: Kronik ağrı değerlendirmesi, aktif sistemik/lokal enfeksiyonun kesin dışlanması (implant cerrahisinde mutlak kontrendikasyon).'
    ],
    historyAndPhysical: [
      'KRONİK OPİOİD VE ADJUVAN İLAÇ ENVANTERİ: Günlük oral morfin eşdeğeri (OME), transdermal Fentanil yaması (lokalizasyonu işaretlenir — ısıtıcı battaniye altına GİRMEZ!), Metadon (QT uzaması!), Gabapentin/Pregabalin ve Duloksetin (SNRI — Tramadol ile Serotonin Sendromu!).',
      'Ayrıntılı Nörolojik Taban Muayenesi: Ekstremite motor kuvveti (0 - 5), duyu dermatomları, refleksler ve mesane/bağırsak kontrolü; mevcut IT opioid pompalarında artan doz ihtiyacı veya yeni bacak güçsüzlüğü varsa kateter ucu granülomu sorgulanır.',
      'Hava Yolu ve Cilt Muayenesi: Prone/lateral pozisyon hava yolu güvenliği (servikal spondiloz, ankilozan spondilit, OSA) ve girişim/cep bölgelerinde cilt bütünlüğü.'
    ],
    laboratoryAndTests: [
      'ASRA / NACC 2018 YÜKSEK RİSKLİ NÖROAKSİYEL ANTİKOAGÜLAN VE ANTİAGREGAN KESİM PROTOKOLÜ:',
      '  - Varfarin: Kesilir ve işlem öncesi INR ≤ 1.2 doğrulanır!',
      '  - Apiksaban / Rivaroksaban: 72 saat (5 yarılanma ömrü) önceden kesilir.',
      '  - Dabigatran: 96 - 120 saat (4 - 5 gün) önceden kesilir (CrCl < 50 mL/dk ise daha uzun bekleme ve/veya dilüe trombin zamanı kontrolü!).',
      '  - Terapötik DMAH (LMWH): 24 saat; Profilaktik DMAH: 12 saat önce kesilir.',
      '  - Prasugrel: 7 - 10 gün; Klopidogrel: 7 gün; Tikagrelor: 5 gün önce kesilir.',
      '  - Aspirin: Yüksek riskli spinal girişimlerde primer profilakside 4 - 6 gün önce kesilir; sekonder kardiyovasküler/stent profilaksisinde kardiyoloji ve cerrahi ekip ortak kararıyla risk-yarar bireyselleştirilir.',
      'Tam Kan Sayımı (Trombosit ≥ 100.000/mm³), Koagülasyon Paneli (PT, aPTT, INR ≤ 1.2) ve Böbrek Fonksiyonları (eGFR/CrCl — DOAC klirensi için zorunlu!).',
      'Zikonotid alan hastalarda bazal Serum Kreatin Kinaz (CK); Metadon/anjina hastalarında 12 derivasyonlu EKG (QTc ve ST segmenti).',
      'Omurga / Kranyal MRG (epidural kanal açıklığı, spinal stenoz veya kateter ucu granülomu değerlendirmesi).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (refrakter anjina SCS\'de ST segment analizi + vazovagal bradikardi için sesli QRS tonu), NIBP (3 - 5 dk), SpO2, sıcaklık ve TÜM MAC/GETA OLGULARINDA ZORUNLU sürekli EtCO2 kapnografi (uyanık MAC\'te sidestream nazal EtCO2).',
      'İnvaziv Arter Basıncı İzlemi (A-Line): Refrakter anjina pektoris / ciddi KAH, açık laminotomi paddle SCS veya MCS kraniyotomisinde anlık hemodinamik kontrol için.',
      'İntraoperatif Nöromonitörizasyon (İONM): Uyuyan (asleep) açık paddle lead SCS\'de EMG/CMAP orta hat simetri testi ve SSEP kollizyon testi; MCS\'de SSEP N20/P20 faz dönüşümü ve kortikal motor haritalama (TOF %100 doğrulaması!).',
      'Floroskopi (C-Kollu Skopi) Güvenliği ve > 2 saatlik genel anestezi olgularında Foley mesane sondası.'
    ],
    vascularAccess: [
      'En az 1 - 2 adet geniş çaplı (16 - 18G) periferik intravenöz yol (pronedan önce güvenli akış teyit edilir)',
      'Anjina/KAH veya MCS olgularında invaziv radiyal arter kanülasyonu'
    ],
    patientPosition: 'SCS ve İntratekal Pompada PRONE (Yüzüstü) veya LATERAL DEKÜBİTÜS; MCS Olgularında SUPİN (Mayfield Çivili Başlık)',
    patientPositionDetails: [
      'Prone Pozisyonda Serbest Batın: Göğüs ve pelvis silikon destekleri / Wilson çerçevesi ile karın boşlukta asılı tutulur (Vena Cava Inferior ve Batson epidural venöz pleksus kanamasını azaltır).',
      'Göz, Yüz ve Sinir Koruması: ProneView koruyucu destekle göz kürelerine sıfır bası; brakiyal pleksus ve ulnar sinir nötral pozisyonda jel pedlerle korunur.',
      'TRANSDERMAL FENTANİL YAMASI VE ISITMA GÜVENLİĞİ: Sıcak hava üfleyen battaniye (Bair Hugger) KESİNLİKLE Fentanil yamasının doğrudan üzerine yerleştirilmez (yama konumu anestezi ekibince görsel olarak işaretlenir!).',
      'Uyanık Prone MAC Güvenliği: Acil supin çevirme için boş hasta sedyesi ameliyathane kapısı/yanında anında hazır bekletilir.'
    ],
    anesthesiaManagement: [
      'Opioid Toleranslı Hasta ve Refrakter Anjina Hazırlığı:',
      '  - Sabah bazal opioidler/Fentanil yaması ve anjina hastalarında beta-bloker/anti-iskemik tedavi kesintisiz devam eder; taşikardi, hipertansiyon ve hipotansiyondan kaçınılır.',
      '  - Multimodal adjuvanlar: Düşük doz IV Ketamin (0.25 - 0.5 mg/kg bolus + 0.1 - 0.2 mg/kg/saat; MCS\'de kortikal uyarım/nöbet dengesi gözetilerek), IV Lidokain infüzyonu (1 - 1.5 mg/kg/saat — yara yeri LA ile kümülatif LAST limitine dikkat!) ve Deksmedetomidin.',
      'Perkütan SCS (Uyanık MAC vs Modern Parestezisiz 10 kHz / Burst SCS):',
      '  - Konvansiyonel parestezi haritalamasında Deksmedetomidin (0.2 - 0.5 mcg/kg/saat) + lokal anestezi + ZORUNLU sidestream EtCO2; test anında hasta tam uyanık ve koopere olmalıdır.',
      '  - Modern parestezisiz 10 kHz (HF10) veya burst SCS sistemlerinde anatomik hedefleme (T8 - T10) yapıldığından uyanık parestezi testi gerekmeyebilir.',
      'Açık Laminotomi Paddle Lead SCS (Uyuyan / Asleep Protokol):',
      '  - TIVA (Propofol + Remifentanil), entübasyon sonrası kas gevşeticisiz idame (TOF %100). EMG/CMAP orta hat simetri ve SSEP kollizyon testi ile paddle elektrotun anatomik ve fizyolojik orta hatta olduğu doğrulanır.',
      'İntratekal Pompa (ITDD) Kritik Güvenlik Protokolü:',
      '  - Pompa dolumu/kontrolünde konsantre ilacın yanlışlıkla Kateter Erişim Portuna (CAP) enjekte edilmemesi hayati önem taşır (subaraknoid 100 - 1000 kat bolus → ani arrest!).',
      '  - İntratekal Opioid Doz Aşımı: Titre IV NALOKSON (0.04 - 0.4 mg IV, gerekirse infüzyon) + solunum desteği + pompa durdurma.',
      '  - Akut ITB Doz Aşımı: Acil entübasyon, mekanik ventilasyon, pompa durdurma, 30 - 40 mL BOS aspirasyonu ve vazopresör destek.',
      '  - Zikonotid Toksisitesi: Ciddi konfüzyon/psikoz/halüsinasyon ve CK yüksekliği/rabdomiyoliz (NALOKSON ETKİSİZDİR — infüzyon derhal kesilir!).',
      'Motor Korteks Stimülasyonu (MCS) Nöbet Protokolü:',
      '  - M1 kortikal stimülasyonunda nöbet gelişirse: Stimülasyonu durdur → 4°C BUZLU SOĞUK SF (30 - 50 mL) dök → durmazsa IV Propofol (20 - 50 mg) ve IV Levetirasetam.',
      'Tünelleme Analjezisi ve Koter/Enfeksiyon Önlemi:',
      '  - Tünel hattına yoğun lokal anestezik infiltrasyonu; profilaktik antibiyotik (Sefazolin/Vankomisin) insizyondan önce zamanında verilir (implant enfeksiyonu = tam eksplantasyon!). Yalnızca bipolar koter kullanılır; diatermi MUTLAK KONTRENDİKEDİR.'
    ],
    airwayManagement: [
      'Uyanık Prone MAC Olgularında: Nazal kanül O2 + ZORUNLU sürekli sidestream EtCO2 kapnografi. Acil hava yolu kurtarma planı: Sedye ameliyathanede hazır; apne/desatürasyon/aspirasyonda kurtarıcı LMA yerleşimi ve/veya steril koruma ile hızlı SUPİN çevirme + endotrakeal entübasyon!',
      'Genel Anestezi Prone Olgularında: Spiral telli (wire-reinforced) oral ETT; ısırma bloğu, sağlam tespit ve 20 - 25 cmH2O kaf basıncı.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama (Prone serbest batın / Fentanil yaması ısı kontrolü) ve Floroskopik Seviye Doğrulama.',
      '2. Epidural (LOR) / Subaraknoid (berrak BOS) Giriş ve Elektrot/Kateter İlerletilmesi.',
      '3. İntraoperatif Fizyolojik Doğrulama (Uyanık SCS parestezi testi / Asleep paddle EMG-CMAP & SSEP kollizyon / MCS SSEP N20-P20 faz dönüşümü).',
      '4. Subkütan IPG veya Pompa Cebi (Gluteal/Abdominal/Subklaviküler) ve Subkütan Trokar Tünellemesi (yüksek ağrılı uyaran!).',
      '5. Sistem Telemetrisi, Empedans/Akış Doğrulaması ve Katmanlı Su Geçirmez Kapanış.'
    ],
    emergenceNotes: [
      'ZORUNLU SUPİN EKSTÜBASYON: Genel anestezi altındaki tüm prone hastalar EKSTÜBASYONDAN ÖNCE MUTLAKA SUPİN (SIRTÜSTÜ) POZİSYONA ÇEVRİLİR! PRONE POZİSYONDA EKSTÜBASYON KESİNLİKLE YAPILMAZ! Supin pozisyonda IV Lidokain/düşük doz Remifentanil ile öksürmesiz pürüzsüz ekstübasyon (epidural venöz kanamayı önlemek için) sağlanır.',
      'Acil Postoperatif Nörolojik Muayene: Hasta uyanır uyanmaz dört ekstremitede istemli motor güç (ayak bileği dorsifleksiyonu, kuadriseps, üst ekstremite) teyit edilip belgelenir.',
      'Epidural Hematom Alarmı: Yeni gelişen bacak kuvvetsizliği, şiddetli sırt ağrısı veya sfinkter kaybı acil MRG ve ilk 6 saatte cerrahi dekompresyon gerektirir!'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Opioid-Toleranslı Hasta Uyumlu Güvenli Multimodal Analjezi Protokolü:',
      '  - İnsizyon, Cep ve Tünel Hatlarına Lokal Anestezik İnfiltrasyonu (%0.25 Bupivakain veya Ropivakain — intraop IV Lidokain kullanıldıysa kümülatif LAST sınırına dikkat!).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - Kronik Bazal Ağrı Rejiminin Kesintisiz Devamı: Hastanın bazal opioidleri (veya Fentanil yaması) + nöropatik adjuvanları (Gabapentin, Pregabalin, Duloksetin) aksatılmadan sürdürülür; akut cep/tünel ağrısı için toleransa göre titre edilmiş kısa etkili kurtarma opioidleri (IV Fentanil, Hidromorfon veya Oksikodon) eklenir.',
      '  - MUTLAK YASAK VE HEMATOM UYARISI: TRAMADOL KESİNLİKLE KULLANILMAZ (Duloksetin ile Serotonin Sendromu ve MCS hastalarında nöbet riski!). Açık laminotomi paddle SCS veya MCS kraniyotomisi sonrasında erken dönemde rutin NSAİİ verilmez (spinal epidural veya intrakraniyel hematom riski — yalnızca nöroşirürji hemostaz/görüntüleme onayı sonrası ≥ 24 saatte düşünülebilir).'
    ],
    prospectRecommendations: [
      'Nöromodülasyon implantasyonları için özel bir PROSPECT kılavuzu bulunmamaktadır; MCS kraniyotomisinde PROSPECT Kraniyotomi 2023 (Mestdagh et al., EJA 2023) doğrultusunda skalp bloğu/infiltrasyon + düzenli Parasetamol, spinal girişimlerde ise insizyonel lokal anestezik + Parasetamol + bazal nöropatik/opioid devamı esastır.'
    ],
    erasRecommendations: [
      'Postoperatif Nöromodülasyon ve Pompa Güvenlik Protokolü:',
      '  - Saatlik Nörolojik Takip: İlk 24 saatte ekstremite motor/duyu muayenesi; yeni defisitte acil MRG (epidural hematom / MCS hematomu dışlanması).',
      '  - SynchroMed II MRG ve Diatermi Kartı: Hastaya implante cihaz kartı verilir; herhangi bir MRG çekimi sonrasında SynchroMed II pompasının rotor kilitlenmesi (stalling) riskine karşı ZORUNLU post-MRG telemetrik sorgulama yapılması ve kısa dalga/mikrodalga diaterminin ömür boyu yasak olduğu yazılı olarak bildirilir.',
      '  - Antikoagülan Yeniden Başlama (ASRA/NACC 2018): Cerrahi hemostaz doğrulandıktan sonra profilaktik antikoagülanlar en erken 24 saatte, terapötik antikoagülanlar cerrahi ekip onayıyla başlatılır.',
      '  - İntratekal Doz Titrasyonu ve Granülom/Yoksunluk İzlemi: Solunum depresyonu, ITB yoksunluğu ve enfeksiyon bulguları (profilaktik antibiyotik ≤ 24 saat) izlenir; 4 - 6. saatte kademeli mobilizasyon.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery - Functional Neurosurgery: Surgical Analgesics (Spinal Cord Stimulation, Intrathecal Pumps, and Cortical Stimulation). Philadelphia: Wolters Kluwer.',
    prospectReference: 'Mestdagh, F. P., Lavand\'homme, P. M., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group of ESRA. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Narouze, S., Benzon, H. T., Provenzano, D., et al. (2018). Interventional Spine and Pain Procedures in Patients on Antiplatelet and Anticoagulant Medications (Second Edition): Guidelines From ASRA, ESRA, AAPM, INS, NANS, and WIP. Regional Anesthesia and Pain Medicine, 43(3), 225-262.',
      'Deer, T. R., Mekhail, N., Provenzano, D., et al. (2014). The Appropriate Use of Neurostimulation of the Spinal Cord and Peripheral Nervous System for the Treatment of Chronic Pain and Ischemic Diseases: The Neuromodulation Appropriateness Consensus Committee (NACC). Neuromodulation, 17(6), 515-550.',
      'Deer, T. R., Pope, J. E., Hayek, S. M., et al. (2017). The Polyanalgesic Consensus Conference (PACC): Recommendations on Intrathecal Drug Infusion Systems Best Practices and Guidelines. Neuromodulation, 20(2), 96-132.',
      'Levy, R., Henderson, J., Slavin, K., et al. (2016). Consensus Guidelines for the Implementation and Management of Motor Cortex Stimulation in Chronic Neuropathic Pain Syndromes. Neurosurgery, 79(2), 241-252.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Guidelines on Intraoperative Neuromonitoring and Anesthetic Considerations in Functional Spine and Pain Neurosurgery.'
    ]
  }
};
