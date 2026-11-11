import { ProcedureDefinition } from '../../types/procedures';

/**
 * Tonsillektomi ve Adenoidektomi
 * (Tonsillectomy and/or Adenoidectomy: Cold Dissection, Electrocautery, Coblation)
 * 
 * Jaffe (5th ed., Section V: Otolaryngology - Pharynx: Tonsillectomy and Adenoidectomy, pp. 744-750),
 * American Academy of Otolaryngology–Head and Neck Surgery (AAO-HNS) Clinical Practice Guideline: Tonsillectomy in Children,
 * Association of Paediatric Anaesthetists of Great Britain and Ireland (APAGBI) Guidelines,
 * Difficult Airway Society (DAS) Pediatric Guidelines,
 * Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) ve TARD Protokolleri referans alınarak yapılandırılmıştır.
 */
export const tonsillectomyAdenoidectomy: ProcedureDefinition = {
  id: 'tonsillectomy-and-adenoidectomy',
  name: 'Tonsillektomi ve Adenoidektomi (Tonsillectomy and/or Adenoidectomy)',
  shortCode: 'KBB-TONSİL',
  specialty: 'kbb',
  specialtyName: 'Kulak Burun Boğaz & Çocuk Cerrahisi',
  secondarySpecialties: ['cocuk_cerrahisi'],
  categoryTag: 'Faringeal Cerrahi & Pediatrik Hava Yolu',

  // 1) Prosedür Tanımı, Endikasyonları ve Tahmini Süresi
  description: 'Palatin tonsillerin (bademcikler) ve/veya adenoid vejetasyonun (geniz eti) kronik obstrüktif hipertrofi, obstrüktif uyku apnesi sendromu (OSAS), tekrarlayan tonsillit atakları veya peritonsiller apse sekeli nedeniyle cerrahi olarak enüklee edilmesi, diseke edilmesi veya ablasyonudur (soğuk diseksiyon, monopoler/bipolar elektrokoter, koblasyon / coblation veya mikrodebrider yöntemleri). Pediatrik ve erişkin KBB pratiğinde en sık uygulanan hava yolu operasyonudur. Hasta supin pozisyonda yatırılır, omuz altına ince destek rulosu yerleştirilerek boyun hafif ekstansiyona alınır ve farenks sahası Crowe-Davis veya Boyle-Davis ağız açacağı (mouth gag) ile açılır. Hava yolunun emniyeti ve cerrahi sahada açacağın baskısıyla bükülmeyi (kinking) ve yerinden çıkmayı önlemek amacıyla alt çeneye anatomik olarak kıvrılan "Oral RAE (preformed)" kaflı/kafsız endotrakeal tüp kullanılır. Tonsil lojlarının diseksiyonu ve hemostazı tamamlandıktan sonra yutulan kanın mideyi irrite etmesini önlemek amacıyla ameliyat bitiminde mide dikkatle aspire edilir.',
  indications: [
    'Obstrüktif Uyku Apnesi Sendromu (OSAS) ve Üst Hava Yolu Obstrüksiyonu: Adenotonsiller hipertrofiye bağlı horlama, gece terlemesi, büyüme-gelişme geriliği ve gündüz uyku hali',
    'Tekrarlayan Akut Tonsillit Atakları (Paradise Kriterleri): Son 1 yılda ≥ 7, son 2 yılda her yıl ≥ 5 veya son 3 yılda her yıl ≥ 3 belgelenmiş akut tonsillit atağı',
    'Peritonsiller Apse (Quinsy) Öyküsü: Rekürren apse atakları veya medikal tedaviye dirençli peritonsillit',
    'Kronik Tonsillit ve Tedaviye Dirençli Ağız Kokusu (Halitozis) / Tonsillolit Taşları',
    'Tek Taraflı Tonsil Büyümesi (Asimetrik Tonsil): Malignite şüphesi (Lenfoma veya Skuamöz Hücreli Karsinom) ekarte edilmesi için tanısal eksizyon'
  ],
  averageDuration: '20 - 45 dakika (Adenotonsillektomi: 25-35 dk; İzole Adenoidektomi: 15-20 dk; Erişkin Tonsillektomi: 30-45 dk)',

  // 2) Beklenen Kanama ve Transfüzyon Profili
  bleedingProfile: {
    estimatedBloodLoss: '15 - 50 mL (Pediatrik olgularda 15-30 mL, erişkinde 30-80 mL; ancak cerrahiden sonraki ilk 24 saatteki primer kanama veya 5-10. günlerdeki sekonder fibröz kabuk kanaması ["Bleeding Tonsil"] hipovolemik şok ve aspirasyon asfiksisi yaratabilecek en tehlikeli KBB acilidir)',
    riskLevel: 'low',
    riskLevelLabel: 'Düşük İntraop Risk / Ancak Postoperatif Kanama ("Bleeding Tonsil") Ağır Asfiksi ve Şok Riski Taşır',
    crossMatchRequirement: 'Elektif vakalarda rutin kan hazırlığı gerekmez (T&S opsiyonel; ancak kanama revizyonu ["Bleeding Tonsil"] vakalarında derhal 1-2 Ünite ES Cross-Match istenir)',
    transfusionProbability: '< %0.5 (Elektif vakalarda < %0.1; postoperatif kanama revizyonlarında %10-20)',
    criticalBleedingSources: [
      'Tonsiller Arter (Fasiyal arterin ana tonsiller dalı - alt pol diseksiyonunda en sık arteriyel kanama odağı)',
      'Dorsal Lingual Arter Dalları (Alt pol komşuluğu)',
      'Asendan Faringeal Arter ve Desendan Palatin Arter (Üst pol dalları)',
      'Parafaringeal Alanda İnternal Karotis Arteri Aberran Varyasyonu: Nadir anatomik tortuöz karotis varyasyonlarında lateral derin koterizasyonda ölümcül masif kanama riski'
    ],
    hemostasisStrategies: [
      'Bipolar elektrokoagülasyon ile kanama odaklarının tek tek tutulup yakılması',
      'Alt polde inatçı kanamalarda 2-0 veya 3-0 vikril ile sütür ligasyonu',
      'Adenoid lojunda ılık serum fizyolojikli gaz tampon ile bası uygulanması ve topikal hemostatik ajanlar',
      'Ekstübasyondan önce farenksin ve tonsil plikalarının cerrah tarafından kuru olduğunun doğrudan teyidi'
    ]
  },

  // 3) Olası Anestezi Yönetimi Teknikleri
  anesthesiaTechniques: {
    primary: [
      'Endotrakeal Genel Anestezi (GETA - Oral RAE Tüp ile) + İnhalasyonel Anestezi (Sevofluran) veya TIVA + Agresif Çiftli/Üçlü Antiemetik Profilaksisi (Deksametazon + Ondansetron) — DÜNYA GENELİNDE ALTIN STANDARTTIR'
    ],
    alternative: [
      'TIVA (Total İntravenöz Anestezi: Propofol + Remifentanil): Şiddetli PONV riski olan adolesan/erişkinlerde veya uyanma ajitasyonunu (emergence delirium) önlemek amacıyla',
      'Spiralli Fleksibl LMA (Flexible LMA): Bazı merkezlerde adenotonsillektomide seçilmiş olgularda bildirilmiş olmakla birlikte, ağız açacağının baskısıyla dislokasyon, kinking ve kan aspirasyonu riskleri nedeniyle Oral RAE endotrakeal tüp mutlak tercih edilen temel standarttır'
    ],
    rulesTitle: 'TONSİLLEKTOMİ VE ADENOİDEKTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI',
    notes: 'TONSİLLEKTOMİ VE ADENOİDEKTOMİDE ANESTEZİNİN 5 VAZGEÇİLMEZ KURALI: (1) AĞIZ AÇACAĞI (CROWE-DAVIS / BOYLE-DAVIS) BASINCI VE TÜP EKSTRÜZYONU / KİNKİNG ALARMI — Tonsillektomi cerrahisinde cerrahın yerleştirdiği ağız açacağı dili ve endotrakeal tüpü inferiora ve farenks arka duvarına doğru şiddetle bastırır. Açacak açıldığı anda tüp ucu sağ ana bronşa kayabilir (endobronşiyal entübasyon) veya kazara yerinden çıkabilir (ekstrübasyon). Ayrıca tüp lümeni dil kökü ile açacak dili arasında ezilip bükülebilir (kinking). Cerrah ağız açacağını kilitlediği anda anestezist derhal her iki akciğerin simetrik havalandığını dinlemeli, tepe havayolu basıncını (Ppeak) kontrol etmeli ve monitörde EtCO2 dalgasını doğrulamalıdır! (2) POSTOPERATİF BULANTI VE KUSMA (PONV) AGRESİF ÇİFTLİ/ÜÇLÜ PROFİLAKSİSİ — Tonsillektomi, operasyon lojundan yutulan kanın mide mukozasını kimyasal olarak irrite etmesi ve farengeal vagal uyarılar nedeniyle çocuk ve erişkin cerrahisinin EN YÜKSEK PONV ORANINA SAHİP (%50-70) ameliyatıdır! Kusma tonsil lojlarındaki taze pıhtıları patlatarak masif kanamaya yol açar. Bu felaketi önlemek için indüksiyonda İ.V. Deksametazon (0.15-0.5 mg/kg, maks 10 mg; aynı zamanda farengeal ödemi ve postop ağrıyı belirgin azaltır), ameliyat bitiminde Ondansetron (0.1-0.15 mg/kg, maks 4 mg) uygulanmalı ve cerrahi bitiminde mide orogastrik sondayla mutlaka tam aspire edilmelidir! (3) POST-TONSİLLEKTOMİ KANAMASI ("BLEEDING TONSIL") PROTOKOLÜ VE DOLU MİDE YÖNETİMİ — Cerrahi sonrası ilk 24 saatte (primer kanama) veya 5-10. günlerde kabuk düşmesiyle (sekonder kanama) ameliyathaneye acil kanama kontrolü için geri getirilen hasta KANLA DOLU MİDEYE (Full Stomach) SAHİP VE HİPOVOLEMİK KABUL EDİLİR! Kanama farenkste görüşü tamamen sıfırlayabilir. Hasta masaya alınmadan önce 2 adet geniş damar yolu açılır, kristaloid resüsitasyonu yapılır; masada 2 adet fonksiyonel geniş lümenli aspiratör ucu (Yankauer) hazır edilir; baş hafif aşağıya (Trendelenburg) alınır ve Hızlı Ardışık İndüksiyon (RSI: Propofol/Ketamin + Süksinilkolin veya yüksek doz Rokuronyum) ile doğrudan görüş altında hızla entübe edilir! (4) PÜRÜZSÜZ UYANMA VE LARİNGOSPAZM KORUMASI (DERİN vs UYANIK EKSTÜBASYON) — Kan, sekresyon veya koter dumanının vokal kordlara teması pediatrik tonsillektomide ölümcül Laringospazm riskini tepeye çıkarır. Farenks cerrah tarafından dikkatle aspire edilmeli ve kanama lojları kuru olmalıdır. Ekstübasyon; kord refleksleri tamamen uyanmış, gözlerini açan, havayolu reflekslerini koruyan ve lateral pozisyondaki ("Tonsil Pozisyonu" - kanın trakeaya değil ağız kenarından dışarı akması için) hastada yapılmalıdır. Laringospazm gelişirse derhal %100 O2 ile pozitif basınçlı maske ventilasyonu, çene itme (jaw thrust / Larson manevrası) ve çözülmezse düşük doz süksinilkolin (0.5 mg/kg) uygulanır. (5) AĞIR OBSTRÜKTİF UYKU APNESİ (OSAS) VE OPOİD DUYARLILIĞI DİSİPLİNİ — Ciddi OSAS tablosu olan (preoperatif polisomnografide AHI > 10 veya SpO2 nadir < %80) çocuklarda kronik hipoksi nedeniyle beyin sapı solunum merkezi opioidlere aşırı duyarlıdır! Bu çocuklarda rutin doz opioidler dahi postoperatif ölümcül santral apneye, obstrüksiyona ve kardiyak arreste yol açabilir. Bu grupta intraoperatif opioid dozu %50 azaltılmalı; analjezi multimodal temelde İ.V. Parasetamol (15 mg/kg) + İ.V. İbuprofen / Ketorolak ve Deksametazon ile sağlanmalı; hasta postoperatif en az 24 saat pulse oksimetre monitörizasyonunda tutulmalıdır!',
    indispensableRules: [
      {
        number: 1,
        title: 'AĞIZ AÇACAĞI (CROWE-DAVIS / BOYLE-DAVIS) BASINCI VE TÜP EKSTRÜZYONU / KİNKİNG ALARMI',
        content: 'Tonsillektomi cerrahisinde cerrahın yerleştirdiği ağız açacağı dili ve endotrakeal tüpü inferiora ve farenks arka duvarına doğru şiddetle bastırır. Açacak açıldığı anda tüp ucu sağ ana bronşa kayabilir (endobronşiyal entübasyon) veya kazara yerinden çıkabilir (ekstrübasyon). Ayrıca tüp lümeni dil kökü ile açacak dili arasında ezilip bükülebilir (kinking). Cerrah ağız açacağını kilitlediği anda anestezist derhal her iki akciğerin simetrik havalandığını dinlemeli, tepe havayolu basıncını (Ppeak) kontrol etmeli ve monitörde EtCO2 dalgasını doğrulamalıdır!'
      },
      {
        number: 2,
        title: 'POSTOPERATİF BULANTI VE KUSMA (PONV) AGRESİF ÇİFTLİ/ÜÇLÜ PROFİLAKSİSİ',
        content: 'Tonsillektomi, operasyon lojundan yutulan kanın mide mukozasını kimyasal olarak irrite etmesi ve farengeal vagal uyarılar nedeniyle çocuk ve erişkin cerrahisinin EN YÜKSEK PONV ORANINA SAHİP (%50-70) ameliyatıdır! Kusma tonsil lojlarındaki taze pıhtıları patlatarak masif kanamaya yol açar. Bu felaketi önlemek için indüksiyonda İ.V. Deksametazon (0.15-0.5 mg/kg, maks 10 mg; aynı zamanda farengeal ödemi ve postop ağrıyı belirgin azaltır), ameliyat bitiminde Ondansetron (0.1-0.15 mg/kg, maks 4 mg) uygulanmalı ve cerrahi bitiminde mide orogastrik sondayla mutlaka tam aspire edilmelidir!'
      },
      {
        number: 3,
        title: 'POST-TONSİLLEKTOMİ KANAMASI ("BLEEDING TONSIL") PROTOKOLÜ VE DOLU MİDE YÖNETİMİ',
        content: 'Cerrahi sonrası ilk 24 saatte (primer kanama) veya 5-10. günlerde kabuk düşmesiyle (sekonder kanama) ameliyathaneye acil kanama kontrolü için geri getirilen hasta KANLA DOLU MİDEYE (Full Stomach) SAHİP VE HİPOVOLEMİK KABUL EDİLİR! Kanama farenkste görüşü tamamen sıfırlayabilir. Hasta masaya alınmadan önce 2 adet geniş damar yolu açılır, kristaloid resüsitasyonu yapılır; masada 2 adet fonksiyonel geniş lümenli aspiratör ucu (Yankauer) hazır edilir; baş hafif aşağıya (Trendelenburg) alınır ve Hızlı Ardışık İndüksiyon (RSI: Propofol/Ketamin + Süksinilkolin veya yüksek doz Rokuronyum) ile doğrudan görüş altında hızla entübe edilir!'
      },
      {
        number: 4,
        title: 'PÜRÜZSÜZ UYANMA VE LARİNGOSPAZM KORUMASI (DERİN vs UYANIK EKSTÜBASYON)',
        content: 'Kan, sekresyon veya koter dumanının vokal kordlara teması pediatrik tonsillektomide ölümcül Laringospazm riskini tepeye çıkarır. Farenks cerrah tarafından dikkatle aspire edilmeli ve kanama lojları kuru olmalıdır. Ekstübasyon; kord refleksleri tamamen uyanmış, gözlerini açan, havayolu reflekslerini koruyan ve lateral pozisyondaki ("Tonsil Pozisyonu" - kanın trakeaya değil ağız kenarından dışarı akması için) hastada yapılmalıdır. Laringospazm gelişirse derhal %100 O2 ile pozitif basınçlı maske ventilasyonu, çene itme (jaw thrust / Larson manevrası) ve çözülmezse düşük doz süksinilkolin (0.5 mg/kg) uygulanır.'
      },
      {
        number: 5,
        title: 'AĞIR OBSTRÜKTİF UYKU APNESİ (OSAS) VE OPOİD DUYARLILIĞI DİSİPLİNİ',
        content: 'Ciddi OSAS tablosu olan (preoperatif polisomnografide AHI > 10 veya SpO2 nadir < %80) çocuklarda kronik hipoksi nedeniyle beyin sapı solunum merkezi opioidlere aşırı duyarlıdır! Bu çocuklarda rutin doz opioidler dahi postoperatif ölümcül santral apneye, obstrüksiyona ve kardiyak arreste yol açabilir. Bu grupta intraoperatif opioid dozu %50 azaltılmalı; analjezi multimodal temelde İ.V. Parasetamol (15 mg/kg) + İ.V. İbuprofen / Ketorolak ve Deksametazon ile sağlanmalı; hasta postoperatif en az 24 saat pulse oksimetre monitörizasyonunda tutulmalıdır!'
      }
    ]
  },

  // 4) Pre-operatif Hazırlık
  preoperative: {
    consultations: [
      'KBB & Çocuk Cerrahisi Konsültasyonu: Tonsil büyüklüğü derecelendirmesi (Brodsky Skalası: Grade 1-4; kordları kapatan "kissing tonsils" varlığı), adenoid hipertrofisi oranı ve kronik enfeksiyon sıklığı.',
      'Pediatri / Çocuk Göğüs Hastalıkları: Ağır OSAS, horlama, gündüz somnolansı, büyüme geriliği veya kor pulmonale bulguları olan çocuklarda polisomnografi ve kardiyak değerlendirme.',
      'Hematoloji / Kanama Diatezi Taraması: Ailede veya çocukta olağandışı kanama, morarma, epistaksis veya diş çekimi sonrası kanama öyküsü varsa tam koagülasyon paneli (PT, aPTT, von Willebrand faktör düzeyi) istenmelidir.',
      'Pediatrik Anestezi Hazırlığı: Çocuğun kilosuna uygun Oral RAE tüp (No 3.5 - 6.5 kaflı mikrokaf tüpler), uygun boy laringoskop bleydi (Miller veya Macintosh), aspiratör kateterleri ve laringospazm acil kiti.'
    ],
    historyAndPhysical: [
      'Son 2 Haftada Üst Solunum Yolu Enfeksiyonu (ÜSYE): Ateş, pürülan burun akıntısı, hırıltı varlığında laringospazm ve bronkospazm riski 5-10 kat artar; elektif vaka 2-4 hafta ertelenmelidir.',
      'Sallanan Dişler (Deciduous Teeth): 5-10 yaş grubunda sallanan süt dişleri ağız açacağı takılırken veya entübasyonda kolayca avülse olup akciğere aspire edilebilir; preop tespit edilip belgelenmelidir.',
      'OSAS Şiddeti ve Obezite: Şiddetli OSAS\'lı obez çocuklarda postoperatif hava yolu obstrüksiyonu ve desatürasyon riski çok yüksektir; günübirlik taburculuk yerine gecelik yatış planlanmalıdır.',
      'Alerji Öyküsü: Penisilin, amoksisilin veya NSAİİ alerjisi varlığı sorgulanmalıdır.'
    ],
    laboratoryAndTests: [
      'Tam Kan Sayımı (CBC): Bazal hemoglobin ve hematokrit (preoperatif anemi kontrolü) ve trombosit sayısı.',
      'Koagülasyon Parametreleri (PT, aPTT, INR): Kanama diatezi öyküsü veya şüphesi olan olgularda zorunludur.',
      'Kan Grubu Teyidi: Rutin cross-match gerekmez ancak kan grubu biliniyor olmalıdır.'
    ]
  },

  // 5) İntra-operatif Yönetim
  intraoperative: {
    monitoring: [
      'Standart ASA Monitörizasyonu: EKG (sesli puls tonu açık), NIBP (pediatrik boy manşon), SpO2 (pre ve postduktal / parmak), Kapnografi (EtCO2 ve solunum frekansı), Vücut Sıcaklığı (özofageal veya aksiller ısı probu).',
      'Tepe Havayolu Basıncı İzlemi (Ppeak): Ağız açacağı takıldığında kinking veya endobronşiyal entübasyon basınç artışıyla anında yakalanır.',
      'Prekordiyal / Özofageal Stetoskop: Kalp sesleri ve her iki hemitoraksın simetrik hava girişinin sürekli akustik takibi.'
    ],
    vascularAccess: [
      '1 veya 2 adet periferik İ.V. damar yolu (pediatrik boyutta 22G veya 20G; indüksiyon gazla yapılsa dahi entübasyon öncesi damar yolu mutlaka açılmalıdır)'
    ],
    patientPosition: 'Supin Pozisyon, omuz altına ince silikon rulo yerleştirilerek boyun hafif ekstansiyona alınır ("Koklama / Sniffing" pozisyonu); baş silikon donüt ile immobilize edilir; cerrah baş tarafına oturur.',
    patientPositionDetails: [
      'Omuz Altı Desteği: Baş ve boyun aşırı hiperekstansiyona getirilmemelidir (servikal omurga gerilimi ve adenoid lojunda anatomik oryantasyon kaybı önlenir).',
      'Ağız Açacağı Güvenliği: Açacağın metal dişi üst kesici dişlere aşırı yük bindirmemeli, diş koruyucu aparat yerleştirilmelidir.',
      'Tüpün Orta Hat Sabitlemesi: Oral RAE tüp alt çenenin tam orta hattından bantlanır; dudak ve dilin açacak altında sıkışıp iskemiye uğraması önlenir.'
    ],
    anesthesiaManagement: [
      'İndüksiyon: Pediatrik olgularda Sevofluran + O2/Hava ile kokulu maske indüksiyonu (veya sakin çocuklarda İ.V. Propofol 2.5-3 mg/kg + Fentanil 1-1.5 mcg/kg). Entübasyon derin anestezi altında kas gevşeticisiz veya düşük doz Rokuronyum (0.3-0.6 mg/kg) ile yapılır.',
      'İdame: Sevofluran (%1.5-2.5) + O2/Hava (%50/%50; N2O KULLANILMAZ - PONV ve orta kulak basıncını artırır) veya TIVA (Propofol 100-150 mcg/kg/dk + Remifentanil 0.1-0.2 mcg/kg/dk).',
      'Sıvı Yönetimi: Preoperatif açlık süresi ve idame ihtiyacına göre dengeli elektrolit solüsyonu (Isolyte-P veya Plazma-Lyte, 4-2-1 kuralı; aşırı sıvıdan ve glukozsuz solüsyondan kaçınılır).'
    ],
    airwayManagement: [
      'Oral RAE Tüp Seçimi: Mikrokaflı (cuffed) pediatrik tüpler tercih edilir (Kaflı tüp formülü: Yaş/4 + 3.5; kaf basıncı < 20 cmH2O tutulmalıdır).',
      'Ağız Açacağı Kontrolü: Açacak takıldığında ve gevşetildiğinde tüp yerleşimi dinlenerek iki taraflı solunum sesleri teyit edilir.',
      'Farengeal Temizlik ve Mide Aspirasyonu: Cerrahi bitiminde ağız içi ve hipofarinks doğrudan görüşle nazikçe aspire edilir; ardından orogastrik sonda takılarak midedeki kan ve hava tamamen boşaltılır.',
      'Ekstübasyon Stratejisi: Hasta tamamen uyanık, kord koruyucu refleksleri aktif, spontan solunumu güçlü ve gözlerini açtığında lateral dekübit pozisyonda ("Tonsil Pozisyonu") nazikçe ekstübe edilir.'
    ],
    criticalSurgicalStages: [
      '1. Ağız Açacağının (Crowe-Davis) Yerleştirilmesi ve Kilitlenmesi: Havayolu tüpünün kinking ve yer değiştirme kontrolü.',
      '2. Adenoidektomi Evresi: Küretaj veya koblasyon ile adenoid rezeksiyonu ve ılık tampon basısıyla hemostaz.',
      '3. Tonsillektomi Evresi (Üst Pol, Gövde ve Alt Pol Diseksiyonu): Tonsiller arter dallarının koterizasyonu.',
      '4. Ağız Açacağının Gevşetilmesi ve Çıkarılması: Farenks dokularında dekompresyon sonrası gizli kanama odaklarının kontrolü.',
      '5. Mide İçeriğinin Orogastrik Sondayla Boşaltılması: Yutulan kanın aspirasyonu ve PONV önlemi.'
    ],
    emergenceNotes: [
      'Laringospazm Önlemi: Uyanma esnasında farenksin körlemesine aspire edilmesinden kaçınılmalıdır (farengeal dokunma spazmı tetikler).',
      'Tonsil Pozisyonu (Lateral Dekübit): Ekstübasyon sonrası hasta yan yatırılır; yerçekimi sayesinde sekresyon ve kanlar larenkse değil ağız köşesinden dışarıya drene olur.',
      'Uyanma Ajitasyonu (Emergence Delirium) Yönetimi: Sevofluran sonrası çocuklarda ajitasyonu önlemek için cerrahi bitiminden 10 dk önce Fentanil (0.5 mcg/kg) veya Deksmedetomidin (0.2-0.4 mcg/kg) uygulanabilir.'
    ]
  },

  // 6) Post-operatif Yönetim
  postoperative: {
    painManagement: [
      'Multimodal Non-Opioid Analjezi Protokolü: İ.V. Parasetamol (15 mg/kg 4x1) + İ.V. İbuprofen (10 mg/kg 3x1) veya Ketorolak (0.5 mg/kg, cerrahi hemostaz teyit edildikten sonra).',
      'Kodein ve Tramadol YASAĞI: FDA ve EMA uyarıları uyarınca < 12 yaş çocuklarda ultra-hızlı CYP2D6 metabolizörlerinde ölümcül solunum depresyonu riski nedeniyle kodein ve tramadol KESİNLİKLE KONTRENDİKEDİR!',
      'Gereğinde Kurtarma Dozu Olarak Düşük Doz Titre Edilmiş Morfin (0.05 mg/kg İ.V.).'
    ],
    prospectRecommendations: [
      'Deksametazonun (0.15-0.5 mg/kg, tek doz İ.V.) analjezik ve antienflamatuar etkisi kanıtlanmıştır; postop ağrı skorlarını ve analjezik ihtiyacını belirgin düşürür.',
      'Lokal anestezik infiltrasyonu tonsil lojlarına uygulanabilir; ancak derin karotis enjeksiyonu ve nörotoksisite riskine karşı kör enjeksiyondan kaçınılmalıdır.'
    ],
    erasRecommendations: [
      'Soğuk ve Yumuşak Diyet: Postoperatif 2. saatten itibaren tolere edildikçe dondurma, soğuk süt, yoğurt ve püre gıdalarla erken oral alıma başlanması (sıcak, sert, asitli ve baharatlı gıdalar yasaktır).',
      'Yeterli Hidrasyon: Dehidrasyon kanama riskini ve ağrıyı artırır; idrar çıkışı ve hidrasyon yakın izlenmelidir.',
      'Günübirlik Taburculuk Kriterleri: Kanama olmaması, oral sıvı tolere etmesi, ağrının kontrol altında olması ve en az 4-6 saatlik gözetim süresi (OSAS\'lı ve < 3 yaş çocuklarda 24 saat yatış önerilir).'
    ]
  },

  // 7) Kaynaklar ve Literatür
  references: {
    jaffeReference: 'Jaffe RA, Schmiesing CA, Golianu B. Anesthesiologist\'s Manual of Surgical Procedures. 5th ed. Philadelphia: Wolters Kluwer Health / Lippincott Williams & Wilkins; 2014. Section V: Otolaryngology - Pharynx: Tonsillectomy and Adenoidectomy, pp. 744-750.',
    erasReference: 'Association of Paediatric Anaesthetists of Great Britain and Ireland (APAGBI). Guidelines for the management of children undergoing day-case surgery including tonsillectomy and adenoidectomy.',
    prospectReference: 'PROSPECT Working Group. Procedure-specific postoperative pain management for tonsillectomy in children and adults. ESRA.',
    otherReferences: [
      'Mitchell RB, Archer SM, Ishman SL, et al. Clinical Practice Guideline: Tonsillectomy in Children (Update). Otolaryngol Head Neck Surg. 2019;160(1_suppl):S1-S42.',
      'American Society of Anesthesiologists (ASA) Committee on Pediatric Anesthesia. Practice Guidelines for Pediatric Airway Management.',
      'FDA Drug Safety Communication: Codeine and tramadol restricted in children due to potential for serious breathing problems (2017/2018).',
      'Türk Kulak Burun Boğaz ve Baş Boyun Cerrahisi Derneği (TKBB-BBC) Adenotonsillektomi Kılavuzu.'
    ]
  }
};
