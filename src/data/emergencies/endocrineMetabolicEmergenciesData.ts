import type { EmergencyProtocol } from '../emergenciesData';

export const ENDOCRINE_METABOLIC_EMERGENCIES_DATA: Record<string, EmergencyProtocol> = {
  'intraop-hypoglycemia': {
    id: 'intraop-hypoglycemia',
    // 1) Başlık
    title: 'İntraoperatif Hipoglisemi Kriz Protokolü (Akut Nöroglikopeni)',
    subTitle: 'Maskelenmiş Nöroglikopeni · Erişkin & Pediatrik ("Rule of 50") Acil Dekstroz Resüsitasyonu',
    codeColor: 'amber',
    severityBadge: 'KOD SARI / KIRMIZI · GENEL ANESTEZİ TÜM UYARI BULGULARINI MASKELER',
    keyCallout: 'Genel anestezi hipogliseminin TÜM otonom (terleme, tremor, çarpıntı) ve nöroglikopenik (konfüzyon, koma) erken uyarı bulgularını MASKELER! Kan şekeri <70 mg/dL (Seviye 1) uyarı, <54 mg/dL (Seviye 2) ACİL NÖROGLİKOPENİ RİSKİDİR. Erişkinde periferik ven dostu %10 Dekstroz 100–250 mL (10–25 g) IV veya Türkiye ameliyathanelerinde yaygın %20 Dekstroz 60–125 mL / %30 Dekstroz 40–80 mL (geniş/santral venden yavaş; uluslararası/ABD referansı %50 Dekstroz 25–50 mL TR’de nadirdir); ÇOCUK (>5 kg ve <40 kg) "Rule of 50" %10 Dekstroz 2–5 mL/kg (0,2–0,5 g/kg, maks 25 g), YENİDOĞAN (≤5 kg) katı 2 mL/kg %10 Dekstroz (0,2 g/kg — 5 mL/kg VERME: rebound hiperinsülinemi ve ozmolar dalgalanma riski; konsantre %50/%30/%20 DEKSTROZ KESİNLİKLE YASAK!). Alkolizm/malnütrisyonda dekstrozdan ÖNCE/EŞZAMANLI Tiamin 100–500 mg IV ver; 15 dk sonra KŞ kontrol et!',
    quickCalculatorType: 'intraop-hypoglycemia',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'İntraoperatif hipoglisemi; genel anestezi, nöroaksiyel blok veya derin sedasyon altındaki hastada plazma glukozunun 70 mg/dL (3,9 mmol/L) altına düşmesi (ADA Seviye 1), klinik olarak anlamlı düzey olan <54 mg/dL (3,0 mmol/L) sınırına inmesi (ADA Seviye 2) veya akut nöroglikopeni/bilinç kaybına (Seviye 3) yol açmasıyla karakterize, fark edilmediğinde geri dönüşsüz serebral nöronal hasar, aritmi ve ölüme neden olan metabolik anestezi acilidir.',
      epidemiology: 'Perioperatif sıkı glisemik kontrol uygulanan diyabetik ve kritik hastalarda hipoglisemi sıklığı %5–15’e kadar çıkmaktadır. Dönüm noktası niteliğindeki NICE-SUGAR çalışması (Finfer et al., NEJM 2009), sıkı glukoz hedefinin (81–108 mg/dL) konvansiyonel hedefe (<180 mg/dL) kıyasla ağır hipoglisemi riskini 13 kat artırdığını (%6,8 vs %0,5) ve 90 günlük mortaliteyi yükselttiğini kanıtlamıştır. Pediatrik ve yenidoğan cerrahisinde uzamış preoperatif açlık (özellikle sabah geç saatlere sarkan olgularda) ve düşük hepatik glikojen rezervleri en sık tetikleyicidir.',
      triggers: [
        'Tip 1 Diyabet, Yüksek Doz Bazal/Bolus İnsülin, İntraoperatif İnsülin İnfüzyonu veya Kapatılmamış/Kontrolsüz İnsülin Pompası',
        'Uzun Yarı Ömürlü Sülfonilüreler (Glibenklamid/Glibürid, Glimepirid, Gliklazid) — Özellikle Böbrek Yetmezliğinde 24–72 Saat Süren Tekrarlayan Hipoglisemi!',
        'Yenidoğan, Preterm ve Küçük Çocuklarda Uzamış Preoperatif Açlık + Dekstrozsuz İntraoperatif Sıvı Yönetimi (Düşük Glikojen Rezervi)',
        'Karaciğer Yetmezliği, Siroz, Masif Hepatektomi ve Karaciğer Nakli (Anhepatik Fazda Glukoneogenez ve Glikojenolizin Tam Kaybı)',
        'Ağır Sepsis, Son Dönem Böbrek Yetmezliği (İnsülin Klirensinde Belirgin Azalma), Adrenal Yetmezlik, İnsülinoma ve Feokromositoma Rezeksiyonu Sonrası Rebound İnsülin Salınımı',
        'β-Bloker Kullanımı (Otonom Taşikardi ve Tremor Yanıtını Maskeler; Non-Selektif β-Blokerler Glikojenolizi de Bozar!) ve Kronik Alkolizm / Malnütrisyon (Glikojen Tükenmesi + Wernicke Ensefalopatisi Riski!)'
      ],
      safeAgents: [
        'Erişkin Kurtarma (TR Stoklarına Uygun): Periferik ven dostu %10 Dekstroz 100–250 mL IV (10–25 g glukoz; düşük ozmolarite ile flebit/ekstravazasyon nekrozu riskini minimize eder) VEYA Türkiye ameliyathanelerinde yaygın %20 Dekstroz 60–125 mL (12–25 g) / %30 Dekstroz 40–80 mL (12–24 g) geniş/santral venden yavaş (uluslararası/ABD referansı: %50 Dekstroz 25–50 mL — TR’de nadirdir)',
        'Pediatrik & Yenidoğan Kurtarma ("Rule of 50"): Çocuk (>5 kg ve <40 kg) %10 Dekstroz 2–5 mL/kg (0,2–0,5 g/kg, maks 25 g); Yenidoğan (≤5 kg) katı 2 mL/kg %10 Dekstroz (0,2 g/kg — 5 mL/kg VERME: rebound hiperinsülinemi ve ozmolar dalgalanma riski!) → takiben 4–8 mg/kg/dk glukoz infüzyonu (GIR)',
        'Wernicke Koruması: Alkolizm, malnütrisyon, bariatrik cerrahi öyküsü veya uzamış açlıkta Dekstrozdan ÖNCE veya EŞZAMANLI Tiamin (Vitamin B1) 100–500 mg IV (asla dekstrozu geciktirme, aynı anda ver!)',
        'Damar Yolu Yoksa: Glukagon 1 mg IM/SC (çocuk <20 kg için 0,5 mg) — Not: Karaciğer glikojen depoları boş olan karaciğer yetmezliği ve kronik alkolizmde ETKİSİZDİR!',
        'Sülfonilüre Kaynaklı Refrakter/Tekrarlayan Hipoglisemide: Oktreotid 50–100 mcg SC/IV her 6–8 saatte bir (pankreatik β-hücresinden insülin salınımını doğrudan baskılar)',
        'KESİN KAÇINILACAKLAR: Çocuk ve yenidoğanda %50 (veya seyreltilmemiş %20/%30) konsantre Dekstroz bolusu (hiperozmotik venöz nekroz & intraventriküler hemoraji riski!), yenidoğanda (≤5 kg) 5 mL/kg bolus (rebound hiperinsülinemi/ozmolar dalgalanma!), NICE-SUGAR kanıtına aykırı sıkı <81–110 mg/dL intraoperatif hedef ve tek bolus sonrası KŞ takibini kesmek'
      ],
      mortalityStats: 'Ağır intraoperatif hipoglisemi (<40–54 mg/dL) fark edilmeden 30–60 dakika sürdüğünde kortikal nöronal nekroz, kalıcı kognitif bozukluk, inatçı nöbetler, malign ventriküler aritmi (QT uzaması → Torsades de Pointes) ve ölüm gelişir. NICE-SUGAR’da ağır hipoglisemi gelişen hastalarda mortalite belirgin yükselmiştir.',
      clinicalUrgency: 'Genel anestezi altındaki hasta "kendimi kötü hissediyorum, terliyorum, titriyorum" DİYEMEZ! Yüksek riskli her hastada 1–2 saatte bir (insülin infüzyonunda 30–60 dk’da bir) kan gazı/glukometre ölçümü yapılmadıkça tanı yalnızca gecikmiş uyanma veya nöbetle — çok geç olarak — konur.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'İntraoperatif hipogliseminin tek güvenilir tanı aracı proaktif laboratuvar/kan gazı veya yatak başı kapiller/arteriyel glukoz ölçümüdür (POCT). Genel anestezi otonom ve nöroglikopenik bulguların tamamını maskelediği için klinik belirtilere güvenilmez. Not: Derin hipotansiyon, vazopressör kullanımı veya periferik vazokonstriksiyon altında parmak ucu kapiller glukometre hatalı sonuç verebilir — mümkünse arteriyel/venöz kan gazı cihazı ile doğrulanmalıdır (doğrulama beklenirken şüphede tedavi GECİKTİRİLMEZ!).',
      clinicalCriteria: [
        'ADA 2024/2025 Seviye 1 (Uyarı Eşiği): Kan şekeri <70 mg/dL (3,9 mmol/L) — derhal müdahale ve insülinin durdurulması gerekir',
        'ADA 2024/2025 Seviye 2 (Klinik Anlamlı Hipoglisemi): Kan şekeri <54 mg/dL (3,0 mmol/L) — akut nöroglikopeni ve aritmi eşiği; ACİL IV DEKSTROZ!',
        'ADA 2024/2025 Seviye 3 (Ağır Hipoglisemi): Ciddi bilişsel bozukluk, koma, nöbet veya uyanamama ile seyreden ağır nöroglikopeni (anestezi altında sıklıkla gecikmiş uyanma olarak ortaya çıkar)',
        'Genel Anestezi Altında Silik/Atipik İpuçları: Açıklanamayan ani terleme (anestezi hafifliği sanılabilir!), taşikardi/hipertansiyon veya tam tersi β-blokerli hastada refrakter bradikardi/hipotansiyon, BIS değerinde açıklanamayan ani düşüş (<20–30 / burst suppression)',
        'EKG Değişiklikleri: QTc uzaması, T dalga düzleşmesi/inversiyonu, ST depresyonu ve katekolamin/hipokalemi kaynaklı ventriküler ektopi',
        'Uyanma (Derlenme) Fazında: Anestezikler sonlandırılmasına rağmen uyanmama (gecikmiş uyanma), ajitasyon, fokal nörolojik defisit (inme taklidi!) veya jeneralize nöbet'
      ],
      gradingScaleTitle: 'ADA 2024/2025 Hipoglisemi Şiddet Sınıflaması & Perioperatif Glisemik Hedefler',
      gradingScaleSource: 'American Diabetes Association (ADA) Standards of Care 2024/2025 & NICE-SUGAR (NEJM 2009)',
      larachScale: [
        { category: 'Perioperatif Güvenli Hedef Aralık', points: '100–180 mg/dL', description: 'ADA & CPOC perioperatif hedef (5,6–10,0 mmol/L). NICE-SUGAR kanıtı: Sıkı <81–110 mg/dL hedefi hipoglisemiyi ve mortaliteyi artırır!' },
        { category: 'Seviye 1 — Hipoglisemi Uyarısı', points: '54–69 mg/dL', description: 'Klinik alarm eşiği (<70 mg/dL / 3,9 mmol/L). İnsülin infüzyonunu durdur, derhal dekstroz ver ve 15 dk sonra ölç.' },
        { category: 'Seviye 2 — Klinik Anlamlı Hipoglisemi', points: '<54 mg/dL', description: 'Ciddi nöroglikopeni ve malign aritmi (<3,0 mmol/L). Acil IV Dekstroz (erişkin 10–25 g [%10/%20/%30 D]; çocuk >5 kg & <40 kg %10 D 2–5 mL/kg maks 25 g; yenidoğan ≤5 kg katı 2 mL/kg %10 D) + idame infüzyon!' },
        { category: 'Seviye 3 — Ağır Nöroglikopenik Kriz', points: 'Koma / Nöbet', description: 'Derin koma, gecikmiş uyanma, nöbet, fokal inme benzeri defisit veya arrest riski. Yüksek öncelikli IV Dekstroz + Tiamin + hava yolu koruması.' }
      ],
      larachInterpretation: 'Perioperatif dönemde hedef 100–180 mg/dL’dir. <70 mg/dL saptandığı anda insülin kapatılıp tedaviye başlanmalı; <54 mg/dL ise acil nöroglikopeni krizi kabul edilip saniyeler içinde IV Dekstroz uygulanmalıdır.',
      differentialDiagnosis: [
        {
          condition: 'Yüzeyel Anestezi / Ağrı / Sempatik Aktivasyon',
          differentiatingFactors: 'Terleme, taşikardi ve hipertansiyon hem hipogliseminin otonom yanıtında hem de yüzeyel anestezide görülür! MAC/BIS normalken açıklanamayan terleme/taşikardide opioid artırmadan ÖNCE mutlaka kan şekeri bakılmalıdır.'
        },
        {
          condition: 'Rezidüel Anestezik / Opioid / Nöromüsküler Blok (Gecikmiş Uyanma)',
          differentiatingFactors: 'Uyanmayan her hastada "ilaç etkisi geçmedi" demeden önce ilk 1 dakikada yatak başı kan şekeri ölçülmelidir; hipoglisemi en hızlı düzeltilebilir ve en tehlikeli gecikmiş uyanma nedenidir.'
        },
        {
          condition: 'Perioperatif İskemik/Hemorajik İnme veya Nöbet',
          differentiatingFactors: 'Ağır hipoglisemi hemiparezi, afazi ve fokal/jeneralize nöbetlerle akut inmeyi birebir taklit edebilir; IV dekstroz sonrası dakikalar içinde dramatik nörolojik düzelme görülür.'
        },
        {
          condition: 'Adrenal Kriz veya Miksödem Koması',
          differentiatingFactors: 'Her iki endokrin acil de refrakter hipotansiyon + hiponatremi + HİPOGLİSEMİ ile seyreder! Dekstroza rağmen tekrarlayan hipoglisemi + vazopressöre dirençli şokta IV Hidrokortizon 100 mg düşünülmelidir.'
        },
        {
          condition: 'Hatalı Kapiller Glukometre Ölçümü (Psödohipoglisemi)',
          differentiatingFactors: 'Ağır vazokonstriksiyon, şok, Raynaud veya periferik ödemde parmak ucu glukometre yapay düşük okuyabilir; ancak arteriyel kan gazı doğrulaması beklenirken semptomatik/kritik düşük değer mutlaka tedavi edilmelidir.'
        }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'ACİL METABOLİK KRİZ · İnsülin infüzyonunu/pompasını DERHAL durdur, erişkinde %10 Dekstroz 100–250 mL veya %20 (60–125 mL) / %30 (40–80 mL) Dekstroz (10–25 g); çocukta (>5 kg, <40 kg) %10 D 2–5 mL/kg (maks 25 g), yenidoğanda (≤5 kg) katı 2 mL/kg %10 D uygula, 15 dk sonra kan şekerini doğrula!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'TÜM İNSÜLİN KAYNAKLARINI DERHAL DURDUR & KAN ŞEKERİNİ DOĞRULA',
          action: 'Devam eden tüm IV insülin infüzyonlarını ve hastanın cilt altı insülin pompasını derhal durdurun/bağlantısını kesin. Kapiller glukometre <70 mg/dL ise eşzamanlı arteriyel/venöz kan gazı örneği gönderin — ancak laboratuvar sonucunu BEKLEMEDEN tedaviye başlayın!',
          criticalNote: 'İnsülin infüzyonu taşıyıcı hattın ölü boşluğunda kalmış olabilir; aynı hattan hızlı flush yapmayın, insülin hattını kapatıp ayırın!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'WERNİCKE RİSKİ VARSA TİAMİN 100–500 mg IV (DEKSTROZDAN ÖNCE / EŞZAMANLI)',
          action: 'Kronik alkolizm, malnütrisyon, bariatrik cerrahi öyküsü, hiperemezis, kanser kaşeksisi veya uzamış açlık öyküsü varsa akut Wernicke ensefalopatisini tetiklememek için Tiamin (Vitamin B1) 100–500 mg IV uygulayın.',
          criticalNote: 'ALTIN KURAL: Tiamin hazırsa dekstrozdan hemen önce veya aynı anda verilir; ancak Tiamin ararken ağır hipoglisemili hastada (<54 mg/dL) IV dekstroz ASLA geciktirilmez!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'ACİL İV DEKSTROZ UYGULA (TR %10/%20/%30 STOKLARI & PEDİATRİK "RULE OF 50")',
          action: 'Erişkinde: Periferik damar yolundan %10 Dekstroz 100–250 mL (10–25 g) hızlı infüzyon (periferik ven dostu, ekstravazasyon nekrozu riski düşük!) VEYA Türkiye ameliyathanelerinde yaygın bulunan %20 Dekstroz 60–125 mL (12–25 g) / %30 Dekstroz 40–80 mL (12–24 g) geniş/santral venden yavaş IV bolus verin (uluslararası/ABD referansı: %50 Dekstroz 25–50 mL — TR’de nadirdir). Pediatrik "Rule of 50": Çocuk (>5 kg ve <40 kg) %10 Dekstroz 2–5 mL/kg (0,2–0,5 g/kg, maks 25 g); Yenidoğan (≤5 kg) katı 2 mL/kg %10 Dekstroz (0,2 g/kg — 5 mL/kg VERME: rebound hiperinsülinemi ve ozmolar dalgalanma riski!) yavaş IV (2–3 dk) uygulayın!',
          criticalNote: 'PEDİATRİK KIRMIZI ÇİZGİ: Çocuk ve yenidoğanda konsantre %50 Dekstroz (~2525 mOsm/L; TR’de nadir) ve seyreltilmemiş %20/%30 Dekstroz bolusu HİPEROZMOTİK VENÖZ NEKROZ ve prematüre/yenidoğanda İNTRAVENTRİKÜLER HEMORAJİ (İVH) riski nedeniyle KESİNLİKLE YASAKTIR! Yenidoğanda (≤5 kg) %10 Dekstroz dahi katı 2 mL/kg ile sınırlıdır (5 mL/kg verilmez!).',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'IV DAMAR YOLU YOKSA KURTARMA: GLUKAGON IM / SC',
          action: 'Derlenme odasında veya indüksiyon öncesi IV damar yolu yoksa/çıktıysa derhal Glukagon 1 mg IM veya SC (çocuk <20 kg için 0,5 mg) uygulayın ve eşzamanlı yeni IV yol açın.',
          criticalNote: 'TUZAK: Glukagon hepatik glikojenoliz üzerinden çalışır; glikojen depoları tükenmiş karaciğer yetmezliği, kronik alkolizm, ağır malnütrisyon ve yenidoğan açlığında ETKİSİZDİR — bu hastalarda mutlak çözüm IV/IO Dekstrozdur!',
          priority: 'HIGH'
        },
        {
          stepNumber: 5,
          title: '15 DAKİKA SONRA KAN ŞEKERİ KONTROLÜ & İDAME DEKSTROZ İNFÜZYONU',
          action: 'Bolustan 15 dakika sonra kan şekerini yeniden ölçün. Hâlâ <70–100 mg/dL ise IV dekstroz bolusunu tekrarlayın. Rebound düşüşü önlemek için özellikle uzun etkili insülin, sülfonilüre, karaciğer yetmezliği ve pediatrik olgularda %5 veya %10 Dekstroz idame infüzyonu (erişkinde 50–100 mL/sa; yenidoğan/çocukta 4–8 mg/kg/dk GIR) başlatın.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'SÜLFONİLÜRE AŞIRI DOZU / TEKRARLAYAN HİPOGLİSEMİDE OKTREOTİD',
          action: 'Uzun etkili sülfonilüre (glibenklamid, glimepirid vb.) maruziyeti veya dekstroz boluslarına rağmen tekrarlayan hiperinsülinemik hipoglisemi varsa Oktreotid 50–100 mcg SC (veya IV) her 6–8 saatte bir uygulayın; tek başına dekstroz bolusları β-hücresinden daha fazla insülin salınımını tetikleyerek kısır döngü yaratır!',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'ALTTA YATAN NEDENİ & EŞLİK EDEN ELEKTROLİT/ENDOKRİN KRİZİ TARA',
          action: 'Potasyumu kontrol edin (insülin + dekstroz/katekolamin dalgalanması hipokalemi ve QTc uzaması yapabilir). Açıklanamayan dirençli hipoglisemide adrenal yetmezlik, sepsis, karaciğer yetmezliği, feokromositoma rezeksiyonu sonrası dönem veya ilaç hatası (yanlış enjektörle insülin!) açısından araştırın.',
          priority: 'MEDIUM'
        },
        {
          stepNumber: 8,
          title: 'CERRAHİ EKİBİ BİLGİLENDİR, HEDEF 100–180 mg/dL & SERİ TAKİP',
          action: 'Kan şekerini 100–180 mg/dL (5,6–10,0 mmol/L) bandında tutun; aşırı düzeltme (>250–300 mg/dL hiperglisemi ve osmotik diürez) yapmayın. İlk 2 saatte 15–30 dk arayla, stabilleşince saatlik KŞ takibi planlayarak PACU/YBÜ devri yapın.',
          priority: 'MEDIUM'
        }
      ],
      structuredCrisisBlocks: {
        tieredLadder: {
          title: 'İntraoperatif Hipoglisemi Şiddet & Müdahale Merdiveni (ADA 2024/2025)',
          accent: 'amber',
          levels: [
            {
              badge: 'Seviye 1 (54–69 mg/dL)',
              target: 'Erken Uyarı Eşiği (<70 mg/dL)',
              presentation: 'Genel anestezide tamamen sessiz olabilir; nadiren açıklanamayan terleme veya hafif taşikardi (β-blokerde yok!).',
              intervention: 'İnsülini durdur, erişkinde 10–12,5 g IV Dekstroz (%10 D 100–125 mL veya geniş venden %20 D 60 mL / %30 D 40 mL; uluslararası %50 D 25 mL TR’de nadir), çocukta (>5 kg) ve yenidoğanda (≤5 kg) %10 D 2 mL/kg; 15 dk sonra KŞ kontrolü.',
              severity: 'WARNING'
            },
            {
              badge: 'Seviye 2 (<54 mg/dL)',
              target: 'Klinik Anlamlı Nöroglikopeni (<3,0 mmol/L)',
              presentation: 'Anestezi altında derinleşen BIS düşüşü, QTc uzaması, aritmi, vazopressör gereksinimi; uyanık/rejiyonalde konfüzyon.',
              intervention: 'ACİL erişkinde %10 Dekstroz 200–250 mL veya geniş/santral venden %20 D 100–125 mL / %30 D 60–80 mL (20–25 g; uluslararası %50 D 50 mL TR’de nadir) IV; çocukta (>5 kg ve <40 kg) %10 D 2–5 mL/kg (maks 25 g), yenidoğanda (≤5 kg) katı 2 mL/kg %10 D (+ riskli grupta Tiamin 100–500 mg IV) + idame Dekstroz infüzyonu!',
              severity: 'HIGH'
            },
            {
              badge: 'Seviye 3 (Ağır Nöroglikopeni)',
              target: 'Koma / Nöbet / Gecikmiş Uyanma / Arrest Riski',
              presentation: 'Uyanmama, fokal nörolojik defisit (inme taklidi), jeneralize nöbet, bradikardi/ventriküler aritmi veya kardiyak arrest.',
              intervention: 'Derhal hava yolu koruması + erişkinde %10 D 200–250 mL veya %20 (100–125 mL) / %30 (60–80 mL) IV Dekstroz (20–25 g; uluslararası %50 D 50 mL TR’de nadir); çocukta (>5 kg, <40 kg) %10 D 2–5 mL/kg (maks 25 g), yenidoğanda (≤5 kg) katı 2 mL/kg %10 D + Tiamin 500 mg IV + 15 dk seri KŞ + sürekli %10 D infüzyonu + YBÜ!',
              severity: 'CRITICAL'
            }
          ]
        },
        comparisonTable: {
          title: 'Erişkin (TR Stokları), Pediatrik ve Yenidoğan Acil Dekstroz Protokolü ("Rule of 50")',
          columns: ['Hasta Grubu', 'Tercih Edilen Solüsyon', 'Acil Bolus Dozu', 'İdame İnfüzyon', 'Kritik Güvenlik Kuralı'],
          rows: [
            {
              col1: 'Erişkin (Periferik IV)',
              col2: '%10 Dekstroz (1. tercih — periferik ven dostu)',
              col3: '100–250 mL %10 D (= 10–25 g) hızlı IV',
              col4: '%5–10 D 50–100 mL/sa (hedef 100–180 mg/dL)',
              col5: 'Periferik ven dostudur (505 mOsm/L); ekstravazasyon ve doku nekrozu riskini belirgin azaltır'
            },
            {
              col1: 'Erişkin (Santral / Geniş IV — TR Stokları)',
              col2: '%20 veya %30 Dekstroz (TR’de yaygın; %50 D TR’de nadir)',
              col3: '60–125 mL %20 D (12–25 g) veya 40–80 mL %30 D (12–24 g) yavaş IV [uluslararası: 25–50 mL %50 D]',
              col4: '%5–10 D 50–100 mL/sa + 15 dk KŞ kontrolü',
              col5: 'İnce periferik venden puşeleme — yüksek ozmolarite nedeniyle damar dışına kaçarsa ağır cilt nekrozu yapar!'
            },
            {
              col1: 'Çocuk (>5 kg ve <40 kg — Rule of 50)',
              col2: '%10 Dekstroz (10 × 5 = 50 kuralı!)',
              col3: '2–5 mL/kg %10 D (= 0,2–0,5 g/kg; maks 25 g) IV',
              col4: '4–6 mg/kg/dk GIR (%5–10 D dengeli sıvı)',
              col5: '%50 (ve seyreltilmemiş %20/%30) Dekstroz KESİNLİKLE YASAK! Maks tek bolus 25 g’ı aşmamalıdır'
            },
            {
              col1: 'Yenidoğan / Preterm (≤5 kg)',
              col2: '%10 Dekstroz (STANDART — KATI 2 mL/kg)',
              col3: 'Katı 2 mL/kg %10 D (= 0,2 g/kg) yavaş IV (2–3 dk) — 5 mL/kg VERME!',
              col4: '6–8 mg/kg/dk GIR (pretermde 4–6 mg/kg/dk)',
              col5: '5 mL/kg VERME (rebound hiperinsülinemi & ozmolar dalgalanma riski!); %20/%30/%50 Dekstroz YASAK — İVH ve venöz nekroz yapar!'
            },
            {
              col1: 'Sülfonilüre Aşırı Dozu',
              col2: 'IV Dekstroz + Oktreotid',
              col3: '10–25 g IV D (%10/%20/%30 D) + Oktreotid 50–100 mcg SC/IV',
              col4: 'Oktreotid 6–8 sa’da bir + 24 sa gözlem',
              col5: 'Sadece dekstroz bolusları rebound insülin deşarjıyla tekrarlayan hipoglisemi yapar!'
            }
          ]
        },
        drugPolicyCards: {
          title: 'İntraoperatif Hipoglisemide Kritik İlaç & Sıvı Politikaları',
          items: [
            {
              domain: 'Periferik Vende %10 Dekstroz & TR %20/%30 Stokları',
              recommendation: 'Erişkinde periferik damar yolundan %10 Dekstroz 100–250 mL (10–25 g) tercih et; geniş/santral venden Türkiye’de yaygın %20 (60–125 mL) veya %30 (40–80 mL) Dekstroz yavaş ver (%50 Dekstroz TR’de nadirdir).',
              rationaleAndCaution: '%10 Dekstroz (505 mOsm/L) aynı glukoz yükünü güvenle verir, rebound hiperglisemiyi azaltır ve konsantre dekstrozların (%20/%30/%50) ekstravazasyon nekrozu riskini ortadan kaldırır.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Alkolizm / Malnütrisyonda Tiamin',
              recommendation: 'Riskli hastada dekstrozdan ÖNCE veya EŞZAMANLI Tiamin 100–500 mg IV uygula.',
              rationaleAndCaution: 'Tiamin eksikliğinde saf glukoz yüklemesi piruvat dehidrogenaz yolağını tüketip akut Wernicke ensefalopatisi (oftalmopleji, ataksi, konfüzyon) tetikler. Ancak Tiamin temini için dekstroz asla geciktirilmez!',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Karaciğer Yetmezliği / Alkolizmde Glukagon',
              recommendation: 'Glikojen depoları boş hastalarda Glukagona GÜVENME — acil IV/IO Dekstroz ver.',
              rationaleAndCaution: 'Glukagon yalnızca hepatik glikojeni parçalayarak kan şekerini yükseltir. Siroz, hepatektomi, kronik alkolizm ve uzun aç yenidoğanda glikojen olmadığı için etkisizdir.',
              status: 'CAUTION'
            },
            {
              domain: 'Çocuk / Yenidoğanda Konsantre Dekstroz & Yenidoğan 2 mL/kg Kuralı',
              recommendation: 'Çocuk (>5 kg ve <40 kg) %10 Dekstroz 2–5 mL/kg (maks 25 g); Yenidoğan (≤5 kg) katı 2 mL/kg %10 Dekstroz kullan — %50 (ve seyreltilmemiş %20/%30) Dekstrozdan KESİNLİKLE KAÇIN!',
              rationaleAndCaution: 'Yenidoğanda (≤5 kg) 5 mL/kg bolus rebound hiperinsülinemi ve ozmolar dalgalanma yapar; konsantre dekstrozlar ise ince pediatrik venlerde tromboflebit/doku nekrozu ve ölümcül intraventriküler hemoraji (İVH) geliştirir.',
              status: 'AVOID'
            }
          ]
        },
        preventionBox: {
          title: 'Perioperatif Hipoglisemi Önleme & Güvenli Glisemi Kontrol Listesi (ADA / CPOC / NICE-SUGAR)',
          highlightRule: 'ALTIN KURAL (NICE-SUGAR & ADA 2024/2025): Perioperatif hedef kan şekeri 100–180 mg/dL’dir! Sıkı <81–110 mg/dL hedefi ağır hipoglisemiyi 13 kat ve mortaliteyi anlamlı artırır — yüksek riskli her hastada anestezi altında proaktif 1–2 saatte bir KŞ ölç!',
          checks: [
            'Preoperatif İlaç Düzenlemesi: Cerrahi sabahı sülfonilüreleri, meglitinidleri ve kısa etkili öğün insülinlerini KES; uzun etkili bazal insülini (Glargin/Detemir/Degludek) %20–25 azalt (%75–80 devam); SGLT2 inhibitörlerini 3–4 gün önce kes (öglisemik DKA riski).',
            'Cerrahi Sıralaması: Tip 1 DM, insülin kullanan diyabetikler ve yenidoğan/küçük çocukları daima sabah İLK VAKA (first on the list) olarak planla; gereksiz uzun açlıktan kaçın (berrak sıvılar ameliyattan 1–2 saat öncesine dek serbest).',
            'İntraoperatif Ölçüm Sıklığı: İnsülin infüzyonu alan, Tip 1 DM, karaciğer cerrahisi, sepsis veya yenidoğan hastalarında her 30–60 dk’da bir (stabil diyabetikte en az 1–2 sa’da bir) KŞ ölçümü yap.',
            'İnsülin Pompası Güvenliği: Uzun/majör cerrahide cilt altı insülin pompasını çıkar ve kontrollü IV insülin protokolüne geç; kısa işlemde pompa kalacaksa bazal hızı doğrula ve koter/MRI güvenliğini kontrol et.'
          ]
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Beyin, glikojen depolama kapasitesi yok denecek kadar az olan ve neredeyse tamamen zorunlu plazma glukoz oksidasyonuna bağımlı (GLUT1/GLUT3 taşıyıcıları ile insülinden bağımsız alım) bir organdır. Plazma glukozu düştüğünde sağlıklı uyanık bir bireyde sırasıyla endojen insülin baskılanması (<80 mg/dL), glukagon ve adrenalin salınımı (<68 mg/dL), büyüme hormonu/kortizol artışı (<65 mg/dL) ve nöroglikopenik belirtiler (<50–55 mg/dL) devreye girer. Genel anestezi, santral sempatik yanıtı ve bilinçli farkındalığı baskılayarak tüm bu erken koruyucu alarmları körleştirir.',
      stepsTitle: 'Glukoz Düşüşü → Maskelenmiş Nöroglikopeni & Nöronal Enerji Çöküşü Kaskadı',
      flowType: 'cascade',
      cycleWarning: 'Genel anestezi + β-bloker kombinasyonu, hem otonom (taşikardi/terleme) hem de nöroglikopenik (konfüzyon) tüm uyarı eşiklerini siler — hasta doğrudan sessiz nöronal ATP tükenmesine ve kardiyak aritmiye sürüklenir!',
      cascadeSteps: [
        {
          phase: '1. Glukoz Arz–Talep Dengesizliği & Kontr-Regülasyon Kaybı',
          mechanism: 'Eksojen insülin fazlalığı, sülfonilüre, bozulmuş hepatik glukoneogenez (siroz/hepatektomi/alkol) veya tükenmiş pediatrik glikojen depoları plazma glukozunu hızla <70 mg/dL altına çeker.',
          badge: 'KŞ <70 mg/dL',
          color: 'amber'
        },
        {
          phase: '2. Anestezi & β-Bloker ile Otonom Uyarıların Maskelenmesi',
          mechanism: 'Volatil anestezikler, propofol, opioidler ve β-blokerler sempatoadrenal yanıtı (terleme, tremor, taşikardi) ve kortikal semptomları tamamen gizler; klinik olarak "stabil anestezi" yanılsaması oluşur.',
          badge: 'SESSİZ FAZ',
          color: 'purple'
        },
        {
          phase: '3. Akut Nöroglikopeni & Eksitotoksik Nöronal Hasar',
          mechanism: 'KŞ <54 mg/dL altında serebral ATP üretimi çöker; Na⁺/K⁺-ATPaz pompaları durur, hücre dışı glutamat birikir ve NMDA reseptörleri üzerinden intraselüler Ca²⁺ yüklenmesiyle kortikal/hipokampal nöronal nekroz başlar.',
          badge: 'KŞ <54 mg/dL',
          color: 'red'
        },
        {
          phase: '4. Kardiyak Repolarizasyon Bozukluğu & Nöbet/Koma',
          mechanism: 'Katekolamin dalgalanması + hipokalemi + miyokardiyal glukoz açlığı QTc uzamasına ve ventriküler aritmilere (Torsades/VF) zemin hazırlar; klinik olarak gecikmiş uyanma, inme taklidi fokal defisit veya nöbet gelişir.',
          badge: 'ARİTMİ & KOMA',
          color: 'rose'
        }
      ],
      summaryText: 'İntraoperatif hipoglisemi, erken saptandığında 10–25 g IV dekstrozla saniyeler içinde %100 geri döndürülebilen; ancak anestezi altında maskelendiği için ölçülmediğinde kalıcı beyin hasarı ve ani aritmik ölüme yol açabilen önlenebilir bir felakettir.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'Genel anestezi altında ÇOĞUNLUKLA TAMAMEN ASEMPTOMATİK (tek güvenilir bulgu rutin KŞ ölçümüdür!)',
        'Yeterli anestezi derinliğine (normal MAC/BIS) rağmen açıklanamayan ani diaforez (soğuk terleme)',
        'Hafif açıklanamayan taşikardi veya kan basıncı dalgalanması (β-bloker veya yüksek nöroaksiyel blokta tamamen YOKTUR!)',
        'Rejiyonal anestezi / sedasyon altındaki uyanık hastada ani anksiyete, konuşmada peltekleşme, terleme, açlık veya ajitasyon'
      ],
      progressingSigns: [
        'BIS / işlenmiş EEG değerinde anestezik doz artırılmadan ani derinleşme (<25–30) veya burst suppression paterni',
        'EKG’de QTc uzaması, T dalga düzleşmesi/inversiyonu veya yeni başlayan ventriküler ekstrasistoller',
        'Açıklanamayan hipotansiyon, bradikardi (özellikle β-bloker alan veya ileri hipoglisemili hastalarda) ve metabolik asidoz',
        'Yenidoğan ve bebeklerde hipotermi, apne eğilimi, bradikardi ve kas tonusu kaybı'
      ],
      lateSigns: [
        'Anestezikler tamamen kesilmesine ve kas gevşetici geri çevrilmesine rağmen GECİKMİŞ UYANMA / derin koma',
        'Fokal nörolojik defisit (hemiparezi, anizokori — akut perioperatif inmeyi taklit eder!)',
        'Jeneralize tonik-klonik nöbet (kas gevşetici etkisi altındaki hastada yalnızca ani taşikardi/hipertansiyon/EEG aktivitesi ile görülebilir)',
        'Malign ventriküler aritmi (Torsades de Pointes / VF) ve kardiyak arrest'
      ],
      specialAlertTitle: 'β-Bloker & Alkolizm İkili Tuzağı!',
      specialAlertContent: '1) β-bloker kullanan diyabetik hastada hipogliseminin taşikardi ve tremor uyarısı tamamen silinir (yalnızca terleme kalabilir, genel anestezide o da gözden kaçar!). 2) Kronik alkolizm veya malnütrisyonlu hastada dekstroz infüzyonu Tiamin verilmeden yapılırsa akut Wernicke ensefalopatisi tetiklenebilir — dekstrozla birlikte 100–500 mg IV Tiamin verin!'
    },

    // 7) Önleyici Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Preoperatif vizitte Tip 1 DM, insülin/sülfonilüre kullanımı, HbA1c, kronik böbrek/karaciğer yetmezliği, alkolizm, malnütrisyon, adrenal yetmezlik ve β-bloker kullanımı yüksek hipoglisemi riski olarak işaretlenmelidir.',
        'Sülfonilüreler ve kısa etkili insülinler ameliyat sabahı kesilmeli; uzun etkili bazal insülin %20–25 azaltılmalı; diyabetik ve pediatrik olgular sabah ilk vaka olarak planlanmalıdır.',
        'Pediatrik hastalarda ESAIC 2022 kılavuzuna uygun olarak berrak sıvı (su/elma suyu/berrak karbonhidrat) açlığı 1 saat ile sınırlandırılmalı, gereksiz 10–12 saatlik gece açlığı kesinlikle önlenmelidir.'
      ],
      anesthesiaMachinePreparation: {
        title: 'İntraoperatif Proaktif Glukoz Monitörizasyon & Güvenlik Protokolü',
        steps: [
          'Ameliyat öncesi bekleme alanında (preop holding) tüm yüksek riskli hastalarda bazal kapiller/venöz kan şekeri ölçülmeli; <100 mg/dL ise indüksiyon öncesi profilaktik dekstroz desteği değerlendirilmelidir.',
          'İnsülin infüzyonu alan hastalarda insülin ve dekstroz solüsyonları ayrı kontrollü infüzyon pompalarından verilmeli; kan şekeri 30–60 dk’da bir arteriyel/venöz kan gazı veya valide glukometre ile izlenmelidir.',
          'Yenidoğan ve <10–15 kg çocuklarda intraoperatif %1–2,5 dekstroz içeren izotonik dengeli idame sıvıları kullanılmalı; boluslar dekstrozsuz dengeli kristaloidle yapılmalıdır.',
          'Uyanması geciken HER hastada ekstübasyon öncesi ilk değerlendirme parametresi ("DEFG — Don’t Ever Forget Glucose") yatak başı kan şekeri ölçümü olmalıdır.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'İntraoperatif hedef glisemi 100–180 mg/dL (5,6–10,0 mmol/L) olarak sabitlenmeli; NICE-SUGAR kanıtı gereği <100 mg/dL hedefleyen agresif insülin boluslarından kaçınılmalıdır',
        'İnsülin enjektörleri yalnızca standart insülin enjektörüyle hazırlanmalı, çift kontrol yapılmalı ve belirgin renkli etiketle işaretlenmelidir',
        'Feokromositoma rezeksiyonu (tümör ven ligasyonu sonrası), insülinoma çıkarılması ve karaciğer transplantasyonu anhepatik fazında 30 dk’da bir zorunlu kan şekeri protokolü uygulanmalıdır'
      ],
      cartTitle: 'İntraoperatif Hipoglisemi Acil Müdahale Seti:',
      cartChecklist: [
        '%10 Dekstroz 250–500 mL Torba (Erişkin 100–250 mL periferik ven dostu & Pediatrik/Yenidoğan "Rule of 50" standart solüsyon!)',
        '%20 Dekstroz (60–125 mL bolus) ve %30 Dekstroz (40–80 mL bolus) (Türkiye ameliyathane standart konsantre stokları — yalnızca erişkin geniş/santral venden yavaş; %50 Dekstroz TR’de nadirdir; pediatride YASAK!)',
        'Tiamin (Vitamin B1) 100 mg Ampuller (Alkolizm/malnütrisyonda 100–500 mg IV)',
        'Glukagon 1 mg IM/SC Acil Kiti (IV yol yokluğunda kurtarma — karaciğer yetmezliğinde etkisiz notuyla)',
        'Oktreotid 100 mcg Ampul (Sülfonilüre aşırı dozu / refrakter hiperinsülinemik hipoglisemi)',
        'Kalibre POCT Glukometre + Arteriyel Kan Gazı Enjektörleri (Potasyum & Glukoz hızlı doğrulama)'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'İzole, hızlı düzeltilmiş Seviye 1–2 hipoglisemi PACU’da en az 2–4 saat seri KŞ takibiyle izlenir. Sülfonilüre aşırı dozu, ağır nöroglikopeni (Seviye 3 / koma / nöbet), karaciğer yetmezliği veya insülinoma/feokromositoma sonrası olgular en az 24 saat YBÜ/yakın monitörizasyonda tutulmalıdır.',
      recurrenceRate: 'Tek bir IV dekstroz bolusunun etkisi yalnızca 30–60 dakika sürer! Özellikle uzun etkili bazal insülin, sülfonilüre (24–72 saat etki!), böbrek yetmezliği veya karaciğer yetmezliğinde idame infüzyonu başlanmazsa yüksek oranda nüks eder.',
      recurrenceRiskBadge: 'BOLUS ETKİSİ 30–60 DK · SÜLFONİLÜREDE 24–72 SAAT NÜKS RİSKİ',
      maintenanceTherapy: 'Hedef 100–180 mg/dL kalacak şekilde %5–10 Dekstroz idame infüzyonu (oral alım başlayana dek), sülfonilüre olgusunda Oktreotid (50–100 mcg/6–8 sa), hipokalemi düzeltilmesi ve endokrinoloji/diyabet konsültasyonu ile yeni insülin rejimi düzenlenmesi.',
      monitoringParameters: [
        'İlk 2 saatte 15–30 dk’da bir, stabilizasyon sonrası saatlik kan şekeri takibi (hedef 100–180 mg/dL)',
        'Seri nörolojik muayene (GKS, pupil, fokal defisit veya post-iktal durumun tamamen gerilediğinin doğrulanması)',
        'Serum potasyum (K⁺), magnezyum ve 12 derivasyonlu EKG (QTc normalizasyonu)',
        'Ağır veya uzamış nöroglikopeni varsa laktat, karaciğer/böbrek fonksiyonları ve açıklanamayan vakada sabah kortizolü / C-peptid / insülin düzeyi'
      ],
      expectedComplications: [
        'Uzamış ağır hipoglisemiye bağlı kalıcı hipoglisemik ensefalopati, hafıza/kognitif bozukluk veya nöbet',
        'Periferik venden verilen konsantre (%20/%30/%50) Dekstroz ekstravazasyonuna bağlı ağır cilt/yumuşak doku nekrozu',
        'Alkolik/malnütrisyonlu hastada Tiamin verilmeden dekstroz uygulanmasına bağlı akut Wernicke ensefalopatisi',
        'Rebound hiperglisemi (aşırı dekstroz bolusu sonrası >250–300 mg/dL) ve hipokalemi / QTc uzamasına bağlı ventriküler aritmi',
        'Yenidoğan/pretermde hiperozmotik dekstroz uygulanmasına bağlı intraventriküler hemoraji (İVH)'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'Arteriyel / Venöz Plazma Glukozu & Kan Gazı',
          description: 'POCT glukometre değerini doğrular, eşlik eden hipokalemi ve laktik asidozu saptar.'
        },
        {
          testName: 'Açıklanamayan Hipoglisemide "Kritik Örnek" (Dekstroz Öncesi Mümkünse)',
          description: 'Diyabeti olmayan hastada açıklanamayan intraoperatif hipoglisemide serum insülin, C-peptid, kortizol ve β-hidroksibütirat ölçümü (insülinoma, adrenal yetmezlik veya faktisiyöz insülin ayrımı).'
        },
        {
          testName: 'Kraniyal MRG (Yalnızca Uzamış Koma / Fokal Defisit Düzelmezse)',
          description: 'Dekstroz sonrası bilinç açılmazsa akut inme vs hipoglisemik ensefalopati (DWI’da korteks/hipokampus/bazal ganglion tutulumu) ayrımı için çekilir.'
        }
      ],
      prognosisSummary: 'Hızlı tanınıp uygun IV dekstrozla düzeltilen intraoperatif hipoglisemide nörolojik iyileşme tamdır. Buna karşın genel anestezi altında maskelenip 30–60 dakikadan uzun süren ağır nöroglikopeni kalıcı beyin hasarı ve yüksek mortalite ile sonuçlanır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Genel Anestezi Tüm Hipoglisemi Alarmlarını Siler!',
        takeaway: 'Uyanık hastada terleme, tremor, çarpıntı ve konfüzyonla bağıran hipoglisemi, genel anestezi (ve özellikle β-bloker) altında tamamen SESSİZ ilerler. Tek koruma kalkanınız yüksek riskli olgularda rutin 1–2 saatte bir (insülin infüzyonunda 30–60 dk’da bir) KŞ ölçümü ve uyanmayan her hastada ilk iş "DEFG: Don’t Ever Forget Glucose" kuralıdır!',
        category: 'Tuzak'
      },
      {
        title: 'TR %10/%20/%30 Dekstroz & Pediatrik "Rule of 50" (Yenidoğan ≤5 kg Katı 2 mL/kg!)',
        takeaway: 'Türkiye ameliyathanelerinde erişkin acil kurtarmada periferik ven dostu %10 Dekstroz (100–250 mL) veya geniş/santral venden %20 (60–125 mL) / %30 (40–80 mL) Dekstroz kullanılır (%50 Dekstroz TR’de nadirdir). Çocukta (>5 kg ve <40 kg) %10 Dekstroz 2–5 mL/kg (0,2–0,5 g/kg, maks 25 g); Yenidoğanda (≤5 kg) katı 2 mL/kg %10 Dekstroz (0,2 g/kg — 5 mL/kg VERME: rebound hiperinsülinemi & ozmolar dalgalanma riski!). Konsantre %20/%30/%50 Dekstroz pediatride hiperozmotik venöz nekroz ve İVH nedeniyle KESİNLİKLE YASAKTIR!',
        category: 'Kritik Doz'
      },
      {
        title: 'NICE-SUGAR Dersi: İntraoperatif Hedef 100–180 mg/dL!',
        takeaway: 'Eski "sıkı glisemik kontrol (81–108 mg/dL)" yaklaşımı NICE-SUGAR (NEJM 2009) ile terk edilmiştir: Ağır hipoglisemiyi 13 kat ve 90 günlük mortaliteyi artırdığı kanıtlanmıştır. ADA 2024/2025 perioperatif hedefi 100–180 mg/dL’dir.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Alkolizm/Malnütrisyonda Tiamin 100–500 mg IV + Glukagon Tuzağı!',
        takeaway: 'Kronik alkolizm veya malnütrisyonda akut Wernicke ensefalopatisini önlemek için dekstrozla birlikte (tercihen hemen önce/eşzamanlı) Tiamin 100–500 mg IV verin. Ayrıca glikojen depoları boş karaciğer yetmezliği ve kronik alkolizmde IM Glukagonun ETKİSİZ olduğunu unutmayın!',
        category: 'Ezber Bozan'
      },
      {
        title: 'Sülfonilüre Hipoglisemisinde Tek Dekstroz Yetmez — Oktreotid!',
        takeaway: 'Glibenklamid/glimepirid gibi uzun etkili sülfonilüreler 24–72 saat boyunca insülin salgılatır; tek başına dekstroz bolusları β-hücresini yeniden uyararak rebound hipoglisemi yapar. Oktreotid (50–100 mcg SC/IV her 6–8 sa) pankreatik insülin salınımını keserek kalıcı çözüm sağlar.',
        category: 'Kritik Doz'
      }
    ],

    // 10) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'American Diabetes Association Professional Practice Committee.',
        title: 'Standards of Care in Diabetes — 2024 / 2025: Glycemic Goals and Hypoglycemia (Section 6) & Diabetes Care in the Hospital (Section 16).',
        journal: 'Diabetes Care. 2024;47(Suppl. 1):S111–S125, S295–S306 & 2025;48(Suppl. 1).',
        year: '2024–2025',
        relevance: 'Güncel Seviye 1 (<70 mg/dL), Seviye 2 (<54 mg/dL), Seviye 3 hipoglisemi sınıflaması ve perioperatif 100–180 mg/dL glisemik hedef standartları.'
      },
      {
        authors: 'NICE-SUGAR Study Investigators (Finfer S, Chittock DR, Su SY, et al.).',
        title: 'Intensive versus Conventional Glucose Control in Critically Ill Patients.',
        journal: 'New England Journal of Medicine (NEJM). 2009;360(13):1283–1297.',
        year: '2009',
        relevance: 'Sıkı glukoz kontrolünün (81–108 mg/dL) konvansiyonel hedefe (<180 mg/dL) göre ağır hipoglisemiyi (%6,8 vs %0,5) ve 90 günlük mortaliteyi artırdığını gösteren dönüm noktası RKÇ.'
      },
      {
        authors: 'Centre for Perioperative Care (CPOC) — UK.',
        title: 'Guideline for Perioperative Care for People with Diabetes Mellitus Undergoing Elective and Emergency Surgery.',
        journal: 'CPOC National Guideline (Updated).',
        year: '2021–2023',
        relevance: 'Perioperatif diyabet ilaç yönetimi, insülin pompası kuralları, %10 dekstroz ile hipoglisemi kurtarma ve intraoperatif ölçüm sıklığı rehberi.'
      },
      {
        authors: 'Duggan EW, Carlson K, Umpierrez GE.',
        title: 'Perioperative Hyperglycemia Management: An Update.',
        journal: 'Anesthesiology. 2017;126(3):547–560.',
        year: '2017',
        relevance: 'Anestezi altında maskelenmiş hipoglisemi riski, oral antidiyabetik/bazal insülin kesme kuralları ve perioperatif IV insülin güvenliği.'
      },
      {
        authors: 'Frykholm P, Disma N, Andersson H, et al.',
        title: 'Pre-operative fasting in children: A guideline from the European Society of Anaesthesiology and Intensive Care (ESAIC).',
        journal: 'European Journal of Anaesthesiology (EJA). 2022;39(1):4–25.',
        year: '2022',
        relevance: 'Pediatrik ve yenidoğanlarda uzamış açlığın önlenmesi (1 saat berrak sıvı kuralı) ve perioperatif hipoglisemi koruması.'
      }
    ],
    relatedLinks: [
      { label: 'Gecikmiş Uyanma (Emergence Delay) Protokolü', href: '#arac=emergencies&sub=emergence-delay', badge: 'Ayırıcı Tanı' },
      { label: 'İntraoperatif Adrenal Kriz Protokolü', href: '#arac=emergencies&sub=adrenal-crisis', badge: 'Endokrin' },
      { label: 'Pediatrik Preoperatif Açlık İnfografiği', href: '#infografik=pediatric-fasting', badge: 'Pediatri' },
      { label: 'Erişkin Preoperatif Açlık İnfografiği', href: '#infografik=adult-fasting', badge: 'Preop' },
      { label: 'Preoperatif İptal & Erteleme Matrisi', href: '#arac=preop&sub=cancellation-matrix', badge: 'Preop' }
    ]
  },

  'myxedema-coma': {
    id: 'myxedema-coma',
    // 1) Başlık
    title: 'İntraoperatif Miksödem Koması (Dekompanse Ağır Hipotiroidi Krizi)',
    subTitle: 'Hipotermi · Hipoventilasyon · Refrakter Şok · Önce Hidrokortizon, Sonra Levotiroksin (TR: NG/OG Oral LT4 · ATA: İV T4)',
    codeColor: 'purple',
    severityBadge: 'KOD MOR / KIRMIZI · MORTALİTE %25–50 · ÖNCE İV HİDROKORTİZON VER!',
    keyCallout: 'Miksödem koması nadir ancak mortalitesi %25–50 olan ağır hipotiroidi dekompansasyonudur! Derin hipotermi (enfeksiyona rağmen ateşsiz olabilir), hipoventilasyon/CO₂ narkozu, makroglossi/laringeal miksödem (ZOR HAVAYOLU!), bradikardi + düşük voltajlı EKG/uzun QT, vazopressöre dirençli şok, dilüsyonel hiponatremi ve uyanmama ile seyreder. ALTIN KURAL (ATA 2014): TSH/sT4/kortizol kanını al ama sonucu BEKLEME — Tiroid hormonundan ÖNCE/EŞZAMANLI MUTLAKA İV HİDROKORTİZON 100 mg ver (adrenal kriz tetiklenmesini önle; TR’de İV Hidrokortizon dönemsel stok yoksa geçici köprü olarak İV Metilprednizolon veya İV Deksametazon!), ardından Levotiroksin (T4) yükle: Türkiye’de İV T4 ve İV T3 rutin hastane stoklarında YOKTUR — pratik birincil yol NG/OG tüpten ezilmiş oral Levotiroksin 300–500 mcg yükleme (yaşlı/KAH hastasında 200–300 mcg düşük uç → 50–100 mcg/gün idame; miksödem ileusunda emilim öngörülemez olduğundan yakın sT4/klinik takip!) [ATA 2014 uluslararası: İV T4 200–400 mcg ± İV T3 5–20 mcg]. Pediatride (<40 kg) 5–10 mcg/kg yükleme (erişkin yaşlı/KAH tavanını ASLA aşma: IV maks 200 mcg, NG maks 300 mcg + Pediatrik Endokrinoloji konsültasyonu!). Yalnızca PASİF ısıtma uygula (agresif aktif dış ısıtma "rewarming shock" yapar)!',
    quickCalculatorType: 'myxedema-coma',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Miksödem koması; uzun süreli, tedavi edilmemiş veya tanı konmamış ağır hipotiroidisi olan bir hastada homeostatik kompansasyon mekanizmalarının cerrahi stres, genel anestezi, opioid/sedatifler, soğuk ameliyathane ortamı veya enfeksiyonla aniden çökmesi sonucu gelişen, bilinç bozukluğu/gecikmiş uyanma, derin hipotermi, hipoventilasyon, bradikardi, refrakter hipotansiyon ve hiponatremi ile karakterize hayatı tehdit eden endokrin acildir.',
      epidemiology: 'Oldukça nadir (tahmini insidans ~0,22/1.000.000/yıl) olmakla birlikte ileri yaşlı kadınlarda, kış aylarında ve acil cerrahiye (kalça kırığı, akut batın, enfeksiyon) alınan tanı konmamış hipotiroidi hastalarında perioperatif olarak tetiklenebilir. Modern yoğun bakım ve erken tiroid hormon replasmanına rağmen hastane mortalitesi hâlen %25–50 arasında seyretmektedir; gecikmiş tanı ve agresif ısıtma/steroidsiz T4 uygulaması mortaliteyi katlar.',
      triggers: [
        'Tanı Konmamış veya Tedavisini Bırakmış Ağır Hipotiroidi Hastasında Acil Cerrahi Stres ve Genel Anestezi',
        'Opioidler, Benzodiazepinler, Propofol ve Volatil Anestezikler (Hepatik/Renal Klirens ↓ + SSS Duyarlılığı ↑↑ → Solunum Depresyonu & CO₂ Narkozu!)',
        'Soğuk Ameliyathane Ortamı ve Soğuk IV Sıvılar (Termogenez Kapasitesi Çökmüş Hastada Derin Hipotermi)',
        'Akut Enfeksiyon / Sepsis (Pnömoni, İYE — Hipotiroidi Ateş Yanıtını Baskıladığı İçin Enfeksiyon Ateşsiz ve Sessiz Seyreder!)',
        'Amiodaron, Lityum, β-Blokerler, Diüretikler (Hiponatremiyi Derinleştirir) ve Gastrointestinal Kanama / Travma / MI'
      ],
      safeAgents: [
        'İLK VE ZORUNLU İLAÇ — İV Hidrokortizon: 100 mg IV bolus → 50–100 mg IV her 6–8 saatte bir (Tiroid hormonundan ÖNCE veya EŞZAMANLI; adrenal krizi önler! TR Tedarik Notu: İV Hidrokortizon dönemsel stokta yoksa geçici köprü olarak İV Metilprednizolon veya İV Deksametazon başlanıp acilen Hidrokortizon temin edilir)',
        'Tiroid Hormon Replasmanı — TÜRKİYE BİRİNCİL PRATİĞİ (NG/OG Oral LT4): Türkiye’de İV T4 ve İV T3 rutin hastane stoklarında YOKTUR! Birincil yaklaşım NG/OG tüpten ezilmiş oral Levotiroksin 300–500 mcg yükleme (yaşlı/KAH hastasında 200–300 mcg düşük uç) → 50–100 mcg/gün idame (miksödem ileusunda emilim öngörülemez olduğundan yakın sT4/klinik takip!). Uluslararası referans (ATA 2014 — TR’de İV T4 ve İV T3 rutin stokta YOKTUR): İV Levotiroksin (T4) 200–400 mcg (yaşlı/KAH 200 mcg) → 50–100 mcg/gün IV ± refrakter olguda (KAH/aritmi yoksa) İV Liyotironin (T3) 5–20 mcg → 2,5–10 mcg/8 sa. Pediatri (<40 kg): 5–10 mcg/kg yükleme (erişkin yaşlı/KAH tavanını ASLA aşmaz: IV maks 200 mcg, NG maks 300 mcg) + Pediatrik Endokrinoloji konsültasyonu!',
        'Havayolu & Anestezi: Makroglossi ve laringeal miksödem nedeniyle erken videolaringoskopi + küçük çaplı ETT (6,0–7,0 mm) hazırlığı; BIS eşliğinde minimum doz kısa etkili ajanlar (Ketamin/Etomidat, Remifentanil, düşük MAC volatil) ve rejiyonal anestezi tercihi',
        'Isıtma Stratejisi: Yalnızca PASİF ısıtma (ılık battaniye, oda ısısını yükseltme, ılık IV sıvı — yavaş ≤0,5°C/sa yükseliş)',
        'Sıvı & Hiponatremi Yönetimi: Konservatif sıvı (kalp yetmezliği/dilüsyonel hiponatremi riski!); ağır semptomatik Na⁺ <120 mEq/L’de dikkatli %3 NaCl (düzeltme hızı ≤6–8 mEq/L/24 sa — ozmotik demiyelinizasyon önlemi!)',
        'KESİN KAÇINILACAKLAR: Steroidsiz tek başına T4/T3 başlamak, agresif aktif eksternal ısıtma ("rewarming shock" / vazodilatasyon kollapsı!), standart tam doz uzun etkili opioid/benzodiazepin ve hipotonik sıvı yüklemesi!'
      ],
      mortalityStats: 'Tedavisiz miksödem koması neredeyse %100 ölümcüldür. Erken IV Hidrokortizon + Levotiroksin (TR’de NG/OG oral LT4; uluslararası ATA 2014 İV T4) + mekanik ventilasyon desteğiyle dahi ileri yaş, bradikardi, derin hipotermi (<34°C) ve eşlik eden sepsis varlığında mortalite %25–50 civarındadır.',
      clinicalUrgency: 'Klinik şüphe doğduğu anda (açıklanamayan hipotermi + bradikardi + vazopressöre dirençli hipotansiyon + uyanmama/hiperkapni) TSH/sT4/kortizol için kan alınıp LABORATUVAR SONUCU BEKLENMEDEN derhal IV Hidrokortizon 100 mg ve ardından Levotiroksin (TR’de NG/OG tüpten ezilmiş oral LT4 300–500 mcg; varsa ATA 2014 İV T4 200–400 mcg) başlanmalıdır!'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Miksödem koması tanısı KLİNİKTİR ve laboratuvar sonucu beklenmeden tedavi başlatılır! İntraoperatif/derlenme ortamında klasik tablo: açıklanamayan derin hipotermi (32–35°C), sinüs bradikardisi + düşük voltajlı EKG/uzun QT, vazopressörlere yanıt vermeyen refrakter hipotansiyon, düşük anestezik dozlara rağmen derinleşen anestezi / gecikmiş uyanma, şiddetli hipoventilasyon (CO₂ retansiyonu) ve dilüsyonel hiponatremidir. Bazal kan örneğinde yüksek TSH + çok düşük sT4/sT3 (sekonder/santral hipotiroidide ise düşük/normal TSH + çok düşük sT4!) tanıyı doğrular.',
      clinicalCriteria: [
        'Derin Hipotermi (<35,5°C; sıklıkla <34°C): Standart ısıtmaya dirençlidir; enfeksiyon/sepsis varlığında dahi ateş çıkmayabilir ("normotermi bile enfeksiyon işareti olabilir!")',
        'Kardiyovasküler Bulgular: Sinüs bradikardisi (<50–60/dk), vazopressörlere dirençli refrakter hipotansiyon (↓kardiyak debi + ↓β-adrenerjik reseptör duyarlılığı), düşük voltajlı QRS, yaygın T düzleşmesi/inversiyonu, uzun QTc (Torsades riski) ve perikardiyal efüzyon / kardiyak tamponad',
        'Solunum & Havayolu Bulguları: Hipoksik ve hiperkapnik ventilatuvar dürtü kaybı (CO₂ narkozu), diyafram güçsüzlüğü, plevral efüzyon ve obstrüktif makroglossi / laringeal miksödem → beklenmedik ZOR HAVAYOLU!',
        'Nörolojik Bulgular: Gecikmiş uyanma, letarji, obtundasyon, koma (adına rağmen tam koma şart değildir!), reflekslerin gevşeme fazında uzama ve hiponatremi/hipoksiye bağlı nöbet',
        'Metabolik Triad: Dilüsyonel hiponatremi (SIADH + ↓GFR / serbest su klirensi bozukluğu), hipoglisemi (özellikle eşlik eden adrenal yetmezlikte) ve kreatin kinaz (CK) yüksekliği'
      ],
      gradingScaleTitle: 'Miksödem Koması Diagnostik Skorlama Sistemi (Popoveniuc / Wartofsky Kriterleri)',
      gradingScaleSource: 'Popoveniuc G, Chandra T, Sud A, et al. Endocrine Practice. 2014;20(8):808–817 & ATA 2014',
      larachScale: [
        { category: 'Termoregülasyon (Hipotermi)', points: '0 – 20 Puan', description: '>35°C (0 puan), 32–35°C (10 puan), <32°C (20 puan) — ameliyathane soğuğuyla hızla derinleşir.' },
        { category: 'SSS Etkileri (Bilinç / Uyanma)', points: '0 – 30 Puan', description: 'Somnolans/letarji (10), obtundasyon (15), stupor (20), koma / nöbet / uyanamama (30 puan).' },
        { category: 'Kardiyovasküler & Solunum', points: '10 – 40 Puan', description: 'Bradikardi (<40/dk: 30; 40–49: 20; 50–59: 10), düşük voltaj/uzun QT/efüzyon (+10), hipotansiyon (+20), hiperkapni/hipoventilasyon (+10).' },
        { category: 'Metabolik & Tetikleyici', points: '10 – 30 Puan', description: 'Hiponatremi (+10), hipoglisemi (+10), hipoksemi (+10), azalmış GFR (+10) ve cerrahi/anestezi/enfeksiyon tetikleyicisi (+10).' }
      ],
      larachInterpretation: 'Toplam skor ≥60 puan miksödem koması için yüksek derecede tanısaldır; 25–59 puan arası miksödem koması riskini/başlangıcını gösterir. Skor ≥60 veya klinik şüphe yüksekse hormon sonuçları beklenmeden DERHAL IV Hidrokortizon + Levotiroksin (TR’de NG/OG oral LT4 300–500 mcg; ATA 2014 İV T4 200–400 mcg — TR’de rutin stokta YOKTUR) başlanır!',
      differentialDiagnosis: [
        {
          condition: 'İntraoperatif Adrenal Kriz',
          differentiatingFactors: 'Her ikisi de vazopressöre dirençli şok, hiponatremi ve hipoglisemi yapar ve BİRLİKTE BULUNABİLİR (otoimmün poliglandüler sendrom / hipopitüitarizm)! Bu nedenle miksödem komasında ilk ilaç her zaman IV Hidrokortizon 100 mg’dır.'
        },
        {
          condition: 'Septik Şok + Sekonder Hipotermi',
          differentiatingFactors: 'Sepsis miksödem komasını en sık tetikleyen faktördür! Miksödemde ateş yanıtı baskılandığı için enfeksiyon dışlanana dek kan kültürleri alınıp geniş spektrumlu ampirik antibiyotik de başlanmalıdır.'
        },
        {
          condition: 'Aşırı Opioid / Sedatif Dozu & CO₂ Narkozu',
          differentiatingFactors: 'Hipotiroidi hastaları opioidlere ve anesteziklere aşırı duyarlıdır; Nalokson/Flumazenil geçici kısmi yanıt verse bile derin hipotermi, bradikardi, düşük voltajlı EKG ve hiponatremi miksödemi ele verir.'
        },
        {
          condition: 'Kardiyak Tamponad / Ağır Kalp Yetmezliği / İntraop MI',
          differentiatingFactors: 'Miksödem koması perikardiyal efüzyona (nadiren tamponada!) yol açabilir; yatak başı POCUS/EKO ile perikard sıvısı ve biventriküler kontraktilite hızla değerlendirilmelidir.'
        },
        {
          condition: 'Ağır İntraoperatif Hipoglisemi veya Hiponatremik Ensefalopati',
          differentiatingFactors: 'Miksödem komasına sekonder olarak sık eşlik eder; tek başına glukoz/Na⁺ düzeltmesi ile bradikardi, hipotermi ve vazopleji tamamen düzelmez.'
        }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'ACİL ENDOKRİN KRİZ · Havayolunu güvenceye al (zor havayolu!), bazal TSH/sT4/kortizol kanını al, SONUCU BEKLEMEDEN ÖNCE İV HİDROKORTİZON 100 mg (dönemsel stok yoksa geçici İV Metilprednizolon/Deksametazon köprü) → SONRA LEVOTİROKSİN: TR’de İV T4/T3 rutin stokta YOK → NG/OG tüpten ezilmiş oral LT4 300–500 mcg (yaşlı/KAH 200–300 mcg) [ATA 2014: İV T4 200–400 mcg]! Sadece PASİF ısıtma!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'HAVAYOLU GÜVENLİĞİ (MAKROGLOSSİ / ZOR HAVAYOLU) & MEKANİK VENTİLASYON',
          action: 'Hipoventilasyon, hiperkapni (CO₂ narkozu) veya bilinç depresyonu/gecikmiş uyanmada derhal entübe edin veya mevcut ETT’yi koruyarak kontrollü mekanik ventilasyonu sürdürün. Makroglossi, farinks/larinks miksödemi ve geniş dil nedeniyle videolaringoskop ve küçük çaplı ETT (6,0–7,0 mm) hazır bulundurun!',
          criticalNote: 'Erken ekstübasyon YAPMAYIN! Ventilatuvar dürtü ve kas gücü ancak tiroid hormonu replasmanı sonrası 24–72 saatte toparlar.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'BAZAL HORMON KANLARINI AL — AMA SONUCU ASLA BEKLEME!',
          action: 'Tedavi başlamadan hemen önce 1’er tüp serum TSH, serbest T4 (sT4), serbest T3 (sT3) ve serum kortizol + ACTH (ve sepsis şüphesinde kan kültürleri) gönderin; arteriyel kan gazı, glukoz ve elektrolit (Na⁺, K⁺) bakın.',
          criticalNote: 'Tanısal kan alındıktan sonraki saniyede tedaviye geçilir; laboratuvar sonucunu beklemek mortaliteyi katlar!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'ALTIN KURAL (ATA 2014): TİROİD HORMONUNDAN ÖNCE İV HİDROKORTİZON 100 mg!',
          action: 'Tiroid hormonundan ÖNCE (veya eşzamanlı) derhal Hidrokortizon 100 mg IV bolus uygulayın; ardından adrenal yetmezlik dışlanana dek her 6–8 saatte bir 50–100 mg IV devam edin. TR Tedarik Notu: İV Hidrokortizon dönemsel stokta yoksa tedaviyi geciktirmeden geçici köprü olarak İV Metilprednizolon veya İV Deksametazon başlayıp en kısa sürede Hidrokortizon temin edin.',
          criticalNote: 'NEDEN ÖNCE STEROİD? T4/T3 metabolizmayı hızlandırarak endojen kortizol klirensini artırır; eşlik eden primer (otoimmün) veya sekonder (hipofizer) adrenal yetmezliği olan hastada steroidsiz T4 vermek ÖLÜMCÜL ADRENAL KRİZ tetikler!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'TİROİD HORMON REPLASMANI: TR’DE NG/OG ORAL LT4 ÖN PLANDA (ATA 2014 İV T4/T3 TR’DE YOK!)',
          action: 'Hidrokortizon sonrası derhal Levotiroksin (T4) yüklemesi yapın. TÜRKİYE BİRİNCİL PRATİĞİ (İV T4 ve İV T3 rutin hastane stoklarında YOKTUR!): NG/OG tüpten ezilmiş oral Levotiroksin 300–500 mcg yükleme (ileri yaş, düşük vücut ağırlığı veya koroner arter hastalığı/aritmi varsa düşük uç: 200–300 mcg!) → günde 50–100 mcg/gün NG/oral idame (miksödem ileusunda GİS emilimi öngörülemez olduğundan yakın sT4 ve klinik yanıt takibi şarttır!). Uluslararası referans (ATA 2014 — TR’de İV T4 ve İV T3 rutin stokta YOKTUR): İV Levotiroksin (T4) 200–400 mcg yavaş IV yükleme (yaşlı/KAH: 200 mcg) → 50–100 mcg/gün IV ± çok ağır/refrakter olguda (KAH/aritmi yoksa) İV Liyotironin (T3) 5–20 mcg → 2,5–10 mcg IV her 8 saatte bir. Pediatri (<40 kg): 5–10 mcg/kg yükleme — erişkin yaşlı/KAH tavanını ASLA aşmamalıdır (IV maks 200 mcg, NG maks 300 mcg) + Pediatrik Endokrinoloji konsültasyonu!',
          criticalNote: 'KARDİYAK & EMİLİM TUZAĞI: Yaşlı/KAH hastasında agresif T4 yüklemesi (veya yüksek doz T3) miyokard O₂ tüketimini aniden artırarak akut MI, taşiaritmi ve VF tetikleyebilir — EKG’yi sürekli izleyin! Miksödem ileusunda NG/OG oral LT4 emilimi öngörülemez olduğundan 24–48 saatte bir sT4 trendi ve klinik/hemodinamik yanıt yakından takip edilmelidir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'YALNIZCA PASİF ISITMA UYGULA — AGRESİF AKTİF DIŞ ISITMA YASAK!',
          action: 'Hipotermiyi ılık battaniyeler, ameliyathane ortam ısısını yükseltme ve ılık IV sıvılarla PASİF olarak yavaşça (≤0,5°C/saat) düzeltin.',
          criticalNote: 'REWARMING SHOCK TUZAĞI: Miksödem komasındaki hasta kan basıncını yoğun periferik vazokonstriksiyonla korur! Zorlamalı sıcak hava (Bair Hugger yüksek ısı) veya sıcak su battaniyesiyle agresif aktif eksternal ısıtma yapılırsa ani periferik vazodilatasyon gelişerek KARDİYOVASKÜLER KOLLAPS ("rewarming shock") ortaya çıkar!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 6,
          title: 'HEMODİNAMİK DESTEK, POCUS & DİKKATLİ SIVI/HİPONATREMİ YÖNETİMİ',
          action: 'Refrakter hipotansiyonda Noradrenalin infüzyonu (tiroid hormonu ve kortizol etki edene kadar köprüleme; vazopressör yanıtı başlangıçta zayıf olabilir!) başlatın. Yatak başı POCUS/EKO ile perikardiyal efüzyon/tamponad ve LV fonksiyonunu değerlendirin. Sıvıları KISITLAYIN (dilüsyonel hiponatremi + kalp yetmezliği riski!). Ağır semptomatik hiponatremide (Na⁺ <120 mEq/L, nöbet/koma) %3 NaCl dikkatle (100 mL yavaş bolus) uygulayın — 24 saatte Na⁺ artışı ≤6–8 mEq/L sınırını ASLA aşmamalıdır (ODS önlemi!).',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'HİPOGLİSEMİYİ DÜZELT & TETİKLEYİCİ ENFEKSİYONU AMPİRİK TEDAVİ ET',
          action: 'Kan şekeri <70 mg/dL ise derhal TR stoklarına uygun IV Dekstroz (%10 Dekstroz 100–250 mL periferik ven dostu veya geniş/santral venden %20 Dekstroz 60–125 mL / %30 Dekstroz 40–80 mL; %50 Dekstroz TR’de nadirdir; pediatride %10 D 2–5 mL/kg, yenidoğanda ≤5 kg katı 2 mL/kg) verin ve 1–2 saatte bir KŞ izleyin. Ateş olmasa dahi miksödem komasında gizli enfeksiyon çok sıktır; kan/idrar/balgam kültürleri sonrası geniş spektrumlu ampirik IV antibiyotik başlatın.',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'ANESTEZİK & OPİOİD MİNİMİZASYONU + YOĞUN BAKIM DEVRİ',
          action: 'Devam eden zorunlu cerrahide volatil/IV anestezik ihtiyacının (MAC) belirgin azaldığını unutmayın; BIS eşliğinde minimum doz kısa etkili ajanlar kullanın, mümkünse cerrahiyi hızla sonlandırın (damage control) ve hastayı entübe hâlde YBÜ’ye devredin.',
          priority: 'HIGH'
        }
      ],
      structuredCrisisBlocks: {
        tieredLadder: {
          title: 'Miksödem Komasında Zaman-Kritik Müdahale Merdiveni (ATA 2014 & TR Klinik Pratiği)',
          accent: 'purple',
          levels: [
            {
              badge: '0–5. Dakika (ABC + Kan)',
              target: 'Zor Havayolu, Oksijenasyon & Bazal Hormon Tüpleri',
              presentation: 'Hipoventilasyon, CO₂ narkozu, makroglossi/larinks ödemi, bradikardi, derin hipotermi ve uyanmama.',
              intervention: 'Videolaringoskop + küçük ETT (6,0–7,0 mm) ile havayolunu güvene al; TSH, sT4, sT3, kortizol + AKG/glukoz/Na⁺ kanlarını al (sonucu BEKLEME!).',
              severity: 'CRITICAL'
            },
            {
              badge: '5–15. Dakika (Steroid → T4)',
              target: 'ÖNCE Hidrokortizon 100 mg IV → SONRA Levotiroksin (TR: NG/OG Oral LT4)',
              presentation: 'Vazopressöre dirençli şok, düşük voltajlı EKG / uzun QT, eşlik eden olası adrenal yetmezlik.',
              intervention: 'ÖNCE İV Hidrokortizon 100 mg bolus (TR’de dönemsel stok yoksa geçici İV Metilprednizolon/Deksametazon köprü) → ardından TR birincil pratik: NG/OG tüpten ezilmiş oral LT4 300–500 mcg (yaşlı/KAH: 200–300 mcg; pediatri <40 kg: 5–10 mcg/kg, NG maks 300 / IV maks 200 mcg) [ATA 2014 uluslararası: İV T4 200–400 mcg ± İV T3 5–20 mcg — TR’de İV T4/T3 rutin stokta YOKTUR!].',
              severity: 'CRITICAL'
            },
            {
              badge: '15–60. Dakika (Pasif Isıtma & Metabolik)',
              target: 'Rewarming Shock Önleme, Hiponatremi & Sepsis',
              presentation: 'Hipotermi <34°C, Na⁺ <120–125 mEq/L, hipoglisemi, gizli ateşsiz enfeksiyon ve olası perikardiyal efüzyon.',
              intervention: 'Yalnızca PASİF ısıtma (≤0,5°C/sa), Noradrenalin köprüleme, POCUS (tamponad dışla), Dekstroz (%10/%20/%30), ağır Na⁺ <120’de kontrollü %3 NaCl (≤6–8 mEq/L/24 sa) + ampirik antibiyotik!',
              severity: 'HIGH'
            }
          ]
        },
        comparisonTable: {
          title: 'İntraoperatif Miksödem Koması vs Adrenal Kriz vs Septik Şok vs Opioid Doz Aşımı',
          columns: ['Klinik Özellik', 'Miksödem Koması', 'Adrenal Kriz', 'Septik Şok', 'Opioid / Anestezik Fazlalığı'],
          rows: [
            {
              col1: 'Vücut Sıcaklığı',
              col2: 'Derin hipotermi (<35°C; enfeksiyonda bile ateşsiz!)',
              col3: 'Sıklıkla ateş (açıklanamayan) veya normotermi',
              col4: 'Ateş (>38,3°C) veya ileri evrede hipotermi',
              col5: 'Hafif perioperatif hipotermi (aktif ısıtmaya yanıtlı)'
            },
            {
              col1: 'Kalp Hızı & EKG',
              col2: 'Belirgin bradikardi + düşük voltaj + uzun QTc + perikard sıvısı',
              col3: 'Taşikardi (nadiren hiperkalemide bradiaritmi)',
              col4: 'Belirgin taşikardi, hiperdinamik başlangıç',
              col5: 'Normal veya hafif bradikardi; normal voltaj'
            },
            {
              col1: 'Solunum & Havayolu',
              col2: 'Ağır hipoventilasyon + CO₂ narkozu + makroglossi/zor havayolu',
              col3: 'Takipne (metabolik asidoz kompansasyonu)',
              col4: 'Takipne, ARDS eğilimi',
              col5: 'Bradipne, miyotik pupiller; Naloksona hızlı yanıt'
            },
            {
              col1: 'Elektrolit & Glukoz',
              col2: 'Dilüsyonel hiponatremi (K⁺ genelde normal) + hipoglisemi',
              col3: 'Primerde ↓Na⁺ + ↑K⁺ + metabolik asidoz + ↓glukoz',
              col4: 'Laktik asidoz, stres hiperglisemisi (geç dönemde ↓glukoz)',
              col5: 'Genellikle normal (respiratuvar asidoz)'
            },
            {
              col1: 'Hayat Kurtarıcı İlk Adım',
              col2: 'ÖNCE İV Hidrokortizon 100 mg → TR: NG/OG oral LT4 300–500 mcg (ATA 2014 İV T4 200–400 mcg TR’de yok) + PASİF ısıtma',
              col3: 'İV Hidrokortizon 100 mg + 1 L %0,9 NaCl + Dekstroz',
              col4: 'Erken antibiyotik + 30 mL/kg kristaloid + Noradrenalin',
              col5: 'Ventilasyon desteği + Nalokson titre (40–100 mcg IV)'
            }
          ]
        },
        drugPolicyCards: {
          title: 'Miksödem Komasında Kritik İlaç, Isıtma & Anestezi Politikaları',
          items: [
            {
              domain: 'Önce İV Hidrokortizon (ATA 2014 Altın Kuralı)',
              recommendation: 'Tiroid hormonundan ÖNCE veya EŞZAMANLI 100 mg IV Hidrokortizon bolus → 50–100 mg/6–8 sa ver (TR’de dönemsel stok yoksa geçici köprü: İV Metilprednizolon/Deksametazon).',
              rationaleAndCaution: 'T4/T3 kortizol yıkımını hızlandırır; eşlik edebilecek primer veya sekonder adrenal yetmezlikte steroidsiz tiroid hormonu ölümcül adrenal krizi tetikler.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'TR’de NG/OG Oral LT4 Ön Planda · Yaşlı/KAH & Pediatri Tavanı',
              recommendation: 'Türkiye’de İV T4 ve İV T3 rutin stokta YOKTUR — NG/OG tüpten ezilmiş oral LT4 300–500 mcg yükle (yaşlı/KAH: 200–300 mcg; pediatri <40 kg: 5–10 mcg/kg, IV maks 200 / NG maks 300 mcg tavanı + Pediatrik Endokrinoloji).',
              rationaleAndCaution: 'ATA 2014 İV T4 (200–400 mcg) ve İV T3 (5–20 mcg) önerir ancak TR’de rutin temini yoktur. Miksödem ileusunda NG emilimi öngörülemez olduğundan yakın sT4/klinik takip şarttır; yaşlı/KAH hastasında agresif T4/T3 yüklemesi akut MI ve malign aritmi tetikler.',
              status: 'CAUTION'
            },
            {
              domain: 'Agresif Aktif Eksternal Isıtma (Rewarming Shock!)',
              recommendation: 'Zorlamalı yüksek ısı aktif eksternal ısıtmadan KESİNLİKLE KAÇIN — yalnızca pasif ısıtma (≤0,5°C/sa) uygula!',
              rationaleAndCaution: 'Aktif cilt ısıtması telafi edici periferik vazokonstriksiyonu hızla bozar; artmış doku O₂ talebiyle birleşince refrakter hipotansiyon ve kardiyovasküler kollaps ("rewarming shock") gelişir.',
              status: 'AVOID'
            },
            {
              domain: 'Opioid, Sedatif & Hipotonik Sıvı Kısıtlaması',
              recommendation: 'Standart tam doz uzun etkili opioid/benzodiazepinden ve hipotonik sıvı yüklemesinden kaçın; BIS eşliğinde minimum doz kısa etkili ajan seç.',
              rationaleAndCaution: 'Hipotiroidide MAC ve ilaç klirensi belirgin azalır (uzamış koma/apne!); serbest su atılımı bozuk olduğundan fazla hipotonik sıvı derin hiponatremiyi ve beyin ödemini ağırlaştırır.',
              status: 'AVOID'
            }
          ]
        },
        preventionBox: {
          title: 'Hipotiroidi Hastasında Perioperatif Miksödem Koması Önleme Kontrol Listesi',
          highlightRule: 'PREOP KURALI: Elektif cerrahi ağır/dekompanse semptomatik hipotiroidide (veya çok düşük sT4 + klinik bulgu) ERTELENİP ötiroidi sağlanmalıdır! Acil cerrahide ise indüksiyondan hemen önce İV Hidrokortizon + Levotiroksin (TR’de NG/OG oral LT4; varsa ATA 2014 İV T4) + zor havayolu/BIS hazırlığı yapılır.',
          checks: [
            'Levotiroksin Uzun Yarı Ömrü (~7 gün): Oral T4 ameliyat sabahı (az suyla) devam edilmelidir; postop 5–7 günden uzun NPO kalacaksa ATA 2014 günlük oral dozun ~%75–80’i İV T4 önerir — ancak Türkiye’de İV T4 rutin stokta olmadığından NG/OG tüpten oral LT4 devamı + endokrinoloji koordinasyonu planlanır.',
            'Hafif-Orta (Subklinik / Kompanse) Hipotiroidi: Elektif cerrahiyi iptal etmek gerekmez; ancak ağır semptomatik hipotiroidi (hipotermi, bradikardi, hiponatremi, perikard efüzyonu, letarji) elektif cerrahi için MUTLAK ERTELEME nedenidir.',
            'Anestezi Planı: Mümkünse rejiyonal/lokal anestezi seç; genel anestezi şartsa videolaringoskop + küçük ETT, BIS monitörizasyonu, ısı koruması (pasif), minimum doz kısa etkili ajanlar ve indüksiyonda hemodinami dostu Ketamin/Etomidat kullan.',
            'Ağrı Kontrolü: Uzun etkili sistemik opioidler yerine multimodal opioid-tasarruflu analjezi (parasetamol, periferik sinir bloğu, lokal infiltrasyon) uygula.'
          ]
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Tiroid hormonları (T4 ve hücresel düzeyde aktif T3) nükleer tiroid hormon reseptörlerine bağlanarak Na⁺/K⁺-ATPaz aktivitesini, mitokondriyal oksidatif fosforilasyonu, bazal termogenezi, miyokardiyal β₁-adrenerjik reseptör ekspresyonunu ve solunum merkezinin CO₂/hipoksi duyarlılığını düzenler. Ağır eksiklikte metabolik hız çöker, glikozaminoglikan (mukopolisakkarit) birikimiyle interstisyel "non-pitting" miksödem (dil, larinks, miyokard, perikard) gelişir ve çoklu organ dekompansasyonu başlar.',
      stepsTitle: 'Ağır T3/T4 Eksikliği → Çoklu Sistem Çöküşü & Rewarming Shock Kaskadı',
      flowType: 'vicious-cycle',
      cycleWarning: 'Hipoventilasyon (CO₂ narkozu) + hipotermi + hiponatremi + hipoglisemi + azalmış serebral perfüzyon birbirini besleyerek derin komaya ve vazopressöre dirençli kardiyovasküler kollapsa yol açar!',
      cascadeSteps: [
        {
          phase: '1. Hücresel Hipometabolizma & Termogenez Kaybı',
          mechanism: 'Na⁺/K⁺-ATPaz ve mitokondriyal ısı üretiminin çökmesi derin hipotermi (<35°C) yaratır; soğuk ameliyathane ve anestezikler bu çöküşü hızlandırır.',
          badge: 'HİPOTERMİ',
          color: 'cyan'
        },
        {
          phase: '2. Miyokardiyal Depresyon & α-Vazokonstriksiyon Dengesi',
          mechanism: 'β₁-reseptör down-regülasyonu ve miyokard miksödemi sonucu bradikardi, düşük atım hacmi, uzun QTc ve perikardiyal efüzyon gelişir; kan basıncı kırılgan bir periferik vazokonstriksiyonla tutulur (aktif ısıtma bu dengeyi yıkar!).',
          badge: 'BRADİKARDİ & ŞOK',
          color: 'purple'
        },
        {
          phase: '3. Santral Solunum Merkezi Baskılanması & Laringeal Miksödem',
          mechanism: 'Hipoksik/hiperkapnik dürtü silinir, solunum kasları zayıflar ve makroglossi/larinks ödemi üst havayolunu daraltır; opioid/anestezikler hızla CO₂ narkozu ve apne tetikler.',
          badge: 'CO₂ NARKOZU',
          color: 'amber'
        },
        {
          phase: '4. SIADH, ↓GFR, Hipoglisemi & Kortizol Etkileşimi',
          mechanism: 'Azalmış renal perfüzyon ve uygunsuz ADH salınımı serbest su atılımını bozarak dilüsyonel hiponatremi yaratır; glukoneogenez azalır. Steroidsiz T4 verildiğinde hızlanan kortizol klirensi akut adrenal krizi patlatır.',
          badge: 'HİPONATREMİ / KOMA',
          color: 'red'
        }
      ],
      summaryText: 'Miksödem koması yalnızca bir "tiroid hormonu eksikliği" değil; havayolu, solunum, dolaşım, termoregülasyon, su-elektrolit ve adrenal aksın eşzamanlı çöküşüdür. Bu nedenle tedavi sırası değişmez: ABC → Önce IV Hidrokortizon → Sonra Levotiroksin (TR’de NG/OG ezilmiş oral LT4; uluslararası ATA 2014 İV T4) → Pasif Isıtma & Kontrollü Sıvı.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'Preop veya indüksiyonda belirgin kuru/kaba cilt, periorbital ödem, kalın ses, makroglossi (büyük dil) ve açıklanamayan sinüs bradikardisi',
        'Standart dozlardan çok düşük anestezik/opioid miktarlarıyla derin hipotansiyon ve uzun süreli apne',
        'Ameliyathanede ısıtma önlemlerine rağmen hızla düşen vücut çekirdek sıcaklığı (<35,5°C)',
        'Preop veya intraop kan gazında açıklanamayan hiponatremi (Na⁺ <130 mEq/L) ve hafif hipoglisemi'
      ],
      progressingSigns: [
        'İnatçı bradikardi (<45–50/dk) ve standart sıvı/vazopressörlere zayıf yanıtlı refrakter hipotansiyon',
        'EKG’de düşük QRS voltajı, yaygın T dalga düzleşmesi/inversiyonu ve uzamış QTc (>500 ms)',
        'Volatil anestezikler kesilmesine rağmen derin BIS değerlerinin ve spontan solunumun geri dönmemesi',
        'Yükselen PaCO₂ (hiperkapni / CO₂ narkozu), respiratuvar asidoz ve derinleşen hipotermi (<34°C)'
      ],
      lateSigns: [
        'Gecikmiş uyanma, derin koma, ağrılı uyarana yanıtsızlık ve hiponatremi/hipoksiye bağlı nöbet',
        'Kardiyak tamponada ilerleyen masif perikardiyal efüzyon, yüksek dereceli AV blok veya Torsades de Pointes',
        'Agresif dış ısıtma sonrası ani vazodilatasyon ve "rewarming shock" kardiyovasküler kollapsı',
        'Steroidsiz T4 başlanması sonrası fulminan adrenal kriz ve çoklu organ yetmezliği'
      ],
      specialAlertTitle: 'İki Ölümcül Hata: Steroidsiz T4 ve Agresif Aktif Isıtma!',
      specialAlertContent: '1) Eşlik eden adrenal yetmezlik dışlanmadan (yani İV Hidrokortizon 100 mg verilmeden) T4/T3 başlamak, kortizol yıkımını hızlandırarak ölümcül adrenal krizi tetikler! 2) Hipotermiyi hızlı düzeltmek için yüksek ısılı zorlamalı aktif dış ısıtma uygulamak, hastayı ayakta tutan periferik vazokonstriksiyonu bozarak ani "rewarming shock" ve kardiyak kollaps yaratır — YALNIZCA PASİF ISITMA!'
    },

    // 7) Önleyici Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Ağır semptomatik hipotiroidisi (hipotermi, bradikardi, hiponatremi, perikard efüzyonu, mental yavaşlama) olan hastalarda elektif cerrahi MUTLAKA ertelenmeli ve ötiroidi sağlanmalıdır.',
        'Hipotiroidi öyküsü olan hastada otoimmün poliglandüler sendrom veya hipofizer patoloji (sekonder hipotiroidi + sekonder adrenal yetmezlik) olasılığı preop sorgulanmalıdır.',
        'Makroglossi, geniş boyun/guatr ve laringeal miksödem açısından kapsamlı zor havayolu değerlendirmesi yapılmalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Hipotiroidi / Miksödem Riskli Hastada Güvenli Anestezi Kurulumu',
        steps: [
          'Zor havayolu arabası (videolaringoskop, buji, fiberoptik, küçük çaplı ETT 6,0–7,0 mm) ve çekirdek sıcaklık probu (özofageal/mesane) hazır edilmelidir.',
          'İnvaziv arteriyel monitörizasyon (sık AKG/Na⁺/glukoz ve anlık KB takibi) ve derinlik monitörü (BIS) indüksiyon öncesi kurulmalıdır.',
          'Ameliyathane sıcaklığı yüksek tutulmalı, tüm IV sıvılar ısıtılmış olmalı ancak hipotermik miksödem hastasında agresif sıcak hava üfleyicilerle hızlı dış ısıtma YAPILMAMALIDIR.',
          'İndüksiyonda miyokard depresanı yüksek doz Propofol yerine hemodinamiyi koruyan düşük doz Ketamin veya Etomidat (dikkat: Etomidat steroid supresyonu yapacağından mutlaka IV Hidrokortizon eşliğinde!) tercih edilmelidir.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Opioid-tasarruflu multimodal analjezi ve mümkün olan her olguda rejiyonal/lokal anestezi tekniklerinin seçilmesi',
        'Uzun etkili sedatiflerden (Midazolam/Lorazepam) ve yüksek doz uzun etkili opioidlerden (Morfin/Meperidin) kaçınılması',
        'Acil cerrahiye alınan ağır hipotiroidi hastasında indüksiyon öncesi profilaktik IV Hidrokortizon 100 mg + Levotiroksin (TR’de NG/OG oral LT4; varsa İV T4) planının endokrinoloji ile koordine edilmesi'
      ],
      cartTitle: 'Miksödem Koması Acil İlaç & Müdahale Hazırlık Listesi:',
      cartChecklist: [
        'Hidrokortizon 100 mg IV Flakon (EN ÖNCE VERİLECEK İLAÇ! TR’de dönemsel tedarik sıkıntısı varsa geçici köprü: Metilprednizolon/Deksametazon)',
        'NG/OG Tüp + Oral Levotiroksin Tablet (TR birincil pratiği: 300–500 mcg ezilmiş yükleme; İV T4 ve İV T3 Türkiye’de rutin stokta YOKTUR)',
        'Videolaringoskop + Küçük Çaplı ETT (6,0–7,0 mm) + Buji (Makroglossi / Laringeal Miksödem)',
        'Noradrenalin İnfüzyonu + %10/%20/%30 Dekstroz (TR stokları) + %3 Hipertonik NaCl (Ağır semptomatik Na⁺ <120 için)',
        'Yatak Başı POCUS / EKO Cihazı (Perikardiyal efüzyon / tamponad & LV değerlendirmesi)',
        'Pasif Isıtma Malzemeleri (Ilık battaniyeler, sıvı ısıtıcı) + Geniş Spektrumlu Ampirik Antibiyotikler'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Miksödem koması tanılı veya şüpheli tüm hastalar kesinlikle Yoğun Bakım Ünitesinde (YBÜ) mekanik ventilasyon, sürekli EKG/invaziv arter monitörizasyonu ve endokrinoloji ortak takibinde en az 48–72 saat (klinik ve metabolik stabilizasyon sağlanana dek) izlenmelidir.',
      recurrenceRate: 'İlk 24–72 saatte tiroid hormonunun doku düzeyinde etkisi kademeli başlar; erken ekstübasyon, eksik steroid kapsamı veya tedavi edilmemiş gizli sepsis klinik çöküşün nüksetmesine yol açar.',
      recurrenceRiskBadge: 'HORMON YANITI 24–72 SAAT · ERKEN EKSTÜBASYON YAPMA',
      maintenanceTherapy: 'Günlük 50–100 mcg NG/OG Levotiroksin (veya varsa İV; GİS motilitesi tam dönünce ~1,6 mcg/kg/gün oral), adrenal yetmezlik dışlanana dek IV Hidrokortizon 50–100 mg/6–8 sa, pasif ısıtma, sıvı kısıtlaması (hiponatremi ≤6–8 mEq/L/24 sa), ampirik antibiyotik ve kademeli mekanik ventilasyon ayrılması.',
      monitoringParameters: [
        'Sürekli EKG (QTc süresi, bradikardi/AV blok, T4/T3 sonrası yeni iskemi veya taşiaritmi!) ve seri Troponin',
        'Saatlik çekirdek vücut sıcaklığı (hedef ≤0,5°C/saat yavaş yükselme) ve saatlik idrar çıkışı',
        'Her 4–6 saatte bir serum Na⁺ (24 saatlik artış ≤6–8 mEq/L!) ve 2–4 saatte bir kan şekeri',
        'Seri arteriyel kan gazı (PaCO₂ düzelmesi ve spontan solunum mekaniği) — ancak tam uyanıklık, normotermi ve yeterli kas gücü dönünce ekstübasyon',
        '24–48 saatte bir serbest T4/T3 trendi (TSH’nin normale dönmesi haftalar alır, akut takipte sT4/sT3 ve klinik düzelme esas alınır!)'
      ],
      expectedComplications: [
        'Agresif T4/T3 yüklemesine bağlı akut miyokard enfarktüsü, atriyal fibrilasyon veya ventriküler aritmi',
        'Agresif aktif eksternal ısıtmaya bağlı "rewarming shock" ve kardiyovasküler kollaps',
        'Hiponatreminin aşırı hızlı düzeltilmesine (>8 mEq/L/24 sa) bağlı Ozmotik Demiyelinizasyon Sendromu (ODS)',
        'Steroidsiz T4 başlanmasına sekonder akut adrenal kriz',
        'Perikardiyal tamponad, uzamış mekanik ventilasyon/VAP, GİS ileus/kanama ve çoklu organ yetmezliği'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'Bazal Serum TSH, Serbest T4 (sT4) ve Serbest T3 (sT3)',
          description: 'Primer hipotiroidide çok yüksek TSH + çok düşük sT4/sT3; santral/hipofizer hipotiroidide ise düşük/uygunsuz normal TSH + çok düşük sT4 görülür.'
        },
        {
          testName: 'Bazal Serum Kortizol & ACTH (+ Stabilizasyon Sonrası Cosyntropin Testi)',
          description: 'Eşlik eden primer veya sekonder adrenal yetmezliği doğrulamak veya dışlamak (steroidin güvenle kesilebilmesi) için gereklidir (TR’de Synacthen/Cosyntropin dönemsel tedarik sıkıntısı yaşayabilir).'
        },
        {
          testName: 'Transtorasik Ekokardiyografi (TTE) & Enfeksiyon Taraması',
          description: 'Perikardiyal efüzyon/tamponad, sol ventrikül disfonksiyonu ve altta yatan ateşsiz pnömoni/sepsisin kesin saptanması.'
        }
      ],
      prognosisSummary: 'Miksödem koması en yüksek mortaliteli (%25–50) perioperatif endokrin acillerden biridir. İleri yaş, derin hipotermi (<34°C), bradikardi, sepsis ve gecikmiş steroid/T4 tedavisi kötü prognoz göstergeleridir; buna karşın erken tanı, önce Hidrokortizon + sonra Levotiroksin (TR’de NG/OG oral LT4), pasif ısıtma ve sabırlı YBÜ ventilasyon desteği sağkalımı dramatik artırır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'ATA 2014 Altın Kuralı: Tiroid Hormonundan ÖNCE İV Hidrokortizon 100 mg!',
        takeaway: 'T4/T3 metabolizmayı hızlandırıp kortizol klirensini artırdığı için, eşlik edebilecek primer veya sekonder adrenal yetmezliği patlatmamak adına bazal kan alındıktan sonra tiroid hormonundan ÖNCE (veya eşzamanlı) MUTLAKA İV Hidrokortizon 100 mg bolus → 50–100 mg/6–8 sa verilir!',
        category: 'Kritik Doz'
      },
      {
        title: 'Agresif Aktif Dış Isıtma = "Rewarming Shock" (Kardiyovasküler Kollaps)!',
        takeaway: 'Miksödem hastası tansiyonunu yoğun periferik vazokonstriksiyonla ayakta tutar. Sıcak hava battaniyesiyle hızlı aktif ısıtma yaparsanız periferik damarlar aniden açılır ve hasta derin şoka/arreste girer. YALNIZCA PASİF ISITMA (ılık battaniye, oda ısısı, ≤0,5°C/sa) uygulayın!',
        category: 'Tuzak'
      },
      {
        title: 'TR Pratiği (NG/OG Oral LT4) & Yaşlı/KAH Hastasında Düşük Doz Sınırı!',
        takeaway: 'Türkiye’de İV T4 ve İV T3 ticari/rutin stokta yoktur — birincil yol NG/OG tüpten ezilmiş oral Levotiroksin 300–500 mcg’dir (yaşlı/KAH’ta 200–300 mcg; uluslararası ATA 2014 İV 200–400 mcg). Pediatride (<40 kg) erişkin yaşlı tavanı (IV 200 / NG 300 mcg) ASLA aşılmaz; aşırı hızlı yükleme akut MI ve malign aritmi tetikler!',
        category: 'Kritik Doz'
      },
      {
        title: 'Ateş Olmaması Enfeksiyonu Dışlamaz & Makroglossi Zor Havayolu Yapar!',
        takeaway: 'Miksödem komasında bazal termogenez çöktüğü için ağır pnömoni/sepsis bile ATEŞSİZ (hatta normotermik/hipotermik!) seyreder — ampirik antibiyotiği unutmayın. Aynı zamanda makroglossi ve laringeal miksödem nedeniyle her vakaya videolaringoskop + küçük ETT (6,0–7,0 mm) ile yaklaşın!',
        category: 'Ezber Bozan'
      },
      {
        title: 'Laboratuvar Sonucunu Bekleme & Hiponatremiyi Yavaş Düzelt (≤6–8 mEq/L/24 sa)!',
        takeaway: 'Klinik şüphede TSH/sT4/kortizol kanını alıp sonucu beklemeden tedaviye başlayın. Dilüsyonel hiponatremide (SIADH + ↓GFR) sıvı kısıtlayın; ağır semptomatik Na⁺ <120’de %3 NaCl verirken Ozmotik Demiyelinizasyon Sendromu (ODS) önlemi için 24 saatte ≤6–8 mEq/L sınırını asla aşmayın!',
        category: 'Sınav / Klinik Notu'
      }
    ],

    // 10) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'Jonklaas J, Bianco AC, Bauer AJ, Burman KD, Cappola AR, Celi FS, et al.; American Thyroid Association Task Force.',
        title: 'Guidelines for the Treatment of Hypothyroidism: Prepared by the American Thyroid Association Task Force on Thyroid Hormone Replacement.',
        journal: 'Thyroid. 2014;24(12):1670–1751.',
        year: '2014',
        relevance: 'Miksödem komasında tiroid hormonu öncesi ampirik IV Hidrokortizon zorunluluğu, IV Levotiroksin (200–400 mcg yükleme → 50–100 mcg/gün) ve Liyotironin (T3) doz önerilerinin temel kılavuzu.'
      },
      {
        authors: 'Popoveniuc G, Chandra T, Sud A, Sharma M, Blackman MR, Burman KD, Mete M, Desale S, Wartofsky L.',
        title: 'A Diagnostic Scoring System for Myxedema Coma.',
        journal: 'Endocrine Practice. 2014;20(8):808–817.',
        year: '2014',
        relevance: 'Miksödem koması klinik tanı skorlama sistemi (≥60 yüksek olasılık; 25–59 risk/başlangıç) ve yatak başı erken tanı kriterleri.'
      },
      {
        authors: 'Wartofsky L.',
        title: 'Myxedema Coma.',
        journal: 'Endocrinology and Metabolism Clinics of North America. 2006;35(4):687–698.',
        year: '2006',
        relevance: 'Pasif ısıtma vs rewarming shock mekanizması, ventilatuvar yetmezlik, hiponatremi yönetimi ve yoğun bakım ilkeleri.'
      },
      {
        authors: 'Mathew V, Misgar RA, Ghosh S, Mukhopadhyay P, Roychowdhury P, Pandit K, Mukhopadhyay S, Chowdhury S.',
        title: 'Myxedema Coma: A New Look into an Old Crisis.',
        journal: 'Journal of Thyroid Research. 2011;2011:493462.',
        year: '2011',
        relevance: 'Cerrahi/anestezik tetikleyiciler, ateşsiz enfeksiyon sunumu, makroglossi/zor havayolu ve %25–50 mortalite belirleyicileri.'
      },
      {
        authors: 'Hines RL, Jones SB (Eds.) & Gropper MA, Cohen NH, et al.',
        title: "Stoelting's Anesthesia and Co-Existing Disease (8th Ed.) & Miller's Anesthesia (9th/10th Eds.) — Endocrine Disease & Hypothyroidism.",
        journal: 'Elsevier.',
        year: '2020–2024',
        relevance: 'Hipotiroidide azalmış MAC/ilaç klirensi, perioperatif erteleme kriterleri ve anestezi yönetimi.'
      }
    ],
    relatedLinks: [
      { label: 'İntraoperatif Adrenal Kriz Protokolü', href: '#arac=emergencies&sub=adrenal-crisis', badge: 'Önce Steroid!' },
      { label: 'Gecikmiş Uyanma (Emergence Delay) Protokolü', href: '#arac=emergencies&sub=emergence-delay', badge: 'Uyanmama' },
      { label: 'İntraoperatif Bradikardi Protokolü', href: '#arac=emergencies&sub=intraop-bradycardia', badge: 'Ritim' },
      { label: 'İntraoperatif Hipotansiyon (IOH) Protokolü', href: '#arac=emergencies&sub=hypotension', badge: 'Refrakter Şok' },
      { label: 'İntraoperatif Hipoglisemi Kriz Protokolü', href: '#arac=emergencies&sub=intraop-hypoglycemia', badge: 'Metabolik' }
    ]
  },

  'pheochromocytoma-crisis': {
    id: 'pheochromocytoma-crisis',
    // 1) Başlık
    title: 'İntraoperatif Feokromositoma Krizi (Katekolamin Fırtınası & Post-Rezeksiyon Vazopleji)',
    subTitle: 'Bifazik Kriz: Faz 1 Ekstrem Hipertansiyon/Aritmi → Faz 2 Ven Ligasyonu Sonrası Vazopleji & Hipoglisemi',
    codeColor: 'rose',
    severityBadge: 'KOD KIRMIZI / BİLATERAL FAZ · ÖNCE α-BLOKAJ — TEK BAŞINA β-BLOKER/LABETALOL YASAK!',
    keyCallout: 'Feokromositoma/paraganglioma cerrahisinde veya TANISIZ insidentalomada indüksiyon, laringoskopi, pnömoperitonyum veya tümör manipülasyonuyla patlayan BİFAZİK KRİZ! FAZ 1 (Ven Ligasyonu Öncesi): Ekstrem HT (>220–260 mmHg), VT/taşiaritmi, flash akciğer ödemi/Takotsubo → Cerrahi manipülasyonu DURDUR; Türkiye pratiğinde öncelikle Nikardipin (5–15 mg/sa), Sodyum Nitroprussid (0,3–2 mcg/kg/dk), Magnezyum Sülfat (2–4 g IV → 1–2 g/sa), Nitrogliserin veya varsa Urapidil / Fentolamin (1–5 mg IV — birçok merkezde YOK; Klevidipin TR’de ruhsatlı DEĞİL!) ver! Yeterli α-blokaj/vazodilatasyon olmadan ASLA tek başına β-bloker veya IV Labetalol (α:β = 1:7!) VERME! FAZ 2 (Ven Ligasyonu Sonrası): Tüm vazodilatatörleri KAPAT, agresif sıvı + Noradrenalin + varsa Vazopressin (0,01–0,04 IU/dk; TR’de yoksa yüksek doz NA + Terlipressin!) başlat ve 30–60 dk’da bir KAN ŞEKERİ izle (rebound hipoglisemi)!',
    quickCalculatorType: 'pheochromocytoma-crisis',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'İntraoperatif feokromositoma krizi; adrenal medulladan veya ekstra-adrenal kromaffin dokudan (paraganglioma) kaynaklanan katekolamin salgılayan tümörlerin cerrahi rezeksiyonu sırasında — ya da tanı konmamış "insidental" bir tümörü olan hastanın başka bir ameliyatında — ani, masif adrenalin/noradrenalin deşarjıyla gelişen ve iki zıt hemodinamik evreden (Faz 1: Hipertansif Katekolamin Fırtınası → Faz 2: Tümör Ven Ligasyonu Sonrası Refrakter Vazopleji ve Rebound Hipoglisemi) oluşan ölümcül endokrin-kardiyovasküler acildir.',
      epidemiology: 'Feokromositoma hipertansif hastaların %0,1–0,6’sında görülür; ancak otopsi serilerinde olguların önemli bir kısmı yaşam boyu tanı almamıştır. Preoperatif uygun α-blokaj ve volüm ekspansiyonu ile elektif adrenalektomide perioperatif mortalite %20–45’lerden <%1–2’ye düşmüştür. Buna karşın tanı konmamış bir feokromositomada genel anestezi/cerrahi sırasında patlayan beklenmedik krizin mortalitesi hâlen %25–50 düzeyindedir!',
      triggers: [
        'İndüksiyon, Doğrudan Laringoskopi, Endotrakeal Entübasyon ve Yetersiz Anestezi Derinliği / Ağrı',
        'Laparoskopide Karbondioksit Pnömoperitonyumu (İntraabdominal Basınç Artışı + Hiperkapni) ve Cerrahi Tümör Manipülasyonu',
        'KESİN KAÇINILACAK TETİKLEYİCİ İLAÇLAR: Metoklopramid (D2 antagonisti → şiddetli katekolamin deşarjı!), Droperidol, Morfin & Atrakuryum (histamin salınımı!), Desfluran (sempatik aktivasyon!), Ketamin, Efedrin, Süksinilkolin (fasikülasyonla tümöre mekanik bası!) ve Glukagon',
        'ÖLÜMCÜL HATA — Karşılanmamış β-Blokaj: Yeterli α-blokaj/vazodilatasyon sağlanmadan verilen saf β-bloker (Esmolol, Metoprolol, Propranolol) veya α:β oranı 1:7 olan IV Labetalol → β₂-vazodilatasyonun kaybıyla karşılanmamış α₁-vazokonstriksiyon ve akut akciğer ödemi!',
        'Faz 2 Tetikleyicisi: Adrenal ven ligasyonuyla tümörün dolaşımdan aniden kesilmesi + kronik down-regüle α-reseptörler + preop uzun etkili α-blokaj (Fenoksibenzamin) + göreceli hipovolemi'
      ],
      safeAgents: [
        'Faz 1 — Direkt Arteriyel Vazodilatatörler & α-Blokerler (TR Stok Önceliği): Nikardipin (5–15 mg/sa), Sodyum Nitroprussid (0,3–2 mcg/kg/dk, kısa pik maks 3–5 mcg/kg/dk), Nitrogliserin (5–200 mcg/dk) ve varsa Urapidil / Fentolamin (1–5 mg IV bolus — birçok merkezde bulunmaz) [Uluslararası kılavuzlardaki Klevidipin (1–16 mg/sa) Türkiye’de ruhsatlı/mevcut değildir!]',
        'Faz 1 — Çok Yönlü Köşe Taşı: Magnezyum Sülfat (2–4 g [40–60 mg/kg] IV 10–15 dk yükleme → 1–2 g/sa infüzyon) — adrenal medulladan katekolamin salınımını inhibe eder + direkt arteriyel vazodilatatör + güçlü antiaritmik!',
        'Faz 1 — Yalnızca α-Blokaj SONRASI Taşiaritmi Kontrolü: Ultra kısa etkili β₁-bloker Esmolol (0,5 mg/kg bolus → 50–200 mcg/kg/dk; α-blokaj sağlanmış olmak şartıyla!) veya Lidokain/Amiodaron (malign VT)',
        'Faz 2 (Ven Ligasyonu Sonrası Vazopleji): Tüm vazodilatatörleri DERHAL kapat → agresif dengeli kristaloid + Noradrenalin infüzyonu → katekolamin-dirençli vazoplejide varsa VAZOPRESSİN (0,01–0,04 IU/dk; V1 reseptörü α-down-regülasyonundan bağımsızdır!) — TR’de Vazopressin/Fenilefrin birçok hastanede bulunmadığından pratikte yüksek doz Noradrenalin + Terlipressin (1 mg bolus / 1–2 mcg/kg/sa) kullanılır!',
        'Güvenli Anestezikler: Propofol / Etomidat, Sevofluran / İsofluran, Fentanil / Remifentanil / Sufentanil, Rokuronyum / Vekuronyum / Sisatrakuryum, Ondansetron (bulantı için Metoklopramid yerine!)',
        'KESİN KAÇINILACAKLAR: Tek başına β-bloker / IV Labetalol (α-blokajsız), Metoklopramid, Droperidol, Morfin, Atrakuryum, Desfluran, Ketamin, Efedrin, Süksinilkolin, Glukagon'
      ],
      mortalityStats: 'Uygun preoperatif α-blokaj ve deneyimli anestezi yönetimiyle elektif feokromositoma cerrahisinde mortalite <%1–2’dir. Ancak tanı konmamış insidental olguda gelişen intraoperatif krizde (özellikle karşılanmamış β-bloker veya Metoklopramid verildiyse) akut sol kalp yetmezliği, intrakraniyal kanama ve kardiyak arrest nedeniyle mortalite %25–50’ye fırlamaktadır.',
      clinicalUrgency: 'Faz 1’de SKB’nin saniyeler içinde 240–300 mmHg’ye fırlaması intrakraniyal kanama, aort diseksiyonu ve flash pulmoner ödem yaratır; Faz 2’de ise adrenal ven klipslendiği saniyede kan basıncı 200’den 50 mmHg’ye çakılabilir. Cerrahla anlık ("ven bağlanıyor!") sözlü iletişim hayat kurtarır.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Tanılı feokromositoma/paraganglioma cerrahisinde kriz, laringoskopi, pnömoperitonyum veya tümör manipülasyonuyla tetiklenen paroksismal hipertansiyon/taşiaritmi (Faz 1) ve adrenal ven ligasyonu sonrası ani vazoplejik şok + hipoglisemi (Faz 2) olarak beklenir. Tanı konmamış hastada ise derin anestezi ve analjeziye rağmen açıklanamayan ekstrem hipertansiyon (>220 mmHg), malign taşiaritmi, ani pembe köpüklü pulmoner ödem veya Metoklopramid/indüksiyon sonrası "fırtına" ile şüphelenilir!',
      clinicalCriteria: [
        'FAZ 1 (Tümör Manipülasyonu / Ven Ligasyonu Öncesi): Saniyeler içinde ekstrem hipertansiyon (SKB >220–260 mmHg, MAP >140 mmHg), şiddetli taşikardi (>140–160/dk) veya refleks bradikardi (saf noradrenalin salgılayan tümörde!)',
        'FAZ 1 Kardiyopulmoner Çöküş: Malign aritmiler (multifokal VES, VT/VF, SVT), ST elevasyonu/depresyonu, ani flash pulmoner ödem (↑Ppeak, ↓SpO₂, pembe köpüklü sekresyon) ve katekolamin kaynaklı Takotsubo (ters/apikal stres) kardiyomiyopatisi',
        'FAZ 1 Metabolik & Serebral İpuçları: Belirgin stres hiperglisemisi (α₂-aracılı insülin baskılanması), laktik asidoz (yoğun vazokonstriksiyon), EtCO₂ artışı (MH taklidi yapabilir!) ve pupiller dilatasyon',
        'FAZ 2 (Adrenal Ven Ligasyonu Sonrası): Dakikalar içinde ani derin refrakter hipotansiyon (vazopleji + göreceli hipovolemi + α-reseptör down-regülasyonu)',
        'FAZ 2 Metabolik Kriz: Katekolaminlerin insülin üzerindeki α₂-baskısının aniden kalkmasıyla REBOUND İNSÜLİN SALINIMI → sessiz, derin POST-REZEKSİYON HİPOGLİSEMİSİ!'
      ],
      gradingScaleTitle: 'İntraoperatif Feokromositoma Krizi Bifazik Evreleme & Hemodinamik Profil',
      gradingScaleSource: 'Endocrine Society Guideline (Lenders et al., JCEM 2014) & BJA Education (2016)',
      larachScale: [
        { category: 'Faz 1A — Katekolamin Deşarjı Başlangıcı', points: 'SKB 180–220', description: 'İndüksiyon, pnömoperitonyum veya tümör dokunmasıyla hızlı KB artışı + taşikardi/VES. Anesteziyi derinleştir, cerraha manipülasyonu durdur de, Nikardipin/SNP/MgSO₄ (varsa Fentolamin/Urapidil) titre et [Klevidipin TR’de yok].' },
        { category: 'Faz 1B — Fulminan Katekolamin Fırtınası', points: 'SKB >220–260', description: 'Ekstrem HT, VT/SVT, akut sol kalp yetmezliği, flash pulmoner ödem veya Takotsubo. Cerrahiyi DURDUR, hızlı etkili IV vazodilatatör (Nikardipin/SNP/Nitrogliserin; varsa Fentolamin) + MgSO₄ yükle!' },
        { category: 'Faz 2A — Adrenal Ven Ligasyonu Geçişi', points: 'Ani MAP Çöküşü', description: 'Ven klipslenmeden 5–10 dk önce vazodilatatörleri azalt/hazırlan; ven kapandığı saniye TÜM vazodilatatörleri kes ve hızlı dengeli kristaloid yükle!' },
        { category: 'Faz 2B — Refrakter Vazopleji & Rebound Hipoglisemi', points: 'MAP <60 + ↓KŞ', description: 'Down-regüle α-reseptörler + preop Fenoksibenzamin etkisiyle Noradrenaline dirençli şok → varsa VAZOPRESSİN (0,01–0,04 IU/dk; TR’de yoksa yüksek doz NA + Terlipressin) ekle ve 30–60 dk’da bir KŞ ölç!' }
      ],
      larachInterpretation: 'İntraoperatif feokromositoma yönetiminde en büyük başarı, Faz 1’de aşırı uzun etkili antihipertansiflerden kaçınmak (yoksa Faz 2 şoku derinleşir!) ve ven ligasyonu anında vazopleji + rebound hipoglisemiye saniyeler içinde geçiş yapmaktır.',
      differentialDiagnosis: [
        {
          condition: 'Malign Hipertermi (MH)',
          differentiatingFactors: 'Feokromositoma krizi taşikardi, hipertansiyon, hipertermi, terleme, asidoz ve artmış EtCO₂ ile MH’yi şaşırtıcı biçimde taklit edebilir! MH’de genel kas rijiditesi/masseter spazmı, hızla >60–80 mmHg fırlayan dirençli EtCO₂ ve CK/miyoglobinüri hakimdir; feokromositomada ise ekstrem SKB (>220–260 mmHg) ve tümör/ilaç tetikleyicisi ön plandadır.'
        },
        {
          condition: 'Tiroid Fırtınası',
          differentiatingFactors: 'Tiroid fırtınasında yüksek ateş (>39–40°C), inatçı atriyal fibrilasyon/sinüs taşikardisi ve geniş nabız basıncı ön plandadır; feokromositomadaki gibi saniyeler içinde 260 mmHg’ye fırlayıp ven ligasyonuyla 50 mmHg’ye çakılan bifazik salınım görülmez.'
        },
        {
          condition: 'Yüzeyel Anestezi / Cerrahi Ağrı / Hiperkapni',
          differentiatingFactors: 'Anestezi derinleştirilmesine (Sevofluran/Propofol + Remifentanil) ve normokapni sağlanmasına rağmen SKB >200–240 mmHg seyrediyorsa (özellikle retroperitoneal/abdominal cerrahide veya Metoklopramid sonrası) tanısız feokromositoma düşünülmelidir!'
        },
        {
          condition: 'İntraoperatif Akut Koroner Sendrom / Anaflaksi (Faz 2’de)',
          differentiatingFactors: 'Faz 1’deki katekolamin fırtınası Takotsubo kardiyomiyopatisi ve tip 2 MI yapabilir (TEE/POCUS ile değerlendir!). Faz 2’de ise vazopleji ven ligasyonuyla eşzamanlıdır; bronkospazm ve ürtiker yoktur.'
        },
        {
          condition: 'İlaç Hatası (Yanlışlıkla Adrenalin / Noradrenalin Bolusu)',
          differentiatingFactors: 'Enjektör ve infüzyon hatları anında kontrol edilmelidir; ilaç hatasına bağlı zirve genellikle 3–5 dk içinde sönümlenir.'
        }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'ACİL BİFAZİK ENDOKRİN KRİZ · FAZ 1: Cerrahi manipülasyonu DURDUR, Nikardipin/SNP/Nitrogliserin (+ varsa Fentolamin/Urapidil) + MgSO₄ ver (α-blokajsız β-bloker/Labetalol YASAK!) · FAZ 2 (Ven Ligasyonu): Vazodilatatörü KAPAT, Sıvı + Noradrenalin (+ Vazopressin/Terlipressin) + 30–60 dk KŞ TAKİBİ!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'FAZ 1 — CERRAHİ MANİPÜLASYONU DERHAL DURDUR & ANESTEZİYİ DERİNLEŞTİR',
          action: 'Cerraha yüksek sesle tümör manipülasyonunu durdurmasını (laparoskopide gerekirse pnömoperitonyum basıncını düşürmesini) söyleyin! %100 O₂’ye geçin; Sevofluran/Propofol + Remifentanil/Fentanil ile anestezi derinliğini hızla artırın (Desfluran ve Ketamin KULLANMA!).',
          criticalNote: 'Tanısız insidentalomada kriz patladıysa: Cerrahi acil değilse tümör biyopsisi/manipülasyonunu DERHAL SONLANDIRIN, hastayı stabilize edin ve elektif α-blokaj sonrası yeniden planlayın!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'FAZ 1 — HIZLI ETKİLİ ARTERİYEL VAZODİLATATÖR / α-BLOKER BAŞLAT (TR PRATİĞİ)',
          action: 'Saniyeler içinde kısa etkili, titre edilebilir IV vazodilatatör başlatın — Türkiye pratiğinde erişilebilir ön saf ajanlar: Nikardipin (5 mg/sa → 15 mg/sa), Sodyum Nitroprussid (0,3–2 mcg/kg/dk; kısa pik maks 3–5 mcg/kg/dk — ışıktan koru, siyanür toksisitesi için uzatma!) ve Nitrogliserin (5–200 mcg/dk); temin edilebilen merkezlerde Urapidil (10–25 mg IV) veya Fentolamin (1–5 mg IV bolus → 0,5–2 mg/dk; birçok merkezde bulunmaz). [Uluslararası kılavuzlardaki Klevidipin Türkiye’de ruhsatlı/mevcut değildir!]',
          criticalNote: 'KESİN KIRMIZI ÇİZGİ (Endocrine Society 2014): Yeterli α-blokaj / direkt arteriyel vazodilatasyon sağlanmadan ASLA tek başına β-bloker (Esmolol/Metoprolol) veya α:β oranı 1:7 olan IV LABETALOL VERMEYİN! Karşılanmamış α₁-vazokonstriksiyon ile ölümcül hipertansif kriz ve flash pulmoner ödem gelişir!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'FAZ 1 — MAGNEZYUM SÜLFAT (MgSO₄) YÜKLE & İNFÜZE ET',
          action: 'Magnezyum Sülfat 2–4 g (40–60 mg/kg) IV 10–15 dakikada yükleme → 1–2 g/sa sürekli infüzyon başlatın (hedef serum Mg²⁺ 2–4 mmol/L; adrenal ven ligasyonunda durdurun!).',
          criticalNote: 'NEDEN MAGNEZYUM? (James & Cronjé, Anesth Analg 2004): MgSO₄ hem adrenal medulladan ve sempatik uçlardan katekolamin salınımını doğrudan inhibe eder, hem direkt arteriyel vazodilatatördür hem de katekolamin aritmilerini baskılar (not: NMB etkisini uzatır, TOF izle!).',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'FAZ 1 — YALNIZCA α-BLOKAJ SONRASI TAŞİARİTMİ KONTROLÜ & AKCİĞER ÖDEMİ',
          action: 'Sadece kan basıncı α-bloker/vazodilatatör ile kontrol altına alındıktan SONRA inatçı taşikardi (>120–130/dk) veya SVT varsa ultra kısa etkili Esmolol (0,5 mg/kg IV → 50–200 mcg/kg/dk) ekleyin. Ventriküler taşikardide Lidokain (1–1,5 mg/kg) veya Amiodaron; flash pulmoner ödem / Takotsubo gelişirse TEE/POCUS yapın, PEEP + vazodilatatör (nitrogliserin/SNP) uygulayın.',
          priority: 'HIGH'
        },
        {
          stepNumber: 5,
          title: 'GEÇİŞ ANI — ADRENAL VEN LİGASYONU ÖNCESİ CERRAHLA SENKRONİZASYON',
          action: 'Cerrah adrenal veni bağlamadan 5–10 dk önce haber vermelidir: Vazodilatatör infüzyonlarını kademeli azaltın, MgSO₄’ü kapatın ve ön-yük (preload) için 500–1000 mL dengeli kristaloid yükleyin; Noradrenalin (ve varsa Vazopressin / Terlipressin) pompalarını hatta hazır bekletin!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 6,
          title: 'FAZ 2 — VEN LİGASYONU SONRASI ANİ VAZOPLEJİ: VAZODİLATATÖRÜ KAPAT & VAZOPRESSÖR BAŞLAT',
          action: 'Adrenal ven klipslendiği anda TÜM vazodilatatörleri derhal kapatın! Derin hipotansiyonda hızlı dengeli kristaloid (toplam 2–4 L gerekebilir; nabız basıncı varyasyonu/TEE ile titre) + Noradrenalin infüzyonu (0,05–0,5 mcg/kg/dk) başlatın.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 7,
          title: 'FAZ 2 — KATEKOLAMİN-DİRENÇLİ VAZOPLEJİDE VAZOPRESSİN / TERLİPRESSİN',
          action: 'Kronik yüksek katekolamin maruziyeti nedeniyle α₁-reseptörleri down-regüle olduğundan ve preop Fenoksibenzamin (irreversibl blok!) sürdüğünden Noradrenalin tek başına yetersiz kalabilir: Varsa erken aşamada VAZOPRESSİN (0,01–0,04 IU/dk IV infüzyon; V1 reseptörü α-down-regülasyonundan etkilenmez!) ekleyin. TR’de Vazopressin ve IV Fenilefrin birçok hastanede bulunmadığından pratikte yüksek doz Noradrenalin titrasyonu + Terlipressin (1 mg IV bolus / 1–2 mcg/kg/sa) veya kurtarma Metilen Mavisi (1–2 mg/kg) değerlendirilir.',
          criticalNote: 'Bilateral adrenalektomi yapıldıysa (veya refrakter şok varsa) derhal İV Hidrokortizon 100 mg bolus + 200 mg/24 sa infüzyon başlatmayı UNUTMAYIN!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 8,
          title: 'FAZ 2 — POST-REZEKSİYON REBOUND HİPOGLİSEMİ TAKİBİ (HER 30–60 DK!)',
          action: 'Tümör ven ligasyonu sonrasında katekolaminlerin pankreatik α₂-reseptörü üzerinden yaptığı insülin baskısı aniden kalkar ve masif rebound insülin salınımı gelişir! Ven ligasyonundan itibaren ilk 24 saat boyunca her 30–60 dk’da bir kan şekeri ölçün; <70–100 mg/dL eğiliminde hemen IV Dekstroz (%10 D) başlatın!',
          priority: 'HIGH'
        }
      ],
      structuredCrisisBlocks: {
        tieredLadder: {
          title: 'Feokromositoma Bifazik Kriz Yönetim Merdiveni (Faz 1 → Geçiş → Faz 2)',
          accent: 'rose',
          levels: [
            {
              badge: 'FAZ 1 — Katekolamin Fırtınası',
              target: 'Ven Ligasyonu Öncesi · Ekstrem HT (>220 mmHg) & VT/SVT',
              presentation: 'İndüksiyon, pnömoperitonyum veya tümör manipülasyonuyla patlayan malign HT, taşiaritmi, flash akciğer ödemi, Takotsubo.',
              intervention: 'Manipülasyonu DURDUR + Nikardipin / SNP / Nitrogliserin (+ varsa Fentolamin/Urapidil; Klevidipin TR’de yok) + MgSO₄ (2–4 g → 1–2 g/sa). α-blokajsız β-bloker/Labetalol YASAK! Yalnızca α-blokaj sonrası Esmolol.',
              severity: 'CRITICAL'
            },
            {
              badge: 'GEÇİŞ — Ven Ligasyonu Anı',
              target: 'Adrenal Ven Klipslemesi (Saniyeler İçinde Faz Değişimi)',
              presentation: 'Cerrahi ekibin "adrenal veni bağlıyoruz" uyarısıyla ani katekolamin kesilmesi beklenir.',
              intervention: 'Tüm vazodilatatörleri ve MgSO₄’ü KAPAT, 500–1000 mL dengeli kristaloid yükle, Noradrenalin (+ varsa Vazopressin / Terlipressin) infüzyonlarını hatta hazırla.',
              severity: 'HIGH'
            },
            {
              badge: 'FAZ 2 — Post-Rezeksiyon Vazopleji & Hipoglisemi',
              target: 'Ven Ligasyonu Sonrası · Refrakter Şok + Rebound İnsülin',
              presentation: 'Down-regüle α-reseptörler + preop α-blokaj + göreceli hipovolemi → derin şok; eşzamanlı sessiz ağır hipoglisemi!',
              intervention: 'Agresif sıvı + Noradrenalin + varsa VAZOPRESSİN (0,01–0,04 IU/dk; yoksa Terlipressin / NA titrasyonu) (+ bilateral cerrahide Hidrokortizon 100 mg IV) + 30–60 dk’da bir KŞ ölçümü ve IV Dekstroz!',
              severity: 'CRITICAL'
            }
          ]
        },
        comparisonTable: {
          title: 'Faz 1 (Katekolamin Fırtınası) & Faz 2 (Vazopleji) Hedefe Yönelik İlaç Kılavuzu',
          columns: ['İlaç / Ajan', 'Faz & Rol', 'Dozaj (Erişkin IV)', 'Etki Mekanizması', 'Kritik Klinik Uyarı'],
          rows: [
            {
              col1: 'Nikardipin [Klevidipin TR’de Yok]',
              col2: 'Faz 1 · Ön Saf Arteriyel Vazodilatatör (TR)',
              col3: 'Nikardipin 5–15 mg/sa [Klevidipin 1–16 mg/sa TR’de ruhsatlı değil]',
              col4: 'Dihidropiridin Ca²⁺ kanal blokeri (selektif arteriyel)',
              col5: 'TR’de en erişilebilir titre edilebilir CCB; ven ligasyonundan 5–10 dk önce azalt!'
            },
            {
              col1: 'Sodyum Nitroprussid (SNP)',
              col2: 'Faz 1 · Ultra Hızlı Kurtarma (TR)',
              col3: '0,3–2 mcg/kg/dk (kısa pik maks 3–5)',
              col4: 'NO donörü (arteriyel + venöz vazodilatasyon)',
              col5: 'Saniyeler içinde etki eder/kesilir (Faz 2’ye sarkmaz!); >2 mcg/kg/dk uzarsa siyanür toksisitesi!'
            },
            {
              col1: 'Magnezyum Sülfat',
              col2: 'Faz 1 · Katekolamin İnhibitörü (TR)',
              col3: '2–4 g IV yükleme (10–15 dk) → 1–2 g/sa',
              col4: 'Adrenal medulladan katekolamin salınımını keser + antiaritmik',
              col5: 'Nöromüsküler bloker etkisini belirgin uzatır (TOF izle); ven ligasyonunda kapat!'
            },
            {
              col1: 'Fentolamin / Urapidil (Varsa)',
              col2: 'Faz 1 · Direkt α-Bloker (Birçok Merkezde Yok)',
              col3: 'Fentolamin 1–5 mg IV bolus (0,5–2 mg/dk); Urapidil 10–25 mg IV',
              col4: 'Kısa etkili kompetitif α₁/α₂ (veya selektif α₁) antagonisti',
              col5: 'TR’de birçok hastanede stokta yok → yoksa Nikardipin + SNP + MgSO₄ + Nitrogliserin öne çıkar'
            },
            {
              col1: 'Noradrenalin + Vazopressin / Terlipressin',
              col2: 'Faz 2 · Refrakter Vazopleji',
              col3: 'NA 0,05–0,5 mcg/kg/dk + Vazopressin 0,01–0,04 IU/dk (yoksa Terlipressin 1 mg)',
              col4: 'V1 reseptörü α-down-regülasyonundan bağımsızdır!',
              col5: 'TR’de Vazopressin/Fenilefrin birçok hastanede yok → yüksek doz NA + Terlipressin kullanılır'
            }
          ]
        },
        drugPolicyCards: {
          title: 'Feokromositoma Krizinde Kesin İlaç Politikaları (Endocrine Society 2014)',
          items: [
            {
              domain: 'Tek Başına β-Bloker veya IV Labetalol (α-Blokajsız)',
              recommendation: 'Yeterli α-blokaj / arteriyel vazodilatasyon sağlanmadan ASLA β-bloker veya IV Labetalol VERME!',
              rationaleAndCaution: 'IV Labetalolün α:β bloke edici oranı yalnızca 1:7’dir! β₂-vazodilatasyonun bloke olmasıyla karşılanmamış α₁-vazokonstriksiyon patlar → malign HT, akut sol kalp yetmezliği ve flash pulmoner ödem!',
              status: 'AVOID'
            },
            {
              domain: 'Tetikleyici İlaç Yasak Listesi',
              recommendation: 'Metoklopramid, Droperidol, Morfin, Atrakuryum, Desfluran, Ketamin, Efedrin, Süksinilkolin ve Glukagondan KESİNLİKLE KAÇIN!',
              rationaleAndCaution: 'Metoklopramid/Droperidol D2 blokajıyla, Morfin/Atrakuryum histaminle, Desfluran/Ketamin/Efedrin sempatik deşarjla, Süksinilkolin ise fasikülasyonla tümöre mekanik bası yaparak fırtına patlatır.',
              status: 'AVOID'
            },
            {
              domain: 'Magnezyum Sülfat + Kısa Etkili Vazodilatatör (Nikardipin / SNP / Nitrogliserin)',
              recommendation: 'TR pratiğinde Faz 1’de MgSO₄ (2–4 g → 1–2 g/sa) + Nikardipin / Sodyum Nitroprussid / Nitrogliserin (varsa Fentolamin/Urapidil; Klevidipin TR’de ruhsatlı değil!) kombinasyonunu tercih et.',
              rationaleAndCaution: 'Kısa yarı ömürlü ajanlar ven ligasyonu anında kapatıldığında saniyeler–dakikalar içinde temizlenerek Faz 2 vazoplejisini ağırlaştırmaz.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Faz 2’de Noradrenalin + Vazopressin / Terlipressin & 30–60 dk KŞ Takibi',
              recommendation: 'Ven ligasyonu sonrası NA-dirençli şokta varsa erken Vazopressin (0,01–0,04 IU/dk), TR’de Vazopressin yoksa Terlipressin (1 mg bolus) / NA titrasyonu ekle ve 24 saat boyunca 30–60 dk’da bir KŞ izle.',
              rationaleAndCaution: 'Kronik katekolamin down-regülasyonu Noradrenalin yanıtını köreltir (V1 yolu sağlamdır!); ayrıca katekolamin çekilmesine bağlı sessiz rebound hipoglisemi genel anestezi/derlenmede ölümcül olabilir.',
              status: 'RECOMMENDED'
            }
          ]
        },
        preventionBox: {
          title: 'Preoperatif Hazırlık (Roizen Kriterleri) & İntraoperatif Güvenlik Kontrol Listesi',
          highlightRule: 'ENDOCRINE SOCIETY 2014 ALTIN KURALI: Elektif feokromositoma cerrahisi öncesinde EN AZ 7–14 GÜN α-blokaj (Fenoksibenzamin veya selektif α₁-bloker Doksazosin/Prazosin) + yüksek tuz/sıvı alımı ile volüm ekspansiyonu sağlanır; β-bloker YALNIZCA α-blokaj oturduktan (2–3 gün sonra) taşikardi varsa eklenir!',
          checks: [
            'Roizen Preoperatif Optimizasyon Hedefleri: (1) Oturur KB <130/80 mmHg (eskiden <160/90), (2) Ayakta SKB >90 mmHg (hafif ortostaz kabul edilebilir ama senkop yok), (3) EKG’de son 1 haftada yeni ST-T değişikliği yok, (4) Dakikada 1’den fazla VES yok + HCT düşüşüyle volüm ekspansiyonu kanıtı.',
            'Monitörizasyon (İndüksiyon Öncesi ZORUNLU!): İndüksiyon ÖNCESİ uyanık invaziv arteriyel kateter, 2 geniş IV damar yolu + santral venöz kateter (çoklu vazodilatatör/vazopressör pompaları için) ve gerekirse TEE/POCUS.',
            'Güvenli Bulantı-Kusma & Analjezi: Bulantıda Metoklopramid/Droperidol yerine Ondansetron (Deksametazon bilateral cerrahi dışında tümörden katekolamin salınımını tetikleyebileceği için dikkatli!); Morfin yerine Fentanil/Remifentanil/torasik epidural.',
            'Genetik & Sendrom Taraması: MEN 2A/2B, VHL, NF-1 ve SDHx mutasyonları açısından preop değerlendirme; bilateral adrenalektomi planlanıyorsa perioperatif IV Hidrokortizon stres dozu protokolü zorunludur!'
          ]
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Feokromositoma ve paragangliomalar, adrenal medulla veya sempatik paragangliyonlardaki kromaffin hücrelerinden kontrolsüz, yüksek miktarda noradrenalin, adrenalin (ve nadiren dopamin) salgılayan nöroendokrin tümörlerdir. Cerrahi manipülasyon, mekanik bası, hipoksi, hiperkapni veya tetikleyici ilaçlar tümör veziküllerinden saniyeler içinde normalin 10–100 katı katekolaminin sistemik dolaşıma boşalmasına neden olur; kronik maruziyet aynı zamanda damar yatağında şiddetli volüm kontraksiyonuna ve α₁-adrenerjik reseptörlerin down-regülasyonuna yol açar.',
      stepsTitle: 'Bifazik Hemodinamik Kriz: Katekolamin Fırtınası (Faz 1) → Post-Rezeksiyon Vazopleji & Hipoglisemi (Faz 2)',
      flowType: 'biphasic',
      cycleWarning: 'Faz 1’de α-blokaj olmadan verilen β-bloker/Labetalol, β₂-aracılı iskelet kası vazodilatasyonunu kapatarak karşılanmamış α₁-vazokonstriksiyonu ve ani akut sol kalp yetmezliğini patlatır!',
      cascadeSteps: [
        {
          phase: '1. FAZ 1 — Masif Katekolamin Deşarjı (α₁ + β₁ Fırtınası)',
          mechanism: 'Laringoskopi, pnömoperitonyum, tümör manipülasyonu veya tetikleyici ilaçlar (Metoklopramid, Desfluran, Süksinilkolin) tümörden ani adrenalin/noradrenalin boşalmasına neden olur.',
          badge: 'FAZ 1 · FIRTINA',
          color: 'rose'
        },
        {
          phase: '2. FAZ 1 — Ekstrem Ardyük (↑↑SVR), Malign Aritmi & Takotsubo',
          mechanism: 'Şiddetli α₁-vazokonstriksiyon SKB’yi >220–260 mmHg’ye fırlatır; β₁ aşırı uyarımı VT/SVT, miyokard iskemisi, katekolamin kardiyomiyopatisi (Takotsubo) ve ani flash pulmoner ödem yaratır. Eşzamanlı α₂ uyarımı insülini baskılar (hiperglisemi).',
          badge: 'AKCİĞER ÖDEMİ / VT',
          color: 'red'
        },
        {
          phase: '3. FAZ 2 — Adrenal Ven Ligasyonu & Ani Katekolamin Çekilmesi',
          mechanism: 'Tümör venöz drenajı klipslendiği saniye dolaşımdaki yüksek katekolamin seviyesi hızla düşer (t₁/₂ ~1–2 dk). Kronik down-regüle α-reseptörler, rezidüel preop α-blokaj ve kontrakte intravasküler volüm birleşerek ağır vazoplejik şok doğurur.',
          badge: 'FAZ 2 · VAZOPLEJİ',
          color: 'purple'
        },
        {
          phase: '4. FAZ 2 — Rebound İnsülin Salınımı & Post-Rezeksiyon Hipoglisemi',
          mechanism: 'Pankreatik β-hücrelerindeki α₂-adrenerjik inhibisyonun aniden kalkmasıyla yüksek miktarda endojen insülin salınır; genel anestezi ve derlenmede maskelenmiş ağır hipoglisemi gelişir!',
          badge: 'REBOUND ↓GLUKOZ',
          color: 'amber'
        }
      ],
      summaryText: 'Feokromositoma krizi iki zıt kutuplu bir fırtınadır: Tümör veni bağlanana kadar hedef ekstrem ardyükü ve katekolamin deşarjını kısa etkili vazodilatatör + MgSO₄ ile dizginlemek; ven bağlandığı saniye ise 180 derece dönüp sıvı + Noradrenalin (+ Vazopressin/Terlipressin) ve sık glukoz takibiyle vazopleji ile hipoglisemiyi yönetmektir.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'İndüksiyon, laringoskopi, pnömoperitonyum veya karın/retroperiton dokunmasıyla saniyeler içinde hızla yükselen kan basıncı (SKB >180–220 mmHg)',
        'Ani sinüs taşikardisi (>130/dk), multifokal VES veya (saf noradrenalin salgılayan tümörde) şiddetli hipertansiyona eşlik eden refleks bradikardi',
        'Derin anestezi ve yeterli analjeziye rağmen kontrol edilemeyen hemodinamik labilite ve ciltte soğuk solukluk/terleme',
        'Metoklopramid, Droperidol, Desfluran veya Süksinilkolin uygulanmasından hemen sonra patlayan paroksismal hipertansif kriz'
      ],
      progressingSigns: [
        'Ekstrem hipertansiyon (SKB >240–280 mmHg), malign ventriküler/supraventriküler taşiaritmi ve iskemik ST-T değişiklikleri',
        'Akut sol ventrikül yetmezliği, flash pulmoner ödem (hızla yükselen havayolu basıncı, ↓SpO₂, köpüklü pembe sekresyon) ve TEE’de Takotsubo duvar hareket kusuru',
        'Şiddetli hiperglisemi, artan laktat/metabolik asidoz ve MH’yi taklit eden yüksek EtCO₂ + ateş yükselmesi',
        'Adrenal ven ligasyonu anında kan basıncının dakikalar içinde 200’den <60–70 mmHg’ye çakılması'
      ],
      lateSigns: [
        'Faz 1’de tedavi edilmeyen krizde intrakraniyal kanama, aort diseksiyonu, refrakter VF veya kardiyojenik şok',
        'Faz 2’de Noradrenaline zayıf yanıtlı derin vazoplejik şok (Vazopressin/Terlipressin gerektiren refrakter hipotansiyon)',
        'Post-rezeksiyon döneminde (ilk 2–24 saat) gecikmiş uyanma, nöbet veya koma ile başvuran sessiz REBOUND HİPOGLİSEMİ',
        'Bilateral adrenalektomi sonrası steroid başlanmadıysa eşzamanlı akut adrenal kriz'
      ],
      specialAlertTitle: 'Labetalol (α:β = 1:7) & Post-Rezeksiyon Hipoglisemi Tuzağı!',
      specialAlertContent: '1) Hipertansif krizde refleks olarak IV Labetalol vermek feokromositomada YASAK kadar tehlikelidir: Labetalolün β-blokajı α-blokajından 7 kat güçlüdür ve karşılanmamış α₁-vazokonstriksiyonla akut kalp yetmezliği/akciğer ödemi patlatır! 2) Tümör çıkarılıp tansiyon toparlandığında rehavete kapılmayın — ven ligasyonu sonrası 30–60 dk’da bir kan şekeri bakmazsanız rebound insülin salınımına bağlı ağır hipoglisemiyi kaçırırsınız!'
    },

    // 7) Önleyici Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Tanılı feokromositoma/paragangliomada cerrahi öncesi en az 7–14 gün α-blokaj (Fenoksibenzamin veya selektif α₁-bloker Doksazosin/Prazosin) + yüksek sodyum/sıvı alımı sağlanmalı; β-bloker YALNIZCA α-blokaj sonrası taşikardi varsa eklenmelidir.',
        'Preoperatif EKO (katekolamin kardiyomiyopatisi / LV fonksiyonu), 12 derivasyonlu EKG, HCT (volüm ekspansiyonu göstergesi) ve açlık kan şekeri/elektrolitleri değerlendirilmelidir.',
        'Sürrenal insidentaloma veya açıklanamayan paroksismal hipertansiyon + baş ağrısı + terleme + çarpıntı öyküsü olan elektif hastalarda plazma/24 saatlik idrar serbest metanefrinleri dışlanmadan ameliyata alınmamalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Feokromositoma Cerrahisi İndüksiyon Öncesi Hazırlık Protokolü',
        steps: [
          'İndüksiyondan ÖNCE uyanık invaziv arteriyel kateter (saniye-saniye KB izlemi!), 2 geniş periferik damar yolu ve santral venöz kateter (çoklu vazoaktif infüzyon hatları için) yerleştirilmelidir.',
          'Hazır çekili/pompalı Faz 1 ilaçları (TR pratiği): Nikardipin, Sodyum Nitroprussid, Nitrogliserin + Magnezyum Sülfat (+ varsa Fentolamin/Urapidil; Klevidipin TR’de yok) + (α-blokaj sonrası için) Esmolol hazır edilmelidir.',
          'Hazır çekili/pompalı Faz 2 ilaçları: Noradrenalin + varsa Vazopressin (TR’de yoksa Terlipressin), hızlı dengeli kristaloid (basınçlı torba) ve bilateral adrenalektomi ise İV Hidrokortizon 100 mg hazır tutulmalıdır.',
          'Tetikleyici ilaçların (Metoklopramid, Droperidol, Morfin, Atrakuryum, Desfluran, Ketamin, Efedrin, Süksinilkolin) masadan/tepsiden fiziksel olarak uzaklaştırıldığı teyit edilmelidir.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Düzgün, derin, sempatik yanıtı tamamen körelten indüksiyon (Propofol + Remifentanil/Fentanil + IV Lidokain + Rokuronyum; laringoskopi öncesi hedef derinlik teyidi)',
        'İdamede Sevofluran (veya TIVA) + Remifentanil/epidural analjezi; Desfluran, Ketamin ve histamin salıcı ajanlardan kesin kaçınma',
        'Cerrahi ekiple adım adım iletişim: pnömoperitonyum başlangıcı, tümör mobilizasyonu ve özellikle "adrenal ven ligasyonu 5 dk kala" bildirimi!'
      ],
      cartTitle: 'Feokromositoma Bifazik Kriz Acil Müdahale Seti:',
      cartChecklist: [
        'Faz 1 Vazodilatatörler (TR Pratiği): Nikardipin, Sodyum Nitroprussid, Nitrogliserin + Magnezyum Sülfat (2–4 g) [+ varsa Fentolamin/Urapidil; Klevidipin TR’de ruhsatlı değil!]',
        'Faz 1 Antiaritmik (α-Blokaj Sonrası): Esmolol + Lidokain / Amiodaron + Defibrilatör',
        'Faz 2 Vazopressörler: Noradrenalin + varsa Vazopressin (0,01–0,04 IU/dk) — TR’de Vazopressin/Fenilefrin rutin olmayan hastanelerde yüksek doz Noradrenalin + Terlipressin!',
        'Faz 2 Metabolik & Steroid: %10 Dekstroz + POCT Glukometre / Kan Gazı Enjektörleri + İV Hidrokortizon 100 mg (bilateral cerrahide)',
        'Hızlı Dengeli Kristaloid (3–4 L) + Yatak Başı TEE / POCUS (Takotsubo / LV / Volüm Durumu)'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Tüm feokromositoma/paraganglioma rezeksiyonları ve intraoperatif kriz geçiren hastalar en az 24–48 saat Yoğun Bakım Ünitesinde (YBÜ) invaziv arteriyel basınç, sürekli EKG ve saatlik kan şekeri takibiyle izlenmelidir.',
      recurrenceRate: 'İlk 24–48 saatte rezidüel α-blokaj (özellikle Fenoksibenzamin) nedeniyle ortostatik/vazoplejik hipotansiyon ve rebound hipoglisemi nüks edebilir; tam rezeksiyon yapılmadıysa veya metastatik/bilateral tümör varsa hipertansiyon devam edebilir.',
      recurrenceRiskBadge: 'İLK 24–48 SAAT VAZOPLEJİ + REBOUND HİPOGLİSEMİ RİSKİ',
      maintenanceTherapy: 'Kademeli Noradrenalin (ve varsa Vazopressin/Terlipressin) azaltılması, dengeli sıvı replasmanı, 30–60 dk’da bir kan şekeri takibi + gerekirse %5–10 Dekstroz infüzyonu, bilateral adrenalektomide steroid stres dozu (Hidrokortizon 200 mg/24 sa → idame + Fludrokortizon) ve Takotsubo/MI geliştiyse kardiyoloji takibi.',
      monitoringParameters: [
        'Sürekli invaziv arteriyel kan basıncı ve EKG (postop vazopleji, inatçı HT veya aritmi/QTc takibi)',
        'İlk 24 saat boyunca her 30–60 dk’da bir kan şekeri (sessiz rebound hipoglisemi taraması!)',
        'Seri Troponin, BNP ve gerekirse TTE (katekolamin kaynaklı Takotsubo kardiyomiyopatisi genellikle günler–haftalar içinde tam düzelir)',
        'Bilateral adrenalektomi veya soliter adrenal cerrahisinde serum elektrolitleri (Na⁺, K⁺) ve steroid replasmanı kontrolü',
        'Hemoglobin, idrar çıkışı ve karın dreni (retroperitoneal kanama vazoplejiyi taklit edebilir!)'
      ],
      expectedComplications: [
        'Uzamış post-rezeksiyon vazoplejik şok (özellikle uzun etkili Fenoksibenzamin sonrası)',
        'Gözden kaçan post-rezeksiyon rebound hipoglisemiye bağlı nöbet veya hipoglisemik ensefalopati',
        'Katekolamin kaynaklı Takotsubo (stres) kardiyomiyopatisi, akut sol kalp yetmezliği veya tip 2 MI',
        'Faz 1’de kontrolsüz hipertansiyona bağlı intrakraniyal hemoraji veya aort diseksiyonu',
        'Bilateral adrenalektomi sonrası primer adrenal yetmezlik ve kronik steroid bağımlılığı'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'Plazma Serbest Metanefrinleri / 24 Saatlik İdrar Fraksiyone Metanefrinleri',
          description: 'Tanısız insidental kriz sonrası kesin tanı (ve elektif rezeksiyondan 2–4 hafta sonra biyokimyasal kür doğrulaması) için altın standarttır.'
        },
        {
          testName: 'Transtorasik Ekokardiyografi (TTE) & Seri Troponin',
          description: 'Katekolamin fırtınasına bağlı akut Takotsubo kardiyomiyopatisinin ve miyokardiyal hasarın belgelenmesi.'
        },
        {
          testName: 'Genetik Test & Görüntüleme (BT / MRG / Ga-68 DOTATATE PET)',
          description: 'Feokromositoma/paraganglioma olgularının %30–40’ı kalıtsaldır (MEN2, VHL, NF1, SDHB/SDHD); tüm hastalara genetik danışmanlık önerilir.'
        }
      ],
      geneticCounseling: 'Endocrine Society 2014 kılavuzuna göre feokromositoma veya paraganglioma tanısı alan HER hastaya (özellikle genç, bilateral, ekstra-adrenal veya malign olgularda) germline genetik test ve genetik danışmanlık (RET/MEN2, VHL, NF1, SDHx) önerilmektedir.',
      prognosisSummary: 'Preoperatif α-blokaj yapılmış ve deneyimli ekiple yönetilen elektif olgularda prognoz mükemmeldir (mortalite <%1–2); Takotsubo kardiyomiyopatisi bile çoğunlukla tam geri döner. Tanısız krizde ise mortaliteyi belirleyen en kritik kararlar manipülasyonu durdurmak, α-blokajsız β-bloker/Labetalolden kaçınmak ve Faz 2 vazopleji + hipoglisemiyi proaktif yönetmektir.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'KESİN KURAL: α-Blokaj Olmadan ASLA Tek Başına β-Bloker veya IV Labetalol Verme!',
        takeaway: 'IV Labetalolün α:β bloke edici oranı 1:7’dir — feokromositomada yetersiz α-blokaj yapar! β₂-vazodilatasyonu kapatıp α₁-vazokonstriksiyonu başıboş bırakarak ölümcül hipertansif kriz ve flash pulmoner ödem patlatır. TR pratiğinde önce Nikardipin / SNP / Nitrogliserin (+ varsa Fentolamin/Urapidil; Klevidipin TR’de yok) + MgSO₄, ancak sonra gerekirse Esmolol!',
        category: 'Tuzak'
      },
      {
        title: 'Metoklopramid, Droperidol, Morfin, Atrakuryum, Desfluran & Süksinilkolin YASAK!',
        takeaway: 'Bulantı için verilen tek bir 10 mg Metoklopramid (D2 antagonisti) bile tanısız feokromositomada fulminan katekolamin fırtınası ve kardiyak arrest tetikleyebilir! Ondansetron, Fentanil/Remifentanil, Sevofluran ve Rokuronyum/Sisatrakuryum güvenli seçeneklerdir.',
        category: 'Tuzak'
      },
      {
        title: 'Magnezyum Sülfat (2–4 g → 1–2 g/sa): Feokromositomanın Gizli Süper Ajanı!',
        takeaway: 'Magnezyum Sülfat hem adrenal medulladan ve sempatik uçlardan katekolamin salınımını doğrudan baskılar, hem direkt arteriyel vazodilatatördür hem de katekolamin aritmilerini önler. Yalnızca NMB etkisini uzattığını (TOF!) ve ven ligasyonunda kapatılması gerektiğini unutmayın.',
        category: 'Kritik Doz'
      },
      {
        title: 'Faz 2 Refrakter Vazoplejide Noradrenalin Yetmezse: VAZOPRESSİN / TERLİPRESSİN!',
        takeaway: 'Tümör veni bağlandığında kronik katekolamin fazlalığına bağlı α₁-reseptör down-regülasyonu ve preop Fenoksibenzamin (irreversibl blok!) nedeniyle Noradrenaline yanıt körelmiştir. Varsa Vazopressin (0,01–0,04 IU/dk) V1 reseptörleriyle şoku kırar; TR’de Vazopressin bulunmayan merkezlerde yüksek doz NA + Terlipressin kullanılır!',
        category: 'Ezber Bozan'
      },
      {
        title: 'Ven Ligasyonu Sonrası 30–60 dk’da Bir Kan Şekeri: Sessiz Rebound Hipoglisemi!',
        takeaway: 'Tümör çıkarıldığı anda katekolaminlerin pankreatik α₂-reseptörüyle insülini baskılaması biter ve ani rebound insülin salınımı başlar. Genel anestezi ve erken derlenmede tamamen sessiz seyredebilen bu hipoglisemiyi yakalamak için 24 saat boyunca 30–60 dk’da bir KŞ ölçün!',
        category: 'Sınav / Klinik Notu'
      }
    ],

    // 10) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'Lenders JWM, Duh QY, Eisenhofer G, Gimenez-Roqueplo AP, Grebe SKG, Murad MH, Naruse M, Pacak K, Young WF Jr.; Endocrine Society.',
        title: 'Pheochromocytoma and Paraganglioma: An Endocrine Society Clinical Practice Guideline.',
        journal: 'Journal of Clinical Endocrinology & Metabolism (JCEM). 2014;99(6):1915–1942.',
        year: '2014',
        relevance: 'Preoperatif 7–14 günlük α-blokaj zorunluluğu, karşılanmamış β-blokaj yasağı, genetik tarama ve perioperatif yönetim temel kılavuzu.'
      },
      {
        authors: 'Connor D, Boumphrey S.',
        title: 'Perioperative care of phaeochromocytoma.',
        journal: 'BJA Education. 2016;16(5):153–158.',
        year: '2016',
        relevance: 'Bifazik kriz yönetimi, Fentolamin/Nikardipin/Klevidipin/SNP/MgSO₄ protokolleri, kaçınılacak tetikleyici ilaçlar ve post-rezeksiyon hipoglisemi takibi.'
      },
      {
        authors: 'James MFM, Cronjé L.',
        title: 'Pheochromocytoma Crisis: The Use of Magnesium Sulfate.',
        journal: 'Anesthesia & Analgesia. 2004;99(3):680–686.',
        year: '2004',
        relevance: 'Magnezyum sülfatın adrenal medulladan katekolamin salınımını baskılayıcı, vazodilatatör ve antiaritmik etkinliğini gösteren temel çalışma.'
      },
      {
        authors: 'Naranjo J, Dodd S, Martin YN.',
        title: 'Perioperative Management of Pheochromocytoma.',
        journal: 'Journal of Cardiothoracic and Vascular Anesthesia. 2017;31(4):1427–1439.',
        year: '2017',
        relevance: 'Adrenal ven ligasyonu sonrası katekolamin-dirençli vazoplejide Vazopressin kullanımı, TEE ile Takotsubo değerlendirmesi ve intraoperatif hemodinamik algoritmalar.'
      },
      {
        authors: 'Ramakrishna H.',
        title: 'Pheochromocytoma resection: Current concepts in anesthetic management.',
        journal: 'Journal of Anaesthesiology Clinical Pharmacology. 2015;31(3):317–323.',
        year: '2015',
        relevance: 'Roizen optimizasyon kriterleri, Labetalolün 1:7 α:β oranı tuzağı ve güvenli anestezik ilaç seçimi.'
      }
    ],
    relatedLinks: [
      { label: 'İntraoperatif Hipertansiyon Krizi Protokolü', href: '#arac=emergencies&sub=hypertension', badge: 'Faz 1 HT' },
      { label: 'İntraoperatif Hipotansiyon (IOH) Protokolü', href: '#arac=emergencies&sub=hypotension', badge: 'Faz 2 Şok' },
      { label: 'Malign Aritmiler Kriz Protokolü', href: '#arac=emergencies&sub=malignant-arrhythmias', badge: 'VT / SVT' },
      { label: 'İntraoperatif Hipoglisemi Kriz Protokolü', href: '#arac=emergencies&sub=intraop-hypoglycemia', badge: 'Rebound ↓KŞ' },
      { label: 'Vazoaktif İlaç Karar Matrisi İnfografiği', href: '#infografik=vasoactive-decision-matrix', badge: 'Vazopressör' }
    ]
  },

  'adrenal-crisis': {
    id: 'adrenal-crisis',
    // 1) Başlık
    title: 'İntraoperatif Adrenal Kriz (Akut Adrenokortikal Yetmezlik & Refrakter Şok)',
    subTitle: 'Vazopressöre Dirençli Vazoplejik Şok · İV Hidrokortizon 100 mg → 200 mg/24 sa · Perioperatif Stres Dozu',
    codeColor: 'amber',
    severityBadge: 'KOD SARI / KIRMIZI · SIVIYA & VAZOPRESSÖRE DİRENÇLİ ŞOK → KORTİZOL SONUCUNU BEKLEME!',
    keyCallout: 'Kronik steroid kullanımı (≥5 mg/gün Prednizolon eşdeğeri ≥4 hafta — inhale/eklem-içi dahil!), primer/sekonder adrenal yetmezlik, bilateral adrenalektomi veya ETOMİDAT (11β-hidroksilaz inhibisyonu!) sonrası cerrahi stresle gelişen SIVIYA ve VAZOPRESSÖRE DİRENÇLİ VAZOPLEJİK ŞOK + açıklanamayan ateş + hipoglisemi (+ primerde ↓Na⁺ / ↑K⁺) = ADRENAL KRİZ! Şüphede kortizol sonucunu ASLA BEKLEME (mümkünse öncesi 1 tüp kan al): Derhal İV HİDROKORTİZON 100 mg bolus (çocukta Woodcock 2020: 2 mg/kg [maks 100 mg]; BSPED acil kriz paketi: <2 yaş 25 mg, 2–12 yaş 50 mg, >12 yaş 100 mg — TR’de İV Hidrokortizon dönemsel tedarik sıkıntısında geçici köprü olarak Metilprednizolon 40 mg IV veya Deksametazon 4 mg IV!) → 200 mg/24 sa sürekli infüzyon (veya 50 mg/6 sa) + 1. saatte 1000 mL %0,9 NaCl/dengeli kristaloid + Dekstroz + Noradrenalin köprüleme!',
    quickCalculatorType: 'adrenal-crisis',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'İntraoperatif adrenal kriz (akut adrenokortikal yetmezlik); hipotalamus-hipofiz-adrenal (HPA) aksının cerrahi, anestezi, travma veya sepsis stresine yanıt olarak yeterli endojen kortizol (ve primer formda aldosteron) üretememesi sonucu gelişen, adrenerjik reseptör duyarsızlığına bağlı sıvıya ve vazopressörlere dirençli derin vazoplejik şok, hipoglisemi ve elektrolit bozukluğu ile seyreden ölümcül endokrin acildir.',
      epidemiology: 'Kronik adrenal yetmezliği olan hastalarda yıllık adrenal kriz insidansı 6–8/100 hasta-yılı olup cerrahi ve enfeksiyon en önde gelen tetikleyicilerdir. Günümüzde perioperatif ortamda EN SIK neden primer Addison hastalığı değil, otoimmün/romatolojik hastalıklar, astım/KOAH (yüksek doz inhale flutikazon/budesonid!) veya kronik ağrı (eklem-içi/epidural steroid enjeksiyonları!) nedeniyle gelişen eksojen steroid kaynaklı sekonder HPA aksı baskılanmasıdır (≥5 mg/gün Prednizolon eşdeğeri ≥4 hafta; Woodcock et al., Anaesthesia 2020).',
      triggers: [
        'Eksojen Steroidlere Bağlı HPA Aksı Baskılanması (EN SIK!): ≥5 mg/gün Prednizolon eşdeğeri ≥4 hafta sistemik steroid, yüksek doz inhale steroid, tekrarlayan eklem-içi/epidural steroid veya kesildikten sonraki 12 ay',
        'Primer Adrenal Yetmezlik (Addison Hastalığı, Bilateral Adrenalektomi, Adrenal Hemoraji/Waterhouse-Friderichsen, İmmün Kontrol Noktası İnhibitörleri)',
        'Sekonder / Tersiyer Adrenal Yetmezlik (Hipofiz Adenomu/Cerrahi, Kraniyal Radyoterapi, Sheehan Sendromu, Opioid Kaynaklı HPA Baskılanması)',
        'ETOMİDAT İndüksiyonu veya İnfüzyonu: Tek bir indüksiyon dozu (0,2–0,3 mg/kg) dahi adrenal 11β-hidroksilaz enzimini 24–48 saat bloke ederek kortizol sentezini baskılar!',
        'Perioperatif Stres Dozunun Atlanması, Preop Steroidin Kesilmesi, İntraoperatif Sepsis/Kanama veya Miksödem Komasında Steroidsiz T4 Başlanması'
      ],
      safeAgents: [
        'BİRİNCİ SEÇENEK — İV Hidrokortizon (Woodcock 2020 & Endocrine Society 2016): Erişkin 100 mg IV bolus → 200 mg/24 sa sürekli infüzyon (veya 50 mg IV her 6 saatte bir). Pediatrik Doz Netleştirmesi: Majör cerrahi indüksiyonunda ağırlık bazlı 2 mg/kg IV (maks 100 mg; Woodcock 2020) VEYA BSPED acil kriz yaş bandı (<2 yaş 25 mg, 2–12 yaş 50 mg, >12 yaş 100 mg) → ağırlığa göre sürekli infüzyon (hangisi pratikse; üst sınır 100 mg!). [TR Tedarik Notu: İV Hidrokortizon dönemsel stok sıkıntısı yaşayabilir → yoksa geçici köprü olarak Metilprednizolon 40 mg IV (çocuk 1 mg/kg) veya Deksametazon 4 mg IV başlanıp acilen Hidrokortizon temin edilir.]',
        'Yüksek Doz Hidrokortizonun Ek Avantajı: ≥50–100 mg/gün Hidrokortizon güçlü MİNERALOKORTİKOİD aktiviteye de sahiptir; akut krizde ayrıca Fludrokortizon gerekmez!',
        'Agresif Sıvı Resüsitasyonu: 1. saatte 1000 mL %0,9 NaCl veya dengeli kristaloid (hipoglisemide dekstroz ekle), ilk 24 saatte 3–4 L — kronik hiponatremi varsa Na⁺ düzeltmesi ≤6–8 mEq/L/24 sa!',
        'Vazopressör Köprüleme: Noradrenalin infüzyonu (kortizol genomik/non-genomik etkiyle 1–2 saat içinde adrenerjik reseptör duyarlılığını geri kazandırır; erken dönemde yanıt zayıf olabilir)',
        'Metabolik Kurtarma: Hipoglisemide TR stoklarına uygun %10 Dekstroz 100–250 mL veya geniş/santral venden %20 (60–125 mL) / %30 (40–80 mL) Dekstroz (%50 Dekstroz TR’de nadirdir; çocukta yalnız %10 Dekstroz 2–5 mL/kg, yenidoğanda katı 2 mL/kg!); primer krizde ağır hiperkalemi (>6,0 mEq/L veya EKG değişikliği) varsa Kalsiyum Glukonat %10 10 mL IV + İnsülin-Dekstroz (dikkat: hipoglisemi takibi!)',
        'GEÇİCİ ALTERNATİF (Deksametazon 4 mg IV veya Metilprednizolon 40 mg IV): YALNIZCA tanı belirsiz olup hemen ACTH stimülasyon testi yapılacaksa veya TR’de İV Hidrokortizon stokta yoksa geçici kullanılır — Deksametazonun MİNERALOKORTİKOİD ETKİSİ YOKTUR!'
      ],
      mortalityStats: 'Tanı konup IV Hidrokortizon başlanmayan akut adrenal kriz şoku hızla geri dönüşsüz vazoplejiye ve kardiyak arreste giderek yüksek mortaliteyle sonuçlanır. Buna karşın zamanında 100 mg IV Hidrokortizon + agresif sıvı resüsitasyonu ile hemodinamik toparlanma 1–2 saat içinde başlar ve sağkalım mükemmeldir.',
      clinicalUrgency: 'Sıvıya ve artan Noradrenalin dozlarına (veya varsa Fenilefrin) dirençli açıklanamayan intraoperatif şokta, özellikle steroid öyküsü veya Etomidat kullanımı varsa, kortizol testi sonucunu BEKLEMEK ölümcüldür — 100 mg IV Hidrokortizonun ampirik verilmesinin zararı ihmal edilebilir, gecikmesinin bedeli hayattır!'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'İntraoperatif adrenal kriz tanısı klinik şüphe ve tedaviye (Hidrokortizon sonrası 1–2 saatte vazopressör ihtiyacının hızla düşmesine) yanıtla konur! Klasik intraoperatif ipucu: yeterli intravasküler volüm ve kanama/kardiyak/anafilaksi dışlanmasına rağmen yükselen vazopressör dozlarına dirençli derin hipotansiyon, açıklanamayan ateş ve hipoglisemidir. Primer adrenal yetmezlikte aldosteron da eksik olduğu için hiponatremi + HİPERKALEMİ + normal/yüksek anyon açıklı metabolik asidoz görülür; sekonder (hipofizer veya eksojen steroid) formda ise renin-anjiyotensin-aldosteron aksı sağlam olduğundan K⁺ GENELLİKLE NORMALDİR!',
      clinicalCriteria: [
        'Sıvıya ve Vazopressöre Dirençli Derin Vazoplejik Şok (Kardinal Bulgu): Artan Noradrenalin/Adrenalin (veya varsa Fenilefrin) dozlarına rağmen MAP <60 mmHg (katekolamin reseptör duyarlılığı için kortizol şarttır!)',
        'Metabolik & Termoregülatuvar İpuçları: Açıklanamayan intraoperatif ateş (enfeksiyonsuz!), tekrarlayan hipoglisemi (glukoneogenez kaybı) ve metabolik asidoz',
        'Primer Adrenal Yetmezlik (Addison / Bilateral Adrenalektomi) Elektrolit Profili: Hiponatremi (Na⁺ <135 mEq/L) + HİPERKALEMİ (K⁺ >5,0–5,5 mEq/L, sivri T/QRS genişlemesi!) + hipovolemi (aldosteron eksikliği!)',
        'Sekonder Adrenal Yetmezlik (Kronik Steroid / Hipofiz) Elektrolit Profili: Potasyum GENELLİKLE NORMALDİR (aldosteron RAAS üzerinden korunur!), ancak uygunsuz ADH artışıyla dilüsyonel hiponatremi ve hipoglisemi yine görülür!',
        'Uyanık / Rejiyonal veya Derlenme Hastasında: Şiddetli karın ağrısı ("akut batın" taklidi!), bulantı-kusma, aşırı halsizlik, konfüzyon ve ortostatik kollaps'
      ],
      gradingScaleTitle: 'Primer vs Sekonder Adrenal Kriz & Perioperatif Stres Dozu Risk Sınıflaması (Woodcock 2020)',
      gradingScaleSource: 'AAGBI / RCP / Society for Endocrinology UK Guideline (Woodcock et al., Anaesthesia 2020) & Endocrine Society (2016)',
      larachScale: [
        { category: 'Yüksek HPA Baskılanma Riski', points: '≥5 mg Pred ≥4 hf', description: 'Erişkinde ≥5 mg/gün Prednizolon eşdeğeri (≥20 mg Hidrokortizon, ≥4 mg Metilprednizolon, ≥0,75 mg Deksametazon) ≥4 hafta kullanım — inhale/eklem-içi yüksek dozlar dahil!' },
        { category: 'Primer Adrenal Kriz Profili', points: '↓Na⁺ + ↑K⁺ + ↓KŞ', description: 'Hem kortizol hem aldosteron eksiktir! Ağır hipovolemik/vazoplejik şok + HİPERKALEMİ + hiponatremi + hipoglisemi + asidoz.' },
        { category: 'Sekonder / Steroid Kaynaklı Kriz', points: 'K⁺ Normal + ↓KŞ', description: 'RAAS/aldosteron korunduğu için K⁺ genelde normaldir; ancak dirençli vazoplejik şok, hipoglisemi ve dilüsyonel ↓Na⁺ gelişir.' },
        { category: 'Etomidat Kaynaklı Baskılanma', points: '24–48 Saat Blok', description: 'Tek indüksiyon dozu dahi 11β-hidroksilazı inhibe eder; sepsis, şok veya sınırda adrenal rezervi olan hastada akut krizi tetikleyebilir!' }
      ],
      larachInterpretation: 'Yüksek HPA baskılanma riski veya bilinen primer/sekonder adrenal yetmezliği olan hastada dirençli hipotansiyon geliştiğinde kortizol ölçümü beklenmeden derhal 100 mg IV Hidrokortizon başlanır; primer ve sekonder formun acil IV Hidrokortizon dozu aynıdır.',
      differentialDiagnosis: [
        {
          condition: 'Septik Şok (Eşlik Edebilir!)',
          differentiatingFactors: 'Sepsis adrenal krizin en sık tetikleyicisidir ve her ikisi de ateş + vazoplejik şok yapar! Sepsis dışı kanıt yoksa ampirik antibiyotik de başlanmalı; kritik hastalık ilişkili kortikosteroid yetmezliğinde (CIRCI) de IV Hidrokortizon 200 mg/gün faydalıdır.'
        },
        {
          condition: 'Anafilaktik Şok',
          differentiatingFactors: 'Anafilakside ilaç/lateks/antibiyotik maruziyetinden dakikalar sonra ani bronkospazm (↑Ppeak), ürtiker/eritem ve anjiyoödem görülür; Adrenaline hızlı yanıt verir ve serum triptaz yükselir.'
        },
        {
          condition: 'Okült Hemorajik Şok / Cerrahi Kanama',
          differentiatingFactors: 'Kanamada hemoglobin/HCT düşer, sıvı/kan ürünlerine geçici yanıt alınır ve hiperkalemi/hipoglisemi/ateş tipik değildir; ancak adrenal kriz de retroperitoneal/cerrahi kanamayla birlikte bulunabilir (POCUS/Hb kontrol!).'
        },
        {
          condition: 'Miksödem Koması',
          differentiatingFactors: 'Derin hipotermi, bradikardi, düşük voltajlı EKG ve hipoventilasyon hakimdir; ancak miksödem koması ve adrenal yetmezlik sık birliktelik gösterdiğinden her ikisinde de ilk ilaç İV Hidrokortizon 100 mg’dır!'
        },
        {
          condition: 'Yüksek Spinal / Kardiyojenik Şok / Tansiyon Pnömotoraks',
          differentiatingFactors: 'Yatak başı POCUS/akciğer ultrasonu ve EKG ile hızlıca dışlanır; adrenal krizde primer mekanik/pump yetmezliği değil saf katekolamin-dirençli vazopleji hakimdir.'
        }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'ACİL ENDOKRİN ŞOK · Kortizol sonucunu BEKLEME! 1 tüp kan al → DERHAL İV HİDROKORTİZON 100 mg bolus → 200 mg/24 sa sürekli infüzyon + 1. saatte 1000 mL %0,9 NaCl/kristaloid + Dekstroz + Noradrenalin köprüleme!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'ŞÜPHE ANINDA KORTİZOL SONUCUNU BEKLEME — İV HİDROKORTİZON 100 mg BOLUS!',
          action: 'Tedaviyi geciktirmemek şartıyla (mümkünse aynı hattan 15 saniyede) 1’er tüp bazal serum kortizol + ACTH kanı alın; ancak sonucu ASLA BEKLEMEDEN derhal İV HİDROKORTİZON 100 mg bolus uygulayın! Pediatrik doz (maks 100 mg): Majör cerrahi indüksiyonunda ağırlık bazlı 2 mg/kg IV (Woodcock 2020) VEYA BSPED acil kriz yaş bandı (<2 yaş 25 mg, 2–12 yaş 50 mg, >12 yaş 100 mg).',
          criticalNote: 'NEDEN HİDROKORTİZON & TR TEDARİK NOTU: Yüksek doz Hidrokortizon (≥50–100 mg/gün) hem güçlü glukokortikoid hem de güçlü MİNERALOKORTİKOİD aktivite sağlar! TR’de İV Hidrokortizon dönemsel tedarik sıkıntısı yaşayabilir — stokta yoksa geçici köprü olarak Metilprednizolon 40 mg IV (çocuk 1 mg/kg) veya Deksametazon 4 mg IV verilir; Deksametazonun mineralokortikoid etkisi YOKTUR, Hidrokortizon bulunur bulunmaz geçilir!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'SÜREKLİ İV HİDROKORTİZON İNFÜZYONU BAŞLAT (200 mg / 24 SAAT)',
          action: '100 mg IV bolusu takiben derhal İV Hidrokortizon 200 mg/24 saat sürekli infüzyon (8,3 mg/sa) başlatın (Woodcock 2020 tercih edilen yöntem — fizyolojik pik-çukur dalgalanması olmadan sabit plazma kortizol düzeyi sağlar!). Alternatif olarak her 6 saatte bir 50 mg IV bolus uygulanabilir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'AGRESİF İV SIVI RESÜSİTASYONU (1. SAATTE 1000 mL → 24 SAATTE 3–4 L)',
          action: 'İlk 1 saat içinde 1000 mL izotonik %0,9 NaCl veya dengeli kristaloid (primer krizde hiperkalemi varsa potasyumsuz %0,9 NaCl tercih!) hızlı IV verin; ardından hemodinami, POCUS ve idrar çıkışına göre ilk 24 saatte 3–4 L izotonik sıvı ile devam edin.',
          criticalNote: 'HİPONATREMİ GÜVENLİK SINIRI: Kronik/derin hiponatremi (Na⁺ <120–125 mEq/L) varsa Hidrokortizon ADH salınımını aniden baskılayarak yoğun serbest su diürezine ve hızlı Na⁺ yükselmesine yol açabilir! 24 saatlik Na⁺ artışı ≤6–8 mEq/L sınırını aşmamalıdır (aşarsa %5 Dekstroz/Desmopressin ile frenle — ODS önlemi!).',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'NORADRENALİN KÖPRÜLEME & DİĞER ŞOK NEDENLERİNİ DIŞLA',
          action: 'Hedef MAP ≥65 mmHg için Noradrenalin infüzyonu (0,05–0,5 mcg/kg/dk; gerekirse geçici Vazopressin — TR’de yoksa Terlipressin/yüksek doz NA) başlatın. Kortizolün adrenerjik reseptör duyarlılığını geri kazandırması 1–2 saat alır — bu pencerede vazopressör ihtiyacı yüksek seyredebilir. Eşzamanlı POCUS, Hb ve EKG ile gizli kanama, tamponad, MI ve anafilaksiyi dışlayın.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'HİPOGLİSEMİYİ DERHAL ÖLÇ VE DÜZELT',
          action: 'Arteriyel kan gazı ve glukometre ile kan şekerini anında kontrol edin. <70 mg/dL ise erişkinde periferik ven dostu %10 Dekstroz 100–250 mL IV veya Türkiye ameliyathanelerinde rutin bulunan %20 Dekstroz 60–125 mL / %30 Dekstroz 40–80 mL (geniş/santral venden yavaş; %50 Dekstroz 25–50 mL TR’de nadirdir); pediatrikte %10 Dekstroz 2–5 mL/kg (yenidoğanda katı 2 mL/kg!) uygulayın ve gerekirse dekstroz içeren idame infüzyonu başlatın.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'PRİMER KRİZDE HİPERKALEMİ & METABOLİK ASİDOZ TEDAVİSİ',
          action: 'K⁺ >6,0 mEq/L veya EKG değişikliği (sivri T, PR uzaması, QRS genişlemesi) varsa derhal %10 Kalsiyum Glukonat 10 mL (1 g) IV (miyokard membran stabilizasyonu!) uygulayın. Hiperkalemiyi düşürmek için İnsülin-Dekstroz kullanırken adrenal kriz hastalarının hipoglisemiye AŞIRI duyarlı olduğunu unutmayın — ekstra dekstroz + 15–30 dk KŞ takibi yapın! (Hidrokortizon + %0,9 NaCl saatler içinde K⁺’yı da kalıcı düşürür.)',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'TETİKLEYİCİ ENFEKSİYON / ETOMİDAT / CERRAHİ STRESİ YÖNET',
          action: 'Açıklanamayan ateş varsa sepsis kaynağı için kültürler alıp ampirik antibiyotik değerlendirin. Etomidat kullanıldıysa tekrarından kaçının. Anestezi derinliğini optimize edin ve cerrahi ekibi kriz hakkında bilgilendirin.',
          priority: 'MEDIUM'
        },
        {
          stepNumber: 8,
          title: 'YBÜ DEVRİ & POSTOPERATİF STEROİD AZALTMA (TAPER) PLANI',
          action: 'Hastayı hemodinamik stabilite ve elektrolit kontrolü için YBÜ/yakın monitörizasyona devredin. Klinik ve vazopressör gereksinimi düzelince (genellikle 24–48 saat sonra) Hidrokortizonu kademeli olarak hastanın oral idame dozunun çiftine (ve 2–5 günde normal bazal dozuna) düşürün.',
          priority: 'MEDIUM'
        }
      ],
      structuredCrisisBlocks: {
        tieredLadder: {
          title: 'İntraoperatif Adrenal Kriz Müdahale & Yanıt Merdiveni (Woodcock 2020)',
          accent: 'amber',
          levels: [
            {
              badge: '0–5. Dakika (Steroid Öncelikli)',
              target: 'Şüphe Anında İV Hidrokortizon 100 mg Bolus',
              presentation: 'Sıvıya ve vazopressöre dirençli derin vazoplejik şok, steroid öyküsü / Etomidat, açıklanamayan ateş veya ↓KŞ.',
              intervention: '1 tüp kortizol/ACTH al (BEKLEME!) → Erişkin 100 mg IV Hidrokortizon (pediatrik Woodcock: 2 mg/kg [maks 100 mg] · BSPED yaş bandı: <2y 25 / 2–12y 50 / >12y 100 mg) → 200 mg/24 sa sürekli infüzyon!',
              severity: 'CRITICAL'
            },
            {
              badge: '5–30. Dakika (Sıvı + Metabolik + NA)',
              target: '1000 mL %0,9 NaCl + Dekstroz + Hiperkalemi + Noradrenalin',
              presentation: 'Hipovolemi, hipoglisemi (<70 mg/dL), primer formda hiperkalemi (>5,5–6,0) ve vazopleji.',
              intervention: '1. saatte 1000 mL %0,9 NaCl/kristaloid, Noradrenalin köprüleme, hipoglisemide %10 / %20 / %30 Dekstroz (pediatride yalnız %10!), ağır ↑K⁺’da Ca Glukonat 10 mL IV.',
              severity: 'CRITICAL'
            },
            {
              badge: '1–24. Saat (Reseptör Yanıtı & Na⁺ Güvenliği)',
              target: 'Vazopressör Azaltma + Na⁺ ≤6–8 mEq/L/24 sa Kontrolü',
              presentation: 'Hidrokortizon sonrası 1–2 saatte vazopressör ihtiyacı düşer; kronik hiponatremide ani serbest su diürezi başlayabilir!',
              intervention: '24 saatte 3–4 L sıvı, 4–6 sa’da bir Na⁺ takibi (ODS önlemi: ≤6–8 mEq/L/24 sa!), 1–2 sa’da bir KŞ takibi, klinik düzelince oral çift doza geçiş.',
              severity: 'HIGH'
            }
          ]
        },
        comparisonTable: {
          title: 'Perioperatif Steroid Stres Dozu Tablosu (AAGBI / RCP / Society for Endocrinology — Woodcock 2020)',
          columns: ['Cerrahi / Stres Düzeyi', 'İndüksiyon Dozu', 'İntraop & İlk 24 Saat', 'Postoperatif Azaltma', 'Özel Klinik Not'],
          rows: [
            {
              col1: 'Majör Cerrahi (Laparotomi, Kardiyak, Ortopedi, Travma)',
              col2: 'Hidrokortizon 100 mg IV indüksiyonda',
              col3: '200 mg/24 sa sürekli IV infüzyon (veya 50 mg IV/6 sa)',
              col4: 'Oral alım & stabilite sonrası 48 sa çift oral doz → bazale dön',
              col5: 'Sürekli infüzyon sabit fizyolojik kortizol düzeyi sağladığı için tercih edilir'
            },
            {
              col1: 'Minör / Orta Cerrahi (Fıtık, Artroskopi, Lap. Kolesistektomi)',
              col2: 'Hidrokortizon 100 mg IV indüksiyonda',
              col3: '200 mg/24 sa IV infüzyon (veya 50 mg IV/6 sa × 24 sa)',
              col4: '24 saat çift oral doz → ardından olağan bazal doza dön',
              col5: 'Postop bulantı/kusma varsa oral yerine IV/IM Hidrokortizon sürdürülür'
            },
            {
              col1: 'Doğum & Vajinal / Sezaryen Doğum',
              col2: 'Aktif eylemde veya sezaryen indüksiyonunda 100 mg IV',
              col3: '200 mg/24 sa sürekli IV infüzyon (veya 50 mg IV/6 sa)',
              col4: 'Doğum sonrası 24–48 sa çift oral doz → bazal doza dön',
              col5: 'Gebelik 3. trimesterde bazal steroid ihtiyacı zaten %20–40 artmıştır'
            },
            {
              col1: 'Minör İşlem (Diş Çekimi, Kolonoskopi, Lokal İşlem)',
              col2: 'İşlemden 1 sa önce çift sabah oral dozu (veya 100 mg IV/IM bağırsak hazırlığında)',
              col3: 'Olağan bazal doz devam',
              col4: 'Komplikasyon yoksa ertesi gün normal bazal doz',
              col5: 'Bağırsak temizliği (kolonoskopi) sıvı/elektrolit kaybıyla krizi tetikleyebilir!'
            },
            {
              col1: 'Pediatrik Majör Cerrahi (Woodcock 2020 / BSPED)',
              col2: 'Woodcock ağırlık bazlı: 2 mg/kg IV (maks 100 mg) · BSPED acil yaş bandı: <2 y 25 / 2–12 y 50 / >12 y 100 mg',
              col3: 'Sürekli infüzyon (≤10 kg: 25 mg/24 sa; 11–20 kg: 50 mg/24 sa; >20 kg: 100–150 mg/24 sa)',
              col4: 'Stabil olunca 48 sa çift oral doz → normal doza dön',
              col5: 'İki kılavuz da maks 100 mg’da birleşir; çocuklarda hipoglisemi çok hızlı gelişir — dekstrozlu izotonik sıvı + sık KŞ!'
            }
          ]
        },
        drugPolicyCards: {
          title: 'Adrenal Krizde Kritik İlaç & Anestezi Politikaları',
          items: [
            {
              domain: 'İV Hidrokortizon (Sürekli İnfüzyon 200 mg/24 sa)',
              recommendation: '100 mg IV bolus sonrası 200 mg/24 sa sürekli infüzyonu (veya 50 mg IV/6 sa) birinci seçenek olarak uygula.',
              rationaleAndCaution: 'Hem glukokortikoid hem de güçlü mineralokortikoid aktivite sağlar; sürekli infüzyon pik-çukur dalgalanmalarını ve hiperglisemi ataklarını azaltır (Woodcock 2020). TR’de dönemsel tedarik sıkıntısında stokta yoksa geçici köprü: Metilprednizolon 40 mg IV veya Deksametazon 4 mg IV.',
              status: 'RECOMMENDED'
            },
            {
              domain: 'Deksametazonun Sınırlı Yeri',
              recommendation: 'Deksametazonu (4 mg IV) YALNIZCA tanı belirsiz olup hemen ACTH stimülasyon testi yapılacaksa veya Hidrokortizon yoksa geçici kullan.',
              rationaleAndCaution: 'Deksametazonun MİNERALOKORTİKOİD ETKİSİ YOKTUR! Primer adrenal krizde aldosteron eksikliğini karşılayamaz; test biter bitmez veya Hidrokortizon temin edilir edilmez geçilmelidir.',
              status: 'CAUTION'
            },
            {
              domain: 'Etomidat Uyarısı (11β-Hidroksilaz İnhibisyonu)',
              recommendation: 'Adrenal yetmezlik, sepsis veya kronik steroid hastalarında Etomidat kullanımından KESİNLİKLE KAÇIN (kullanıldıysa stres dozu Hidrokortizon ver!).',
              rationaleAndCaution: 'Tek bir 0,2–0,3 mg/kg Etomidat indüksiyon dozu bile adrenal kortekste 11β-hidroksilazı inhibe ederek kortizol sentezini 24–48 saat baskılar (Wagner et al., NEJM 1984).',
              status: 'AVOID'
            },
            {
              domain: 'Kronik Hiponatremide Hızlı Na⁺ Düzeltmesi',
              recommendation: 'Hidrokortizon sonrası ani serbest su diürezini yakın izle; 24 saatte Na⁺ artışını ≤6–8 mEq/L ile sınırla!',
              rationaleAndCaution: 'Kortizol verilince ADH baskılanır ve bol dilüe idrar çıkar; Na⁺ hızla >10–12 mEq/L fırlarsa Ozmotik Demiyelinizasyon Sendromu (ODS) gelişebilir.',
              status: 'CAUTION'
            }
          ]
        },
        preventionBox: {
          title: 'Perioperatif Adrenal Kriz Önleme Kontrol Listesi (Woodcock 2020 — Anaesthesia)',
          highlightRule: 'ALTIN KURAL (Woodcock 2020): ≥5 mg/gün Prednizolon eşdeğeri ≥4 hafta sistemik steroid (veya yüksek doz inhale/eklem-içi steroid) alan TÜM hastalarda HPA aksı baskılanmış kabul edilir — sabah oral dozunu ASLA kesme ve cerrahi büyüklüğüne göre indüksiyonda İV Hidrokortizon 100 mg stres dozu uygula!',
          checks: [
            'Gizli Steroid Kaynaklarını Sorgula: Yalnızca oral tabletleri değil; yüksek doz inhale kortikosteroidleri (Flutikazon ≥500–1000 mcg/gün), nazal/topikal potent steroidleri, son 3–6 aydaki eklem-içi/epidural steroid enjeksiyonlarını ve megestrol/opioid kullanımını mutlaka sorgula!',
            'Sabah Dozu Kesilmez: Kronik steroid kullanan hasta ameliyat sabahı kendi olağan oral steroid dozunu az suyla almalı, indüksiyonda ise cerrahiye uygun IV Hidrokortizon stres dozu eklenmelidir.',
            'Eşdeğer Dozları Bil: 5 mg Prednizolon ≈ 20 mg Hidrokortizon ≈ 4 mg Metilprednizolon ≈ 0,75 mg Deksametazon (≥4 hafta kullanım = yüksek HPA baskılanma riski).',
            'Etomidat Alternatifi: Hemodinamik olarak kırılgan veya adrenal riskli hastalarda indüksiyon için Etomidat yerine düşük doz Ketamin, titre Propofol veya hemodinami dostu opioid-ağırlıklı indüksiyon tercih et.'
          ]
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Kortizol, damar düz kas hücrelerinde α₁- ve β-adrenerjik reseptör ekspresyonunu ve katekolamin sinyal iletimini sürdüren ("permisif etki"), nitrik oksit (iNOS) aşırı üretimini frenleyen ve hepatik glukoneogenezi destekleyen zorunlu stres hormonudur. Cerrahi stres normalde günlük kortizol üretimini 10–20 mg’dan 100–200 mg’a fırlatır. HPA aksı baskılanmış veya adrenal bezi tahrip olmuş hastada bu yanıt oluşamadığında periferik damarlar katekolaminlere körleşir ve ağır vazoplejik şok gelişir.',
      stepsTitle: 'Kortizol Eksikliği → Katekolamin Direnci & Vazoplejik Şok Kaskadı',
      flowType: 'dual-axis',
      cycleWarning: 'Kortizol olmadan vasküler α₁-reseptörleri endojen ve eksojen katekolaminlere yanıt VERMEZ — bu nedenle artan Noradrenalin dozlarına rağmen şok derinleşir; ancak İV Hidrokortizon reseptör duyarlılığını geri kazandırır!',
      cascadeSteps: [
        {
          phase: '1. Cerrahi Stres Karşısında HPA Aksı Yanıtsızlığı',
          mechanism: 'Primer adrenal yetmezlik, eksojen steroid baskılanması (≥5 mg Prednizolon ≥4 hf) veya Etomidat (11β-hidroksilaz blokajı) nedeniyle stres-indüklü kortizol artışı (100–200 mg/gün) gerçekleşemez.',
          badge: 'KORTİZOL ÇÖKÜŞÜ',
          color: 'amber'
        },
        {
          phase: '2. Adrenerjik Reseptör Duyarsızlığı & iNOS Vazoplejisi',
          mechanism: 'Kortizolün "permisif" desteği kalkınca damar düz kasındaki α₁-reseptörleri katekolaminlere duyarsızlaşır, proinflamatuvar sitokinler (IL-6, TNF-α) ve iNOS/NO artarak vazopressöre dirençli derin vazopleji yaratır.',
          badge: 'VAZOPRESSÖR DİRENCİ',
          color: 'red'
        },
        {
          phase: '3. Primer Formda Aldosteron Eksikliği (↓Na⁺, ↑K⁺, Hipovolemi)',
          mechanism: 'Primer (Addison/bilateral adrenalektomi) krizde mineralokortikoid kaybıyla renal Na⁺/su kaybı (hipovolemi + hiponatremi) ve K⁺/H⁺ retansiyonu (hiperkalemi + metabolik asidoz) eklenir. Sekonder formda K⁺ normal kalır.',
          badge: 'PRİMER: ↓Na⁺ & ↑K⁺',
          color: 'purple'
        },
        {
          phase: '4. Glukoneogenez Kaybı & Çoklu Organ Hipoperfüzyonu',
          mechanism: 'Hepatik glukoz üretiminin çökmesi hipoglisemiye, kontrolsüz sitokin yanıtı açıklanamayan ateşe ve uzamış vazopleji laktik asidoz ile kardiyak arreste ilerler.',
          badge: 'HİPOGLİSEMİ & ŞOK',
          color: 'rose'
        }
      ],
      summaryText: 'Adrenal krizin özü, vasküler yatağın katekolaminlere "sağırlaşmasıdır". Sıvı ve Noradrenalin tek başına zaman kazandırır; damar yanıtını gerçekten açan ve şoku kıran anahtar 100 mg IV Hidrokortizon bolusu ve 200 mg/24 sa sürekli infüzyonudur.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'İndüksiyon veya cerrahi sırasında beklenen kan kaybı/anestezi derinliğiyle orantısız, sıvı boluslarına zayıf yanıtlı hipotansiyon',
        'Artan Noradrenalin / Efedrin (veya varsa Fenilefrin) dozlarına rağmen MAP’ın 60–65 mmHg üzerine çıkmaması',
        'Açıklanamayan sinüs taşikardisi ve enfeksiyon odağı olmadan başlayan intraoperatif ateş yükselmesi',
        'Kan gazında düşük-normal veya düşüş eğiliminde kan şekeri (<70–80 mg/dL)'
      ],
      progressingSigns: [
        'Refrakter vazoplejik şok (yüksek doz ikili vazopressör ihtiyacı + oligüri + yükselen serum laktatı)',
        'Primer adrenal krizde: Belirgin hiponatremi (Na⁺ <130 mEq/L), HİPERKALEMİ (K⁺ >5,5 mEq/L, sivri T dalgaları) ve metabolik asidoz',
        'Sekonder (steroid kaynaklı) adrenal krizde: Normal K⁺ ile birlikte dirençli şok, dilüsyonel hiponatremi ve hipoglisemi',
        'Uyanık/derlenme hastasında şiddetli karın ağrısı, inatçı kusma, konfüzyon ve ortostatik bayılma'
      ],
      lateSigns: [
        'Katekolaminlere tamamen yanıtsız derin kardiyovasküler kollaps ve ağır laktik asidoz',
        'Ağır hipoglisemiye bağlı gecikmiş uyanma, koma veya nöbet',
        'Primer krizde ağır hiperkalemiye (K⁺ >6,5–7,0 mEq/L) bağlı QRS genişlemesi, sine-wave ve asistoli/VF arrest',
        'İskemik çoklu organ yetmezliği'
      ],
      specialAlertTitle: 'Normal Potasyum Adrenal Krizi ASLA Dışlamaz!',
      specialAlertContent: 'Sınavların ve kliniğin en büyük tuzağı: Hiperkalemi YALNIZCA primer adrenal yetmezlikte (Addison/bilateral adrenalektomi — aldosteron eksik!) görülür. Ameliyathanede en sık karşılaşılan kronik steroid kullanımına bağlı sekonder HPA baskılanmasında aldosteron (RAAS) sağlam olduğu için K⁺ NORMALDİR! Bu nedenle "potasyumu normal, adrenal kriz olamaz" demek ölümcül bir hatadır!'
    },

    // 7) Önleyici Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Preoperatif değerlendirmede ≥5 mg/gün Prednizolon eşdeğeri ≥4 hafta sistemik steroid, yüksek doz inhale/topikal steroid, tekrarlayan eklem-içi/epidural steroid enjeksiyonları, hipofiz cerrahisi ve Addison hastalığı taranmalıdır (Woodcock 2020).',
        'Hasta sabah olağan oral steroidini almalı ve cerrahi stres düzeyine uygun perioperatif IV Hidrokortizon planı (majör cerrahide 100 mg IV indüksiyon + 200 mg/24 sa sürekli infüzyon) anestezi formuna net yazılmalıdır.',
        'Primer adrenal yetmezlikli hastalarda preop elektrolit (Na⁺, K⁺), glukoz ve volüm durumu optimize edilmelidir.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Adrenal Yetmezlik / Steroid Bağımlı Hastada Güvenli İntraoperatif Kurulum',
        steps: [
          'İndüksiyonda planlı 100 mg IV Hidrokortizon bolusu ve majör cerrahide 200 mg/24 sa sürekli infüzyon pompası işlem başlamadan hazır edilmelidir.',
          'İnvaziv arteriyel kateter (majör cerrahide), saatlik kan şekeri ve elektrolit (Na⁺, K⁺) takibi planlanmalıdır.',
          'İndüksiyonda Etomidattan KESİNLİKLE kaçınılmalı; hemodinamiye uygun alternatif ajanlar seçilmelidir.',
          'Büyük sıvı şiftli cerrahilerde dengeli kristaloid + dekstroz takibi ve hazır Noradrenalin infüzyonu bulundurulmalıdır.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Steroid stres dozunun "preop verildi mi?" diye cerrahi zaman aşımı (time-out) kontrol listesinde sözlü olarak teyit edilmesi',
        'Etomidatın adrenal riskli ve septik hastalarda rutin indüksiyondan çıkarılması',
        'Postoperatif bulantı-kusma (PONV) profilaksisi (oral steroidin emilememesi postop adrenal krizin en sık tetikleyicilerindendir!)'
      ],
      cartTitle: 'Adrenal Kriz Acil Müdahale Seti:',
      cartChecklist: [
        'Hidrokortizon 100 mg IV Flakon (×3–4 adet: 100 mg bolus + 200 mg/24 sa sürekli infüzyon! TR’de dönemsel tedarik sıkıntısı olabileceğinden stok teyidi + geçici köprü olarak Metilprednizolon/Deksametazon!)',
        '%0,9 NaCl 1000 mL (×3–4 torba — özellikle primer krizde hiperkalemi varken potasyumsuz izotonik!)',
        'Noradrenalin İnfüzyonu (+ varsa kurtarma Vazopressin veya Terlipressin)',
        '%10, %20 ve %30 Dekstroz (TR ameliyathane standart stokları; %50 Dekstroz TR’de nadir) + POCT Glukometre / Kan Gazı Enjektörleri',
        '%10 Kalsiyum Glukonat 10 mL Ampul (Primer krizde ağır hiperkalemi membran stabilizasyonu için)',
        'Deksametazon 4 mg Ampul / Metilprednizolon 40 mg Flakon (Hidrokortizon stokta yoksa veya acil ACTH testi yapılacaksa geçici)'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'İntraoperatif adrenal kriz geçiren tüm hastalar en az 24–48 saat Yoğun Bakım Ünitesinde (YBÜ) invaziv arteriyel basınç, saatlik KŞ ve 4–6 saatlik elektrolit (Na⁺/K⁺) takibiyle izlenmelidir.',
      recurrenceRate: 'Hidrokortizon infüzyonu çok erken kesilirse, postop kusma nedeniyle oral steroid emilemezse veya tetikleyici sepsis devam ederse şok hızla nükseder.',
      recurrenceRiskBadge: 'KUSMA / ERKEN KESİLMEDE YÜKSEK NÜKS · KADEMELİ TAPER',
      maintenanceTherapy: 'Klinik ve hemodinamik stabilizasyon sağlanana dek IV Hidrokortizon 200 mg/24 sa sürekli infüzyon (veya 50 mg IV/6 sa); ardından oral alım tolere edilince 48 saat çift oral bazal doz ve 2–5 gün içinde bazal doza dönüş. Primer adrenal yetmezlikte Hidrokortizon dozu <50 mg/gün altına indiğinde oral Fludrokortizon (50–200 mcg/gün) yeniden başlanır!',
      monitoringParameters: [
        'Sürekli invaziv arteriyel KB ve Noradrenalin dozunun saatlik azalma trendi (1–2 saatte yanıt beklenir!)',
        'İlk 24 saatte her 1–2 saatte bir kan şekeri (hedef 100–180 mg/dL)',
        'Her 4–6 saatte bir serum Na⁺ (kritik: kronik hiponatremide 24 saatlik artış ≤6–8 mEq/L — ODS önlemi!) ve serum K⁺',
        'Saatlik idrar çıkışı (Hidrokortizon sonrası ani poliüri gelişirse hızlı Na⁺ yükselmesi açısından alarm!)',
        'Ateş, CRP/prokalsitonin ve kültür sonuçları (tetikleyici enfeksiyonun tedavisi)'
      ],
      expectedComplications: [
        'Kronik hiponatreminin Hidrokortizon sonrası ani su diüreziyle aşırı hızlı düzelmesine (>8 mEq/L/24 sa) bağlı Ozmotik Demiyelinizasyon Sendromu (ODS)',
        'Uzamış refrakter hipotansiyona bağlı akut böbrek hasarı, miyokard iskemisi veya serebral hipoperfüzyon',
        'Primer krizde tedavi gecikirse ölümcül hiperkalemik aritmi',
        'Gözden kaçan hipoglisemiye bağlı nöbet/ensefalopati',
        'Yüksek doz steroid infüzyonuna bağlı geçici postop hiperglisemi (100–180 mg/dL bandında insülinle titre edilir)'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'Kriz Sırasında (Steroid Öncesi) Alınan Serum Kortizol & ACTH',
          description: 'Ağır cerrahi stres altındaki bir hastada serum kortizolünün <18 mcg/dL (<500 nmol/L) olması adrenal yetmezliği kuvvetle destekler (primerde ACTH çok yüksek, sekonderde düşük/normal).'
        },
        {
          testName: 'Kısa Synacthen (250 mcg Cosyntropin / ACTH) Stimülasyon Testi [TR Tedarik Notu]',
          description: 'Akut kriz atlatılıp hasta stabilize edildikten sonra (endokrinoloji konsültasyonuyla) kesin HPA aksı tanısı için uygulanır. Türkiye’de Synacthen (Cosyntropin) ampulü dönemsel tedarik sıkıntısı yaşayabildiğinden temin edilemeyen dönemlerde sabah 08:00 bazal kortizol + ACTH (ve endokrinoloji yönlendirmesiyle alternatif dinamik testler) kullanılır.'
        },
        {
          testName: 'Plazma Renin Aktivitesi & Aldosteron (Primer Şüphede)',
          description: 'Primer adrenal yetmezlikte yüksek renin + düşük aldosteron ile mineralokortikoid (Fludrokortizon) ihtiyacını doğrular.'
        }
      ],
      prognosisSummary: 'Tanı konup zamanında İV Hidrokortizon 100 mg + 200 mg/24 sa infüzyon ve agresif izotonik sıvı resüsitasyonu başlatılan intraoperatif adrenal krizde prognoz mükemmeldir; hastaların büyük çoğunluğu 1–2 saat içinde vazopressör yanıtını geri kazanarak sekelsiz iyileşir.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Kortizol Sonucunu ASLA Bekleme: 100 mg İV Hidrokortizon → 200 mg/24 sa!',
        takeaway: 'Sıvıya ve Noradrenaline dirençli açıklanamayan intraoperatif şokta adrenal krizden şüpheleniyorsanız 1 tüp kan alın ama sonucu beklemeden derhal İV Hidrokortizon 100 mg bolus → 200 mg/24 sa sürekli infüzyon başlatın (Woodcock et al., Anaesthesia 2020)!',
        category: 'Kritik Doz'
      },
      {
        title: 'Sekonder (Steroid Kaynaklı) Adrenal Krizde Potasyum NORMALDİR!',
        takeaway: 'Ameliyathanede en sık neden kronik eksojen steroid kullanımıdır (≥5 mg/gün Prednizolon ≥4 hafta; yüksek doz inhale/eklem-içi dahil!). Bu sekonder formda aldosteron (RAAS) korunduğu için K⁺ normaldir — "hiperkalemi yok, adrenal kriz değildir" tuzağına ASLA düşmeyin!',
        category: 'Tuzak'
      },
      {
        title: 'Neden Deksametazon Değil Hidrokortizon? Mineralokortikoid Farkı & TR Tedarik Notu!',
        takeaway: 'Yüksek doz Hidrokortizon (≥50–100 mg/gün) hem glukokortikoid hem de güçlü mineralokortikoid etki sağlar (akut krizde Fludrokortizon gerekmez!). Deksametazonun mineralokortikoid etkisi SIFIRDIR; yalnızca acil ACTH testi yapılacaksa veya TR’de İV Hidrokortizon dönemsel stokta yoksa geçici köprü (veya Metilprednizolon 40 mg IV) olarak kullanılır.',
        category: 'Ezber Bozan'
      },
      {
        title: 'Tek Doz Etomidat Bile 24–48 Saat Kortizol Sentezini Bloke Eder!',
        takeaway: 'Etomidat adrenal 11β-hidroksilaz enzimini inhibe eder (Wagner et al., NEJM 1984). Sepsis, şok veya sınırda HPA rezervi olan hastalarda tek bir indüksiyon dozu dahi akut adrenal krizi tetikleyebilir — riskli grupta Etomidattan kaçının veya stres dozu Hidrokortizon ekleyin!',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Hidrokortizon Sonrası Ani Poliüri & ODS Tuzağı (Na⁺ ≤6–8 mEq/L/24 sa)!',
        takeaway: 'Kronik hiponatremili adrenal kriz hastasına Hidrokortizon verildiğinde ADH hızla baskılanır ve bol serbest su diürezi başlar. Serum Na⁺’sı 24 saatte 6–8 mEq/L’den hızlı yükselirse Ozmotik Demiyelinizasyon Sendromu (ODS) gelişebilir — 4–6 saatte bir Na⁺ ve saatlik idrar çıkışını yakın izleyin!',
        category: 'Tuzak'
      }
    ],

    // 10) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'Woodcock T, Barker P, Daniel S, Fletcher S, Wass JAH, Tomlinson JW, Misra U, Dattani M, Arlt W, Vercueil A.',
        title: 'Guidelines for the management of glucocorticoids during the peri-operative period for patients with adrenal insufficiency: Guidelines from the Association of Anaesthetists, the Royal College of Physicians and the Society for Endocrinology UK.',
        journal: 'Anaesthesia. 2020;75(5):654–663.',
        year: '2020',
        relevance: 'Güncel perioperatif stres dozu tablosu (100 mg IV bolus + 200 mg/24 sa sürekli infüzyon), pediatrik dozlar (<2y 25 mg, 2–12y 50 mg, >12y 100 mg) ve HPA baskılanma eşiği (≥5 mg Prednizolon ≥4 hafta).'
      },
      {
        authors: 'Bornstein SR, Allolio B, Arlt W, Barthel A, Don-Wauchope A, Hammer GD, et al.; Endocrine Society.',
        title: 'Diagnosis and Treatment of Primary Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline.',
        journal: 'Journal of Clinical Endocrinology & Metabolism (JCEM). 2016;101(2):364–389.',
        year: '2016',
        relevance: 'Akut adrenal krizde 100 mg IV Hidrokortizon + 200 mg/24 sa infüzyon (veya 50 mg/6 sa), 1. saatte 1000 mL %0,9 NaCl ve mineralokortikoid aktivite esasları.'
      },
      {
        authors: 'Rushworth RL, Torpy DJ, Falhammar H.',
        title: 'Adrenal Crisis.',
        journal: 'New England Journal of Medicine (NEJM). 2019;381(9):852–861.',
        year: '2019',
        relevance: 'Adrenal kriz patofizyolojisi (katekolamin reseptör duyarsızlığı), primer vs sekonder elektrolit profili ve sıvı/glukoz resüsitasyonu.'
      },
      {
        authors: 'Liu MM, Reidy AB, Saatee S, Collard CD.',
        title: 'Perioperative Steroid Management: Approaches Based on Current Evidence.',
        journal: 'Anesthesiology. 2017;127(1):166–172.',
        year: '2017',
        relevance: 'Cerrahi stres düzeyine göre anestezi bakış açısıyla HPA aksı değerlendirmesi ve perioperatif steroid stratejileri.'
      },
      {
        authors: 'Wagner RL, White PF, Kan PB, Rosenthal MH, Feldman D.',
        title: 'Inhibition of adrenal steroidogenesis by the anesthetic etomidate.',
        journal: 'New England Journal of Medicine (NEJM). 1984;310(22):1415–1421.',
        year: '1984',
        relevance: 'Etomidatın 11β-hidroksilaz enzim inhibisyonu üzerinden adrenokortikal steroid sentezini baskıladığını gösteren klasik çalışma.'
      }
    ],
    relatedLinks: [
      { label: 'İntraoperatif Hipotansiyon (IOH) Protokolü', href: '#arac=emergencies&sub=hypotension', badge: 'Refrakter Şok' },
      { label: 'İntraoperatif Hipoglisemi Kriz Protokolü', href: '#arac=emergencies&sub=intraop-hypoglycemia', badge: 'Hipoglisemi' },
      { label: 'İntraoperatif Miksödem Koması Protokolü', href: '#arac=emergencies&sub=myxedema-coma', badge: 'Endokrin' },
      { label: 'Potasyum Bozuklukları & Hiperkalemi Tedavisi', href: '#tedavi=potassium', badge: 'Primer ↑K⁺' },
      { label: 'Vazoaktif İlaç Karar Matrisi İnfografiği', href: '#infografik=vasoactive-decision-matrix', badge: 'Vazopressör' }
    ]
  }
};
