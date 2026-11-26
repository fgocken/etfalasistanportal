export interface EmergencyDoses {
  weightNum: number;
  isValidWeight: boolean;
  isPediatric: boolean;

  // 1. MH Dantrolene
  initialDoseMg: number;
  dantriumVials: number;
  dantriumWaterMl: number;
  ryanodexVials: number;
  ryanodexWaterMl: number;

  // 2. Bronchospasm
  magnesiumGrams: number;
  ketamineBolusMg: number;
  adrenalinBolusMcg: number;
  methylpredBronchoMg: number;

  // 3. Laryngospasm
  propofolLaryngoMg: number;
  succinylcholineIvMg: number;
  succinylcholineImMg: number;
  atropineLaryngoMg: number;
  rocuroniumLaryngoMg: number;

  // 4. CICO
  sugammadexMg: number;
  sugammadexVials200: number;
  sugammadexVials500: number;
  atropineCicoMg: number;
  cicoEfonaRecommendation: string;

  // 5. Airway Obstruction
  dexamethasoneObsMg: number;
  nebAdrenalineMl: number;
  propofolObsMg: number;
  magillSize: string;
  yankauerType: string;

  // 6. Aspiration
  aspirationEttNote: string;
  aspirationNgtNote: string;
  aspirationVtMin: number;
  aspirationVtMax: number;

  // 7. Pulmonary Embolism (PE)
  alteplase2hMg: number;
  alteplase15mMg: number;
  tenecteplaseMg: number;
  tenecteplaseIU: number;
  ufhBolusUnits: number;
  ufhInfusionUnitsHr: number;
  lmwhDoseMg: number;
  noradMinMcg: number;
  noradMaxMcg: number;

  // 8. Venous Air Embolism (VAE)
  vaeCvcDepthNote: string;
  vaeAdrenalineLowMcgMin: number;
  vaeAdrenalineHighMcgMin: number;
  vaeLethalVolMin: number;
  vaeLethalVolMax: number;
  vaeRvotAirLockBolus: number;
  vaeNoradMin: number;
  vaeNoradMax: number;

  // 9. LAST (ASRA 2020)
  isLastAdultFixed: boolean;
  lastLipidBolusMl: number;
  lastLipidInfusionMlMin: number;
  lastLipidInfusionMlHr: string;
  lastLipidMaxMl: number;
  lastAdrenalineMaxMcg: number;
  lastBupiMaxMg: number;
  lastLidoMaxMg: number;
  lastLidoEpiMaxMg: number;

  // 10. Anaphylaxis
  anaphylaxisGrade2Mcg: number;
  anaphylaxisGrade3Mcg: number;
  anaphylaxisImMg: number;
  anaphylaxisFluidBolusMl: number;
  anaphylaxisMethylpredMg: number;
  anaphylaxisAdrenalineInfusionMinMcg: number;
  anaphylaxisAdrenalineInfusionMaxMcg: number;
  anaphylaxisNoradMin: number;
  anaphylaxisNoradMax: number;

  // 11. ACLS / PALS
  aclsEpiLabel: string;
  aclsAmio1Mg: number;
  aclsAmio2Mg: number;
  aclsLidoMinMg: number;
  aclsLidoMaxMg: number;
  aclsDefibLabel: string;
  aclsVentRateLabel: string;
  aclsFluidBolusMl: number;

  // 12. Massive Transfusion Protocol (MTP)
  mtpEbvMl: number;
  mtpFiftyPercentLossMl: number;
  mtpTxaLabel: string;
  mtpCaCl2Label: string;
  mtpFibrinogenMinG: number;
  mtpFibrinogenMaxG: number;
  mtpFfpMinMl: number;
  mtpFfpMaxMl: number;
  mtpPccMinIU: number;
  mtpPccMaxIU: number;
  mtpRf7aMg: number;

  // 13. Tension Pneumothorax
  isPedsPneumo: boolean;
  pneumoNeedleSite: string;
  pneumoCatheterSpec: string;
  pneumoSimpleTubeFr: string;
  pneumoTraumaTubeFr: string;
  pneumoFluidBolusMl: number;

  // 14. Airway Fire
  airwayFireDexaMg: number;
  airwayFireEttNote: string;

  // 15. Fat Embolism Syndrome (FES)
  fesVtMin: number;
  fesVtMax: number;
  fesVtUpperNonArds: number;
  fesPbwCaution: boolean;
  fesNoradMinMcgMin: number;
  fesNoradMaxMcgMin: number;
  fesDobutaMinMcgMin: number;
  fesDobutaMaxMcgMin: number;
  fesFluidTryLabel: string;
}

export interface StickyDoseHighlight {
  label: string;
  value: string;
  tone?: 'red' | 'amber' | 'emerald' | 'blue';
}

export function computeEmergencyDoses(rawWeight: string): EmergencyDoses {
  const normalized = rawWeight.trim().replace(',', '.');
  const parsed = normalized === '' ? NaN : Number(normalized);
  const weightNum = Number.isFinite(parsed) ? parsed : 0;
  const isValidWeight = Number.isFinite(parsed) && weightNum >= 1 && weightNum <= 300;
  const w = isValidWeight ? weightNum : 0;
  const isPediatric = isValidWeight && weightNum < 40;

  // 1. MH Dantrolene
  const initialDoseMg = Math.round(w * 2.5);
  const dantriumVials = Math.ceil(initialDoseMg / 20);
  const dantriumWaterMl = dantriumVials * 60;
  const ryanodexVials = Math.ceil(initialDoseMg / 250);
  const ryanodexWaterMl = ryanodexVials * 5;

  // 2. Bronchospasm
  const magnesiumGrams = Math.min(2.0, +(w * 0.045).toFixed(2));
  const ketamineBolusMg = Math.round(w * 0.5);
  const adrenalinBolusMcg = !isValidWeight
    ? 0
    : isPediatric
      ? Math.max(1, Math.round(w * 0.5))
      : Math.min(50, Math.max(10, Math.round(w * 0.5)));
  const methylpredBronchoMg = Math.min(125, Math.round(w * 1.5));

  // 3. Laryngospasm
  const propofolLaryngoMg = Math.round(w * 0.5);
  const succinylcholineIvMg = !isValidWeight
    ? 0
    : Math.min(40, Math.max(2, Math.round(w * 0.25)));
  const succinylcholineImMg = Math.min(200, Math.round(w * 3.5));
  const atropineLaryngoMg = Math.min(0.5, +(w * 0.02).toFixed(2));
  const rocuroniumLaryngoMg = Math.round(w * 1.2);

  // 4. CICO
  const sugammadexMg = Math.round(w * 16);
  const sugammadexVials200 = Math.ceil(sugammadexMg / 200);
  const sugammadexVials500 = Math.ceil(sugammadexMg / 500);
  const atropineCicoMg = Math.min(1.0, +(w * 0.02).toFixed(2));
  const cicoEfonaRecommendation = isPediatric
    ? 'Pediatrik (<40 kg): Cerrahi krikotirotomi KONTRENDİKE (küçük çocukta iğne krikotirotomi / KBB acil trakeostomi)'
    : 'Erişkin: No. 10 Bistüri + 15 Fr Bougie + Kaflı ETT ID 6.0 mm';

  // 5. Airway Obstruction
  const dexamethasoneObsMg = Math.min(16, +(w * 0.2).toFixed(1));
  const nebAdrenalineMl = Math.min(5, +(w * 0.5).toFixed(1));
  const propofolObsMg = Math.round(w * 1.5);
  const magillSize = w < 15 ? 'İnfant' : w < 35 ? 'Pediatrik' : 'Erişkin (25 cm)';
  const yankauerType = w < 20 ? 'Ch 10–12 Esnek' : 'Ch 14–18 Rijit Yankauer';

  // 6. Aspiration
  const aspirationEttNote = isPediatric
    ? 'Pediatrik: Kaflı ETT = (Yaş/4) + 3,5 mm'
    : w < 55
      ? 'ID 7.0 mm Kaflı ETT'
      : 'ID 7.5–8.0 mm Kaflı ETT';
  const aspirationNgtNote = isPediatric ? 'Pediatrik: 8–12 Fr NGT' : 'Erişkin: 14–16 Fr NGT';
  const aspirationVtMin = Math.round(w * 6);
  const aspirationVtMax = Math.round(w * 8);

  // 7. Pulmonary Embolism (PE)
  const alteplase2hMg = !isValidWeight ? 0 : w >= 65 ? 100 : +(w * 1.5).toFixed(1);
  const alteplase15mMg = Math.min(50, +(w * 0.6).toFixed(1));
  const tenecteplaseMg = !isValidWeight
    ? 0
    : w < 60
      ? 30
      : w < 70
        ? 35
        : w < 80
          ? 40
          : w < 90
            ? 45
            : 50;
  const tenecteplaseIU = tenecteplaseMg * 200;
  const ufhBolusUnits = Math.min(10000, Math.round(w * 80));
  const ufhInfusionUnitsHr = Math.min(2000, Math.round(w * 18));
  const lmwhDoseMg = Math.round(w * 1.0);
  const noradMinMcg = +(w * 0.05).toFixed(1);
  const noradMaxMcg = +(w * 1.0).toFixed(1);

  // 8. Venous Air Embolism (VAE)
  const vaeCvcDepthNote = isPediatric
    ? 'Pediatrik: Boy/formüle göre (USG + EKG kılavuzlu)'
    : 'Erişkin Sağ IJV: Boya göre 13–16 cm (kavo-atriyal bileşke)';
  const vaeAdrenalineLowMcgMin = +(w * 0.05).toFixed(1);
  const vaeAdrenalineHighMcgMin = +(w * 0.2).toFixed(1);
  const vaeLethalVolMin = Math.round(w * 3);
  const vaeLethalVolMax = Math.round(w * 5);
  const vaeRvotAirLockBolus = Math.round(w * 1.5);
  const vaeNoradMin = +(w * 0.05).toFixed(1);
  const vaeNoradMax = +(w * 0.3).toFixed(1);

  // 9. LAST (ASRA 2020 exact)
  const isLastAdultFixed = isValidWeight && w >= 70;
  const lastLipidBolusMl = isLastAdultFixed ? 100 : Math.round(w * 1.5);
  const lastLipidInfusionMlMin = isLastAdultFixed ? 12.5 : +(w * 0.25).toFixed(1);
  const lastLipidInfusionMlHr = isLastAdultFixed
    ? '750–1000 (200–250 mL / 15–20 dk)'
    : String(Math.round(w * 0.25 * 60));
  const lastLipidMaxMl = Math.min(1000, Math.round(w * 12));
  const lastAdrenalineMaxMcg = Math.min(50, Math.round(w * 1));
  const lastBupiMaxMg = Math.min(175, Math.round(w * 2));
  const lastLidoMaxMg = Math.min(300, Math.round(w * 4.5));
  const lastLidoEpiMaxMg = Math.min(500, Math.round(w * 7));

  // 10. Anaphylaxis
  const anaphylaxisGrade2Mcg = !isValidWeight
    ? 0
    : isPediatric
      ? Math.max(1, Math.round(w * 0.5))
      : 20;
  const anaphylaxisGrade3Mcg = !isValidWeight
    ? 0
    : isPediatric
      ? Math.max(1, Math.round(w * 1))
      : Math.min(200, Math.max(50, Math.round(w * 1.5)));
  const anaphylaxisImMg = !isValidWeight
    ? 0
    : isPediatric
      ? Math.min(0.3, +(w * 0.01).toFixed(2))
      : 0.5;
  const anaphylaxisFluidBolusMl = Math.min(2000, Math.round(w * 20));
  const anaphylaxisMethylpredMg = Math.min(125, Math.round(w * 1.5));
  const anaphylaxisAdrenalineInfusionMinMcg = +(w * 0.05).toFixed(1);
  const anaphylaxisAdrenalineInfusionMaxMcg = +(w * 0.5).toFixed(1);
  const anaphylaxisNoradMin = +(w * 0.05).toFixed(1);
  const anaphylaxisNoradMax = +(w * 0.5).toFixed(1);

  // 11. ACLS / PALS
  const aclsEpiLabel = isPediatric
    ? `${(w * 0.01).toFixed(2)} mg (${Math.round(w * 10)} mcg) IV/IO`
    : '1 mg IV/IO (3–5 dk)';
  const aclsAmio1Mg = !isValidWeight
    ? 0
    : isPediatric
      ? Math.min(300, Math.round(w * 5))
      : 300;
  const aclsAmio2Mg = !isValidWeight
    ? 0
    : isPediatric
      ? Math.min(150, Math.round(w * 5))
      : 150;
  const aclsLidoMinMg = Math.min(100, Math.round(w * 1));
  const aclsLidoMaxMg = isPediatric
    ? Math.min(100, Math.round(w * 1))
    : Math.min(150, Math.round(w * 1.5));
  const aclsDefibLabel = isPediatric
    ? `${Math.round(w * 2)} J → ${Math.round(w * 4)} J (2→4 J/kg)`
    : '200 J Bifazik (maks)';
  const aclsVentRateLabel = isPediatric
    ? '20–30/dk (AHA PALS 2020 — 2–3 sn/soluk)'
    : '10/dk (6 sn/soluk — Hiperventile Etme!)';
  const aclsFluidBolusMl = Math.min(2000, Math.round(w * 20));

  // 12. Massive Transfusion Protocol (MTP)
  const mtpEbvMl = Math.round(w * 70);
  const mtpFiftyPercentLossMl = Math.round(mtpEbvMl * 0.5);
  const mtpTxaLabel = isPediatric
    ? `${Math.min(1000, Math.round(w * 15))} mg IV (15 mg/kg, maks 1 g)`
    : '1 g IV (10 dk) + 1 g / 8 sa';
  const mtpCaCl2Label = isPediatric
    ? `${Math.min(10, +(w * 0.2).toFixed(1))} mL %10 CaCl₂ (0,2 mL/kg)`
    : '10 mL (1 g) %10 CaCl₂ / 4 Ü';
  const mtpFibrinogenMinG = Math.min(4, +(w * 0.03).toFixed(1));
  const mtpFibrinogenMaxG = Math.min(6, +(w * 0.05).toFixed(1));
  const mtpFfpMinMl = Math.round(w * 15);
  const mtpFfpMaxMl = Math.round(w * 20);
  const mtpPccMinIU = Math.round(w * 15);
  const mtpPccMaxIU = Math.round(w * 25);
  const mtpRf7aMg = +((w * 90) / 1000).toFixed(1);

  // 13. Tension Pneumothorax
  const isPedsPneumo = isPediatric;
  const pneumoNeedleSite = isPedsPneumo
    ? '2. İKA Midklaviküler Hat (MCL)'
    : '4–5. İKA Ön/Orta Aksiller Hat (AAL/MAL)';
  const pneumoCatheterSpec = isPedsPneumo
    ? '18–20G Anjiyokat (pediatrik)'
    : '14G × ≥5 cm Anjiyokat (5–8 cm)';
  const pneumoSimpleTubeFr = isPedsPneumo
    ? w < 10
      ? '8–10 Fr'
      : '10–14 Fr'
    : '10–14 Fr (Seldinger)';
  const pneumoTraumaTubeFr = isPedsPneumo
    ? w < 15
      ? '10–14 Fr'
      : '14–20 Fr'
    : '24–28 Fr (Trokar YASAK)';
  const pneumoFluidBolusMl = Math.min(2000, Math.round(w * 20));

  // 14. Airway Fire
  const airwayFireDexaMg = Math.min(10, +(w * 0.15).toFixed(1));
  const airwayFireEttNote = isPediatric
    ? 'Pediatrik: Normal yaştan 0,5 mm küçük kaflı ETT ([Yaş/4]+3,0 mm)'
    : 'Erişkin: 0,5–1,0 mm küçük kaflı ETT (ID 6,0–7,0 mm)';

  // 15. Fat Embolism Syndrome (FES) — ARDSNet 4–6 mL/kg PBW (8 mL/kg ARDS dışı üst sınır)
  const fesVtMin = Math.round(w * 4);
  const fesVtMax = Math.round(w * 6);
  const fesVtUpperNonArds = Math.round(w * 8);
  const fesPbwCaution = w > 85;
  const fesNoradMinMcgMin = +(w * 0.05).toFixed(1);
  const fesNoradMaxMcgMin = +(w * 0.5).toFixed(1);
  const fesDobutaMinMcgMin = Math.round(w * 2);
  const fesDobutaMaxMcgMin = Math.round(w * 10);
  const fesFluidTryLabel = isPediatric
    ? `${Math.round(w * 10)} mL (10 mL/kg dikkatli övolemi)`
    : '250–500 mL dikkatli deneme (RV yükünde aşırı sıvı YASAK)';

  return {
    weightNum,
    isValidWeight,
    isPediatric,

    initialDoseMg,
    dantriumVials,
    dantriumWaterMl,
    ryanodexVials,
    ryanodexWaterMl,

    magnesiumGrams,
    ketamineBolusMg,
    adrenalinBolusMcg,
    methylpredBronchoMg,

    propofolLaryngoMg,
    succinylcholineIvMg,
    succinylcholineImMg,
    atropineLaryngoMg,
    rocuroniumLaryngoMg,

    sugammadexMg,
    sugammadexVials200,
    sugammadexVials500,
    atropineCicoMg,
    cicoEfonaRecommendation,

    dexamethasoneObsMg,
    nebAdrenalineMl,
    propofolObsMg,
    magillSize,
    yankauerType,

    aspirationEttNote,
    aspirationNgtNote,
    aspirationVtMin,
    aspirationVtMax,

    alteplase2hMg,
    alteplase15mMg,
    tenecteplaseMg,
    tenecteplaseIU,
    ufhBolusUnits,
    ufhInfusionUnitsHr,
    lmwhDoseMg,
    noradMinMcg,
    noradMaxMcg,

    vaeCvcDepthNote,
    vaeAdrenalineLowMcgMin,
    vaeAdrenalineHighMcgMin,
    vaeLethalVolMin,
    vaeLethalVolMax,
    vaeRvotAirLockBolus,
    vaeNoradMin,
    vaeNoradMax,

    isLastAdultFixed,
    lastLipidBolusMl,
    lastLipidInfusionMlMin,
    lastLipidInfusionMlHr,
    lastLipidMaxMl,
    lastAdrenalineMaxMcg,
    lastBupiMaxMg,
    lastLidoMaxMg,
    lastLidoEpiMaxMg,

    anaphylaxisGrade2Mcg,
    anaphylaxisGrade3Mcg,
    anaphylaxisImMg,
    anaphylaxisFluidBolusMl,
    anaphylaxisMethylpredMg,
    anaphylaxisAdrenalineInfusionMinMcg,
    anaphylaxisAdrenalineInfusionMaxMcg,
    anaphylaxisNoradMin,
    anaphylaxisNoradMax,

    aclsEpiLabel,
    aclsAmio1Mg,
    aclsAmio2Mg,
    aclsLidoMinMg,
    aclsLidoMaxMg,
    aclsDefibLabel,
    aclsVentRateLabel,
    aclsFluidBolusMl,

    mtpEbvMl,
    mtpFiftyPercentLossMl,
    mtpTxaLabel,
    mtpCaCl2Label,
    mtpFibrinogenMinG,
    mtpFibrinogenMaxG,
    mtpFfpMinMl,
    mtpFfpMaxMl,
    mtpPccMinIU,
    mtpPccMaxIU,
    mtpRf7aMg,

    isPedsPneumo,
    pneumoNeedleSite,
    pneumoCatheterSpec,
    pneumoSimpleTubeFr,
    pneumoTraumaTubeFr,
    pneumoFluidBolusMl,

    airwayFireDexaMg,
    airwayFireEttNote,

    fesVtMin,
    fesVtMax,
    fesVtUpperNonArds,
    fesPbwCaution,
    fesNoradMinMcgMin,
    fesNoradMaxMcgMin,
    fesDobutaMinMcgMin,
    fesDobutaMaxMcgMin,
    fesFluidTryLabel,
  };
}

export function getStickyDoseHighlights(
  protocolId: string,
  doses: ReturnType<typeof computeEmergencyDoses>
): StickyDoseHighlight[] {
  if (!doses.isValidWeight) {
    return [
      {
        label: 'Doz Hesabı',
        value: 'Geçerli kilo girin (1–300 kg)',
        tone: 'red',
      },
    ];
  }

  switch (protocolId) {
    case 'mh':
    case 'dantrolene':
      return [
        {
          label: 'Dantrolen (2,5 mg/kg)',
          value: `${doses.initialDoseMg} mg IV`,
          tone: 'red',
        },
        {
          label: 'Dantrium (20 mg)',
          value: `${doses.dantriumVials} flk · ${doses.dantriumWaterMl} mL steril su`,
          tone: 'amber',
        },
        {
          label: 'Ryanodex (250 mg)',
          value: `${doses.ryanodexVials} flk · ${doses.ryanodexWaterMl} mL`,
          tone: 'emerald',
        },
      ];

    case 'bronchospasm':
      return [
        {
          label: 'Adrenalin IV',
          value: `${doses.adrenalinBolusMcg} mcg`,
          tone: 'red',
        },
        {
          label: 'MgSO₄ (20 dk)',
          value: `${doses.magnesiumGrams} g`,
          tone: 'amber',
        },
        {
          label: 'Ketamin IV',
          value: `${doses.ketamineBolusMg} mg`,
          tone: 'blue',
        },
      ];

    case 'laryngospasm':
      return [
        {
          label: 'Süksinilkolin',
          value: `${doses.succinylcholineIvMg} mg IV · ${doses.succinylcholineImMg} mg IM`,
          tone: 'red',
        },
        {
          label: 'Propofol IV',
          value: `${doses.propofolLaryngoMg} mg`,
          tone: 'blue',
        },
        {
          label: 'Atropin IV',
          value: `${doses.atropineLaryngoMg} mg`,
          tone: 'amber',
        },
      ];

    case 'airway-crisis':
    case 'cico':
      return [
        {
          label: 'Sugammadeks (16 mg/kg)',
          value: `${doses.sugammadexMg} mg (${doses.sugammadexVials200}×200 mg)`,
          tone: 'red',
        },
        {
          label: 'Atropin IV',
          value: `${doses.atropineCicoMg} mg`,
          tone: 'amber',
        },
        {
          label: 'eFONA',
          value: doses.isPediatric
            ? 'Cerrahi KONTRENDİKE (İğne / KBB)'
            : 'No.10 Bistüri + 15 Fr Bougie + ETT 6.0',
          tone: 'blue',
        },
      ];

    case 'airway-obstruction':
      return [
        {
          label: 'Neb. Adrenalin (1:1000)',
          value: `${doses.nebAdrenalineMl} mL`,
          tone: 'red',
        },
        {
          label: 'Deksametazon IV',
          value: `${doses.dexamethasoneObsMg} mg`,
          tone: 'amber',
        },
        {
          label: 'Propofol IV',
          value: `${doses.propofolObsMg} mg`,
          tone: 'blue',
        },
      ];

    case 'aspiration':
      return [
        {
          label: 'Vt (6–8 mL/kg)',
          value: `${doses.aspirationVtMin}–${doses.aspirationVtMax} mL`,
          tone: 'blue',
        },
        {
          label: 'Kaflı ETT',
          value: doses.isPediatric
            ? '(Yaş/4) + 3,5 mm'
            : doses.weightNum < 55
              ? 'ID 7.0 mm'
              : 'ID 7.5–8.0 mm',
          tone: 'red',
        },
        {
          label: 'NGT',
          value: doses.isPediatric ? '8–12 Fr' : '14–16 Fr',
          tone: 'amber',
        },
      ];

    case 'pe':
      return [
        {
          label: 'Alteplaz (2 sa)',
          value: `${doses.alteplase2hMg} mg`,
          tone: 'red',
        },
        {
          label: 'Alteplaz (15 dk)',
          value: `${doses.alteplase15mMg} mg`,
          tone: 'amber',
        },
        {
          label: 'UFH Bolus / İnf.',
          value: `${doses.ufhBolusUnits} Ü · ${doses.ufhInfusionUnitsHr} Ü/sa`,
          tone: 'blue',
        },
      ];

    case 'vae':
      return [
        {
          label: 'Adrenalin İnf.',
          value: `${doses.vaeAdrenalineLowMcgMin}–${doses.vaeAdrenalineHighMcgMin} mcg/dk`,
          tone: 'red',
        },
        {
          label: 'Sağ IJV Derinlik',
          value: doses.isPediatric ? 'USG + EKG kılavuzlu' : '13–16 cm (kavo-atriyal)',
          tone: 'blue',
        },
      ];

    case 'last':
      return [
        {
          label: '%20 Lipid Bolus',
          value: `${doses.lastLipidBolusMl} mL (2–3 dk)`,
          tone: 'red',
        },
        {
          label: 'Lipid İnf. / Maks',
          value: `${doses.lastLipidInfusionMlMin} mL/dk · Maks ${doses.lastLipidMaxMl} mL`,
          tone: 'amber',
        },
        {
          label: 'Adrenalin MAKS',
          value: `≤${doses.lastAdrenalineMaxMcg} mcg (<1 mcg/kg)`,
          tone: 'blue',
        },
      ];

    case 'anaphylaxis':
      return [
        {
          label: 'Adrenalin IV (Gr 3)',
          value: `${doses.anaphylaxisGrade3Mcg} mcg`,
          tone: 'red',
        },
        {
          label: 'Adrenalin IM',
          value: `${doses.anaphylaxisImMg} mg`,
          tone: 'amber',
        },
        {
          label: 'Kristalloid Bolus',
          value: `${doses.anaphylaxisFluidBolusMl} mL`,
          tone: 'blue',
        },
      ];

    case 'acls':
      return [
        {
          label: 'Adrenalin',
          value: doses.aclsEpiLabel,
          tone: 'red',
        },
        {
          label: 'Defibrilasyon',
          value: doses.aclsDefibLabel,
          tone: 'amber',
        },
        {
          label: 'Amiodaron',
          value: `${doses.aclsAmio1Mg} mg (2. doz ${doses.aclsAmio2Mg} mg)`,
          tone: 'blue',
        },
      ];

    case 'mtp':
      return [
        {
          label: 'TXA',
          value: doses.mtpTxaLabel,
          tone: 'red',
        },
        {
          label: '%10 CaCl₂',
          value: doses.mtpCaCl2Label,
          tone: 'amber',
        },
        {
          label: 'Fibrinojen / EBV',
          value: `${doses.mtpFibrinogenMinG}–${doses.mtpFibrinogenMaxG} g · EBV ${doses.mtpEbvMl} mL`,
          tone: 'blue',
        },
      ];

    case 'tension-pneumothorax':
      return [
        {
          label: 'İğne Dekompresyon',
          value: doses.isPedsPneumo ? '2. İKA MCL (18–20G)' : '4–5. İKA AAL/MAL (14G ≥5 cm)',
          tone: 'red',
        },
        {
          label: 'Toraks Tüpü',
          value: doses.pneumoTraumaTubeFr,
          tone: 'amber',
        },
        {
          label: 'Sıvı Bolusu',
          value: `${doses.pneumoFluidBolusMl} mL`,
          tone: 'blue',
        },
      ];

    case 'airway-fire':
      return [
        {
          label: 'İLK 3 SANİYE',
          value: 'ETT Çıkar · O₂ Kes · Salin Dök',
          tone: 'red',
        },
        {
          label: 'Deksametazon IV',
          value: `${doses.airwayFireDexaMg} mg`,
          tone: 'amber',
        },
        {
          label: 'Re-entübasyon',
          value: doses.isPediatric ? '0,5 mm küçük kaflı ETT' : 'ID 6,0–7,0 mm kaflı ETT',
          tone: 'blue',
        },
      ];

    case 'fes':
      return [
        {
          label: doses.fesPbwCaution ? 'Vt (PBW GİRİN! TBW DEĞİL)' : 'Vt (4–6 mL/kg PBW)',
          value: `${doses.fesVtMin}–${doses.fesVtMax} mL (Pplat <30)`,
          tone: doses.fesPbwCaution ? 'amber' : 'blue',
        },
        {
          label: 'Noradrenalin İnf.',
          value: `${doses.fesNoradMinMcgMin}–${doses.fesNoradMaxMcgMin} mcg/dk`,
          tone: 'red',
        },
        {
          label: 'İlaç Kuralı',
          value: 'Övolemi · Heparin YASAK',
          tone: 'amber',
        },
      ];

    default:
      return [
        {
          label: 'Hasta Kilosu',
          value: `${doses.weightNum} kg${doses.isPediatric ? ' (Pediatrik)' : ''}`,
          tone: 'blue',
        },
      ];
  }
}
