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

  // 16. High / Total Spinal Anesthesia
  totalSpinalEpiBridgeLabel: string;
  totalSpinalEpiArrestLabel: string;
  totalSpinalAtropineLabel: string;
  totalSpinalEphedrineLabel: string;
  totalSpinalPhenylephrineLabel: string;
  totalSpinalFluidBolusMl: number;
  totalSpinalKetamineLabel: string;
  totalSpinalMidazolamMg: number;

  // 17. Intraop MI
  miEsmololBolusMg: number;
  miEsmololInfMinMgMin: number;
  miEsmololInfMaxMgMin: number;
  miUfhMinIu: number;
  miUfhMaxIu: number;

  // 18. Malignant Arrhythmias
  arrDefibLabel: string;
  arrCardioversionLabel: string;
  arrAmioLabel: string;
  arrTorsadesMgLabel: string;
  arrAdenosineLabel: string;

  // 19. Intraop Bradycardia
  bradyAtropineLabel: string;
  bradyEpiLabel: string;
  bradyDopamineRangeMcgMin: string;

  // 20. Intraop Hypoglycemia
  hypoDextroseLabel: string;
  hypoDextroseGrams: string;
  hypoGlucagonLabel: string;

  // 21. Myxedema Coma
  myxedemaHydrocortLabel: string;
  myxedemaT4Label: string;
  myxedemaT3Label: string;

  // 22. Pheochromocytoma Crisis
  pheoSnpRangeMcgMin: string;
  pheoMgLoadLabel: string;
  pheoEsmololBolusMg: number;

  // 23. Adrenal Crisis
  adrenalHydrocortLabel: string;
  adrenalFluid1hLabel: string;
  adrenalNoradRangeMcgMin: string;

  // 24. ICP Crisis (KİBAS / Akut İKB Krizi)
  icpMannitolLowG: number;
  icpMannitolLowMl: number;
  icpMannitolMidG: number;
  icpMannitolMidMl: number;
  icpMannitolHighG: number;
  icpMannitolHighMl: number;
  icpHts3Label: string;
  icpHts234Label: string;
  icpThiopentalLoadMinMg: number;
  icpThiopentalLoadMaxMg: number;
  icpThiopentalInfMinMgHr: number;
  icpThiopentalInfMaxMgHr: number;
  icpPropofolBolusMinMg: number;
  icpPropofolBolusMaxMg: number;
  icpPropofolInfMinMgHr: number;
  icpPropofolInfMaxMgHr: number;
  icpFentanylMinMcg: number;
  icpFentanylMaxMcg: number;
  icpLidocaineMg: number;
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

  // 16. High / Total Spinal Anesthesia
  const totalSpinalEpiBridgeLabel = isPediatric
    ? `${Math.max(5, Math.round(w * 1))}–${Math.max(10, Math.round(w * 2))} mcg IV`
    : '10–50 mcg IV (yanıt yoksa 100 mcg)';
  const totalSpinalEpiArrestLabel = isPediatric
    ? `${Math.min(1000, Math.round(w * 10))} mcg (${+(Math.min(1, w * 0.01)).toFixed(2)} mg) IV`
    : '1 mg (1000 mcg) IV her 3–5 dk (ACLS)';
  const totalSpinalAtropineLabel = isPediatric
    ? `${+(Math.min(0.5, w * 0.02)).toFixed(2)} mg IV (0,02 mg/kg)`
    : '0,5–1 mg IV (maks 3 mg)';
  const totalSpinalEphedrineLabel = isPediatric
    ? `${+(w * 0.1).toFixed(1)}–${+(w * 0.2).toFixed(1)} mg IV`
    : '10–25 mg IV';
  const totalSpinalPhenylephrineLabel = isPediatric
    ? `${Math.round(w * 1)}–${Math.round(w * 2)} mcg IV`
    : '50–100 mcg IV';
  const totalSpinalFluidBolusMl = isPediatric
    ? Math.min(1000, Math.round(w * 20))
    : Math.min(1000, Math.max(500, Math.round(w * 10)));
  const totalSpinalKetamineLabel = `${Math.round(w * 0.5)}–${Math.round(w * 1)} mg IV`;
  const totalSpinalMidazolamMg = +(Math.min(3, Math.max(0.5, w * 0.03))).toFixed(1);

  // 17. Intraop MI
  const miEsmololBolusMg = Math.round(w * 0.5);
  const miEsmololInfMinMgMin = +(w * 0.05).toFixed(1);
  const miEsmololInfMaxMgMin = +(w * 0.2).toFixed(1);
  const miUfhMinIu = Math.min(5000, Math.round(w * 60));
  const miUfhMaxIu = Math.min(5000, Math.round(w * 70));

  // 18. Malignant Arrhythmias
  const arrDefibLabel = isPediatric
    ? `${Math.round(w * 2)} J → ${Math.round(w * 4)} J (2→4 J/kg)`
    : '150–200 J Bifazik (Defibrilasyon)';
  const arrCardioversionLabel = isPediatric
    ? `${Math.round(w * 0.5)}–${Math.round(w * 1)} J → ${Math.round(w * 2)} J Senk.`
    : '100 J (VT) · 50–100 J (SVT) · 120–200 J (AF)';
  const arrAmioLabel = isPediatric
    ? `${Math.min(300, Math.round(w * 5))} mg IV (5 mg/kg)`
    : '300 mg IV (VF/pVT) · 150 mg/10 dk (Nabızlı VT)';
  const arrTorsadesMgLabel = isPediatric
    ? `${Math.min(2000, Math.round(w * 25))}–${Math.min(2000, Math.round(w * 50))} mg IV (25–50 mg/kg)`
    : '2 g (2000 mg) IV (1–2 dk; stabilde 10–15 dk)';
  const arrAdenosineLabel = isPediatric
    ? `${+(Math.min(6, w * 0.1)).toFixed(1)} mg → ${+(Math.min(12, w * 0.2)).toFixed(1)} mg`
    : '6 mg → 12 mg hızlı IV puşe + SF flush';

  // 19. Intraop Bradycardia
  const bradyAtropineLabel = isPediatric
    ? `${+(Math.min(0.5, w * 0.02)).toFixed(2)} mg IV (0,02 mg/kg)`
    : '1 mg IV her 3–5 dk (maks 3 mg · AHA 2020)';
  const bradyEpiLabel = isPediatric
    ? `${Math.min(1000, Math.round(w * 10))} mcg IV (10 mcg/kg — HR<60 + KPR!)`
    : '2–10 mcg/dk IV infüzyon (köprü: 10–50 mcg bolus)';
  const bradyDopamineRangeMcgMin = `${Math.round(w * 5)}–${Math.round(w * 20)} mcg/dk`;

  // 20. Intraop Hypoglycemia (Rule of 50 in pediatrics — NO D50!)
  const hypoDextroseLabel = isPediatric
    ? `${Math.round(w * 2)}–${Math.round(w * 5)} mL %10 Dekstroz (2–5 mL/kg)`
    : '100–250 mL %10 Dekstroz (veya 25–50 mL %50 Dekstroz)';
  const hypoDextroseGrams = isPediatric
    ? `${+(w * 0.2).toFixed(1)}–${+(w * 0.5).toFixed(1)} g glukoz`
    : '12,5–25 g glukoz IV';
  const hypoGlucagonLabel = w < 20 ? '0,5 mg IM/SC (<20 kg)' : '1 mg IM/SC (IV yol yoksa)';

  // 21. Myxedema Coma
  const myxedemaHydrocortLabel = isPediatric
    ? `${Math.min(100, Math.max(25, Math.round(w * 2)))} mg IV (2 mg/kg)`
    : '100 mg IV bolus → 50–100 mg her 6–8 saat';
  const myxedemaT4Label = isPediatric
    ? `${Math.round(w * 5)}–${Math.round(w * 10)} mcg IV yükleme`
    : '200–400 mcg IV yükleme (yaşlı/KAH: 200 mcg)';
  const myxedemaT3Label = isPediatric
    ? 'Pediatrik Endokrinoloji konsültasyonu'
    : '5–20 mcg IV → 2,5–10 mcg/8 sa (KAH/aritmide kaçın)';

  // 22. Pheochromocytoma Crisis
  const pheoSnpRangeMcgMin = `${+(w * 0.3).toFixed(1)}–${+(w * 2).toFixed(1)} mcg/dk`;
  const pheoMgLoadLabel = isPediatric
    ? `${Math.min(2000, Math.round(w * 40))} mg IV (40 mg/kg)`
    : '2–4 g IV (15–20 dk yükleme) → 1–2 g/sa';
  const pheoEsmololBolusMg = Math.round(w * 0.5);

  // 23. Adrenal Crisis
  const adrenalHydrocortLabel = isPediatric
    ? `${Math.min(100, Math.max(25, Math.round(w * 2)))} mg IV (2 mg/kg)`
    : '100 mg IV bolus → 200 mg/24 sa infüzyon (50 mg/6 sa)';
  const adrenalFluid1hLabel = isPediatric
    ? `${Math.min(1000, Math.round(w * 20))} mL dengeli kristaloid / %0,9 NaCl (20 mL/kg)`
    : '1000 mL %0,9 NaCl / dengeli kristaloid (1. saat)';
  const adrenalNoradRangeMcgMin = `${+(w * 0.05).toFixed(1)}–${+(w * 0.5).toFixed(1)} mcg/dk`;

  // 24. ICP Crisis (KİBAS / Akut İKB Krizi)
  // %20 Mannitol = 0,2 g/mL -> 5 mL/g (0,25 g/kg = 1,25 mL/kg; 0,5 g/kg = 2,5 mL/kg; 1 g/kg = 5 mL/kg)
  const icpMannitolLowG = +(w * 0.25).toFixed(1);
  const icpMannitolLowMl = Math.round(w * 1.25);
  const icpMannitolMidG = +(w * 0.5).toFixed(1);
  const icpMannitolMidMl = Math.round(w * 2.5);
  const icpMannitolHighG = +(w * 1.0).toFixed(1);
  const icpMannitolHighMl = Math.round(w * 5);
  const hts3MinMl = Math.min(250, Math.round(w * 2));
  const hts3MaxMl = Math.min(250, Math.round(w * 5));
  const icpHts3Label =
    hts3MinMl === hts3MaxMl
      ? `${hts3MaxMl} mL (maks/bolus)`
      : `${hts3MinMl}–${hts3MaxMl} mL`;
  const icpHts234Label = isPediatric
    ? `${Math.min(30, +(w * 0.5).toFixed(1))} mL (0,5 mL/kg, maks 30 mL · SANTRAL!)`
    : '30 mL (10–20 dk · YALNIZCA SANTRAL HAT!)';
  const icpThiopentalLoadMinMg = Math.round(w * 3);
  const icpThiopentalLoadMaxMg = Math.round(w * 5);
  const icpThiopentalInfMinMgHr = Math.round(w * 1);
  const icpThiopentalInfMaxMgHr = Math.round(w * 5);
  const icpPropofolBolusMinMg = Math.round(w * 1);
  const icpPropofolBolusMaxMg = Math.round(w * 2);
  const icpPropofolInfMinMgHr = Math.round(w * 4);
  const icpPropofolInfMaxMgHr = Math.round(w * 6);
  const icpFentanylMinMcg = Math.round(w * 1);
  const icpFentanylMaxMcg = Math.round(w * 2);
  const icpLidocaineMg = Math.min(150, Math.round(w * 1.5));

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

    totalSpinalEpiBridgeLabel,
    totalSpinalEpiArrestLabel,
    totalSpinalAtropineLabel,
    totalSpinalEphedrineLabel,
    totalSpinalPhenylephrineLabel,
    totalSpinalFluidBolusMl,
    totalSpinalKetamineLabel,
    totalSpinalMidazolamMg,

    miEsmololBolusMg,
    miEsmololInfMinMgMin,
    miEsmololInfMaxMgMin,
    miUfhMinIu,
    miUfhMaxIu,

    arrDefibLabel,
    arrCardioversionLabel,
    arrAmioLabel,
    arrTorsadesMgLabel,
    arrAdenosineLabel,

    bradyAtropineLabel,
    bradyEpiLabel,
    bradyDopamineRangeMcgMin,

    hypoDextroseLabel,
    hypoDextroseGrams,
    hypoGlucagonLabel,

    myxedemaHydrocortLabel,
    myxedemaT4Label,
    myxedemaT3Label,

    pheoSnpRangeMcgMin,
    pheoMgLoadLabel,
    pheoEsmololBolusMg,

    adrenalHydrocortLabel,
    adrenalFluid1hLabel,
    adrenalNoradRangeMcgMin,

    icpMannitolLowG,
    icpMannitolLowMl,
    icpMannitolMidG,
    icpMannitolMidMl,
    icpMannitolHighG,
    icpMannitolHighMl,
    icpHts3Label,
    icpHts234Label,
    icpThiopentalLoadMinMg,
    icpThiopentalLoadMaxMg,
    icpThiopentalInfMinMgHr,
    icpThiopentalInfMaxMgHr,
    icpPropofolBolusMinMg,
    icpPropofolBolusMaxMg,
    icpPropofolInfMinMgHr,
    icpPropofolInfMaxMgHr,
    icpFentanylMinMcg,
    icpFentanylMaxMcg,
    icpLidocaineMg,
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

    case 'total-spinal':
      return [
        {
          label: 'Erken Adrenalin (Köprü)',
          value: doses.totalSpinalEpiBridgeLabel,
          tone: 'red',
        },
        {
          label: 'Atropin / Efedrin',
          value: `${doses.totalSpinalAtropineLabel.split(' (')[0]} · ${doses.totalSpinalEphedrineLabel}`,
          tone: 'amber',
        },
        {
          label: 'Hızlı Kristaloid + Pozisyon',
          value: `${doses.totalSpinalFluidBolusMl} mL · Bacak Kaldır (LUD)`,
          tone: 'blue',
        },
      ];

    case 'intraop-mi':
      return [
        {
          label: 'Esmolol (MVO₂ / HR)',
          value: `${doses.miEsmololBolusMg} mg → ${doses.miEsmololInfMinMgMin}–${doses.miEsmololInfMaxMgMin} mg/dk`,
          tone: 'blue',
        },
        {
          label: 'Nitrogliserin / Aspirin',
          value: 'NTG 50–100 mcg (RV/PDE-5 YASAK!)',
          tone: 'red',
        },
        {
          label: 'UFH (Cerrahi Onaylı)',
          value: `${doses.miUfhMinIu}–${doses.miUfhMaxIu} IU IV`,
          tone: 'amber',
        },
      ];

    case 'malignant-arrhythmias':
      return [
        {
          label: 'Defibrilasyon / Senk. Şok',
          value: doses.arrDefibLabel,
          tone: 'red',
        },
        {
          label: 'Amiodaron (VF/VT)',
          value: doses.arrAmioLabel,
          tone: 'amber',
        },
        {
          label: 'Torsades (Uzun QT)',
          value: `MgSO₄ ${doses.arrTorsadesMgLabel.split(' (')[0]} (Amio YASAK!)`,
          tone: 'blue',
        },
      ];

    case 'intraop-bradycardia':
      return [
        {
          label: 'Atropin (Sinüs / Nodal)',
          value: doses.bradyAtropineLabel.split(' (')[0],
          tone: 'amber',
        },
        {
          label: 'Adrenalin / Pacing',
          value: doses.bradyEpiLabel.split(' (')[0],
          tone: 'red',
        },
        {
          label: 'İstisna Kuralı',
          value: 'Mobitz II / Tam Blok / Nakil → TCP',
          tone: 'blue',
        },
      ];

    case 'intraop-hypoglycemia':
      return [
        {
          label: 'Acil İV Dekstroz',
          value: doses.hypoDextroseLabel,
          tone: 'red',
        },
        {
          label: 'Wernicke Koruması',
          value: 'Önce Tiamin 100 mg IV (Alkol/Maln.)',
          tone: 'amber',
        },
        {
          label: '15 dk Kontrol Hedefi',
          value: 'KŞ 100–180 mg/dL · Glukagon IM',
          tone: 'emerald',
        },
      ];

    case 'myxedema-coma':
      return [
        {
          label: '1. ÖNCE Hidrokortizon!',
          value: doses.myxedemaHydrocortLabel.split(' →')[0],
          tone: 'red',
        },
        {
          label: '2. İV Levotiroksin (T4)',
          value: doses.myxedemaT4Label.split(' (')[0],
          tone: 'amber',
        },
        {
          label: 'Isıtma Kuralı',
          value: 'Pasif Isıtma (Aktif Isıtma = ŞOK!)',
          tone: 'blue',
        },
      ];

    case 'pheochromocytoma-crisis':
      return [
        {
          label: 'Faz 1 · Önce α-Blokaj',
          value: `Fentolamin 1–5 mg · SNP ${doses.pheoSnpRangeMcgMin}`,
          tone: 'red',
        },
        {
          label: 'MgSO₄ & Saf β Yasağı',
          value: `${doses.pheoMgLoadLabel.split(' (')[0]} · Labetalol YASAK!`,
          tone: 'amber',
        },
        {
          label: 'Faz 2 (Ligasyon Sonrası)',
          value: 'Noradrenalin + Vazopressin + KŞ!',
          tone: 'blue',
        },
      ];

    case 'adrenal-crisis':
      return [
        {
          label: '1. İV Hidrokortizon',
          value: doses.adrenalHydrocortLabel.split(' →')[0],
          tone: 'red',
        },
        {
          label: '2. Hızlı Kristaloid',
          value: doses.adrenalFluid1hLabel.split(' (')[0],
          tone: 'blue',
        },
        {
          label: '3. Noradrenalin Köprü',
          value: `${doses.adrenalNoradRangeMcgMin} · KŞ & K⁺ Kontrol`,
          tone: 'amber',
        },
      ];

    case 'icp-crisis':
      return [
        {
          label: '%20 Mannitol (0,5–1 g/kg)',
          value: `${doses.icpMannitolMidG}–${doses.icpMannitolHighG} g (${doses.icpMannitolMidMl}–${doses.icpMannitolHighMl} mL)`,
          tone: 'red',
        },
        {
          label: '%3 HTS / %23,4 Santral',
          value: `${doses.icpHts3Label} · ${doses.isPediatric ? `${Math.min(30, +(doses.weightNum * 0.5).toFixed(1))} mL` : '30 mL'} Santral`,
          tone: 'amber',
        },
        {
          label: 'Tier 3 Tiyopental / CPP',
          value: `${doses.icpThiopentalLoadMinMg}–${doses.icpThiopentalLoadMaxMg} mg · CPP 60–70`,
          tone: 'blue',
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
