import React, { useState, useId } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Layers,
  RotateCcw,
  ShieldCheck,
  Syringe,
  Zap,
} from 'lucide-react';
import {
  AdverseEffectsBlock,
  CompatibilityAndLineBlock,
  ContraindicationsGridBlock,
  DeepPharmacodynamicsBlock,
  DrugReferencesAndInteractionsBlock,
  GeriatricAndObesityBlock,
  HighAlertSafetyBlock,
  MonographCopyButton,
  MonographQuickNav,
  OrganImpairmentGridBlock,
  PregnancyLactationBlock,
  SpecialClinicalCautionsBlock,
  TurkeyFormulationBlock,
} from './shared/DrugMonographBlocks';
import { STANDALONE_ORGAN_PART2 } from '../../data/organImpairment/standaloneOrganPart2';
import { ObesityDosingScaler } from './shared/ObesityDosingScaler';

interface Props {
  isDark: boolean;
}

type BlockScenario = 'moderate' | 'deep' | 'cico';

export const SugammadexProtocol: React.FC<Props> = ({ isDark }) => {
  // --- HESAPLAYICI STATE'LERİ ---
  const [weightKg, setWeightKg] = useState<number>(75);
  const [blockScenario, setBlockScenario] = useState<BlockScenario>('moderate');
  const [pkOpen, setPkOpen] = useState<boolean>(false);

  // Erişilebilirlik Kimlikleri
  const weightInputId = useId();

  // --- DOZ & FLAKON HESAPLAMALARI ---
  const scenarioConfig: Record<
    BlockScenario,
    {
      label: string;
      shortLabel: string;
      tofCriteria: string;
      doseMgKg: number;
      expectedRecoveryMin: string;
      nmbNote: string;
      accent: 'teal' | 'amber' | 'rose';
    }
  > = {
    moderate: {
      label: 'Orta / Yüzeyel Blok (TOF ≥ T2)',
      shortLabel: '2 mg/kg · Orta Blok',
      tofCriteria: 'TOF ≥ T2 (en az 2 yanıt mevcut)',
      doseMgKg: 2,
      expectedRecoveryMin: '~2,0 dk',
      nmbNote: 'Roküronyum & Veküronyum (Yetişkin & Pediatrik ≥ 2 yaş)',
      accent: 'teal',
    },
    deep: {
      label: 'Derin Blok (TOF = 0, PTC ≥ 1–2)',
      shortLabel: '4 mg/kg · Derin Blok',
      tofCriteria: 'TOF = 0, Post-Tetanik Sayım (PTC) ≥ 1–2',
      doseMgKg: 4,
      expectedRecoveryMin: '~2,9 dk',
      nmbNote: 'Roküronyum & Veküronyum (Yetişkin & Pediatrik ≥ 2 yaş)',
      accent: 'amber',
    },
    cico: {
      label: 'Acil Kurtarma / CICO (Roküronyum 1,2 mg/kg sonrası 3. dk)',
      shortLabel: '16 mg/kg · Acil CICO',
      tofCriteria: 'Roküronyum 1,2 mg/kg indüksiyonundan ~3 dk sonra acil reversal',
      doseMgKg: 16,
      expectedRecoveryMin: '~1,5 – 2,2 dk',
      nmbNote: 'YALNIZCA Roküronyumda onaylıdır! (Veküronyumda 16 mg/kg onaylı DEĞİLDİR)',
      accent: 'rose',
    },
  };

  const activeConfig = scenarioConfig[blockScenario];
  const totalDoseMg = weightKg * activeConfig.doseMgKg;
  // TR Flakonları: 200 mg / 2 mL ve 500 mg / 5 mL -> her ikisi de 100 mg/mL
  const volumeMlDirect = totalDoseMg / 100;
  // Pediatrik sulandırma (10 mg/mL -> 1 mL [100 mg] + 9 mL SF)
  const volumeMlPediatricDiluted = totalDoseMg / 10;
  const vials200Count = Math.ceil(totalDoseMg / 200);
  const vials500Count = Math.ceil(totalDoseMg / 500);
  const isPediatricWeight = weightKg < 30;

  return (
    <div className="space-y-8 font-sans">
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* HIZLI BÖLÜM NAVİGASYON BARI (v5.0)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <MonographQuickNav
        isDark={isDark}
        items={[
          { id: 'sec-guvenlik', label: 'ISMP Güvenlik' },
          { id: 'sec-ozet', label: 'Özet & Etki' },
          { id: 'sec-pkpd', label: 'Farmakokinetik' },
          { id: 'sec-kontrendikasyon', label: 'Kontrendikasyon' },
          { id: 'sec-endikasyon', label: 'Endikasyonlar' },
          { id: 'sec-dozaj', label: 'Dozaj' },
          { id: 'sec-hesaplayici', label: 'Hesaplayıcı' },
          { id: 'sec-tr-preparat', label: 'TR Preparat' },
          { id: 'sec-uyumluluk', label: 'Damar Yolu & Y-Site' },
          { id: 'sec-organ', label: 'Böbrek & KC' },
          { id: 'sec-geriatri-obezite', label: 'Geriatri & Obezite' },
          { id: 'sec-gebelik', label: 'Gebelik' },
          { id: 'sec-olumsuz', label: 'Olumsuz Etkiler' },
          { id: 'sec-ozel-durumlar', label: 'Özel Durumlar' },
          { id: 'sec-derin-pd', label: 'Derin Farmakodinami' },
          { id: 'sec-kaynaklar', label: 'Etkileşim & Kaynakça' },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ISMP HIGH-ALERT & TALL-MAN GÜVENLİĞİ (EN ÜSTTE KAPALI AKORDİYON)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <HighAlertSafetyBlock
        isDark={isDark}
        sectionId="sec-guvenlik"
        defaultOpen={false}
        tallManName="SUGAMMADEX"
        confusionRiskWith="Neostigmin (antikolinesteraz — tamamen farklı mekanizma!) · Benzilizokinolin NMB'ler (Atraküryum / Sisatraküryum / Mivaküryum — ETKİSİZ!) · Süksinilkolin (ETKİSİZ!)"
        criticalAlerts={[
          'Yalnızca Aminosteroid NMB’lerde Etkilidir: Yalnızca Roküronyum (en yüksek afinite) ve Veküronyum (+ zayıf olarak Panküronyum) bağlar! Benzilizokinolinler (Atraküryum, Sisatraküryum, Mivaküryum) ve Süksinilkolin üzerinde HİÇBİR ETKİSİ YOKTUR!',
          'Kardiyak Bradikardi & Asistoli Uyarısı (FDA/EMA): Uygulamadan dakikalar içinde ani ve belirgin bradikardi (nadiren asistoli) bildirilmiştir; uygulama sırasında sürekli EKG ve hemodinami izlemi şarttır, Atropin yatak başında hazır bulundurulmalıdır.',
          'Oral / Hormonal Kontraseptif Etkileşimi ("7 Günlük Bariyer Kuralı"): 4 mg/kg tek doz sugammadeks, progesteronu kapsülleyerek serbest progesteron düzeyini 1 adet oral kontraseptif hap unutulmuş gibi (~%34) düşürür! Doğurganlık çağındaki kadın hastalara 7 gün boyunca ek non-hormonal bariyer kontrasepsiyon kullanmaları mutlaka bildirilmelidir.',
          'Anafilaksi & Rekürarizasyon (Yetersiz Doz / Sabit 200 mg Hatası): Kantitatif TOF/PTC monitörizasyonu olmadan derin blokta 2 mg/kg (veya sabit 1 flakon 200 mg) verilmesi rekürarizasyona (yeniden paralizi ve üst havayolu obstrüksiyonuna) yol açar!',
          'Ağır Böbrek Yetmezliği (CrCl < 30 mL/dk): Sugammadeks-roküronyum kompleksi metabolize edilmez ve tamamen böbrekten atılır; CrCl < 30 mL/dk’da kompleks günlerce dolaşımda kalır (prospektüste önerilmez; ancak acil durumlarda yüksek akımlı [high-flux] hemodiyaliz ile temizlenebilir).',
        ]}
        antidoteOrRescue="Anafilaksi (0,02–0,3%): Adrenalin 50–200 mcg IV titre (veya 0,5 mg IM) + %100 O₂ + kristaloid 20–30 mL/kg; Şiddetli Bradikardi / Asistoli: Atropin 0,5–1 mg IV (veya Adrenalin); Rekürarizasyon (yetersiz doz / obezitede IBW hatası): Ek 2–4 mg/kg Sugammadeks + kantitatif TOF monitörizasyonu."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & YATAK BAŞI ETKİ MEKANİZMASI      */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-ozet"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-teal-500/15 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                Modifiye γ-Siklodekstrin · Selektif Gevşetici Bağlayıcı Ajan (SRBA)
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                TR Flakon: 200 mg / 2 mL &amp; 500 mg / 5 mL (100 mg/mL)
              </span>
              <span className="font-mono px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Doz: 2 · 4 · 16 mg/kg IV Bolus (10 sn)
              </span>
              <span className="font-mono text-slate-500 dark:text-slate-400">ATC: V03AB35</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Sugammadeks Sodyum (Bridion® / Brimadeks® / Sugaver®) Monografisi
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              <strong className="text-slate-900 dark:text-white font-semibold">Farmakolojik Kategori:</strong>{' '}
              Sekiz glukopiranoz halkasından oluşan <strong>modifiye γ-siklodekstrin</strong> yapılı, reseptör veya
              enzim etkileşimi olmaksızın aminosteroid nöromüsküler blokerleri (özellikle{' '}
              <strong>Roküronyum &gt; Veküronyum</strong>) plazmada <strong>1:1 moleküler enkapsülasyon</strong> ile
              hapsederek etkisizleştiren <strong>Selektif Gevşetici Bağlayıcı Ajan (SRBA)</strong>. Derin blok ve acil
              &quot;entübe edilemiyor, ventile edilemiyor&quot; (CICO) kurtarmada kolinerjik yan etki oluşturmadan
              dakikalar içinde tam nöromüsküler geri dönüş (TOFR ≥ 0,9) sağlar.
            </p>
          </div>

          <div className="shrink-0">
            <MonographCopyButton
              isDark={isDark}
              label="Monografi Özeti Kopyala"
              getText={() =>
                [
                  `SUGAMMADEKS SODYUM (200 mg/2 mL & 500 mg/5 mL = 100 mg/mL) KLİNİK ÖZETİ`,
                  `• Mekanizma: Modifiye γ-siklodekstrin (SRBA) — Roküronyum > Veküronyum 1:1 plazma şelasyonu (Atropin GEREKMEZ!)`,
                  `• Aktif Hesaplama (${weightKg} kg TBW · ${activeConfig.label}): ${activeConfig.doseMgKg} mg/kg = ${totalDoseMg.toFixed(0)} mg -> ${volumeMlDirect.toFixed(2)} mL (100 mg/mL, 10 sn IV bolus)`,
                  `• Gereken TR Flakon: ${vials200Count} adet 200 mg/2 mL flakon VEYA ${vials500Count} adet 500 mg/5 mL flakon (Beklenen TOF ≥ 0,9: ${activeConfig.expectedRecoveryMin})`,
                  `• Kritik Uyarılar: Benzilizokinolinlerde (Sisatraküryum/Atraküryum) ve Süksinilkolinde ETKİSİZ! Doğurganlık çağındaki kadınlarda 7 GÜN ek bariyer kontrasepsiyon şart! CrCl < 30 mL/dk'da önerilmez.`,
                ].join('\n')
              }
            />
          </div>
        </div>

        {/* Yatak Başı Klinik Etki Mekanizması (#sec-etki) */}
        <div id="sec-etki" className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-200' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-teal-600 dark:text-teal-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>1:1 Moleküler Enkapsülasyon (Şelasyon)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-teal-500/15">Roküronyum &gt; Veküronyum</span>
            </div>
            <p className="text-xs leading-relaxed">
              Plazmadaki serbest aminosteroid NMB molekülünü hidrofobik iç boşluğuna <strong>1:1 oranında</strong>{' '}
              hapsederek nöromüsküler kavşaktan plazmaya konsantrasyon gradyentiyle geri çeker ve motor son plak
              nAChR&apos;lerini serbestleştirir.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-200' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-amber-600 dark:text-amber-400">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 shrink-0" />
                <span>Nikotinik / Muskarinik Etkisi Yoktur</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/15">Atropin GEREKMEZ!</span>
            </div>
            <p className="text-xs leading-relaxed">
              Antikolinesteraz (Neostigmin) değildir; asetilkolinesterazı inhibe etmez, kolinerjik yan etki
              (sekresyon, bronkospazm, PONV) oluşturmaz ve rutin antikolinerjik (Atropin/Glikopirolat) eklenmesi
              gerekmez.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/50 text-indigo-200' : 'bg-indigo-50/70 border-indigo-200 text-indigo-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 font-bold text-sm text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 shrink-0" />
                <span>Derin &amp; Acil Blokta Eşsiz Hız (TOF ≥ 0,9)</span>
              </span>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/15">~2–3 dk Reversal</span>
            </div>
            <p className="text-xs leading-relaxed">
              Neostigminin etkisiz kaldığı derin blokta (PTC 1–2) <strong>4 mg/kg</strong> ile ~2,9 dk&apos;da, CICO
              acil kurtarmada <strong>16 mg/kg</strong> ile ~1,5–2,2 dk&apos;da tam reversal sağlar (ASA/ESAIC 2023
              Kanıt 1A).
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. FARMAKOKİNETİK ÖZELLİKLER AKORDİYONU (#sec-pkpd, pkOpen=false)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-pkpd"
        className={`rounded-2xl border transition-all overflow-hidden ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <button
          type="button"
          onClick={() => setPkOpen(!pkOpen)}
          aria-expanded={pkOpen}
          className={`w-full p-5 sm:p-6 flex items-center justify-between text-left transition-colors cursor-pointer ${
            isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 flex-wrap">
                <span>Farmakokinetik (ADME) Özellikleri</span>
                <span className="text-xs font-normal px-2 py-0.5 rounded font-mono bg-teal-500/15 text-teal-700 dark:text-teal-300">
                  t½: ~2 Saat · %0 Metabolizma · %95+ Renal Atılım
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                1,5–3 dakikada TOF ≥ 0,9 dönüşü, ekstraselüler dağılım (Vd 11–14 L), %0 plazma protein bağlanması ve
                tamamen glomerüler filtrasyonla idrarla atılım.
              </p>
            </div>
          </div>
          {pkOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
          )}
        </button>

        {pkOpen && (
          <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center mt-4">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Etki Başlangıcı (TOF ≥ 0,9)
                </span>
                <span className="text-base font-bold font-mono text-teal-600 dark:text-teal-400 mt-1 block">
                  1,5 – 3 Dakika
                </span>
                <span className="text-[10px] text-slate-400">2 mg/kg ~2 dk · 4 mg/kg ~2,9 dk · 16 mg/kg ~1,5–2,2 dk</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Dağılım Hacmi (Vd)
                </span>
                <span className="text-base font-bold font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                  11 – 14 L
                </span>
                <span className="text-[10px] text-slate-400">Ekstraselüler sıvı (yağa dağılmaz!)</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Eliminasyon Yarı Ömrü (t½)
                </span>
                <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1 block">
                  ~2 Saat
                </span>
                <span className="text-[10px] text-slate-400">CrCl &lt; 30 mL/dk&apos;da 19–35+ saat!</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <span className="block text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                  Metabolizma &amp; Atılım
                </span>
                <span className="text-base font-bold font-mono text-rose-600 dark:text-rose-400 mt-1 block">
                  %0 · %95+ Renal
                </span>
                <span className="text-[10px] text-slate-400">Protein bağlanması: %0 · Değişmeden idrarla</span>
              </div>
            </div>

            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-2.5 ${
                isDark ? 'bg-slate-800/40 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Dağılım ve Plazma Protein Bağlanması (%0):
                </strong>{' '}
                Sugammadeks büyük ve hidrofilik bir makrohalka (MW 2178 Da) olduğundan plazma proteinlerine veya
                eritrositlere bağlanmaz (%0), kan-beyin bariyerini ve plasentayı ihmal edilebilir düzeyde geçer ve
                yalnızca <strong>ekstraselüler sıvı hacmine (Vd ≈ 11–14 L)</strong> dağılır (adipoz dokuya geçmez).
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  • Sıfır Metabolizma &amp; Renal Kompleks Eliminasyonu:
                </strong>{' '}
                Karaciğerde veya plazmada metabolize edilmez (%0 metabolizma). Hem serbest sugammadeks hem de
                sugammadeks-roküronyum kompleksi <strong>%95&apos;in üzerinde değişmeden glomerüler filtrasyon</strong>{' '}
                yoluyla 24 saat içinde idrarla atılır (plazma klirensi ~88 mL/dk ≈ GFR). Normalde hepatobiliyer yolla
                atılan roküronyum, sugammadekse bağlandığında atılım yolu <strong>renal filtrasyona</strong> döner;
                bu nedenle <strong>CrCl &lt; 30 mL/dk</strong> olan hastalarda kompleks yarı ömrü 19–35+ saate (hatta
                anürik hastalarda günlere) uzar!
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. KONTRENDİKASYONLAR — ENDİKASYONLARDAN ÖNCE (#sec-kontrendikasyon) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <ContraindicationsGridBlock
        isDark={isDark}
        sectionId="sec-kontrendikasyon"
        absoluteTitle="Mutlak Kontrendikasyonlar"
        absoluteItems={[
          'Sugammadeks sodyuma veya preparattaki yardımcı maddelerden herhangi birine bilinen aşırı duyarlılık veya önceki anafilaksi öyküsü.',
        ]}
        relativeTitle="Göreceli Kontrendikasyonlar & Klinik Kısıtlamalar"
        relativeItems={[
          'Ağır Böbrek Yetmezliği (CrCl < 30 mL/dk) ve Diyaliz Hastaları: Prospektüs/EMA tarafından önerilmez — sugammadeks-roküronyum kompleksi günlerce dolaşımda kalır. Acil CICO veya yüksek riskli olgularda fayda-zarar değerlendirmesi ile kullanılabilir; yüksek akımlı (high-flux) hemodiyaliz kompleksi temizler.',
          'Benzilizokinolin NMB’ler (Atraküryum, Sisatraküryum, Mivaküryum) veya Süksinilkolin Bloğu: Kimyasal uyumsuzluk nedeniyle tamamen ETKİSİZDİR — bu ajanların geri döndürülmesinde kesinlikle kullanılmamalıdır.',
          'Belirgin Bradikardi, İleri AV Blok veya Yüksek Vagal Tonuslu Hastalar: Uygulama sonrası dakikalar içinde ani ve derin bradikardi/asistoli riski nedeniyle sürekli EKG izlemi ve yatak başında Atropin hazır bulundurulmalıdır.',
          'Ağır Koagülopati veya Terapötik Antikoagülasyon Altında 16 mg/kg Acil Doz: 16 mg/kg dozunda aPTT/PT’de geçici (<30 dk, ~%25) uzama görülebilir; aktif kanama/koagülopati hastasında yakın hemostaz izlemi gerekir.',
          'İlk Trimester Gebelik: Progesteron bağlama potansiyeli nedeniyle erken gebelikte yalnızca net klinik fayda (örn. CICO / zor havayolu) varsa kullanılmalıdır.',
        ]}
        clinicalNote="Kantitatif TOF/PTC monitörizasyonu olmadan 'göz kararı' veya sabit 1 flakon (200 mg) doz uygulaması, derin bloktaki hastalarda ölümcül rekürarizasyona yol açabilir!"
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. ENDİKASYONLAR & KLİNİK KANIT (#sec-endikasyon)                    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-endikasyon"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Endikasyonlar &amp; Klinik Kanıt (ASA 2023 · ESAIC 2023 · Cochrane 2017)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          {/* 1. Orta Düzey Blok Reversali */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
                <span>1. Orta Düzey Blok Reversali (TOF ≥ T2 — 2 mg/kg)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-teal-500/20 text-teal-700 dark:text-teal-300 shrink-0">
                ASA/ESAIC 2023 · 1A
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Roküronyum veya Veküronyum bloğunda kantitatif TOF monitörizasyonunda en az{' '}
              <strong className="font-mono text-slate-900 dark:text-white">T2 yanıtı</strong> döndüğünde{' '}
              <strong className="font-mono text-slate-900 dark:text-white">2 mg/kg IV bolus</strong> uygulanır.
              Neostigmine göre <strong>6,6 kat daha hızlı</strong> (1,96 vs 12,87 dk; Hristovska Cochrane 2017) tam
              geri dönüş (TOFR ≥ 0,9) sağlar.
            </p>
          </div>

          {/* 2. Derin Blok Reversali */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                <span>2. Derin Blok Reversali (TOF = 0, PTC ≥ 1–2 — 4 mg/kg)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-amber-500/20 text-amber-700 dark:text-amber-300 shrink-0">
                ASA/ESAIC 2023 · 1A
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Laparoskopik/robotik cerrahi veya göz/KBB cerrahisi gibi derin blok gerektiren olgularda (TOF = 0,
              Post-Tetanik Sayım <strong className="font-mono">PTC ≥ 1–2</strong>) Neostigmin etkisizken{' '}
              <strong className="font-mono text-slate-900 dark:text-white">4 mg/kg IV bolus</strong> ile{' '}
              <strong>16,8 kat daha hızlı</strong> (2,9 vs 48,8 dk) dönüş sağlar ve postoperatif rezidüel kürarizasyon
              (PORC) riskini <strong>%60 azaltır (RR 0,40)</strong>.
            </p>
          </div>

          {/* 3. Acil Kurtarma / CICO */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0" />
                <span>3. Acil Kurtarma / CICO (&quot;Entübe Edilemiyor, Ventile Edilemiyor&quot; — 16 mg/kg)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-600 dark:text-rose-400 shrink-0">
                YALNIZCA Roküronyum!
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Roküronyum <strong className="font-mono">1,2 mg/kg</strong> hızlı seri indüksiyonundan hemen ~3 dakika
              sonra spontan ventilasyon dönüşü için tek başına{' '}
              <strong className="font-mono text-slate-900 dark:text-white">16 mg/kg</strong> hızlı IV bolus (~1,5–2,2
              dk) uygulanır. <strong>Yalnızca Roküronyumda onaylıdır</strong> (Veküronyumda 16 mg/kg onaylı değildir!).
            </p>
          </div>

          {/* 4. Pediatrik & Nöromüsküler Hastalıklar */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>4. Pediatrik Hastalar (≥ 2 Yaş) &amp; Nöromüsküler Hastalıklar (Myasthenia Gravis)</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0">
                2–4 mg/kg
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              2–17 yaş çocuklarda orta (2 mg/kg) ve derin (4 mg/kg) blokta onaylıdır (16 mg/kg pediatride rutin onaylı
              değildir; CICO&apos;da endikasyon dışı kurtarma olarak bildirilmiştir). <strong>Myasthenia Gravis</strong>{' '}
              ve kas distrofilerinde kolinerjik kriz riski olmadan güvenli ve öngörülebilir reversal sunar.
            </p>
          </div>
        </div>

        {/* Klinik Kanıt Kutuları: ASA/ESAIC 2023 & Cochrane 2017 */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-teal-950/20 border-teal-900/50 text-teal-100' : 'bg-teal-50/70 border-teal-200 text-teal-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <span className="font-bold text-xs sm:text-sm text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0" />
                <span>ASA 2023 &amp; ESAIC 2023 NMB Kılavuzları (Thilen &amp; Fuchs-Buder)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-800 dark:text-teal-200">
                PMID: 36520073
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Her iki majör kılavuz da ekstübasyon öncesi adduktor pollisis kasında{' '}
              <strong>kantitatif TOF monitörizasyonunu (hedef TOFR ≥ 0,9)</strong> güçlü öneriyle zorunlu tutar ve
              aminosteroid (Roküronyum/Veküronyum) kaynaklı <strong>derin, orta ve yüzeyel</strong> nöromüsküler bloğun
              geri döndürülmesinde Sugammadeks&apos;in Neostigmine üstünlüğünü <strong>Kanıt Düzeyi 1A (Güçlü Öneri)</strong>{' '}
              olarak vurgular.
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-amber-950/20 border-amber-900/50 text-amber-100' : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
              <span className="font-bold text-xs sm:text-sm text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Cochrane Meta-Analizi (Hristovska et al., 2017, 41 RCT, n=4206)</span>
              </span>
              <span className="font-mono text-[10.5px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-200">
                PMID: 28806470
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Sugammadeks, Neostigmine göre orta blokta <strong>10,2 dakika</strong> (1,96 vs 12,87 dk), derin blokta{' '}
              <strong>45,8 dakika</strong> (2,9 vs 48,8 dk) daha hızlı tam dönüş sağlamıştır. Toplam advers olaylarda{' '}
              <strong>%40 azalma (NNTB = 8)</strong>, bradikardide (<strong>RR 0,16</strong>), postoperatif bulantı-kusmada
              (<strong>RR 0,52</strong>) ve rezidüel paralizide (<strong>RR 0,40</strong>) anlamlı üstünlük göstermiştir.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 5. DOZAJ KADEMELERİ & TOF/PTC ALGORİTMASI (#sec-dozaj)              */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-dozaj"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Dozaj Kademeleri &amp; TOF / PTC Reversal Algoritması
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">Gerçek Vücut Ağırlığı (TBW) · 10 sn Hızlı IV Bolus</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Kademe 1: 2 mg/kg */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              blockScenario === 'moderate'
                ? 'border-teal-500 bg-teal-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                  Orta / Yüzeyel Blok
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-700 dark:text-teal-300">
                  TOF ≥ T2
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                2 <span className="text-xs font-sans font-normal text-slate-500">mg/kg IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                En az <strong>T2</strong> yanıtı döndüğünde (TOF 2–4). Beklenen TOFR ≥ 0,9 dönüş süresi{' '}
                <strong>~2,0 dk</strong>. Yetişkin ve ≥ 2 yaş pediatrik hastalarda standart rejim.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBlockScenario('moderate')}
              className="mt-3 text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline text-left cursor-pointer"
            >
              Hesaplayıcıda Seç →
            </button>
          </div>

          {/* Kademe 2: 4 mg/kg */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              blockScenario === 'deep'
                ? 'border-amber-500 bg-amber-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
                  Derin Blok
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                  TOF = 0 · PTC 1–2
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                4 <span className="text-xs font-sans font-normal text-slate-500">mg/kg IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                TOF = 0 ancak <strong>PTC ≥ 1–2</strong> yanıtı mevcutken. Beklenen TOFR ≥ 0,9 dönüş süresi{' '}
                <strong>~2,9 dk</strong>. Neostigminin etkisiz olduğu derin blokta altın standarttır.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBlockScenario('deep')}
              className="mt-3 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline text-left cursor-pointer"
            >
              Hesaplayıcıda Seç →
            </button>
          </div>

          {/* Kademe 3: 16 mg/kg */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              blockScenario === 'cico'
                ? 'border-rose-500 bg-rose-500/10'
                : isDark
                ? 'bg-slate-800/40 border-slate-700'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-rose-600 dark:text-rose-400">
                  Acil CICO Kurtarma
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  3. dk · Roküronyum
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                16 <span className="text-xs font-sans font-normal text-slate-500">mg/kg IV</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Roküronyum <strong>1,2 mg/kg</strong> sonrası ~3. dakikada acil spontan ventilasyon kurtarması (~1,5–2,2
                dk). <strong>Yalnızca Roküronyumda onaylıdır</strong>; 500 mg/5 mL flakon kullanın!
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBlockScenario('cico')}
              className="mt-3 text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline text-left cursor-pointer"
            >
              Hesaplayıcıda Seç →
            </button>
          </div>

          {/* Kademe 4: Re-NMB Bekleme Süreleri */}
          <div
            className={`p-4 rounded-xl border flex flex-col justify-between ${
              isDark ? 'bg-indigo-950/20 border-indigo-900/50' : 'bg-indigo-50/70 border-indigo-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
                  Re-NMB Bekleme
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  Tekrar Entübasyon
                </span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white mt-1">
                5 dk · 4 sa · 24 sa
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                2–4 mg/kg sonrası Roküronyum 0,6 mg/kg için <strong>4 saat</strong>, 1,2 mg/kg için{' '}
                <strong>5 dk</strong> bekle; 16 mg/kg sonrası <strong>24 saat</strong> bekle. Acil re-entübasyonda{' '}
                <strong>Sisatraküryum / Atraküryum veya Süksinilkolin</strong> seç!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. İNTERAKTİF DOZ, FLAKON & RE-NMB HESAPLAYICISI (#sec-hesaplayici)  */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section
        id="sec-hesaplayici"
        className={`p-5 sm:p-6 rounded-2xl border transition-all ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-teal-500/15 text-teal-600 dark:text-teal-400">
              <Syringe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                İnteraktif Sugammadeks Doz, Flakon &amp; Re-NMB Hesaplayıcısı
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                TR 200 mg/2 mL &amp; 500 mg/5 mL (100 mg/mL) flakon adedi ve acil CICO hacmi anında hesaplanır
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setWeightKg(75);
              setBlockScenario('moderate');
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer self-start sm:self-auto ${
              isDark
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sıfırla (75 kg · 2 mg/kg)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Sol Panel: Girdiler */}
          <div className="lg:col-span-5 space-y-4">
            {/* Hasta Ağırlığı (TBW) */}
            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <label htmlFor={weightInputId} className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Hasta Vücut Ağırlığı (TBW — Gerçek Ağırlık)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    id={weightInputId}
                    type="number"
                    min={5}
                    max={180}
                    step={1}
                    value={weightKg}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val)) setWeightKg(Math.min(180, Math.max(5, val)));
                    }}
                    className={`w-20 px-2.5 py-1 rounded-lg border text-right font-mono font-bold text-sm ${
                      isDark
                        ? 'bg-slate-900 border-slate-700 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <span className="text-xs font-semibold text-slate-500">kg</span>
                </div>
              </div>

              <input
                type="range"
                min={5}
                max={180}
                step={1}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                aria-label="Hasta ağırlığı kaydırıcısı"
                className="w-full accent-teal-600 cursor-pointer"
              />

              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {[15, 25, 50, 75, 90, 110, 140].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setWeightKg(preset)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold border transition-colors cursor-pointer ${
                      weightKg === preset
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : isDark
                        ? 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {preset} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Obezite Doz Skaler Yardımcısı */}
            <ObesityDosingScaler
              isDark={isDark}
              drugName="Sugammadeks"
              recommendedScalar="TBW"
              secondaryScalar={{
                type: 'AdjBW',
                context: 'Morbid obezitede orta blok (bazı güncel RKÇ’ler; derin blok/CICO’da TBW esastır!)',
              }}
              rationale="Prospektüs ve FDA Sugammadeks için Gerçek Vücut Ağırlığı (TBW) önerir. Morbid obezitede İdeal Vücut Ağırlığı (IBW) ile dozlama yetersiz enkapsülasyon, uzamış dönüş ve rekürarizasyona yol açar! Bazı güncel çalışmalar orta blokta AdjBW (%40 düzeltme) ile de etkin dönüş bildirse de derin blok ve CICO’da mutlaka TBW kullanılmalıdır."
              currentWeightKg={weightKg}
              onApplyWeight={(kg) => setWeightKg(Math.min(180, Math.max(5, kg)))}
            />

            {/* Blok Derinliği / Klinik Senaryo Seçici */}
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Blok Derinliği / Klinik Senaryo Seçimi
              </span>
              {(['moderate', 'deep', 'cico'] as BlockScenario[]).map((key) => {
                const item = scenarioConfig[key];
                const isSelected = blockScenario === key;
                const activeClasses =
                  key === 'cico'
                    ? 'border-rose-500 bg-rose-500/15 text-rose-900 dark:text-rose-100'
                    : key === 'deep'
                    ? 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-100'
                    : 'border-teal-500 bg-teal-500/15 text-teal-900 dark:text-teal-100';
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setBlockScenario(key)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? activeClasses
                        : isDark
                        ? 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold">{item.label}</span>
                      <span className="font-mono text-xs font-extrabold shrink-0">{item.doseMgKg} mg/kg</span>
                    </div>
                    <p className="text-[11px] opacity-80 mt-0.5">{item.nmbNote}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sağ Panel: Canlı Sonuçlar & Re-NMB Tablosu */}
          <div className="lg:col-span-7 space-y-4">
            {/* Ana Sonuç Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                className={`p-4 rounded-2xl border ${
                  blockScenario === 'cico'
                    ? isDark
                      ? 'bg-rose-950/40 border-rose-500/60'
                      : 'bg-rose-50 border-rose-300'
                    : isDark
                    ? 'bg-teal-950/30 border-teal-500/40'
                    : 'bg-teal-50/80 border-teal-200'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Hesaplanan Toplam Doz
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-1">
                  {totalDoseMg.toFixed(0)} <span className="text-sm font-semibold text-slate-500">mg</span>
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {weightKg} kg × {activeConfig.doseMgKg} mg/kg
                </span>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-indigo-950/30 border-indigo-500/40' : 'bg-indigo-50/80 border-indigo-200'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Çekilecek Hacim (100 mg/mL)
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-700 dark:text-indigo-300 mt-1">
                  {volumeMlDirect.toFixed(2)} <span className="text-sm font-semibold">mL</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Sulandırmadan 10 sn hızlı IV bolus
                </span>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Beklenen TOF ≥ 0,9
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-600 dark:text-teal-400 mt-1">
                  {activeConfig.expectedRecoveryMin}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {activeConfig.tofCriteria}
                </span>
              </div>
            </div>

            {/* Gereken TR Flakon Sayısı */}
            <div
              className={`p-4 rounded-2xl border ${
                blockScenario === 'cico'
                  ? isDark
                    ? 'bg-rose-950/30 border-rose-500/50'
                    : 'bg-rose-50 border-rose-300'
                  : isDark
                  ? 'bg-slate-950/60 border-slate-800'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  Gereken Türkiye Flakon Sayısı (100 mg/mL)
                </span>
                {blockScenario === 'cico' && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                    ACİL CICO — 500 mg FLAKON KULLANIN!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className={`p-3 rounded-xl border ${
                    isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    200 mg / 2 mL Flakon (Bridion® / Brimadeks® / Sugaver®)
                  </span>
                  <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">
                    {vials200Count} <span className="text-xs font-sans font-normal text-slate-500">adet flakon</span>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border ${
                    blockScenario === 'cico'
                      ? isDark
                        ? 'bg-rose-950/50 border-rose-500'
                        : 'bg-rose-100/70 border-rose-400'
                      : isDark
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    500 mg / 5 mL Flakon (CICO &amp; Obezite için İdeal)
                  </span>
                  <div className="text-xl font-extrabold font-mono text-slate-900 dark:text-white mt-0.5">
                    {vials500Count} <span className="text-xs font-sans font-normal text-slate-500">adet flakon</span>
                  </div>
                </div>
              </div>

              {isPediatricWeight && (
                <div
                  className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                    isDark
                      ? 'bg-indigo-950/30 border-indigo-800 text-indigo-200'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}
                >
                  <strong>Pediatrik Hassas Sulandırma (&lt;30 kg):</strong> 1 mL (100 mg) Sugammadeks + 9 mL SF ={' '}
                  <strong>10 mg/mL</strong> çözelti hazırlandığında çekilecek hacim:{' '}
                  <strong className="font-mono">{volumeMlPediatricDiluted.toFixed(1)} mL</strong>.
                </div>
              )}

              {blockScenario === 'cico' && (
                <div
                  className={`mt-3 p-3 rounded-xl border text-xs leading-relaxed ${
                    isDark
                      ? 'bg-rose-950/50 border-rose-600/60 text-rose-100'
                      : 'bg-rose-100/80 border-rose-300 text-rose-950'
                  }`}
                >
                  <strong>CICO Kritik Hatırlatma:</strong> {weightKg} kg hastada 16 mg/kg ={' '}
                  <strong>
                    {totalDoseMg.toFixed(0)} mg ({volumeMlDirect.toFixed(1)} mL)
                  </strong>{' '}
                  gerektirir ({vials500Count} adet 500 mg flakon veya {vials200Count} adet 200 mg flakon). Sugammadeks
                  CICO&apos;da yalnızca <strong>Roküronyum 1,2 mg/kg</strong> bloğunu geri çevirir; hipnotik
                  (Propofol/Opioid) kaynaklı apneyi veya mekanik havayolu obstrüksiyonunu gidermez — oksijenasyon ve
                  acil krikotirotomi hazırlığı paralel yürütülmelidir!
                </div>
              )}
            </div>

            {/* Sugammadeks Sonrası Tekrar NMB Gerekirse Bekleme Süresi Tablosu */}
            <div
              className={`p-4 rounded-2xl border ${
                isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>Sugammadeks Sonrası Tekrar NMB Gerekirse Bekleme Süreleri</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className={`border-b ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                      <th className="py-2 pr-3 font-semibold">Önceki Sugammadeks</th>
                      <th className="py-2 pr-3 font-semibold">Yeni NMB Ajanı &amp; Dozu</th>
                      <th className="py-2 font-semibold">Minimum Bekleme &amp; Klinik Not</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDark ? 'divide-slate-800/80 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
                    <tr>
                      <td className="py-2 pr-3 font-mono font-bold text-teal-600 dark:text-teal-400">2 – 4 mg/kg</td>
                      <td className="py-2 pr-3">Roküronyum 1,2 mg/kg</td>
                      <td className="py-2">
                        <strong className="font-mono">5 dakika</strong> (etki başlangıcı ~4 dk&apos;ya uzar, süre ~15 dk&apos;ya kısalır)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-mono font-bold text-teal-600 dark:text-teal-400">2 – 4 mg/kg</td>
                      <td className="py-2 pr-3">Roküronyum 0,6 mg/kg veya Veküronyum 0,1 mg/kg</td>
                      <td className="py-2">
                        <strong className="font-mono">4 saat</strong> (dolaşımdaki serbest sugammadeksin klirensi için)
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-mono font-bold text-rose-600 dark:text-rose-400">16 mg/kg (CICO)</td>
                      <td className="py-2 pr-3">Roküronyum veya Veküronyum</td>
                      <td className="py-2">
                        <strong className="font-mono text-rose-600 dark:text-rose-400">24 saat bekle!</strong>
                      </td>
                    </tr>
                    <tr className={isDark ? 'bg-amber-950/20' : 'bg-amber-50/70'}>
                      <td className="py-2 pr-3 font-bold text-amber-700 dark:text-amber-300">Acil Re-Entübasyon</td>
                      <td className="py-2 pr-3 font-bold">Sisatraküryum / Atraküryum veya Süksinilkolin</td>
                      <td className="py-2 font-semibold">
                        Bekleme GEREKMEZ (0 dk) — Sugammadeks benzilizokinolinleri ve süksinilkolini bağlamaz!
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. TÜRKİYE PREPARAT & KONSANTRASYON REHBERİ (#sec-tr-preparat)       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <TurkeyFormulationBlock
        isDark={isDark}
        sectionId="sec-tr-preparat"
        preparations={[
          {
            name: 'Bridion® / Brimadeks® / Sugaver® 200 mg / 2 mL IV Enjeksiyonluk Çözelti Flakonu',
            presentation: '2 mL berrak, renksiz veya çok açık sarı steril IV enjeksiyonluk çözelti içeren tek dozluk cam flakon',
            concentration: '100 mg/mL',
            saltOrBaseNote:
              'Her 1 mL, 100 mg sugammadekse eşdeğer Sugammadeks Sodyum içerir. Yetişkinlerde sulandırılmadan doğrudan tek hızlı IV bolus (10 saniye içinde) olarak mevcut IV hattan uygulanır.',
            alertLevel: 'standard',
          },
          {
            name: 'Bridion® / Brimadeks® / Sugaver® 500 mg / 5 mL IV Enjeksiyonluk Çözelti Flakonu',
            presentation: '5 mL berrak, renksiz veya çok açık sarı steril IV enjeksiyonluk çözelti içeren tek dozluk cam flakon',
            concentration: '100 mg/mL',
            saltOrBaseNote:
              'Her iki flakon da aynı konsantrasyondadır (100 mg/mL). Obez hastalarda derin blok (4 mg/kg) ve acil CICO kurtarmada (16 mg/kg) zaman kaybını önlemek için 500 mg/5 mL flakonların zor havayolu arabasında hazır bulunması kritik önem taşır.',
            alertLevel: 'high',
          },
        ]}
        standardDilutions={[
          'Yetişkin Standart Uygulama (Sulandırmadan — 100 mg/mL): Hesaplanan hacim (2–16 mg/kg) doğrudan enjektöre çekilerek mevcut IV hattan 10 saniye içinde tek hızlı bolus olarak verilir; ardından hat SF ile yıkanır.',
          'Pediatrik Hassas Sulandırma (< 20–30 kg — 10 mg/mL): Doz hassasiyetini artırmak için 1 mL (100 mg) Sugammadeks + 9 mL %0,9 NaCl (SF) = 10 mL (10 mg/mL) şeklinde sulandırılabilir.',
        ]}
        concentrationTrapWarning="200 mg / 2 mL ve 500 mg / 5 mL flakonların ikisi de 100 mg/mL konsantrasyondadır! 80 kg bir hastada acil CICO (16 mg/kg = 1280 mg = 12,8 mL) için 200 mg flakondan 7 adet kırmak kritik hipoksi süresinde ciddi zaman kaybına yol açar; acil havayolu arabasında mutlaka 500 mg / 5 mL flakon (3 adet) bulundurulmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. DAMAR YOLU, pH/OZMOLALİTE & Y-SITE UYUMLULUK (#sec-uyumluluk)    */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <CompatibilityAndLineBlock
        isDark={isDark}
        sectionId="sec-uyumluluk"
        accessRequirement="peripheral-ok"
        accessSummary="Standart periferik IV kateterden veya santral venöz hattan 10 saniye içinde hızlı IV bolus olarak güvenle uygulanır. Uygulama öncesinde ve sonrasında IV hattın %0,9 NaCl (SF) ile yıkanması özellikle uyumsuz ilaçlarla (Ondansetron, Verapamil, Ranitidin) fiziksel çökeltiyi önlemek için zorunludur."
        phRange="7,0 – 8,0 (Nötr – Hafif Alkali)"
        osmolalityNote="Ozmolalite 300 – 500 mOsm/kg aralığındadır; periferik venlerde belirgin flebit veya doku nekrozu riski taşımaz."
        compatibleDiluents={[
          '%0,9 Sodyum Klorür (SF)',
          '%5 Dekstroz (D5W)',
          'Ringer Laktat (RL)',
          'İzotonik dengeli kristalloidler (İzolen / Plasmalyte)',
        ]}
        stabilityNote="Flakonlar 30°C altında, ışıktan korunarak saklanır (ışığa maruz kalırsa 5 gün içinde kullanılmalıdır). %0,9 NaCl ile 10 mg/mL'ye sulandırıldığında 2–25°C'de 48 saat kimyasal/fiziksel olarak stabildir; mikrobiyolojik güvenlik açısından derhal kullanılması önerilir."
        ySiteCompatible={[
          'SF (%0,9 NaCl)',
          '%5 Dekstroz',
          'Ringer Laktat',
          'İzotonik dengeli kristalloidler',
          'Propofol (ayrı bolus + SF yıkama önerilir)',
          'Fentanil / Remifentanil',
        ]}
        ySiteIncompatible={[
          'Ondansetron (Y-site temasında fiziksel ÇÖKELTİ oluşturur — öncesinde/sonrasında hattı SF ile yıka!)',
          'Verapamil (hatta fiziksel çökelti ve bulanıklık!)',
          'Ranitidin (fiziksel uyumsuzluk / çökelti!)',
        ]}
        extravasationProtocol="Sugammadeks nötr-hafif alkali pH (7,0–8,0) ve düşük doku toksisitesine sahip olduğundan vezikan değildir. Ekstravazasyon durumunda enjeksiyonu durdurun, ekstremiteyi eleve edin ve soğuk/ılık konfor kompresi uygulayın; tam doz ulaşmadığından kantitatif TOF ile bloğu doğrulayıp alternatif IV hattan ek doz değerlendirin."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. BÖBREK & KARACİĞER YETMEZLİĞİ (#sec-organ)                        */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <OrganImpairmentGridBlock
        isDark={isDark}
        sectionId="sec-organ"
        renalSummary="Hafif-orta böbrek yetmezliğinde (CrCl 30–80 mL/dk) doz değişikliği gerekmez; ağır böbrek yetmezliğinde (CrCl < 30 mL/dk) veya diyaliz hastalarında prospektüs önermez."
        renalDetails={[
          'Hafif-Orta Böbrek Yetmezliği (CrCl 30–80 mL/dk): Reversal hızı ve etkinliği normal böbrek fonksiyonlu hastalara benzerdir; standart 2 mg/kg (orta) ve 4 mg/kg (derin) dozları güvenle uygulanır.',
          'Ağır Böbrek Yetmezliği (CrCl < 30 mL/dk) & SDBY: Sugammadeks-roküronyum kompleksi metabolize edilmeden yalnızca glomerüler filtrasyonla atıldığından kompleksin yarı ömrü 19–35+ saate (anüride günlere) uzar; prospektüs/EMA kullanımı önermez. Ancak acil CICO veya yüksek riskli olgularda kullanıldığında reversal etkinliği korunur (rekürarizasyon nadirdir; yine de uzun süre izlem önerilir).',
          'Hemodiyaliz Klirensi: Yalnızca yüksek akımlı (high-flux) hemodiyaliz membranları sugammadeks-roküronyum kompleksini tek seansta ~%70 oranında temizler; düşük akımlı (low-flux) diyaliz etkisizdir.',
        ]}
        hepaticSummary="Karaciğerde metabolize olmadığından (%0) hafif-orta karaciğer yetmezliğinde doz değişikliği gerekmez."
        hepaticDetails={[
          'Hafif-orta hepatik yetmezlikte (Child-Pugh A–B) dağılım ve renal atılım etkilenmez; standart dozlar kullanılır.',
          'Ağır karaciğer yetmezliğinde (Child-Pugh C) eşlik eden koagülopati (yüksek dozda aPTT/PT uzaması) veya yaygın ödem/asite bağlı artmış ekstraselüler dağılım hacmi (Vd↑) nedeniyle dikkatli olunmalı ve kantitatif TOF ile tam dönüş doğrulanmalıdır.',
        ]}
        {...STANDALONE_ORGAN_PART2['sugammadex']}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. GERİATRİ & OBEZİTE (#sec-geriatri-obezite)                       */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <GeriatricAndObesityBlock
        isDark={isDark}
        sectionId="sec-geriatri-obezite"
        geriatricReductionBadge="Doz Değişikliği Yok (2–4 mg/kg) · Dönüş ~0,5–1 dk Yavaş"
        geriatricPoints={[
          'Geriatrik hastalarda (>65 yaş) standart yetişkin dozları (2 mg/kg orta blok, 4 mg/kg derin blok) değişmeden uygulanır.',
          'Yaşa bağlı azalmış kardiyak debi ve kas kan akımı nedeniyle dolaşım süresi uzadığından TOFR ≥ 0,9 dönüş süresi genç erişkinlere kıyasla ~0,5–1 dakika daha yavaş olabilir (2 mg/kg ile ~2,9–3,6 dk).',
          'Yaşlılarda bradikardi ve iletim defekti eğilimi yüksek olduğundan uygulama sırasında sürekli EKG takibi ve yatak başında Atropin bulundurulması önemlidir.',
        ]}
        obesityWeightScalarBadge="TBW (Gerçek Vücut Ağırlığı — Prospektüs/FDA)"
        obesityPoints={[
          'Prospektüs ve FDA, obez (BMI ≥ 30) ve morbid obez (BMI ≥ 40) hastalarda Sugammadeks dozunun Gerçek Vücut Ağırlığı (TBW) üzerinden hesaplanmasını önerir.',
          'İdeal Vücut Ağırlığı (IBW) ile dozlama, plazma ve periferik kompartmandaki roküronyum yükünü tam kapsülleyemeyerek uzamış derlenmeye ve postoperatif rekürarizasyona yol açar!',
          'Bazı güncel RKÇ’ler orta blokta Düzeltilmiş Vücut Ağırlığının (AdjBW = IBW + 0,4×fazla) da etkin olduğunu göstermekle birlikte, derin blok (4 mg/kg) ve CICO (16 mg/kg) durumlarında TBW kullanımı zorunludur ve kantitatif TOF ile doğrulanmalıdır.',
        ]}
        clinicalNote="Morbid obez hastalarda üst havayolu obstrüksiyonu ve obstrüktif uyku apnesi (OSA) riski yüksek olduğundan, ekstübasyon öncesinde mutlaka kantitatif TOFR ≥ 0,9 doğrulanmalıdır."
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. GEBELİK & LAKTASYON (#sec-gebelik)                               */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <PregnancyLactationBlock
        isDark={isDark}
        sectionId="sec-gebelik"
        pregnancySummary="Erken gebelikte (1. trimester) progesteron bağlanma potansiyeli nedeniyle rutin önerilmez; sezaryen genel anestezisi / CICO kurtarmada maternal güvenlik önceliklidir."
        pregnancyDetails={[
          'Sugammadeks dolaşımdaki serbest progesteronu düşük afiniteyle kapsülleyebildiğinden, erken gebelikte (özellikle 1. trimesterde) teorik gebelik kaybı riski tartışmalıdır; bu nedenle elektif olgularda rutin kullanımı önerilmez (SOAP 2019 konsensüsü).',
          'Buna karşın sezaryen genel anestezisinde zor havayolu / CICO kurtarmada (16 mg/kg) veya Neostigmin ile yetersiz kalan derin blokta maternal hipoksi ve aspirasyon riskini önlemek için maternal güvenlik daima önceliklidir ve hayat kurtarıcıdır.',
          'Büyük ve polar bir molekül (MW 2178 Da) olduğundan plasental geçişi son derece düşüktür.',
        ]}
        lactationSummary="Büyük polar molekül (MW 2178 Da) olduğundan anne sütüne geçişi minimaldir ve bebek GI kanalından emilmez — emzirme güvenle sürdürülebilir."
        lactationDetails={[
          'Oral biyoyararlanımı pratik olarak sıfıra yakın olduğundan bebekte sistemik emilim beklenmez; maternal anestezi sonrası emzirmenin kesilmesine gerek yoktur.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. OLUMSUZ ETKİLER (#sec-olumsuz)                                   */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <AdverseEffectsBlock
        isDark={isDark}
        sectionId="sec-olumsuz"
        items={[
          {
            title: 'Belirgin Bradikardi & Kardiyak Asistoli (FDA/EMA Uyarısı)',
            incidenceOrSeverity: '%1–5 · Ani Başlangıç (<5 dk)',
            detail:
              'Kolinerjik etkisi olmamasına rağmen uygulamadan dakikalar içinde ani sinüs bradikardisi ve nadiren asistoli gelişebilir. Sürekli EKG izlemi şarttır; semptomatik bradikardide Atropin 0,5–1 mg IV hızla yanıt verir.',
            tone: 'rose',
          },
          {
            title: 'Anafilaksi & Hipersensitivite Reaksiyonları',
            incidenceOrSeverity: '%0,02 – 0,3 · Doz-İlişkili (16 mg/kg ↑)',
            detail:
              'Kızarıklık, ürtiker, bronkospazm, derin hipotansiyon ve şok tablosu 1–5 dakika içinde başlayabilir (16 mg/kg dozda insidans daha yüksektir). İlk tedavi Adrenalin 50–200 mcg IV titre + %100 O₂ + kristaloid yüklemesidir.',
            tone: 'rose',
          },
          {
            title: 'Geçici Koagülasyon Testi Uzaması (aPTT / PT)',
            incidenceOrSeverity: '16 mg/kg Dozda ~%25 · <30 dk',
            detail:
              'Özellikle 16 mg/kg acil dozunda aPTT ve PT değerlerinde ~%25 oranında, <30 dakika içinde normale dönen geçici uzama görülür; normal hemostazlı hastalarda klinik kanama artışı minimaldir.',
            tone: 'amber',
          },
          {
            title: 'Anestezi Yüzeyelleşmesine Bağlı Öksürük / Hareket, Tat Bozukluğu & Bulantı',
            incidenceOrSeverity: '%5–15 · Hafif–Orta',
            detail:
              'Hızlı kas gücü dönüşü sırasında yetersiz anestezi derinliği varsa öksürük, öğürme, laringospazm veya hareket görülebilir (yeterli hipnotik/analjezi korunmalıdır). Metalik/acı tat (disguzi) ve hafif bulantı nadiren bildirilmiştir.',
            tone: 'indigo',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. ÖZEL KLİNİK DURUMLAR & UYARILAR (#sec-ozel-durumlar)             */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <SpecialClinicalCautionsBlock
        isDark={isDark}
        sectionId="sec-ozel-durumlar"
        items={[
          {
            title: '7 Günlük Hormonal Kontraseptif Bariyer Kuralı (Zorunlu Hasta Bilgilendirmesi!)',
            detail:
              '4 mg/kg tek doz sugammadeks, dolaşımdaki serbest progesteronu kapsülleyerek etonogestrel/progestin maruziyetini ~%34 azaltır — bu etki 1 adet oral kontraseptif hapın unutulmasına eşdeğerdir! Oral kontraseptif, progestin implant, hormonal RİA, vajinal halka veya enjeksiyon kullanan doğurganlık çağındaki tüm kadın hastalara 7 gün boyunca ek non-hormonal bariyer yöntemi (kondom vb.) kullanmaları yazılı ve sözlü bildirilmelidir.',
          },
          {
            title: 'Yer Değiştirme (Displacement) Etkileşimi: Toremifen, IV Fusidik Asit & Flukloksasilin',
            detail:
              'Sugammadeks boşluğuna yüksek afinite gösteren Toremifen (SERM) veya yüksek doz IV Fusidik Asit/Flukloksasilin aynı gün uygulandığında, sugammadeks içinde hapsedilmiş olan roküronyum/veküronyum moleküllerini yerinden oynatarak (displacement) serbestleştirebilir ve gecikmiş rekürarizasyona yol açabilir!',
          },
          {
            title: 'Geçici Koagülasyon Testi Uzaması (aPTT / PT) ve Antikoagülan Kullanan Hastalar',
            detail:
              'Sugammadeks 4 mg/kg ve özellikle 16 mg/kg dozlarda in vitro fosfolipid bağımlı Faktör Xa / protrombinaz kompleksi ile etkileşerek aPTT ve PT/INR değerlerini geçici olarak (~%25, <30 dakika süreyle) uzatır. Terapötik heparin/LMWH/warfarin/DOAK alan veya majör kanama riski taşıyan hastalarda hemostaz yakından izlenmelidir.',
          },
          {
            title: 'Nöromüsküler Hastalıklarda (Myasthenia Gravis, Kas Distrofileri) Kritik Avantaj',
            detail:
              'Myasthenia Gravis hastalarında Neostigmin kolinerjik krize ve paradoksal kas güçsüzlüğüne yol açabilirken; Sugammadeks kolinerjik sistemi hiç etkilemeden düşük doz Roküronyum bloğunu dakikalar içinde, öngörülebilir biçimde ve tam olarak (TOFR ≥ 0,9) geri döndürür.',
          },
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14. DERİN FARMAKODİNAMİK ANALİZ (#sec-derin-pd, 4 Kademe)            */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DeepPharmacodynamicsBlock
        isDark={isDark}
        sectionId="sec-derin-pd"
        defaultOpen={false}
        receptorMechanism={{
          title: 'Hücre Dışı Plazma & Moleküler Enkapsülasyon Biyofiziği (Reseptörsüz Doğrudan Kimyasal Şelasyon)',
          summary:
            'Sugammadeks, klasik farmakolojideki hiçbir hücre zarı reseptörüne, iyon kanalına veya enzime bağlanmaz! Etki mekanizması tamamen plazma fazında gerçekleşen yüksek afiniteli supramoleküler konak-konuk (host–guest) kimyasal enkapsülasyona dayanır (Miller’s 10th Ed. / Stoelting’s 6th Ed.):',
          points: [
            'Modifiye γ-Siklodekstrin Makrohalkası ("Moleküler Kova", MW 2178 Da): Doğal γ-siklodekstrin 8 adet α-(1→4) bağlı D-glukopiranoz biriminden oluşan kesik koni şeklinde bir halkadır. C6 pozisyonlarına 8 adet uzun tiyopropiyonat karboksilat (−S−CH₂−CH₂−COO⁻) yan zinciri eklenerek boşluk derinleştirilmiş ve dış kenar yoğun negatif yükle kaplanmıştır.',
            'Çift Kilitli Bağlanma Fiziği (Hidrofobik Çekirdek + Elektrostatik Kenar): İç boşluk lipofilik/hidrofobiktir ve Roküronyumun 4 halkalı lipofilik steroid iskeletini güçlü van der Waals ve hidrofobik etkileşimlerle içine çeker. Eşzamanlı olarak Roküronyumun pozitif yüklü kuaterner amonyum azotu (N⁺), sugammadeksin dış ağzındaki negatif yüklü karboksilat (−COO⁻) kollarıyla güçlü elektrostatik tuz köprüsü kurar.',
            'Ultra Yüksek Bağlanma Sabiti (Ka ≈ 1,8 × 10⁷ M⁻¹) ve Afinite Hiyerarşisi: Oluşan 1:1 inklüzyon kompleksinin bağlanma sabiti çok yüksek, dissosiyasyon hız sabiti ise son derece düşüktür (~25 milyon kompleksten yalnızca 1’i ayrışır). Afinite sırası: Roküronyum >> Veküronyum (~2,5–3 kat daha düşük) >> Panküronyum (zayıf). Benzilizokinolinler (Atraküryum/Sisatraküryum) hacimli ve esnek yapıları nedeniyle boşluğa sığmadığından bağlanma sabiti pratik olarak sıfırdır.',
          ],
        }}
        intracellularSignaling={{
          title: 'Nöromüsküler Kavşak (NMJ) Konsantrasyon Gradyenti & Postsinaptik nAChR Yeniden Aktivasyon Kaskadı',
          summary:
            'Sugammadeks sinaptik aralığa girmeden plazma fazından başlattığı dik konsantrasyon gradyentiyle nöromüsküler iletimi saniyeler içinde fizyolojik eşiğine geri taşır:',
          points: [
            'Plazma Serbest Roküronyum Çöküşü & Ters Difüzyon Gradyenti: IV bolus sonrası sugammadeks plazmadaki serbest roküronyum moleküllerini saniyeler içinde 1:1 şelatlar. Plazma serbest roküronyum konsantrasyonu hızla sıfıra yaklaşınca, yüksek konsantrasyonlu nöromüsküler kavşak (NMJ) sinaptik aralığından plazmaya doğru dik bir pasif difüzyon gradyenti doğar.',
            'Postsinaptik nAChR (α₂βδε) Bağlanma Ceplerinin Boşalması: Sinaptik aralıktaki roküronyum hızla plazmaya çekilerek yeni sugammadeks molekülleriyle bağlanır; böylece motor son plak sarkolemmasındaki nikotinik asetilkolin reseptörlerinin (nAChR) iki α-alt birimindeki ACh bağlanma cepleri kompetitif blokajdan kurtulur.',
            'Son Plak Potansiyeli (EPP) & Eksitasyon-Kontraksiyon Kenetlenmesinin Restorasyonu: Sinir terminalinden salınan endojen ACh serbestleşen nAChR kanallarını açarak Na⁺/Ca²⁺ girişi sağlar → Son Plak Potansiyeli (EPP) güvenlik faktörünü ve ateşleme eşiğini aşar → perijunctional voltaj kapılı Na_v1.4 kanalları kas aksiyon potansiyelini T-tübüllere iletir → DHPR (Ca_v1.1)–SR Riyanodin Reseptörü (RyR1) mekanik kenetlenmesiyle SR’den Ca²⁺ salınır, Troponin-C doyurulur ve aktin-miyozin kontraksiyonu tam gücüne (TOFR ≥ 0,9) döner.',
          ],
        }}
        tissueOrganSystems={[
          {
            systemTitle: 'İskelet Kası Motor Son Plağı & Üst Hava Yolu Kasları → Nöromüsküler & Solunum Fizyolojisi',
            tissueTarget: 'Genioglossus · Faringeal Dilatörler · Diyafram · Adduktor Pollisis',
            accent: 'teal',
            points: [
              'Üst Hava Yolu Koruyucu Refleksleri & Faringeal Dilatör Restorasyonu: Faringeal kaslar ve genioglossus rezidüel NMB’ye diyaframdan çok daha duyarlıdır; Sugammadeks hızlı ve tam TOFR ≥ 0,9 dönüşü sağlayarak postoperatif üst havayolu kollapsını, aspirasyonu ve hipoksemiyi belirgin azaltır.',
              'Neostigmin Kaynaklı Paradoksal Kas Güçsüzlüğü Yoktur: Nöromüsküler blok zaten geri dönmüşken (TOFR ≥ 0,9) yanlışlıkla verilen Neostigmin aşırı ACh birikimiyle depolarizan/desensitizasyon bloğu ve kas güçsüzlüğü yapabilir; Sugammadeks AChE’yi etkilemediğinden bu riski taşımaz.',
            ],
          },
          {
            systemTitle: 'SA/AV Düğüm, Mast Hücreleri & Vasküler Düz Kas → Kardiyovasküler & İmmün Fizyoloji',
            tissueTarget: 'Kardiyak Pacemaker · Mast Hücreleri (IgE / MRGPRX2) · Vasküler Endotel',
            accent: 'rose',
            points: [
              'İdiyosenkratik Belirgin Bradikardi / Asistoli Mekanizması: Muskarinik veya kolinerjik aktivitesi olmamasına rağmen nadir olgularda uygulamadan dakikalar içinde ani bradikardi/asistoli görülür (tam mekanizması net olmamakla birlikte geçici vagal refleks veya lokal iyonik etkileşim öne sürülmektedir; Atropine hızla yanıt verir).',
              'Mast Hücre Degranülasyonu & Anafilaksi: Hem önceden çevresel siklodekstrin (gıda/kozmetik) maruziyetiyle gelişmiş spesifik IgE aracılı Tip-I hipersensitivite hem de kompleman/MRGPRX2 aracılı non-IgE mast hücre aktivasyonu bildirilmiştir (insidans 16 mg/kg dozda daha yüksektir).',
            ],
          },
          {
            systemTitle: 'Plazma Koagülasyon Kaskadı (FXa / Protrombinaz) & Steroid Hormon Havuzu → Hematoloji & Endokrin',
            tissueTarget: 'Faktör Xa / Fosfolipid Kompleksi · Serbest Progesteron Havuzu',
            accent: 'amber',
            points: [
              'Geçici aPTT / PT Uzaması (<30 dk): Yüksek plazma konsantrasyonlarında (özellikle 16 mg/kg) sugammadeks, pıhtılaşma testlerindeki fosfolipid yüzeyi ve Faktör Xa / protrombinaz kompleksiyle zayıf etkileşime girerek aPTT ve PT’yi geçici (~%25) uzatır; klinik kanama riski sağlıklı hemostazda minimaldir.',
              'Steroid Hormon Enkapsülasyonu (Progesteron): Steroid halkası benzerliği nedeniyle dolaşımdaki serbest progesterona düşük afiniteyle bağlanarak hormonal kontraseptif etkinliğini geçici düşürür (7 günlük bariyer kuralı); buna karşın kortizol, aldosteron ve östradiol düzeylerinde klinik olarak anlamlı baskılanma yapmaz.',
            ],
          },
          {
            systemTitle: 'Renal Glomerüler Filtrasyon Bariyeri & Ekstraselüler Sıvı Kompartmanı → Böbrek & Eliminasyon',
            tissueTarget: 'Ekstraselüler Sıvı (Vd 11–14 L) · Glomerüler Kapiller Bariyer',
            accent: 'indigo',
            points: [
              'Sınırlı Ekstraselüler Dağılım & Sıfır Metabolizma: Büyük hidrofilik yapısı nedeniyle hücre içine ve yağ dokusuna girmez (Vd 11–14 L), karaciğerde metabolize edilmez (%0) ve plazma proteinlerine bağlanmaz (%0).',
              'Kompleks Atılımının Böbreğe Yönlenmesi: Serbest roküronyum ağırlıklı olarak safra/karaciğerden atılırken, sugammadeks-roküronyum kompleksi %95+ oranında glomerüler filtrasyonla idrarla atılır. CrCl < 30 mL/dk’da kompleks eliminasyonu günlere uzar; yalnızca high-flux hemodiyaliz ile temizlenebilir.',
            ],
          },
        ]}
        synergyAndCeiling={{
          title: 'Stokiyometrik 1:1 Kinetik, Rekürarizasyon Fiziği, Yer Değiştirme (Displacement) & Tavan Etkisi Olmaması',
          summary:
            'Sugammadeks’in farmakodinamiğini antikolinesterazlardan ayıran temel prensip stokiyometrik (molekül-başına-molekül) şelasyon kinetiğidir:',
          points: [
            'Tavan Etkisi (Ceiling Effect) Yoktur — Neostigmin ile Kritik Fark: Neostigmin asetilkolinesteraz enzimini %100 inhibe ettiğinde (~0,07 mg/kg) maksimum tavan etkisine ulaşır; derin blokta (PTC 1–2) sinaptik aralıktaki yoğun roküronyum yarışını ACh artışıyla yenemez. Sugammadeks ise reseptör/enzim tavanına takılmaz — yeterince molekül (4–16 mg/kg) verildiğinde en derin bloğu bile 2–3 dakikada tamamen geri döndürür.',
            'Eksik Dozda "Redistribüsyon Rekürarizasyonu" Fiziği: Derin blokta yetersiz doz (örn. 2 mg/kg veya sabit 200 mg flakon, ya da obezitede IBW dozu) verildiğinde plazmadaki roküronyum geçici olarak temizlenir ve ilk dakikalarda yüzeyel bir iyileşme görülür; ancak periferik kompartmanlardaki serbest roküronyum plazmaya ve tekrar nöromüsküler kavşağa difüze olunca bağlayacak boş sugammadeks kalmadığından hasta dakikalar içinde yeniden paralize olur!',
            'Kompetitif Yer Değiştirme (Displacement) Kinetiği: Sugammadeks boşluğuna yüksek afinite gösteren Toremifen veya IV Fusidik Asit gibi moleküller uygulandığında, denge yasası gereği kapsüllenmiş roküronyum moleküllerini boşluktan dışarı iterek yeniden nöromüsküler bloğa yol açabilir.',
          ],
        }}
        clinicalPearls={[
          'Sabit 1 Flakon (200 mg) Hatası Yapmayın: 90 kg derin bloklu (PTC 1–2) bir hastada 4 mg/kg = 360 mg gerekir; 1 flakon (200 mg) verilmesi ~2,2 mg/kg ile yetersiz kalır ve derlenme ünitesinde (PACU) sessiz rekürarizasyon + üst havayolu obstrüksiyonu yaratır.',
          'CICO Kurtarmada 16 mg/kg Tek Başına Havayolunu Açmaz: Sugammadeks yalnızca Roküronyum kaynaklı kas paralizisini 1,5–2,2 dk’da geri döndürür; yüksek doz Propofol/Remifentanil kaynaklı santral solunum depresyonu veya laringospazm/ödem devam edebilir — oksijenasyon ve acil cerrahi havayolu planı paralel sürdürülmelidir.',
          'Tekrar NMB Gerekirse Ajan Değiştirin: Sugammadeks verildikten hemen sonra acil re-entübasyon veya cerrahi kanama revizyonu gerekirse Roküronyum/Veküronyum dolaşımdaki serbest sugammadeks tarafından hemen bağlanacaktır; bekleme süresi olmadan anında etki için Sisatraküryum, Atraküryum veya Süksinilkolin tercih edin!',
          'Y-Site Çökelti Kontrolü: Ameliyat sonunda sıkça ardışık verilen Ondansetron ile Sugammadeks aynı IV hatta temas ettiğinde fiziksel çökelti oluşturur; ikisi arasında hattı mutlaka %0,9 NaCl (SF) ile yıkayın.',
        ]}
      />

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 15. İLAÇ ETKİLEŞİMLERİ & KANITA DAYALI KAYNAKÇA (#sec-kaynaklar)     */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <DrugReferencesAndInteractionsBlock
        isDark={isDark}
        sectionId="sec-kaynaklar"
        drugName="Sugammadeks Sodyum"
        structuredInteractions={[
          {
            severity: 'X',
            agent: 'Ondansetron, Verapamil ve Ranitidin (Y-Site / Aynı IV Hat)',
            mechanism: 'Fizikokimyasal Uyumsuzluk ve Presipitasyon (Çökelti)',
            clinicalEffect:
              'Aynı IV infüzyon hattında veya Y-site bağlantısında temas ettiğinde fiziksel çökelti ve kateter tıkanması oluşturur.',
            management:
              'Aynı lümenden eşzamanlı uygulamayın; Sugammadeks öncesinde ve sonrasında IV hattı mutlaka %0,9 NaCl (SF) ile yıkayın.',
          },
          {
            severity: 'D',
            agent: 'Hormonal Kontraseptifler (Progesteron / Östrojen-Progestin Hap, İmplant, Halka, RİA)',
            mechanism: 'Serbest Progesteronun Sugammadeks Tarafından Moleküler Enkapsülasyonu (~%34 Düşüş)',
            clinicalEffect:
              '4 mg/kg tek doz sugammadeks progestin düzeyini 1 adet oral kontraseptif hap unutulmuş gibi düşürerek kontraseptif başarısızlığa yol açabilir.',
            management:
              'Doğurganlık çağındaki tüm kadın hastalara uygulama sonrası 7 gün boyunca ek non-hormonal bariyer kontrasepsiyon kullanmaları zorunlu olarak bildirilmelidir.',
          },
          {
            severity: 'D',
            agent: 'Toremifen ve IV Fusidik Asit (ve Yüksek Doz Flukloksasilin)',
            mechanism: 'Sugammadeks Boşluğundan Roküronyum/Veküronyumun Yer Değiştirmesi (Displacement)',
            clinicalEffect:
              'Kapsüllenmiş NMB moleküllerinin serbestleşmesiyle TOFR ≥ 0,9 dönüşünde gecikme veya postoperatif rekürarizasyon (yeniden paralizi) gelişebilir.',
            management:
              'Aynı gün eşzamanlı kullanımdan kaçının; Toremifen kullanan hastalarda postoperatif dönemde uzamış kantitatif TOF ve solunum izlemi yapın.',
          },
          {
            severity: 'C',
            agent: 'Antikoagülanlar & Antiagreganlar (Heparin, LMWH, Warfarin, DOAK)',
            mechanism: 'Yüksek Dozda (16 mg/kg) Fosfolipid / FXa Etkileşimi ile Geçici aPTT/PT Uzaması',
            clinicalEffect:
              'Özellikle 16 mg/kg dozda aPTT ve PT değerlerinde ~%25 oranında (<30 dk) geçici uzama oluşturur; terapötik antikoagülasyon altındaki hastalarda kanama riski teorik olarak artabilir.',
            management:
              'Aktif antikoagülasyon veya koagülopati varlığında cerrahi hemostazı ve koagülasyon parametrelerini yakından izleyin.',
          },
          {
            severity: 'C',
            agent: 'Roküronyum & Veküronyum (Sugammadeks Sonrası Yeniden Uygulama)',
            mechanism: 'Dolaşımdaki Serbest Sugammadeksin Yeni Verilen Aminosteroid NMB’yi Bağlaması',
            clinicalEffect:
              'Etki başlangıcı uzar, blok derinliği yetersiz kalır ve etki süresi belirgin kısalır (2–4 mg/kg sonrası 4 saat, 16 mg/kg sonrası 24 saat bekleme gerekir).',
            management:
              'Bekleme süresi dolmadan acil yeniden nöromüsküler blok gerekirse benzilizokinolin (Sisatraküryum / Atraküryum) veya Süksinilkolin tercih edin.',
          },
        ]}
        references={[
          {
            authors: 'Gropper MA, Cohen NH, Eriksson LI, Fleisher LA, Leslie K, Wiener-Kronish JP (Eds.)',
            title: "Miller's Anesthesia, 10th Edition — Chapter: Neuromuscular Blocking Drugs and Reversal Agents (Sugammadex).",
            journal: 'Elsevier',
            year: 2025,
            note: 'Sugammadeksin γ-siklodekstrin enkapsülasyon biyofiziği, 2/4/16 mg/kg doz rejimleri, rekürarizasyon mekanizması ve özel popülasyon yönetimi.',
          },
          {
            authors: 'Flood P, Rathmell JP, Urman RD (Eds.)',
            title: "Stoelting's Pharmacology & Physiology in Anesthetic Practice, 6th Edition — Chapter: Neuromuscular Blocking Drugs & Antagonists.",
            journal: 'Wolters Kluwer',
            year: 2022,
            note: 'Roküronyum/Veküronyum bağlanma sabitleri, ekstraselüler dağılım (Vd 11–14 L), renal kompleks eliminasyonu, yer değiştirme ve kontraseptif etkileşimleri.',
          },
          {
            authors: 'Thilen SR, Weigel WA, Todd MM, et al.',
            title: '2023 American Society of Anesthesiologists Practice Guidelines for Monitoring and Antagonism of Neuromuscular Blockade.',
            journal: 'Anesthesiology',
            year: 2023,
            pmid: '36520073',
            doi: '10.1097/ALN.0000000000004379',
            note: 'Adduktor pollisis kasında kantitatif TOF monitörizasyonu (hedef TOFR ≥ 0,9) ve aminosteroid derin/orta/yüzeyel bloğunda Sugammadeksin Neostigmine 1A güçlü öneriyle üstünlüğü.',
          },
          {
            authors: 'Fuchs-Buder T, Romero CS, Lewald H, et al.',
            title: 'Peri-operative management of neuromuscular blockade: A guideline from the European Society of Anaesthesiology and Intensive Care.',
            journal: 'Eur J Anaesthesiol',
            year: 2023,
            doi: '10.1097/EJA.0000000000001769',
            note: 'ESAIC 2023 Avrupa kılavuzu: Derin ve orta blokta kantitatif TOF rehberliğinde Sugammadeks kullanımı ve rezidüel kürarizasyonun önlenmesi.',
          },
          {
            authors: 'Hristovska AM, Duch P, Allingstrup M, Afshari A.',
            title: 'Efficacy and safety of sugammadex versus neostigmine in reversing neuromuscular blockade in adults.',
            journal: 'Cochrane Database Syst Rev',
            year: 2017,
            pmid: '28806470',
            note: '41 RCT (n=4206) meta-analizi: Orta blokta 6,6 kat, derin blokta 16,8 kat daha hızlı reversal; toplam advers olaylarda %40 azalma (NNTB = 8), bradikardi (RR 0,16), PONV (RR 0,52) ve PORC (RR 0,40) anlamlı düşük.',
          },
        ]}
        drugsComUrl="https://www.drugs.com/drug-interactions/sugammadex.html"
        medscapeUrl="https://reference.medscape.com/drug/bridion-sugammadex-999499"
      />
    </div>
  );
};
