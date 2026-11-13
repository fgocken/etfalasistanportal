import { ProcedureDefinition } from '../../types/procedures';

/**
 * Posterior Lomber Omurga Cerrahisi: Laminektomi, Diskektomi, Foraminotomi ve Enstrümente Füzyon (TLIF, PLIF, Pedikül Vidaları L1-S1)
 * (Posterior Lumbar Spine Surgery: Laminectomy, Discectomy, Foraminotomy, and Instrumented Fusion)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Spine Surgery: Posterior Lumbar Spine Surgery, pp. 542-548),
 * North American Spine Society (NASS), International Society for the Advancement of Spine Surgery (ISASS),
 * Society for Neuroscience in Anesthesiology and Critical Care (SNACC)
 * ve ERAS Society Kompleks Lomber Omurga Cerrahisi Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const posteriorLumbarSpineSurgery: ProcedureDefinition = {
  id: 'posterior-lumbar-spine-surgery',
  name: 'Posterior Lomber Omurga Cerrahisi: Laminektomi, Diskektomi, Foraminotomi ve Enstrümente Füzyon (TLIF, PLIF, Pedikül Vidaları L1-S1)',
  shortCode: 'LOMBER-POST',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Kompleks Spinal Nöroşirürji',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Lomber ve lumbosakral omurgada (L1-S1 seviyeleri) spinal kanal darlığı (stenoz), lomber disk hernisi, dejeneratif veya istmik spondilolistezis (bel kayması), instabilite, travmatik patlama (burst) kırıkları veya tümörlerde posterior orta hat kesisiyle uygulanan majör dekompresyon ve füzyon ameliyatıdır. Paraspinal kaslar subperiosteal olarak faset eklemlerine kadar iki taraflı sıyrılır. Nöral basıyı ortadan kaldırmak için spinöz çıkıntı ve lamina kemikleri çıkarılır (Laminektomi / Hemilaminektomi), foramen genişletilir (Foraminotomi) ve dural kese/sinir kökünü ezen fıtıklaşmış nükleus pulposus dokusu eksize edilir (Mikrodiskektomi). Biyomekanik instabilite veya kayma durumunda, intervertebral disk mesafesine tek taraflı faset rezeksiyonuyla (TLIF - Transforaminal Lumbar Interbody Fusion) veya iki taraflı laminotomiyle (PLIF - Posterior Lumbar Interbody Fusion) lordotik PEEK/titanyum kafes ve otolog kemik grefti yerleştirilir; üst ve alt omurlara bikortikal/triangüle pedikül vidaları ve rodlar takılarak posterior rijit gergi bandı fiksasyonu sağlanır.',
  indications: [
    'Lomber Spinal Stenoz (Kanal Darlığı): Konservatif tedaviye dirençli nörojenik kladikasyon, bacaklarda uyuşma, yanma ve yürüme mesafesinde belirgin kısalma',
    'Lomber Disk Hernisi (Bel Fıtığı): L1-L5 ve L5-S1 seviyelerinde akut/kronik radikülopati, paraparezi veya ilerleyici motor kayıp (düşük ayak, kuadriseps zaafiyeti)',
    'Spondilolistezis (Lomber Bel Kayması): Derece I-III dejeneratif veya istmik kayma, instabilite ve mekanik bel ağrısı (TLIF/PLIF enstrümente füzyon endikasyonu)',
    'Kauda Ekuina Sendromu (Acil Cerrahi): Masif disk hernisi veya kitle basısına bağlı bilateral siyatik, eyer tarzı anestezi, idrar ve gaita inkontinansı/retansiyonu',
    'Başarısız Bel Cerrahisi Sendromu (FBSS) ve Psödoartroz: Önceki dekompresyon sonrası gelişen instabilite veya kaynamayan kemik füzyonunun revizyonu',
    'Lomber Omurga Travmaları ve Tümörleri: İnstabil patlama kırıkları veya metastatik patolojilerin posterior nöral dekompresyonu ve çok seviyeli pedikül vidalarıyla stabilizasyonu'
  ],
  averageDuration: '2.5 - 5.5 saat (Tek seviye mikrodiskektomi: 1.5 - 2.5 saat; 1-2 seviye laminektomi ve TLIF/PLIF enstrümantasyon: 3.0 - 4.5 saat; Çok seviyeli [3+ seviye] osteotomili deformite ve revizyon cerrahileri: 4.5 - 6.5 saat)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '400 - 1500 mL (Tek seviye mikrodiskektomide 100-250 mL; çok seviyeli dekompresyon, fasetektomi, TLIF ve pedikül enstrümantasyonunda 600-1500 mL; revizyon ve osteotomili vakalarda 1800-2500 mL)',
    riskLevel: 'high',
    riskLevelLabel: 'Yüksek Risk / Potansiyel Masif Kanama (Epidural Batson Pleksusu ve Geniş Kansellöz Pedikül Yatağı)',
    crossMatchRequirement: 'En az 2-4 Ünite Eritrosit Süspansiyonu (ES) ve 2 Ünite Taze Donmuş Plazma (TDP) hazır bulundurulmalıdır; Traneksamik Asit (TXA) infüzyonu ve Cell Saver cihazı ameliyathanede hazır olmalıdır',
    transfusionProbability: '%30 - %55 (Çok seviyeli füzyonlarda ve revizyon vakalarında %65-75)',
    criticalBleedingSources: [
      'Epidural Venöz Pleksus (Batson pleksusu — laminektomi ve foraminotomide dural kese çevresinde; batın serbest bırakılmazsa debisi masif boyuta ulaşır)',
      'Pedikül Girişleri ve Fasetektomi Kemik Yatakları (Geniş spongiyöz kemik kanamaları)',
      'Geniş Paraspinal Kas Yatağı (Multifidus ve erektör spina kaslarının subperiosteal sıyrılma yüzeyleri)',
      'Segmental Lomber Arter ve Ven Dalları (Foraminal diseksiyonda kök komşuluğu)',
      'Nadir Ancak Katastrofik Cerrahi Komplikasyon: Disk küreti veya kerrisonun anterior anulusu delmesi sonucu Aort, Vena Cava Inferior veya Ana İliak Damarların yırtılması (saniyeler içinde kardiyovasküler kollaps!)'
    ],
    hemostasisStrategies: [
      'Prone pozisyonda batın boşluğunun tamamen serbest bırakılması (Vena Cava Inferior kompresyonu ve Batson venöz göllenmesinin önlenmesi)',
      'İntraoperatif Traneksamik Asit (TXA) Protokolü: İndüksiyonda 10-20 mg/kg İV bolus, operasyon boyunca 1-2 mg/kg/saat sürekli infüzyon (kan kaybını %35-45 azaltır)',
      'Pedikül girişlerinde ve laminotomi kenarlarında bol steril kemik mumu uygulaması',
      'Epidural venöz kanamalarda jelatin sünger (Gelfoam), hemostatik matriks (FloSeal / Surgicel) ve bipolar mikrokoterizasyon',
      'Cell Saver (Kan Kurtarma Cihazı) ile yıkanmış eritrosit ototransfüzyonu',
      'Derin subfasial kapalı negatif basınçlı dren yerleştirilmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (TIVA: Propofol + Remifentanil) — İntraoperatif Nöromonitörizasyon (MEP/SSEP) ve Pedikül Vida Tetiklenmiş EMG (Triggered EMG) takibi için MUTLAK ALTIN STANDARTTIR'
    ],
    alternative: [
      'Dengeli Genel Anestezi (Düşük Doz Sevofluran < 0.5 MAC + Remifentanil İV): İONM sinyal kalitesi uygun olan seçilmiş vakalarda',
      'Spinal / Rejyonel Anestezi (İleri Derecede Seçilmiş Olgularda): Yalnızca tek seviye, kısa süreli açık mikrodiskektomilerde tecrübeli merkezlerde; prone havayolu riski ve uzun cerrahiler nedeniyle kompleks füzyonlarda tercih edilmez'
    ],
    clinicalRationale: 'Pedikül vida tetiklenmiş EMG (Triggered EMG) ve MEP/SSEP monitörizasyonunda yanlış negatifliği önlemek için entübasyon sonrası kas gevşetici kullanılmadan Propofol + Remifentanil TIVA altın standarttır. Prone pozisyonda başın sabitlenmesi sırasında tüp katlanmasını ve dişle ısırmayı önlemek için su geçirmez flasterli spiral telli ETT ile ısırma bloğu seçilir.',
    notes: 'POSTERİOR LOMBER CERRAHİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) PRONE POZİSYONDA KARIN BOŞLUĞU VE BATSON EPİDURAL VENÖZ PLEKSUSU DEKOMPRESYONU — Hasta prone (yüzüstü) pozisyona (Jackson omurga masası veya Wilson frame) alınırken karın hiçbir yere temas etmemeli, tamamen boşlukta sarkmalıdır! Karına binen en ufak bası Vena Cava Inferior\'u sıkıştırır; venöz kan Batson epidural pleksusuna şant olarak cerrahi sahada durdurulamaz bir venöz kan gölüne yol açar, cerrahın dural keseyi ve kökleri görmesini engelleyerek iatrojenik felç riskini katlar. (2) PEDİKÜL VİDALARINDA TETİKLENMİŞ EMG (TRIGGERED EMG) VE KÜRARSIZ TIVA — Lomber pedikül vidaları yerleştirilirken vidanın medial korteksi delmesi (pedicle breach) durumunda vida L1-S1 sinir köklerine veya kauda ekuinaya doğrudan temas eder. Vida başına monopolar cerrahi prob dokundurulup akım verildiğinde eğer eşik değer < 6-8 mA ise vida omurilik/kök kanalına taşmıştır ve derhal düzeltilmelidir! Bu uyarılmış EMG yanıtını alabilmek için entübasyon sonrasında KESİNLİKLE KAS GEVŞETİCİ VERİLMEMELİ (TOF 4/4) ve anestezi TIVA ile sürdürülmelidir. (3) SIFIR OKÜLER BASI VE POSTOPERATİF GÖRME KAYBI (POVL) KORUMASI — Prone pozisyonda saatler süren cerrahide göz küresine binen dış orbital bası Santral Retinal Arter Oklüzyonuna (CRAO), intraoperatif kanama ve derin hipotansiyon ise İskemik Optik Nöropatiye (ION) yol açarak KALICI KÖRLÜK yaratır! Baş ProneView aynalı kaskına veya köpük yastığa alınır, her 15-30 dakikada bir gözlerin bası altında olmadığı aynadan teyit edilir, MAP > 75-80 mmHg tutulur ve hematokrit > %25-28 korunur. (4) DURAL YIRTIK (İNSİDENTAL DUROTOMİ), BOS KAÇAĞI VE PÜRÜZSÜZ UYANMA — Özellikle ileri yaş kalsifiye stenoz ve revizyon olgularında dura mater incelmiştir ve %8-15 oranında dural yırtık (BOS kaçağı) gelişir. Primer dural dikiş ve fibrin yapıştırıcı tamirinden sonra uyanma evresinde hastanın öksürmesi, ıkınması ve hipertansiyon geliştirmesi intratekal basıncı fırlatarak tamir hattını patlatır; BOS fistülü ve psödomeningosel oluşturur. Ekstübasyonda IV Lidokain (1.5 mg/kg) ile öksürük tamamen engellenmeli ve hasta normotansif, sakin uyandırılmalıdır. (5) EPİDURAL HEMATOM, KAUDA EKUİNA SENDROMU VE MULTİMODAL ANALJEZİ (TLIP / LOMBER ESP BLOĞU) — Kapanışta ve postoperatif erken dönemde cerrahi lojda toplanan hematom dural keseyi sıkıştırarak hızla akut Kauda Ekuina Sendromuna (parapleji, idrar inkontinansı) yol açabilir; cerrahi kapanış öncesi tansiyon normotansif seviyeye çekilerek titiz hemostaz kontrol edilmelidir. Postoperatif analjezide opioid tüketimini azaltıp erken mobilizasyonu sağlamak için ultrason eşliğinde bilateral TLIP (Thoracolumbar Interfascial Plane) veya Lomber Erektör Spina Plan (ESP) bloğu uygulanmalıdır.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroloji / Nöroşirürji Konsültasyonu: L1-S1 miyotom ve dermatom haritasının çıkarılması; kuadriseps (L3-L4), tibialis anterior (L4-L5), ekstansör hallusis longus (L5) ve gastroknemius (S1) kas gücü derecelendirmesi; derin tendon refleksleri (patella, aşil) ve anal sfinkter tonusu değerlendirmesi.',
      'Kardiyoloji Konsültasyonu: Yaşlı popülasyonda koroner arter hastalığı, hipertansiyon ve ejeksiyon fraksiyonu değerlendirmesi; prone pozisyonda venöz dönüş azalmasına hemodinamik tolerans.',
      'Göğüs Hastalıkları Konsültasyonu: Prone pozisyon restriktif akciğer paternine yol açtığından bazal solunum fonksiyon testi ve KOAH optimizasyonu.',
      'Anestezi Polikliniği: Prone pozisyon riski taşıyan morbid obezite (BMI > 35 kg/m²), boyun hareket kısıtlılığı ve zor entübasyon öngörüsü değerlendirmesi.'
    ],
    historyAndPhysical: [
      'Nörolojik Taban Muayenesi: Ayak bileği ve başparmak dorsifleksiyon kuvveti (düşük ayak varlığı cerrahi öncesi mutlaka belgelenmelidir).',
      'Sfinkter Fonksiyonları: İdrar veya gaita inkontinansı, retansiyon ve eyer tarzı duyu kaybı (Kauda Ekuina Sendromu acil ameliyat kriteridir).',
      'Antikoagülan / Antiagregan Öyküsü: Klopidogrel (5-7 gün), ASA (cerrah tercihine göre 3-7 gün), DOAK/Rivaroksaban/Apiksaban (48 saat) ve LMWH kesilme zamanları.',
      'Önceki Lomber Cerrahi Öyküsü: Revizyon cerrahilerinde epidural skar dokusu dural yırtık riskini belirgin artırır.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit sayısı ≥ 100.000/mm³).',
      'Koagülasyon Paneli: PT, aPTT, INR, Fibrinojen düzeyi.',
      'Kan Grubu ve En az 2-4 Ünite Eritrosit Süspansiyonu Cross-Match hazırlığı.',
      'Biyokimya: Serum elektrolitleri (sodyum, potasyum), üre, kreatinin ve glukoz.',
      'Lomber MRG ve Dinamik Fleksiyon/Ekstansiyon Grafileri: Kanal darlığı derecesi, foramen basısı, spondilolistezis instabilite açısı.',
      'Lomber Kemik BT: Pedikül çapları, vida trajesi anatomisi ve faset hipertrofisi değerlendirmesi.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (iskemi analizi), SpO2, EtCO2 ve Sıcaklık.',
      'İnvaziv Radyal Arter Basıncı İzlemi (A-Line): Pozisyonel hipotansiyonu engellemek, MAP > 75-80 mmHg korumak, anlık kan gazı, Hb/Hct, laktat ve koagülasyon takibi için (özellikle çok seviyeli füzyonlarda ZORUNLU).',
      'Santral Venöz Kateter (CVC): Çok seviyeli füzyonlarda veya kardiyak komorbiditesi olan hastalarda vazopressör infüzyonu ve santral venöz erişim.',
      'İntraoperatif Nöromonitörizasyon (İONM):',
      '  - Bilateral Transkraniyal Motor Uyarılmış Potansiyeller (tcMEP): L2-S1 miyotomlarından (kuadriseps, tibialis anterior, EHL, gastroknemius) devamlı kayıt.',
      '  - Somatosensoriyel Uyarılmış Potansiyeller (SSEP): Posterior tibial sinir uyarımı ile arka kord fonksiyonu izlemi.',
      '  - Serbest Çalışan (Free-run) EMG: Kök traksiyonu ve cerrahi manipülasyonda sinir kökü ateşlemesinin (spontaneous spike/burst) tespiti.',
      '  - Tetiklenmiş EMG (Triggered EMG): Pedikül vidalarının korteksi delip delmediğini teyit etmek için vida başına elektriksel akım verilerek eşik değer tayini.',
      'Nöromusküler İleti İzlemi (TOF): Entübasyon sonrası kas gevşetici verilmez; TOF 4/4 (%100) korunur.',
      'Sıcaklık Sensörlü Mesane Sondası (İdrar debisi > 0.5-1.0 mL/kg/saat).'
    ],
    vascularAccess: [
      'En az 2 adet geniş lümenli (14-16G) periferik intravenöz damar yolu',
      'Hızlı Kan İnfüzyon Cihazı (Belmont / Ranger) ve Isıtıcılı Sıvı Hatları',
      'Cell Saver (Kan Kurtarma Cihazı) steril sahada aspire hatta bağlı ve çalışır durumda'
    ],
    patientPosition: 'Prone (Yüzüstü) Pozisyon — Jackson Omurga Masası veya Wilson Çerçevesi',
    patientPositionDetails: [
      'BATININ TAMAMEN BOŞLUKTA SARKITILMASI: İntraabdominal basınç artışı VCI basısına ve Batson epidural venöz pleksusundan durdurulamaz kanamaya yol açar.',
      'SIFIR ORBİTAL BASI (GÖZ KORUMASI): Baş ProneView aynalı kaskına veya nöral yüz yastığına yerleştirilir; göz küreleri her 15-30 dakikada bir kontrol edilir.',
      'Boyun ve servikal omurga nötral pozisyonda; aşırı hiperekstansiyon veya torsiyon engellenir.',
      'Kollar omuz seviyesinde hafif fleksiyonda ve abdüksiyonda (< 90°); dirsekler ve ulnar oluklar jel pedlerle korunur.',
      'Göğüs ve krista iliaka destekleri kemik çıkıntılara denk getirilir; meme dokusu ve genital organlar (özellikle testisler) basıdan korunur.',
      'Dizler hafif fleksiyonda tutulur, peroneal sinir fibula başı hizasında jel pedlerle desteklenir; ayak parmaklarının masaya basması önlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - İV Propofol (2-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + kısa etkili nöromusküler bloker (Rokuronyum 0.6 mg/kg).',
      '  - Videolaringoskop ile atravmatik entübasyon; spiral (zırhlı) endotrakeal tüp tercih edilir.',
      '  - Entübasyondan sonra KESİNLİKLE nöromusküler bloker tekrarlanmaz (kürarsız idame).',
      'İdame: TIVA Protokolü (Total İntravenöz Anestezi):',
      '  - Propofol infüzyonu (80-140 mcg/kg/dk) + Remifentanil infüzyonu (0.08-0.25 mcg/kg/dk).',
      '  - İnhalasyon gazları (< 0.3 MAC) tercih edilmez; İONM ve triggered EMG kalitesini bozabilir.',
      'Kan Koruma ve TXA Protokolü:',
      '  - İndüksiyonda Traneksamik Asit (10-20 mg/kg İV bolus), ardından 1-2 mg/kg/saat sürekli infüzyon.',
      '  - Cell Saver ile toplanan kanın yıkanarak ototransfüzyonu.',
      'Pedikül Vidası Tetiklenmiş EMG (Triggered EMG) Testi Protokolü:',
      '  - Cerrah vidayı yerleştirdikten sonra probu vidaya dokundurur ve akım verir:',
      '    * Eşik > 10-12 mA: Normal pedikül kemik bütünlüğü (güvenli vida).',
      '    * Eşik 6-10 mA: Şüpheli medial korteks incelmesi / çatlağı.',
      '    * Eşik < 6 mA: Medial korteks delinmiş (pedicle breach), vida köke/kaudaya basmaktadır; vida derhal çıkarılıp yeniden yönlendirilmelidir!',
      'Perfüzyon Basıncı:',
      '  - Kök iskemisi ve spinal kord perfüzyonunu korumak için MAP > 75-80 mmHg tutulur.',
      'Anterior Anulus Perforasyonu Alarmı:',
      '  - Diskektomi esnasında aletin anterior anulusu delip retroperitona geçmesi ve aort/iliak ven yırtması nadir de olsa cerrahın "boşluğa düştüm" hissi ve anestezi monitöründe ANİ AÇIKLANAMAYAN HİPOTANSİYON ve TAŞİKARDİ ile kendini gösterir.',
      '  - Bu durumda derhal masif kanama protokolü aktive edilir, Belmont açılır ve acil laparotomi için damar cerrahisi çağrılır.'
    ],
    airwayManagement: [
      'Spiral (Zırhlı / Wire-reinforced) endotrakeal tüp; prone pozisyonda fleksiyon sırasında tüpün bükülmesini (kinking) ve ısırmasını engellemek için ısırma bloğu yerleştirilir.',
      'Tüpün yüze tespiti terlemeye ve dezenfektana dayanıklı su geçirmez bantlarla iki taraflı kilitlenir.',
      'Kaf basıncı sürekli manometre ile 20-25 cmH2O seviyesinde sabit tutulur.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlama ve Floroskopi Altında Doğru Lomber Seviyenin (L1-S1) İşaretlenmesi.',
      '2. Posterior Orta Hat İnsizyonu ve Subperiosteal Paraspinal Kas Diseksiyonu.',
      '3. Dekompresyon Fazı: Laminektomi, flavektomi, foraminotomi ve dural kesenin serbestleştirilmesi.',
      '4. Sinir Kökünün Korunması ve Diskektomi (Anterior anulus yırtığı ve retroperitoneal damar komşuluğuna dikkat!).',
      '5. TLIF / PLIF Kafes Yerleşimi ve Otolog/Allogreft Kemik Greftlemesi.',
      '6. Lomber Pedikül Vidalarının Gönderilmesi ve Tetiklenmiş EMG (Triggered EMG) ile Medial Duvar Testi.',
      '7. Rod Montajı, Kompresyon / Distraksiyon ve Biyomekanik Lordozun Kilitlenmesi.',
      '8. Hemostaz Kontrolü, Valsalva Manevrası (Dural yırtık ve BOS sızıntısı testi).',
      '9. Derin Subfasial Kapalı Negatif Basınçlı Drenaj ve Anatomik Katmanlı Kapanış.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ ÖKSÜRMESİZ UYANMA KURALI: Dural yırtık tamiri yapılmış veya geniş epidural venöz koterizasyon uygulanmış vakalarda uyanmada ıkınma, öksürük ve hipertansiyon dural yamayı patlatır veya epidural hematom kanamasını başlatır.',
      'Ekstübasyondan 5-10 dakika önce IV Lidokain (1.5 mg/kg) uygulanır veya Remifentanil düşük doz infüzyonla sürdürülerek hasta sakin, öksürmeden ekstübe edilir.',
      'Kaf Kaçak Testi: Prone pozisyon sonrası larinks ödemi şüphesinde tüp kafı indirilerek pozitif hava kaçağı dinlenir.',
      'AMELİYATHANEDE ANINDA NÖROLOJİK MUAYENE: Hasta extübe edilir edilmez bilinci açıldığında:',
      '  - L4: Ayak bileği dorsifleksiyonu (tibialis anterior).',
      '  - L5: Ayak başparmağı dorsifleksiyonu (ekstansör hallusis longus).',
      '  - S1: Ayak bileği plantar fleksiyonu (gastroknemius).',
      '  - Düşük ayak veya yeni motor defisit görülürse cerraha derhal haber verilerek vida pozisyonu ve epidural hematom değerlendirilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal Opioid Koruyucu Ağrı Protokolü:',
      '  - Paraspinal kas spazmları ve kemik enstrümantasyonu nedeniyle şiddetli postoperatif ağrı beklenir.',
      '  - Ultrason Eşliğinde İki Taraflı TLIP Bloğu (Thoracolumbar Interfascial Plane) veya Lomber Erektör Spina Plan (ESP) Bloğu (Bupivakain %0.25).',
      '  - Cerrahi Sahaya Lokal Anestezik İnfiltrasyonu (Kapanış öncesi paraspinal kaslara Bupivakain + Epinefrin).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir infüzyon).',
      '  - IV Deksketoprofen / İbuprofen (Kontrendikasyon yoksa ve cerrah kemik kaynaması açısından onay veriyorsa).',
      '  - İV Hasta Kontrollü Analjezi (IV PCA): Morfin veya Fentanil ile bazalsız yalnızca bolus protokolü.',
      '  - Kas Spazmları İçin: Tizanidin veya Baklofen.'
    ],
    prospectRecommendations: [
      'PROSPECT Lomber Füzyon Kılavuzları: Cerrahi yara infiltrasyonu, fasyal plan blokları (TLIP/ESP), sistemik parasetamol ve non-opioid analjeziklerin kombine kullanımı ameliyat sonrası opioid gereksinimini %40-50 azaltır; postoperatif bulantı-kusmayı (PONV), sedasyonu, üriner retansiyonu ve paralitik ileusu belirgin engeller.'
    ],
    erasRecommendations: [
      'ERAS Lomber Omurga Cerrahisi Kılavuzları:',
      '  - İlk 24 Saatlik Nörolojik İzlem: Saatlik alt ekstremite motor muayenesi (L4, L5, S1) ve mesane sondası takibi (Akut Epidural Hematom ve Kauda Ekuina basısını erken yakalamak için).',
      '  - Dren Yönetimi: Subfasial dren saatlik debisi izlenir; berrak/pembe BOS kaçağı gelip gelmediği kontrol edilir; 24 saatlik drenaj < 50-70 mL olduğunda (genellikle 24-48. saatte) sonlandırılır.',
      '  - Erken Mobilizasyon: Rijit enstrümantasyon uygulanan hastalar ameliyat sonrası 1. günde lomber korse (lumbosakral korse / TLSO) eşliğinde fizyoterapistle ayağa kaldırılır.',
      '  - Derin Ven Trombozu (DVT) Profilaksisi: Aralıklı Pnömotik Kompresyon (IPC) çorapları aralıksız sürdürülür; hemostaz güvencesiyle postop 12-24. saatte profilaktik LMWH başlanır.',
      '  - Erken Oral Beslenme: Postoperatif 2-4. saatte berrak sıvılarla başlayıp tolere edildikçe normal diyete geçiş.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Spine Surgery: Posterior Lumbar Spine Surgery, pp. 542-548. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Debono, B., et al. (2021). Consensus statement for perioperative care in lumbar and cervical spine surgery: Enhanced Recovery After Surgery (ERAS®) Society recommendations. Spine, 46(11), 740-754.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Lumbar Spine Fusion Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'North American Spine Society (NASS). (2020). Evidence-Based Clinical Guidelines for Multidisciplinary Spine Care: Diagnosis and Treatment of Degenerative Lumbar Spinal Stenosis and Lumbar Spondylolisthesis.',
      'International Society for the Advancement of Spine Surgery (ISASS). Policy Statement: Transforaminal Lumbar Interbody Fusion (TLIF) and Posterior Lumbar Interbody Fusion (PLIF).',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement on Neuromonitoring and Neuromuscular Blockade Management in Pedicle Screw Placement.',
      'American Society of Anesthesiologists (ASA) Task Force on Perioperative Visual Loss. Practice advisory for perioperative visual loss associated with spine surgery. Anesthesiology, 130(1), 12-30.',
      'Ghiselli, G., et al. (2004). L5-S1 disc discectomy and vascular injury to anterior great vessels: Incidence, presentation, and management. Journal of Bone and Joint Surgery.'
    ]
  }
};
