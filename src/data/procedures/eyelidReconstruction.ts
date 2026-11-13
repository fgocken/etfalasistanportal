import { ProcedureDefinition } from '../../types/procedures';

/**
 * Göz Kapağı Rekonstrüksiyonu: Tümör Eksizyonu (BCC/SCC) veya Travma Sonrası Parsiyel / Tam Kat Kapak Defekt Onarımı
 * (Eyelid Reconstruction: Direct Closure, Tenzel Flap, Hughes Tarsoconjunctival Flap, Cutler-Beard Bridge Flap, Mustardé Cheek Flap)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Oculoplastics: Eyelid Reconstruction and Tumor Management, pp. 880-888),
 * American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Oculofacial Plastic Surgery,
 * European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS),
 * British Ophthalmic Anaesthesia Society (BOAS) ve Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const eyelidReconstruction: ProcedureDefinition = {
  id: 'eyelid-reconstruction',
  name: 'Göz Kapağı Rekonstrüksiyonu: Tümör veya Travma Sonrası Flep ve Greft ile Kapak Onarımı',
  shortCode: 'GOZ-KAPAK-REKON',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Oküloplastik & Kapak Rekonstrüksiyonu',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Göz kapağının malign tümörlerinin (en sık Bazal Hücreli Karsinom [BCC %90], Yassı Hücreli Karsinom [SCC], Sebase Bez Karsinomu [SGC], Melanom) cerrahi sınır kontrolüyle (Mohs mikrocerrahisi veya geniş rezeksiyon) çıkarılması, majör fasiyal travmalar, laserasyonlar veya konjenital kolobomlar sonucu oluşan parsiyel ya da tam kat kapak doku kayıplarının anatomik ve fonksiyonel olarak yeniden yapılandırılması ameliyatıdır. Temel ilke: Kapak iki lamelden oluşur; ön lamel (cilt ve orbikülaris kası) ve arka lamel (tarsal kıkırdak ve palpebral konjonktiva). "Rekonstrüksiyonda en az bir lamel mutlaka damarlı bir flep olmalıdır; iki serbest greft üst üste konulamaz." Defekt boyutuna göre başlıca mikrocerrahi teknikler: (1) Küçük Defektler (< %25-33): Primer doğrudan kapatma (pentagonal kama eksizyonu) ve lateral kantolizis; (2) Orta Büyüklükteki Defektler (%33 - %50): Tenzel semisirküler rotasyon flebi veya periostal flepler; (3) Büyük Alt Kapak Defektleri (> %50 - %100): Hughes Tarsokonjonktival Flebi (iki aşamalı: üst tarsus ve konjonktivadan hazırlanan damarlı pediküllü flep alt kapağa dikilir ve üzerine serbest deri grefti konur; 3-6 hafta sonra flep pedikülü kesilerek göz açılır) veya Mustardé Yanak Rotasyon Flebi; (4) Büyük Üst Kapak Defektleri (> %50 - %100): Cutler-Beard Köprü Flebi (iki aşamalı: tam kat alt kapak flebi kapak kenarının altından geçirilerek üst kapağa dikilir; 4-6 hafta sonra köprü kesilir).',
  indications: [
    'Malign Göz Kapağı Tümörleri: Bazal hücreli karsinom (BCC), skuamöz hücreli karsinom (SCC), sebase bez karsinomu (SGC), Merkel hücreli karsinom veya malign melanom eksizyonu sonrası tam kat defektler',
    'Şiddetli Okülopalpebral Travma: Avülsiyon, laserasyon, köpek ısırığı veya kaza sekeli tam kat kapak dokusu kaybı',
    'Skatrisyel Kontraktür ve Radyasyon Nekrozu: Baş-boyun radyoterapisi veya kimyasal yanık sekeli kapak deformiteleri',
    'Konjenital Göz Kapağı Kolobomu: Doğumsal kapak yarığı ve kornea maruziyeti',
    'Önceki Başarısız Kapak Ameliyatlarının ve Nüks Tümörlerin Kurtarma (Salvage) Cerrahisi'
  ],
  averageDuration: '45 - 120 dakika (Primer kapatma veya Tenzel flebi: 45-60 dk; Hughes flebi + serbest greft: 60-90 dk; Mustardé yanak rotasyonu veya Cutler-Beard: 90-120 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 15 - 50 mL (Yüz, kapak ve kantal bölge zengin vasküler ağa sahiptir; yanak rotasyon fleplerinde veya donör greft sahasında [damak/kulak arkası] kanama miktarında hafif artış olabilir)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal - Düşük Kan Kaybı / Ancak Postoperatif Akut Retrobulber/Orbital Hematom Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S opsiyonel; ancak çok geniş yüz fleplerinde veya hematolojik hastalarda kontrol edilir)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Orbital Kompartman / Retrobulber Hematom: Lateral kantotomi, kantolizis ve derin kantal disseksiyon esnasında derin orbital damarların veya lakrimal arter dallarının kanayarak orbita içine sızması (akut görme kaybı riski)',
      'Fasiyal Arter ve Ven Dallarından Kanama: Mustardé yanak rotasyon flebinde fasiyal damar perforatörleri',
      'Marginal ve Periferik Palpebral Arter Arkadları: Tarsokonjonktival flep hazırlanırken (Hughes / Cutler-Beard) kesilen arter arkadları',
      'Donör Saha Kanamaları: Sert damak mukozası greftinde majör palatin arter dalları'
    ],
    hemostasisStrategies: [
      'Lokal anestezik solüsyonuna 1:100.000 veya 1:200.000 Epinefrin eklenmesi ve insizyondan 7-10 dakika önce tüm sahalara infüze edilmesi',
      'Bipolar wet-field mikro-koter ile doku nekrozu yaratmadan selektif hemostaz (monopolardan kaçınılır)',
      'Sert damak grefti alınıyorsa donör sahaya hemostatik jelatin sünger ve termoplastik koruyucu damak plağı uygulanması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Genişletilmiş Lokal İnfiltrasyon + Rejyonel Sinir Blokları (İnfraorbital, Supraorbital, Supratroklear ve Zigomatikofasiyal Bloklar) + Monitörize Anestezi Bakımı (MAC: Bilinçli Sedasyon) — Küçük ve orta boy defektlerde (Primer kapatma, Tenzel flebi) DÜNYA GENELİNDE İLK TERCİHTİR'
    ],
    alternative: [
      'Genel Endotrakeal Anestezi (GETA): Büyük defektlerde (> %50 kapak kaybı, Hughes flebi + damak/cilt grefti, Mustardé yanak flebi, Cutler-Beard), uzun süren cerrahilerde, kemik fiksasyonu gereken kantal rekonstrüksiyonlarda, aşırı anksiyeteli veya demansı olan yaşlı kanser hastalarında standarttır',
      'Laringeal Maske (LMA) ile Genel Anestezi: Aspirasyon riski düşük, öksürmesiz uyanma hedeflenen seçilmiş orta ölçekli rekonstrüksiyonlarda'
    ],
    clinicalRationale: 'Küçük-orta boy kapak defektlerinde rejyonel fasiyal sinir blokları (infraorbital/supraorbital) + hafif MAC, yaşlı onkolojik hastalarda genel anestezi riskini düşürür ve doğal spontan solunumla güvenli cerrahi sağlar. Buna karşın sert damak/kulak arkası donör saha veya geniş yanak flebi (Mustardé, Hughes) gereken uzun rekonstrüksiyonlarda cerrahi sahadan uzak güvenli hava yolu ve mutlak hareketsizlik için kaflı endotrakeal tüp (GETA) tercih edilir.',
    rulesTitle: 'GÖZ KAPAĞI REKONSTRÜKSİYONUNDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'GÖZ KAPAĞI REKONSTRÜKSİYONUNDA ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) GENİŞ TÜMÖR REZEKSİYONU VE İKİ LAMEL PRENSİBİNDE KORNEA GÜVENLİĞİ VE SIFIR İYATROJENİK KORNEA HASARI — Kapak tam kat rezeke edilip kıkırdak ve deri flepleri hazırlanırken kornea dakikalarca tamamen açıkta ve savunmasız kalır. Koter ısısı, sütür uçları (özellikle tarsal naylon veya vikril dikiş düğümleri), cerrahi aletler ve açıkta kalan korneanın kuruması saniyeler içinde korneal epitel dökülmesi, enfeksiyöz ülser veya delinmeye yol açar! İnsizyon öncesi göze bol antibiyotikli pomad sürülerek mutlaka steril plastik/silikon Corneal Shield (Kornea Kalkanı) yerleştirilmeli; flep dikilirken dikiş düğümleri korneaya temas etmeyecek şekilde dışa gömülmeli ve operasyon sonunda epitel florosein ile kontrol edilmelidir. (2) YÜZ VE YANAK ROTASYON FLEPLERİNDE (MUSTARDÉ, TENZEL) FASİYAL SİNİR VE FASİYAL DAMAR KORUMASI — Geniş kapak defektlerinde temporal veya yanak bölgesine uzanan geniş cilt-kas flepleri (Mustardé veya Tenzel) kaldırılırken fasiyal sinirin frontal ve zigomatik dalları ile fasiyal arter/ven disseksiyon sahasının hemen altındadır. Yanlış disseksiyon planı kalıcı yüz felci (fasiyal paralizi) ve ektropiyona yol açar! Anestezi ekibi genel anestezide aşırı kas gevşetici uygulamamalı (cerrahın sinir stimülatörü kullanımına izin verecek şekilde TOF 2/4-3/4 veya uyanık MAC), koterizasyonda termal yayılımdan kaçınılmalıdır. (3) ADRENALİN VE LOKAL ANESTESTİK TOKSİSİTESİ, İKİNCİ DONÖR SAHA (DAMAK, KULAK ARKASI) VE KARDİYOVASKÜLER DALGALANMA — Geniş rekonstrüksiyonlarda hem kapak defektine hem de serbest greft alınacak donör sahalara (sert damak mukozası, retroauriküler deri veya üst kapak) yüksek volümlü 1:100.000–1:200.000 Epinefrinli lokal anestezik enjekte edilir. İntravasküler kaçış veya kümülatif aşırı doz; geriatrik kardiyak kanser hastalarında masif taşiaritmi, hipertansif kriz, miyokardiyal iskemi ve pulmoner ödeme yol açabilir! Total lokal anestezik hacmi mililitre bazında hesaplanmalı, enjeksiyonlarda negatif aspirasyon yapılmalı ve beta-bloker/vazodilatatör hazır bulundurulmalıdır. (4) İKİ AŞAMALI FLAPLERDE (HUGHES / CUTLER-BEARD) GEÇİCİ GÖZ KAPANMASI, ANKSİYETE VE PONV (BULANTI/KUSMA) DİSİPLİNİ — Hughes veya Cutler-Beard prosedürlerinde üst ve alt kapak birbirine dikilerek göz 3 ila 6 hafta süreyle tamamen kapatılır (tarsokonjonktival köprü). Uyanma evresinde hastanın şiddetli kusması veya öğürmesi intratorasik ve oküler venöz basıncı fırlatarak pediküllü flebi patlatabilir veya retrobulber hematom oluşturabilir! İntraoperatif agresif ikili antiemetik profilaksisi (İV Ondansetron + Deksametazon) uygulanmalı; hasta ameliyat sonrası tek gözünün haftalarca kapalı kalacağı konusunda önceden psikolojik olarak rahatlatılmalıdır. (5) POSTOPERATİF DERİN ORBİTAL / RETROBULBER HEMATOM VE AKUT KOMPARTMAN SENDROMU (KALICI KÖRLÜK ALARMI) — Lateral kantotomi, kantolizis ve derin orbital disseksiyon sahasında yetersiz hemostaz, kanın orbital septumu aşarak orbita apeksine doğru birikmesine ve retrobulber hematoma yol açar! İntraorbital basıncın ve göz içi basıncının (GİB) hızla 50-70 mmHg üzerine çıkması santral retinal arteri tıkayarak saatler içinde KALICI KÖRLÜK yaratır! Ameliyat bitiminde hemostaz eksiksiz olmalı; derlenme odasında ani gelişen şiddetli göz ağrısı, proptozis, kapak gerginliği veya görme kaybında derhal acil lateral kantotomi/kantolizis ile orbita dekompresyonu yapılmalıdır.',
    indispensableRules: [
      {
        number: 1,
        title: 'GENİŞ TÜMÖR REZEKSİYONU VE İKİ LAMEL PRENSİBİNDE KORNEA GÜVENLİĞİ VE SIFIR İYATROJENİK KORNEA HASARI',
        content: 'Kapak tam kat rezeke edilip kıkırdak ve deri flepleri hazırlanırken kornea dakikalarca tamamen açıkta ve savunmasız kalır. Koter ısısı, sütür uçları (özellikle tarsal naylon veya vikril dikiş düğümleri), cerrahi aletler ve açıkta kalan korneanın kuruması saniyeler içinde korneal epitel dökülmesi, enfeksiyöz ülser veya delinmeye yol açar! İnsizyon öncesi göze bol antibiyotikli pomad sürülerek mutlaka steril plastik/silikon Corneal Shield (Kornea Kalkanı) yerleştirilmeli; flep dikilirken dikiş düğümleri korneaya temas etmeyecek şekilde dışa gömülmeli ve operasyon sonunda epitel florosein ile kontrol edilmelidir.'
      },
      {
        number: 2,
        title: 'YÜZ VE YANAK ROTASYON FLEPLERİNDE (MUSTARDÉ, TENZEL) FASİYAL SİNİR VE FASİYAL DAMAR KORUMASI',
        content: 'Geniş kapak defektlerinde temporal veya yanak bölgesine uzanan geniş cilt-kas flepleri (Mustardé veya Tenzel) kaldırılırken fasiyal sinirin frontal ve zigomatik dalları ile fasiyal arter/ven disseksiyon sahasının hemen altındadır. Yanlış disseksiyon planı kalıcı yüz felci (fasiyal paralizi) ve ektropiyona yol açar! Anestezi ekibi genel anestezide aşırı kas gevşetici uygulamamalı (cerrahın sinir stimülatörü kullanımına izin verecek şekilde TOF 2/4-3/4 veya uyanık MAC), koterizasyonda termal yayılımdan kaçınılmalıdır.'
      },
      {
        number: 3,
        title: 'ADRENALİN VE LOKAL ANESTESTİK TOKSİSİTESİ, İKİNCİ DONÖR SAHA (DAMAK, KULAK ARKASI) VE KARDİYOVASKÜLER DALGALANMA',
        content: 'Geniş rekonstrüksiyonlarda hem kapak defektine hem de serbest greft alınacak donör sahalara (sert damak mukozası, retroauriküler deri veya üst kapak) yüksek volümlü 1:100.000–1:200.000 Epinefrinli lokal anestezik enjekte edilir. İntravasküler kaçış veya kümülatif aşırı doz; geriatrik kardiyak kanser hastalarında masif taşiaritmi, hipertansif kriz, miyokardiyal iskemi ve pulmoner ödeme yol açabilir! Total lokal anestezik hacmi mililitre bazında hesaplanmalı, enjeksiyonlarda negatif aspirasyon yapılmalı ve beta-bloker/vazodilatatör hazır bulundurulmalıdır.'
      },
      {
        number: 4,
        title: 'İKİ AŞAMALI FLAPLERDE (HUGHES / CUTLER-BEARD) GEÇİCİ GÖZ KAPANMASI, ANKSİYETE VE PONV (BULANTI/KUSMA) DİSİPLİNİ',
        content: 'Hughes veya Cutler-Beard prosedürlerinde üst ve alt kapak birbirine dikilerek göz 3 ila 6 hafta süreyle tamamen kapatılır (tarsokonjonktival köprü). Uyanma evresinde hastanın şiddetli kusması veya öğürmesi intratorasik ve oküler venöz basıncı fırlatarak pediküllü flebi patlatabilir veya retrobulber hematom oluşturabilir! İntraoperatif agresif ikili antiemetik profilaksisi (İV Ondansetron + Deksametazon) uygulanmalı; hasta ameliyat sonrası tek gözünün haftalarca kapalı kalacağı konusunda önceden psikolojik olarak rahatlatılmalıdır.'
      },
      {
        number: 5,
        title: 'POSTOPERATİF DERİN ORBİTAL / RETROBULBER HEMATOM VE AKUT KOMPARTMAN SENDROMU (KALICI KÖRLÜK ALARMI)',
        content: 'Lateral kantotomi, kantolizis ve derin orbital disseksiyon sahasında yetersiz hemostaz, kanın orbital septumu aşarak orbita apeksine doğru birikmesine ve retrobulber hematoma yol açar! İntraorbital basıncın ve göz içi basıncının (GİB) hızla 50-70 mmHg üzerine çıkması santral retinal arteri tıkayarak saatler içinde KALICI KÖRLÜK yaratır! Ameliyat bitiminde hemostaz eksiksiz olmalı; derlenme odasında ani gelişen şiddetli göz ağrısı, proptozis, kapak gerginliği veya görme kaybında derhal acil lateral kantotomi/kantolizis ile orbita dekompresyonu yapılmalıdır.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Oküloplasti Konsültasyonu: Tümör patolojisi ve yayılımı (Mohs cerrahisi planlaması), defekt boyutu (kapağın %25, %50 veya > %75 kaybı), kantal tutulum, donör doku sahaları (damak, kulak arkası, karşı kapak) ve flep stratejisi.',
      'Kardiyoloji Konsültasyonu: İleri yaş kanser popülasyonunda yaygın olan hipertansiyon, aritmiler ve iskemik kalp hastalığı optimizasyonu; yüksek volümlü adrenalinli infiltrasyon güvenliği.',
      'Göğüs Hastalıkları Konsültasyonu: Genel anestezi alacak olgularda solunum fonksiyonları ve ekstübasyon sonrası öksürüğü baskılama planı.',
      'Anestezi Polikliniği: Genel vs lokal/MAC kararı, zor hava yolu taraması ve PONV riski değerlendirmesi.'
    ],
    historyAndPhysical: [
      'Antikoagülan / Antiagregan İlaç Kullanımı: Aspirin, Klopidogrel, Warfarin ve DOAK; geniş flep disseksiyonlarında hematom ve greft nekrozu riskini önlemek için hemostatik ilaç planı cerrah ile konsülte edilir.',
      'Tek Gözlü Hasta (Monoküler) Durumu: Eğer opere edilecek göz gören tek göz ise Hughes veya Cutler-Beard gibi gözü haftalarca kapatan flepler yerine alternatif teknikler (serbest greft + lokal kaydırma) tercih edilmelidir.',
      'Hipertansiyon ve Kalp Hastalığı Öyküsü: İntraoperatif adrenalin enjeksiyonuna bağlı tansiyon fırlaması riski.',
      'Sigara Öyküsü: Mikrovasküler flep perfüzyonunu ve greft tutmasını olumsuz etkiler.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri ve Temel Biyokimya (Böbrek ve karaciğer fonksiyonları).',
      '12 Derivasyonlu EKG ve Akciğer Grafisi (Genel anestezi hazırlığı).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleksi ve adrenalin kaynaklı taşiaritmi analizi), SpO2, NIBP, EtCO2 (genel anestezide) ve Sıcaklık.',
      'Kan Basıncı Takibi (3-5 dakikada bir): Adrenalinli infiltrasyon ve flep diseksiyonu esnasında hipertansif dalgalanmaların takibi (SKB < 130-140 mmHg hedeflenir).',
      'Nöromusküler Monitörizasyon (TOF): Genel anestezi uygulanıyor ve fasiyal sinir dalları disseke ediliyorsa sinir stimülasyonu için aşırı derin blokajdan kaçınılır (TOF 2/4-3/4).'
    ],
    vascularAccess: [
      '1-2 adet güvenli periferik intravenöz damar yolu (18-20G)',
      'Acil Bradikardi Kiti: İntravenöz Atropin (0.5 mg ampul)',
      'Gereğinde Hipertansiyon Yönetimi: İV Esmolol, Labetalol veya Gliseril Trinitrat'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Hafif Yükseltilmiş (15-20 Derece) ve Hareketsiz',
    patientPositionDetails: [
      'Hasta sırtüstü yatırılır; baş silikon donüt yastıkla sabitlenir.',
      'Baş-boyun venöz basıncını azaltarak kanamayı minimize etmek için ameliyat masasına 15-20 derece Reverse Trendelenburg eğimi verilir.',
      'Sert damak grefti alınacaksa baş hafif ekstansiyona getirilir ve orofarenkse koruyucu gazlı bez tampon (throat pack) yerleştirilir.',
      'Cerrahi örtülerin yüze doğrudan bası yapmasını önlemek için L-bar köprüsü kurulur.'
    ],
    anesthesiaManagement: [
      'Lokal / Rejyonel Anestezi (Orta Boy Defektler / MAC):',
      '  - Solüsyon: Lidokain %2 + Bupivakain %0.5 (1:1 karışım) + 1:100.000 veya 1:200.000 Epinefrin.',
      '  - Enjeksiyon: Kapak çevresi, kantal alan ve greft donör sahası. Negatif aspirasyon şarttır.',
      '  - Tam vazokonstrüksiyon için insizyondan önce EN AZ 7-10 DAKİKA BEKLENMELİDİR.',
      '  - Sedasyon: Titre edilmiş minimal Midazolam (0.5-1 mg) ve Fentanil (25 mcg).',
      'Genel Anestezi (Geniş Defektler, Hughes, Mustardé, Cutler-Beard):',
      '  - İndüksiyon: Propofol + Remifentanil + Rokuronyum (veya LMA kullanımı).',
      '  - İdame: Sevofluran veya TIVA (Propofol + Remifentanil).',
      '  - Uyanma: Pürüzsüz, öksürmesiz ve ıkınmasız uyanma sağlanmalıdır; ekstübasyondan önce İV Lidokain (1.5 mg/kg) uygulanır.'
    ],
    airwayManagement: [
      'MAC yönetiminde nazal kanül ile 2 L/dk O2 verilir ve örtü altı aktif vakum aspirasyonu sürdürülür.',
      'Genel anestezide spiral telli (reinforced) endotrakeal tüp baş hareketlerine karşı hava yolunu güvene alır; damak grefti alınacaksa nazotrakeal entübasyon veya ağız kenarına sabitlenmiş tüp tercih edilebilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Monitörizasyon ve Cerrahi Sınırların İşaretlenmesi.',
      '2. Koruyucu Pomad Eşliğinde Kornea Kalkanının (Corneal Shield) Yerleştirilmesi.',
      '3. Lokal Anestezik ve Epinefrin İnfiltrasyonu (Kapak, kantus ve donör saha — 7-10 dk bekleme süresi).',
      '4. Tümör Rezeksiyonu ve Frozen Section ile Cerrahi Sınır Kontrolü (Temiz sınır teyidi).',
      '5. Defektin Analizi: Ön ve arka lamel kaybının milimetrik ölçümü.',
      '6. Arka Lamel Rekonstrüksiyonu: Hughes tarsokonjonktival flebi, serbest sert damak mukozası grefti veya lateral tarsal şerit.',
      '7. Ön Lamel Rekonstrüksiyonu: Tenzel flebi, Mustardé yanak rotasyon flebi veya retroauriküler tam kat serbest deri grefi.',
      '8. Kantal Askı Dikişleri (Whitnall tüberkülüne tespit — Okülokardiyak refleks kontrolü!).',
      '9. Cilt Sütürasyonu ve Kornea Kalkanının Nazikçe Çıkarılması (Florosein epitel testi).',
      '10. Antibiyotikli Pomad, Basısız Steril Pansuman ve Koruyucu Şeffaf Kapak.'
    ],
    emergenceNotes: [
      'Genel anestezi sonrası hastanın tüpe karşı öksürmesi ve ıkınması flep pedikülünü patlatabileceğinden derin/öksürmesiz ekstübasyon esastır.',
      'İntraoperatif Ondansetron (4-8 mg) ve Deksametazon (4 mg) ile postoperatif kusma kesinlikle önlenmelidir.',
      'Ameliyat edilen göze baskılı pansuman yapılmaz; hafif steril pansuman ve şeffaf delikli plastik koruyucu kapak (eye shield) flasterlenir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Kapak rekonstrüksiyonu sonrası ağrı genellikle orta düzeydedir; donör saha (sert damak veya kulak arkası) varlığında rahatsızlık artabilir.',
      'Oral / İV Parasetamol (1000 mg) her 6-8 saatte bir temel analjeziktir.',
      'Gereğinde Tramadol (50 mg) veya Kodein kombinasyonu.',
      'Trombosit fonksiyonlarını bozan ve kanama/hematom riskini artıran agresif NSAİİ ve aspirinden erken dönemde kaçınılmalıdır.',
      'İlk 24-48 saat aralıklı soğuk jel uygulaması ödemi ve flep gerginliğini azaltır.'
    ],
    prospectRecommendations: [
      'PROSPECT Oküloplastik ve Yüz Cerrahisi Rehberleri:',
      'Preoperatif ve intraoperatif multimodal analjezi protokolleri;',
      'Opioid kullanımını sınırlayarak PONV ve buna bağlı intrakraniyal/intraorbital venöz basınç artışının engellenmesi önerilir.'
    ],
    erasRecommendations: [
      'ERAS Göz ve Baş-Boyun Rekonstrüktif Cerrahi Protokolleri:',
      'Geniş fleplerde 1 gece hastanede gözlem, küçük defektlerde günübirlik cerrahi (day-case).',
      'Postoperatif Baş Pozisyonu: İlk 48 saat başın 30-45 derece yüksekte tutulması flep venöz konjesyonunu ve ödemi belirgin biçimde azaltır.',
      'Flep Perfüzyon Takibi: Flebin rengi, kapiller geri dolumu ve hematom varlığı derlenme odasında saatlik kontrol edilir.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe\'s Anesthesiologist\'s Manual of Surgical Procedures (5th Edition), Section VI: Ophthalmology, Chapter: Oculoplastics - Eyelid Reconstruction and Tumor Excision, pp. 880-888.',
    erasReference: 'Enhanced Recovery After Surgery (ERAS) Society & British Ophthalmic Anaesthesia Society (BOAS): Guidelines for Day-Case and Inpatient Oculofacial Reconstruction.',
    prospectReference: 'PROSPECT Guidelines: Perioperative Pain and PONV Management in Oculoplastic and Facial Reconstructive Procedures.',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern (PPP): Eyelid Neoplasms and Major Reconstructive Surgery.',
      'European Society of Ophthalmic Plastic and Reconstructive Surgery (ESOPRS): Consensus on Eyelid Reconstruction and Flap Techniques.',
      'Türk Oftalmoloji Derneği (TOD) Oküloplastik Cerrahi Birimi: Göz Kapağı Tümörleri ve Rekonstrüksiyon Rehberi.'
    ]
  }
};
