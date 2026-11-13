import { ProcedureDefinition } from '../../types/procedures';

/**
 * Stereotaktik Nöroşirürji: Stereotaktik Beyin Biyopsisi ve Derin Beyin Stimülasyonu (DBS / Fonksiyonel Nöroşirürji)
 * (Stereotactic Neurosurgery: Stereotactic Brain Biopsy & Deep Brain Stimulation - DBS)
 * 
 * Jaffe (5th ed., Section II: Neurosurgery - Stereotactic Procedures, pp. 474-480),
 * World Society for Stereotactic and Functional Neurosurgery (WSSFN),
 * Movement Disorder Society (MDS), SNACC (Society for Neuroscience in Anesthesiology and Critical Care)
 * ve ERAS Society Kılavuzları referans alınarak yapılandırılmıştır.
 */
export const stereotacticNeurosurgery: ProcedureDefinition = {
  id: 'stereotactic-neurosurgery',
  name: 'Stereotaktik Beyin Biyopsisi (Çerçeveli ve Çerçevesiz Tanısal Nöroşirürji Girişimleri)',
  shortCode: 'STEREOTAKTİK-BİYOPSİ',
  specialty: 'norosirurji',
  specialtyName: 'Beyin ve Sinir Cerrahisi',
  categoryTag: 'Tanısal & Stereotaktik Nöroşirürji',

  // 1) Prosedür İsmi, Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Üç boyutlu kartezyen koordinat sistemi (X, Y, Z açıları) ve milimetrik stereotaktik hedefleme rehberliğinde; kafatasına rijit olarak sabitlenen stereotaktik bir çerçeve (Leksell, CRW) veya çerçevesiz/robotik nöronavigasyon yardımıyla, açık kraniyotomiye gerek kalmaksızın küçük bir trepanasyon (burr-hole) deliğinden derin veya elokent beyin parankimine milimetrik hassasiyetle ulaşılarak lezyondan histopatolojik ve moleküler tanı amaçlı doku örneklemesi (biyopsi) yapılması ameliyatıdır. Eşzamanlı derin kist aspirasyonu veya Ommaya rezervuarı yerleşimi de uygulanabilir.',
  indications: [
    'Derin ve Elokent Yerleşimli İntrakraniyel Kitlelerin Tanısal Biyopsisi: Bazal ganglionlar, talamus, beyin sapı, periventriküler alan veya pineal bölgede yerleşen ve açık cerrahi rezeksiyonun kabul edilemez nörolojik morbidite taşıdığı tümörler',
    'Primer SSS Lenfoması Şüphesi: Cerrahi rezeksiyonun sağkalıma katkısı olmayan, kemoradyoterapi öncesi kesin histopatolojik tanı gerektiren periventriküler kitleler',
    'Multifokal veya İnoperabl İntrakraniyel Lezyonlar: Multiple beyin metastazları veya yaygın gliomatozis serebri olguları',
    'Enfeksiyöz ve Enflamatuar Beyin Lezyonları: İmmün yetmezlikli (HIV, transplant) hastalarda toksoplazmoz, tüberküloz veya mantar apselerinin tanısal aspirasyonu ve mikrobiyolojik kültür örneklemesi',
    'Kistik Tümörlerin Aspirasyonu ve Ommaya Rezervuarı Yerleşimi: Kraniofarenjiyom veya kistik metastazların dekompresyonu ve intrakaviter kemoterapi rezervuarı yerleşimi'
  ],
  averageDuration: '1.5 - 2.5 saat (Stereotaktik çerçevenin lokal anestezi/hafif sedasyon ile takılması ve stereotaktik BT/MR görüntüleme planlaması: 45-60 dk; Ameliyathanede burr-hole açılışı, dura koagülasyonu, stereotaktik kanül ile hedefe ulaşılması, çoklu kadran doku biyopsisi alınması ve frozen inceleme: 30-45 dk; Kemik mumu ile hemostaz, burr-hole ve cilt kapanışı: 15-25 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 50 - 150 mL (Standart stereotaktik biyopsi ve DBS cerrahisinde kan kaybı minimaldir; ancak biyopsi iğnesi veya DBS kılavuz kanülü derin bir serebral sulkal damara veya talamostriat vene rastlarsa intrakraniyel hematom gelişebilir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük Cerrahi Kan Kaybı / Kritik İntrakraniyel Mikrokanama Riski',
    crossMatchRequirement: 'Tip & Screen (T&S) doğrulaması yeterlidir; rutin kan hazırlığı gerekmez',
    transfusionProbability: '< %1 (İntraserebral masif hematom komplikasyonu gelişmedikçe transfüzyon gerekmez)',
    criticalBleedingSources: [
      'Derin Sulkal Arterler ve Pial Yüzey Venleri (Burr-hole altından elektrot/iğne sokulurken kortikal giriş noktasındaki damarlar)',
      'Talamoperforatör ve Lentikülostriat Derin Damarlar (Biyopsi forsepsinin damarlı tümör odağını yırtması)',
      'Subklaviküler İnsizyon ve Tünelleme Hattı (A. thoracica interna dalları ve V. cephalica)',
      'Skalp İnsizyon Kenarları ve Çerçeve Çivi Giriş Noktaları'
    ],
    hemostasisStrategies: [
      'Giriş noktasında dural bipolar koterizasyon ve damarsız sulkus/girus trasesinin preoperatif MRG traktografide seçilmesi',
      'İntraoperatif Sıkı Kan Basıncı Kontrolü: İğne veya elektrot beyin parankimine ilerletilirken sistolik KB < 130-140 mmHg tutulmalıdır (hipertansiyon intrakraniyel kanama riskini 3-4 kat artırır!)',
      'Biyopsi yatağında kanama şüphesinde kanül içinden hafif serum fizyolojik yıkaması ve aspirasyon takibi',
      'Kritik Durum: İntraserebral hematom gelişirse cerrahi kraniyotomiye dönülür'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Stereotaktik Beyin Biyopsisi İçin: Genel Endotrakeal Anestezi (GETA) VEYA Monitörize Anestezi Bakımı (MAC) + Skalp Çerçeve Blokajı',
      'Derin Beyin Stimülasyonu (DBS) Klasik Fazı İçin (Faz I - Kranyal Aşama): Monitörize Anestezi Bakımı (MAC) / "Uyanık DBS" — Deksmedetomidin infüzyonu (0.2 - 0.5 mcg/kg/saat) veya ultra-düşük doz Remifentanil; mikroelektrot kaydı (MER) ve klinik testler başlamadan 20-30 dakika önce sedasyon tamamen kesilir',
      'DBS Faz II (Subklaviküler Pil / IPG Yerleşimi): Genel Endotrakeal Anestezi (GETA) veya LMA ile derin genel anestezi (tünelleme ağrısını bloke etmek için)'
    ],
    alternative: [
      'Asleep DBS (Genel Anestezi Altında DBS): İntraoperatif MRG (iMRI) veya BT kılavuzluğunda doğrudan anatomik hedefleme ile uyanık testleme yapılmaksızın endotrakeal genel anestezi altında elektrot yerleşimi'
    ],
    clinicalRationale: 'Fonksiyonel DBS fazında mikroelektrot kayıtlarını (MER) bozmadan ve klinik nörolojik testlemeye (titreme, rijidite, konuşma) olanak sağlamak için sedasyonu test öncesi kesilebilen Deksmedetomidin/Remifentanil bazlı MAC altın standarttır. Kafa çerçevesi takılıyken ağız açıklığı ve boyun fleksiyonu kısıtlı olduğundan uyanık fazda nazal kanül + EtCO2 izlemi, acil hava yolu veya Asleep DBS/IPG fazında ise LMA/videolaringoskopik ETT tercih edilir.',
    notes: 'STEREOTAKTİK CERRAHİDE VE DBS\'TE ANESTEZİNİN 5 ALTIN KURALI: (1) ÇERÇEVE TAKILI İKEN HAVA YOLU KİLİTLENMESİ TEHLİKESİ — Kafa kemiklerine rijit olarak vidalanan stereotaktik çerçeve (Leksell/CRW), ağız açıklığını ve boyun hareketini kısıtlar; konvansiyonel laringoskopi İMKANSIZ HALE GELİR! Acil hava yolu planı (Videolaringoskop, Fiberoptik, LMA ve başucuna bantlanmış çerçevenin acil sökme anahtarı / tornavidası) hazır olmalıdır. (2) DBS MİKROELEKTROT (MER) VE KLİNİK TEST FAZINDA SIFIR SEDASYON — Propofol, benzodiazepinler ve yüksek doz opioidler nöronal ateşleme hızını baskılar ve subkortikal ritimleri yok eder; hasta uyanık, koopere olmalı ve titreme/rijidite/konuşma yan etkileri (disartri, parestezi, fosfen) anestezi baskısı olmadan test edilmelidir! (3) BEYİN ŞİFTİ (BRAIN SHIFT) VE PNÖMOSEFALİ ÖNLEMİ — Burr-hole açılıp dura kesildiğinde hava girmesi ve BOS kaçağı beynin yerçekimiyle 5-10 mm geriye çökmesine yol açar; bu durum stereotaktik koordinatları tamamen saptırır! Baş elevasyonu minimal (10-15°) tutulmalı, dura hızla fibrin yapıştırıcı/jelatin süngerle kapatılmalı ve N2O kesinlikle kullanılmamalıdır. (4) TANSİYON KONTROLÜ VE İNTRAKRANİYEL KANAMA ÖNLEMİ — Kılavuz kanül ve biyopsi iğnesi parankime girerken sistolik KB < 130-140 mmHg tutulmalıdır; ani hipertansif pik derin parankim hematomuna yol açar. (5) ELEKTRİKSEL PARAZİTİN ÖNLENMESİ — Mikroelektrot kayıtları mikrovolt düzeyinde olduğundan ortamdaki ısıtıcı battaniyeler (Bair Hugger) ve monitör kabloları kayıt anında geçici kapatılmalı/filtrelenmelidir.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Nöroşirürji ve Nöroloji / Hareket Bozuklukları Konsültasyonu: Unified Parkinson\'s Disease Rating Scale (UPDRS Motor Skoru III - On/Off testi), L-Dopa yanıtlılığı (%30\'dan fazla düzelme DBS için iyi prognostik faktördür), kognitif değerlendirme (MMSE / MoCA - demans varlığı DBS için kontrendikedir) ve psikiyatrik tarama.',
      'Nöroradyoloji Konsültasyonu: 3 Tesla Volümetrik T1/T2 ve FGATIR MRG; subkortikal hedef çekirdeklerin (STN / GPi / Vim) net sınırları, serebral atrofi ve sulkal damar haritalaması.',
      'Kardiyoloji Konsültasyonu: Hipertansiyon regülasyonu (kan basıncının operasyon boyunca stabil tutulabilmesi için preop antihipertansif tedavi optimizasyonu).',
      'Psikiyatri Konsültasyonu: Depresyon, dürtü kontrol bozukluğu ve halüsinasyon öyküsü.'
    ],
    historyAndPhysical: [
      'Antiparkinson İlaçların Yönetimi: DBS testinin güvenilir yapılabilmesi için hastanın Parkinson ilaçları (L-Dopa, Pramipeksol vb.) operasyon sabahı (veya ameliyattan önceki gece) KESİLİR ("Off" durumunda operasyona alınır). Hasta ameliyathanede tremor ve rijiditenin en belirgin olduğu tabloda değerlendirilir.',
      'Antikoagülan ve Antiagregan Tedavi: Aspirin, Klopidogrel, DOAC veya Warfarin; intrakraniyel mikrokanama riskini sıfırlamak için en az 7-10 gün önce kesilmeli, bridging gerekliyse DMAH ile yönetilmeli ve koagülasyon değerleri tam normal olmalıdır!',
      'Zor Hava Yolu Taraması: Çerçeve takıldıktan sonra ağız açıklığı, retrognati ve boyun hareketliliği (çerçeveli hastada entübasyon zorluğu öngörülmelidir).',
      'Klostrofobi ve Anksiyete: Uyanık operasyon esnasında çerçeve altında saatlerce hareketsiz kalabilme toleransı sorgulanmalıdır.'
    ],
    laboratoryAndTests: [
      'Kan Grubu, Antikor Tarama ve T&S doğrulaması.',
      'Tam Kan Sayımı ve Koagülasyon Paneli: PT/INR, aPTT, Trombosit Sayımı ve Fibrinojen (koagülopati kesinlikle ekarte edilmelidir).',
      'Serum Elektrolitleri, Böbrek ve Karaciğer Fonksiyon Testleri.',
      'Ameliyathane Stereotaktik Planlama İstasyonuna Aktarılmış Yüksek Çözünürlüklü İnce Kesit BT ve 3T MRG Füzyon Verileri.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'İnvaziv Arter Basınç Monitörizasyonu (A-Line) — Kalp Seviyesinde Sıfırlanmış: Anestezi indüksiyonu veya çerçeve takılışı ÖNCESİ takılmalıdır. Elektrot geçişlerindeki ani hipertansiyonu önlemek ve vazoaktif ajanları (Labetalol, Esmolol, Nikardipin, Noradrenalin) saniyelik titre etmek için zorunludur.',
      'Standart ASA Monitörizasyonu: EKG (hareket artefaktlarını filtreleyen elektrot yerleşimi), Pulse Oksimetre, Kapnografi (nazal kanül kapnografisi).',
      'Mikroelektrot Kayıt (MER) ve Nörostimülasyon İzlemi: Nörofizyolog ve nörolog eşliğinde hedef çekirdeğin nöronal ateşleme paternlerinin sesli ve osiloskopik takibi.',
      'Anestezi Derinliği İzlemi: BIS (Uyanık testleme fazında sedasyonun tamamen kesildiğini ve hastanın nörokognitif yanıt verebileceğini teyit etmek için).',
      'İntraoperatif Floroskopi (C-Kollu Skopi) / O-Arm / iCT: Elektrotun hedef koordinatta olduğunu ve kaymadığını milimetrik doğrulamak için.',
      'Isı Problu Foley İdrar Sondası: Uyanık hastada uzun süren ameliyat boyunca mesane distansiyonu ve ajitasyonu önlemek için.'
    ],
    vascularAccess: [
      'En az 2 adet güvenli periferik intravenöz yol (16G veya 18G; cerrahi manipülasyondan uzak kollarda)',
      'İnfüzyon Pompaları (Deksmedetomidin, Remifentanil, Esmolol için hazır)'
    ],
    patientPosition: 'Yarı Oturur (Semi-Fowler) veya Sırtüstü (Supin) Pozisyon, Gövde 15 - 20° Hafif Elevasyonda',
    patientPositionDetails: [
      'Başın rijit stereotaktik çerçevesi ameliyat masasının adaptörüne kilitlenir.',
      'AŞIRI ELEVASYONDAN KAÇINILMALIDIR: Başın aşırı dik tutulması burr-hole açıldığında subdural aralığa masif hava dolmasına (pnömosefali) ve beynin yerçekimiyle çökmesine (Brain Shift) neden olarak koordinatları bozar! Açı 15-20° ile sınırlandırılır.',
      'Hastanın Konforu ve Bası Koruması: Uyanık hasta 3-5 saat sabit kalacağı için diz altına yastık, bel desteği, topuk jel pedleri ve ısıtıcı çoraplar yerleştirilir.',
      'Cerrahi Örtümün Yüzü Kapatmaması: Nöroloğun hastanın yüzünü, konuşmasını ve göz hareketlerini rahatça görebilmesi için cerrahi örtüler şeffaf çadır (steril drape tent) şeklinde kurulur.'
    ],
    anesthesiaManagement: [
      '1. Stereotaktik Çerçeve Takılması Fazı:',
      '  - Kafa kemiklerine 4 adet çivi vidasının sıkılması şiddetli ağrı ve hipertansif atağa yol açar.',
      '  - Müdahale: Çivi yerlerine derin lokal anestezik infiltrasyonu (%0.5 Bupivakain + %1 Lidokain + 1:100.000 Epinefrin) yapılır; eşzamanlı düşük doz Fentanil (50-100 mcg) veya Remifentanil bolusu verilir.',
      '2. Kranyal Açılış ve Burr-Hole Fazı (DBS Faz I):',
      '  - Sedasyon: Deksmedetomidin infüzyonu (0.2 - 0.5 mcg/kg/saat) ile solunumu deprese etmeyen sakinleştirme sağlanır. Skalp insizyon hattına lokal anestezik infiltre edilir.',
      '3. Mikroelektrot Kaydı (MER) ve Klinik Testleme Fazı (EN KRİTİK AŞAMA):',
      '  - Sedasyon Kesilmelidir: Elektrot hedefe yaklaşmadan 20-30 dakika önce Deksmedetomidin ve tüm sedatifler KESİLİR. Hasta tamamen uyanık ve oryante olmalıdır.',
      '  - Nörolog tremor, rijidite (dişli çark) ve parmak dokunma testlerini yapar. Test stimülasyonunda yan etkiler (konuşma bozulması, yüzde çekilme, parestezi, görsel ışık çakmaları [kapsüla interna veya optik traktus uyarımı]) anestezi etkisi olmaksızın değerlendirilir.',
      '4. Subklaviküler Pil / IPG Yerleşimi (Faz II):',
      '  - Elektrotlar sabitlendikten sonra çerçeve çıkarılır. Hasta genel anesteziye (GETA veya LMA) alınır; Propofol/Sevofluran + Remifentanil ile boyundan göğse tünelleme ve subklaviküler cep diseksiyonu ağrısız tamamlanır.'
    ],
    airwayManagement: [
      'Uyanık DBS Fazında: Nazal kanül ile oksijen desteği ve yan akım (sidestream) EtCO2 takibi.',
      'ÇERÇEVELİ HASTADA ACİL HAVA YOLU ALGORİTMASI:',
      '  - Nöbet, aspirasyon veya solunum arresti gelişirse çerçeve laringoskop girişini engeller.',
      '  - Hazır Ekipman: Videolaringoskop (hiperangüle uçlu McGrath/GlideScope), Fiberoptik bronkoskop ve LMA başucunda açık bekletilmelidir.',
      '  - Acil Çerçeve Çıkarma: Çerçevenin 4 vidasını 10 saniyede sökecek özel alyan anahtarı (Leksell allen key) anestezi uzmanının elinin altında, masaya flasterle sabitlenmiş olmalıdır!',
      'Faz II (IPG Aşaması): Standart Oral ETT veya LMA ile genel anestezi.'
    ],
    criticalSurgicalStages: [
      '1. Stereotaktik Çerçeve Tespiti ve Nöronavigasyon Doğrulaması: Sempatik pik ve hipertansiyon kontrolü.',
      '2. Trepanasyon (Burr-Hole) ve Dural Açılış: Dural koagülasyon; hava girişini ve beyin şiftini önlemek için kemik deliğine serum fizyolojik ve hemostatik jelatin sünger konulması.',
      '3. Mikroelektrot (MER) İlerlemesi: Hedef çekirdeğin hücresel deşarj frekanslarının kaydedilmesi; elektrik paraziti yaratan cihazların geçici durdurulması.',
      '4. Makrostimülasyon ve Nörolojik Yan Etki Testleri: Tremorun durması, rijiditenin çözülmesi; parestezi ve disartri sınırlarının belirlenmesi.',
      '5. Kalıcı DBS Elektrotunun Kilitlenmesi ve İntraoperatif Görüntüleme: Elektrotun yerinden oynamadığının teyidi.',
      '6. Faz II Tünelleme ve IPG Cebi: Genel anestezi indüksiyonu ve subklaviküler batarya implantasyonu.'
    ],
    emergenceNotes: [
      'Biyopsi Olgularında Uyanma: Öksürmesiz ve ıkınmasız smooth emergence; tansiyon sistolik < 130-140 mmHg tutulmalıdır.',
      'DBS Faz II Sonrası Uyanma: Genel anesteziden derlenme esnasında hastanın ajitasyonu engellenmeli; subklaviküler yara ve boyun tüneli kontrol edilmelidir.',
      'Acil Nörolojik Değerlendirme: Bilinç, kooperasyon, ekstremite motor gücü, pupiller ve konuşma değerlendirilir. Yeni gelişen hemiparezi veya konuşma bozukluğunda intrakraniyel hematom şüphesiyle acil Kranial BT çekilmelidir.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Kranyal ve Subklaviküler Ağrı Yönetimi:',
      '  - Çerçeve Çivi Yerleri ve Skalp İnsizyonuna Lokal İnfiltrasyon (%0.25 Bupivakain).',
      '  - Subklaviküler Cep ve Boyun Tüneli Boyunca Lokal Anestezik İnfiltrasyonu (Faz II sonrasında ağrıyı belirgin azaltır).',
      '  - IV Parasetamol (1000 mg 6 saatte bir düzenli infüzyon).',
      '  - Cerrahi hemostaz teyit edildiyse IV Deksketoprofen (50 mg 12 saatte bir).',
      '  - Kurtarma analjeziği: Düşük doz Tramadol veya Fentanil.'
    ],
    prospectRecommendations: [
      'Stereotaktik girişimlerde çivi giriş yerlerinin ve cerrahi insizyonların preoperatif lokal anestezikle bloke edilmesi intraoperatif hemodinamik stabiliteyi ve postoperatif hasta konforunu sağlar.'
    ],
    erasRecommendations: [
      'ERAS Fonksiyonel Nöroşirürji ve Kılavuzları:',
      '  - Postoperatif Kranial BT / MRG Kontrolü: Elektrot lokalizasyonunun doğrulanması ve intrakraniyel mikrokanama veya pnömosefalinin tespiti için ameliyat sonrası ilk 2-4 saatte görüntüleme yapılması.',
      '  - Parkinson İlaçlarının Yeniden Başlanması: Ameliyat sonrası bilinç ve yutma tam açılır açılmaz hastanın bazal L-Dopa tedavisi nöroloji kontrolünde kademeli olarak geri başlanmalıdır (akut akinezi ve nöroleptik malign sendrom benzeri tabloları önlemek için!).',
      '  - Erken Mobilizasyon: Postoperatif 4-6. saatte hastanın mobilize edilmesi.',
      '  - Yara Yeri ve Donanım Enfeksiyonu Takibi: Subklaviküler pil cebinde seroma, hematom veya eritem takibi.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section II: Neurosurgery - Stereotactic Procedures (pp. 474-480). Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'Hagan, K. B., et al. (2020). Enhanced Recovery After Surgery (ERAS) in Functional Neurosurgery and Deep Brain Stimulation: Consensus Guidelines. Journal of Neurosurgery.',
    prospectReference: 'PROSPECT Guidelines for Postoperative Pain Management in Minor Cranial and Stereotactic Procedures. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'Venkatraghavan, L., et al. (2016). Anesthesia for deep brain stimulation: a review. Current Opinion in Anaesthesiology, 29(5), 546-551.',
      'World Society for Stereotactic and Functional Neurosurgery (WSSFN). Guidelines for Deep Brain Stimulation in Movement Disorders.',
      'Society for Neuroscience in Anesthesiology and Critical Care (SNACC). Consensus Statement for Anesthetic Management of Patients Undergoing Deep Brain Stimulation.'
    ]
  }
};
