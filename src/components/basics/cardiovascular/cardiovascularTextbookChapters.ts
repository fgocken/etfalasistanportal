import type { CardiovascularDiagramId } from './CardiovascularTextbookDiagrams';
import type { FormulaEntry, TableBlock } from '../respiratory/respiratoryTextbookChapters';

export interface CardiovascularSubSection {
  heading: string;
  paragraphs: string[];
  bullets?: { label: string; text: string }[];
  formulas?: FormulaEntry[];
  table?: TableBlock;
  tables?: TableBlock[];
  diagramId?: CardiovascularDiagramId;
  clinicalNote?: {
    title: string;
    text: string;
  };
}

export interface CardiovascularTextbookChapter {
  id: string;
  number: string;
  title: string;
  summary: string;
  sources: string;
  subsections: CardiovascularSubSection[];
}

export const CARDIOVASCULAR_TEXTBOOK_CHAPTERS: CardiovascularTextbookChapter[] = [
  {
    id: 'fonksiyonel-anatomi-ecc',
    number: 'Bölüm 1',
    title: 'Fonksiyonel Anatomi, Miyokardiyal Ultrastrüktür ve Otonomik İnnervasyon',
    summary:
      'Seri ve paralel vasküler yatak mimarisi, kan hacmi dağılımı ve Windkessel etkisi, kardiyomiyosit eksitasyon–kontraksiyon kenetlenmesi (ECC), lusitropi ve adrenerjik/muskarinik otonomik sinyal yolakları.',
    sources: "Klabunde B.1–2 · Kaplan's · Miller's",
    subsections: [
      {
        heading: '1.1. Seri–Paralel Dolaşım Mimarisi, Windkessel Etkisi ve Kan Hacmi Dağılımı',
        paragraphs: [
          'Kardiyovasküler sistem mekanik olarak seri bağlı iki pompadan (sağ ve sol kalp) oluşur; bu nedenle kararlı durumda sağ ventrikülün pulmoner dolaşıma pompaladığı dakika hacmi, sol ventrikülün sistemik dolaşıma pompaladığı debiye (≈ 5 L/dk) eşit olmak zorundadır. Buna karşın sistemik dolaşımdaki organ yatakları (beyin, koroner, böbrek, splanknik, iskelet kası) birbirine paralel bağlıdır. Paralel dizilim iki hayati avantaj sağlar: her organa aynı yüksek arteriyel perfüzyon basıncı (MAP) ulaşır ve tek bir organın arteriyoler direnci değiştiğinde diğer organlara giden kan akımı bağımsız olarak düzenlenebilir (1/R_{tot} = Σ 1/R_{i}).',
          'Aort ve büyük elastik arterler yüksek elastin içerikleri sayesinde sistolde kalpten fırlatılan atım hacminin bir kısmını gerilerek depolar, diyastolde ise elastik geri çekilme ile kanı perifere itmeye devam eder (Windkessel etkisi). Böylece kalbin kesintili (pulsatil) pompalama hareketi kapiller düzeyde sürekli akıma dönüştürülür. Yaşlanma ve aterosklerozda elastin kaybı aort kompliyansını düşürür; sistolik basınç yükselir, diyastolik basınç düşer ve nabız basıncı genişler.',
          'Total kan hacminin (~70 mL/kg ≈ 5 L) yaklaşık %60–65’i yüksek kompliyanslı ven ve venüllerde (kapasitans damarları) bulunur; arteriyel sistemde ise yalnızca ~%13–15’i yer alır. Sistemik vasküler direncin (SVR) ve basınç düşüşünün ana bölgesi (~%50–60) kalın düz kas duvarlı arteriyollerdir (direnç damarları). Kapillerlerde paralel dallanma nedeniyle toplam kesit alanı ~2.500–4.500 cm^{2}’ye fırlar ve süreklilik yasası (Q = A × v) gereği kan akım hızı < 0,05 cm/sn’ye düşerek gaz ve solüt difüzyonuna yeterli geçiş süresi tanır.',
        ],
        diagramId: 'vascular-ecc',
        table: {
          title: 'Tablo 1 — Vasküler Kompartmanların Yapısal ve Fizyolojik Özellikleri',
          headers: ['Vasküler Segment', 'Kan Hacmi Payı', 'Ortalama Basınç', 'Temel Fizyolojik İşlev'],
          rows: [
            [
              'Aort ve Büyük Arterler',
              '~%13',
              '90–100 mmHg',
              'Windkessel elastik tamponlama; pulsatil akımı sürekli akıma çevirme',
            ],
            [
              'Arteriyoller',
              '~%2',
              '85 → 32 mmHg',
              'SVR’nin ana bölgesi (~%50–60); bölgesel organ kan akımı dağılımı',
            ],
            [
              'Kapillerler',
              '~%5',
              '32 → 15 mmHg',
              'En geniş kesit alanı, en düşük lineer hız; gaz/solüt/sıvı değişimi',
            ],
            [
              'Venül ve Venler',
              '~%64',
              '15 → 2 mmHg',
              'Kapasitans rezervuarı (kompliyansı arterlerin ~24 katı); P_{msf} kontrolü',
            ],
            [
              'Kalp ve Pulmoner Yatak',
              '~%16 (%7 + %9)',
              'mPAP ≈ 14 mmHg',
              'Düşük dirençli gaz değişim yatağı ve merkezi pompa',
            ],
          ],
        },
      },
      {
        heading: '1.2. Eksitasyon–Kontraksiyon Kenetlenmesi (ECC) ve Lusitropi',
        paragraphs: [
          'İskelet kasından farklı olarak kalp kası hücreleri interkalat disklerdeki desmozomlarla mekanik, gap junction’larla (konneksin-43) elektriksel bir sinsityum oluşturur ve kasılma için mutlaka ekstraselüler Ca^{2+} girişine ihtiyaç duyar. Aksiyon potansiyeli T-tübüller boyunca ilerlerken Faz 2 platosunda voltaj kapılı L-tipi (dihidropiridin) Ca^{2+} kanalları açılır. İçeri giren az miktardaki tetikleyici Ca^{2+}, sarkoplazmik retikulum (SR) üzerindeki riyanodin reseptörlerine (RyR2) bağlanarak çok daha büyük bir Ca^{2+} boşalmasını tetikler (Kalsiyumla İndüklenen Kalsiyum Salınımı — CICR).',
          'Sitozolik Ca^{2+} artışı (10^{-7} → 10^{-5} M), Troponin C’ye bağlanarak tropomiyozinin aktin üzerindeki bağlanma yerlerini açmasını ve ATP hidroliziyle aktin–miyozin çapraz köprü döngüsünü başlatır. Kasılma gücü (inotropi), sarkomere sunulan sitozolik Ca^{2+} pikine ve Troponin C’nin Ca^{2+} duyarlılığına (levosimendan hedefi) bağlıdır. Diyastolik gevşeme (lusitropi) pasif değil, ATP gerektiren aktif bir süreçtir: sitozolik Ca^{2+}’nın ~%80’i SERCA2a pompasıyla SR’ye geri alınır, ~%20’si ise Na^{+}/Ca^{2+} değiştiricisi (NCX) ve plazma membran Ca^{2+}-ATPaz ile hücre dışına atılır. Volatil anestezikler L-tipi Ca^{2+} akımını ve SR salınımını azaltarak doza bağımlı negatif inotropi oluşturur.',
        ],
      },
      {
        heading: '1.3. Kardiyovasküler Otonomik İnnervasyon ve Reseptör Fizyolojisi',
        paragraphs: [
          'Kalbin sempatik innervasyonu T1–T4 spinal segmentlerinden çıkan kardiyoakseleratör liflerle tüm atriyum, ileti sistemi ve ventrikül miyokardına uzanır. Parasempatik innervasyon ise nervus vagus (CN X) ile başlıca SA nod (ağırlıklı sağ vagus), AV nod (ağırlıklı sol vagus) ve atriyumlara gider; ventriküler miyokardda vagal innervasyon çok seyrektir. İstirahatte kalp hızı üzerinde parasempatik (vagal) tonus baskındır (intrinsik SA nod hızı ~100–110/dk iken istirahat hızı 60–80/dk).',
        ],
        bullets: [
          {
            label: 'β_{1}-Adrenerjik (G_{s} → cAMP ↑ → PKA)',
            text: 'SA/AV nod ve ventrikülde bulunur. Pozitif kronotropi (hız), dromotropi (AV ileti), inotropi (L-tipi Ca^{2+} ↑) ve lusitropi (fosfolamban fosforilasyonu → SERCA2a hızlanması) sağlar; böbrek jukstaglomerüler hücrelerinden renin salınımını artırır.',
          },
          {
            label: 'β_{2}-Adrenerjik (G_{s} → cAMP ↑)',
            text: 'İskelet kası, koroner ve bronşiyal düz kaslarda miyozin hafif zincir kinazı (MLCK) inhibe ederek vazodilatasyon (SVR ↓) ve bronkodilatasyon yapar.',
          },
          {
            label: 'α_{1}-Adrenerjik (G_{q} → IP_{3}/DAG → Ca^{2+} ↑)',
            text: 'Arteriyol ve ven düz kaslarında güçlü vazokonstriksiyon (SVR ↑ ve venokonstriksiyonla P_{msf} ↑) oluşturur (fenilefrin, norepinefrin).',
          },
          {
            label: 'M_{2}-Muskarinik (G_{i} → cAMP ↓, I_{K(ACh)} ↑)',
            text: 'SA ve AV nodda hiperpolarizasyon ve Faz 4 eğiminde azalma ile negatif kronotropi ve negatif dromotropi oluşturur.',
          },
        ],
        clinicalNote: {
          title: 'Yüksek Spinal Blok ve Kalp Nakilli (Denerve) Kalp',
          text: 'T4 düzeyine ulaşan nöraksiyel (spinal/epidural) anestezi sempatik kardiyoakseleratör lifleri (T1–T4) bloke ederek karşılanmamış vagal tonus, bradikardi ve hipotansiyona yol açar. Kalp nakli geçirmiş hastalarda ise kalp otonomik olarak denervedir: istirahat kalp hızı 90–110/dk’dır, baroreseptör refleksi yoktur ve atropin, glikopirolat veya efedrin (indirekt etki) etkisiz kalır; bradikardi/hipotansiyonda doğrudan etkili ajanlar (izoproterenol, epinefrin, dobutamin) kullanılmalıdır.',
        },
      },
    ],
  },
  {
    id: 'kardiyak-elektrofizyoloji',
    number: 'Bölüm 2',
    title: 'Kardiyak Elektrofizyoloji, Aksiyon Potansiyelleri ve İleti Sistemi',
    summary:
      'Hızlı yanıt (ventrikül/His-Purkinje) ve yavaş yanıt (SA/AV nod) aksiyon potansiyelleri, iyon kanalları, refrakter periyotlar, ileti hiyerarşisi, elektrolit bozuklukları ve anesteziklerin elektrofizyolojik etkileri.',
    sources: 'Klabunde B.2 · Guyton & Hall · Morgan & Mikhail',
    subsections: [
      {
        heading: '2.1. Hızlı Yanıt ve Yavaş Yanıt (Pacemaker) Aksiyon Potansiyelleri',
        paragraphs: [
          'Kalpte iki temel elektrofizyolojik hücre tipi vardır. Ventrikül/atriyum miyositleri ve His–Purkinje sistemi hızlı yanıt aksiyon potansiyeli gösterir: istirahat membran potansiyeli (Faz 4) yüksek K^{+} geçirgenliği (I_{K1}) sayesinde −90 mV’de stabildir. Eşik (−70 mV) aşıldığında hızlı voltaj kapılı Na^{+} kanalları (I_{Na}) açılarak dik bir depolarizasyon (Faz 0) oluşturur. Faz 1’de geçici dışa K^{+} akımı (I_{to}) küçük bir çentik yapar. Faz 2 (plato), içe L-tipi Ca^{2+} akımı (I_{Ca-L}) ile dışa gecikmiş K^{+} akımının (I_{Kr}, I_{Ks}) dengelenmesiyle 200–300 ms sürer; bu uzun plato kardiyak tetaniyi imkânsız kılar. Faz 3’te Ca^{2+} kanalları kapanıp K^{+} çıkışı baskınlaşarak repolarizasyonu tamamlar.',
          'SA ve AV nod hücreleri ise yavaş yanıt (pacemaker) profili gösterir. Sabit bir istirahat potansiyelleri yoktur; en negatif değerleri (−60 mV) hızlı Na^{+} kanallarını inaktif tutar. Faz 4’te spontan diyastolik depolarizasyonu hiperpolarizasyonla aktive olan "funny" Na^{+} kanalları (I_{f} — ivabradin hedefi), T-tipi Ca^{2+} girişi ve azalan K^{+} çıkışı yürütür. Eşik (−40 mV) aşıldığında Faz 0 yükselişi hızlı Na^{+} ile değil yavaş L-tipi Ca^{2+} kanallarıyla (I_{Ca-L}) gerçekleşir; bu nedenle verapamil/diltiazem ve adenozin SA/AV nod iletisini belirgin yavaşlatır.',
        ],
        diagramId: 'action-potentials',
      },
      {
        heading: '2.2. İleti Hiyerarşisi, Overdrive Supresyonu ve EKG Korelasyonu',
        paragraphs: [
          'En hızlı spontan depolarizasyon hızına sahip SA nod (60–100/dk), alt odaklardaki Na^{+}/K^{+}-ATPaz pompasını uyararak onları hiperpolarize tutar (overdrive supresyonu). SA nod baskılanırsa sırasıyla AV nod (40–60/dk) ve His–Purkinje sistemi (20–40/dk) kaçış ritmi (escape rhythm) üretir. AV noddaki yavaş ileti (~0,05 m/sn, PR aralığına ~100 ms katkı) ventrikül sistolü başlamadan önce atriyal kasılmanın ventrikül doluşunu tamamlamasına olanak tanır ve hızlı atriyal aritmilerde (AF) ventrikülü aşırı hızlardan korur. Purkinje lifleri ise 2–4 m/sn ile en hızlı iletiyi sağlayarak iki ventrikülün eşzamanlı kasılmasını (dar QRS < 120 ms) garanti eder.',
        ],
        table: {
          title: 'Tablo 2 — Hızlı Yanıt (Ventrikül) vs. Yavaş Yanıt (SA/AV Nod) Karşılaştırması',
          headers: ['Özellik', 'Hızlı Yanıt (Atriyum, Ventrikül, Purkinje)', 'Yavaş Yanıt (SA ve AV Nod)'],
          rows: [
            [
              'İstirahat / Maks. Diyastolik Potansiyel',
              '−90 mV (sabit · I_{K1} baskın)',
              '−60 mV (stabil değil · spontan Faz 4)',
            ],
            ['Faz 0 Depolarizasyon Akımı', 'Hızlı Na^{+} girişi (I_{Na})', 'Yavaş L-tipi Ca^{2+} girişi (I_{Ca-L})'],
            ['Faz 1 & Faz 2 Platosu', 'Belirgin (uzun plato ≈ 200 ms)', 'Yok (yavaş yükseliş sonrası doğrudan Faz 3)'],
            ['İleti Hızı', '0,5–1 m/sn (miyokard) · 2–4 m/sn (Purkinje)', 'Çok yavaş (~0,05 m/sn · AV gecikmesi)'],
            [
              'Farmakolojik Baskılayıcılar',
              'Sınıf I (lidokain, bupivakain LAST!), hiperkalemi',
              'β-bloker, non-DHP KKB, adenozin, digoksin',
            ],
          ],
        },
      },
      {
        heading: '2.3. Elektrolit Dengesizlikleri ve Anesteziklerin Elektrofizyolojik Etkileri',
        paragraphs: [],
        bullets: [
          {
            label: 'Hiperkalemi (K^{+} > 5,5 mEq/L)',
            text: 'Nernst denklemine göre istirahat potansiyelini daha az negatif (ör. −75 mV) yapar. Bu kısmi depolarizasyon hızlı Na^{+} kanallarını inaktive ederek iletiyi yavaşlatır: sivri T dalgası → PR uzaması ve P düzleşmesi → geniş QRS → sinüzoidal dalga ve VF/asistoli. IV kalsiyum glukonat/klorür eşik potansiyelini daha az negatif hale getirerek membran uyarılabilirliğini saniyeler içinde stabilize eder (serum K^{+}’yı düşürmez).',
          },
          {
            label: 'Hipokalemi ve Hipomagnezemi',
            text: 'I_{Kr} kanallarını inhibe edip Faz 3 repolarizasyonu uzatır (ST çökmesi, U dalgası, QTc uzaması), erken ard-depolarizasyonlar (EAD) yoluyla Torsades de Pointes riskini artırır.',
          },
          {
            label: 'Anestezikler ve QTc',
            text: 'Sevofluran, izofluran, desfluran, ondansetron ve droperidol I_{Kr} blokajıyla QTc’yi uzatır; konjenital uzun QT sendromunda propofol temelli TIVA tercih edilir. Propofol, remifentanil, deksmedetomidin ve süksinilkolin (tekrar doz) belirgin vagotoni ve bradikardi yapabilir.',
          },
        ],
        clinicalNote: {
          title: 'Bupivakain Kardiyotoksisitesi (LAST) Mekanizması',
          text: 'Bupivakain hızlı Na^{+} kanallarına hızla bağlanıp diyastolde çok yavaş ayrılır ("fast-in, slow-out"), bu nedenle QRS’i hızla genişletip re-entry ventriküler aritmilere ve refrakter asistoliye yol açar; eşzamanlı olarak mitokondriyal karnitin-açilkarnitin translokazı inhibe ederek miyokardın yağ asidi oksidasyonunu keser. Tedavide %20 lipid emülsiyonu ve modifiye (düşük doz epinefrin, vazopresin/kalsiyum kanal blokeri olmadan) ACLS uygulanır.',
        },
      },
    ],
  },
  {
    id: 'kardiyak-siklus-pv',
    number: 'Bölüm 3',
    title: 'Kardiyak Siklus, Wiggers Diyagramı ve Basınç–Hacim (P–V) Döngüsü',
    summary:
      'Kardiyak siklusun 7 mekanik fazı, kalp sesleri ve santral venöz (JVP/CVP) dalgaları, sol ventrikül P–V döngüsü, ESPVR/EDPVR eğrileri, atım işi ve preload/afterload/inotropi değişikliklerinin geometrik yansımaları.',
    sources: "Klabunde B.3–4 · Miller's · Kaplan's",
    subsections: [
      {
        heading: '3.1. Kardiyak Siklus Fazları, Wiggers Diyagramı ve JVP/CVP Dalga Formu',
        paragraphs: [
          '75 atım/dk hızda bir kardiyak siklus 0,80 saniye sürer: bunun ~0,27 saniyesi sistol, ~0,53 saniyesi (~%65) diyastoldür. Kalp hızı arttıkça sistol süresi çok az kısalırken diyastol süresi orantısız biçimde kısalır; bu durum hem ventrikül doluşunu hem sol koroner perfüzyonu doğrudan kısıtlar.',
          'Santral venöz basınç (CVP / JVP) trasesinde üç pozitif dalga ve iki negatif iniş görülür: a dalgası atriyal kasılmayı (AF’de kaybolur; AV dissosiyasyonda "cannon a" dalgası oluşur), c dalgası izovolumetrik kasılmada triküspit kapağın sağ atriyuma bombeleşmesini, x inişi atriyal gevşeme ve kapak halkasının aşağı çekilmesini, v dalgası kapalı triküspit kapağa karşı pasif venöz doluşu (triküspit yetmezliğinde dev v dalgası), y inişi ise triküspit kapağın açılmasıyla hızlı ventriküler boşalmayı (tamponadda küntleşir, konstriktif perikarditte derinleşir) yansıtır.',
        ],
        diagramId: 'wiggers-pv',
      },
      {
        heading: '3.2. P–V Döngüsü Dinamikleri: Preload, Afterload ve İnotropi Kaymaları',
        paragraphs: [
          'Basınç–hacim döngüsü iki sınır eğrisi arasında çalışır. Alt sınır olan EDPVR (diyastol sonu basınç–hacim ilişkisi) ventrikülün pasif diyastolik sertliğini gösterir; sol ventrikül hipertrofisi, iskemi veya tamponadda yukarı-sola kayarak küçük hacim artışlarında bile LVEDP’nin hızla yükselmesine neden olur. Üst-sol sınır olan ESPVR (sistol sonu basınç–hacim ilişkisi) eğimi E_{es}, preload ve afterload’dan bağımsız olarak gerçek miyokardiyal kontraktiliteyi ölçen altın standart parametredir.',
        ],
        formulas: [
          {
            expression: 'SV = EDV − ESV   |   EF = (SV / EDV) × 100 ≈ %55–70   |   E_{es} = ESP / (ESV − V_{0})',
            caption:
              'Atım hacmi (~70 mL), ejeksiyon fraksiyonu ve sistol sonu elastans (ESPVR eğimi — yükten bağımsız inotropi indeksi).',
          },
        ],
        bullets: [
          {
            label: '↑ Preload (EDV Artışı)',
            text: 'Döngü EDPVR boyunca sağa genişler; aynı ESPVR ve afterload’da ESV sabit kalırken EDV arttığı için döngü genişler (SV ↑, Atım İşi ↑).',
          },
          {
            label: '↑ Afterload (Arteriyel Elastans E_{a} Artışı)',
            text: 'Aort kapağı daha yüksek basınçta açılır, ejeksiyon daha erken sonlanır: döngü "daha uzun ve daha dar" hale gelir (ESV ↑, SV ↓, pik LV basıncı ↑, MVO_{2} ↑).',
          },
          {
            label: '↑ Kontraktilite (Pozitif İnotropi)',
            text: 'ESPVR sola-yukarı dikleşir (E_{es} ↑); ventrikül daha düşük ESV’ye kadar boşalır (ESV ↓, SV ↑, EF ↑).',
          },
        ],
        clinicalNote: {
          title: 'Atriyal Kick ve Diyastolik Disfonksiyon (Aort Darlığı / HFpEF)',
          text: 'Normal genç kalpte diyastolik doluşun ~%80’i pasif, ~%20’si geç diyastolde atriyal kasılmayla (atriyal kick) sağlanır. Ancak konsantrik sol ventrikül hipertrofisi (aort darlığı, kronik HT) veya yaşlı sert ventrikülde (HFpEF) atriyal kasılmanın katkısı %35–40’a çıkar. Bu hastalarda intraoperatif yeni gelişen atriyal fibrilasyon (AF) veya nodal ritim, preload’u ani biçimde düşürerek şiddetli hipotansiyon ve kardiyak kollaps yaratır; sinüs ritminin korunması hayati önceliktir.',
        },
      },
    ],
  },
  {
    id: 'kardiyak-debi-guyton',
    number: 'Bölüm 4',
    title: 'Kardiyak Debi Determinanları, Frank–Starling ve Guyton Venöz Dönüş Eğrisi',
    summary:
      'CO = HR × SV bileşenleri, Laplace duvar gerilimi, Frank–Starling mekanizması, Guyton venöz dönüş matematiği (P_{msf}, stressed/unstressed hacim), dinamik sıvı yanıtlılığı (PPV/SVV) ve kardiyak debi ölçüm ilkeleri.',
    sources: "Guyton & Hall · Klabunde B.4, 8 · Marino's The ICU Book",
    subsections: [
      {
        heading: '4.1. Frank–Starling Yasası, Laplace Duvar Gerilimi ve Kontraktilite',
        paragraphs: [
          'Kardiyak debi (CO = HR × SV ≈ 5 L/dk; kardiyak indeks CI = CO / BSA ≈ 2,5–4,0 L/dk/m^{2}) dört fizyolojik faktörün ürünüdür: kalp hızı, preload, afterload ve kontraktilite. Frank–Starling yasasına göre diyastol sonu lif uzunluğu (preload / sarkomer uzunluğu 1,8 → 2,2 µm) arttıkça miyofilament örtüşmesi ve Troponin C’nin Ca^{2+} duyarlılığı artarak atım hacmi yükselir (uzunluğa bağımlı aktivasyon). Ancak eğrinin düz plato kısmına ulaşıldığında ek sıvı yüklemesi SV’yi artırmaz; yalnızca LVEDP’yi ve pulmoner ödem riskini yükseltir.',
          'Afterload, ventrikülün ejeksiyon sırasında yenmek zorunda olduğu duvar gerilimidir ve Laplace yasasıyla tanımlanır: σ = (P × r) / (2h). Bu nedenle yalnızca sistemik vasküler direnç (SVR) değil, ventrikül yarıçapı (dilate kardiyomiyopatide r ↑ → duvar gerilimi ↑) ve duvar kalınlığı (konsantrik hipertrofide h ↑ → gerilimi normalize eder) de afterload’u belirler. Ayrıca kalp hızının artışıyla hücre içi Ca^{2+} birikerek kontraktiliteyi artırır (Bowditch / Treppe merdiven etkisi); ani afterload artışına karşı birkaç atım içinde oluşan intrinsik inotropi artışı ise Anrep etkisi olarak adlandırılır.',
        ],
        formulas: [
          {
            expression: 'CO = HR × SV   |   σ_{duvar} = (P × r) / (2h)   |   VR = (P_{msf} − RAP) / R_{vr}',
            caption: 'Kardiyak debi, Laplace ventriküler duvar gerilimi (afterload) ve Guyton venöz dönüş denklemi.',
          },
        ],
      },
      {
        heading: '4.2. Guyton Venöz Dönüş Eğrisi, P_{msf} ve Stressed / Unstressed Hacim',
        paragraphs: [
          'Kalp yalnızca kendisine geri dönen kanı pompalayabilir (kararlı durumda CO = VR). Venöz sistemdeki kan iki fonksiyonel havuza ayrılır: damar duvarını germeden lümeni dolduran unstressed hacim (~%70) ve damar duvarını gererek elastik geri basınç yaratan stressed hacim (~%30). Kalp durduğunda tüm dolaşımda dengelenen statik basınca Ortalama Sistemik Dolum Basıncı (P_{msf} ≈ 7–10 mmHg) denir ve bu basıncı belirleyen tek şey stressed hacim ile venöz kompliyanstır (P_{msf} = V_{stressed} / C_{ven}).',
          'Venöz dönüşün itici gradyenti P_{msf} ile sağ atriyum basıncı (RAP/CVP) arasındaki farktır. Venöz dönüş eğrisi ile Frank–Starling kardiyak fonksiyon eğrisinin kesiştiği nokta dolaşımın o anki çalışma noktasını (CO ve CVP) belirler. Propofol veya spinal anestezi venodilatasyon yaparak stressed hacmi unstressed havuza kaydırır, P_{msf}’yi düşürür ve VR eğrisini sola kaydırarak debiyi azaltır. Düşük doz norepinefrin veya fenilefrin ise venöz α_{1} reseptörlerini uyararak unstressed hacmi stressed hacme dönüştürür ("ototransfüzyon"), P_{msf}’yi artırır ve venöz dönüşü hızla toparlar.',
        ],
        diagramId: 'frank-starling-guyton',
      },
      {
        heading: '4.3. Kalp–Akciğer Etkileşimi, Dinamik Sıvı Yanıtlılığı ve Debi Ölçümü',
        paragraphs: [
          'Pozitif basınçlı mekanik ventilasyonda her inspirasyon intratorasik basıncı yükseltir; bu durum sağ ventrikül preload’unu azaltır (RAP ↑ → venöz dönüş gradyenti ↓), sağ ventrikül afterload’unu artırır (transpulmoner basınçla alveoler kapiller sıkışması → PVR ↑) ve sol ventrikül afterload’unu azaltır (LV transmural basınç = P_{LV} − P_{pl} düşer). Sağ ventrikül atım hacmindeki bu inspiratuvar düşüş, ~2–3 saniyelik pulmoner geçiş süresinin ardından ekspirasyon başında sol ventrikül atım hacminde ve arteriyel nabız basıncında düşüş olarak izlenir.',
          'Her iki ventrikül Frank–Starling eğrisinin dik kolundaysa bu döngüsel dalgalanma büyür: Nabız Basıncı Varyasyonu (PPV > %12–13) veya Atım Hacmi Varyasyonu (SVV > %12) hastanın sıvı bolusuna CO/SV ≥ %10–15 artışla yanıt vereceğini yüksek duyarlılıkla öngörür. Statik basınçlar (CVP, PCWP) tek başına sıvı yanıtlılığını öngörmede zayıftır. Kardiyak debi altın standart olarak Fick ilkesi [CO = \\dot{V}O_{2} / (CaO_{2} − C_{\\bar{v}}O_{2})] veya pulmoner arter kateteri / transpulmoner termodilüsyon (Stewart–Hamilton eğrisi) ile ölçülür.',
        ],
        clinicalNote: {
          title: 'PPV ve SVV Güvenilirlik Koşulları (Ne Zaman Yanıltır?)',
          text: 'PPV/SVV yalnızca şu 5 koşul sağlandığında güvenilirdir: (1) Sinüs ritmi (AF veya sık ekstrasistolde geçersiz), (2) Tam kontrollü mekanik ventilasyon (spontan efor yok), (3) Yeterli tidal hacim (V_{T} ≥ 8 mL/kg PBW; düşük V_{T}’de yalancı negatif), (4) Kapalı toraks ve normal karın içi basınç, (5) Sağ ventrikül yetmezliği olmaması (RV yetmezliğinde yüksek PPV yalancı pozitif olabilir!). Bu koşulların bozulduğu durumlarda Pasif Bacak Kaldırma (PLR) testi veya mini sıvı yükleme testi tercih edilir.',
        },
      },
    ],
  },
  {
    id: 'sistemik-hemodinamik-glikokaliks',
    number: 'Bölüm 5',
    title: 'Sistemik Hemodinamikler, Mikrodolaşım ve Revize Starling Prensibi',
    summary:
      'Ohm ve Poiseuille hemodinamik yasaları, SVR ve nabız basıncı, endotelyal glikokaliks ve Revize Starling (Michel–Weinbaum) transvasküler sıvı değişimi modeli, endotel mediyatörleri ve lokal otoregülasyon.',
    sources: "Klabunde B.5–7 · Miller's · Woodcock 2012",
    subsections: [
      {
        heading: '5.1. Ohm Yasası, Poiseuille Direnci ve Nabız Basıncı',
        paragraphs: [
          'Hidrodinamik Ohm yasasına göre akım (CO), basınç gradyentiyle (MAP − CVP) doğru, vasküler dirençle (SVR) ters orantılıdır. Poiseuille yasası (R = 8ηL / πr^{4}) gereği arteriyol yarıçapındaki yalnızca %19’luk bir azalma direnci iki katına çıkarır; hematokrit artışı (polisitemi) ve hipotermi ise kan viskozitesini (η) artırarak direnci yükseltir.',
          'Nabız basıncı (PP = SBP − DBP) esas olarak atım hacminin arteriyel kompliyansa oranıyla belirlenir (PP ≈ SV / C_{art}). Düşük SV (hipovolemi, tamponad, ağır aort darlığı) dar nabız basıncı yaparken; sertleşmiş aort (yaşlanma), aort yetmezliği, yüksek debili durumlar (sepsis, tirotoksikoz) ve vazodilatasyon geniş nabız basıncı oluşturur.',
        ],
        formulas: [
          {
            expression:
              'MAP = DBP + (SBP − DBP) / 3   |   SVR = 80 × (MAP − CVP) / CO   |   PVR = 80 × (mPAP − PCWP) / CO',
            caption:
              'Normal SVR: 800–1.200 dyn·sn·cm^{-5} · Normal PVR: 50–150 dyn·sn·cm^{-5} (80 çarpanı Wood ünitesini dyn·sn·cm^{-5} birimine çevirir).',
          },
        ],
      },
      {
        heading: '5.2. Endotelyal Glikokaliks ve Revize Starling Prensibi (Michel–Weinbaum)',
        paragraphs: [
          'Klasik Starling hipotezi kapillerin arteriyel ucunda filtrasyon, venöz ucunda ise interstisyumdan kana sürekli geri emilim (reabsorpsiyon) olduğunu varsayardı. Ancak modern mikrodolaşım fizyolojisi (Michel–Weinbaum / Revize Starling prensibi), endotel yüzeyini kaplayan proteoglikan ve glikozaminoglikan ağının (Endotelyal Glikokaliks Tabakası — EGL) asıl moleküler elek olduğunu göstermiştir.',
          'Revize denklemde kolloid onkotik basınç farkı plazma (π_{c}) ile tüm interstisyum (π_{i}) arasında değil, plazma ile glikokaliks altındaki proteinden fakir dar boşluk (π_{g}) arasında oluşur. Sonuçta sağlıklı, kesintisiz kapillerlerde kararlı durumda venöz uçta sürekli geri emilim olmaz ("no-absorption rule"): düşük düzeyde net filtrasyon devam eder ve interstisyel sıvının tamamı lenfatik sistemle dolaşıma döndürülür. Yalnızca akut kanama gibi kapiller hidrostatik basıncın (P_{c}) aniden düştüğü durumlarda geçici ototransfüzyon (reabsorpsiyon) görülür.',
        ],
        formulas: [
          {
            expression: 'J_{v} = K_{f} × [(P_{c} − P_{i}) − σ × (π_{c} − π_{g})]',
            caption:
              'Revize Starling Denklemi: K_{f} filtrasyon katsayısı, σ onkotik yansıma katsayısı (sağlam glikokalikste ~0,9; sepsiste düşer), π_{g} subglikokaliks onkotik basıncı.',
          },
        ],
        clinicalNote: {
          title: 'Perioperatif Glikokaliks Hasarı ve Sıvı Tedavisi',
          text: 'Hızlı ve aşırı kristaloid yüklemesi (ANP salınımını tetikler), iskemi–reperfüzyon, sepsis, hiperglisemi ve majör cerrahi travma endotelyal glikokaliksi döker (shedding). Glikokaliks bozulduğunda yansıma katsayısı (σ) düşer, albümin dahil plazma proteinleri interstisyuma kaçar ve kolloid verilmesi bile ödemi engelleyemez; bu nedenle normovolemik hedefe yönelik sıvı yönetimi (GDFT) kritik önem taşır.',
        },
      },
      {
        heading: '5.3. Endotelyal Mediyatörler ve Lokal Kan Akımı Otoregülasyonu',
        paragraphs: [
          'Organlar perfüzyon basıncındaki dalgalanmalara karşı kan akımlarını iki lokal mekanizmayla korur: (1) Miyojenik (Bayliss) mekanizma — transmural basınç arttığında arteriyol düz kası gerilir, gerilme duyarlı Ca^{2+} kanalları açılır ve refleks vazokonstriksiyonla akım sabit tutulur; (2) Metabolik hipotez — doku metabolizması arttığında veya perfüzyon düştüğünde lokal olarak biriken adenozin, H^{+}, CO_{2}, K^{+}, laktat ve düşük PO_{2} güçlü vazodilatasyon yaparak akımı metabolik ihtiyaca (aktif hiperemi) veya iskemi sonrasına (reaktif hiperemi) uyarlar.',
        ],
        table: {
          title: 'Tablo 3 — Başlıca Endotelyal ve Lokal Vazoaktif Mediyatörler',
          headers: ['Mediyatör', 'Etki', 'Sinyal Yolağı ve Klinik Korelasyon'],
          rows: [
            [
              'Nitrik Oksit (NO)',
              'Güçlü Vazodilatatör',
              'L-arjinin → eNOS → cGMP ↑; kayma gerilimiyle salınır. Sepsiste iNOS aşırı üretimi vazopleji yapar (metilen mavisi hedefi).',
            ],
            [
              'Prostasiklin (PGI_{2})',
              'Vazodilatatör & Antiagregan',
              'cAMP ↑; trombosit agregasyonunu inhibe eder (pulmoner HT tedavisinde epoprostenol/iloprost).',
            ],
            [
              'Endotelin-1 (ET-1)',
              'En Güçlü Vazokonstriktör',
              'ET_{A} reseptörü (IP_{3}/Ca^{2+} ↑); hipoksi ve anjiyotensin II ile artar (bosentan hedefi).',
            ],
            [
              'Adenozin / K_{ATP}',
              'Lokal Vazodilatatör',
              'Koroner otoregülasyonun ana metabolik mediyatörü; iskemi/ATP yıkımında hızla koroner arteriyolleri açar.',
            ],
          ],
        },
      },
    ],
  },
  {
    id: 'koroner-ozel-dolasimlar',
    number: 'Bölüm 6',
    title: 'Koroner Dolaşım, Miyokardiyal Oksijen Dengesi ve Özel Organ Perfüzyonları',
    summary:
      'Koroner perfüzyon basıncı (CPP), fazik sol vs. sağ koroner akım, miyokardiyal O_{2} sunum–tüketim dengesi, subendokardiyal iskemi duyarlılığı ile serebral, renal ve hepatik dolaşım otoregülasyonları.',
    sources: "Kaplan's · Miller's · Klabunde B.7 · Barash",
    subsections: [
      {
        heading: '6.1. Koroner Perfüzyon Basıncı (CPP), Fazik Akım ve Oksijen Ekstraksiyonu',
        paragraphs: [
          'Koroner dolaşım istirahatte kardiyak debinin ~%5’ini (~250 mL/dk) alır ancak vücuttaki en yüksek oksijen ekstraksiyon oranına sahiptir (O_{2}ER ≈ %65–75; koroner sinüs PO_{2} ≈ 20 mmHg, SvO_{2} ≈ %25–30). Ekstraksiyon zaten maksimuma yakın olduğundan, artan miyokardiyal oksijen talebini karşılamanın neredeyse tek yolu koroner kan akımını (CBF) metabolik vazodilatasyonla artırmaktır (sağlıklı kalpte koroner akım rezervi 4–5 kattır).',
          'Sol ventrikül sistol sırasında yüksek duvar içi basınç oluşturarak intramiyokardiyal damarları (özellikle subendokardiyumu) sıkıştırdığından, sol koroner arter (LCA) kan akımının ~%75–80’i diyastolde gerçekleşir. Sağ ventrikül sistolik basıncı (~25 mmHg) aort basıncının çok altında kaldığından sağ koroner arter (RCA) hem sistolde hem diyastolde perfüze olur; ancak ağır pulmoner hipertansiyonda RV sistolik basıncı yükselirse RCA akımı da diyastole bağımlı hale gelir ve hızla RV iskemisi gelişir.',
        ],
        formulas: [
          {
            expression: 'Koroner CPP = AoDP − LVEDP   |   Serebral CPP = MAP − ICP (veya CVP)',
            caption: 'Sol ventrikül koroner perfüzyon basıncı (aort diyastolik basıncı − LVEDP) ve serebral perfüzyon basıncı.',
          },
        ],
        diagramId: 'coronary-autoregulation',
      },
      {
        heading: '6.2. Miyokardiyal Oksijen Sunumu (MDO_{2}) ve Tüketimi (MVO_{2}) Dengesi',
        paragraphs: [
          'Perioperatif miyokard iskemisini önlemenin temeli MDO_{2} / MVO_{2} dengesini korumaktır. Bu dengede en tehlikeli tek parametre taşikardidir: kalp hızı arttıkça hem birim zamandaki kasılma sayısı artarak MVO_{2} yükselir, hem de diyastol süresi kısaldığı için sol koroner kan akımı (MDO_{2}) düşer. Buna karşılık yüksek LVEDP (aşırı preload / sol kalp yetmezliği) de çift yönlü zarar verir: duvar gerilimini artırarak tüketimi yükseltirken, CPP = AoDP − LVEDP formülüyle sunumu azaltır.',
        ],
        table: {
          title: 'Tablo 4 — Miyokardiyal Oksijen Sunumu (MDO_{2}) vs. Tüketimi (MVO_{2}) Belirleyicileri',
          headers: ['Sunum (MDO_{2}) Belirleyicileri', 'Tüketim (MVO_{2}) Belirleyicileri', 'İskemik Hastada Anestezi Hedefi'],
          rows: [
            [
              'Diyastolik süre (↓ HR → ↑ sunum)',
              'Kalp hızı (↑ HR → ↑↑ tüketim)',
              'Yavaş–normal sinüs ritmi (55–75/dk; β-bloker)',
            ],
            [
              'Koroner CPP (AoDP − LVEDP)',
              'Sistolik duvar gerilimi (Afterload & Preload)',
              'AoDP’yi koru (bazalin ±%20’si), LVEDP’yi düşük tut',
            ],
            [
              'CaO_{2} (Hb düzeyi, SaO_{2}, P_{50})',
              'Kontraktilite (İnotropik durum)',
              'Anemi ve hipoksemiden kaçın; aşırı sempatik deşarjı önle',
            ],
            [
              'Koroner damar çapı (stenoz, spazm)',
              'Bazal metabolizma (~%20 · elektriksel iş < %1)',
              'Normotermi (titreme MVO_{2}’yi katlar), yeterli analjezi',
            ],
          ],
        },
      },
      {
        heading: '6.3. Serebral, Renal ve Hepatik Özel Dolaşımlar',
        paragraphs: [],
        bullets: [
          {
            label: 'Serebral Dolaşım (~%15 CO · ~50 mL/100g/dk)',
            text: 'MAP 50–150 mmHg (güncel klinik veriler alt sınırın bireysel olarak 60–70 mmHg olabileceğini gösterir) arasında otoregüle olur. PaCO_{2} 20–80 mmHg bandında her 1 mmHg artışla CBF ~%3–4 (1–2 mL/100g/dk) doğrusal artar; PaO_{2} < 50–60 mmHg altına inmeden CBF belirgin değişmez.',
          },
          {
            label: 'Renal Dolaşım (~%20–25 CO · ~1.100 mL/dk)',
            text: 'MAP 80–180 mmHg arasında miyojenik yanıt ve tübüloglomerüler geri bildirimle otoregüle olur. Korteks yüksek akımlı iken dış medulla düşük PO_{2} (~10–20 mmHg) ve yüksek metabolik tüketim nedeniyle perioperatif iskemiye (ATN) en duyarlı bölgedir.',
          },
          {
            label: 'Hepatik Dolaşım (~%25 CO · ~1.500 mL/dk)',
            text: 'Çift kanlanmaya sahiptir: Portal ven kan akımının ~%75’ini ve O_{2}’nin ~%50’sini (otoregülasyonu yok), Hepatik arter akımın ~%25’ini ve O_{2}’nin ~%50’sini sağlar. Portal ven akımı düştüğünde adenozin birikimiyle hepatik arter dilate olur (Hepatik Arteriyel Tampon Yanıtı — HABR); volatil anestezikler ve derin hipotansiyon bu koruyucu yanıtı zayıflatabilir.',
          },
        ],
      },
    ],
  },
  {
    id: 'kan-basinci-kontrolu',
    number: 'Bölüm 7',
    title: 'Kan Basıncının Nöral, Humoral ve Renal Kontrolü',
    summary:
      'Yüksek basınçlı arteriyel baroreseptörler, perioperatif kritik kardiyovasküler refleksler, RAAS–ADH–ANP/BNP hormonal ekseni, basınç–natriürez mekanizması ve akut hemorajiye fizyolojik kompanzasyon.',
    sources: "Guyton & Hall · Klabunde B.6, 9 · Miller's",
    subsections: [
      {
        heading: '7.1. Kısa Süreli Kontrol: Arteriyel Baroreseptörler ve Kritik Refleksler',
        paragraphs: [
          'Saniyeler içinde kan basıncını tamponlayan ana mekanizma karotid sinüs (CN IX — Hering siniri; 60–180 mmHg aralığında hem yükselme hem düşmeye en duyarlı) ve aort arkındaki (CN X; esasen basınç yükselmesine duyarlı) gerilme baroreseptörleridir. Afferent uyarılar medulladaki Nükleus Traktus Solitarius’a (NTS) ulaşır. Basınç yükseldiğinde artan NTS uyarısı nükleus ambiguusu aktive ederek vagal deşarjı artırır (HR ↓) ve kaudal ventrolateral medulla (CVLM) üzerinden rostral ventrolateral medullayı (RVLM) inhibe ederek sempatik çıkışı azaltır (SVR ↓, inotropi ↓). Kronik hipertansiyonda baroreseptörler 1–2 gün içinde yeni yüksek eşiğe adapte olur (resetting).',
        ],
        table: {
          title: 'Tablo 5 — Ameliyathanede Sık Karşılaşılan Kardiyovasküler Refleksler',
          headers: ['Refleks', 'Uyaran ve Afferent', 'Efferent Yanıt', 'Anestezi Klinik Örneği'],
          rows: [
            [
              'Baroreseptör',
              'Arteriyel gerilme ↓ (CN IX/X)',
              'Sempatik ↑ (HR ↑, SVR ↑), Vagal ↓',
              'Volatiller ve propofol bu refleksi küntleştirir',
            ],
            [
              'Bainbridge',
              'Sağ atriyum gerilmesi ↑ (CN X)',
              'SA nod sempatik ↑ → Refleks taşikardi',
              'Hızlı sıvı yüklemesinde HR ↑; tersi (preload ↓) spinalde bradikardi yapar',
            ],
            [
              'Bezold–Jarisch',
              'Boş, hiperkontraktil LV mekanoreseptörü (CN X)',
              'Paradoksal bradikardi + vazodilatasyon + apne',
              'Spinal anestezi, oturur (beach-chair) pozisyon, ağır hipovolemi',
            ],
            [
              'Cushing',
              'Ağır KİBAS → beyin sapı iskemisi',
              'Hipertansiyon (geniş PP) + bradikardi + düzensiz solunum',
              'Herniasyon alarmı; HT’yi agresif düşürmek serebral iskemiyi derinleştirir',
            ],
            [
              'Okülokardiyak',
              'Ekstraoküler kas traksiyonu (CN V_{1})',
              'Güçlü vagal çıkış (CN X) → bradikardi / asistoli',
              'Şaşılık cerrahisi; ilk adım cerrahı durdurmak, gerekirse atropin',
            ],
          ],
        },
      },
      {
        heading: '7.2. Orta ve Uzun Süreli Kontrol: RAAS, ADH, Natriüretik Peptidler ve Hemoraji',
        paragraphs: [
          'Dakikalar–saatler içinde devreye giren Renin–Anjiyotensin–Aldosteron Sistemi (RAAS) üç uyaranla tetiklenir: (1) renal afferent arteriyol perfüzyon basıncı düşüşü, (2) makula densaya ulaşan NaCl azalması ve (3) sempatik β_{1} uyarımı. Pulmoner endoteldeki ACE ile oluşan Anjiyotensin II, AT_{1} reseptörleri üzerinden güçlü arteriyoler vazokonstriksiyon (efferent > afferent arteriyol → GFR korunur), aldosteron salınımı (Na^{+}/su tutulumu, K^{+}/H^{+} atılımı) ve ADH salınımı oluşturur.',
          'Vazopressin (ADH) osmoreseptörlerden (plazma ozmolalitesi > 285 mOsm/kg) veya hacim kaybında (%10 kan hacmi düşüşü) arka hipofizden salınır; toplayıcı kanallarda V_{2} reseptörleriyle akuaporin-2 üzerinden su tutar, vasküler düz kasta V_{1} reseptörleriyle katekolaminlerden bağımsız (asidozda bile etkin) güçlü vazokonstriksiyon yapar. Tersine atriyum ve ventrikül gerilmesiyle salınan ANP ve BNP (cGMP ↑), natriürez, vazodilatasyon ve RAAS inhibisyonu sağlar. Uzun vadede kan basıncını kalıcı biçimde belirleyen nihai mekanizma böbreğin basınç–natriürez eğrisidir.',
        ],
        clinicalNote: {
          title: 'Kronik ACEI / ARB Kullanımı ve İndüksiyonda Refrakter Hipotansiyon',
          text: 'Anestezi indüksiyonu sempatik tonusu baskıladığında kan basıncının sürdürülmesi büyük ölçüde RAAS (Anjiyotensin II) ve vazopressin sistemine dayanır. Ameliyat sabahı ACE inhibitörü veya ARB alan hastalarda bu telafi kolu bloke olduğundan, indüksiyon sonrası katekolaminlere zayıf yanıtlı refrakter hipotansiyon gelişebilir; bu tabloda düşük doz vazopressin (0,5–2 Ü IV bolus) oldukça etkilidir.',
        },
      },
    ],
  },
  {
    id: 'anestezikler-sok-ozeti',
    number: 'Bölüm 8',
    title: 'Anestezik Ajanların, PPV ve Şok Tiplerinin Hemodinamik Özeti',
    summary:
      'İntravenöz ve inhalasyon anesteziklerinin kalp hızı, SVR, venöz dönüş, kontraktilite ve barorefleks üzerine bütüncül karşılaştırması ile 4 temel şok tipinin yatak başı hemodinamik ayırıcı tanısı.',
    sources: "Miller's · Morgan & Mikhail · Barash · Marino's",
    subsections: [
      {
        heading: '8.1. Anestezik Ajanların ve Perioperatif Müdahalelerin Hemodinamik Profili',
        paragraphs: [
          'Anestezi indüksiyonu ve idamesinde gözlenen hipotansiyonun en sık nedeni doğrudan miyokardiyal depresyondan ziyade santral sempatik tonus baskılanmasına bağlı venodilatasyon (stressed hacim ve P_{msf} ↓ → preload ↓) ve arteriyoler vazodilatasyondur (SVR ↓). Ajan seçimi hastanın altta yatan kardiyak rezervine ve kapak/koroner fizyopatolojisine göre bireyselleştirilmelidir.',
        ],
        table: {
          title: 'Tablo 6 — Başlıca Anestezik Ajanların ve Cerrahi Müdahalelerin Kardiyovasküler Etkileri',
          headers: ['Ajan / Müdahale', 'HR', 'MAP / SVR', 'İnotropi', 'Öne Çıkan Fizyolojik Özellik'],
          rows: [
            [
              'Propofol',
              '↔ / ↓',
              '↓↓ / ↓↓',
              '↓',
              'Belirgin venodilatasyon (P_{msf} ↓) + barorefleks baskılanması (refleks taşikardi görülmez)',
            ],
            [
              'Etomidat',
              '↔',
              '↔ / ↔',
              '↔',
              'En stabil indüksiyon profili (barorefleksi korur; tek dozda geçici 11β-hidroksilaz inhibisyonu)',
            ],
            [
              'Ketamin',
              '↑↑',
              '↑↑ / ↑',
              '↑ (direkt ↓)',
              'Santral sempatik artışla MAP/CO ↑; katekolamini tükenmiş ağır şokta direkt miyokard depresyonu ortaya çıkar!',
            ],
            [
              'Opioidler (Fentanil / Remifentanil)',
              '↓ / ↓↓',
              '↔ / ↓',
              '↔',
              'Santral vagal aktivasyonla bradikardi; doğrudan miyokard depresyonu yok (morfin/meperidin histamin salar)',
            ],
            [
              'Deksmedetomidin',
              '↓↓',
              '↑ sonra ↓',
              '↔',
              'Bifazik yanıt: hızlı yüklemede periferik α_{2B} ile geçici HT, ardından santral α_{2A} ile sempatoliz ve bradikardi',
            ],
            [
              'Sevofluran / İzofluran / Desfluran',
              '↔ (Sevo) / ↑ (İzo, Des)',
              '↓↓ / ↓↓',
              '↓',
              'Doza bağımlı SVR düşüşü; hızlı desfluran artışı geçici sempatik taşikardi/HT tetikler',
            ],
            [
              'Pnömoperiton (Laparoskopi > 15 mmHg)',
              '↔ / ↑',
              '↑ / ↑↑',
              '↔',
              'Vena kava kompresyonuyla VR ↓ (CO ↓), aort kompresyonu ve ADH/RAAS ile SVR ↑↑; hızlı insuflasyonda vagal bradikardi',
            ],
          ],
        },
      },
      {
        heading: '8.2. Dört Temel Şok Tipinin Yatak Başı Hemodinamik Ayırıcı Profili',
        paragraphs: [],
        table: {
          title: 'Tablo 7 — Dört Temel Şok Tipinin Yatak Başı Hemodinamik Ayırıcı Tanısı',
          headers: ['Şok Tipi', 'Preload (CVP/PCWP)', 'Kardiyak Debi (CO)', 'Afterload (SVR)', 'SvO_{2} / ScvO_{2}', 'Tipik Klinik Örnek'],
          rows: [
            ['Hipovolemik', '↓↓', '↓↓', '↑↑', '↓ (< %65)', 'Masif cerrahi kanama, travma, ağır dehidratasyon'],
            ['Kardiyojenik', '↑↑', '↓↓', '↑↑', '↓↓ (< %60)', 'Akut MI, akut kapak rüptürü, ağır miyokardit, post-CPB yetmezlik'],
            [
              'Obstrüktif',
              'CVP ↑↑ (PCWP değ.)',
              '↓↓',
              '↑↑',
              '↓',
              'Kardiyak tamponad, tansiyon pnömotoraks, masif PE, ağır Oto-PEEP',
            ],
            [
              'Distribütif',
              '↓ / ↔',
              '↑↑ (erken) / ↓ (geç)',
              '↓↓',
              '↑ (> %75) / ↔',
              'Septik şok, anafilaksi, yüksek spinal / nörojenik şok, vazopleji',
            ],
          ],
        },
      },
    ],
  },
  {
    id: 'kapak-vazoaktif-hiz-kirici',
    number: 'Bölüm 9',
    title: 'Kapak Hastalıkları, Vazopresör/İnotrop, IV Vazodilatatör ve Hız Kırıcı Ajanlar',
    summary:
      'Sol kalp kapak darlık ve yetmezliklerinin (AS, AR, MS, MR ve HOCM) P–V döngüsü imzaları ve hedefleri; vazopresör/inotrop/inodilatör ajanlar ile intraoperatif IV vazodilatatör (tansiyon düşürücü) ve hız kırıcıların sistematik farmakolojisi.',
    sources: "Kaplan's · Miller's · Morgan & Mikhail · Barash · ESC/EACTS",
    subsections: [
      {
        heading: '9.1. Kapak Hastalıklarının Fizyopatolojisi ve Perioperatif Hemodinamik Hedefler',
        paragraphs: [
          'Kapak hastalıklarının perioperatif yönetimi, lezyonun stenotik (darlık) mi yoksa regürjitan (yetmezlik) mi olduğuna göre taban tabana zıt iki fizyolojik prensibe dayanır. Darlıklarda (AS, MS) temel sorun sabit dirençten kanı geçirmek ve sertleşmiş/doluşu kısıtlı ventriküle zaman tanımaktır: bu nedenle hedef yavaş–normal sinüs ritmi (atriyal kick kritik!), yeterli preload ve korunmuş/yüksek SVR’dir. Buna karşılık yetmezliklerde (AR, MR) temel amaç geriye kaçan regürjitan fraksiyonu azaltıp ileri doğru (forward) akımı kolaylaştırmaktır: bu nedenle klasik kural "Hızlı, Dolu ve İleri" (Fast, Full, Forward) — yani hafif hızlı–normal kalp hızı (80–90/dk), yeterli preload ve düşük–normal SVR (afterload azaltımı) prensibidir.',
          'Aort Darlığında (AS) kronik basınç yükü konsantrik sol ventrikül hipertrofisine yol açar; ventrikül duvarı sertleşir (LVEDP ↑) ve subendokardiyum oksijen tüketimi artarken koroner perfüzyon basıncı (AoDP − LVEDP) kritik düzeyde daralır. Mitral Darlıkta (MS) ise dar kapak diyastolik doluşu sınırlar; taşikardi diyastol süresini kısaltarak sol atriyum basıncını (LAP) hızla yükseltir ve ani akut pulmoner ödeme yol açar; ek olarak hipoksi, hiperkapni ve asidozun tetiklediği PVR artışı sağ ventrikül yetmezliğini hızlandırır. Aort Yetmezliğinde (AR) diyastolik kaçış bradikardide artar ve diyastolik aort basıncı düşerek koroner perfüzyonu tehdit eder. Mitral Yetmezlikte (MR) ise yüksek SVR (ör. fenilefrin bolusu veya ağrıya bağlı HT) ileri ejeksiyonu engelleyip kanı düşük basınçlı sol atriyuma geri iter; buna karşın hafif vazodilatasyon ileri debiyi belirgin biçimde artırır.',
        ],
        diagramId: 'valvular-pv-loops',
        table: {
          title: 'Tablo 8 — Kapak Hastalıkları ve HOCM İçin Perioperatif Hemodinamik Hedefler',
          headers: ['Lezyon', 'Preload', 'Kalp Hızı & Ritim', 'Afterload (SVR)', 'İnotropi / PVR', 'Kaçınılması Gerekenler & İlaç Tercihi'],
          rows: [
            [
              'Aort Darlığı (AS · AVA < 1 cm^{2})',
              'Normal – ↑ (Sert LV; hipovolemiye aşırı duyarlı)',
              'Yavaş–Normal (60–75) · Sinüs ritmi HAYATİ!',
              'Normal – ↑↑ (Koroner AoDP’yi koru!)',
              'İnotropiyi koru (Agresif inotropi gereksiz)',
              'Taşikardi, hipotansiyon, AF ve ani spinal bloktan kaçın. İlk tercih vazopresör: Fenilefrin (veya Norepinefrin).',
            ],
            [
              'Aort Yetmezliği (AR)',
              'Normal – ↑ (Geniş LV kompliyansı)',
              'Hızlı–Normal (80–90) (Diyastolik kaçağı azaltır)',
              '↓ – Normal (İleri akımı artırır)',
              'İnotropiyi koru (Kronik AR’de LV yetm. riski)',
              'Bradikardi ve yüksek SVR (fenilefrin bolusu!) kaçağı ağırlaştırır. Tercih: Efedrin, Dobutamin, vazodilatatörler.',
            ],
            [
              'Mitral Darlık (MS · MVA < 1,5 cm^{2})',
              'Normal (Dar pencere! Azı ↓CO, fazlası ödem)',
              'Yavaş (60–70) · Sinüs / Hız kontrollü AF',
              'Normal – ↑ (Sabit CO → SVR koru)',
              'PVR’yi DÜŞÜK tut! (Hipoksi/hiperkapni/asidoz yok)',
              'Taşikardi (akut pulmoner ödem!), sıvı yüklemesi ve PVR artışı. İlk tercih: Fenilefrin veya Vazopressin (PVR’yi artırmaz).',
            ],
            [
              'Mitral Yetmezlik (MR)',
              'Normal – ↑ (Hafif dolgun)',
              'Hızlı–Normal (80–90) (LV genişlemesini önler)',
              '↓↓ – Normal (Afterload ↓ → RF ↓)',
              'İnotropiyi koru / destekle; PVR’yi düşük tut',
              'Yüksek SVR (ağrı, fenilefrin) ve bradikardiden kaçın. Tercih: Dobutamin / Milrinon (inodilatör), düşük doz Efedrin.',
            ],
            [
              'HOCM (Dinamik LVOT Darlığı)',
              '↑↑ (Dolgun LV; kaviteyi açık tut)',
              'Yavaş (55–65) · Sinüs ritmi kritik',
              '↑↑ (Yüksek SVR; LVOT’u geniş tutar)',
              'İnotropiyi AZALT! (β-bloker, volatil yararlı)',
              'Hipovolemi, taşikardi, vazodilatasyon ve inotroplar (dopamin/dobutamin/efedrin) LVOT tıkanmasını ağırlaştırır! İlk tercih: Fenilefrin + Esmolol + Sıvı.',
            ],
          ],
        },
        clinicalNote: {
          title: 'Ağır Aort Darlığında "Ölümcül İskemi Spirali" ve Nöraksiyel Anestezi',
          text: 'Ağır AS’de sistemik hipotansiyon geliştiğinde düşen aort diyastolik basıncı (AoDP), kalınlaşmış sol ventrikülün yüksek LVEDP’sini yenemez ve ani subendokardiyal iskemi başlar. İskemi kontraktiliteyi daha da düşürerek tansiyonu derinleştirir ve CPR’a dirençli (göğüs kompresyonları dar aort kapağından yeterli debi üretemediği için) kardiyak arrest gelişir. Bu nedenle ağır AS’de tek doz hızlı spinal anestezi göreceli kontrendikedir; hipotansiyon geliştiği saniyede refleks taşikardi yapmayan saf α_{1}-agonist fenilefrin (50–100 µg IV) ile AoDP acilen geri kazandırılmalıdır.',
        },
      },
      {
        heading: '9.2. Vazopresör, İnotrop ve İnodilatör Ajanlar: Reseptör Profili ve Hemodinamik Özet',
        paragraphs: [
          'Perioperatif ve yoğun bakım pratiğinde hemodinamik destek ajanları hedefledikleri temel fizyolojik bileşene göre dört grupta ele alınır: (1) Saf vazopresörler (fenilefrin, vazopressin) SVR’yi ve P_{msf}’yi artırır ancak doğrudan inotropik etkileri yoktur; (2) Karma vazopresör–inotroplar (norepinefrin, epinefrin, dopamin, efedrin) α_{1} ile perfüzyon basıncını yükseltirken β_{1} ile kontraktiliteyi destekler; (3) İnodilatörler (dobutamin, milrinon, levosimendan) kontraktiliteyi artırırken aynı anda sistemik ve pulmoner vasküler direnci düşürür; (4) Katekolamin-dışı kurtarıcı vazopresörler (vazopressin, anjiyotensin II, metilen mavisi) ağır asidozda veya adrenerjik reseptör duyarsızlaşmasında (septik/post-CPB vazopleji) etkinliğini korur.',
          'Anestezi pratiğinde pulmoner vasküler direnç (PVR) seçiciliği kritik bir ayrıntıdır: pulmoner arter düz kasında V_{1} reseptör yoğunluğu sistemik yataktan çok daha düşük olduğundan (hatta endotelyal NO salınımı yapabildiğinden) vazopressin, sistemik SVR’yi yükseltirken PVR’yi neredeyse hiç artırmaz (PVR/SVR oranını düşürür). Benzer şekilde milrinon (PDE-3 inhibitörü) ve levosimendan (Ca^{2+} duyarlaştırıcı + K_{ATP} açıcı), β-reseptörlerden bağımsız çalışarak kronik β-bloker kullanan hastalarda bile güçlü inotropi ve pulmoner vazodilatasyon sağlar.',
        ],
        table: {
          title: 'Tablo 9 — Perioperatif Vazopresör, İnotrop ve İnodilatör Ajanlar Özet Tablosu',
          headers: ['Ajan', 'Reseptör / Mekanizma', 'Tipik Doz (Erişkin)', 'HR', 'İnotropi (CO)', 'SVR', 'PVR', 'Temel Klinik Kullanım ve Nüanslar'],
          rows: [
            [
              'Fenilefrin',
              'Saf α_{1}',
              'Bolus: 50–100 µg · İnf: 0,25–2 µg/kg/dk',
              '↓ (Refleks)',
              '↔ / ↓',
              '↑↑↑',
              '↑',
              'Spinal hipotansiyon, AS, HOCM, anestezi vazodilatasyonu. Refleks bradikardi yapar; düşük CO’da afterload artışına dikkat.',
            ],
            [
              'Norepinefrin (Noradrenalin)',
              'α_{1} > β_{1} >> β_{2}',
              'İnf: 0,02–0,5 (maks ~1) µg/kg/dk',
              '↔ / ↑',
              '↑',
              '↑↑↑',
              '↑',
              'Septik, vazoplejik ve çoğu kardiyojenik şokta 1. basamak vazopresör. Venokonstriksiyonla P_{msf} ve venöz dönüşü artırır.',
            ],
            [
              'Vazopressin (Arjinin ADH)',
              'V_{1} (vasküler), V_{2} (renal)',
              'Bolus: 0,5–2 Ü · İnf: 0,01–0,04 Ü/dk',
              '↔ / ↓',
              '↔',
              '↑↑↑',
              '↔ / ↓',
              'Katekolamin-dirençli vazopleji, ACEi/ARB hipotansiyonu, RV yetmezliği + PHT (PVR’yi artırmadan MAP ve RCA akımını korur!).',
            ],
            [
              'Epinefrin (Adrenalin)',
              'Düşük: β_{1}, β_{2} · Yüksek: α_{1} baskın',
              'İnf: 0,01–0,3 µg/kg/dk · Anafilaksi: 0,3–0,5 mg IM',
              '↑↑',
              '↑↑↑',
              '↓ (düşük) / ↑↑ (yüksek)',
              '↑',
              'Anafilaksi, kardiyak arrest, post-CPB ağır pompa yetmezliği, refrakter bradikardi. Laktat ↑ (β_{2} glikojenoliz), hiperglisemi, aritmi riski.',
            ],
            [
              'Efedrin',
              'İndirekt (NE salımı) + Direkt α, β_{1}, β_{2}',
              'Bolus: 5–10 mg IV',
              '↑↑',
              '↑',
              '↑',
              '↑',
              'Hipotansiyon + bradikardi birlikteliği, obstetrik anestezi. Tekrar dozlarda katekolamin tükenmesine bağlı taşifilaksi gelişir.',
            ],
            [
              'Dobutamin',
              'β_{1} >> β_{2} > α_{1}',
              'İnf: 2–20 µg/kg/dk',
              '↑↑',
              '↑↑↑',
              '↓',
              '↓',
              'Düşük debili kardiyojenik şok, sepsis ilişkili kardiyomiyopati, MR/AR. Taşikardi ve MVO_{2} ↑ ile iskemi/aritmi tetikleyebilir; hipotansiyon yapabilir.',
            ],
            [
              'Milrinon',
              'PDE-3 İnhibitörü (cAMP ↑ · β-bağımsız)',
              'Yük: 25–50 µg/kg (ops.) · İnf: 0,25–0,75 µg/kg/dk',
              '↑',
              '↑↑',
              '↓↓',
              '↓↓',
              'Güçlü inodilatör + pozitif lusitropi. RV yetmezliği, PHT ve kronik β-bloker kullananlarda ideal. Böbrekten atılır; sıkça NE/Vazopressin eşlik eder.',
            ],
            [
              'Levosimendan',
              'Troponin C Ca^{2+} duyarlaştırıcı + K_{ATP} açıcı',
              'İnf: 0,05–0,2 µg/kg/dk (24 saat; yükleme ops.)',
              '↔ / ↑',
              '↑↑',
              '↓↓',
              '↓↓',
              'Hücre içi Ca^{2+}’yı artırmadan kontraktiliteyi yükseltir (MVO_{2} artışı minimal). Aktif metaboliti (OR-1896) sayesinde etkisi 7–9 gün sürer.',
            ],
            [
              'Dopamin',
              'D_{1} (1–3) · β_{1} (3–10) · α_{1} (> 10 µg/kg/dk)',
              'İnf: 2–20 µg/kg/dk',
              '↑↑',
              '↑↑',
              '↑ (> 10)',
              '↑',
              'Semptomatik bradikardide geçici seçenek. Şokta NE’ye göre daha yüksek aritmi ve mortalite (SOAP II) nedeniyle rutin ilk tercih değildir; "renal doz" koruyucu değildir.',
            ],
          ],
        },
        clinicalNote: {
          title: 'Sağ Ventrikül Yetmezliği ve Vazoplejik Sendromda Ajan Kombinasyonu',
          text: 'Akut sağ ventrikül yetmezliği ve pulmoner hipertansiyonda hedef PVR’yi düşürmek, RV kontraktilitesini artırmak ve RCA perfüzyonu için sistemik MAP > mPAP tutmaktır: ideal kombinasyon bir inodilatör (milrinon veya dobutamin / inhale NO–iloprost) + PVR’yi artırmayan sistemik vazopresör (vazopressin ve/veya düşük-orta doz norepinefrin) şeklindedir. Kardiyopulmoner baypas sonrası veya septik refrakter vazoplejide (yüksek doz NE + Vazopressin yanıtsız) aşırı NO–cGMP yolağını bloke etmek için metilen mavisi (1,5–2 mg/kg IV, 15–20 dk infüzyon; SSRI kullananlarda serotonin sendromu ve G6PD eksikliğine dikkat) kurtarıcı seçenek olarak kullanılır.',
        },
      },
      {
        heading: '9.3. İntraoperatif IV Vazodilatatörler (Tansiyon Düşürücüler) ve Hız Kırıcı Ajanlar',
        paragraphs: [
          'Vazoaktif farmakoloji yalnızca vazopresörleri değil, vasküler düz kası gevşeterek preload ve afterload’u (SVR) kontrollü biçimde düşüren IV vazodilatatörleri de doğrudan kapsar. İntraoperatif hız kırıcı ajanlar (negatif kronotrop ve dromotroplar) ise miyokardiyal oksijen dengesinin (MDO_{2}/MVO_{2}), entübasyon/cerrahi sempatik yanıtın, aort diseksiyonunda sol ventrikül dP/dt gücünün ve darlık/HOCM gibi kapak patolojilerinin yönetiminde vazopresörler kadar merkezi rol oynar.',
          'İntraoperatif hipertansiyon veya taşikardi yönetiminde farmakolojik müdahale öncesinde mutlaka yetersiz anestezi derinliği, ağrı, hipoksi, hiperkapni, mesane distansiyonu veya turnike ağrısı gibi primer nedenler dışlanmalıdır. Ajan seçiminde vasküler yatak seçiciliği (venöz vs. arteriyel), refleks taşikardi riski, kafa içi basınç (KİB) ve hipoksik pulmoner vazokonstriksiyon (HPV) üzerindeki etkiler ile etki süresinin titre edilebilirliği belirleyicidir.',
        ],
        tables: [
          {
            title: 'Tablo 10 — İntraoperatif IV Vazodilatatörler (Tansiyon Düşürücü Vazoaktif Ajanlar)',
            headers: ['Ajan', 'Vasküler Seçicilik & Mekanizma', 'Tipik IV Doz (Erişkin)', 'Başlangıç / Süre', 'Temel Klinik Kullanım ve Anestezi Nüansları'],
            rows: [
              [
                'Nitrogliserin (GTN)',
                'Venöz >> Arteriyel · NO donörü → cGMP ↑ (Düşük doz preload ↓, yüksek doz SVR ↓)',
                'İnf: 5–200 µg/dk (0,1–3 µg/kg/dk) · Uterin relaks: 50–100 µg',
                '1–2 dk / 3–5 dk',
                'Miyokard iskemisi, akut pulmoner ödem, intraoperatif HT, koroner spazm. HPV’yi inhibe eder, KİB’i artırabilir, >24 sa taşiflaksi; PDE-5 inhibitörü (sildenafil vb.) ile kesin kontrendike.',
              ],
              [
                'Sodyum Nitroprussid (SNP)',
                'Arteriyel ≈ Venöz (Dengeli) · Doğrudan NO salımı → cGMP ↑',
                'İnf: 0,25–5 µg/kg/dk (Maks 10 µg/kg/dk, kısa süre)',
                '< 1 dk / 2–5 dk',
                'Ağır hipertansif kriz, aort diseksiyonu (β-bloker sonrası!), kontrollü hipotansiyon. Refleks taşikardi, koroner çalma, KİB ↑, HPV ↓; siyanür (laktik asidoz, SvO_{2} ↑, taşiflaksi) ve tiyosiyanat toksisitesi; ışıktan korunmalı.',
              ],
              [
                'Nikardipin',
                'Saf Arteriyel (SVR ↓↓) · DHP L-tipi Ca^{2+} kanal blokeri (venöz etki yok)',
                'İnf: 5 mg/saat başla (Maks 15 mg/saat) · Bolus: 0,2–0,5 mg',
                '2–5 dk / 30–60 dk',
                'Nöroanestezi (KİB’i minimal etkiler), kardiyak/vasküler cerrahi, AR/MR afterload azaltımı, preeklampsi. Hafif refleks taşikardi; kesildikten sonra etkisi SNP/klevidipinden daha geç sonlanır.',
              ],
              [
                'Klevidipin (Textbook / ABD–AB)',
                'Saf Arteriyel (SVR ↓↓) · Ultra-kısa etkili DHP Ca^{2+} kanal blokeri',
                'İnf: 1–2 mg/saat başla (2 dk’da bir 2×; maks 16–32 mg/saat)',
                '1–2 dk / 5–15 dk (t_{1/2} ≈ 1 dk)',
                'Kan/doku esterazlarıyla yıkılır (böbrek/karaciğerden bağımsız). Kardiyak cerrahi ve nöroanestezide ideal titrasyon. Lipid emülsiyonu formundadır (yumurta/soya alerjisi, hipertrigliseridemiye dikkat).',
              ],
              [
                'Urapidil (Avrupa / ESAIC)',
                'Arteriyel > Venöz · Periferik α_{1}-bloker + santral 5-HT_{1A} agonisti',
                'Bolus: 10–25 mg IV · İnf: 5–40 mg/saat',
                '2–5 dk / 1–2 saat',
                'Refleks taşikardi yapmaz, KİB’i artırmaz. Nöroanestezi, vasküler cerrahi ve feokromositomada güvenli seçenek.',
              ],
              [
                'Hidralazin',
                'Saf Arteriyel · Doğrudan arteriyoler düz kas gevşemesi',
                'Bolus: 5–20 mg IV (20–30 dk ara ile)',
                '10–20 dk / 2–6 saat',
                'Gebelik hipertansiyonu / preeklampsi. Geç başlangıç ve uzun etki nedeniyle intraoperatif ince titrasyona uygun değildir; belirgin refleks taşikardi yapar.',
              ],
              [
                'Magnezyum Sülfat (MgSO_{4})',
                'Arteriyel + Sempatolitik · Fizyolojik Ca^{2+} antagonisti, katekolamin salımı ↓',
                'Yük: 30–50 mg/kg IV (15–30 dk’da) · İnf: 1–2 g/saat',
                '2–5 dk / 30–60 dk',
                'Preeklampsi/eklampsi, feokromositoma, entübasyon yanıtını baskılama, Torsades de Pointes. Non-depolarizan NMB etkisini ciddi oranda potansiyalize eder (TOF takibi şart).',
              ],
            ],
          },
          {
            title: 'Tablo 11 — İntraoperatif IV Hız Kırıcılar (Negatif Kronotrop / Dromotrop) ve Kombine Ajanlar',
            headers: ['Ajan', 'Mekanizma / Reseptör', 'Tipik IV Doz (Erişkin)', 'Başlangıç / Süre', 'Temel Klinik Kullanım ve Anestezi Nüansları'],
            rows: [
              [
                'Esmolol',
                'Kardiyoselektif β_{1}-bloker · Ultra-kısa etkili (eritrosit esterazları)',
                'Bolus: 0,5 mg/kg (10–50 mg IV) · İnf: 50–300 µg/kg/dk',
                '1–2 dk / 10–20 dk (t_{1/2} ≈ 9 dk)',
                'Ameliyathanede hız kontrolünün altın standardı. Laringoskopi/ekstübasyon yanıtı, HOCM, AS/MS taşikardisi, aort diseksiyonu, tiroid fırtınası. Organ yetmezliğinden bağımsız; kesilince hızla geri döner.',
              ],
              [
                'Labetalol (Textbook / Yurt dışı)',
                'Kombine β (non-selektif) + α_{1}-bloker (IV β:α ≈ 7:1)',
                'Bolus: 5–20 mg IV (5–10 dk ara; maks 300 mg) · İnf: 0,5–2 mg/dk',
                '2–5 dk / 2–4 saat',
                'Refleks taşikardi olmadan hem MAP hem HR düşürür; serebral otoregülasyonu ve KİB’i korur (nöroanestezi, aort diseksiyonu, preeklampsi). Ağır astım/KOAH ve bradikardide kaçın.',
              ],
              [
                'Metoprolol',
                'Kardiyoselektif β_{1}-bloker',
                'Bolus: 1–5 mg yavaş IV (5 dk ara; maks 15 mg)',
                '2–5 dk / 3–6 saat',
                'İntraoperatif sinüs taşikardisi, hızlı ventrikül yanıtlı AF, perioperatif miyokard iskemisi. Yarı ömrü uzundur; hipotansiyon gelişirse esmolol gibi hızlı geri dönmez.',
              ],
              [
                'Diltiazem (ve Verapamil)',
                'Non-DHP Ca^{2+} kanal blokeri · SA/AV nod Faz 0–4 (I_{Ca-L}) baskılanması + SVR ↓',
                'Bolus: 0,25 mg/kg (~15–20 mg, 2 dk’da) · İnf: 5–15 mg/saat',
                '2–5 dk / 1–3 saat',
                'β-bloker kontrendike (ağır bronkospazm) hastalarda hızlı yanıtlı AF/SVT hız kontrolü, koroner vazospazm. Negatif inotropi (HFrEF ve WPW + AF’de kontrendike!), volatillerle additif hipotansiyon/AV blok.',
              ],
              [
                'Adenozin',
                'A_{1}-reseptör agonisti · I_{K(ACh)} ↑, cAMP ↓ → Geçici tam AV blok',
                '6 mg çok hızlı IV puşe + SF flaş → gerekirse 12 mg',
                '10–20 sn / < 30 sn (t_{1/2} < 10 sn)',
                'Düzenli dar QRS SVT (AVNRT/AVRT) sonlandırma. Kısa asistoli, göğüs sıkışması ve bronkospazm yapabilir; dipiridamol etkisini artırır, teofilin/kafein antagonize eder.',
              ],
              [
                'Amiodaron',
                'Sınıf III (I_{Kr} blokajı + zayıf Na^{+}, Ca^{2+}, β blokajı)',
                'Yük: 150 mg IV (10 dk) · İdame: 1 mg/dk (6 sa) → 0,5 mg/dk',
                '10–20 dk / Çok uzun',
                'Düşük EF’li / hemodinamik olarak kırılgan hastalarda hızlı AF hız-ritim kontrolü ve VT/VF (en az negatif inotropik antiaritmik). Çözücüsü (polisorbat 80) hızlı verilirse vazodilatasyon/hipotansiyon yapar.',
              ],
            ],
          },
        ],
        clinicalNote: {
          title: 'Kritik Sıralama Kuralları (Aort Diseksiyonu vs. Feokromositoma) ve Türkiye Pratiği',
          text: '1. Aort Diseksiyonu (Önce β-Bloker, Sonra Vazodilatatör): Önce mutlaka esmolol (veya labetalol) ile kalp hızı (< 60/dk) ve sol ventrikül dP/dt yırtıcı gücü düşürülür; vazodilatatör (nikardipin/SNP) ancak ondan sonra eklenir. Önce vazodilatatör verilirse oluşan refleks taşikardi ve dP/dt artışı intimal yırtığı büyütür. 2. Feokromositoma (Önce α-Bloker/Vazodilatatör, Sonra β-Bloker): Tam tersi geçerlidir — önce α-blokaj veya doğrudan vazodilatatör (fentolamin, nikardipin, urapidil, MgSO_{4}), β-bloker mutlaka sonra verilir; izole β-blokaj, β_{2}-aracılı vazodilatasyonu kapatıp karşılanmamış α_{1} vazokonstriksiyonu ile hipertansif kriz ve akut kalp yetmezliği tetikler. 3. Türkiye Ameliyathane Pratiği: Rutin erişimi en yüksek IV ajanlar nitrogliserin (Perlinganit), esmolol (Brevibloc), metoprolol (Beloc), diltiazem (Diltizem), amiodaron, adenozin ve magnezyum sülfattır; labetalol, klevidipin ve çoğu merkezde nikardipin/urapidil bulunmasa da uzmanlık sınavı ve uluslararası kılavuz standardı için bilinmesi gerekir.',
        },
      },
    ],
  },
];

export const CARDIOVASCULAR_TEXTBOOK_REFERENCES = [
  {
    authors: 'Klabunde RE.',
    title: 'Cardiovascular Physiology Concepts.',
    detail:
      '3rd ed. Wolters Kluwer; 2021. (Bölüm 1–9: Elektrofizyoloji, Kardiyak Fonksiyon, Hemodinamik, Mikrodolaşım, Özel Dolaşımlar ve Nörohumoral Kontrol).',
  },
  {
    authors: 'Hall JE, Hall ME.',
    title: 'Guyton and Hall Textbook of Medical Physiology.',
    detail: '14th ed. Elsevier; 2021. (Ünite III–IV: Kalp Kası, Kardiyak Debi, Venöz Dönüş ve Dolaşım Kontrolü).',
  },
  {
    authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP.',
    title: "Miller's Anesthesia.",
    detail:
      '9th/10th ed. Elsevier. (Cardiac Physiology, Cardiovascular Pharmacology, Antihypertensive/Antiarrhythmic Drugs, Valvular Heart Disease & Hemodynamic Monitoring).',
  },
  {
    authors: 'Butterworth JF, Mackey DC, Wasnick JD.',
    title: "Morgan & Mikhail's Clinical Anesthesiology.",
    detail:
      '7th ed. McGraw-Hill; 2022. (Cardiovascular Physiology, Adrenergic Agonists/Antagonists, Hypotensive Agents & Anesthesia for Patients with Cardiovascular Disease).',
  },
  {
    authors: 'Kaplan JA, Cronin B, Maus TM.',
    title: "Kaplan's Cardiac Anesthesia.",
    detail:
      '8th ed. Elsevier; 2023. (Cardiac Physiology, Coronary Circulation, Valvular Heart Disease, Vasodilators & Inotropic/Vasoactive Therapy).',
  },
  {
    authors: 'Cullen BF, Stock MC, Ortega R, et al.',
    title: "Barash, Cullen, and Stoelting's Clinical Anesthesia.",
    detail: '9th ed. Wolters Kluwer; 2023. (Cardiovascular Anatomy, Physiology & Perioperative Hemodynamics).',
  },
  {
    authors: 'Marino PL.',
    title: "Marino's The ICU Book.",
    detail: '5th ed. Wolters Kluwer; 2024. (Hemodynamic Profiles, Fluid Responsiveness, Shock & Vasoactive Drugs).',
  },
  {
    authors: 'Woodcock TE, Woodcock TM.',
    title:
      'Revised Starling equation and the glycocalyx model of transvascular fluid exchange: an improved paradigm for prescribing intravenous fluid therapy.',
    detail: 'Br J Anaesth. 2012;108(3):384–394.',
  },
  {
    authors: 'Vahanian A, Beyersdorf F, Praz F, et al. / Halvorsen S, Mehilli J, Cassese S, et al.',
    title:
      'ESC/EACTS Guidelines for the management of valvular heart disease & 2022 ESC Guidelines on cardiovascular assessment and management of patients undergoing non-cardiac surgery.',
    detail: 'Eur Heart J. 2022;43(39):3826–3924.',
  },
];
