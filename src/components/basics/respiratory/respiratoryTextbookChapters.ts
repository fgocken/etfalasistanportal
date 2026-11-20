import type { RespiratoryDiagramId } from './RespiratoryTextbookDiagrams';

export interface FormulaEntry {
  expression: string;
  caption: string;
}

export interface TableBlock {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface SubSection {
  heading: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  formulas?: FormulaEntry[];
  table?: TableBlock;
  diagramId?: RespiratoryDiagramId;
  clinicalNote?: {
    title: string;
    text: string;
  };
}

export interface TextbookChapter {
  id: string;
  number: string;
  title: string;
  summary: string;
  sources: string;
  subsections: SubSection[];
}

export const RESPIRATORY_TEXTBOOK_CHAPTERS: TextbookChapter[] = [
  {
    id: 'fonksiyonel-anatomi',
    number: 'Bölüm 1',
    title: 'Fonksiyonel Anatomi, Havayolu Ağacı ve Bronşiyal Tonus',
    summary:
      'İletici ve respiratuvar zonların yapısal ayrımı, Weibel dallanma geometrisinin direnç ve akım hızı üzerine etkisi, alveolokapiller bariyer ve bronşiyal düz kasın otonomik/anestezik düzenlenmesi.',
    sources: "West B.1 · Nunn's B.1 · Miller's",
    subsections: [
      {
        heading: '1.1. Weibel Dikotomik Dallanma Modeli (0–23. Jenerasyon)',
        paragraphs: [
          'İnsan havayolu ağacı, trakeadan (0. jenerasyon) alveoler keselere (23. jenerasyon) kadar yaklaşık 23 kez ikiye bölünerek ilerler. Fizyolojik işlev açısından bu ağaç iki ana bölgeye ayrılır: gaz değişiminin gerçekleşmediği iletici zon (0–16. jenerasyonlar) ve gaz değişiminin yürütüldüğü respiratuvar zon (17–23. jenerasyonlar).',
          'İletici zon; trakea, ana/lober/segmental bronşlar ve terminal bronşiyollerden oluşur. Duvarında alveol bulunmaz, bu nedenle bu hacim doğrudan anatomik ölü boşluğu (sağlıklı erişkinde ≈ 150 mL veya ≈ 2 mL/kg) oluşturur. Bu bölgede temel görev havayı 37 °C’ye ısıtmak, %100 su buharıyla doyurmak (P_{H_{2}O} = 47 mmHg) ve mukosiliyer mekanizmayla partiküllerden arındırmaktır. Gaz taşınımı basınç farkına dayalı konveksiyonla (bulk flow) gerçekleşir.',
          'Respiratuvar zon, 17. jenerasyonda duvarında ilk alveollerin belirdiği respiratuvar bronşiyollerle başlar; alveoler kanallar ve alveoler keselerle (20–23. jenerasyon) sonlanır. Tek bir terminal bronşiyolün distalinde kalan yapıya asinus denir. Toplam hacmi 2.500–3.000 mL’ye, 300–500 milyon alveolün oluşturduğu gaz değişim alanı ise 70–85 m^{2}’ye ulaşır. 16. jenerasyondan sonra paralel dallanma sayısı üstel arttığından toplam kesit alanı 2,5 cm^{2}’den 10.000 cm^{2}’nin üzerine fırlar. Süreklilik yasası (\\dot{V} = A × v) gereği lineer akım hızı sıfıra yaklaşır ve gaz hareketi konveksiyondan saf moleküler difüzyona geçer.',
        ],
        diagramId: 'weibel-anatomy',
        table: {
          title: 'Weibel Havayolu Morfometrisi ve Fizyolojik Özellikleri',
          headers: ['Jenerasyon', 'Yapı', 'Yaklaşık Sayı', 'Çap (mm)', 'Toplam Kesit Alanı', 'Fizyolojik Özellik'],
          rows: [
            ['0', 'Trakea', '1', '18,0', '2,5 cm^{2}', 'C-şekilli kıkırdak · Türbülan akım'],
            ['1 – 3', 'Ana ve Lober Bronşlar', '2 – 8', '12,2 – 5,6', '2,0 – 2,5 cm^{2}', 'Kıkırdak destekli · Yüksek lineer hız'],
            ['4 – 8', 'Segmental / Subsegmental Bronş', '16 – 256', '4,5 – 1,9', '2,5 – 7,0 cm^{2}', 'Toplam R_{aw}’nin ~%80’i bu bölgede oluşur'],
            ['12 – 16', 'Bronşiyol → Terminal Bronşiyol', '4.096 – 65.536', '0,95 – 0,60', '28 – 180 cm^{2}', 'Kıkırdak yok, düz kas baskın · İletici zon sonu'],
            ['17 – 19', 'Respiratuvar Bronşiyoller', '1,3×10^{5} – 5,2×10^{5}', '0,54 – 0,47', '300 – 944 cm^{2}', 'Asinus başlangıcı · Konveksiyon → Difüzyon geçişi'],
            ['20 – 23', 'Alveoler Kanal ve Keseler', '10^{6} – 8,4×10^{6}', '0,45 – 0,41', '> 10.000 cm^{2}', 'Saf difüzyon · Periferik direnç payı < %10–20'],
          ],
        },
        clinicalNote: {
          title: '“Akciğerin Sessiz Zonu” Kavramı',
          text: 'Çapı < 2 mm olan periferik küçük havayolları sayıca çok fazla ve birbirine paralel bağlı olduğu için (1/R_{tot} = Σ 1/R_{i}) toplam havayolu direncinin yalnızca %10–20’sini oluşturur. Bu nedenle erken dönem küçük havayolu hastalığı (erken KOAH, sigara hasarı) rutin spirometride FEV_{1}’i düşürmeden önce Kapanma Kapasitesi (CC) ve frekansa bağımlı kompliyans ile saptanır.',
        },
      },
      {
        heading: '1.2. Alveolokapiller Membran, Epitel Hücreleri ve Kollateral Ventilasyon',
        paragraphs: [
          'Gaz değişiminin gerçekleştiği kan-gaz bariyeri 0,2–0,5 µm kalınlığındadır. İnce tarafta sırasıyla sürfaktan tabakası, Tip I alveoler epitel hücresi, kaynaşmış epitel-endotel bazal membranı ve pulmoner kapiller endoteli yer alır. Bariyerin kalın tarafında ise Tip IV kollajen ağı bulunur; bu yapı yüksek pulmoner kapiller basınçlara karşı mekanik dayanıklılık sağlar (kapiller transmural basınç > 40 mmHg olduğunda stres yetmezliği ve hemoraji/ödem gelişir).',
          'Alveol duvarında iki temel epitel hücresi vardır. Tip I pnömositler alveoler yüzeyin %90–95’ini kaplayan, yassı, gaz difüzyonuna özelleşmiş, bölünemeyen hücrelerdir. Tip II pnömositler ise köşelerde yerleşen küboidal hücrelerdir; lamellar cisimciklerde sürfaktan sentezleyip depolar ve hasar durumunda çoğalarak Tip I pnömositlere dönüşür. Alveoler makrofajlar immün savunmayı sağlar.',
          'Distal akciğer birimleri üç kollateral yol ile birbirine bağlıdır: komşu alveoller arasındaki Kohn porları (3–13 µm), bronşiyol ile alveol arasındaki Lambert kanalları ve bronşiyoller arasındaki Martin kanalları. Bu kanallar küçük bir bronşiyol tıkandığında distaldeki alveollerin komşu ünitelerden havalanmasını sağlayarak atelektaziyi önler. Çocuklarda (< 6–8 yaş) Kohn porları ve Lambert kanalları henüz gelişmediğinden mukus tıkacı kolaylıkla lober atelektaziye yol açar.',
        ],
      },
      {
        heading: '1.3. Bronşiyal Düz Kas İnnervasyonu ve Anestezik Ajanların Etkisi',
        paragraphs: [
          'Bronşiyal düz kas tonusu ağırlıklı olarak parasempatik (vagal) sinir sistemi tarafından belirlenir. Asetilkolin, M_{3} muskarinik reseptörler aracılığıyla hücre içi Ca^{2+} ve cGMP’yi artırarak bronkokonstriksiyon ve mukus sekresyonu oluşturur. Hava yollarında doğrudan sempatik düz kas innervasyonu sınırlıdır; ancak dolaşımdaki adrenalin β_{2}-adrenerjik reseptörleri (cAMP ↑) uyararak güçlü bronkodilatasyon yapar. Non-adrenerjik non-kolinerjik (NANC) sistemin inhibitör kolu (VIP, nitrik oksit) gevşeme, eksitatör kolu (madde P, nörokinin A) kasılma ve nörojenik inflamasyon oluşturur.',
        ],
        bullets: [
          {
            label: 'Volatil Anestezikler',
            text: 'Sevofluran ve izofluran düz kas hücrelerine Ca^{2+} girişini azaltarak ve vagal refleksleri baskılayarak güçlü bronkodilatasyon sağlar (refrakter status astmatikusta kurtarıcı ajanlardır). Desfluran > 1 MAC düzeyinde havayolu irritasyonu yaparak refleks bronkospazm tetikleyebilir.',
          },
          {
            label: 'İntravenöz Anestezikler',
            text: 'Ketamin sempatomimetik etkisi ve doğrudan düz kas gevşetici özelliğiyle en güçlü IV bronkodilatördür. Propofol entübasyona bağlı vagal refleks bronkokonstriksiyonu tiyopentale göre belirgin biçimde daha iyi baskılar.',
          },
          {
            label: 'Bronkospazm Riski Taşıyan Ajanlar',
            text: 'Histamin salınımı yapan ilaçlar (morfin, meperidin, atraküryum, mivaküryum), antikolinesterazlar (neostigmin — mutlaka atropin/glikopirolat ile dengelenmelidir), β-blokerler (özellikle non-selektif) ve yetersiz anestezi derinliğinde trakeal enstrümantasyon.',
          },
        ],
      },
    ],
  },
  {
    id: 'solunum-mekanigi',
    number: 'Bölüm 2',
    title: 'Solunum Mekaniği: Statik ve Dinamik Fizik Yasaları',
    summary:
      'Transmural basınçlar, elastik geri çekilme, Laplace yasası ve sürfaktan, kompliyans–elastans, sürüş basıncı, hareket denklemi, akım rejimleri, Eşit Basınç Noktası (EPP), zaman sabiti (τ), Oto-PEEP ve solunum işi.',
    sources: "West B.7 · Nunn's B.2–3 · Levitzky B.2 · Amato 2015",
    subsections: [
      {
        heading: '2.1. Transmural Basınçlar ve Statik Denge',
        paragraphs: [
          'Bir içi boş organın genişlemesini belirleyen fiziksel kuvvet, içindeki basınç ile dışındaki basınç arasındaki fark olan transmural basınçtır. Solunum sisteminde akciğer parankimini açık tutan ve volütravmayı/stresi belirleyen temel transmural basınç transpulmoner basınçtır (P_{tp}).',
          'Spontan solunumda diyaframın kasılmasıyla plevral basınç daha negatif hale gelir (ör. −5’ten −8 cmH_{2}O’ya); pozitif basınçlı ventilasyonda ise alveoler basınç yükseltilir. Her iki durumda da akciğeri genişleten şey P_{tp} artışıdır. Ancak obezite, pnömoperiton, karın kompartman sendromu veya göğüs duvarı yanığı gibi göğüs duvarı elastansının arttığı durumlarda yüksek P_{plat} değerlerinin önemli kısmı plevral basıncı (P_{pl}) yenmeye harcanır; özofagus balonuyla (P_{es}) ölçülen P_{tp} hâlâ güvenli aralıkta olabilir.',
        ],
        formulas: [
          {
            expression: 'P_{tp} = P_{alv} − P_{pl}   |   P_{cw} = P_{pl} − P_{atm}   |   P_{rs} = P_{tp} + P_{cw} = P_{alv} − P_{atm}',
            caption: 'Akciğer (P_{tp}), göğüs duvarı (P_{cw}) ve total solunum sistemi (P_{rs}) transmural basınç ilişkisi.',
          },
        ],
      },
      {
        heading: '2.2. Elastik Geri Çekilme, Laplace Yasası ve Sürfaktan',
        paragraphs: [
          'Akciğerin içe doğru büzülme eğilimine elastik geri çekilme (elastic recoil) denir. Bunun yaklaşık 1/3’ü parankimdeki elastin ve kollajen liflerinden, 2/3’ü ise alveoler hava-sıvı arayüzündeki yüzey geriliminden (T) kaynaklanır. West’in klasik deneyinde izole bir akciğer hava yerine salinle şişirildiğinde hava-sıvı arayüzü kaybolduğu için şişirme basıncı yarıdan fazla düşer ve basınç-hacim (P–V) histerezisi neredeyse tamamen ortadan kalkar.',
          'Laplace yasasına göre (P = 2T / r) yüzey gerilimi (T) sabit olsaydı, küçük yarıçaplı alveollerin iç basıncı büyük alveollerden yüksek olur ve küçük alveoller büyüklerin içine boşalarak sönerdi (instabilite ve yaygın atelektazi). Tip II pnömositlerce salgılanan pulmoner sürfaktan bu fiziksel sorunu çözer.',
          'Sürfaktanın %80–90’ı fosfolipidlerden (başlıca amfifilik dipalmitoilfosfatidilkolin — DPPC), %10’u proteinlerden (SP-A, SP-B, SP-C, SP-D) oluşur. SP-B ve SP-C hidrofobiktir ve DPPC’nin hava-sıvı arayüzüne hızla yayılmasını sağlar; SP-A ve SP-D ise doğuştan bağışıklıkta opsonin görevi görür. Alveol küçüldükçe DPPC molekülleri yüzeyde sıkışarak T’yi dramatik biçimde düşürür; alveol genişledikçe moleküller seyrelir ve T artar. Böylece pay (T) ve payda (r) orantılı değişerek farklı boyuttaki alveoller arasında basınç eşitliği korunur.',
        ],
        formulas: [
          {
            expression: 'P = 2T / r   (Küresel alveolde kollaps basıncı)',
            caption: 'Laplace Yasası: T yüzey gerilimi, r alveol yarıçapı. Sürfaktan T’yi r ile orantılı değiştirerek ΔP = 0 dengesini kurar.',
          },
        ],
        bullets: [
          {
            label: 'Sürfaktanın 4 Fizyolojik İşlevi',
            text: '(1) Farklı çaptaki alveollerde stabiliteyi sağlamak, (2) Akciğer kompliyansını artırmak, (3) İnspiratuvar elastik solunum işini azaltmak, (4) Alveolleri kuru tutmak (yüksek T perialveoler interstisyel basıncı aşırı negatifleştirerek Starling kuvvetleri üzerinden kapillerden alveole sıvı sızmasına — pulmoner ödeme — yol açar).',
          },
          {
            label: 'Alveoler İnterdependans (Mead Mekanizması)',
            text: 'Alveoller birbirinden bağımsız balonlar değil ortak elastik septalarla bağlı bir bal peteği ağıdır. Çökmeye başlayan bir alveol, komşu açık alveol duvarlarının radyal dışa çekişiyle açık tutulur.',
          },
          {
            label: 'Fetal Maturasyon ve ARDS',
            text: 'Sürfaktan üretimi 24–28. gebelik haftasında başlar, > 35. haftada olgunlaşır (amniyon L/S oranı > 2). ARDS’de plazma proteinlerinin alveole sızması, yüksek F_{i}O_{2} toksisitesi ve sıfır PEEP (ZEEP) altında tekrarlayan kapanma-açılma (atelektotravma) sürfaktanı inaktive eder.',
          },
        ],
      },
      {
        heading: '2.3. Kompliyans, Elastans, Baby Lung ve Sürüş Basıncı (ΔP)',
        paragraphs: [
          'Kompliyans (C = ΔV / ΔP), birim basınç değişimine karşılık oluşan hacim değişimidir; tersi elastanstır (E = 1/C). Akciğer ve göğüs duvarı mekanik olarak seri bağlıdır; bu nedenle toplam solunum sistemi elastansı iki elastansın toplamına eşittir. Sağlıklı erişkinde C_{L} ≈ 200 mL/cmH_{2}O, C_{cw} ≈ 200 mL/cmH_{2}O ve toplam C_{rs} ≈ 100 mL/cmH_{2}O’dur (entübe sedatize hastada 60–90 mL/cmH_{2}O).',
          'Kompliyans akciğer büyüklüğüne bağımlıdır; doku sertliğini hacimden bağımsız değerlendirmek için spesifik kompliyans (sC_{L} = C_{L} / FRC ≈ 0,05–0,07 cmH_{2}O^{−1}) kullanılır. Yenidoğan ile erişkinin sC_{L} değeri eşittir. Gattinoni’nin “Baby Lung” kavramı, ARDS’de C_{rs}’nin 25–35 mL/cmH_{2}O’ya düşmesinin ana nedeninin kalan sağlam alveollerin taşlaşması değil, dorsal konsolidasyon nedeniyle havalanan fonksiyonel akciğerin (FRC) küçülmesi olduğunu göstermiştir. Bu nedenle ARDS’de 4–6 mL/kg (PBW) düşük tidal volüm ve Amato’nun gösterdiği üzere sürüş basıncı ΔP < 15 cmH_{2}O hedefi mortaliteyle doğrudan ilişkilidir.',
        ],
        formulas: [
          {
            expression: '1 / C_{rs} = 1 / C_{L} + 1 / C_{cw}   ⇔   E_{rs} = E_{L} + E_{cw}   |   ΔP = V_{T} / C_{rs} = P_{plat} − PEEP_{tot}',
            caption: 'Seri kompliyans yasası ve sürüş basıncı (Driving Pressure). Hedef: P_{plat} < 30 cmH_{2}O ve ΔP < 15 cmH_{2}O.',
          },
        ],
        table: {
          title: 'Kompliyans Değişikliklerinin Klinik Sınıflaması',
          headers: ['Klinik Durum', 'C_{L} (Akciğer)', 'C_{cw} (Göğüs Duvarı)', 'C_{rs} (Sistem)', 'Mekanizma'],
          rows: [
            ['Amfizem / Yaşlanma', '↑↑ Artar', '↓ Azalır (yaşla)', '↑ veya Değişken', 'Elastin yıkımı → geri çekilme azalır, P–V sola-yukarı kayar'],
            ['ARDS (“Baby Lung”)', '↓↓ Azalır', 'Normal veya ↓', '↓↓ (20–40)', 'Havalanan FRC dramatik küçülür; kalan parankimin sC_{L}’si normale yakındır'],
            ['İnterstisyel Fibrozis / Ödem', '↓↓ Azalır', 'Normal', '↓ Azalır', 'Kollajen veya interstisyel sıvı parankimi sertleştirir, FRC düşer'],
            ['Obezite / Pnömoperiton / Trendelenburg', 'Sekonder ↓ (atelektazi)', '↓↓ Azalır', '↓ Azalır', 'Yüksek P_{pl} nedeniyle P_{plat} yükselir ama P_{tp} görece korunabilir'],
            ['Kifoskolyoz / Göğüs Yanığı / Karın Kompartman', 'Normal', '↓↓ Azalır', '↓ Azalır', 'E_{cw} baskın hale gelir; gerçek parankim gerilimi P_{es} ile doğrulanmalıdır'],
          ],
        },
      },
      {
        heading: '2.4. Hareket Denklemi, Akım Rejimleri (Poiseuille vs. Türbülan) ve Havayolu Direnci',
        paragraphs: [
          'Dinamik solunum mekaniğinin tamamı Solunum Sisteminin Hareket Denklemi ile özetlenir. Sabit kare dalga akımlı volüm kontrollü ventilasyonda (VCV) inspirasyon sonu duraklama (inspiratory hold) yapıldığında akım sıfırlanır (\\dot{V} = 0) ve basınç P_{peak}’ten P_{plat}’a düşer. Bu iki değer arasındaki fark (P_{peak} − P_{plat}) doğrudan havayolu direncini (R_{aw} = [P_{peak} − P_{plat}] / \\dot{V}), P_{plat} − PEEP_{tot} ise elastik yükü (kompliyansı) yansıtır.',
          'Küçük periferik havayollarında düşük hız nedeniyle laminar akım (Reynolds sayısı Re < 2000) hakimdir ve Poiseuille yasasına uyar: direnç gazın viskozitesi (η) ve boru uzunluğuyla (l) doğru, yarıçapın dördüncü kuvvetiyle (r^{4}) ters orantılıdır. Yarıçap yarıya inerse direnç 16 kat artar. Bu fiziksel yasa endotrakeal tüp seçiminde ve pediatrik havayolunda hayati önem taşır: 4 mm çaplı bir infant trakeasında 1 mm çevresel mukozal ödem kesit alanını %75 daraltıp direnci 16 kat artırır.',
          'Trakea, larinks, ana dallanmalar ve daralmış ETT içindeki yüksek akım hızlarında türbülan akım (Re > 2000) gelişir. Türbülan akımda basınç düşüşü akımın karesiyle (ΔP ∝ ρ · \\dot{V}^{2}) ve gazın yoğunluğuyla (ρ) orantılıdır; viskoziteden neredeyse bağımsızdır. Helyumun yoğunluğu azotun yaklaşık 1/7’si olduğu için Helyoks (%70–80 He / %20–30 O_{2}) subglottik ödem, post-ekstübasyon stridor, trakeal stenoz ve ağır astımda Reynolds sayısını düşürerek türbülan akımı laminara çevirir ve solunum işini hızla azaltır.',
        ],
        formulas: [
          {
            expression: 'P_{aw} + P_{mus} = (V / C_{rs}) + (R_{aw} × \\dot{V}) + PEEP_{tot}   |   R_{lam} = 8ηl / (πr^{4})   |   Re = 2rvρ / η',
            caption: 'Hareket Denklemi, Poiseuille Yasası ve Reynolds Sayısı (Re > 2000 → türbülan akım).',
          },
        ],
        clinicalNote: {
          title: 'Radyal Traksiyon ve Hacim–Direnç İlişkisi',
          text: 'Akciğer hacmi TLC’ye yaklaştıkça çevre parankim dokusu bronşiyol duvarlarını dışa doğru çeker (radyal traksiyon); bu nedenle R_{aw} akciğer hacmi arttıkça hiperbolik olarak azalır (kondüktans G_{aw} = 1/R_{aw} doğrusal artar). Astım ve KOAH hastalarının yüksek FRC’de (hiperinflasyon) nefes alması havayolu direncini düşürmeye yönelik fizyolojik bir telafi mekanizmasıdır.',
        },
      },
      {
        heading: '2.5. Eşit Basınç Noktası (EPP), Dinamik Kompresyon ve Zaman Sabiti (τ / Oto-PEEP)',
        paragraphs: [
          'Zorlu ekspirasyonda alveoler basınç, plevral basınç ile elastik geri çekilme basıncının toplamıdır (P_{alv} = P_{pl} + P_{el}). Gaz ağıza doğru aktıkça sürtünme kaybı nedeniyle lümen içi basınç düşer ve bir noktada dışarıdaki plevral basınca eşitlenir; buraya Eşit Basınç Noktası (EPP) denir. EPP’nin ağız tarafında P_{pl} > P_{aw} olduğundan havayolu dışarıdan sıkıştırılır (dinamik havayolu kompresyonu).',
          'Mead’in Starling direnci (şelale / waterfall) modeline göre EPP oluştuktan sonra maksimum ekspiratuvar akım \\dot{V}_{max} = P_{el} / R_{us} ile sınırlanır; ekspiratuvar kas eforunu (P_{pl}) artırmak hem P_{alv}’yi hem dış basıncı aynı miktarda artırdığı için net itici basınç (P_{alv} − P_{pl} = P_{el}) değişmez. Bu nedenle zorlu ekspirasyonun son %75–80’i efordan bağımsızdır. Normal akciğerde EPP kıkırdak destekli büyük bronşlarda kalır; amfizemde ise P_{el} düştüğü için EPP kıkırdaksız distal bronşiyollere kayar ve erken kollaps gelişir. Büzük dudak solunumu veya ventilatörde eksternal PEEP/CPAP ağız çıkışında geri basınç oluşturarak lümen içi basıncı yükseltir ve EPP’yi yeniden kıkırdaklı proksimal bölgeye taşır.',
          'Bir akciğer ünitesinin pasif dolma veya boşalma hızı Zaman Sabiti (τ = R × C) ile belirlenir. Üstel kinetik gereği 1τ’da hacim değişiminin %63’ü, 2τ’da %86’sı, 3τ’da %95’i ve 4τ’da %98’i tamamlanır. Tam pasif boşalma için ekspirasyon süresi T_{E} ≥ 3τ olmalıdır. Heterojen akciğerde (KOAH, ARDS) hızlı (küçük τ_{1}) ve yavaş (büyük τ_{2}) komşu birimler arasında faz farkı doğar; frekans arttıkça yavaş üniteler dolamaz (frekansa bağımlı kompliyans düşüşü) ve inspirasyon sonu duraklamada hızlıdan yavaşa iç gaz akışı (Pendelluft) gelişir. T_{E} < 3τ olduğunda her solukta gaz hapsolur ve Oto-PEEP (intrinsik PEEP / dinamik hiperinflasyon) oluşur.',
        ],
        diagramId: 'mechanics-pv-epp',
        formulas: [
          {
            expression: 'τ = R × C   (1τ = %63 · 2τ = %86 · 3τ = %95 · 4τ = %98)   |   WOB = ∫ P · dV = W_{elastik} (~%65) + W_{rezistif} (~%35)',
            caption: 'Zaman sabiti üstel boşalma kuralı ve Campbell diyagramına göre solunum işi bileşenleri.',
          },
        ],
        clinicalNote: {
          title: 'Oto-PEEP Kriz Yönetimi ve Solunum İşi (Otis Prensibi)',
          text: 'Ağır Oto-PEEP intratorasik basıncı yükselterek venöz dönüşü engeller ve ani hipotansiyon/PEA oluşturabilir; şüphede ventilatör devresini 10–15 sn ayırarak hapsolmuş gazın boşalması ve tansiyonun toparlanması izlenir. Kalıcı çözüm T_{E}’yi uzatmaktır (RR düşür, I:E = 1:3–1:4, yüksek inspiratuvar akım, bronkodilatasyon). Solunum işi istirahatte toplam \\dot{V}O_{2}’nin %1–3’ü iken ağır yetmezlikte %25–30’unu tüketir (şokta erken entübasyon gerekçesi). Otis prensibine göre restriktif hastalar elastik işi azaltmak için hızlı-yüzeysel, obstrüktif hastalar rezistif işi azaltmak için yavaş-derin solur.',
        },
      },
    ],
  },
  {
    id: 'akciger-hacimleri-frc',
    number: 'Bölüm 3',
    title: 'Akciğer Hacimleri, FRC, Kapanma Kapasitesi ve Pozisyon Etkileri',
    summary:
      'Dört temel hacim ve dört kapasite, Rahn statik dengesi, FRC ölçüm yöntemleri, genel anestezide apneik oksijen rezervi kaybı, vertikal plevral gradyan, Nunn’s yaş kesişimi ve lateral dekübitus fizyolojisi.',
    sources: "Nunn's B.2–3 · West B.2, 7 · Milic-Emili 1966",
    subsections: [
      {
        heading: '3.1. Akciğer Hacimleri, Kapasiteleri ve Rahn Statik Dengesi',
        paragraphs: [
          'Akciğer hacimleri örtüşmeyen 4 temel hacimden (V_{T}, IRV, ERV, RV) ve bunların kombinasyonu olan 4 kapasiteden (IC, FRC, VC, TLC) oluşur. Standart spirometri ağızdan giren-çıkan gazı ölçtüğü için Rezidüel Volümü (RV) ve RV içeren kapasiteleri (FRC, TLC) doğrudan ölçemez.',
          'Rahn diyagramı akciğerin (P_{L}), göğüs duvarının (P_{cw}) ve birleşik solunum sisteminin (P_{rs} = P_{L} + P_{cw}) statik basınç-hacim ilişkisini gösterir. Göğüs duvarı yaklaşık %72 VC’de nötrdür; bu hacmin altında dışa genişlemek ister (negatif basınç). Akciğer ise her hacimde içe büzülmek ister (pozitif basınç). İki zıt kuvvetin tam olarak birbirini dengelediği (P_{L} = −P_{cw}, P_{rs} = 0) dinlenme noktası Fonksiyonel Rezidüel Kapasite’dir (FRC ≈ %40–45 VC). Amfizemde akciğerin içe çekilmesi azaldığından FRC yükselir; fibrozis, obezite ve anestezide FRC belirgin düşer.',
        ],
        diagramId: 'volumes-rahn',
        table: {
          title: 'Sağlıklı Erişkinde Akciğer Hacimleri ve Kapasiteleri (70 kg Referans)',
          headers: ['Parametre', 'Tanım / Formül', 'Erkek', 'Kadın', 'Spirometri', 'Perioperatif Önemi'],
          rows: [
            ['V_{T} (TV)', 'Sakin soluk hacmi', '500 mL', '400–450 mL', 'Ölçülür', 'Koruyucu MV’de PBW baz alınır (6–8 mL/kg)'],
            ['IRV', 'Maksimal ek inspirasyon', '3.000 mL', '1.900 mL', 'Ölçülür', 'Öksürük ve derin nefes rezervi; postop ağrıyla düşer'],
            ['ERV', 'Sakin ekspirasyon sonrası atılabilen', '1.100–1.200 mL', '700–800 mL', 'Ölçülür', 'Supin pozisyon, obezite ve gebelikte ilk azalan hacim'],
            ['RV', 'Maksimal ekspirasyonda kalan hacim', '1.200 mL', '1.000 mL', 'Ölçülemez', 'Yaşlanma ve KOAH’ta erken kapanma ile belirgin artar'],
            ['IC', 'V_{T} + IRV', '3.500 mL', '2.400 mL', 'Ölçülür', 'Dinamik hiperinflasyonda azalır'],
            ['FRC', 'ERV + RV (~35 mL/kg)', '2.300–2.400 mL', '1.800 mL', 'Ölçülemez', 'Ana apneik O_{2} deposu ve küçük havayolu açıklık tamponu'],
            ['VC (FVC)', 'IRV + V_{T} + ERV', '4.600–4.800 mL', '3.100–3.400 mL', 'Ölçülür', 'Ekstübasyon / NMD takibinde VC < 15 mL/kg kritik eşik'],
            ['TLC', 'IRV + V_{T} + ERV + RV', '5.800–6.000 mL', '4.200–4.400 mL', 'Ölçülemez', 'Restriktif paternin altın standart ölçütü (< %80 beklenen)'],
          ],
        },
        bullets: [
          {
            label: 'FRC Ölçüm Yöntemleri ve Hava Hapsi',
            text: 'Helyum dilüsyonu ve azot (N_{2}) yıkama yöntemleri yalnızca ana havayollarıyla bağlantılı (komünike) gaz hacmini ölçer. Vücut pletismografisi ise Boyle yasasına (P_{1}V_{1} = P_{2}V_{2}) dayanarak büller ve hapsolmuş gaz dahil toplam intratorasik gaz hacmini (TGV) ölçer. Pletismografi ile Helyum dilüsyonu arasındaki fark KOAH’taki hava hapsi (air trapping) hacmidir.',
          },
        ],
      },
      {
        heading: '3.2. Genel Anestezide FRC Kaybı ve Apneik Oksijen Rezervi',
        paragraphs: [
          'FRC’nin iki hayati perioperatif görevi vardır: apne sırasında ana oksijen rezervuarı olmak ve bağımlı küçük havayollarını açık tutmak. Sağlıklı bir erişkinde (FRC ≈ 2.400 mL) oda havası solunurken alveoler O_{2} fraksiyonu ≈ %14 olduğundan alveoler O_{2} deposu yalnızca ~330 mL’dir; bazal oksijen tüketimi (\\dot{V}O_{2} ≈ 250 mL/dk) göz önüne alındığında apne 1–1,5 dakika içinde hipoksemiyle sonuçlanır. %100 O_{2} ile 3 dakika preoksijenasyon (denitrojenasyon) yapıldığında F_{A}O_{2} ≈ %87’ye çıkar, depo ~2.100 mL’ye yükselir ve güvenli apne süresi 7–8 dakikaya uzar.',
          'Ancak genel anestezi sürecinde FRC dört ardışık mekanizmayla hızla küçülür: (1) Dik pozisyondan supin pozisyona geçişte karın organlarının diyaframı ~4 cm kraniyale itmesiyle %20–25 düşüş, (2) İndüksiyon ve kas gevşeticiyle diyaframın istirahat tonusu kaybına bağlı ek %15–20 düşüş (ketamin spontan solunumda FRC’yi kısmen koruyan nadir ajandır), (3) Santral torasik kan hacmi artışı ve (4) Yüksek F_{i}O_{2}’nin düşük \\dot{V}/\\dot{Q} bölgelerinde hızla emilmesiyle oluşan absorpsiyon atelektazisi. Obezite, term gebelik ve infantlarda (yüksek \\dot{V}O_{2} + düşük FRC) bu mekanizmalar birleşerek 90 saniyeden kısa sürede desatürasyona yol açar. 25–30° baş yukarı (RAMP) pozisyon, preoksijenasyonda CPAP/PEEP (5–10 cmH_{2}O) ve apneik oksijenasyon bu düşüşü belirgin biçimde hafifletir.',
        ],
      },
      {
        heading: '3.3. Vertikal Plevral Basınç Gradyenti, Kapanma Kapasitesi ve Lateral Pozisyon',
        paragraphs: [
          'Yerçekimi nedeniyle akciğerin kendi ağırlığı plevral boşluk boyunca tepeden tabana doğru hidrostatik bir basınç gradyenti oluşturur (her santimetrede ≈ +0,25–0,30 cmH_{2}O artış). Dik pozisyonda apekste P_{pl} ≈ −10 cmH_{2}O (P_{tp} yüksek → alveoller zaten gerilmiş ve P–V eğrisinin üst-düz kısmında), tabanda ise P_{pl} ≈ −2,5 cmH_{2}O’dur (alveoller istirahatte daha küçük ama P–V eğrisinin en dik, kompliyansı en yüksek bölgesinde). Bu nedenle normal sakin solunumda birim hacim başına ventilasyon bazalde apekse göre belirgin biçimde fazladır.',
          'Ekspirasyon derinleştikçe bazal plevral basınç sıfırı aşıp pozitifleşir ve kıkırdak desteği olmayan bağımlı küçük havayolları kapanmaya başlar. Kapanmanın başladığı toplam akciğer hacmine Kapanma Kapasitesi (CC = Kapanma Hacmi [CV] + RV) denir. Tek nefes N_{2} yıkama (Fowler) testinde Faz IV’ün ani yükselişi CV’yi gösterir. Yaşla elastin kaybı radyal traksiyonu azalttığından CC doğrusal olarak artar (20 yaşta ~%30 TLC → 70 yaşta ~%55 TLC). Nunn’s kuralına göre supin pozisyonda ~44 yaş, dik pozisyonda ~66 yaş itibarıyla CC, FRC’yi aşar ve normal tidal solunum sırasında bile bazal havayolları kapanarak sağ-sol şant oluşturur.',
        ],
        clinicalNote: {
          title: 'Lateral Dekübitus Pozisyonu (Toraks Cerrahisi Paradoksu)',
          text: 'Uyanık spontan soluyan lateral dekübitus hastasında alttaki (bağımlı) akciğer hem daha iyi perfüze hem daha iyi ventile olur (diyaframın alttaki kubbesi karın organlarıyla gerildiği için daha kuvvetli kasılır). Genel anestezi, kas gevşetici ve açık toraksta ise bu koruyucu mekanizma tersine döner: mediasten ağırlığı ve diyafram felci alttaki akciğeri P–V eğrisinin düz alt kısmına iterken üstteki (bağımsız) akciğer daha rahat ventile olur; ancak kan yerçekimiyle alttakine akmaya devam eder ve belirgin \\dot{V}/\\dot{Q} uyumsuzluğu gelişir.',
        },
      },
    ],
  },
  {
    id: 'ventilasyon-difuzyon',
    number: 'Bölüm 4',
    title: 'Alveoler Ventilasyon, Ölü Boşluk ve Gaz Difüzyonu',
    summary:
      'Alveoler ventilasyon–PaCO_{2} ilişkisi, anatomik ve fizyolojik ölü boşluk (Bohr/Enghoff), Alveoler Gaz Denklemi, A–a O_{2} gradyenti, Fick difüzyon yasası ve perfüzyon-sınırlı vs. difüzyon-sınırlı gaz transferi.',
    sources: "West B.2–3 · Nunn's B.7–8 · Levitzky B.3, 6",
    subsections: [
      {
        heading: '4.1. Alveoler Ventilasyon ve Ölü Boşluk (Bohr / Enghoff)',
        paragraphs: [
          'Dakika ventilasyonu (\\dot{V}_{E} = f × V_{T}) tek başına CO_{2} eliminasyonunu göstermez; çünkü her soluğun bir kısmı gaz değişimine katılmayan ölü boşlukta (V_{D}) kalır. Gerçek gaz değişimini belirleyen parametre alveoler ventilasyondur: \\dot{V}_{A} = f × (V_{T} − V_{D}). Hızlı ve çok yüzeysel solunumda \\dot{V}_{E} normal görünse bile V_{T} ölü boşluğa yaklaştığı için \\dot{V}_{A} dramatik düşer ve hiperkapni gelişir.',
          'Kararlı durumda arteriyel CO_{2} basıncı metabolik CO_{2} üretimiyle (\\dot{V}CO_{2} ≈ 200 mL/dk) doğru, alveoler ventilasyonla ters orantılıdır (PaCO_{2} ∝ \\dot{V}CO_{2} / \\dot{V}_{A}). Dolayısıyla alveoler ventilasyon yarıya inerse PaCO_{2} iki katına çıkar; iki katına çıkarsa PaCO_{2} yarıya iner.',
          'Fizyolojik ölü boşluk iki bileşenden oluşur: iletici havayollarının oluşturduğu anatomik ölü boşluk (Fowler tek nefes N_{2} testi ile ölçülür, ≈ 150 mL) + ventile olup perfüze olmayan alveollerin oluşturduğu alveoler ölü boşluk. Sağlıklı kişide alveoler ölü boşluk ihmal edilebilir düzeydedir (V_{D}/V_{T} ≈ 0,25–0,30). Pulmoner emboli, düşük kardiyak debi, hipotansiyon, aşırı PEEP ve ARDS’de alveoler ölü boşluk keskin biçimde artar ve PaCO_{2} − EtCO_{2} farkı açılır (normal fark 2–5 mmHg).',
        ],
        formulas: [
          {
            expression: '\\dot{V}_{A} = f × (V_{T} − V_{D})   |   PaCO_{2} = (\\dot{V}CO_{2} × 0,863) / \\dot{V}_{A}   |   V_{D} / V_{T} = (PaCO_{2} − P_{\\bar{E}CO_{2}}) / PaCO_{2}',
            caption: 'Alveoler ventilasyon, PaCO_{2} hiperbolik denklemi ve Enghoff (modifiye Bohr) fizyolojik ölü boşluk denklemi.',
          },
        ],
      },
      {
        heading: '4.2. Alveoler Gaz Denklemi ve A–a O_{2} Gradyenti',
        paragraphs: [
          'Oksijenlenmedeki bir bozukluğun salt hipoventilasyondan mı yoksa parankimal gaz değişim kusurundan mı (\\dot{V}/\\dot{Q} uyumsuzluğu, şant, difüzyon) kaynaklandığını ayırmanın temel aracı Alveoler Gaz Denklemi ve Alveoler–Arteriyel (A–a) O_{2} gradyentidir. Deniz seviyesinde (P_{atm} = 760 mmHg, P_{H_{2}O} = 47 mmHg) oda havası soluyan (F_{i}O_{2} = 0,21, PaCO_{2} = 40 mmHg, R = 0,8) bir erişkinde P_{A}O_{2} = 0,21 × (760 − 47) − (40 / 0,8) ≈ 150 − 50 = 100 mmHg’dir.',
          'Normal A–a gradyenti (P_{A}O_{2} − PaO_{2}) genç erişkinde 5–10 mmHg’dir ve yaşla artar (yaklaşık üst sınır: Yaş/4 + 4 mmHg). Saf hipoventilasyon (opioid dozaşımı, nöromüsküler blok) veya düşük F_{i}O_{2}’de A–a gradyenti normal kalırken; \\dot{V}/\\dot{Q} uyumsuzluğu, sağ-sol şant ve difüzyon kusurunda A–a gradyenti belirgin biçimde genişler.',
        ],
        formulas: [
          {
            expression: 'P_{A}O_{2} = F_{i}O_{2} × (P_{atm} − P_{H_{2}O}) − (PaCO_{2} / R)   |   P(A−a)O_{2} = P_{A}O_{2} − PaO_{2}',
            caption: 'Alveoler Gaz Denklemi (R = solunum değişim oranı ≈ 0,8; P_{H_{2}O} = 37 °C’de 47 mmHg).',
          },
        ],
      },
      {
        heading: '4.3. Fick Difüzyon Yasası: Perfüzyon vs. Difüzyon Sınırlaması',
        paragraphs: [
          'Gazların alveolokapiller membrandan pasif geçiş hızı Fick yasasına uyar: geçiş hızı yüzey alanı (A), difüzyon katsayısı (D ∝ çözünürlük / √MW) ve kısmi basınç farkıyla (P_{1} − P_{2}) doğru, membran kalınlığıyla (T) ters orantılıdır. CO_{2}’nin sudaki çözünürlüğü O_{2}’nin yaklaşık 24 katı olduğundan difüzyon katsayısı O_{2}’den ~20 kat yüksektir; bu nedenle difüzyon bozuklukları pratikte CO_{2} retansiyonundan çok önce hipoksemi yapar.',
          'Bir eritrositin istirahatte pulmoner kapillerden geçiş süresi ≈ 0,75 saniyedir. Oksijen normalde ilk 0,25 saniyede alveoler basınçla tam dengeye ulaşır; yani 0,50 saniyelik geniş bir difüzyon rezervi vardır. Bu nedenle normal istirahat koşullarında O_{2} ve N_{2}O transferi perfüzyon-sınırlıdır (kana daha fazla gaz geçirmek için kan akımını artırmak gerekir). Buna karşılık karbon monoksit (CO) hemoglobine olağanüstü yüksek afiniteyle bağlandığından kapiller plazma P_{CO}’su neredeyse sıfır kalır ve transfer tamamen membran özellikleriyle (difüzyon-sınırlı) belirlenir — bu nedenle DL_{CO} ölçümünde CO kullanılır. Şiddetli egzersizde (kapiller geçiş süresi 0,25 sn’ye iner), yüksek irtifada (düşük P_{A}O_{2} gradyenti) veya interstisyel fibroziste (kalınlaşmış T) oksijen transferi de difüzyon-sınırlı hale gelerek egzersizle derinleşen hipoksemi oluşturur.',
        ],
        formulas: [
          {
            expression: '\\dot{V}_{gaz} = (A / T) × D × (P_{1} − P_{2})   (D ∝ Çözünürlük / √MW)',
            caption: 'Fick Difüzyon Yasası: CO_{2}, O_{2}’den ~20 kat daha hızlı difüze olur.',
          },
        ],
      },
    ],
  },
  {
    id: 'pulmoner-dolasim-vq',
    number: 'Bölüm 5',
    title: 'Pulmoner Dolaşım, West Zonları, HPV ve \\dot{V}/\\dot{Q} İlişkisi',
    summary:
      'Düşük dirençli pulmoner yatak, hacme bağlı U-şekilli PVR, Hipoksik Pulmoner Vazokonstriksiyon (HPV), West Zon 1–3, \\dot{V}/\\dot{Q} dağılımı, şant denklemi ve hipokseminin 5 temel mekanizması.',
    sources: "West B.4–5 · Nunn's B.6–7 · Miller's",
    subsections: [
      {
        heading: '5.1. Pulmoner Vasküler Direnç (PVR) ve Hipoksik Pulmoner Vazokonstriksiyon (HPV)',
        paragraphs: [
          'Pulmoner dolaşım sistemik kardiyak debinin tamamını (%100) alır, ancak ortalama pulmoner arter basıncı yalnızca ~14–15 mmHg’dir (sistemik ~90–95 mmHg); yani PVR, sistemik vasküler direncin (SVR) yaklaşık 1/10’udur (50–150 dyn·sn·cm^{−5}). Debi arttığında (egzersiz vb.) önceden kapalı kapillerlerin açılması (recruitment) ve açık damarların genişlemesi (distension) sayesinde pulmoner basınç çok az yükselir.',
          'Akciğer hacmi ile PVR arasında U-şekilli bir ilişki vardır ve PVR en düşük değerine tam FRC’de ulaşır. Yüksek hacimlerde (TLC’ye doğru) şişen alveoller duvarlarındaki alveoler kapillerleri sıkıştırarak PVR’yi artırır; düşük hacimlerde (RV’ye doğru) ise parankimin radyal çekişi azaldığından ekstra-alveoler damarlar büzülür ve PVR yeniden yükselir.',
          'Hipoksik Pulmoner Vazokonstriksiyon (HPV), düşük alveoler P_{A}O_{2} (< 70 mmHg; ana sensör P_{A}O_{2}, ikincil P_{\\bar{v}}O_{2}) görülen hipoventile veya atelektazik bölgelerdeki pulmoner arteriyollerin kasılarak kan akımını iyi havalanan akciğer bölgelerine yönlendiren lokal homeostatik reflekstir. Tek akciğer ventilasyonunda (OLV) kollabe akciğere giden kan akımını %40–50 oranında azaltarak ağır hipoksemiyi önler.',
        ],
        clinicalNote: {
          title: 'Anesteziklerin ve Vazodilatörlerin HPV Üzerine Etkisi',
          text: 'Volatil anestezikler (sevofluran, izofluran, desfluran) > 1 MAC düzeyinde HPV’yi doza bağımlı inhibe eder (< 1 MAC’ta etki klinik olarak hafiftir). Propofol ve opioid temelli TIVA HPV’yi belirgin biçimde korur. Nitrogliserin, nitroprussid, kalsiyum kanal blokerleri, dobutamin ve respiratuvar alkaloz (hipokapni) HPV’yi baskılayıp şantı artırırken; asidoz/hiperkapni pulmoner vazokonstriksiyonu güçlendirir.',
        },
      },
      {
        heading: '5.2. West Zonları ve Pulmoner Perfüzyon Dağılımı',
        paragraphs: [
          'Dik pozisyonda yerçekimi hidrostatik etkiyle hem pulmoner arteriyel (P_{a}) hem pulmoner venöz (P_{v}) basıncı tabana doğru artırır. Alveoler basınç (P_{A}) ise her yerde yaklaşık eşittir. Bu üç basıncın sıralaması akciğeri üç fonksiyonel zona ayırır:',
        ],
        diagramId: 'west-zones-pvr',
        table: {
          title: 'West Pulmoner Perfüzyon Zonları',
          headers: ['Zon', 'Basınç İlişkisi', 'Akımı Belirleyen Fark', 'Klinik Durum ve Anestezi Etkisi'],
          rows: [
            ['Zon 1 (Apeks)', 'P_{A} > P_{a} > P_{v}', 'Akım yok (Alveoler ölü boşluk)', 'Sağlıklı uyanık kişide yoktur. Pozitif basınçlı ventilasyon (yüksek PEEP), hipovolemi veya hipotansiyonda P_{A} > P_{a} olur ve Zon 1 belirginleşir.'],
            ['Zon 2 (Orta)', 'P_{a} > P_{A} > P_{v}', 'P_{a} − P_{A} (Şelale / Starling etkisi)', 'Kapiller akım venöz basınçtan bağımsızdır; arteriyel ve alveoler basınç farkıyla belirlenir.'],
            ['Zon 3 (Taban)', 'P_{a} > P_{v} > P_{A}', 'P_{a} − P_{v} (Klasik direnç akımı)', 'Kapillerler sürekli açıktır ve en yüksek perfüzyon buradadır. Supin pozisyonda akciğerin büyük kısmı Zon 3’e geçer.'],
          ],
        },
      },
      {
        heading: '5.3. \\dot{V}/\\dot{Q} Dengesi, Şant Denklemi ve Hipokseminin 5 Mekanizması',
        paragraphs: [
          'Normalde alveoler ventilasyon ~4 L/dk, pulmoner perfüzyon ~5 L/dk olduğundan global \\dot{V}/\\dot{Q} oranı ≈ 0,8’dir. Ancak yerçekimi nedeniyle apeksten tabana doğru perfüzyon, ventilasyondan daha dik bir eğimle artar; sonuçta apekste \\dot{V}/\\dot{Q} yüksek (~3,0; yüksek P_{A}O_{2}, düşük P_{A}CO_{2}), tabanda ise \\dot{V}/\\dot{Q} düşüktür (~0,6). \\dot{V}/\\dot{Q} = 0 durumu perfüze olup hiç ventile olmayan gerçek sağ-sol şanttır (atelektazi, pnömoni, ARDS, ana bronş entübasyonu); \\dot{V}/\\dot{Q} = ∞ ise ventile olup perfüze olmayan ölü boşluktur (pulmoner emboli).',
          'Sağlıklı kişilerde bile bronşiyal venler ve kalpteki Thebesian venleri nedeniyle %2–5 oranında fizyolojik şant vardır. Gerçek şantın ayırt edici tanı özelliği, %100 O_{2} verilmesine rağmen PaO_{2}’nin beklenen düzeye yükselmemesidir; çünkü şantlanan venöz kan havalanan alveollerle hiç temas etmez ve normal alveollerden geçen kanın hemoglobini zaten %100 doygunluğa yakındır (sadece plazmada çözünmüş O_{2} minimal artar).',
        ],
        formulas: [
          {
            expression: '\\dot{Q}_{s} / \\dot{Q}_{t} = (CcO_{2} − CaO_{2}) / (CcO_{2} − C_{\\bar{v}}O_{2})',
            caption: 'Berggren Şant Denklemi: CcO_{2} pulmoner end-kapiller, CaO_{2} arteriyel, C_{\\bar{v}}O_{2} mikst venöz O_{2} içeriği.',
          },
        ],
        table: {
          title: 'Hipokseminin 5 Fizyolojik Mekanizması ve Ayırıcı Tanı Tablosu',
          headers: ['Mekanizma', 'PaCO_{2}', 'A–a O_{2} Gradyenti', '%100 O_{2}’ye Yanıt', 'Tipik Klinik Örnek'],
          rows: [
            ['1. Düşük P_{i}O_{2}', '↓ (kompanzatuvar)', 'Normal', 'Tam düzelir', 'Yüksek irtifa, hipoksik gaz karışımı hatası'],
            ['2. Hipoventilasyon', '↑↑ (primer)', 'Normal', 'Tam düzelir', 'Opioid/anestezik depresyonu, rezidüel NMB, santral apne'],
            ['3. Difüzyon Kusuru', 'Normal / ↓', '↑ Artar', 'İyi düzelir', 'İnterstisyel akciğer fibrozisi, ağır amfizem (egzersizde belirgin)'],
            ['4. \\dot{V}/\\dot{Q} Uyumsuzluğu (En Sık)', 'Normal veya ↑', '↑ Artar', 'İyi düzelir', 'KOAH, astım, kısmi atelektazi, pulmoner ödem başlangıcı'],
            ['5. Sağ-Sol Şant (\\dot{V}/\\dot{Q} = 0)', 'Normal veya ↓', '↑↑ Belirgin artar', 'Zayıf / Yanıtsız', 'Ağır ARDS, tam lober atelektazi, tek akciğer/ana bronş entübasyonu, konjenital şant'],
          ],
        },
      },
    ],
  },
  {
    id: 'gaz-tasinimi-kaskad',
    number: 'Bölüm 6',
    title: 'Oksijen ve Karbondioksit Taşınımı, Hb–O_{2} Eğrisi ve Oksijen Kaskadı',
    summary:
      'CaO_{2} ve DO_{2} matematiği, O_{2}–Hb dissosiyasyon eğrisinin P_{50} ve Bohr/2,3-DPG kaymaları, CO_{2} taşınım formları, Haldane etkisi ve atmosferden mitokondriye Oksijen Kaskadı.',
    sources: "West B.6 · Nunn's B.9–10 · Morgan & Mikhail",
    subsections: [
      {
        heading: '6.1. Oksijen Taşınımı (CaO_{2}, DO_{2}) ve Oksijen–Hemoglobin Dissosiyasyon Eğrisi',
        paragraphs: [
          'Kanda oksijen iki formda taşınır: yaklaşık %98–99’u hemoglobine geri dönüşümlü bağlı (1 g tam doymuş Hb ≈ 1,34 mL O_{2} bağlar; Hüfner sabiti), yalnızca %1–2’si plazmada fiziksel olarak çözünmüş haldedir (0,003 mL O_{2} / dL / mmHg PaO_{2}). Normalde Hb = 15 g/dL, SaO_{2} = %98, PaO_{2} = 100 mmHg iken CaO_{2} ≈ 19,7 + 0,3 = 20 mL O_{2}/dL’dir. Kardiyak debi 5 L/dk ise dokulara sunulan oksijen DO_{2} ≈ 1.000 mL/dk, tüketilen oksijen \\dot{V}O_{2} ≈ 250 mL/dk (ekstraksiyon oranı O_{2}ER ≈ %25, S_{\\bar{v}}O_{2} ≈ %75) olur.',
          'Oksijen-hemoglobin dissosiyasyon eğrisi kooperatif bağlanma (allosterik T → R konformasyon geçişi) nedeniyle sigmoid (S) şeklindedir. Üstteki plato bölgesi (PaO_{2} > 60 mmHg, SaO_{2} > %90) alveoler yüklenmede güvenlik marjı sağlar; alttaki dik bölge (PaO_{2} 20–60 mmHg) ise periferik kapillerlerde küçük bir PO_{2} düşüşüyle dokulara bol miktarda O_{2} bırakılmasını kolaylaştırır.',
          'Hemoglobinin %50 doygunluğa ulaştığı PO_{2} değeri olan P_{50} normal erişkinde 26,8 mmHg’dir. Eğrinin sağa kayması (P_{50} ↑) Hb’nin O_{2}’ye ilgisini azaltarak dokulara O_{2} bırakılmasını kolaylaştırır; sola kayması (P_{50} ↓) ise O_{2}’yi sıkı tutarak doku salınımını zorlaştırır.',
        ],
        diagramId: 'oxyhb-cascade',
        formulas: [
          {
            expression: 'CaO_{2} = (1,34 × Hb × SaO_{2}) + (0,003 × PaO_{2})   |   DO_{2} = CO × CaO_{2} × 10   |   \\dot{V}O_{2} = CO × (CaO_{2} − C_{\\bar{v}}O_{2}) × 10',
            caption: 'Arteriyel oksijen içeriği (mL/dL), sistemik O_{2} sunumu (mL/dk) ve Fick oksijen tüketimi denklemleri.',
          },
        ],
        table: {
          title: 'Oksijen–Hemoglobin Dissosiyasyon Eğrisini Kaydıran Faktörler',
          headers: ['Yön ve Fizyolojik Anlamı', 'Başlıca Faktörler', 'Klinik / Anestezi Korelasyonu'],
          rows: [
            ['Sağa Kayma (P_{50} ↑ · Doku salınımı ↑)', '↑ H^{+} (asidoz / pH ↓), ↑ PaCO_{2} (Bohr etkisi), ↑ Sıcaklık, ↑ 2,3-DPG, anemi, yüksek irtifa, gebelik', 'Metabolik olarak aktif/asidotik dokulara O_{2} bırakılmasını artırır.'],
            ['Sola Kayma (P_{50} ↓ · Hb sıkı tutar, doku salınımı ↓)', '↓ H^{+} (alkaloz / pH ↑), ↓ PaCO_{2} (hiperventilasyon), ↓ Sıcaklık (hipotermi), ↓ 2,3-DPG (beklemiş banka kanı!), HbF (P_{50} ≈ 19 mmHg), COHb, MetHb', 'Masif transfüzyon (düşük 2,3-DPG), agresif hiperventilasyon ve hipotermi birleştiğinde SpO_{2} %100 iken doku hipoksisi gelişebilir!'],
          ],
        },
      },
      {
        heading: '6.2. Karbondioksit Taşınımı, Klorür Şifti ve Haldane Etkisi',
        paragraphs: [
          'CO_{2} kanda üç formda taşınır: yaklaşık %70’i bikarbonat (HCO_{3}^{−}) halinde, %20–23’ü hemoglobin ve plazma proteinlerinin amino gruplarına bağlı karbamino bileşikleri şeklinde ve %7–10’u fiziksel olarak çözünmüş halde. Eritrosit içinde karbonik anhidraz enzimi CO_{2} + H_{2}O ↔ H_{2}CO_{3} ↔ H^{+} + HCO_{3}^{−} tepkimesini binlerce kat hızlandırır. Oluşan H^{+} deoksihemoglobin tarafından tamponlanır; HCO_{3}^{−} ise elektriksel nötraliteyi korumak için plazmadan Cl^{−} içeri alınırken hücre dışına çıkar (Hamburger / Klorür şifti).',
          'Haldane etkisi, Bohr etkisinin ayna görüntüsüdür: hemoglobinin oksijenlenmesinin CO_{2} bağlama kapasitesini azaltmasıdır (deoksihemoglobin hem daha iyi H^{+} tamponudur hem de daha fazla karbamino-Hb oluşturur). Periferik dokularda O_{2} bırakılınca Hb’nin CO_{2} yüklenme kapasitesi artar; akciğer kapillerinde O_{2} bağlanınca CO_{2} hızla serbestleşip alveole atılır. KOAH hastalarında kontrolsüz yüksek F_{i}O_{2} verilmesinin hiperkapniyi ağırlaştırmasında (\\dot{V}/\\dot{Q} bozulmasının yanında) Haldane etkisi de önemli rol oynar.',
        ],
      },
      {
        heading: '6.3. Oksijen Kaskadı (Atmosferden Mitokondriye PO_{2} Basamakları)',
        paragraphs: [
          'Oksijenin kuru atmosfer havasından hücresel oksidatif fosforilasyonun gerçekleştiği mitokondriye kadar izlediği kısmi basınç düşüşü zincirine Oksijen Kaskadı denir. Anestezi ve yoğun bakımda yapılan neredeyse tüm müdahaleler (F_{i}O_{2} artırımı, PEEP, hemoglobin optimizasyonu, kardiyak debi desteği) bu kaskadın belirli bir basamağındaki düşüşü telafi etmeyi amaçlar.',
        ],
        table: {
          title: 'Deniz Seviyesinde Oda Havasında (F_{i}O_{2} = 0,21) Oksijen Kaskadı',
          headers: ['Basamak', 'Yaklaşık PO_{2} (mmHg)', 'Düşüşün Fizyolojik Nedeni'],
          rows: [
            ['Kuru Atmosfer Havası', '159 mmHg', '0,21 × 760 mmHg'],
            ['Nemlendirilmiş Trakeal Hava (P_{i}O_{2})', '149 mmHg', '37 °C su buharı seyreltmesi: 0,21 × (760 − 47)'],
            ['Alveoler Gaz (P_{A}O_{2})', '~100 mmHg', 'Alveoler CO_{2} eklenmesi ve sürekli O_{2} emilimi (−PaCO_{2}/R)'],
            ['Arteriyel Kan (PaO_{2})', '~90–95 mmHg', 'Fizyolojik şant (%2–5) ve bölgesel \\dot{V}/\\dot{Q} dağılımı (A–a farkı)'],
            ['Mikst Venöz Kan (P_{\\bar{v}}O_{2})', '~40 mmHg', 'Sistemik kapillerlerde metabolik O_{2} ekstraksiyonu (≈ %25)'],
            ['Mitokondri İçi PO_{2}', '4 – 22 mmHg (Kritik ~1–3)', 'Hücresel difüzyon mesafesi ve sitokrom oksidaz tüketimi (Pasteur noktası)'],
          ],
        },
      },
    ],
  },
  {
    id: 'solunum-kontrolu',
    number: 'Bölüm 7',
    title: 'Solunumun Nöral ve Kimyasal Kontrolü ve Anestezik Baskılanma',
    summary:
      'Beyin sapı ritim jeneratörü, santral ve periferik kemoreseptörler, CO_{2}/O_{2} yanıt eğrileri, pulmoner mekanoreseptörler ve anestezik/opioid ajanların ventilasyon kontrolüne etkileri.',
    sources: "West B.8 · Nunn's B.4, 20 · Miller's",
    subsections: [
      {
        heading: '7.1. Nöral Merkezler ve Kemoreseptör Mimarisi',
        paragraphs: [
          'Solunumun temel ritmi medulladaki ventral solunum grubunda yer alan pre-Bötzinger kompleksindeki pacemaker nöronlar tarafından üretilir. Dorsal solunum grubu (DRG — traktus solitarius çekirdeği) ağırlıklı olarak inspirasyonu yönetir ve vagal/glossofaringeal duyusal girdileri alır; ventral solunum grubu (VRG) ise zorlu inspirasyon ve aktif ekspirasyonda devreye girer. Ponstaki pnömotaksik merkez (üst pons) inspirasyonu sonlandırarak solunum hızını ve hacmini dengeler; apnöstik merkez (alt pons) inspirasyonu uzatma eğilimindedir.',
          'Kimyasal kontrol iki tamamlayıcı reseptör sistemiyle sağlanır. Santral kemoreseptörler medullanın ventral yüzeyinde yer alır ve dakikalar içindeki istirahat ventilasyonunun ~%80’ini belirler. Kan-beyin bariyeri H^{+} ve HCO_{3}^{−} iyonlarına geçirgen değilken CO_{2}’ye serbestçe geçirgendir; bu nedenle PaCO_{2} yükseldiğinde CO_{2} hızla BOS’a geçer, BOS pH’sını düşürür ve güçlü hiperventilasyon uyarısı doğurur. Kronik hiperkapnik KOAH hastalarında 24–48 saat içinde BOS’a HCO_{3}^{−} taşınarak pH tamponlanır ve santral CO_{2} duyarlılığı körelir.',
          'Periferik kemoreseptörler başlıca karotid cisimciklerde (CN IX — Hering siniri) ve daha az ölçüde aortik cisimciklerde (CN X) bulunur. Hızlı (saniyeler içinde) yanıt verirler ve arteriyel hipoksemiye (PaO_{2} < 60 mmHg) yanıt veren tek reseptör sistemidir. Önemli bir klinik ayrım olarak karotid cisimcikler O_{2} içeriğine (CaO_{2}) değil çözünmüş PaO_{2}’ye duyarlıdır; bu nedenle ağır anemi veya karbon monoksit zehirlenmesinde (PaO_{2} normal iken) hipoksik solunum uyarısı gelişmez. Ayrıca metabolik asidoza (H^{+} artışı) hızlı kompanzatuvar hiperventilasyon yanıtını da periferik kemoreseptörler başlatır.',
        ],
        table: {
          title: 'Santral vs. Periferik Kemoreseptörlerin Karşılaştırması',
          headers: ['Özellik', 'Santral Kemoreseptörler', 'Periferik Kemoreseptörler (Karotid Cisimcik)'],
          rows: [
            ['Yerleşim', 'Medulla oblongata ventral yüzeyi', 'Karotid bifurkasyon (CN IX) & Aort arkı (CN X)'],
            ['Primer Uyaran', 'BOS [H^{+}] artışı (PaCO_{2}’nin BOS’a difüzyonuyla)', '↓ PaO_{2} (< 60 mmHg), ↑ H^{+} (metabolik asidoz), ↑ PaCO_{2}'],
            ['Hipoksi Yanıtı', 'Yok (ağır hipoksi doğrudan merkezi baskılar)', 'Hipoksemiye ventilatuvar yanıtın tek kaynağı'],
            ['Anemi / CO Zehirlenmesi', 'Uyarılmaz', 'Uyarılmaz (PaO_{2} normaldir!)'],
            ['Yanıt Hızı ve Payı', 'Orta (1–2 dk) · CO_{2} yanıtının ~%80’i', 'Çok hızlı (saniyeler) · CO_{2} yanıtının ~%20’si, O_{2}’nin %100’ü'],
          ],
        },
      },
      {
        heading: '7.2. Pulmoner Refleksler ve Anestezik/Opioid İlaçların Etkisi',
        paragraphs: [
          'Akciğerdeki mekanoreseptörler de solunum paternini şekillendirir: hava yolu düz kasındaki yavaş adapte olan gerilme reseptörleri Hering-Breuer refleksi ile aşırı akciğer şişmesini önler (erişkinlerde yalnızca yüksek V_{T}’lerde, yenidoğanlarda normal solunumda aktiftir); epiteldeki hızlı adapte olan irritant reseptörler duman/sekresyon/soğuk hava ile öksürük ve bronkokonstriksiyon tetikler; alveoler duvar kapiller komşuluğundaki J (jukstakapiller) reseptörleri pulmoner ödem, emboli ve inflamasyonda hızlı-yüzeysel solunum (taşipne) ve dispne oluşturur.',
        ],
        bullets: [
          {
            label: 'Opioidler (µ-Reseptör Agonistleri)',
            text: 'CO_{2} yanıt eğrisini sağa kaydırır, eğimini düşürür ve apneik eşiği yükseltir. Karakteristik olarak solunum hızını (RR) düşürürken tidal hacmi başlangıçta görece korur (“yavaş ve derin solunum”); yüksek dozda tam santral apne gelişir. Karotid cisimcik hipoksik yanıtını da belirgin azaltır.',
          },
          {
            label: 'Volatil Anestezikler',
            text: 'CO_{2} yanıt eğrisini doza bağımlı sağa kaydırıp düzleştirir (hızlı-yüzeysel solunum paterni oluşturur). En kritik anestezi kuralı: 0,1 MAC gibi çok düşük (sub-anestezik / derlenme odası) volatil konsantrasyonları bile karotid cisimciğin hipoksik ventilatuvar yanıtını (HVR) dramatik biçimde baskılar!',
          },
          {
            label: 'Propofol, Benzodiazepinler ve Ketamin',
            text: 'Propofol ve benzodiazepinler hem hiperkapnik hem hipoksik yanıtı baskılar (opioidlerle sinerjik solunum depresyonu). Ketamin ve deksmedetomidin klinik sedasyon dozlarında solunum dürtüsünü diğer ajanlara kıyasla belirgin biçimde daha iyi korur.',
          },
        ],
      },
    ],
  },
  {
    id: 'perioperatif-sentez',
    number: 'Bölüm 8',
    title: 'Genel Anestezi ve Pozitif Basınçlı Ventilasyonun Fizyolojik Özeti',
    summary:
      'İndüksiyondan derlenmeye tüm solunum fizyolojisi basamaklarının yatak başı entegrasyonu, kalp-akciğer etkileşimi ve akciğer koruyucu ventilasyon ilkeleri.',
    sources: "Nunn's B.20, 30 · Miller's · Marino's The ICU Book",
    subsections: [
      {
        heading: '8.1. İndüksiyondan Ekstübasyona Perioperatif Solunum Değişiklikleri',
        paragraphs: [
          'Genel anestezi solunum sistemini tek bir noktadan değil, aynı anda tüm fizyolojik halkalardan etkiler. Başarılı bir perioperatif yönetim, bu değişiklikleri öngörüp proaktif mekanik önlemlerle dengelemeyi gerektirir.',
        ],
        table: {
          title: 'Genel Anestezi ve Pozitif Basınçlı Ventilasyonun Fizyolojik Özeti',
          headers: ['Fizyolojik Parametre', 'Genel Anestezide Değişim', 'Temel Mekanizma', 'Koruyucu Klinik Müdahale'],
          rows: [
            ['FRC', '%35–45 toplam düşüş', 'Supin pozisyon + diyafram tonusu kaybı + atelektazi', '25–30° RAMP, 5–8 cmH_{2}O PEEP, gerektiğinde recruitment'],
            ['Kapanma Kapasitesi (CC)', 'CC > FRC kesişimi erkenleşir', 'FRC’nin CC altına inmesiyle bazal havayolu kapanması', 'PEEP ile FRC’yi CC üzerine taşımak; F_{i}O_{2}’yi gereksiz %100 tutmamak'],
            ['Atelektazi ve Şant', 'Hastaların ~%85–90’ında dorsal atelektazi; şant %5–15’e çıkar', 'Kompresyon + yüksek F_{i}O_{2} absorpsiyon atelektazisi', 'İndüksiyonda CPAP, idamede F_{i}O_{2} ≤ 0,80 (mümkünse 0,40–0,50) + PEEP'],
            ['Ölü Boşluk (V_{D}/V_{T})', 'Artar (0,30 → 0,40–0,50)', 'Pozitif basınçla Zon 1 artışı + devre/filtre ölü boşluğu', 'Gereksiz devre uzatmalarından kaçınmak, normovolemiyi korumak'],
            ['HPV ve \\dot{V}/\\dot{Q}', '\\dot{V}/\\dot{Q} dağılımı genişler', 'Volatiller (>1 MAC) ve vazodilatörlerle HPV zayıflaması', 'OLV’de volatili ≤ 1 MAC tutmak veya TIVA tercih etmek'],
            ['Kardiyopulmoner Etkileşim', 'RV preload ↓, RV afterload ↑, LV afterload ↓', 'Pozitif intratorasik basınç venöz dönüşü azaltır, PVR’yi artırır; LV transmural duvar gerilimini düşürür', 'Hipovolemide yüksek PEEP/Oto-PEEP’ten kaçınmak; sol kalp yetmezliğinde PEEP’in yararlı olabileceğini bilmek'],
            ['Ventilatör Hedefleri', 'VILI’den (baro/volü/atelektotravma) korunma', 'Aşırı gerilme (ΔP ↑) ve tekrarlayan kollaps (ZEEP)', 'V_{T} 6–8 mL/kg PBW (ARDS 4–6), P_{plat} < 30, ΔP < 15 cmH_{2}O, bireyselleştirilmiş PEEP'],
          ],
        },
      },
    ],
  },
];

export const RESPIRATORY_TEXTBOOK_REFERENCES = [
  {
    authors: 'West JB, Luks AM.',
    title: "West's Respiratory Physiology: The Essentials.",
    detail: '11th ed. Wolters Kluwer; 2021. (Bölüm 1–8: Yapı, Ventilasyon, Difüzyon, Kan Akımı, V/Q, Gaz Taşınımı, Mekanik, Kontrol).',
  },
  {
    authors: 'Lumb AB, Thomas CR.',
    title: "Nunn's Applied Respiratory Physiology.",
    detail: '9th ed. Elsevier; 2021. (Bölüm 1–10, 20: Anestezi, 30: Mekanik Ventilasyon).',
  },
  {
    authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP.',
    title: "Miller's Anesthesia.",
    detail: '9th/10th ed. Elsevier. (Respiratory Physiology, Pulmonary Pharmacology & Mechanical Ventilation).',
  },
  {
    authors: 'Butterworth JF, Mackey DC, Wasnick JD.',
    title: "Morgan & Mikhail's Clinical Anesthesiology.",
    detail: '7th ed. McGraw-Hill; 2022. (Respiratory Physiology & Anesthesia).',
  },
  {
    authors: 'Levitzky MG.',
    title: 'Pulmonary Physiology.',
    detail: '10th ed. McGraw-Hill; 2022. (Mekanik, V/Q, Difüzyon ve Kontrol Denklem Türetmeleri).',
  },
  {
    authors: 'Amato MBP, Meade MO, Slutsky AS, et al.',
    title: 'Driving pressure and survival in the acute respiratory distress syndrome.',
    detail: 'N Engl J Med. 2015;372(8):747–755.',
  },
  {
    authors: 'Gattinoni L, Marini JJ, Pesenti A, et al.',
    title: 'The "baby lung" became an adult.',
    detail: 'Intensive Care Med. 2016;42(5):663–673.',
  },
];
