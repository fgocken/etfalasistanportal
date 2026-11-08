import { ProcedureDefinition } from '../../types/procedures';

/**
 * Kornea Nakli (Keratoplasti): Penetran Keratoplasti (PKP) ve Lameller Kornea Nakli (DALK, DSAEK, DMEK)
 * (Corneal Transplant / Penetrating and Lamellar Keratoplasty)
 * 
 * Jaffe (5th ed., Section VI: Ophthalmology - Corneal Transplant [Penetrating Keratoplasty], pp. 852-858),
 * American Academy of Ophthalmology (AAO), Cornea Society,
 * European Society of Cataract and Refractive Surgeons (ESCRS),
 * Ophthalmic Anesthesia Society (OAS) ve Türk Oftalmoloji Derneği (TOD) Kornea Birimi Protokolleri referans alınarak yapılandırılmıştır.
 */
export const cornealTransplant: ProcedureDefinition = {
  id: 'corneal-transplant',
  name: 'Kornea Nakli (Keratoplasti): Penetran Keratoplasti (PKP) ve Lameller Kornea Nakli (DALK, DSAEK, DMEK)',
  shortCode: 'GOZ-KERATOPLASTI',
  specialty: 'goz',
  specialtyName: 'Göz Hastalıkları',
  categoryTag: 'Kornea & Ön Segment Cerrahisi',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Gözün en ön saydam tabakası olan korneanın hastalık, travma, enfeksiyon veya distrofiler sonucu saydamlığını veya optik biçimini kaybetmesi durumunda, donör göz bankasından temin edilen sağlıklı insan korneası ile değiştirilmesi (allogreft transplantasyonu) ameliyatıdır. İki ana grupta icra edilir: (1) Penetran Keratoplasti (PKP - Tam Kat Kornea Nakli): Kornea trefini ile hastanın hastalıklı korneasından 7.5 - 8.5 mm çapında tam kat yuvarlak bir düğme kesilip çıkarılır; göz küresi dakikalarca tamamen "açık küre" (open globe) haline gelir. Ardından donör kornea düğmesi alıcı yatağa 16 tekli veya devamlı 10-0 naylon mikrosütürle dikilir. Skleral kollapsı önlemek için sklera üzerine metal Flieringa halkası dikilebilir. (2) Lameller Keratoplasti: Yalnızca hastalıklı kornea katmanının değiştirildiği seçici mikrocerrahi yöntemlerdir. DALK (Derin Anterior Lameller Keratoplasti) yönteminde endotel korunarak stroma değiştirilir; DSAEK ve DMEK yöntemlerinde ise sadece disfonksiyonel kornea endoteli ve Descemet zarı değiştirilir ve ön kamaraya verilen hava veya gaz (SF6) kabarcığı ile greft arkadan stromaya yapıştırılır.',
  indications: [
    'Keratokonus: İlerleyici kornea dikleşmesi, incelmesi ve gözlük/kontakt lensle düzeltilemeyen ileri evre ektaziler',
    'Psödofakik ve Afakik Büllöz Keratopati (PBK): Önceki katarakt veya ön segment cerrahileri sonrası kornea endotel yetmezliği ve kronik kornea ödemi (DMEK / DSAEK veya PKP)',
    'Fuchs Endotelyal Distrofisi: Genetik endotel kaybına bağlı kornea matlaşması ve görme kaybı',
    'Kornea Skarları ve Lökomlar: Geçirilmiş travma, kornea perforasyonu veya enfeksiyöz keratit (Herpes simplex, bakteriyel veya fungal ülser) sekeli',
    'Kornea Greft Rejeksiyonu ve Yetmezliği: Önceki kornea naklinin reaksiyon veya yaşlanma sonucu saydamlığını kaybetmesi (Re-PKP)'
  ],
  averageDuration: '1.0 - 2.5 saat (Standart PKP: 60-90 dk; Katarakt ekstraksiyonu ve İOL değişimi ile kombine "Üçlü Prosedür / Triple Procedure": 90-120 dk; DALK: 75-100 dk; DMEK / DSAEK: 45-75 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '< 10 - 20 mL (Kornea avasküler bir dokudur; kanama yalnızca konjonktiva, episklera veya Flieringa halkası dikişlerinden kaynaklanan minimal sızıntılardır)',
    riskLevel: 'minimal',
    riskLevelLabel: 'Minimal Kan Kaybı / Ancak Açık Kürede Katastrofik Ekspulsif Koroidal Kanama Riski',
    crossMatchRequirement: 'Rutin kan hazırlığı gerekmez (T&S ve Cross-Match endikasyonu yoktur)',
    transfusionProbability: '< %0.01 (Kan transfüzyonu endikasyonu yoktur)',
    criticalBleedingSources: [
      'Ekspulsif Supracoroidal / Koroidal Hemoraji: Trefinasyon sonrası göz açıkken (açık küre evresinde) ani intraoküler hipotansiyon, öksürük veya ıkınma ile arka siliyer arterlerin yırtılması sonucu gelişen masif intraoküler kanama (gözün tamamen kaybına yol açar)',
      'İris Kökü Kanamaları ve Ön Kamara Hifeması: İridektomi veya periferik sineşi lizisi esnasında mikrodamar yırtılmaları',
      'Flieringa Halkası Skleral Dikiş Sızıntıları'
    ],
    hemostasisStrategies: [
      'Ekspulsif koroid kanaması şüphesinde cerrahın donör düğmeyi derhal yerleştirip 4 kardinal sütürle gözü acilen kapatması veya arka sklerotomi',
      'Tam nöromusküler blokaj ve derin genel anestezi ile açık küre evresinde öksürük ve ıkınmanın mutlak engellenmesi',
      'İntraoperatif kan basıncının normotansif sınırda tutulması (SKB < 130-140 mmHg) ve intraoküler basıncı artıran ani manevralardan kaçınılması'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Dengeli Genel Endotrakeal Anestezi (GETA) + Tam Nöromusküler Blokaj (TOF 0/4 - 1/4) + Pürüzsüz Ekstübasyon Protokolü — Penetran Keratoplastide (PKP) gözün 8 mm açık küre haline gelmesi nedeniyle DÜNYA GENELİNDE MUTLAK TERCİH EDİLEN STANDARTTIR'
    ],
    alternative: [
      'Derin Rejyonel Blok (Genişletilmiş Sub-Tenon Bloğu veya Peribulber Blok) + Monitörize Anestezi Bakımı (MAC): Genel anestezi riski çok yüksek olan, kooperasyonu tam yaşlı hastalarda veya lameller keratoplastilerde (DMEK/DSAEK); ancak trefinasyon öncesi tam oküler akinezi ve hipotonik göz şarttır',
      'Laringeal Maske (LMA) ile Genel Anestezi: Yalnızca lameller keratoplastilerde (DMEK/DSAEK); tam kat açık küre (PKP) olgularında hava yolu aspirasyon güvenliği ve tam solunum kontrolü için endotrakeal tüp tercih edilir'
    ],
    notes: 'KORNEA NAKLİNDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) GENİŞ AÇIK KÜRE (OPEN GLOBE) EVRESİNDE SIFIR GÖZ İÇİ BASINCI (GİB) VE SIFIR HAREKET / ÖKSÜRÜK DİSİPLİNİ — Penetran keratoplastide kornea trefinasyonu yapıldığı anda gözün ön yüzeyi 8 mm çapında açık bir pencereye dönüşür ve ön kamara ile dış ortam arasında sıfır bariyer kalır. Bu aşamada hastanın aniden öksürmesi, ıkınması, kafasını oynatması, yüzeyel anesteziye kayması veya hiperkapniye bağlı koroidal venöz dolgunluk gelişmesi; vitreusun öne fırlamasına ve saniyeler içinde arka siliyer arterlerin patlayarak tüm göz içi dokularının dışarı fırlamasına (EKSPULSİF KOROİDAL HEMORAJİ) ve KALICI KÖRLÜĞE yol açar! Bu evrede derin anestezi, tam nöromusküler blok (TOF 0/4 veya 1/4) sürdürülmeli; PaCO2 35-38 mmHg seviyesinde normokapnik tutulmalıdır. (2) PÜRÜZSÜZ ÖKSÜRMESİZ UYANMA (SMOOTH EMERGENCE) VE DİKİŞ HATTI GÜVENLİĞİ — Donör kornea alıcı yatağa 16-24 adet saç kılından ince 10-0 naylon dikişle tutturulur. Ekstübasyon anında hastanın tüpü ısırması, öksürmesi veya hipertansif kriz geliştirmesi yeni atılan dikişleri patlatır, yara ayrışması (wound dehiscence), iris prolapsusu ve hifemaya yol açar. Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg), profilaktik antiemetik (Ondansetron), nazik orofaringeal aspirasyon uygulanmalı; hasta kesinlikle öksürmeden, ıkınmadan ve normotansif uyandırılmalıdır. (3) OKÜLOKARDİYAK REFLEKS (ASCHNER FENOMENİ) VE FLIERINGA HALKASI TEHLİKESİ — Sklera kollapsını önlemek için göz küresine Flieringa halkası dikilirken veya rektus kaslarına tespit sütürleri atılırken trigemino-vagal refleks (CN V -> CN X) tetiklenir. Bu durum ani derin bradikardi, nodal ritim ve kardiyak duraklamaya (asistoli) neden olabilir. EKG ritmi anlık izlenmeli; bradikardi görüldüğünde cerraha traksiyonu gevşetmesi söylenmeli, düzelmezse İV Atropin (0.5 mg) uygulanmalıdır. (4) ENDOTEL NAKLİNDE (DMEK / DSAEK) ÖN KAMARA HAVA/GAZ (SF6) KABARCIĞI VE AZOT PROTOKSİT (N2O) KONTRENDİKASYONU — Lameller endotel nakillerinde donör Descemet zarını alıcı stromaya yapıştırmak için ön kamaraya hava veya %20 SF6 (kükürt hekzaflorür) gaz kabarcığı enjekte edilir. Eğer anestezide Azot Protoksit (N2O / Güldürücü Gaz) kullanılıyorsa, N2O gaz kabarcığının içine kandan hızla difüze olarak kabarcığı şişirir; göz içi basıncını (GİB) 50-70 mmHg üzerine fırlatarak santral retinal arteri tıkar ve ANINDA KÖRLÜK yaratır! Bu nedenle kornea cerrahisinde AZOT PROTOKSİT KESİNLİKLE YASAKTIR. Postoperatif dönemde hastanın sırtüstü (supin) yatması zorunludur. (5) MANNİTOL KULLANIMI, HONAN BALON SINIRI VE PERİOPERATİF GLİSEMİ YÖNETİMİ — Cerrahi öncesi göz içi basıncını düşürmek ve vitreus hacmini küçültmek amacıyla İV Mannitol (%20 solüsyon, 1-1.5 g/kg) indüksiyonda yavaşça infüze edilebilir. Ancak dikkat: Trepanasyon öncesi kullanılan mekanik Honan balonu veya oküler kompresyon cihazları, kornea kesildikten sonra KESİNLİKLE KULLANILAMAZ. Greft rejeksiyonunu engellemek için operasyon esnasında yüksek doz topikal/sistemik steroid uygulanacağından diyabetik hastalarda kan şekeri yakından izlenmeli (hedef < 180 mg/dL) ve dekompanse hiperglisemi önlenmelidir.'
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'Göz Hastalıkları / Kornea Konsültasyonu: Kornea patolojisinin tespiti (keratokonus, PBK, skar), ön kamara derinliği, ön sineşiler, lens durumu (afak, psödofak veya katarakt) ve donör kornea dokusunun (endotel hücre sayısı > 2000-2500 hücre/mm²) göz bankası kayıtlarının doğrulanması.',
      'Kardiyoloji Konsültasyonu: Genel anestezi alacak ileri yaş popülasyonda koroner arter hastalığı, hipertansiyon ve aritmi tespiti; hemodinamik stabilite planlaması.',
      'Göğüs Hastalıkları Konsültasyonu: Ameliyat sonrası öksürüğü tamamen engellemek için KOAH, astım veya kronik bronşit olgularının preoperatif bronkodilatörlerle optimize edilmesi.',
      'Anestezi Polikliniği: Zor hava yolu taraması, aspirasyon riski ve genel anestezi ekstübasyon planı.'
    ],
    historyAndPhysical: [
      'Önceki Oküler Cerrahi Öyküsü: Geçirilmiş vitrektomi, katarakt, trabekülektomi veya glokom tüp şantı varlığı (vitrektomize gözlerde vitreus desteği olmadığı için skleral kollaps riski çok yüksektir).',
      'Kronik Öksürük ve Reflü: Ekstübasyon ve postoperatif dönemde kornea dikişlerini patlatabilecek öksürük krizleri ve reflü öyküsü.',
      'Antikoagülan / Antiagregan Kullanımı: Aspirin, Klopidogrel ve DOAK; PKP avasküler kornea cerrahisi olsa da sklera dikişleri ve iris manipülasyonu içerdiğinden hemostatik profil cerrahla teyit edilir.',
      'Sistemik İlaçlar: Diyabet ilaçları ve steroid kullanımı.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (Hb, Hct, Trombosit).',
      'Koagülasyon Paneli: PT, aPTT, INR.',
      'Açlık Kan Şekeri ve Serum Elektrolitleri (Özellikle Mannitol verilecek hastalarda sodyum, potasyum ve böbrek fonksiyonları [üre, kreatinin]).',
      '12 Derivasyonlu EKG ve Akciğer Grafisi.',
      'Göz İçi Basıncı (GİB) Ölçümü ve B-Scan Oküler Ultrasonografi (Opak kornealarda arka segment ve retina dekolmanı kontrolü).'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: 5 derivasyonlu EKG (Aschner okülokardiyak refleks ve bradikardi analizi), SpO2, EtCO2 ve Sıcaklık.',
      'Nöromusküler İleti Monitörizasyonu (TOF): Açık küre evresinde hastanın en ufak kas hareketi yapmaması için TOF %0-25 (0-1 yanıt) seviyesinde derin blokaj korunmalıdır.',
      'EtCO2 Takibi: Normokapni (EtCO2 35-38 mmHg) hedeflenir; hipoventilasyon ve hiperkapni koroidal vazodilatasyona yol açarak göz içi basıncını tehlikeli biçimde fırlatır.',
      'Non-İnvaziv veya İnvaziv Arter Basıncı İzlemi: Ani hipertansif dalgalanmaların engellenmesi (SKB < 130-140 mmHg).'
    ],
    vascularAccess: [
      'En az 1-2 adet güvenli periferik intravenöz damar yolu (18-20G)',
      'İntravenöz Mannitol %20 Solüsyonu (1.0 - 1.5 g/kg) — Ameliyat başlangıcında vitreus hacmini küçültmek ve GİB\'i düşürmek için 20-30 dakikada infüzyon',
      'Acil Bradikardi Kiti: Atropin (0.5 mg ampul) ve Glikopirolat masada hazır'
    ],
    patientPosition: 'Supin (Sırtüstü) Pozisyon, Baş Silikon Halka ile Nötral ve Sabit',
    patientPositionDetails: [
      'Baş donüt silikon yastığa alınır; cerrahi mikroskobun eksenine tam paralel hizalanır.',
      'Başın operasyon boyunca hiçbir şekilde oynamaması için yanlardan jel desteklerle sabitlenir.',
      'Venöz dönüşü rahatlatmak ve göz içi venöz basıncı düşürmek için ameliyat masasına 10-15° anti-Trendelenburg (baş yukarı) eğim verilir.',
      'Göz çevresi povidon iyot (%5-10) ile temizlenir; göz kapakları blefaroste ile açılır.'
    ],
    anesthesiaManagement: [
      'İndüksiyon ve Hava Yolu:',
      '  - Propofol (2-2.5 mg/kg) + Fentanil (2-3 mcg/kg) veya Remifentanil (0.1-0.2 mcg/kg/dk) + Nöromusküler Bloker (Rokuronyum 0.6-0.8 mg/kg veya Sisatrakuryum 0.15 mg/kg).',
      '  - Süksinilkolin KULLANILMAZ (Ön kamara açıkken ekstraoküler kas fasikülasyonları GİB\'i 10-15 mmHg artırarak ekspulsif kanama yaratabilir; yalnızca tam kapalı gözde acil hava yolunda ezilerek verilebilir).',
      '  - Videolaringoskop ile atravmatik entübasyon; spiral (zırhlı) endotrakeal tüp tercih edilir.',
      'İdame: TIVA veya Dengeli Anestezi:',
      '  - Propofol + Remifentanil TIVA veya Düşük Doz Sevofluran + Remifentanil.',
      '  - AZOT PROTOKSİT (N2O) KESİNLİKLE YASAKTIR! (DMEK/DSAEK gaz kabarcığını şişirir; ayrıca intraoküler gaz kalıntılarını genişleterek körlük yapar).',
      '  - Cerrahi boyunca derin kas gevşemesi (TOF 0/4) sürdürülür.',
      'Vitreus Hacminin Küçültülmesi:',
      '  - Trefinasyon öncesi İV Mannitol (%20, 1 g/kg) infüze edilerek vitreus kurutulur; ön kamaranın derinleşmesi sağlanır.',
      'Açık Küre (Trefinasyon) Fazı:',
      '  - Kornea düğmesi kesildiği andan itibaren cerrahi sahada çıt çıkmamalı, hasta derin hipnotik ve nöromusküler blokaj altında tutulmalıdır.',
      '  - Cerrah 16 adet 10-0 naylon sütürle donör korneayı yerleştirip ön kamarayı serum fizyolojik veya BSS ile basınçlandırana kadar GİB kontrol altında tutulur.'
    ],
    airwayManagement: [
      'Endotrakeal entübasyon altın standarttır; tüp ağız köşesinden cerrahi tarafın karşısına doğru sağlam flasterlerle yapıştırılır.',
      'Kaf basıncı manometre ile 20-25 cmH2O seviyesinde sabitlenir.',
      'Ameliyat esnasında hastanın tüpü ısırmasını engellemek için ısırma bloğu (bite-block) yerleştirilir.'
    ],
    criticalSurgicalStages: [
      '1. Pozisyonlandırma, Mikroskop Odağı ve Skleraya Flieringa Halkasının Dikilmesi (Okülokardiyak refleks kontrolü!).',
      '2. Donör Korneanın Hazırlanması (Yapay ön kamara üzerinde uygun çapta trefinasyon [genellikle 7.75 - 8.25 mm]).',
      '3. Alıcı Korneanın Trefinasyonu (Gözün tam kat açılması — Açık Küre Fazı Başlangıcı!).',
      '4. Hastalıklı Kornea Düğmesinin Çıkarılması (Makasla korneal tabanın ayrılması).',
      '5. Gereğinde Ek Cerrahi: Ön vitrektomi, katarakt aspirasyonu veya İOL değişimi (Triple Procedure).',
      '6. Donör Kornea Düğmesinin Alıcı Yatağa Taşınması ve 4 Kardinal Sütürle Tutturulması (Gözün Kapatılması).',
      '7. 16 Tekli veya Sürekli 10-0 Naylon Sütürlerin Atılması, Doku Uyumu ve Astigmatizma Kontrolü (Keratoskopi).',
      '8. Ön Kamaranın BSS ile Şişirilmesi, Seidel Testi (Kaçak kontrolü) ve Subkonjonktival Antibiyotik/Steroid Enjeksiyonu.'
    ],
    emergenceNotes: [
      'PÜRÜZSÜZ EKSTÜBASYON KURALI: Kornea dikişlerini patlatmamak için öksürük ve ıkınma tamamen engellenmelidir.',
      'Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg) uygulanır.',
      'Kürar bloğu Sugammadeks ile tam antagonize edilir (TOF > %90 teyidi).',
      'Tüp derin anestezi altında veya hasta gözlerini açıp sakin nefes almaya başladığı anda nazikçe çekilir.',
      'Ameliyat edilen göze steril pomad sürülerek şeffaf koruyucu plastik kalkan (eye shield) bantlanır; göze hiçbir mekanik bası uygulanmaz.'
    ]
  },

  // 6) Post-operatif Yönetimde Dikkat Edilmesi Gerekenler
  postoperative: {
    painManagement: [
      'Hafif-Orta Şiddette Analjezi Protokolü:',
      '  - 10-0 naylon sütür batmaları ve yüzeyel epitel defekti nedeniyle yabancı cisim hissi ve batma ağrısı sıktır.',
      '  - Düzenli Oral / İV Parasetamol (1000 mg 6 saatte bir).',
      '  - Gerektiğinde Oral Tramadol (50 mg) veya hafif NSAID (kontrendikasyon yoksa).',
      '  - Şiddetli zonklayıcı baş-göz ağrısı ve bulantı gelişirse AKUT GLOKOM / GİB ARTIŞI (viskoelastik bloğu veya pupil bloğu) düşünülmeli ve acilen tonometri yapılmalıdır!'
    ],
    prospectRecommendations: [
      'PROSPECT Kornea Cerrahisi Kılavuzları: Multimodal analjezide sistemik parasetamol ve profilaktik antiemetik (Ondansetron) kombinasyonu esastır; bulantı-kusmanın önlenmesi intraoküler basınç fırlamalarını ve greft dikişlerinin ayrışmasını engeller.'
    ],
    erasRecommendations: [
      'ERAS Göz Cerrahisi ve Kornea Transplantasyonu Protokolleri:',
      '  - Pozisyon Disiplini: DMEK/DSAEK endotel nakli yapılan hastalar greftin tutunması için ilk 24-48 saat KESİNLİKLE SIRTÜSTÜ (SUPİN) yatırılır.',
      '  - Basınç Kısıtlamaları: Öne eğilmek, ıkınmak, ağır kaldırmak ve gözü ovuşturmak kesinlikle yasaktır.',
      '  - Doku Rejeksiyonu Eğitimi: Hastaya "RSVP" semptomları öğretilir (Redness [Kızarıklık], Sensitivity [Işığa hassasiyet], Vision loss [Görme azalması], Pain [Ağrı]); bu bulgulardan biri bile olursa acil servise başvurulmalıdır (Akut Kornea Greft Rejeksiyonu!).',
      '  - Topikal İmmünsüpresyon: Rejeksiyonu önlemek için saatlik topikal steroid (Prednizolon / Deksametazon) damla tedavisi başlanır.'
    ]
  },

  // 7) Kullanılan Kaynaklar ve Literatür Referansları
  references: {
    jaffeReference: 'Jaffe, R. A., Schmiesing, C. A., & Golianu, B. (2014). Anesthesiologist\'s Manual of Surgical Procedures (5th ed.). Section VI: Ophthalmology - Corneal Transplant (Penetrating Keratoplasty), pp. 852-858. Philadelphia: Lippincott Williams & Wilkins.',
    erasReference: 'European Society of Cataract and Refractive Surgeons (ESCRS). (2021). Clinical Practice Guidelines for Keratoplasty and Endothelial Transplantation (DMEK/DSAEK).',
    prospectReference: 'PROSPECT Guidelines for Pain and Hemodynamic Management in Ophthalmic Micro-Surgery. European Society of Regional Anaesthesia & Pain Therapy (ESRA).',
    otherReferences: [
      'American Academy of Ophthalmology (AAO) Preferred Practice Pattern Guidelines: Corneal Ectasia and Keratoplasty (2022).',
      'Cornea Society. Quality standards and perioperative guidelines for penetrating and lamellar keratoplasty.',
      'Ophthalmic Anesthesia Society (OAS). Anesthetic management of open globe injuries and elective full-thickness keratoplasty.',
      'Eye Bank Association of America (EBAA). Medical standards for donor corneal tissue recovery and transplantation.',
      'Türk Oftalmoloji Derneği (TOD) Kornea ve Oküler Yüzey Birimi Keratoplasti Rehberi.'
    ]
  }
};
