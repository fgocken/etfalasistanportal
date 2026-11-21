import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Gauge,
  Layers,
  ShieldAlert,
  Sliders,
  Zap,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';

interface QuantitativeNmbMonitorsModuleProps {
  isDark: boolean;
}

interface ModalitySpec {
  id: 'amg' | 'emg' | 'kmg' | 'mmg';
  shortName: string;
  fullName: string;
  physics: string;
  signalUnit: string;
  freeThumbRequired: string;
  tuckedArmScore: string;
  baselineOvershoot: string;
  cauteryImmunity: string;
  clinicalDevices: string;
  accent: 'emerald' | 'sky' | 'amber' | 'slate';
}

const MODALITY_SPECS: ModalitySpec[] = [
  {
    id: 'emg',
    shortName: 'EMG',
    fullName: 'Elektromiyografi',
    physics: 'Ulnar sinir uyarısı sonrası kasta oluşan bileşik kas aksiyon potansiyelini (cMAP) yüzey elektrotlarıyla ölçer',
    signalUnit: 'Bileşik Kas Aksiyon Potansiyeli (mV / alan)',
    freeThumbRequired: 'Hayır (İzometrik / hareketsiz ölçüm)',
    tuckedArmScore: 'Mükemmel — Örtülü kolda tek güvenilir standart',
    baselineOvershoot: 'Yok (Bazal TOFR ≈ 0.98–1.00; normalizasyon gerekmez)',
    cauteryImmunity: 'Düşük (Monopolar koter geçici RF gürültüsü oluşturur)',
    clinicalDevices: 'TwitchView · TetraGraph · GE E-NMT (EMG modu)',
    accent: 'sky',
  },
  {
    id: 'amg',
    shortName: 'AMG',
    fullName: 'Akseleromiyografi (1D / 3D)',
    physics: 'Newton’un ikinci yasasına (F = m · a) göre başparmağın kasılma ivmesini piezoelektrik ivmeölçerle ölçer',
    signalUnit: 'İvme (m/sn² → piezoelektrik voltaj)',
    freeThumbRequired: 'Evet — Başparmak kesinlikle serbest hareket etmeli',
    tuckedArmScore: 'Zayıf — Örtü/ekartör başparmağı engellerse ölçüm bozulur',
    baselineOvershoot: 'Sık (Bazal TOFR₀ 1.05–1.25; normalizasyon veya ≥ 1.00 eşiği şart)',
    cauteryImmunity: 'Yüksek (Mekanik-piezoelektrik yapı RF kotere dirençlidir)',
    clinicalDevices: 'TOF-Watch SX (1D) · Stimpod (3D) · TOFscan (3D)',
    accent: 'emerald',
  },
  {
    id: 'kmg',
    shortName: 'KMG',
    fullName: 'Kinemiyografi',
    physics: 'Başparmak ile işaret parmağı arasındaki esnek piezoelektrik şeridin bükülmesiyle oluşan voltajı ölçer',
    signalUnit: 'Piezoelektrik bükülme gerilimi (mV)',
    freeThumbRequired: 'Evet — Başparmak–işaret parmağı serbest kapanmalı',
    tuckedArmScore: 'Zayıf — Sensör kayması ve örtü basısına hassastır',
    baselineOvershoot: 'Hafif (Genellikle 1.00 civarı; şerit açısına duyarlı)',
    cauteryImmunity: 'Yüksek (RF gürültüsüne dirençli, mekanik harekete duyarlı)',
    clinicalDevices: 'GE Datex-Ohmeda M-NMT MechanoSensor',
    accent: 'amber',
  },
  {
    id: 'mmg',
    shortName: 'MMG',
    fullName: 'Mekanomiyografi (Araştırma Altın Standardı)',
    physics: 'Başparmağa 200–300 g sabit ön yükleme (preload) uygulayarak gerçek izometrik kasılma kuvvetini ölçer',
    signalUnit: 'İzometrik Kuvvet (Newton / gram-kuvvet)',
    freeThumbRequired: 'Sabit rig ve ön yükleme aparatı gerektirir',
    tuckedArmScore: 'Uygun değil — Yalnızca araştırma laboratuvarı',
    baselineOvershoot: 'Yok (Referans 1.00; tüm cihazlar MMG’ye göre valide edilir)',
    cauteryImmunity: 'Çok Yüksek',
    clinicalDevices: 'Araştırma düzenekleri (Klinik ticari ürün artık üretilmiyor)',
    accent: 'slate',
  },
];

type InterferenceType = 'none' | 'cautery' | 'cold';

interface LabPreset {
  id: string;
  label: string;
  trueTofr: number; // 0.30 - 1.00 (MMG reference)
  amgBaseline: number; // 1.00 - 1.25
  amgNormalized: boolean;
  tuckedArm: boolean;
  interference: InterferenceType;
  note: string;
}

const LAB_PRESETS: LabPreset[] = [
  {
    id: 'unnorm-trap',
    label: 'AMG Normalizasyon Tuzağı',
    trueTofr: 0.82,
    amgBaseline: 1.16,
    amgNormalized: false,
    tuckedArm: false,
    interference: 'none',
    note: 'Gerçek MMG TOFR = 0.82 (rezidüel blok!) olmasına rağmen normalize edilmemiş AMG bazal aşım (1.16) nedeniyle 0.95 gösterip sahte güvenlik hissi verir.',
  },
  {
    id: 'tucked-robotic',
    label: 'Örtülü Kol (Laparoskopi)',
    trueTofr: 0.74,
    amgBaseline: 1.10,
    amgNormalized: true,
    tuckedArm: true,
    interference: 'none',
    note: 'Kol yanlarda sıkı örtülüyken başparmak serbest hareket edemez: AMG ve KMG mekanik olarak tıkanır; yalnızca EMG (cMAP) doğru TOFR = 0.74 okur.',
  },
  {
    id: 'norm-fixed',
    label: 'Normalize AMG = EMG Uyumu',
    trueTofr: 0.82,
    amgBaseline: 1.16,
    amgNormalized: true,
    tuckedArm: false,
    interference: 'none',
    note: 'Aynı hastada AMG değeri bazal TOFR₀ (1.16) ile bölündüğünde nTOFR = 0.82 olur ve EMG/MMG ile örtüşerek gizli rezidüel bloğu yakalar.',
  },
  {
    id: 'cautery',
    label: 'Monopolar Koter Artefaktı',
    trueTofr: 0.68,
    amgBaseline: 1.08,
    amgNormalized: true,
    tuckedArm: false,
    interference: 'cautery',
    note: 'Yüksek frekanslı monopolar koter sırasında EMG sinyali RF gürültüsüyle geçici olarak kesilebilir; piezoelektrik AMG ve KMG etkilenmez.',
  },
  {
    id: 'cold-hand',
    label: 'Soğuk Ekstremite (< 32 °C)',
    trueTofr: 0.78,
    amgBaseline: 1.10,
    amgNormalized: true,
    tuckedArm: false,
    interference: 'cold',
    note: 'Avuç içi sıcaklığı < 32 °C’ye indiğinde mekanik kasılma (AMG/KMG) zayıflarken EMG cMAP amplitüdü paradoksal uzar; ölçüm güvenilirliği bozulur.',
  },
  {
    id: 'safe-extub',
    label: 'Güvenli Ekstübasyon (≥ 0.95)',
    trueTofr: 0.96,
    amgBaseline: 1.12,
    amgNormalized: true,
    tuckedArm: false,
    interference: 'none',
    note: 'Açık kol, normotermik cilt (> 32 °C) ve normalize edilmiş ölçümde tüm kantitatif modaliteler (EMG, AMG, KMG) ≥ 0.90 ekstübasyon güvenliğini teyit eder.',
  },
];

const PITFALLS = [
  {
    title: '1. AMG Bazal Aşımı ("Reverse Fade" · TOFR₀ > 1.00) & Capron Kuralı',
    severity: 'critical' as const,
    body: 'NMB verilmeden önce yapılan AMG ölçümlerinde T₄ yanıtı sıklıkla T₁’den büyük çıkar (bazal TOFR₀ = 1.05–1.25). Nedeni, başparmağın her seyirmeden sonra tam başlangıç konumuna dönememesi ve elastik geri tepmedir. Eğer cihaz bu bazal değere bölünerek normalize edilmezse (nTOFR = TOFR / TOFR₀), ekranda 0.95 okunurken gerçek fizyolojik TOFR 0.80 olabilir! Capron (2004) ve ASA 2023’e göre: Kalibre/normalize edilmemiş AMG’de güvenli ekstübasyon için ≥ 0.90 değil, ≥ 1.00 beklenmelidir.',
  },
  {
    title: '2. Örtülü Kolda (Tucked Arm) AMG ve KMG Kullanımı',
    severity: 'critical' as const,
    body: 'Laparoskopik, robotik, baş-boyun ve prone cerrahilerde kol hastanın yanında sıkıca örtülür. Başparmağa temas eden en küçük örtü kıvrımı, jel ped veya ekartör AMG’nin ivmesini ve KMG şeridinin bükülmesini bozar; sonuç ya yanlış düşük ya da sahte yüksek TOFR verir. Örtülü kolda EMG (hareketsiz cMAP kaydı) zorunlu tercihtir.',
  },
  {
    title: '3. 1D AMG’de Eksensel Kayma ve El Adaptörü (Preload) Eksikliği',
    severity: 'warning' as const,
    body: 'Tek eksenli (1D) eski AMG sensörleri (örn. TOF-Watch SX) başparmak hareketinin ekseni değiştiğinde sinyal kaybeder; üretici elastik el adaptörü (preload) olmadan bazal drift hızlanır. Modern 3-eksenli (3D) AMG cihazları (TOFscan, Stimpod) X-Y-Z vektör bileşkesini hesaplayarak eksen hatasını azaltır, ancak serbest başparmak şartı yine de geçerlidir.',
  },
  {
    title: '4. EMG Cilt İmpedansı, Elektrot Kayması ve Direkt Kas Uyarısı',
    severity: 'warning' as const,
    body: 'EMG çok düşük voltajlı (mV) biyoelektrik sinyal kaydeder. Yağlı/terli cilt (> 5 kΩ impedans), gevşemiş toprak (ground) elektrodu veya elektrokoter gürültüsü cMAP şeklini bozabilir. Ayrıca stimülasyon akımı gereksiz yüksekse veya elektrotlar kas gövdesine kaydıysa sinir yerine doğrudan kas uyarılır ve sahte yüksek TOFR oluşur. Alkolle temizlik ve kuru cilt + indüksiyon sonrası NMB öncesi oto-kalibrasyon esastır.',
  },
  {
    title: '5. KMG (MechanoSensor) Web Boşluğu Hizalaması ve Sıkışma',
    severity: 'warning' as const,
    body: 'KMG şeridi başparmak ile işaret parmağı arasına sıkıca yerleştirilip bantlanmalıdır. Vakada el pozisyonu değişir veya bant gevşerse şeridin bükülme açısı değişir, T₁ kalibrasyon bazali kayar (drift) ve T₄/T₁ oranı dalgalanır.',
  },
];

const SCENARIO_MATRIX = [
  {
    scenario: 'Laparoskopik / Robotik / Baş-Boyun / Prone (Örtülü Kol)',
    firstChoice: 'EMG (TwitchView · TetraGraph · E-NMT)',
    alternative: 'Erişilebilir ayak varsa Posterior Tibial EMG / 3D AMG',
    avoid: 'Örtü altında sıkışmış 1D/3D AMG veya KMG',
  },
  {
    scenario: 'Açık Serbest Kol (Supin Elektif / Ortopedi / Genel Cerrahi)',
    firstChoice: 'EMG veya Kalibre 3D AMG (TOFscan / Stimpod)',
    alternative: 'KMG (M-NMT) veya El Adaptörlü Normalize 1D AMG',
    avoid: 'Normalize edilmemiş AMG’de 0.90 ile ekstübasyon (≥ 1.00 şart)',
  },
  {
    scenario: 'Yoğun Elektrokoterli Cerrahi (Açık Kol)',
    firstChoice: '3D AMG (RF kotere dirençli) veya Koter-Filtreli EMG',
    alternative: 'KMG (M-NMT MechanoSensor)',
    avoid: 'Toprak elektrodu zayıf / yüksek impedanslı EMG',
  },
  {
    scenario: 'Yüksek RNMB Riski (OSAS, Morbid Obezite, KOAH, İleri Yaş)',
    firstChoice: 'EMG (en yüksek tekrarlanabilirlik, bazal aşım yok)',
    alternative: 'Preload’lu Normalize 3D AMG (nTOFR ≥ 0.90)',
    avoid: 'Kalitatif PNS (elle/gözle) veya yalnızca klinik testler',
  },
  {
    scenario: 'Nöromüsküler Hastalık (Myastenia Gravis, Miyopati)',
    firstChoice: 'EMG (İndüksiyon öncesi bazal cMAP ve TOFR₀ kaydı ile)',
    alternative: 'Kalibre 3D AMG (bazal fade varlığı kaydedilerek)',
    avoid: 'Kalibrasyonsuz başlangıç veya standart yüksek NMB dozu',
  },
];

const REFERENCES = [
  {
    authors: 'Capron F, Alla F, Hottier C, Meistelman C, Fuchs-Buder T',
    title: 'Can acceleromyography detect low levels of residual paralysis? A probability approach to detect a mechanomyographic train-of-four ratio of 0.9',
    journal: 'Anesthesiology. 2004;100(5):1119–1124',
    pmid: '15114208',
  },
  {
    authors: 'Trager G, Michaud G, Deschamps S, Hemmerling TM',
    title: 'Comparison of phonomyography, kinemyography and mechanomyography for neuromuscular monitoring',
    journal: 'Can J Anaesth. 2006;53(2):130–135',
    pmid: '16434751',
  },
  {
    authors: 'Claudius C, Viby-Mogensen J',
    title: 'Acceleromyography for use in scientific and clinical practice: a systematic review of the evidence',
    journal: 'Anesthesiology. 2008;108(6):1117–1140',
    pmid: '18497614',
  },
  {
    authors: 'Naguib M, Brull SJ, Kopman AF, et al.',
    title: 'Consensus Statement on Perioperative Use of Neuromuscular Monitoring',
    journal: 'Anesth Analg. 2018;127(1):71–80',
    pmid: '29200077',
  },
  {
    authors: 'Bowdle A, Bussey L, Michaelsen K, et al.',
    title: 'Counting train-of-four twitch response: comparison of palpation to mechanomyography, acceleromyography, and electromyography',
    journal: 'Br J Anaesth. 2020;124(6):712–717',
    pmid: '32228867',
  },
  {
    authors: 'Thilen SR, Weigel WA, Todd MM, et al. (ASA Task Force)',
    title: '2023 American Society of Anesthesiologists Practice Guidelines for Monitoring and Antagonism of Neuromuscular Blockade',
    journal: 'Anesthesiology. 2023;138(1):13–41',
    pmid: '36520073',
  },
];

export const QuantitativeNmbMonitorsModule: React.FC<QuantitativeNmbMonitorsModuleProps> = ({ isDark }) => {
  const [trueTofr, setTrueTofr] = useState<number>(0.82);
  const [amgBaseline, setAmgBaseline] = useState<number>(1.16);
  const [amgNormalized, setAmgNormalized] = useState<boolean>(false);
  const [tuckedArm, setTuckedArm] = useState<boolean>(false);
  const [interference, setInterference] = useState<InterferenceType>('none');
  const [activePresetId, setActivePresetId] = useState<string>('unnorm-trap');

  const applyPreset = (preset: LabPreset) => {
    setTrueTofr(preset.trueTofr);
    setAmgBaseline(preset.amgBaseline);
    setAmgNormalized(preset.amgNormalized);
    setTuckedArm(preset.tuckedArm);
    setInterference(preset.interference);
    setActivePresetId(preset.id);
  };

  const sim = useMemo(() => {
    // 1. AMG calculation
    // Raw AMG = trueTofr * amgBaseline (overshoot / reverse fade)
    // If tucked arm: thumb cannot accelerate freely -> severely clipped/erratic reading
    const coldMechanicalFactor = interference === 'cold' ? 0.91 : 1.0;
    const rawAmg = Math.min(1.30, trueTofr * amgBaseline * coldMechanicalFactor);
    const displayedAmg = amgNormalized ? Math.min(1.05, rawAmg / amgBaseline) : rawAmg;
    const amgValid = !tuckedArm && interference !== 'cold';
    const amgSafeThreshold = amgNormalized ? 0.90 : 1.00;
    const amgFalseSafe = !tuckedArm && !amgNormalized && trueTofr < 0.90 && displayedAmg >= 0.90;

    // 2. EMG calculation
    // EMG measures cMAP electrically -> unaffected by tucked arm, no baseline overshoot (~1.00)
    // Affected transiently by monopolar cautery (RF noise) and cold extremity (prolonged Na+ inactivation)
    const emgDisplayed = interference === 'cold' ? Math.min(1.02, trueTofr * 1.04) : trueTofr;
    const emgValid = interference === 'none';

    // 3. KMG calculation
    // KMG piezoelectric bending strip -> unaffected by cautery, sensitive to tucked arm & slight sensor angle variance
    const kmgDisplayed = Math.min(1.04, trueTofr * 0.99 * coldMechanicalFactor);
    const kmgValid = !tuckedArm && interference !== 'cold';

    // Twitch amplitude arrays (T1..T4) relative to T1=1.0
    const makeTwitches = (ratio: number, damp = 1.0) => {
      const t1 = damp;
      const t4 = Math.max(0.05, Math.min(1.25, damp * ratio));
      const t2 = t1 + (t4 - t1) * 0.42;
      const t3 = t1 + (t4 - t1) * 0.76;
      return [t1, t2, t3, t4];
    };

    const amgTwitches = tuckedArm ? [0.22, 0.19, 0.21, 0.18] : makeTwitches(displayedAmg, interference === 'cold' ? 0.72 : 0.95);
    const emgTwitches = makeTwitches(emgDisplayed, interference === 'cold' ? 1.08 : 0.95);
    const kmgTwitches = tuckedArm ? [0.18, 0.16, 0.15, 0.17] : makeTwitches(kmgDisplayed, interference === 'cold' ? 0.70 : 0.92);

    // Clinical verdict & status
    let status: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = '';
    let guidance = '';

    if (tuckedArm) {
      status = 'critical';
      headline = 'Örtülü Kol Uyarısı: AMG ve KMG Mekanik Olarak Engellendi — Yalnızca EMG Güvenilir!';
      guidance = `Başparmak serbestçe hareket edemediğinden AMG ve KMG sinyali bozulmuştur. EMG elektriksel cMAP kaydı hareket gerektirmez ve gerçek TOFR = ${emgDisplayed.toFixed(2)} değerini doğru ölçer (${emgDisplayed >= 0.90 ? 'Ekstübasyon için güvenli ≥ 0.90' : 'Rezidüel blok < 0.90 — antagonizma uygulayın'}).`;
    } else if (amgFalseSafe) {
      status = 'critical';
      headline = `TEHLİKE: Sahte Güvenli AMG (${displayedAmg.toFixed(2)}) — Gerçek Fizyolojik TOFR = ${trueTofr.toFixed(2)}!`;
      guidance = `Bazal AMG aşımı (TOFR_{0} = ${amgBaseline.toFixed(2)}) düzeltilmediği için ekran ≥ 0.90 görünse de hasta hâlâ rezidüel bloktadır! Normalize edildiğinde nTOFR = ${(rawAmg / amgBaseline).toFixed(2)} çıkar. Capron (2004) & ASA 2023 kuralı: Normalize edilmemiş AMG’de ekstübasyon eşiği ≥ 1.00 olmalıdır; ya da normalizasyonu açın / EMG kullanın.`;
    } else if (interference === 'cautery') {
      status = 'warning';
      headline = 'Monopolar Elektrokoter Aktif: EMG’de Geçici RF Paraziti';
      guidance = `Yüksek frekanslı koter akımı sırasında EMG cMAP trasesinde geçici artefakt oluşur ve modern cihazlar ölçümü birkaç saniye dondurur; koter durduğunda EMG saniyeler içinde temiz TOFR = ${trueTofr.toFixed(2)} okur. Piezoelektrik AMG ve KMG RF gürültüsünden etkilenmez.`;
    } else if (interference === 'cold') {
      status = 'warning';
      headline = 'Soğuk Ekstremite (< 32 °C): Mekanik & Elektriksel Sapma';
      guidance = `Düşük cilt sıcaklığı kas kasılmasını yavaşlatıp mekanik AMG/KMG yanıtını düşürürken, Na^{+} kanallarının geç kapanması nedeniyle EMG cMAP amplitüdünü paradoksal olarak artırabilir. Güvenilir kantitatif ölçüm için avuç içi ısısını > 32 °C (ideal ≥ 33 °C) koruyun.`;
    } else if (trueTofr < 0.90) {
      status = 'warning';
      headline = `Rezidüel Blok Doğrulandı (Gerçek TOFR = ${trueTofr.toFixed(2)} < 0.90) — Henüz Ekstübe Etmeyin`;
      guidance = `Tüm kalibre modaliteler (EMG ${emgDisplayed.toFixed(2)}, ${amgNormalized ? 'Normalize AMG' : 'Ham AMG'} ${displayedAmg.toFixed(2)}, KMG ${kmgDisplayed.toFixed(2)}) rezidüel nöromüsküler bloğu doğruluyor. Uygun antagonizma (Sugammadeks veya düşük doz Neostigmin) sonrası kantitatif TOFR ≥ 0.90 görünene kadar bekleyin.`;
    } else {
      status = 'optimal';
      headline = `Güvenli Ekstübasyon Teyit Edildi (EMG ${emgDisplayed.toFixed(2)} · AMG ${displayedAmg.toFixed(2)} · KMG ${kmgDisplayed.toFixed(2)})`;
      guidance = `Açık kol, normotermik cilt ve geçerli kalibrasyon koşullarında tüm kantitatif modaliteler ASA/ESAIC 2023 güvenlik eşiğinin (TOFR ≥ 0.90) üzerinde tam derlenmeyi doğrulamaktadır.`;
    }

    return {
      rawAmg,
      displayedAmg,
      amgValid,
      amgSafeThreshold,
      amgFalseSafe,
      emgDisplayed,
      emgValid,
      kmgDisplayed,
      kmgValid,
      amgTwitches,
      emgTwitches,
      kmgTwitches,
      status,
      headline,
      guidance,
    };
  }, [trueTofr, amgBaseline, amgNormalized, tuckedArm, interference]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Build SVG path for a biphasic EMG cMAP waveform at xCenter with amplitude scale
  const buildCmapPath = (xCenter: number, amp: number, baselineY: number, isCautery: boolean) => {
    if (isCautery) {
      // High-frequency RF noise burst
      const pts: string[] = [];
      for (let dx = -24; dx <= 24; dx += 3) {
        const y = baselineY + (((dx * 17) % 13) - 6) * 4.5;
        pts.push(`${dx === -24 ? 'M' : 'L'} ${xCenter + dx} ${y.toFixed(1)}`);
      }
      return pts.join(' ');
    }
    const h = Math.max(4, amp * 42);
    return [
      `M ${xCenter - 22} ${baselineY}`,
      `L ${xCenter - 12} ${baselineY}`,
      `L ${xCenter - 10} ${baselineY - 8}`, // stimulus artifact spike
      `L ${xCenter - 8} ${baselineY}`,
      `C ${xCenter - 4} ${baselineY}, ${xCenter - 2} ${(baselineY - h).toFixed(1)}, ${xCenter + 1} ${(baselineY - h).toFixed(1)}`,
      `C ${xCenter + 5} ${(baselineY - h).toFixed(1)}, ${xCenter + 6} ${(baselineY + h * 0.55).toFixed(1)}, ${xCenter + 10} ${(baselineY + h * 0.55).toFixed(1)}`,
      `C ${xCenter + 15} ${(baselineY + h * 0.55).toFixed(1)}, ${xCenter + 17} ${baselineY}, ${xCenter + 22} ${baselineY}`,
    ].join(' ');
  };

  // Build SVG path for a smooth KMG bending curve
  const buildKmgPath = (xCenter: number, amp: number, baselineY: number) => {
    const h = Math.max(4, amp * 48);
    return [
      `M ${xCenter - 22} ${baselineY}`,
      `C ${xCenter - 10} ${baselineY}, ${xCenter - 6} ${(baselineY - h).toFixed(1)}, ${xCenter} ${(baselineY - h).toFixed(1)}`,
      `C ${xCenter + 8} ${(baselineY - h).toFixed(1)}, ${xCenter + 12} ${baselineY}, ${xCenter + 22} ${baselineY}`,
    ].join(' ');
  };

  return (
    <div className="space-y-8 pb-8">
      {/* ===================================================================== */}
      {/* EDITORIAL HEADER                                                      */}
      {/* ===================================================================== */}
      <header className={`pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Kantitatif Nöromüsküler İzlem</span>
          <span aria-hidden="true">·</span>
          <span>Ölçüm Teknolojileri &amp; Kalibrasyon</span>
          <span aria-hidden="true">·</span>
          <span>ASA 2023 · ESAIC 2023 · Capron · Claudius</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Kantitatif Nöromüsküler Monitörler (AMG · EMG · KMG)
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Periferik sinir uyarısını yalnızca gözle veya elle tahmin etmek yerine sayısal <strong>T<sub>4</sub>/T<sub>1</sub> (TOFR)</strong>{' '}
          ölçen <strong>Akseleromiyografi (AMG)</strong>, <strong>Elektromiyografi (EMG)</strong> ve{' '}
          <strong>Kinemiyografi (KMG)</strong> teknolojilerinin ölçüm fiziği, bazal aşım (<em>reverse fade</em>) normalizasyonu,
          örtülü kol sınırlamaları ve ameliyathane cihaz seçim kriterleri.
        </p>

        {/* Chapter Navigation Strip */}
        <nav aria-label="Modül bölümleri" className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'qnm-ch1', label: '01 · Ölçüm Fiziği' },
            { id: 'qnm-ch2', label: '02 · AMG · EMG · KMG Lab' },
            { id: 'qnm-ch3', label: '03 · Sensör Yerleşimi' },
            { id: 'qnm-ch4', label: '04 · Normalizasyon & Tuzaklar' },
            { id: 'qnm-ch5', label: '05 · Cihaz Matriksi & Kanıtlar' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* CHAPTER 01: MEASUREMENT PHYSICS & TRANSDUCERS                         */}
      {/* ===================================================================== */}
      <section id="qnm-ch1" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Bölüm 01 · Dönüştürücü Fiziği
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Aynı Sinir Uyarısı, Dört Farklı Fiziksel Sinyal: EMG · AMG · KMG · MMG
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Tüm kantitatif monitörler ulnar sinire aynı supramaksimal elektrik uyarısını gönderir; ancak kasın verdiği
            yanıtı yakalama biçimleri (elektriksel aksiyon potansiyeli vs. ivme vs. piezoelektrik bükülme vs. izometrik kuvvet)
            klinik doğruluğu ve cerrahi pozisyon uyumluluğunu kökten belirler.
          </p>
        </div>

        {/* 4 Modality Physics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {MODALITY_SPECS.map((m) => (
            <div
              key={m.id}
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-xs font-mono font-bold uppercase tracking-wider ${
                    m.accent === 'sky'
                      ? 'text-sky-600 dark:text-sky-400'
                      : m.accent === 'emerald'
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : m.accent === 'amber'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {m.shortName}
                </span>
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div className={`text-sm font-bold leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {m.fullName}
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {m.physics}
              </p>
              <div
                className={`pt-2 border-t text-[11px] font-mono ${
                  isDark ? 'border-slate-800 text-slate-300' : 'border-slate-100 text-slate-700'
                }`}
              >
                {m.signalUnit}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Engineering Comparison Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-2.5 px-4 font-bold">Modalite</th>
                <th className="py-2.5 px-4 font-bold">Serbest Başparmak</th>
                <th className="py-2.5 px-4 font-bold">Örtülü Kol (Tucked Arm)</th>
                <th className="py-2.5 px-4 font-bold">Bazal Aşım (TOFR<sub>0</sub> &gt; 1.00)</th>
                <th className="py-2.5 px-4 font-bold">Koter Direnci</th>
                <th className="py-2.5 px-4 font-bold">Klinik Cihazlar</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {MODALITY_SPECS.map((m) => (
                <tr key={m.id} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {m.shortName}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[150px]">{m.freeThumbRequired}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[170px]">{m.tuckedArmScore}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[180px]">
                    <MedicalText text={m.baselineOvershoot} />
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[150px]">{m.cauteryImmunity}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[160px] font-mono text-[11px]">{m.clinicalDevices}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 02: INTERACTIVE AMG vs EMG vs KMG BENCHMARK LAB               */}
      {/* ===================================================================== */}
      <section id="qnm-ch2" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Bölüm 02 · Canlı Sensör Karşılaştırma Laboratuvarı
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Eşzamanlı AMG · EMG · KMG Osiloskop &amp; Normalizasyon Simülatörü
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Aynı hastada gerçek fizyolojik derlenme (referans MMG), AMG bazal aşımı (TOFR<sub>0</sub>), normalizasyon,
            örtülü kol ve elektrokoter/hipotermi etkisinin üç kantitatif monitörü nasıl ayrıştırdığını canlı gözlemleyin.
          </p>
        </div>

        {/* Scenario Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {LAB_PRESETS.map((preset) => {
            const active = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                  active
                    ? isDark
                      ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                      : 'bg-sky-50 border-sky-400 text-sky-900'
                    : isDark
                      ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Main 12-Col Lab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT 8 COLS: 3-Channel Synchronized Oscilloscope + Readout Strip */}
          <div
            className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            {/* 4-Column Live Numeric Comparison Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* True MMG Reference */}
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Referans MMG</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    trueTofr >= 0.90 ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {trueTofr.toFixed(2)}
                </div>
                <div className="mt-1 text-[10px] text-slate-400">
                  {trueTofr >= 0.90 ? 'Gerçek: Güvenli' : 'Gerçek: Rezidüel Blok'}
                </div>
              </div>

              {/* EMG Readout */}
              <div
                className={`p-3 rounded-lg border ${
                  interference === 'cautery'
                    ? isDark
                      ? 'bg-amber-950/30 border-amber-500/40'
                      : 'bg-amber-50 border-amber-300'
                    : isDark
                      ? 'bg-slate-900 border-sky-500/30'
                      : 'bg-white border-sky-200'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-sky-500">EMG (cMAP)</div>
                <div className="mt-1 text-2xl font-mono font-bold tabular-nums leading-none text-sky-500">
                  {interference === 'cautery' ? 'RF!' : sim.emgDisplayed.toFixed(2)}
                </div>
                <div className="mt-1 text-[10px] text-slate-400">
                  {interference === 'cautery'
                    ? 'Koter paraziti (durakladı)'
                    : tuckedArm
                      ? 'Örtülü kolda DOĞRU'
                      : 'Bazal aşım yok'}
                </div>
              </div>

              {/* AMG Readout */}
              <div
                className={`p-3 rounded-lg border ${
                  tuckedArm || sim.amgFalseSafe
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-emerald-500/30'
                      : 'bg-white border-emerald-200'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-500">
                  {amgNormalized ? 'AMG (nTOFR)' : 'AMG (Ham)'}
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    tuckedArm || sim.amgFalseSafe ? 'text-rose-500' : 'text-emerald-500'
                  }`}
                >
                  {tuckedArm ? 'ENGEL' : sim.displayedAmg.toFixed(2)}
                </div>
                <div className="mt-1 text-[10px] text-slate-400">
                  {tuckedArm
                    ? 'Başparmak sıkışık!'
                    : sim.amgFalseSafe
                      ? 'SAHTE GÜVENLİ (≥ 1.00 şart)'
                      : `Eşik ≥ ${sim.amgSafeThreshold.toFixed(2)}`}
                </div>
              </div>

              {/* KMG Readout */}
              <div
                className={`p-3 rounded-lg border ${
                  tuckedArm
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-amber-500/30'
                      : 'bg-white border-amber-200'
                }`}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-amber-500">KMG (Şerit)</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    tuckedArm ? 'text-rose-500' : 'text-amber-500'
                  }`}
                >
                  {tuckedArm ? 'ENGEL' : sim.kmgDisplayed.toFixed(2)}
                </div>
                <div className="mt-1 text-[10px] text-slate-400">
                  {tuckedArm ? 'Şerit bükülemiyor!' : 'Piezoelektrik bükülme'}
                </div>
              </div>
            </div>

            {/* Synchronized 3-Channel SVG Signal Monitor */}
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 overflow-x-auto">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>EŞZAMANLI 3-KANALLI KANTİTATİF TRASE (ULNAR SİNİR · 2 Hz TOF)</span>
                <span className="tabular-nums text-slate-300">
                  {tuckedArm ? 'KOL: ÖRTÜLÜ' : 'KOL: SERBEST'} · {interference === 'none' ? 'TEMİZ SİNYAL' : interference === 'cautery' ? 'KOTER AKTİF' : 'CİLT < 32 °C'}
                </span>
              </div>

              <svg
                viewBox="0 0 640 318"
                className="w-full h-auto min-w-[460px] select-none"
                role="img"
                aria-label="AMG, EMG ve KMG eşzamanlı TOF sinyal karşılaştırması"
              >
                {/* Channel 1: EMG (cMAP) */}
                <rect x="8" y="8" width="624" height="94" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
                <text x="20" y="26" fill="#38bdf8" fontSize="11" fontWeight="700" fontFamily="monospace">
                  CH1 · EMG — Bileşik Kas Aksiyon Potansiyeli (cMAP · mV)
                </text>
                <text x="618" y="26" textAnchor="end" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  {interference === 'cautery'
                    ? 'RF GÜRÜLTÜSÜ — ÖLÇÜM BEKLEMEDE'
                    : `TOFR = ${sim.emgDisplayed.toFixed(2)} (${tuckedArm ? 'ÖRTÜLÜ KOLDA GEÇERLİ' : 'İZO-ELEKTRİK'})`}
                </text>
                <line x1="24" y1="68" x2="616" y2="68" stroke="#1e293b" strokeDasharray="3 3" strokeWidth="1" />
                {[0, 1, 2, 3].map((idx) => {
                  const cx = 135 + idx * 125;
                  return (
                    <g key={`emg-${idx}`}>
                      <path
                        d={buildCmapPath(cx, sim.emgTwitches[idx], 68, interference === 'cautery')}
                        fill="none"
                        stroke={interference === 'cautery' ? '#f59e0b' : '#38bdf8'}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <text x={cx} y="95" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                        T<tspan dy="2" fontSize="8">{idx + 1}</tspan>
                      </text>
                    </g>
                  );
                })}

                {/* Channel 2: AMG (Acceleration) */}
                <rect x="8" y="112" width="624" height="94" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
                <text x="20" y="130" fill="#34d399" fontSize="11" fontWeight="700" fontFamily="monospace">
                  CH2 · AMG — Piezoelektrik İvme (F = m·a) · {amgNormalized ? 'NORMALİZE' : 'HAM (KALİBRASYONSUZ)'}
                </text>
                <text
                  x="618"
                  y="130"
                  textAnchor="end"
                  fill={tuckedArm || sim.amgFalseSafe ? '#fb7185' : '#94a3b8'}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {tuckedArm
                    ? 'MEKANİK ENGEL (BAŞPARMAK SIKIŞIK)'
                    : `${amgNormalized ? 'nTOFR' : 'Ham TOFR'} = ${sim.displayedAmg.toFixed(2)} (Bazal TOFR₀ = ${amgBaseline.toFixed(2)})`}
                </text>
                {/* 100% T1 reference line */}
                <line x1="24" y1="145" x2="616" y2="145" stroke="#10b981" strokeOpacity="0.25" strokeDasharray="3 3" strokeWidth="1" />
                <line x1="24" y1="190" x2="616" y2="190" stroke="#334155" strokeWidth="1" />
                {[0, 1, 2, 3].map((idx) => {
                  const cx = 135 + idx * 125;
                  const barH = Math.max(4, Math.min(54, sim.amgTwitches[idx] * 45));
                  const barColor = tuckedArm ? '#f43f5e' : sim.amgFalseSafe && idx === 3 ? '#fb7185' : '#10b981';
                  return (
                    <g key={`amg-${idx}`}>
                      <rect
                        x={cx - 14}
                        y={190 - barH}
                        width="28"
                        height={barH}
                        rx="4"
                        fill={barColor}
                        fillOpacity="0.85"
                      />
                      <text x={cx} y="201" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                        T<tspan dy="2" fontSize="8">{idx + 1}</tspan>
                      </text>
                    </g>
                  );
                })}

                {/* Channel 3: KMG (Piezoelectric Bending) */}
                <rect x="8" y="216" width="624" height="94" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
                <text x="20" y="234" fill="#fbbf24" fontSize="11" fontWeight="700" fontFamily="monospace">
                  CH3 · KMG — Piezoelektrik Bükülme Şeridi (MechanoSensor · ΔV)
                </text>
                <text
                  x="618"
                  y="234"
                  textAnchor="end"
                  fill={tuckedArm ? '#fb7185' : '#94a3b8'}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  {tuckedArm ? 'MEKANİK ENGEL (ŞERİT BÜKÜLEMİYOR)' : `TOFR = ${sim.kmgDisplayed.toFixed(2)}`}
                </text>
                <line x1="24" y1="292" x2="616" y2="292" stroke="#334155" strokeWidth="1" />
                {[0, 1, 2, 3].map((idx) => {
                  const cx = 135 + idx * 125;
                  return (
                    <g key={`kmg-${idx}`}>
                      <path
                        d={buildKmgPath(cx, sim.kmgTwitches[idx], 292)}
                        fill="none"
                        stroke={tuckedArm ? '#f43f5e' : '#f59e0b'}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <text x={cx} y="305" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="monospace">
                        T<tspan dy="2" fontSize="8">{idx + 1}</tspan>
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* RIGHT 4 COLS: Interactive Controls & Dual-Coded Clinical Guidance */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className={`rounded-xl border p-4 space-y-4 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Sliders className="w-3.5 h-3.5 text-sky-500" />
                <span>Laboratuvar Parametreleri</span>
              </div>

              {/* Slider 1: True Physiological MMG TOFR */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Gerçek MMG TOFR</span>
                  <span className="font-mono font-bold tabular-nums text-sky-500">{trueTofr.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={0.30}
                  max={1.00}
                  step={0.01}
                  value={trueTofr}
                  onChange={(e) => {
                    setTrueTofr(Number(e.target.value));
                    setActivePresetId('custom');
                  }}
                  aria-label="Gerçek MMG TOFR değeri"
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>0.30 (Blok)</span>
                  <span>0.90 (Eşik)</span>
                  <span>1.00</span>
                </div>
              </div>

              {/* Slider 2: AMG Baseline Overshoot */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    AMG Bazal Aşım (TOFR<sub>0</sub>)
                  </span>
                  <span className="font-mono font-bold tabular-nums text-emerald-500">{amgBaseline.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={1.00}
                  max={1.25}
                  step={0.01}
                  value={amgBaseline}
                  onChange={(e) => {
                    setAmgBaseline(Number(e.target.value));
                    setActivePresetId('custom');
                  }}
                  aria-label="AMG bazal aşım oranı"
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>1.00 (İdeal)</span>
                  <span>1.15 (Tipik)</span>
                  <span>1.25</span>
                </div>
              </div>

              {/* Toggle: AMG Normalization */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-500">AMG Normalizasyon (nTOFR = TOFR / TOFR<sub>0</sub>)</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAmgNormalized(false);
                      setActivePresetId('custom');
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      !amgNormalized
                        ? isDark
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                          : 'bg-rose-50 border-rose-300 text-rose-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Kapalı (Ham)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAmgNormalized(true);
                      setActivePresetId('custom');
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      amgNormalized
                        ? isDark
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Açık (Normalize)
                  </button>
                </div>
              </div>

              {/* Toggle: Arm Position */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-500">Cerrahi Kol Pozisyonu</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTuckedArm(false);
                      setActivePresetId('custom');
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      !tuckedArm
                        ? isDark
                          ? 'bg-sky-500/20 border-sky-500/50 text-sky-200'
                          : 'bg-sky-50 border-sky-300 text-sky-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Serbest Açık Kol
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTuckedArm(true);
                      setActivePresetId('custom');
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      tuckedArm
                        ? isDark
                          ? 'bg-rose-500/20 border-rose-500/50 text-rose-200'
                          : 'bg-rose-50 border-rose-300 text-rose-900'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    Örtülü / Sıkışık Kol
                  </button>
                </div>
              </div>

              {/* Toggle: Environmental Interference */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-slate-500">Bozucu Etken</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'none' as const, label: 'Yok' },
                    { id: 'cautery' as const, label: 'Koter' },
                    { id: 'cold' as const, label: '< 32 °C' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setInterference(opt.id);
                        setActivePresetId('custom');
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        interference === opt.id
                          ? isDark
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-200'
                            : 'bg-amber-50 border-amber-300 text-amber-900'
                          : isDark
                            ? 'bg-slate-950 border-slate-800 text-slate-400'
                            : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dual-Coded Clinical Action Box */}
            <div
              className={`rounded-xl border p-4 text-xs leading-relaxed space-y-2 ${
                sim.status === 'optimal'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : sim.status === 'critical'
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold flex items-start gap-1.5 text-sm leading-snug">
                {sim.status === 'optimal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : sim.status === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <span>{sim.headline}</span>
              </div>
              <p>
                <MedicalText text={sim.guidance} />
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 03: SENSOR PLACEMENT & ANATOMICAL SCHEMATIC                   */}
      {/* ===================================================================== */}
      <section id="qnm-ch3" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
            Bölüm 03 · Elektrot &amp; Transdüser Kurulumu
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ulnar Sinir – Adduktor Pollisis Üzerinde EMG · AMG · KMG Yerleşimi
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Doğru kantitatif ölçümün %80’i doğru elektrot ve sensör yerleşimine bağlıdır. Tüm modalitelerde ortak ulnar
            stimülasyon polaritesi (<strong>Siyah (−) distal</strong>, <strong>Kırmızı (+) proksimal</strong>) korunurken,
            kayıt sensörü teknolojiye göre farklı anatomik noktalara yerleştirilir.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Custom SVG Schematic comparing 3 sensor setups */}
          <div
            className={`lg:col-span-7 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="text-xs font-bold mb-2 flex items-center justify-between">
              <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                3 Sensör Yerleşim Şeması (Ulnar Sinir · El / Önkol Volar Yüz)
              </span>
              <span className="text-[10px] font-mono text-slate-400">Stimülasyon: 2–3 cm Aralık</span>
            </div>

            <svg
              viewBox="0 0 600 260"
              className="w-full h-auto select-none"
              role="img"
              aria-label="EMG 5-elektrot, AMG başparmak ivmeölçer ve KMG web şeridi yerleşim şeması"
            >
              {/* Panel 1: EMG (5 Electrodes) */}
              <g transform="translate(8,8)">
                <rect x="0" y="0" width="186" height="244" rx="10" fill={isDark ? '#0f172a' : '#f8fafc'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="93" y="20" textAnchor="middle" fill="#0ea5e9" fontSize="11" fontWeight="700" fontFamily="monospace">
                  1. EMG (5 Elektrot)
                </text>
                {/* Stylized forearm & palm */}
                <path
                  d="M66 226 L66 146 L42 120 L52 108 L74 124 L76 62 L88 62 L90 108 L96 56 L108 56 L108 108 L114 64 L126 64 L124 114 L132 82 L142 84 L134 146 L124 226 Z"
                  fill={isDark ? '#1e293b' : '#e2e8f0'}
                  stroke={isDark ? '#475569' : '#94a3b8'}
                  strokeWidth="1.4"
                />
                {/* Ulnar stim electrodes */}
                <circle cx="114" cy="176" r="6" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />
                <text x="126" y="179" fill={isDark ? '#cbd5e1' : '#334155'} fontSize="9" fontFamily="monospace">− Distal</text>
                <circle cx="114" cy="202" r="6" fill="#ef4444" stroke="#f8fafc" strokeWidth="1.5" />
                <text x="126" y="205" fill={isDark ? '#cbd5e1' : '#334155'} fontSize="9" fontFamily="monospace">+ Proks.</text>
                {/* Ground */}
                <circle cx="84" cy="166" r="5" fill="#10b981" stroke="#f8fafc" strokeWidth="1.2" />
                <text x="20" y="169" fill="#10b981" fontSize="9" fontFamily="monospace">Toprak</text>
                {/* Active (AP / FDI) */}
                <circle cx="72" cy="134" r="5.5" fill="#38bdf8" stroke="#f8fafc" strokeWidth="1.2" />
                <text x="14" y="138" fill="#0ea5e9" fontSize="9" fontWeight="700" fontFamily="monospace">Aktif</text>
                {/* Reference (Thumb IP joint) */}
                <circle cx="48" cy="114" r="5" fill="#a855f7" stroke="#f8fafc" strokeWidth="1.2" />
                <text x="14" y="102" fill="#a855f7" fontSize="9" fontFamily="monospace">Ref.</text>
                <text x="93" y="238" textAnchor="middle" fill="#64748b" fontSize="9">
                  Hareket gerekmez · Örtülü kolda ideal
                </text>
              </g>

              {/* Panel 2: AMG (Thumb Accelerometer + Hand Adapter) */}
              <g transform="translate(206,8)">
                <rect x="0" y="0" width="186" height="244" rx="10" fill={isDark ? '#0f172a' : '#f8fafc'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="93" y="20" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="700" fontFamily="monospace">
                  2. AMG (İvmeölçer)
                </text>
                <path
                  d="M66 226 L66 146 L42 120 L52 108 L74 124 L76 62 L88 62 L90 108 L96 56 L108 56 L108 108 L114 64 L126 64 L124 114 L132 82 L142 84 L134 146 L124 226 Z"
                  fill={isDark ? '#1e293b' : '#e2e8f0'}
                  stroke={isDark ? '#475569' : '#94a3b8'}
                  strokeWidth="1.4"
                />
                {/* Ulnar stim electrodes */}
                <circle cx="114" cy="176" r="6" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />
                <circle cx="114" cy="202" r="6" fill="#ef4444" stroke="#f8fafc" strokeWidth="1.5" />
                {/* Accelerometer crystal on thumb */}
                <rect x="36" y="104" width="18" height="14" rx="3" fill="#10b981" stroke="#f8fafc" strokeWidth="1.3" />
                {/* Motion arc */}
                <path d="M36 98 Q56 84 74 96" fill="none" stroke="#10b981" strokeWidth="1.8" strokeDasharray="3 2" />
                <polygon points="75,97 68,92 70,99" fill="#10b981" />
                <text x="16" y="88" fill="#10b981" fontSize="9" fontWeight="700" fontFamily="monospace">3D İvme</text>
                {/* Preload hand adapter band */}
                <path d="M54 118 Q68 122 80 112" fill="none" stroke="#38bdf8" strokeWidth="2.2" />
                <text x="12" y="148" fill="#38bdf8" fontSize="9" fontFamily="monospace">El Adaptörü</text>
                <text x="93" y="238" textAnchor="middle" fill="#64748b" fontSize="9">
                  Serbest başparmak + Preload şart
                </text>
              </g>

              {/* Panel 3: KMG (MechanoSensor Bending Strip) */}
              <g transform="translate(404,8)">
                <rect x="0" y="0" width="188" height="244" rx="10" fill={isDark ? '#0f172a' : '#f8fafc'} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <text x="94" y="20" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="monospace">
                  3. KMG (Bükülme Şeridi)
                </text>
                <path
                  d="M66 226 L66 146 L42 120 L52 108 L74 124 L76 62 L88 62 L90 108 L96 56 L108 56 L108 108 L114 64 L126 64 L124 114 L132 82 L142 84 L134 146 L124 226 Z"
                  fill={isDark ? '#1e293b' : '#e2e8f0'}
                  stroke={isDark ? '#475569' : '#94a3b8'}
                  strokeWidth="1.4"
                />
                {/* Ulnar stim electrodes */}
                <circle cx="114" cy="176" r="6" fill="#0f172a" stroke="#f8fafc" strokeWidth="1.5" />
                <circle cx="114" cy="202" r="6" fill="#ef4444" stroke="#f8fafc" strokeWidth="1.5" />
                {/* Piezoelectric strip in thumb-index web space */}
                <path
                  d="M52 108 Q64 128 78 96"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <text x="14" y="96" fill="#f59e0b" fontSize="9" fontWeight="700" fontFamily="monospace">Piezo Şerit</text>
                <text x="14" y="152" fill="#f59e0b" fontSize="9" fontFamily="monospace">Web Boşluğu</text>
                <text x="94" y="238" textAnchor="middle" fill="#64748b" fontSize="9">
                  Bükülme açısı sabit bantlanmalı
                </text>
              </g>
            </svg>
          </div>

          {/* Right 5 Cols: Practical Setup Checklist */}
          <div className="lg:col-span-5 space-y-3">
            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-bold flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                <Zap className="w-4 h-4" />
                <span>Altın Kalibrasyon Penceresi (Supramaksimal Arama)</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Tüm kantitatif monitörlerde (EMG, AMG, KMG) kalibrasyon <strong>genel anestezi indüksiyonundan hemen sonra,
                ancak NMB enjeksiyonundan ÖNCE</strong> yapılmalıdır. Cihaz kademeli akım artışıyla (tipik 30–60 mA)
                maksimal yanıtı bulur ve üzerine +%10–25 güvenlik marjı ekleyerek <em>supramaksimal akımı</em> ve bazal T<sub>1</sub> / TOFR<sub>0</sub> değerini kilitler.
              </p>
            </div>

            <div
              className={`rounded-xl border p-4 space-y-2 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="text-xs font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <Layers className="w-4 h-4" />
                <span>Alternatif Kas Bölgeleri (El Erişilemiyorsa)</span>
              </div>
              <ul className={`text-xs leading-relaxed space-y-1.5 list-disc pl-4 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <li>
                  <strong>1. Dorsal İnterosseöz (FDI) veya Abduktor Digiti Minimi (ADM)</strong>: Ulnar sinirle aynı bölgede EMG kaydı için Adduktor Pollisis’e çok yakın farmakokinetik sergiler.
                </li>
                <li>
                  <strong>Posterior Tibial Sinir → Fleksör Hallusis Brevis</strong>: Her iki üst ekstremiteye ulaşılamayan cerrahilerde (bilateral kol cerrahisi) ayak başparmağında EMG veya 3D AMG kullanılabilir.
                </li>
                <li>
                  <strong>Fasiyal Sinir (Orbikularis Okuli / Korrugator Süpersili)</strong>: ASA/ESAIC 2023’e göre ekstübasyon kararı için <strong>KULLANILMAZ</strong> (erken toparlanma nedeniyle rezidüel blok riskini 5 kat artırır).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 04: NORMALIZATION, DRIFT & CLINICAL PITFALLS                  */}
      {/* ===================================================================== */}
      <section id="qnm-ch4" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Bölüm 04 · Normalizasyon &amp; Artefakt Tuzakları
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Neden "0.95 Gösteren AMG" Hâlâ Rezidüel Blok Olabilir?
          </h2>
        </div>

        {/* Normalization Formula Box */}
        <div
          className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="space-y-1">
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              AMG Normalizasyon Denklemi (Claudius &amp; Viby-Mogensen · ASA 2023)
            </div>
            <p className={`text-xs leading-relaxed max-w-2xl ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Bazal AMG TOFR<sub>0</sub> değeri 1.15 olan hastada vaka sonunda ekranda <strong>0.95</strong> okunuyorsa,
              gerçek normalize oran <strong>0.95 / 1.15 = 0.83</strong>’tür. Hasta klinik olarak rezidüel kürarizasyondadır!
            </p>
          </div>
          <div
            className={`px-4 py-3 rounded-lg border font-mono text-sm font-bold shrink-0 text-center tabular-nums ${
              isDark ? 'bg-slate-950 border-slate-700 text-emerald-300' : 'bg-white border-slate-300 text-emerald-800'
            }`}
          >
            nTOFR = TOFR<sub>ölçülen</sub> / TOFR<sub>0</sub>
          </div>
        </div>

        {/* 5 Pitfall Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {PITFALLS.map((p) => (
            <div
              key={p.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                p.severity === 'critical'
                  ? isDark
                    ? 'bg-rose-950/20 border-rose-500/35'
                    : 'bg-rose-50/70 border-rose-200'
                  : isDark
                    ? 'bg-slate-900/70 border-slate-800'
                    : 'bg-white border-slate-200'
              }`}
            >
              <div
                className={`text-xs font-bold flex items-start gap-1.5 ${
                  p.severity === 'critical'
                    ? isDark
                      ? 'text-rose-300'
                      : 'text-rose-900'
                    : isDark
                      ? 'text-amber-300'
                      : 'text-amber-900'
                }`}
              >
                {p.severity === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <span>
                  <MedicalText text={p.title} />
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <MedicalText text={p.body} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* CHAPTER 05: SELECTION MATRIX, GUIDELINES & REFERENCES                 */}
      {/* ===================================================================== */}
      <section id="qnm-ch5" className="space-y-4 scroll-mt-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Bölüm 05 · Cihaz Seçim Matriksi &amp; Kanıtlar
          </div>
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ameliyathane Senaryosuna Göre Kantitatif Monitör Seçimi
          </h2>
        </div>

        {/* Clinical Selection Matrix */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark ? 'border-slate-800 bg-slate-900 text-slate-300' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-2.5 px-4 font-bold">Klinik Senaryo</th>
                <th className="py-2.5 px-4 font-bold">İlk Tercih</th>
                <th className="py-2.5 px-4 font-bold">Alternatif</th>
                <th className="py-2.5 px-4 font-bold">Kaçınılması Gereken</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {SCENARIO_MATRIX.map((row) => (
                <tr key={row.scenario} className="align-top">
                  <td className={`py-2.5 px-4 font-bold min-w-[200px] ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.scenario}
                  </td>
                  <td className="py-2.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold min-w-[190px]">
                    {row.firstChoice}
                  </td>
                  <td className="py-2.5 px-4 min-w-[180px]">{row.alternative}</td>
                  <td className="py-2.5 px-4 text-rose-600 dark:text-rose-400 min-w-[180px]">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bedside 3 Golden Rules */}
        <div
          className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
            isDark
              ? 'bg-emerald-950/25 border-emerald-500/35 text-emerald-200'
              : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}
        >
          <Gauge className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm">Yatak Başı 3 Altın Kural (ASA 2023 · ESAIC 2023)</div>
            <p>
              <strong>1)</strong> Örtülü kolda mekanik hareket kısıtlandığı için <strong>EMG tek güvenilir standarttır</strong>.{' '}
              <strong>2)</strong> AMG kullanıyorsanız indüksiyon sonrası–NMB öncesi mutlaka <strong>kalibrasyon ve normalizasyon</strong> yapın; normalize edilmemiş AMG’de ekstübasyon için <strong>TOFR ≥ 1.00</strong> arayın.{' '}
              <strong>3)</strong> Hangi kantitatif cihazı kullanırsanız kullanın ölçümü <strong>Adduktor Pollisis</strong> (veya ulnar EMG) üzerinden yapın, cildi <strong>&gt; 32 °C</strong> tutun ve <strong>TOFR ≥ 0.90</strong> belgelemeden ekstübe etmeyin.
            </p>
          </div>
        </div>

        {/* Verified PubMed References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
            <span>Kanıta Dayalı Kaynaklar (PubMed Doğrulamalı)</span>
          </div>
          <ul className="space-y-2 text-xs">
            {REFERENCES.map((ref) => (
              <li
                key={ref.pmid}
                className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <div>
                  <span className="font-semibold">{ref.authors}.</span> {ref.title}.{' '}
                  <span className="italic text-slate-500">{ref.journal}.</span>
                </div>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                >
                  <span>PMID: {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
