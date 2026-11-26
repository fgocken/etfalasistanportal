import type { AntimicrobialMonographData } from './types';

export const GRAM_POSITIVE_MACROLIDE_ANTIMICROBIALS: AntimicrobialMonographData[] = [
  // ============================================================================
  // 1. VANKOMİSİN (VANCOMYCIN)
  // ============================================================================
  {
    id: 'vancomycin',
    classTag: 'glycopeptide_lipopeptide',
    accentColor: 'purple',
    atcCode: 'J01XA01',
    classLabel: 'Glikopeptid Antibiyotik (MRSA / Gram-Pozitif Referans Ajan)',
    tradeNamesTr: 'Vancotek® 500 mg / 1 g, Edicin® 500 mg / 1 g, Vankomisin Koçak® 500 mg / 1 g flakon',
    title: 'Vankomisin (Vancomycin) — YBÜ AUC/MIC TDM & Perioperatif MRSA Profilaksi Monografisi',
    cardTitle: 'Vankomisin (IV)',
    cardBadge: 'ASHP/IDSA 2020 AUC/MIC',
    cardCategoryLabel: 'Glikopeptid • MRSA',
    cardShortDesc:
      'MRSA ve ampisilin-dirençli Enterokok için temel glikopeptid. YBÜ septik şokta 25–30 mg/kg TBW yükleme + AUC₂₄/MIC 400–600 hedefi; perioperatif profilakside insizyondan 60–120 dk önce yavaş infüzyon.',
    cardHighlights: [
      {
        label: 'YBÜ Yükleme (Sepsis)',
        value: '25–30 mg/kg TBW',
        subtext: 'Maks 3 g • ≥2–3 sa infüzyon',
        tooltip: 'ASHP/IDSA/PIDS/SIDP 2020 ağır MRSA enfeksiyonu yükleme önerisi',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'PK/PD TDM Hedefi',
        value: 'AUC₂₄/MIC 400–600',
        subtext: 'Tek başına trough yetersiz!',
        tooltip: 'Trough 15–20 mg/L stratejisi gereksiz nefrotoksisiteye yol açar',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'Perioperatif Zamanlama',
        value: '60–120 dk Önce',
        subtext: '15 mg/kg (maks 2 g) • ≤10–15 mg/dk',
        tooltip: 'Yüksek MRSA riski, protez veya ciddi β-laktam alerjisinde',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Periferik & Hız Sınırı',
        value: '≤ 5 mg/mL',
        subtext: 'MRGPRX2 infüzyon reaksiyonu!',
        tooltip: 'Hızlı infüzyon IgE-bağımsız histamin salınımı ve hipotansiyon yapar',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
    aliases: ['Vancomycin', 'Vankomisin', 'Vancotek', 'Edicin', 'Vanco'],
    searchKeywords: [
      'vankomisin',
      'vancomycin',
      'vancotek',
      'edicin',
      'mrsa',
      'mrse',
      'glikopeptid',
      'red man',
      'vankomisin infüzyon reaksiyonu',
      'mrgprx2',
      'auc/mic',
      'trough',
      'nefrotoksisite',
      'c. difficile',
      'cerrahi profilaksi',
    ],
    highAlert: {
      tallManName: 'VANKOmi̇si̇n (vancoMYCIN)',
      confusionRiskWith:
        'Vekuronyum (vecuronium), Vankomisin oral vs IV solüsyon yolu hatası (IV flakon oral C. difficile için içirilebilir ancak oral kapsül/solüsyon ASLA IV verilmez!).',
      criticalAlerts: [
        'HIZLI İNFÜZYON TUZAĞI (≤10–15 mg/dk): 60 dakikadan hızlı (1 g) veya 120 dakikadan hızlı (≥1,5 g) infüzyon MRGPRX2 aracılı mast hücre degranülasyonu (Vankomisin İnfüzyon Reaksiyonu — eski adıyla Red Man) ve ani derin hipotansiyon / kardiyak arrest tetikler!',
        'PERİOPERATİF ZAMANLAMA HATASI: İnsizyondan 60–120 dk önce başlanmalıdır; indüksiyon sırasında hızlı infüze edilmeye çalışılması hem profilaksiyi yetersiz kılar hem de anestezi indüksiyon hipotansiyonunu ağırlaştırır.',
        'VANKOMİSİN + PİPERASİLİN-TAZOBAKTAM NEFROTOKSİSİTE SİNERJİSİ: Bu ikili kombinasyon akut böbrek hasarı (ABH) riskini 2–3 kat artırır; ampirik anti-psödomonal kapsamda Sefepim veya Meropenem tercih edilmelidir.',
        'PERİFERİK KONSANTRASYON SINIRI (≤5 mg/mL): pH 2,5–4,5 asidik yapısı nedeniyle >5 mg/mL periferik infüzyon şiddetli tromboflebit ve ekstravazasyon doku nekrozu yapar.',
      ],
      antidoteOrRescue:
        'Spesifik kimyasal antidot yoktur. Vankomisin İnfüzyon Reaksiyonunda: İnfüzyonu derhal durdur → IV H₁ blokeri (difenhidramin/feniramin) + H₂ blokeri (famotidin) + kristaloid bolusu → semptomlar gerileyince infüzyon süresini ≥2–3 saate (≤10 mg/dk) uzatarak yeniden başla. Gerçek IgE-aracılı anafilakside (anjioödem, stridor, hışıltı) adrenalin protokolü uygulanır ve ilaç kalıcı kesilir. Aşırı doz/toksisitede yüksek akımlı (high-flux) hemodiyaliz veya hemoperfüzyon klirensi kısmen artırır.',
    },
    identitySummary:
      'Vankomisin, yüksek molekül ağırlıklı (~1450 Da) trisiklik glikopeptid antibiyotiktir. Metisiline dirençli Staphylococcus aureus (MRSA), MRSE, ampisiline dirençli Enterococcus ve penisiline dirençli Streptococcus pneumoniae enfeksiyonlarında temel parenteral ajandır; oral uygulandığında sistemik emilimi ihmal edilebilir düzeyde olduğundan ağır Clostridioides difficile kolitinde lümende yüksek konsantrasyon sağlar. Perioperatif cerrahi profilakside rutin ilk seçenek değildir (MSSA’ya karşı sefazolin daha hızlı bakterisidaldir); yalnızca MRSA kolonizasyonu/yüksek risk, protez cerrahisi veya ciddi β-laktam alerjisinde seçilir.',
    spectrumHighlights: [
      {
        title: 'Güçlü Kapsama (Gram-Pozitifler)',
        detail:
          'MRSA, MSSA (sefazoline göre daha yavaş bakterisidal), koagülaz-negatif stafilokoklar (MRSE), β-hemolitik streptokoklar, penisilin-dirençli S. pneumoniae, ampisilin-dirençli E. faecalis/E. faecium (VRE dışı), Corynebacterium jeikeium, Bacillus spp., oral yoldan C. difficile.',
        tone: 'emerald',
      },
      {
        title: 'Kısıtlı Etkinlik / MİK Kayması (MIC Creep)',
        detail:
          'MRSA MİK ≥2 mg/L (hVISA/VISA) izolatlarında AUC₂₄/MIC ≥400 hedefi nefrotoksik maruziyet yaratmadan sağlanamaz → Daptomisin veya Linezolid’e geçilmelidir. MSSA bakteriyemisinde β-laktamlara (sefazolin/nafsilin) kıyasla mortalitesi anlamlı derecede yüksektir.',
        tone: 'amber',
      },
      {
        title: 'Doğal Direnç / Kapsam Dışı',
        detail:
          'TÜM Gram-negatif bakteriler (dış membran porinlerinden geçemez), Vankomisine Dirençli Enterokoklar (VRE — VanA/VanB fenotipi), Leuconostoc, Pediococcus, Lactobacillus ve atipik patojenler.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Gram-pozitif bakterilerde hücre duvarı peptidoglikan öncüllerinin D-alanil-D-alanin (D-Ala-D-Ala) terminal ucuna yüksek afiniteli beş hidrojen bağı ile bağlanarak transglikozilasyon ve transpeptidasyon basamaklarını sterik olarak bloke eder. Sonuçta hücre duvarı çapraz bağlanması bozulur ve ozmotik lizisle zaman/maruziyet-bağımlı (AUC₂₄/MIC) bakterisidal etki oluşur.',
    mechanismPillars: [
      {
        title: 'D-Ala-D-Ala Sterik Blokajı',
        detail:
          'β-laktamlardan farklı olarak PBP enzimine değil doğrudan peptidoglikan substratı olan Lipid II ucundaki D-Ala-D-Ala dipeptidine bağlanır; bu nedenle mecA (PBP2a) taşıyan MRSA suşlarında etkilidir.',
      },
      {
        title: 'Bakteriyel Direnç Mekaniği (VRE & VISA)',
        detail:
          'VRE suşları hedefi D-Ala-D-Laktat (VanA/VanB) olarak değiştirerek vankomisin bağlanma afinitesini ~1000 kat düşürür. VISA suşlarında ise kalınlaşmış hücre duvarı ilacı sahte bağlanma bölgelerinde hapseder.',
      },
      {
        title: 'AUC₂₄/MIC Bağımlı Öldürme & Doku Geçişi',
        detail:
          'Etkinliği 24 saatlik eğri altı alan/MİK oranına (AUC₂₄/MIC 400–600) bağlıdır. Akciğer epitelyal sıvısına (ELF) geçişi %20–40 ve meninkslere (inflame iken) geçişi %15–30 düzeyinde olduğundan ağır pnömoni/menenjitte yükleme dozu kritik önemdedir.',
      },
    ],
    pkCards: [
      {
        label: 'Dağılım Hacmi (Vd)',
        value: '0,4–1,0 L/kg',
        detail: 'Septik şok ve sıvı resüsitasyonunda Vd belirgin artar; yükleme dozu (25–30 mg/kg TBW) şarttır.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%30–55',
        detail: 'Orta düzeyde albümin bağlanması; hipoalbüminemide serbest fraksiyon artabilir.',
      },
      {
        label: 'Eliminasyon Yarı Ömrü (t½)',
        value: '4–6 saat (Normal)',
        detail: 'Anürik / SDBY hastalarda t½ 120–180 saate (5–7 gün) uzar.',
      },
      {
        label: 'Atılım Yolu',
        value: '>%80–90 Renal (GFR)',
        detail: 'Büyük ölçüde glomerüler filtrasyonla değişmeden atılır; hepatik metabolizması ihmal edilebilir.',
      },
      {
        label: 'PK/PD Hedef Endeksi',
        value: 'AUC₂₄/MIC 400–600',
        detail: 'Bayesian yazılım veya 2-noktalı (pik + dip) denklemle hesaplanır (MIC = 1 mg/L varsayımı).',
      },
      {
        label: 'Oral Biyoyararlanım',
        value: '<%5 (İhmal edilebilir)',
        detail: 'Sistemik enfeksiyonlarda yalnızca IV kullanılır; oral form sadece C. difficile kolitindedir.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Vankomisine karşı belgelenmiş gerçek IgE-aracılı anafilaksi (bronkospazm, laringeal anjioödem, şok) veya ağır kütanöz reaksiyon (DRESS, SJS/TEN, lineer IgA büllöz dermatoz).',
        'IM (intramüsküler) uygulama — şiddetli ağrı ve doku nekrozu nedeniyle kesinlikle kontrendikedir.',
      ],
      relativeItems: [
        'Vankomisin İnfüzyon Reaksiyonu (eski Red Man) öyküsü — MUTLAK kontrendikasyon DEĞİLDİR! İnfüzyon hızını ≥2–3 saate uzatarak ve H₁/H₂ antihistaminik premedikasyonla güvenle verilebilir.',
        'Mevcut akut böbrek hasarı (ABH) veya eşzamanlı nefrotoksik ilaç kullanımı (piperasilin-tazobaktam, aminoglikozid, kolistin, amfoterisin B) — alternatif (teikoplanin/linezolid/daptomisin) veya sıkı AUC TDM gerekir.',
        'İşitme kaybı / ototoksik ilaç (loop diüretik, aminoglikozid) maruziyeti — ototoksisite izlemi gerekir.',
        'MSSA kesin tanısı — MSSA’da vankomisin inferior olduğundan derhal Sefazolin veya anti-stafilokokal penisiline de-eskalasyon yapılmalıdır.',
      ],
      clinicalNote:
        'Perioperatif rutin temiz cerrahi profilaksisinde (MRSA riski yoksa) Vankomisin kullanılması cerrahi alan enfeksiyonunu (özellikle MSSA) artırabilir ve VRE direncini seçer; beta-laktam alerjisi öyküsü mutlaka sorgulanıp doğrulanmalıdır.',
    },
    regimenCards: [
      {
        title: 'Perioperatif Cerrahi Profilaksi (MRSA / Protez / Ciddi β-Laktam Alerjisi)',
        setting: 'perioperative',
        badge: 'ASHP/IDSA Cerrahi Profilaksi',
        dose: '15 mg/kg IV (TBW; maks tek doz 2 g)',
        infusionDuration: 'En az 60 dk (1 g) – 120 dk (1,5–2 g) [≤10–15 mg/dk]',
        interval: 'Tek doz (insizyondan 60–120 dk önce başla)',
        note: 'İntraoperatif redozaj genelde gerekmez (cerrahi >6–8 saat sürerse veya >1500 mL kan kaybında ek doz değerlendirilir). Gram-negatif kapsam gerekiyorsa (örn. kolorektal/üroloji) aztreonam, aminoglikozid veya sefalosporin ile kombine edilir.',
      },
      {
        title: 'YBÜ Ağır Sepsis / Septik Şok / İnvaziv MRSA (Yükleme + İdame)',
        setting: 'icu',
        badge: 'ASHP/IDSA/PIDS/SIDP 2020',
        dose: 'Yükleme: 25–30 mg/kg TBW (maks 3 g) → İdame: 15–20 mg/kg TBW',
        infusionDuration: 'Yükleme ≥2–3 sa (≤10–15 mg/dk) • İdame ≥1–2 sa',
        interval: 'q8–12sa (eGFR ve AUC₂₄/MIC TDM’ye göre)',
        note: 'Böbrek yetmezliği olan septik şok hastasında dahi İLK YÜKLEME DOZU (25 mg/kg) tam verilir; yalnızca idame aralığı/dozu böbrek fonksiyonuna göre uyarlanır. Hedef AUC₂₄/MIC 400–600.',
      },
      {
        title: 'Ağır Clostridioides difficile Koliti (Fulminan YBÜ)',
        setting: 'special',
        badge: 'IDSA/SHEA C. difficile',
        dose: '125 mg PO/NG q6sa (Fulminan/ileus: 500 mg PO/NG q6sa + rektal retansiyon lavmanı 500 mg / 100 mL SF q6sa)',
        infusionDuration: 'Oral / Enteral / Rektal',
        interval: 'q6sa (10–14 gün; fulminan olguda IV Metronidazol 500 mg q8sa eklenir)',
        note: 'IV vankomisin kolonik lümene geçmez ve C. difficile tedavisinde ETKİSİZDİR! IV flakon sulandırılarak NG/oral veya rektal yoldan uygulanabilir.',
      },
      {
        title: 'YBÜ Sürekli İnfüzyon (Alternatif Strateji — Seçilmiş Merkezler)',
        setting: 'icu',
        badge: 'Seçilmiş YBÜ Protokolü',
        dose: 'Yükleme 15–20 mg/kg → 30–40 mg/kg/gün sürekli IV infüzyon',
        infusionDuration: '24 saat sürekli infüzyon (ayrı santral lümen)',
        interval: 'Sürekli (hedef kararlı durum Css 20–25 mg/L → AUC₂₄ 480–600)',
        note: 'Yüksek dağılım hacimli veya ARC (artmış renal klirens) YBÜ hastalarında dalgalanmayı ve nefrotoksisiteyi azaltabilir; ancak Y-site geçimsizliği nedeniyle ayrı santral lümen gerektirir.',
      },
    ],
    calculator: {
      defaultWeightKg: 80,
      weightScalar: 'TBW',
      secondaryScalar: {
        type: 'AdjBW',
        context: 'Morbid obezitede (BMI ≥40) yükleme 20–25 mg/kg TBW (maks 3 g), idame dozu Bayesian AUC₂₄/MIC TDM ile bireyselleştirilir',
      },
      obesityRationale:
        'Vankomisin hidrofilik olmasına rağmen obezitede hem dağılım hacmi (Vd) hem de glomerüler klirens arttığından yükleme ve başlangıç idame dozları Gerçek Vücut Ağırlığı (TBW) üzerinden hesaplanır; tek doz üst sınırları (yükleme ≤3 g, idame ≤2 g/doz) aşılmalıdır.',
      perioperative: {
        applicable: true,
        summaryTitle: 'Perioperatif Profilaksi (Yüksek MRSA Riski / Protez / Ciddi β-Laktam Alerjisi)',
        timingWindow: 'İnsizyondan 60–120 dk ÖNCE infüzyon başlanmalı',
        standardDoseLabel: '15 mg/kg IV (TBW; maks 2000 mg)',
        adultStandardDoseMg: 1000,
        highWeightThresholdKg: 80,
        highWeightDoseMg: 1500,
        weightBasedMgKg: 15,
        weightBasedMaxMg: 2000,
        pediatricMgKg: 15,
        pediatricMaxMg: 2000,
        infusionTimeText: '≤10–15 mg/dk (1 g ≥60 dk; 1,5 g ≥90 dk; 2 g ≥120 dk)',
        redoseHours: 8,
        bloodLossRedoseMl: 1500,
        clinicalNote:
          'Rutin profilakside sefazolin yerine KULLANILMAZ. 15 mg/kg (genelde 1–2 g) insizyondan 60–120 dk önce yavaşça başlanmalı; indüksiyonda hızlı verilmesi derin hipotansiyon ve kızarıklık (MRGPRX2) yapar.',
      },
      icu: {
        pkPdTarget: 'AUC₂₄/MIC 400–600 (MIC ≤1 mg/L varsayımı)',
        pkPdBadge: 'AUC/MIC Bağımlı',
        loadingDoseLabel: 'Ağır Sepsis / MRSA Yükleme (25–30 mg/kg TBW, maks 3 g)',
        loadingWeightBasedMgKg: 25,
        loadingMaxMg: 3000,
        loadingUnit: 'mg',
        loadingInfusionText: '2–3 saatte yavaş IV infüzyon (≤10–15 mg/dk; ≤5 mg/mL periferik)',
        maintenanceLabel: 'İdame Rejimi (TBW bazlı — ilk TDM 24–48. saatte)',
        maintenanceMode: 'weight_based_qinterval',
        weightOptions: [
          {
            id: 'vanc-std-q12',
            label: 'Standart Ağır Enfeksiyon (15 mg/kg q12sa)',
            mgPerKg: 15,
            maxSingleMg: 2000,
            intervalHours: 12,
            infusionHours: 1.5,
            diluentVolumeMl: 250,
            note: 'Normal böbrek fonksiyonunda (eGFR 60–110) başlangıç idame; 4. doz öncesi veya ilk 24–48 saatte AUC TDM ile uyarla.',
          },
          {
            id: 'vanc-arc-q8',
            label: 'YBÜ ARC / Genç Septik Şok (15 mg/kg q8sa)',
            mgPerKg: 15,
            maxSingleMg: 2000,
            intervalHours: 8,
            infusionHours: 1.5,
            diluentVolumeMl: 250,
            note: 'Artmış renal klirens (CrCl >130 mL/dk), yanık veya ağır travmada subterapötik AUC riskini önlemek için q8sa sıklık.',
          },
          {
            id: 'vanc-high-q12',
            label: 'Yüksek Doz / Menenjit-Pnömoni (20 mg/kg q12sa)',
            mgPerKg: 20,
            maxSingleMg: 2000,
            intervalHours: 12,
            infusionHours: 2,
            diluentVolumeMl: 500,
            note: 'SSS veya derin odaklı MRSA enfeksiyonlarında; nefrotoksisite riski nedeniyle erken Bayesian AUC izlemi zorunludur.',
          },
        ],
        tdmNote:
          '2020 ASHP/IDSA/PIDS/SIDP kılavuzu tek başına 15–20 mg/L trough (dip) izlemini artık ÖNERMEMEKTEDİR! Bayesian yazılım (1–2 örnek) veya 2-noktalı (infüzyon sonrası 1–2. sa pik + doz öncesi dip) ile AUC₂₄/MIC 400–600 hedeflenmelidir. AUC >600 nefrotoksisiteyi keskin biçimde artırır.',
      },
      renalTiers: [
        {
          id: 'vanc-egfr-90',
          label: 'Normal / ARC (eGFR ≥90)',
          egfrRange: '≥ 90 mL/dk',
          recommendation: 'Tam Yükleme + q8–12sa İdame',
          doseText: 'Yükleme 25–30 mg/kg → 15–20 mg/kg q8–12sa',
          note: 'CrCl >130 mL/dk (ARC) durumunda q8sa veya sürekli infüzyon gerekebilir.',
          tone: 'emerald',
        },
        {
          id: 'vanc-egfr-50',
          label: 'Hafif-Orta Böbrek Yetmezliği',
          egfrRange: '50–89 mL/dk',
          recommendation: 'Tam Yükleme + q12sa İdame',
          doseText: 'Yükleme 25 mg/kg → 15 mg/kg q12sa',
          note: 'Erken AUC/TDM ile doz aralığı veya miktarı bireyselleştirilir.',
          tone: 'emerald',
        },
        {
          id: 'vanc-egfr-30',
          label: 'Orta-İleri Böbrek Yetmezliği',
          egfrRange: '30–49 mL/dk',
          recommendation: 'Tam Yükleme + q24sa İdame',
          doseText: 'Yükleme 25 mg/kg → 15 mg/kg q24sa',
          note: '24. saatte serum düzeyi ölçülerek birikim önlenmelidir.',
          tone: 'amber',
        },
        {
          id: 'vanc-egfr-15',
          label: 'Ağır Böbrek Yetmezliği / ABH',
          egfrRange: '< 30 mL/dk',
          recommendation: 'Tam Yükleme + Düzeye Göre Redozaj',
          doseText: 'Yükleme 25 mg/kg → 15 mg/kg q48sa veya düzey <15 mg/L olduğunda',
          note: 'İnstabil ABH’de sabit protokol yerine 24–48 saatte bir rastgele düzey takibi ile "dose-by-level" en güvenli yöntemdir.',
          tone: 'rose',
        },
        {
          id: 'vanc-crrt',
          label: 'CRRT (CVVHDF / CVVH)',
          egfrRange: 'Effluent 20–35 mL/kg/sa',
          recommendation: 'Tam Yükleme + Orta Sıklıkta İdame + TDM',
          doseText: 'Yükleme 25 mg/kg → 7,5–10 mg/kg q12sa (veya 15 mg/kg q24sa)',
          note: 'Yüksek effluent hızında (>30 mL/kg/sa) klirens artar; 24 saat içinde TDM alınmalıdır.',
          tone: 'sky',
        },
      ],
      crrtSummary:
        'Vankomisin CRRT membranlarından (yüksek geçirgenlikli) anlamlı düzeyde temizlenir. Yükleme 20–25 mg/kg TBW verilir; ardından 7,5–10 mg/kg q12sa (veya 15 mg/kg q24sa) başlanıp 24 saat içinde serum düzeyi/AUC ile titre edilir.',
      hdSummary:
        'Yüksek akımlı (high-flux) hemodiyaliz seans başına %30–50 vankomisin temizler. Yükleme 25 mg/kg (maks 2,5–3 g) sonrası her HD seansı bitiminde (veya son 1 saatinde) 7,5–10 mg/kg (genelde 500–1000 mg) uygulanır; pre-HD düzey hedefi 15–20 mg/L’dir.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Vancotek® / Edicin® 500 mg Flakon',
          presentation: '500 mg liyofilize toz içeren IV flakon',
          concentration: '10 mL steril su ile sulandırıldığında 50 mg/mL (mutlaka ileri seyreltme gerekir!)',
          saltOrBaseNote: 'Vankomisin HCl (500 mg baza eşdeğer). Sulandırılmış konsantre ASLA direkt verilmez.',
          alertLevel: 'high',
        },
        {
          name: 'Vancotek® / Edicin® 1 g (1000 mg) Flakon',
          presentation: '1000 mg liyofilize toz içeren IV flakon',
          concentration: '20 mL steril su ile sulandırıldığında 50 mg/mL → en az 200–250 mL SF/D5W içine eklenmelidir',
          saltOrBaseNote: 'Periferik damar için nihai derişim ≤5 mg/mL olmalıdır (1 g → ≥200–250 mL).',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        '500 mg flakon → en az 100 mL %0,9 NaCl veya %5 Dekstroz (5 mg/mL) — ≥60 dk infüzyon.',
        '1000 mg flakon → en az 200–250 mL %0,9 NaCl veya %5 Dekstroz (4–5 mg/mL) — ≥60–90 dk infüzyon.',
        '1500–2000 mg doz → 500 mL %0,9 NaCl veya %5 Dekstroz (3–4 mg/mL) — ≥120–150 dk infüzyon.',
        'Sıvı kısıtlamalı YBÜ hastasında YALNIZCA santral venöz kateterden en fazla 10 mg/mL konsantrasyon kullanılabilir.',
      ],
      concentrationTrapWarning:
        'KONSANTRASYON & HIZ TUZAĞI: 1 g vankomisini 100 mL torbaya koyup periferik damardan vermek (10 mg/mL) ciddi kimyasal flebit ve ekstravazasyon nekrozuna yol açar; 30 dk gibi kısa sürede göndermek ise ağır MRGPRX2 Vankomisin İnfüzyon Reaksiyonu ve hipotansiyon yaratır!',
    },
    compatibility: {
      accessRequirement: 'central-preferred',
      accessSummary:
        'Periferik venden yalnızca ≤5 mg/mL konsantrasyonda ve geniş kalibreli kateterle kısa süreli verilebilir; çoklu/uzun süreli YBÜ tedavisi veya >5 mg/mL (≤10 mg/mL) konsantrasyon için santral venöz kateter tercih edilir.',
      phRange: 'pH 2,5 – 4,5 (Güçlü asidik — yüksek venöz irritasyon ve geçimsizlik potansiyeli)',
      osmolalityNote: '5 mg/mL SF çözeltisi ~290–310 mOsm/kg (izoozmolar ancak düşük pH nedeniyle irritandır).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Laktatlı Ringer (LR)'],
      ySiteCompatible: [
        'Amiodaron (düşük derişimde kontrol et)',
        'Fentanil',
        'Midazolam',
        'Morfin',
        'Norepinefrin (konsantrasyona bağlı kontrol)',
        'İnsülin (regüler)',
        'Magnezyum sülfat',
        'Potasyum klorür',
      ],
      ySiteIncompatible: [
        'Piperasilin-Tazobaktam (çökme — aynı Y-hattından ASLA verilmez!)',
        'Sefepim / Seftazidim / Seftriakson / Sefazolin (β-laktamların çoğuyla geçimsiz)',
        'Heparin (yüksek derişimde bulanıklık/çökme)',
        'Propofol',
        'Furosemid',
        'Pantoprazol / Omeprazol',
        'Sodyum bikarbonat',
        'Albümin / Fenitoin / Valproat',
      ],
      stabilityNote:
        'Sulandırılmış flakon buzdolabında (2–8°C) 14 gün stabil kalabilir; SF/D5W içinde seyreltilmiş infüzyon çözeltisi oda sıcaklığında 24 saat, buzdolabında 96 saat (üreticiye göre 7–14 gün) stabildir.',
      extravasationProtocol:
        'Düşük pH nedeniyle vezikan/irritan özellik gösterir. Ekstravazasyonda infüzyonu hemen durdur, kanülden aspire et, ekstremiteyi eleve et, soğuk veya ılık kompres (lokal protokole göre) uygula; geniş doku infiltrasyonunda plastik cerrahi değerlendirmesi iste ve hiyalüronidaz seçeneğini değerlendir.',
    },
    organImpairment: {
      renalSummary:
        'Eliminasyonun >%80–90’ı glomerüler filtrasyona bağlıdır; böbrek yetmezliğinde idame aralığı/dozu mutlaka azaltılmalı, ancak ağır sepsiste İLK YÜKLEME DOZU (25 mg/kg) korunmalıdır.',
      renalDetails: [
        'ABH geliştiğinde (kreatinin ≥0,3 mg/dL veya ≥%50 artış) sıradaki idame dozu bekletilip serum düzeyi görülmelidir.',
        'Sürekli vankomisin + piperasilin-tazobaktam maruziyetinde 3. günden itibaren ABH riski belirgin yükselir; mümkünse sefepim/meropenem tercih edilir.',
        'Artmış renal klirens (ARC; eGFR >130 mL/dk) olan genç travma/sepsis hastalarında standart q12sa dozlar yetersiz AUC oluşturur → q8sa veya sürekli infüzyon gerekir.',
      ],
      hepaticSummary:
        'Minimal hepatik metabolizma nedeniyle karaciğer yetmezliğinde primer doz ayarlaması gerekmez; ancak sirozda assit/hipoalbüminemi nedeniyle Vd değişir ve böbrek fonksiyonu (kreatinin düşük ölçülür!) abartılabilir.',
      hepaticDetails: [
        'Siroz/Child-Pugh C hastalarında kas kitlesi azlığı nedeniyle serum kreatinini normal görünse bile gerçek GFR düşüktür; TDM olmadan yüksek doz idameden kaçınılmalıdır.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: eGFR Azalmasına Göre Aralık Uzatma + Sıkı TDM',
      geriatricPoints: [
        'Yaşlılarda azalmış GFR ve kas kitlesi nedeniyle serum kreatinini gerçek böbrek fonksiyonunu gizleyebilir; idame aralığı genelde q12–24sa olacak şekilde konservatif başlanır.',
        'Ototoksisite ve nefrotoksisite riski yaşlılarda ve eşzamanlı furosemid alanlarda belirgin yüksektir.',
      ],
      obesityWeightScalarBadge: 'TBW (Yükleme 20–25 mg/kg, maks 3 g) + Bayesian AUC TDM',
      obesityPoints: [
        'Obez hastalarda (BMI ≥30–40) dağılım hacmi ve renal klirens birlikte arttığından TBW kullanılır; ancak tek yükleme dozu 3000 mg’ı, idame tek dozu 2000 mg’ı aşmamalıdır.',
        'Morbid obezitede sabit 15 mg/kg q12sa rejimi 3–4 gün içinde toksik AUC (>600) birikimine yol açabilir → ilk 24–48 saatte 2-noktalı AUC TDM zorunludur.',
        'Perioperatif profilakside 15 mg/kg TBW (maks 2000 mg) insizyondan 120 dk önce başlanır.',
      ],
      clinicalNote:
        'Obez ve yaşlı YBÜ hastalarında en sık hata ya çok düşük (sabit 1 g q12sa → subterapötik) ya da TDM’siz aşırı biriken (trough >25 → ABH) dozlamadır.',
    },
    pregnancyLactation: {
      pregnancySummary:
        'Sistemik MRSA enfeksiyonlarında ve penisilin-alerjik Grup B Streptokok (GBS) intrapartum profilaksisinde gebelikte güvenle kullanılabilir (eski FDA Kategori C; prospektif insan verilerinde teratojenite/fetal ototoksisite saptanmamıştır).',
      pregnancyDetails: [
        'Gebelikte artmış GFR ve plazma hacmi nedeniyle klirens artar; terapötik AUC/MIC için sık TDM gerekir.',
        'İntrapartum GBS profilaksisi (klindamisine dirençli izolat + yüksek anafilaksi riskli penisilin alerjisinde): 20 mg/kg IV q8sa (maks 2 g/doz).',
        'Maternal hipotansiyondan kaçınmak için infüzyon mutlaka yavaş (≤10–15 mg/dk) yapılmalıdır.',
      ],
      lactationSummary: 'Emzirme ile uyumludur; anne sütüne sınırlı geçer ve bebeğin GİS kanalından emilimi yok denecek kadar azdır.',
      lactationDetails: [
        'Süte geçen düşük miktar bebeğin bağırsak florasında hafif değişiklik (ishal/pamukçuk) yapabilir; sistemik toksisite beklenmez.',
      ],
    },
    adverseEffects: [
      {
        title: 'Vankomisin İnfüzyon Reaksiyonu (eski Red Man)',
        incidenceOrSeverity: '%5–47 • Hız Bağımlı',
        detail:
          'MRGPRX2 reseptörü üzerinden IgE-bağımsız direkt mast hücre histamin salınımı. Yüz/boyun/üst gövdede eritem, kaşıntı, hipotansiyon, göğüs kas spazmı. İnfüzyonu ≥2 saate yavaşlat + H₁/H₂ ver.',
        tone: 'amber',
      },
      {
        title: 'Akut Böbrek Hasarı (Nefrotoksisite)',
        incidenceOrSeverity: '%5–40 • Doz/AUC Bağımlı',
        detail:
          'Proksimal tübüler oksidatif stres, akut tübüler nekroz ve vankomisin kast nefropatisi. AUC >600, trough >20 mg/L ve piperasilin-tazobaktam kombinasyonu riski katlar.',
        tone: 'rose',
      },
      {
        title: 'Ototoksisite (Koklear Hasar)',
        incidenceOrSeverity: '%1–3 • Yüksek Pik/Uzun Tedavi',
        detail:
          'Tinnitus, yüksek frekanslı sensörinöral işitme kaybı; genelde geri dönüşlü olsa da aminoglikozid veya yüksek doz furosemid ile birlikte kalıcı olabilir.',
        tone: 'indigo',
      },
      {
        title: 'Hematolojik & Kütanöz Reaksiyonlar',
        incidenceOrSeverity: 'Nadir ama Ciddi',
        detail:
          'İmmün aracılı ağır trombositopeni (ilaç-bağımlı anti-trombosit antikorlar → derin kanama), uzun tedavide nötropeni (>2 hafta), DRESS ve lineer IgA büllöz dermatoz.',
        tone: 'rose',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Ameliyathane İndüksiyonu ile Eşzamanlı İnfüzyon',
        detail:
          'Genel anestezi indüksiyonu (propofol + nöromüsküler bloker) ile aynı anda vankomisin infüzyonu yapılması histamin salınımı ve vazodilatasyon sinerjisiyle ağır refrakter hipotansiyona yol açar; ayırıcı tanıda anafilaksi ile karışır.',
      },
      {
        title: 'Vankomisin + Piperasilin-Tazobaktam (ABH Riski)',
        detail:
          'Geniş meta-analizler bu kombinasyonun vankomisin + sefepim/meropeneme kıyasla ABH riskini 2–3 kat artırdığını göstermiştir (kısmen OAT1/3 kreatinin sekresyon bloğu + gerçek tübüler hasar). Mümkünse β-laktam partnerini değiştirin.',
      },
      {
        title: 'İmmün Trombositopeni Şüphesi',
        detail:
          'Vankomisin başlandıktan 6–10 gün sonra (önceden maruziyet varsa 24 saat içinde!) trombositlerin hızla <20.000/µL’ye düşmesi ilaca bağlı immün trombositopeniyi düşündürür; transfüzyona yanıtsızdır ve ilaç derhal kesilmelidir.',
      },
      {
        title: 'MSSA De-eskalasyon Zorunluluğu',
        detail:
          'Kan kültüründe MSSA ürediği an vankomisin kesilip Sefazolin’e geçilmelidir; MSSA bakteriyemisinde vankomisin ile devam edilmesi mortaliteyi ve relapsı anlamlı şekilde artırır.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — Peptidoglikan D-Ala-D-Ala Kompleksi & Sterik Engelleme',
        summary:
          'Vankomisin, aglikon heptapeptid çekirdeği aracılığıyla bakteri hücre duvarı öncüsü Lipid II’nin terminal D-alanil-D-alanin ucunu beş hidrojen bağı ile kavrayarak "moleküler kapak" oluşturur.',
        points: [
          'Büyük glikopeptid yapısı (~1450 Da), transglikozilaz ve transpeptidaz (PBP) enzimlerinin substrata erişimini sterik olarak engeller; bu sayede β-laktam dirençli PBP2a (MRSA) varlığında dahi aktivite korunur.',
          'Gram-negatif bakterilerin dış membran lipopolisakkarit bariyeri ve dar OmpF/OmpC porinleri bu dev molekülü geçirmediğinden spektrum kesin olarak Gram-pozitiflerle sınırlıdır.',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — Duvar Bütünlüğü Kaybı, Proksimal Tübüler ROS & MRGPRX2',
        summary:
          'Bakteride duvar sentezinin durması ozmotik stres ve otolizin aktivasyonuyla ölüme giderken, konak hücrede iki farklı hedef dışı yolak (MRGPRX2 ve megalin/mitokondri) toksisiteyi belirler.',
        points: [
          'Konak Mast Hücreleri: Vankomisin, mast hücre yüzeyindeki Mas-ilişkili G-protein kenetli reseptör X2’yi (MRGPRX2) doğrudan uyararak Gi/Gq-PLCβ-IP₃-Ca²⁺ kaskadıyla IgE’siz histamin/triptaz degranülasyonu tetikler.',
          'Proksimal Tübül Hücreleri: Apikal endositozla tübüler epitele giren vankomisin, mitokondriyal elektron transport zincirini bozarak aşırı reaktif oksijen türleri (ROS), apoptoz ve üromodülin ile intratübüler vankomisin kastları oluşturur.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Kardiyovasküler & Mikrosirkülasyon',
          tissueTarget: 'Mast Hücresi / Vasküler Endotel',
          accent: 'rose',
          points: [
            'Hızlı infüzyonda sistemik histamin salınımı H₁/H₂ aracılı arteriyoler vazodilatasyon, SVR düşüşü ve kapiller geçirgenlik artışı ile derin hipotansiyona yol açar.',
            'Anestezi altındaki hastada sempatik refleks baskılandığından küçük histamin pikleri dahi belirgin kollaps yapabilir.',
          ],
        },
        {
          systemTitle: 'Renal Sistem (Nefron)',
          tissueTarget: 'Proksimal Konvolüt Tübül',
          accent: 'amber',
          points: [
            'Nefrotoksisite AUC₂₄ >600–650 mg·sa/L eşiğinin üzerinde üstel olarak artar.',
            'Hem direkt tübüler epitel toksisitesi hem de tübül lümeninde obstrüktif vankomisin-üromodülin silendirleri (cast nephropathy) ABH patogenezinde rol oynar.',
          ],
        },
        {
          systemTitle: 'Pulmoner & SSS Doku Penetrasyonu',
          tissueTarget: 'Alveoler ELF / Kan-Beyin Bariyeri',
          accent: 'indigo',
          points: [
            'Akciğer epitelyal sıvısına (ELF) geçiş düşüktür (%20–40); MRSA pnömonisinde yavaş bakterisidal aktivite nedeniyle yükleme ve optimal AUC şarttır (MİK ≥1,5–2 ise Linezolid avantajlıdır).',
            'Normal meninkslere geçiş < %5 iken bakteriyel menenjitte inflamasyonla %15–30’a çıkar; deksametazon inflamasyonu azalttığından yüksek hedef AUC gerekir.',
          ],
        },
        {
          systemTitle: 'İç Kulak (Koklea)',
          tissueTarget: 'Stria Vascularis / Tüy Hücreleri',
          accent: 'teal',
          points: [
            'Endolenf kompartmanında birikim ve oksidatif hasar özellikle yüksek pik konsantrasyonlarında (>40–50 mg/L) ve eşzamanlı loop diüretik/aminoglikozid varlığında ototoksisite riskini artırır.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — Kinetik Tavan, Kombinasyon Sinerjisi & Klinik Tuzaklar',
        summary:
          'Vankomisin yavaş bakterisidaldir; AUC₂₄/MIC 400–600 dar terapötik penceresi dışında etkinlik artmaz, yalnızca nefrotoksisite tırmanır.',
        points: [
          'Tavan Etkisi & Dar Pencere: AUC₂₄/MIC >600 hedeflenmesi MRSA klirensini anlamlı artırmazken ABH riskini 2–4 kat yükseltir.',
          'MRSA MİK ≥2 mg/L: Bu eşikte AUC/MIC ≥400 için AUC ≥800 gerekir ki kabul edilemez nefrotoksisite demektir → alternatif ajana (Daptomisin/Linezolid/Seftarolin) geçilir.',
          'Vankomisin + Gentamisin: Enterokok veya protez kapak MRSA endokarditinde hücre duvarı hasarı aminoglikozidin hücre içi girişini artırarak sinerji sağlar (ancak nefrotoksisite yakından izlenmelidir).',
        ],
      },
      clinicalPearls: [
        'İnsizyondan 60–120 dk önce başlamayan vankomisin cerrahi profilaksi değildir; ameliyat odasında hızlı gönderilen vankomisin ise iyatrojenik şok sebebidir.',
        '2020 kılavuzundan beri hedef "trough 15–20" değil, "AUC₂₄/MIC 400–600"tür; birçok hastada trough 11–14 mg/L iken AUC zaten 450–550’dir!',
        'Kültür MSSA geldiği gün vankomisini Sefazolin’e çevirmek hayat kurtarır.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Vankomisin',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Piperasilin-Tazobaktam',
          mechanism: 'Additif/sinerjik proksimal tübüler toksisite ve renal kreatinin transportu (OAT1/3) etkileşimi.',
          clinicalEffect: 'Vankomisin + Sefepim/Meropenem kombinasyonuna kıyasla akut böbrek hasarı (ABH) insidansında 2–3 kat artış.',
          management: 'Ampirik anti-psödomonal eşlikçi olarak mümkünse Sefepim veya Meropenem tercih et; zorunlu birlikte kullanımda günlük kreatinin/idrar çıkışı ve AUC TDM uygula.',
        },
        {
          severity: 'D',
          agent: 'Aminoglikozidler (Amikasin, Gentamisin) / Polimiksinler / Amfoterisin B',
          mechanism: 'Ortak proksimal tübüler birikim ve koklear tüy hücresi oksidatif hasarı.',
          clinicalEffect: 'Şiddetli nefrotoksisite ve kalıcı ototoksisite riskinde belirgin artış.',
          management: 'Kombinasyon süresini en kısa tut; her iki ajan için sıkı TDM (vankomisin AUC, amikasin dip) ve günlük böbrek fonksiyon takibi yap.',
        },
        {
          severity: 'C',
          agent: 'Anestezikler (Propofol, İnhalasyon Ajanları, Opioids) & Atrakuryum/Mivakuryum',
          mechanism: 'Eşzamanlı histamin salınımı (MRGPRX2) ve genel anesteziklerin baroreseptör/vazomotor baskılaması.',
          clinicalEffect: 'İndüksiyon veya intraoperatif dönemde ağır hipotansiyon, flushing ve bronkospazm.',
          management: 'Vankomisin infüzyonunu anestezi indüksiyonundan en az 60–120 dk önce başlat ve yavaş hızda (≤10 mg/dk) sürdür.',
        },
        {
          severity: 'C',
          agent: 'Non-Depolarizan Nöromüsküler Blokerler (Rokuronyum, Vekuronyum)',
          mechanism: 'Nöromüsküler kavşakta presinaptik/postsinaptik iletimin hafif inhibisyonu.',
          clinicalEffect: 'Nöromüsküler blok süresinde uzama ve rezidüel kürarizasyon riski.',
          management: 'Kantitatif TOF monitörizasyonu kullan; ekstübasyon öncesi TOF oranının ≥0,90 olduğunu doğrula.',
        },
        {
          severity: 'C',
          agent: 'Loop Diüretikler (Furosemid)',
          mechanism: 'Renal perfüzyon azalması ve stria vascularis düzeyinde aditif ototoksisite.',
          clinicalEffect: 'Artmış nefrotoksisite ve işitme kaybı riski.',
          management: 'İntravasküler hacmi koru; yüksek doz furosemid ile birlikte vankomisin düzeylerini yakından izle.',
        },
      ],
      references: [
        {
          authors: 'Rybak MJ, Le J, Lodise TP, Levine DP, Bradley JS, Liu C, et al.',
          title: 'Therapeutic monitoring of vancomycin for serious methicillin-resistant Staphylococcus aureus infections: A revised consensus guideline and review by the ASHP, IDSA, PIDS, and SIDP',
          journal: 'American Journal of Health-System Pharmacy',
          year: 2020,
          note: '25–30 mg/kg TBW yükleme ve AUC₂₄/MIC 400–600 hedefinin (trough yerine) küresel altın standart kılavuzu.',
        },
        {
          authors: 'Bratzler DW, Dellinger EP, Olsen KM, Perl TM, Auwaerter PG, Bolon MK, et al.',
          title: 'Clinical practice guidelines for antimicrobial prophylaxis in surgery',
          journal: 'American Journal of Health-System Pharmacy',
          year: 2013,
          note: 'Perioperatif vankomisin endikasyonları (15 mg/kg, insizyondan 60–120 dk önce başlama).',
        },
        {
          authors: 'Azimi E, Reddy VB, Lerner EA.',
          title: 'Brief communication: MRGPRX2, atopic dermatitis, and red man syndrome',
          journal: 'Itch (Phila)',
          year: 2017,
          note: 'Vankomisin infüzyon reaksiyonunun IgE-bağımsız MRGPRX2 mast hücre reseptörü mekanizması.',
        },
        {
          authors: 'Luther MK, Timbrook TT, Caffrey AR, Dosa D, Lodise TP, LaPlante KL.',
          title: 'Vancomycin plus piperacillin-tazobactam and acute kidney injury in adults: A systematic review and meta-analysis',
          journal: 'Critical Care Medicine',
          year: 2018,
          note: 'Vankomisin + piperasilin-tazobaktam kombinasyonunun artmış ABH riski kanıtı.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/monograph/vancomycin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },

  // ============================================================================
  // 2. TEİKOPLANİN (TEICOPLANIN)
  // ============================================================================
  {
    id: 'teicoplanin',
    classTag: 'glycopeptide_lipopeptide',
    accentColor: 'purple',
    atcCode: 'J01XA02',
    classLabel: 'Uzun Etkili Lipoglikopeptid Antibiyotik (Türkiye YBÜ & Ortopedi Pratiği)',
    tradeNamesTr: 'Targocid® 200 mg / 400 mg, Tekoplan® 200 mg / 400 mg, Teikopol® 400 mg flakon',
    title: 'Teikoplanin (Teicoplanin) — Kritik q12sa Yükleme, YBÜ MRSA & Protez Profilaksisi Monografisi',
    cardTitle: 'Teikoplanin (IV/IM)',
    cardBadge: 'Kritik q12sa × 3–5 Yükleme',
    cardCategoryLabel: 'Glikopeptid • Uzun t½',
    cardShortDesc:
      'Vankomisine göre daha az nefrotoksik, infüzyon reaksiyonu nadir ve IV bolus/IM verilebilen glikopeptid. 70–160 saatlik yarı ömrü nedeniyle ilk 3–5 q12sa yükleme dozu HAYATİDİR!',
    cardHighlights: [
      {
        label: 'Ağır YBÜ Yükleme',
        value: '12 mg/kg q12sa ×3–5',
        subtext: '~800 mg q12sa → q24sa idame',
        tooltip: 'Yükleme atlanırsa terapötik düzeye 1–2 haftada ulaşılamaz!',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'Perioperatif Protez',
        value: '400–800 mg Tek Doz',
        subtext: '3–5 dk bolus / 30 dk • Redozaj yok',
        tooltip: 'Çok uzun yarı ömrü sayesinde intraoperatif redozaj genelde gerekmez',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'Vankomisine Avantaj',
        value: '↓ Nefrotoksisite',
        subtext: 'MRGPRX2 nadir • IV Bolus / IM',
        tooltip: 'Vankomisinden daha güvenli renal ve hemodinamik profil',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'Hazırlama Tuzağı',
        value: 'ÇALKALAMA!',
        subtext: 'Köpürürse 15 dk beklet',
        tooltip: 'Kuvvetli çalkalama köpürme ve doz kaybı yapar; yavaşça döndür',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['Teicoplanin', 'Teikoplanin', 'Targocid', 'Tekoplan', 'Teikopol'],
    searchKeywords: [
      'teikoplanin',
      'teicoplanin',
      'targocid',
      'tekoplan',
      'glikopeptid',
      'mrsa',
      'yükleme dozu',
      'ortopedi profilaksi',
      'protez',
      'köpürme',
      'trough',
      'nefrotoksisite',
    ],
    highAlert: {
      tallManName: 'TEİKOplanin (teicoPLANIN)',
      confusionRiskWith:
        'Tigesiklin (tigecycline), Tikarsilin veya Targocid 200 mg vs 400 mg flakon güçlerinin karıştırılması.',
      criticalAlerts: [
        'KRİTİK YÜKLEME KURALI (t½ 70–160 SAAT!): İlk 3–5 doz q12sa olarak verilmezse (doğrudan günde tek doz 400 mg başlanırsa) kararlı durum terapötik düzeyine günlerce/haftalarca ulaşılamaz ve septik hasta kaybedilebilir!',
        'YETERSİZ DOZ TUZAĞI: Ağır YBÜ sepsis, MRSA bakteriyemi, endokardit ve kemik-eklem enfeksiyonlarında eski 400 mg (6 mg/kg) rejimi YETERSİZDİR → 12 mg/kg (~800 mg) q12sa × 3–5 yükleme → 12 mg/kg q24sa (hedef trough >20–30 mg/L) şarttır!',
        'BÖBREK YETMEZLİĞİNDE İLK 4 GÜN DOZ AZALTILMAZ: Böbrek yetmezliğinde dahi ilk 3–4 günlük yükleme fazı TAM DOZ verilir; doz azaltması ancak 4. günden itibaren başlar!',
        'ÇALKALAMA → KÖPÜRME TUZAĞI: Sulandırırken flakon ASLA kuvvetlice çalkalanmaz; yoğun köpürme ilacın enjektöre tam çekilmesini engeller (köpürürse 15 dk beklet).',
      ],
      antidoteOrRescue:
        'Spesifik antidot yoktur. Yüksek plazma protein bağlanması (%90–95) ve büyük molekül ağırlığı (~1880 Da) nedeniyle hemodiyaliz veya periton diyalizi ile anlamlı olarak uzaklaştırılamaz; toksisite veya anafilaksi geliştiğinde ilaç kesilir ve destek tedavisi (anafilakside adrenalin + sıvı + steroid) uygulanır.',
    },
    identitySummary:
      'Teikoplanin, Actinoplanes teichomyceticus’tan elde edilen, lipofilik yağ asidi yan zincirine sahip uzun etkili bir glikopeptid (lipoglikopeptid) antibiyotiktir. Türkiye yoğun bakım ve ortopedi/kalp-damar cerrahisi pratiğinde çok yaygın kullanılır. Vankomisin ile benzer Gram-pozitif (MRSA, Enterokok) spektruma sahiptir; ancak çok daha düşük nefrotoksisite, nadir histamin/infüzyon reaksiyonu, 3–5 dakikalık IV bolus veya IM uygulanabilme kolaylığı ve çok uzun yarı ömrü (70–160 saat) ile öne çıkar.',
    spectrumHighlights: [
      {
        title: 'Güçlü Kapsama (Gram-Pozitifler)',
        detail:
          'MRSA, MSSA (β-laktamlara göre ikinci seçenek), Streptococcus spp., Enterococcus faecalis/faecium (VRE VanA dışı), Corynebacterium spp., Listeria monocytogenes, Clostridioides difficile (oral kullanım mevcuttur).',
        tone: 'emerald',
      },
      {
        title: 'Koagülaz-Negatif Stafilokok & VanB Uyarısı',
        detail:
          'Bazı S. haemolyticus ve S. epidermidis izolatları teikoplanine vankomisinden daha yüksek MİK (heterodirenç) gösterebilir; antibiyogram teyidi şarttır. VanB tipi VRE izolatlarının bir kısmı in vitro duyarlı görünse de monoterapide hızla direnç gelişir.',
        tone: 'amber',
      },
      {
        title: 'Doğal Direnç / Kapsam Dışı',
        detail:
          'Tüm Gram-negatif bakteriler, VanA fenotipli VRE, atipik bakteriler ve mantarlar. BOS geçişi çok düşük olduğundan (%0–10, menenjitte bile değişken) bakteriyel menenjit tedavisinde tercih EDİLMEZ.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Vankomisine benzer biçimde Gram-pozitif bakteri hücre duvarı peptidoglikan öncüllerinin D-Ala-D-Ala ucuna bağlanarak hücre duvarı sentezini bloke eder. Ek olarak taşıdığı lipofilik yağ asidi zinciri sayesinde bakteri sitoplazmik membranına demirlenir; bu özellik hem bakteriyel hedefe yakınlığı artırır hem de çok yüksek plazma protein bağlanması (%90–95) ve 70–160 saatlik aşırı uzun yarı ömre neden olur.',
    mechanismPillars: [
      {
        title: 'Lipofilik Membran Demirlemesi + D-Ala-D-Ala Blokajı',
        detail:
          'Peptidoglikan polimerizasyonunu inhibe ederken hidrofobik alkil zinciri ile bakteri membranına tutunur; bu mekanizma doku penetrasyonunu (özellikle kemik ve eklem sıvısı) belirgin biçimde güçlendirir.',
      },
      {
        title: 'Yüksek Albümin Bağlanması & Dev Yarı Ömür (t½ 70–160 sa)',
        detail:
          '%90–95 albümine bağlandığından yavaş glomerüler filtrasyona uğrar. Yükleme dozu olmadan günde tek doz başlanması halinde kararlı duruma (5×t½) ulaşmak haftalar sürer — q12sa × 3–5 yükleme zorunludur.',
      },
      {
        title: 'Düşük MRGPRX2 Aktivasyonu & Tübüler Güvenlik',
        detail:
          'Vankomisine kıyasla mast hücre MRGPRX2 reseptörünü belirgin derecede daha az uyarır (Red Man sendromu nadir) ve proksimal tübüler oksidatif hasar/nefrotoksisite oranı anlamlı ölçüde düşüktür.',
      },
    ],
    pkCards: [
      {
        label: 'Eliminasyon Yarı Ömrü (t½)',
        value: '70–160 saat',
        detail: 'Çok uzun terminal yarı ömür → günde tek doz idame ve intraop redozaj gerektirmeyen profilaksi avantajı.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%90–95 (Albümin)',
        detail: 'Ağır hipoalbüminemik YBÜ hastalarında serbest fraksiyon artar; Vd genişler ve klirens hızlanır.',
      },
      {
        label: 'Dağılım Hacmi (Vd)',
        value: '0,9–1,6 L/kg',
        detail: 'Kemik, sinovyal sıvı, miyokard, plevra ve cilde yüksek geçiş; BOS geçişi zayıftır.',
      },
      {
        label: 'Atılım Yolu',
        value: '>%80 Renal (Yavaş)',
        detail: 'Değişmeden idrarla atılır; hemodiyalizle anlamlı klirensi yoktur.',
      },
      {
        label: 'Hedef Trough (Dip) Düzeyi',
        value: '>15–30 mg/L',
        detail: 'Standart >15 mg/L; ağır MRSA/sepsis/kemik >20 mg/L; endokardit 30–40 mg/L (4–5. günde ölç).',
      },
      {
        label: 'Uygulama Yolları',
        value: 'IV Bolus / İnfüzyon / IM',
        detail: '3–5 dk yavaş IV bolus, 30 dk IV infüzyon veya derin IM (400 mg’a kadar) uygulanabilir.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Teikoplanine karşı belgelenmiş aşırı duyarlılık / anafilaksi veya ağır kütanöz reaksiyon (SJS/TEN, DRESS, AGEP).',
      ],
      relativeItems: [
        'Vankomisin alerjisi öyküsü — yapısal benzerlik nedeniyle çapraz reaksiyon (özellikle IgE anafilaksi veya vankomisine bağlı DRESS/nötropeni öyküsünde) bildirilmiştir; ancak vankomisin "Red Man" (infüzyon reaksiyonu) öyküsünde teikoplanin genelde güvenle tolere edilir!',
        'Bakteriyel menenjit / SSS enfeksiyonları — BOS penetrasyonu yetersiz olduğundan tercih edilmez.',
        'MSSA kesin enfeksiyonu — Sefazolin/anti-stafilokokal β-laktam üstündür.',
        'Koagülopati / antikoagülan kullanımı — IM enjeksiyondan kaçınılır (IV yol seçilir).',
      ],
      clinicalNote:
        'Teikoplanin "vankomisinin yerine aynı dozla (örn. 400 mg q24sa)" başlandığında ağır YBÜ sepsiste klinik başarısızlığa uğrar; yüksek yükleme rejimi (12 mg/kg q12sa × 3–5 doz) olmazsa olmazdır.',
    },
    regimenCards: [
      {
        title: 'Perioperatif Ortopedik Protez / Kardiyak / MRSA Profilaksisi',
        setting: 'perioperative',
        badge: 'TR & Avrupa Pratiği',
        dose: '400–800 mg (6–12 mg/kg) IV tek doz',
        infusionDuration: '3–5 dk yavaş IV bolus veya 30 dk IV infüzyon',
        interval: 'Tek doz (indüksiyondan 30–60 dk önce) — İntraop redozaj GENELDE GEREKMEZ',
        note: 'Vankomisinin aksine 60–120 dk önceden başlama zorunluluğu yoktur; indüksiyon öncesi 30 dk içinde hızla verilebilir ve uzun yarı ömrü sayesinde uzun ortopedik/kardiyak vakalarda ek doz gerektirmez (masif >1500 mL kanama hariç).',
      },
      {
        title: 'Ağır YBÜ Sepsis / MRSA Bakteriyemi / Endokardit / Kemik-Eklem',
        setting: 'icu',
        badge: 'Yüksek Doz Yükleme (EMA/TİTCK)',
        dose: 'Yükleme: 12 mg/kg (~800 mg) q12sa × 3–5 doz → İdame: 12 mg/kg (~800 mg) q24sa',
        infusionDuration: '30 dk IV infüzyon (veya 3–5 dk yavaş bolus)',
        interval: 'İlk 3–5 doz q12sa → ardından q24sa',
        note: 'Hedef dip düzeyi (trough) >20–30 mg/L (endokarditte 30–40 mg/L). İlk 4 gün böbrek yetmezliğinde bile TAM YÜKLEME verilir! Hipoalbüminemik septik şokta 5 yükleme dozu tercih edilir.',
      },
      {
        title: 'Standart Enfeksiyon (cSSTI, Komplike ÜSE, Pnömoni)',
        setting: 'icu',
        badge: 'Standart Rejim',
        dose: 'Yükleme: 6 mg/kg (~400 mg) q12sa × 3 doz → İdame: 6 mg/kg (~400 mg) q24sa',
        infusionDuration: '3–5 dk IV bolus veya 30 dk IV infüzyon (IM verilebilir)',
        interval: 'İlk 3 doz q12sa → ardından q24sa',
        note: 'Hedef dip düzeyi >15 mg/L. YBÜ kritik hastasında pnömoni/bakteriyemi şüphesi varsa standart yerine 12 mg/kg yüksek yükleme rejimi seçilmelidir.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      secondaryScalar: {
        type: 'AdjBW',
        context: 'Morbid obezitede (BMI ≥40) 12 mg/kg TBW yüklemede tek doz genelde 1000–1200 mg ile sınırlandırılıp TDM (mümkünse) ile izlenir',
      },
      obesityRationale:
        'Teikoplanin dozları Gerçek Vücut Ağırlığına (TBW) göre hesaplanır; 85 kg üzerindeki hastalarda sabit 400 mg dozları belirgin subterapötik kalır (6 mg/kg veya ağır enfeksiyonda 12 mg/kg TBW kullanılmalıdır).',
      perioperative: {
        applicable: true,
        summaryTitle: 'Perioperatif Protez / MRSA / β-Laktam Alerjili Cerrahi Profilaksi',
        timingWindow: 'İnsizyondan 30–60 dk ÖNCE (indüksiyon öncesi hızlı uygulanabilir)',
        standardDoseLabel: '400 mg (≥70 kg veya yüksek risk protezde 600–800 mg; 6–12 mg/kg)',
        adultStandardDoseMg: 400,
        highWeightThresholdKg: 70,
        highWeightDoseMg: 800,
        weightBasedMgKg: 6,
        weightBasedMaxMg: 800,
        pediatricMgKg: 10,
        pediatricMaxMg: 400,
        infusionTimeText: '3–5 dk yavaş IV bolus veya 30 dk IV infüzyon (50–100 mL SF/D5W)',
        bloodLossRedoseMl: 1500,
        clinicalNote:
          'Uzun terminal yarı ömrü (70–160 sa) nedeniyle intraoperatif redozaj genelde gerekmez; vankomisin gibi 2 saat önceden başlama ve histamin hipotansiyonu sıkıntısı yaşatmaz.',
      },
      icu: {
        pkPdTarget: 'Trough >20–30 mg/L (Ağır YBÜ/MRSA) • AUC₂₄/MIC ≥750–900',
        pkPdBadge: 'Yükleme Bağımlı Glikopeptid',
        loadingDoseLabel: 'KRİTİK Yükleme: 12 mg/kg q12sa × 3–5 Doz (Ağır YBÜ)',
        loadingWeightBasedMgKg: 12,
        loadingMaxMg: 1200,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dk IV infüzyon — HER 12 SAATTE BİR (toplam 3–5 yükleme dozu!)',
        maintenanceLabel: 'Yükleme Sonrası Günlük İdame (q24sa)',
        maintenanceMode: 'weight_based_qinterval',
        weightOptions: [
          {
            id: 'teico-icu-high',
            label: 'Ağır YBÜ Sepsis / MRSA / Endokardit / Kemik (12 mg/kg q24sa)',
            mgPerKg: 12,
            maxSingleMg: 1200,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: '12 mg/kg q12sa × 3–5 yükleme sonrası başlanır. Hedef dip >20–30 mg/L (endokarditte 30–40 mg/L).',
          },
          {
            id: 'teico-std',
            label: 'Standart Enfeksiyon (6 mg/kg q24sa)',
            mgPerKg: 6,
            maxSingleMg: 800,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: '6 mg/kg q12sa × 3 yükleme sonrası başlanır. Hedef dip >15 mg/L.',
          },
        ],
        tdmNote:
          'İlk yükleme dozları tamamlandıktan sonra (4. veya 5. gün idame dozu öncesi) serum trough düzeyi ölçülmesi önerilir (ağır MRSA/YBÜ’de >20 mg/L, endokardit/protezde >30 mg/L; toksisite eşiği >60 mg/L).',
      },
      renalTiers: [
        {
          id: 'teico-egfr-80',
          label: 'Normal Böbrek (CrCl >80)',
          egfrRange: '> 80 mL/dk',
          recommendation: 'Tam Yükleme + Tam q24sa İdame',
          doseText: 'Yükleme q12sa × 3–5 → 6–12 mg/kg q24sa',
          note: 'Ağır YBÜ sepsisinde 12 mg/kg rejimi seçilmelidir.',
          tone: 'emerald',
        },
        {
          id: 'teico-egfr-30',
          label: 'Orta Böbrek Yetmezliği',
          egfrRange: '30–80 mL/dk',
          recommendation: 'İLK 4 GÜN TAM DOZ! 4. Günden İtibaren %50 Azalt',
          doseText: 'İlk 4 gün tam yükleme → 4. günden sonra yarım doz q24sa veya tam doz q48sa',
          note: 'İlk 3–4 günde asla yükleme azaltılmaz; aksi halde hasta günlerce subterapötik kalır.',
          tone: 'amber',
        },
        {
          id: 'teico-egfr-low',
          label: 'Ağır Böbrek Yetmezliği / HD',
          egfrRange: '< 30 mL/dk veya HD',
          recommendation: 'İLK 4 GÜN TAM DOZ! 4. Günden İtibaren 1/3 Doz',
          doseText: 'İlk 4 gün tam yükleme → 4. günden sonra 1/3 doz q24sa veya tam doz q72sa',
          note: 'HD ile uzaklaştırılmaz; diyaliz sonrası ek doz gerekmez.',
          tone: 'rose',
        },
        {
          id: 'teico-crrt',
          label: 'CRRT (CVVH / CVVHDF)',
          egfrRange: 'Sürekli RRT',
          recommendation: 'Tam Yükleme → 4. Günden İtibaren q24–48sa',
          doseText: '12 mg/kg q12sa × 3–5 → 6 mg/kg q24sa veya 12 mg/kg q48sa',
          note: 'Yüksek protein bağlanması nedeniyle CRRT filtresinden geçiş sınırlıdır; ancak ağır hipoalbüminemide serbest ilaç klirensi artar.',
          tone: 'sky',
        },
      ],
      crrtSummary:
        'Teikoplanin %90–95 albümine bağlandığından CRRT ile temizlenmesi düşüktür; ilk 3–5 yükleme dozu (12 mg/kg q12sa) TAM verilir, 4. günden itibaren 6 mg/kg q24sa veya 12 mg/kg q48sa idameye geçilir (hipoalbüminemide 6–8 mg/kg q24sa tercih edilebilir).',
      hdSummary:
        'Hemodiyaliz (düşük veya yüksek akımlı) teikoplanini anlamlı düzeyde temizlemez. İlk 4 gün tam yükleme sonrası 4. günden itibaren tam doz q72sa (veya 1/3 doz q24sa) verilir; HD sonrası ek doz gerekmez.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Targocid® / Tekoplan® 400 mg Flakon',
          presentation: '400 mg liyofilize toz + 3 mL enjeksiyonluk su ampulü',
          concentration: '3 mL su ile sulandırıldığında ~400 mg / 3 mL (133 mg/mL) — 3–5 dk IV bolus, 30 dk infüzyon veya IM',
          saltOrBaseNote: 'Ağır YBÜ yükleme (800 mg) için 2 adet 400 mg flakon kullanılır.',
          alertLevel: 'high',
        },
        {
          name: 'Targocid® / Tekoplan® 200 mg Flakon',
          presentation: '200 mg liyofilize toz + 3 mL enjeksiyonluk su ampulü',
          concentration: '3 mL su ile sulandırıldığında ~200 mg / 3 mL (66,7 mg/mL)',
          saltOrBaseNote: 'Pediatrik veya böbrek yetmezliği 4. gün sonrası idame için uygundur; 400 mg flakon ile karıştırmayın.',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        'Sulandırma: 3 mL steril enjeksiyonluk suyu flakon duvarından yavaşça ekle ve İKİ AVUÇ ARASINDA NAZİKÇE DÖNDÜR (ASLA ÇALKALAMA!).',
        'Köpük oluşursa çözeltiyi 15 dakika dik olarak beklet; köpük söndükten sonra enjektöre çek.',
        'IV Bolus: Sulandırılmış çözelti 3–5 dakikada yavaş IV enjeksiyon olarak verilebilir.',
        'IV İnfüzyon (YBÜ’de özellikle 800 mg dozda önerilen): 50–100 mL %0,9 NaCl veya %5 Dekstroz içinde 30 dakikada infüze edilir.',
      ],
      concentrationTrapWarning:
        'ÇALKALAMA & KÖPÜRME TUZAĞI: Teikoplanin flakonu kuvvetlice çalkalandığında yoğun, kalıcı köpük oluşur ve dozun %20–30’u köpük içinde flakonda kalarak eksik doza yol açar. Köpürme gelişirse mutlaka 15 dk beklenmelidir.',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik venden 3–5 dk yavaş bolus veya 30 dk infüzyon şeklinde güvenle uygulanabilir; damar irritasyonu vankomisine göre çok daha düşüktür.',
      phRange: 'pH 7,2 – 7,8 (Fizyolojik nötr pH — periferik ven toleransı mükemmeldir)',
      osmolalityNote: '100 mL SF/D5W içinde izoozmolar (~290–310 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Laktatlı Ringer (LR)', 'Enjeksiyonluk su (rekonstitüsyon)'],
      ySiteCompatible: ['Heparin', 'İnsülin', 'Fentanil', 'Midazolam', 'Potasyum klorür', 'Magnezyum sülfat'],
      ySiteIncompatible: [
        'Aminoglikozidler (Amikasin, Gentamisin — aynı enjektörde/Y-hattında DİREKT ÇÖKME VE İNAKTİVASYON!)',
        'Siprofloksasin',
        'Sefepim / Seftazidim (bazı konsantrasyonlarda geçimsiz — hattı SF ile yıka)',
        'Propofol',
      ],
      stabilityNote:
        'Sulandırılmış çözelti 2–8°C’de 24 saat stabildir; mikrobiyolojik güvenlik nedeniyle taze hazırlanıp kullanılması önerilir.',
      extravasationProtocol:
        'Nötr pH nedeniyle vezikan değildir; ekstravazasyonda infüzyonu durdur, elevasyon ve soğuk/ılık kompres ile izle.',
    },
    organImpairment: {
      renalSummary:
        'Atılımı ağırlıklı renaldir ancak çok uzun yarı ömrü nedeniyle İLK 4 GÜN (yükleme fazı) böbrek yetmezliğinde dahi TAM DOZ verilir; doz azaltımı 4. günden itibaren yapılır.',
      renalDetails: [
        'CrCl 30–80 mL/dk: 4. günden itibaren günlük idame dozu %50 azaltılır veya tam doz 48 saatte bir verilir.',
        'CrCl <30 mL/dk veya HD: 4. günden itibaren günlük dozun 1/3’ü verilir veya tam doz 72 saatte bir uygulanır.',
        'Vankomisine kıyasla nefrotoksisite insidansı belirgin düşüktür; ABH’li veya piperasilin-tazobaktam alan hastalarda tercih edilen glikopeptiddir.',
      ],
      hepaticSummary: 'Primer hepatik metabolizma olmadığından doz ayarı gerekmez; ancak ciddi hipoalbüminemi serbest fraksiyonu ve dağılım hacmini artırır.',
      hepaticDetails: [
        'Siroz / Child-Pugh C ve ağır hipoalbüminemide (albümin <2,5 g/dL) toplam serum düzeyi düşük çıkabilirken serbest (aktif) ilaç düzeyi yeterli veya yüksek olabilir; klinik ve renal izlem önemlidir.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: Yükleme Tam, 4. Günden Sonra eGFR’ye Göre Azalt',
      geriatricPoints: [
        'Yaşlılarda ilk 3–5 yükleme dozu tam verilir; 4. günden itibaren azalmış CrCl’ye göre q48sa veya yarım doz rejime geçilir.',
        'Vankomisine göre daha az ototoksik ve nefrotoksik olduğundan yaşlı ortopedi/YBÜ hastalarında avantajlıdır.',
      ],
      obesityWeightScalarBadge: 'TBW (6–12 mg/kg) — Sabit 400 mg Dozu Yetersiz Kalır!',
      obesityPoints: [
        'Obez hastalarda standart sabit 400 mg dozları (örn. 110 kg hastada 3,6 mg/kg!) ağır subterapötik düzeylere yol açar.',
        'Ağır enfeksiyonda 12 mg/kg TBW (genelde 800–1200 mg) ile q12sa × 3–5 yükleme yapılmalıdır.',
      ],
      clinicalNote:
        'Türkiye YBÜ pratiğinde en yaygın klinik hata, 90–110 kg septik hastaya hâlâ "1×400 mg" teikoplanin yazılmasıdır; bu doz MRSA bakteriyemisinde tedavi başarısızlığına neden olur.',
    },
    pregnancyLactation: {
      pregnancySummary:
        'İnsan gebeliğinde veri vankomisine göre daha sınırlıdır; ancak hayvan çalışmalarında belirgin teratojenite saptanmamıştır. Klinik gereklilikte fayda-risk değerlendirmesi ile kullanılabilir (gebelikte veri zenginliği nedeniyle ilk tercih vankomisindir).',
      pregnancyDetails: [
        'Plasentadan geçer; ancak ciddi maternal MRSA enfeksiyonunda ve vankomisin intoleransında kullanılabilir.',
      ],
      lactationSummary: 'Anne sütüne geçişi ve bebeğin GİS kanalından oral emilimi ihmal edilebilir düzeydedir; emzirme ile uyumlu kabul edilir.',
      lactationDetails: [
        'Oral biyoyararlanımı olmadığı için emzirilen bebekte sistemik maruziyet beklenmez; yalnızca bağırsak florası (ishal/pamukçuk) izlenir.',
      ],
    },
    adverseEffects: [
      {
        title: 'Nefrotoksisite (Vankomisinden Düşük)',
        incidenceOrSeverity: '%2–10 • Yüksek Trough (>60 mg/L)',
        detail:
          'Vankomisine kıyasla akut böbrek hasarı riski anlamlı derecede düşüktür; ancak yüksek doz (>12 mg/kg idame) ve aminoglikozid/kolistin kombinasyonunda böbrek fonksiyonu izlenmelidir.',
        tone: 'amber',
      },
      {
        title: 'Aşırı Duyarlılık, Döküntü & İlaç Ateşi',
        incidenceOrSeverity: '%2–5 • Çapraz Reaksiyon Riski',
        detail:
          'Makülopapüler döküntü, ilaç ateşi, nadiren DRESS veya anafilaksi. Histamin aracılı Red Man sendromu vankomisine göre çok nadirdir (<%1).',
        tone: 'indigo',
      },
      {
        title: 'Trombositopeni & Nötropeni',
        incidenceOrSeverity: '%1–3 • Uzun Süreli Tedavi',
        detail:
          'Özellikle yüksek doz (>12 mg/kg) ve >14 günlük kemik-eklem/endokardit tedavilerinde geri dönüşlü trombositopeni, lökopeni ve eozinofili görülebilir.',
        tone: 'rose',
      },
      {
        title: 'Karaciğer Enzim Yüksekliği & Nadir Ototoksisite',
        incidenceOrSeverity: 'Hafif / Nadir',
        detail:
          'Geçici AST/ALT/ALP artışı görülebilir; ototoksisite ve vestibüler toksisite vankomisinden belirgin daha nadirdir.',
        tone: 'teal',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Yükleme Dozunun Atlanması (En Büyük YBÜ Hatası)',
        detail:
          'Order sisteminde ilk 3–5 dozun q12sa olarak işaretlenmemesi halinde teikoplanin 70–160 saatlik yarı ömrü yüzünden ilk 5–7 gün boyunca subterapötik kalır ve septik şok mortalitesini artırır.',
      },
      {
        title: 'Hipoalbüminemi & Serbest İlaç Kinetiği',
        detail:
          '%90–95 albümine bağlanan teikoplanin, albümini <2,5 g/dL olan kritik YBÜ hastalarında artmış serbest fraksiyon nedeniyle daha geniş hacme dağılır ve daha hızlı atılır → 5 doz yüksek yükleme (12 mg/kg q12sa) tercih edilir.',
      },
      {
        title: 'Aminoglikozid ile Aynı Hattan İnfüzyon Yasağı',
        detail:
          'Teikoplanin ve aminoglikozidler (amikasin/gentamisin) aynı enjektörde veya Y-hattında temas ederse doğrudan çökme oluşur; kesinlikle ayrı lümen veya araya SF yıkaması gerekir.',
      },
      {
        title: 'S. haemolyticus & S. epidermidis Heterodirenci',
        detail:
          'Kateter veya protez kaynaklı koagülaz-negatif stafilokok enfeksiyonlarında teikoplanin MİK değerleri yükselebilir; mutlaka antibiyogramla duyarlılık doğrulanmalıdır.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — D-Ala-D-Ala Bağlanması & Lipofilik Membran Ankrajı',
        summary:
          'Teikoplanin, beş benzer lipoglikopeptid bileşeninden (A2-1 ile A2-5) oluşan bir karışımdır; D-Ala-D-Ala peptidoglikan ucunu tutarken lipofilik yağ asidi kuyruğu bakteri membranına gömülür.',
        points: [
          'Lipofilik yan zincirin bakteri membranına ankrajı, ilacın hücre duvarı biyosentez bölgesindeki yerel konsantrasyonunu vankomisine göre artırır.',
          'Transglikozilasyon ve transpeptidasyon durur; hücre duvarı çapraz bağları zayıflar ve bakteri ozmotik lizise uğrar.',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — Yüksek Albümin Rezervuarı & Düşük Mast Hücre Aktivasyonu',
        summary:
          'Lipofilik kuyruk plazma albüminine %90–95 oranında bağlanarak dolaşımda dev bir depo oluşturur; konak mast hücre ve tübül etkileşimi vankomisine göre çok daha ılımlıdır.',
        points: [
          'MRGPRX2 reseptör aktivasyonu minimal olduğundan hızlı (3–5 dk) IV bolusta dahi ciddi histamin deşarjı genelde görülmez.',
          'Proksimal tübül hücresine endositoz ve mitokondriyal ROS üretimi vankomisinden belirgin düşüktür; bu durum özellikle piperasilin-tazobaktam ile birlikte kullanımda kritik renal koruma sağlar.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Kas-İskelet & Protez Dokuları',
          tissueTarget: 'Kemik Korteksi / Sinovyal Sıvı',
          accent: 'teal',
          points: [
            'Yüksek lipofilisitesi sayesinde kemik dokusu, kıkırdak ve sinovyal sıvıya vankomisinden daha yüksek oranlarda penetre olur.',
            'Ortopedik protez cerrahisi profilaksisi ve kronik osteomiyelitte tercih edilmesinin farmakolojik temelidir.',
          ],
        },
        {
          systemTitle: 'Renal Sistem & RRT',
          tissueTarget: 'Glomerüler Filtrasyon Bariyeri',
          accent: 'amber',
          points: [
            'Yalnızca serbest fraksiyon (%5–10) glomerülden süzülebildiği için klirens çok yavaştır (t½ 70–160 sa) ve hemodiyalizle uzaklaştırılamaz.',
            'Vankomisine kıyasla akut tübüler nekroz riski meta-analizlerde ~%50–60 daha düşüktür.',
          ],
        },
        {
          systemTitle: 'Kardiyovasküler & Hemodinami',
          tissueTarget: 'Miyokard / Endokard / Damar Duvarı',
          accent: 'indigo',
          points: [
            'İndüksiyon öncesi 3–5 dk bolusta dahi vazodilatasyon/hipotansiyon riski minimaldir.',
            'Endokardit vejetasyonlarına geçiş için mutlaka yüksek doz (12 mg/kg q12sa × 5 → q24sa; trough 30–40 mg/L) gerekir.',
          ],
        },
        {
          systemTitle: 'Santral Sinir Sistemi (Sınırlı Geçiş)',
          tissueTarget: 'Kan-Beyin Bariyeri',
          accent: 'rose',
          points: [
            'Büyük molekül ağırlığı (~1880 Da) ve %90–95 protein bağlanması nedeniyle BOS geçişi çok düşüktür; MRSA menenjitinde vankomisin veya linezolid seçilmelidir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — Yükleme Kinetiği, PK/PD Hedefi & Klinik Tuzaklar',
        summary:
          'Teikoplanin başarısının tek belirleyicisi ilk 48–72 saatte yeterli yükleme dozuyla hedef trough (>20–30 mg/L) düzeyine hızla çıkmaktır.',
        points: [
          'Birinci derece eliminasyon kinetiğinde kararlı duruma 4–5 yarı ömürde ulaşılır; t½ = 100 saat olan bir ilaçta yükleme yapılmazsa kararlı durum 20 gün sürer!',
          'Rifampisin veya aminoglikozidlerle protez biyofilm enfeksiyonlarında sinerjik bakterisidal aktivite gösterir.',
        ],
      },
      clinicalPearls: [
        'Böbrek yetmezliği olan hastada bile ilk 3–5 yükleme dozunu (q12sa) TAM ver; böbrek ayarlaması ancak 4. günden sonra başlar!',
        'Ortopedik protez veya kardiyak cerrahi profilaksisinde 400–800 mg tek doz 3–5 dk’da verilir ve uzun ameliyatlarda redozaj gerektirmez.',
        'Flakonu çalkalama — köpürürse 15 dakika bekle!',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Teikoplanin',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Aminoglikozidler (Amikasin, Gentamisin)',
          mechanism: 'Aynı damar yolunda direkt kimyasal geçimsizlik (çökme) + sistemik aditif nefrotoksisite/ototoksisite.',
          clinicalEffect: 'İlaç inaktivasyonu/çökelti ve böbrek fonksiyonlarında bozulma riski.',
          management: 'ASLA aynı enjektörde/Y-hattında karıştırma; ayrı lümenden ver ve kreatinin/işitme takibi yap.',
        },
        {
          severity: 'C',
          agent: 'Polimiksinler (Kolistin, Polimiksin B) / Amfoterisin B / Siklosporin',
          mechanism: 'Aditif renal tübüler toksisite.',
          clinicalEffect: 'Akut böbrek hasarı riskinde artış (vankomisinden daha düşük olmakla birlikte).',
          management: 'Günlük kreatinin, eGFR ve idrar çıkışı izlemi yap; 4. günden itibaren böbrek fonksiyonuna göre idameyi uyarla.',
        },
        {
          severity: 'C',
          agent: 'Loop Diüretikler (Furosemid)',
          mechanism: 'Olası aditif ototoksisite ve volüm deplesyonuna bağlı azalmış renal klirens.',
          clinicalEffect: 'Teikoplanin birikimi ve nadiren işitme kaybı.',
          management: 'Yüksek doz kombinasyonda hidratasyonu koru ve işitme semptomlarını sorgula.',
        },
      ],
      references: [
        {
          authors: 'Svetitsky S, Leibovici L, Paul M.',
          title: 'Comparative efficacy and safety of vancomycin versus teicoplanin: systematic review and meta-analysis',
          journal: 'Antimicrobial Agents and Chemotherapy',
          year: 2009,
          note: 'Teikoplaninin vankomisine benzer klinik etkinlikte, anlamlı ölçüde daha düşük nefrotoksisite ve Red Man insidansına sahip olduğunu gösteren referans meta-analiz.',
        },
        {
          authors: 'Hanai Y, Takahashi Y, Niwa T, Mayumi T, Hamada Y, Kimura T, et al.',
          title: 'Clinical practice guidelines for therapeutic drug monitoring of teicoplanin: a consensus review by the Japanese Society of Chemotherapy and the Japanese Society of Therapeutic Drug Monitoring',
          journal: 'Journal of Antimicrobial Chemotherapy',
          year: 2022,
          note: 'Yüksek doz yükleme (12 mg/kg q12sa × 3–5 doz) ve hedef trough (15–30 / 20–40 mg/L) konsensüs kılavuzu.',
        },
        {
          authors: 'European Medicines Agency (EMA) / Targocid SmPC.',
          title: 'Teicoplanin Summary of Product Characteristics — Revised Loading and High-Dose Regimens',
          journal: 'EMA Article 30 Referral',
          year: 2013,
          note: 'Resmi 6–12 mg/kg q12sa × 3–5 yükleme, 4. günden sonra böbrek doz ayarı ve 15 dk köpük bekleme kuralı.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/international/teicoplanin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },

  // ============================================================================
  // 3. DAPTOMİSİN (DAPTOMYCIN)
  // ============================================================================
  {
    id: 'daptomycin',
    classTag: 'glycopeptide_lipopeptide',
    accentColor: 'purple',
    atcCode: 'J01XX09',
    classLabel: 'Siklik Lipopeptid Antibiyotik (Hızlı Bakterisidal MRSA / VRE Kurtarma Ajanı)',
    tradeNamesTr: 'Cubicin® 350 mg / 500 mg, Daptomisin Koçak® 350 mg / 500 mg flakon',
    title: 'Daptomisin (Daptomycin) — YBÜ Yüksek Doz MRSA/VRE Bakteriyemi & Sürfaktan/CPK Güvenliği',
    cardTitle: 'Daptomisin (IV)',
    cardBadge: 'Pnömonide ASLA! • Sadece SF',
    cardCategoryLabel: 'Lipopeptid • MRSA/VRE',
    cardShortDesc:
      'MRSA bakteriyemisi, sağ kalp endokarditi ve VRE için hızlı bakterisidal siklik lipopeptid. Pulmoner sürfaktan tarafından İNAKTİVE edilir (pnömonide ASLA!), haftalık CPK + statin kesimi ve sadece %0,9 NaCl şarttır.',
    cardHighlights: [
      {
        label: 'MUTLAK TUZAK',
        value: 'PNÖMONİDE ASLA!',
        subtext: 'Pulmoner sürfaktan inaktive eder',
        tooltip: 'Akciğer sürfaktanı daptomisini tamamen nötralize eder; pnömonide kontrendikedir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'YBÜ MRSA / VRE Dozu',
        value: '8–10 mg/kg q24sa',
        subtext: 'VRE’de 10–12 mg/kg (IDSA)',
        tooltip: 'Ağır bakteriyemide 4–6 mg/kg yetersiz kalıp direnç seçebilir',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'Kas & Akciğer İzlemi',
        value: 'Haftalık CPK + Statin KES',
        subtext: 'Rabdomiyoliz & Eozinofilik Pnömoni',
        tooltip: 'Statinleri tedavi boyunca kes; ateş+hipoksemi+infiltratta hemen durdur',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Çözücü & Renal Kural',
        value: 'YALNIZCA %0,9 NaCl',
        subtext: 'D5W GEÇİMSİZ! • eGFR<30: q48sa',
        tooltip: 'Dekstrozlu solüsyonlarla kimyasal geçimsiz; eGFR <30’da aralık q48sa olur',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
    ],
    aliases: ['Daptomycin', 'Daptomisin', 'Cubicin'],
    searchKeywords: [
      'daptomisin',
      'daptomycin',
      'cubicin',
      'lipopeptid',
      'mrsa',
      'vre',
      'bakteriyemi',
      'endokardit',
      'sürfaktan',
      'cpk',
      'rabdomiyoliz',
      'eozinofilik pnömoni',
      'statin',
      'dekstroz geçimsiz',
    ],
    highAlert: {
      tallManName: 'DAPTOmi̇si̇n (DAPTOmycin)',
      confusionRiskWith:
        'Daktinomisin (dactinomycin — sitotoksik kemoterapötik! ÖLÜMCÜL karışıklık riski!), Doksisiklin.',
      criticalAlerts: [
        'PULMONER SÜRFAKTAN İNAKTİVASYONU — PNÖMONİDE ASLA KULLANILMAZ: Alveoler sürfaktan fosfolipidleri daptomisini sekestre ederek antibakteriyel etkisini tamamen yok eder → primer pnömoni/VAP/HAP tedavisinde kesinlikle kullanılmaz!',
        'YALNIZCA %0,9 NaCl (SF) İLE UYUMLUDUR: %5 Dekstroz (D5W) veya dekstroz içeren herhangi bir sıvıyla KİMYASAL OLARAK GEÇİMSİZDİR — asla D5W ile sulandırılmaz veya aynı Y-hattından verilmez!',
        'RABDOMİYOLİZ & STATİN KURALI: Tedavi boyunca STATİNLER geçici olarak KESİLMELİ ve en az haftalık CPK izlemi yapılmalıdır (semptomatik CPK >5× ÜSN [>1000 U/L] veya asemptomatik >10× ÜSN [>2000 U/L] ise DERHAL KES!).',
        'EOZİNOFİLİK PNÖMONİ ACİLİ: Genelde 2–4. haftada yeni ateş, hipoksemi ve diffüz bilateral infiltratlar gelişirse ilacı HEMEN kes ve sistemik kortikosteroid başla; yeniden maruziyet (rechallenge) ölümcül olabilir!',
      ],
      antidoteOrRescue:
        'Spesifik antidot yoktur. Miyopati/rabdomiyolizde daptomisinin kesilmesi, agresif IV izotonik sıvı hidratasyonu ve böbrek fonksiyonu/elektrolit izlemi yapılır. Eozinofilik pnömonide ilacın derhal kesilmesi ve sistemik kortikosteroid (prednizolon/metilprednizolon) hızla klinik yanıt sağlar. Hemodiyaliz 4 saatte dozun yalnızca ~%15’ini temizler.',
    },
    identitySummary:
      'Daptomisin, Streptomyces roseosporus’tan elde edilen, kalsiyum-bağımlı (Ca²⁺) hızlı ve konsantrasyon-bağımlı bakterisidal etki gösteren siklik lipopeptid antibiyotiktir. Özellikle yüksek vankomisin MİK’li (≥1,5–2 mg/L) MRSA bakteriyemisi, sağ kalp enfektif endokarditi, komplike deri-yumuşak doku enfeksiyonları (cSSTI) ve vankomisine dirençli Enterokok (VRE) enfeksiyonlarında kritik bir YBÜ kurtarma ajanıdır. Pulmoner sürfaktan inaktivasyonu nedeniyle pnömonide kullanılmaz.',
    spectrumHighlights: [
      {
        title: 'Hızlı Bakterisidal Kapsama (MRSA & VRE)',
        detail:
          'MRSA (yüksek vankomisin MİK’li/hVISA suşlar dahil), MSSA, koagülaz-negatif stafilokoklar, VRE (E. faecium ve E. faecalis — yüksek doz 10–12 mg/kg ± ampisilin/seftarolin sinerjisi), Streptococcus spp., Corynebacterium spp.',
        tone: 'emerald',
      },
      {
        title: 'Direnç Seçilimi & Yüksek Doz Gereksinimi',
        detail:
          'Ağır MRSA bakteriyemi, derin odaklı enfeksiyon veya VRE’de düşük doz (4–6 mg/kg) kullanımı mprF/liaFSR mutasyonları yoluyla tedavi altında daptomisin-duyarsız suş seçer → YBÜ’de 8–10 mg/kg (VRE’de 10–12 mg/kg) tercih edilir.',
        tone: 'amber',
      },
      {
        title: 'Kapsam Dışı & Anatomik Yasak',
        detail:
          'TÜM Gram-negatif bakteriler kapsam dışıdır. AKCİĞER PARANKİMİ (pnömoni/HAP/VAP) sürfaktan inaktivasyonu nedeniyle tedavi EDİLEMEZ. BOS geçişi düşüktür (%2–5).',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Fizyolojik serbest kalsiyum (Ca²⁺) iyonları varlığında oligomerize olarak Gram-pozitif bakteri sitoplazmik membranındaki negatif yüklü fosfatidilgliserol moleküllerine hızla gömülür. Membranda iyon geçiren kanallar/porlar oluşturarak hızlı potasyum (K⁺) çıkışına, membran depolarizasyonuna ve DNA/RNA/protein sentezinin durmasına yol açar; hücreyi patlatmadan (lizis yapmadan) hızlı bakterisidal etki gösterir.',
    mechanismPillars: [
      {
        title: 'Ca²⁺ Bağımlı Membran Depolarizasyonu',
        detail:
          'Kalsiyum iyonları daptomisinin negatif yükünü nötralize edip amfipatik oligomerler oluşturur; hücre zarında K⁺ kaçağı ve ani membran potansiyeli çöküşü ile bakteriyi hızla öldürür.',
      },
      {
        title: 'Lizissiz Bakterisidal Etki & Biyofilm Aktivitesi',
        detail:
          'Hücre duvarını parçalamadan öldürdüğü için enflamatuvar bakteriyel duvar parçacığı salınımı β-laktamlara göre daha düşüktür; durgun fazdaki (stationary-phase) ve biyofilm içindeki bakterilere de aktiftir.',
      },
      {
        title: 'Pulmoner Sürfaktan Sekestrasyonu',
        detail:
          'Alveoler sürfaktandaki zengin fosfatidilgliserol tabakası, bakteri membranını taklit ederek daptomisini Ca²⁺ varlığında kendine bağlar ve ilacı tamamen inaktive eder.',
      },
    ],
    pkCards: [
      {
        label: 'PK/PD Endeksi',
        value: 'Cmax/MIC & AUC/MIC',
        detail: 'Konsantrasyon-bağımlı hızlı öldürme → günde tek doz (q24sa) uygulama idealdir.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%90–93 (Reversibl)',
        detail: 'Yüksek albümin bağlanması; böbrek yetmezliğinde serbest fraksiyon hafif artabilir.',
      },
      {
        label: 'Dağılım Hacmi (Vd)',
        value: '0,1 L/kg (Çok Düşük)',
        detail: 'Büyük ölçüde damar içi ve ekstraselüler sıvıda kalır → bakteriyemi için idealdir.',
      },
      {
        label: 'Eliminasyon Yarı Ömrü (t½)',
        value: '8–9 saat (Normal)',
        detail: 'CrCl <30 mL/dk’da ~28–30 saate uzar → doz aralığı q48sa’ya çıkarılır.',
      },
      {
        label: 'Atılım Yolu',
        value: '%78 Renal (%50 değişmeden)',
        detail: 'Karaciğer CYP450 sistemini kullanmaz veya inhibe etmez (ilaç etkileşimi düşüktür).',
      },
      {
        label: 'İnfüzyon Süresi',
        value: '30 dk (veya 2 dk IV bolus)',
        detail: 'Erişkinde 50 mL SF içinde 30 dk infüzyon veya 50 mg/mL 2 dk yavaş IV enjeksiyon.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Daptomisine karşı belgelenmiş aşırı duyarlılık / anafilaksi.',
        'Daptomisine bağlı eozinofilik pnömoni öyküsü (rechallenge şiddetli/ölümcül nüks yapar!).',
        'Primer pnömoni (TKP, HAP, VAP) — pulmoner sürfaktan tarafından inaktive edildiğinden klinik olarak etkisizdir.',
      ],
      relativeItems: [
        'Eşzamanlı HMG-CoA redüktaz inhibitörü (statin) kullanımı — rabdomiyoliz riski nedeniyle statin tedavi süresince geçici olarak kesilmelidir.',
        'Bazal CPK yüksekliği, miyopati veya açıklanamayan kas güçsüzlüğü — yakın CPK izlemi (haftada ≥2×) gerektirir.',
        'Pediatrik <1 yaş — hayvan çalışmalarında nöromüsküler/aksonal yan etkiler nedeniyle kontrendikedir.',
      ],
      clinicalNote:
        'Septik şoktaki hastada primer odak akciğer (pnömoni) ise veya odak henüz belirsizse MRSA kapsamı için daptomisin SEÇİLMEZ (vankomisin, teikoplanin veya linezolid seçilir).',
    },
    regimenCards: [
      {
        title: 'YBÜ Ağır MRSA Bakteriyemi / Sağ Kalp Endokarditi (IDSA Yüksek Doz)',
        setting: 'icu',
        badge: 'IDSA MRSA Kılavuzu',
        dose: '8–10 mg/kg IV q24sa',
        infusionDuration: '30 dk IV infüzyon (50 mL %0,9 NaCl)',
        interval: 'q24sa (eGFR <30’da q48sa!)',
        note: 'FDA onaylı 6 mg/kg dozu ciddi MRSA bakteriyemisi ve yüksek vankomisin MİK’li suşlarda yetersiz kalabildiğinden IDSA ve YBÜ uzmanları 8–10 mg/kg/gün (± seftarolin/nafsilin sinerjisi) önermektedir.',
      },
      {
        title: 'VRE (Vankomisine Dirençli Enterokok) Bakteriyemi / Endokardit',
        setting: 'icu',
        badge: 'Yüksek Doz Kurtarma',
        dose: '10–12 mg/kg IV q24sa (± Ampisilin veya Seftarolin)',
        infusionDuration: '30 dk IV infüzyon (%0,9 NaCl)',
        interval: 'q24sa (eGFR <30’da q48sa)',
        note: 'Enterokok MİK değerleri stafilokoklardan yüksektir; 10–12 mg/kg yüksek doz + β-laktam ("see-saw" sinerjisi) direnç gelişimini önler ve bakterisidal aktiviteyi artırır.',
      },
      {
        title: 'Komplike Deri ve Yumuşak Doku Enfeksiyonu (cSSTI)',
        setting: 'special',
        badge: 'Standart Onaylı Doz',
        dose: '4 mg/kg IV q24sa (bakteriyemi şüphesi varsa 6–8 mg/kg)',
        infusionDuration: '30 dk IV infüzyon veya 2 dk yavaş IV bolus',
        interval: 'q24sa (7–14 gün; eGFR <30’da q48sa)',
        note: 'Nekrotizan fasiit veya sepsis eşlik ediyorsa yüksek doz (≥6–8 mg/kg) ve cerrahi debridman gerekir.',
      },
    ],
    calculator: {
      defaultWeightKg: 80,
      weightScalar: 'AdjBW',
      secondaryScalar: {
        type: 'TBW',
        context: 'FDA etiketi TBW kullanır; ancak BMI ≥35–40 morbid obezitede 8–10 mg/kg TBW yüksek CPK/rabdomiyoliz riski yarattığından birçok YBÜ kılavuzu AdjBW önerir',
      },
      obesityRationale:
        'Daptomisinin dağılım hacmi (0,1 L/kg) çok küçüktür ve yağ dokusuna dağılımı sınırlıdır. Normal/hafif kilolu hastalarda TBW kullanılırken, obez (BMI ≥30–40) YBÜ hastalarında özellikle yüksek doz (8–12 mg/kg) rejimlerinde AdjBW kullanılması benzer klinik etkinlikte CPK yükselmesini belirgin azaltır.',
      perioperative: {
        applicable: false,
        summaryTitle: 'Rutin Perioperatif Cerrahi Profilakside KULLANILMAZ',
        timingWindow: 'Profilaksi endikasyonu yoktur',
        standardDoseLabel: 'Profilakside endike değil',
        adultStandardDoseMg: 0,
        infusionTimeText: '—',
        clinicalNote:
          'Daptomisin dirençli MRSA/VRE enfeksiyonları için korunması gereken kurtarma antibiyotiğidir; cerrahi profilakside sefazolin (veya MRSA/alerjide vankomisin/teikoplanin) tercih edilir.',
        nonProphylaxisReason:
          'Rutin cerrahi profilaksi kılavuzlarında yer almaz; gereksiz profilaktik kullanım daptomisin-dirençli MRSA/VRE seçilimine yol açar.',
      },
      icu: {
        pkPdTarget: 'Cmax/MIC > 50–100 • AUC₂₄/MIC > 666 (MRSA)',
        pkPdBadge: 'Konsantrasyon Bağımlı',
        loadingDoseLabel: 'Özel yükleme gerekmez — İlk doz tam 8–10 mg/kg (VRE: 10–12 mg/kg)',
        loadingWeightBasedMgKg: 10,
        loadingMaxMg: 1200,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dk IV infüzyon (YALNIZCA 50 mL %0,9 NaCl içinde!)',
        maintenanceLabel: 'YBÜ Günlük Doz Seçeneği (q24sa — eGFR <30’da q48sa!)',
        maintenanceMode: 'weight_based_qinterval',
        weightOptions: [
          {
            id: 'dapto-mrsa-8',
            label: 'MRSA Bakteriyemi / Endokardit (8 mg/kg q24sa)',
            mgPerKg: 8,
            maxSingleMg: 1000,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 50,
            note: 'IDSA önerisi yüksek doz MRSA bakteriyemi/endokardit rejimi; haftalık CPK izlemi + statin kesimi şart.',
          },
          {
            id: 'dapto-vre-10',
            label: 'Ağır MRSA / VRE Kurtarma (10 mg/kg q24sa)',
            mgPerKg: 10,
            maxSingleMg: 1200,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 50,
            note: 'Yüksek vankomisin MİK’li MRSA, persistan bakteriyemi veya VRE (VRE’de 10–12 mg/kg ± β-laktam).',
          },
          {
            id: 'dapto-cssti-4',
            label: 'Komplike Deri-Yumuşak Doku — cSSTI (4 mg/kg q24sa)',
            mgPerKg: 4,
            maxSingleMg: 500,
            intervalHours: 24,
            infusionHours: 0.5,
            diluentVolumeMl: 50,
            note: 'Bakteriyemisi olmayan komplike yumuşak doku enfeksiyonu.',
          },
        ],
        tdmNote:
          'Rutin TDM zorunlu değildir; ancak miyopati güvenliği için trough <24,3 mg/L olması önerilir. En kritik laboratuvar izlemi bazal ve HAFTALIK CPK (kreatin kinaz) takibidir (eGFR <30 veya yüksek dozda haftada 2×).',
      },
      renalTiers: [
        {
          id: 'dapto-egfr-30',
          label: 'Normal – Orta Böbrek (CrCl ≥30)',
          egfrRange: '≥ 30 mL/dk',
          recommendation: 'Standart q24sa Dozlama',
          doseText: '4–10 mg/kg (VRE: 10–12 mg/kg) q24sa',
          note: 'CrCl ≥30 mL/dk’da doz aralığı değişikliği gerekmez.',
          tone: 'emerald',
        },
        {
          id: 'dapto-egfr-low',
          label: 'Ağır Böbrek Yetmezliği (CrCl <30)',
          egfrRange: '< 30 mL/dk (Diyalizsiz)',
          recommendation: 'DOZU DEĞİL, ARALIĞI q48sa YAP!',
          doseText: 'Aynı mg/kg doz → q48sa (48 saatte bir)',
          note: 'Konsantrasyon-bağımlı olduğundan tek doz miktarı azaltılmaz; aralık q48sa’ya uzatılır. Haftada 2× CPK izle.',
          tone: 'rose',
        },
        {
          id: 'dapto-hd',
          label: 'Hemodiyaliz (HD) / CAPD',
          egfrRange: 'HD / Periton Diyalizi',
          recommendation: 'q48sa (HD Günlerinde Diyaliz Sonrası)',
          doseText: '6–10 mg/kg q48sa (HD bitiminde; 72 sa aralıkta %35–50 artırılabilir)',
          note: '4 saatlik HD dozun ~%15’ini temizler; haftada 3 gün HD’de pazartesi-çarşamba standart, cuma (72 saatlik aralık) %35–50 yüksek doz uygulaması yaygındır.',
          tone: 'amber',
        },
        {
          id: 'dapto-crrt',
          label: 'CRRT (CVVHDF / CVVH)',
          egfrRange: 'Effluent 25–35 mL/kg/sa',
          recommendation: '6–8 mg/kg q24sa veya 8 mg/kg q48sa (Akıma Göre)',
          doseText: 'Yüksek effluent (≥30 mL/kg/sa): 8 mg/kg q24sa • Düşük akım: 6–8 mg/kg q48sa',
          note: 'Yüksek doz CRRT’de daptomisin anlamlı temizlenir; q48sa rejimi 24–48. saatlerde subterapötik kalabilir → 6–8 mg/kg q24sa + haftada 2× CPK izlemi tercih edilir.',
          tone: 'sky',
        },
      ],
      crrtSummary:
        'CRRT’de (özellikle effluent ≥25–30 mL/kg/sa) daptomisin klirensi belirginleşir; 6–8 mg/kg q48sa bazı hastalarda yetersiz kalabilir. Güncel YBÜ verileri ağır MRSA/VRE’de 8 mg/kg q24sa (veya en az 6 mg/kg q24sa) + haftada 2 kez CPK takibini destekler.',
      hdSummary:
        'Aynı mg/kg doz q48sa (veya haftada 3 gün HD seansları bitiminde) uygulanır; 72 saatlik hafta sonu aralığı öncesi dozun %35–50 artırılması (veya 8–9 mg/kg) önerilir.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Cubicin® / Daptomisin Koçak® 500 mg Flakon',
          presentation: '500 mg liyofilize toz içeren IV flakon (soğuk zincir: 2–8°C saklama!)',
          concentration: '10 mL %0,9 NaCl ile sulandırıldığında 50 mg/mL',
          saltOrBaseNote: 'Soğukta (2–8°C) saklanır! Sulandırırken %0,9 NaCl kullanılır — ASLA steril su veya D5W kullanma!',
          alertLevel: 'high',
        },
        {
          name: 'Cubicin® / Daptomisin Koçak® 350 mg Flakon',
          presentation: '350 mg liyofilize toz içeren IV flakon (2–8°C saklama)',
          concentration: '7 mL %0,9 NaCl ile sulandırıldığında 50 mg/mL',
          saltOrBaseNote: '350 mg ve 500 mg flakonlar karıştırılmamalı; sulandırma sonrası 10 dk bekletilip nazikçe döndürülür.',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        'Rekonstitüsyon: 500 mg flakona 10 mL %0,9 NaCl (350 mg flakona 7 mL %0,9 NaCl) flakon duvarından yavaşça ekle; ÇALKALAMA, 10 dakika beklet ve nazikçe döndür (50 mg/mL).',
        'IV İnfüzyon: Hesaplanan dozu 50 mL %0,9 NaCl (SF) torbasına ekle ve 30 dakikada infüze et.',
        'IV Bolus (yalnız erişkin): Sulandırılmış 50 mg/mL çözelti 2 dakika boyunca yavaş IV enjeksiyonla uygulanabilir.',
        'ASLA %5 Dekstroz (D5W) veya dekstroz içeren çözeltilerle sulandırma veya seyreltme!',
      ],
      concentrationTrapWarning:
        'DEKSTROZ GEÇİMSİZLİĞİ & KÖPÜRME TUZAĞI: Daptomisin dekstrozla kimyasal olarak geçimsizdir; D5W ile hazırlanması ilacı degrade eder! Ayrıca sert çalkalama yoğun köpürme yaptığından mutlaka flakon duvarından SF verip 10 dk beklenmelidir.',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik veya santral venden 30 dk infüzyon (50 mL SF) veya 2 dk yavaş IV enjeksiyon şeklinde güvenle uygulanabilir.',
      phRange: 'pH 4,0 – 5,0 (Hafif asidik; 50 mL SF içinde iyi tolere edilir)',
      osmolalityNote: '50 mL SF içinde ~300–340 mOsm/kg (izoozmolar).',
      compatibleDiluents: ['%0,9 NaCl (SF — İLK SEÇENEK)', 'Laktatlı Ringer (LR)'],
      ySiteCompatible: ['Aztreonam', 'Seftazidim', 'Seftriakson', 'Dopamin', 'Flukonazol', 'Gentamisin', 'Heparin', 'Lidokain', 'Levofloksasin'],
      ySiteIncompatible: [
        '%5 Dekstroz (D5W) ve tüm dekstrozlu infüzyonlar (KESİNLİKLE GEÇİMSİZ!)',
        'Vankomisin',
        'Sefepim (çelişkili/geçimsiz — ayrı hat)',
        'Amiodaron',
        'Fentanil / Midazolam (verisi sınırlı — ayrı hat veya SF yıkama)',
      ],
      stabilityNote:
        'Açılmamış flakonlar 2–8°C buzdolabında saklanır. SF ile sulandırılmış/seyreltilmiş çözelti oda sıcaklığında 12 saat, buzdolabında (2–8°C) 48 saat stabildir.',
      extravasationProtocol:
        'Vezikan değildir; ekstravazasyonda infüzyonu durdur, elevasyon ve soğuk kompres uygula.',
    },
    organImpairment: {
      renalSummary:
        'Büyük ölçüde renal atılır; CrCl <30 mL/dk’da doz miktarı azaltılmaz, DOZ ARALIĞI q24sa’dan q48sa’ya uzatılır.',
      renalDetails: [
        'Böbrek yetmezliğinde trough birikimi (>24,3 mg/L) rabdomiyoliz ve CPK artışı riskini belirgin yükseltir → haftada 2× CPK takibi zorunludur.',
        'Nefrotoksisite potansiyeli vankomisine göre çok düşüktür; ABH gelişen MRSA bakteriyemisi hastalarında önemli bir alternatiftir.',
      ],
      hepaticSummary: 'Hafif-orta karaciğer yetmezliğinde (Child-Pugh A–B) doz ayarı gerekmez; ağır yetmezlikte (Child-Pugh C) veri sınırlıdır ancak hepatik metabolizma minimaldir.',
      hepaticDetails: [
        'CYP450 sistemiyle etkileşmediğinden karaciğer nakli / siroz hastalarında ilaç-ilaç etkileşimi açısından çok güvenlidir.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: CrCl <30 ise q48sa + Yakın CPK İzlemi',
      geriatricPoints: [
        'Yaşlılarda azalmış GFR nedeniyle maruziyet artar; CrCl <30 mL/dk ise kesinlikle q48sa uygulanmalıdır.',
        'Yaşlılarda statin kullanımı çok yaygın olduğundan tedavi başlangıcında statinin kesildiği mutlaka teyit edilmelidir.',
      ],
      obesityWeightScalarBadge: 'Obezitede AdjBW (veya TBW + Sıkı CPK)',
      obesityPoints: [
        'Daptomisin düşük dağılım hacmi (0,1 L/kg) nedeniyle yağ dokusuna geçmez; morbid obezitede TBW ile 8–10 mg/kg verilmesi yüksek Cmax/trough ve CPK yüksekliğine yol açar.',
        'BMI ≥30–40 hastalarında AdjBW üzerinden 8–10 mg/kg hesaplanması birçok YBÜ kılavuzunda daha güvenli kabul edilir.',
      ],
      clinicalNote:
        'Yüksek doz (8–12 mg/kg) alan obez veya böbrek yetmezlikli hastalarda CPK takibi haftada bir yerine haftada iki kez yapılmalıdır.',
    },
    pregnancyLactation: {
      pregnancySummary:
        'Hayvan çalışmalarında teratojenite saptanmamıştır (eski FDA Kategori B); insan gebeliği verisi sınırlı olmakla birlikte ciddi MRSA/VRE enfeksiyonlarında kullanılabilir.',
      pregnancyDetails: [
        'Plasentadan düşük oranda geçer; vankomisin intoleransı veya VRE varlığında gebelikte makul bir seçenektir.',
      ],
      lactationSummary: 'Anne sütüne geçişi çok düşüktür (%0,1’den az) ve oral emilimi yoktur; emzirme ile uyumlu kabul edilir.',
      lactationDetails: [
        'Yüksek molekül ağırlığı (~1620 Da) ve yüksek protein bağlanması nedeniyle süte geçiş minimaldir.',
      ],
    },
    adverseEffects: [
      {
        title: 'Miyopati & Rabdomiyoliz (CPK Artışı)',
        incidenceOrSeverity: '%2–10 • Doz/Trough Bağımlı',
        detail:
          'İskelet kası miyosit membran hasarı → kas ağrısı, güçsüzlük, miyoglobinüri ve ABH. Haftalık CPK izle; statinleri kes; semptomatik >1000 U/L veya asemptomatik >2000 U/L ise DERHAL kes!',
        tone: 'rose',
      },
      {
        title: 'Eozinofilik Pnömoni',
        incidenceOrSeverity: 'Nadir ama Hayati (2–4. Hafta)',
        detail:
          'Ateş, dispne, hipoksemi, bilateral diffüz infiltratlar ve BAL’da >%25 eozinofil (periferik eozinofili olmayabilir!). İlacı hemen kes + sistemik steroid başla; tekrarlama kontrendikedir!',
        tone: 'rose',
      },
      {
        title: 'Yalancı PT / INR Uzaması (Lab Etkileşimi)',
        incidenceOrSeverity: 'Reaktif Bağımlı Artefakt',
        detail:
          'Yüksek plazma daptomisin konsantrasyonları bazı rekombinant tromboplastin reaktifleriyle etkileşerek gerçek kanama riski olmadan yalancı PT/INR uzaması yapar → koagülasyon örneğini trough (doz öncesi) zamanında al!',
        tone: 'amber',
      },
      {
        title: 'Periferik Nöropati & Transaminaz Artışı',
        incidenceOrSeverity: '%1–3 • Uzun Tedavi',
        detail:
          'Parestezi, disestezi, hafif AST/ALT yükselmesi (kas kaynaklı AST artışı da CPK ile ayrıştırılmalıdır) ve C. difficile ishali.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Perioperatif Koagülasyon (PT/INR) Tuzağı',
        detail:
          'Nöroaksiyel blok (spinal/epidural) veya cerrahi öncesi alınan INR, daptomisin pik saatinde çekilmişse yalancı yüksek çıkabilir! Kan örneği mutlaka bir sonraki daptomisin dozundan hemen önce (trough) alınmalıdır.',
      },
      {
        title: 'Statin Kullanımının Gözden Kaçması',
        detail:
          'YBÜ’ye alınan koroner arter hastalarının ev reçetelerindeki atorvastatin/rosuvastatin/simvastatin devam ettirilirse daptomisinle sinerjik ağır rabdomiyoliz ve diyaliz gerektiren ABH gelişebilir.',
      },
      {
        title: 'Bakteriyemide Yeni Pulmoner İnfiltrat Gelişimi',
        detail:
          'Daptomisin altındaki hastada yeni hipoksemi ve infiltrat çıktığında iki kritik olasılığı düşün: (1) Altta yatan MRSA pnömonisi daptomisinle tedavi edilemiyor (sürfaktan inaktivasyonu!) veya (2) İlaca bağlı Eozinofilik Pnömoni!',
      },
      {
        title: 'Daptomisin + β-Laktam ("See-Saw" Sinerjisi)',
        detail:
          'Dirençli/persistan MRSA veya VRE bakteriyemisinde daptomisine Seftarolin, Ampisilin veya Nafsilin eklenmesi bakteri yüzey negatif yükünü artırarak daptomisin bağlanmasını dramatik biçimde güçlendirir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — Ca²⁺ Bağımlı Oligomerizasyon & Fosfatidilgliserol Hedeflemesi',
        summary:
          'Daptomisin, fizyolojik kalsiyum (Ca²⁺ ~1,25 mmol/L) varlığında misel benzeri oligomerlere dönüşür ve Gram-pozitif bakteri zarındaki anyonik fosfatidilgliserol (PG) bölgelerine girer.',
        points: [
          'Kalsiyum iyonu, anyonik daptomisin molekülünü katyonik hale getirerek negatif yüklü bakteri zarıyla elektrostatik etkileşime sokar.',
          'Bakterinin daptomisine direnç kazanması (mprF mutasyonu), membranı pozitif yüklü lizil-fosfatidilgliserol ile kaplayarak daptomisini elektrostatik olarak itmesiyle gerçekleşir.',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — Membran Depolarizasyonu, K⁺ Efluksu & Makromolekül Çöküşü',
        summary:
          'Membrana gömülen daptomisin oligomerleri iyon geçirgen porlar oluşturur; ani K⁺ kaybı transmembran potansiyelini (ΔΨ) saniyeler-dakikalar içinde çökertir.',
        points: [
          'Membran potansiyelinin kaybı ATP üretimini, DNA replikasyonunu, RNA transkripsiyonunu ve protein sentezini eşzamanlı durdurur.',
          'Hücre duvarı bütünlüğü korunduğundan bakteriyel lizis ve ani endotoksin/lipoteikoik asit fırtınası β-laktamlara kıyasla daha sınırlıdır.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Pulmoner Alveol (Sürfaktan Bariyeri)',
          tissueTarget: 'Tip II Pnömosit Sürfaktanı',
          accent: 'rose',
          points: [
            'Alveoler sürfaktandaki zengin fosfatidilgliserol, daptomisini Ca²⁺ varlığında irreversibl olarak kendi lipid agregatlarına hapseder → pnömonide sıfır etkinlik!',
            'Ayrıca sürfaktan-daptomisin komplekslerinin alveoler makrofajlarca fagositozu IL-5/eotaksin salınımını tetikleyerek Eozinofilik Pnömoni patogenezini başlatır.',
          ],
        },
        {
          systemTitle: 'İskelet Kası (Miyosit)',
          tissueTarget: 'Sarkolemma / Kas Lifi',
          accent: 'amber',
          points: [
            'Yüksek trough düzeylerinde (özellikle sık dozlama veya böbrek yetmezliğinde) daptomisin sarkolemmada mikro-hasar oluşturarak CPK salınımına ve miyonekroza yol açar.',
            'Günde tek doz (q24sa) uygulama kas liflerine dozlar arası onarım süresi tanıyarak bölünmüş dozlara kıyasla miyopatiyi belirgin azaltır.',
          ],
        },
        {
          systemTitle: 'Kardiyovasküler & Endokard',
          tissueTarget: 'Kan Akımı / Kalp Kapak Vejetasyonu',
          accent: 'teal',
          points: [
            'Çok düşük dağılım hacmi (0,1 L/kg) sayesinde plazmada yüksek pik konsantrasyonlara ulaşır ve fibrin-trombosit vejetasyonlarına hızla penetre olur.',
            'Sağ kalp MRSA endokarditi ve kateter ilişkili bakteriyemide vankomisine non-inferior / yüksek MİK’te üstündür.',
          ],
        },
        {
          systemTitle: 'Renal Sistem (Tübüler Güvenlik)',
          tissueTarget: 'Glomerüler Eliminasyon',
          accent: 'indigo',
          points: [
            'Vankomisinin aksine direkt nefrotoksisitesi düşüktür; ancak sekonder rabdomiyoliz gelişirse miyoglobinürik ATN tetikleyebilir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — Doz-Bağımlı Öldürme, "See-Saw" Sinerjisi & Direnç Bariyeri',
        summary:
          'Konsantrasyon-bağımlı bakterisidal etkisi ve uzun post-antibiyotik etkisi (PAE) sayesinde yüksek tek günlük dozlar (8–12 mg/kg) direnç mutant penceresini kapatır.',
        points: [
          'See-Saw Etkisi: MRSA daptomisine direnç kazanırken β-laktamlara duyarlılığı paradoksal olarak artar; daptomisin + seftarolin/nafsilin kombinasyonu kurtarma tedavisinde güçlü sinerji yaratır.',
          'Günde birden fazla (örn. q12sa) uygulama kas toksisitesini dramatik biçimde artırdığı için ASLA bölünmüş doz verilmez.',
        ],
      },
      clinicalPearls: [
        'Daptomisin için 3 altın kuralı unutma: (1) Pnömonide ASLA, (2) D5W ile ASLA (sadece SF), (3) Statinleri KES + haftalık CPK!',
        'eGFR <30 mL/dk’da dozu yarıya düşürme — aynı yüksek mg/kg dozu q48sa ver!',
        'Nöroaksiyel girişim veya ameliyat öncesi INR’yi daptomisin infüzyonu sonrası değil, mutlaka doz öncesi (trough) çektir.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Daptomisin',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'HMG-CoA Redüktaz İnhibitörleri (Atorvastatin, Rosuvastatin, Simvastatin)',
          mechanism: 'İskelet kası miyositlerinde sinerjik miyotoksisite.',
          clinicalEffect: 'Şiddetli CPK yükselmesi, miyopati ve akut böbrek hasarına yol açan rabdomiyoliz.',
          management: 'Daptomisin tedavisi süresince statinleri GEÇİCİ OLARAK KES; zorunlu devamda haftada 2× CPK ve kas semptomu izle.',
        },
        {
          severity: 'C',
          agent: 'Rekombinant Tromboplastin Reaktifleri (PT / INR Testi)',
          mechanism: 'Daptomisinin in vitro koagülasyon reaktifindeki fosfolipidlerle konsantrasyon-bağımlı etkileşimi.',
          clinicalEffect: 'Gerçek koagülopati olmadan yalancı PT/INR uzaması (gereksiz TDP/K vitamini veya blok iptali riski).',
          management: 'PT/INR kan örneğini bir sonraki daptomisin dozundan hemen önce (trough zamanı) al; şüphede farklı reaktif/TEG ile teyit et.',
        },
        {
          severity: 'C',
          agent: 'Tobramisin / Diğer Aminoglikozidler',
          mechanism: 'Potansiyel aditif böbrek/kas etkileşimi (klinik önemi düşük-orta).',
          clinicalEffect: 'Böbrek fonksiyonu bozulursa daptomisin birikimi ve CPK artışı.',
          management: 'Kreatinin ve CPK değerlerini yakından izle.',
        },
      ],
      references: [
        {
          authors: 'Liu C, Bayer A, Cosgrove SE, Daum RS, Fridkin SK, Gorwitz RJ, et al.',
          title: 'Clinical practice guidelines by the Infectious Diseases Society of America for the treatment of methicillin-resistant Staphylococcus aureus infections in adults and children',
          journal: 'Clinical Infectious Diseases',
          year: 2011,
          note: 'Ağır MRSA bakteriyemi ve endokarditinde yüksek doz Daptomisin (8–10 mg/kg/gün) önerisinin temel kaynağı.',
        },
        {
          authors: 'Silverman JA, Mortin LI, Vanpraagh AD, Li T, Alder J.',
          title: 'Inhibition of daptomycin by pulmonary surfactant: in vitro modeling and clinical impact',
          journal: 'Journal of Infectious Diseases',
          year: 2005,
          note: 'Daptomisinin pulmoner sürfaktan tarafından inaktivasyonunun moleküler ve klinik kanıtı.',
        },
        {
          authors: 'Kim PW, Sorbello AF, Wassel RT, Pham TM, Tonning JM, Nambiar S.',
          title: 'Eosinophilic pneumonia in patients treated with daptomycin: review of the literature and US FDA adverse event reporting system reports',
          journal: 'Drug Safety',
          year: 2012,
          note: 'Daptomisine bağlı eozinofilik pnömoni tanı kriterleri ve kortikosteroidle yönetim.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/monograph/daptomycin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },

  // ============================================================================
  // 4. KLARİTROMİSİN (CLARITHROMYCIN)
  // ============================================================================
  {
    id: 'clarithromycin',
    classTag: 'macrolide',
    accentColor: 'cyan',
    atcCode: 'J01FA09',
    classLabel: '14-Üyeli Makrolid Antibiyotik (YBÜ Ağır TKP Atipik & İmmünomodülatör Ajan)',
    tradeNamesTr: 'Klacid® IV 500 mg liyofilize flakon (+ 10 mL enjeksiyonluk su)',
    title: 'Klaritromisin (Clarithromycin IV) — YBÜ Ağır TKP, CYP3A4 İnhibisyonu & QTc Güvenliği',
    cardTitle: 'Klaritromisin (IV)',
    cardBadge: 'Güçlü CYP3A4 & QTc Riski',
    cardCategoryLabel: 'Makrolid • YBÜ TKP',
    cardShortDesc:
      'YBÜ ağır toplum kökenli pnömonide (TKP) β-laktam kombinasyon partneri (atipik + immünomodülatör). 500 mg IV q12sa ≥60 dk, 250 mL (≤2 mg/mL) zorunlu! Güçlü CYP3A4/P-gp inhibitörü ve QTc uzatıcısıdır.',
    cardHighlights: [
      {
        label: 'YBÜ Ağır TKP Dozu',
        value: '500 mg IV q12sa',
        subtext: '≥60 dk • 250 mL (≤2 mg/mL)',
        tooltip: 'ASLA IV bolus veya IM verilmez; >2 mg/mL ciddi flebit/ağrı yapar',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'CYP3A4 / P-gp Alarmı',
        value: 'GÜÇLÜ İNHİBİTÖR',
        subtext: 'Kolşisin (X!), Midazolam, Takrolimus',
        tooltip: 'Fentanil, Midazolam, Simvastatin, KKB, DOAC ve Takrolimus düzeylerini katlar',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Kardiyak Güvenlik',
        value: 'QTc Uzaması / TdP',
        subtext: 'Bazal EKG + K⁺/Mg²⁺ kontrolü',
        tooltip: 'hERG potasyum kanal blokajı → Torsades de Pointes riski',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'Sulandırma & Renal',
        value: 'Önce 10 mL Su!',
        subtext: 'CrCl <30: %50 azalt (q24sa)',
        tooltip: 'Direkt SF ile sulandırma çökme yapar; önce mutlaka 10 mL steril su!',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
    ],
    aliases: ['Clarithromycin', 'Klaritromisin', 'Klacid', 'Klacid IV'],
    searchKeywords: [
      'klaritromisin',
      'clarithromycin',
      'klacid',
      'makrolid',
      'tkp',
      'pnömoni',
      'legionella',
      'mycoplasma',
      'cyp3a4',
      'kolşisin',
      'midazolam',
      'qtc',
      'torsades',
      'flebit',
    ],
    highAlert: {
      tallManName: 'KLARİTROmi̇si̇n (clarithroMYCIN)',
      confusionRiskWith:
        'Klindamisin (clindamycin), Eritromisin, Azitromisin (CYP3A4 profili tamamen farklıdır!).',
      criticalAlerts: [
        'GÜÇLÜ CYP3A4 + P-gp İNHİBİTÖRÜ (ÖLÜMCÜL ETKİLEŞİMLER!): Kolşisin (X — fatal pansitopeni!), Simvastatin/Lovastatin (X — rabdomiyoliz!), Midazolam/Fentanil (uzamış derin koma/apne!), Takrolimus/Siklosporin (akut nefrotoksisite!), KKB (hipotansiyon + ABH!) ve DOAC’larla şiddetli etkileşim yapar!',
        'ASLA IV BOLUS veya IM VERİLMEZ — DİREKT SF İLE SULANDIRILMAZ: Önce mutlaka 10 mL steril enjeksiyonluk su ile çözülür (SF ile direkt sulandırma ÇÖKME yapar!), ardından en az 250 mL SF/D5W içine eklenip (≤2 mg/mL) ≥60 dakikada infüze edilir!',
        'QTc UZAMASI & TORSADES DE POINTES: hERG (IKr) blokajı yapar; bazal QTc >480–500 ms, hipokalemi, hipomagnezemi veya amiodaron/haloperidol/ondansetron varlığında ölümcül aritmi tetikleyebilir.',
        'YBÜ’DE AZİTROMİSİN TERCİH KURALI: Hasta midazolam, fentanil, takrolimus, amiodaron, kalsiyum kanal blokeri veya DOAC alıyorsa klaritromisin yerine CYP3A4 inhibisyonu minimal olan AZİTROMİSİN seçilmelidir!',
      ],
      antidoteOrRescue:
        'Spesifik antidot yoktur. QTc uzaması ve Torsades de Pointes geliştiğinde ilacı derhal kes, 2 g IV Magnezyum Sülfat (10–15 dk) ver, K⁺ >4,0–4,5 mEq/L hedefle ve gerekirse geçici overdrive pacing / izoproterenol uygula. CYP3A4 aracılı opioid/benzodiazepin toksisitesinde nalokson/flumazenil ve solunum desteği sağlanır.',
    },
    identitySummary:
      'Klaritromisin, yarı-sentetik 14-üyeli bir makrolid antibiyotiktir. Yoğun bakımda ağır toplum kökenli pnömoni (TKP) tedavisinde β-laktam antibiyotiklere (seftriakson, ampisilin-sulbaktam) eklenerek hem atipik patojenleri (Legionella, Mycoplasma, Chlamydophila) kapsar hem de NF-κB baskılanması üzerinden immünomodülatör mortalite avantajı sunar. Ancak güçlü ve mekanizma-bazlı CYP3A4 + P-gp inhibisyonu ile QTc uzaması riski nedeniyle polifarmasi altındaki YBÜ ve perioperatif hastalarda yüksek etkileşim dikkatini gerektirir.',
    spectrumHighlights: [
      {
        title: 'Atipik Solunum Patojenleri & İmmünomodülasyon',
        detail:
          'Legionella pneumophila, Mycoplasma pneumoniae, Chlamydophila pneumoniae, Bordetella pertussis, Moraxella catarrhalis, H. influenzae (aktif 14-OH metaboliti ile sinerjik), Helicobacter pylori, MAC (Mycobacterium avium complex).',
        tone: 'emerald',
      },
      {
        title: 'Pnömokok Direnci & Kombinasyon Zorunluluğu',
        detail:
          'Türkiye’de S. pneumoniae makrolid direnci yüksek olduğundan (%30–50) ağır TKP’de ASLA monoterapi olarak kullanılmaz; mutlaka bir anti-pnömokokal β-laktam ile kombine edilir (bakterisidal + anti-inflamatuvar sinerji).',
        tone: 'amber',
      },
      {
        title: 'Kapsam Dışı Patojenler',
        detail:
          'MRSA, Enterokoklar, Enterobacterales (E. coli, Klebsiella), Pseudomonas aeruginosa, Acinetobacter ve B. fragilis dahil anaerobların çoğuna etkisizdir.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Bakteriyel 50S ribozomal alt biriminin 23S rRNA peptidil transferaz bölgesine bağlanarak aminoaçil-tRNA translokasyonunu bloke eder ve protein sentezini durdurur (bakteriyostatik; yüksek konsantrasyonda bazı solunum patojenlerine bakterisidal). Antibakteriyel etkisine ek olarak makrofaj ve nötrofillerde pro-inflamatuvar sitokin (IL-6, TNF-α, IL-8) üretimini baskılayarak ağır TKP’de immünomodülatör koruma sağlar.',
    mechanismPillars: [
      {
        title: '50S Ribozomal Translokasyon İnhibisyonu',
        detail:
          'Peptid zincirinin uzamasını ve bakteri virülans faktörlerinin (örn. pnömolizin) sentezini erken aşamada bloke eder; aktif 14-hidroksi-klaritromisin metaboliti H. influenzae’ya karşı ana ilaçtan daha aktiftir.',
      },
      {
        title: 'YBÜ Sepsisinde İmmünomodülatör Etki',
        detail:
          'NF-κB ve AP-1 transkripsiyon faktörlerini baskılayarak pnömokok/atipik pnömonide aşırı alveoler nötrofil infiltrasyonunu ve sitokin fırtınasını (ACCESS/INCLASS çalışmaları) azaltır.',
      },
      {
        title: 'İrreversibl CYP3A4 & hERG (IKr) Blokajı',
        detail:
          'Karaciğer ve bağırsakta CYP3A4 ile metabolik ara ürün kompleksi oluşturarak enzimi uzun süreli inaktive eder; aynı zamanda kardiyak hERG potasyum kanallarını bloke ederek aksiyon potansiyeli ve QTc süresini uzatır.',
      },
    ],
    pkCards: [
      {
        label: 'Aktif Metabolit',
        value: '14-OH-Klaritromisin',
        detail: 'CYP3A4 ile oluşur; ana ilaçla birlikte sinerjik antibakteriyel aktivite gösterir.',
      },
      {
        label: 'Eliminasyon Yarı Ömrü (t½)',
        value: '5–7 saat (500 mg q12sa)',
        detail: '14-OH metabolitinin t½’si 7–9 saat; CrCl <30 mL/dk’da >20 saate uzar.',
      },
      {
        label: 'Doku Penetrasyonu (ELF/Makrofaj)',
        value: 'Plazmanın 10–50×',
        detail: 'Alveoler makrofaj ve akciğer epitelyal sıvısında çok yüksek konsantrasyonlara ulaşır.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%42–70',
        detail: 'Konsantrasyona bağlı orta düzeyde bağlanma.',
      },
      {
        label: 'Atılım Yolu',
        value: 'Hepatik + %30–40 Renal',
        detail: 'Azitromisinden farklı olarak belirgin renal atılımı vardır → CrCl <30’da %50 doz azaltılır!',
      },
      {
        label: 'Enzim İnhibisyonu',
        value: 'Güçlü CYP3A4 + P-gp',
        detail: 'İlaç kesildikten sonra bile yeni CYP3A4 sentezi için inhibisyon 2–3 gün sürebilir.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Makrolidlere karşı belgelenmiş aşırı duyarlılık.',
        'Eşzamanlı Kolşisin (özellikle böbrek veya karaciğer yetmezliğinde — ÖLÜMCÜL toksisite!), Simvastatin, Lovastatin, Tikagrelor (etkinlik/kanama riski — çoğu kılavuzda kaçın), Lomitapid, Ergot türevleri, Pimozid veya Sisaprid kullanımı.',
        'Konjenital uzun QT sendromu, belgelenmiş Torsades de Pointes öyküsü, düzeltilmemiş hipokalemi veya hipomagnezemi.',
        'Klaritromisine bağlı kolestatik sarılık / hepatik disfonksiyon öyküsü.',
        'IV bolus veya IM uygulama.',
      ],
      relativeItems: [
        'Eşzamanlı Midazolam, Fentanil, Takrolimus, Siklosporin, Kalsiyum Kanal Blokerleri (amlodipin/verapamil/diltiazem) veya DOAC kullanımı — şiddetli toksisite riski nedeniyle mümkünse AZİTROMİSİN tercih edilmelidir.',
        'Sınıf IA/III antiaritmikler (amiodaron, sotalol) veya QTc uzatan YBÜ ajanları (haloperidol, ondansetron, florokinolonlar) — sıkı EKG/QTc izlemi gerekir.',
        'Myastenia Gravis — semptomları alevlendirebilir.',
        'Ağır böbrek yetmezliği (CrCl <30 mL/dk) ile birlikte orta-ağır karaciğer yetmezliği.',
      ],
      clinicalNote:
        'Yoğun bakım hastasında klaritromisin başlamadan önce mutlaka ilaç listesi (özellikle statin, kolşisin, takrolimus, KKB, midazolam/fentanil, amiodaron) ve bazal EKG (QTc) taranmalıdır.',
    },
    regimenCards: [
      {
        title: 'YBÜ Ağır Toplum Kökenli Pnömoni — TKP (β-Laktam ile Kombine)',
        setting: 'icu',
        badge: 'ERS/ESICM/ATS-IDSA',
        dose: '500 mg IV q12sa',
        infusionDuration: 'En az 60 dakika (250 mL SF veya D5W içinde ≤2 mg/mL)',
        interval: 'q12sa (klinik stabilizasyonla PO geçiş; toplam 5–7 gün; Legionella’da 7–14 gün)',
        note: 'Seftriakson veya Ampisilin-Sulbaktam ile kombine edilir. Yüksek flebit riski nedeniyle 250 mL’den az hacimde veya 60 dk’dan hızlı verilmemelidir.',
      },
      {
        title: 'Ağır Böbrek Yetmezliği (CrCl <30 mL/dk) TKP Rejimi',
        setting: 'special',
        badge: 'Renal Doz Azaltımı',
        dose: '250 mg IV q12sa veya 500 mg IV q24sa',
        infusionDuration: 'En az 60 dakika (≤2 mg/mL)',
        interval: 'q12sa (250 mg) veya q24sa (500 mg)',
        note: 'Hem ana ilaç hem aktif 14-OH metaboliti birikir; doz %50 azaltılmazsa QTc uzaması ve GİS/SSS toksisitesi keskin biçimde artar.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Klaritromisin erişkinde sabit dozlu (500 mg IV q12sa) uygulanır; obezitede rutin doz artırımı önerilmez (QTc ve hepatotoksisite riski nedeniyle).',
      perioperative: {
        applicable: false,
        summaryTitle: 'Perioperatif Cerrahi Profilakside KULLANILMAZ',
        timingWindow: 'Profilaksi endikasyonu yoktur',
        standardDoseLabel: 'Endike değil',
        adultStandardDoseMg: 0,
        infusionTimeText: '—',
        clinicalNote:
          'Klaritromisin cerrahi profilaksi ajanı değildir (acil sezaryen profilaksisinde kullanılan makrolid AZİTROMİSİN’dir!).',
        nonProphylaxisReason:
          'Cerrahi profilaksi kanıtı yoktur; güçlü CYP3A4 inhibisyonu anestezik ajanlarla (midazolam/fentanil) tehlikeli etkileşim yapar.',
      },
      icu: {
        pkPdTarget: 'fAUC₂₄/MIC ≥ 25–30 + İmmünomodülasyon',
        pkPdBadge: 'AUC/MIC & Anti-inflamatuvar',
        loadingDoseLabel: 'Yükleme gerekmez — Direkt 500 mg IV (≥60 dk)',
        loadingFixedMg: 500,
        loadingUnit: 'mg',
        loadingInfusionText: '250 mL SF/D5W içinde (≤2 mg/mL) en az 60 dakikada infüzyon',
        maintenanceLabel: 'YBÜ Standart / Renal İdame Rejimi',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'clari-icu-std',
            label: 'Standart YBÜ Ağır TKP (500 mg IV q12sa)',
            singleDoseMg: 500,
            intervalHours: 12,
            infusionHours: 1,
            diluentVolumeMl: 250,
            note: 'CrCl ≥30 mL/dk; mutlaka 250 mL içinde (2 mg/mL) ve en az 60 dk’da verilir.',
          },
          {
            id: 'clari-renal-24',
            label: 'Ağır Böbrek Yetmezliği CrCl <30 (500 mg IV q24sa)',
            singleDoseMg: 500,
            intervalHours: 24,
            infusionHours: 1,
            diluentVolumeMl: 250,
            note: 'CrCl <30 mL/dk için %50 azaltılmış günlük toplam doz (alternatif: 250 mg q12sa).',
          },
        ],
        tdmNote: 'Rutin TDM yapılmaz; bazal ve seri 12-derivasyon EKG (QTc <500 ms), K⁺/Mg²⁺ ve eşzamanlı CYP3A4 ilaç düzeyleri (takrolimus/siklosporin) izlenmelidir.',
      },
      renalTiers: [
        {
          id: 'clari-egfr-30',
          label: 'Normal – Orta Böbrek (CrCl ≥30)',
          egfrRange: '≥ 30 mL/dk',
          recommendation: 'Tam Doz',
          doseText: '500 mg IV q12sa (250 mL, ≥60 dk)',
          note: 'Doz değişikliği gerekmez.',
          tone: 'emerald',
        },
        {
          id: 'clari-egfr-low',
          label: 'Ağır Böbrek Yetmezliği (CrCl <30)',
          egfrRange: '< 30 mL/dk',
          recommendation: 'Dozu %50 Azalt',
          doseText: '250 mg IV q12sa veya 500 mg IV q24sa',
          note: 'Aktif 14-OH metabolit birikimini ve QTc toksisitesini önlemek için zorunludur.',
          tone: 'rose',
        },
        {
          id: 'clari-hd',
          label: 'Hemodiyaliz (HD)',
          egfrRange: 'HD',
          recommendation: '%50 Doz (HD Sonrası Ver)',
          doseText: '500 mg IV q24sa (HD günlerinde diyaliz sonrası)',
          note: 'HD ile klirens düşüktür; günde tek doz 500 mg (veya 250 mg q12sa) uygulanır.',
          tone: 'amber',
        },
        {
          id: 'clari-crrt',
          label: 'CRRT (CVVH / CVVHDF)',
          egfrRange: 'Sürekli RRT',
          recommendation: '500 mg q12–24sa (Effluent Hızına Göre)',
          doseText: '500 mg IV q12sa (yüksek akım) veya 500 mg IV q24sa (düşük akım)',
          note: 'Orta düzey protein bağlanması (%42–70) nedeniyle CRRT’de kısmi klirens vardır; ağır TKP’de 500 mg q12sa sık tercih edilir ancak QTc yakından izlenir.',
          tone: 'sky',
        },
      ],
      crrtSummary:
        'CRRT’de klaritromisin kısmen uzaklaştırılır; ağır TKP’de yüksek akımlı CRRT’de 500 mg IV q12sa, düşük akımda veya QTc/toksisite riskinde 500 mg IV q24sa uygulanır.',
      hdSummary:
        'Hemodiyaliz klaritromisini anlamlı temizlemez; toplam günlük doz %50 azaltılır (500 mg q24sa veya 250 mg q12sa, HD günlerinde diyaliz sonrası).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Klacid® IV 500 mg Flakon',
          presentation: '500 mg klaritromisin (laktobionat) liyofilize toz + 10 mL steril enjeksiyonluk su ampulü',
          concentration: '10 mL steril su ile sulandırıldığında 50 mg/mL (ASLA direkt verilmez!) → 250 mL SF/D5W içinde 2 mg/mL',
          saltOrBaseNote: 'ÖNCE YALNIZCA 10 mL STERİL SU ile çözülür! Direkt %0,9 NaCl eklemek çökelti oluşturur!',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        '1. Adım (Rekonstitüsyon): Flakona YALNIZCA 10 mL steril enjeksiyonluk su ekle ve tamamen çözülene kadar çalkala (50 mg/mL).',
        '2. Adım (Seyreltme): 10 mL konsantre çözeltiyi 250 mL %0,9 NaCl, %5 Dekstroz veya Laktatlı Ringer torbasına ekle (nihai derişim = 2 mg/mL).',
        '3. Adım (İnfüzyon): En az 60 dakikada geniş bir proksimal venden veya santral yoldan uygula.',
      ],
      concentrationTrapWarning:
        'SULANDIRMA & FLEBİT TUZAĞI: (1) Flakonu steril su yerine direkt SF ile sulandırmak anında ÇÖKME yapar! (2) 500 mg’ı 100 mL’de (5 mg/mL) vermek şiddetli venöz ağrı ve tromboflebit yapar — mutlaka ≥250 mL (≤2 mg/mL) ve ≥60 dk!',
    },
    compatibility: {
      accessRequirement: 'central-preferred',
      accessSummary:
        'Periferik venden yalnızca ≥250 mL (≤2 mg/mL) dilüsyonla geniş damardan ve ≥60 dakikada verilebilir; yine de flebit sıklığı (%15–30) yüksektir — YBÜ’de santral venöz kateter tercih edilir.',
      phRange: 'pH 4,8 – 6,0 (Hafif asidik laktobionat tuzu; yüksek lokal endotel irritasyonu)',
      osmolalityNote: '250 mL SF/D5W içinde ~290–320 mOsm/kg; kimyasal irritasyon pH ve ilaç yapısından kaynaklanır.',
      compatibleDiluents: ['%0,9 NaCl (SF — sadece 2. aşama seyreltmede!)', '%5 Dekstroz (D5W)', 'Laktatlı Ringer (LR)'],
      ySiteCompatible: ['Sınırlı veri — tek başına/ayrı lümenden verilmesi şiddetle önerilir'],
      ySiteIncompatible: [
        'Sefepim / Seftazidim / Seftriakson / Sefazolin',
        'Piperasilin-Tazobaktam',
        'Furosemid',
        'Heparin',
        'İnsülin',
        'Amiodaron / Fenitoin / Pantoprazol / Propofol',
      ],
      stabilityNote:
        '10 mL steril su ile sulandırılan konsantre oda sıcaklığında 24 saat, 5°C’de 48 saat stabildir; 250 mL SF/D5W içinde seyreltilen infüzyon oda sıcaklığında 6 saat, 5°C’de 48 saat içinde kullanılmalıdır.',
      extravasationProtocol:
        'İrritan özelliktedir; ekstravazasyon veya ağrılı flebitte infüzyonu durdur, hattı değiştir, ekstremiteyi eleve et ve lokal soğuk/ılık kompres uygula.',
    },
    organImpairment: {
      renalSummary:
        'CrCl <30 mL/dk’da ana ilaç ve aktif 14-OH metabolit biriktiğinden toplam günlük doz %50 azaltılmalıdır (250 mg q12sa veya 500 mg q24sa).',
      renalDetails: [
        'Böbrek yetmezliği olan hastada klaritromisin + kalsiyum kanal blokeri (amlodipin/nifedipin) birlikteliği akut böbrek hasarı ve hipotansiyon nedeniyle hastane yatışını belirgin artırır.',
      ],
      hepaticSummary: 'Normal böbrek fonksiyonu varsa hafif-orta karaciğer yetmezliğinde doz ayarı gerekmez (14-OH oluşumu azalır, renal atılım artar); ağır karaciğer yetmezliğinde ve kolestatik hepatitte kaçınılır.',
      hepaticDetails: [
        'Klaritromisin nadiren kolestatik/hepatoselüler ilaca bağlı karaciğer hasarı (DILI) yapabilir; transaminaz/bilirubin yükselirse kesilmelidir.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: Yüksek QTc & Polifarmasi/CYP3A4 Riski!',
      geriatricPoints: [
        'Yaşlılarda polifarmasi (statin, KKB, DOAC, amiodaron, kolşisin) ve azalmış CrCl nedeniyle klaritromisin kaynaklı hastane yatışı ve kardiyak ölüm riski yüksektir.',
        'Mümkün olan her yaşlı YBÜ hastasında daha güvenli etkileşim profili nedeniyle Azitromisin değerlendirilmelidir.',
      ],
      obesityWeightScalarBadge: 'Sabit Doz (500 mg IV q12sa)',
      obesityPoints: [
        'Erişkinlerde sabit 500 mg q12sa uygulanır; vücut ağırlığına göre doz artırılmaz.',
      ],
      clinicalNote:
        'Yaşlıda klaritromisin + amlodipin (KKB) veya klaritromisin + kolşisin reçetesi klinik farmakolojide en sık önlenebilir iyatrojenik YBÜ yatış nedenlerindendir.',
    },
    pregnancyLactation: {
      pregnancySummary:
        'Gebelikte İLK SEÇENEK DEĞİLDİR (hayvanlarda yüksek dozda teratojenite ve bazı epidemiyolojik çalışmalarda ilk trimester düşük riski artışı bildirilmiştir) — gebelikte makrolid gerekiyorsa AZİTROMİSİN tercih edilir!',
      pregnancyDetails: [
        'Yalnızca alternatifin olmadığı ve maternal yararın fetal riskten açıkça üstün olduğu durumlarda değerlendirilir.',
      ],
      lactationSummary: 'Anne sütüne düşük oranda geçer; genelde uyumlu kabul edilse de emzirmede de Azitromisin daha sık tercih edilir.',
      lactationDetails: [
        'Yenidoğanda (ilk 2 hafta) makrolid maruziyeti ile infantil hipertrofik pilor stenozu arasında olası zayıf ilişki nedeniyle dikkatli olunur.',
      ],
    },
    adverseEffects: [
      {
        title: 'QTc Uzaması & Torsades de Pointes',
        incidenceOrSeverity: 'Nadir ama Ölümcül',
        detail:
          'Kardiyak hERG (IKr) potasyum kanal blokajı → ventriküler repolarizasyon uzaması ve polimorfik VT. Elektrolitleri (K⁺, Mg²⁺) düzelt, bazal EKG çek.',
        tone: 'rose',
      },
      {
        title: 'İnfüzyon Bölgesi Flebiti & Venöz Ağrı',
        incidenceOrSeverity: '%15–30 • Çok Sık (IV Form)',
        detail:
          'Özellikle 250 mL’den az seyreltmede veya <60 dk infüzyonda şiddetli lokal ağrı, kızarıklık ve tromboflebit. Geniş ven veya santral hat kullan.',
        tone: 'amber',
      },
      {
        title: 'Şiddetli CYP3A4 İlaç Toksisiteleri',
        incidenceOrSeverity: 'YBÜ’de Çok Yüksek Risk',
        detail:
          'Kolşisin toksisitesi, statin rabdomiyolizi, midazolam/fentanil aşırı sedasyonu, takrolimus nefrotoksisitesi, KKB hipotansiyon/ABH ve DOAC kanaması.',
        tone: 'rose',
      },
      {
        title: 'GİS İntoleransı, Disguzi & Hepatotoksisite',
        incidenceOrSeverity: '%5–15',
        detail:
          'Motilin reseptör uyarımına bağlı bulantı/diyare/abdominal kramp, metalik tat (disguzi), geçici AST/ALT artışı ve nadiren kolestatik hepatit veya SSS deliryumu.',
        tone: 'indigo',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'YBÜ Sedasyon & Analjezi (Midazolam / Fentanil) Birikimi',
        detail:
          'Klaritromisin CYP3A4’ü güçlü inhibe ettiğinden sürekli midazolam veya fentanil infüzyonu alan mekanik ventilasyon hastasında derlenme ve ekstübasyon günlerce gecikebilir; sedasyon skorları sıkı izlenmeli veya Azitromisin seçilmelidir.',
      },
      {
        title: 'Solid Organ Nakli Hastaları (Takrolimus / Siklosporin)',
        detail:
          'Klaritromisin kalsinörin inhibitörü düzeylerini 3–5 kat fırlatarak akut greft nefrotoksisitesi ve nörotoksisiteye (PRES) yol açar → nakil hastalarında klaritromisinden KAÇIN, Azitromisin kullan!',
      },
      {
        title: 'Kalsiyum Kanal Blokeri + Klaritromisin ABH Sendromu',
        detail:
          'Amlodipin, nifedipin, felodipin, diltiazem veya verapamil alan hipertansif hastada klaritromisin eklenmesi şiddetli vazodilatasyon, hipotansiyon, bradikardi ve prerenal/iskemik ABH tetikler.',
      },
      {
        title: 'Myastenia Gravis Alevlenmesi',
        detail:
          'Makrolidler nöromüsküler iletimi baskılayarak miyastenik krizi ve solunum yetmezliğini tetikleyebilir; MG hastasında zorunlu olmadıkça kaçınılmalıdır.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — 50S Ribozomal 23S rRNA Bağlanması & Peptid Çıkış Tüneli Blokajı',
        summary:
          'Klaritromisin, bakteriyel 50S ribozomunun peptid çıkış tüneli girişindeki 23S rRNA (A2058/A2059) nükleotidlerine bağlanarak büyüyen polipeptid zincirinin geçişini tıkar.',
        points: [
          'Ribozomdan peptidil-tRNA erken ayrılır ve bakteri protein sentezi durur; bu etki özellikle hücre içi atipik patojenlerde (Legionella, Mycoplasma) yüksek makrofaj içi birikimle güçlüdür.',
          'erm(B) metilaz direnci A2058 bölgesini metilleyerek makrolid bağlanmasını engeller (MLSB fenotipi).',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — İmmünomodülasyon (NF-κB) & Konak CYP3A4/hERG Etkileşimi',
        summary:
          'Antibakteriyel mekanizmasının ötesinde, konak immün hücrelerinde inflamasyon yolaklarını baskılarken hepatosit CYP3A4 enzimini ve kardiyomiyosit IKr kanalını bloke eder.',
        points: [
          'Anti-inflamatuvar Etki: Makrofaj ve bronş epitelinde ERK1/2 ve NF-κB aktivasyonunu azaltarak IL-1β, IL-6, IL-8 ve TNF-α sentezini baskılar; pnömokok sepsisinde aşırı akciğer hasarını hafifletir.',
          'Mekanizma-Bazlı CYP3A4 İnhibisyonu: Klaritromisinin nitrozoalkan ara metaboliti CYP3A4 hem grubuna kovalent benzeri sıkı bağlanır → yeni enzim sentezlenene kadar (48–72 sa) kalıcı inhibisyon oluşur.',
          'hERG (KCNH2) Blokajı: Kardiyak hızlı gecikmiş doğrultucu K⁺ kanalını (IKr) inhibe ederek faz 3 repolarizasyonu uzatır ve erken ard-depolarizasyonlarla (EAD) Torsades de Pointes zeminini hazırlar.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Pulmoner Parankim & Alveoler Makrofaj',
          tissueTarget: 'ELF / Fagolizozom',
          accent: 'teal',
          points: [
            'Zayıf bazik yapısı nedeniyle asidik lizozomlarda iyon tuzağıyla plazmanın 10–50 katı düzeylere ulaşır.',
            'Hücre içi yerleşimli Legionella pneumophila eradikasyonunda ve ağır TKP mortalite azalmasında belirleyicidir.',
          ],
        },
        {
          systemTitle: 'Kardiyovasküler İletim Sistemi',
          tissueTarget: 'Ventriküler Miyokard (hERG/IKr)',
          accent: 'rose',
          points: [
            'Doz-bağımlı QTc uzaması yapar; yapısal kalp hastalığı, bradikardi, hipokalemi/hipomagnezemi ve diğer QT uzatan ilaçlarla risk katlanır.',
          ],
        },
        {
          systemTitle: 'Hepatobiliyer & Enterosit Metabolizması',
          tissueTarget: 'CYP3A4 / P-glikoprotein / OATP1B1',
          accent: 'amber',
          points: [
            'Hem hepatik/intestinal CYP3A4’ü hem de P-gp ve OATP1B1/1B3 taşıyıcılarını inhibe ederek çok geniş bir ilaç grubunun (statin, kolşisin, DOAC, takrolimus, midazolam) plazma AUC’sini katlar.',
          ],
        },
        {
          systemTitle: 'Gastrointestinal Motilite',
          tissueTarget: 'Enterik Motilin Reseptörleri',
          accent: 'indigo',
          points: [
            'Eritromisinden zayıf olmakla birlikte motilin reseptör agonizması yaparak GİS krampları ve ishale yol açabilir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — β-Laktam + Makrolid Sinerjisi & Klinik Seçim Stratejisi',
        summary:
          'Ağır TKP’de β-laktam + klaritromisin kombinasyonu (ACCESS randomize çalışması dahil) erken klinik yanıtı ve sağkalımı artırır; ancak polifarmasi yüküne göre azitromisinle karşılaştırılmalıdır.',
        points: [
          'β-laktam bakteri duvarını parçalarken salınan pro-inflamatuvar ürünler makrolidin ribozomal toksin (pnömolizin) inhibisyonu ve NF-κB baskılaması ile dengelenir.',
          'İlaç etkileşimi olmayan hastada klaritromisin güçlü bir YBÜ TKP partneridir; ancak çoklu CYP3A4 substratı (midazolam, takrolimus, KKB, statin, DOAC) alan YBÜ hastasında AZİTROMİSİN net biçimde daha güvenlidir.',
        ],
      },
      clinicalPearls: [
        'Klacid IV flakonu ÖNCE 10 mL steril su ile çözülür, SONRA 250 mL SF/D5W içine konur — direkt SF ekleme, 100 mL’de gönderme!',
        'Klaritromisin yazmadan önce hastanın reçetesinde şu 5 ilacı mutlaka kontrol et: Kolşisin, Statin, Takrolimus, Kalsiyum Kanal Blokeri, Midazolam/Fentanil.',
        'CrCl <30 mL/dk’da dozu mutlaka %50 azalt (500 mg q24sa veya 250 mg q12sa).',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Klaritromisin',
      structuredInteractions: [
        {
          severity: 'X',
          agent: 'Kolşisin',
          mechanism: 'Güçlü CYP3A4 + P-gp inhibisyonu ile kolşisin klirensinde dramatik çöküş.',
          clinicalEffect: 'ÖLÜMCÜL pansitopeni, nöromiyopati, çoklu organ yetmezliği ve ölüm (özellikle böbrek/karaciğer yetmezliğinde).',
          management: 'KESİNLİKLE KONTRENDİKE! Kolşisin alan hastada klaritromisin kullanma (gerekirse azitromisin veya doksisiklin değerlendir; kolşisini kes).',
        },
        {
          severity: 'X',
          agent: 'Simvastatin / Lovastatin (Atorvastatin: D)',
          mechanism: 'CYP3A4 ve OATP1B1 inhibisyonu ile statin AUC’sinde 5–10+ kat artış.',
          clinicalEffect: 'Ağır rabdomiyoliz, miyoglobinürik ABH ve hiperkalemi.',
          management: 'Simvastatin/lovastatin ile kontrendike; atorvastatin tedavi süresince geçici kesilmeli veya klaritromisin yerine azitromisin seçilmelidir.',
        },
        {
          severity: 'D',
          agent: 'Midazolam / Fentanil / Alfentanil (Anestezi & YBÜ Sedasyonu)',
          mechanism: 'Güçlü CYP3A4 inhibisyonu ile hepatik klirensin belirgin azalması.',
          clinicalEffect: 'Uzamış derin sedasyon, deliryum, ekstübasyon gecikmesi ve solunum depresyonu.',
          management: 'Mümkünse Azitromisin tercih et; birlikte kullanımda sedatif/opioid dozunu azalt ve RASS/solunum takibini sıklaştır.',
        },
        {
          severity: 'D',
          agent: 'Takrolimus / Siklosporin / Sirolimus',
          mechanism: 'CYP3A4 + P-gp inhibisyonu ile kalsinörin inhibitörü düzeylerinde 3–5 kat artış.',
          clinicalEffect: 'Akut nefrotoksisite, nörotoksisite (PRES), hiperkalemi ve QTc uzaması.',
          management: 'Transplant hastalarında klaritromisinden KAÇIN (Azitromisin tercih et); zorunlu kullanımda takrolimus dozunu proaktif azalt ve günlük düzey izle.',
        },
        {
          severity: 'D',
          agent: 'Kalsiyum Kanal Blokerleri (Amlodipin, Nifedipin, Verapamil, Diltiazem)',
          mechanism: 'CYP3A4 inhibisyonu ile KKB sistemik maruziyetinde keskin artış.',
          clinicalEffect: 'Derin hipotansiyon, bradikardi/AV blok ve akut böbrek hasarı (ABH).',
          management: 'Azitromisin tercih et; zorunlu kullanımda KKB dozunu geçici azalt veya kes, TA ve kreatinin izle.',
        },
        {
          severity: 'D',
          agent: 'DOAC’lar (Apiksaban, Rivaroksaban, Dabigatran, Edoksaban) & Varfarin',
          mechanism: 'CYP3A4 ve/veya P-gp inhibisyonu ile antikoagülan birikimi.',
          clinicalEffect: 'Majör GİS/intrakraniyal kanama riskinde belirgin artış.',
          management: 'Azitromisin tercih et; varfarinde sık INR izlemi, DOAC’ta kanama/böbrek fonksiyonu takibi ve alternatif antibiyotik seçimi yap.',
        },
        {
          severity: 'D',
          agent: 'Amiodaron / Haloperidol / Ondansetron / Siprofloksasin',
          mechanism: 'Aditif hERG (IKr) potasyum kanal blokajı (+ CYP3A4 inhibisyonu).',
          clinicalEffect: 'Ağır QTc uzaması ve Torsades de Pointes riski.',
          management: 'Bazal ve seri EKG çek (QTc >500 ms ise kes); K⁺ >4,0 mEq/L ve Mg²⁺ >2,0 mg/dL tut.',
        },
      ],
      references: [
        {
          authors: 'Giamarellos-Bourboulis EJ, Siampi V, Karagiannidis C, et al. (ACCESS Trial Group).',
          title: 'Clarithromycin for early anti-inflammatory responses in community-acquired pneumonia in Greece (ACCESS): a randomised, double-blind, placebo-controlled trial',
          journal: 'The Lancet Respiratory Medicine',
          year: 2024,
          note: 'Ağır TKP’de β-laktama klaritromisin eklenmesinin erken anti-inflamatuvar klinik yanıt üstünlüğünü gösteren randomize çalışma.',
        },
        {
          authors: 'Metlay JP, Waterer GW, Long AC, Anzueto A, Brozek J, Crothers K, et al.',
          title: 'Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the ATS and IDSA',
          journal: 'American Journal of Respiratory and Critical Care Medicine',
          year: 2019,
          note: 'YBÜ ağır TKP’de β-laktam + makrolid kombinasyonu güçlü önerisi.',
        },
        {
          authors: 'Gandhi S, Fleet JL, Bailey DG, McArthur E, Wald R, Rehman F, Garg AX.',
          title: 'Calcium-channel blocker–clarithromycin drug interactions and acute kidney injury',
          journal: 'JAMA',
          year: 2013,
          note: 'Klaritromisin + KKB etkileşiminin azitromisine kıyasla ABH, hipotansiyon ve mortalite artışını kanıtlayan kohort.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/monograph/clarithromycin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },

  // ============================================================================
  // 5. AZİTROMİSİN (AZITHROMYCIN)
  // ============================================================================
  {
    id: 'azithromycin',
    classTag: 'macrolide',
    accentColor: 'cyan',
    atcCode: 'J01FA10',
    classLabel: 'Azalid Makrolid Antibiyotik (YBÜ Ağır TKP & Obstetrik Acil Sezaryen Profilaksisi)',
    tradeNamesTr: 'Zitromax® IV 500 mg, Azitro® IV 500 mg, Azeltin® IV 500 mg liyofilize flakon',
    title: 'Azitromisin (Azithromycin IV) — YBÜ Ağır TKP & Obstetrik Sezaryen (C/SOAP) Profilaksisi',
    cardTitle: 'Azitromisin (IV)',
    cardBadge: 'C/SOAP Sezaryen • Minimal CYP',
    cardCategoryLabel: 'Azalid • TKP & Obstetrik',
    cardShortDesc:
      'YBÜ ağır TKP’de β-laktam partneri ve travay/EMR’li acil sezaryende Sefazolin’e ek 500 mg IV altın standart (C/SOAP NEJM 2016). Minimal CYP3A4 inhibisyonu, böbrek ayarı gerekmez; ASLA bolus/IM değil!',
    cardHighlights: [
      {
        label: 'Obstetrik Altın Standart',
        value: '500 mg IV (1 sa)',
        subtext: 'Acil C/S + Sefazolin (C/SOAP)',
        tooltip: 'Travay başlamış/EMR’li sezaryende endometrit ve yara enfeksiyonunu %50 azaltır',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
      {
        label: 'YBÜ Ağır TKP Dozu',
        value: '500 mg IV q24sa',
        subtext: 'Minimal CYP3A4! (Klaritro’ya üstün)',
        tooltip: 'Takrolimus, midazolam, fentanil ve statin alan YBÜ hastalarında güvenli makrolid',
        colorClass: 'text-cyan-700 dark:text-cyan-300',
        bgClass: 'bg-cyan-500/10',
        borderClass: 'border-cyan-500/30',
      },
      {
        label: 'İnfüzyon & Seyreltme',
        value: '250 mL (1 sa) / 500 mL (3 sa)',
        subtext: '≤2 mg/mL • ASLA Bolus/IM!',
        tooltip: '500 mg/250 mL (2 mg/mL) ≥1 sa veya 500 mg/500 mL (1 mg/mL) ≥3 sa',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
      {
        label: 'QTc & Renal Profil',
        value: 'QTc Riski • Renal Ayar YOK',
        subtext: 'Safra atılımı • EKG + K⁺/Mg²⁺',
        tooltip: 'Böbrek yetmezliğinde/CRRT’de doz ayarı gerekmez; ancak QTc uzatabilir',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
    aliases: ['Azithromycin', 'Azitromisin', 'Zitromax', 'Azitro', 'Azeltin'],
    searchKeywords: [
      'azitromisin',
      'azithromycin',
      'zitromax',
      'azitro',
      'azalid',
      'makrolid',
      'sezaryen profilaksi',
      'c/soap',
      'acog',
      'tkp',
      'legionella',
      'ureaplasma',
      'qtc',
      'minimal cyp3a4',
    ],
    highAlert: {
      tallManName: 'AZİTROmi̇si̇n (azithroMYCIN)',
      confusionRiskWith:
        'Aztreonam, Klaritromisin, Eritromisin (doz sıklığı ve CYP3A4 etkileşim profili tamamen farklıdır!).',
      criticalAlerts: [
        'ASLA IV BOLUS veya IM VERİLMEZ: 500 mg flakon önce 4,8 mL steril su ile sulandırılır (100 mg/mL), ardından mutlaka 250 mL SF/D5W/LR (2 mg/mL) içinde EN AZ 60 DAKİKADA (veya 500 mL içinde 3 saatte) infüze edilir — konsantre infüzyon şiddetli flebit yapar!',
        'QTc UZAMASI & TORSADES DE POINTES (FDA UYARISI): CYP3A4 etkileşimi minimal olsa da kardiyak hERG kanalını bloke eder; hipokalemi, hipomagnezemi, bradikardi veya amiodaron/haloperidol/ondansetron kullanan hastalarda fatal aritmi riski taşır.',
        'OBSTETRİK SEZARYEN DOĞRU ENDİKASYON (C/SOAP): Doğum eylemi başlamış veya membran rüptürlü (EMR) ACİL/non-elektif sezaryende Sefazolin’e EK 500 mg IV (1 saatte) verilir — Sefazolin’in YERİNE TEK BAŞINA VERİLMEZ!',
        'MYASTENİA GRAVİS ALEVLENMESİ: Nöromüsküler iletimi baskılayarak akut miyastenik kriz ve solunum yetmezliği tetikleyebilir!',
      ],
      antidoteOrRescue:
        'Spesifik antidot yoktur. QTc uzaması / Torsades de Pointes geliştiğinde ilacı durdur, 2 g IV Magnezyum Sülfat uygula, K⁺ >4,0–4,5 mEq/L düzelt ve gerekirse overdrive pacing yap. Anafilakside standart adrenalin protokolü uygulanır.',
    },
    identitySummary:
      'Azitromisin, 15-üyeli lakton halkasına azot atomu eklenmesiyle elde edilen bir azalid makrolid antibiyotiktir. Yoğun bakım ve anesteziyoloji pratiğinde iki kilit kullanım alanına sahiptir: (1) YBÜ ağır toplum kökenli pnömonide (TKP) β-laktam ile kombine atipik/immünomodülatör ajan (500 mg IV q24sa) ve (2) Doğum eylemi başlamış veya membran rüptürlü acil/non-elektif sezaryenlerde Sefazolin’e ek 500 mg IV obstetrik profilaksi (C/SOAP Trial NEJM 2016 / ACOG). Klaritromisine kıyasla CYP3A4 inhibisyonunun minimal olması ve böbrek yetmezliğinde doz ayarı gerektirmemesi nedeniyle kritik YBÜ hastalarında en güvenli makroliddir.',
    spectrumHighlights: [
      {
        title: 'Atipik Solunum & Genital Patojenler (Ureaplasma!)',
        detail:
          'Legionella pneumophila, Mycoplasma pneumoniae, Chlamydophila pneumoniae, Ureaplasma urealyticum ve Mycoplasma hominis (post-sezaryen endometritin başlıca β-laktam-dirençli etkenleri!), Chlamydia trachomatis, H. influenzae, M. catarrhalis, Bordetella pertussis.',
        tone: 'emerald',
      },
      {
        title: 'Pnömokok Direnci & Kombinasyon Gerekliliği',
        detail:
          'S. pneumoniae’da makrolid direnci yüksek olduğundan ağır TKP’de asla tek başına verilmez; mutlaka β-laktam ile kombine edilir. Acil sezaryende de tek başına yetersizdir — Sefazolin’e eklenir.',
        tone: 'amber',
      },
      {
        title: 'Kapsam Dışı Patojenler',
        detail:
          'MRSA, Enterokoklar, Pseudomonas aeruginosa, Acinetobacter, ESBL/CRE Enterobacterales ve B. fragilis dahil çoğu anaerob.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      '50S ribozomal alt birimin 23S rRNA bölgesine bağlanarak peptidil translokasyonunu ve bakteri protein sentezini bloke eder. Zayıf dibazik yapısı sayesinde nötrofil, makrofaj ve fibroblastların lizozomlarında plazmanın 50–100 katı konsantrasyonlarda birikir; enfeksiyon bölgesine fagositlerle aktif olarak taşınır ve ~68 saatlik çok uzun doku yarı ömrü sağlar.',
    mechanismPillars: [
      {
        title: '50S Ribozomal Blokaj & Fagositik Hedefleme',
        detail:
          'Dibazik moleküler yapı asidik fagolizozomlarda yoğun iyon tuzağı oluşturur; kemotaksisle enfeksiyon odağına (akciğer alveolü, endometriyum) göç eden nötrofiller ilacı doğrudan patojen bölgesine bırakır.',
      },
      {
        title: 'C/SOAP Obstetrik Mekanizması (Ureaplasma Eradikasyonu)',
        detail:
          'Sefazolin hücre duvarı olmayan Ureaplasma urealyticum ve Mycoplasma türlerine etkisizdir; travay/EMR sonrası uterin kaviteye yükselen bu etkenleri azitromisin 500 mg IV tek dozla temizleyerek post-sezaryen enfeksiyonu %50 azaltır.',
      },
      {
        title: 'Minimal CYP3A4 İnhibisyonu (Klaritromisine Üstünlük)',
        detail:
          '15-üyeli azalid halkası karaciğer CYP3A4 hem grubuyla inaktive edici nitrozoalkan kompleksi oluşturmaz; bu nedenle midazolam, fentanil, takrolimus, statin ve KKB alan YBÜ hastalarında çok üstündür.',
      },
    ],
    pkCards: [
      {
        label: 'Terminal / Doku Yarı Ömrü (t½)',
        value: '~68 saat',
        detail: 'Çok uzun doku yarı ömrü sayesinde günde tek doz (q24sa) ve tek doz obstetrik profilaksi yeterlidir.',
      },
      {
        label: 'Dağılım Hacmi (Vd)',
        value: '~31 L/kg (Çok Yüksek)',
        detail: 'Plazmadan hızla dokulara, alveoler makrofajlara ve miyometriyuma/endometriyuma geçer.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%7–51 (Konsantrasyon bağımlı)',
        detail: 'Düşük-orta protein bağlanması; hipoalbüminemiden az etkilenir.',
      },
      {
        label: 'Atılım Yolu',
        value: '>%80 Safra / Feçes (Değişmeden)',
        detail: 'Renal atılım <%6–12 → böbrek yetmezliğinde, HD’de ve CRRT’de DOZ AYARI GEREKMEZ!',
      },
      {
        label: 'CYP3A4 Etkileşimi',
        value: 'MİNİMAL / Klinik Önemsiz',
        detail: 'Klaritromisinin aksine CYP3A4 inhibitörü değildir (ancak hafif P-gp etkileşimi bildirilmiştir).',
      },
      {
        label: 'İnfüzyon Konsantrasyonu',
        value: '1–2 mg/mL (1–3 saat)',
        detail: '250 mL’de (2 mg/mL) ≥1 saat veya 500 mL’de (1 mg/mL) ≥3 saat infüze edilir.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Azitromisin, eritromisin veya diğer makrolid/ketolidlere karşı belgelenmiş aşırı duyarlılık / anafilaksi.',
        'Önceki azitromisin kullanımına bağlı kolestatik sarılık veya hepatik disfonksiyon öyküsü.',
        'IV bolus veya IM uygulama.',
      ],
      relativeItems: [
        'Konjenital/edinsel uzun QT sendromu (QTc >480–500 ms), Torsades de Pointes öyküsü, bradiaritmi veya düzeltilmemiş hipokalemi/hipomagnezemi.',
        'Eşzamanlı Sınıf IA/III antiaritmikler (amiodaron, sotalol) veya diğer QT uzatıcı ajanlar (haloperidol, ondansetron, florokinolon).',
        'Myastenia Gravis — semptomları ağırlaştırıp solunum yetmezliği tetikleyebilir.',
        'Ağır karaciğer yetmezliği (safra eliminasyonu bozulduğu için hepatotoksisite izlemi gerekir).',
      ],
      clinicalNote:
        'Obstetrik anestezi pratiğinde elektif (travaysız, membranları sağlam) planlı sezaryende rutin azitromisin eklenmesi kanıtla desteklenmez; ancak aktif doğum eylemi veya membran rüptürü gelişmiş her sezaryende Sefazolin + Azitromisin 500 mg IV standart bakımdır!',
    },
    regimenCards: [
      {
        title: 'Obstetrik Acil / Travaylı / EMR’li Sezaryen Profilaksisi (C/SOAP — ACOG)',
        setting: 'perioperative',
        badge: 'C/SOAP NEJM 2016 • ACOG',
        dose: '500 mg IV tek doz (Sefazolin 2–3 g IV’ye EK olarak)',
        infusionDuration: 'En az 60 dakika (250 mL SF/D5W/LR içinde — ≤2 mg/mL)',
        interval: 'Tek doz (insizyondan 0–60 dk önce başla; acil olguda mümkün olan en erken anda başla) — Redozaj gerekmez',
        note: 'Post-sezaryen endometrit, yara yeri enfeksiyonu ve maternal sepsis kompozit sonlanımını %50 azaltır (NNT ~17). Acil/stat sezaryende infüzyonun bitmesini beklemek için insizyon GECİKTİRİLMEZ; insizyon öncesi başlanıp operasyon sırasında 1 saatte tamamlanır!',
      },
      {
        title: 'YBÜ Ağır Toplum Kökenli Pnömoni — TKP (ATS/IDSA)',
        setting: 'icu',
        badge: 'ATS/IDSA Güçlü Öneri',
        dose: '500 mg IV q24sa (β-laktam ile kombine)',
        infusionDuration: '250 mL içinde ≥60 dk (veya 500 mL içinde 3 saat)',
        interval: 'q24sa (en az 2–3 gün IV, sonra PO; toplam 5 gün, Legionella’da 7–10 gün)',
        note: 'Midazolam, fentanil, takrolimus, KKB, statin veya DOAC kullanan YBÜ hastalarında klaritromisin yerine İLK SEÇENEK makroliddir. Böbrek yetmezliğinde doz ayarı gerekmez.',
      },
      {
        title: 'Ağır Legionella Pnömonisi (YBÜ)',
        setting: 'icu',
        badge: 'İlk Basamak Ajan',
        dose: '500 mg IV q24sa (bazı kılavuzlarda ilk gün 1000 mg yükleme → 500 mg q24sa)',
        infusionDuration: '≥60 dk (250 mL) — 1000 mg verilecekse 500 mL ≥2–3 sa',
        interval: 'q24sa (7–10 gün; immünsüpresifte 14–21 gün)',
        note: 'Yüksek alveoler makrofaj içi konsantrasyonu sayesinde Legionella pneumophila’da florokinolonlarla eşdeğer altın standarttır.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Azitromisin erişkinde (obstetrik obezite dahil) sabit 500 mg IV dozunda uygulanır; C/SOAP çalışmasında katılımcıların büyük bölümü obez (BMI ≥30) olmasına karşın 500 mg sabit dozla ~%50 enfeksiyon azalması sağlanmıştır.',
      perioperative: {
        applicable: true,
        summaryTitle: 'Acil / Travaylı / EMR’li Sezaryen Profilaksisi (Sefazolin’e EK — C/SOAP)',
        timingWindow: 'İnsizyondan 0–60 dk ÖNCE başla (acil sezaryende insizyonu GECİKTİRME, operasyon sırasında 1 saatte bitir!)',
        standardDoseLabel: '500 mg IV tek doz (Sefazolin 2–3 g IV ile birlikte)',
        adultStandardDoseMg: 500,
        infusionTimeText: 'En az 60 dakika (250 mL SF/D5W/LR — 2 mg/mL) — ASLA bolus değil!',
        clinicalNote:
          'Yalnızca doğum eylemi başlamış veya membran rüptürü olan non-elektif/acil sezaryenlerde Sefazolin’e eklenir. 68 saatlik doku yarı ömrü nedeniyle intraoperatif redozaj gerekmez.',
      },
      icu: {
        pkPdTarget: 'fAUC₂₄/MIC ≥ 25 + Yüksek Makrofaj Konsantrasyonu',
        pkPdBadge: 'Günde Tek Doz (q24sa)',
        loadingDoseLabel: 'Standart Başlangıç: 500 mg IV (Legionella’da opsiyonel 1 g)',
        loadingFixedMg: 500,
        loadingUnit: 'mg',
        loadingInfusionText: '250 mL SF/D5W içinde (2 mg/mL) en az 60 dk (veya 500 mL içinde 3 saat)',
        maintenanceLabel: 'YBÜ Günlük İdame (Renal Fonksiyondan Bağımsız!)',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'azi-icu-250',
            label: 'YBÜ Ağır TKP — Standart 1 Saat İnfüzyon (500 mg / 250 mL q24sa)',
            singleDoseMg: 500,
            intervalHours: 24,
            infusionHours: 1,
            diluentVolumeMl: 250,
            note: '2 mg/mL konsantrasyon; en az 60 dakikada infüze edilir. Böbrek yetmezliğinde de tam doz!',
          },
          {
            id: 'azi-icu-500',
            label: 'Hassas Periferik Ven — 3 Saat İnfüzyon (500 mg / 500 mL q24sa)',
            singleDoseMg: 500,
            intervalHours: 24,
            infusionHours: 3,
            diluentVolumeMl: 500,
            note: '1 mg/mL düşük konsantrasyon; periferik damar ağrısı/flebit riskini en aza indirir.',
          },
        ],
        tdmNote: 'Rutin TDM gerekmez; bazal/seri EKG (QTc) ve serum K⁺/Mg²⁺ izlemi yeterlidir.',
      },
      renalTiers: [
        {
          id: 'azi-egfr-all',
          label: 'Normal – Orta Böbrek (eGFR ≥10)',
          egfrRange: '≥ 10 mL/dk',
          recommendation: 'DOZ AYARI GEREKMEZ (Tam Doz)',
          doseText: '500 mg IV q24sa',
          note: 'Ağırlıklı olarak safra/feçes yoluyla atılır; renal klirens <%12’dir.',
          tone: 'emerald',
        },
        {
          id: 'azi-egfr-low',
          label: 'Son Dönem Böbrek / HD / CRRT',
          egfrRange: '< 10 mL/dk • HD • CRRT',
          recommendation: 'DOZ AYARI GEREKMEZ (Dikkatli QTc İzlemi)',
          doseText: '500 mg IV q24sa',
          note: 'eGFR <10 mL/dk’da AUC ~%35 artabilir ancak doz azaltımı önerilmez; HD ile atılmaz, ek doz gerekmez.',
          tone: 'sky',
        },
      ],
      crrtSummary:
        'Büyük ölçüde safra yoluyla atıldığından ve doku dağılım hacmi (31 L/kg) çok geniş olduğundan CRRT’de klirensi ihmal edilebilir; 500 mg IV q24sa tam doz uygulanır.',
      hdSummary:
        'Hemodiyaliz ile uzaklaştırılmaz; 500 mg IV q24sa tam doz verilir ve diyaliz sonrası ek doz gerekmez.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Zitromax® / Azitro® / Azeltin® IV 500 mg Flakon',
          presentation: '500 mg azitromisin liyofilize toz içeren IV flakon',
          concentration: '4,8 mL steril enjeksiyonluk su ile sulandırıldığında 100 mg/mL (ASLA direkt verilmez!)',
          saltOrBaseNote: '500 mg flakon mutlaka 250 mL (2 mg/mL, ≥1 sa) veya 500 mL (1 mg/mL, ≥3 sa) torbaya seyreltilir.',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        '1. Adım: 500 mg flakona 4,8 mL steril enjeksiyonluk su ekleyip tamamen çözülene kadar çalkala (100 mg/mL — 5 mL toplam hacim).',
        '2. Adım (Standart 1 Saat): 5 mL konsantreyi 250 mL %0,9 NaCl, %5 Dekstroz veya Laktatlı Ringer’e ekle (2 mg/mL) → EN AZ 60 DAKİKADA infüze et.',
        '2. Adım (Düşük İrritasyon 3 Saat): 5 mL konsantreyi 500 mL SF/D5W/LR’ye ekle (1 mg/mL) → 3 SAATTE infüze et.',
      ],
      concentrationTrapWarning:
        'BOLUS & FLEBİT TUZAĞI: Acil sezaryen hazırlığında zaman kazanmak için azitromisini 50–100 mL torbada veya 15–20 dk’da göndermek şiddetli kimyasal flebit, venöz ağrı ve kardiyak QTc aritmi riski yaratır! İnsizyonu geciktirmeden 250 mL içinde 1 saatte infüzyonu sürdürün.',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik venden 250 mL (2 mg/mL, ≥1 sa) veya 500 mL (1 mg/mL, 3 sa) seyreltme ile güvenle verilebilir.',
      phRange: 'pH 6,4 – 6,8 (Nötre yakın ancak >2 mg/mL derişimde lokal venöz irritasyon yüksektir)',
      osmolalityNote: '250–500 mL SF/D5W içinde izoozmolar (~290–310 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Laktatlı Ringer (LR)', '%0,45 NaCl'],
      ySiteCompatible: ['Sınırlı veri — mümkünse ayrı damar yolu/lümen kullanılması önerilir'],
      ySiteIncompatible: [
        'Amikasin / Gentamisin',
        'Sefepim / Seftazidim / Seftriakson / Sefazolin (obstetrikte Sefazolin ile aynı hattan eşzamanlı GÖNDERME — ayrı hat veya araya SF yıkaması!)',
        'Piperasilin-Tazobaktam',
        'Furosemid / Heparin / Morfin / Fentanil / Potasyum klorür (yüksek konsantrasyonda)',
        'Propofol / Ondansetron (veri kısıtlı/geçimsiz — ayrı hat!)',
      ],
      stabilityNote:
        'Sulandırılmış/seyreltilmiş çözelti (1–2 mg/mL) oda sıcaklığında 24 saat, 2–8°C buzdolabında 7 gün stabildir.',
      extravasationProtocol:
        'Vezikan değildir; lokal irritasyon veya ekstravazasyonda infüzyonu durdur, elevasyon ve soğuk kompres uygula.',
    },
    organImpairment: {
      renalSummary:
        'Böbrek yetmezliğinde, hemodiyalizde ve CRRT’de DOZ AYARLAMASI GEREKMEZ (<%6–12 renal atılım).',
      renalDetails: [
        'eGFR <10 mL/dk olan hastalarda sistemik AUC yaklaşık %35 artabildiğinden ek doz azaltımı yapılmasa da EKG/QTc izlemi ihmal edilmemelidir.',
      ],
      hepaticSummary:
        'Primer eliminasyon yolu safradır; hafif-orta karaciğer yetmezliğinde doz değişikliği gerekmez ancak ağır karaciğer yetmezliğinde dikkatli olunmalı ve kolestatik hepatit gelişirse derhal kesilmelidir.',
      hepaticDetails: [
        'Nadiren kolestatik sarılık, hepatoselüler hasar ve fulminan hepatit bildirilmiştir; karaciğer fonksiyon testleri bozulursa tedavi sonlandırılır.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Geriatri: Doz Sabit — Kardiyak QTc İzlemi Şart!',
      geriatricPoints: [
        'Yaşlılarda böbrek/karaciğer doz ayarı gerekmez; ancak kardiyovasküler hastalık, bradikardi ve elektrolit bozukluğu daha sık olduğundan QTc/Torsades riski yaşla artar.',
        'Polifarmasi alan yaşlı YBÜ hastalarında CYP3A4 etkileşimi minimal olduğundan klaritromisine kesinlikle tercih edilir.',
      ],
      obesityWeightScalarBadge: 'Sabit 500 mg IV (C/SOAP Obez Gebeler Dahil)',
      obesityPoints: [
        'Obez gebelerde (BMI ≥30–40) C/SOAP çalışması standart 500 mg IV doz ile yüksek etkinlik göstermiştir; doz artırımı gerekmez (yalnızca eşlik eden Sefazolin 120 kg üzerinde 3 g yapılır!).',
      ],
      clinicalNote:
        'Acil sezaryene alınan obez gebede Sefazolin dozu ≥120 kg için 3 g’a çıkarılırken, eklenen Azitromisin 500 mg sabit kalır ve ayrı hattan/SF yıkamasıyla 1 saatte infüze edilir.',
    },
    pregnancyLactation: {
      pregnancySummary:
        'Gebelikte EN GÜVENLİ makroliddir (eski FDA Kategori B; geniş insan verileri ve C/SOAP randomize çalışmasında teratojenite veya neonatal advers etki artışı saptanmamıştır).',
      pregnancyDetails: [
        'ACOG Practice Bulletin 199: Aktif travay veya membran rüptürü olan tüm acil/non-elektif sezaryenlerde Sefazolin’e ek olarak 500 mg IV (1 saatte) önerilir.',
        'C/SOAP çalışmasında neonatal sepsis, YBÜ yatışı veya ölüm oranlarında artış görülmemiş, maternal endometrit ve yara enfeksiyonu yarı yarıya azalmıştır.',
        'Gebelikte toplum kökenli pnömoni ve klamidya/atipik enfeksiyonlarda da klaritromisin yerine ilk tercihtir.',
      ],
      lactationSummary: 'Emzirme ile uyumludur; anne sütüne çok düşük düzeyde geçer ve bebekte klinik toksisite nadirdir.',
      lactationDetails: [
        'Tek doz sezaryen profilaksisi sonrası emzirmeye ara verilmesi gerekmez; yenidoğanda nadir pilor stenozu/GİS florası değişikliği açısından rutin pediatrik gözlem yeterlidir.',
      ],
    },
    adverseEffects: [
      {
        title: 'QTc Uzaması & Torsades de Pointes',
        incidenceOrSeverity: 'Nadir ama Kritik (FDA Uyarısı)',
        detail:
          'hERG potasyum kanal blokajıyla ventriküler repolarizasyonu uzatır. Yüksek kardiyovasküler riskli hastalarda (Ray et al. NEJM) kardiyak ölüm riskini hafif artırır; K⁺/Mg²⁺ ve EKG izle.',
        tone: 'rose',
      },
      {
        title: 'İnfüzyon Bölgesi Ağrısı & Flebit',
        incidenceOrSeverity: '%3–7 • Konsantrasyon Bağımlı',
        detail:
          '2 mg/mL (250 mL, 1 sa) üzerindeki derişimlerde veya hızlı infüzyonda belirgin lokal ağrı ve venöz inflamasyon. Hassas vende 500 mL/3 saat seç.',
        tone: 'amber',
      },
      {
        title: 'GİS Yakınmaları & C. difficile İshali',
        incidenceOrSeverity: '%5–10 (Klaritro’dan Hafif)',
        detail:
          'Bulantı, karın ağrısı, diyare; 14-üyeli makrolidlere göre motilin uyarımı daha zayıf olduğundan GİS toleransı daha iyidir.',
        tone: 'indigo',
      },
      {
        title: 'Hepatotoksisite & Geçici İşitme Kaybı',
        incidenceOrSeverity: 'Nadir (<%1)',
        detail:
          'Kolestatik/hepatoselüler karaciğer hasarı ve yüksek/uzun süreli dozlarda geri dönüşlü ototoksisite (tinnitus/işitme azalması).',
        tone: 'teal',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Obstetrik Anestezide Ondansetron + Azitromisin QTc Sinerjisi',
        detail:
          'Sezaryende spinal hipotansiyon/bulantı profilaksisi için rutin verilen ondansetron (4–8 mg) ile azitromisin birlikte aditif QTc uzaması yapabilir; yapısal kalp hastalığı veya uzun QT’li gebede EKG monitörizasyonu ve magnezyum/potasyum kontrolü önemlidir.',
      },
      {
        title: 'Sefazolin ile Aynı Y-Hattından Verilmemesi',
        detail:
          'Acil sezaryende Sefazolin ve Azitromisin aynı anda order edildiğinde aynı Y-hattında geçimsizlik riski vardır; Sefazolin (5–15 dk) verildikten sonra hat SF ile yıkanmalı veya ayrı periferik hattan Azitromisin 1 saatlik infüzyona alınmalıdır.',
      },
      {
        title: 'Minimal CYP3A4 Ama P-gp & Varfarin Farkındalığı',
        detail:
          'Klaritromisin gibi güçlü CYP3A4 inhibitörü olmasa da P-glikoprotein (digoksin, dabigatran/edoksaban) ve varfarin (INR yükselmesi) ile orta düzeyde etkileşebilir; INR ve digoksin düzeyi takip edilmelidir.',
      },
      {
        title: 'Myastenia Gravis & Nöromüsküler Zayıflık',
        detail:
          'Azitromisin dahil tüm makrolidler nöromüsküler kavşak iletimini bozarak miyastenik kriz tetikleyebilir; MG hastalarında alternatif antibiyotik sınıfı seçilmelidir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1. Kademe — 50S Ribozom 23S rRNA Bağlanması & Dibazik İyon Tuzağı',
        summary:
          'Azitromisin, makrolid halkasındaki metil-substitüe azot atomu sayesinde çift pozitif yük (dibazik karakter) kazanır ve hem bakteri 50S ribozomuna bağlanır hem de fagosit lizozomlarında aşırı yoğunlaşır.',
        points: [
          'Peptid çıkış tünelini tıkayarak bakteriyel protein ve toksin (pnömolizin) sentezini durdurur.',
          'Hücre duvarı olmayan Ureaplasma ve Mycoplasma türleri β-laktamlara doğal dirençli iken ribozomal hedefleme sayesinde azitromisine yüksek derecede duyarlıdır.',
        ],
      },
      intracellularSignaling: {
        title: '2. Kademe — Lizozomal Fagositik Taşıma & İmmünomodülatör Baskılama',
        summary:
          'Asidik lizozom (pH ~5) içine difüze olan dibazik azitromisin protonlanarak hücre dışına çıkamaz ve fagositler tarafından enfeksiyon odağına taşınır.',
        points: [
          'Enfekte akciğer veya uterin dokuya göç eden nötrofiller degranülasyon sırasında yüksek yerel azitromisin salar; plazma düzeyi düştükten günler sonra bile doku konsantrasyonu MİK üzerinde kalır.',
          'NF-κB ve inflamazom sinyallerini modüle ederek ağır TKP’de hiperinflamatuvar akciğer hasarını azaltır.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Obstetrik Uterin & Pelvik Dokular',
          tissueTarget: 'Miyometriyum / Endometriyum / Amniyotik Sıvı',
          accent: 'teal',
          points: [
            'Tek 500 mg IV dozla miyometriyum, desidua ve yağ dokusunda 48–72 saat boyunca Ureaplasma ve anaerobik/atipik floralara karşı etkin doku düzeyi sağlar.',
            'C/SOAP çalışmasında endometrit ve cerrahi alan enfeksiyonunu %12,0’den %6,1’e düşürmüştür.',
          ],
        },
        {
          systemTitle: 'Pulmoner Alveol & Bronşiyal Mukoza',
          tissueTarget: 'Alveoler Makrofaj / ELF',
          accent: 'indigo',
          points: [
            'Alveoler makrofajlarda plazmanın >100 katı konsantrasyona ulaşır; Legionella ve atipik pnömonide hızlı hücre içi eradikasyon sağlar.',
          ],
        },
        {
          systemTitle: 'Kardiyovasküler İletim Sistemi',
          tissueTarget: 'Ventriküler hERG (IKr) & Geç Na⁺ Akımı',
          accent: 'rose',
          points: [
            'hERG K⁺ kanal blokajı ve kronik maruziyette geç sodyum akımı (INa-L) artışı ile QTc aralığını uzatır ve Torsades de Pointes riski oluşturur.',
          ],
        },
        {
          systemTitle: 'Hepatobiliyer Sistem (Eliminasyon)',
          tissueTarget: 'Safra Kanalikülü (MRP2 / P-gp)',
          accent: 'amber',
          points: [
            'Büyük ölçüde metabolize olmadan safra yoluyla atılır; CYP3A4 inhibisyonu yapmadığından böbrek yetmezliği ve YBÜ polifarmasisinde benzersiz güvenlik profili sunar.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '4. Kademe — Uzun Doku Yarı Ömrü, Direnç Penceresi & Klinik Üstünlük',
        summary:
          '68 saatlik terminal yarı ömrü günde tek doz ve tek doz obstetrik profilaksi kolaylığı sağlarken, CYP3A4 tarafsızlığı YBÜ polifarmasisinde klaritromisine belirgin güvenlik üstünlüğü verir.',
        points: [
          'Ağır TKP’de β-laktam + Azitromisin kombinasyonu β-laktam monoterapisine kıyasla 30 günlük mortaliteyi azaltır.',
          'Çok uzun sub-inhibitör kuyruk dönemi nedeniyle gereksiz/uzun kullanımlar toplumda makrolid direncini hızlandırır — tedavi süresi TKP’de genelde 5 günle sınırlandırılır.',
        ],
      },
      clinicalPearls: [
        'Aktif travay veya EMR ile acil sezaryene alınan her gebede: Sefazolin 2–3 g IV + Azitromisin 500 mg IV (250 mL, 1 sa) — ancak insizyonu bekletme!',
        'YBÜ’de midazolam, fentanil, takrolimus, statin veya KKB alan ağır TKP hastasında klaritromisin yerine mutlaka Azitromisin seç.',
        'Böbrek yetmezliğinde, HD’de ve CRRT’de doz azaltımı gerekmez; ama bazal EKG/QTc ve K⁺/Mg²⁺ kontrolünü asla atlama!',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Azitromisin',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'QTc Uzatan Ajanlar (Amiodaron, Sotalol, Haloperidol, Ondansetron, Florokinolonlar)',
          mechanism: 'Aditif hERG (IKr) potasyum kanal blokajı.',
          clinicalEffect: 'QTc uzaması ve Torsades de Pointes (polimorfik VT) riskinde artış.',
          management: 'Bazal ve seri EKG çek; K⁺ >4,0 mEq/L ve Mg²⁺ >2,0 mg/dL hedefle; QTc >500 ms olursa ilacı kes.',
        },
        {
          severity: 'C',
          agent: 'Varfarin',
          mechanism: 'Bağırsak florası değişikliği ve olası hafif metabolik etkileşim.',
          clinicalEffect: 'INR yükselmesi ve kanama riskinde artış.',
          management: 'Eşzamanlı ve takip eden 5–7 gün boyunca INR’yi daha sık izle.',
        },
        {
          severity: 'C',
          agent: 'P-gp Substratları (Digoksin, Dabigatran, Edoksaban, Kolşisin)',
          mechanism: 'Hafif-orta P-glikoprotein (P-gp) inhibisyonu (klaritromisinden çok daha zayıf ancak tamamen sıfır değil).',
          clinicalEffect: 'Digoksin veya kolşisin plazma düzeylerinde hafif-orta artış.',
          management: 'Digoksin toksisitesi/düzeyi izle; ağır böbrek yetmezliğinde kolşisinle birlikte dikkatli ol.',
        },
        {
          severity: 'C',
          agent: 'Nelfinavir / Yüksek Doz Antasitler (Oral)',
          mechanism: 'Oral formda alüminyum/magnezyum antasitler Cmax’ı düşürür (IV formda geçersiz).',
          clinicalEffect: 'Oral geçişte pik düzey düşüşü.',
          management: 'IV’den PO’ya geçildiğinde antasitlerle arasına en az 2 saat koy.',
        },
      ],
      references: [
        {
          authors: 'Tita ATN, Szychowski JM, Boggess K, Saade G, Longo S, Clark E, et al. (C/SOAP Trial Consortium).',
          title: 'Adjunctive Azithromycin Prophylaxis for Cesarean Delivery',
          journal: 'New England Journal of Medicine',
          year: 2016,
          note: 'Travay/EMR’li non-elektif sezaryende Sefazolin’e ek 500 mg IV azitromisinin post-sezaryen enfeksiyonları %50 azalttığını kanıtlayan dönüm noktası çalışma.',
        },
        {
          authors: 'American College of Obstetricians and Gynecologists (ACOG).',
          title: 'ACOG Practice Bulletin No. 199: Use of Prophylactic Antibiotics in Labor and Delivery',
          journal: 'Obstetrics & Gynecology',
          year: 2018,
          note: 'Acil/travaylı sezaryenlerde Sefazolin + 500 mg IV Azitromisin standart profilaksi kılavuzu.',
        },
        {
          authors: 'Ray WA, Murray KT, Hall K, Arbogast PG, Stein CM.',
          title: 'Azithromycin and the risk of cardiovascular death',
          journal: 'New England Journal of Medicine',
          year: 2012,
          note: 'Özellikle yüksek kardiyovasküler riskli hastalarda azitromisin ilişkili aritmik ölüm ve QTc uyarısının temel kanıtı.',
        },
        {
          authors: 'Metlay JP, Waterer GW, Long AC, Anzueto A, Brozek J, Crothers K, et al.',
          title: 'Diagnosis and Treatment of Adults with Community-acquired Pneumonia. An Official Clinical Practice Guideline of the ATS and IDSA',
          journal: 'American Journal of Respiratory and Critical Care Medicine',
          year: 2019,
          note: 'YBÜ ağır TKP’de β-laktam + Azitromisin 500 mg IV q24sa standart önerisi.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/monograph/azithromycin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
      medscapeLabel: 'Medscape İlaç Etkileşim Kontrolü',
    },
  },
];
