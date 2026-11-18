import { ProcedureDefinition } from '../../types/procedures';

/**
 * Cerrahi Hemoroidektomi (Surgical Hemorrhoidectomy)
 * (Milligan–Morgan, Ferguson, Stapled Hemorrhoidopexy / Longo, THD/HAL)
 *
 * Jaffe (5th ed.), PROSPECT Hemorrhoid Surgery Guidelines,
 * Miller's Anesthesia ve ERAS / SAMBA Ambulatuvar Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const surgicalHemorrhoidectomy: ProcedureDefinition = {
  id: 'surgical-hemorrhoidectomy',
  name: 'Cerrahi Hemoroidektomi (Surgical Hemorrhoidectomy)',
  shortCode: 'HEMOROİD',
  specialty: 'genel_cerrahi',
  specialtyName: 'Genel Cerrahi',
  categoryTag: 'Kolorektal & Anorektal Cerrahi',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description:
    'Medikal tedaviye ve ofis girişimlerine (lastik bant ligasyonu, skleroterapi, kızılötesi koagülasyon) yanıtsız, ileri evre (Evre III–IV) semptomatik internal, eksternal veya mikst hemoroidal hastalığın cerrahi tedavisidir. Açık eksizyon (Milligan–Morgan), kapalı eksizyon (Ferguson), enerji cihazlı (LigaSure/Harmonik) eksizyon, sirküler stapler hemoroidopeksi (Longo) veya Doppler kılavuzlu hemoroidal arter ligasyonu (HAL/THD) yöntemleriyle uygulanır.',
  indications: [
    'Evre III (elle redükte edilebilen) ve Evre IV (redükte edilemeyen, prolabe) semptomatik internal hemoroidler',
    'Medikal tedaviye dirençli, kronik anemiye yol açan tekrarlayan parlak kırmızı rektal kanama (hematokezya)',
    'Akut strangüle, ülsere, nekrotik veya şiddetli ağrılı tromboze mikst/eksternal hemoroidler',
    'Bant ligasyonu veya skleroterapi gibi minimal invaziv yöntemler sonrası nüks eden ileri mikst hemoroid hastalığı',
    'Büyük eksternal deri katlantıları (skin tags), kronik anal fissür veya fistül ile birliktelik gösteren kombine anorektal patolojiler'
  ],
  averageDuration:
    '20 - 45 dakika (Tek/çift kadran eksizyon veya HAL/THD: 20-30 dk; Üç kadran Milligan–Morgan/Ferguson veya stapler hemoroidopeksi: 35-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss:
      '10 - 50 mL (Düşük; antikoagülan kullanımı, portal hipertansiyon veya hipertansif pikte 100 mL üzerine çıkabilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Risk (< 100 mL)',
    crossMatchRequirement:
      'Rutin vakalarda kan hazırlığı ve Cross-Match gerekmez. Ancak kronik hemoroidal kanamaya bağlı belirgin anemisi (Hb < 8–9 g/dL) veya koagülopatisi olan hastalarda Tip & Screen (T&S) değerlendirilmelidir',
    transfusionProbability:
      '< %1 (İhmal edilmiş kronik masif kanamaya ikincil ciddi anemi veya postoperatif sekonder hemoraji haricinde transfüzyon gerekmez)',
    criticalBleedingSources: [
      'Superior, orta ve inferior rektal (hemoroidal) arter dalları ve zengin submukozal hemoroidal venöz pleksuslar',
      'Anal retraktör yerleştirilmesi veya derin mukozal diseksiyon sırasında oluşan arteriyoler kanamalar',
      'Stapler hemoroidopekside (Longo) sirküler zımba hattı boyunca gelişebilen arteriyel sızıntılar',
      'Postoperatif erken/geç sekonder kanama (özellikle kapalı Ferguson tekniğinde rektal lümene gizlenen hematom/kanama veya ıkınma/hipertansif pik sonrası pedikül ligatürünün açılması)',
      'Altta yatan siroz/portal hipertansiyon varlığında hemoroid sanılan anorektal varislerin kesilmesi (masif venöz kanama riski!)'
    ],
    hemostasisStrategies: [
      'Epinefrinli lokal anestezik (1:200.000 Adrenalin + Lidokain/Bupivakain) submukozal ve perianal infiltrasyonu ile cerrahi alanda vazokonstrüksiyon',
      'Bipolar/monopolar koter, LigaSure veya ultrasonik makas (Harmonik) ile pedikül mühürleme ve titiz hemostaz',
      'Vasküler pediküllerin emilebilir sütürlerle (transfiksyon ligasyonu) bağlanması ve stapler hattına gerekirse hemostatik destek dikişi',
      'Cerrahi sonunda aktif sızıntı yoksa hafif anal tampon (emilebilir jelatin sünger / vazelinli gaz) yerleştirilmesi ve postop hipertansif piklerin önlenmesi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Saddle (Eyer) Spinal Blok / Düşük Doz Hiperbarik Spinal Anestezi (Hiperbarik Bupivakain %0.5 4–7.5 mg [0.8–1.5 mL] veya Hiperbarik Prilokain %2 20–30 mg; enjeksiyon sonrası hasta 5–10 dk tam oturur pozisyonda bekletilerek yalnız sakral S2–S5 blokajı sağlanır)',
      'Genel Anestezi (Prone Jackknife pozisyonunda güvenli hava yolu için Endotrakeal Tüp [ETT]; Litotomi pozisyonunda ise 2. nesil Laringeal Maske [LMA] veya ETT + Cerrah tarafından perianal/pudendal lokal blok)'
    ],
    alternative: [
      'Monitörize Anestezi Bakımı (MAC / Propofol–Fentanil veya Remifentanil sedoanaljezisi) + Cerrah tarafından Perianal Alan Bloğu / Bilateral Pudendal Sinir Bloğu (Özellikle litotomi pozisyonunda kooperatif, non-obez hastalarda hızlı günübirlik derlenme sağlar)',
      'Kaudal Epidural Blok (Özellikle ek perineal prosedür veya uzamış analjezi hedeflenen seçilmiş olgularda)'
    ],
    clinicalRationale:
      'Anorektal cerrahi kısa sürmesine karşın insan vücudundaki en yoğun somatik (dentat çizgi altı) ve visseral/parasempatik ağrı uyaranlarından birini oluşturur. Saddle spinal blok hem mükemmel anal sfinkter gevşemesi ve derin sakral anestezi sağlar hem de alt ekstremite motor bloğunu minimalde tutarak hastanın Prone Jackknife pozisyonuna güvenli alınmasına ve erken taburculuğuna olanak tanır. Genel anestezi seçildiğinde ise anal dilatasyonun tetikleyebileceği laringospazmı ve vagal bradikardiyi önlemek için yeterli anestezi derinliği + lokal blok kombinasyonu esastır.',
    notes:
      'Prone Jackknife pozisyonunda hasta derin sedasyondayken hava yoluna doğrudan müdahale zordur; bu nedenle genel anestezi uygulanacaksa pozisyon öncesi ETT ile güvenceye alınması altın standarttır. Postoperatif Üriner Retansiyon (POUR) hemoroidektomi sonrası en sık görülen komplikasyondur (%15–30+); intraoperatif aşırı IV sıvı yüklemesinden ve intratekal morfinden kesinlikle kaçınılmalıdır.',
    rulesTitle: 'HEMOROİDEKTOMİDE VAZGEÇİLMEZ ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'ANAL SFİNKTER DİLATASYONUNDA LARİNGOSPAZM VE BREWER–LUCKHARDT REFLEKSİ',
        content:
          'Anal kanalın gerilmesi ve spekulum/retraktör ile dilatasyonu şiddetli nosiseptif ve vagal parasempatik uyarı oluşturur. Yetersiz anestezi derinliği veya yüzeyel MAC altında yapılan anal dilatasyon ani ve dirençli LARİNGOSPAZM, stridor, bronkospazm veya derin VAGAL BRADİKARDİ / ASİSTOL tetikleyebilir. Dilatasyon öncesi mutlaka yeterli anestezi derinliği (veya oturmuş saddle/pudendal blok) doğrulanmalı ve IV Atropin hazır tutulmalıdır.'
      },
      {
        number: 2,
        title: 'SADDLE BLOKTA FİKSASYON SÜRESİ VE YÜKSEK SPİNAL RİSKİ',
        content:
          'Hiperbarik spinal ajan enjekte edildikten sonra hasta 5–10 dakika dik oturur pozisyonda tutulmadan doğrudan Prone Jackknife (başaşağı) pozisyona çevrilirse ilaç sefale doğru kayarak yüksek torasik/servikal spinal bloğa, derin hipotansiyona ve solunum yetmezliğine yol açabilir. Ayrıca oturma süresi kadar vital bulgu ve seviye kontrolü de zorunludur.'
      },
      {
        number: 3,
        title: 'PRONE JACKKNİFE GÜVENLİĞİ VE POSTOPERATİF ÜRİNER RETANSİYON (POUR) ÖNLEMİ',
        content:
          'Prone Jackknife pozisyonunda pelvis/göğüs destekleriyle abdomen serbest bırakılmalı, göz/burun/genital/brakial pleksus basısı engellenmelidir. Postoperatif idrar retansiyonunu önlemek için intraoperatif IV kristaloid ≤ 500–750 mL ile kısıtlı tutulmalı, intratekal uzun etkili opioidden kaçınılmalı ve postop şiddetli anal sfinkter spazmı multimodal olarak kontrol edilmelidir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Hematoloji / Kardiyoloji Konsültasyonu: Antitrombotik/antikoagülan (Varfarin, DOAK, Klopidogrel, Tikagrelor) kullanan hastalarda ASRA / ESAIC kılavuzlarına göre ilaç kesilme süreleri belirlenmelidir. Özellikle Saddle/Spinal veya Kaudal blok planlanıyorsa nöroaksiyel güvenlik pencereleri eksiksiz doğrulanmalıdır.',
      'Gastroenteroloji / Hepatoloji Değerlendirmesi: Siroz veya portal hipertansiyon öyküsü olan hastalarda lezyonun gerçek hemoroid değil yaşamı tehdit edebilecek anorektal varis olabileceği akılda tutulmalı; koagülopati ve trombositopeni açısından değerlendirilmelidir. İnflamatuar barsak hastalığı (Crohn/ÜK) öyküsü sorgulanmalıdır.'
    ],
    historyAndPhysical: [
      'Kronik Rektal Kanama ve Anemi Taraması: Aylardır süren kanamalı hemoroidlerde hastalar Hb 6–7 g/dL düzeyine adapte olmuş halde başvurabilir; efor dispnesi, ortostaz, taşikardi ve konjonktival solukluk mutlaka muayene edilmelidir.',
      'Hava Yolu ve Prone Pozisyon Uygunluğu: Obezite (VKİ), Obstrüktif Uyku Apnesi (OUA), boyun hareket kısıtlılığı ve ağır gastroözofageal reflü (GÖR) sorgulanmalıdır (Prone pozisyonda MAC veya LMA yerine ETT endikasyonunu belirler).',
      'Nöroaksiyel Blok Uygunluğu: Lomber omurga cerrahisi/deformitesi, sakral/perianal enfeksiyon (pilonidal sinüs veya perianal apse yayılımı açısından ponksiyon sahası temizliği!), nörolojik defisit ve kanama diyatezi öyküsü kontrol edilmelidir.',
      'Barsak Hazırlığı (Lavman) ve Açlık Durumu: Preoperatif uygulanan Fleet/lavman sonrası özellikle yaşlı ve düşkün hastalarda hafif intravasküler volüm açığı veya vazo-vagal senkop gelişip gelişmediği kontrol edilmelidir (ancak POUR riski nedeniyle aşırı sıvı yüklenmemelidir).'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hemogram): Kronik kanamaya bağlı anemiyi yakalamak ve nöroaksiyel blok öncesi trombosit sayısını (> 75.000–100.000/mm³) doğrulamak için temel testtir.',
      'Koagülasyon Paneli (PT, INR, aPTT): Antikoagülan kullanan, karaciğer hastalığı şüphesi olan veya nöroaksiyel anestezi planlanan hastalarda mutlaka görülmelidir.',
      'Biyokimya (Kreatinin, Elektrolitler — K⁺, Na⁺): Kronik laksatif/lavman kullanımı veya ek komorbiditesi bulunan ileri yaş hastalarda değerlendirilir.',
      'EKG: ASA ≥ 2, kardiyak risk faktörü olan veya > 50 yaş hastalarda bazal ritim ve iskemi taraması.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: Sürekli 5-derivasyonlu EKG (anal dilatasyon sırasında vagal bradikardi / nodal ritim takibi için sesli kalp hızı tonu açık tutulmalıdır), SpO₂, Non-invaziv Kan Basıncı (NIBP — 3–5 dk aralıklarla), Sıcaklık (Vücut Isısı).',
      'Sürekli Kapnografi (EtCO₂): Genel anestezide zorunludur; Saddle blok + sedasyon veya MAC uygulanan Prone Jackknife hastalarda da nazal örneklemeli mikroakım EtCO₂ hattı ile solunum depresyonu ve obstrüktif apne anlık izlenmelidir.',
      'Nöromusküler Monitörizasyon (TOF): Genel anestezide kas gevşetici kullanıldıysa ekstübasyon öncesi kantitatif TOF ≥ 0.90 doğrulanmalıdır.'
    ],
    vascularAccess: [
      '1 Adet 18G veya 20G Periferik Venöz Kateter (El sırtı veya ön kol; Prone pozisyonda kolların yerleşimine göre akışın bükülmediği/kıvrılmadığı doğrulanmalıdır).',
      'İntraoperatif Sıvı Politikası: Postoperatif idrar retansiyonunu (POUR) önlemek amacıyla agresif sıvı yüklemesinden kaçınılır; günübirlik/kısa vakalarda genellikle 250–500 mL dengeli kristaloid yeterlidir.'
    ],
    patientPosition:
      'Prone Jackknife (Çakı / Kraske) Pozisyonu (En Sık) veya Litotomi Pozisyonu (Cerrah Tercihine Göre).',
    patientPositionDetails: [
      'Prone Jackknife Pozisyonu: Hastanın kalça/pelvis bölgesi ameliyat masasının bükülme (fleksiyon) noktasına denk getirilir; masa kalçadan 20–30° aşağı kırılarak başaşağı (Trendelenburg/Jackknife) açı verilir ve perine yukarı yükselir.',
      'Abdominal Dekompresyon: Göğüs kafesi üst kısmı ve iliak krestler altına jel/silikon rulolar yerleştirilerek karın duvarının serbestçe sarkması sağlanır (IVC basısı, hipotansiyon ve venöz konjesyona bağlı hemoroidal kanama artışı önlenir).',
      'Göz, Yüz ve Ekstremite Koruması: Baş nötral köpük/jel başlığa veya hafif yan pozisyona konur; göz kürelerine, buruna, kulak kepçelerine ve erkek hastalarda genital bölgeye bası olmadığı ellerle kontrol edilir. Kollar baş hizasına doğru < 90° abdüksiyon/fleksiyonda yumuşak pedler üzerine alınır; ulnar oluk basısı engellenir.',
      'Kalça Çekme Flasterleri: Cerrah görüşü artırmak için gluteal yanakları masaya flasterle ayırır; cilt hassasiyeti/yaşlılıkta flaster çıkarılırken cilt laserasyonu olmamasına özen gösterilir.',
      'Litotomi Pozisyonu (Alternatif): Her iki bacak eşzamanlı ve simetrik kaldırılıp indirilir; fibula başı (peroneal sinir basısı) ve ekstremite gerginliği kontrol edilir; el parmaklarının masa eklem yerlerinden uzak olduğu teyit edilir.'
    ],
    anesthesiaManagement: [
      'Saddle (Eyer) Spinal Blok Tekniği: Steril şartlarda L3–L4 veya L4–L5 aralığından ince (25G–27G) pencil-point iğne ile Hiperbarik Bupivakain %0.5 (4–7.5 mg ≈ 0.8–1.5 mL) veya Hiperbarik Prilokain %2 (20–30 mg) uygulanır. Hasta tam 5–10 dakika dik oturur pozisyonda bekletilir, sakral duyu kaybı (S2–S5) doğrulandıktan sonra yavaşça Prone Jackknife pozisyona alınır (alt ekstremite motor gücü korunduğundan hasta çevrilmeye yardım edebilir).',
      'Saddle Blokta Opioid Seçimi: İntratekal morfin (hatta yüksek doz fentanil) şiddetli kaşıntı ve özellikle %30–40’a varan postoperatif idrar retansiyonu (POUR) yaptığından günübirlik hemoroidektomide önerilmez; gerekirse sadece düşük doz lipofilik opioid (Fentanil 10–15 mcg) veya tek başına lokal anestezik tercih edilir.',
      'Genel Anestezi Yönetimi: Propofol (2–2.5 mg/kg) + Fentanil (1–2 mcg/kg) veya Remifentanil infüzyonu. Anal dilatasyondan hemen önce hemoroidal/anal refleksi (laringospazm & bradikardi) baskılamak için yeterli derinlik (MAC ≥ 1.2–1.3 veya Propofol + ek kısa etkili opioid) mutlaka sağlanmalıdır.',
      'MAC + Perianal/Pudendal Blok Yönetimi: Cerrah lokal anestezik (Lidokain %1–2 + Bupivakain %0.25–0.5 + 1:200.000 Epinefrin, toplam 20–30 mL) enjeksiyonunu yaparken kısa süreli derin analjezi/sedasyon (ör. 10–30 mg Propofol + düşük doz Remifentanil/Ketamin) verilir; lokal blok oturduktan sonra sedasyon hafifletilerek spontan solunum korunur. Maksimum güvenli lokal anestezik dozları (LAST) aşılmamalıdır.',
      'Vagal Bradikardi Hazırlığı: Anal spekulum/dilatasyon sırasında ani sinüs bradikardisi (< 45–50/dk) gelişirse cerrahtan uyaranı durdurması istenir, gerekirse Atropin 0.5 mg IV (veya Glikopirolat 0.2–0.4 mg IV) uygulanır.'
    ],
    airwayManagement: [
      'Prone Jackknife + Genel Anestezi: Kesin olarak **Endotrakeal Tüp (ETT)** önerilir; tüp flaster ve gerekirse bağ ile yüze sıkıca sabitlenmeli, baş pozisyonlandıktan sonra bilateral akciğer sesleri, tepe hava yolu basıncı (Ppeak) ve EtCO₂ dalgası yeniden doğrulanmalıdır.',
      'Litotomi + Genel Anestezi: 2. nesil LMA (ProSeal / i-gel / Supreme) kullanılabilir; ancak anal dilatasyonda laringospazmı önlemek için kas gevşetici veya derin anestezi + etkin perianal lokal blok sağlanmalıdır.',
      'Prone Jackknife + Saddle Blok / MAC: Hasta uyanık veya hafif sedatizedir; derin sedasyondan (RASS ≤ -3) kaçınılmalı, nazal kanül ile O₂ ve sürekli mikroakım kapnografi ile solunum paterni kesintisiz izlenmelidir.'
    ],
    criticalSurgicalStages: [
      '1. Prone Çevirme & Pozisyonlama: Saddle blok sonrası çevirmede üst torasik blok yükselmesi/hipotansiyon; ETT vakalarda tüp kayması veya Ppeak artışı kontrol edilir.',
      '2. Perianal Lokal Anestezik + Epinefrin İnfiltrasyonu: En keskin ağrı uyaranıdır; LAST belirtileri ve sistemik epinefrin emilimine bağlı taşikardi/hipertansiyon izlenir.',
      '3. Anal Spekulum / Retraktör ile Sfinkter Dilatasyonu: Laringospazm, bronkospazm ve Brewer–Luckhardt vagal refleksi (bradikardi/hipotansiyon) açısından en kritik aşamadır.',
      '4. Hemoroidal Pakelerin Eksizyonu, Pedikül Ligasyonu / Stapler Ateşlemesi: Dentat çizgi üstü/altı diseksiyonda visseral ağrı veya vagal yanıt ortaya çıkabilir; stapler ateşlemesi öncesi anestezi derinliği ve hareketsizlik korunur.',
      '5. Hemostaz, Anal Tampon & Supin Pozisyona Dönüş: Aktif kanama olmadığı doğrulanır; kalça flasterleri nazikçe sökülür ve hasta yavaşça supin pozisyona çevrilir (ortostatik düşüşe dikkat).'
    ],
    emergenceNotes: [
      'Prone pozisyondan supin pozisyona döndükten ve tüm monitörizasyon/hava yolu bağlantıları teyit edildikten sonra ekstübasyon uygulanır (asla prone iken plansız ekstübasyon yapılmaz).',
      'Anal bölge ameliyatları uyandırmada şiddetli ağrı, ıkınma ve hipertansif pik yapabilir; bu durum cerrahi sütür/pedikülden erken kanamaya yol açar. Uyanmadan önce perianal/pudendal lokal blok + IV Parasetamol + NSAİİ etkisinin tam oturduğundan emin olunmalıdır.',
      'PONV Profilaksisi: İndüksiyonda Deksametazon 4–8 mg IV (hem bulantı önleyici hem perianal ödem azaltıcı) ve çıkışta Ondansetron 4 mg IV uygulanmalıdır.',
      'Derlenme (PACU) transferi öncesi anal pansumanda aktif kanama veya erken hematom şişliği kontrol edilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Cerrahi hemoroidektomi, kısa süresine rağmen postoperatif dönemde özellikle ilk 3–5 gün ve ilk defekasyonda **şiddetli somatik + sfinkter spazmı ağrısı** oluşturabilen bir prosedürdür; güçlü bir multimodal rejim planlanmalıdır.',
      'Planlı Sistemik Non-Opioid Bazal Tedavi: Düzenli saatlik Parasetamol (1 g q6h IV/PO) + NSAİİ veya COX-2 İnhibitörü (İbuprofen 400–600 mg, Deksaketoprofen 25–50 mg veya Ketorolak — cerrahi hemostaz sağlandıktan sonra) başlanır.',
      'Rejyonel / Lokal Blok (En Etkili Opioid Koruyucu): Cerrah tarafından uygulanan Perianal Uzun Etkili Lokal Anestezik İnfiltrasyonu (Bupivakain/Levobupivakain) veya USG/anatomik rehberli **Bilateral Pudendal Sinir Bloğu** postop ilk 12–24 saatlik ağrıyı dramatik azaltır.',
      'Anal Sfinkter Spazmını Çözücü Topikal Tedavi: İnternal anal sfinkter spazmı ağrıyı kısır döngüye sokar; topikal **%2 Diltiazem** veya **%0.2–0.4 Gliseril Trinitrat (GTN)** merhemi (baş ağrısı yan etkisi izlenerek) ağrıyı ve iyileşme süresini iyileştirir.',
      'Opioid Kısıtlaması ve Barsak Bakımı: Opioidler kabızlık, fekal impaksiyon, ıkınma ve buna bağlı yara kanaması ile üriner retansiyonu (POUR) belirgin artırır! Opioidler yalnızca şiddetli kurtarıcı analjezi için en düşük dozda saklanmalı; mutlaka osmotik laksatif / dışkı yumuşatıcı, bol lif/sıvı ve ılık oturma banyosu (Sitz bath) reçete edilmelidir.'
    ],
    prospectRecommendations: [
      'PROSPECT Hemorrhoid Surgery Kılavuzu: Multimodal analjezide sistemik Parasetamol + NSAİİ (veya COX-2 inhibitörü) + tek doz intraoperatif **Deksametazon** kombinasyonu temel standarttır.',
      'PROSPECT Önerisi — Pudendal Sinir Bloğu: Eksizyonel hemoroidektomide cerrahi alan infiltrasyonuna alternatif veya ek olarak **Pudendal Sinir Bloğu**, postoperatif ağrı skorlarını ve opioid ihtiyacını belirgin düşürdüğü için güçlü düzeyde önerilir.',
      'PROSPECT Önerisi — Topikal Ajanlar & Adjuvanlar: Topikal Diltiazem/GTN veya topikal lokal anestezik jeller; seçilmiş olgularda oral Metronidazol (sekonder bakteriyel kolonizasyon kaynaklı ağrıyı azaltmada bazı rehberlerde) ve flavonoidler ağrı kontrolünü güçlendirir.',
      'Cerrahi Teknik Etkisi: Uygun endikasyonda enerji cihazları (LigaSure/Harmonik) veya stapler hemoroidopeksi kullanımı, klasik konvansiyonel eksizyona göre daha düşük postoperatif ağrı ile ilişkilidir.'
    ],
    erasRecommendations: [
      'Günübirlik (Ambulatuvar) Taburculuk & POUR Protokolü: Kısa etkili Saddle spinal veya kısa etkili genel anestezi ile hastalar aynı gün taburcu edilebilir; ancak **Postoperatif Üriner Retansiyon (POUR)** taraması zorunludur (intraoperatif sıvı ≤ 500–750 mL, opioid kısıtlaması, taburculuk öncesi spontan idrar çıkışının doğrulanması veya şüphede mesane USG ile < 300–400 mL kontrolü).',
      'Erken Oral Alım ve Laksatif Başlangıcı: Derlenme sonrası erken sıvı/katı gıda ve ilk akşamdan itibaren yumuşak dışkılama sağlayacak laksatiflerin başlatılması ilk defekasyon korkusunu ve kanamayı önler.',
      'Postoperatif Kanama Güvenlik Uyarısı: Özellikle kapalı Ferguson tekniği veya stapler hemoroidopeksi sonrasında rektum içinde ağrısız veya tenesmuslu **gizli intraluminal kanama** birikip geç dönemde ani masif rektal pıhtı boşalması ve senkop/hipovolemi yapabileceği için taburculuk öncesi ve PACU takibi dikkatli yapılmalıdır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference:
      "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section I: General Surgery — Anorectal Surgery / Hemorrhoidectomy. Lippincott Williams & Wilkins.",
    prospectReference:
      'Sammour, T., Barazanchi, A. W., Hill, A. G., & PROSPECT Working Group. Evidence-based management of pain after excisional haemorrhoidectomy surgery: a PROSPECT systematic review update. World J Surg / ESRA PROSPECT Recommendations. 2017;41(2):603–614.',
    erasReference:
      'Gustafsson, U. O., et al. Guidelines for Perioperative Care in Elective Colorectal Surgery: Enhanced Recovery After Surgery (ERAS®) Society Recommendations & SAMBA Ambulatory Anesthesia Consensus Statement on Postoperative Urinary Retention (POUR).',
    otherReferences: [
      'Gropper, M. A., et al. Miller’s Anesthesia (10th ed.). Outpatient (Ambulatory) Anesthesia, Spinal (Saddle) Block & Prone Positioning Physiology. Elsevier.',
      'Butterworth, J. F., Mackey, D. C., & Wasnick, J. D. Morgan & Mikhail’s Clinical Anesthesiology (7th ed.). Neuraxial Anesthesia & Anorectal Procedures. McGraw-Hill.',
      'Joshi, G. P., & Neugebauer, E. A. Evidence-based management of pain after haemorrhoidectomy surgery. Br J Surg. 2010;97(8):1155–1168.',
      'ASRA (American Society of Regional Anesthesia and Pain Medicine) Evidence-Based Guidelines: Regional Anesthesia in the Patient Receiving Antithrombotic or Thrombolytic Therapy.'
    ]
  }
};
