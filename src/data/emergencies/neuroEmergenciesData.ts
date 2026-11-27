import type { EmergencyProtocol } from '../emergenciesData';

export const ICP_CRISIS_PROTOCOL: EmergencyProtocol = {
  id: 'icp-crisis',
  // 1) Başlık
  title: 'İntrakraniyel Basınç Artışı (KİBAS / Akut İKB Krizi ve Herniasyon)',
  subTitle:
    'Monro-Kellie Dekompansasyonu · SIBICC Tier 0–3 Algoritması · Transtentoryal Herniasyon & İntraoperatif “Tight Brain” Yönetimi',
  codeColor: 'red',
  severityBadge: 'KOD KIRMIZI · AKUT HERNİASYON & SEREBRAL İSKEMİ ACİLİ',
  keyCallout:
    'İKB >22 mmHg (>5 dk), anizokori, Cushing triadı (HT + bradikardi + düzensiz solunum) veya dura açılınca beyin protrüzyonu (“tight brain”) = AKUT İKB KRİZİ! DERHAL başı 30° nötral orta hatta al, boyun venöz basısını (sıkı ETT bağı/servikal yakalık) çöz, N₂O ve >1 MAC volatili kapatıp Propofol TIVA’ya geç! Hipoksi (SpO₂ ≥%95) ve hipotansiyondan (CPP = MAP − İKB ≥60–70 mmHg; Noradrenalin!) mutlak kaçın. Hızlı ozmoterapi uygula: %20 Mannitol (0,25–1 g/kg = 1,25–5 mL/kg; tek bolus tavanı 100 g [500 mL], obezitede IBW/AdjBW; ozmolal gap <20!) veya hipotansif hastada hazır %3 Hipertonik Salin (2–5 mL/kg, maks 250 mL) ya da herniasyon kurtarmasında YALNIZCA SANTRAL HATTAN eşdeğer hipertonik bolus (30 mL %23,4 NaCl hazır flakon TR’de yaygın değildir → santral hattan 35 mL %20 NaCl veya 70 mL %10 NaCl ≈ 7 g NaCl / 120 mEq Na⁺!). Aktif herniasyonda geçici köprü hiperventilasyon (PaCO₂ 30–35 mmHg; uzamış <25–30 mmHg YASAK!). Cushing hipertansiyonunu körlemesine düşürme ve TBH’de STEROİD VERME (MRC CRASH)! Refrakter krizde (Tier 3) EVD BOS drenajı, Tiyopental burst-supresyon ve dekompresif kraniyektomi!',
  quickCalculatorType: 'icp-crisis',

  // 2) Tanımlama ve Giriş
  introduction: {
    definition:
      'İntrakraniyel Basınç Artışı (KİBAS / İntrakraniyal Hipertansiyon), rijid kranium içindeki üç kompartmandan (beyin parankimi %80, serebral kan %10, BOS %10) birinin hacminin kompansasyon kapasitesini aşacak biçimde artması sonucu intrakraniyal basıncın erişkinde sürekli >22 mmHg (>5 dakika) üzerine çıkmasıdır (normal erişkin İKB 5–15 mmHg, çocuk 3–7 mmHg, infant 1,5–6 mmHg). Klinik olarak kritik eşik yalnızca mutlak İKB değeri değil, Serebral Perfüzyon Basıncı (CPP = MAP − İKB; hedef 60–70 mmHg) ve doku oksijenasyonunun korunmasıdır. Kontrolsüz İKB yükselmesi, beyin parankiminin yüksek basınçlı kompartmandan düşük basınçlı kompartmana yer değiştirmesine (transtentoryal/unkal, subfalsin veya tonsiller herniasyon), beyin sapı iskemisine ve ölüme yol açar.',
    epidemiology:
      'Şiddetli travmatik beyin hasarında (TBH; GKS ≤8) hastaların %40–60’ında yoğun bakım veya ameliyathane sürecinde İKB >20–22 mmHg atakları gelişir. İntrakraniyal tümör, anevrizmal subaraknoid kanama (SAK), intraserebral hemoraji (İSK), akut hidrosefali ve geniş iskemik inme olgularında akut İKB krizi önde gelen perioperatif mortalite nedenidir. Kraniyotomi sırasında dura açılmasını takiben gelişen intraoperatif akut beyin şişmesi (“tight brain”), elektif tümör cerrahilerinde ~%0,7–3, acil travma ve kanama kraniyotomilerinde ise %10–15’e varan sıklıkta bildirilmekte olup cerrahi kapanışı imkânsızlaştırabilir ve kortikal laserasyon/iskemiye neden olabilir.',
    triggers: [
      'Yer Kaplayıcı İntrakraniyal Kitle & Kanamalar: Akut epidural/subdural hematom, intraserebral hemoraji, tümör içi kanama, beyin apsesi veya gergin pnömosefali (N₂O maruziyetiyle hızla büyür!)',
      'Serebral Kan Hacmi (CBV) ve Serebral Kan Akımı (CBF) Artışı: Hiperkapni (PaCO₂ >45 mmHg), hipoksemi (PaO₂ <60 mmHg), >1 MAC volatil anesteziklerin direkt serebral vazodilatasyonu, N₂O kullanımı ve kontrolsüz hipertansiyon (otoregülasyon üst sınırı aşımı)',
      'Serebral Venöz Drenaj Obstrüksiyonu: Baş-aşağı (Trendelenburg) pozisyon, aşırı boyun rotasyonu/fleksiyonu, sıkı ETT sabitleme bağı veya rijid servikal yakalık, öksürme/ıkınma/yüzeyel anestezi, yüksek PEEP (>10–15 cmH₂O) veya intratorasik basınç artışı (tansiyon pnömotoraks, bronkospazm, laparoskopi)',
      'Serebral Ödem & Hipotonik Sıvı Hatası: İskemik/travmatik sitotoksik ödem, tümör çevresi vazojenik ödem, hiponatremi (<135 mEq/L) veya hipotonik/glukozlu sıvı infüzyonu (D5W, %0,45 NaCl, aşırı Ringer Laktat [273 mOsm/L])',
      'BOS Dolaşım Obstrüksiyonu & Sistemik İkincil Hasarlar: Akut obstrüktif hidrosefali, tıkalı veya hatalı seviyede klempli EVD, ateş (>37,5°C — her 1°C artış CMRO₂ ve CBF’yi %6–7 artırır!), konvülsif veya non-konvülsif nöbet/status epileptikus'
    ],
    safeAgents: [
      'Nörokoruyucu Anestezi (TIVA): Propofol (CMRO₂ ve CBF’yi paralel azaltır, otoregülasyonu ve CO₂ reaktivitesini korur; #tedavi=propofol) + Remifentanil veya Fentanil (analjezi ve laringoskopi/pinleme sempatik yanıt baskılama)',
      'Ozmoterapi Ajanları: %20 Mannitol (0,25–1 g/kg = 1,25–5 mL/kg; tek bolus tavanı 100 g [500 mL], obezitede IBW/AdjBW; övolemik/normotansif hastada) veya hazır %3 Hipertonik Salin (2–5 mL/kg, maks 250 mL; hipotansif/hipovolemik hastada ilk tercih!) ya da herniasyon kurtarmasında santral hattan %10 / %20 NaCl ampullerinden hazırlanan eşdeğer hipertonik bolus (30 mL %23,4 NaCl hazır flakon TR’de yaygın değildir → 35 mL %20 NaCl veya 70 mL %10 NaCl ≈ 7 g NaCl [120 mEq Na⁺], YALNIZCA SANTRAL HAT!)',
      'CPP Desteği, Vazopressörler & Sıvılar: Noradrenalin (ilk tercih; hedef CPP 60–70 mmHg; #tedavi=norepinephrine) veya Fenilefrin (TR’de rutin stokta bulunmayan merkezlerde dilüe Noradrenalin push-dose/infüzyon kullanılır); sıvı replasmanında izotonik %0,9 NaCl (308 mOsm/L) veya büyük hacimli nöro-resüsitasyonda hiperkloremik metabolik asidozu önlemek için izo-ozmolar dengeli kristaloidler (Plasmalyte-A / Isofundin, ~295–304 mOsm/L; hipo-ozmolar Ringer Laktat [~273 mOsm/L] KULLANILMAZ!)',
      'Serebral Güvenli Antihipertansifler: Öncelikle TR’de mevcut Nikardipin (5–15 mg/sa; #tedavi=nicardipine), Labetalol veya Esmolol (Klevidipin TR’de ruhsatlı/mevcut değil) — serebral vazodilatasyon yapmadan kontrol sağlar (Nitrogliserin ve Sodyum Nitroprussid’den KAÇIN!)',
      'Havayolu, Sempatik Baskılama & Tier 3 Ajanları: Lidokain (1,5 mg/kg IV entübasyon/ekstübasyon öksürük yanıtını baskılar; #tedavi=lidocaine), Rokuronyum/Vekuronyum (derin kas gevşemesi), Levetirasetam (nöbet profilaksisi), Tiyopental (Tier 3 burst-supresyon koması; #tedavi=thiopental) ve YALNIZCA tümör/apse vazojenik ödeminde Deksametazon (#tedavi=dexamethasone)'
    ],
    mortalityStats:
      'Refrakter İKB >20–22 mmHg seyrinde mortalite %50’yi aşar; bilateral fiks dilate pupil ve beyin sapı herniasyonu oturduğunda mortalite >%70–90’dır. Brain Trauma Foundation (BTF) verileri tek bir pre/intraoperatif hipotansiyon (SKB <90 mmHg) epizodunun mortaliteyi 2 kat, hipotansiyon + hipoksi (SpO₂ <%90) birlikteliğinin ise mortaliteyi 3–4 kat artırdığını kanıtlamıştır. Erken Tier 0–3 algoritmik yönetim, CPP koruması ve zamanında cerrahi dekompresyon sağkalımı ve fonksiyonel nörolojik iyileşmeyi anlamlı düzeyde yükseltir.',
    clinicalUrgency:
      'Akut İKB yükselmesi ve herniasyon dakikalar içinde geri dönüşsüz serebral enfarkt ve beyin sapı ölümüne ilerler. Hem ameliyathanede (“tight brain”, ani bradikardi/hipertansiyon, anizokori) hem de yoğun bakımda (İKB >22 mmHg) saniyeler içinde mekanik, ventilatuvar, ozmotik ve hemodinamik adımların eşzamanlı devreye alınması şarttır.'
  },

  // 3) Tanı
  diagnosis: {
    overview:
      'Kesin İKB ölçümü invaziv monitörizasyonla (altın standart: hem ölçüm hem BOS drenajı sağlayan Eksternal Ventriküler Drenaj [EVD]; alternatif: intraparenkimal fiberoptik/strain-gauge prob) yapılır. BTF 4th Ed. (2017) ve SIBICC (2019) konsensüsüne göre erişkinde sürekli >5 dakika boyunca İKB >22 mmHg tedavi eşiğidir ve CPP 60–70 mmHg aralığında tutulmalıdır. Sayısal değer yükselmeden önce dahi İKB dalga formunun değişmesi (normalde P1 perküsyon > P2 tidal > P3 dikrotik iken, serebral kompliyans tükendiğinde P2 > P1 olması ve 5–20 dk süren 50–100 mmHg’lik Lundberg A [plato] dalgaları) yaklaşan herniasyonun en erken uyarısıdır. Genel anestezi altında nörolojik muayene maskelendiği için pupil kontrolü, hemodinamik Cushing paterni ve kraniyotomide cerrahın bildirdiği “tight brain” bulgusu yaşamsaldır.',
    clinicalCriteria: [
      'İKB & CPP Eşikleri (BTF 2017 / SIBICC 2019): Sürekli (>5 dk) İKB >22 mmHg (normal 5–15 mmHg), CPP = MAP − İKB <60 mmHg (hedef 60–70 mmHg), İKB dalga formunda kompliyans kaybı (P2 > P1) veya ani Lundberg A (plato) dalgaları',
      'Cushing Triadı (Geç & Pre-Herniasyon Alarmı!): Progresif sistemik hipertansiyon + genişlemiş nabız basıncı (SKB − DKB ↑) + refleks bradikardi + düzensiz/Cheyne-Stokes/biot solunum (genel anestezide solunum bileşeni ventilatör nedeniyle maskelenir → ani HT + bradikardi ikilisine dikkat!)',
      'Transtentoryal (Unkal) Herniasyon: Temporal lob unkusunun tentoryum açıklığından sarkarak ipsilateral CN III (okulomotor) parasempatik liflerine basması → ipsilateral midriyazis (anizokori >2 mm) ve ışık refleksi kaybı, kontralateral hemiparezi (veya karşı pedünkülün tentoryuma sıkışması [Kernohan çentiği] nedeniyle paradoksal ipsilateral hemiparezi!) ve hızlı koma progresyonu',
      'Tonsiller (Foramen Magnum) Herniasyon: Serebellar tonsillerin foramen magnumdan medulla oblongata üzerine fıtıklaşması → ani apne/solunum arresti, derin bradikardi, kardiyovasküler kollaps ve ani ölüm (**KİBAS şüphesinde Lomber Ponksiyon KESİN KONTRENDİKEDİR!**)',
      'İntraoperatif “Tight Brain” (Beyin Şişmesi) Tanısı & Kontrol Listesi: Kraniyotomide dura açıldığında beyin parankiminin gergin/pulssuz olması ve kemik defektinden dışarı protrüze olması → 60 saniyede 5’li kontrol: (1) Baş 30° orta hat & boyun venöz basısı yok mu? (2) PaCO₂, SpO₂, Ppeak/PEEP & NMB tam mı? (3) N₂O kapalı, volatil <1 MAC / TIVA’da mı? (4) MAP/CPP, ısı ve Na⁺ optimal mi? (5) Ozmoterapi, BOS drenajı veya gizli hematom (kontralateral/epidural) kontrolü!',
      'Non-İnvaziv & Radyolojik Kanıtlar: Yatak başı oküler USG’de Optik Sinir Kılıf Çapı (ONSD) >5,0–5,8 mm (bulbusun 3 mm arkasında), otomatik pupillometride Nörolojik Pupil İndeksi (NPi) <3,0; Acil Kontrastsız Beyin BT’de bazal sisternlerin silinmesi, ≥5 mm orta hat şifti, sulkal silinme, ventriküler kompresyon veya akut hidrosefali'
    ],
    gradingScaleTitle: 'KİBAS / İKB Krizi Kompliyans, Dalga Formu & Herniasyon Evrelemesi',
    gradingScaleSource: 'BTF 4th Ed. (2017) · SIBICC Consensus (Hawryluk et al., Intensive Care Med 2019)',
    larachScale: [
      {
        category: 'Evre 1 — Normal / Kompanse İKB (5–15 mmHg)',
        points: 'P1 > P2 > P3',
        description:
          'İntrakraniyal kompliyans korunmuştur; küçük hacim artışları BOS ve venöz kanın spinal kanala/juguler vene kaymasıyla tolere edilir. Tier 0 temel nörokoruma yeterlidir.'
      },
      {
        category: 'Evre 2 — Kompliyans Tükenmesi / Sınırda İKB (15–22 mmHg)',
        points: 'P2 > P1 Uyarısı',
        description:
          'Monro-Kellie eğrisinin dikleşen bacağına geçilmiştir: P2 dalgası P1’i aşar! Küçük bir hiperkapni, öksürük veya baş aşağı pozisyon İKB’yi aniden >35–40 mmHg’ye fırlatabilir.'
      },
      {
        category: 'Evre 3 — Aktif KİBAS (>22 mmHg, >5 dk) / İntraop “Tight Brain”',
        points: 'TIER 1–2 TEDAVİ',
        description:
          'Serebral perfüzyon basıncı (CPP) tehdit altındadır; dura açıldığında beyin protrüze olur. Derhal Tier 1–2 (pozisyon, ozmoterapi, derin TIVA, EVD drenajı, kısa süreli PaCO₂ 30–35 mmHg) başlatılmalıdır.'
      },
      {
        category: 'Evre 4 — Yaklaşan / Aktif Herniasyon (Unkal / Cushing Triadı)',
        points: 'KOD KIRMIZI',
        description:
          'İpsilateral fiks dilate pupil (anizokori), ani hipertansiyon + bradikardi (Cushing refleksi), Lundberg A plato dalgaları (50–100 mmHg) veya hızla düşen GKS — dakikalar içinde acil ozmotik bolus (hazır %3 HTS / %20 Mannitol [tek bolus maks 100 g] veya santral hattan %20/%10 NaCl eşdeğer kurtarma bolusu [30 mL %23,4 hazır flakon TR’de yaygın değildir]) + geçici hiperventilasyon + acil BT/cerrahi!'
      },
      {
        category: 'Evre 5 — Refrakter İKB / Tonsiller Herniasyon',
        points: 'TIER 3 KURTARMA',
        description:
          'Tier 1–2’ye yanıt vermeyen İKB >25–30 mmHg veya bilateral midriyazis + beyin sapı refleks kaybı + apne/şok — Tier 3 kurtarma (Tiyopental burst-supresyon koması, dekompresif kraniyektomi, kurtarma hipotermisi) değerlendirilir.'
      }
    ],
    larachInterpretation:
      'Klinik altın kural: Cushing triadı ve anizokori “erken” bulgu değil, geç ve pre-herniasyon bulgusudur! İKB >22 mmHg veya P2 > P1 dalga formu değişikliği yakalandığı anda SIBICC basamaklarına geçilmeli; kraniyotomide cerrah “beyin gergin / sıkı” dediği saniye tüm sistemik ve anestezi kaynaklı nedenler taranmalıdır.',
    differentialDiagnosis: [
      {
        condition: 'Yüzeyel Anestezi, Cerrahi Ağrı (Kraniyal Pinleme) veya Sempatik Hipertansiyon',
        differentiatingFactors:
          'Şiddetli hipertansiyona tipik olarak bradikardi değil TAŞİKARDİ eşlik eder; anizokori yoktur ve analjezi/propofol derinleştirildiğinde kan basıncı hızla normalize olur (ancak kontrolsüz HT de İKB’yi sekonder yükseltir!).'
      },
      {
        condition: 'Tansiyon Pnömotoraks, Ağır Bronkospazm veya Venöz Hava Embolisi (VAE)',
        differentiatingFactors:
          'Yüksek intratorasik basınç veya sağ kalp doluş engeli juguler venöz dönüşü bloke ederek ani “tight brain” tablosunu birebir taklit edebilir! Ppeak artışı, tek taraflı solunum sesi kaybı, ani EtCO₂ düşüşü ve hipotansiyonla ayrılır.'
      },
      {
        condition: 'Hiperkapni (Devre Rebreathing / Hipoventilasyon) veya Malign Hipertermi',
        differentiatingFactors:
          'Yüksek EtCO₂ (>45–55 mmHg) güçlü serebral vazodilatasyonla akut beyin şişmesine yol açar. Ventilasyon düzeltilip FiCO₂/soda lime kontrol edildiğinde hiperkapnik ödem hızla geriler; MH’de ise rijidite, mikst asidoz ve ateş eşlik eder.'
      },
      {
        condition: 'Farmakolojik veya Lokal Anestezik Kaynaklı İzole Anizokori',
        differentiatingFactors:
          'Nebülize ipratropiumun göze kaçması, skopolamin bandı, orbital/supraorbital blok veya kafa derisi bloğu yayılımı tek taraflı midriyazis yapabilir; ancak İKB/hemodinami normaldir, uyanık hastada bilinç açıktır ve BT’de şift yoktur.'
      },
      {
        condition: 'Non-Konvülsif Status Epileptikus (NCSE) veya Akut Hipoglisemi',
        differentiatingFactors:
          'Postoperatif gecikmiş uyanma veya açıklanamayan İKB artışı yapabilir; parmak ucu kan şekeri ve sürekli EEG ile dışlanır. Nöbet CMRO₂ ve CBF’yi fırlatarak sekonder İKB krizini tetikler.'
      }
    ]
  },

  // 4) Acile Spesifik Akut Yönetimi - Kriz Yönetimi
  crisisManagement: {
    hotlineInfo:
      'BEYİN CERRAHİSİNİ DERHAL UYARIN · BAŞ 30° ORTA HAT · BOYUN VENÖZ DRENAJINI AÇ · HİPOKSİ & HİPOTANSİYON YASAK (CPP 60–70 mmHg) · SIBICC TIER 0 → 3 BASAMAKLI YÖNETİM!',
    coreAlgorithm: [
      {
        stepNumber: 1,
        title: 'TİER 0 — İLK 60 SANİYE POZİSYON, VENÖZ DRENAJ & OKSİJENASYON (“TİGHT BRAİN” KONTROLÜ)',
        action:
          'Cerrahi ekibe krizi anında bildirin. Baş ve gövdeyi 30° yükseltin (reverse Trendelenburg; hemodinami elveriyorsa), başı tam NÖTRAL ORTA HATTA tutun (boyun rotasyonu/fleksiyonu internal juguler veni kapatır!). Sıkı ETT tespit bağını, rijid servikal yakalığı veya venöz drenajı sıkan pozisyon yastıklarını derhal gevşetin. FiO₂’yi artırarak SpO₂ ≥%95 (PaO₂ >80–100 mmHg) sağlayın; intratorasik basıncı ve PEEP’i gözden geçirin (genellikle 5–8 cmH₂O; aşırı PEEP >12–15 cmH₂O venöz dönüşü bozabilir). Hastanın öksürmesini/ıkınmasını önlemek için derin kas gevşemesi (Rokuronyum/Vekuronyum; TOF = 0) sağlayın.',
        criticalNote:
          'Arteriyel basınç transdüserini mutlaka TRAGUS (dış kulak yolu / Foramen of Monro) seviyesinde sıfırlayın! 30° baş elevasyonunda kalp hizasında sıfırlamak MAP/CPP’yi ~10–15 mmHg olduğundan yüksek gösterir!',
        priority: 'CRITICAL'
      },
      {
        stepNumber: 2,
        title: 'VENTİLASYON & GEÇİCİ HİPERVENTİLASYON KÖPRÜSÜ (PaCO₂ 30–35 mmHg)',
        action:
          'Temel hedef normokapnidir (PaCO₂ 35–38 mmHg). Ancak aktif herniasyon (anizokori / Cushing triadı) veya ciddi intraoperatif “tight brain” anında hızlı serebral vazokonstriksiyon için GEÇİCİ KÖPRÜ olarak dakika ventilasyonunu artırıp PaCO₂’yi 30–35 mmHg bandına indirin (etki 1–2 dakikada başlar!). EtCO₂ ile PaCO₂ arasındaki gradient (genellikle 3–6 mmHg, ölü boşluk artmışsa daha fazla!) mutlaka acil arter kan gazı (AKG) ile doğrulanmalıdır.',
        criticalNote:
          'Profilaktik hiperventilasyon veya uzamış agresif hiperventilasyon (PaCO₂ <25–30 mmHg) serebral vazokonstriksiyon ile İSKEMİ ve enfarkt oluşturur — KESİNLİKLE YASAKTIR! Hiperventilasyon yalnızca ozmoterapi veya cerrahi dekompresyon etki edene kadar kısa süreli köprüdür; 6–24 saat içinde BOS HCO₃⁻ adaptasyonuyla etkisi kaybolur ve ani bırakılırsa rebound vazodilatasyon yapar!',
        priority: 'CRITICAL'
      },
      {
        stepNumber: 3,
        title: 'ANESTEZİ DERİNLEŞTİRME, VOLATİL & N₂O’YU KESME VE TIVA’YA GEÇİŞ',
        action:
          'Azot protoksiti (N₂O) DERHAL kapatın (CMRO₂/CBF artışı ve pnömosefali genişlemesi!). Volatil anestezikler (>1 MAC düzeyinde direkt serebral vazodilatasyon ile İKB’yi artırır!) kullanılıyorsa kapatıp Propofol TIVA’ya geçin (#tedavi=propofol: 1–2 mg/kg IV bolus → 4–6 mg/kg/saat infüzyon + Remifentanil/Fentanil; BIS/EEG 35–45 hedefi). Entübasyon, aspirasyon veya kraniyal pinleme uyaranlarında Lidokain 1,5 mg/kg IV (#tedavi=lidocaine) + Fentanil 1–2 mcg/kg IV ile sempatik İKB sıçramasını baskılayın.',
        criticalNote:
          'Yüksek doz Propofol (>4 mg/kg/saat, >48 saat) yoğun bakımda Propofol İnfüzyon Sendromu (PRIS: laktik asidoz, rabdomiyoliz, Brugada benzeri EKG, kardiyak arrest) riski taşır — uzun süreli infüzyonlarda yakından izleyin!',
        priority: 'CRITICAL'
      },
      {
        stepNumber: 4,
        title: 'TİER 1 — HİPEROZMOLAR TEDAVİ: %20 MANNİTOL vs %3 / YÜKSEK KONSANTRASYONLU HİPERTONİK SALİN',
        action:
          'Akut İKB >22 mmHg, herniasyon veya “tight brain” varlığında gecikmeden ozmoterapi uygulayın:\n• %20 Mannitol: 0,25–1 g/kg IV (15–20 dk’da; %20 = 0,2 g/mL → 1,25–5 mL/kg; tek bolus tavanı 100 g [500 mL], obezitede IBW/AdjBW baz alınır; inline filtre kullanın!). Etki 15–30 dk’da başlar, 60 dk’da pik yapar. Ozmotik diürezle gelişen volüm kaybını %0,9 NaCl veya izo-ozmolar dengeli kristaloidle mutlaka yerine koyun.\n• Hazır %3 Hipertonik Salin (HTS): 2–5 mL/kg IV (maks 250 mL, 15–20 dk’da; geniş periferik venden verilebilir). Hipotansif, hipovolemik veya böbrek yetmezliği olan hastada İLK TERCİHTİR (intravasküler hacmi artırarak CPP’yi destekler!).\n• Herniasyon Kurtarma Hipertonik Bolusu (TR Pratiği): Hazır 30 mL %23,4 NaCl flakonları TR’de yaygın değildir! Acil herniasyon kurtarmasında santral hattan %10 / %20 NaCl ampullerinden hazırlanan eşdeğer hipertonik bolus uygulanır: 30 mL %23,4 = ~7 g NaCl [120 mEq Na⁺] ≈ 35 mL %20 NaCl veya 70 mL %10 NaCl (10–20 dk’da, YALNIZCA SANTRAL VENÖZ HATTAN!).',
        criticalNote:
          'Mannitol tekrarı öncesi serum ozmolalitesi <320 mOsm/kg VE özellikle OZMOLAL GAP <20 mOsm/kg doğrulanmalıdır (birikim → akut böbrek hasarı ve rebound ödem!). HTS’de hedef serum Na⁺ 145–155 mEq/L (maks 160 mEq/L); %10 / %20 / %23,4 NaCl periferik venden ASLA verilmez (doku nekrozu)! Seçili dirençli olgularda Furosemid 0,5–1 mg/kg (#tedavi=furosemide) sinerji için eklenebilir ancak agresif hipovolemiden kaçının.',
        priority: 'CRITICAL'
      },
      {
        stepNumber: 5,
        title: 'TİER 1 — CPP OPTİMİZASYONU (60–70 mmHg), SIVI SEÇİMİ & CUSHİNG HİPERTANSİYONU KURALI',
        action:
          'CPP = MAP − İKB denklemini her dakika koruyun (BTF hedefi: 60–70 mmHg; İKB monitörü yoksa SKB ≥100–110 mmHg, MAP ≥80–90 mmHg). Hipotansiyonda izotonik %0,9 NaCl (308 mOsm/L) veya büyük hacimli nöro-resüsitasyonda hiperkloremik metabolik asidozu önlemek için güçlü bir alternatif olan izo-ozmolar dengeli kristaloidler (Plasmalyte-A / Isofundin, ~295–304 mOsm/L) bolusu + Noradrenalin infüzyonu (#tedavi=norepinephrine; 0,05–0,5 mcg/kg/dk) veya köprü olarak Fenilefrin (TR’de rutin stokta bulunmayan merkezlerde dilüe Noradrenalin push-dose/infüzyon kullanılır) başlatın; hipotonik/glukozlu sıvılardan (D5W, %0,45 NaCl ve hipo-ozmolar Ringer Laktat [~273 mOsm/L]) KESİN KAÇININ. Şiddetli hipertansiyonda (ör. SKB >180–200 mmHg, anevrizma rüptürü riski veya cerrahi kanama) serebral vazodilatasyon yapmayan TR’de mevcut Nikardipin (#tedavi=nicardipine; 5–15 mg/sa), Labetalol veya Esmolol titre edin (Klevidipin TR’de ruhsatlı/mevcut değil).',
        criticalNote:
          'CUSHİNG TUZAĞI: Cushing refleksine bağlı hipertansiyonu altta yatan İKB’yi düşürmeden agresif antihipertansifle kırmak CPP’yi çökertir! Ayrıca Nitrogliserin ve Sodyum Nitroprussid serebral venöz/arteriyel vazodilatasyonla İKB’yi ARTIRDIĞI için KİBAS’ta KAÇINILMALIDIR!',
        priority: 'CRITICAL'
      },
      {
        stepNumber: 6,
        title: 'TİER 1–2 — BOS DRENAJI (EVD), NÖBET KONTROLÜ, NORMOTERMİ & STEROİD AYRIMI',
        action:
          'Eksternal ventriküler drenaj (EVD) mevcutsa kontrollü BOS drenajı yapın (ani aşırı boşaltma anevrizma yeniden kanaması veya subdural hematom yapabilir!); intraoperatif cerrah ventrikülostomi veya lomber dren (posterior fossa/herniasyon YOKSA!) açabilir. Ateşi (>37,5°C) antipiretik ve yüzey soğutma ile agresif kontrol edin. Erken nöbet profilaksisi (şiddetli TBH ilk 7 gün veya kraniyotomi) için Levetirasetam (erişkin 1–3 g IV yükleme → 500–1000 mg q12h) veya Fosfenitoin uygulayın; açıklanamayan İKB artışında non-konvülsif nöbeti sürekli EEG ile dışlayın.',
        criticalNote:
          'STEROİD PARADOKSU: Beyin tümörü veya apse kaynaklı VAZOJENİK ödemde Deksametazon 10 mg IV yükleme → 4 mg q6h (#tedavi=dexamethasone) etkilidir. Buna karşın TRAVMATİK BEYİN HASARINDA (TBH) yüksek doz kortikosteroid mortaliteyi artırdığı için KESİNLİKLE KONTRENDİKEDİR (MRC CRASH, BTF Sınıf I)!',
        priority: 'HIGH'
      },
      {
        stepNumber: 7,
        title: 'TİER 3 — REFRAKTER İKB’DE BARBİTÜRAT KOMASI (TİYOPENTAL BURST-SUPRESYON)',
        action:
          'Tier 1–2 önlemlerine (pozisyon, derin TIVA, ozmoterapi, BOS drenajı, normokapni/kısa hiperventilasyon, normotermi) rağmen İKB >22–25 mmHg sürüyorsa sürekli EEG eşliğinde Barbitürat Koması başlatın: Tiyopental (#tedavi=thiopental) 3–5 mg/kg IV yavaş yükleme (hemodinamiye bölerek!) → 1–5 mg/kg/saat sürekli infüzyon (veya Pentobarbital 10 mg/kg/30 dk → 5 mg/kg/sa × 3 → 1–3 mg/kg/sa). Hedef: EEG’de burst-supresyon paterni (5–10 sn supresyon / 1 burst) veya İKB <20 mmHg kontrolü.',
        criticalNote:
          'Barbitüratlar CMRO₂ ve CBF’yi %50’ye kadar düşürerek İKB’yi kırar; ancak güçlü miyokard depresyonu ve vazodilatasyon yapar! Başlamadan önce santral venöz yol, arteriyel monitör ve Noradrenalin infüzyonu MUTLAKA hazır olmalıdır (profilaktik barbitürat önerilmez, yalnızca refrakter Tier 3’te!).',
        priority: 'HIGH'
      },
      {
        stepNumber: 8,
        title: 'TİER 3 — ACİL CERRAHİ DEKOMPRESYON & KURTARMA HİPOTERMİSİ DEĞERLENDİRMESİ',
        action:
          'Medikal tedaviye dirençli İKB veya yer kaplayıcı lezyon (epidural/subdural/intraserebral hematom, malign MCA enfarktı) varlığında zaman kaybetmeden acil cerrahi müdahale (hematom evakuasyonu, lobektomi veya geniş dekompresif hemikraniyektomi / bifrontal kraniyektomi — RESCUEicp) uygulanmalıdır. Refrakter Tier 3 krizde kurtarma amaçlı hafif hipotermi (35–36°C) seçili merkezlerde düşünülebilir (profilaktik 32–35°C hipotermi Eurotherm3235 ve POLAR çalışmalarında fayda göstermediği/zarar verdiği için RUTİN ÖNERİLMEZ!).',
        criticalNote:
          'Ameliyathanede kontrolsüz “tight brain” nedeniyle kemik flep yerine konamıyorsa zorlamayın — duraplasti ile açık kraniyektomi bırakıp kemik flebi saklamak kortikal strangülasyonu ve ölümü önler!',
        priority: 'HIGH'
      }
    ],
    structuredCrisisBlocks: {
      tieredLadder: {
        title: 'SIBICC 2019 / BTF 2017–2020 Basamaklı İKB Krizi Müdahale Merdiveni (Tier 0 → Tier 3)',
        accent: 'red',
        levels: [
          {
            badge: 'TİER 0 · TEMEL NÖROKORUMA (TÜM HASTALAR)',
            target: 'İKB <22 mmHg Koruma · Fizyolojik Optimizasyon',
            presentation:
              'Riskli kraniyotomi veya İKB monitörlü tüm hastalarda kesintisiz temel koruma (İKB yükselmeden önce uygulanır).',
            intervention:
              'Baş 30° nötral orta hat, boyun venöz basısı yok, SpO₂ ≥%95, PaCO₂ 35–38 mmHg, normotermi (<37,5°C), Hb ≥7–9 g/dL, glukoz 140–180 mg/dL, izotonik/izo-ozmolar sıvılar (%0,9 NaCl veya Plasmalyte-A/Isofundin; Na⁺ ≥135), arter tragus hizasında sıfırlama, nöbet profilaksisi.',
            severity: 'WARNING'
          },
          {
            badge: 'TİER 1 · BİRİNCİ BASAMAK AKTİF TEDAVİ',
            target: 'İKB >22 mmHg (>5 dk) veya Erken “Tight Brain”',
            presentation:
              'Sürekli İKB >22 mmHg, P2 > P1 kompliyans kaybı veya dura açılınca beyin gerginliği.',
            intervention:
              'Analjezi/sedasyon derinleştir (Propofol TIVA; volatil >1 MAC & N₂O KAPAT), CPP 60–70 mmHg (Noradrenalin), ozmoterapi (%20 Mannitol 0,25–1 g/kg [tek bolus tavanı 100 g / 500 mL, obezitede IBW/AdjBW] veya hazır %3 HTS 2–5 mL/kg, maks 250 mL), EVD varsa BOS drenajı, PaCO₂ alt-normal 35 mmHg.',
            severity: 'HIGH'
          },
          {
            badge: 'TİER 2 · İKİNCİ BASAMAK ESKALASYON',
            target: 'Tier 1’e Yanıtsız İKB >22 mmHg / Yaklaşan Herniasyon',
            presentation:
              'Ozmoterapi ve derin sedasyona rağmen yüksek İKB, gelişen anizokori veya ciddi intraop beyin protrüzyonu.',
            intervention:
              'Kısa süreli hafif hiperventilasyon (PaCO₂ 32–35 mmHg), derin kas gevşemesi (NMB denemesi — TOF 0), MAP Challenge (otoregülasyon testi: MAP +10 mmHg ile İKB düşüyorsa yüksek CPP hedeflenir!), tekrar ozmotik doz (hazır %3 HTS veya santral hattan %20 [35 mL] / %10 [70 mL] NaCl eşdeğer kurtarma bolusu — 30 mL %23,4 hazır flakon TR’de yaygın değildir!) ve acil Beyin BT.',
            severity: 'CRITICAL'
          },
          {
            badge: 'TİER 3 · ÜÇÜNCÜ BASAMAK KURTARMA',
            target: 'Refrakter İntrakraniyal Hipertansiyon (>25–30 mmHg)',
            presentation:
              'Tier 1–2 tedavilerine rağmen kontrol edilemeyen İKB krizi veya aktif herniasyon tehdidi.',
            intervention:
              'Barbitürat Koması (Tiyopental 3–5 mg/kg → 1–5 mg/kg/sa; EEG burst-supresyon + Noradrenalin), Sekonder Dekompresif Kraniyektomi (RESCUEicp) veya kurtarma amaçlı hafif hipotermi (35–36°C).',
            severity: 'CRITICAL'
          }
        ]
      },
      comparisonTable: {
        title: 'Akut İKB Krizinde Hiperozmolar Ajanlar & Tier 3 Barbitürat Karşılaştırması (NCS 2020)',
        columns: [
          'Ajan & Konsantrasyon',
          'Doz & Uygulama Yolu',
          'Etki Başlangıcı & Mekanizma',
          'Öncelikli Klinik Tercih',
          'Kritik Tuzak & Güvenlik Eşiği'
        ],
        rows: [
          {
            col1: '%20 Mannitol (0,2 g/mL · 5 mL/g)',
            col2: '0,25–1 g/kg IV (1,25–5 mL/kg; tek bolus tavanı 100 g [500 mL], obezitede IBW/AdjBW) · 15–20 dk (inline filtre)',
            col3: '15–30 dk (pik 60 dk) · Reolojik kan viskozitesi ↓ + ozmotik sıvı çekimi',
            col4: 'Normotansif, övolemik veya hipervolemik hasta; santral hat yokken hızlı bolus',
            col5: 'Tek bolus tavanı 100 g (500 mL) aşılmamalı! Ozmotik diürez → HİPOTANSİYON (%0,9 NaCl veya izo-ozmolar dengeli kristaloidle yerine koy!). Ozmolalite <320 mOsm/kg ve OZMOLAL GAP <20 mOsm/kg kontrol et; ABH/rebound riski!'
          },
          {
            col1: '%3 Hipertonik Salin (513 mEq/L Na⁺ — TR’de Hazır)',
            col2: '2–5 mL/kg IV (maks 250 mL) · 15–20 dk (geniş periferik ven veya CVC)',
            col3: '5–15 dk · Yüksek yansıma katsayısı (σ = 1,0 vs Mannitol 0,9) + plazma hacim artışı',
            col4: 'Hipotansif / hipovolemik hasta, böbrek yetmezliği veya Mannitol’e dirençli İKB (NCS 2020 avantajlı!)',
            col5: 'Hedef serum Na⁺ 145–155 (maks 160 mEq/L). Hiperkloremik asidoz & kronik hiponatremide ODS (≤6–8 mEq/L/24 sa) riski!'
          },
          {
            col1: '%23,4 NaCl (TR’de Yaygın Değil) → TR Eşdeğeri: %20 / %10 NaCl Santral Bolus',
            col2: '30 mL %23,4 NaCl (~7 g NaCl / 120 mEq Na⁺) TR’de yaygın değildir → Eşdeğeri: 35 mL %20 NaCl veya 70 mL %10 NaCl (10–20 dk)',
            col3: '5–10 dk · Çok hızlı güçlü ozmotik gradient ile herniasyon geri çevirme',
            col4: 'Akut transtentoryal herniasyon (anizokori / Cushing) ve refrakter İKB piklerinde kurtarma (santral hat yoksa hazır %3 NaCl 2–5 mL/kg, maks 250 mL!)',
            col5: 'YALNIZCA SANTRAL VENÖZ HATTAN! Periferik ekstravazasyon ciddi doku nekrozu yapar; hızlı puşede geçici hipotansiyon/bradikardi olabilir.'
          },
          {
            col1: 'Tiyopental (Tier 3 Barbitürat Koması)',
            col2: '3–5 mg/kg IV yavaş yükleme → 1–5 mg/kg/saat infüzyon',
            col3: '1–2 dk · GABA-A aracılı derin CMRO₂ ve CBF supresyonu (%50’ye kadar)',
            col4: 'Tier 1–2 tedavilerine (ozmoterapi + BOS drenajı) dirençli refrakter İKB krizi',
            col5: 'Ağır hipotansiyon (Noradrenalin şart!), uzamış yarı ömür (nörolojik muayene/beyin ölümü değerlendirmesini geciktirir), immünsüpresyon & VAP.'
          }
        ]
      },
      drugPolicyCards: {
        title: 'İKB Krizinde Farmakolojik & Sıvı Karar Kartları',
        items: [
          {
            domain: 'TIVA (Propofol + Opioid) vs >1 MAC Volatil & N₂O',
            recommendation:
              'Akut İKB yükselmesinde N₂O’yu derhal kapat, >1 MAC volatil anesteziği sonlandırıp Propofol + Remifentanil/Fentanil TIVA’ya geç (#tedavi=propofol).',
            rationaleAndCaution:
              'Propofol CMRO₂ ve CBF’yi paralel azaltır ve otoregülasyonu korur. Tüm volatiller (>1 MAC) direkt serebral vazodilatasyonla CBV’yi artırır (sevofluran <1 MAC görece en tolere edilebilir); N₂O ise CBF/CMRO₂ artışı ve pnömosefali riski nedeniyle yasaktır.',
            status: 'RECOMMENDED'
          },
          {
            domain: 'Hipotansif Hastada %3 HTS vs %20 Mannitol',
            recommendation:
              'Hipotansif, hipovolemik veya travma/kanama eşlik eden KİBAS hastasında ilk ozmoterapi tercihi hazır %3 Hipertonik Salin (2–5 mL/kg, maks 250 mL) olmalıdır.',
            rationaleAndCaution:
              'Mannitol (tek bolus tavanı 100 g [500 mL], obezitede IBW/AdjBW) güçlü ozmotik diürezle intravasküler hacmi tüketerek MAP ve CPP’yi düşürebilir. Mannitol verildiğinde idrar çıkışı izotonik %0,9 NaCl veya izo-ozmolar dengeli kristaloidle karşılanmalı ve tekrar öncesi ozmolal gap (<20 mOsm/kg) kontrol edilmelidir.',
            status: 'RECOMMENDED'
          },
          {
            domain: 'Süksinilkolin & Ketamin — Güncel Kanıt Nüansı',
            recommendation:
              'Acil zor/hızlı seri entübasyonda (RSI) hipoksi ve hiperkapniyi saniyeler içinde önlemek için Süksinilkolin veya hipotansif hastada Ketamin kesin kontrendike DEĞİLDİR!',
            rationaleAndCaution:
              'Süksinilkolinin oluşturduğu geçici hafif İKB artışı, entübasyon gecikmesine bağlı hipoksi/hiperkapni/öksürme hasarının yanında önemsizdir (Rokuronyum 1,2 mg/kg alternatif). Ketamin ise kontrollü ventilasyonda normokapni sağlandığında İKB’yi artırmaz ve CPP’yi korur!',
            status: 'CAUTION'
          },
          {
            domain: 'Cushing Hipertansiyonu & NTG / Sodyum Nitroprussid',
            recommendation:
              'Serebral vazodilatatör antihipertansiflerden (Nitrogliserin, Sodyum Nitroprussid, Hidralazin) KAÇIN; gerçek antihipertansif gereksiniminde TR’de mevcut Nikardipin (5–15 mg/sa; #tedavi=nicardipine), Labetalol veya Esmolol seç (Klevidipin TR’de ruhsatlı/mevcut değil).',
            rationaleAndCaution:
              'NTG ve SNP serebral kapasitans venlerini ve arteriyolleri genişleterek CBV ve İKB’yi fırlatırken MAP’ı düşürür → CPP’de çifte darbe! Ayrıca Cushing hipertansiyonu beyin sapı perfüzyonunu koruyan kompensatuvar yanıttır — önce İKB’yi düşür!',
            status: 'AVOID'
          },
          {
            domain: 'Kortikosteroid Paradoksu: TBH vs Beyin Tümörü',
            recommendation:
              'Travmatik Beyin Hasarı (TBH), intraserebral kanama veya iskemik inme kaynaklı sitotoksik ödemde STEROİD ASLA VERME! Yalnızca beyin tümörü/apse vazojenik ödeminde Deksametazon (#tedavi=dexamethasone) uygula.',
            rationaleAndCaution:
              '10.008 hastalı MRC CRASH randomize çalışmasında TBH’de yüksek doz metilprednizolon 14 günlük mortaliteyi anlamlı artırmıştır (RR 1,18). BTF 4th Ed. TBH’de steroidleri Sınıf I düzeyinde kontrendike kılar.',
            status: 'AVOID'
          },
          {
            domain: 'Hipotonik & Dekstrozlu Sıvılar (D5W, %0,45 NaCl, Hipo-Ozmolar RL)',
            recommendation:
              'İdame ve resüsitasyonda izotonik %0,9 NaCl (308 mOsm/L) VEYA büyük hacimli nöro-resüsitasyonda hiperkloremik metabolik asidozu önlemek için güçlü bir alternatif olan izo-ozmolar dengeli kristaloidler (Plasmalyte-A / Isofundin, ~295–304 mOsm/L) kullan; D5W, %0,45 NaCl ve hipo-ozmolar Ringer Laktat (~273 mOsm/L) sıvılarından KESİN KAÇIN.',
            rationaleAndCaution:
              'Plazma ozmolalitesindeki her 1 mOsm/kg düşüş beyin dokusuna net su geçişini tetikler! D5W, %0,45 NaCl ve hipo-ozmolar RL (~273 mOsm/L) serbest su yüküyle serebral ödemi hızla ağırlaştırır; öte yandan çok yüksek hacimli %0,9 NaCl hiperkloremik metabolik asidoz yapabileceğinden büyük hacimli nöro-resüsitasyonda Plasmalyte-A / Isofundin (~295–304 mOsm/L) ideal dengeli alternatiftir. Hiperglisemi (>180 mg/dL) ise anaerobik laktik asidozla iskemik beyin hasarını büyütür.',
            status: 'AVOID'
          }
        ]
      },
      preventionBox: {
        title: 'İntraoperatif “Tight Brain” (Dura Açılınca Beyin Şişmesi) 60 Saniyelik Kontrol Listesi',
        highlightRule:
          'Cerrah “beyin çok gergin / dışarı taşıyor” dediğinde ilk 60 saniyede önce mekanik venöz dönüşü ve PaCO₂’yi doğrula — sıklıkla tek bir kıvrılmış boyun veya yüksek EtCO₂, ozmoterapiden önce krizi saniyeler içinde çözer!',
        checks: [
          '1. Pozisyon & Venöz Drenaj: Masa başını 15–30° yükselt, boyun aşırı dönük/fleksiyonda mı kontrol et, sıkı ETT bağını/flasterini gevşet, karın basısını (prone pozisyonda!) gider.',
          '2. Oksijenasyon, PaCO₂ & Hava Yolu Basıncı: SpO₂ ≥%95 doğrula; acil AKG al, kısa süreli PaCO₂ 30–35 mmHg hedefle; Ppeak/PEEP kontrolü (tansiyon pnömotoraks, bronkospazm, tek akciğer entübasyonu dışla!).',
          '3. Anestezi Derinliği & Kas Gevşemesi: N₂O kapalı mı? Volatil >1 MAC ise kapat ve Propofol TIVA’ya geç; öksürük/ıkınmayı dışlamak için TOF = 0 olacak şekilde ek NMB + opioid bolusu ver.',
          '4. Hemodinami, Isı & Sıvı: Arter transdüserini tragus hizasında doğrula; MAP/CPP 60–70 mmHg koru, ateşi (<37,5°C) düşür, hipotonik sıvı (D5W, %0,45 NaCl veya hipo-ozmolar Ringer Laktat [~273 mOsm/L]) gidiyorsa hemen %0,9 NaCl’ye veya büyük hacimlerde hiperkloremik asidozu önleyen izo-ozmolar dengeli kristaloidlere (Plasmalyte-A / Isofundin, ~295–304 mOsm/L) çevir.',
          '5. Hızlı Ozmoterapi & BOS / Cerrahi: %20 Mannitol (0,5–1 g/kg; tek bolus tavanı 100 g [500 mL], obezitede IBW/AdjBW) veya hazır %3 HTS (2–5 mL/kg, maks 250 mL) ver; EVD/lomber dren açıklığını kontrol et ve cerrahı olası gizli (kontralateral/epidural) kanama veya derin venöz obstrüksiyon açısından uyar.'
        ]
      }
    }
  },

  // 5) Patofizyoloji
  pathophysiology: {
    molecularBasis:
      'İKB fizyolojisi dört temel eksene dayanır: (1) Monro-Kellie Doktrini: Erişkinin rijid kraniumu içindeki toplam hacim sabittir (V_beyin [%80] + V_kan [%10] + V_BOS [%10] = Sabit). Yeni bir hacim (hematom, tümör, ödem) eklendiğinde başlangıçta BOS spinal subaraknoid boşluğa ve venöz kan juguler sisteme itilerek İKB normal tutulur; ancak bu rezerv tükendiğinde elastans eğrisi dikleşir ve 1–2 mL’lik ek hacim dahi İKB’yi eksponansiyel fırlatır. (2) Serebral Otoregülasyon: Sağlıklı beyinde MAP 50–150 mmHg aralığında arteriyoler miyojenik yanıtla serebral kan akımı (CBF ~50 mL/100g/dk) sabit tutulur; kronik hipertansiyonda bu eğri sağa kayar (düşük MAP’ta iskemi!), travma/iskemi/yüksek volatilde ise otoregülasyon bozularak CBF tamamen “basınç-pasif” hale gelir. (3) PaCO₂ ve PaO₂ Reaktivitesi: PaCO₂ 20–80 mmHg aralığında her 1 mmHg artış/azalış CBF’yi ~%3–4 (~1–2 mL/100g/dk) doğrusal olarak değiştirir (ekstraselüler H⁺ aracılı; 6–24 saatte BOS HCO₃⁻ adaptasyonuyla söner). PaO₂ >60 mmHg iken CBF sabit kalır, ancak PaO₂ <50–60 mmHg altına indiğinde şiddetli serebral vazodilatasyon ile CBV ve İKB hızla patlar. (4) Anestezik Nüanslar: Volatil anestezikler CMRO₂’yi düşürse de >1 MAC’ta direkt vazodilatasyon (halotan > desfluran > izofluran > sevofluran) CBF ve İKB’yi artırır; N₂O CMRO₂/CBF’yi yükseltir; Propofol ve Tiyopental ise flow-metabolism coupling’i koruyarak CMRO₂ ve CBF’yi paralel azaltır.',
    stepsTitle: 'Monro-Kellie Dekompansasyonu, Serebral İskemi & Herniasyon Kısır Döngüsü',
    flowType: 'vicious-cycle',
    cycleWarning:
      'İKB ↑ → CPP (MAP − İKB) ↓ → Serebral İskemi → Anaerobik Metabolizma & Na⁺/K⁺-ATPaz Yetmezliği → Sitotoksik Hücresel Ödem → İntrakraniyal Hacim Daha da Artar → İKB Katlanarak Yükselir → Herniasyon & Beyin Sapı Ölümü!',
    cascadeSteps: [
      {
        phase: '1. Kompansasyon Rezervinin Tükenmesi (Monro-Kellie Eğrisi Dikleşmesi)',
        mechanism:
          'Kitle, hematom, ödem, hiperkapni veya venöz tıkanıklık nedeniyle BOS ve venöz kan yer değiştirme kapasitesi dolar; İKB dalga formunda P2 > P1 görünür ve kompliyans kritik eşiğe iner.',
        badge: 'P2 > P1 · DÜŞÜK KOMPLİYANS',
        color: 'amber'
      },
      {
        phase: '2. CPP Çöküşü & Serebral İskemi (CPP = MAP − İKB <60 mmHg)',
        mechanism:
          'İKB yükseldikçe serebral perfüzyon basıncı düşer; bozulmuş otoregülasyon zemininde bölgesel/global CBF kritik iskemik eşiğin (<20 mL/100g/dk) altına iner ve nöronal ATP üretimi çöker.',
        badge: 'CPP ↓ · İSKEMİ',
        color: 'cyan'
      },
      {
        phase: '3. Sitotoksik & Vazojenik Ödem Kısır Döngüsü (Hücresel Şişme)',
        mechanism:
          'ATP tükenmesi Na⁺/K⁺-ATPaz pompasını durdurur → hücre içi Na⁺ ve su birikimi (sitotoksik ödem) + kan-beyin bariyeri yıkımı (vazojenik ödem). Beyin hacmi daha da genişleyip İKB’yi >40–60 mmHg’ye iter.',
        badge: 'ÖDEM KISIR DÖNGÜSÜ',
        color: 'red'
      },
      {
        phase: '4. Kompartman Herniasyonu, Cushing Refleksi & Beyin Sapı Kollapsı',
        mechanism:
          'Basınç gradienti temporal unkusu tentoryumdan (CN III basısı → anizokori) veya serebellar tonsilleri foramen magnumdan (medulla basısı) iter. Beyin sapı iskemisi şiddetli sempatik deşarj (HT) ve baroreseptör refleks bradikardi (Cushing triadı) oluşturur; ardından vazomotor merkez çökerek apne ve kardiyak arrest gelişir.',
        badge: 'HERNİASYON / CUSHİNG',
        color: 'rose'
      }
    ],
    summaryText:
      'İKB krizinde amaç yalnızca rakamı düşürmek değil, CPP = MAP − İKB dengesini ve serebral oksijen sunumunu koruyarak sitotoksik ödem–iskemi kısır döngüsünü kırmaktır. Hipoksi (PaO₂ <60), hiperkapni (PaCO₂ >45), hipotansiyon (MAP <65–70) ve venöz obstrüksiyonun eşzamanlı önlenmesi tedavinin temel direğidir.'
  },

  // 6) Klinik Özellikler & Prezentasyon
  presentation: {
    earlySigns: [
      'Uyanık/preoperatif hastada şiddetli sabah baş ağrısı (öksürme/ıkınma ile artan), fışkırır tarzda bulantı-kusma, ajitasyon, letarji veya GKS’de ≥2 puan düşüş',
      'İKB monitörlü hastada 15–22 mmHg sınırında P2 > P1 dalga formu değişikliği ve kısa süreli İKB sıçramaları (aspirasyon, pozisyon değişikliği, hafif hiperkapni sırasında)',
      '6. kraniyal sinir (n. abducens) gerilmesine bağlı diplopi / dışa bakış kısıtlılığı (yalancı lokalize edici bulgu!) ve fundus muayenesinde papilödem (akut krizde henüz gelişmemiş olabilir!)',
      'Kraniyotomi öncesi veya dura açılırken cerrahın dural gerginlik artışı ve azalmış beyin pulsatilitesi bildirmesi'
    ],
    progressingSigns: [
      'İntraoperatif “Tight Brain”: Dura açıldığında beyin parankiminin kraniyotomi penceresinden dışarı protrüze olması, kortikal venlerin dolgunlaşması ve cerrahi ekartasyonun imkânsızlaşması',
      'Transtentoryal (Unkal) Herniasyon: İpsilateral CN III basısına bağlı anizokori (tek taraflı midriyazis >2 mm fark ve ışık refleksi kaybı), ptozis ve kontralateral hemiparezi (veya Kernohan çentiği ile ipsilateral hemiparezi)',
      'Cushing Triadı (Pre-Herniasyon): Progresif sistolik hipertansiyon + genişlemiş nabız basıncı + refleks bradikardi (+ spontan soluyan hastada Cheyne-Stokes/düzensiz solunum)',
      'İKB monitöründe sürekli >22–30 mmHg seyir, 50–100 mmHg’ye çıkan Lundberg A (plato) dalgaları ve düşen beyin doku oksijenasyonu (PbtO₂ <20 mmHg)'
    ],
    lateSigns: [
      'Bilateral fiks dilate pupiller (ışık refleksi tamamen kayıp), kornea/okülosefalik/öksürük beyin sapı reflekslerinin silinmesi',
      'Ağrılı uyarana dekortike (fleksör) veya deserebre (ekstansör) postür ya da tam flask yanıtsızlık (GKS 3)',
      'Tonsiller (Foramen Magnum) Herniasyon: Ani ataksik solunum / apne, derin refrakter bradikardi ve takiben ani vazomotor kollaps (şiddetli hipotansiyon)',
      'Nörojenik pulmoner ödem, nörojenik stres kardiyomiyopatisi, santral diabetes insipidus (masif poliüri + hipernatremi) ve kardiyak arrest'
    ],
    specialAlertTitle: 'Cushing Triadı Geç Bir Uyarıdır — Hipertansiyonu Körlemesine Düşürme!',
    specialAlertContent:
      'Genel anestezi altındaki hastada solunum düzensizliği ventilatör tarafından, bilinç kaybı ise anestezikler tarafından gizlenir; bu nedenle açıklanamayan ani hipertansiyon + bradikardi ikilisi veya ani tek taraflı pupil dilatasyonu mutlak herniasyon alarmı olarak kabul edilmelidir. Cushing hipertansiyonu beyin sapı perfüzyonunu kurtarmak için gelişen refleks yanıttır — altta yatan İKB’yi düşürmeden (ve özellikle NTG/SNP gibi serebral vazodilatatörlerle!) kan basıncını hızla düşürmek CPP’yi sıfırlayarak katastrofik beyin sapı enfarktına yol açar!'
  },

  // 7) Önleyici Tedbirler ve Hazırlıklı Olma
  preventionAndPreparedness: {
    preopRiskAssessment: [
      'Preoperatif Beyin BT/MRG’yi bizzat inceleyin: Orta hat şifti (≥5 mm), bazal sisternlerin silinmesi, ventriküler bası/hidrosefali, peritümöral ödem ve kitle lokalizasyonu (posterior fossa lezyonları ani tonsiller herniasyona en duyarlıdır!).',
      'Bazal GKS, pupil çapı/simetrisi, ışık refleksi, fokal nörolojik defisit ve kafa içi basınç semptomlarını indüksiyon öncesinde ayrıntılı belgeleyin (postoperatif karşılaştırma için şart!).',
      'Kronik hipertansiyon öyküsünü (otoregülasyon eğrisi sağa kaymıştır → daha yüksek MAP gerekir), antikoagülan/antiplatelet kullanımını (acil nöroşirürjide INR <1,4 ve trombosit >100.000/mm³ hedefi!), bazal serum Na⁺, glukoz ve böbrek fonksiyonlarını değerlendirin.',
      'Premedikasyonda solunum depresyonu ve hiperkapni yapabilecek ağır sedatif/opioidlerden (özellikle spontan soluyan KİBAS hastasında!) kaçının.'
    ],
    anesthesiaMachinePreparation: {
      title: 'Nöroanestezi & KİBAS Hastası İntraoperatif Hazırlık Protokolü',
      steps: [
        'İndüksiyon öncesi sürekli beat-to-beat MAP takibi için invaziv arteriyel kateter yerleştirin ve basınç transdüserini TRAGUS (Foramen of Monro) seviyesinde sıfırlayın.',
        'Propofol + Remifentanil/Fentanil TIVA infüzyon pompalarını önceden hazırlayın; N₂O hattını kapalı/devre dışı konumda doğrulayın.',
        'Pürüzsüz, öksürüksüz ve hemodinamik dalgalanmasız indüksiyon planlayın: Yeterli opioid + Lidokain 1,5 mg/kg IV + titre Propofol/Etomidat + tam NMB (TOF = 0 doğrulamadan laringoskopi yapma!); kraniyal pinleme (Mayfield) öncesi ek analjezi/propofol veya kafa derisi bloğu uygulayın.',
        'İzotonik %0,9 NaCl veya büyük hacimli nöro-resüsitasyonda hiperkloremik asidozu önleyen izo-ozmolar dengeli kristaloidler (Plasmalyte-A / Isofundin, ~295–304 mOsm/L) takın (D5W, %0,45 NaCl ve hipo-ozmolar Ringer Laktat [~273 mOsm/L] odaya alınmamalı!), ısıtıcı/soğutucu ile normotermi (36–37°C) ve iki geniş IV yol (yüksek riskte santral venöz kateter — yüksek konsantrasyonlu %20/%10 HTS ve Noradrenalin için!) sağlayın.'
      ]
    },
    cleanAnesthesiaProtocol: [
      'Tüm vaka boyunca normokapni (PaCO₂ 35–38 mmHg; AKG ile EtCO₂ korelasyonu), normoksi (SpO₂ ≥%95), normoglisemi (140–180 mg/dL), normotermi (<37,5°C) ve övolemi/izoozmolalite korunması',
      'Baş pozisyonu ve boyun venöz dönüşünün cerrahi örtüm sonrası da (özellikle lateral, park-bench ve prone pozisyonlarda!) doğrulanması; ETT’nin boynu sıkmadan flasterle sabitlenmesi',
      'Ekstübasyon planı: Öksürme, ıkınma ve hipertansiyon piklerini önlemek için kontrollü, pürüzsüz uyanma (düşük doz Remifentanil / Lidokain / Labetalol-Nikardipin hazır); ağır intraop “tight brain”, yüksek İKB veya cerrahi komplikasyonda ekstübe ETMEYİP entübe/sedatize halde Nöro-YBÜ + acil Beyin BT’ye transfer edilmesi'
    ],
    cartTitle: 'Nöroanestezi & Akut İKB Krizi Acil Hazırlık Listesi:',
    cartChecklist: [
      '%20 Mannitol (500 mL = 100 g — tek bolus tavanı!; obezitede IBW/AdjBW; kristallenme kontrolü + inline mikron filtresi!)',
      'Hazır %3 Hipertonik Salin (500 mL torba; bolus 2–5 mL/kg, maks 250 mL) & Herniasyon kurtarması için %20 / %10 NaCl ampulleri (30 mL %23,4 NaCl hazır flakon TR’de yaygın değildir → eşdeğer 35 mL %20 veya 70 mL %10 NaCl — YALNIZCA SANTRAL HAT etiketi!)',
      'Noradrenalin İnfüzyonu (CPP 60–70 mmHg desteği + dilüe push-dose) & varsa Fenilefrin (TR’de rutin stokta bulunmayan merkezlerde dilüe Noradrenalin push-dose/infüzyon kullanılır)',
      'Serebral Güvenli Antihipertansifler: Nikardipin (5–15 mg/sa), Labetalol & Esmolol [Klevidipin TR’de ruhsatlı/mevcut değil; NTG/SNP KULLANMA!]',
      'TIVA & Sempatik Baskılama: Propofol, Remifentanil/Fentanil, Lidokain (%2) & Rokuronyum',
      'Tier 3 & Ek İlaçlar: Tiyopental (500 mg / 1 g flakonlar), Levetirasetam IV, Furosemid & Deksametazon (tümör ödemi için)',
      'İnvaziv Arter Seti (Tragus seviyesi!), Santral Venöz Kateter, AKG / Serum Na⁺ / Ozmolalite Tüpleri & Sürekli EEG / BIS'
    ]
  },

  // 8) Postoperatif Takip & Prognoz
  postopManagement: {
    icuMonitoringDuration:
      'Akut İKB krizi, intraoperatif “tight brain”, herniasyon bulgusu veya dekompresif kraniyektomi yaşayan her hasta en az 24–72 saat (İKB <20–22 mmHg stabil olana dek) Nöro-Yoğun Bakım Ünitesi’nde sürekli İKB/CPP ve invaziv arteriyel basınç monitörizasyonu altında izlenmelidir.',
    recurrenceRate:
      'Serebral ödem genellikle akut travma, inme veya cerrahi sonrası 24–72. saatlerde (3–5. güne dek) pik yapar; ayrıca ozmoterapi veya hiperventilasyonun ani kesilmesi şiddetli rebound İKB yükselmesine yol açabilir.',
    recurrenceRiskBadge: 'ÖDEM PİKİ 24–72. SAAT · REBOUND İKB & Na⁺ TAKİBİ KRİTİK',
    maintenanceTherapy:
      'SIBICC de-eskalasyon prensibi: İKB <20–22 mmHg ve CPP 60–70 mmHg en az 24 saat kesintisiz sağlandıktan sonra tedaviler en yüksek riskli basamaktan başlanarak (Tier 3 barbitürat/hipotermi → Tier 2 hiperventilasyon/NMB → Tier 1 ozmoterapi/derin sedasyon) kademeli olarak azaltılır; her adımda İKB yanıtı izlenir.',
    monitoringParameters: [
      'Serum Sodyum (Na⁺ — her 4–6 saatte): Hipertonik salin tedavisinde hedef 145–155 mEq/L (üst sınır 160 mEq/L). Hipernatremi sonrası Na⁺’nın hızlı düşürülmesi rebound serebral ödem yapar; kronik hiponatremide ise hızlı yükseltme (≤6–8 mEq/L/24 sa sınırı) ODS riski taşır!',
      'Serum Ozmolalitesi (<320 mOsm/kg) & Ozmolal Gap (<20 mOsm/kg): Mannitol tekrarları öncesi mutlaka hesaplanmalıdır (Hesaplanan Osm = 2×Na⁺ + Glukoz/18 + BUN/2,8; Ölçülen − Hesaplanan >20 ise Mannitol birikimi & akut böbrek hasarı riski — DOZU DURDUR!).',
      'Saatlik Nörolojik Muayene & Pupillometri: GKS, pupil çapı/ışık refleksi (NPi), fokal motor yanıt; açıklanamayan kötüleşme veya uyanma gecikmesinde DERHAL Acil Kontrastsız Beyin BT.',
      'Sürekli İKB, CPP (tragus hizasında arteriyel sıfırlama!), EVD drenaj debisi/BOS rengi, çekirdek sıcaklığı (<37,5°C), arter kan gazı (PaCO₂ 35–38, PaO₂ >80 mmHg) ve kan glukozu (140–180 mg/dL)',
      'Sıvı Dengesi & Böbrek/Kardiyak İzlem: Övolemi korunması (negatif sıvı dengesi/hipotansiyon yasak!), saatlik idrar çıkışı (santral diabetes insipidus [>250–300 mL/sa + düşük dansite + ↑Na⁺] vs SIADH/CSW ayrımı!), serum K⁺/Mg²⁺/kreatinin ve yüksek doz Propofol’de laktat/CK/trigliserid (PRIS taraması) + sürekli EEG'
    ],
    expectedComplications: [
      'Rebound İntrakraniyal Hipertansiyon ve Sekonder Herniasyon (hasarlı kan-beyin bariyerinden Mannitol geçişi veya uzamış hiperventilasyonun ani kesilmesi sonrası)',
      'Ozmotik Nefropati / Akut Böbrek Hasarı (Mannitol birikimi, ozmolal gap >20) ve Hiperkloremik Metabolik Asidoz / Hipernatremi (HTS)',
      'Propofol İnfüzyon Sendromu (PRIS) veya Barbitürat Koması Komplikasyonları (refrakter hipotansiyon, ileus, immünsüpresyon, ventilatör ilişkili pnömoni ve beyin ölümü tanısında gecikme)',
      'Endokrin / Elektrolit Bozuklukları: Santral Diabetes İnsipidus (DI), Uygunsuz ADH Sendromu (SIADH) veya Serebral Tuz Kaybı (CSW)',
      'Nörojenik Pulmoner Ödem, Nörojenik Stres (Takotsubo) Kardiyomiyopatisi, Stres Ülseri ve Derin Ven Trombozu / Pulmoner Emboli (DVT mekanik profilaksisi erken başlanmalıdır!)'
    ],
    definitiveDiagnosticTesting: [
      {
        testName: 'Acil Kontrastsız Beyin Bilgisayarlı Tomografisi (BT)',
        description:
          'Postoperatif veya refrakter İKB artışında yeni hematom, ödem progresyonu, orta hat şifti, bazal sistern durumu ve EVD kateter pozisyonunu doğrulamak için birincil tanı aracıdır.'
      },
      {
        testName: 'Sürekli Video-EEG (cEEG) Monitörizasyonu',
        description:
          'Sedatize/paralize hastada İKB’yi artıran non-konvülsif nöbet/status epileptikusu dışlamak ve Tier 3 Tiyopental/Pentobarbital tedavisinde burst-supresyon derinliğini titre etmek için zorunludur.'
      },
      {
        testName: 'İleri Multimodal Nöromonitörizasyon (PbtO₂ / TCD / SjvO₂)',
        description:
          'Seçili merkezlerde beyin doku oksijen basıncı (hedef PbtO₂ >20 mmHg), transkraniyal Doppler (pulsatilite indeksi / vazospazm) ve serebral otoregülasyon indeksi (PRx) ile kişiselleştirilmiş CPP optimizasyonu sağlar.'
      }
    ],
    prognosisSummary:
      'Akut İKB krizinde prognozu belirleyen en önemli değiştirilebilir faktörler ikincil beyin hasarının (hipotansiyon, hipoksi, hiperkapni, ateş, hiperglisemi) sıfırlanması ve herniasyon oturmadan SIBICC Tier 0–3 algoritmasının hızla uygulanmasıdır. Dekompresif kraniyektomi (RESCUEicp) refrakter İKB’de mortaliteyi belirgin azaltmakta olup fonksiyonel sonuç hasta yaşı, altta yatan patoloji ve müdahale hızıyla doğrudan ilişkilidir.'
  },

  // 9) High-Yield Bilgiler
  highYieldPearls: [
    {
      title: 'Arteriyel Transdüseri TRAGUS (Foramen of Monro) Hizasında Sıfırla!',
      takeaway:
        '30° baş elevasyonunda arteriyel basınç transdüserini kalp (flebostatik eksen) hizasında bırakırsan, hidrostatik sütun farkı nedeniyle beyin seviyesindeki gerçek MAP ve CPP’yi ~10–15 mmHg olduğundan YÜKSEK ölçersin! KİBAS hastasında gerçek CPP = MAP − İKB ölçümü için transdüser mutlaka tragus (dış kulak yolu) hizasında sıfırlanmalıdır.',
      category: 'Tuzak'
    },
    {
      title: 'Mannitol’de Ozmolal Gap (<20 mOsm/kg) & 100 g Tavan + TR’de Hipertonik Salin Pratiği!',
      takeaway:
        'NCS 2020 kılavuzuna göre Mannitol (tek bolus tavanı 100 g [500 mL], obezitede IBW/AdjBW) birikimini ve ozmotik nefropati riskini saptamada OZMOLAL GAP (<20 mOsm/kg) tek başına serum ozmolalitesinden (<320 mOsm/kg) daha güvenilirdir. Hipotansif/hipovolemik hastada hazır %3 Hipertonik Salin (2–5 mL/kg, maks 250 mL) ilk tercihtir; hazır 30 mL %23,4 NaCl flakonları TR’de yaygın olmadığından herniasyon kurtarmasında santral hattan eşdeğer 35 mL %20 NaCl veya 70 mL %10 NaCl (~7 g NaCl / 120 mEq Na⁺) verilir (ASLA periferik venden verilmez)!',
      category: 'Kritik Doz'
    },
    {
      title: 'Steroid Paradoksu: Beyin Tümöründe Hayat Kurtarır, TBH’de ÖLDÜRÜR (MRC CRASH)!',
      takeaway:
        'Deksametazon beyin tümörü ve apse çevresindeki vazojenik ödemde çok etkilidir; ancak Travmatik Beyin Hasarında (TBH) yüksek doz steroid 14 günlük mortaliteyi artırdığı için (MRC CRASH, n=10.008) KESİNLİKLE KONTRENDİKEDİR (BTF Sınıf I)!',
      category: 'Sınav / Klinik Notu'
    },
    {
      title: 'Hiperventilasyon Yalnızca Kısa Süreli Köprüdür — Profilaktik PaCO₂ <25–30 YASAK!',
      takeaway:
        'PaCO₂’deki her 1 mmHg düşüş CBF’yi ~%3–4 azaltarak İKB’yi dakikalar içinde düşürür; ancak uzamış/agresif hiperventilasyon (<25–30 mmHg) serebral vazokonstriksiyon ile İSKEMİ yapar. Dahası BOS bikarbonatı 6–24 saat içinde adapte olur ve normokapniye hızla dönülürse şiddetli rebound vazodilatasyon/İKB patlaması gelişir!',
      category: 'Tuzak'
    },
    {
      title: 'Cushing Hipertansiyonunu Körlemesine Düşürme & NTG / SNP Yasağı!',
      takeaway:
        'Hipertansiyon + bradikardi (Cushing refleksi) beyin sapı iskemisine karşı CPP’yi koruma mekanizmasıdır; önce İKB’yi düşür! Antihipertansif gerçekten gerekiyorsa TR’de mevcut Nikardipin (5–15 mg/sa), Labetalol veya Esmolol seç (Klevidipin TR’de ruhsatlı/mevcut değil); serebral vazodilatasyon yaparak İKB’yi artıran Nitrogliserin ve Sodyum Nitroprussid’den kaçın!',
      category: 'Ezber Bozan'
    },
    {
      title: 'Süksinilkolin & Ketamin Ezberini Boz: Hipoksi ve Hiperkapni Çok Daha Yıkıcıdır!',
      takeaway:
        'Klasik dogmanın aksine modern nöroanestezi kanıtları kontrollü ventilasyon altında Ketaminin İKB’yi klinik olarak anlamlı artırmadığını (hatta hipotansif hastada CPP’yi koruduğunu) ve acil RSI’de Süksinilkolinin geçici minimal etkisinin, entübasyon gecikmesiyle gelişecek hipoksi/hiperkapni/öksürük felaketinden katbekat güvenli olduğunu göstermiştir.',
      category: 'Ezber Bozan'
    }
  ],

  // 10) Kaynaklar ve İleri Okuma
  references: [
    {
      authors: 'Carney N, Totten AM, O’Reilly C, Ullman JS, Hawryluk GWJ, Bell MJ, et al.',
      title: 'Guidelines for the Management of Severe Traumatic Brain Injury, Fourth Edition.',
      journal: 'Neurosurgery. 2017;80(1):6–15.',
      year: '2017',
      relevance:
        'Brain Trauma Foundation (BTF) 4. Baskı kılavuzu: İKB tedavi eşiği (>22 mmHg), CPP hedefi (60–70 mmHg), profilaktik hiperventilasyon/hipotermi/steroid yasağı ve barbitürat/dekompresif kraniyektomi kanıtları.'
    },
    {
      authors: 'Hawryluk GWJ, Aguilera S, Buki A, Bulger E, Citerio G, Cooper DJ, et al.',
      title:
        'A management algorithm for patients with intracranial pressure monitoring: the Seattle International Severe Traumatic Brain Injury Consensus Conference (SIBICC).',
      journal: 'Intensive Care Medicine. 2019;45(12):1783–1794.',
      year: '2019',
      relevance:
        'İKB monitörlü hastalarda uluslararası standart Tier 0–3 basamaklı eskalasyon, MAP challenge (otoregülasyon testi) ve de-eskalasyon konsensüs algoritması.'
    },
    {
      authors: 'Cook AM, Morgan Jones G, Hawryluk GWJ, Mailloux P, McLaughlin D, Papangelou A, et al.',
      title: 'Guidelines for the Acute Treatment of Cerebral Edema in Neurocritical Care Patients.',
      journal: 'Neurocritical Care. 2020;32(3):647–666.',
      year: '2020',
      relevance:
        'Neurocritical Care Society (NCS) Hiperozmolar Tedavi Kılavuzu: Mannitol vs %3/%23,4 Hipertonik Salin seçimi, ozmolal gap (<20 mOsm/kg) takibi ve serum Na⁺ hedefleri.'
    },
    {
      authors: 'Roberts I, Yates D, Sandercock P, Farrell B, Wasserberg J, Lomas G, et al.; CRASH Trial Collaborators.',
      title:
        'Effect of intravenous corticosteroids on death within 14 days in 10,008 adults with clinically significant head injury (MRC CRASH trial): randomised placebo-controlled trial.',
      journal: 'The Lancet. 2004;364(9442):1321–1328.',
      year: '2004',
      relevance:
        'Travmatik beyin hasarında yüksek doz kortikosteroidlerin mortaliteyi artırdığını kanıtlayan dönüm noktası randomize çalışma.'
    },
    {
      authors: 'Hutchinson PJ, Kolias AG, Timofeev IS, Corteen EA, Czosnyka M, Timothy J, et al.; RESCUEicp Trial Collaborators.',
      title: 'Trial of Decompressive Craniectomy for Traumatic Intracranial Hypertension.',
      journal: 'New England Journal of Medicine. 2016;375(12):1119–1130.',
      year: '2016',
      relevance:
        'Medikal tedaviye refrakter İKB’de sekonder dekompresif kraniyektominin mortalite ve nörolojik sağkalım üzerindeki etkilerini ortaya koyan randomize çalışma.'
    },
    {
      authors: 'Gropper MA, Eriksson LI, Fleisher LA, Wiener-Kronish JP, Cohen NH, Leslie K (Eds.).',
      title: "Miller's Anesthesia, 10th Edition — Neurophysiology & Anesthesia for Neurologic Surgery.",
      journal: 'Elsevier; 2024.',
      year: '2024',
      relevance:
        'Monro-Kellie fizyolojisi, serebral otoregülasyon, PaCO₂/PaO₂ reaktivitesi, volatil vs TIVA nörofarmakolojisi ve intraoperatif “tight brain” yönetimi temel referansı.'
    }
  ],
  relatedLinks: [
    { label: 'Tiyopental (Tier 3 Barbitürat Koması)', href: '#tedavi=thiopental', badge: 'İlaç Kartı' },
    { label: 'Noradrenalin (CPP 60–70 mmHg Desteği)', href: '#tedavi=norepinephrine', badge: 'İlaç Kartı' },
    { label: 'Nikardipin (Serebral Güvenli HT Kontrolü)', href: '#tedavi=nicardipine', badge: 'İlaç Kartı' },
    { label: 'Propofol (Nörokoruyucu TIVA)', href: '#tedavi=propofol', badge: 'İlaç Kartı' },
    { label: 'Lidokain (Laringoskopi / İKB Yanıtı Baskılama)', href: '#tedavi=lidocaine', badge: 'İlaç Kartı' },
    { label: 'Furosemid (Seçili Diürez / Ozmoterapi Sinerjisi)', href: '#tedavi=furosemide', badge: 'İlaç Kartı' },
    { label: 'Deksametazon (Yalnızca Tümör Vazojenik Ödemi!)', href: '#tedavi=dexamethasone', badge: 'İlaç Kartı' },
    { label: 'Sodyum Bozuklukları & Hipertonik Salin (Na⁺)', href: '#tedavi=sodium', badge: 'Elektrolit' },
    { label: 'İntraoperatif Hipertansiyon & Cushing Krizi', href: '#arac=emergencies&sub=hypertension', badge: 'Ayırıcı Tanı' },
    { label: 'Gecikmiş Uyanma (Acil Beyin BT Algoritması)', href: '#arac=emergencies&sub=emergence-delay', badge: 'Postop BT' }
  ]
};

export const NEURO_EMERGENCIES_DATA: Record<string, EmergencyProtocol> = {
  'icp-crisis': ICP_CRISIS_PROTOCOL
};
