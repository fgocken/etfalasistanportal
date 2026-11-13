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
  quickCalculatorType?: 'dantrolene' | 'bronchospasm' | 'laryngospasm' | 'cico' | 'airway-obstruction' | 'aspiration' | 'pe' | 'vae' | 'last' | 'anaphylaxis' | 'acls' | 'generic';

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
    rhythmEcgGallery?: {
      rhythmName: string;
      badge: string;
      shockable: boolean;
      imagePath: string;
      caption: string;
      ecgFeatures: string;
      sourceLicense: string;
    }[];
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

    // Pulmoner Embolizm (PE / PTE) acil protokolleri
    peProtocols?: {
      hemodynamicRvSupport: {
        title: string;
        fluidCaution: string;
        vasopressorsAndInotropes: {
          agent: string;
          dosage: string;
          indication: string;
          mechanismPearl: string;
        }[];
        ventilatorSettings: {
          parameter: string;
          target: string;
          caution: string;
        }[];
      };
      thrombolyticRegimens: {
        title: string;
        regimens: {
          agent: string;
          standardDose: string;
          cardiacArrestDose: string;
          contraindications: string;
        }[];
        surgicalAndCatheterOptions: string[];
      };
      anticoagulationProtocol: {
        title: string;
        ufhProtocol: {
          bolus: string;
          infusion: string;
          targetAptt: string;
          reversal: string;
        };
        lmwhProtocol: {
          agent: string;
          dose: string;
          caution: string;
        };
      };
      riskStratification: {
        title: string;
        categories: {
          riskClass: string;
          clinicalFeatures: string;
          rvDysfunction: string;
          biomarkers: string;
          primaryAction: string;
        }[];
      };
    };

    // Venöz ve Paradoksal Hava Embolisi (VAE / PAE) acil protokolleri
    vaeProtocols?: {
      durantManeuverAndPositioning: {
        title: string;
        technique: string;
        physiologicalMechanism: string;
        surgicalSiteCoordination: string;
      };
      cvcAspirationProtocol: {
        title: string;
        catheterTypeAndDepth: string;
        aspirationTechnique: string;
        successRateAndPearls: string;
      };
      pfoParadoxicalEmbolism: {
        title: string;
        riskMechanism: string;
        peepWarning: string;
        managementKey: string;
      };
      hyperbaricOxygenGuideline: {
        title: string;
        indications: string[];
        timeWindow: string;
        transportAndStabilization: string;
      };
      monitoringSensitivityHierarchy: {
        modality: string;
        threshold: string;
        clinicalUtility: string;
        characteristics: string;
      }[];
    };

    // LAST (Lokal Anestezik Sistemik Toksisitesi) acil protokolleri
    lastProtocols?: {
      lipidRescueProtocol: {
        title: string;
        bolusDose: string;
        infusionDose: string;
        repeatBolusRule: string;
        maxCumulativeDose: string;
        lipidSinkMechanism: string;
      };
      aclsModifications: {
        title: string;
        epinephrineAdjustment: string;
        prohibitedDrugs: string[];
        antiarrhythmicStrategy: string;
        ecmoCriteria: string;
      };
      safeDosageLimits: {
        agent: string;
        plainMaxDose: string;
        epinephrineMaxDose: string;
        durationOfAction: string;
        cardiotoxicityRisk: string;
      }[];
      toxicityProgressionStages: {
        stage: string;
        plasmaLevel: string;
        cnsSymptoms: string;
        cvsSymptoms: string;
        actionRequired: string;
      }[];
    };

    // İntraoperatif Anafilaksi acil protokolleri
    anaphylaxisProtocols?: {
      epinephrineTitrationByGrade: {
        title: string;
        guidelineSource: string;
        grades: {
          grade: string;
          severity: string;
          clinicalPresentation: string;
          epinephrineBolus: string;
          infusionRate: string;
          clinicalAlert: string;
        }[];
        imAlternative: string;
        pediatricDosing: string;
      };
      fluidAndVasopressorResuscitation: {
        title: string;
        crystalloidVolume: string;
        colloidProhibitionWarning: string;
        secondaryVasopressors: {
          agent: string;
          dosage: string;
          indication: string;
          mechanism: string;
        }[];
        refractoryVasoplegia: string;
      };
      ringAndMessmerScale: {
        grade: string;
        cutaneousSigns: string;
        respiratorySigns: string;
        cardiovascularSigns: string;
        immediateAction: string;
      }[];
      tryptaseAndInvestigationProtocol: {
        title: string;
        firstSampleTiming: string;
        secondSampleTiming: string;
        diagnosticFormula: string;
        culpritAgentsBreakdown: {
          category: string;
          prevalence: string;
          commonDrugs: string;
          riskNotes: string;
        }[];
        sugammadexRescueInRocuronium: string;
        allergyClinicReferral: string;
      };
    };

    // Perioperatif Kardiyak Arrest & ACLS acil protokolleri
    aclsProtocols?: {
      cprQualityTargets: {
        metric: string;
        target: string;
        clinicalNote: string;
      }[];
      rhythmAlgorithms: {
        pathway: 'Shockable (VF / Nabızsız VT)' | 'Non-Shockable (Asistoli / PEA)';
        badge: string;
        initialAction: string;
        defibrillationDose: string;
        epinephrineTiming: string;
        antiarrhythmics: string;
        criticalAlerts: string;
      }[];
      perioperativeHAndTs: {
        category: '5H (Fizyolojik)' | '5T (Mekanik / Toksik)' | 'Anesteziye Özgü';
        cause: string;
        intraopClues: string;
        immediateReversal: string;
      }[];
      operatingRoomModifications: {
        title: string;
        anestheticAndVentilation: string;
        proneAndPositioningCpr: string;
        maternalCardiacArrest: string;
        ecprCriteria: string;
      };
      roscPostArrestTargets: {
        parameter: string;
        target: string;
        rationale: string;
      }[];
    };
  };

  // 5) Patofizyolojisi (Doğal ve Hastalığa Özgü Yapı)
  pathophysiology: {
    molecularBasis: string;
    geneticMutations?: string[];
    stepsTitle?: string;
    flowType?: 'cascade' | 'vicious-cycle' | 'biphasic' | 'cellular-systemic' | 'dual-axis';
    cycleWarning?: string;
    cascadeSteps?: {
      phase: string;
      mechanism: string;
      badge?: string;
      color?: 'purple' | 'red' | 'amber' | 'cyan' | 'rose' | 'emerald';
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
    cartTitle?: string;
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
      stepsTitle: 'Moleküler Kalsiyum Boşalması, Hipermetabolizma ve Hücre Yıkımı',
      flowType: 'cascade',
      cascadeSteps: [
        {
          phase: 'Moleküler Kalsiyum Kaçağı & Sürekli Kasılma',
          mechanism: 'Volatil anestezik veya süksinilkolin mutasyonlu RYR1 reseptörüne bağlanarak kanalı açık kilitler. Sarkoplazmik retikulumdan sitozole devasa kalsiyum sızar; Troponin C doyar ve aktin-miyozin kayması durdurulamaz (jeneralize kas rijiditesi).',
          badge: '1. KALSİYUM KAÇAĞI'
        },
        {
          phase: 'Hipermetabolik Tüketim Yangını & ATP İflası',
          mechanism: 'SERCA pompası kalsiyumu geri çekmek için çılgınca ATP harcar. Oksijen sarfiyatı (VO2) ve CO2 üretimi (VCO2) 3-5 katına fırlar (EtCO2 sıçraması). Anaerobik metabolizmayla devasa ısı açığa çıkar (hipertermi).',
          badge: '2. HİPERMETABOLİZMA'
        },
        {
          phase: 'Sarkolemma Çöküşü, Rabdomiyoliz & Hiperkalemi',
          mechanism: 'ATP tamamen tükenince hücre zarı parçalanır; miyosit içeriği seruma boşalır. Akut hiperkalemi ölümcül kardiyak arresti, miyoglobinüri ise akut tübüler nekroz ve böbrek yetmezliğini tetikler.',
          badge: '3. MEMBRAN YIKIMI'
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
      cartTitle: 'Malign Hipertermi Acil Arabası (MH Cart) Asgari Donanım Listesi:',
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
      stepsTitle: 'Kolinerjik Tetikleme, Poiseuille Direnç Fırtınası ve Oto-PEEP Dinamiği',
      flowType: 'cascade',
      cascadeSteps: [
        {
          phase: 'Kolinerjik Vagal Tetikleme & M3 Kalsiyum Patlaması',
          mechanism: 'Yüzeyel anestezi, ETT karinası irritasyonu veya Desfluran maruziyeti afferent vagal lifleri uyarır; asetilkolin M3 reseptörlerine bağlanarak IP3 aracılığıyla sarkoplazmik retikulumdan masif Ca²⁺ deşarj eder.',
          badge: '1. KOLİNERJİK AKTİVASYON'
        },
        {
          phase: 'Poiseuille Direnç Fırtınası (R ∝ 1/r⁴)',
          mechanism: 'Ca²⁺-kalmodulin kompleksi MLCKyi uyararak bronş düz kasını sıkar; bronş lümeni yarıya indiğinde Poiseuille Yasası gereği hava yolu direnci 16 kat (2⁴) fırlar (Ppeak > 45-50 cmH2O ve köpekbalığı sırtı EtCO2).',
          badge: '2. POISEUILLE KATARSI'
        },
        {
          phase: 'Dinamik Hiperinflasyon (Oto-PEEP) & Venöz Preload Çöküşü',
          mechanism: 'Ekspiratuar akım kısıtlandığı için hava dışarı çıkamaz; akciğerlerde aşırı hava hapsolur. Fırlayan intratorasik basınç vena cava inferioru ezer, sağ ventrikül venöz dönüşü (preload) çöker ve hipotansiyon/asistoli gelişir.',
          badge: '3. PRELOAD ÇÖKÜŞÜ'
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
      cartTitle: 'Acil Bronkospazm & Havayolu Kiti Asgari Donanım Listesi:',
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
      stepsTitle: 'Glottik Kapanma Refleksi ve Negatif Basınçlı Pulmoner Ödem (NPPE)',
      flowType: 'cascade',
      cascadeSteps: [
        {
          phase: 'Vagal Refleks Arkı & Tetanik Glottik Kapanma',
          mechanism: 'Sekresyon, kan veya irritan gazla Superior Laringeal Sinir (SLN) duyusal lifleri uyarılır; rekürren laringeal sinir üzerinden lateral krikoaritenoid ve transvers aritenoid kaslar kasılarak gerçek ve yalancı vokal kordları birbirine hava geçirmez yapıştırır.',
          badge: '1. REFLEKS KAPANMA'
        },
        {
          phase: 'Kapalı Glottise Karşı İnspirasyon (Mueller Manevrası)',
          mechanism: 'Spontan soluyan hasta kapalı larenkse karşı şiddetle nefes almaya çalışır; intratorasik basınç -50 ila -100 cmH2O gibi devasa negatif seviyelere düşer (paradoksal tahterevalli solunumu).',
          badge: '2. NEGATİF İNTRATORASİK BASINÇ'
        },
        {
          phase: 'Negatif Basınçlı Pulmoner Ödem (NPPE) & Hipoksi',
          mechanism: 'Aşırı hidrostatik gradyent pulmoner kapillerlerden alveol içine masif transüdaya yol açar (NPPE / pembe köpüklü sıvı). Hipoksi ve vagal uyarım çocuklarda hızla derin bradikardi ve arreste ilerler.',
          badge: '3. NPPE & KARDİYAK ÇÖKÜŞ'
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
      cartTitle: 'Acil Laringospazm & Havayolu Kiti Asgari Donanım Listesi:',
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
      stepsTitle: 'FRC Rezervi Tükenmesi, Hipoksik Bradikardi ve Anoksik Hasar Eşiği',
      flowType: 'cascade',
      cascadeSteps: [
        {
          phase: 'FRC Deposu Tükenmesi & Dik Desatürasyon Yamacı',
          mechanism: 'Ventilasyon sıfırlandığı anda FRC oksijen deposu hızla biter (obez veya gebede < 60 sn). Oksihemoglobin eğrisinin dik yamacına girilir; PaO2 < 30 mmHg seviyesine inerken SpO2 şelale gibi %90dan saniyeler içinde %40a çakılır.',
          badge: '1. FRC TÜKENMESİ'
        },
        {
          phase: 'Miyokardiyal İskemi & Hipoksik Vagal Bradikardi',
          mechanism: 'Miyokard perfüzyonu anoksik kanla sürdürülemez; SA/AV düğüm otomasitesi çöker. Kompansatuar taşikardi aniden derin hipoksik bradikardiye (< 40/dk) ve Nabızsız Elektriksel Aktiviteye (PEA) dönüşür.',
          badge: '2. MİYOKARDİYAL ÇÖKÜŞ'
        },
        {
          phase: 'Geri Dönüşümsüz Nöronal Anoksi & Beyin Ölümü Eşiği',
          mechanism: 'Hücresel Na+/K+ ATPaz pompaları susar, sitotoksik ödem patlar. 3-4 dakikalık anoksi geri dönüşümsüz hipoksik iskemik ensefalopatiye, 5-7 dakika ise kortikal beyin ölümüne yol açar (eFONA zaman penceresi).',
          badge: '3. ANOKSİK HASAR EŞİĞİ'
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
      cartTitle: 'Acil Krikotiroidotomi & CICO Kiti Asgari Donanım Listesi:',
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
      cartTitle: 'Acil Krikotiroidotomi & CICO Kiti Asgari Donanım Listesi:',
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
      stepsTitle: 'Mekanik Bası, Bernoulli Dinamik Kollapsı ve Asfiksi Dinamiği',
      flowType: 'cascade',
      cascadeSteps: [
        {
          phase: 'Mekanik Darlık, Türbülans & Bernoulli Dinamik Kollapsı',
          mechanism: 'Hematom basısı, yabancı cisim veya ETT bükülmesi lümeni daraltır; hava akımı türbülana geçer (R ∝ 1/r⁴). Bernoulli prensibi gereği dar alanda hava hızı artarken lateral transmural basınç düşer; farengeal yumuşak dokular içeri emilerek dinamik tıkanmayı kilitler.',
          badge: '1. BERNOULLI KOLLAPSI'
        },
        {
          phase: 'Ekstrem Negatif İnstratorasik Basınç & Pulmoner Kaçak (NPPE)',
          mechanism: 'Hasta tıkalı hava yoluna karşı çaresizce nefes almaya çabalar (Mueller manevrası); göğüs içinde -80 cmH2O negatif basınç oluşur. Devasa transkapiller hidrostatik gradyent alveolleri suyla doldurur (Negatif Basınçlı Pulmoner Ödem).',
          badge: '2. İNTRATORASİK ÇEKİLME'
        },
        {
          phase: 'Akut Alveoler Asfiksi, Hipoksik Bradikardi & Arrest',
          mechanism: 'FRC rezervi saniyeler içinde tükenir; PaO2 < 30 mmHg altına iner. Miyokardiyal anoksi ve vagal uyarım kompansatuar taşikardiyi hızla derin bradikardiye ve asistolik kardiyak arreste sürükler.',
          badge: '3. ASFİKSİ & ARREST'
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
      cartTitle: 'Acil Hava Yolu Obstrüksiyonu & Boyun Hematomu Kiti Donanım Listesi:',
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
      stepsTitle: 'Bifazik Akciğer Hasarı: Kimyasal Asit Yanığı ve Enflamatuar ARDS',
      flowType: 'biphasic',
      cascadeSteps: [
        {
          phase: 'Akut Kimyasal Asit Yanığı & Sürfaktan Denatürasyonu (İlk 1-2 Saat)',
          mechanism: 'pH < 2.5 gastrik hidroklorik asit ve pepsin Tip I/II pnömositleri koterize eder. Sürfaktanın fosfolipid yapısı parçalanır; alveol yüzey gerilimi fırlar, yaygın mikroatelektaziler ve sağdan sola intrapulmoner şant oluşur.',
          badge: '1. KİMYASAL YANIK'
        },
        {
          phase: 'Nötrofilik Enflamatuar Fırtına & Eksüdatif ARDS (4-24. Saat)',
          mechanism: 'Asit hasarı masif sitokin (TNF-alfa, IL-8) ve serbest oksijen radikali salınımını tetikler. Pulmoner kapiller membran parçalanır; alveoller proteinöz eksüdayla dolarak kimyasal akciğer ödemi ve tam ARDS tablosuna ilerler.',
          badge: '2. ENFLAMATUAR ARDS'
        },
        {
          phase: 'Mekanik Havayolu Tıkacı & Bakteriyel Zemin (Partiküllü İse)',
          mechanism: 'Katı gıda partikülleri lober ve segmenter bronşları mekanik olarak tıkar; absorpsiyon atelektazisi derinleşir ve anaerobik orofarengeal flora ile sekonder süperenfeksiyon (aspirasyon pnömonisi) riski doğar.',
          badge: '3. PARTİKÜLER OBSTRÜKSİYON'
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
      cartTitle: 'Pulmoner Aspirasyon & RSI Acil Donanım Listesi:',
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
  },
  'pe': {
    id: 'pe',
    // 1) Başlık
    title: 'Akut Pulmoner Embolizm (PE / PTE) Kriz Protokolü',
    subTitle: 'Masif / Submasif Perioperatif Emboli, Akut Sağ Ventrikül Dekompansasyonu & Tromboliz Kılavuzu',
    codeColor: 'red',
    severityBadge: 'KOD KIRMIZI · AKUT SAĞ KALP ÇÖKÜŞÜ · ZAMANA DUYARLI HAYATİ ACİL',
    keyCallout: 'Ani EtCO2 çöküşü + açıklanamayan hipotansiyon/taşikardi = Aksi kanıtlanana dek Masif PE! Aşırı sıvı yükünden KESİNLİKLE kaçının (RV septal shift & kardiyak debi çöküşü). Hemen Noradrenalin başlayın, arrest/şokta acil Alteplase 50-100 mg veya Tenecteplase uygulayın!',
    quickCalculatorType: 'pe',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Pulmoner Embolizm (PE / PTE); pulmoner arteriyel yatağın derin ven trombozundan (DVT) kopan trombüsler (veya perioperatif hava, yağ, sement, amniyon sıvısı) ile akut mekanik olarak tıkanması sonucu gelişen; pulmoner vasküler direnci (PVR) ani fırlatarak akut sağ ventrikül (RV) yetmezliğine, ventriküler septal kaymaya (septal shift), sol ventrikül doluşunun çökmesine ve kardiyojenik/obstrüktif şoka yol açan en öldürücü perioperatif acillerden biridir.',
      epidemiology: 'Hastanede yatan ve cerrahi geçiren hastalarda önlenebilir ölüm nedenlerinin başında gelir. Perioperatif dönemde insidans cerrahi tipine göre %0.3 ile %3 arasında değişir (ortopedi, kalça/diz protezi, femur boyun kırıkları, pelvik ve majör onkolojik rezeksiyonlarda risk katlanarak artar). Masif PE\'de 30 günlük mortalite tedavi edilmediğinde %30-50\'yi aşarken, erken tanı ve agresif resüsitasyonla <%10-15 seviyesine çekilebilir.',
      triggers: [
        'Büyük Ortopedik Cerrahiler: Total kalça ve diz artroplastisi, femur boyun kırığı fiksasyonu, majör politravma',
        'Majör Pelvik ve Abdominal Onkolojik Cerrahiler, uzun süreli litotomi pozisyonu ve derin venöz staz',
        'Uzamış turnike süresi ve turnikenin indirilmesi anı (turnike reperfüzyon mikroembolileri ve asidoz yükü)',
        'Laparoskopik cerrahide yüksek intraabdominal basınç (>14-15 mmHg) ve dik Trendelenburg pozisyonunda venöz göllenme',
        'Santral venöz kateterizasyon ve kemoterapi portları (kateter ilişkili venöz tromboz)',
        'Genetik / Edinsel Trombofililer: Faktör V Leiden mutasyonu, Protrombin G20210A, Antifosfolipid Antikor Sendromu (APS), Protein C/S ve Antitrombin III eksikliği',
        'Non-Trombotik Emboliler: İntraoperatif venöz hava embolisi (oturur kraniyotomi), ortopedik cerrahide sement/yağ embolisi (FES), amniyotik sıvı embolisi (AFE)'
      ],
      safeAgents: [
        'Vazopressörler: Noradrenalin (1. tercih - MAP ≥ 65-70 mmHg tutarak sağ koroner perfüzyonunu kurtarır), Vazopressin (0.01-0.04 IU/dk - PVR artırmadan SVR artırır, pulmoner NO salınımını uyarır)',
        'İnotroplar (Normotansif RV Yetmezliğinde): Dobutamin (2-20 mcg/kg/dk - Noradrenalin ile kombine), Milrinon (0.375-0.75 mcg/kg/dk - PDE3 inhibitörü, RV inotropi + pulmoner vazodilatasyon)',
        'Pulmoner Selektif Vazodilatatörler: İnhale Nitrik Oksit (iNO 10-20 ppm) veya İnhale İloprost (Ventavis 2.5-5 mcg nebül) - sistemik hipotansiyon yapmaksızın pulmoner arter basıncını düşürür',
        'Antikoagülasyon: Anfraksiyone Heparin (UFH - 80 IU/kg bolus, 18 IU/kg/saat infüzyon, acil ameliyat veya tromboliz/cerrahi planlananlarda tam geri döndürülebilir ilk seçenek)',
        'Trombolitik Ajanlar: Alteplase (rt-PA), Tenecteplase (TNK-tPA)',
        'Mekanik Dolaşım Desteği: VA-ECMO (Veno-Arteriyel ECMO) veya Perkütan RV Destek Cihazı (Impella RP)'
      ],
      mortalityStats: 'Akut masif pulmoner embolide kardiyojenik şok ve arrest gelişen olgularda ilk 1-2 saatteki mortalite %50-70\'e ulaşır. Perioperatif PE vakalarının önemli kısmında tanı otopside konulur. Erken tanı, aşırı sıvıdan kaçınma, hedefe yönelik vazopressör ve zamanında tromboliz/embolektomi ile mortalite %15\'in altına indirilebilir.',
      clinicalUrgency: 'Ameliyathanede veya derlenme odasında ani EtCO2 düşüşü ve açıklanamayan hipotansiyon fark edildiğinde saniyeler içinde anestezi ekibi, cerrahi ekip, kardiyoloji/KVC ve acil ECMO ekipleri mobilize edilmelidir.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'İntraoperatif genel anestezi altındaki PE tanısı uyanık hastadaki gibi göğüs ağrısı ve dispne ile değil; monitördeki ani fizyolojik çöküş ile kendini gösterir: Ani EtCO2 çöküşü (alveoler ölü boşluk ventilasyonu), refrakter hipotansiyon, inatçı sinüs taşikardisi, CVP artışı ve akut sağ kalp dilatasyonu (McConnell bulgusu, D-şeklinde LV). Uyanık serviste/YBÜ\'de ise ani nefes darlığı, plöritik göğüs ağrısı, hemoptizi, taşikardi ve senkop ön plandadır.',
      clinicalCriteria: [
        'Ani ve Belirgin End-Tidal CO2 (EtCO2) Düşüşü: Dakika ventilasyonu sabitken EtCO2\'nin aniden <15-20 mmHg seviyelerine veya sıfıra yaklaşması (alveoler ölü boşluk fraksiyonunun fırlaması) - İNTRAOPERATİF EN DUYARLI İPUCU!',
        'Açıklanamayan Ani Ağır Hipotansiyon ve Kardiyojenik/Obstrüktif Şok (Sistolik KB < 90 mmHg veya bazale göre >40 mmHg ani düşüş; yüksek vazopressör ihtiyacı)',
        'Refrakter Hipoksemi (FiO2 1.0\'a rağmen düzelmeyen PaO2/FiO2 < 150-200; intrapulmoner şant ve V/Q uyumsuzluğu)',
        'Sağ Ventrikül Aşırı Yüklenmesi (RV Strain) & CVP / JVP Artışı: Santral venöz basıncın aniden tırmanması (>16-20 mmHg), karotis/juguler venöz dolgunluk',
        'EKG Bulguları (Klasik S1Q3T3 Deseni): D1 derivasyonunda derin S dalgası, D3\'te patolojik Q dalgası ve T negatifliği; V1-V4 derivasyonlarında simetrik T dalgası inversiyonu, akut sağ dal bloğu (RBBB) ve inatçı sinüs taşikardisi',
        'Transözofageal / Transtorasik Ekokardiyografi (TEE/TTE): Akut RV dilatasyonu (RV/LV çap oranı > 1.0), McConnell bulgusu (RV serbest duvar hipokinezisi/akinezisi ile birlikte korunmuş apeks kasılması), 60/60 bulgusu, interventriküler septumun sola itilmesi (D-shaped sol ventrikül) ve triküspit yetmezlik pik gradiyentinde artış'
      ],
      gradingScaleTitle: 'Wells & Basitleştirilmiş PESI (sPESI) Klinik Risk Skalası',
      gradingScaleSource: 'ESC 2019 / Konstantinides et al. Eur Heart J',
      larachScale: [
        { category: 'Wells Kriteri 1', points: '+3.0 Puan', description: 'Derin Ven Trombozu (DVT) klinik belirti veya bulguları (bacakta asimetrik ödem, baldır hassasiyeti).' },
        { category: 'Wells Kriteri 2', points: '+3.0 Puan', description: 'Alternatif tanının PE\'den daha az olası olması (klinik tablonun en iyi PE ile açıklanması).' },
        { category: 'Wells Kriteri 3', points: '+1.5 Puan', description: 'Taşikardi (Kalp hızı > 100 atım/dk; istirahat veya anestezi altında inatçı sinüs taşikardisi).' },
        { category: 'Wells Kriteri 4', points: '+1.5 Puan', description: 'İmmobilizasyon (≥3 gün yatak istirahati) veya son 4 hafta içinde geçirilmiş majör cerrahi.' },
        { category: 'Wells Kriteri 5', points: '+1.5 Puan', description: 'Daha önce doğrulanmış DVT veya Pulmoner Embolizm (PE) öyküsü bulunması.' },
        { category: 'Wells Kriteri 6', points: '+1.0 Puan', description: 'Hemoptizi (pulmoner infarktise sekonder balgamda taze kan görülmesi).' },
        { category: 'Wells Kriteri 7', points: '+1.0 Puan', description: 'Aktif Malignite (son 6 ay içinde tedavi gören veya palyatif evrede olan kanser hastası).' },
        { category: 'sPESI Skoru (30 Günlük Mortalite)', points: '0 vs ≥1 Puan', description: 'Yaş>80 (1), Kanser (1), KKY/KOAH (1), Nabız≥110 (1), SKB<100 (1), SpO2<%90 (1). 0 Puan: Düşük Risk (%1.1 mortalite); ≥1 Puan: Yüksek Risk (%10.9 mortalite).' }
      ],
      larachInterpretation: 'Wells Skoru: >6 Puan = Yüksek Klinik Olasılık (%65 PE); 2-6 Puan = Orta Olasılık (%30 PE); <2 Puan = Düşük Olasılık (%10 PE). Hemodinamik instabilite varlığında (Sistolik KB <90 mmHg veya arrest) Wells skoruna bakılmaksızın doğrudan "Yüksek Riskli / Masif PE" acil algoritması uygulanır.',
      differentialDiagnosis: [
        { condition: 'İntraoperatif Venöz Hava Embolisi', differentiatingFactors: 'Özellikle oturur pozisyonda kraniyotomi, posterior fossa cerrahisi veya santral kateter manipülasyonunda gelişir. TEE\'de sağ kalpte "kar fırtınası" ekojenitesi, precordial Doppler\'de değirmen sesi (mill-wheel murmur). Tedavi: Cerrahi alanın ıslatılması, sol lateral Trendelenburg (Durant manevrası), CVC\'den hava aspirasyonu.' },
        { condition: 'Amniyotik Sıvı Embolisi (AFE)', differentiatingFactors: 'Doğum eylemi, sezaryen veya plasenta ayrılması esnasında ani kollaps, kardiyak arrest, şiddetli bronkospazm ve DİK (Yaygın İntravasküler Koagülasyon - kontrolsüz kanama). A-OK rejimi (Atropin, Ondansetron, Ketorolak) ve acil masif transfüzyon gerektirir.' },
        { condition: 'Yağ Embolisi Sendromu (FES)', differentiatingFactors: 'Uzun kemik (femur, tibia) kırıkları veya protez sementlemesinden 24-72 saat sonra triadı: Akut hipoksemi, konfüzyon/nörolojik bozulma ve aksiller/konjonktival peteşiler.' },
        { condition: 'Akut Masif Miyokard İnfarktüsü (RV İnfarktüsü)', differentiatingFactors: 'Sağ koroner arter (RCA) oklüzyonunda EKG\'de D2, D3, aVF ve sağ prekordiyal V3R-V4R derivasyonlarında ST elevasyonu görülür; ekokardiyografide sol ventrikül inferior duvarı da akinetiktir.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Yüksek tepe hava yolu basıncı, tek taraflı solunum sesi yokluğu, trakeal deviasyon, hipoksi ve hipotansiyon. Göğüs tüpü / iğne dekompresyonu ile saniyeler içinde düzelir.' },
        { condition: 'Kardiyak Tamponad', differentiatingFactors: 'Beck triadı (hipotansiyon, juguler venöz dolgunluk, derinden gelen kalp sesleri), EKG\'de elektriksel alternans, ekokardiyografide perikardiyal efüzyon ve sağ atriyum/ventrikül diyastolik kollapsı.' }
      ]
    },

    // 4) Acile Spesifik Akut Yönetimi - Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'Masif PE / Perioperatif Kardiyak Arrest Ekibi (Mavi Kod) · KVC Acil Embolektomi / ECMO Hattı · Girişimsel Radyoloji Kateter Trombektomi',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'HAYKIR & YARDIM ÇAĞIR / CERRAHİ EKİBİ ANINDA BİLGİLENDİR',
          action: 'FiO2 1.0\'e çıkarın (%100 O2). Cerrahi manipülasyonu, laparoskopik gaz insüflasyonunu veya turnike indirme sürecini derhal durdurun. Anestezi derinliğini hafifletin (volatil anestezikleri kısın/kapatın). KVC ve Mavi Kod ekiplerini haberdar edin.',
          criticalNote: 'İntraoperatif ani EtCO2 düşüşü ve taşikardi/hipotansiyonda aksi kanıtlanana dek Masif Pulmoner Emboli düşünülmelidir!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'AŞIRI SIVI İNFÜZYONUNDAN KESİNLİKLE KAÇININ!',
          action: 'Hipotansiyonu düzeltmek amacıyla kontrolsüz bolus sıvı VERMEYİN! Yalnızca 250-500 mL dengeli kristaloid (Isolyte-S veya Ringer Laktat) 15-20 dakikada dikkatle verilmelidir. CVP yüksekse (>12-14 mmHg) sıvı tamamen kesilmelidir.',
          criticalNote: 'Aşırı sıvı RV diyastol sonu basıncını artırır, interventriküler septumu sol ventriküle doğru iter (septal shift), sol ventrikül doluşunu bozar ve kardiyojenik şoku derinleştirir!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'ERKEN VAZOPRESSÖR BAŞLA: NORADRENALİN İNFÜZYONU',
          action: 'İlk tercih ajan Noradrenalin\'dir (0.05 - 1.0 mcg/kg/dk). Hedef Ortalama Arter Basıncı (MAP) ≥ 65-70 mmHg olmalıdır. Sistemik vazokonstriksiyon ile aort kökü diyastolik basıncını yükselterek aşırı gerilmiş ve iskemiye giren sağ ventrikülün koroner perfüzyonunu korur.',
          criticalNote: 'Refrakter vazoplejide ikinci ajan olarak Vazopressin (0.01 - 0.04 IU/dk) ekleyin. Vazopressin pulmoner vasküler direnci artırmaksızın sistemik basıncı artırır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'İNVAZİV ARTERİYEL & TEE MONİTÖRİZASYONU',
          action: 'Hemen radial veya femoral arter kanülasyonu yapın. Mümkün olan en kısa sürede Transözofageal Ekokardiyografi (TEE) probunu yerleştirin: RV dilatasyonu (RV/LV > 1.0), McConnell bulgusu, pulmoner arterde trombüs ve D-şeklinde LV değerlendirin.',
          criticalNote: 'TEE, intraoperatif şokun ayırıcı tanısında (PE vs MI vs Tamponad vs Hipovolemi) dakikalar içinde kesin yön çizer.',
          priority: 'HIGH'
        },
        {
          stepNumber: 5,
          title: 'VENTİLATÖR AYARLARINI OPTİMİZE ET (AŞIRI PEEP YASAĞI)',
          action: 'Düşük tidal volüm (6 mL/kg ideal kilo), plato basıncı < 28-30 cmH2O, ılımlı PEEP (5-8 cmH2O). Aşırı yüksek PEEP ve alveolar aşırı gerilme pulmoner kılcal damarları sıkarak RV ard yükünü (PVR) katlar ve venöz dönüşü felç eder.',
          criticalNote: 'Normokapniyi hedefleyin (PaCO2 35-40 mmHg); hiperkapni ve asidoz pulmoner vazokonstriksiyonu şiddetlendirir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'ACİL TROMBOLİTİK TEDAVİ (MASİF PE & ŞOK PROTOKOLÜ)',
          action: 'Persistan şok (SKB < 90 mmHg veya MAP < 65 mmHg) veya kardiyak arrest durumunda derhal sistemik tromboliz uygulayın: Alteplase (rt-PA) 100 mg IV 2 saatlik infüzyon VEYA arrest/peri-arrest durumunda acil 50 mg IV 15 dakikalık bolus (gerekirse 30 dk sonra 2. 50 mg). Alternatif: Kilo ayarlı Tenecteplase tek bolus.',
          criticalNote: 'Perioperatif cerrahi kanama riski çok yüksekse alternatif: Acil Cerrahi Pulmoner Embolektomi veya Girişimsel Kateter Trombektomi / VA-ECMO.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 7,
          title: 'ANTİKOAGÜLASYON: ANFRAKSİYONE HEPARİN (UFH)',
          action: 'Klinik şüphe anında ve trombolizle eşzamanlı/hemen sonrasında IV UFH 80 IU/kg bolus ardından 18 IU/kg/saat infüzyon başlatın. Hedef aPTT: normalin 1.5 - 2.5 katı (60-80 saniye).',
          criticalNote: 'Cerrahi kanama veya acil operasyon riski olan olgularda yarı ömrü kısa olduğu ve Protamin Sülfat ile hızla nötralize edilebildiği için UFH altın standarttır.',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'REFRAKTER OLGULARDA MEKANİK DESTEK: VA-ECMO & CERRAHİ EMBOLEKTOMİ',
          action: 'Maksimal medikal ve trombolitik tedaviye rağmen kardiyojenik şok tablosu derinleşiyorsa veya trombolizin mutlak kontrendike olduğu perioperatif hastalarda KVC ekibince Veno-Arteriyel ECMO (VA-ECMO) veya açık cerrahi pulmoner embolektomiye geçilmelidir.',
          criticalNote: 'VA-ECMO, hem oksijenasyonu sağlar hem de sağ ventrikülü dekomprese ederek cerrahi embolektomiye veya litik etkiye köprü oluşturur.',
          priority: 'HIGH'
        },
        {
          stepNumber: 9,
          title: 'KARDİYAK ARREST YÖNETİMİ: UZAMIŞ KPR (EN AZ 60-90 DAKİKA)',
          action: 'Masif PE arrestinde (PEA veya Asistoli) trombolitik bolus (Alteplase 50 mg IV) verildikten sonra KPR en az 60-90 dakika kesintisiz sürdürülmelidir. Mekanik göğüs kompresyon cihazı (LUCAS vb.) ve acil E-CPR (ECMO eşliğinde KPR) düşünülmelidir.',
          criticalNote: 'Trombolitik ilacın akciğer damar yatağındaki masif pıhtıyı mekanik kompresyon sirkülasyonu ile eritmesi zaman alır; KPR erkenden sonlandırılmamalıdır!',
          priority: 'CRITICAL'
        }
      ],

      // Pulmoner Embolizm (PE / PTE) acil protokolleri
      peProtocols: {
        hemodynamicRvSupport: {
          title: 'Akut Sağ Ventrikül Yetmezliği & Hemodinamik Resüsitasyon Stratejisi',
          fluidCaution: 'AŞIRI SIVI YASAKTIR! RV serbest duvarı incedir; aşırı volüm verildiğinde RV genişler ve perikardiyal kısıtlılık nedeniyle interventriküler septumu sola iter (septal bowing / D-shape LV). Bu durum LV doluşunu bloke eder ve kardiyak debiyi sıfırlar. Yalnızca 250-500 mL kristaloid yükleme denemesi yapılabilir.',
          vasopressorsAndInotropes: [
            {
              agent: 'Noradrenalin (Norepinefrin)',
              dosage: '0.05 - 1.0 mcg/kg/dk IV infüzyon (Hedef MAP ≥ 65-70 mmHg)',
              indication: 'Tüm hipotansif ve şoktaki PE hastalarında 1. TERCİH vazopressör',
              mechanismPearl: 'Sistemik vasküler direnci artırır, aort diyastolik basıncını yükselterek sağ ventrikülün koroner perfüzyonunu korur ve iskemi spiralini kırar.'
            },
            {
              agent: 'Vazopressin (AVP)',
              dosage: '0.01 - 0.04 IU/dk sabit doz IV infüzyon',
              indication: 'Noradrenalin doz ihtiyacı yükseldiğinde ikili kombinasyon',
              mechanismPearl: 'Pulmoner vasküler direnci (PVR) artırmaksızın sistemik vasküler direnci artırır; V1 aracılı pulmoner endotelyal NO salınımını uyararak PVR/SVR oranını düşürür.'
            },
            {
              agent: 'Dobutamin',
              dosage: '2 - 20 mcg/kg/dk IV infüzyon (Tek başına verilmez!)',
              indication: 'Normotansif veya Noradrenalin ile MAP ≥ 65 sağlanmış RV kontraktilite yetersizliğinde',
              mechanismPearl: 'Beta-1 inotropik etki ile RV ejeksiyonunu artırır. Vazodilatatör etkisiyle hipotansiyonu derinleştirebileceğinden daima Noradrenalin ile kombine edilmelidir.'
            },
            {
              agent: 'Milrinon',
              dosage: '0.375 - 0.75 mcg/kg/dk IV infüzyon (Bolus dozu yapmayın)',
              indication: 'Refrakter RV yetmezliği ve yüksek pulmoner arter basıncı',
              mechanismPearl: 'Fosfodiesteraz-3 inhibitörü: Hem RV kontraktilitesini artırır hem de pulmoner arteriyel vazodilatasyon sağlar (inodilatatör).'
            },
            {
              agent: 'İnhale Nitrik Oksit (iNO) / İnhale İloprost',
              dosage: 'iNO: 10 - 20 ppm ventilatör devresinden / İloprost (Ventavis): 2.5 - 5 mcg nebül',
              indication: 'Refrakter hipoksemi ve şiddetli pulmoner hipertansiyon',
              mechanismPearl: 'Sadece ventile olan alveollere ulaşarak selektif pulmoner vazodilatasyon yapar; sistemik hipotansiyon oluşturmaz ve V/Q uyumunu düzeltir.'
            }
          ],
          ventilatorSettings: [
            { parameter: 'Tidal Volüm (Vt)', target: '6 mL/kg (İdeal Vücut Ağırlığı)', caution: 'Aşırı tidal volüm pulmoner kapillerleri gererek RV ard yükünü (PVR) artırır.' },
            { parameter: 'PEEP', target: '5 - 8 cmH2O (Ilımlı)', caution: 'Yüksek PEEP (>10-12) intratorasik basıncı artırarak venöz dönüşü azaltır ve RV iskemi spiralini tetikler.' },
            { parameter: 'Plato Basıncı (Pplat)', target: '< 28 - 30 cmH2O', caution: 'Akciğer parankiminde aşırı gerilmeyi ve barotravmayı önleyin.' },
            { parameter: 'FiO2 / Hedef SpO2', target: 'FiO2 1.0 ile başlayıp SpO2 %92-96\'ya titre et', caution: 'Alveoler hipoksi en güçlü pulmoner vazokonstriktördür (Euler-Liljestrand); hipoksiye asla izin vermeyin.' }
          ]
        },
        thrombolyticRegimens: {
          title: 'Trombolitik Tedavi Protokolü & Rejimleri (Masif PE & Peri-Arrest)',
          regimens: [
            {
              agent: 'Alteplase (rt-PA) Standart İnfüzyon',
              standardDose: '100 mg IV infüzyon 2 saatte (veya kilo <65 kg ise 0.6 mg/kg, maks 50 mg 15 dakikada)',
              cardiacArrestDose: '50 mg IV 15 dakikada bolus infüzyon; 30 dakika sonra ROSC sağlanamazsa 2. 50 mg bolus verilebilir',
              contraindications: 'Aktif iç kanama, son 3 ayda hemorajik inme / kafa travması, son 3 haftada majör cerrahi (göreceli - arrest durumunda hayat kurtarıcı olarak uygulanır).'
            },
            {
              agent: 'Tenecteplase (TNK-tPA) Kilo Ayarlı Tek Bolus',
              standardDose: 'Kilo ayarlı tek IV bolus (5-10 saniyede): <60 kg: 30 mg; 60-69 kg: 35 mg; 70-79 kg: 40 mg; 80-89 kg: 45 mg; ≥90 kg: 50 mg',
              cardiacArrestDose: 'Kilo ayarlı tam bolus hemen IV puşe uygulanır (KPR sırasında uygulama kolaylığı sağlar)',
              contraindications: 'Fibrin spesifitesi yüksektir, uygulama hızı en avantajlı ajandır; kontrendikasyonları Alteplase ile aynıdır.'
            }
          ],
          surgicalAndCatheterOptions: [
            'Perkütan Kateter Aracılı Trombektomi & Ultrason Destekli Tromboliz (EKOS): Sistemik trombolizin kontrendike olduğu yüksek kanama riskli perioperatif hastalarda düşük doz tPA (8-12 mg) ile pıhtıyı lokal eritme ve mekanik parçalama.',
            'Cerrahi Pulmoner Embolektomi (Trendelenburg Operasyonu): Trombolizin başarısız olduğu, mutlak kontrendike olduğu veya sağ atriyumda/ana pulmoner arter bifurkasyonunda hareketli pıhtı (thrombus-in-transit) bulunan masif PE olgularında acil KVC müdahalesi.',
            'Veno-Arteriyel ECMO (VA-ECMO): Cerrahi embolektomiye köprü olarak veya refrakter arrestte (E-CPR) dakikalar içinde perfüzyon ve oksijenasyonu devralmak üzere femoral kanülasyon ile kurulur.'
          ]
        },
        anticoagulationProtocol: {
          title: 'Antikoagülasyon Yönetimi (UFH vs LMWH)',
          ufhProtocol: {
            bolus: '80 IU/kg IV bolus (maks 10.000 IU) - Şüphe anında derhal verilir',
            infusion: '18 IU/kg/saat IV sürekli infüzyon (maks 2.000 IU/saat)',
            targetAptt: 'Hedef aPTT: Kontrolün 1.5 - 2.5 katı (yaklaşık 60 - 80 saniye; her 4-6 saatte bir aPTT kontrolü ile titre edilir)',
            reversal: 'Protamin Sülfat: 1 mg Protamin, son 2 saatte verilen 100 IU heparini nötralize eder (maks tek doz 50 mg yavaş IV)'
          },
          lmwhProtocol: {
            agent: 'Enoksaparin (DMAH / LMWH)',
            dose: '1 mg/kg SC günde 2 kez (12 saatte bir) veya 1.5 mg/kg SC günde 1 kez (hemodinamik olarak stabil orta/düşük risk olgularda)',
            caution: 'Şoktaki, masif PE\'li veya cerrahi kanama riski olan hastalarda UFH tercih edilmelidir (LMWH yarı ömrü uzundur ve tam geri çevrilemez).'
          }
        },
        riskStratification: {
          title: 'ESC 2019 Pulmoner Embolizm Risk Tabakalaması',
          categories: [
            {
              riskClass: 'Yüksek Risk (Masif PE)',
              clinicalFeatures: 'Hemodinamik instabilite: Kardiyak arrest, obstrüktif şok veya persistan hipotansiyon (SKB <90 mmHg veya >40 mmHg düşüş, >15 dk süren)',
              rvDysfunction: 'Pozitif (TTE/TEE\'de RV dilatasyonu, McConnell bulgusu, D-şeklinde LV)',
              biomarkers: 'Genellikle pozitif (Troponin T/I ve NT-proBNP yüksekliği)',
              primaryAction: 'ACİL TROMBOLİTİK TEDAVİ veya Cerrahi Embolektomi / VA-ECMO + UFH'
            },
            {
              riskClass: 'Orta-Yüksek Risk (Submasif PE)',
              clinicalFeatures: 'Hemodinamik olarak stabil (SKB ≥ 90 mmHg), ancak klinik stres ve taşikardi',
              rvDysfunction: 'Pozitif (Ekokardiyografide veya BTPA\'da belirgin RV büyümesi / strain)',
              biomarkers: 'Pozitif (Serum kardiyak troponin T/I ve/veya BNP/NT-proBNP yüksekliği)',
              primaryAction: 'Hastaneye yatış, UFH veya LMWH ile yoğun monitörizasyon, kötüleşirse kurtarma trombolizi'
            },
            {
              riskClass: 'Orta-Düşük Risk',
              clinicalFeatures: 'Hemodinamik olarak stabil (SKB ≥ 90 mmHg)',
              rvDysfunction: 'Pozitif VEYA Biyomarker Pozitif (ikisi birden pozitif DEĞİL)',
              biomarkers: 'Yalnızca biri pozitif',
              primaryAction: 'Servis / YBÜ yatışı, LMWH veya direkt oral antikoagülan (DOAC)'
            },
            {
              riskClass: 'Düşük Risk',
              clinicalFeatures: 'Hemodinamik olarak stabil, sPESI Skoru = 0',
              rvDysfunction: 'Negatif',
              biomarkers: 'Negatif',
              primaryAction: 'Erken taburculuk veya kısa süreli servis izlemi, DOAC (Apiksaban / Rivaroksaban)'
            }
          ]
        }
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'Pulmoner embolide ölümün ana mekanizması solunumsal yetmezlik değil; pulmoner vasküler yatağın ani tıkanmasına bağlı gelişen Akut Sağ Ventrikül Yetmezliği ve Obstrüktif Şoktur.',
      geneticMutations: [
        'Faktör V Leiden (G1691A) Mutasyonu (Aktive Protein C direnci - en sık herediter trombofili)',
        'Protrombin G20210A Gen Mutasyonu (Artmış protrombin plazma seviyesi)',
        'Antitrombin III Eksikliği (Heparin direnci oluşturabilir)',
        'Protein C ve Protein S Eksikliği (Doğal antikoagülan yolak defekti)',
        'Antifosfolipid Antikor Sendromu (Lupus antikoagülanı, antikardiyolipin antikorları)'
      ],
      stepsTitle: 'Sağ Ventrikül Ölüm Döngüsü (RV Death Spiral) Kısır Döngü Mekanizması',
      flowType: 'vicious-cycle',
      cycleWarning: 'ÖLÜMCÜL KISIR DÖNGÜ (FEEDBACK LOOP): RV genişledikçe septumu sola iter; LV dolumu engellenince tansiyon düşer; aort kök basıncı düşünce sağ koroner perfüzyonu çöker ve RV daha da genişler! Aşırı sıvı vermek bu döngüyü hızlandırır.',
      cascadeSteps: [
        {
          phase: '1. Mekanik Tıkanma & Akut PVR Fırlaması',
          mechanism: 'Trombüsün pulmoner arteri tıkaması ve trombositlerden salınan Tromboksan A2 / Serotonin pulmoner vasküler direnci (PVR) katlar; RV afterloadu aniden fırlar.',
          badge: 'DÖNGÜ 1: PVR ARTIŞI'
        },
        {
          phase: '2. RV Dilatasyonu & Duvar İskemisi (Laplace)',
          mechanism: 'İnce duvarlı sağ ventrikül basınca dayanamayıp hızla genişler; triküspit yetmezliği başlar ve Laplace yasası gereği RV duvar gerilimi ve O2 ihtiyacı fırlar.',
          badge: 'DÖNGÜ 2: RV DİLATTASYONU'
        },
        {
          phase: '3. İnterventriküler Septal Kayma (D-Shape LV)',
          mechanism: 'Şişen sağ ventrikül interventriküler septumu sola doğru iter (D-şeklinde LV); sol ventrikül diyastolik doluşu (preload) mekanik olarak kilitlenir.',
          badge: 'DÖNGÜ 3: SEPTAL SHIFT'
        },
        {
          phase: '4. Hipotansiyon & Sağ Koroner Perfüzyon Çöküşü',
          mechanism: 'LV atım hacmi çökünce sistemik hipotansiyon gelişir; aort kökü basıncı düşünce sağ koroner arter perfüzyonu sıfırlanır, RV iskemisi derinleşir ve DÖNGÜ BAŞA DÖNER (PEA arrest).',
          badge: 'DÖNGÜ 4: KORONER İSKELE İFLASI'
        }
      ],
      summaryText: 'Özetle masif pulmoner emboli hastası "hipoksiden değil, akut sağ ventrikülün gerilerek iskemiye girmesi ve sol ventrikül doluşunu engellemesi sonucu obstrüktif şoktan" kaybedilir. Bu nedenle aşırı sıvı verilmesi gerilmiş septumu daha da sola iterek ölümcül döngüyü hızlandırır.'
    },

    // 6) Klinik Özellikleri - Prezentasyonu
    presentation: {
      earlySigns: [
        'Dakika ventilasyonu sabitken ani, açıklanamayan End-Tidal CO2 (EtCO2) düşüşü (<15-20 mmHg)',
        'Anestezi derinliğine veya analjeziye rağmen inatçı sinüs taşikardisi (>100-110/dk)',
        'FiO2 artışına zayıf yanıt veren ani pulse oksimetre desatürasyonu (SpO2 < %90)',
        'Hafif-orta düzeyde sistemik kan basıncı düşüşü ve nabız basıncında daralma'
      ],
      progressingSigns: [
        'Ağır refrakter hipotansiyon (Sistolik KB < 90 mmHg veya MAP < 65 mmHg; vazopressör bağımlılığı)',
        'Santral venöz basınçta ani ve belirgin yükselme (CVP > 16-20 mmHg), juguler dolgunluk',
        'EKG\'de akut sağ kalp yüklenme bulguları (yeni RBBB, S1Q3T3, V1-V4 derivasyonlarında T negatifliği)',
        'Arter kan gazında derin PaO2 düşüşü, genişlemiş P(A-a)O2 gradiyenti ve artan laktat seviyesi'
      ],
      lateSigns: [
        'Ekokardiyografide McConnell bulgusu (RV serbest duvar akinezisi, apeks hiperkinezisi) ve sol ventriküle bası yapan D-şeklinde septum',
        'Kardiyojenik / Obstrüktif Şok, periferik nabızların palpe edilememesi ve derin metabolik laktik asidoz',
        'Kardiyak Arrest: Genellikle Nabızsız Elektriksel Aktivite (PEA) veya Asistoli ritmi ile ani kardiyovasküler kollaps'
      ],
      specialAlertTitle: 'İntraoperatif Ani EtCO2 Çöküşü Algoritması',
      specialAlertContent: 'Genel anestezi altında cerrahi sürerken EtCO2\'nin aniden yarı yarıya düşmesi (<20 mmHg) 3 ana mekanizmaya işaret eder: 1) Akut Masif Pulmoner Emboli (kan akımı akciğere ulaşamadığı için CO2 alveole atılamaz), 2) Kardiyak Arrest / Masif Dolaşım Çöküşü, 3) Trakeal tüp çıkması veya ventilatör devresi ayrılması. Devre kontrol edildikten sonra ilk eylem Masif PE resüsitasyonudur!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Preoperatif Caprini VTE Risk Skorlaması uygulanmalı; Yüksek ve Çok Yüksek riskli cerrahi hastalarda mekanik + farmakolojik profilaksi planlanmalıdır.',
        'Total kalça/diz artroplastisi ve majör ortopedik travmalarda cerrahiden en az 12 saat önce/sonra DMAH (Enoksaparin) protokolü uygulanmalıdır.',
        'Uzun sürecek ameliyatlarda tüm hastalara intraoperatif Aralıklı Pnömatik Kompresyon Cihazı (IPC / SCD) ve dereceli varis çorabı takılmalıdır.',
        'Turnike kullanımında iskemi süresi 90-120 dakikayı aşmamalı; turnike indirilirken anestezi ekibi hemodinami ve EtCO2 takibinde teyakkuzda olmalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Acil Pulmoner Emboli Resüsitasyon Ekipmanı Hazırlığı',
        steps: [
          'İntraoperatif TEE probunun ameliyathane alanında çalışır ve kalibre edilmiş durumda hazır tutulması',
          'Acil vazopressör infüzyon setinin (Noradrenalin 4 mg / 50 mL ve Vazopressin 20 IU / 50 mL) hızla infüzyona bağlanabilecek şekilde çekili tutulması',
          'Ameliyathane acil dolabında Alteplase (Actilyse 50 mg flakonlar) ve steril sulandırma sıvılarının stoğunun doğrulanması',
          'Acil Anfraksiyone Heparin (Nevparin 5.000 IU/mL veya 25.000 IU) ve antidot Protamin Sülfat ampullerinin el altında bulunması',
          'Gerektiğinde acil kan gazı (laktat, PaO2, baz açığı) analizörünün hazır olması'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Santral venöz kateterizasyon ve damar yolu açılışında hava girişini önlemek için luer-lock kilitler ve Trendelenburg pozisyonu kullanılması',
        'Femur protezi sementlenmesi esnasında intramedüller basınç artışını azaltmak için havalandırma deliği (vent hole) açılması ve cerrahla iletişim',
        'Laparoskopik cerrahide insüflasyon basıncının 12-14 mmHg ile sınırlandırılması ve aşırı dik Trendelenburg\'dan kaçınılması'
      ],
      cartTitle: 'Acil Pulmoner Emboli (PE) Resüsitasyon Kiti & Ekipman Listesi:',
      cartChecklist: [
        'Alteplase (Actilyse 50 mg x 2 flakon) + Enjeksiyonluk Su',
        'Tenecteplase (Metalyse) tek bolus flakonu',
        'Anfraksiyone Heparin (5.000 IU/mL x 2 flakon)',
        'Protamin Sülfat (50 mg / 5 mL ampul x 2 adet)',
        'Noradrenalin (4 mg / 4 mL x 2 ampul)',
        'Vazopressin (20 IU / 1 mL ampul)',
        'Dobutamin (250 mg / 20 mL ampul)',
        'İnhale İloprost (Ventavis 10 mcg/mL nebül) veya iNO bağlantı seti',
        'İntraoperatif TEE Prob ve Cihazı'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'En az 48-72 saat 3. Basamak Yoğun Bakım Ünitesinde (YBÜ) invaziv arteriyel basınç, CVP, seri laktat ve kardiyak biyobelirteç takibi.',
      recurrenceRate: 'İlk 3 ayda uygun antikoagülasyon altında %2-5; antikoagülasyon kesildiğinde ilk yıl %10, 5 yılda %30\'a varan nüks riski.',
      recurrenceRiskBadge: 'İLK 72 SAAT KRİTİK NÜKS VE SAĞ KALP DEKOMPANSASYONU DÖNEMİ',
      maintenanceTherapy: 'Akut fazda UFH infüzyonundan sonra hasta stabilize olduğunda Enoksaparin 1 mg/kg SC 12 saatte bir ile idame edilir; oral alım açıldığında Faktör Xa inhibitörü DOAC (Apiksaban 2x10 mg 7 gün sonra 2x5 mg veya Rivaroksaban 2x15 mg 21 gün sonra 1x20 mg) veya Varfarin (Hedef INR 2.0 - 3.0) ile en az 3-6 ay tedavi sürdürülür.',
      monitoringParameters: [
        'Sürekli İnvaziv Arter Basıncı ve Ortalama Arter Basıncı (Hedef MAP ≥ 65-70 mmHg)',
        'Santral Venöz Basınç (CVP düşüş eğilimi sağ ventrikülün rahatladığını gösterir)',
        'Seri Arter Kan Gazı: PaO2/FiO2 oranı, laktat klirensi ve baz açığı düzelmesi',
        'Seri Kardiyak Biyobelirteçler: Yüksek duyarlıklı Troponin T/I ve NT-proBNP gerilemesi',
        '24-48. saat kontrol Transtorasik Ekokardiyografi: RV boyutları, McConnell bulgusunun gerilemesi, triküspit yetmezlik gradiyenti ve sistolik PAP ölçümü',
        'Tromboliz sonrası intrakraniyal kanama (seri nörolojik muayene) ve cerrahi saha drenaj kontrolü'
      ],
      expectedComplications: [
        'Kronik Tromboembolik Pulmoner Hipertansiyon (KTEPH): Vakaların %1-4\'ünde pıhtının organize olması sonucu kalıcı pulmoner hipertansiyon gelişir.',
        'Trombolitik Tedaviye Bağlı Majör Kanama: İntrakraniyal kanama (%1-2) veya cerrahi alanda masif hematom/hemoraji (%5-10).',
        'Kardiyojenik / Obstrüktif Şokun Devamı ve İlerleyici RV Yetmezliği.',
        'Reperfüzyon Pulmoner Ödemi ve ARDS tablosu.'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Bilgisayarlı Tomografi Pulmoner Anjiyografi (BTPA)', description: 'Hemodinamik olarak stabilize edilmiş hastada altın standart tanı yöntemi; trombüsün lümen içi dolma defekti olarak görüntülenmesi.' },
        { testName: 'Alt Ekstremite Venöz Kompresyon Doppler USG', description: 'Derin ven trombozu (DVT) varlığını doğrulamak ve vena cava filtresi endikasyonunu belirlemek için bilateral inceleme.' },
        { testName: 'Kapsamlı Transtorasik / Transözofageal Ekokardiyografi', description: 'RV çapı, TAPSE (Triküspit Anüler Düzlem Sistolik Ekskürsiyonu <16 mm = disfonksiyon), sPAP ve paradoksal septal hareketin kantitatif takibi.' },
        { testName: 'Ventilasyon / Perfüzyon (V/Q) Sintigrafisi', description: 'Böbrek yetmezliği veya kontrast alerjisi nedeniyle BT çekilemeyen hastalarda V/Q uyumsuzluğunun (mismatch) kanıtlanması.' }
      ],
      geneticCounseling: 'Tetiklenmemiş (unprovoked) PE veya 50 yaş altı geçirilmiş emboli vakalarında taburculuk sonrası trombofili paneli (Faktör V Leiden, Protrombin gen mutasyonu, Protein C/S, Lupus antikoagülanı) taranmalıdır.',
      familyScreening: 'Kalıtsal trombofili saptanan olguların birinci derece akrabalarında cerrahi veya gebelik öncesi profilaksi rehberliği için genetik danışmanlık önerilir.',
      prognosisSummary: 'Erken tanı konulup sağ ventrikül aşırı yüklenmesi doğru yönetilen ve zamanında tromboliz/embolektomi uygulanan olgularda sağkalım %85-90\'ın üzerindedir. En kritik belirleyici sağ ventrikül fonksiyonlarının ilk 24-48 saatteki toparlanma hızıdır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Hipotansif Sağ Kalp Yetmezliğinde Aşırı Sıvı Hastayı Öldürebilir',
        takeaway: 'Masif PE\'de sağ ventrikül incedir ve aşırı dolduğunda septumu sol ventriküle doğru iter (septal shift). LV boşluğu basıya uğrayıp dolamaz ve kardiyak debi sıfırlanır. Sıvı bolusları yerine erken Noradrenalin ve Vazopressin başlanmalıdır!',
        category: 'Tuzak'
      },
      {
        title: 'PE Kardiyak Arrestinde KPR En Az 60-90 Dakika Sürdürülmelidir',
        takeaway: 'Masif emboliye bağlı arrestte trombolitik (Alteplase 50 mg IV bolus) verildikten sonra göğüs kompresyonu en az 60-90 dakika devam ettirilmelidir. İlacın pıhtıyı eritmesi ve pulmoner yatağı açması dolaşımla zaman alır.',
        category: 'Ezber Bozan'
      },
      {
        title: 'İntraoperatif En Erken ve En Duyarlı İpucu: Ani EtCO2 Düşüşü',
        takeaway: 'Cerrahi sırasında dakika ventilasyonu değişmeksizin EtCO2\'nin aniden <15-20 mmHg seviyesine çökmesi, ventilasyonun devam ettiği ancak perfüzyonun durduğu devasa bir alveoler ölü boşluk (dead space) fraksiyonunu işaret eder.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Kritik Doz: Alteplase Masif PE ve Arrest Dozları',
        takeaway: 'Standart masif PE dozu 100 mg IV 2 saatlik infüzyondur. Ancak kardiyak arrest veya saniyeler içinde çöken peri-arrest hastada acil 50 mg IV 15 dakikalık bolus hayat kurtarır (gerekirse 30 dk sonra 2. 50 mg).',
        category: 'Kritik Doz'
      },
      {
        title: 'McConnell Bulgusu Nedir?',
        takeaway: 'Ekokardiyografide sağ ventrikül serbest duvarının akinezisi / hipokinezisine rağmen RV apeksinin hiperdinamik kasılmaya devam etmesidir. Akut PE için özgüllüğü %94\'tür.',
        category: 'Sınav / Klinik Notu'
      }
    ],

    // 10) Kullanılan Kaynaklar & İleri Okuma
    references: [
      {
        authors: 'Konstantinides SV, Meyer G, Becattini C, et al.',
        title: '2019 ESC Guidelines for the diagnosis and management of acute pulmonary embolism developed in collaboration with the European Respiratory Society (ERS).',
        journal: 'European Heart Journal. 2020;41(4):543-603.',
        year: '2020',
        relevance: 'Akut pulmoner emboli tanı, risk tabakalaması, tromboliz ve antikoagülasyonunda dünya altın standardı kılavuz.'
      },
      {
        authors: 'Jaff MR, McMurtry MS, Archer SL, et al.',
        title: 'Management of massive and submassive pulmonary embolism, iliofemoral deep vein thrombosis, and chronic thromboembolic pulmonary hypertension: A scientific statement from the American Heart Association (AHA).',
        journal: 'Circulation. 2011;123(16):1788-1830.',
        year: '2011',
        relevance: 'Masif ve submasif PE tanımları, RV disfonksiyon kriterleri ve kateter/cerrahi embolektomi endikasyonları.'
      },
      {
        authors: 'Soar J, Böttiger BW, Carli P, et al.',
        title: 'European Resuscitation Council Guidelines 2021: Adult advanced life support (Cardiac arrest caused by pulmonary embolism).',
        journal: 'Resuscitation. 2021;161:115-151.',
        year: '2021',
        relevance: 'Pulmoner emboliye bağlı kardiyak arrestte acil trombolitik uygulama zamanlaması ve 60-90 dakikalık uzamış KPR protokolü.'
      },
      {
        authors: 'Harter P, et al.',
        title: 'Perioperative Pulmonary Embolism: Diagnosis, Management, and Prevention in Anesthesia Practice.',
        journal: 'Anesthesiology Clinics. 2020;38(1):155-171.',
        year: '2020',
        relevance: 'İntraoperatif EtCO2 değişiklikleri, TEE bulguları, sağ kalp dekompansasyonunda sıvı kısıtlaması ve vazopressör seçimi.'
      }
    ]
  },
  vae: {
    id: 'vae',
    title: 'İntra-operatif Hava Embolisi (VAE / PAE)',
    subTitle: 'Venöz, Pulmoner & Paradoksal Arteriyel Hava Embolisi Kriz Yönetim Protokolü',
    codeColor: 'cyan',
    severityBadge: 'HAYATİ TEHDİT / HIZLI KARDİYOVASKÜLER ÇÖKME',
    keyCallout: 'Hemen Cerrahı Uyar (Cerrahi Alanı SF ile Doldur/Kapat) + %100 O2 Başla + N2O DERHAL KAPAT + Durant Manevrası (Sol Lateral Dekübit + Trendelenburg) + CVC ile Sağ Atriyumdan Hava Aspire Et! PFO şüphesinde PEEP KESİNLİKLE UYGULAMA!',
    quickCalculatorType: 'vae',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Venöz Hava Embolisi (VAE); atmosferik havanın veya cerrahi gazların açık venöz damarlar/sinüsler yoluyla sistemik venöz dolaşıma girerek sağ atriyum, sağ ventrikül ve pulmoner artere ulaşması; pulmoner vasküler direnci akut artırarak sağ ventrikül çıkış yolu tıkanıklığı ("air-lock"), kardiyovasküler kollaps veya patent foramen ovale (PFO) / intrapulmoner şantlar aracılığıyla sistemik arteriyel dolaşıma geçerek serebral/koroner iskemi (Paradoksal Hava Embolisi - PAE) oluşturması durumudur.',
      epidemiology: 'Oturur (sitting) pozisyonda gerçekleştirilen suboksipital kraniyotomilerde ve posterior fossa cerrahilerinde TEE ile saptanabilen VAE insidansı %40-80 olup, klinik olarak belirgin/hemodinamik çökme oranı %15-30 arasındadır. Laparoskopik girişimlerde (Veress iğnesi/trokar vasküler penetrasyonu ile CO2 embolisi) %0.1-0.6, ortopedik artroplastilerde (femoral kanal raybalama ve kemik çimentolama) %1-5, santral venöz kateterizasyon (CVC) takılması, bakımı veya kılıf çekilmesi sırasında %0.1-2 sıklıkla görülür.',
      triggers: [
        'Oturur pozisyonda (sitting position) suboksipital kraniyotomi ve posterior fossa cerrahisi (negatif hidrostatik venöz basınç gradyenti)',
        'Laparoskopi ve robotik cerrahide insüflasyon iğnesinin (Veress) veya trokarın majör retroperitoneal vene penetrasyonu / vasküler insüflasyon',
        'Ortopedik cerrahide total kalça ve diz protezi uygulamaları (femoral kanalın reamingle hazırlanması ve metilmetakrilat çimento preslenmesi)',
        'Santral venöz kateter (CVC), diyaliz kateteri veya Port takılması, kılıfın açık unutulması, lümen manipulasyonu veya hastanın derin inspiryumunda kateter çekilmesi',
        'Radikal boyun diseksiyonları ve baş-boyun cerrahisinde internal juguler ven veya dallarının açık kalması',
        'Obstetrik/Jinekolojik cerrahi: Sezaryen sırasında uterin insizyon ve açık venöz pleksus venleri, histeroskopik cerrahide intrauterin sıvı/gaz distansiyonu',
        'Açık kardiyak cerrahide kardiyopulmoner baypas de-airing yetersizliği ve aortik kross-klemp kaldırılması'
      ],
      safeAgents: [
        '%100 FiO2 Fraksiyone Oksijen (Azot denitrojenasyonu sağlar; kandaki N2 parsiyel basıncını düşürerek kabarcık boyunun küçülmesini ve rezorpsiyonunu dramatik hızlandırır)',
        'Noradrenalin (Norepinefrin - RV koroner perfüzyon basıncını korur, sistemik vasküler rezistansı ve RV kontraktilitesini destekler)',
        'Vazopressin (Katastrofik RV iflasında pulmoner vasküler direnci daha az artırarak aortik diyastolik basıncı yükseltir)',
        'Kristaloid / Kolloid Hızlı Volüm İnfüzyonu (CVP artırılarak cerrahi alandaki venöz basınç yükseltilir ve negatif basınç gradyenti kırılarak hava girişi durdurulur)',
        'İnotroplar (Dobutamin / Milrinon - RV pompa yetersizliğinde kontraktilite desteği)',
        'İntraoperatif Transözofageal Ekokardiyografi (TEE) ve Prekordiyal Doppler (Erken tanı ve aspirasyon teyidinde altın standart)'
      ],
      mortalityStats: 'Masif hava embolisinde (>3-5 mL/kg veya akut >200-300 mL hava aspirasyonu) ölüm oranı dakikalar içinde %40-80 seviyesindedir. 100 mL/saniye hızında hava girişi saniyeler içinde ölümcül RVOT hava bloğuna yol açar.',
      clinicalUrgency: 'DAKİKALAR İÇİNDE SAĞ KALP ÇIKIŞ YOLU TIKANIKLIĞI (AIR LOCK) VE ASİSTOLİK ARREST GELİŞEBİLİR - DERHAL CERRAHA BİLDİRİP N2O KESİLMELİ, ALAN SERUM FİZYOLOJİKLE BOĞULMALI VE HASTA SOL LATERAL TRENDELENBURG (DURANT) POZİSYONUNA ALINMALIDIR.'
    },

    // 3) Tanı ve Şiddet Skalası
    diagnosis: {
      overview: 'İntraoperatif VAE tanısı zamana karşı yarışta erken ve geç klinik göstergelerin sentezi ile konur. En erken ve duyarlı monitör Transözofageal Ekokardiyografi (TEE) ve Prekordiyal Doppler iken; rutin monitörizasyonda ani EtCO2 çöküşü (>2-5 mmHg ani düşüş), EtN2 (end-tidal azot) sıçraması, ani PaO2 desatürasyonu, taşikardi/bradikardi, hipotansiyon ve prekordiyal stetoskopta duyulan "değirmen çarkı (mill-wheel) üfürümü" ile acil tanı doğrulanır.',
      clinicalCriteria: [
        'EtCO2 değerinde ani, keskin ve açıklanamayan çökme (alveolar ölü boşluk ventilasyonunun akut patolojik artışı nedeniyle)',
        'Prekordiyal Doppler stetoskopi ile (4. interkostal aralık sağ parasternal) tipik ıslık, çalkantı veya "değirmen çarkı" (mill-wheel murmur) sesi duyulması',
        'Transözofageal Ekokardiyografide (TEE) sağ atriyum ve sağ ventrikülde yoğun ekojenik "kar fırtınası" (snowstorm) görünümü ve RV dilatasyonu',
        'End-Tidal Azot (EtN2) ölçümünde ani sıçrama (>0.1-0.2 kPa / >1-2 mmHg - venöz kandan alveollere diffüze olan havadaki N2 gazının atılımı)',
        'Ani ve derin sistemik arteryel hipotansiyon ile eşzamanlı CVP/PA basınç fırlaması',
        'Pulmoner vasküler direnç artışına bağlı pik havayolu basınçlarında ani yükselme ve bronkokonstriksiyon refleksi',
        'EKG Değişiklikleri: Akut cor pulmonale bulguları (sağ aks deviasyonu, sağ dal bloğu, V1-V3 ST depresyonu/T negatifliği, sinüs taşikardisi, geç dönemde asistoli/PEA)',
        'Uyanık veya sedatize hastada: Ani retrosternal göğüs ağrısı, derin soluk alma hissi ("gasping"), kontrolsüz inatçı öksürük nöbeti, baş dönmesi ve ajitasyon',
        'Paradoksal Sistemik / Serebral Emboli (PFO/ASD varlığında): Ani pupil asimetrisi, fokal nörolojik defisit, jeneralize nöbet, miyokard iskemisi (EKG ST elevasyonu)'
      ],
      gradingScaleTitle: 'Mirski & Albin İntraoperatif Venöz Hava Embolisi Klinik Şiddet Evrelemesi',
      gradingScaleSource: 'Mirski MA, et al. Anesthesiology 2007; Albin MS, et al. Crit Care Med',
      larachScale: [
        {
          category: 'Evre I (Subklinik / Minimal)',
          points: '<0.1 mL/kg/dk',
          description: 'Yalnızca TEE veya Prekordiyal Doppler ile saptanır. EtCO2 ve kan basıncı normaldir. Cerrah uyarılır, cerrahi alan SF ile ıslatılır, N2O açıksa kapatılır, spontan rezorpsiyon izlenir.'
        },
        {
          category: 'Evre II (Hafif VAE)',
          points: '~0.2 - 0.5 mL/kg/dk',
          description: 'EtCO2 değerinde hafif azalma (<%10), hafif PaO2 düşüşü, taşikardi. Sistemik kan basıncı stabildir. %100 O2ye geçilir, N2O tamamen kapatılır, cerrahi alan yıkanır, IV sıvı infüzyonu hızlandırılır.'
        },
        {
          category: 'Evre III (Orta Şiddetli VAE)',
          points: '~0.5 - 1.5 mL/kg/dk',
          description: 'EtCO2de belirgin çöküş (>%20), PaO2de derin düşüş, CVP yükselmesi, MAPta %20-30 düşüş. Durant manevrası (sol lateral + Trendelenburg), CVC lümeninden hava aspirasyonu, Noradrenalin infüzyonu.'
        },
        {
          category: 'Evre IV (Ağır / Masif VAE)',
          points: '>2.0 - 3.0 mL/kg/dk',
          description: 'Derin hipotansiyon (MAP <%50), prekordiyal değirmen çarkı (mill-wheel) üfürümü, kardiyak debide %50+ çöküş, akut RV iflası. Cerrahi durdurulur, agresif CVC aspirasyonu, yüksek doz vazopressör desteği.'
        },
        {
          category: 'Evre V (Katastrofik Air-Lock)',
          points: '>3.0 - 5.0 mL/kg Bolus',
          description: 'RVOT mekanik olarak hava ile tıkanır (Air-Lock), sol ventriküle kan doluşu sıfırlanır, PEA arresti. ACLS KPR: Göğüs kompresyonu (havayı mekanik parçalar), IV Epinefrin 1 mg, Durant pozisyonunda CVC aspirasyonu, arrest sonrası acil HBOT.'
        }
      ],
      larachInterpretation: 'Mirski & Albin Evrelemesi: Evre I-II minimal hemodinamik etkiyle seyreder ve cerrahi alan irrigasyonuyla kontrol edilebilir. Evre III ve üzerinde ise akut RV yetmezliği ve kardiyovasküler çökme gelişir; acil Durant manevrası, CVC aspirasyonu ve inotropik/vazopressör destek hayat kurtarıcıdır.',
      differentialDiagnosis: [
        { condition: 'Akut Pulmoner Tromboemboli (PE / PTE)', differentiatingFactors: 'DVT öyküsü, D-Dimer yüksekliği, oturur pozisyon veya gaz insüflasyonu olmaksızın gelişmesi, CVC aspirasyonunda hava kabarcığı gelmemesi.' },
        { condition: 'Malign Hipertermi (MH)', differentiatingFactors: 'MHde EtCO2 aniden fırlar ve maseter spazmı/hipertermi görülür; VAEde ise EtCO2 hızla çöker!' },
        { condition: 'Akut Bronkospazm / Mukus Tıkacı', differentiatingFactors: 'Yüksek tepe havayolu basıncı, EtCO2 eğrisinde köpekbalığı yüzgeci (shark-fin) deseni ve ekspiratuar ronküsler.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum seslerinin kaybı, trakeal deviasyon, hipersonorite ve tepe basınç fırlaması.' },
        { condition: 'Anafilaktik Şok', differentiatingFactors: 'Ciltte yaygın flushing/ürtiker, bronkospazm, vazodilatasyon ve düşük CVP (VAEde ise CVP ani yükselir).' },
        { condition: 'Kardiyak Tamponad', differentiatingFactors: 'Pulsus paradoksus, TEEde perikardiyal sıvı ve sağ atriyal diyastolik kollaps.' }
      ]
    },

    // 4) Acile Spesifik Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'DURANT MANEVRASI (SOL LATERAL + TRENDELENBURG) + %100 O2 + N2O DERHAL KAPAT + CERRAHİ ALANI SF İLE BOĞ + CVC HAVA ASPİRASYONU + JÜGÜLER VEN BASKI! PFO ŞÜPHESİNDE PEEP KESİNLİKLE UYGULAMA!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'CERRAHI HEMEN UYAR & CERRAHİ ALANI SF İLE BOĞ (İLK 5 SN)',
          action: 'Cerrahı hemen uyarın: "Hava embolisi şüphesi var, cerrahi alanı hemen serum fizyolojikle doldurun ve açık venleri klempleyin/mum dökün!". Cerrahi alana 1000-2000 mL SF bolus irrigasyon uygulayarak atmosferik hava girişini fiziksel olarak durdurun.',
          criticalNote: 'Havanın damara girmesini durdurmak tüm resüsitasyonun 1 numaralı önceliğidir. Cerrah alanı derhal SF ile doldurmalı veya ıslak spançla kapatmalıdır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'N2O GAZINI ANINDA KAPAT & %100 FİO2 OKSİJENE GEÇ (İLK 10 SN)',
          action: 'Azot protoksit (N2O) açıksa anında ve kesintisiz kapatın! Tıbbi oksijeni derhal %100 FiO2 yüksek akıma getirin. Kandaki ve kabarcık içindeki azot gazının ortamdan hızla yıkanmasını (denitrojenasyon) sağlayın.',
          criticalNote: 'N2O kanda havaya göre 34 kat daha hızlı diffüze olur. N2O kapatılmazsa intravasküler hava kabarcığının hacmi dakikalar içinde 2-3 KAT BÜYÜR ve ölümcül RVOT tıkanıklığı yaratır!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'DURANT MANEVRASI: SOL LATERAL DEKÜBİT & TRENDELENBURG (İLK 30 SN)',
          action: 'Hastayı acilen SOL LATERAL DEKÜBİT ve BAŞ AŞAĞI TRENDELENBURG (15-30 derece) pozisyonuna getirin. Hava kabarcıklarını sağ ventrikül apeksinde hapsederek pulmoner çıkış yolu (RVOT) ve pulmoner arter kapağından uzaklaştırın.',
          criticalNote: 'Hava kanın üstünde yüzer. Sol lateral Trendelenburg pozisyonunda sağ ventrikül apeksi en üst noktaya gelir ve hava burada hapsolur; pulmoner kapağa kan akışı yeniden açılır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'SANTRAL VENÖZ KATETERDEN (CVC) HAVA ASPİRASYONU (1. DK)',
          action: 'Santral venöz kateterden veya Bunegin-Albin kateterinden 20-50 mL boş luer-lock enjektörle negatif basınçlı sürekli hava aspirasyonu uygulayın. Sağ atriyum ve SVC bileşkesindeki serbest hava ve köpüklü kanı aspire edin.',
          criticalNote: 'Çok delikli (multi-orifice) kateter kavoatriyal bileşkede (SVC-RA junction) olmalıdır (sağ IJVden ~13-15 cm derinlikte). Köpüklü kan gelene kadar aspire edin.',
          priority: 'HIGH'
        },
        {
          stepNumber: 5,
          title: 'BİLATERAL İNTERNAL JÜGÜLER VEN KOMPRESYONU (1-2. DK)',
          action: 'Boyun venlerine bilateral hafif manuel kompresyon uygulayın. Serebral ve servikal venöz basıncı anlık yükselterek havanın girdiği açık kranial/servikal veni bulup kapatmak için venöz geri akım sağlayın.',
          criticalNote: 'Bilateral boyun veni basısı kranial venöz basıncı artırarak venöz lümenden kanın dışarı akmasını sağlar; cerrah hava emen veni lokalize edip bipolar koter veya kemik mumu ile kapatabilir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'AGRESİF İNTRAVENÖZ SIVI YÜKLEMESİ & CVP DÜZEYİ (2-3. DK)',
          action: 'Isıtılmış dengeli kristaloid (İzolen/Ringer Laktat) 1000-1500 mL hızlı infüzyonla CVP düzeyini 10-12 mmHg seviyesine çıkarın. Sağ atriyal ve sistemik venöz basıncı hidrostatik olarak yükselterek venöz lümen ile atmosfer arasındaki negatif gradyenti sıfırlayın.',
          criticalNote: 'Hipovolemi VAE riskini ve şiddetini katlar. Venöz basıncın pozitif olması damarın hava emmesini fiziksel olarak engeller. Ancak aşırı yüklemede RV dilatasyonuna dikkat edilmelidir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'VAZOPRESSÖR & İNOTROP DESTEĞİ: NORADRENALİN (2-4. DK)',
          action: 'Noradrenalin infüzyonu (0.05-0.3 mcg/kg/dk, akut bolus: 10-20 mcg) başlayın; gerekirse Vazopressin (0.01-0.04 IU/dk) ve Dobutamin (2.5-10 mcg/kg/dk) ekleyin. MAP >65-75 mmHg tutularak sağ ventrikül koroner perfüzyonu idame ettirilmelidir.',
          criticalNote: 'Sağ ventrikül hem sistol hem diyastolde beslenir; sistemik kan basıncı çökerse RV hızla iskemikleşir ve asistolik arrest gelişir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'PEEP AYARINDA KESİN DİKKAT: PFO RİSKİNDE PEEP = 0 (3-5. DK)',
          action: 'Ventilatör PEEP ayarını 0 cmH2O yapın (PFO riski varsa veya şüpheleniliyorsa). Sağ atriyal basıncın sol atriyal basıncı aşmasını (RAP > LAP) ve havanın foramen ovaleden sistemik artere (beyin/koroner) geçmesini kesin olarak engelleyin.',
          criticalNote: 'Erişkin popülasyonun %25-30unda gizli Patent Foramen Ovale (PFO) vardır. PEEP uygulanırsa sağ atriyum basıncı sol atriyumu aşar ve hava direkt sol kalbe geçip masif serebral inme yaratır!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 9,
          title: 'KARDİYOVASKÜLER KOLLAPSTA MEKANİK GÖĞÜS KOMPRESYONU (5. DK)',
          action: 'Kardiyovasküler kollaps veya persistan air-lock durumunda 100-120/dk ritmik göğüs kompresyonu uygulayın. Sağ ventrikül apeksi ve çıkış yolunda biriken dev hava tıkacını mekanik kuvvetle küçük mikro-kabarcıklara parçalayarak pulmoner dolaşıma dağıtın.',
          criticalNote: 'Hasta arrest olmasa bile şiddetli çıkış yolu blokajında 1-2 dakikalık ritmik prekordiyal kompresyon hava kilidini (air-lock) parçalayarak akımı yeniden başlatabilir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 10,
          title: 'HİPERBARİK OKSİJEN TEDAVİSİ (HBOT) DEĞERLENDİRMESİ & SEVK',
          action: 'Bölge HBOT merkezi ile iletişime geçin, hastayı %100 FiO2 altında tutun ve nörolojik defisit takibi yapın. Boyle ve Henry yasaları uyarınca intravasküler kabarcık hacmini küçültmek ve doku oksijenasyonunu restore etmek için sevk protokolünü başlatın.',
          criticalNote: 'Serebral veya koroner hava embolisi şüphesinde altın standart küratif tedavi Hiperbarik Oksijen Tedavisidir (2.8 - 3.0 ATA). İlk 4-6 saat içinde başlanan HBOT nörolojik sekelleri dramatik azaltır.',
          priority: 'HIGH'
        }
      ],

      // VAE'ye özel detaylı klinik protokoller
      vaeProtocols: {
        durantManeuverAndPositioning: {
          title: 'Durant Manevrası ve Hasta Pozisyonlandırma Prensipleri',
          technique: 'Hasta derhal SOL LATERAL DEKÜBİT ve BAŞ AŞAĞI TRENDELENBURG (15-30 derece) pozisyonuna getirilir. Eğer kraniyal veya oturur pozisyondaki cerrahi nedeniyle tam lateral pozisyon imkansızsa, ameliyat masasına acilen maksimum sol lateral tilt ve Trendelenburg verilir.',
          physiologicalMechanism: 'Havanın kandan çok daha düşük dansiteye sahip olması (yüzme özelliği) nedeniyle; sol lateral Trendelenburg pozisyonunda sağ ventrikülün apeksi ve lateral serbest duvarı en superior (tepe) konuma gelir. Böylece intravasküler hava sağ ventrikül apeksinde kilitlenir; ventrikülün medial ve inferior kısmında yer alan Sağ Ventrikül Çıkış Yolu (RVOT) ve Pulmoner Kapak havanın tıkayıcı etkisinden kurtularak pulmoner artere kan akımını devam ettirir.',
          surgicalSiteCoordination: 'Eğer hasta oturur pozisyonda (sitting position) ise cerrahi derhal durdurulur, cerrah kranial venleri ıslak spanç ve SF ile kapatır, dural sinüslere kemik mumu sürülür ve cerrah masanın yatırılmasına onay verir. Oturur pozisyon hızla terk edilmelidir.'
        },
        cvcAspirationProtocol: {
          title: 'Santral Venöz Kateter (CVC) ile Hava Aspirasyonu Kılavuzu',
          catheterTypeAndDepth: 'Çok delikli (Multi-orifice) özel hava aspirasyon kateterleri (Bunegin-Albin kateteri) standart tek delikli kateterlere göre 4-5 kat daha fazla hava aspire edebilir. Kateter ucunun optimal konumu Kavoatriyal Bileşke (SVC - RA junction) olup, sağ internal juguler venden erişkin erkekte ortalama 13-15 cm, kadında 12-14 cm derinliktedir. TEE eşliğinde veya EKG uç kılavuzluğuyla yerleştirilmiş olması aspirasyon başarısını %85in üzerine çıkarır.',
          aspirationTechnique: '20 mL veya 50 mL luer-lock enjektör kateterin distal lümenine takılır. Hızlı, kesintisiz ve negatif basınçlı aspirasyon uygulanır. Enjektöre gelen kan köpüklü ve hava kabarcıklı olacaktır. Hava kabarcığı gelmeyene ve lümen temiz kanla dolana kadar aspirasyona devam edilir.',
          successRateAndPearls: 'Aspirasyonla çekilebilen hava miktarı genellikle giren toplam havanın %20-50si kadardır; ancak kritik miktardaki havayı uzaklaştırmak RVOT tıkanmasını kırmak için hayat kurtarıcıdır. CVC yoksa veya ucu yanlış yerdeyse vakit kaybetmeden Durant manevrası ve torasik kompresyona odaklanılmalıdır.'
        },
        pfoParadoxicalEmbolism: {
          title: 'Patent Foramen Ovale (PFO) ve Paradoksal Sistemik Hava Embolisi (PAE)',
          riskMechanism: 'Genel sağlıklı erişkin popülasyonunun %25-30unda anatomik olarak açık ancak fonksiyonel olarak kapalı Patent Foramen Ovale (PFO) bulunur. Normal fizyolojide Sol Atriyal Basınç (LAP: 6-10 mmHg) Sağ Atriyal Basınçtan (RAP: 2-6 mmHg) yüksektir ve flap kapalı kalır. Ancak VAE anında pulmoner direnç fırlayınca RAP hızla LAPı geçer (RAP > LAP). Bu durumda foramen ovale açılır ve sağ atriyumdaki hava sol atriyuma, oradan da sistemik arteriyel dolaşıma geçer.',
          peepWarning: 'KRİTİK UYARI: VAE sırasında hipoksemiyi düzeltmek için ampirik yüksek PEEP (Pozitif Ekspiryum Sonu Basınç) uygulanması SAĞ ATRİYAL BASINCI DRAMATİK YÜKSELTEREK PFO ARACILIĞIYLA PARADOKSAL HAVA GEÇİŞİNİ TETİKLER! PFO varlığı kesin olarak dışlanmadıkça PEEP uygulanmamalı veya 0 cmH2O seviyesine indirilmelidir.',
          managementKey: 'Paradoksal hava embolisinde hava koroner arterlere giderse akut transmural miyokard enfarktüsü ve kardiyojenik şok; serebral dolaşıma giderse ani intraoperatif inme, pupil anizokorisi ve koma gelişir. Tedavisi agresif %100 O2, baş pozisyonunun korunması ve derhal Hiperbarik Oksijen Tedavisine (HBOT) nakildir.'
        },
        hyperbaricOxygenGuideline: {
          title: 'Hiperbarik Oksijen Tedavisi (HBOT) Protokolü',
          indications: [
            'Arteriyel / Paradoksal Hava Embolisi kanıtı (koroner iskemi, EKG ST değişiklikleri, intraoperatif veya post-op fokal nörolojik defisit)',
            'Geri dönmeyen veya uzamış koma, pupil asimetrisi veya post-op uyanamama',
            'Masif VAE sonrası yüksek doz inotrop ihtiyacı ve persistan kardiyovasküler şok',
            'Beyin BT/MRGde intravasküler serebral hava kabarcıklarının veya infarktın saptanması'
          ],
          timeWindow: 'İDEAL ZAMAN PENCERESİ: İlk 4-6 saat içinde HBOT kabinine alınması en yüksek nörolojik iyileşmeyi sağlar. Ancak semptomlar devam ettiği sürece 24-48 saate kadar bile HBOT uygulanması klinik fayda gösterir.',
          transportAndStabilization: 'Hasta %100 FiO2 altında non-rebreather maske veya mekanik ventilatör ile transfer edilmelidir. Helikopter ambulans transferi gerekiyorsa kabin basıncı kesinlikle deniz seviyesinde (1 ATA) tutulmalı veya alçak irtifadan (maksimum 300 metre / 1000 feet) uçuş yapılmalıdır; aksi halde irtifa arttıkça kabarcıklar Boyle Yasası uyarınca genişler!'
        },
        monitoringSensitivityHierarchy: [
          {
            modality: 'Transözofageal Ekokardiyografi (TEE)',
            threshold: '0.02 mL/kg/dk (0.1 mL bolus)',
            clinicalUtility: 'Hassasiyet sıralamasında 1. sırada (Altın Standart). Sağ atriyum, RV, PFO ve sol kalbi doğrudan görüntüler.',
            characteristics: 'Anlık mikro-kabarcık "kar fırtınası" saptar. İnvazivdir, sürekli operatör dikkati gerektirir.'
          },
          {
            modality: 'Prekordiyal Doppler Ultrason',
            threshold: '0.05 mL/kg/dk (0.25 mL bolus)',
            clinicalUtility: 'Hassasiyet sıralamasında 2. sırada. En duyarlı non-invaziv monitördür. 4. İKA sağ parasternal yerleştirilir.',
            characteristics: 'Karakteristik "ıslık" ve "hışırtı" sesi verir. Koter parazitinden etkilenir, obezitede sinyal zayıflayabilir.'
          },
          {
            modality: 'End-Tidal Azot (EtN2)',
            threshold: '0.10 mL/kg/dk',
            clinicalUtility: 'Hassasiyet sıralamasında 3. sırada. Venöz havadaki azotun akciğerden atılımını ölçer.',
            characteristics: 'Havadaki N2ye özgüldür (CO2 gibi metabolik faktörlerden etkilenmez). Rutin kapnograflarda nadiren bulunur.'
          },
          {
            modality: 'End-Tidal CO2 (EtCO2)',
            threshold: '0.25 - 0.50 mL/kg/dk',
            clinicalUtility: 'Hassasiyet sıralamasında 4. sırada. Rutin ameliyathanede en pratik ve güvenilir erken klinik monitör.',
            characteristics: 'Pulmoner ölü boşluk artışına bağlı ani çöküş gösterir (>2-5 mmHg). Spesifik değildir (kardiyak debi düşüşüyle de iner).'
          },
          {
            modality: 'Pulmoner Arter Basıncı (PAP / CVP)',
            threshold: '0.50 mL/kg/dk',
            clinicalUtility: 'Hassasiyet sıralamasında 5. sırada. Pulmoner vasküler direnç artışını ve sağ kalp basınç yükünü yansıtır.',
            characteristics: 'İnvaziv kateter gerektirir; basınç artışı emboli hacmiyle koreledir.'
          },
          {
            modality: 'Kardiyak Oskültasyon (Stetoskop / Mill-Wheel)',
            threshold: '>1.5 - 2.0 mL/kg (Masif Emboli)',
            clinicalUtility: 'Hassasiyet sıralamasında son sırada. Sadece devasa hava tıkacı ve katastrofik aşamada duyulur.',
            characteristics: 'Tipik "değirmen çarkı" (burbuja/mill-wheel) sesi verir. Bu ses duyulduğunda hasta zaten arrest eşiğindedir!'
          }
        ]
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'Venöz hava embolisinin oluşabilmesi için cerrahi alanda iki temel fiziksel koşulun aynı anda bulunması zorunludur: 1) Basınç altında kollabe olamayan açık venöz lümen veya dural sinüs varlığı (özellikle kemik kanalları, sert dural yapılar, koterize edilmemiş subkutan venler). 2) Cerrahi alan venleri ile sağ atriyum arasında negatif hidrostatik basınç gradyenti (cerrahi sahanın sağ atriyum seviyesinin üzerinde olması; örn. oturur pozisyonda baş seviyesi sağ atriyumdan 20-40 cm yukarıdadır ve bu 15-30 cmH2O negatif aspirasyon basıncı oluşturur).',
      stepsTitle: 'Giriş Gradyenti, Mekanik RVOT Hava Kilidi ve Şant Dinamiği',
      flowType: 'cascade',
      cascadeSteps: [
        {
          phase: 'Subatmosferik Negatif Basınç & Venöz Hava Aspirasyonu',
          mechanism: 'Kollabe olamayan açık venöz sinüs/kemik veni ile sağ atriyum arasındaki hidrostatik negatif gradyent (> -5 cmH2O) havanın hızla emilerek SVC yoluyla sağ atriyum tavanına toplanmasına neden olur.',
          badge: '1. VENÖZ ASPİRASYON'
        },
        {
          phase: 'Sağ Ventrikül Çıkış Yolu (RVOT) "Air-Lock" Mekanik Tıkacı',
          mechanism: 'Sağ ventriküle geçen hava pulmoner kapak altında köpüklü bir hava kilidi ("air lock") oluşturur. Gaz kompresibl olduğu için RV kasılır ancak gazı sıkıştırıp kanı ileri itemez; sol kalbe kan dolumu (preload) dakikalar içinde sıfırlanır.',
          badge: '2. AIR-LOCK KİLİTLENMESİ'
        },
        {
          phase: 'Pulmoner Mikrovasküler ARDS & Paradoksal Emboli (PFO)',
          mechanism: 'Pulmoner kapillere kaçan mikrokabarcıklar endoteli yakarak lökosit aktivasyonu ve non-kardiyojenik akciğer ödemi tetikler. Sağ atriyal basınç sol atriyumu aştığında PFO açılır; hava sistemik dolaşıma fırlayarak inme ve koroner infarktüs yapar.',
          badge: '3. PAE & ARDS ÇÖKÜŞÜ'
        }
      ],
      summaryText: 'Havanın fiziksel varlığı sadece bir kitle etkisi yaratmaz; intravasküler kabarcıklar hidrofilik plazma proteinlerini denatüre eder, trombosit agregasyonunu uyarır ve dakikalar içinde non-kardiyojenik pulmoner ödem / ARDS tablosunu tetikleyen şiddetli bir inflamatuar endotel hasarı başlatır.'
    },

    // 6) Klinik Özellikleri - Prezentasyonu
    presentation: {
      earlySigns: [
        'Transözofageal Ekokardiyografide (TEE) sağ atriyumda ekojenik mikro-kabarcık kar fırtınası ("snowstorm" görünümü - en erken ve en duyarlı bulgu)',
        'Prekordiyal Dopplerde karakteristik ıslık, çalkantı ve hışırtı seslerinin duyulması (4. İKA sağ parasternal)',
        'Kapnografide dakika ventilasyonu sabitken ani ve açıklanamayan EtCO2 çöküşü (>2-5 mmHg ani düşüş)',
        'End-Tidal Azot (EtN2) düzeyinde >0.1-0.2 kPa ani sıçrama (alveole geçen azot gazı atılımı)',
        'Spontan soluyan veya sedatize hastada ani nefes açlığı ("gasping"), kontrolsüz inatçı öksürük krizi ve ajitasyon',
        'Hafif-orta sinüs taşikardisi ve solunum sayısı artışı'
      ],
      progressingSigns: [
        'Arteriyel kan basıncında belirgin düşüş (MAPta %20-40 çöküş, refrakter hipotansiyon)',
        'Santral venöz basınçta (CVP) ve pulmoner arter basıncında ani yükselme, juguler venöz dolgunluk',
        'Pik hava yolu basıncında akut yükselme ve bronkokonstriksiyon refleksi',
        'EKG Değişiklikleri: Akut cor pulmonale bulguları (sağ aks deviasyonu, yeni sağ dal bloğu, V1-V3 ST depresyonu ve simetrik T negatifliği)',
        'Arter kan gazında derin PaO2 çöküşü, genişlemiş alveolo-arteriyel gradyent ve erken respiratuar alkaloz ardından metabolik asidoz'
      ],
      lateSigns: [
        'EtCO2 değerinin hızla 10 mmHgnın altına veya sıfıra yaklaşması',
        'Prekordiyal stetoskop ile duyulan tipik "mill-wheel" (değirmen çarkı) üfürümü',
        'Sağ ventrikül çıkış yolunun köpüklü hava ile tam tıkanması (RVOT Air-Lock) ve sol ventrikül doluşunun sıfırlanması',
        'Kardiyak Arrest: Nabızsız Elektriksel Aktivite (PEA) veya Asistoli ritmi',
        'Paradoksal Arteriyel Emboli (PFO/ASD varlığında): Pupil anizokorisi, intraoperatif konvülsiyon, fokal nörolojik defisit, EKGde ST elevasyonlu MI'
      ],
      specialAlertTitle: 'Paradoksal Arteriyel Emboli (PAE) & PFO Tehdidi',
      specialAlertContent: 'Genel popülasyonun %25-30unda bulunan gizli Patent Foramen Ovale (PFO), sağ atriyal basıncın sol atriyumu aşmasıyla (RAP > LAP) açılır. Bu durumda hava direkt sol kalbe ve beyne/koronerlere geçerek felç veya transmural enfarktüs yaratır! PEEP kesinlikle uygulanmamalıdır!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Oturur pozisyonda (sitting position) kraniyotomi ve posterior fossa cerrahisi planlanan tüm hastalara preoperatif kontrastlı TEE veya TTE ile PFO (Patent Foramen Ovale) taraması yapılmalıdır.',
        'Kanıtlanmış PFO veya intrakardiyak şantı olan hastalarda oturur pozisyon kesinlikle KONTRENDİKEDİR; cerrahi yatay (prone/park-bench) pozisyonda gerçekleştirilmelidir.',
        'Laparoskopik cerrahide insüflasyon iğnesinin (Veress) damar içine girmediğinden emin olmak için aspirasyon ve düşük basınçlı insüflasyon testi uygulanmalıdır.',
        'Santral kateter veya port takılırken hasta daima Trendelenburg pozisyonuna alınmalı, kateter lümenleri klempli tutulmalı ve açık hub kesinlikle bırakılmamalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Hava Embolisi Kriz Ekipmanı & Monitörizasyon Hazırlığı',
        steps: [
          'Prekordiyal Doppler probunun 3.-6. sağ parasternal aralığa sabitlenmesi ve ses kalibrasyonunun doğrulanması',
          'İntraoperatif Transözofageal Ekokardiyografi (TEE) cihazının hazır ve çalışır durumda tutulması',
          'Çok delikli (Bunegin-Albin) santral hava aspirasyon kateterinin SVC-RA bileşkesine yerleştirilip aspirasyon kontrolünün yapılması',
          'Ameliyat masasının acil durumlarda anında sol lateral tilt ve dik Trendelenburg pozisyonuna getirilebildiğinin test edilmesi',
          'Acil vazopressör infüzyonunun (Noradrenalin) hazır çekili tutulması ve ameliyathane alanında bol miktarda ılık SF bulundurulması'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Azot Protoksit (N2O) yüksek riskli cerrahilerde (oturur pozisyon kraniyotomi, posterior fossa) KESİNLİKLE KULLANILMAMALIDIR (hava kabarcığını 2-3 kat büyütür).',
        'Pozitif Ekspiryum Sonu Basınç (PEEP) ampirik olarak yükseltilmemelidir; PFO açılmasını önlemek için PEEP = 0 cmH2O hedeflenmelidir.',
        'Venöz basıncı pozitif tutarak hava girişini önlemek için hastanın normovolemik / hafif hipervolemik tutulması (CVP 10-12 mmHg).'
      ],
      cartTitle: 'Acil Hava Embolisi (VAE) Kiti & Ekipman Kontrol Listesi:',
      cartChecklist: [
        '20 mL ve 50 mL Luer-Lock Hava Aspirasyon Enjektörleri',
        'Çok Delikli Bunegin-Albin CVC Aspirasyon Kateteri',
        'Prekordiyal Doppler Ultrasonografi Cihazı ve Prob Jeli',
        'Transözofageal Ekokardiyografi (TEE) Cihazı ve Çok Düzlemli Prob',
        'Noradrenalin (Norepinefrin) 4 mg / 4 mL Ampuller',
        'Vazopressin 20 IU / 1 mL Ampul',
        'Dobutamin 250 mg / 20 mL Ampul',
        'Cerrahi Alan SF İrrigasyonu için 1000-2000 mL Isıtılmış Serum Fizyolojik Torbaları',
        'Bölge Hiperbarik Oksijen Tedavisi (HBOT) Merkezi Acil İletişim Formu'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'En az 24-48 saat 3. Seviye Yoğun Bakım Ünitesinde invaziv arteriyel kan basıncı, CVP, sürekli EKG, seri nörolojik muayene ve laktat takibi.',
      recurrenceRate: 'Akut cerrahi alan kapatıldıktan sonra tekrarlama riski düşüktür; ancak kalan intravasküler havanın geç dönemde PFO veya intrapulmoner şantla beyne geçişi (PAE riski) ilk 12-24 saatte devam edebilir.',
      recurrenceRiskBadge: 'İLK 12-24 SAAT PARADOKSAL SEREBRAL TUTULUM & GEÇ NÖROLOJİK SEKEL RİSKİ',
      maintenanceTherapy: '%100 FiO2 yüksek akım oksijen tedavisi ile intravasküler azotun yıkanması (denitrojenasyon) sürdürülür. MAP >65-75 mmHg tutulacak şekilde Noradrenalin titre edilir. Serebral veya koroner hava embolisi kanıtı olan hastalarda ilk 4-6 saat içinde Hiperbarik Oksijen Tedavisi (HBOT, 2.8-3.0 ATA) uygulanır.',
      monitoringParameters: [
        'Sürekli İnvaziv Arteriyel Basınç ve MAP takibi (sağ koroner perfüzyonunun korunması)',
        'Santral Venöz Basınç (CVP) eğilimi (sağ ventrikülün rahatlaması ve negatif gradyentin kırılması)',
        'Seri Arter Kan Gazı (PaO2/FiO2 oranı, alveolo-arteriyel gradyent ve laktat klirensi)',
        'Seri Nörolojik Muayene: Pupil refleksi, motor-duyu yanıtı ve Glasgow Koma Skoru takibi',
        'Kardiyak Biyobelirteçler (Troponin I/T ve NT-proBNP) ile RV geriliminin izlenmesi',
        'Kontrol Ekokardiyografi: Sağ ventrikül boyutları, triküspit yetmezliği gradiyenti ve rezidüel hava kontrolü',
        'Kranial BT veya Beyin MRG: Serebral sulkuslarda gaz kabarcığı, mikroenfarkt veya ödem tespiti'
      ],
      expectedComplications: [
        'Geç Dönem Diffüz Nörolojik Hasar ve İskemik Serebral Enfarktüs (paradoksal mikro-kabarcık embolisi sonucu)',
        'Non-Kardiyojenik Pulmoner Ödem ve ARDS (kan-gaz arayüzeyinin tetiklediği akut endotel hasarı)',
        'Akut Sağ Ventrikül İskemisi / İnfarktüsü ve Kalıcı Sağ Kalp Yetmezliği',
        'Tüketim Koagülopatisi ve Yaygın İntravasküler Koagülasyon (DIC) eğilimi'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Transözofageal Ekokardiyografi (TEE) ile Kontrastlı Şant Çalışması', description: 'Ajite salin (hava-sıvı mikstürü) verilerek sağ atriyumdan sol atriyuma 3-5 kardiyak siklus içinde mikrokabarcık geçişi araştırılır (PFO kesin tanısı).' },
        { testName: 'Kranial Kontrastsız Bilgisayarlı Tomografi (BT)', description: 'Serebral kortikal damarlarda veya subaraknoid boşlukta serbest hava kabarcıkları (intravasküler hava) ve erken sitotoksik ödem saptanır.' },
        { testName: 'Beyin Difüzyon Manyetik Rezonans Görüntüleme (DWI-MRG)', description: 'Arteriyel hava mikroembolilerine bağlı kortikal ve sınır bölge (watershed) mikro-enfarkt alanlarının erken tespiti.' },
        { testName: '12 Derivasyonlu Seri EKG ve Ekokardiyografi', description: 'Akut cor pulmonale bulgularının gerilemesi, RV sistolik fonksiyonunun toparlanması ve triküspit kapağın değerlendirilmesi.' }
      ],
      geneticCounseling: 'PFO varlığı genetik bir mutasyondan ziyade embriyolojik septum primum ve secundum füzyon defektidir; birinci derece akrabalarda rutin genetik tarama gerekmez ancak aile öyküsünde kriptojenik inme varsa kardiyolojik ekokardiyografik tarama önerilir.',
      familyScreening: 'Kriptojenik inme veya dalgıç dekompresyon hastalığı öyküsü olan aile bireylerine PFO araştırması önerilebilir.',
      prognosisSummary: 'Erken tanı konulan, cerrahi alan hızla SF ile doldurulan, N2O kapatılıp Durant manevrası ve CVC aspirasyonu uygulanan olgularda prognoz mükemmeldir (>%90 tam iyileşme). Ancak tanı geciktiğinde, masif hava girişi (>3-5 mL/kg) veya PFO üzerinden serebral/koroner embolizasyon geliştiğinde mortalite %40-80e ulaşabilir. Zamanında HBOT nörolojik sekelleri anlamlı derecede azaltır.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'N2O Kapatma Refleksi (Kabarcık Boyutu Çarpanı)',
        takeaway: 'N2O kanda azottan 34 kat daha hızlı diffüze olur. N2O açıksa hava kabarcığının içine dolarak kabarcığı dakikalar içinde 2-3 kat büyütür ve ölümcül RVOT hava kilidini tetikler. Şüphe anında N2O DERHAL VE KESİNTİSİZ KAPATILMALIDIR!',
        category: 'Tuzak'
      },
      {
        title: 'PEEP Kontrendikasyonu & Gizli PFO Tuzağı',
        takeaway: 'Toplumun %25-30unda anatomik olarak açık PFO bulunur. VAE sırasında hipoksemiyi düzeltmek için ampirik PEEP artırılması SAĞ ATRİYAL BASINCI SOL ATRİYUMUN ÜZERİNE ÇIKARIR (RAP > LAP) ve ölümcül serebral inme / koroner enfarktüs yaratır! PEEP KESİNLİKLE UYGULANMAMALIDIR (PEEP = 0)!',
        category: 'Tuzak'
      },
      {
        title: 'Durant Manevrası Fizyolojisi (Air-Lock Kırma)',
        takeaway: 'Hava suyun üstünde yüzer. Sol lateral dekübit + Trendelenburg (baş aşağı) pozisyonunda sağ ventrikül apeksi en tepeye gelir ve hava burada hapsolur; böylece medialdeki pulmoner kapak ve RVOT tıkanıklıktan kurtularak akciğere kan akımı devam eder.',
        category: 'Ezber Bozan'
      },
      {
        title: 'Ölümcül Hava Hacmi Eşiği (3 - 5 mL/kg)',
        takeaway: 'Erişkinde ani verilen 3-5 mL/kg (veya >200-300 mL) hava bolusu ölümcüldür. 100 mL/saniye hızındaki hava girişi saniyeler içinde mekanik hava kilidi ve asistoliye neden olur.',
        category: 'Kritik Doz'
      },
      {
        title: 'CVC Aspirasyonunda Doğru Derinlik (Kavoatriyal Bileşke)',
        takeaway: 'CVC hava aspirasyonunun başarılı olması için kateter ucu kavoatriyal bileşkede (SVC-RA junction) olmalıdır (sağ internal juguler venden erkekte ortalama 13-15 cm, kadında 12-14 cm). Körlemesine derine itilirse hava yerine sadece kan aspire edilir.',
        category: 'Kritik Doz'
      },
      {
        title: 'Uyanık Hastada İlk İpucu: Öksürük ve Gasping',
        takeaway: 'Lokal/rejyonel anestezi altındaki veya sedatize uyanık hastada (sezaryen, histeroskopi, CVC takılması) ani retrosternal göğüs ağrısı, nefes açlığı hissi ("gasping") ve kontrolsüz inatçı öksürük nöbeti VAE için en erken ve patognomonik uyarıdır.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Hiperbarik Oksijen Tedavisi (HBOT) ve İrtifa Kısıtlaması',
        takeaway: 'Paradoksal veya arteriyel hava embolisinde altın standart küratif tedavi HBOTdur (2.8-3.0 ATA). Sevk sırasında hava ambulansı kullanılacaksa kabin basıncı deniz seviyesinde tutulmalı veya helikopter <300 metre (1000 feet) irtifadan uçmalıdır; aksi halde Boyle yasası uyarınca kabarcıklar daha da genişler!',
        category: 'Ezber Bozan'
      }
    ],

    // 10) Kanıta Dayalı Kaynaklar
    references: [
      {
        authors: 'Mirski MA, Lele AV, Fitzsimmons L, Toung TJ.',
        title: 'Diagnosis and treatment of vascular air embolism.',
        journal: 'Anesthesiology. 2007;106(1):164-177.',
        year: '2007',
        relevance: 'Venöz ve arteriyel hava embolisinde patofizyoloji, monitör duyarlılık hiyerarşisi, kriz algoritmaları ve Durant manevrası prensipleri.'
      },
      {
        authors: 'Albin MS, Carroll RG, Maroon JC.',
        title: 'Clinical considerations concerning detection of venous air embolism in neurosurgery.',
        journal: 'Critical Care Medicine. 1978;6(6):380-388.',
        year: '1978',
        relevance: 'Oturur pozisyonda kraniyotomilerde Prekordiyal Doppler, Bunegin-Albin hava aspirasyon kateteri ve klinik evreleme.'
      },
      {
        authors: 'Gordy S, Rowell S.',
        title: 'Vascular air embolism: Review of physiological pathophysiology, clinical presentation, and management options.',
        journal: 'International Journal of Critical Illness and Injury Science. 2013;3(1):73-76.',
        year: '2013',
        relevance: 'İntraoperatif kardiyovasküler kollapsta air-lock mekanizması, PFO paradoksal emboli riskleri ve resüsitasyon protokolleri.'
      },
      {
        authors: 'Muth CM, Shank ES.',
        title: 'Gas embolism.',
        journal: 'New England Journal of Medicine (NEJM). 2000;342(7):476-482.',
        year: '2000',
        relevance: 'Arteriyel gaz embolisinde serebral/koroner iskemi mekanizması, Boyle yasası ve erken Hiperbarik Oksijen Tedavisi (HBOT) endikasyonları.'
      }
    ]
  },
  last: {
    id: 'last',
    title: 'LAST (Lokal Anestezik Sistemik Toksisitesi)',
    subTitle: 'ASRA-ESRA 2020 Kılavuzu: Acil %20 Lipid Emülsiyon Kurtarma ve Modifiye ACLS Protokolü',
    codeColor: 'purple',
    severityBadge: 'HAYATİ TEHDİT · MSS VE KARDİYOVASKÜLER ÇÖKME · DAKİKALAR İÇİNDE LİPİD RESÜSİTASYONU',
    keyCallout: 'Lokal Anestezik Enjeksiyonunu DERHAL DURDUR + Yardım Çağır (Acil LAST Kiti / %20 İntralipid İstet) + %100 O2 Hiperventilasyon + Nöbeti Benzodiazepin ile Baskıla + %20 Lipid Emülsiyonu 1.5 mL/kg IV Bolus Başla (2-3 dk) + 0.25 mL/kg/dk İnfüzyon! STANDART 1 mg EPİNEFRİNDEN KAÇIN (≤1 mcg/kg)! LİDOKAİN / VAZOPRESSİN KESİNLİKLE YASAK!',
    quickCalculatorType: 'last',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Lokal Anestezik Sistemik Toksisitesi (LAST); periferik sinir blokları, epidural anestezi, infiltrasyon veya cerrahi yara yeri infüzyonları sırasında lokal anestezik ajanın istem dışı intravasküler enjeksiyonu ya da vasküler yataklardan hızlı sistemik emilimi sonucu plazma konsantrasyonunun toksik eşiği aşmasıyla oluşan; merkezi sinir sistemi (MSS) eksitasyonu/depresyonu ve hayatı tehdit eden kardiyovasküler kollaps (iletim bloğu, refrakter ventriküler aritmiler, asistoli) ile karakterize akut perioperatif klinik krizdir.',
      epidemiology: 'Ultrasonografi (USG) rehberliği ve aspirasyon rutinlerine rağmen periferik sinir bloklarında LAST insidansı 10.000 blokta yaklaşık 1.8 - 2.5 seviyesindedir. En sık paravertebral, interkostal, kaudal, epidural ve transversus abdominis planı (TAP) bloklarında yüksek vaskülarite nedeniyle görülür. Olguların %20-30unda klasik ardışık MSS belirtileri (prodromal semptomlar) görülmeksizin doğrudan ani kardiyovasküler arrest (özellikle lipofilik Bupivakainde) ortaya çıkabilir.',
      triggers: [
        'Periferik sinir bloğu veya doku infiltrasyonu esnasında iğnenin vasküler lümene penetrasyonu ve fark edilmeden doğrudan intravasküler enjeksiyon',
        'Zengin vasküler yataklara yüksek hacimli blok uygulaması (interkostal, pudendal, kaudal, epidural, TAP blokları)',
        'Kümülatif maksimum güvenli doz limitlerinin aşılması (özellikle çoklu bloklarda veya cerrahın yaptığı ilave infiltrasyonlarda)',
        'Hasta Risk Faktörleri: İleri yaş (>70), yenidoğan/infant, düşük kas kitlesi/kaşeksi, karaciğer yetmezliği (azalmış klerens)',
        'Kardiyak Patolojiler: Ağır iskemik kalp hastalığı, kalp yetmezliği (EF <%35), ileti sistemi defektleri (AV bloklar), mitokondriyal sitopati ve karnitin eksikliği',
        'Metabolik Riskler: Gebelik (artmış kardiyotoksisite duyarlılığı, azalmış protein bağlama), asidoz, hiperkapni ve hipoksi (toksisiteyi katlar)'
      ],
      safeAgents: [
        '%20 Lipid Emülsiyonu (İntralipid / Lipovenoes - "Lipid sink" ve mitokondriyal metabolik kurtarma; birinci basamak antidot)',
        'Benzodiazepinler: Midazolam (1-2 mg IV titre - nöbet aktivitesini kontrol etmek için ilk tercih)',
        'Düşük Doz Epinefrin (≤ 1 mcg/kg bolus: 10 - 50 mcg IV - kardiyak perfüzyon basıncını korur, yüksek dozun aritmik etkisinden kaçınır)',
        'Atropin (0.5 - 1.0 mg IV - LA indüklü bradikardinin erken düzeltilmesinde)',
        'Amiodaron (150-300 mg IV - ventriküler aritmilerde antiaaritmik tercih; sınıf Ib ajanlar YASAKTIR)',
        'Veno-Arteriyel ECMO (VA-ECMO / CPB - refrakter kardiyak arrestte LA klerensi sağlanana kadar mekanik perfüzyon desteği)'
      ],
      mortalityStats: '%20 Lipid kurtarma tedavisi ve USG rehberliği öncesi %10-20 seviyelerinde olan LAST mortalitesi, erken lipid emülsiyonu kullanımı ve modifiye ACLS protokolleri ile <%1-3 seviyesine gerilemiştir; ancak kardiyovasküler arrestte başarılı resüsitasyon 60-90 dakikalık uzamış KPR gerektirebilir.',
      clinicalUrgency: 'LOKAL ANESTEZİK ENJEKSİYONU ANINDA DURDURULMALI, HİPOKSİ VE ASİDOZ HİPERVENTİLASYONLA ENGELLENMELİ VE %20 İNTRALİPİD KİTİ DAKİKALAR İÇİNDE BAŞLANMALIDIR!'
    },

    // 3) Tanı ve Şiddet Skalası
    diagnosis: {
      overview: 'LAST tanısı dinamik ve yüksek klinik şüphe ile konur. Klasik seyirde önce MSS semptomları (metalik tat, perioral uyuşma, tinnitus, ajitasyon, nöbet) ardından KVS belirtileri (hipertansiyon/taşikardi, ardından bradikardi, geniş QRS, ventriküler taşikardi/fibrilasyon, asistoli) gelişir. Ancak bupivakain gibi yüksek lipofilik ajanlarda olguların üçte birinde MSS semptomları atlanarak aniden kardiyak arrest gelişebilir. Lokal anestezik yapıldıktan sonraki ilk 1-30 dakika içinde gelişen tüm açıklanamayan nörolojik ve hemodinamik bozulmalar aksi kanıtlanana kadar LAST kabul edilir.',
      clinicalCriteria: [
        'Ön Belirtiler (Prodromal MSS): Dilde ve dudak çevresinde uyuşma (perioral parestezi), ağızda madeni/metalik tat hissi, kulak çınlaması (tinnitus)',
        'Duyusal ve Vizüel Bozukluklar: Işığa hassasiyet, görme bulanıklığı, çift görme, konuşma peltekleşmesi (dizartri)',
        'MSS Eksitasyonu: Huzursuzluk, kontrolsüz ajitasyon, konfüzyon, yüz ve ekstremitelerde miyoklonik kas seğirmeleri',
        'Jeneralize Nöbet: Ani başlayan tonik-klonik konvülziyonlar (asidoz ve hiperkapniyi katlayarak kardiyotoksisiteyi tetikler)',
        'MSS Depresyonu: Bilinç kaybı, derin koma, solunum depresyonu ve apne',
        'Erken Kardiyovasküler Belirtiler: Taşikardi ve hipertansiyon (MSS sempatik deşarjına bağlı geçici kompansasyon)',
        'İlerleyici KVS İletim Bozuklukları: PR uzaması, genişlemiş QRS kompleksi, dal blokları, derin bradikardi ve hipotansiyon',
        'Malign Ventriküler Aritmiler: Ventriküler taşikardi (VT), Torsades de Pointes, Ventriküler Fibrilasyon (VF)',
        'Kardiyovasküler Kollaps / Arrest: Refrakter asistoli veya elektriksel-mekanik dissosiasyon (PEA)'
      ],
      gradingScaleTitle: 'ASRA 2020 LAST Klinik Şiddet ve Sistem Tutulum Evrelemesi',
      gradingScaleSource: 'Neal JM, et al. Regional Anesthesia and Pain Medicine 2018/2020 (ASRA Practice Advisory)',
      larachScale: [
        {
          category: 'Evre 1: Subklinik & Prodromal MSS',
          points: 'Erken İkaz Düzeyi',
          description: 'Perioral parestezi, dilde metalik tat, kulak çınlaması, konuşma bozukluğu, sersemlik. Kan basıncı ve nabız stabildir. Enjeksiyon hemen kesilir, %100 O2 maskesi takılır, yakın monitörizasyon başlar.'
        },
        {
          category: 'Evre 2: Eksitatör MSS & Nöbet',
          points: 'Orta Şiddetli Toksisite',
          description: 'Fasiyal seğirmeler, motor ajitasyon, jeneralize tonik-klonik nöbet. Havayolu emniyete alınır, Midazolam 1-2 mg IV uygulanır, acil LAST Lipid Kiti ameliyathaneye getirtilir.'
        },
        {
          category: 'Evre 3: MSS Depresyonu & Erken KVS',
          points: 'Ağır Toksisite',
          description: 'Bilinç kaybı, koma, solunum depresyonu/apne, hipotansiyon, PR ve QRS genişlemesi, bradikardi. Hasta entübe edilir, %100 O2 hiperventilasyon, %20 İntralipid bolus (1.5 mL/kg) derhal başlatılır.'
        },
        {
          category: 'Evre 4: Malign Ventriküler Aritmiler',
          points: 'Hayati Tehdit',
          description: 'Geniş QRSli VT, polimorfik VT/Torsades, VF. Lipid infüzyonu hızlandırılır (0.5 mL/kg/dk), Amiodaron 150-300 mg düşünülür (Lidokain KESİNLİKLE YASAKTIR), düşük doz epinefrin uygulanır.'
        },
        {
          category: 'Evre 5: Kardiyovasküler Kollaps & Asistoli',
          points: 'Katastrofik Arrest',
          description: 'Refrakter asistoli veya PEA arresti, nabızsızlık. Modifiye ACLS KPR: Epinefrin ≤1 mcg/kg bolus, %20 İntralipid tekrar bolusları (maks 3 bolus), uzamış kardiyak masaj, acil VA-ECMO hazırlığı.'
        }
      ],
      larachInterpretation: 'ASRA 2020 Değerlendirmesi: Herhangi bir prodromal belirti görüldüğü anda lokal anestezik verilmesi sonlandırılmalıdır. Bupivakain ve levobupivakain gibi güçlü lipofilik ajanlarda Evre 1 ve 2 atlanarak hasta saniyeler içinde doğrudan Evre 4 veya 5e girebilir. Bu nedenle şüphe duyulduğu anda %20 Lipid Emülsiyonu hazır edilmelidir.',
      differentialDiagnosis: [
        { condition: 'Vazovagal Senkop', differentiatingFactors: 'Genellikle enjeksiyon anında veya öncesinde anksiyete/ağrı ile tetiklenir; bradikardi ve hipotansiyona solukluk ve terleme eşlik eder. Nöbet ve ventriküler aritmi görülmez; bacakların kaldırılması ve atropin ile hızla düzelir.' },
        { condition: 'Epinefrin Damar İçi Kaçışı (Test Dozu Yanıtı)', differentiatingFactors: 'Lokal anestezik içindeki adrenalinin vasküler kaçışı taşikardi (>20-30 atım artış), hipertansiyon ve çarpıntı yapar; ancak MSS uyuşması, nöbet veya QRS genişlemesi oluşturmaz.' },
        { condition: 'Akut İntrakraniyal Olay / SVO', differentiatingFactors: 'Fokal nörolojik defisit, asimetrik motor kayıp, afazi; lokal anestezik enjeksiyon zamanıyla birebir korelasyon göstermez, kardiyotoksisite beklenmez.' },
        { condition: 'Anafilaksi', differentiatingFactors: 'Bronkospazm, yaygın ürtiker, anjiyoödem ve vazodilatatör şok tablosu; lokal anesteziklere bağlı anafilaksi çok nadirdir (<%1) ve lipid kurtarmaya değil epinefrin/steroid/sıvıya yanıt verir.' },
        { condition: 'Yüksek / Total Spinal Blok', differentiatingFactors: 'Spinal veya epidural sonrası hızla yükselen duyusal/motor blok seviyesi, interkostal paralizi, bradikardi ve hipotansiyon; doğrudan BOS içine kaçış söz konusudur.' },
        { condition: 'Hiperventilasyon / Panik Atağı', differentiatingFactors: 'Perioral parestezi ve karpopedal spazm yapabilir; vital bulgularda malign aritmi veya EKG genişlemesi görülmez.' }
      ]
    },

    // 4) Acile Spesifik Akut Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'LOKAL ANESTEZİĞİ KES + YARDIM ÇAĞIR + %100 O2 + MİDAZOLAM + %20 İNTRALİPİD 1.5 mL/kg BOLUS (2-3 dk) + 0.25 mL/kg/dk İNFÜZYON! STANDART 1 mg ADRENALİN KESİNLİKLE YAPMA (≤1 mcg/kg)! LİDOKAİN / VAZOPRESSİN YASAK!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'LOKAL ANESTEZİK ENJEKSİYONUNU DERHAL DURDUR & YARDIM ÇAĞIR (İLK 5 SN)',
          action: 'Lokal anestezik enjeksiyonunu ANINDA sonlandırın. İğneyi/kateteri geri çekin. Ameliyathane veya girişim odasında yardım çağırın: "LAST / Toksisite Kriz Protokolü başlatıldı, acil LAST kutusunu ve %20 İntralipid emülsiyonunu hemen getirin!". Kardiyak arrest ekibini ve KVC/ECMO konsültasyonunu teyakkuza geçirin.',
          criticalNote: 'Enjeksiyon anında durdurulmazsa giren her ilave mililitre mortaliteyi katlar. LAST kitine hızla ulaşmak başarı şansını belirler.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'HAVAYOLU YÖNETİMİ & %100 O2 İLE HİPERVENTİLASYON (İLK 15 SN)',
          action: 'Hastaya %100 FiO2 oksijen başlayın. Gerekirse balon-maske ventilasyonu uygulayın veya acil endotrakeal entübasyon yapın. Hafif hiperventilasyon ile PaCO2 30-35 mmHg seviyesinde tutulmalı ve asidoz önlenmelidir.',
          criticalNote: 'Hipoksi, hiperkapni ve respiratuar/metabolik asidoz lokal anesteziklerin miyokardiyal Na+ kanallarına bağlanmasını dramatik artırır ve toksisite eşiğini düşürür. Asidozun düzeltilmesi altın kuraldır!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'NÖBET AKTİVİTESİNİ BASKILA: BENZODİAZEPİN TERCİHİ (İLK 30 SN)',
          action: 'Nöbet gelişirse ilk tercih olarak Midazolam 1 - 2 mg IV bolus titre edin. Alternatif: Lorazepam veya Diazepam. Nöbet devam ederse Süksinilkolin 0.5-1 mg/kg IV veya Rokuronyum uygulanarak motor aktivite ve kas asidozu durdurulmalı, hasta entübe edilmelidir.',
          criticalNote: 'Propofol kardiyotoksik ve miyokardiyal depresandır; ağır hipotansiyon ve kardiyak yetmezliği tetikleyebileceği için LAST nöbetinde ilk tercih DEĞİLDİR (yalnızca düşük doz 20-30 mg çok dikkatle kullanılabilir).',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: '%20 LİPİD EMÜLSİYONU (İNTRALİPİD) ACİL BOLUSU BAŞLA (1. DK)',
          action: '%20 İntralipid solüsyonundan 1.5 mL/kg IV bolus (70 kg hasta için ~100 mL) 2-3 dakika içinde puşe olarak uygulayın. Vasküler instabilite veya nörolojik çöküş görülen tüm olgularda gecikmeden başlanmalıdır.',
          criticalNote: 'Lipid kurtarma kardiyak arrest beklenmeden, ilk hemodinamik instabilite veya nöbet anında başlanmalıdır! "Lipid Sink" etkisiyle kanda serbest LA fraksiyonunu bağlar ve miyokardı temizler.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: '%20 LİPİD EMÜLSİYONU SÜREKLİ İNFÜZYONUNU BAŞLAT (2. DK)',
          action: 'Bolusun hemen ardından %20 Lipid infüzyonunu 0.25 mL/kg/dk hızında (70 kg hasta için ~17.5 mL/dk veya yaklaşık 1000 mL/saat) başlatın. İnfüzyon hemodinamik stabilite sağlanana kadar en az 10-15 dakika sürdürülmelidir.',
          criticalNote: 'İnfüzyon pompayla veya manuel serbest akışla verilebilir; hastanın kan basıncı ve kardiyak ritmi normale dönene kadar kesilmemelidir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'PERSİSTAN KARDİYOVASKÜLER ÇÖKMEDE TEKRAR BOLUSU VE HIZ ARTIRIMI (3-5. DK)',
          action: 'Eğer kan basıncı toparlanmazsa veya aritmiler sürerse: 1.5 mL/kg bolusu 5-10 dakika arayla 1 veya 2 kez tekrarlayın (toplam maks 3 bolus). Sürekli infüzyon hızını iki katına çıkararak 0.5 mL/kg/dk (70 kg için ~35 mL/dk) yapın.',
          criticalNote: 'Maksimum Kümülatif Lipid Doz Sınırı: İlk 30-60 dakika içinde toplam 10 - 12 mL/kg (70 kg için ~700-840 mL) aşılmamalıdır.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'MODİFİYE ACLS PROTOKOLÜ: DÜŞÜK DOZ EPİNEFRİN UYARISI',
          action: 'Kardiyak arrest gelişirse KPR başlatın. Ancak STANDART 1 mg EPİNEFRİN DOZUNDAN KESİNLİKLE KAÇININ! Dozu ≤ 1 mcg/kg (erişkinde 10 - 50 mcg IV küçük boluslar) olarak titre edin.',
          criticalNote: 'Standart yüksek doz Epinefrin (1 mg) miyokardiyal laktat asidozunu artırır, ventriküler aritmileri provoke eder ve %20 Lipid emülsiyonunun kurtarıcı etkisini zayıflatır!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 8,
          title: 'KONTRENDİKE İLAÇLAR: LİDOKAİN, VAZOPRESSİN VE CCB YASAĞI',
          action: 'Ventriküler aritmilerde veya arrestte LİDOKAİN ve diğer Sınıf Ib ajanları KESİNLİKLE VERMEYİN! Vazopressin, kalsiyum kanal blokerleri (CCB) ve beta blokerler kullanmayın. Ventriküler aritmi için Amiodaron (150-300 mg) tercih edin.',
          criticalNote: 'Lidokain zaten toksisiteyi yapan Na+ kanal blokeridir ve tabloyu ağırlaştırır. Vazopressin pulmoner vazokonstriksiyon yaparak sağ kalbi çökertir ve lipid klerensini bozar.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 9,
          title: 'REFRAKTER ARRESTTE ACİL VA-ECMO / CPB KURTARMA BAŞLAT',
          action: 'Lipid tedavisi ve KPRye rağmen 15-20 dakika içinde kardiyak output geri dönmezse acil Veno-Arteriyel ECMO (VA-ECMO) veya Kardiyopulmoner Baypas (CPB) hazırlığını tamamlayıp kanüle edin.',
          criticalNote: 'Lokal anestezikler geri dönüşümlü toksinlerdir; ECMO ile 12-24 saat perfüzyon sağlandığında ilaç dokulardan temizlenir ve miyokard tamamen toparlanabilir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 10,
          title: 'POST-KRİZ DÖNEMİ VE YOĞUN BAKIMDA İZLEM PROTOKOLÜ',
          action: 'Başarılı resüsitasyon sonrası hasta en az 24 saat 3. Seviye Yoğun Bakımda takip edilmelidir. Sadece MSS belirtisi olanlar en az 2 saat, kardiyotoksisite geçirenler en az 4-6 saat sürekli EKG ve hemodinami ile izlenmelidir.',
          criticalNote: 'Lokal anesteziğin depolardan geç salınımı nedeniyle geç rebound toksisite gelişebilir. Aşırı lipid uygulamasına sekonder pankreatit, lipemi ve laboratuvar parazitleri izlenmelidir.',
          priority: 'HIGH'
        }
      ],

      // LAST'a özel detaylı klinik protokoller
      lastProtocols: {
        lipidRescueProtocol: {
          title: '%20 Lipid Emülsiyonu (Lipid Kurtarma) Uygulama Rehberi',
          bolusDose: '1.5 mL/kg IV Bolus (2-3 dakikada verilir; 70 kg erişkin için yaklaşık 100-105 mL)',
          infusionDose: '0.25 mL/kg/dk Sürekli İnfüzyon (70 kg hasta için yaklaşık 17.5 mL/dk veya 1050 mL/saat)',
          repeatBolusRule: 'Kardiyovasküler instabilite veya aritmi devam ederse 5-10 dk arayla 1-2 kez daha 1.5 mL/kg bolus tekrarlanabilir ve infüzyon 0.5 mL/kg/dkya çıkarılabilir.',
          maxCumulativeDose: 'İlk 30-60 dakikada toplam 10 - 12 mL/kg (70 kg hasta için maksimum ~700 - 840 mL)',
          lipidSinkMechanism: 'Lipid Sink (Lipid Çökeltisi) Hipotezi: Lipid damlacıkları kanda lipofilik lokal anesteziği (özellikle Bupivakaini) tutarak doku ve miyositlerden uzaklaştırır. Metabolik Hipotez: LA ile bloke olan karnitin açiltransferazı baypas ederek miyosit mitokondrisine doğrudan yağ asidi yakıtı sağlar ve miyokardiyal ATP üretimini restore eder.'
        },
        aclsModifications: {
          title: 'LAST Olgularında Modifiye ACLS Kuralları ve Kesin Kontrendikasyonlar',
          epinephrineAdjustment: 'DÜŞÜK DOZ KULLANIN: Standart 1 mg yerine ≤ 1 mcg/kg (10 - 50 mcg IV bolus). Yüksek doz adrenalin pulmoner vasküler direnci artırır, miyokard iskemisini derinleştirir ve lipid etkinliğini bozar.',
          prohibitedDrugs: [
            'Lidokain ve Sınıf Ib Antiaritmikler: Toksisiteyi katlar, KESİNLİKLE KONTRENDİKEDİR!',
            'Vazopressin: Pulmoner vazokonstriksiyonu artırır, kardiyak debiyi düşürür ve lipid yanıtını bozar.',
            'Kalsiyum Kanal Blokerleri (CCB): Miyokardiyal depresyonu ve AV blokları derinleştirir.',
            'Beta Blokerler: Bradikardiyi ve kontraktilite çöküşünü şiddetlendirir.',
            'Propofol: Ağır kardiyak depresyon riski nedeniyle nöbet kontrolünde ilk tercih değildir.'
          ],
          antiarrhythmicStrategy: 'Ventriküler aritmilerde Amiodaron (150-300 mg IV) ilk tercihtir. Prokainamid, Lidokain ve diğer sodyum kanal blokerleri KESİNLİKLE YASAKTIR.',
          ecmoCriteria: 'Lipid ve agresif KPRye rağmen 15-30 dakikada ROSC (dolaşımın geri dönüşü) sağlanamazsa derhal VA-ECMO veya Kardiyopulmoner Baypasa geçilmelidir.'
        },
        safeDosageLimits: [
          {
            agent: 'Bupivakain (Marcaine)',
            plainMaxDose: '2.0 mg/kg (Maks 150-175 mg)',
            epinephrineMaxDose: '2.5 mg/kg (Maks 200 mg)',
            durationOfAction: 'Uzun (3 - 8 saat)',
            cardiotoxicityRisk: 'ÇOK YÜKSEK (CC/CNS oranı 2.0 - 2.5; en ölümcül)'
          },
          {
            agent: 'Levobupivakain (Chirocaine)',
            plainMaxDose: '2.5 mg/kg (Maks 150 mg)',
            epinephrineMaxDose: '3.0 mg/kg (Maks 200 mg)',
            durationOfAction: 'Uzun (3 - 8 saat)',
            cardiotoxicityRisk: 'YÜKSEK (S-enantiyomer, Bupivakaine göre %30-40 daha az toksik)'
          },
          {
            agent: 'Ropivakain (Naropin)',
            plainMaxDose: '3.0 mg/kg (Maks 200-225 mg)',
            epinephrineMaxDose: '3.5 mg/kg (Maks 250 mg)',
            durationOfAction: 'Uzun (3 - 6 saat)',
            cardiotoxicityRisk: 'ORTA-YÜKSEK (Saf S-enantiyomer, kardiyak güvenlik marjı daha geniş)'
          },
          {
            agent: 'Lidokain (Aritmal / Jetokain)',
            plainMaxDose: '4.5 mg/kg (Maks 300 mg)',
            epinephrineMaxDose: '7.0 mg/kg (Maks 500 mg)',
            durationOfAction: 'Orta (1.5 - 2.5 saat)',
            cardiotoxicityRisk: 'DÜŞÜK-ORTA (CC/CNS oranı ~7.0; önce belirgin MSS belirtileri verir)'
          },
          {
            agent: 'Prilokain (Citanest)',
            plainMaxDose: '6.0 mg/kg (Maks 400 mg)',
            epinephrineMaxDose: '8.0 mg/kg (Maks 600 mg)',
            durationOfAction: 'Orta (1.5 - 2 saat)',
            cardiotoxicityRisk: 'DÜŞÜK (Methemoglobinemi riski taşır; antidot: Metilen Mavisi)'
          }
        ],
        toxicityProgressionStages: [
          {
            stage: 'Prodromal MSS (Plazma LA: 5-10 mcg/mL Lidokain)',
            plasmaLevel: '5 - 10 mcg/mL',
            cnsSymptoms: 'Perioral parestezi, dilde metalik tat, tinnitus, baş dönmesi, geveleyerek konuşma.',
            cvsSymptoms: 'Normal veya hafif hipertansiyon ve taşikardi.',
            actionRequired: 'Enjeksiyonu kes, %100 O2 başla, hastayla sürekli konuş.'
          },
          {
            stage: 'Eksitatör MSS (Plazma LA: 10-15 mcg/mL)',
            plasmaLevel: '10 - 15 mcg/mL',
            cnsSymptoms: 'Fasiyal kas seğirmeleri, huzursuzluk, halüsinasyon, jeneralize tonik-klonik nöbet.',
            cvsSymptoms: 'Artmış sempatik tonus, taşikardi, hipertansiyon.',
            actionRequired: 'Midazolam 1-2 mg IV, %20 İntralipid kitini getirt, havayolunu koru.'
          },
          {
            stage: 'MSS Depresyonu & Erken KVS (Plazma LA: 15-20 mcg/mL)',
            plasmaLevel: '15 - 20 mcg/mL',
            cnsSymptoms: 'Koma, arefleksi, solunum depresyonu ve apne.',
            cvsSymptoms: 'PR uzaması, genişlemiş QRS, bradikardi, miyokard depresyonu, derin hipotansiyon.',
            actionRequired: 'Entübasyon, %20 İntralipid 1.5 mL/kg bolus + 0.25 mL/kg/dk infüzyon.'
          },
          {
            stage: 'Malign KVS Kollaps (Plazma LA: >20-25 mcg/mL)',
            plasmaLevel: '> 25 mcg/mL',
            cnsSymptoms: 'Tam bilinç kaybı ve beyin sapı depresyonu.',
            cvsSymptoms: 'Malign VT/VF, elektromekanik dissosiasyon (PEA), refrakter asistoli.',
            actionRequired: 'Modifiye ACLS (Epinefrin ≤1 mcg/kg), tekrar lipid bolusu, VA-ECMO hazırla.'
          }
        ]
      }
    },

    // 5) Patofizyolojisi
    pathophysiology: {
      molecularBasis: 'Lokal anestezikler nöronal aksonlarda ve kardiyak miyositlerde voltaj kapılı hızlı sodyum (Nav1.5) kanallarının iç poruna bağlanarak depolarizasyonu ve aksiyon potansiyeli yayılımını bloke eder. İntravasküler toksik konsantrasyonlarda bu blokaj; 1) Beyinde inhibitör kortikal nöronları (GABAerjik interlöronlar) erken aşamada felç ederek kontrolsüz eksitatör deşarja (nöbet) yol açar. 2) Kalpte His-Purkinje iletim sistemini ve ventriküler miyositleri yavaşlatarak PR ve QRS genişlemesine, re-entry aritmilerine (VT/VF) neden olur. 3) Mitokondriyal karnitin-açiltransferaz enzimini ve oksidatif fosforilasyonu bloke ederek miyokardiyal ATP sentezini sıfırlar ve şiddetli negatif inotropi yaratır.',
      stepsTitle: 'Kanal Blokaj Kinetiği, Mitokondriyal Kriz ve Nörotoksisite Eksenleri',
      flowType: 'cellular-systemic',
      cascadeSteps: [
        {
          phase: 'Nav1.5 Sodyum Kanal Blokajı ("Fast-in, Slow-out" Tuzağı)',
          mechanism: 'Bupivakain gibi lipofilik LAlar kardiyak Nav1.5 sodyum ve voltaj kapılı potasyum/kalsiyum kanallarına hızla bağlanır; ancak diyastolde kanaldan çözülmesi son derece yavaştır ("fast-in, slow-out"). Faz 0 depolarizasyonu çöker, PR ve QRS genişler, refrakter re-entry VT/VF veya asistoli gelişir.',
          badge: 'EKSEN 1: İYON KANALI KİLİTLENMESİ'
        },
        {
          phase: 'Mitokondriyal Karnitin İnhibisyonu & Miyokardiyal Enerji İflası',
          mechanism: 'Lokal anestezikler mitokondri iç zarındaki karnitin-açiltransferaz enzimini ve oksidatif fosforilasyonu kilitler. Kalbin temel enerji kaynağı olan serbest yağ asitlerinin beta-oksidasyonu durur; masif negatif inotropi ve kardiyojenik kollaps gelişir (%20 Lipid emülsiyonu bu yakıtı sağlar).',
          badge: 'EKSEN 2: METABOLİK ENERJİ İFLASI'
        },
        {
          phase: 'Kortikal GABAerjik İnhibisyon Kaybı (Nöbetten Komaya)',
          mechanism: 'Serebral korteksteki inhibitör GABAerjik internöronlar eksitatör nöronlara kıyasla LA toksisitesine daha duyarlıdır. Fren mekanizması kalkınca eksitasyon fırlar (grand-mal konvülziyonlar); ardından tüm beyin sapı depresyonu, koma ve santral solunum arresti oturur.',
          badge: 'EKSEN 3: KORTİKAL NÖROTOKSİSİTE'
        }
      ],
      summaryText: 'Özetle LAST patofizyolojisinde lipofilite belirleyicidir. Bupivakain yüksek lipofilitesi ve yavaş dissosiasyon kinetiği nedeniyle kardiyotoksisite indeksi (CC/CNS oranı) en dar ve en ölümcül ajandır. %20 Lipid emülsiyonu bu kaskadı hem serbest ilacı kanda hapsederek (sink) hem de mitokondriye metabolik yakıt pompalayarak kırar.'
    },

    // 6) Klinik Özellikleri - Prezentasyonu
    presentation: {
      earlySigns: [
        'Dilde, dudaklarda ve ağız çevresinde karıncalanma ve uyuşma (perioral parestezi - EN ERKEN İKAZ)',
        'Ağızda belirgin madeni, ekşi veya metalik tat hissi',
        'Kulak çınlaması (tinnitus) ve seslere karşı aşırı duyarlılık',
        'Baş dönmesi, sersemlik hissi, bulanık veya çift görme',
        'Konuşmada peltekleşme (dizartri) ve anlamsız kelime tekrarları',
        'Hafif ajitasyon, huzursuzluk ve yüzde seyirme'
      ],
      progressingSigns: [
        'Yüz kaslarında, periorbital alanda ve ekstremitelerde miyoklonik kas seğirmeleri',
        'Aniden başlayan jeneralize tonik-klonik konvülziyonlar (nöbet)',
        'Bilinç bulanıklığı, deliryum ardından ani bilinç kaybı ve derin koma',
        'Spontan solunumun yüzeyelleşmesi, solunum depresyonu ve apne',
        'Taşikardi ve hipertansiyonun yerini hızla derin hipotansiyon ve bradikardiye bırakması',
        'EKGde PR aralığının uzaması ve QRS komplekslerinin patolojik genişlemesi'
      ],
      lateSigns: [
        'Malign ventriküler aritmiler: Ventriküler Taşikardi (VT), Torsades de Pointes, Ventriküler Fibrilasyon (VF)',
        'Miyokardiyal kontraktilitenin çökmesi, kardiyojenik şok ve periferik nabızların kaybolması',
        'Kardiyak İletim Sistemi İflası: Ağır sinüs bradikardisi, nodal ritim, tam AV blok',
        'Kardiyak Arrest: Nabızsız Elektriksel Aktivite (PEA) ve refrakter asistoli',
        'Arter kan gazında derin laktik asidoz, hiperkapni ve miks metabolik-respiratuar çöküş'
      ],
      specialAlertTitle: 'Bupivakain Sessiz Kardiyotoksisite Uyarısı',
      specialAlertContent: 'Bupivakain ve Levobupivakain olgularının yaklaşık üçte birinde prodromal MSS uyuşmaları veya nöbet görülmeksizin HASTA DOĞRUDAN ANİ VENTRİKÜLER ARİTMİ VEYA ASİSTOLİ İLE ÇÖKEBİLİR! Blok sonrası gelişen ani kardiyak instabilitede LAST daima ilk sırada düşünülmelidir!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Hastanın kilosu, yaşı, karaciğer ve böbrek fonksiyonları, kardiyak ejeksiyon fraksiyonu değerlendirilerek her hasta için KİLO BAŞINA MAKSİMUM DOZ önceden hesaplanmalıdır.',
        'İleri yaş (>70), kaşektik hastalar, kalp yetmezliği ve böbrek/karaciğer yetmezliği olanlarda standart maksimum dozlar en az %20-30 oranında azaltılmalıdır.',
        'Çoklu blok planlanan hastalarda (örn. bilateral TAP + cerrahi infiltrasyon) tüm alanlara verilen toplam lokal anestezik dozu tek bir kümülatif havuz olarak hesaplanmalıdır.'
      ],
      anesthesiaMachinePreparation: {
        title: 'LAST Önleme ve Acil Lipid Kiti Standart Hazırlığı',
        steps: [
          'Tüm periferik sinir blokları ve yüksek doz infiltrasyonlar kesinlikle tam monitörizasyon altında (EKG, NIBP, SpO2) ve damar yolu açıkken uygulanmalıdır.',
          'Blok odasında ve ameliyathanede acil %20 Lipid Emülsiyonu (en az iki adet 500 mL torba), infüzyon seti ve aspiratör hazır bulundurulmalıdır.',
          'Acil havayolu ekipmanı (balon-maske, videolaringoskop, ETT) ve nöbet kontrolü için Midazolam çekili tutulmalıdır.',
          'Modifiye ACLS için düşük doz Adrenalin (1 mg ampul 100 mL veya 10 mLye sulandırılarak 10 mcg/mL konsantrasyon) hazırlanabilir durumda olmalıdır.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'İğne yerleşiminde ve ilaç enjeksiyonunda MUTLAKA Ultrasonografi (USG) kullanılmalı; iğne ucu ve LA yayılımı her an ekranda takip edilmelidir.',
        'Her 3 - 5 mL enjeksiyondan önce MUTLAKA negatif vasküler aspirasyon yapılmalıdır (negatif aspirasyonun damar içi olmadığını %100 garanti etmediği unutulmamalıdır).',
        'Enjeksiyon fraksiyone (bölünmüş) ve yavaş uygulanmalıdır (maksimum 15-20 mL/dakika hız).',
        'Kontrendikasyon yoksa 1:200.000 (5 mcg/mL) Epinefrin belirteç (marker) olarak eklenmelidir (damara kaçışta kalp hızında >10-20 atım artış veya SKB >15 mmHg artış erken ikaz verir).'
      ],
      cartTitle: 'LAST Acil Lipid Kiti & Donanım Listesi:',
      cartChecklist: [
        '%20 Lipid Emülsiyonu (İntralipid / Lipovenoes 500 mL x 2-3 torba)',
        'Geniş Lümenli IV İnfüzyon Seti ve Basınçlı İnfüzyon Torbası',
        'Midazolam (5 mg / 5 mL ampul x 2 adet)',
        'Süksinilkolin (100 mg flakon) ve Rokuronyum (50 mg flakon)',
        'Atropin Sülfat (0.5 mg ampul x 2 adet)',
        'Amiodaron (Cordarone 150 mg ampul x 2 adet)',
        'Epinefrin (Adrenalin 1 mg ampul - sulandırma enjektörüyle)',
        'Acil Krikotiroidotomi ve Entübasyon Seti',
        'Bölge KVC / ECMO Acil Konsültasyon İletişim Numarası'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Yalnızca hafif MSS belirtileri gösteren hastalar en az 2 saat; nöbet, kardiyak depresyon veya arrest geçiren hastalar en az 24-48 saat 3. Seviye Yoğun Bakımda takip edilmelidir.',
      recurrenceRate: 'Lokal anesteziğin periferik dokulardan, kaslardan veya yağ dokusundan sistemik dolaşıma geç salınımı nedeniyle ilk 1-4 saatte %5-10 vakada rebound (tekrarlayan) toksisite görülebilir.',
      recurrenceRiskBadge: 'İLK 4-6 SAAT REBOUND TOKSİSİTE VE HİPERLİPEMİ RİSKİ',
      maintenanceTherapy: 'Hemodinamik stabilite sağlandıktan sonra lipid infüzyonu 10-15 dakika daha sürdürülüp kesilir. Rebound hipotansiyon veya aritmi olursa lipid infüzyonu yeniden başlatılabilir. Nöbet sonrası beyin ödemi ve asidoz takibi yapılır.',
      monitoringParameters: [
        'Sürekli 5 derivasyonlu EKG monitörizasyonu (PR, QRS genişliği ve ST-T değişiklikleri)',
        'İnvaziv Arteriyel Kan Basıncı takibi (nabız basıncı ve hemodinamik stabilite)',
        'Seri Arter Kan Gazı: Laktat klirensi, pH, PaO2/FiO2 ve baz defisiti kontrolü',
        'Kardiyak Troponin ve CK-MB enzimleri (miyokardiyal iskemi ve hasarın derecesi)',
        'Serum Amilaz ve Lipaz takibi (yüksek doz lipid emülsiyonuna sekonder akut pankreatit riski)',
        'Serum Trigliserit Düzeyi ve Lipemi Takibi (lipid yüklenmesi laboratuvar kan testlerinde parazit yapabilir)',
        'Nörolojik muayene ve serebral fonksiyon izlemi (hipoksik ensefalopati kontrolü)'
      ],
      expectedComplications: [
        'Post-Kardiyak Arrest Miyokardiyal Disfonksiyon ve Geçici Kalp Yetmezliği',
        'Hipoksik İskemik Serebral Hasar (uzamış nöbet veya resüsitasyona sekonder)',
        'Aşırı Doz Lipid Emülsiyonuna Sekonder Hipertrigliseridemi, Akut Pankreatit ve Lipemik Serum',
        'Akut Pulmoner Toksisite / ARDS (nadir; lipid mikroembolileri ve endotel irritasyonu)',
        'Laboratuvar Analizör Parazitleri (yoğun lipemi nedeniyle elektrolit, hemoglobin ve koagülasyon testlerinde geçici hatalı ölçümler)'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Serum Lokal Anestezik Düzeyi (HPLC / Kütle Spektrometresi)', description: 'Adli ve tıbbi belgeleme için kriz anında alınan kan örneğinde Bupivakain, Ropivakain veya Lidokain konsantrasyonunun doğrulanması (tedaviyi geciktirmeden sonradan çalışılır).' },
        { testName: '12 Derivasyonlu Seri EKG', description: 'İletim bloklarının, QRS morfolojisinin ve repolarizasyon parametrelerinin normale dönüşünün belgelenmesi.' },
        { testName: 'Transtorasik Ekokardiyografi (TTE)', description: 'Sol ve sağ ventrikül sistolik fonksiyonlarının, ejeksiyon fraksiyonunun ve duvar hareketlerinin toparlanmasının teyidi.' },
        { testName: 'Kranial BT / Beyin MRG', description: 'Uzamış nöbet veya arrest geçiren olgularda serebral anoksi veya enfarktüs alanlarının araştırılması.' }
      ],
      geneticCounseling: 'Mitokondriyal sitopatisi veya karnitin palmitoiltransferaz (CPT) eksikliği saptanan genç olgularda genetik metabolizma konsültasyonu ve aile taraması önerilir.',
      familyScreening: 'Miyopati veya açıklanamayan kardiyotoksisite öyküsü olan birinci derece akrabalara metabolik tarama tavsiye edilir.',
      prognosisSummary: 'Erken fark edilen, enjeksiyonu hemen kesilen ve vakit kaybetmeden %20 Lipid Emülsiyonu başlanan LAST vakalarında prognoz fevkalade iyidir (>%95 tam nörolojik ve kardiyak iyileşme). Bupivakain arrestinde bile uzamış KPR (60+ dk) ve lipid kurtarma ile kalıcı nörolojik sekelsiz tam sağkalım elde edilebilir.'
    },

    // 9) High-Yield Bilgiler
    highYieldPearls: [
      {
        title: 'Standart Adrenalin Dozundan Kesin Kaçınma (≤1 mcg/kg)',
        takeaway: 'ACLSdeki standart 1 mg Epinefrin dozu LAST arrestinde ölümcüldür! Miyokardiyal asidozu artırır, ventriküler aritmileri tetikler ve %20 Lipid kurtarmanın etkinliğini bozar. Epinefrin 10-50 mcg küçük boluslarla titre edilmelidir!',
        category: 'Tuzak'
      },
      {
        title: 'Lidokain ile Aritmi Tedavisi Yasağı',
        takeaway: 'LAST kaynaklı ventriküler aritmide Lidokain veya Prokainamid KESİNLİKLE VERİLMEZ. Zaten Na+ kanal blokajı yapan ajana benzer sınıftan antiaritmik eklemek asistoliye davetiyedir! Tercih Amiodarondur.',
        category: 'Tuzak'
      },
      {
        title: 'Lipid Kurtarmada "Lipid Sink" ve Metabolik Etki',
        takeaway: '%20 Lipid emülsiyonu kanda yapay bir lipid fazı oluşturarak lipofilik lokal anesteziği (özellikle Bupivakaini) miyositlerden çeker (sink) ve mitokondriye doğrudan yağ asidi yakıtı sağlayarak ATP sentezini yeniden başlatır.',
        category: 'Ezber Bozan'
      },
      {
        title: '%20 İntralipid Doz Formülü (1.5 mL/kg + 0.25 mL/kg/dk)',
        takeaway: 'Hızlı kural: 70 kg hasta için ilk 2-3 dakikada ~100 mL IV bolus, ardından saatte ~1000 mL (veya dakikada 17-18 mL) sürekli infüzyon. Maksimum kümülatif doz ilk saatte 10-12 mL/kgdır.',
        category: 'Kritik Doz'
      },
      {
        title: 'Bupivakainde Sessiz Kardiyotoksisite Tuzağı',
        takeaway: 'Lidokain önce perioral uyuşma ve nöbetle uyarır; ancak Bupivakain olgularının %30unda MSS belirtisi olmaksızın HASTA ANİDEN VT/VF VEYA ASİSTOLİYE GİRER!',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'Nöbet Kontrolünde Propofolden Kaçınma',
        takeaway: 'LAST nöbetinde Propofol miyokardı daha da deprese edip arresti tetikleyebileceği için İLK TERCİH DEĞİLDİR; ilk tercih Midazolam (1-2 mg IV) gibi benzodiazepinlerdir.',
        category: 'Tuzak'
      },
      {
        title: 'Uzamış KPR ve VA-ECMO ile Tam İyileşme',
        takeaway: 'Lokal anestezikler miyokardı kalıcı tahrip etmez; lipid ve KPR ile veya VA-ECMO desteğiyle ilaç dokulardan temizlenene kadar (60-90 dk bile sürse) resüsitasyona devam edilmelidir.',
        category: 'Ezber Bozan'
      }
    ],

    // 10) Kanıta Dayalı Kaynaklar
    references: [
      {
        authors: 'Neal JM, Neal EJ, Weinberg GL.',
        title: 'American Society of Regional Anesthesia and Pain Medicine Local Anesthetic Systemic Toxicity checklist: 2020 version.',
        journal: 'Regional Anesthesia and Pain Medicine. 2021;46(1):81-86.',
        year: '2021',
        relevance: 'ASRA 2020 resmi kontrol listesi; %20 Lipid emülsiyon doz protokolü, düşük doz epinefrin prensipleri ve kontrendike ilaçlar.'
      },
      {
        authors: 'Weinberg GL, Di Gregorio G, Ripper R, et al.',
        title: 'Resuscitation with lipid emulsion: active metabolite or physical sink?',
        journal: 'Anesthesiology. 2008;108(6):1007-1014.',
        year: '2008',
        relevance: 'Lipid emülsiyonunun lipid sink etkisi, mitokondriyal yağ asidi oksidasyonu ve bupivakain toksisitesinden kurtarma mekanizması.'
      },
      {
        authors: 'Gitman M, Fettiplace MR, Weinberg GL, Neal JM, Barrington MJ.',
        title: 'Local Anesthetic Systemic Toxicity: A Systematic Review of Recent Case Reports and Registry Data.',
        journal: 'Regional Anesthesia and Pain Medicine. 2019;44(6):629-635.',
        year: '2019',
        relevance: 'USG devrinde LAST insidansı, atipik prezentasyonlar ve lipid kurtarma tedavisi sonuçlarının analizi.'
      },
      {
        authors: 'Christie LE, Picard J, Weinberg GL.',
        title: 'Local anaesthetic systemic toxicity (LAST): celebrating twenty years of lipid emulsion therapy.',
        journal: 'Anaesthesia. 2023;78(7):806-810.',
        year: '2023',
        relevance: 'Lipid emülsiyon tedavisinin 20 yıllık klinik kanıtları, ECMO entegrasyonu ve ASRA/ESRA kılavuz güncellemeleri.'
      }
    ]
  },

  'anaphylaxis': {
    id: 'anaphylaxis',
    // 1) Başlık
    title: 'İntraoperatif Anafilaksi & Şiddetli Anafilaktik Şok',
    subTitle: 'Hızlı Vazomotor Felç, Refrakter Hipotansiyon, Bronkospazm & Akut Dolaşım Çöküşü',
    codeColor: 'rose',
    severityBadge: 'KOD KIRMIZI · ERKEN ADRENALİN & MASİF VOLÜM KOMBİNASYONU',
    keyCallout: 'Şüpheli tüm ajanları (kas gevşetici, antibiyotik, lateks, kolloid) derhal durdurun, volatil anestezikleri kapatın ve birinci basamak kurtarıcı olan EPİNEFRİNİ (Adrenalin) GECİKMEDEN IV titre edin! Masif kristaloid sıvı yükleyin; kolloidler KESİNLİKLE YASAKTIR!',
    quickCalculatorType: 'anaphylaxis',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'İntraoperatif anafilaksi; genel veya rejyonal anestezi altında uygulanan ilaçlara veya cerrahi temas maddelerine karşı gelişen, önceden duyarlanmış (IgE-aracılı) veya duyarlanma olmaksızın direkt (non-IgE aracılı mast hücresi / MRGPRX2 aktivasyonu) masif vazoaktif mediyatör salınımıyla karakterize, ani ve hayatı tehdit edici sistemik aşırı duyarlık reaksiyonudur.',
      epidemiology: 'Genel insidans 1:10.000 ila 1:20.000 anestezi arasında değişmektedir. Olguların %50-60ından nöromüsküler blokerler (özellikle Rokuronyum ve Süksinilkolin), %15-20sinden antibiyotikler (başta Sefazolin ve diğer beta-laktamlar), %10undan Klorheksidin (antiseptik/kateter kaplamaları), %5-10undan Patent Blue / lenf nodu boyaları ve lateks sorumludur.',
      triggers: [
        'Nöromüsküler Blokerler (NMBAs): Rokuronyum (en sık), Süksinilkolin, Atrakuryum, Sisatrakuryum, Vekuronyum',
        'Antibiyotikler: Sefazolin (1. kuşak sefalosporin - en sık cerrahi profilaksi tetikleyicisi), Penisilinler, Vankomisin, Teikoplanin',
        'Antiseptikler & Kateterler: Klorheksidin (cilt antisepsisi, idrar sondası jeli, CVC kaplamaları - sinsi tetikleyici)',
        'Cerrahi Boyalar: Patent Blue V, İsosülfan Mavi, İndigo Karmin, Metilen Mavisi (lenfatik haritalama)',
        'Kolloid Sıvılar: Jelatinler (Gelofusine, Haemaccel), Dekstranlar, Hidroksietil Nişasta (HES)',
        'Doğal Kauçuk Lateks: Cerrahi eldivenler, sondalar, drenler, lavman tüpleri (özellikle tekrarlayan cerrahi geçirenler ve spina bifidalılar)',
        'Revers Ajanlar: Sugammadeks (nadir bildirimler; rokuronyum-sugammadeks kompleksi veya saf sugammadeks)',
        'Diğer: Kan ve kan ürünleri, Aprotinin, Protamin, Oksitosin, NSAİİ (non-IgE psödoalerji)'
      ],
      safeAgents: [
        'İnhalasyon Anestezikleri (İntrinsik alerjen değildir; ancak anafilakside derin vazodilatasyon ve miyokard depresyonu nedeniyle KESİLMELİDİR)',
        'Ketamin (Sempatomimetik ve güçlü bronkodilatör; resüsitasyonda mükemmel sedatif ajan)',
        'Dengeli Elektrolit Kristaloidleri (Plasmalyte, İzolyte, Ringer Laktat, %0.9 NaCl - alerjik potansiyeli yoktur)',
        'Opioidler (Fentanil, Remifentanil, Sufentanil - Morfine kıyasla histamin salınımı yapmazlar, güvenlidirler)'
      ],
      mortalityStats: 'Perioperatif anafilakside mortalite %3-9 arasında bildirilmektedir (NAP6 verilerine göre %4 civarı). Ölümlerin başlıca nedeni geç Adrenalin yapılması, yetersiz kristaloid volüm resüsitasyonu ve hava yolu ödemi / katastrofik bronkospazma bağlı anoksik arresttir.',
      clinicalUrgency: 'Genel anestezi altındaki hasta semptomlarını ifade edemez! Uyanık hastadaki kaşıntı, boğazda takılma veya dispne şikayetleri yoktur. Cerrahın örtüleri altında cilt bulguları gizlidir. Aniden gelişen nedeni açıklanamayan ağır hipotansiyon veya ventilatörde yüksek tepe basıncı anafilaksi kabul edilip derhal tedaviye başlanmalıdır.'
    },

    // 3) Tanı ve Klinik Kriterler
    diagnosis: {
      overview: 'Genel anestezi altındaki hastada anafilaksinin kardinal triadı: (1) Ani, açıklanamayan ve efedrin/sıvıya dirençli şiddetli hipotansiyon/şok, (2) Bronkospazm, yüksek hava yolu tepe basıncı (Ppeak) ve desatürasyon, (3) Şiddetli taşikardi (veya derin hipovolemiye sekonder paradoksal bradikardi - Bezold-Jarisch refleksi). Anestezi altındaki vakaların %30-40ında CİLT BULGUSU (eritem/ürtiker) İLK ANDA HİÇ GÖRÜLMEZ veya cerrahi örtülerin altında fark edilmez!',
      clinicalCriteria: [
        'Genel anestezi indüksiyonundan veya bir intravenöz ilaç uygulamasından sonraki 1-15 dakika içinde ani kardiyovasküler kollaps veya dirençli hipotansiyon (SKB <%50 düşüş)',
        'Ventilatörde tepe havayolu basıncının (Ppeak) aniden >40-50 cmH2O seviyesine fırlaması, ekspiryum uzaması ve tidal hacmin ventile edilemeyecek kadar düşmesi',
        'EtCO2 dalgasının aniden çökmesi veya sıfıra yaklaşması (pulmoner perfüzyonun ve kardiyak debinin aniden kesilmesine sekonder)',
        'Cerrahi örtüler açıldığında göğüs, boyun ve yüzde flushing (yaygın eritem), ürtiker plakları, dudak/dil/yüz anjiyoödemi',
        'Periferik nabızların palpe edilememesi, kapiller dolum zamanının >3 saniye uzaması ve EKGde taşiaritmi veya iskemi (Kounis sendromu)'
      ],
      gradingScaleTitle: 'Ring & Messmer Perioperatif Anafilaksi Derecelendirme Skalası',
      gradingScaleSource: 'Ring J, Messmer K. Incidence and severity of anaphylactoid reactions. Lancet 1977 & NAP6 Guidelines',
      larachScale: [
        { category: 'Grade I (Hafif)', points: 'Grade 1', description: 'Yalnızca kütanöz ve mukozal belirtiler: Genel eritem, ürtiker plakları, periorbital/yüz ödemi. Vital bulgular stabildir.' },
        { category: 'Grade II (Orta)', points: 'Grade 2', description: 'Orta derecede çoklu organ tutulumu: Kütanöz bulgular + ılımlı hipotansiyon (SKB düşüşü <%30), taşikardi, hafif bronkospazm ve öksürük.' },
        { category: 'Grade III (Şiddetli - Hayatı Tehdit Eden)', points: 'Grade 3', description: 'Şiddetli ve yaşamı tehdit eden reaksiyon: Masif kardiyovasküler kollaps/şok, derin hipotansiyon, şiddetli taşikardi veya bradikardi, katastrofik bronkospazm ve tepe basınç fırlaması.' },
        { category: 'Grade IV (Kardiyak Arrest)', points: 'Grade 4', description: 'Dolaşım arresti: Nabızsız Elektriksel Aktivite (PEA), Asistoli veya Ventriküler Fibrilasyon (VF). Acil KPR gerektirir.' }
      ],
      larachInterpretation: 'Grade 1 için antihistaminik ve takip yeterli olabilirken; Grade 2, 3 ve 4 için gecikmeksizin birinci basamak ajan olan İNTRAVENÖZ ADRENALİN titre edilmeli ve masif kristaloid verilmelidir!',
      differentialDiagnosis: [
        { condition: 'Aşırı Derin Anestezi / Vazoaktif Doz Aşımı', differentiatingFactors: 'Bronkospazm ve cilt bulgusu yoktur; volatil gaz kapatılınca ve hafif doz efedrin/sıvı ile tansiyon hemen toparlar.' },
        { condition: 'Akut Akciğer / Bronş İrritasyonu (İzole Bronkospazm)', differentiatingFactors: 'Dolaşım çöküşü ve şok tablosu eşlik etmez; bronkodilatörlere hızlı yanıt verir; cilt bulguları negatiftir.' },
        { condition: 'Tansiyon Pnömotoraks', differentiatingFactors: 'Tek taraflı solunum sesi kaybı, trakea deviasyonu, boyun ven dolgunluğu ve perküsyonla hiperrezonans vardır.' },
        { condition: 'Masif Pulmoner Embolizm (PE)', differentiatingFactors: 'Ani EtCO2 düşüşü benzerdir; ancak akut sağ kalp yetmezliği/akut kor pulmonale TEEde RV dilatasyonu ile ayırt edilir; cilt lezyonu yoktur.' },
        { condition: 'İntraoperatif Venöz Hava Embolisi (VAE)', differentiatingFactors: 'Açık ven cerrahisinde görülür; değirmen çarkı üfürümü, TEEde sağ atriyal hava ve prekordiyal doppler sesi tipiktir.' },
        { condition: 'Septik Şok / Cerrahi Masif Hemoraji', differentiatingFactors: 'Hemorajide cerrahi alanda kanama aşikardır veya hematokrit hızla düşer; sepsis daha sinsi ve ateş/enfeksiyon öyküsüyle birliktedir.' },
        { condition: 'Kardiyojenik Şok / Akut Miyokard İnfarktüsü', differentiatingFactors: 'Primer sol ventrikül yetmezliği ve yüksek dolum basınçları mevcuttur; anafilakside ise venöz göllenme nedeniyle "boş kalp" vardır.' }
      ]
    },

    // 4) Kriz Yönetimi & Akut Algoritma
    crisisManagement: {
      hotlineInfo: 'Ulusal Anafilaksi Acil Kriz Hattı / İmmünoloji & Alerji Laboratuvarı Triptaz Analizi Koordinasyonu',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'TÜM ŞÜPHELİ AJANLARI DERHAL KESİN VE CERRAHI UYARIN',
          action: 'Uygulanmakta olan antibiyotik, kolloid, kan ürünü, kas gevşetici veya diğer infüzyonları anında durdurun. Damaryolu infüzyon setlerini çıkarıp atın. Cerrahı derhal uyararak cerrahiyi durdurmasını ve cerrahi alanı yıkamasını isteyin. Lateks şüphesi varsa tüm lateks eldiven ve malzemelerin ortamdan uzaklaştırılmasını sağlayın.',
          criticalNote: 'İntravenöz infüzyon hattında kalan ilacın hastaya gitmesini engellemek için mevcut serum setlerini derhal iptal edip doğrudan kanüle temiz set takılmalıdır!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: '%100 FİO2 İLE HAVALANDIRIN VE VOLATİL ANESTETİKLERİ KAPATIN',
          action: 'FiO2yi derhal 1.0 (%100) yapın. Volatil halojenli anestezikleri (Sevofluran, Desfluran) anında kapatın ve vaporizatörleri sıfırlayın. Anesteziklerin yarattığı vazomotor tonus kaybı ve miyokardiyal kontraktilite depresyonu anafilaktik şoku hızla derinleştirir.',
          criticalNote: 'Derin bilinç kaybı ve amnezi gerekirse şok tablosunda kan basıncını düşürmeyen Ketamin (0.5-1 mg/kg IV) tercih edilebilir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'BİRİNCİ BASAMAK HAYAT KURTARICI: İNTRAVENÖZ ADRENALİN TİTRE EDİN',
          action: 'Adrenalin (Epinefrin) anafilaksinin TEK birinci basamak hayat kurtarıcı ilacıdır; geciktirilmesi doğrudan mortalite nedenidir! Dereceye göre titre edin: Grade II için 10-20 mcg IV; Grade III (ağır şok) için 50-100-200 mcg IV bolus (1:10.000 veya 1:100.000 sulandırılmış); Grade IV (arrest) için 1 mg IV bolus. Damar yolu yoksa uyluk dış yüzünden (Vastus lateralis) IM 0.5 mg (1:1.000) yapın.',
          criticalNote: 'Erken sürekli Adrenalin infüzyonuna başlayın (0.05 - 0.5 mcg/kg/dakika). Titrasyon kan basıncı ve tepe basıncı yanıtına göre yapılmalıdır.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'MASİF KRİSTALOİD VOLÜM RESÜSİTASYONU BAŞLATIN (20-30 mL/kg)',
          action: 'Masif vazodilatasyon ve kapiller kaçış nedeniyle intravasküler volümün %35-50si dakikalar içinde üçüncü boşluğa kaçar ("empty heart" tablosu). En az iki geniş lümenli (14-16G) IV kanülden hızla 20 - 30 mL/kg Dengeli Kristaloid (Plasmalyte / Ringer Laktat / SF) basınçlı torba ile infüze edin (ilk 15-30 dakikada 1-2 Litre).',
          criticalNote: 'KOLLOİD SIVILAR (Jelatin, Dekstran, HES) KESİNLİKLE KONTRENDİKEDİR! Kolloidlerin kendisi anafilaktoid degranülasyon tetikleyicisidir.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'HASTAYI TRENDELENBURG POZİSYONUNA ALIN VEYA BACAKLARI KALDIRIN',
          action: 'Hastanın bacaklarını 45 derece yukarı kaldırın (Passive Leg Raise) veya Trendelenburg pozisyonu vererek santral venöz dönüşü destekleyin. Hastayı KESİNLİKLE dik veya oturur pozisyona getirmeyin.',
          criticalNote: 'Boş ventrikül durumunda hastayı dik pozisyona almak sağ atriyal dolumu sıfırlayarak ani asistolik kardiyak arreste yol açar ("empty ventricle syndrome").',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'REFRAKTER VAZOPPLEJİDE İKİNCİ BASAMAK VAZOPRESSÖRLERİ EKLEYİN',
          action: 'Yüksek doz adrenaline rağmen hipotansiyon sürüyorsa (özellikle kronik ACEİ/ARB veya beta-bloker kullanan hastalarda): Erken Noradrenalin infüzyonu (0.05 - 0.5 mcg/kg/dk), Vazopressin (0.5 - 2 Ünite IV bolus veya 0.01 - 0.04 Ü/dk sürekli infüzyon) veya refrakter vazoplejide Metilen Mavisi (1.5 - 2 mg/kg IV 20-60 dakikada) uygulayın.',
          criticalNote: 'Beta-bloker kullanan hastalarda Glukagon (1 - 5 mg IV yavaş puşe, ardından 2-5 mg/saat infüzyon) adrenalin direncini kırmak için endikedir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'ŞİDDETLİ BRONKOSPAZM VE HAVA YOLU DİRENCİNİ TEDAVİ EDİN',
          action: 'Yüksek tepe basıncı ve ekspiratuar wheezing için: ETT adaptöründen 8-10 puf İnhale Salbutamol (veya aerolize nebül), IV Magnezyum Sülfat 2 g (30-50 mg/kg) 15-20 dakikada infüzyon, IV Ketamin 1-2 mg/kg ve persistan dirençte Aminofilin (5 mg/kg yükleme) uygulayın.',
          criticalNote: 'Laringeal ödem gelişen ekstubasyon planındaki veya uyanık hastalarda acil videolaringoskopi ile erken entübasyon yapılmalı; CICO gelişirse derhal cerrahi hava yoluna geçilmelidir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'ROKURONYUM ŞÜPHESİNDE ACİL SUGAMMADEKS KURTARMA DOZU',
          action: 'Eğer anafilaksi indüksiyonda veya idame sırasında Rokuronyum (veya Vekuronyum) verilmesini takiben geliştiyse, derhal 16 mg/kg Sugammadeks IV verin. Sugammadeks molekülü dolaşımdaki rokuronyumu şelasyon gibi sararak IgE bağlanan antijenik epitopları bloke eder ve krizin çözülmesine katkı sağlar (NAP6 kılavuz önerisi).',
          criticalNote: 'Sugammadeksin kendisinin de nadiren alerji yapabileceği unutulmamalı; ancak rokuronyum anafilaksisinde hayat kurtarıcı bir kurtarma ajanı olarak değerlendirilmelidir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 9,
          title: 'İKİNCİ BASAMAK İLAÇLARI UYGULAYIN (STEROİD & ANTİHİSTAMİNİK)',
          action: 'Hemodinamik stabilizasyon sağlandıktan sonra, bifazik reaksiyonları ve uzamış inflamasyonu önlemek amacıyla: Metilprednizolon (1 - 2 mg/kg IV) veya Hidrokortizon (200 mg IV). H1 blokör (Feniramin 45.5 mg ampul) YAVAŞ infüzyonla verilir. Hızlı puşeden kaçının.',
          criticalNote: 'Kortikosteroidler ve antihistaminikler HAYAT KURTARICI İLK BASAMAK İLAÇLAR DEĞİLDİR! Etkileri 4-6 saatte başlar. Asla Adrenalinin ve sıvı resüsitasyonunun önüne geçmemelidir!',
          priority: 'MEDIUM'
        },
        {
          stepNumber: 10,
          title: 'TANI PROTOKOLÜ: SERİ SERUM TRİPTAZ ÖRNEKLERİ ALIN VE KAYDEDİN',
          action: 'Tanının kesinleştirilmesi ve adli/tıbbi süreç için mutlaka iki ayrı kan örneği alınmalıdır: 1. Tüp: Olayın başlangıcından sonraki 30 - 120. dakikalar arasında (Pik Mast Hücre Degranülasyon Triptazı). 2. Tüp: Postoperatif 24. saatte veya taburculuk öncesi (Bazal Serum Triptazı). Tüm verilen ilaçlar saat/dakika kaydedilerek hasta 4-6 hafta sonra alerji-immünoloji polikliniğine yönlendirilmelidir.',
          criticalNote: 'Pozitif Anafilaksi Doğrulama Kriteri: Pik Triptaz ≥ (1.2 x Bazal Triptaz) + 2 mcg/L formülü ile kesinleştirilir.',
          priority: 'MEDIUM'
        }
      ],

      // İntraoperatif anafilaksiye özel alt protokoller
      anaphylaxisProtocols: {
        epinephrineTitrationByGrade: {
          title: 'Klinik Evreye Göre Epinefrin (Adrenalin) Titrasyon Protokolü',
          guidelineSource: 'ESAIC / Resuscitation Council UK Perioperative Anaphylaxis Algorithm',
          grades: [
            {
              grade: 'Grade I',
              severity: 'Hafif (Kütanöz)',
              clinicalPresentation: 'Genel flushing, ürtiker, göz kapağı ödemi. Tansiyon ve solunum normal.',
              epinephrineBolus: 'GEREKMEZ (Sadece antihistaminik ve yakın takip)',
              infusionRate: 'Yok',
              clinicalAlert: 'Kardiyovasküler instabilite veya tepe basınç artışı gelişirse derhal Grade IIye geçilir.'
            },
            {
              grade: 'Grade II',
              severity: 'Orta (Hafif Şok / Bronkospazm)',
              clinicalPresentation: 'Hafif hipotansiyon (SKB <%30 düşüş), taşikardi, hafif bronkospazm, öksürük.',
              epinephrineBolus: '10 - 20 mcg IV Titre Bolus (1:100.000 solüsyon: 1 mg ampul 100 mL SFye sulandırılır = 10 mcg/mL; 1-2 mL verilir)',
              infusionRate: 'Gerekirse 0.05 mcg/kg/dk başlanır',
              clinicalAlert: 'Yanıt alınamazsa 1-2 dakika içinde Grade III dozuna yükseltilir.'
            },
            {
              grade: 'Grade III',
              severity: 'Ağır (Hayatı Tehdit Eden Şok / Kollaps)',
              clinicalPresentation: 'Derin hipotansiyon (SKB >%50 düşüş), periferik nabız kaybı, katastrofik bronkospazm, EtCO2 çöküşü.',
              epinephrineBolus: '50 - 100 - 200 mcg IV Bolus (1:10.000 veya 1:100.000 solüsyon ile 1-2 dakikada bir titre)',
              infusionRate: '0.05 - 0.5 mcg/kg/dakika sürekli IV infüzyon',
              clinicalAlert: 'Gecikmeksizin geniş damar yolu açılmalı ve masif kristaloid sıvı ile eşzamanlı verilmelidir.'
            },
            {
              grade: 'Grade IV',
              severity: 'Kardiyak Arrest (PEA / Asistoli / VF)',
              clinicalPresentation: 'Dolaşım arresti, nabızsızlık, elektrokardiyografik arrest ritmi (en sık PEA).',
              epinephrineBolus: '1 mg IV Bolus (Standart ACLS KPR protokolü uyarınca her 3-5 dakikada bir)',
              infusionRate: 'ROSC sonrası 0.1 - 1.0 mcg/kg/dk infüzyon',
              clinicalAlert: 'Masif volüm açığı nedeniyle KPR göğüs kompresyonları sırasında basınçlı kristaloid verilmelidir.'
            }
          ],
          imAlternative: 'Eğer damaryolu düşmüş veya açılamıyorsa: Uyluğun dış yan yüzünden (Vastus lateralis) 0.5 mg (1:1.000 konsantrasyondan 0.5 mL) İntramüsküler enjeksiyon derhal uygulanmalıdır (Gluteal bölgeden emilim çok yavaştır, kaçınılmalıdır).',
          pediatricDosing: 'Pediatrik hastalarda IV Adrenalin dozu: 1 mcg/kg IV titre; Kardiyak arrestte 10 mcg/kg IV (0.1 mL/kg 1:10.000). IM alternatif: <6 yaş 0.15 mg; 6-12 yaş 0.3 mg; >12 yaş 0.5 mg IM.'
        },

        fluidAndVasopressorResuscitation: {
          title: 'Masif Kristaloid Volüm Resüsitasyonu & Vazopleji Kontrolü',
          crystalloidVolume: '20 - 30 mL/kg Dengeli Kristaloid (Plasmalyte, İzolyte, Ringer Laktat veya %0.9 SF) ilk 15-30 dakikada basınçlı infüzyon torbalarıyla verilmelidir. 70 kg hasta için ilk 30 dakikada en az 1.5 - 2 Litre kristaloid hedeflenir.',
          colloidProhibitionWarning: 'Jelatin bazlı (Gelofusine, Haemaccel) veya nişasta bazlı (HES) KOLLOİD SIVILAR KESİNLİKLE KONTRENDİKEDİR! Kolloidler kendi başlarına anafilaktoid reaksiyon tetikleyicisidir ve şoku ölümcül hale getirebilir.',
          secondaryVasopressors: [
            {
              agent: 'Noradrenalin',
              dosage: '0.05 - 0.5 mcg/kg/dakika IV infüzyon',
              indication: 'Adrenaline dirençli masif vazodilatasyon ve düşük sistemik vasküler direnç (SVR)',
              mechanism: 'Saf ve güçlü alfa-1 vazokonstriksiyon ile perfüzyon basıncını (MAP) hızla yükseltir.'
            },
            {
              agent: 'Vazopressin (AVP)',
              dosage: '0.5 - 2 Ünite IV bolus (0.03 Ü/kg) ardından 0.01 - 0.04 Ü/dk sürekli infüzyon',
              indication: 'Adrenalin ve noradrenalin taşifilaksisi; özellikle kronik ACE-I veya ARB kullanan vazoplejik hastalar',
              mechanism: 'V1 reseptörleri üzerinden katekolaminlerden bağımsız potent vazokonstriksiyon sağlar; asidozda etkinliğini korur.'
            },
            {
              agent: 'Metilen Mavisi',
              dosage: '1.5 - 2.0 mg/kg IV (100 mL %5 Dekstroz içinde 20-60 dakikada)',
              indication: 'Tüm katekolaminlere dirençli refrakter vazoplejik şok',
              mechanism: 'İndüklenebilir nitrik oksit sentaz (iNOS) ve çözünür guanilat siklazı (sGC) inhibe ederek NO kaynaklı masif vazodilatasyonu kırar.'
            },
            {
              agent: 'Glukagon',
              dosage: '1 - 5 mg IV yavaş bolus (5 dakikada), ardından 2 - 5 mg/saat sürekli infüzyon',
              indication: 'Kronik Beta-Bloker tedavisi alan ve adrenaline yanıt vermeyen hipotansif/bradikardik hastalar',
              mechanism: 'Beta-adrenerjik reseptörleri baypas ederek doğrudan miyokardiyal adenilat siklazı aktive eder; inotropik ve kronotropik etki sağlar.'
            }
          ],
          refractoryVasoplegia: 'Ağır vakalarda sağ ve sol ventrikül kontraktilitesini TEE ile değerlendirin. Derin şokta venöz göllenme ("empty heart") ve azalmış venöz dönüş temel sorundur; bu nedenle agresif volüm olmadan vazopressörler tek başına yeterli olamaz.'
        },

        ringAndMessmerScale: [
          {
            grade: 'Grade I',
            cutaneousSigns: 'Yaygın eritem, ürtiker plakları, kaşıntı, periorbital/fasiyal ödem',
            respiratorySigns: 'Yok / Normal',
            cardiovascularSigns: 'Normal kan basıncı ve nabız',
            immediateAction: 'Şüpheli ilacı kes, H1 antihistaminik (Feniramin) uygula, vital bulguları 30 dakika izle.'
          },
          {
            grade: 'Grade II',
            cutaneousSigns: 'Eritem, ürtiker, mukozal anjiyoödem (genellikle mevcuttur)',
            respiratorySigns: 'Hafif dispne, öksürük, ekspiratuar uzama, hafif stridor',
            cardiovascularSigns: 'Ilımlı hipotansiyon (SKB <%30 düşüş), taşikardi (>100/dk), aritmi',
            immediateAction: 'İlaçları kes, %100 O2, Adrenalin 10-20 mcg IV titre, kristaloid sıvı yüklemesi başlat.'
          },
          {
            grade: 'Grade III',
            cutaneousSigns: 'Bazen kütanöz bulgular vardır; ancak %30-40 VAKADA HİÇ BULGU OLMAYABİLİR!',
            respiratorySigns: 'Şiddetli bronkospazm, yüksek Ppeak (>40 cmH2O), desatürasyon, laringeal ödem',
            cardiovascularSigns: 'Masif kardiyovasküler şok, derin hipotansiyon, nabız kaybı, EtCO2 çöküşü',
            immediateAction: 'Adrenalin 50-100-200 mcg IV bolus + 0.1-0.5 mcg/kg/dk infüzyon, 20-30 mL/kg kristaloid, Trendelenburg.'
          },
          {
            grade: 'Grade IV',
            cutaneousSigns: 'Cilt soluk, soğuk, siyanotik veya kül rengi',
            respiratorySigns: 'Ventilasyon yapılamaz (apne / şiddetli direnç)',
            cardiovascularSigns: 'Kardiyak Arrest: Nabızsız Elektriksel Aktivite (PEA), Asistoli, Nabızsız VT/VF',
            immediateAction: 'Derhal KPR başlat, Adrenalin 1 mg IV puşe (3-5 dk ara ile), masif sıvı infüzyonu, ECMO ekibini uyar.'
          }
        ],

        tryptaseAndInvestigationProtocol: {
          title: 'Serum Triptaz Tanı Protokolü & İmmünolojik Araştırma (NAP6 Standartları)',
          firstSampleTiming: '1. Kan Örneği (Pik Triptaz): Reaksiyonun başlangıcından itibaren 30 - 120. dakikalar arasında (en geç 4. saat içinde) alınmalıdır. Bu örnek mast hücresi degranülasyonunun tepe seviyesini gösterir.',
          secondSampleTiming: '2. Kan Örneği (Bazal Triptaz): Reaksiyondan en az 24 saat sonra (veya taburculuk öncesi poliklinik kontrolünde) alınmalıdır. Bu örnek hastanın kendi fizyolojik bazal mast hücresi yükünü belirler.',
          diagnosticFormula: 'Pozitif Anafilaksi Doğrulama Formülü: Pik Serum Triptazı ≥ (1.2 x Bazal Serum Triptazı) + 2 mcg/L (Örn: Bazal 5 mcg/L olan hastada pik triptazın ≥ 8 mcg/L olması reaksiyonu kanıtlar).',
          culpritAgentsBreakdown: [
            {
              category: 'Nöromüsküler Blokerler (NMBAs)',
              prevalence: '%50 - 60',
              commonDrugs: 'Rokuronyum (en sık), Süksinilkolin, Atrakuryum',
              riskNotes: 'Kuaterner amonyum epitopları nedeniyle daha önce hiç ilaç almamış bireylerde bile kozmetik/temizlik kimyasalları çapraz duyarlılığıyla ilk dozda reaksiyon gelişebilir.'
            },
            {
              category: 'Antibiyotikler',
              prevalence: '%15 - 20',
              commonDrugs: 'Sefazolin, Ampisilin-Sulbaktam, Vankomisin',
              riskNotes: 'Sefazolinin R1 yan zinciri penisilinlerden farklıdır; penisilin alerjisi olanlarda sefazolin çoğunlukla tolere edilirken sefazolin alerjisi izole olabilir.'
            },
            {
              category: 'Antiseptikler',
              prevalence: '%8 - 10',
              commonDrugs: 'Klorheksidin (Hibiscrub, Biocid, kaplı kateterler)',
              riskNotes: 'Sinsi tetikleyicidir; idrar sondası kayganlaştırıcı jellerinde ve santral kateter kaplamalarında bulunur; reaksiyon cerrahi başladıktan 20-40 dk sonra çıkabilir.'
            },
            {
              category: 'Cerrahi Boyalar',
              prevalence: '%5 - 8',
              commonDrugs: 'Patent Blue V, İsosülfan Mavi, Metilen Mavisi',
              riskNotes: 'Meme kanseri / lenf haritalamasında subkutan enjeksiyondan 15-45 dakika sonra mavi cilt ve masif hipotansiyonla ortaya çıkar.'
            },
            {
              category: 'Doğal Kauçuk Lateks',
              prevalence: '%3 - 5',
              commonDrugs: 'Cerrahi eldivenler, Foley sondalar, elastik bantlar',
              riskNotes: 'Lateks temasından 30-60 dakika sonra mukozal emilimle reaksiyon başlar. Çoklu cerrahi ve spina bifidalı hastalar yüksek risklidir.'
            }
          ],
          sugammadexRescueInRocuronium: 'Rokuronyuma bağlı anafilakside yüksek doz Sugammadeks (16 mg/kg) verilmesi, dolaşımdaki serbest rokuronyumu hızla enkapsüle ederek IgE antikorlarının bağlanmasını ve mast hücre uyarısını sonlandırabilir.',
          allergyClinicReferral: 'Olay sonrası epikrizde anestezi indüksiyonunda ve cerrahide kullanılan tüm ilaçlar, solüsyonlar, antiseptikler, lateks ve cerrahi boyalar tam saatleriyle listelenmelidir. Hasta reaksiyondan 4 - 6 hafta sonra Deri Prik Testi, İntradermal Test ve Spesifik IgE incelemesi için Alerji-İmmünoloji Kliniğine sevk edilmelidir.'
        }
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Anafilaksi; mast hücreleri ve bazofillerin yüzeyindeki yüksek afiniteli IgE reseptörlerinin (FcεRI) önceden duyarlanmış spesifik antijenler tarafından çapraz bağlanması (Tip I immünolojik aşırı duyarlık) veya MRGPRX2 reseptörü / kompleman aktivasyonu (non-IgE aracılı psödoalerji) yoluyla hücre içi kalsiyum akışını tetiklemesi ve sitoplazmik granüllerin saniyeler içinde ekzositozla dolaşıma boşalmasıdır.',
      stepsTitle: 'Mediyatör Degranülasyonu, Masif Kapiller Kaçak ve Kounis Sendromu',
      flowType: 'cellular-systemic',
      cascadeSteps: [
        {
          phase: 'Mast Hücresi & Bazofil Degranülasyonu',
          mechanism: 'Antijenin IgE-FcεRI reseptörlerine çapraz bağlanması veya MRGPRX2 doğrudan uyarımı hücre içine masif Ca²⁺ akımı başlatır; sitoplazmik granüllerdeki pre-forme mediyatörler (Histamin, Triptaz, Karboksipeptidaz A3) ve sekonder lökotrienler (LTC4/D4) saniyeler içinde ekzositozla dolaşıma boşalır.',
          badge: 'EKSEN 1: MEDİYATÖR FIRTINASI'
        },
        {
          phase: 'Masif NO Vazoplejisi & Kapiller Kaçak ("Empty Heart")',
          mechanism: 'Histamin ve PAF endotelyal nitrik oksit (NO) sentezini patlatır; sistemik vasküler direnç (SVR) hızla çöker. Endotel hücre bağlantıları çözülerek intravasküler plazmanın %35-50si dakikalar içinde interstisyel alana kaçar; santral venöz dolum sıfırlanır ("boş kalp" tablosu).',
          badge: 'EKSEN 2: VAZOMOTOR FELÇ & KAÇAK'
        },
        {
          phase: 'Kounis Sendromu (Alerjik Koroner Vazospazm & İskemi)',
          mechanism: 'Lokal koroner damar yatağındaki kardiyak mast hücrelerinin degranülasyonu epikardiyal koroner arterlerde şiddetli vazospazma (Tip 1 Kounis) veya var olan aterom plağının rüptürüne (Tip 2 Kounis) yol açarak EKGde ST elevasyonu ve kardiyojenik çöküş üretir.',
          badge: 'EKSEN 3: KOUNIS MİYOKARD İSKEMİSİ'
        }
      ],
      summaryText: 'Özetle anafilaksi; masif vazodilatasyon, dramatik intravasküler volüm kaybı, bronkokonstriksiyon ve miyokardiyal disfonksiyonun bir araya geldiği, sadece Adrenalinin vazokonstriktör, inotropik, bronkodilatör ve mast hücresi membran stabilize edici alfa-1/beta-1/beta-2 reseptör etkileriyle geri çevrilebilen akut dolaşım felcidir.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'Açıklanamayan ani hipotansiyon (SKB <%50 düşüş) veya efedrin/sıvı tedavisine yanıtsızlık',
        'Ventilatörde ani tepe inspiratuar basınç artışı (Ppeak >40-50 cmH2O) ve tidal hacim düşüşü',
        'Kapnografide ani EtCO2 düşüşü veya dalga formu kaybı (kardiyak debi ve akciğer perfüzyonunun kesilmesi)',
        'Sinüs taşikardisi (>120-140/dk) veya derin hipovolemiye bağlı paradoksal bradikardi'
      ],
      progressingSigns: [
        'Dinlemekle bilateral yaygın ekspiratuar wheezing veya solunum seslerinin tamamen kaybolması ("sessiz akciğer")',
        'Cerrahi örtülerin altında veya açık alanlarda yaygın flushing (kızarıklık), ürtiker döküntüleri',
        'Dudak, dil, uvula ve yüzde belirgin anjiyoödem (laringoskopide glottik girişin ödemle kapanması)',
        'Periferik nabızların kaybolması, kapiller dolum zamanının >3 saniye olması, hipotansiyonun şoka ilerlemesi'
      ],
      lateSigns: [
        'Kardiyak Arrest: Nabızsız Elektriksel Aktivite (PEA) veya asistoli',
        'EKGde ST segment elevasyonu veya çökmesi, aritmiler (Kounis Sendromu)',
        'Ağır mikst metabolik ve respiratuar asidoz, derin laktat yüksekliği (>5-10 mmol/L)',
        'Masif akciğer ödemi, pembe köpüklü sekresyon ve refrakter anoksi'
      ],
      specialAlertTitle: 'Klinik Tuzak: Cilt Bulgusu Yokluğu Anafilaksiyi Asla Ekarte Ettirmez!',
      specialAlertContent: 'Genel anestezi altındaki şiddetli anafilaksi olgularının yaklaşık üçte birinde (%30-40) başlangıçta CİLT BULGUSU (eritem, ürtiker) GÖRÜLMEZ! Ağır vazokonstriksiyon ve şok cilt perfüzyonunu azalttığı için döküntüler ancak resüsitasyon başarılı olup perfüzyon geri geldiğinde ortaya çıkabilir. Ani hipotansiyon ve tepe basınç fırlaması görüldüğünde cilt döküntüsü beklemeden derhal anafilaksi protokolü başlatılmalıdır!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Preoperatif vizitte hastanın geçmiş cerrahi ve anestezi öyküsü, ilaç alerjileri, gıda alerjileri (kivi, muz, avokado lateks çapraz reaktivitesi!) ayrıntılı sorgulanmalıdır.',
        'Önceki anestezi sırasında açıklanamayan hipotansiyon, bronkospazm veya yoğun bakım yatışı öyküsü olan hastalarda önceki ameliyat raporları ve alerji testleri mutlaka incelenmelidir.',
        'Kanıtlanmış nöromüsküler bloker alerjisi olan hastalarda tüm NMBAlar potansiyel çapraz reaktiftir; mümkünse genel anestezide kas gevşeticisiz teknik (Remifentanil/Propofol) veya rejyonal anestezi tercih edilmelidir.',
        'Penisilin alerjisi öyküsü olanlarda sefazolin çoğunlukla güvenlidir; ancak anafilaksi öyküsü olan şiddetli olgularda alternatif profilaksi (Vankomisin / Siprofloksasin) düşünülmelidir.'
      ],
      anesthesiaMachinePreparation: {
        title: 'Ameliyathane Anafilaksi Acil Kiti & Hazırlık Standartları',
        steps: [
          'Tüm ameliyathanelerde ve anestezi odalarında sulandırılmış Adrenalin hazır bulundurulmalıdır (10 mcg/mL ve 100 mcg/mL enjektörler).',
          'Basınçlı sıvı infüzyon torbaları ve en az 2-3 litre dengeli kristaloid sıvı anında erişilebilir olmalıdır.',
          'Geniş lümenli IV kanüller (14G, 16G) ve santral kateter setleri hazır tutulmalıdır.',
          'Tanısal triptaz kan tüpleri (EDTA veya düz tüp) laboratuvar istem formuyla birlikte acil dolabında bulunmalıdır.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Lateks Alerjili Hasta Protokolü: Hasta günün ilk vakası olarak ameliyathaneye alınmalı; ameliyathaneden tüm lateks eldivenler, kateterler ve kauçuk ekipmanlar uzaklaştırılmalı; kapıya "LATEKS ALERJİSİ - LATEKSSİZ ODA" uyarısı asılmalıdır.',
        'Klorheksidin Duyarlılığı: Klorheksidinli cilt temizleyiciler, idrar sondası jelleri ve antimikrobiyal kaplı CVC/arter kateterleri kesinlikle kullanılmamalı; Povidon İyot tercih edilmelidir.',
        'İlaç Uygulama Güvenliği: Profilaktik antibiyotikler indüksiyondan önce yavaş infüzyonla verilmeli; cerrahi koter başlamadan önce infüzyon tamamlanmalıdır (böylece reaksiyon cerrahi başlangıçla karışmaz).'
      ],
      cartTitle: 'İntraoperatif Anafilaksi Acil Kiti & İlaç Listesi:',
      cartChecklist: [
        'Adrenalin (Epinefrin 1 mg/mL ampul x 10 adet)',
        'Noradrenalin (4 mg / 4 mL ampul x 2 adet)',
        'Vazopressin (20 Ünite flakon x 2 adet)',
        'Sugammadeks (Bridion 200 mg ve 500 mg flakonlar)',
        'Metilprednizolon (Prednol 40 mg ve 250 mg ampul)',
        'Feniramin Maleat (Avil 45.5 mg ampul x 4 adet)',
        'Magnezyum Sülfat (%15 10 mL ampul x 2 adet)',
        'Salbutamol Ölçülü Doz İnhaler ve Ventilatör ETT Adaptörü',
        'Metilen Mavisi (%1 ampul)',
        'Glukagon (1 mg liyofilize flakon)',
        'Serum Triptaz Örnek Tüpleri ve İmmünoloji İstem Formu',
        'Basınçlı İnfüzyon Manşonu ve Geniş Lümenli Sıvı Setleri'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'Grade II reaksiyon geçiren hastalar en az 6-12 saat; Grade III ve IV reaksiyon geçiren, adrenalin infüzyonu veya KPR uygulanan tüm hastalar en az 24 saat 3. Seviye Yoğun Bakımda takip edilmelidir.',
      recurrenceRate: 'Olguların %5-20sinde başlangıçtaki başarılı resüsitasyondan sonraki 1 ila 72 saat içinde (en sık 4-8. saatlerde) antijen maruziyeti olmaksızın BİFAZİK ANAFİLAKSİ reaksiyonu gelişebilir.',
      recurrenceRiskBadge: 'İLK 24 SAATTE BİFAZİK ŞOK VE HAVA YOLU ÖDEMİ TEKRARI RİSKİ',
      maintenanceTherapy: 'Hemodinamik stabilite sağlandıktan sonra adrenalin infüzyonu kademeli azaltılarak kesilir. Bifazik reaksiyonu önlemek için Metilprednizolon (40-80 mg IV 6-8 saatte bir) ve H1 blokör idamesi 24-48 saat sürdürülür. Ekstübasyon kararı öncesi mutlaka kaf kaçak testi (cuff leak test) yapılarak laringeal ödemin gerilediği doğrulanmalıdır.',
      monitoringParameters: [
        'İnvaziv Arter Kan Basıncı (dakikalık MAP ve nabız basıncı takibi)',
        'Sürekli EKG monitörizasyonu (ST-T değişiklikleri, Kounis sendromu iskemi takibi)',
        'Seri Arter Kan Gazı: Laktat klirensi, pH, baz açığı ve oksijenasyon indeksi (PaO2/FiO2)',
        'Kardiyak Enzimler (Troponin I/T) ve 12 Derivasyonlu EKG (miyokardiyal hasar kontrolü)',
        'Serum Triptaz Kinetiği (24. saat bazal kan örneği alınması)',
        'Saatlik İdrar Çıkışı takibi (akut tübüler nekroz ve hipoperfüzyon takibi)'
      ],
      expectedComplications: [
        'Post-Arrest Hipoksik İskemik Ensefalopati (uzamış arrest veya refrakter hipoksiye sekonder)',
        'Kounis Sendromu & Miyokard İnfarktüsü (koroner vazospazma bağlı sol ventrikül yetmezliği)',
        'Laringeal ve Glottik Ödem (erken ekstübasyonda akut post-op obstrüksiyon riski)',
        'Non-Kardiyojenik Pulmoner Ödem / ARDS (kapiller kaçış ve endotel hasarı)',
        'Akut Böbrek Hasarı (derin ve uzamış hipotansiyona bağlı prerenal/renal yetmezlik)'
      ],
      definitiveDiagnosticTesting: [
        { testName: 'Serum Triptaz Düzeyi (1. ve 2. Örnek)', description: 'Akut pik triptaz (30-120 dk) ve bazal triptaz (24 st) düzeyleri arasındaki orantı ile anafilaksinin immünolojik doğrulanması.' },
        { testName: 'Deri Prik ve İntradermal Testler', description: 'Reaksiyondan 4-6 hafta sonra anestezi sırasında kullanılan tüm ilaçlar ve alternatifleri ile alerji kliniğinde uygulanan testler.' },
        { testName: 'Spesifik IgE Ölçümü (In Vitro)', description: 'Rokuronyum, Süksinilkolin, Sefazolin, Penisilin, Lateks ve Klorheksidin için spesifik IgE antikorlarının kanda araştırılması.' },
        { testName: 'Bazofil Aktivasyon Testi (BAT)', description: 'Deri testlerinin şüpheli kaldığı durumlarda flow sitometri ile in vitro hücresel alerjen yanıtının tespiti.' }
      ],
      geneticCounseling: 'Familyal mastositoz veya herediter alfa-triptazemi (HαT) şüphesi olan bazal triptazı >11.4 mcg/L saptanan bireylere TPSAB1 genetik kopya sayısı taraması ve hematoloji konsültasyonu önerilir.',
      familyScreening: 'Herediter alfa-triptazemi veya mastositoz kuşkusu olan hastaların birinci derece akrabalarında bazal triptaz düzeyi taranmalıdır.',
      prognosisSummary: 'Erken fark edilen, volatil ajanları hemen kesilen, ilk dakikalarda İNTRAVENÖZ ADRENALİN uygulanan ve agresif kristaloid sıvı verilen intraoperatif anafilaksi vakalarında prognoz mükemmeldir (>%90 tam iyileşme). Mortalite neredeyse her zaman Adrenalinin gecikmesine, kolloid kullanımına veya hava yolunun kaybedilmesine bağlıdır.'
    },

    // 9) High-Yield Klinik Bilgiler
    highYieldPearls: [
      {
        title: 'Cilt Bulgusu Bekleme Yanılgısı',
        takeaway: 'Genel anestezi altındaki hastaların %30-40ında CİLTTE KIZARIKLIK VEYA ÜRTİKER OLMAZ! Şiddetli vazomotor şok ve hipotansiyon kutanöz kan akımını kestiği için tek bulgu ani dirençli hipotansiyon veya tepe basınç artışıdır.',
        category: 'Tuzak'
      },
      {
        title: 'Birinci Basamak Hayat Kurtarıcı: Yalnızca Adrenalin',
        takeaway: 'Kortizon ve antihistaminik anafilaksiyi tedavi etmez, hayat kurtarmaz! Tek birinci basamak hayat kurtarıcı ilaç İNTRAVENÖZ ADRENALİNDİR; gecikmeksizin titre edilmelidir.',
        category: 'Kritik Doz'
      },
      {
        title: 'Kolloid Sıvı Kullanımı Kesinlikle Yasaktır',
        takeaway: 'Masif volüm açığını kapatmak için asla Jelatin (Gelofusine vb.) veya Dekstran vermeyin; kolloidler kendileri masif degranülasyon tetikleyicisidir.',
        category: 'Tuzak'
      },
      {
        title: 'Rokuronyum Anafilaksisinde Sugammadeks 16 mg/kg',
        takeaway: 'Rokuronyuma bağlı kollapsta yüksek doz Sugammadeks (16 mg/kg) dolaşımdaki antijeni sarıp epitopları maskeleyerek krizden çıkış sağlayabilir.',
        category: 'Ezber Bozan'
      },
      {
        title: 'Kounis Sendromunu Unutmayın',
        takeaway: 'Anafilaksi sırasında koroner arter spazmı gelişerek EKGde ST elevasyonu ve kardiyojenik çöküş görülebilir. Tedavide primer odak yine anafilaksinin hızla resüsite edilmesidir.',
        category: 'Sınav / Klinik Notu'
      }
    ],

    // 10) Kanıta Dayalı Kaynaklar
    references: [
      {
        authors: 'Kempker RR, Hunter JM, Cook TM, et al. (NAP6 Steering Group)',
        title: 'Anaesthesia, surgery, and life-threatening allergic reactions: report and findings of the Royal College of Anaesthetists 6th National Audit Project (NAP6).',
        journal: 'British Journal of Anaesthesia. 2018;121(1):159-171.',
        year: '2018',
        relevance: 'Perioperatif anafilakside altın standart epidemiyolojik çalışma; tetikleyici ajanlar, triptaz protokolü ve mortalite analizleri.'
      },
      {
        authors: 'Garvey LH, Dewachter P, Hepner DL, et al.',
        title: 'Management of suspected immediate perioperative allergic reactions: an international consensus statement.',
        journal: 'British Journal of Anaesthesia. 2019;123(1):e50-e64.',
        year: '2019',
        relevance: 'Uluslararası anestezi anafilaksi konsensus kılavuzu; adrenalin titrasyon şemaları ve refrakter vazopleji yönetimi.'
      },
      {
        authors: 'Ring J, Messmer K.',
        title: 'Incidence and severity of anaphylactoid reactions to colloid solutions.',
        journal: 'The Lancet. 1977;309(8010):466-469.',
        year: '1977',
        relevance: 'Tüm dünyada kabul gören Ring & Messmer 4 dereceli anafilaksi klinik sınıflandırmasının orijinal kaynağı.'
      },
      {
        authors: 'Cardona V, Ansotegui IJ, Ebisawa M, et al.',
        title: 'World Allergy Organization Anaphylaxis Guidance 2020.',
        journal: 'World Allergy Organization Journal. 2020;13(10):100472.',
        year: '2020',
        relevance: 'WAO küresel anafilaksi kılavuzu; epinefrin erken kullanımı, pozisyonlandırma ve triptaz tanı standartları.'
      }
    ]
  },

  'acls': {
    id: 'acls',
    // 1) Başlık
    title: 'Perioperatif Kardiyak Arrest & ACLS Protokolü',
    subTitle: 'Ameliyathane İçi İleri Yaşam Desteği (AHA / ERC / ASA) & Geri Döndürülebilir Nedenler Yönetimi',
    codeColor: 'red',
    severityBadge: 'KOD MAVİ / KIRMIZI · ANINDA KPR VE DEFİBRİLASYON',
    keyCallout: 'Tüm anestezikleri (volatil/propofol) derhal kapatın, %100 O2 verin (hiperventilasyondan kaçının: 10 soluk/dk), yüksek kaliteli göğüs kompresyonuna (<10 sn kesinti) başlayın ve şoklanabilir ritimde (VF/pVT) gecikmeden 200 J bifazik defibrilasyon uygulayın!',
    quickCalculatorType: 'acls',

    // 2) Tanımlama ve Giriş
    introduction: {
      definition: 'Perioperatif kardiyak arrest; anestezi indüksiyonu, idamesi, cerrahi girişim veya erken derlenme (PACU) sürecinde gelişen, ani mekanik kalp aktivitesi ve sistemik dolaşım durmasıdır. Genel toplum arrestlerinden farklı olarak ameliyathanede tanıklıdır, hasta monitörizedir ve çoğu vaka hipoksi, hipovolemi, vagal refleks, ilaç toksisitesi veya emboli gibi hızla geri döndürülebilir iyatrojenik nedenlere bağlıdır.',
      epidemiology: 'Non-kardiyak cerrahilerde perioperatif kardiyak arrest insidansı 10.000 anestezide yaklaşık 4 - 7 olgu arasındadır (pediatride ~1.4 - 2.9 / 10.000; ASA III-V ve acil cerrahilerde 10 kat daha sıktır). Ameliyathane içi arrestlerde Non-Şoklanabilir ritimler (PEA ve Asistoli) olguların ~%70-80ini oluştururken, VF/pVT yaklaşık %20-30 oranında görülür.',
      triggers: [
        'Masif Cerrahi Kanama & Gizli Hipovolemi (En sık perioperatif PEA/arrest nedeni)',
        'Hava Yolu Kaybı / Hipoksi / Özofageal Entübasyon / CICO veya Oto-PEEP',
        'Anestezi İlaçlarına Bağlı Kardiyovasküler Kollaps (Propofol/volatil doz aşımı, yüksek spinal/epidural blok)',
        'Anafilaktik Şok (Rokuronyum, Sefazolin, Klorheksidin) veya LAST (Bupivakain/Lokal anestezik toksisitesi)',
        'Majör Embolik Olaylar (Pulmoner Emboli, Venöz/Paradoksal Hava Embolisi, Kemik Çimentosu Sendromu)',
        'Şiddetli Vagal Refleks (Periton çekilmesi, okülokardiyak refleks, pnömoperiton insüflasyonu, laringoskopi)',
        'Elektrolit Fırtınaları (Masif transfüzyon veya süksinilkolin sonrası Hiperkalemi; Hipokalsemi)'
      ],
      safeAgents: [
        'Adrenalin (Epinefrin): 1 mg IV/IO (3-5 dk arayla; şoklanamaz ritimde İLK ANDA, şoklanabilirde 2. şok sonrası)',
        'Amiodaron: 300 mg IV/IO (3. şok sonrası refrakter VF/pVT); 2. doz 150 mg IV/IO',
        'Lidokain (Amiodaron yoksa/alternatif): 1.0 - 1.5 mg/kg IV/IO, ardından 0.5 - 0.75 mg/kg',
        'Kalsiyum Klorür (%10 CaCl2 10-20 mL) veya Kalsiyum Glukonat (Hiperkalemi / Masif Transfüzyon Hipokalsemisi)',
        'Sodyum Bikarbonat (1 mEq/kg IV — yalnızca hiperkalemi, TCA/sodyum kanal toksisitesi veya ağır metabolik asidozda)',
        'Dengeli Kristaloid / Kan Ürünleri (Hemorajik/Hipovolemik PEAda basınçlı infüzyon)'
      ],
      mortalityStats: 'Hastane dışı arrestlerin aksine tanıklı ve tam monitörize ortam avantajı sayesinde ameliyathane içi kardiyak arrestlerde ROSC (spontan dolaşımın geri dönüşü) oranı %50-70, taburculuk sağkalımı ise %30-50 civarındadır. Sağkalımı belirleyen temel faktörler 2 dakika içinde defibrilasyon, kesintisiz KPR ve altta yatan H/T nedeninin düzeltilmesidir.',
      clinicalUrgency: 'Ameliyathanede invaziv arter trasesinin düzleşmesi, EtCO2 dalgasının ani çöküşü (<10 mmHg) veya karotis/femoral nabzın 10 saniye içinde alınamaması durumunda tereddütsüz KPR başlatılmalıdır. Şüphe varsa "nabız ararken vakit kaybetme, basıya başla" kuralı geçerlidir.'
    },

    // 3) Tanı
    diagnosis: {
      overview: 'Ameliyathane hastasında EKG monitörü sıklıkla yanıltıcı "sahte sinüs" ritmi (Nabızsız Elektriksel Aktivite - PEA) gösterebilir. Bu nedenle tanı EKG ile değil, mekanik dolaşımın durduğunu gösteren üçlü doğrulama (Arter trasesi düzleşmesi + EtCO2 çöküşü + 10 saniyelik santral nabız yokluğu) ile konur.',
      clinicalCriteria: [
        'Santral nabzın (Karotis veya Femoral) en fazla 10 saniye içinde kesin olarak palpe edilememesi',
        'İnvaziv arter kateteri varsa arteriyel pulsatil dalga formunun tamamen düzleşmesi (MAP < 20-30 mmHg)',
        'Entübe hastada EtCO2 değerinin veya kapnografi dalgasının ani olarak <10 mmHg altına çökmesi (devre ayrılması ekarte edildikten sonra)',
        'SpO2 pletismografik nabız dalgasının tamamen kaybolması',
        'EKG monitöründe Ventriküler Fibrilasyon (VF), Nabızsız Ventriküler Taşikardi (pVT), Asistoli veya organize ritme rağmen mekanik nabızsızlık (PEA)'
      ],
      gradingScaleTitle: 'Perioperatif Arrest Ritim Sınıflandırması ve İlk Tedavi Yönelimi',
      gradingScaleSource: 'AHA 2020/2025 & ERC Perioperative Cardiac Arrest Guidelines',
      larachScale: [
        {
          category: 'Ventriküler Fibrilasyon (VF)',
          points: 'ŞOKLANABİLİR',
          description: 'Düzensiz, kaotik, QRS kompleksi seçilemeyen dalga formu. En sık koroner iskemi, elektrolit bozukluğu (hiperkalemi/hipokalemi), ilaç proaritmisinden kaynaklanır. DERHAL 200 J BIFAZİK DEFİBRİLASYON!'
        },
        {
          category: 'Nabızsız Ventriküler Taşikardi (pVT)',
          points: 'ŞOKLANABİLİR',
          description: 'Geniş QRSli, hızlı (>150/dk), düzenli veya polimorfik (Torsades de Pointes) ritim ve eşlik eden nabızsızlık. Monomorfikse DERHAL DEFİBRİLASYON; Torsades ise ek olarak 2 g IV Magnezyum Sülfat.'
        },
        {
          category: 'Nabızsız Elektriksel Aktivite (PEA)',
          points: 'ŞOKLANAMAZ',
          description: 'EKGde organize elektriksel aktivite (dar/geniş kompleks) görülmesine rağmen arteriyel nabız veya mekanik kalp atımı yoktur. Ameliyathanedeki en sık arrest ritmidir; mutlaka geri döndürülebilir 5H-5T (hipovolemi, tansiyon pnömotoraks, tamponad, PE) aranmalıdır!'
        },
        {
          category: 'Asistoli / İleri Agonal Ritim',
          points: 'ŞOKLANAMAZ',
          description: 'Düz EKG çizgisi (mutlaka kablo/elektrot bağlantısını ve EKG kazancını iki derivasyonda teyit edin; ince VF ile karıştırılmamalıdır). Şok verilmez; kesintisiz KPR + hemen 1 mg IV Adrenalin + nedenin düzeltilmesi.'
        }
      ],
      larachInterpretation: 'Şoklanabilir ritimlerde (VF/pVT) her 1 dakikalık defibrilasyon gecikmesi sağkalımı %7-10 azaltır. Şoklanamaz ritimlerde (PEA/Asistoli) ise şok KESİNLİKLE verilmez; temel kurtarıcı yüksek kaliteli KPR, erken Adrenalin (1 mg IV) ve etyolojik nedenin (kanama, pnömotoraks, anafilaksi, yüksek spinal vb.) hızla tedavisidir.',
      rhythmEcgGallery: [
        {
          rhythmName: 'Ventriküler Fibrilasyon (VF)',
          badge: 'ŞOKLANABİLİR · 200 J BİFAZİK',
          shockable: true,
          imagePath: '/ecg/vf_real.jpg',
          ecgFeatures: 'Kaotik, düzensiz, P dalgası ve QRS kompleksi seçilemeyen fibrilasyon dalgaları (HR: ---).',
          caption: 'Kaba veya ince amplitüdlü olabilir. Ritim görülür görülmez gecikmeden defibrilasyon uygulanır; şok sonrası nabız beklemeden 2 dk KPRye geçilir.',
          sourceLicense: 'Wikimedia Commons · Derivasyon II · Public Domain'
        },
        {
          rhythmName: 'Nabızsız Ventriküler Taşikardi (pVT)',
          badge: 'ŞOKLANABİLİR · 200 J BİFAZİK',
          shockable: true,
          imagePath: '/ecg/vt_real.jpg',
          ecgFeatures: 'Geniş QRS kompleksli (>120 ms), hızlı (>150/dk), düzenli monomorfik (veya Torsades de Pointes) taşikardi.',
          caption: 'Monomorfik pVTde DERHAL senkronize olmayan yüksek enerjili defibrilasyon (200 J bifazik) yapılır. Polimorfik VT (Torsades) ise ek olarak 2 g IV MgSO4 verilir.',
          sourceLicense: 'Wikimedia Commons · Derivasyon II · Public Domain'
        },
        {
          rhythmName: 'Nabızsız Elektriksel Aktivite (PEA)',
          badge: 'ŞOKLANAMAZ · NABIZ YOK / ARTER DÜZ',
          shockable: false,
          imagePath: '/ecg/pea_real.jpg',
          ecgFeatures: 'EKGde organize elektriksel ritim (sinüs/supraventriküler veya geniş kompleks) görülür ANCAK mekanik nabız ve arter trasesi YOKTUR.',
          caption: 'Ameliyathanede en sık görülen arrest formudur ("Sahte Sinüs" tuzağı!). ŞOK VERİLMEZ; derhal KPR + erken Adrenalin 1 mg IV + 5H-5T (kanama, pnömotoraks, tamponad, PE) tedavisi!',
          sourceLicense: 'Wikimedia Commons · Derivasyon II · Public Domain'
        },
        {
          rhythmName: 'Asistoli / İleri Agonal Ritim',
          badge: 'ŞOKLANAMAZ · KPR + ERKEN ADRENALİN',
          shockable: false,
          imagePath: '/ecg/asystole_real.jpg',
          ecgFeatures: 'Ventriküler depolarizasyon yokluğu ve izoelektrik düz çizgi (veya tek tük geniş, düşük hızlı agonal kompleksler).',
          caption: 'Düz çizgi görüldüğünde 2 farklı derivasyonda kablo bağlantısını ve EKG kazancını (gain) kontrol ederek ince VFyi ekarte edin. Şok kontrendikedir; kesintisiz KPR + Adrenalin 1 mg IV!',
          sourceLicense: 'Wikimedia Commons · Derivasyon II · Public Domain'
        }
      ],
      differentialDiagnosis: [
        {
          condition: 'EKG Elektrot / Kablo Ayrılması veya Artefakt',
          differentiatingFactors: 'Hasta uyanıksa konuşur veya EtCO2 ve SpO2 pletismograf dalgası tamamen normaldir. Düz EKG görüldüğünde önce kapnografi ve SpO2 kontrol edilmelidir.'
        },
        {
          condition: 'Solunum Devresi Ayrılması veya Özofageal Entübasyon',
          differentiatingFactors: 'EtCO2 sıfıra düşer ancak başlangıçta nabız ve arter basıncı normaldir; düzeltilmezse dakikalar içinde hipoksik PEA/asistoliye ilerler.'
        },
        {
          condition: 'İnvaziv Arter Hattında Sönümlenme (Damping) / Pıhtı',
          differentiatingFactors: 'Arter trasesi düzleşir ancak EKG, EtCO2 ve SpO2 dalgası normaldir; karotis nabzı palpe edilir.'
        },
        {
          condition: 'İnce Ventriküler Fibrilasyon (Fine VF) vs Asistoli',
          differentiatingFactors: 'Düşük amplitüdlü VF asistoli sanılabilir. EKG amplitüd (gain) artırılmalı ve iki farklı derivasyondan kontrol edilmelidir; şüphe varsa asistoli gibi KPR + Adrenalin ile perfüzyon artırılır.'
        }
      ]
    },

    // 4) Acile Spesifik Akut Yönetimi - Kriz Yönetimi
    crisisManagement: {
      hotlineInfo: 'Ameliyathane İçi KOD MAVİ / EKİP ÇAĞRISI: Defibrilatörü, Acil Arabasını ve varsa POCUS/TEE probunu anında odaya isteyin; cerraha işlemi durdurmasını ve gerekirse kompresyona uygun pozisyona almasını söyleyin!',
      coreAlgorithm: [
        {
          stepNumber: 1,
          title: 'Tanı Koy, Yardım Çağır ve Cerrahiyi Durdur',
          action: 'Nabız/Arter/EtCO2 kaybını (<10 sn) doğrula. Ekibi ve defibrilatörü çağır. Cerraha majör kanama varsa geçici kompresyon/klemp koymasını, batın/laparoskopideyse PNÖMOPERİTONU (CO2 İNSÜFLASYONUNU) DERHAL BOŞALTMASINI söyleyin.',
          criticalNote: 'Pnömoperiton karın içi basıncı artırarak venöz dönüşü sıfırlar; laparoskopik arrestte gaz derhal boşaltılmadan KPR efektif olamaz!',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 2,
          title: 'Anestezikleri Kapat & %100 Oksijenle Kontrollü Ventile Et',
          action: 'Tüm volatil ajanları (Sevofluran/Desfluran/İzofluran), N2O ve propofol/remifentanil infüzyonlarını DERHAL kapatın. Taze gaz akımını 10-15 L/dk %100 O2 yapın. Entübeyse solunum hızını 10/dk (6 sn’de 1 soluk), tidal volümü 6-7 mL/kg ayarlayın.',
          criticalNote: 'Hiperventilasyon KESİNLİKLE YASAKTIR! Hızlı/derin solutma intratorasik basıncı artırıp kalbe venöz dönüşü keserek serebral ve koroner perfüzyonu öldürür.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 3,
          title: 'Yüksek Kaliteli Göğüs Kompresyonuna Başla (C-A-B)',
          action: 'Sert zeminde (ameliyat masası sırt tahtası altında kilitli, ayak seviyesi sabit), 100 - 120 bası/dk hızında, 5 - 6 cm derinlikte, tam göğüs geri çekilmesine (recoil) izin vererek ve kesintileri <10 saniye tutarak kompresyon yapın. Her 2 dakikada bir kompresör değiştirin.',
          criticalNote: 'Eğer hasta Prone (yüzüstü) pozisyondaysa ve supin çevirmek >1-2 dk gecikecekse derhal skapulalar arası TERS (Posterior) KPR başlatın ve supin hazırlığı yapın.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 4,
          title: 'Ritmi Analiz Et: Şoklanabilir (VF/pVT) vs Şoklanamaz (PEA/Asistoli)',
          action: 'Defibrilatör pedleri/kaşıkları gelir gelmez ritim kontrolü (<10 sn) yapın. VF veya Nabızsız VT ise DERHAL 150-200 J Bifazik (monofazik 360 J) ŞOK verin ve nabız bakmadan anında 2 dakika KPRye devam edin. PEA veya Asistoli ise ŞOK VERMEYİN, KPRye devam edin.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 5,
          title: 'Vazopresör: Adrenalin 1 mg IV/IO (Zamanlama Farkına Dikkat!)',
          action: 'Şoklanamaz ritimde (PEA/Asistoli): İLK ANDA (0. dakikada) Adrenalin 1 mg IV/IO puşe edin. Şoklanabilir ritimde (VF/pVT): 2. şoktan hemen sonra Adrenalin 1 mg IV/IO puşe edin. Her iki yolda da 3 - 5 dakikada bir tekrarlayın (20 mL SF flush + ekstremite elevasyonu).',
          criticalNote: 'İSTİSNALAR: Lokal Anestezik Toksisitesinde (LAST) 1 mg yerine ≤1 mcg/kg (maks 50 mcg) düşük doz verilir! Kalp cerrahisi sonrası tamponad/arrestte ise erken sternotomi önceliklidir.',
          priority: 'HIGH'
        },
        {
          stepNumber: 6,
          title: 'Antiaritmik Tedavi (Refrakter VF / pVT)',
          action: '3. şoka rağmen devam eden VF/pVTde Amiodaron 300 mg IV/IO bolus (100 mL %5 Dekstroz değil, arrestte doğrudan/hızlı puşe) uygulayın. Direnç sürerse 5. şok sonrası 2. doz 150 mg IV verin. Alternatif olarak Lidokain 1 - 1.5 mg/kg (2. doz 0.5-0.75 mg/kg) kullanılabilir.',
          criticalNote: 'Polimorfik VT (Torsades de Pointes) ve hipomagnezemide ilk tercih Magnezyum Sülfat 2 g IV (1-2 dakikada) bolusudur.',
          priority: 'HIGH'
        },
        {
          stepNumber: 7,
          title: 'Fizyolojik KPR Kalitesi Monitörizasyonu (EtCO2 & Arter)',
          action: 'Ameliyathanedeki mevcut monitörleri KPRyi yönlendirmek için kullanın: EtCO2 < 10 mmHg ise kompresyon derinliğini/hızını artırın veya hipovolemiyi/pnömotoraksı düzeltin. İnvaziv arter diyastolik basıncı > 20-25 mmHg hedeflenir.',
          criticalNote: 'KPR sırasında EtCO2nin aniden 35-40 mmHg üzerine sıçraması ROSCun (spontan dolaşımın dönüşü) en erken ve en güvenilir göstergesidir!',
          priority: 'HIGH'
        },
        {
          stepNumber: 8,
          title: 'Perioperatif 5H & 5T + Anesteziye Özgü Nedenleri Tedavi Et',
          action: 'PEA ve dirençli arrestte eş zamanlı etyoloji taraması yapın: Yatak başı POCUS (pnömotoraks, tamponad, boş ventrikül, sağ kalp dilatasyonu) çekin; kan gazı (K+, Ca++, Hgb, pH) alın. Kanama varsa masif transfüzyon, yüksek spinal ise pozisyon+adrenalin, LAST ise %20 Lipid, PE ise Alteplase başlatın.',
          priority: 'CRITICAL'
        },
        {
          stepNumber: 9,
          title: 'Gebelikte Perimortem Sezaryen & ECPR (VA-ECMO) Kararı',
          action: '≥20 haftalık gebede sol uterin deplasmana rağmen 4. dakikada ROSC sağlanamazsa 5. dakikaya kadar bebek ameliyathanede yatak başı Perimortem Sezaryen ile çıkarılmalıdır. Genç ve geri döndürülebilir nedeni olan refrakter arrestte 10-15. dakikada VA-ECMO (ECPR) ekibini aktive edin.',
          priority: 'HIGH'
        },
        {
          stepNumber: 10,
          title: 'ROSC Sonrası Stabilizasyon (Post-Arrest Bakım)',
          action: 'Nabız ve spontan dolaşım döndüğünde FiO2yi SpO2 %92 - %98 tutacak şekilde titre edin (hiperoksiden kaçının!), PaCO2 35 - 45 mmHg ayarlayın, Noradrenalin ile MAP ≥ 65 mmHg sağlayın, 12 derivasyonlu EKG çekip koroner iskemi/POCUS değerlendirmesi yapın ve YBÜye transfer edin.',
          priority: 'HIGH'
        }
      ],

      aclsProtocols: {
        cprQualityTargets: [
          {
            metric: 'Kompresyon Hızı & Derinliği',
            target: '100 - 120 / dk · 5 - 6 cm',
            clinicalNote: 'Her basıda tam göğüs geri çekilmesine (recoil) izin verin; göğüs üstüne yaslanmayın.'
          },
          {
            metric: 'Göğüs Kompresyon Oranı (CCF)',
            target: '≥ %80 (Kesinti < 10 sn)',
            clinicalNote: 'Ritim analizi, entübasyon veya şok öncesi duraklamalar 10 saniyeyi asla geçmemelidir.'
          },
          {
            metric: 'Ventilasyon (Entübe Hasta)',
            target: '10 soluk / dk (6 sn’de 1)',
            clinicalNote: 'Asenkron 10/dk; hiperventilasyon intratorasik basıncı artırıp venöz dönüşü yok eder!'
          },
          {
            metric: 'EtCO2 & Arteriyel Diyastolik',
            target: 'EtCO2 ≥ 10-20 mmHg · DBP > 20-25',
            clinicalNote: 'EtCO2 < 10 mmHg kötü KPR veya masif hipovolemidir; ani > 35-40 mmHg sıçraması ROSC göstergesidir.'
          }
        ],

        rhythmAlgorithms: [
          {
            pathway: 'Shockable (VF / Nabızsız VT)',
            badge: 'DEFİBRİLASYON ÖNCELİKLİ',
            initialAction: 'Ritim tanınır tanınmaz DERHAL şok verin; şok sonrası nabız beklemeden 2 dakika KPR yapın.',
            defibrillationDose: 'Bifazik 150 - 200 J (üretici önerisi, bilinmiyorsa maks 200 J) · Monofazik 360 J · Pediatrik 2 → 4 J/kg (maks 10 J/kg).',
            epinephrineTiming: '2. şoktan hemen sonra Adrenalin 1 mg IV/IO başlanır, her 3 - 5 dakikada bir tekrarlanır (Pediatrik: 0.01 mg/kg = 10 mcg/kg).',
            antiarrhythmics: '3. şok sonrası Amiodaron 300 mg IV/IO; 5. şok sonrası 150 mg IV/IO (Pediatrik: 5 mg/kg). Alternatif: Lidokain 1-1.5 mg/kg IV. Torsades: MgSO4 2 g IV.',
            criticalAlerts: 'Şok verirken O2 devresini hastadan uzaklaştırın veya kapalı devre tutun (kıvılcım/yangın riski!). İlaçları 20 mL SF ile yıkayın.'
          },
          {
            pathway: 'Non-Shockable (Asistoli / PEA)',
            badge: 'ERKEN ADRENALİN + 5H/5T',
            initialAction: 'ŞOK VERİLMEZ! Derhal 2 dakika yüksek kaliteli KPR + geri döndürülebilir neden (POCUS + kan gazı) taraması başlatın.',
            defibrillationDose: 'Kontrendikedir (Defibrilasyon uygulanmaz; asistoli görüldüğünde ince VFyi ekarte etmek için EKG kazancını/kabloları kontrol edin).',
            epinephrineTiming: 'Arrest tanınır tanınmaz İLK ANDA (0. dk) Adrenalin 1 mg IV/IO verilir, her 3 - 5 dakikada bir tekrarlanır.',
            antiarrhythmics: 'Rutin antiaritmik (Amiodaron/Lidokain) ve rutin Atropin önerilmez; ancak şiddetli vagal/bradikardik arrest geçişinde atropin/pacing düşünülebilir.',
            criticalAlerts: 'Ameliyathanede en sık PEA görülür: İlk olarak HİPOVOLEMİ (kanama), TANSİYON PNÖMOTORAKS, KARDİYAK TAMPONAD, PE ve ANAFİLAKSİ/LAST dışlanmalıdır!'
          }
        ],

        perioperativeHAndTs: [
          {
            category: '5H (Fizyolojik)',
            cause: 'Hipovolemi (Masif Hemoraji / Venöz Göllenme)',
            intraopClues: 'Boş kalp (POCUS), düşük EtCO2, cerrahi alanda aktif kanama, yüksek laktat',
            immediateReversal: 'Cerrahi kompresyon/klemp, basınçlı kristaloid + Masif Transfüzyon (1:1:1 ES:TDP:PLT) + TXA 1 g IV.'
          },
          {
            category: '5H (Fizyolojik)',
            cause: 'Hipoksi (Devre Ayrılması / CICO / Özofageal ETT)',
            intraopClues: 'Düşük SpO2, yüksek Ppeak, solunum seslerinin yokluğu, EtCO2 sıfırlanması',
            immediateReversal: 'El ambu + %100 O2 kontrolü, ETT yerini laringoskopi/bronkoskopi ile teyit et, tıkanmışsa tüpü değiştir.'
          },
          {
            category: '5H (Fizyolojik)',
            cause: 'Hiperkalemi / Hipokalsemi / Asidoz (H+)',
            intraopClues: 'Masif transfüzyon (sitrat → düşük Ca++), süksinilkolin + yanık/denervasyon, KBY, sivri T/geniş QRS',
            immediateReversal: '%10 Kalsiyum Klorür 10-20 mL IV (veya Ca Glukonat 30 mL), İnsülin 10 Ü + Dekstroz, NaHCO3 1 mEq/kg IV.'
          },
          {
            category: '5H (Fizyolojik)',
            cause: 'Hipotermi (Kaza / Uzun Açık Cerrahi)',
            intraopClues: 'Özofageal ısı <32-34°C, Osborn J dalgası, defibrilasyona/ilaçlara direnç',
            immediateReversal: 'Aktif iç/dış ısıtma, ısıtılmış IV sıvılar; <30°C ise ilaç aralıklarını uzat, 30-32°C üstüne ısıtana kadar KPR sürdür.'
          },
          {
            category: '5T (Mekanik / Toksik)',
            cause: 'Tansiyon Pnömotoraks',
            intraopClues: 'Tek taraflı solunum sesi kaybı, ani Ppeak artışı, boyun venöz dolgunluğu, trakeal deviasyon',
            immediateReversal: 'Derhal İğne Dekompresyonu (2. İKA midklaviküler veya 4-5. İKA ön aksiller) → ardından Tüp Torakostomi!'
          },
          {
            category: '5T (Mekanik / Toksik)',
            cause: 'Kardiyak Tamponad',
            intraopClues: 'Toraks/kalp cerrahisi veya santral kateter perforasyonu, POCUSda perikardiyal efüzyon/RV kollapsı',
            immediateReversal: 'Acil Perikardiyosentez (POCUS rehberliğinde) veya acil cerrahi resternotomi/perikardiyotomi.'
          },
          {
            category: '5T (Mekanik / Toksik)',
            cause: 'Toksinler (LAST / Anafilaksi / Anestezik Doz Aşımı / MH)',
            intraopClues: 'Blok sonrası aritmi (LAST), ani bronkospazm+şok (Anafilaksi), rijidite+hiperkapni (MH)',
            immediateReversal: 'LAST: %20 Lipid (1.5 mL/kg) + düşük doz Epi! Anafilaksi: Adrenalin + Kristaloid! MH: Dantrolen 2.5 mg/kg! İlaç aşırı dozu: İlaçları kes.'
          },
          {
            category: '5T (Mekanik / Toksik)',
            cause: 'Tromboz - Pulmoner Emboli (PE) veya Koroner (MI)',
            intraopClues: 'Ani EtCO2 çöküşü + POCUSda RV dilatasyonu (PE) veya ST elevasyonu (Kounis/MI)',
            immediateReversal: 'Masif PE: Alteplase 50 mg IV bolus + 15 dk daha KPR veya VA-ECMO. MI: PCI / Acil anjiyo aktivasyonu.'
          },
          {
            category: 'Anesteziye Özgü',
            cause: 'Yüksek Spinal / Total Nöroaksiyel Blok & Aşırı Vagal Refleks',
            intraopClues: 'Spinal/epidural sonrası ani bradikardi→asistoli, üst ekstremite güçsüzlüğü, laparoskopi insüflasyonu',
            immediateReversal: 'Adrenalin/Efedrin + Atropin (vagalde) + Hızlı IV sıvı + Entübasyon/ventilasyon; pnömoperitonu boşalt!'
          },
          {
            category: 'Anesteziye Özgü',
            cause: 'Oto-PEEP (Dinamik Hiperinflasyon) & Hava Embolisi',
            intraopClues: 'KOAH/astımda yüksek Ppeak sonrası gelişen PEA; oturur kraniyotomide ani EtCO2 düşüşü',
            immediateReversal: 'Oto-PEEPte devreyi 10-15 sn ayırıp göğsü boşalt! Hava embolisinde N2O kapat, cerrahi sahayı yıka, Durant pozisyonu ver.'
          }
        ],

        operatingRoomModifications: {
          title: 'Ameliyathane İçi Özel ACLS Modifikasyonları (Pozisyon, Pnömoperiton, Gebelik, ECPR)',
          anestheticAndVentilation: 'Tüm volatil anestezikler (Sevofluran/Desfluran) ve propofol/opioid infüzyonları derhal kapatılır; devre %100 O2 ile yıkanır. Entübe hastada ventilatör asenkron modda 10 soluk/dk, 6-7 mL/kg TV, PEEP 0-5 cmH2O ayarlanır (kompresyonla eşzamanlı tetikleme kapalı olmalıdır).',
          proneAndPositioningCpr: 'Prone (yüzüstü) omurga/beyin cerrahisinde hasta steril alan/pinler nedeniyle hemen çevrilemiyorsa vakit kaybetmeden TERS (Posterior) KPR başlatılır: Eller orta torasik omurga (T7-T10) üzerinde, ellerin altında sternuma destek yastığı konularak bastırılır; defibrilasyon pedleri bi-aksiller veya sağ skapula altı – sol mid-aksiller yapıştırılır.',
          maternalCardiacArrest: '≥20 haftalık (fundus göbek hizasında veya üstünde) gebede kompresyonlarla eşzamanlı olarak manuel Sol Uterin Deplasman (LUD) yapılır (aortokaval basıyı kaldırır). İlaç dozları değişmez; ancak 4. dakikada ROSC elde edilemezse 5. dakikada anne ve fetüsün sağkalımı için yatak başı PERİMORTEM SEZARYEN (Resuscitative Hysterotomy) başlatılır!',
          ecprCriteria: 'Ekstrakorporeal KPR (VA-ECMO): Tanıklı ameliyathane içi arrestte, genç/düşük frailtili hastada ve geri döndürülebilir neden (masif PE, LAST, refrakter VT/VF, hipotermi, kardiyak cerrahi) varlığında 10-15 dakika içinde ROSC sağlanamıyorsa erken aktive edilmelidir.'
        },

        roscPostArrestTargets: [
          {
            parameter: 'Oksijenasyon (SpO2 / PaO2)',
            target: 'SpO2 %92 – %98 (PaO2 75–100 mmHg)',
            rationale: 'ROSC sonrası %100 FiO2 ile hiperoksi serbest oksijen radikalleri oluşturarak beyin hasarını artırır; FiO2 hızla azaltılmalıdır.'
          },
          {
            parameter: 'Ventilasyon (PaCO2)',
            target: 'Normokapni: PaCO2 35 – 45 mmHg',
            rationale: 'Hipokapni serebral vazokonstriksiyon yaparak iskemiyi artırır; hiperkapni ise KİBAS ve asidozu kötüleştirir.'
          },
          {
            parameter: 'Hemodinami (MAP / SKB)',
            target: 'MAP ≥ 65 mmHg (SKB ≥ 90 mmHg)',
            rationale: 'Hipoperfüzyon sekonder beyin hasarını derinleştirir; gereğinde Noradrenalin veya Adrenalin infüzyonu titre edilir.'
          },
          {
            parameter: 'Sıcaklık Kontrolü (TTM)',
            target: '32 – 37.5°C (Ateş Kesinlikle Önlenir)',
            rationale: 'Komatöz hastada en az 24 saat aktif sıcaklık kontrolü uygulanmalı; hipertermi (>37.7°C) kesinlikle engellenmelidir.'
          },
          {
            parameter: 'Metabolik & Koroner Hedef',
            target: 'Glukoz 140–180 mg/dL · 12-Lead EKG + POCUS',
            rationale: 'Hipoglisemiden kaçınılır; STEMI veya açıklanamayan hemodinamik şok varsa acil koroner anjiyografi (PCI) planlanır.'
          }
        ]
      }
    },

    // 5) Patofizyoloji
    pathophysiology: {
      molecularBasis: 'Kardiyak arrest anında miyokardiyal mekanik pompa fonksiyonunun durmasıyla kalp debisi ve serebral/koroner perfüzyon basıncı (CPP = Aortik Diyastolik Basınç − Sağ Atriyal Basınç) sıfıra iner. Hücresel ATP üretimi aerobikten anaerobik glikolize kayar; dakikalar içinde intrasellüler asidoz, Na+/K+-ATPaz pompa yetmezliği, sitotoksik glutamat/kalsiyum birikimi ve geri dönüşsüz nöronal/miyokardiyal nekroz başlar.',
      stepsTitle: '3 Fazlı Kardiyak Arrest Zaman Modeli & Perioperatif Kaskad',
      flowType: 'cellular-systemic',
      cascadeSteps: [
        {
          phase: 'Faz 1: Elektriksel Faz (0 – 4 Dakika)',
          mechanism: 'Kalp kasındaki yüksek enerjili fosfat depoları henüz tükenmemiştir. Ameliyathane içi tanıklı VF/pVT arrestlerinde bu pencerede uygulanan erken defibrilasyon ile ROSC olasılığı >%70-80 düzeyindedir.',
          badge: '0-4 DK: DEFİBRİLASYON PENCERESİ'
        },
        {
          phase: 'Faz 2: Dolaşım Fazı (4 – 10 Dakika)',
          mechanism: 'Miyokardiyal ATP azalmıştır; göğüs kompresyonu yapılmadan verilen şok sıklıkla asistoli/PEAya dönüşür. Önce kesintisiz yüksek kaliteli KPR ile koroner perfüzyon basıncı (CPP > 15-20 mmHg) oluşturulmalı ve geri döndürülebilir neden (5H-5T) giderilmelidir.',
          badge: '4-10 DK: KPR + CPP + 5H/5T'
        },
        {
          phase: 'Faz 3: Metabolik Faz (> 10 Dakika) & Reperfüzyon Hasarı',
          mechanism: 'Yaygın endotelyal aktivasyon, mikrosirkülatuar tromboz, derin laktik asidoz ve doku hipoksisi gelişir. ROSC sağlansa dahi Post-Kardiyak Arrest Sendromu (beyin hasarı, miyokardiyal stunning, sistemik iskemi-reperfüzyon yanıtı) tabloya hakim olur.',
          badge: '>10 DK: SİSTEMİK İSKEMİ & ECPR'
        }
      ],
      summaryText: 'Perioperatif arrestlerin çoğu kalp dışı, geri döndürülebilir mekanik, hipovolemik, hipoksik veya farmakolojik nedenlerden kaynaklanır; bu nedenle etkin göğüs kompresyonuyla zaman kazanırken altta yatan H/T nedenini saniyeler içinde ortadan kaldırmak sağkalımın anahtarıdır.'
    },

    // 6) Klinik Özellikler & Prezentasyon
    presentation: {
      earlySigns: [
        'İnvaziv arteriyel basınçta hızlı düşüş, daralan nabız basıncı ve bradikardiye veya malign aritmiye geçiş',
        'EtCO2 dalga formunda ve sayısal değerinde progresif veya ani düşüş (<15-20 mmHg altına inmesi)',
        'SpO2 pletismografik dalga genliğinin küçülmesi ve sinyal kaybı',
        'Uyanık/rejyonal anestezi hastasında ani baş dönmesi, bilinç kaybı, dispne veya ölüm korkusu'
      ],
      progressingSigns: [
        'Arteriyel trasede tam düzleşme, NIBP ölçememe hatası',
        'EtCO2 değerinin <10 mmHg düzeyine çökmesi (entübe hastada azalmış pulmoner kan akımı)',
        'Karotis veya femoral arterde 10 saniye içinde nabız alınamaması',
        'EKGde VF, pVT, asistoli veya nabızsız organize ritim (PEA) ortaya çıkışı'
      ],
      lateSigns: [
        'Bilateral dilate ve ışık refleksi kaybolmuş pupiller (uzamış serebral anoksi)',
        'KPRye ve tekrarlayan adrenaline yanıtsız refrakter asistoli / geniş-kompleks agonal ritim',
        'Derin metabolik asidoz (pH < 7.0), aşırı laktat (>10-15 mmol/L) ve hiperkalemi',
        'Koagülopati (DIC) ve çoklu organ yetmezliği (ROSC sonrası)'
      ],
      specialAlertTitle: 'Ameliyathane Altın Kuralı: "Sahte Sinüs" (PEA) Tuzağına Düşmeyin!',
      specialAlertContent: 'Ameliyathanede hastalar sıklıkla EKGde normal sinüs ritmi veya sinüs taşikardisi gösterirken kalp mekanik olarak kan pompalamıyor olabilir (Nabızsız Elektriksel Aktivite - PEA)! Eğer arter trasesi düzse ve EtCO2 çökmüşse EKGye bakıp zaman kaybetmeyin; nabız (<10 sn) yoksa hasta ARRESTTİR, derhal KPRye başlayın!'
    },

    // 7) Önleyici - Koruyucu Tedbirler ve Hazırlıklı Olma
    preventionAndPreparedness: {
      preopRiskAssessment: [
        'Yüksek kardiyak riskli hastalarda (RCRI ≥ 2, ciddi aort stenozu, düşük EF, pulmoner hipertansiyon) indüksiyon öncesi invaziv arteriyel monitörizasyon ve defibrilatör pedlerinin önceden yapıştırılması hayat kurtarır.',
        'Preoperatif EKG, elektrolitler (özellikle K+ ve Mg++) ve volüm durumu optimize edilmeden elektif vakaya başlanmamalıdır.',
        'Yüksek kanama beklenen cerrahilerde (vasküler, hepatik, majör ortopedi, plasenta akreata) en az 2 geniş lümenli IV yol + cross-matched kan ürünleri odada hazır bulundurulmalıdır.',
        'Beta-bloker ve antiaritmik tedaviler perioperatif kesilmemelidir (rebound taşikardi ve iskemi riski).'
      ],
      anesthesiaMachinePreparation: {
        title: 'Ameliyathane Acil Arrest & Defibrilasyon Hazırlık Standartları',
        steps: [
          'Her ameliyathane bloğunda bifazik defibrilatör (pediatrik ve erişkin pedler takılı, günlük deşarj testi yapılmış) 30 saniye içinde erişilebilir konumda olmalıdır.',
          'Acil arabasında (Crash Cart) 1 mg Adrenalin ampulleri, Amiodaron (150 mg ampul), Lidokain, Atropin, %10 Kalsiyum Klorür, Magnezyum Sülfat ve Sodyum Bikarbonat tam stoklu olmalıdır.',
          'Ameliyat masasının altında sert KPR tahtası (backboard) ve entübasyon/videolaringoskop ekipmanı her vakada hazır bulunmalıdır.',
          'Yatak başı ultrason (POCUS) ve kardiyak/akciğer probları ameliyathane koridorunda anında odaya alınabilecek şekilde şarjda tutulmalıdır.'
        ]
      },
      cleanAnesthesiaProtocol: [
        'Kriz Ekip Liderliği (CRM): Arrest anında kıdemli anestezist Ekip Lideri olur; bir kişi kompresyon, bir kişi ilaç/zaman takibi (3-5 dk Adrenalin sayacı), bir kişi havayolu, bir kişi POCUS/neden araştırma görevini sesli kapalı-döngü iletişimle (closed-loop communication) üstlenir.',
        'Defibrilasyon Güvenliği: Defibrilasyon öncesi oksijen maskesi/devresi açık oksijen kaçağı yaratmayacak şekilde kapatılmalı veya güvenli mesafeye alınmalı, "Herkes çekilsin!" komutu verilmelidir.',
        'Yüksek Spinal Önleme: Nöroaksiyel blok sonrası ilk 20 dakikada yakın TA/nabız takibi ve blok seviyesi kontrolü ile bradikardi-arrest geçişi erken evrede vazopresör/atropinle durdurulmalıdır.'
      ],
      cartTitle: 'Perioperatif Kardiyak Arrest Acil Arabası (Crash Cart) Kontrol Listesi:',
      cartChecklist: [
        'Bifazik Defibrilatör + Erişkin/Pediatrik Kendinden Yapışkanlı Pedler (Pads)',
        'Adrenalin (Epinefrin 1 mg/mL ve 0.5 mg/mL ampuller x 20 adet + 20 mL SF Flush)',
        'Amiodaron (150 mg/3 mL ampul x 6 adet — 300 mg + 150 mg dozları için)',
        'Lidokain (%2 100 mg/5 mL ampul x 4 adet)',
        'Magnezyum Sülfat (%15 1.5 g/10 mL ampul x 4 adet — Torsades için)',
        'Kalsiyum Klorür (%10 10 mL) veya Kalsiyum Glukonat (%10 10 mL x 4 adet)',
        'Sodyum Bikarbonat (%8.4 10 mL/10 mEq veya 100 mL flakon)',
        'Atropin (0.5 mg veya 1 mg ampul x 5 adet)',
        'İntraosseöz (IO) Kemik İçi Girişim Seti (EZ-IO veya manuel iğne)',
        '14G Geniş Lümenli Uzun Torasentez İğnesi (Tansiyon Pnömotoraks dekompresyonu için)',
        'Sert KPR Sırt Tahtası (CPR Backboard) ve Kronometre / Zamanlayıcı',
        'POCUS (Taşınabilir Ultrason) + Steril Jel ve İğne Dekompresyon/Perikardiyosentez Seti'
      ]
    },

    // 8) Postoperatif Takip, Uzun Zamanlı Yönetim, Komplikasyonlar ve Prognoz
    postopManagement: {
      icuMonitoringDuration: 'ROSC sağlanan tüm hastalar cerrahi durum değerlendirildikten sonra (gereğinde hasar kontrol cerrahisi / hızlı kapatma yapılarak) kesintisiz olarak en az 48 - 72 saat 3. Basamak Yoğun Bakım Ünitesinde (YBÜ) mekanik ventilasyon ve invaziv monitörizasyon altında izlenmelidir.',
      recurrenceRate: 'İlk ROSC sağlanan hastaların %20-35inde ilk saatler içinde altta yatan neden (gizli kanama, miyokardiyal iskemi, elektrolit imbalansı, tamponad) tam çözülmediyse RE-ARREST (ikincil arrest) gelişebilir.',
      recurrenceRiskBadge: 'İLK 24 SAATTE POST-ARREST ŞOK VE RE-ARREST RİSKİ',
      maintenanceTherapy: 'Post-kardiyak arrest sendromunda hedefe yönelik normoksemi (SpO2 %92-98), normokapni (PaCO2 35-45 mmHg), MAP ≥ 65 mmHg (vazopresör/inotrop infüzyonu), ateşin önlenmesi (TTM 32-37.5°C) ve normoglisemi (140-180 mg/dL) sağlanır. Komatöz hastada nörolojik prognoz tayini ROSCtan itibaren en az 72 saat ertelenmelidir.',
      monitoringParameters: [
        'Sürekli İnvaziv Arteriyel Kan Basıncı (MAP ≥ 65 mmHg hedefi) ve 5-derivasyonlu EKG',
        '12 Derivasyonlu EKG + Seri Troponin I/T + Transtorasik/Transözofageal Ekokardiyografi (TTE/TEE)',
        'Seri Arter Kan Gazı: PaO2, PaCO2, laktat klirensi, pH, K+ ve iyonize Ca++',
        'Saatlik İdrar Çıkışı (≥ 0.5 mL/kg/sa) ve böbrek fonksiyon testleri',
        'Merkezi Vücut Sıcaklığı (Özofageal / Mesane probu ile sürekli takip, ateş > 37.7°C önlenir)',
        'Komatöz hastada 72. saatten sonra Multimodal Nörolojik Prognoz Değerlendirmesi (EEG, SSEP, Nöron Spesifik Enolaz, Beyin BT/MR)'
      ],
      expectedComplications: [
        'Post-Arrest Miyokardiyal Stunning (ilk 24-48 saatte geçici ciddi sol ventrikül disfonksiyonu)',
        'Hipoksik İskemik Beyin Hasarı (uzamış veya kalitesiz KPR / hiperoksi / ateş nedeniyle)',
        'Kosta / Sternum Kırığı, Pnömotoraks, Karaciğer/Dalak Laserasyonu (kompresyona bağlı travma)',
        'Akut Böbrek Hasarı ve İskemik Hepatit ("Shock Liver")',
        'Aspirasyon Pnömonisi, ARDS ve Ventilatör İlişkili Akciğer Hasarı'
      ],
      definitiveDiagnosticTesting: [
        { testName: '12 Derivasyonlu EKG & Acil Koroner Anjiyografi', description: 'ST elevasyonu veya yüksek iskemi şüphesi varsa vakit kaybetmeden primer PCI için kateter laboratuvarına alınması.' },
        { testName: 'POCUS / Kapsamlı TTE (RUSH / FEEL Protokolü)', description: 'Kardiyak tamponad, masif PE (McConnell bulgusu), hipovolemi, pnömotoraks ve EF değerlendirmesi.' },
        { testName: 'BT Pulmoner Anjiyografi / Beyin BT', description: 'Hemodinamik stabilizasyon sonrası masif PE doğrulaması veya nörolojik hemoraji/ödem dışlanması.' }
      ],
      prognosisSummary: 'Ameliyathanede gelişen tanıklı arrestler, diğer hastane içi ve dışı arrestlere kıyasla çok daha yüksek ROSC (%50-70) ve nörolojik olarak sağlam taburculuk oranına sahiptir. Prognozu belirleyen ana faktörler <2 dk içinde defibrilasyon, hiperventilasyonsuz kesintisiz KPR ve cerrahi/anestezik nedenin (5H-5T) hızla ortadan kaldırılmasıdır.'
    },

    // 9) High-Yield Klinik Bilgiler
    highYieldPearls: [
      {
        title: 'Ameliyathanede Hiperventilasyon Öldürür!',
        takeaway: 'Arrest sırasında stresle hastayı el ambuyla çok hızlı (20-30/dk) solutmak intratorasik basıncı artırarak sağ kalbe venöz dönüşü sıfırlar ve koroner perfüzyonu yok eder. Entübe hastada hız KESİNLİKLE 10 soluk/dk (6 saniyede 1) olmalıdır!',
        category: 'Tuzak'
      },
      {
        title: 'EtCO2 = KPR Kalite Barometresi ve ROSC Dedektörü',
        takeaway: 'KPR sırasında EtCO2 < 10 mmHg ise bası kaliteniz kötüdür veya hasta şiddetli hipovolemiktir! Nabız bakmak için durmadan EtCO2nin aniden 35-40 mmHg üzerine fırlaması ROSCun en erken işaretidir.',
        category: 'Ezber Bozan'
      },
      {
        title: 'PEAda Asla Şok Vermeyin — 5H & 5T + POCUS Kullanın!',
        takeaway: 'Ameliyathanede en sık PEA görülür. EKGde ritim var diye şok verilmez; derhal kanama (hipovolemi), tansiyon pnömotoraks, tamponad, PE, anafilaksi veya LAST aranıp tedavi edilmelidir.',
        category: 'Sınav / Klinik Notu'
      },
      {
        title: 'LAST ve Gebelik Arrestinde Özel Kurallar',
        takeaway: 'LAST (lokal anestezik) arrestinde standart 1 mg Adrenalin YASAKTIR (≤1 mcg/kg titre + %20 Lipid)! ≥20 hafta gebede 4. dakikada ROSC yoksa 5. dakikaya kadar Perimortem Sezaryen hayat kurtarır.',
        category: 'Kritik Doz'
      },
      {
        title: 'Prone Pozisyonda Bekleme — Ters KPR Başlat!',
        takeaway: 'Omurga cerrahisinde hasta yüzüstüyse ve çivili başlık/açık yara nedeniyle supin çevirme gecikecekse, hiç beklemeden iki skapula arasından posterior (ters) göğüs kompresyonuna başlayın.',
        category: 'Ezber Bozan'
      }
    ],

    // 10) Kanıta Dayalı Kaynaklar
    references: [
      {
        authors: 'Panchal AR, Bartos JA, Cabañas JG, et al. (AHA ACLS Writing Group)',
        title: 'Part 3: Adult Basic and Advanced Life Support: American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care.',
        journal: 'Circulation. 2020;142(16_suppl_2):S366-S468 (ve 2023-2025 Focused Updates).',
        year: '2020-2025',
        relevance: 'Erişkin ACLS algoritmaları, defibrilasyon, adrenalin zamanlaması, amiodaron/lidokain ve ROSC sonrası bakım standartları.'
      },
      {
        authors: 'Lott C, Truhlář A, Alfonzo A, et al. (ERC Special Circumstances Writing Group)',
        title: 'European Resuscitation Council Guidelines 2021: Cardiac arrest in special circumstances (Operating Room / Perioperative Arrest).',
        journal: 'Resuscitation. 2021;161:152-219.',
        year: '2021',
        relevance: 'Ameliyathane içi kardiyak arrest, prone KPR, pnömoperiton dekompresyonu, gebelikte perimortem sezaryen ve ECPR kılavuzu.'
      },
      {
        authors: 'Moitra VK, Einav S, Thies KC, et al.',
        title: 'Cardiac Arrest in the Operating Room: Resuscitation and Management for the Anesthesiologist: Part 1.',
        journal: 'Anesthesia & Analgesia. 2018;126(3):876-888.',
        year: '2018',
        relevance: 'Anestezistler için ameliyathaneye özgü PEA nedenleri, EtCO2/arteriyel KPR rehberliği ve modifiye ACLS yaklaşımı.'
      },
      {
        authors: 'McEvoy MD, Thies KC, Einav S, et al.',
        title: 'Cardiac Arrest in the Operating Room: Part 2 — Special Situations in the Perioperative Period.',
        journal: 'Anesthesia & Analgesia. 2018;126(3):889-903.',
        year: '2018',
        relevance: 'Laparoskopi, nöroaksiyel blok, hava embolisi, LAST, anafilaksi ve prone pozisyonda perioperatif arrest yönetimi.'
      }
    ]
  }
};

