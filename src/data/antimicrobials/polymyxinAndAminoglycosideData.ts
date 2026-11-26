import type { AntimicrobialMonographData } from './types';

export const POLYMYXIN_AMINOGLYCOSIDE_ANTIMICROBIALS: AntimicrobialMonographData[] = [
  // ============================================================================
  // 1. POLİMİKSİN B (POLYMYXIN B)
  // ============================================================================
  {
    id: 'polymyxin-b',
    classTag: 'polymyxin',
    accentColor: 'rose',
    atcCode: 'J01XB02',
    classLabel: 'Katyonik Lipopeptid / Polimiksin (Aktif İlaç — YBÜ MDR Gram-Negatif Kurtarma)',
    tradeNamesTr: 'Polimiksin B Sülfat 500.000 IU (50 mg) liyofilize flakon (hastane / yurt dışı temin; 1 mg = 10.000 IU)',
    title: 'Polimiksin B (Polymyxin B) — Aktif Form, Renal Ayar Gerektirmeyen MDR YBÜ Monografisi',
    cardTitle: 'Polimiksin B (IV)',
    cardBadge: '2019 Consensus • Renal Ayar YOK',
    cardCategoryLabel: 'Polimiksin • Aktif İlaç',
    cardShortDesc:
      'Kolistinin aksine doğrudan AKTİF ilaçtır ve non-renal temizlenir → böbrek yetmezliğinde/CRRT’de doz ayarı GEREKMEZ! Sistemik MDR Acinetobacter/CRE’de tercih edilir; ancak ÜSE’de KULLANILMAZ.',
    cardHighlights: [
      {
        label: 'YBÜ Yükleme & İdame',
        value: '2,0–2,5 → 1,25–1,5 mg/kg',
        subtext: '20–25k → 12,5–15k IU/kg q12sa',
        tooltip: '1 mg = 10.000 IU; 1 saatte yavaş IV infüzyon (D5W)',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Böbrek / CRRT Kuralı',
        value: 'DOZ AYARI YOK!',
        subtext: 'Non-renal klirens (<%4 idrar)',
        tooltip: '2019 International Consensus: CrCl düşüklüğünde, HD veya CRRT’de doz azaltılmaz!',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'ÜSE Tuzağı & Renal Profil',
        value: 'ÜSE’de TERCİH ETME!',
        subtext: 'Nefrotoksisite %20–40 (<Kolistin)',
        tooltip: 'İdrara geçişi çok düşük olduğundan ÜSE’de Kolistin (CMS) seçilir',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Anestezi / NMB Riski',
        value: 'NMB & Apne Riski!',
        subtext: 'NDMB potansiyalizasyonu • MG!',
        tooltip: 'Nöromüsküler blokaj ve solunum paralizisi; deri hiperpigmentasyonu',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
    ],
    aliases: ['Polymyxin B', 'Polimiksin B', 'Poly-B', 'Polimiksin B Sülfat'],
    searchKeywords: [
      'polimiksin b',
      'polymyxin b',
      '500000 iu',
      '50 mg',
      'mdr',
      'acinetobacter',
      'cre',
      'dtr pseudomonas',
      'non-renal',
      'nefrotoksisite',
      'nöromüsküler blokaj',
      'hiperpigmentasyon',
      'tsuji 2019',
    ],
    highAlert: {
      tallManName: 'POLİMİKSİN B (polyMYXIN B)',
      confusionRiskWith:
        'Kolistin / Kolistimetat Sodyum (Polimiksin E — tamamen farklı birim [CBA/MIU], farklı renal dozaj ve ön-ilaç kinetiği!). 1 mg Polimiksin B = 10.000 IU (50 mg = 500.000 IU)!',
      criticalAlerts: [
        'BÖBREK YETMEZLİĞİNDE / CRRT’DE DOZ AZALTMA HATASI: Polimiksin B böbrek dışı (non-renal) mekanizmalarla temizlenir — 2019 Uluslararası Konsensüsü (Tsuji et al.) ABH, KBY, HD veya CRRT’de DOZ AZALTILMAMASINI önerir (azaltmak tedavi başarısızlığı ve sepsis ölümü yapar)!',
        'ÜRİNER SİSTEM ENFEKSİYONLARINDA (ÜSE) KULLANMA: İdrara aktif geçişi <%4’tür; CRE/MDR ÜSE’de klinik olarak etkisiz kalır — ÜSE’de Kolistin (CMS) tercih edilir!',
        'NÖROMÜSKÜLER BLOKAJ & APNE (ANESTEZİ ALARMI!): Presinaptik ACh salınımını bloke ederek Rokuronyum/Vekuronyum gibi NDMB’lerin etkisini tehlikeli biçimde uzatır ve Myastenia Gravis’te ani solunum paralizisi/apne yapar!',
        '1 mg = 10.000 IU DÖNÜŞÜM HATASI: 1 flakon 500.000 IU = 50 mg’dır; yükleme 2,0–2,5 mg/kg (20.000–25.000 IU/kg) ve idame 1,25–1,5 mg/kg (12.500–15.000 IU/kg) q12sa olarak çift doğrulanmalıdır; >3 mg/kg/gün aşımı şiddetli nefrotoksisite yapar!',
      ],
      antidoteOrRescue:
        'Spesifik kimyasal antidot yoktur. Nöromüsküler blokaj ve solunum paralizisinde derhal hava yolu güvencesi + mekanik ventilasyon sağlanır; Neostigmin etkisiz/zayıf kalabilir, IV Kalsiyum Glukonat (%10, 1–2 g yavaş IV) presinaptik blokajı kısmen antagonize edebilir. Hemodiyaliz polimiksin B’yi anlamlı olarak temizlemez.',
    },
    identitySummary:
      'Polimiksin B, Bacillus polymyxa’dan türetilen, doğrudan AKTİF formda uygulanan katyonik siklik lipopeptid antibiyotiktir. 2019 Uluslararası Polimiksin Konsensüs Kılavuzu (Tsuji et al., Pharmacotherapy), karbapenem-dirençli Acinetobacter baumannii (CRAB), karbapenem-dirençli Enterobacterales (CRE) ve zor-tedavi edilen Pseudomonas aeruginosa (DTR-PA) kaynaklı sistemik YBÜ enfeksiyonlarında (ÜSE hariç) daha öngörülebilir farmakokinetiği, hızlı kararlı duruma ulaşması ve Kolistin’e göre daha düşük nefrotoksisitesi (%20–40 vs %40–60) nedeniyle Polimiksin B’yi tercih edilen polimiksin olarak önerir.',
    spectrumHighlights: [
      {
        title: 'MDR / XDR Gram-Negatif Kurtarma Spektrumu',
        detail:
          'Karbapenem-dirençli Acinetobacter baumannii (CRAB), karbapenem-dirençli Klebsiella pneumoniae / E. coli (CRE — KPC, NDM, OXA-48 dahil), MDR/DTR Pseudomonas aeruginosa, Stenotrophomonas maltophilia (değişken).',
        tone: 'emerald',
      },
      {
        title: 'Anatomik Kör Nokta & Monoterapi Riski',
        detail:
          'Üriner sistem enfeksiyonlarında idrar konsantrasyonu çok düşük olduğundan ETKİSİZDİR (ÜSE’de Kolistin/CMS seç!). Akciğer ELF geçişi sınırlıdır ve monoterapide heterodirenç gelişebilir → ağır CRAB/CRE enfeksiyonlarında kombinasyon (örn. yüksek doz sulbaktam, meropenem, tigesiklin veya seftazidim-avibaktam) önerilir.',
        tone: 'amber',
      },
      {
        title: 'Doğal Dirençli Bakteriler (ASLA Etkili Değil!)',
        detail:
          'Proteus spp., Providencia spp., Morganella morganii, Serratia marcescens, Burkholderia cepacia, Neisseria spp., tüm Gram-pozitif bakteriler (MRSA/Enterokok) ve tüm anaeroblar DOĞAL DİRENÇLİDİR!',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Pozitif yüklü (katyonik) polimiksin B molekülü, Gram-negatif bakterilerin dış membranındaki negatif yüklü lipopolisakkarit (LPS — Lipid A) fosfat gruplarına elektrostatik olarak bağlanır; membranı stabilize eden Mg²⁺ ve Ca²⁺ katyonlarını yerinden sökerek dış ve iç sitoplazmik membranı deterjan benzeri etkiyle parçalar ve hızlı hücre lizisine (hücre içeriği sızıntısına) yol açar.',
    mechanismPillars: [
      {
        title: 'LPS (Lipid A) Elektrostatik Bağlanma & Deterjan Lizisi',
        detail:
          'Dış membrandaki iki değerlikli katyonları (Ca²⁺/Mg²⁺) uzaklaştırarak membran bütünlüğünü saniyeler-dakikalar içinde bozar; aynı zamanda endotoksini (LPS) doğrudan bağlayarak nötralize etme özelliği vardır.',
      },
      {
        title: 'Aktif İlaç Avantajı & Non-Renal Klirens',
        detail:
          'Kolistin (CMS) gibi ön-ilaç hidrolizine bağımlı olmadığından yükleme dozuyla hemen öngörülebilir plazma konsantrasyonuna ulaşır. Tübüler geri emilim çok yüksek olduğundan (<%4 idrar atılımı) renal fonksiyondan bağımsız sabit mg/kg dozlama yapılır.',
      },
      {
        title: 'Nöromüsküler Kavşak & Megalin Tübüler Toksisitesi',
        detail:
          'Proksimal tübülde megalin aracılı yoğun geri emilim nefrotoksisiteye (%20–40); nöronal membran lipitleriyle etkileşim ve presinaptik Ca²⁺/ACh inhibisyonu ise parestezi, ataksi ve nöromüsküler blokaja/apneye neden olur.',
      },
    ],
    pkCards: [
      {
        label: 'Aktif Form / Dönüşüm',
        value: '%100 Aktif İlaç',
        detail: 'Ön-ilaç değildir (Kolistin/CMS’nin aksine); 1 mg = 10.000 IU (1 flakon 500.000 IU = 50 mg).',
      },
      {
        label: 'Eliminasyon Yarı Ömrü (t½)',
        value: '9–11,5 saat',
        detail: 'Böbrek fonksiyonundan büyük ölçüde bağımsızdır; q12sa sabit idame uygundur.',
      },
      {
        label: 'Renal Atılım',
        value: '< %4 (Non-Renal Klirens)',
        detail: 'Proksimal tübülden >%90 geri emilip doku/proteolitik yollarla temizlenir → ÜSE’de etkisiz, KBY/CRRT’de doz ayarı yok!',
      },
      {
        label: 'Protein Bağlanması',
        value: '%58–90',
        detail: 'Kritik hastalarda (özellikle α₁-asit glikoprotein artışında) bağlanma artabilir.',
      },
      {
        label: 'PK/PD Hedefi (2019)',
        value: 'AUCss,24h 50–100 mg·sa/L',
        detail: 'Hedef ortalama kararlı durum plazma düzeyi Css,avg ~2–4 mg/L (AUC >100 nefrotoksisiteyi fırlatır!).',
      },
      {
        label: 'İnfüzyon Süresi & Sıvısı',
        value: '1 saat • %5 Dekstroz',
        detail: '300–500 mL (veya sıvı kısıtlamasında 100–250 mL) %5 Dekstroz içinde 1–2 saatte yavaş infüzyon.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Polimiksinlere (Polimiksin B veya Kolistin) karşı belgelenmiş aşırı duyarlılık / anafilaksi.',
      ],
      relativeItems: [
        'Üriner sistem enfeksiyonları (alt/üst ÜSE) — idrara geçişi çok düşük olduğundan tercih edilmez (Kolistin/CMS seçilmelidir).',
        'Myastenia Gravis veya eşzamanlı non-depolarizan nöromüsküler bloker (NDMB) / yüksek doz MgSO₄ kullanımı — ağır solunum paralizisi ve uzamış nöromüsküler blok riski!',
        'Mevcut ağır böbrek hasarı veya eşzamanlı diğer nefrotoksikler (vankomisin, aminoglikozid, loop diüretik, kontrast) — zorunlu kurtarma kullanımında yakın kreatinin/idrar izlemi şarttır (doz azaltılmaz, ancak günlük >3 mg/kg aşılmaz!).',
        'IM uygulama — şiddetli enjeksiyon ağrısı nedeniyle erişkinde önerilmez.',
      ],
      clinicalNote:
        'Yeni nesil β-laktam/β-laktamaz inhibitörleri (örn. Seftazidim-Avibaktam, Seftolozan-Tazobaktam, Sefiderokol) duyarlıysa polimiksinlere göre daha yüksek sağkalım ve çok daha düşük nefrotoksisite sunduğundan ilk tercihtir; Polimiksin B esas olarak CRAB ve β-laktam dirençli kurtarma senaryolarında kullanılır.',
    },
    regimenCards: [
      {
        title: 'YBÜ MDR Acinetobacter / CRE / DTR P. aeruginosa (2019 Uluslararası Konsensüs)',
        setting: 'icu',
        badge: 'Tsuji et al. 2019',
        dose: 'Yükleme: 2,0–2,5 mg/kg (20.000–25.000 IU/kg) → İdame: 1,25–1,5 mg/kg (12.500–15.000 IU/kg)',
        infusionDuration: '1 saat (100–500 mL %5 Dekstroz içinde; hızlı verme!)',
        interval: 'Yüklemeden 12 saat sonra q12sa (toplam 2,5–3,0 mg/kg/gün)',
        note: 'Böbrek yetmezliğinde, hemodiyalizde veya CRRT’de DOZ AZALTILMAZ! Günlük 3 mg/kg (30.000 IU/kg) üzeri dozlar nefrotoksisiteyi keskin artırır. Ağır enfeksiyonlarda kombine rejim önerilir.',
      },
      {
        title: 'MDR Gram-Negatif Ventrikülit / Menenjit (İntratekal / İntraventriküler Adjuvan)',
        setting: 'special',
        badge: 'IDSA Ventrikülit Kılavuzu',
        dose: '5 mg (50.000 IU) günde 1 kez (3–4 gün) → ardından gün aşırı (q48sa)',
        infusionDuration: 'Prezervatifsiz steril %0,9 NaCl içinde yavaş IT/IVT enjeksiyon (EVD 1 saat klemplenir)',
        interval: 'q24sa × 3–4 gün → q48sa (sistemik IV tedaviye EK olarak)',
        note: 'Sistemik Polimiksin B’nin BOS geçişi çok zayıftır; MDR Acinetobacter/CRE ventrikülitinde IV tedaviye ek olarak IT/IVT verilir (kimyasal menenjit bulguları izlenmelidir).',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      secondaryScalar: {
        type: 'AdjBW',
        context: '2019 Konsensüsü TBW kullanır; ancak BMI ≥35–40 morbid obezitede aşırı nefrotoksisiteyi önlemek için bazı kılavuzlar AdjBW veya yüklemede üst sınır (~200–250 mg) tartışmaktadır',
      },
      obesityRationale:
        '2019 Uluslararası Polimiksin Konsensüsü Polimiksin B’nin Gerçek Vücut Ağırlığına (TBW) göre dozlanmasını önerir; ancak morbid obezitede (BMI ≥40) 3 mg/kg TBW günlük dozu >300 mg/gün gibi toksik maruziyetlere ulaşabileceğinden yakın renal takip veya AdjBW değerlendirilmesi gerekir.',
      perioperative: {
        applicable: false,
        summaryTitle: 'Perioperatif Cerrahi Profilakside KULLANILMAZ',
        timingWindow: 'Profilaksi endikasyonu yoktur',
        standardDoseLabel: 'Endike değil',
        adultStandardDoseMg: 0,
        infusionTimeText: '—',
        clinicalNote:
          'Polimiksin B son basamak MDR Gram-negatif kurtarma ajanıdır; profilakside kullanımı kontrendike olup ayrıca intraoperatif NDMB bloğunu tehlikeli derecede uzatır.',
        nonProphylaxisReason:
          'Cerrahi profilaksi endikasyonu yoktur; yüksek nefrotoksisite, nöromüsküler blokaj riski ve direnç koruma ilkeleri gereği sadece kanıtlı/yüksek şüpheli MDR kurtarma tedavisinde kullanılır.',
      },
      icu: {
        pkPdTarget: 'fAUC/MIC • Hedef AUCss,24h 50–100 mg·sa/L (Css,avg 2–4 mg/L)',
        pkPdBadge: 'Aktif İlaç • Non-Renal',
        loadingDoseLabel: 'Zorunlu Yükleme: 2,5 mg/kg TBW (25.000 IU/kg) — 1 saatte IV',
        loadingWeightBasedMgKg: 2.5,
        loadingMaxMg: 250,
        loadingUnit: 'mg',
        loadingInfusionText: '1 saatte yavaş IV infüzyon (300–500 mL veya sıvı kısıtlamasında 100–250 mL %5 Dekstroz)',
        maintenanceLabel: 'İdame Dozu — Böbrek Fonksiyonundan BAĞIMSIZ (q12sa)',
        maintenanceMode: 'polymyxin_b_iu',
        weightOptions: [
          {
            id: 'polyb-std-125',
            label: 'Standart MDR İdame (1,25 mg/kg = 12.500 IU/kg q12sa)',
            mgPerKg: 1.25,
            maxSingleMg: 150,
            intervalHours: 12,
            infusionHours: 1,
            diluentVolumeMl: 250,
            note: 'Toplam 2,5 mg/kg/gün (25.000 IU/kg/gün) — çoğu CRAB/CRE enfeksiyonunda optimal etkinlik/nefrotoksisite dengesi.',
          },
          {
            id: 'polyb-high-150',
            label: 'Ağır Septik Şok / Yüksek MİK (1,5 mg/kg = 15.000 IU/kg q12sa)',
            mgPerKg: 1.5,
            maxSingleMg: 150,
            intervalHours: 12,
            infusionHours: 1,
            diluentVolumeMl: 250,
            note: 'Toplam 3,0 mg/kg/gün (30.000 IU/kg/gün — ÜST SINIR!). Daha yüksek dozlar nefrotoksisiteyi belirgin artırır.',
          },
        ],
        tdmNote:
          'Mümkün olan merkezlerde TDM (hedef AUCss,24h 50–100 mg·sa/L) nefrotoksisiteyi azaltır; rutin TDM yoksa günlük kreatinin/idrar çıkışı ve nörolojik/solunumsal izlem esastır.',
        specialConversionNote:
          'BİRİM DÖNÜŞÜMÜ: 1 mg Polimiksin B = 10.000 IU | 50 mg = 500.000 IU (1 standart flakon). Yükleme 2,0–2,5 mg/kg = 20.000–25.000 IU/kg; İdame 1,25–1,5 mg/kg = 12.500–15.000 IU/kg q12sa. (Kolistin’in CBA/MIU dönüşümü ile ASLA karıştırma!)',
      },
      renalTiers: [
        {
          id: 'polyb-normal',
          label: 'Normal Böbrek (eGFR ≥60)',
          egfrRange: '≥ 60 mL/dk',
          recommendation: 'Standart Yükleme + q12sa İdame',
          doseText: 'Yükleme 2,0–2,5 mg/kg → 1,25–1,5 mg/kg q12sa',
          note: '1 mg = 10.000 IU. Günlük 3 mg/kg aşılmamalıdır.',
          tone: 'emerald',
        },
        {
          id: 'polyb-ckd',
          label: 'Böbrek Yetmezliği / ABH (eGFR <60)',
          egfrRange: '< 60 mL/dk (ABH / KBY)',
          recommendation: 'DOZ AYARI GEREKMEZ! (2019 Konsensüs)',
          doseText: 'Yükleme 2,0–2,5 mg/kg → 1,25–1,5 mg/kg q12sa (AYNI DOZ!)',
          note: 'Non-renal klirens nedeniyle doz azaltmak plazma düzeyini düşürüp mortaliteyi artırır! Ancak nefrotoksik eşlikçileri kes ve günlük böbrek takibi yap.',
          tone: 'amber',
        },
        {
          id: 'polyb-crrt-hd',
          label: 'CRRT & Hemodiyaliz (HD)',
          egfrRange: 'CRRT / IHD',
          recommendation: 'DOZ AYARI veya EK DOZ GEREKMEZ!',
          doseText: 'Yükleme 2,0–2,5 mg/kg → 1,25–1,5 mg/kg q12sa',
          note: 'Ne HD ne de CRRT Polimiksin B’yi klinik olarak anlamlı düzeyde temizler (<%5–12); standart mg/kg doza devam edilir.',
          tone: 'sky',
        },
      ],
      crrtSummary:
        '2019 Uluslararası Konsensüsü: CRRT Polimiksin B’nin toplam klirensinin yalnızca <%10–12’sini oluşturur; ne doz azaltımı ne de ek doz gerekir — standart 1,25–1,5 mg/kg q12sa rejimi sürdürülür.',
      hdSummary:
        'Hemodiyalizle anlamlı atılım yoktur; standart 1,25–1,5 mg/kg q12sa dozlama devam ettirilir ve HD sonrası ek doz verilmez.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Polimiksin B Sülfat 500.000 IU (50 mg) Liyofilize Flakon',
          presentation: '500.000 IU (= 50 mg polimiksin B baz aktivitesi) steril liyofilize toz içeren flakon',
          concentration: '2 mL steril su ile sulandırıldığında 250.000 IU/mL (25 mg/mL) → mutlaka 100–500 mL %5 Dekstroz’a seyreltilir!',
          saltOrBaseNote: '1 mg = 10.000 IU. Örn. 80 kg hastada 2,5 mg/kg yükleme = 200 mg = 2.000.000 IU (= 4 adet 500.000 IU flakon!).',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        'Rekonstitüsyon: Her 500.000 IU (50 mg) flakon 2 mL steril enjeksiyonluk su ile sulandırılır (intratekal kullanım için yalnızca prezervatifsiz %0,9 NaCl kullanılır).',
        'IV İnfüzyon: Hesaplanan toplam doz 300–500 mL %5 Dekstroz (D5W) içine (sıvı kısıtlamalı YBÜ hastasında en az 100–250 mL D5W içine) seyreltilir.',
        'İnfüzyon Süresi: En az 60 dakika (1–2 saat) yavaş IV infüzyon olarak uygulanır; hızlı infüzyon perioral parestezi, baş dönmesi ve nöromüsküler blokaj riskini artırır!',
      ],
      concentrationTrapWarning:
        'FLAKON SAYISI & BİRİM TUZAĞI: 1 flakon sadece 50 mg (500.000 IU) içerir! 80 kg hastaya yükleme (200 mg) için 4 flakon, idame (100–120 mg q12sa) için 2–2,5 flakon gerekir. Tek flakon (50 mg) verilmesi ağır subterapötik dozdur; tersine Kolistin MIU hesabı uygulamak ise ölümcül aşırı doz yaratır!',
    },
    compatibility: {
      accessRequirement: 'central-preferred',
      accessSummary:
        'YBÜ’de ayrı santral venöz lümenden 1–2 saatte D5W içinde infüzyon tercih edilir; periferik yoldan yalnızca geniş venden iyi dilüe edilerek verilebilir.',
      phRange: 'pH 5,0 – 7,5',
      osmolalityNote: '300–500 mL D5W içinde izoozmolar (~255–290 mOsm/kg).',
      compatibleDiluents: ['%5 Dekstroz (D5W — İLK SEÇENEK)', '%0,9 NaCl (sınırlı/kısa stabilite; IV infüzyonda D5W tercih edilir, IT’de prezervatifsiz SF)'],
      ySiteCompatible: ['Sınırlı veri — ayrı lümenden tek başına infüze edilmesi şiddetle önerilir'],
      ySiteIncompatible: [
        'Amfoterisin B',
        'Sefazolin / Sefalotinin / Sefuroksim',
        'Heparin (yüksek derişimde geçimsiz)',
        'Kalsiyum/Magnezyum tuzları (yüksek derişim)',
        'Prednizolon / Alkali çözeltiler (sodyum bikarbonat — hızla inaktive olur!)',
      ],
      stabilityNote:
        'Sulandırılmış çözelti 2–8°C’de en fazla 72 saat stabildir (D5W içinde seyreltilmiş infüzyon tercihen 24 saat içinde kullanılmalıdır); alkali ortamlarda hızla degrade olur.',
      extravasationProtocol:
        'İrritan olabilir; ekstravazasyonda infüzyonu durdur, elevasyon ve soğuk kompres uygula.',
    },
    organImpairment: {
      renalSummary:
        'Böbrek dışı (non-renal) eliminasyon nedeniyle böbrek yetmezliğinde, ABH’de, HD’de ve CRRT’de DOZ AYARI YAPILMAZ (Tsuji et al. 2019)!',
      renalDetails: [
        'Polimiksin B böbrekten süzülür ancak proksimal tübülden >%90 geri emilip böbrek dışı mekanizmalarla temizlenir; bu yüzden GFR düştüğünde toplam klirens anlamlı değişmez.',
        'Böbrek hasarı geliştiğinde dozu keyfi azaltmak ilacın kanda düşmesine ve MDR sepsisten ölüme yol açar; bunun yerine eşlikçi nefrotoksikler (vankomisin, aminoglikozid, NSAİİ, kontrast) kesilir veya alternatif antibiyotiğe geçilir.',
        'Kolistin’e göre nefrotoksisite insidansı anlamlı olarak daha düşüktür (%20–40 vs %40–60).',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde doz ayarlaması gerekmez.',
      hepaticDetails: [
        'Hepatik CYP450 metabolizması yoktur; sirozda standart mg/kg dozlama uygulanır.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: Doz Azaltılmaz — Yakın Renal & Nörolojik İzlem',
      geriatricPoints: [
        'Yaşlılarda bazal nefron rezervi düşük olduğundan nefrotoksisite (%30–45) ve nörotoksisite (konfüzyon, parestezi, ataksi) daha sık gelişir.',
        'Günlük 2,5 mg/kg/gün alt sınırı (1,25 mg/kg q12sa) yaşlı/kırılgan hastalarda 3 mg/kg/gün’e kıyasla daha güvenli bir denge sunar.',
      ],
      obesityWeightScalarBadge: 'TBW (2019 Konsensüs) — Morbid Obezitede Üst Sınır Dikkat!',
      obesityPoints: [
        '2019 Konsensüsü TBW bazlı dozlama önerir; ancak >100–120 kg morbid obez hastalarda günlük 300 mg’ı aşan dozlar yüksek ABH riski taşır.',
        'Morbid obezitede 1,25 mg/kg (veya AdjBW ile çapraz kontrol) + mümkünse TDM ve günlük kreatinin takibi önerilir.',
      ],
      clinicalNote:
        'Polimiksin B alan bir YBÜ hastası ameliyathaneye alınacaksa anestezi ekibi MUTLAKA bilgilendirilmelidir (NDMB doz azaltımı ve kantitatif TOF monitörizasyonu şarttır!).',
    },
    pregnancyLactation: {
      pregnancySummary:
        'Gebelikte veri sınırlıdır (eski FDA Kategori B/C); yalnızca hayatı tehdit eden MDR Gram-negatif enfeksiyonlarda başka güvenli alternatif yoksa kullanılır.',
      pregnancyDetails: [
        'Plasentadan düşük oranda geçer; maternal nefrotoksisite ve nöromüsküler blokaj (özellikle preeklampside MgSO₄ ile birlikte!) açısından son derece dikkatli olunmalıdır.',
      ],
      lactationSummary: 'Anne sütüne geçişi hakkında veri kısıtlıdır; oral emilimi ihmal edilebilir düzeydedir ancak bebekte bağırsak florası değişikliği ve olası toksisite izlenmelidir.',
      lactationDetails: [
        'Sistemik emilimi çok düşük olduğundan anne sütünden bebek sistemik dolaşımına anlamlı geçiş beklenmez.',
      ],
    },
    adverseEffects: [
      {
        title: 'Nefrotoksisite (Proksimal Tübüler Hasar)',
        incidenceOrSeverity: '%20–40 • Kolistinden Düşük',
        detail:
          'Megalin-aracılı proksimal tübüler birikim → akut tübüler nekroz (ATN), kreatinin artışı, proteinüri. Günlük >3 mg/kg doz, uzun süre ve vankomisin/aminoglikozid kombinasyonu riski katlar.',
        tone: 'rose',
      },
      {
        title: 'Nöromüsküler Blokaj & Solunum Paralizisi (Apne)',
        incidenceOrSeverity: 'Nadir ama Hayati (Anestezi/YBÜ)',
        detail:
          'Presinaptik ACh salınım blokajı → NDMB’lerin (rokuronyum/vekuronyum) etkisini aşırı uzatır, Neostigmin’e dirençli uzamış kürarizasyon ve apne yapar. Myastenia Gravis’te tehlikeli!',
        tone: 'rose',
      },
      {
        title: 'Nörotoksisite (Parestezi, Ataksi, Konfüzyon)',
        incidenceOrSeverity: '%5–10 • Hız/Doz Bağımlı',
        detail:
          'İnfüzyon sırasında veya sonrasında perioral/ekstremite parestezisi, baş dönmesi, bulanık görme, konfüzyon ve nadiren nöbet. İnfüzyonu 1–2 saate yavaşlatmak belirtileri azaltır.',
        tone: 'amber',
      },
      {
        title: 'Deri Hiperpigmentasyonu',
        incidenceOrSeverity: '%8–15 • Polimiksin B’ye Özgü',
        detail:
          'Özellikle yüz, boyun ve üst gövdede koyu kahverengi-gri hiperpigmentasyon (histamin/melanogenez uyarımı). Zararsızdır, tedavi kesilmesini gerektirmez ve aylar içinde kısmen/tamamen geriler.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Ameliyathane NDMB (Rokuronyum/Vekuronyum) & MgSO₄ Etkileşimi',
        detail:
          'Polimiksin B alan hastada non-depolarizan kas gevşeticiler ve magnezyum sülfat derin, uzamış nöromüsküler blok yapar. Kantitatif TOF monitörizasyonu zorunludur; ekstübasyon öncesi TOF ≥0,90 teyit edilmelidir.',
      },
      {
        title: 'ÜSE’de Yanlış Seçim Tuzağı',
        detail:
          'Karbapenem-dirençli Klebsiella/Acinetobacter idrar yolu enfeksiyonunda Polimiksin B idrara geçmediğinden klinik başarısızlığa yol açar — ÜSE’de mutlaka Kolistin (CMS) veya yeni β-laktam/BLI seçilmelidir.',
      },
      {
        title: 'Böbrek Yetmezliğinde Doz Düşürme Refleksine Diren!',
        detail:
          'Kolistin alışkanlığıyla Polimiksin B dozunu CrCl’ye göre düşürmek en sık YBÜ hatasıdır; 2019 konsensüsü renal yetmezlikte ve CRRT’de dozun korunmasını net olarak vurgular.',
      },
      {
        title: 'Kolistin ile Çapraz Direnç & Kombinasyon İhtiyacı',
        detail:
          'Polimiksin B ve Kolistin arasında tam çapraz direnç vardır (mcr-1 veya pmrAB/mgrB mutasyonları). Ağır CRAB/CRE enfeksiyonlarında heterodirenci bastırmak için duyarlı/sinerjik ikinci ajanla kombinasyon önerilir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — Dış Membran LPS (Lipid A) Elektrostatik Bozulması',
        summary:
          'Polimiksin B’nin beş pozitif yüklü L-α,γ-diaminobütirik asit (Dab) kalıntısı, Gram-negatif dış membranındaki anyonik Lipid A fosfat gruplarına yüksek afiniteyle bağlanır.',
        points: [
          'Dış membran bütünlüğünü sağlayan Ca²⁺ ve Mg²⁺ köprüleri yerinden sökülür; lipofilik yağ asidi kuyruğu (6-metiloktanoik asit) fosfolipid çift tabakasına saplanır.',
          'Bakteri direnci (pmrAB, phoPQ, mgrB veya plazmid kaynaklı mcr-1), Lipid A fosfatlarına fosfoetanolamin/4-amino-4-deoksi-L-arabinoz ekleyerek dış membran negatif yükünü nötralize etmekle oluşur.',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — Sitoplazmik Membran Lizisi, Megalin Endositozu & Presinaptik Ca²⁺ Blokajı',
        summary:
          'Bakteride çift membran yırtılması ve hidroksil radikal patlamasıyla hızlı ölüm gelişirken, konak dokularda tübül epiteli ve motor sinir ucu başlıca toksisite hedefleridir.',
        points: [
          'Renal Proksimal Tübül: Glomerülden süzülen polimiksin B, apikal megalin/PEPT2 taşıyıcılarıyla proksimal tübül hücresine aşırı miktarda alınır → lizozomal birikim, ER stresi, mitokondriyal ROS ve apoptoz (ATN) gelişir.',
          'Nöromüsküler Kavşak: Motor sinir terminalinde voltaj-kapılı Ca²⁺ akışını inhibe ederek veziküler ACh salınımını azaltır ve motor son plakta postsinaptik reseptör duyarlılığını düşürür.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Renal Sistem (Tübüler Geri Emilim Paradoksu)',
          tissueTarget: 'Proksimal Tübül (Megalin)',
          accent: 'amber',
          points: [
            'Glomerülden süzülen ilacın >%90’ı tübülden geri emildiği için idrarda <%4 bulunur (ÜSE’de etkisiz) ve GFR düşse de plazma klirensi değişmez (renal doz ayarı yok!).',
            'Kolistin/CMS’ye kıyasla tübül lümeninde sürekli aktif kolistin oluşmadığından nefrotoksisite oranı daha düşüktür (%20–40 vs %40–60).',
          ],
        },
        {
          systemTitle: 'Nöromüsküler & Santral Sinir Sistemi',
          tissueTarget: 'Motor Son Plak / Periferik Sinir Miyelini',
          accent: 'rose',
          points: [
            'Miyelin fosfolipidlerine bağlanma perioral parestezi ve ataksi yapar.',
            'Anestezik kas gevşeticiler (rokuronyum/vekuronyum), aminoglikozidler ve MgSO₄ ile sinerjik nöromüsküler blokaj ve uzamış apne riski taşır.',
          ],
        },
        {
          systemTitle: 'Sistemik Dolaşım & Endotoksin Nötralizasyonu',
          tissueTarget: 'Gram-Negatif LPS / Plazma Kompartmanı',
          accent: 'teal',
          points: [
            'Ön-ilaç gecikmesi olmaksızın 1 saatlik yükleme infüzyonuyla hızla öngörülebilir hedef AUCss,24h (50–100 mg·sa/L) sağlanır.',
          ],
        },
        {
          systemTitle: 'Deri (Melanositler)',
          tissueTarget: 'Epidermal Melanositler / Langerhans',
          accent: 'indigo',
          points: [
            'Özellikle baş-boyun bölgesinde histamin/inflamasyon aracılı melanogenez uyarımıyla geri dönüşlü gri-kahverengi hiperpigmentasyon oluşturur.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — Dar Terapötik Pencere & Kombinasyon Sinerjisi',
        summary:
          'Polimiksin B’nin etkili plazma düzeyi (~2 mg/L) ile nefrotoksik eşiği (>4 mg/L) birbirine son derece yakındır; 3 mg/kg/gün tavanı aşılmamalıdır.',
        points: [
          'Dış membran geçirgenliğini artırdığı için normalde Gram-negatiflere zayıf giren vankomisin, rifampisin, meropenem veya sulbaktamın hücre içi girişini artırarak sinerji oluşturabilir.',
          'ÜSE hariç tüm sistemik MDR Gram-negatif enfeksiyonlarda Kolistin’e kıyasla PK üstünlüğü ve daha düşük ABH riski nedeniyle 2019 kılavuzunun birinci polimiksinidir.',
        ],
      },
      clinicalPearls: [
        'Böbrek yetmezliğinde veya CRRT’de Polimiksin B dozunu ASLA azaltma — non-renal temizlenir!',
        'İdrar yolu enfeksiyonunda (ÜSE) Polimiksin B KULLANMA (idrara geçmez) → ÜSE’de Kolistin (CMS) seç!',
        '1 mg = 10.000 IU (1 flakon = 50 mg = 500.000 IU); 80 kg yükleme = 200 mg = 4 flakon!',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Polimiksin B',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Non-Depolarizan Nöromüsküler Blokerler (Rokuronyum, Vekuronyum, Sisatrakuryum) & MgSO₄',
          mechanism: 'Presinaptik ACh salınım inhibisyonu ve postsinaptik reseptör desensitizasyonu ile sinerjik nöromüsküler blok.',
          clinicalEffect: 'Ağır uzamış nöromüsküler blokaj, Neostigmin’e zayıf yanıt ve postoperatif/YBÜ solunum paralizisi (apne).',
          management: 'Kantitatif TOF monitörizasyonu kullan; NDMB dozunu titre et; solunum paralizisinde mekanik ventilasyon + IV Kalsiyum Glukonat değerlendir.',
        },
        {
          severity: 'D',
          agent: 'Nefrotoksik Ajanlar (Aminoglikozidler, Vankomisin, Amfoterisin B, Siklosporin, Takrolimus, Radyokontrast)',
          mechanism: 'Ortak proksimal tübüler epitel hasarı ve oksidatif stres (aminoglikozidlerle ayrıca aditif nöromüsküler blok!).',
          clinicalEffect: 'Akut böbrek hasarı (ABH) riskinde keskin artış (ve aminoglikozidlerle apne riski!).',
          management: 'Mümkünse eşzamanlı nefrotoksiklerden (özellikle vankomisin/aminoglikozid) kaçın; zorunluysa günlük kreatinin, idrar çıkışı ve elektrolit izle.',
        },
        {
          severity: 'C',
          agent: 'Loop Diüretikler (Furosemid) & NSAİİ’ler',
          mechanism: 'Renal hipoperfüzyon ve tübüler konsantrasyon artışı.',
          clinicalEffect: 'Artmış polimiksin B nefrotoksisitesi.',
          management: 'Övolemiyi koru; gereksiz NSAİİ ve aşırı diüretikten kaçın.',
        },
      ],
      references: [
        {
          authors: 'Tsuji BT, Pogue JM, Zavascki AP, Paul M, Daikos GL, Forrest A, et al.',
          title: 'International Consensus Guidelines for the Optimal Use of the Polymyxins: Endorsed by the ACCP, ESCMID, IDSA, ISAP, SCCM, and SIDP',
          journal: 'Pharmacotherapy',
          year: 2019,
          note: 'Polimiksin B’nin yükleme (2–2,5 mg/kg), idame (1,25–1,5 mg/kg q12sa), non-renal klirensi (böbrek/CRRT’de doz ayarı yok!) ve sistemik enfeksiyonlarda Kolistin’e üstünlüğünü tanımlayan küresel konsensüs.',
        },
        {
          authors: 'Sandri AM, Landersdorfer CB, Jacob J, Boniatti MM, Dalarosa MG, Falci DR, et al.',
          title: 'Population pharmacokinetics of intravenous polymyxin B in critically ill patients: implications for selection of dosage regimens',
          journal: 'Clinical Infectious Diseases',
          year: 2013,
          note: 'Polimiksin B klirensinin CrCl’den bağımsız (non-renal) ve TBW ile ilişkili olduğunu kanıtlayan popülasyon PK çalışması.',
        },
        {
          authors: 'Tunkel AR, Hasbun R, Bhimraj A, Byers K, Kaplan SL, Scheld WM, et al.',
          title: '2017 Infectious Diseases Society of America’s Clinical Practice Guidelines for Healthcare-Associated Ventriculitis and Meningitis',
          journal: 'Clinical Infectious Diseases',
          year: 2017,
          note: 'MDR Gram-negatif ventrikülitte intraventriküler Polimiksin B (5 mg/gün) protokolü.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/monograph/polymyxin-b.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },

  // ============================================================================
  // 2. KOLİSTİN (COLISTIN — KOLİSTİMETAT SODYUM / CMS)
  // ============================================================================
  {
    id: 'colistin',
    classTag: 'polymyxin',
    accentColor: 'rose',
    atcCode: 'J01XB01',
    classLabel: 'Polimiksin E Ön-İlacı (Kolistimetat Sodyum — CMS / CBA — YBÜ MDR Kurtarma)',
    tradeNamesTr: 'Colimycin® 150 mg CBA (~4,5 MIU), Colistimethate / Coli-Mycin® 1 MIU & 2 MIU liyofilize flakon',
    title: 'Kolistin (Colistin / CMS) — CBA vs MIU Güvenliği, CRRT Yüksek Doz & Nöromüsküler Blokaj',
    cardTitle: 'Kolistin (CMS / CBA)',
    cardBadge: '1 MIU ≈ 33,3 mg CBA • CRRT 440 mg!',
    cardCategoryLabel: 'Polimiksin E • Ön-İlaç',
    cardShortDesc:
      'İnaktif CMS ön-ilacıdır (1 MIU ≈ 33,3 mg CBA ≈ 80 mg CMS — 2,4× ÖLÜMCÜL KARIŞIKLIK RİSKİ!). 300 mg CBA (9 MIU) yükleme şart; CRRT’de YÜKSEK DOZ (440 mg CBA/gün) gerekir; yüksek nefrotoksisite ve NMB/apne riski.',
    cardHighlights: [
      {
        label: 'KRİTİK DÖNÜŞÜM (2,4×!)',
        value: '1 MIU ≈ 33,3 mg CBA',
        subtext: '≈ 80 mg CMS • 150 CBA = 4,5 MIU',
        tooltip: 'mg CBA ile mg CMS karıştırılırsa 2,4 kat ölümcül doz hatası oluşur!',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: '2019 Yükleme & Normal İdame',
        value: '300 mg CBA (9 MIU)',
        subtext: '→ 150–180 CBA (4,5–5,5 MIU) q12sa',
        tooltip: 'Böbrek fonksiyonundan bağımsız 300 mg CBA yükleme zorunludur',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'CRRT TUZAĞI!',
        value: '440 mg CBA / gün',
        subtext: '~13,3 MIU/gün (220 CBA q12sa!)',
        tooltip: 'CRRT hem CMS hem aktif kolistini yoğun temizler → böbrek yetmezliğinden YÜKSEK doz gerekir!',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'Toksisite & Stabilite',
        value: 'ABH %40–60 • Taze Hazırla!',
        subtext: 'NDMB + MgSO₄ Apne • Hidroliz!',
        tooltip: 'Sulandırılıp bekletilirse toksik serbest kolistine hidrolize olur (özellikle nebülizasyonda ölümcül!)',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['Colistin', 'Kolistin', 'Colimycin', 'CMS', 'CBA', 'Colistimethate', 'Polimiksin E'],
    searchKeywords: [
      'kolistin',
      'colistin',
      'colimycin',
      'cms',
      'cba',
      'miu',
      'polimiksin e',
      'mdr',
      'acinetobacter',
      'cre',
      'crrt',
      'nebülize kolistin',
      'intratekal',
      'nefrotoksisite',
      'nöromüsküler blokaj',
      'hidroliz',
    ],
    highAlert: {
      tallManName: 'KOLİSTİN (COLISTIMETHATE — mg CBA vs MIU)',
      confusionRiskWith:
        'CBA (Colistin Base Activity) vs CMS (Colistimethate Sodium tuzu) vs MIU — 1 MIU ≈ 33,3 mg CBA ≈ 80 mg CMS (2,4 KAT FARK!). Ayrıca Polimiksin B ile kesinlikle karıştırılmamalıdır!',
      criticalAlerts: [
        'ÖLÜMCÜL 2,4× BİRİM HATASI TUZAĞI (CBA vs CMS vs MIU): Colimycin® 150 mg CBA (= ~4,5 MIU = 360 mg CMS) olarak, jenerikler ise 1 MIU / 2 MIU olarak etiketlenir! Order’da sadece "mg" yazılması 2,4 kat ölümcül aşırı doza (apne/ABH) veya 2,4 kat yetersiz doza (sepsis ölümü) yol açar — DAİMA "mg CBA" VE "MIU" birlikte yaz!',
        'CRRT’DE YÜKSEK DOZ GEREKİR (440 mg CBA/gün = ~13,3 MIU/gün!): CRRT filtresi hem CMS ön-ilacını hem aktif kolistini etkin biçimde temizler — CRRT hastasına KBY gibi düşük doz (örn. 150 mg/gün) vermek kesin tedavi başarısızlığına yol açar!',
        'TAZE HAZIRLAMA & HİDROLİZ ALARMI (ÖZELLİKLE NEBÜLİZASYONDA!): Sulandırılmış CMS çözeltisi bekletilirse spontan hidrolizle aşırı toksik serbest kolistine dönüşür → nebülizasyonda bekletilmiş çözelti ölümcül ARDS / şiddetli bronkospazm yapar (FDA Black Box Uyarısı)!',
        'NÖROMÜSKÜLER BLOKAJ & SOLUNUM PARALİZİSİ: Perioperatif NDMB (rokuronyum/vekuronyum) ve MgSO₄ ile ağır, Neostigmin’e dirençli uzamış blok ve apne tetikler; Myastenia Gravis’te hayatı tehdit eder!',
      ],
      antidoteOrRescue:
        'Spesifik kimyasal antidot yoktur. Nöromüsküler blokaj ve solunum paralizisinde derhal hava yolu güvencesi + mekanik ventilasyon sağlanır; IV Kalsiyum Glukonat (%10, 1–2 g) kısmi antagonizma sağlayabilir (Neostigmin sıklıkla yetersizdir). Aşırı dozda hemodiyaliz/CRRT CMS ve aktif kolistinin bir kısmını uzaklaştırabilir.',
    },
    identitySummary:
      'Kolistin (Polimiksin E), parenteral olarak inaktif bir ön-ilaç olan Kolistimetat Sodyum (CMS) formunda uygulanır ve plazmada/idrarda yavaş, öngörülmesi güç bir kimyasal hidrolizle aktif kolistine dönüşür. Türkiye yoğun bakımlarında MDR/XDR Acinetobacter baumannii, CRE ve DTR Pseudomonas aeruginosa enfeksiyonlarında (ve özellikle idrarda yüksek aktif konsantrasyona ulaştığı için CRE/MDR ÜSE’de) yaygın kullanılır. Dar terapötik indeksi, %40–60 nefrotoksisitesi, CBA/CMS/MIU karışıklık riski ve agresif CrCl/CRRT doz tablosu nedeniyle en yüksek riskli YBÜ antibiyotiklerinden biridir.',
    spectrumHighlights: [
      {
        title: 'MDR Gram-Negatif Kurtarma & ÜSE Üstünlüğü',
        detail:
          'Karbapenem-dirençli Acinetobacter baumannii (CRAB), CRE (KPC/NDM/OXA-48), DTR Pseudomonas aeruginosa. İdrarda yüksek CMS hidrolizi sayesinde yüksek aktif kolistin düzeyine ulaştığından MDR ÜSE’de Polimiksin B’ye tercih edilir!',
        tone: 'emerald',
      },
      {
        title: 'Ön-İlaç Gecikmesi & Yükleme Zorunluluğu',
        detail:
          'CMS’nin aktif kolistine dönüşümü yavaş olduğundan (%20–30 net dönüşüm) 300 mg CBA (9 MIU) yükleme dozu verilmezse ilk 24–48 saat subterapötik kalınır. Ayrıca CrCl >80–100 mL/dk olan hastalarda CMS dönüşemeden idrarla hızla atıldığından plazma aktif kolistin hedefi (<2 mg/L) zor tutturulur!',
        tone: 'amber',
      },
      {
        title: 'Doğal Dirençli Patojenler',
        detail:
          'Proteus, Providencia, Morganella, Serratia, Burkholderia, Neisseria türleri, tüm Gram-pozitifler (MRSA/Enterokok) ve tüm anaeroblar DOĞAL DİRENÇLİDİR!',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'İnaktif CMS ön-ilacı vücutta spontan hidrolizle polikatyonik aktif kolistine (Polimiksin E) dönüşür. Aktif kolistin, Gram-negatif dış membranındaki anyonik LPS (Lipid A) fosfatlarına bağlanarak Mg²⁺/Ca²⁺ iyonlarını uzaklaştırır, dış ve sitoplazmik membranı deterjan benzeri etkiyle parçalayarak hızlı bakterisidal lizis ve endotoksin nötralizasyonu sağlar.',
    mechanismPillars: [
      {
        title: 'CMS Ön-İlaç Hidrolizi & Renal Yarış Kinetiği',
        detail:
          'Normal böbrek fonksiyonunda CMS’nin büyük kısmı aktif kolistine dönüşemeden idrarla atılır (bu durum ÜSE için avantaj, sistemik bakteriyemi için dezavantajdır!). Böbrek yetmezliğinde ise CMS kanda daha uzun kalıp daha fazla aktif kolistine dönüştüğünden idame dozu agresif biçimde azaltılmalıdır.',
      },
      {
        title: 'Yüksek Tübüler Nefrotoksisite (%40–60)',
        detail:
          'Hem filtre edilen CMS’nin tübülde aktif kolistine dönüşmesi hem de aktif kolistinin megalin-aracılı proksimal tübüler birikimi Polimiksin B’den daha yüksek ABH insidansına yol açar.',
      },
      {
        title: 'Nöromüsküler Kavşak Blokajı & Lokal Havayolu Uygulaması',
        detail:
          'Motor sinir ucunda ACh salınımını baskılayıp postsinaptik depolarizasyonu bozarak uzamış kas gevşemesine ve apneye neden olur. İnhale (nebülize) ve intratekal/intraventriküler yollarla VAP ve ventrikülitte hedef dokuda yüksek lokal konsantrasyon sağlar.',
      },
    ],
    pkCards: [
      {
        label: 'Altın Birim Dönüşümü',
        value: '1 MIU ≈ 33,3 mg CBA ≈ 80 mg CMS',
        detail: '150 mg CBA ≈ 4,5 MIU ≈ 360 mg CMS | 300 mg CBA = 9 MIU = 720 mg CMS.',
      },
      {
        label: 'Ön-İlaç Dönüşümü',
        value: 'CMS → Aktif Kolistin',
        detail: 'Plazmada yavaş ve değişken hidroliz; 300 mg CBA (9 MIU) yükleme olmadan 24–48 saat subterapötik kalır!',
      },
      {
        label: 'Yarı Ömür (t½)',
        value: 'CMS ~2 sa • Aktif ~9–14 sa',
        detail: 'Böbrek yetmezliğinde CMS yarı ömrü belirgin uzar ve aktif kolistin oluşum oranı artar.',
      },
      {
        label: 'PK/PD Hedefi (2019)',
        value: 'Css,avg ~2 mg/L (AUC 50 mg·sa/L)',
        detail: 'Css,avg >2,5–3 mg/L olduğunda nefrotoksisite riski %60’ın üzerine fırlar!',
      },
      {
        label: 'Atılım Yolu',
        value: 'CMS: Renal • Aktif: Non-Renal',
        detail: 'CMS böbrekten atıldığı için CrCl’ye göre sıkı doz tablosu gerekir; CRRT ikisini de temizler!',
      },
      {
        label: 'Özel Yollar',
        value: 'IV + Nebülize + IT/IVT',
        detail: 'VAP’ta adjuvan nebülize (75–150 mg CBA q12sa) ve ventrikülitte IT/IVT (10 mg CBA/gün).',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Kolistin (Polimiksin E) veya Polimiksin B’ye karşı belgelenmiş aşırı duyarlılık / anafilaksi.',
        'Önceden sulandırılıp uzun süre oda sıcaklığında bekletilmiş çözeltinin nebülizasyonu (serbest kolistin hidrolizi → fatal ARDS/bronkospazm!).',
      ],
      relativeItems: [
        'Myastenia Gravis — akut miyastenik kriz ve solunum paralizisi riski nedeniyle zorunlu olmadıkça kaçınılmalıdır.',
        'Eşzamanlı NDMB, yüksek doz MgSO₄ veya aminoglikozid kullanımı — sinerjik nöromüsküler blokaj ve nefrotoksisite!',
        'Yüksek renal klirens / ARC (CrCl >100–130 mL/dk) — sistemik bakteriyemi/pnömonide hedef Css,avg 2 mg/L’ye ulaşmak güçleşir; mümkünse Polimiksin B veya yeni β-laktam/BLI tercih edilir.',
        'Mevcut böbrek yetmezliği — kesin CrCl tablosuna göre idame azaltılır (ancak ilk yükleme 300 mg CBA tam verilir!).',
      ],
      clinicalNote:
        'Ağır böbrek yetmezliğinde dahi İLK YÜKLEME DOZU (300 mg CBA = 9 MIU) azaltılmaz; doz azaltımı 12–24 saat sonra başlanan idame fazında CrCl tablosuna göre yapılır!',
    },
    regimenCards: [
      {
        title: 'YBÜ MDR Gram-Negatif — Yükleme + Normal Böbrek İdame (Tsuji 2019)',
        setting: 'icu',
        badge: '2019 International Consensus',
        dose: 'Yükleme: 300 mg CBA (9 MIU) → İdame (CrCl ≥70–90): 150–180 mg CBA (4,5–5,5 MIU) q12sa',
        infusionDuration: '30–60 dakika IV infüzyon (50–100 mL %0,9 NaCl veya %5 Dekstroz)',
        interval: 'Yüklemeden 12 saat sonra q12sa (günlük toplam 300–360 mg CBA = 9–10,9 MIU)',
        note: 'Böbrek yetmezliğinde bile ilk 300 mg CBA (9 MIU) yükleme TAM verilir; idame dozu CrCl tablosuna göre agresif biçimde uyarlanır. Günlük 360 mg CBA (>10,9 MIU) normal böbrekte dahi nadiren aşılır.',
      },
      {
        title: 'CRRT (CVVH / CVVHDF) Altındaki YBÜ Hastası — KRİTİK YÜKSEK DOZ!',
        setting: 'icu',
        badge: 'CRRT Özel Protokolü',
        dose: 'Yükleme: 300 mg CBA (9 MIU) → İdame: 220 mg CBA (~6,6 MIU) q12sa [440 mg CBA/gün = ~13,3 MIU/gün!]',
        infusionDuration: '30–60 dakika IV infüzyon',
        interval: 'q12sa (CRRT filtresi durursa/tıkanırsa derhal CrCl <10 rejimine düş!)',
        note: 'CRRT hem CMS’yi hem aktif kolistini verimli şekilde temizler; bu nedenle normal böbrekten bile yüksek (440 mg CBA/gün) idame gerekir. Ancak CRRT kesildiği an birikim/toksisite olmaması için doz derhal düşürülmelidir!',
      },
      {
        title: 'MDR VAP Adjuvanı — İnhale / Nebülize Kolistin (Sistemik Tedaviye EK)',
        setting: 'special',
        badge: 'VAP Adjuvan (Taze Hazırla!)',
        dose: '75–150 mg CBA (2–4,5 MIU) q12sa (veya 75 mg CBA q8sa)',
        infusionDuration: '15–20 dk (tercihen Vibrating Mesh nebülizatör; öncesi bronkodilatör!)',
        interval: 'q12sa (mutlaka IV tedaviye ek olarak; monoterapi değil!)',
        note: 'TAZE HAZIRLA VE HEMEN NEBÜLİZE ET! Sulandırılıp bekletilen çözelti serbest kolistine hidrolize olarak ciddi bronkospazm ve kimyasal akciğer hasarı yapar. Ventilatör ekspiratuvar filtresi tıkanma açısından izlenmelidir.',
      },
      {
        title: 'MDR Ventrikülit / Menenjit — İntratekal / İntraventriküler (IT/IVT)',
        setting: 'special',
        badge: 'IDSA Ventrikülit',
        dose: '10 mg CBA (~125.000 IU = 0,125 MIU) günde 1 kez',
        infusionDuration: 'Prezervatifsiz steril SF içinde yavaş enjeksiyon (EVD 1 saat klemplenir)',
        interval: 'q24sa (sistemik IV tedaviye ek; 10–14 gün)',
        note: 'Sistemik kolistinin BOS geçişi <%5’tir; MDR Acinetobacter/CRE ventrikülitinde kritik hayat kurtarıcı adjuvandır.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'IBW',
      secondaryScalar: {
        type: 'TBW',
        context: '2019 Konsensüsü sabit/CrCl bazlı dozlama kullanır (ağırlıktan çok CrCl belirleyicidir); düşük kilolu (<50–60 kg) hastalarda yükleme ~4–5 mg CBA/kg IBW ile sınırlanır (maks 300 mg CBA)',
      },
      obesityRationale:
        '2019 Uluslararası Konsensüsü (Tsuji et al.) sabit 300 mg CBA (9 MIU) yükleme ve CrCl tabanlı sabit idame dozları önerir; obezitede TBW ile 300 mg CBA üstünü zorlamak nefrotoksisiteyi fırlatır (IBW bazlı kontrol esastır; maksimum yükleme 300 mg CBA = 9 MIU!).',
      perioperative: {
        applicable: false,
        summaryTitle: 'Perioperatif Cerrahi Profilakside KULLANILMAZ',
        timingWindow: 'Profilaksi endikasyonu yoktur',
        standardDoseLabel: 'Endike değil',
        adultStandardDoseMg: 0,
        infusionTimeText: '—',
        clinicalNote:
          'Kolistin son basamak kurtarma antibiyotiğidir; profilakside yeri yoktur ve intraoperatif kas gevşeticilerle ciddi uzamış nöromüsküler blok yapar.',
        nonProphylaxisReason:
          'Cerrahi profilakside endike değildir; %40–60 nefrotoksisite, nöromüsküler blokaj riski ve antibiyotik yönetimi ilkeleri gereği sadece MDR kurtarma tedavisinde kullanılır.',
      },
      icu: {
        pkPdTarget: 'Css,avg ~2 mg/L (AUCss,24h ~50 mg·sa/L)',
        pkPdBadge: 'CBA / MIU Çift Doğrulama',
        loadingDoseLabel: 'Zorunlu Yükleme (CrCl’den Bağımsız): 300 mg CBA (= 9 MIU)',
        loadingFixedMg: 300,
        loadingMaxMg: 300,
        loadingUnit: 'mg',
        loadingInfusionText: '30–60 dakika IV infüzyon (100 mL SF/D5W — TAZE HAZIRLA!)',
        maintenanceLabel: 'İdame Dozu (mg CBA cinsinden — CrCl ve CRRT’ye göre seç!)',
        maintenanceMode: 'colistin_cba_miu',
        fixedOptions: [
          {
            id: 'coli-crcl-90',
            label: 'Normal Böbrek CrCl ≥90 (180 mg CBA = 5,5 MIU q12sa)',
            singleDoseMg: 180,
            intervalHours: 12,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Günlük 360 mg CBA (~10,9 MIU/gün). 2019 Konsensüsü maksimum normal böbrek dozu.',
          },
          {
            id: 'coli-crcl-70',
            label: 'CrCl 70–89 mL/dk (150 mg CBA = 4,5 MIU q12sa)',
            singleDoseMg: 150,
            intervalHours: 12,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Günlük 300 mg CBA (9 MIU/gün — 2×1 Colimycin® 150 mg CBA flakon).',
          },
          {
            id: 'coli-crcl-30',
            label: 'CrCl 30–49 mL/dk (110 mg CBA = 3,3 MIU q12sa)',
            singleDoseMg: 110,
            intervalHours: 12,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Günlük 220 mg CBA (~6,6 MIU/gün). Böbrek yetmezliğinde idame agresif azaltılır!',
          },
          {
            id: 'coli-crrt-high',
            label: 'CRRT (CVVH / CVVHDF) — YÜKSEK DOZ (220 mg CBA = 6,6 MIU q12sa!)',
            singleDoseMg: 220,
            intervalHours: 12,
            infusionHours: 1,
            diluentVolumeMl: 100,
            note: 'Günlük 440 mg CBA (~13,3 MIU/gün)! CRRT durduğunda dozu HEMEN düşür!',
          },
        ],
        tdmNote:
          'Aktif kolistin TDM’si çoğu merkezde yoktur; bu nedenle Tsuji 2019 CrCl tablosuna birebir uyum, günlük kreatinin/idrar çıkışı ve nörolojik izlem kritik önemdedir.',
        specialConversionNote:
          'HAYATİ DÖNÜŞÜM TABLOSU (ASLA KARIŞTIRMA!): 1 MIU = 33,3 mg CBA = 80 mg CMS | 4,5 MIU = 150 mg CBA (= 1 Colimycin® flakonu) = 360 mg CMS | 9 MIU = 300 mg CBA (Yükleme) = 720 mg CMS. Order’da DAİMA hem mg CBA hem MIU yaz!',
      },
      renalTiers: [
        {
          id: 'coli-tier-90',
          label: 'CrCl ≥ 90 mL/dk',
          egfrRange: '≥ 90 mL/dk',
          recommendation: '360 mg CBA/gün (~10,9 MIU/gün)',
          doseText: 'Yükleme 300 mg CBA (9 MIU) → 180 mg CBA (5,5 MIU) q12sa',
          note: 'CrCl >100–130 mL/dk’da plazma aktif kolistin hedefi tutturmak zorlaşır (Polimiksin B düşünülebilir).',
          tone: 'emerald',
        },
        {
          id: 'coli-tier-70',
          label: 'CrCl 70–89 mL/dk',
          egfrRange: '70–89 mL/dk',
          recommendation: '300–340 mg CBA/gün (9–10,3 MIU/gün)',
          doseText: 'Yükleme 300 mg CBA → 150–170 mg CBA (4,5–5,1 MIU) q12sa',
          note: 'Standart 2×150 mg CBA (2×4,5 MIU) rejimine karşılık gelir.',
          tone: 'emerald',
        },
        {
          id: 'coli-tier-50',
          label: 'CrCl 50–69 mL/dk',
          egfrRange: '50–69 mL/dk',
          recommendation: '245–275 mg CBA/gün (7,4–8,3 MIU/gün)',
          doseText: 'Yükleme 300 mg CBA → ~125–135 mg CBA (3,7–4,1 MIU) q12sa',
          note: 'İlk yükleme (300 mg CBA) azaltılmaz; idame düşürülür.',
          tone: 'amber',
        },
        {
          id: 'coli-tier-30',
          label: 'CrCl 30–49 mL/dk',
          egfrRange: '30–49 mL/dk',
          recommendation: '195–220 mg CBA/gün (5,9–6,6 MIU/gün)',
          doseText: 'Yükleme 300 mg CBA → ~100–110 mg CBA (3–3,3 MIU) q12sa',
          note: 'CMS birikimi ve aşırı aktif kolistin dönüşümünü önlemek için zorunludur.',
          tone: 'amber',
        },
        {
          id: 'coli-tier-10',
          label: 'CrCl 10–29 mL/dk',
          egfrRange: '10–29 mL/dk',
          recommendation: '145–165 mg CBA/gün (4,4–5,0 MIU/gün)',
          doseText: 'Yükleme 300 mg CBA → ~75–80 mg CBA (2,2–2,5 MIU) q12sa',
          note: 'Günlük böbrek ve nörotoksisite izlemi şart.',
          tone: 'rose',
        },
        {
          id: 'coli-tier-hd',
          label: 'CrCl < 10 / Hemodiyaliz (IHD)',
          egfrRange: '< 10 mL/dk / IHD',
          recommendation: '130 mg CBA/gün (3,95 MIU/gün) + HD Ek Doz',
          doseText: '65 mg CBA (2 MIU) q12sa; HD gününde diyaliz sonrası +40–50 mg CBA (+1,2–1,5 MIU)',
          note: 'Diyaliz günlerinde 3–4 saatlik HD için %30–40 ek doz (40–50 mg CBA) diyaliz bitiminde verilir.',
          tone: 'rose',
        },
        {
          id: 'coli-tier-crrt',
          label: 'CRRT (CVVH / CVVHDF)',
          egfrRange: 'Sürekli RRT',
          recommendation: 'YÜKSEK DOZ: 440 mg CBA/gün (~13,3 MIU/gün!)',
          doseText: 'Yükleme 300 mg CBA (9 MIU) → 220 mg CBA (~6,6 MIU) q12sa',
          note: 'CRRT devresi tıkanıp durursa birikim ve ağır nörotoksisite/apne önlemek için doz derhal 65 mg CBA q12sa’ya düşürülmelidir!',
          tone: 'sky',
        },
      ],
      crrtSummary:
        'KRİTİK YBÜ KURALI (Tsuji 2019): CRRT hem CMS’yi hem aktif kolistini yoğun temizler → 300 mg CBA (9 MIU) yükleme sonrası **440 mg CBA/gün (~13,3 MIU/gün) = 220 mg CBA (~6,6 MIU) q12sa** gerekir! CRRT durduğunda doz anında azaltılmalıdır.',
      hdSummary:
        'Diyaliz dışı günlerde 130 mg CBA/gün (65 mg CBA = 2 MIU q12sa); HD günlerinde 3–4 saatlik seans sonrası **+40–50 mg CBA (~1,2–1,5 MIU)** ek doz verilir (seans mümkünse doz aralığının sonuna planlanır).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Colimycin® 150 mg CBA (~4,5 MIU) Flakon',
          presentation: '150 mg kolistin baz aktivitesi (CBA) içeren liyofilize toz (= ~4,5 MIU = ~360 mg CMS tuzu)',
          concentration: '2 mL steril enjeksiyonluk su ile sulandırıldığında 75 mg CBA/mL (ASLA direkt hızlı verilmez → 50–100 mL SF/D5W)',
          saltOrBaseNote: 'ETİKET TUZAĞI: Colimycin® 150 mg CBA yazar (= 4,5 MIU)! 300 mg CBA (9 MIU) yükleme = 2 flakon Colimycin®!',
          alertLevel: 'high',
        },
        {
          name: 'Kolistimetat Sodyum 1 MIU & 2 MIU Flakon (Avrupa / Jenerik)',
          presentation: '1.000.000 IU (≈ 33,3 mg CBA ≈ 80 mg CMS) veya 2.000.000 IU (≈ 66,7 mg CBA ≈ 160 mg CMS) flakon',
          concentration: '2–4 mL steril su / SF ile sulandırılıp 50–100 mL SF/D5W’ye seyreltilir',
          saltOrBaseNote: '300 mg CBA (9 MIU) yükleme = 9 adet 1 MIU flakon veya 4,5 adet 2 MIU flakon! Etiketteki birimi mutlaka çift doğrula!',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        'Sulandırma: Flakonu nazikçe döndürerek çöz (köpürmeyi önlemek için sert çalkalama!).',
        'IV İnfüzyon: Hesaplanan CBA/MIU dozu 50–100 mL %0,9 NaCl veya %5 Dekstroz içinde 30–60 dakikada infüze edilir.',
        'Nebülizasyon (VAP): 75–150 mg CBA (2–4,5 MIU) 4–6 mL %0,9 NaCl (veya %0,45 NaCl / steril su) ile TAZE sulandırılıp DERHAL nebülize edilir!',
        'BEKLETME YASAĞI: Sulandırılmış çözelti bekledikçe spontan hidrolizle toksik serbest kolistine dönüşür → her dozu uygulamadan hemen önce taze hazırla!',
      ],
      concentrationTrapWarning:
        '2,4× ÖLÜMCÜL DOZ HATASI & HİDROLİZ TUZAĞI: (1) 150 mg CBA = 4,5 MIU = 360 mg CMS’dir — hemşire/doktor order’ında sadece "mg" yazılması 2,4 kat ölümcül hataya yol açar! (2) Önceden sulandırılıp saatlerce bekletilmiş kolistin (özellikle nebülizasyonda) toksik serbest kolistine hidrolize olarak ölümcül akciğer hasarı/ARDS yapar!',
    },
    compatibility: {
      accessRequirement: 'central-preferred',
      accessSummary:
        'YBÜ’de santral venöz kateterden ayrı lümende 30–60 dk infüzyon tercih edilir; periferik venden 50–100 mL SF/D5W içinde yavaşça verilebilir.',
      phRange: 'pH 6,5 – 8,5',
      osmolalityNote: '50–100 mL SF/D5W içinde izoozmolar (~290–330 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Laktatlı Ringer (LR)'],
      ySiteCompatible: ['Sınırlı veri — tek başına/ayrı lümenden verilmesi şiddetle önerilir'],
      ySiteIncompatible: [
        'Eritromisin / Klaritromisin',
        'Sefazolin / Sefalotinin / Hidrokortizon (yüksek derişimde geçimsiz)',
        'Propofol / Amiodaron / Heparin (ayrı hat kullan!)',
      ],
      stabilityNote:
        'KRİTİK: Sulandırıldıktan sonra oda sıcaklığında bekletilmemelidir — CMS spontan olarak aktif serbest kolistine hidrolize olur! IV çözeltiler taze hazırlanıp derhal infüze edilmeli (maks 24 saat içinde 2–8°C’de); nebülize çözeltiler ise KESİNLİKLE hemen kullanılmalıdır!',
      extravasationProtocol:
        'Doku nekrozu nadir ancak irritasyon yapabilir; ekstravazasyonda infüzyonu durdur, elevasyon ve soğuk kompres uygula.',
    },
    organImpairment: {
      renalSummary:
        'CMS ön-ilacı primer olarak böbrekten atıldığından idame dozu CrCl’ye göre agresif şekilde azaltılmalıdır (Ancak 300 mg CBA yükleme dozu HER ZAMAN TAM verilir ve CRRT’de 440 mg CBA/gün YÜKSEK DOZ gerekir!).',
      renalDetails: [
        'Nefrotoksisite (%40–60) genelde tedavinin ilk 5–7 gününde başlar; çoğu olguda ilaç kesilince geri dönüşlüdür ancak YBÜ mortalitesini belirgin artırır.',
        'Eşzamanlı vankomisin, aminoglikozid, loop diüretik, kontrast ve vazopresör ihtiyacı ABH riskini katlar.',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde doz ayarlaması gerekmez (non-enzimatik hidroliz).',
      hepaticDetails: [
        'Sirozda kas kitlesi azlığı nedeniyle serum kreatinini yalancı düşük ölçülebilir → CrCl abartılıp aşırı doz verilmemesine dikkat edilmelidir!',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: Yüksek ABH (%50+) & Nörotoksisite — CrCl Tablosu Şart!',
      geriatricPoints: [
        'İleri yaş kolistin nefrotoksisitesi ve nörotoksisitesi (konfüzyon, parestezi, apne) için bağımsız risk faktörüdür.',
        'Yaşlılarda CrCl mutlaka Cockcroft-Gault/ölçülen kreatinin klirensi ile dikkatlice hesaplanıp Tsuji 2019 tablosuna göre dozlanmalıdır.',
      ],
      obesityWeightScalarBadge: 'IBW Bazlı / Sabit CrCl Tablosu (Yükleme Maks 300 mg CBA)',
      obesityPoints: [
        'Obez hastalarda TBW üzerinden kolistin dozu hesaplamak masif aşırı doza ve ağır akut böbrek yetmezliğine yol açar!',
        '2019 Konsensüsü maksimum yüklemeyi 300 mg CBA (9 MIU) ile sınırlar ve idameyi ağırlıktan çok CrCl’ye göre belirler.',
      ],
      clinicalNote:
        'Ameliyat öncesi veya yoğun bakımda kolistin + magnezyum sülfat + rokuronyum kombinasyonu derin ve geri dönüşü zor nöromüsküler blok yaratır!',
    },
    pregnancyLactation: {
      pregnancySummary:
        'İnsan gebeliğinde veri sınırlıdır (eski FDA Kategori C); yalnızca hayatı tehdit eden MDR Gram-negatif enfeksiyonlarda başka güvenli seçenek yoksa kullanılır.',
      pregnancyDetails: [
        'Plasentayı geçer. Preeklampsi/eklampsi nedeniyle MgSO₄ alan gebede kolistin kullanımı şiddetli nöromüsküler blokaj ve maternal solunum arresti riski doğurur!',
      ],
      lactationSummary: 'Anne sütüne çok düşük miktarda geçer ve bebeğin GİS kanalından emilimi minimaldir; ancak ciddi maternal enfeksiyon dışında dikkatle değerlendirilir.',
      lactationDetails: [
        'Bebekte bağırsak florası bozulması ve ishal açısından gözlem önerilir.',
      ],
    },
    adverseEffects: [
      {
        title: 'Yüksek Nefrotoksisite (ATN / ABH)',
        incidenceOrSeverity: '%40–60 • Doz & Süre Bağımlı',
        detail:
          'Polimiksin B’den daha yüksek oranda proksimal tübüler nekroz (kreatinin yükselmesi, oligüri, elektrolit kaybı). Css,avg >2,5 mg/L, ileri yaş ve vankomisin/aminoglikozid kombinasyonu riski katlar.',
        tone: 'rose',
      },
      {
        title: 'Nöromüsküler Blokaj & Solunum Paralizisi',
        incidenceOrSeverity: 'Hayati Anestezi/YBÜ Acili',
        detail:
          'Presinaptik ACh salınım inhibisyonu ile NDMB (rokuronyum/vekuronyum) ve MgSO₄ etkisini ağır şekilde potansiyalize eder → Neostigmin’e dirençli uzamış kürarizasyon ve apne!',
        tone: 'rose',
      },
      {
        title: 'Nörotoksisite (Parestezi, Vertigo, Nöbet)',
        incidenceOrSeverity: '%7–27 • Özellikle Böbrek Yetmezliğinde',
        detail:
          'Yüz/perioral uyuşma, ekstremite parestezisi, ataksi, görme bozukluğu, konfüzyon, psikoz ve nöbet. CMS birikimiyle keskin artar.',
        tone: 'amber',
      },
      {
        title: 'Nebülizasyon Bronkospazmı & Kimyasal Pnömoni',
        incidenceOrSeverity: '%10–20 • Bekletilmiş Solüsyonda Fatal!',
        detail:
          'İnhale uygulamada refleks bronkokonstriksiyon (öncesinde salbutamol/ipratropium ver!) ve önceden sulandırılıp hidrolize olmuş çözeltide fatal ARDS.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Perioperatif NDMB + MgSO₄ + Kolistin Üçlü Blokaj Tuzağı',
        detail:
          'Acil cerrahiye (örn. laparotomi/debridman) alınan YBÜ kolistin hastasında rokuronyum/vekuronyum ve magnezyum sülfat ile derin, saatlerce süren nöromüsküler blok gelişebilir; kantitatif TOF monitörizasyonu ve mekanik ventilasyon hazırlığı şarttır.',
      },
      {
        title: 'CRRT Başlatılması ve Durdurulması Sırasında Doz Geçişi',
        detail:
          'CRRT başlandığında doz 440 mg CBA/gün’e (~13,3 MIU/gün) çıkarılmalıdır; ancak filtre pıhtılaşıp CRRT durdurulduğunda bu yüksek doz devam ettirilirse 24–48 saat içinde şiddetli nörotoksisite ve solunum paralizisi gelişir!',
      },
      {
        title: 'Etiket Çift Doğrulama Protokolü (CBA vs MIU)',
        detail:
          'Türkiye hastanelerinde aynı eczanede hem 150 mg CBA (Colimycin®) hem 1–2 MIU jenerik flakonlar bulunabilmektedir; hekim order’ında ve hemşire hazırlığında her zaman hem CBA mg hem MIU eşdeğeri birlikte yazılmalıdır.',
      },
      {
        title: 'Nebülize Kolistinde Ekspiratuvar Filtre Tıkanması',
        detail:
          'Mekanik ventilatörde nebülize kolistin uygulaması ekspiratuvar bakteri filtresini tıkayarak oto-PEEP, yüksek pik havayolu basıncı ve barotravmaya yol açabilir — her nebülizasyon sonrası filtre kontrol edilmeli/değiştirilmelidir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — İnaktif CMS Hidrolizi → Katyonik Kolistin-LPS Kompleksi',
        summary:
          'Kolistimetat sodyum (CMS) sülfometil gruplarıyla maskelenmiş negatif yüklü inaktif bir ön-ilaçtır; sulu ortamda spontan hidrolizle sülfometil gruplarını kaybederek katyonik aktif kolistine dönüşür.',
        points: [
          'Serbest kalan beş pozitif yüklü Dab amin grubu, Gram-negatif dış membran Lipid A fosfatlarına bağlanıp Ca²⁺/Mg²⁺ iyonlarını yerinden söker.',
          'Dış ve iç membran bütünlüğünün çökmesiyle ozmotik denge bozulur ve hızlı bakterisidal etki gerçekleşir.',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — Tübüler Megalin/PEPT2 Toksisitesi & Motor Sinir Ca²⁺ Blokajı',
        summary:
          'Aktif kolistinin konak hücre membran fosfolipidleriyle non-spesifik etkileşimi, böbrek proksimal tübülünde ve motor sinir kavşağında belirgin hücresel hasar oluşturur.',
        points: [
          'Proksimal Tübül: Megalin ve PEPT2 ile alınan kolistin mitokondriyal membran potansiyelini bozar, kaspaz-3/9 apoptozu ve oksidatif stres (ROS) ile geniş tübüler nekroz yapar (Polimiksin B’den daha yüksek insidans).',
          'Nöromüsküler Kavşak: Presinaptik voltaj-kapılı Ca²⁺ kanallarını inhibe ederek ACh ekzositozunu düşürür; bu etki antikolinesterazlarla (neostigmin) tam geri çevrilemez çünkü temel sorun ACh yıkımı değil salınım eksikliğidir.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Renal & Üriner Sistem (İki Yüzlü Etki)',
          tissueTarget: 'Proksimal Tübül / İdrar Lümeni',
          accent: 'rose',
          points: [
            'CMS idrara yoğun atılıp mesane/renal pelviste aktif kolistine hidrolize olduğundan MDR ÜSE’de yüksek kür sağlar (Polimiksin B’ye üstün tek alan!).',
            'Ancak tübül lümenindeki yüksek aktif kolistin maruziyeti %40–60 oranında ABH’ye yol açar.',
          ],
        },
        {
          systemTitle: 'Nöromüsküler & Solunum Sistemi',
          tissueTarget: 'Motor Son Plak / Diyafram',
          accent: 'amber',
          points: [
            'NDMB, aminoglikozid ve MgSO₄ ile derin sinerjik kas güçsüzlüğü ve weaning (ventilatörden ayırma) başarısızlığı / apne yapar.',
          ],
        },
        {
          systemTitle: 'Pulmoner Parankim (IV vs İnhale)',
          tissueTarget: 'Alveoler ELF / Bronşiyal Epitel',
          accent: 'teal',
          points: [
            'IV kolistinin akciğer epitelyal sıvısına (ELF) geçişi düşüktür; bu nedenle MDR VAP’ta taze hazırlanmış nebülize kolistin (vibrating mesh ile) lokal ELF düzeyini 100 kat artırır.',
          ],
        },
        {
          systemTitle: 'CRRT Ekstrakorporeal Devresi',
          tissueTarget: 'Hemofiltre Membranı',
          accent: 'indigo',
          points: [
            'Hem CMS hem de aktif kolistin (adsorpsiyon + konveksiyon/difüzyon) CRRT tarafından yüksek hızda temizlendiğinden CRRT’de günlük 440 mg CBA (~13,3 MIU) gerekir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — Yükleme Kinetiği, Dar Terapötik Aralık & Kombinasyon',
        summary:
          '300 mg CBA (9 MIU) yükleme dozu olmadan ilk 24–48 saatte etkin aktif kolistin konsantrasyonuna ulaşılamaz; buna karşın Css,avg >2,5 mg/L eşiğinde nefrotoksisite kaçınılmaz hale gelir.',
        points: [
          'Ağır CRAB/CRE enfeksiyonlarında kolistin monoterapisi heterodirenç nedeniyle sıklıkla başarısız olur; yüksek doz ampisilin-sulbaktam (CRAB), meropenem (MİK ≤8–16) veya tigesiklin/fosfomisin ile kombinasyon stratejisi kullanılır.',
          'Sistemik enfeksiyonlarda Polimiksin B temin edilebiliyorsa (ÜSE hariç) daha düşük nefrotoksisite ve öngörülebilir PK nedeniyle Polimiksin B tercih edilir.',
        ],
      },
      clinicalPearls: [
        '1 MIU ≈ 33,3 mg CBA ≈ 80 mg CMS — Colimycin® 150 mg CBA (= 4,5 MIU) flakonunu ASLA 150 mg CMS sanma!',
        'CRRT’de Kolistin dozu düşürülmez, ARTIRILIR: 440 mg CBA/gün (~13,3 MIU/gün = 220 mg CBA q12sa)!',
        'Sulandırılmış kolistini (özellikle nebülize için) ASLA bekletme — hidrolizle toksik serbest kolistine döner!',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Kolistin (CMS)',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Non-Depolarizan Nöromüsküler Blokerler (Rokuronyum, Vekuronyum, Sisatrakuryum) & Magnezyum Sülfat',
          mechanism: 'Presinaptik ACh salınımının sinerjik inhibisyonu ve postsinaptik reseptör duyarlılığının azalması.',
          clinicalEffect: 'Şiddetli uzamış nöromüsküler blokaj, Neostigmin direnci ve solunum paralizisi / apne.',
          management: 'Kantitatif TOF monitörizasyonu zorunludur; NDMB’yi en düşük etkili dozda titre et, gerekirse mekanik ventilasyon + IV Kalsiyum Glukonat uygula.',
        },
        {
          severity: 'D',
          agent: 'Aminoglikozidler (Amikasin, Gentamisin)',
          mechanism: 'Hem proksimal tübüler nefrotoksisitede hem de presinaptik nöromüsküler blokajda çift yönlü sinerji.',
          clinicalEffect: 'Yüksek akut böbrek yetmezliği ve solunum arresti/apne riski.',
          management: 'Kombinasyondan mümkünse kaçın; zorunluysa günlük kreatinin, amikasin dip düzeyi (<2,5 mg/L) ve nöromüsküler/solunum takibi yap.',
        },
        {
          severity: 'D',
          agent: 'Vankomisin / Amfoterisin B / Takrolimus / Siklosporin / Radyokontrast',
          mechanism: 'Additif/sinerjik akut tübüler nekroz.',
          clinicalEffect: 'Nefrotoksisite insidansının >%60–70’e çıkması ve diyaliz gereksinimi.',
          management: 'MRSA eşlikçisi gerekiyorsa vankomisin yerine teikoplanin veya linezolid değerlendir; günlük böbrek fonksiyonlarını izle.',
        },
        {
          severity: 'C',
          agent: 'Loop Diüretikler (Furosemid) & NSAİİ’ler',
          mechanism: 'İntravasküler hacim kaybı ve renal tübüler maruziyet artışı.',
          clinicalEffect: 'Hızlanmış böbrek fonksiyon kaybı.',
          management: 'Yeterli hidratasyon ve övolemiyi koru; NSAİİ’leri kes.',
        },
      ],
      references: [
        {
          authors: 'Tsuji BT, Pogue JM, Zavascki AP, Paul M, Daikos GL, Forrest A, et al.',
          title: 'International Consensus Guidelines for the Optimal Use of the Polymyxins: Endorsed by the ACCP, ESCMID, IDSA, ISAP, SCCM, and SIDP',
          journal: 'Pharmacotherapy',
          year: 2019,
          note: '300 mg CBA (9 MIU) yükleme, kesin CrCl doz tablosu, CRRT’de 440 mg CBA/gün rejimi ve CBA/CMS/MIU güvenlik uyarısının temel kılavuzu.',
        },
        {
          authors: 'Nation RL, Garonzik SM, Thamlikitkul V, Giamarellos-Bourboulis EJ, Forrest A, Paterson DL, et al.',
          title: 'Dosing guidance for intravenous colistin in critically-ill patients',
          journal: 'Clinical Infectious Diseases',
          year: 2017,
          note: 'Kritik hastalarda, HD ve CRRT’de hedef Css,avg 2 mg/L için güncellenmiş popülasyon PK doz algoritması.',
        },
        {
          authors: 'US Food and Drug Administration (FDA).',
          title: 'FDA Alert: Information for Healthcare Professionals — Colistimethate (Nebulized Solution Premixing Fatalities)',
          journal: 'FDA Drug Safety Communication',
          year: 2007,
          note: 'Önceden sulandırılıp bekletilen kolistimetatın serbest kolistine hidrolizi sonucu gelişen fatal akciğer toksisitesi uyarısı.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/monograph/colistimethate.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },

  // ============================================================================
  // 3. AMİKASİN (AMIKACIN)
  // ============================================================================
  {
    id: 'amikacin',
    classTag: 'aminoglycoside',
    accentColor: 'teal',
    atcCode: 'J01GB06',
    classLabel: 'Aminoglikozid Antibiyotik (Konsantrasyon-Bağımlı Gram-Negatif & Perioperatif Alternatif)',
    tradeNamesTr: 'Amikozit® 100 mg / 500 mg / 1 g, Amikaver® 500 mg / 1 g, Amiketem® 500 mg ampul/flakon',
    title: 'Amikasin (Amikacin) — YBÜ 25–30 mg/kg Yükleme, TDM & Anestezi Nöromüsküler Blokaj Tuzağı',
    cardTitle: 'Amikasin (IV)',
    cardBadge: 'Cmax/MIC ≥8–10 • NDMB Tuzağı!',
    cardCategoryLabel: 'Aminoglikozid • TDM Şart',
    cardShortDesc:
      'Konsantrasyon-bağımlı bakterisidal aminoglikozid. Septik şokta 25–30 mg/kg AdjBW yükleme + pik/dip TDM; β-laktam alerjili üroloji/kolorektal profilakside 15 mg/kg tek doz. NDMB’leri GÜÇLÜ potansiyalize eder!',
    cardHighlights: [
      {
        label: 'YBÜ Septik Şok Yükleme',
        value: '25–30 mg/kg AdjBW',
        subtext: 'İdame: 15–20 mg/kg q24–48sa',
        tooltip: 'Septik şokta genişlemiş Vd nedeniyle ilk dozda Cmax 60–80 mg/L için 25–30 mg/kg yükleme şart!',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'TDM Hedefleri (Pik / Dip)',
        value: 'Pik 60–80 • Dip <2,5',
        subtext: 'Standart pik 30–40 • Dip <5 mg/L',
        tooltip: 'Yüksek dip (trough >5 mg/L) nefrotoksisite ve kalıcı ototoksisitenin ana nedenidir',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'ANESTEZİ KRİTİK TUZAĞI',
        value: 'NDMB Potansiyalizasyon!',
        subtext: 'Neostigmin dirençli blok • MG!',
        tooltip: 'Presinaptik ACh inhibisyonu → Rokuronyum/Vekuronyum uzamış kürarizasyon!',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Perioperatif & Y-Hat',
        value: '15 mg/kg Pre-İnsizyon',
        subtext: 'β-Laktamla aynı hatta İNAKTİVE!',
        tooltip: 'β-laktam alerjili üroloji/kolorektal cerrahide tek doz; β-laktamlarla asla karıştırma!',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['Amikacin', 'Amikasin', 'Amikozit', 'Amikaver', 'Amiketem'],
    searchKeywords: [
      'amikasin',
      'amikacin',
      'amikozit',
      'amikaver',
      'aminoglikozid',
      'cmax/mic',
      'tdm',
      'trough',
      'ototoksisite',
      'nefrotoksisite',
      'nöromüsküler blokaj',
      'rokuronyum',
      'myastenia gravis',
      'beta laktam inaktivasyon',
      'cerrahi profilaksi',
    ],
    highAlert: {
      tallManName: 'AMİKȦsi̇n (AMIKacin)',
      confusionRiskWith:
        'Amikozit 100 mg (pediatrik) vs 500 mg vs 1 g ampul güçlerinin karıştırılması; Gentamisin/Tobramisin (mg/kg dozları 3–4 kat daha düşüktür!).',
      criticalAlerts: [
        'ANESTEZİ KRİTİK TUZAĞI — UZAMIŞ NÖROMÜSKÜLER BLOK & APNE: Presinaptik ACh salınımını baskılayarak Rokuronyum/Vekuronyum gibi NDMB’leri GÜÇLÜ ŞEKİLDE POTANSİYALİZE EDER ve Neostigmin’e dirençli uzamış kürarizasyon yapar! Myastenia Gravis’te miyastenik kriz tetikler — KAÇIN!',
        'İRREVERSİBL OTOTOKSİSİTE & NEFROTOKSİSİTE: Koklear/vestibüler hasar KALICI olabilir (mitokondriyal MT-RNR1 m.1555A>G taşıyıcılarında tek dozda bile sağırlık!). Dip düzeyi (trough) mutlaka <2,5–5 mg/L tutulmalı; Furosemid ve Vankomisin ile sinerjik toksisite unutulmamalıdır!',
        'β-LAKTAM İLE KİMYASAL İNAKTİVASYON: Piperasilin-Tazobaktam, Ampisilin, Sefazolin veya Seftazidim ile AYNI ENJEKTÖRDE, ŞİŞEDE VEYA Y-HATTINDA karıştırılırsa aminoglikozid kimyasal olarak İNAKTİVE olur (ve aynı hattan alınan kanda TDM yalancı düşük çıkar)!',
        'SEPTİK ŞOKTA YÜKSEK YÜKLEME ŞARTI (25–30 mg/kg AdjBW): Septik şokun genişlemiş dağılım hacminde 15 mg/kg ilk doz Cmax ≥60–80 mg/L hedefine ulaşamaz; ilk doz 25–30 mg/kg verilip sonraki aralık eGFR + TDM ile uzatılır!',
      ],
      antidoteOrRescue:
        'Spesifik kimyasal antidot yoktur. Nöromüsküler blokaj / postoperatif rezidüel kürarizasyonda: Mekanik ventilasyonu sürdür, rokuronyum/vekuronyum eşlik ediyorsa Sugammadeks uygula, aminoglikozidin doğrudan presinaptik bloğu için **IV Kalsiyum Glukonat (%10, 1–2 g yavaş IV)** uygula (Neostigmin sıklıkla etkisizdir!). Aşırı dozda hemodiyaliz 4 saatte amikasinin ~%50’sini temizler.',
    },
    identitySummary:
      'Amikasin, kanamisinden türetilen yarı-sentetik bir aminoglikozid antibiyotiktir; bakteriyel aminoglikozid-modifiye edici enzimlerin çoğuna dirençli olması sayesinde gentamisin ve tobramisine kıyasla MDR Gram-negatif (ESBL, P. aeruginosa, Acinetobacter) suşlara karşı en geniş aktiviteye sahiptir. Konsantrasyon-bağımlı hızlı bakterisidal (Cmax/MIC ≥8–10) etkisi ve uzun post-antibiyotik etkisi (PAE) nedeniyle yüksek pik / düşük dip (extended-interval) stratejisiyle uygulanır. Anestezi ve YBÜ’de nöromüsküler bloker potansiyalizasyonu, ototoksisite ve nefrotoksisite açısından kritik bir yüksek dikkat ajanıdır.',
    spectrumHighlights: [
      {
        title: 'Geniş Gram-Negatif Kapsama (En Dirençli Aminoglikozid)',
        detail:
          'ESBL üreten Enterobacterales (E. coli, Klebsiella, Enterobacter, Serratia, Proteus), Pseudomonas aeruginosa (gentamisin-dirençli suşlar dahil), bazı Acinetobacter baumannii izolatları, Nocardia ve tüberküloz dışı mikobakteriler (MAC, M. abscessus).',
        tone: 'emerald',
      },
      {
        title: 'Asidik/Oksijensiz Ortam & Monoterapi Kısıtlılığı',
        detail:
          'Hücre içine girişi oksijen-bağımlı aktif transport gerektirdiğinden apse, püy, asidik plevral/alveoler sıvı ve nekrotik dokuda etkinliği düşer; sistemik septik şokta (ÜSE dışı) genellikle bir β-laktam ile kısa süreli (2–3 gün) kombine edilir.',
        tone: 'amber',
      },
      {
        title: 'Doğal Direnç / Kapsam Dışı',
        detail:
          'TÜM anaerob bakteriler (oksijen-bağımlı transport yok!), Streptococcus pneumoniae, Enterokoklar (tek başına etkisiz; yalnızca hücre duvarı ajanı ile sinerji), MRSA (monoterapi etkisiz) ve Stenotrophomonas maltophilia.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Bakteri sitoplazmik membranından oksijen-bağımlı aktif transportla geçerek 30S ribozomal alt birimin 16S rRNA A-bölgesine irreversibl olarak bağlanır. mRNA’nın yanlış okunmasına (misreading) yol açarak hatalı/toksik membran proteinlerinin sentezlenmesine, hücre zarı geçirgenliğinin çökmesine ve hızlı konsantrasyon-bağımlı bakterisidal ölüme (Cmax/MIC ≥8–10) neden olur.',
    mechanismPillars: [
      {
        title: '30S Ribozomal Misreading & Konsantrasyon-Bağımlı Öldürme',
        detail:
          'Hatalı sentezlenen proteinler bakteri zarında kanallar açarak daha fazla amikasin girişini ve geri dönüşsüz ölümü hızlandırır; etkinlik zirve konsantrasyonuna (Cmax/MIC ≥8–10) bağlıdır.',
      },
      {
        title: 'Uzun Post-Antibiyotik Etki (PAE) & Uzamış Aralık Mantığı',
        detail:
          'İlaç serumdan temizlendikten saatler sonra bile bakteri çoğalması baskılanır (PAE 2–8 saat). Günde tek yüksek doz (q24–48sa) hem Cmax’ı maksimize eder hem de tübül/koklea hücrelerine ilaçsız toparlanma penceresi (düşük dip) tanıyarak toksisiteyi azaltır.',
      },
      {
        title: 'Presinaptik Ca²⁺ Blokajı (Anestezi NMB Mekanizması)',
        detail:
          'Motor sinir ucunda P/Q tipi voltaj-kapılı kalsiyum kanallarıyla yarışarak ACh salınımını inhibe eder; non-depolarizan kas gevşeticilerle güçlü sinerjik ve Neostigmin’e dirençli nöromüsküler blok oluşturur.',
      },
    ],
    pkCards: [
      {
        label: 'PK/PD Hedef Endeksi',
        value: 'Cmax / MIC ≥ 8–10',
        detail: 'Septik şokta MIC = 8 mg/L için hedef pik 60–80 mg/L; standart enfeksiyonda 30–40 mg/L.',
      },
      {
        label: 'TDM Dip (Trough) Sınırı',
        value: '< 2,5 – 5 mg/L',
        detail: 'İdeal <2,5 mg/L (<5 mg/L üst sınır); yüksek trough nefrotoksisite/ototoksisiteyi tetikler!',
      },
      {
        label: 'Dağılım Hacmi (Vd)',
        value: '0,25–0,30 L/kg (Sepsiste ↑)',
        detail: 'Hidrofilik (ekstraselüler dağılım); septik şok ödeminde 0,4–0,5 L/kg’a çıkar → 25–30 mg/kg yükleme şart!',
      },
      {
        label: 'Protein Bağlanması',
        value: '< %10 (Çok Düşük)',
        detail: 'Hipoalbüminemiden etkilenmez; hemodiyaliz ve CRRT ile yüksek oranda temizlenir.',
      },
      {
        label: 'Eliminasyon Yarı Ömrü (t½)',
        value: '2–3 saat (Normal)',
        detail: 'Ağır böbrek yetmezliğinde (anüri) 30–86 saate uzar!',
      },
      {
        label: 'Atılım Yolu',
        value: '>%95 Renal (GFR)',
        detail: 'Tamamen glomerüler filtrasyonla değişmeden atılır; hepatik metabolizma yoktur.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Amikasin veya diğer aminoglikozidlere (gentamisin, tobramisin) karşı belgelenmiş aşırı duyarlılık / anafilaksi veya sülfit alerjisi (bazı ampuller sodyum metabisülfit içerir).',
        'Bilinen mitokondriyal MT-RNR1 (m.1555A>G) mutasyonu veya ailede aminoglikozide bağlı tek doz kalıcı sağırlık öyküsü.',
      ],
      relativeItems: [
        'Myastenia Gravis, Lambert-Eaton sendromu veya ağır nöromüsküler hastalık — akut miyastenik kriz ve solunum paralizisi riski nedeniyle KAÇINILMALIDIR!',
        'Mevcut akut böbrek hasarı (ABH) veya ileri KBY — zorunlu kurtarma kullanımında tek yükleme sonrası TDM ile uzatılmış aralık (q48–72sa) uygulanır ve süre en kısa (≤48–72 sa) tutulur.',
        'Gebelik — fetal 8. kraniyal sinir (irreversibl konjenital sağırlık) riski nedeniyle hayatı tehdit eden alternatif yokluğu dışında kaçınılır.',
        'Eşzamanlı ototoksik/nefrotoksik ajanlar (loop diüretikler, vankomisin, kolistin, sisplatin).',
      ],
      clinicalNote:
        'Ameliyathanede β-laktam alerjili hastaya profilaktik amikasin verildiğinde, anestezi ekibi uzamış nöromüsküler blok olasılığını öngörerek kantitatif TOF monitörizasyonu uygulamalıdır.',
    },
    regimenCards: [
      {
        title: 'Perioperatif Cerrahi Profilaksi (β-Laktam Alerjili Üroloji / Kolorektal / Gastroduodenal)',
        setting: 'perioperative',
        badge: 'ASHP/IDSA Cerrahi Profilaksi',
        dose: '15 mg/kg IV (Obezitede AdjBW! Genelde 1000–1500 mg)',
        infusionDuration: '30–60 dakika IV infüzyon (100–250 mL SF veya D5W)',
        interval: 'Tek doz (insizyondan 30–60 dk önce) — İntraoperatif redozaj GENELDE GEREKMEZ',
        note: 'Kolorektal/jinekolojik/biliyer cerrahide anaerob kapsam için Metronidazol 500 mg IV (veya Klindamisin) ile kombine edilir. Uzun PAE sayesinde tek doz yeterlidir; NDMB bloğunu potansiyalize ettiği unutulmamalıdır!',
      },
      {
        title: 'YBÜ Septik Şok / Ağır MDR Gram-Negatif — Yüksek Yükleme Rejimi',
        setting: 'icu',
        badge: 'YBÜ Kritik Bakım (Taccone / ESICM)',
        dose: 'Yükleme: 25–30 mg/kg IV (AdjBW) → İdame: 15–20 mg/kg IV q24sa (TDM & eGFR’ye göre q36–48sa)',
        infusionDuration: '30 dakika IV infüzyon (100–250 mL SF/D5W)',
        interval: 'İlk yükleme → 24. saatte dip (trough) düzeyi <2,5–5 mg/L ise sonraki doz!',
        note: 'Septik şokta genişleyen Vd nedeniyle 15 mg/kg başlangıç dozu %30–40 hastada hedef pik (60–80 mg/L) oluşturamaz → 25–30 mg/kg yükleme şarttır! Böbrek yetmezliğinde bile ilk yüksek doz tek seferde verilebilir, sonraki doz TDM dip <2,5–5 mg/L olana dek beklenir.',
      },
      {
        title: 'Standart Ciddi Gram-Negatif Enfeksiyon / Komplike ÜSE (Non-Şok)',
        setting: 'icu',
        badge: 'Extended-Interval (Günde Tek Doz)',
        dose: '15 mg/kg IV q24sa (AdjBW)',
        infusionDuration: '30–60 dakika IV infüzyon',
        interval: 'q24sa (CrCl <60’da q36sa, CrCl <40’da q48sa veya TDM’ye göre)',
        note: 'Standart pik hedefi 30–40 mg/L, dip <2,5–5 mg/L. Ampirik kombinasyon süresi mümkünse 48–72 saatle sınırlandırılarak nefrotoksisite/ototoksisite en aza indirilir.',
      },
    ],
    calculator: {
      defaultWeightKg: 80,
      weightScalar: 'AdjBW',
      secondaryScalar: {
        type: 'IBW',
        context: 'Zayıf/normal kilolu hastalarda (TBW ≤ IBW) TBW kullanılır; fazla kilolu/obez hastalarda (TBW > 1,2×IBW) mutlaka AdjBW = IBW + 0,4×(TBW − IBW) kullanılır!',
      },
      obesityRationale:
        'Amikasin son derece hidrofilik bir moleküldür (Vd ~0,25 L/kg) ve yağ dokusuna çok az (%40 oranında ekstra su hacmi) dağılır. Obez hastalarda TBW kullanmak şiddetli aşırı doza, ABH’ye ve kalıcı sağırlığa yol açar — mutlaka Düzeltilmiş Vücut Ağırlığı (AdjBW) kullanılmalıdır!',
      perioperative: {
        applicable: true,
        summaryTitle: 'β-Laktam Alerjili Üroloji / Kolorektal / Gastroduodenal Cerrahi Profilaksisi',
        timingWindow: 'İnsizyondan 30–60 dk ÖNCE (30–60 dk infüzyon)',
        standardDoseLabel: '15 mg/kg IV tek doz (Obezitede AdjBW; genelde maks 1500 mg)',
        adultStandardDoseMg: 1000,
        highWeightThresholdKg: 85,
        highWeightDoseMg: 1500,
        weightBasedMgKg: 15,
        weightBasedMaxMg: 1500,
        pediatricMgKg: 15,
        pediatricMaxMg: 1500,
        infusionTimeText: '30–60 dakika IV infüzyon (100–250 mL SF veya D5W)',
        bloodLossRedoseMl: 1500,
        clinicalNote:
          'Uzun post-antibiyotik etki nedeniyle rutin intraoperatif redozaj gerekmez. ANESTEZİ UYARISI: Rokuronyum/Vekuronyum etkisini güçlü biçimde potansiyalize eder; kantitatif TOF monitörizasyonu kullan!',
      },
      icu: {
        pkPdTarget: 'Cmax/MIC ≥ 8–10 • Pik 60–80 mg/L (Şok) / 30–40 (Std) • Dip <2,5–5 mg/L',
        pkPdBadge: 'Konsantrasyon Bağımlı + TDM',
        loadingDoseLabel: 'YBÜ Septik Şok Yükleme: 25–30 mg/kg AdjBW (30 dk infüzyon)',
        loadingWeightBasedMgKg: 25,
        loadingMaxMg: 3000,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dakika IV infüzyon (100–250 mL SF/D5W — β-laktamdan ayrı hat!)',
        maintenanceLabel: 'İdame Dozu (AdjBW — eGFR’ye göre aralık uzatılır + TDM!)',
        maintenanceMode: 'weight_based_qinterval',
        weightOptions: [
          {
            id: 'amik-icu-20',
            label: 'YBÜ Ağır MDR / Yüksek MİK İdame (20 mg/kg q24sa — TDM ile)',
            mgPerKg: 20,
            maxSingleMg: 2000,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'İlk 25–30 mg/kg yükleme sonrası; 24. saatte dip <2,5–5 mg/L doğrulanmadan sonraki doz verilmemelidir!',
          },
          {
            id: 'amik-std-15',
            label: 'Standart Extended-Interval (15 mg/kg q24sa)',
            mgPerKg: 15,
            maxSingleMg: 1500,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'CrCl ≥60 mL/dk için standart günde tek doz; CrCl 40–59’da q36sa, CrCl 20–39’da q48sa veya dip <2,5–5 mg/L olunca redozaj.',
          },
        ],
        tdmNote:
          'TDM ZORUNLUDUR: (1) Pik (Cmax): 30 dk infüzyon bitiminden 30 dk sonra → septik şok/yüksek MIC için 60–80 mg/L, standart 30–40 mg/L. (2) Dip (Trough): 24. saatte (sonraki doz öncesi) → <2,5 mg/L (en fazla <5 mg/L)! Dip >5 mg/L ise sıradaki dozu ERTELE ve 12–24 sa sonra tekrar ölç!',
      },
      renalTiers: [
        {
          id: 'amik-egfr-60',
          label: 'Normal Böbrek (CrCl ≥60)',
          egfrRange: '≥ 60 mL/dk',
          recommendation: 'q24sa (Şokta 25–30 mg/kg Yükleme → 15–20 mg/kg q24sa)',
          doseText: 'Yükleme 25–30 mg/kg → 15–20 mg/kg q24sa + TDM',
          note: 'Pik ve 24. saat dip düzeyi (<2,5–5 mg/L) ile doğrula.',
          tone: 'emerald',
        },
        {
          id: 'amik-egfr-40',
          label: 'Orta Böbrek Yetmezliği (CrCl 40–59)',
          egfrRange: '40–59 mL/dk',
          recommendation: 'Aralığı q36sa’ya Uzat (+ TDM)',
          doseText: '15 mg/kg q36sa (şokta ilk yükleme 25 mg/kg → dip <2,5–5 olunca)',
          note: 'Tek doz miktarını küçültmek yerine aralığı uzatmak Cmax/MIC etkinliğini korur!',
          tone: 'amber',
        },
        {
          id: 'amik-egfr-20',
          label: 'İleri Böbrek Yetmezliği (CrCl 20–39)',
          egfrRange: '20–39 mL/dk',
          recommendation: 'Aralığı q48sa’ya Uzat (Dose-by-Level TDM)',
          doseText: '15 mg/kg q48sa (yalnızca dip <2,5–5 mg/L olduğunda redozaj)',
          note: 'TDM olmadan tekrarlayan doz vermek yüksek nefrotoksisite ve kalıcı ototoksisite yaratır.',
          tone: 'rose',
        },
        {
          id: 'amik-egfr-low',
          label: 'Ağır Böbrek Yetmezliği / HD (CrCl <20)',
          egfrRange: '< 20 mL/dk veya HD',
          recommendation: 'Yükleme Sonrası Yalnızca Düzeye Göre / HD Sonrası',
          doseText: 'Yükleme 15–20 mg/kg (şokta 25 mg/kg) → HD sonrası 5–7,5 mg/kg (veya dip <5 olunca)',
          note: 'Hemodiyaliz seans başına amikasinin ~%50’sini temizler; pre-HD/post-HD düzey izlemi şarttır.',
          tone: 'rose',
        },
        {
          id: 'amik-crrt',
          label: 'CRRT (CVVH / CVVHDF)',
          egfrRange: 'Effluent 25–35 mL/kg/sa',
          recommendation: 'Tam Yükleme (25 mg/kg) → 15 mg/kg q24–48sa + TDM',
          doseText: 'Yükleme 25 mg/kg → 24. saatte TDM; dip <2,5–5 mg/L ise 15 mg/kg q24–48sa',
          note: 'Düşük protein bağlanması (<%10) nedeniyle CRRT’de etkin temizlenir; ancak effluent hızına bağlı değişkenlik yüksek olduğundan TDM olmadan redozaj yapılmamalıdır.',
          tone: 'sky',
        },
      ],
      crrtSummary:
        'Protein bağlanması <%10 olduğu için CRRT amikasini belirgin temizler. Septik şokta 25–30 mg/kg AdjBW yükleme yapılır; 24. saatte serum düzeyi kontrol edilip dip <2,5–5 mg/L’ye düştüğünde 15 mg/kg q24–48sa (sıklıkla q36–48sa) idame verilir.',
      hdSummary:
        '4 saatlik yüksek akımlı HD serum amikasininin ~%50’sini uzaklaştırır. Başlangıç yüklemesi sonrası her HD seansı bitiminde 5–7,5 mg/kg verilir (veya pre-HD düzey <5–8 mg/L hedefiyle TDM kılavuzlu dozlama yapılır).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Amikozit® / Amikaver® 500 mg / 2 mL Ampul veya Flakon',
          presentation: '500 mg amikasin (sülfat) içeren 2 mL çözelti (250 mg/mL)',
          concentration: '250 mg/mL konsantre → 100–250 mL SF veya D5W içinde seyreltilerek 30–60 dk infüzyon',
          saltOrBaseNote: 'Yetişkin YBÜ 25–30 mg/kg yükleme (örn. 2000 mg) için 4 adet 500 mg ampul veya 2 adet 1 g flakon gerekir.',
          alertLevel: 'high',
        },
        {
          name: 'Amikozit® / Amikaver® 1 g (1000 mg) / 4 mL Flakon',
          presentation: '1000 mg amikasin içeren 4 mL çözelti (250 mg/mL)',
          concentration: '250 mg/mL konsantre → 100–250 mL SF/D5W içinde 30–60 dk infüzyon',
          saltOrBaseNote: '500 mg ve 100 mg (pediatrik) formlarla karıştırılmamalı; toplam mg dozu çift doğrulanmalıdır.',
          alertLevel: 'high',
        },
        {
          name: 'Amikozit® 100 mg / 2 mL Pediatrik Ampul',
          presentation: '100 mg amikasin içeren 2 mL çözelti (50 mg/mL)',
          concentration: '50 mg/mL — yalnızca pediatrik/yenidoğan kullanım için',
          saltOrBaseNote: 'Erişkin 500 mg ampulle 5 kat güç farkı vardır; yanlışlıkla erişkin dozu hazırlarken kullanılmamalıdır.',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        'Erişkin IV İnfüzyon: Hesaplanan doz (500–2500 mg) 100–250 mL %0,9 NaCl veya %5 Dekstroz içine eklenir (nihai konsantrasyon ≤5–10 mg/mL).',
        'İnfüzyon Süresi: 30–60 dakika yavaş IV infüzyon (hızlı bolus nöromüsküler blokaj ve ototoksisite pik riskini artırır!).',
        'Ayrı Hat Kuralı: Piperasilin-Tazobaktam veya herhangi bir β-laktam ile ASLA aynı şişede/Y-hattında verilmez; aradan mutlaka %0,9 NaCl ile yıkama yapılır.',
      ],
      concentrationTrapWarning:
        'β-LAKTAM İNAKTİVASYON & AMPUL GÜÇ TUZAĞI: (1) β-laktamlarla aynı enjektör/hatta temas eden amikasin kimyasal olarak inaktive olur! (2) 100 mg, 500 mg ve 1 g formları aynı hacme yakın (2–4 mL) olduğundan etiket mutlaka çift kontrol edilmelidir!',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        '100–250 mL SF veya D5W içinde 30–60 dk infüzyonla periferik veya santral venden güvenle uygulanabilir (ancak β-laktamlardan ayrı lümenden!).',
      phRange: 'pH 3,5 – 5,5 (Sülfat tuzu — 100–250 mL içinde iyi tolere edilir)',
      osmolalityNote: '100–250 mL SF/D5W içinde izoozmolar (~300–350 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Laktatlı Ringer (LR)'],
      ySiteCompatible: ['Fentanil', 'Midazolam', 'Morfin', 'Metronidazol', 'Klindamisin', 'Magnezyum sülfat (sistemik NMB etkileşimine dikkat!)'],
      ySiteIncompatible: [
        'Piperasilin-Tazobaktam / Ampisilin-Sulbaktam / Tikarsilin (KİMYASAL İNAKTİVASYON!)',
        'Sefazolin / Sefepim / Seftazidim / Seftriakson (β-laktamların çoğuyla kimyasal geçimsiz!)',
        'Teikoplanin (anında çökme!)',
        'Heparin (çökme)',
        'Propofol / Amfoterisin B / Furosemid / Fenitoin / Pantoprazol / Tiyopental',
      ],
      stabilityNote:
        'SF veya D5W içinde seyreltilmiş çözelti (0,25–5 mg/mL) oda sıcaklığında 24 saat, buzdolabında (4°C) 48–60 saat stabildir (ancak mikrobiyolojik güvenlik için 24 saatte tüketilmelidir).',
      extravasationProtocol:
        'Vezikan değildir; ekstravazasyonda infüzyonu durdur, elevasyon ve soğuk kompres uygula.',
    },
    organImpairment: {
      renalSummary:
        'Eliminasyon >%95 glomerüler filtrasyona bağlıdır; böbrek yetmezliğinde tek doz miktarı azaltılmaz, DOZ ARALIĞI uzatılır (q36sa / q48sa) ve dip düzeyi (<2,5–5 mg/L) ile redozaj yapılır!',
      renalDetails: [
        'Reversibl proksimal tübüler nefrotoksisite (genelde non-oligürik ABH, hipomagnezemi, hipokalemi) sıklıkla 5–7. günden sonra ortaya çıkar.',
        'Süreyi mümkünse ≤3–5 günle sınırlamak ve dip düzeyini <2,5 mg/L tutmak nefrotoksisiteyi önlemenin en etkili yoludur.',
      ],
      hepaticSummary: 'Hepatik metabolizma yoktur; karaciğer yetmezliğinde primer doz ayarı gerekmez (ancak sirozda assit nedeniyle Vd artar ve serum kreatinini böbrek fonksiyonunu gizleyebilir!).',
      hepaticDetails: [
        'İleri sirozda (Child-Pugh C) aminoglikozid nefrotoksisite riski belirgin yükseldiğinden (hepatorenal sendrom tetiklenmesi!) mümkünse alternatif ajanlar tercih edilir.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: Yüksek Kalıcı Ototoksisite & ABH — Kısa Süre + TDM',
      geriatricPoints: [
        'Yaşlılarda azalmış GFR ve önceden var olan presbiakuzi nedeniyle hem ABH hem de kalıcı koklear/vestibüler hasar riski çok yüksektir.',
        'Ampirik tedavide 48–72 saat içinde de-eskalasyon hedeflenmeli ve ilk dozdan sonra TDM alınmalıdır.',
      ],
      obesityWeightScalarBadge: 'AdjBW = IBW + 0,4 × (TBW − IBW) ZORUNLU!',
      obesityPoints: [
        'Obez hastalarda (TBW > 1,2×IBW) TBW ile dozlama toksik birikim ve ABH yaratır; IBW ise yetersiz Cmax verir → altın standart AdjBW’dir!',
        'Septik şokta 25–30 mg/kg AdjBW yükleme verilir ve pik/dip TDM ile bireyselleştirilir.',
      ],
      clinicalNote:
        'Obezite veya ileri yaşta "kilo başına 15–30 mg TBW" yazmak önlenebilir kalıcı sağırlık ve diyaliz gerektiren ABH’nin başlıca nedenidir — mutlaka AdjBW skalerini kullan!',
    },
    pregnancyLactation: {
      pregnancySummary:
        'Gebelikte KAÇINILMALIDIR (eski FDA Kategori D — plasentayı geçerek fetal 8. kraniyal sinire zarar verir ve kalıcı bilateral konjenital sağırlık oluşturabilir; yalnızca hayatı tehdit eden alternatif yokluğunda!).',
      pregnancyDetails: [
        'Preeklampsi nedeniyle MgSO₄ alan gebede amikasin eklenmesi anne ve yenidoğanda ağır nöromüsküler blokaj ve solunum depresyonu yapar.',
      ],
      lactationSummary: 'Anne sütüne çok düşük miktarda geçer ve bebeğin GİS kanalından oral emilimi ihmal edilebilir (<%1); emzirme ile genelde uyumlu kabul edilir.',
      lactationDetails: [
        'Bebekte yalnızca bağırsak florası değişikliği (ishal/pamukçuk) izlenir; sistemik ototoksisite beklenmez.',
      ],
    },
    adverseEffects: [
      {
        title: 'Nöromüsküler Blokaj & Uzamış Kürarizasyon (Anestezi!)',
        incidenceOrSeverity: 'Nadir ama Hayati (NDMB/MG’de Çok Yüksek)',
        detail:
          'Presinaptik ACh salınımını inhibe ederek Rokuronyum/Vekuronyum etkisini güçlü biçimde potansiyalize eder; Neostigmin’e dirençli uzamış blok ve solunum arresti yapar. IV Kalsiyum Glukonat + Sugammadeks + ventilasyon!',
        tone: 'rose',
      },
      {
        title: 'İrreversibl Ototoksisite (Koklear & Vestibüler)',
        incidenceOrSeverity: '%2–15 • KALICI SAĞIRLIK RİSKİ!',
        detail:
          'İç kulak tüy hücrelerinde kalıcı yıkım → yüksek frekanslı işitme kaybı, tinnitus, vertigo/ataksi. Uzun tedavi (>7 gün), yüksek dip (>5 mg/L), loop diüretikler ve MT-RNR1 mutasyonu riski katlar!',
        tone: 'rose',
      },
      {
        title: 'Reversibl Proksimal Tübüler Nefrotoksisite',
        incidenceOrSeverity: '%5–20 • 5–7. Günden Sonra Artar',
        detail:
          'Non-oligürik ABH, tübüler magnezyum/potasyum kaybı ve kreatinin artışı. Vankomisin, Furosemid ve Polimiksinlerle sinerjiktir; günde tek doz (extended-interval) + dip <2,5 mg/L riski azaltır.',
        tone: 'amber',
      },
      {
        title: 'Hipomagnezemi, Hipokalemi & Elektrolit Kaçağı',
        incidenceOrSeverity: '%5–10 • Tübülopati',
        detail:
          'Proksimal ve kalın çıkan kolda CaSR aktivasyonuyla renal Mg²⁺, K⁺ ve Ca²⁺ kaybı → YBÜ hastasında sekonder aritmi ve nöromüsküler güçsüzlüğü ağırlaştırır.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Anestezide Postoperatif Rezidüel Kürarizasyon (PORC) & Neostigmin Direnci',
        detail:
          'Ameliyat öncesi profilaksi veya YBÜ tedavisinde amikasin alan hastada rokuronyum/vekuronyum bloğu Neostigmin ile tam dönmeyebilir (çünkü presinaptik ACh salınımı azalmıştır!). Kantitatif TOF monitörizasyonu şarttır; Sugammadeks + IV Kalsiyum Glukonat (%10, 1–2 g) kurtarıcıdır.',
      },
      {
        title: 'β-Laktam İle Aynı Koldan Alınan TDM Numunesi Hatası',
        detail:
          'Yüksek doz piperasilin-tazobaktam veya karbapenem alan (özellikle böbrek yetmezlikli) hastada alınan TDM kan tüpü oda sıcaklığında bekletilirse β-laktam tüp içinde amikasini inaktive eder ve yalancı düşük düzey çıkar → numune derhal buzda/hızlıca laboratuvara gönderilmelidir!',
      },
      {
        title: 'Furosemid + Amikasin Ototoksisite Sinerjisi',
        detail:
          'YBÜ’de sıvı yükü nedeniyle yüksek doz IV furosemid alan hastada amikasin eklenmesi koklear endolenf potansiyelini bozarak hızlı ve kalıcı sağırlık tetikleyebilir; alternatif antibiyotik veya sıkı TDM gerekir.',
      },
      {
        title: 'Kısa Süreli Ampirik Kullanım İlkesi (48–72 Saat)',
        detail:
          'Septik şokta ikili Gram-negatif ampirik kapsama için eklenen amikasin, kültür/antibiyogram çıkar çıkmaz (genelde 48–72 saatte) kesilmelidir — 5–7 günden uzun maruziyet nefrotoksisite ve ototoksisiteyi katlar!',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — Oksijen-Bağımlı Alım & 30S Ribozomal 16S rRNA Misreading',
        summary:
          'Polikatyonik amikasin önce dış membran LPS’ine bağlanarak kendini içeri çeker (self-promoted uptake), ardından elektron transport zincirine bağımlı membran potansiyeliyle (EDP-I) bakteri sitoplazmasına girip 30S ribozomun 16S rRNA A-bölgesine bağlanır.',
        points: [
          'Ribozomun kodon-antikodon doğrulama mekanizmasını bozarak mRNA’nın yanlış okunmasına (misreading) ve kusurlu transmembran proteinlerin sentezlenmesine yol açar.',
          'Bu hatalı proteinler bakteri zarında geçirgen kanallar açarak ikinci, masif bir amikasin giriş dalgasını (EDP-II) ve hızlı bakterisidal ölümü tetikler.',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — Presinaptik P/Q Ca²⁺ Kanal Blokajı, Megalin Endositozu & Koklear ROS',
        summary:
          'Konak hücrelerde amikasinin polikatyonik yapısı üç kritik hedef dışı hücresel kaskadı (motor sinir ucu, proksimal tübül ve iç kulak tüy hücresi) etkiler.',
        points: [
          'Motor Sinir Terminali (Anestezi!): Presinaptik P/Q tipi voltaj-kapılı Ca²⁺ kanallarına bağlanarak aksiyon potansiyeliyle tetiklenen Ca²⁺ girişini ve SNARE-bağımlı ACh vezikül füzyonunu bloke eder; postsinaptik nikotinik reseptör duyarlılığını da azaltır.',
          'Proksimal Tübül & Koklea: Megalin aracılı endositozla tübül hücrelerine ve mekanotransdüksiyon (MET) kanallarından iç kulak dış tüy hücrelerine girer → lizozomal fosfolipidoz ve Fe²⁺-amikasin kompleksi üzerinden masif ROS üretimiyle apoptoz (kokleada rejenerasyon olmadığı için İRREVERSİBL sağırlık!) oluşturur.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Nöromüsküler Kavşak & Solunum Kasları',
          tissueTarget: 'Presinaptik Motor Akson Ucu / Diyafram',
          accent: 'rose',
          points: [
            'Rokuronyum, vekuronyum, sisatrakuryum ve MgSO₄ ile güçlü sinerjik blokaj → postoperatif rezidüel kürarizasyon (PORC) ve apne.',
            'Myastenia Gravis’te güvenlik marjı zaten düşük olduğundan tek doz bile ağır miyastenik kriz tetikleyebilir.',
          ],
        },
        {
          systemTitle: 'İç Kulak (Koklea & Vestibül)',
          tissueTarget: 'Korti Organı Dış Tüy Hücreleri / Vestibüler Epitel',
          accent: 'amber',
          points: [
            'Amikasin özellikle kokleotoksiktir (yüksek frekanslı kalıcı işitme kaybı; konuşma frekanslarına inmeden fark edilmeyebilir!).',
            'Endolenften klirensi plazmadan çok daha yavaş olduğundan yüksek dip (trough) ve uzun tedavi (>7 gün) tüy hücresi ölümünü hızlandırır.',
          ],
        },
        {
          systemTitle: 'Renal Sistem (Nefron)',
          tissueTarget: 'Proksimal Tübül / Henle Kalın Çıkan Kol',
          accent: 'indigo',
          points: [
            'Tübüler alım doyurulabilir (saturable) olduğundan günde tek yüksek doz (q24sa) bölünmüş dozlara (q8sa) kıyasla daha az tübüler birikim ve daha düşük ABH yapar!',
            'Kalsiyum-algılayıcı reseptör (CaSR) uyarımıyla renal Mg²⁺ ve K⁺ kaybına neden olur.',
          ],
        },
        {
          systemTitle: 'Sistemik Septik Şok Kompartmanı',
          tissueTarget: 'Ekstraselüler Sıvı / İdrar Yolu',
          accent: 'teal',
          points: [
            'İdrarda plazmanın 50–100 katı konsantrasyona ulaşır (MDR ÜSE’de yüksek etkinlik).',
            'Septik şokta kapiller kaçış Vd’yi genişlettiği için ilk 25–30 mg/kg AdjBW yükleme yapılmazsa Cmax/MIC ≥8–10 hedefine ulaşılamaz.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — Adaptif Direnç, Extended-Interval Kinetiği & β-Laktam Sinerjisi',
        summary:
          'Günde tek yüksek doz stratejisi (25–30 mg/kg yükleme → 15–20 mg/kg q24–48sa) aynı anda hem Cmax/MIC etkinliğini maksimize eder, hem adaptif direnci (efluks pompası uyarımı) önler, hem de tübüler/koklear toksisiteyi azaltır.',
        points: [
          'In vivo β-Laktam Sinerjisi: β-laktam hücre duvarını zedeleyerek amikasinin bakteri içine girişini artırır (ancak in vitro aynı enjektörde/Y-hattında kimyasal olarak birbirlerini inaktive ederler — ayrı lümenden ver!).',
          'Böbrek yetmezliğinde dozu bölmek/küçültmek yerine ARALIĞI UZATMAK (q36sa/q48sa + dip <2,5–5 mg/L) konsantrasyon-bağımlı bakterisidal etkinliğin temel kuralıdır.',
        ],
      },
      clinicalPearls: [
        'Ameliyathanede amikasin alan hastada NDMB bloğu uzarsa: TOF’a bak → Sugammadeks + IV Kalsiyum Glukonat (%10, 1–2 g) düşün; Neostigmin tek başına yetersiz kalabilir!',
        'Septik şokta 15 mg/kg yetmez → 25–30 mg/kg AdjBW yükleme ver; 24. saat dip (trough) <2,5–5 mg/L olmadan sonraki dozu ASLA verme!',
        'β-laktam (özellikle Piperasilin-Tazobaktam) ile aynı hattan/enjektörden ASLA gönderme — amikasini kimyasal olarak inaktive eder!',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Amikasin',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Non-Depolarizan Nöromüsküler Blokerler (Rokuronyum, Vekuronyum, Sisatrakuryum) & Magnezyum Sülfat',
          mechanism: 'Presinaptik voltaj-kapılı Ca²⁺ kanal blokajı ile ACh salınımının azalması ve postsinaptik nikotinik reseptör duyarlılığının düşmesi.',
          clinicalEffect: 'GÜÇLÜ NDMB potansiyalizasyonu, Neostigmin’e dirençli uzamış kürarizasyon ve postoperatif solunum arresti/PORC.',
          management: 'Kantitatif TOF monitörizasyonu zorunlu; NDMB dozunu titre et; uzamış blokta mekanik ventilasyon + Sugammadeks (rokuronyum/vekuronyum için) + IV Kalsiyum Glukonat (%10, 1–2 g) uygula.',
        },
        {
          severity: 'D',
          agent: 'Loop Diüretikler (Furosemid, Torsemid)',
          mechanism: 'Stria vascularis endolenf potansiyelinin bozulmasıyla sinerjik koklear hasar + hacim kaybıyla artmış renal birikim.',
          clinicalEffect: 'Kalıcı (irreversibl) sağırlık / ototoksisite ve akut böbrek hasarı riskinde belirgin artış.',
          management: 'Eşzamanlı yüksek doz IV furosemidden mümkünse kaçın; zorunluysa dip düzeyi (<2,5 mg/L) ve işitme/böbrek takibini sıklaştır.',
        },
        {
          severity: 'D',
          agent: 'Vankomisin / Polimiksinler (Kolistin, Polimiksin B) / Amfoterisin B / Sisplatin / Takrolimus',
          mechanism: 'Sinerjik proksimal tübüler epitel toksisitesi (polimiksinlerle ayrıca aditif nöromüsküler blok!).',
          clinicalEffect: 'Ağır nefrotoksisite, ototoksisite ve elektrolit (Mg²⁺/K⁺) kaybı.',
          management: 'Kombinasyon süresini en kısa (≤48–72 sa) tut; günlük kreatinin, Mg²⁺/K⁺ ve sıkı TDM uygula.',
        },
        {
          severity: 'C',
          agent: 'β-Laktam Antibiyotikler (Piperasilin-Tazobaktam, Ampisilin, Sefazolin, Seftazidim)',
          mechanism: 'Aynı şişede/Y-hattında veya ağır böbrek yetmezliğinde (yüksek β-laktam düzeyiyle) nükleofilik asilleme yoluyla kimyasal inaktivasyon.',
          clinicalEffect: 'Amikasin aktivite kaybı ve aynı hattan/bekletilmiş kandan alınan TDM’de yalancı düşük sonuç.',
          management: 'ASLA aynı enjektörde/Y-hattında karıştırma (ayrı lümen veya SF yıkama); TDM kan örneğini ayrı koldan alıp hızla laboratuvara ulaştır.',
        },
      ],
      references: [
        {
          authors: 'Taccone FS, Laterre PF, Spapen H, Dugernier T, Delattre I, Layeux B, et al.',
          title: 'Revisiting the loading dose of amikacin for patients with severe sepsis and septic shock',
          journal: 'Critical Care',
          year: 2010,
          note: 'Septik şokta genişleyen dağılım hacmi nedeniyle hedef Cmax/MIC ≥8 için ≥25 mg/kg yükleme dozu gerekliliğini kanıtlayan temel YBÜ çalışması.',
        },
        {
          authors: 'Bratzler DW, Dellinger EP, Olsen KM, Perl TM, Auwaerter PG, Bolon MK, et al.',
          title: 'Clinical practice guidelines for antimicrobial prophylaxis in surgery',
          journal: 'American Journal of Health-System Pharmacy',
          year: 2013,
          note: 'β-laktam alerjili üroloji/kolorektal/gastroduodenal cerrahide aminoglikozid (15 mg/kg) profilaksi önerisi.',
        },
        {
          authors: 'Roger C, Nucci B, Molinari N, Bastide S, Saissi G, Pradel G, et al.',
          title: 'Standard dosing of amikacin and gentamicin in critically ill patients results in variable and subtherapeutic concentrations',
          journal: 'International Journal of Antimicrobial Agents',
          year: 2015,
          note: 'Kritik hastalarda 25–30 mg/kg yüksek yükleme + AdjBW + TDM stratejisini destekleyen klinik çalışma.',
        },
        {
          authors: 'Miller RD, Eriksson LI, Fleisher LA, Wiener-Kronish JP, Cohen NH, Young WL.',
          title: 'Miller’s Anesthesia — Neuromuscular Pharmacology & Antibiotic-Induced Potentiation of Neuromuscular Blockade',
          journal: 'Elsevier (Reference Textbook)',
          year: 2020,
          note: 'Aminoglikozidlerin presinaptik ACh inhibisyonu, NDMB potansiyalizasyonu, Neostigmin direnci ve IV Kalsiyum/Sugammadeks yönetimi.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/monograph/amikacin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },
];
