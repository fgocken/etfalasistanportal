import { ProcedureDefinition } from '../../types/procedures';

/**
 * Elektrokonvülsif Tedavi (EKT / ECT - Electroconvulsive Therapy)
 * 
 * Jaffe (5th ed.) Section XVII: NORA, APA Task Force on ECT, ASA Practice Advisory
 * ve ECTAS (The Electroconvulsive Therapy Accreditation Service) rehberleri
 * referans alınarak yapılandırılmıştır.
 */
export const ekt: ProcedureDefinition = {
  id: 'ekt',
  name: 'Elektrokonvülsif Tedavi (EKT / ECT)',
  shortCode: 'EKT',
  specialty: 'psikiyatri',
  specialtyName: 'Psikiyatri',
  categoryTag: 'Kısa Genel Anestezi & NORA (Psikiyatri / Nöromusküler Blokaj)',

  // 1) Prosedür ismi - tanımı - endikasyonları - tahmini ortalama prosedür süresi
  description: 'Şiddetli ve tedaviye dirençli psikiyatrik tablolarda; genel anestezi ve nöromusküler blokaj altında bitemporal, bifrontal veya sağ tek taraflı (RUL) elektrotlar aracılığıyla kontrollü elektriksel akım verilerek santral sinir sisteminde senkronize terapötik jeneralize tonik-klonik nöbet oluşturulması işlemidir. Nöbet sırasında hastayı kas-iskelet sistemi travmalarından (kemik kırığı, eklem çıkığı, kas yırtılması) korumak, bilinç kaybı ve konfor sağlamak, fizyolojik otonomik fırtınayı kontrol etmek amacıyla anestezi yönetimi zorunludur.',
  indications: [
    'Tedaviye dirençli veya psikotik özellikli Majör Depresif Bozukluk',
    'Yüksek intihar (özkıyım) riski ve acil klinik yanıt gerektiren depresif tablolar',
    'Akut Katatoni (Letal katatoni, malign nöroleptik sendrom — acil EKT endikasyonu)',
    'Bipolar bozuklukta tedaviye dirençli manik eksitasyon, mikst epizotlar veya dirençli depresyon',
    'Antipsikotik ilaç tedavisine yanıtsız veya şiddetli pozitif semptomlu Şizofreni ve Şizoaffektif Bozukluk',
    'Gebelikte farmakoterapinin fetüse toksik olduğu durumlarda ağır psikotik/depresif epizotlar',
    'Parkinson hastalığında motor dalgalanmalar (on-off fenomenleri) ve dirençli depresyon'
  ],
  averageDuration: '10 - 20 dakika (Anestezi indüksiyonu ve hazırlık: 3-5 dk; Elektrik stimülasyonu ve nöbet: motor nöbet 25-60 sn, EEG nöbeti 30-90 sn; ilk uyanma ve derlenme: 10-15 dk). Genellikle haftada 2-3 seans, toplam 6-12 seanslık kürler halinde uygulanır.',

  // 1.5) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 5 mL (Sıfır / İhmal edilebilir — cerrahi kesi veya doku eksizyonu yoktur)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal / İhmal Edilebilir (Cerrahi kanama riski yoktur)',
    crossMatchRequirement: 'Rutin kan grubu ve Cross-Match / T&S hazırlığı gerekmez',
    transfusionProbability: '%0 (İhmal edilebilir)',
    criticalBleedingSources: [
      'Elektriksel deşarj ve maseter spazmı sırasında dil veya yanak mukozasının dişler arasında sıkışıp ısırılması (laserasyon / kanama)',
      'Çürük veya sallanan dişlerin elektriksel stimulus anında kırılması/sublukzasyonu ve diş eti kanaması',
      'Isırma koruyucusunun (bite-block) uygunsuz yerleşimi sonucu farenks veya sert damak mukozasında laserasyon',
      'Orofarengeal aspirasyonun aşırı travmatik yapılması sonucu mukozal peteşi ve erozyonlar'
    ],
    hemostasisStrategies: [
      'İşlem öncesi hareketli diş protezlerinin mutlaka çıkarılması, gevşek/çürük dişlerin önceden kaydedilmesi',
      'Elektrik stimülasyonundan önce yumuşak, iletken olmayan özel silikon/gazlı bez EKT ısırma koruyucusunun (bite-block) premolar/molar dişler arasına simetrik ve güvenli yerleştirilmesi',
      'Dilin ısırma bloğunun altında tutulduğunun ve dudakların dişler arasına kıstırılmadığının görsel olarak kontrol edilmesi',
      'Tam kas gevşemesi (Süksinilkolin fasikülasyonlarının bitişi) teyit edilmeden elektrik uyarısının verilmemesi',
      'Travmatik olmayan yumuşak uçlu aspiratör sondalarının kullanılması'
    ]
  },

  // 2) Olası anestezi yönetimi teknikleri
  anesthesiaTechniques: {
    primary: [
      'Balon-Maske ile Havayolu Destekli Kısa Genel Anestezi + Nöromusküler Blokaj (TIVA yaklaşımı): Hızlı indüksiyon sağlayan hipnotik ajan (Metodeksital veya Propofol) + ultra kısa etkili nöromusküler bloker (Süksinilkolin)'
    ],
    alternative: [
      'Süksinilkolin Kontrendikasyonunda: Düşük doz Rokuronyum (0.3 - 0.5 mg/kg IV) indüksiyonu ve nöbet bitiminde derhal yüksek doz Sugammadeks (4 - 16 mg/kg IV) ile acil revers uygulaması',
      'Kısa/Yetersiz Nöbet Süresi Olan Olgularda: Nöbet süresini uzatmak amacıyla indüksiyonda Etomidat (0.15 - 0.3 mg/kg IV) veya Ketamin (0.5 - 1.0 mg/kg IV) kullanımı'
    ],
    notes: 'EKT anestezisinde temel amaç hastanın uyarılmayı hatırlamaması, hemodinamik stabilitenin korunması ve kas gevşemesiyle kemik/kas yaralanmalarının önlenmesidir. Ancak hipnotik ajanların çoğu antikonvülzan etkilidir. Propofol nöbet süresini doza bağımlı olarak kısaltabilir; bu nedenle terapötik nöbet kalitesini (motor ≥ 25 sn, EEG ≥ 30 sn) korumak için en düşük etkin indüksiyon dozu titre edilmelidir.',
    rulesTitle: 'ELEKTROKONVÜLSİF TEDAVİDE (EKT) TEMEL ANESTEZİ İLKELERİ',
    indispensableRules: [
      {
        number: 1,
        title: 'NÖBET KALİTESİNİ BOZMAYAN HİPNOTİK TİTRASYONU (ANTİKONVÜLZAN DENGE)',
        content: 'Tüm IV anestezikler (Propofol, Tiopental, Metoheksital) nöbet eşiğini yükseltir; özellikle aşırı yüksek doz Propofol (>1.5-2 mg/kg) nöbet süresini kısaltarak EKT etkinliğini azaltır. En düşük etkin hipnotik doz (Propofol 0.75-1.25 mg/kg veya kısa nöbetli olgularda Etomidat 0.15-0.25 mg/kg) hedeflenmeli, sedasyon PSi/klinik bilinç kaybı ile titre edilmelidir.'
      },
      {
        number: 2,
        title: 'TAM KAS GEVŞEMESİ VE BİLATERAL BITE-BLOCK DİŞ/DİL KORUMASI',
        content: 'Elektrik uyarısı öncesi tam nöromusküler blokaj (Süksinilkolin 0.75-1.0 mg/kg sonrası fasikülasyonların tamamen durması) sağlanmazsa tonik-klonik kasılmalar vertebra kompresyon kırığına veya uzun kemik fraktürüne yol açabilir. Uyarı öncesi mutlaka özel silikon/gazlı EKT ısırma koruyucusu (bite-block) molar dişler arasına yerleştirilip dil ve dudaklar korunmalıdır.'
      },
      {
        number: 3,
        title: 'BİFAZİK OTONOMİK YANIT (VAGAL BRADİKARDİ + KATEKOLAMİN FIRTINASI)',
        content: 'Stimülasyonla ilk 10-15 saniyede şiddetli parasempatik bradikardi/asistoli (gerekirse Atropin/Glikopirolat), hemen ardından ise masif sempatik katekolamin deşarjıyla taşikardi ve >%30-50 hipertansiyon piki görülür. İskemik kalp hastalarında ve yaşlılarda miyokard iskemisi ile serebral kanamayı önlemek için Esmolol (0.5-1 mg/kg) veya Labetalol hazır tutulmalıdır.'
      },
      {
        number: 4,
        title: 'ÖN OKSİJENASYON, HAFİF HİPERVENTİLASYON VE HAVA YOLU DESTEĞİ',
        content: 'Nöbet sırasında serebral oksijen ve glukoz tüketimi (CMRO2) dramatik olarak artar; ayrıca hafif hiperventilasyon (EtCO2 30-35 mmHg) nöbet eşiğini düşürerek nöbet kalitesini artırır. İndüksiyon öncesi 2-3 dakika %100 O2 preoksijenasyon ve apneyi takip eden fazda balon-maske ventilasyonu sürdürülmelidir.'
      },
      {
        number: 5,
        title: 'PSİKOTROP İLAÇ ETKİLEŞİMLERİ VE UZAMIŞ NÖBET (STATUS) TAKİBİ',
        content: 'Lityum kullanımı nöromusküler blokajı uzatır ve post-iktal deliryumu artırır; antikonvülzanlar ve benzodiazepinler ise nöbet oluşumunu engeller. Motor veya EEG nöbeti >120-180 saniye sürerse (uzamış nöbet/status epileptikus) beyni korumak için derhal Midazolam (2-5 mg IV) veya Propofol ile sonlandırılmalıdır.'
      }
    ]
  },

  // 3) Pre-operatif hazırlığı
  preoperative: {
    // 3a) Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonları
    consultations: [
      'Psikiyatri Konsültasyonu: Hastanın tanı ve EKT endikasyonu, yasal vasi/onam durumu, kullandığı psikotrop ilaçlar (özellikle Lityum, Benzodiazepinler, Antikonvülzanlar, MAOI/TSA), seans sıklığı ve nöbet hedefleri teyit edilmelidir.',
      'Kardiyoloji Konsültasyonu: EKT sırasında gelişen iki fazlı otonomik deşarj (önce vagal bradikardi/asistoli, ardından masif katekolamin fırtınasıyla taşikardi ve şiddetli hipertansiyon) nedeniyle iskemik kalp hastalığı, kontrolsüz hipertansiyon, aritmi, sol ventrikül disfonksiyonu veya vasküler anevrizması (aort/serebral) olan hastalarda kardiyak risk stratifikasyonu şarttır.',
      'Nöroloji / Nöroşirürji: İntrakraniyal kitle, intrakraniyal basınç artışı (KİBA), serebral anevrizma veya yakın dönem geçirilmiş inme öyküsü olan hastalarda kontrendikasyon değerlendirmesi.'
    ],
    // 3b) Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
    historyAndPhysical: [
      'Psikotrop İlaç Etkileşimlerinin Taranması:',
      '• Lityum: Post-EKT konfüzyon, uzamış deliryum, bilişsel yıkım ve uzamış nöbet riskini artırır; elektif olgularda EKT öncesi doz azaltılmalı veya kesilmelidir (terapötik kan düzeyi kontrol edilmelidir).',
      '• Benzodiazepinler ve Antikonvülzan İlaçlar (Valproat, Karbamazepin, Lamotrijin): Nöbet eşiğini yükselterek terapötik nöbet oluşmasını engeller veya nöbet süresini kısaltır; EKT sabahı dozları atlanmalı veya en aza indirilmelidir. Dirençli durumlarda işlem öncesi düşük doz Flumazenil (0.2-0.5 mg IV) ile benzodiazepin reseptör blokajı açılabilir.',
      '• Trisiklik Antidepresanlar (TSA) ve MAO İnhibitörleri (MAOI): Katekolamin salınımıyla şiddetli aritmilere ve abartılı hipertansif krizlere yol açabilir.',
      'Ağız ve Diş Muayenesi: Sallanan dişler, periodontal hastalıklar, porselen kaplama ve köprüler kaydedilmelidir; hareketli protez dişler işlem odasında mutlaka çıkartılmalıdır.',
      'Gastroözofageal Reflü ve NPO Açlık Durumu: Aspirasyon pnömonisi riskini önlemek için katı gıdalar için en az 6-8 saat, berrak sıvılar için 2 saatlik NPO kuralına kesinlikle uyulmalıdır.',
      'Mutlak / Göreceli Kontrendikasyonların Kontrolü: İntrakraniyal yer kaplayan lezyon/kitle (fıtıklaşma riski), yakın zamanda (< 3 ay) geçirilmiş miyokard enfarktüsü, anstabil anjina, dekompanse kalp yetmezliği, büyük anevrizmalar, derin ven trombozu veya retina dekolmanı varlığı sorgulanmalıdır.'
    ],
    // 3c) Varsa prosedür spesifik kan ve lab sonuçlarında dikkat edilmesi gerekenler
    laboratoryAndTests: [
      '12 Derivasyonlu EKG: Bazal ritim, ileti gecikmeleri, dal blokları, iskemi bulguları ve QTc mesafesi (birçok psikotrop ilaç QTc mesafesini uzatır) kontrol edilmelidir.',
      'Serum Elektrolitleri (Özellikle Serum K+ Potasyum): Süksinilkolin verilmesi serum potasyumunu 0.5 mEq/L kadar yükseltir; bazal hiperkalemisi olan hastalarda ventriküler fibrilasyon riski nedeniyle potasyum normal aralıkta olmalıdır.',
      'Serum Lityum Düzeyi: Lityum kullanan hastalarda nörotoksisiteyi önlemek için düzey mutlaka bilinmelidir.',
      'Tam Kan Sayımı ve Açlık Kan Şekeri.',
      'Psödokolinesteraz Enzim Düzeyi: Hastanın kendisinde veya ailesinde süksinilkolin sonrası uzamış apne/uyanamama öyküsü varsa atipik kolinesteraz varlığı araştırılmalıdır.'
    ]
  },

  // 4) İntra-operatif yönetim
  intraoperative: {
    // 4a) Varsa prosedür spesifik monitörizasyon
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (özellikle ritim bozukluğu ve ST iskemi takibi), SpO2, Non-invaziv Kan Basıncı (NIBP 1-2 dk sıklaştırılmış ölçüm modu).',
      'Sürekli Dalga Formlu Kapnografi (EtCO2): Balon-maske ventilasyonunda yeterli alveolar ventilasyonun ve hipokapninin sağlanması için.',
      'İki Kanallı EEG Monitörizasyonu (EKT Cihazı Üzerinden): Epileptiform nöbet aktivitesinin (diken-dalga kompleksleri) başlangıcı, amplitüdü ve simetrik sonlanışının doğrulanması (yeterli nöbet için EEG süresi ≥ 25-30 sn, ideal 30-90 sn).',
      'İzole Ekstremite Manşon Tekniği ("Cuff Technique" - Nöromusküler Monitörizasyon): Süksinilkolin enjeksiyonundan hemen önce sağ veya sol ayak bileğine (veya ön kola) bir tansiyon manşonu takılır ve sistolik kan basıncının üzerine (örn. 200-250 mmHg) şişirilir. Kas gevşetici bu ekstremiteye ulaşamaz; böylece genel vücut kasları felçteyken izole ayakta/kolda motor tonik-klonik nöbet süresi net olarak gözlemlenebilir!'
    ],
    // 4b) Varsa prosedür spesifik gerekli vasküler erişimler
    vascularAccess: [
      'En az bir adet güvenli 20G veya 18G periferik intravenöz yol (indüksiyon ajanlarının, kas gevşeticinin ve acil kardiyak ilaçların gecikmeksizin uygulanması için üç yollu musluk ve uzatma hattı ile).'
    ],
    // 4c) Hasta pozisyonu & fizyolojik güvenlik önlemleri
    patientPosition: 'Supine (Sırtüstü) Pozisyonu; Baş hafif ekstansiyonda ("Sniffing" koklama pozisyonu).',
    patientPositionDetails: [
      'Başın altına yumuşak bir yastık konur, boyun nötral-hafif ekstansiyona getirilir.',
      'Nöbet sırasında ekstremite hareketlerinin sedyeye çarpıp yaralanmaya neden olmaması için sedye kenarlıkları yastıklanır veya personeller tarafından ekstremiteler nazikçe desteklenir (aşırı sert sabitleme kırık/çıkık riski yaratır, serbest hafif rehberlik yapılmalıdır).',
      'İşlem bittiğinde hasta sol lateral derlenme (recovery) pozisyonuna çevrilerek tükürük ve salgıların aspirasyonu önlenir.'
    ],
    // 4d) Prosedür bazlı anestezi yönetimi
    anesthesiaManagement: [
      'İki Fazlı Hemodinamik Yanıtın Yönetimi (En Kritik Anestezi Yönetimi):',
      '1. Faz (Parasempatik / Vagal Deşarj): Elektriksel stimulus anında gelişir. Geçici sinüs bradikardisi, nodal ritim, hipotansiyon ve hatta 3-5 saniyelik asistoli duraklamaları görülebilir; tükürük ve bronşiyal sekresyonlar artar. Ciddi bradikardi veya asistoli riski yüksek hastalarda premedikasyonda Atropin (0.4-0.6 mg IV) veya Glikopirolat (0.2 mg IV) uygulanmalıdır.',
      '2. Faz (Sempatik Fırtına): Nöbet aktivitesi başladığında masif endojen katekolamin (adrenalin/noradrenalin) fırtınası kopar. Şiddetli taşikardi, sistolik kan basıncının fırlaması (> 200-220 mmHg), ventriküler ektopik atımlar ve miyokardiyal oksijen tüketiminde dramatik artış gelişir.',
      '• Sempatik fırtınanın kontrolü: Koroner arter hastalığı, anevrizması veya hipertansiyonu olan hastalarda elektriksel uyarı öncesinde ultra kısa etkili beta bloker Esmolol (0.5 - 1.0 mg/kg IV bolus) veya Labetalol (5 - 10 mg IV) ya da Remifentanil (0.5 - 1.0 mcg/kg IV) uygulanarak hemodinamik tepe noktası baskılanmalıdır.',
      'Adım Adım İndüksiyon Protokolü:',
      '• 1. Preoksijenasyon: %100 Oksijen ile 3 dakika sakin soluma veya 8 derin tidal nefes.',
      '• 2. İndüksiyon Hipnotiği: Propofol (0.75 - 1.2 mg/kg IV) veya Metodeksital (0.75 - 1.0 mg/kg IV) yavaşça titre edilir. Göz kapağı refleksi kaybolduğunda indüksiyon tamamdır.',
      '• 3. Manşonun Şişirilmesi: Ekstremitedeki izole tansiyon manşonu sistolik basıncın üzerine şişirilir.',
      '• 4. Kas Gevşetici: Süksinilkolin (0.5 - 1.0 mg/kg IV) uygulanır. Yüz, boyun ve bacaklardaki fasikülasyonlar izlenir; fasikülasyonlar bittiğinde tam gevşeme sağlanmıştır.',
      '• 5. Isırma Bloğu: Yumuşak silikon bite block ağıza güvenle yerleştirilir; dudak ve dilin sıkışmadığı kontrol edilir.',
      '• 6. Elektriksel Stimülasyon: Psikiyatrist tarafından stimulus verilir.'
    ],
    // 4e) Prosedür bazlı hava yolu yönetimi
    airwayManagement: [
      '%100 Oksijen ile Hiperventilasyon Tekniği (Spesifik ve Hayati Önemde): İndüksiyon ve kas gevşemesi sağlandıktan sonra elektrik akımı verilene kadar balon-maske ile orta derecede hiperventilasyon (EtCO2 ~ 30-35 mmHg) uygulanır. Hipokapni nöbet eşiğini düşürür, terapötik nöbet süresini ve kalitesini artırır; ayrıca serebral dokuyu hipoksiye karşı korur.',
      'Isırma Koruması (Bite-Block): Elektriksel stimulus anında masseter kaslarının şiddetli spazmı nedeniyle dişler birbirine kilitlenir. Dişleri, dili ve mandibulayı korumak için elektrik akımı verilmeden önce özel ısırma koruyucusu yerleştirilmeli; stimülasyon anında balon-maske hafifçe geri çekilerek göğüs hareketi izlenmelidir.',
      'Nöbet Sırası ve Sonrası Havayolu: Nöbet tamamlandıktan sonra ısırma bloğu çıkartılır, orofarenksteki sekresyonlar nazikçe aspire edilir ve hasta kendi spontan solunum eforuna ve öksürük refleksine kavuşana kadar %100 O2 ile balon-maske ventilasyonuna devam edilir.'
    ],
    // 4f) Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları
    criticalSurgicalStages: [
      'Yetersiz Nöbet Süresi (< 15-20 saniye Motor Nöbet): Subterapötiktir, klinik iyileşme sağlamaz. Nedenleri: Aşırı propofol dozu, benzodiazepin/antikonvülzan kullanımı, yetersiz hiperventilasyon veya düşük elektrik akımı. Tekrar stimülasyon planlanıyorsa hiperventilasyon derinleştirilmeli, ikinci stimülasyon akımı artırılmalıdır.',
      'Uzamış Nöbet (> 120-180 saniye / Status Epilepticus Riski): Terapötik nöbet 2 dakikayı aştığında serebral oksijen tüketimi ve nöronal hasar riski artar. Nöbet 120 saniyeyi geçtiğinde anestezi hekimi tarafından ek Propofol (30-50 mg IV) veya Midazolam (2-4 mg IV) uygulanarak nöbet farmakolojik olarak sonlandırılmalıdır.',
      'Refleks Asistoli ve Ağır Bradikardi: Stimülasyon anında 3-5 saniyeden uzun süren asistolide derhal IV Atropin (0.5 mg) yapılmalı ve kardiyak ritim izlenmelidir.',
      'Kas Gevşemesinin Teyidi: Yetersiz gevşeme durumunda hastada şiddetli konvülsiyonlar vertebra çökme kırıklarına veya omuz çıkıklarına neden olabilir; fasikülasyonların bittiği kesinleşmeden akım verilmemelidir.'
    ],
    // 4g) Uyandırmada (emergence) dikkat edilmesi gerekenler
    emergenceNotes: [
      'Süksinilkolin Etkisinin Sona Ermesi: Kısa etkili süksinilkolin 3-5 dakika içinde spontan hidrolize uğrar; hastanın spontan tidal solunumunun yeterliliği gözlemlenmelidir.',
      'Uyanma Deliryumu ve Post-İktal Ajitasyon (%10-20 Sıklıkta): Hastalar uyandıklarında konfüzyon, ajitasyon, oryantasyon bozukluğu veya panik yaşayabilirler. Sakin bir ortam sağlanmalı, hastaya nazikçe ismiyle hitap edilmeli, agresif ajitasyon varlığında küçük doz Propofol (10-20 mg IV) veya Midazolam (1 mg IV) ile yatıştırma sağlanmalıdır.',
      'Aspirasyonun Önlenmesi: Yutma ve öksürük refleksleri tam dönene kadar hasta yan yatış pozisyonunda (lateral recovery) tutulmalıdır.'
    ]
  },

  // 5) Post-operatif yönetim dikkat edilmesi gerekenler
  postoperative: {
    // 5a) Ağrı yönetimi
    painManagement: [
      'EKT Sonrası Baş Ağrısı (Post-EKT Sefalji): Hastaların %30-50\'sinde görülen en sık komplikasyondur; serebral vazodilatasyon ve kas spazmına bağlıdır. İşlem sonrası IV Parasetamol (1 g) ilk tercih analjeziktir.',
      'Miyalji ve Çiğneme Kası Ağrıları: Süksinilkolin fasikülasyonlarına ve maseter spazmına bağlı yaygın kas ağrıları görülebilir; IV/Oral Parasetamol ve NSAİİ (İbuprofen, Deksmetoprofen veya Ketorolak) ile başarıyla kontrol edilir.',
      'Cerrahi yara veya visseral ağrı bulunmadığı için opioid analjezik kullanımı gerekmez.'
    ],
    // 5b) Varsa PROSPECT rehber önerileri
    prospectRecommendations: [
      'Profilaktik Analjezi: Şiddetli post-EKT baş ağrısı öyküsü olan hastalarda indüksiyon sırasında veya derlenmede profilaktik IV Parasetamol (1 g) ve/veya IV Ketorolak uygulanması ağrı insidansını belirgin azaltır.',
      'Postoperatif Bulantı ve Kusma (PONV) Profilaksisi: İndüksiyonda Propofol kullanılması güçlü antiemetik koruma sağlar; bulantı öyküsü olan veya etomidat kullanılan vakalarda IV Ondansetron (4 mg) veya Deksametazon (4 mg) eklenmesi önerilir.',
      'Kas Fasikülasyon Ağrısının Önlenmesi: Şiddetli miyalji yaşayan hastalarda süksinilkolin dozu kilo başına tam hesaplanmalı, aşırı dozlardan kaçınılmalıdır.'
    ],
    // 5c) Varsa ERAS rehberi önerileri
    erasRecommendations: [
      'Hızlı ve Güvenli Derlenme (Ambulatuvar NORA Standartları): Kısa etkili indüksiyon ajanlarıyla hastanın derlenme odasında (PACU) hızlı uyanması ve bilişsel oryantasyonunun toparlanması hedeflenir.',
      'Kognitif İyileşme Takibi: Hastanın oryantasyonunun (kişi, yer, zaman) takibi; geçici hafıza kusurları ve konfüzyonun psikiyatri hekimiyle multidisipliner değerlendirilmesi.',
      'Taburculuk Kriterleri (Aldrete / PADSS Skoru ≥ 9): Vital bulguları stabil, oral sıvı tolere eden, baş ağrısı kontrol altına alınmış ve yanında sorumlu bir refakatçisi bulunan hastaların güvenle servise veya taburculuğa yönlendirilmesi; hastanın en az 24 saat araç kullanmaması gerektiğinin yazılı olarak tebliğ edilmesi.'
    ]
  },

  // Kullanılabilecek kaynaklar (en sonda yer alır)
  references: {
    jaffeReference: "Jaffe, R. A., & Schmiesing, C. I. (2014). Anesthesiologist's Manual of Surgical Procedures (5th ed.). Section XVII: Nonoperating Room Anesthesia (NORA) - Electroconvulsive Therapy (ECT), pp. 1448–1452. Lippincott Williams & Wilkins.",
    erasReference: 'Enhanced Recovery After Surgery (ERAS®) Society Principles for Ambulatory Anesthesia & Non-Operating Room Anesthesia (NORA) Recovery Guidelines.',
    prospectReference: 'PROSPECT Guidelines & Clinical Consensus for Post-ECT Headache, Myalgia and PONV Management.',
    otherReferences: [
      'American Psychiatric Association (APA) Task Force on ECT: The Practice of Electroconvulsive Therapy: Recommendations for Treatment, Training, and Privileging (2nd ed.).',
      'American Society of Anesthesiologists (ASA): Practice Advisory on Anesthetic Care for Electroconvulsive Therapy.',
      'Miller, R. D., et al. Miller’s Anesthesia (9th ed.). Chapter 82: Non-Operating Room Anesthesia (NORA) - Electroconvulsive Therapy.',
      'Bryson, E. O., & Aloysi, A. S. (2020). Anesthesia for Electroconvulsive Therapy: An Update. Anesthesiology Clinics, 38(3), 565–577.',
      'The Royal College of Psychiatrists: ECT Accreditation Service (ECTAS) - Minimum Standards for the Administration of ECT (7th ed.).'
    ]
  }
};
