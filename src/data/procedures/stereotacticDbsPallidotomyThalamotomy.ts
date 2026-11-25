import { ProcedureDefinition } from '../../types/procedures';

/**
 * Stereotaktik Fonksiyonel Girişimler: Derin Beyin Stimülasyonu (DBS), Pallidotomi ve Talamotomi
 * (Stereotactic Procedures: Deep Brain Stimulation, Pallidotomy, and Thalamotomy)
 *
 * Jaffe (6th ed., 2020, Section II: Neurosurgery - Stereotactic Procedures: Deep Brain Stimulation,
 * Pallidotomy, and Thalamotomy), PROSPECT Craniotomy Guidelines (Mestdagh et al., EJA 2023),
 * World Society for Stereotactic and Functional Neurosurgery (WSSFN),
 * Movement Disorder Society (MDS) ve SNACC Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const stereotacticDbsPallidotomyThalamotomy: ProcedureDefinition = {
  id: 'stereotactic-dbs-pallidotomy-thalamotomy',
  name: 'Stereotaktik Fonksiyonel Girişimler: Derin Beyin Stimülasyonu (DBS), Pallidotomi ve Talamotomi',
  shortCode: 'DBS-PALLİDOTOMİ-TALAMOTOMİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Fonksiyonel & Stereotaktik Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Hareket bozuklukları (Parkinson hastalığı, esansiyel tremor, distoni) ve seçilmiş nöropsikiyatrik/epilepsi tablolarında; stereotaktik çerçeve (Leksell, CRW) veya robotik nöronavigasyon kılavuzluğunda subkortikal derin çekirdeklere (STN, GPi, Vim) ulaşılarak uygulanan nöromodülasyon (Derin Beyin Stimülasyonu - DBS) veya radyofrekans (RF) termokoagülasyon ile ablatif lezyonlama (Stereotaktik Pallidotomi veya Talamotomi) ameliyatıdır. Uyanık kranyal fazda mikroelektrot kayıtları (MER) ve makrostimülasyon ile terapötik etkinlik (tremor ve rijiditenin çözülmesi) ile yan etki eşikleri (kapsüla interna uyarımıyla parestezi/motor kasılma/disartri, optik traktus uyarımıyla fosfen/görme alanı defekti) milimetrik olarak haritalanır; DBS olgularında Faz II aşamasında subklaviküler puls jeneratörü (IPG) implante edilir.',
  indications: [
    'Parkinson Hastalığı — N. Subthalamicus (STN) veya Globus Pallidus internus (GPi) DBS: Medikal L-Dopa tedavisine dirençli motor dalgalanmalar ("Off" periyotları), şiddetli L-Dopa kaynaklı tepe dozu diskinezileri ve ilaç tedavisine dirençli istirahat tremoru',
    'Stereotaktik Pallidotomi (GPi RF Lezyonlama): DBS implantasyonuna uygun olmayan, tek taraflı şiddetli Parkinsonian diskinezisi ve rijiditesi bulunan olgularda posteroventral GPi ablasyonu',
    'Stereotaktik Talamotomi (Vim Çekirdeği RF Lezyonlama) veya Talamik (Vim) DBS: Medikal tedaviye (propranolol, primidon) dirençli şiddetli Esansiyel Tremor veya Parkinsonian/rubral tremor',
    'Primer ve Sekonder Distoni (Jeneralize, Segmental veya Servikal Distoni / Tortikollis): Bilateral GPi DBS implantasyonu (status distonikus ve servikal deformiteye bağlı zor hava yolu riski taşır!)',
    'Tedaviye Dirençli Obsesif Kompulsif Bozukluk (OKB) ve Dirençli Epilepsi: Ventral kapsül/ventral striatum (VC/VS) veya anterior talamik nükleus (ANT) DBS'
  ],
  averageDuration: '3.5 - 6.5 saat (Stereotaktik çerçevenin lokal anestezi/hafif sedasyon ile kafatasına tespiti, stereotaktik BT/MR füzyonu ve planlama: 60-90 dk; Faz I: Burr-hole açılışı, mikroelektrot kayıtları [MER], makrostimülasyon veya RF lezyonlama ve kalıcı elektrot fiksasyonu: 120-180 dk; DBS Faz II: Genel endotrakeal anestezi altında boyun tünellemesi ve subklaviküler IPG cebi implantasyonu: 45-60 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 150 mL (Eksternal kan kaybı minimaldir; ancak kılavuz kanül, mikroelektrot veya RF probu derin sulkal veya talamostriat/lentikülostriat damarları zedelerse semptomatik intrakraniyel hematom [%1 - %2] gelişebilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Eksternal Kan Kaybı / Kritik İntraserebral Mikrokanama Riski (%1 - %2)',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması yeterlidir; rutin eritrosit süspansiyonu hazırlığı gerekmez',
    transfusionProbability: '< %1 (İntraserebral masif hematom nedeniyle açık kraniyotomiye dönülmedikçe transfüzyon gerekmez)',
    criticalBleedingSources: [
      'Derin Sulkal Arterler ve Pial Yüzey Venleri (Burr-hole altından kanül/elektrot ilerletilirken kortikal giriş noktasındaki damarlar)',
      'Talamoperforatör ve Lentikülostriat Derin Penetran Arterler (STN, GPi veya talamus komşuluğu)',
      'Diploik ve Emisser Venler (Yarı oturur pozisyonda Venöz Hava Embolisi [VAE] giriş noktası)',
      'Subklaviküler İnsizyon ve Tünelleme Hattı (A. thoracica interna dalları ve V. cephalica — Faz II aşamasında)'
    ],
    hemostasisStrategies: [
      'Kortikal giriş noktasında dural bipolar koagülasyon ve damarsız sulkus/girus trasesinin preoperatif 3T MRG traktografide seçilmesi',
      'İntraoperatif Sıkı Kan Basıncı Kontrolü: Kanül ve elektrot beyin parankimine ilerletilirken sistolik KB < 130 - 140 mmHg tutulmalıdır (hipertansiyon intraserebral hematom riskini katlar)',
      'RF Lezyonlama Güvenliği: Önce 42 - 45°C\'de 60 saniye geri dönüşümlü test lezyonlaması; nörolojik defisit olmadığı doğrulanınca 70 - 80°C\'de 60 saniye kalıcı lezyonlama'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'İki Aşamalı Anestezi Protokolü (Altın Standart):',
      '  - Faz I (Kranyal Aşama — MER, Makrostimülasyon ve RF Lezyonlama): Monitörize Anestezi Bakımı (MAC) / Uyanık Hasta — Deksmedetomidin infüzyonu (0.2 - 0.4 mcg/kg/saat) veya ultra-düşük doz Remifentanil; MER kayıtları ve klinik testler başlamadan 20 - 30 DAKİKA ÖNCE tüm sedatifler TAMAMEN KESİLİR',
      '  - Faz II (Subklaviküler IPG Cebi ve Tünelleme — Yalnızca DBS İçin): Genel Endotrakeal Anestezi (GETA — ETT, LMA\'ya KESİNLİKLE tercih edilir! Parkinson hastalarında gastroparezi, disfaji, aspirasyon ve laringospazm riski yüksektir)'
    ],
    alternative: [
      'Asleep DBS (Genel Anestezi Altında DBS): İntraoperatif MRG (iMRI) veya BT eşliğinde doğrudan anatomik hedefleme ile uyanık testleme yapılmaksızın GETA altında elektrot implantasyonu (ağır distoni, şiddetli anksiyete/klostrofobi veya pediatrik olgularda)',
      'İzole Pallidotomi / Talamotomi İçin: Tüm operasyon lokal anestezi + uyanık MAC altında tamamlanır (Faz II IPG aşaması yoktur)'
    ],
    clinicalRationale: 'Kranyal fazda STN/GPi/Vim nöronal deşarjlarını (MER) ve makrostimülasyon klinik yanıtlarını korumak için testten 20 - 30 dakika önce tamamen kesilebilen Deksmedetomidin bazlı uyanık MAC altın standarttır. Faz II boyun tünellemesi ve subklaviküler IPG implantasyonunda ise Parkinson hastalarındaki gastroparezi, disfaji, sialore ve vokal kord distonisi/laringospazm riski nedeniyle LMA yerine güvenli Endotrakeal Tüp (GETA) tercih edilir.',
    notes: 'DBS, PALLİDOTOMİ VE TALAMOTOMİDE 6 HAYATİ ANESTEZİ KURALI: (1) ANTİDOPAMİNERJİK ANTİEMETİK/ANTİPSİKOTİK YASAĞI; (2) MAO-B İNHİBİTÖRLERİYLE MEPERİDİN/TRAMADOL (SEROTONİN SENDROMU) VE EFEDRİN (HİPERTANSİF KRİZ) YASAĞI; (3) MER ÖNCESİ 20-30 DK SEDATİF KESİMİ (GPi GABAERJİK HASSASİYETİ VE VOLATİL BASKILAMASI); (4) L-DOPA\'NIN PACU\'DA TAM DOZ ERKEN BAŞLANMASI (PARKINSONİZM-HİPERPİREKSİ SENDROMU ÖNLEMİ); (5) ÇERÇEVE HAVA YOLU KİLİTLENMESİ VE YARI OTURUR VAE; (6) İMPLANTE IPG KOTER/DİATERMİ/MRG GÜVENLİĞİ.',
    rulesTitle: 'DBS, PALLİDOTOMİ VE TALAMOTOMİDE ANESTEZİNİN 6 VAZGEÇİLMEZ KURALI',
    indispensableRules: [
      {
        number: 1,
        title: 'ANTİDOPAMİNERJİK İLAÇLARIN (METOKLOPRAMİD, DROPERİDOL, HALOPERİDOL) MUTLAK YASAĞI',
        content: 'Parkinson hastalarında santral D2 reseptör blokajı yapan Metoklopramid, Droperidol, Haloperidol, Proklorperazin, Klorpromazin ve Prometazin KESİNLİKLE KONTRENDİKEDİR! Akut ağır rijidite, akinezi, laringospazm veya Nöroleptik Malign Sendrom (NMS) benzeri krizi tetikler. POBK profilaksisi ve tedavisi için yalnızca Ondansetron (5-HT3 antagonisti) + Deksametazon kullanılır.'
      },
      {
        number: 2,
        title: 'MAO-B İNHİBİTÖRÜ ETKİLEŞİMLERİ: MEPERİDİN / TRAMADOL VE EFEDRİN YASAĞI',
        content: 'Selejilin, Rasajilin veya Safinamid (MAO-B inhibitörü) kullanan hastalarda Meperidin (Petidin) ve Tramadol ölümcül Serotonin Sendromu, hiperpireksi, rijidite ve nöbete yol açar — KESİNLİKLE YASAKTIR! Ayrıca indirekt etkili Efedrin, MAO-B inhibitörleriyle şiddetli hipertansif krizi tetikleyebilir; hipotansiyonda direkt etkili Fenilefrin veya Noradrenalin titre edilmelidir.'
      },
      {
        number: 3,
        title: 'MER ÖNCESİ 20 - 30 DK SIFIR SEDASYON (VOLATİLLER VE GPi HASSASİYETİ)',
        content: 'Propofol, benzodiazepinler ve VOLATİL ANESTEZİKLER (Sevofluran/İzofluran/Desfluran) STN, GPi ve Vim nöronal ateşlemesini baskılar; özellikle GPi çekirdeği GABAerjik baskılanmaya STN\'den belirgin olarak daha hassastır! Deksmedetomidin ve tüm sedatifler MER başlamadan en az 20 - 30 DAKİKA ÖNCE tamamen kesilmeli; kayıt sırasında elektrik paraziti yaratan ısıtıcı battaniyeler geçici kapatılmalıdır.'
      },
      {
        number: 4,
        title: 'PACU\'DA TAM BAZAL L-DOPA\'NIN ACİL YENİDEN BAŞLANMASI (PHS ÖNLEMİ)',
        content: 'DBS pili (IPG) ameliyathanede KAPALI (OFF) bırakılır (programlama 2 - 4 hafta sonra başlar). Uzun süreli "Off" durumu hayatı tehdit eden Parkinsonizm-Hiperpireksi Sendromu (PHS: ateş, ağır rijidite, rabdomiyoliz, solunum yetmezliği) tetikleyebilir! Uyanma odasında (PACU) yutma/bilinç izin verir vermez hastanın TAM BAZAL L-DOPA REJİMİ yavaş artırma yapılmaksızın EN KISA SÜREDE başlatılır; oral alamayanlarda NG tüpten ezilmiş L-Dopa, transdermal Rotigotin yaması veya subkütan Apomorfin kurtarma yolları kullanılır.'
      },
      {
        number: 5,
        title: 'ÇERÇEVE HAVA YOLU KİLİTLENMESİ, YARI OTURUR VAE VE PNÖMOSEFALİ/N2O YASAĞI',
        content: 'Rijit kafa çerçevesi (Leksell/CRW) direkt laringoskopiyi imkansız kılar: Videolaringoskop, Fiberoptik, LMA ve çerçeveye/masaya bantlı alyan anahtarı (Allen key) hazır olmalıdır. Yarı oturur pozisyonda burr-hole\'dan Venöz Hava Embolisi (VAE — uyanık hastada ani öksürük krizi, dispne, EtCO2 düşüşü!) ve pnömosefali/beyin şifti gelişebilir: Baş elevasyonu 15 - 20° ile sınırlanır, N2O KESİNLİKLE kullanılmaz, VAE\'de saha SF/kemik mumuyla kapatılıp %100 O2 ve baş indirimi uygulanır.'
      },
      {
        number: 6,
        title: 'İMPLANTE IPG KOTER, DİATERMİ VE MRG GÜVENLİĞİ',
        content: 'DBS cihazı implante edildikten sonra (Faz II ve sonraki tüm girişimlerde) bipolar koter tercih edilir; monopolar koter zorunluysa düşük güçte, kısa aralıklı ve topraklama plağı IPG\'den uzakta uygulanır. KISA DALGA / MİKRODALGA DİATERMİ MUTLAK KONTRENDİKEDİR (elektrot ucunda ölümcül termal beyin yanığı!). MRG yalnızca MR-koşullu sistemlerde düşük SAR limiti ve T/R kafa koili ile MRG modunda çekilebilir.'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Hareket Bozuklukları Nöroloğu Konsültasyonu: UPDRS Motor Skoru III (L-Dopa On/Off testi), L-Dopa yanıtlılığı, kognitif değerlendirme (MMSE / MoCA — belirgin demans DBS için kontrendikedir), psikiyatrik tarama ve ameliyat sonrası L-Dopa/kurtarma tedavisi planı.',
      'Nöroşirürji ve Nöroradyoloji Konsültasyonu: 3 Tesla Volümetrik T1/T2, FGATIR ve Traktografi MRG; hedef çekirdek sınırları (STN ~3x6x9 mm, GPi optik traktus mesafesi, Vim sınırları), serebral atrofi ve sulkal damar haritalaması.',
      'Kardiyoloji Konsültasyonu: Hipertansiyon regülasyonu (SKB < 130 - 140 mmHg hedefi), otonomik nöropatiye bağlı ortostatik hipotansiyon değerlendirmesi ve varsa kardiyak pacemaker/ICD ile DBS elektromanyetik etkileşim kontrolü.',
      'Psikiyatri Konsültasyonu: Depresyon, dürtü kontrol bozukluğu, halüsinasyon ve postoperatif deliryum yatkınlığı.'
    ],
    historyAndPhysical: [
      'Antiparkinson İlaçlar ve "Off" Durumu Yönetimi: İntraoperatif tremor/rijidite testleri için L-Dopa ve dopamin agonistleri nöroloji planına göre operasyon sabahı (veya 12 saat önce) KESİLİR. MAO-B inhibitörü (Selejilin, Rasajilin, Safinamid) ve COMT inhibitörü (Entakapon) kullanımı kırmızı bayrak olarak işaretlenir (Meperidin/Tramadol/Efedrin yasağı ve epinefrin hassasiyeti!).',
      'Non-PD Distoni Olguları (Servikal Distoni / Jeneralize Distoni): Tortikollis, servikal kontraktür ve sabit boyun deformitesine bağlı ZOR HAVA YOLU öngörülmeli; antikolinerjik/baklofen/benzodiazepin kesilmesiyle tetiklenebilecek STATUS DİSTONİKUS (rabdomiyoliz, hipertermi, solunum yetmezliği) riskine karşı ilaç planı netleştirilmelidir.',
      'Parkinson Hastalığı Sistemik Özellikleri: Gastroparezi, disfaji, sialore, sessiz aspirasyon, restriktif solunum paterni, vokal kord distonisi/laringospazm riski ve otonomik ortostatik hipotansiyon sorgulanır.',
      'Zor Hava Yolu ve Klostrofobi Taraması: Çerçeve takılıyken ağız açıklığı/boyun kısıtlılığı ve hastanın 3 - 5 saat uyanık kalma toleransı değerlendirilir.'
    ],
    laboratoryAndTests: [
      'AJANA ÖZGÜ ANTİKOAGÜLAN VE ANTİAGREGAN KESİLME PROTOKOLÜ (Derin İntraserebral Kanama Riski):',
      '  - Varfarin: ~5 gün önce kesilir, INR ≤ 1.2 - 1.3 doğrulanır (DMAH köprülemede profilaktik son doz ≥ 12 saat, terapötik son doz ≥ 24 saat önce kesilir).',
      '  - DOAC (Apiksaban, Rivaroksaban, Edoksaban): En az 48 - 72 saat; Dabigatran: En az 72 - 96 saat (CrCl < 50 mL/dk ise ≥ 96 - 120 saat) önce kesilir.',
      '  - Klopidogrel: 5 - 7 gün; Prasugrel: 7 - 10 gün; Tikagrelor: 5 gün; Aspirin: 5 - 7 gün önce kesilir (yüksek kardiyovasküler/stent riskinde kardiyoloji–nöroşirürji ortak değerlendirmesi).',
      'Tam Kan Sayımı ve Koagülasyon Paneli: Trombosit ≥ 100.000/mm³, PT/INR, aPTT, Fibrinojen.',
      'Kan Grubu, Antikor Tarama ve Tip & Screen (T&S) doğrulaması.',
      'Serum Elektrolitleri, Böbrek/Karaciğer Fonksiyon Testleri ve distoni/rijidite hastalarında bazal CK.',
      'Stereotaktik Planlama İstasyonuna Yüklenmiş 3T MRG ve İnce Kesit BT Füzyon Verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line — Kalp/Tragus Seviyesinde Sıfırlanmış): Çerçeve takılışı öncesinde yerleştirilmelidir. Kanül/elektrot geçişlerinde SKB < 130 - 140 mmHg tutulması ve vazoaktif ajanların (Esmolol, Nikardipin, Labetalol; hipotansiyonda direkt etkili Fenilefrin/Noradrenalin) anlık titrasyonu için zorunludur.',
      'Mikroelektrot Kaydı (MER) ve Klinik Nörolojik İzlem: Nörofizyolog/nörolog eşliğinde hedef çekirdek ateşleme paternlerinin (STN: 35 - 50 Hz düzensiz patlamalar; GPi: 60 - 80 Hz sürekli yüksek frekans) takibi. (Not: Uyanık MER fazında BIS monitörizasyonu stereotaktik çerçeve, frontal burr-hole ve elektrik artefaktı nedeniyle pratik değildir; uyanıklık doğrudan klinik kooperasyonla izlenir!)',
      'Venöz Hava Embolisi (VAE) İzlemi: Sürekli yan akım (sidestream) nazal EtCO2 kapnografi (ani düşüş VAE alarmıdır!), SpO2 ve uyanık hastada ani öksürük/dispne takibi; dik pozisyonlarda prekordiyal Doppler.',
      'İntraoperatif Floroskopi (C-Kollu Skopi) veya O-Arm / iCT: Elektrot/RF probu derinliğinin milimetrik doğrulanması.',
      'Isı Problu Foley İdrar Sondası: Uzun uyanık ameliyatta mesane distansiyonuna bağlı ajitasyon ve hipertansiyonu önlemek için.',
      '5 Derivasyonlu EKG (MER sırasında elektrik parazitlerini süzen filtreli derivasyonlar).'
    ],
    vascularAccess: [
      'En az 2 adet güvenli periferik intravenöz yol (16G veya 18G; cerrahi alan dışında)',
      'Hassas İnfüzyon Pompaları (Deksmedetomidin, Remifentanil, Esmolol/Nikardipin ve direkt etkili Fenilefrin/Noradrenalin hazır)'
    ],
    patientPosition: 'Hafif Yarı Oturur (Semi-Fowler) Pozisyon, Gövde 15 - 20° Hafif Elevasyonda',
    patientPositionDetails: [
      'Başın rijit stereotaktik çerçevesi ameliyat masasının adaptörüne sıkıca kilitlenir.',
      'Aşırı Baş Dikliğinden Kaçınılmalıdır (≤ 20°): Başın > 25 - 30° dikleştirilmesi burr-hole açıldığında pnömosefali, yerçekimine bağlı beyin şifti (5 - 10 mm koordinat sapması) ve Venöz Hava Embolisi (VAE) riskini belirgin artırır.',
      'Hasta Konforu ve Bası Koruması: Diz altına yastık, bel desteği, topuk jel pedleri ve elektrik paraziti oluşturmayan ısıtma önlemleri (MER esnasında aktif hava ısıtıcı geçici kapatılır).',
      'Şeffaf Cerrahi Çadır (Drape Tent): Nöroloğun hastanın yüz mimiklerini, göz hareketlerini ve konuşmasını kesintisiz gözlemleyebilmesi için.'
    ],
    anesthesiaManagement: [
      '1. Çerçeve Takılması ve Skalp Bloğu Fazı:',
      '  - Çivi yerlerine derin lokal anestezik infiltrasyonu (%0.25 - 0.5 Bupivakain veya Ropivakain) veya hedefli skalp bloğu + düşük doz Fentanil (25 - 50 mcg) / Remifentanil.',
      '  - LAST ve Epinefrin Uyarısı: Bilateral skalp bloğu + 4 çivi yeri infiltrasyonunda kümülatif lokal anestezik maksimum toksik dozu (LAST) KESİNLİKLE aşılmamalıdır! COMT (Entakapon) veya MAO-B inhibitörü kullanan hastalarda epinefrinli solüsyonlar abartılı hipertansiyon/taşikardi yaratabileceğinden epinefrin kısıtlanır veya epinefrinsiz solüsyon tercih edilir.',
      '2. Burr-Hole ve Dural Açılış Fazı:',
      '  - Solunumu baskılamayan hafif Deksmedetomidin infüzyonu (0.2 - 0.4 mcg/kg/saat); N2O KESİNLİKLE yasaktır.',
      '  - Venöz Hava Embolisi (VAE) Alarmı: Uyanık hastada burr-hole açılışında ani açıklanamayan öksürük nöbeti, göğüs ağrısı, dispne veya EtCO2 düşüşü gelişirse cerrah derhal uyarılır, saha SF/kemik mumuyla kapatılır, %100 O2 verilir ve baş indirilir.',
      '3. Mikroelektrot (MER) ve Klinik Testleme / RF Lezyonlama Fazı (EN KRİTİK EVRE):',
      '  - Tüm Sedatifler MER Başlamadan 20 - 30 DAKİKA ÖNCE TAMAMEN KESİLİR! (Propofol, benzodiazepinler ve volatil anestezikler nöronal deşarjı siler; GPi çekirdeği GABAerjik baskılanmaya STN\'den daha hassastır.)',
      '  - Test Protokolü (STN/GPi/Vim): Tremor, dişli çark rijiditesi, parmak vurma, 1\'den 10\'a sayma/konuşma (disartri), görme alanı/fosfen (GPi optik traktus komşuluğu) ve kapsüla interna motor kasılma eşikleri tam uyanıkken test edilir.',
      '  - RF Termokoagülasyon (Pallidotomi/Talamotomi): Test lezyonlaması 42 - 45°C\'de 60 sn → yan etki yoksa kalıcı lezyonlama 70 - 80°C\'de 60 sn.',
      '4. Faz II — Subklaviküler IPG Cebi ve Tünelleme (DBS İçin):',
      '  - Çerçeve çıkarılır. Parkinson hastalarında gastroparezi, disfaji ve laringospazm riski nedeniyle LMA yerine Genel Endotrakeal Anestezi (GETA — ETT) tercih edilir.',
      '  - İdame: Propofol + Remifentanil veya Sevofluran + Remifentanil. POBK profilaksisi: Ondansetron 4 mg IV + Deksametazon 4 - 8 mg IV (Metoklopramid/Droperidol/Haloperidol KESİNLİKLE YASAK!).',
      '  - İmplante IPG Koter Güvenliği: Yalnızca bipolar koter kullanılır; kısa dalga/mikrodalga diatermi MUTLAK KONTRENDİKEDİR.'
    ],
    airwayManagement: [
      'Faz I (Uyanık Aşama): Nazal kanül ile O2 + sürekli yan akım (sidestream) EtCO2 kapnografi.',
      'ÇERÇEVELİ HASTADA ACİL HAVA YOLU ALGORİTMASI:',
      '  - Nöbet, aspirasyon, VAE kollapsı veya apne geliştiğinde çerçeve direkt laringoskopiyi engeller!',
      '  - Hiperangüle Videolaringoskop (GlideScope/McGrath), Fiberoptik bronkoskop, LMA ve Leksell/CRW alyan anahtarı (çerçeveye/masaya flasterle sabitlenmiş) başucunda hazır bulundurulmalıdır.',
      'Faz II (IPG Aşaması): Endotrakeal Tüp (GETA / ETT) LMA\'ya tercih edilir (PD gastroparezi, aspirasyon ve laringospazm riski). Servikal distoni/tortikollis olgularında videolaringoskop veya uyanık fiberoptik entübasyon planlanır.'
    ],
    criticalSurgicalStages: [
      '1. Stereotaktik Çerçeve Tespiti ve Görüntüleme Füzyonu: Sempatik pik kontrolü ve LA toksik doz limiti.',
      '2. Burr-Hole ve Dural Açılış: Pnömosefali, beyin şifti ve Venöz Hava Embolisi (VAE) önlemi.',
      '3. Mikroelektrot (MER) İlerlemesi: Sedasyonsuz (≥ 20 - 30 dk kesilmiş) nöronal haritalama; elektrik paraziti yaratan cihazların kapatılması.',
      '4. Makrostimülasyon / RF Test Lezyonlaması: Terapötik yanıt ile kapsüler/optik yan etki eşiklerinin tespiti.',
      '5. Kalıcı DBS Elektrotunun Kilitlenmesi veya RF Kalıcı Ablasyon (70 - 80°C, 60 sn).',
      '6. Faz II Genel Endotrakeal Anestezi, Boyun Tünellemesi ve Subklaviküler IPG İmplantasyonu (bipolar koter güvenliği).'
    ],
    emergenceNotes: [
      'Faz I Sonrası: Hasta uyanıktır; SKB < 130 - 140 mmHg sürdürülür.',
      'Faz II (GETA) Sonrası Pürüzsüz Ekstübasyon: Öksürme ve hipertansiyon intraserebral mikrokanamayı ve subklaviküler cep hematomunu tetikler; ayrıca PD hastalarında ekstübasyonda laringospazm/vokal kord distonisi ve üst hava yolu obstrüksiyonu yakından izlenir.',
      'Acil Nörolojik Değerlendirme: Bilinç, kooperasyon, 4 ekstremite motor gücü, pupiller, görme alanı ve konuşma kaydedilir. Yeni fokal defisit veya gecikmiş uyanmada acil Kranial BT çekilir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Multimodal ve Güvenli Analjezi Protokolü (PROSPECT Craniotomy 2023 İlkeleriyle Uyumlu):',
      '  - Çivi Yerleri, Skalp İnsizyonu, Boyun Tüneli ve Subklaviküler Cep Hattına Lokal Anestezik İnfiltrasyonu (%0.25 Bupivakain/Ropivakain — kümülatif LAST limitine ve COMT/MAO-B epinefrin uyarısına dikkat).',
      '  - Düzenli IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon).',
      '  - Kurtarma Analjeziği: Kısa etkili düşük doz IV Fentanil (25 mcg) veya Oksikodon/Hidromorfon (nörolojik muayeneyi baskılamayacak titre dozlarda).',
      '  - MUTLAK YASAKLAR: Meperidin (Petidin) ve Tramadol (MAO-B inhibitörleriyle ölümcül Serotonin Sendromu/hiperpireksi ve nöbet riski!) ile erken dönemde rutin IV NSAİİ (Deksketoprofen/Ketorolak — taze derin beyin elektrot/lezyon trasesinde intraserebral kanama riski; yalnızca nöroşirürji hemostaz/BT onayı sonrası ≥ 24 saatte değerlendirilebilir).'
    ],
    prospectRecommendations: [
      'PROSPECT Kraniyotomi Kılavuzu (Mestdagh et al., EJA 2023) doğrultusunda çivi yerleri, skalp ve subklaviküler tünel hattına lokal anestezik infiltrasyonu + düzenli Parasetamol, opioid gereksinimini ve Parkinson hastalarında deliryum riskini en aza indirir.'
    ],
    erasRecommendations: [
      'Postoperatif Fonksiyonel Nöroşirürji ve Parkinson Güvenlik Protokolü:',
      '  - L-DOPA\'NIN TAM BAZAL DOZDA ACİL YENİDEN BAŞLANMASI: DBS IPG ameliyathanede KAPALI (OFF) bırakıldığından, PACU\'da bilinç ve yutma izin verir vermez hastanın TAM BAZAL L-Dopa rejimi (yavaş artırma yapmaksızın!) derhal yeniden başlanmalıdır. Aksi halde Parkinsonizm-Hiperpireksi Sendromu (PHS / Akinetik Kriz) gelişir! Disfaji/oral alım yokluğunda NG tüpten ezilmiş L-Dopa, transdermal Rotigotin yaması veya subkütan Apomorfin kullanılır.',
      '  - Postoperatif Deliryum ve Otonomik Ortostatik Hipotansiyon: PD hastalarında postoperatif deliryum sıktır — Haloperidol ve tüm antidopaminerjikler YASAKTIR (gerekirse non-farmakolojik yaklaşım, Deksmedetomidin veya nöroloji eşliğinde düşük doz Ketiapin). İlk mobilizasyonda (4 - 6. saat) otonom nöropatiye bağlı ciddi ortostatik hipotansiyon izlenir.',
      '  - Postoperatif Kranial BT / MRG Kontrolü: İlk 2 - 4 saatte elektrot/RF lezyon doğrulaması ve intraserebral hematom/pnömosefali taraması (MRG yalnızca MR-koşullu protokolle!).',
      '  - RF Lezyonlama Sonrası Ödem Takibi: Pallidotomi/talamotomi sonrası geçici lezyon çevresi ödemde kısa süreli Deksametazon planlanabilir.',
      '  - POBK ve Donanım Takibi: Bulantıda yalnızca Ondansetron (Metoklopramid/Droperidol YASAK!); subklaviküler pil cebinde hematom/seroma/enfeksiyon takibi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2020). Anesthesiologist\'s Manual of Surgical Procedures (6th ed.). Section II: Neurosurgery - Stereotactic Procedures: Deep Brain Stimulation, Pallidotomy, and Thalamotomy. Philadelphia: Wolters Kluwer.',
    prospectReference: 'Mestdagh, F. P., Lavand\'homme, P. M., Pirard, G., Joshi, G. P., Sauter, A. R., & Van de Velde, M.; PROSPECT Working Group of ESRA. (2023). Pain management after elective craniotomy: A systematic review with procedure-specific postoperative pain management (PROSPECT) recommendations. European Journal of Anaesthesiology, 40(10), 747-757.',
    otherReferences: [
      'Venkatraghavan, L., Luciano, M., & Manninen, P. (2010). Anesthetic management of patients undergoing deep brain stimulator insertion. Anesthesia & Analgesia, 110(4), 1138-1145.',
      'Venkatraghavan, L., Rakhman, E., Krishna, V., Sammartino, F., Turnbul, D., & Brown, A. (2016). Anesthesia for deep brain stimulation: a review. Current Opinion in Anaesthesiology, 29(5), 546-551.',
      'Lozano, A. M., Lipsman, N., Bergman, H., et al. (2019). Deep brain stimulation: current challenges and future directions. Nature Reviews Neurology, 15(3), 148-160.',
      'World Society for Stereotactic and Functional Neurosurgery (WSSFN) & Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Guidelines for Deep Brain Stimulation and Movement Disorder Surgery.'
    ]
  }
};
