import React, { useState, useId } from 'react';
import {
  Wind,
  Activity,
  Clock,
  Stethoscope,
  Gauge,
  Brain,
  HeartPulse,
  ChevronDown,
  ChevronUp,
  Leaf,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  CompatibilityAndLineBlock,
  ContraindicationsGridBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MechanismOfActionBlock,
  MonographAccordionSection,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
  useMonographAccordion,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';

interface Props {
  isDark: boolean;
}

type ActiveCalcTab = 'mac_titration' | 'consumption';

/**
 * Mapleson (1996) yaşa bağlı MAC denklemi:
 * MAC(yaş) = MAC_40 * 10^(-0.00269 * (yaş - 40))
 * Yenidoğan/infantta düzeltilmiş pediatrik tepe ~%3.2–3.3 (Lerman et al., Anesthesiology 1994)
 */
function calculateAgeAdjustedSevoMac(ageYears: number, isPregnant: boolean): number {
  let baseMac: number;
  if (ageYears < 0.083) {
    // Yenidoğan (<1 ay)
    baseMac = 3.3;
  } else if (ageYears < 0.5) {
    // 1–6 ay süt çocuğu (Lerman 1994)
    baseMac = 3.2;
  } else if (ageYears < 1) {
    baseMac = 2.85;
  } else if (ageYears < 3) {
    baseMac = 2.6;
  } else {
    baseMac = 2.05 * Math.pow(10, -0.00269 * (ageYears - 40));
  }
  if (isPregnant) {
    baseMac *= 0.72; // Gebelikte progesteron/endorfin etkisiyle ~%28-30 MAC düşüşü
  }
  return baseMac;
}

export const SevofluraneProtocol: React.FC<Props> = ({ isDark }) => {
  const [activeCalcTab, setActiveCalcTab] = useState<ActiveCalcTab>('mac_titration');

  // 1. MAC & EtSevo Titrasyon Hesaplayıcı State'leri
  const [ageYears, setAgeYears] = useState<number>(40);
  const [n2oPercent, setN2oPercent] = useState<number>(0); // 0, 50, 60, 66, 70
  const [opioidSparing, setOpioidSparing] = useState<'none' | 'fentanyl_mod' | 'remifentanil_low' | 'remifentanil_high'>('fentanyl_mod');
  const [tempCelsius, setTempCelsius] = useState<number>(36.5);
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [targetMacMultiple, setTargetMacMultiple] = useState<number>(1.0); // 0.5 - 1.5 MAC

  // 2. Sıvı Tüketimi & Çevresel Etki State'leri
  const [fgfLpm, setFgfLpm] = useState<number>(1.0); // L/dk
  const [dialPercent, setDialPercent] = useState<number>(2.0); // Vaporizatör %
  const [caseHours, setCaseHours] = useState<number>(2.0); // saat

  const [pkOpen, setPkOpen] = useMonographAccordion('sec-pkpd', false);

  const ageInputId = useId();
  const n2oSelectId = useId();
  const opioidSelectId = useId();
  const tempInputId = useId();
  const macTargetId = useId();
  const fgfInputId = useId();
  const dialInputId = useId();
  const hoursInputId = useId();

  // --- HESAPLAMALAR ---
  const ageMac = calculateAgeAdjustedSevoMac(ageYears, isPregnant);
  // Hipotermi düzeltmesi: Her 1°C düşüş MAC'ı ~%5 azaltır (37°C referans; hipertermide 40°C'ye kadar artar)
  const tempFactor = Math.max(0.5, 1 + (tempCelsius - 37.0) * 0.05);
  const tempAdjustedMac = ageMac * tempFactor;

  // N₂O aditif MAC katkısı: N₂O MAC ≈ %104 -> örn. %60 N₂O ≈ 0.58 MAC katkı sağlar
  const n2oMacContribution = n2oPercent / 104;
  // Opioid MAC-sparing çarpanı (Miller / Katoh):
  const opioidMultiplier =
    opioidSparing === 'none'
      ? 1.0
      : opioidSparing === 'fentanyl_mod'
        ? 0.75
        : opioidSparing === 'remifentanil_low'
          ? 0.65
          : 0.50;

  // Hedeflenen toplam MAC'a ulaşmak için gereken Sevofluran MAC fraksiyonu
  const requiredSevoMacFraction = Math.max(0.2, targetMacMultiple * opioidMultiplier - n2oMacContribution);
  const targetEtSevoPercent = Math.max(0.3, tempAdjustedMac * requiredSevoMacFraction);
  const macAwakePercent = tempAdjustedMac * 0.34; // MAC-awake ≈ 0.34 MAC
  const macBarPercent = tempAdjustedMac * 1.5; // MAC-BAR (otonomik yanıt blokajı) ≈ 1.5–1.6 MAC (opioidsiz)

  // Sıvı tüketim hesabı (Dion / Avogadro):
  // 1 mL sıvı sevofluran (d = 1.52 g/mL, MW = 200.05 g/mol) -> 20°C'de 182.7 mL buhar üretir.
  // Basitçe: mL sıvı/saat = (FGF_L_min * 1000 * (dialPercent / 100) * 60) / 182.7 = (FGF * dialPercent * 600) / 182.7
  const liquidMlPerHour = (fgfLpm * dialPercent * 600) / 182.7;
  const totalLiquidMl = liquidMlPerHour * caseHours;
  const totalGrams = totalLiquidMl * 1.52;
  // Sevofluran GWP100 ≈ 130–144 (IPCC AR5/AR6 ortalaması ~144)
  const co2eKg = (totalGrams / 1000) * 144;

  const getReportText = () => {
    return [
      'SEVOFLURAN KLİNİK MONOGRAFİ RAPORU',
      `Hasta Yaşı: ${ageYears} yıl${isPregnant ? ' (Gebe)' : ''} | Vücut Isısı: ${tempCelsius.toFixed(1)} °C`,
      `1.0 MAC (Yaş+Isı Düzeltmeli): %${tempAdjustedMac.toFixed(2)} EtSevo`,
      `Hedeflenen Anestezi Derinliği: ${targetMacMultiple.toFixed(2)} MAC | N₂O: %${n2oPercent} | Opioid Modu: ${opioidSparing}`,
      `Önerilen End-Tidal Sevofluran (EtSevo): %${targetEtSevoPercent.toFixed(2)}`,
      `MAC-Awake (~0.34 MAC): %${macAwakePercent.toFixed(2)} | MAC-BAR (opioidsiz): %${macBarPercent.toFixed(2)}`,
      `Tahmini Sıvı Tüketimi (${fgfLpm} L/dk FGF @ %${dialPercent}): ${liquidMlPerHour.toFixed(1)} mL/saat (${caseHours} saatte ${totalLiquidMl.toFixed(0)} mL / ${co2eKg.toFixed(2)} kg CO₂e)`,
    ].join('\n');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v4.0) */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP & MH Güvenliği' },
          { id: 'sec-ozet', label: 'Özet' },
          { id: 'sec-etki', label: 'Etki Mekanizması' },
          { id: 'sec-pkpd', label: 'PK / PD' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-dozlar', label: 'Endikasyon & Dozaj' },
          { id: 'sec-hesaplayici', label: 'MAC & Tüketim Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Vaporizatör & Absorban' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON · v4.0) */}
      <HighAlertSafetyBlock
        isDark={isDark}
        defaultOpen={false}
        tallManName="sevoFLURANE"
        confusionRiskWith="desFLURANE · isoFLURANE"
        criticalAlerts={[
          'Yalnızca Sevofluran spesifik (Sarı renk kodlu) anahtarlı dolum adaptörü ve Sevofluran vaporizatöründe kullanılmalıdır; yanlış ajanın yanlış vaporizatöre dolumu ölümcül aşırı/eksik doza yol açar.',
          'ASLA enjektöre çekilip IV uygulanmaz (kazara IV enjeksiyon ağır ARDS, hemoliz, pulmoner ödem ve kardiyak arrest yapar!).',
          'Malign Hipertermi (MH) şüphesinde: Sevofluranı DERHAL kapat, %100 O₂ 10–15 L/dk yıka, aktif kömür filtresi (Vapor-Clean) tak, vaporizatörü cihazdan çıkar, TIVA’ya geç ve 2.5 mg/kg IV Dantrolen başla.',
          'Tamamen kurumuş kuvvetli baz (KOH/NaOH) içeren CO₂ absorbanı üzerinden geçirilmesi ekzotermik reaksiyon (>100 °C), devre yangını ve Compound A / CO oluşumu riski taşır.',
        ]}
        antidoteOrRescue="Aşırı dozda spesifik antidot yoktur: vaporizatörü kapat, %100 O₂ ile yüksek FGF'de mekanik ventilasyonla akciğerlerden yıka ve gerekirse vazopressör (Efedrin/Fenilefrin/Noradrenalin) ile MAP ≥ 65 mmHg sağla. Malign Hipertermi krizinde spesifik antidot IV Dantrolen sodyumdur (2.5 mg/kg IV bolus, klinik yanıt alınana dek tekrarlanır)."
      />

      {/* 1. KİMLİK & KLİNİK ÖZET HEADER */}
      <section
        id="sec-ozet"
        className={`p-6 rounded-2xl border transition-all ${
          isDark
            ? 'bg-slate-900/90 border-amber-500/30 shadow-xl shadow-amber-950/20 text-slate-100'
            : 'bg-white border-amber-200 shadow-lg shadow-amber-500/5 text-slate-900'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Wind className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 font-mono">
                  Volatil İnhalasyon Anesteziği · Sarı Kod
                </span>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                  ATC: N01AB08
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                  SEVORANE · SOJOURN · ULTANE · SEVODEX
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Sevofluran (sevoFLURANE)
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Düşük kan/gaz çözünürlüğüne (0.65) sahip, hoş kokulu ve hava yolunu irrite etmeyen halojenli eter
                anesteziği. Hem erişkin hem pediatrik hastalarda <strong>maske (inhalasyon) indüksiyonu</strong> ve hızlı
                derlenmeli anestezi idamesi için standart ajandır; güçlü bronkodilatördür ancak MH tetikleyicisidir.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Hızlı Parametre Kartı */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              MAC (40 Yaş · O₂)
            </span>
            <span className="text-sm font-black text-amber-600 dark:text-amber-400 block mt-0.5 font-mono tabular-nums">
              %2.05
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">N₂O %60 ile: ~%0.8</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Kan / Gaz Katsayısı
            </span>
            <span className="text-sm font-black text-teal-600 dark:text-teal-400 block mt-0.5 font-mono tabular-nums">
              0.65
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Hızlı indüksiyon &amp; uyanma</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Buhar Basıncı (20°C)
            </span>
            <span className="text-sm font-black text-slate-800 dark:text-slate-100 block mt-0.5 font-mono tabular-nums">
              157–160 mmHg
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Kaynama: 58.5 °C</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Hava Yolu &amp; Bronş
            </span>
            <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
              İrritasyon Yok
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Güçlü bronkodilatör</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Hepatik Metabolizma
            </span>
            <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 block mt-0.5 font-mono tabular-nums">
              %2 – %5 (CYP2E1)
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">F⁻ &amp; HFIP · Compound A</span>
          </div>

          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
              Kritik Güvenlik
            </span>
            <span className="text-sm font-black text-rose-700 dark:text-rose-300 block mt-0.5">
              MH Tetikleyicisi!
            </span>
            <span className="text-[10px] text-rose-500 dark:text-rose-400 block mt-0.5">Asla IV verilmez</span>
          </div>
        </div>
      </section>

      {/* ETKİ MEKANİZMASI */}
      <MechanismOfActionBlock
        isDark={isDark}
        sectionTitle="Etki Mekanizması & Moleküler Farmakodinamik"
        summary="Sevofluran, merkezi sinir sistemindeki spesifik transmembran iyon kanallarının hidrofobik ceplerine bağlanarak nöronal membran uyarılabilirliğini baskılayan halojenli bir eter genel anesteziğidir. Kortikal ve talamik yapılarda bilinç kaybı (hipnoz/amnezi) oluştururken, ağrılı uyarana motor yanıtı (MAC / immobilite) esas olarak omurilik düzeyindeki internöronlar ve motor nöronları inhibe ederek sağlar."
        pillars={[
          {
            title: 'İnhibitör Kanallar: GABAₐ, Glisin & K₂P',
            detail:
              'GABAₐ reseptörlerinin α/β alt birimlerindeki TM2–TM3 hidrofobik cebine bağlanarak Cl⁻ kanal açılma süresini uzatır (hiperpolarizasyon). Spinal kordda Glisin reseptörlerini ve iki-porlu potasyum kanallarını (TREK-1 / TASK) aktive ederek K⁺ çıkışını artırır ve immobiliteyi güçlendirir.',
          },
          {
            title: 'Eksitatör Kanalların Baskılanması',
            detail:
              'Nöronal nikotinik asetilkolin reseptörlerini (nAChR), NMDA glutamat reseptörlerini ve 5-HT₃ kanallarını inhibe ederek sinaptik eksitasyonu azaltır; presinaptik voltaj kapılı Na⁺ kanalları üzerinden glutamat salınımını baskılar.',
          },
          {
            title: 'Periferik Düz Kas & K-ATP Önkoşullama',
            detail:
              'Bronş düz kaslarında hücre içi Ca²⁺ mobilizasyonunu azaltarak vagal/histaminik bronkokonstriksiyonu güçlü biçimde çözer. Miyokardda mitokondriyal/sarkolemmal K-ATP kanallarını açarak iskemik önkoşullama (preconditioning) sağlar.',
          },
        ]}
      />

      {/* 3. FARMAKOKİNETİK & FİZİKOKİMYA (AKORDİYON) */}
      <section
        id="sec-pkpd"
        className={`scroll-mt-20 rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen(!pkOpen)}
          className="w-full p-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-500/5"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Farmakokinetik, Fizikokimyasal Özellikler &amp; Sistemik Etkiler
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                FA/FI hızlı yükselme kinetiği, CYP2E1 deflorinasyonu, solunum/KVS/serebral etkiler
              </p>
            </div>
          </div>
          {pkOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {pkOpen && (
          <div className="p-5 pt-0 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="overflow-x-auto pt-4">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase">
                  <tr>
                    <th className="py-2 pr-4">Parametre</th>
                    <th className="py-2 pr-4">Değer (Miller / Morgan)</th>
                    <th className="py-2">Klinik Yorum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300 font-mono tabular-nums">
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Kan / Gaz Partisyon Katsayısı</td>
                    <td className="py-2 pr-4 font-bold text-amber-600 dark:text-amber-400">0.65</td>
                    <td className="py-2 font-sans">FA/FI hızla yükselir → hızlı maske indüksiyonu ve hızlı uyanma</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Yağ / Gaz · Beyin / Kan</td>
                    <td className="py-2 pr-4 font-bold">47 – 53 · 1.7</td>
                    <td className="py-2 font-sans">Uzun vakalarda İzoflurandan daha az yağ birikimi</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Molekül Ağırlığı · Kaynama · Buhar Basıncı</td>
                    <td className="py-2 pr-4 font-bold">200.05 g/mol · 58.5°C · 157 mmHg</td>
                    <td className="py-2 font-sans">Standart ısı kompanzasyonlu bypass vaporizatörle uygulanır</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-sans font-semibold">Metabolizma &amp; Eliminasyon</td>
                    <td className="py-2 pr-4 font-bold">%95–98 Akciğer · %2–5 CYP2E1</td>
                    <td className="py-2 font-sans">İnorganik F⁻ ve HFIP glukuronid oluşturur; böbrek hasarı nadirdir</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-teal-50/50 border-teal-100'}`}>
                <span className="font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5 mb-1">
                  <Wind className="w-4 h-4" />
                  <span>Solunum Sistemi</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hava yolu reflekslerini ve öksürüğü minimal uyarır. Tidal volümü düşürüp solunum hızını artırır; PaCO₂ yükselir. Güçlü <strong>bronkodilatördür</strong> (bronkospazm ve astımda ilk tercih volatil). Hipoksik pulmoner vazokonstriksiyonu (HPV) &gt; 1 MAC'ta baskılar.
                </p>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-rose-50/50 border-rose-100'}`}>
                <span className="font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 mb-1">
                  <HeartPulse className="w-4 h-4" />
                  <span>Kardiyovasküler Sistem</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Doza bağımlı SVR düşüşü ile MAP azalır; Desfluran gibi <strong>ani sempatik taşikardi YAPMAZ</strong>. Miyokardiyal iskemik önkoşullama (preconditioning) sağlar. QTc aralığını uzatabilir; konjenital uzun QT'de TIVA tercih edilebilir.
                </p>
              </div>
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-800/40 border-slate-700' : 'bg-indigo-50/50 border-indigo-100'}`}>
                <span className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 mb-1">
                  <Brain className="w-4 h-4" />
                  <span>Serebral &amp; Nöromüsküler</span>
                </span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  CMRO₂ düşer; &lt; 1.0 MAC'ta otoregülasyon korunur, &gt; 1.0 MAC'ta CBF/KİB artar. Çocuklarda %8 indüksiyonda <strong>epileptiform EEG</strong> ve uyanmada <strong>emergence ajitasyonu (%10–30)</strong> görülebilir. Nöromüsküler bloker etkisini potansiyalize eder.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* KONTRENDİKASYONLAR (ENDİKASYONLARDAN ÖNCE) */}
      <ContraindicationsGridBlock
        isDark={isDark}
        absoluteItems={[
          'Malign Hipertermi (MH) bilinen veya şüphelenilen genetik yatkınlık (RYR1/CACNA1S mutasyonu, aile öyküsü, santral kor miyopatisi, King-Denborough sendromu).',
          'Önceki halojenli anestezik maruziyetine bağlı açıklanamayan hepatit, sarılık veya aşırı duyarlılık reaksiyonu.',
        ]}
        relativeItems={[
          'İntrakraniyal kitle / ağır KİBAS (> 1.0 MAC serebral vazodilatasyon ile KİB artırabilir; nöroanestezide < 1 MAC veya TIVA tercih edilir).',
          'Konjenital veya edinilmiş Uzun QT Sendromu (Torsades de Pointes riski nedeniyle Propofol TIVA daha güvenlidir).',
          'Ağır hipovolemi veya dekompanse şok (SVR ve MAP düşüşü derin hipotansiyon yapabilir).',
          'Duchenne/Becker musküler distrofisi olan çocuklarda anesteziye bağlı hiperkalemik rabdomiyoliz riski (volatilden mümkünse kaçınılır).',
        ]}
        clinicalNote="Epilepsi öyküsü olan hastalarda yüksek konsantrasyonlu (%8) Sevofluran maske indüksiyonu kortikal epileptiform aktiviteyi tetikleyebilir; mümkünse IV Propofol indüksiyonu tercih edilmelidir."
      />

      {/* 4. KLİNİK ENDİKASYONLAR & DOZ REJİMLERİ */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-dozlar"
        title="Klinik Endikasyonlar ve Uygulama Protokolleri"
        icon={<Stethoscope className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        defaultOpen={false}
        bodyClassName="p-5 sm:p-6 space-y-4"
      >

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold">
              <tr>
                <th className="p-3">Endikasyon / Senaryo</th>
                <th className="p-3">Vaporizatör / EtSevo Hedefi</th>
                <th className="p-3">Taze Gaz Akımı (FGF)</th>
                <th className="p-3">Klinik Uygulama İncileri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Pediatrik İnhalasyon İndüksiyonu</td>
                <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">%6 – %8 (Prime Edilmiş Devre)</td>
                <td className="p-3 font-mono">6 – 8 L/dk (O₂ veya O₂/N₂O)</td>
                <td className="p-3">1–2 dk içinde bilinç kaybı; kirpik refleksi gidince IV damar yolu açılır, sonra %2–3'e düşürülür.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Erişkin Tek Vital Kapasite İndüksiyonu</td>
                <td className="p-3 font-mono font-bold text-amber-600 dark:text-amber-400">%8 (Maksimum)</td>
                <td className="p-3 font-mono">6 – 8 L/dk</td>
                <td className="p-3">Zor havayolunda spontan solunumu koruyarak veya iğne fobisinde hızlı uyutma (epilepsi öyküsünde kaçın!).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Erişkin Genel Anestezi İdamesi</td>
                <td className="p-3 font-mono font-bold text-teal-600 dark:text-teal-400">0.7 – 1.2 MAC (EtSevo %1.3–2.3)</td>
                <td className="p-3 font-mono">0.5 – 1.5 L/dk (Düşük Akım)</td>
                <td className="p-3">Opioid/rejyonal blokla %0.8–1.5 yeterlidir; yaşlıda her dekatta MAC %6 düşer.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">İntraoperatif Bronkospazm / Status Astmatikus</td>
                <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">1.0 – 1.5 MAC (Titre Edilmiş)</td>
                <td className="p-3 font-mono">Yüksek akımla hızlı yıkama</td>
                <td className="p-3">Bronş düz kasını direkt gevşetir ve vagal refleksleri baskılar; hipotansiyona dikkat.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-900 dark:text-white">Sezaryen Genel Anestezisi (Doğum Öncesi)</td>
                <td className="p-3 font-mono font-bold text-pink-600 dark:text-pink-400">0.5 – 0.75 MAC (%1.0–1.5 + N₂O)</td>
                <td className="p-3 font-mono">4 – 6 L/dk (hızlı denge)</td>
                <td className="p-3">Bebek çıkana dek uterin atoniyi önlemek için &lt; 1 MAC tutulur; çıkınca oksitosin başlanır.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </MonographAccordionSection>

      {/* 2. İNTERAKTİF MAC & TÜKETİM HESAPLAYICISI */}
      <MonographAccordionSection
        isDark={isDark}
        sectionId="sec-hesaplayici"
        title="İnteraktif Yaş-Düzeltmeli MAC & Sıvı Tüketimi Hesaplayıcısı"
        subtitle="Mapleson yaş formülü, N₂O/opioid aditif etkisi, hipotermi düzeltmesi ve taze gaz akımına (FGF) göre şişe tüketimi"
        icon={
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Gauge className="w-5 h-5" />
          </div>
        }
        defaultOpen={false}
        containerClassName={
          isDark ? 'bg-slate-900/95 border-amber-500/30 shadow-xl' : 'bg-white border-amber-200 shadow-lg'
        }
        bodyClassName="p-5 sm:p-6 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-end gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
          <MonographCopyButton isDark={isDark} getText={getReportText} />
        </div>

        {/* Sekme Seçici */}
        <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveCalcTab('mac_titration')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTab === 'mac_titration'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1. Yaş &amp; Adjuvan Düzeltmeli EtSevo (MAC)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveCalcTab('consumption')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
              activeCalcTab === 'consumption'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>2. Düşük Akım Sıvı Tüketimi &amp; CO₂e Ayak İzi</span>
          </button>
        </div>

        {activeCalcTab === 'mac_titration' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label htmlFor={ageInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hasta Yaşı (Yıl)
                </label>
                <input
                  id={ageInputId}
                  type="number"
                  min={0}
                  max={100}
                  step={0.5}
                  value={ageYears}
                  onChange={(e) => setAgeYears(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Süt çocuğu için 0.25 yazılabilir</span>
              </div>

              <div>
                <label htmlFor={n2oSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Eş Zamanlı N₂O (%)
                </label>
                <select
                  id={n2oSelectId}
                  value={n2oPercent}
                  onChange={(e) => setN2oPercent(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                >
                  <option value={0}>%0 N₂O (O₂ / Hava)</option>
                  <option value={50}>%50 N₂O (+0.48 MAC)</option>
                  <option value={60}>%60 N₂O (+0.58 MAC)</option>
                  <option value={66}>%66 N₂O (+0.63 MAC)</option>
                  <option value={70}>%70 N₂O (+0.67 MAC)</option>
                </select>
              </div>

              <div>
                <label htmlFor={opioidSelectId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Opioid MAC-Sparing Etkisi
                </label>
                <select
                  id={opioidSelectId}
                  value={opioidSparing}
                  onChange={(e) => setOpioidSparing(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                >
                  <option value="none">Opioid Yok (Saf Volatil)</option>
                  <option value="fentanyl_mod">Standart Fentanil (~%25↓)</option>
                  <option value="remifentanil_low">Düşük Remifentanil (~%35↓)</option>
                  <option value="remifentanil_high">Yüksek Remifentanil (~%50↓)</option>
                </select>
              </div>

              <div>
                <label htmlFor={tempInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Vücut Isısı (°C)
                </label>
                <input
                  id={tempInputId}
                  type="number"
                  min={28}
                  max={40}
                  step={0.5}
                  value={tempCelsius}
                  onChange={(e) => setTempCelsius(Math.max(28, Math.min(40, Number(e.target.value) || 36.5)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Her -1°C → MAC %5 azalır</span>
              </div>

              <div>
                <label htmlFor={macTargetId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hedef Toplam MAC
                </label>
                <select
                  id={macTargetId}
                  value={targetMacMultiple}
                  onChange={(e) => setTargetMacMultiple(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                >
                  <option value={0.7}>0.7 MAC (Hafif İdame / Yaşlı)</option>
                  <option value={1.0}>1.0 MAC (Standart İdame)</option>
                  <option value={1.2}>1.2 MAC (İmmobilite / Güçlü Uyaran)</option>
                  <option value={1.5}>1.5 MAC (Derin / Entübasyon)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPregnant}
                  onChange={(e) => setIsPregnant(e.target.checked)}
                  className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                />
                <span>Gebe Hasta (Terme yakın MAC ~%28–30 azalır)</span>
              </label>
            </div>

            {/* Sonuç Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                  Hedeflenen EtSevo (Monitör)
                </span>
                <span className="text-3xl font-black font-mono tabular-nums text-amber-700 dark:text-amber-300 mt-1 block">
                  %{targetEtSevoPercent.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 block">
                  BIS 40–60 eşliğinde titre ediniz
                </span>
              </div>

              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 block">
                  Yaş + Isı Düzeltmeli 1.0 MAC
                </span>
                <span className="text-2xl font-black font-mono tabular-nums text-teal-700 dark:text-teal-300 mt-1 block">
                  %{tempAdjustedMac.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  %100 O₂ içinde tek ajan MAC değeri
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  MAC-Awake (~0.34 MAC)
                </span>
                <span className="text-2xl font-black font-mono tabular-nums text-slate-800 dark:text-slate-100 mt-1 block">
                  %{macAwakePercent.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  İntraoperatif farkındalık risk eşiği (&lt; 0.7 MAC tehlikeli)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  MAC-BAR (~1.5 MAC)
                </span>
                <span className="text-2xl font-black font-mono tabular-nums text-slate-800 dark:text-slate-100 mt-1 block">
                  %{macBarPercent.toFixed(2)}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Opioidsiz adrenerjik yanıtı kesen düzey
                </span>
              </div>
            </div>
          </div>
        )}

        {activeCalcTab === 'consumption' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor={fgfInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Taze Gaz Akımı — FGF (L/dk)
                </label>
                <input
                  id={fgfInputId}
                  type="number"
                  min={0.3}
                  max={10}
                  step={0.2}
                  value={fgfLpm}
                  onChange={(e) => setFgfLpm(Math.max(0.3, Math.min(10, Number(e.target.value) || 1.0)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Düşük akım: 0.5–1.0 L/dk</span>
              </div>

              <div>
                <label htmlFor={dialInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Vaporizatör Kadran Ayarı (%)
                </label>
                <input
                  id={dialInputId}
                  type="number"
                  min={0.5}
                  max={8}
                  step={0.2}
                  value={dialPercent}
                  onChange={(e) => setDialPercent(Math.max(0.5, Math.min(8, Number(e.target.value) || 2.0)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label htmlFor={hoursInputId} className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ameliyat Süresi (Saat)
                </label>
                <input
                  id={hoursInputId}
                  type="number"
                  min={0.5}
                  max={16}
                  step={0.5}
                  value={caseHours}
                  onChange={(e) => setCaseHours(Math.max(0.5, Math.min(16, Number(e.target.value) || 1.0)))}
                  className="w-full px-3 py-2 rounded-lg text-sm font-mono font-bold tabular-nums bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-teal-500/15 border border-teal-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300 block">
                  Saatlik Sıvı Tüketimi
                </span>
                <span className="text-3xl font-black font-mono tabular-nums text-teal-700 dark:text-teal-300 mt-1 block">
                  {liquidMlPerHour.toFixed(1)} mL/saat
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 block">
                  1 mL sıvı Sevofluran = 182.7 mL buhar
                </span>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                  Toplam Vaka Tüketimi ({caseHours} sa)
                </span>
                <span className="text-3xl font-black font-mono tabular-nums text-amber-700 dark:text-amber-300 mt-1 block">
                  {totalLiquidMl.toFixed(0)} mL
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 block">
                  250 mL şişenin %{(Math.min(100, (totalLiquidMl / 250) * 100)).toFixed(0)}'i ({totalGrams.toFixed(0)} g)
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                  Sera Gazı Eşdeğeri (GWP₁₀₀ = 144)
                </span>
                <span className="text-3xl font-black font-mono tabular-nums text-emerald-700 dark:text-emerald-300 mt-1 block">
                  {co2eKg.toFixed(2)} kg CO₂e
                </span>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 block">
                  Desflurana (GWP₁₀₀ = 2540) göre ~18× daha çevreci!
                </span>
              </div>
            </div>
          </div>
        )}
      </MonographAccordionSection>

      {/* TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (v4.0) */}
      <TurkeyFormulationBlock
        isDark={isDark}
        preparations={[
          {
            name: 'Sevorane / Sojourn / Sevodex 250 mL Şişe',
            presentation: '250 mL amber cam veya kırılmaz PEN (polietilen naftalat) şişe — %100 saf sıvı inhalasyon anesteziği; yalnızca Sevofluran spesifik SARI renk kodlu anahtarlı dolum adaptörü (Quik-Fil / Key-Filler) ile kullanılır',
            concentration: '%100 Sıvı (1 mL = 182.7 mL buhar @ 20 °C)',
            saltOrBaseNote: 'Koruyucu/stabilizatör içermez; Lewis asidi yıkımını (HF oluşumu) önlemek amacıyla modern PEN şişelerde ~300 ppm su içerir. ASLA enjektöre çekilip IV verilmez!',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Vaporizatör Tipi: Standart ısı kompanzasyonlu değişken bypass (variable-bypass) Sevofluran vaporizatörü (sarı kodlu, %0.2–%8 kadran aralığı).',
          'Pediatrik & Erişkin İnhalasyon İndüksiyonu: Devreyi %6–8 Sevofluran + 6–8 L/dk O₂ (veya O₂/N₂O) ile prime edin; kirpik refleksi kaybolunca %2–3’e düşürün.',
          'İdame (Düşük / Minimal Akım): Modern KOH/NaOH-free absorban ile 0.5–1.0 L/dk FGF, EtSevo %1.3–2.3 (0.7–1.2 MAC; opioid/yaş düzeltmeli).',
        ]}
        concentrationTrapWarning="Sarı renk kodlu Quik-Fil / Key-Filler adaptörü dışında manuel veya başka ajan vaporizatörüne dolum KESİNLİKLE YASAKTIR. Sıvı Sevofluranın yanlışlıkla IV enjeksiyonu ağır ARDS, masif hemoliz ve kardiyak arreste yol açar."
      />

      {/* UYGULAMA YOLU, VAPORİZATÖR, CO₂ ABSORBANI & DEVRE UYUMLULUĞU (v4.0) */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionTitle="Uygulama Yolu, Vaporizatör, CO₂ Absorbanı & Devre Uyumluluğu"
        accessRequirement="peripheral-ok"
        accessSummary="Yalnızca solunum devresi ve Sevofluran spesifik sarı kodlu değişken-bypass vaporizatör aracılığıyla İNHALASYON yoluyla uygulanır (IV damar yolundan ASLA verilmez). Standart anestezi devresi, endotrakeal tüp (ETT), LMA veya yüz maskesi ile tam uyumludur; indüksiyon/idame süresince sürekli gaz analizörü (EtSevo, EtCO₂, FiO₂) ve devre ısısı izlenmelidir."
        phRange="Nötr Uçucu Sıvı (Kaynama: 58.5 °C · Buhar Basıncı: 157 mmHg)"
        osmolalityNote="1 mL sıvı = 1.52 g ≈ 182.7 mL buhar (20 °C). GWP₁₀₀ = 144 (Desflurana göre ~18 kat daha düşük karbon ayak izi)."
        compatibleDiluents={[
          'Taşıyıcı Gazlar: %100 O₂, O₂ / Medikal Hava veya O₂ / N₂O karışımları',
          'Modern KOH/NaOH-Free CO₂ Absorbanları (Amsorb Plus, Drägersorb Free, Medisorb EF): Compound A ve CO oluşumu pratik olarak SIFIR — minimal akım (0.5 L/dk) saatlerce güvenlidir',
          'Klasik Soda Lime (NaOH/KOH içeren): FDA etiketi FGF < 1 L/dk yasağı ve 1–2 L/dk’da maks 2 MAC·saat sınırı önerir',
        ]}
        stabilityNote="Işıktan korunarak 15–30 °C oda sıcaklığında saklanır. Tamamen kurumuş kuvvetli baz (Baralyme/soda lime) içeren absorban üzerinden geçirilmesi ekzotermik reaksiyonla (>100 °C) devre yangını, toksik yıkım ürünleri ve CO oluşturabilir; sabah cihaz kontrolünde absorban nemi mutlaka doğrulanmalıdır."
        ySiteCompatible={[
          'O₂ / Medikal Hava',
          'N₂O (Aditif MAC)',
          'Amsorb Plus / Drägersorb Free',
          'IV Propofol / Opioid / NMB (Ayrı IV Hat)',
          'Standart ETT / LMA / Maske Devresi',
        ]}
        ySiteIncompatible={[
          'Kurumuş Baralyme / Soda Lime (Yangın & Compound A!)',
          'Yüksek KOH/NaOH İçeren Kuru Absorban',
          'Desfluran / İzofluran Vaporizatörü',
          'Herhangi Bir IV / İntravasküler Enjeksiyon',
        ]}
        extravasationProtocol="Malign Hipertermi (MH) Devre & Vaporizatör Protokolü (MHAUS): MH şüphesinde Sevofluranı DERHAL kapatın, vaporizatörü anestezi cihazından fiziksel olarak çıkarın (veya sıfırlayın), inspiratuvar ve ekspiratuvar kollara aktif kömür filtresi (Vapor-Clean) takarak %100 O₂ 10–15 L/dk ile yüksek akım yıkama başlatın, TIVA’ya geçin ve 2.5 mg/kg IV Dantrolen uygulayın."
      />

      {/* 7. BÖBREK VE KARACİĞER YETMEZLİĞİ */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        renalSummary="Kısa/orta vakalarda güvenle kullanılır; ağır KBY'de (CrCl < 30) düşük akımda Compound A / F⁻ maruziyetini sınırlayın."
        renalDetails={[
          'Renal atılım gerekmez; uyanma hızı böbrek fonksiyonundan bağımsızdır.',
          'CYP2E1 ile %2–5 metabolizma sonucu serum inorganik F⁻ 50 µmol/L üzerine çıkabilse de intrarenal metoksifluran tipi deflorinasyon olmadığından klinik nefrotoksisite nadirdir.',
          'Ağır KBY\'de NaOH-free absorban kullanılması veya klasik soda lime varsa FGF ≥ 2 L/dk tutulması tercih edilir.',
        ]}
        hepaticSummary="Orta-ileri karaciğer yetmezliğinde hepatik arter tampon yanıtını (HABR) ve total hepatik kan akımını iyi korur."
        hepaticDetails={[
          'Desfluran ve İzofluranla birlikte hepatik oksijen sunumunu en iyi koruyan volatillerdendir.',
          'Halotan hepatiti tipinde immün TFA-protein kompleksi neredeyse oluşturmaz (HFIP metaboliti glukuronidasyonla atılır).',
          'Ağır sirozda kardiyak debi ve vasküler tonus kırılgan olduğundan MAC titrasyonu BIS eşliğinde düşük tutulmalıdır.',
        ]}
        {...STANDALONE_ORGAN_PART2['sevoflurane']}
      />

      {/* GERİATRİ (>65 YAŞ / KIRILGANLIK) & OBEZİTE DOZ YÖNETİMİ (v4.0) */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        geriatricReductionBadge="Her Dekatta MAC ~%6 ↓ (>40 Yaş)"
        geriatricPoints={[
          'Mapleson (1996) denklemine göre 40 yaşından sonra her 10 yılda Sevofluran MAC değeri ~%6 düşer: 40 yaşta %2.05 olan 1.0 MAC, 70 yaşta ~%1.70’e, 80 yaşta ~%1.60’a iner.',
          'Kırılgan (frailty), hipovolemik veya ileri yaşlı hastalarda standart erişkin EtSevo hedefleri aşırı derin anestezi (burst suppression), ağır hipotansiyon ve postoperatif deliryum riskini artırır.',
          'İşlenmiş EEG (BIS 40–60 / PSI) ve yaş-düzeltmeli MAC monitörizasyonu ile 0.7–0.9 MAC aralığında titrasyon önerilir.',
        ]}
        obesityWeightScalarBadge="Düşük Kan/Gaz (0.65) Avantajı"
        obesityPoints={[
          'Volatil ajanlar kilograma göre değil, alveolar kısmi basınç (EtSevo / yaş-düzeltmeli MAC) üzerinden titre edilir; obezite tek başına MAC değerini değiştirmez.',
          'Düşük kan/gaz (0.65) ve orta yağ/gaz (47–53) katsayısı sayesinde İzoflurana göre morbid obezitede belirgin hızlı uyanma ve hava yolu reflekslerinin erken dönüşünü sağlar.',
          'Çok uzun (>4–6 saat) süper-obez bariatrik vakalarda yağ dokusundan yavaş salınım (context-sensitive decrement time) nedeniyle Desflurana kıyasla uyanma birkaç dakika daha geç olabilir; vaka sonunda erken azaltma (taper) yararlıdır.',
        ]}
        clinicalNote="Morbid obezitede ve yaşlılarda fonksiyonel rezidüel kapasite (FRC) düşüktür; indüksiyon öncesi baş yukarı (ramped) pozisyonda preoksijenasyon ve PEEP ile atelektazi önlenmelidir."
      />

      {/* 8. GEBELİK & LAKTASYON */}
      <PregnancyLactationBlock
        isDark={isDark}
        pregnancySummary="Gebelikte MAC %28–30 azalır; plasentayı hızla geçer ve > 1.0 MAC'ta uterin atoniyi artırır."
        pregnancyDetails={[
          'Obstetrik dışı cerrahilerde 2. trimesterde güvenle uygulanabilir (normokapni ve maternal normotansiyon korunmalıdır).',
          'Sezaryen genel anestezisinde bebek doğana dek 0.5–0.75 MAC hedeflenir; doğum sonrası uterotonik yanıtı bozmamak için N₂O/opioid/TIVA desteğiyle konsantrasyon düşük tutulur.',
        ]}
        lactationSummary="Akciğerlerden hızla atıldığı için emzirmeye hemen dönülebilir ('pump & dump' gerekmez)."
        lactationDetails={[
          'Anne sütüne geçen miktar klinik olarak ihmal edilebilir düzeydedir ve oral emilimi yoktur.',
          'ASA / AAGBI kılavuzları uyarınca anne uyanıp bebeği güvenle tutabildiği anda emzirmeye devam edebilir.',
        ]}
      />

      {/* ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS) */}
      <AdverseEffectsBlock
        isDark={isDark}
        items={[
          {
            title: 'Emergence Ajitasyonu / Deliryum',
            incidenceOrSeverity: '%10–30 (Pediatri)',
            detail:
              'Özellikle okul öncesi çocuklarda ağrısız ve hızlı uyanmaya bağlı huzursuzluk, ağlama ve oryantasyon bozukluğu görülür; uyanma öncesi 1 mcg/kg Fentanil, 0.5–1 mg/kg Propofol veya 0.3–0.5 mcg/kg Deksmedetomidin riski belirgin azaltır.',
            tone: 'amber',
          },
          {
            title: 'Doza Bağımlı Hipotansiyon & Solunum Depresyonu',
            incidenceOrSeverity: 'Sık (Doza Bağımlı)',
            detail:
              'SVR düşüşüne bağlı MAP azalır (hipovolemide belirgin). Tidal volümü azaltır, PaCO₂ yükselir ve hipoksik/hiperkapnik solunum yanıtını köreltir; > 1 MAC düzeyinde hipoksik pulmoner vazokonstriksiyonu (HPV) baskılar.',
            tone: 'rose',
          },
          {
            title: 'QTc Uzaması & Aritmi Riski',
            incidenceOrSeverity: 'Orta / Kritik Risk',
            detail:
              'Ventriküler repolarizasyonu uzatarak QTc artışı yapabilir; konjenital Uzun QT sendromu veya QT uzatan ilaç kullananlarda Torsades de Pointes riskini artırır.',
            tone: 'rose',
          },
          {
            title: 'Postoperatif Bulantı ve Kusma (PONV)',
            incidenceOrSeverity: '%20–30',
            detail:
              'Tüm volatil ajanlar gibi erken (< 2 saat) postoperatif bulantı ve kusma riskini artırır; yüksek riskli olgularda Ondansetron + Deksametazon ikili profilaksisi veya Propofol TIVA tercih edilir.',
            tone: 'amber',
          },
          {
            title: 'Epileptiform EEG Aktivitesi',
            incidenceOrSeverity: 'Yüksek Konsantrasyonda',
            detail:
              'Özellikle %6–8 hızlı maske indüksiyonunda ve eşzamanlı hipokapni varlığında çocuk ve genç erişkinlerde spike-wave epileptiform EEG deşarjları ve nadiren tonik-klonik hareketler tetiklenebilir.',
            tone: 'indigo',
          },
          {
            title: 'Malign Hipertermi (MH)',
            incidenceOrSeverity: 'Nadir / Fatal',
            detail:
              'Yatkın bireylerde (RYR1/CACNA1S) iskelet kası sarkoplazmik retikulumundan kontrolsüz Ca²⁺ salınımını tetikler (EtCO₂ ani yükselmesi, taşikardi, kas rijiditesi, rabdomiyoliz, geç hipertermi).',
            tone: 'rose',
          },
          {
            title: 'Compound A & İnorganik Florür (F⁻)',
            incidenceOrSeverity: 'Biyokimyasal',
            detail:
              'Kuvvetli baz (KOH/NaOH) içeren soda lime ile düşük akımda Compound A oluşur; CYP2E1 ile %2–5 metabolizma sonucu serum F⁻ artar (insanda klinik nefrotoksisite nadirdir).',
            tone: 'teal',
          },
          {
            title: 'Kuru Absorbanda Ekzotermik Isınma',
            incidenceOrSeverity: 'Cihaz Güvenliği',
            detail:
              'Tamamen kurumuş Baralyme/soda lime üzerinden Sevofluran geçirilmesi kanister sıcaklığını 100°C üzerine çıkarıp toksik yıkım ürünleri ve devre yanması oluşturabilir.',
            tone: 'amber',
          },
        ]}
      />

      {/* KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        items={[
          {
            title: 'Duchenne / Becker Musküler Distrofisi ve Miyopatiler',
            detail:
              'Halojenli volatiller distrofik kas membranında anesteziye bağlı hiperkalemik rabdomiyoliz ve kardiyak arresti tetikleyebilir (Malign Hipertermi benzeri tablo). Bilinen veya şüpheli kas distrofilerinde volatil kullanılmayıp temiz makine + Propofol TIVA tercih edilmelidir.',
          },
          {
            title: 'Nöroanestezi & Artmış Kafa İçi Basıncı (KİBAS)',
            detail:
              '1.0 MAC üzerindeki konsantrasyonlarda serebral damar direncini düşürerek serebral kan akımını (CBF) ve KİB’i artırabilir. İntrakraniyal kitle/ödemli hastalarda < 0.8–1.0 MAC ile sınırlandırılmalı veya Propofol TIVA uygulanmalıdır.',
          },
          {
            title: 'Uzun QT Sendromu (LQTS) & Aritmojenik İlaçlar',
            detail:
              'Sevofluran QTc süresini belirgin uzatabilir. Konjenital LQTS, hipokalemi/hipomagnezemi veya sınıf III antiaritmik kullanan hastalarda elektrolitler düzeltilmeli, Propofol TIVA alternatifi değerlendirilmelidir.',
          },
          {
            title: 'Epilepsi Öyküsü ve Yüksek Konsantrasyonlu İndüksiyon',
            detail:
              '%8 tek vital kapasite maske indüksiyonu + hiperventilasyon (hipokapni) epileptiform aktiviteyi kolaylaştırır. Epileptik hastalarda IV indüksiyon sonrası 0.8–1.2 MAC idame çok daha güvenlidir.',
          },
          {
            title: 'Nöromüsküler Bloker (NMB) Potansiyalizasyonu',
            detail:
              'Rokuronyum, veküronyum ve sisatrakuryum etkisini %25–50 oranında potansiyalize eder ve süresini uzatır. Ekstübasyon öncesi mutlaka kantitatif TOF (Train-of-Four ≥ 0.90) monitörizasyonu doğrulanmalıdır.',
          },
          {
            title: 'Uterin Atoni & Sezaryen Doğumu',
            detail:
              '> 1.0 MAC düzeyinde uterus düz kasını gevşeterek oksitosin yanıtını azaltır ve postpartum kanama riskini artırır. Bebek doğduktan sonra düşük MAC (< 0.75) + opioid/TIVA geçişi kanamayı sınırlar.',
          },
        ]}
      />

      {/* DERİN FARMAKODİNAMİK & SİSTEMİK FİZYOLOJİ ANALİZİ (AKORDİYON · v4.0) */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Zarı & Moleküler Hedef (GABA-A / Glisin Amfifilik Cepleri, K2P [TREK-1/TASK-1/3], Nav/Cav & RyR1)',
          summary:
            'Sevofluran (florlu izopropil metil eter), nöronal, kardiyomiyosit ve düz kas hücre zarlarındaki çoklu transmembran iyon kanallarının amfifilik/hidrofobik ceplerine bağlanarak allosterik modülasyon yapar (Miller’s 10th Ed. / Stoelting’s 6th Ed.). Kortikal-talamik ağlarda bilinç kaybı ve amneziyi, spinal kord ön boynuz ve dorsal boynuz nöronlarında ise cerrahi uyarana hareketsizliği (MAC / immobilite) üretir.',
          points: [
            'Postsinaptik İnhibitör Cys-Loop Reseptörleri (GABA-A & Glisin TM2–TM3 Cepleri): Kortikal, talamik ve hipokampal nöron zarındaki GABA-A reseptörlerinin (α/β alt birimleri) ve spinal kord internöron/motor nöron zarındaki strychnine-duyarlı Glisin reseptörlerinin transmembran TM2–TM3 amfifilik oyuklarına bağlanarak agoniste afiniteyi artırır ve Cl⁻ kanalı açık kalma süresini uzatır.',
            'İki-Porlu Arka Plan Potasyum Kanalları (K2P: TREK-1, TASK-1, TASK-3): Nöronal ve motor nöron plazma zarındaki iki-porlu sızıntı K⁺ kanallarının (özellikle C-terminal sitoplazmik ve transmembran segmentleri üzerinden TREK-1, TASK-1 ve TASK-3) açık kalma olasılığını doğrudan artırır.',
            'Presinaptik Voltaj Kapılı Nav / Cav & Postsinaptik Eksitatör Reseptörler (NMDA, AMPA, nAChR, 5-HT₃): Presinaptik terminal zarındaki voltaj kapılı Na⁺ (Nav1.2/1.6) ve P/Q/N-tipi Ca²⁺ kanallarını inhibe eder; postsinaptik NMDA/AMPA glutamat reseptörlerini, santral ve kas-tipi nikotinik ACh reseptörlerini (nAChR) baskılar. Hava yolu nosiseptif TRPA1 kanallarını UYARMAZ (non-pungent profil).',
            'İskelet Kası Sarkoplazmik Retikulum (SR) Riyanodin Reseptörü-1 (RyR1) & Dihidropiridin (CACNA1S) Kompleksi: Genetik mutasyon taşıyan iskelet kası liflerinde T-tübül/SR kavşağındaki RyR1 Ca²⁺ salınım kanalını doğrudan duyarlılaştırarak Malign Hipertermi (MH) tetikleyicisi olarak davranır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Hücre İçi Sinyal Kaskadı, İkincil Haberciler & Organel / İyon Dinamiği',
          summary:
            'Membran iyon kanallarındaki bu çoklu etkileşim; nöron, kardiyomiyosit, vasküler/bronşiyal düz kas ve iskelet kası hücreleri içinde dört belirgin biyofiziksel ve biyokimyasal kaskadı tetikler:',
          points: [
            'Nöron İçi Hiperpolarizasyon & Presinaptik SNARE Ekzositoz Blokajı: Artmış Cl⁻ içe akımı (GABA-A/Glisin) ve sürekli arka plan K⁺ dışa çıkışı (K2P: TREK-1/TASK) nöron zarını hiperpolarize eder, membran direncini (input resistance) düşürerek şant inhibisyonu yaratır. Presinaptik terminalde Nav/Cav blokajıyla aksiyon potansiyeli genliği ve veziküler [Ca²⁺]i piki düşer; SNARE (syntaxin-1A) kompleksi üzerinden glutamat ekzositozu baskılanır.',
            'Kardiyomiyosit & Vasküler/Bronşiyal Düz Kas Hücresi İçi Ca²⁺ Dinamiği: Kardiyomiyosit ve damar/bronş düz kası sarkolemmasında L-tipi Ca²⁺ (Cav1.2) akımını azaltır, SR Ca²⁺ depolanmasını ve IP₃-aracılı Ca²⁺ salınımını kısıtlar → bronş ve arteriyol düz kasında Miyozin Hafif Zincir Kinaz (MLCK) aktivasyonu düşerek gevşeme oluşur; ventrikül miyokardında ise hERG (IKr) K⁺ kanalı inhibisyonuyla Faz 3 repolarizasyon (QTc) uzar.',
            'Miyokardiyal İskemik Önkoşullama (PKC-ε → mitoK-ATP & ROS Sinyal Kaskadı): Kardiyomiyosit içinde G-proteini/adenozin reseptör kenetlenmesiyle Protein Kinaz C-epsilon (PKC-ε) ve Akt/PI3K yolağını aktive eder; iç mitokondri zarındaki ATP-duyarlı K⁺ kanallarını (mitoK-ATP) açarak mitokondriyal Ca²⁺ aşırı yüklenmesini ve mitokondriyal permeabilite geçiş poru (mPTP) açılmasını önler (iskemi-reperfüzyon koruması).',
            'Malign Hipertermi Hücre İçi Felaketi (Mutant RyR1 → Kontrolsüz SR Ca²⁺ Deşarjı): RYR1/CACNA1S mutasyonlu iskelet kasında SR lümeninden sitozole durdurulamayan Ca²⁺ seli başlatır → aktin-miyozin kalıcı kontraksiyonu (rijidite), SERCA pompasının aşırı ATP tüketimi, glikojenoliz/glikoliz patlaması, aşırı CO₂/laktat/ısı üretimi ve sarkolemma yıkımı (rabdomiyoliz, hiperkalemi).',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'Kortiko-Talamik Ağ, Spinal Kord & Serebral Vasküler Doku → SSS & Beyin Fizyolojisi',
            tissueTarget: 'Piramidal Nöron · Spinal Ön Boynuz · Serebral Arteriyol',
            accent: 'indigo',
            points: [
              'Kortikal Hipnoz vs Spinal İmmobilite (MAC) & Nöromonitörizasyon: Talamokortikal GABA-A/K2P baskılanması bilinç kaybı ve amneziyi (~0.34 MAC-awake) sağlarken, spinal kord ventral boynuz motor nöronlarının Glisin/TREK-1 ile inhibisyonu cerrahi immobiliteyi (1.0 MAC) üretir ve >0.5 MAC üzerinde kortikospinal Motor Uyarılmış Potansiyelleri (MEP) siler.',
              'Serebral Otoregülasyon & Akım-Metabolizma Eşleşmesi (CBF / CMRO₂): Serebral metabolik oksijen tüketimini (CMRO₂) doza bağımlı düşürür; <1.0 MAC altında serebral otoregülasyon ve CO₂ reaktivitesi korunurken, >1.0 MAC üzerinde vasküler düz kas Cav1.2 blokajı baskın çıkarak direkt serebral vazodilatasyon, CBF artışı ve KİB yükselmesi (uncoupling) yapar.',
              'Yüksek Konsantrasyon Epileptiform EEG & Emergence Deliryumu: %6–8 hızlı maske indüksiyonunda (özellikle hipokapni eşlik ediyorsa) kortikal GABAerjik ara nöronların asenkron inhibisyonuyla spike-wave epileptiform EEG deşarjları oluşabilir; pediatride hızlı yıkama sonrası kortikal-subkortikal asenkron uyanma %10–30 emergence ajitasyonuna yol açar.',
            ],
          },
          {
            systemTitle: 'Miyokard Dokusu, İleti Sistemi & Sistemik Arteriyol Düz Kası → Kardiyovasküler Fizyoloji',
            tissueTarget: 'Ventrikül Miyokardı · Rezistans Arteriyoller · IKr (hERG) Kanalı',
            accent: 'rose',
            points: [
              'Sistemik Vasküler Direnç (SVR) & Sempatik Stabilite: Rezistans arteriyol düz kasında doza bağımlı gevşeme ile SVR ve MAP’ı %15–25 düşürür; Desfluranın aksine hava yolu TRPA1 irritasyonu yapmadığı için konsantrasyon hızla artırılsa bile refleks sempatik fırtına veya taşikardi OLUŞTURMAZ (kalp hızı >1.5 MAC’a kadar stabildir).',
              'Miyokard Kontraktilitesi & İskemik Önkoşullama (Preconditioning): Sarkolemmal L-tipi Ca²⁺ akımını hafif baskılayarak doza bağımlı ılımlı negatif inotropi yapar; buna karşın PKC-ε / mitoK-ATP aracılı anestezik önkoşullama sayesinde koroner cerrahi ve KAH hastalarında miyokardiyal stunning ve infarkt alanını küçültür.',
              'Elektrofizyoloji & Repolarizasyon (QTc Uzaması): Ventrikül miyokardında gecikmiş doğrultucu K⁺ akımını (IKr / hERG) inhibe ederek aksiyon potansiyeli süresini ve QTc aralığını uzatır; epikardiyal katekolamin aritmojenik duyarlılaştırması ise Halotana göre çok düşüktür.',
            ],
          },
          {
            systemTitle: 'Hava Yolu Mukozası, Bronş Düz Kası & Pulmoner Vasküler Yatak → Solunum Fizyolojisi',
            tissueTarget: 'Trakeobronşiyal Epitel · Bronş Düz Kası · Pulmoner Arteriyol',
            accent: 'teal',
            points: [
              'Non-Pungent Hava Yolu Toleransı & Güçlü Bronkodilatasyon: Hava yolu C-lif nosiseptörlerini (TRPA1/TRPV1) uyarmadığı için öksürük, nefes tutma veya laringospazm tetiklemez (pediatrik/erişkin maske indüksiyonunda altın standart). Bronş düz kasında voltaj kapılı Ca²⁺ girişini ve vagal ACh salınımını bloke ederek status astmatikus ve intraoperatif bronkospazmı güçlü biçimde çözer.',
              'Solunum Paterni & Kemoreseptör Baskılanması: Diyafram ve interkostal motor nöron çıktılarını azaltarak tidal volümü (VT) düşürür, solunum frekansını artırır (hızlı-yüzeyel solunum); ölü boşluk/VT oranı artar ve PaCO₂ yükselir. Karotid cisimcik Tip-I glomus hücrelerinde TASK-1/3 kanallarını etkileyerek hipoksik ventilatuar yanıtı 0.1 MAC’ta dahi %50–70 köreltir.',
              'Hipoksik Pulmoner Vazokonstriksiyon (HPV): Pulmoner arteriyol düz kasında >1.0 MAC konsantrasyonlarda HPV refleksini ~%30–50 baskılayarak tek akciğer ventilasyonunda (OLV) intrapulmoner şant fraksiyonunu (Qs/Qt) artırabilir.',
            ],
          },
          {
            systemTitle: 'Hepatorenal Parankim, Uterus Düz Kası & İskelet Kası Dokusu → Organ & Metabolik Fizyoloji',
            tissueTarget: 'Hepatosit (CYP2E1) · Renal Tübül · Miyometriyum · İskelet Kası',
            accent: 'amber',
            points: [
              'Hepatik Kan Akımı, CYP2E1 Deflorinasyonu & Compound A: Hepatik arter tampon yanıtını (HABR) korur; karaciğerde %2–5 oranında CYP2E1 ile inorganik F⁻ ve HFIP’ye yıkılır (Halotan benzeri immün TFA-protein hapteni üretmez). Kuru/kuvvetli baz (KOH/NaOH) CO₂ absorbanı ile düşük akımda oluşan fluorometil-2,2-difloro-1-(triflorometil)vinil eter (Compound A) insanda yüksek eşik nedeniyle klinik nefrotoksisite yapmaz ve modern NaOH-free absorbanda sıfırdır.',
              'Miyometriyum (Uterus Düz Kası) Gevşemesi: Uterus düz kası sarkolemmasında L-tipi Ca²⁺ kanallarını inhibe ederek >1.0 MAC üzerinde doza bağımlı uterin relaksasyon ve oksitosin direnci yapar (sezaryende postpartum atoni ve kanama riskini önlemek için ≤0.5–0.75 MAC sınırı).',
              'Nöromüsküler Kavşak (NMJ) & İskelet Kası: Motor son plakta postsinaptik nAChR inhibisyonu, spinal motor nöron depresyonu ve kas kan akımı artışıyla non-depolarizan NMB’leri %25–50 potansiyalize eder; RYR1 mutant iskelet kasında ise fulminan Malign Hipertermiyi tetikler.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'MAC Aditivitesi, Opioid MAC-Sparing Tavan Etkisi, Yaş/Isı Kinetiği & NMB Sinerjisi',
          summary:
            'Sevofluran tek başına tam genel anestezi (hipnoz, amnezi ve cerrahi immobilite) sağlayabilen tam etkili bir ajandır; ancak çoklu ajan kombinasyonlarında belirgin farmakodinamik aditivite ve sinerji sergiler:',
          points: [
            'Volatil & N₂O Doğrusal MAC Aditivitesi: İnhalasyon anesteziklerinin spinal immobilite (MAC) etkileri tam aditiftir; örneğin %60 N₂O (~0.58 MAC) eklendiğinde 1.0 toplam MAC için gereken Sevofluran fraksiyonu doğrusal olarak %2.05’ten ~%0.85’e düşer.',
            'Opioid & α₂-Agonist MAC-Sparing Sinerjisi ve Tavan (Ceiling) Etkisi: Fentanil/Remifentanil ve Deksmedetomidin dorsal boynuz nosiseptif iletimini baskılayarak Sevofluran MAC ve MAC-BAR değerini %25–60 oranında düşürür; ancak opioidler kortikal hipnoz sağlamadığı için MAC düşüşü ~%60–70’te platoya (tavan etkisine) ulaşır — farkındalığı (awareness) önlemek için daima ≥0.5–0.7 MAC (veya BIS 40–60) hipnotik bileşen korunmalıdır.',
            'Yaş (Mapleson) & Hipotermi Kinetiği: 40 yaşından sonra nöronal sinaps yoğunluğu ve membran akışkanlığı değişimiyle her dekatta MAC ~%6 azalır; ayrıca vücut sıcaklığındaki her 1 °C düşüş hem doku çözünürlüğünü artırarak hem de CMRO₂’yi düşürerek MAC gereksinimini ~%5 azaltır.',
          ],
        }}
        clinicalPearls={[
          'Pediatrik Emergence Deliryumu (PAED) Fizyolojisi & Profilaksisi: Düşük kan/gaz katsayısı (0.65) nedeniyle çocuklarda talamokortikal ağlar kognitif entegrasyon tam kurulmadan hızla uyanır (%10–30 ajitasyon); vaka bitiminden 10 dk önce 0.3–0.5 mcg/kg IV Deksmedetomidin, 1 mcg/kg Fentanil veya 1 mg/kg Propofol verilmesi bu asenkron uyanmayı önler.',
          'Compound A Efsanesi vs Gerçek Kuru Absorban Tehlikesi: Modern kalsiyum hidroksit bazlı (KOH/NaOH içermeyen; Amsorb Plus / Drägersorb Free) absorbanlarda Compound A ve CO oluşumu pratik olarak sıfırdır ve 0.5 L/dk minimal akım güvenlidir. Asıl ölümcül tehlike, hafta sonu O₂ açık unutulup tamamen kurumuş eski tip KOH/NaOH absorbanla Sevofluranın >100 °C ekzotermik reaksiyona girerek devre yangını ve akciğer hasarı yapmasıdır.',
          'Omurga / Kraniyal MEP Monitörizasyon Kuralı: Sevofluran >0.5 MAC üzerinde spinal ön boynuz α-motor nöronlarındaki TREK-1 ve Glisin kanallarını güçlü biçimde aktive ederek transkraniyal MEP dalgalarını siler; kritik MEP takibinde Propofol–Remifentanil TIVA’ya geçilmelidir.',
          'Yaşlı & Hipotermik Hastada Aşırı Doz Tuzağı: 75 yaşında, 34.5 °C hipotermik ve Remifentanil infüzyonu alan bir hastada %2.0 EtSevo vermek gerçekte ~2.2 MAC derinliğine karşılık gelir (derin burst suppression, postoperatif deliryum ve vazoplejik şok riski!).',
        ]}
      />

      {/* 10. ŞİDDET DERECELİ İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        drugName="Sevofluran"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Süksinilkolin (MH Yatkın Hastalarda) & Kurumuş Kuvvetli Baz CO₂ Absorbanı',
            mechanism: 'RyR1 Sinerjik Malign Hipertermi Tetiklenmesi / Ekzotermik Kimyasal Yıkım',
            clinicalEffect: 'Fulminan Malign Hipertermi krizi (rabdomiyoliz, hiperkalemi, kardiyak arrest) veya devre yangını / toksik yıkım ürünleri.',
            management: 'MH yatkın hastada volatil + süksinilkolin kesinlikle kullanılmaz (temiz makine + TIVA). Kuru absorban derhal değiştirilir.',
          },
          {
            severity: 'D',
            agent: 'Non-Depolarizan Nöromüsküler Blokerler (Roküronyum, Veküronyum, Sisatrakuryum)',
            mechanism: 'Postsinaptik nAChR İnhibisyonu & Spinal Motor Nöron Baskılanması',
            clinicalEffect: 'NMB etkisi %25–50 potansiyalize olur, derlenme ve rezidüel kürarizasyon süresi uzar.',
            management: 'İdame NMB dozlarını azaltın; ekstübasyon öncesi mutlaka kantitatif TOF (≥ 0.90) doğrulayın.',
          },
          {
            severity: 'D',
            agent: 'Opioidler (Remifentanil, Fentanil) · Propofol · Deksmedetomidin · N₂O',
            mechanism: 'Güçlü Santral Farmakodinamik Sinerji (MAC-Sparing)',
            clinicalEffect: 'Sevofluran MAC gereksinimi %25–60 düşer; yüksek kombine dozlarda derin hipotansiyon ve solunum depresyonu.',
            management: 'EtSevo hedefini yaş ve adjuvanlara göre aşağı titre edin; BIS 40–60 ve MAP ≥ 65 mmHg izleyin.',
          },
          {
            severity: 'D',
            agent: 'QT Uzatan Ajanlar (Amiodaron, Sotalol, Haloperidol, Ondansetron Yüksek Doz)',
            mechanism: 'Aditif Ventriküler Repolarizasyon (IKr) Uzaması',
            clinicalEffect: 'QTc > 500 ms ve Torsades de Pointes ventriküler taşikardi riski.',
            management: 'K⁺ ve Mg²⁺’yi normalleştirin; konjenital LQTS veya yüksek riskte Propofol TIVA tercih edin.',
          },
          {
            severity: 'C',
            agent: 'Kalsiyum Kanal Blokerleri (Verapamil, Diltiazem) & Beta-Blokerler · İzoniyazid (CYP2E1 İndükleyici)',
            mechanism: 'Aditif Negatif İnotropi/Vazodilatasyon; CYP2E1 İndüksiyonu ile F⁻ Artışı',
            clinicalEffect: 'Hipotansiyon/bradikardi belirginleşir; kronik izoniyazid veya etanol kullanımı inorganik F⁻ oluşumunu artırabilir.',
            management: 'Hemodinamiyi yakından izleyin; ağır KBY’de düşük akım süresini ve absorban tipini optimize edin.',
          },
        ]}
        references={[
          {
            authors: 'Mapleson WW',
            title: 'Effect of age on MAC in humans: a meta-analysis.',
            journal: 'Br J Anaesth',
            year: 1996,
            pmid: '8777094',
            note: 'Yaşa bağlı evrensel MAC düşüş denklemi (40 yaş referanslı).',
          },
          {
            authors: 'Lerman J, Sikich N, Kleinman S, Yentis S',
            title: 'The pharmacology of sevoflurane in infants and children.',
            journal: 'Anesthesiology',
            year: 1994,
            pmid: '8024136',
            doi: '10.1097/00000542-199404000-00014',
            note: 'Pediatrik popülasyonda yaşa göre Sevofluran MAC değerleri (yenidoğan %3.3, 1–6 ay %3.2) ve maske indüksiyon kinetiği.',
          },
          {
            authors: 'Kharasch ED, Frink EJ Jr, Artru A, et al.',
            title: 'Long-duration low-flow sevoflurane and isoflurane effects on postoperative renal and hepatic function.',
            journal: 'Anesth Analg',
            year: 2001,
            note: 'Uzun süreli düşük akım (1 L/dk) Sevofluran ile Compound A maruziyetinin böbrek ve karaciğer fonksiyonlarını bozmadığını gösteren prospektif çalışma.',
          },
          {
            authors: 'Gropper MA, Eriksson LI, Fleisher LA, et al.',
            title: "Miller's Anesthesia (Inhaled Anesthetics: Mechanisms, Pharmacokinetics & Pharmacology). 9th–10th ed.",
            journal: 'Elsevier',
            year: 2024,
            note: 'İnhalasyon anestezikleri temel farmakolojisi, Compound A ve organ koruyucu etkiler.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/sevoflurane.html"
        medscapeUrl="https://reference.medscape.com/drug/ultane-sevoflurane-343095"
      />
    </div>
  );
};

export default SevofluraneProtocol;
