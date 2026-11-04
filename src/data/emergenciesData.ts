// Types and Master Data for Anesthesia Emergencies (Anestezi Acilleri)

export interface EmergencyReference {
  authors: string;
  title: string;
  journal: string;
  year: string;
  relevance: string;
}

export interface EmergencyActionStep {
  stepNumber: number;
  title: string;
  action: string;
  criticalNote?: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
}

export interface EmergencyProtocol {
  id: string;
  // 1) Başlık
  title: string;
  subTitle: string;
  codeColor: 'red' | 'rose' | 'amber' | 'purple' | 'cyan' | 'teal';
  severityBadge: string;
  keyCallout: string;
  quickCalculatorType?: 'dantrolene' | 'bronchospasm' | 'laryngospasm' | 'cico' | 'airway-obstruction' | 'aspiration' | 'generic';

  // 2) Tanımlama ve Introduction
  introduction: {
    definition: string;
    epidemiology: string;
    triggers: string[];
    safeAgents: string[];
    mortalityStats: string;
    clinicalUrgency: string;
  };

  // 3) Tanı
  diagnosis: {
    overview: string;
    clinicalCriteria: string[];
    gradingScaleTitle?: string;
    gradingScaleSource?: string;
    larachScale: {
      category: string;
      points: string;
      description: string;
    }[];
    larachInterpretation: string;
    differentialDiagnosis: {
      condition: string;
      differentiatingFactors: string;
    }[];
  };

  // 4) Acile Spesifik Akut Yönetimi - Kriz Yönetimi
  crisisManagement: {
    hotlineInfo?: string;
    coreAlgorithm: EmergencyActionStep[];
    dantroleneProtocol?: {
      initialDose: string;
      maxDose: string;
      maintenanceDose: string;
      formulations: {
        name: string;
        vialContent: string;
        reconstitution: string;
        diluent: string;
        timeToPrepare: string;
      }[];
      preparationWarning: string;
    };
    coolingProtocol?: {
      targetTemp: string;
      methods: string[];
      stopThreshold: string;
    };
    hyperkalemiaProtocol?: string[];
    arrhythmiaWarning?: string;
    metabolicAcidosis?: string;

    // Bronkospazma ve havayoluna özel protokoller
    bronchospasmProtocols?: {
      ventilatorOptimization: {
        title: string;
        settings: { parameter: string; recommendation: string; rationale: string; }[];
        autoPeepReleaseManeuver: string;
      };
      stepwisePharmacotherapy: {
        step: string;
        drug: string;
        dosage: string;
        route: string;
        clinicalPearls: string;
      }[];
      refractoryRescuePlan: string[];
    };

    // Laringospazma özel protokoller
    laryngospasmProtocols?: {
      larsonManeuver: {
        title: string;
        technique: string;
        physiologicalMechanism: string;
      };
      stepwisePharmacotherapy: {
        step: string;
        drug: string;
        dosage: string;
        route: string;
        clinicalPearls: string;
      }[];
      nppeManagement: string[];
    };

    // CICO (Ventile Edilemiyor - Entübe Edilemiyor) acil protokolleri
    cicoProtocols?: {
      scalpelBougieTubeTechnique: {
        title: string;
        laryngealHandshake: string;
        techniqueSteps: string[];
        obesePatientModification: string;
      };
      needleVsScalpelComparison: {
        feature: string;
        scalpelBougieTube: string;
        cannulaCricothyrotomy: string;
      }[];
      sugammadexProtocol: {
        dose: string;
        indication: string;
        pearls: string;
      };
    };

    // Akut Hava Yolu Obstrüksiyonu acil protokolleri
    airwayObstructionProtocols?: {
      neckHematomaEvacuation: {
        title: string;
        urgencyNote: string;
        steps: string[];
      };
      foreignBodyRemoval: {
        title: string;
        techniquePearls: string[];
        pitfalls: string;
      };
      ettOcclusionAlgorithm: {
        title: string;
        actionSequence: string[];
      };
    };

    // Pulmoner Aspirasyon (Mendelson) acil protokolleri
    aspirationProtocols?: {
      chemicalVsParticulate: {
        type: string;
        characteristics: string;
        managementKey: string;
      }[];
      antibioticAndSteroidPolicy: {
        title: string;
        recommendation: string;
        evidenceRationale: string;
      };
      gastricUsgAssessment: {
        grade: string;
        description: string;
        riskLevel: string;
      }[];
    };
  };

  // 5) Patofizyolojisi
  pathophysiology: {
    molecularBasis: string;
    geneticMutations?: string[];
    stepsTitle?: string;
    cascadeSteps?: {
      phase: string;
      mechanism: string;
    }[];
    summaryText: string;
  };

  // 6) Klinik Özellikleri - Prezentasyonu
  presentation: {
    earlySigns: string[];
    progressingSigns: string[];
    lateSigns: string[];
    masseterSpasmManagement?: string;
    specialAlertTitle?: string;
    specialAlertContent?: string;
  };

  // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
  preventionAndPreparedness: {
    preopRiskAssessment: string[];
    anesthesiaMachinePreparation: {
      title: string;
      steps: string[];
    };
    cleanAnesthesiaProtocol?: string[];
    cartChecklist: string[];
  };

  // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
  postopManagement: {
    icuMonitoringDuration: string;
    recurrenceRate?: string;
    recurrenceRiskBadge?: string;
    maintenanceTherapy: string;
    monitoringParameters: string[];
    expectedComplications: string[];
    definitiveDiagnosticTesting?: {
      testName: string;
      description: string;
    }[];
    geneticCounseling?: string;
    familyScreening?: string;
    prognosisSummary: string;
  };

  // 9) High-Yield Bilgiler
  highYieldPearls: {
    title: string;
    takeaway: string;
    category: 'Tuzak' | 'Ezber Bozan' | 'Kritik Doz' | 'Sınav / Klinik Notu';
  }[];

  // 10) Kaynaklar ve İleri Okuma
  references: EmergencyReference[];
}

export const ANESTHESIA_EMERGENCIES_DATA: Record<string, EmergencyProtocol> = {
  'mh': {
    id: 'mh',
    // 1) Başlık
    title: 'Malign Hipertermi (MH) Kriz Protokolü',
    subTitle: 'Akut İntraselüler Kalsiyum Fırtınası & Farmakogenetik Hipermetabolik Acil',
    codeColor: 'red',
    severityBadge: 'KOD KIRMIZI · ZAMANA DUYARLI HAYATİ ACİL',
    keyCallout: 'Tetikleyici kesilip %100 O2 ile hiperventile edilmeli, Dantrolen (2.5 mg/kg) gecikmeksizin başlanmalıdır. Ca-kanal blokerleri KESİNLİKLE KONTRENDİKEDİR!',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Malign Hipertermi (MH); genetik olarak duyarlı bireylerde potansiyel inhalasyon anestezikleri ve/veya depolarizan kas gevşetici (süksinilkolin) maruziyetiyle tetiklenen, iskelet kasında kontrolsüz sarkoplazmik retikulum kalsiyum salınımına bağlı gelişen, fulminan hipermetabolik bir anestezi acilidir.',
      epidemiology: 'Genel popülasyonda genetik yatkınlık prevalansı yaklaşık 1:2.000 - 1:3.000 arasındadır. Klinik kriz insidansı erişkin genel anestezilerinde 1:100.000, çocuklarda ise 1:30.000 civarında bildirilmektedir. Erkeklerde ve kas kütlesi fazla olan bireylerde daha sık ve şiddetli seyreder.',
      triggers: [
        'Tüm Halojenli Uçucu (Volatil) Anestezikler: Sevofluran, Desfluran, İsofluran, Halotan, Enfluran',
        'Depolarizan Nöromüsküler Bloker: Süksinilkolin (Scoline)'
      ],
      safeAgents: [
        'İntravenöz Hipnotikler: Propofol, Etomidat, Ketamin, Barbitüratlar, Benzodiazepinler',
        'Non-depolarizan Kas Gevşeticiler: Rokuronyum, Vekuronyum, Sisatrakuryum, Atrakuryum, Pankuronyum',
        'NMB Geri Çeviriciler: Sugammadeks, Neostigmin, Atropin, Glikopirolat',
        'Opioidler: Fentanil, Remifentanil, Morfin, Alfentanil, Sufentanil',
        'Gazlar: Azot Protoksit (N2O), Oksijen, Medikal Hava',
        'Lokal Anestezikler: Lidokain, Bupivakain, Ropivakain, Levobupivakain, Prilokain (tüm ester ve amidler güvenlidir)'
      ],
      mortalityStats: 'Dantrolen keşfedilmeden önce mortalite %70-80 seviyesindeydi. Günümüzde erken tanı, hızlı Dantrolen uygulaması ve aktif soğutma ile mortalite <%5 seviyesine gerilemiştir; ancak tanı veya Dantrolen uygulamasındaki her 10 dakikalık gecikme mortaliteyi katlayarak artırmaktadır.',
      clinicalUrgency: 'Ameliyathanede saniyeler içinde ekip liderliği, tetikleyicinin durdurulması, Dantrolen flakonlarının sulandırılması ve aktif soğutma koordinasyonu gerektiren en yüksek öncelikli acildir.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Malign Hipertermi tanısı tamamen klinik bulgulara ve kan gazı anormalliklerine dayanır. Laboratuvar testi sonucunu beklemek mortaliteyi fırlatır; şüphe anında tedaviye hemen başlanmalıdır.',
      clinicalCriteria: [
        'Açıklanamayan, ani ve inatçı End-Tidal CO2 (EtCO2) artışı (>55-60 mmHg; dakika ventilasyonu 2-3 katına çıkarılmasına rağmen düşmeyen hiperkapni) - EN ERKEN VE EN DUYARLI BULGU',
        'Açıklanamayan, derin anesteziye rağmen inatçı sinüs taşikardisi veya aritmiler',
        'Genel kas rijiditesi ve/veya süksinilkolin sonrası gelişen Masseter Spazmı (çene kilitlenmesi / trismus)',
        'Kombine derin mikst asidoz: Şiddetli respiratuar asidoz (PaCO2 > 60-70 mmHg) ve metabolik laktik asidoz (BE < -8 mEq/L, Laktat > 5 mmol/L)',
        'Hızla yükselen vücut çekirdek sıcaklığı (10-15 dakikada 1-2°C artış; 41-43°C\'ye kadar tırmanış) - GEÇ BULGU',
        'Miyoglobinüri (kola/çay rengi idrar), hiperpotasemi ve aşırı yüksek kreatin kinaz (CK > 20.000 IU/L)'
      ],
      larachScale: [
        { category: 'Süreç 1: Kas Rijiditesi', points: '10 - 15 Puan', description: 'Genelleşmiş kas rijiditesi (15 puan) veya süksinilkolin sonrası çene kilitlenmesi (10 puan).' },
        { category: 'Süreç 2: Kas Yıkımı', points: '10 - 15 Puan', description: 'CK > 20.000 IU/L (15 puan), CK > 10.000 IU/L (10 puan), serum miyoglobin > 170 mcg/L veya idrarda miyoglobinüri (5 puan).' },
        { category: 'Süreç 3: Solunumsal Asidoz', points: '10 - 15 Puan', description: 'Uygun ventilasyona rağmen EtCO2 > 55 mmHg (15 puan) veya PaCO2 > 60 mmHg (15 puan).' },
        { category: 'Süreç 4: Sıcaklık Artışı', points: '10 - 15 Puan', description: 'Açıklanamayan hızlı sıcaklık artışı > 38.8°C (10 puan) veya ameliyathanede > 41°C (15 puan).' },
        { category: 'Süreç 5: Kardiyak Bulgular', points: '3 Puan', description: 'Açıklanamayan sinüs taşikardisi veya ventriküler aritmi / bigemine atımlar.' },
        { category: 'Süreç 6: Diğer / Aile Öyküsü', points: '5 - 10 Puan', description: '1. derece akrabada doğrulanmış MH öyküsü (10 puan) veya arteriyel pH < 7.25 / baz açığı < -8 (10 puan).' }
      ],
      larachInterpretation: 'Larach Klinik Derecelendirme Skalası (Clinical Grading Scale - CGS): Toplam puan > 50 ise "Neredeyse Kesin MH" (Rank 6); 35-49 arası "Çok Olası MH" (Rank 5); 20-34 arası "Olası MH"; < 10 ise "Pek Olası Değil" olarak sınıflanır.',
      differentialDiagnosis: [
        { condition: 'Yetersiz Anestezi / Ağrı / Yüzeyel Blok', differentiatingFactors: 'Anestezi derinleştirildiğinde veya analjezik verildiğinde taşikardi ve hiperkapni geriler; kan gazında derin metabolik asidoz ve CK fırlaması gelişmez.' },
        { condition: 'Ekzojen CO2 Emilimi (Laparoskopi)', differentiatingFactors: 'Ventilasyon artırıldığında EtCO2 kontrol altına alınır; kas rijiditesi, hipertermi ve hiperkalemi görülmez.' },
        { condition: 'Tirotoksik Kriz (Tiroid Fırtınası)', differentiatingFactors: 'Taşikardi ve hipertermi benzerdir; ancak kas rijiditesi yoktur, serum CK değeri normaldir ve respiratuar/metabolik asidoz bu denli yıldırım hızında gelişmez.' },
        { condition: 'Feokromositoma Krizi', differentiatingFactors: 'Aşırı hipertansiyon paroksizmleri ve taşikardi baskındır; kas rijiditesi ve hızlı hipertermi beklenmez.' },
        { condition: 'Nöroleptik Malign Sendrom (NMS)', differentiatingFactors: 'Tablo saatler-günler içinde subakut gelişir; dopamin antagonistleri (antipsikotikler) tetikler, ameliyathanede dakikalar içinde volatil ajanla tetiklenmez.' },
        { condition: 'Sepsis / İntraoperatif Bakteriyemi', differentiatingFactors: 'Ateş ve taşikardi vardır; ancak dakikalar içinde genel kas rijiditesi, masif EtCO2 artışı ve şiddetli rabdomiyoliz tablosu gelişmez.' }
      ]
    },

    // 4) Acile Spesifik Akut Yönetimi - Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'MHAUS (Malignant Hyperthermia Association of the United States) 24 Saat Acil Sıcak Hattı: +1 (800) 644-9737 veya Uluslararası Acil Danışma',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'YARDIM ÇAĞIRIN & TETİKLEYİCİLERİ DERHAL KESİN',
          action: 'Tüm volatil anestezikleri (Sevofluran, Desfluran, İsofluran) kapatın. Buharlaştırıcıları (vaporizatörleri) kilit veya cihazdan sökün. Varsa süksinilkolini derhal sonlandırın. Ameliyathanedeki tüm ekibe yüksek sesle "MALİGN HİPERTERMİ KRİZİ!" ilan edin, MH Acil Arabasını ve Dantrolen stokunu odaya getirtin.',
          criticalNote: 'Cerrahi ekibi uyarın; operasyon derhal sonlandırılmalı veya elektif ise iptal edilmeli, acil ise TIVA ile en kısa sürede kapatılmalıdır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: '%100 OKSİJEN İLE AŞIRI HİPERVENTİLASYON (3-4 KAT DAKİKA VENTİLASYONU)',
          action: 'Taze gaz akışını (FGF) maksimuma getirin (≥ 10-15 L/dk %100 O2). Dakika ventilasyonunu normalin 2-3 katına çıkarın (TV artırın, solunum frekansını yükseltin). Mümkünse ekspiratuar hatta aktif karbon filtre takın. Anestezi devresini ve absorbanı (soda lime) hemen değiştirmek için vakit kaybetmeyin, yüksek akım flush uygulayın.',
          criticalNote: 'Amaç: Masif hücresel CO2 üretimini temizlemek ve aşırı doku hipoksisini önlemektir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'DANTROLEN SODYUM UYGULAYIN (GECİKMEKSİZİN)',
          action: 'Başlangıç dozu: 2.5 mg/kg IV HIZLI BOLUS. Semptomlar (EtCO2 düşüşü, kas gevşemesi, kalp hızı kontrolü) gerileyene kadar her 5-10 dakikada bir 1 - 2.5 mg/kg tekrarlayın. Kümülatif doz genellikle 10 mg/kg\'a kadar çıkabilir; refrakter olgularda 20-30 mg/kg\'a kadar tırmanılabilir.',
          criticalNote: 'Dantrolen MH\'nin TEK SPESİFİK ANTİDOTUDUR. Sulandırılması için birden fazla personel aynı anda görevlendirilmelidir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'AKTİF DIŞ VE İÇ SOĞUTMA PROTOKOLÜNÜ BAŞLATIN',
          action: 'Buzlu soğuk izotonik (%0.9 SF) solüsyonları IV infüze edin (15-30 mL/kg). Nazogastrik, mesane ve açık batın varsa cerrahi kaviteye soğuk lavaj uygulayın. Aksilla, kasık ve boyuna buz torbaları yerleştirin. Soğutucu hipotermi battaniyesi kullanın.',
          criticalNote: 'Vücut sıcaklığı 38.0 - 38.5°C\'ye indiğinde soğutmayı DURDURUN! Aksi halde kontrolsüz reaktif hipotermi ve kardiyak fibrilasyon gelişir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 5,
          title: 'HİPERKALEMİ VE AŞIRI ASİDOZU YÖNETİN',
          action: 'Arter kan gazı ve elektrolitleri her 10-15 dakikada bir tekrarlayın. Hiperkalemi (K > 5.5 - 6.0 mEq/L) durumunda: 1) Kalsiyum Klorür 10 mg/kg (%10 5-10 mL) veya Kalsiyum Glukonat 30 mg/kg ile miyokardı elektriksel olarak stabilize edin; 2) İnsülin 10 IU regüler + 50 mL %50 Dekstroz IV infüzyon; 3) Ağır metabolik asidozda (pH < 7.20, BE < -8) Sodyum Bikarbonat 1-2 mEq/kg IV verin.',
          criticalNote: 'Kalsiyum klorür SADECE hiperkalemiye bağlı EKG arrest riskini önlemek içindir; Dantrolen öncesi rutin verilmez.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'ARİTMİLERİ YÖNETİN (KALSİYUM KANAL BLOKERLERİ KESİNLİKLE KONTRENDİKE!)',
          action: 'Dantrolen ve hiperkalemi tedavisiyle aritmiler genellikle kendiliğinden düzelir. Dirençli ventriküler taşiaritmilerde Amiodaron (150-300 mg) veya Lidokain (1-1.5 mg/kg) tercih edilir.',
          criticalNote: 'DİKKAT: Verapamil veya Diltiazem gibi Kalsiyum Kanal Blokerleri Dantrolen ile birlikte verildiğinde ölümcül hiperkalemi ve tam kardiyovasküler kollaps yapar! ASLA VERMEYİN.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 7,
          title: 'İDRAR ÇIKIŞINI VE BÖBREKLERİ KORUYUN (ZORLU DİÜREZ)',
          action: 'Foley sonda takın, idrar rengini ve saatlik debiyi izleyin. Hedef idrar çıkışı: ≥ 1-2 mL/kg/saat. İdrarı alkalinizasyon için bikarbonat infüzyonu, Mannitol (0.25 - 0.5 g/kg) veya Furosemid (0.5 - 1 mg/kg) uygulayarak miyoglobin tübüler tıkanmasını (akut böbrek yetmezliğini) engelleyin.',
          criticalNote: 'Dantrium formülasyonu zaten her 20 mg flakonda 3 gram mannitol içerir; bu nedenle ek mannitol dozunda dikkatli olunmalıdır.',
          priority: 'MEDIUM'
        }
      ],
      dantroleneProtocol: {
        initialDose: '2.5 mg/kg IV Hızlı Puşe (70 kg erişkin için ~175 - 200 mg)',
        maxDose: 'Kümülatif doz 10 mg/kg (bazı kaynaklarda semptom dinene kadar 20-30 mg/kg\'a kadar çıkılabilir)',
        maintenanceDose: 'Başarılı resüsitasyon sonrası nüksü önlemek için 1 mg/kg IV her 4-6 saatte bir (veya 0.25 mg/kg/saat sürekli infüzyon) en az 24-48 saat boyunca devam edilir.',
        formulations: [
          {
            name: 'Dantrium / Revonto (Klasik Formülasyon)',
            vialContent: '20 mg Dantrolen liyofilize toz + 3000 mg (3 g) Mannitol',
            reconstitution: 'Her bir flakon 60 mL Steril Enjeksiyonluk Su (AQUA) ile çözünmelidir. SF VEYA DEKSTROZ KULLANILMAZ!',
            diluent: 'Steril Distile Su (Aqua ad iniectabilia) - Isıtılmış (38°C) su çözünmeyi hızlandırır.',
            timeToPrepare: '70 kg hasta (200 mg başlangıç) için 10 flakon ve 600 mL su gerekir; çözünmesi 15-20 dakika sürebilir (en az 3-4 kişi aynı anda çalkalamalıdır).'
          },
          {
            name: 'Ryanodex (Yeni Nesil Nano-Süspansiyon Formülasyonu)',
            vialContent: '250 mg Dantrolen sodyum + 125 mg Mannitol',
            reconstitution: 'Tek bir flakon SADECE 5 mL Steril Enjeksiyonluk Su ile 10-15 saniyede tamamen çözünür.',
            diluent: 'Steril Distile Su (5 mL)',
            timeToPrepare: '70 kg hasta için TEK 1 FLAKON yeterlidir ve 1 dakikadan kısa sürede IV puşe edilebilir. Kriz anında zaman kazandırır.'
          }
        ],
        preparationWarning: 'Dantrolen flakonlarını ASLA %0.9 NaCl (SF), Dengeli Sıvılar veya %5 Dekstroz ile sulandırmayın; çökelti oluşturur ve çözünmez! SADECE STERİL SAF ENJEKSİYONLUK SU (AQUA) kullanılmalıdır.'
      },
      coolingProtocol: {
        targetTemp: 'Ölçülen çekirdek (özofagus / nazofaringeal) sıcaklık 38.5°C\'nin altına indiğinde aktif soğutmayı kesin.',
        methods: [
          'IV Soğuk Kristalloidler: 4°C\'de saklanan %0.9 SF 1000-2000 mL hızlı infüzyon.',
          'Yüzeyel Buz Torbaları: Boyun, koltuk altı ve kasık bölgelerine (büyük damar hatlarına).',
          'Vücut Boşlukları Lavajı: Nazo-gastrik tüpten buzlu su lavajı, foleyden mesane lavajı, laparotomi açıksa batın lavajı.',
          'Soğutma Battaniyesi / Hipotermi Cihazları.'
        ],
        stopThreshold: '38.0°C - 38.5°C arasında durdurun; "Overshoot" (aşırı kayma) ile <36°C hipotermi ve ventriküler fibrilasyon gelişebilir.'
      },
      hyperkalemiaProtocol: [
        'Kalsiyum Klorür (%10): 10 mg/kg IV (veya Ca Glukonat 30 mg/kg) - EKG ritmini korur.',
        'Regüler İnsülin + Dekstroz: 10 IU Kristalize İnsülin + 50 mL %50 Dekstroz IV 15-30 dakikada infüzyon.',
        'Sodyum Bikarbonat (%8.4): 1-2 mEq/kg IV puşe (K+ hücre içine sokar ve asidozu düzeltir).',
        'Refrakter olgularda: İnhale Albuterol / Salbutamol (10-20 mg nebül) ve acil hemodiyaliz hazırlığı.'
      ],
      arrhythmiaWarning: 'Kalsiyum kanal blokerleri (Verapamil, Diltiazem) ile Dantrolen BİRLİKTE KULLANILDIĞINDA MİYOKARDİYAL İNTRAPLAZMATİK KALSİYUM ÇÖKER, ŞİDDETLİ HİPERKALEMİ VE DÖNÜŞÜMSÜZ KARDİYAK ARREST GELİŞİR! KESİNLİKLE YASAKTIR.',
      metabolicAcidosis: 'Laktat ve aşırı hücresel metabolizmaya bağlı şiddetli mikst asidoz gelişir. Kan gazı takibine göre Sodyum Bikarbonat (1 mEq/kg) titre edilir; ancak yeterli ventilasyon (CO2 eliminasyonu) sağlanmadan bikarbonat verilirse doku içi CO2 daha da artabilir.'
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'İskelet kası sarkoplazmik retikulum (SR) membranında bulunan Ryanodine Reseptör Tip 1 (RYR1) veya voltaj kapılı L-tipi kalsiyum kanalı (Dihidropiridin Reseptörü - CACNA1S) genlerinde otozomal dominant kalıtılan mutasyonlar mevcuttur. Tetikleyici ajan varlığında bu reseptörler kilitlenir ve sarkoplazmaya kontrolsüz, masif kalsiyum boşalması gerçekleşir.',
      geneticMutations: [
        'RYR1 (Kromozom 19q13.1): MH vakalarının %70-80\'inden sorumlu primer kalsiyum salınım kanalı mutasyonu.',
        'CACNA1S (Kromozom 1q32): Dihidropiridin reseptörü alfa-1 alt ünitesi (%1-2 vaka).',
        'STAC3: İskelet kası eksitasyon-kontraksiyon eşleşme proteini ("Native American Myopathy" ile ilişkili mutasyon).'
      ],
      stepsTitle: 'Hücre İçi Kalsiyum Boşalması & Hipermetabolizma Kaskadı',
      cascadeSteps: [
        {
          phase: '1. Tetiklenme & Kontrolsüz Ca2+ Deşarjı',
          mechanism: 'Volatil anestezik veya süksinilkolin mutasyonlu RYR1 reseptörüne bağlanarak kalsiyum kanalını sürekli açık konumda kilitler. Sarkoplazmik retikulumdan sitozole devasa kalsiyum akar.'
        },
        {
          phase: '2. Sürekli Aktin-Miyozin Çapraz Köprüleşmesi & Kas Spazmı',
          mechanism: 'Troponin C sürekli kalsiyumla doyar; aktin-miyozin kayması durdurulamaz. İskelet kası gevşeyemez; sürekli kasılma ve jeneralize rijidite oluşur.'
        },
        {
          phase: '3. Hipermetabolik Fırtına & ATP Tükenmesi',
          mechanism: 'Kas hücresi kalsiyumu SR içine geri pompalamak (SERCA) ve gevşemek için çılgınca ATP harcar. Glikojen depoları dakikalar içinde tükenir. Oksijen sarfiyatı (VO2) ve karbondioksit üretimi (VCO2) normalin 3-5 katına çıkar.'
        },
        {
          phase: '4. Anaerobik Glikoliz, Masif Laktat & Isı Üretimi',
          mechanism: 'Oksijen yetersiz kalınca anaerobik metabolizma devreye girer. Yüksek enerjili fosfat bağlarının kontrolsüz hidrolizi devasa ısı enerjisi açığa çıkarır (Termojenez). Vücut ısısı dakikada 0.2 - 0.5°C yükselir.'
        },
        {
          phase: '5. Hücre Membran Bütünlüğünün İflası & Rabdomiyoliz',
          mechanism: 'ATP tamamen tükenince sarkolemma (hücre zarı) bütünlüğü bozulur. Hücre içeriği kontrolsüzce dolaşıma dökülür: Masif Kalsiyum, Potasyum (Hiperkalemi), Miyoglobin (Miyoglobinüri/Böbrek iflası) ve Kreatin Kinaz (CK > 20.000 - 100.000 IU/L).'
        }
      ],
      summaryText: 'Özetle Malign Hipertermi; kas hücresinin kalsiyum pompalama motorunun alev alması, ardından enerji tükenmesiyle kendi kendini sindirerek patlaması (rabdomiyoliz) ve tüm dolaşımı asidoz, potasyum ve ısıyla zehirlemesidir.'
    },

    // 6) Klinik Özellikleri - Prezentasyonu
    presentation: {
      earlySigns: [
        'Açıklanamayan, İnatçı End-Tidal CO2 Fırlaması (Dakika ventilasyonu iki katına çıkarılsa bile EtCO2 > 55-70 mmHg seyreder) - EN ERKEN İŞARET',
        'Açıklanamayan Sinüs Taşikardisi veya Ventriküler Ektopi (Derin anestezi ve analjeziye rağmen)',
        'Süksinilkolin Sonrası Masseter Kas Spazmı (MMR - Çene kilitlenmesi, laringoskopi yapılamaması)',
        'Taşipne / Ventilatörle Uyumsuzluk (Spontan soluyan hastada hızlı yüzeysel solunum)',
        'Ciltte Sıcaklık, Kızarıklık (Flushing) ve ardından Mermerleşme / Alacalı Terleme'
      ],
      progressingSigns: [
        'Genelleşmiş İskelet Kası Rijiditesi ("Tahta Karın", ekstremitelerin bükülememesi)',
        'Ciddi Mikst Asidoz: Arter kan gazında PaCO2 > 65 mmHg, pH < 7.15, BE < -10 mEq/L, Laktat > 6 mmol/L',
        'Hiperpotasemi: Serum K > 5.5 - 6.5 mEq/L (EKG\'de sivri T dalgaları, PR uzaması, QRS genişlemesi)',
        'Anestezi Devresinde Isınma: Soda lime kabının (karbondioksit absorbanı) aşırı CO2 reaksiyonu nedeniyle el yakacak derecede ısınması'
      ],
      lateSigns: [
        'Hızla Yükselen Yüksek Ateş (Hipertermi): Çekirdek ısının dakikada 1-2°C tırmanarak 41 - 43°C seviyelerine ulaşması',
        'Miyoglobinüri: İdrar torbasında kola, koyu çay veya bordo renkli idrar',
        'Yaygın Damar İçi Pıhtılaşma (DIC): Cerrahi alandan kontrolsüz sızıntı kanama, peteşi, trombositopeni, INR uzaması',
        'Kardiyak Disritmiler & Arrest: Şiddetli hiperkalemi ve asidoza bağlı Ventriküler Fibrilasyon, Asistoli veya PEA',
        'Akut Böbrek Yetersizliği (ATN) ve Kompartman Sendromu'
      ],
      masseterSpasmManagement: 'Süksinilkolin sonrası masseter spazmı (çene kasının kilitlenip ağzın açılamaması) gelişirse: Hastaların yaklaşık %20-30\'unda MH krizi başlayacaktır. Elektif cerrahi DERHAL İPTAL EDİLMELİDİR. Hasta en az 24 saat YBÜ/PACU\'da seri kan gazı, CK ve idrar miyoglobin takibine alınmalıdır. Acil ameliyat gerekiyorsa volatil ajanlar kesilip TIVA\'ya geçilmeli ve MH hazırlığı yapılmalıdır.'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Ayrıntılı Anestezi ve Aile Öyküsü: Ailede anestezide açıklanamayan ölüm, uyanma gecikmesi, yüksek ateş veya yoğun bakım yatışı sorgulanmalıdır.',
        'Miyopatilerle Birliktelik: Central Core Hastalığı (CCD), Multiminicore Hastalığı (MmD), King-Denborough Sendromu ve STAC3 miyopatisi tanılı hastalar KESİNLİKLE MH YATKIN kabul edilir.',
        'Duchenne / Becker Muskuler Distrofileri: Klasik MH değildir; ancak süksinilkolin veya volatil ajanla ölümcül "Rabdomiyoliz ve Hiperkalemik Kardiyak Arrest" gelişebileceği için bu hastalarda da tetikleyiciler KESİNLİKLE YASAKTIR.'
      ],
      anesthesiaMachinePreparation: {
        title: 'MH Duyarlı Hasta İçin "Temiz Anestezi Cihazı" Hazırlama Protokolü',
        steps: [
          'Vaporizatörleri (buharlaştırıcıları) cihazdan fiziksel olarak sökün veya şerit bantla "KULLANILAMAZ" kilitleyin.',
          'Karbondioksit absorbanını (Soda Lime) taze yenisiyle değiştirin.',
          'Anestezi solunum devresini, körüğü ve su tutucuları tamamen yeni, hiç gaz görmemiş setlerle değiştirin.',
          'Yüksek Akım Yıkama (Flush): Cihazı %100 O2 ile 10-15 L/dk akımda test akciğeri bağlı şekilde çalıştırın. Yeni nesil anestezi cihazlarının iç elastomerik parçalarında volatil gaz emildiği için bu yıkama süresi cihaz modeline göre 20 dakika ile 90 dakika arasında sürebilir (MHAUS cihaz kılavuzuna bakın).',
          'Aktif Kömür Filtreleri (Vapor-Clean vb.): İnspiratuar ve ekspiratuar hatlara özel aktif karbon filtre takılırsa 90 dakikalık uzun yıkama süresi 2 dakikaya indirilebilir; operasyon boyunca filtreler hatta kalmalıdır.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Anestezi Tekniği: TIVA (Total İntravenöz Anestezi) - Propofol ve Remifentanil/Fentanil hedef kontrollü infüzyon (TCI).',
        'Alternatif: Rejyonal / Nöroaksiyel anestezi (Spinal, Epidural, Periferik Sinir Blokları) güvenle uygulanabilir.',
        'Sıcaklık Monitorizasyonu: Süresi > 30 dakika olan her anestezi vakasında ÇEKİRDEK ISI (özofagus, nazofarenks, timpanik veya mesane) kesintisiz ölçülmelidir.',
        'EtCO2 Monitorizasyonu: Kesintisiz ve kalibre kapnografi şarttır.'
      ],
      cartChecklist: [
        'En az 36 flakon klasik Dantrolen (Dantrium / Revonto, 20 mg) VEYA en az 3 flakon Ryanodex (250 mg).',
        'En az 2000-3000 mL Steril Enjeksiyonluk Su (Aqua ad iniectabilia, flakon sulandırmak için).',
        'Buzdolabında hazır bekleyen 4°C soğuk %0.9 NaCl (SF) torbaları (en az 3-4 litre).',
        'Sodyum Bikarbonat (%8.4), Kalsiyum Klorür (%10), Regüler İnsülin, %50 Dekstroz ampulleri.',
        'Amiodaron ve Lidokain ampulleri.',
        'Yüzeyel buz torbaları, nazogastrik tüpler, foley kateter ve idrar ölçüm seti.',
        'Kan gazı enjektörleri ve laktat/potasyum analiz kartuşları.'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Kriz başarıyla kontrol altına alındıktan sonra hasta EN AZ 24 - 48 SAAT YOĞUN BAKIM ÜNİTESİNDE (YBÜ) entübe/stabil invaziv monitörize edilmelidir.',
      recurrenceRiskBadge: 'NÜKS (REKÜRRENS) RİSKİ: %25',
      recurrenceRate: 'İlk kriz yatıştıktan sonra hastaların yaklaşık %25\'inde (her 4 hastadan birinde) ilk 24 saat içinde nüks (rekürrens) görülür. Nüks genellikle ilk 8-12 saatte ortaya çıkar.',
      maintenanceTherapy: 'Nüksü önlemek için Dantrolen tedavisine postoperatif 1 mg/kg IV her 4-6 saatte bir (veya 0.25 mg/kg/saat sürekli infüzyon) en az 24-48 saat boyunca devam edilmelidir.',
      monitoringParameters: [
        'Kesintisiz EKG, İnvaziv Arter Basıncı (İAB), Santral Venöz Basınç (SVP), Çekirdek Vücut Sıcaklığı.',
        'Saatlik idrar çıkışı ve idrar rengi takibi (hedef > 1.5 - 2 mL/kg/saat).',
        'Seri arter kan gazı (her 1-2 saatte bir laktat, pH, PaCO2 ve Potasyum takibi).',
        'Seri Kreatin Kinaz (CK): CK seviyesi krizden 12-24 saat sonra pik yapar; 24-48 saat boyunca 6 saatte bir ölçülmelidir.',
        'Koagülasyon paneli (PT, aPTT, Fibrinojen, D-Dimer, Trombosit) - DIC gelişimi açısından.'
      ],
      expectedComplications: [
        'Akut Tübüler Nekroz & Böbrek Yetmezliği (Miyoglobin presipitasyonuna bağlı).',
        'Yaygın Damar İçi Pıhtılaşma (DIC / Tüketim Koagülopatisi).',
        'Kompartman Sendromu (Kas içi aşırı ödem ve nekroz nedeniyle ekstremitelerde fasyotomi ihtiyacı).',
        'Sol Ventrikül Disfonksiyonu, Kardiyak Yetmezlik ve Pulmoner Ödem.',
        'Hipoksik İskemik Ensefalopati ve Nörolojik Hasar (uzamış hipertermi ve arrest olgularında).'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'CHCT (Caffeine-Halothane Contracture Test) / IVCT (In Vitro Contracture Test)',
          description: 'Altın standart fonksiyonel tanı testidir. Uyluk vastus medialis kasından taze canlı kas biyopsisi alınarak kafein ve halotan banyosunda kasılma gerimi ölçülür. Duyarlılığı %97-99, özgüllüğü %85-95\'tir. Türkiye ve dünyada sınırlı sayıda akredite MH biyopsi merkezinde yapılır.'
        },
        {
          testName: 'Moleküler Genetik Test (DNA Dizi Analizi)',
          description: 'Periferik kandan RYR1, CACNA1S ve STAC3 gen paneli taranır. Mutasyon bulunursa tanı KESİNDİR (%100 özgül). Ancak mutasyon saptanmaması MH riskini dışlamaz (%20-30 bilinmeyen mutasyon vardır); negatif genetik testte altın standart CHCT kas biyopsisi gerekir.'
        }
      ],
      geneticCounseling: 'Doğrulanmış bir MH krizinde hastanın 1. derece tüm akrabaları (anne, baba, kardeşler, çocuklar) otozomal dominant kalıtım nedeniyle %50 RİSK TAŞIR. Tüm aile bireylerine genetik danışmanlık verilmeli, MH Uyarı Kartı/Bilekliği taşımaları sağlanmalı ve ulusal/uluslararası MH veri tabanına kayıtları yapılmalıdır.',
      prognosisSummary: 'Erken tanınıp ilk 10-15 dakika içinde Dantrolen başlanan ve aktif soğutulan olgularda tam iyileşme oranı >%95\'tir. Tanı ve Dantrolen uygulamasının 30 dakikayı aştığı gecikmiş vakalarda mortalite, kalıcı nörolojik hasar ve diyaliz bağımlı böbrek yetmezliği dramatik yükselir.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: '"Hipertermi Erken Değil, Geç Bir Bulgudur!"',
        takeaway: 'Malign Hipertermi krizinde ateşin yükselmesini beklerseniz hastayı kaybedebilirsiniz. En erken ve en duyarlı işaret, dakika ventilasyonu artırılmasına rağmen düşmeyen inatçı EtCO2 yükselmesidir (hiperkapni). Ateş yükseldiğinde hücresel fırtına zaten doruk noktasına ulaşmıştır.',
        category: 'Tuzak'
      },
      {
        title: 'Ölümcül İlaç Etkileşimi: Ca Kanal Blokerleri + Dantrolen',
        takeaway: 'Dantrolen verilen bir hastada aritmi veya hipertansiyonu tedavi etmek için Verapamil veya Diltiazem verirseniz intrakardiyak kalsiyum kilitlenir, masif hiperkalemi ve geri döndürülemez asistoli gelişir. Kalsiyum kanal blokerleri KESİNLİKLE YASAKTIR.',
        category: 'Tuzak'
      },
      {
        title: 'Dantrolen Sulandırma Kuralı: Sadece Steril Su (Aqua)',
        takeaway: 'Dantrolen (Dantrium) flakonları SF (%0.9 NaCl) veya %5 Dekstroz ile sulandırılırsa tuz çökelmesi yapar ve çözünmez. SADECE Steril Saf Su (Aqua ad iniectabilia) kullanılmalıdır. Ilık su (38°C) kullanmak flakonun çözünme hızını 2 kat hızlandırır.',
        category: 'Kritik Doz'
      },
      {
        title: 'Süksinilkolinsiz de MH Olur (Yavaş Başlangıç)',
        takeaway: 'Süksinilkolin verilmediğinde, yalnızca Sevofluran veya Desfluran maruziyeti ile MH tablosu indüksiyondan 1 ila 4 saat sonra, hatta derlenme odasında (PACU) sinsi ve yavaş bir EtCO2 artışıyla başlayabilir.',
        category: 'Ezber Bozan'
      },
      {
        title: 'Masseter Spazmı (MMR) vs Normal Çene Tonusu',
        takeaway: 'Süksinilkolin sonrası çenenin kilitlenip ağzın parmakla dahi açılamaması (Jaws of Steel / Çelik Çene) vakaların %20-30\'unda fulminan MH başlangıcıdır. Elektif operasyon derhal iptal edilmelidir.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Dantrolen İdamesini Erken Kesmeyin (%25 Nüks Kuralı)',
        takeaway: 'Hasta stabil hale gelse bile krizlerin dörtte biri ilk 24 saat içinde nüks eder. Dantrolen idame dozu (1 mg/kg her 4-6 saatte bir) yoğun bakımda en az 24-48 saat kesilmeden sürdürülmelidir.',
        category: 'Kritik Doz'
      }
    ],

    // 11) Kaynaklar ve İleri Okuma
    references: [
      {
        authors: 'Hopkins PM, Rüffert H, Snoeck MM, et al. (European Malignant Hyperthermia Group)',
        title: 'European Malignant Hyperthermia Group guidelines for investigation of malignant hyperthermia susceptibility.',
        journal: 'British Journal of Anaesthesia (BJA). 2021;126(3):611-623.',
        year: '2021',
        relevance: 'Avrupa Malign Hipertermi Grubu güncel tanı, genetik test ve kas biyopsisi konsensus kılavuzu.'
      },
      {
        authors: 'Larach MG, Gronert GA, Allen GC, Brandom BW, Lehman EB.',
        title: 'Clinical presentation, treatment, and complications of malignant hyperthermia in North America from 1987 to 2006.',
        journal: 'Anesthesia & Analgesia. 2010;110(2):498-507.',
        year: '2010',
        relevance: 'Klinik Derecelendirme Skalası (Larach Skoru) ve Kuzey Amerika kriz komplikasyon analizi.'
      },
      {
        authors: 'Glitzenstein S, et al. (MHAUS Medical Advisory Board)',
        title: 'MHAUS Guidelines: Emergency Therapy for Malignant Hyperthermia.',
        journal: 'Malignant Hyperthermia Association of the United States Clinical Guidelines.',
        year: '2023',
        relevance: 'MHAUS resmi kriz yönetim algoritması, Ryanodex/Dantrolen doz protokolü ve telefon destek kılavuzu.'
      },
      {
        authors: 'Rosenbaum HK, Miller D.',
        title: 'Malignant Hyperthermia: Diagnosis and Management.',
        journal: 'Miller\'s Anesthesia (9th Edition), Chapter 85, Elsevier.',
        year: '2020',
        relevance: 'Temel anestezi referans kitabında patofizyoloji, kas reseptör fizyolojisi ve anestetik yönetim.'
      },
      {
        authors: 'Rüffert H, Bastian B, Bendixen D, et al.',
        title: 'Consensus guidelines on perioperative management of malignant hyperthermia suspected or susceptible patients from the European Malignant Hyperthermia Group.',
        journal: 'British Journal of Anaesthesia (BJA). 2021;126(1):120-130.',
        year: '2021',
        relevance: 'MH duyarlı hastanın preoperatif hazırlığı, temiz anestezi cihazı ve TIVA protokolü.'
      }
    ]
  },

  'bronchospasm': {
    id: 'bronchospasm',
    // 1) Başlık
    title: 'İntraoperatif Akut Bronkospazm Kriz Protokolü',
    subTitle: 'Hava Yolu Direnci Fırtınası, Dinamik Hiperenflasyon & Refrakter Bronkokonstriksiyon Yönetimi',
    codeColor: 'amber',
    severityBadge: 'KOD TURUNCU / KIRMIZI · HAVAYOLU KRİZİ',
    keyCallout: '%100 FiO2 ile manüel torba ventilasyonuna geçin, mekanik tıkanıklığı (bükülme/sekresyon/derin tüp) ekarte edin, anesteziyi derinleştirin (Sevofluran/Ketamin), Salbutamol MDI (8-10 puf) uygulayın. Refrakter tabloda İntravenöz Adrenalin ve Magnezyum Sülfat vermekten çekinmeyin! Desfluran KESİNLİKLE VERMEYİN!',
    quickCalculatorType: 'bronchospasm',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'İntraoperatif akut bronkospazm; trakeobronşiyal ağacın düz kaslarının hiperreaktiviteye bağlı akut, yaygın ve reversibl daralması sonucu hava yolu direncinin katlanarak artması, ekspiratuar akımın kısıtlanması, gaz hapsi (oto-PEEP) ve ağır ventilasyon güçlüğü ile karakterize hayati anestezi acilidir.',
      epidemiology: 'Genel cerrahi popülasyonunda sıklığı %0.2 - %1.7 arasındadır. Ancak aktif astım veya KOAH tanılı olgularda bu oran %4 - %10 seviyesine çıkar. Son 4-6 hafta içinde viral üst solunum yolu enfeksiyonu (ÜSYE) geçiren pediatrik hastalarda reaktivite riski 10 kat artmıştır. Aktif sigara içicilerinde perioperatif bronkospazm riski 5-6 kat daha yüksektir.',
      triggers: [
        'Yüzeyel Anestezi Sırasında Havayolu Manipülasyonu: Laringoskopi, ETT yerleşimi, derin aspirasyon veya LMA takılması',
        'Solunum Yolu İritan Gazları: Desfluran (en potent iritan volatil ajan; ani konsantrasyon artışı şiddetli bronkospazm tetikler), İzofluran (yüksek konsantrasyonda)',
        'Histamin Salınımına Yol Açan İlaçlar: Atrakuryum, Mivakuryum, Morfin, Meperidin',
        'Mekanik ve Fiziksel Uyarılar: Karinanın tüp ucuyla uyarılması, soğuk ve kuru medikal gazlar, sekresyon birikimi',
        'Aspirasyon: Mide içeriğinin (asit/partikül) trakeobronşiyal ağaca kaçması (Mendelson sendromu)',
        'İmmünolojik / İlaç Reaksiyonları: Tip I IgE aracılı anafilaksi (antibiyotikler, kas gevşeticiler, lateks, klorheksidin)',
        'Cerrahi Visseral Refleksler: Peritoneal traksiyon, mezenter çekilmesi veya servikal dilatasyon'
      ],
      safeAgents: [
        'Volatil Anestezikler: Sevofluran (mükemmel bronkodilatör etki, minimal havayolu iritasyonu, indüksiyonda ve bronkospazmda altın standart)',
        'İntravenöz Hipnotikler & İndüksiyon: Propofol (vagal tonusu baskılar, bronkodilatasyon sağlar), Ketamin (güçlü sempatomimetik etki ve direkt bronkodilatör; hemodinamisi bozuk bronkospazmda 1. tercih)',
        'Histamin Salmayan Kas Gevşeticiler: Rokuronyum (sıfır histamin salınımı, bronkospazm riskinde en güvenli NMB), Sisatrakuryum, Vekuronyum',
        'Lokal Anestezikler: İntravenöz Lidokain (1-1.5 mg/kg IV; trakeobronşiyal irritasyon reflekslerini ve bronkospazmı güçlü biçimde bloke eder)',
        'Opioidler: Fentanil, Remifentanil, Sufentanil (klinik dozlarda histamin salmazlar)',
        'Spesifik NMB Geri Çevirici: Sugammadeks (kolinerjik muskarinik yan etki oluşturmadan Rokuronyumu nötralize eder; Neostigmin ise bronkokonstriksiyon yapabileceğinden atropinsiz verilmemelidir)'
      ],
      mortalityStats: 'Zamanında müdahale edilmediğinde dakikalar içinde ağır refrakter hipoksemi, hiperkapnik asidoz, tansiyon pnömotoraks (barotravma) veya kardiyovasküler kollaps (aşırı intratorasik basınç nedeniyle venöz dönüşün sıfırlanması) sonucu mortalite ve hipoksik beyin hasarı riski %15-20\'ye ulaşabilir.',
      clinicalUrgency: 'Ameliyathanede tepe basınçlarının 40-50 cmH2O üzerine fırladığı, ekspiratuar gaz çıkışının durma noktasına geldiği anlarda saniyeler içinde mekanik nedenlerin dışlanması ve farmakolojik gevşemenin sağlanması gereken akut krizdir.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'İntraoperatif bronkospazm tanısı; yükselen tepe inspiratuar basıncı (Ppeak), normal veya hafif artmış plato basıncı (Pplat) arasındaki açılma, kapnografideki karakteristik köpekbalığı sırtı (shark-fin) eğrisi ve akciğer oskültasyonundaki ekspiratuar vizing bulgularının birleşimiyle saniyeler içinde konulur.',
      clinicalCriteria: [
        'Tepe İnspiratuar Basıncında (PIP) Ani ve Belirgin Artış (> 40 - 50 cmH2O) ve Tidal Volümde Çöküş',
        'Plato Basıncı Normal Kalırken (Pplat < 25-30) Direnç Basıncının (Ppeak - Pplat) Aşırı Açılması (Havayolu Rezistans Sorunu)',
        'Kapnografide Tipik "Köpekbalığı Yüzgeci" (Shark-Fin) Dalga Formu (Faz II ekspiratuar eğiminde gecikme ve dikleşen Faz III açısı)',
        'Manüel Ventilasyonda Balon Direncinde Aşırı Sertleşme ("Tahta Torba" Hissi)',
        'Akciğer Oskültasyonunda Yaygın Uzamış Ekspiratuar Vizing (Wheezing)',
        'Ağır Olgularda Paradoksal "Sessiz Akciğer" (Silent Chest - hava hareketi olmadığı için vizing dahi duyulamaz!)',
        'SpO2 Düşüşü (Desatürasyon) ve Arteryel Kan Gazında Akut Solunumsal Asidoz (pH < 7.20, PaCO2 > 60-70 mmHg)'
      ],
      gradingScaleTitle: 'Bronkospazm Klinik Şiddet ve Ventilasyon Skalası',
      gradingScaleSource: 'British Thoracic Society (BTS) & Perioperative Airway Guidelines',
      larachScale: [
        { category: 'Hafif (Grade 1)', points: 'Ppeak 30-35 cmH2O', description: 'Hafif ekspiratuar vizing, kapnografide hafif eğim, SpO2 > %94, balon ventilasyonunda hafif direnç artışı.' },
        { category: 'Orta (Grade 2)', points: 'Ppeak 36-45 cmH2O', description: 'Belirgin vizing, uzamış ekspiratuar faz, kapnografide belirgin shark-fin, SpO2 %90-94, manüel torbada hissedilir sertlik.' },
        { category: 'Şiddetli (Grade 3)', points: 'Ppeak 46-55 cmH2O', description: 'Derin vizing, ekspiryum bitmeden yeni soluk başlama eğilimi (oto-PEEP), SpO2 < %90, PaCO2 > 55 mmHg, taşikardi, hemodinamik labilite.' },
        { category: 'Yaşamı Tehdit Eden (Grade 4)', points: 'Ppeak > 55 cmH2O / Silent Chest', description: '"Sessiz Akciğer" (vizing kaybolmuştur, hava hareketi yok!), göğüs hareketi asgari, derin hipoksemi (SpO2 < %80), hiperkapnik koma, bradikardi ve PEA arrest riski.' }
      ],
      larachInterpretation: 'Grade 3 ve 4 olgularda zaman kaybetmeden parenteral bronkodilatörler (Adrenalin, Magnezyum) ve derin anesteziye geçilmeli, ventilasyon frekansı derhal 6-8/dk\'ya çekilmelidir.',
      differentialDiagnosis: [
        { condition: 'Endotrakeal Tüp Tıkanması / Kıvrılması / Isırılması', differentiatingFactors: 'Aspirasyon sondası tüpün içinden rahatça ilerletilemez; tüp kateteri geçerse mekanik tıkanıklık dışlanır.' },
        { condition: 'Endobronşiyal (Tek Taraflı) Derin Entübasyon', differentiatingFactors: 'Tüpün sağ ana bronşa kaçması tepe basıncını fırlatır; oskültasyonda solunum sesleri sol hemitoraksta tamamen kaybolur. Tüp 2-3 cm geri çekilince basınçlar normale döner.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum sesi yokluğu, trakeal deviasyon, perküsünde hipersonorite, ani taşikardi ve derin hipotansiyon. Göğüs tüpü / iğne dekompresyonu gerekir.' },
        { condition: 'Akut Akciğer Ödemi / Aspirasyon', differentiatingFactors: 'Yaygın krepitan ronküsler, ETT içerisinden pembe köpüklü sıvı veya mide içeriğinin gelmesi.' },
        { condition: 'Göğüs Duvarı Rijiditesi (Wooden Chest)', differentiatingFactors: 'Hızlı yüksek doz fentanil/alfentanil/remifentanil sonrası toraks kompliyansının sıfırlanması; kas gevşetici veya Nalokson ile saniyeler içinde düzelir.' },
        { condition: 'Anafilaktik Şok', differentiatingFactors: 'Bronkospazma eşlik eden derin ve refrakter hipotansiyon, ürtiker/anjiyoödem, eritem, plazma triptaz artışı.' },
        { condition: 'Laringospazm', differentiatingFactors: 'Sadece entübe OLMAYAN spontan soluyan hastada görülür (ekstratorasik üst havayolu obstrüksiyonu, inspiratuar stridor).' }
      ]
    },

    // 4) Acile Spesifik Akut Kriz Yönetimi
    crisisManagement: {
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: '%100 Oksijen & Cerrahı Durdur',
          action: 'FiO2 derhal 1.0 (%100 O2) yapın, taze gaz akışını artırın (>10 L/dk). Cerrahı bilgilendirerek cerrahi manipülasyonu, peritoneal traksiyonu ve laparoskopik gaz insüflasyonunu geçici olarak durdurmasını isteyin.',
          criticalNote: 'Hipoksemi dakikalar içinde bradikardiye yol açabilir; ilk saniyede %100 oksijen şarttır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'Ventilatörden Manüel Balon Ventilasyonuna Geç',
          action: 'Mekanik ventilatörü devreden çıkarıp anestezi balonuna geçin. Torbadaki direnci elinizle hissedin; ekspirasyonun tam olarak bitip bitmediğini ve göğsün pasif inişini gözleyin.',
          criticalNote: 'Manüel torba hissi rezistans artışını ve dinamik gaz hapsini (oto-PEEP) en hızlı fark etme yoludur.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'Mekanik Tıkanıklıkları Ekarte Et',
          action: 'Endotrakeal tüpün bükülüp bükülmediğini, hastanın tüpü ısırıp ısırmadığını kontrol edin. ETT içine kalın bir aspirasyon sondası sokarak tüp açıklığını test edin ve varsa sekresyonu aspire edin. Akciğerleri iki taraflı dinleyerek tüpün sağ ana bronşa kaçmadığından emin olun.',
          criticalNote: 'Tüp kateteri rahatça geçiyorsa mekanik obstrüksiyon ekarte edilir; bronkospazm kesinleşir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'Anesteziyi Derinleştir (Sevofluran / Propofol / Ketamin)',
          action: 'Eğer hasta hemodinamik olarak stabilse Sevofluran konsantrasyonunu açın (volatil bronkodilatasyon). Hemodinami sınırda ise Propofol (0.5-1 mg/kg IV) veya Ketamin (0.5-1 mg/kg IV) bolus uygulayın. DİKKAT: Desfluran hava yollarını aşırı irrite eder, ASLA KULLANMAYIN!',
          criticalNote: 'Desfluran açık ise DERHAL KAPATILMALI ve devre taze gazla yıkanmalıdır!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'İnhaler Kısa Etkili Beta-2 Agonist (Salbutamol) Uygula',
          action: 'Anestezi devresine yerleştirilmiş MDI adaptörü (inhaler elbow) aracılığıyla Salbutamol (Ventolin) MDI tüpünden ETT içine 8 - 10 puf sıkın. Her puf sonrası torbayı yavaşça sıkarak ilacın perifere ulaşmasını sağlayın ve ekspirasyona izin verin.',
          criticalNote: 'Entübe hastada ilacın büyük kısmı tüp cidarına yapışır; 1-2 puf YETERSİZDİR, en az 8-10 puf gereklidir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'Ventilasyon Mekaniğini Optimize Et (Oto-PEEP\'i Önle)',
          action: 'Solunum frekansını 6 - 8 soluk/dakika seviyesine düşürün. İnspiratuar / Ekspiratuar oranını (I:E) 1:3 - 1:5 olacak şekilde uzatın. Dış PEEP\'i kapatın (0 cmH2O). Ekspiratuar gaz akımının kapnografide sıfıra indiğini görmeden yeni soluk başlatmayın.',
          criticalNote: 'Yüksek frekans hava hapsine (dinamik hiperenflasyon) ve venöz dönüşün çökmesine yol açar.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'İkinci Basamak & Refrakter Kurtarma İlaçları',
          action: 'Salbutamole yanıt yetersizse vakit kaybetmeden İntravenöz Magnezyum Sülfat (40-50 mg/kg, 2 g IV 15-20 dakikada infüzyon) uygulayın. Şiddetli ve "Sessiz Akciğer" tablosunda İntravenöz Adrenalin titrasyonuna (10-50 mcg IV bolus veya 0.05-0.2 mcg/kg/dk infüzyon) geçin. Enflamasyonu baskılamak için IV Metilprednizolon (1-2 mg/kg) ekleyin.',
          criticalNote: 'Refrakter bronkospazmda Adrenalin hayat kurtarır; vermekte tereddüt edilmemelidir.',
          priority: 'CRITICAL'
        }
      ],
      bronchospasmProtocols: {
        ventilatorOptimization: {
          title: 'Bronkospazmda Koruyucu ve Hava Hapsini Önleyici Ventilasyon Prensipleri',
          settings: [
            { parameter: 'Solunum Hızı (Frekans)', recommendation: '6 - 8 soluk/dakika', rationale: 'Ekspirasyon süresini maksimuma çıkararak sıkışan havanın boşalmasını sağlar; oto-PEEP gelişimini önler.' },
            { parameter: 'I:E Oranı', recommendation: '1:3 - 1:5', rationale: 'Ekspiratuar fazı belirgin uzatarak hava yolu daralmasına rağmen gazın tamamen dışarı atılmasına olanak tanır.' },
            { parameter: 'Tidal Volüm', recommendation: '6 - 8 mL/kg (ideal kilo)', rationale: 'Yüksek hacimler barotravma riskini katlar; düşük-orta volüm tercih edilir.' },
            { parameter: 'Ekstrinsik PEEP', recommendation: '0 cmH2O (veya < 3 cmH2O)', rationale: 'Bronkospazmda hastanın kendi intrinsik oto-PEEP\'i zaten yüksektir; ek PEEP intratorasik basıncı patlatabilir.' },
            { parameter: 'İnspiratuar Akım Hızı', recommendation: 'Yüksek akım (60-80 L/dk)', rationale: 'İnspirasyon süresini kısaltarak ekspirasyona daha fazla zaman bırakır.' }
          ],
          autoPeepReleaseManeuver: 'Aşırı dinamik hiperenflasyon ve hipotansiyon geliştiğinde: Ventilatör devresi hastanın ETT tüpünden 10-15 saniye boyunca tamamen ayrılır. Her iki elle göğüs kafesine nazikçe ekspirasyon baskısı yapılarak sıkışmış gaz boşaltılır. İntratorasik basınç düşer düşmez venöz doluş düzelir ve tansiyon saniyeler içinde toparlar.'
        },
        stepwisePharmacotherapy: [
          {
            step: '1. Basamak (İnhaler Beta-2 Agonist)',
            drug: 'Salbutamol (Ventolin MDI)',
            dosage: '8 - 10 puf (ETT adaptörü ile)',
            route: 'İnhalasyon / ETT İçi',
            clinicalPearls: 'Her puf arasında torbayla yavaş derin nefes verilmeli. 10-15 dakikada bir tekrarlanabilir.'
          },
          {
            step: '2. Basamak (Bronş Düz Kas Gevşetici)',
            drug: 'Magnezyum Sülfat (%15)',
            dosage: '40 - 50 mg/kg (Maksimum 2.0 - 2.5 g)',
            route: 'İntravenöz İnfüzyon (15-20 dk)',
            clinicalPearls: 'Hücre içi kalsiyum girişini bloke eder, asetilkolin salınımını baskılar. Güçlü bronkodilatördür.'
          },
          {
            step: '3. Basamak (Sempatomimetik Hipnotik)',
            drug: 'Ketamin IV',
            dosage: '0.5 - 1.0 mg/kg bolus',
            route: 'İntravenöz Bolus',
            clinicalPearls: 'Endojen katekolamin deşarjı sağlar, bronş düz kasını doğrudan gevşetir. Hemodinamik şokta idealdir.'
          },
          {
            step: '4. Basamak (Hayati Kurtarma Ajanı)',
            drug: 'Adrenalin (Epinefrin)',
            dosage: '10 - 50 mcg IV bolus / 0.05 - 0.2 mcg/kg/dk inf.',
            route: 'İntravenöz Titrasyon',
            clinicalPearls: 'Sessiz akciğer ve refrakter bronkospazmda altın standarttır. Güçlü beta-2 bronkodilatasyon + mukozal ödem geriletme.'
          },
          {
            step: 'Erken Destek (Antiinflamatuar)',
            drug: 'Metilprednizolon / Hidrokortizon',
            dosage: 'Metilprednizolon 1-2 mg/kg IV (veya Hidrokortizon 100-200 mg)',
            route: 'İntravenöz',
            clinicalPearls: 'Etkisi 2-4 saatte başlar; gecikmiş fazı ve nüksü önlemek için ilk yarım saatte verilmelidir.'
          }
        ],
        refractoryRescuePlan: [
          'Hemen kardiyak arrest arabasını ve defibrilatörü odaya getirtin.',
          'Hastayı ventilatörden ayırıp apneik toraks dekompresyonu yapın (oto-PEEP boşaltımı).',
          'Adrenalin 100 mcg IV bolus yapın; yanıt yoksa arrest dozu (1 mg IV) hazırlayın.',
          'Parenteral Aminofilin yükleme dozu (5 mg/kg IV 20-30 dakikada) düşünün (aritmi takibi şartıyla).',
          'Tansiyon pnömotoraks şüphesinde bilateral 2. interkostal aralık midklaviküler hattan iğne dekompresyonu yapın.',
          'Tüm farmakoterapiye yanıtsız uç vakalarda VV-ECMO (Ekstrakorporeal Membran Oksijenasyonu) konsültasyonu isteyin.'
        ]
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'Bronkospazm; trakeobronşiyal otonom dengenin parasempatik (vagal) kolinerjik yöne kayması, bronş düz kas hücrelerindeki muskarinik M3 reseptörlerinin uyarılması ve hücre içi kalsiyum salınımının patlaması ile karakterizedir. Bronş lümeni daraldığında Poiseuille Yasası gereği hava yolu direnci yarıçapın dördüncü kuvvetiyle ters orantılı olarak katlanarak fırlar.',
      stepsTitle: 'Hava Yolu Daralması & Dinamik Hiperinflasyon Mekanizması',
      cascadeSteps: [
        {
          phase: '1. Tetikleyici ve Vagal Uyarım',
          mechanism: 'Yüzeyel anestezi, mekanik trakeal irritasyon (ETT) veya volatil iritasyon (Desfluran) afferent vagal lifleri uyarır; asetilkolin deşarjı tetiklenir.'
        },
        {
          phase: '2. Hücre İçi Kalsiyum Patlaması',
          mechanism: 'Asetilkolin bronş düz kasındaki M3 reseptörlerine bağlanır; Fosfolipaz C aktive olarak IP3 üretir ve sarkoplazmik retikulumdan masif Ca2+ salınır.'
        },
        {
          phase: '3. Poiseuille Direnç Fırtınası',
          mechanism: 'Kalsiyum-kalmodulin kompleksi miyozin hafif zincir kinazı (MLCK) aktive eder; bronş lümeni %50 daraldığında hava yolu direnci 16 kat (2⁴) artar!'
        },
        {
          phase: '4. Ekspiratuar Akım Kısıtlanması & Oto-PEEP',
          mechanism: 'Direnç nedeniyle hava dışarı çıkamaz; ekspiryum bitmeden yeni soluk başlar. Akciğerlerde aşırı hava hapsi (dinamik hiperenflasyon) oluşur.'
        },
        {
          phase: '5. Venöz Dönüş Çöküşü & Hipotansiyon',
          mechanism: 'Fırlayan intratorasik basınç vena cava inferioru ezer; sağ kalbe venöz dönüş (preload) çöker, kardiyak debi düşer ve pulsus paradoksus / arrest gelişir.'
        }
      ],
      summaryText: 'Özetle bronkospazm sadece bir ventilasyon güçlüğü değil, Poiseuille kanunuyla hava yolu direncini fırlatan, dinamik hiperenflasyonla sağ kalbe kan dönüşünü engelleyerek kardiyovasküler kollapsa neden olan çok yönlü bir kardiyopulmoner krizdir.'
    },

    // 6) Klinik Özellikleri & Prezentasyonu
    presentation: {
      earlySigns: [
        'Tepe İnspiratuar Basıncında (PIP) Ani Yükselme (> 35 - 40 cmH2O)',
        'Kapnografi Dalga Formunda Faz II Eğiminde Uzama ve Dikleşen Faz III ("Köpekbalığı Yüzgeci" / Shark-Fin Deseni)',
        'Oskültasyonda Yüksek Perdeli Ekspiratuar Vizing (Wheezing)',
        'Tidal Volümde Düşüş ve Hafif Desatürasyon Başlangıcı (SpO2 %92-94)'
      ],
      progressingSigns: [
        'Manüel Balon Ventilasyonunda Şiddetli Sertleşme ("Tahta Torba" Hissi, havalandırma güçlüğü)',
        'Ekspiratuar Fazın Belirgin Uzaması (Ekspiryum sesleri inspiryumdan 3-4 kat uzun)',
        'Taşikardi ve Hipertansiyon (Akut hiperkapniye bağlı masif sempatik deşarj)',
        'Belirgin Desatürasyon (SpO2 < %90) ve Karbondioksit Retansiyonu (EtCO2 > 55 mmHg)'
      ],
      lateSigns: [
        '"Sessiz Akciğer" (Silent Chest): Vizing dahi duyulamaz, hava akımı tamamen durmuştur!',
        'Ağır Refrakter Hipoksemi (SpO2 < %75) ve Siyanoz',
        'Akut Respiratuar ve Metabolik Asidoz (pH < 7.10, PaCO2 > 70-80 mmHg)',
        'Hava Hapsine (Oto-PEEP) Bağlı İntratorasik Basınç Artışı ve Şiddetli Hipotansiyon',
        'Bradikardi, Ciddi Aritmiler ve Nabızsız Elektriksel Aktivite (PEA) Kardiyak Arrest'
      ],
      specialAlertTitle: 'Ölümcül Klinik Tuzak: "Sessiz Akciğer" (Silent Chest)',
      specialAlertContent: 'Bronkospazmlı bir hastada ekspiratuar vizing seslerinin aniden kaybolması HASTANIN İYİLEŞTİĞİNİ GÖSTERMEZ! Aksine bronş lümeninin ses üretemeyecek kadar kritik seviyede daraldığını ve hava akımının tamamen durduğunu kanıtlar. Bu aşamada hasta acil parenteral Adrenalin ve göğüs dekompresyonu yapılmazsa dakikalar içinde arrest olur!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Astım & KOAH Kontrolü: Hastanın son 1 ayda kurtarıcı inhaler ihtiyacı, gece uyanmaları ve egzersiz kısıtlılığı sorgulanmalıdır.',
        'Son 4-6 Haftada Viral ÜSYE Öyküsü: Özellikle çocuklarda ÜSYE sonrası hava yolu hiperreaktivitesi 6 haftaya kadar sürer; elektif cerrahiler ertelenmelidir.',
        'Sigara Öyküsü: Elektif cerrahiden en az 4-8 hafta önce sigaranın kesilmesi bronşiyal sekresyonu ve reaktiviteyi anlamlı azaltır.',
        'Önceki Anestezi Deneyimleri: Geçmiş operasyonlarda entübasyon/ekstübasyon sonrası bronkospazm veya laringospazm öyküsü mutlaka araştırılmalıdır.',
        'Preoperatif İlaç Optimizasyonu: Hastanın idame inhalerlerine ameliyat sabahına kadar devam ettirilmesi sağlanmalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Havayolu Hiperreaktivitesi Olan Hastada Anestezi & Cihaz Hazırlık Protokolü',
        steps: [
          'Preoperatif Profilaksi: Elektif astım/KOAH hastalarına ameliyathaneye alınmadan 30-40 dakika önce 2-4 puf Salbutamol inhalasyonu yaptırın.',
          'İnhaler Adaptörü (Elbow Spacer): ETT ile ventilatör devresi arasına MDI ölçülü doz inhaler adaptörünü indüksiyon öncesinde monte edin.',
          'Acil İlaç Çekimi: İntravenöz Magnezyum Sülfat (2 g) ve sulandırılmış Adrenalin (10 mcg/mL hazır enjektör) ameliyat masasında hazır bulundurun.',
          'İndüksiyonda Derin Plana Geçiş: İndüksiyon ajanı olarak bronkodilatör etkili Propofol veya Ketamin tercih edin; yetersiz dozda yüzeyel entübasyondan kaçının.',
          'Lidokain Profilaksisi: Entübasyondan 90 saniye önce İntravenöz Lidokain (1-1.5 mg/kg IV) uygulayarak laringeal/trakeal refleksleri köreltin.',
          'Havayolu Aracı Seçimi: Mümkün olan cerrahilerde endotrakeal tüp yerine Laringeal Maske (LMA) tercih edin (LMA trakeal karinayı uyarmaz, bronkospazm riski %70 daha düşüktür).',
          'Desflurandan Kaçınma: İdame anestezisinde Sevofluran tercih edin; Desfluran kesinlikle kullanılmamalıdır.'
        ]
      },
      cartChecklist: [
        'ETT Uyumlu MDI Ara Adaptörü (Inhaler Spacer / Elbow)',
        'Salbutamol MDI (Ventolin İnhaler Tüpü - En az 1 dolu kutu)',
        'Magnezyum Sülfat %15 Flakon (2-3 adet)',
        'Adrenalin (Epinefrin) 1 mg/mL Ampul (En az 5 adet) & 10 mcg/mL sulandırma kiti',
        'Ketamin 50 mg/mL Flakon',
        'Metilprednizolon (Prednol) 250 mg Flakon',
        'Aminofilin 250 mg Ampul',
        'Steril Trakeal Derin Aspirasyon Kateterleri (Ch 12-14-16) ve Mukus Tıkaç Aspiratörü'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'İntraoperatif orta veya ağır bronkospazm geçiren hastalar, ekstübe edilseler dahi en az 4-6 saat boyunca Derlenme Ünitesinde (PACU) veya Yoğun Bakım Ünitesinde (YBÜ) yakın monitorizasyon altında tutulmalıdır.',
      recurrenceRiskBadge: 'BİFAZİK / REBOUND RİSKİ',
      recurrenceRate: 'Akut kriz çözüldükten sonraki ilk 2-4 saat içinde reaktif bronkospazm alevlenmesi görülebilir. Postoperatif dönemde nebülize bronkodilatörler ve solunum parametreleri yakından izlenmelidir.',
      maintenanceTherapy: 'Postoperatif dönemde her 4-6 saatte bir nebülize Salbutamol (2.5 mg) + İpratropium bromür (0.5 mg) idame ettirilmeli; IV Metilprednizolon (40-80 mg/gün) en az 24-48 saat sürdürülmelidir.',
      monitoringParameters: [
        'Sürekli Nabız Oksimetresi (SpO2) ve Solunum Sayısı',
        'Solunum Eforu ve Yardımcı Solunum Kasları Katılımı (İnterkostal çekilmeler)',
        'Akciğer Dinleme Bulguları (Rezidüel vizing ve hava giriş simetrisi)',
        'Seri Arteryel Kan Gazı (PaO2, PaCO2 ve solunumsal asidoz rezolüsyonu)',
        'Hemodinamik Stabilite ve Taşikardi / Aritmi İzlemi'
      ],
      expectedComplications: [
        'Barotravma: Alveoler rüptüre bağlı Tansiyon Pnömotoraks, Pnömomediastinum, Cilt Altı Amfizemi',
        'Post-Obstrüktif Pulmoner Ödem (NPPE / Negatif Basınçlı Akciğer Ödemi)',
        'Atelektazi ve Mukus Tıkaçlarına Bağlı Lober Kollaps',
        'Miyokard İskemisi ve Taşiaritmiler (Yüksek sempatik stres ve beta agonist kullanımına bağlı)'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Yatak Başı Akciğer Grafisi (PA)', description: 'Barotravma (pnömotoraks), atelektazi, aspirasyon infiltrasyonu veya hiperenflasyon varlığını dışlamak için derhal çekilmelidir.' },
        { testName: 'Seri Arteryel Kan Gazı Analizi', description: 'Karbondioksit retansiyonunun (PaCO2) normale döndüğünü ve solunumsal asidozun çözüldüğünü belgeler.' },
        { testName: 'Göğüs Hastalıkları & İmmünoloji Konsültasyonu', description: 'Tetikleyici faktörlerin netleştirilmesi ve taburculuk inhaler tedavisinin optimizasyonu.' }
      ],
      prognosisSummary: 'Erken fark edilip adım adım protokol eksiksiz uygulandığında bronkospazm vakalarının > %95\'i kalıcı pulmoner hasar kalmaksızın tamamen iyileşir. Geciken veya sessiz akciğer aşamasında tanınamayan olgularda barotravma ve hipoksik nörolojik hasar riski yüksektir.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Ölümcül Sessiz Akciğer Tuzağı (Silent Chest)',
        takeaway: 'Bronkospazm esnasında vizing sesinin aniden kaybolması hastanın düzeldiğini değil, kritik obstrüksiyon nedeniyle akciğerde hava hareketinin tamamen bittiğini gösterir. En ölümcül klinik ve sınav tuzağıdır!',
        category: 'Tuzak'
      },
      {
        title: 'Desfluran Kesin Kontrendikasyonu',
        takeaway: 'Desfluran bronş mukozasındaki iritan reseptörleri en güçlü uyaran volatil ajandır; akut bronkospazmı derinleştirir. Bronkospazm anında volatil ajan gerekiyorsa TEK DOĞRU SEÇENEK Sevofluran\'dır.',
        category: 'Tuzak'
      },
      {
        title: 'Ppeak vs Pplat Rezistans Ayrımı',
        takeaway: 'Bronkospazmda hava yolu rezistansı arttığı için Tepe Basıncı (Ppeak) fırlar fakat Plato Basıncı (Pplat) normal veya hafif artmıştır (Ppeak - Pplat farkı > 15 cmH2O). Eğer her ikisi de paralel yükseliyorsa sorun bronkospazm değil, kompliyans kaybıdır (Pnömotoraks, atelektazi, Trendelenburg).',
        category: 'Ezber Bozan'
      },
      {
        title: 'Oto-PEEP & Apneik Boşaltma Manevrası',
        takeaway: 'Hava hapsine (dinamik hiperenflasyon) bağlı intratorasik basınç fırlayıp tansiyon çöktüğünde ventilatör devresini ETT\'den 10-15 saniye tamamen ayırıp toraksı elle pasif boşaltmak venöz doluşu ve tansiyonu anında düzeltir!',
        category: 'Kritik Doz'
      },
      {
        title: 'Beta-Bloker Ölümcül Yasağı',
        takeaway: 'Bronkospazm ve hiperkapniye bağlı gelişen kompanzatuar taşikardiyi kırmak amacıyla ASLA Esmolol, Metoprolol veya Labetalol vermeyin; akut hava yolu obstrüksiyonunu asfiksi seviyesine tırmandırır!',
        category: 'Tuzak'
      },
      {
        title: 'Entübe Hastada MDI Doz Tuzağı',
        takeaway: 'Entübe hastada ETT içine MDI uygulandığında aerosolün %80-90\'ı tüp cidarında kaybolur. Bu nedenle ayaktan hastadaki 1-2 puf asla yetmez; ameliyathanede en az 8 - 10 puf uygulanmalıdır.',
        category: 'Kritik Doz'
      }
    ],

    // 10) Kullanılan Kaynaklar & İleri Okuma
    references: [
      {
        authors: 'British Thoracic Society (BTS) & Scottish Intercollegiate Guidelines Network (SIGN).',
        title: 'British guideline on the management of asthma: Perioperative and acute crisis recommendations.',
        journal: 'Thorax. 2022;77(Suppl 1):1-140.',
        year: '2022',
        relevance: 'Akut bronkospazm basamaklı farmakoterapisi, MDI uygulama ilkeleri ve perioperatif risk optimizasyonu.'
      },
      {
        authors: 'Woods BD, Sladen RN.',
        title: 'Perioperative considerations for the patient with asthma and bronchospasm.',
        journal: 'British Journal of Anaesthesia (BJA). 2009;103(Suppl 1):i57-i65.',
        year: '2009',
        relevance: 'İntraoperatif hava yolu reaktivitesi fizyolojisi, volatil ajanların bronkodilatör etkileri ve Poiseuille dinamiği.'
      },
      {
        authors: 'Dewachter P, Kopac P, Laguna JJ, et al.',
        title: 'Anaesthesia-related anaphylaxis and severe acute bronchospasm: Management and investigation.',
        journal: 'Anesthesiology. 2019;131(4):721-739.',
        year: '2019',
        relevance: 'Bronkospazmın anafilaksi ile ayırıcı tanısı, intravenöz Adrenalin titrasyonu ve serum triptaz protokolü.'
      },
      {
        authors: 'Gal TJ, Miller RD.',
        title: 'Chronic Pulmonary Disease and Acute Airway Reactivity in Anesthesia.',
        journal: 'Miller\'s Anesthesia (9th Edition), Chapter 68, Elsevier.',
        year: '2020',
        relevance: 'Standart anestezi referans kitabında oto-PEEP dinamikleri, ventilatör ayarları ve ilaç dozları.'
      },
      {
        authors: 'Hedenstierna G, Edmark L.',
        title: 'Mechanisms of atelectasis and gas trapping in the anesthetized patient.',
        journal: 'Current Opinion in Anaesthesiology. 2021;34(1):15-22.',
        year: '2021',
        relevance: 'Dinamik hiperenflasyon, ekspiratuar akım kısıtlanması ve oto-PEEP dekompresyon manevraları.'
      }
    ]
  },

  'laryngospasm': {
    id: 'laryngospasm',
    // 1) Başlık
    title: 'Perioperatif Akut Laringospazm Kriz Protokolü',
    subTitle: 'Glottik Kapanma, İnspiratuar Stridor & Negatif Basınçlı Pulmoner Ödem (NPPE) Acil Yönetimi',
    codeColor: 'rose',
    severityBadge: 'KOD KIRMIZI · AKUT HAVAYOLU OBSTRÜKSİYONU',
    keyCallout: 'FiO2 %100 yapın, sıkı maske ile 10-20 cmH2O CPAP uygulayın, Larson Çentik Manevrası yapın, farenksi nazikçe aspire edin, Propofol (0.5-1 mg/kg IV) verin. Çözülmezse derhal sub-paralitik Süksinilkolin (0.1-0.5 mg/kg IV veya 3-4 mg/kg IM) + Atropin uygulayın!',
    quickCalculatorType: 'laryngospasm',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Laringospazm; süperior laringeal sinir uyarımı ile vokal kordların (gerçek ve yalancı kordlar, ariepiglottik kıvrımlar) istemsiz, şiddetli ve tam/kısmi kapanması sonucu üst solunum yolunun tamamen tıkanması ve hava akımının durması ile karakterize hayati anestezi acilidir.',
      epidemiology: 'Genel anestezi popülasyonunda sıklığı yaklaşık %0.8 - %1 arasındadır. Ancak pediatrik anestezide bu oran %2 - %4\'e, tonsillektomi ve adenoidektomi cerrahilerinde %10 - %25\'e kadar fırlar! Son 2-4 hafta içinde viral üst solunum yolu enfeksiyonu (ÜSYE) geçiren çocuklarda risk 5-10 kat fazladır. Pasif sigara dumanına maruz kalan çocuklarda perioperatif laringospazm insidansı 10 kat artmaktadır.',
      triggers: [
        'Yüzeyel Anestezi Altında Havayolu İrritasyonu: Guedel 2. evresinde (eksitasyon fazı) hastanın laringeal refleksleri hiperaktiftir; bu fazda ekstübasyon veya laringeal manipülasyon spazmı tetikler.',
        'Vokal Kordlara Sekresyon / Kan / Mide İçeriği Teması: Ekstübasyon öncesi temizlenmemiş orofarengeal sekresyonlar glottik adduksiyonu kışkırtır.',
        'Hava Yolu İritan Gazları: Desfluran ve İzofluran (yüzeyel anestezide ani konsantrasyon artışında laringeal spazm riski çok yüksektir).',
        'Cerrahi Ağrılı Uyaranlar: Anestezi derinliği yetersizken yapılan servikal dilatasyon, anal cerrahi, peritoneal çekinti veya ekstremite traksiyonu.',
        'Laringeal Maske (LMA) Çıkarılması: LMA\'nın yetersiz anestezi veya kısmi uyanıklıkta zorlanarak çıkarılması.'
      ],
      safeAgents: [
        'Ekstübasyon Stratejisi: Ya tam uyanık (koruyucu refleksler geri gelmiş, spontan göz açan, düzenli soluyan) ya da tam derin planda (Guedel 3. evre) ekstübasyon altın kuraldır.',
        'İntravenöz Lidokain (1 - 1.5 mg/kg IV): Ekstübasyondan 2-3 dakika önce veya indüksiyonda verildiğinde laringeal refleksleri baskılar, laringospazm insidansını %70 azaltır.',
        'Propofol Bolus (0.5 - 1.0 mg/kg IV): Laringeal kas tonusunu ve faringeal refleksleri saniyeler içinde gevşeten 1. basamak hipnotiktir.',
        'Süksinilkolin (Kırıcı / Sub-paralitik Doz): 0.1 - 0.5 mg/kg IV (vokal kord spazmını kırar, hastayı tam apneye sokmadan spontan solunumu koruyabilir) veya tam doz 1 - 2 mg/kg IV.',
        'Atropin (0.01 - 0.02 mg/kg IV): Özellikle çocuklarda hipoksi ve süksinilkoline bağlı ölümcül bradikardiyi önler, sekresyonları kurutur.',
        'Rokuronyum (0.3 - 0.6 mg/kg IV): Süksinilkolin kontrendike olduğunda (MH yatkınlığı, hiperkalemi, kas distrofisi) tercih edilir; Sugammadeks ile anında geri çevrilebilir.'
      ],
      mortalityStats: 'Laringospazm saniyeler içinde derin hipoksemiye, pediatrik hastalarda hızla bradikardi ve kardiyak arreste yol açar. Ayrıca genç, kaslı erişkinlerde kapalı glottise karşı güçlü inspirasyon eforuna bağlı %10-12 oranında Negatif Basınçlı Pulmoner Ödem (NPPE) gelişir; yoğun bakım yatışı gerektirir.',
      clinicalUrgency: 'Pediatrik olguda 45-60 saniyede SpO2 %98\'den %50\'nin altına inebildiğinden ekip liderliği ve Larson manevrası ile ilk 30 saniyede kırılması gereken en zamana duyarlı hava yolu acilidir.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Laringospazm tanısı; ekspiratuar değil İNSPİRATUAR solunum güçlüğü, stridor (veya tam spazmda sessizlik), paradoksal torakoabdominal solunum ("see-saw" / tahterevalli solunumu) ve kapnografide hava akımının tamamen sıfırlanması ile saniyeler içinde konulur.',
      clinicalCriteria: [
        'İnspiratuar Stridor (Kısmi Laringospazmda Tiz Karga Sesi / Crowing)',
        'Tam Laringospazmda Paradoksal "TAM SESSİZLİK" (Stridor dahi duyulamaz, hava hareketi sıfırdır!)',
        'Paradoksal Torakoabdominal Hareket ("See-Saw" / Tahterevalli Solunumu: Göğüs çökerken karın şişer)',
        'Suprasternal, İnterkostal ve Supraklaviküler Şiddetli İnspiratuar Çekilmeler',
        'Maske ile Balon Ventilasyonunda Tam Geçirimsizlik (Akciğere tek bir mL hava dahi üflenemez)',
        'Kapnografide Ekspiratuar Akımın ve Dalga Formunun Tamamen Kaybolması (EtCO2 = 0 mmHg)',
        'Hızlı ve Derin Desatürasyon (SpO2 saniyeler içinde düşer), Siyanoz, Pediatrik Bradikardi'
      ],
      gradingScaleTitle: 'Laringospazm Klinik Şiddet ve Glottik Kapanma Skalası',
      gradingScaleSource: 'Pediatric Anesthesia Airway Guidelines & Larson Consensus',
      larachScale: [
        { category: 'Kısmi Laringospazm (Grade 1)', points: 'Hafif İnspiratuar Stridor', description: 'Vokal kordlar kısmen kapanmıştır; yüksek perdeli inspiratuar karga sesi duyulur. Minimal hava akımı ve kapnografide cılız dalga vardır.' },
        { category: 'İlerleyen Kısmi Laringospazm (Grade 2)', points: 'Şiddetli Stridor + Çekilme', description: 'Yüksek dirençli stridor, belirgin supraklaviküler/suprasternal çekilme, SpO2 %85-92, torba sıkıldığında aşırı direnç.' },
        { category: 'Tam Laringospazm (Grade 3)', points: 'Tam Sessizlik / Sıfır Akım', description: 'Gerçek ve yalancı kordlar tamamen yapışmıştır; HİÇ SES ÇIKMAZ. Göğüs-karın tahterevalli gibi hareket eder, sıfır hava akımı, SpO2 hızla <%75\'e düşer.' },
        { category: 'Komplikasyonlu Laringospazm (Grade 4)', points: 'NPPE / Hipoksik Arrest', description: 'Kapalı glottise karşı zorlu soluma sonucu Negatif Basınçlı Pulmoner Ödem (pembe köpüklü sekresyon), derin bradikardi, asistoli veya PEA arrest.' }
      ],
      larachInterpretation: 'Grade 3 tam laringospazmda ses duyulmaz! Ses olmaması hastanın rahat nefes aldığı anlamına gelmez. Göğüs kafesi çekilmesine rağmen akım yoksa hemen Larson manevrası ve ilaç tedavisine başlanmalıdır.',
      differentialDiagnosis: [
        { condition: 'Supraglottik Yumuşak Doku Obstrüksiyonu (Dil Kökü Düşmesi)', differentiatingFactors: 'Horlama tarzı kaba ses çıkar; çene itme (jaw-thrust) veya oral/nazal airway takılması ile anında çözülür. Laringospazm ise airway takılsa dahi çözülmez!' },
        { condition: 'Bronkospazm', differentiatingFactors: 'Alt solunum yolu daralmasıdır; patoloji ekspiratuardır (ekspiratuar uzama, wheezing, shark-fin kapnografi). Laringospazmda ise obstrüksiyon ekstratorasik ve İNSPİRATUARDIR.' },
        { condition: 'Larengeal Yabancı Cisim / Sekresyon / Kan Tıkacı', differentiatingFactors: 'Vokal kordlar arasına oturmuş mukus tıkacı veya kan pıhtısı; doğrudan laringoskopi ve aspiratör ucuyla temizlenmelidir.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum sesi yokluğu, trakeal deviasyon, perküsünde hipersonorite, ani taşikardi ve derin hipotansiyon.' },
        { condition: 'Fentanil İndüklü Göğüs Duvarı Rijiditesi', differentiatingFactors: 'Vokal kord spazmı ile birlikte tüm göğüs kafesi ve karın tahta gibi serttir; Nalokson veya NMB ile saniyeler içinde açılır.' }
      ]
    },

    // 4) Acile Spesifik Akut Kriz Yönetimi
    crisisManagement: {
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: '%100 Oksijen Verin ve Yardım Çağırın',
          action: 'FiO2 derhal 1.0 yapın, taze gaz akışını maksimuma çıkarın (>10-15 L/dk). Ameliyathanede ekibe "Laringospazm var, yardım edin" duyurusu yapın. Cerrahı cerrahi uyaranları durdurması için uyarın.',
          criticalNote: 'Hipoksemi dakikalar içinde gelişir; ilk saniyede yüksek akımlı %100 O2 şarttır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'Larson Çentik Manevrası Uygulayın (Laryngospasm Notch)',
          action: 'Her iki elin orta parmaklarını bilateral çene köşesi arkasındaki laringospazm çentiğine (Larson\'s notch) yerleştirin. Anterior ve sefalik yönde şiddetli ağrılı baskı uygularken başı hafifçe ekstansiyona getirin.',
          criticalNote: 'Larson manevrası glossofaringeal ve vagal refleks arkını uyararak vokal kordları farmakoterapiye gerek kalmadan açabilir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'Devamlı Pozitif Hava Yolu Basıncı (CPAP) Uygulayın',
          action: 'Yüze maskeyi iki elle hava kaçağı olmayacak şekilde tam oturtun. APL valfini 20-30 cmH2O\'ya sıkın, rezervuar balonu nazikçe sıkarak 10-15 cmH2O CPAP uygulayın. Vokal kordları pnömatik hava kaması ile aralamaya çalışın.',
          criticalNote: 'Aşırı yüksek basınçlar (> 25 cmH2O) mideyi şişirerek aspirasyon riskini artırır; dikkatli olun.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'Orofarenksi Nazikçe Temizleyin',
          action: 'Görerek ve dikkatle farenksteki kan ve sekresyonları aspire edin. DİKKAT: Körlemesine derin aspirasyon yapmayın; glottisi mekanik olarak uyararak spazmı daha da şiddetlendirebilir.',
          criticalNote: 'Yalnızca orofarenkste görünen sekresyon ve kan pıhtılarını temizleyin.',
          priority: 'HIGH'
        },
        {
          stepNumber: 5,
          title: 'Anesteziyi Derinleştirin (Propofol)',
          action: 'Damar yolu açık ve hemodinami elveriyorsa Propofol (0.5 - 1.0 mg/kg IV) bolus uygulayın. Laringeal kas tonusunu ve hiperaktif refleksleri saniyeler içinde kırar.',
          criticalNote: 'Yüzeyel anesteziden kurtarıp derin plana geçirmek kordları serbestleştirir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'Sub-Paralitik / Kırıcı Doz Süksinilkolin Verin',
          action: 'İlk 30-45 saniyede çözülmezse veya SpO2 düşüşü sürüyorsa, vokal kordları gevşetmek için düşük doz Süksinilkolin (0.1 - 0.5 mg/kg IV) verin. Pediatrik hastada bradikardiyi önlemek için derhal Atropin (0.01 - 0.02 mg/kg IV) ekleyin.',
          criticalNote: '0.2-0.5 mg/kg sub-paralitik doz apne yapmadan vokal kordları anında açar; spontan solunum korunur.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 7,
          title: 'Damar Yolu Yoksa İntramüsküler Kurtarma & Entübasyon',
          action: 'Damar yolu kaybedilmişse Süksinilkolin 3-4 mg/kg İntramüsküler (deltoid veya vastus lateralis) veya İntraosseöz uygulayın. Spazm kırıldıktan sonra hasta hipoksik veya sekresyonlu ise derhal endotrakeal entübasyona geçin.',
          criticalNote: 'İntramüsküler süksinilkolinin etki başlangıcı 2-3 dakikadır; gecikmeden deltoide veya uyluğa yapılmalıdır.',
          priority: 'CRITICAL'
        }
      ],
      laryngospasmProtocols: {
        larsonManeuver: {
          title: 'Larson Çentik Manevrası (Laryngospasm Notch Technique)',
          technique: 'Her iki elin orta parmak uçları, ramus mandibulanın posterior kenarı ile mastoid çıkıntı arasındaki oluğa (Larson çentiği) yerleştirilir. Mandibulayı öne ve yukarı doğru iterken, derin ve ağrılı bir baskı uygulanır (aynı zamanda baş hiperekstansiyona getirilir).',
          physiologicalMechanism: 'Bu manevra iki mekanizmayla hayat kurtarır: 1) Glossopharyngeus ve vagus sinir uçlarının uyarılması ile beyin sapındaki laringeal adduktor motor nöronlar refleks olarak inhibe olur ve vokal kordlar gevşer. 2) Mandibulanın öne çekilmesi ile dil kökü ve epiglot glottisten uzaklaşır.'
        },
        stepwisePharmacotherapy: [
          {
            step: '1. Basamak (Oksijenizasyon & CPAP)',
            drug: '%100 FiO2 + 10-20 cmH2O CPAP',
            dosage: 'Sıkı iki elle maske oturtma',
            route: 'Maske / Balon Devresi',
            clinicalPearls: 'Pnömatik hava kaması oluşturarak vokal kordları mekanik olarak aralar.'
          },
          {
            step: '2. Basamak (Refleks Baskılayıcı Hipnotik)',
            drug: 'Propofol IV',
            dosage: '0.5 - 1.0 mg/kg bolus',
            route: 'İntravenöz',
            clinicalPearls: 'Yüzeyel eksitasyon fazını sonlandırır, larengeal tonusu saniyeler içinde kırar.'
          },
          {
            step: '3. Basamak (Spazm Kırıcı Sub-Paralitik NMB)',
            drug: 'Süksinilkolin (Düşük Doz)',
            dosage: '0.1 - 0.5 mg/kg IV bolus',
            route: 'İntravenöz',
            clinicalPearls: 'Hastayı tam felç etmeden vokal kord adduksiyonunu çözer; spontan solunum dakikalar içinde döner.'
          },
          {
            step: 'Eş Zamanlı Pediatrik Koruma',
            drug: 'Atropin Sülfat',
            dosage: '0.01 - 0.02 mg/kg IV (Maks 0.5 mg)',
            route: 'İntravenöz',
            clinicalPearls: 'Hipoksi ve süksinilkolinin indüklediği ölümcül bradikardi ve asistoliyi önler.'
          },
          {
            step: '4. Basamak (Damar Yolu Yoksa Acil IM)',
            drug: 'Süksinilkolin İntramüsküler',
            dosage: '3.0 - 4.0 mg/kg IM (Vastus lateralis/Deltoid)',
            route: 'İntramüsküler',
            clinicalPearls: 'Damar yolu olmayan çocukta hayat kurtarır; etki 2-3 dakikada başlar.'
          },
          {
            step: 'Alternatif Non-Depolarizan Ajan',
            drug: 'Rokuronyum IV',
            dosage: '0.3 - 0.6 mg/kg IV',
            route: 'İntravenöz',
            clinicalPearls: 'Süksinilkolin kontrendike ise (MH öyküsü, hiperkalemi) verilir; Sugammadeks ile anında geri çevrilir.'
          }
        ],
        nppeManagement: [
          'Laringospazm çözüldükten hemen sonra hastanın ağzından/tüpünden pembe köpüklü sıvı gelip gelmediğini kontrol edin.',
          'Negatif Basınçlı Pulmoner Ödem (NPPE) gelişirse derhal 5-10 cmH2O PEEP / CPAP ve %100 oksijene geçin.',
          'Diyüretik (Furosemid) genelde gerekmez; problem aşırı sıvı yükü değil, negatif intratorasik basınç kaynaklı kapiller sızıntıdır.',
          'Hastayı ekstübe etmeden önce akciğer grafisi çekin ve en az 3-4 saat PACU/YBÜ\'de yakın oksijenizasyon takibine alın.'
        ]
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'Laringospazm; üst solunum yolunu aspirasyondan korumak için evrimleşmiş koruyucu glottik kapanma refleksinin yüzeyel anestezi altında kontrolsüz, abartılı ve hayatı tehdit edici bir spazma dönüşmesidir. Süperior laringeal sinir afferentleri ile rekürren laringeal sinir motor efferentleri larenks adduktor kaslarını (lateral krikoaritenoid, transvers aritenoid, krikotiroid) kasarak hava yolunu tamamen kilitler.',
      stepsTitle: 'Laringeal Refleks Arkı & Glottik Kapanma Basamakları',
      cascadeSteps: [
        {
          phase: '1. Mukozal İrritasyon & SLN Uyarımı',
          mechanism: 'Orofarenksteki kan, sekresyon, laringoskop palası veya iritan gaz süperior laringeal sinir iç dalının duyusal liflerini uyarır.'
        },
        {
          phase: '2. Medullar Vagal Refleks Arkı',
          mechanism: 'Duyusal sinyal beyin sapındaki nükleus ambiguusa ulaşır ve adduktor motor nöronlar kontrolsüz biçimde ateşlenir.'
        },
        {
          phase: '3. Glottik Kapanma & Kordların Yapışması',
          mechanism: 'Lateral krikoaritenoid ve transvers aritenoid kaslar kasılarak gerçek ve yalancı kordları birbirine hava geçirmez şekilde yapıştırır.'
        },
        {
          phase: '4. Kapalı Glottise Karşı Zorlu İnspirasyon',
          mechanism: 'Hasta nefes almaya çabalar (Mueller manevrası); göğüs kafesinde -50 ila -100 cmH2O negatif basınç oluşur.'
        },
        {
          phase: '5. Negatif Basınçlı Pulmoner Ödem & Bradikardi',
          mechanism: 'Aşırı hidrostatik negatif basınçla pulmoner kapillerden alveollere sıvı dolar (NPPE). Çocuklarda hipoksi doğrudan vagal bradikardi ve arreste yol açar.'
        }
      ],
      summaryText: 'Özetle laringospazm; hayatı korumaya programlanmış glottik kapanma refleksinin yüzeyel anestezi altında kontrolden çıkarak asfiksiye, Negatif Basınçlı Pulmoner Ödeme (NPPE) ve ani kardiyak arrestine neden olan tehlikeli bir hava yolu krizidir.'
    },

    // 6) Klinik Özellikleri & Prezentasyonu
    presentation: {
      earlySigns: [
        'Kısmi Spazmda Yüksek Perdeli İnspiratuar Stridor (Karga Sesi / Crowing)',
        'İnspiratuar Eforla Uyumsuz Cılız Göğüs Hareketi',
        'Kapnografide Ekspiratuar Plato Yüksekliğinde Ani Düşüş ve Akım Bozulması',
        'Hastada İrritabilite ve Yüzeyel Anestezi Belirtileri (Göz kırpma, yutkunma, çene sıkma)'
      ],
      progressingSigns: [
        'Paradoksal "See-Saw" (Tahterevalli) Solunumu: Göğüs kafesi çökerken karın kabarır',
        'Suprasternal, İnterkostal ve Klaviküler Derin İnspiratuar Çekilmeler',
        'Manüel Torbada Aşırı Direnç (Akciğere hava gönderilemez, torba kaskatı kalır)',
        'Hızlı SpO2 Düşüşü (Dakikalar içinde %98\'den %80\'in altına iner)'
      ],
      lateSigns: [
        'TAM SESSİZLİK: Stridor tamamen kesilir, hava hareketi SIFIRDIR!',
        'Ağır Siyanoz ve Derin Hipoksemi (SpO2 < %60)',
        'Pediatrik Hastada Ani Derin Bradikardi (Kalp tepe atımı < 60/dk)',
        'Negatif Basınçlı Pulmoner Ödem: Ağızdan ve burundan pembe köpüklü sıvı gelmesi',
        'Bilinç Kaybı, Asistoli veya Nabızsız Elektriksel Aktivite (PEA) Arresti'
      ],
      specialAlertTitle: 'Ölümcül Klinik Tuzak: "Tam Sessizlik" & Negatif Basınçlı Pulmoner Ödem (NPPE)',
      specialAlertContent: 'Laringospazmda en büyük yanılgı hastadan ses çıkmadığında "düzeldi" zannedilmesidir. Tam laringospazmda vokal kordlar hava sızdırmaz şekilde yapıştığı için HİÇ STRİDOR DUYULMAZ. Hasta kapalı glottise karşı nefes almaya çalıştıkça negatif intratorasik basınç (-100 cmH2O) alveolleri patlatır ve hasta pembe köpüklü akciğer ödemine (NPPE) girer!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Son 2-4 Hafta İçinde Viral ÜSYE Öyküsü: Pediatrik olgularda laringospazm riskini 10 kat artırır; elektif cerrahiler en az 2-4 hafta ertelenmelidir.',
        'Pasif Sigara Dumanı Maruziyeti: Ailede sigara içilmesi çocuklarda hava yolu reaktivitesini katlar.',
        'Cerrahi Türü: Tonsillektomi, adenoidektomi, bronkoskopi ve havayolu cerrahilerinde risk en yüksektir.',
        'Aşırı Orofarengeal Sekresyon ve Tükürük Üretimi: Preoperatif sorgulanmalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Laringospazmı Önleme ve "No-Touch" Ekstübasyon Protokolü',
        steps: [
          'Ekstübasyon Zamanlaması Kuralı: Hastayı ASLA Guedel 2. evresinde (eksitasyon fazı) ekstübe etmeyin. Ya TAM DERİN (Guedel 3) ya da TAM UYANIK (spontan göz açan, emir alan, düzenli soluyan) ekstübe edin.',
          'Ekstübasyon Öncesi Titiz Aspirasyon: Farenksi doğrudan laringoskop görüşü altında aspire edin, kan ve sekresyonları tamamen temizleyin.',
          'No-Touch Ekstübasyon Tekniği: Uyanma aşamasında tüpü oynatmayın, aspiratör sokmayın, hastanın yüzüne dokunmayın; spontan uyanana kadar dokunulmazlık sağlayın.',
          'İntravenöz Lidokain Profilaksisi: Ekstübasyondan 2-3 dakika önce 1.0 - 1.5 mg/kg IV Lidokain vererek laringeal refleksleri baskılayın.',
          'Pozitif Basınçla Ekstübasyon: Ekstübasyon anında balonu sıkarak pozitif basınç (akciğerden dışarı doğru hava akımı) verin; bu akım sekresyonları vokal kordlardan uzaklaştırır.',
          'Hazır İlaç Hazırlığı: Özellikle çocuklarda Atropin ve Süksinilkolin enjektörlerini indüksiyondan önce masada hazır çekili bulundurun.'
        ]
      },
      cartChecklist: [
        'Yüze Tam Oturan Silikon Anestezi Maskeleri (Her boy pediatrik ve erişkin)',
        'Guedel Orofarengeal ve Nazofarengeal Airway Seti',
        'Süksinilkolin 100 mg Ampul (Hazır çekili 1-2 enjektör)',
        'Atropin Sülfat 0.5 mg Ampul (Hazır çekili pediatrik enjektör)',
        'Propofol %1 Ampul / Flakon',
        'İntravenöz Lidokain %2 Flakon',
        'Yankauer ve Esnek Steril Aspirasyon Kateterleri',
        'İntraosseöz (IO) Acil Vasküler Girişim Kiti (Damar yolu bulunamazsa Süksinilkolin vermek için)'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Laringospazm yaşayan hastalar, özellikle desatürasyon veya NPPE gelişmişse en az 3-4 saat PACU veya YBÜ\'de sürekli nabız oksimetresi altında tutulmalıdır.',
      recurrenceRiskBadge: 'YENİDEN SPAZM (RE-SPAZM) RİSKİ',
      recurrenceRate: 'Derlenme odasında (PACU) ajitasyon, sekresyon birikimi veya yüzeyel anesteziye erken geçişte re-spazm görülebilir. Koruyucu refleksler tam geri dönene kadar hasta yakın izlenmelidir.',
      maintenanceTherapy: '%100 nemlendirilmiş oksijen desteği, dik oturtma (Fowler pozisyonu), gerekirse 5-10 cmH2O CPAP, sekresyonların nazikçe temizlenmesi.',
      monitoringParameters: [
        'Sürekli SpO2 İzlemi',
        'Solunum Sayısı ve Çekilmelerin Varlığı',
        'Akciğer Dinleme Bulguları (NPPE krepitan ronküs kontrolü)',
        'Bilinç Düzeyi ve Spontan Yutkunma Refleksleri'
      ],
      expectedComplications: [
        'Negatif Basınçlı Pulmoner Ödem (NPPE)',
        'Hipoksik Beyin Hasarı (uzamış spazmda)',
        'Aspirasyon Pnömonisi',
        'Hipoksik Bradikardi ve Kardiyak Arrest'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Yatak Başı Akciğer Grafisi', description: 'Özellikle zorlu inspiratuar efor gösteren hastalarda NPPE (kelebek tarzı bilateral pulmoner infiltrasyon) ve atelektaziyi saptamak için çekilmelidir.' },
        { testName: 'Arteryel Kan Gazı Analizi', description: 'Hipoksemi ve laktat yüksekliğinin çözüldüğünü belgeler.' },
        { testName: 'KBB Konsültasyonu', description: 'Tekrarlayan laringospazmlarda vokal kord polipleri, laringomalazi veya anatomik glottik lezyonları ekarte etmek için fleksibl nazofaringoskopi.' }
      ],
      prognosisSummary: 'Larson manevrası ve zamanında sub-paralitik süksinilkolin ile müdahale edildiğinde tam iyileşme oranı > %98\'dir. Tanınamayan tam laringospazm dakikalar içinde asfiksi ve anoksik hasara yol açar.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Larson Çentik Manevrası Hayat Kurtarır',
        takeaway: 'Çene köşesi arkasındaki kondile uygulanan şiddetli ağrılı ve anterior baskı, vagal refleks inhibisyonu ile vokal kordları saniyeler içinde çözer. Süksinilkolinden önce uygulanacak en hızlı refleks kırıcıdır.',
        category: 'Tuzak'
      },
      {
        title: 'Sub-Paralitik Süksinilkolin (Kırıcı Doz)',
        takeaway: 'Laringospazmı kırmak için tam entübasyon dozu (1-1.5 mg/kg) şart değildir. 0.1 - 0.5 mg/kg IV düşük doz, hastayı tam apneye sokmadan vokal kordları anında gevşetir ve spontan solunumu korur!',
        category: 'Kritik Doz'
      },
      {
        title: 'Tam Laringospazmda Ses Olmaz (Sessizlik = Tam Tıkanıklık)',
        takeaway: 'Stridorun tamamen kaybolması spazmın bittiğini değil, vokal kordların sıfır hava geçmeyecek şekilde yapıştığını kanıtlar. En ölümcül sınav ve klinik tuzağıdır.',
        category: 'Tuzak'
      },
      {
        title: 'Negatif Basınçlı Pulmoner Ödem (NPPE) Tuzağı',
        takeaway: 'Özellikle genç, kaslı erkeklerde kapalı glottise karşı zorlu soluma çabası (Mueller manevrası) intratorasik basıncı -100 cmH2O\'ya kadar düşürür. Spazm çözüldükten hemen sonra pembe köpüklü sıvı gelmesi NPPE\'dir; tedavisi PEEP/CPAP\'tır, diyüretik DEĞİLDİR!',
        category: 'Ezber Bozan'
      },
      {
        title: 'No-Touch Ekstübasyon Kuralı',
        takeaway: 'Ekstübasyondan sonra hasta tam gözünü açıp emir alana kadar yüzüne, tüpüne veya boğazına dokunmayın. Uyanma aşamasında aspirasyon yapmak laringospazmı bizzat hekim eliyle tetikler!',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Pediatrik Bradikardide Atropin Önceliği',
        takeaway: 'Çocuklarda laringospazm anında gelişen bradikardi primer kardiyak değil, derin hipokseminin sonucudur. Süksinilkolin verilmeden önce veya hemen eş zamanlı Atropin (0.02 mg/kg) verilmelidir.',
        category: 'Kritik Doz'
      }
    ],

    // 10) Kullanılan Kaynaklar & İleri Okuma
    references: [
      {
        authors: 'Difficult Airway Society (DAS) Extubation Guidelines Group.',
        title: 'Difficult Airway Society guidelines for the management of tracheal extubation: Laryngospasm management and prevention algorithms.',
        journal: 'Anaesthesia. 2012;67(3):318-340.',
        year: '2012',
        relevance: 'Ekstübasyonda laringospazm önleme kılavuzları, uyanık vs derin ekstübasyon algoritmaları.'
      },
      {
        authors: 'Larson CP Jr.',
        title: 'Laryngospasm: the best treatment (Larson notch maneuver).',
        journal: 'Anesthesiology. 1998;89(5):1293-1294.',
        year: '1998',
        relevance: 'Laringospazm çentiği (Larson\'s notch) bilateral bası tekniğinin nörofizyolojik temelleri.'
      },
      {
        authors: 'Orliaguet G, Gall O, Savoldelli GL, Couloigner V.',
        title: 'Case scenario: Perianesthetic laryngospasm in children - Risk factors, pathophysiology, and management.',
        journal: 'Pediatric Anesthesia. 2018;28(5):398-406.',
        year: '2018',
        relevance: 'Pediatrik kriz yönetimi, intramüsküler süksinilkolin dozları ve ÜSYE sonrası risk analizi.'
      },
      {
        authors: 'Miller RD, Eriksson LI, Fleisher LA.',
        title: 'Airway Management: Complications of Extubation and Acute Laryngospasm.',
        journal: 'Miller\'s Anesthesia (9th Edition), Chapter 44, Elsevier.',
        year: '2020',
        relevance: 'Temel anestezi referans kitabında laringeal adduktor kas fizyolojisi ve acil algoritma.'
      },
      {
        authors: 'Krodel DJ, Bittner EA, Abdulnour RE, et al.',
        title: 'Negative pressure pulmonary edema: Pathophysiology and clinical management in perioperative patients.',
        journal: 'Anesthesiology Clinics. 2021;39(3):477-493.',
        year: '2021',
        relevance: 'Laringospazma ikincil gelişen NPPE tanı kriterleri, PEEP desteği ve yoğun bakım izlemi.'
      }
    ]
  },

  'airway-crisis': {
    id: 'airway-crisis',
    // 1) Başlık
    title: 'Ventile Edilemiyor - Entübe Edilemiyor (CICO)',
    subTitle: 'Acil Cerrahi Havayolu, Neşter-Buji-Tüp Krikotiroidotomi & DAS 2015 Algoritması',
    codeColor: 'red',
    severityBadge: 'KOD KIRMIZI · EN ÜST DÜZEY HAVAYOLU KRİZİ (CICO)',
    keyCallout: 'CICO İLAN EDİN VE YARDIM ÇAĞIRIN! İki kişilik maske ve 2. kuşak LMA ile son kurtarma deneyin. NMB tam değilse Rokuronyum veya Sugammadeks 16 mg/kg verin. SpO2 düşüşü sürüyorsa VAKİT KAYBETMEDEN NEŞTER-BUJİ-TÜP KRİKOTİROİDOTOMİYE GEÇİN!',
    quickCalculatorType: 'cico',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Ventile Edilemiyor - Entübe Edilemiyor (Cannot Intubate, Cannot Oxygenate - CICO); endotrakeal entübasyonun başarısız olduğu, supraglottik havayolu aracı (SGA/LMA) ile oksijenizasyon sağlanamadığı ve yüz maskesi balon ventilasyonunun imkansız hale geldiği, hastanın dakikalar içinde asfiksi ve anoksik kardiyak arreste sürüklendiği en ölümcül anestezi krizidir.',
      epidemiology: 'Elektif genel anestezide insidansı yaklaşık 1:50.000 iken, acil cerrahi, majör travma, maksillofasiyal cerrahi ve baş-boyun kitlelerinde 1:200 ila 1:1.000 oranına kadar fırlar. NAP4 (4th National Audit Project) verilerine göre perioperatif hava yolu ölümlerinin ve kalıcı serebral hasarların en büyük nedeni cerrahi havayoluna (eFONA) geçişte yaşanan kararsızlık, direnç ve zaman kaybıdır!',
      triggers: [
        'Tekrarlayan ve İnatçı Laringoskopi Girişimleri: Aynı klinisyenin 3\'ten fazla entübasyon denemesi mukozal kanama, masif vokal kord ödemi ve anatomik distorsiyona yol açarak yüz maskesiyle dahi havalandırmayı imkansız kılar.',
        'Tanınmamış Zor Havayolu / Anatomik Deformiteler: Ciddi mikrognati, retrognati, servikal rijidite, ankilozan spondilit, laringeal kitle ve radyoterapiye bağlı boyun fiksasyonu.',
        'Yetersiz Kas Gevşemesi veya Yüzeyel Anestezi Altında Spazm: Hasta gevşememişken yapılan girişimler laringospazm ve maseter spazmı ile hava yolunu tamamen kilitler.',
        'Fasiyal / Maksiller Travma ve Masif Kanama: Aspiratörün baş edemediği kanama ve hava yolu yumuşak doku parçalanmaları.',
        'Yüksek Mallampati (Grade 4) + Şiddetli Obstrüktif Uyku Apnesi (OSA) + Morbid Obezite Kombinasyonu.'
      ],
      safeAgents: [
        'Neşter-Buji-Tüp Tekniği (Scalpel-Bougie-Tube): DAS ve uluslararası kılavuzların altın standart cerrahi havayolu yöntemidir; başarı oranı > %95, süresi < 40 saniyedir.',
        'Sugammadeks 16 mg/kg IV: Rokuronyum (1.2 mg/kg) ile indüklenen derin nöromüsküler bloğu 3 dakika içinde tamamen sıfırlayarak spontan solunumu kurtarabilir (hava yolu anatomisi elveriyorsa).',
        'İkinci Kuşak SGA (ProSeal / i-gel): Gastrik drenaj kanalı ve yüksek orofaringeal sızdırmazlık basıncı (> 30 cmH2O) ile son oksijenizasyon kurtarmasında en güvenilir araçtır.',
        'İki Kişilik Dört El Yüz Maskesi Tekniği (VE Manevrası) + Orofarengeal/Nazofarengeal Airway.',
        'Video-Laringoskop (Hiperangüle pala): Doğrudan laringoskopi başarısız olduğunda 1 kez olmak kaydıyla uzman tarafından uygulanabilir.'
      ],
      mortalityStats: 'CICO tablosunda hipoksik kardiyak arrest ve geri dönüşümsüz anoksik beyin hasarı süresi 3-4 dakikadır. Cerrahi havayoluna geçişte 5 dakikalık gecikme mortaliteyi %70\'in üzerine çıkarır.',
      clinicalUrgency: 'Saniyelerin değil, saliselerin sayıldığı anestezi acilidir. "Bir kez daha deneyeyim" düşüncesi ölümcül tuzaktır; ekibe derhal "CICO İLAN EDİYORUM, KRİKOTİROİDOTOMİ BAŞLIYOR" denmelidir.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'CICO tanısı bir dışlama değil, anlık bir klinik karar tanılamasıdır: Trakeal entübasyon denenmiş ve başarısız olmuş, SGA (LMA) takılmış ve hava girişi sağlanamamış, 2 kişilik yüz maskesi ile torba sıkıldığında göğüs kalkmıyor, EtCO2 dalgası oluşmuyor ve SpO2 hızla düşüyorsa tablo KESİN CICO\'dur.',
      clinicalCriteria: [
        'Başarısız Trakeal Entübasyon (Maksimum 3 denemeden sonra tüp yerleştirilememesi)',
        'Başarısız Supraglottik Havayolu / LMA (SGA ile akciğerlere ventilasyon verilememesi)',
        'Başarısız Yüz Maskesi Oksijenizasyonu (APL sıkılıp iki elle zorlanmasına rağmen hava geçişi olmaması)',
        'SpO2 Seviyesinde Yıldırım Hızında Çöküş (< %80 - %70 - %50)',
        'Kapnografide Sıfır Çizgisi (EtCO2 = 0 mmHg, soluk dalgası yok)',
        'Giderek Derinleşen Hipoksik Sinüs Bradikardisi, Siyanoz ve Kardiyak Arrest Eşiği'
      ],
      gradingScaleTitle: 'DAS (Difficult Airway Society) 2015 4-Aşamalı Kriz Skalası',
      gradingScaleSource: 'DAS 2015 Difficult Airway & CICO Guidelines',
      larachScale: [
        { category: 'Plan A: Yüz Maskesi & Trakeal Entübasyon Başarısız', points: 'Maks 3 Girişim', description: 'Direkt veya video laringoskopi ile entübasyon denenir; 3 girişimde başarısız olunursa gecikmeden Plan B\'ye geçilir.' },
        { category: 'Plan B: İkinci Kuşak SGA / LMA Kurtarma Başarısız', points: 'Maks 2 Girişim', description: '2. kuşak LMA (i-gel/ProSeal) yerleştirilir; oksijenizasyon sağlanamazsa hemen Plan C\'ye geçilir.' },
        { category: 'Plan C: Yüz Maskesi ile Son Oksijenizasyon Başarısız', points: 'İki Kişilik Maske', description: 'NMB tam gevşeme, 2 kişilik 4 el tekniği, Guedel airway. Ventilasyon sağlanamazsa CICO İLAN EDİLİR!' },
        { category: 'Plan D: Acil Cerrahi Boyun Girişimi (eFONA / CICO)', points: 'Neşter-Buji-Tüp', description: 'ZAMAN KAYBETMEDEN krikotiroid membran neşterle açılır, buji sokulur ve 6.0 mm ETT yerleştirilir.' }
      ],
      larachInterpretation: 'Plan A, B ve C aşamalarında oksijenizasyon sağlanamadığı anda Plan D (Cerrahi Krikotiroidotomi) bir seçenek değil, hastanın hayatta kalması için ZORUNLU EYLEMDİR.',
      differentialDiagnosis: [
        { condition: 'Şiddetli Akut Laringospazm', differentiatingFactors: 'Hastada üst solunum yolu spazmı vardır; sub-paralitik süksinilkolin veya propofol ile saniyeler içinde kırılır. CICO\'da ise kas felci tam olmasına rağmen mekanik veya anatomik olarak hava yolu tamamen tıkalıdır.' },
        { condition: 'Refrakter Bronkospazm ("Sessiz Akciğer")', differentiatingFactors: 'Patoloji alt solunum yollarındadır; ETT trakea içine girmiştir ancak akciğer dinlendiğinde solunum sesi yoktur ve Ppeak fırlamıştır. CICO\'da ise trakeaya hiç girilememiştir.' },
        { condition: 'Trakeal Yabancı Cisim / Masif Mukus Tıkacı', differentiatingFactors: 'Kordların altında mekanik kütle vardır; krikotiroidotomi yabancı cismin seviyesine göre hayat kurtarır veya bronkoskopik aspirasyon gerekir.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum yokluğu, perküsyonda hipersonorite, trakeal sapma ve derin kardiyovasküler şok vardır; tüp trakeadadır.' },
        { condition: 'Anestezi Devresi veya Ventilatör Tıkanıklığı', differentiatingFactors: 'Devre hastadan ayrılıp ambu-balon doğrudan ETT\'ye bağlandığında hasta rahatça havalanıyorsa sorun makine/devre arızasıdır.' }
      ]
    },

    // 4) Acile Spesifik Akut Kriz Yönetimi
    crisisManagement: {
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'CICO İLAN EDİN & TÜM EKİBİ ALARMA GEÇİRİN',
          action: 'Ameliyathanede yüksek sesle "VENTİLE EDİLEMİYOR - ENTÜBE EDİLEMİYOR (CICO) DURUMUNDAYIZ!" ilan edin. Derhal ikinci bir uzman anestezist, KBB cerrahı ve arrest arabasını odaya çağırtın.',
          criticalNote: 'Tüm cerrahi işlemleri durdurun. Ekip liderliğini üstlenin ve görev dağılımı yapın.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'TAM NÖROMÜSKÜLER BLOK VEYA SUGAMMADEKS 16 MG/KG UYGULAYIN',
          action: 'Eğer kas gevşetici dozu yetersizse ek doz Rokuronyum (1.0 - 1.2 mg/kg IV) vererek laringeal ve göğüs duvarı rijiditesini tamamen sonlandırın. ALTERNATİF: Eğer anestezi indüksiyonu Rokuronyum ile yapılmış ve spontan uyanma hedefleniyorsa derhal Sugammadeks 16 mg/kg IV bolus uygulayın.',
          criticalNote: 'Yetersiz relaksasyon en sık maske ventilasyonu başarısızlığı nedenidir. Ancak cerrahi boyun hazırlığı ASLA durdurulmamalıdır!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'İKİ KİŞİLİK YÜZ MASKESİ VE SGA İLE SON OKSİJENİZASYON DENEYİN',
          action: 'Birinci hekim iki elle çift-C ve E tekniği ile çeneyi kaldırıp maskeyi sımsıkı oturtsun; ikinci hekim torbayı nazikçe sıksın (maks APL 30 cmH2O). Eş zamanlı olarak 2. kuşak LMA (i-gel) yerleştirilmişse yüksek akımlı %100 O2 ile son kez havalandırmayı test edin.',
          criticalNote: 'En fazla 30-45 saniye ayrılmalıdır. Göğüs kalkmıyorsa ve EtCO2 sıfırsa derhal Plan D\'ye geçin!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'HASTAYA DOĞRU POZİSYON VERİN & LARENKSİ PALPE EDİN (Laryngeal Handshake)',
          action: 'Omuzların altına rulo havlu koyarak boynu tam ekstansiyona getirin (servikal omurga travması ekarte edildiyse). Dominant olmayan elinizle tiroid ve krikoid kıkırdakları kavrayıp krikotiroid membranı parmak ucunuzla tespit edin.',
          criticalNote: 'Boyun ekstansiyonu krikotiroid membranı öne doğru iterek insizyonu kolaylaştırır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'NEŞTER-BUJİ-TÜP TEKNİĞİ İLE KRİKOTİROİDOTOMİ UYGULAYIN',
          action: 'No:10 neşter ile krikotiroid membran üzerine transvers (yatay) kesi yapın. Neşteri çıkarmadan 90° kaudale çevirip lümeni aralayın. Coudé uçlu 15 Fr bujiyi trakeaya 10-15 cm ilerletin. Neşteri çekip buji üzerinden ID 6.0 mm kaflı tüpü kaydırın.',
          criticalNote: 'DAS altın standardıdır; başarı oranı %95\'tir. İğne krikotiroidotomiye göre kat kat üstündür.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 6,
          title: 'TÜP KAFINI ŞİŞİRİN VE VENTİLASYONU KAPNOGRAFİ İLE DOĞRULAYIN',
          action: 'Bujiyi çekin, tüp kafını 5-7 mL hava ile şişirin. Devreyi bağlayıp %100 oksijenle manüel solutun. Kapnografide ardışık en az 3 düzenli EtCO2 dalgası ve bilateral göğüs kalkışı görün.',
          criticalNote: 'Kapnografi dalgası görmeden asla cerrahi alana dönmeyin.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 7,
          title: 'TÜPÜ TESPİT EDİN & DERHAL YOĞUN BAKIM / KBB ENTEGRASYONU SAĞLAYIN',
          action: 'Tüpü boyun bağı ile sabitleyin (elde tutulmaya devam edilerek). Cerrahi krikotiroidotomi geçici bir kurtarma yoludur; 24-48 saat içinde elektif cerrahi trakeostomi planlanması için KBB ekibini çağırın.',
          criticalNote: 'Krikotiroidotomi tüpleri hareketle kolayca çıkabilir; çift sabitleme şarttır.',
          priority: 'HIGH'
        }
      ],
      cicoProtocols: {
        scalpelBougieTubeTechnique: {
          title: 'DAS Altın Standart: Neşter-Buji-Tüp (Scalpel-Bougie-Tube) Krikotiroidotomi',
          laryngealHandshake: 'Dominant olmayan elin baş ve orta parmakları ile tiroid kıkırdak bilateral kavranır, aşağı doğru inilerek krikoid kıkırdak ve aralarındaki krikotiroid membran çukurluğu net olarak palpe edilir.',
          techniqueSteps: [
            '1. Stabilizasyon & Yatay Kesi: Krikotiroid membran parmakla tespit edilir. No:10 veya 20 bistüri ile membran üzerine transvers (yatay) 1-2 cm derin insizyon yapılır.',
            '2. Bistüriyi 90° Çevir: Bistüri lümenden çıkarılmadan kesici yüzü kaudale (ayaklara doğru) bakacak şekilde 90 derece dikey konuma çevrilir ve lümen kenara doğru aralanır.',
            '3. Buji İlerlemesi: Coudé uçlu trakeal buji (15 Fr) bistürinin yanından trakea içine 10-15 cm kadar nazikçe kaydırılır (trakeal kıkırdak halkalarının "tık-tık" klik hissi doğrulanır).',
            '4. Tüpün Gönderilmesi: Buji trakeada sabit tutulur, bistüri çıkarılır. Buji üzerinden ID 6.0 mm kaflı endotrakeal tüp rotasyonel hareketle trakeaya kaydırılır.',
            '5. Kaf Şişirme & Doğrulama: Kaf şişirilir, buji çekilir. Devre bağlanır; kapnografide en az 3 ardışık EtCO2 dalgası doğrulanır.'
          ],
          obesePatientModification: 'Obez, kısa boyunlu veya ödemli hastada anatomik yapılar palpe edilemiyorsa vakit kaybetmeden tiroid çentiğinden sternuma kadar 8-10 cm vertikal (dikey) orta hat insizyonu yapılır. Her iki elin işaret parmakları ile pretrakeal yağ dokusu iki yana sıyrılarak krikotiroid kıkırdak hissedilir ve membran yatay kesilir.'
        },
        needleVsScalpelComparison: [
          {
            feature: 'Başarı Oranı (İlk Girişimde)',
            scalpelBougieTube: '%95 - %100 (Yüksek kanıt düzeyi)',
            cannulaCricothyrotomy: '%40 - %60 (Yüksek başarısızlık ve kanül bükülmesi)'
          },
          {
            feature: 'Ventilasyon Yöntemi',
            scalpelBougieTube: 'Standart anestezi devresi ve mekanik ventilatör (EtCO2 takipli)',
            cannulaCricothyrotomy: 'Yüksek basınçlı Jet Ventilatör (Manujet) gerektirir'
          },
          {
            feature: 'Barotravma ve Pnömotoraks Riski',
            scalpelBougieTube: 'Çok düşük (Düşük basınçlı geniş lümen)',
            cannulaCricothyrotomy: 'Çok yüksek (Üst solunum yolu kapalıysa akciğer patlar)'
          },
          {
            feature: 'Girişim Tamamlanma Süresi',
            scalpelBougieTube: '< 40 saniye (Basit, mekanik ve öngörülebilir)',
            cannulaCricothyrotomy: '60 - 120 saniye (Kılavuz tel ve dilatatör gecikmeleri)'
          },
          {
            feature: 'Sekresyon Aspirasyonu & Koruma',
            scalpelBougieTube: 'Kaflı tüp olduğu için aspirasyon korunur, içi aspire edilebilir',
            cannulaCricothyrotomy: 'Kaf yoktur; kan ve sekresyon akciğere akar, aspire edilemez'
          }
        ],
        sugammadexProtocol: {
          dose: '16 mg/kg IV Hızlı Bolus (Tek Seferde)',
          indication: 'Rokuronyum (1.0-1.2 mg/kg) ile indüklenen acil anestezide CICO geliştiğinde nöromüsküler bloğun acil farmakolojik eliminasyonu.',
          pearls: '3 dakika içinde nöromüsküler iletimi %90 TOF oranına ulaştırır. DİKKAT: Doku ödemi, hematom veya mekanik obstrüksiyon varsa hasta uyansa bile soluyamaz; Sugammadeks verilirken Neşter-Buji-Tüp hazırlığı asla durdurulmamalıdır!'
        }
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'CICO durumunda ventilasyonun sıfırlanması dakikalar içinde ağır bir asfiksi ve enerji krizine yol açar. Fonksiyonel Rezidüel Kapasite (FRC) hızla tükenir; PaO2 60 saniyede 100 mmHg\'den < 30 mmHg seviyesine çakılır. Hücre içi mitokondriyal oksidatif fosforilasyon durur, anaerobik glikolizle masif laktat ve H+ birikir. Miyokardiyal hipoksi saniyeler içinde sinüs bradikardisine ve asistoliye dönüşür.',
      stepsTitle: 'Hızlı Asfiksi & Sistemik Hipoksemi Süreci',
      cascadeSteps: [
        {
          phase: '1. FRC Tükenmesi & Difüzyon Krizi',
          mechanism: 'Ventilasyon durduğu anda alveoler oksijen kütüphanesi hızla tükenir; obez veya gebe hastada bu rezerv 60 saniyenin altındadır.'
        },
        {
          phase: '2. Kritik Alveoler Hipoksemi',
          mechanism: 'PaO2 < 30 mmHg seviyesine iner; hemoglobin saturasyonu dik eğriye girerek %90\'dan saniyeler içinde %40\'a düşer.'
        },
        {
          phase: '3. Hipoksik Pulmoner Vazokonstriksiyon (HPV)',
          mechanism: 'Tüm akciğerde yaygın vazokonstriksiyon gelişir; sağ ventrikül art yükü fırlar, akut kor pulmonale ve kardiyak debi çöküşü başlar.'
        },
        {
          phase: '4. Miyokardiyal İskemi & Vagal Bradikardi',
          mechanism: 'Koroner perfüzyon hipoksik kanla beslenir; sinoatriyal ve AV düğüm iletimi yavaşlar, sinüs bradikardisi gelişir.'
        },
        {
          phase: '5. Asistoli / PEA & Anoksik Serebral Hasar',
          mechanism: 'Hücresel ATP tamamen sıfırlanır, sodyum-potasyum pompası iflas eder; 3-4. dakikada geri dönüşümsüz nöronal ölüm ve kardiyak arrest meydana gelir.'
        }
      ],
      summaryText: 'Özetle CICO; solunum yolunun mekanik olarak sıfırlanmasıyla organizmanın oksijen deposunun 120-180 saniyede tamamen tükenmesi ve dakikalar içinde kardiyak arrest ile anoksik serebral nöron ölümüne yol açan en yıkıcı klinik krizdir.'
    },

    // 6) Klinik Özellikleri & Prezentasyonu
    presentation: {
      earlySigns: [
        'Endotrakeal Tüpün Vokal Kordlardan Geçirilememesi (Görüntü yokluğu veya glottik kapanma)',
        'Supraglottik Havayolu (LMA) Takılmasına Rağmen Ventilasyon Direnci (Kaçak sesi, torba sertliği)',
        'Yüz Maskesi Balon Ventilasyonunda Sıfır Göğüs Hareketi',
        'SpO2 Seviyesinin %90\'ın Altına Düşüş Başlangıcı ve Kapnografide Dalga Çıkmaması'
      ],
      progressingSigns: [
        'Hızla Koyu Mor / Gri Siyanoza Dönüşüm',
        'SpO2\'nin %70 - %50 - %30 Seviyelerine Şelale Hızıyla İnmesi',
        'Kompansatuar Taşikardinin Aniden Derin Hipoksik Bradikardiye Dönüşmesi (< 40 bpm)',
        'Göz Bebeklerinde Dilatasyon ve Işık Refleksinin Zayıflaması'
      ],
      lateSigns: [
        'Nabızsız Elektriksel Aktivite (PEA) veya Asistolik Kardiyak Arrest',
        'Geri Dönüşümsüz Hipoksik İskemik Ensefalopati (3-4 dakikalık anoksi sonrası)',
        'Masif Serebral Ödem ve Beyin Ölümü'
      ],
      specialAlertTitle: 'Ölümcül Klinik Tuzak: "Bir Kez Daha Laringoskopi Deneyeyim" Yanılgısı',
      specialAlertContent: 'NAP4 denetim raporlarında perioperatif hava yolu ölümlerinin %80\'inde klinisyenlerin cerrahi havayoluna geçmek yerine 4., 5., 6. kez endotrakeal entübasyon denediği belgelenmiştir. Başarısız 3 girişimden sonra laringoskop derhal masaya bırakılmalı, Neşter-Buji-Tüp krikotiroidotomiye başlanmalıdır!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'LEMON Skoru ile Zor Entübasyon Taraması: Look (Dış görünüm), Evaluate 3-3-2 kuralı, Mallampati skoru, Obstruction (Obstrüksiyon), Neck mobility (Boyun hareket kısıtlılığı).',
        'MOANS Skoru ile Zor Maske Ventilasyonu Taraması: Mask seal (Sakal/yüz anomalisi), Obesity (VKİ>30), Age>55, No teeth (Dişsizlik), Stiff lungs/chest.',
        'SHORT Skoru ile Zor Krikotiroidotomi Tespiti: Surgery (Geçirilmiş boyun cerrahisi), Hematoma (Boyun hematomu/enfeksiyon), Obesity, Radiation (Radyoterapi sertliği), Tumor (Boyun kitlesi).',
        'Uyanık Fiberoptik Entübasyon (AFOI) Kararı: Preoperatif zor havayolu öngörülen her hastada genel anestezi indüksiyonu yerine uyanık fiberoptik entübasyon planlanmalıdır.',
        'Yüksek Akımlı Nazal Oksijenizasyon (THRIVE / Optiflow): Preoksijenizasyonda ve apneik fazda desatürasyon süresini 10-15 dakikaya kadar uzatır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Zor Havayolu ve CICO Krizine Karşı Standart Cihaz & Ekipman Hazırlığı',
        steps: [
          'Preoksijenizasyon: En az 3-5 dakika boyunca yüze tam oturan maske ile %100 FiO2 uygulayın (EtO2 > %85-90 hedeflenmelidir).',
          'CICO Kurtarma Kiti Masada: Steril No:10 neşter, 15 Fr coudé buji ve ID 6.0 mm kaflı ETT ameliyathanede masanın başucunda hazır tutulmalıdır.',
          'Videolaringoskopun Hazır Bulundurulması: İlk entübasyon girişiminden itibaren hiperangüle veya kılavuz kanatlı videolaringoskop odada açık olmalıdır.',
          'İkinci Kuşak LMA Hazırlığı: Gastrik kanallı 2. kuşak supraglottik araç (i-gel / ProSeal) indüksiyon öncesi paketi açılmış hazır olmalıdır.',
          'Sugammadeks Rezervi: Rokuronyum kullanılan her ameliyathanede 16 mg/kg acil geri çevirme dozu (yaklaşık 1000-1200 mg) anında ulaşılabilir olmalıdır.'
        ]
      },
      cartChecklist: [
        'No: 10 ve No: 20 Steril Cerrahi Neşter (Bistüri)',
        '15 Fr Coudé Uçlu Havayolu Bujisi (Eschmann Tracheal Introducer)',
        'ID 6.0 mm Kaflı Endotrakeal Tüp (ve 10 mL kaf enjektörü)',
        'İkinci Kuşak Supraglottik Havayolu Araçları (i-gel / ProSeal No: 3, 4, 5)',
        'Guedel Orofarengeal ve Nazofarengeal Airway Seti (Her boy)',
        'Sugammadeks (Bridion 200 mg ve 500 mg flakonlar)',
        'Videolaringoskop ve Hiperangüle / Macintosh Uyumlu Palalar',
        'Krikotiroidotomi Tüp Tespit Bağı ve Boyun Gaz Kompresleri'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Krikotiroidotomi ile kurtarılan tüm hastalar entübe ve sedatize olarak EN AZ 48 - 72 SAAT Yoğun Bakım Ünitesinde (YBÜ) takip edilmelidir.',
      recurrenceRiskBadge: 'KOMPLİKASYON & YENİDEN TIKANMA RİSKİ',
      recurrenceRate: 'Krikotiroidotomi tüpleri kısa ve hareketli olduğundan bükülme, kaf herniasyonu veya kıkırdak zedelenmesi ile sekonder obstrüksiyon riski yüksektir. 24-48 saat içinde elektif cerrahi trakeostomiye dönüştürülmelidir.',
      maintenanceTherapy: 'İnvaziv mekanik ventilasyon, akciğer koruyucu strateji, profilaktik antibiyoterapi (boyun insizyonu ve aspirasyon riski), yakın trakeal aspirasyon ve KBB koordinasyonu.',
      monitoringParameters: [
        'Sürekli Dalga Formlu Kapnografi (EtCO2) ve SpO2 Takibi',
        'İnvaziv Arter Basıncı ve Hemodinamik Kararlılık',
        'Boyun Muayenesi (Subkutan amfizem, hematom ve kanama kontrolü)',
        'Seri Arteryel Kan Gazı (PaO2, Laktat ve asidoz düzelmesi)',
        'Nörolojik Değerlendirme (Hipoksik iskemik ensefalopati takibi)'
      ],
      expectedComplications: [
        'Ciddi Cerrahi Kanama ve Boyun Hematomu (A. carotis, V. jugularis veya tiroid damar hasarı)',
        'Tüpün Pretrakeal Yalancı Pasaja (False Lumen) Girmesi ve Masif Cilt Altı Amfizem',
        'Arka Trakeal Duvar ve Özofagus Yaralanması / Perforasyonu',
        'Krikoid Kıkırdak Hasarı ve Geç Dönem Subglottik Stenoz',
        'Anoksik Beyin Hasarı ve Hipoksik Miyokard Enfarktüsü'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Yatak Başı Akciğer Grafisi (PA)', description: 'Tüp derinliğinin (karina mesafesi), bilateral akciğer ekspansiyonunun ve pnömotoraks / pnömomediastinum yokluğunun teyidi.' },
        { testName: 'Fiberoptik Bronkoskopi (FOB)', description: 'Tüpün trakea lümeninde olduğunun, karinaya olan mesafesinin ve posterior duvar hasarı olmadığının doğrudan gözle doğrulanması.' },
        { testName: 'KBB & Baş-Boyun Cerrahisi Konsültasyonu', description: 'Krikotiroidotominin 24-48 saat içinde kalıcı elektif trakeostomiye dönüştürülmesi planı.' }
      ],
      prognosisSummary: 'İlk 2-3 dakika içinde Neşter-Buji-Tüp tekniği ile oksijenizasyon sağlanan olgularda kalıcı beyin hasarı kalmaksızın tam nörolojik iyileşme oranı %85-90\'dır. Cerrahi havayoluna geçişte tereddüt edilen ve süresi 5 dakikayı aşan olgularda anoksik ensefalopati ve mortalite dramatik şekilde tırmanır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: '"Neşter-Buji-Tüp" İğne Krikotiroidotomiye Üstündür',
        takeaway: 'DAS 2015 kılavuzları kanül/iğne krikotiroidotomiyi terk etmiş ve Neşter-Buji-Tüp tekniğini tek altın standart ilan etmiştir. İğne krikotiroidotomi %50 başarısızlık, kanül bükülmesi ve masif barotravma riski taşır.',
        category: 'Ezber Bozan'
      },
      {
        title: '3 Girişim Kuralı (The Rule of 3)',
        takeaway: 'Laringoskopi ile entübasyonda en fazla 3 denemeye izin verilir (sonuncusu uzman tarafından video-laringoskop ile). 3\'ten fazla denemek CICO riskini 7 kat artırır; inat etmek hastayı öldürür!',
        category: 'Tuzak'
      },
      {
        title: 'Sugammadeks 16 mg/kg Mucizesi ve Tuzağı',
        takeaway: 'Rokuronyum felcini 3 dakikada sıfırlar. Ancak mekanik obstrüksiyon, yumuşak doku hematomu veya ağır ödem varsa hasta uyansa dahi hava yolu açılmaz. Sugammadeks verilirken krikotiroidotomi hazırlığı ASLA durdurulmamalıdır!',
        category: 'Kritik Doz'
      },
      {
        title: 'Obez Hastada 8-10 cm Dikey Kesi Kuralı',
        takeaway: 'Boynu kalın ve kıkırdakları palpe edilemeyen hastada körlemesine yatay kesi yapılmaz! Tiroid çentiğinden sternuma kadar 8-10 cm derin dikey kesi yapılıp parmakla yağ dokusu iki yana sıyrılarak krikoid kıkırdak palpe edilmelidir.',
        category: 'Tuzak'
      },
      {
        title: 'Laryngeal Handshake Palpasyon Tekniği',
        takeaway: 'Krikotiroid membranı bulmak için dominant olmayan elin baş ve orta parmakları ile tiroid laminası kavranır, aşağı doğru inilerek krikoid kıkırdak ve arasındaki zar çukurluğu netleşir.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Tüp Çapı Kuralı: ID 6.0 mm Kaflı Tüp',
        takeaway: 'Krikotiroidotomi için 7.5 veya 8.0 mm tüp denenmemelidir; krikoid halkaya sığmaz ve kıkırdağı kırar. Standart erişkin krikotiroidotomi tüpü daima ID 6.0 mm kaflı tüptür.',
        category: 'Kritik Doz'
      }
    ],

    // 10) Kullanılan Kaynaklar & İleri Okuma
    references: [
      {
        authors: 'Frerk C, Mitchell VS, McNarry AF, et al. (Difficult Airway Society)',
        title: 'Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults.',
        journal: 'British Journal of Anaesthesia. 2015;115(6):827-848.',
        year: '2015',
        relevance: 'CICO algoritması, Scalpel-Bougie-Tube altın standart tekniği ve Plan A-B-C-D basamakları.'
      },
      {
        authors: 'Cook TM, Woodall N, Frerk C. (Royal College of Anaesthetists)',
        title: 'Major complications of airway management in the UK: results of the Fourth National Audit Project (NAP4).',
        journal: 'British Journal of Anaesthesia. 2011;106(5):617-642.',
        year: '2011',
        relevance: 'Perioperatif havayolu ölümlerinin kök neden analizi, kanül başarısızlıkları ve cerrahi karar gecikmeleri.'
      },
      {
        authors: 'Apfelbaum JL, Hagberg CA, Connis RT, et al. (ASA Task Force)',
        title: '2022 American Society of Anesthesiologists Practice Guidelines for Management of the Difficult Airway.',
        journal: 'Anesthesiology. 2022;136(1):31-81.',
        year: '2022',
        relevance: 'Zor havayolu karar ağaçları, video-laringoskopi yeri ve cerrahi havayolu zamanlaması.'
      },
      {
        authors: 'Chrimes N, Higgs A.',
        title: 'Emergency Front-of-Neck Access (eFONA): Evolution of the scalpel-bougie-tube technique.',
        journal: 'BJA Education. 2017;17(11):376-385.',
        year: '2017',
        relevance: 'Boyun önü acil havayolu erişimi adımları, buji hissi ve anatomik kılavuzluk.'
      }
    ]
  },

  'cico': {
    // Alias to airway-crisis
    id: 'airway-crisis',
    title: 'Ventile Edilemiyor - Entübe Edilemiyor (CICO)',
    subTitle: 'Acil Cerrahi Havayolu, Neşter-Buji-Tüp Krikotiroidotomi & DAS 2015 Algoritması',
    codeColor: 'red',
    severityBadge: 'KOD KIRMIZI · EN ÜST DÜZEY HAVAYOLU KRİZİ (CICO)',
    keyCallout: 'CICO İLAN EDİN VE YARDIM ÇAĞIRIN! İki kişilik maske ve 2. kuşak LMA ile son kurtarma deneyin. NMB tam değilse Rokuronyum veya Sugammadeks 16 mg/kg verin. SpO2 düşüşü sürüyorsa VAKİT KAYBETMEDEN NEŞTER-BUJİ-TÜP KRİKOTİROİDOTOMİYE GEÇİN!',
    quickCalculatorType: 'cico',
    introduction: {
      definition: 'Ventile Edilemiyor - Entübe Edilemiyor (Cannot Intubate, Cannot Oxygenate - CICO); endotrakeal entübasyonun başarısız olduğu, supraglottik havayolu aracı (SGA/LMA) ile oksijenizasyon sağlanamadığı ve yüz maskesi balon ventilasyonunun imkansız hale geldiği, hastanın dakikalar içinde asfiksi ve anoksik kardiyak arreste sürüklendiği en ölümcül anestezi krizidir.',
      epidemiology: 'Elektif genel anestezide insidansı yaklaşık 1:50.000 iken, acil cerrahi, majör travma, maksillofasiyal cerrahi ve baş-boyun kitlelerinde 1:200 ila 1:1.000 oranına kadar fırlar. NAP4 verilerine göre perioperatif hava yolu ölümlerinin en büyük nedeni cerrahi havayoluna (eFONA) geçişte yaşanan kararsızlık ve gecikmedir.',
      triggers: [
        'Tekrarlayan ve İnatçı Laringoskopi Girişimleri: 3\'ten fazla entübasyon denemesi mukozal kanama, masif vokal kord ödemi ve anatomik distorsiyona yol açar.',
        'Tanınmamış Zor Havayolu / Anatomik Deformiteler: Mikrognati, retrognati, servikal rijidite, laringeal kitle ve radyoterapi boyun fiksasyonu.',
        'Yetersiz Kas Gevşemesi veya Yüzeyel Anestezi Altında Spazm: Hasta gevşememişken yapılan girişimler spazm ile hava yolunu kilitler.',
        'Fasiyal / Maksiller Travma ve Masif Kanama: Aspiratörün yetersiz kalması ve anatomik sınırların kaybolması.',
        'Yüksek Mallampati + Şiddetli OSA + Morbid Obezite Kombinasyonu.'
      ],
      safeAgents: [
        'Neşter-Buji-Tüp Tekniği (Scalpel-Bougie-Tube): DAS altın standardıdır; başarı > %95, süre < 40 sn.',
        'Sugammadeks 16 mg/kg IV: Rokuronyum derin bloğunu 3 dakikada sıfırlar.',
        'İkinci Kuşak SGA (ProSeal / i-gel): Son oksijenizasyon kurtarmasında en güvenilir araçtır.',
        'İki Kişilik Dört El Yüz Maskesi Tekniği (VE Manevrası) + Orofarengeal Airway.',
        'Video-Laringoskop (Hiperangüle pala): Uzman tarafından 1 kez denenebilir.'
      ],
      mortalityStats: 'CICO tablosunda hipoksik kardiyak arrest ve anoksik beyin hasarı süresi 3-4 dakikadır. 5 dakikalık gecikme mortaliteyi %70\'in üzerine çıkarır.',
      clinicalUrgency: 'Saniyelerin kritik olduğu anestezi acilidir; "bir kez daha deneyeyim" tuzağına düşülmeden krikotiroidotomiye başlanmalıdır.'
    },
    diagnosis: {
      overview: 'CICO tanısı anlık bir karardır: ETT başarısız, SGA başarısız, 2 kişilik maske ile torba sıkıldığında göğüs kalkmıyor, EtCO2 = 0 mmHg ve SpO2 hızla düşüyorsa tablo KESİN CICO\'dur.',
      clinicalCriteria: [
        'Başarısız Trakeal Entübasyon (Maksimum 3 denemeden sonra tüp yerleştirilememesi)',
        'Başarısız Supraglottik Havayolu / LMA (SGA ile akciğerlere ventilasyon verilememesi)',
        'Başarısız Yüz Maskesi Oksijenizasyonu (APL sıkılıp iki elle zorlanmasına rağmen hava geçişi olmaması)',
        'SpO2 Seviyesinde Yıldırım Hızında Çöküş (< %80 - %70 - %50)',
        'Kapnografide Sıfır Çizgisi (EtCO2 = 0 mmHg, soluk dalgası yok)',
        'Giderek Derinleşen Hipoksik Sinüs Bradikardisi, Siyanoz ve Kardiyak Arrest Eşiği'
      ],
      gradingScaleTitle: 'DAS 2015 4-Aşamalı Kriz Skalası',
      gradingScaleSource: 'DAS 2015 Difficult Airway & CICO Guidelines',
      larachScale: [
        { category: 'Plan A: Yüz Maskesi & Trakeal Entübasyon Başarısız', points: 'Maks 3 Girişim', description: 'Direkt veya video laringoskopi ile entübasyon denenir; 3 girişimde başarısız olunursa hemen Plan B\'ye geçilir.' },
        { category: 'Plan B: İkinci Kuşak SGA / LMA Kurtarma Başarısız', points: 'Maks 2 Girişim', description: '2. kuşak LMA (i-gel/ProSeal) yerleştirilir; oksijenizasyon sağlanamazsa Plan C\'ye geçilir.' },
        { category: 'Plan C: Yüz Maskesi ile Son Oksijenizasyon Başarısız', points: 'İki Kişilik Maske', description: 'NMB tam gevşeme, 2 kişilik 4 el tekniği, Guedel airway. Ventilasyon sağlanamazsa CICO İLAN EDİLİR!' },
        { category: 'Plan D: Acil Cerrahi Boyun Girişimi (eFONA / CICO)', points: 'Neşter-Buji-Tüp', description: 'ZAMAN KAYBETMEDEN krikotiroid membran neşterle açılır, buji sokulur ve 6.0 mm ETT yerleştirilir.' }
      ],
      larachInterpretation: 'Plan A, B ve C aşamalarında oksijenizasyon sağlanamadığı anda Plan D (Cerrahi Krikotiroidotomi) hayatta kalmak için zorunlu eylemdir.',
      differentialDiagnosis: [
        { condition: 'Şiddetli Akut Laringospazm', differentiatingFactors: 'Üst solunum yolu spazmıdır; sub-paralitik süksinilkolin veya propofol ile kırılır.' },
        { condition: 'Refrakter Bronkospazm ("Sessiz Akciğer")', differentiatingFactors: 'Patoloji alt solunum yollarındadır; ETT trakeadadır ancak solunum sesi yoktur ve Ppeak fırlamıştır.' },
        { condition: 'Trakeal Yabancı Cisim / Masif Mukus Tıkacı', differentiatingFactors: 'Kordların altında mekanik kütle vardır; krikotiroidotomi hayat kurtarır.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum yokluğu, perküsyon hipersonoritesi ve derin hipotansiyon.' },
        { condition: 'Anestezi Devresi veya Ventilatör Tıkanıklığı', differentiatingFactors: 'Devre ayrılıp ambu-balon bağlandığında hasta havalanıyorsa devre/cihaz arızasıdır.' }
      ]
    },
    crisisManagement: {
      coreAlgorithm: [
        { stepNumber: 1, title: 'CICO İLAN EDİN & TÜM EKİBİ ALARMA GEÇİRİN', action: 'Ameliyathanede yüksek sesle CICO ilan edin. İkinci uzman anestezist, KBB cerrahı ve arrest arabasını çağırın.', criticalNote: 'Tüm cerrahi işlemleri durdurun.', priority: 'CRITICAL' },
        { stepNumber: 2, title: 'TAM NÖROMÜSKÜLER BLOK VEYA SUGAMMADEKS 16 MG/KG UYGULAYIN', action: 'Relaksasyon eksikse ek Rokuronyum (1.0-1.2 mg/kg IV) verin veya spontan uyanma hedefleniyorsa Sugammadeks 16 mg/kg IV bolus yapın.', criticalNote: 'Cerrahi boyun hazırlığı ASLA durdurulmamalıdır!', priority: 'CRITICAL' },
        { stepNumber: 3, title: 'İKİ KİŞİLİK YÜZ MASKESİ VE SGA İLE SON OKSİJENİZASYON DENEYİN', action: 'Birinci hekim iki elle çift-C ve E tekniği ile maskeyi oturtsun, ikinci hekim torbayı sıksın. 2. kuşak LMA ile son kez deneyin.', criticalNote: 'En fazla 30-45 saniye ayrılmalıdır.', priority: 'CRITICAL' },
        { stepNumber: 4, title: 'HASTAYA DOĞRU POZİSYON VERİN & LARENKSİ PALPE EDİN (Laryngeal Handshake)', action: 'Omuzların altına rulo koyarak boynu ekstansiyona getirin. Dominant olmayan elle tiroid ve krikoid kıkırdakları kavrayıp zarı tespit edin.', criticalNote: 'Boyun ekstansiyonu krikotiroid membranı öne doğru iter.', priority: 'CRITICAL' },
        { stepNumber: 5, title: 'NEŞTER-BUJİ-TÜP TEKNİĞİ İLE KRİKOTİROİDOTOMİ UYGULAYIN', action: 'No:10 neşter ile krikotiroid membran üzerine yatay kesi yapın. Neşteri çıkarmadan 90° çevirin. 15 Fr bujiyi 10-15 cm ilerletin. Buji üzerinden ID 6.0 mm kaflı ETT kaydırın.', criticalNote: 'DAS altın standardıdır; başarı oranı %95\'tir.', priority: 'CRITICAL' },
        { stepNumber: 6, title: 'TÜP KAFINI ŞİŞİRİN VE VENTİLASYONU KAPNOGRAFİ İLE DOĞRULAYIN', action: 'Bujiyi çekin, kafı şişirin. Devreyi bağlayıp %100 oksijenle solutun. Kapnografide ardışık en az 3 EtCO2 dalgası görün.', criticalNote: 'Kapnografi dalgası görmeden asla cerrahi alana dönmeyin.', priority: 'CRITICAL' },
        { stepNumber: 7, title: 'TÜPÜ TESPİT EDİN & DERHAL YOĞUN BAKIM / KBB ENTEGRASYONU SAĞLAYIN', action: 'Tüpü boyun bağı ile sabitleyin. 24-48 saat içinde elektif cerrahi trakeostomiye dönüştürülmesi için KBB ekibiyle planlama yapın.', criticalNote: 'Krikotiroidotomi tüpleri hareketle çıkabilir; çift sabitleme şarttır.', priority: 'HIGH' }
      ],
      cicoProtocols: {
        scalpelBougieTubeTechnique: {
          title: 'DAS Altın Standart: Neşter-Buji-Tüp (Scalpel-Bougie-Tube) Krikotiroidotomi',
          laryngealHandshake: 'Dominant olmayan elin baş ve orta parmakları ile tiroid kıkırdak bilateral kavranır, aşağı inilerek krikoid kıkırdak ve aralarındaki krikotiroid membran çukurluğu net olarak palpe edilir.',
          techniqueSteps: [
            '1. Stabilizasyon & Yatay Kesi: Krikotiroid membran parmakla tespit edilir. No:10 neşter ile membran üzerine transvers (yatay) 1-2 cm derin insizyon yapılır.',
            '2. Bistüriyi 90° Çevir: Bistüri lümenden çıkarılmadan kesici yüzü kaudale bakacak şekilde 90 derece dikey konuma çevrilir ve lümen aralanır.',
            '3. Buji İlerlemesi: Coudé uçlu trakeal buji (15 Fr) bistürinin yanından trakea içine 10-15 cm kaydırılır (trakeal kıkırdak halkalarının "tık-tık" klik hissi doğrulanır).',
            '4. Tüpün Gönderilmesi: Buji sabit tutulur, bistüri çıkarılır. Buji üzerinden ID 6.0 mm kaflı tüp rotasyonel hareketle trakeaya kaydırılır.',
            '5. Kaf Şişirme & Doğrulama: Kaf şişirilir, buji çekilir. Devre bağlanır; kapnografide en az 3 ardışık EtCO2 dalgası doğrulanır.'
          ],
          obesePatientModification: 'Obez, kısa boyunlu veya ödemli hastada anatomik yapılar palpe edilemiyorsa vakit kaybetmeden tiroid çentiğinden sternuma kadar 8-10 cm dikey orta hat insizyonu yapılır, parmaklarla yağ dokusu iki yana sıyrılarak krikoid kıkırdak hissedilir ve membran yatay kesilir.'
        },
        needleVsScalpelComparison: [
          { feature: 'Başarı Oranı (İlk Girişimde)', scalpelBougieTube: '%95 - %100 (Yüksek kanıt düzeyi)', cannulaCricothyrotomy: '%40 - %60 (Yüksek başarısızlık ve kanül bükülmesi)' },
          { feature: 'Ventilasyon Yöntemi', scalpelBougieTube: 'Standart anestezi devresi ve mekanik ventilatör (EtCO2 takipli)', cannulaCricothyrotomy: 'Yüksek basınçlı Jet Ventilatör (Manujet) gerektirir' },
          { feature: 'Barotravma ve Pnömotoraks Riski', scalpelBougieTube: 'Çok düşük (Düşük basınçlı geniş lümen)', cannulaCricothyrotomy: 'Çok yüksek (Üst solunum yolu kapalıysa akciğer patlar)' },
          { feature: 'Girişim Tamamlanma Süresi', scalpelBougieTube: '< 40 saniye (Basit, mekanik ve öngörülebilir)', cannulaCricothyrotomy: '60 - 120 saniye (Kılavuz tel ve dilatatör gecikmeleri)' },
          { feature: 'Sekresyon Aspirasyonu & Koruma', scalpelBougieTube: 'Kaflı tüp olduğu için aspirasyon korunur, içi aspire edilebilir', cannulaCricothyrotomy: 'Kaf yoktur; kan ve sekresyon akciğere akar, aspire edilemez' }
        ],
        sugammadexProtocol: {
          dose: '16 mg/kg IV Hızlı Bolus (Tek Seferde)',
          indication: 'Rokuronyum (1.0-1.2 mg/kg) indüksiyonunda CICO geliştiğinde nöromüsküler bloğun acil farmakolojik eliminasyonu.',
          pearls: '3 dakika içinde iletimi %90 TOF oranına ulaştırır. DİKKAT: Doku ödemi, hematom veya obstrüksiyon varsa hasta uyansa dahi soluyamaz; krikotiroidotomi hazırlığı asla durdurulmamalıdır!'
        }
      }
    },
    pathophysiology: {
      molecularBasis: 'CICO durumunda hipoksi dakikalar içinde hücresel düzeyde enerji krizine yol açar. FRC hızla tükenir; PaO2 < 30 mmHg seviyesine çakılır. Hücre içi mitokondriyal oksidatif fosforilasyon durur, anaerobik glikolizle masif laktat ve H+ birikir. Miyokardiyal hipoksi saniyeler içinde sinüs bradikardisine ve asistoliye dönüşür.',
      cascadeSteps: [
        { phase: '1. FRC Tükenmesi & Difüzyon Krizi', mechanism: 'Ventilasyon durduğu anda alveoler oksijen kütüphanesi hızla tükenir.' },
        { phase: '2. Kritik Alveoler Hipoksemi', mechanism: 'PaO2 < 30 mmHg seviyesine iner; hemoglobin saturasyonu dik eğriye girerek %90\'dan saniyeler içinde %40\'a düşer.' },
        { phase: '3. Hipoksik Pulmoner Vazokonstriksiyon (HPV)', mechanism: 'Tüm akciğerde yaygın vazokonstriksiyon gelişir; sağ ventrikül art yükü fırlar.' },
        { phase: '4. Miyokardiyal İskemi & Vagal Bradikardi', mechanism: 'Koroner perfüzyon hipoksik kanla beslenir; sinoatriyal ve AV düğüm iletimi yavaşlar, sinüs bradikardisi gelişir.' },
        { phase: '5. Asistoli / PEA & Anoksik Serebral Hasar', mechanism: 'Hücresel ATP sıfırlanır, sodyum-potasyum pompası iflas eder; 3-4. dakikada geri dönüşümsüz nöronal ölüm meydana gelir.' }
      ],
      summaryText: 'Özetle CICO; solunum yolunun mekanik olarak sıfırlanmasıyla organizmanın oksijen deposunun 120-180 saniyede tamamen tükenmesi ve dakikalar içinde kardiyak arrest ile anoksik serebral nöron ölümüne yol açan en yıkıcı klinik krizdir.'
    },
    presentation: {
      earlySigns: [
        'Endotrakeal Tüpün Vokal Kordlardan Geçirilememesi',
        'Supraglottik Havayolu (LMA) Takılmasına Rağmen Ventilasyon Direnci',
        'Yüz Maskesi Balon Ventilasyonunda Sıfır Göğüs Hareketi',
        'SpO2 Seviyesinin %90\'ın Altına Düşüş Başlangıcı ve Kapnografide Dalga Çıkmaması'
      ],
      progressingSigns: [
        'Hızla Koyu Mor / Gri Siyanoza Dönüşüm',
        'SpO2\'nin %70 - %50 - %30 Seviyelerine Şelale Hızıyla İnmesi',
        'Kompansatuar Taşikardinin Aniden Derin Hipoksik Bradikardiye Dönüşmesi (< 40 bpm)',
        'Göz Bebeklerinde Dilatasyon ve Işık Refleksinin Zayıflaması'
      ],
      lateSigns: [
        'Nabızsız Elektriksel Aktivite (PEA) veya Asistolik Kardiyak Arrest',
        'Geri Dönüşümsüz Hipoksik İskemik Ensefalopati (3-4 dakikalık anoksi sonrası)',
        'Masif Serebral Ödem ve Beyin Ölümü'
      ],
      specialAlertTitle: 'Ölümcül Klinik Tuzak: "Bir Kez Daha Laringoskopi Deneyeyim" Yanılgısı',
      specialAlertContent: 'NAP4 denetim raporlarında perioperatif hava yolu ölümlerinin %80\'inde klinisyenlerin cerrahi havayoluna geçmek yerine 4., 5., 6. kez endotrakeal entübasyon denediği belgelenmiştir. Başarısız 3 girişimden sonra laringoskop derhal masaya bırakılmalı, Neşter-Buji-Tüp krikotiroidotomiye başlanmalıdır!'
    },
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'LEMON Skoru ile Zor Entübasyon Taraması (Look, Evaluate 3-3-2, Mallampati, Obstruction, Neck mobility).',
        'MOANS Skoru ile Zor Maske Ventilasyonu Taraması (Mask seal, Obesity, Age>55, No teeth, Stiff lungs).',
        'SHORT Skoru ile Zor Krikotiroidotomi Tespiti (Surgery, Hematoma, Obesity, Radiation, Tumor).',
        'Uyanık Fiberoptik Entübasyon (AFOI) Kararı: Zor havayolu öngörülen olguda anestezi öncesi fiberoptik planlanmalıdır.',
        'Yüksek Akımlı Nazal Oksijenizasyon (THRIVE): Apneik desatürasyon süresini 10-15 dakikaya kadar uzatır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Zor Havayolu ve CICO Krizine Karşı Standart Cihaz & Ekipman Hazırlığı',
        steps: [
          'Preoksijenizasyon: En az 3-5 dakika boyunca yüze tam oturan maske ile %100 FiO2 uygulayın.',
          'CICO Kurtarma Kiti Masada: Steril No:10 neşter, 15 Fr coudé buji ve ID 6.0 mm kaflı ETT ameliyathanede hazır tutulmalıdır.',
          'Videolaringoskopun Hazır Bulundurulması: İlk entübasyon girişiminden itibaren videolaringoskop odada açık olmalıdır.',
          'İkinci Kuşak LMA Hazırlığı: Gastrik kanallı 2. kuşak supraglottik araç (i-gel / ProSeal) indüksiyon öncesi hazır olmalıdır.',
          'Sugammadeks Rezervi: Rokuronyum kullanılan her ameliyathanede 16 mg/kg acil geri çevirme dozu anında ulaşılabilir olmalıdır.'
        ]
      },
      cartChecklist: [
        'No: 10 ve No: 20 Steril Cerrahi Neşter (Bistüri)',
        '15 Fr Coudé Uçlu Havayolu Bujisi (Eschmann Tracheal Introducer)',
        'ID 6.0 mm Kaflı Endotrakeal Tüp (ve 10 mL kaf enjektörü)',
        'İkinci Kuşak Supraglottik Havayolu Araçları (i-gel / ProSeal No: 3, 4, 5)',
        'Guedel Orofarengeal ve Nazofarengeal Airway Seti (Her boy)',
        'Sugammadeks (Bridion 200 mg ve 500 mg flakonlar)',
        'Videolaringoskop ve Hiperangüle / Macintosh Uyumlu Palalar',
        'Krikotiroidotomi Tüp Tespit Bağı ve Boyun Gaz Kompresleri'
      ]
    },
    postopManagement: {
      icuMonitoringDuration: 'Krikotiroidotomi ile kurtarılan tüm hastalar entübe ve sedatize olarak EN AZ 48 - 72 SAAT Yoğun Bakım Ünitesinde (YBÜ) takip edilmelidir.',
      recurrenceRiskBadge: 'KOMPLİKASYON & YENİDEN TIKANMA RİSKİ',
      recurrenceRate: 'Krikotiroidotomi tüpleri kısa ve hareketli olduğundan bükülme, kaf herniasyonu veya kıkırdak zedelenmesi ile sekonder obstrüksiyon riski yüksektir. 24-48 saat içinde elektif cerrahi trakeostomiye dönüştürülmelidir.',
      maintenanceTherapy: 'İnvaziv mekanik ventilasyon, akciğer koruyucu strateji, profilaktik antibiyoterapi, yakın trakeal aspirasyon ve KBB koordinasyonu.',
      monitoringParameters: [
        'Sürekli Dalga Formlu Kapnografi (EtCO2) ve SpO2 Takibi',
        'İnvaziv Arter Basıncı ve Hemodinamik Kararlılık',
        'Boyun Muayenesi (Subkutan amfizem, hematom ve kanama kontrolü)',
        'Seri Arteryel Kan Gazı (PaO2, Laktat ve asidoz düzelmesi)',
        'Nörolojik Değerlendirme (Hipoksik iskemik ensefalopati takibi)'
      ],
      expectedComplications: [
        'Ciddi Cerrahi Kanama ve Boyun Hematomu',
        'Tüpün Pretrakeal Yalancı Pasaja (False Lumen) Girmesi ve Masif Cilt Altı Amfizem',
        'Arka Trakeal Duvar ve Özofagus Yaralanması / Perforasyonu',
        'Krikoid Kıkırdak Hasarı ve Geç Dönem Subglottik Stenoz',
        'Anoksik Beyin Hasarı ve Hipoksik Miyokard Enfarktüsü'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Yatak Başı Akciğer Grafisi (PA)', description: 'Tüp derinliğinin (karina mesafesi), bilateral akciğer ekspansiyonunun ve pnömotoraks / pnömomediastinum yokluğunun teyidi.' },
        { testName: 'Fiberoptik Bronkoskopi (FOB)', description: 'Tüpün trakea lümeninde olduğunun, karinaya olan mesafesinin ve posterior duvar hasarı olmadığının doğrudan gözle doğrulanması.' },
        { testName: 'KBB & Baş-Boyun Cerrahisi Konsültasyonu', description: 'Krikotiroidotominin 24-48 saat içinde kalıcı elektif trakeostomiye dönüştürülmesi planı.' }
      ],
      prognosisSummary: 'İlk 2-3 dakika içinde Neşter-Buji-Tüp tekniği ile oksijenizasyon sağlanan olgularda kalıcı beyin hasarı kalmaksızın tam nörolojik iyileşme oranı %85-90\'dır. Cerrahi havayoluna geçişte tereddüt edilen ve süresi 5 dakikayı aşan olgularda anoksik ensefalopati ve mortalite dramatik şekilde tırmanır.'
    },
    highYieldPearls: [
      {
        title: '"Neşter-Buji-Tüp" İğne Krikotiroidotomiye Üstündür',
        takeaway: 'DAS 2015 kılavuzları kanül/iğne krikotiroidotomiyi terk etmiş ve Neşter-Buji-Tüp tekniğini tek altın standart ilan etmiştir. İğne krikotiroidotomi %50 başarısızlık, kanül bükülmesi ve masif barotravma riski taşır.',
        category: 'Ezber Bozan'
      },
      {
        title: '3 Girişim Kuralı (The Rule of 3)',
        takeaway: 'Laringoskopi ile entübasyonda en fazla 3 denemeye izin verilir (sonuncusu uzman tarafından video-laringoskop ile). 3\'ten fazla denemek CICO riskini 7 kat artırır; inat etmek hastayı öldürür!',
        category: 'Tuzak'
      },
      {
        title: 'Sugammadeks 16 mg/kg Mucizesi ve Tuzağı',
        takeaway: 'Rokuronyum felcini 3 dakikada sıfırlar. Ancak mekanik obstrüksiyon, yumuşak doku hematomu veya ağır ödem varsa hasta uyansa dahi hava yolu açılmaz. Sugammadeks verilirken krikotiroidotomi hazırlığı ASLA durdurulmamalıdır!',
        category: 'Kritik Doz'
      },
      {
        title: 'Obez Hastada 8-10 cm Dikey Kesi Kuralı',
        takeaway: 'Boynu kalın ve kıkırdakları palpe edilemeyen hastada körlemesine yatay kesi yapılmaz! Tiroid çentiğinden sternuma kadar 8-10 cm derin dikey kesi yapılıp parmakla yağ dokusu iki yana sıyrılarak krikoid kıkırdak palpe edilmelidir.',
        category: 'Tuzak'
      },
      {
        title: 'Laryngeal Handshake Palpasyon Tekniği',
        takeaway: 'Krikotiroid membranı bulmak için dominant olmayan elin baş ve orta parmakları ile tiroid laminası kavranır, aşağı doğru inilerek krikoid kıkırdak ve arasındaki zar çukurluğu netleşir.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Tüp Çapı Kuralı: ID 6.0 mm Kaflı Tüp',
        takeaway: 'Krikotiroidotomi için 7.5 veya 8.0 mm tüp denenmemelidir; krikoid halkaya sığmaz ve kıkırdağı kırar. Standart erişkin krikotiroidotomi tüpü daima ID 6.0 mm kaflı tüptür.',
        category: 'Kritik Doz'
      }
    ],
    references: [
      {
        authors: 'Frerk C, Mitchell VS, McNarry AF, et al. (Difficult Airway Society)',
        title: 'Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults.',
        journal: 'British Journal of Anaesthesia. 2015;115(6):827-848.',
        year: '2015',
        relevance: 'CICO algoritması, Scalpel-Bougie-Tube altın standart tekniği ve Plan A-B-C-D basamakları.'
      },
      {
        authors: 'Cook TM, Woodall N, Frerk C. (Royal College of Anaesthetists)',
        title: 'Major complications of airway management in the UK: results of the Fourth National Audit Project (NAP4).',
        journal: 'British Journal of Anaesthesia. 2011;106(5):617-642.',
        year: '2011',
        relevance: 'Perioperatif havayolu ölümlerinin kök neden analizi, kanül başarısızlıkları ve cerrahi karar gecikmeleri.'
      },
      {
        authors: 'Apfelbaum JL, Hagberg CA, Connis RT, et al. (ASA Task Force)',
        title: '2022 American Society of Anesthesiologists Practice Guidelines for Management of the Difficult Airway.',
        journal: 'Anesthesiology. 2022;136(1):31-81.',
        year: '2022',
        relevance: 'Zor havayolu karar ağaçları, video-laringoskopi yeri ve cerrahi havayolu zamanlaması.'
      },
      {
        authors: 'Chrimes N, Higgs A.',
        title: 'Emergency Front-of-Neck Access (eFONA): Evolution of the scalpel-bougie-tube technique.',
        journal: 'BJA Education. 2017;17(11):376-385.',
        year: '2017',
        relevance: 'Boyun önü acil havayolu erişimi adımları, buji hissi ve anatomik kılavuzluk.'
      }
    ]
  },

  'airway-obstruction': {
    id: 'airway-obstruction',
    title: 'Akut Hava Yolu Obstrüksiyonu',
    subTitle: 'Postoperatif boyun hematomu, yabancı cisim aspirasyonu, endotrakeal tüp tıkanması ve akut laringeal anjiyoödem acil protokolü.',
    codeColor: 'rose',
    severityBadge: 'HAYATİ KRİZ (KOD KIRMIZI) - ACİL MEKANİK DEKOMPRESYON',
    keyCallout: 'Akut hava yolu obstrüksiyonunda zorla pozitif basınçlı ventilasyon yabancı cismi karinaya itebilir veya hava hapsini fırlatabilir; boyun hematomunda ameliyathane aranmaz, dikişler yatak başında derhal açılır!',
    quickCalculatorType: 'airway-obstruction',

    // 2) Tanımlama ve Introduction
    introduction: {
      definition: 'Akut Hava Yolu Obstrüksiyonu; burun deliklerinden karina ve ana bronş dallarına kadar hava yolunun mekanik (yabancı cisim, kan pıhtısı, ETT tıkanması/bükülmesi), patolojik kompresyon (postoperatif boyun hematomu, retrofaringeal apse, tümör) veya enflamatuar/anjiyonörotik (larenks ödemi, anjiyoödem) nedenlerle aniden daralması veya tamamen tıkanmasıyla karakterize, dakikalar içinde asfiksi ve ölüme yol açabilen en acil klinik tablodur.',
      epidemiology: 'Perioperatif majör hava yolu krizlerinin önemli bir kısmını oluşturur. Tiroidektomi ve karotis endarterektomisi sonrası hematom sıklığı %0.5 - %2.1 arasındadır ve çoğunlukla ilk 6 saatte gelişir. Anestezi uyanma evresinde gevşek diş/kron aspirasyonu, kan pıhtısı tıkacı ve ETT ısırma olayları en sık mekanik nedenler arasındadır.',
      triggers: [
        'Cerrahi Alan Hematomu: Tiroidektomi, karotis endarterektomisi, anterior servikal omurga füzyonu (ACDF) sonrası boyun kompartmanında hızla büyüyen gergin hematom',
        'Yabancı Cisimler: Aspirasyon (diş parçası, gevşek protez/kron, cerrahi gazlı bez/pamuk, kan pıhtısı tıkacı, mide içeriği)',
        'Endotrakeal Tüp Mekanik Arızaları: Hastanın tüpü ısırması, ETT bükülmesi (kinking), kafın aşırı şişip tüp ucuna fıtıklaşması (herniasyon), sekresyon/pıhtı tıkacı',
        'Akut Laringeal / Faringeal Anjiyoödem: ACE inhibitörü kullanımı, C1-esteraz inhibitör eksikliği (HAE) veya IgE-bağımlı şiddetli anafilaksi',
        'Enfeksiyöz / Enflamatuar Süreçler: Akut epiglottit, Ludwig anjini, retrofaringeal veya peritonsiller apse basısı',
        'Laringotrakeal Travma: Künt/penetran boyun travması, laringeal hematom veya kıkırdak fraktürü'
      ],
      safeAgents: [
        'Spontan Solunumu Koruma: Kritik parsiyel obstrüksiyonda kas gevşeticiden kaçının; negatif toraks basıncı farengeal kollapsı önleyebilir.',
        'Yatak Başı Dikiş Açma Seti: Boyun hematomu şüphesinde ameliyathane aranmadan yatak başı cilt, platisma ve derin fasya dikişlerinin kesilmesi.',
        'Uyanık Fiberoptik Entübasyon (AFOI): Kitle, apse veya anatomik distorsiyon varlığında altın standart havayolu stratejisidir.',
        'Videolaringoskopi & Rijit Bronkoskopi: Yabancı cisimlerin direkt vizüalizasyonla Magill forsepsi ile çıkarılması.',
        'Heliox (Helyum-Oksijen 80:20 veya 70:30): Düşük gaz yoğunluğu ile türbülanslı akımı laminer akıma çevirerek solunum işini dramatik azaltır.',
        'Deksametazon & İnhale Adrenalin: Larenks mukozal ödeminde hızlı anti-enflamatuar ve vazokonstriktif kurtarma.',
        'Cerrahi Hava Yolu Hazırlığı: Neşter-Buji-Tüp (Scalpel-Bougie-Tube) krikotiroidotomi kiti daima masada açık olmalıdır.'
      ],
      mortalityStats: 'Tam tıkanıklık durumunda 3-4 dakika içinde hipoksik beyin hasarı ve kardiyak arrest gelişir. Boyun hematomunda ameliyathane ekibi ve masa hazırlığı beklenmesi durumunda mortalite %30\'u aşmaktadır; yatak başında hematomun acil boşaltılması ise mortaliteyi %1\'in altına indirir.',
      clinicalUrgency: 'Saniyelerin kritik olduğu acildir; hastanın desatüre olmasını beklemeden fiziksel dekompresyon ve hava yolu güvenliği sağlanmalıdır.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Hava yolu obstrüksiyonunun tanısı dakikalar içinde inspeksiyon, oskültasyon ve ventilatör parametreleri ile konur. İnspiratuar stridor ekstratorasik (laringeal/faringeal) obstrüksiyonu, ekspiratuar stridor veya bifazik sesler ise intratorasik trakeal patolojiyi işaret eder.',
      clinicalCriteria: [
        'Yüksek Perdeli İnspiratuar Stridor ve Hava Açlığı (Hastada panik, boğulma hissi, konuşamama)',
        'Paradoksal Solunum Hareketi ("Tahterevalli" / See-Saw solunum, derin suprasternal ve interkostal çekilmeler)',
        'Ventilatörde Tepe İnspiratuar Basınç (PIP) Fırlaması ve ETT İçinden Aspiratör Kateterinin Geçmemesi',
        'Boyunda Giderek Büyüyen Gergin Şişlik, Cilt Altı Amfizemi, Dren Tıkanması veya Drenden Ani Masif Kan Gelmesi',
        'Kapnografi Trasesinin Aniden Kesilmesi (Düz çizgi) veya Dalga Formunun Güdükleşmesi',
        'SpO2 Seviyesinin Hızla Çakılması ve Mor-Gri Siyanoz Tablosu'
      ],
      larachScale: [
        { category: 'Evre 1: Kompansatuar Parsiyel Obstrüksiyon', points: 'Hafif / Orta Risk', description: 'Stridor mevcut, hasta hava hareketi sağlayabiliyor, SpO2 > %90, hafif taşikardi ve anksiyete.' },
        { category: 'Evre 2: Dekompanse Ciddi Obstrüksiyon', points: 'Yüksek Acil Risk', description: 'Belirgin see-saw solunum, derin sternal çekilme, ajitasyon, terleme, SpO2 %75-89, konuşamama.' },
        { category: 'Evre 3: Tam Obstrüksiyon (Sessiz Tablo)', points: 'HAYATİ TEHLİKE', description: 'Tam sessizlik (stridor dahi duyulmaz), hava hareketi sıfır, siyanoz, bradikardi, SpO2 < %60.' },
        { category: 'Evre 4: Postoperatif Boyun Kompartman Sendromu', points: 'CERRAHİ ACİL', description: 'Tiroidektomi/Karotis sonrası boyun derisinde gerginlik, trakeal bası, venöz konjesyon ve laringeal ödem.' }
      ],
      larachInterpretation: 'Hava yolu obstrüksiyonunda hasta sessizleştiğinde "rahatladı" zannedilmemelidir; tam tıkanıklıkta stridor kaybolur ve tam sessizlik (silent airway) başlar. Bu kardiyak arrestten önceki son 60-90 saniyedir!',
      differentialDiagnosis: [
        { condition: 'Akut Laringospazm', differentiatingFactors: 'Larson çentik manevrası ve CPAP (15-20 cmH2O) ile çözülebilir; mekanik kitle, pıhtı veya boyun hematomu saptanmaz.' },
        { condition: 'Akut Bronkospazm', differentiatingFactors: 'Yaygın ekspiratuar vizing (wheezing) hakimdir; ETT içinden aspiratör kateteri rahatça trakeaya ilerletilebilir.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum sesi yokluğu, trakeanın karşı tarafa itilmesi, boyun venlerinde dolgunluk ve derin hipotansiyon eşlik eder.' },
        { condition: 'Endotrakeal Devre Ayrılması / Kaçak', differentiatingFactors: 'Ventilatörde tepe basıncı fırlamaz, aksine sıfıra iner; manüel torba basınç hissetmez.' }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'Yardım Çağır & %100 Oksijenizasyonu Başlat',
          action: 'Odadaki herkese net sesle hava yolu obstrüksiyonu olduğunu bildirin, KBB/Genel Cerrahi uzmanını ve acil hava yolu arabasını çağırın. Spontan solunumu olan hastada 15 L/dk rezervuarlı maske ile %100 O2 verin; hastayı paralize etmekten kaçının.',
          criticalNote: 'Kritik lümen darlığında hasta soluyorsa derin sedasyon ve kas gevşetici solunumu tamamen durdurup kıkırdak iskeleti çökertebilir!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'Obstrüksiyonun Mekanizmasını ve Seviyesini Anında Ayırın',
          action: 'Üç kritik soruya 10 saniyede yanıt verin: 1) Hasta yakın zamanda boyun ameliyatı geçirdi mi? (Hematom) 2) Hasta entübe mi? (Tüp tıkanıklığı/bükülmesi/ısırma) 3) Ağız içinde yabancı cisim veya anjiyoödem var mı?',
          criticalNote: 'Doğru nedenin tespiti yanlış girişimle zaman kaybetmeyi önler.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'Boyun Cerrahisi Sonrası İse: DİKİŞLERİ YATAK BAŞINDA HEMEN AÇIN!',
          action: 'Tiroidektomi veya karotis sonrası boyunda gerginlik ve stridor varsa AMELİYATHANE BEKLENMEZ. Yatak başında bistüri veya dikiş makası ile tüm cilt dikişlerini kesin, parmakla veya forsepsle derin fasyayı açıp hematomu ve pıhtıları dışarı boşaltın.',
          criticalNote: 'Trakeayı tıkayan şey sadece pıhtı kitlesi değil, drenaj bozulmasına bağlı gelişen masif venöz larenks ödemidir; dikiş açılınca hava yolu anında rahatlar.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'Entübe Hastada PIP Fırlaması Varsa: ETT Lümenini Test Edin',
          action: 'Hastayı ventilatörden ayırıp balonla havalandırmayı deneyin. Isırma bloğu yerleştirin, kafı tamamen indirin ve ETT içine steril aspiratör kateteri itin. Kateter geçmiyorsa tüp bükülmüş, ısırılmış veya pıhtıyla tıkanmıştır; DERHAL EKSTÜBE EDİN ve maske-balona geçin.',
          criticalNote: 'Tıkanmış bir tüpü açmaya çalışarak vakit kaybetmeyin; çekip çıkarmak hayat kurtarır.',
          priority: 'HIGH'
        },
        {
          stepNumber: 5,
          title: 'Yabancı Cisim İse: Videolaringoskopi Altında Magill Forsepsi ile Çıkarın',
          action: 'Ağız içine doğrudan videolaringoskop yerleştirin; laringeal girişteki yabancı cismi (diş, pıhtı, gazlı bez) Magill forsepsi ile yakalayarak dışarı alın. Güçlü cerrahi aspiratörle (Yankauer) kan ve pıhtıları temizleyin.',
          criticalNote: 'KÖRLEMESİNE PARMAK VEYA FORSEPS İTMEYİN! Yabancı cismi vokal kordların altına ve karinaya itebilirsiniz.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'Akut Mukozal / Laringeal Ödem İse: Farmakolojik Dekompresyon',
          action: 'Deksametazon 0.2 mg/kg IV (maks 8-16 mg) uygulayın. L-Adrenalin (1 mg/mL) ampulünden 2-5 mL SF ile nebülizatör aracılığıyla inhale ettirin. Anjiyoödem şüphesinde İntramüsküler Adrenalin (0.5 mg) uygulayın.',
          criticalNote: 'ACE inhibitörüne bağlı bradikinin aracılı anjiyoödemde antihistaminik ve steroid etkisiz kalabilir; erken entübasyon kararı gecikmemelidir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'Tüm Girişimler Başarısız ve Ventilasyon Yoksa: DAS Plan D eFONA',
          action: 'Hasta entübe ve ventile edilemiyorsa (CICO) vakit kaybetmeden Neşter-Buji-Tüp (Scalpel-Bougie-Tube) krikotiroidotomi uygulayın: No:10 neşterle yatay kesi, buji ilerletme ve ID 6.0 mm kaflı tüp yerleştirme.',
          criticalNote: 'Hipoksik kardiyak arrest gelişmeden önce cerrahi hava yoluna geçilmelidir.',
          priority: 'CRITICAL'
        }
      ],

      airwayObstructionProtocols: {
        neckHematomaEvacuation: {
          title: 'Postoperatif Kompresif Boyun Hematomunu Yatak Başında Boşaltma Protokolü (SCOOP / BAETS)',
          urgencyNote: 'Tiroidektomi veya karotis cerrahisi sonrası gelişen hematomda trakeayı tıkayan asıl unsur supraglottik venöz göllenme ve larenks ödemidir. Ameliyathaneyi aramak veya ekibi beklemek ölümle sonuçlanır; dikişler yatak başında derhal açılmalıdır!',
          steps: [
            'Adım 1 - Cilt Sütürlerini Kesin: Steril dikiş makası veya bistüri ile cilt koter/klipslerini veya dikişlerini boydan boya kesin.',
            'Adım 2 - Fasyayı Parmakla Açın: Derin platisma ve pretrakeal fasya dikişlerini parmaklarınızla veya hemostatik klemp ile iki yana ayırarak hematom lojuna girin.',
            'Adım 3 - Pıhtıları Dışarı Tahliye Edin: Parmak yardımıyla larenks önündeki taze pıhtıları ve hematomu dışarı alın; larenks üzerindeki gergin venöz basınç anında sıfırlanacaktır.',
            'Adım 4 - Steril Gaz ile Pansuman ve Acil Ameliyathane Nakli: Trakea rahatlayıp hasta nefes aldıktan sonra gevşek steril gaz koyup hastayı kanama odağının cerrahi kontrolü için ameliyathaneye transfer edin.'
          ]
        },
        foreignBodyRemoval: {
          title: 'Üst Hava Yolu Yabancı Cisim Ekstraksiyonu Protokolü',
          techniquePearls: [
            'Doğrudan Görüş Altında Müdahale: Videolaringoskop ile glottis netleştirilmeden ağız içine körlemesine forseps sokulmaz.',
            'Doğru Donanım: Magill forsepsi larenks açısına uygun eğimlidir; diş hekimi forsepsi veya düz pensetler kayma yapar.',
            'Rijit Geniş Lümenli Aspirasyon: İnce plastik aspiratör kateterleri kan pıhtısı ve katı parçacıkları çekemez; rijit metalik Yankauer ucu hazır olmalıdır.',
            'Heliox Desteği: Parsiyel obstrüksiyonda gaz dansitesini düşürerek türbülansı azaltır ve hastanın yabancı cisim çevresinden hava almasını kolaylaştırır.'
          ],
          pitfalls: 'Körlemesine parmak manevrası (blind finger sweep) yabancı cismi subglottik alana iterek parsiyel obstrüksiyonu tam obstrüksiyona çeviren en yaygın ölümcül hatadır!'
        },
        ettOcclusionAlgorithm: {
          title: 'Endotrakeal Tüp Ani Tıkanması / Yüksek Basınç Çözüm Algoritması',
          actionSequence: [
            '1. Hastayı ventilatörden derhal ayırın ve manüel solutma balonu (Ambu) ile direnci hissedin.',
            '2. Hastanın tüpü ısırıp ısırmadığını kontrol edin; gerekirse sert ısırma bloğu veya Guedel kanül yerleştirin.',
            '3. Kafı pilot balondan enjektörle tamamen boşaltın (aşırı şişme veya kaf fıtıklaşmasını ekarte etmek için).',
            '4. Tüpün içine steril aspiratör kateteri ilerletin; kateter tüp ucundan çıkamıyorsa lümen pıhtı veya sekret ile kilitlenmiştir.',
            '5. Kateter geçmiyorsa ZAMAN KAYBETMEDEN TÜPÜ EKSTÜBE EDİN, maske-balonla oksijen verin ve yeni tüple yeniden entübe edin.'
          ]
        }
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'Akut hava yolu obstrüksiyonunun temelinde akışkanlar mekaniği (Bernoulli prensibi ve Poiseuille yasası) yatar. Solunum yolunda lümen yarıçapı yarıya indiğinde direnç yarıçapın dördüncü kuvvetiyle (2⁴ = 16 kat) artar. Gaz akış hızı dar alanda fırlarken lümen duvarına binen lateral basınç düşer (Bernoulli etkisi) ve çevreleyen yumuşak dokular lümen içine çekilerek dinamik kollapsı derinleştirir. İnspiratuar çaba arttıkça intratorasik negatif basınç -60 ila -80 cmH2O seviyelerine tırmanarak alveolar-kapiller membranı bozar ve Negatif Basınçlı Pulmoner Ödemi (NPPE) tetikler.',
      stepsTitle: 'Hava Yolu Çöküşü & Asfiksi Dinamiği',
      cascadeSteps: [
        {
          phase: '1. Kritik Lümen Daralması & Türbülans',
          mechanism: 'Hematom basısı, yabancı cisim veya ödem lümeni daraltır; hava akımı laminerden türbülana geçer, direnç katlanarak artar.'
        },
        {
          phase: '2. Bernoulli Etkisi & Dinamik Dokusal Kollaps',
          mechanism: 'Daralan segmentte akış hızı artarken lateral transmural basınç düşer; farengeal/laringeal yumuşak dokular içeri emilerek tıkanmayı pekiştirir.'
        },
        {
          phase: '3. Aşırı Negatif İnstratorasik Basınç Üretimi',
          mechanism: 'Hasta tıkalı hava yoluna karşı çaresizce nefes almaya çabalar (Mueller manevrası); göğüs içinde -80 cmH2O negatif basınç oluşur.'
        },
        {
          phase: '4. Pulmoner Kapiller Kaçak (NPPE) & HPV',
          mechanism: 'Aşırı hidrostatik negatif basınç pulmoner kapillerden alveollere masif sıvı sızdırır; hipoksik pulmoner vazokonstriksiyon sağ kalbi ezer.'
        },
        {
          phase: '5. Ağır Alveoler Asfiksi, Bradikardi & Arrest',
          mechanism: 'FRC saniyeler içinde tükenir; PaO2 < 30 mmHg altına iner, hipoksik miyokardiyal ileti durmasıyla sinüs bradikardisi ve asistoli gelişir.'
        }
      ],
      summaryText: 'Özetle akut hava yolu obstrüksiyonu; yalnızca mekanik bir tıkaç değil, Bernoulli prensibiyle dokuları içeri emen, aşırı negatif basınçla akciğeri suyla dolduran (NPPE) ve dakikalar içinde anoksik kardiyak arreste sürükleyen fırtınalı bir krizdir.'
    },

    // 6) Klinik Özellikler & Prezentasyonu
    presentation: {
      earlySigns: [
        'Yüksek Perdeli İnspiratuar Stridor (Üst solunum yolu darlığının en tipik erken sesi)',
        'Hava Açlığı, Panik, Ajitasyon ve Boğulma Hissi (Hasta konuşamaz, işaretlerle boğazını gösterir)',
        'Taşikardi ve Hipertansiyon (Masif adrenerjik fırtına)',
        'Yardımcı Solunum Kaslarının Devreye Girmesi (Sternokleidomastoid ve skalen kas kontraksiyonları)'
      ],
      progressingSigns: [
        'Paradoksal "See-Saw" (Tahterevalli) Solunumu: İnspiryumda göğüs kafesi çökerken karın kabarır',
        'Derin Suprasternal, Supraklaviküler ve İnterkostal Çekilmeler',
        'Kapnografide Ekspiratuar Plato Yüksekliğinin Bozulması veya Tepe Basıncının PIP > 45 cmH2O Olması',
        'SpO2 Seviyesinin Hızla Düşmesi (%85-70 aralığı) ve Ciltte Soğuk Terleme / Alacalı Görünüm'
      ],
      lateSigns: [
        'TAM SESSİZLİK (Silent Airway): Stridor tamamen kesilir, hava hareketi SIFIRDIR; arrest öncesi son evredir!',
        'Ağır Santral Siyanoz (Koyu mor dudaklar, dil ve tırnak yatakları)',
        'Şiddetli Sinüs Bradikardisi ve Hipotansiyon (Miyokardiyal anoksiye bağlı kardiyak arrest başlangıcı)',
        'Bilinç Kaybı, Hipoksik Konvülsiyon ve Asistoli / PEA'
      ],
      specialAlertTitle: 'HAYATİ İKAZ: POSTOPERATİF BOYUN HEMATOMU AMELİYATHANEYİ BEKLEMEZ!',
      specialAlertContent: 'Tiroidektomi veya karotis cerrahisi sonrası gelişen hematomda trakeayı tıkayan şey sadece pıhtı kitlesi değil, drenajın bozulmasıyla gelişen masif supraglottik venöz göllenme ve larenks ödemidir. Ameliyathaneyi aramak veya anestezi ekibini beklemek ölümle sonuçlanır. Yatak başında derhal cilt, platisma ve derin fasya dikişleri kesilmeli ve parmakla hematom boşaltılmalıdır!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Cerrahi Boyun Girişimleri: Tiroidektomi, paratiroidektomi, karotis endarterektomisi ve anterior servikal diskektomi (ACDF) geçiren hastalar ilk 24 saat hematom yönünden yüksek risklidir.',
        'Antikoagülan / Antiagregan Kullanımı: Perioperatif dönemde kan sulandırıcı kullanan hastalarda kompartman hematomu riski 4-5 kat artar.',
        'Preoperatif Stridor ve Kitle Basısı: Büyük guatr, laringeal tümör veya retrofaringeal apsesi olan olgularda indüksiyon öncesi fiberoptik değerlendirme şarttır.',
        'Ağız İçi Diş Muayenesi: Gevşek diş, sallanan kron ve köprüler indüksiyon öncesinde mutlaka belgelenmeli ve laringoskopide korunmalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Acil Hava Yolu Obstrüksiyonu & Cerrahi Dekompresyon Hazırlık Protokolü',
        steps: [
          'Yatak Başı Dikiş Açma Seti Hazırlığı: Boyun cerrahisi geçiren her hastanın yatak başında (PACU/servis) bir adet No:10/11 bistüri, steril dikiş makası ve hemostatik klemp hazır bulundurulmalıdır.',
          'Güçlü Aspiratör ve Rijit Uç Kontrolü: Aspiratör emiş gücünün en az -500 mmHg vakum ürettiği ve metal rijit Yankauer ucunun takılı olduğu doğrulanmalıdır.',
          'Videolaringoskop & Farklı Boyda Magill Forsepsleri: Pediatrik ve erişkin Magill forsepsleri acil arabasının en üst çekmecesinde olmalıdır.',
          'Heliox Tüpü ve Nebülizatör Hazırlığı: Subglottik ve trakeal darlıklarda türbülansı azaltmak için 80:20 Heliox gaz kaynağı hazır tutulmalıdır.',
          'Neşter-Buji-Tüp Kiti: DAS Plan D cerrahi hava yolu kiti laringoskopi palasının hemen yanında açık bekletilmelidir.'
        ]
      },
      cartChecklist: [
        'No: 10 ve No: 11 Cerrahi Neşter / Dikiş Makası (Boyun hematomu acil açma seti)',
        'Hemostatik Klemp (Pean / Kelly pensi - derin fasyayı ayırmak için)',
        'Erişkin ve Pediatrik Magill Forsepsleri (Yabancı cisim ekstraksiyonu)',
        'Rijit Metal Yankauer Aspiratör Ucu ve Geniş Lümenli Aspiratör Hortumu',
        'Videolaringoskop (Geniş açılı hiperkavisli pala)',
        'ID 6.0 mm Kaflı Endotrakeal Tüp ve 15 Fr Coudé Uçlu Buji (eFONA Kiti)',
        'Sert Isırma Blokları (Bite-block) ve Guedel / Williams Hava Yolları',
        'Deksametazon 8 mg Ampul ve 1:1000 Adrenalin Ampulleri (Nebülizasyon için)'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      recurrenceRate: 'İlk 6-8 saat içinde re-kanama veya reaktif laringeal ödem riski en yüksek seviyededir; hastaların %80\'inde hematom ilk 6 saatte gelişir.',
      recurrenceRiskBadge: 'RE-KANAMA & PROGRESİF ÖDEM RİSKİ: İLK 6 SAAT',
      icuMonitoringDuration: 'Hava yolu obstrüksiyonu açılan hasta en az 24 saat Yoğun Bakım Ünitesinde (YBÜ) entübe veya yakın hava yolu izleminde tutulmalıdır.',
      maintenanceTherapy: 'Laringeal ödem için IV Deksametazon (8 mg her 8 saatte bir) idamesi, nemlendirilmiş oksijen desteği, başın 30-45° elevasyonu, NPPE geliştiyse PEEP desteği ile koruyucu mekanik ventilasyon ve yakın KBB/cerrahi gözetimi.',
      monitoringParameters: [
        'Kaf-Kaçak Testi (Cuff Leak Test): Ekstübasyon öncesi kaf indirilerek laringeal ödemin gerilediği ve tüp çevresinden hava kaçağı olduğu doğrulanmalıdır.',
        'Seri Fleksibl Fiberoptik Muayene: Vokal kord hareketleri, supraglottik ödem ve lümen açıklığı doğrulanmalıdır.',
        'Boyun Çevresi ve Dren Takibi: Boyun çevresi mezura ile takip edilmeli, drenlerden saatlik kanama miktarı kaydedilmelidir.',
        'Akciğer Grafisi: Negatif basınçlı pulmoner ödem (NPPE) ve pnömotoraks ekarte edilmelidir.',
        'Arter Kan Gazı ve Laktat Klirensi: Doku oksijenizasyonunun düzelmesi izlenmelidir.'
      ],
      expectedComplications: [
        'Negatif Basınçlı Pulmoner Ödem (NPPE - Obstrüksiyon açıldıktan sonra pembe köpüklü sekresyon)',
        'Post-obstrüktif Pulmoner Ödem ve Atelektazi',
        'Hipoksik İskemik Ensefalopati (Gecikmiş vakalarda)',
        'Rekürren Laringeal Sinir Hasarı ve Vokal Kord Paralizisi',
        'Trakeal Stenoz ve Kıkırdak Nekrozu'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'Fleksibl Fiberoptik Nazofaringolaringoskopi',
          description: 'Stabilizasyon sonrası ve ekstübasyondan önce supraglottik venöz ödem derecesini, vokal kordların abdüksiyon açıklığını ve laringeal hematomu doğrudan değerlendirmek.'
        },
        {
          testName: 'Kontrastlı Boyun ve Toraks BT Anjiyografi',
          description: 'Hasta stabilize edildikten sonra cerrahi sahada devam eden psödoanevrizma, vasküler kanama odağı veya mediastinal yayılımı saptamak.'
        }
      ],
      prognosisSummary: 'Erken fiziksel dekompresyon (yatak başı hematom tahliyesi, yabancı cisim ekstraksiyonu veya tıkalı ETT değişimi) uygulanan hastalarda mortalite <%1 ve nörolojik sağkalım %98\'dir. Tereddüt edilen ve süresi 4 dakikayı aşan anoksik tablolarda hipoksik beyin hasarı ve mortalite hızla tırmanır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Boyun Hematomunda Trakeayı Sıkan Şey Pıhtı Değil, Venöz Ödemdir!',
        takeaway: 'Tiroidektomi sonrası oluşan hematom rijit trakeayı doğrudan ezmekten ziyade, boyun venöz dönüşünü tıkayarak supraglottik yapılarda (epiglottis ve aritenoidler) masif venöz göllenme ve fırtınalı ödeme yol açar. Dikiş açılınca venöz basınç düşer ve hava yolu açılır.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Ölümcül Hata: Ameliyathaneyi Beklemek',
        takeaway: 'Boyun hematomunda "cerrahı çağırdık, ameliyathaneyi hazırlıyoruz" demek mortaliteyi %30 artıran en büyük klinik hatadır. Müdahale derhal yatak başında sterilite aranmaksızın dikişler kesilerek yapılmalıdır.',
        category: 'Tuzak'
      },
      {
        title: 'Körlemesine Parmakla Yabancı Cisim Aranmaz!',
        takeaway: 'Ağız içine körlemesine parmak veya klemp sokmak (blind sweep) orofarenksteki gevşek yabancı cismi vokal kordların arasına veya subglottik alana iterek parsiyel tıkanmayı tam tıkanmaya çevirir. Daima videolaringoskopi ve Magill forsepsi kullanılmalıdır.',
        category: 'Tuzak'
      },
      {
        title: 'Tam Sessizlik (Silent Airway) İyileşme Değildir!',
        takeaway: 'Stridoru olan bir hastada sesin aniden kesilmesi tablonun düzeldiğini değil, tıkanmanın tam obstrüksiyona dönüştüğünü gösterir. Bu durum kardiyak arrestten önceki son evredir.',
        category: 'Ezber Bozan'
      },
      {
        title: 'ACE İnhibitörü Anjiyoödeminde Steroid ve Antihistaminik Yanıtsızlığı',
        takeaway: 'ACE inhibitörüne bağlı anjiyoödem histamin değil, Bradikinin aracılıdır. Bu nedenle steroid ve antihistaminiklere yanıt vermez; havayolu hızla daralır. Erken entübasyon veya C1-INH / İkatibant düşünülmelidir.',
        category: 'Kritik Doz'
      },
      {
        title: 'Entübe Hastada PIP Fırlaması: Kaf Herniasyonu ve Isırma',
        takeaway: 'Entübe hastada ani ventilatör yüksek basınç alarmında kafın aşırı şişip tüp ucunu tıkaması (herniasyon) veya hastanın tüpü ısırması ilk akla gelmelidir. Kaf indirilmeli ve ısırma bloğu konulmalıdır.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Heliox (Helyum-Oksijen) Akış Fiziği',
        takeaway: 'Helyumun yoğunluğu havanın 1/7\'sidir. Daralmış hava yolundaki türbülanslı akımı laminer akıma çevirerek solunum işini %50\'ye varan oranda azaltır ve gaz alışverişini rahatlatır.',
        category: 'Ezber Bozan'
      },
      {
        title: 'Ekstübasyon Öncesi "Kaf-Kaçak Testi" Zorunluluğu',
        takeaway: 'Hava yolu ödemi veya cerrahi bası geçirmiş hastada kaf indirildiğinde trakeal hava kaçağı (cuff leak) duyulmuyorsa hasta KESİNLİKLE ekstübe edilmemelidir; larenks ödemi devam etmektedir.',
        category: 'Sınav / Klinik Notu'
      }
    ],

    // 10) Kullanılan Kaynaklar & İleri Okuma
    references: [
      {
        authors: 'Harding J, Sebag-Montefiore D, et al. (Difficult Airway Society & BAETS)',
        title: 'Multidisciplinary consensus guideline for the management of haematoma after thyroid surgery.',
        journal: 'Anaesthesia. 2021;76(7):912-921.',
        year: '2021',
        relevance: 'Postoperatif boyun hematomunda yatak başı dikiş açma algoritması (SCOOP protokolü).'
      },
      {
        authors: 'Frerk C, Mitchell VS, McNarry AF, et al. (DAS)',
        title: 'Difficult Airway Society 2015 guidelines for management of unanticipated difficult intubation in adults.',
        journal: 'British Journal of Anaesthesia. 2015;115(6):827-848.',
        year: '2015',
        relevance: 'Hava yolu obstrüksiyonu, başarısız entübasyon ve acil cerrahi hava yolu krikotiroidotomi basamakları.'
      },
      {
        authors: 'Cook TM, Woodall N, Frerk C. (Royal College of Anaesthetists)',
        title: 'Major complications of airway management in the UK: results of the Fourth National Audit Project (NAP4).',
        journal: 'British Journal of Anaesthesia. 2011;106(5):617-642.',
        year: '2011',
        relevance: 'Hava yolu obstrüksiyonu vakalarında gecikmiş cerrahi kararların ve tüp tıkanıklıklarının analizi.'
      },
      {
        authors: 'Apfelbaum JL, Hagberg CA, Connis RT, et al. (ASA)',
        title: '2022 American Society of Anesthesiologists Practice Guidelines for Management of the Difficult Airway.',
        journal: 'Anesthesiology. 2022;136(1):31-81.',
        year: '2022',
        relevance: 'Zor hava yolunda fiberoptik vizüalizasyon, supraglottik cihazlar ve acil invaziv kurtarma standartları.'
      }
    ]
  },

  'aspiration': {
    id: 'aspiration',
    title: 'Pulmoner Aspirasyon (Mendelson Sendromu)',
    subTitle: 'Gastrik asit ve partikül aspirasyonunda anında Trendelenburg pozisyonu, orofaringeal/trakeal aspirasyon, bronkodilatasyon ve solunum desteği protokolü.',
    codeColor: 'amber',
    severityBadge: 'HAYATİ KRİZ (KOD KIRMIZI) - KİMYASAL PNÖMONİT & AKUT HİPOKSEMİ',
    keyCallout: 'Aspirasyon anında ilk ve en kritik eylem Trendelenburg pozisyonu ve orofaringeal aspirasyondur; asla hemen pozitif basınçlı ventilasyon yapılmaz, asit periferik bronşiollere itilmemelidir! Rutin profilaktik antibiyotik ve steroid önerilmez.',
    quickCalculatorType: 'aspiration',

    // 2) Tanımlama ve Introduction
    introduction: {
      definition: 'Pulmoner Aspirasyon; gastrik asit, safra, mide içeriği veya katı partiküllerin larenks seviyesini aşarak trakeobronşiyal ağaca ve akciğer parankimine geçmesiyle oluşan, dakikalar içinde şiddetli kimyasal pnömonit (Mendelson Sendromu), bronkospazm, atelektazi ve akut respiratuar distres sendromuna (ARDS) yol açabilen hayatı tehdit edici perioperatif bir krizdir.',
      epidemiology: 'Genel anestezide pulmoner aspirasyon sıklığı elektif cerrahilerde yaklaşık 1:3.000 - 1:4.000, acil cerrahilerde ve obstetrik vakalarda ise 1:600 - 1:900 oranında bildirilmektedir. Perioperatif anesteziye bağlı mortalitenin yaklaşık %10-15\'inden tek başına aspirasyon sorumludur. Aspirasyonların %50\'den fazlası indüksiyon ve laringoskopi sırasında, %20-30\'u ise ekstübasyon ve uyanma evresinde gerçekleşir.',
      triggers: [
        'Yetersiz Preoperatif Açlık Süresi: Acil cerrahi, travma veya açlık kurallarına uymayan tok karınlı hastalar',
        'Gecikmiş Mide Boşalması (Gastroparezi): Diyabetes mellitus, akut travma/ağrı, opioid kullanımı, ileus, akut karın, gebelik (> 16. hafta), morbid obezite',
        'Bozulmuş Alt Özofagus Sfinkter (LES) Tonusu: Ağır gastroözofageal reflü (GÖRH), hiatal herni, skleroderma, mide çıkım darlığı',
        'Zor Maske Ventilasyonu & Gastrik İnsuflasyon: Yüksek tepe basıncıyla (> 20 cmH2O) ventilasyon sonucu havanın mideye dolup kardiyayı açması',
        'Yüzeyel Anestezi Altında Laringoskopi ve Ekstübasyon: Yutma ve öksürük refleksleri tam dönmeden veya ıkınma sırasında ekstübasyon yapılması',
        'Supraglottik Havayolu (LMA) ile Pozitif Basınçlı Ventilasyon: Yüksek hava yolu basıncı veya uygunsuz yerleşim'
      ],
      safeAgents: [
        'Hızlı Seri İndüksiyon (RSI / RSII): Preoksijenizasyon, hızlı hipnotik + Rokuronyum (1.0-1.2 mg/kg) veya Süksinilkolin (1.5 mg/kg), maske yapmadan hızlı kaflı entübasyon.',
        'Gastrik Ultrasonografi (GUS): Antral alan ölçümü ve Perlas sınıflaması ile aspirasyon riskinin kantitatif belirlenmesi.',
        'Preoperatif Gastrik Asit & Volüm Profilaksisi: H2 reseptör antagonisti / PPI + Berrak berrak antiasit (Sodyum sitrat 0.3 M) + Metoklopramid (10 mg IV).',
        'Uyanık Fiberoptik Entübasyon (AFOI): Yüksek aspirasyon riski ve eşlik eden zor havayolunda altın standarttır.',
        'Tam Uyanık Ekstübasyon: Koruyucu farengeal/laringeal refleksler tam dönmüş, hasta komutlara uyar durumda ve baş-boyun elevasyonundayken ekstübasyon.',
        'Güçlü Rijit Aspiratör (Yankauer): İndüksiyon öncesi çalışır durumda yastığın hemen altında hazır bulunmalıdır.'
      ],
      mortalityStats: 'Mendelson Sendromu (pH < 2.5 ve gastrik volüm > 0.4 mL/kg [~25 mL]): Asit aspirasyonunda mortalite %30 - %60 seviyelerine kadar çıkabilir. Katı partiküllü aspirasyonda ise akut mekanik boğulma ve kardiyak arrest riski fırlar.',
      clinicalUrgency: 'Kusma/regürjitasyon görüldüğü saniyede pozisyon ve aspirasyon refleks olarak uygulanmalıdır; tereddüt edilen her saniye asidin akciğer periferine yayılmasına yol açar.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Aspirasyon tanısı doğrudan orofarenkste/ETT içinde gastrik sıvının görülmesiyle ve ardından dakikalar içinde gelişen hipoksemi, hırıltı ve hava yolu basınç artışıyla konur.',
      clinicalCriteria: [
        'Orofarenkste, Laringoskop Palasında veya Endotrakeal Tüp İçinde Mide İçeriği / Safra Görülmesi',
        'Ventilasyon Direncinde Ani Artış ve Tepe İnspiratuar Basınç (PIP) Fırlaması',
        'Oksijen Desatürasyonu (SpO2\'nin hızla <%90 seviyesine inmesi)',
        'Oskültasyonda Yaygın Bilateral Ronküs, Vizing (Wheezing) ve Kaba Raller',
        'Endotrakeal Tüpten Pembe Köpüklü veya Kahverengi Sekresyon Gelmesi',
        'Taşikardi, Hipotansiyon veya Laringeal Refleksle Ani Vagal Bradikardi'
      ],
      larachScale: [
        { category: 'Derece 1: Subklinik / Minör Aspirasyon', points: 'Hafif Risk', description: 'Orofarenkste sıvı var, trakeaya kaçış şüpheli, SpO2 normal, solunum sesleri olağan.' },
        { category: 'Derece 2: Akut Kimyasal Bronkospazm', points: 'Orta / Yüksek Risk', description: 'Bilateral vizing, hafif desatürasyon (SpO2 %88-92), orta derecede PIP artışı, taşikardi.' },
        { category: 'Derece 3: Yaygın Kimyasal Pnömonit (Mendelson)', points: 'HAYATİ TEHLİKE', description: 'pH < 2.5 asit teması, derin hipoksemi (SpO2 < %85), raller, kapiller kaçak ve non-kardiyojenik ödem.' },
        { category: 'Derece 4: Katı Partiküllü Trakeobronşiyal Tıkanma', points: 'KRİTİK ACİL', description: 'Ana bronş veya karina obstrüksiyonu, tek/çift taraflı atelektazi, tam solunum durması.' }
      ],
      larachInterpretation: 'Mendelson Sendromunun klasik tanımı: Aspire edilen sıvının pH\'sı < 2.5 ve hacmi > 0.4 mL/kg (erişkinde ~25 mL) olduğunda alveoler kimyasal yanık kaçınılmazdır.',
      differentialDiagnosis: [
        { condition: 'Primer Akut Bronkospazm', differentiatingFactors: 'Mide içeriği görülmez, aspiratör kateteri temizdir, bronkodilatöre hızlı yanıt verir.' },
        { condition: 'Laringospazm', differentiatingFactors: 'Ekstübasyon evresinde stridor vardır, tüp içinde sekresyon yoktur, CPAP ile açılır.' },
        { condition: 'Kardiyojenik Pulmoner Ödem', differentiatingFactors: 'Kardiyak disfonksiyon öyküsü, yüksek CVP/PCWP, troponin/BNP yüksekliği eşlik eder.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum sesi yokluğu, trakeal deviasyon ve derin hipotansiyon saptanır.' }
      ]
    },

    // 4) Akut Kriz Yönetimi
    crisisManagement: {
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'Trendelenburg Pozisyonu Ver & Pozitif Basınçlı Ventilasyonu DURDUR',
          action: 'Masayı hemen 30° baş aşağı (Trendelenburg) eğin ve hastanın başını yana çevirin. Solunum balonunu sıkmayı DERHAL KESİN. Pozitif basınç uygulamak asidi ve partikülleri trakeobronşiyal ağacın derinliklerine üfler!',
          criticalNote: 'ASLA HEMEN HAVALANDIRMA YAPMAYIN! İlk refleks pozisyon vermek ve solutmayı durdurmaktır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'Orofarenksi ve Ağız İçini Güçlü Rijit Yankauer ile Agresif Aspire Et',
          action: 'Geniş lümenli rijit metal Yankauer ucunu kullanarak ağız içi, farenks ve laringeal girişte göllenmiş olan tüm mide içeriğini, safrayı ve partikülleri vakumla temizleyin.',
          criticalNote: 'İnce yumuşak kateterler partikülleri çekemez; rijit metal Yankauer şarttır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'Hava Yolunu Hızla Kaflı Endotrakeal Tüp ile Emniyete Alın',
          action: 'Hasta entübe değilse doğrudan videolaringoskopi ile kordları görün ve kaflı endotrakeal tüpü yerleştirin. Kafı DERHAL şişirerek trakeayı daha fazla gastrik içeriğin akışına karşı izole edin. LMA varsa derhal çekilip entübasyona geçilmelidir.',
          criticalNote: 'LMA aspirasyondan korumaz; kaflı endotrakeal tüp altın standarttır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'Endotrakeal Tüp İçinden Trakeal Aspirasyon Yapın (SF İLE LAVAJ YAPMAYIN!)',
          action: 'Tüpe pozitif basınç vermeden önce steril aspirasyon kateterini ETT içine ilerleterek trakeadaki sıvıyı aspire edin. KESİNLİKLE ETT İÇİNE SERUM FİZYOLOJİK SIKIP LAVAJ YAPMAYIN; bu asidi alveollere yıkar ve hasar alanını katlar!',
          criticalNote: 'Tüp içine SF lavajı yapmak tarihi bir hatadır ve asidi tüm akciğere yayar!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'Oksijenizasyonu ve Koruyucu Ventilasyonu Başlatın (PEEP Ekle)',
          action: '%100 O2 ile ventilasyona başlayın. Atelektaziyi açmak ve intrapulmoner şantı kırmak için 6-8 cmH2O PEEP ekleyin. Akciğer koruyucu ventilasyon uygulayın: Düşük tidal volüm (6 mL/kg PBW) ve plato basıncı < 30 cmH2O.',
          criticalNote: 'PEEP mikroatelektaziyi önler ve alveolleri açık tutarak hipoksemiyi kırar.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'Eşlik Eden Kimyasal Bronkospazmı Tedavi Edin',
          action: 'ETT içine ara parça ile Salbutamol MDI (8-10 puf) uygulayın veya nebülizatör bağlayın. Şiddetli hava yolu direncinde Magnezyum Sülfat (2 g IV 15-20 dakikada) infüze edin.',
          criticalNote: 'Rutin hidrokortizon/metilprednizolon VERMEYİN; kimyasal pnömonitte steroidin faydası yoktur, enfeksiyon riskini artırır.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'Mideyi Nazogastrik / Orogastrik Sonda ile Boşaltın ve Dekomprese Edin',
          action: 'Geniş lümenli (Ch 16-18) nazogastrik veya orogastrik sonda takın; midedeki kalan sıvıyı aspire edin ve serbest drenaja bırakın.',
          criticalNote: 'Operasyon süresince ve uyanma evresinde mide dekomprese tutulmalıdır.',
          priority: 'MEDIUM'
        }
      ],

      aspirationProtocols: {
        chemicalVsParticulate: [
          {
            type: 'Asit Kimyasal Pnömoniti (Mendelson Sendromu)',
            characteristics: 'pH < 2.5 berrak gastrik asit aspirasyonu. Saniyeler içinde Tip I/II pnömosit hasarı, sürfaktan inaktivasyonu, alveoler kapiller kaçak ve atelektazi gelişir. Bakteriyel enfeksiyon değildir!',
            managementKey: 'PEEP ile mekanik ventilasyon, bronkodilatasyon, destek tedavisi. Rutin antibiyotik ve steroid YASAKTIR.'
          },
          {
            type: 'Katı Partiküllü / Yemek Aspirasyonu',
            characteristics: 'Gıda parçaları, sebze/et lifleri ana bronş veya karinaya oturur. Mekanik hava yolu obstrüksiyonu, lobar kollaps/atelektazi ve anaerobik abse riski taşır.',
            managementKey: 'Acil Rijit / Fleksibl Fiberoptik Bronkoskopi ile partiküllerin forseps veya basket ile çıkarılması şarttır.'
          },
          {
            type: 'Sekonder Bakteriyel Pnömoni (Geç Faz)',
            characteristics: 'Genelde aspirasyondan 48-72 saat sonra gelişir. Ateş tırmanışı, lökositoz, pürülan balgam ve akciğer grafisinde yeni kavitasyon/infiltrasyon ile kendini gösterir.',
            managementKey: 'Kültür ve antibiyogram sonucuna göre hedefe yönelik sistemik antibiyoterapi başlanır.'
          }
        ],
        antibioticAndSteroidPolicy: {
          title: 'Kanıta Dayalı Klinik Kural: Profilaktik Antibiyotik ve Kortikosteroid Neden Önerilmez?',
          recommendation: 'Akut aspirasyon anında profilaktik antibiyotik ve rutin steroid verilmesi KESİNLİKLE ENDİKE DEĞİLDİR (Kanıt Düzeyi 1A).',
          evidenceRationale: 'Mendelson sendromu bakteriyel bir enfeksiyon değil, asidin yol açtığı steril bir kimyasal yanıktır. Erken antibiyotik vermek bakteriyel kolonizasyonu engellemez, aksine dirençli hastane suşlarının (Pseudomonas, MRSA) türemesine neden olur. Kortikosteroidler ise hücresel iyileşmeyi bozar ve immünsupresyon yaparak sekonder pnömoni riskini katlar.'
        },
        gastricUsgAssessment: [
          {
            grade: 'Perlas Grade 0 (Boş Mide)',
            description: 'Hem sırtüstü (supin) hem de sağ lateral dekübit (RLD) pozisyonda gastrik antrum tamamen kollabe ("boş hedef / öküz gözü" görünümü).',
            riskLevel: 'Düşük Aspirasyon Riski: Standart anestezi indüksiyonu güvenlidir.'
          },
          {
            grade: 'Perlas Grade 1 (Düşük Volüm Berrak Sıvı)',
            description: 'Sırtüstü pozisyonda antrum boş görünürken, yalnızca sağ lateral dekübitte az miktarda hipoekoik berrak sıvı izlenir (< 1.5 mL/kg).',
            riskLevel: 'Düşük / Orta Risk: Genelde güvenli kabul edilir; klinik risk faktörleri gözden geçirilir.'
          },
          {
            grade: 'Perlas Grade 2 (Yüksek Volüm veya Katı Gıda)',
            description: 'Hem sırtüstü hem de sağ lateral pozisyonda genişlemiş antrumda berrak sıvı (> 1.5 mL/kg) veya ekojenik heterojen katı gıda ("buzlu cam" / partiküllü içerik) izlenir.',
            riskLevel: 'YÜKSEK ASPİRASYON RİSKİ: Hızlı Seri İndüksiyon (RSI) veya operasyonun ertelenmesi şarttır.'
          }
        ]
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'Pulmoner aspirasyonun patofizyolojisi iki ana mekanizmaya dayanır: Düşük pH\'lı serbest hidroklorik asidin kimyasal yakıcı etkisi (Mendelson Sendromu) ve partiküllerin mekanik hava yolu obstrüksiyonu. Gastrik asit (pH < 2.5) alveolo-kapiller membranla temas ettiği anda Tip I ve Tip II pnömositleri hızla nekroza uğratır. Endojen sürfaktan denatüre olur ve inaktive edilir; alveoler yüzey gerilimi fırlar ve dakikalar içinde yaygın mikroatelektazi gelişir. Kapiller geçirgenlik bozulur; alveollere masif proteinöz plazma ve eritrosit sızarak non-kardiyojenik pulmoner ödem tablosu oluşturur. Bu durum masif intrapulmoner şanta (sağdan sola şant) ve refrakter hipoksemiye yol açar.',
      stepsTitle: 'Kimyasal Pnömonit & Alveoler Hasar Kaskadı',
      cascadeSteps: [
        {
          phase: '1. Asit Teması & Pnömosit Nekrozu',
          mechanism: 'pH < 2.5 hidroklorik asit Tip I ve Tip II pnömositleri hızla yakar; alveoler epitel bariyeri parçalanır.'
        },
        {
          phase: '2. Sürfaktan Yıkımı & Masif Atelektazi',
          mechanism: 'Asit sürfaktanı denatüre eder; alveoller kollabe olur ve sağdan-sola intrapulmoner şant fırlar.'
        },
        {
          phase: '3. Alveolo-Kapiller Kaçak & Ödem',
          mechanism: 'Endotelyal geçirgenlik bozulur; alveoller proteinöz plazma ve eksüda ile dolarak kimyasal akciğer ödemi oluşturur.'
        },
        {
          phase: '4. Nötrofil Kemotaksisi & Enflamatuar Fırtına',
          mechanism: 'Sitokinler (TNF-alfa, IL-8) ve serbest radikaller salınır; masif enflamatuar hücre infiltrasyonu parankimi tahrip eder.'
        },
        {
          phase: '5. Ağır Şant Hipoksemisi & ARDS',
          mechanism: 'Ventilasyon-perfüzyon uyumsuzluğu tavan yapar; refrakter hipoksemi (PaO2/FiO2 < 200) ve tam ARDS tablosu gelişir.'
        }
      ],
      summaryText: 'Özetle pulmoner aspirasyon bir enfeksiyon değil, dakikalar içinde sürfaktanı yok eden, kapiller membranı patlatıp akciğeri eksüdayla dolduran ve refrakter şant hipoksemisiyle ARDS\'ye sürükleyen ağır bir kimyasal yanık tablosudur.'
    },

    // 6) Klinik Özellikler & Prezentasyonu
    presentation: {
      earlySigns: [
        'Orofarenkste, Laringoskop Palasında veya Endotrakeal Tüp İçinde Mide İçeriği Görülmesi',
        'SpO2 Seviyesinin Hızla %90\'ın Altına Düşmesi (Akut Desatürasyon)',
        'Ventilatörde Tepe İnspiratuar Basıncında (PIP) Ani Yükselme',
        'Oskültasyonda Ani Başlayan Yaygın Ekspiratuar Wheezing (Hırıltı) ve Ronküsler'
      ],
      progressingSigns: [
        'Endotrakeal Tüpten Pembe Köpüklü veya Kahverengi Sekresyon Gelmesi',
        'Arter Kan Gazında Ağır Hipoksemi ve PaO2/FiO2 Oranının < 200 Seviyesine İnmesi',
        'Dinamik Akciğer Kompliyansında Ciddi Düşüş (Sert Akciğer)',
        'Sinüs Taşikardisi, Hipertansiyon veya Laringeal Refleks Kaynaklı Vagal Bradikardi'
      ],
      lateSigns: [
        'Tam Akut Respiratuar Distres Sendromu (ARDS Tablosu)',
        'Akut Kor Pulmonale (Hipoksik pulmoner vazokonstriksiyona bağlı sağ kalp yetmezliği)',
        'Refrakter Laktik Asidoz ve Mikst Asidoz',
        'Kardiyovasküler Kollaps, Ağır Hipotansiyon ve Kardiyak Arrest'
      ],
      specialAlertTitle: 'HAYATİ TUZAK: ETT İÇİNE ASLA SERUM FİZYOLOJİK İLE LAVAJ YAPMAYIN!',
      specialAlertContent: 'Eski alışkanlıkla tüp içine 5-10 mL SF sıkıp aspire etmeye çalışmak en ölümcül hatalardandır. Sıvı vermek asidi nötralize etmez; aksine asidi ve partikülleri trakeadan alıp en uç küçük bronşiyollere ve alveollere doğru yıkayarak hasarlı akciğer alanını katlayarak genişletir ve sürfaktanı tamamen süpürür!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'ASA Preoperatif Açlık Kılavuzu (2-4-6-8 Kuralı): Berrak sıvılar 2 saat, anne sütü 4 saat, hafif yemek/formül süt 6 saat, yağlı/kızartma yemekler en az 8 saat açlık gerektirir.',
        'Gastrik Ultrasonografi ile Antrum Taraması: Açlık süresi şüpheli veya gastroparezi riski olan olgularda antral ekojenite ve çap ölçülmelidir.',
        'Farmakolojik Aspirasyon Profilaksisi: Riskli elektif hastalarda ameliyattan 1 saat önce oral/IV H2 blokörü (Famotidin) veya PPI + Metoklopramid (10 mg) uygulanmalıdır.',
        'Antiasit Seçimi: Partiküllü antiasitler (Magnezyum/Alüminyum hidroksit) aspire edilirse kendileri yabancı cisim reaksiyonu yapar; daima berrak sodyum sitrat (0.3 M 30 mL) tercih edilmelidir.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Aspirasyon Riski Yüksek Hasta İçin Hızlı Seri İndüksiyon (RSI) Hazırlık Protokolü',
        steps: [
          'Aspiratör Vakum Testi: Rijit metal Yankauer ucunun takılı olduğu ve emiş gücünün -500 mmHg vakum ürettiği indüksiyondan önce doğrulanmalıdır.',
          'Preoksijenizasyon: Sıkı oturan maske ile 3-5 dakika %100 O2 ile normal tidal soluma veya 8 derin soluk yaptırılmalıdır (EtO2 > %85-90).',
          'RSI İlaç Hazırlığı: Hızlı etki başlangıçlı hipnotik (Propofol / Ketamin) + Rokuronyum (1.0-1.2 mg/kg) veya Süksinilkolin (1.5 mg/kg) çekili olmalıdır.',
          'Maske Ventilasyonundan Kaçınma: Apne sonrası maske ile pozitif basınçlı solutma yapılmaz; doğrudan kordlar görülerek kaflı tüp yerleştirilir.',
          'Nazogastrik Sonda Protokolü: İndüksiyon öncesi midede sonda varsa tamamen aspire edilip çekilmeli veya açık bırakılmalıdır; gevşek LES üzerinden reflüye zemin hazırlayabilir.'
        ]
      },
      cartChecklist: [
        'Rijit Metal Yankauer Aspiratör Ucu ve Geniş Çaplı Aspiratör Hortumu',
        'Farklı Boylarda ETT Aspirasyon Kateterleri (Ch 12, 14, 16)',
        'Kaflı Endotrakeal Tüpler (Kadın ID 7.0-7.5, Erkek ID 7.5-8.0 mm) ve Kaflı Enjektör',
        'Videolaringoskop (Geniş görüş açılı pala)',
        'Geniş Lümenli Nazogastrik / Orogastrik Sonda (Ch 16-18) ve 50 mL Çam Uçlu Enjektör',
        'Salbutamol MDI İnhalatör ve ETT İçi Ara Parça Adaptörü',
        'Magnezyum Sülfat %15 Ampul (Bronkospazm kurtarma için)',
        'Sodyum Sitrat (0.3 M Berrak Antiasit) ve Metoklopramid Ampulleri'
      ]
    },

    // 8) Postoperatif Takip & Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Kanıtlanmış aspirasyon olguları EN AZ 24 - 48 SAAT Yoğun Bakım Ünitesinde (YBÜ) mekanik ventilasyon ve yakın oksijenizasyon takibinde tutulmalıdır.',
      recurrenceRiskBadge: 'GECİKMİŞ ARDS & KİMYASAL PNÖMONİT RİSKİ: İLK 24-48 SAAT',
      recurrenceRate: 'İlk 24-48 saat ARDS ve sekonder bakteriyel pnömoni gelişimi açısından en kritik penceredir; erken dönemde tablosu hafif olan hastaların %30\'u 12-24 saat içinde ağır ARDS\'ye ilerler.',
      maintenanceTherapy: 'Akciğer koruyucu mekanik ventilasyon (Tidal volüm 6 mL/kg PBW, Plato basıncı < 30 cmH2O, PEEP 8-12 cmH2O), başın 30-45° elevasyonu, derin trakeal aspirasyon, bronkodilatör tedavi, sıvı kısıtlaması (akciğer ödemini sınırlamak için normovolemi/hafif negatif denge).',
      monitoringParameters: [
        'Seri Arter Kan Gazı Takibi (PaO2/FiO2 oranı, alveolo-arteryel gradiyent)',
        'Seri Akciğer Grafileri (Yerçekimine bağımlı infiltratların ve atelektazinin izlemi)',
        'Vücut Isısı, Lökosit ve Prokalsitonin / CRP Trendi',
        'Trakeal Sekresyonun Rengi, Miktarı ve Mikrobiyolojik Özellikleri',
        'Dinamik ve Statik Akciğer Kompliyansı Takibi'
      ],
      expectedComplications: [
        'Akut Respiratuar Distres Sendromu (ARDS)',
        'Negatif Basınçlı Pulmoner Ödem (NPPE)',
        'Sekonder Bakteriyel Pnömoni (genelde 48-72 saat sonra)',
        'Akciğer Apsesi ve Ampiyem',
        'Akut Kor Pulmonale ve Kardiyovasküler Kollaps'
      ],
      definitiveDiagnosticTesting: [
        {
          testName: 'Yatak Başı Akciğer Grafisi ve Toraks BT',
          description: 'Aspirasyondan 2-4 saat sonra bilateral yerçekimine bağımlı infiltratların, atelektazilerin ve kimyasal pnömonit yaygınlığının saptanması.'
        },
        {
          testName: 'Fleksibl Fiberoptik Bronkoskopi (FOB)',
          description: 'Katı partikül şüphesinde bronş ağacının incelenmesi ve partiküllerin forseps/basket ile çıkarılması (SF ile lavaj yapılmaz).'
        },
        {
          testName: 'Trakeal Aspirat Kantitatif Kültürü',
          description: 'Aspirasyondan 48-72 saat sonra ateş ve pürülan sekresyon gelişirse hedefe yönelik antibiyotik başlanması için kültür alınması.'
        }
      ],
      prognosisSummary: 'Erken pozisyon verilip agresif orofaringeal aspirasyon yapılan ve partikül aspirasyonu olmayan olgularda tam iyileşme %80-85 civarındadır. Masif asit aspirasyonunda ve ARDS gelişen olgularda ise mortalite %30-50\'ye kadar çıkmaktadır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Mendelson Sendromunun Klasik Tanımı: pH < 2.5 ve Volüm > 0.4 mL/kg',
        takeaway: 'Aspire edilen sıvının pH\'sı 2.5\'in altında ve hacmi 25 mL\'nin (0.4 mL/kg) üzerindeyse kimyasal yakıcı hasar kaçınılmazdır. pH 1.0 olduğunda tek bir damla dahi masif doku nekrozuna yol açar.',
        category: 'Kritik Doz'
      },
      {
        title: 'Ölümcül Tuzak: ETT İçine SF Lavajı Yapmak!',
        takeaway: 'Tüp içine serum fizyolojik verip aspire etmek asidi nötralize etmez. Aksine asidi trakeadan alıp en uç alveollere yıkayarak hasar alanını genişletir ve sürfaktanı süpürür. KESİNLİKLE LAVAJ YAPILMAZ.',
        category: 'Tuzak'
      },
      {
        title: 'Aspirasyon Anında İlk Refleks: Trendelenburg!',
        takeaway: 'Regürjitasyon görüldüğü an solunum balonu sıkmayı DERHAL KESİN ve masayı baş aşağı (Trendelenburg) eğin. Havalandırmaya devam etmek asidi akciğere üflemektir.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Rutin Profilaktik Antibiyotik ve Steroid Verilmez!',
        takeaway: 'Mendelson sendromu bakteriyel değil, kimyasal yanıktır. Erken antibiyotik vermek sadece dirençli hastane bakterilerini üretir. Steroid ise iyileşmeyi bozar ve enfeksiyon riskini katlar. Kanıt düzeyi 1A!',
        category: 'Ezber Bozan'
      },
      {
        title: 'PEEP\'in Hayat Kurtarıcı Rolü',
        takeaway: 'Asit sürfaktanı yıktığı için alveoller anında çöker. 6-10 cmH2O PEEP uygulamak atelektaziyi açar, fonksiyonel rezidüel kapasiteyi (FRC) restore eder ve intrapulmoner şantı kırar.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Gastrik Ultrasonografide "Perlas Sınıflaması"',
        takeaway: 'Antrum hem supin hem sağ lateralde boşsa Grade 0 (düşük risk); sadece sağ lateralde sıvı varsa Grade 1; her iki pozisyonda sıvı/katı varsa Grade 2 (yüksek risk - RSI endikasyonu).',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Partiküllü Antiasit Tuzağı',
        takeaway: 'Magnezyum/alüminyum hidroksit gibi süspansiyon antiasitler aspire edilirse kendileri granülomatöz yabancı cisim reaksiyonu yapar. Preop antiasit verilecekse daima berrak sodyum sitrat (0.3 M) verilmelidir.',
        category: 'Tuzak'
      },
      {
        title: 'Supraglottik Havayolları (LMA) Aspirasyondan Korumaz',
        takeaway: 'İkinci nesil LMA\'lar drenaj kanalı içerse de aspirasyon riskini sıfırlamaz. Aspirasyon riski yüksek tok karınlı hastada tek güvenli yol kaflı endotrakeal tüptür.',
        category: 'Ezber Bozan'
      }
    ],

    // 10) Kullanılan Kaynaklar & İleri Okuma
    references: [
      {
        authors: 'Mendelson CL.',
        title: 'The aspiration of stomach contents into the lungs during obstetric anesthesia.',
        journal: 'American Journal of Obstetrics and Gynecology. 1946;52(2):191-205.',
        year: '1946',
        relevance: 'Pulmoner aspirasyon ve kimyasal pnömonitin tıp literatüründeki temel klasik tanımı.'
      },
      {
        authors: 'American Society of Anesthesiologists (ASA Task Force).',
        title: 'Practice Guidelines for Preoperative Fasting and the Use of Pharmacologic Agents to Reduce the Risk of Pulmonary Aspiration.',
        journal: 'Anesthesiology. 2023;138(2):132-151.',
        year: '2023',
        relevance: '2-4-6-8 açlık kuralları, berrak sıvı tanımı ve farmakolojik aspirasyon profilaksisi.'
      },
      {
        authors: 'Perlas A, Van de Putte P, Van Houwe P, et al.',
        title: 'I-AIM framework for point-of-care gastric ultrasound in the perioperative setting.',
        journal: 'British Journal of Anaesthesia. 2016;116(1):7-11.',
        year: '2016',
        relevance: 'Gastrik USG ile antral alan ölçümü, gastrik volüm hesaplaması ve Perlas sınıflaması.'
      },
      {
        authors: 'Difficult Airway Society (DAS) & Association of Anaesthetists.',
        title: 'Guidelines for the management of tracheal intubation in critically ill adults.',
        journal: 'British Journal of Anaesthesia. 2018;120(2):323-352.',
        year: '2018',
        relevance: 'RSI protokolleri, aspirasyon önleme adımları ve kaflı tüp ile acil izolasyon ilkeleri.'
      }
    ]
  }
};
