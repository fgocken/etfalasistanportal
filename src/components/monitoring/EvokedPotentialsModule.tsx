import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sliders,
  Zap,
} from 'lucide-react';
import { MedicalText } from '../basics/respiratory/MedicalText';

interface EvokedPotentialsModuleProps {
  isDark: boolean;
}

type IonmPresetId =
  | 'tiva_optimal'
  | 'high_volatile'
  | 'residual_nmb'
  | 'asa_ischemia'
  | 'hypothermia'
  | 'focal_cord_injury';

type NmbLevel = 'none' | 'partial' | 'deep';
type SurgicalStress = 'none' | 'asa_ischemia' | 'cord_tract';

const MODALITY_COMPARE = [
  {
    modality: 'SSEP (Somatosensöriyel)',
    pathway: 'Dorsal kolon – medial lemniskus (propriyosepsiyon / titreşim) · 2 Posterior Spinal Arter (PSA)',
    recording: 'Üst: Median (N_{20}/P_{25}) · Alt: Post. Tibial (P_{37}/N_{45}) — 100–500 uyaran ortalaması (1–2 dk gecikme)',
    alarm: 'Amplitüd ≥ %50 düşüş veya Latans ≥ %10 uzama (“50/10 Kuralı”)',
    anesthesia: 'Volatil > 0.5–1.0 MAC kortikal dalgayı baskılar; NMB sinyal gürültüsünü AZALTIR (iyileştirir).',
  },
  {
    modality: 'Myojenik TcMEP (Motor)',
    pathway: 'Motor korteks → Lateral kortikospinal traktus → α-motor nöron → Kas · Tek Anterior Spinal Arter (ASA)',
    recording: 'Transkraniyal çoklu pulslu uyarı (C1/C2–C3/C4) → APB, Tibialis Anterior, Abduktor Hallusis CMAP (anlık)',
    alarm: 'Dalga kaybı, ≥ %50–80 amplitüd düşüşü veya > 100 V eşik artışı (cerrahiye özgü)',
    anesthesia: 'Volatil ajanlara ve kas gevşeticilere (NMB) EN DUYARLI modalite! Saf TIVA (Propofol + Opioid) zorunlu.',
  },
  {
    modality: 'Epidural D-Dalgası (Direkt Motor)',
    pathway: 'Piramidal hücre aksonlarının sinapssız doğrudan kortikospinal iletimi (C3/C4 → Epidural elektrot)',
    recording: 'Cerrahi alandan kaudal epidural boşluğa yerleştirilen kateter ile tek-puls kayıt (intramedüller tümör)',
    alarm: 'Amplitüd ≥ %50 düşüş → kalıcı motor defisit öngörüsü (kas MEP kaybolsa bile D-dalgası > %50 ise iyileşir)',
    anesthesia: 'Sinaps içermediği için NMB’den ETKİLENMEZ ve anesteziklere büyük ölçüde dirençlidir.',
  },
  {
    modality: 'BAEP / ABR (İşitsel Beyin Sapı)',
    pathway: 'VIII. kraniyal sinir → Koklear çekirdek → Süperior oliver → Lateral lemniskus → İnferior kollikulus (Dalga I–V)',
    recording: 'Kulak içi klik uyaranı → Verteks (Cz) – Kulak memesi (A1/A2) · Posterior fossa / CPA cerrahisi',
    alarm: 'Dalga V latansında ≥ 1.0 ms uzama veya amplitüdde ≥ %50 düşüş',
    anesthesia: 'Oligosinaptik / subkortikal olduğu için volatil ve IV anesteziklere EN DİRENÇLİ modalitedir.',
  },
];

const DRUG_EFFECT_ROWS = [
  {
    agent: 'Propofol + Remifentanil (TIVA)',
    ssep: 'Minimal depresyon (yüksek dozda hafif ↓)',
    mep: 'En iyi korunma (Altın Standart rejim)',
    dWave: 'Etkisiz',
    note: 'Sabit hızlı TIVA (bolus yok!) ve BIS 40–60 hedeflenerek tüm spinal/vasküler IONM olgularının temelidir.',
  },
  {
    agent: 'Volatil Ajanlar (Sevo / Des / İzo)',
    ssep: 'Doz-bağımlı Amp ↓ & Lat ↑ (> 0.5–1.0 MAC)',
    mep: 'ŞİDDETLİ DEPRESYON (> 0.5 MAC’ta silinir!)',
    dWave: 'Minimal',
    note: 'Kortikal I-dalgalarını ve anterior boynuz sinapslarını baskılar. TcMEP varsa kapatılmalı veya ≤ 0.3–0.5 MAC’ta sınırlanmalıdır.',
  },
  {
    agent: 'Azot Protoksit (N_{2}O)',
    ssep: 'Belirgin Amp ↓ (özellikle volatille sinerjik)',
    mep: 'Güçlü depresyon (özellikle propofol/volatille)',
    dWave: 'Etkisiz',
    note: 'SSEP ve TcMEP amplitüdünü belirgin düşürür; multimodal IONM sırasında rutin olarak KAÇINILMALIDIR.',
  },
  {
    agent: 'Ketamin & Etomidat',
    ssep: 'AMPLİTÜDÜ ARTIRIR (↑)',
    mep: 'Minimal etki veya hafif ARTIRIR (↑)',
    dWave: 'Etkisiz',
    note: 'Düşük doz ketamin infüzyonu (0.2–0.5 mg/kg/sa) propofol gereksinimini azaltır ve zayıf SSEP/MEP sinyallerini güçlendirir.',
  },
  {
    agent: 'Deksmedetomidin',
    ssep: 'Minimal etki',
    mep: 'Düşük dozda tolere; yüksek doz/bolusta ↓',
    dWave: 'Etkisiz',
    note: '0.2–0.5 mcg/kg/sa TIVA adjuvanı olarak kullanılabilir; yükleme bolusu ve > 0.7 mcg/kg/sa TcMEP’i söndürebilir.',
  },
  {
    agent: 'Nöromüsküler Blokerler (NMB)',
    ssep: 'Sinyali İYİLEŞTİRİR (EMG artefaktı ↓)',
    mep: 'TAMAMEN SİLER (TOF 0–1/4 → Yanıt Yok!)',
    dWave: 'Etkisiz',
    note: 'Yalnızca entübasyonda kısa etkili / tek doz kullanın; cerrahi öncesi TOF 4/4 (> %90) doğrulayın veya Sugammadeks uygulayın.',
  },
];

const VITALE_CHECKLIST = [
  {
    step: '01 · Durdur & Ekibi Topla',
    owner: 'Cerrahi + Tüm Oda',
    items: [
      'Cerrahi manevrayı (distraksiyon, osteotomi, vida yerleştirme) derhal durdurun.',
      'Ameliyathane gürültüsünü/müziği kapatın; kıdemli cerrah, kıdemli anestezist ve nörofizyoloğu haberdar edin.',
      'Sinyal kaybının zamanlamasını son cerrahi adımla (örn. rod rotasyonu) saniyesi saniyesine eşleştirin.',
    ],
  },
  {
    step: '02 · Teknik & Pozisyon Kontrolü',
    owner: 'Nörofizyoloji + Anestezi',
    items: [
      'Elektrot bağlantısı, empedans ve cihaz uyarım akımını kontrol edin; kontrol kas/sinirde yanıt var mı bakın.',
      'Baş–boyun aşırı ekstansiyon/fleksiyonunu ve kol/bacak bası noktalarını (brakiyal pleksus, ulnar, peroneal) kontrol edin.',
      'Değişikliğin global/simetrik (sistemik/anestezik) mi yoksa fokal/asimetrik (cerrahi hasar) mi olduğunu ayırt edin.',
    ],
  },
  {
    step: '03 · Fizyoloji & Anestezi Kurtarma',
    owner: 'Anestezist (İlk 60 sn)',
    items: [
      'MAP’ı derhal ≥ 85–90 mmHg’ye çıkarın (noradrenalin/fenilefrin) — spinal kord perfüzyon basıncını maksimize edin.',
      'Arteriyel kan gazı ve Hb kontrolü: Hb < 9–10 g/dL ise transfüzyon, PaCO_{2} 35–40 mmHg (hipokapniyi düzelt!), ısı ≥ 36.0°C.',
      'Volatil ajanı 0 MAC’a indirin, TIVA’yı sabit tutun; TOF ölçün — rezidüel blok varsa Sugammadeks ile döndürün.',
    ],
  },
  {
    step: '04 · Cerrahi Geri Alma & Wake-Up',
    owner: 'Cerrahi + Anestezi',
    items: [
      'Son düzeltme/distraksiyon manevrasını gevşetin veya kaldırın; pedikül vidalarını skopi/O-arm ile yeniden doğrulayın.',
      'Sinyal 10–15 dk içinde dönmezse yüksek doz kortikosteroid protokolünü ekipçe tartışın.',
      'Teknik arıza dışlanamıyor veya kritik belirsizlik sürüyorsa Stagnara İntraoperatif Uyanma (Wake-Up) Testi planlayın.',
    ],
  },
];

const REFERENCES = [
  {
    authors: 'Sloan TB, Heyer EJ.',
    title: 'Anesthesia for intraoperative neurophysiologic monitoring of the spinal cord.',
    journal: 'J Clin Neurophysiol. 2002;19(5):430–443.',
    pmid: '12477988',
  },
  {
    authors: 'MacDonald DB, Skinner S, Shils J, Yingling C (ASNM).',
    title: 'Intraoperative motor evoked potential monitoring — a position statement by the American Society of Neurophysiological Monitoring.',
    journal: 'Clin Neurophysiol. 2013;124(12):2291–2316.',
    pmid: '24055297',
  },
  {
    authors: 'Vitale MG, Skaggs DL, Pace GI, et al. (Scoliosis Research Society).',
    title: 'Best practices in intraoperative neuromonitoring in spine deformity surgery: development of an intraoperative checklist to optimize response.',
    journal: 'Spine Deform. 2014;2(5):333–339.',
    pmid: '25368840',
  },
  {
    authors: 'Legatt AD, Emerson RG, Epstein CM, MacDonald DB, Deletis V, Bravo RJ, López JR (ACNS).',
    title: 'ACNS Guideline: Transcranial electrical stimulation motor evoked potential monitoring.',
    journal: 'J Clin Neurophysiol. 2016;33(1):42–50.',
    pmid: '26756258',
  },
  {
    authors: 'MacDonald DB, Dong C, Quatrale R, Sala F, Stütz D, Szelényi A, et al. (ISIN).',
    title: 'Recommendations of the International Society of Intraoperative Neurophysiology for intraoperative somatosensory evoked potentials.',
    journal: 'Clin Neurophysiol. 2019;130(1):161–179.',
    pmid: '30470625',
  },
];

export const EvokedPotentialsModule: React.FC<EvokedPotentialsModuleProps> = ({ isDark }) => {
  const [activePreset, setActivePreset] = useState<IonmPresetId>('tiva_optimal');
  const [volatileMac, setVolatileMac] = useState<number>(0.0); // 0.0..1.5 MAC
  const [nmbLevel, setNmbLevel] = useState<NmbLevel>('none');
  const [mapMmHg, setMapMmHg] = useState<number>(82); // 50..105 mmHg
  const [coreTemp, setCoreTemp] = useState<number>(36.8); // 33.5..37.5 °C
  const [surgicalStress, setSurgicalStress] = useState<SurgicalStress>('none');

  const applyPreset = (preset: IonmPresetId) => {
    setActivePreset(preset);
    if (preset === 'tiva_optimal') {
      setVolatileMac(0.0);
      setNmbLevel('none');
      setMapMmHg(82);
      setCoreTemp(36.8);
      setSurgicalStress('none');
    } else if (preset === 'high_volatile') {
      setVolatileMac(1.2);
      setNmbLevel('none');
      setMapMmHg(78);
      setCoreTemp(36.7);
      setSurgicalStress('none');
    } else if (preset === 'residual_nmb') {
      setVolatileMac(0.0);
      setNmbLevel('deep');
      setMapMmHg(80);
      setCoreTemp(36.7);
      setSurgicalStress('none');
    } else if (preset === 'asa_ischemia') {
      setVolatileMac(0.0);
      setNmbLevel('none');
      setMapMmHg(56);
      setCoreTemp(36.6);
      setSurgicalStress('asa_ischemia');
    } else if (preset === 'hypothermia') {
      setVolatileMac(0.2);
      setNmbLevel('none');
      setMapMmHg(78);
      setCoreTemp(34.1);
      setSurgicalStress('none');
    } else if (preset === 'focal_cord_injury') {
      setVolatileMac(0.0);
      setNmbLevel('none');
      setMapMmHg(84);
      setCoreTemp(36.8);
      setSurgicalStress('cord_tract');
    }
  };

  // Physiological & Pharmacological Evoked Potential Model
  const sim = useMemo(() => {
    // 1. SSEP Amplitude (% of baseline) and Latency shift (+% over baseline P37=38ms)
    let ssepAmp = 100;
    let ssepLatPct = 0;

    // Volatile suppression on cortical SSEP (noticeable > 0.5 MAC)
    ssepAmp -= Math.max(0, volatileMac - 0.25) * 44;
    ssepLatPct += Math.max(0, volatileMac - 0.3) * 7.5;

    // NMB slightly improves SSEP signal-to-noise (no suppression)
    // Hypotension (< 65 mmHg) reduces spinal/cortical perfusion
    if (mapMmHg < 65) {
      ssepAmp -= (65 - mapMmHg) * 1.4;
      ssepLatPct += (65 - mapMmHg) * 0.22;
    }

    // Hypothermia (~3-5% latency increase per °C below 36.5°C)
    if (coreTemp < 36.5) {
      const degDrop = 36.5 - coreTemp;
      ssepLatPct += degDrop * 4.4;
      ssepAmp -= degDrop * 6.5;
    }

    // Surgical injury
    if (surgicalStress === 'asa_ischemia') {
      // Anterior spinal artery predominantly hits motor; dorsal columns relatively spared early
      ssepAmp -= 14;
      ssepLatPct += 2.5;
    } else if (surgicalStress === 'cord_tract') {
      ssepAmp -= 58;
      ssepLatPct += 14.0;
    }

    ssepAmp = Math.max(5, Math.min(105, Math.round(ssepAmp)));
    ssepLatPct = Math.max(0, Number(ssepLatPct.toFixed(1)));
    const ssepAlarm = ssepAmp <= 50 || ssepLatPct >= 10;

    // 2. Myogenic TcMEP Amplitude (% of baseline)
    let mepAmp = 100;
    // Volatile hits TcMEP severely (nearly abolished > 1.0 MAC)
    mepAmp -= volatileMac * 74;

    // NMB destroys myogenic TcMEP!
    if (nmbLevel === 'partial') mepAmp *= 0.32;
    if (nmbLevel === 'deep') mepAmp *= 0.04;

    // Hypotension hits anterior horn motor neurons fast
    if (mapMmHg < 68) {
      mepAmp -= (68 - mapMmHg) * 2.1;
    }
    // Hypothermia mild-moderate effect
    if (coreTemp < 36.5) {
      mepAmp -= (36.5 - coreTemp) * 8;
    }
    // Surgical stress
    if (surgicalStress === 'asa_ischemia') {
      mepAmp *= 0.14;
    } else if (surgicalStress === 'cord_tract') {
      mepAmp *= 0.12;
    }

    mepAmp = Math.max(0, Math.min(100, Math.round(mepAmp)));
    const mepAlarm = mepAmp <= 25;

    // 3. Epidural D-Wave Amplitude (% of baseline — synapse-free axonal conduction)
    let dWaveAmp = 100;
    // Resistant to NMB and largely resistant to volatile anesthesia
    dWaveAmp -= volatileMac * 5;
    if (coreTemp < 36.5) dWaveAmp -= (36.5 - coreTemp) * 2.5;
    if (mapMmHg < 58) dWaveAmp -= (58 - mapMmHg) * 1.1;
    if (surgicalStress === 'asa_ischemia') dWaveAmp -= 24; // Gray matter / α-motor suffers before white-matter axon
    if (surgicalStress === 'cord_tract') dWaveAmp -= 56; // Direct corticospinal axon injury!

    dWaveAmp = Math.max(10, Math.min(100, Math.round(dWaveAmp)));
    const dWaveAlarm = dWaveAmp <= 50;

    // Clinical Diagnosis & Action Engine
    let severity: 'optimal' | 'warning' | 'critical' = 'optimal';
    let headline = 'Multimodal IONM Stabil · Bazal ile Uyumlu (TIVA Optimal)';
    let action =
      'SSEP (50/10 sınırı içinde), myojenik TcMEP ve D-dalgası korunmuştur. Sabit hızlı TIVA infüzyonunu (bolus vermeden), normotermiyi ve MAP ≥ 75–80 mmHg düzeyini sürdürün.';

    if (surgicalStress === 'cord_tract') {
      severity = 'critical';
      headline = 'KIRMIZI BAYRAK: Fokal Cerrahi Spinal Kord Hasarı Alarmı!';
      action = `Sistemik parametreler stabil olmasına rağmen SSEP (%${ssepAmp}, latans +%${ssepLatPct}), TcMEP (%${mepAmp}) ve D-dalgası (%${dWaveAmp}) eş zamanlı çöktü! Vitale Kontrol Listesini başlatın: Cerrahi manevrayı DERHAL durdurup gevşetin, MAP’ı ≥ 85–90 mmHg’ye yükseltin, vida/implant pozisyonunu doğrulayın.`;
    } else if (surgicalStress === 'asa_ischemia') {
      severity = 'critical';
      headline = 'KIRMIZI BAYRAK: İzole TcMEP Kaybı — Anterior Spinal Arter (ASA) İskemisi!';
      action = `Klasik tehlikeli tablo: Dorsal kolon (SSEP %${ssepAmp}) hâlâ korunurken motor yollar (TcMEP %${mepAmp}) çöktü! Yalnızca SSEP izleseydiniz hasta paraplejik uyanabilirdi. Derhal MAP’ı ≥ 90 mmHg’ye yükseltin (vazopresör), Hb’yi kontrol edin ve cerrahi distraksiyonu gevşetin!`;
    } else if (nmbLevel === 'deep' || nmbLevel === 'partial') {
      severity = 'warning';
      headline = `Rezidüel Kas Gevşetici (NMB) Kaynaklı TcMEP Baskılanması (MEP %${mepAmp})`;
      action = `SSEP (%${ssepAmp}) ve D-dalgası (%${dWaveAmp}) tamamen sağlamken yalnızca myojenik TcMEP silindi — sorun nörolojik değil nöromüsküler kavşaktadır! TOF ölçün, ek kas gevşetici vermeyin ve gerekirse Sugammadeks ile tam nöromüsküler dönüş (TOF 4/4) sağlayın.`;
    } else if (volatileMac >= 0.7) {
      severity = 'warning';
      headline = `Volatil Anestezik Depresyonu (${volatileMac.toFixed(1)} MAC · Global Sinaptik Baskılanma)`;
      action = `Yüksek volatil ajan (>${0.5} MAC) kortikal SSEP’i (%${ssepAmp}) ve özellikle myojenik TcMEP’i (%${mepAmp}) şiddetle söndürüyor; sinapssız D-dalgası (%${dWaveAmp}) ise korunuyor. Volatil ajanı kapatın (0 MAC) ve Propofol + Remifentanil TIVA’ya geçin.`;
    } else if (coreTemp <= 35.2) {
      severity = 'warning';
      headline = `Hipotermi Kaynaklı Global Latans Uzaması (${coreTemp.toFixed(1)} °C · Latans +%${ssepLatPct})`;
      action = `Kor ısısındaki her 1 °C düşüş sinir ileti hızını yavaşlatarak SSEP latansını ~%3–5 uzatır (sahte-pozitif 50/10 alarmı). Değişiklik bilateral ve simetriktir; aktif zorlamalı hava ısıtması ve ılık IV sıvılarla kor ısısını ≥ 36.0 °C’ye çıkarın.`;
    } else if (mapMmHg < 65) {
      severity = 'critical';
      headline = `Spinal Kord Hipoperfüzyonu! (MAP ${mapMmHg} mmHg · MEP %${mepAmp})`;
      action = `Düşük perfüzyon basıncı önce metabolik açıdan hassas ön boynuz motor nöronlarını (TcMEP) ardından SSEP’i bozar. Derhal vazopresör ile MAP’ı ≥ 85 mmHg’ye yükseltin ve kan kaybı/anemiyi düzeltin.`;
    } else if (ssepAlarm || mepAlarm || dWaveAlarm) {
      severity = 'warning';
      headline = 'Kombine Fizyolojik / Anestezik Sinyal Zayıflaması';
      action = `Mevcut parametreler (MAC ${volatileMac.toFixed(1)}, MAP ${mapMmHg}, Isı ${coreTemp.toFixed(1)}°C) uyarılmış potansiyelleri alarm eşiğine yaklaştırdı. TIVA’yı sadeleştirin, MAP ≥ 80–85 mmHg ve normotermi sağlayın.`;
    }

    return {
      ssepAmp,
      ssepLatPct,
      ssepAlarm,
      mepAmp,
      mepAlarm,
      dWaveAmp,
      dWaveAlarm,
      severity,
      headline,
      action,
    };
  }, [volatileMac, nmbLevel, mapMmHg, coreTemp, surgicalStress]);

  // SVG Wave Generators (Baseline Ghost vs. Live Trace)
  const waves = useMemo(() => {
    const x0 = 62;
    const x1 = 544;
    const w = x1 - x0;
    const steps = 150;

    const buildSsep = (ampScale: number, latShiftPct: number) => {
      const midY = 42;
      const pts: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps; // 0..1 (0..80 ms)
        const x = x0 + t * w;
        const shift = (latShiftPct / 100) * 0.24;
        // Classic cortical P37 (downward positive peak at ~0.46) + N45 (upward negative peak at ~0.58)
        const p37 = Math.exp(-Math.pow((t - (0.44 + shift)) / 0.055, 2)) * 22 * ampScale;
        const n45 = -Math.exp(-Math.pow((t - (0.57 + shift)) / 0.065, 2)) * 24 * ampScale;
        const p60 = Math.exp(-Math.pow((t - (0.72 + shift)) / 0.08, 2)) * 9 * ampScale;
        const y = midY + p37 + n45 + p60;
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      return pts.join(' ');
    };

    const buildMep = (ampScale: number) => {
      const midY = 120;
      const pts: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x0 + t * w;
        // Stimulus artifact at t~0.08, then polyphasic CMAP burst at t~0.35..0.68
        let v = 0;
        if (t > 0.05 && t < 0.11) {
          v = Math.sin(((t - 0.05) / 0.06) * Math.PI * 2) * 8;
        } else {
          const env = Math.exp(-Math.pow((t - 0.48) / 0.12, 2));
          v = Math.sin((t - 0.3) * Math.PI * 16) * 28 * env * ampScale;
        }
        const y = midY - v;
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      return pts.join(' ');
    };

    const buildDWave = (ampScale: number) => {
      const midY = 196;
      const pts: string[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = x0 + t * w;
        // Fast crisp single biphasic spike at t~0.28 (latency ~4–6 ms)
        const spikeUp = Math.exp(-Math.pow((t - 0.27) / 0.024, 2)) * 23 * ampScale;
        const spikeDown = -Math.exp(-Math.pow((t - 0.32) / 0.032, 2)) * 12 * ampScale;
        const y = midY - (spikeUp + spikeDown);
        pts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
      }
      return pts.join(' ');
    };

    return {
      ssepBase: buildSsep(1.0, 0),
      ssepLive: buildSsep(sim.ssepAmp / 100, sim.ssepLatPct),
      mepBase: buildMep(1.0),
      mepLive: buildMep(sim.mepAmp / 100),
      dWaveBase: buildDWave(1.0),
      dWaveLive: buildDWave(sim.dWaveAmp / 100),
    };
  }, [sim.ssepAmp, sim.ssepLatPct, sim.mepAmp, sim.dWaveAmp]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* EDITORIAL OPENING HEADER */}
      <header className={`pb-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span className="text-violet-600 dark:text-violet-400 font-semibold">İntraoperatif Nöromonitörizasyon (IONM)</span>
          <span aria-hidden="true">·</span>
          <span>SSEP · TcMEP · Epidural D-Dalgası</span>
          <span aria-hidden="true">·</span>
          <span>TIVA &amp; Vitale Alarm Protokolü</span>
        </div>

        <h1
          className={`mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight [text-wrap:balance] ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          Uyarılmış Potansiyeller (SSEP &amp; MEP) Monitörizasyonu
        </h1>

        <p className={`mt-3 text-sm sm:text-[15px] leading-relaxed max-w-3xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          Spinal deformite, intramedüller kord tümörü, aort anevrizması ve serebrovasküler cerrahide kalıcı nörolojik
          defisiti önlemek için duyusal (<strong>SSEP</strong>) ve motor (<strong>TcMEP / D-dalgası</strong>) yolların
          bütünlüğü anlık izlenir. Anestezistin başarısı, <strong>volatil ajan ve kas gevşetici</strong> baskılanmasından
          kaçınıp gerçek nörolojik iskemi/traksiyon alarmını saniyeler içinde yönetmesine dayanır.
        </p>

        <nav aria-label="Bölüm geçişleri" className="mt-5 flex flex-wrap items-center gap-2">
          {[
            { id: 'ionm-01', label: '01. Spinal Yollar & Modaliteler' },
            { id: 'ionm-02', label: '02. Canlı SSEP / MEP / D-Dalgası Lab' },
            { id: 'ionm-03', label: '03. Anestezi Farmakolojisi (TIVA)' },
            { id: 'ionm-04', label: '04. Vitale Alarm Kontrol Listesi & Güvenlik' },
            { id: 'ionm-05', label: '05. Endikasyonlar & Literatür' },
          ].map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => scrollToSection(nav.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-violet-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-violet-400'
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </header>

      {/* ===================================================================== */}
      {/* 01. SPİNAL KORD ANATOMİSİ, VASKÜLER BESLENME & MODALİTE KARŞILAŞTIRMA */}
      {/* ===================================================================== */}
      <section id="ionm-01" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            01. Neden SSEP Tek Başına Yetmez? Dorsal vs. Anterior Spinal Yollar
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Spinal kordun arka 1/3’ünü (duyusal <strong>SSEP</strong>) iki adet Posterior Spinal Arter, ön 2/3’ünü
            (motor <strong>TcMEP</strong>) ise tek bir <strong>Anterior Spinal Arter (ASA)</strong> besler. İzole ASA
            iskemisinde SSEP saatlerce normal kalırken hasta postoperatif paraplejik uyanabilir!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Spinal Cord Cross-Section SVG */}
          <div
            className={`lg:col-span-5 rounded-xl border p-4 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <svg
              viewBox="0 0 380 232"
              className="w-full h-auto"
              role="img"
              aria-label="Spinal kord enine kesiti: SSEP dorsal kolon ve MEP kortikospinal traktus vasküler haritası"
            >
              <text x="190" y="18" textAnchor="middle" fontSize="10.5" fontWeight="700" fill={isDark ? '#f8fafc' : '#0f172a'}>
                Spinal Kord Enine Kesiti · Vasküler &amp; Traktus Haritası
              </text>

              {/* Posterior Spinal Arteries (2) */}
              <circle cx="152" cy="40" r="5" fill="#38bdf8" />
              <circle cx="228" cy="40" r="5" fill="#38bdf8" />
              <text x="190" y="37" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#38bdf8">
                2 × Posterior Spinal Arter (PSA)
              </text>

              {/* Cord Outer Oval */}
              <ellipse
                cx="190"
                cy="118"
                rx="96"
                ry="68"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#475569' : '#94a3b8'}
                strokeWidth="2"
              />

              {/* Dorsal Columns (SSEP) */}
              <path
                d="M 155 58 Q 190 48, 225 58 L 210 105 L 190 98 L 170 105 Z"
                fill="#38bdf8"
                fillOpacity="0.28"
                stroke="#38bdf8"
                strokeWidth="1.6"
              />
              <text x="190" y="76" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#38bdf8">
                Dorsal Kolon
              </text>
              <text x="190" y="88" textAnchor="middle" fontSize="8" fontFamily="ui-monospace, monospace" fill="#7dd3fc">
                SSEP (N<tspan dy="2" fontSize="6.5">20</tspan><tspan dy="-2">/P</tspan><tspan dy="2" fontSize="6.5">37</tspan><tspan dy="-2">)</tspan>
              </text>

              {/* Gray Matter Butterfly (simplified H) */}
              <path
                d="M 156 82 Q 168 118, 152 150 Q 168 158, 178 130 L 202 130 Q 212 158, 228 150 Q 212 118, 224 82 Q 210 108, 200 112 L 180 112 Q 170 108, 156 82 Z"
                fill={isDark ? '#334155' : '#cbd5e1'}
                fillOpacity="0.65"
              />

              {/* Lateral Corticospinal Tracts (MEP / D-wave) */}
              <ellipse cx="128" cy="116" rx="20" ry="15" fill="#f43f5e" fillOpacity="0.3" stroke="#fb7185" strokeWidth="1.6" />
              <ellipse cx="252" cy="116" rx="20" ry="15" fill="#f43f5e" fillOpacity="0.3" stroke="#fb7185" strokeWidth="1.6" />
              <text x="128" y="114" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fb7185">CST</text>
              <text x="128" y="124" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#fda4af">MEP</text>
              <text x="252" y="114" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fb7185">CST</text>
              <text x="252" y="124" textAnchor="middle" fontSize="7" fontFamily="ui-monospace, monospace" fill="#fda4af">MEP</text>

              {/* Anterior Horn Motor Neurons */}
              <circle cx="164" cy="144" r="7" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.4" />
              <circle cx="216" cy="144" r="7" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.4" />
              <text x="190" y="166" textAnchor="middle" fontSize="7.8" fontWeight="600" fill="#f59e0b">
                α-Motor Nöronlar (İskemiye En Hassas!)
              </text>

              {/* Single Anterior Spinal Artery */}
              <circle cx="190" cy="194" r="6" fill="#f43f5e" />
              <text x="190" y="214" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fb7185">
                Tek Anterior Spinal Arter (ASA · Ön 2/3)
              </text>
              <text x="190" y="226" textAnchor="middle" fontSize="7.8" fill={isDark ? '#94a3b8' : '#64748b'}>
                İzole ASA iskemisi → SSEP normal, TcMEP KAYIP!
              </text>
            </svg>
          </div>

          {/* 3 Core Alarm Threshold Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                badge: 'SSEP · 50/10 Kuralı',
                value: '≥ %50 ↓ / ≥ %10 ↑',
                title: 'Amplitüd / Latans Alarmı',
                desc: 'Dorsal kolon sinyali 100–500 uyaranın ortalamasıdır (~1–2 dk gecikmeli). Simetrik değişim sistemik/anestezik, asimetrik değişim cerrahi işarettir.',
                cls: isDark ? 'bg-sky-950/25 border-sky-500/40' : 'bg-sky-50/80 border-sky-200',
                valCls: 'text-sky-600 dark:text-sky-400',
              },
              {
                badge: 'Myojenik TcMEP',
                value: 'Kayıp / ≥ %50–80 ↓',
                title: 'Anlık Motor Koruma',
                desc: 'Kortikospinal traktus ve ön boynuz iskemisini saniyeler içinde yakalar; ancak volatil ajanlara (> 0.5 MAC) ve kas gevşeticiye (NMB) aşırı duyarlıdır.',
                cls: isDark ? 'bg-rose-950/25 border-rose-500/40' : 'bg-rose-50/80 border-rose-200',
                valCls: 'text-rose-600 dark:text-rose-400',
              },
              {
                badge: 'Epidural D-Dalgası',
                value: '≥ %50 Amplitüd ↓',
                title: 'Kalıcı Defisit Öngörücüsü',
                desc: 'Sinapssız aksonal iletimdir: kas MEP kaybolsa dahi D-dalgası > %50 korunuyorsa postoperatif motor defisit genellikle geçicidir.',
                cls: isDark ? 'bg-violet-950/25 border-violet-500/40' : 'bg-violet-50/80 border-violet-200',
                valCls: 'text-violet-600 dark:text-violet-400',
              },
            ].map((item) => (
              <div key={item.badge} className={`rounded-xl border p-4 space-y-1.5 ${item.cls}`}>
                <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{item.badge}</div>
                <div className={`text-sm font-mono font-bold tabular-nums ${item.valCls}`}>{item.value}</div>
                <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</div>
                <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modality Comparison Table */}
        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Modalite</th>
                <th className="py-3 px-4 font-semibold">Anatomik Yol &amp; Beslenme</th>
                <th className="py-3 px-4 font-semibold">Kayıt &amp; Dalgalar</th>
                <th className="py-3 px-4 font-semibold text-rose-600 dark:text-rose-400">Alarm Kriteri</th>
                <th className="py-3 px-4 font-semibold text-violet-600 dark:text-violet-400">Anestezi / NMB Etkisi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {MODALITY_COMPARE.map((row) => (
                <tr key={row.modality} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {row.modality}
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[200px]">{row.pathway}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[190px]">
                    <MedicalText text={row.recording} />
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[175px] font-medium">{row.alarm}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[195px]">{row.anesthesia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 02. CANLI SSEP / TcMEP / D-DALGASI & ANESTEZİ ETKİLEŞİM LABORATUVARI  */}
      {/* ===================================================================== */}
      <section id="ionm-02" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            02. Canlı SSEP · TcMEP · D-Dalgası ve Anestezi Etkileşim Laboratuvarı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Kesikli gri eğri <strong>ameliyat başı bazal kaydı</strong>, renkli eğri ise <strong>canlı yanıtı</strong>{' '}
            gösterir. Volatil ajan, rezidüel kas gevşetici, hipotermi ve gerçek ASA/kord iskemisinin üç kanalda nasıl
            farklı imzalar bıraktığını karşılaştırın.
          </p>
        </div>

        {/* 6 Scenario Presets */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'tiva_optimal', label: 'TIVA Optimal (Bazal)' },
            { id: 'high_volatile', label: 'Yüksek Volatil (1.2 MAC)' },
            { id: 'residual_nmb', label: 'Rezidüel NMB (TOF 0/4)' },
            { id: 'asa_ischemia', label: 'ASA İskemisi (MAP 56!)' },
            { id: 'hypothermia', label: 'Hipotermi (34.1 °C)' },
            { id: 'focal_cord_injury', label: 'Fokal Kord Traksiyonu' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => applyPreset(preset.id as IonmPresetId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                activePreset === preset.id
                  ? isDark
                    ? 'bg-violet-600 border-violet-500 text-white'
                    : 'bg-slate-900 border-slate-900 text-white'
                  : isDark
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT STAGE: 4 Live Metric Cards + 3-Channel Dual-Overlay Oscilloscope */}
          <div
            className={`lg:col-span-8 rounded-xl border p-4 sm:p-5 space-y-5 ${
              isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50/70 border-slate-200'
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* SSEP Amp */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.ssepAmp <= 50
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  SSEP Amplitüd (P<sub>37</sub>)
                </div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.ssepAmp <= 50 ? 'text-rose-600 dark:text-rose-400' : 'text-sky-600 dark:text-sky-400'
                  }`}
                >
                  %{sim.ssepAmp}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.ssepAmp <= 50 ? 'ALARM (≤ %50)' : 'Eşik > %50'}
                </div>
              </div>

              {/* SSEP Latency */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.ssepLatPct >= 10
                    ? isDark
                      ? 'bg-amber-950/35 border-amber-500/50'
                      : 'bg-amber-50 border-amber-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">SSEP Latans Δ</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.ssepLatPct >= 10 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  +%{sim.ssepLatPct.toFixed(1)}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.ssepLatPct >= 10 ? 'ALARM (≥ %10)' : 'Eşik < %10'}
                </div>
              </div>

              {/* Myogenic TcMEP */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.mepAlarm
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Myojenik TcMEP</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.mepAlarm
                      ? 'text-rose-600 dark:text-rose-400'
                      : sim.mepAmp < 60
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  %{sim.mepAmp}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.mepAlarm ? 'KAYIP / KRİTİK' : 'Korunmuş'}
                </div>
              </div>

              {/* Epidural D-Wave */}
              <div
                className={`p-3 rounded-lg border ${
                  sim.dWaveAlarm
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/50'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                      ? 'bg-slate-900 border-slate-800'
                      : 'bg-white border-slate-200'
                }`}
              >
                <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Epidural D-Dalgası</div>
                <div
                  className={`mt-1 text-2xl font-mono font-bold tabular-nums leading-none ${
                    sim.dWaveAlarm ? 'text-rose-600 dark:text-rose-400' : 'text-violet-600 dark:text-violet-400'
                  }`}
                >
                  %{sim.dWaveAmp}
                </div>
                <div className="mt-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  {sim.dWaveAlarm ? 'AKSON HASARI!' : 'Sinapssız (Sağlam)'}
                </div>
              </div>
            </div>

            {/* 3-Channel Dual-Overlay Oscilloscope SVG */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  Bazal (Kesikli) vs. Canlı Trase: SSEP · TcMEP · D-Dalgası
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                  MAC {volatileMac.toFixed(1)} · MAP {mapMmHg} · {coreTemp.toFixed(1)}°C
                </span>
              </div>

              <svg
                viewBox="0 0 560 238"
                className="w-full h-auto rounded-lg border border-slate-800 bg-slate-950"
                role="img"
                aria-label="Bazal ve canlı SSEP, TcMEP ve epidural D-dalgası osiloskop kaydı"
              >
                {/* Channel Dividers */}
                <line x1="10" y1="80" x2="550" y2="80" stroke="#1e293b" strokeWidth="1" />
                <line x1="10" y1="158" x2="550" y2="158" stroke="#1e293b" strokeWidth="1" />

                {/* Channel 1 Labels: SSEP */}
                <text x="12" y="34" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#38bdf8">
                  SSEP
                </text>
                <text x="12" y="48" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">
                  P<tspan dy="2" fontSize="6.5">37</tspan><tspan dy="-2">/N</tspan><tspan dy="2" fontSize="6.5">45</tspan>
                </text>
                <text x="544" y="20" textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill={sim.ssepAlarm ? '#fb7185' : '#38bdf8'}>
                  Amp %{sim.ssepAmp} · Lat +%{sim.ssepLatPct.toFixed(1)}
                </text>

                {/* Channel 2 Labels: TcMEP */}
                <text x="12" y="114" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#10b981">
                  TcMEP
                </text>
                <text x="12" y="128" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">
                  TA / AH
                </text>
                <text x="544" y="98" textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill={sim.mepAlarm ? '#fb7185' : '#34d399'}>
                  CMAP %{sim.mepAmp} {sim.mepAlarm ? '(ALARM!)' : ''}
                </text>

                {/* Channel 3 Labels: D-Wave */}
                <text x="12" y="190" fontSize="10" fontWeight="700" fontFamily="ui-monospace, monospace" fill="#a78bfa">
                  D-Dalga
                </text>
                <text x="12" y="204" fontSize="8" fontFamily="ui-monospace, monospace" fill="#64748b">
                  Epidural
                </text>
                <text x="544" y="176" textAnchor="end" fontSize="8" fontFamily="ui-monospace, monospace" fill={sim.dWaveAlarm ? '#fb7185' : '#c4b5fd'}>
                  Akson %{sim.dWaveAmp}
                </text>

                {/* Baseline Ghost Traces */}
                <path d={waves.ssepBase} fill="none" stroke="#475569" strokeWidth="1.4" strokeDasharray="4 3" />
                <path d={waves.mepBase} fill="none" stroke="#475569" strokeWidth="1.4" strokeDasharray="4 3" />
                <path d={waves.dWaveBase} fill="none" stroke="#475569" strokeWidth="1.4" strokeDasharray="4 3" />

                {/* Live Traces */}
                <path
                  d={waves.ssepLive}
                  fill="none"
                  stroke={sim.ssepAlarm ? '#fb7185' : '#38bdf8'}
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
                <path
                  d={waves.mepLive}
                  fill="none"
                  stroke={sim.mepAlarm ? '#fb7185' : '#10b981'}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                <path
                  d={waves.dWaveLive}
                  fill="none"
                  stroke={sim.dWaveAlarm ? '#fb7185' : '#a78bfa'}
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT CONTROL DECK */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className={`rounded-xl border p-4 space-y-3.5 ${
                isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <Sliders className="w-4 h-4 text-violet-500" />
                <span>Anestezi &amp; Fizyoloji Kontrolleri</span>
              </div>

              {/* Volatile MAC */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="ionm-mac" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Volatil Ajan (Sevo/Des)
                  </label>
                  <span className="font-mono tabular-nums font-bold text-violet-600 dark:text-violet-400">
                    {volatileMac === 0 ? '0.0 MAC (TIVA)' : `${volatileMac.toFixed(1)} MAC`}
                  </span>
                </div>
                <input
                  id="ionm-mac"
                  type="range"
                  min={0}
                  max={1.5}
                  step={0.1}
                  value={volatileMac}
                  onChange={(e) => setVolatileMac(Number(e.target.value))}
                  className="w-full accent-violet-600 cursor-pointer"
                />
              </div>

              {/* NMB Selector */}
              <div className="space-y-1.5">
                <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Kas Gevşetici (NMB / TOF)
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'none', label: 'TOF 4/4' },
                    { id: 'partial', label: 'TOF 2/4' },
                    { id: 'deep', label: 'TOF 0/4' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNmbLevel(opt.id as NmbLevel)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                        nmbLevel === opt.id
                          ? isDark
                            ? 'bg-slate-800 border-violet-500 text-white'
                            : 'bg-slate-900 border-slate-900 text-white'
                          : isDark
                            ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* MAP */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="ionm-map" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Ortalama Arter Basıncı (MAP)
                  </label>
                  <span
                    className={`font-mono tabular-nums font-bold ${
                      mapMmHg < 65 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {mapMmHg} mmHg
                  </span>
                </div>
                <input
                  id="ionm-map"
                  type="range"
                  min={50}
                  max={105}
                  step={1}
                  value={mapMmHg}
                  onChange={(e) => setMapMmHg(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Core Temperature */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="ionm-temp" className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    Kor Sıcaklığı
                  </label>
                  <span
                    className={`font-mono tabular-nums font-bold ${
                      coreTemp < 35.5 ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400'
                    }`}
                  >
                    {coreTemp.toFixed(1)} °C
                  </span>
                </div>
                <input
                  id="ionm-temp"
                  type="range"
                  min={33.5}
                  max={37.5}
                  step={0.1}
                  value={coreTemp}
                  onChange={(e) => setCoreTemp(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              {/* Surgical Stress Selector */}
              <div className="space-y-1.5">
                <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Cerrahi / Vasküler Olay
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'none', label: 'Yok' },
                    { id: 'asa_ischemia', label: 'ASA İskemi' },
                    { id: 'cord_tract', label: 'Kord Hasar' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSurgicalStress(opt.id as SurgicalStress)}
                      className={`py-1.5 px-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer whitespace-nowrap ${
                        surgicalStress === opt.id
                          ? isDark
                            ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                            : 'bg-rose-600 border-rose-600 text-white'
                          : isDark
                            ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dual-Coded Clinical Verdict Box */}
            <div
              className={`rounded-xl border p-4 text-xs leading-relaxed space-y-2 ${
                sim.severity === 'optimal'
                  ? isDark
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : sim.severity === 'critical'
                    ? isDark
                      ? 'bg-rose-950/35 border-rose-500/40 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                    : isDark
                      ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {sim.severity === 'optimal' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : sim.severity === 'critical' ? (
                  <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                )}
                <span>{sim.headline}</span>
              </div>
              <p>{sim.action}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 03. ANESTEZİ FARMAKOLOJİSİ & İLAÇ ETKİ MATRİSİ                        */}
      {/* ===================================================================== */}
      <section id="ionm-03" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            03. Anestezi Farmakolojisi: “Sinaps Sayısı” ve Sabit Durum (Steady-State) Kuralı
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Bir uyarılmış potansiyel yolunda ne kadar çok sinaps varsa anesteziklere o kadar duyarlıdır. Altın kural:{' '}
            <strong>Propofol + Remifentanil TIVA</strong> ile sabit anestezi derinliği sağlayın; kritik cerrahi
            aşamalarda <strong>ani boluslardan kaçının</strong> ve her ilaç değişikliğini nörofizyolojiye bildirin.
          </p>
        </div>

        <div
          className={`rounded-xl border overflow-x-auto ${
            isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr
                className={`border-b ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/80 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <th className="py-3 px-4 font-semibold">Anestezik Ajan</th>
                <th className="py-3 px-4 font-semibold text-sky-600 dark:text-sky-400">Kortikal SSEP</th>
                <th className="py-3 px-4 font-semibold text-rose-600 dark:text-rose-400">Myojenik TcMEP</th>
                <th className="py-3 px-4 font-semibold text-violet-600 dark:text-violet-400">D-Dalgası</th>
                <th className="py-3 px-4 font-semibold">Klinik Anestezi Stratejisi</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-100 text-slate-700'}`}>
              {DRUG_EFFECT_ROWS.map((row) => (
                <tr key={row.agent} className="align-top">
                  <td className={`py-2.5 px-4 font-bold whitespace-nowrap ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <MedicalText text={row.agent} />
                  </td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[160px]">{row.ssep}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[175px] font-medium">{row.mep}</td>
                  <td className="py-2.5 px-4 leading-relaxed whitespace-nowrap">{row.dWave}</td>
                  <td className="py-2.5 px-4 leading-relaxed min-w-[230px]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 04. VİTALE ALARM KONTROL LİSTESİ & TcMEP GÜVENLİĞİ                    */}
      {/* ===================================================================== */}
      <section id="ionm-04" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            04. İntraoperatif Sinyal Kaybı Kriz Protokolü (Vitale / SRS) &amp; TcMEP Güvenliği
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Sinyal kaybı anında kaosu önlemek için yapılandırılmış 4 aşamalı kontrol listesi uygulanır. Anestezist ilk
            60 saniye içinde <strong>MAP, oksijenasyon, Hb, PaCO<sub>2</sub>, ısı ve anestezi/NMB</strong> eksenini
            optimize etmelidir.
          </p>
        </div>

        {/* 4-Step Vitale Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {VITALE_CHECKLIST.map((phase) => (
            <div
              key={phase.step}
              className={`rounded-xl border p-4 space-y-2.5 ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400">{phase.step}</span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{phase.owner}</span>
              </div>
              <ul className={`space-y-1.5 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-violet-500 font-bold mt-0.5">•</span>
                    <span>
                      <MedicalText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TcMEP Safety Pitfalls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: '1. Yumuşak Isırık Bloğu (Zorunlu!)',
              body: 'Transkraniyal motor uyarı masseter kasını şiddetle kasar — dil/dudak laserasyonu ve endotrakeal tüp ısırılması en sık komplikasyondur. Sert Guedel airway diş kırar; iki taraflı molarlar arasına yumuşak gazlı bez/silikon ısırık bloğu yerleştirin.',
            },
            {
              title: '2. Hasta Hareketi & Cerrahi Koordinasyon',
              body: 'Kas gevşetici olmadığından TcMEP sırasında hasta hafifçe sıçrayabilir. Mikroskop altında kraniyal veya spinal diseksiyon anında nörofizyolog her uyarı öncesi sesli bildirim yapmalıdır.',
            },
            {
              title: '3. Rölatif Kontrendikasyonlar',
              body: 'Kontrolsüz epilepsi, intrakraniyal anevrizma klipsi/metal yabancı cisim, koklear implant ve kalp pili/ICD varlığında TcMEP risk–fayda dengesi ekipçe önceden değerlendirilmelidir (nöbet insidansı < %0.1).',
            },
          ].map((safety) => (
            <div
              key={safety.title}
              className={`rounded-xl border p-4 space-y-1.5 ${
                isDark ? 'bg-rose-950/20 border-rose-500/35' : 'bg-rose-50/70 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>{safety.title}</span>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{safety.body}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className={isDark ? 'border-slate-800' : 'border-slate-200'} />

      {/* ===================================================================== */}
      {/* 05. KLİNİK ENDİKASYONLAR & AKADEMİK KAYNAKLAR                         */}
      {/* ===================================================================== */}
      <section id="ionm-05" className="scroll-mt-6 space-y-6">
        <div className="space-y-1.5">
          <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            05. Yüksek Verimli Cerrahi Endikasyonlar ve PubMed Kaynakları
          </h2>
          <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Multimodal IONM (SSEP + TcMEP ± D-dalgası/EMG), tek modaliteye göre yüksek sensitivite (%90–100) ve
            spesifisite ile perioperatif nörolojik morbiditeyi anlamlı biçimde azaltır.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              title: 'Spinal Deformite & Skolyoz',
              detail: 'SSEP + TcMEP birlikte zorunlu. Rod distraksiyonu sırasında ASA iskemisini saniyeler içinde yakalar.',
            },
            {
              title: 'İntramedüller Kord Tümörleri',
              detail: 'TcMEP + Epidural D-dalgası altın standarttır; D-dalgası > %50 ise rezeksiyon güvenle sürdürülebilir.',
            },
            {
              title: 'Torakoabdominal Aort (TAAA)',
              detail: 'Adamkiewicz arteri / kros-klemp spinal iskemisini izler; BOS drenajı + MAP ≥ 85–90 mmHg yönetimine yön verir.',
            },
            {
              title: 'Karotis & İntrakraniyal Cerrahi',
              detail: 'Karotis endarterektomi (şant kararı), anevrizma klipleme ve motor korteks (peri-Rolandik) haritalaması.',
            },
          ].map((ind) => (
            <div
              key={ind.title}
              className={`rounded-xl border p-3.5 space-y-1 ${
                isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{ind.title}</div>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{ind.detail}</p>
            </div>
          ))}
        </div>

        {/* Bedside 3 Golden Rules Banner */}
        <div
          className={`rounded-xl border p-4 flex items-start gap-3 text-xs leading-relaxed ${
            isDark
              ? 'bg-slate-900/60 border-slate-800 text-slate-300'
              : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <Activity className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
          <div>
            <strong className={isDark ? 'text-white' : 'text-slate-900'}>Yatak Başı 3 Altın Kural:</strong>{' '}
            (1) <strong className="font-mono">TIVA (Propofol + Remifentanil) · 0 MAC Volatil · NMB Yok</strong>, (2)
            SSEP <strong className="font-mono">50/10</strong> (≥ %50 amp ↓ / ≥ %10 lat ↑) +{' '}
            <strong className="font-mono">TcMEP</strong> birlikte izle, (3) Alarmda ilk 60 sn:{' '}
            <strong className="font-mono">Cerrahi Durdur · MAP ≥ 85–90 · Hb/PaCO<sub>2</sub>/Isı/TOF Kontrol!</strong>
          </div>
        </div>

        {/* Verified PubMed References */}
        <div
          className={`rounded-xl border p-4 space-y-2.5 ${
            isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/60 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
            <BookOpen className="w-4 h-4 text-violet-500" />
            <span>Temel Akademik Kaynaklar (PubMed Doğrulamalı)</span>
          </div>
          <ol className="space-y-2 text-xs">
            {REFERENCES.map((ref, idx) => (
              <li
                key={ref.pmid}
                className={`flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                <span>
                  <span className="font-mono text-slate-400 mr-1.5">{idx + 1}.</span>
                  <strong>{ref.authors}</strong> {ref.title}{' '}
                  <em className="text-slate-500 dark:text-slate-400">{ref.journal}</em>
                </span>
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-violet-600 dark:text-violet-400 hover:underline shrink-0"
                >
                  <span>PMID: {ref.pmid}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};
