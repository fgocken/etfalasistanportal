import type { AntimicrobialMonographData } from './types';

export const CARBAPENEM_BLBLI_ANTIMICROBIALS: AntimicrobialMonographData[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 6. MEROPENEM
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'meropenem',
    classTag: 'carbapenem_blbli',
    accentColor: 'purple',
    atcCode: 'J01DH02',
    classLabel: 'Geniş Spektrum Karbapenem · ESBL & AmpC 1. Tercih',
    tradeNamesTr: 'Meronem® · Merozan® · Merosid® · Meropex® (500 mg & 1 g Flakon)',
    title: 'Meropenem Trihidrat Monografisi',
    cardTitle: 'Meropenem',
    cardBadge: '3 sa EI · BLING III · VPA YASAK (X)!',
    cardCategoryLabel: 'Karbapenem · YBÜ Sepsis Omurgası',
    cardShortDesc:
      'ESBL ve AmpC üreten Enterobacterales için 1. basamak (MERINO JAMA 2018), YBÜ septik şokta 1–2 g yükleme → 3 saat uzamış infüzyon (BLING III 2024). KRİTİK X-ETKİLEŞİM: Valproik asidi %60–90 çökertir!',
    cardHighlights: [
      {
        label: 'YBÜ Uzamış İnfüzyon',
        value: '1–2 g q8sa (3 sa EI)',
        subtext: 'BLING III 2024 · MERCY 2023',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'X-Düzey Etkileşim!',
        value: 'Valproik Asit YASAK',
        subtext: 'VPA düzeyini %60–90 çökertir!',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Stabilite Tuzağı',
        value: 'SF’de 3–4 sa · D5W 1 sa',
        subtext: '3 sa EI MUTLAKA %0,9 NaCl ile!',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['meropenem', 'meronem', 'merozan', 'merosid', 'karbapenem'],
    searchKeywords: [
      'meropenem',
      'meronem',
      'merozan',
      'esbl',
      'merino',
      'bling iii',
      'mercy',
      'valproik asit',
      'depakin',
      'uzamış infüzyon',
      'menenjit',
    ],
    highAlert: {
      tallManName: 'MEROpenem',
      confusionRiskWith: 'ERTApenem · IMIpenem · DORIpenem',
      criticalAlerts: [
        'X-DÜZEY ÖLÜMCÜL İLAÇ ETKİLEŞİMİ — VALPROİK ASİT (DEPAKİN® / CONVULEX®): Meropenem (ve tüm karbapenemler) valproik asit (VPA) serum düzeyini 24–48 saat içinde %60–90 ÇÖKERTİR ve refrakter status epileptikusa yol açar! VPA dozunu artırmak etkileşimi ASLA telafi edemez — ya karbapenemi değiştirin ya da alternatif antiepileptik (Levetirasetam vb.) ekleyin/geçin!',
        'ODA SICAKLIĞINDA KISA STABİLİTE (SF’DE 3–4 SAAT · D5W’DE YALNIZCA 1 SAAT!): 3 saatlik uzamış infüzyon (EI) MUTLAKA %0,9 NaCl ile taze hazırlanıp derhal başlatılmalıdır! %5 Dekstroz içinde 3 saatlik infüzyon yapılırsa ilacın büyük kısmı hidrolize olup bozulur!',
        'CRE (KPC / OXA-48 / MBL), MRSA, E. FAECIUM VE STENOTROPHOMONAS’A ETKİSİZDİR: Türkiye YBÜ’lerinde karbapenem-dirençli Klebsiella (OXA-48/KPC/NDM) ve CRAB sıklığı yüksektir; kültür/hızlı karbapenemaz testi takibi hayati önemdedir.',
        'MENENJİT VE YÜKSEK MIC’TE 1 g YETERSİZDİR: Bakteriyel menenjit, ventrikülit, kistik fibrozis veya MIC = 4–8 mcg/mL suşlarda doz mutlaka 2 g IV q8sa olmalıdır!',
      ],
      antidoteOrRescue:
        'Anafilakside standart Adrenalin + sıvı resüsitasyonu uygulanır. Valproik asit çökmesine bağlı status epileptikusta VPA dozunu artırmaya çalışmak yerine derhal IV Benzodiazepin + Levetirasetam/Fenitoin yükleyin ve Meropenem’i kesin (VPA düzeyi karbapenem kesildikten 7–14 gün sonra normale döner!). Yüksek doz birikimde nöbet gelişirse hemodiyaliz meropenemi etkin şekilde uzaklaştırır.',
    },
    identitySummary:
      'Meropenem, ESBL ve AmpC β-laktamazlara karşı yüksek stabiliteye, geniş Gram-pozitif, antipsödomonal Gram-negatif ve tam anaerobik aktiviteye sahip 2. grup parenteral karbapenemdir. MERINO çalışmasıyla ESBL bakteriyemisinde altın standarttır; İmipeneme kıyasla belirgin düşük nöbet riski ve yüksek BOS geçişi sayesinde post-nöroşirürji menenjitte ve YBÜ septik şokta 3 saatlik uzamış infüzyonla temel ajandır.',
    spectrumHighlights: [
      {
        title: '1. Basamak: ESBL · AmpC · Septik Şok · Menenjit',
        detail:
          'ESBL üreten E. coli / K. pneumoniae (MERINO 2018 1. tercih!), AmpC Enterobacterales, P. aeruginosa, MSSA, S. pneumoniae ve B. fragilis dahil tam anaerobik kapsama (ek Metronidazol GEREKMEZ).',
        tone: 'emerald',
      },
      {
        title: 'Uzamış İnfüzyon (3 sa EI) & Stabilite Şartı',
        detail:
          'Septik şokta 1–2 g yükleme → 1–2 g q8sa 3 saat EI (BLING III JAMA 2024). Oda sıcaklığında SF’de 3–4 saat stabildir; D5W ile uzamış infüzyon ASLA yapılmaz!',
        tone: 'amber',
      },
      {
        title: 'Kesin Boşluklar (MRSA · E. faecium · CRE · Stenotrophomonas)',
        detail:
          'MRSA, Enterococcus faecium, Stenotrophomonas maltophilia (intrinsik L1 metallo-β-laktamaz!), C. difficile ve karbapenemaz üreten CRE (KPC/OXA-48/NDM) suşlarına ETKİSİZDİR.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Küçük zwitteriyonik yapısı sayesinde Gram-negatif dış membran OprD porininden hızla geçer ve PBP2 ile PBP3’e çok yüksek afinite ile bağlanarak hızlı sferoplast oluşumu ve bakteriyel lizis sağlar. Trans-hidroksietil yan zinciri sayesinde sınıf A (ESBL dahil) ve sınıf C (AmpC) β-laktamazların hidrolizine dirençlidir.',
    mechanismPillars: [
      {
        title: 'PBP2 & PBP3 Süper-Afinite & Hızlı Bakterisidal Etki',
        detail:
          'Sefalosporinlerden farklı olarak PBP2’yi güçlü biçimde inhibe ederek endotoksin salınımını görece azaltır ve daha hızlı sferoplast lizisi oluşturur.',
      },
      {
        title: 'Trans-6-Hidroksietil Grubu (ESBL & AmpC Kalkanı)',
        detail:
          'Bu sterik yan zincir su molekülünün açil-enzim bağına yaklaşmasını önleyerek ESBL ve AmpC enzimlerinin meropenemi parçalamasını engeller; ayrıca DHP-1 (renal dehidropeptidaz-1) enzimiyle yıkılmadığı için silastatin gerektirmez.',
      },
      {
        title: 'İmipeneme Göre Düşük Nöbet Potansiyeli',
        detail:
          'C-2 konumundaki pirolidinil yan zinciri sayesinde GABA-A reseptör afinitesi İmipenem’den belirgin düşüktür (~%0,5–0,7 vs ~%1,5–3); bu nedenle bakteriyel menenjitte güvenle 2 g q8sa kullanılabilir.',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '1,0 saat',
        detail: 'Normal böbrek fonksiyonunda; son dönem böbrek yetmezliğinde 7–10 saate uzar.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%2 (İhmal Edilebilir)',
        detail: 'Plazma ilaç düzeyinin %98’i serbest aktif formdadır — hipoalbüminemiden etkilenmez!',
      },
      {
        label: 'BOS Penetrasyonu',
        value: '%15 – 40 (İnflamasyonda)',
        detail: '2 g q8sa dozuyla menenjit ve ventrikülitte P. aeruginosa ve ESBL dahil yüksek BOS sterilizasyonu sağlar.',
      },
      {
        label: 'Eliminasyon',
        value: '%70 Renal (Değişmeden)',
        detail: 'Glomerüler filtrasyon + tübüler sekresyon; eGFR <50 mL/dk’da doz aralığı/miktarı ayarlanır.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Karbapenemlere (Meropenem, İmipenem, Ertapenem) karşı belgelenmiş ağır IgE-aracılı anafilaksi öyküsü.',
        'Şiddetli gecikmiş kütanöz reaksiyon (SJS/TEN/DRESS/AGEP) öyküsü.',
        'Valproik asit (Depakin®) ile eşzamanlı kullanım — klinik olarak KONTRENDİKE düzeyinde (X) etkileşim!',
      ],
      relativeItems: [
        'Penisilin/sefalosporin alerjisi: AAAAI/ACAAI 2022’ye göre penisilin veya sefalosporin alerjisi olan hastalarda karbapenem çapraz reaksiyon oranı <%1’dir (SCAR yoksa doğrudan veya gözetimli güvenle verilebilir!).',
        'Kontrolsüz epilepsi, fokal beyin lezyonu + ileri böbrek yetmezliği (doz ayarlanmazsa nöbet riski).',
        'Gereksiz ampirik kullanım (CRE ve Stenotrophomonas seçilimi — kültür sonucu gelince mutlaka de-eskalasyon yapın!).',
      ],
      clinicalNote:
        'AAAAI/ACAAI 2022 Güncellemesi: IgE-aracılı penisilin veya sefalosporin alerjisi öyküsü olan hastalarda Meropenem ile çapraz alerji riski <%1 olup rutin cilt testi gerekmeden güvenle uygulanabilir (SCAR hariç).',
    },
    regimenCards: [
      {
        title: 'YBÜ Septik Şok / ESBL Sepsis / VAP — Uzamış İnfüzyon (EI)',
        setting: 'icu',
        badge: 'BLING III 2024 · 3 sa EI',
        dose: '1 g Yükleme → 1 g EI',
        infusionDuration: '3 saat (EI · SF!)',
        interval: 'q8sa (3 g/gün)',
        note: 'İlk doz 1 g 30 dk yükleme → ardından 1 g q8sa 3 saatlik uzamış infüzyon (100 mL %0,9 NaCl → 33,3 mL/saat). Yüksek MIC (4–8 mcg/mL), ARC veya derin odak şüphesinde 2 g q8sa 3 saat EI!',
      },
      {
        title: 'Bakteriyel Menenjit / Ventrikülit / Yüksek MIC / Kistik Fibrozis',
        setting: 'icu',
        badge: 'Yüksek Doz · 6 g/gün',
        dose: '2 g IV',
        infusionDuration: '30 dk veya 3 sa EI',
        interval: 'q8sa (6 g/gün)',
        note: 'Post-nöroşirürji menenjitte Vankomisin ile kombine 1. basamak. MIC = 4–8 mcg/mL P. aeruginosa/Enterobacterales suşlarında 2 g q8sa 3 saatlik EI ile %fT>MIC korunur.',
      },
      {
        title: 'Febril Nötropeni / Komplike İntra-Abdominal Sepsis',
        setting: 'icu',
        badge: 'Tek Ajan Geniş Spektrum',
        dose: '1 g IV',
        infusionDuration: '30 dk veya 3 sa EI',
        interval: 'q8sa',
        note: 'Güçlü anaerobik aktivitesi nedeniyle komplike peritonitte ek Metronidazol GEREKMEZ.',
      },
      {
        title: 'Sürekli İnfüzyon (CI — BLING III / MERCY Protokolü)',
        setting: 'special',
        badge: 'Taze Torba q3–4sa!',
        dose: '1 g Yükleme → 3 g/gün CI',
        infusionDuration: '24 saat (her 3–4 sa taze)',
        interval: 'Sürekli',
        note: 'KRİTİK STABİLİTE: Meropenem 25°C’de %0,9 NaCl içinde 3–4 saatten sonra degrade olur; bu nedenle 24 saatlik sürekli infüzyonda şırınga/torba 3–4 saatte bir (veya soğuk paketle 6–8 saatte bir) yenilenmelidir!',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Sabit 1–2 g dozları uygulanır; morbid obezitede (VKİ ≥40 kg/m²) veya ARC’de (eGFR >130 mL/dk) 1 g yerine 2 g q8sa 3 saatlik uzamış infüzyon hedef %fT>MIC’yi garantiler.',
      perioperative: {
        applicable: false,
        summaryTitle: 'Rutin Cerrahi Profilaksi Ajanı Değildir (CRE Direnç Koruma Kuralı)',
        timingWindow: 'Uygulanmaz (Rutin Profilaksi Dışı)',
        standardDoseLabel: 'Rutin profilakside kullanılmaz',
        adultStandardDoseMg: 1000,
        infusionTimeText: '30 dk IV',
        clinicalNote:
          'Yalnızca belgelenmiş ESBL rektal kolonizasyonu olan yüksek riskli prostat biyopsisi veya karaciğer nakli gibi istisnai enfeksiyon hastalıkları onaylı olgularda hedeflenmiş profilaksi olarak değerlendirilebilir.',
        nonProphylaxisReason:
          'Meropenem, YBÜ’lerin kritik ESBL/AmpC kurtarma karbapenemidir. Rutin cerrahi profilakside kullanılması karbapenem-dirençli Enterobacterales (CRE: OXA-48/KPC/NDM), CRAB ve C. difficile seçilimini hızlandırır; temiz cerrahide Sefazolin, GIS cerrahisinde Sefazolin+Metronidazol veya Ampisilin-Sulbaktam seçilmelidir.',
      },
      icu: {
        pkPdTarget: 'Serbest konsantrasyonun %fT>MIC ≥ %40 (Septik şokta %100 fT>1–4×MIC için 3 saat EI)',
        pkPdBadge: '%fT > MIC · 3 sa EI (SF!)',
        loadingDoseLabel: '1–2 g IV (DAİMA 30 dk hızlı yükleme!)',
        loadingFixedMg: 1000,
        loadingUnit: 'mg',
        loadingInfusionText: '30 dakikada %0,9 NaCl içinde yükleme → hemen 3 saatlik EI idame',
        maintenanceLabel: 'YBÜ Septik Şok / Menenjit / Uzamış İnfüzyon Rejimleri',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'sepsis_1g_ei',
            label: 'Septik Şok / ESBL / VAP (1 g q8sa · 3 sa EI)',
            singleDoseMg: 1000,
            intervalHours: 8,
            infusionHours: 3,
            diluentVolumeMl: 100,
            note: '3 g/gün. 100 mL %0,9 NaCl (ASLA D5W değil!) içinde 33,3 mL/saat hızla 3 saatte infüze edilir.',
          },
          {
            id: 'meningitis_2g_ei',
            label: 'Menenjit / Yüksek MIC (4–8) / ARC / Morbid Obez (2 g q8sa · 3 sa EI)',
            singleDoseMg: 2000,
            intervalHours: 8,
            infusionHours: 3,
            diluentVolumeMl: 100,
            note: '6 g/gün maksimum doz. 100 mL %0,9 NaCl içinde 33,3 mL/saat; taze hazırlanıp derhal başlatılmalıdır!',
          },
          {
            id: 'std_1g_30m',
            label: 'Standart Aralıklı (1 g q8sa · 30 dk)',
            singleDoseMg: 1000,
            intervalHours: 8,
            infusionHours: 0.5,
            diluentVolumeMl: 100,
            note: 'Septik şokta olmayan servis/YBÜ hastalarında 30 dk standart infüzyon.',
          },
        ],
        tdmNote:
          'MERCY (JAMA 2023) ve BLING III (JAMA 2024) verileri doğrultusunda septik şokta uzamış/sürekli infüzyon tercih edilir; TDM mevcutsa vadi (Cmin) 4–16 mg/L hedeflenir (>45 mg/L nörotoksisite eşiği).',
        specialConversionNote:
          'STABİLİTE HATIRLATMASI: Meropenem %0,9 NaCl içinde oda sıcaklığında 3–4 saat, %5 Dekstroz içinde yalnızca 1 saat stabildir! 3 saatlik EI’yi kesinlikle %0,9 NaCl ile hazırlayın.',
      },
      renalTiers: [
        {
          id: 'egfr_50',
          label: 'Normal / Hafif KBH',
          egfrRange: 'eGFR > 50 mL/dk',
          recommendation: 'Tam Doz (q8sa)',
          doseText: '1 g (veya Menenjit/Yüksek MIC: 2 g) IV q8sa (3 saat EI)',
          note: 'İlk 48 saat septik ABH’de erken doz azaltımından kaçının; 48. saatte böbrek fonksiyonunu yeniden değerlendirin.',
          tone: 'emerald',
        },
        {
          id: 'egfr_26_50',
          label: 'Orta KBH / ABH',
          egfrRange: 'eGFR 26–50 mL/dk',
          recommendation: 'q12sa’ya Uzat',
          doseText: '1 g (Menenjit: 2 g) IV q12sa (3 saat EI)',
          note: 'Tek doz korunur, doz aralığı 12 saate çıkarılır.',
          tone: 'amber',
        },
        {
          id: 'egfr_10_25',
          label: 'İleri KBH',
          egfrRange: 'eGFR 10–25 mL/dk',
          recommendation: '%50 Doz q12sa',
          doseText: '500 mg (Menenjit: 1 g) IV q12sa',
          note: 'Ağır sepsis/yüksek MIC’te 500 mg q8sa (3 saat EI) değerlendirilebilir.',
          tone: 'amber',
        },
        {
          id: 'egfr_lt10',
          label: 'Ağır KBY (Diyalizsiz)',
          egfrRange: 'eGFR < 10 mL/dk',
          recommendation: '%50 Doz q24sa',
          doseText: '500 mg (Menenjit: 1 g) IV q24sa',
          note: 't½ 7–10 saate uzar; nöbet eşiği açısından yakından izlenmelidir.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHD/CVVHDF): Meropenemin protein bağlanması %2 olduğu için CRRT ile yoğun temizlenir! 1 g yükleme → 1 g IV q8sa (3 saat EI) [düşük eflüent <25 mL/kg/saat ve hassas suşta 500 mg q8sa veya 1 g q12sa; yüksek eflüent/menenjitte 1–2 g q8sa EI].',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Hemodiyalizle %50–70 oranında temizlenir! 500 mg IV q24sa (menenjitte 1 g q24sa), HD günlerinde doz MUTLAKA diyaliz seansı bittikten sonra verilir (veya haftada 3 kez HD sonrası 1 g; Cuma→Pazartesi 72 sa aralıkta 1,5–2 g).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Meronem® / Merozan® / Merosid® 1 g IV Flakon',
          presentation: '1000 mg meropenem + sodyum karbonat tamponlu liyofilize toz',
          concentration: '1 g / flakon (~3,9 mEq = 90 mg Na⁺)',
          saltOrBaseNote: 'Her 1 g flakonda ~3,9 mEq Na⁺ bulunur (Pip-Tazo ve Amp-Sulb’dan belirgin düşüktür).',
          alertLevel: 'standard',
        },
        {
          name: 'Meronem® / Merozan® 500 mg IV Flakon',
          presentation: '500 mg meropenem liyofilize toz flakon',
          concentration: '500 mg / flakon (~1,95 mEq Na⁺)',
          saltOrBaseNote: 'eGFR <25 mL/dk renal ayarlı dozlar ve pediatrik hastalar için uygundur.',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        '3 Saatlik Uzamış İnfüzyon (1–2 g): Flakon 20 mL enjeksiyonluk su/SF ile sulandırılıp 100 mL %0,9 NaCl’ye aktarılır → 33,3 mL/saat hızla 3 saatte derhal infüze edilir!',
        'D5W UYARISI: %5 Dekstroz içinde oda sıcaklığında stabilite YALNIZCA 1 SAATTİR — uzamış infüzyonda ASLA D5W kullanmayın!',
      ],
      concentrationTrapWarning:
        'Meropenem ısıya ve dekstroza duyarlıdır! 25°C’nin üzerindeki sıcak YBÜ odalarında veya güneş altında bekletilmiş torbalarda 3 saat içinde %10’dan fazla potens kaybı oluşur — hazırlanan torbayı hemen takın.',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik veya santral hattan güvenle uygulanır; ancak 3 saatlik uzamış infüzyon sırasında fiziksel geçimsizliklerden (Amfoterisin B, Asiklovir, Kalsiyum glukonat, Diazepam, Kaspofungin) kaçınmak için ayrı lümen tercih edilir.',
      phRange: '7,3 – 8,3',
      osmolalityNote: '1 g / 100 mL SF çözeltisi izoozmolar (~320 mOsm/kg) olup damar irritasyonu minimaldir.',
      compatibleDiluents: ['%0,9 NaCl (SF — 1. tercih, 25°C’de 3–4 saat stabil)', '%5 Dekstroz (YALNIZCA 15–30 dk kısa infüzyon; 1 saat stabil!)'],
      ySiteCompatible: ['Fentanil', 'Midazolam', 'Noradrenalin', 'Heparin', 'İnsülin', 'Vankomisin (düşük/standart kons.)', 'Metronidazol', 'Potasyum klorür'],
      ySiteIncompatible: ['Asiklovir', 'Amfoterisin B', 'Kalsiyum glukonat (yüksek kons.)', 'Diazepam', 'Doksisiklin', 'Kaspofungin', 'Ondansetron (yüksek kons.)'],
      stabilityNote:
        '%0,9 NaCl içinde 25°C’de 3–4 saat (2–8°C buzdolabında 24 saat), %5 Dekstroz içinde 25°C’de YALNIZCA 1 saat stabildir!',
      extravasationProtocol:
        'Vezikan değildir. Ekstravazasyonda infüzyonu durdurun, ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Ağırlıklı (%70) renal eliminasyon — eGFR <50 mL/dk’da doz azaltılır; CRRT’de (%2 protein bağlanması) yoğun klirens nedeniyle tam/yüksek doz gerekir!',
      renalDetails: [
        'eGFR 26–50: 1 g q12sa; eGFR 10–25: 500 mg q12sa; eGFR <10: 500 mg q24sa.',
        'CRRT’de düşük protein bağlanması (%2) nedeniyle sieving katsayısı ~0,95’tir → standart 1 g q8sa (3 sa EI) çoğu YBÜ hastasında güvenle gerekir.',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde (Child-Pugh A/B/C) doz ayarı GEREKMEZ.',
      hepaticDetails: [
        'Sirotik hastalarda ESBL-pozitif spontan bakteriyel peritonit (SBP) ve sepsis için 1. basamaktır.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'eGFR’ye Göre Ayarla',
      geriatricPoints: [
        'Yaşlılarda eGFR düşüşü ile birikim olabilir; ancak Sefepim ve İmipeneme kıyasla nörotoksisite/deliryum profili belirgin daha güvenlidir.',
      ],
      obesityWeightScalarBadge: 'TBW · 1–2 g q8sa EI',
      obesityPoints: [
        'Morbid obezitede (≥120 kg) artmış Vd ve ARC nedeniyle 1 g yerine 2 g q8sa (3 saat EI) özellikle P. aeruginosa ve yüksek MIC’li enfeksiyonlarda önerilir.',
      ],
      clinicalNote:
        'Valproik asit kullanan epileptik/nöroşirürji hastasında (ör. status epileptikus veya beyin tümörü profilaksisi) Meropenem order’ı girilmeden önce eczane/doktor çift kontrolü hayati önem taşır!',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte Ciddi ESBL / Polimikrobiyal Sepsiste Güvenli Karbapenem (Eski FDA B).',
      pregnancyDetails: [
        'İmipeneme (eski FDA C) kıyasla gebelikte çok daha geniş güvenlik verisine sahiptir; ağır ESBL piyelonefrit/sepsiste 1. tercih karbapenemdir.',
      ],
      lactationSummary: 'Emzirme ile Uyumlu (LactMed).',
      lactationDetails: [
        'Anne sütüne çok düşük miktarda geçer ve oral biyoyararlanımı yoktur; bebekte sistemik etki beklenmez.',
      ],
    },
    adverseEffects: [
      {
        title: 'Valproik Asit Çökmesi → Refrakter Status Epileptikus',
        incidenceOrSeverity: '%80–100 (Birlikte Kullanımda!)',
        detail:
          'VPA düzeyini 24–48 saatte %60–90 düşürerek hayatı tehdit eden kırılma nöbetleri ve status epileptikusa yol açar.',
        tone: 'rose',
      },
      {
        title: 'Nöbet / Ensefalopati (İmipenem & Sefepimden Az)',
        incidenceOrSeverity: '%0,5–0,7',
        detail:
          'Genellikle eGFR <25 mL/dk’da doz ayarlanmadığında veya altta yatan SSS lezyonunda görülür.',
        tone: 'amber',
      },
      {
        title: 'C. difficile & Karbapenem-Dirençli Suş (CRE) Seçilimi',
        incidenceOrSeverity: 'YBÜ’de Kritik Risk',
        detail:
          'Geniş spektrumlu flora baskılanması CRE (OXA-48/KPC/NDM), CRAB ve invaziv kandidiyazis kolonizasyonunu hızlandırır — kültür sonuçlarına göre erken de-eskalasyon şarttır.',
        tone: 'indigo',
      },
      {
        title: 'İshal, Bulantı, Transaminaz Artışı & Eozinofili',
        incidenceOrSeverity: '%2–5 (Hafif-Orta)',
        detail:
          'Çoğunlukla hafif ve geri dönüşlüdür; hızlı IV puşede bulantı/kusma sıklaşır (30 dk–3 sa infüzyonla önlenir).',
        tone: 'teal',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Valproik Asit (Depakin®) Kontrol Listesi',
        detail:
          'Nöro-YBÜ’de Meropenem başlamadan önce hastanın antiepileptik listesini mutlaka kontrol edin; VPA alıyorsa Meropenem yerine Sefepim/Pip-Tazo/Seftazidim-Avibaktam veya VPA yerine Levetirasetam/Lakozamid seçin.',
      },
      {
        title: 'BLING III (JAMA 2024) & MERCY (JAMA 2023) Yorumu',
        detail:
          'MERCY çalışması sürekli vs aralıklı meropenemde birincil sonlanımda nötr kalırken, 7031 hastalık BLING III çalışması ve 2024 JAMA meta-analizi kritik sepsiste uzamış/sürekli β-laktam infüzyonunun 90 günlük mortaliteyi azalttığını (RR 0,86) ve klinik kürü artırdığını göstermiştir.',
      },
      {
        title: 'Penisilin Alerjisinde Çapraz Reaksiyon (<%1)',
        detail:
          'Penisilin veya sefalosporin alerjisi etiketi nedeniyle kritik ESBL hastasında Meropenem’den kaçınmayın; gerçek çapraz reaksiyon <%1’dir (SCAR hariç güvenle verilir).',
      },
      {
        title: '3 Saatlik İnfüzyonda Taze SF Hazırlama Zorunluluğu',
        detail:
          'Hemşirelik ekibi 1 g Meropenem’i 100 mL %0,9 NaCl ile tam uygulama saatinde sulandırmalıdır; saatler öncesinden hazırlanıp dolap dışında bekleyen torbalar etkinliğini yitirir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'OprD Porin Girişi, PBP2/3 Yüksek Afinite & DHP-1 Direnci',
        summary:
          'Meropenem küçük, kompakt zwitteriyonik yapısı sayesinde P. aeruginosa OprD porininden hızla geçer ve özellikle PBP2 ile PBP3’ü yüksek afiniteyle açiller.',
        points: [
          'C-1β pozisyonundaki metil grubu böbrek proksimal tübülündeki renal dehidropeptidaz-1 (DHP-1) enzimine karşı tam direnç sağlar (İmipenem gibi Silastatin gerektirmez).',
          'P. aeruginosa’da OprD porin kaybı + MexAB-OprM eflüks pompası upregülasyonu meropenem direncinin başlıca non-karbapenemaz mekanizmasıdır.',
        ],
      },
      intracellularSignaling: {
        title: 'Bakteriyel Sferoplast Lizisi & VPA-Glukuronid Açilpeptit Hidrolaz Blokajı',
        summary:
          'Bakteride hızlı sferoplast lizisi yaparken, memeli hepatositlerinde valproik asit enterohepatik resirkülasyon enzimini inhibe eder.',
        points: [
          'Meropenem hepatik sitozolde bulunan açilpeptit hidrolaz (APEH) enzimini geri dönüşsüz inhibe ederek VPA-glukuronidin tekrar serbest valproik aside dönüşmesini durdurur ve eritrositlere VPA dağılımını artırır.',
          'Bu moleküler mekanizma nedeniyle VPA serum konsantrasyonu 24–48 saat içinde terapötik aralığın (50–100 mcg/mL) çok altına (<10–15 mcg/mL) çöker.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Santral Sinir Sistemi & Meninksler',
          tissueTarget: 'BOS %15–40 · Düşük GABA-A Riski',
          accent: 'violet',
          points: [
            '2 g q8sa rejimi ile inflame meninkslere yüksek geçiş sağlar ve post-nöroşirürji Gram-negatif menenjitte 1. basamaktır.',
            'İmipenem ve Sefepimden belirgin daha düşük nöbet/NCSE potansiyeline sahiptir.',
          ],
        },
        {
          systemTitle: 'Akciğer (ELF) & İntra-Abdominal Odaklar',
          tissueTarget: 'VAP · Nekrotizan Pankreatit',
          accent: 'teal',
          points: [
            'Pankreatik nekrotik dokuya ve akciğer ELF’sine yüksek penetrasyon gösterir; %2 protein bağlanması sayesinde kritik hipoalbüminemiden etkilenmez.',
            '3 saatlik uzamış infüzyon yüksek MIC’li (4–8 mcg/mL) P. aeruginosa suşlarında bile ELF’de %fT>MIC sağlar.',
          ],
        },
        {
          systemTitle: 'Renal Eliminasyon & CRRT Klirensi',
          tissueTarget: 'Sieving Katsayısı ~0,95',
          accent: 'sky',
          points: [
            'Protein bağlanması %2 olduğu için CRRT filtresinden neredeyse tamamen süzülür — CRRT hastasında yanlışlıkla "anürik renal doz (500 mg q24sa)" verilmesi ölümcül eksik doza yol açar!',
            'eGFR <50’de (CRRT yoksa) kademeli azaltım yapılır.',
          ],
        },
        {
          systemTitle: 'Hepatik İlaç Etkileşimi (APEH)',
          tissueTarget: 'Valproik Asit Yıkımı',
          accent: 'rose',
          points: [
            'Karbapenem kesildikten sonra dahi APEH enziminin yeniden sentezlenmesi 7–14 gün sürer; bu süre boyunca VPA düzeyi düşük kalabilir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: '%fT>MIC Hedefi (≥%40 → Septik Şokta %100) & Post-Antibiyotik Etki',
        summary:
          'Karbapenemler diğer β-laktamlardan farklı olarak P. aeruginosa dahil Gram-negatiflere karşı 1–3 saatlik belirgin post-antibiyotik etki (PAE) sergiler; buna karşın kritik sepsiste %100 fT>MIC klinik kürü artırır.',
        points: [
          'MERINO (JAMA 2018): ESBL bakteriyemisinde Meropenem, Pip-Tazo’ya göre 30 günlük mortaliteyi %12,3’ten %3,7’ye düşürmüştür.',
          'BLING III (JAMA 2024) + eşlik eden meta-analiz: Kritik sepsiste uzamış/sürekli infüzyon 90 günlük sağkalımı ve klinik kürü iyileştirir.',
        ],
      },
      clinicalPearls: [
        'Meropenem + Valproik asit = ASLA! VPA dozunu iki katına çıkarsanız bile nöbeti engelleyemezsiniz.',
        'Meropenem %2 proteine bağlanır → CRRT’de neredeyse normal böbrek gibi temizlenir; CRRT’de 1 g q8sa (3 sa EI) verin!',
        '3 saatlik uzamış infüzyonu daima %0,9 NaCl ile taze hazırlayın — D5W içinde 1 saatte bozulur!',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Meropenem',
      structuredInteractions: [
        {
          severity: 'X',
          agent: 'Valproik Asit / Sodyum Valproat (Depakin® / Convulex®)',
          mechanism: 'Hepatik açilpeptit hidrolaz (APEH) inhibisyonu ile VPA-glukuronid hidrolizinin bloğu',
          clinicalEffect: 'VPA serum konsantrasyonu 24–48 saatte %60–90 düşer → kırılma nöbetleri ve refrakter status epileptikus.',
          management: 'KESİNLİKLE BİRLİKTE KULLANMAYIN! Alternatif antibiyotik (karbapenem dışı) veya alternatif antiepileptik (Levetirasetam vb.) seçin.',
        },
        {
          severity: 'C',
          agent: 'Probenesid',
          mechanism: 'Aktif renal tübüler sekresyon (OAT) inhibisyonu',
          clinicalEffect: 'Meropenem yarı ömrü ~%38 uzar ve sistemik maruziyet artar.',
          management: 'Birlikte kullanımdan kaçının.',
        },
        {
          severity: 'C',
          agent: 'Gansiklovir / Valgansiklovir',
          mechanism: 'Aditif santral GABA-A antagonizması',
          clinicalEffect: 'Nöbet eşiğinde azalma (özellikle böbrek yetmezliğinde).',
          management: 'eGFR’ye göre her iki ilacı titizlikle ayarlayın ve nörolojik izlem yapın.',
        },
      ],
      references: [
        {
          authors: 'Dulhunty JM, Brett SJ, De Waele JJ, et al. (BLING III Investigators).',
          title: 'Continuous vs Intermittent β-Lactam Antibiotic Infusions in Critically Ill Patients With Sepsis: A Randomized Clinical Trial',
          journal: 'JAMA',
          year: 2024,
          note: 'Kritik sepsiste sürekli vs aralıklı Meropenem/Pip-Tazo infüzyonunu değerlendiren 7031 hastalık uluslararası RKÇ.',
        },
        {
          authors: 'Monti G, Bradic N, Marzaroli M, et al. (MERCY Investigators).',
          title: 'Continuous vs Intermittent Meropenem Administration in Critically Ill Patients With Sepsis: The MERCY Randomized Clinical Trial',
          journal: 'JAMA',
          year: 2023,
          note: 'YBÜ sepsisinde sürekli vs aralıklı meropenem uygulamasını inceleyen çok merkezli RKÇ.',
        },
        {
          authors: 'Harris PNA, Tambyah PA, Lye DC, et al. (MERINO Trial Investigators).',
          title: 'Effect of Piperacillin-Tazobactam vs Meropenem on 30-Day Mortality for Patients With E coli or Klebsiella pneumoniae Bloodstream Infection and Ceftriaxone Resistance',
          journal: 'JAMA',
          year: 2018,
          note: 'ESBL bakteriyemisinde Meropenem’in kesin mortalite üstünlüğünü ortaya koyan landmark çalışma.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/meropenem.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 7. SEFTAZİDİM-AVİBAKTAM (CEFTAZIDIME-AVIBACTAM)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ceftazidime-avibactam',
    classTag: 'carbapenem_blbli',
    accentColor: 'purple',
    atcCode: 'J01DD52',
    classLabel: '3. Kuşak Antipsödomonal + Yeni Nesil DBO BLI (4:1) · CRE 1. Tercih',
    tradeNamesTr: 'Zavicefta® (2 g Seftazidim + 0,5 g Avibaktam = 2,5 g IV Flakon)',
    title: 'Seftazidim-Avibaktam Monografisi',
    cardTitle: 'Seftazidim-Avibaktam',
    cardBadge: 'KPC / OXA-48 CRE 1. Tercih · MBL (+Aztreonam)',
    cardCategoryLabel: 'Yeni Nesil BL/BLI · CRE / DTR Kurtarma',
    cardShortDesc:
      'Türkiye YBÜ’lerinin başlıca CRE sorunu olan OXA-48 ve KPC üreten Enterobacterales ile DTR P. aeruginosa için IDSA 2024 1. basamak (2,5 g q8sa 2 sa infüzyon). MBL’ye (NDM/VIM) tek başına etkisiz → Aztreonam ekle!',
    cardHighlights: [
      {
        label: 'CRE (OXA-48 / KPC)',
        value: '2,5 g q8sa (2 sa IV)',
        subtext: 'IDSA 2024 1. Basamak · DTR Psödo',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'MBL (NDM / VIM / IMP)',
        value: 'TEK BAŞINA ETKİSİZ!',
        subtext: '+ Aztreonam 2 g q8sa eşzamanlı!',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'İlk 48 sa ABH Tuzağı',
        value: 'Erken Doz Kırpma!',
        subtext: 'İyileşen ABH’de başarısızlık riski',
        colorClass: 'text-amber-700 dark:text-amber-300',
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
      },
    ],
    aliases: ['seftazidim avibaktam', 'ceftazidime avibactam', 'zavicefta', 'caz-avi', 'cazavi'],
    searchKeywords: [
      'seftazidim avibaktam',
      'ceftazidime avibactam',
      'zavicefta',
      'cre',
      'oxa-48',
      'kpc',
      'mbl',
      'ndm',
      'aztreonam',
      'dtr pseudomonas',
    ],
    highAlert: {
      tallManName: 'cefTAZidime-avibactam',
      confusionRiskWith: 'ceFAZolin · cefTRIAXone · ceftolozane-tazobactam',
      criticalAlerts: [
        'MBL (NDM / VIM / IMP) ÜRETEN CRE’DE TEK BAŞINA ETKİSİZDİR!: Avibaktam sınıf B metallo-β-laktamazları (MBL) İNHİBE EDEMEZ! Türkiye YBÜ’lerinde OXA-48 yanında artan NDM-pozitif Klebsiella enfeksiyonlarında mutlaka AZTREONAM (2 g q8sa 2–3 saat eşzamanlı infüzyon!) ile kombine edilmelidir!',
        'İLK 48 SAATTE GEÇİCİ ABH’DE AGRESİF DOZ DÜŞÜRÜMÜ TEDAVİ BAŞARISIZLIĞINA YOL AÇAR: RECLAIM/REPROVE Faz III çalışmalarında başvuruda eGFR 30–50 olup hızla iyileşen hastalarda erken doz azaltımı klinik kür oranını belirgin düşürmüştür! İlk 24–48 saatte eGFR’yi günlük izleyip düzelme eğiliminde tam doza (2,5 g q8sa) hızla çıkın!',
        'ANAEROBLARA (B. FRAGİLİS) ETKİSİZDİR: Komplike intra-abdominal enfeksiyonlarda (cIAI) tek başına kullanılmamalı, mutlaka IV Metronidazol 500 mg q8sa eklenmelidir!',
        'CRAB (ACİNETOBACTER BAUMANNİİ), MRSA VE ENTEROKOKLARA ETKİSİZDİR: Karbapenem-dirençli Acinetobacter’in OXA-23/24/58 karbapenemazları avibaktamla inhibe olmaz — CRAB’da Zavicefta KULLANILMAZ!',
      ],
      antidoteOrRescue:
        'Anafilakside standart Adrenalin + sıvı protokolü uygulanır. Ağır böbrek yetmezliğinde seftazidim birikimine bağlı nörotoksisite/ensefalopati/nöbet gelişirse ilacı kesin; hem seftazidim hem avibaktam hemodiyaliz ile >%50 oranında etkin biçimde temizlenir.',
    },
    identitySummary:
      'Seftazidim-avibaktam (Zavicefta®), antipsödomonal 3. kuşak sefalosporin (seftazidim) ile yeni nesil diazabisiklooktan (DBO) non-β-laktam β-laktamaz inhibitörü (avibaktam) 4:1 kombinasyonudur. Türkiye YBÜ’lerinde endemik olan OXA-48 ve KPC karbapenemaz üreten CRE enfeksiyonlarında (kolistine kıyasla mortaliteyi yarı yarıya düşüren!) ve zor tedavi edilen (DTR) P. aeruginosa’da IDSA 2024 1. basamak kurtarma ajanıdır.',
    spectrumHighlights: [
      {
        title: '1. Basamak: OXA-48 · KPC · DTR P. aeruginosa',
        detail:
          'Sınıf A (ESBL, KPC), Sınıf C (AmpC) ve Sınıf D (OXA-48 — Türkiye YBÜ’lerinin ana CRE enzimi!) enzimlerini bloke eder. Kolistine göre belirgin yüksek sağkalım ve çok düşük nefrotoksisite!',
        tone: 'emerald',
      },
      {
        title: 'MBL (NDM/VIM/IMP) İçin Aztreonam Sinerjisi',
        detail:
          'Tek başına MBL’ye etkisizdir; ancak Aztreonam ile eşzamanlı infüze edildiğinde Aztreonam MBL’ye direnir, Avibaktam ise eşlik eden ESBL/AmpC/OXA-48’i bloke ederek IDSA 2024 1. basamak MBL tedavisini oluşturur.',
        tone: 'amber',
      },
      {
        title: 'Kesin Boşluklar (CRAB · Anaerob · Gram-Pozitif)',
        detail:
          'Acinetobacter baumannii (CRAB), Stenotrophomonas, MRSA, Enterococcus spp. ve B. fragilis anaeroblarına ETKİSİZDİR (cIAI’de Metronidazol ekle!).',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Seftazidim, Gram-negatif bakterilerde PBP3’e bağlanarak hücre duvarı sentezini durdurur. Avibaktam ise klasik β-laktam inhibitörlerinden farklı olarak geri dönüşlü (kovalent ama yeniden siklize olabilen) mekanizmayla Sınıf A (KPC, ESBL), Sınıf C (AmpC) ve Sınıf D (OXA-48) serin β-laktamazları son derece düşük IC50 değerleriyle inhibe ederek seftazidimi hidrolizden korur.',
    mechanismPillars: [
      {
        title: 'Geri Dönüşlü DBO İnhibisyonu (Tükenmeyen Kalkan)',
        detail:
          'Klavulanat/tazobaktam gibi tek seferde parçalanıp tükenmek yerine avibaktam aktif serinden de-açilasyonla tekrar aktif DBO formuna döner; yüksek inokülümlü KPC/OXA-48 suşlarında etkinliğini korur.',
      },
      {
        title: 'OXA-48 & KPC Hedefli Türkiye YBÜ Stratejisi',
        detail:
          'Meropenem-vaborbaktam ve imipenem-relebaktam OXA-48’i inhibe EDEMEZ; OXA-48 üreten CRE’de (Türkiye’de en yaygın CRE tipi) 1. basamak tek β-laktam/BLI seçeneği Seftazidim-Avibaktam’dır!',
      },
      {
        title: 'Aztreonam ile Moleküler Ortaklık (MBL Kurtarma)',
        detail:
          'MBL (NDM/VIM) enzimleri çinko (Zn²⁺) bağımlıdır ve avibaktamla bloke edilemez; ancak monobaktam olan Aztreonam MBL ile hidrolize olmaz — Seftazidim-Avibaktam + Aztreonam eşzamanlı verilince tüm β-laktamazlar örtülür.',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '2,2 – 2,7 saat',
        detail: 'Hem seftazidim hem avibaktam neredeyse özdeş PK/eliminasyon profiline sahiptir.',
      },
      {
        label: 'Protein Bağlanması',
        value: '<%10 (Her İki Bileşen)',
        detail: 'Çok düşük protein bağlanması → yüksek serbest fraksiyon (%90+); hipoalbüminemiden etkilenmez.',
      },
      {
        label: 'Akciğer (ELF) Penetrasyonu',
        value: '~%30 – 35 ELF',
        detail: '2,5 g q8sa 2 saatlik infüzyonla VAP/HAP’ta meropeneme non-inferior klinik kür (REPROVE çalışması).',
      },
      {
        label: 'Eliminasyon',
        value: '%80 – 95 Renal',
        detail: 'Glomerüler filtrasyonla değişmeden atılır; eGFR ≤50 mL/dk’da doz azaltılır (ilk 48 sa ABH dinamik takibi şart!).',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Seftazidim, avibaktam veya diğer sefalosporinlere karşı belgelenmiş ağır IgE-aracılı anafilaksi öyküsü.',
        'Şiddetli gecikmiş kütanöz reaksiyon (SJS/TEN/DRESS/AGEP) öyküsü.',
      ],
      relativeItems: [
        'Ampirik/rutin kullanım (antibiyotik yönetim onayı ve direnç/karbapenemaz riski olmadan kullanılmamalıdır — KPC mutasyonlarıyla tedavi altında direnç gelişebilir!).',
        'Komplike intra-abdominal enfeksiyonda Metronidazol eklenmeden monoterapi kullanımı.',
        'MBL (NDM/VIM) şüphesinde Aztreonam eklenmeden tek başına uygulanması.',
      ],
      clinicalNote:
        'Seftazidim-avibaktam direnci (ör. KPC-2/3 Ω-loop mutasyonları) özellikle kaynak kontrolü yapılmamış PNÖMONİ veya CRRT hastalarında yetersiz dozlamayla gelişebilir — tam doz + 2 saatlik infüzyon + kaynak kontrolü esastır!',
    },
    regimenCards: [
      {
        title: 'KPC / OXA-48 CRE & DTR P. aeruginosa (VAP / Bakteriyemi / İYE)',
        setting: 'icu',
        badge: 'IDSA 2024 1. Basamak',
        dose: '2,5 g IV (2 g + 0,5 g)',
        infusionDuration: '2 saat IV',
        interval: 'q8sa (7,5 g/gün)',
        note: 'Standart eGFR >50 mL/dk dozu. 100 mL %0,9 NaCl veya D5W içinde 50 mL/saat hızla 2 saatte infüze edilir. cIAI’de mutlaka Metronidazol 500 mg q8sa eklenir!',
      },
      {
        title: 'MBL (NDM / VIM / IMP) Üreten CRE — Aztreonam Kombinasyonu',
        setting: 'special',
        badge: 'IDSA 2024 MBL 1. Tercih',
        dose: 'Zavicefta 2,5 g + Aztreonam 2 g',
        infusionDuration: '2–3 saat EŞZAMANLI',
        interval: 'q8sa',
        note: 'KRİTİK UYGULAMA: Seftazidim-Avibaktam (2,5 g) ve Aztreonam (2 g) AYNI ANDA (eşzamanlı 2–3 saatlik infüzyon, Y-site uyumlu!) uygulanmalıdır ki avibaktam ve aztreonam pik/vadi profilleri örtüşsün!',
      },
      {
        title: 'Yüksek MIC / Ağır Septik Şok / ARC — Uzamış İnfüzyon',
        setting: 'icu',
        badge: '3 sa EI / Sürekli',
        dose: '2,5 g IV',
        infusionDuration: '3 saat (EI)',
        interval: 'q8sa',
        note: 'Hiperdinamik ARC (eGFR >130 mL/dk) veya derin VAP/bakteriyemide 3 saatlik uzamış infüzyon %fT>MIC’yi ve KPC direnç önleme eşiğini maksimize eder.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Sabit 2,5 g q8sa dozu kullanılır; morbid obezitede (≥120 kg) ve ARC’de (eGFR >130 mL/dk) 2 saat yerine 3 saatlik uzamış infüzyon %fT>MIC ve avibaktam eşik konsantrasyonunu (>1 mg/L) korur.',
      perioperative: {
        applicable: false,
        summaryTitle: 'Rezerv CRE / DTR Kurtarma Ajanı — Cerrahi Profilakside Kullanılmaz!',
        timingWindow: 'Uygulanmaz',
        standardDoseLabel: 'Cerrahi profilaksi endikasyonu yoktur',
        adultStandardDoseMg: 2500,
        infusionTimeText: '2 saat IV',
        clinicalNote:
          'Yalnızca enfeksiyon hastalıkları konsültasyonu ile aktif CRE enfeksiyonu varlığında perioperatif devam dozu (q8sa, 2 saat infüzyon) kesintiye uğratılmadan sürdürülür.',
        nonProphylaxisReason:
          'Seftazidim-Avibaktam, Türkiye YBÜ’lerinde OXA-48 ve KPC üreten karbapenem-dirençli Enterobacterales için en değerli 1. basamak kurtarma ajanıdır. Cerrahi profilakside kullanılması hızla avibaktam-dirençli KPC/MBL suşlarını seçer ve tamamen kontrendikedir.',
      },
      icu: {
        pkPdTarget: 'Seftazidim %fT>MIC ≥ %50–100 + Avibaktam %fT>CT (≥1 mg/L) ≥ %50–100',
        pkPdBadge: '%fT > MIC + %fT > CT (2 sa IV)',
        loadingDoseLabel: '2,5 g IV (İlk doz tam 2,5 g — böbrek yetmezliğinde bile!)',
        loadingFixedMg: 2500,
        loadingUnit: 'mg',
        loadingInfusionText: '2 saatte IV infüzyon (100 mL SF veya D5W)',
        maintenanceLabel: 'YBÜ CRE (OXA-48 / KPC / MBL) & DTR P. aeruginosa Rejimleri',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'std_2500_q8_2h',
            label: 'Standart CRE / DTR Psödo (2,5 g q8sa · 2 sa IV)',
            singleDoseMg: 2500,
            intervalHours: 8,
            infusionHours: 2,
            diluentVolumeMl: 100,
            note: 'eGFR >50 mL/dk için FDA/EMA/IDSA 2024 standart rejimi (7,5 g/gün). Pompa hızı: 50 mL/saat.',
          },
          {
            id: 'ei_2500_q8_3h',
            label: 'ARC / Septik Şok / MBL (+Aztreonam) (2,5 g q8sa · 3 sa EI)',
            singleDoseMg: 2500,
            intervalHours: 8,
            infusionHours: 3,
            diluentVolumeMl: 100,
            note: '3 saatlik EI (33,3 mL/saat). MBL suşlarında Aztreonam 2 g q8sa ile EŞZAMANLI infüze edilir!',
          },
          {
            id: 'renal_1250_q8_2h',
            label: 'Orta KBH (eGFR 31–50 mL/dk: 1,25 g q8sa · 2 sa IV)',
            singleDoseMg: 1250,
            intervalHours: 8,
            infusionHours: 2,
            diluentVolumeMl: 50,
            note: '3,75 g/gün. İlk 48 saatte geçici ABH hızla düzeliyorsa 2,5 g q8sa’ya çıkmakta gecikmeyin!',
          },
        ],
        specialConversionNote:
          '4:1 SABİT ORAN: 1 flakon Zavicefta® = 2 g Seftazidim + 0,5 g Avibaktam = TOPLAM 2,5 g’dır. Doz her zaman toplam (2,5 g / 1,25 g / 0,94 g) olarak yazılmalıdır!',
      },
      renalTiers: [
        {
          id: 'egfr_50',
          label: 'Normal / Hafif KBH',
          egfrRange: 'eGFR > 50 mL/dk',
          recommendation: 'Tam Doz (2,5 g q8sa)',
          doseText: '2,5 g IV (2 saat infüzyon) q8sa',
          note: 'Standart tam doz. cIAI’de + Metronidazol; MBL’de + Aztreonam 2 g q8sa.',
          tone: 'emerald',
        },
        {
          id: 'egfr_31_50',
          label: 'Orta KBH / ABH (İlk 48 sa Dikkat!)',
          egfrRange: 'eGFR 31–50 mL/dk',
          recommendation: '1,25 g q8sa (Dinamik İzle)',
          doseText: '1,25 g IV (2 saat infüzyon) q8sa (1 g + 0,25 g)',
          note: 'KRİTİK UYARI: Başvuruda geçici septik ABH’si olan ve hızla düzelen hastalarda erken doz kırpması tedavi başarısızlığına yol açar — günlük eGFR izleyin ve >50 olunca hemen 2,5 g q8sa’ya çıkın!',
          tone: 'amber',
        },
        {
          id: 'egfr_16_30',
          label: 'İleri KBH',
          egfrRange: 'eGFR 16–30 mL/dk',
          recommendation: '0,94 g q12sa',
          doseText: '0,94 g IV (2 saat infüzyon) q12sa (0,75 g + 0,19 g)',
          note: 'İlk doz 2,5 g yükleme olarak verilip ardından 0,94 g q12sa’ya geçilebilir.',
          tone: 'amber',
        },
        {
          id: 'egfr_lt15',
          label: 'Ağır KBY / IHD',
          egfrRange: 'eGFR ≤ 15 mL/dk',
          recommendation: '0,94 g q24–48sa',
          doseText: 'eGFR 6–15: 0,94 g q24sa | eGFR ≤5: 0,94 g q48sa (HD sonrası)',
          note: 'Aşırı birikimde seftazidim kaynaklı ensefalopati/nöbet riski artar.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHD/CVVHDF): Düşük protein bağlanması (<%10) nedeniyle CRRT ile yoğun temizlenir! Yetersiz dozu ve direnç gelişimini önlemek için 2,5 g yükleme → 1,25 g IV q8sa (yüksek eflüent ≥30 mL/kg/saat, VAP veya yüksek MIC’te 2,5 g IV q8sa 2–3 saat infüzyon!) önerilir.',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Hemodiyalizle >%50 temizlenir. 0,94 g IV q24–48sa; HD günlerinde doz MUTLAKA diyaliz seansı bittikten sonra uygulanır.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Zavicefta® 2 g / 0,5 g (2,5 g) IV İnfüzyon İçin Toz Flakon',
          presentation: '2 g seftazidim (pentahidrat) + 0,5 g avibaktam (sodyum) tek doz flakon',
          concentration: '2,5 g toplam / flakon (~146 mg = 6,4 mEq Na⁺)',
          saltOrBaseNote: 'SUT/Enfeksiyon Hastalıkları uzman onayı ile temin edilir; 1,25 g veya 0,94 g renal dozlar 2,5 g flakondan volümetrik olarak çekilir.',
          alertLevel: 'high',
        },
      ],
      standardDilutions: [
        'Rekonstitüsyon: 2,5 g flakona 10 mL enjeksiyonluk su eklenip nazikçe çalkalanır (CO₂ çıkışı nedeniyle basınç oluşur, havalandırma iğnesi kullanın — toplam son hacim ~12 mL = 208 mg/mL!).',
        'Tam Doz (2,5 g): Rekonstitüe tüm çözelti (~12 mL) 100 mL %0,9 NaCl veya D5W içine eklenerek 2 saatte (50 mL/saat) infüze edilir.',
        'Renal Doz (1,25 g = ~6 mL; 0,94 g = ~4,5 mL): Rekonstitüe çözeltiden hesaplanan hacim çekilip 50–100 mL SF/D5W içinde 2 saatte infüze edilir.',
      ],
      concentrationTrapWarning:
        'Rekonstitüsyon hacmi 10 mL eklendiğinde toz hacmiyle birlikte TOPLAM ~12 mL olur (10 mL DEĞİL!). Yarım doz (1,25 g) için 6 mL, 0,94 g için 4,5 mL çekilmelidir — 5 mL çekmek %17 eksik doza yol açar!',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik veya santral IV hattan 2 saatte güvenle infüze edilir. MBL tedavisinde Aztreonam ile Y-site uyumludur; ancak diğer çoklu YBÜ infüzyonlarıyla ayrı lümen tercih edilir.',
      phRange: '5,0 – 7,5',
      osmolalityNote: '2,5 g / 100 mL SF çözeltisi fizyolojik ozmolaliteye yakındır (~330–370 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF)', '%5 Dekstroz (D5W)', 'Ringer Laktat'],
      ySiteCompatible: ['Aztreonam (MBL eşzamanlı infüzyon!)', 'Metronidazol', 'Fentanil', 'Noradrenalin', 'Vankomisin (standart kons.)', 'Heparin'],
      ySiteIncompatible: ['Amiodaron', 'Amfoterisin B', 'Midazolam (yüksek kons.)', 'Propofol', 'Kaspofungin', 'Siprofloksasin', 'Aminoglikozidler'],
      stabilityNote:
        'SF veya D5W içinde oda sıcaklığında (25°C) 12 saat, buzdolabında (2–8°C) 24 saat stabildir.',
      extravasationProtocol:
        'Vezikan değildir. Ekstravazasyonda infüzyonu durdurup ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Ağırlıklı (%80–95) renal eliminasyon — eGFR ≤50 mL/dk’da doz azaltılır; ancak ilk 48 saat dinamik ABH’de aşırı kısıtlamadan kaçının!',
      renalDetails: [
        'eGFR 31–50: 1,25 g q8sa; eGFR 16–30: 0,94 g q12sa; eGFR 6–15: 0,94 g q24sa; eGFR ≤5: 0,94 g q48sa.',
        'CRRT hastalarında eksik doz tedavi başarısızlığı ve KPC mutasyon direnciyle güçlü ilişkilidir — CRRT’de en az 1,25 g q8sa (ağır VAP/yüksek akışta 2,5 g q8sa) verilmelidir!',
      ],
      hepaticSummary: 'Karaciğer yetmezliğinde (Child-Pugh A/B/C) doz ayarı GEREKMEZ.',
      hepaticDetails: [
        'Hem seftazidim hem avibaktam hepatik metabolizmaya uğramaz.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'eGFR Dinamik Takip',
      geriatricPoints: [
        'Yaşlılarda renal fonksiyon dalgalanmasına göre doz ayarlanmalı; seftazidim birikimine bağlı ensefalopati/miyoklonus açısından nörolojik izlem yapılmalıdır.',
      ],
      obesityWeightScalarBadge: 'TBW · 2,5 g q8sa (3 sa EI)',
      obesityPoints: [
        'Morbid obezitede (≥120 kg) ve ARC’de standart 2,5 g q8sa dozunun 3 saatlik uzamış infüzyonla verilmesi hedef PK/PD olasılığını artırır.',
      ],
      clinicalNote:
        'CRRT + pnömoni (VAP) kombinasyonu Seftazidim-Avibaktam tedavi başarısızlığı ve direnç gelişimi için bilinen en güçlü klinik risk faktörüdür — tam doz/uzamış infüzyon ve yakın kültür takibi şarttır!',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte Sınırlı İnsan Verisi — Hayatı Tehdit Eden CRE Enfeksiyonunda Fayda/Risk Değerlendirmesi.',
      pregnancyDetails: [
        'Seftazidim gebelikte güvenlidir (eski FDA B); avibaktam için insan gebelik verisi sınırlıdır ancak hayvan çalışmalarında klinik dozlarda majör teratojenite göstermemiştir.',
        'Hayatı tehdit eden CRE sepsisinde kolistine kıyasla çok daha güvenli ve etkindir.',
      ],
      lactationSummary: 'Emzirme Döneminde Dikkatli Kullanım (LactMed).',
      lactationDetails: [
        'Seftazidim süte çok az geçer; avibaktamın anne sütüne geçişi bilinmemekle birlikte oral emilimi ihmal edilebilir düzeydedir.',
      ],
    },
    adverseEffects: [
      {
        title: 'Tedavi Altında Direnç Gelişimi (KPC Mutasyonları)',
        incidenceOrSeverity: '%5–10 (Yetersiz Doz / CRRT / VAP)',
        detail:
          'Özellikle CRRT’de düşük doz veya drene edilmemiş odakta KPC-2/3 Ω-loop mutasyonu ile Zavicefta direnci gelişebilir (ilginç olarak bazen Meropenem duyarlılığı geri dönebilir!).',
        tone: 'rose',
      },
      {
        title: 'Nörotoksisite (Ensefalopati / Miyoklonus / Nöbet)',
        incidenceOrSeverity: 'Renal Birikimde (Nadir)',
        detail:
          'Seftazidim bileşeninin ağır böbrek yetmezliğinde birikmesine bağlı GABA-A antagonizması.',
        tone: 'amber',
      },
      {
        title: 'Pozitif Direkt Coombs Testi & GİS (İshal / Bulantı)',
        incidenceOrSeverity: '%3–15 (Coombs) · %3–8 (İshal)',
        detail:
          'Çoğunlukla hemolizsiz pozitif Coombs testi, hafif bulantı/ishal ve C. difficile riski.',
        tone: 'indigo',
      },
      {
        title: 'Transaminaz Artışı & Hipokalemi',
        incidenceOrSeverity: '%2–5 (Geri Dönüşlü)',
        detail:
          'Hafif AST/ALT/GGT yüksekliği; rutin biyokimya takibi yeterlidir.',
        tone: 'teal',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Türkiye YBÜ’lerinde Karbapenemaz Tipi Belirleme (OXA-48 vs NDM)',
        detail:
          'Türkiye’de CRE izolatlarının büyük kısmı OXA-48 taşır (Zavicefta mükemmel!); ancak NDM (MBL) birlikteliği veya tek başına NDM artmaktadır. Hızlı lateral flow/PCR karbapenemaz testi ile MBL dışlanmadan monoterapi vermeyin; MBL varsa derhal Aztreonam ekleyin!',
      },
      {
        title: 'Aztreonam ile Eşzamanlı (Simultaneous) İnfüzyon Kuralı',
        detail:
          'MBL tedavisinde Seftazidim-Avibaktam ve Aztreonam’ı ardışık değil, AYNI 2–3 saatlik zaman diliminde eşzamanlı uygulayın — avibaktamın kanda bulunduğu anda aztreonamın da zirvede olması gerekir!',
      },
      {
        title: 'İlk 48 Saatte Geçici ABH’de Erken Doz Azaltmama',
        detail:
          'Septik şok resüsitasyonuyla ilk 24–48 saatte böbrek fonksiyonu hızla toparlayan hastalarda düşük renal dozda kalmak mortaliteyi artırır.',
      },
      {
        title: 'Komplike İntra-Abdominal Enfeksiyonda Metronidazol',
        detail:
          'Seftazidim-Avibaktam anaeroblara etkisizdir; cIAI’de mutlaka Metronidazol 500 mg IV q8sa eşlik etmelidir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'Seftazidim PBP3 Blokajı + Avibaktam Geri Dönüşlü Serin Karbamilasyonu',
        summary:
          'Avibaktam, β-laktam halkası taşımayan diazabisiklooktan (DBO) yapısıyla Sınıf A (KPC, ESBL), Sınıf C (AmpC) ve Sınıf D (OXA-48) enzimlerinin aktif serin kalıntısını geri dönüşlü karbamiller.',
        points: [
          'Klasik BLI’lerden (klavulanat/tazobaktam) farklı olarak avibaktam hidrolize uğrayıp yıkılmaz; de-karbamilasyon sonrası yeniden aktif halka formuna kapanarak başka bir β-laktamaz molekülünü bloke edebilir.',
          'Ancak Sınıf B metallo-β-laktamazlar (NDM, VIM, IMP) serin yerine aktif bölgede Zn²⁺ iyonları kullandığı için avibaktam bu enzimlere bağlanamaz.',
        ],
      },
      intracellularSignaling: {
        title: 'MBL’de Aztreonam Sinerjisi & Bakteriyel Lizis',
        summary:
          'Avibaktam serin β-laktamazları sustururken, seftazidim (veya MBL’de aztreonam) PBP3’ü bloke ederek hızlı bakteriyel filamentasyon ve ozmotik lizis oluşturur.',
        points: [
          'NDM üreten suşların >%90’ı aynı plazmidde ESBL/AmpC/OXA-48 de taşır; tek başına Aztreonam bu serin enzimlerle parçalanırken, Zavicefta+Aztreonam kombinasyonunda Avibaktam serin enzimleri kapatır ve Aztreonam MBL’yi atlayarak PBP3’ü vurur!',
          'DTR P. aeruginosa’da avibaktam aşırı eksprese kromozomal PDC (AmpC) enzimini susturarak seftazidimin etkinliğini geri kazandırır.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Akciğer & Alveoler Epitel Sıvısı (CRE-VAP)',
          tissueTarget: 'ELF Penetrasyonu %30–35',
          accent: 'violet',
          points: [
            'REPROVE çalışmasında nozokomiyal pnömonide Meropenem’e non-inferior bulunmuştur.',
            'VAP’ta bakteriyel yük yüksek olduğundan 2–3 saatlik infüzyon ve tam doz (2,5 g q8sa) direnç gelişimini önlemede kritiktir.',
          ],
        },
        {
          systemTitle: 'Renal Eliminasyon & Dinamik ABH',
          tissueTarget: 'GFR Bağımlı Klirens',
          accent: 'amber',
          points: [
            'Her iki bileşen de <%10 proteine bağlanır ve neredeyse paralel hızda glomerülden atılır.',
            'Başvuru ABH’sinde erken doz indirimi → sub-terapötik avibaktam düzeyi → tedavi başarısızlığı!',
          ],
        },
        {
          systemTitle: 'Kan Dolaşımı & Septik Şok (CRE Bakteriyemi)',
          tissueTarget: 'Kolistine Üstün Sağkalım',
          accent: 'teal',
          points: [
            'Çok merkezli gözlemsel çalışmalarda (CRACKLE vb.) KPC/OXA-48 bakteriyemisinde Seftazidim-Avibaktam, Kolistin bazlı rejimlere göre 30 günlük mortaliteyi ~%32’den ~%9–15 bandına ve ABH’yi dramatik biçimde düşürmüştür.',
          ],
        },
        {
          systemTitle: 'Santral Sinir Sistemi (BOS)',
          tissueTarget: 'CRE Menenjit / Ventrikülit',
          accent: 'sky',
          points: [
            'İnflamasyonlu meninkslere serum düzeyinin %30–38’i oranında geçer; CRE post-nöroşirürji menenjitte 2,5 g q8sa başarılı olgu serilerine sahiptir.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Avibaktam Eşik Konsantrasyonu (%fT>CT) & Direnç Eşiği',
        summary:
          'Seftazidimin etkinliği kadar avibaktamın kritik eşik konsantrasyonunun (CT ≈ 1 mg/L) üzerinde kalma süresi (%fT>CT) de tedavinin başarısını belirler.',
        points: [
          'KPC/OXA-48 CRE enfeksiyonlarında Seftazidim-Avibaktam monoterapisi IDSA 2024 tarafından önerilir — rutin kolistin veya aminoglikozid eklenmesi mortaliteyi azaltmaz ama nefrotoksisiteyi artırır!',
          'Tek istisna: MBL (NDM/VIM/IMP) varlığında mutlaka Aztreonam ile eşzamanlı kombinasyon yapılır.',
        ],
      },
      clinicalPearls: [
        'KPC veya OXA-48 üreten CRE’de Zavicefta’nın yanına "güçlensin diye" rutin Kolistin EKLEMEYİN — kanıtlı yararı yok, sadece ABH ekler!',
        'MBL (NDM/VIM) pozitif geldiği anda Zavicefta + Aztreonam 2 g q8sa EŞZAMANLI infüzyona geçin.',
        '2,5 g flakon 10 mL su ile sulandırılınca toplam hacim 12 mL olur; yarım doz (1,25 g) için 6 mL çekin!',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Seftazidim-Avibaktam',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Probenesid (OAT1/OAT3 İnhibitörleri)',
          mechanism: 'Avibaktamın aktif renal tübüler sekresyonunun %56–70 blokajı',
          clinicalEffect: 'Avibaktam klirensi belirgin azalır ve öngörülemeyen plazma birikimi oluşur.',
          management: 'Probenesid ile eşzamanlı kullanımdan kaçının.',
        },
        {
          severity: 'C',
          agent: 'Nefrotoksik Ajanlar (Kolistin / Aminoglikozidler / Yüksek Doz Loop Diüretik)',
          mechanism: 'Renal klirens düşüşü → seftazidim/avibaktam birikimi ve aditif ABH',
          clinicalEffect: 'Böbrek fonksiyon bozukluğu ve ikincil seftazidim nörotoksisitesi.',
          management: 'KPC/OXA-48’de rutin kolistin/aminoglikozid kombinasyonundan kaçının; eGFR’yi günlük izleyin.',
        },
        {
          severity: 'C',
          agent: 'Kloramfenikol',
          mechanism: 'Bakteriyostatik-bakterisidal farmakodinamik antagonizma',
          clinicalEffect: 'İn vitro antagonizma.',
          management: 'Birlikte kullanmayın.',
        },
      ],
      references: [
        {
          authors: 'Tamma PD, Heil EL, Justo JA, Mathers AJ, Satlin MJ, Bonomo RA.',
          title: 'Infectious Diseases Society of America 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections',
          journal: 'Clin Infect Dis',
          year: 2024,
          note: 'KPC/OXA-48 CRE ve DTR P. aeruginosa’da 1. basamak, MBL CRE’de Aztreonam ile eşzamanlı kombinasyon temel kılavuzu.',
        },
        {
          authors: 'Torres A, Zhong N, Pachl J, et al. (REPROVE Study).',
          title: 'Ceftazidime-avibactam versus meropenem in nosocomial pneumonia, including ventilator-associated pneumonia (REPROVE): a randomised, double-blind, phase 3 non-inferiority trial',
          journal: 'Lancet Infect Dis',
          year: 2018,
          note: 'VAP/HAP’ta 2,5 g q8sa 2 saatlik infüzyonun Meropenem’e non-inferior etkinliğini kanıtlayan Faz 3 çalışma.',
        },
        {
          authors: 'van Duin D, Lok JJ, Earley M, et al. (CRACKLE Investigators).',
          title: 'Colistin Versus Ceftazidime-Avibactam in the Treatment of Infections Due to Carbapenem-Resistant Enterobacteriaceae',
          journal: 'Clin Infect Dis',
          year: 2018,
          note: 'CRE enfeksiyonlarında Seftazidim-Avibaktam’ın Kolistine kıyasla mortaliteyi dramatik azalttığını gösteren çok merkezli çalışma.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/avibactam-ceftazidime.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 8. SULBAKTAM (YÜKSEK DOZ CRAB KURTARMA / SULBAKTAM-DURLOBAKTAM BAĞLAMI)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'sulbactam',
    classTag: 'carbapenem_blbli',
    accentColor: 'purple',
    atcCode: 'J01CG01',
    classLabel: 'İntrinsik Anti-Acinetobacter PBP1/3 İnhibitörü · CRAB Omurgası',
    tradeNamesTr:
      'Xacduro® (Sulbaktam-Durlobaktam · İthal) · TR YBÜ Pratiği: Alfasid®/Combicid® 3 g (= 1 g Sulbaktam) · Sulperazon® 1g/1g (= 1 g Sulbaktam)',
    title: 'Sulbaktam (Yüksek Doz CRAB & Sulbaktam-Durlobaktam) Monografisi',
    cardTitle: 'Sulbaktam (CRAB Omurgası)',
    cardBadge: 'IDSA 2024 CRAB · 6–9 g/gün Sulbaktam',
    cardCategoryLabel: 'CRAB Kurtarma · PBP1/3 İnhibitörü',
    cardShortDesc:
      'Acinetobacter baumannii PBP1/PBP3’üne doğrudan intrinsik bakterisidal etkili tek klasik BLI! IDSA 2024 CRAB: erişim varsa Sulbaktam-Durlobaktam; TR YBÜ’de Ampisilin-Sulbaktam üzerinden 6–9 g/gün SULBAKTAM (4 sa EI).',
    cardHighlights: [
      {
        label: 'IDSA 2024 CRAB 1. Tercih',
        value: 'Sulb-Durlo (Xacduro®)',
        subtext: '1 g/1 g q6sa (3 sa EI) + Karbapenem',
        colorClass: 'text-purple-700 dark:text-purple-300',
        bgClass: 'bg-purple-500/10',
        borderClass: 'border-purple-500/30',
      },
      {
        label: 'TR YBÜ Yüksek Doz Hedefi',
        value: '6–9 g/gün SULBAKTAM',
        subtext: '9 g Amp-Sulb q8sa (4 sa EI) = 9 g Sulb!',
        colorClass: 'text-teal-700 dark:text-teal-300',
        bgClass: 'bg-teal-500/10',
        borderClass: 'border-teal-500/30',
      },
      {
        label: 'Formülasyon Tuzağı!',
        value: 'Sulperazon® ≠ 9 g!',
        subtext: 'Sefoperazon MTT → K-vit koagülopatisi!',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
    ],
    aliases: ['sulbaktam', 'sulbactam', 'xacduro', 'sulbaktam durlobaktam', 'sulperazon', 'crab'],
    searchKeywords: [
      'sulbaktam',
      'sulbactam',
      'xacduro',
      'durlobaktam',
      'crab',
      'acinetobacter',
      'sulperazon',
      'sefoperazon sulbaktam',
      'pbp1',
      'pbp3',
      '9 g sulbaktam',
    ],
    highAlert: {
      tallManName: 'SULBACTAM (CRAB Yüksek Doz)',
      confusionRiskWith: 'ampicillin-sulbactam toplam gramı · cefoperazone-sulbactam',
      criticalAlerts: [
        'SULBAKTAM GRAMI ≠ AMPİSİLİN-SULBAKTAM TOPLAM GRAMI (3× DOZ HATASI!): 3 g Ampisilin-Sulbaktam flakonunda YALNIZCA 1 g SULBAKTAM bulunur! IDSA 2024 hedefi "6–9 g/gün SULBAKTAM"dır → bunun için günde 18–27 g TOPLAM Ampisilin-Sulbaktam (3 g q4sa = 6 g sulbaktam VEYA 9 g q8sa 4 sa EI = 9 g sulbaktam) gerekir!',
        'SEFOPERAZON-SULBAKTAM (SULPERAZON® 1g/1g) İLE 9 g/gün SULBAKTAM VERMEYİN (KOAGÜLOPATİ!): Sulperazon 1:1 oranında 1 g sulbaktam içerir; ancak eşlik eden Sefoperazon N-metiltiotetrazol (MTT) yan zinciri taşır ve >4–6 g/gün Sefoperazon dozlarında şiddetli K-vitamini bağımlı koagülopati (INR↑, ciddi kanama) ile hepatotoksisite yapar! 6–9 g/gün sulbaktam için Ampisilin-Sulbaktam (veya erişim varsa Sulbaktam-Durlobaktam) tercih edin!',
        'SULBAKTAM-DURLOBAKTAM (XACDURO®) VS YÜKSEK DOZ AMP-SULB: IDSA 2024 kılavuzu CRAB’da 1. tercih olarak Sulbaktam-Durlobaktam (1 g/1 g q6sa 3 sa EI + Meropenem/İmipenem) önerir (ATTACK Trial Lancet Infect Dis 2023: Kolistine göre %19 vs %32 mortalite!). Xacduro erişimi yoksa yüksek doz sulbaktam (6–9 g/gün) + en az bir aktif ajan (Polimiksin/Minosiklin/Tigesiklin/Sefiderokol) kullanılır!',
        '9 g AMP-SULB q8sa REJİMİNDE ~90 mEq/gün Na⁺ YÜKÜ & D5W GEÇİMSİZLİĞİ: 4 saatlik uzamış infüzyon MUTLAKA %0,9 NaCl ile hazırlanmalı ve günlük serum Na⁺/sıvı dengesi izlenmelidir!',
      ],
      antidoteOrRescue:
        'Yüksek doz sulbaktam/ampisilin birikimine bağlı nöbet gelişirse ilacı kesin, benzodiazepin uygulayın ve hemodiyaliz değerlendirin. Sefoperazon-sulbaktam üzerinden uygulandıysa ve INR uzaması/kanama geliştiyse derhal 10 mg IV K1 Vitamini (Fitomenadion) uygulayın ve Ampisilin-Sulbaktam’a geçin.',
    },
    identitySummary:
      'Sulbaktam, klasik sınıf A β-laktamaz inhibitörü olmasının ötesinde Acinetobacter baumannii’nin PBP1 ve PBP3 proteinlerine doğrudan yüksek afiniteyle bağlanabilen ve bu nedenle intrinsik bakterisidal anti-Acinetobacter aktivite gösteren eşsiz bir moleküldür. Türkiye YBÜ’lerinde mortalitesi %40–60’a ulaşan karbapenem-dirençli Acinetobacter baumannii (CRAB) enfeksiyonlarının hem uluslararası (Sulbaktam-Durlobaktam / Xacduro®) hem ulusal (yüksek doz Ampisilin-Sulbaktam: 6–9 g/gün sulbaktam) temel omurgasıdır.',
    spectrumHighlights: [
      {
        title: 'Hedef Patojen: CRAB (Acinetobacter baumannii)',
        detail:
          'PBP1a/1b ve PBP3’e doğrudan bağlanarak Acinetobacter’i öldürür. Durlobaktam (Xacduro®) eklendiğinde CRAB’ın OXA-23/24/58 ve ADC β-laktamazları bloke edilerek sulbaktam MIC’si 32–64 kat düşürülür!',
        tone: 'emerald',
      },
      {
        title: 'Türkiye YBÜ Pratiği: 6–9 g/gün Sulbaktam + Kombinasyon',
        detail:
          'Xacduro® erişimi olmadığında IDSA 2024: Ampisilin-Sulbaktam 9 g q8sa (4 saat EI = 9 g/gün sulbaktam) veya 3 g q4sa (6 g/gün sulbaktam) + ikinci aktif ajan (Polimiksin B/Kolistin, Tigesiklin veya Minosiklin).',
        tone: 'amber',
      },
      {
        title: 'Diğer MDR Gram-Negatiflere Tek Başına Etkisiz',
        detail:
          'Sulbaktamın P. aeruginosa, CRE (KPC/OXA-48/NDM Klebsiella) veya MRSA üzerine intrinsik bakterisidal aktivitesi YOKTUR — yalnızca CRAB kurtarma stratejisi olarak konumlandırılır.',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Sulbaktam (penisilanik asit sülfon), diğer β-laktamaz inhibitörlerinden (klavulanat, tazobaktam) yapısal olarak farklı biçimde Acinetobacter spp.’nin hücre duvarı sentezinden sorumlu PBP1a, PBP1b ve PBP3 enzimlerini doğrudan açiller. CRAB suşlarında yüksek ekspresyonlu OXA-23/24/58 ve ADC (AmpC) enzimleri sulbaktamı kısmen parçaladığından, ya yüksek doz + 4 saat uzamış infüzyon (6–9 g/gün sulbaktam) ile enzimler doyurulur ya da yeni nesil DBO inhibitörü Durlobaktam ile bu enzimler doğrudan susturulur.',
    mechanismPillars: [
      {
        title: 'Doğrudan Acinetobacter PBP1 & PBP3 Açilasyonu',
        detail:
          'Acinetobacter baumannii tedavisinde Ampisilin-Sulbaktam’daki ampisilin bir "seyirci" moleküldür; gerçek bakterisidal ajan sulbaktamın kendisidir (bu yüzden tüm doz hesabı SULBAKTAM gramı üzerinden yapılır!).',
      },
      {
        title: 'Yüksek Doz (6–9 g/gün) + 4 Saat EI ile Direnç Aşımı',
        detail:
          'In vitro olarak Ampisilin-Sulbaktam’a "dirençli" raporlanan CRAB suşlarında (sulbaktam MIC 8–32 mcg/mL) dahi 9 g/gün sulbaktam 4 saatlik uzamış infüzyonla PBP doygunluğu sağlanır (IDSA 2024!).',
      },
      {
        title: 'Durlobaktam ile OXA-23/24/58 & ADC Blokajı (Xacduro®)',
        detail:
          'Durlobaktam geniş spektrumlu DBO inhibitörü olarak Acinetobacter’in tüm OXA-tipi karbapenemazlarını (OXA-23, OXA-24/40, OXA-58) bloke eder ve sulbaktamın PBP1/3’e engelsiz ulaşmasını sağlar (ATTACK 2023).',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '1,0 – 1,3 saat',
        detail: 'Hem sulbaktam hem durlobaktam kısa t½’ye sahiptir → 3–4 saatlik uzamış infüzyon zorunludur.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%38 (Durlobaktam %10)',
        detail: 'Yüksek serbest fraksiyon sayesinde akciğer ELF’sine (%50–60) iyi geçiş sağlar.',
      },
      {
        label: 'Akciğer (ELF) Geçişi',
        value: '~%50 – 60 ELF',
        detail: 'CRAB-VAP’ta yüksek doz sulbaktamın (9 g/gün, 4 sa EI) kolistine kıyasla üstün akciğer penetrasyonu en önemli klinik avantajıdır.',
      },
      {
        label: 'Eliminasyon',
        value: '%75 – 85 Renal',
        detail: 'Glomerüler filtrasyon + OAT tübüler sekresyonla atılır; eGFR <30 mL/dk’da (Xacduro’da <45 mL/dk’da) doz ayarlanır.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Sulbaktam veya kombinasyon partneri β-laktama (Ampisilin / Sefoperazon) karşı belgelenmiş ağır IgE-aracılı anafilaksi öyküsü.',
        'Şiddetli gecikmiş kütanöz reaksiyon (SJS/TEN/DRESS/AGEP) öyküsü.',
      ],
      relativeItems: [
        'Ağır hipernatremi (>150 mEq/L) veya dekompanse kalp yetmezliği (Ampisilin-Sulbaktam 9 g q8sa rejiminde günde ~90 mEq Na⁺ yükü!).',
        'Aktif kanama diyatezi, ağır karaciğer yetmezliği veya yüksek INR (eğer Sefoperazon-Sulbaktam [Sulperazon®] üzerinden uygulanıyorsa MTT yan zincirine bağlı K-vitamini eksikliği koagülopatisi!).',
        'CRAB tedavisinde yüksek doz sulbaktamın tek başına (monoterapi) kullanılması — IDSA 2024 kombinasyon önerir!',
      ],
      clinicalNote:
        'IDSA 2024 Kuralı: CRAB izolatı antibiyogramda Ampisilin-Sulbaktam’a "Dirençli (R)" raporlansa bile, Sulbaktam-Durlobaktam erişimi yoksa yüksek doz sulbaktam (6–9 g/gün) kombinasyon rejiminin temel bileşeni olmaya devam eder!',
    },
    regimenCards: [
      {
        title: 'IDSA 2024 CRAB 1. Tercih: Sulbaktam-Durlobaktam (Xacduro®)',
        setting: 'icu',
        badge: 'ATTACK 2023 · 1. Tercih',
        dose: '1 g Sulb + 1 g Durlo',
        infusionDuration: '3 saat (EI)',
        interval: 'q6sa (4 g Sulb/gün)',
        note: 'IDSA 2024 kılavuzu: Meropenem (1 g q8sa 3 sa EI) veya İmipenem-Silastatin ile kombine olarak verilir (ek PBP2 doygunluğu ve polimikrobiyal kapsama için).',
      },
      {
        title: 'TR YBÜ CRAB Maksimum Doz (Ampisilin-Sulbaktam 9 g q8sa)',
        setting: 'icu',
        badge: '9 g/gün SULBAKTAM · 4 sa EI',
        dose: '3 g Sulbaktam (= 9 g Amp-Sulb)',
        infusionDuration: '4 saat (EI · SF!)',
        interval: 'q8sa (9 g Sulb/gün)',
        note: 'Xacduro erişimi olmadığında Türkiye YBÜ standardı! 3 adet 3 g Amp-Sulb flakon 250 mL %0,9 NaCl içinde 4 saatte infüze edilir (62,5 mL/saat). Mutlaka Polimiksin B/Kolistin, Minosiklin veya Tigesiklin ile kombine edin!',
      },
      {
        title: 'TR YBÜ CRAB Alternatif (Ampisilin-Sulbaktam 3 g q4sa)',
        setting: 'icu',
        badge: '6 g/gün SULBAKTAM',
        dose: '1 g Sulbaktam (= 3 g Amp-Sulb)',
        infusionDuration: '1–3 saat IV',
        interval: 'q4sa (6 g Sulb/gün)',
        note: 'Toplam 18 g/gün Ampisilin-Sulbaktam (= 6 g/gün sulbaktam). Günlük Na⁺ yükü ~60 mEq; ikinci aktif anti-CRAB ajan ile kombine edilir.',
      },
      {
        title: 'Sefoperazon-Sulbaktam (Sulperazon® 1g/1g) Kullanım Notu',
        setting: 'special',
        badge: 'K-Vitamini / INR Uyarısı!',
        dose: '2 g Sulb (= 4 g Sulperazon) q8–12sa',
        infusionDuration: '1–3 saat IV',
        interval: 'Maks 4–6 g Sulb/gün',
        note: 'Sefoperazon’un MTT yan zinciri >4–6 g/gün dozlarda ciddi INR uzaması ve kanama yaptığından 9 g/gün sulbaktam hedefi için Sulperazon ÖNERİLMEZ! Kullanılırsa haftalık profilaktik IV K1 vitamini (10 mg) ve günlük INR izlemi gerekir.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Sabit yüksek doz sulbaktam (6–9 g/gün; Xacduro’da 4 g/gün sulbaktam + 4 g/gün durlobaktam) uygulanır. Morbid obezitede ve ARC’de (eGFR ≥130 mL/dk) 9 g/gün sulbaktam 4 saatlik EI (veya Xacduro’da q4sa: 6 g/gün!) önerilir.',
      perioperative: {
        applicable: false,
        summaryTitle: 'Yüksek Doz CRAB Kurtarma Ajanı — Rutin Cerrahi Profilakside Kullanılmaz!',
        timingWindow: 'Uygulanmaz (Rutin Profilaksi Dışı)',
        standardDoseLabel: 'Cerrahi profilaksi için Ampisilin-Sulbaktam monografisine (3 g q2sa) bakınız',
        adultStandardDoseMg: 3000,
        infusionTimeText: '3–4 saat EI',
        clinicalNote:
          'Rutin cerrahi profilaksi için standart doz Ampisilin-Sulbaktam (3 g IV q2sa) veya Sefazolin (2–3 g IV q4sa) kullanılır; 6–9 g/gün yüksek doz sulbaktam veya Sulbaktam-Durlobaktam yalnızca kanıtlanmış/şüpheli CRAB enfeksiyonlarına ayrılmıştır.',
        nonProphylaxisReason:
          'Yüksek doz sulbaktam (6–9 g/gün) ve Sulbaktam-Durlobaktam (Xacduro®), yoğun bakım ünitelerinde karbapenem-dirençli Acinetobacter baumannii (CRAB) kurtarma tedavisi için tasarlanmış rezerv rejimlerdir. Rutin cerrahi profilakside kullanılması aşırı sodyum yükü, direnç seçilimi ve toksisite yaratır.',
      },
      icu: {
        pkPdTarget: 'Sulbaktam serbest %fT>MIC ≥ %60 (CRAB’da 6–9 g/gün sulbaktam 4 saat EI; Xacduro’da 3 saat EI)',
        pkPdBadge: 'SULBAKTAM %fT>MIC · CRAB',
        loadingDoseLabel: '3 g Sulbaktam (= 9 g Amp-Sulb 4 sa EI) veya Xacduro 1 g/1 g (3 sa EI)',
        loadingFixedMg: 3000,
        loadingUnit: 'mg',
        loadingInfusionText: 'Not: Aşağıdaki hesaplama doğrudan AKTİF SULBAKTAM dozunu (mg/gün) ve eşdeğer flakon sayısını gösterir!',
        maintenanceLabel: 'Aktif SULBAKTAM Rejimi Seçimi (mg Sulbaktam bazlı)',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'sulb_9g_ampsulb',
            label: 'TR YBÜ Maks CRAB: 3 g Sulbaktam q8sa (= 9 g Amp-Sulb · 4 sa EI)',
            singleDoseMg: 3000,
            intervalHours: 8,
            infusionHours: 4,
            diluentVolumeMl: 250,
            note: '9 g/gün SULBAKTAM (= 27 g/gün Amp-Sulb = günde 9 adet 3 g flakon). Her doz 250 mL %0,9 NaCl içinde 62,5 mL/saat (4 saat EI). Na⁺ yükü ~90 mEq/gün!',
          },
          {
            id: 'sulb_6g_ampsulb',
            label: 'TR YBÜ Yüksek Doz CRAB: 1 g Sulbaktam q4sa (= 3 g Amp-Sulb)',
            singleDoseMg: 1000,
            intervalHours: 4,
            infusionHours: 1,
            diluentVolumeMl: 100,
            note: '6 g/gün SULBAKTAM (= 18 g/gün Amp-Sulb = günde 6 adet 3 g flakon). Her doz 100 mL %0,9 NaCl içinde 100 mL/saat (1 saat). Na⁺ yükü ~60 mEq/gün.',
          },
          {
            id: 'xacduro_4g',
            label: 'IDSA 2024 1. Tercih: Sulbaktam-Durlobaktam 1 g/1 g q6sa (3 sa EI)',
            singleDoseMg: 1000,
            intervalHours: 6,
            infusionHours: 3,
            diluentVolumeMl: 100,
            note: '4 g/gün SULBAKTAM + 4 g/gün DURLOBAKTAM (Xacduro®). 100 mL SF içinde 33,3 mL/saat (3 saat EI) + Meropenem/İmipenem ile kombine! ARC (eGFR ≥130)’da q4sa (6 g/gün).',
          },
        ],
        specialConversionNote:
          'FLAKON EŞDEĞERLİK TABLOSU: 1 g Aktif SULBAKTAM = 1 adet 3 g Ampisilin-Sulbaktam (2 g Amp + 1 g Sulb) = 1 adet 2 g Sulperazon (1 g Sefoperazon + 1 g Sulb) = 1 doz Xacduro (1 g Sulb + 1 g Durlo). Hesaplayıcıdaki mg değeri doğrudan SULBAKTAM miktarıdır!',
      },
      renalTiers: [
        {
          id: 'egfr_arc',
          label: 'ARC (Hiperdinamik)',
          egfrRange: 'eGFR ≥ 130 mL/dk',
          recommendation: 'Maksimum Doz!',
          doseText: 'Amp-Sulb: 9 g q8sa (9 g Sulb/gün) | Xacduro: 1 g/1 g q4sa (6 g Sulb/gün)',
          note: 'Hiperdinamik genç travma/yanık/YBÜ hastalarında Xacduro’nun FDA onaylı ARC dozu q4sa’dır!',
          tone: 'sky',
        },
        {
          id: 'egfr_45_129',
          label: 'Normal / Hafif KBH',
          egfrRange: 'eGFR 45–129 mL/dk',
          recommendation: 'Tam CRAB Dozu',
          doseText: 'Amp-Sulb: 9 g q8sa (9 g Sulb/gün) | Xacduro: 1 g/1 g q6sa (4 g Sulb/gün)',
          note: 'İkinci aktif anti-CRAB ajanla (Xacduro’da karbapenem; Amp-Sulb’da Polimiksin/Minosiklin/Tigesiklin) kombine edilir.',
          tone: 'emerald',
        },
        {
          id: 'egfr_30_44',
          label: 'Orta KBH / ABH',
          egfrRange: 'eGFR 30–44 mL/dk',
          recommendation: 'Xacduro q8sa · Amp-Sulb 6 g Sulb',
          doseText: 'Amp-Sulb: 3 g q4–6sa (4–6 g Sulb/gün) | Xacduro: 1 g/1 g q8sa (3 sa EI)',
          note: 'Sulbaktam birikimi nöbet eşiğini düşürür; günlük eGFR ve serum Na⁺ izlenir.',
          tone: 'amber',
        },
        {
          id: 'egfr_15_29',
          label: 'İleri KBH',
          egfrRange: 'eGFR 15–29 mL/dk',
          recommendation: 'q12sa',
          doseText: 'Amp-Sulb: 3 g q6–8sa veya 6 g q12sa (3–4 g Sulb/gün) | Xacduro: 1 g/1 g q12sa',
          note: 'CRAB ölümcül olduğundan aşırı doz kısıtlamasından kaçının ama nörotoksisite izleyin.',
          tone: 'amber',
        },
        {
          id: 'egfr_lt15',
          label: 'Ağır KBY (Diyalizsiz)',
          egfrRange: 'eGFR < 15 mL/dk',
          recommendation: 'q12–24sa',
          doseText: 'Amp-Sulb: 3 g q12sa (2 g Sulb/gün) | Xacduro: 1 g/1 g q24sa (ilk 24 sa q12sa)',
          note: 'Hemodiyaliz gününde doz seans sonrasına zamanlanır.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHD/CVVHDF): Ampisilin-Sulbaktam: 3 g q4–6sa veya 6 g q8sa 4 saat EI (= 4–6 g/gün sulbaktam). Sulbaktam-Durlobaktam (Xacduro®): yüksek eflüentte (≥30 mL/kg/saat) 1 g/1 g q6–8sa (3 saat EI) önerilir.',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Hem sulbaktam hem durlobaktam hemodiyalizle uzaklaştırılır. Amp-Sulb: 3 g q12sa + HD sonrası ek 3 g; Xacduro®: 1 g/1 g q24sa (HD gününde seans sonrası).',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Alfasid® / Combicid® 3 g IV Flakon (TR YBÜ CRAB Ana Kaynağı)',
          presentation: '2 g ampisilin + 1 g sulbaktam (2:1) toz flakon',
          concentration: '1 g SULBAKTAM / flakon (~10 mEq Na⁺)',
          saltOrBaseNote: '9 g/gün sulbaktam için günde 9 adet 3 g flakon gerekir (3×3 g q8sa 4 saat EI, %0,9 NaCl ile!).',
          alertLevel: 'high',
        },
        {
          name: 'Sulperazon® / Sefobakt® 2 g IV Flakon (1 g Sefoperazon + 1 g Sulbaktam)',
          presentation: '1 g sefoperazon + 1 g sulbaktam (1:1) toz flakon',
          concentration: '1 g SULBAKTAM / flakon (MTT Zincirli!)',
          saltOrBaseNote: 'Sefoperazon’un MTT yan zinciri yüksek dozlarda (>4–6 g/gün) K-vitamini antagonizması ve ciddi INR/kanama yapar — 9 g/gün sulbaktam için kullanmayın!',
          alertLevel: 'high',
        },
        {
          name: 'Xacduro® (Sulbaktam-Durlobaktam 1 g / 1 g — İthal / Yurtdışı İlaç)',
          presentation: '1 adet 1 g sulbaktam flakonu + 2 adet 0,5 g durlobaktam flakonu kombi paket',
          concentration: '1 g Sulbaktam + 1 g Durlobaktam / doz',
          saltOrBaseNote: 'IDSA 2024 CRAB 1. tercih; Türkiye’de özel/yurtdışı ilaç temin prosedürü kapsamındadır.',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        'Ampisilin-Sulbaktam 9 g (= 3 g Sulbaktam) 4 Saat EI: 3 adet 3 g flakon 250 mL %0,9 NaCl içinde (36 mg/mL) 62,5 mL/saat hızla 4 saatte infüze edilir (D5W YASAK!).',
        'Xacduro® (1 g/1 g) 3 Saat EI: Sulbaktam ve Durlobaktam flakonları sulandırılıp 100 mL %0,9 NaCl torbasında birleştirilir → 33,3 mL/saat hızla 3 saatte infüze edilir.',
      ],
      concentrationTrapWarning:
        'Order’a sadece "Sulbaktam 3 g q8sa" yazmak hemşirelikte "3 g Ampisilin-Sulbaktam (= sadece 1 g sulbaktam!)" olarak yanlış anlaşılıp 3 KAT EKSİK DOZ verilmesine yol açar — her zaman hem flakon hem aktif sulbaktam miktarını açıkça yazın!',
    },
    compatibility: {
      accessRequirement: 'central-preferred',
      accessSummary:
        'Yüksek doz CRAB rejimleri (9 g Amp-Sulb / 250 mL 4 saat EI) alkali pH (8–10) ve yüksek ozmolalite nedeniyle santral venöz lümen tercih eder; Xacduro® periferik veya santralden 3 saatte verilebilir.',
      phRange: 'Amp-Sulb: 8,0–10,0 · Xacduro: ~6,5–7,5',
      osmolalityNote: '9 g Amp-Sulb / 250 mL SF hiperozmolar (~480–520 mOsm/kg) ve alkalidir.',
      compatibleDiluents: ['%0,9 NaCl (SF — ZORUNLU 1. tercih!)', 'Enjeksiyonluk Su (rekonstitüsyon)'],
      ySiteCompatible: ['Meropenem (Xacduro ile ayrı veya uyumlu kontrol)', 'Fentanil', 'Heparin', 'İnsülin', 'Potasyum klorür'],
      ySiteIncompatible: ['%5 Dekstroz (4 saat EI’de hızlı ampisilin yıkımı!)', 'Aminoglikozidler (Amikasin/Gentamisin)', 'Amiodaron', 'Siprofloksasin', 'Dobutamin', 'Kaspofungin'],
      stabilityNote:
        'Ampisilin-Sulbaktam %0,9 NaCl içinde 8 saat (D5W’de yalnızca 2 saat!) stabildir. Xacduro® %0,9 NaCl içinde oda sıcaklığında 6 saat stabildir.',
      extravasationProtocol:
        'Alkali pH nedeniyle ekstravazasyonda infüzyonu durdurup aspire edin, ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Sulbaktam ve durlobaktam ağırlıklı (%75–85) renal atılır — eGFR <30–45 mL/dk’da doz aralığı uzatılır; ARC’de (eGFR ≥130) doz artırılır!',
      renalDetails: [
        'Yüksek doz Amp-Sulb CRAB: eGFR ≥30 → 9 g q8sa (9 g Sulb/gün); eGFR 15–29 → 3–4 g Sulb/gün; eGFR <15 → 2 g Sulb/gün.',
        'Xacduro®: eGFR ≥130 → 1 g/1 g q4sa; eGFR 45–129 → q6sa; eGFR 30–44 → q8sa; eGFR 15–29 → q12sa; eGFR <15 → q24sa.',
      ],
      hepaticSummary: 'Sulbaktam ve durlobaktam için hepatik doz ayarı GEREKMEZ; ancak Sefoperazon-Sulbaktam (Sulperazon®) kullanılıyorsa karaciğer yetmezliğinde Sefoperazon birikir!',
      hepaticDetails: [
        'Sefoperazon %75 biliyer atıldığı için kolestaz/sirozda birikerek K-vitamini koagülopatisini (INR↑) ağırlaştırır.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Na⁺ & eGFR İzle',
      geriatricPoints: [
        'Yaşlı CRAB hastalarında 9 g Amp-Sulb q8sa (~90 mEq Na⁺/gün) kalp yetmezliği ve hipernatremiyi hızla alevlendirebilir — sık elektrolit ve volüm takibi gerekir.',
      ],
      obesityWeightScalarBadge: 'TBW · 9 g/gün Sulbaktam',
      obesityPoints: [
        'Obez YBÜ hastalarında (VKİ ≥40 kg/m²) 6 g/gün yerine tam 9 g/gün sulbaktam (4 saat EI) tercih edilmelidir.',
      ],
      clinicalNote:
        'CRAB-VAP mortalitesi %40–60’tır; yaşlı veya böbrek yetmezlikli hastada dahi ilk 24–48 saatte yükleme ve yeterli sulbaktam maruziyetinden ödün verilmemelidir.',
    },
    pregnancyLactation: {
      pregnancySummary: 'Ampisilin-Sulbaktam Gebelikte Güvenli (Eski FDA B); Sulbaktam-Durlobaktam İçin İnsan Verisi Sınırlıdır.',
      pregnancyDetails: [
        'Hayatı tehdit eden CRAB sepsisinde yüksek doz Ampisilin-Sulbaktam gebelikte güvenle uygulanabilir.',
      ],
      lactationSummary: 'Sulbaktam Emzirme ile Uyumlu (Durlobaktam Verisi Sınırlı).',
      lactationDetails: [
        'Sulbaktam anne sütüne çok düşük düzeyde geçer.',
      ],
    },
    adverseEffects: [
      {
        title: 'Ağır Hipernatremi & Sıvı Yüklenmesi (Amp-Sulb 9 g q8sa)',
        incidenceOrSeverity: 'Yüksek Dozda Sık (%15–30)',
        detail:
          'Günde ~90 mEq Na⁺ yükü hipernatremi, ödem ve ARDS oksijenasyon bozulmasına yol açabilir.',
        tone: 'amber',
      },
      {
        title: 'Koagülopati / INR Uzaması (YALNIZCA Sulperazon® Kullanılırsa!)',
        incidenceOrSeverity: 'Yüksek Doz Sefoperazonda %10–25',
        detail:
          'Sefoperazon’un MTT yan zinciri hepatik K-vitamini epoksit redüktazı inhibe ederek ciddi kanamaya yol açar; Amp-Sulb ve Xacduro’da bu risk YOKTUR.',
        tone: 'rose',
      },
      {
        title: 'Nörotoksisite / Nöbet (Renal Birikimde)',
        incidenceOrSeverity: 'Nadir (eGFR <15’te)',
        detail:
          '27 g/gün Ampisilin-Sulbaktam dozunun ABH gelişiminde ayarlanmaması miyoklonus ve jeneralize nöbet tetikler.',
        tone: 'rose',
      },
      {
        title: 'Kolistine Kıyasla Belirgin Düşük Nefrotoksisite (ATTACK 2023)',
        incidenceOrSeverity: 'ABH %13 (Xacduro) vs %38 (Kolistin)',
        detail:
          'ATTACK çalışmasında Sulbaktam-Durlobaktam hem mortaliteyi (%19 vs %32) hem ABH insidansını (%13 vs %38) kolistine kıyasla anlamlı düşürmüştür.',
        tone: 'teal',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'IDSA 2024 CRAB Kombinasyon Zorunluluğu',
        detail:
          'Sulbaktam-Durlobaktam (Xacduro®) kullanıldığında bile Meropenem veya İmipenem ile kombine önerilir; Xacduro yokken yüksek doz Ampisilin-Sulbaktam (6–9 g/gün sulbaktam) mutlaka Polimiksin B/Kolistin, Minosiklin, Tigesiklin veya Sefiderokol ile kombine edilmelidir.',
      },
      {
        title: 'Antibiyogramda "Ampisilin-Sulbaktam Dirençli" Yazsa Bile!',
        detail:
          'Standart disk/MIC testleri düşük sulbaktam dozunu baz alır; yüksek doz (9 g/gün, 4 saat EI) ile MIC 8–32 mcg/mL CRAB suşlarında dahi klinik etkinlik elde edildiğinden IDSA 2024 yüksek doz sulbaktamı önermeye devam eder.',
      },
      {
        title: 'Sefoperazon-Sulbaktam (Sulperazon®) ile K1 Vitamini Kuralı',
        detail:
          'Eğer klinik zorunlulukla Sulperazon kullanılıyorsa günlük sefoperazon 4–6 g’ı geçmemeli, INR düzenli izlenmeli ve haftada 1–2 kez 10 mg IV K1 vitamini eklenmelidir.',
      },
      {
        title: 'Acinetobacter Kolonizasyonu vs Gerçek Enfeksiyon Ayrımı',
        detail:
          'Trakeal aspiratta üreyen her CRAB enfeksiyon değildir; gereksiz yüksek doz kurtarma tedavisi toksisiteyi artırır — klinik/radyolojik VAP veya bakteriyemi kriterlerini doğrulayın.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: 'Acinetobacter PBP1a/1b & PBP3 Seçici İntrinsik Bağlanması',
        summary:
          'Sulbaktam, Acinetobacter baumannii’nin PBP1 ve PBP3 transpeptidazlarına yüksek afinite gösteren tek klasik β-laktamaz inhibitörüdür.',
        points: [
          'Klasik olarak β-laktam ortağına (ampisilin) yardımcı olmak için geliştirilmiş olsa da Acinetobacter’de PBP1/3’ü doğrudan açilleyerek primer antibiyotik gibi davranır.',
          'Durlobaktam ise sınıf A, C (ADC) ve özellikle Acinetobacter’e özgü sınıf D (OXA-23, OXA-24/40, OXA-58) karbapenemazları nanomolar düzeyde inhibe ederek sulbaktamı parçalanmaktan kurtarır.',
        ],
      },
      intracellularSignaling: {
        title: 'Hücre Duvarı Yıkımı & Karbapenem ile PBP2 Sinerjisi',
        summary:
          'Sulbaktam PBP1/3’ü bloke ederken eşzamanlı eklenen karbapenem (Xacduro + Meropenem/İmipenem) veya ikinci ajan sinerjistik bakteriyel öldürme oluşturur.',
        points: [
          'Xacduro rejiminde durlobaktam OXA karbapenemazları kapattığı için, eklenen İmipenem/Meropenem de Acinetobacter’in PBP2 hedefine bağlanarak PBP1+PBP2+PBP3 tam blokajı (çoklu PBP sinerjisi) yaratır.',
          'Yüksek doz Amp-Sulb’da ise 4 saatlik EI ile yüksek serbest sulbaktam düzeyi OXA/ADC enzimlerinin hidroliz kapasitesini aşarak (kinetik doygunluk) PBP1/3’e ulaşır.',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Akciğer Parankimi & ELF (CRAB-VAP)',
          tissueTarget: 'ELF Penetrasyonu %50–60',
          accent: 'violet',
          points: [
            'Kolistinin akciğer ELF penetrasyonu çok zayıfken (<%15–20), sulbaktam ve durlobaktam alveoler boşluğa %50–60 oranında geçer.',
            'Bu PK üstünlüğü ATTACK (2023) çalışmasında CRAB-VAP sağkalım farkının ana fizyolojik nedenidir.',
          ],
        },
        {
          systemTitle: 'Sıvı-Elektrolit & Kardiyovasküler Yük',
          tissueTarget: 'Amp-Sulb 90 mEq Na⁺/gün',
          accent: 'amber',
          points: [
            '9 g Amp-Sulb q8sa ile günde ~90 mEq Na⁺ + 750 mL SF taşınır; hipernatremi eğiliminde hipotonik enteral serbest su veya D5W idame ile Na⁺ dengelenmelidir.',
          ],
        },
        {
          systemTitle: 'Koagülasyon Sistemi (Sulperazon Farkı)',
          tissueTarget: 'MTT Yan Zinciri vs Güvenli',
          accent: 'rose',
          points: [
            'Sulbaktamın kendisi koagülopati YAPMAZ; kanama riski yalnızca Sefoperazon-Sulbaktam (Sulperazon®) içindeki sefoperazonun MTT halkasına aittir.',
          ],
        },
        {
          systemTitle: 'Renal Güvenlik Profili',
          tissueTarget: 'Nefrotoksisite Yok',
          accent: 'teal',
          points: [
            'Polimiksin/Kolistin (%35–50 ABH) ve aminoglikozidlerin aksine sulbaktam bazlı rejimler doğrudan renal tübüler nekroz yapmaz.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Yüksek Doz Kinetik Doygunluk & ATTACK (2023) Kanıtı',
        summary:
          'CRAB tedavisinde sulbaktamın %fT>MIC ≥ %60 hedefine ulaşması için 4 saatlik uzamış infüzyon veya Durlobaktam ile enzimatik koruma kritik önemdedir.',
        points: [
          'ATTACK (Lancet Infect Dis 2023): CRAB pnömonisi/bakteriyemisinde Sulbaktam-Durlobaktam + İmipenem, Kolistin + İmipenem’e göre 28 günlük mortaliteyi %32’den %19’a ve ABH’yi %38’den %13’e düşürmüştür.',
        ],
      },
      clinicalPearls: [
        'CRAB tedavisinde dozu her zaman SULBAKTAM gramı olarak düşünün: 6–9 g/gün SULBAKTAM = 18–27 g/gün Ampisilin-Sulbaktam!',
        'Sulperazon (Sefoperazon-Sulbaktam) ile 9 g/gün sulbaktam vermeye kalkmayın — ciddi INR uzaması ve kanama yapar!',
        '9 g Amp-Sulb 4 saat EI’yi mutlaka %0,9 NaCl ile hazırlayın ve günlük serum sodyumunu takip edin.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Sulbaktam (CRAB Rejimleri)',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Varfarin / Oral Antikoagülanlar (YALNIZCA Sefoperazon-Sulbaktam ile)',
          mechanism: 'Sefoperazon MTT yan zincirine bağlı K-vitamini epoksit redüktaz inhibisyonu',
          clinicalEffect: 'Şiddetli INR yükselmesi ve majör kanama riski.',
          management: 'Yüksek doz CRAB için Sulperazon yerine Ampisilin-Sulbaktam (veya Xacduro) kullanın; Sulperazon zorunluysa K1 vitamini ve günlük INR takibi yapın.',
        },
        {
          severity: 'D',
          agent: 'OAT1/OAT3 İnhibitörleri (Probenesid)',
          mechanism: 'Sulbaktam ve durlobaktam renal tübüler sekresyonunun inhibisyonu',
          clinicalEffect: 'Plazma sulbaktam düzeyinde artış.',
          management: 'Xacduro veya yüksek doz Amp-Sulb ile birlikte Probenesid kullanmayın.',
        },
        {
          severity: 'C',
          agent: 'Aminoglikozidler (Aynı IV Hat)',
          mechanism: 'Fizikokimyasal inaktivasyon',
          clinicalEffect: 'Aynı torba/hatta aminoglikozid aktivite kaybı.',
          management: 'Ayrı IV lümenlerden uygulayın.',
        },
      ],
      references: [
        {
          authors: 'Tamma PD, Heil EL, Justo JA, Mathers AJ, Satlin MJ, Bonomo RA.',
          title: 'Infectious Diseases Society of America 2024 Guidance on the Treatment of Antimicrobial-Resistant Gram-Negative Infections',
          journal: 'Clin Infect Dis',
          year: 2024,
          note: 'CRAB tedavisinde Sulbaktam-Durlobaktam (1. tercih) ve yüksek doz Ampisilin-Sulbaktam (6–9 g/gün sulbaktam) kombinasyon önerilerinin birincil kılavuzu.',
        },
        {
          authors: 'Kaye KS, Shorr AF, Wunderink RG, et al. (ATTACK Trial Investigators).',
          title: 'Efficacy and safety of sulbactam-durlobactam versus colistin for the treatment of patients with serious infections caused by Acinetobacter baumannii-calcoaceticus complex: a multicentre, randomised, active-controlled, phase 3, non-inferiority clinical trial (ATTACK)',
          journal: 'Lancet Infect Dis',
          year: 2023,
          note: 'Sulbaktam-Durlobaktam’ın Kolistine kıyasla mortalite (%19 vs %32) ve ABH (%13 vs %38) üstünlüğünü kanıtlayan Faz 3 çalışma.',
        },
        {
          authors: 'Jaruratanasirikul S, Wongpoowarak W, Wattanavijitkul T, et al.',
          title: 'Population pharmacokinetics and pharmacodynamics modeling to optimize dosage regimens of sulbactam in critically ill patients with severe sepsis caused by Acinetobacter baumannii',
          journal: 'Antimicrob Agents Chemother',
          year: 2016,
          note: 'CRAB sepsisinde 6–9 g/gün sulbaktam ve 4 saatlik uzamış infüzyonun PK/PD temelini kuran çalışma.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/ampicillin-sulbactam.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 9. KASPOFUNGİN (CASPOFUNGIN)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'caspofungin',
    classTag: 'echinocandin',
    accentColor: 'rose',
    atcCode: 'J02AX04',
    classLabel: 'Ekinokandin Antifungal · İnvaziv Kandidiyazis / Kandidemi 1. Basamak',
    tradeNamesTr: 'Cancidas® · Kaspofungin® · Caspofungin Accord® (50 mg & 70 mg Flakon)',
    title: 'Kaspofungin Asetat Monografisi',
    cardTitle: 'Kaspofungin (Caspofungin)',
    cardBadge: 'Kandidemi 1. Tercih · D5W YASAK! · Renal Ayarsız',
    cardCategoryLabel: 'Antifungal · Ekinokandin',
    cardShortDesc:
      'YBÜ invaziv kandidiyazis/kandideminin 1. basamağı (70 mg yükleme → 50 mg q24sa; >80 kg 70 mg). Renal/CRRT ayarı YOK; Child-Pugh B’de 35 mg/gün! KESİN GEÇİMSİZLİK: %5 Dekstrozla ASLA sulandırılmaz!',
    cardHighlights: [
      {
        label: 'YBÜ Dozu (>80 kg: 70 mg)',
        value: '70 mg → 50 mg q24sa',
        subtext: 'Child-Pugh B: 70 mg → 35 mg/gün',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'KESİN GEÇİMSİZLİK!',
        value: '%5 DEKSTROZ YASAK!',
        subtext: 'YALNIZCA %0,9 NaCl veya RL!',
        colorClass: 'text-rose-700 dark:text-rose-300',
        bgClass: 'bg-rose-500/10',
        borderClass: 'border-rose-500/30',
      },
      {
        label: 'Renal / CRRT Ayarı',
        value: 'DOZ AYARI YOK',
        subtext: 'Göz / SSS / İdrar geçişi DÜŞÜK!',
        colorClass: 'text-emerald-700 dark:text-emerald-300',
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
      },
    ],
    aliases: ['kaspofungin', 'caspofungin', 'cancidas', 'ekinokandin', 'antifungal'],
    searchKeywords: [
      'kaspofungin',
      'caspofungin',
      'cancidas',
      'ekinokandin',
      'kandidemi',
      'candida',
      'dekstroz yasak',
      'child pugh',
      '1,3 beta d glukan',
      'antifungal',
    ],
    highAlert: {
      tallManName: 'CASPOfungin',
      confusionRiskWith: 'anidulaFUNGIN · micaFUNGIN · amphotericin B',
      criticalAlerts: [
        '%5 DEKSTROZ (D5W) İLE KESİN GEÇİMSİZLİK (HIZLI İNAKTİVASYON!): Kaspofungin dekstroz içeren çözeltilerde kararsızdır ve hızla bozulur/çökelir! YALNIZCA %0,9 NaCl (SF) veya Ringer Laktat ile sulandırılmalı ve ASLA D5W giden Y-hattan verilmemelidir!',
        'GÖZ (ENDOFTALMİT), SSS (MENENJİT) VE ÜRİNER SİSTEM (KANDİDÜRİ) PENETRASYONU DÜŞÜKTÜR!: Kandidemi saptanan her hastada dilate fundoskopi yapılmalıdır; Candida endoftalmiti, menenjiti veya semptomatik idrar yolu kandidiyazisinde ekinokandinler BAŞARISIZ OLUR (Flukonazol veya Lipozomal Amfoterisin B ± Flusitozin seçin!).',
        'CHILD-PUGH B (ORTA KC YETMEZLİĞİ: 7–9 PUAN): 1. gün 70 mg yükleme TAM verilir, 2. günden itibaren idame 35 mg/gün’e düşürülür! Ancak >80 kg obezite veya güçlü CYP/UGT indükleyici (Rifampisin, Fenitoin, Karbamazepin, Deksametazon) varsa idame 70 mg/gün’e ÇIKARILIR!',
        'CRYPTOCOCCUS, MUCORALES VE FUSARİUM’A DOĞAL DİRENÇLİDİR: Bu mantarlarda hücre duvarı 1,3-β-D-glukan yapısı farklı olduğundan ekinokandinler tamamen etkisizdir!',
      ],
      antidoteOrRescue:
        'Histamin aracılı infüzyon reaksiyonunda (yüzde kızarma, döküntü, kaşıntı, bronkospazm) infüzyonu durdurun/yavaşlatın ve antihistaminik/steroid uygulayın. Anafilakside standart Adrenalin protokolü uygulanır. Kaspofungin hemodiyalizle ATILMAZ (%97 protein bağlanması); aşırı dozda destekleyici tedavi esastır.',
    },
    identitySummary:
      'Kaspofungin, fungal hücre duvarının temel yapı taşı olan 1,3-β-D-glukan sentezini bloke eden lipopeptit yapılı ekinokandin antifungaldir. Flukonazole dirençli Candida glabrata ve Candida krusei dahil Candida türlerine karşı fungisidal etkisi, böbrek yetmezliğinde/CRRT’de doz ayarı gerektirmemesi ve azollere/amfoterisine göre çok düşük ilaç etkileşimi ile YBÜ invaziv kandidiyazis ve kandideminin IDSA/ESCMID 1. basamak tedavisidir.',
    spectrumHighlights: [
      {
        title: '1. Basamak: İnvaziv Kandidiyazis / Kandidemi (Fungisidal)',
        detail:
          'C. albicans, C. glabrata (flukonazol dirençli!), C. krusei, C. tropicalis ve çoğu C. auris izolatına karşı güçlü fungisidal etki; Aspergillus spp.’ye fungistatik (salvage/kombinasyon). Biyofilmlere (SVK!) yüksek penetrasyon.',
        tone: 'emerald',
      },
      {
        title: 'Doku Penetrasyon Sınırları (Göz · BOS · İdrar)',
        detail:
          'Büyük molekül ağırlığı (~1213 Da) ve %97 albümin bağlanması nedeniyle vitreus (endoftalmit), BOS (menenjit) ve idrara (kandidüri) yeterince geçmez! C. parapsilosis MIC’si yüksektir (klinik yanıt izlenmeli).',
        tone: 'amber',
      },
      {
        title: 'Kesin Dirençli Mantarlar & D5W Yasağı',
        detail:
          'Cryptococcus neoformans, Mucorales (Mukormikoz), Fusarium ve Trichosporon’a doğal dirençlidir. %5 Dekstroz ile kesinlikle geçimsizdir!',
        tone: 'rose',
      },
    ],
    mechanismSummary:
      'Kaspofungin, fungal hücre membranındaki 1,3-β-D-glukan sentaz enzim kompleksinin (FKS1/FKS2 alt birimleri) non-kompetitif inhibitörüdür. Hücre duvarındaki β-glukan polimerlerinin tükenmesi mantar hücresinde ozmotik kararsızlık, tomurcuklanan uçlarda rüptür ve Candida türlerinde hızlı fungisidal lizis oluşturur; memeli hücrelerinde hücre duvarı olmadığı için hedef-spesifik toksisitesi son derece düşüktür.',
    mechanismPillars: [
      {
        title: '1,3-β-D-Glukan Sentaz (FKS1/FKS2) İnhibisyonu',
        detail:
          'Memeli hücresinde bulunmayan fungal hücre duvarını hedeflediği için Amfoterisin B’nin nefrotoksisitesi ve azollerin ağır CYP3A4 etkileşimlerini taşımaz.',
      },
      {
        title: 'Candida Biyofilm Penetrasyonu (Kateter Enfeksiyonu)',
        detail:
          'Flukonazolün aksine santral venöz kateter ve protez yüzeylerindeki Candida biyofilmlerine yüksek aktivite gösterir (ancak kateter çekilmesi yine de altın kuraldır!).',
      },
      {
        title: 'Böbrek Bağımsız Eliminasyon & Hepatik OATP1B1 Alımı',
        detail:
          'Böbrekten aktif ilaç atılımı <%2’dir (renal/CRRT ayarı yok!); karaciğerde OATP1B1 ile alınıp spontan hidroliz ve N-asetilasyonla yıkılır (bu yüzden Child-Pugh B’de 35 mg/gün’e inilir).',
      },
    ],
    pkCards: [
      {
        label: 'Yarı Ömür (t½)',
        value: '9 – 11 saat (β) · 40–50 sa (γ)',
        detail: '1. gün 70 mg yükleme ile 24 saatte terapötik kararlı duruma ulaşır; günde tek doz (q24sa) verilir.',
      },
      {
        label: 'Protein Bağlanması',
        value: '%97 (Albümin)',
        detail: 'Çok yüksek protein bağlanması nedeniyle hemodiyalizle ve CRRT ile anlamlı düzeyde temizlenmez!',
      },
      {
        label: 'Doku Dağılımı',
        value: 'KC, Dalak, Akciğer ↑ · BOS/Göz/İdrar ↓',
        detail: 'Karaciğer, akciğer ve peritona mükemmel geçer; BOS, vitreus ve idrarda aktif düzey çok düşüktür.',
      },
      {
        label: 'Eliminasyon',
        value: 'Hepatik Hidroliz + N-Asetilasyon',
        detail: 'CYP450 izoenzimlerinin majör substratı veya inhibitörü değildir; idrarla değişmeden atılım <%2.',
      },
    ],
    contraindications: {
      absoluteItems: [
        'Kaspofungin veya diğer ekinokandinlere (Anidulafungin, Mikafungin) karşı belgelenmiş ağır hipersensitivite/anafilaksi öyküsü.',
        '%5 Dekstroz (D5W) veya dekstroz içeren çözeltilerle sulandırma / aynı Y-hattan uygulama (fizikokimyasal inaktivasyon!).',
      ],
      relativeItems: [
        'Candida endoftalmiti, Candida menenjiti veya izole semptomatik Candida piyelonefriti/sistiti (doku/idrar penetrasyonu yetersizdir!).',
        'Ağır karaciğer yetmezliği (Child-Pugh C) — klinik veri çok sınırlıdır (Anidulafungin hepatik ayarsız alternatif olarak düşünülebilir!).',
        'Siklosporin ile eşzamanlı kullanım — siklosporin OATP1B1’i inhibe ederek kaspofungin AUC’sini %35 artırır ve geçici transaminaz yüksekliğine yol açabilir (yakın KCFT izlemi gerekir).',
      ],
      clinicalNote:
        'Ağır siroz (Child-Pugh C) veya şiddetli transaminaz yüksekliği olan YBÜ hastasında ekinokandin seçerken hepatik metabolizması olmayan (spontan plazma degradasyonu) Anidulafungin avantajlı bir alternatiftir.',
    },
    regimenCards: [
      {
        title: 'YBÜ İnvaziv Kandidiyazis / Kandidemi / İntra-Abdominal Candida',
        setting: 'icu',
        badge: 'IDSA/ESCMID 1. Basamak',
        dose: '70 mg Yükleme → 50 mg IV',
        infusionDuration: '1 saat IV (SF/RL!)',
        interval: 'q24sa',
        note: '1. gün 70 mg yükleme → 2. günden itibaren 50 mg q24sa. Klinik stabilizasyon + negatif kan kültürü + azol duyarlılığı kanıtlanınca 5–7. günde oral/IV Flukonazol’e de-eskalasyon yapılır. Toplam süre ilk negatif kan kültüründen sonra en az 14 gün!',
      },
      {
        title: 'Obez Hasta (>80 kg) veya CYP/UGT İndükleyici Kullanımı',
        setting: 'icu',
        badge: '>80 kg · 70 mg/gün!',
        dose: '70 mg Yükleme → 70 mg IV',
        infusionDuration: '1 saat IV (SF/RL!)',
        interval: 'q24sa',
        note: 'Vücut ağırlığı >80 kg olan hastalarda veya Rifampisin, Fenitoin, Karbamazepin, Efavirenz, Deksametazon alanlarda kaspofungin klirensi arttığından idame dozu 70 mg/gün olarak sürdürülür!',
      },
      {
        title: 'Orta Karaciğer Yetmezliği (Child-Pugh B: 7–9 Puan)',
        setting: 'special',
        badge: 'Child-Pugh B → 35 mg',
        dose: '70 mg Yükleme → 35 mg IV',
        infusionDuration: '1 saat IV (SF/RL!)',
        interval: 'q24sa',
        note: '1. gün yükleme dozu DEĞİŞMEZ (70 mg); 2. günden itibaren idame 35 mg/gün’e indirilir. (>80 kg obezite + Child-Pugh B’de 50 mg/gün düşünülebilir.)',
      },
      {
        title: 'Febril Nötropeni Ampirik Antifungal / Salvage İnvaziv Aspergilloz',
        setting: 'special',
        badge: 'Salvage / Febril Nötropeni',
        dose: '70 mg Yükleme → 50 mg IV',
        infusionDuration: '1 saat IV (SF/RL!)',
        interval: 'q24sa',
        note: 'İnvaziv aspergillozda 1. basamak Vorikonazol/İsavukonazoldür; intolerans veya yanıtsızlıkta Kaspofungin kurtarma tedavisi olarak kullanılır.',
      },
    ],
    calculator: {
      defaultWeightKg: 75,
      weightScalar: 'TBW',
      obesityRationale:
        'Kaspofungin dağılım hacmi ve klirensi vücut ağırlığıyla artar: ≤80 kg hastalarda 50 mg/gün, >80 kg hastalarda ise (veya VKİ ≥30–35 kg/m² ağır YBÜ hastalarında) 70 mg/gün idame dozu önerilir!',
      perioperative: {
        applicable: false,
        summaryTitle: 'Rutin Cerrahi Profilaksi Ajanı Değildir (YBÜ İnvaziv Fungal Tedavi)',
        timingWindow: 'Uygulanmaz',
        standardDoseLabel: 'Rutin cerrahi profilaksi endikasyonu yoktur',
        adultStandardDoseMg: 70,
        infusionTimeText: '1 saat IV (%0,9 NaCl veya RL içinde)',
        clinicalNote:
          'Yalnızca çok yüksek riskli YBÜ cerrahi olgularında (rekürren üst GIS perforasyonu, anastomoz kaçağı + çoklu Candida kolonizasyonu, yüksek riskli karaciğer nakli) enfeksiyon hastalıkları onayıyla hedeflenmiş ampirik/preemptif antifungal olarak başlanır.',
        nonProphylaxisReason:
          'Kaspofungin invaziv kandidiyazis/kandidemi tedavisi için ayrılmış 1. basamak ekinokandindir. Rutin cerrahi profilakside kullanılması yararsızdır ve ekinokandin-dirençli (FKS mutasyonlu) Candida glabrata / C. auris suşlarının seçilimine yol açar.',
      },
      icu: {
        pkPdTarget: 'Serbest AUC0–24 / MIC (ve Cmax / MIC) — konsantrasyona bağımlı fungisidal aktivite',
        pkPdBadge: 'fAUC/MIC · Cmax/MIC',
        loadingDoseLabel: '70 mg IV (1. Gün — TÜM erişkinlerde, Child-Pugh B dahil!)',
        loadingFixedMg: 70,
        loadingUnit: 'mg',
        loadingInfusionText: '1 saatte 250 mL %0,9 NaCl veya RL içinde (ASLA D5W DEĞİL!)',
        maintenanceLabel: 'YBÜ Kaspofungin İdame Rejimleri (2. Günden İtibaren)',
        maintenanceMode: 'fixed_regimen',
        fixedOptions: [
          {
            id: 'std_50mg',
            label: 'Standart Erişkin (≤80 kg · Normal KC / Child-Pugh A)',
            singleDoseMg: 50,
            intervalHours: 24,
            infusionHours: 1,
            diluentVolumeMl: 250,
            note: '70 mg yükleme sonrası 50 mg q24sa. 250 mL %0,9 NaCl veya RL içinde 250 mL/saat (sıvı kısıtlı hastada 100 mL → 100 mL/saat).',
          },
          {
            id: 'obese_inducer_70mg',
            label: 'Obez (>80 kg) veya CYP/UGT İndükleyici (Rifampisin/Fenitoin/Deksametazon)',
            singleDoseMg: 70,
            intervalHours: 24,
            infusionHours: 1,
            diluentVolumeMl: 250,
            note: '70 mg yükleme → 70 mg q24sa! Obezitede ve indükleyici kullanımında 50 mg yetersiz AUC oluşturur.',
          },
          {
            id: 'child_pugh_b_35mg',
            label: 'Orta Karaciğer Yetmezliği (Child-Pugh B: 7–9 puan)',
            singleDoseMg: 35,
            intervalHours: 24,
            infusionHours: 1,
            diluentVolumeMl: 100,
            note: '1. gün 70 mg yükleme TAM verilir → 2. günden itibaren 35 mg q24sa (100 mL SF/RL içinde 1 saat = 100 mL/saat).',
          },
        ],
        specialConversionNote:
          'KESİN SIVI KURALI: YALNIZCA %0,9 NaCl veya Ringer Laktat ile hazırlayın — %5 DEKSTROZ (D5W) ASLA KULLANILMAZ! Sıvı kısıtlaması olan YBÜ hastalarında 50 mg ve 35 mg dozlar 100 mL SF içinde (70 mg doz ise 250 mL SF içinde) 1 saatte verilebilir.',
      },
      renalTiers: [
        {
          id: 'renal_any',
          label: 'Tüm Böbrek Fonksiyonları (eGFR 0–150)',
          egfrRange: 'eGFR <10 – ≥90 mL/dk',
          recommendation: 'RENAL DOZ AYARI YOK!',
          doseText: '70 mg yükleme → 50 mg q24sa (>80 kg: 70 mg q24sa)',
          note: 'İdrarla aktif ilaç atılımı <%2 olduğundan böbrek yetmezliğinin hiçbir evresinde doz azaltılmaz!',
          tone: 'emerald',
        },
        {
          id: 'hepatic_child_b',
          label: 'Karaciğer: Child-Pugh B (7–9 Puan)',
          egfrRange: 'Orta Hepatik Yetmezlik',
          recommendation: 'İdameyi 35 mg’a İndir!',
          doseText: '1. Gün: 70 mg yükleme → 2. Günden İtibaren: 35 mg IV q24sa',
          note: 'Hepatik OATP1B1 alımı ve metabolizması azaldığı için AUC %75 artar → idame 35 mg/gün’e düşürülür.',
          tone: 'amber',
        },
        {
          id: 'hepatic_child_c',
          label: 'Karaciğer: Child-Pugh C (10–15 Puan)',
          egfrRange: 'Ağır Hepatik Yetmezlik',
          recommendation: 'Sınırlı Veri / Anidulafungin Düşün',
          doseText: 'Alternatif: Anidulafungin (hepatik ayarsız) veya yakın KCFT ile 35 mg',
          note: 'Child-Pugh C’de farmakokinetik veri yetersizdir; mümkünse karaciğerden bağımsız Anidulafungin tercih edilir.',
          tone: 'rose',
        },
      ],
      crrtSummary:
        'CRRT (CVVH/CVVHD/CVVHDF): Doz ayarı GEREKMEZ! %97 protein bağlanması nedeniyle CRRT ile neredeyse hiç temizlenmez → standart 70 mg yükleme → 50 mg q24sa (>80 kg: 70 mg q24sa) uygulanır.',
      hdSummary:
        'Aralıklı Hemodiyaliz (IHD): Hemodiyalizle ATILMAZ — post-diyaliz ek doz gerekmez; standart doz (70 mg → 50 mg q24sa) uygulanır.',
    },
    turkeyFormulations: {
      preparations: [
        {
          name: 'Cancidas® / Kaspofungin® 70 mg IV Liyofilize Flakon',
          presentation: '70 mg kaspofungin asetat toz flakon (2–8°C buzdolabında saklanır!)',
          concentration: '70 mg / flakon (Yükleme & >80 kg İdame)',
          saltOrBaseNote: 'Rekonstitüsyon öncesi flakonun oda sıcaklığına gelmesini bekleyin; 10,8 mL SF/WFI ile sulandırıldığında konsantrasyon 7,2 mg/mL olur (10 mL çekilince tam 70 mg).',
          alertLevel: 'high',
        },
        {
          name: 'Cancidas® / Kaspofungin® 50 mg IV Liyofilize Flakon',
          presentation: '50 mg kaspofungin asetat toz flakon (2–8°C soğuk zincir!)',
          concentration: '50 mg / flakon (Standart İdame & Child-Pugh B 35 mg)',
          saltOrBaseNote: '10,8 mL SF/WFI ile sulandırıldığında 5,2 mg/mL olur (50 mg için 10 mL; Child-Pugh B 35 mg için 7 mL çekilir!).',
          alertLevel: 'standard',
        },
      ],
      standardDilutions: [
        '1. ADIM (Rekonstitüsyon): Oda sıcaklığına gelmiş 50 mg veya 70 mg flakona 10,8 mL %0,9 NaCl veya enjeksiyonluk su ekleyip berraklaşana kadar nazikçe çevirin.',
        '2. ADIM (İnfüzyon Torbası — ASLA D5W DEĞİL!): 70 mg veya 50 mg için 10 mL (35 mg Child-Pugh B için 50 mg flakondan 7 mL!) çekilip 250 mL %0,9 NaCl veya Ringer Laktat içine eklenir (sıvı kısıtlamasında 50 mg ve 35 mg dozlar 100 mL SF’ye konabilir).',
        '3. ADIM (Uygulama): Tam 1 saatte yavaş IV infüzyon olarak uygulanır (hızlı infüzyon histamin salınımı/flushing yapar!).',
      ],
      concentrationTrapWarning:
        'D5W YASAĞI + SOĞUK ZİNCİR: Açılmamış flakonlar 2–8°C buzdolabında saklanır. Sulandırma ve seyreltme sırasında ASLA %5 Dekstroz kullanılmaz; hastanın idame sıvısı D5W ise Kaspofungin kesinlikle ayrı bir SF hattından verilmelidir!',
    },
    compatibility: {
      accessRequirement: 'peripheral-ok',
      accessSummary:
        'Periferik veya santral IV hattan 1 saatte güvenle verilir; ancak çok sayıda Y-site geçimsizliği (D5W, β-laktamlar, Heparin, Furosemid) nedeniyle YALNIZCA KENDİ AYRI LÜMENİNDEN infüze edilmesi standarttır.',
      phRange: '5,0 – 7,0',
      osmolalityNote: '250 mL %0,9 NaCl içinde izoozmolardır (~300 mOsm/kg).',
      compatibleDiluents: ['%0,9 NaCl (SF — 1. tercih)', '%0,45 NaCl', 'Ringer Laktat'],
      ySiteCompatible: ['Sınırlı veri — üretici ayrı hattan tek başına infüzyon önerir!'],
      ySiteIncompatible: ['%5 DEKSTROZ / TÜM DEKSTROZLU SIVILAR (KESİN YASAK!)', 'Sefazolin / Seftriakson / Sefepim / Pip-Tazo / Meropenem', 'Heparin', 'Furosemid', 'Pantoprazol', 'Asiklovir', 'Kalsiyum glukonat'],
      stabilityNote:
        'Seyreltilmiş infüzyon torbası (%0,9 NaCl / RL) oda sıcaklığında (≤25°C) 24 saat, buzdolabında (2–8°C) 48 saat stabildir.',
      extravasationProtocol:
        'Vezikan değildir (hafif flebit yapabilir). Ekstravazasyonda infüzyonu durdurun, ekstremiteyi eleve edin ve soğuk kompres uygulayın.',
    },
    organImpairment: {
      renalSummary: 'Böbrek yetmezliğinde, hemodiyalizde ve CRRT’de DOZ AYARI GEREKMEZ!',
      renalDetails: [
        'İdrarla aktif atılım <%2’dir; ABH/KBH’de birikim yapmaz ve Amfoterisin B gibi nefrotoksik değildir.',
        'Hemodiyaliz ve CRRT ile temizlenmez (%97 protein bağlanması).',
      ],
      hepaticSummary: 'Child-Pugh A: Tam doz (50 mg/gün) · Child-Pugh B (7–9 puan): 70 mg yükleme → 35 mg/gün!',
      hepaticDetails: [
        'Child-Pugh B’de hepatik OATP1B1 alımı düştüğünden AUC ~%75 artar → 2. günden itibaren 35 mg/gün verilir.',
        'Child-Pugh C’de veri yetersizdir; hepatik metabolizması olmayan Anidulafungin tercih edilebilir.',
        'YBÜ hastalarında hipoalbüminemi + Child-Pugh B birlikteliğinde bazı PK çalışmaları 35 mg’ın düşük serbest maruziyet yapabileceğini göstermiştir — ağır septik şokta infeksiyon konsültasyonu ile 50 mg değerlendirilebilir.',
      ],
    },
    geriatricObesity: {
      geriatricReductionBadge: 'Doz Azaltımı Yok',
      geriatricPoints: [
        '65 yaş üstü hastalarda AUC ~%28 hafifçe artsa da rutin doz azaltımı gerekmez; böbrek dostu profili yaşlı YBÜ hastalarında büyük avantajdır.',
      ],
      obesityWeightScalarBadge: 'TBW (>80 kg → 70 mg)',
      obesityPoints: [
        'Vücut ağırlığı >80 kg olan hastalarda artmış dağılım hacmi ve klirens nedeniyle standart 50 mg/gün düşük AUC oluşturur → idame 70 mg/gün olarak uygulanır!',
        'Morbid obezitede (≥120 kg) bazı YBÜ merkezleri 70 mg/gün (hatta ağır enfeksiyonda 100 mg/gün off-label) tercih etmektedir.',
      ],
      clinicalNote:
        'YBÜ’de >80 kg hastada "otomatik 50 mg/gün" yazmak en sık yapılan kaspofungin doz hatasıdır — her zaman hasta ağırlığını ve indükleyici ilaçları kontrol edin!',
    },
    pregnancyLactation: {
      pregnancySummary: 'Gebelikte Tercih Edilmez (Eski FDA C) — Hayvan Çalışmalarında Embriyotoksisite.',
      pregnancyDetails: [
        'Hayvan modellerinde iskelet osifikasyon gecikmesi ve embriyotoksisite saptanmıştır; gebelikte invaziv kandidiyaziste 1. basamak Lipozomal Amfoterisin B’dir!',
        'Kaspofungin yalnızca başka seçenek yoksa hayatı tehdit eden enfeksiyonda değerlendirilir.',
      ],
      lactationSummary: 'Emzirme ile Olasılıkla Uyumlu (Oral Emilimi Yok — LactMed).',
      lactationDetails: [
        'Büyük molekül ağırlığı ve yüksek protein bağlanması nedeniyle süte geçişi çok düşüktür ve gastrointestinal kanaldan emilmez.',
      ],
    },
    adverseEffects: [
      {
        title: 'Histamin Aracılı İnfüzyon Reaksiyonu',
        incidenceOrSeverity: '%2–5 (Hızlı İnfüzyonda)',
        detail:
          'Yüzde kızarma (flushing), kaşıntı, döküntü, sıcaklık hissi ve nadiren bronkospazm — 1 saatlik yavaş infüzyonla önlenir.',
        tone: 'amber',
      },
      {
        title: 'Transaminaz (AST/ALT) & ALP Yüksekliği',
        incidenceOrSeverity: '%5–14 (Çoğu Hafif-Geri Dönüşlü)',
        detail:
          'Özellikle Siklosporin ile birlikte kullanımda belirginleşir; ciddi hepatotoksisite nadirdir ancak haftalık KCFT izlemi önerilir.',
        tone: 'amber',
      },
      {
        title: 'Flebit / Venöz İrritasyon & Ateş',
        incidenceOrSeverity: '%3–12',
        detail:
          'Periferik damardan uygulanan hastalarda enjeksiyon yerinde hassasiyet veya hafif ateş görülebilir.',
        tone: 'teal',
      },
      {
        title: 'Hipokalemi & Anafilaksi (Nadir)',
        incidenceOrSeverity: '%3–10 (Hipokalemi) · <0,5% (Anafilaksi)',
        detail:
          'YBÜ’de serum K⁺ takibi; nadiren SJS/TEN bildirilmiştir.',
        tone: 'rose',
      },
    ],
    specialClinicalCautions: [
      {
        title: 'Kandidemi Yönetim Demeti (IDSA 2016 Altın Kuralları)',
        detail:
          '1) Tüm santral venöz kateterleri mümkün olan en kısa sürede çekin! 2) Negatifleşene kadar her 24–48 saatte bir kontrol kan kültürü alın! 3) İlk 1 hafta içinde mutlaka dilate göz dibi muayenesi (endoftalmit taraması) yaptırın! 4) Tedaviyi ilk negatif kan kültüründen sonra en az 14 gün sürdürün!',
      },
      {
        title: 'Göz, Beyin ve İdrar Yolu Candida Enfeksiyonunda KULLANMA',
        detail:
          'Kandidüride idrarda aktif kaspofungin bulunmaz; endoftalmit ve menenjitte vitreus/BOS düzeyi sıfıra yakındır — bu odaklarda Flukonazol veya Lipozomal Amfoterisin B ± Flusitozin seçin.',
      },
      {
        title: 'CYP / UGT İndükleyicilerle 70 mg/gün Kuralı',
        detail:
          'Rifampisin, Fenitoin, Karbamazepin, Efavirenz, Nevirapin veya yüksek doz Deksametazon alan hastalarda kaspofungin vadi düzeyi %30’a kadar düşer → idame mutlaka 70 mg/gün olmalıdır!',
      },
      {
        title: 'Candida parapsilosis & FKS Direnci',
        detail:
          'C. parapsilosis doğal FKS1 polimorfizmi nedeniyle daha yüksek ekinokandin MIC’sine sahiptir; hasta klinik olarak stabilse ve izolat duyarlıysa Flukonazol’e geçiş tercih edilir.',
      },
    ],
    deepPharmacodynamics: {
      receptorMechanism: {
        title: '1,3-β-D-Glukan Sentaz (FKS1 / FKS2) Non-Kompetitif İnhibisyonu',
        summary:
          'Kaspofungin, fungal plazma membranına gömülü 1,3-β-D-glukan sentaz katalitik alt birimine (FKS1p/FKS2p) bağlanarak hücre duvarının ana yapısal iskeleti olan β-(1,3)-D-glukan polimerizasyonunu bloke eder.',
        points: [
          'Ekinokandin direnci hemen daima FKS1/FKS2 genlerinin iki korunmuş "hot-spot" bölgesindeki (HS1, HS2) nokta mutasyonlarından kaynaklanır (özellikle önceden ekinokandin almış C. glabrata ve C. auris’te).',
          'Cryptococcus neoformans duvarında 1,3-β-glukan yerine ağırlıklı α-1,3-glukan ve β-1,6-glukan bulunduğundan intrinsik olarak dirençlidir.',
        ],
      },
      intracellularSignaling: {
        title: 'Fungal Ozmotik Lizis (Candida) vs Apikal Uç Parçalanması (Aspergillus)',
        summary:
          'Hücre duvarının mekanik direnci kaybolduğunda yüksek fungal iç ozmotik basınç hücre zarının rüptürüne yol açar.',
        points: [
          'Candida türlerinde aktif bölünme sırasında duvar bütünlüğü çöktüğü için hızlı fungisidal ölüm gerçekleşir.',
          'Aspergillus gibi küflerde 1,3-β-D-glukan sentezi özellikle büyüyen hif uçlarında (apikal büyüme bölgesi) yoğunlaştığından hif uçları şişip patlar ancak olgun hifler canlı kalabilir (fungistatik etki).',
        ],
      },
      tissueOrganSystems: [
        {
          systemTitle: 'Hepatobiliyer Sistem (OATP1B1 Taşıyıcısı)',
          tissueTarget: 'Karaciğer Alımı & Child-Pugh B',
          accent: 'amber',
          points: [
            'Kaspofungin hepatositlere OATP1B1 taşıyıcısı ile girer ve spontan peptid hidrolizi + N-asetilasyonla parçalanır.',
            'Siklosporin OATP1B1’i bloke ettiğinde plazma kaspofungin AUC’si %35 yükselir; Rifampisin/Fenitoin ise taşıyıcı/klirensi indükleyerek düzeyi düşürür (70 mg/gün gerekir!).',
          ],
        },
        {
          systemTitle: 'Santral Sinir Sistemi, Göz & Üriner Sistem',
          tissueTarget: 'Bariyer Penetrasyon Sınırı',
          accent: 'rose',
          points: [
            'Yüksek molekül ağırlığı (1213 Da) ve %97 albümin bağlanması kan-beyin, kan-retina ve glomerüler filtrasyon bariyerlerinden geçişi engeller.',
            'Bu 3 odakta klinik başarısızlık riski nedeniyle asla monoterapi seçilmemelidir.',
          ],
        },
        {
          systemTitle: 'Renal Sistem & CRRT',
          tissueTarget: 'Nefrotoksisite Sıfır · Ayar Yok',
          accent: 'teal',
          points: [
            'Amfoterisin B’nin aksine böbrek tübüllerine zarar vermez; CRRT’de ve ağır ABH’de tam doz güvenle verilir.',
          ],
        },
        {
          systemTitle: 'Vasküler Endotel & Mast Hücreleri',
          tissueTarget: 'Histamin Salınımı',
          accent: 'sky',
          points: [
            'Polikatyonik siklik hekzapeptit yapısı hızlı IV uygulamada non-IgE mast hücre degranülasyonunu tetikleyebilir; 1 saatlik yavaş infüzyon bu reaksiyonu önler.',
          ],
        },
      ],
      synergyAndCeiling: {
        title: 'Konsantrasyona Bağımlı Öldürme (fAUC/MIC) & Eagle Paradoksal Etkisi',
        summary:
          'Ekinokandinler uzun post-antifungal etkiye (PAFE >12 saat) ve konsantrasyona bağımlı öldürmeye (fAUC/MIC ve Cmax/MIC) sahiptir; günde tek doz idealdir.',
        points: [
          'Çok yüksek in vitro konsantrasyonlarda kitin sentezinin telafi edici artışına bağlı "paradoksal büyüme (Eagle etkisi)" gözlense de klinik insan dozlarında anlamlı başarısızlık göstermemiştir.',
          'İnvaziv kandidiyazis meta-analizlerinde (Andes et al.) ekinokandin başlangıç tedavisi flukonazol/amfoterisine kıyasla sağkalımı anlamlı olarak iyileştirmiştir (OR 0,65).',
        ],
      },
      clinicalPearls: [
        'Kaspofungin = D5W YASAK! Yalnızca %0,9 NaCl veya Ringer Laktat ile hazırlayın ve ayrı lümenden 1 saatte verin.',
        'Kandidemide 3 altın refleks: 1) Ekinokandin başla (>80 kg ise 70 mg/gün!), 2) Santral kateteri çek, 3) Göz dibi muayenesi iste!',
        'Böbrek yetmezliğinde/CRRT’de ASLA doz düşürmeyin — yalnızca Child-Pugh B karaciğer yetmezliğinde 2. günden itibaren 35 mg/gün’e inin.',
      ],
    },
    referencesAndInteractions: {
      drugName: 'Kaspofungin',
      structuredInteractions: [
        {
          severity: 'D',
          agent: 'Rifampisin, Fenitoin, Karbamazepin, Efavirenz, Deksametazon',
          mechanism: 'Hepatik alım taşıyıcılarının / metabolik klirensin indüksiyonu',
          clinicalEffect: 'Kaspofungin vadi konsantrasyonunda %20–30 düşüş ve antifungal başarısızlık riski.',
          management: 'Erişkin Kaspofungin idame dozunu 50 mg/gün’den 70 mg/gün’e yükseltin!',
        },
        {
          severity: 'D',
          agent: 'Siklosporin',
          mechanism: 'Hepatik OATP1B1 taşıyıcı inhibisyonu',
          clinicalEffect: 'Kaspofungin AUC’si %35 artar ve geçici transaminaz (ALT/AST) yüksekliği gelişebilir.',
          management: 'Birlikte kullanımda haftada en az 2 kez KCFT izleyin; ağır transaminaz artışında alternatif (Anidulafungin) düşünün.',
        },
        {
          severity: 'C',
          agent: 'Takrolimus',
          mechanism: 'Tam mekanizma belirsiz (hafif hepatik klirens artışı)',
          clinicalEffect: 'Takrolimus AUC ve vadi konsantrasyonunda ~%20 azalma.',
          management: 'Nakil hastalarında takrolimus kan düzeylerini yakından izleyip gerekirse takrolimus dozunu artırın.',
        },
      ],
      references: [
        {
          authors: 'Pappas PG, Kauffman CA, Andes DR, et al.',
          title: 'Clinical Practice Guideline for the Management of Candidiasis: 2016 Update by the Infectious Diseases Society of America',
          journal: 'Clin Infect Dis',
          year: 2016,
          note: 'İnvaziv kandidiyazis ve kandidemide ekinokandinlerin (Kaspofungin 70 mg → 50 mg q24sa) 1. basamak tedavi, kateter çekilmesi ve fundoskopi kılavuzu.',
        },
        {
          authors: 'Mora-Duarte J, Betts R, Rotstein C, et al.',
          title: 'Comparison of caspofungin and amphotericin B for invasive candidiasis',
          journal: 'N Engl J Med',
          year: 2002,
          note: 'İnvaziv kandidiyaziste Kaspofunginin Amfoterisin B’ye eşdeğer etkinlik ve belirgin düşük nefrotoksisite/infüzyon toksisitesi gösterdiği landmark çalışma.',
        },
        {
          authors: 'Andes DR, Safdar N, Baddley JW, et al.',
          title: 'Impact of treatment strategy on outcomes in patients with candidemia and other forms of invasive candidiasis: a patient-level quantitative review of randomized trials',
          journal: 'Clin Infect Dis',
          year: 2012,
          note: 'Ekinokandin başlangıç tedavisi ve santral kateter çekilmesinin kandidemi mortalitesini anlamlı azalttığını gösteren hasta bazlı meta-analiz.',
        },
      ],
      drugsComUrl: 'https://www.drugs.com/drug-interactions/caspofungin.html',
      medscapeUrl: 'https://reference.medscape.com/drug-interactionchecker',
    },
  },
];
